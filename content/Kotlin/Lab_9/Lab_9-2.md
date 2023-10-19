## Lab 8 Android Lists, Arrays and Web Browsers

You will be developing travel guide for Chicago app that highlights the best attractions the city has to offer.  The City Guide app opening screen is shown below:

> You will need to download the following picture folder -> [Lab_9_Picture.zip](Lab_9_Pictures.zip)

<div align=center>

![](./figures/android_step_1.png)

</div>

The City Guide app displays 5 Chicago attractions. When the user taps one of the attractions, a second window opens displaying either an image or a web site providing more information about the site or activity.  The first two items on the list link to websites, as shown on the two figures below. A browser opens to display a web site for the Art Institute of Chicago or the Magnificent Mile.

<div align=center>

![](./figures/android_step_2.png)

</div>

If the user selects Willis Tower, Navy Pier, or Water Tower, an image appears on a second screen as shown on the figures below.  By pressing the left hardware button on the emulator, you can return to the list of the attractions. 

<div align=center>

![](./figures/android_step_3.png)

</div>

Complete the following steps to develop the app.


**Step 1:**
- Create a New Project with the name **City Guide** in the Application name text box. 
- Open `activity_main.xml`.
- Copy the `ic_launcher_chicago.png` file from the Pictures above.
- Click `File` on the menu bar and then click New to open the New menu.
- Click Image Asset on the New menu.  In the Asset Studio dialog window that appears, in Asset Type, click on the Image radio button.

<div align=center>

![](./figures/android_step_4.png)

</div>

**Step 2:**
- In the Path: field click on the folder icon to the very end of the field and navigate to the location of `ic_launcher_chicago.png` file, and then select the file. 
- Click the Next button to add the custom launcher icon. 
- On the next dialog window, click the Finish button. The custom icons will be displayed in `res/mipmap` folder.

<div align=center>

![](./figures/android_step_5.png)

</div>

**Step 3:**
- Click `MainActivity.kt` tab, and modify the `Class MainActivity...` to include a reference to a Class we are going to build ` CustomAdapter.OnItemClickListener`:

```kt
class MainActivity : AppCompatActivity(), CustomAdapter.OnItemClickListener {
    ....
}
```

>**Note**
>> You will see an error indicated as this Class does not exist yet...


**Step 4:**

- Next modify the MainActivity, to store a list of items an, instance of our Class (which is not yet made), and an array of strings:

```kt
class MainActivity : ....

    private val itemsList = ArrayList<String>()
    private lateinit var customAdapter: CustomAdapter
    private val attractions = arrayOf("Art Institute of Chicago","Magnificent Mile",
        "Willis Tower","Navy Pier","Water Tower")
```

**Step 5:**

- Continuing inside the `Oncreate(...)` function, add support for the action bar:

```kt
supportActionBar?.setDisplayShowCustomEnabled(true)
supportActionBar?.setLogo(R.mipmap.ic_launcher_foreground)
supportActionBar?.setDisplayShowTitleEnabled(true)
supportActionBar?.setDisplayUseLogoEnabled(true)
supportActionBar?.setDisplayShowHomeEnabled(true)
supportActionBar?.show()
```


**Step 6:**
- Modify the `activity_main.xml` so that you have included a RecycleView widget.

<div align=center>

![](./figures/android_step_6.png)

</div>

## Creating and Developing the `CustomAdapter.kt` 

**Step 7:**

- You need to right click the `com.example.cityguide` package in the Project view and select **New**>**Kotlin Class/file**

- Call the file `CustomAdapter`

<div align=center>

![](./figures/android_step_7.png)

</div>

**Step 8:**

- Open the newly created `CustomAdapter.kt` file and reproduce the following: 


