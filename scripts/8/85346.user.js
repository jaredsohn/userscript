// pubmeder at appspot.com - user script
// version 0.432
// 2011-2-24
// Copyright (c) 2011, Liang Cai
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey from http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "pubmeder at appspot.com", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          pubmeder at appspot.com
// @namespace     http://pubmeder.appspot.com/
// @description   send found pmc/doi/pmid on every page to the server
// @include       *
// ==/UserScript==

// visit http://pubmeder.appspot.com/registration to get the apikey

// enable (remove the //) the following two lines to clean the apikey
//GM_deleteValue("pubmeder_apikey");
//GM_deleteValue("pubmeder_email");

var notRun = 0;
if (!GM_xmlhttpRequest) {
  alert('Please upgrade to the latest version of Greasemonkey.');
  notRun = 1;
}

if ( document.URL === "http://pubmeder.appspot.com/registration" ) {
  var email = document.getElementById('currentUser').innerHTML;
  var apikey = document.getElementById('apikey_pubmeder').innerHTML;
  GM_setValue("pubmeder_apikey",apikey);
  GM_setValue("pubmeder_email",email);
  notRun = 1;
}

var apikey = GM_getValue("pubmeder_apikey");
var email = GM_getValue("pubmeder_email");
var tail = '';
if ((apikey !== undefined) && (email !== undefined)) {
  tail = '&apikey='+apikey+'&email='+email;
}

var oneTimeReminder = GM_getValue("pubmeder_oneTimeReminder");
if (oneTimeReminder === undefined){
  GM_setValue("pubmeder_oneTimeReminder","0");
}
var d = new Date();
var currentDate = d.getDate();
if (oneTimeReminder !== currentDate && apikey === undefined) {
  GM_openInTab("http://pubmeder.appspot.com/registration");
  GM_setValue("pubmeder_oneTimeReminder",currentDate);
}

var currentList = GM_getValue("pubmeder_pmidList");
if (currentList === undefined) {
  currentList = "";
}

window.sendRequest = function(c) {
  var i, j;
  currentList += ',' + c;
  d = currentList.split(",");
  new_d = [];
  g:for (i = 0; i < d.length; i++) {
      if (d[i] === "")
        { continue g; }
      for (j = 0; j < new_d.length; j++) {
        if (new_d[j] === d[i])
          { continue g; }
      }
      new_d[new_d.length] = d[i];
    }
  currentList = new_d.join(",");
  // alert(currentList);
  if (new_d.length > 9) {
    var urlurl = 'http://pubmeder.appspot.com/input?pmid=' + currentList + tail;
    GM_xmlhttpRequest({
      method: "GET",
      url: urlurl,
      onload: function(response) {
        if (response.responseText) {
          // alert(response.responseText);
          var logo = document.createElement("div");
          logo.innerHTML = '<div style="margin:0;padding:0;height:4px;background:#fdd;">&nbsp;</div>';
          document.body.insertBefore(logo, document.body.firstChild);
          GM_setValue("pubmeder_pmidList","");
        }
      }
    });
  } else {
    var logo = document.createElement("div");
    logo.innerHTML = '<div style="margin:0;padding:0;height:4px;background:#ddf;">&nbsp;</div>';
    document.body.insertBefore(logo, document.body.firstChild);
    GM_setValue("pubmeder_pmidList",currentList);
  }
};

window.esearchsend = function(b) {
  var url = 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&tool=pubmeder&email=i@cail.cn&term=' + b;
  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: function(xml) {
      var parser = new DOMParser();
      var dom = parser.parseFromString(xml.responseText,"application/xml");
      var xid = dom.getElementsByTagName("Id");
      if (!xid[1]) {
        sendRequest(xid[0].firstChild.nodeValue);
      }
    }
  });
};

if (document.body === null) {
  notRun = 1;
}

function run() {
  if (notRun) {
    return false;
  }
  var a = document.body.innerText;
  if (a === undefined) {
    a = document.body.innerHTML;
    var regExp = /<[^>]+>/gi;
    a = a.replace(regExp,"");
  }

  var regpmid = /pmid\s*:?\s*(\d+)\s*/i;
  var regdoi = /doi\s*:?\s*/i;
  var doipattern = /(\d{2}\.\d{4}\/[\w\.\/]+\w)\s*\W?/;
  var regpmc = /pmcid\s*:?\s*(PMC\d+)\s*/i;
  var ID = "";

  if (regpmid.test(a)) {
    ID = regpmid.exec(a);
    sendRequest(ID[1]);
  } else if (regdoi.test(a) || doipattern.test(a)) {
    ID = doipattern.exec(a);
    if (ID !== null) {
      esearchsend(ID[1]);
    }
  } else if (regpmc.test(a)) {
    ID = regpmc.exec(a);
    esearchsend(ID[1]);
  } //else {
    // no pattern matched
  //}
}
run();