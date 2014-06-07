// User Scripts Search Sorting, v 0.3.1, 2007-March-14
// Copyright (c) Brad Stewart, 2007
// Released under the GNU GPL, v2
// ==UserScript==
// @name           User Scripts Search Sorting - With Install Rate
// @namespace      http://bradmont.net
// @description    Sorts search results on userscripts.org
// @include        http://userscripts.org/scripts/search*
// @include        http://*.userscripts.org/scripts/search*
// @include        http://userscripts.org/tag/*
// @include        http://*.userscripts.org/tag/*
// @include        http://userscripts.org/users/*scripts*
// @include        http://*.userscripts.org/users/*scripts*
// ==/UserScript==

/*
 * Modified version of an original script written by Brad Stewart, all headers have been left in tact.
 * Original script found at http://userscripts.org/scripts/show/7884
 * Modifications made by znerp.
 * Changes from original: - installs per day added to each script on us.o site.
 *                        - sorting by installs/day enabled.
 *                        - function add_menu_header added.
 *                        - general tidying of code.
 */

function add_headers(){
   var scriptsTable = document.getElementsByTagName("table")[0];
   var headerRow = scriptsTable.getElementsByTagName("tr")[0];
   var info = headerRow.getElementsByTagName("th")[0];
   info.appendChild(document.createTextNode(" "));
   add_menu_header(info, "Name", sort_by_name);
   info = headerRow.getElementsByTagName("th")[1];
   info.appendChild(document.createTextNode(" "));
   add_menu_header(info, "Installs", sort_by_installs);
   info.appendChild(document.createTextNode(" "));
   add_menu_header(info, "Comments", sort_by_comments);
   info.appendChild(document.createTextNode(" "));
   add_menu_header(info, "Date", sort_by_date);
   info.appendChild(document.createTextNode(" "));
   add_menu_header(info, "Install Rate", sort_by_rate);
   info.appendChild(document.createTextNode(" "));
   add_menu_header(info, "Created", sort_by_create);
}

function add_rate_header(){
   var scriptsTable = document.getElementsByTagName("table")[0];
   var headerRow = scriptsTable.getElementsByTagName("tr")[0];
   var info = headerRow.getElementsByTagName("th")[3];
   info.appendChild(document.createTextNode("  "));
   add_menu_header(info, "(Rate)", sort_by_rate);
}

function add_rates(){
   var scriptsTable = document.getElementsByTagName("table")[0];
   for (i = scriptsTable.getElementsByTagName("tr").length - 1; i > 0; i--) {
      var scriptRows = scriptsTable.getElementsByTagName("tr")[i];
      var info = scriptRows.getElementsByTagName("td")[4];
      var installs = info.wrappedJSObject.firstChild.data;
      installs = parseInt(installs.split(" ")[0].replace(",", ""));
      var parts = scriptRows.getElementsByTagName("abbr")[0].getAttribute("title").match(/\d+/g);
      var days = Math.ceil(new Date(new Date() - new Date(parts[0], parts[1]-1, parts[2], parts[3], parts[4], parts[5], 0).getTime()) / (24*60*60*1000));
      var rate100 = parseInt((parseInt(installs)/days) * 100);
      var rate100p = document.createElement("p");
      rate100p.appendChild(document.createTextNode(rate100 + " installs/day * 100"));
      info.appendChild(rate100p);
      rate100p.setAttribute('style','display:none !important;');
      var ratep = document.createElement("p");
      ratep.appendChild(document.createTextNode("(~" + (rate100/100) + "/day)"));
      info.appendChild(ratep);
   }
}

function add_menu_header (info, text, fctn) {
  var link = document.createElement("a");
  link.appendChild(document.createTextNode(text));
  link.setAttribute("href", "#");
  link.addEventListener('click', fctn, true);
  info.appendChild(link);
}

function sort_by_name(){sort_scripts(0);}
function sort_by_comments(){sort_scripts(1);}
function sort_by_installs(){sort_scripts(2);}
function sort_by_date(){sort_scripts(3);}
function sort_by_rate(){sort_scripts(4);}
function sort_by_create(){sort_scripts(5);}

