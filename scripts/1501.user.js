// MyLocations for Google Maps (Greasemonkey script)
// $Rev: 9 $ 
// $Date: 2005-08-02 03:56:21 -0700 (Tue, 02 Aug 2005) $
//
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
// See http://www.bitfodder.com/
//
// Changelog:
// 2005-07-12 - Initial version
// 2005-08-02 - updated for GM 0.5 beta (which disabled GM_xmlhttpRequest access to local filesystem)
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts, select this script,
// and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES
//
// 2 things:
// 1. redirects you by default to the "directions" form when accessing
//    Google maps (http://maps.google.com)
// 2. adds 2 drop-down menus to the form, pre-populated with your favorite 
//    locations.
//
// HOW TO SAVE/EDIT YOUR FAVORITE LOCATIONS?
//
// create an XML file  and upload it to a web server.
// It should have that structure:
//
// <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
// <addresses>
// <address name="HOME"> 3590 Alameda de las Pulgas, Menlo Park, CA</address>
// <address name="WORK"> 4131 El Camino Real, Palo Alto, CA</address>
// <address name="MOZILLA">1350 Villa Street, Mountain View, CA</address>
// </addresses>
//
// Then update the MY_PREFERENCES_URL constant at the top of this script.
// 
// NOTES
// 
// If Google changes the names of the inputs for start and end, we're toasted!
// All items added to the Google page will be prefixed with gm_ml_ 
// 
// CREDITS
//
// My Google Maps       [http://justinsomnia.org/]
// FOAF Discovery       [http://greg.vario.us/software/foaf-discovery.user.js]
// DiveIntoGreasemonkey [http://diveintogreasemonkey.org/patterns/add-css.html]

// ==UserScript==
// @name          MyLocations for Google Maps
// @namespace     http://www.bitfodder.com/greasemonkey
// @description	  Adds drop-down menus with you favorite locations to Google Maps.
// @include       http://maps.google.*/
// ==/UserScript==

(function() {

    // **** SET THIS TO THE PREFERENCES FILE CONTAINING YOUR ADDRESSES ****
    // **** cannot be a local file URL (file://).
    
    var MY_PREFERENCES_URL = "http://www.bitfodder.com/greasemonkey/addresses.xml";
    
    // **** NO NEED TO CHANGE ANYTHING BELOW THIS LINE ****
    
	// I have to use an array and pass indexes around. Directly using "start" and 
	// "end" tag names led to very inconsistent behaviors!
	// textboxes names, as defined by Google - (not js-friendly names!)
	var myTextBoxes = ["start","end"];
	var myAddresses;
    
	// ------------------------------------------------------------------------
	// FUNCTIONS
	// ------------------------------------------------------------------------
	// menu event handler.
	// It fills corresponding text input with values selected in the menu.

	window.gm_ml_fillInput = function(event,InputIndex) {
        try {
            // find the text box on the page
            var targetBox = document.getElementById(myTextBoxes[InputIndex]);
            // get value from menu
            var menu = event.target;
            var address = menu.options[menu.selectedIndex].value;
            // set text input to this value
            targetBox.setAttribute("value",address);	
        } catch(e) {
            throw ("ERROR:"+"Google might have changed the name of their input boxes"+" | "+ e);
        }	
	};
    
    // we need to attach the function to some element in the page
    //var submitButton = document.getElementById("submitd");
    //submitButton.addEventListener("click", gm_ml_fillInput, false);
    
    // this is where all the action takes place. Called when the XML GET returns.
	window.gm_ml_callback = function(details) {
        try {
          var parser = new DOMParser();
          var boxIndex, mySelect, myInput, newOption, newText;
          
          var dom = parser.parseFromString(details.responseText,"text/xml");
          myAddresses = dom.getElementsByTagName('address');
          if (myAddresses.length < 1) {
            GM_log("address file at " +MY_PREFERENCES_URL+" seems to be empty");
          }
 
                    // insert a drop-down menu before each Google input text box
                    for (boxIndex in myTextBoxes) {
                      
                      // find input associated to this menu
                      if (myInput = document.getElementById(myTextBoxes[boxIndex])) {
                              
                            // create a new menu
                            mySelect = document.createElement('select');
                            mySelect.setAttribute("id", "gm_ml_select_"+myTextBoxes[boxIndex]);
                            newOption = document.createElement('option');
                            newOption.setAttribute('value','-- choose or type a location --');
                            newText = document.createTextNode('-- choose --');
                            newOption.appendChild(newText);
                            mySelect.appendChild(newOption);
                              
                            //GM_log(myAddresses.length+" addresses");
                            // assign addresses to that menu
                            for (var i = 0; i < myAddresses.length; i++) {
                                    newOption = document.createElement('option');
                                    newOption.setAttribute('value',myAddresses[i].textContent);
                                    newText = document.createTextNode(myAddresses[i].getAttribute('name'));
                                    newOption.appendChild(newText);
                                    mySelect.appendChild(newOption);
                                }
                                      
                            // insert drop-down menu on the page, just before corresponding input
                            myInput.parentNode.insertBefore(mySelect, myInput);
                            // associate event handler to menu
                            mySelect.setAttribute('onChange','gm_ml_fillInput(event,'+boxIndex+')');
                        }
                    }
            
        } catch(e){
                throw ("ERROR:"+ "Hmm... check the content of your preferences file - fetch "+MY_PREFERENCES_URL+" from your web browser"+ " | "+ e);
        }    
	}; // end gm_ml_callback
	
	// ------------------------------------------------------------------------
	// "MAIN"
	// ------------------------------------------------------------------------
	
	// GM_log("starting MyLocations...");
	// these next 5 lines are straight from "My Google Maps", http://justinsomnia.org/
	// enclose in event listener so this happens after the onload event
     
	window.addEventListener("load", function(e) {
		// set form to directions
		_form('directions', false);
	}, false);
    
	// First thing first: get MyLocations from XML file                
    try{
        GM_xmlhttpRequest({
            method:"GET",
            url:MY_PREFERENCES_URL,
            headers:{"Accept":"*/*"},
            onload:gm_ml_callback
            });
    } catch(e){
        throw ("ERROR:"
            + "Could not get XML address file from" + MY_PREFERENCES_URL
            + "Ensure you can fetch this file from your web browser by pasting this in your address bar:" + MY_PREFERENCES_URL
            + " | "
            + e);
    }	

})();