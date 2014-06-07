// ==UserScript==
// @name           Extra Spanish 
// @namespace      xpsdeset
// @include        http://translate.google.com/*
// ==/UserScript==


function insertAtCursor(myField, myValue) 
{

if (document.selection) 
{
myField.focus();
sel = document.selection.createRange();
sel.text = myValue;
}


else if (myField.selectionStart || myField.selectionStart == '0') 
{

var startPos = myField.selectionStart;
var endPos = myField.selectionEnd;
myField.value = myField.value.substring(0, startPos)+ myValue+ myField.value.substring(endPos, myField.value.length);
} else {
myField.value += myValue;
}
}




var dld=document.createElement("div");
dld.innerHTML= btn=(<r><![CDATA[

<button onclick="document.getElementById('source').value=document.getElementById('suggestion').value;ctr._swap()">swamp</button>
<button onclick="insertAtCursor(document.getElementById('source'),'&aacute;')">&aacute;</button>
<button onclick="insertAtCursor(document.getElementById('source'),'&eacute;')">&eacute;</button>
<button onclick="insertAtCursor(document.getElementById('source'),'&iacute;')">&iacute;</button>
<button onclick="insertAtCursor(document.getElementById('source'),'&oacute;')">&oacute;</button>
<button onclick="insertAtCursor(document.getElementById('source'),'&uacute;')">&uacute;</button>
<button onclick="insertAtCursor(document.getElementById('source'),'&ntilde;')">&ntilde;</button>
<button onclick="insertAtCursor(document.getElementById('source'),'&iquest;')">&iquest;</button>
<button onclick="insertAtCursor(document.getElementById('source'),'&iexcl;')">&iexcl;</button>



<script type="text/javascript">
<!--

//myField accepts an object reference, myValue accepts the text strint to add
function insertAtCursor(myField, myValue) {
//IE support
if (document.selection) {
myField.focus();

//in effect we are creating a text range with zero
//length at the cursor location and replacing it
//with myValue
sel = document.selection.createRange();
sel.text = myValue;
}

//Mozilla/Firefox/Netscape 7+ support
else if (myField.selectionStart || myField.selectionStart == '0') {

//Here we get the start and end points of the
//selection. Then we create substrings up to the
//start of the selection and from the end point
//of the selection to the end of the field value.
//Then we concatenate the first substring, myValue,
//and the second substring to get the new value.
var startPos = myField.selectionStart;
var endPos = myField.selectionEnd;
myField.value = myField.value.substring(0, startPos)+ myValue+ myField.value.substring(endPos, myField.value.length);
} else {
myField.value += myValue;
}
}

//-->
</script>
]]></r>).toString();

if(document.getElementById("zippyspan"))
document.getElementById("zippyspan").parentNode.insertBefore( dld ,document.getElementById("zippyspan").nextSibling);



