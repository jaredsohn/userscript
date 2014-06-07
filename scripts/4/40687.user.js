
// Travian-utils Data Sender
// version 0.1 Alpha!
// 2009-01-18
// Copyright (c) 2009, Gyurcsany
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Travian-utols Data Sender", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Travian-Utils Data Sender
// @namespace     http://travian-utils.marasnici.net/
// @description   script to automate save reports
// @include       http://s*.travian.sk/berichte.php?id=*
// ==/UserScript==

String.prototype.stripHTML = function()
{
  var matchTag = /<(?:.|\s)*?>/g;
  return this.replace(matchTag, "");
};

function isset(varname)  {
  if(typeof( window[ varname ] ) != "undefined") return true;
  else return false;
}

function getAlly(html, key) {

    var ally_start = html.substr(html.indexOf("<td>Aliancia:</td>")+18);
    var ally = ally_start.substr(0, ally_start.indexOf("</td>")+5);
    
    GM_setValue(key, ally.stripHTML());
  
  
  if(key == "att") {
    getDef();
  }
  else {
    sendData();
  }
  
  //return ally.stripHTML();
}

function getDef() {
  if(def != 0) {
    GM_xmlhttpRequest({
      method:"GET",
      url:"http://"+location.hostname+"/spieler.php?uid="+def,
      headers:{
        "User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
        "Accept":"text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5",
        "Accept-Encoding":"gzip,deflate",
        "Content-Type":"application/x-www-form-urlencoded"
      },
      onload:function(response) {
        getAlly(
          response.responseText,
          "def"
        );
      }
    });
  }
  else {
    GM_setValue("def", "-");
    sendData();
  }
}

var rows = document.getElementsByTagName('td');

var att = 0;
var def = 0;

for(var i=0; i<rows.length; i++) {
  if(rows[i].innerHTML == "Útočník") {
    att_data = rows[i+1].innerHTML;
    att = att_data.substr(att_data.indexOf('?')+5, att_data.indexOf('>') - att_data.indexOf('?')-6);
  }
  else if(rows[i].innerHTML == "Obranca") {
    def_data = rows[i+1].innerHTML;
    if(!def) def = def_data.substr(def_data.indexOf('?')+5, def_data.indexOf('>') - def_data.indexOf('?')-6);
  }
}

if(att != 0) {
  GM_xmlhttpRequest({
    method:"GET",
    url:"http://"+location.hostname+"/spieler.php?uid="+att,
    headers:{
      "User-Agent":navigator.userAgent,            // Recommend using navigator.userAgent when possible
      "Accept":"text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5",
      "Accept-Encoding":"gzip,deflate",
      "Content-Type":"application/x-www-form-urlencoded"
    },
    onload:function(response) {
      getAlly(
        response.responseText,
        "att"
      );
    }
  });
} else {
  GM_setValue("off", "-");
  getDef();
}



function sendData() {
  GM_log(GM_getValue("att") + " _ " + GM_getValue("def"));
  
  var data = document.getElementsByTagName('html'); 
  
  var id = location.search.substr(1);
  var host = location.hostname;
  
  data = encodeURIComponent("<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01//EN\"\n \"http://www.w3.org/TR/html4/strict.dtd\"><html><html>"+data[0].innerHTML+"</html>");
  data = data.replace("&amp;", "%26");
  
  
  GM_xmlhttpRequest({
    method:"POST",
    url:"http://travian-utils.marasnici.net/travilog2.php",
    headers:{
      "User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
      "Accept":"text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5",
      "Accept-Encoding":"gzip,deflate",
      "Content-Type":"application/x-www-form-urlencoded"
    },
    data:"data="+data+"&"+id+"&server="+host+"&att_ally="+encodeURIComponent(GM_getValue("att"))+"&def_ally="+encodeURIComponent(GM_getValue("def"))
    //onload:function(response) {
      //alert([
        //response.status,
        //response.statusText,
        //response.readyState,
        //response.responseHeaders,
        //response.responseText,
        //response.finalUrl
      //].join("\n"));
    //}
  });
}
