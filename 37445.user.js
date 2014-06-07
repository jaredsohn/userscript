// ==UserScript==
// @name           Facebook Mobwars Hitlist Script
// @namespace      http://hardreboot.net
// @description    Hitlist Bot
// @include http://apps.facebook.com/mobwars/hitlist/
// @include http://apps.facebook.com/mobwars/hitlist/index.php
// @include http://apps.new.facebook.com/mobwars/hitlist/
// @include http://apps.new.facebook.com/mobwars/hitlist/index.php 
// ==/UserScript==

var reload=true;
var pauseTime=Math.random()*4+1; //Randomizer thanks to FlyfishermanMike

// Get Page HTML
var pageHTML=document.documentElement.innerHTML;

// Set some variables
var healthPercentage = "30"; //Percentage to allow health to drop to
var healthTimeToWait = "120"; //Time to wait in seconds if health is below percentage
var StaminaAmount = "1"; //If stamina dips below this amount, then wait
var StaminaTimeToWait = "120"; //Time to wait in seconds if stamina falls below StaminaAmount
var LimitedPageTimeToWait = "120"; //Time to wait in seconds if limited page comes up.
var srchString="This page is being heavily limited to try to stop facebook from shutting down the game completely. Please avoid constantly refreshing this page.";
var stamStr="Stamina:";
var spanStr="</span>";
var healthStr = "Health:";

// Some needed functions
function Mid(str, start, len)
{
    if (start < 0 || len < 0) return "";
    var iEnd, iLen = String(str).length;
    if (start + len > iLen)
          iEnd = iLen;
    else
          iEnd = start + len;
    return String(str).substring(start,iEnd);
}
function InStr(strSearch, charSearchFor)
{
            for (i=0; i < strSearch.length; i++)
            {
                  if (charSearchFor == Mid(strSearch, i, charSearchFor.length))
                  {
                        return i;
                  }
            }
            return -1;
}
function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

// Check to see if health is below 30%

// Stamina
var stamVarA = Mid(pageHTML,InStr(pageHTML,stamStr),pageHTML.length-(InStr(pageHTML,stamStr)));
if (InStr(pageHTML,"recovery_countdown")>-1) {
	var divStr = "<div";
} else {
	var divStr = "</div";
}
stamVarA = Mid(stamVarA,0,InStr(stamVarA,divStr));
stamStat = Mid(stamVarA,InStr(stamVarA,">")+1,InStr(stamVarA,spanStr)-InStr(stamVarA,">")-1);

// Health Stuff
var healthVarA = Mid(pageHTML,InStr(pageHTML,healthStr),pageHTML.length-(InStr(pageHTML,healthStr)));
if (InStr(pageHTML,"health_countdown")>-1) {
	divStr = "<div";
} else {
	divStr = "</div";
}
healthVarA = Mid(healthVarA,0,InStr(healthVarA,divStr));
healthVarA = Mid(healthVarA,InStr(healthVarA,">"),healthVarA.length-(InStr(healthVarA,">")));
healthStat = trim(Mid(healthVarA,1,InStr(healthVarA,"</")-1));
healthTotal = trim(Mid(healthVarA,InStr(healthVarA,">/")+2,healthVarA.length-InStr(healthVarA,">/")-2));

if ((healthStat/healthTotal)<(healthPercentage/100)) {
	setTimeout('document.location.reload(true)',(healthTimeToWait*1000));
	reload=false;	
}

// Check to see if page is the do not refresh page
if (InStr(pageHTML,srchString)>-1) {
    setTimeout('document.location.reload(true)',(LimitedPageTimeToWait*1000));
	reload=false;
} 

// Check stamina
if (stamStat<StaminaAmount) {
 	setTimeout('document.location.reload(true)',(StaminaTimeToWait*1000));
 	reload=false;
} else {
	Array.forEach(document.getElementsByTagName("INPUT"),function(input){if (input.value=="attack") {input.click();reload=false;}});
}

// Reload the page
if (reload) {
setTimeout('document.location.reload(true)',pauseTime*1000);
}
