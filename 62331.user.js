// ==UserScript==
// @name          StoryFinder
// @namespace     http://crusier.fortunecity.com
// @description   Extract the main story from news web pages
// @include       *
// ==/UserScript==

// This script extracts the text of the story on a news page and
// displays it in an overlaying window.  It is intended to be used
// with screen readers to read stories aloud without reading all of
// the garbage on the page like navigation, advertisements, etc.
//
// If a story is found, it places a small button in the upper right of
// the page and pressing that button shows the story.
//
// Users of screen reader software can then highlight the whole story and
// have the screen reader read it.  For example, if you set your screen reader
// to start reading highlighted text with the pad-plus key, then you can
//
//   1) press the 'story' button created by this script.
//   2) Press pad-plus to start reading the story aloud.
//      Some screen readers like TextAloud read from the clipboard dircetly so use CTRL-C instead.
//
// This was tested with Natural Reader free edition.  Use a commercial voice.  The free ones stink!!
//
// The way this script works is to recursively walk the DOM and build up
// text strings at each DIV level.  The longest string which contains a period
// (which means it has a sentence in it) is assumed to be the story.
//
// This script does not work on all pages (like the New York Times) and since some pages place
// different parts of the story in different DIV sections, you may get only part of the story.
//
// If you don't want the text automatically highlighted, comment out or remove the .select() call below.

maxdepth=0;
var t = "";
var lines = [];
var obj=document.body;
parse(obj,0);
var maxt='';
var k;
for (k=0;k<lines.length;k++) // if has sentences, remove spaces, else nullify
    lines[k]=((!lines[k]) || lines[k].indexOf('.')==-1)?"":(lines[k].replace(/[ \t]+/g," ").replace(/[\s]*[\n]{1,}/g,"\n\n"));
for (k=0;k<lines.length;k++)
  if (lines[k].length>maxt.length)
     maxt = lines[k];
function parse(obj,depth)
{
	if (!obj) return;
	if (obj.nodeName == 'DIV'|| obj.nodeName == 'TABLE'|| obj.nodeName == 'FORM') {
	  depth= ++maxdepth;
        lines[depth] = "";
  }
	   if (obj.nodeType>3)
   // GM_log(obj.nodeName+":"+obj.nodeType);
    if (!lines[depth])
        lines[depth] = "";
    var kids = obj.childNodes;

    for (var k = 0; k < kids.length; k++) {
        if (kids[k].nodeName == "P") lines[depth]+='\n\n';
        if (kids[k].nodeName == "#comment");
        else if (kids[k].nodeName == "STYLE");
        else if (kids[k].nodeName == "SCRIPT");
        else if (kids[k].nodeName == "NOSCRIPT");
        else if (kids[k].nodeName == "FORM");
        else
           if (kids[k].nodeValue && (kids[k].nodeName != 'DIV'))
                    lines[depth] += kids[k].nodeValue+" ";
        else
           parse(kids[k], depth);
    }
}

// function for when the show story button is pressed. Shows hidden text area div and hids show button.
// this is also used to hide the story div.
strshow = function(){
	var obj=document.getElementById("storyardiv");
	obj.style.display=(obj.style.display=='none')?"block":"none";
	document.getElementById("storybtn1").value=(obj.style.display=='none')?"Show story":"Hide story";
	document.getElementById("stryshbtndiv").style.display=(obj.style.display=='none')?"block":"none";
	document.getElementById("storytxta").focus();
	document.getElementById("storytxta").select();  // ** comment this out to avoid highlighting the text ****
}

resize = function(){
	var obj=document.getElementById("storyardiv");
	var style = "height:95%;position:absolute;top:.2em;right:.2em;z-index:30;background:#fff;padding:0.3em;";
    style += "border:black solid 1px;-moz-border-radius:3px ";
    obj.setAttribute('style',style);
}

// from here, create the window to show the story.  Initially it is hidden by display=none.
maxt=maxt.replace(/&nbsp;/g," ").replace(/&lt;/g," ").replace(/&gt;/g," ").replace(/&amp;/g," ");
if (maxt != '' && maxt.replace(/\W+/g,' ').split(' ').length>100) // story of > 100 words found
{

    //alert(maxt.replace(/\W+/g,' ').split(' ')[3]);

    var stryshbtndiv = document.createElement('div');

    var style = "position:absolute;top:.2em;right:.2em;z-index:30;background:#fff;padding:0.3em;";
    style += "border:black solid 1px;-moz-border-radius:3px;white-space:nowrap";
    stryshbtndiv.setAttribute('style', style);
    stryshbtndiv.setAttribute('id', 'stryshbtndiv');
    stryshbtndiv.addEventListener('resize',resize,true);

	var storybtn1 = document.createElement('input');
    storybtn1.setAttribute('type','button');
    storybtn1.setAttribute('value','Show story ('+ maxt.replace(/\W+/g,' ').split(' ').length+' words)');
    storybtn1.setAttribute('id','storybtn1');
    storybtn1.addEventListener('click',strshow,true);

	var storybtn2 = document.createElement('input');
    storybtn2.setAttribute('style','position:relative;right:4px;top:4px;float:right;margin:2px;border:1px solid blue');
    storybtn2.setAttribute('type','button');
    storybtn2.setAttribute('value','Hide story');
    storybtn2.setAttribute('id','storybtn2');
    storybtn2.addEventListener('click',strshow,true);


	var storyardiv = document.createElement('div');
	style="width:95%;height:95%;top:2%;left:2%;position:absolute;background:white;border:5px double #689";
	style+=";display:none;z-Index:99999;-moz-border-radius: 9px;padding-left:1em;padding-right:6px";
    storyardiv.setAttribute('id','storyardiv');
    storyardiv.setAttribute('style',style);

	var storytxta = document.createElement('textarea');
    storytxta.setAttribute('id','storytxta');
	style="width:99%;height:95%;position:relative;font-size:10pt;color:black;background:transparent;border:0px solid #469";
	style+=';font-family:helvetica;';
    storytxta.setAttribute('style',style);
    storytxta.setAttribute('readonly',true);
    storytxta.value=maxt;

    storyardiv.appendChild(storybtn2);
    storyardiv.appendChild(storytxta);
    document.body.appendChild(storyardiv);

    stryshbtndiv.appendChild(storybtn1);
    document.body.appendChild(stryshbtndiv);
}