```kt
package com.example.cityguide

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.annotation.NonNull
import androidx.recyclerview.widget.RecyclerView

// Define a custom adapter for a RecyclerView
internal class CustomAdapter(
    private var itemsList: List<String>, // Data source for the adapter
    private val itemClickListener: OnItemClickListener // Click listener interface
) : RecyclerView.Adapter<CustomAdapter.MyViewHolder>() {

    // Inner class to hold the view items for each item in the RecyclerView
    internal inner class MyViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        var itemTextView: TextView = view.findViewById(R.id.itemTextView) // TextView for displaying the item
    }

    // Create a new ViewHolder when needed
    @NonNull
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        val itemView = LayoutInflater.from(parent.context)
            .inflate(R.layout.item, parent, false) // Inflates the layout for an item
        return MyViewHolder(itemView) // Return a new MyViewHolder
    }

    // Bind data to the ViewHolder
    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        val item = itemsList[position] // Get the data for this position
        holder.itemTextView.text = item // Set the text of the itemTextView

        // Set a click listener for the item's view
        holder.itemView.setOnClickListener {
            itemClickListener.onItemClick(position) // Notify the listener when an item is clicked
        }
    }

    // Return the total number of items in the data source
    override fun getItemCount(): Int {
        return itemsList.size
    }

    // Interface for item click events
    interface OnItemClickListener {
        fun onItemClick(position: Int)
    }
}
```

>**Note**
>> - You may have some errors to do with referencing a TextView widget.


## Programming the `item.xml`

**Step 9:**

- You need to right click the `res/layout` package in the Project view and select New>Kotlin Class/file

<div align=center>

![](./figures/android_step_8.png)

</div>

- Open the `item.xml` and change to **Code** view and reproduce the following:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_margin="8dp"
    android:background="#272728">
    <TextView
        android:id="@+id/itemTextView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_alignParentStart="true"
        android:textColor="#FFFFFF"
        android:gravity="center"
        android:textSize="20sp"
        android:drawableLeft="@mipmap/ic_launcher_foreground"/>
</LinearLayout>
```

- Save the `item.xml` file and close the tab

## Finishing `MainActivity.kt`

**Step 10**

- After the line `supportActionBar?.Show()` add the following: 

```kt
...
    val layoutManager = LinearLayoutManager(applicationContext)
    val recyclerView: RecyclerView = findViewById(R.id.recyclerView)

    customAdapter = CustomAdapter(itemsList,this)
    recyclerView.layoutManager = layoutManager
    recyclerView.adapter = customAdapter

    prepareItems() // function that populates the `itemList` array
}
```

**Step 11**

- After the `onCreate` closing `}`, we need to create the `prepareItems()` function and program the `onItemClick()` block of code to respond to when an item is clicked and launch a new activity:

```kt 
private fun prepareItems() {
    for (attraction in attractions) {
        itemsList.add(attraction)
    }
    customAdapter.notifyDataSetChanged()
}

