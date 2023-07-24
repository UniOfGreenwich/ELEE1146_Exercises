package com.example.allofthesensors;

import androidx.appcompat.app.AppCompatActivity;
import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorManager;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.TextView;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.regex.Pattern;

public class MainActivity extends AppCompatActivity{

    private SensorManager mgr;
    private TextView vendorTV;
    private Spinner spinner;
    private String sensorFields[] = {"mMaxDelay", "mMaxRange","mMinDelay","mName","mPower","mRequiredPermission","mResolution"};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ArrayList<String> sensorList = new ArrayList<>();
        mgr = (SensorManager) getSystemService(Context.SENSOR_SERVICE);

        vendorTV = findViewById(R.id.textView2);

        spinner =findViewById(R.id.spinnerTV);

        for (Sensor s: mgr.getSensorList(Sensor.TYPE_ALL))
        {
            sensorList.add(s.getName());
        }

        ArrayAdapter<String> arrayAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item,sensorList);
        arrayAdapter.setDropDownViewResource(com.google.android.material.R.layout.support_simple_spinner_dropdown_item);
        spinner.setAdapter(arrayAdapter);

        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {

                for(Sensor s: mgr.getSensorList(Sensor.TYPE_ALL))
                {
                    String selectedSensor = spinner.getSelectedItem().toString();

                    if(s.getName()== selectedSensor)
                    {
                        StringBuilder stringBuilder = new StringBuilder();
                        for (Field field : s.getClass().getDeclaredFields())
                        {
                            for(int k = 0;k < sensorFields.length; k++)
                            {
                                Pattern p = Pattern.compile(field.getName());

                                if(p.matcher(sensorFields[k]).matches())
                                {
                                    field.setAccessible(true);
                                    stringBuilder.append(field.getName().toString() + ": ");
                                    try {
                                        Object value = field.get(s);
                                        String valueStr = (value.toString().isEmpty()) ? "N/A \n\n":  value + "\n\n" ;
                                        stringBuilder.append(valueStr);
                                    } catch (IllegalAccessException e) {
                                        e.printStackTrace();
                                    }
                                }
                            }
                        }
                        vendorTV.setText(stringBuilder);
                        break;
                    }
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });

    }
}