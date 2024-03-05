package com.example.demo.gpt.choice;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@NoArgsConstructor
public class Choice implements Serializable {

    private String text;
    private Integer index;
    @JsonProperty("finish_reason")
    private String finishReason;
//    @JsonProperty("logprobs")
//    private String logprobs;

    @Builder
//    public Choice(String text, Integer index, String finishReason, String logprobs) {
    public Choice(String text, Integer index, String finishReason) {
        this.text = text;
        this.index = index;
        this.finishReason = finishReason;
//        this.logprobs = logprobs;
    }
}