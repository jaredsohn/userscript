// JScript source code
// Conquer Club - Drop Game Confirmation
// version 1.00 

//-----------------------------------------------------------------------------
// Installation
//-----------------------------------------------------------------------------
// This is a Greasemonkey user script.
//
// To use, first install Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Conquer Club - Saved Searches", and click Uninstall.
//
//-----------------------------------------------------------------------------
// Features in version 1
//-----------------------------------------------------------------------------
//
//  * Simply adds a prompt to confirm that you wish to drop Game #xxxxxxx
//
//-----------------------------------------------------------------------------
//  Meta Data - required for Greasemonkey
//-----------------------------------------------------------------------------
// ==UserScript==
// @name           Conquer Club - Drop Game Confirmation
// @namespace      conqclubdropgameconfirm.user.js
// @include        http://www.conquerclub.com/player.php?page=mygames2*
// ==/UserScript==


/*---- Prototyping ----*/
const DEBUG_MODE = false;  // Toggle Debug Mode
String.prototype.has = function(key) { return this.indexOf(key) > -1; }
String.prototype.makeID = function() { return this.replace(" ","_").replace("'","_").replace("#","_").replace("?","_"); }


/*---- Helper Functions ---*/
function getElementsByClassName (oElm, strTagName, strClassName)
    {
        var arrElements = (strTagName == "*" && document.all) ? document.all : oElm.getElementsByTagName(strTagName);
        var arrReturnElements = new Array();
        strClassName = strClassName.replace(/\-/g, "\\-");
        var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s)");
        var oElement;
        for(var i = 0; i < arrElements.length; i++)
            {
                oElement = arrElements[i];
                if(oElement.className.has(strClassName))
                    {
                        arrReturnElements.push(oElement);
//				        if ((strTagName == "select") && (oElement.name == "tournament")) { showDebugString("Tourney Found");}
                    }
            }
        return (arrReturnElements)
    }

function deserialize(name, def) 
    {
		showDebugString("De-Serializing");
        return eval(GM_getValue(name, (def || '({})')));
    }

function serialize(name, val) 
    {
		showDebugString("Serializing");
        GM_setValue(name, uneval(val));
    }

function showDebugString(strShow)
{
	if (DEBUG_MODE != true)  return;  // Don't show anything if not debugging
	  
	var leftBar = document.getElementById("leftColumn");
	var ul = leftBar.getElementsByTagName("ul");
	var li = document.createElement("li");
	var a = document.createElement("a");
	a.innerHTML = strShow;
//	a.setAttribute("href", "javascript:void(0);");
	li.appendChild(a);
	ul[2].appendChild(li);
}

/*---- Global Variables ----*/


/*---- Event Handlers ----*/

// function to add Drop Game confirmation event listeners to the drop game URL click event
var addConfirmDropGameClickHandlers = function addConfirmDropGameClickHandlers()
	{
		showDebugString("Add Drop Confirms");
		var arrFinderOptions = document.getElementById('middleColumn').getElementsByTagName("a");
		var txtAnchorURL = "";
		for( i in arrFinderOptions )
			{
				txtAnchorURL = new String(arrFinderOptions[i].href);
//				showDebugString(txtAnchorURL);
				if(txtAnchorURL.indexOf("submit=Drop") != -1 )
					{
						var arrGameNoIndex = txtAnchorURL.split("=");
						var intGameNo = arrGameNoIndex[2]; // sub 0 is URL, sub 1 is submit type of Drop, sub 2 is game #
						arrFinderOptions[i].href = "javascript: if (confirm('Drop Game #" + intGameNo + "?')) { window.location.href='" + txtAnchorURL + "' } else { void('') };";
//						arrFinderOptions[i].onclick = "clickHandlerConfirmDropGame(txtAnchorURL, intGameNo);";
//						arrFinderOptions[i].addEventListener("click", makeClickHandlerConfirmDropGame(arrFinderOptions[i], intGameNo), false);
					}
			}
		showDebugString("Confirms Added");
	} 


// The Confirm Drop Game Click Handler
function clickHandlerConfirmDropGame(strDeleteGameURL, intGameNo) 
    {	
		var blnDelete = confirm("Are you sure you want to remove the saved search "+ intGameNo);
		showDebugString("Boolean: " + blnDelete);
		if (blnDelete) // go ahead and delete the game
			{ 
				document.location = strDeleteGameURL; 
			}
		else
			{ // do nothing
				return;
			}
    }
    

// Start the page off
var start = new addConfirmDropGameClickHandlers();
