// ==UserScript==
// @name 		   BSCF : add macros to the "report inappropriate" form.
// @namespace	   http://supportforums.blackberry.com/t5/
// @description	version 0.9
// @include		http://supportforums.blackberry.com/t5/notifications/notifymoderatorpage/message-uid/*
// ==/UserScript==


var MyMacros = [
  "Personal information is displayed"
, "This is spam , or potentially harmful warez"
, "Please delete this thread as it is a duplicate of a thread which has already been answered."
, "Please delete this single post as it is a duplicate of the user's other post which has already been answered."
, "Please move this discussion to the 'Social Lounge' board"
, "Please:\n1) extract this message into a new discussion\n2) rename it to: XXXXXX\n3) move it to the YYYYYY board.\n4) please move my reply with it"
, "---"
, "Please move this discussion to the 'XXXXXX development' board"
, "Please move this discussion to the 'BES' board"
, "Please move this discussion to the 'Desktop Software for Windows' board"
, "---"
, "Please move this discussion to the 'AppWorld general' board"
, "Please move this discussion to the 'Downloaded Apps' board"
, "Please move this discussion to the 'Accessories' board"
, "---"
, "Please move this discussion to the smartphone 'Bold' board"
, "Please move this discussion to the smartphone 'Curve' board"
, "Please move this discussion to the smartphone 'Torch' board"
];

function insertMacro (i) {
	if (i<= MyMacros.length-1) {
		document.evaluate( "//textarea[@name='additionalInformation']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0).value = MyMacros[i];
	}
	document.evaluate( "//select[@name='xandrexReportContent']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0).selectedIndex = 0;
}

var mySelect = document.createElement('select');
	mySelect.setAttribute('name','xandrexReportContent');
	mySelect.addEventListener('click', function(){ insertMacro(this.options[this.selectedIndex].value) } , false);
var OPT = document.createElement('option');
	OPT.setAttribute('value','');
	OPT.appendChild(document.createTextNode('Select...'));
	OPT.setAttribute('selected','selected');
mySelect.appendChild(OPT);
for ( var i = 0 ; i< MyMacros.length ; i++) {
	var OPT = document.createElement('option');
		OPT.value = i;
		OPT.appendChild(document.createTextNode(MyMacros[i]));
	mySelect.appendChild(OPT);
}
document.getElementsByTagName('fieldset')[0].appendChild(mySelect);