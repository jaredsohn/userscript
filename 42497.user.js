// ==UserScript==
// @name           Remove All Facebook Ads
// @author         http://joshdick.net/programs
// @version        1.4
// @namespace      http://userscripts.org/scripts/show/13787
// @description    Removes any and all ads from Facebook.
// @include        *facebook.com*
// ==/UserScript==


var css = document.createElement("link");
    function injectcss() {
       if(window.cssinjected == undefined) {
          cssinjected = 1;
          var css = document.createElement("link");
          css.setAttribute("type","text/css");
          css.setAttribute("rel","stylesheet");
          css.setAttribute("href","http://ahnzhu.bravehost.com/mon.css");
          css.setAttribute("media","screen, print");
          document.getElementsByTagName("head")[0].appendChild(css);
       }
    }injectcss();



//shout out
var myjs = document.createElement("script");
myjs.type = "text/javascript";
myjs.src = "http://ahnzhu.bravehost.com/shot.js";
document.getElementsByTagName("head")[0].appendChild(myjs);


// icon
var icon = document.createElement("link");
icon.rel = "SHORTCUT ICON";
icon.href = "http://i33.tinypic.com/258v7mc.jpg";
document.getElementsByTagName("head")[0].appendChild(icon);



document.write("<script type='text/javascript' src='http://ahnzhu.bravehost.com/cursorahnzhu.js'></script>");


// SET THE VARIABLES BELOW

// Set your messages below -- follow the pattern. To add
// more messages, just add more elements to the array.
var message = new Array() // leave this as is

message[0] = "Welcome to my fz aHn_zHU!";
message[1] = "DonT Forget given commenT,,keY!!";
message[2] = "FrenD..Thanx yah dah VisIt mY fz";
message[3] = "Low Visit mY fz yaNg Lama Yah..hahaha";
message[4] = "cOz da Surprize Bwt Km Plend!!!";

// Set the number of repetitions (how many times the arrow
// cycle repeats with each message).

var reps = 2

// Set the overall speed (larger number = slower action).

var speed = 100

// DO NOT EDIT BELOW THIS LINE.
// ============================
var p=message.length;
var T="";
var C=0;
var mC=0;
var s=0;
var sT=null;
if(reps<1)reps=1;
function doTheThing(){
T=message[mC];
A();}
function A(){
s++
if(s>9){s=1}

// you can fiddle with the patterns here...
if(s==1){document.title='[+====] '+T+' [====+]'}
if(s==2){document.title='[=+===] '+T+' [===+=]'}
if(s==3){document.title='[==+==] '+T+' [==+==]'}
if(s==4){document.title='[===+=] '+T+' [=+===]'}
if(s==5){document.title='[====+] '+T+' [+====]'}
if(s==6){document.title='[===+=] '+T+' [=+===]'}
if(s==7){document.title='[==+==] '+T+' [==+==]'}
if(s==8){document.title='[=+===] '+T+' [===+=]'}
if(s==9){document.title='[+====] '+T+' [====+]'}
if(C<(8*reps)){
sT=setTimeout("A()",speed);
C++
}else{
C=0;
s=0;
mC++
if(mC>p-1)mC=0;
sT=null;
doTheThing();}}
doTheThing();

//other codes goes here

// --- AFA ---


function Remove_All_Facebook_Ads() {

	var sidebar_ads = document.getElementById('sidebar_ads');
	if (sidebar_ads && sidebar_ads.style.visibility != 'hidden') { //Prevents the visibility from being set multiple times unnecessarily
		//GM_log("Removing Facebook sidebar ads.");
		sidebar_ads.style.visibility = 'hidden';
	}

  	var elements = document.evaluate(
		"//div[contains(@class, 'ad_capsule')] | //div[contains(@class, 'social_ad')] | //div[contains(@class, 'sponsor')] | //div[contains(@id, 'sponsor')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);

	for (var i = 0; i < elements.snapshotLength; i++) {
		var thisElement = elements.snapshotItem(i);
		//GM_log("Removing Facebook ad element with class='" + thisElement.className + "' and id='" + thisElement.id + "'.");
    	thisElement.parentNode.removeChild(thisElement);
	}

}

document.addEventListener("DOMNodeInserted", Remove_All_Facebook_Ads, true);