// JScript source code
// Conquer Club - Saved Searches
// version 2.22 

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
// Features in version 2.22 (updated by Aerial Attack)
//-----------------------------------------------------------------------------
// * Added Game Create Presets to Start Game Page (Tournament Organizers Only)
// * Added Check for Password on Tournament Games
//
//-----------------------------------------------------------------------------
// Features in version 2.12 (updated by Aerial Attack)
//-----------------------------------------------------------------------------
// * Added Tournament Drop Downs 
// * -- fixed problem when tournaments are added/removed
// * -- alert user when saved tournament no longer exists
// * Changed (at) include reference from playerspace.php to player.php
// * -- this matches with Lackattack's change
//
//-----------------------------------------------------------------------------
// Features in version 2
//-----------------------------------------------------------------------------
//  * Bug fix - removes the bookmark feature from the join private game page
//
//-----------------------------------------------------------------------------
// Features in version 1
//-----------------------------------------------------------------------------
//  * Adds a saved searches feature to the game finder
//  * If you save a search with the name DEFAULT it will automaticly load that search when the page loads
//
//-----------------------------------------------------------------------------
//  Meta Data - required for Greasemonkey
//-----------------------------------------------------------------------------
// ==UserScript==
// @name           Conquer Club - Saved Searches
// @namespace      conquerclubsavedsearches.user.js
// @include        http://*conquerclub.com*
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
				        if ((strTagName == "select") && (oElement.name == "tournament")) { showDebugString("Tourney Found");}
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
var loadedName = "";
var btnSearch = getElementsByClassName(document.getElementById("middleColumn"),"input","button")[0];
var txtPageToLoad = "SEARCHES";
var intPageType = 1;
var txtBookmarkButtonText = "Bookmark Searches";
var txtInnerHTMLText = "<b>Saved Searchs</b><br />";

if (!btnSearch) 
	{
		intPageType = 0;
		showDebugString("No Input Button");
		return; // Quick exit if on wrong page
	}
if (btnSearch.value != "Search") 
	{
		if (btnSearch.value != "Create")
			{
				intPageType = 0;
				showDebugString("Wrong Button");
				return; // Quick exit if on wrong page
			}
		else
			{ 
				intPageType = 2;
				txtBookmarkButtonText = "Bookmark Presets";
				txtInnerHTMLText = "<b>Create Game Presets</b><br />";
				txtPageToLoad = "PRESETS"; 
			}
	}

// Load Previous Saved Searches
var myOptions = (deserialize(txtPageToLoad, new Object()))
if (typeof(myOptions) == "undefined") { myOptions = new Object(); }

/*---- Event Handlers ----*/

// The Bookmark Search Button Handler
var buttonHandlerBookmarkSearch = function buttonHandlerBookmarkSearch()
	{
		showDebugString("Bookmark Clicked");
		var name = prompt("Please Name this search/preset (reusing a name will overwrite it)", loadedName);
		if (name != "" && name != null)
			{
				var searchDetails = new Object();
				var arrFinderOptions = document.getElementById('middleColumn').getElementsByTagName("input");
				var intOptionCount = 0;
				var dropdownTournament = getElementsByClassName(document.getElementById("middleColumn"),"select","field")[0];
				var txtPassword = "";
				for( i in arrFinderOptions )
					{
						if(arrFinderOptions[i].type == "checkbox")
							{
								searchDetails[arrFinderOptions[i].id] = arrFinderOptions[i].checked;
							}
						if(arrFinderOptions[i].type == "radio")
							{
								searchDetails[arrFinderOptions[i].id] = arrFinderOptions[i].checked;
							}
						if(arrFinderOptions[i].type == "text")
							{
								if(arrFinderOptions[i].id == "password")
									{
										txtPassword = arrFinderOptions[i].value;	
									}
								searchDetails[arrFinderOptions[i].id] = arrFinderOptions[i].value;
							}
						intOptionCount++;
					}
//				searchDetails[intOptionCount] = dropdownTournament.selectedIndex;
				var txtTournament = "";
				txtTournament = dropdownTournament.options[dropdownTournament.selectedIndex].text;
				showDebugString("Tournament: " + txtTournament);
				searchDetails[intOptionCount] = txtTournament;
				if(intPageType != 1)
					{						
						if(txtTournament != "")
							{
								if(txtPassword == "") 
									{
										alert("Tournament Games require a password - you have not supplied one");
									}
								myOptions[name] = searchDetails;
								serialize(txtPageToLoad, myOptions);
								showSearchs();
							}
						else
							{
								alert("Game presets are currently only available for tournament games.");
								return; // Do Nothing unless a Tournament Organizer
							}
					}
				else
					{
						myOptions[name] = searchDetails;
						serialize(txtPageToLoad, myOptions);
						showSearchs();
					}
				
			}
		showDebugString("Bookmark Made");
	} 


