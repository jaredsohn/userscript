// ==UserScript==
// @name			Fast Auto Like Facebook by PG-86
// @namespace		        Fast auto_like_facebook
// @description		        Fast Auto Like Facebook by PG-86
// @author			Azzalife Portal
// @authorURL		        https://www.facebook.com/
// @homepage		        https://www.facebook.com/
// @include			htt*://www.facebook.com/*
// @icon			http://i1260.photobucket.com/albums/ii576/Nana_Arool/index_zps59bc7218.jpeg
// @version			visit pangerangalau86.blogspot.com
// @exclude			htt*://*static*.facebook.com*
// @exclude			htt*://*channel*.facebook.com*
// @exclude			htt*://developers.facebook.com/*
// @exclude			htt*://upload.facebook.com/*
// @exclude			htt*://www.facebook.com/common/blank.html
// @exclude			htt*://*connect.facebook.com/*
// @exclude			htt*://*facebook.com/connect*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/l.php*
// @exclude			htt*://www.facebook.com/ai.php*
// @exclude			htt*://www.facebook.com/extern/*
// @exclude			htt*://www.facebook.com/pagelet/*
// @exclude			htt*://api.facebook.com/static/*
// @exclude			htt*://www.facebook.com/contact_importer/*
// @exclude			htt*://www.facebook.com/ajax/*
// @exclude 		        htt*://apps.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
// @exclude			htt*://www.facebook.com/send/*
// @exclude			htt*://www.facebook.com/mobile/*
// @exclude			htt*://www.facebook.com/settings/*
// @exclude			htt*://www.facebook.com/dialog/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/bookmarks/*
// @grant       none

// ==/UserScript==

// ==============

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like2');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "130px";
	div.style.opacity= 0.90;
	div.style.bottom = "+70px";
	div.style.left = "+8px";
	div.style.backgroundColor = "#00cc33";
	div.style.border = "2px solid #6B84B4";
	div.style.padding = "3px";
	div.innerHTML = "<a style='font-weight:bold;color:#000000' onclick='AutoLike()'><center>Like All Status</center></a>"
	body.appendChild(div);
	unsafeWindow.AutoLike = function() {
		var BounceCounterLike=0;
		var Counter = 0;
		var prepare = document.getElementsByTagName("span");
		var buttons = new Array();
		
		for (var i = 0; i < prepare.length; i++)
			if(prepare[i].getAttribute("id")!=null&&prepare[i].getAttribute("id").indexOf(".reactRoot")>=0&&(prepare[i].innerHTML=="Me gusta"||prepare[i].innerHTML=="Like"||prepare[i].innerHTML=="Suka"||prepare[i].innerHTML=="Beğen"||prepare[i].innerHTML=="أعجبني"||prepare[i].innerHTML=="Seneng"||prepare[i].innerHTML=="J’aime")) {
				buttons[Counter] = prepare[i];
				Counter++;
			}
		
		function check_link(linknumber) {
			buttons[linknumber].click();
			var message = "<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Status: "+ (linknumber + 1) +"/"+ buttons.length +"</center></a>";
			document.getElementById('like2').innerHTML = message;
			};
		
		function like_timer(timex) {
			window.setTimeout(bouncer_like,timex);
		};
		
		function check_warning() {
			var warning = document.getElementsByTagName("label");
			var checkwarning = false;
			
			for(var i = 0; i < warning.length; i++) {
				var myClass = warning[i].getAttribute("class");
				if(myClass!=null&&myClass.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0) {
					alert("Warning from Facebook");
					checkwarning = true;
				}
			}
			
			if(!checkwarning) like_timer(0);
		};
		
		function warning_timer(timex) {
			window.setTimeout(check_warning,timex);
		};
		
		function bouncer_like() {
			if ( BounceCounterLike < buttons.length ) {
				check_link(BounceCounterLike);
				warning_timer(0);
				BounceCounterLike++;
			}
		};
		
		bouncer_like();

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
	div.style.bottom = "+45px";
	div.style.left = "+8px";
	div.style.backgroundColor = "#00ffff";
	div.style.border = "2px solid #6B84B4";
	div.style.padding = "3px";
	div.innerHTML = "<a style='font-weight:bold;color:#000000' onclick='LikeComments()'><center>Like All Comments</center></a>"
	body.appendChild(div);
	unsafeWindow.LikeComments = function() {
		var BounceCounterLike=0;
		var Counter = 0;
		var prepare = document.getElementsByTagName("a");
		var buttons = new Array();
		
		for (var i = 0; i < prepare.length; i++)
			if(prepare[i].getAttribute("data-ft")!=null&&(prepare[i].getAttribute("title")=="Me gusta este comentario"||prepare[i].getAttribute("title")=="Like this comment"||prepare[i].getAttribute("title")=="Suka komentar ini"||prepare[i].getAttribute("title")=="Nyenengi tanggapan iki"||prepare[i].getAttribute("title")=="الإعجاب بالتعليق"||prepare[i].getAttribute("title")=="J’aime ce commentaire"||prepare[i].getAttribute("title")=="Bu yorumu beğen")) {
				buttons[Counter] = prepare[i];
				Counter++;
			}
		function check_link(linknumber) {
			buttons[linknumber].click();
			var message = "<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Comments: "+ (linknumber + 1) +"/"+ buttons.length +"</center></a>";
			document.getElementById('like3').innerHTML = message;
			};
		function like_timer(timex) {
			window.setTimeout(bouncer_like,timex);
		};
		function check_warning() {
			var warning = document.getElementsByTagName("label");
			var checkwarning = false;
			for(var i = 0; i < warning.length; i++) {
				var myClass = warning[i].getAttribute("class");
				if(myClass!=null&&myClass.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0) {
					alert("Warning from Facebook");
					checkwarning = true;
					}
				}
			if(!checkwarning) like_timer(0);
		};
		function warning_timer(timex) {
			window.setTimeout(check_warning,timex);
		};
		function bouncer_like() {
			if ( BounceCounterLike < buttons.length ) {
				check_link(BounceCounterLike);
				warning_timer(0);
				BounceCounterLike++;
			}
		};
		bouncer_like();
		void(0);
	};
}
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "130px";
	div.style.opacity= 0.90;
	div.style.bottom = "+95px";
	div.style.left = "+8px";
	div.style.backgroundColor = "#ff0033";
	div.style.border = "2px solid #6B84B4";
	div.style.padding = "3px";
	div.innerHTML = "<a style='font-weight:bold;color:#ffffff' href='https://www.facebook.com/' title='PG-86'><center>PG-86 (Refresh)</center></a>"
body.appendChild(div);}