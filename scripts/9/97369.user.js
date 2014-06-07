// ==UserScript==
// @name           UpUp.us Chat Functions
// @namespace      http://kol.upup.us/scripts/
// @description    Adds /tag, /away, phrase highlighting, scrollback buffer and nick-complete to chat.
// @include        http://*kingdomofloathing.com/lchat.php
// @include        http://*kingdomofloathing.com/account.php*
// ==/UserScript==

//most highlight/tag code lovingly stolen from Ohayou


if(document.location.pathname == "/account.php") {
	if (!document.querySelector('#privacy'))
		return

	//create preference title bar
	prefTitle = document.createElement('div');
	with(prefTitle) {
		appendChild(document.createTextNode('Chat Functions'));
		style.padding = "1px 0 1px 0";
		style.textAlignment = "center";
		style.color = "white";
		style.backgroundColor = "blue";
		style.fontWeight = "bold";
	}
	
	//create wrapper for preference content (helps with alignment)
	prefContent = document.createElement('div');
	with(prefContent) {
		style.textAlign = "left";
		style.display = "table-cell";
		style.lineHeight = "2em";
		style.padding = "5px";
	}
	
	/* ------------------
	 tag color preferences
	------------------ */
	addGlobalStyle(' \
		input.highlightField { \n\
			margin:2px; \n\
		} \n\
		div.colorpicker { \n\
			width: 10px; \n\
			height: 10px; \n\
			float: left; \n\
			margin: 2px; \n\
			border: 1px solid black; \n\
			cursor: pointer; \n\
		}\n\
		div.colorpicker:hover { \n\
			margin: 1px; \n\
			border: 2px solid black; \n\
		} \n\
	');
	
	//generate color array
	colors = new Array();
	cA = ["0","3","6","9","c","f"]
	for(var x = 0;x<cA.length;x++) {
		for(var y = 0;y<cA.length;y++) {
			for(var z = 0;z<cA.length;z++) {
				colors.push("#" + cA[x] + cA[y] + cA[z]);
			}
		}
	}
	
	//create color picker
	colorPicker = document.createElement('div');
	with(colorPicker) {
		id = "colorPicker";
		style.display = "none";
		style.width = cA.length*16*2+"px";
		style.padding = "4px";
		style.border = "1px solid gray";
	}
	for(var i=0;i<colors.length;i++) {
		var tempColorDiv = document.createElement('div');
		with(tempColorDiv) {
			style.backgroundColor = colors[i];
			className = "colorpicker";
			id="colorpicker_" +i;
			addEventListener('click',changeColors,true);
		}
		colorPicker.appendChild(tempColorDiv);
	}

	var externalColorLink = document.createElement('a');
	with(externalColorLink) {
		target = "_blank";
		href="http://www.somacon.com/cgi/colorchart.pl";
		title = "Opens in new window";
		appendChild(document.createTextNode('More colors'));
		style.clear = "both";
		style.fontSize = "9pt";
		style.color = "blue";
	}
	colorPicker.appendChild(externalColorLink);
	
	//create form, and button to toggle it
	toggleColorForm = document.createElement('span');
	colorForm = document.createElement('form');
	with(toggleColorForm) {
			style.cursor = "pointer";
			appendChild(document.createTextNode('Change /tag color'));
			style.textDecoration = "underline";
			className = "preferenceButton";
			addEventListener('click',function(evt) {toggle(colorForm);evt.preventDefault();},true);
	}
	
	//create color label, form field, color example and append hidden colorpicker
	colorExample = document.createElement('div');
	with(colorExample) {
		style.cursor = "pointer";
		style.border = "1px solid black";
		style.height = "20px";
		style.width = "50px";
		style.cssFloat = "left";
		style.margin = "0 4px 0 4px";
		title = "Click to show color picker";
		addEventListener('click',function(evt){toggle(colorPicker)},true);
	}
	colorPrefField = document.createElement('input');
	
	with(colorPrefField) {
		style.cssFloat = "left";
		size = "8";
		addEventListener('change',function(evt){colorExample.style.backgroundColor = colorPrefField.value},true);
		value = GM_getValue('tagcolor','PeachPuff');
		colorExample.style.backgroundColor = value;
	}
	submitColor = document.createElement('input');
	
	with(submitColor) {
		style.cssFloat = "left";
		className = "button";
		type="submit";
		value="Change";
	}
	with(colorForm) {
		style.display = "none";
		style.marginBottom = "-1em";
		appendChild(document.createElement('hr'));
		appendChild(document.createTextNode('Color for /tagged names: '));
		appendChild(document.createElement('br'));
		appendChild(colorPrefField);
		appendChild(colorExample);
		appendChild(submitColor);
		appendChild(document.createElement('br'));
		appendChild(colorPicker);
		appendChild(document.createElement('hr'));
		addEventListener('submit',function(evt) {
			GM_setValue('tagcolor',colorPrefField.value);
			if((a=top.frames[3].document.getElementById('tagColorStyle')) != null){
				a.innerHTML="a.GM_taggedPlayer {background-color: "+GM_getValue("tagcolor","PeachPuff")+";}"
			}
			alert("Tag color changed to: "+colorPrefField.value);
			evt.preventDefault();
		},true);

	}
	
	/* ------------------
	 highlight preferences
	------------------ */

	//create color picker
	hicolorPicker = document.createElement('div');
	with(hicolorPicker) {
		id = "hicolorPicker";
		style.display = "none";
		style.width = cA.length*16*2+"px";
		style.padding = "4px";
		style.border = "1px solid gray";
	}
	for(var i=0;i<colors.length;i++) {
		var tempColorDiv = document.createElement('div');
		with(tempColorDiv) {
			style.backgroundColor = colors[i];
			className = "colorpicker";
			id="hicolorpicker_" +i;
			addEventListener('click',changeColors,true);
		}
		hicolorPicker.appendChild(tempColorDiv);
	}
	
	var hiexternalColorLink = externalColorLink.cloneNode(true);
	hicolorPicker.appendChild(hiexternalColorLink);
	
	//create form, and button to toggle it
	togglehiColorForm = document.createElement('span');
	hicolorForm = document.createElement('form');
	with(togglehiColorForm) {
			style.cursor = "pointer";
			appendChild(document.createTextNode('Change highlight color'));
			style.textDecoration = "underline";
			className = "preferenceButton";
			addEventListener('click',function(evt) {toggle(hicolorForm);evt.preventDefault();},true);
	}
	
	//create color label, form field, color example and append hidden colorpicker
	hicolorExample = document.createElement('div');
	with(hicolorExample) {
		style.cursor = "pointer";
		style.border = "1px solid black";
		style.height = "20px";
		style.width = "50px";
		style.cssFloat = "left";
		style.margin = "0 4px 0 4px";
		title = "Click to show color picker";
		addEventListener("click",function(evt){toggle(hicolorPicker)},true);
	}
	
	
	hicolorPrefField = document.createElement("input");
	with(hicolorPrefField) {
		style.cssFloat = "left";
		size = "8";
		addEventListener("change",function(evt){hicolorExample.style.backgroundColor = hicolorPrefField.value},true);
		value = GM_getValue("highlightColor","PaleGreen");
		hicolorExample.style.backgroundColor = value;
	}
	
	
	hisubmitColor = submitColor.cloneNode(true);
	
	with(hicolorForm) {
		style.display = "none";
		style.marginBottom = "-1em";
		appendChild(document.createElement('hr'));
		appendChild(document.createTextNode('Color for highlighted words: '));
		appendChild(document.createElement('br'));
		appendChild(hicolorPrefField);
		appendChild(hicolorExample);
		appendChild(hisubmitColor);
		appendChild(document.createElement('br'));
		appendChild(hicolorPicker);
		appendChild(document.createElement('hr'));
		addEventListener("submit",function(evt) {
			GM_setValue("highlightColor",hicolorPrefField.value);
			if((a=top.frames[3].document.getElementById('highlightColorStyle')) != null){
				a.innerHTML="span.GM_highlight{background-color: "+GM_getValue("highlightColor","PaleGreen")+";}"
			}
			alert("Highlight color changed to: "+hicolorPrefField.value);
			evt.preventDefault();
		},true);
	}

	/* ------------------
		 highlight word preferences
	   ------------------ */
	   
	//create form, and button to toggle it
	togglehiForm = document.createElement('span');
	hiForm = document.createElement('form');
	with(togglehiForm) {
			style.cursor = "pointer";
			appendChild(document.createTextNode('Change highlight words'));
			style.textDecoration = "underline";
			className = "preferenceButton";
			addEventListener('click',function(evt) {toggle(hiForm);evt.preventDefault();},true);
	}
		
	//create Add Word button
	addWordButton = document.createElement('font');
	with(addWordButton) {
		size = "+1";
		appendChild(document.createTextNode('+'));
		addEventListener('click',createBlankHighlight,false);
		setAttribute('style','cursor:pointer;font-weight:bold;float:right;text-decoration:none;');
	}

	submitHighlight = document.createElement('input');
	
	with(submitHighlight) {
		style.marginTop = "5px";
		className = "button";
		type="submit";
		value="submit";
	}
	
	hifieldHolder = document.createElement('div');
	generateHighlight();
	
	with(hiForm) {
		style.display = "none";
		style.marginBottom = "-1em";
		appendChild(document.createElement('hr'));
		appendChild(document.createTextNode('Words to highlight:'));
		appendChild(addWordButton);
		appendChild(document.createElement('br'));
		appendChild(hifieldHolder);
		appendChild(submitHighlight);
		appendChild(document.createElement('hr'));
		addEventListener('submit',readHighlight,true);
	}
	

	/* ------------------
		 away preferences
	   ------------------ */
	   
	//create form, and button to toggle it
	toggleAwayForm = document.createElement('span');
	awayForm = document.createElement('form');
	with(toggleAwayForm) {
			style.cursor = "pointer";
			appendChild(document.createTextNode('Change default away message'));
			style.textDecoration = "underline";
			className = "preferenceButton";
			addEventListener('click',function(evt) {toggle(awayForm);evt.preventDefault();},true);
	}
		
	//create away label and form field
	awayPrefField = document.createElement('input');
	
	with(awayPrefField) {
		size = "25";
		style.marginBottom = "5px";
		value = GM_getValue('awayMessage','Player is currently away from their keyboard');
	}
	submitAway = document.createElement('input');
	
	with(submitAway) {
		className = "button";
		type="submit";
		value="Change";
	}
	
	with(awayForm) {
		style.marginBottom = "-1em";
		style.display = "none";
		appendChild(document.createElement('hr'));
		appendChild(document.createTextNode('Default away message:'));
		appendChild(document.createElement('br'));
		appendChild(awayPrefField);
		appendChild(document.createElement('br'));
		appendChild(submitAway);
		appendChild(document.createElement('hr'));
		addEventListener('submit',function(evt) {
			GM_setValue('awayMessage',awayPrefField.value);
			alert("Default away message changed to: \n"+awayPrefField.value+"\nRestart chat for changes to take affect");
			evt.preventDefault();
		},true);
	}
	
	
	
	
	
	
	/* ------------------
		 scrollback preferences
	   ------------------ */
	   
	//create form, and button to toggle it
	toggleScrollbackForm = document.createElement('span');
	scrollbackForm = document.createElement('form');
	with(toggleScrollbackForm) {
			style.cursor = "pointer";
			appendChild(document.createTextNode('Change scrollback limit'));
			style.textDecoration = "underline";
			className = "preferenceButton";
			addEventListener('click',function(evt) {toggle(scrollbackForm);evt.preventDefault();},true);
	}
		
	//create away label and form field
	scrollbackPrefField = document.createElement('input');
	
	with(scrollbackPrefField) {
		size = "2";
		style.marginRight = "8px";
		value = GM_getValue('maxStoredSends',0);
	}
	submitScrollback = document.createElement('input');
	
	with(submitScrollback) {
		className = "button";
		type="submit";
		value="Change";
	}
	
	with(scrollbackForm) {
		style.display = "none";
		appendChild(document.createElement('hr'));
		appendChild(document.createTextNode('Scrollback limit (0 = unlimited):'));
		appendChild(document.createElement('br'));
		appendChild(scrollbackPrefField);
		appendChild(submitScrollback);
		appendChild(document.createElement('hr'));
		addEventListener('submit',function(evt) {GM_setValue('maxStoredSends',scrollbackPrefField.value);alert("Maximum scrollback changed to: \n"+scrollbackPrefField.value);evt.preventDefault();},true);
	}
	
	with(prefContent) {
		appendChild(toggleColorForm);
		appendChild(colorForm);
		appendChild(document.createElement('br'));
		appendChild(togglehiColorForm);
		appendChild(hicolorForm);
		appendChild(document.createElement('br'));
		appendChild(togglehiForm);
		appendChild(hiForm);
		appendChild(document.createElement('br'));
		appendChild(toggleAwayForm);
		appendChild(awayForm);
		appendChild(document.createElement('br'));
		appendChild(toggleScrollbackForm);
		appendChild(scrollbackForm);
	}
	
	//create main wrapper form
	prefWrapper = document.createElement('div');
	with(prefWrapper) {
		style.marginBottom = "4px";
		style.width = "95%";
		style.border = "1px solid blue";
		appendChild(prefTitle);
		appendChild(prefContent);
	}
	
	var scriptID = 'OTT_CF'
	var scriptName = 'Chat Functions'
	//build our settings and return them for appending
	var contents = document.createElement('div')
	contents.id = scriptID
	var fieldset = contents.appendChild(document.createElement('fieldset'))
	fieldset.setAttribute('style', 'width:33%; margin-top:20px')
	var legend = fieldset.appendChild(document.createElement('legend'))
	legend.className = 'subhead'
	legend.textContent = scriptName
	var section = fieldset.appendChild(prefWrapper)
	if (!document.querySelector('#scripts'))
	{
		//scripts tab is not built, do it here
		var scripts = document.querySelector('ul').appendChild(document.createElement('li'))
		scripts.id = 'scripts'
		var a = scripts.appendChild(document.createElement('a'))
		a.href = '#'
		var img = a.appendChild(document.createElement('img'))
		img.src = 'http://images.kingdomofloathing.com/itemimages/cmonkey1.gif'
		img.align = 'absmiddle'
		img.border = '0'
		img.style.paddingRight = '10px'
		a.appendChild(document.createTextNode('Scripts'))
		a.addEventListener('click', function (e)
		{
			//make our new tab active when clicked, clear out the #guts div and add our settings to it
			e.stopPropagation()
			document.querySelector('.active').className = ''
			document.querySelector('#scripts').className = 'active'
			//document.querySelector('#guts').innerHTML = '<div class="scaffold"></div>'
			document.querySelector('#guts').innerHTML = ''
			document.querySelector('#guts').appendChild(contents)
		}, false)
	}
	else
	{
		//script tab already exists
		document.querySelector('#scripts').firstChild.addEventListener('click', function (e)
		{
			//some other script is doing the activation work, just add our settings
			e.stopPropagation()
			document.querySelector('#guts').appendChild(contents)
		}, false)
	}
	
} else {
//Chatpane

	unsafeWindow.actions["/tag"] = {"action":2, "useid" : false, "submit" : true};
	unsafeWindow.defaultMessage = GM_getValue("awayMessage","Player is currently away from their keyboard");
	var storedSends = new Array();
	var sendsPosition=-1;
	var oldWordStartPos = -1;
	var oldWordEndPos = -1;
	var oldWord = "";
	var oldFieldText;
	var tabCompleteNames = new Array();
	var tempTabCompleteNames = new Object();
	var tabInProgress = false;
	var lastFound;
	var mypid = unsafeWindow.playerid;
	var lastpid;
	
	addGlobalStyle("span.GM_highlight{background-color: "+GM_getValue("highlightColor","PaleGreen")+";}","highlightColorStyle");
	addGlobalStyle("a.GM_taggedPlayer {background-color: "+GM_getValue("tagcolor","PeachPuff")+";}","tagColorStyle");

	unsafeWindow.taggedPlayers = new Array();
	var oldScript = unsafeWindow.submitchat.toString();
	
	//add event listeners to chatform and submit button
	//for scrollback function and tab complete
	chatField = document.forms.namedItem('chatform').elements.namedItem('graf');
	//find chat button
	for(var i=1;i<document.forms.namedItem('chatform').elements.length;i++) {
		if(document.forms.namedItem('chatform').elements[i].value == "Chat" && document.forms.namedItem('chatform').elements[i].type == "button") {
			chatButton = document.forms.namedItem('chatform').elements[i];
			break;
		}
	}
	chatButton.addEventListener('click',saveItem,true);
	
	chatField.addEventListener('keyup',handleKeys,true);
	//suppress tab functionality, up and down arrows. feel sorry about breaking accessibility.
	chatField.addEventListener('keydown',function(e){if(e.keyCode==9||e.keyCode==38||e.keyCode==40)e.preventDefault();},true);
	
	
	
	//override existing submitchat script
	var newScript = document.createElement('script');
	newScript.type = "text/javascript";
	newScript.innerHTML = 'var currentlyAway = 0;\n \
	var numMessagesWhileAway = 0;\n';
	newScript.innerHTML += oldScript.replace('if (postedgraf == "/clear" || postedgraf == "/cls")','var temp=postedgraf.split(" "); \n\
	if((word=temp.shift()).charAt(0)=="/"){ \n\
		temp.unshift(word.toLowerCase()); \n\
		postedgraf=temp.join(" "); \n\
	}\n \
	if (postedgraf.substring(0,5) == "/tag "){\n \
		var deletingTag = 0;\n \
	for(i=0;i<taggedPlayers.length;i++){ \n \
		if(postedgraf.substring(5).toLowerCase() == taggedPlayers[i]){ \n \
			taggedPlayers.splice(i,1); \n \
			deletingTag = 1;\n \
			document.getElementById("ChatWindow").innerHTML+="<font color=green>"+postedgraf.substring(5)+" removed from /tag list.</font><br>";\n \
			document.getElementById("ChatWindow").scrollTop+=400;\n \
			break;\n \
		}\n \
	}\n \
	if(!deletingTag) {\n \
		taggedPlayers.push(postedgraf.substring(5).toLowerCase());\n \
		document.getElementById("ChatWindow").innerHTML+="<font color=green>"+postedgraf.substring(5)+" added to /tag list.</font><br>";\n \
		document.getElementById("ChatWindow").scrollTop+=400;\n \
	}\n \
	postedgraf = "";\n \
	document.chatform.graf.value="";\n \
	document.chatform.graf.focus();\n \
	}\n \
	if (postedgraf.substring(0,5) == "/away"){\n \
		document.chatform.graf.value="";\n \
		if(currentlyAway==1) {\n \
				clearInterval(cyclesInterval);\n \
				currentlyAway = 0;\n \
				document.chatform.graf.style.background = "";\n \
				document.getElementById("ChatWindow").innerHTML+="<font color=green>You are no longer marked as away</font><br>";\n \
				document.getElementById("ChatWindow").scrollTop+=400;\n \
				if(numMessagesWhileAway > 0) {\n \
					document.getElementById("ChatWindow").innerHTML+="<font color=green>--("+numMessagesWhileAway+" message(s) received)--</font><br>";\n \
					document.getElementById("ChatWindow").scrollTop+=400;\n \
					numMessagesWhileAway = 0;\n \
				}\n \
		} else {\n \
		 	cyclesInterval = setInterval("cycles=0",6e3);\n \
		 	var l = document.getElementsByTagName("a")\n \
		 	for(var i=0;i<l.length;i++) {\n \
		 		if(l[i].href.indexOf("showplayer")>=0 && l[i].getElementsByTagName("font").length > 0) {\n \
		 			if(l[i].getElementsByTagName("font")[0].getElementsByTagName("b").length >0) {\n \
						if(l[i].getElementsByTagName("font")[0].getElementsByTagName("b")[0].textContent.indexOf(" (private):")!=-1) {\n \
							l[i].setAttribute("awayMessageSent","true");\n \
						}\n \
					}\n \
				}\n \
			}\n \
			currentlyAway = 1;\n \
			if(postedgraf.length > 6) {\n \
				awayMessage = "Away: " + postedgraf.substring(6);\n \
			} else {\n \
				awayMessage = defaultMessage;\n \
			}\n \
			document.chatform.graf.style.background = "url(data:image/gif;base64,R0lGODlhDwALAKIEAOHl7CE5bxMsZv%2F%2F%2F%2F%2F%2F%2FwAAAAAAAAAAACH5BAEAAAQALAAAAAAPAAsAAAM0SAQR0kBJBQS4185lxxBeFUkB4H0nM5UnGAaTOzDnt5pQCpPmVasSUW2mmYh6og2l8SgpEwA7) no-repeat scroll center right";\n \
			document.getElementById("ChatWindow").innerHTML+="<font color=green>You are now marked as away with message: "+awayMessage+"</font><br>";\n \
			document.getElementById("ChatWindow").scrollTop+=400;\n \
		}\n \
		document.chatform.graf.focus();\n \
		postedgraf = "";\n \
	}\n \
	if (postedgraf == "/clear" || postedgraf == "/cls")');

	document.getElementsByTagName('head')[0].appendChild(newScript);
	void HI();
}

