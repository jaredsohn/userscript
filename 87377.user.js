// ==UserScript==
// @name           NCIX: Quick Edit
// @namespace      
// @include        http://forums.ncix.com/forums/*
// ==/UserScript==

// Author: Hotshot
// Version: 1.01
// Date: Oct 4, 2010

// #####################################################################
// #####################################################################
// USER SETTINGS START
	
	/* 
	INFO on options:
	
		CHECK_IF_LOGGED_IN:
			Causes a delay when clicking "quick edit" but
			it makes sure you are logged in, if you arent and hit submit,
			data will be lost. This is here because a bug in NCIX forum,
			which has trouble knowing if you are or arent logged in.
			NOTE: This is good to keep on. You dont want to spend 10m editing 
			something and have it lost because submit failed.
	
		ALWAYS_ALLOW_SHOWCASE_EDIT:
			If this is false, the textbox for showcase edit will not be shown
			unless there is a SKU in your post. If you are like me and dont use the showcase,
			keeping this to "false" will save you a bit of space. 
	
		PRUNE_MODIFIED_MESSAGES:
			If you edit the message more then once, you may have multiple 
			"This message was modified by the poster at ..." messages, this 
			will delete all of these "duplicate" messages.
		
		DISPLAY_SMILEY_CONTROLS:
			Allows you to add smileys by clicking on icons
			
	*/
	
	var CHECK_IF_LOGGED_IN = true;
	var ALWAYS_ALLOW_SHOWCASE_EDIT = false;
	var PRUNE_MODIFIED_MESSAGES = true;
	var DISPLAY_SMILEY_CONTROLS = true
	var KEEP_QUOTE_DATA = true
	
// USER SETTINGS END
// #####################################################################
// #####################################################################


// My global vars
var globalpostID = 0;
var Original;
var fullSKU = "";
var mySKU = "";



// filter to turn string into RegEXP compatible
var reChars = /([\)\(^$\[\]{}.!*\\?+])/g;


// smiley object
// location: path to the smiley (HTML)
// representation: The BB code representation
function mySmileyObj(location, representation)
{
	this.location = location;
	this.representation = representation;
}

// populates on smileys
var mySmiley = new Array();
mySmiley[0] = new mySmileyObj('<img src="../_img/huh.gif">', ":huh:");
mySmiley[1] = new mySmileyObj('<img src="../_img/ohmy.gif">', ":o");
mySmiley[2] = new mySmileyObj('<img src="../_img/wink.gif">', ";)");
mySmiley[3] = new mySmileyObj('<img src="../_img/ph34r.gif">', ":ph34r:");
mySmiley[4] = new mySmileyObj('<img src="../_img/tongue.gif">', ":p");
mySmiley[5] = new mySmileyObj('<img src="../_img/biggrin.gif">', ":D");
mySmiley[6] = new mySmileyObj('<img src="../_img/laugh.gif">', ":lol:");
mySmiley[7] = new mySmileyObj('<img src="../_img/cool.gif">', "B)");
mySmiley[8] = new mySmileyObj('<img src="../_img/rolleyes.gif">', ":rolleyes:");
mySmiley[9] = new mySmileyObj('<img src="../_img/dry.gif">', "<_<");
mySmiley[10] = new mySmileyObj('<img src="../_img/smile.gif">', ":)");
mySmiley[11] = new mySmileyObj('<img src="../_img/mad.gif">', ":angry:");
mySmiley[12] = new mySmileyObj('<img src="../_img/sad.gif">', ":(");
mySmiley[13] = new mySmileyObj('<img src="../_img/unsure.gif">', ":unsure:");
mySmiley[14] = new mySmileyObj('<img src="../_img/blink.gif">', ":blink:");
mySmiley[15] = new mySmileyObj('<img src="../_img/thumbs-up.gif">', ":fup:");
mySmiley[16] = new mySmileyObj('<img src="../_img/thumbs-down.gif">', ":fdwn:");


// my button object to "hold" the data
// title: holds the visible title
// startTag: BB code for start of tag
// endTag: BB code for end of tag
function myInput(title, startTag, endTag)
{
	this.title = title;
	this.startTag = startTag;
	this.endTag = endTag;
}

// array of my object
var myInputs = new Array();
myInputs[0] = new myInput("Bold", "[b]" , "[/b]");
myInputs[1] = new myInput("Italic", "[i]" , "[/i]");
myInputs[2] = new myInput("Underline", "[u]" , "[/u]");
myInputs[3] = new myInput("Red", "[red]" , "[/red]");
myInputs[4] = new myInput("Green", "[green]" , "[/green]");
myInputs[5] = new myInput("Small", "[small]" , "[/small]");
myInputs[6] = new myInput("Large", "[large]" , "[/large]");


