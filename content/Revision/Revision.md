# Revision

- [Revision](#revision)
  - [Kotlin Concepts](#kotlin-concepts)
  - [Android Architecture](#android-architecture)
  - [Android Permissions etc](#android-permissions-etc)
  - [Data structures](#data-structures)

## Kotlin Concepts

1. Elaborate on the significance of visibility modifiers in Kotlin. How do they control access to properties and functions within classes?

    <details>
    <summary>Answer</summary>

    - `public`: accessible from anywhere.
    - `private`: accessible only within the same file or class.
    - `protected`: accessible within the same file or subclass.
    - `internal`: accessible within the same module.

    </details>


2. Compare and contrast the four visibility modifiers in Kotlin: `public`, `private`, `protected`, and `internal`. Provide examples to illustrate their usage in different contexts.

    <details>
    <summary>Answer</summary>

    - `public`: `public var age: Int = 0`
    - `private`: `private var password: String = "1234"`
    - `protected`: `protected var balance: Double = 1000.0`
    - `internal`: `internal val companyName: String = "ABC Corp"`

    </details>

3. Discuss the implications of changing visibility modifiers on code maintainability and security in Kotlin projects.

    <details>
    <summary>Answer</summary>

    Changing visibility modifiers affects who can access properties and functions, thus influencing code maintainability and security. For instance, making sensitive data private enhances security by restricting access.

    </details>

4. Analyze the structure of a Kotlin function, highlighting the key components that define its behavior.

    <details>
    <summary>Answer</summary>

    Essential components include the function name, parameters, return type, and function body. Parameters and the function body are mandatory.

    ```kt
    FUNCTION HEADER 
    <visibility modifiers> [fun keyword] [function name]<(function parameters)> <:return type> { 
        ... FUNCTION BODY 
        <return type> 
    } 
    ```

    Everything in: 
    - `<>` is optional, 
    - `[ ]` is mandatory,
    - `<[ ]>` is optional but if supplied is mandatory P

    </details>

5. Evaluate the performance differences between `StringBuilder` and `String` concatenation operations in Kotlin. When is each approach preferable?

    <details>
    <summary>Answer</summary>

    `StringBuilder` is more efficient for concatenating multiple strings because it avoids unnecessary memory allocation and copying.

    </details>

6.  Explore advanced features of the `StringBuilder` class in Kotlin, such as append and insert methods, and demonstrate their usage in practical scenarios.

    <details>
    <summary>Answer</summary>

    Advanced features like append and insert methods in `StringBuilder` allow for dynamic string manipulation, such as building complex strings efficiently.

    </details>

7.   Examine the role of constructors in Kotlin classes and their significance in object initialization and instantiation.

        <details>
        <summary>Answer</summary>

        Constructors initialize objects of a class. They are essential for setting initial values and ensuring object consistency.

        </details>


13. Explore the concept of data encapsulation in Kotlin classes and how constructors contribute to maintaining data integrity.

    <details>
    <summary>Answer</summary>

    Data encapsulation ensures that the internal state of an object is protected from unauthorized access. Constructors play a crucial role in initializing this internal state..

    </details>

14. Define a class Patient with the following elements: 

    - Four class variables: 

      - patient id number (an integer) 

      - patient first and last names and home address (strings).  

    - Three constructors: 

      - one default constructor giving default values (zeros and empty strings) to all the class variables 

      - a second constructor giving values to the patient id number, first and last names but not the home address 

      - a third constructor giving values to all four class variables. 

    <details>
    <summary>Answer</summary>

    ```kt
    class Patient{

        private var pNumber    : Int
        private var pFirstName : String
        private var pLastName  : String
        private var pAddress   : String

        constructor(){
            this.pNumber = 0
            this.pFirstName = ""
            this.pLastName = ""
            this.pAddress = ""
        }

        constructor(pID : Int, fName : String, lName : String){
            this.pNumber = pID
            this.pFirstName = fName
            this.pLastName =  lName
            this.pAddress = ""
        }

        constructor(pID : Int, fName : String, lName : String, address : String){
            this.pNumber = pID
            this.pFirstName = fName
            this.pLastName = fName
            this.pAddress = address
        }
    }
    ```
    </details>

1.  Create two new objects called `patient1` and `patient2` of the class `Patient`.   Use the default constructor for `patient1` and the third constructor from above for `patient2` with the following values: 
       - for patient id number: 12987, 
       - for first name: Radi, 
       - for last name: Dontcheva, for address: 20 Lewis Avenue, Gillingham, Kent, ME8 7HM.   

    <details>
    <summary>Answer</summary>

    ```kt
    val patient1 = Patient()
    val patient2 = Patient(12987,"Radi","Dontcheva","20 Lewis Avenue, Gillingham, Kent, ME8 7HM")
    ```

    </details>

-------

## Android Architecture

14. Describe the role and structure of the Linux kernel in the Android operating system.

    <details>
    <summary>Answer</summary>

    The Linux kernel serves as the foundation of the Android operating system, providing core functionalities such as hardware abstraction, process management, and device drivers. It manages system resources, facilitates communication between hardware and software components, and ensures security and stability. The structure of the Linux kernel consists of various subsystems responsible for different tasks, including memory management, file system handling, networking, and device drivers.

    </detials>

15. Discuss the significance of supporting multiple processor architectures in the Android ecosystem. Provide examples of devices using each architecture.

    <details>
    <summary>Answer</summary>

    Supporting multiple processor architectures allows Android to run on a wide range of devices with different hardware configurations. Examples of processor architectures supported by Android include ARM, x86, MIPS, and more recently, ARM64. ARM-based processors are commonly found in smartphones and tablets, while x86 processors are used in some Android-powered PCs and laptops. MIPS processors are less common but have been used in certain embedded systems and smart home devices.

    </detials>
    
19. Explain the concept of Hardware Abstraction Layer (HAL) in Android and its role in ensuring hardware compatibility across different devices.

    <details>
    <summary>Answer</summary>

    The Hardware Abstraction Layer (HAL) in Android provides a standardized interface between device-specific hardware components and the Android framework. It abstracts the hardware functionality into a set of standardized APIs, allowing developers to access hardware features without needing to know the underlying hardware details. HAL implementations are provided by device manufacturers, ensuring compatibility with the Android framework across different devices while allowing manufacturers to optimize hardware performance and capabilities.

    </detials>
    
20. Compare and contrast SDK (Software Development Kit) and APK (Android Package) in Android development. Provide real-world examples of each.

    <details>
    <summary>Answer</summary>

    The SDK (Software Development Kit) is a set of tools, libraries, and APIs provided by Google for developing Android applications. It includes tools such as the Android Studio IDE, the Android SDK Manager, and various APIs for accessing device features. An example of using the SDK is developing an app that utilizes the camera API to capture photos.

    APK (Android Package) is the package file format used to distribute and install Android applications. It contains compiled code, resources, assets, and metadata required for the application to run on an Android device. An example of an APK is the file downloaded from the Google Play Store when installing an app on an Android device.

    </detials>
    
21. How would you resolve the discrepancy between an app's target API version and its compile SDK version to ensure compatibility with API 26 features during runtime?

    <details>
    <summary>Answer</summary>

    To ensure compatibility with API 26 features during runtime while maintaining a compile SDK version of 25, you can use feature detection or runtime checks. 

    </detials>
    
22. Discuss the importance of the manifest file in Android app development and deployment.

    <details>
    <summary>Answer</summary>

    The manifest file (`AndroidManifest.xm`l) is a crucial component of an Android application as it contains essential metadata about the application, such as its package name, version, permissions, and components (activities, services, broadcast receivers). It defines the structure and behavior of the application, including its entry points, required permissions, and declared components. The manifest file is used by the Android system to determine the application's configuration and security settings, and it plays a vital role in the deployment and execution of the application on Android devices.

    </detials>
    
23. Analyze the XML code snippet provided in the manifest example below and explain the function of each attribute and element within the <application> tag.

    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <manifest xmlns:android="http://schemas.android.com/apk/res/android"
        package="com.example.myapp">

        <application
            android:allowBackup="true"
            android:icon="@mipmap/ic_launcher"
            android:label="@string/app_name"
            android:supportsRtl="true"
            android:theme="@style/AppTheme">

            <activity android:name=".MainActivity">
                <intent-filter>
                    <action android:name="android.intent.action.MAIN" />

                    <category android:name="android.intent.category.LAUNCHER" />
                </intent-filter>
            </activity>

        </application>

        <uses-permission android:name="android.permission.INTERNET" />
        <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    </manifest>
    ```


    <details>
    <summary>Answer</summary>

    - The <application> element defines the configuration and components of the application.
    `android:allowBackup="true"` indicates whether to allow the application to participate in the backup and restore infrastructure.
    - `android:icon="@mipmap/ic_launcher"` specifies the icon for the application.
    - `android:label="@string/app_name"` sets the human-readable label for the application.
    - `android:supportsRtl="true"` indicates whether the application supports right-to-left (RTL) layouts.
    - `android:theme="@style/AppTheme"` specifies the theme for the application.
    - The `<activity>` element declares an activity component within the application.
    android:name=".MainActivity" specifies the name of the activity class.
    - The `<intent-filter>` element defines the types of intents that the activity can respond to.
    `<action android:name="android.intent.action.MAIN" />` specifies that this activity is the main entry point of the application.
    - `<category android:name="android.intent.category.LAUNCHER" />` indicates that this activity should appear in the launcher as an entry point for the application.
    - The closing `</application>` tag marks the end of the `<application>` element.
    `<uses-permission android:name="android.permission.INTERNET" />` requests permission to access the internet.
    - `<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />` requests permission to access information about network connectivity.


    </detials>
    
--------------------


## Android Permissions etc

24. Describe a high-level workflow for managing app permissions on Android devices. Explain the steps involved in requesting, handling, and managing permissions within an Android application.

    <details>
    <summary>Answer</summary>
    A high-level workflow for using app permissions on Android involves the following steps:

    - Declare Permissions: In the Android manifest file, declare the permissions required by the app using `<uses-permission>` tags.

    - Request Permissions: At runtime, prompt the user to grant permissions using the `requestPermissions()` method. Handle the user's response in the `onRequestPermissionsResult()` method.

    - Check Permission Status: Before performing operations that require permissions, check if the necessary permissions are granted using the `checkSelfPermission()` method.

    - Handle Permission Results: Implement logic to handle permission results. If permissions are granted, proceed with the desired operation. If permissions are denied, inform the user and adjust the app's behavior accordingly.

    - Manage Permission Requests: Handle scenarios where permissions are permanently denied by providing explanations and directing users to the app settings to manually grant permissions.


    </details>

25. Identify and explain the three categories that permissions fall under in the context of Android applications. Provide detailed descriptions for each category, highlighting their significance in app development and user privacy.

    <details>
    <summary>Answer</summary>

    Permissions in Android are categorized into three main categories:

    - **Normal Permissions:** These permissions do not pose a significant risk to user privacy or the device's operation. They are automatically granted at installation and do not require user confirmation.

    - **Dangerous Permissions:** These permissions pose a risk to user privacy or the device's operation. They require explicit user consent at runtime and are considered dangerous because they grant access to sensitive data or features.

    - **Signature/admin/root Permissions:** These permissions are granted to apps that are signed with the same certificate as the app that declared the permission. They are used for system-level permissions and are not available to third-party apps.

    </details>

26. Explain the permissions required by an Android app that takes pictures using the device's camera and saves them to internal storage. Discuss the associated risks with each permission, considering user privacy and security concerns.

    <details>
    <summary>Answer</summary>

    For an app that takes pictures using the camera and saves them to internal storage, the required permissions include:

    - Camera Permission: Required to access the device's camera hardware.
    
      - Camera Permission: Allows the app to access the camera, potentially compromising user privacy if misused for unauthorized surveillance.


    - Write External Storage Permission: Needed to save the captured images to internal storage.

      - Write External Storage Permission: Grants the app access to write data to the device's internal storage, posing a risk of unauthorized access or modification of sensitive user data stored on the device.    

    </details>

27. Hidden apps are one type of category among malicious apps. Identify and define the other two categories of malicious apps, discussing their characteristics and potential risks to users.

    <details>
    <summary>Answer</summary>

    - Phishing Apps: Apps designed to deceive users into providing sensitive information, such as login credentials or financial details.

    - Spyware: Apps that secretly monitor and collect user data without consent, such as keystroke logging, location tracking, or accessing personal information.

    </details>

28. Describe how the key features of a Hidden App could be implemented. Discuss techniques and strategies that developers might use to conceal the presence and activities of a hidden app on an Android device.

    <details>
    <summary>Answer</summary>

    - Hiding app icons from the device's app drawer or home screen.

    - Concealing app activities from the device's usage logs or recent apps list.

    - Implementing background processes or services to silently perform malicious activities without user awareness.

    </details>


---------------------

## Data structures

29. Explain the concept of an array in programming. Provide examples of scenarios where arrays are commonly used and discuss their advantages and limitations.

    <details>
    <summary>Answer</summary>

    An array in programming stores a collection of elements of the same type in contiguous memory locations. Each element is accessed by an index, representing its position within the array. Arrays efficiently organize and access data.

    **Examples of Array Usage:**

    - Storing Multiple Values: Arrays store similar data types, like student grades or hourly temperatures.

    - Iterating Over Data: Arrays facilitate operations on each element, such as calculating total expenses from employee salaries.

    - Representing Matrices: Arrays represent multi-dimensional data structures, like pixel grids in images.

    - Implementing Data Structures: Arrays are foundational for implementing data structures like stacks and queues.

    **Advantages:**

    - Random Access: Provides constant-time access to elements using their index.

    - Compact Memory Usage: Stores elements efficiently in contiguous memory locations.

    - Efficient Iteration: Facilitates efficient traversal of elements using loops.

    **Limitations:**

    - Fixed Size: Arrays have a fixed size, making dynamic resizing challenging.

    - Homogeneous Elements: Can only store elements of the same data type.

    - Memory Fragmentation: Large arrays may lead to memory fragmentation, affecting performance.

    </details>

30. Create and initialize an integer array named `exampleArr` with the digits from nine to zero. Write a Kotlin loop statement (of your choice) to increment each element of the array by 130.

    <details>
    <summary>Answer</summary>

    ```kt
    val exampleArr = Array(130) { 129 - it }

    for (i in exampleArr.indices) {
        exampleArr[i] += 10
    }
    ```

    ```kt
    val exampleArr = Array(130) { 129 - it }

    exampleArr.forEachIndexed { index, _ ->
        exampleArr[index] += 10
    }
    ```

    ```kt
    val exampleArr = Array(130) { 0 }

    for (i in 129 downTo 0) {
        exampleArr[129 - i] = i + 10
    }
    ```

    </details>

31. Analyze the given Kotlin code fragment below and predict the output structure. Explain your reasoning, including the role of the nested loops and array indexing.

    ```kt
    val matrix = Array(5) { IntArray(5) { it } }

    for (i in matrix.indices) {
        for (j in matrix[i].indices) {
            print("${matrix[i][j]} ")
        }
        println()
    }
    ```

    <details>
    <summary>Answer</summary>

    - The code initializes a 2D array named matrix with dimensions 5x5 using the Array constructor. Each element of the array is initialized to an integer array of size `5` containing consecutive integers starting from `0` for each row. The it keyword inside the `IntArray` constructor represents the current index of the inner array.

    - The code then enters into a nested loop structure:

    - The outer loop iterates over the rows of the matrix, where `i` ranges from `0` to `4` (the index of the last row).
    - The inner loop iterates over the columns of the `matrix[i]`, where `j` ranges from `0` to `4` (the index of the last column in each row).
    - Within the nested loops, each element of the matrix is accessed using array indexing. The value of each element is printed to the console, separated by spaces.

    - After printing all elements of a row, a newline character is printed using the `println()` statement to move to the next line for the next row.

    </details>

32. Write a Kotlin program that calculates and prints the average score of a class, given a map representing student scores. Implement error handling to account for invalid score entries or missing student data. Use the provided map data structure in code block below.

    <div>

    ```kt
    val scores = mapOf(
    "Alice" to 85,
    "Ravi" to 92,
    "Sofia" to 78,
    "Muhammad" to 90,
    "Lila" to 88
    )
    ```

    </div>

    <details>
    <summary>Answer</summary>

    ```kt
    val validScores = scores.filterValues { it in 0..100 }

    if (validScores.isNotEmpty()) {
    val averageScore = validScores.values.average()
    println("Average score of the class: $averageScore")
    } else {
    println("No valid scores found.")
    }
    ```

    </details>