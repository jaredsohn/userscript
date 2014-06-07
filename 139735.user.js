// ==UserScript==
// @name		Tools Facebook || By. Rajawally Intermezo
// @namespace		auto_like_facebook
// @description		Like status di beranda dan wall Facebook hanya dengan Sekali Klik, coba juga macam-macam update status facebbok dan yg lainnya...
// @author		http://www.facebook.com/RajawallyIntermezo.page
// @homepage		http://rajawally-intermezo.blogspot.com/
// @include		htt*://www.facebook.com/*
// @icon		https://fbcdn-photos-a.akamaihd.net/hphotos-ak-snc7/2825_509827055709929_1095840721_a.jpg
// @version		1.4.5
// @exclude		htt*://*static*.facebook.com*
// @exclude		htt*://*channel*.facebook.com*
// @exclude		htt*://developers.facebook.com/*
// @exclude		htt*://upload.facebook.com/*
// @exclude		htt*://www.facebook.com/common/blank.html
// @exclude		htt*://*connect.facebook.com/*
// @exclude		htt*://*acebook.com/connect*
// @exclude		htt*://www.facebook.com/plugins/*
// @exclude		htt*://www.facebook.com/l.php*
// @exclude		htt*://www.facebook.com/ai.php*
// @exclude		htt*://www.facebook.com/extern/*
// @exclude		htt*://www.facebook.com/pagelet/*
// @exclude		htt*://api.facebook.com/static/*
// @exclude		htt*://www.facebook.com/contact_importer/*
// @exclude		htt*://www.facebook.com/ajax/*
// @exclude 		htt*://apps.facebook.com/ajax/*
// @exclude		htt*://www.facebook.com/advertising/*
// @exclude		htt*://www.facebook.com/ads/*
// @exclude		htt*://www.facebook.com/sharer/*
// @exclude		htt*://www.facebook.com/send/*
// @exclude		htt*://www.facebook.com/mobile/*
// @exclude		htt*://www.facebook.com/settings/*
// @exclude		htt*://www.facebook.com/dialog/*
// @exclude		htt*://www.facebook.com/plugins/*

// ==/UserScript==

// ==============

// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.innerHTML = "<div id=\"logorj\" style=\"z-index:9999;position:fixed;bottom:+175px;left:+6px;background:none;border:none;display:none;\"><img src=\"http://i1182.photobucket.com/albums/x460/rajinter/Rjmiring.gif\"/></div>"

	body.appendChild(div);
	
	unsafeWindow.AutoExpand = function() {
	
		buttons = document.getElementsByTagName("input");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("name") == "view_all")
					buttons[i].click();
		}
		
	};
}

// ==============

