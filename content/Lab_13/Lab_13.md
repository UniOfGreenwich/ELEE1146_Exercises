# Lab 13: Sensors 1

You are going to see how to use the `Sensor` and `SensorManager` classes to see which sensors are available and some of their fields. You will also learn of the classes `Field`, `StringBuilder` and `Pattern`. 


Open Android Studio and create a new project and call it `allofthesensors`.

## 1. `activity_main.xml`

First off in the `activity_main.xml` design view add: 

1.  a `Spinner` widget offset from the top of the screen, remember to constrain the to edges of the screen.
2.  Set the width as `408dp` and height as `61dp` 
3.  change id to `sensorsSP`
4.  Likewise grab a `TextView` and add it to the the middle of the screen, again anchoring it in place.
5.  Set the width as `234dp` and height as `284dp` 
6.  change id to `sensorInfoTV`

## 2. `MainActivity.java`

Start off by adding these variables to the class.

```java
private SensorManager mgr;
private TextView sensorInfoTV;
private Spinner sensorSP;
private String sensorFields[] = {"mMaxDelay", "mMaxRange","mMinDelay","mName","mPower","mRequiredPermission","mResolution"};
```

- `SensorManager` lets you access the device's `sensors`.
- `String sensorFields[]...` will be used as to indentify the senors fields wanted to be returned to the user.

Next in side the `main()` function underneath `setContent...` add the following lines.

```java
ArrayList<String> sensorList = new ArrayList<>();
mgr = (SensorManager) getSystemService(Context.SENSOR_SERVICE);

sensorInfoTV = findViewById(R.id.sensorInfoTV);

sensorSP =findViewById(R.id.sensorSP);

for (Sensor s: mgr.getSensorList(Sensor.TYPE_ALL))
{
    sensorList.add(s.getName());
}
```

- The `ArrayList` class is a resizable array, which can be found in the j`ava.util` package.
- The difference between a *built-in* `array` and an `ArrayList` in Java, is that the size of an array cannot be modified (if you want to add or remove elements to/from an array, you have to create a new one). While elements can be added and removed from an `ArrayList` whenever you want.
- `getSystemService(Context.SENSOR_SERVICE)` to retrieve a `android.hardware.SensorManager` for accessing sensors.
- The snippet below iterates over all sensors on the device and gets their types an object of the class `Sensor` and adds them to the `ArrayList<>String...`. 
  


```java
for (Sensor s: mgr.getSensorList(Sensor.TYPE_ALL))
{
    sensorList.add(s.getName());
}
```

Now you need to add an `ArrayAdapter`

```java
ArrayAdapter<String> arrayAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item,sensorList);
arrayAdapter.setDropDownViewResource(com.google.android.material.R.layout.support_simple_spinner_dropdown_item);
spinner.setAdapter(arrayAdapter);
```

- `ArrayAdapter`'s returns a view for each object in a collection of data objects you provide, and can be used with list-based user interface widgets such as `ListView` or `Spinner`
- The `ArrayAdapter`s `<>` needs a type (`T`) so we supplied `String`. In fact `T` is means any generic `Type` that is `String`, `Integer` or `Object`.


Now you need to create an `OnItemSelectedListener` for this `spinner` with `AdapterView` class. The code below is extensive, and may seem overwhelming at first but will be explained afterwards.

```java
spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
    @Override
    public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {

        for(Sensor s: mgr.getSensorList(Sensor.TYPE_ALL))
        {
            String selectedSensor = sensorSP.getSelectedItem().toString();

            if(s.getName()== selectedSensor)
            {
                StringBuilder stringBuilder = new StringBuilder();
                for (Field field : s.getClass().getDeclaredFields())
                {
                    Pattern p = Pattern.compile(field.getName());
                    
                    for(int k = 0;k < sensorFields.length; k++)
                    {
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
                sensorInfoTV.setText(stringBuilder);
                break;
            }
        }
    }

    @Override
    public void onNothingSelected(AdapterView<?> adapterView) {

    }
});

```

A lot to break down here:

1. `for(Sensor s: mgr.getSensorList(Sensor.TYPE_ALL))` this is fimilar as was executed earlier when the `spinner` was populated. Now it will be used to select information about the chosen sensor. 
2. `String selectedSensor = spinner.getSelectedItem().toString();` the spinner as a method called `getSelectedItem()` and does exactly what it says and this is saved to the String variable. 
3. `if(s.getName() == selectedSensor)` the object `s`'s, of class `Sensor`, name is compated to the `selectedSensor` and if it matches then we can get information abou that sensor. 
4. `StringBuilder stringBuilder = new StringBuilder();`, remember from the lecture that the `StringBuilder` is used to create an easily mutable (modifiable) `String`.
5. `for (Field field : s.getClass().getDeclaredFields())`, a few bits to understand here. 
   - `Field` is a class that enables the access of another class/object's variable fields ie. `private int android.hardware.Sensor.mFifoMaxEventCount` of `Sensor` class.
   - Returning the `s` object's class declared variables is achieved by using the method `getDeclaredFields()`.
6. `Pattern p = Pattern.compile(field.getName());`, creates a way to use regular expression(regex). Here `filed.getName()` is supplied as the pattern we want to search with or for.
7. `if(p.matcher(sensorFields[k]).matches())`, using the `Pattern` object p that stores the current `field` `name`  a comparsion can now be made with the array of `sensorFields` declared earlier. The `matches()` returns `true` of `false`.
8. `field.setAccessible(true);`, makes the field accessible, meaning that while variable could be `private` it is still retreivable. for instance..
   - `private int android.hardware.Sensor.mFifoMaxEventCount` 
9. `stringBuilder.append(field.getName().toString() + ": ");`, begins building the string with the field name and a colon.
10. In the `try` block `String valueStr = (value.toString().isEmpty()) ? "N/A \n\n":  value + "\n\n" ;` is an inline if statement that the `(value.toString().isEmpty())` returns `true` or `false`. On return the `?` acts as a tenary operator and acts as the `if`
    - format `x = (statement) ? thing_to_do_if_true : thing_to_do_if_false; ` 

You should be good to run the program now, create virtual device and test the app.

![](./figures/AllofSensorsList.png)![](./figures/Sensor_Orientation.png)

Once, tried with one type of virtual device, try using a different one, see if you get different sensors.


## 3. Full code below.

```java
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
    private TextView sensorInfoTV;
    private Spinner SensorSP;
    private String sensorFields[] = {"mMaxDelay", "mMaxRange","mMinDelay","mName","mPower","mRequiredPermission","mResolution"};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ArrayList<String> sensorList = new ArrayList<>();
        mgr = (SensorManager) getSystemService(Context.SENSOR_SERVICE);

        sensorInfoTV = findViewById(R.id.sensorInfoTV);

        sensorSP =findViewById(R.id.sensorSP);

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
                            Pattern p = Pattern.compile(field.getName());
                            
                            for(int k = 0;k < sensorFields.length; k++)
                            {
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
                        sensorInfoTV.setText(stringBuilder);
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
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <Spinner
        android:id="@+id/sensorsSP"
        android:layout_width="408dp"
        android:layout_height="61dp"
        android:spinnerMode="dialog"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.0"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.104" />

    <TextView
        android:id="@+id/sensorInfoTV"
        android:layout_width="234dp"
        android:layout_height="284dp"
        android:text="TextView"
        android:textColor="@color/black"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```