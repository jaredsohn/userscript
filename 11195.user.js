// ==UserScript==
// @name           Fairfax County Library Holding Selector
// @namespace      http://userscripts.org/scripts/show/11195
// @description    Automagically selects your preferred library branch.  NOTE: You **MUST** select the library branch by editting the script.
// @include        http://fcplcat.co.fairfax.va.us/*
// ==/UserScript==


/*

---- NOTES ----

The `branch` variable must be set to the library branch of your choice.
The default branch is 'Thomas Jefferson'.  Find the branch you're looking for
below.  Copy the left "keyword" and paste it into the branch variable.

ACCESS 		- Access Services
CENTREVLLE	- Centreville Regional
CHANTILLY	- Chantilly Regional
DOLLEY		- Dolley Madison
FAIRFAX		- Fairfax City Regional
GEORGE		- George Mason Regional
GREATFALLS	- Great Falls
HERNDON		- Herndon Fornightly
JOHN		- John Marshall
KINGSPARK	- Kings Park
KINGSTOWNE	- Kingstown
LORTON		- Lorton
MARTHA		- Martha Washington
PATRICK		- Patrick Henry
POHICK		- Pohick Regional
RESTON		- Reston Regional
RICHARD		- Richard Byrd
SHERWOOD	- Sherwood Regional
THOMAS		- Thomas Jefferson
TYSONS		- Tysons-Pimmit Regional
WOODROW		- Woodrow Wilson
ZTECHOPS	- ZTechnical Operations

*/

var branch = 'CHANTILLY';     // Paste your branch within the quotes here.

var select_name = document.getElementsByTagName('select');
var select_elements = undefined;

for (var i = 0; i < select_name.length; i++) {
    var select_value = select_name[i].getAttribute("name");
    
    if ((select_value != undefined) && (select_value.indexOf('pickup_library') >= 0)) {
        select_elements = document.getElementsByTagName('option');
    } else {
        select_elements = undefined;
    }
}

if (select_elements != undefined) {
    for (var i = 0; i < select_elements.length; i++) {
        var select_value = select_elements[i].getAttribute("value");

        if ((select_value != undefined) && (select_value.indexOf(branch) >= 0)) {
	    select_elements[i].selected = 1;
        }
    }
}
