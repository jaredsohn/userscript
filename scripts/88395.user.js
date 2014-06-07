// ==UserScript==
// @name           Virtuadopt Ajax Autoklick + Config
// @description    Virtuadopt-Autoclicker via Ajax mit Multithreading-Funktion und Limitierung.
// @namespace      AutoNO
// @include        http://www.virtuadopt.com/viewadopts.php*
// @include        http://www.virtuadopt.com/pc.php
// @include        http://www.virtuadopt.com/pc.php?do=feed
// @include        http://www.virtuadopt.com/pc.php?do=feed&box=*
// @include        http://www.virtuadopt.com/pc.php?box=*&do=feed
// @include        http://www.virtuadopt.com/daycare.php
// ==/UserScript==
var cur_page = document.location.href;
cur_page = cur_page.substr(cur_page.lastIndexOf("/") + 1);
cur_page = cur_page.substr(0,cur_page.indexOf("."));
if(cur_page == "pc" && document.location.href.indexOf("?") <= -1) {
	function mysub() {
		var n = (localStorage.getItem("va_autoclick")==1)?0:1;
		rbt.value = (n == 1)?"AutoKlicker deaktivieren":"AutoKlicker aktivieren";
		rbt2.innerHTML = (n == 1)?"AutoKlicker ist aktiviert":"AutoKlicker ist deaktiviert";
		localStorage.setItem('va_autoclick', n);
	}
	function mysub3() {
		var n = (localStorage.getItem("va_autoimg")==1)?0:1;
		rbt5.value = (n == 1)?"Grafiken nicht dynamisch neu laden (ausschalten)":"Grafiken dynamisch neu laden (einschalten)";
		localStorage.setItem('va_autoimg', n);
	}
	function mysub4() {
		var n = (localStorage.getItem("va_multithreading")==1)?0:1;
		rbt6.value = (n == 1)?"Multithreading deaktivieren":"Multithreading aktivieren";
		localStorage.setItem('va_multithreading', n);
	}
	function mysub2() {
		localStorage.setItem('va_clicklimit', parseInt(rbt3.value));
	         rbt3.value = parseInt(rbt3.value);
	}
	function mysub8() {
		localStorage.setItem('va_multithreading_threads', parseInt(rsel.value));
	}
	var bt = document.createElement("div");
	bt.style.padding = "20px"
	var rbt = document.createElement("input");
	var rbt2 = document.createElement("span");
	var rbt5 = document.createElement("input");
	var rbt6 = document.createElement("input");
	var rsel = document.createElement("select");
	rsel.size = 1;
	for(var i = 2;i <= 50;i++) {
		NeuerEintrag = new Option(i, i + " Threads", false, (i == parseInt(localStorage.getItem('va_multithreading_threads'))));
		rsel.options[rsel.length] = NeuerEintrag;
	}
	rbt.type = "button";
	rbt5.type = "button";
	rbt6.type = "button";
	if(localStorage.getItem("va_autoimg")==1) {
		rbt5.value = "Grafiken nicht dynamisch neu laden (ausschalten)";
	}else{
		rbt5.value = "Grafiken dynamisch neu laden (einschalten)";
	}
	if(localStorage.getItem("va_multithreading")==1) {
		rbt6.value = "Multithreading deaktivieren";
	}else{
		rbt6.value = "Multithreading aktivieren";
	}
	if(localStorage.getItem("va_autoclick")==1) {
		rbt.value = "AutoKlicker deaktivieren";
		rbt2.innerHTML = "AutoKlicker ist aktiviert";
	}else{
		rbt.value = "AutoKlicker aktivieren";
		rbt2.innerHTML = "AutoKlicker ist deaktiviert";
	}
	rbt.addEventListener("click", mysub, true);
	rbt5.addEventListener("click", mysub3, true);
	rbt6.addEventListener("click", mysub4, true);
	rsel.addEventListener("change", mysub8, true);
	bt.appendChild(rbt);
	bt.appendChild(document.createElement("br"));
	bt.appendChild(rbt2);
	bt.appendChild(document.createElement("br"));
	bt.appendChild(rbt5);
	bt.appendChild(document.createElement("br"));
	bt.appendChild(rbt6);
	bt.appendChild(document.createElement("br"));
	bt.appendChild(document.createTextNode("Parrallele Threads:"));
	bt.appendChild(rsel);
	bt.appendChild(document.createElement("br"));
	bt.appendChild(document.createTextNode("Klick-Limitierung:"));
	bt.appendChild(document.createElement("br"));
	var rbt3 = document.createElement("input");
	rbt3.type = "text";
	rbt3.value = parseInt(localStorage.getItem("va_clicklimit"));
	if(rbt3.value == "NaN") {
		rbt3.value = 0;
		localStorage.setItem('va_clicklimit', 0);
	}
	rbt3.addEventListener("keyup", mysub2, true);
	bt.appendChild(rbt3);
	bt.appendChild(document.createElement("br"));
	bt.appendChild(document.createTextNode("Klicks: " + localStorage.getItem("va_todayclick")));
	unsafeWindow.document.getElementById("content").appendChild(bt);
}else if(cur_page == "viewadopts" || cur_page == "pc") {
	function func(u) {
		this.obj = "";
         	this.furl = u;
         	var self = this;
		this.DoFeed = function(thisfurl) {
			var req = null;
			try{
				req = new XMLHttpRequest();
			}catch (ms){
				try{
					req = new ActiveXObject("Msxml2.XMLHTTP");
				}catch (nonms){
					try{
						req = new ActiveXObject("Microsoft.XMLHTTP");
					}catch (failed){
						req = null;
					}
				}
			}
			req.open("GET", self.furl, true);
			req.onreadystatechange = function() {
				switch(req.readyState) {
					case 4:
						if(req.status==200) {
							var s = req.responseText;
							var t = s.substr(s.indexOf("click <a"))
							t = t.substr(t.indexOf("href=")+6);
							t = t.substr(0,t.indexOf("\""));
							var u = "http://www.virtuadopt.com/" + t;  // http:.../feed.php?id=...&check=...
							self.DoFeedFix(u);
						}
						break;
					default:
						return false;
						break;
				}
			};
			req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			req.send(null);
		}
		this.DoFeedFix = function(u) {
			var req = null;
			try{
				req = new XMLHttpRequest();
			}catch (ms){
				try{
					req = new ActiveXObject("Msxml2.XMLHTTP");
				}catch (nonms){
					try{
						req = new ActiveXObject("Microsoft.XMLHTTP");
					}catch (failed){
						req = null;
					}
				}
			}
			req.open("GET", u, true);
			req.onreadystatechange = function() {
				switch(req.readyState) {
					case 4:
						if(req.status==200) {
                                 	                if(req.responseText.indexOf("Come back tomorrow!") > -1) {
								self.obj.style.background="#E6D0B7";
                                                 	        StepNext();
	                                                }else{
         	                                        	var q = req.responseText;
                 	                                        var q2 = q;
                                                                 if(actualize_konto) {
                         	                                	q = q.substr(q.indexOf("Cash amount") + 17);
                                 	                        	q = parseInt(q.substr(0,q.indexOf(" ")));
                                         	                	if(q != "NaN") {
                                                 	        		currentCash = q - 0;
                                                         		}
	                                                        	document.getElementsByTagName("b")[2].parentNode.innerHTML = "<b>Cash amount:</b> " + currentCash + " $";
                                                                 }
         	                                                if(localStorage.getItem("va_autoimg")==1) {
                 	                                        	var c = document.createElement("img");
                         	                                	c.src = self.obj.src + ((self.obj.src.indexOf("?") > -1)?"&":"?") + Math.round(Math.random() * 10001000);
									c.style.background="#C6E0A7";
                                                 	        	self.obj.parentNode.replaceChild(c,self.obj);
                                         	                }else{
                                                         		self.obj.style.background = "#C6E0A7";
                                                         	}
                                                         	localStorage.setItem("va_todayclick",localStorage.getItem("va_todayclick") - (0-1));
                                                         	if(q2.indexOf("images/content/win.jpg") > -1) {
									q2 = q2.substring(q2.indexOf("<a href='promo.php?pc=") + 22);
									q2 = q2.substring(0,q2.indexOf("'") + 22);
									GM_xmlhttpRequest({
										method: 'GET',
										url: 'http://www.virtuadopt.com/promo.php',
                                                                                 data: 'name=&code=' + q2 + '&promo_yes=Confirm!&cmd=_s-xclick&encrypted=-----BEGIN+PKCS7----------END+PKCS7-----%0D%0A',
										headers: {
											'Accept': '*/*',
										},
										onload: function(responseDetails) {
											return true;
										}
									});
                                                         		self.obj.style.background = "#009F00";
                                                         	}
                                                         	StepNext();
                                                 	}
						}
						break;
					default:
						return false;
						break;
				}
			};
			req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			req.send(null);
		}
	}
         var n = document.createElement("div");
	var s = 0;
	var currentCash = 0;
         var actualize_konto = false;
         if(document.getElementsByTagName("b").length >= 3) {
		n = document.getElementsByTagName("b")[2].parentNode;
		s = n.innerHTML.substr(20);
		currentCash = parseInt(s.substr(0,s.indexOf(" ")));
                 actualize_konto = true;
         }
	var elements = new Array();
	var current = -1;
	function StepNext() {
		current += 1;
		if(current < elements.length) {
			if(localStorage.getItem("va_clicklimit") == 0 || localStorage.getItem("va_todayclick") < localStorage.getItem("va_clicklimit")) {
				var link = elements[current].href;
				if(link.substr(0,7) != "http://") {
					link = "http://www.virtuadopt.com/" + link;
				}
				var objc = elements[current].childNodes[0];
				objc.style.background="skyblue";
				var og = new func(link);
				og.obj = objc;
				og.DoFeed(link);
			}else{
				localStorage.setItem("va_autoclick",0);
				localStorage.setItem("va_todayclick",0);
				localStorage.setItem("va_clicklimit",0);
			}
         	}
	}
	var btn = null;
	var btn2 = null;
	unsafeWindow.onload = function() {
         	var cnt = document.createElement("span");
         	btn = document.createElement("button");
         	var g = "Alle einzeln klicken";
         	var v = false;

		if(localStorage.getItem("va_multithreading") == 1) {
			var k = parseInt(localStorage.getItem('va_multithreading_threads'));
         		g = "Alle mit " + k + " Threads klicken";
         	        v = true;
		}

         	btn.innerHTML = g;
         	btn.addEventListener("click",clickit,true);
         	btn.style.padding = "0px";
         	btn.style.border = "1px solid black";
         	btn.style.position = "relative";
         	btn.style.top = "-4px";
         	btn.style.background="white";
         	btn.style.fontSize="11px";

         	cnt.appendChild(document.createElement("hr"));
         	cnt.appendChild(btn);
		if(v) {
         		btn2 = btn.cloneNode(true);
         		g2 = "Alle einzeln klicken";
         		btn2.innerHTML = g2;
         		btn2.removeEventListener("click",clickit,true);
         		btn2.addEventListener("click",clickit2,true);
         	        btn2.style.marginLeft = "4px";
         		cnt.appendChild(btn2);
         	}
		document.getElementById("content").getElementsByTagName("div")[0].replaceChild(cnt,document.getElementById("content").getElementsByTagName("div")[0].getElementsByTagName("hr")[1]);
		document.getElementById("content").getElementsByTagName("div")[0].removeChild(document.getElementById("content").getElementsByTagName("div")[0].getElementsByTagName("br")[0]);
	}
	function clickit() {
		btn.style.visibility = "hidden";
		btn2.style.visibility = "hidden";
		if(localStorage.getItem("va_autoclick")==1) {
			var offs = document.getElementsByTagName("a");
			var ng = 0;
			for(var i = 0;i < offs.length;i++) {
				var u = offs[i].href.substr(7);
				u = u.substr(u.indexOf("/") + 1);
				if(u.indexOf("feed.php?id=") > -1) {
                         		elements[elements.length] = offs[i];
				}
			}
                 	if(localStorage.getItem("va_multithreading") == 1) {
                 		var k = parseInt(localStorage.getItem('va_multithreading_threads'));
                         	for(var i = 0;i < k;i++) {
                         		StepNext();
                         	}
                 	}else{
                 		StepNext();
                 	}
         	}
	}
	function clickit2() {
		btn.style.visibility = "hidden";
		btn2.style.visibility = "hidden";
		if(localStorage.getItem("va_autoclick")==1) {
			var offs = document.getElementsByTagName("a");
			var ng = 0;
			for(var i = 0;i < offs.length;i++) {
				var u = offs[i].href.substr(7);
				u = u.substr(u.indexOf("/") + 1);
				if(u.indexOf("feed.php?id=") > -1) {
                         		elements[elements.length] = offs[i];
				}
			}
                		StepNext();
         	}
	}
}else if(cur_page == "daycare") {
	function countmatches(s,b) {
		var bs = s;
         	var c = 0;
         	if(bs.indexOf(b) > -1) {
         		while(bs.indexOf(b) > -1) {
         			bs = bs.substr(bs.indexOf(b) + b.length);
         	        	c += 1;
         		}
         		return(c);
         	}else{
         		return(0);
         	}
	}
	unsafeWindow.onload = function() {
         	var scontent = document.body.innerHTML;
		var suchstring = "remove&";
         	var depositpos = "Current amount of deposit: ";
         	var depositend = " $</b>";
		var cnt = countmatches(scontent,suchstring);
		scontent = scontent.substr(scontent.indexOf(depositpos) + depositpos.length);
         	var amount = scontent.substr(0,scontent.indexOf(depositend));
         	var l = document.getElementsByTagName("font");
		l[0].innerHTML = "<b>Du hast " + amount + "$ vorbezahlt.</b>";
         	if(cnt > 0) {
         		var zeit = Math.floor(amount / (25 * cnt));
         		var stunden = zeit;
         		var tage = 0;
         		while(stunden > 23) {
				stunden -= 24;
         	        	tage += 1;
         		}
         		l[0].innerHTML += "<br>Das reicht für ";
         		if(tage > 0) {
         			l[0].innerHTML += tage + " Tag(e)";
         		        if(stunden > 0) {
					l[0].innerHTML += " und " + stunden + " Stunde(n)";
         		        }
         		}else{
				l[0].innerHTML += stunden + " Stunden";
         		}
         	}else{
			l[0].innerHTML += "<br>Du hast keine Adopts hier.";
         		var zeit = Math.floor(amount / 25);
         		var stunden = zeit;
         		var tage = 0;
         		while(stunden > 23) {
				stunden -= 24;
         	        	tage += 1;
         		}
			l[0].innerHTML += "<br>Bei 1 Adopt: ";
         		if(tage > 0) {
         			l[0].innerHTML += tage + " Tag(e)";
         	        	if(stunden > 0) {
					l[0].innerHTML += " und " + stunden + " Stunde(n)";
         		        }
         		}else{
				l[0].innerHTML += stunden + " Stunden";
         		}
         		zeit = Math.floor(amount / 50);
         		stunden = zeit;
         		tage = 0;
         		while(stunden > 23) {
				stunden -= 24;
         	        	tage += 1;
         		}
			l[0].innerHTML += "<br>Bei 2 Adopts: ";
         		if(tage > 0) {
         			l[0].innerHTML += tage + " Tag(e)";
         	        	if(stunden > 0) {
					l[0].innerHTML += " und " + stunden + " Stunde(n)";
         	        	}
         		}else{
				l[0].innerHTML += stunden + " Stunden";
         		}
         	}
	}
}