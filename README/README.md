# Expiry List

## Requirements:
### The supermarket has two rules:
1. Expired items must be removed
2. Items that have been on the shelf for more than **N** weeks must be removed

#### Items can have 4 states:
1. **new** - the item has arrived this week
2. **valid** - the item is not expired and has been on the shelf for LESS than **N** weeks
3. **old** - the item is not expired but has been on the shelf for MORE than **N** weeks
4. **expired** - the item has expired (the date is older than the current week date
5. **removed** - the item has been removed by the user

#### Documentation
- readme.md file that describes the project.
- JSDoc documentation /JSDoc folder

All documentation have been created.

#### Important
- Variables have meaningful names
- The code is well documented
- The code is well indented
- The data structures is effective and the code is efficient
- We are able to explain each line of our code

All the important section points have been respected

## Items
Each item have:
1. an unique ID
2. a name
3. an expiration date
4. a state
5. a numer of checks

- The ID is unique!
- The names is randomly generated from a given set
- The expiry dates is randomly generated between the start and finish date of the weekly runs
- The date format is configurable; the mounth and the day can be: "short", "normal", "capitalize", "numb" and the date format can be: "dayMonthYear", "yearMonthDay", "monthDayYear"
- In general the printout to the console is always aligned properly
---

## Organizzation

Keeping in mind the feedback given to our group Any problems with your previous homework 'Expiry List' should be correct:
- No line of code exceeds 120 characters.
- All global variables have been converted into object properties
- Kept the division on multiple Javascript files
- Set interval was not used

Firstly Marius has restructured the first expiry list project in order to have an object oriented project wihout global scope variables.
Then we have carefully read the documentation and tried to understand the main functions to divide the work. After the conception of Marius, a first draft of the work was made and each took care of the functions.  
Gabriela managed the html and css and a part of the setting manager, Leandro was responsible for validation of form and Marius managed the configuration and the functions which regarded the management of the program. The structure of the work was made by Marius so that we could already have a base to work on; Leandro created an Excel file with the division of activities and the various phases of the modifications and tests.  
Also on the team goals, the ones that were about to be completed were loaded to allow the others and the leader to check that it was OK.  
At the beginning there were problems because everyone had their functions tested and working, but putting them together was not good. 



## Work division
|MEMBER NAME       | TASK NAME                | DESCRIPTION                                                              |
| -----------------|--------------------------|--------------------------------------------------------------------------|
|Marius Cozma      |                          |                                                                          |
|                  |main.js                   |                                                                          |
|                  |expiryListTableManager.js |                                                                          |
|                  |expiryListItemsManager.js |                                                                          |
|                  |JsDocs                    |                                                                          |
|                  |                          |                                                                          |
|Leandro Allemandi |                          |                                                                          |
|                  |expiryListSettingManager.js |                                                                        |
|                  |Documentation             |All project documentation in markdown format                              |
|                  |                          |                                                                          |
|Gabriela Andrei   |                          |                                                                          |
|                  |index.html                |                                                                          |
|                  |style.css                 |                                                                          |
|                  |some methods of the expiryListSettingManager.js and expiryListTableManager.js                        |
|                  |                          |                                                                          |
|                  |                          |                                                                          |

---

## Resources
[W3school](https://www.w3schools.com/)
[Dillinger](https://dillinger.io/)
[useJsDoc](http://usejsdoc.org/)

---

## Coding
Example of main.js:
```js
/**
 * Function that execute the core of the expiry list
 * The first time this function is called creates the tables structures and execute all with the 
 * default settings, the other times execute all with the input settings
 * @param {object} config - the configuration object with all the settings
 * @param {boolean} first - value that tells if the program is running with the default settings or 
 * not, true = default settings, false = input settings
 */
function executeExpiriList(config, first) {
    var itmManager = createItemManager();
    var itmsListManager = createItemsListManager();
    var expiryTableManager = createExpiryListTableManager();
    /**Array that contains all the week arrays*/
    var weeksList = [];

    /**
     * Object used to track and to collect some important informations needed in the other 
     * funcions
     * @namespace trackingObj
     * @property {number} lastId - the last id used for the items
     * @property {object} endDate - the end date of the program
     * @property {number} weekNumber - the number of the current week showed
     * @property {number} maxWeekReached - the maximum week reached, nedeed to track if the next 
     * week has to be generated or if already exists
     * @property {object} backwardButton - the backward Button
     * @property {object} forwardButton  - the forward Button
     * @property {object} weekDate - the date of the current week in the program
     */
    var trackingObj = {
        lastId: 0,
        endDate: new Date(),
        weekNumber: 0,
        maxWeekReached: 0, 
        backwardButton: document.getElementById("backward"),
        forwardButton: document.getElementById("forward"),
        weekDate: new Date()
    }

    /**Running the program with the default settings the first time */
    if(first) {          
        expiryTableManager.createTableStructure(expiryTableManager.header, "week_list", "week");
        expiryTableManager.createTableStructure(expiryTableManager.header, "week_filtered_list", 
        "filtered");
         /**Generation and output of the first expiry table with the default settings */
        var weeksList = generateFirstExpiryTable(itmManager, itmsListManager, config, 
            expiryTableManager, trackingObj, weeksList); 
    } else {
        /**Running the program with the input settings given
         * the old forward and backward buttons are deleted and replaced with new buttons that are 
         * the same, in order to solve de problem of multiple listeners on the same button. 
         */
        document.getElementById("btn_forward").removeChild(document.getElementById("forward"));
        var forward = document.createElement("button"); forward.id = "forward"; 
        forward.textContent = "Forward";
        document.getElementById("btn_forward").appendChild(forward);
        trackingObj.forwardButton = document.getElementById("forward");
        trackingObj.backwardButton.style.display = "";
        document.getElementById("btn_backward").removeChild(document.getElementById("backward"));
        backward = document.createElement("button"); 
        backward.id = "backward"; 
        backward.textContent = "Backward";
        document.getElementById("btn_backward").appendChild(backward);
        trackingObj.backwardButton = document.getElementById("backward");
    
        /**Generation and output of the first expiry table with the input settings */
        var weeksList = generateFirstExpiryTable(itmManager, itmsListManager, config, 
            expiryTableManager, trackingObj, weeksList); 
        
    }
    /**When the program starts the bacward button isnt avaiable */
    trackingObj.backwardButton.style.display = "none";

    /**Execute the goForwardButton that manage the generation of the next tables and the output*/
    goForwardButton(itmManager, itmsListManager, config, expiryTableManager, trackingObj, weeksList);
    /**Execute the goBackwardButton that manage the output of the tables when the user 
     * clicks tha bacward button
    */
    goBackwardButton(itmManager, itmsListManager, config, expiryTableManager,trackingObj, weeksList);
}
/**
 * Function that creates the setting manager, the config object and that execute the executeExpiryList
 * function for thefirst time with the default configuration setting. Adds also the listener to 
 * the save settings button that execute the executeExpiriList function with the new settings taken 
 * from the input
 */
function configureExpiryList () {
    /* creation of the expiry list settig manager that contains all the methods to manage
       the settings input and the validation */
    var setManager = createExpiryListSettingManager();
    /**Creation of the configuration object */
    var config = createConfig();
    /**Disable the save settings button, when all the inputs will be validate it will be set able*/
    document.getElementById("saveSettings").disabled = true;

    /*validation for all the inputs, until all the inputs aren't valid the save settings will be
    disable*/
    setManager.validateAll();

    /**Activating that the default settings will be shown in the input form, but for activate the 
     * save settings button it is necessar to insert manually by the input form all the settings 
     * configurations 
    */
    //setManager.setDefaultConfig(config);

    /**Execute the expiry list with the default config */
    executeExpiriList(config, true);
    
    /**Adds the event on the save settings button. On the click of the button all the new settings
     * will be set and the program will be reset and will start with the new settings
     */
    document.getElementById("saveSettings").addEventListener("click", function() {
        setManager.setConfig(config);
        executeExpiriList(config, false);  
        document.getElementById("setting_out").style.display = "none";  
    });

    /**setting button that makes the settings pannel to appear */
    setManager.showSettings("setting_out", "setting_out_button");
}
configureExpiryList();

```

```html
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<html lang="en">

<head> <!-- Contains title and meta information about the document -->
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="description" content="Expiry List 2">
	<meta name="author" content="Group 1">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="generator" content="Visual Studio Code 1.24.1">
	<!-- Contains reset for default browser style -->
	<link rel="stylesheet" href="assets/css/reset.css">
	<!-- Contains css style of document --> 
	<link rel="stylesheet" href="assets/css/style.css">
	
	<title>Expiry List</title>
</head>
    
<body> <!-- Contains the visible page content -->
	<div id="wrapper">
		<!-- Contains the top bar with title and button -->
		<div class="setting"> 
			<div class="title">
				<div class="title_title">
					<h1>Inventory Management System</h1>
				</div>
				<div class="title_setting">
					<button id="setting_out_button" >Setting</button>
				</div>
			</div>
		</div>
		<!-- Contains the form with settings -->
		<div id="setting_out">
			<form>
				<div class="container_settings">
					<h3>Weeks:</h3>
					<input id="weeks" name="weeks" type="number">
					<p id="responseWeek"></p>
				</div>	
```

configureExpireList() handles input validation and assigns an event to the saveConfiguration button
executeExpireList() invokes goForwardButton() and goBackwardButton() generateFirstExpireTable() createTableStructure()
as soon as the program is launched, there are default settings within the configuration object created by configureExpireList().
when settings are entered by the user they are managed inside executeExpireList().
both are managed by executeExpireList(). When the user inserts the settings we delete the old buttons and recreate them to eliminate the old events and create new ones.
we generate the table structure with executeExpireList().
the first week is printed and managed by executeExpireTable().
the main structure for managing the weeks is an array containing arrays of objects.
in principle, the main array has only one element, which is the first week's array.
when it goes on if the array of other weeks are not generated it creates them.
otherwise it picks them up from those already present in the weeks array getita from goForwardButton().
goBackwardButton() reads only the weeks already created.
In the inputs form the date offset can't be greater than the number of weeks.
The input form accepts the 'e' caracter and don't show the red X but don't validate the input, so the 
save button does not activate.
We have created some code to guarantee validation even in browsers that do not support the input type date or number. The first bonus was not played, while the second was only partially played.

## Support
|ROLE     |FIRST NAME | LAST NAME | CONTACT                             |
|---------| ----------|-----------|-------------------------------------|
|Chief    |Marius     |Cozma      |marius.cozma@edu.itspiemonte.it      |
|Developer|Leandro    |Allemandi  |leandro.allemandi@edu.itspiemonte.it |
|Developer|Gabriela   |Andrei     |gabriela.andrei@edu.itspiemonte.it   |

---
## Installation
Open the file named index.html  
index.html requires main.js which calls functions in function.js 
---
## Compatibility
|BROWSER           |COMPATIBILITY                        |
|---------         |-------------------------------------|
|Explorer          |not compatible                       |
|Edge              |not compatible                       |
|Chrome            |compatible                           |
|Mozilla Firefox   |compatible                           |
       

---
## License
The project is licensed under the ITS-ITC Foundation.
Piazza Dei Mestieri 2
Via Jacopo Durandi 10
10100 Turin (To) Italy

Contact:
Tel: +39 011 0371500
P.IVA 10600860018
C.F. 97734430016
Numero REA TO – 1147027
Registro PG Pref. di Torino nr. 731
PEC its-ictpiemonte@pec.it