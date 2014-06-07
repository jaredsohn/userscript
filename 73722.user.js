// ==UserScript==
// @author         Jinnie
// @Development      Dream1 
// @name           Travian User Activity from travian-utils.com + Multi Language
// @namespace      http://userscripts.org/users/103897
// @description    Shows user history info directly imported from travian-utils.com
// @include        http://*.travian.*/spieler.php?uid=*
// @version        2.0.4
// ==/UserScript==

// Get user id
var url = document.location.href;
var uid = url.match(/\d+$/);

// Get server id
var title=document.title;
var srv=title.substring(8);

// Call trav-utils
GM_xmlhttpRequest({
  method: "GET",
  url: "http://travian-utils.com/?s=" + srv + "&idu=" + uid,
  headers: {
    "User-Agent": navigator.userAgent,
    "Accept": "text/xml"
  },
  onload: function(response) {
    // TODO: find why XML parse fails and fix. reg-exp parsing is not the best solution.
    // Inject responseXML into existing Object if not present
//    if (!response.responseXML)
//      response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");

    insert(response.responseText);
  }
});

// Insert the external data
function insert(doc){
  var line = doc.split('\n').join(" ");
  var line = line.split('\r').join("");
  var table = line.match(/<table class=\"tsu_list brd_a x09 sm1\">.*\/table>/)[0];
  table = table.replace(/<\/a>/g, "</span>");
  table = table.replace(/<a[^>]*>/g, "<span class=\"green b\">");
  var content = document.getElementById("mid");
  var tabDiv = document.createElement('div');
  var title = "<b>☠ "+titlestring[0]+" <a href=\"http://travian-utils.com\">travian-utils.com</a> ☠</b><br/><br/>";
  var footer = "<br>"+titlestring[1]+" <a href=\"http://travian-utils.com/?s=" + srv + "&idu="
                                                   + uid + "\">TravUtils</a>";
  tabDiv.innerHTML = title + table + footer;
  tabDiv.style.paddingLeft = "20px";
  tabDiv.style.clear = "both";
  content.parentNode.insertBefore(tabDiv, content.nextSibling);
}

mlang="com";
checkLang();

switch (mlang) {
        case "com":default:
                titlestring = ["User data from", "More info of this user at"];
                break;
        case "ae":
        case "sa":
        case "sy":
        case "eg":
                titlestring = ["بيانات اللاعب من موقع", "للمزيد من المعلومات عن هذا اللاعب"];
                break;

case "hk": // by dank68
case "tw":
titlestring = ["玩家資料來自", "更多關於這個玩家的資料"];
break;

case "jp": // by nn-
titlestring = ["データ取得先：", "TSUのユーザページ"];
break;
  
case "de": // by knabro
titlestring = ["Spielerdaten von", "Mehr Infos über diesen Spieler auf"];
break;
              
}
// Force some css styling
GM_addStyle(<><![CDATA[
TABLE.tsu_list {
        border-collapse: collapse;
        border-spacing: 0px;
        border: 1px solid #eee;
        width: 710px;
}
TABLE.tsu_list TD{
        border: 1px solid #e0e0e0;
        text-align: right;
}
TABLE.tsu_list TD.l{
        text-align: left;
}
TABLE.tsu_list TD.c{
        text-align: center;
}
TABLE.tsu_list TH{
        background-color:#F0F0F0;
        padding-left:1em;
        padding-right:1em;
}
TABLE.tsu_list TR.tr1{
        background-color:#F8F8F8;
}
.green{
        color: #55cc55;
}
.red{
        color: red;
}
.lred{
        color: lightCoral;
}
.grey{
        color: #c0c0c0;
}
.lgreen{
        color:lightgreen;
}
.blue{
        color:blue;
}
.lblue{
        color:lightblue;
}
.main-b{
        color:#58c4ff;
}
.h2{
        font-weight:bold;
}

]]></>.toString());


// Right-align exception for Arabic servers
if(url.match(/\.ae\//) || url.match(/\.com.sa\//) || url.match(/\.com.sy\//) || url.match(/\.com.eg\//)){
   GM_addStyle("TABLE.tsu_list TD.l{text-align: right;}");
}

function checkLang()
{
  var host = window.location.hostname;
  hosts = host.split(".");
  mlang = hosts[hosts.length-1];
}