function handleKeys (evt) {
	switch(evt.keyCode) {
		case 13:
		//enter
			saveItem();
		break;
		case 9:
		//tab
			tabComplete();
			evt.preventDefault();
		break;
		case 38:
			//up
			if(storedSends.length != 0) {
				sendsPosition++;
				if(sendsPosition>storedSends.length-1) {
					sendsPosition = storedSends.length-1;
				} else {
					chatField.value = storedSends[sendsPosition];
				}
				evt.preventDefault();
			}
		break;
		case 40:
		//down
			if(storedSends.length != 0) {
				sendsPosition--;
				if(sendsPosition<-1) {
					sendsPosition = -1;
				}
				storedSends[sendsPosition]==undefined?chatField.value="":chatField.value = storedSends[sendsPosition];
				evt.preventDefault();
			}
		break;	
	}		
}


function tabComplete() {
	if(!tabInProgress) {
		tabInProgress = true;
		//get cursor position
		insPos = chatField.selectionStart;
		fieldText = chatField.value.toString();	
		
		//clear old values if chatfield has changed
		if(fieldText != oldFieldText) {
				oldWordStartPos = -1;
				oldWordEndPos = -1;
				oldWord = "";
				lastFound = "";
		}
		if(oldWordStartPos != -1 && insPos>=oldWordStartPos && insPos<=oldWordEndPos) {
			//cursor has to be within last word
			for(var i=0;i<tabCompleteNames.length;i++){
				if(tabCompleteNames[i] == lastFound) {
					startSearchNum=i+1;
					curWord=oldWord;
					break;
				}
			}
			wordStartPos = oldWordStartPos;
			wordEndPos = oldWordEndPos;
		} else {
		//cursor is either outside of lastword, or lastword has been nulled
			words = fieldText.split(' ');
			var curLength = 0;
			for(var i=0;i<words.length;i++) {
				curLength+=words[i].length;
				if(insPos <= curLength) {
					wordStartPos = curLength-words[i].length;
					wordEndPos = curLength;
					curWord = words[i];
					if(words[i].charAt(0) == "@") {
						wordStartPos++;
						curWord = curWord.substring(1);
					}
					startSearchNum=0;
					break;
				}
				curLength++;
			}
		}
		if(curWord.length != 0) {
			//do tab search
			for(var i=startSearchNum;i<tabCompleteNames.length;i++){
				if(tabCompleteNames[i].substring(0,curWord.length).toLowerCase() == curWord.toLowerCase()) {
					var tempWord = tabCompleteNames[i];
					if((fieldText.substring(0,5).toLowerCase()  == "/msg " && wordStartPos == 5)||(fieldText.substring(0,3).toLowerCase()  == "/w " && wordStartPos == 3)) {
						tempWord = tempWord.replace(/ /g,'_');
					}
					chatField.value = fieldText.substring(0,wordStartPos) + tempWord + fieldText.substring(wordEndPos);
					oldWordStartPos = wordStartPos;
					oldWordEndPos = wordStartPos + tabCompleteNames[i].length;
					chatField.setSelectionRange(oldWordEndPos,oldWordEndPos);
					lastFound = tabCompleteNames[i];
					oldWord = curWord;
					oldFieldText = chatField.value;
			break;
				} else { 
					if (startSearchNum != 0 && startSearchNum < i) {
						//start over
						i=-1;
					}
				}
			}
		}	
	tabInProgress = false;
	}
}

