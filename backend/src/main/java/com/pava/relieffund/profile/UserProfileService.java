package com.pava.relieffund.profile;

import com.pava.relieffund.bucket.BucketName;
import com.pava.relieffund.filestore.FileStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.List;

@Service
public class UserProfileService {
    private final UserProfileDataAccessService userProfileDataAccessService;
    private final FileStore fileStore;
    @Autowired
    public UserProfileService(UserProfileDataAccessService userProfileDataAccessService, FileStore fileStore) {
        this.userProfileDataAccessService = userProfileDataAccessService;
        this.fileStore = fileStore;
    }
    List<UserProfile> getUserProfiles()
    {
        return userProfileDataAccessService.getUserProfiles();
    }

    public void uploadUserProfileImage(UUID userprofileid, MultipartFile file) {
//        check if image is not empty
        isFileEmpty(file);
//        check weather the user exists in our database
        UserProfile user= getUserProfile(userprofileid);

//        if so grab some metadata from file if any
        Map<String, String> metadata=new HashMap<>();
        metadata.put("Content-Type", file.getContentType());
        metadata.put("Content-Length", String.valueOf(file.getSize()));

//        Store the image in s3 and update database with s3 image link
        String path=String.format("%s/%s", BucketName.PROFILE_IMAGE.getBucketName(), user.getUserProfileid());
        String filename=String.format("%s-%s", file.getOriginalFilename(), UUID.randomUUID());
        try {
            fileStore.save(path,filename, Optional.of(metadata), file.getInputStream());
            user.setUserProfileImageLink(filename);
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }

    }
    public byte[] downlaodUserProfileImage(UUID userProfileid) {
        UserProfile user=getUserProfile(userProfileid);
        String path=String.format("%s/%s",
                BucketName.PROFILE_IMAGE.getBucketName(),
                user.getUserProfileid(),
                user.getUserProfileImageLink());
        return user.getUserProfileImageLink().map(key -> fileStore.download(path, key)).orElse((new byte[0]));


    }

    private UserProfile getUserProfile(UUID userprofileid) {
        return userProfileDataAccessService
                .getUserProfiles()
                .stream()
                .filter(userProfile -> userProfile.getUserProfileid().equals(userprofileid))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException(String.format("User profile not found %s", userprofileid)));
    }

    private void isFileEmpty(MultipartFile file) {
        if (file.isEmpty()){
            throw new IllegalStateException("Cannot upload empty file "+ file.getSize());
        }
    }


}
