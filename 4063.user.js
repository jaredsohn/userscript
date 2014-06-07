// ==UserScript==
// @name           MySpace  - Friend Aliases
// @namespace      http://myspace.com/____
// @description    Allows you to rename friends on the "edit friends" page.
// @include        http://myspace.com/*
// @include        http://*.myspace.com/*
// ==/UserScript==


(function() {

/************\
|*  CONFIG  *|
\************/

// Inizzylizzy some viariabizzies.
var alias      = new Array;
var i = 0;

var aliasID   = unserialize(GM_getValue("aliasID", ""));
var aliasName = unserialize(GM_getValue("aliasName", ""));


/**************************************************\
|*  CORE CODE   -- DON'T EDIT BELOW THIS SECTION  *|
\**************************************************/

function friendIdFromHttp(request){

	var friendMatch = request.match(/friendid=([0-9]*)/i);
	
	return (friendMatch) ? friendMatch[1] : '6366493';
	
}


selectedNames = document.evaluate("//a[contains(@href, 'user.viewprofile') and not(*)]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// iterate through list
for (var snapshotIndex = 0; snapshotIndex < selectedNames.snapshotLength; ++snapshotIndex ) {
	
	// Stuff we already know
	var anchor = selectedNames.snapshotItem(snapshotIndex);
	var friendID = friendIdFromHttp(anchor.href);

	for (var i=0; i<aliasID.length; i++) if (aliasID[i] == friendID) { anchor.title = anchor.innerHTML; anchor.innerHTML = aliasName[i]; }


	if (window.location.href.match(/fuseaction=user\.editfriends/)){

		nameChanger = document.createElement("input");
		nameChanger.className = friendID;
		nameChanger.title = anchor.title;
		nameChanger.value = anchor.innerHTML;
		nameChanger.tabIndex = i;
		nameChanger.addEventListener("change", 
			function(e){

				var t = e.target;
				var friendID   = t.className;
				var friendName = t.value;
				var indexID = -1;

				// Check if this is a new Alias, or existing.
				for(i=0; i<aliasID.length; i++) if (friendID == aliasID[i]) indexID = i;

				if (friendName == undefined || friendName == "") {
					
					var TMP_aliasID = new Array();
					var TMP_aliasName = new Array();
					var j=0;
						
					for(i=0; i<aliasID.length; i++) {
	
						if (indexID != i) {
							TMP_aliasID[j]   = aliasID[i];
							TMP_aliasName[j] = aliasName[i];
							j++;
						}				

					}

					aliasID = TMP_aliasID;
					aliasName = TMP_aliasName;

					e.target.parentNode.firstChild.innerHTML = e.target.title;

				} else {


			
					if (indexID == -1){
						indexID = aliasID.push();
						aliasName.push();
					}

					aliasID[indexID]   = friendID;
					aliasName[indexID] = friendName;

					e.target.parentNode.firstChild.innerHTML = friendName;

				}


				// Save the new values
				GM_setValue("aliasID",   serialize(aliasID));
				GM_setValue("aliasName", serialize(aliasName));
					
			}, true
		);
		anchor.parentNode.appendChild(document.createElement('br'));
		anchor.parentNode.appendChild(nameChanger);


	}
	
}

function serialize (x){ return(x.join(',')); }
function unserialize (x){ return(x.split(',')); }


})(); 