// Create "quick edit" links
addQuickEditLinks();

// code adds "quick edit" links beside post you can edit
function addQuickEditLinks()
{
	var foundEdits=new Array();
	var counter = 0;
	var foundElements = document.getElementsByTagName("a"); 
	for (var i = 0; i < foundElements.length; i++) 
	{ 
		if (foundElements[i].innerHTML.match(/Edit/i) && (foundElements[i].href.match(/forumpost\/threadedit/)))
		{		
			foundEdits[counter++] = foundElements[i];
			
			foundElements[i].parentNode.innerHTML += " | ";
			
			var link = document.createElement('a');
			link.href= "Quick Edit";
			link.setAttribute("onClick", "return false;");
			link.setAttribute("id", foundElements[i].href.match(/msgid\=(\d+)/)[1]);
			link.appendChild( document.createTextNode('Quick Edit') );
		
			foundElements[i].parentNode.appendChild(link);
			link.addEventListener('mousedown',quickEditClicked,false);		
		}
	}
}

// Quick Edit was Clicked
function quickEditClicked() 
{

	// If already open, display error
	if (globalpostID != 0)
	{
		alert("Error, you already have an edit window Open");
	}
	else
	{
		// Takes "this" (the link) and assigns it to a var, so if "this" changes, it doesnt matter
		// since myCreationLink will still have the ref of it
		var myCreationLink = this;

		// if CONST (user setting) is true, then check if logged in.
		if (CHECK_IF_LOGGED_IN)
		{
			var checkURL = "http://secure1.ncix.com/forumpost/threadedit.cfm?msgid=" + (this.parentNode.innerHTML.match(/msgid\=(\d+)/)[1]);

			GM_xmlhttpRequest({
				method: 'GET',
				url: checkURL,
				headers: {
					'Accept': 'application,application/xml,text/xml',
				},
				onload: function(responseDetails) {
					if(String(responseDetails.responseText).match(/Please login first/gim))
					{
						// If not logged in, ask to go to login page.
						if(confirm("Error, you arent logged in. \nGo to Login page? login"))
							window.location.href = "https://secure1.ncix.com/login/";
					}
					else
					{
						// If else is hit, everything should be good, so build the body
						buildEditBody(myCreationLink);
					}
				}
			});
		}
		else
		{
			// If here, it builds body without checking if logged in
			buildEditBody(myCreationLink);
		}
	}
	return false;
}







function buildEditBody(myCreationLink)
{
	if (myCreationLink.className == "")
	{
		// get the post body node (not the HTML)
		var postBody = myCreationLink.parentNode.parentNode.nextSibling.nextSibling.childNodes[1].childNodes[0].childNodes[1].childNodes[0].childNodes[1].childNodes[1];
		
		// Get post ID of the POST
		globalpostID = (myCreationLink.parentNode.innerHTML.match(/msgid\=(\d+)/)[1]);
		
		// Takes the current post, and saves it, incase cancel is hit, so it can restore to original
		Original = postBody.parentNode.innerHTML;
		
		// Create the textbox using lazy method (innerHTML) and generate its content calling function that converts HTML to BB
		postBody.parentNode.innerHTML = '<textarea id="myTextArea246" style="width:100%" rows="12" name="body">'+convertToBB(postBody)+'</textarea>';
			
		// Adds controls like: bold, italic, red, etc
		addControls();
		
		
		if (DISPLAY_SMILEY_CONTROLS)
			addSmileyControls();
		
		// Id showcase edit is awlays ON, or if its off but there is a showcase, then create it
		if (ALWAYS_ALLOW_SHOWCASE_EDIT || fullSKU != "")
		{

			// Create a div that will hold the textbox
			var newDiv = document.createElement('div');
			newDiv.innerHTML = "Shocase SKU: ";
			document.getElementById("myTextArea246").parentNode.appendChild(newDiv);
			
			// create input box for the showcase, add the showcase SKU to it, then display it
			var newSKU = document.createElement('input');
			newSKU.setAttribute("type", "text");
			newSKU.setAttribute("size", "115px");
			newSKU.setAttribute("id", globalpostID +"SKU");
			newSKU.value = fullSKU;
			mySKU = newSKU;
			newDiv.appendChild(newSKU);
		}
				
		// creates Update button
		var newInput = document.createElement('input');
		newInput.setAttribute("type", "submit");
		newInput.setAttribute("value", "Update");
		document.getElementById("myTextArea246").parentNode.appendChild(newInput);
		newInput.addEventListener('mousedown',mySubmit,false);
		
		// creates Cancel Button
		newInput = document.createElement('input');
		newInput.setAttribute("type", "submit");
		newInput.setAttribute("value", "Cancel");
		newInput.setAttribute("id", globalpostID +"A");
		document.getElementById("myTextArea246").parentNode.appendChild(newInput);
		newInput.addEventListener('mousedown',myCancel,false);
		
		// Sets a classname so code knows its in "edit" mode
		myCreationLink.className = "expanded";

	}
	else if (myCreationLink.className == "expanded")
	{
		// If edit is already open, give error that it is
		alert("Error, Quick Edit Editor already expanded.");
	}
}

