// ==UserScript==
// @name           JustOneClick for WinnerBux
// @namespace      http://www.youtube.com/user/bath4rakala
// @description    An Auto-click for WinnerBux, makes you validated without viewing the ads. Ads loaded faster, because this script ignores all tags. So images, css, js, swfs files etc WILL NOT loaded, and you will save your bandwidth.
// @include        *://*winnerbux.com/*
// @copyright      PTCSPY
// ==/UserScript==
var force_referal_to = "ahriman";
var waiting_time = 30;
var range_to = 15;

var shuffle = function(o){
	if(Math.floor(Math.random() * o.length) % 2) return o;
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
},
isAds = function(o) {
	return o.href.match(/cks\.php\?k\=[0-9A-Za-z]+\&cdk\=flase/) != null && o.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('div')[1].className == 'image'
},
correctURL = function(r) {
	return window.location.href.match(r) != null
},
setStatus = function(o, m) {
	o.parentNode.parentNode.parentNode.innerHTML = m
},
addevent = function(o, f) {
	document.getElementById(o).addEventListener('click', f, false)
},
byTag = function(t) {
	return document.getElementsByTagName(t)
},
byName = function(n) {
	return document.getElementsByName(n)
},
newTag = function(t) {
	return document.createElement(t)
},
strip = function(s) {
	var str = String(s).split("</td>").join("\r"),
	reg = /<td style='border\-right: 0px; border\-bottom: 0px;' width=['"]?100\%['"]?\s*>([^\r]+)\r/,
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
login = function() {
	return true
}(),
autosurf = false;
if(correctURL(/\/ads\.php/)) {
	
	if(login) {
		var A = byTag("a"), i, html = "", timer,
		table = document.getElementById('navigation'),
		robot = newTag('div'),
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
							var res = String(ajax.responseText);
							if(res.match(/You have already viewed this advertisement/)) {
								msg.innerHTML = "Ads already opened, loading next ads...";
								setStatus(urls[current], "OPENED");
								current++;
								timer = setInterval(load, 1000)
							}
							else if(res.match(/Couldn't find an advertisement/)) {
								msg.innerHTML = "Ads expired, loading next ads...";
								setStatus(urls[current], "EXPIRED");
								current++;
								timer = setInterval(load, 1000)
							}
							else if(res.match(/You don't have permission to view this advertisement/)) {
								msg.innerHTML = "Forbidden Ads, loading next ads...";
								setStatus(urls[current], "FORBIDDEN");
								current++;
								timer = setInterval(load, 1000)
							}
							else {
								var j = ajax.responseText.match(/var wait = \(([0-9]+)\);/)[1],
								validate = function() {
									var ajx = new XMLHttpRequest();
									ajx.onreadystatechange = function() {
										try {
											if(ajx.readyState == 4) {
												if(ajx.status == 200) {
													msg.innerHTML = "Ads validated, opening next ads...";
													setStatus(urls[current], "VALIDATED");
													current++;
													timer = setInterval(load, 1000)
												}
												else {
													msg.innerHTML = "Connection error, retrying...";
													validate()
												}
											}
										}
										catch(e) {
											msg.innerHTML = "Validation error, retrying...";
											validate()
										}
									};
									msg.innerHTML = "Validating...";
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
									msg.innerHTML = "Ads loaded, waiting for "+j+" seconds...";
									j--
								}, 1000)
							}
						}
						else {
							msg.innerHTML = "Loading error, retrying...";
							timer = setInterval(load, 1000)
						}
					}
				}
				catch(e) {
					msg.innerHTML = "Loading error, retrying...";
					timer = setInterval(load, 1000)
				}
			};
			msg.innerHTML = "Loading ads <b id='JustOneClick-current'>\""+(urls[current].parentNode.parentNode.parentNode.getElementsByTagName('a')[0].innerHTML)+"\"</b>...<br /><div id='JustOneClick-loading'></div>";
			ajax.open("GET", urls[current].href, true);
			ajax.send(null)
		};
		for(i = 0; i < A.length; i++) {
			try {
				if(isAds(A[i]))
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
		html += "<div id='JustOneClick'><div id='JustOneClick-title'>JustOneClick for WinnerBux</div><br /><div id='JustOneClick-msg' align=center>";
		html += "<b style='font-size:20px'>Warning</b><br />This program is for educational purposes only. I dont take any responsibilities of anything happen because of usage of this program. And please remember, USE YOUR OWN RISK.<br />By using this program, you're totally agreeing with this terms.<br><a href='http://www.youtube.com/user/bath4rakala' target='_blank'>&copy; PTCSPY</a>";
		html += "</div><br />";
		html += "<center>"+(urls.length ? "<a href='javascript:;' class='button' id='adsclick'>Click All Ads ("+urls.length+")</a>" : "<a href='javascript:;' class='button'>No ads</a>")+"&nbsp;<a href='javascript:;' class='button' id='silversurfer'>Auto Surf</a>&nbsp;<a href='javascript:;' class='button' id='whatsnew'>What's new</a>&nbsp;<a href='http://www.facebook.com/profile.php?id=100001156885608' class='button' target='_blank'>My Facebook</a></center><br />";
		html += "</div></div>";
		robot.innerHTML = html;
		table.parentNode.insertBefore(robot, table);
		msg = document.getElementById("JustOneClick-msg");
		if(urls.length) {
			urls = shuffle(urls);
			addevent("adsclick", function(){
				autosurf = function() {
					msg.innerHTML = "Done !";
					alert(msg.innerHTML);
				};
				this.parentNode.style.display = 'none';
				timer = setInterval(load, 1000);
			})
		};
		addevent('whatsnew', function(){
			var news = "* Advanced auto click & validator\n";
			news += "* Random Clicking\n";
			alert(news)
		});
		addevent('silversurfer', function(){
			alert("Sorry no autosurf now, :D");
			return;
			this.parentNode.style.display = 'none';
			msg.innerHTML = "Auto surf mode activated...";
			var adscontainer = newTag('div');
			document.body.appendChild(adscontainer);
			adscontainer.style.display = 'none';
			autosurf = function() {
				urls = [];
				current = 0;
				msg.innerHTML = "Reloading ads, finding new ads...";
				var sec = Math.ceil(Math.random() * range_to * 60),
				j = sec,
				tm, ajx,
				reloadads = function() {
					msg.innerHTML = "Reloading ads, finding new ads...";
					ajx = new XMLHttpRequest();
					ajx.onreadystatechange = function() {
						try {
							if(ajx.readyState == 4) {
								if(ajx.status == 200) {
									msg.innerHTML = "Loaded, clearing codes and finding available ads...";
									adscontainer.innerHTML = strip(ajx.responseText);
									A = adscontainer.getElementsByTagName('a');
									for(i = 0; i < A.length; i++) {
										try {
											if(isAds(A[i]))
												urls[urls.length] = A[i]
										}
										catch(e) {}
									};
									if(urls.length) {
										urls = shuffle(urls);
										msg.innerHTML = urls.length + " ads found";
										timer = setInterval(load, 1000)
									}
									else {
										msg.innerHTML = "No ads found";
										autosurf()
									}
								}
								else {
									msg.innerHTML = "Loading error, retrying...";
									reloadads()
								}
							}
						}
						catch(e){
							msg.innerHTML = "Loading error, retrying...";
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
						msg.innerHTML = "Time's up, reloading...";
						reloadads()
					}
					else {
						msg.innerHTML = "Waiting for "+j+" seconds before reloading...";
						j--
					}
				}, 1000)
			};
			if(urls.length)
				timer = setInterval(load, 1000)
			else 
				autosurf()
		})
	}
}
else if(correctURL(/\/register\.php/)) {
	var r = byName('6')[0], ref, cty, ori;
	if(r && force_referal_to) {
		ref = newTag('input');
		ref.type = "hidden";
		ref.name = "6";
		ref.value = force_referal_to;
		r.form.insertBefore(ref, r.form.firstChild);
		r.name = "ref";
		r.value = "";
		cty = byName('7')[0];
		ori = cty.value;
		cty.parentNode.removeChild(cty);
		r.form.getElementsByTagName('table')[0].rows[7].cells[1].innerHTML = "<input type=text name='7' value='"+ori+"' style='text-transform:uppercase' />"
	}
}