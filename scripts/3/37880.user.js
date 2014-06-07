// ==UserScript==
// @name           Scribbly Collection
// @namespace      x
// @description    Lists all the available Scribbly comics
// @include        *scribbly.nl, *scribbly.nl/
// ==/UserScript==

// Shows the newest comic if an ad is shown instead
unsafeWindow.strookje('eind');


//Collect all the image paths that are hard-coded in the page (unfortunately there's no fixed naming scheme)
var numberofcomics = document.forms.namedItem('stripform').elements.namedItem('stripcount').value;
var lastcomic = numberofcomics;
var beelden=new Array();
var html = document.documentElement.innerHTML;
var searchStart = "beelden[0]='";
var searchEnd = ".gif';";
var beeldencode = html.substring(html.indexOf(searchStart),(html.lastIndexOf(searchEnd)+searchEnd.length));
eval(beeldencode);

//Place a centered div at the bottom of the page in which the comics will be placed
scribFrame = document.createElement("DIV");
scribFrame.name = "comic_list";
scribFrame.id = "comic_list";
scribFrame.innerHTML=' ';
scribFrame.style.width = "700px";
scribFrame.style.marginLeft = "auto";
scribFrame.style.marginRight = "auto";
scribFrame.addEventListener("click", function(event) { showmore(5) }, false);
document.body.insertBefore(scribFrame, document.body.lastChild);

//Append a number of comics to the end of the table
function showmore(num) {
  var i = 0;
  var j = lastcomic;
  while(i<num && lastcomic>-1){
    if(j<beelden.length) scribFrame.innerHTML = scribFrame.innerHTML+'<br /><img name="comic_'+(j-i)+'" src="'+beelden[j-i]+'" />';
    i++;
    lastcomic--;
  }
}

//Show the five newest comics
showmore(5);
