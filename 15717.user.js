// ==UserScript==

// @name           UserNotes
// @namespace      jacalata
// @description    adds ajaxy viewing of user notes whenever their id is shown
// @include *.metafilter.com/*
// @version  3.1 (firefox 8.0 support)
//           2.0 (optional marking added to usernames sitewide to indicate notes 
//           1.5 (pressing enter in the text input box now submits the new note)
//	     1.4 (fixed buttons into text-like pieces of ajaxy goodness)
//	     1.3 (fixed bug that was not saving the first note on each page)
//	     1.2 (added autoclear of textbox on focus)
//  	     1.1 (changed to handle multiple notes with individual deletion)
// ==/UserScript==


// chrome doesn't support GM_getValue, using replacement localStorage
// this code borrowed from http://devign.me/greasemonkey-gm_getvaluegm_setvalue-functions-for-google-chrome/
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}

	var currentUserID = "User"+location.href.substring(31);
	numUserNotes = GM_getValue(currentUserID, 0);
	var isAjaxOn = "ajaxSetting";
	var ajaxSetting = GM_getValue(isAjaxOn, false);
	var currentBalloon; 


	
	// adding a button to turn on/off the sitewide notes 
	// (off means they are only visible on the profiles, no markings around the rest of the site)
	ajaxButton = createButton("ajaxButton", "ajaxButton", "##", "sitewide notes off", "_self", toggleAjax);
	
	//create an invisible div that will show the notes in a popup
	// this is from http://blog.kung-foo.tv/archives/001614.html, with the style stuff based on the bookburro extension code
	var notesBox = document.createElement('div');
	notesBox.setAttribute("id", "balloon");
	notesBox.setAttribute("style", "background-color:#778899;text-align:left;");
	notesBox.style.position = "absolute";
	notesBox.style.border = "1px solid navy";
	notesBox.style.margin = "10";
	notesBox.style.zIndex = "99";
	notesBox.style.font = "8pt sans-serif";
	notesBox.style.overflow = "hidden";
	notesBox.style.opacity = "85";
	notesBox.style.padding = "4px";
	notesBox.style.display = "none";
	
	var searchPattern = "//div[@class='mefimessages']";
	var options = document.evaluate( searchPattern, document, null, 
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	var i;
	for (var targetClass = null, i=0; (targetClass = options.snapshotItem(i)); i++) 
	{
			targetClass.innerHTML += " | ";
			targetClass.appendChild(ajaxButton);
			targetClass.appendChild(notesBox);
	}

	// if this is a profile page, add all the note-taking elements
	if (location.href.match("metafilter.com/user") ) 
	{
		takeNotes();
	}
	
	if (ajaxSetting == true)
	{
		ajaxButton.innerHTML = ajaxButton.innerHTML.replace("off", "on");
		showLinkedNotes();
	}
	
// called on loading a page with ajaxNotes set, or when turning on the ajax notes.
// searches for links to user profiles, and makes a mark next to those you have given notes
function showLinkedNotes()
{
	// find every spot where a user profile is linked
	var profileSearch = "//a[contains(@href, '/user/') and not(contains(./text(), 'My')) and not(contains(@href, 'rss' ))]";
	var profiles = document.evaluate( profileSearch, document, null, 
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	var j;
	for (var targetClass = null, j=0; (targetClass = profiles.snapshotItem(j)); j++) 
	{
		var thisUserID = "User"+targetClass.href.substring(31);
		var thisUserNotes = GM_getValue(thisUserID, 0);
		if (thisUserNotes > 0) 
		{
			targetClass.innerHTML += " <i>i</i>  ";
			targetClass.addEventListener("mouseover", viewNotes, false);
                        targetClass.addEventListener("click", hideBalloon, false);
		}
	}
} // function showLinkedNotes


// the user has just turned off the ajax notes feature - hide the little 'i' icons (ie; reverse what showLinkedNotes did)
function removeLinkedNotes()
{
	hideBalloon(); //just in case it is currently displayed
	// find every spot where a user profile is linked
	var profileSearch = "//a[contains(@href, '/user/') and not(contains(./text(), 'My')) and not(contains(@href, 'rss' ))]";
	var profiles = document.evaluate( profileSearch, document, null, 
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	var j;
	for (var targetClass = null, j=0; (targetClass = profiles.snapshotItem(j)); j++) 
	{
		var thisUserID = "User"+targetClass.href.substring(31);
		var thisUserNotes = GM_getValue(thisUserID, 0);
		if (thisUserNotes > 0) 
		{
			targetClass.innerHTML = targetClass.innerHTML.replace(" <i>i</i>  ", "");
			targetClass.removeEventListener("mouseover", viewNotes, false);
		}
	}


}//funtion removeLinkedNotes

// displays the info balloon, containing the notes for the user whose profile you mousedover
// from http://blog.kung-foo.tv/archives/001614.html  
function viewNotes()
{

	var thisUserID = "User"+this.href.substring(31);
	if ( thisUserID == currentBalloon ) 
	{
		return false;
	}
	currentBalloon = thisUserID; // global variable to track which info balloon is currently displayed
	var objX = findPosX(this);
	var objY = findPosY(this);
	
	var balloon = document.getElementById("balloon");
	if ( balloon && balloon.childNodes )
	{
		while ( balloon.childNodes.length > 0 )
		{
			balloon.removeChild(balloon.childNodes[0]); // remove anything in the current balloon
		}
    }

	var closeElt = document.createElement('img');
    closeElt.setAttribute("id","closebox");
    closeElt.setAttribute("src","http://images.metafilter.com/mefi/icons/stockholm_mini/close.gif");
    closeElt.addEventListener('click', hideBalloon, false);
    balloon.appendChild(closeElt);
	
	var newElt = document.createElement('div');
    newElt.setAttribute("id","balloon_contents");
	
	var thisUserID = "User"+this.href.substring(31);
	var thisUserNotes = GM_getValue(thisUserID, 0);
	var k;
	var height = 13;
	for (k=0; k<thisUserNotes; k++)
	{
		var newLine = "-" + GM_getValue(thisUserID+k, "");
		newElt.innerHTML += newLine;
		newElt.innerHTML += "<br>";
		var nRows = Math.ceil( (newLine.length)/30);
		console.log("line Lenght =  " + newLine.length + "nRows = " + nRows);
		height += 13 * nRows;
	}
	balloon.style.width = "150px";
	balloon.style.height = height;
    balloon.appendChild(newElt);	
	balloon.style.top = (objY-0) + 'px';
    balloon.style.left = (objX+45) + 'px';
    balloon.style.display = 'block';
} // function viewNotes

	
// make the info balloon disappear
// from http://blog.kung-foo.tv/archives/001614.html  
function hideBalloon()
{
  var balloon = document.getElementById("balloon");
  if ( balloon )
  {
    balloon.style.display = 'none';
    currentBalloon = null;
  }
  return false;
} // function hideBalloon
	
// find the position of an object along the x axis of the page
// from http://blog.kung-foo.tv/archives/001614.html  
function findPosX(obj)
{
    var curleft = 0;
    if (obj.offsetParent)
	{
        while (obj.offsetParent)
		{
            curleft += obj.offsetLeft;
            obj = obj.offsetParent;
        }
        if ( obj != null )
		{
            curleft += obj.offsetLeft;
		}
    }
    else if (obj.x) 
	{
        curleft += obj.x;
	}
    return curleft;
} // function findPosX

// finds the position of an object along the y axis of the page
// from http://blog.kung-foo.tv/archives/001614.html  
function findPosY(obj)
{
    var curtop = 0;
    if (obj.offsetParent)
	{
        while (obj.offsetParent)
		{
            curtop += obj.offsetTop;
            obj = obj.offsetParent;
        }
        if ( obj != null ) 
		{
            curtop += obj.offsetTop;
		}
    }
    else if (obj.y)
	{
        curtop += obj.y;
	}
    return curtop;
} // funcion findYPos
	
	

// creates a button element that calls a function on this page
function createButton(id, name, href, words, target, clickFunction)
{
	//ajaxButton = createButton("ajaxButton", "ajaxButton", "##", "ajax notes", "_self", toggleAjax);
		
	newButton = document.createElement("a");
	newButton.setAttribute("id", id);
	newButton.setAttribute("name", name);
	newButton.setAttribute("href", href);
	newButton.innerHTML = words;
	newButton.setAttribute("target", target);
	newButton.addEventListener("click", clickFunction, false);
	return newButton;
	
} // function createButton


// toggles the value of our 'is ajax on?' boolean
function toggleAjax()
{
	ajaxSetting = !ajaxSetting;
	GM_setValue(isAjaxOn, ajaxSetting);
	if (ajaxSetting) // turning it on
	{
		ajaxButton.innerHTML = ajaxButton.innerHTML.replace("off", "on");
		showLinkedNotes();
	}
	else //turning it off
	{
		ajaxButton.innerHTML = ajaxButton.innerHTML.replace("on", "off");
		removeLinkedNotes();
	}	
} // function toggleAjax
	
	
// for profile pages:  create and display all the notes for this user.
function takeNotes()
{	
	anchor = document.getElementById('contact');
	if (anchor == null) // this is your own profile - no notes about yourself, because the 'contact' element doesn't exist
	{
		return;
	}
	outputDiv = anchor.parentNode;
	
	if (numUserNotes > 0)
	{
		notesHeadline = document.createElement("div");
		notesHeadline.setAttribute("id", "headline");
		notesHeadline.innerHTML = "<b>My Notes</b>";

		delNotes = createButton("delBut", "DelNotes", "##", "      [delete all]", "_self", delAllNotes);
		
		outputDiv.appendChild(notesHeadline);
		notesHeadline.appendChild(delNotes);

		for (var i = 0; i < numUserNotes; i++)
		{
			note = GM_getValue(currentUserID+i, "");
			currentNotes = document.createElement("div");
			currentNotes.setAttribute("id", "currentNotes"+i);
			currentNotes.innerHTML = note;
			
			delCurrent = createButton("delBut"+i, "DelNote", "##", "      [x]", "_self", delOneNote);
	
			outputDiv.appendChild(currentNotes);	
			currentNotes.appendChild(delCurrent);
		}
	}	

	inputForm = document.createElement("form");
	inputForm.setAttribute("method", "post");
	inputForm.addEventListener("submit", addNote, false);
	inputForm.setAttribute("target", "_self");
	
	newNotes = document.createElement("input");
	newNotes.setAttribute("type", "text");
	newNotes.setAttribute("value", "new note...");
	newNotes.setAttribute("id", "noteInput");
	newNotes.addEventListener("focus", clearValue, true);
	newNotes.innerHTML = "<br>";

	addNotes = document.createElement("input");
	addNotes.setAttribute("type", "submit");
	addNotes.setAttribute("id", "addBut");
	addNotes.setAttribute("value", "Add Note");
	addNotes.setAttribute("target", "_self");

	inputForm.appendChild(newNotes);
	inputForm.appendChild(addNotes);	
	outputDiv.appendChild(inputForm);
	
} // function takeNotes

// clears the default text in the textbox when the user clicks on it
function clearValue()
{
	textbox = document.getElementById("noteInput");
	if (textbox.value == "new note...") {
		textbox.setAttribute("value", "");
	}
} // function clearValue

	
// creates and displays a new note, from the text in the textbox
function addNote()
{	
	var note = document.getElementById("noteInput");
	var noteNum =  numUserNotes;

	if (note.value == "")
	{
		return;
	}
	
	if (numUserNotes == 0)
	{
		notesHeadline = document.createElement("div");
		notesHeadline.setAttribute("id", "headline");
		notesHeadline.innerHTML = "<b>My Notes</b>";
		
		delNotes = createButton("delBut", "DelNotes", "##", "      [delete all]", "_self", delAllNotes);

		//alert(note);
		note.parentNode.insertBefore(notesHeadline, note);
		notesHeadline.appendChild(delNotes);
	}

	numUserNotes++;
	GM_setValue(currentUserID, numUserNotes);
	GM_setValue(currentUserID+noteNum, note.value);

	currentNoteNew = document.createElement("div");
	currentNoteNew.setAttribute("id", "currentNotes"+noteNum);
	currentNoteNew.innerHTML = note.value;

	delCurrentNew = createButton("delBut"+noteNum, "DelNote", "##", "      [x]", "_self", delOneNote);
	
	note.parentNode.insertBefore(currentNoteNew, note);
	currentNoteNew.appendChild(delCurrentNew);	
}//function addNotes


// delete a single note
function delOneNote()
{
	var newID = (+this.id.substring(6));
	var nextID = newID + 1;
	while (nextID < numUserNotes)
	{
		var thisNoteID = currentUserID+newID;
		var nextNoteID = currentUserID+nextID;
		nextNoteValue = GM_getValue(nextNoteID, "");

		currentNotes = document.getElementById("currentNotes"+nextID);
		currentNotes.setAttribute("id", "currentNotes"+newID);

		delCurrent = document.getElementById("delBut"+nextID);
		delCurrent.setAttribute("id", "delBut"+newID);

		GM_setValue(thisNoteID, nextNoteValue);
		newID++;
		nextID++;
	}


	numUserNotes--;
	GM_setValue(currentUserID, numUserNotes);
	noteText = this.parentNode;
	noteText.removeChild(this);
	noteText.parentNode.removeChild(noteText);

	if (numUserNotes == 0)
	{
		headline = document.getElementById("headline");
		headline.parentNode.removeChild(headline);
	}
} // fucntion delOneNote

// delete all notes about this user
function delAllNotes()
{
	var newID;
	for (newID = 0; newID < numUserNotes; newID++)
	{
		note = document.getElementById("currentNotes"+newID);
		note.parentNode.removeChild(note);
	}
	headline = document.getElementById("headline");
	headline.parentNode.removeChild(headline);
	numUserNotes = 0;
	GM_setValue(currentUserID, numUserNotes);

	return false;
} // function delAll Notes

