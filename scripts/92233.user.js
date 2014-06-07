// ==UserScript==
// @name           VaSuperKlicker
// @namespace      VAS
// @include        http://www.virtuadopt.com/profile.php?id=*
// @include        http://www.virtuadopt.com/profile.php
// @description    Look at the Profile of a User (/profile.php?id=1234) and you will find a new link named "Click all Adopts". have Fun
// ==/UserScript==
var c = unsafeWindow.document.getElementById("content").childNodes[1];
var o = document.createElement("h3");
var b = document.createElement("a");
var u = c.getElementsByTagName("h3");
var un = "";
var s = u[2].innerHTML;
var adopts = new Array();
s = s.substr(s.indexOf("viewadopts.php?id=") + 18);
s = s.substr(0,s.indexOf("\""));
un = s;
b.href="javascript:void(0)";
b.innerHTML = "- <span style='color:red;'><i>Click all Adopts!</i></span>";
b.addEventListener("click",function() {
         this.blur();
         this.innerHTML = "- Lade boxen ...";
         this.removeEventListener("click",null,true);
         var surl = "http://www.virtuadopt.com/viewadopts.php?id=" + un;
         GM_xmlhttpRequest({
		method: 'GET',
		url: surl,
		headers: {
			'Content-type': 'application/x-www-form-urlencoded'
		},
		onload: function(responseDetails) {
                         var s = responseDetails.responseText;
                         s = s.substr(s.indexOf("<select") + 7);
			b.innerHTML = "- Zähle adopts ...";
                         while(s.indexOf("<option value=") > -1) {
				s = s.substr(s.indexOf("<option value=") + 15);
                                 var bs = s.substr(0,s.indexOf("\""));
                                 GM_xmlhttpRequest({
					method: 'GET',
					url: surl + "&box=" + bs,
					headers: {
						'Content-type': 'application/x-www-form-urlencoded'
					},
					onload: function(responseDetails) {
			                	var as = responseDetails.responseText;
						var Ergebnis = as.match(/\=\[\d*\]/g);
						for (var i = 0; i < Ergebnis.length;i++) {
                                                 	var gg = Ergebnis[i].substr(2);
                                                         gg = gg.substr(0,gg.length - 1);
                                                         adopts[adopts.length] = gg;
						}
					}
				});
                         }
			runthescript();
		}
	});
},true);
o.appendChild(b);
c.appendChild(o);
var currentstep = 0;
function runthescript() {
         GM_xmlhttpRequest({
		method: 'GET',
		url: "http://www.virtuadopt.com/feed.php?id=" + adopts[currentstep],
		headers: {
			'Content-type': 'application/x-www-form-urlencoded'
		},
		onload: function(responseDetails) {
                         var s = responseDetails.responseText;
                         s = s.substr(s.indexOf("check=") - 26);
                         s = s.substr(s.indexOf("\"") + 1);
                         s = s.substr(0,s.indexOf("\""));
         		GM_xmlhttpRequest({
				method: 'GET',
				url: "http://www.virtuadopt.com/" + s,
				headers: {
					'Content-type': 'application/x-www-form-urlencoded'
				},
				onload: function(req) {
                         		var s = req.responseText;
					if(s.indexOf("Come back tomorrow!") <= -1) {
						var q = s;
						var q2 = q;
						if(q2.indexOf("images/content/win.jpg") > -1) {
							var vsrc = q2;
							vsrc = vsrc.substr(vsrc.indexOf("Your promo code: ") + 17);
							vsrc = vsrc.substr(0,vsrc.indexOf("<"));
							alert(vsrc);
						}
					}
                         		b.innerHTML = "- " + currentstep + " / " + adopts.length;
         				if(currentstep < adopts.length) {
						runthescript();
         				}else{
                         			b.innerHTML = "- DONE";
                                         }
                                 }
                         });
		}
	});
         currentstep += 1;
}