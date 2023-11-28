# Lab 14: Sensors 1

You are going to see how to use the `Sensor` and `SensorManager` classes to see which sensors are available and some of their fields. You will also learn of the classes `Field`, `StringBuilder`, `Pattern` and concept of **reflection**. 


Open Android Studio and create a new project and call it `allofthesensors`.

## Step 1: `activity_main.xml`

First off in the `activity_main.xml` design view add: 

1.  a `Spinner` widget offset from the top of the screen, remember to constrain the to edges of the screen.
2.  Set the width as `408dp` and height as `61dp` 
3.  change id to `sensorsSP`
4.  Likewise grab a `TextView` and add it to the the middle of the screen, again anchoring it in place.
5.  Set the width as `234dp` and height as `284dp` 
6.  change id to `sensorInfoTV`

    <div align=center>

    ![](figures/step1.png)

    </div>

## Step 2: `strings.xml`

7. Open the `strings.xml` and add the following string resources:

   |Attribute|Text|
   |---|---|
   |app_name|AllOfTheSensors|
   |total_sensors|Total # Sensors: | 
   |spinnerPrompt|Select a sensor|

8. Remember to refernce the string resources in the `activity_main.xml` widgets you have added.

## Step 3: `MainActivity.kt`

9. Open the `MainActivity.kt` and add to the top of the class:

    ```kt
    ...
    class MainActivity : AppCompatActivity() {
        private var mgr: SensorManager? = null // Declare a SensorManager object
        ...
    }
    ```

10. Next we need initialise the various UI elements. You should know how to do this by now: 

    <details>

    <summary>Solution</summary>

    ```kt
    ...
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main) // Set the content view to the activity_main layout

        // Initialise various UI elements
        val sensorInfoTV: TextView = findViewById(R.id.sensorInfoTV)
        val sensorsSP: Spinner = findViewById(R.id.sensorsSP)
        val sensorCountTV: TextView = findViewById(R.id.sensorCountTV)

        ...
    }
    ```

    </details>

11. Now we need to declare and initialise the a list for the `spinner` widget. Then initialise the `mgr` our `SensorManager` object and populate the list with all the sensor names.

    ```kt
    override fun onCreate(savedInstanceState: Bundle?) {
        ...
        val sensorList = ArrayList<String>() // Initialise a list to store sensor names
        mgr = getSystemService(SENSOR_SERVICE) as SensorManager // Initialise the SensorManager we declared earlier

        // get the all available sensors and populate the sensorList their names
        for (s in mgr!!.getSensorList(Sensor.TYPE_ALL)) {
            sensorList.add(s.name)
        }
        ...
    }
    ```

12. We could count the number of sensors using `mgr!!.getSensorList(Sensor.TYPE_ALL)`, but there is no need to invoke all of that again, instead will can just get the `size` of the `sensorList`. After the `for` loop append the `sensorCountTV` with the number of sensors:

    ```kt
        ...
        for (s in mgr...)
        {
            ...
        }
        
        // Append the count of available sensors to the sensorCountTV TextView
        sensorCountTV.append(sensorList.size.toString())
    ```

13. Now we need to create an object of the `ArrayAdapter` so we can fill the `spinner` widget with `sensorList`. After the sensorCountTV do the following:
 
    ```kt
        ...
        sensorCountTV.append(...)

        // Create an ArrayAdapter to display the sensor names in a Spinner
        val arrayAdapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, sensorList)
        arrayAdapter.setDropDownViewResource(com.google.android.material.R.layout.support_simple_spinner_dropdown_item)
        sensorsSP.adapter = arrayAdapter
        ...
    }
    ```


## Step 4: Getting the Sensor Attributes and Characteristics

14. After setting the `sensorsSP.adapter ...` we need to write the code so that when the spinner item is selected we can retrieve the attributes and characteristics of the selected sensor:

    ```kt

    sensorsSP.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
                override fun onItemSelected(adapterView: AdapterView<*>?, view: View, i: Int, l: Long) {

                }
    }
    ```
    The above code should look very familiar as we have done the a `spinner.onItemSelectedListener`

15. Now we have our `onItemSelectedListener` we need to get the selected item 

    ```kt
    ...
    AdapterView<*>?, view: View, i: Int, l: Long) {               
        for (s in mgr!!.getSensorList(Sensor.TYPE_ALL)) {
            // get selected sensor
            val selectedSensor: String = sensorsSP.getSelectedItem().toString()
        }
    }
    ```


