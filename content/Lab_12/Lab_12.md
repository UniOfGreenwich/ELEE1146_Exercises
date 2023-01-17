# Lab 12: Permissions

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

The method `requestPermissions(String[] permissions, int requestCode);` is a public method that is used to request dangerous permissions. You can ask for multiple dangerous permissions by passing a string array of permissions. 

>**Note:**
>> Android Permissions belonging to two different groups would prompt the user with an individual dialog for each of them. If they belong to the same group, then only one dialog prompt would be displayed. 
>> The results of the requests will be passed into the method `onRequestPermissionResult`. 

**Example :** Let’s say we want to access the camera and location in your app. Both are dangerous permissions. You'll display a prompt requesting access to these permissions when the application is launched. So you'd add the permissions into a string array and call the `requestPermissions` as shown below:

```java
String[] perms = {"android.permission.FINE_LOCATION", "android.permission.CAMERA"};

int permsRequestCode = 200; 
requestPermissions(perms, permsRequestCode);

@Override
public void onRequestPermissionsResult(int permsRequestCode, String[] permissions, int[] grantResults){
    switch(permsRequestCode){
        case 200:
            boolean locationAccepted = grantResults[0]==PackageManager.PERMISSION_GRANTED;
            boolean cameraAccepted = grantResults[1]==PackageManager.PERMISSION_GRANTED;
            break;
    }
}
```

Now you don’t want the user to keep accepting permissions that they've already accepted. Even if the permission has been previously granted it is necessary to check again to be sure that the user did not later revoke that permission. For this the following method needs to be called on every permission.

```java
checkSelfPermission(String perm);
```

It returns an integer value of `PERMISSION_GRANTED` or `PERMISSION_DENIED`. 

>**Note:**
>> If a user declines a permission that is critical in the app, then `shouldShowRequestPermissionRationale(String permission);` is used to describe the user the need for the permission. 

Now you are going to develop an application which checks if the permission is already present. If not, then it’s requested at runtime.

## Build

1. Create application with at least API 23 selected.
2. Name it `runtimepermissions`
3. Open the activity_main.xml and reproduce the following code:

### XML FILES

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorLayout.widget.coordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fitsSystemWindows="true"
    tools:context="com.uog.runtimepermissions.MainActivity">

    <include layout="@layout/content_main" />

</androidx.coordinatorLayout.widget.coordinatorLayout>
```

Did you see the `<include layout="@layout/content_main"/>` line? You can include other XML files to increase readibilty of the main XML file.

3. Create a new XML file `content_main.xml` in the layout directory, and reproduce the following:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    app:layout_behavior="@string/appbar_scrolling_view_behavior"
    tools:context="com.uog.runtimepermissions.MainActivity"
    tools:showIn="@layout/activity_main">
    <Button
        android:id="@+id/check_permission"
        android:layout_width="match_parent"
        android:layout_centerInParent="true"
        android:layout_height="wrap_content"
        android:text="@string/check"/>
    <Button
        android:id="@+id/request_permission"
        android:layout_below="@+id/check_permission"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="@string/request"/>
</RelativeLayout>
```
Again notice that `tools:context="com.example.runtimepermissions.MainActivity"` and  `tools:showIn="@layout/activity_main"` to complete the reference.

You need to add the following dependency to `build.gradle`:

```xml
dependicies{
...
implementation 'androidx.coordinatorLayout:androidx.coordinatorLayout:1.2.0'
...
}

```

Now open the `strings.xml` file and add entries for `@string/request` as "Request Permission"  and `@string/check` as "Check Permission".

### `MainActivity.java`

Reproduce the following code in the `MainActivity.java` file:

```java
package com.uog.runtimepermissions;

import android.content.DialogInterface;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.support.design.widget.Snackbar;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;

import android.view.View;
import android.widget.Button;

import static android.Manifest.permission.ACCESS_FINE_LOCATION;
import static android.Manifest.permission.CAMERA;
```
See a few new lines within this code block you may not have seen before..