function saveItem() {
	sendsPosition = -1;
	var newValue = chatField.value;
	//remove duplicate
	if(newValue != "" && newValue != " ") {
		for(var i=0;i<storedSends.length;i++) {
			if(storedSends[i] == newValue) {
				storedSends.splice(i,1);
				break;
			}
		}
		//save current item
		storedSends.unshift(chatField.value);

		//cap sends if necessary
		var maxStoredSends = GM_getValue('maxStoredSends',0);
		if(maxStoredSends != 0 && storedSends.length>maxStoredSends) {
			storedSends.splice(maxStoredSends,storedSends.length);
		}
	}
}


function re(V) {
	var recursionLevel=0;
	//highlighting
	var Q=V;
	nodeCheck(Q);
	function nodeCheck(M) {
		var c,f,n,X;
		if(c=M.childNodes){
			for(var i=0;i<c.length;i++) {
				if(c[i].nodeType==1){
					n=c[i].nodeName;
					if(n=='B')x=1;
					else if(n=='BR')x=0;
					else if(n!='SPAN' && n!='A'){nodeCheck(c[i])};
				} else {
					if(c[i].nodeType == 3 && c[i].nodeValue) {
						highlight(c[i]);
					}
				}
			}
		}
	}
	function highlight(node) {
		var r=eval(GM_getValue('highlightPhrases',"[]"));
		if(r.length>0) {
			if(X=RegExp('\\b('+r.join('|')+')\\b', 'i').exec(node.nodeValue)){
				node=node.splitText(X.index);
				f=document.createElement('span');
				f.className = "GM_highlight";
				f.appendChild(document.createTextNode(X[1]));
				node.splitText(X[1].length);
				node.parentNode.replaceChild(f,node)
			}
		}
	}
	
	
	//tab complete
	var N = V.getElementsByTagName('a');
	var needSort = false;
	for(i=0;i<N.length;i++) {
		if(N[i].href.indexOf('showplayer')>=0 && N[i].getElementsByTagName('font').length > 0) {
			q=N[i].getElementsByTagName('font')[0].innerHTML.replace(/<.?span([^>]*)?>/ig,'').replace(/<.?b>/ig,'').replace(/ \(.*\):?/,'');
			var f=q;
			q=q.toLowerCase();
			if(tempTabCompleteNames[f] == undefined) {
				tabCompleteNames.push(f);
				needSort = true;
				tempTabCompleteNames[f] = true;
			}
			//tagging
			var foundTag = false;
			for(v=0;v<unsafeWindow.taggedPlayers.length;v++){
				if(unsafeWindow.taggedPlayers[v] == q) {
					N[i].className = "GM_taggedPlayer";
					foundTag = true;
					break;
				}
			}
			if(!foundTag) {
				//remove class: tag highlight
				N[i].className = "";
			}
			//away
			if(unsafeWindow.currentlyAway==1){
				if(N[i].textContent.indexOf(' (private):')!=-1) {
					//if private message
					if(N[i].getElementsByTagName('font')[0].getElementsByTagName('b').length >0) {
						if(N[i].getAttribute('awayMessageSent') != 'true') {
							var pid=/showplayer\.php\?who=(\d+)/.exec(N[i].href)[1];
							N[i].setAttribute('awayMessageSent','true');
							//if message not sent from self (prevents loop)
							if(pid != mypid) {
								unsafeWindow.numMessagesWhileAway ++;
								if(pid != lastpid) {
									lastpid = pid;
									var messageToSend = "/msg "+pid+" "+unsafeWindow.awayMessage;
									unsafeWindow.submitchat(messageToSend);
								}
							}
						}
					}
				}
			}
		}
	}
	//sort names all at once you fool.
	if(needSort)tabCompleteNames.sort(sortIgnoreCase);
}

