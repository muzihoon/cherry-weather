package com.example.demo.account.entity;


import com.example.demo.account.enums.RegisterType;
import com.example.demo.account.enums.UserRole;
import com.example.demo.account.enums.UserStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;


import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "ACCOUNT")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ACCOUNT_ID")
    private Long accountId;

    @Column(name = "ACCOUNT_REGISTER_TYPE", nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private RegisterType registType;

    @Column(name = "ACCOUNT_NAME", nullable = false, length = 20)
    private String name;

    @Column(name = "ACCOUNT_EMAIL", nullable = false, length = 50)
    @Email
    private String email;

    @Column(name = "ACCOUNT_PASSWORD", nullable = false, length = 300)
    private String password;

    @Column(name = "ACCOUNT_PROFILE_NAME", nullable = false, length = 20)
    private String profileName;

    @Column(name = "ACCOUNT_PHONE_NUMBER", nullable = false, length = 20)
    private String phoneNumber;

    @Column(name = "ACCOUNT_GENDER", nullable = false, length = 20)
    private String gender;

    @Column(name = "ACCOUNT_DATE_BIRTH", nullable = false, length = 20)
    private String dateOfBirth;

    @Column(name = "ACCOUNT_PROFILE_IMAGE", nullable = false, length = 100)
    private String profileImage;

    @Column(name = "ACCOUNT_USER_STATUS", nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private UserStatus userStatus;

    @Column(name = "ACCOUNT_ROLE", nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @Column(name = "ACCOUNT_RATING", nullable = false, length = 20)
    private String rating;


    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    @Column(name = "CREATED_DATE", nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @UpdateTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    @Column(name = "UPDATE_DATE")
    private LocalDateTime updateDate;

    @Column(name = "DELETE_DATE")
    private LocalDateTime deleteDate;


    public Account() {
    }

    @Builder
    public Account( RegisterType registerType, String name, String email, String password, String profileName,
                   String phoneNumber, String gender, String dateOfBirth, String profileImage,
                   UserStatus userStatus, UserRole userRole, String rating) {
        this.registType = registerType;
        this.name = name;
        this.email = email;
        this.password = password;
        this.profileName = profileName;
        this.phoneNumber = phoneNumber;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.profileImage = profileImage;
        this.userStatus = userStatus;
        this.userRole = userRole;
        this.rating = rating;
    }

    public void updateAccountRole(UserRole userRole) {
        this.userRole = userRole;
    }

}