package com.chance.backend.DTO;

public class CategoryDTO {
    private Long categoryId;
    private String name;
    private String description;
    private String type;

    // Constructors, getters, and setters

    public CategoryDTO() {
    }

    public CategoryDTO(Long categoryId, String name, String description, String type) {
        this.categoryId = categoryId;
        this.name = name;
        this.description = description;
        this.type = type;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
