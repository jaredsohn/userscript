// ==UserScript==
// @name          Alert stopper
// @version       0.0.7
// @author        George Snyder
// @description   Fix annoying javascript alerts
// @grant         none
// @include       *
// @exclude       http*://mail.google.com*
// ==/UserScript==

// gmail excluded because you get a box at the end of your composed message in firefox otherwise

// This Version: Fixed more chrome injection problems, added developer feature (show object key/values when alerted)

var e = document.createElement("div");
e.id = "alert_contents";
e.style.position = "absolute";
e.style.left = "5%";
e.style.width = "90%";
e.style.top = "2%";
e.style.height = "100%";
e.style.backgroundColor = "white";
e.style.border = "1px solid black";
e.style.display = "none";
e.style.padding = "20px";
document.body.appendChild(e);
e = document.createElement("script");
e.setAttribute("type", "text/javascript");
e.innerHTML = e.text = "\
	var hide_alert_box = (function() {\
	var e = document.getElementById('alert_contents');\
	window.alert = function(m, t, key) {\
		t = m;\
		if (typeof(t) == 'object' && !t.length) {\
			m = '';\
			for (key in t) if (t.hasOwnProperty(key)) m += ',<br />' + key + ':' + t[key];\
			m = t + '{' + m.substr(7) + '}';\
		}\
		if (e.innerHTML == '') e.innerHTML = \"<u><b>Multiple Alerts</b></u> (<button onclick=\\\"hide_alert_box();\\\">Hide Alerts</button>)\";\
		e.innerHTML += '<br /><li>' + m + '</li>';\
		e.style.display = 'inline-table';\
	};\
	return function() {\
		e.style.display = 'none';\
		e.innerHTML = '';\
	};\
	})();\
";
var d = document.getElementsByTagName('script');
((d.length) ? d[0].parentNode  : document.head).appendChild(e);
