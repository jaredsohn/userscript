// ==UserScript==
// @name           AmazonBookCover
// @version      1.3.2
// @description    Replace the book cover thumbnail or "Search Inside" thumbnail with the full-size image. Use your browser's normal right click to "Save image as..."
// @namespace      AmazonBookCover
// @include       http://www.amazon.*/dp/*
// @include       http://www.amazon.*/exec/obidos/ASIN/*
// @inclde        http://www.amazon.*/reader/*#reader
// ==/UserScript==

/** changelog
2009-0322
    Added an extra include to handle newer Amazon reader URL 
2008-04-15
    Add include url to handle jump links from other sites to Amazon
2008-04-04
    Now handles customer images
      Highlight an image and click the button to show the full image
      Highlight another customer image to restore the button
2008-03-30
  Somehow I managed to screw-up the update process for Greasemonkey users -
    UNINSTALL PREVIOUS VERSION before installing this one 
    (IMPORTANT!! - select "Also uninstall associated preferences")
*/

(function() {
  /* x-browser event register */
  function addEvent(elm,evType,fn,useCapture){if(elm.addEventListener){elm.addEventListener(evType,fn,useCapture);return true;}else if(elm.attachEvent){var r=elm.attachEvent('on'+evType,fn);return r;}else{elm['on' + evType]=fn;}}
/*this.removeHandler = function (el, evt, fn)
{
if (el.detachEvent)
return el.detachEvent("on"+evt, fn);
else if (el.removeEventListener)
return (el.removeEventListener(evt, fn, false), true);
else
return (el["on"+evt] = null, true);
return false;
}*/
  /* x-browser detection of event target */
  function eventTarget(e){var targ;if(!e){var e=window.event;}if(e.target){targ=e.target;}else if(e.srcElement){targ=e.srcElement;}if(targ.nodeType==3){targ=targ.parentNode;}return targ;}
  // quick & dirty check for IE
  var isIE = (document.attachEvent && !window.opera) ? true : false;
  
  if ( !(isIE || window.opera) ) {
    // SCRIPT UPDATE CHECKER by 'Jarett' http://userscripts.org/scripts/show/20145
    var version_scriptNum = 24395;
    var version_timestamp = 1208256384154;
    function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand("++ " + GM_getValue("targetScriptName", "AmazonBookCover") + " - Manual Update Check ++", function() {updateCheck(true);}); updateCheck(false);
    // ENDS UPDATE CHECKER
  }

  function addCoverButton() {
    if ( document.getElementById("AmazonBookover") ) {
      return;
    }
    var tbl = document.getElementById("prodImageCell").parentNode.parentNode;
    var tr = tbl.insertBefore(document.createElement("tr"), tbl.firstChild);
    var td = tr.appendChild(document.createElement("td"));
    td.style.paddingBottom = "5px";
    var b = td.appendChild(document.createElement("button"));
    b.setAttribute("id", "AmazonBookCover");
    b.innerHTML = "Show Cover Image";
    b.style.marginTop = "2px";
    if ( document.getElementById("cust_image_0") ) {
      b.style.cssFloat = b.style.styleFloat = "left";
    }
    addEvent(b, 'click', 
      function(e) {
        if(e && e.target){e.preventDefault();}else{window.event.returnValue=false;}
        var g = document.getElementById("prodImageCell").getElementsByTagName("img")[0];
        //var m = g.src.match(/(.*)\..*\.(jpg|gif)$/);
        var m = g.src.match(/(.*)\._.*_\.(.*jpg|gif)$/);
        if ( m ) {
          var img = document.createElement('img');
          img.src = m[1] + "." + m[2]
          g.parentNode.replaceChild(img, g);
          eventTarget(e).style.display = "none";
        }
      }
      , false
    );
  }
  
  function moveCustomerImages() {
    var tbl = document.getElementById("prodImageCell").parentNode.parentNode;
    var tr = tbl.insertBefore(document.createElement("tr"), tbl.firstChild);
    var td = tr.appendChild(document.createElement("td"));
    tbl = td.appendChild(document.getElementById("cust_image_0").parentNode.parentNode.parentNode);
    tbl.setAttribute("align", "");
    tbl.style.cssFloat = tbl.style.styleFloat = "left";
  }
  
  var img = document.getElementById("prodImage");
  if ( img ) {
    if ( /no-image-avail-img-map/.test(img.src) ) {
      return;
    }
    addCoverButton();
    if ( document.getElementById("cust_image_0") ) {
      moveCustomerImages();
      var c = document.getElementById("prodImageCell");
      if ( isIE ) {
        c.attachEvent("onpropertychange", function() {
            document.getElementById("AmazonBookCover").style.display = "block";
        });
      } else {
        c.addEventListener("DOMNodeInserted", function(e) {
            if ( e.target.nodeName == "A" ) {
              document.getElementById("AmazonBookCover").style.display = "block";
            }
        }, false);
      }
    }
  }
  
})();