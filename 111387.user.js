// ==UserScript==
// @name           My bonus [GW]
// @namespace      гном убийца
// @description    Отображение бонусов на главной странице персонажа. (v 1.1.06.10.2009)
// @include        http://www.ganjawars.ru/me/
// ==/UserScript==

(function() {
	
if((navigator.appName == "Opera") || (navigator.appName == "opera")){
	var n_child_1 = 0;
    var n_child_2 = 12;
}
else{
	var n_child_1 = 1;
	var n_child_2 = 23;
}

//----------------------------------------------------------------------------------------------------------------------

var request = new XMLHttpRequest();
var content = document.getElementsByTagName('table')[6];
var now_url = ''+content.getElementsByTagName('a')[0];
var sind_url = 'http://www.ganjawars.ru/syndicate.php';
var url_player = document.getElementsByTagName('a')[2];
var id_player = /^http:\/\/www\.ganjawars\.ru\/info\.php\?id=(\d+)/.exec(url_player);
    id_player = id_player[1];
var url_page = 'http://www.ganjawars.ru/info.php?id='+id_player;
var answerPage = new String();
  
//----------------------------------------------------------------------------------------------------------------------

function REQ(url, method, param, async, onsuccess, onfailure) {
       request.open(method, url, async);
       request.send(param);
       if (request.readyState == 4 && request.status == 200 && typeof onsuccess != 'undefined') onsuccess(request);
       else if (request.readyState == 4 && request.status != 200 && typeof onfailure != 'undefined') onfailure(request);
}

//----------------------------------------------------------------------------------------------------------------------

REQ(url_page, 'GET', null, false, function (req) {answerPage = req.responseText;});

//----------------------------------------------------------------------------------------------------------------------

var span = document.createElement('span');
    span.innerHTML = answerPage;
    bonus_txt = span.getElementsByTagName('table')[10].childNodes[n_child_1].childNodes[n_child_2];
    bonus_txt = bonus_txt.getElementsByTagName('table')[1].innerHTML;
    bonus_txt = '<table align=center>' + bonus_txt +' </table>';
//alert(bonus_txt);
              
//----------------------------------------------------------------------------------------------------------------------
              
    if (now_url.lastIndexOf(sind_url) != -1) {
    	 display_xy = content.getElementsByTagName('a')[1];
    }else{
    	 display_xy = content.getElementsByTagName('a')[0];
    }
    
    var tooltip = document.createElement('div');
    tooltip.innerHTML = bonus_txt;
    tooltip.setAttribute("id","tooltip");
    tooltip.setAttribute("style","position: absolute; left: 0px; top: 0px; z-index: 3000; width: 300px; background-color: #f0fff0; border: solid 1px #000000;");
    tooltip.style.visibility='hidden';
    display_xy.parentNode.insertBefore(tooltip, display_xy.nextSibling);
    
    var script_1 = document.createElement('script');
        script_1.innerHTML = 'function start(e){tooltip = document.getElementById("tooltip"); tooltip.style.left = e.clientX - 150; tooltip.style.top = e.clientY + 20; tooltip.style.visibility="visible";} function stop(){tooltip = document.getElementById("tooltip"); tooltip.style.visibility="hidden";}';
        display_xy.parentNode.insertBefore(script_1, display_xy);
    
    display_xy.setAttribute("onmousemove","start(event)");
    display_xy.setAttribute("onmouseout","stop()");

})();