// The Load HyperLink Click Handler
var clickHandlerLoadSearch = function clickHandlerLoadSearch(searchDetails,s,bRun)
	{
		loadedName = s;
		var arrFinderOptions = document.getElementById('middleColumn').getElementsByTagName("input");
		var intLoadCount = 0;
		var txtPassword = "";
		for( i in arrFinderOptions )
			{
				if((arrFinderOptions[i].type == "checkbox") || (arrFinderOptions[i].type == "radio"))
					{
						if ( typeof(searchDetails[arrFinderOptions[i].id]) != "undefined" )
							{
								arrFinderOptions[i].checked = searchDetails[arrFinderOptions[i].id] ;
							}
						else
							{
								// We dont have this checkbox in the saved search
								// So treat it as "False" and add it to the saved search
								arrFinderOptions[i].checked = false;
								searchDetails[arrFinderOptions[i].id] = false;
								myOptions[s] = searchDetails;
								serialize(txtPageToLoad, myOptions);
							}
					}

				if(arrFinderOptions[i].type=="text")
					{
						if( typeof(searchDetails[arrFinderOptions[i].id]) != "undefined" )
							{
								arrFinderOptions[i].value = searchDetails[arrFinderOptions[i].id];
								if(arrFinderOptions[i].id == "password")
									{
										txtPassword = arrFinderOptions[i].value;
									}
							}
						else
							{
								// We dont have this textbox in the saved search
								// So treat it as "" and add it to the saved search
								arrFinderOptions[i].value = "";
								searchDetails[arrFinderOptions[i].id] = "";
								myOptions[s] = searchDetails;
								serialize(txtPageToLoad, myOptions);
							}
					}
				intLoadCount++;
			}

		var dropdownTournament = getElementsByClassName(document.getElementById("middleColumn"),"select","field")[0];
		var strTourney = searchDetails[intLoadCount];
		var blnTourney = false;
		for (opt in dropdownTournament.options)
			{
				if ( dropdownTournament.options[opt].text == strTourney)
					{
						dropdownTournament.options[opt].selected = true;
						blnTourney = true;
						break;
					}
			}
		if (!blnTourney)
			{
				var txtNoTourneyAlert = "Tournament: " + strTourney + " not found.";
				if(intPageType == 2) 
					{ 
						txtNoTourneyAlert = txtNoTourneyAlert + "  Contact a Tournament Director to renew Privileges."; 
					}
				txtNoTourneyAlert = txtNoTourneyAlert + "  You should Update or Delete this Search/Preset.";
				alert(txtNoTourneyAlert);
/*				var blnDelete = prompt("Tournament: " + strTourney + " not found.");
				if blnDelete
					{
						clickHandlerDeleteSearch(loadedName);
					}
*/			}
		else
			{
//				dropdownTournament.selectedIndex = searchDetails[intLoadCount];
				showDebugString("Load: " + strTourney + " vs " + s);

				if (bRun)
					{
						if((intPageType == 2) && (strTourney != "") && (txtPassword == ""))
							{
								alert("Tournament Games require a password - you have not supplied one");
								return; // Don't try to create a game w/o a password
							}
						else
							{
//								showDebugString("Running: " + s);
								btnSearch.click();
							}
					}
			}
	} 

// The Delete HyperLink Click Handler
var clickHandlerDeleteSearch = function clickHandlerDeleteSearch(searchName) 
    {
        if (confirm("Are you sure you want to remove the saved search "+ searchName)) 
        {
            var newOptions = new Object();
            for (var s in myOptions)
                {
                    if (s != searchName) 
                        {
                            newOptions[s] = myOptions[s];
                        }
                }
            myOptions = newOptions;
            serialize(txtPageToLoad, myOptions);
            showSearchs();
        }
    }
    
// Helper Function To Create Delete Handler passing it parameters
var makeClickHandlerDeleteSearch = function makeClickHandlerDeleteSearch(searchName) 
    {
        return function () {clickHandlerDeleteSearch (searchName);}
    }

// Helper Function To Create Load Handler passing it parameters
var makeClickHandlerLoadSearch = function makeClickHandlerLoadSearch(search, s, run) 
    {
        return function () {clickHandlerLoadSearch (search,s,run);}
    }


/*---- Create the additional interface elements ----*/
// Debug String shows up Under Personal Menu
showDebugString(txtPageToLoad);

// DIV for the List of saved searches
var savedSearches = document.createElement('div');
btnSearch.parentNode.insertBefore(savedSearches, btnSearch.nextNode);

// And the Save Button
var btnBookmarkSearch = document.createElement ('input');
btnBookmarkSearch.type = "button";
btnBookmarkSearch.value = txtBookmarkButtonText;
btnSearch.parentNode.insertBefore(btnBookmarkSearch, savedSearches);
btnBookmarkSearch.addEventListener("click", buttonHandlerBookmarkSearch, false);

/*---- Helper to create the interface ----*/
var showSearchs = function showSearchs() 
    {
    
	savedSearches.innerHTML = txtInnerHTMLText;
    
    var srchtbl = document.createElement('table');
    savedSearches.appendChild(srchtbl);
        
    for (var s in myOptions)
        {
            var srch = document.createElement('tr');
            srchtbl.appendChild(srch);
            
            var srch2 = document.createElement('td');
            srch.appendChild(srch2);        
            srch2.innerHTML = s;
            
            var srch2 = document.createElement('td');
            srch.appendChild(srch2);        
            
            var spm = document.createElement('a');
            srch2.appendChild(spm);
            spm.innerHTML = "Run";
            spm.href="javascript:void(0);";
            spm.addEventListener("click", makeClickHandlerLoadSearch(myOptions[s],s,true), false);
            
            var srch2 = document.createElement('td');
            srch.appendChild(srch2);        
            
            var spm = document.createElement('a');
            srch2.appendChild(spm);
            spm.innerHTML = "Load";
            spm.href="javascript:void(0);";
            spm.addEventListener("click", makeClickHandlerLoadSearch(myOptions[s],s,false), false);
            
            var srch2 = document.createElement('td');
            srch.appendChild(srch2);      
            
            var spm = document.createElement('a');
            srch2.appendChild(spm);
            spm.innerHTML = "Delete";
            spm.href="javascript:void(0);";
            spm.addEventListener("click", makeClickHandlerDeleteSearch(s), false);
        
        }
    }

/*---- Inital Display of Searches ----*/    
showSearchs();

/*---- Load the search settings called DEFAULT ----*/
if (myOptions['DEFAULT']) {
    clickHandlerLoadSearch(myOptions['DEFAULT'],"",false)
}
