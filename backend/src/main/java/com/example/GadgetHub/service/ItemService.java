package com.example.GadgetHub.service;

import com.example.GadgetHub.model.Item;
import com.example.GadgetHub.repository.ItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class ItemService {

    private final ItemRepository itemRepository;
    private final Path uploadDir = Paths.get("uploads");

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
        try {
            Files.createDirectories(uploadDir);
        } catch (IOException e) {
            throw new RuntimeException("Could not create upload directory!", e);
        }
    }

    public Item saveItem(String name, String description, String condition, MultipartFile image) throws IOException {
        Item item = new Item();
        item.setName(name);
        item.setDescription(description);
        item.setCondition(condition);
        item.setStatus("Available");

        if (image != null && !image.isEmpty()) {
            String filename = UUID.randomUUID() + "_" + image.getOriginalFilename();
            Path filePath = uploadDir.resolve(filename);
            Files.copy(image.getInputStream(), filePath);
            item.setImagePath(filename);
        }

        return itemRepository.save(item);
    }

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public Item updateItem(Long id, String name, String description, String condition, String status, MultipartFile image) throws IOException {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        item.setName(name);
        item.setDescription(description);
        item.setCondition(condition);
        item.setStatus(status);

        if (image != null && !image.isEmpty()) {
            String filename = UUID.randomUUID() + "_" + image.getOriginalFilename();
            Path filePath = uploadDir.resolve(filename);
            Files.copy(image.getInputStream(), filePath);
            item.setImagePath(filename);
        }

        return itemRepository.save(item);
    }

    public void deleteItem(Long id) {
        itemRepository.deleteById(id);
    }
}
