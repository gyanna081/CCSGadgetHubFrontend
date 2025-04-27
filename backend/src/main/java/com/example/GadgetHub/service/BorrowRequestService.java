package com.example.GadgetHub.service;

import com.example.GadgetHub.model.BorrowRequest;
import com.example.GadgetHub.repository.BorrowRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BorrowRequestService {

    @Autowired
    private BorrowRequestRepository borrowRequestRepository;

    public BorrowRequest createRequest(BorrowRequest request) {
        request.setRequestDate(LocalDateTime.now());
        request.setStatus("Pending");
        return borrowRequestRepository.save(request);
    }

    public List<BorrowRequest> getAllRequests() {
        return borrowRequestRepository.findAll();
    }

    public BorrowRequest updateStatus(Long id, String status) {
        BorrowRequest request = borrowRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatus(status);
        return borrowRequestRepository.save(request);
    }
}
