# Lab 7 Android App using Icons and Decision Making Controls

## 1. Medical Calculator App

> You will need to download the following picture folder -> [Lab_7_Picture.zip](Lab_7_Pictures.zip)

Start a new Android Studio Project and name it the Application Medical Calculator. Copy the file `ic_launcher_weight.png` from the Pictures folder you have downloaded above.

**Customizing a Launcher Icon**

- **Step 1:**
  -  In the Android Project View, click the `activity_main.xml` file.
  -  Click File on the menu bar and then click New.  From the drop down list choose Image Asset. The Asset Studio dialog box opens to display the default launcher icons for the resolutions of various devices.  
<div align=center>

![](./figures/iconResources.png)

</div>

- **Step 2:**
  - In the Path: field (in the red square in the picture above) click on the folder icon to the very end of the field and navigate to the location of `ic_launcher_weight.png` file, and then select the file as shown on the picture below. Note that the path on your PC will be different from the path shown as this is where the file is saved on my laptop.

<div align=center>

![](./figures/iconSelectPath.png)

</div>

- Click the Ok button. 

- Click the Next button and on the following window that appears, click the Finish button to add the custom launcher icon. The custom icons will be displayed in `res/mipmap` folder. Expand the `res/mipmap` folder and check that the icon is there as expected. The result is shown below:

<div align=center>

![](./figures/resultsMipMap.png)

</div>

## Displaying the Action Bar Icon Using Code

**Step 1:**
- In the Android project view, expand the java folder and the first sub-folder, and then double click on the `MainActivity` to open the code window.
- Click at the end of `setContentView` line, press Enter and type the following three statements to display the logo in the Action bar:

```kt
supportActionBar?.setDisplayShowCustomEnabled(true)
supportActionBar?.setLogo(R.mipmap.ic_launcher_foreground)
supportActionBar?.setDisplayShowTitleEnabled(true)
supportActionBar?.setDisplayUseLogoEnabled(true)
supportActionBar?.setDisplayShowHomeEnabled(true)
supportActionBar?.show()
```

- The result is shown below:

```kt
package com.example.medicalcalculator;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

override fun onCreate(savedInstanceState: Bundle?) {
  super.onCreate(savedInstanceState)
  setContentView(R.layout.activity_main)

  supportActionBar?.setDisplayShowCustomEnabled(true)
  supportActionBar?.setLogo(R.mipmap.ic_launcher_foreground)
  supportActionBar?.setDisplayShowTitleEnabled(true)
  supportActionBar?.setDisplayUseLogoEnabled(true)
  supportActionBar?.setDisplayShowHomeEnabled(true)
  supportActionBar?.show()

  }
}
```

- Next we will play with the `themes.xml` in the `res/vaules/themes` folder, reproduce the following: 

```xml
<resources xmlns:tools="http://schemas.android.com/tools">
    <!-- Base application theme. -->
    <style name="Base.Theme.MedicalCalculator" parent="Theme.AppCompat.DayNight.DarkActionBar">
        <!-- Customize your light theme here. -->
        <!-- <item name="colorPrimary">@color/my_light_primary</item> -->
        <item name="colorPrimary">@color/design_default_color_primary</item>
        <item name="colorPrimaryDark">@color/design_default_color_primary</item>
        <item name="colorAccent">@color/design_default_color_on_secondary</item>
    </style>

    <style name="Theme.MedicalCalculator" parent="Base.Theme.MedicalCalculator" />
    
</resources>
```

<div align=center>

![](./figures/themes.png)

</div>


Run the app. The icon is displayed in the running emulator acting bar as shown below:

<div align=center>

![](./figures/baseBuildOfMedicalApp.png)

</div>

## String Table
**Step 1:**
- In the Android project view, open the stirngs.xml file in the res\values folder.
- Click the Open editor link and then the Add Key (+ sign) button in the Translations Editor.
- Enter the following values shown in the table below:

<div align=center>

