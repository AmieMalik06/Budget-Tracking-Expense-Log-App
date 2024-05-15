This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.jsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More
EXPENSES LOG: 
This React Native code creates an expense tracker app where users can add, edit, and delete 
expenses. It’s the main part that controls everything. It helps us keep track of our spending in a 
really easy way. 
Description of the EXPENSES LOG: 
 
 
Components: 
1- ThemeToggle 
2- ExpenseInput 
ThemeToggle: 
The ThemeToggle component is responsible for rendering a toggle switch that allows users to 
switch between dark and light themes in the application. 
 
ExpenseInput: 
The ExpenseInput component is designed to render input fields for entering expense details, such 
as the Title and Cost. 
 
Imports: 
 
DateTimePickerModal is a component for picking dates and times in a modal. 
PencilSimple and TrashSimple are icons imported from the phosphor-react-native library. 
These are custom icons for the edit and delete buttons. 
State Management: 
 
isEnabled: Manages the state of the theme toggle switch (whether it's enabled or disabled). 
systemTheme: Retrieves the system's color scheme (light or dark) using the useColorScheme 
hook. 
theme: Manages the current theme of the application. 
date: Tracks the selected date for expense entries. 
expName and expCost: Store the name and cost of the expense currently being input. 
data: Maintains a list of expense items. 
totalExpenditure: Tracks the total amount spent on expenses. 
openDatePicker: Manages the visibility state of the date picker modal. 
mainButton: Manages the label text of the main action button (either "ADD EXPENSE" or 
"UPDATE"). 
editingItemId: Tracks the ID of the expense item being edited (or null if not editing). 
styles: Retrieves the styles for the component based on the current theme. 
Date And Time Picker: 
 
 
The DateTimePickerModal component is used to display a modal for selecting dates. It allows 
users to confirm or cancel their date selections, with corresponding actions updating the 
application state accordingly. 
 
 
 
Functionalities: 
1. AddAndUpdate Items: 

2. Edit Items: 

3. Delete Items: 

Toggle Switch: 
 
This toggleSwitch function serves to toggle between dark and light themes in the application. 
 

  
FlatList: 
 
 
This code snippet creates a list of expenses, displaying each expense's ID, title, cost, and 
associated buttons for editing and deleting. It also handles interactions like editing and deleting 
expenses seamlessly. Additionally, it provides feedback when the list is empty. 
useEffect: 

This useEffect function ensures that the total expenditure is dynamically recalculated whenever 
there's a change in the expense data (data array), providing an accurate representation of the total 
expenses incurred by the user. 
To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