- `import android.content.pm.PackageManager;`
  - Class for retrieving various kinds of information related to the application packages that are currently installed on the device. 
  - recommended to read the documentation here -> [https://stuff.mit.edu/afs/sipb/project/android/docs/reference/android/content/pm/PackageManager.html](https://stuff.mit.edu/afs/sipb/project/android/docs/reference/android/content/pm/PackageManager.html)
- `import android.support.design.widget.Snackbar;` 
  - Instead of using a `Toast` you are going to use `Snackbar` widget.
- `import static android.Manifest.permission.*`
  - So you can use the permissions stored in the AndroidManifest.xml file you will populate later.


The `MainActivity` class declaration should look like below, make it so...

```java
public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private static final int PERMISSION_REQUEST_CODE = 200; // return value you need for success in an API call
    private View view;


}
```

After `private View view;` reproduce the following code for `onCreate()` method:

```java
  @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        Button check_permission = findViewById(R.id.check_permission);
        Button request_permission =  findViewById(R.id.request_permission);
        check_permission.setOnClickListener(this);
        request_permission.setOnClickListener(this);
    }
```

Next after the `onCreate()` method you will create the `onClick()` method:

```java
 @Override
    public void onClick(View v) {
        view = v;
        int id = v.getId();
        switch (id) {
            case R.id.check_permission:
                if (checkPermission()) {
                    Snackbar.make(view, "Permission already granted.", Snackbar.LENGTH_LONG).show();
                } else {
                    Snackbar.make(view, "Please request permission.", Snackbar.LENGTH_LONG).show();
                }
                break;
            case R.id.request_permission:
                if (!checkPermission()) {
                    requestPermission();
                } else {
                    Snackbar.make(view, "Permission already granted.", Snackbar.LENGTH_LONG).show();
                }
                break;
        }
    }
```

The code should be self explanatory, with `switch` and `if` conditions. 

What does this code snippet mean from the `onClick()` method?

```java
 if (!checkPermission()) {
        requestPermission();
    } else {
        Snackbar.make(view, "Permission already granted.", Snackbar.LENGTH_LONG).show();
    }
```

----- 

<details>
<summary>Answer</summary>

1. need to inverse the result of `checkPermission()` as in if `true` then it is `false` then permission is already granted. 
2. if `false` then `true` and permission needs to be requested again, `requestPermission()`

</details>

-----

So now we need to create the `*Permission()` methods.

Firstly, underneath  `onClick()` method, reproduce the following code for `checkPermission()`:

```java
private boolean checkPermission() {
        int location = ContextCompat.checkSelfPermission(getApplicationContext(), ACCESS_FINE_LOCATION);
        int camera = ContextCompat.checkSelfPermission(getApplicationContext(), CAMERA);
        return location == PackageManager.PERMISSION_GRANTED && camera == PackageManager.PERMISSION_GRANTED;
}
```

Notice that both `location` and `camera` variables must equal the same value. `checkPermission()` calls the `checkSelfPermission` on each of the permissions.

Secondly, underneath `checkPermission()` method, reproduce the following code for `requestPermission()`:

```java
private void requestPermission() {
        ActivityCompat.requestPermissions(this, new String[]{ACCESS_FINE_LOCATION, CAMERA}, PERMISSION_REQUEST_CODE);
}
```

`requestPermission()` calls `ActivityCompat.requestPermissions(this, new String[]{ACCESS_FINE_LOCATION, CAMERA}, PERMISSION_REQUEST_CODE);`.

The `ActivityCompat.requestPermissions()` needs an array of permissions and specified return code, such as 200 for no error.

For example, the 200 series of return codes are as follows:

|Code|Meaning||Code|Meaning|
|---|---|---|---|---|
|200|OK||205|Reset Content
|201|Created||206|Partial Content|
|202|Accepted||207|Multi-Status|||
|203|Non-Authoritative Information||208|Already Reported|
|204|No Content||226|IM Used|


Now it's time to code the bulk of the programme, that handles the API Get for the requested premissions

```java
@Override
public void onRequestPermissionsResult(int requestCode, String permissions[], int[] grantResults) {
  switch (requestCode) {
    case PERMISSION_REQUEST_CODE:
      if (grantResults.length > 0) {
        
        boolean locationAccepted = grantResults[0] == PackageManager.PERMISSION_GRANTED;
        boolean cameraAccepted = grantResults[1] == PackageManager.PERMISSION_GRANTED;

        if (locationAccepted && cameraAccepted)
          Snackbar.make(view, "Permission Granted, Now you can access location data and camera.", 
          Snackbar.LENGTH_LONG).show();
        else {
          Snackbar.make(view, "Permission Denied, You cannot access location data and camera.",
          Snackbar.LENGTH_LONG).show();
          
          if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
          
             if (shouldShowRequestPermissionRationale(ACCESS_FINE_LOCATION)) {
                  showMessageOKCancel("You need to allow access to both the permissions",
                  new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                          requestPermissions(new String[]{ACCESS_FINE_LOCATION, CAMERA}, PERMISSION_REQUEST_CODE);
                        }
                      }
                   });
                return;
              }
          }
        }
      }
    break;
   }
}
```

`onRequestPermissionsResult` checks if the permissions are granted or not. 

In the code if both the permissions are not granted an alert dialog is popped showing the mandatory need to request the permissions. To do that `shouldShowRequestPermissionRationale(String permission)` is invoked which invokes an alert dialog showing the need for the permissions. You can revoke the permissions manually from Settings->Apps->Permissions.

Lastly, within the MainActivity.java script you need the metho `ShowMessageOkCancel()` that is invoked by `onRequestPermissionsResult()` method using the `DialogInterface` class.

```java
private void showMessageOKCancel(String message, DialogInterface.OnClickListener okListener) {
        new AlertDialog.Builder(MainActivity.this)
                .setMessage(message)
                .setPositiveButton("OK", okListener)
                .setNegativeButton("Cancel", null)
                .create()
                .show();
    }
```

### `AndroidMainfest.xml`

Reproduce the following code in the `AndroidManifest.xml`.

Pay attention to the uses-permission lines.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.uog.runtimepermissions">

    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity
            android:name=".MainActivity"
            android:label="@string/app_name"
            android:theme="@style/AppTheme.NoActionBar">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>

```
1. In the above code the two permissions that are checked and requested are `CAMERA` and `LOCATION`.
2. Importing the static permission full class name allows us to write just the `PERMISSION` object instead of the fully qualified path.


>**Note:**
>> The runtime permission specific methods are available only since API 23. Hence the following condition is checked at each of the methods :
>>
>> `if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M)`


## Result

The output of the android runtime permissions example application in action is given below.

<div align=center>

![](https://journaldev.nyc3.digitaloceanspaces.com/2016/03/android-runtime-permission-output.gif)

</div>


-----

<details>
<summary>MainActivity Code in full</summary>

```java
package com.uog.runtimepermissions;

