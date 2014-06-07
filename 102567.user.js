// ==UserScript==
// @name           Play with addons
// @namespace      playwithaddons@kwierso.com
// @description    Get the Options button working for Jetpack extensions
// @include        about:addons
// ==/UserScript==

/*
 * Parts of this are blatantly stolen from Addon Compatibility Reporter.
 * 
 * This all needs to go in to a page mod for about:addons (or attached via the tabs module as a worker?), eventually.
 * id should be passed in from the self module, somehow.
 * The URL for showModalDialog below should come from the addon, using the protocol module to create an about: uri for your preference page.
 *
 * Right now, with this userscript, you have to flip greasemonkey.aboutIsGreaseable to 'true' in about:config for it to run.
 */


var list = document.getElementById("addon-list");
var items = list.getElementsByTagName("richlistitem"); // All addons in the list

var id = "jid0-t3eeRQgGANLCH9c50lPqcTDuNng@jetpack";  //Set to id of your addon. This one is Addon Builder helper



var findMyAddon = function() {
  var myAddonButton;

  // Make sure you're in the list-view. (This still complains about non-extension lists, though. )
  if(document.getElementById("view-port").selectedPanel.id == "list-view") {
    // Go through all of the items, looking for the one with your addon's ID as the item's value attribute
    for(let i in items) {
      if(items[i].value == id) {
        myAddonButton = document.getAnonymousElementByAttribute(items[i], "anonid", "preferences-btn");
        myAddonButton.removeAttribute("hidden"); // Show the Options button
        myAddonButton.removeAttribute("oncommand"); // Don't do whatever it wanted it to do when clicked
        myAddonButton.addEventListener("command", function() { window.showModalDialog('http://google.com', "dialogheight: 500;dialogwidth:500;") } ); // Add your own command behavior. This opens up Google in a modal dialog.
        list.removeEventListener("click", findMyAddon); // Don't keep adding the custom command to the button over and over.
      }
    }
  }
  
  // What about when the list-view is pre-selected when Addon Manager opens? I'm getting mixed results, maybe conflicting with ACR?
}

document.addEventListener("ViewChanged", findMyAddon);
setTimeout(function() {
  if (gDetailView._addon)
  {
      alert("I'm in Detail view to begin with!"); // Need to unhide/add command behavior to the button here like in list view above.
  }
}, 1000);