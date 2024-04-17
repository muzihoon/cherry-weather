package com.example.demo.common.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisClusterConfiguration;
import org.springframework.data.redis.connection.RedisPassword;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.util.Arrays;
import java.util.List;

/**
 * REDIS 설정
 */
@Configuration
@RequiredArgsConstructor
public class RedisConfig {

    private final RedisProperties redisProperties;

    @Bean
    public LettuceConnectionFactory redisConnectionFactory() {
        String host = redisProperties.getHost();
        int port = redisProperties.getPort();
        String password = redisProperties.getPassword();
        String user = redisProperties.getUser();

        RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration(host, port);

//        if (user != null && !user.isEmpty()) {
//            redisStandaloneConfiguration.setUsername(user);
//        }
//
//        if (password != null && !password.isEmpty()) {
//            redisStandaloneConfiguration.setPassword(RedisPassword.of(password));
//        }

        return new LettuceConnectionFactory(redisStandaloneConfiguration);
    }

//    @Bean
//    public LettuceConnectionFactory redisConnectionFactory() {
//        // 클러스터 노드 설정
//        List<String> clusterNodes = Arrays.asList(
//                "clustercfg.cherryweather-redis.cebcnl.memorydb.ap-northeast-2.amazonaws.com:6379",
//                "clustercfg.cherryweather-redis.cebcnl.memorydb.ap-northeast-2.amazonaws.com:6379",
//                "clustercfg.cherryweather-redis.cebcnl.memorydb.ap-northeast-2.amazonaws.com:6379"
//        );
//
//        // RedisClusterConfiguration 객체 생성
//        RedisClusterConfiguration redisClusterConfiguration = new RedisClusterConfiguration(clusterNodes);
//
//        // LettuceConnectionFactory 생성
//        return new LettuceConnectionFactory(redisClusterConfiguration);
//    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate() {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new StringRedisSerializer());
        redisTemplate.setHashKeySerializer(new StringRedisSerializer());
        redisTemplate.setHashValueSerializer(new StringRedisSerializer());
        redisTemplate.setConnectionFactory(redisConnectionFactory());
        return redisTemplate;
    }

    @Bean
    public StringRedisTemplate stringRedisTemplate() {
        StringRedisTemplate stringRedisTemplate = new StringRedisTemplate();
        stringRedisTemplate.setKeySerializer(new StringRedisSerializer());
        stringRedisTemplate.setValueSerializer(new StringRedisSerializer());
        stringRedisTemplate.setConnectionFactory(redisConnectionFactory());
        return stringRedisTemplate;
    }
}
