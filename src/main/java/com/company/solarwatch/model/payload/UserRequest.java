package com.company.solarwatch.model.payload;

import lombok.Data;

@Data
public class UserRequest {
    private String username;
    private String password;
}
