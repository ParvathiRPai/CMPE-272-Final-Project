package com.pava.relieffund.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("users")
@CrossOrigin("*")
public class UserProfileController {
    private final UserProfileService userProfileService;
    @Autowired
    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @GetMapping
    public List<UserProfile> getUserProfile()
    {
        return userProfileService.getUserProfiles();
    }
    @PostMapping(
            path="{userProfileid}/image/upload",
            consumes= MediaType.MULTIPART_FORM_DATA_VALUE,
            produces=MediaType.APPLICATION_JSON_VALUE
    )
    public void uploadUserProfileImage(@PathVariable("userProfileid") UUID userProfileid,
                                       @RequestParam("file") MultipartFile file)
    {
        userProfileService.uploadUserProfileImage(userProfileid, file);
    }
    @GetMapping("{userProfileid}/image/download")
    public byte[] downloadUserProfileImage(@PathVariable("userProfileid") UUID userProfileid)
    {
        return userProfileService.downlaodUserProfileImage(userProfileid);

    }
}
