// ==UserScript==
// @name            Sledzik Hidder
// @namespace       sledzik
// @include         http://nasza-klasa.pl/*
// ==/UserScript==


var logo = document.createElement("div");
logo.innerHTML = '<div id=sledzik_hidder>'+
'<script language="JavaScript">'+
'function setVisibility(id, visibility) {'+
'document.getElementById(id).style.display = visibility;'+
'}'+
'setVisibility(\'sledzik_box\', \'none\');'+
'</script>'+
'<style type="text/css">'+
'input.btn { '+
'	  color:#0000000; '+
'	  font: normal 70%;'+
'	  border: 1px solid; '+
'	  border-color: #696 #363 #363 #696; '+
'	} '+
'	</style>'+
'<center>'+
'<input type=button name=type class=btn value=\'Sledzik\' onclick=\"setVisibility(\'sledzik_box\', \'inline\');\";>'+
'<input type=button name=type class=btn value=\'Bez ryb\' onclick=\"setVisibility(\'sledzik_box\', \'none\');\";>'+
'</center>';
var lolz;
lolz = document.getElementById('content_main')
if (lolz){
document.body.insertBefore(logo, document.body.firstChild);
}