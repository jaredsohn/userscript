// ==UserScript==
// @name           TorrentLeech Snatchlist S:L snippet
// @namespace      DuLLSoN
// @description    Adds Seeder:Leecher to the Snatchlist table
// @include        http://www.torrentleech.org/snatchall.php*
// ==/UserScript==

var tabs=document.getElementsByTagName("table");
var yeye=tabs[7].rows[0].insertCell(7);
yeye.innerHTML="<center><b> S:L </b></center>";


function getsl(urly,num){
GM_xmlhttpRequest({
  method: "GET",
  url: urly,
  onload: function(response) {

var myregexp = /(\d{1,4})\sseeder\(s\),\s(\d{1,4})\sleecher\(s\)/;
var match = myregexp.exec(response.responseText);
var yeye=tabs[7].rows[num].insertCell(7);
yeye.innerHTML="<center>"+match[1]+':'+match[2]+"</center>";
  }
});
};


var tabs=document.getElementsByTagName("table");
var myregexp = /href="(.+)"/;
for(i=1;i<tabs[7].rows.length;i++){
teks=tabs[7].rows[i].cells[0].innerHTML;
getsl("http://www.torrentleech.org/"+myregexp.exec(teks)[1],i);
};
