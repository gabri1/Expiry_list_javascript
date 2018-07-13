/**
 * @file: expiryListItemManager.js
 * @author: Group01
 * @version: 1.0
 * Item Manager
 *
 * File that has the createItemManager function that creates the item manager object that manage
 * the items creation
 */ 


/**Function that creates and returns a createItemManager object
 * @returns {object} the createItemManager object
 */
 function createItemManager() {

    
    /**
     * object that creates and has methods for the creation of 
     * an item
     * @namespace itemManager
     */
    var itemManager = {
        /**
         * Function that creates and returns an item object, used for create a new item 
         * @memberof itemManager
         * @method createItem 
         * @param {number} id - the id to set to the item
         * @param {string} name - the name of the item
         * @param {object} expDate - the expiration date of the item
         * @param {string} state - the state of the item
         * @param {number} numChecks - the number of checks of the item
         * @returns {object} a new item
         */
        createItem: function(id, name, expDate, state, numChecks) {
            /**
            * @namespace item
            * @property {number} id the item id
            * @property {string} name the item name
            * @property {string} expDate the item expiration date
            * @property {string} state the item state
            * @property {string} numChecks the item number of checks
            */
            var item = {
                id: id,
                name: name,
                expDate: expDate,
                state: state,
                numChecks: numChecks
            };

            return item;
        },
        /**
         * Method that return a random integer number,
         * between the specified minimum and maximum values inclusive. 
         * @memberof itemManager
         * @method randomByManager 
         * @param {number} min - the minimum value 
         * @param {number} max - the maximum value
         * @returns {number} the number random generated
         */
        randomByManager: function(min, max) {
            var random = 0;
            random = Math.floor(Math.random() * (max - min + 1)) + min;

            return random;
        },
        /**
         * Returns a random name of pruducts among those on the array products
         * @memberof itemManager
         * @method randomName 
         * @returns {string} a random product name
         */
        randomName: function() {
            var products = ["Banana", "Cheese", "Green Beans", "Apple", "Rice", "Pasta",
            "Meat", "Nutella", "Dried Fruit", "Roast Beef"];
            var randomProduct = products[itemManager.randomByManager(0, products.length - 1)];
            
            return randomProduct;
        },
        /**
         * Returns a random date between two dates, inclusive the start date and
         * inclusive the end date
         * @memberof itemManager
         * @method expirationDate
         * @param {object} start - the start date
         * @param {object} end - the end day
         * @returns {object} a random date between the start date and the end date
         */
        expirationDate: function(start, end) {
            var dayMilliseconds = 24*60*60*1000;
            var min = start.getTime() ;
            //doing that we consider all the milliseconds of the end date
            var max = end.getTime() + (dayMilliseconds - 1); 
            var randomDate = new Date(itemManager.randomByManager(min, max));
            itemManager.setMidnight(randomDate);
            
            return randomDate;
        },
        /**
         * Function that takes a date and sets the midnight
         * @memberof itemManager
         * @method setMidnight
         * @param {object} date - the date to set to midnight
         */
        setMidnight: function(date) {
            date.setMilliseconds(0);
            date.setSeconds(0);
            date.setMinutes(0);
            date.setHours(0);
        }
    }     
    return itemManager;
 }