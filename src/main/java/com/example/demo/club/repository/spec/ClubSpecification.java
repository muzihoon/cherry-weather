package com.example.demo.club.repository.spec;

import com.example.demo.club.entity.Club;
import com.example.demo.club.enums.ClubCategory;
import com.example.demo.club.enums.ClubGrade;
import com.example.demo.club.enums.ClubStatus;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;

public class ClubSpecification {

    private ClubSpecification() {
        throw new IllegalStateException("Specification class");
    }

    /**
     * 클럽 (공개)상태 기준으로 조회합니다.
     */
    public static Specification<Club> equalClubStatus(ClubStatus status) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("status"), status.name());
    }

    /**
     * 클럽 이름/설명/서브카테고리/태그 내에서 키워드 기준으로 조회합니다.
     */
    public static Specification<Club> likeClubName(String keyword) {
        return (root, query, criteriaBuilder) -> {
            Predicate nameLike = criteriaBuilder.like(root.get("name"), "%" + keyword + "%");
            Predicate tagLike = criteriaBuilder.like(root.get("tag"), "%" + keyword + "%");
            Predicate descriptionLike = criteriaBuilder.like(root.get("description"), "%" + keyword + "%");
            Predicate subCategoryLike = criteriaBuilder.like(root.get("subCategory"), "%" + keyword + "%");

            return criteriaBuilder.or(nameLike, tagLike, descriptionLike, subCategoryLike);
        };
    }

    /**
     * 클럽 활동지역 기준으로 조회합니다.
     */
    public static Specification<Club> likeActivitiesArea(String activitiesArea) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("activitiesArea"), "%" + activitiesArea + "%");
    }

    /**
     * 클럽 CATEGORY 기준으로 조회합니다.
     */
    public static Specification<Club> equalClubCategory(ClubCategory category) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("category"), category.name());
    }

    /**
     * 클럽 GRADE 기준으로 조회합니다.
     */
    public static Specification<Club> equalClubGrade(ClubGrade grade) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("grade"), grade.name());
    }

    /**
     * 최근 한달 내 생성된 클럽을 조회합니다.
     */
    public static Specification<Club> findRecentClubs(LocalDateTime createdAt) {
        return (root, query, criteriaBuilder) -> {

            LocalDateTime thirtyDaysAgo = createdAt.minusDays(30);
            return criteriaBuilder.greaterThanOrEqualTo(root.get("createdAt"), thirtyDaysAgo);
        };
    }
}
