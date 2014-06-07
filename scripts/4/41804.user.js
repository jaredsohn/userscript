// Conquer Club - Saved Searches
// version 2.0 

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
// Features in version 2
//-----------------------------------------------------------------------------
//  * Bug fix - removes the bookmark feature from the join private game page
//-----------------------------------------------------------------------------
// Features in version 1
//-----------------------------------------------------------------------------
//  * Adds a saved searches feature to the game finder
//  * If you save a search with the name DEFAULT it will automaticly load that search when the page loads
//-----------------------------------------------------------------------------
//  Meta Data - required for Greasemonkey
//-----------------------------------------------------------------------------
// ==UserScript==
// @name           Conquer Club Saved Searches
// @namespace      http://userscripts.org/
// @include        http://www.conquerclub.com/player.php?mode=find*
// ==/UserScript==


/*---- Prototyping ----*/
String.prototype.has = function(key) { return this.indexOf(key) > -1; }
String.prototype.makeID = function() { return this.replace(" ","_").replace("'","_").replace("#","_").replace("?","_"); }

function setThumbnails(opts) {	
var thumbs = '';
	for (var i = 0; i < opts.length; i++) {
		if (opts[i].selected) {
			var map_status = (unsafeWindow.mapStatuses[i] == 'B') ? 'http://static.conquerclub.com/map_beta.png' : 'http://static.conquerclub.com/map_normal.png';
			thumbs += ' <a href="http://maps.conquerclub.com/' + unsafeWindow.mapFiles[i] + '" rel="lightbox" title="' + unsafeWindow.mapTitles[i] + ',' + unsafeWindow.mapTopics[i] + '"><img style="background-image:url(http://maps.conquerclub.com/'+ unsafeWindow.mapThumbs[i] + ')" src="' + map_status + '" width="50" height="34" alt="' + unsafeWindow.mapTitles[i] + '" title="' + unsafeWindow.mapTitles[i] + '" /></a>';
		}
	}		
  unsafeWindow.map_thumbs.innerHTML = thumbs;
  unsafeWindow.initLightbox();
}

/*---- Helper Functions ---*/
function getElementsByClassName (oElm, strTagName, strClassName)
    {
        var arrElements = (strTagName == "*" && document.all)? document.all : oElm.getElementsByTagName(strTagName);
        var arrReturnElements = new Array();
        strClassName = strClassName.replace(/\-/g, "\\-");
        var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s)");
        var oElement;
        for(var i=0; i<arrElements.length; i++)
            {
                oElement = arrElements[i];
                if(oElement.className.has(strClassName))
                    {
                        arrReturnElements.push(oElement);
                    }
            }
        return (arrReturnElements)
    }

function deserialize(name, def) 
    {
        return eval(GM_getValue(name, (def || '({})')));
    }

function serialize(name, val) 
    {
        GM_setValue(name, uneval(val));
    }

/*---- Global Variables ----*/
var loadedName = "";
var searchButtons = getElementsByClassName(document.getElementById("middleColumn"),"input","button");
var searchButton;

for(var s=0; s<searchButtons.length; s++) {
	if(searchButtons[s].value == "Search") searchButton = searchButtons[s]; 
}
if (!searchButton) return; // Quick exit if on wrong page

// Load Previous Saved Searches
var myOptions = (deserialize("SEARCHES", new Object()))
if (typeof(myOptions) == "undefined") myOptions = new Object();

/*---- Event Handlers ----*/

// The Save Button Handler
var saveButtonHandler = function saveButtonHandler() 
    {
        var name= prompt("Please Name this search (reusing a name will overwrite it)",loadedName);
        if (name!="" && name != null) 
            {
                var searchDetails=new Object();
                var allP = document.getElementById('middleColumn').getElementsByTagName("input");
                var mSel = document.getElementById("maps");
                var tSel = document.getElementById("tournament");
                for( i in allP ) 
                    {
                        if(allP[i].type=="checkbox") 
                            {
                                searchDetails[allP[i].id] = allP[i].checked;
                            } 
                        if(allP[i].type=="text") 
                            {
                                searchDetails[allP[i].id] = allP[i].value;
                            } 
                    }
                for(j=0; j< mSel.options.length; j++) {
                 var strip = mSel.options[j].innerHTML.replace(/ \(Beta\)$/, '').replace(/\(\d+\) /,'' );       
                 searchDetails[strip] = mSel.options[j].selected; 
                }                    
                searchDetails["tourney"] = tSel.value;
                myOptions[name] = searchDetails;
                serialize("SEARCHES", myOptions);
                showSearchs();
            }
    }

