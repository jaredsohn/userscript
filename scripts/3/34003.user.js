// Fix the Reg by Tim Williams (tim@my-place.org.uk)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Fix The Register
// @namespace     http://www.cs.bham.ac.uk/~tmw/fix-the-reg/
// @description   Fixes the fixed width horror that is the new El Reg website. Also, if you use the user agent switcher with the user agent 'Mozilla Firefox with Register fixed width killer', they will know we are all doing this and perhaps change their design.
// @include       http://www.theregister.co.uk/*
// @include       http://www.reghardware.co.uk/*
// ==/UserScript==


var frameWidth=0;
var frameHeight=0;
calculateFrameSize();

document.getElementById("page").style.width=(frameWidth-20)+"px";
document.getElementById("main-col").style.width=(frameWidth-400)+"px";

var midTeaser="<br /><br /><div id=\"teaser-mid\" class=\"teaser-boxed\">"+document.getElementById("teaser-mid").innerHTML+"</div><br /><br /><br /><br /><br /><br /><br />";
var topTeaser=document.getElementById("teaser-top").innerHTML;

document.getElementById("teaser-mid-outer").innerHTML="";

document.getElementById("teaser-top").style.width=(frameWidth-620)+"px";
document.getElementById("teaser-top").innerHTML=topTeaser+"\n"+midTeaser;

var teaserTop=getRule(document.styleSheets, "#teaser-top");
//teaserTop.minHeight="160px";

var teaserBox=document.getElementById("teaser-mid").style;
teaserBox.position="absolute";
teaserBox.left="-140px";

var teaserBoxStory=getRule(document.styleSheets, "div.teaser-boxed .story-ref");
teaserBoxStory.marginLeft="160px";
teaserBoxStory.width="160px";

var storyRef=getRule(document.styleSheets, ".index .story-ref");
storyRef.paddingLeft="0px";
storyRef.minHeight="120px";

var rowStart=getRule(document.styleSheets, ".index .story-ref.row-start");
rowStart.clear="";

var last=getRule(document.styleSheets, "div.teaser-boxed .story-ref.last");
last.float="";

function getRule(sheets, rule, property)
{
 for(var loop=sheets.length-1; loop>-1; loop--)
 {
  var rules=sheets[loop].cssRules? sheets[loop].cssRules: sheets[loop].rules;
  for (i=0; i<rules.length; i++)
  {
   if(rules[i].selectorText.toLowerCase()==rule)
   {
    return rules[i].style;
   }
  }
 }
 return null;
}

function calculateFrameSize()
{

 /*****Get correct inner window size. IE works both differently and inconsistently compared to other browsers*****/
 if( typeof( window.innerWidth ) == 'number' )
 {
  //Non-IE
  frameWidth = window.innerWidth;
  frameHeight = window.innerHeight;
 }
 else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) )
 {
  //IE 6+ in 'standards compliant mode'
  frameWidth = document.documentElement.clientWidth;
  frameHeight = document.documentElement.clientHeight;
 }
 else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) )
 {
  //IE 4 compatible
  frameWidth = document.body.clientWidth;
  frameHeight = document.body.clientHeight;
 }

}
