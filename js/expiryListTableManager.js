/**
 * @file: expiryListTable.js
 * @author: Group01
 * @version: 1.0
 * List output 
 *
 * File that has the createExpiryListTableManager funtion that creates the table manager object
 * that manage the output of the tables
 */ 

 /**
  * Function that creates the table manager object
  * @returns {object} the table manager object
  */
function createExpiryListTableManager() {

    /**
     * object that has methods that outputs the week table
     * @namespace tableManager
     * @property {string[]} header - the array that contains the headers
     * of the table
     */
    var tableManager = {
        header: ["ID", "Name", "Expiry Date", "Status", "Checks"],
        /**
         * Method that crates the table structure
         * @memberof tableManager
         * @method createTableStructure 
         * @param {string[]} headers - the headers of the table
         * @param {string} className - the class name to put to the table created
         * @param {string} containerId - the container where to put the table created
         */
        createTableStructure: function(headers, className, containerId) {
            var container = document.getElementById(containerId);
            var newTable = document.createElement("table");
            newTable.className = className + "_table";
            var newTableHead = document.createElement("thead");
            newTableHead.className = className + "_head";
            var newTableBody = document.createElement("tbody");
            newTableBody.className = className + "_body";
            var newTableRow = document.createElement("tr");
            newTableRow.className = "head_row";
            for (var i = 0; i < headers.length ; i++) {
                var newTh = document.createElement("th");
                newTh.textContent = headers[i];
                newTableRow.appendChild(newTh);
            }
            newTableHead.appendChild(newTableRow);
            newTable.appendChild(newTableHead);
            newTable.appendChild(newTableBody);
            container.appendChild(newTable);
        },
        /**
         * Method that modifies a table cancelling the old tbody and putting the new tbody with the
         * current weekly list of items
         * @memberof tableManager
         * @method printListTable 
         * @param {object[]} list - the list of items to output
         * @param {string} listConsolePrint - the listConsolePrint with th pad methods for the date
         * @param {object} dateFormat - the date format object 
         * @param {string} className - the class name to put to the table created
         * @param {boolean} filtered - true if the function outputs the filtered table, false if the 
         * unfiltered tableS 
         */
        printListTable: function(list, listConsolePrint, dateFormat, className, filtered) {
            var table = document.querySelector("table." + className + "_table");
           
            var tableBody = document.querySelector("." + className + "_body");
            table.removeChild(tableBody);
            var newTableBody = document.createElement("tbody");
            newTableBody.className = className + "_body";
            
            for (var i = 0; i < list.length; i++) {

                var newTr = document.createElement("tr");  
                if (i % 2 == 0) {
                    newTr.style.background = "#f3f3f3";
                }

                newTr.insertCell(0).textContent = list[i].id;
                newTr.insertCell(1).textContent = list[i].name;
                newTr.insertCell(2).textContent = listConsolePrint.padDate
                (listConsolePrint.formatDate(list[i].expDate, dateFormat), dateFormat);
                newTr.insertCell(3).textContent = list[i].state;

                newTr.cells[3].style.fontWeight = "bold";
                if (list[i].state == "New") {
                    newTr.cells[3].style.color = "#00ff0c";  // green
                } else if (list[i].state == "Valid") {
                    newTr.cells[3].style.color =  "#1da3aa"; // blue
                } else if (list[i].state == "Old") {
                    newTr.cells[3].style.color =  "#c9700a"; // yellow
                } else {
                    newTr.cells[3].style.color = "#bd081c"; // red
                }
                newTr.insertCell(4).textContent = list[i].numChecks;

                newTr.id = "item_" + list[i].id;
                /**Unshow the removed items in the filtered table*/
                if(filtered && list[i].state == "REMOVED") {
                    newTr.style.display = "none";
                }
                newTableBody.appendChild(newTr);     
            }
            table.appendChild(newTableBody);
        },
        /**
         * Returns the zero padded ID
         * @memberof tableManager
         * @method paddedId
         * @param {number} id - the item's id
         * @param {number} numZeroPad - number of zeros
         * @return {string} the zero padded ID
         */
        paddedId: function(id, numZeroPad) {
            var zero = "0";
            var sumZero = "0";
            var idToString; 
            var stringId;
            idToString = "" + id;
            for(var i = 0; i < numZeroPad; i++){
                sumZero += zero;
            } 

            stringId = sumZero.slice(0, [sumZero.length - idToString.length]) + id;
            return stringId;
        },
        /**
         * Returns the input string with a left and right padding character 
         * @memberof tableManager
         * @method padString
         * @param {string} str - the string to padd
         * @param {string} paddingChar - the padding character   
         * @param {number} maxDim - the max dimension of the return string
         * @returns {string} the string with the padding character
         */
        padString: function(str, paddingChar, maxDim) {
            var equalAsterisk;
            var padString;
            var replaceStr = str.replace(" ", paddingChar);

            for(var i = 0; i < maxDim; i++){
                paddingChar = paddingChar + paddingChar;
            } 

            equalAsterisk = Math.round([maxDim - str.length] / 2);
            
            padString = paddingChar.slice(0,equalAsterisk) + replaceStr + 
                        paddingChar.slice(equalAsterisk + replaceStr.length, maxDim);

            return padString;
        }, 
        /**
         * Returns the day of the date formatted in this forms: "short", "capitalize",
         * "normal", "numb"
         * @memberof tableManager
         * @method formatDay 
         * @param {object} date - the date to format
         * @param {sting} format - the day format
         * @returns {string} the day formatted or a wrong message
         */
        formatDay: function(date, format) {
            var days;

            if (format === "short") {
                days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
            } else if (format === "capitalize") {
                days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY",
                        "FRIDAY", "SATURDAY"];
            } else if (format === "normal") {
                days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
                        "Friday", "Saturday"];
            } else if (format === "numb") {
                return days = tableManager.paddedId(date.getDate(), 1);
            } else {
                return "Wrong day format passed!";
            }
            
            days = days[date.getDay()] + "-" + tableManager.paddedId(date.getDate(), 1);
            return days;
        },
        /**
         * Returns the month of the date formatted in this forms: "short", "capitalize",
         * "normal", "numb"
         * @memberof tableManager
         * @method formatMonth 
         * @param {object} date  - the date to format
         * @param {string} format - the month format
         * @returns {string} the month formatted or a wrong message 
         */
        formatMonth: function(date, format) {
            var months;

            if (format === "short") {
                months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", 
                        "SEP", "OCT", "NOV", "DEC"];
            } else if (format === "capitalize") {
                months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", 
                        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
            } else if (format === "normal") {
                months = ["January", "February", "March", "April", "May", "June", "July",
                        "August", "September", "October", "November", "December"];
            } else if (format === "numb") {
                months = ["01", "02", "03","04", "05", "06", "07", "08", "09", "10", "11", "12"];
            } else {
                return "Wrong month format passed!";
            }

            return months[date.getMonth()];
        },
        /**
         * Returns the date formatted in this forms: "dayMonthYear", "monthDayYear", "yearMonthDay"
         * @memberof tableManager
         * @method formatDate 
         * @param {object} date - the date that has to beformatted
         * @param {object} dateFormat - the object date format that contains the formatting 
         * properties
         * @returns {string} the date formatted in the form choosed or a wrong message
         */
        formatDate: function(date, dateFormat) {
            var exitDate;
            var day = dateFormat.formatDay;
            var month = dateFormat.formatMonth;

            if (dateFormat.format === "dayMonthYear") {
                exitDate = tableManager.formatDay(date,day) + "-" + 
                tableManager.formatMonth(date,month) + "-" + date.getFullYear();
            } else if (dateFormat.format === "monthDayYear") {
                exitDate = tableManager.formatMonth(date,month) + "-" + 
                tableManager.formatDay(date,day) + "-" + date.getFullYear();
            } else if (dateFormat.format === "yearMonthDay") {
                exitDate = date.getFullYear() + "-" + tableManager.formatMonth(date,month) + 
                "-" + tableManager.formatDay(date,day)
            } else {
                return "Wrong date format passed!";
            }

            return exitDate;
        },
        /**
         * Returns a paddaded date based on the date length properties
         * @memberof tableManager
         * @method padDate
         * @param {string} dateFormatted - the date formatted with dateFormat properties
         * @param {object} dateFormat - the object format date that contains the formatting
         * properties
         * @returns {string} the formatted date padded properly
         */
        padDate: function(dateFormatted, dateFormat) {
            var paddedDate;
            if (dateFormat.formatDay == "numb" && dateFormat.formatMonth == "short") {
                paddedDate = tableManager.padString(dateFormatted, " ", 10);
            } else if (dateFormat.formatDay == "short" && dateFormat.formatMonth == "short") {
                paddedDate = tableManager.padString(dateFormatted, " ", 14);
            } else if (dateFormat.formatDay == "numb" && (dateFormat.formatMonth == "capitalize" || 
            dateFormat.formatMonth == "normal")) {
                paddedDate = tableManager.padString(dateFormatted, " ", 16);
            } else if ((dateFormat.formatDay == "capitalize" || dateFormat.formatDay == "normal")
                && (dateFormat.formatMonth == "short") || (dateFormat.formatMonth == "capitalize" || 
                dateFormat.formatMonth == "normal") && (dateFormat.formatDay == "short")) {
                paddedDate = tableManager.padString(dateFormatted, " ", 20);
            } else {
                paddedDate = tableManager.padString(dateFormatted, " ", 28);
            }

            return paddedDate;
        },
        /**
         * Method that outputs the week tables and the week date
         * @memberof tableManager
         * @method printWeekTables 
         * @param {object[]} items - the array of items to output
         * @param {object[]} filteredItems - the filtered array of items 
         * @param {object} config - the configration object needed for the format  date
         * @param {object} trackingObj -the tracking object needed for the week date
         * @param {Array[]} weeksList - the weeks list needed for the remove event
         * @param {object} itmsListManager - the items List Manager needed for the remove event
         */
        printWeekTables: function(items, filteredItems, config, trackingObj, weeksList, 
            itmsListManager) {
            var parag = document.createElement("p");
            parag.id = "current_date";
            parag.textContent = tableManager.padDate(tableManager.formatDate
                (trackingObj.weekDate, config.formatDate), config.formatDate);
            var dateDiv = document.querySelector("div.table_week");
            
            if (document.getElementById("current_date")) {
                dateDiv.removeChild(document.getElementById("current_date"));
                dateDiv.appendChild(parag);  
            } else {
                dateDiv.appendChild(parag);

            }
            tableManager.printListTable(items, tableManager, config.formatDate, 
                "week_list", false);
            tableManager.printListTable(filteredItems, tableManager, config.formatDate, 
                "week_filtered_list", true);

            tableManager.addRemoveEvent(items, filteredItems, config, trackingObj, 
                weeksList, itmsListManager);   
        },
        /**
         *Method that adds the remove item event on a row (Incomplete)
         * @memberof tableManager
         * @method removeItemEvent 
         * @param {object} element - the element to add the event on
         * @param {object[]} weeklyList - the weekly list
         * @param {number} i - the index of the object on that the state changes to 
         * removed
         * @param {object} config - the configuration object
         * @param {object} trackingObj - the tracking object
         * @param {Array[]} weeksList - the weeks list 
         * @param {object} itmsListManager -the items list manager
         * @param {object[]} filteredItems -the filtered items
         * @param {number} idFiltered - the id of the item inte filtered list that has to change 
         * in removed
         */
        removeItemEvent: function(element, weeklyList, i, config, trackingObj, weeksList,
            itmsListManager, filteredItems, idFiltered) {
            //console.log(weeksList);
            element.addEventListener("click", function(event) {;
                //console.log(event.detail);
               
               /* if (trackingObj.maxWeekReached  ) {

                }*/
                weeklyList[i].state = "REMOVED";
                for(i = 0; i < filteredItems.length; i++) {
                    if(filteredItems[i].id == idFiltered) {
                        filteredItems[i].state = "REMOVED";
                    }

                }
                //
                //console.log("FORMAT 3");
                //console.log(dateFormat);
                //console.log(date);
                tableManager.printWeekTables(weeklyList, filteredItems,
                    config, trackingObj, weeksList, itmsListManager);
                //console.log(config);
                //tableManager.addRemoveEvent(weeklyList, items, config, trackingObj);
            });
        },
        /**
         * Method that adds the remove item event to each row of the table(Incomplete)
         * @memberof tableManager
         * @method removeItemEvent 
         * @param {object[]} weeklyList - the weekly list
         * @param {object[]} filteredItems -the filtered items
         * @param {object} config - the configuration object
         * @param {object} trackingObj - the tracking object
         * @param {Array[]} weeksList - the weeks list 
         * @param {object} itmsListManager -the items list manager
         */
        addRemoveEvent: function(weeklyList, filteredItems, config, trackingObj, 
            weeksList, itmsListManager) {
            //console.log("FORMAT 2");
            //console.log(dateFormat);
            //console.log(date);
            //console.log(weeksList);
            for (i = 0; i < weeklyList.length; i++) {
                var tr = document.getElementById("item_" + weeklyList[i].id); 
                tableManager.removeItemEvent(tr, weeklyList, i, config, trackingObj, weeksList,
                     itmsListManager, filteredItems, weeklyList[i].id);    
            }
        }, 
    }

    return tableManager;
}