import android.content.DialogInterface;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.support.design.widget.Snackbar;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;

import android.view.View;
import android.widget.Button;

import static android.Manifest.permission.ACCESS_FINE_LOCATION;
import static android.Manifest.permission.CAMERA;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private static final int PERMISSION_REQUEST_CODE = 200;
    private View view;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        Button check_permission = (Button) findViewById(R.id.check_permission);
        Button request_permission = (Button) findViewById(R.id.request_permission);
        check_permission.setOnClickListener(this);
        request_permission.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        view = v;
        int id = v.getId();
        switch (id) {
            case R.id.check_permission:
                if (checkPermission()) {
                    Snackbar.make(view, "Permission already granted.", Snackbar.LENGTH_LONG).show();
                } else {
                    Snackbar.make(view, "Please request permission.", Snackbar.LENGTH_LONG).show();
                }
                break;
            case R.id.request_permission:
                if (!checkPermission()) {
                    requestPermission();
                } else {
                    Snackbar.make(view, "Permission already granted.", Snackbar.LENGTH_LONG).show();
                }
                break;
        }

    }

    private boolean checkPermission() {
        int result = ContextCompat.checkSelfPermission(getApplicationContext(), ACCESS_FINE_LOCATION);
        int result1 = ContextCompat.checkSelfPermission(getApplicationContext(), CAMERA);
        return result == PackageManager.PERMISSION_GRANTED && result1 == PackageManager.PERMISSION_GRANTED;
    }

    private void requestPermission() {
        ActivityCompat.requestPermissions(this, new String[]{ACCESS_FINE_LOCATION, CAMERA}, PERMISSION_REQUEST_CODE);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String permissions[], int[] grantResults) {
        switch (requestCode) {
            case PERMISSION_REQUEST_CODE:
                if (grantResults.length > 0) {
                    boolean locationAccepted = grantResults[0] == PackageManager.PERMISSION_GRANTED;
                    boolean cameraAccepted = grantResults[1] == PackageManager.PERMISSION_GRANTED;
                    if (locationAccepted && cameraAccepted)
                        Snackbar.make(view, "Permission Granted, Now you can access location data and camera.", Snackbar.LENGTH_LONG).show();
                    else {
                        Snackbar.make(view, "Permission Denied, You cannot access location data and camera.", Snackbar.LENGTH_LONG).show();
                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                            if (shouldShowRequestPermissionRationale(ACCESS_FINE_LOCATION)) {
                                showMessageOKCancel("You need to allow access to both the permissions",
                                        new DialogInterface.OnClickListener() {
                                            @Override
                                            public void onClick(DialogInterface dialog, int which) {
                                                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                                                    requestPermissions(new String[]{ACCESS_FINE_LOCATION, CAMERA},
                                                            PERMISSION_REQUEST_CODE);
                                                }
                                            }
                                        });
                                return;
                            }
                        }
                    }
                }
                break;
        }
    }


    private void showMessageOKCancel(String message, DialogInterface.OnClickListener okListener) {
        new AlertDialog.Builder(MainActivity.this)
                .setMessage(message)
                .setPositiveButton("OK", okListener)
                .setNegativeButton("Cancel", null)
                .create()
                .show();
    }

}

```
</details>

-----


## Afterwards

Experiment with other permissions

> [https://gist.github.com/Arinerron/1bcaadc7b1cbeae77de0263f4e15156f](https://gist.github.com/Arinerron/1bcaadc7b1cbeae77de0263f4e15156f) and see what they mean.