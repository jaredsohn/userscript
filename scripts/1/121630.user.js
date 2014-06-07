// ==UserScript==
// @name           Travian T4 MarketPlace and Rally point auto-helper
// @namespace      Travian T4 MarketPlace and Rally point auto-helper
// @description    Travian T4 MarketPlace and Rally point auto-helper
// @include        *.travian.*/*
// ==/UserScript==

function ID(id) { return document.getElementById(id) };
function Xpath(path) { return document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); };

function set_xy(){
 f = document.getElementById("falu_select");
 id = f.options(f.selectedIndex).value;
 xy = id2xy(id);
 document.forms[0].elements["x"].value = xy[0];
 document.forms[0].elements["y"].value = xy[1];

}

function id2xy(vid) {
	var arrXY = new Array;
	var ivid = parseInt(vid);
	arrXY[0] = ((ivid-1) % 801) - 400;
	arrXY[1] = 400 - Math.floor((ivid-1) / 801);
	return arrXY;
}

function xy2id(x, y) {
	return (1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400)));
}

 

var node = document.getElementsByName('y')[0];
if(node){

    falu_sel = "<select id='falu_select'>";

    

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", location.href, false);
    xhttp.send("");
    respText = xhttp.responseText;

    var xBody = document.createElement("xbody");
    xBody.setAttribute('id', 'xbody');
    xBody.setAttribute('style', 'display: none;');
    xBody.innerHTML = respText;
    document.body.parentNode.appendChild(xBody);

    var Length = ID('villageList').getElementsByTagName('div')[1].getElementsByTagName('ul')[0].getElementsByTagName('li').length;

    for (c = 0; c < Length; c++) {
        var Xp = Xpath("/html/xbody/div[@id='wrapper']/div[@class='bodyWrapper']/div[@id='mid']/div[@id='side_info']/div[@id='villageList']/div[@class='list']/ul/li[" + (c + 1) + "]/a").snapshotItem(0).getAttribute("title");

	
        var div = document.createElement("div");
        div.innerHTML = Xp;
        var text = div.textContent || div.innerText || "";
   
        falu_nev = text.substring(0,text.indexOf("("));
        xkord = text.substring(text.indexOf("(")+1,text.indexOf("|"));
        ykord = text.substring(text.indexOf("|")+1, text.indexOf(")"));

	id = xy2id(xkord,ykord);
	falu_sel+= '<option value='+id+'>'+falu_nev+'</option>';


   }
   falu_sel+= "</select>";
  

   node.parentNode.parentNode.innerHTML += falu_sel;

 document.getElementById('falu_select').addEventListener('change', function() { set_xy();}, false);


}