# Lab 10.1 All of the Sensors

## Overview

<table style="border-collapse: collapse; border: none; table-layout: fixed; width: 100%;" >
<tr style="border: none;">
<td style="border: none; width:60%;">

In this lab, you will learn how to create an Android application using Jetpack Compose to list and interact with device sensors. You'll use `reflection` to gather information about available sensors, display it dynamically, and update sensor data in real-time.

</td>
<td style="border: none; width:33%;">


![](./figures/all_of_the_sensors.gif)

</td>
</tr>
</table>

---

## Step-by-Step Instructions

### Step 1: Set Up the Project
1. Open Android Studio and create a new **Empty Compose Activity** project.
2. Name the project `AllOfTheSensors`.
3. Ensure the `minSdk` is set to `24` or higher.
4. Place the following logo into mipmap [all_of_the_sensors_logo.png](./figures/all_of_the_sensors_logo.png)
---

### Step 2: Add the Required Dependencies
Ensure the following dependencies are included in the `build.gradle` file:

~~~admonish code

```gradle
dependencies {
    ...
    implementation(kotlin("reflect"))
}
```

~~~

---

### Step 3: Understand the Application Structure
The app consists of:
1. **MainActivity**: Sets up the `SensorManager` and initializes the Compose UI.
2. **SensorApp**: A composable function to display sensor information.
3. **SensorDropdownMenu**: A dropdown menu for selecting sensors.
4. **RealTimeSensorData**: Displays real-time data from the selected sensor.
5. **Helper Functions**: For retrieving sensor information and handling sensor events.

---

### Step 4: Create the Main Activity
1. Replace the content of `MainActivity.kt` with:
   
   ~~~admonish code  collapsible=true title='Suppressed code ...[14 lines]'
   
   ```kotlin
   class MainActivity : ComponentActivity() {
       private var mgr: SensorManager? = null

       override fun onCreate(savedInstanceState: Bundle?) {
           super.onCreate(savedInstanceState)
           mgr = getSystemService(SENSOR_SERVICE) as SensorManager
           setContent {
               AllOfTheSensorsTheme {
                   Surface(color = MaterialTheme.colorScheme.background) {
                       SensorApp(mgr!!)
                   }
               }
           }
       }
   }
   ```

   ~~~

---

### Step 5: Implement the `SensorApp` Composable
1. Add the `SensorApp` function in the same file or create a new file for composables.
2. This function initialises UI elements and manages sensor data.

   ~~~admonish code  collapsible=true title='Suppressed code ...[13 lines]'

   ```kotlin
   ...

   @OptIn(ExperimentalMaterial3Api::class)
   @Composable
   fun SensorApp(mgr: SensorManager) { 
        val sensorList = rememberSaveable { mutableStateOf(listOf<String>()) }
        val selectedSensor = rememberSaveable { mutableStateOf<String?>(null) }
        val sensorInfo = rememberSaveable { mutableStateOf("") }
        val sensorData = remember { mutableStateOf("No data") }

        LaunchedEffect(Unit) {
            sensorList.value = mgr.getSensorList(Sensor.TYPE_ALL).map { it.name }
        }
   }
   ```

   ~~~

   ~~~admonish example title='Explanation of LaunchedEffect'
   
   `LaunchedEffect(Unit)` is a composable function in Jetpack Compose that is used to run a block of suspendable code when a given key (in this case, Unit) changes or the composable enters the composition.
   
   - **Side Effects in Compose**: `LaunchedEffect` is designed to handle side effects safely in the context of the composable lifecycle.

   - **Runs Once or When Dependencies Change**: When the provided key(s) change, or when the composable enters the composition for the first time, the lambda inside `LaunchedEffect` is executed.

   ~~~

3. 

---

### Step 6: Create the `SensorDropdownMenu` Composable
1. Define a dropdown menu to list all available sensors.
2. Implement the `SensorDropdownMenu` function.

    ~~~admonish info

    There is nothing new in this code with reference to a `DropDownMenu`

    ~~~

    ~~~admonish code collapsible=true title='Suppressed code ...[34 lines]'

    ```kt
    @Composable
    fun SensorDropdownMenu(
        sensorList: List<String>,
        onSensorSelected: (String) -> Unit
    ) {
        var expanded by rememberSaveable { mutableStateOf(false) }

        Column {
            Button( modifier = Modifier.padding(5.dp,0.dp),
                onClick = { expanded = true }) {
                Text("Select Sensor")
            }

            DropdownMenu(
                expanded = expanded,
                onDismissRequest = { expanded = false },
            ) {
                val scrollState = rememberScrollState()
                Column(modifier = Modifier
                    .heightIn(max = 400.dp)
                    .verticalScroll(scrollState)) {
                    sensorList.forEach { sensorName ->
                        DropdownMenuItem(
                            text = {
                                Text(text = sensorName)
                            },
                            onClick = {
                            onSensorSelected(sensorName)
                            expanded = false
                        })
                    }
                }
            }
        }
    }
    ```

    ~~~

