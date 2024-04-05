package com.chance.backend.service;

import com.chance.backend.enums.CategoryType;
import com.chance.backend.model.Category;
import com.chance.backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category findByType(CategoryType type) {
        return categoryRepository.findByType(type);
    }
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}
