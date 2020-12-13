package com.pava.relieffund.datastore;

import com.pava.relieffund.profile.UserProfile;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
@Repository
public class FakeUserProfileDataStore {
    private static List<UserProfile> USER_PROFILE=new ArrayList<>();
    static {
        USER_PROFILE.add(new UserProfile(UUID.fromString("66bb9992-f510-47d4-b265-fc81aec6453b"), "test1", null));
        USER_PROFILE.add(new UserProfile(UUID.fromString("968b6c12-7533-4522-8bfb-3a0020acd3c8"), "test2", null));
    }
    public List<UserProfile> getUserProfile(){
        return USER_PROFILE;
    }

}
