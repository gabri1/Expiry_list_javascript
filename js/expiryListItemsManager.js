/**
 * @file: expiryListItemsManager.js
 * @author: Group01
 * @version: 1.0
 * Items Manager
 *
 * File that has the createItemsListManager that creates the itemsListManager object that 
 * has methods that manage an items list
 */ 

 /**Function that creates and returns a createItemsListManager object
 * @returns {object} the createItemsListManager object
 */
 function createItemsListManager() {

    /**
     * object that has methods that modifies an items list
     * @namespace itemsListManager
     */
    var itemsListManager = {
        /**
         * Returns the array of items with a specified number 
         * of new added item
         * @memberof itemsListManager
         * @method addItems 
         * @param {object[]} items - the array of items
         * @param {number} numItems - the number of items to add
         * @param {number} lastId - the last id used, used to track and to generate unique id's
         * @param {object} startDate - the starting date for expiration date
         * @param {object} endDate - the ending date for the expiration date
         * @param {object} itManager - the itemManager Object that contains the randomName method
         * needed
         * @returns {object[]} the array of items with the new items added
         */
        addItems: function(items, numItems, lastId, startDate, endDate, itManager) {
            for (i = 0; i < numItems; i++) {
                lastId++;
                //creation of a new item
                var item = itManager.createItem(lastId, itManager.randomName(), 
                itManager.expirationDate(startDate, endDate),
                "New", 0 );
                items.push(item);
            }
            return items;
        },
        /**
         * Returns the array of items with the state updated only if the item isn't removed
         * @memberof itemsListManager
         * @method updateState 
         * @param {object[]} items - the array of items
         * @param {number} maxChecks - num of checks before a product became old
         * @param {object} actualDate - the actual week date
         * @returns {object[]} the array with the items' state updated
         */
        updateState: function(items, maxChecks, actualDate) {
            for(i = 0; i < items.length; i++) {
                if (items[i].state != "REMOVED") {
                    if(actualDate.getTime() >= items[i].expDate.getTime()) {
                        items[i].state = "Expired";
                    } else if (items[i].numChecks >= maxChecks) {
                        items[i].state = "Old";
                    } else if (items[i].numChecks >= 1 && items[i].numChecks < maxChecks) {
                        items[i].state = "Valid";
                    }
                }
            }
            return items;
        }, 
        /**
         * Returns the array of objects with the checks updated
         * @memberof itemsListManager
         * @method updateChecks
         * @param {object[]} items - the array of items
         * @returns {object[]} the array with the updated checks
         */
        updateChecks: function(items) {
            for(var index = 0; index < items.length; index++) {
                items[index].numChecks ++;
            }
            return items;
        }, 
        /**
         * Returns the array of items without the old and the 
         * expired items
         * @memberof itemsListManager
         * @method checkItems
         * @param {object[]} items - the array of items
         * @returns {object[]} the array filtered withoyt old and expired items
         */
        checkItems: function(items) {
            for(var index = 0; index < items.length; index++) {
                if(items[index].state == "Old" || items[index].state == "Expired") {
                    items.splice(index,1);
                    index--;            
                }
            }
            return items;
        }, 
        /**
         * Returns the date plus or minus K days passed by in
         * This function can handle both the Date format and the string format
         * @memberof itemsListManager
         * @method checkItems
         * @param {object|string} actualDate - the date to update
         * @param {number} dayToAdd - the number of days to add or to remove
         * to the date
         * @param {string} operator - the operator
         * @returns {object|string} the updated date
         */
        updateDate: function(actualDate, days, operator) {
            if (typeof actualDate == "object") {
                var updatedDate = new Date(actualDate.getTime());
                //console.log("dentro object:" + updatedDate);
                

                if (operator == "+") {
                    //console.log(updatedDate.getDate());
                    //console.log("days:" + days + typeof(days))
                    updatedDate.setDate(updatedDate.getDate() + days);
                    //console.log(updatedDate.getDate());
                }

                if (operator == "-") {
                    updatedDate.setDate(actualDate.getDate() - days);
                } 
                return updatedDate;
            } else if (typeof actualDate == "string") {
                var stringDate = actualDate.split(" ");
                var parsed = parseInt(stringDate[9]); 
                var num

                if (operator == "+") {
                    num = parsed + days;
                }

                if (operator == "-") {
                    num = parsed - days;
                }
                
                stringDate[9] = num.toString();
                updatedDate = stringDate;
                
                return updatedDate;
            } else {
                console.warn("Format error");
            }
        },
        /**
         * Function that takes an items array and makes a copy of that
         * @memberof itemsListManager
         * @method createCopyList
         * @param {object[]} list - the list of items to copy
         * @param {object} itManager - the itemManager object that contains the method to create 
         * a new item
         */
        createCopyList: function (list, itManager) {
            var newList = [];
            for(i = 0; i < list.length; i ++) {
                var item = itManager.createItem(list[i].id, list[i].name, list[i].expDate, 
                    list[i].state, list[i].numChecks);
                newList.push(item);
            }
            return newList;
        }
    }

    return itemsListManager;
 }