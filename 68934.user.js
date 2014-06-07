// ==UserScript==
// @name           eksikimdir
// @namespace      eksisozluk
// @version        1.22
// @description    Eksi Sozluk'te kimdir nedir sayfasini eskisi gibi yeni bir pencerede acar.
// @include        http://sozluk.sourtimes.org/show.asp*
// @include        http://sozluk.sourtimes.org/cc.asp*
// @include        http://sozluk.sourtimes.org/top.asp*
// @include        http://eksisozluk.com/show.asp*
// @include        http://eksisozluk.com/cc.asp*
// @include        http://eksisozluk.com/top.asp*
// @include        http://www.eksisozluk.com/show.asp*
// @include        http://www.eksisozluk.com/cc.asp*
// @include        http://www.eksisozluk.com/top.asp*
// ==/UserScript==

(function(){

function makeUserInfoPopupLink(userName) {
  return 'javascript:od("info2.asp?n=' + encodeURIComponent(userName) + '", 600, 460)';
}

function getUserNameFromURL(url) {
  var splitted = url.split("=");
  if (splitted.length>1) {
    var userName = splitted[splitted.length-1];
    return userName;
  }
  return null;
}

function getElementByInnerHTML(parent, tagName, innerHTML) {
  var as = parent.getElementsByTagName(tagName);
  for (i=as.length-1; i>=0; i--) {
    var a = as[i];
    if (a.innerHTML.indexOf(innerHTML)>0) {
      return a;
    }
  }
  return null;
}

function installTopFrame() {
  
  if (document.location.href.indexOf("/top.asp")>0) {
    var a = getElementByInnerHTML(document, "a", "ben");
    if (a) {
      if (a.href.indexOf("javascript:od")>0) // already installed
        return true;        
      var userName = getUserNameFromURL(a.href);
      if (userName) {
        a.href = makeUserInfoPopupLink(userName);
        return true;
      }      
    }
  }
}

function overwriteLink(id) {

  var butOver = null;
  if (navigator.appName=="Opera") {
    butOver = getElementByInnerHTML(document.getElementById("m"+id), "a", "?");
  }
  else {
    butOver = document.getElementById("butOver");
  }
  
  if (butOver && butOver.innerHTML.indexOf("?")>0 && butOver.href.indexOf("javascript:od")==-1) {
    var userName = getUserNameFromURL(butOver.href);
    if (userName) {
      butOver.href = makeUserInfoPopupLink(userName);
    }
  }
}

function installMouseOverHandler(parentElement) {
  if (parentElement) {
    for (i=0; i<parentElement.childNodes.length; i++) {
      var li = parentElement.childNodes[i];
      var id = parseInt(li.id.substring(1));
      if (id) {
        var d = document.getElementById("d" + id);
        if (d) d.addEventListener("mouseover", function(n){ return function(){ overwriteLink(n); }; }(id) , false);
      }
    }
  }
}

function installMainFrame() {
  if (document.location.href.indexOf("/show.asp")>0) {
  installMouseOverHandler(document.getElementById("el"));
  }
}
function installMessagePage() {
 if (document.location.href.indexOf("/cc.asp")>0) {
    installMouseOverHandler(document.getElementsByTagName("ul")[0]);
  }
} 
installMainFrame();
installTopFrame();
installMessagePage();

})();