---

### Step 7: Add Reflection to Retrieve Sensor Details
1. Use the `getSensorInfo` function to extract sensor details using reflection.
2. Understand how Java reflection is applied to get sensor methods dynamically.

    ~~~admonish code  collapsible=true title='Suppressed code ...[22 lines]'

    ```kt
    fun getSensorInfo(sensorName: String, mgr: SensorManager): String {
        val sensor = mgr.getSensorList(Sensor.TYPE_ALL).find { it.name == sensorName }
        sensor?.let {
            val stringBuilder = StringBuilder()
            for (method in it.javaClass.methods) {
                try {
                    val result = if (method.parameterTypes.isEmpty()) {
                        method.invoke(it)
                    } else {
                        "N/A"
                    }
                    if (method.parameterCount == 0 ) {
                        stringBuilder.append(method.name).append(": ")
                            .append(result).append("\n")
                    }
                } catch (e: Exception) {
                    stringBuilder.append(method.name).append(": Error\n")
                }
            }
            return stringBuilder.toString()
        }
        return "Sensor not found"
    }
    ```

    ~~~

    ~~~admonish example title='Explanation of reflection in the code'

    - `it.javaClass.methods`: Retrieves all public methods of the sensor object as an array.

    - **Iteration**: For each method, the code inspects and invokes it.

        - `method.parameterTypes.isEmpty()`: Checks if the method has no parameters. This is important because invoking methods with parameters dynamically would require additional inputs and setup.

        - `method.invoke(it)`: If the method has no parameters, it is called (invoked) on the sensor object (`it`). The result of the method is stored in `result`.

        - `method.parameterCount == 0`: Ensures only methods with zero parameters are appended to the `StringBuilder`.

    ~~~

---

### Step 8: Handle Real-Time Sensor Data
1. Implement `RealTimeSensorData` to display updated sensor data.
2. Use `DisposableEffect` to register and unregister listeners.

    ~~~admonish code  collapsible=true title='Suppressed code ...[16 lines]'

    ```kt
    @Composable
    fun RealTimeSensorData(sensorName: String?, mgr: SensorManager, sensorData: MutableState<String>) {
        if (sensorName != null) {
            val sensor = mgr.getSensorList(Sensor.TYPE_ALL).find { it.name == sensorName }
            sensor?.let {
                val sensorEventListener = remember { createSensorEventListener(sensorData) }
                DisposableEffect(sensor) {
                    mgr.registerListener(sensorEventListener,
                        sensor,
                        SensorManager.SENSOR_DELAY_NORMAL)
                    onDispose {
                        mgr.unregisterListener(sensorEventListener)
                    }
                }
            }
        }
    }
    ```

    ~~~

    ~~~admonish example title='Explanation of DisposableEffect(..)'

    `DisposableEffect` is a composable function in Jetpack Compose that is used to manage resources or side effects that need cleanup when the composable leaves the composition. It's particularly useful for scenarios like registering listeners or observers, where you need to ensure proper cleanup to avoid memory leaks or unintended behavior.

    - Setup (`registerListener`):

        - The `DisposableEffect` block is triggered when the sensor is selected (i.e., when the sensor key changes).
        - It registers a `SensorEventListener` to start receiving data from the sensor.
    
    - Cleanup (`unregisterListener`):

        - The `onDispose` block is called when the composable leaves the composition or the sensor key changes.
        - The `SensorEventListener` is unregistered to ensure no further updates are received from the sensor.

    Without `DisposableEffect`, you’d need to manually manage the setup and cleanup outside of the composable lifecycle, which increases the risk of errors like memory leaks or dangling listeners. With `DisposableEffect`, you can keep the setup and cleanup logic co-located and ensure proper lifecycle management automatically.
    
    ~~~

---

### Step 9: createSensorEventListener(...)

