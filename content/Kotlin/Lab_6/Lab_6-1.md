# Lab 6.1: Arrays in Kotlin

In this lab you are going to experiment with Arrays. You will need to use **IntelliJ** IDE.

1. Create a new project and Select Kotlin and tick the Sample Code check box. 

<div align=center>

![](./figures/arrays1.png)

</div>

2. Modify the `Main.kt` content so it looks like: 
    ```kt
    fun main(args: Array<String>) {

    } 
    ```

3. Inside the `main(..){`...`}` we are going to declare and initialise three arrays, `intArray`, `stringArray`, and `doubleArray`:

    ```kt
    fun main(args: Array<String>) {
        val intArray = intArrayOf(1, 2, 3, 4, 5)
        val stringArray = arrayOf("apple", "banana", "cherry", "date", "elderberry")
        val doubleArray = DoubleArray(5) // An array of doubles with a size of 5
    }
    ```

4. To output these arrays we are going to use `joinToString()`
    ```kt 
    println("intArray: ${intArray.joinToString()}")
    println("stringArray: ${stringArray.joinToString()}")
    println("doubleArray: ${doubleArray.joinToString()}")
    ```
    - The `joinToString()` function is used to convert arrays into strings for display.

    **Output**
    ```kt
    intArray: 1, 2, 3, 4, 5
    stringArray: apple, banana, cherry, date, elderberry
    doubleArray: 0.0, 0.0, 0.0, 0.0, 0.0
    ```

5. Now let's access the first and second index of `intArray` and `stringArray` respectively. Add the following underneath the last block of code:

    ```kt
    println("First element of intArray: ${intArray[0]}")
    println("Second element of stringArray: ${stringArray[1]}")
    ```
    - Remember the array[index] points to the position of a value whose index starts from 0 to size of the array - 1.

    **Output**
    ```kt
    First element of intArray: 1
    Second element of stringArray: banana
    ```

    - Try and get the last element from both arrays.

6. We can iterate of an array using a for loop. Continuing underneath the last code added:

    ```kt
    println("Iterating through intArray, using object:")
    for (element in intArray) {
        println(element)
    }
    ```

    **Output**

    ```kt
    Iterating through intArray, using object:
    1
    2
    3
    4
    5
    ```
    - the `element` is like an object in a toy box.

7. Continuing with looping we can setup the for loop differently, repeat: 

    ```kt
    println("Iterating through stringArray, using indexing:")
    for (i in 1..stringArray.lastIndex) {
            println(stringArray[i])
        }
    ```
    **Output**
    ```kt
    Iterating through stringArray, using indexing:
    banana
    cherry
    date
    elderberry
    ```

8. We can modify and array when the array is mutable as in it is a `var` **not** a `val`. Modify the third element of `intArray` by setting it to 10 and then print the modified `intArray`:
   ```kt
    intArray[2] = 10
    println("Modified intArray: ${intArray.joinToString()}")
   ```
   **Output**
   ```kt
   Modified intArray: 1, 2, 10, 4, 5
   ```

9. We create a two-dimensional array (`twoDArray`) and populate it with values. We then iterate through the two-dimensional array and print its contents.

    > **Note:**
    >> - a 2D array is like a matrix/table
    >> - |a|b|
    >>   |---|---|
    >>   |1|2|
    >>   |3|4| 

    ```kt
    val twoDArray = Array(3) { IntArray(4) } // 3x4 matrix
    for (i in 0 until 3) {
        for (j in 0 until 4) {
            twoDArray[i][j] = i + j
        }
    }
    ```

    **Output**
    ```
    Two-dimensional array:
    0, 1, 2, 3
    1, 2, 3, 4
    2, 3, 4, 5
    ```

10. Now define a custom data class `Person` and create an array of `Person` objects (`personArray`). We iterate through `personArray` and print the name and age of each person:

    ```kt 
    data class Person(val name: String, val age: Int)
    val personArray = arrayOf(
        Person("Alice", 28),
        Person("Bob", 22),
        Person("Charlie", 35)
    )

    println("Array of Persons:")
    for (person in personArray) {
        println("Name: ${person.name}, Age: ${person.age}")
    }
    ```
    **Output**
    ```
    Array of Persons:
    Name: Alice, Age: 28
    Name: Bob, Age: 22
    Name: Charlie, Age: 35
    ```