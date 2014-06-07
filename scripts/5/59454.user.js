// Power Twitter for Safari
// version 1.35
// 2007-04-08 first release Power Twitter
// 2009-07-20 first release SAFARI Power Twitter
// Copyright (c) 2007-9, Narendra Rocherolle, Nick Wilder
//
// ==UserScript==
// @name          Power Twitter
// @namespace     http://83degrees.com/projects
// @description   makes Twitter better
// @include       http://twitter.com/*
// @include	  https://twitter.com/*
// ==/UserScript==
//

// rewrite some GM functions to work with GreaseKit

if(typeof GM_getValue === "undefined") {
  GM_getValue = function(name){
    var nameEQ = escape("_greasekit" + name) + "=", ca = document.cookie.split(';');
    for (var i = 0, c; i < ca.length; i++) { 
      var c = ca[i]; 
      while (c.charAt(0) == ' ') c = c.substring(1, c.length); 
      if (c.indexOf(nameEQ) == 0) {
        var value = unescape(c.substring(nameEQ.length, c.length));
//        alert(name + ": " + value);
        return value;
      }
    } 
    return null; 
  }
}

if(typeof GM_setValue === "undefined") {
  GM_setValue = function( name, value, options ){ 
    options = (options || {}); 
//    if ( options.expiresInOneYear ){ 
      var today = new Date(); 
      today.setFullYear(today.getFullYear()+1, today.getMonth, today.getDay()); 
      options.expires = (new Date(new Date().getTime() + 365 * 1000 * 60 * 60 * 24)); 
//    } 
    var curCookie = escape("_greasekit" + name) + "=" + escape(value) + 
    ((options.expires) ? "; expires=" + options.expires.toGMTString() : "") + 
    ((options.path)    ? "; path="    + options.path : "") + 
    ((options.domain)  ? "; domain="  + options.domain : "") + 
    ((options.secure)  ? "; secure" : ""); 
    document.cookie = curCookie; 
  }
}

if(typeof GM_xmlhttpRequest === "undefined") { 
  GM_xmlhttpRequest = function(/* object */ details) {
    details.method = details.method.toUpperCase() || "GET"; 
    if(!details.url) { 
      throw("GM_xmlhttpRequest requires an URL."); 
      return; 
    } 
    // build XMLHttpRequest object 
    var oXhr, aAjaxes = []; 
    if(typeof ActiveXObject !== "undefined") {
      var oCls = ActiveXObject; 
      aAjaxes[aAjaxes.length] = {cls:oCls, arg:"Microsoft.XMLHTTP"}; 
      aAjaxes[aAjaxes.length] = {cls:oCls, arg:"Msxml2.XMLHTTP"}; 
      aAjaxes[aAjaxes.length] = {cls:oCls, arg:"Msxml2.XMLHTTP.3.0"}; 
    } 
    if(typeof XMLHttpRequest !== "undefined") 
      aAjaxes[aAjaxes.length] = {cls:XMLHttpRequest, arg:undefined}; 
    for(var i=aAjaxes.length; i--; ) 
      try{ 
	oXhr = new aAjaxes[i].cls(aAjaxes[i].arg); 
	if(oXhr) break; 
      } catch(e) {} 
    // run it 
    if(oXhr) {
      if("onreadystatechange" in details) 
	oXhr.onreadystatechange = function() 
	  { details.onreadystatechange(oXhr) }; 
      if("onload" in details) 
	oXhr.onload = function() { details.onload(oXhr) }; 
      if("onerror" in details) 
	oXhr.onerror = function() { details.onerror(oXhr) }; 
      oXhr.open(details.method, details.url, true); 
      if("headers" in details)
	for(var header in details.headers) 
	  oXhr.setRequestHeader(header, details.headers[header]); 
      if("data" in details) 
	oXhr.send(details.data); 
      else 
	oXhr.send();
    }
    else {
      throw ("This Browser is not supported, please upgrade.");
    }
  } 
} 

if(typeof GM_addStyle === "undefined")
{
  addGlobalStyle = function(/* String */ styles) {
    var oStyle = document.createElement("style"); 
    oStyle.setAttribute("type", "text\/css"); 
    oStyle.appendChild(document.createTextNode(styles)); 
    document.getElementsByTagName("head")[0].appendChild(oStyle);
  }
    
} 

if(typeof GM_log === "undefined") { 
  GM_log = function(log) {
    if(console) 
      console.log(log); 
    else 
      alert(log); 
  }
}

  embedFunction = function(s) {
	var ptScriptObject = document.createElement('script');
	ptScriptObject.type = "text/javascript";
	document.body.appendChild(ptScriptObject).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
  }

  exportGlobal = function(name,value) {
	embedFunction("var "+ name +" = '" + value + "';");
  }    

// set up the server environment
var ptSandbox = 0;  // must set to 0 to publish!
var ptSandboxServer = '';
var ptServer = 'http://powertwitter.me/';
var ptScript = 'req.php';
var ptVersionNumber = '1.35';
var ptTwitterVersionNumber = '1.5';  // latest major rev that includes search
var ptWarning = '';
if (ptSandbox == 1)
{
	ptServer = 'http://'+ ptSandboxServer + '.powertwitter.me/';
        ptWarning = '';//'<div id="ptNotes" style="position: absolute; top: 10px; left: 40px; background-color: #eee; padding: 6px;"><h2>TESTING!</h2>'+ ptServer +'</div>';
}

// some globals
var ptLoggedInUserName = '';
var ptLoggedIn = false;
var ptViewingUser = '';
var ptGsTitle = window.location.href;
var ptGsNextPage = 2;
var ptIsStatusPage = false;
var ptIsUserPage = false;
var ptIsSearchPage = false;
var ptAttempts = 0;
var ptTimeOut = 0;
var ptDefaultPhotoService = 'yfrog';
var ptWaitingGif;
var ptLoadingMessage;


// issues with twitter loading pages that look like
// http://twitter.com/search?q=83degrees#search?q=83degrees
// not sure what to do

// count the page
var ptCounterScript = document.createElement("script");
ptCounterScript.type="text/javascript";
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
ptCounterScript.src= gaJsHost + "google-analytics.com/ga.js";
document.getElementsByTagName("head")[0].appendChild(ptCounterScript);
try {
var pageTracker = _gat._getTracker("UA-9619216-1");
pageTracker._trackPageview();
} catch(err) {}

// add some html for sandbox notes, history container, and message bar
var newElement;
newElement = document.createElement('div');
newElement.innerHTML = ptWarning;


// make sure we have a body
var ptInsertPoint;
if(document.getElementsByTagName("body")[0])
{
        ptInsertPoint = document.getElementsByTagName("body")[0];

        ptInsertPoint.appendChild(newElement);
        newElement = document.createElement('div');
        newElement.innerHTML = '<div id="ptCustomMessage" style="display: none; z-index: 10; width: 100%; text-align: center; position: fixed; bottom: 0px; left: 0px; background-color: #ffffcc; padding: 4px;"></div>';

        // used in case page is broken aka kill switch
        newElement.innerHTML += '<input id="ptPingStatus" type="hidden" value="0" />';
        // this status input is used across the GM sandbox to know when the xmlreq is finished
        newElement.innerHTML += '<input id="ptLinkUpdateStatus" type="hidden" value="0" />';
        // these are used for pagination and search across the GM sandbox
        newElement.innerHTML += '<input id="ptVar1" type="hidden" value="0" />';
        newElement.innerHTML += '<input id="ptVar2" type="hidden" value="0" />';
        newElement.innerHTML += '<input id="ptVar3" type="hidden" value="0" />';
        newElement.innerHTML += '<input id="ptVar4" type="hidden" value="0" />';
        newElement.innerHTML += '<input id="ptAuth" type="hidden" value="0" />';
        newElement.innerHTML += '<input id="ptTopFriends" type="hidden" value="0" />';
        newElement.innerHTML += '<input id="ptPageNumber" type="hidden" value="0" />';
        newElement.innerHTML += '<input id="ptLastSearch" type="hidden" value="" />';
        newElement.innerHTML += '<input id="ptLatestTweetId" type="hidden" value="" />';
        newElement.innerHTML += '<input id="ptFirstTweetId" type="hidden" value="" />';
        newElement.innerHTML += '<input id="ptRestrictedSearch" type="hidden" value="" />';
        newElement.innerHTML += '<input id="ptFacebookDisabled" type="hidden" value="0" />';
        newElement.innerHTML += '<input id="ptRemoveTopFriend" type="hidden" value="" />';
        newElement.innerHTML += '<input id="ptTopFriendsMaxId" type="hidden" value="0" />';
        newElement.innerHTML += '<input id="ptInterestingMaxId" type="hidden" value="0" />';
        newElement.innerHTML += '<input id="ptClearTimeline" type="hidden" value="1" />';
        newElement.innerHTML += '<input id="ptCurrentService" type="hidden" value="" />';
        newElement.innerHTML += '<input id="ptSelectedTab" type="hidden" value="" />';
        newElement.innerHTML += '<input id="ptLinkParseService" type="hidden" value="" />';
        newElement.innerHTML += '<input id="ptDoNotParse" type="hidden" value="" />';
        newElement.innerHTML += '<input id="ptDefaultPhotoService" type="hidden" value="'+ptDefaultPhotoService+'" />';
        newElement.innerHTML += '<input id="ptPhotoServiceOptions" type="hidden" value="'+ptDefaultPhotoService+'" />';
        newElement.innerHTML += '<input id="ptMoodOptions" type="hidden" value="happy|sad|bored|busy|hungry|tired" />';
        newElement.innerHTML += '<div id="ptShade" style="position: absolute; top: 0; z-index: 999; display: none; background-color: #113344; opacity: 0.5;" />';
        ptInsertPoint.appendChild(newElement);

        // domains outside of twitter
        // not live yet
/*
        if(ptGsTitle.indexOf('google.com/search') != -1)
        {
                var ptGoogleSearchRegExp = new RegExp(/.q=(.*?)&/);
                if(ptGsTitle.match(ptGoogleSearchRegExp))
                        document.getElementById('prs').innerHTML += ' <a href="http://search.twitter.com/search?q='+ptGsTitle.match(ptGoogleSearchRegExp)[1]+'">Twitter</a>';
        }
*/

        // get base settings
        var ptPrefRM = (GM_getValue("ptPrefRM")) ? GM_getValue("ptPrefRM") : '';
        var ptPrefEX = (GM_getValue("ptPrefEX")) ? GM_getValue("ptPrefEX") : '';
        var ptPrefFB = (GM_getValue("ptPrefFB")) ? GM_getValue("ptPrefFB") : '';
        var ptPrefMO = (GM_getValue("ptPrefMO")) ? GM_getValue("ptPrefMO") : '';
        var ptPrefSB = (GM_getValue("ptPrefSB")) ? GM_getValue("ptPrefSB") : '';
        var ptPrefPR = (GM_getValue("ptPrefPR")) ? GM_getValue("ptPrefPR") : '';
        var ptPrefPH = (GM_getValue("ptPrefPH")) ? GM_getValue("ptPrefPH") : '';
        var ptPrefTopFriends = (document.getElementById("ptTopFriends").value != 0) ? document.getElementById("ptTopFriends").value : '';
        
        var ptPrefPassword = ptGetPassword();

        var ptJSON = document.createElement("script");
        ptJSON.type="text/javascript";
        ptJSON.src= ptServer + ptScript + "?action=ping&format=json&version="+ptVersionNumber;
        ptInsertPoint.appendChild(ptJSON);

        runPowerTwitter();
}
else
        document.location.href = 'http://twitter.com/home';


// --------------------------------------------------------------------
// start the script

