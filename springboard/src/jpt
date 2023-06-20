package com.jmean.jmean.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.google.gson.Gson;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;


import java.io.IOException;

@Controller
public class controller {

    private static final String API_KEY = "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";
    private static final String API_URL = "https://api.openai.com/v1/completions";
    private static final MediaType JSON = MediaType.get("application/json; charset=utf-8");
    private static final OkHttpClient client = new OkHttpClient();
    private static final Gson gson = new Gson();
    @GetMapping("/home")
    public String home() {
        return "home";
    }
    @PostMapping("/gpt-api")
    public @ResponseBody ResponseEntity<?> generateReply(@RequestBody String message) {
        try {
            String reply = sendCompletionRequest(message);
            return ResponseEntity.ok(new ChatResponse(reply));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Oops! Something went wrong.");
        }
    }

    private String sendCompletionRequest(String prompt) throws IOException {
        String json = "{\"prompt\": \"" + prompt + "\", \"max_tokens\": 60}";

        RequestBody body = RequestBody.create(json, JSON);
        Request request = new Request.Builder()
                .url(API_URL)
                .header("Authorization", "Bearer " + API_KEY)
                .post(body)
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (response.isSuccessful()) {
                String responseBody = response.body().string();
                CompletionResponse completionResponse = gson.fromJson(responseBody, CompletionResponse.class);
                if (completionResponse != null) {
                    return completionResponse.choices[0].text;
                }
            } else {
                // Handle error response
                System.out.println("Error: " + response.code() + " - " + response.message());
            }
        }

        return "";
    }

    private static class CompletionResponse {
        private CompletionChoice[] choices;
    }

    private static class CompletionChoice {
        private String text;
    }

    private static class ChatResponse {
        private String reply;

        public ChatResponse(String reply) {
            this.reply = reply;
        }

        public String getReply() {
            return reply;
        }

        public void setReply(String reply) {
            this.reply = reply;
        }
    }



}
