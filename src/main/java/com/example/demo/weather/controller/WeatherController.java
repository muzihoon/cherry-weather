package com.example.demo.weather.controller;

import com.example.demo.weather.dto.NowWeatherReqDto;
import com.example.demo.weather.dto.NowWeatherResDto;
import com.example.demo.weather.service.GeoLocationService;
import com.example.demo.weather.service.NowWeatherService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/weather")
public class WeatherController {

    private final NowWeatherService nowWeatherService;
    private final GeoLocationService geoLocationService;


    @GetMapping("/now/info")
    public List<NowWeatherReqDto> getNowWeather() {
        return nowWeatherService.getNowWeather();
    }

    @GetMapping("/now")
    public List<NowWeatherResDto> getFormattedNowWeather() {
        return nowWeatherService.getFormattedNowWeather();
    }
}