package com.example.GadgetHub.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "borrow_requests")
public class BorrowRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private Long requestId;

    @ManyToOne
    @JoinColumn(name = "item_id", referencedColumnName = "item_id")
    private Item item;

    // ❌ REMOVE the relation to User
    // ❌ @ManyToOne
    // ❌ @JoinColumn(name = "borrower_id", referencedColumnName = "user_id")
    // private User borrower;

    // ✅ Replace with plain borrower_id
    @Column(name = "borrower_id")
    private Long borrowerId;

    @Column(name = "request_date")
    private LocalDateTime requestDate;

    private String status;

    @Column(name = "borrow_duration_days")
    private Integer borrowDurationDays;

    @Column(name = "borrower_email")
    private String borrowerEmail;

    @Column(name = "borrower_name")
    private String borrowerName;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "description")
    private String description;

    @Column(name = "item_condition") // fixed this field name too
    private String itemCondition;

    private String purpose;
}
