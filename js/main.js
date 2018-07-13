/**
 * @file: main.js
 * @author: Group 01
 * @version: 1.4
 * Expiry Date
 *
 * File that outputs a list of supermarket goods 
 * filtered by expiry date
 */ 

/**
 * Function that creates and returns the configuration object
 * @returns {object} config - the configuration object
 */
function createConfig() {
    /**
    * @namespace config
    * @property {number} maxNumChecks max num of checks that a product can have
    * @property {number} numProdPerWeek number of products to add per week
    * @property {number} weekDuration  the duration between two weekly lists
    * @property {number} daysToAddStartDate  the days to add to the actual date
    * @property {number} numOfWeeks number of weeks for which the program should rung 
    * @property {object} formatDate the format date object that contains options to format the date
    * @property {string} formatDate.format  the format date, you can choose "dayMonthYear", 
    * "monthDayYear" or "yearMonthDay"
    * @property {string} formatDate.formatDay the format day, you can chose "short", "capitalize", 
    * "normal" or "numb" 
    * @property {string} formatDate.formatMonth the format month, you can chose "short", 
    * "capitalize", "normal" or "numb"
    * @property {number} dateOffset - the number of weeks to output
    * @property {object} startDate - the starting date of the program
    */
    var config = {
        maxNumChecks: 2, 
        numProdPerWeek: 3, 
        weekDuration: 2, 
        daysToAddStartDate: 2,
        numOfWeeks: 6, 
        formatDate: {
            format: "dayMonthYear",
            formatDay: "short",
            formatMonth: "capitalize"
        }, 
        dateOffset: 3,
        startDate: new Date()
    }; 

    return config;
}

/**
 * Function that generateand outputs the first tables
 * @param {object} itmManager - the itemManager object that contains the methods for the creation
 * of new items
 * @param {object} itmsListManager  - the items list manager that contains the methods that 
 * works on an items array
 * @param {object} config - the configuration object with all the settings
 * @param {object} expiryTableManager - the expiry table mager that contains the methods for the 
 * output tables and for the events on the rows
 * @param {object} trackingObj - the tracking object that contains some needed propertyes
 * @param {Array[]} weeksList - the array that contains the items arrays which contains the weekly 
 * products
 */
function generateFirstExpiryTable(itmManager, itmsListManager, config, expiryTableManager,
     trackingObj, weeksList) {
    /**The week list of items */
    var items = [];

    /**Calculation of the start date with the adding of the days to add*/
    var startDate = new Date(config.startDate.getTime());
    startDate = itmsListManager.updateDate(startDate, config.daysToAddStartDate, "+");
    itmManager.setMidnight(startDate);

    /**Calculation of the end date of the program */
    trackingObj.endDate = new Date(itmsListManager.updateDate(startDate,
         (config.numOfWeeks - 1) * config.weekDuration, "+"));
    itmManager.setMidnight(startDate);

    /**Putting the first week date in the tracking object*/
    trackingObj.weekDate = new Date(startDate.getTime());

    /**Creation of the first wekly list */
    items = itmsListManager.addItems(items, config.numProdPerWeek,
         trackingObj.lastId, trackingObj.weekDate, trackingObj.endDate, itmManager);
    trackingObj.lastId = items[items.length - 1].id;
    items = itmsListManager.updateState(items, config.maxNumChecks, trackingObj.weekDate);
    
    /**The first weekly list */
    var itemsCopy = itmsListManager.createCopyList(items, itmManager);

    /**The first filtered weekly list */
    items = itmsListManager.checkItems(items);
    
    /**Adding the first weekkly list to the weeks list */
    weeksList.push(itemsCopy);

    /**Output the tables */
    expiryTableManager.printWeekTables(itemsCopy, items, config, trackingObj, weeksList,
        itmsListManager);
    
    if (trackingObj.weekNumber == config.dateOffset - 1) {
        trackingObj.forwardButton.style.display = "none";
    }

    return weeksList;
}

/**
 * Function that adds the event on the forward buttons that outputs the next week. If doesn't exist
 * generate the next week, if already exists takes it from the weeksList
 * @param {object} itmManager - the itemManager object that contains the methods for the creation
 * of new items
 * @param {object} itmsListManager  - the items list manager that contains the methods that 
 * works on an items array
 * @param {object} config - the configuration object with all the settings
 * @param {object} expiryTableManager - the expiry table mager that contains the methods for the 
 * output tables and for the events on the rows
 * @param {object} trackingObj - the tracking object that contains some needed propertyes
 * @param {Array[]} weeksList - the array that contains the items arrays which contains the weekly 
 * products
 */
