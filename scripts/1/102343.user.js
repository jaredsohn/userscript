// ==UserScript==
// @name           Youtube link bin
// @namespace      http://userscripts.org/users/304720
// @description    gets the current url and copies it into a link bin. letting you quickly add stuff then highlight everything and paste into a download program, the links inside the bin 
// @include        http://www.youtube.com/watch*
// @Author         Stephen Stringfellow
// @version        1.0
// ==/UserScript==


var footerArea = document.getElementById('footer');

var youtubelinkbin = document.createElement('a');


//most stuff

youtubelinkbin.innerHTML += '<div style="color:black;margin-left:auto;margin-right:auto;text-align:center;"><h3><u><span style = "color:red">Youtube</span> link bin</u></h3><a id = "addlink" href = "Javascript:" style = "margin-left:10px;" >add current link</a><a style = "margin-left:10px;" href = "javascript:" id = "binlink">hide</a><a href = "javascript:" style = "margin-left:10px;" id = "selectlink" > select all</a><a href = "javascript:" style = "margin-left:10px;" id = "resetlink" >Reset links</a><br /><br /><div id = "divbin" style = "width:450px;margin-right:auto;margin-left:auto;background-color:white;border:solid 1px black" height:100px;>&nbsp;</div></div';


//adding

footerArea.parentNode.insertBefore(youtubelinkbin.firstChild, footerArea);

//adding click events

if (document.addEventListener) { 

document.getElementById('binlink').addEventListener('click', showorhidebin, false);
document.getElementById('addlink').addEventListener('click', addlink_func, false);
document.getElementById('selectlink').addEventListener('click', selectlink_func, false);
document.getElementById('resetlink').addEventListener('click', confirm_reset, false);
} else {
//because you never know..
document.getElementById('binlink').attachEvent('onclick', showorhidebin, false);
document.getElementById('addlink').attachEvent('onclick', addlink_func, false);
document.getElementById('selectlink').attachEvent('onclick', selectlink_func, false);
document.getElementById('resetlink').attachEvent('onclick', confirm_reset, false);
}

//display links
document.getElementById("divbin").innerHTML = window.name + "<br />";

//get url
grabbed_link = window.location;

//add link
function addlink_func() {
window.name += grabbed_link + "<br />"
document.getElementById("divbin").innerHTML = window.name + "<br />";
}

//hide or show
var visible_state = 0;
function showorhidebin() {
if (visible_state == 0) {
document.getElementById("divbin").style.display = "none";
document.getElementById("binlink").firstChild.nodeValue = "show";
visible_state++;
} else {
document.getElementById("divbin").style.display = "block";
document.getElementById("binlink").firstChild.nodeValue = "hide";
visible_state--;
}
}

//select all
function selectlink_func() {
var range = document.createRange();
range.selectNode(document.getElementById('divbin'));
window.getSelection().addRange(range);
}

//failsafe
function confirm_reset() {
var confirmbox = prompt("are you sure you want to remove everything from the link bin?\ntype 'yes' to confirm","");
if (confirmbox == "yes"||"YES") {
reset_func();
}
}
//reset links
function reset_func() {
window.name = "";
document.getElementById("divbin").innerHTML = "<div id = 'divbin' style = 'width:450px;margin-right:auto;margin-left:auto;background-color:white;border:solid 1px black' height:100px;>&nbsp;</div>";
}