function sort_scripts(sort_field){
   // there's only one table on the page, so...
   var scriptsTable = document.getElementsByTagName("table")[0];
   var rows = scriptsTable.getElementsByTagName("tr");
   var headerRow = rows[0]; // we don't want to sort the headers.
   var scripts = new Array();
   var parent=headerRow.parentNode; // for removing & adding child nodes
   while (rows.length > 1){
      script = rows[1];
      script = script.parentNode.removeChild(script);
      if (sort_field == 1 || sort_field == 2 || sort_field == 4){
         //metric = parseInt(script.getElementsByTagName("p")[sort_field].wrappedJSObject.firstChild.data.split(" ")[0].replace(",", ""));
         metric = parseInt(script.getElementsByTagName("p")[1].wrappedJSObject.firstChild.data.split(" ")[0].replace(",", ""));
      } else if (sort_field == 3){
        parts = script.getElementsByTagName("abbr")[0].getAttribute("title").replace(/[T:Z]/g, "-").split("-");
        metric = new Date(parts[0], parts[1], parts[2], parts[3], parts[4], parts[5], 0).getTime();
      } else if (sort_field == 0){
        metric = script.getElementsByTagName("a")[1].wrappedJSObject.firstChild.data.toLowerCase();
      } else if (sort_field == 5){
        metric = parseInt(script.getElementsByTagName("p")[6].innerHTML);
      }
      scripts.push([metric, script.wrappedJSObject]);
   }
   if (sort_field != 0){
      scripts.sort(function(a, b) { return b[0]-a[0];}); // descending sort
   } else {
      scripts.sort();
   }
   for (var i = 0; i < scripts.length; i++){
      script = scripts[i];
      parent.appendChild(script[1]);
   }
}

function XHR () {
  author = document.location.href.slice(0, document.location.href.lastIndexOf("/")) + "/scripts.xml";
  scriptsTable = document.getElementsByTagName("table")[0];
  rateSpace = document.evaluate('//p[@class="subtitle"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).appendChild(document.createElement('span'));
  total_rate = 0;
  GM_xmlhttpRequest({
    method: 'get',
    headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Content-type': 'application/x-www-form-urlencoded'
    },
    url: author,
    onload: function(result) {
      xmlString = result.responseText;
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(xmlString, "application/xml");
      var scripts = xmlDoc.getElementsByTagName('script');
      for (i = scripts.length - 1; i >= 0; i--) {
        installs = scripts[i].getElementsByTagName('views')[0].textContent;
        installs = (installs > 0) ? installs : 0;
        date = scripts[i].getElementsByTagName('created-at')[0].textContent.match(/\d+/g);
        days = Math.ceil(new Date(new Date() - new Date(date[0], date[1]-1, date[2], date[3], date[4], date[5], 0).getTime()) / (24*60*60*1000));
        rate100 = parseInt((parseInt(installs)/days) * 100);
        for (j = scripts.length - 1; j >= 0; j--) {
          if (scriptsTable.getElementsByTagName("tr")[j+1]) {
            a = scriptsTable.getElementsByTagName("tr")[j+1].getElementsByTagName("td")[1].getElementsByTagName("a")[0].href;
            if (parseInt(scripts[i].getElementsByTagName('id')[0].textContent) == (a.substring(a.lastIndexOf('/')+1, a.length))) {
              info = scriptsTable.getElementsByTagName("tr")[j+1].getElementsByTagName("td")[4];
              rate100p = document.createElement("p");
              rate100p.appendChild(document.createTextNode(rate100 + " installs/day * 100"));
              info.appendChild(rate100p);
              rate100p.setAttribute('style','display:none !important;');
              var ratep = document.createElement("p");
              ratep.appendChild(document.createTextNode("(" + (rate100/100) + "/day)"));
              info.appendChild(ratep);
              total_rate += rate100/100;
              if (total_rate > (24*60))
                rateSpace.innerHTML = " / " + parseInt(total_rate*100)/100 + " installs/day (approx every " + parseInt(24*60*60 / total_rate) +" seconds)";
              else if (total_rate > 24)
                rateSpace.innerHTML = " / " + parseInt(total_rate*100)/100 + " installs/day (approx every " + parseInt(24*60 / total_rate) +" minutes)";
              else
                rateSpace.innerHTML = " / " + parseInt(total_rate*100)/100 + " installs/day";
              thingy = document.createElement("p")
              thingy.appendChild(document.createTextNode(days))
              thingy.setAttribute("style","display: none;");
              info.appendChild(thingy);
            }
          }
        }
      }
    }
  });
}

if (document.location.href.match(/\/users\/(\d+)\/scripts/))
  XHR();
else
  add_rates();
add_rate_header();
//sort_scripts(2);
