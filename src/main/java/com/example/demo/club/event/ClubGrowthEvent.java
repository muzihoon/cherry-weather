package com.example.demo.club.event;

import com.example.demo.account.dto.AccountDetails;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class ClubGrowthEvent extends ApplicationEvent {

    private final Long clubId;
    private final boolean isIncrease;
    private final AccountDetails accountDetails;
    private final int score;

    public ClubGrowthEvent(Object source, Long clubId, boolean isIncrease, AccountDetails accountDetails, int score) {
        super(source);
        this.clubId = clubId;
        this.isIncrease = isIncrease;
        this.accountDetails = accountDetails;
        this.score = score;
    }
}
