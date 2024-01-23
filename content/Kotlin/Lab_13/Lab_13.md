# Lab 13: Permissions

>**Note:**
>> Recommended reading for permissions, useful for assignment as well. 
>> [https://developer.android.com/guide/topics/permissions/overview](https://developer.android.com/guide/topics/permissions/overview)

## What are Android Runtime Permissions?

With the introduction of Android 6.0 (SDK 23), users are prompted for some specific permissions at runtime when they become necessary to use. 

Will the older apps run on Android Marshmallow? 

------

<details>
<summary>Answer</summary>

- If the targetSdkVersion is 22 or less. 

- Thus android runtime permissions support backward compatibility.

- Now this doesn’t mean that you can work with old model of permissions by setting the sdk version to 22. 

</details>

-------

A user using Marshmallow can revoke the dangerous permissions (we’ll discuss the dangerous and normal permissions later) from the Settings->Apps->Permissions. 

In the case we try to call some function that requires a permission which user has not granted yet, the function will suddenly throw an Exception(`java.lang.SecurityException`) that will lead to the application crashing. 

Hence you need to implement this new android permissions model in the below application.

## Dangerous and Normal android permissions

Android defines some permissions as dangerous and some as normal. 

The common thing in both the types is that they need to be defined in the Manifest file.

From Android 6.0 only dangerous permissions are checked at runtime, normal permissions are not. An example of a normal permission is `android.permission.INTERNET`. 

Dangerous permissions are grouped into categories that make it easier for the user to understand what they are allowing the application to do. If the user accepts one permission in a group/category they accept the entire group. An example of dangerous permission is `android.permission.FINE_LOCATION` and `android.permission.COARSE_LOCATION`.

Enabling anyone of the location permissions enables all.

## Requesting Android Runtime Permissions

The method `requestPermissions(permissions: Array<String>,  requestCode : IntArray);` is a public method that is used to request dangerous permissions. You can ask for multiple dangerous permissions by passing a string array of permissions. 

>**Note:**
>> Android Permissions belonging to two different groups would prompt the user with an individual dialog for each of them. If they belong to the same group, then only one dialog prompt would be displayed. 
>> The results of the requests will be passed into the method `onRequestPermissionResult`. 

**Example :** Let’s say we want to access the camera and location in your app. Both are dangerous permissions. You'll display a prompt requesting access to these permissions when the application is launched. So you'd add the permissions into a string array and call the `requestPermissions` as shown below:

```kt
val perms = arrayOf("android.permission.FINE_LOCATION", "android.permission.CAMERA")
val permsRequestCode : Int =  200
requestPermissions(perms, permsRequestCode)

override fun onRequestPermissionsResult(permsRequestCode:Int, permissions : Array<String>, grantResults: IntArray){
    super.onRequestPermissionsResult(permsRequestCode, permissions, grantResults)
    when(permsRequestCode){
        200 -> {
            val locationAccepted : Boolean = grantResults [0] == PackageManager.PERMISSION_GRANTED;
            val cameraAccepted : Boolean = grantResults [1] == PackageManager.PERMISSION_GRANTED;

            Toast.makeText(this@MainActivity, "Location:$locationAccepted\nCamera:$cameraAccepted", Toast.LENGTH_SHORT).show()
        }
    }
}
```

Now you don’t want the user to keep accepting permissions that they've already accepted. Even if the permission has been previously granted it is necessary to check again to be sure that the user did not later revoke that permission. For this the following method needs to be called on every permission.

```kt
checkSelfPermission(perm: String);
```

It returns an integer value of `PERMISSION_GRANTED` or `PERMISSION_DENIED`. 

>**Note:**
>> If a user declines a permission that is critical in the app, then `shouldShowRequestPermissionRationale(permission:String);` is used to describe the user the need for the permission. 

----------------------------------------------------------

Now you are going to develop an application which checks if the permission is already present. If not, then it’s requested at runtime.

## Build

1. Create application with at least API 28 selected.
2. Name it `mobileapps_permissions`
3. Open the activity_main.xml and reproduce the following code:

### XML FILES

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/toolbar"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <Button
        android:id="@+id/check_permission"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_centerInParent="true"
        android:text="@string/check"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.571"
        tools:layout_editor_absoluteX="0dp" />

    <Button
        android:id="@+id/request_permission"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_below="@+id/check_permission"
        android:text="@string/request"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        tools:layout_editor_absoluteX="32dp" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

Now open the `strings.xml` file and add entries for `@string/request` as "Request Permission"  and `@string/check` as "Check Permission".

<div align=center>

<img src="figures/step1.png" style="object-fit:scale-down; height: 500px">

</div>

-------------------------------------------

### `MainActivity.kt`

1. Open `MainActivity.kt`

2. Implement the necessary imports at the top of the file.

    ```kt
    package com.example.mobileapps_permissions;

    import android.Manifest.permission
    import android.app.AlertDialog
    import android.content.DialogInterface
    import android.content.pm.PackageManager
    import android.os.Build
    import android.os.Bundle
    import android.view.View
    import android.widget.Button

    import androidx.appcompat.app.AppCompatActivity
    import androidx.appcompat.widget.Toolbar
    import androidx.core.app.ActivityCompat
    import androidx.core.content.ContextCompat
    import com.google.android.material.snackbar.Snackbar
    ```
3. See a few new lines within this code block you may not have seen before..

   - `import android.content.pm.PackageManager`
     - Class for retrieving various kinds of information related to the application packages that are currently installed on the device. 
     - recommended to read the documentation here -> [https://stuff.mit.edu/afs/sipb/project/android/docs/reference/android/content/pm/PackageManager.html](https://stuff.mit.edu/afs/sipb/project/android/docs/reference/android/content/pm/PackageManager.html)
   - `import android.support.design.widget.Snackbar` 
     - Instead of using a `Toast` you are going to use `Snackbar` widget.
   - `import static android.Manifest.permission.*`
     - So you can use the permissions stored in the `AndroidManifest.xml` file you will populate later.


4. Modify the class declaration to *extend* `AppCompatActivity` and *implement* `View.OnClickListener`.

5. Define variables for the UI components and override onCreate.

    ```kt
    ...
    class MainActivity : AppCompatActivity(), View.OnClickListener {
        private var view: View? = null

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(R.layout.activity_main)
            
            // Initialise the toolbar
            val toolbar: Toolbar = findViewById(R.id.newToolbar)
            setSupportActionBar(toolbar)

            // Initialise buttons and set click listeners
            val check_permission = findViewById<View>(R.id.check_permission) as Button
            val request_permission = findViewById<View>(R.id.request_permission) as Button
            check_permission.setOnClickListener(this)
            request_permission.setOnClickListener(this)
        }
    }
    ```

6. ```class MainActivity : AppCompatActivity(), View.OnClickListener {```
   
   This line declares the `MainActivity` class, which is the main activity of the Android application. It extends `AppCompatActivity`, indicating that it is an activity in Android, and implements the `View.OnClickListener` interface, suggesting that it will handle click events.

7. ```private var view: View? = null```
   This line declares a private variable `view` of type `View?` and initialises it as `null`. This variable will be used to store the current view (button) clicked.

8. The onCreate method is called when the activity is created. Here's what it does:
   - `super.onCreate(savedInstanceState): This calls the superclass's `onCreate` method.
   - s`etContentView(R.layout.activity_main)`: This sets the content view to the XML layout defined in `activity_main.xml`.
   - `val toolbar: Toolbar = findViewById(R.id.newToolbar)`: This finds and assigns the Toolbar widget with the ID newToolbar from the layout.
   - `setSupportActionBar(toolbar)`: This sets the toolbar as the app's action bar.
   - `val check_permission = findViewById<View>(R.id.check_permission) as Button`: This finds and assigns the "Check Permission" button.
   -  `val request_permission = findViewById<View>(R.id.request_permission) as Button`: This finds and assigns the "Request Permission" button.
   - `check_permission.setOnClickListener(this)` and `request_permission.setOnClickListener(this)`: These lines set click listeners for both buttons, using the current activity (`this`) as the click listener.

-------------------------------------------

### Implement Permission Checking and Requesting

1. Define the `checkPermission` and `requestPermission` methods to check and request permissions.

2. In `checkPermission`, use `ContextCompat.checkSelfPermission` to check if both `ACCESS_FINE_LOCATION` and `CAMERA` permissions are granted.

Repoduce outside of the `onCreate` method:

```kt
private fun checkPermission(): Boolean {
    // Check if both permissions are granted
    val result = ContextCompat.checkSelfPermission(applicationContext, permission.ACCESS_FINE_LOCATION)
    val result1 = ContextCompat.checkSelfPermission(applicationContext, permission.CAMERA)
    return result == PackageManager.PERMISSION_GRANTED && result1 == PackageManager.PERMISSION_GRANTED
}

private fun requestPermission() {
    // Request permissions for ACCESS_FINE_LOCATION and CAMERA
    ActivityCompat.requestPermissions(
        this,
        arrayOf(permission.ACCESS_FINE_LOCATION, permission.CAMERA),
        PERMISSION_REQUEST_CODE
    )
}
```
3. The `checkPermission` function checks if both A`CCESS_FINE_LOCATION` and `CAMERA` permissions are granted using `ContextCompat.checkSelfPermission`. It returns `true` if both permissions are granted and `false` otherwise.

4. The `requestPermission` function is used to request the `ACCESS_FINE_LOCATION` and `CAMERA` permissions using `ActivityCompat.requestPermissions`. The request code is `PERMISSION_REQUEST_CODE`. 

5. `checkPermission(): Boolean` means tha the methods should return a Boolean from the methods scope, in this case whether the permission has been granted... `true` or `false`

--------------------------------------

### Handle Permission Request Results

1. *Override* `onRequestPermissionsResult` to handle the results of the permission request.

2. Check if the requested permissions have been granted or denied.

3. Show appropriate messages to the user using `Snackbar`.

4. Optionally, you can show an `AlertDialog` to explain the need for permissions if they were denied.

Reproduce `requestPermissions` method:

```kt
override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<String>, grantResults: IntArray) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults)

    // Check if the request code matches the one used for requesting permissions
    when (requestCode) {
        PERMISSION_REQUEST_CODE -> if (grantResults.size > 0) {
            // The request resulted in some responses

            // Check if the location and camera permissions were granted
            val locationAccepted = grantResults[0] == PackageManager.PERMISSION_GRANTED
            val cameraAccepted = grantResults[1] == PackageManager.PERMISSION_GRANTED

            if (locationAccepted && cameraAccepted) {
                // Both permissions were granted, show a Snackbar message
                Snackbar.make(view!!, "Permission Granted, Now you can access location data and camera.", Snackbar.LENGTH_LONG).show()
            } else {
                // Permissions were denied, show a Snackbar message
                Snackbar.make(view!!, "Permission Denied, You cannot access location data and camera.", Snackbar.LENGTH_LONG).show()

                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                    if (shouldShowRequestPermissionRationale(permission.ACCESS_FINE_LOCATION)) {
                        // If the user denied permissions, and the system allows showing rationale, show an AlertDialog
                        showMessageOKCancel("You need to allow access to both the permissions") { dialog, which ->
                            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                                // If the user agrees in the AlertDialog, re-request the permissions
                                requestPermissions(
                                    arrayOf(permission.ACCESS_FINE_LOCATION, permission.CAMERA),
                                    PERMISSION_REQUEST_CODE
                                )
                            }
                        }
                        return
                    }
                }
            }
        }
    }
}
```

5. The `onRequestPermissionsResult` method is an overridden function that handles the results of permission requests.

6. It checks if the requestCode matches the `PERMISSION_REQUEST_CODE` to ensure that it's handling the response to the correct permission request.

7. If `grantResults.size > 0`, it means that the user responded to the permission request.

8. It then checks if both the location and camera permissions were granted by examining the `grantResults` array. If both are granted, it displays a `Snackbar` message indicating that permission is granted and that the app can now access location data and the camera.

9. If the permissions are denied, it displays a `Snackbar` message indicating that the user cannot access location data and the camera.

10. It also checks if the device's Android version is at least **Marshmallow (API level 23)** using `Build.VERSION.SDK_INT`. If it is, it further checks if the system allows showing a rationale for the permission request using `shouldShowRequestPermissionRationale`. If the rationale can be shown, it displays an `AlertDialog` explaining why both permissions are needed.

11. If the user accepts the explanation in the `AlertDialog`, it re-requests the permissions using `requestPermissions`. The `requestPermissions` method is called with an array of `permissions` (`ACCESS_FINE_LOCATION` and `CAMERA`) and the `PERMISSION_REQUEST_CODE`.

12. The `return` statement is used to exit the method after showing the rationale `AlertDialog` to avoid executing the subsequent code.

----------------------------------------------

### `onClick()` method

1. After the `onCreate()` and before `checkPermissions())` methods make some empty space so that the onClick method can be created.

```kt
override fun onClick(v: View) {
    view = v
    val id = v.id
    when (id) {
        R.id.check_permission -> if (checkPermission()) {
            Snackbar.make(view!!, "Permission already granted.", Snackbar.LENGTH_LONG).show()
        } else {
            Snackbar.make(view!!, "Please request permission.", Snackbar.LENGTH_LONG).show()
        }
        R.id.request_permission -> if (!checkPermission()) {
            requestPermission()
        } else {
            Snackbar.make(view!!, "Permission already granted.", Snackbar.LENGTH_LONG).show()
        }
    }
}
```

2. The `onClick` method is called when one of the buttons is clicked. Here's what it does:
    - `view = v:` Stores the clicked **view** in the `view` variable.
    - `val id = v.id`: Gets the ID of the clicked **view**.
    - The code uses a when statement to determine which button was clicked based on its ID (`R.id.check_permission` or `R.id.request_permission`).
    - If the "Check Permission" button is clicked, it calls the `checkPermission` function. If permission is granted, it shows a `Snackbar` saying permission is already granted; otherwise, it requests permission.
    - If the "Request Permission" button is clicked, it checks if permissions are already granted. If not, it calls the `requestPermission` function; otherwise, it shows a `Snackbar` indicating that permission is already granted.

--------------------------------

### Show an `AlertDialog` for Permissions

After the closing `}` of the `onRequestPermissionsResult(...){` function

Implement the `showMessageOKCancel` method to show an `AlertDialog` with an OK button to explain the need for permissions.

```kt
private fun showMessageOKCancel(message: String, okListener: DialogInterface.OnClickListener) {
    AlertDialog.Builder(this@MainActivity)
        .setMessage(message)
        .setPositiveButton("OK", okListener)
        .setNegativeButton("Cancel", null)
        .create()
        .show()
}
```

------------------------------

### Companion Object with 

`companion object` is used to define constants, properties, and functions associated with a class. It's a way to create shared members that are accessible without creating an instance of the class. Members of the companion object can be accessed using the class name itself, without the need to create an instance of the class.

```kotlin
companion object {
    private const val PERMISSION_REQUEST_CODE = 200
}
```

-----------------

## Running the App

1. Build and run your app on an Android emulator or a physical Android device.

2. Click the "Check Permission" button to see if permissions are already granted.

3. Click the "Request Permission" button to request permissions if they are not granted.

4. Verify that the Snackbar and AlertDialog messages are displayed appropriately based on permission status.


<div align=center>

<img src="figures/Granted.gif">
<img src="figures/SemiGranted.gif">

</div>



## Afterwards

Experiment with other permissions

> - [https://gist.github.com/Arinerron/1bcaadc7b1cbeae77de0263f4e15156f](https://gist.github.com/Arinerron/1bcaadc7b1cbeae77de0263f4e15156f) and see what they mean.
> - [https://github.com/aosp-mirror/platform_frameworks_base/blob/master/core/res/AndroidManifest.xml#L833](https://github.com/aosp-mirror/platform_frameworks_base/blob/master/core/res/AndroidManifest.xml#L833)