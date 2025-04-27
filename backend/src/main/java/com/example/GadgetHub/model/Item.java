package com.example.GadgetHub.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "items")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Long itemId;

    private String name;

    private String description;

    @Column(name = "item_condition") // match your database column name exactly
    private String condition;

    private String status;

    @Column(name = "image_path")
    private String imagePath;

    @Column(name = "created_at", nullable = false, updatable = false)
private LocalDateTime createdAt;

@PrePersist
protected void onCreate() {
    if (this.createdAt == null) {
        this.createdAt = LocalDateTime.now();
    }
}

}
