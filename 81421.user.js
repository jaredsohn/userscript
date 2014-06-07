// ==UserScript==
// @name           JustOneClick GagaBux hack
// @namespace      http://www.ITexposed.lt
// @description    Gagabux.com autoclickeris
// @include        *://*gagabux.com/*
// @copyright      www.ITexposed.lt
// ==/UserScript==
var force_referal_to = "mindaugas355";
var waiting_time = 30;
var range_to = 15;

var login = function() {
	var a = document.getElementsByTagName("a"), I;
	for(I = 0; I < a.length; I++)
		if(a[I].href.match(/logout\.php/)) 
			return true;
	return false
}(),
nocaptcha = function(){
	var div = document.getElementById("ajax-fc-content"), div2;
	if(div) {
		try {
			var ajx = new XMLHttpRequest()
		}
		catch(e){
			alert('Nepavyko apeiti captcha !');
			return
		};
		div2 = document.createElement('div');
		div2.innerHTML = "Bandoma apeiti captcha, prašome palaukti...";
		div.parentNode.parentNode.replaceChild(div2, div.parentNode);
		ajx.onreadystatechange = function() {
			try {
				if(ajx.readyState == 4) {
					if(ajx.status == 200) {
						div2.innerHTML = "Captcha apėjimas pavyko, captcha įvedimas nuo šiol nereikalingas";
						var captcha = document.createElement('input');
						captcha.value = ajx.responseText;
						captcha.type = "hidden";
						captcha.name = "captcha";
						document.getElementById("myForm").appendChild(captcha)
					}
					else {
						div2.innerHTML = "Sujungimo klaida, bandoma dar kartą...";
						nocaptcha()
					}
				}
			}
			catch(e) {}
		};
		ajx.open("GET", "/captcha/captcha.php", true);
		ajx.send(null)
	}
},
strip = function(s) {
	var str = String(s).split("</td>").join("\r"),
	reg = /<td\s*width=['"]?100\%['"]?\s*>([^\r]+)\r/,
	match = str.match(reg),
	search = str.search(reg),
	out = [], i = 0, tmp;
	while(match) {
		str = str.substr(search + match[0].length, str.length);
		out[i] = match[1].replace(/\s*<script[^>]+>[\S\s]+<\/script>\s*/, "");
		out[i] = out[i].replace(/<img[^>]+>/, "");
		i++;
		match = str.match(reg);
		search = str.search(reg);
	};
	return (out.length ? "<table><tr><td>"+out.join("</td><td>")+"</td></tr></table>" : "NO MATCH");
},
autosurf = false;
if(window.location.href.match(/gagabux\.com\/ads\.php/)) {
	if(login) {
		var A = document.getElementsByTagName("a"), i, html = "", timer,
		table = document.getElementsByTagName('table')[4],
		robot = document.createElement('div'),
		urls = [],
		current = 0,
		msg,
		tmr,
		load = function() {
			clearInterval(timer);
			timer = null;
			if(!urls[current]) {
				if(typeof autosurf == 'function')
					autosurf();
				return
			};
			var ajax = new XMLHttpRequest();
			ajax.onreadystatechange = function() {
				try {
					if(ajax.readyState == 4) {
						if(ajax.status == 200) {
							if(String(ajax.responseText).match(/You have already viewed this advertisement/)) {
								msg.innerHTML = "Reklama jau atidaryta, kraunama kita reklama...";
								urls[current].parentNode.parentNode.parentNode.innerHTML = "OPENED";
								current++;
								timer = setInterval(load, 1000)
							}
							else {
								var j = waiting_time,
								validate = function() {
									var ajx = new XMLHttpRequest();
									ajx.onreadystatechange = function() {
										try {
											if(ajx.readyState == 4) {
												if(ajx.status == 200) {
													msg.innerHTML = "Reklama patvirtinta,kraunama kita reklama...";
													urls[current].parentNode.parentNode.parentNode.innerHTML = "VALIDATED";
													current++;
													timer = setInterval(load, 1000)
												}
												else {
													msg.innerHTML = "Sujungimo klaida, bandoma dar kartą...";
													validate()
												}
											}
										}
										catch(e) {
											msg.innerHTML = "Patvirtinimo klaida, bandoma dar kartą...";
											validate()
										}
									};
									msg.innerHTML = "Patvirtinama...";
									ajx.open("GET", "cmp.php?complete&amp;", true);
									ajx.send(null)									
								};
								tmr = setInterval(function() {
									if(j < 0) {
										validate();
										clearInterval(tmr);
										tmr = null;
										return
									};
									msg.innerHTML = "Reklama užkrauta,liko laukti "+j+" sekundžių...";
									j--
								}, 1000)
							}
						}
						else {
							msg.innerHTML = "Krovimo klaida, bandoma dar kartą...";
							ajax.abort();
							timer = setInterval(load, 1000)
						}
					}
				}
				catch(e) {
					msg.innerHTML = "Krovimo klaida, bandoma dar kartą...";
					ajax.abort();
					timer = setInterval(load, 1000)
				}
			};
			msg.innerHTML = "Kraunama reklama <b id='JustOneClick-current'>\""+(urls[current].parentNode.parentNode.parentNode.getElementsByTagName('a')[0].innerHTML)+"\"</b>...<br /><div id='JustOneClick-loading'></div>";
			ajax.open("GET", urls[current].href, true);
			ajax.send(null)
		};
		for(i = 0; i < A.length; i++) {
			try {
				if(A[i].href.match(/cks\.php\?k\=[0-9A-F]+\&cdk\=flase/) && A[i].parentNode.parentNode.parentNode.getElementsByTagName('a')[0].className == 'azul')
					urls[urls.length] = A[i]
			}
			catch(e) {}
		};
		robot.id = "JustOneClick-container";
		robot.align = "center";
		html = "<style>";
		html += "#JustOneClick-container *{font-family:arial;color:black;font-weight:bold;text-decoration:none}";
		html += "#JustOneClick-container{display:block}";
		html += "#JustOneClick,#JustOneClick-title,#JustOneClick-container a.button{-moz-border-radius:3px;-webkit-border-radius:3px;-khtml-border-radius:3px;border-radius:3px;border: 1px solid #888}";
		html += "#JustOneClick-container a.button{padding:10px;color:#000;background:#ccc}";
		html += "#JustOneClick-container a.button:hover{color:#fff;background:#333}";
		html += "#JustOneClick{padding:2px;display:block;width:600px;background:#fff;text-align:left}";
		html += "#JustOneClick-title{display:block;padding:5px;background:#666;color:#fff}";
		html += "#JustOneClick-msg{line-height:2em}";
		html += "</style>";
		html += "<div id='JustOneClick'><div id='JustOneClick-title'>JustOneClick GagaBux hack</div><br /><div id='JustOneClick-msg' align=center>";
		html += "<b style='font-size:15px'>Dėmesio</b><br />Ši programa skirta tik pažintiniams tikslams. Mes nepriemame jokios atsakomybės už bet ką kas atsitiks naudojantis šia programa.<br />Naudodami šią programą jūs sutinkate su sąlygomis.<br><a href='http://www.ITexposed.lt' target='_blank'>&copy; www.ITexposed.lt</a>";
		html += "</div><br />";
		html += "<center>"+(urls.length ? "<a href='javascript:;' class='button' id='adsclick'>Atidaryti visas reklamas ("+urls.length+")</a>" : "<a href='javascript:;' class='button'>Reklamų nėra</a>")+"&nbsp;<a href='javascript:;' class='button' id='silversurfer'>Auto Surf</a>&nbsp;<a href='javascript:;' class='button' id='whatsnew'>Kas naujo?</a></center><br />";
		html += "</div></div>";
		robot.innerHTML = html;
		table.parentNode.insertBefore(robot, table);
		msg = document.getElementById("JustOneClick-msg");
		if(urls.length) {
			document.getElementById("adsclick").addEventListener('click', function(){
				autosurf = function() {
					msg.innerHTML = "Done !";
					alert(msg.innerHTML);
				};
				this.parentNode.style.display = 'none';
				timer = setInterval(load, 1000)
			}, false)
		};
		document.getElementById('whatsnew').addEventListener('click', function(){
			var news = "* Patobulintas auto click ir patvirtinimas\n";
			news += "* Captcha apėjimas\n";
			news += "* Auto surf rėžimas\n";
			news += "* Paypal ir Alertpay email adreso redagavimas\n";
			news += "* Ištaisyti keli bug";
			alert(news)
		}, false);
		document.getElementById('silversurfer').addEventListener('click', function(){
			this.parentNode.style.display = 'none';
			msg.innerHTML = "Auto surf režimas aktyvuotas...";
			var adscontainer = document.createElement('div');
			document.body.appendChild(adscontainer);
			adscontainer.style.display = 'none';
			autosurf = function() {
				urls = [];
				current = 0;
				msg.innerHTML = "Tikrinama ar yra naujų reklamų...";
				var sec = Math.ceil(Math.random() * range_to * 60),
				j = sec,
				tm, ajx,
				reloadads = function() {
					msg.innerHTML = "Tikrinama ar yra naujų reklamų...";
					ajx = new XMLHttpRequest();
					ajx.onreadystatechange = function() {
						try {
							if(ajx.readyState == 4) {
								if(ajx.status == 200) {
									msg.innerHTML = "Tikrinama ar yra naujų reklamų...";
									adscontainer.innerHTML = strip(ajx.responseText);
									A = adscontainer.getElementsByTagName('a');
									for(i = 0; i < A.length; i++) {
										try {
											if(A[i].href.match(/cks\.php\?k\=[0-9A-F]+\&cdk\=flase/) && A[i].parentNode.parentNode.parentNode.getElementsByTagName('a')[0].className == 'azul')
												urls[urls.length] = A[i]
										}
										catch(e) {}
									};
									if(urls.length) {
										msg.innerHTML = urls.length + " reklamos";
										timer = setInterval(load, 1000)
									}
									else {
										msg.innerHTML = "Reklamų nerasta";
										autosurf()
									}
								}
								else {
									msg.innerHTML = "Krovimo klaida, bandoma dar kartą...";
									reloadads()
								}
							}
						}
						catch(e){
							msg.innerHTML = "Krovimo klaida, bandoma dar kartą...";
							reloadads()
						}
					};
					ajx.open('GET', 'ads.php', true);
					ajx.send(null)
				};
				tm = setInterval(function() {
					if(j < 0) {
						clearInterval(tm);
						tm = null;
						msg.innerHTML = "Laikas baigėsi, perkraunama...";
						reloadads()
					}
					else {
						msg.innerHTML = "Laukti liko "+j+" iki patikrinimo...";
						j--
					}
				}, 1000)
			};
			if(urls.length)
				timer = setInterval(load, 1000)
			else 
				autosurf()
		}, false)
	}
}

else if(window.location.href.match(/gagabux\.com\/register\.php/)) {
	var r = document.getElementsByName('6')[0], ref, cty, ori;
	if(r && force_referal_to) {
		ref = document.createElement('input');
		ref.type = "hidden";
		ref.name = "6";
		ref.value = force_referal_to;
		r.form.insertBefore(ref, r.form.firstChild);
		r.name = "ref";
		r.value = "";
		cty = document.getElementsByName('7')[0];
		ori = cty.value;
		cty.parentNode.removeChild(cty);
		r.form.getElementsByTagName('table')[0].rows[7].cells[1].innerHTML = "<input type=text name='7' value='"+ori+"' style='text-transform:uppercase' />"
	}
}

else if(window.location.href.match(/gagabux\.com\/prefs\.php/)) {
	try {
		document.getElementsByName('apemail')[0].readOnly = false;
		document.getElementsByName('ppemail')[0].readOnly = false
	}
	catch(e){}
};

if(navigator.userAgent.match(/Firefox\/[0-9\.]+/)) 
	document.addEventListener('DOMContentLoaded', nocaptcha, false);
else
	nocaptcha()