1. Implement `createSensorEventListener` to monitor sensor events.

    ~~~admonish code  collapsible=true title='Suppressed code ...[11 lines]'

    ```kt
    fun createSensorEventListener(sensorData: MutableState<String>): SensorEventListener {
        return object : SensorEventListener {
            override fun onSensorChanged(event: SensorEvent) {
                val data = event.values.joinToString(", ") { it.toString() }
                sensorData.value = "Sensor data: $data"
            }

            override fun onAccuracyChanged(sensor: Sensor, accuracy: Int) {
                // Handle accuracy changes if needed
            }
        }
    }
    ```

    ~~~

    ~~~admonish example title='Explanation of Sensor functions'

    - `override` keyword indicates that a method in a class is overriding a method or function declared in a superclass or interface

        - The `SensorEventListener` is an interface provided by the Android framework for monitoring sensor events. It has two methods that must be implemented:

            - `onSensorChanged(SensorEvent event)` is called when the sensor provides new data.

            - The `onAccuracyChanged(Sensor sensor, int accuracy)` is called when the sensor's accuracy changes.
    
    - If you don't `override` these methods:
        - These compiler would throw an error because you're implementing the `SensorEventListener` interface, which requires these methods.
        - Without providing a custom implementation, the interface-defined methods would remain unimplemented, resulting in incomplete functionality.
    ~~~
---


### Step 10: Composables for SensorApp()

1. Revisit the function `SensorApp(...){}` and after `LaunchedEffect(...){...}`
2. ~~~admonish code collapsible=true title='Suppressed code... [62 lines]'

    ```kt
    ...
    Scaffold(topBar = {
        TopAppBar(
            title = {Text("All of the Sensors")},
            navigationIcon = {
                Image(painter = painterResource(id = R.mipmap.all_of_the_sensors_logo),
                    contentDescription = "Logo for all of the sensors" ,
                    modifier = Modifier.size(80.dp))
            }
        ) }
    )
    { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(paddingValues)
                .padding(16.dp)
        ) {
            Row(){
                Text(
                    text = "Sensors Count: ${sensorList.value.size}",
                    style = MaterialTheme.typography.headlineSmall)
                Spacer(modifier = Modifier.width(20.dp))
                SensorDropdownMenu(
                    sensorList = sensorList.value,
                    onSensorSelected = { sensorName ->
                        selectedSensor.value = sensorName
                        sensorInfo.value = getSensorInfo(sensorName, mgr)
                        sensorData.value = "Fetching data..."
                    }
                )
            }

            Spacer(modifier = Modifier.height(16.dp))
            Text(text = "Selected Sensor:\n  ${selectedSensor.value.toString()}")
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .size(510.dp)
                    .border(
                        Dp(2f),
                        shape = RectangleShape,
                        color = Color.Black
                    )
            ) {
                Text(
                    text = sensorInfo.value,
                    style = MaterialTheme.typography.bodySmall,
                    modifier = Modifier.padding(10.dp)
                )
            }

            Spacer(modifier = Modifier.height(16.dp))

            RealTimeSensorData(
                sensorName = selectedSensor.value,
                mgr = mgr,
                sensorData = sensorData
            )

            Text(text = sensorData.value,
                style = MaterialTheme.typography.bodyMedium)
        }
    }
    ...
    ```

    ~~~


### Step 11: Run the App
1. Connect a device or use an emulator.
2. Build and run the app.
3. Verify that sensors are listed and real-time data updates when a sensor is selected.


### Full Code, if you are struggling