16. By using an `if` statement we can compare the `selectedSensor` against the current sensor (`s`) in the sensor manager (`mgr`). If the `s.name` matches the `selectedSensor` then we can initialise a `StringBuilder` object.
    
    ```kt
    ...
    val selectedSensor: String = sensorsSP.getSelectedItem().toString()

    // Check if the selected sensor's name matches the current sensor's name
    if (s.name === selectedSensor) {
        val stringBuilder = StringBuilder()

    }
    ```

    >**Note**
    >> In Kotlin there are two types of equality: 
    >> - Structural equality ( `==` - a check for equals() ) 
    >> - Referential equality ( `===` - two references point to the same object
    >> So `s.name` is an object and `selectedSensor` as a string is technically an object when compated this way.    

17. Now we are going to implement **reflection** in order to call all the functions that are not private and take no arguments. The aim here is to find out as much as we can about each sensor object through open,non nullable methods with a paramenter size of 0.
 
    ```kt
    // Iterate through the methods of the sensor's class
    for (method in s.javaClass.methods) {
        try {
            // Use reflection to find and call methods with certain criteria
            val methodFound: KFunction<*>? = s::class.members.find { 
                it.name === method.name 
            } as? KFunction<*>
            if (methodFound != null && methodFound.isOpen && methodFound.parameters.size <= 1) {
                // Append method name and result to the StringBuilder
                stringBuilder.append(method.name)
                .append(": ", methodFound.call(s)).append("\n")
            }
        } catch (e: ReflectiveOperationException) {
            // Handle exceptions if the method is not found
            var error: String = e.message.toString()
            Toast.makeText(this@MainActivity,"${e.message}",Toast.LENGTH_LONG)
            stringBuilder.append(": Error\n")
        }
    }
    ```

    There is a lot to break down here and while the comments provide a top level explanation:

    - `KFunction<*>` is a useful class that enables the program... 
      ```kt
      val methodFound: KFunction<*>? = s::class.members.find { 
                  it.name === method.name 
            } as? KFunction<*>
      ```
    - we can see that the `lambda` expression is used `it` to.. and that this is compared using object comparison syntax `===`. 
    - The `if` condition
      ```kt
      if (methodFound != null && methodFound.isOpen 
                                    && methodFound.parameters.size <= 1)
      ```

You should be good to run the program now, create virtual device and test the app.

![](./figures/AllofSensorsList.png)![](./figures/Sensor_Orientation.png)

Once, tried with one type of virtual device, try using a different one, see if you get different sensors.


## 3. Full code below.

<details>

<summary>MainActivity</summary>

```kt
package com.example.mobileapps_allofthesensors

import android.hardware.Sensor
import android.hardware.SensorManager
import android.os.Bundle
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Spinner
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import kotlin.reflect.KFunction

class MainActivity : AppCompatActivity() {
    private var mgr: SensorManager? = null // Declare a SensorManager object

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main) // Set the content view to the activity_main layout

        // Initialise various UI elements
        val sensorInfoTV: TextView = findViewById(R.id.sensorInfoTV)
        val sensorsSP: Spinner = findViewById(R.id.sensorsSP)
        val sensorCountTV: TextView = findViewById(R.id.sensorCountTV)

        val sensorList = ArrayList<String>() // Create a list to store sensor names
        mgr = getSystemService(SENSOR_SERVICE) as SensorManager // Initialise the SensorManager

        // Retrieve the list of available sensors and populate the sensorList
        for (s in mgr!!.getSensorList(Sensor.TYPE_ALL)) {
            sensorList.add(s.name)
        }

        // Append the count of available sensors to the sensorCountTV TextView
        sensorCountTV.append(sensorList.size.toString())

        // Create an ArrayAdapter to display the sensor names in a Spinner
        val arrayAdapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, sensorList)
        arrayAdapter.setDropDownViewResource(com.google.android.material.R.layout.support_simple_spinner_dropdown_item)
        sensorsSP.adapter = arrayAdapter

        // Set an item selected listener for the Spinner
        sensorsSP.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(adapterView: AdapterView<*>?, view: View, i: Int, l: Long) {
                for (s in mgr!!.getSensorList(Sensor.TYPE_ALL)) {
                    val selectedSensor: String = sensorsSP.getSelectedItem().toString()

                    // Check if the selected sensor's name matches the current sensor's name
                    if (s.name === selectedSensor) {
                        val stringBuilder = StringBuilder()

                        // Iterate through the methods of the sensor's class
                        for (method in s.javaClass.methods) {
                            try {
                                // Use reflection to find and call methods with certain criteria
                                val methodFound: KFunction<*>? =
                                    s::class.members.find { it.name == method.name } as? KFunction<*>
                                if (methodFound != null && methodFound.isOpen && methodFound.parameters.size <= 1) {
                                    // Append method name and result to the StringBuilder
                                    stringBuilder.append(method.name)
                                        .append(": ", methodFound.call(s)).append("\n")
                                }
                            } catch (e: ReflectiveOperationException) {
                                // Handle exceptions if the method is not found
                                var error: String = e.message.toString()
                                Toast.makeText(this@MainActivity,"${e.message}",Toast.LENGTH_LONG)
                                stringBuilder.append(": Error\n")
                            }
                        }
                        // Display sensor information in the sensorInfoTV TextView
                        sensorInfoTV.text = stringBuilder
                        break
                    }
                }
            }

            override fun onNothingSelected(adapterView: AdapterView<*>?) {
                // This function is empty as no action is needed when nothing is selected.

                sensorInfoTV.text = ""
            }
        }
    }
}
```

</details>

<details>

<summary>main_activity xml</summary>

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

</details>