function hi(id,o,n) {
	setTimeout(HI,50);
	return n;
}
function sortIgnoreCase(a,b) {
	a = a.toLowerCase(); b = b.toLowerCase();
	if (a>b) return 1;
	if (a<b) return -1;
	return 0;
}
function HI() {
	x=0;
	Y=document.getElementById('ChatWindow');
	X=document.getElementById('ChatWindow').getElementsByTagName('a');
	re(Y);
	unsafeWindow.document.getElementById('ChatWindow').watch('innerHTML',hi);
}

function addGlobalStyle(css,styleid) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    if(typeof styleid == "string")style.id=styleid;
    head.appendChild(style);
}

function toggle(item)
{
   if (!item)return;
   item.style.display = (item.style.display == "none") ? "block" : "none";
}

function changeColors(evt) {
	if(evt.target.parentNode == colorPicker) {
	colorExample.style.backgroundColor = evt.target.style.backgroundColor;
	colorPrefField.value = colors[evt.target.id.replace('colorpicker_','')*1]
	} else {
		hicolorExample.style.backgroundColor = evt.target.style.backgroundColor;
		hicolorPrefField.value = colors[evt.target.id.replace('hicolorpicker_','')*1]
	}
}

function createBlankHighlight() {
	var hifield = document.createElement('input');
	with(hifield) {
		type="text";
		className = "highlightField";
	}
	hifieldHolder.appendChild(hifield); 
	hifieldHolder.appendChild(document.createElement('br'));
}

function readHighlight(evt) {
	var tempArray = new Array();
	v=hifieldHolder.getElementsByTagName('input');
	for(var i=0;i<v.length;i++) {
		if(v[i].value != "" && v[i].value != " ") {
			tempArray.push(v[i].value);
		}
	}
	GM_setValue('highlightPhrases',uneval(tempArray));
	//remove all contents of hifieldHolder
	while ( hifieldHolder.hasChildNodes() ) { hifieldHolder.removeChild(hifieldHolder.firstChild);}
	generateHighlight();
	alert('Highlight phrases updated');
	evt.preventDefault();
}
function generateHighlight() {
	var	existingWords = eval(GM_getValue('highlightPhrases',"[]"));
	if(existingWords.length > 0) {
		for(var i=0;i<existingWords.length;i++) {
			//generate number of fields
			var hifield = document.createElement('input');
			with(hifield) {
				type="text";
				className = "highlightField";
				value=existingWords[i];
			}
			hifieldHolder.appendChild(hifield);
			hifieldHolder.appendChild(document.createElement('br'));
		}
	} else {
		createBlankHighlight();
	}
}