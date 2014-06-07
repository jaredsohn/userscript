// ==UserScript==
// @name		Facebook DeTwitterFier
// @description	Makes wall posts distinguishable from other happenings, and makes the new Facebook a little bit less like a Twitter clone, and more like Facebook. I love Twitter and Facebook, but they are different, and should be kept that way.
// @namespace	fiveofoh
// @include		http://www.facebook.com*
// @include		http://www.new.facebook.com*
// @version		0.1.1
// @author		Joel Bradshaw
// ==/UserScript==


console.log("Script started.");
var prefBoxes = new Array('Re-style Wall Posts','Hide Twitter-like Posts','Re-style Attachments');
var doWallPosts = GM_getValue('RestyleWallPosts', true);
var hideTwitterPosts = GM_getValue('HideTwitterlikePosts', true);
var doAttachments = GM_getValue('RestyleAttachments', true);

GM_addStyle("\
		.GMWallWrapper { background:#ECEFF5; padding:5px; }\
		.GMWallText { margin-top:5px; }\
		.GMHideNote { color:#777777;font-style:italic;border-top:1px solid #D8DFEA;padding:5px; }\
		.UIRecentActivity_Stream { padding:5px 0px; }\
		.UIRecentActivity_Header { display:none; }\
		#dtwdiv { padding: 0px 20px 5px 20px; }\
		#dtwdiv input { vertical-align: middle; }\
		#dtwdiv #savebutton { margin-left: 20px; vertical-align: middle; }\
		#dtwdiv #savebutton.disabledbutton {background-color:#CCCCCC; border-color:#EEEEEE #999999 #999999 #EEEEEE;}");
		
/*
//Disable the ft() function for link troubles
var bodyID = document.getElementsByTagName("body")[0];
var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.innerHTML = 'function ft() {}';
headID.appendChild(newScript);
console.log(newScript);
*/
//Firebug lite, for console.log messages
var headID = document.getElementsByTagName("head")[0];
var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.src = 'http://getfirebug.com/releases/lite/1.2/firebug-lite-compressed.js';
headID.appendChild(newScript);

mixerdiv = getElementByClass('mixer_panel', null, true);
if(mixerdiv.length == null) {
	console.log(mixerdiv);
	var dtwDiv = document.createElement('div');
	dtwDiv.appendChild(document.createElement('h3')).innerHTML = "DeTwitterFier Preferences";
	for(var curp in prefBoxes) {
		prefID = prefBoxes[curp].replace(/\W/g,'');
		console.log(prefID + ": " + GM_getValue(prefID));
		curInput = document.createElement('input');
		curInput.type = 'checkbox';
		curInput.id = prefID;
		curInput.checked = GM_getValue(prefID, true);
		dtwDiv.appendChild(curInput);
		dtwDiv.appendChild(document.createTextNode(prefBoxes[curp] + " "));
	}
	console.log(dtwDiv);
	var doButton = document.createElement('input');
	doButton.id='savebutton';	
	doButton.type='button';
	doButton.className = 'inputbutton';
	doButton.value='Save Settings';
	doButton.addEventListener('click',saveSettings,false);
	dtwDiv.appendChild(doButton);
	dtwDiv.id = 'dtwdiv';
	mixerdiv.parentNode.insertBefore(dtwDiv, mixerdiv);
}
else {
	linkparent = document.getElementById('home_filter_list');
	if(linkparent) {
		var feedLink = document.createElement('a');
		feedLink.href = 'http://www.facebook.com/feed_prefs.php';
		feedLink.innerHTML = 'Feed Preferences';
		linkparent.appendChild(feedLink);
	}

	deTwitterFy();
}

//Hide/show function
function toggleStatus(evt) {
	if (!evt) var evt = window.event;
	evt.cancelBubble = true;
	if (evt.stopPropagation) evt.stopPropagation();

	console.log(evt);
	console.log(this);
	this.parentNode.nextSibling.style.display='block';
	this.parentNode.style.display='none';
}

function saveSettings() {
	for(var curp in prefBoxes) {
		prefID = prefBoxes[curp].replace(/\W/g,'');
		GM_setValue(prefID, document.getElementById(prefID).checked);
	}
	var saveBtn = document.getElementById('savebutton');
	saveBtn.value="Saved";
	saveBtn.enabled=false;
	addClass(saveBtn, 'disabledbutton');
}

