package com.example.demo.club.dto;

import com.example.demo.club.enums.ClubCategory;
import com.example.demo.club.enums.ClubGrade;
import com.example.demo.club.enums.ClubStatus;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public record ClubQueryDTO(
        ClubStatus status,
        @Size(min = 2, message = "검색 문구는 2자 이상이어야 합니다.")
        String keyword,
        String activitiesArea,
        ClubCategory category,
        ClubGrade grade,
        LocalDateTime createdAt
) {
}