|String Name | String Value |
|---|---|
|txtTitle | Convert Patient Weight|
|txtWeight| Weight of Patient|
|radLbToKilo| Convert LBS to Kgs|
|radKiloToLb| Convert Kgs to LBS |
|btnConvert| Convert Weight |

</div>

- Click the Save All button on the toolbar and then close the Translators Editor tab and the `strings.xml` tab. 

## Creating the GUI in the Emulator

**Step 1:**
- With the `activity_main.xml` open and displaying the emulator screen, from the Widgets category of the Palette, drag and drop the `TextView` control onto the top part of the emulator.  Centre it (drag it till a dashed vertical line appears).
- Click the vertical bar next to the text attribute of the `TextView` control in the Attribute Pane and in the Pick a Resource dialog choose the `txtTitle` box. Press OK. 
- Change the `textSize` property to `30sp`.
- Click the vertical bar next to the `textColor` property.  In the Pick a Resource dialog box that appears in the Color section scroll down in android and choose `holo_red_dark` colour to change the text colour to red to match the launcher icon.  Click the OK button.
- Right click on the `TextView` control, choose Center/ Horizontally to centre the control.

**Step 2:**
- From the Text category in the Palette, drag and drop the `Number` control onto the emulator below the `TextView` control in the centre.
- Click on the vertical bar next to the `hint` property in the Property pane.
- Choose `txtWeight` from the Resources dialog and then click the OK button.
- Change the `textSize` property to `24sp`.

**Step 3:**
- In the Buttons category of the Palette, select `RadioGroup`, and then drag and drop the `RadioGroup` control onto the user interface below the `Number` control. Expand the size of the `RadioGroup` to place radio buttons inside. 
- Click the `RadioButton` control, drag and drop two radio buttons inside the `RadioGroup` control, and centre them using the dashed line. 
- Click the vertical bar next to the `text` attribute of the first `RadioButton` control in the Attribute Pane and in the Pick a Resource dialog choose the `radKiloToLbbox`. Press OK. 
- In the Attributes list for the first `RadioButton`, click on the checked property indicating that the first radio button is the default selection.
- Change the `textSize` property to `18sp` from the drop down list. 
- Click the vertical bar next to the `text` attribute of the second `RadioButton` control in the Attribute Pane and in the Pick a Resource dialog choose the `radLbToKilo` box. Press OK. 
- Change the `textSize` property to `18sp` from the drop-down list. 

**Step 4:**
- Drag the `Button` control from the Palette to the emulator below the `RadioGroup`. 
- Click the vertical bar next to the `text` attribute of the `Button` control in the Attribute Pane and in the Pick a Resource dialog choose the `btnConvert` box. Press OK.
- Change the `textSize` property to `24sp` form the drop-down list.
- Click the vertical bar next to the `textColor` property.  In the Pick a Resource dialog box that appears in the `Color` section scroll down in android and choose `holo_red_dark` colour to change the text colour to red to match the launcher icon.  Click the OK button.


**Step 5:**
- From the Common category in the Palette, drag another `TextView` control to the emulator below the `Button`.
- In the `text` attribute box delete `TextView`. The `text` attribute is now empty and the `TextView` component you just dragged to the emulator has no label.
- Change the `textSize` property to `24sp`.
- Click the vertical bar next to the `textColor` property.  In the Pick a Resource dialog box that appears in the `Color` section scroll down in android and choose `holo_red_dark` colour to change the text colour to red to match the launcher icon.  Click the OK button.
- Click Save All button on the Standard toolbar.

Now Apply Constraints to the layout using the Infer Constraints button above the emulator and run the app in the emulator to see if you have correctly placed all the controls.  The result should look similar to this:

<div align=center>

![](./figures/step5.png)

</div>

## Coding a Radio Button Control

**Step 1:**
- Click on the `MainActivity.kt` tab.
- Click at the end of line (just after `{`)  

```kt
override fun onCreate(savedInstanceState: Bundle?) {
```

and then press Tab to indent the line.

- To initialize the conversion rate value of 2.2., type:
```kt
val conversionRate : Double = 2.20462262
```
and press Enter.