function addControls()
{
	// create a div, and append it before the textbox (so its on top)
	var myDiv = document.createElement('div');
	document.getElementById("myTextArea246").parentNode.insertBefore(myDiv, document.getElementById("myTextArea246"));
	
	// for every single button, create it, add event listener and append it to page
	for (var i = 0; i < myInputs.length; i++) 
	{
		var myInput = document.createElement('input');
		myInput.setAttribute("type", "submit");
		myInput.setAttribute("value", myInputs[i].title);	
		myDiv.appendChild(myInput);
		addMyEventListener(myInput, i);
	}
	
	var myInput = document.createElement('input');
	myInput.setAttribute("type", "submit");
	myInput.setAttribute("value", "URL");
	myDiv.appendChild(myInput);
	myInput.addEventListener('mouseup',function(){linkPrompt()},false);
}

function linkPrompt()
{
	// get the URL, if one entered, then get description, if one entered, then insert in
	 var url = prompt(("Enter URL:"), "http://");
	 if (url)
		var desc = prompt(("Enter Description"), "");
			if (desc)
				insertAtCursor('<a href="' + url + '">' + desc + '</a>');
}


function addSmileyControls()
{
	// create a div, and append it before the textbox (so its on top)
	var myDiv = document.createElement('div');
	document.getElementById("myTextArea246").parentNode.appendChild(myDiv, document.getElementById("myTextArea246"));
	
	// for every single button, create it, add event listener and append it to page
	for (var i = 0; i < mySmiley.length; i++) 
	{
		var myInput = document.createElement('a');
		myInput.setAttribute("href", "");
		myInput.setAttribute("onClick", "return false;");
		myInput.innerHTML = String(mySmiley[i].location).replace(/<img/gim, "<img border=\"0\"");
		myDiv.appendChild(myInput);
		addMyEventListener2(myInput, i);
	}
}

// This functino adds and event Listener to a button.
// This single line of code is in its own function because of "closures"
function addMyEventListener(myInput, i)
{
	// adds Event Listener calling "insertTag" and "i" represents its position in the array
	myInput.addEventListener('mouseup',function(){insertTag(i)},false);
}

// This functino adds and event Listener to a button.
// This single line of code is in its own function because of "closures"
function addMyEventListener2(myInput, i)
{
	// adds Event Listener calling "insertTag" and "i" represents its position in the array
	myInput.addEventListener('mouseup',function(){insertSmiley(i);},false);

}

function insertTag(i)
{
	insertVal = myInputs[i].startTag;
	insertVal2 = myInputs[i].endTag;
	var myField = document.getElementById("myTextArea246");
	var startPos = myField.selectionStart;
	var endPos = myField.selectionEnd;

	//myField.value = myField.value.substring(0, startPos)+insertVal+myField.value.substring(endPos, myField.value.length);
	myField.value = myField.value.substring(0, startPos) + insertVal + myField.value.substring(startPos, endPos) + insertVal2 + myField.value.substring(endPos, myField.value.length);
	
	//alert(document.getElementById("myTextArea246").selectionStart);
	myField.selectionStart = startPos;
	
	var newPos = endPos + insertVal.length + insertVal2.length;
	myField.selectionStart = newPos;
	myField.selectionEnd = newPos;

	myField.focus();

}

function insertSmiley(i)
{
	insertAtCursor(mySmiley[i].representation);

}

function insertAtCursor(value)
{
	var myField = document.getElementById("myTextArea246");
	var startPos = myField.selectionStart;
	var endPos = myField.selectionEnd;

	myField.value = myField.value.substring(0, startPos) + value + myField.value.substring(endPos, myField.value.length);
	
	var newPos = startPos + value.length;
	myField.selectionStart = newPos;
	myField.selectionEnd = newPos;

	myField.focus();
}