function goForwardButton(itmManager, itmsListManager, config, expiryTableManager,
    trackingObj, weeksList) {

    /**Adding to the button the event. The function takes the correct week number and outputs
     * the weekly list and generate the filtered weekly list and the weekly date. If the weekly list
     * already exists in the weeksList array takes that list and outputs to the table, if not generates
     * the new weekly list
     */
    trackingObj.forwardButton.addEventListener("click", function() {
        trackingObj.weekNumber++;
        /**Generation of the current week date */
        oldDate  = new Date(trackingObj.weekDate.getTime());
        trackingObj.weekDate = new Date(itmsListManager.updateDate(oldDate, 
            config.weekDuration, "+"));
        
        /**If the week number is > 0 show the backward button*/
        if (trackingObj.weekNumber > 0) {
            trackingObj.backwardButton.style.display = "";
        }

        /**If the weekly list already exists */
        if (trackingObj.weekNumber <= trackingObj.maxWeekReached) {
            /**Creation of a copy of the list and generation of the filtered list*/
            var filteredItems = [];
            filteredItems = itmsListManager.createCopyList(weeksList[trackingObj.weekNumber], 
                itmManager);
            filteredItems = itmsListManager.checkItems(filteredItems);
            expiryTableManager.printWeekTables(weeksList[trackingObj.weekNumber], filteredItems, 
                config, trackingObj, itmsListManager);

            /**Adding the remove event to the table rows */
            expiryTableManager.addRemoveEvent(weeksList[trackingObj.weekNumber]);
        } else {
        /** If the weekly list doesn't exists is generated*/

            /**creation of the new weekly list starting from the previous weekly list, generated
             * the previous filtered list, adding new elements and updating
             */
            var items = [];
            items = itmsListManager.createCopyList(weeksList[trackingObj.weekNumber - 1], 
                    itmManager);
            items = itmsListManager.checkItems(items);
            items = itmsListManager.updateChecks(items);
            items = itmsListManager.addItems(items, config.numProdPerWeek,
                trackingObj.lastId, trackingObj.weekDate, trackingObj.endDate, itmManager);
            trackingObj.lastId = items[items.length - 1].id;
            items = itmsListManager.updateState(items, config.maxNumChecks, trackingObj.weekDate);

            /**The weekly list */
            var itemsCopy = itmsListManager.createCopyList(items, itmManager);

            /**The filtered Weekly list */
            items = itmsListManager.checkItems(items);

            /**Adding of the weekly list to the weeks list*/
            weeksList.push(itemsCopy);

            /**Output of the two tables */
            expiryTableManager.printWeekTables(itemsCopy, items, config, trackingObj, 
                weeksList, itmsListManager);
            
            /**Updating the maximum number of week number reached */
            trackingObj.maxWeekReached++;
        }
        
        /**If the week number is equal to the limit of the date offset, the forward button is 
         * hidden
         */
        if (trackingObj.weekNumber == config.dateOffset - 1) {
            trackingObj.forwardButton.style.display = "none";
        }
    }, false);
}

/**
 * Function that adds the event on the backward button
 * @param {object} itmManager - the itemManager object that contains the methods for the creation
 * of new items
 * @param {object} itmsListManager  - the items list manager that contains the methods that 
 * works on an items array
 * @param {object} config - the configuration object with all the settings
 * @param {object} expiryTableManager - the expiry table mager that contains the methods for the 
 * output tables and for the events on the rows
 * @param {object} trackingObj - the tracking object that contains some needed propertyes
 * @param {Array[]} weeksList - the array that contains the items arrays which contains the weekly 
 * products
 */
function goBackwardButton (itmManager, itmsListManager, config, expiryTableManager,
    trackingObj, weeksList) {

    /**Adding to the button the event. The function takes the correct week number and outputs
     * the weekly list and generate the filtered weekly list and the weekly date
     */
    trackingObj.backwardButton.addEventListener("click", function() {
        trackingObj.weekNumber--;

        /**Generation of the weekly date */
        oldDate  = new Date(trackingObj.weekDate.getTime());
        trackingObj.weekDate = new Date(itmsListManager.updateDate(oldDate, config.weekDuration, 
            "-"));
        /**Generation of the filtered items */
        var filteredItems = itmsListManager.createCopyList(weeksList[trackingObj.weekNumber], itmManager);
        filteredItems = itmsListManager.checkItems(filteredItems);
        /**Display or not of the forward and bacward buttons */
        if (trackingObj.weekNumber == 0) {
            trackingObj.backwardButton.style.display = "none";
        }
        if (trackingObj.weekNumber == config.dateOffset - 2) {
            trackingObj.forwardButton.style.display = "";
        }
        /**Output of the two tables */
        expiryTableManager.printWeekTables( weeksList[trackingObj.weekNumber], filteredItems,
             config, trackingObj, weeksList, itmsListManager);
    });
}

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


