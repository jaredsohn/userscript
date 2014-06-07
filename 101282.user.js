// ==UserScript==
// @name           LJFilterRescue
// @namespace      http://cs-hackerary.livejournal.com/2160.html
// @description    For LJ's "Manage Custom Friends Groups" page. Lists fgroups (filters) and their members at the bottom of the page in text for ease of cutting-and-pasting. 
// @include        http://www.livejournal.com/friends/editgroups.bml
// ==/UserScript==

var newdiv = document.createElement("div");
newdiv.innerHTML = "<h1>Your Groups (Filters) and Their Members</h1>";

function loopOverEveryGroup ()
 {
     var accumulator ="<dl>";
     var grouplist = document.getElementsByName("list_groups").item(0);
 
     // iterate over all groups
     var i;
     for (i=0; i<grouplist.options.length; i++) {
		accumulator += "<dt>" + grouplist.options[i].text + "</dt>";
		accumulator += loopOverEveryFriend(grouplist.options[i].value);
		}
     accumulator += "</dl>";
     return accumulator;
 }

function loopOverEveryFriend (group)
 {

    var form = document.getElementsByName("fg").item(0);
    var accumulator = "";
	
    var i;
    for (i=0; i<form.elements.length; i++) {
         var name = form.elements[i].name;
         var mask = form.elements[i].value;
         if (name.substring(0, 21) == "editfriend_groupmask_") {
             var user = name.substring(21, name.length);

             // see if we remap their display name
             var display = user;
             if (document.getElementById) {
                 display = document.getElementById('nameremap_' + user);
                 if (display) {
                     display = display.value;
                 } else {
                     display = user;
                 }
             }

	     if (mask & (1 << group)) {
	         accumulator += "<dd>" + display + "</dd>";	 
	     }
        }
    }
    return accumulator;	
 }

newdiv.innerHTML += loopOverEveryGroup();
var container = document.getElementById("content-wrapper");
container.appendChild(newdiv);
 