// converts the "HTML" to "BB" friendly code
function convertToBB(bodyNode)
{

	var fullText = "";

	/* NOTE:
		Because of the way NCIX HTML DOM struture, this code "loops" thru
		each child, and depending on node type, it calls correct function
		to extract the data from it.
	*/
	var numOfChildNodes=bodyNode.parentNode.childNodes;
	var currentChildNode=bodyNode.parentNode.firstChild;
	for (i=0;i<numOfChildNodes.length;i++)
	{
		if (currentChildNode != null)
		{
			// If nodeType == 1, its a "real" node
			if (currentChildNode.nodeType==1)
			{
				// if nodeName is "A", then its regular HTML, extract it
				if (currentChildNode.nodeName == "A")
				{
					if (currentChildNode.href == "")
						fullText += (getTextFromHTML(currentChildNode));
				}
				// if nodeName is "P", then its regular HTML, extract it
				else if (currentChildNode.nodeName == "P")
				{
					if (currentChildNode.innerHTML != "")
						fullText += getTextFromHTML(currentChildNode);
				}
				// if its DIV and note2 class, then its a QUOTE, so call that function
				else if (currentChildNode.nodeName == "DIV" && currentChildNode.className == "note2")
				{
					fullText += mQuote(currentChildNode);
				}
				// Its a showcase node, so get SKU, (which adds it to global VAR)
				else if (currentChildNode.childNodes[1])
				{
					if (currentChildNode.childNodes[1].getAttribute("id") == "showcasediv")
					{
						getSKU(currentChildNode);
					}
				}
			}

			// GOTO next child
			currentChildNode=currentChildNode.nextSibling;
		}
	}

	// Remove trailling space that can happen in pure text edits
	fullText = fullText.replace(/\s$/,"");
	
	return(fullText);
}

// gets the SKU from showcase
function getSKU(myNode)
{
	var a = (myNode.childNodes[1].innerHTML.match(/sku=(\d+)/gim));
	var runOnce = false;
	
		
	for (i=0;i<a.length;i=i+2)
	{
		var SKU = a[i].match(/\d+/);
		if (SKU)
		{
			//SKU = String(SKU);
			if (runOnce == true)
			{
				fullSKU += "," + SKU;
			}
			else
			{
				fullSKU = SKU;
				runOnce = true;
			}
		}
	}
}

// converts quotes in "HTML" for BB
// Im tired of writing comments now, so go see convertToBB how this works
function mQuote(myNode)
{
	var fullText = "[quote]";

	var numOfChildNodes=myNode.childNodes;
	var currentChildNode=myNode.firstChild;

	for (i=0;i<numOfChildNodes.length;i++)
	{
		if (currentChildNode != null)
		{
			if (currentChildNode.nodeType==1)
			{
				if (currentChildNode.nodeName == "A")
				{
					if (currentChildNode.href == "")
					{						
						currentChildNode.innerHTML = (currentChildNode.innerHTML.replace(/<b>quote:<\/b>\s\(.+\)<br><br>/i, ""));
						fullText += getTextFromHTML(currentChildNode);
					}
				}
				else if (currentChildNode.nodeName == "DIV")
				{
					fullText += mQuote(currentChildNode); // recursion
				}
			}
			
			currentChildNode=currentChildNode.nextSibling;
			
		}
	}

	return fullText + "[/quote]";
}



