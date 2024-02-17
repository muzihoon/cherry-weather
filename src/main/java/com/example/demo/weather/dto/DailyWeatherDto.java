package com.example.demo.weather.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DailyWeatherDto {
    private String city;
    private String area;
    private String weather;
    private String currentTemp;
    private String minTemp;
    private String maxTemp;
    private String windDirection;
    private String windSpeed;
    private String rainProbability;
    private String rainfall;
    private String humidity;
}
