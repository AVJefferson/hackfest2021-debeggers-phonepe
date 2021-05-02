package com.example.phonepe;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

public class OTPActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_o_t_p);
        getSupportActionBar().hide();
        findViewById(R.id.btnLogin2).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(OTPActivity.this,DoneActivity.class));
            }
        });
    }
}