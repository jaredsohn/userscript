// ==UserScript==
// @name           Insert :awsm:
// @namespace      test
// @include        http://forum.tribalwars.se/newreply.php?do=newreply*
// @include        http://forum.tribalwars.se/editpost.php?do=updatepost*
// ==/UserScript==

function e() {
var field=document.getElementById("vB_Editor_001_smiliebox");
if(typeof(field)=='undefined') {
	setTimeout(e, 200);
}else {

var table=field.getElementsByTagName("table");
var tr=table[0].getElementsByTagName("tr");
var td=tr[tr.length-1].getElementsByTagName("td");
td[td.length-1].innerHTML = '<a href="javascript:window.document.getElementById(\'vB_Editor_001_textarea\').value+=\'[IMG]http://i34.tinypic.com/30sdf1c.png[/IMG]\';end();"><img src="http://i34.tinypic.com/30sdf1c.png" id="vB_Editor_001_smilie_9" alt=":eek:" title=":awsm:" border="0" class="inlineimg" /></a>';

end();
}
}

e();