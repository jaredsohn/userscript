// ==UserScript==
// @name        openRaidComposition
// @namespace   openRaidRaidProfiling
// @description Allows raid leaders to view raid composition buffs.
// @include     http://www.openraid.eu/index.php/users/raid/*    
// @version     1
// ==/UserScript==

// Maybe I should actually implement checking if the user is leader... can't do any harm not to though....
var isLeader = false;                                  
var formNodes = document.getElementsByTagName('form');
var signupForm;
var approvedTable;                               

// Array of specs, spec names, and the IDs of the specs on MMO-Champ
var classSpecMapping = {
            'Deathknight': {
                    'Blood': {'specId' : '1', 'roleName': 'Tank'},
                    'Frost': {'specId' : '2', 'roleName': 'Damage'},
                    'Unholy': {'specId' : '3', 'roleName': 'Damage'},
                    'dpsSpecs': 2,
                    'healingSpecs': 0
                    },
            'Druid': {
                    'Balance': {'specId' : '4', 'roleName': 'Damage'},
                    'Feral Combat': {'specId' : '5', 'roleName': 'Damage'},
                    'Restoration': {'specId' : '6', 'roleName': 'Healer'},
                    'Feral Tank': {'specId' : 'v', 'roleName': 'Tank'},
                    'dpsSpecs': 2,
                    'healingSpecs': 1
                    },
            'Hunter': {
                    'Beast Mastery': {'specId' : '7', 'roleName': 'Damage'},
                    'Marksmanship': {'specId' : '8', 'roleName': 'Damage'},
                    'Survival': {'specId' : '9', 'roleName': 'Damage'},
                    'dpsSpecs': 3,
                    'healingSpecs': 0
                    },
            'Mage': {
                    'Arcane': {'specId' : 'a', 'roleName': 'Damage'},
                    'Fire': {'specId' : 'b', 'roleName': 'Damage'},
                    'Frost': {'specId' : 'c', 'roleName': 'Damage'},
                    'dpsSpecs': 3,
                    'healingSpecs': 0
                    },
            'Paladin': {
                    'Holy': {'specId' : 'd', 'roleName': 'Healer'},
                    'Protection': {'specId' : 'e', 'roleName': 'Tank'},
                    'Retribution': {'specId' : 'f', 'roleName': 'Damage'},
                    'dpsSpecs': 1,
                    'healingSpecs': 1
                    },
            'Priest': {
                    'Discipline': {'specId' : 'g', 'roleName': 'Healer'},
                    'Holy': {'specId' : 'h', 'roleName': 'Healer'},
                    'Shadow': {'specId' : 'i', 'roleName': 'Damage'},
                    'dpsSpecs': 1,
                    'healingSpecs': 2
                    },
            'Rogue': {
                    'Assassination': {'specId' : 'j', 'roleName': 'Damage'},
                    'Combat': {'specId' : 'k', 'roleName': 'Damage'},
                    'Subtlety': {'specId' : 'l', 'roleName': 'Damage'},
                    'dpsSpecs': 3,
                    'healingSpecs': 0
                    },
            'Shaman': {
                    'Elemental': {'specId' : 'm', 'roleName': 'Damage'},
                    'Enhancement': {'specId' : 'n', 'roleName': 'Damage'},
                    'Resrotation': {'specId' : 'o', 'roleName': 'Healer'},
                    'dpsSpecs': 2,
                    'healingSpecs': 1
                    },
            'Warlock': {
                    'Affliction': {'specId' : 'p', 'roleName': 'Damage'},
                    'Demonology': {'specId' : 'q', 'roleName': 'Damage'},
                    'Desctuction': {'specId' : 'r', 'roleName': 'Damage'},
                    'dpsSpecs': 3,
                    'healingSpecs': 0
                    },
            'Warrior': {
                    'Arms': {'specId' : 's', 'roleName': 'Damage'},
                    'Fury': {'specId' : 't', 'roleName': 'Damage'},
                    'Protection': {'specId' : 'u', 'roleName': 'Tank'},
                    'dpsSpecs': 2,
                    'healingSpecs': 0
                    },
            };

// Get all the forms on the page, and then loop through them
// since someone decided not to give them names/ids :D
for(var i = 0; i < formNodes.length; i++) {
    if(formNodes[i].action == "http://www.openraid.eu/index.php/users/raidapprove") {
        // Found the approval form
        signupForm = formNodes[i];
    } else {                      
    }                              
}