function deTwitterFy() {
	var posttags = getElementByClass('UIIntentionalStory_Body');
	console.log(hideTwitterPosts);
	for(var i in posttags) {
		infoDiv = getElementByClass('UIIntentionalStory_InfoText', posttags[i], true);
		console.log(infoDiv);
		//Check if it's a wallpost (look for the "Wall-to-Wall" link)
		if(linkarr = infoDiv.getElementsByTagName('A')) {
			if(linkarr[0].innerHTML=="See Wall-to-Wall" && doWallPosts) {
				console.log("Styling wall post...");
				msgDiv = getElementByClass('UIIntentionalStory_Message',posttags[i], true);
				nameDiv = getElementByClass('UIIntentionalStory_Names', msgDiv, true);
				timeDiv = getElementByClass('UIIntentionalStory_Time', infoDiv, true);

				//Move the time up after the name, and get rid of any trailing text (colons, etc) from name
				insertAfter(nameDiv, timeDiv);
				lastNode = nameDiv.lastChild;
				if(lastNode.nodeType == 3) { nameDiv.removeChild(lastNode); }

				textDiv = msgDiv.lastChild;
				newDiv = document.createElement('div');
				newDiv.appendChild(document.createElement('span'));
				console.log(newDiv);

				while(textDiv && textDiv.tagName != "SPAN") {
					console.log("Adding text section...");
					console.log(textDiv);
					console.log(newDiv);
					tempDiv = textDiv.previousSibling;
					newDiv.insertBefore(textDiv, newDiv.firstChild);
					textDiv = tempDiv;
					if(textDiv) { console.log(textDiv.tagName); }
				}

				msgDiv.appendChild(newDiv);
		
				//Apply our styles
				addClass(newDiv, "GMWallText");
				addClass(posttags[i].parentNode, "GMWallWrapper");
				//Clean up the . separator and add space between name and date
				infoDiv.removeChild(infoDiv.firstChild);
				timeDiv.parentNode.insertBefore(document.createTextNode(" "), timeDiv);
			}
		}
		//Filter out any non-statusy updates (start with a capital letter...suggestions?)
		var textNode = getElementByClass('UIIntentionalStory_Message',posttags[i],true).firstChild.nextSibling;
		if(textNode) {
			statusText = textNode.nodeValue
			if(statusText.match(/^ [A-Z].+/) != null) {
				attDiv = getElementByClass('UIStoryAttachment_Content',posttags[i],true);
				if(attDiv.length == null && doAttachments) {
					//If we actually got a result	
					console.log(attDiv);
					//If it's an attachment, just force it to the next line and reformat a bit
					msgDiv = getElementByClass('UIIntentionalStory_Message',posttags[i], true);
					textDiv = msgDiv.lastChild;
					newDiv = document.createElement('div');
					newDiv.appendChild(document.createElement('span'));
					console.log(newDiv);

					while(textDiv && textDiv.tagName != "SPAN") {
						console.log("Adding text section...");
						console.log(textDiv);
						console.log(newDiv);
						tempDiv = textDiv.previousSibling;
						newDiv.insertBefore(textDiv, newDiv.firstChild);
						textDiv = tempDiv;
						if(textDiv) { console.log(textDiv.tagName); }
					}

					//Move the title up to the top and remove the bottom styling
					titleDiv = getElementByClass('UIStoryAttachment_Title',attDiv,true);
					titleDiv.className='UIStoryAttachment_Title';
					titleDiv.style.paddingBottom = "2px";
					attDiv.insertBefore(titleDiv, attDiv.firstChild);

					//Append the story text below the attachment and apply copy styling
					attDiv.appendChild(newDiv);
					addClass(newDiv, "UIStoryAttachment_Copy");
				}
				else if (hideTwitterPosts){
					//Add an interleaver so it makes sense...
					interleaver = document.createTextNode(" says: ");
					msgDiv = getElementByClass('UIIntentionalStory_Message',posttags[i], true);
					msgDiv.insertBefore(interleaver, getElementByClass('UIIntentionalStory_Names', msgDiv, true).nextSibling);

					//Hide old post
					tohide = posttags[i].parentNode;
					tohide.style.display="none";
					console.log("Found obnoxious message, hiding...");
					console.log(tohide);
	
					//Create and add the hidden link
					showlink = document.createElement('a');
					showlink.href = "#";
					showlink.addEventListener('click',toggleStatus,false);
					showlink.innerHTML = "Show?";
					hideNode = document.createElement('div');
					hideNode.className="GMHideNote";
					hideNode.appendChild(document.createTextNode("Twitter-like status hidden. "));
					hideNode.appendChild(showlink);
					tohide.parentNode.insertBefore(hideNode, tohide);
				}
			}
		}
	}
}


function addClass(element, newclass) {
	curClasses = element.className.split(" ");
	curClasses.push(newclass);
	element.className = curClasses.join(" ");
}

function insertAfter( referenceNode, newNode ) {
    referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
}

function hasClass(testElement, testClass) {
	classArray = testElement.className.split(" ");
	for(var curC in classArray) {
		if(classArray[curC] == testClass) { return true; }
	}
	return false;
}

/* getElementByClass */
/* From http://www.actiononline.biz/web/code/how-to-getelementsbyclass-in-javascript-the-code/ */
function getElementByClass(thisClass, parentelement, getfirst) {
	if(typeof(parentelement)=="undefined" || parentelement == null) { parentelement = document; }
	getfirst = typeof(getfirst)!="undefined";
	//Create Array of All HTML Tags
	var allHTMLTags=parentelement.getElementsByTagName("*");
	var selHTMLTags=Array();

	//Loop through all tags using a for loop
	for (tagnum=0; tagnum<allHTMLTags.length; tagnum++) {
		//Get all tags with the specified class name.
		if (hasClass(allHTMLTags[tagnum], thisClass)) {
			if(getfirst) {
				return allHTMLTags[tagnum];
			}
			else {
				selHTMLTags.push(allHTMLTags[tagnum]);
			}
		}
	}
	return selHTMLTags;
}