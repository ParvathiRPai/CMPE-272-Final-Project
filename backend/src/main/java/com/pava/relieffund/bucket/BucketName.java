package com.pava.relieffund.bucket;

public enum BucketName {
    PROFILE_IMAGE("pava-test");
    private final String bucketName;
    BucketName(String bucketName)
    {
        this.bucketName=bucketName;
    }
    public String getBucketName() {
        return bucketName;
    }

}
