package com.jmean.jmean.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/get-api")
public class controller {

    @GetMapping(value = "/name")
    public String getName(){
        return "jmean";
    }


    //어느위치에서 값을 받을 지 지정해서 중괄호 입력
    //매개 변수와 그 값을 연결하기 위해 @PathVariable을 명시
    //getmapping과 pathvariable 변수이름을 동일하게 맞춰야 함
    @GetMapping(value = "/variable1/{variable}")
    public String getVariable1(@PathVariable String variable){
        return variable;
    }
}
