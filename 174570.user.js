// ==UserScript==
// @name 		   BSCF : sdgardne AR selections.
// @namespace	   http://supportforums.blackberry.com/t5/
// @description	version 0.9a
// @include		http://supportforums.blackberry.com/t5/notifications/notifymoderatorpage/message-uid/*
// ==/UserScript==


var MyMacros = [
  "Personal information is displayed"
, "This is spam , or potentially harmful warez"
, "Please lock this thread as it is a duplicate (I have posted a link to the primary thread)."
, "Please:\n1) extract this message into a new discussion\n2) rename it to: XXXXXX\n3) move it to the YYYYYY board.\n4) please move my reply with it"
, "---"
, "Please move this discussion to the appropriate 'Developer' board"
, "Please move this discussion to the 'BES/BES10' board"
, "Please move this discussion to the 'Desktop Software for PC/MAC' board"
, "Please move this discussion to the BB10 'LINK' board"
, "Please move this discussion to the 'Legacy/BB10 Device Software' board"
, "---"
, "Please move this discussion to the 'Legacy/BB10 BBWorld' board"
, "Please move this discussion to the 'Legacy/BB10 Downloaded Apps' board"
, "Please move this discussion to the 'Legacy/BB10 Accessories' board"
, "---"
, "Please move this discussion to the Legacy smartphone 'xxxxx' board"
, "Please move this discussion to the BB10 smartphone 'Z10/Q10/Q5' board"
, "Please move this discussion to the 'xxxxx' board"
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