// ==Tools fb==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.background = "none";
	div.style.border = "none";
	div.innerHTML = "<div id=\"bktool\" style=\"z-index:9999;position:fixed;left:+6px;bottom:+20px;background-repeat:repeat-x;background-image:-moz-linear-gradient(top,#eceff5 0,#cfd6e5 100%);border:solid 1px #000000;border-radius:4px;padding:4px;display:none\"><button onclick=\"document.getElementById('bktool').style.display ='none'; document.getElementById('bkttptools').style.display=''; document.getElementById('logorj').style.display='none';\" style=\"float:right;width:20px;font-size:10px;font-family:sans-serif;\" title=\"Close Tools Facebook\">X</button><br/><a href=\"javascript:AutoLike()\"><div style=\"width:150px;background-repeat:repeat-x;background-image:-moz-linear-gradient(top,#fff 0,#BCBBBB 100%);color:#000000;font-size:11px;font-family:sans-serif;border:solid 1px #000000;border-radius:2px;padding:2px;cursor:pointer;text-align:center\"><img src=\"http://i1182.photobucket.com/albums/x460/rajinter/likekcl-1.gif\"/> Like All Status</div></a><a href=\"JavaScript:AutoUnLike()\"><div style=\"width:150px;background-repeat:repeat-x;background-image:-moz-linear-gradient(top,#fff 0,#BCBBBB 100%);color:#000000;font-size:11px;font-family:sans-serif;border:solid 1px #000000;border-radius:2px;padding:2px;cursor:pointer;text-align:center\"><img src=\"http://i1182.photobucket.com/albums/x460/rajinter/unlikekcl-1.gif\"/> Unlike All Status</div></a><a href=\"JavaScript:rjawally()\"><div onclick=\"var buktup = document.getElementById('pancing').value;if(buktup=='a'){document.getElementById('pancing').value='b'; document.getElementById('disifstts').style.display=''; document.getElementById('styleifrmstts').src='http://rajawally-intermezo.webs.com/htm/mcmstatusfbiframe.html';}else{if(buktup=='b'){document.getElementById('disifstts').style.display='';}};\" style=\"width:150px;background-repeat:repeat-x;background-image:-moz-linear-gradient(top,#fff 0,#BCBBBB 100%);color:#000000;font-size:11px;font-family:sans-serif;border:solid 1px #000000;border-radius:2px;padding:2px;cursor:pointer;text-align:center\"><img src=\"http://i1182.photobucket.com/albums/x460/rajinter/mcm2sttskcl-1.gif\"/> Tools Update Status</div></a><input id=\"pancing\" type=\"hidden\"  value=\"a\"/><a href=\"JavaScript:Rajawally()\"><div onclick=\"var buktup = document.getElementById('pncing').value;if(buktup=='a'){document.getElementById('pncing').value='b'; document.getElementById('displylvstrm').style.display=''; document.getElementById('lvstremm').src='http://rajawally-intermezo.webs.com/htm/Box%20Live%20Streem2.html';}else{if(buktup=='b'){document.getElementById('displylvstrm').style.display='';}};\" style=\"width:150px;background-repeat:repeat-x;background-image:-moz-linear-gradient(top,#fff 0,#BCBBBB 100%);color:#000000;font-size:11px;font-family:sans-serif;border:solid 1px #000000;border-radius:2px;padding:2px;cursor:pointer;text-align:center\"><img src=\"http://i1182.photobucket.com/albums/x460/rajinter/facebook-logokcl-1.png\"/> Live Streem Facebook</div></a><input id=\"pncing\" type=\"hidden\"  value=\"a\"/><a href=\"javascript:Rajawally()\"><div onclick=\"document.getElementById('bkcmf').style.display =''; document.getElementById('bktool').style.display ='none'; document.getElementById('logorj').style.display='none';\" style=\"width:150px;background-repeat:repeat-x;background-image:-moz-linear-gradient(top,#fff 0,#BCBBBB 100%);color:#000000;font-size:11px;font-family:sans-serif;border:solid 1px #000000;border-radius:2px;padding:2px;cursor:pointer;text-align:center\"><img src=\"http://i1182.photobucket.com/albums/x460/rajinter/facebook-logokcl-1.png\"/> Auto Confirm/Uncomfirm</div></a><div onclick=\"window.open('https://m.facebook.com/home.php?refsrc=http%3A%2F%2Fm.facebook.com%2F&refid=8&p=Aplikasi+TOOLS+FACEBOOK+||+By.+@[113407072095483:]+...+yg+mau+nyoba+cara+instalnya,+disini>>http://rajawally-intermezo.blogspot.com/2012/08/tools-facebook.html','','scrollbars=yes, menubar=no, width=300, height=450, resizable=no, toolbar=no, location=no, status=no')\" style=\"width:50px;background-color:#3b5998;color:#ffffff;font-size:11px;font-family:sans-serif;border:solid 1px #000000;border-radius:2px;padding:2px;cursor:pointer;text-align:center\"><img src=\"http://i1182.photobucket.com/albums/x460/rajinter/facebook-logokcl-1.png\"/> Share</div></div><div id=\"bkcmf\" style=\"z-index:9999;position:fixed;left:+6px;bottom:+20px;background-repeat:repeat-x;background-image:-moz-linear-gradient(top,#eceff5 0,#cfd6e5 100%);border:solid 1px #000000;border-radius:4px;padding:4px;display:none\"><button onclick=\"document.getElementById('bkcmf').style.display ='none'; document.getElementById('bktool').style.display =''; document.getElementById('logorj').style.display='';\" style=\"float:right;width:20px;font-size:10px;font-family:sans-serif;\" title=\"Close Auto Confirm/UnConfirm All add\">X</button><br/><a href=\"javascript:AutoConfirm();\"><div style=\"width:150px;background-repeat:repeat-x;background-image:-moz-linear-gradient(top,#fff 0,#BCBBBB 100%);color:#000000;font-size:11px;font-family:sans-serif;border:solid 1px #000000;border-radius:2px;padding:2px;cursor:pointer;text-align:center\"> Confirm All add</div></a><a href=\"JavaScript:AutoDisable();\"><div style=\"width:150px;background-repeat:repeat-x;background-image:-moz-linear-gradient(top,#fff 0,#BCBBBB 100%);color:#000000;font-size:11px;font-family:sans-serif;border:solid 1px #000000;border-radius:2px;padding:2px;cursor:pointer;text-align:center\"> Unconfirm All add</div></a></div><img onclick=\"document.getElementById('bktool').style.display =''; document.getElementById('bkttptools').style.display='none'; document.getElementById('logorj').style.display=''\" id=\"bkttptools\" src=\"https://fbcdn-sphotos-g-a.akamaihd.net/hphotos-ak-snc6/269762_509458712413430_1970523175_n.jpg\" style=\"z-index:9999;position:fixed;left:+6px;bottom:+20px;border:solid 1px #595959;border-radius:2px;cursor:pointer\" title=\"Open Tools Facebook\"/><div id=\"disifstts\" style=\"z-index:9999; position:fixed;left:+300px;bottom:+20px;width:650px;height:580px;background:#ffffff;border:solid 10px #848484;border-radius:10px;display:none\"><div style=\"width:638px;height:15px;background:#6d84b4;border:none;padding:6px;font-weight:bold;color:#ffffff;font-size:15px;font-family:sans-serif;\"> Tools update status </div><div style=\"width:100%;height:515px;background:#ffffff;border:none;overflow:hidden\"><iframe id=\"styleifrmstts\" name=\"mcmsttsrj\" scrolling=\"no\" frameborder=\"0\" style=\"background:none;width:100%;height:100%;border:none;overflow:auto\"></iframe></div><div style=\"width:100%;height:1px;background:#848484;border:none;\"></div><div style=\"width:638px;height:25px;background:#F2F2F2;border:none;padding:6px;\"><button onclick=\"document.getElementById('disifstts').style.display='none';\" style=\"background:#5972a8;float:right;border:solid 1px #000000;padding:4px;border-radius:1px;cursor:pointer\"><span style=\"font-weight:bold;color:#ffffff\">Tutup</span></button></div></div><div id=\"displylvstrm\" style=\"z-index:9999;position:fixed;bottom:+22px;right:+4px;width:310px;height:535px;background:#fff;border:solid 10px #818181;border-radius:10px;display:none;\"><iframe id=\"lvstremm\" scrolling=\"no\" frameborder=\"0\" style=\"width:300px;height:493px;\"></iframe><div style=\"width:100%;height:1px;background:#818181;border:none;\"></div><div style=\"width:298px;height:25px;background:#F2F2F2;border:none;padding:6px;\"><span style=\"float:left;width:220px;font-size:11px;font-family:sans-serif;color:#3b5998;bacground:none\">Jika <i>Kirim ke Faceook</i> di checked, apa yang ditulis akan jadi status..</span><button onclick=\"document.getElementById('displylvstrm').style.display='none';\" style=\"background:#5972a8;float:right;border:solid 1px #000000;padding:4px;border-radius:1px;cursor:pointer\"><span style=\"font-weight:bold;color:#ffffff\">Tutup</span></button></div></div>"

	body.appendChild(div);
	//buat fungsi tunda
	function tunda(milliSeconds){
	var startTime = new Date().getTime(); 
	while (new Date().getTime() < startTime + milliSeconds); 
}
	
	unsafeWindow.AutoConfirm = function() {
		var x=document.getElementsByName("actions[accept]"); for (i=0;i<x.length;i++) { x[i].click();}
		};
	
	
	unsafeWindow.AutoDisable = function() {
			var x=document.getElementsByName("actions[hide]"); for (i=0;i<x.length;i++) { x[i].click();}
			};

	unsafeWindow.AutoLike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "like")
					buttons[i].click();
		}
		
	};
	
	unsafeWindow.AutoUnLike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "unlike")
					buttons[i].click();
		
		}
		
	};
	
	unsafeWindow.AutoExpand = function() {
	
		buttons = document.getElementsByTagName("input");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("name") == "view_all")
					buttons[i].click();
		}
		
	};

}


// ==============

