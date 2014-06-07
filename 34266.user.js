// ==UserScript==
// @name OpenCourseWare Prereqs
// @description Add course prereqs to each page
// @namespace http://web.mit.edu/bergey/www
// @include http://ocw.mit.edu/*
// ==/UserScript==

function parsePrereqs(letter) {}

function getPrereqs(letter) {
  if (!GM_xmlhttpRequest) { 
    alert("This version of Greasemonkey cannot fetch URLs.  Please upgrade."); 
   } else {
     GM_xmlhttpRequest({method: 'GET', url: 'http://student.mit.edu/catalog/m'+dept+letter+'.html', 
       onload: parsePrereqs(letter)
       }) // close function call
  } // if GM_xmlhttpRequest
}

var divs, courseLevel;
// get the course number
var url = window.location.href;
var courseRe = new RegExp ("OcwWeb/.*?/([0-9]+)-([0-9]+)");
var match = courseRe.exec(url);
if (match) {
  var dept = match[1];
  var course = match[2];
  getPrereqs('a');
}

function parsePrereqs(letter) { return function(details) {
  if (details.status == 200) {
    var match = new RegExp('<a name="'+dept+'.'+course+'">[\\s\\S]*?Prereq:(.*)', 'm').exec(details.responseText);''
    if (match) {
      var prereqString = match[1].replace(/<.*?>/g, '');
      var rege = /\d+\.\d+/g
      var s;
      var prereqList = [];
      while (s = rege.exec(prereqString)) {
        prereqList.push(s);
      }

      if (prereqList.length) {
        GM_xmlhttpRequest({method: 'GET', url: 'http://ocw.mit.edu/OcwWeb/web/courses/courses/index.htm',
          onload: linkify(prereqList, prereqString)});
      }
    } else {
      switch(letter) {
        case 'a':
          getPrereqs('b');
          break;
        case 'b':
          getPrereqs('c');
          break;
      } //no prereqs
    }
  }
}
}

function linkify(prereqs, text) { 
  return function(details) {
    var linkre;
    for each (p in prereqs) {
      // How do I get XML from xmlhttpRequest?
      //link = details.requestXML.evaluate("//td[text()="+p+"]/following::*[0]/a");
      linkre = new RegExp('<td>'+p+'J?</td>\s*<td>\s*<a href="([^"]*)"', 'm');
      match = linkre.exec(details.responseText);
      if (match) {
        linkre = new RegExp(' '+p+'(?!\\d)', 'g');
        text = text.replace(linkre, ' <a href="'+match[1]+'">'+p+'</a>');
      } else {
      }
    }
    // find the element
    divs = document.evaluate("//div[@class='chpcourselevel']", document, null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (divs.snapshotLength) { 
      courseLevel = divs.snapshotItem(0); 
      var el = document.createElement("div");
      el.innerHTML = "<div><h3>Prerequisites:</h3><span>"+text+"</span></div>";
      courseLevel.parentNode.appendChild(el);
    }
  }
}
