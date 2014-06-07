// ==UserScript==
// @name           ase announcements parser
// @namespace      http://userscripts.org/users/59262
// @source         http://userscripts.org/scripts/show/74906
// @identifier     http://userscripts.org/scripts/source/74906.user.js
// @version        1.0
// @date           2010-04-21
// @creator        Constantinos Neophytou
// @include        http://www.athex.gr/content/gr/Companies/ListedCo/Financial_Statements/FS_default.asp*
// ==/UserScript==

var version_timestamp   = 201004211326;

var version_scriptNum = 74906;
function updateCheck(forced){if((forced)||(parseInt(GM_getValue("lastUpdate","0"), 10)+86400000<=(new Date().getTime()))){try{GM_xmlhttpRequest({method:"GET",url:"http://userscripts.org/scripts/review/"+version_scriptNum+"?"+new Date().getTime(),headers:{'Cache-Control':'no-cache'},onload:function(xhrResponse){GM_setValue("lastUpdate",new Date().getTime()+"");var rt=xhrResponse.responseText.replace(/&nbsp;?/gm," ").replace(/<li>/gm,"\n").replace(/<[^>]*>/gm,"").replace(/&#x000A;?/g,"\n");var scriptName=(/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue("targetScriptName",scriptName);if(parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1], 10)>version_timestamp){if(confirm("There is an update available for the Greasemonkey script \""+scriptName+".\"\nWould you like to go to the install page now?")){GM_openInTab("http://userscripts.org/scripts/show/"+version_scriptNum);}}else if(forced){alert("No update is available for \""+scriptName+".\"");}}});}catch(err){if(forced){alert("An error occurred while checking for updates:\n"+err);}}}}GM_registerMenuCommand(GM_getValue("targetScriptName","???")+" - Manual Update Check",function(){updateCheck(true);});updateCheck(false);


// private method for UTF-8 decoding
function _utf8_decode (utftext) {
  var string = "";
  var i = 0;
  var c = c1 = c2 = 0;

  while ( i < utftext.length ) {

    c = utftext.charCodeAt(i);

    if (c < 128) {
      string += String.fromCharCode(c);
      i++;
    }
    else if((c > 191) && (c < 224)) {
      c2 = utftext.charCodeAt(i+1);
      string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
      i += 2;
    }
    else {
      c2 = utftext.charCodeAt(i+1);
      c3 = utftext.charCodeAt(i+2);
      string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
      i += 3;
    }
  }
  return string;
}

function html_entity_decode(str) {
  var tarea=document.createElement('textarea');
  tarea.innerHTML = str;
  return tarea.value;
}

function checkLinkStart(link, compareLink) {
  if (!link || !link.href) return true;
  return link.href.substr(0, compareLink.length) == compareLink;
}


function Company() {
  this.cid = 0;
  this.name = "";
  this.announcements = new Array();
}


var companies = new Array();

function printLinks() {
  var prefs = "width=500,height=500,resizable=yes,scrollbars=yes,toolbar=no,location=no,directories=no,status=no,menubar=no,copyhistory=no";
  var sitetableWin = window.open('about:blank', 'sitetable', prefs);

  sitetableWin.document.write('<html><head><title>Announcements table</title></head>');
  sitetableWin.document.write('<BODY>');
  var body = sitetableWin.document.getElementsByTagName('body')[0];

  var div = document.createElement('table');
  //body.insertBefore(div, body.firstChild);
  body.appendChild(div);
  div.style.border="1px solid #000000";
  div.rowsep = "1"
  div.rules="all";
  var header = document.createElement('tr');
  div.appendChild(header);
  header.style.border="1px solid #000000";
  var head1 = document.createElement('th');
  header.appendChild(head1);
  head1.appendChild(document.createTextNode('CID'));
  var head2 = document.createElement('th');
  header.appendChild(head2);
  head2.appendChild(document.createTextNode('Name'));
  var head3 = document.createElement('th');
  header.appendChild(head3);
  head3.appendChild(document.createTextNode('Announcements'));
  for (var x in companies) {
    var row = document.createElement('tr');
    row.style.border="1px solid #000000";
    div.appendChild(row);
    var col1 = document.createElement('td');
    row.appendChild(col1);
    var cid = document.createTextNode(companies[x].cid);
    col1.appendChild(cid);
    var col2 = document.createElement('td');
    row.appendChild(col2);
    var name = document.createTextNode(html_entity_decode(companies[x].name));
    col2.appendChild(name);
    var col3 = document.createElement('td');
    row.appendChild(col3);
    for (var y in companies[x].announcements) {
      var link = document.createTextNode(_utf8_decode(unescape(companies[x].announcements[y])));
      col3.appendChild(link);
      col3.appendChild(document.createElement('br'));
    }
  }
}

function _init(doPrint) {
  links = document.getElementsByTagName('a');
  var compareLink = "http://www.ase.gr/content/gr/companies/listedco/profiles/profile.asp?Cid=";

  for (var i = 0; i < links.length; ++i) {
    if (!links[i] || !links[i].href) continue;
    if (checkLinkStart(links[i], compareLink)) {
      // found table, re-populate links
      var elem = links[i];
      while (elem.parentNode.tagName != "TABLE") {
        elem = elem.parentNode;
      }
      links = elem.getElementsByTagName('a');
      break;
    }
  }

  for (var i = 0; i < links.length; ++i) {
    if (!links[i] || !links[i].href) continue;
    if (checkLinkStart(links[i], compareLink)) {
      var c = new Company();
      c.cid = links[i].href.substr(compareLink.length);
      var name = links[i].parentNode.getElementsByTagName('b');
      if (name && name[0])
        c.name = name[0].innerHTML;
      while (!checkLinkStart(links[++i], compareLink)) {
        c.announcements.push(links[i].href);
      }
      --i;
      companies.push(c);
    }
  }
  if (doPrint)
    printLinks();
}

(function () {
  setTimeout(function() { _init(true); }, 150);
}) ();

