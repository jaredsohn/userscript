// ==UserScript==
// @name           Userscripts Top Scripts
// @namespace      http://bradmont.net
// @description    Adds a "Most Popular Scripts" box to userscripts.org
// @include        http://userscripts.org/
// @include        http://userscripts.org/#
// @include        http://userscripts.org/?page=*
// ==/UserScript==

function updateData(){
   d = new Date();
   today = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDay();
   GM_xmlhttpRequest({
       method: 'GET',
       url: 'http://brad.bradmont.net/nums.txt',
       headers: {
           'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'
           //'Accept': 'application/atom+xml,application/xml,text/xml',
       },
       onload: processData
   });
}

function processData(responseDetails){
   if (responseDetails.readyState == 4){
      var datasets = ["TOP10", "YESTERDAY", "WEEK"];
      var data = responseDetails.responseText.split("],\n]").join("]\n]");
      for (var i = 0; i < datasets.length; i++){
         var field = datasets[i];
         var top = data.indexOf("==" + field + "==") + 4 + field.length;
         var bottom = data.indexOf("==/" + field + "==");
         GM_setValue(field, data.substring(top, bottom));
      }
      d = new Date();
      GM_setValue("last_updated", d.getFullYear() + "-" + d.getMonth() + "-" + d.getDay());
      setup();
   } else {
      return;
   }
}

function start(){
   d = new Date();
   if (GM_getValue("last_updated") != d.getFullYear() + "-" + d.getMonth() + "-" + d.getDay()){
      updateData();
   } else {
      setup();
   }
}

function setup(a1){
   rightDiv = document.getElementById("right");
   sibling = rightDiv.getElementsByTagName("h5")[1];
   var tb;
   if (document.getElementById("topBase")) {
    tb=document.getElementById("topBase");
   } else {
    a1=true;
    tb = document.createElement("span");
    tb.id="topBase";
    sibling.parentNode.insertBefore(tb, sibling)
   }
   tb.innerHTML="<span id='topBaseSibling'></span>";
   sibling=tb.firstChild;

   heading = document.createElement("h5");
   heading.appendChild(document.createTextNode("Top Scripts"));
   sibling.parentNode.insertBefore(heading, sibling);

   sibling.parentNode.insertBefore(make_links_row(), sibling);

   table = document.createElement("table");
   sibling.parentNode.insertBefore(table, sibling);
   table.appendChild(document.createElement("tbody"));
   table=table.firstChild;
   table.setAttribute("id", "top_n_table");
   table.appendChild(make_header_row());
   if (a1) {
    data = GM_getValue("YESTERDAY", "[]");
    try { data = eval(data); } catch (ex) { alert(ex.message); }
    set_data(data);
   } else {
    //alert("update");
   }
}

function make_links_row(){
   row = document.createElement("div");

   a = document.createElement("a");
   row.appendChild(a);
   a.setAttribute("href", "javascript:");
   a.attachEvent('onclick', show_weekly_downloads, true);
   a.appendChild(document.createTextNode("Week"));

   row.appendChild(document.createTextNode(" "));
   a = document.createElement("a");
   row.appendChild(a);
   a.setAttribute("href", "javascript:");
   a.attachEvent('onclick', show_yesterday_downloads, true);
   a.appendChild(document.createTextNode("Yesterday"));

   row.appendChild(document.createTextNode(" "));
   a = document.createElement("a");
   a.setAttribute("href", "javascript:");
   row.appendChild(a);
   a.attachEvent('onclick', show_total_downloads, true);
   a.appendChild(document.createTextNode("All Time"));

   row.appendChild(document.createElement("br"));
   return row;
}

function make_header_row(){
   row = document.createElement("tr");

   cell = document.createElement("th");
   row.appendChild(cell);
   cell.setAttribute("class", "la");
   cell.appendChild(document.createTextNode("Name"));

   cell = document.createElement("th");
   row.appendChild(cell);
   cell.setAttribute("class", "la");
   cell.appendChild(document.createTextNode("Inst."));
   return row;
}

function more_results(e){
   e=e?e:event; e.cancelBubble=true; // preventDefault // preventDefault
   count = GM_getValue("num_results", 10);
   if (count < 50){
      GM_setValue("num_results", count + 10);
   }
   data = GM_getValue("YESTERDAY", "[]");
   set_data(eval(data));
}

function less_results(e){
   e=e?e:event; e.cancelBubble=true; // preventDefault // preventDefault
   count = GM_getValue("num_results", 10);
   if (count >= 10){
      GM_setValue("num_results", count - 10);
   }
   data = GM_getValue("YESTERDAY", "[]");
   set_data(eval(data));
}

function show_total_downloads(e) {
   e=e?e:event; e.cancelBubble=true; // preventDefault // preventDefault
   data = GM_getValue("TOP10", "[]");
   set_data(eval(data));
}

function show_weekly_downloads(e) {
   e=e?e:event; e.cancelBubble=true; // preventDefault // preventDefault
   data = GM_getValue("WEEK", "[]");
   set_data(eval(data));
}

function show_yesterday_downloads(e) {
   e=e?e:event; e.cancelBubble=true; // preventDefault // preventDefault
   data = GM_getValue("YESTERDAY", "[]");
   set_data(eval(data));
}

function set_data(source) {
   clear_top_table();
   table = document.getElementById("top_n_table");
   size = GM_getValue("num_results", 10);
   if (size > source.length){
      size = source.length;
   }
   for (i=0; i < size; i++){
      row = document.createElement("tr");
      table.appendChild(row);
      cell = document.createElement("td");
      row.appendChild(cell);
      a = document.createElement("a");
      cell.appendChild(a)
      a.style.cssText=("font-size: 8pt;");
      a.href=("/scripts/show/" + source[i][0]);
      a.appendChild(document.createTextNode(source[i][1]));

      cell = document.createElement("td");
      row.appendChild(cell);
      cell.className=("inv lp");
      p = document.createElement("p");
      cell.appendChild(p)
      p.appendChild(document.createTextNode(source[i][2]));
   }
      row = document.createElement("tr");
      table.appendChild(row);
      cell = document.createElement("td");
      row.appendChild(cell);
      cell = document.createElement("td");
      row.appendChild(cell);
      cell.setAttribute("class", "inv lp");

      a = document.createElement("a");
      cell.appendChild(a)
      a.style.cssText=("font-size: 8pt;");
      a.href=("javascript:");
      a.appendChild(document.createTextNode("+"));
      a.attachEvent("onclick", more_results, true);
      cell.appendChild(document.createTextNode(" "));

      a = document.createElement("a");
      cell.appendChild(a)
      a.style.cssText=("font-size: 8pt;");
      a.href=("javascript:");
      a.appendChild(document.createTextNode("-"));
      a.attachEvent("onclick", less_results, true);
}

function clear_top_table() {
    setup(false)
}

start();