override fun onItemClick(position: Int) {
    // Handle item click here

    Toast.makeText(this, "Item clicked at position $position", Toast.LENGTH_SHORT).show()

    when(position) {
        0 ->{
            val intent = Intent(Intent.ACTION_VIEW)
            intent.data = Uri.parse("http://artic.edu")
            // start your next activity
            startActivity(intent)
        }
        1 ->{
            val intent = Intent(Intent.ACTION_VIEW)
            intent.data = Uri.parse("http://themagnificentmile.com")
            // start your next activity
            startActivity(intent)
        }
        2 ->{
            val intent = Intent(this,Willis::class.java)
            // start your next activity
            startActivity(intent)
        }
        3 ->{
            val intent = Intent(this,Pier::class.java)
            // start your next activity
            startActivity(intent)
        }
        4 ->{
            val intent = Intent(this,Water::class.java)
            // start your next activity
            startActivity(intent)
        }
    }
}
```

## Adding Images to the drawable Folder

There are three images that appear when the user selects the Willis Tower, Navy Pier and the Water Tower.  All the images are available in the Pictures folder downloaded in the zip.  Copy the files to the computer.  Copy also the `ic_launcher_chicago.png` icon. 

**Step 12:**
- To add the three images to the drawable resource folder, select the four files form wherever you copied them on your computer: `pier.png`, `water.png` and `willis.png`.

- To paste the image files to the drawable folder, right click the drawable folder in the Android project view pane. And then click Paste.

- Click Save All to save your work.

**Adding the String Table**

**Step 13:**
- In the `res\values folder`, double click the `strings.xml` file.
- Click the Open editor link in `strings.xml`, and write in the following strings:

<div align=center>

|Key|Default Value|
|---|----|
|WillisTitle| Willis Tower|
|NavyPierTitle|Navy Pier|
|WaterTitle|Water Tower|

</div>

- Save the `strings.xml` and close the tab.

## Creating the Location Activitis

**Designing XML Layout Files**

**Step 14:**
- Open the `activity_willis.xml` tab and click the Design tab at the bottom.
- In the Common category in the Palette, drag the `ImageView` control to the middle of the emulator (both horizontal and vertical dashed lines will appear).
- From the Pick a Resource dialog window that appears, choose willis image.
- Click the OK button to close the Pick a Resource dialog tab.
- Click the vertical bar to the right of the `contentDescription` property in the Properties pane.
- Select willis in the Pick a Resource dialog box and then click the OK button.
- The result is shown below:

<div align=center>

![](./figures/android_step_12.png)

</div>

**Step 15:**
- Close the `activity_willis.xml` tab and save your work.
- Click the `activity_pier.xml` tab and click the Design tab to open the emulator window.
- In the Common category in the Palette, drag the ImageView control to the middle of the emulator (both horizontal and vertical dashed lines will appear).
- In the Pick a Resource dialog window, locate the pier image and then click pier.
- Click the OK button to close the Pick a Resource dialog box.
- Click the vertical bar to the right of the `contentDescription` property in the Properties pane.
- Select pier within the Pick a Resource dialog box and then click the OK button.
- The result is shown below:

<div align=center>

![](./figures/android_step_13.png)

</div>

**Step 16:**
- Close the `activity_pier.xml` tab and save your work.
- Click the `activity_water.xml` tab and click the Design tab to open the emulator window.
- In the Images category in the Palette, drag the ImageView control to the middle of the emulator (both horizontal and vertical dashed lines will appear).
- In the Pick a Resource dialog window, locate the pier image and then click water.
- Click the OK button to close the Pick a Resource dialog box.
- Click the vertical bar to the right of the `contentDescription` property in the Properties pane.
- Select water within the Pick a Resource dialog box and then click the OK button.
- The result is shown below:

<div align=center>

![](./figures/android_step_14.png)

</div>

- Close the activity_water.xml tab.

The result is shown below:

```kt
class MainActivity : AppCompatActivity(), CustomAdapter.OnItemClickListener {
    private val itemsList = ArrayList<String>()
    private lateinit var customAdapter: CustomAdapter
    private val attractions = arrayOf("Art Institute of Chicago","Magnificent Mile",
        "Willis Tower","Navy Pier","Water Tower")

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        supportActionBar?.setDisplayShowCustomEnabled(true)
        supportActionBar?.setLogo(R.mipmap.ic_launcher_foreground)
        supportActionBar?.setDisplayShowTitleEnabled(true)
        supportActionBar?.setDisplayUseLogoEnabled(true)
        supportActionBar?.setDisplayShowHomeEnabled(true)
        supportActionBar?.show()

        val layoutManager = LinearLayoutManager(applicationContext)
        val recyclerView: RecyclerView = findViewById(R.id.recyclerView)

        customAdapter = CustomAdapter(itemsList,this)
        recyclerView.layoutManager = layoutManager
        recyclerView.adapter = customAdapter

        prepareItems()
    }

    private fun prepareItems() {
        for (attraction in attractions)
        {
            itemsList.add(attraction)
        }
        customAdapter.notifyDataSetChanged()
    }

    override fun onItemClick(position: Int) {
        // Handle item click here

        Toast.makeText(this, "Item clicked at position $position", Toast.LENGTH_SHORT).show()

        when(position) {
            0 ->{
                val intent = Intent(Intent.ACTION_VIEW)
                intent.data = Uri.parse("http://artic.edu")
                // start your next activity
                startActivity(intent)
            }
            1 ->{
                val intent = Intent(Intent.ACTION_VIEW)
                intent.data = Uri.parse("http://themagnificentmile.com")
                // start your next activity
                startActivity(intent)
            }
            2 ->{
                val intent = Intent(this,Willis::class.java)
                // start your next activity
                startActivity(intent)
            }
            3 ->{
                val intent = Intent(this,Pier::class.java)
                // start your next activity
                startActivity(intent)
            }
            4 ->{
                val intent = Intent(this,Water::class.java)
                // start your next activity
                startActivity(intent)
            }
        }
    }
}
```