~~~admonish code collapsible=true title='Full code supressed here, MainActivty.kt ... [217 lines]'
```kt
package com.uog.allofthesensors

import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.Image
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.uog.allofthesensors.ui.theme.AllOfTheSensorsTheme

class MainActivity : ComponentActivity() {
    private var mgr: SensorManager? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mgr = getSystemService(SENSOR_SERVICE) as SensorManager
        setContent {
            AllOfTheSensorsTheme {
                Surface(color = MaterialTheme.colorScheme.background){
                    SensorApp(mgr!!)
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SensorApp(mgr: SensorManager) {
    val sensorList = rememberSaveable { mutableStateOf(listOf<String>()) }
    val selectedSensor = rememberSaveable { mutableStateOf<String?>(null) }
    val sensorInfo = rememberSaveable { mutableStateOf("") }
    val sensorData = remember { mutableStateOf("No data") }

    LaunchedEffect(Unit) {
        sensorList.value = mgr.getSensorList(Sensor.TYPE_ALL).map { it.name }
    }

    Scaffold(topBar = {
        TopAppBar(
            title = {Text("All of the Sensors")},
            navigationIcon = {
                Image(painter = painterResource(id = R.mipmap.all_of_the_sensors_logo),
                    contentDescription = "Logo for all of the sensors" ,
                    modifier = Modifier.size(80.dp))
            }
        ) }
    )
    { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(paddingValues)
                .padding(16.dp)
        ) {
            Row(){
                Text(
                    text = "Sensors Count: ${sensorList.value.size}",
                    style = MaterialTheme.typography.headlineSmall)
                Spacer(modifier = Modifier.width(20.dp))
                SensorDropdownMenu(
                    sensorList = sensorList.value,
                    onSensorSelected = { sensorName ->
                        selectedSensor.value = sensorName
                        sensorInfo.value = getSensorInfo(sensorName, mgr)
                        sensorData.value = "Fetching data..."
                    }
                )
            }

            Spacer(modifier = Modifier.height(16.dp))
            Text(text = "Selected Sensor:\n  ${selectedSensor.value.toString()}")
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .size(510.dp)
                    .border(
                        Dp(2f),
                        shape = RectangleShape,
                        color = Color.Black
                    )
            ) {
                Text(
                    text = sensorInfo.value,
                    style = MaterialTheme.typography.bodySmall,
                    modifier = Modifier.padding(10.dp)
                )
            }

            Spacer(modifier = Modifier.height(16.dp))

            RealTimeSensorData(
                sensorName = selectedSensor.value,
                mgr = mgr,
                sensorData = sensorData
            )

            Text(text = sensorData.value,
                style = MaterialTheme.typography.bodyMedium)
        }
    }
}

@Composable
fun SensorDropdownMenu(
    sensorList: List<String>,
    onSensorSelected: (String) -> Unit
) {
    var expanded by rememberSaveable { mutableStateOf(false) }

    Column {
        Button( modifier = Modifier.padding(5.dp,0.dp),
            onClick = { expanded = true }) {
            Text("Select Sensor")
        }

        DropdownMenu(
            expanded = expanded,
            onDismissRequest = { expanded = false },
        ) {
            val scrollState = rememberScrollState()
            Column(modifier = Modifier
                .heightIn(max = 400.dp)
                .verticalScroll(scrollState)) {
                sensorList.forEach { sensorName ->
                    DropdownMenuItem(
                        text = {
                            Text(text = sensorName)
                        },
                        onClick = {
                        onSensorSelected(sensorName)
                        expanded = false
                    })
                }
            }
        }
    }
}

fun getSensorInfo(sensorName: String, mgr: SensorManager): String {
    val sensor = mgr.getSensorList(Sensor.TYPE_ALL).find { it.name == sensorName }
    sensor?.let {
        val stringBuilder = StringBuilder()
        for (method in it.javaClass.methods) {
            try {
                val result = if (method.parameterTypes.isEmpty()) {
                    method.invoke(it)
                } else {
                    "N/A"
                }
                if (method.parameterCount == 0 ) {
                    stringBuilder.append(method.name).append(": ")
                        .append(result).append("\n")
                }
            } catch (e: Exception) {
                stringBuilder.append(method.name).append(": Error\n")
            }
        }
        return stringBuilder.toString()
    }
    return "Sensor not found"
}

@Composable
fun RealTimeSensorData(sensorName: String?, mgr: SensorManager, sensorData: MutableState<String>) {
    if (sensorName != null) {
        val sensor = mgr.getSensorList(Sensor.TYPE_ALL).find { it.name == sensorName }
        sensor?.let {
            val sensorEventListener = remember { createSensorEventListener(sensorData) }
            DisposableEffect(sensor) {
                mgr.registerListener(sensorEventListener,
                    sensor,
                    SensorManager.SENSOR_DELAY_NORMAL)
                onDispose {
                    mgr.unregisterListener(sensorEventListener)
                }
            }
        }
    }
}

fun createSensorEventListener(sensorData: MutableState<String>): SensorEventListener {
    return object : SensorEventListener {
        override fun onSensorChanged(event: SensorEvent) {
            val data = event.values.joinToString(", ") { it.toString() }
            sensorData.value = "Sensor data: $data"
        }

        override fun onAccuracyChanged(sensor: Sensor, accuracy: Int) {
            // Handle accuracy changes if needed
        }
    }
}

@Composable
@Preview(showBackground = true)
fun SensorAppPreview() {
    val mgr: SensorManager? = null
    AllOfTheSensorsTheme {
        SensorApp(mgr!!)
    }
}
```

~~~