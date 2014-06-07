// ==UserScript==
// @name           disable_onbeforeunload
// @namespace      auto-zap
// @description    Warns about potentially malicious JS code. Like onBeforeUnload, onClick, onUnload.. these can be used to generate unescapable pages. Can blacklist/whitelist domains and subdomains. Uses the DOM Storage (available from Firefox 2)
// @include        *
// @author         PAStheLoD
// @contact        pasthelod@gmail.com
// ==/UserScript==


function saveURL(url){        
  unsafeWindow.globalStorage[url].pageIsWhiteListed = true;
}

function isBadPage(url){
  if(confirm("This page uses onUnload or onBeforeUnload or onClick. Clicking Cancel will put this page on the 'good pages' list. Clicking OK will just eliminate those event handlers. \n "  + url )){
    return true;
  }  else   {
    return false;
  }
}

function isWhiteListed(url){
  if(!unsafeWindow.globalStorage || !unsafeWindow.globalStorage[url]){
      return false;
  }
  if(unsafeWindow.globalStorage[url].pageIsWhiteListed == true || unsafeWindow.globalStorage[url].pageIsWhiteListed == "true"){
      return true;
  }else{
      return false;
  }
}

function isBlackListed(url){
  if(!unsafeWindow.globalStorage || !unsafeWindow.globalStorage[url]){
      return false;
  }  
  if(unsafeWindow.globalStorage[url].pageIsBlackListed  == "true" || unsafeWindow.globalStorage[url].pageIsBlackListed  == true){
      return true;
  }else{
      return false;
  }
}

function blacklist(url){
  unsafeWindow.globalStorage[url].pageIsBlackListed = true;  
  unsafeWindow.globalStorage[url].pageIsWhiteListed = false;  
}

function removePref(url, pref){
  unsafeWindow.globalStorage[url][pref] = null;  
}


function clearShit(){
      unsafeWindow.onbeforeunload = null;
      unsafeWindow.onunload = null;
      unsafeWindow.alert = null;
      unsafeWindow.confirm = null;
      unsafeWindow.prompt = null;
      unsafeWindow.open = null;      
}


if(unsafeWindow.onbeforeunload != null || unsafeWindow.onunload != null || unsafeWindow.onclick != null ){

  var s1 = unsafeWindow.onbeforeunload || "";
  var s2 = unsafeWindow.onunload || "";
  var s3 = unsafeWindow.onclick || "";
  
  var s = "onbeforeunload: " + s1 + "\n\n onunload:" + s2 + "\n\n onclick:" +s3; 
  
  
  var url = window.location.href;
  url = url.replace(/http:\/\/([^\/]+).*/,  '$1');
  if(url.indexOf(".") == -1) {
    url = url + ".localdomain";
  }
  
  var domain = url.replace(/.*\.([^.]+\.[^.]{0,6})/,'$1');  
  if (domain != url && !isWhiteListed(domain) && !isBlackListed(domain)){
     GM_registerMenuCommand( "Add domain to whitelist", doWhiteListDomain);  
  }  
  
  function doBlackList(){    
    blacklist(url);
    clearShit();
    return true;
  }
  function doWhiteList(){
    saveURL(url);
    return true;
  }
  function doWhiteListDomain(){
    saveURL(domain);
    return true;
  }
  
  function doRemoveWhiteListDomain(){
    removePref(domain,"pageIsWhiteListed");
    return true;
  }
  function doRemoveBlackList(){
    removePref(url,"pageIsBlackListed");
    return true;
  }
  
  function doRemoveWhiteList(){
    removePref(url,"pageIsWhiteListed");
    return true;
  }
  
  
    
  
    
  if(isWhiteListed(url) || isWhiteListed(domain)){    
        GM_registerMenuCommand( "Remove site from whitelist", doRemoveWhiteList);
        GM_registerMenuCommand( "Add site to blacklist", doBlackList);
        if(domain != url && isWhiteListed(domain)){
            GM_registerMenuCommand( "Remove domain from whitelist", doRemoveWhiteListDomain);
        }
        return true;
  }  else {
        GM_registerMenuCommand( "Add site to whitelist", doWhiteList);
  }
  
  if(isBlackListed(url) || isBlackListed(domain)){      
        GM_registerMenuCommand( "Remove site from balcklist", doRemoveBlackList);
        clearShit();
        return;
  }

  if(isBadPage(url + "\n\n" + s)){  
        GM_registerMenuCommand( "Add site to blacklist", doBlackList);
        clearShit();
  }else{
     saveURL(url);
  }  
}
