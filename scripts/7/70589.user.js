// ==UserScript==
// @name GLB_AutoBold
// @namespace GLB_AutoBold
// @include http://goallineblitz.com/game/forum_thread_list.pl*
// @include http://goallineblitz.com/game/forum_thread.pl*
// ==/UserScript==

document.addEventListener('submit', function(event) {

var them = document.getElementsByTagName("textarea");
for(var i = them.length - 1; i >= 0; i--) {
addChar(them[i],"B");
}

}
, true);


function addChar(txtarea,charac){

var intEnd = txtarea.value.indexOf("[QUOTE");
if(intEnd==-1)
{
	var intEnd = txtarea.value.length;
}
	
var intStart = 0;

var Start = (txtarea.value).substring(0,intStart);
var End = (txtarea.value).substring(intEnd);

var text = "["+ charac +"]";
text += (txtarea.value).substring(intStart,intEnd);
text += "[/"+ charac +"]";

txtarea.value = Start + text + End;

//
if (txtarea.value.indexOf("[/QUOTE]")>-1)
{
var intEnd = txtarea.value.length;
var intStart = txtarea.value.lastIndexOf("[/QUOTE]")+8;

var Start = (txtarea.value).substring(0,intStart);
var End = (txtarea.value).substring(intEnd);

var text = "["+ charac +"]";
text += (txtarea.value).substring(intStart,intEnd);
text += "[/"+ charac +"]";

txtarea.value = Start + text + End;
}

};