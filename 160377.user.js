// ==UserScript==
// @name           Sind battle timer [GW]
// @namespace      гном убийца
// @description    Таймер времени, до старта синдбоев, с подсветкой, и подсчетом в реальном времени. (v.2.4.25.04.11.1635)
// @include        http://www.ganjawars.ru/*
// @exclude        http://quest.ganjawars.ru/*
// @exclude        http://chat.ganjawars.ru/*
// @exclude        http://www.ganjawars.ru/map.move.php*
// @exclude        http://www.ganjawars.ru/login.php
// @exclude        http://www.ganjawars.ru/index.php
// @exclude        http://www.ganjawars.ru/b0/*
// ==/UserScript==

(function(){
	
  var time_alert = "04:00"; // Играть звук, при определнном времени до боя.
  var sound_id = 14; // Номер звука из списка, 0 - ненадо звука.
  var startSound = 0;
  
  var request = new XMLHttpRequest();
  var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
  var gap = check_desing();
  
  var news = gap > 0 ? document.getElementsByTagName('a')[2]: document.getElementsByTagName('a')[3];
  var info = 'http://www.ganjawars.ru/info.php?id=';
  var sind = 'http://www.ganjawars.ru/syndicate.php?id=';
  var attack = 'http://www.ganjawars.ru/wargroup.php?war=attacks';
  var answer_page = new String();
  var key = 0;
  var key_timer = 0;
  var colors = new Array("red","blue","orange","#a6a6a6","#996633","#3399cc","#ec00fd","#00cccc","#999933","#9966ff");
  var cookie_time ="";
  var menu_txt = document.getElementsByTagName('table')[3 - gap].innerHTML;


  var key_update = 1; visible_time = 0;
  
//----------------------------------------------------------------------------------------------------------------------------  
   function REQ(url, method, param, async, onsuccess, onfailure) {
       request.open(method, url, async);
       request.send(param);
       if (request.readyState == 4 && request.status == 200 && typeof onsuccess != 'undefined') onsuccess(request);
       else if (request.readyState == 4 && request.status != 200 && typeof onfailure != 'undefined') onfailure(request);
   }
//----------------------------------------------------------------------------------------------------------------------------
  
var all_time = document.createElement('span');
    all_time.setAttribute("id","sind_battle_timer_gw");
    all_time.innerHTML = "<a href=http://www.ganjawars.ru/wargroup.php?war=attacks target=blank>Нападения</a>";
      
    news.parentNode.insertBefore(all_time, news.nextSibling);
    news.parentNode.removeChild(news);
    
    
if(menu_txt.indexOf("Ваш синдикат ") != -1){
  main();
}

function main(){
//------------------------------------------------------------ Создание массивов, получение номера синда, и текущего времени.
  var times = new Array();
  var today = new Date();
  var main_seconds = parseInt(today.getTime()/1000,10); 
  
   cookie_txt = document.cookie;
   cookie_txt = cookie_txt.split(";");
 
   for(i=0; i < cookie_txt.length; i++){
 	 if (cookie_txt[i].lastIndexOf("nsind") != -1){
 		 n_sind = cookie_txt[i].split("=");
 		 n_sind = parseInt(n_sind[1],10);
 		 key = 1;
 	 }
 	 if (cookie_txt[i].lastIndexOf("uid") != -1){
 	 	 id = cookie_txt[i].split("=");
 		 id = parseInt(id[1],10);
 	 }
 	  if (cookie_txt[i].lastIndexOf("timer") != -1){
 		 key_timer = 1;
 		 time_req = cookie_txt[i].split("=");
 		 time_req = parseInt(time_req[1],10);
 	 }
   }
//------------------------------------------------------------ Поиск номера синда.
  if(key == 0){
       url = info + id;
       n_sind = 0;
   	   REQ(url, 'GET', null, false, function (req) {answer_page = req.responseText;});
       var span = document.createElement('span');
           span.innerHTML = answer_page;
           li = span.getElementsByTagName('li')[0];
           sind_url = li.getElementsByTagName('a')[0];
           n_sind = /^http:\/\/www\.ganjawars\.ru\/syndicate\.php\?id=(\d+)/.exec(sind_url);
           n_sind = parseInt(n_sind[1]);
           document.cookie="nsind="+n_sind+";path=/;";
  }
//------------------------------------------------------------ Вычисление прошедшего времени с последнего запроса.
  if(key_timer == 0){time_req = main_seconds} 
  var time_goed = main_seconds - time_req;
  
   if(key_timer == 0 || time_goed >= 50){                   
   	 document.cookie="timer="+main_seconds+";path=/;";      

  	 REQ(attack, 'GET', null, false, function (req) {answer_page = req.responseText;}); 
  	 var span = document.createElement('span');
         span.innerHTML = answer_page;
         //alert(span)
         
     var b = span.getElementsByTagName('b');
//------------------------------------------------------------ Поиск заявок синда, и времени до начала боя в ответе.        
         for (i = 0, j = 0; i < b.length; i++) {
           	tmp = ""+b[i].textContent;
           	tmp2 = '#' + n_sind;
           
           	if(tmp == tmp2){
           		tr = b[i].parentNode.parentNode.parentNode.parentNode;
           		times[j] = tr.getElementsByTagName('nobr')[0].textContent;
           		j++;
           	}
         }
//------------------------------------------------------------
        var cookie_time="";
        
            txt = root.document.getElementById("sind_battle_timer_gw");
            txt.innerHTML = "<a href=http://www.ganjawars.ru/wargroup.php?war=attacks target=blank>Нападения</a>";
        
            if(times == ""){cookie_time="not_found";}else{for(i=0; i < times.length; i++){cookie_time = cookie_time + times[i] + "|";}}
            
            document.cookie="times="+cookie_time+";path=/;";
            update_page(time_goed);
   }else{
  	update_page(time_goed);
   }
  setTimeout(function(){main()}, 1000);
}



function update_page(time_goed){
   
   var times_cookie = "not_found";
   var txt = root.document.getElementById("sind_battle_timer_gw");
   
   for(i=0; i < cookie_txt.length; i++){
 	 if (cookie_txt[i].lastIndexOf("times") != -1){
 		 times_cookie = cookie_txt[i].split("=");
 		 times_cookie = times_cookie[1];
 	 }
   }
   
 if(times_cookie != "not_found"){
   	
   if(key_update == 11){key_update = 0; visible_time++;}
   
   times_txt = times_cookie.split("|");
   times_len = times_txt.length - 1;
   
   if(visible_time == times_len){visible_time = 0;}
   
   html_time ="";
   
   time = times_txt[visible_time];
   	 
   time_txt = time.split(":");
   time_sec = parseInt(time_txt[1],10);
   time_min = parseInt(time_txt[0],10);
	         
   goed_sec = (time_min*60) + time_sec;
   now_sec = goed_sec - time_goed;
	         
   if(now_sec > 0){ 
	    time_min = parseInt(now_sec/60,10);
	    time_sec =parseInt(now_sec%60,10);
        if(time_sec < 10 ){time_sec = "0" + time_sec;}
        if(time_min < 10 ){time_min = "0" + time_min;}}
   else{time_min = "00";time_sec = "00";}
   
   time_txt = time_min+":"+time_sec;
   if(time_txt == time_alert){if(startSound){playSound(sound_id);}}
   html_time = '<a href=http://www.ganjawars.ru/wargroup.php?war=attacks target=blank style="color:'+colors[visible_time]+';">'+time_txt+'</a>';

   txt.innerHTML = html_time;
   key_update++;
 }else{
    if(txt.textContent != "Нападения"){txt.innerHTML = "<a href=http://www.ganjawars.ru/wargroup.php?war=attacks target=blank>Нападения</a>";}
 }
}

function playSound(soundId){
    if (root.document.getElementById('flashcontent') == null) {
        var div = root.document.createElement('div');
        div.id = 'flashcontent';
        root.document.body.appendChild(div);
    }
    root.document.getElementById('flashcontent').innerHTML = '<embed height="1" width="1" flashvars="soundPath=/sounds/'+ soundId +'.mp3" allowscriptaccess="always" quality="high" bgcolor="#F5fff5" name="gr_server" id="gr_server" src="http://images.ganjawars.ru/i/play.swf" type="application/x-shockwave-flash"/>';
}

function check_desing(){
	var div = document.getElementsByTagName('div');
	for(var i=0; i < 5; i++){
		if(div[i]!= null){
			if(div[i].className.match(/gw-container/)){
				return 3;
			}
		}
	}
	return 0;
}

})();