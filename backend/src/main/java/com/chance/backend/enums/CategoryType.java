package com.chance.backend.enums;

public enum CategoryType {
    DINING(0),
    GROCERIES(1),
    TRANSPORTATION(2),
    BILLS(3),
    ENTERTAINMENT(4),
    FUN(5),
    OTHER(6);

    private final int value;
    private CategoryType(int value) {
        this.value = value;
    }
    public static CategoryType valueOf(int value) {
        for (CategoryType type : CategoryType.values()) {
            if (type.value == value) {
                return type;
            }
        }
        return null;
    }
}
