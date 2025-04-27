package com.example.GadgetHub.controller;

import com.example.GadgetHub.model.Item;
import com.example.GadgetHub.service.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")

public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @PostMapping
    public ResponseEntity<Item> addItem(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("condition") String condition,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) throws IOException {
        return ResponseEntity.ok(itemService.saveItem(name, description, condition, image));
    }

    @GetMapping
    public ResponseEntity<List<Item>> getAllItems() {
        return ResponseEntity.ok(itemService.getAllItems());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("condition") String condition,
            @RequestParam("status") String status,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) throws IOException {
        return ResponseEntity.ok(itemService.updateItem(id, name, description, condition, status, image));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }
}