// The Load Button Handler
var loadButtonHandler = function loadButtonHandler(searchDetails,s,bRun) 
    {
        loadedName = s;
        var allP =document.getElementById('middleColumn').getElementsByTagName("input");
        var mSel = document.getElementById("maps");       
        var tSel = document.getElementById("tournament");
        for(j=0; j< mSel.options.length; j++) {
          var strip = mSel.options[j].innerHTML.replace(/ \(Beta\)$/, '').replace(/\(\d+\) /,'' );       
          if ( typeof(searchDetails[strip]) != "undefined" ){
            mSel.options[j].selected = searchDetails[strip]; 
          }
          else{
             mSel.options[j].selected = false;
             searchDetails[strip] = false;
             myOptions[s] = searchDetails;
             serialize("SEARCHES", myOptions);
           }
        }
        if ( typeof(searchDetails["tourney"]) != "undefined" ){
	        tSel.value = searchDetails["tourney"];
        }
        else{
	        tSel.value = "";
        }
        setThumbnails(mSel.options);
        for( i in allP ) 
            {
                if(allP[i].type=="checkbox") 
                    {
                        if ( typeof(searchDetails[allP[i].id]) != "undefined" )
                            {
                                allP[i].checked = searchDetails[allP[i].id] ;
                            }
                        else
                            {
                                // We dont have this checkbox in the saved search
                                // So treat it as "False" and add it to the saved search
                                allP[i].checked = false;
                                searchDetails[allP[i].id] = false;
                                myOptions[s] = searchDetails;
                                serialize("SEARCHES", myOptions);
                            }
                    } 
                if(allP[i].type=="text") 
                    {
                        if( typeof(searchDetails[allP[i].id]) != "undefined" )
                            {
                                allP[i].value = searchDetails[allP[i].id];
                            }
                        else
                            {
                                // We dont have this textbox  in the saved search
                                // So treat it as "" and add it to the saved search
                                allP[i].value = "";
                                searchDetails[allP[i].id] = "";
                                myOptions[s] = searchDetails;
                                serialize("SEARCHES", myOptions);
                            }
                    } 
            }
        if (bRun) 
            {
                searchButton.click();
            }
    }

// The Delete Button Handler
var delButtonHandler = function delButtonHandler(searchName) 
    {
        if (confirm("Are you sure you want to remove the saved search "+ searchName)) 
        {
            var newOptions = new Object();
            for (var s in myOptions)
                {
                    if (s!=searchName) 
                        {
                            newOptions[s] = myOptions[s];
                        }
                }
            myOptions = newOptions;
            serialize("SEARCHES", myOptions);
            showSearchs();
        }
    }
    
// Helper Function To Create Delete Handler passing it parameters
var makedelButtonHandler = function makedelButtonHandler(searchName) 
    {
        return function () {delButtonHandler (searchName);}
    }
// Helper Function To Create Load Handler passing it parameters
var makeloadButtonHandler = function makeloadButtonHandler(search,s,run) 
    {
        return function () {loadButtonHandler (search,s,run);}
    }


/*---- Create the additional interface elements ----*/

// DIV for the List of saved searches
var savedSearches = document.createElement('div');
searchButton.parentNode.insertBefore(savedSearches, searchButton.nextNode);

// And the Save Button
var saveButton = document.createElement ('input');
saveButton.type="button";
saveButton.value="Bookmark Search";
searchButton.parentNode.insertBefore(saveButton, savedSearches);
saveButton.addEventListener("click", saveButtonHandler, false);

/*---- Helper to create the interface ----*/
var showSearchs = function showSearchs() 
    {
    
    savedSearches.innerHTML = "<b>Saved Searchs</b><br />";
    
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
            spm.addEventListener("click", makeloadButtonHandler(myOptions[s],s,true), false);
            
            var srch2 = document.createElement('td');
            srch.appendChild(srch2);        
            
            var spm = document.createElement('a');
            srch2.appendChild(spm);
            spm.innerHTML = "Load";
            spm.href="javascript:void(0);";
            spm.addEventListener("click", makeloadButtonHandler(myOptions[s],s,false), false);
            
            var srch2 = document.createElement('td');
            srch.appendChild(srch2);      
            
            var spm = document.createElement('a');
            srch2.appendChild(spm);
            spm.innerHTML = "Delete";
            spm.href="javascript:void(0);";
            spm.addEventListener("click", makedelButtonHandler(s), false);
        
        }
    }

/*---- Inital Display of Searches ----*/    
showSearchs();

/*---- Load the search settings called DEFAULT ----*/
if (myOptions['DEFAULT']) {
    loadButtonHandler(myOptions['DEFAULT'],"",false)
}
