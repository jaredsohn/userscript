// By Sean Coates: sean@caedmon.net
// ==UserScript==
// @name		Homestar Runner - StrongBad Emails: Prev & Next
// @namespace		http://www.phpdoc.info/greasemonkey
// @description		Adds "Prev" and "Next" buttons to StrongBad Emails
// @include		http://*.homestarrunner.com/sbemail*.html
// @exclude		http://*.homestarrunner.com/sbemail.html

// ==/UserScript==

(function() {
  var styleStub = "color: white; background-color: #993333; "
    + "border: 1px solid #333399; padding: 5px; "
    + "font-family: arial, sans-serif; cursor: pointer; "
    + "position: absolute; z-index: 100; ";
  
  var file = window.location.pathname;
  var thisEmail; var prevEmail; var nextEmail;
  
  if (file == '/sbemailahundred.html') {
    thisEmail = 100;
  } else {
    thisEmail = file.match(/[0-9]+/);
  }
  
  if (thisEmail == 101) {
    prevEmail = 'ahundred';
  } else {
    prevEmail = (thisEmail * 1) - 1;
  }

  if (thisEmail == 99) {
    nextEmail = 'ahundred';
  } else {
    nextEmail = (thisEmail * 1) + 1;
  }

  if (prevEmail) {
    var prevDiv = document.createElement("div");
    prevDiv.setAttribute("style", "text-align: left; left: 1px; bottom: 1px; " + styleStub);
    prevDiv.innerHTML = '&lt;&mdash;';
    prevDiv.setAttribute("onclick", "window.location='/sbemail" + prevEmail + ".html'");
    document.body.insertBefore(prevDiv, document.body.firstChild);
  }
  
  nextDiv = document.createElement("div");
  nextDiv.setAttribute("style", "text-align: right; right: 1px; bottom: 1px; " + styleStub);
  nextDiv.innerHTML = '&mdash;&gt;';
  nextDiv.setAttribute("onclick", "window.location='/sbemail" + nextEmail + ".html'");
  document.body.insertBefore(nextDiv, document.body.firstChild);
  
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.homestarrunner.com/sbemail' + nextEmail + '.html',
    onload: function(responseDetails) {
      if (responseDetails.status == 404) nextDiv.style.display="none";
    },
    onerror: function(responseDetails) {
      if (responseDetails.status == 404) nextDiv.style.display="none";
    }
  });  

})();
