// ==UserScript==
// @name           NPC Locator [GW]
// @namespace      гном убийца
// @description    Обнаруживает НПС, и предоставляет быстрый достпуп к ним.(v 1.1.21.08.09)
// @include        http://www.ganjawars.ru/me/
// ==/UserScript==

(function() {

var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
var request = new XMLHttpRequest();

var transport = new Array("id=motobike", "id=celica", "id=kamaz", "id=lexus", "id=slr", "id=apache", "id=mi8", "id=ny_sanki", "id=6y_2106", "id=6y_mazda", "id=6y_bmw", "id=6y_audi");
var time_transport = new Array(110, 80, 120, 90, 20, 10, 10, 80, 80, 74, 70, 75);
var time = 180;

var a = root.document.getElementsByTagName('a');
for (i=0; i < a.length; i++){
	tmp = ""+a[i]; 
	if(a[i].textContent == 'Друзья онлайн'){
		var friend_button = a[i];
	}
	if(tmp.lastIndexOf("http://www.ganjawars.ru/map.php?sx=") != -1){
		url_sector = tmp;
		name_sector = a[i].textContent;
		sector_do = /^http:\/\/www\.ganjawars\.ru\/map\.php\?sx=(\d+)&sy=(\d+)$/.exec(url_sector);
		x = parseInt(sector_do[1]);
		y = parseInt(sector_do[2]);
	}
	for(j=0; j < transport.length; j++){
		if(tmp.lastIndexOf(transport[j]) != -1){ time = time_transport[j];}
	}
}
var friend_div = root.document.getElementById('friendsbody');
var answerPage = new String();

var image_sinds = "http://images.ganjawars.ru/img/synds/586";
var url_sinds = "http://www.ganjawars.ru/syndicate.php?id=586"; 
var url_npcs = "http://www.ganjawars.ru/npc.php?id=";
var resultat ="";

var z_island = new Array(1, 4, 5, 7, 9, 11); 
var z_island_name = new Array("Smokie Canablez", "Kenny Buzz", "Yoshinori Watanabe", "Rony James", "Tommy Morales", "Tony Brandino");
var z_island_number = new Array(7, 7, 2, 5, 3, 6);

var g_island = new Array(2, 3, 6, 8, 10, 12); 
var g_island_name = new Array("Hempy Trown", "Rusty Reefer", "Donnie Ray", "Ricardo Gonzalez", "Inamoto Kanushi", "John Moretti");
var g_island_number = new Array(7, 7, 5, 3, 2, 6);

var p_island = new Array(16, 17, 18, 19, 20); 
var p_island_name = new Array("Takeshi Yamagata", "Michael Doyle", "Alfonso Morales", "Roy Fatico", "Giovanni Greco");
var p_island_number = new Array(2, 5, 3, 7, 6);

//----------------------------------------------------------------------------------------------------------------------
function REQ(url, method, param, async, onsuccess, onfailure) {
       request.open(method, url, async);
       request.send(param);
       if (request.readyState == 4 && request.status == 200 && typeof onsuccess != 'undefined') onsuccess(request);
              else if (request.readyState == 4 && request.status != 200 && typeof onfailure != 'undefined') onfailure(request);
}

//----------------------------------------------------------------------------------------------------------------------

var npc_button = document.createElement('span');
    npc_button.innerHTML = '<b style="cursor: pointer;" id=npc_button><u>NPC</u> / </b>';
    friend_button.parentNode.insertBefore(npc_button, friend_button);
    
    
var button = root.document.getElementById('npc_button');
    button.onclick = function(){
    	if(name_sector.lastIndexOf("[Z]") != -1){
    	  resultat = "";
    	  Reqest_slow(0, 6, z_island, z_island_name, z_island_number, resultat);
    	  friend_div.innerHTML = "<center><img src=http://f.ganjafile.ru/1/36701_loading.gif></center>";
    	}
    	if(name_sector.lastIndexOf("[G]") != -1){
    	  resultat = "";
    	  Reqest_slow(0, 6, g_island, g_island_name, g_island_number, resultat);
    	  friend_div.innerHTML = "<center><img src=http://f.ganjafile.ru/1/36701_loading.gif></center>";
    	}
    	if(name_sector.lastIndexOf("[P]") != -1){
    	  resultat = "";
    	  Reqest_slow(0, 5, p_island, p_island_name, p_island_number, resultat);
    	  friend_div.innerHTML = "<center><img src=http://f.ganjafile.ru/1/36701_loading.gif></center>";
    	}
    }
    
    
function Reqest_slow(i, len, end, name, number, resultat){
	
	url_npc_page = url_npcs + end[i];//"http://localhost/gw_scripts/npc.php";//
	REQ(url_npc_page, 'GET', null, false, function (req) {answerPage = req.responseText;});
	
	var span = document.createElement('span');
        span.innerHTML = answerPage;
        
    var aa = span.getElementsByTagName('a');
    var karma = span.getElementsByTagName('b')[13].textContent;
    
    for (j=0; j < aa.length; j++){
	  tmp = ""+aa[j];
	  if(tmp.lastIndexOf("http://www.ganjawars.ru/map.php?sx=") != -1){
	    	url_sector_npc = tmp;
	    	name_sector_npc = aa[j].textContent;
	    	sector_do = /^http:\/\/www\.ganjawars\.ru\/map\.php\?sx=(\d+)&sy=(\d+)$/.exec(url_sector_npc);
	    	sector_go = "http://www.ganjawars.ru/map.move.php?gps=1&sxy=" + sector_do[1] + 'x' + sector_do[2];
	    	x_new = parseInt(sector_do[1]); y_new = parseInt(sector_do[2]);
	    	go_time = (Math.abs(x - x_new) * time) +  (Math.abs(y - y_new) * time);
	    	min = parseInt(go_time / 60);
	    	sec = parseInt(go_time % 60);
	    	if(min < 10){min = "0" + min;}
	    	if(sec < 10){sec = "0" + sec;}
	  }
    }
    resultat = resultat + '<a href='+url_sinds+number[i]+' target=blank><img src='+image_sinds+number[i]+'.gif title="#586'+number[i]+'" width="20" border="0" height="14"></a><a href='+url_npc_page+' target=blank>'+name[i]+'</a> | <b>['+karma+']</b> | <a href='+url_sector_npc+' target=blank>'+name_sector_npc+'</a> | <a href='+sector_go+' target=blank title="Время в пути: '+min+':'+sec+'"><b>[идти]</b></a><br>';
	
    if (i < len-1){
    	 i++
         setTimeout(function(){Reqest_slow(i, len, end, name, number, resultat)}, 2000);
    }else{
       	 friend_div.innerHTML = resultat;
    }
}
})();