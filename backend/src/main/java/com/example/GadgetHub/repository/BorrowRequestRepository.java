package com.example.GadgetHub.repository;

import com.example.GadgetHub.model.BorrowRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BorrowRequestRepository extends JpaRepository<BorrowRequest, Long> {
}