function runPowerTwitter()
{


// see if we have a logged in twitter user
var ptMeta = document.getElementsByTagName("META");
for(i=0;i<ptMeta.length;i++)
{
	var ptMetaTag=ptMeta.item(i);
	if(ptMetaTag.name.toLowerCase() == 'session-user-screen_name' )
	{
             ptLoggedInUserName = ptMetaTag.content;
	     ptLoggedIn = true;
        }
	else if(ptMetaTag.name.toLowerCase() == 'page-user-screen_name' )
	{
		if ((ptGsTitle.indexOf('favourites' ) == -1)&&
                    (ptGsTitle.indexOf('favorites' ) == -1)&&
                    (ptGsTitle.indexOf('followers' ) == -1)&&
                    (ptGsTitle.indexOf('following' ) == -1)&&
                    (ptGsTitle.indexOf('#favorites' ) == -1)&&
                    (ptGsTitle.indexOf('public_timeline' ) == -1)&&
                    (ptGsTitle.indexOf('direct_messages' ) == -1)&&
                    (ptGsTitle.indexOf('#inbox' ) == -1)&&
                    (ptGsTitle.indexOf('#sent' ) == -1)&&
                    (ptGsTitle.indexOf('activity' ) == -1)&&
                    (ptGsTitle.indexOf('replies' ) == -1)&&
                    (ptGsTitle.indexOf('#replies' ) == -1)&&
                    (ptGsTitle.indexOf('/#' ) == -1))
                {
                        ptViewingUser = ptMetaTag.content;
                        ptIsUserPage = true;
                }
        }

}
if ((!ptLoggedIn)||(ptGsTitle.indexOf('oauth') != -1)) // don't do anything else unless the user is logged in
{
        if(document.getElementById('ptStatus'))
        	document.getElementById('ptStatus').style.display = 'none';
                
        if(ptGsTitle == 'http://twitter.com/') // do something on the home page
        {
          if(document.getElementById('container'))
          {
//                ptMaggieImage = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%C8%00%00%00e%08%06%00%00%00%08%DA%AC%AE%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%0FRiCCPPhotoshop%20ICC%20profile%00%00x%DA%ADWy4%D5_%D7%DF%DF%3B%BB%AEk%1E%92%E1%E2%26%C5-%89P%A1%CC2%0F!*%5D%5CS%86%DBu%8DIR%19K(e%8E%88Be%0AE%A6~%88T%1APQ%942%14eJT%BA%EF%1F%1A%DE%F5%3C%EB%7D%9F%7F%9E%FD%C7Y%9F%F39%7B%9F%FD%D9%7B%9D%B5%CE9%00%FC%12t%26%D3%17%05%00~%FEl%96%8D%91.%C5q%8F%13%05%FF%02p%20%08%02%C0%03%5Ct%B7%40%E6N%2B%2B3%F8%3Fm%A1%0F%10%00%80%A74%3A%93%E9%DB5%2B%B2.%B3-%C0%5D%F7j%9D%DCR%19%AD%0E%FE%7F%23%B3%1C%F78%01%20J%00%20%E4%B9%82w%00%80%90%EB%0A%B6%03%00%A1%106%93%0D%80x%01%80%90%9B%17%DD%1D%00%89%00%00%25%96%9D%8D%1E%00r%05%00%C8%9E%2B%B8%0E%00%C8%AE%2B%F8%1E%00%90%83%DD%3C%D9%00%C8s%00%9C%80%BF%BB%B7%3F%00~%12%00%A7%ED%CE%08t%03%20%2B%01%80%BB%7B%A0%9B%1F%009%19%00%A5%ED%E7%17%E0%0E%C0%D7%03%00%0AnL%16%1B%80o%11%00%A8%8E%7B%9C(%2B%92%03%24%004%F3%01%90%9C%BF%9C%8B%3B%40%D51%002%F3%2F%A7%60%0F%20%B0%04pW%EC%2F7g%03%08%00%20%22%8F%02%3D6%AB%00%00%00B%D2%05%C0%BE%E6p%E6%E4%01%F0%A9%00%CB)%1C%CE%F7K%1C%CEr%01%00z%10%A0%D9%D7-%88%15%FC%AB_%08%F2%00%E0%3F%CDWj%FEeh%04%00%05%009H*%EA%04%FA%04%E6%02%B6%197G%D8%C9%95%CB-%40%3AG%96%E7m%E6%F7%10%5C%25%F4H%24Q%CCH%1C%BF%BAS2A%DAD%06%23%3BI%ED%93oT(Y%7FV%E9%C8%06%0Fe%5B%15-U%EA%16%1E%F59%CD%81m%CDZ%85%3Aq%3B%BD%F4%8C%0C%D6%1Aa%8CGv%DD1%8B7_%B2t%B2%BAm%23n%1Bf%D7o%BF%C5!%D5q%DA%C9%DC%B9h%1F%ECwt%A9%A0s%B9%BA%B8%D50%88%1E.%9E%95%DE8%1F%A7%83%05%BE%F5~%9D%FE%7D%01%23%CC%CF%87%96%02%D1l%EE%20%C1%60%F1%10%A9P%990%B9p%EAaj%84%EC%11%E9%C8%D5GE%A2%F8%8E%11%A3%D1%D1%DF%8E%CF%9C%18%3D9%10%D3%13%DB%1E%D7%10_%91p%251%F7%D4%B9%D3%89I%D1g%C2%92Y)%3E%A9%AEg%9D%CF%D9%A5%99%9F7%BC%A0%9D%AE%91%B11%93%9A%25%9A%CD%95%FD%3Dg*w%E8bO%5EK~%C5%A5%BC%82%A4%C2%23%97%7D%8A%EC%8Bu%AF%D0%AE%8A%96%20%25%1FJ%9F%96%D5_%2B%B8%9Ex%23%A4%DC%BF%C2%AB%D2%B5jo%B5%FDM%8B%1A%C3Z%AD%3A%D5%5B%8A%B7)%F5B%0D%84%86%EFw%3E5%0E5%3Dnni%A9h%CD%BB%9B%FCOd%9BW%BBa%87T%C7%D7%7B%0F%3B%0B%BB%C2%EE%9BwS%BAg%1F%FC%F30%F5%D1%81%1EZ%CF%E2%E3%BBO%12%9F%DA%3C%5B%F5l%A8%B7%B0%CF%AB_%B1%7F%EAy%FE%0B%BB%97%B8%97%B5%03%5E%83%A2%83%ED%AFX%AF%A5%5Ew%0D%B1%86%C5%87%5B%DEx%BC%25%BE-%1B1%1F%F9%F4%EE%F4%7B%C5%F7%9D%A3%1Ec%C8X%CA8e%FC%FA%C4%B6%89%8E%0F%D6%1F%06%3E%D2%3F%8EO%1E%9C%FC4%E5%3B%F5%F1%13%E3%D3%D0g%FB%CF%DD%D3%3A%D3%953r3%A9%B3%A8Y%F6%EC%D8%DC%DE%B9%C7%F3z%F3%D5_%A8_R%BE%FC%5C%F0Xx%F8U%EDk%E6%22%2Cz.%3E%5C%DA%B6T%F6M%FE%5B%E5w%BB%1F%82%CB%7C%3F%DD9%1C%00%60%22%3A(4%EA6%3A%1A%E3%88%D5%C2m%C2k%11%9C%B8%12%89%DD%24*O%0A%2F%89%EF%AC%80%BC%60%87%F0!Q9%B1%3E%F1T%89%3DR%FA%94%8D%B2%D2T%EC%9A%89%B5%DD%EB%0A%15ChF%1BI%CA%5D*%D1%AA%CAj%FD%EA%C1%9A%A4%AD%99%DBe%B5%0Atdv%A4%EB%92%F4%82%F5%EF%1A%12%8D%AC%8C%CF%9B%BC4%954%DBg%9Ee%F1%C2J%C8%DA%C2%26%C6%B6%DE%EE%B3%BD%AC%83%9D%E3%F1%3D%15N%AF%F7r%EFS%DFOw%89%3F%90M%2Fq%BD%E5%D6%E1%FE%8C1%EC1%E9%B9%E0%F5%D3%07%7B%90%CB%97%E4G%F2'%06%E0%99%C0%5C%3A%F4%99%F56%B0%97%DD%1ET%1D%9C%1F%12%1DJ%0F%DB%11N9%0C%87%87%23Z%8E%5C%8A%3Cq%D4%23%CA%E4%98R4o%F4%DC%F1%FE%13%F5'%2F%C6%9C%88%F5%8E3%8F%DF%94%20%9C%F0-%F1%F5%A9%BB%A7%8B%93N%9D9%94%EC%90%B2%3DU%F6%2C%E1%EC%D4%B9%A7i%B5%E7%B3.D%A6%BBd%EC%C8%A4d%FE%CC%1A%CC%AE%CB9%97%EB%7F%D1%24O!%9F%2F%7F%F9%D2DAoa%D3%E5%ABE%A9%C5aW%0E%5C5*Q*%E5%2F%5D(%7By%AD%F1%FA%A5%1B1%E5%3E%15%16%95%9B%AB%C4%AA%96%AB%DF%DD%7C%5C%D3X%5BZw%E1%D6%B1%DB%BE%F5%BB%1B%B4%EEP%1B%B9%1Bg%9A%FA%9B%EB%5B%F2ZO%DE%F5%F9%C7%B2M%B5%7DU%3B%A7%E3%FD%BD%FB%9D%15%5D%F1%F7%5D%BA%D5%1E%90%1E%BC%7Dx%EBQR%8F%DBc%8D'%A4'%C3O%2B%9F%1D%EF%B5%ED%93%EB%9B%E9oz%9E%F0b%F7K%E9%97%E3%03%E5%83A%AF%D4_%7D%7D%5D%3B%142%AC%3E%FC%F5M%CD%DB%A0%11%D5%91%D9w7%DE%FB%8E*%8C%BE%1B%CB%1Dw%98%E0%9B%E8%F8%10%F9Q%F5%E3%C4d%CE%94%FD'%A1O%FD%9F%B3%A7%E93%EBfff%1B%E6b%E7m%BFP%BEL-%D4%7F%8D%5B%B4%5B%92%5E%9A%F8V%F1%3D%F4%87%D62%B2%DC%FA3%9A%B3%93%C3%01%80%1C%24%1Ce%88%26%A3%070%D7%B0Q8G%FCV%824%17%9Ek%9E8%C6%FD%8E4%CC3B%FE%C0%3B%CB%8F%08%F0%0B%CA%08m%16%B6%15)%11%E3%5D%C5%12%7F*%A1.y%5Ej%8Eb-S%26G%A0%EE%5BS%BD%96%A0%E0%BC%EE%DA%FA%1FJ%A6%B4%F4%0D%23%CA%1B6%05%AB4%A9%82%9A%D0%16)%F5u%1A%AA%9A%3A%5BM%B6%D9n%DF%A7%E5%A9%CD%D4%09%DBqlg%BCn%8A%5E%86~%9EA%B1%E1u%A3j%E3z%93%96%5D%ED%A6%EDf%0D%E6e%16Y%96%09Va%D6%DE6%0E%B6%06v%9BwS%EC%C9%F6%DF%1CF%1D%9F%ECit*qN%DB%1B%B5%CFg%FFn%17%9D%03%EB%E9d%FA%98k%BD%5B%92%3B%9D%A1%EA%81%F7x%E9Y%E6%15%E9m%E9C%F1%99%3E%D8%EC%7B%C6o%BF%BF%92%FF%B7%80%0E%E6%B9Ct%16%8D%B5%14%D8%CC%3E%1A%A4%114%13%5C%12%E2%16*%19%DA%1F%96%12nz%18w%B8%25%22%E2%88%C6%91%B9%C8%1BG%7D%A3%14%A2%DE%1D%CB%8F%DE%7F%5C%FC%F8%F3%13i'mb%C81%5D%B1%B1qz%F1%10%DF%90%10%96%A8%968%7B%EA%C6i%BF%A4%F5Icg.'%BB%A6PR%5E%A7f%9Fu%3A'v%AE%3F-%ED%BC%FD%85%D5%17F%D2K3X%99%5B%B3PY%5D%D9)9N%B9%B2%B9%1F.V%E5%85%E7%EB%5D%22%5DzV%90S%C8%B8%BC%E1%F2BQsq%DC%95%3DW%D5K%24J%91%D2%B1%B2%EEkU%D73oD%95%7BUXUjT%C9T%13%AB%E7o%0E%D5t%D6%DE%AC%CB%BBu%EAvh%BD%7B%83%CD%1D%83F%A3%26%ABf%E7%16%AF%D6%E0%BB%B1%FFd%B4%5Doo%EBx%7Do%A9K%E4%BEj%B7%DD%03%F6%C3%B4G%B5%3D%2F%1Fs%9E%CA%3D3%EA%3D%D8%97%D2_%F3%7C%E0%25%0Cl%1AL%7F-%3A%94%F1F%EAm%D1%3B%D5%F7%5Dc%3E%13%C2%1F%1EMf~%0A%9Af%CCz%CEG%2C%14-%BE%F9%AE%BC%9C%C2%E1%00%AC%DC%7D%00%00%B8-%00%97%F3%01%EC%8B%01%2C%03%00%F2%BD%00%E4%FB%00%F8%F5%01%ACx%00%EC4%01%F5%A5%15P%FB%EB%00I%F9%F8%E7%FE%C0%02%2FH%02%0Dt%C0%06%3C!%02R%E1*4%C3s%98F%B8%109D%0BqD%02%913H)%D2%89%8C%A1%B0%A85(%03%94%07*%16U%82z%80%9AA%8B%A0%B7%A3%DD%D0%B1%E8Rt%0Fz%01%23%81%D1%C7%1C%C4%9C%C54%60F%B1%7C%D8%ADX%0Fl*%B6%11%3B%89%5B%853%C6%85%E0%8Aq%FDx%02~%2B%DE%17%7F%11%FF%94%80'l'%B0%08W%08C%5C%A2%5CV%5C%F1%5C%AD%5C%CBD%0D%22%9BXN%9C%E2V%E4%F6%E1%BE%CA%BDH%B2%24%15%F3%00%8F3O%0DY%90%7C%88%DC%C3%AB%CC%9B%CA%FB%85%CF%91%EF%0E%3F%95%FF%14%FF%17%81%03%02%F7%055%04%8B%84D%84b%84%16%85%7D%85%87E%ECE%1E%88%1A%886%8Ai%88%DD_%E5%25%8E%17%BF%B2%DAt%F5%B4D%BA%A4%AE%E4g%A9%1CiK%0A%86R%2F%13%24%BBIvF%AE%8A%1A%BAf%87%3CQ%BE%7Fm%91B%E8%3A%F3%F5k%14A%F1%95%D2mZ%E6%86%88%8D.%CA%FA%9B%14U%04U%967O%A8%F6%AA%FD%B3%A5Z%BDH%23C3i%EB%C9m%91%DBC%B5B%B4%0F%EBD%EFH%DCy%5E%B7P%AFZ%BF%DD%60%C0p%CE%98l%A2%B8%CB%D44%C0%2C%CD%BC%C9%E2%A3%95%B8%B5%99M%94m%AD%DD%B4%3D%D5a%97%E3%A1%3DYN%ED%CE%F3%FB%A8%FB%1D%5D%92%0E%B4%B9%82%9B%B6%FBQF%AB'%C1%CB%C6%3B%DBg%D2W%CB%2F%D9%7F%94%A9%7D%A8%20%90%CA.%0A%A6%85%D4%85%19%85%0FF%04E%0A%1C%AD%3D%E6z%9C%FFDG%CC%898%C3%04%9E%C4%97%A7K%CFD%A5D%9D%8DK%BBp%A1%2C%A3%2Bk%26%97%92%E7%7C)%BFp%BA%D8%FCju%19%F5zn%85t%D5%AB%9A%B2%5B%09%0D%E1MQ%AD%F9m%EF%3BM%BB%FB%7B%E2%9E9%3F%17%1F%E8%1A%BA%3CR661i1%7Dc%BE%E2%EB%F47%FF%1F%26%CB5%3F%C79%1C%00%C0%83%08(%82%3E%B8%40%04d%40-%F4%C2%3C%22%88%A8%20%D6%08%13IF%CA%91%C7%C8%2CJ%10%A5%86r%40%85%A3rP-%A8Q47Z%19m%8F%0EG%E7%A2%5B%D1%E3%182F%15%B3%17s%02s%0D%D3%8FE%B04%AC%136%16%5B%83%1D%C5%89%E0%8Cq%87q7p%EF%F1%AB%F1v%F8%D3%F8%7B%04%0CA%97%10M%B8%CB%85%E32%E5J%E1zA%94%25%FA%11os%13%B8%1D%B9KH%18%92%2B%A9%85G%96%E7%04%CF8%D9%9C%5C%CD%2B%C9%1B%C7%3B%CF%E7%CA%F7%84_%9F%BFV%80%26pYPJ0CHD(MXD8CDR%A4%40TQ%F4%A6%98%8EX%FF*%B6%B8%80x%E5%EA%DD%AB%97%24%F2%24M%24%BFH%15J%EF%A6%10)%AD2%91%B2%DBe9rm%D4%A45%7B%E5ik%91%B5%2F%15n%AE%BB%B8%3EI%F1%A8%12%8B%E6%B1a%DFF%7Be%CBM%A6*%C6%9B%8DT%8D%D5vm%B1T%B7%D7%D8%AF%E9%B55h%DB%C9%ED%E7%B5J%B4%9Bt%FAwL%EBr%EB)%E8%1B%1Ax%1A%26%18%DD0~%BE%0Bm%AAb%C60%CF%B6%E8%B3%12%B6v%B4%C9%B5%1D%DF%ADf%1F%E2p%CDq%CCI%CE%D9m%EF%E5%7D%93.%5B%0ED%D3%9F%B8%C9%BBG0%9Eyn%F4%3A%ED%FD%F1%A0%B9o%B9%BFP%408s%98%A5%1D%98%CB%E6%04%BB%87%3C%08%D3%08%BF%12%B1%FAH%CAQbTL4%EEx%ECIbLr%9Ch%7C%5E%E2%FAS7%93t%CF%3CN%89%3A%BB%E9%DC%C8%F9%F4t%CBL%EE%AC%AE%9C%C4%8B%D6%F9%12%97%A6%0A%5B%8A%B2%AF%1C.q-%B3%B8%AE%5D%AEV%B9%A5%DA%B8%C6%B9%EE%D0%ED%84%86%E2%C6%CE%E6%A9%BB%AB%DAvu%1C%ED%BC%D3%0D%0F%CDzr%9F%2C%F4%EE%EE%CF~%F1d%10%FBz%CB%B0%FB%DB3%EFn%8D%8EL%F0%7C%D4%9C%F2%FE%9C738%2F%B3%E0%BF%D8%F6%7D%CD%F2%19%0E%07%00%B0%C0%0FT%D8%06%F6%10%0C%E9p%07%DE%23%BC%C86%C4%0BIG%3A%91%1F%A8M(O%D4E%D4%0B%B40%DA%06%1D%83%BE%85%9E%C4%C8%60%1C0g0%1DX%04%AB%85%0D%C7%D6a%17q%9A%B8%C3%B8f%3C%16o%86O%C3%0F%11%D6%13B%08%ED%5C%22%5C%9E%5C%F5D%5E%22%83x%87%5B%84%9B%C9%FD%88%B4%93T%C3%A3%C4SH%96%22g%F2%8A%F1%A6%F3%89%F3%E5%F2S%F9%CB%04%B6%08%B4%0AZ%09%0E%0B%B1%84q%C29%22%AA%22%0FE%7D%C4%08b7V%B9%88%0B%88w%AC%3E*%A1!1%2FY%25%C5%96V%97%5E%A6%B4%CB%A4%C8%EE%97%DB%40%05j%EF%9A2%F9%93k%E9%0A%3A%EB%E4%D7%CB(J%2BI%D3d7(lTQ%D6%DEd%A1B%DF%1C%AA%9A%AAV%BE%E5%89%FA%82%A6%F4%D6%5D%DB%C2%B6%97j%7D%D11%DBQ%AC%8B%D5c%E8%DF3%A4%19%A5%19sv%1D4%1D07%B3h%B6R%B7%AE%B0%A5%D9%95%D9%D3%1Cn%EE%D1v%BA%BF%D7i%DF%94K4%7D%95k%95%BB%15%E3%B3g%8A%B7%9A%CF%A0o%8C%BFJ%C0%9BC%A7%03i%EC%9E%E0%A0P%C9%B0%8E%C3AG%E4%22%9FE%C5E%EB%1C%FFz%B226%20~c%C2%EC%A9%9A%A4%23%C9%9BS%DA%CF%3A%9F%9B9%1F%9F.%93Q%9F%E5%98%3D%97%9B%9C%B7!%FFA%81%DFe%9E%A2%F2%2B%D6W%17J%B3%AE%ED%BC%3E%5E%9E%5C%B9%A6%AA%F0%A6lM%5E%9D%E4%AD%F4z%C1%86%C4FtSh%F3T%2B%FD%EE%D36%83%F6%9A%7B%0A%9D%99%F7I%DD%91%0Ff%1E%D1%7Bz%9F%98%3Cm%EAU%ED%2By.%F3%22s%40x0%E5U%EF%10%0C%CB%BD1%7C%EB5%92%F8%AE%F4%FD%FD%D1%F1q%D4%84%F8%07%DAG%ADI%93)%8BO%D6%9F%CD%A7%0Dg%B6%CE%AE%9B%13%9C%5B%9A%1F%FCr%7B!%ED%AB%DF%E2%8E%25%81%A5%A1oe%DF%D9%3F%B6%FF%E0%FC%7D%3F%AC%FC%97%00%00%80%A8%17%E0%1B%C0%A2%98%E9%E9%C3%7F%D7%FC%7C%83~%E7%10%00%00%92%BF%AB%85%E5%2F%3C%CEd%5B%D9%01%80%08%00%7C%0B%0C%B65%00%00%3E%00%84%CF%C3%DB%D0%E4%17%A6%B8%D3%F5M%01%40%02%00Q%0E%F7%D2%B3%00%00%12%00b%E6%C12%B4Y%D9%07q%F4%A1%EF%B2%02%002%00%E2%C3%F0%DFm%FB%8B%0Fe%FAZ%99%FD%C2%09L%B6%AE%0D%00%88%01%20%D9%8C%40%83%DF%3E%D5%E1%5Ev%0E%BFb%DBYA6%BB%01%80%0A%80%3C%3B%18%60j%F3%2B%D7%A2%3BC%FF%976%14%C6%DF%D7%C2lE3J%C8%9Bmb%07%00B%00%A8%F5%60%08t%60%81'0%80%06f%A0%07%FA%BFF%0A%D0%81%02z%10%00%2C%60%40%20%18%C2%3B%60%81%E7%1F%2F%7Bx%07%2C%F0%FE%97(%1Ax%00%1DX%10%0C%0C%08%84%830%0A%2C%F0s%F1%8Ef%01%E5%97G'%B8%01%0B%E8%E0%FF%9BQ.U%9EP%FE%F1g%5D%0F%02%C0%17%02%E0o%84%E9%BF1%BF%15%FE%F5%F5%06w%08%F8%C3%BB%FD%E6%5D%BC%A3Y~%95%1E%C1%E9%01a%5B%ED%BD0%F2%18%15%8C%1AF%17%A3%85%D1%C6h%02%05%23%82%11%07%1AF%15%A3%81%D9%89%D1%C1l%C3%A8a4%1FN%D6N%FE%C9%B3%D2%1B%D7%3F5%9A%82%2F0%20%08X%C0%00%FF%7F%EB%97%DB%FFR%03%2B%7Fw%00%00%1C%1F%40v%01%00%40%5B%E8%91%A8%7F%3DglF(%1B%00%40%2F%80%19%C6%F2%F6%F4bSv2%99%BE%0C%25%8A%89%BF%DB%06%25%8A%8A%B2%B2%26%FC%0F%0F%23%60%A1xr%12%CE%00%00%00%04gAMA%00%00%D8%EB%F5%1C%14%AA%00%00%00%20cHRM%00%00m%98%00%00s%8E%00%00%FA%1E%00%00%85B%00%00u%99%00%00%F2%1E%00%002%11%00%00%15%CA-M%AD%1D%00%0055IDATx%DA%EC%BDw%94%5C%C7y%E6%FD%BB%A1s%0E3%3D9%CF%20%0Cr%26%98I1J%B6DY%E18%CA%E1%DB%CF%BB%B6%D7%96%C3z%83%D7%BB%5E%F9H%B2l%C9ZY9Y%A4d3S%CC%20%09%10%24%01%109%A7%C9y%A6'%F4t%CE%DD7%ED%1F3%18%12L%06HPf%E8%E7%1C%9CA%87%5B%5D%B7n%3D%F5%C6zK0%0C%83%0B%C8%95U%2C%92%84%20%80%24%0A%FC%1B%B0%01u%C00%15T%F0%3E%87a%80%A2%EB%A8%BA%81%DD%24-%BD%2F%BE%836%DD%40Seh%2B%F8%20C%7C%07%E4%F8%3B%E0%07%C0-%95a%AC%A0B%90%8B%C9%F1%0F%C0o%03%1D%15%92T%F0A%86%F0%266H%83%24%0Af%40%7F%D5w5%C0%02%FC%05%F0%FB%AFig%14%F8c%E0%04%60%02%84%CA%D0V%F0%FE%E2%01%86%A2%EB%D3%AAn%94_m%83%5CD%90%7CY%F5%9B%25%E93%92(%FC%17A%C0%F1%1A%82%18%80%04T%BF%09%01%D2%8B%FF%A4%CAxW%F0%3E%84%A4%EB%3CV%D6%B4%AFYM%D2%C0%1B%12D%D3%8D%3F%14E%E1%7F%0BPU%19%AF%0A%3E%84(%E9%86%F1UQ%10%FE%E7%857%E4%8B(%24%0A%9EE5%AA%82%0A%3E%8C0DAp%BC%95%91%AE%00je%9C*%F8%B0%12%E4%B5%F3_%AC%8CI%05%15%BC9*%04%A9%A0%82%0AA*%A8%E0CF%90%82%AA%93.%A9%E8%C6%15j%2F%97%BEb%7D%D34%95%7C%26%85a%E8%14%F3YJ%C5%FC%3BjO%D75%F2%D9%14%AA%A2%5C%FE%B5%9AF!%9BBS%95w%EDY%18%86A1%9F%A1%5C%2C%BC%83%F1J%A2%AB%EA%07%8B%20%E9%D8%1C%B3%E3%03d%93%B1_x%C7%E7%F3e%FE%FA%E5Qv%8E%25.%EB%BA%99%B1%01N%BC%F8%04g%0F%EE%22%97N%60%E8%1A%87%9F%7B%88%C7%7F%F4%15%A6G%FB%DEQ%9F%94r%89g%FF%E5%1BL%0D%9E%E3%C9%1F%7D%99%E3%2F%3C%C6%D4%F09%FE%E5%EF%3FO%222%FD%8E%26%E0K%8F%FC%98%1D%F7%7C%ED%B2'%BA%AE%A9%EC%BC%F7%5B%EC%BC%EF%DB%EF%DA%B3%10%04%81%DE%23%7B%B8%F7%1F%FF%92%F8%DC%D4%25_%17%9B%9Dd%C7%3D_%23%97%8A%F3%D4%DD_e%CF%E3w%2Fd%0D%BE%DF%09%A2%94%8A%1C%7C%FA%5EN%EF%DBAbn%8A%F3%87wsf%FFs%A8W%60%95%BA%D4%E1%099%CC%B8-2%83%89%FCe%B5e%E8%3AO%DF%F3uN%EF%7B%16%AB%CD%C1%99%FD%CF1%3B9%C8M%9F%FC%5D%5C%DE%E0%BF5S%DF%FAc%5D%A3%FF%F8%5E%ECN%0F%0EO%90%F1%BE%D34%B4%AF%2263I.%1D%7F%5B%C4%00%90%24%99%40%A8%9E%F0%D0y%CA%A5%E2%25%F5%EB%F8%8B%8F3pr%3F%B2%C9%8C%CB%17dj%E8%3C%BA%AE%BF%E9o%5CN%7F%DEh%94%7D5%0D%C4g'I%C7%23K%9F%24%E7g%D8%F7%E4%3D%24%A3%B3o%D8%86%D9j%C3%5BU%8B%C3%ED%C3%EE%F40%3D%D6%8F%A6%A9%97%DD%AFw%13%F2%E5%5E%A0*%0A%CF%DD%FBO%D46w%B1%FA%EA%DBP%CA%25%EA%DB%25%CE%1D~%9E%E9%813H-%EB%19%8C%A5%09%DAL%0C%25%F2l%0C%B9hp%5B%99%CB%95%E9%89%E5%90E%81%CD%B5n%B2%25%8D%F3%D1%1C%1E%8BL%B2%A4%B0%BD%DEC%AC%A0%D0%1B%CB%D3%E2%B1R%EB0sx%26C%95%DD%C4d%A6H%D0jfc%8D%13Q%10%E8%8B%E7I%14U%D2%25%95N%BF%9DxA%E1L4%87%DB%2C%93-%AB%AC%ADv2%9A*0%9BS%E8%F0%D9%E8%F0%DA%96%FA%1F%A8k%22%D4%DCImK%17%A2l%E2%E8%EE%C7%90L2V%A7%0B%97%2FH6%15g%E0%D4%01%AA%EA%9A%A9nh%A3%FF%C4%3Ej%9A%97%E1py%19%3E%7B%08%8B%CDI%FB%EA-%A4bsL%8F%F6%D2%B9n%3BSC%3D%E8%9AN%FB%9A%CD%5C%7F%D7%EF%10%A8m%C4%E1%F1%A2ie%ACv'%0E%8F%1FA%7Ce-%9A%9F%1Ecvt%00oU-%B3%13%83%B4%AE%DCH.%9D%60v%7C%90u%D7%7D%14I%96%99%9D%18%2429LUC%1B%8D%1D%AB%B0%7B%FC8%3C~%8A%B94%7D%C7%F7R%D5%D0J%7D%EBr%C2C%3D%C4f'h%5E%B9%01o%A0%06%80r%B1%C0%E1%E7%1E%C2%E1%F1%13lh%C1%13%AC%C1d2%D3%7Bt%0F%AAR%A2%7B%EBM%C8%26%13%F3%E1qf%C6%FA%09%D67S%D7%B2%FC%A2Ed%BC%FF4%C9%E8%2C%F5%AD%CB%A9jhez%A4%97%C8%D4(%EE%405%AD%2B6%20%88%22%E1%D1%5E%A2Sc%D4%B6vaw%BAq%FB%AA%91Mf%06N%1DD%14%05%B2%89%18%FB%1E%BB%07%01%91m%B7%7D%96xd%8A%F0H%0F%DE%60-%CD%CB%D6%91%8CL%13%A8mF%92M%B8%7DA%8A%F9%0C%9A%A6%11%09%8F1%3B6%80%C3%ED%A5m%D5fd%93%F9%FD%23A%CE%EC%7F%16Q%94h_%B3%95%E3%2F%3DN%EF%B1%97%D8u%FFwhh_M61G2_%E0K%87%C69%18N%D3%13%CB%F3%0FG'%C9)%1A%8F%0EFI%14Uv%8E%25yz8NY%D7%F9%D6%C9)%1E%1E%88p%60%3A%CD%91%99%0C%3F%3D%3F%8BY%14%F8%FA%D1)NF%B2%FC%7Cp%9E%7F%E9%99%25%92W%F8%FB%23%13%8C%24%8B%1C%99%C9%F0%CFg%A6q%98D%F2%AA%8E%AE%1Bh%06%7C%F5%C8%24O%0CE91%97e%EFd%92%3DS)J%9A%C1W%8FL%92(%AA%17%AF%B6%86%81%20J%A8%E5%12%86%AE%A1%AB%3A%A5%7Cni%B5%DE%F7%F8O9%FC%DC%83%20%08%0C%9D%3D%CA%F4%C8y%1E%FF%D1%97%90e3%E3%FD%A7%D8%F5%C0w(%15%F3%3C%F1%E3%AF%90IF%99%1A%3C%C7%D3w%7F%95B6%C5%BA%EB%3E%86(%C9h%AA%0A%82%F0%86%AB%A1%AE%AA%3C%FC%AD%BFf%F8%ECa%C6zN%F0%D3%BF%FBc%A23%E3%1C%DE%F90%07v%DCKlf%82%23%3B%1FF6%9By%F2%87_%A6%90%CB%20%08%22%92Y%26%93%881t%FA%10%86%A6qz%EF%0EN%EF%7F%16%5D%D3%B9%F7%EF%FF%82l2%BE%B8%88%95%40XP%7D%B4%B2%82a%2C%A8%C3%A5B%96%9D%F7~%8B%BE%E3%7B%99%1A%EEa%EFcwc%B6%D9y%F4%3B_%60%F8%CC%91%A5%FE%1D%D9%F5%08g%0F%EC%24%9BL%F0%F4O%BFA%DF%F1%BD%BC%FC%D4%CF%B09%DC%1C%7B%FE%E7%9C%DA%BB%83%A13%879%F8%F4%7D%20%C0%A3%DF%FB%5B%94R%11%B3%D5%8A%A1%1B%0C%9C%7C%99l*%8E%20%8A%88%D2B%E6Q%3E%9Bd%EF%A3%3F%C1l%B1%F1%FC%FD%DFe%B4%F7%04%85%5C%96%07%BF%F1W%0B%E3%23%08%C8%263s%93C%EC%BC%EF%9B%D8%5Dn%A6%86%CEQ%C8%24%DF_*Vx%E8%1CM%5Dk8%F9%D2%93%D8%9D%5E%AA%EA%5Bpz%03%B8%FDU%94%CAe%02%16%91%0E%AF%9D%CD%B5.%3E%B7%AA%86dQE%14%E0%C6%26%2FMn%2BeMc%2CY%C0e%96h%F7%DA%B8%A6%DE%C3_mk%E6%C8L%86%C9t%19%97Y%C6i%961%8B%02%5D%3E%3B%2B%03%0E~%7DE%88j%BB%89%F9%7C%99%FB%FB%23%AC%AEr%B1%A6%CA%C9%EA*%07%AAn%10%B4%9Bh%F2X%B9%BD%CD%CF%E775%B0%BD%CE%C3%86j%17%22%90*%AA%C4%0A%CA%1B%E8%E6%0A%26%8B%95%BA%D6%154-%5BCU%7D%2B%006%A7%9B%8F%FD%CE%9F%13%99%1C%26%15%9De%CB%AD%9F%22%97I%93M%C6Y%B9%EDf%BA%B7%DED%DF%B1%BD%18%18%84%9A%3B%11%04%89%C6%AEU8%DC%EE%05R%5C%8Az%D8%D4A%A8%B9%93%EEm7%B3%E5%B6O%23%9B%CCt%AD%BF%86-%B7~%92%E9%D1%1E%AA%EA%5B%E8%DEz3%B2%C9B.%95%20%15%9B%C5%EAp23%DA%CF%0B%8F%FC%80%8F%FF%FF%FF%83%BA%D6%E5%1C%D9%F5%08%A5b%1Ew%B0%1A%8B%C3A!%9F%01%C0%EE%F2%12jl%A7%A5%7B%03U%F5-(%E5%02%DEP%3D%1Bn%F8%25%96m%B8%9A%F9%F0%18%83%A7%0E2%1F%1E%C1%E9%F2%E0%F2U%91I%CC%2F%90K-s%F0%99%07i%5B%B5%85-%B7~%92%ED%1F%FDU%0E%3Es%3F%FE%EA%06%96m%BC%86%CE%0DWs%E4%F9G8%B2%EB%11BM%ED%AC%BD%E6%0En%B8%EB%F7%90%CD%16%CA%A5%3C%8F%FF%E8Kto%BD%91u%D7%DEIuc%1BU%F5mt%AD%BF%1A%B7%BF%9A%B5%D7%DD%89(J%14%B2I%92%F33%B4%AF%DE%84%AF%AA%06%5DS%11%10%D0u%1D%BB%C3M%3A%3A%CB%F1%17%9E%A4%7D%F56%5C%FE%EA%2B6%D9%8B%C5%22%EAe%3A%02.%9B%20%AA%A6%A2*%25%22S%23%A8%E5%12%BDG%F6%E0%F6U179Bu%7D%1B%A2%24%23%89%80%20%60%E8%06.%B3D%B6%AC%F3%F8%60%94LI%23%605%E12K%18%80(%08H%8B%AB%AC(%80(B%83%DB%C2%9Fm%AEgs%AD%9B%9C%A2c%16EJ%9A%8E%CD%24b%91D%04%C3X%CA%94Tu0K%02%02%06%A2%60%60%5E%DC%05y%60%3A%CD%B1%D94%5E%AB%8C%CB%22c%91%5E%B9MA%94%90d%13%A2%B8%A0%5Dj%BA%86%A1k%17%DDc%EB%CAM%08%92%CC%F3%0F%7C%0F%7FU%1D%B2lB_%D4%8Du%5DG%96%CD%A0%1B(%A5%02%26%B3%05%5D%D5%40%10%91%E4W4VI%96%97%5EK%8B%BF%B9%24%C44%0DA%12%11D%11MU%B0%3B%3D%A0%EB%80%80%D3%BD%60%2F%9C%DA%B7%03%8F%3F%84%DD%E3%C3lq%60%E8%3A%BE%60%0DJ%B1%C0%F3%0F%7C%17MS1%00%9B%C3MuC%2B%9F%F9%E3%2F%E2%F2%BF%92BW.%16%B8%E0%E2%93e3%92l%5E%EA%97%C5jG%D74%ACv'%DE%AAz~%E5%0F%FF%86%CE%0D%DB%97%0Cn%DD%D0(%E4R%98-V%BA%D6nE%D7%B5W%EC%17M%C7dZH%F4.%E6%B2%00%2C%DBx-%86%AE%23%9B%ADx%835%EC~%F0%FB%A8J%09UU(%97%17%3C%5B%D1%E9q%8E%3E%FF(%0E%B7%0F%A77%88%D9b%C5%D0tDQ%5C%18%9B%C5%BF%92%C9%C4%5D%FF%E9o0Y%AC%3C%7D%CF%D7%88%CE%8C%2F%8D%FD%3B%F3%2Cj%F4%F4%F4033%F3%EE%12%A4%AEu%05%93%83%3Dl%BB%E3W1%DB%ECto%BD%19%9B%DB%8B%CB%17%A0%AE%A3%9BTYe(%91g%26Sd%22%5Db4%5Db2S%E4T%24%CBh%AA%80%08%0C%25%0ADreF%92E%06%12%0B%03xWW%90%BC%A2%B1s%2C%CE%89%B9%0C%13%99%12%E1L%91%E1d%81XAa0%5E%604%5D%E4%D3%CB%AAya%22%C1K%13I%86%13%05zcy%26%D2%25%26R%25zc%0B%06%FB%602%CF%E9%F9%1CYE%23YR.2%E4c3%E3L%8F%F411x%16%A5T%201%3BAx%B8%87%F2%AB%5C%B1%A2%24%B1%EE%BA%3B%C9%24%A2%D8%5D%1EVo%BF%05%9B%D3%C5%D9%FD%3B%E99%FA%12%5D%1B%AE%A1%A6%B9%13%8B%C5%C1%9E%C7~%C2X%FFI%22%93%C3d%E2%F3K%AE%D5%99%F1~%22S%23%CCM%0C%11%9D%99dvlp%A9%FDDt%86%F9%A9qfF%FBI%C7%A3L%8F%0D%92NE%89NO0%3F3Nx%A4%97%B1%9E%E3%A4bs%A8J%89%D1%9E%A3%CC%8E%0D%90N%26%F8%E8o%FF%05%7D%C7%F6r%EC%F9%C7%D8%7C%CB%AF0%D1%7F%8A%DE%23%7B%18%3E%7B%04%E3UN%12_u%3Dg%F7%EFb%7C%E04%B1%99I%E6%C6%87I%C7%23D%A6F%99%1E%E9e%E5%96%1B(%15%F3%1C%DB%FD(%FD'%F7%91O'%17UL%13%5Bo%FD%15%0E%EE%B8%8F%FDO%FF%2B%BDG_b%DBm%9F!67I%CF%91%17%18%3C%7B%98mw%7C%96%CD%B7%7C%8A%9E%23%2F%B2%E7%D1%1Fs%F6%C0N%A23%13L%8F%F4%B1%F5%B6%CF%E0%F4V%F1%E0%3F%FD5%16%8B%0D%AD%ACrd%E7%23%CC%8E%0F0t%E60%E9x%84R1%CF%F4X%3F%E1%F1~%E6g%26%98%1E%ED%2517%C5%FC%D4(%E7%0F%EE%E6%EC%C1%9D%AC%BD%E6VBM%ED%94%0B%05~%FC%85%3F%A2%FF%E4%81%B7M%8E%99%99%19%FA%FA%FA%08%85B(%8A%C2%F9%F3%E7)%95J%97%E6%A1%7B%8D~%FC_%80%FF%06%F8%DF%94%89%AA%C2%EE%07%BEK%A0%AE%89%AEu%D7%20%99Ld%12%F3%C8%B2%99%40m%23%B3y%85%9E%F9%3C%8Dn3%20%10%CE%94X%11p%90)%AB%8C%A5%8At%07%ED%8C%A5%8A%D48-LeJ%D8d%91%D5U%0E%2C%92%C8T%A6%C4%B1%D94%5D~%3B%CD.%1Bg%A3%19dI%A0%C6ne(%91'%E40%B1%3C%60%E7%CC%7C%8Eh%5E%A5%D6i%A2%AC%1Ax%AD2%13%E9%12.%B3%C4%EA*%07EU%E7%C0t%9A%16%B7%05E7%D0%0D%83%D5UN%00%E6%26%86%88%84%C70%5B%AC%84%1A%DB%88%CDL%A0%94K4v%AE%C1%E1%F1%A1%A9%0A%A5B%8E%F0p%0F%AA%A2%B0b%F3%F5%00d%931F%CE%1F%C5%EE%F6%D1%BAb%23%92%2C%13%8F%84%19%3D%7F%9C%DA%96N%0A%99%0C%C1%BA%26%3C%C1%1A%D4r%89%91%F3%C7%10%24%11%A7%CBO%22%3A%83%C7WE%7DG%F7%02A%22a%A6G%FB%F1%04B%C8%16%CB%82%A1%DB%B2%8Ct%22B%B9X%A0%B6u%19%E1%A1%F3X%1D.l%0E%17%D9d%0C%B3%CDA%3A%16%A1s%DD6%B2%C9%04%B1%99%09%BA6%5C%CDD%FFif'%86h_%B5%19%7FM%23%C2%A2D%CEg%92%F4%9Dx%99P%7D%2B%AA%AA%90%CF%A4%A8nj%23%3E3%09%88t%AC%D9Blv%82%91s%C7%A8i%E9%A4%A1c%15%A2(-%D9i%83g%0F%93%8EE%E8X%B3%05O%A0%86%D9%F1A%E6%26%86%09%D45%D2%D0%BEp%1F%93C%E7%98%1D%EB%A7m%D5%16DIb%A2%EF4u%ED%2Bp%FB%AA%18%3As%98%B6%95%9B%88%CFM1%3F%3D%C6%B2%0DW35t%1E%04%01%B7%BF%8Al%22%86%D5%E5%26%1D%9D%C3%5B%5DG)%9F%A3%98%CBPU%DFB%7C~%9AR%3EGcG7N%8F%9F%A7%7F%FAu%DAVnb%D5U7%BF-%82%C4b1%E6%E7%E7%E9%EA%EA%22%91H%10%8DF%E9%E8%E8%40%92%5E%B73%A3%00%7C%7B%91%07o%8F%20%0B%E2J%A1%FF%C4%CB%E43IDI%C6%E6p%D1%D0%BE%0A%97%2F%F8%BE%8F%9CF%A6F%D9u%DF%B7h%5B%BD%85%8D7~%1C%B3%C5Z%09'%FF%3B%22%15%9Bcr%E0%0C%CB7%5D%FF%B6%BDY%9A%A61%3A%3A%8A(%8A%14%8BEjjj%F0%FB%DFp%8A%BF%8E%20%F2%DB%F9AI2%B1r%F3%8DK%3A%B9(~p2V%BC%C1%10k%AF%B9%83%A6ek*%E4x%0F%C0%E1%F6%B3%EA%AAw%B6%A3%DB0%0CL%26%13f%B3yI%C2%BEkq%90%D7%191%E2%07%2B%9D%CBl%B5%B3%EA%AA%8FTf%E6%7B%04%B2%C9%F4%CE%DB%90e%9A%9B%9B%DFVpT%BC%3C%26%EA%E8%9A%B6(%B6T%CA%85%1C%C9%F9%19%C6%FBO%D2w%7C%1F%A5B%8E%DE%A3%7B%18%1F8%FD%A1z%88%89%F9iN%EEy%8A%D8%EC%D4%BB%D2%BEa%E8L%0E%9E%E5%CC%FE%E7(d%D3%AF%B2%07U%D2%F1%08J%F9%D2%0C%CETl%8E%B3%07%16Rl~%11%18%EF%3B%C5%E0%A9%83Ks%E6%DF%1B%E5r%19M%D3.K%8A%5C%16A4U%E5%D0s%0F%F0%FD%FF%F9%3B%9C%7C%E9I%FA%8E%ED%E5%F1%1F%FE%1D%F1%D90O%FD%F8%EF%C8%26c%0C%9D9%C4s%3F%FD%FA%87%8A%20%26%B3%95%3D%8F%FF%84%93%2F%3D%F9%96%DF%CBgR%17y%CB.%15%82%20R%C8%A5y%F2%C7_aj%E8%DC%2B%13%3E%3A%C3c%3F%FC%E2%25%E5%90Eg%268%FE%C2c%F4%1C%DBKlf%F2m%DDg%A9%98%BFdr%0D%9C%3C%C0%B1%DD%8F1t%E6%08%F9l%EA%DF%FD%19%25%93IN%9F%3E%CD%D4%D4%14%DAe%10%F6%B2%08%22%9B%CC%D44v05t%9EPS%07%FE%DAFj%5B%3A%E9%5C%BB%0D%A7%2F%08%82%C0%F2%8D%D7%22%CA2%C6k2%A1%F2%D9%D4EI%8D%E5b%81%D8%EC%E4%92%B8%CBg%92%A8J%99l2%B6%B4J%26%A3%B3(%AF%CA%3DR%CA%25%E2sSo(%22%8B%B9%0C%89%B9%F0%A2%9Bu!%3B%B4%5C%2C%A0%A9%0A%99d%14U)%03%10%9F%0B%2F%AD%B8%17~%B3%90M%A3%BD%26S6%97N%90%8A%CD-y%EE.d%C4%26%A33%17%AD%D8%BA%A6%A1*e%9A%97%AD%C3%10%5E%131%D74b%B3%93%E4%B3)%0A%99%14O%DF%FD%F7%EC%DFq%EFR_%92%F33%E43%0B%93%A7T%C8Q*%E4(%17%F3%24%E7%2F%F6%D5%17%F3Y%9C%9E%00U%0D%ADK%D7%02%D8%9C%1E%EE%F8%8D%3F%A5%BEu9%85l%1A%B5%5C%22%97N%90%5E%0C%FA-%F5C%D78%FE%E2c%C4%E7%A6%F8%E5%DF%FBK%AA%1B%DB%96%EE%FB%C2%EA%9E%98%9F%26%9B%8A%2F%8Ds!%97AQ%CA%24%E6g%D0%17%E3D%87%9F%7B%90%C7%7F%F0E%F2%D9%D4%EB%9EA%7Cnj%89%08%B9t%82%BDO%DCM%F3%8Au%DC%F1%5B%7F%82%D3%ED%A3%98%CF.f%24%97Q%CA%A5%C5%C0%A4%81a%18Dg%26%16%A2%FF%40!%9BF)%15Q%952%B9t%02%5DSQ%CA%25%8A%B9%0CJ%B9H!%97y%5ByZ%C5b%11EQ%88F%A3%8C%8C%8C%BCa%5E%DA%15%B1A%ECn%1F%FE%EA%3A%2CV%07%81%DA%26%DC%FEj%F2%D9%0C%BA%B6%F0%83%8AR%E6%B5EOfF%7B%E9%3F%B1%9Ft2F%EB%8A%0D4%2F_%CB%B1%DD%8Fb%B6%D80%80M%1F%B9%8B%13%2F%3D%C9%F4H%3F%0D%9D%DD%8C%9E%3B%C6%CA%AD7179D%3A6%CB%5D%FF%F1%7FS*%E4%E8%3B%BEwq%80%8Bl%BD%ED3%98-%0B9V%91%C9a%CE%EC%7F%16%93%C5%8E%CD%E1%A4y%E5%06%9E%B9%E7%EB%AC%D9~%2B%9D%EB%AFf%F7%83%DFc%F5U%1F%A1%90%CB%90K%25)%15s%AC%BD%E6%0E%8E%ED%FE9%E9x%14C%D7%A8k%5B%C1%B6%DB%3F%0B%40%EF%D1%97%98%1A%3A%87(I%D4%B6%2C%A7%7D%F5V%9E%F8%F1W%08%D44R%CCgP%8A%05n%FB%CD%CF%23%08%22%87v%DC%87%B7%BA%8E%B1%DE%13%AC%BD%FA%8E%8B%08%D6%7Fb%1F%9A%AA279D%F7%D6%9B%19%EB%3DI*%16a%ED%D5w%D0%7Bt%0F%9AZ%A2%90M%B1%E1%86%8F%A3%A9e%9E%BD%F7%5B%2C%5B%B7%9D%D1%BES%D4%B7%AF%E4%FA%8F%7F%8E%E9%D1%3E%CE%1F~%01%8B%D5Ftz%0C%D9%FCJ%C9%80%F0%F0y%0E%EFz%84%3B~%F3O%98%1C%3C%C7%B9%83%BB%E9X%BB%85%DE%A3%FB%B8%FA%A3%BFN%E7%BAmK%8B%D1X%CFI%F2%D9%24%E1%E1%F3%8C%F5%9C%20%9B%8A%A3i%0A%CB7%5E%87(ID%C2%E3h%E5%22%CD%2B%D6SU%DB%CC%E3%3F%FA%0A%CD%CB%D72%1F%1E%C5%E5%0Br%FD'~%87%C9%813%8C%F7%9Df%A2%FF4%9Dk%AFB%92M%18%BA%CE%B1%DD%8FQ%C8%A7)%15%F2%AC%D8t%3D%A5b%9E%A9%81%B3%F8%AB%EBY%B1%E9%3A%1Cn%3F%D3%23%BD%EC%BA%FF%DB%DC%F9%B9%3F%C7d%B1rp%C7%7Dl%BF%E3W%19%3As%08D%91R1%C7%A6%1B%3EN%FF%C9%03L%8F%F4q%DBo%FC!%CF%FC%F4%EB%B4vo%A4m%D5fv%DC%F3%8F%04j%1AI%C7%22%DC%F8%A9%FFo)%F3%E1R%11%0A%85p%3A%9DX%2C%16FFFH%24%12%04%02%81%2B%2BA.%AC%CE%9A%AA%A2i*%92%2C%E3%F6W%A3%BFE%16%AFR.%F1%F4%3D_'P%DBD%B0%B6%99%D9%89!%9E%FB%D7o%A2i%3A%EB%AE%FB(C%A7%0Fqj%CFS%B8%03%D5%8C%F4%1C%A3k%FDv%8A%85%2C%7D'%F6%B1%F6%9A%DB%19%ED9%CE%CCX%3F%C7_x%9C%81%D3%07%A9%AAoa%CF%A3w3%B0%188%D2u%8D'%FF%F9%2B8%3C%01%D6%5E%7B'%A7%F6%3E%C3%F4P%0F%0E%8F%8F%E1%F3G%00%83%9A%E6.%E6%26%869%F4%ECC%04j%9B8%BB%FF9%CE%BC%FC%2Cf%9B%8B%E9%91%3E%BA6%5CK%A0%F6%15%23.%97I%D0%D0%B9%1AC78%B8%E3%3E%CC6%1B%B9T%9CTt%8EU%5B%3F%C2%F0%B9%85%C0%DD%BE'%7FF%24%3C%C6%8AM%D7%13j%EA%B8(%15%3D%11%09%F3%C2%C3%3F%C4d%B1%B0%7C%E3u%F8%AA%EB%A8n%EC%A0i%D9Z%9C%5E%3F%8AR%A2m%D5f%C2%A3%7D%9C9%F0%1C%FE%DA%26%26%FAN%E1%0ET%D3%B2%7C%1D%A7%F7%ED%20%9D%98%E7%E9%BB%BF%86%BF%A6%91%15%9Bo%C2%E9%09%A2%AA%AFH%10%97%AF%8A%D9%B1~%A23%93%F8C%8D%0C%9C%3EH%FB%EA%AD%D8%1C.N%EEyj)%02m%B6X%A9m%E9%A2%B6y%19u%AD%CB1%80%E9%D1%5E%BA%B7%DEL2%3A%CB%0B%0F%FD%805%DBo%25X%D7%C2%CE%7B%BF%89%A2%96ID%C2%18%BA%C6%B2%F5%D7p%E6%E5g%89N%8F%D3%D8%B1%9APS%1B%0D%1D%DD%88%92%BC%A8J%ED%E7%F0s%0F%B0%EE%DA%3Bq%B8%7D%3C%FB%AF%DF%C0%E6tS%D5%D0FS%D7%1A%AC%F6%85%F8S%A8%B1%9D%7C6%CDD%FFi%04A%A0%B1s%0D%A7%F7%3F%CB%C4%C0%19%D6_%FF1%92%91%19%F6%3Ev7N%8F%8F%A1%B3%87%B0%DA%DD%E8%BA%C6D%FFi%ECN%0F%91%A9Q%0C%C3%A0%7B%DB%CD%98%AD%B6%B7%A1%A6%0A8%9DNL%26%13%C1%60%F0%92%A5%90%F8v~%08%84%8B%0D%1DQ%5CH%CC%13%16%DF_%FC%CE%05%D5af%BC%9F%C6%CEU%5Cu%FBg%B8%EE%E3%BF%C5%F0%D9c4%2F%5B%83%D3%1B%A0%AA%BE%99%D9%B1A%1Cn%3F%A1%86%16%82%B5%CD%D4%B7-%C3%1F%AA%A3%B6e%19%D5%0D%0B%03%3B%3D%DA%87%80%80l%B6r%E7%E7%FE%8C%9A%E6%CE%85%D5%B1%90'%3C%D2G%EB%AA-x%83!%DC%81*%E6%26%87%B9%ED%D7%FE3%E1%E1%5EF%7B%8E%B3l%C3%B5d%D3qTEA%10E%B6%7F%F4%D7%E9%DE%F6%11%2C%16%1B%D5%0D-%AC%DAv3%9Dk%B7-%DDN%B0%B6%99Dd%9Ab!%87d2!%00%BEP%1D5M%1D4tt%E3%AFiDS%15F%CE%1E%A5%B5%7B%03V%87%0B%977%88%F0%AA%94%96PS'%5Bn%F9%15%9E%FD%D9%FF%E5%F4%FE%9DXl%0Elv%17%9E%405f%8B%0D%7Fu-%E1%91%3EL%A6%05%D7%A3%D9b%C3_%D3Hm%CB2%1A%3BW%E1%F6%05H%C7%E6%89%CDN%D0%BD%F5F%9C%5E%3Fv%97%87W%EF%10%B3%B9%3C%F8B%0D%88%A2%88%D3%E3%A7%BA~a%FC%1A%3A%BB1%D0%97tmQ%92%B1%BB%3C8%DC%5E%EC.%2F%9E%40%0D%C1%9A%16%96o%BCn!S%DE%90%F0U%D5R%DF%BE%92R%3EG.%95%A0%BA%A1%95PS'%0D%9D%DD8%BD~4M%C5%EAtaszqz%02K%CF%7F%BC%FF%14%0Eo%00%B7%BF%9A%E6%15%EBHD%16%D4%5C%9B%C3%8D%DB_%BD%94%E2%E2%F0%F8%B9%F93%FF%913%07v%11%9B%99d%E5%E6%1B%98%19%EB%A7%A6e9v%A7%87%9A%E6eL%8D%0C%60%B2Xq%F9%16V%F6%40M%23%16%9B%03%D9d%C1WUKS%D7j%BA%B7%DE%84g1k%F9%ED%C2f%B3%E1%F3%F9%DE%1D%82%94%8A%05r%998%C5%7C%F6U%C6%7B%99%7C%26%81Z*R.%16%16u%DB%0B%AB%97%0D%977%C8%E9%7D%CFR%C8e%C8%A6b%D44%B535x%96b.C%3C2MMk%17j%B9H%26%15G%D3T%B2%A9%24%C5%5C%16%A5%5C%22%9B%8Ac%18%06%C1%FAf4M%C1%1B%AC%A1u%D5%26L%8B%AA%86%C5%EE%A4%BA%B1%9D%F1%FE%13%E4%D3I%B2%A9%D8%92%EA%E7%F2%069%B0%E3%3E%BC%C1%1A%AA%EAZ(%152x%ABji%5E%B1%01%A7%C7G.%1D'%9BN%A0%94%2F%DEc%F1%E8%F7%BF%08%86AuC%2B%C5%5C%16%B5%5C%26%9FN%91%CB%A4(%16s%E4Rq%D4r%99%FA%B6%15%8C%F4%1C%A7%90M%93%8AF%C8%A5%93%18%C6%82%AA9%3B6%80%BF%BA%81%FF%F0%85%7F%26%3C%7C%9E%99%D1~t%5D%239%3FK%22%12%E6%89%1F~%99%86%F6%95X%9D%1E%F2%B94%AA%B2%60%3F%14%B2i%8A%F9%0C%99d%0C%8B%DD%81%CBWE%EF%D1%3DdS1R%B19J%85W%8C%7C%AD%5C%22%9B%8C%A3%94%8A%94%0B9%B2%A9%04%AAR%5Ep%06%14%F2%17%AD%92%F9%C5%84%CB%0B%3B%0C%B3%E9%85%FF%D7%B5.G)%E7%C9gS%CCM%0Ccq%B8p%FB%ABI%C7%23%14%B2)%8A%F9%1C%F9L%1AMU%D0u%9D%E4%FC%CC%E2%EE%CB%85%B6%EB%DB%BB%C9%26%A2%14%B2i%C2%83%E7%09%84%1A%B0%DA%ECd%92%B1%D7%19%E7%ED%AB6%93K%C5%19%3Cu%00%BB%DBK%A8%B9%8B%E9%B1%5E%8A%F9%2C%B1%991%EA%DA%3A%B19%BD%A4%A3s%E4%D2%09%E2%910%B9Lra~%A5%13W%CC%FBf%B7%DB%DF(%8A%FE%C61%BF%BF%F9%9B%BFy%F5%EB%AB%81kX8%DA%E0%F5%EEF%5Dg%E0%D4%01%22%D3%A3%B8%DC~%1A%3AW%23%08%02%B3%E3%83L%0C%9C%A5%A1%7D%25%A9%E8%1C%89%F9Y%DAV%AE%C7%E6%F4%20%C9%26%82%B5%CD%9C%3D%F8%1C%B1%D9)%BC%81%10%DD%DBnbr%E0%2C%B1%B9I%5C%DE%20%9Bn%BA%8B%F1%BE%D3%24%A3s4u%ADbz%A4%17%DD%D0%08%D6%B50r%FE%24%DE%40%88%CD%1F%F9%24%13%FD%A7%18%ED%3DI1%9F%A5%B6e%19f%8B%15A%10%A8i%EA%60%AC%E7%04%B1%D9%09%825M%AC%BF%F1%97%90Mf%9C%DE%00NO%80%A6%AE5%D44u%90%8CE%E8%3F%BE%8FR6%8D%3FT%CF%EC%E4%08%89%C8%0C%CD%5D%ABq%B8_YQ%D2%F1%08%B1%E9q%9C%BE%20%E5B%1E%97%2FH%24%3C%82d6%E1%AB%AEc%F4%DC%09%7C%A1%066%DE%F4%CB%0C%9D%3ED%26%3E%8FR.%A1k*m%DD%9B%90%CD%16%B2%C9(g%0F%3E%8F%AA%96%A9m%EEb%C5%96%1B%D0%CA%25%FA%8E%ED%A3%BA%A1%1D%A5T%20%97N%60%B5%3B%D1%14%05%9B%C3%C5%F4%E8%20%BE%EAZt%DD%60r%E0%0C%9Dk%AF%A2%AD%7B%13'%5Ez%12C%D3(%E6%B3%D8%DD%3E%9A%BA%D6%20%08%02%C9%E8%0CC%A7%0FQ%DB%DCE%A9%90%2325N%7D%FBrb%B3%13%A4%13%F3t%AE%DD%8E%C5%B6%90%988x%E60%F9L%92%96%E5%EB%08%0F%F7%90IDiY%B9%81%BA%D6e%08%A2%B8h%97DYw%ED%1Dx%83u%F4%1D%7F%19%D7%A2%D4%1A%E99NS%C7j%1A%3AV%D3%7Bl%0F%A2(R%D7%B2%1CA%14%09%D65%A1(E%A6%86%CE%93K'%D8r%CB%A71%DB%1C%0C%9C%3A%88%DB%1BX%EA%EB%85%C5%B2%5C%CCQ%D5%D0J%5D%EBrj%5B%BA%88%CDL%12%9D%99%00%C3%60%EB%ED%9F%A6%BA%BE%85%C9%A1s%CC%87%C7%90%C4%85%A4%D6%60M%23c%FDg%B0%3A%5C%B4%2C_%7F%D1%DE%9A%2B%0C%158%0A%ECZ%D2%98.'%D5D%D3TJ%85%1Cf%8B%0D%A5T%C0bw!%8A%E2%D2%5Ed%C3%D0%17%F6ZH%12%82%20.%AD%F2%17%0C%C5b%3E%83%7B1%7DYS%CA%A4%E2%11%FC%A1%86%25O%8D%24%CBh%8A%B2%60%FC%19%3A%86n%20J%22%9A%AEc%B59%16u%FB%19%5C%BE%C0%EB%D2%0E%CA%8B.H_u%FD%BF%19%0B%B0%DA%9DXl%0EJ%85%DC%C2B(%80%C5vQ%BD0%B2%A9%18NO%00MS)%E6%B2%98%2C%160ttc!%0B%D90%0C%2C6%07%86%A1%93%8EE%F0%04kP%CAE%C4We%EEj%AAB*%3A%87%2FT%87%20%2C%3C%D4%5C*%81%C5%EE%406%99%97~%A3T%C8%A3%A9e%CC%16%1B%AAZF%10%25%84E%F7%AE%C9b%A5%98%CF%A2)e%1C%1E%3F%E5b%1E%93%D9%8A%20%8A(%A5%12%BA%AE%22%08%22%BA%AE%22%CBf%14%A5%8C%24I%18%86%8El%B2%20%C9%A6%05%9BQ-%2Fd%3D%08%E2%82%F7hA_%C6b%B5%2Fy%0C-V%3B6%A7%9Bri%F1y%EA%DA%A2%3A%BDp%8D%D9j%A7%5C%CA%A3%96%CA%D8%DD%DE%8B%BDX%910%0E%97%0F%8B%CD%BE8%1F%0CtM%C3d%B5!I23%A3%FDL%8D%F4b%B1Z%E9Z%7F%CD%92m%02%10%9B%99%C4W%5D%B7%B4w%C40t2%89%18n%7F%15%9A%AA%A0%94K%88%A2%84%AE%AB%98%CC%D6%8B2%A3%AF0%AEL.V%05%15%5C.z%8F%EE%E5%F4%FEg%F9%C8g~%9F%60%5D%F3%7B%B5%9BW%26%17%AB%82%0A.%17%5D%EB%B7%D3%B2b%1D6%A7%FB%7D%D5%EF%0F%5D%5D%AC%0B%C1%C3%0F%02%0C%5D%A7%5C%CC%2F%15%3A%B8%2Cw%BD%AEQ*%E4%DE%D6%B5o%07%92%2C%BF%EF%C8%F1%A1%93%20%BA%AEsx%E7%83%A4c%11n%FB%8D%CF_%91D%B8%7FO(%E5%22%3B%EF%FB%16N%97%8F%EB%EE%FA%9D%A5%D8%C4%25y%23%0B%B9%85k%3D%01n%B8%EBw%91d%13%A5B%9E%E9%91%5E%04A%406%5B%D0u%8Dr%A9%40U%7D%2B%9E7%D9%FA%AA%A9%0A%07w%DC%CF%F2%8D%D7%12%ACo%F9%C0%CD%99%F7%BC%049%7Bp%17%91%A9%91%2Bs%B3%A2%88%BF%AA%9E%BE%E3%FB%3E%10G%FC%98%17%0D%EC%C13%87P.q%87%DCR%2C%C0%E1%C6%E1%F21x%EA%20%CA%A2%93e%F8%EC!%9E%FA%C9%3F%10%9B%9B%E4g%7F%F7y%C6zNp%E0%E9%FB8%B2%F3%E1%B7%90%0C%26%0A%B94%9A%AE%91%8C%CErv%FFN0%40-%978%B5%F7)%8A%B9%CC%FBz%8C%2F%CB%CD%7BA%AC%8F%F5%1Cgf%7C%00%B7%BF%0A%D9dfj%E8%3C%C3%E7%8E%602%5B%B09%BD%8C%F6%1C%25%15%8B%10%09%8F271%88%C3%ED%E3%DC%C1%5D%14%F2Y%7CUu%0C%9D%3DL2%16af%B4%97%D8%EC%24%C1%BAff%C6%FA%99%1D%1F%C4%E5%0D0t%E60j%A9%88R.%F2%E07%FF%8At%7C%9E%C6%AE5X%ACv%06O%1D%2429L%A0%B6%81%F8%5C%98%C9%813d%93q%22S%23%04j%1B%01%81%F1%BES%84%87%7Bp.%06%9C%0CM%23%1D%8F2z%FE(f%9B%9D%B9%C9!%ECN%0F%E1%91%3E%FC%A1%86%C5%D53G%FF%89%7D%A4%E3%11%BCUu%8C%F5%9C%20%15%9Fcv%7C%88%E9%B1~%82%B5%CD%88%A2H%26%1E%A1%F7%D8%1E%0CCG%14%25%FA%8E%ED%05%04d%D9D%FF%C9%97%91M%26%24%D9%CC%F9%23%2F%92%CF%24%F1U%D51%3Ep%9A%F8%CC%24%D1%99I%F2%99%24%9E%405%B9L%92%BEc%7B%D1u%15%AB%CDI%FF%89%7D%0B%0F%C4d%A6%E7%C8%8B%A4%E3%11%7C%D5u%24%22%D3%8C%F7%9F%C2%E5%ABbj%F0%2C%89%B9i%3C%C1%D0%92W%2C1%17%26%93%8A%D3%BD%E5%26DYf%E0%C4~f%C6%FBp%FB%AA0%99-%E4%D2q%FAO%EC%25%15%9B%C3%1B%ACE%14%252%89%85%B1%98%9D%18D%D75%BA%B7%DD%8Cl2%A3*e%DAWoe%E5%E6%1Bx%E9%E7%3F%E1%86O%FC.%EB%AE%BB%9Dl%22Fln%02%93%D9%8A%C5%EE%A0T(%A0%AB*%83%A7%0F%10%9D%19'%D4%D8IMS'G%9F%7F%98%DD%0F%FD%80%60m3%D1%991%9E%F8%D1%971%5B%1D%D4%B6v%A1)ez%8F%ED!%9FN%E0%09%D42r%FE(%E9x%84%D9%F1AT%A5%8C%D3%1Bx%2F%F0%E1un%DE%CB%96%20%2F%FE%FCGL%F4%9Ff%F8%CC!v%DD%FBm%CE%1D%DC%C5%91%9D%0F%E3%F6W%F3%EC%CF%BE%C1%CCX%3F%13%FDgx%E0%FF%FE%0F2%89(%3B%EF%FF6%BB%1E%F8%0E%E9D%94%C7%7F%F0%25%E6%26%86%98%E8%3B%C5%E3%DF%FF%5Bd%D9%C4K%8F%FE3%87%9Ey%80%7C%26%CD%CF%BF%FB%7F0%0C%83%9E%23%BBy%F1%E7%3FF)%151%C9fDQ%40%14%25%5Ez%F4%9FIEg%88%CFM%B1%E3%EE%AFS%CCex%E4%3B%FF%873%FB%9F%E3%C8%AEG%962e%E7%C3%23%3C%FA%DD%2F%60h%3A%CF%3F%F4%3D%F6%3E%F1StM%A5%EF%E4%3E4%5D%23%15%9B%A3%98%CFr%E0%E9%7B9%F8%CC%FD%E4%B3)%5Ex%F8%07%18%BA%C1%D9%03%BB8%FC%EC%03%8C%F5%9D%E0%A1%7F%FAktM%E1%85%07%BF%C7%B9C%BBH%C5%E7x%F1%E7%3F%C2%E5%09%B0%E7%B1%9F%D0w%7C%0F%7B%1F%BF%87S%7B%9FF6%5B%E89%F2%22%89%C84%CF%3F%F0%1D%AC6''%F6%3C%C5%D1%DD%8F%12%0B%8F%F1%C07%FE%8A%9Ec%2Fp%EE%D0.0%0CDQ%E2%E5'%FF%85C%CF%3C%88l2%D3w%7C%0FsS%23%3C%F1%83%2F!%88%12%23%E7%8E%B2%FB%A1%EF%93%CF%A4x%E2%C7_%26%15%9Be%7C%F0%2CO%FF%EC%1F)d%5E%09%C0%A9%AA%02%86%81%A6i%3C%F7%AF%DFdz%BC%8FR.%CB%13%3F%FA2%C9%F9i%9E%FD%D9%3FQ%CA%178%F1%D2S%9C%3B%F8%3C%B9t%82G%BF%FF%85%C5*%24E%CA%A5%C2%12%D9j%5B%96%D1%B2b%3D%E5b%1EI%96)%17%F3%B8%FD!%9A%97%AF%E3%F1%1F%7C%91%E8%F4%18%03'%0E%F0%D07%FF%17%BA%A1%D3wb%1F%A9X%84G%BF%FB%05%26%FAO!%C9f%24IB%D7T%0C%5DG%94M%80A1%9Fc%D7%7D%DF%C6d%B6pz%FFs%1Cy%FEa%86%CF%1E%E1%89%1F~%89%9E%C3%2F%D0s%F4%C5%0F%86%8A579%CC%D9%03%3Bi%EC%5C%CD%D5%BF%F4%9B4-_%CB%91%E7%7FN%A8%A9%93%F6U%5B%B09%5C%1C%7D%FE%11j%9A%BB%F0U%D7%B2%EA%AA%8F%D0%BA%7C%3D%A2%20%B2%ED%F6%CF%60%B5%3B%89%CDNR%DF%DE%8D%CB%1B%A4k%C3%B5%AC%D9~%3B%C7%5Ex%1C%B7%3F%88%C5%EE%C4d%B6R%D3%D4%05%BA%8E%D3%1B%C0_%D7L%FB%EA%AD%18%BA%C6%D1%E7%1F%A1T%C8%A3%94KDg%C6%B0%3B%3D%F8%AA%EBX%7F%DDG%F9%D4%1F%7D%01%93yA%E5X%7B%ED%9Dx%02U%CC%8E%0F%90%8AL3%7C%F60s%13Cl%BE%F9%938%DD~lN%0F%EB%AE%BD%93%8E%B5%5B%89%CDN%10%9D%1E%E3%E4%9E%A7%10D%01%03%9DHx%8C%EA%FA6%BCU5%AC%D8%7C%03%0D%ED%DD%C4f'%19%3A%7D%98%A13G%10%24%89B%26%85%AEi%5C%FBK%BFNx%B8%87%C4%5C%98%0D7%FE2%A5R%81%D3%2F%3F%83%20%0A%94%0AY%A2%D3%E3T5%B6%E3t%7B%B9%E3%D7%FF%84%9B%3F%FD%FB%20%08%D8%1C.%AE%FB%C4o175%CC%FC%F4%18%EB%AE%BD%93B%3AItz%8CU%DBnf%E5%D6%9B9%F3%F2%B3%00%B8%BDU%18%9AFMC%2B%B2%C9%84%A6%BD%DA%C9%60%20%C9%262%89%08%A7%F6%3D%CD%E6%9B%3F%C9%C6%9B%3F%C1%CC%D8%00%E3%FDg%D8z%FBg%08%D46%92%88%84%C9%A6%13%9C%DA%BB%03%A5X%A0c%CD6%9A%BBVc6%5B%5EW5%C40%8CW%A5%0C-%E4Q%B5%AE%DC%C2%EC%F8%10%89%F9)%E6%A7%06%19%3C%7D%90%95%5Bnb%D5%D6%9Bqx%7Dh%9AFU%5D%0B%A1%C66Z%BB7R%D7%B6%92%40M%23%CB7%5D%CB%F4H%2Fg%0F%3D%8F%A6%BE%B2%87%C8_%5D%8F%3F%D4%C0%1D%BF%F5%A7%5C%F3%B1%DF%FC%80%D8%20%86N%B1%90C%D35%FC%D5%F54u%AE%26%9FN!%99%16%8CCA%14A%B8P%F2%C6%84%2C%9B0YlX%AC%F6%C5%D7%F2b%88%DF%40Z%0C%F4Y%ECv%04Q%40_%2C%BF%23.%06%B9X%2C%8B%A3%14%0B%88%82%B8%14%18%0B%D6%B7%B0%ED%B6O%F3%D9%CF%7F%19A%9404%0D%B3%D5%8A%D5%EEDX%2C%FBc2%5Bi%ED%DE%CC%CE%7B%BF%C5%96%5B%3E%85%D9j%E3%F0%AE%87%A9nl%07%04%04%04DI%C2d%B6%22%9BL%A8%8A%82%A1%1B%04j%9A%F8%E8%E7%FE%82%5B%7F%F5%0F%D1u%15q)%E0i%5DRAd%93%89%BA%D6e%7C%FA%8F%BF%C8%9A%ABo%A7u%D5fr%998%7B%1E%FF%09%B5-%CB%10t%D0u%83%EA%866%3E%FE%7B%FF%9D%1B%3F%F9%7B%E8%AA%8A%20%8A%98%AD%8E%25%BB%01%A0%B5%7B%23%92%24%F1%FC%FD%DF%A1%AA%A1%1DI%92%966%F4%C8%A6%85%60%A9%20%2C%04hE%D9%84%C1B%C9%23A%7CU%9A%84%20%2C%D9S%BA%B6%10d%15%16%C7%AB%5C%CCsx%E7%83%E43I%BC%C1ZLf%0B%AAR%C6X%7C%EC%BA%B1Px%EF%B5%91i%D9dB%D74%C4%0Be%8C%04%81%D5%DBo%E1%F0%CE%87pz%82%AC%BD%F6Nv%FE%EB7q%FB%828%3C~%C4%C5%FE%AA%9A%82%A2%94%91%CDV%10%0C%94r%11Y6%2F%96%0D%D2%A8m%EE%E4%F6%CF%FD%19%B7%7C%F6%0F(%97%0AH%92%8C%CD%E9%C1l%B5Q%CCg%97%02%94%EF%5B%82%04k%5Bh_%B5%85%83%3B%EE%E3%DC%A1%DD%CCO%8F%B3%F6%DA%DB%99%1A8%C7%F0%99%C3dSq6%DDt%17%91%A9%11%22%E1qR%F1%08%F1H%98%E8%EC%24%99D%94%E8%CC%14%F1%C5d%B6%D8%EC%04%E3%7D%A7%18%EF%3D%C9%DAk%EE%C0W%5D%8F%20H%1C%7C%E6~%E6%C2c%CCM%8E%A2%94%8A%B8%BC%01%8E%BE%F0(%86%A1%D3%BD%F5%26N%EF%7Fv%A1%DA%E1%E8%00%D9T%94%D8%EC%24%D3%A3%FD%AF%EB%EB%CA-7%91%8EGi%5B%B5%99%BA%96eH%B2%8Cl%B20%1F%1E%23%3A3Ib~%9At%2C%C2%F4%C8%00%BE%EA%3A%1A%3BWql%F7%A3%8C%9C%3FFdj%84%D8%EC%24%F1%D9i%B2%A9%18%C9%E8%0C%E1%91%1EZWl%C0l%B1s%7C%F7c%8C%F5%9C%20%3E%17%C6%ED%AB%A6%7D%F5%D6%85%12AN%0F%CD%2B%D6S%DD%D0%C2%B1%DD%8F2%DAs%82%D8%DC%04%B1%D9I%A23S%CC%87G%2F%EA%A3%C3%E5%A3k%C35%A4%E3%11%ECN7%1D%EB%AE%C6%EE%F4%D0w%E2e%CE%1Dz%9E%95%9Bo%C0%1Fj%C4bwqx%D7CL%8F%F4%11%9D%9E%BC(')%15%9D%25%3C2%80%D9jg%E5%E6%1B9%BA%F3aN%EEy%92PC%1B%B5-%CB8%7F%E8%F9%85%BD%0F%86%CEx%EF%09%BA%D6_M!%97Zt~%8C%11%99%1A%5D%DA%07r%01%E3%FD%A7%88%CF%85%19%3E%7Bdi%3F%CE%8A%8D%D7a%60%E0%AB%A9%A7y%F9z%60!%C12%9FI2%1F%1E'25%8A%2FXGb~%86%D3%FBv%20J%26tM%E7%C0%8E%FB%A8k%5DNMc%3B%C7%F7%3C%C5x%EFI%E6%A6%86I%C7%E7%99%9D%18%22%BDX*i%E7%BD%DF%E5%C4KO%BF%BF%8DtQ%92h%5B%B5%09%5D%D7P%CB%25ZVl%A0c%CDV%CC%16%0B%99T%8C%D5%DBo%A1%BEm%25%E5R%81%BA%96e%F8%AAkq%7B%82%84%9A%3Apy%83x%835%D44%2F%A3%98%CF09x%86%B6%EE%CDT5%B4%B1%E6%EA%5B1%99-%D44w%92O'h%5B%B5y%A1%26l%7D%0B%0D%1D%DD%E8%BAF%A0%B6%99U%DBn%A6T%C8%A2%94%8A4vvc2%DB%F0V%D7%E2%0D%D6%E2%0F%D5%2F%A9%04%00._%90%CE%B5%DBpy%03%04%EB%5B%E8X%BB%0D%BB%D3%B3%98%C7%D5%85%DB_%85%CBWE%B0%AE%99%C6%8En%DAWo%25%9B%8E%23%88%02%0D%9D%0B%25p%EA%DBV%E2%F2%05p%07B%04BM%B4uo%A4%A1s%15%D1%99%09%9C%1E%3Fum%CB%91Mfj%5B%BA%E8X%BD%15%BB%CB%83%C9b%A5u%E5%06%92%F3%D3Xl%0E%EA%DB%BB%D1u%9D%9A%96.%3C%BE%AA%D7%19%A3%9A%AAP%DB%B2l%A1%CE%96%CDAc%D7%1Ab%D3%E3%04B%8Dl%B8%E1%97%B19%5C%D4%B5%2C%A3T%CC%D3%D8%B1%8A%96%15%EB%F1%87%1A%B09%DC%18%BA%0E%82Hh1%F3%B6k%FDvr%D9%14%82%20%B0%E9%E6%BB%A8nh%23%D4%D4%81R*%B2%7C%E3u8%3C%3EZV%AC%A7%B1%BD%9B%C4%DC%14M%9Dki%EC%EC%C6%1Fj%C0%EAp-J%15%83Dd%9A%96%95%1B%F0%06C%F8j%1A0%99%CCH%26%13%AD%DD%9B%A8i%EA%C4%E5%0D%D0%B5%E1%1A%FC%D5%F5%94%0A9%DC%81%10Uu-4u%AD%C1%ED%0D%22%88%22%8D%9D%AB%A8nhCS%CA4u%AD%A5k%DDv%E2%910%16%9B%83%DA%96.%CC6%3B%C1%DA%16%BC%D5%B5%D8%1CnTE!X%D3%80'%18zO%19%E9W.%D5d%B1%BE%EA%A5%60%D7%FD%DF%E1%E4%DE%A7%F9%83%2F%FD%F4%BD%E1%BDx%8B%BE%2F%E9%E3W%18%B1%D9)v%DC%FDU%96m%BC%86%F5%D7%7F%0C%93%D9%FA6%BA%7D%E5%FB%F6%DA6%17S%D5%DE%CD%C1%E7%3D%E4s%7F%17SM.%F1A%E9%AAJS%E7j%BCU5%14%B2%A9%F7%06A%DE%A2%EF%EF%069%00%5C%DE%00k%AF%BB%83%A6%CE%D5o%8B%1C%EFV%DF%5E%DB%E6%BB%3Fu%DF%DB%01%A9_x%24%5D%94e%96m%BC%96%0F%3B%CCV%1Bk%B6%DFF%05%EFmT%CE(%AC%A0%82w%83%20%BA%AE%A3%BC%8D3%F3TU%BD%EC%12%F4%97%0AEQ%DEV%9F~%11%7D%AB%E0CF%90R%A9%C4%E8%E8%E8%9B~%9E%CF%E7%C9%E5rK%13%B7X%5Cp%17%C6%E3q%C2%E1%F0%25%1B%8C%97%FA~6%9B%25%1C%0E_V%CD%A3%D7%22%1E%8F3%3D%3D%FD%9E9%FE%AB%82%F7%99%0D%A2(%0A%F1x%9CB%A1%80%C5b!%97%CB133%83%D9l%A6X%2C%22%2C%16m%B0X%2C%84%C3a%1C%0E%07---LNN%92%CB%E5hnnFQ%14%12%89%04%16%8Be)0V*%95p%B9%5C%94%CBeJ%A5%12%8A%A2%60%B5Z%91%24%89P(D6%9B%25%16%8Ba%B7%DB%11%04%81%7C%3E%8F%C5bY%AA%B9%1A%08%04%98%99%99%A1X%2C%A2i%1A%92%24a%B5Z1%0C%03%5D%D7%C9%E5rX%2C%16t%5D%A7%A5%A5%85D%22A%A1P%C0j%B5R*%95%10E%11UU)%16%8BK%F7%16%0A%85*%B3%A3%82%CB%23H2%99%24%16%8B!I%12%C5b%11%9F%CF%C7%F4%F44%0E%87%03Y%96%C9%E7%F3%98%16S%C8eY%C6%EF%F7%23%8A%22%D5%D5%D5%E4%F3y%9CN'%D1h%14%A7%D3%C9%DC%DC%1Cv%BB%1D%93%C9D%2C%16CQ%14%CA%E5%F2%D2%84%9F%9B%9BC%10%04%FC~%3F%E1px%E1%A8%E1b%11%B3%D9%8C%A6i%A4%D3i%1C%0E%07%F9%7C%1E%AF%D7%8B%24I%B8%5C%AE%25%09%93%CDfQ%14e%C9%2B%A3(%0A%85B%01%5D%D7)%95JD%22%11%DCn7V%AB%95%D1%D1Qjjj0%0C%03%A7%D3I%3A%9D%A6%AA%AA%EA%03Ww%B8%82w%99%20N%A7%93%5C.%B7%24%25%00Z%5B%5BQU%15A%10%F0x%3C%E4r%B9%C5%3D%D1%06%B2%2C%A3%AA*%E9tz%A9H%97%DB%EDF%D7u%1C%8E%85%3D%E0%16%8B%05%8B%C5B%A1P%C0%E5r%E1p8p%BB%DDh%DA%C2%A9F%92%24%E1%F3%F9%C8%E5r%98%CDf%0A%85%02%A5R%89%C6%C6%C6%A5k.H%0E%AF%D7%BBT%C5%3B%1A%8D%E2v%BB%97%FA%22%8A%22%F9%7C%1EA%10%B0Z%AD%B8%DDnL%26%13%5E%AF%F7%A2%FB)%14%0ATWWW%C8Q%01%F0%0E%03%85o%14%A8%BA%F0%DE%85v%CB%E52%AA%AA.%11%E2R%DBz%A3%B6%0B%85%02%A9T%0A%BB%DD%8E%DB%FD%CA%EE%B4%0B%D2%E8%82%04y%B3%EB%DF%EA7%2F%1C%E3%F0n%05%06%2Bx_%E0%CA%06%0A%DFh%22%5Dx%EF%C2%DF%0B%12%E2r%DBz%A3%B6%ADV%2B%16%8B%E5u%AB%7B0%18%7C%5D%9D%A3K%99%E4%AF%FE%CE%856%2B%E4%F8%60AUU%14EY%B2%93u%5D%C7j%B5.%99%02WT%C5%FAw%17w%82%F0%86%13%F8R%8B%80U%F0%E1C%24%12!%99L%E2%F7%FBQ%14e%C9Y%F4%81%24H%05%15%5C..8gL%26%13%16%8B%05Y%96%B1Z%2F%3D%B5%A7b%89V%F0%81%86%C5b!%18%0C.%ED%B3%B9%5Cm%E3%B2%24%88%B1%B8%B5%B3b%C8V%F0~%81%CF%E7C%92%24J%A5%12%92%24%E1t%3A%2Fk%EE%5E%B6%8Au%E1%E0%91J%B4%B9%82%F7%03.%B8%F9%2F%04%96%DFU%09%22%08%02f%B3%B92%EA%15%BCo%F0N%B5%9D%8A%0DR%C1%07%1A%EF%D4%14%A8%10%A4%82%0A%AE%9C%91%AE%A3*%0A%9A%AE!%18%A0%A8*%8A%A2%22%CB2%A2%24%B2x6%00%18%3A%86%B1P%DDc%A1%7C%8C%81(%08Xm6%24%C9T%19%F5%0A%3E%98%04IF%E7y%E4%A7%DFalx%98%7CYcb.%8E%C5%24%E2vZ1%CB%26%044%ACV3%9AZ%A2%AC%80%A2%8AX-%26%24Y%C1j3%F3k%BF%FDyV%AC%DDR%19%F5%0A%3E%98%04I%A5%93%EC%7C%E6Y%C6G%C7H%16%0D%CA%BANW%B3%9F%B4I%C2j%B6%E2%B2%D9Q%CC%12%22%02%26%AB%13%B7%CB%8D%DD%2C%22%C86%14M%A1%FC%16%07%DE%FF%EC%FC%1C%99%B2%C6%1F%AC%AF%03%A0%AC%1B%7C%E3%F8%14W%D7%B9%D9%5E%EFyG7yv%3E%C7%60%22%CF%1Dm~lr%25%EA%5E%C1%BBD%90bQa%3E%91%A7%ACI%18%B2%80%DBf%C3%EF%09%11%F4%5B%F1%7B%3C%F8%1C%5Ed%11%EC6%2Bn%B7%0F%B3%CD%8C%CD%22%23%9B%AC%945%F0%B8%DF%FC%E0%C4%17'%93%EC%1E%8F%F3%B1%F6%00Mn%0B'f3%7C%ED%F0%24%81%EBZ%D9V%E7a6W%26%5DRipYp%9A%17%26yY%D3%99%C8%94%F0%98el%B2%B8%F4%FEt%B6%8C%A2%EB%F8%2C2VY%C4e%96%09%DAMH%8B%06%DBT%A6%84f%184%BB%AD%95%19P%C1%15%B4At%03%8C%85%D2%F8v%04%82%5E7%D5%C1*%DCN%0B%26%93%84%DBf%C1a5c%92D%CC%26%01Y%12%B0%9A%CC%98%CD2%82%FA%D6%07%B77%BA%CC%2C%F7%DByn4%CE%7FX%5B%CB%91%D9%0CkC%0E%9Cf%89LY%E5%89%A1(%E3%A9%22%26I%E0%AF%AEj%A1%AC%E9%7C%EF%D44%F3%F92.%B3LY%D7%F9%DBkZyi%22%C9%CF%07%E7ipY%98L%97%F8%DC%AA%1AdQ%E0%FC%7C%8E%8D!7%E7%A2%19%9E%1E%8ES%D6unm%F5su%9D%07%B1%12%F3%AC%E0MpY%5E%2CA%12%90d%114%0D%97%DDNK%5D-%CDu%F5%B4%D6%B7%E3%B1yHf%8A%A8%980Y%9DH%82%88%D5b%C5a%B7%91%CD%E7%18%9D%18'%99L%BDe%FB%1Fi%F61%10%2F0%9E.%A2j%1A%1BB.%F2%AA%8E%DD%24%F2%89%8E%20%9F%E8%0Crp%3A%CDl%AE%C4%8B%13%09%CE%C5%B2%FC%F1%C6%066%D48%19L%14%88%16%14%EE9%3F%C7%B5%0D%5E~%7BU%0D%D1%82%C2%5C%5Ea._%E6%CC%7C%8E%9C%A2%F2O%C7%C2%D4%3A%CD%F8%AC%26%BEy%3CL%A2%A4TfA%05WF%82%08%08%98%040%04%8DP0%C0%F2%E6V%82%FE%20%A3%93%D3%CC%E7K%F8%5Cv%D4D%16%B3l%C5f%12)%15t%CEMO%90%CDgI%A4%B3%B4%A6%D3o%DAvY3X%5D%EB%E4%A5b%92%BF%3F%3C%C9'%3A%03%9C%8B%E6%91D%88%16%14%1E%EE%8F%E2%B3%C9x%AD%264%DD%60*Sf%B9%CFA%83%CB%82f%E8%84%ECf%E6re0%0C6%D7%BA%A8%B6%9BY%E6%B7!%60%60%12%25%9C%16%09%C3%80%99%7C%99%9C%A2a%12%04nl%F4b%91*%9E%EE%0A%AE%90%04%91E%010%B0Z%1D%B4%D5%D5S%EDq%20R%C0%40%C3bv%60%12%CC%94%8A%0A%AA%A6%82%08'z%06%D8%D7%3FI%AC%2C%91%CE%97P%957%AF%18%92W4%02v%99V%B7%95%1D%23q%3A%7C6%14%5DG0%04v%8D%25%E8%8F%E7%B9%B1%C9%8B%AA%1Bd%CA%1A%1D%3E%2Bg%E6%B3%1C%98N%F3p%7F%94DQ%A5%DEe%C1%2C%09%3C3%1Cc%DFT%92cs%19%2C%92%88%AA%19%14%CA%3A%A2%20%D0%EE%B5%E2%B6%C8%7Czy%15%BF%B6%B2%1A%87%A9b%B4Wp%85%24%88b%E8%CCd%B3%98U%11%BF%DB%8B%D7%E3%C5%E1%90%09%FA%BD%C4%A3Y%92%A9%02%9A%E8%C2%E3tc%B5Ih%A2%89%96%80%93%A6%BA%00g%E7G0Io%9E%BF%D5%E2%B5b%93E%3E%DA%1E%A0%C6i%A6%C1e!h3%13%B4%9Bht%5B%D89%9A%E0%9Es%B3%2C%F7%DB84%93%E1%F7%D7%D62%9FW%D81%1C%23d7%23%8B%E0%B5%C8%FC%F9%E6%26%EE9%3F%83%20%08%84%ECf%40%C0o%93h%F1Zq%98%25%FE%F3%C6%06%BEw2%CC%D9%F9%2C%CB%03v~ce%0Dv%B9%22E*%B8%02%04%D14(%A9%02%91x%8C%92%00%0E%8F%0F%9FIB6%CA%B8%83%26%D2N%3B%82I%26%60%B7%A1%0A%1Ak%DA%9A%10%CB%1A%82%A8%A3%E73%D8%ADo%1E%24%FC%A3%F5%0D%88%02H%82%40%83ka%07%E2ou%87%96%24%D7wo%EDB%00%9Cf%89dI%25S%D6%E8%F2%DBYS%E5%E4%F1%A1%18%CB%03%F6E5%D0%E0%AE%CE%20%A9%92%C6%C1p%9A6%AF%95V%8F%95%B5%D5NdQ%60%85%DF%CEWo%EC%60%26%5B%C2g%95%2B%E4%A8%E0J%DA%20%06fQ%4014tYB%92%AD%14%95%02fM%A7%98%CFSH%E7%A8%A9%AE%C3%86%89LY%C1T.c7%D9%99LM%E3%F6%3A%F0%7B%DF%3C%9Eaz%03W%92%FC%AA%F7%5C%E6WT!%AFE%26%A5%18%F4%C7%0B%CC%E5%CBT%D9e%3E%B3l%E1%90%C9%A4*ph6%0F%B2%85%FF%B4%BE%9EV%8F%F5u%ED%9BD%81%A6%8A%8B%B7%82%2BM%10I%10%91E%11%5D%D7%09%CFF%D01H%E43dRIr%99%3C%16IB%D544UA%2B%96))e%8A%BA%C1%F9%A1~V%AE_E%B0%AE%E9%0D%DBM%CC%85%99%1E%EF%A7s%CDU%8C%F5%9D%20P%DBL%20%D4%F0%E6%92LU%D0b%D3%FC%DA%F2%06%8A%86%84%7D%91%3Bc%BD%C7%A97Y%F9%DDe%ADL%9E%3F%CA%F2%BA%EB%2F%BAn%E1%00%9A%8AO%B7%82w%89%20%BAa%A0%EA%06%82%00%E7%CF%9Fgv%F3%06%BC.3y%5D%A1%AChH%9A%C0%E0%D0(N%97%8C%C5%E5D%F4z8r%F2%18%E9%5C%96%ABn%FD%15%3CUo%3C%E9%93%D1Y%F6%3Ev7%DE%40%88%C3%3B%1Ff%EB-%9F%2229%84%DB%1B%02%C1%60%B4%F7%04M%9D%ABPJ%25%22%E1Q%02%B5M%C8%B2%89L%22%CE%DCX%3F%5D%9B%AE%C7%5BU%CB%E0%A9%83%14sY%96%AD%BF%8A3%7B%9F%C2%1Fj%20%3C%D2CS%D7Z%A6G%FB%085vP.%17%18%3B%7F%9C%8E%B5%DBH%C5%E7%89L%0E%B3l%FD%D5%8B%A7OUP%C1%3B%20%88(%08%18%86%40%B1%A4%A2j%0A%F9B%01%9F%C7%81%CF%E3G!G2%3CG6%9AD%A9%F2%12%AA%F2S%2Ce%99%9F%1A%A6%BE%B3%1D%D9%E9%A7%AC(%98%DF%60%B3%BC(%CB%D44upt%F7cT%D5%B7%A2%94%8AD%C2%A3%8C%F5%9E%C2l%B5R%5D%DF%C6%C0%E9Ch%AABUC%1B%E1%A1%1ELV%0Bs%13%23(%A5%02U%CD%9Dx%825%04%EB%5B%E9%3F%BE%97%A1%F3'%F0%D5%B6%92%8A%CD1%DAs%12%5D%D7I%C7%E71%0C%83%F9%99q%FC%C1%1Az%8F%ED%A1T%2C%E0%F6W1r%EEh%85%20%15%5C%01%1BD4%F0%DA%CC%B4%F8%FD%5C%B5z%056%B3%99%5CI%C7d%B5%E3%13%CC8u%83%B4%CD%8C%A9%CAKA%C9Q%CE%C4%E9h%0E18%3D%CF%7F%FD%CB%FF%CA%9F%FE%C5%7Fc%DB%E6%D7'%2BJ%92L%E7%DA%ED%24%22aBM%1D%C4g%A7(%15s8%5C%5E%5C%FE%00%23%E7%8F%E3%AF%AE%C5%5EU%CBD%DFi%BC%C1%10%FEP%23%B2lB%D7u%AA%EB%5B%D1u%0D_U%1D-%2B6bu%BA%407%98%0B%8F%22%C92%0E%97%0F%8B%D5A!%9B%A6%AA%AE%85%E4%5C%98%40M%13%A2(%E3%F2%FA_w%04Y%05%15%BCM%1B%04%967V%E3hk%A4%A3%BE%06%AD%5C%24%AF%02%86BI%00%93!%60%B2%DA0%14%8DD%3AJ%C0eB%B2%B8xl%F7%5ERe%85%CF~%F67%E0%0D%08R%DB%DCImK'%92lFS%15ZV%AC%A7%98%CF%22J2%99d%94%D9%F1a%DA%BA7!%CA%26%22%E1Q%3A%D6n%A5%B6e9%02%90%88L%23%9B%CDH%92L%7D%FBJZV%AC%07%40)%15%D04%9Db%3E%83%C9b%A5%5C%C8%E1%F2U!%08%02%B1%D9I%025%8D%18%86%B1%B0u%B8%B2%7D%B8%827%13%0A%97SY1%97N%D2s%EC0%82%08V%B3%15Q6%23%18%02%9A%AAb%08%0B%C5%D7%24Q%40%14%0C%CAJ%11%BBYb%3A%96%E0%C0%99AL%26%99%8F%7D%F4%97%E8%EC%EC%B8%AC%0E%96%0A9%94r%09%A7%C7O1%9F%5D8t%DE%E3%AF%3C%B9%0A%DE%0D%BC%B3%CA%8A%0E%B7%97%CD7%5D%DE%A9Hm%C05%EF%E0%20%25%8B%CD%81%C5%B6P%B6%D4jwV%1Ea%05%BFPT%A2d%15TP!H%05%15T%08RA%05%15%82TPA%85%20%15TP!H%05%15T%08RA%05%15%82TPA%85%20%15TP!H%05%15TP!H%05%15T%08RA%05%15%82TP%C1%2F%94%202P)%14U%C1%87%15%C2k9q%D1%0BM7%92%C6BN%7C%05%15%7C%18a%E8%86%91%7B%AD%C4XBQ%D5%EE%B7%CA%92%26%89%C2%FF%02%9C%80V%19%B3%0A%3E%24%92C2%0C%1E%2C%AB%FA%CF%AC%AF%AA%B6%F9%DA%0DS%09%CD0%1E%10tdQ%14%7C%80Z%19%BB%0A%3E%0C%041%0C%D0t%E3i%03%06_%F3Ae%3Fv%05%15%5C%AA%91%5EA%05%15T%08RA%05%97%86%FF7%00_%B2'p%17%ED%D0%AF%00%00%00%00IEND%AEB%60%82";
//                document.getElementById('header').style.postion = 'relative';
//                document.getElementById('container').innerHTML = '<div style="position: absolute; top: 10px; right: 6px;"><img style="display: block; postion: fixed; top: 0px; right: -10px;" src="'+ptMaggieImage+'" /></div>' + document.getElementById('container').innerHTML;
            
          }
        }
}
else
{
	var ptFormData=''; // used to collect links and stuff to send down to the server

        // add the graphic "power" to the logo and hidden divs for settings, media
        var ptLogo;
        ptLogo = document.getElementById('header');
        if(ptLogo)
        {
                var newDate = new Date();
                ptTimeString = newDate.getTime();
                newElement = document.createElement('div');
                newElement.innerHTML += '<img width="40" style="position: absolute; left: 10px; top: 0px; z-index: 10;" src="' +
                'data:image/png;base64,' +
                        'iVBORw0KGgoAAAANSUhEUgAAADYAAAARCAYAAACW7F9TAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lD' +
                        'Q1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQ' +
                        'SoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfA' +
                        'CAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH' +
                        '/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBb' +
                        'lCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7' +
                        'AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKB' +
                        'NA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl' +
                        '7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7i' +
                        'JIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k' +
                        '4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAA' +
                        'XkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv' +
                        '1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRR' +
                        'IkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQ' +
                        'crQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXA' +
                        'CTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPE' +
                        'NyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJA' +
                        'caT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgX' +
                        'aPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZ' +
                        'D5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2ep' +
                        'O6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2q' +
                        'qaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau' +
                        '7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6fe' +
                        'eb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYP' +
                        'jGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFos' +
                        'tqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuu' +
                        'tm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPj' +
                        'thPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofc' +
                        'n8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw3' +
                        '3jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5' +
                        'QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz' +
                        '30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7' +
                        'F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgq' +
                        'TXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+' +
                        'xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2' +
                        'pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWF' +
                        'fevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaq' +
                        'l+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7' +
                        'vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRS' +
                        'j9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtb' +
                        'Ylu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh' +
                        '0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L15' +
                        '8Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89Hc' +
                        'R/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfy' +
                        'l5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz' +
                        '/GMzLdsAAAAEZ0FNQQAAsY58+1GTAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAX' +
                        'b5JfxUYAAASRSURBVHja1JdRaFtVGMd/rZ2pdr3VlkVHExmagbmtiPQhoQriwy0UGY6lL2Mgdi/zaX1y' +
                        'T/q0PrW+pL5sCE198KHQqExk2jz0ZYZEiAh2N8gC6nJLt8yV5diuiW2sD/nu2U2a2m76oH8Il3vOud93' +
                        '/uf/fd/50razs4OgHTgMHAVCwHNAH+ADnpTnNnAHuAVsAk8B/cAR+X4dUEBV3neAiqxtBzqBNpnf8th+' +
                        'TN4BusXu48AGsAb8Lmt8QAdQk999YBW4AfwK3JNx2jzEfMAx4DXgLeBVoJfWuC0Ejsph7If7no0hzjeB' +
                        'LiH6qNgCvgeuAF8DP8lhNBB7GhgGzgEn+H/hR+BDICUK0uGZ7BLFXgeIz6Sx7RKm6ae720diLgfA+DtD' +
                        'nB0fAiCTLZJMLrOYKgBghv3EYgOMxQZ578JVlKpimn4mzg8DcHFyCccpY1khxmKD2PkS8XgagFhskGgk' +
                        'SHwmzWLqBkpVCQR6iJ0a0P7OvfsFAJYVAiCVKnD50kmAl4AXgEwrYp2AHzAAbLtEJlskky1ihv0YRieO' +
                        'UyY+k8Y0/Q2OAoEejG4fdr6EPVlCqSqG0cliqoCzopg4P4zjlFlILmtnY7FB7QNgYmKY02fmcZwyI1aI' +
                        'QKCHheQy8Zk68bPjQ3qtna/7aEKXl4+XWIeQa0A0EuTypZMoVeXNE5+gVJVUqoBSFU3qqy/f1oosJJdJ' +
                        'zOW0So5TxnHKelOu0gArK0ornckUcZwyZtjP9NSoXjubyJH87LpW7UFkDGIYbspSk4JWaUWsXRK8JQzD' +
                        'V99Attiw0dipAb3GskIsJJe1Yi7s/B2ysj4aCZLJFllMFbDtUn0sGtTzdr7Ey6981ODbccoN75FIkBEJ' +
                        'R8EVwAbKrYj9qzAMnyaRz5d0SFtWqGHM3ahL0s2rh8C3wOdCbP2hiSlVxc7XnZumX7/nZczNS2+4RITY' +
                        'bKJeeKKxICPWcS5OLukx9wCyks9KVRhrDLNdijXhGvCDhOIfBybmrChmEzmy2aJO2EgkSH+/gT1ZYjFV' +
                        'wJhcwjB8uji4G4tGg8RnHtgKh/06pN1DGrGO65CeTeRQqsrpM/NatVSqgGH43OrX6n4sAr958+tAxJSq' +
                        '6MoE8MH7bxCNBCESRKkqibncrmrnFg4z7CcQ6NEn7uaFZYU0sXD4iA7B6alR4jNpXX29NvfAqjQK280T' +
                        '3gv6RWAcuOCW8ky2SDQSZHpqFDtfItBvEAj07LLu5oopivxTeMv5PjbngY+B76TtaqnYdrOczYWgqZWp' +
                        'uddD0xySxPeAwAG5lKV/9LtkDoBF4BvgF/mWvYhVgJJIa7iXsPsU/AxclaazBjwLPC89YztwV+ZuSs/W' +
                        'J3O94lxJj/iENLs74vOWHNYzYu+YNArb0gSvSWFoFzsrwHWphLc9DXTLUNyvV8wBn0oVWgX+lM31ySbc' +
                        '7v6uKLAlBLpE2Zqnqz8k3TtyAOti77AcQq98W5P5DSHZJs8NiYh1sbnzd8T26u7XgLRcgtdE+k3Ppd4h' +
                        'F7vr1P1L8ShoE1uHxLY37B/KZts+/8cMCZ+bQEGUck/3P42/BgChbgReJkfijwAAAABJRU5ErkJggg=="' +
                        ' alt="powertwitter" />';

                ptWaitingGif = '<img width="12" src="data:image/gif;base64,' +
                        'R0lGODlhEAAQAPQAAP///6qqqvz8/Ly8vNXV1aurq7a2tvDw8OHh4bGxsdHR0cvLy/X19dzc3Ovr68HB' +
                        'wcbGxgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBF' +
                        'Mi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAFUCAg' +
                        'jmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla+KIkYvC6SJKQOISo' +
                        'NSYdeIk1ayA8ExTyeR3F749CACH5BAkKAAAALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHW' +
                        'xQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK+o2eUMKgWrqKhj0FrEM8j' +
                        'QQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkECQoAAAAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJ' +
                        'LaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC+0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQ' +
                        'SubtDFU/NXcDBHwkaw1cKQ8MiyEAIfkECQoAAAAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4G' +
                        'rBfGa4uCnAEhQuRgPwCBtwK+kCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm' +
                        '/4AhACH5BAkKAAAALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOco' +
                        'LBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQh' +
                        'ACH5BAkKAAAALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg+boUFSTAkiBiN' +
                        'Hks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC+RAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAA' +
                        'AAAAAAAAAA==" />';
                        
                ptStarImage = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAAAkAAAANCAMAAABM3rQ0AAAAJFBMVEX8/vz8wjT8viT83pT8ylT88tz8' +
		'0mz8xkT82oT84pz8xjz81nwKqN0kAAAAAXRSTlMAQObYZgAAADVJREFUeF6VxjkCwCAMxEDt2lzJ//8b' +
		'XEAfNRr+tK580N1rkd4pA4arB0AHjCvrlQttArPxARdHAJ/MUWtxAAAAAElFTkSuQmCC';
                

                var ptSettingsHtml =  '<div style="font-size: 9px; z-index: 11; position: fixed; bottom: 0px; ' +
                        'right: 0px; background: #eee; border-left: 1px solid #ccc; border-top: 1px solid #ccc;' +
                        ' padding: 2px 11px 2px 8px;"> <a href="http://twitter.com/powertwitter" title="Follow Power Twitter!">@powertwitter</a>: <a id="ptSettingsLink" title="Power Twitter Settings" href="#">settings</a> | <a title="help with Power Twitter" ' +
                        ' id="ptHelpLink" href="http://getsatisfaction.com/83degrees/products/83degrees_power_twitter">help</a>' +
                        '</div><div id="ptStatus" style="position: fixed; bottom: 0px; right: 0px; display: block; ' +
                        'font-size: 9px; padding-bottom: 0px; z-index: 12;">'+ptWaitingGif+'</div><div id="ptSettings" style="padding: 6px; ' +
                        'font-size: 10px; border: 1px solid #999; background: #eee; position: fixed; bottom: 0px; ' +
                        'right: 0px; display: none; z-index: 100;"><div style="font-weight: bold;">Power Twitter ' +
                        'Settings<div style="font-weight: normal;">Note: saving your password lets PT do more behind ' +
                        'the scenes</div></div><table><tr><td valign="top">Username<br /><input disabled="true" '+
                        'type="text" style="color: #999; width: 110px;" id="ptSettingUsername" /><br />Password<br /><input id="ptSettingPassword"'+
                        'type="password" style="padding: 1px; border: 1px solid #ccc;" size="14" /><br />' +
                        '<div style="margin: 8px 0px 8px 0px">Upload photos to:<br /><select id="ptSettingPH" name="ptSettingPH" style="margin-top: 3px;">'+
                        '</select><br /><input style="margin-top: 16px;" id="ptSettingSave" type="button" ' +
                        'value="Save/Update" /> <input type="button" style="margin-top: 16px;" value="Cancel" ' +
                        'onclick="document.getElementById(\'ptSettings\').style.display=\'none\'" /></td>' +
                        '<td valign="top"><br /><input id="ptSettingRM" type="checkbox" /> show rich media<br />' +
                        '<input id="ptSettingEX" type="checkbox" /> expand links<br />' +
                        '<input id="ptSettingMO" type="checkbox" /> peek on mouseover<br />' +
                        '<input id="ptSettingPR" type="checkbox" /> show promotions<br />' +
                        '<br />&nbsp;&nbsp;<a id="ptManageTopFriends" href="#">Manage Top Friends</a>' +
                        '</td></tr></table></div>';

                var ptPhotoPostHtml = '<div id="ptPostPhotoDiv" style="display: none; visibility: hidden; z-index: 1000; ' +
                        'width: 380px; padding: 14px; position: absolute; height: 80px; background-color: #fff;" class="round">' +
                        '<h3>Post Photo - a link will be copied to your status</h3><form id="ptPostPhotoForm" name="ptPostPhotoForm" ' +
                        'action="'+ptServer + ptScript + '" method="post" enctype="multipart/form-data">' +
                        '<input type="hidden" name="action" value="postPhoto" />' +
                        '<input type="hidden" name="ptPostTo" id="ptPostTo" value="" />' +
                        '<div style="position: relative; margin: 16px 0px 0px 100px;">' +
                        '<div id="ptUploadingMsg" style="display: none; padding-left: 20px; height: 60px; z-index: 1003; position: absolute; left: 0px; width: 200px; background-color: #fff; font-size: 1.1em;">'+ptWaitingGif+' Uploading... <a style="font-size: 9px; color: #333; margin-left: 20px; background-color: #eee; padding: 4px; -webkit-border-radius: 4px; border: 1px solid #ccc;" href="/">Cancel</a></div>' +
                        '<input type="button" name="choose" value="Choose File" style="z-index: 1001; position: absolute; left: 0px; width: 100px" />' +
                        '<input name="media" type="file" id="ptPhotoFile" size="1" style="position: absolute; left: 0px; z-index: 1002; opacity:0; width: 100px;" onchange="document.getElementById(\'ptUploadingMsg\').style.display=\'block\';document.ptPostPhotoForm.submit();"/> ' +
                        '<input type="submit" name="submitBtn" value="Upload" id="ptUploadButton" />' +
                        '<input type="button" style="margin-left: 50px;" value="Cancel" onclick="ptShowHideShade(\'ptPostPhotoDiv\',\'none\');document.getElementById(\'ptShade\').style.display=\'none\';" />' +
                        '<input type="hidden" name="username" id="ptPostPhotoUser" value="" />' +
                        '<input type="hidden" name="MAX_FILE_SIZE" value="5000" />' +
                        '<input type="password" id ="ptPostPhotoPass" style="visibility: hidden;" name="password" value="" /></form></div></div>';

                var ptLinkPostHtml = '<div id="ptPostLinkDiv" style="display: none; visibility: hidden; z-index: 1000; ' +
                        'width: 380px; padding: 14px; position: absolute; height: 80px; background-color: #fff;" class="round">' +
                        '<h3>Shorten Link - paste the link and push the button</h3><form id="ptPostLinkForm" name="ptPostLinkForm" ' +
                        'action="'+ptServer + ptScript + '" method="post">' +
                        '<input type="hidden" name="action" value="postLink" />' +
                        '<div style="position: relative; margin: 16px 0px 0px 10px;">' +
                        '<div id="ptSqueezingMsg" style="text-align: center; display: none; padding-left: 10px; height: 60px; z-index: 1003; position: absolute; left: 0px; width: 360px; background-color: #fff; font-size: 1.1em;">'+ptWaitingGif+' Squeezing... <a style="font-size: 9px; color: #333; margin-left: 20px; background-color: #eee; padding: 4px; -webkit-border-radius: 4px; border: 1px solid #ccc;" href="/">Cancel</a></div>' +
                        '<input type="text" name="ptPostLink" style="padding: 4px; width: 200px; font-size: 11px; border: 1px solid #ccc;" /> ' +
                        '<input type="button" value="Shorten" onclick="document.getElementById(\'ptSqueezingMsg\').style.display=\'block\';document.ptPostLinkForm.submit();"/> ' +
                        '<input type="button" style="margin-left: 4px;" value="Cancel" onclick="ptShowHideShade(\'ptPostLinkDiv\',\'none\');document.getElementById(\'ptShade\').style.display=\'none\';" />' +
                        '</form></div></div>';

                var ptMoodPostHtml = '<div id="ptPostMoodDiv" style="display: none; visibility: hidden; z-index: 1000; ' +
                        'width: 380px; padding: 14px; position: absolute; height: 80px; background-color: #fff;" class="round">' +
                        '<h3>What is your mood? &nbsp;' +
                        '<select id="ptMoodChoices" name="ptMoodChoices" style="margin-top: 3px; font-size: 14px; padding: 3px;"></select></h3>' +
                        '<div style="position: relative; margin: 16px 0px 0px 100px;">' +
                        '<input type="button" value="Respond" onclick="document.getElementById(\'status\').value=ptCreateMood(document.getElementById(\'ptMoodChoices\').value);'+
                        'ptShowHideShade(\'ptPostMoodDiv\',\'none\'); document.getElementById(\'ptShade\').style.display=\'none\'; document.getElementById(\'status\').focus();"/> ' +
                        '<input type="button" style="margin-left: 4px;" value="Cancel" onclick="ptShowHideShade(\'ptPostMoodDiv\',\'none\');document.getElementById(\'ptShade\').style.display=\'none\';" />' +
                        '</div></div>';

                var ptQuestionPostHtml = '<div id="ptPostQuestionDiv" style="display: none; visibility: hidden; z-index: 1000; ' +
                        'width: 380px; padding: 14px; position: absolute; height: 80px; background-color: #fff;" class="round">' +
                        '<h3>Today\'s Question</h3><div style="margin-top: 6px; text-align: left" id="ptqod">The #dailyquestion has not yet loaded...</div>' +
                        '<input type="hidden" name="ptqod_start" id="ptqod_start" value="" />' +
                        '<div style="position: relative; margin: 10px 0px 0px 100px;">' +
                        '<input type="button" value="Respond" onclick="document.getElementById(\'status\').value=document.getElementById(\'ptqod_start\').value; ptShowHideShade(\'ptPostQuestionDiv\',\'none\'); document.getElementById(\'ptShade\').style.display=\'none\'; document.getElementById(\'status\').focus();"/> ' +
                        '<input type="button" style="margin-left: 4px;" value="Cancel" onclick="ptShowHideShade(\'ptPostQuestionDiv\',\'none\');document.getElementById(\'ptShade\').style.display=\'none\';" />' +
                        '</div></div>';
                        
                var ptTopFriendsHtml = '<div id="ptTopFriendsDiv" style="display: none; visibility: hidden; z-index: 1000; ' +
                        'width: 380px; padding: 14px; position: absolute; background-color: #fff;" class="round">' +
                        '<h3>My Top Friends</h3><div id="ptTopFriendsList"></div><br />' +
                        '<input type="button" id="ptRemoveTopFriendButton" value="Remove Selected" style="margin-left: 16px; background-color:#fefdeb;" /> ' +
                        '<input type="button" value="Cancel" onclick="ptShowHideShade(\'ptTopFriendsDiv\',\'none\');document.getElementById(\'ptShade\').style.display=\'none\';" />' +
                        '</div></div>';

                        
                newElement.innerHTML += ptSettingsHtml;
                newElement.innerHTML += ptPhotoPostHtml;
                newElement.innerHTML += ptLinkPostHtml;
                newElement.innerHTML += ptMoodPostHtml;
                newElement.innerHTML += ptQuestionPostHtml;
                newElement.innerHTML += ptTopFriendsHtml;

                ptLogo.parentNode.insertBefore(newElement, ptLogo);
                ptFillTopFriendsForm();
                document.getElementById('ptRemoveTopFriendButton').addEventListener('click',ptRemoveTopFriend,true);
                document.getElementById('ptSettingsLink').addEventListener('click',ptShowSettings,true);
                document.getElementById('ptSettingSave').addEventListener('click',ptSaveSettings,true);
                document.getElementById('ptManageTopFriends').addEventListener('click',ptManageTopFriends,true);

        }

        if(document.getElementById('ptSettingUsername'))
        	document.getElementById('ptSettingUsername').value = ptLoggedInUserName;

        // get the current page and add more button listeners
        if(document.getElementById('more'))
        {
                var ptPageRegExp = new RegExp(/.page=(.*?)&/);
                if(document.getElementById('more').href.match(ptPageRegExp))
                {
                        ptGsNextPage = document.getElementById('more').href.match(ptPageRegExp)[1];
                        document.getElementById('more').addEventListener('click',ptParseMoreUpdates,true);
                }
        }
        else if(document.getElementById('search_more'))
        {
                var ptPageRegExp = new RegExp(/.page=(.*?)&/);
                if(document.getElementById('search_more').href.match(ptPageRegExp))
                {
                        ptGsNextPage = document.getElementById('search_more').href.match(ptPageRegExp)[1];
                        document.getElementById('search_more').addEventListener('click',ptParseMoreUpdates,true);
                }
        }


        // is status page?
        if(ptGsTitle.indexOf('/status/') != -1)
        {
                ptIsStatusPage = true;
        }
        
        // is search page?
        if(ptGsTitle.indexOf('search?q') != -1)
        {
                ptIsSearchPage = true;
        }

        // check for alerts
        if(ptGsTitle.indexOf('ptAlert=') != -1)
        {
                // show an alert
                var ptAlertRegExp = new RegExp(/.ptAlert=(.*)/);
                if(ptGsTitle.match(ptAlertRegExp))
                        alert(unescape(ptGsTitle.match(ptAlertRegExp)[1]));

        }

        // check for searches
        if(ptGsTitle.indexOf('ptQ=') != -1)
        {
                var ptSearchRegExp = new RegExp(/.ptQ=(.*)/);
                if(ptGsTitle.match(ptSearchRegExp))
                        location.href = 'http://twitter.com/search?q='+ptGsTitle.match(ptSearchRegExp)[1];
        }

	// create an iframe for the page
	var ptIF, newElement;
	ptIF = document.getElementById('container');
	if (ptIF)
	{
		newElement = document.createElement('div');
		newElement.innerHTML = '<div id="ptIframeContainer" style="top: 30px; z-index: 200; border: 1px solid #ccc; visibility: hidden; position: absolute; display: none; background-color: #fff;"><iframe src="about:blank" width="220" height="280" id="ptIframe" scrolling="no" frameborder="0" /></div>';
		ptIF.parentNode.insertBefore(newElement, ptIF.nextSibling);
	}
	ptFormData += '&sViewingUser='+ptViewingUser+'&sLoggedInUser='+ptLoggedInUserName;

	// insert a sidebar container
	var ptSideBarInsertPoint = document.getElementById('profile');
	if (ptSideBarInsertPoint)
	{
		newElement = document.createElement('div');
		newElement.id = 'pt_sidebar_container';
                if(!ptViewingUser)
                        newElement.innerHTML = '<div id="ptPromoBlock"></div>';
		ptSideBarInsertPoint.parentNode.insertBefore(newElement,ptSideBarInsertPoint.nextSibling);
	}

	// insert a media bar for photos, etc.
	var ptMediaInsertPoint = document.getElementById('status');
	if (ptMediaInsertPoint)
	{
		newElement = document.createElement('div');
		newElement.innerHTML =  '<div style="padding: 4px 0px 4px 12px; text-align: left;"><input type="button" value="Post Photo" id="ptPostPhotoBtn" style="font-size: 9px; padding: 2px; background: #eee;"/> ' +
                                        '<input id="ptPostLinkBtn" type="button" value="Shorten Link" style="font-size: 9px; padding: 2px; background: #eee;"/> ' +
                                        '<input id="ptPostMoodBtn" type="button" value="Your Mood?" style="font-size: 9px; padding: 2px; background: #eee;"/> ' +
                                        '<input id="ptPostQuestionBtn" type="button" value="Today\'s Question!" style="font-size: 9px; margin-right: 24px; padding: 2px; background: #fefdeb;"/></div>';
		ptMediaInsertPoint.parentNode.insertBefore(newElement,ptMediaInsertPoint);
		document.getElementById('ptPostPhotoBtn').addEventListener('click',ptPostPhoto,true);
		document.getElementById('ptPostLinkBtn').addEventListener('click',ptPostLink,true);
		document.getElementById('ptPostMoodBtn').addEventListener('click',ptPostMood,true);
		document.getElementById('ptPostQuestionBtn').addEventListener('click',ptPostQuestion,true);

	}

	// insert the search container
        thisUl = document.getElementById('primary_nav');
        if(     (thisUl)&&
                (ptGsTitle)&&
                (ptGsTitle != 'http://twitter.com/')&&
                (ptGsTitle != 'https://twitter.com/')&&
                (ptGsTitle.indexOf('favourites') == -1)&&
                (ptGsTitle.indexOf('favorites') == -1)&&
                (ptGsTitle.indexOf('#favorites') == -1)&&
                (ptGsTitle.indexOf('followers') == -1)&&
                (ptGsTitle.indexOf('following') == -1)&&
                (ptGsTitle.indexOf('public_timeline') == -1)&&
                (ptGsTitle.indexOf('direct_messages') == -1)&&
                (ptGsTitle.indexOf('#sent') == -1)&&
                (ptGsTitle.indexOf('#inbox') == -1)&&
                (ptGsTitle.indexOf('activity') == -1)&&
                (ptGsTitle.indexOf('#replies') == -1)&&
                (ptGsTitle.indexOf('replies') == -1)&&
                (ptGsTitle.indexOf('/#') == -1)&&
                (ptGsTitle.indexOf('status=') == -1)&&
                (ptGsTitle.indexOf('http://twitter.com/home') == -1 || ptGsTitle.indexOf('https://twitter.com/home') == -1)
                )
        {
                newElement = document.createElement('div');
		var ptSearchUserHtml = '';
                ptPromoDiv = (ptViewingUser) ? '<div id="ptPromoBlock"></div>' : '';
                ptSearchUserHtml = '<div style="margin-bottom: 3px;"><input type="hidden" id="ptThisUser" value="'+ptViewingUser+'" /><input type="checkbox" checked="checked" id="ptSearchRestrictUser" /> only ' + ptViewingUser + "'s updates</div>";
                // now insert an @reply link
                var allNavUls = document.evaluate(
                                '//ul[@class="sidebar-actions"]',
                                document,
                                null,
                                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                null);
                thisNavUl = allNavUls.snapshotItem(0);
                if(allNavUls.snapshotItem(0))
                {
                        var newAtReply = document.createElement('li');
                        newAtReply.innerHTML = "<a href='/home?status=@"+ptViewingUser+" '>@reply</a> " + ptViewingUser;
                        thisNavUl.insertBefore(newAtReply,thisNavUl.firstChild);
                }

                if(ptViewingUser)
                {
                        addGlobalStyle('a#mentions_tab.hover, ul#tabMenu a:hover { background-image:url(http://static.twitter.com/images/pale.png) !important; }');
                        thisUl.innerHTML = thisUl.innerHTML + '<li id="ptMentions" style="display: block;"><a href="#" id="mentions_tab" style="background: none repeat scroll 0% 0%; margin-left:-1px; padding-left: 14px; cursor: pointer;">@'+ptViewingUser+'</a></li>';
                        var ptAddTo = '<li id="ptFriendStatus"><a href="#" style="background: none repeat scroll 0% 0%; margin-left:-1px; padding-left: 14px;">Add to Top Friends</a></li>';
                        thisUl.innerHTML = thisUl.innerHTML + ptAddTo;
                        if(isTopFriend(ptViewingUser))
                                document.getElementById('ptFriendStatus').innerHTML = '<b><span style="background: none repeat scroll 0% 0%; margin-left:-1px; padding-left: 14px;">Top Friend</span></b> <img src="'+ptStarImage+'" />';
                        else
                                document.getElementById('ptFriendStatus').addEventListener('click',ptAddTopFriend,true);
                        document.getElementById('mentions_tab').addEventListener('click',ptGetUserMentions,true);
                        
                        
                }

                ptSbDisplay = 'block';
                if((ptPrefSB)&&(ptPrefSB.toString().indexOf('off') != -1))
                        ptSbDisplay = 'none';
		newElement.innerHTML = ptPromoDiv + '<div id="pt_search_container" style="display:'+ptSbDisplay +';text-align: right; width: 180px; margin: 0px auto 10px auto;"><form action="" onsubmit="return false;" id="ptSearchForm" method="get">' +
                        '<input style="margin: 0px 1px 4px 0px; width: 169px; padding: 3px;" autosave="com.twitter.search" id="ptSearchBox" name="ptSearchBox" placeholder="Enter your query" results="10" type="search" /><br />'+ptSearchUserHtml+'<input style="cursor: pointer;" type="button" id="ptSearchButton" value="Search" /></form></div>';
		thisUl.parentNode.insertBefore(newElement, thisUl);

        }


	// add mouseover events
        ptAddMouseOvers();
        
	// trap update form
	if((ptGsTitle)&&(ptGsTitle.indexOf('twitter.com/direct_messages') == -1))
        {
                ptUpdateButton = document.getElementById('update-submit');
                if(ptUpdateButton)
                        ptUpdateButton.addEventListener('click',ptUpdate,true);
        }


        // trap events with the new search form to process via ajax
        searchForm = document.getElementById('ptSearchForm');
        if(searchForm)
                searchForm.addEventListener('submit',ptPost, true);
        searchButton = document.getElementById('ptSearchButton');
        if(searchButton)
                searchButton.addEventListener('click',ptPost, true);


	// rewrite the home tab to enable a hard refresh
	var ptHomeTab = document.getElementById('home_tab');
	if (ptHomeTab)
		ptHomeTab.addEventListener('click',ptRefreshPage, true);

	// add @mentions
	ptRepliesTab = document.getElementById('replies_tab');
	var ptLastSearch = "@"+ptLoggedInUserName;
        document.getElementById('ptLastSearch').value = ptLastSearch;
	if(ptRepliesTab)
        {
		ptFbDisplay = 'block';
                if((ptPrefFB)&&(ptPrefFB.toString().indexOf('off') != -1))
                        ptFbDisplay = 'none';
                addGlobalStyle('a#interesting_tab.hover, ul#tabMenu a:hover { background-image:url(http://static.twitter.com/images/pale.png) !important; }');
                addGlobalStyle('a#topfriends_tab.hover, ul#tabMenu a:hover { background-image:url(http://static.twitter.com/images/pale.png) !important; }');
                ptRepliesTab.parentNode.innerHTML = ptRepliesTab.parentNode.innerHTML + 
                '<li id="ptTopfriends"><a href="#" id="topfriends_tab" class="in-page-link" style="padding-left: 14px;">Top Friends' +
                '<img src="'+ptStarImage+'" width="12" alt="" style="margin-left: 3px;" /></a></li>' +
                '<li id="ptInteresting"><a href="#" id="interesting_tab" class="in-page-link" style="padding-left: 14px;">Interesting</a></li>' +
                '<li><a href="http://twitter.com/search?q=%23dailyquestion" class="in-page-link" style="padding-left: 14px;">#dailyquestion</a></li>';
                document.getElementById('interesting_tab').addEventListener('click',ptGetInterestingUpdates,true);
                document.getElementById('topfriends_tab').addEventListener('click',ptGetTopfriendsUpdates,true);
        }

	// add the Power Twitter source to the update form
	ptUpdateSource = document.getElementById('source');
	if(ptUpdateSource)
		ptUpdateSource.value = 'powertwitter';

        // add a new more button and hide it at first
        if(document.getElementById('pagination'))
        {
//                var newElement = document.createElement('div');
                document.getElementById('pagination').innerHTML += '<div id="ptMoreContainer" style="display: none;"><div id="ptOlder" style="cursor: pointer;" class="ptMoreButton" />more</div></div>';
//                newElement.innerHTML = '<div id="ptMoreContainer" style="display: none;"><div id="ptOlder" style="cursor: pointer;" class="ptMoreButton" />more</div></div>';
//                if(document.getElementById('more').parentNode)
//                {
//                        document.getElementById('more').parentNode.insertBefore(newElement, document.getElementById('more').parentNode);
                        document.getElementById('ptOlder').addEventListener('click',ptGetOlderResults,true);
//                }
        }

        // add retweet links
        if((document.getElementById('status'))||(ptIsStatusPage)||(ptIsUserPage)||(ptIsSearchPage))
        {
//                logToConsole('adding retweets from new page load');
                if(ptIsSearchPage)
                        ptAddRetweetLinks(1);
                else
                        ptAddRetweetLinks();
        }

        ptAddSearchListeners();

        // ad an id to twitter promo link
        var allUrls = document.evaluate(
		"//a[@class='definition']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allUrls.snapshotLength; i++)
	{
		thisUrl = allUrls.snapshotItem(i);
                thisUrl.id = 'ptDefinitionPromo';
        }

        
        // add some global css
        addGlobalStyle('.ptMoreButton { -webkit-border-radius-bottomleft:5px; -webkit-border-radius-bottomright:5px; -webkit-border-radius-topleft:5px; -webkit-border-radius-topright:5px; background-color:#FFFFFF; background-image:url(http://static.twitter.com/images/more.gif); background-position:left top; background-repeat:repeat-x; border-color:#DDDDDD #AAAAAA #AAAAAA #DDDDDD; border-style:solid; border-width:1px; display:block; font-size:14px; font-weight:bold; height:22px; line-height:1.5em; margin:4px; outline-color:-moz-use-text-color; outline-style:none; outline-width:medium; padding:6px 0; text-align:center; text-shadow:1px 1px 1px #FFFFFF; width:98%; }');

	// put some functions on the page so we have access to them
//	embedFunction(ptCbError);
//	embedFunction(ptCbShowResults);
//	embedFunction(ptCbLinkExpand);
//	embedFunction(ptCbMakeInsertions);
	embedFunction(ptCheckStatusLength);
	embedFunction(ptRelativeTime);
	embedFunction(ptShowHistory);
	embedFunction(ptHideHistory);
	embedFunction(ptShowHideShade);
	embedFunction(ptDisplayCenteredDiv);
	embedFunction(ptLogClick);
	embedFunction(ptLog);
	embedFunction(ptWait);
        embedFunction(ptIsImgUrl);
	embedFunction(getWinBottom);
	embedFunction(getWinHeight);
	embedFunction(getWinWidth);
	embedFunction(getWinLeft);
	embedFunction(getWinRight);
	embedFunction(getWinTop);
        embedFunction(ptCreateMood);
	exportGlobal('ptTwitterVersionNumber',ptTwitterVersionNumber);
	exportGlobal('ptServer',ptServer);
	exportGlobal('ptScript',ptScript);
	exportGlobal('ptViewingUser',ptViewingUser);
	exportGlobal('ptLoggedInUserName',ptLoggedInUserName);
	exportGlobal('ptPrefMO',ptPrefMO);
	exportGlobal('ptPrefPR',ptPrefPR);
	exportGlobal('ptPrefPH',ptPrefPH);
	exportGlobal('ptStarImage',ptStarImage);
	exportGlobal('ptDefaultPhotoService',ptDefaultPhotoService);
        
        ptLoadingMessage = '<li><div id="ptLoadingMessage">'+ptWaitingGif+' Loading...</div></li>';        

        // swap links with the kill switch if needed
        ptWait(
                function() { return document.getElementById('ptPingStatus').value == 1},
                function() { ptUpdateLinks(ptFormData); }
        );

        // to have no kill switch comment out ptWait and uncomment direct function call
        // ptUpdateLinks(ptFormData);
}

} // end main function -- runPowerTwitter

// ---------------------------------------------------------------------
// functions

function ptAddSearchListeners()
{
        // do not think that this class is still there
        var allUrls = document.evaluate(
		"//a[@class='search-link']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allUrls.snapshotLength; i++)
	{
		thisUrl = allUrls.snapshotItem(i);
                thisUrl.addEventListener('click',ptNewSearch,true);
        }
        var allUrls = document.evaluate(
		"//a[@class='search_link']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allUrls.snapshotLength; i++)
	{
		thisUrl = allUrls.snapshotItem(i);
                thisUrl.addEventListener('click',ptNewSearch,true);
        }
        
        
        if(document.getElementById('sidebar_search'))
                document.getElementById('sidebar_search').addEventListener('submit',ptNewSearch,true);
        if(document.getElementById('sidebar_search_submit'))
                document.getElementById('sidebar_search_submit').addEventListener('click',ptNewSearch,true);

}

function ptNewSearch()
{
        // first to check to see if the page has been processed
        // if not then process it (prevents getting out of sync from a timeout)
        if(!document.getElementById('ptFirstEntry'))
        {
                ptAddRetweetLinks(1);
                ptAddMouseOvers(1);
                ptUpdateLinks('');                
        }
        // hide our More button if shown
        if(document.getElementById('ptMoreContainer'))
                document.getElementById('ptMoreContainer').style.display = 'none';
       // show loading
        document.getElementById('ptStatus').style.display = 'block';
        ptWaitForNewTweets();
}

function ptWaitForNewTweets()
{
        ptWait(
                function(){
                                
                                if((document.getElementById('ptLatestTweetId'))&&(ptGetLatestTweetId() != '')&&
                                   (ptGetLatestTweetId() != document.getElementById('ptLatestTweetId').value))
                                {
                                        // results have changed
//                                        GM_log('results changed - '+ptGetLatestTweetId());
                                        ptAttempts = 0;
                                        return true;
                                }
                                else
                                {
                                        if(ptAttempts == 200)
                                        {
                                                ptTimeOut = 1;
                                                ptAttempts = 0;
                                                return true;
                                        }
                                        return false;
                                }
                                
                                },
                function(){
                                if(ptTimeOut == 0) // things have changed 
                                {
                                        ptGsNextPage = 2;
//                                        GM_log('new updates arrived');
                                }
                                else // timed out
                                {
                                        GM_log('time out looking for new updates');
                                }
                                ptTimeOut = 0;
                                ptAddRetweetLinks(1);
                                ptAddMouseOvers(1);
//                                GM_log('current value ' + document.getElementById('ptLatestTweetId').value);
                                ptUpdateLinks('');
                                if(document.getElementById('search_more'))
                                {
                                        document.getElementById('search_more').addEventListener('click',ptParseMoreUpdates,true);
                                        // twitter bug
                                        if(document.getElementById('search_more').innerHTML != 'more')
                                        {
                                                var ptPageRegExp = new RegExp(/.page=(.*?)&/);
                                                if(document.getElementById('search_more').href.match(ptPageRegExp))
                                                {
                                                        var ptPage = document.getElementById('search_more').href.match(ptPageRegExp)[1];
                                                        ptPage++;
                                                        document.getElementById('search_more').href = document.getElementById('search_more').href.replace(/page=(.*?)&/,'page='+ptPage+'&');                 
                                                        document.getElementById('search_more').innerHTML = 'more';
                                                        document.getElementById('search_more').style.backgroundImage = 'url()';
                                                }
                                        }
                                }
                                // log this
                                if((document.getElementById('sidebar_search_q'))&&(document.getElementById('sidebar_search_q').value != ''))
                                {
                                        var ptQ = document.getElementById('sidebar_search_q').value;
                                        ptData = 'q='+ptQ+'&action=ptLog&type=canned&sLoggedInUser='+ptLoggedInUserName+'&sViewingUser='+ptViewingUser;
                                        ptLog(ptData);
                                }
                          }
        );
}

function ptGetLatestTweetId()
{
        ptAttempts++;
        var ptAllEntries = document.evaluate(
                '//span[@class="status-body"]',
                document,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);
        var ptThisEntry = ptAllEntries.snapshotItem(ptAllEntries.snapshotLength -1);
        
//        GM_log('attempt '+ptThisEntry.parentNode.id);
        if(ptThisEntry.parentNode.id)
                return ptThisEntry.parentNode.id;
        else
                return '';
        
}

function ptNextSearch()
{
        var ptPageRegExp = new RegExp(/.q=(.*?)$/);
        if(location.href.match(ptPageRegExp))
                return location.href.match(ptPageRegExp)[1];
        else
                return '';
}

function ptFillTopFriendsForm()
{
        var elList = document.getElementById('ptTopFriendsList');
        if(document.getElementById("ptTopFriends").value != 0)
        {
                ptPrefTopFriends = document.getElementById("ptTopFriends").value.split('|');
                elList.innerHTML = '';
                for(i=0;i<ptPrefTopFriends.length;i++)
                {
                        if(ptPrefTopFriends[i] !== undefined)
                        {
                                elList.innerHTML += '<div style="margin: 6px 0px 0px 16px; font-size: 14px; cursor: pointer;"' +
                                'onclick="document.getElementById(\'ptRemoveTopFriend\').value=\''+ptPrefTopFriends[i]+'\';' +
                                'document.getElementById(\'ptRemoveTopFriendButton\').value=\'Remove '+ptPrefTopFriends[i]+'\';" ' +
                                '>'+ptPrefTopFriends[i]+'</div>';
                                  
                        }
                }
        }
        else
                elList.innerHTML = '<div style="margin: 10px;"><br />You have no Top Friends. Visit any Profile page and select Add Top Friend.</div>';
        
}

function ptManageTopFriends()
{
        document.getElementById('ptSettings').style.display='none';
        ptShowHideShade('ptShade','block');
        ptFillTopFriendsForm();
        var el = document.getElementById('ptTopFriendsDiv');
        ptDisplayCenteredDiv(el, 120);
}

function ptRemoveTopFriend()
{
        ptRemoveName = document.getElementById('ptRemoveTopFriend').value;
        
        if(confirm("Are you sure that you want to remove " + ptRemoveName + " as a Top Friend?\n\n"))
        {
                if(document.getElementById("ptTopFriends").value)
                {
                        ptPrefTopFriends = document.getElementById("ptTopFriends").value.split('|');
                        ptPrefTopFriends.splice(ptPrefTopFriends.indexOf(ptRemoveName),1);
                        document.getElementById("ptTopFriends").value = ptPrefTopFriends.join("|");
                        var ptTop_JSON = document.createElement("script");
                        ptTop_JSON.type="text/javascript";
                        ptTop_JSON.src=ptServer + ptScript + "?action=removeTopFriend&sLoggedInUser="+ptLoggedInUserName+"&sRemoveFriend="+ptRemoveName;
                        document.getElementsByTagName("head")[0].appendChild(ptTop_JSON);
                        document.getElementById('ptStatus').style.display = 'block';
                        ptWait(
                            function(){ return document.getElementById('ptLinkUpdateStatus').value == 0},
                            function(){ document.getElementById('ptStatus').style.display = 'none';  }
                        );                
                        if(document.getElementById('ptFriendStatus'))
                                document.getElementById('ptFriendStatus').innerHTML = '';
                }
                ptFillTopFriendsForm();
                document.getElementById('ptRemoveTopFriendButton').value = 'Remove Selected';
                
                ptShowHideShade('ptTopFriendsDiv','none');
                document.getElementById('ptShade').style.display='none';
        }
}

function ptAnnounceTopFriend(ptNewTopFriend)
{
        var ptTop_JSON = document.createElement("script");
        ptTop_JSON.type="text/javascript";
        ptTop_JSON.src=ptServer + ptScript + "?action=announcetop&sLoggedInUser="+ptLoggedInUserName+"&ptNewTopFriend="+ptNewTopFriend;
        document.getElementsByTagName("head")[0].appendChild(ptTop_JSON);
        document.getElementById('ptStatus').style.display = 'block';
        ptWait(
                        function(){ return document.getElementById('ptLinkUpdateStatus').value == 0},
                        function(){ document.getElementById('ptStatus').style.display = 'none';  }
        );
}

function ptAddTopFriend()
{
        if(document.getElementById("ptTopFriends").value != 0)
        {
                ptPrefTopFriends = document.getElementById("ptTopFriends").value.split('|');
                if (ptPrefTopFriends.length > 29)
                        alert('Sorry, right now you can only have up to 30 Top Friends.\n\nYou can visit Settings > Manage Top Friends to remove existing ones.\n');
                else if (ptViewingUser !== undefined)
                {
                        ptPrefTopFriends.push(ptViewingUser);
                        ptPrefTopFriends.unique();
                        document.getElementById("ptTopFriends").value = ptPrefTopFriends.join("|");
                        var ptTop_JSON = document.createElement("script");
                        ptTop_JSON.type="text/javascript";
                        ptTop_JSON.src=ptServer + ptScript + "?action=addTopFriend&sLoggedInUser="+ptLoggedInUserName+"&sAddFriend="+ptViewingUser;
                        document.getElementsByTagName("head")[0].appendChild(ptTop_JSON);
                        document.getElementById('ptStatus').style.display = 'block';
                        ptWait(
                            function(){ return document.getElementById('ptLinkUpdateStatus').value == 0},
                            function(){ document.getElementById('ptStatus').style.display = 'none';  }
                        );                
                        ptFillTopFriendsForm();
                        document.getElementById('ptFriendStatus').innerHTML = '<b><span style="background: none repeat scroll 0% 0%; margin-left:-1px; padding-left: 14px;">Top Friend</span></b> <img src="'+ptStarImage+'" />';
                        if(confirm("Would you like to announce that you just made " + ptViewingUser + " a Top Friend? Come on, let people know!"))
                                ptAnnounceTopFriend(ptViewingUser);
                }
        }
        else if (ptViewingUser !== undefined)
        {
                GM_setValue("ptPrefTopFriends",ptViewingUser);
                ptFillTopFriendsForm();
                document.getElementById('ptFriendStatus').innerHTML = '<b><span style="background: none repeat scroll 0% 0%; margin-left:-1px; padding-left: 14px;">Top Friend</span></b> <img src="http://static.twitter.com/images/icon_star_full.gif" />';
        }

}

function isTopFriend(ptFriendName)
{
        if(document.getElementById("ptTopFriends").value != 0)
        {
                 ptPrefTopFriends = document.getElementById("ptTopFriends").value.split('|');
                 for(i=0;i<ptPrefTopFriends.length;i++)
                 {
                         if(ptFriendName == ptPrefTopFriends[i])
                                return 1;
                 }
                 return 0;
        }
        else
                return 0;
}

function ptAddMouseOvers(ptIsSearchResult)
{
        if(ptPrefMO.toString().indexOf('off') != -1)
                return;

        var allUrls = document.evaluate(
//		"//a[@class='url']",
		"//a[@class='tweet-url profile-pic url']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allUrls.snapshotLength; i++)
	{
		thisUrl = allUrls.snapshotItem(i);
		if(thisUrl.href.indexOf('twitter.com') != -1)
		{
			var ptTwitterer = thisUrl.href.replace('http://twitter.com/','');
			thisUrl.id = ptTwitterer;
                        if(thisUrl)
                        {
        			thisUrl.addEventListener('mouseover',ptShowHistory,true);
                		thisUrl.addEventListener('mouseout',ptHideHistory,true);
                        }
		}
	}

        // for search related

        if(ptIsSearchResult == 1)
        {
                var allUrls = document.evaluate(
                        "//span[@class='thumb vcard author']",
                        document,
                        null,
                        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                        null);
                for (var i = 0; i < allUrls.snapshotLength; i++)
                {
                        thisUrl = allUrls.snapshotItem(i);
                        var ptUrlRegExp = new RegExp(/href="http:\/\/twitter.com\/(.*?)"/im);
                        if((thisUrl)&&(thisUrl.innerHTML.match(ptUrlRegExp)))
                        {
                                var ptTwitterer = thisUrl.innerHTML.match(ptUrlRegExp)[1];
                                thisUrl.id = ptTwitterer;
                                thisUrl.addEventListener('mouseover',ptShowHistory,true);
                                thisUrl.addEventListener('mouseout',ptHideHistory,true);
                        }
                }
        }


}


function ptCheckStatusLength(ptFeature)
{
        if(document.getElementById('status'))
        {
                if (document.getElementById('status').value.length > 1)
                {
                        if (ptFeature == 'photo')
                                return confirm("Right now, the post photo feature clears anything you have in your status box! It will insert a link that you can tweet about.\n\n Are you OK, losing the text you already have?");
                        else if (ptFeature == 'link')
                                return confirm("Right now, the shorten link feature clears anything you have in your status box! Use the link shortener first and then you can add your tweet around it.\n\n Are you OK, losing the text you already have?");
                        else if (ptFeature == 'mood')
                                return confirm("Right now, the shorten link feature clears anything you have in your status box! Use the link shortener first and then you can add your tweet around it.\n\n Are you OK, losing the text you already have?");
                        else
                                return confirm("Right now, this feature clears anything you have in your status box! Use the link shortener first and then you can add your tweet around it.\n\n Are you OK, losing the text you already have?");
                }
        }
        return true;
}


function ptAddRetweetLinks(ptIsSearchResult)
{
        var ptAllEntries = document.evaluate(
                '//span[@class="status-body"]',
                document,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);
        for (var i = 0; i < ptAllEntries.snapshotLength; i++)
        {
                var ptThisEntry = ptAllEntries.snapshotItem(i);
                if(i == 0)  // capture the first id so we can compare it later with ajax searches
                {
                        if((document.getElementById('ptFirstTweetId'))&&(ptThisEntry.parentNode.id))
                                document.getElementById('ptFirstTweetId').value = ptThisEntry.parentNode.id;
                                
                        ptThisEntry.id = 'ptFirstEntry';
                }
                else if(i == ptAllEntries.snapshotLength - 1)
                {
                        if((document.getElementById('ptLatestTweetId'))&&(ptThisEntry.parentNode.id))
                                document.getElementById('ptLatestTweetId').value = ptThisEntry.parentNode.id;
                        ptThisEntry.id = 'ptLastEntry';
                }
                if (ptThisEntry.title == 'processed')
                        continue;
                ptThisEntry.title = 'processed';
                var ptRetweet = ptThisEntry.innerHTML;
                var ptAtName = (ptViewingUser && ptIsSearchResult != 1) ? ptViewingUser+' ' : '';
                if(ptRetweet.indexOf('class="lock"') == -1) // don't retweet protected updates
                {
                        ptRetweet = ptRetweet.replace(/<strong.*?class=.screen.name.*?>(.*?)<.a><.strong>/gim,'$1 ');
                        ptRetweet = ptRetweet.replace(/<a.*?>(.*?)<.a>/gim,'$1 ');
                        ptRetweet = ptRetweet.replace(/\n/gim,'');
                        ptRetweet = ptRetweet.replace(/<b>/gim,'');
                        ptRetweet = ptRetweet.replace(/<.b>/gim,'');
                        ptRetweet = ptRetweet.replace(/\s{2,}/gim,'');
                        ptRetweet = 'RT @'+ ptAtName + ptRetweet.replace(/<strong>|<.strong>|<a.href.*?>|<.a>|<span id=.msg.*?>|<span class=.entry.*?>|<span class=.meta.*\/span>|<\/span>|<b>|<.b>/gim,'');
                        ptRetweet = ptRetweet.replace(/('|")/gim,'');
                        if(ptIsStatusPage&&ptThisEntry)
                                ptThisEntry.innerHTML += ' <div style="font-size: 13px; margin-right: -34px; float: right; color: #aaa; cursor: pointer;" onclick="document.location.href=\'/home?status='+ptRetweet+'\';">RT</div>';
                        else if(ptIsUserPage&&ptThisEntry.nextSibling)
                                ptThisEntry.nextSibling.innerHTML += ' <div style="font-size: 9px; text-align: center; color: #aaa; cursor: pointer;" onclick="document.location.href=\'/home?status='+ptRetweet+'\';">RT</div>';
                        else if((ptIsSearchResult == 1)&&(ptThisEntry.nextSibling.nextSibling))
                                ptThisEntry.nextSibling.nextSibling.innerHTML += ' <div style="font-size: 9px; text-align: center; color: #aaa; cursor: pointer;" onclick="document.getElementById(\'status\').value=\''+ptRetweet+'\';document.getElementById(\'status\').focus();">RT</div>';
                        else if(ptThisEntry.nextSibling)
                                ptThisEntry.nextSibling.innerHTML += ' <div style="font-size: 9px; text-align: center; color: #aaa; cursor: pointer;" onclick="document.getElementById(\'status\').value=\''+ptRetweet+'\';document.getElementById(\'status\').focus();">RT</div>';
                }
        }

}

function ptPostLink()
{
        if(ptCheckStatusLength('link'))
        {
                ptShowHideShade('ptShade','block');
                var el = document.getElementById('ptPostLinkDiv');
                ptDisplayCenteredDiv(el, 120);
        }
}

function ptPostQuestion()
{
        if(ptCheckStatusLength('question'))
        {
                ptShowHideShade('ptShade','block');
                var el = document.getElementById('ptPostQuestionDiv');
                ptDisplayCenteredDiv(el, 120);
        }
}

function ptPostMood()
{
        if(ptCheckStatusLength('mood'))
        {
                ptShowHideShade('ptShade','block');
                var el = document.getElementById('ptPostMoodDiv');
                ptDisplayCenteredDiv(el, 120);
                ptShowMoods();
        }
}

function ptCreateMood(mood)
{
        if(mood)       
                return '#mood I am *'+mood+'*';
        else
                return '';
}

function ptPostPhoto()
{
        // make sure we have a user/password or else show settings
        document.getElementById('ptPostPhotoUser').value = ptLoggedInUserName;
        if (ptPrefPassword.length > 1)
        {
                if(ptCheckStatusLength('photo'))
                {
                        document.getElementById('ptPostPhotoPass').value = ptPrefPassword;
                        document.getElementById('ptPostTo').value = (ptPrefPH.length) ? ptPrefPH : document.getElementById('ptDefaultPhotoService');
                	ptShowHideShade('ptShade','block');
                        var el = document.getElementById('ptPostPhotoDiv');
                        ptDisplayCenteredDiv(el, 120);
                }
        }
        else
        {
                alert('To post photos, your password must be set.');
                ptShowSettings();
        }

}

function ptUpdateLinks(ptFormData)
{
	// collect all the links to process them
	var ptAllLinks = document.evaluate(
		'//a[@href]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < ptAllLinks.snapshotLength; i++)
	{
                
                ptThisLink = ptAllLinks.snapshotItem(i);
                if((ptThisLink.href.indexOf('category=saved_search') != -1)||(ptThisLink.href.indexOf('category=trends') != -1))
                {
                        // track saved searches so we can update them
     			ptThisLink.addEventListener('click',ptNewSearch,true);                   
                }
                
                
		// do something with thisLink
		if ((ptThisLink.target == '_blank')||(location.href.indexOf('search?') != -1))
                {
                        if(ptThisLink.rel.indexOf('me') != -1)
                                continue;
                        if(ptThisLink.title && ptThisLink.title == '.')
                                continue;
                        // multithreaded script insertions
                        // do not replace: twitter, links that have already been done, or the help link
                        if((ptThisLink.href.indexOf('twitter.com') != -1)||
                           (ptThisLink.id.indexOf('ptLink_') != -1)||
                           (document.getElementById('ptDoNotParse').value.indexOf(ptThisLink.href) != -1)||
                           (ptThisLink.href.indexOf('javascript') != -1)||
                           (ptThisLink.className.indexOf('definition') != -1)||
                           (ptThisLink.id == 'facebook_tab')||
                           (ptThisLink.id == 'ptHelpLink'))
                                continue;
                        ptThisLink.id = 'ptLink_' + i;
                        var ptPreferences = '';
                        if(ptPrefEX.toString().indexOf('off') != -1)
                                ptPreferences += '&ptPrefEX=off';
                        if(ptPrefRM.toString().indexOf('off') != -1)
                                ptPreferences += '&ptPrefRM=off';

                        var twitter_JSON = document.createElement("script");
                	twitter_JSON.type="text/javascript";
                        var ptLinkParseService = ptServer + ptScript;
                        if(document.getElementById('ptLinkParseService').value != '')
                                ptLinkParseService = document.getElementById('ptLinkParseService').value;
                	twitter_JSON.src= ptLinkParseService + "?action=parseLink&version="+ptVersionNumber+"&format=json&linkNumber="+i+ptPreferences+"&url="+escape(ptThisLink.href);
                	document.getElementsByTagName("head")[0].appendChild(twitter_JSON);

			ptThisLink.addEventListener('mousedown',ptLogClick,true);
                }
	}
        
	// check for dynamic insertions
	if (ptFormData.length > 1)
	{
		var ptPreferences = '';
                if(ptPrefEX.toString().indexOf('off') == -1)
                        ptPreferences += '&ptPrefEX=off';
                if(ptPrefRM.toString().indexOf('off') == -1)
                        ptPreferences += '&ptPrefRM=off';
                if(document.getElementById("ptTopFriends").value !=0)
                        ptPreferences += '&topFriends='+document.getElementById("ptTopFriends").value.toString();
                ptFormData += '&sViewingUser='+ptViewingUser+'&sLoggedInUser='+ptLoggedInUserName+ptPreferences;

                var twitter_JSON = document.createElement("script");
                twitter_JSON.type="text/javascript";
                twitter_JSON.src= ptServer + ptScript + "?agent=safari&action=userPage&version="+ptVersionNumber+"&tversion="+ptTwitterVersionNumber+'&'+ptFormData;
                document.getElementsByTagName("head")[0].appendChild(twitter_JSON);
	}
	else
	{
                ptStatusDiv = document.getElementById('ptStatus');
		if(ptStatusDiv)
			ptStatusDiv.style.display = 'none';
	}

        document.getElementById('ptLinkUpdateStatus').value = 1;

}

function ptRefreshPage(ptType)
{
        if(ptType == 'hard')
                document.location.href = 'http://twitter.com/home';
        else if(ptGsTitle)
        {
                if(ptGsTitle.indexOf('ptAlert=') != -1)
                {
                	document.location.href = 'http://twitter.com/home';
                }
                else if(ptGsTitle.indexOf('ptQ=') != -1)
                {
                	document.location.href = 'http://twitter.com/home';
                }
                else if(ptGsTitle == 'http://twitter.com/#')
                {
                	document.location.href = 'http://twitter.com/home';
                }
                else
                {
                        ptPage = ptGsTitle.replace('http://twitter.com/','');
                        ptPage = ptGsTitle.replace('https://twitter.com/','');
                        ptPage = ptPage.replace('#','');
                	document.location.href = 'http://twitter.com/'+ptPage;
                }

        }
        else
        	document.location.href = 'http://twitter.com/home';
}

function ptSaveSettings()
{

        var ptCloseWindow = 'none';
        var ptSaving = 0;

        if (document.getElementById('ptSettingRM').checked)
                GM_setValue("ptPrefRM","on");
        else
                GM_setValue("ptPrefRM","off");

        if (document.getElementById('ptSettingEX').checked)
                GM_setValue("ptPrefEX","on");
        else
                GM_setValue("ptPrefEX","off");

        if (document.getElementById('ptSettingMO').checked)
                GM_setValue("ptPrefMO","on");
        else
                GM_setValue("ptPrefMO","off");

/*        if (document.getElementById('ptSettingFB').checked)
        {
                GM_setValue("ptPrefFB","on");
                if(document.getElementById('facebook_tab'))
                {
                        document.getElementById('facebook_tab').style.display = 'block';
                        document.getElementById('ptFacebook').style.display = 'block';
                }
        }
        else
        {
                GM_setValue("ptPrefFB","off");
                if(document.getElementById('facebook_tab'))
                {
                        document.getElementById('facebook_tab').style.display = 'none';
                        document.getElementById('ptFacebook').style.display = 'none';
                }
        }
*/
        if (document.getElementById('ptSettingPR').checked)
        {
                GM_setValue("ptPrefPR","on");
                if(document.getElementById('ptPromoBlock'))
                {
                        document.getElementById('ptPromoBlock').style.display = 'block';
                }
        }
        else
        {
                GM_setValue("ptPrefPR","off");
                if(document.getElementById('ptPromoBlock'))
                {
                        document.getElementById('ptPromoBlock').style.display = 'none';
                }
        }
        
        if (document.getElementById('ptSettingPH'))
        {
                GM_setValue("ptPrefPH",document.getElementById('ptSettingPH').value);
        }
        
        if (document.getElementById('ptSettingPassword') !== undefined)
        {
                if (document.getElementById('ptSettingPassword').value.length > 0)
                {
                        ptSaving = 1;
                        var ptSaveSettings_JSON = document.createElement("script");
                        ptSaveSettings_JSON.type="text/javascript";
                        ptSaveSettings_JSON.src=ptServer + ptScript + "?agent=safari&action=auth&u="+ptLoggedInUserName+"&p="+document.getElementById('ptSettingPassword').value;
                        document.getElementsByTagName("head")[0].appendChild(ptSaveSettings_JSON);
                        document.getElementById('ptLinkUpdateStatus').value = 1;
                        ptWait(
                                function(){ return document.getElementById('ptLinkUpdateStatus').value == 0},
                                function()
                                {
                                      if(document.getElementById('ptAuth').value == 1)
                                      {
                                          GM_setValue("ptPrefPassword",ptLoggedInUserName+'|'+document.getElementById('ptSettingPassword').value);
                                          ptPrefPassword = ptGetPassword();
                                          document.getElementById('ptSettings').style.display = ptCloseWindow;
                                      }
                                      else
                                      {
                                          alert('Sorry, your twitter user/pass was not valid.');
                                          ptCloseWindow = 'block';
                                      }    
                                }
                        );
                }
                else if (document.getElementById('ptSettingPassword').value == '')
                {
                        GM_setValue("ptPrefPassword",ptLoggedInUserName+'|'+document.getElementById('ptSettingPassword').value);
                        ptPrefPassword = ptGetPassword();
                }
        }

        if((ptPrefMO != GM_getValue("ptPrefMO"))||(ptPrefRM != GM_getValue("ptPrefRM"))||(ptPrefEX != GM_getValue("ptPrefEX")))
                ptRefreshPage('hard');

        ptPrefRM = GM_getValue("ptPrefRM");
        ptPrefEX = GM_getValue("ptPrefEX");
        ptPrefFB = GM_getValue("ptPrefFB");
        ptPrefMO = GM_getValue("ptPrefMO");
        ptPrefSB = GM_getValue("ptPrefSB");
        ptPrefPR = GM_getValue("ptPrefPR");
        ptPrefPH = GM_getValue("ptPrefPH");

        if(ptSaving == 0)
        {
                ptPrefPassword = ptGetPassword();
                document.getElementById('ptSettings').style.display = ptCloseWindow;
        }
}

function ptGetPassword()
{
        if(GM_getValue("ptPrefPassword"))
        {
                var ptUserPass = GM_getValue("ptPrefPassword").split('|');
                return ptUserPass[1];
        }
        else
                return '';
}

function ptShowMoods()
{
        var ptAMoodOptions = document.getElementById('ptMoodOptions').value.split('|');
        var ptOptionHtml = '';
        for(i=0;i<ptAMoodOptions.length;i++)
        {
                ptMood = ptAMoodOptions[i];
                ptOptionHtml += '<option value="'+ptAMoodOptions[i]+'" id="pt_'+ptAMoodOptions[i]+'">'+ptAMoodOptions[i]+'</option>';
        }
        document.getElementById('ptMoodChoices').innerHTML = ptOptionHtml;        
}

function ptShowSettings()
{
        if(ptPrefRM.toString().indexOf('off') == -1)
                document.getElementById('ptSettingRM').checked = 'true';
        if(ptPrefEX.toString().indexOf('off') == -1)
                document.getElementById('ptSettingEX').checked = 'true';
        if(ptPrefMO.toString().indexOf('off') == -1)
                document.getElementById('ptSettingMO').checked = 'true';
//        if(ptPrefFB.toString().indexOf('off') == -1)
//                document.getElementById('ptSettingFB').checked = 'true';
        if(ptPrefPR.toString().indexOf('off') == -1)
                document.getElementById('ptSettingPR').checked = 'true';
                
        if(document.getElementById('ptSettingPH'))
        {
                var ptAServiceOptions = document.getElementById('ptPhotoServiceOptions').value.split('|');
                var ptOptionHtml = '';
                for(i=0;i<ptAServiceOptions.length;i++)
                {
                        ptService = ptAServiceOptions[i];
                        ptOptionHtml += '<option value="'+ptAServiceOptions[i]+'" id="pt_'+ptAServiceOptions[i]+'">'+ptAServiceOptions[i]+'</option>';
                }
                document.getElementById('ptSettingPH').innerHTML = ptOptionHtml;
                
        }
        
        if((ptPrefPH !== undefined)&&(ptPrefPH.toString()))
                document.getElementById('pt_'+ptPrefPH.toString()).selected = 'true';
        else
                document.getElementById('pt_'+document.getElementById('ptDefaultPhotoService').value).selected = 'true';
                

       if (document.getElementById('ptSettingPassword') !== undefined)
       {
                document.getElementById('ptSettingPassword').value = ptPrefPassword;
       }

        document.getElementById('ptSettings').style.display = 'block';
}

function ptShowHistory(e)
{
	if(e.currentTarget.id)
	{
		var ptTwitterName = e.currentTarget.id;
		var ptIContainer = document.getElementById('ptIframeContainer');
		var ptOffsetX = 30;
		var ptOffsetY = -20;
		ptWinWidth = getWinWidth();
		if (e.pageX > (ptWinWidth/2))
			ptOffsetX = -230;
		ptWinHeight = getWinHeight();
		ptWinBottom = getWinBottom();

		if (e.pageY > (ptWinBottom/2))
			ptOffsetY = -180;

		ptIContainer.style.display = 'block';
		ptIContainer.style.visibility = 'visible';
		ptIContainer.style.left = (e.pageX + ptOffsetX) + 'px';
		ptIContainer.style.top = (e.pageY + ptOffsetY) + 'px';
		var ptDisplayWindow = document.getElementById('ptIframe');
		ptDisplayWindow.src = ptServer + ptScript + "?action=showHistory&sLoggedInUser="+ptLoggedInUserName+"&name="+ptTwitterName;
	}
}

function ptHideHistory(e)
{
	document.getElementById('ptIframeContainer').style.display = 'none';
	var ptDisplayWindow = document.getElementById('ptIframe');
	ptDisplayWindow.src = "about:blank";
}

function ptParseMoreUpdates()
{
        if(document.getElementById('search_more'))
                ptWaitForNewTweets();
        else
                ptWait(
                        function(){
                                        var ptIsSearch = (document.getElementById('search_more')) ? 1 : '';
                                        if(ptNextPage(ptIsSearch) > ptGsNextPage)
                                                return true;
                                        else
                                                return false;
                                },
                        function(){
                                        ptGsNextPage++;
                                        var ptIsSearch = (document.getElementById('search_more')) ? 1 : '';
                                        ptAddRetweetLinks(ptIsSearch);
//                                ptAddMouseOvers();
                                        if(document.getElementById('more'))
                                                document.getElementById('more').addEventListener('click',ptParseMoreUpdates,true);
                                        if(document.getElementById('search_more'))
                                                document.getElementById('search_more').addEventListener('click',ptParseMoreUpdates,true);
                                        ptUpdateLinks('');
                                }
                );
}

function ptNextPage(ptIsSearch)
{
        var thisId = (ptIsSearch == 1) ? 'search_more' : 'more';
        if(document.getElementById(thisId))
        {
                var ptPageRegExp = new RegExp(/.page=(.*?)&/);
                if(document.getElementById(thisId).href.match(ptPageRegExp))
                {
//                        GM_log('regexp '+document.getElementById(thisId).href.match(ptPageRegExp)[1]);
//                        alert('regexp '+document.getElementById(thisId).href.match(ptPageRegExp)[1]);
                        return document.getElementById(thisId).href.match(ptPageRegExp)[1];
                }
                else if(documentgetElementById(thisId).href.indexOf('undefined') != -1)
                {
//                        alert('gs '+ptGsNextPage++);
                        return ptGsNextPage++;
                }
                else
                {
//                        alert('just 2');
                        return 2;
                }
        }
        else
                return 2;
}

function ptUpdate(evt)
{
        // when update button is pushed this fork lets us log
        // and then wait so we can embed the media if needed
        var pt_LOG = document.createElement("script");
	pt_LOG.type="text/javascript";
	pt_LOG.src= ptServer + ptScript + '?action=ptLog&type=update&sLoggedInUser='+ptLoggedInUserName;
	document.getElementsByTagName("head")[0].appendChild(pt_LOG);
        // if img/media preview - clear it
        if(document.getElementById('ptImgThumb'))
        {
                document.getElementById('ptImgThumb').style.display = 'none';
                document.getElementById('status').style.width = '508px';
        }
        ptWait(
                function(){ return document.getElementById('status').value ==''},
                function(){ ptUpdateLinks(''); }
        );
}

function ptLogClick()
{
        if(this.href)
                ptLog('action=ptLog&type=click&sLoggedInUser='+ptLoggedInUserName+'&sViewingUser='+ptViewingUser+'&url='+this.href);
        else if(this.title)
                ptLog('action=ptLog&type=click&sLoggedInUser='+ptLoggedInUserName+'&sViewingUser='+ptViewingUser+'&url='+this.title);
}

function ptLog(ptData)
{
        var pt_LOG = document.createElement("script");
	pt_LOG.type="text/javascript";
	pt_LOG.src= ptServer + ptScript + '?' + ptData;;
	document.getElementsByTagName("head")[0].appendChild(pt_LOG);
}

function ptPost() // ajax engine for getting and displaying search results
{
	if(document.getElementById('ptSearchBox').value.length == 0)
	{
		alert('Please enter a search term!');
		return;
	}

	resultsContainer = document.getElementById('ptSearchResults');
	ptQ = document.getElementById('ptSearchBox').value;
        ptQ = ptQ.replace('#','%23');
	var ptRestrictTo = '';
	if((document.getElementById('ptSearchRestrictUser'))&&(document.getElementById('ptSearchRestrictUser').checked)) // restrict search to the twitter page user
	{
		ptRestrictTo = document.getElementById('ptThisUser').value;
                document.getElementById('ptRestrictedSearch').value = ptRestrictTo;
	}
        document.getElementById('ptLastSearch').value = ptQ;
        document.getElementById('ptPageNumber').value = 1;

	// log
	ptData = 'q='+ptQ+'&action=ptLog&type=search&sLoggedInUser='+ptLoggedInUserName+'&sViewingUser='+ptViewingUser;
        ptLog(ptData);

        // display
	ptGetSearchResults(ptQ,1,ptRestrictTo);
	return;

};

function ptWait(c,f)
{
        if (c())
                f()
        else
                window.setTimeout(function () { ptWait(c,f) }, 50, false);
}

function ptGetUserMentions()
{
        ptQ = '@'+ptViewingUser;
        var twitter_JSON = document.createElement("script");
	twitter_JSON.type="text/javascript";
	ptPage = "&page=1";
        document.getElementById('ptPageNumber').value = 1; // reset the page count
        document.getElementById('ptLastSearch').value = ptQ; // set the hidden input to make this a "search" for older/newer
	twitter_JSON.src="http://search.twitter.com/search.json?callback=ptCbShowResults&q="+ptQ + ptPage;
	document.getElementsByTagName("head")[0].appendChild(twitter_JSON);
        document.getElementById('ptStatus').style.display = 'block';
        ptWait(
                function(){ return document.getElementById('ptLinkUpdateStatus').value == 0},
                function(){ ptUpdateLinks(''); }
        );
}

function ptToggleLoadingMessage(ptClear)
{
        if(ptClear)
        {
                if(document.getElementById('timeline'))
                        document.getElementById('timeline').innerHTML = ptLoadingMessage;
        }
        else
        {
                if(document.getElementById('timeline'))
                        document.getElementById('timeline').innerHTML = ptLoadingMessage + document.getElementById('timeline').innerHTML;
       
                if(document.getElementById('results_update'))
                        document.getElementById('results_update').style.display = 'none';
        }
        
}


function ptGetInterestingUpdates(ptMore)
{
        if(ptGsTitle.indexOf('https') != -1)
        {
                if(confirm('Whoops! You need to be on http and not https for this feature. Would you like to reload the page?'))
                        ptRefreshPage();
                else
                        return false;
        }
        if(document.getElementById('ptErrorMsg'))
                document.getElementById('ptErrorMsg').innerHTML = '';
        
        if (ptPrefPassword.length > 1)
        {                
                if(document.getElementById('ptSelectedTab').value != '')
                        ptUnHighlightTab(document.getElementById('ptSelectedTab').value);
                
                document.getElementById('ptSelectedTab').value = 'ptInteresting';
                document.getElementById('ptLastSearch').value = 'ptInteresting';
                                        
                if(document.getElementById('timeline_heading'))
                        document.getElementById('timeline_heading').innerHTML = '<h1>Interesting Updates</h1>';
                        
                ptMaxId = (ptMore == 1) ? document.getElementById('ptInterestingMaxId').value : 0;
                document.getElementById('ptPageNumber').value = (ptMaxId > 0) ? 2 : 0; // used to handle when to clear the page
                if (ptMaxId == 0)
                        ptToggleLoadingMessage(true);
                                        
                ptHighlightTab('ptInteresting');
                ptResetMaxIds('ptInteresting');

                var ptInteresting_JSON = document.createElement("script");
                ptInteresting_JSON.type="text/javascript";
                ptInteresting_JSON.src=ptServer + ptScript + "?action=interesting&callback=ptCbShowResults&sLoggedInUser="+ptLoggedInUserName+"&iMaxId="+ptMaxId;
                document.getElementsByTagName("head")[0].appendChild(ptInteresting_JSON);
                document.getElementById('ptStatus').style.display = 'block';
                ptWait(
                        function(){ return document.getElementById('ptLinkUpdateStatus').value == 0},
                        function(){ ptUpdateLinks(''); }
                );
        }
        else
        {
                alert('To show Interesting updates, your password must be set.');
                ptShowSettings();
        }


}

function ptUnHighlightTab(id)
{
        if(document.getElementById(id))
        {
                document.getElementById(id).firstChild.style.fontWeight = 'normal';
                document.getElementById(id).firstChild.style.background = 'transparent';
                document.getElementById(id).style.background = 'transparent';
        }
}

function ptHighlightTab(id)
{
        document.getElementById(id).style.background = '#f7f7f7';
        document.getElementById(id).firstChild.style.background = '#f7f7f7';
        document.getElementById(id).firstChild.style.fontWeight = 'bold';
}

function ptResetMaxIds(id)
{
        var ptAMaxIdTitles = new Array('ptInteresting','ptTopfriends');
        for (i=0;i<ptAMaxIdTitles.length;i++)
        {
                if(id != ptAMaxIdTitles[i])
                {
                        if(document.getElementById(ptAMaxIdTitles[i]+'MaxId'))
                                document.getElementById(ptAMaxIdTitles[i]+'MaxId').value = '0';                        
                }
        }
}                


function ptGetTopfriendsUpdates(ptMore)
{       
        if(ptGsTitle.indexOf('https') != -1)
        {
                if(confirm('Whoops! You need to be on http and not https for this feature. Would you like to reload the page?'))
                        ptRefreshPage();
                else
                        return false;
        }
        
        if(document.getElementById('ptErrorMsg'))
                document.getElementById('ptErrorMsg').innerHTML = '';
 
        if (ptPrefPassword.length > 1)
        {                       
                if(document.getElementById('ptSelectedTab').value != '')
                        ptUnHighlightTab(document.getElementById('ptSelectedTab').value);
                        
                ptHighlightTab('ptTopfriends');
                document.getElementById('ptSelectedTab').value = 'ptTopfriends';
                ptResetMaxIds('ptTopfriends');        
        
                if(document.getElementById('timeline_heading'))
                        document.getElementById('timeline_heading').innerHTML = '<h1>Top Friends</h1>';
                        
                ptMaxId = (ptMore == 1) ? document.getElementById('ptTopFriendsMaxId').value : 0;
                document.getElementById('ptPageNumber').value = (ptMaxId > 0) ? 2 : 0; // used to handle when to clear the page
                document.getElementById('ptLastSearch').value = 'ptTopfriends'; // set the hidden input to make this a "search" for older/newer
                if (ptMaxId == 0)
                        ptToggleLoadingMessage(true);
                
                var ptTop_JSON = document.createElement("script");
                ptTop_JSON.type="text/javascript";
                ptTop_JSON.src=ptServer + ptScript + "?action=topfriends&callback=ptCbShowResults&sLoggedInUser="+ptLoggedInUserName+"&iMaxId="+ptMaxId;
                document.getElementsByTagName("head")[0].appendChild(ptTop_JSON);
                document.getElementById('ptStatus').style.display = 'block';
                ptWait(
                        function(){ return document.getElementById('ptLinkUpdateStatus').value == 0},
                        function(){ ptUpdateLinks(''); }
                );
        }
        else
        {
                alert('To show Top Friends updates, your password must be set.');
                ptShowSettings();
        }


}

function ptGetMentions()
{
        ptQ = '@'+ptLoggedInUserName;
        var twitter_JSON = document.createElement("script");
	twitter_JSON.type="text/javascript";
	ptPage = "&page=1";
        document.getElementById('ptPageNumber').value = 1; // reset the page count
        document.getElementById('ptLastSearch').value = ptQ; // set the hidden input to make this a "search" for older/newer
	twitter_JSON.src="http://search.twitter.com/search.json?callback=ptCbShowResults&q="+ptQ + ptPage;
	document.getElementsByTagName("head")[0].appendChild(twitter_JSON);
        document.getElementById('ptStatus').style.display = 'block';
        ptWait(
                function(){ return document.getElementById('ptLinkUpdateStatus').value == 0},
                function(){ ptUpdateLinks(''); }
        );
}

function ptGetWebUpdates()
{
        var ptWebUpdates_JSON = document.createElement("script");
        ptWebUpdates_JSON.type="text/javascript";
        ptWebUpdates_JSON.src= ptServer + ptScript + "?action=webUpdates&format=json&sViewingUser="+ptViewingUser;
        document.getElementsByTagName("head")[0].appendChild(ptWebUpdates_JSON);
        document.getElementById('ptStatus').style.display = 'block';
        ptWait(
                function(){ return document.getElementById('ptLinkUpdateStatus').value == 0},
                function(){ ptUpdateLinks(''); }
        );
}


function ptGetOlderResults()
{
        document.getElementById('ptClearTimeline').value = '0';
        // check to see if you want to go back in time for a custom service
        if(document.getElementById('ptCurrentService').value == 'topfriends')
        {
                ptGetTopfriendsUpdates(1);
        }
        else if(document.getElementById('ptCurrentService').value == 'interesting')
        {
                ptGetInterestingUpdates(1);
        }
        else
        {
                var twitter_JSON = document.createElement("script");
                twitter_JSON.type="text/javascript";
                ptPageNumber = parseInt(document.getElementById('ptPageNumber').value);
                ptPage = "&page=" + ptPageNumber;
                ptQ = document.getElementById('ptLastSearch').value;
                document.getElementById('ptPageNumber').value = ptPageNumber; // increment the page count
                if(document.getElementById('ptRestrictedSearch').value.length)
                        twitter_JSON.src="http://search.twitter.com/search.json?callback=ptCbShowResults&q="+ptQ+"%20from%3A"+document.getElementById('ptRestrictedSearch').value + ptPage;
                else
                        twitter_JSON.src="http://search.twitter.com/search.json?callback=ptCbShowResults&q="+ptQ + ptPage;
                document.getElementsByTagName("head")[0].appendChild(twitter_JSON);
                // now we need to wait for the ptCbShowResults to finish
                document.getElementById('ptStatus').style.display = 'block';
                ptWait(
                        function(){ return document.getElementById('ptLinkUpdateStatus').value == 0},
                        function(){ ptUpdateLinks(''); }
                );
        }
}


function ptGetSearchResults(ptQ,ptP,ptRestrictTo)
{
	var twitter_JSON = document.createElement("script");
	twitter_JSON.type="text/javascript";
	ptPage = "&page=" + ptP;
	ptPageNumber = ptP;
	if(ptRestrictTo)
		twitter_JSON.src="http://search.twitter.com/search.json?callback=ptCbShowResults&q="+ptQ+"%20from%3A"+ptRestrictTo + ptPage;
	else
		twitter_JSON.src="http://search.twitter.com/search.json?callback=ptCbShowResults&q="+ptQ + ptPage;
	document.getElementsByTagName("head")[0].appendChild(twitter_JSON);
        // now we need to wait for the ptCbShowResults to finish
        document.getElementById('ptStatus').style.display = 'block';
        ptWait(
                function(){ return document.getElementById('ptLinkUpdateStatus').value == 0},
                function(){ ptUpdateLinks(''); }
        );

}

// utility functions

function embedFunction(s)
{
	var ptScriptObject = document.createElement('script');
	ptScriptObject.type = "text/javascript";
	document.body.appendChild(ptScriptObject).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

function exportGlobal(name,value)
{
	embedFunction("var "+ name +" = '" + value + "';");
}

function addGlobalStyle(css)
{
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function ptIsImgUrl(s)
{
        if(s&&s.indexOf('flickr.com') != -1)
                return true;
        else if(s&&s.indexOf('twitpic') != -1)
                return true;
        else if(s&&s.indexOf('yfrog') != -1)
                return true;
        else
                return false;
}

function ptRelativeTime(time_value)
{
	var parsed_date = Date.parse(time_value);
	var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
	var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
	if(delta < 60) {
		return 'less than a minute ago';
	} else if(delta < 120) {
		return 'about a minute ago';
	} else if(delta < (45*60)) {
		return (parseInt(delta / 60)).toString() + ' minutes ago';
	} else if(delta < (90*60)) {
		return 'about an hour ago';
	} else if(delta < (24*60*60)) {
		return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
	} else if(delta < (48*60*60)) {
		return '1 day ago';
	} else if(delta < (48*60*60*7)) {
		return (parseInt(delta / 86400)).toString() + ' days ago';
	} else {
		ptOldDate = new Date(parsed_date);
		return ptOldDate.toString();
	}
}

function getWinWidth()
{
	if (window.innerWidth)
	{
		w = window.innerWidth;
		if (document.body.scrollHeight && document.body.scrollHeight >= getWinHeight())
			w-=16;
		return w;
	}
	else if (document.documentElement && document.documentElement.clientWidth)
		return document.documentElement.clientWidth;
	else if (document.body && document.body.clientWidth)
		return document.body.clientWidth;
	else if (document.body && document.body.parentNode && document.body.parentNode.clientWidth)
		return document.body.parentNode.clientWidth;

	return false;
}

function getWinHeight()
{
	if (window.innerHeight) return window.innerHeight;
	else if (document.documentElement && document.documentElement.clientHeight)
		return document.documentElement.clientHeight;
	else if (document.body && document.body.clientHeight)
		return document.body.clientHeight;
	else if (document.body && document.body.parentNode && document.body.parentNode.clientHeight)
		return document.body.parentNode.clientHeight;
	return false;
}

function ptShowHideShade(id, displayMode) // block or none
{
	el = document.getElementById(id);

	if (!el || el.style.display == displayMode)
		return;

	if (displayMode == 'block')
	{
		var biggestHeight = document.body.scrollHeight;
		if (getWinHeight() > biggestHeight)
			biggestHeight = getWinHeight();

		el.style.width=document.body.scrollWidth+'px';
		el.style.height=biggestHeight+'px';
	}

	el.style.display = displayMode;
}

function ptDisplayCenteredDiv(el,offsetTop)
{
	el.style.display = 'inline';
	winTop = getWinTop();
	if (offsetTop > 20)
		el.style.top = winTop + offsetTop + 'px';
	else
		el.style.top = winTop + 20 + 'px';
	el.style.left= (getWinWidth()/2 - el.offsetWidth/2)/2 +'px';
	el.style.visibility = 'visible';
}

function getWinLeft() {return typeof window.pageXOffset != 'undefined' ? window.pageXOffset:document.documentElement && document.documentElement.scrollLeft? document.documentElement.scrollLeft:document.body.scrollLeft? document.body.scrollLeft:0;}
function getWinTop() {return typeof window.pageYOffset != 'undefined' ? window.pageYOffset:document.documentElement && document.documentElement.scrollTop? document.documentElement.scrollTop: document.body.scrollTop?document.body.scrollTop:0;}
function getWinRight() {return getWinLeft()+getWinWidth();}
function getWinBottom() {return getWinTop()+getWinHeight();}

Array.prototype.unique = function () {
	var r = new Array();
	o:for(var i = 0, n = this.length; i < n; i++)
	{
		for(var x = 0, y = r.length; x < y; x++)
		{
			if(r[x]==this[i])
			{
				continue o;
			}
		}
		r[r.length] = this[i];
	}
	return r;
}


// end
// ---------------------------------------------------------------------


// ---------------------------------------------------------------------
// ChangeLog
// 2007-03-14 - 0.1 - first release
// 2007-03-16 - 0.2
// 2008-11-13 - 0.9 - submitting Power Twitter to Mozilla repository
// 2008-12-13 - 1.0 - full upgrade and update (added search and peek)
// 2009-01-05 - 1.01 - fix & posting bug
// 2009-01-14 - 1.02 - fix escaped character bug that truncated and didn't allow international characters
// 2009-02-03 - 1.03 - twitter.com update broke some features, emergency update
// 2009-02-22 - 1.1 - major update including settings, photo posting, link shortening, multi threaded
// 2009-03-01 - 1.12 - minor tweaks to fix bugs
// 2009-03-12 - 1.13/4 - dropped kill switch for speed, upgraded for new facebook page, showing media on new twitter search, fixed in_reply_to
// 2009-03-18 - 1.15/6 - restored ajax updating, replaced some GM xhttp in favor of script appends.  Updated for new twitter pagination
// 2009-03-23 - 1.17 - more fixes for twitter and facebook updates
// 2009-03-28 - 1.18 - refactoring for speed, facebook profile pics added
// 2009-04-02 - 1.19 - updating for the next version of twitter, removed @mentions
// 2009-04-26 - 1.20/1 - bug fixes, Interesting tab, backend improvements for speed
// 2009-05-01 - 1.22 - updates to the profile page
// 2009-06-25 - 1.30 - major update, https support, top friends, fixed some search box bugs, added yfrog, question of the day, open links in new windows, settings
// 2009-07-01 - 1.31 - minor bug fixes
// 2009-07-02 - 1.32 - fixed bugs with link updating after searching
// 2009-07-20 - 1.33 - SAFARI RELEASE
// 2009-09-22 - 1.34 - bug fixes
// 2009-10-08 - 1.35 - critical bug fix
