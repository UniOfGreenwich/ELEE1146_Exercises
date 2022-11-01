# Lab 7 Android App using Icons and Decision Making Controls Pt 2 

> You will need to download the following picture folder -> [Lab_7_Picture.zip](Lab_7_Pictures.zip)

For the exercises below, follow the steps in the Ticket Vault example (from last week lab).

## 1. Phone Photo Prints App

|Application Title|Phone Photo Prints App|
|---|---|
|Purpose|The app determines the cost of printing photos from your phone. The pictures are delivered directly to your home|
|Algorithm 1:|The opening screen requests the number of photos to print form a user’s phone|
|Algorithm 2:|The user selects a `radio button` labelled 4 x 6 prints (19 pence each), 5 x 7 prints (49 cent each) and 8 x 10 prints (79 pence each) then selects ORDER PRINTS button.|
|Alogrithm 3:|The cost is displayed for the number of prints and the result is rounded to the nearest penny. Do not enter more than 50 prints.|
|Alogrithm 4:|Use a theme that displays an Action bar with the custom Action bar icon in the finished layout.  Use a custom launcher icon named ic_aluncher_photo.png from the downloaded zip folder.|

<div align=center>

![h:500](figures/step1.png)

</div>

---------

## 2. Car Wash App

|Application Title|Car Wash App|
|---|---|
|Purpose|Large cities provide car wash apps where you can purchase packages for your vehicle.|
|Alogrithm 1:|The opening screen requests the type of car wash package you would like to purchase.|
|Algorithm 2:|The user selects which type of car wash – exterior only or exterior with interior vacuum services. The Car Wash App charges £8.99 for an exterior wash and £12.99 for an exterior wash with an interior vacuum for a package of 12 or more car washes. If you select less than 12 washes, the charge is £10.99 for an exterior wash and £15.99 for an exterior with interior vacuum.|
|Algorithm 3:|After the user clicks the `Button` control, the selected location and the total team coast are displayed in the `TextView` control.|
|Algorithm 4:|Use a customized launcher icon ic_launcher_carwash.png (from the zip folder) and display the same icon in the Action Bar using Theme.`AppCompat.Light theme`. Display an `ImageView` control (carwash.png, from the zip folder).  Only one `RadioButton` control can be selected. A toast message should pop up when the user enters less than 12 washes that they must buy 12 washes to receive a discount.|


<div align=center>

![](./figures/step2.png)
</div>

-----

## 3. Power Tool Rental App

|Application Title|Power Tool Rental App|
|---|---|
|Purpose|The app determines the cost of power washer or tiller|
|Algorithm 1:|The opening screen requests the number of days that the power tool will be rented.|
|Algorithm 2:|The user selects a radio button labelled Power Washer or Tiller and then selects the `COMPUTE COST` button.|
|Algorithm 3:|The final cost is displayed for the number of days rented and the result is rounded to the nearest penny.|
|Alogrithm 4:|The power washer costs £55.99 a day and the tiller - £68.99 a day.  Do not enter more than 7 days.|
|Alogrithm 5:|Locate an image online and resize it for use as a custom launcher icon and Action bar icon.|

------


## 4. Floor Tiling App

|Application Title|Floor Tiling App|
|---|---|
|Purpose|The tiling app allows you to calculate how many tiles you need to cover a rectangular area.|
|Algorithm 1:|The opening screen requests the length and the width of a room in whole feet.|
|Algorithm 2:|The user selects whether the tiles are 12 inches by 12 inches or 18 inches by 18 inches.|
|Algorithm 3:|The number of tiles to cover the area in square feet is displayed|
|Algorithm 4:|Ensure that the user can have other units of measurement, centimeters\\(^{2}\\), meters\\(^{2}\\) etc.
