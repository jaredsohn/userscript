// ==UserScript==
// @name		Pole Reporter 9001
// @description	El sistema definitivo para mantener a raya a los derps
// @version		9001
// @namespace	dummy
// @match		http://www.elotrolado.net/hilo_*
// @include		http://www.elotrolado.net/hilo_*
// ==/UserScript==

/*
	Copyright (c) 2012 Marcos Vives Del Sol

	Permission is hereby granted, free of charge, to any
	person obtaining a copy of this software and associated
	documentation files (the "Software"), to deal in the
	Software without restriction, including without limitation
	the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the
	Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice
	shall be included in all copies or substantial portions of
	the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
	KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
	WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
	PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
	OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
	OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
	SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// Auxiliary functions from S4X8 c2.js
var HTTPPOST = function(url, callback, fields) {
	var req = new XMLHttpRequest();
	req.open("POST", url, true);

	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.onreadystatechange = function() { callback(req) };

	var poststr = "";
	if (fields != undefined) {
		for (field in fields) {
			poststr += field + "=" + encodeURIComponent(fields[field]) + "&";
		};
		poststr = poststr.substr(0, poststr.length - 1);
	};
	
	req.send(poststr);
};

if (Node.prototype.prependChild === undefined) {
	Node.prototype.prependChild = function(child) {
		if (this.firstChild) {
			this.insertBefore(child, this.firstChild);
		} else{
			this.appendChild(child);
		};
	};
};
// End

var quickReporter = function(post) {
	if (!confirm("¿Estás seguro de que quieres reportar este mensaje?")) return;

	var reportUrl = post.getElementsByClassName("report-icon")[0].firstChild.href;

	var fields = {
		reason_id: 1,
		notify1: 1,
		notify0: 0,
		report_text: "Flood de poles",
		submit: 1
	};

	var callback = function(req) {
		if (req.readyState == 4) {
			if (req.status == 200) {
				if (req.responseText.indexOf("Se ha informado de este mensaje correctamente") != -1) {
					alert("¡Mensaje reportado con éxito!");
				} else {
					alert("Incapaz de reportar el mensaje (¿tal vez lo estaba ya?)");
				};
			} else {
				alert("Error: el servidor ha respondido con un código " + req.status);
			};
		};
	};

	HTTPPOST(reportUrl, callback, fields);
};

var addQuickIcon = function(post) {
	var icons = post.getElementsByClassName("profile-icons");
	if (icons.length == 2) {
		var icon = document.createElement("li");
		icon.className = "quickreport-icon";

		var link = document.createElement("a");
		link.innerHTML = "<span>Reportar Pole</span>";
		link.addEventListener("click", function() { quickReporter(post); }, false);

		icon.appendChild(link);
		icons[1].prependChild(icon);
	};
};

var style = document.createElement("style");
style.setAttribute("type", "text/css");
style.innerHTML = ".quickreport-icon { width: 20px; height: 20px; background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAoCAMAAADJ7yrpAAAAAXNSR0IArs4c6QAAAv1QTFRFAAEABgAAAAIAAQQAAAUJAwUBAAcKDQYFBwoGCgwICw0KDA8LMgUAEQ4SEg8TDxENRgIDEBIPNQgGVgAAExQSGRUUGhYVFBgaFhgVQQ0LHRgSGBkXIxcOGRsYOhIQIhkZHxsaHx4hJh0dKR0VIR8iIx8eJSEgmQIAIyIlKiEhpAEAJSMmrgACIiYorQAJJyUoYhYWpAQNcBMXuAAIwwAAKSoougIKMSkfMygkKCwuNygqzgAE0AAAKy0qLiwwLS4s2QABLi8tgRoQLzEuLjI06AAAMDIvPi4w6QABMzE1dCAh5wAMLzM16QAN8AAGMzQy9AAAOzMp8gAIMTU38wAJQDEzhB8e1QoA6gQCTzEU9gIA/QAA/AAD/QAF/wAA/wAAMzc59gIMgCMi/wAHOTgx6wgEQDY2NTk79wYAQjgpPzkzNzs9uhkaOT0/oiEh7Q4FOj5A+AwOrSIb7hARPEFDoCgiPkJF2hke+xME8RYJnzAp8xsLgTk1vCkqR0lGZUQgXUclVUol/xwJ/xsUWkk2SExOSU1PUExKOlYtSk5QZUovXEtNTFBSN1ovX006lz42UlBUyDQm0DIj+ycTT1RWV1ZO/ywL/y0fWFpXhVA3eVUwaFZZgFM9h1UjtUgjbltHilcelVM/Zl9ZgFhW/jggZWBfaGFbiFpEcWBRX2Rml1hN/kAOjF1Bjl48mV4ovFFHe2dTfWlV+0gpoGE+d21igmxTcXBo3FU/im1QnmhU/lIUdnJwmGteeXRziHRgrW4xe3Z1ymU4dnh1kHRc/Fk2/Vo3uHEpgnp0hXtvhnxww25MnHtSr3dEhH9+kn9wxXcqxXVQw3syuHxW8HAqwH46qoJbkYd7pYVhrIRdtoFenods/nBFsYRkrYZkq4pmtIpdpo1tuI9nwI5dspJ0yo9U0o5J/IJMv5RmwZdv2pRJ/YlQ7pExzppo3pZl+JQ3+5Yw0p1l/Zcy0p5s/5k02KJq3KRm7Kxp9q5n/a5p9LJp+7Jr9rRr/LNs97Vs/bRtzrNnWgAAAAF0Uk5TAEDm2GYAAAGnSURBVCjPY2CgGPSiAKjYv39/vmytyy5Z8ebvvyNxvVDB3zcK2no6W7PtDm+KOwoV/HPfJdeWX0LEJ80s7vY/qOA3f0u24APHl4aaBBh8gAmelmZ1vvbi09viAAHWFphgHyfnosdX56RWrJJg4oQJZrHKnni4MCDowgNVJjaYYCar+JaDAd4zr1xXY2L5DBXs4uSsSa5ee+blBgkmGZjgfj7hmPI7T5/sc+RmWQATfOcUp6M2YeUUUxF95XcwwV1xhp4aggpiuna85z/DBONWXzTXTkhPV5Q69hEmiDWU6AeQrO5orIfH0a/nU8uyc9vvfX82vbkeKvhzIySOrPonJ09vhAj+2gGJI/ek8KAlrzoggl/dgHF0aO/sMAdXvVM/oH6fD4yjs7dubk9NVeexgIV8CifnjHPL81ILa+UY4XFkzyq7e2dRaurEPfKIOLJnFV08Kci1dPNJFUQcBbIL5SRWVq15tEiCiR0mOEtSK9V7/aW724BxFAkV7LhsnGpj1A2OI77XUMHGaQHWXpqQOFoHi476pqZ5SuA44p2LiKP6hg5y4wgAyGfnQwGzEMIAAAAASUVORK5CYII='); }";
document.body.appendChild(style);

var posts = document.getElementsByClassName("post");
for (var i = 0; i < posts.length; i++) {
	addQuickIcon(posts[i]);
};

