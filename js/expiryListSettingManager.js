/**
 * @file: expiryListSettingManager.js
 * @author: Group01
 * @version: 1.0
 * Settings  
 *
 * File that has the expiryListSettingManager
 * 
 * This function verify if the form compilation is valid.
 * The form is valid if:
 * The user input is numeric. 
 * The date is in the correct format.
 * All number must be positive.
 * Refuse negative numbers, character or space.
 * The accepted format for the date is: 
 * 01-01-2001 or 01/01/2001, month-day-year.
 * All form must be compiled.
 * The form display a simbols when the,
 * input are correct or not.
 */ 

 /**
  * Function that creates the expiry list setting manager that validates all
  * the inputs
  * @returns {object} the setting manager object
  */
function createExpiryListSettingManager() {



    /**
     * @namespace settingManager
     * @property {object} retriveFromDom Retrive element from the DOM html page.
     * @property {object} retriveFromDom.weeks  form input element
     * @property {object} retriveFromDom.weeklyProducts form input element
     * @property {object} retriveFromDom.weekDuration form input element
     * @property {object} retriveFromDom.check form input element
     * @property {object} retriveFromDom.startDate form input element
     * @property {object} retriveFromDom.dateOffset form input element
     * @property {object} retriveFromDom.responseWeek form paragraph element
     * @property {object} retriveFromDom.responseWeeklyProducts form paragraph element
     * @property {object} retriveFromDom.responseWeekDuration form paragraph element
     * @property {object} retriveFromDom.responseCheck form paragraph element
     * @property {object} retriveFromDom.responseStartDate form paragraph element
     * @property {object} retriveFromDom.responseDateOffset form paragraph element
     * @property {object} retriveFromDom.responseDaysToAddStartDate form paragraph element
     * @property {object} retriveFromDom.responseFormatDate form paragraph element
     * @property {object} retriveFromDom.saveSettings form button element
     * @property {boolean[]} listOfValue Array of boolean value retrived from the validate methods
     */
    var settingManager = {
        retriveFromDom: {
            weeks: document.getElementById("weeks"),
            weeklyProducts: document.getElementById("weeklyProducts"),
            weekDuration: document.getElementById("weekDuration"),
            check: document.getElementById("check"),
            startDate: document.getElementById("startDate"),
            dateOffset: document.getElementById("dateOffset"),
            daysToAddStartDate: document.getElementById("daysToAddStartDate"),
            formatDate: document.getElementById("formatDate"),
            responseWeek: document.getElementById("responseWeek"),
            responseWeeklyProducts: document.getElementById("responseWeeklyProducts"),
            responseWeekDuration: document.getElementById("responseWeekDuration"),
            responseCheck: document.getElementById("responseCheck"),
            responseStartDate: document.getElementById("responseStartDate"),
            responseDateOffset: document.getElementById("responseDateOffset"),
            responseDaysToAddStartDate: document.getElementById("responseDaysToAddStartDate"),
            responseFormatDate: document.getElementById("responseFormatDate"),
            saveSettings: document.getElementById("saveSettings"),
        },
        listOfValue: [
            valueOfWeeks = false,
            valueOfWeeklyProducts = false,
            valueOfDuration = false,
            valueOfCheck = false,
            valueOfStartDate = false,
            valueOfDateOffset = false,
            alueOfDaysToAddStartDate = false,
            valueOfFormatDate = false,
        ],
        /**
         * Method that shows and hide the settings panel
         * @memberof settingManager
         * @method showSettings
         * @param {string} - the id of the html event
         * @param {object} - the html element to add the show event
         */
        showSettings: function(name, button) {
            document.getElementById(name).hidden = true;

            document.getElementById(button).addEventListener("click", function() {
                if (document.getElementById(name).style.display == "block"){
                    document.getElementById(name).style.display = "none";
                } else {
                    document.getElementById(name).style.display = "block"
                }
            });
        },
        /**
        * Retrive the value in input from html form and puts its in the config object.
        * @memberof settingManager
        * @method setConfig
        * @param {object} config - the config object
        */
        setConfig: function(config){
            config.maxNumChecks = +document.getElementById("check").value;
            config.weekDuration = +document.getElementById("weekDuration").value;
            config.numOfWeeks = +document.getElementById("weeks").value;
            config.startDate = new Date(document.getElementById("startDate").value);
            config.dateOffset = +document.getElementById("dateOffset").value; 
            config.numProdPerWeek = +document.getElementById("weeklyProducts").value; 
            config.daysToAddStartDate = +document.getElementById("daysToAddStartDate").value;
            config.formatDate.format = document.getElementById("formatDate").value;
        },
        /**
        * Puts the default configuration setting in the input form
        * @memberof settingManager
        * @method setDefaultConfig
        * @param {object} config - the config object
        */
        setDefaultConfig: function(config) {
            document.getElementById("check").value = config.maxNumChecks;
            document.getElementById("weekDuration").value = config.weekDuration;
            document.getElementById("weeks").value = config.numOfWeeks;
            document.getElementById("startDate").value = config.daysToAddStartDate;
            document.getElementById("dateOffset").value = config.dateOffset; 
            document.getElementById("weeklyProducts").value = config.numProdPerWeek;
            document.getElementById("daysToAddStartDate").value = config.daysToAddStartDate; 
            document.getElementById("formatDate").value = config.formatDate.format;
        },
        /**
        * Enable or disable the button "saveSettings".
        * Verify if all element of the array "listOfValue[]" are "true".
        * If all element are "true" enable the button "saveSettings".
        * if just one element are "false" disable the button "saveSettings".
        * @memberof settingManager
        * @method activateButton
        */
        activateButton: function() {
            var test = 0;
            for (var index = 0; index < settingManager.listOfValue.length; index ++) {
                if (settingManager.listOfValue[index] == true) {
                    test ++;
                }
            }

            if (test == 8) {
                saveSettings.disabled = false;
            } else {
                saveSettings.disabled = true;  
            }
        },
        /**
        * Retrive and validate the user input in the form element "weeks".
        * The input is valid if the value is a positive number.
        * Not accept simbols, negative number, character or space.
        * If the value is correct display in form a white simbols to confirm, 
        * move the focus in the next field and return true.
        * If the value is not correct display in form a red simbols 
        * and return false.
        * @memberof settingManager
        * @method validateWeeks
        * @returns {boolean}
        */
        validateWeeks: function() {
            var week = document.getElementById("weeks").value;
        
            if (week == " " || week == "" || isNaN(week) || week <= 0) {
                responseWeek.style.color  = "red";
                responseWeek.textContent = "\u2716";
        
                return false;
            }
            else {
                responseWeek.style.color  = "white";
                responseWeek.textContent = "\u2714";
                weeklyProducts.focus();
        
                return true;
            } 
        },
        /**
        * Retrive and validate the user input in the form element "weeklyProducts".
        * The input is valid if the value is a positive number.
        * Not accept simbols, negative number, character or space.
        * If the value is correct display in form a white simbols to confirm, 
        * move the focus in the next field and return true.
        * If the value is not correct display in form a red simbols 
        * and return false.
        * @memberof settingManager
        * @method validateWeeklyProducts
        * @returns {boolean}
        */
        validateWeeklyProducts: function() {
            var weeklyProducts = document.getElementById("weeklyProducts").value;
        
            if (weeklyProducts == " " || weeklyProducts == "" || isNaN(weeklyProducts) || 
                weeklyProducts <= 0) {
                responseWeeklyProducts.style.color = "red";
                responseWeeklyProducts.textContent = "\u2716";
                
                return false;
            }
            else {
                responseWeeklyProducts.style.color = "white";
                responseWeeklyProducts.textContent = "\u2714";
                weekDuration.focus();
                
                return true;
            } 
        },
        /**
        * Retrive and validate the user input in the form element "weekDuration".
        * The input is valid if the value is a positive number.
        * Not accept simbols, negative number, character or space.
        * If the value is correct display in form a white simbols to confirm, 
        * move the focus in the next field and return true.
        * If the value is not correct display in form a red simbols 
        * and return false.
        * @memberof settingManager
        * @method validateWeekDuration
        * @returns {boolean}
        */
        validateWeekDuration: function() {
            var weekDuration = document.getElementById("weekDuration").value;
        
            if (weekDuration == " " || weekDuration == "" || isNaN(weekDuration) || 
                weekDuration <= 0) {
                responseWeekDuration.style.color = "red";
                responseWeekDuration.textContent = "\u2716";

                return false;
            }
            else {
                responseWeekDuration.style.color = "white";
                responseWeekDuration.textContent = "\u2714";
                check.focus();

                return true;
            } 
        },     
        /**
        * Retrive and validate the user input in the form element "check".
        * The input is valid if the value is a positive number.
        * Not accept simbols, negative number, character or space.
        * If the value is correct display in form a white simbols to confirm, 
        * move the focus in the next field and return true.
        * If the value is not correct display in form a red simbols 
        * and return false.
        * @memberof settingManager
        * @method validateCheck
        * @returns {boolean}
        */
        validateCheck: function() {
            var check = document.getElementById("check").value;
        
            if (check == " " || check == "" || isNaN(check) || check <= 0) {
                responseCheck.style.color  = "red";
                responseCheck.textContent = "\u2716";
                
                return false;
            }
            else {
                responseCheck.style.color  = "white";
                responseCheck.textContent = "\u2714";
                startDate.focus();
                
                return true;
            }
        },
        /**
        * Retrive and validate the user input in the form element "startDate".
        * The input is valid if the value is a positive number.
        * Not accept simbols, negative number, character or space.
        * The accepted format for the date is 01-01-2001 or 01/01/2001, day-month-year.
        * If the value is correct display in form a white simbols to confirm, 
        * move the focus in the next field and return true.
        * If the value is not correct display in form a red simbols 
        * and return false.
        * @memberof settingManager
        * @method validateStartDate
        * @returns {boolean}
        */
        validateStartDate: function() {
            var startDate = document.getElementById("startDate").value;
            var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

            if (startDate == "" || startDate == " ") {
                responseStartDate.style.color  = "red";
                responseStartDate.textContent = "\u2716";
                
                return false;
            } else {
                if (startDate.match(dateformat)) {
                    var dateOne = startDate.split('/');
                    var dateTwo = startDate.split('-');
                
                    dateOneLength = dateOne.length;
                    dateTwoLength = dateTwo.length;
        
                    if (dateOneLength > 1) {
                        var arrayDate = startDate.split('/');
                    } else if (dateTwoLength > 1) {
                        var arrayDate = startDate.split('-');
                    }
                
                    var days = parseInt(arrayDate[0]);
                    var month = parseInt(arrayDate[1]);
                    var year = parseInt(arrayDate[2]);
                    var listOfDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        
                    if (month == 1 || month > 2) {
                        if (days > listOfDay[month - 1]) {
                            responseStartDate.style.color  = "red";
                            responseStartDate.textContent = "\u2716";

                            return false;
                        }
                    }
                
                    if (month == 2) {
                        var yy = false;
                        if ((!(year % 4) && year % 100) || !(year % 400)) {
                            yy = true;
                        }
                        if ((yy == false) && (days >= 29)) {
                            responseStartDate.style.color  = "red";
                            responseStartDate.textContent = "\u2716";

                            return false;
                        }
                        if ((yy == true) && (days > 29)) {
                            responseStartDate.style.color  = "red";
                            responseStartDate.textContent = "\u2716";

                            return false;
                        }
                    }
                } else {
                    responseStartDate.style.color  = "red";
                    responseStartDate.textContent = "\u2716";

                    return false;
                }
                responseStartDate.style.color  = "white";
                responseStartDate.textContent = "\u2714";
                dateOffset.focus();

                return true;
            }
        },
        /**
         * Validate the format date input
         * @memberof settingManager
         * @method validateFormatDate
         * @returns {boolean}
         */
        validateFormatDate: function() {

            var formatDateInput = document.getElementById("formatDate").value;

            if(formatDateInput == "none"){
                responseFormatDate.style.color = "red";
                document.getElementById("saveSettings").disabled = true;
                document.getElementById("responseFormatDate").textContent = "\u2716";
                return false;
            } else {
                responseFormatDate.style.color = "red";
                document.getElementById("responseFormatDate").textContent = "\u2714";
                document.getElementById("saveSettings").focus();
                return true;
            }
        },

        /**
        * Retrive and validate the user input in the form element "dateOffset".
        * The input is valid if the value is a positive number.
        * Not accept simbols, negative number, character or space.
        * If the value is correct display in form a white simbols to confirm, 
        * move the focus in the next field and return true.
        * If the value is not correct display in form a red simbols 
        * and return false.
        * @memberof settingManager
        * @method validateDateOffset
        * @returns {boolean}
        */
        validateDateOffset: function() {
            var dateOffset = document.getElementById("dateOffset").value;
        
            if (dateOffset == " " || dateOffset == "" || isNaN(dateOffset) || dateOffset <= 0 || 
                dateOffset > (+ settingManager.retriveFromDom.weeks.value)) {
                responseDateOffset.style.color  = "red";
                responseDateOffset.textContent = "\u2716";
                
                return false;
            }
            else {
                responseDateOffset.style.color  = "white";
                responseDateOffset.textContent = "\u2714";
                
                return true;
            }
        },
        /**
         * Validate the days to add start date input
         * @memberof settingManager
         * @method validateDaysToAddStartDate
         * @returns {boolean}
         */
        validateDaysToAddStartDate: function() {
            var daysToAddStartDate = document.getElementById("daysToAddStartDate").value;
        
            if (daysToAddStartDate == " " || daysToAddStartDate == "" || isNaN(daysToAddStartDate) 
                || daysToAddStartDate < 0){
                responseDaysToAddStartDate.style.color  = "red";
                document.getElementById("responseDaysToAddStartDate").textContent = "\u2716";
                document.getElementById("saveSettings").disabled = true;
                
                return false;
            } else {
                responseDaysToAddStartDate.style.color  = "white";
                document.getElementById("responseDaysToAddStartDate").textContent = "\u2714";
                document.getElementById("saveSettings").focus();
                
                return true;
            }
        },

        /**
        * Contain all event listener for the form element,
        * and call the relative function. 
        * @memberof settingManager
        * @method validateAll
        */
        validateAll: function() {
            settingManager.retriveFromDom.weeks.addEventListener("change", function() {
                settingManager.listOfValue[0] = settingManager.validateWeeks();
                settingManager.activateButton();
            });
            
            settingManager.retriveFromDom.weeklyProducts.addEventListener("change", function() {
                settingManager.listOfValue[1] = settingManager.validateWeeklyProducts();
                settingManager.activateButton();
            });
            
            settingManager.retriveFromDom.weekDuration.addEventListener("change", function() {
                settingManager.listOfValue[2] = settingManager.validateWeekDuration();
                settingManager.activateButton();
            });
            
            settingManager.retriveFromDom.check.addEventListener("change", function() {
                settingManager.listOfValue[3] = settingManager.validateCheck();
                settingManager.activateButton();
            });
            
            settingManager.retriveFromDom.startDate.addEventListener("change", function() {
                settingManager.listOfValue[4] = settingManager.validateStartDate();
                settingManager.activateButton();
            });
            
            settingManager.retriveFromDom.dateOffset.addEventListener("change", function() {
                settingManager.listOfValue[5] = settingManager.validateDateOffset();
                settingManager.activateButton();
            });
            settingManager.retriveFromDom.daysToAddStartDate.addEventListener("change", function() {
                settingManager.listOfValue[6] = settingManager.validateDaysToAddStartDate();
                settingManager.activateButton();
            });
            settingManager.retriveFromDom.formatDate.addEventListener("change", function() {
                settingManager.listOfValue[7] = settingManager.validateFormatDate();
                settingManager.activateButton();
            });
        }
    }

    return settingManager;
}