function getTextFromHTML(theText)
{

	var postBody = String(theText.innerHTML);

	// Removes the <a> link, and removes the first </a> it finds, since that should be end of the first A
	postBody = (postBody.replace(/<a name=".+">/, ""));
	postBody = (postBody.replace(/<\/a>/m, "")); // Removes end of </a>

	
	// removes the "this message was modified" so it wont be there many times
	if (PRUNE_MODIFIED_MESSAGES)
		postBody = (postBody.replace(/(\r|\n|(<br>))*This message was modified by the poster at \d\d \d\d, \d\d\d\d \d\d:\d\d (AM|PM)( )?/gim,""));

	postBody = (postBody.replace(/Topic URL\: http\:\/\/forums\.ncix\.com\/forums\/topic\.php\?id\=\d+<\/font>/gim, "")); 

	// Removes all \n feeds (arent needed, because there are <br>)
	postBody = (postBody.replace(/\n/g,""));

	// turn the <br /> into \r
	postBody = (postBody.replace(/<br>/gim, "\n"));

	// convert bold, italic, underlined into there BB codes
	postBody = (postBody.replace(/<b>/gim, "[b]"));
	postBody = (postBody.replace(/<\/b>/gim, "[/b]"));
	postBody = (postBody.replace(/<u>/gim, "[u]"));
	postBody = (postBody.replace(/<\/u>/gim, "[/u]"));
	postBody = (postBody.replace(/<em>/gim, "[Italic]"));
	postBody = (postBody.replace(/<\/em>/gim, "[/Italic]"));
	
	// convert large/small text into BB
	postBody = (postBody.replace(/<font style=\"font\-size: 175\%\;\">([\s\S]*)<\/font>/gim, "[large]$1[/large]"));
	postBody = (postBody.replace(/<font style=\"font\-size: 80\%\;\">([\s\S]*)<\/font>/gim, "[small]$1[/small]"));

	// convert the images into there text represenation
	for (var i = 0; i < mySmiley.length; i++) 
	{
		var reStr = mySmiley[i].location.replace(reChars,"\\$1");
		postBody = postBody.replace( new RegExp(reStr ,"gi"),mySmiley[i].representation);
	}


	// Turns red/green color into there BB codes
	// First it finds one, then replaces it with the start of the bb code, then finds the FIRST 
	// </font> it can find, and replaces that with the end of the tag.
	// As long as the HTML is correct, this method will work (for now). 
	var ok;
	while (ok = postBody.match(/<font color=\"red\">/gi))
	{
		postBody = postBody.replace(/<font color=\"red\">/mi,"[Red]");
		postBody = postBody.replace(/<\/font>/mi,"[/Red]");
	}

	while (ok = postBody.match(/<font color=\"darkgreen\">/mi))
	{
		postBody = postBody.replace(/<font color=\"darkgreen\">/mi,"[Green]");
		postBody = postBody.replace(/<\/font>/mi,"[/Green]");
	}

	return postBody;
}



// Takes data in input box and "cleans" it before sending
function cleanForSubmit(myData)
{
	// Converts linebreaks into accepted chars
	//myData = (myData.replace(/\n/g,"%0A%OD"));

	// Converts the text into link to the smileys
	for (var i = 0; i < mySmiley.length; i++) 
	{
		var reStr = mySmiley[i].representation.replace(reChars,"\\$1");
		myData = myData.replace( new RegExp(reStr,"gi"),mySmiley[i].location);
	}
	
	// converts the [i] to [Iralic] so NCIX will accept it
	myData = (myData.replace(/\[i\]/ig,'[Italic]'));
	myData = (myData.replace(/\[\/i\]/ig,'[/Italic]'));
	
	myData = (myData.replace(/\[large\]/ig,'<font style="font-size: 175%;">'));
	myData = (myData.replace(/\[\/large\]/ig,'</font>'));
	
	myData = (myData.replace(/\[small\]/ig,'<font style="font-size: 80%;">'));
	myData = (myData.replace(/\[\/small\]/ig,'</font>'));

	return escape(myData);
}

// function that retrives GET vars (not coded by me)
function getGET(name)
{
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( window.location.href );
	if( results == null )
		return "";
	else
		return results[1];
}

function mySubmit()
{
	var forumID = getGET("forum");
	var myData = document.getElementById("myTextArea246").value;
	
	// cleans the DATA for submit
	myData = cleanForSubmit(myData);
	
	// Send everything to get AJAX'ed/sent
	sendData(forumID, globalpostID, myData);
}

function sendData(forumID, postID, Data)
{
	// gets SKU from textbox and applies escape for its POST friendly
	var showcase = (escape(mySKU.value));
	
	// send the data
	GM_xmlhttpRequest({
	  method: "POST",
	  url: "http://secure1.ncix.com/forumpost/threadedit.cfm?msgid=" + postID,
	  data: "forum=" + forumID + " &forummsgtype=1&body=" + Data + "&showcaseproducts=" + showcase + "&youtubeurl=&submit=Update",
	  headers: {
		"Content-Type": "application/x-www-form-urlencoded"
	  },
	  onload: function(response) 
	  {
			// its "done" so reload the page (goes back to same spot with reload)
			location.reload();
	  }
	});
}

// If canel buttin is hit, restore original post
function myCancel()
{
	// uses "this" (the button) and the DOM to replace original node with new one generated
	this.parentNode.innerHTML = Original;

	// Resets the class name to empty so if you want to, you can hit "quick edit" again to restart
	document.getElementById(this.id.substring(0, this.id.length-1)).className="";
	globalpostID = 0;
	fullSKU = "";
}
