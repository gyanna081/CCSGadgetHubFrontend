package com.example.GadgetHub.controller;

import com.example.GadgetHub.model.BorrowRequest;
import com.example.GadgetHub.service.BorrowRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/borrow/requests")

public class BorrowRequestController {

    @Autowired
    private BorrowRequestService borrowRequestService;

    @PostMapping
    public ResponseEntity<BorrowRequest> createRequest(@RequestBody BorrowRequest request) {
        return ResponseEntity.ok(borrowRequestService.createRequest(request));
    }

    @GetMapping
    public ResponseEntity<List<BorrowRequest>> getAllRequests() {
        return ResponseEntity.ok(borrowRequestService.getAllRequests());
    }

    @PutMapping("/{id}")
    public ResponseEntity<BorrowRequest> updateRequest(@PathVariable Long id, @RequestBody BorrowRequest update) {
        return ResponseEntity.ok(borrowRequestService.updateStatus(id, update.getStatus()));
    }
}