// Make sure we have a form to prevent spam of JS console
if(signupForm !== undefined) {
    // Get the first child table in the form
    approvedTable = signupForm.getElementsByTagName('table')[0];
    
    // Create a new element for the first row to say spec
    var newHead = document.createElement('th');
    var headText = document.createTextNode('Spec');
    newHead.appendChild(headText);
    newHead.setAttribute('align', "center");
    approvedTable.rows[0].appendChild(newHead);
    
    // Loop through the rows...
    for(var i = 1; i < approvedTable.rows.length; i++) {
        // Get the role approved for
        var unformattedRoleName = approvedTable.rows[i].cells[1].children[1].className.split('_')[1];
        var roleName = unformattedRoleName[0].toUpperCase() + unformattedRoleName.slice(1);
        // Butcher for row for the class name in a readable, capitalised, form           
        var unformattedClassName = approvedTable.rows[i].cells[1].children[0].className.split('_')[1];
        var className = unformattedClassName[0].toUpperCase() + unformattedClassName.slice(1);
        
        // Create a new TD element and select element for the row
        var classSelectorTd = document.createElement('td');
        classSelectorTd.setAttribute('style', "width: 120px");
        var classSelectorComboBox = document.createElement('select');
        classSelectorComboBox.setAttribute('style', "width: 110px;");
        
        // Give all the selects the same name so they are in an array
        classSelectorComboBox.setAttribute('name', "playerClass");
        
        // For all the specs for this class
        for (var key in classSpecMapping[className]) {
            // If this item is the count of DPS/Healing specs, ignore it.
            if(key == 'dpsSpecs' || key == 'healingSpecs') continue;
            
            // Key = Spec name
            // Value = Spec code 
            // Get the spec details and add a row to the select
            var value = classSpecMapping[className][key]['specId'];            
            var thisItem = document.createElement('option');
            var displayText = document.createTextNode(key);
            thisItem.setAttribute('value', value);
            if(roleName == classSpecMapping[className][key]['roleName']) {
                thisItem.setAttribute('selected', 'selected');
                
                // Check if this player is signed as DPS/healer, and if they are if their class has more than 1 DPS/Healing spec
                // Mark the field as red if both are true to indicate not accurate guess of spec, otherwise blue.
                if(classSpecMapping[className]['dpsSpecs'] > 1 && roleName == 'Damage') {
                    //alert('Not accurate');
                    classSelectorComboBox.setAttribute('style', classSelectorComboBox.getAttribute('style') + 'background-color: red;');
                } else if(classSpecMapping[className]['healingSpecs'] > 1 && roleName == 'Healer') {
                    classSelectorComboBox.setAttribute('style', classSelectorComboBox.getAttribute('style') + 'background-color: red;');
                } else {
                    classSelectorComboBox.setAttribute('style', classSelectorComboBox.getAttribute('style') + 'background-color: aqua;');
                }
            }
            thisItem.appendChild(displayText);
            classSelectorComboBox.appendChild(thisItem);                                           
        }
        // Add the select to the TD element
        classSelectorTd.appendChild(classSelectorComboBox);
        
        // Add the TD to the table
        approvedTable.rows[i].appendChild(classSelectorTd);
    }
    // Create a new row with lots of empty TDs
    var newRow = document.createElement('tr');
    for(var i = 0; i < 6; i++) {
        var newTD = document.createElement('td');
        newRow.appendChild(newTD);
    }
    // And 2 more TD elements to hold the colour description and button
    var newTD = document.createElement('td');
    var colourDescription = document.createTextNode('-Blue: Spec should be correct.  -Red: Double check, maybe wrong');
    newTD.appendChild(colourDescription);
    newRow.appendChild(newTD);
    var newTD = document.createElement('td');
    var submitButton = document.createElement('button');
    var buttonText = document.createTextNode('Raid Profile');
    submitButton.appendChild(buttonText);
    
    // Create the query srting for MMO-Champ
    submitButton.onclick = function() {
        var classes = '';
        // Loop through the array of selects and get the spec ids
        for(var i = 0; i < approvedTable.rows.length - 2; i++) {
            classes += document.getElementsByName('playerClass')[i].value;
        }
        while(classes.length < 40) {
            // Pad the string with 0s if it is too short
            classes = classes + '0';
        }
        // Open the raid profiler in a new window
        window.open("http://raidcomp.mmo-champion.com/?c=" + classes);
        return false;
    };
    // Append the button/row to the form
    newTD.appendChild(submitButton);
    newRow.appendChild(newTD);
    approvedTable.appendChild(newRow);
}            
