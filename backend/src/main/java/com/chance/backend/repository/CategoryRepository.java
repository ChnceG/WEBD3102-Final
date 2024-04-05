package com.chance.backend.repository;

import com.chance.backend.enums.CategoryType;
import com.chance.backend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findByType(CategoryType type);
}