- To initialize the weightEntered variable and the convertedWeight, type:

```kt
var weightEntered :  Double = 0.0
var convertedWeight : Double = 0.0
```
and press Enter.

**Step 2:**
- Click at the end of the line
```java
getSupportActionBar().setDisplayUseLogoEnabled(true);
``` 
and press Enter.

- to instantiate and reference the `EditText` class:

```kt
val weight = findViewById<EditText>(R.id.editTextNumer)
```
Press Enter.
- To instantiate and reference the two radio buttons, type:

```kt
val kiloToLb = findViewById<RadioButton>(R.id.radiobutton)
val lbToKilo = findViewById<RadioButton>(R.id.radiobutton2)
```
- Save your work.

## Coding the Button Control

**Step 1:**
- After the two lines of code referring to the radio buttons, type:

```kt
val result = findViewById<TextView>(R.id.textView2)
```
and press Enter.

- To code the button, type:

```kt
val convert = findViewById<Button>(R.id.button)
```
and press Enter.

- Your `MainActivity.kt` class should look like this:

```kt
class MainActivity : AppCompatActivity() {

  val conversionRate : Double = 2.20462262
  var weightEntered :  Double = 0.0
  var convertedWeight : Double = 0.0

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)
    supportActionBar?.setDisplayShowCustomEnabled(true)
    supportActionBar?.setLogo(R.mipmap.ic_launcher_foreground)
    supportActionBar?.setDisplayShowTitleEnabled(true)
    supportActionBar?.setDisplayUseLogoEnabled(true)

    val kiloToLb = findViewById<RadioButton>(R.id.radiobutton)
    val lbToKilo = findViewById<RadioButton>(R.id.radiobutton2)
    val weight = findViewById<EditText>(R.id.editTextNumberDecimal)
    val result = findViewById<TextView>(R.id.textView2)
    val convert = findViewById<Button>(R.id.button)
  }
}
```

- To code the `Button` listener, type `convert.setOnClickListener{}`.

## Coding the Button Event

**Step 1:**
- Inside the OnClick method stub of the MainActivity.java code, type to convert the weight entered to a Double data type and press Enter.

```kt
weightEntered = weight.getText().toString().toDouble()
```

- To create a decimal layout that changes the weight to a decimal rounded to the nearest tenth for use in the result later in the code, type: 

```kt
val tenth : DecimalFormat = DecimalFormat("#.#")
```

> There are two Decimal formats to choose from in the autocomplete drop down list.  Make sure if you do choose from the drop-down list to select `DecimalFormat (java.text)` and **NOT** `DecimalFormat(android.icu.text)`

## Coding the Nested `If` Statements

**Step 1:**
- After the `DecimalFormat` line of code, to determine if the first `RadioButton` control is selected, insert a new line and type:

```kt
if (lbToKilo.isChecked()) {
```

And then press Enter.  Java automatically adds the closing brace as shown below:

```kt
convert.setOnClickListener {
  weightEntered = weight.getText().toString().toDouble()
  val tenth : DecimalFormat = DecimalFormat("#.#")

  if (lbToKilo.isChecked()) {
   
  }
}

```

**Step 2:**
- Within the first if statement, braces create a nested `if/else` statement that determines if the weight entered for kilograms is less than or equal to 255.  Type:

```kt
if (weightEntered <= 255) { 
```

And press Enter.  Java automatically adds the closing brace.

On line 41, after the closing brace, type else `{` and press Enter.  Java automatically adds the closing brace.  See the code below:

```kt
  convert.setOnClickListener {
  weightEntered = weight.getText().toString().toDouble()
  val tenth : DecimalFormat = DecimalFormat("#.#")

  if (lbToKilo.isChecked()) {
    if (weightEntered <=  255){

    }else{

    }
  }
}
```

**Step 3:**

- After the pounds variable is validated, the weight must be converted. To divide the weight by the conversion rate of 2.2, inside the nested if statement (line 41) after the weightEntered `<= 255 {` line, type:

```kt
convertedWeight = weightEntered  * conversionRate;
```
and press Enter.
- To display the result of the equation rounded to one place past the decimal point, type:

```kt
result.setText(tenth.foramt(convertedWeight) + “ pounds”);
```
- If the weight is not in valid range, a toast message requesting that the user enter a valid weight is displayed briefly. Click the line after the else statement and type:

```kt
Toast.makeText(this, “Kilos must be less than 255”, Toast.LENGHT_LONG).show();
```

The result is shown in the code below: 

```kt
convert.setOnClickListener {
  weightEntered = weight.getText().toString().toDouble()
  val tenth : DecimalFormat = DecimalFormat("#.#")

  if (lbToKilo.isChecked()) {
      if (weightEntered <= 500) {
          convertedWeight = weightEntered / conversionRate
          result.setText(tenth.format(convertedWeight) + " kilograms")
      } else {
          Toast.makeText(
              this,
              "Pounds must be less than 500",
              Toast.LENGTH_LONG
          ).show()
      }
      lbToKilo.setChecked(false)
  }
}
```

**Step 4:**
- For when the user selects the `Convert Pounds to Kilograms RadioButton` control, type the following lines of code starting after the closing brace in line 47 (the second closing `}` after `else`) and press Enter after each line, as shown on the figure below:

```kt
if (lbToKilo.isChecked()) {
    if (weightEntered <= 500) {
        convertedWeight = weightEntered / conversionRate
        result.setText(tenth.format(convertedWeight) + " kilograms")
    } else {
        Toast.makeText(
            this,
            "Pounds must be less than 500",
            Toast.LENGTH_LONG
        ).show()
    }
    lbToKilo.setChecked(false)
}
```
The result is shown below:

```kt
package com.example.medicalcalculator

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.RadioButton
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import java.text.DecimalFormat

class MainActivity : AppCompatActivity() {

    private val conversion : Double = 2.20462262
    private var weightEntered : Double = 0.0
    private var convertedWeight : Double = 0.0
   
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        supportActionBar?.setDisplayShowCustomEnabled(true)
        supportActionBar?.setLogo(R.drawable.ic_launcher_foreground)
        supportActionBar?.setDisplayShowTitleEnabled(true)
        supportActionBar?.setDisplayUseLogoEnabled(true)

        val kiloToLb = findViewById<RadioButton>(R.id.radioButton)
        val lbToKilo = findViewById<RadioButton>(R.id.radioButton2)
        val weight = findViewById<EditText>(R.id.editTextNumberDecimal)
        val result = findViewById<TextView>(R.id.textView2)
        val convert = findViewById<Button>(R.id.button)
      
        kiloToLb.setOnClickListener{
            lbToKilo.setChecked(false)
        }
        lbToKilo.setOnClickListener{
            kiloToLb.setChecked(false)
        }
        convert.setOnClickListener {
            weightEntered = weight.getText().toString().toDoubleOrNull() ?: 0.0

            val tenth : DecimalFormat("#.#")

            if (lbToKilo.isChecked()) {
                kiloToLb.setChecked(false)
                if (weightEntered > 0) {
                    convertedWeight = weightEntered / conversion
                    result.setText(tenth.format(convertedWeight) + " kilograms")
                } else {
                    Toast.makeText(this,  "Pounds must be greater than 0",Toast.LENGTH_LONG).show()
                }
            }
            else if (kiloToLb.isChecked()){
                if (weightEntered > 0){
                    convertedWeight = weightEntered * conversion
                    result.setText(tenth.format(convertedWeight) + " Kilograms")
                }else{
                    Toast.makeText(this, "Did you enter anything?", Toast.LENGTH_SHORT).show()
                }

            }
        }
    }
}
```

Now use Run ‘app’ button (or SHIFT + F10) to run the app.  When you run the program, make sure you test it with correct data and then with more than 500 pounds and more than 225 kilos in order to see the toast message appear. Two cases of the app running with correct data are shown below. In the first case - the first radio button was clicked and in the second case – the second radio button is clicked by the user.

<div align=center>

