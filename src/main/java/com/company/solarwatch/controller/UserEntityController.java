package com.company.solarwatch.controller;

import com.company.solarwatch.model.Role;
import com.company.solarwatch.model.UserEntity;
import com.company.solarwatch.model.payload.JwtResponse;
import com.company.solarwatch.model.payload.UserRequest;
import com.company.solarwatch.repository.UserEntityRepository;
import com.company.solarwatch.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/user")
public class UserEntityController {

    private final UserEntityRepository userEntityRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    @Autowired
    public UserEntityController(UserEntityRepository userEntityRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.userEntityRepository = userEntityRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/register_user")
    public ResponseEntity<Void> createUser(@RequestBody UserRequest signUpRequest) {
        UserEntity user = new UserEntity(signUpRequest.getUsername(),
                passwordEncoder.encode(signUpRequest.getPassword()), Set.of(Role.ROLE_USER));
        userEntityRepository.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/register_admin")
    public ResponseEntity<Void> createAdmin(@RequestBody UserRequest signUpRequest) {
        UserEntity user = new UserEntity(signUpRequest.getUsername(),
                passwordEncoder.encode(signUpRequest.getPassword()), Set.of(Role.ROLE_ADMIN));
        userEntityRepository.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody UserRequest loginRequest) {

        Authentication authentication = authenticationManager
                .authenticate(
                        new UsernamePasswordAuthenticationToken(
                                loginRequest.getUsername(),
                                loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        User userDetails = (User) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                .toList();

        return ResponseEntity
                .ok(new JwtResponse(jwt, userDetails.getUsername(), roles));
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('USER')")
    public String me() {
        User user = (User) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        return "Hello " + user.getUsername();
    }

    @GetMapping("/public")
    public String publicEndpoint() {
        return "Public\n";
    }
}
