// ==UserScript==
// @name           LJ Old Update Journal Page
// @namespace      http://community.livejournal.com/lj_nifty/150320.html
// @description    Fixes the new LiveJournal update journal page to look like the old one from December 2006.
// @include        http://www.livejournal.com/update.bml*
// @include        http://www.livejournal.com/editjournal.bml*
// ==/UserScript==

var x;

if (getEle('currentdate')) {
	// probably an update page, not a return from form	
	var frm = getEle('prop_current_moodid').form;

getEle('updateForm').style.maxWidth='none ! important';

divmodifydate = getEle('modifydate');

blankspan = getEle('currentdate').cloneNode(false);

// remove annoying "post with these 15 different clients"
getEle('infobox').style.display='none';

// change poster verbage
divpostas = getEle('remotelogin');
if (getEle('current_username')) {
	usernm = getEle('current_username').innerHTML;
	divpostas.innerHTML = '<label for="current_username" class="left">Poster:</label> You are currently logged in as <b>'+usernm+'</b>.<br>To post as another user, click <a href="update.bml?altlogin=1">here</a>.';
}


// it's called "backdated", people
labels = document.getElementsByTagName('label');
for (x = 0; x < labels.length; x++) {
	if (labels[x].getAttribute('for') == 'prop_opt_backdated') {
		labels[x].innerHTML = 'Entry is Backdated';
	}
	labels[x].style.lineHeight='100%';
}


// define grey boxes at bottom
divsubmitbox = getEle('submitbar');
divgreybox = getEle('options');
divmybox = divgreybox.cloneNode(false);
divmybox.style.padding = '0px';
divgreybox.parentNode.insertBefore(divmybox, divgreybox);

// just so i can see
//divgreybox.style.border='2px solid red';
//divmybox.style.border='2px solid green';

// divide up my box to two columns
divmybox.innerHTML='<table border=0 cellspacing=0 cellpadding=0 width="100%" bgcolor="#dfdfdf"><tr><td id="mytableleft" valign=top></td><td id="mytableright" valign=top style="border-left: 1px dashed grey"></td><td id="mytableuserpic" valign=top></td></tr></table>';
divmyleft = getEle('mytableleft');
divmyright = getEle('mytableright');
divmyleft.innerHTML='<table id="mylefttable"></table>';
divmylefttbl = getEle('mylefttable');
divmyright.innerHTML='<table id="myrighttable"></table>';
divmyrighttbl = getEle('myrighttable');

// move use journal dropdown
if (getEle('usejournal')) {
	usejournaltext = blankspan.cloneNode(false);
	usejournaltext.id = 'usejournaltext';
	usejournaltext.innerHTML = '<b>Post to:</b> ';
	divsubmitbox.appendChild(usejournaltext);
	moveNode(getEle('usejournal'), divsubmitbox);
	removeNode(getEle('usejournal_list'));
	getEle('usejournal').style.cssFloat='none ! important';
}

//move submit buttons
if (getEle('formsubmit')) {
	removeNode(getEle('formsubmit'));
	divsubmitbox.innerHTML += '<input type="submit" name="action:update" value="Update Journal" tabindex="27" id="formsubmit" class="submit" onclick="return sendForm(&#39;updateForm&#39;);" />';
} else {
	for (x = 0; x < frm.elements.length; x++) {
		if ((frm.elements[x].type=='submit') && ((frm.elements[x].value=='Save Entry') || (frm.elements[x].value=='Delete Entry'))) {
			removeNode(frm.elements[x]);
			x--;
		}
	}
	divsubmitbox.innerHTML += '<input type="submit" name="action:save" value="Save Entry" tabindex="26" />&nbsp;<input type="submit" name="action:delete" value="Delete Entry" tabindex="27" onclick="return confirm(&#39;Are you sure you want to delete this entry?&#39;)" />';
}
divsubmitbox.innerHTML += '<input type="submit" name="action:update" class="hidden_submit" /> <input type="submit" name="action:spellcheck" value="Spell check" /> <input type="button" value="Preview" onclick="entryPreview(this.form)"  />';

// move subject up
getEle('metainfo').style.width='auto';
getEle('metainfo').style.marginBottom='0px';


//always HTML
getEle('entry-tabs').style.display='none';

// remove image button, remove auto-formatting checkbox to replace with dropdown later
getEle('htmltools').style.display='none';
diveventformat = removeNode(getEle('event_format'));

// remove blue border on top of postbox
getEle('entry').style.backgroundImage='none';
	

// remove border specifications to let it fall to default
// doesn't work, restricted
/*
rules = document.styleSheets[0].cssRules;
for (x = 0; x < rules.length; x++) {
	delrule = false
	delrule |= rules[x].selectorText == '#draft-container';

	if (delrule) {
		document.styleSheets[0].deleteRule(x);
		x--;
	}
}
*/
/*
diveventlabel = blankspan.cloneNode(false);
diveventlabel.id = 'diveventlabel';
diveventlabel.innerHTML = 'Event:';
getEle('draft-container').insertBefore(diveventlabel, getEle('draft'));
*/
getEle('draft-container').style.borderTop='1px solid #ccc';
getEle('draft').style.fontFamily='monospace';
getEle('draft').style.fontSize='100%';

// move security
divsecuritylabel = blankspan.cloneNode(false);
divsecuritylabel.id = 'divsecuritylabel';
divsecuritylabel.innerHTML = '<label>Security:</label> ';
getEle('security_container').removeChild(getEle('security_container').firstChild.nextSibling);

newrow = divmylefttbl.insertRow(divmylefttbl.rows.length);
newcell = newrow.insertCell(0);
newcell.appendChild(divsecuritylabel);
newcell.style.verticalAlign='top';
newcell = newrow.insertCell(1);
moveNode(getEle('security_container'), newcell);
getEle('security_container').id = 'security_container2';  // id change to kill css rule
//getEle('custom_boxes').style.cssFloat='none ! important';
//getEle('custom_boxes').style.clear='none ! important';

getEle('security_public').text='Public';
getEle('security_public').style.paddingLeft='18px';
getEle('security_public').style.backgroundImage="url('http://stat.livejournal.com/img/userinfo.gif');";
getEle('security_public').style.backgroundRepeat='no-repeat';
getEle('security_private').text='Private';
getEle('security_private').style.backgroundImage="url('http://stat.livejournal.com/img/icon_private.gif');";
getEle('security_private').style.backgroundRepeat='no-repeat';
getEle('security_private').style.paddingLeft='18px';
getEle('security_friends').text='Friends';
getEle('security_friends').style.backgroundImage="url('http://stat.livejournal.com/img/icon_protected.gif');";
getEle('security_friends').style.backgroundRepeat='no-repeat';
getEle('security_friends').style.paddingLeft='18px';
if (getEle('security_custom')) {
	getEle('security_custom').style.backgroundImage="url('http://stat.livejournal.com/img/icon_protected.gif');";
	getEle('security_custom').style.backgroundRepeat='no-repeat';
	getEle('security_custom').style.paddingLeft='18px';
}


// create text formatting
newrow = divmylefttbl.insertRow(divmylefttbl.rows.length);
newcell = newrow.insertCell(0);
newcell.innerHTML="<label for='event_format'>Text Formatting:</label>";
newcell = newrow.insertCell(1);
newcell.innerHTML='<select name="event_format" id="event_format"><option value="" id="event_format_auto">Auto</option><option value="preformatted" id="event_format_preformatted">None</option></select>';

// move music
divmusiclabel = blankspan.cloneNode(false);
divmusiclabel.id = 'divmusiclabel';
divmusiclabel.innerHTML = '<label>Music:</label> ';

newrow = divmylefttbl.insertRow(divmylefttbl.rows.length);
newcell = newrow.insertCell(0);
newcell.appendChild(divmusiclabel);
newcell = newrow.insertCell(1);
moveNode(getEle('prop_current_music'), newcell);
with (getEle('prop_current_music')) {
	id='prop_current_music2'; // id change to kill css rule
	style.cssFloat='none ! important';
	style.border='1px solid black';
	style.borderTop='1px solid black';
	style.borderLeft='1px solid black';
	style.backgroundImage='none';
	style.backgroundColor='#FFFFFF';
}


//move mood
divmoodlabel = blankspan.cloneNode(false);
divmoodlabel.id = 'divmoodlabel';
divmoodlabel.innerHTML = '<label>Mood:</label> ';
getEle('prop_mood_wrapper').removeChild(getEle('prop_mood_wrapper').firstChild.nextSibling);

newrow = divmylefttbl.insertRow(divmylefttbl.rows.length);
newcell = newrow.insertCell(0);
newcell.appendChild(divmoodlabel);
newcell.style.verticalAlign='top';
newcell = newrow.insertCell(1);
moveNode(getEle('prop_mood_wrapper'), newcell);
getEle('prop_mood_wrapper').style.width='auto ! important';
getEle('prop_current_moodid').style.width='auto ! important';
getEle('prop_current_moodid').style.cssFloat='none ! important';
with (getEle('prop_current_mood')) {
 	style.cssFloat='none ! important';
	style.border='1px solid black';
	style.borderTop='1px solid black';
	style.borderLeft='1px solid black';
	style.backgroundImage='none';
	style.backgroundColor='#FFFFFF';
	style.width='auto ! important';
}

with (getEle('mood_preview').style) {
	position='relative ! important';
	left='auto ! important';
}

//getEle('prop_current_mood').id='prop_current_mood2'; // id change to kill css rule
//getEle('prop_current_moodid').id='prop_current_moodid2'; // id change to kill css rule

//move Location
divlocationlabel = blankspan.cloneNode(false);
divlocationlabel.id = 'divlocationlabel';
divlocationlabel.innerHTML = '<label>Location:</label> ';

newrow = divmylefttbl.insertRow(divmylefttbl.rows.length);
newcell = newrow.insertCell(0);
newcell.appendChild(divlocationlabel);
newcell = newrow.insertCell(1);
moveNode(getEle('prop_current_location'), newcell);
with (getEle('prop_current_location')) {
	id='prop_current_location2'; // id change to kill css rule
	style.border='1px solid black';
	style.borderTop='1px solid black';
	style.borderLeft='1px solid black';
	style.backgroundImage='none';
	style.backgroundColor='#FFFFFF';
	style.width='auto ! important';
}



// create tags
divtagslabel = blankspan.cloneNode(false);
divtagslabel.id = 'divtagslabel';
divtagslabel.innerHTML = '<label>Tags:</label> ';

newrow = divmylefttbl.insertRow(divmylefttbl.rows.length);
newcell = newrow.insertCell(0);
newcell.appendChild(divtagslabel);
newcell = newrow.insertCell(1);
newcell.innerHTML = '<input type="text" maxlength="255" tabindex="17" value="" name="prop_taglist" class="text" id="prop_taglist" size="35" /><a href="http://www.livejournal.com/support/faqbrowse.bml?faqid=226" class="helplink"><img src="http://stat.livejournal.com/img/help.gif" alt="Help" title="Help" width="14" height="14" border="0" /></a>';
with (getEle('prop_taglist')) {
	//id='prop_taglist2'; // id change to kill css rule
 	//style.cssFloat='none ! important';
	style.border='1px solid black';
	style.borderTop='1px solid black';
	style.borderLeft='1px solid black';
	style.backgroundImage='none';
	style.backgroundColor='#FFFFFF';
	style.width='auto ! important';
}


// move backdate, need to rip html
divbdlabel = blankspan.cloneNode(false);
divbdlabel.id = 'divbdlabel';
divbdlabel.innerHTML = '<label>Entry is Backdated:</label> ';

divmodifydate.innerHTML = divmodifydate.innerHTML.substr(0,divmodifydate.innerHTML.indexOf('<input tabindex')-8); //-8 to kill the <br />

newrow = divmyrighttbl.insertRow(divmyrighttbl.rows.length);
newcell = newrow.insertCell(0);
newcell.appendChild(divbdlabel);
newcell = newrow.insertCell(1);
newcell.textAlign='left';
newcell.innerHTML = '<input type="checkbox" value="1" style="float: left" name="prop_opt_backdated" id="prop_opt_backdated2" /><a href="http://www.livejournal.com/support/faqbrowse.bml?faqid=91" class="helplink"><img src="http://stat.livejournal.com/img/help.gif" alt="Help" title="Help" width="14" height="14" border="0" /></a>';
// id change to kill css rule

// move comment settings
divcslabel = blankspan.cloneNode(false);
divcslabel.id = 'divcslabel';
divcslabel.innerHTML = '<label>Comment Settings:</label> ';

newrow = divmyrighttbl.insertRow(divmyrighttbl.rows.length);
newcell = newrow.insertCell(0);
newcell.appendChild(divcslabel);
newcell = newrow.insertCell(1);
moveNode(getEle('comment_settings'), newcell);
/* if (getEle('comment_settings').options[0].label == 'Journal Default') 
	getEle('comment_settings').options[0].label = 'Default';
*/

//move comment screening
divcsrlabel = blankspan.cloneNode(false);
divcsrlabel.id = 'divcsrlabel';
divcsrlabel.innerHTML = '<label>Screen Comments:</label> ';

newrow = divmyrighttbl.insertRow(divmyrighttbl.rows.length);
newcell = newrow.insertCell(0);
newcell.appendChild(divcsrlabel);
newcell = newrow.insertCell(1);
moveNode(getEle('prop_opt_screening'), newcell);

if (getEle('userpic_select_wrapper')) {
	//move user picture icon
	divupilabel = blankspan.cloneNode(false);
	divupilabel.id = 'divupilabel';
	divupilabel.innerHTML = '<label>User Picture Icon:</label> ';
	
	newrow = divmyrighttbl.insertRow(divmyrighttbl.rows.length);
	newcell = newrow.insertCell(0);
	newcell.appendChild(divupilabel);
	newcell = newrow.insertCell(1);
	moveNode(getEle('userpic_select_wrapper'), newcell);
	getEle('userpic_select_wrapper').removeChild(getEle('userpic_select_wrapper').firstChild.nextSibling);
	moveNode(getEle('userpic'), getEle('mytableuserpic'));
	with (getEle('userpic_select_wrapper')) {
		for (x = 0; x < childNodes.length; x++) {
			if (childNodes[x].className == 'helplink') {
				childNodes[x].style.marginLeft='0px';
				//childNodes[x].style.marginTop='0px';
			}
		}
	}
}

// automatically allow date edit
getEle('currentdate').style.display='none';
getEle('modifydate').style.display='inline';

removeNode(divgreybox);

} //end function


//supporting functions
function removeNode(thenode) {
	if (thenode) thenode.parentNode.removeChild(thenode);
	return thenode;
}


function moveNode(thenode, tonode) {
	var n;
	n = removeNode(thenode);
	if (n) tonode.appendChild(n);
}

function getEle(nm) {
	// too lazy to type all the time
	return document.getElementById(nm);
}