![](./figures/finishedMedicalApp.png)

</div>

-------------------------------------


## Converted weight on different Solar objects

- Add options (`Spinner` widget for example ) to change the effect of gravity on someones weight. Use the table below for reference:

<div align=center>

|Planet|	Gravity (m/s²)|Conversion (%)|
|---|---|---|
|Mercury|3.78 | \\( 0.378 = \frac{3.78}{10}\\) 
|Venus|	9.07| \\( 0.907 = \frac{9.07}{10}\\) |
|Earth | 10.0|\\( 1.0 = \frac{10}{10}\\) |
|Mars|	3.77|\\( 0.377 = \frac{3.77}{10}\\) |
|Jupiter|	25.28|\\( 2.528 = \frac{25.28}{10}\\) |
|Saturn|	10.64|\\( 1.064 = \frac{10.64}{10}\\) |
|Uranus|	8.889|\\( 0.8889 = \frac{8.889}{10}\\) |
|Neptune| 11.15|\\( 1.115 = \frac{11.15}{10}\\) |
|Pluto|	0.67|\\( 0.067 = \frac{0.67}{10}\\) |
|Moon|	1.62|\\( 0.162 = \frac{1.62}{10}\\) |

Formula:

\\(yourWeightOnSolObject = convertedWeight \cdot \frac{Sol\ Object}{10}\\)

</div>
<p>

</p>

1. Add a `Spinner` and `TextView` for list of Sol objects and the resulting conversion.
    
    <div align=center>
    
    ![](figures/designView.png)

    </div>

2. Consider using `map` for each sol object and their convesion value, recall the slides from earlier, or...

    <details>
    <summary>Suggested Code</summary>

    After the line ending `private var convertedWeight: Double = 0.0`

    ```kt
    // Map that holds relative gravitational accelerations on celestial bodies
    private val solObjectModifiers = mapOf(
        "Moon" to 0.1622, "Mercury" to 0.378, "Venus" to 0.907,
        "Mars" to 0.377, "Jupiter" to 2.528, "Saturn" to 1.064,
        "Uranus" to 0.889, "Neptune" to 1.125, "Pluto" to 0.067
    )

    // Initialise the selected celestial body's conversion factor
    private var solConversion: Double = solObjectModifiers.entries.elementAt(0).value

    ```

    </details>

<p>

</p>

3. Remeber to populate the `Spinner` using the `Adapter` class. 

    <details>
    <summary>Suggested Code</summary>

    After line ending ` val solSpinner = findViewById<Spinner>(R.id.spinner)`

    ```kt
    // Initialize the Spinner with data from the map
    val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, solObjectModifiers.keys.toTypedArray())
    adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
    solSpinner.adapter = adapter
    ```

    </details>

<p>

</p>

4. Inside the `convert.onClick` method after `weightEntered = weight.getText().toString().toDoubleOrNull() ?: 0.0` get correct value from the map of sol objects by referencing the `spinner.selectedItem.toString()`
  
    <details>
        <summary>Suggested Code</summary>

        ```kt
        // Get the selected celestial body's conversion factor
        solConversion = solObjectModifiers.getValue(solSpinner.selectedItem.toString())
        ```
    </details>

<p>

</p>

5. Modify return the result of the `solConversion` to the Sol `TextView`, do this after `result.setText(tenth.format(convertedWeight) + " kilograms")` inside the `lbToKilo` radio button:

    <details>
    <summary>Suggested Code</summary>

    ```kt  
    solConversionResult.setText(tenth.format(convertedWeight * solConversion) + " kilograms")
    ```

    </details>

<p>

</p>

6. Repeat the last two steps for KiloToLb radio button
  
    <details>
    <summary>Suggested Code</summary>

    ```kt 
    convertedWeight = (weightEntered * conversion)
    ... 
    solConversionResult.setText(tenth.format(convertedWeight * solConversion) + " lbs")
    ```

    </details>

<p>

</p>

7.  Should look something like this...

    <div align=center>

    ![](./figures/solobjects.png) 

    </div>