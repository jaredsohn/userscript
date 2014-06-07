// ==UserScript==
// @name           Facebook Mob Wars Helper V3.0 Beta
// @namespace      http://www.assembla.com/spaces/fbmwah/
// @description    Helps and improves the playing experience of the Facebook application MobWars with automatic functions.
// @version        3.0 Beta
// @include        http://apps.facebook.com/mobwars/*
// @include        http://apps.new.facebook.com/mobwars/*
// @include        http://www.facebook.com/common/error.html
// @copyright      This script is under a GNU General Public License v3.0 or later
// @unwrap
// ==/UserScript==
var version_scriptNum = 43367;
var version_timestamp = 1245077373385;
var f = "2.25s";
var g = false;
var h = false;
String.prototype.z = function() {
	var v = this;
	return v.split("").reverse().join("");
};
function l(aT, aU) {
	var aV;
	if (h) {
		aV = 0;
	} else {
		aV = UserPrefs.loglevel;
	}
	if (UserPrefs.logstuff) {
		if (aU >= aV) {
			var aW = GM_getValue("MWAutoHelperLog", (new Date).getTime() + ":Logging Begins").split("|");
			aW.push((new Date).getTime() + ":" + aT + " (Log Level " + aU + ")");
			if (aW.length > UserPrefs.loglength) {
				aW.splice(0, (aW.length - UserPrefs.loglength));
			}
			GM_setValue("MWAutoHelperLog", aW.join("|"));
		}
	}
}
if (g) {
	if (SupportVersion != "2.1a") {
		alert("Wrong support files!  May not function properly!");
	}
}
function m() {
	for (linker = 0; linker < document.links.length; linker++) {
		if (!document.links[linker].href.match("#stop")) {
			document.links[linker].href += "#stop";
		}
	}
}
function n(aT) {
	if (aT || (parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date).getTime())) {
		try {
			GM_xmlhttpRequest({
				method: "GET",
				url: "http://www.SecureWorldHosting.com/MWAutoHelper/Version.php",
				headers: {
					'Cache-Control': "no-cache"
				},
				onload: function(aX) {
					GM_setValue("lastUpdate", (new Date).getTime() + "");
					var aY = aX.responseText;
					if (parseInt(aY.substr(4)) > parseInt(version_timestamp)) {
						l("There is an update available for \"FaceBook MobWars Auto Helper(TM) V" + f + ".\"\nWould you like to go to the install page now?", 2);
						boss.updateavailable = 1;
						boss.save();
						if (aT) {
							if (confirm("There is an update available for \"FaceBook MobWars Auto Helper(TM) V" + f + ".\"\nWould you like to go to the install page now?")) {
								GM_openInTab("http://www.SecureWorldHosting.com/MWAutoHelper/Update.html");
							}
						}
					} else {
						l("No update is available for \"FaceBook MobWars Auto Helper(TM) V" + f + ".\"", 2);
						boss.updateavailable = 0;
						boss.save();
						if (aT) {
							alert("No update is available for \"FaceBook MobWars Auto Helper(TM) V" + f + ".\"");
						}
					}
				}
			});
		} catch(aU) {
			l("An error occurred while checking for updates: " + aU, 2);
			if (aT) {
				alert("An error occurred while checking for updates:\n" + aU);
			} else {
				var aV = document.getElementById("scriptupdate");
				if (aV) {
					aV.innerHTML = "<center>An error occurred while checking for updates: " + aU + "</center>";
				}
			}
		}
	}
	if (boss.updateavailable) {
		var aW = document.getElementById("scriptupdate");
		if (aW) {
			aW.innerHTML = "<center><a id=\"update\">There is an update available. Would you like to go to the install page now?<br>(will open in a new tab)</a><br><br></center>";
			var button = document.getElementById("update");
			if (button) {
				button.addEventListener("click", function() {
					GM_openInTab("http://www.SecureWorldHosting.com/MWAutoHelper/Update.html");
					boss.updateavailable = 0;
					boss.save();
				},
				false);
			}
		}
	}
}
GM_registerMenuCommand("FaceBook MobWars Auto Helper(TM) V" + f + " - Manual Update Check", function() {
	n(true);
});
var q = true;
var t = new Object;
t.pageWidth = function() {
	return window.innerWidth != null ? window.innerWidth: document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth: document.body != null ? document.body.clientWidth: null;
};
t.pageHeight = function() {
	return window.innerHeight != null ? window.innerHeight: document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight: document.body != null ? document.body.clientHeight: null;
};
t.posLeft = function() {
	return typeof window.pageXOffset != undefined ? window.pageXOffset: document.documentElement && document.documentElement.scrollLeft ? document.documentElement.scrollLeft: document.body.scrollLeft ? document.body.scrollLeft: 0;
};
t.posTop = function() {
	return typeof window.pageYOffset != undefined ? window.pageYOffset: document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop: document.body.scrollTop ? document.body.scrollTop: 0;
};
t.posRight = function() {
	return this.posLeft() + this.pageWidth();
};
t.posBottom = function() {
	return this.posTop() + this.pageHeight();
};
var u = new Object;
u.mouseOffset = null;
u.iMouseDown = false;
u.lMouseState = false;
u.dragObject = null;
u.curTarget = null;
u.CloseImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAATCAYAAABlcqYFAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAABNpJREFUSEu1VWtQVGUYPoyCFKITMtMo64+0XVh1BEkcCPACgyBQWouFlpAGuxhYgyOXEBAlVu6I1xYlbMZsEDIyBY3LFDAuGDAgAoJggIossHFHd2F5er+zitrtV53ZZ973e7/nMt+eM+cYpHs5wtRoNmdiaMSNT2r5OtdoFmdiZMjNp2pqbMjxF+gHA76BATjdtAE3PQ1Oq5viNNPT3KMpHTeh1XGj2kluTDtFHrP5OkaeXNhGJ0xOTmJqamqmsv6/gr/bBnDRHk4YqVWiR5EG9YUcDBJGCOP5X+FRfg403+VAS5i8+Cc8mWuIM0EYI/5Inl6vzs3h/QZLr8DfZS24g5ucZ0L6aGMgKxVDhNEzqZggPM5O+0dostPGHxNnnDBCYDqmZz5PQ/zWO4JL8Hx2EtWXKRhQpGBQkYzRrGQo9oXB533ZDBRhYdBmpyArLPzFOfFGiM90A+ShOpUyE7JjrT04OYUMV1XgXkY8Hh6JR19mPNRHD2H42CFI3pNCp9Nhmu4wAwtUhIb+7XyINEzH9D3kcz/jC6gLL+JDh9XgkjY5YrCyFJ0JEbgnj0APoe9wBH5PjMDJkBDemD0ELIxVtmYPClszbPUN4nkDxFeRrkcejm7y6pRHor/gPD6wswGX6G6PgZIraA2XoiNChq5IKR58LoUqSorhGBlOyqS8sUajgVarnamsZwEnpIEYipail/j3SddJeubTFi7Dw2/OwNdaTH+Xqx0eXs5HfYAE9f7eaPrIC62Eu7u80B8swUCwD477+/FBvb29UKlUPFjAMZr3f8I4EnTs1Otu+Xuh3s8bDeTXmZUBH6sl4OIcxGg6kYoLQjMUrVqEEkK57UJUv7EQt1bOQzMheeMG/j48H8JCk2jeRPsMSuIzHdMX2ixCnvAVKEMD4DZvDoXYW6ExMxHnBMb4fsnLuLz0JRS/boxyoTEahLOQ7OrEB3R2dqO7+xm6urrpdFIkuTjxvJ+J/9NSY15/kXzOL56DyhA/uJrMenKSkynIFc3DD8tMUbTcFGUrTFC50gRJHuv4gLa2drS367HVV4o7d/Q9q3wQ8SqIX0o6pi8gnzzyU+7dBbf5RuAOOIpx+3Q6ClaZo2iNOUocFqDccQGq1prxAU3NLWhp0YMFJG924Y2bn8ybac7WSmczXldiv4D3uWRrjpooGdzNjem18qYY7eeO4qrLYpR5CFDpJUD1ZgHq3rVAiu9G3uAp2Lp1+yKkbvvrvPYdC1S/JUCFpwBl7gIUu7+G+sOheNtiLrj9TsvQlX8KFRIrVG2zRI2fJRo+FqEpSITWPSJ0hAr/Fe2fCXE7WIRGmQj1u0So2WEJJfkod65B7fED8FvxKp1k3XI8uKTArwG2qAm0RV3QKrREWqMt2hpdqdb4LdEadxOs0R6nn7G9pjAbNIbavNDf/NQG9SGrcXOfK+5k7sG38XuRtN2DPhB0fS1xwnjhWfTnxqKvIA79P8ZBfeUABq/FYLAsBsMVhOpojNZFYeRGNIavx2DoF9orpvlzvfpqLNTX5LiZm4CzsbsR6ChEA72N+ZAjnnbI83XG6S12iFwvxH4XIQ5usoRcIkbSVjESfcR8L98iRsJmK8R7W/H7se6iF/poNyGiXIVI916O3N2eaKFX/vX0uLn6L97/dN3IjJ8J+AMe8JY5/wGqmwAAAABJRU5ErkJggg==";
u.MaxiImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAATCAYAAABlcqYFAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAABHZJREFUSEu1lXtMV2UYx1/UmBqpWy1yKi0FFQV+aCaEAVazXK7LsrBZ1kZTNMM7CJqYSCqgoCIZGij3i1zkIiCo/EAU9QcEgvy4yU2Mi1pmIgbIp/cc5x84G27Ns33P8z7n+zzP93ne854dg3n70zA0Gi0MjUYJw+eNxNDhI4QQBsJg6DAxZMgwIW/SH+SiX/CgT/T3S/xzX/Te6xI9d++Inr9vqxDvLlxCb28vfX19zwzC4ZMvKWq8QeSlZmJ0LcSUXOdYcRtJ5e2klHeQUnGD9Cs3OVGl4BaZ+luk6/9QrQLlWYbk0ypuklreSbLMU/LjS1qJ1V0jv74T8dZHi5+9iN2Hi/5TZJN/KJ8tcnkqbJaxjyZJLGlXJ4krbn04ic0HThTWdnC44CqhZxsIL2oi4tI1onStavGenh71nQ0GJTa2tI1omRcp88OLGgk738iZ6jbEzHmfkqdvIyivmmBtDQe1dapY2LlGVeRpD4USG3GhmSPnmggtbCCkoI4QbS3Zl39HWLz9MVmXr7PrRAV+mZXszq4iIKeG/WdqBoh8/sXyJ27boyYUkWDtVZlXS2BuDQEnq/DLqiRZHiZhar+AhIsNrI+5iFvsJTbGl7ApqQyvlDK1aHt7Ox0dHeraN0ePryywK6cWP9nI47x3xhW8jpezObkMz4Ri3OJ0hMuJxAhzR9yiCxm7/CjjXcMxWROFmVs80z2PsdBpoIj9rhzs/U7h4H8ae99TLHysiZlb07DwTGSKewITZR0T1wiWhpxGPDfFge+P5jPymxBecD7MGJcwjFdFMmFDnCrS3NxCS0uL7HqZWnQAnJYN4M08kmSTMYx1jeKlZWGMdv6VxUEnEYZTHVkdUcgo51BeXHoE4+/CGbcxHhOfNLVgXV099fX1qn0SFE6B0oSZdyqT3JOYsDqGcSvCpdARlgTnIoabz8U99jzGLkd5RRIma2J51TudiYFZqkhVlR69fnAoItN8s5i6JVVudyKvrYph/MoInA9pEaM07+MlRczWJjBpbRxmnslM3pOD+S95vOMRoHb4NJjnthtNUB6WO7Ox8ErHfEMSZuviWRFWiBhr58SexHPYbcvA0vM4VtsymXGwgBnROmYcL8U6pxKrPD3Tz9Yw7WI15rqHVvGttdW8fqqSWRnl2CSUYhN2Adv9WmbvyGWWFLLalMqayCKEg/MPbA2KxCO+lPmBWubs1WIbqcMmrRzb0zXYFF7ljeImrCta0FS1otFLSKv4s0uasJNftl1+PY6ZVTgmlDM3TIf9vgLm7MzlzW1ZuCf8htiekm9qOv8r1vsf4kBaEVHV7ezuuIP7n13MuXsPs+5uJvT28HJfD2Me9DKyvxdDCcUqvrHkTO7fZ3JXN/Z/deHReYe9rbcJbrjBz9Wd7Ci7hViZrDPwyS4xXeATzUzXQCxdtmO1egcad380nnvQbAnE+sd9WHoHYelzAMufJHzkensQGvlc4TWbA7DeKGPX7USz0geLb7cy/WsPbD0O8l5QNmJfabvRYD++/8v/Cwij5/nyGzrvAAAAAElFTkSuQmCC";
u.MiniImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAATCAYAAABlcqYFAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAABJtJREFUSEu1lWlQU1cYhq9LGa3Wbrai1dopuKAGgp2qA1ZbW1unTpepjs7UbmOrqJVxoSoooJTF1gUQUQSFsicEFYEowYVFAgiaCCYQIhQwlE2wrdaVJU9Pov/6Q3/UO/Pcc+93vve8575zZ86A+VE5OAx/XnIYPkJyGDZcGjRkqDRg4GBp4KDBkrhJT3RZ+yWrtU+iv0+yPrgv9dy5LfXcviW4KT249Zckvb/oa3p7e+nr63tqSHM+X0Z5UxcplddIv2ghXdeKSt+OqrqD49VdnDB0kW3oJtcoqL2BuqYbtW18RK54zzHeIPtKl70/80oHGZfbUejbUFxqoaShC2n2p1/+bybHqq7/x+R8/XUkj0+WPlUT+5fM/HgJ2qudHD7/O/EljSSVN5NcYSHtUpuIrg1VVYeI7joqEYdKRJcpolMJMkV8tlqmrV7diaKqkzQRc1plKykXLPZ1ErRNnKvrRJo+/wsKTe3sL6zjQJGZmKJ64oTZkdJmEstbSK5sI1UYpunaSdd3PKLTPqbpbLTb55MqWkkot9h1Nv2h4gYOFl9FY+xAmvbeZ+RdaeWXkwZ2nTKyR1NL+GkTkQX1RBU2cKC4kZiSJmJLrwksxNkoayG2zGJ/j9U2c1DMR4s+W/++c2YiztSxN7+W3Xk1ZOlbkJzfWYiqohGf9Ao2KSrZkqFj61E927KqCcwxEKQ2EnKqhjCNibD8Onbmm9l52kyYwDbu1NQRnFdL0MkaAnONBGRVCf1lfFU6NisvkqStRxrqMpdNaVpGr0pkrHcSr69PxeknJRN9M/nAK5RFS72eiPmrQ5EFZDNJ6Jx8lIzfkMq4tcn8cLgI6ZlJc1ibWMyz38by3PLDvOCVwCs/JuO4XsGiJSvp7+/HarU+lsViM+P8jjN6fTqvCv2LqxIYsfwIy6LPIjlMnsu6ZK0oxPPyit8YtSZJNCp5bdtxu0l9fQMNDY9n8dKVjA3NZWyAMNqoxFEYjVyRyDcxBUhDXN5ls6KMUV6JOK62xaVgvO8x3ghR201qa02YTI/HZvJmxFmcQtWM9zsm4lIwZk0K3x8qRBrh9hGBwmTCBhVOG5RMEJ88WRhMEYJ5PruxiZ+EeVvCcYkvYWrkWVyCTzJxaxYTNqpYnVCKNNpjCXuPluIRpEbmdwLXoFO47z2He1wZ7umXkOdcxu20AVmhiamlZqaUm3G5KKgwM7XEbK/Lzxhxz67CXanjrSNa5BEFyIPzcN2azbqUCqQ5y/3Zvj8F3ww9CyKK8IwUxF7AI1WHp/h9ZxZcZYa2kbd1zciNFuQ1Lbia/kBe24LcYLHXbfOzCuuZpTYwW2zMM07oI4qZEZLP5owq7MeF84Kv8NkdR3ROOal1HSQ0dRPb+jf7uu8QfPMennfv4dzTg2NfDyP7exlm7cVBMEw8vyRqYx7cx1n0eN66y8/d/xAltDG2NWq6CNP/+dAkRKNzXhiSxnTvCGRewbh5h+G2cRfufuHI/SNxC9yHfEcUsuD9yEIEodFMC4nGNTgKt+2RuAaE4+q3B7dNvyLzDmWa1w5cvvPHwz+eD6M1D03WaUziGHx617+qffkLBfW4HQAAAABJRU5ErkJggg==";
u.mouseCoords = function(aT) {
	return {
		x: aT.pageX,
		y: aT.pageY
	};
};
u.getMouseOffset = function(aT, aU) {
	var aV = this.getPosition(aT);
	var aW = this.mouseCoords(aU);
	return {
		x: aW.x - aV.x,
		y: aW.y - aV.y
	};
};
u.getPosition = function(e) {
	var aT = 0;
	var top = 0;
	var aU = 0;
	while (e.offsetParent) {
		aT += e.offsetLeft + (e.currentStyle ? parseInt(e.currentStyle.borderLeftWidth).NaN0() : 0);
		top += e.offsetTop + (e.currentStyle ? parseInt(e.currentStyle.borderTopWidth).NaN0() : 0);
		e = e.offsetParent;
	}
	aT += e.offsetLeft + (e.currentStyle ? parseInt(e.currentStyle.borderLeftWidth).NaN0() : 0);
	top += e.offsetTop + (e.currentStyle ? parseInt(e.currentStyle.borderTopWidth).NaN0() : 0);
	return {
		x: aT,
		y: top
	};
};
u.mouseMove = function(aT) {
	var aU = aT.target;
	var aV = u.mouseCoords(aT);
	if (u.dragObject) {
		var aW = u.dragObject.style.position;
		u.dragObject.style.position = "absolute";
		u.dragObject.style.top = (aV.y - u.mouseOffset.y) + "px";
		if (parseInt(u.dragObject.style.top) < 0) {
			u.dragObject.style.top = "0px";
		}
		if (parseInt(u.dragObject.style.top) > t.pageHeight() - 55) {
			u.dragObject.style.top = (t.pageHeight() - 55) + "px";
		}
		u.dragObject.style.left = (aV.x - u.mouseOffset.x) + "px";
		if (parseInt(u.dragObject.style.left) < 0) {
			u.dragObject.style.left = "0px";
		}
		if (parseInt(u.dragObject.style.left) > t.pageWidth() - 55) {
			u.dragObject.style.left = (t.pageWidth() - 55) + "px";
		}
		u.dragObject.style.position = aW;
	}
	u.lMouseState = u.iMouseDown;
	return false;
};
u.mouseUp = function(aT) {
	if (u.dragObject) {
		var aU = u.dragObject.style.left;
		var aV = u.dragObject.style.top;
		var aW = aU + "|" + aV;
		GM_setValue(u.dragObject.id, aW);
	}
	u.dragObject = null;
	u.iMouseDown = false;
};
u.mouseDown = function(aT) {
	var aU = aT.target;
	u.iMouseDown = true;
};
u.addAttributes = function(aT, aU) {
	if (aU !== undefined) {
		for (var aV = 0; aV < aU.length; aV++) {
			aT.setAttribute(aU[aV][0], aU[aV][1]);
			if (aU[aV][0].toUpperCase() == "TITLE") {
				aT.setAttribute("alt", aU[aV][1]);
			}
		}
	}
};
u.newImage = function(aT) {
	var aU = document.createElement("IMG");
	this.addAttributes(aU, aT);
	return aU;
};
u.newDiv = function(aT, aU) {
	var aV = document.createElement("DIV");
	aV.innerHTML = aT;
	this.addAttributes(aV, aU);
	return aV;
};
u.removeElement = function(aT) {
	if (aT) {
		if (aT.parentNode) {
			aT.parentNode.removeChild(aT);
		}
	}
};
u.makeDraggable = function(parent, aT) {
	document.addEventListener("mousemove", u.mouseMove, false);
	document.addEventListener("mousedown", u.mouseDown, false);
	document.addEventListener("mouseup", u.mouseUp, false);
	if (!parent || !aT) {
		return;
	}
	aT.addEventListener("mousedown", function(aU) {
		u.dragObject = parent;
		u.mouseOffset = u.getMouseOffset(parent, aU);
		return false;
	},
	false);
};
u.createFloatingDiv = function(aT, aU, aV, aW, aX, aY, aZ, ba, bb) {
	var bc = 25;
	var bd = 25;
	var be = 20;
	var bf = "#ECECEC";
	var bg = parseInt(aU);
	if (bg < 5) {
		bg = 0;
	}
	if (bg > t.pageWidth() - 55) {
		bg = t.pageHeight() - 55;
	}
	var bh = parseInt(aV);
	if (bh < 5) {
		bh = 0;
	}
	if (bh > t.pageHeight() - 55) {
		bh = t.pageHeight() - 55;
	}
	if (aZ == true) {
		bd = 2 * bc;
	}
	if (ba == false) {
		bd -= bc;
	}
	var bi = this.newDiv("", [["id", aY], ["style", "position:fixed; width:" + aT + "px; top:" + bh + "px; " + aW + ":" + bg + "px; display:block; padding:1px; z-index:50; clear:both; border:solid 2px #C0C0C0; background-color:#FFFFFF;"]]);
	var bj = this.newDiv(aX, [["id", "dragDiv_" + aY], ["style", "text-align:center; font-weight:bold; height:" + be + "px; width:" + (aT - bd) + "px; float:" + "left" + "; cursor: pointer; border-bottom:solid 1px #C0C0C0; background-color:" + bf + ";"]]);
	var bk;
	if (aZ == true) {
		var bl = GM_getValue(aY + "_state", "max");
		bk = this.newDiv("", [["style", "height:" + be + "px; width:" + bc + "px; float:" + "left" + "; border-bottom:solid 1px #C0C0C0; background-color:" + bf + ";"]]);
		var bm;
		if (bl == "min") {
			bm = this.newImage([["src", this.MaxiImg], ["style", "cursor:pointer"]]);
		} else {
			bm = this.newImage([["src", this.MiniImg], ["style", "cursor:pointer"]]);
		}
		if (aY && aY != "") {
			bm.addEventListener("click", function() {
				if (bl == "min") {
					bl = "max";
				} else {
					bl = "min";
				}
				if (aY && aY != "") {
					GM_setValue(aY + "_state", bl);
				}
				if (bl == "max") {
					this.setAttribute("src", u.MiniImg);
				} else {
					this.setAttribute("src", u.MaxiImg);
				}
				var bp = document.getElementById(aY);
				bp = bp.firstChild;
				if (ba) {
					bp = bp.nextSibling.nextSibling.nextSibling;
				} else {
					bp = bp.nextSibling.nextSibling;
				}
				while (bp) {
					if (bl == "max") {
						bp.style.display = "block";
					} else {
						bp.style.display = "none";
					}
					bp = bp.nextSibling;
				}
			},
			false);
		}
		bk.appendChild(bm);
	}
	var bn;
	if (ba) {
		bn = this.newDiv("", [["style", "height:" + be + "px; width:" + bc + "px; float:" + "left" + "; border-bottom:solid 1px #C0C0C0; background-color:" + bf + ";"]]);
		var bo = this.newImage([["src", this.CloseImg], ["style", "cursor:pointer"], ["title", "close"]]);
		if (aY && aY != "") {
			bo.addEventListener("click", function() {
				var bp = document.getElementById(aY);
				switch (bp.id) {
				case "FightList":
					pausingFights = 0;
					break;
				case "MWAHPref":
					pausingprefs = 0;
					break;
				case "VictimList":
					pausingVictims = 0;
					break;
				case "LogList":
					pausingLog = 0;
					break;
				case "HelpMenu":
					pausinghelp = 0;
					break;
				default:
					;
				}
				u.removeElement(bp);
			},
			false);
		}
		if (bn) {
			bn.appendChild(bo);
		}
	}
	if (bb) {
		this.makeDraggable(bi, bj);
	}
	bi.appendChild(bj);
	if (bk) {
		bi.appendChild(bk);
	}
	if (bn) {
		bi.appendChild(bn);
	}
	document.body.appendChild(bi);
	return bi;
};
var w = false;
Timer = new Object;
var z = new Array;
var A = false;
function B(aT, aU) {
	if (boss) {
		if (UserPrefs.randomizer) {
			aT = aT + Math.floor(Math.random() * ((aU * 2) + 1)) - aU;
		}
	}
	if (aT < 0) {
		aT = 0;
	}
	return aT;
}
var C = document.createEvent("MouseEvents");
Timer.start = function(aT, aU, aV, aW) {
	var aX = document.getElementById("scriptstatus");
	if (aX) {
		aX.innerHTML = aU;
	}
	aX = document.getElementById("scripttimer");
	var aY = aV;
	var aZ = (aY % 60) + " s";
	aY = Math.floor(aY / 60);
	if (aY) {
		aZ = (aY % 60) + " m " + aZ;
		aY = Math.floor(aY / 60);
		if (aY) {
			aZ = aY + " h " + aZ;
		}
	}
	if (aX) {
		aX.innerHTML = "in " + aZ;
	}
	if (!aW) {
		aW = "none";
	}
	if (aV <= 0) {
		if (typeof aT == "object") {
			if (pausingprefs || pausinghelp || boss.pausingSys || pausingFights || pausingVictims || pausingLog) {
				if (!A) {
					if (boss) {
						if (UserPrefs.pausemobster) {
							A = true;
							PauseMobster();
						}
					}
				}
				z[aW] = setTimeout(Timer.start, 1000, aT, aU, aV, aW);
			} else {
				var button = document.getElementById("Mobster");
				if (button) {
					button.parentNode.removeChild(button);
				}
				button = document.getElementById("alertSound2");
				if (button) {
					button.parentNode.removeChild(button);
				}
				A = false;
				var ba;
				if (Page.homelink) {
					ba = Page.homelink;
				} else {
					ba = GM_getValue("Lhomelink", "http://apps.facebook.com/mobwars/");
				}
				z[aW] = setTimeout(Timer.start, 15000, ba, aU + "(safety)", aV, aW);
				if (boss) {
					l(aU, 1);
				}
				if (aT.click) {
					l("&nbsp;Going to (CK)...", 0);
					aT.click();
				} else {
					if (g) {
						l("&nbsp;Going to (SB)..." + aT.href.replace(/:/g, "{{"), 0);
						SB_dispatchMouseEvent(aT, "click", true, false, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
					} else {
						if (C) {
							C.initMouseEvent("click", true, false, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
							aT.dispatchEvent(C);
							l("&nbsp;Going to..." + aT.href.replace(/:/g, "{{"), 0);
							if (!aT.getAttribute("onclick").match(/return false/i)) {
								window.location.href = aT.href;
								l("&nbsp;&nbsp;&nbsp;Was true", 0);
							}
							if (aT.getAttribute("onclick").match(/return false/i)) {
								l("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WAS FALSE", 0);
							}
						} else {
							if (boss) {
								l("Failed to find needed component", 3);
							}
						}
					}
				}
			}
		} else {
			if (pausingprefs || pausinghelp || boss.pausingSys || pausingFights || pausingVictims || pausingLog) {
				if (!A) {
					if (boss) {
						if (UserPrefs.pausemobster) {
							A = true;
							PauseMobster();
						}
					}
				}
				z[aW] = setTimeout(Timer.start, 1000, aT, aU, aV, aW);
			} else {
				var button = document.getElementById("Mobster");
				if (button) {
					button.parentNode.removeChild(button);
				}
				button = document.getElementById("alertSound2");
				if (button) {
					button.parentNode.removeChild(button);
				}
				A = false;
				var ba;
				if (Page.homelink) {
					ba = Page.homelink;
				} else {
					ba = GM_getValue("Lhomelink", "http://apps.facebook.com/mobwars/");
				}
				z[aW] = setTimeout(Timer.start, 15000, ba, aU + "(safety)", aV, aW);
				if (boss) {
					l(aU, 1);
				}
				l("&nbsp;Going to (href)..." + aT.replace(/:/g, "{{"), 0);
				window.location.href = aT;
			}
		}
	} else {
		aV--;
		z[aW] = setTimeout(Timer.start, 1000, aT, aU, aV, aW);
	}
};
var E = eval(GM_getValue("CaptchaSolver", "({})"));
var I = false;
var J = new Object;
var K = new Object;
var Page = new Object;
Page.init = function() {
	var aT;
	var x;
	var aU = document.getElementById("app8743457343_header");
	if (aU) {
		aT = aU.getElementsByTagName("a");
		for (x = 0; x < aT.length; x++) {
			if (aT[x].href.match(/mobwars\/profile\//i)) {
				Page.c_user = aT[x].href.match(/id=([0-9]+)/)[1];
				GM_setValue("Lprofile", aT[x].href);
				Page.profile = aT[x];
				break;
			}
		}
	}
	aU = document.getElementById("app8743457343_statusMenu");
	if (aU) {
		aT = aU.getElementsByTagName("a");
		for (x = 0; x < aT.length; x++) {
			if (aT[x].href.match(/mobwars\/hospital\//i)) {
				GM_setValue("Lhospital", aT[x].href);
				Page.hospital = aT[x];
			} else if (aT[x].href.match(/mobwars\/bank\//i)) {
				GM_setValue("Lbank", aT[x].href);
				Page.bank = aT[x];
			}
		}
	}
	aU = document.getElementById("app8743457343_navMenu");
	if (aU) {
		aT = aU.getElementsByTagName("a");
		GM_setValue("Lhomelink", aT[0].href);
		Page.homelink = aT[0];
		for (x = 1; x < aT.length; x++) {
			if (aT[x].href.match(/mobwars\/jobs\//i)) {
				GM_setValue("Ljobs", aT[x].href);
				Page.jobs = aT[x];
			} else if (aT[x].href.match(/mobwars\/godfather\//i)) {
				GM_setValue("Lgodfather", aT[x].href);
				Page.godfather = aT[x];
			} else if (aT[x].href.match(/mobwars\/hitlist\//i)) {
				GM_setValue("Lhitlist", aT[x].href);
				Page.hitlist = aT[x];
			} else if (aT[x].href.match(/mobwars\/city\//i)) {
				GM_setValue("Lcity", aT[x].href);
				Page.city = aT[x];
			} else if (aT[x].href.match(/mobwars\/stockpile\//i)) {
				GM_setValue("Lstockpile", aT[x].href);
				Page.stockpile = aT[x];
			} else if (aT[x].href.match(/mobwars\/fight\//i)) {
				GM_setValue("Lfight", aT[x].href);
				Page.fight = aT[x];
			}
		}
	}
	Page.curdate = new Date;
	var aV = Page.curdate.getHours();
	var aW = Page.curdate.getMinutes();
	if (parseInt(aW) < 10) {
		aW = "0" + aW;
	}
	Page.currenttime = aV + "" + aW;
	Page.now = Math.floor(Page.curdate.getTime() / 1000);
	var url = location.href;
	var aX;
	aX = document.getElementById("fb_menu_profile");
	if (!aX) {
		var aY = GM_getValue("Lhomelink", "http://apps.facebook.com/mobwars/");
		Timer.start(aY, "Reloading Mob Wars.....", 5);
		I = true;
	} else {
		aX = aX.getElementsByTagName("a")[0];
		if (aX) {
			var aZ;
			if (document.location.hash && (document.location.hash != "#stop")) {
				var ba = document.location.hash.replace("#stop", "");
				aZ = ba.substring(1).split("/");
				Page.c_page = aZ[2].split("?")[0];
				Page.c_params = new Object;
				url = aZ[3];
			} else {
				var bb = url.replace("#stop", "");
				aZ = bb.split("/");
				Page.c_page = aZ[4].split("?")[0];
				if (Page.c_page == "#stop") {
					Page.c_page = "";
				}
				Page.c_params = new Object;
				url = aZ[5];
			}
			if (Page.c_page == "stockpile") {
				aU = Utils.getElementsByClassName("lowerMenu")[0];
				if (aU) {
					aT = aU.getElementsByTagName("a");
					for (x = 0; x < aT.length; x++) {
						if (aT[x].href.match(/mobwars\/stockpile\/\?show_type=weapon/i)) {
							Page.weapon = aT[x];
							GM_setValue("Lweapon", aT[x].href);
						} else if (aT[x].href.match(/mobwars\/stockpile\/\?show_type=armor/i)) {
							Page.armor = aT[x];
							GM_setValue("Larmor", aT[x].href);
						} else if (aT[x].href.match(/mobwars\/stockpile\/\?show_type=vehicle/i)) {
							Page.vehicle = aT[x];
							GM_setValue("Lvehicle", aT[x].href);
						} else if (aT[x].href.match(/mobwars\/stockpile\/\?show_type=power_item/i)) {
							Page.power_item = aT[x];
							GM_setValue("Lpower_item", aT[x].href);
						} else if (aT[x].href.match(/mobwars\/stockpile\/pawn_shop.php/i)) {
							Page.pawn_shop = aT[x];
							GM_setValue("Lpawn_shop", aT[x].href);
						}
					}
				}
			}
			if (Page.c_page == "city") {
				aU = Utils.getElementsByClassName("lowerMenu")[0];
				if (aU) {
					Page.cities = aU.getElementsByTagName("a");
					for (x = 0; x < Page.cities.length; x++) {
						if (!Page.cities[x].href.match("help.php")) {
							var bc = Page.cities[x].href.split("show_loc=")[1];
							Page[bc] = Page.cities[x];
							GM_setValue("L" + bc, Page.cities[x].href);
						}
					}
				}
			}
			if (!url) {
				return;
			}
			url = url.split("?");
			Page.c_php = url[0];
			if (!url[1]) {
				return;
			}
			url = url[1];
			aZ = url.split("&");
			for (var i = 0; i < aZ.length; i++) {
				var bd = aZ[i].split("=");
				Page.c_params[bd[0]] = bd[1];
			}
		} else {
			var aY = GM_getValue("Lhomelink", "http://apps.facebook.com/mobwars/");
			Timer.start(aY, "Reloading Mob Wars.....", 5);
			I = true;
		}
	}
};
function M() {
	if (UserPrefs.fbhide) {
		if (CanHide()) {
			var aT = document.getElementById("sidebar_ads");
			if (aT) {
				aT.parentNode.removeChild(aT);
			}
			var aU = document.getElementsByTagName("iframe");
			if (aU) {
				aU = aU[0];
			}
			if (aU) {
				aU.parentNode.removeChild(aU);
			}
			var aV = document.getElementById("pagefooter");
			if (aV) {
				aV.parentNode.removeChild(aV);
			}
			var p = document.getElementById("presence");
			if (p) {
				p.parentNode.removeChild(p);
			}
			var aW = document.getElementById("dropmenu_container");
			if (aW) {
				aW.parentNode.removeChild(aW);
			}
			var aX = document.getElementById("fb_sell_profile");
			if (aX) {
				aX.parentNode.removeChild(aX);
			}
		}
	}
}
function CanHide() {
	if (pageHeight() < 500) {
		return true;
	}
	return false;
}
var N = new Object;
function Q(aT) {
	aT = aT || 0;
	var aU = "";
	var aV;
	while (aT >= 1000) {
		aV = aT % 1000;
		if (aV > 99) {
			aV = "" + aV;
		} else if (aV > 9) {
			aV = "0" + aV;
		} else {
			aV = "00" + aV;
		}
		aU = "," + aV + aU;
		aT = Math.floor(aT / 1000);
	}
	aU = "$" + aT + aU;
	return aU;
}
HelpHover = new Object;
HelpHover.init = function() {
	if (!this.div) {
		this.div = document.createElement("div");
		if (this.div) {
			this.div.id = "HelpHScreen";
		}
		var aT = new Array;
		aT.length = 0;
		aT.push("#HelpHScreen { z-index: 99; top:27px; position: absolute; display:block; overflow: hidden; visibility: hidden; ");
		aT.push("right:208px; opacity:.95;filter: alpha(opacity=95); ");
		aT.push("border:2px solid #6D84B4; background-color:#EEEEEE; color:#3B5998; padding:2px; font-weight:bold; width: 300px; min-height: 50px;}");
		var aU = document.createElement("style");
		if (aU) {
			aU.type = "text/css";
			aU.innerHTML = aT.join("");
		}
		try {
			var aV = document.getElementsByTagName("head");
			if (aV) {
				aV = aV[0];
			}
			if (aV) {
				if (aU) {
					aV.appendChild(aU);
				}
			}
		} catch(e) {}
		var aW = document.getElementsByTagName("body");
		if (aW) {
			aW = aW[0];
		}
		if (aW) {
			if (this.div) {
				aW.appendChild(this.div);
			}
		}
	}
	return this.div;
};
HelpHover.show = function(aT, aU, e) {
	var aV = HelpHover.init();
	if (aV) {
		aV.innerHTML = "<table id=\"helptable\" width=\"100%\"><tr id=\"helpaction\"><th><center>" + aT + "</center><hr></th></tr><tr id=\"helpmessage\"><td>" + aU + "</td></tr></table>";
		var aW = parseInt(e.clientY) + parseInt(window.pageYOffset) + 40;
		if ((aW + parseInt(aV.offsetHeight)) > pageHeight() - 30) {
			aW = aW - parseInt(aV.offsetHeight) - 80;
		}
		if (aW < parseInt(window.pageYOffset)) {
			aW = parseInt(window.pageYOffset);
		}
		aV.style.top = aW + "px";
		aV.style.visibility = "visible";
	}
};
HelpHover.hide = function() {
	var aT = document.getElementById("HelpHScreen");
	if (aT) {
		aT.style.visibility = "hidden";
	}
};
HelpMe = new Object;
HelpMe.init = function() {
	this.div = document.createElement("div");
	if (this.div) {
		this.div.id = "HelpScreen";
	}
	var aT = new Array;
	aT.push("<center><span id=\"HelpMessage\"></span></center><center><span id=\"HelpFrame\"></span><br><button type=\"button\" id=\"help_close\">Close Help</button></center>");
	if (this.div) {
		this.div.innerHTML = aT.join("\n");
	}
	aT.length = 0;
	aT.push("#HelpScreen { " + "display:none; overflow: hidden; ");
	aT.push("border:2px solid #6D84B4; background-color:#EEEEEE; color:#3B5998; padding:0px; font-weight:bold; min-width: 518px; min-height: 450px;}");
	var aU = document.createElement("style");
	if (aU) {
		aU.type = "text/css";
		aU.innerHTML = aT.join("");
	}
	try {
		if (document) {
			var aV = document.getElementsByTagName("head");
			if (aV) {
				aV = aV[0];
			}
			if (aV) {
				if (aU) {
					aV.appendChild(aU);
				}
			}
		}
	} catch(e) {}
	var aW = GM_getValue("HelpMenu", "20|50").split("|");
	this.divFloat = u.createFloatingDiv(518, aW[0], aW[1], "left", "<h1><a style=\"color:darkblue;\" target=\"_blank\" href=\"http://www.secureworldhosting.com/MWAutoHelper/HomePage.html\">MobWars Auto Helper&#8482; V" + f + "</a> Help Menu</h1>", "HelpMenu", true, true, true);
	this.divFloat.appendChild(this.div);
	document.getElementsByTagName("body")[0].appendChild(this.divFloat);
	var button = document.getElementById("help_close");
	if (button) {
		button.addEventListener("click", this.eventListener(), true);
	}
};
HelpMe.eventListener = function() {
	var help = this;
	return function(aT) {
		aT.preventDefault();
		if (help.div) {
			pausinghelp = 0;
			help.div.style.display = "none";
			help.div.parentNode.parentNode.removeChild(help.div.parentNode);
		}
		pausinghelp = 0;
	};
};
HelpMe.pausingHelp = function() {
	pausinghelp = 1;
	var aT = document.getElementById("HelpMessage");
	if (aT) {
		aT.innerHTML = "<center><a target=\"_blank\" href=\"http://www.secureworldhosting.com/MWAutoHelper/HomePage.html\">FaceBook MobWars Auto Helper&#8482; V" + f + "</a> will be paused until you close the Help window.</center>";
	}
};
HelpMe.show = function() {
	return function() {
		var aT = document.getElementById("HelpScreen");
		if (!aT) {
			HelpMe.init();
			aT = document.getElementById("HelpScreen");
		}
		if (aT) {
			HelpMe.pausingHelp();
			var aU = GM_getValue("HelpMenu_state", "max");
			if (aU == "min") {
				aT.style.display = "none";
			} else {
				aT.style.display = "block";
			}
			var aV = document.getElementById("HelpFrame");
			if (aV) {
				if (Page.c_page == "hitlist") {
					aV.innerHTML = "<center><iframe src=\"http://www.secureworldhosting.com/F.MW.AH/Help/Hitlist.html\" height=450px width=500px></iframe></center>";
					return;
				}
				if (Page.c_page == "fight") {
					aV.innerHTML = "<center><iframe src=\"http://www.secureworldhosting.com/F.MW.AH/Help/Fight.html\" height=450px width=500px></iframe></center>";
					return;
				}
				if (Page.c_page == "stockpile") {
					aV.innerHTML = "<center><iframe src=\"http://www.secureworldhosting.com/F.MW.AH/Help/Stockpile.html\" height=450px width=500px></iframe></center>";
					return;
				}
				if (Page.c_page == "city") {
					aV.innerHTML = "<center><iframe src=\"http://www.secureworldhosting.com/F.MW.AH/Help/City.html\" height=450px width=500px></iframe></center>";
					return;
				}
				if (Page.c_page == "bank") {
					aV.innerHTML = "<center><iframe src=\"http://www.secureworldhosting.com/F.MW.AH/Help/Bank.html\" height=450px width=500px></iframe></center>";
					return;
				}
				if (Page.c_page == "jobs") {
					aV.innerHTML = "<center><iframe src=\"http://www.secureworldhosting.com/F.MW.AH/Help/Jobs.html\" height=450px width=500px></iframe></center>";
					return;
				}
				if (Page.c_page == "hospital") {
					aV.innerHTML = "<center><iframe src=\"http://www.secureworldhosting.com/F.MW.AH/Help/Hospital.html\" height=450px width=500px></iframe></center>";
					return;
				}
				aV.innerHTML = "<center><iframe src=\"http://www.secureworldhosting.com/F.MW.AH/Help/Main.html\" height=450px width=500px></iframe></center>";
			}
		}
	};
};
N.init = function() {
	var aT = document.getElementById("ScriptStatus");
	if (aT) {
		aT.parentNode.parentNode.removeChild(aT.parentNode);
	}
	var aU = new Array;
	aU.push("<div class=\"scriptStatusHeader\">");
	aU.push(boss.name);
	aU.push("</div>");
	aU.push("<span id=\"MobWarCaptcha\"></span>");
	var aV = new Array;
	aV.push("<span id=\"totals\">");
	aV.push("<table style=\"width: 100%;\" cellpadding=\"0\" cellspacing=\"0\"><tr><td>Cash</td><td id=\"cash_stat\"style=\"color: green; text-align: right;\"></td></tr>");
	aV.push("<tr><td>Bank account</td><td id=\"bank_stat\" style=\"color: green; text-align: right;\"></td></tr>");
	aV.push("<tr><td>City value</td><td id=\"city_stat\" style=\"color: green; text-align: right;\"></td></tr>");
	aV.push("<tr><td>Stock value</td><td id=\"stockpile_stat\" style=\"color: green; text-align: right;\"></td></tr>");
	if (UserPrefs.showbounty) {
		aV.push("<tr><td>Bounty value</td><td id=\"bounty_stat\" style=\"color: green; text-align: right;\"></td></tr>");
	}
	aV.push("<tr><td colspan=\"2\"><hr/></td></tr>");
	aV.push("<tr><td>Total</td><td id=\"total1_stat\" style=\"text-align: right;\"></td></tr>");
	aV.push("<tr><td colspan=\"2\">&nbsp;</td></tr>");
	aV.push("<tr><td>City income</td><td id=\"income_stat\" style=\"color: green; text-align: right;\"></td></tr>");
	aV.push("<tr><td>Job mean payout</td><td id=\"jobincome_stat\" style=\"color: green; text-align: right;\"></td></tr>");
	aV.push("<tr><td>Upkeep</td><td id=\"upkeep_stat\" style=\"color: red; text-align: right;\"></td></tr>");
	aV.push("<tr><td colspan=\"2\"><hr/></td></tr>");
	aV.push("<tr><td>Total</td><td id=\"total2_stat\" style=\"color: green; text-align: right;\"></td></tr></table><hr>");
	aV.push("<span id=\"expneeded\"></span>");
	aV.push("</span>");
	var aW = new Array;
	aW.push("<div><center><button type=\"button\" id=\"prefs_button\">Preferences</button><br></center></div><div><center><button type=\"button\" id=\"hitlist_pref\">");
	if (UserPrefs.hitlist_active == false) {
		aW.push("Hunt Bounties: Off");
	} else {
		aW.push("Hunt Bounties: <font color=red>On</font>");
	}
	aW.push("</button><br>");
	aW.push("<button type=\"button\" id=\"Fight_pref\">");
	if (UserPrefs.fight_active == false) {
		aW.push("Fighter Drone: <span id=\"fightermode\">Off</span>");
	} else {
		if (UserPrefs.hitlist_active == false) {
			aW.push("Fighter Drone: <span id=\"fightermode\"><font color=red>Active</font></span>");
		} else {
			if (UserPrefs.override == true) {
				aW.push("Fighter Drone: <span id=\"fightermode\"><font color=blue>Forced</font></span>");
			} else {
				aW.push("Fighter Drone: <span id=\"fightermode\"><font color=orange>Waiting</font></span>");
			}
		}
	}
	aW.push("</button><br>");
	if (UserPrefs.bankbutton == true) {
		aW.push("<button type=\"button\" id=\"BankD\">Bank Dep</button>");
	}
	if (UserPrefs.healbutton == true) {
		aW.push("<button type=\"button\" id=\"HealFast\">Heal</button><br>");
	} else {
		aW.push("<br>");
	}
	aW.push("<button type=\"button\" id=\"fights\">Fights</button>");
	aW.push("<button type=\"button\" id=\"bvl_button\">Victims</button></center></div><br>");
	aW.push("<div><center><span id=\"cancelstam\">");
	if (boss.actions.stamina) {
		aW.push("<a id=\"cancelstamwait\">Cancel Stamina Wait</a><br><br>");
	}
	aW.push("</span>");
	aW.push("<span id=\"canceldeath\">");
	if (boss.actions.Dead) {
		aW.push("<a id=\"canceldeathwait\">Cancel Death Wait</a><br><br>");
	}
	aW.push("</span>");
	aW.push("</center></br><center><a id=\"helpme\">Help</a>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp");
	if (boss.pausingSys == 0) {
		aW.push("<a id=\"Pause\">PAUSE</a><br>");
	} else {
		aW.push("<a id=\"Pause\"><font color=red>PAUSED</font></a><br>");
	}
	aW.push("<a id=\"disable_button\">Disable Tab</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a id=\"log_button\">Log</a></center></div><hr>");
	var aX = new Array;
	aX.push("<div class=\"scriptStatusContent\"><span id=\"autoheal\"></span><span id=\"MWCapStatus\"></span><span id=\"scriptupdate\"></span><span id=\"targetlock\"></span><span id=\"hitCuser\"></span><span id=\"scripterror\"></span><span id=\"CaptchaSolverError\"></span>In Queue:");
	if (UserPrefs.autoCityBuy) {
		var aY = boss.cash - UserPrefs.cashprotected;
		if (aY < 0) {
			aY = 0;
		}
		if (UserPrefs.autoCityBuy_withBank) {
			money = aY + (boss.bank_cash - UserPrefs.bankrestricted);
		} else {
			money = aY;
		}
		var aZ = boss.autoCityBuy_cost - money;
		if (aZ < 0) {
			aZ = 0;
		}
		aX.push("<br><span id=\"AutoCityQueue\">Buying: " + boss.autoCityBuy_qty + " " + boss.autoCityBuy_name + " (in " + boss.autoCityBuy_city + ") for " + Q(boss.autoCityBuy_cost) + ", still need: " + Q(aZ) + "</span>");
	}
	aX.push("<span id=\"queue\"></span><br>");
	aX.push("<span id=\"fighter_drone\"></span><br>Status:<br /><span id=\"scriptsnipping\"></span><span id=\"scriptstatus\">Resting...</span><br /><span id=\"scripttimer\"></span></div>");
	if (UserPrefs.statdisp == undefined) {
		UserPrefs.statdisp = 0;
	}
	var ba = new Array;
	if (UserPrefs.statdisp != 0) {
		ba.push("<hr><center><i>Status Display</i><font style=\"font-size:10px\"> - Diagnostic</font>");
		ba.push("<br>Health: " + boss.health + "/" + boss.max_health);
		ba.push("<br>Energy: " + boss.energy + "/" + boss.max_energy);
		ba.push(" Stam: " + boss.stamina + "/" + boss.max_stamina);
		ba.push("<br>Exp: " + boss.exp);
		ba.push(" Lev: " + boss.level);
		ba.push("<br>Mobsters: " + boss.mobsters);
		ba.push(" GF: " + boss.GFpoints);
		ba.push("<br>Attack: " + boss.attack_strength + " Defense: " + boss.defense_strength);
		var bb = (boss.level < 50) ? 500 : ((boss.level - 50) * 2) + 500;
		if (bb > 1001) {
			bb = 1001;
		}
		ba.push("<br>Max Mob: " + bb);
		ba.push("<span id=\"processtime\"></span>");
	}
	var bc = document.createElement("div");
	if (bc) {
		bc.id = "ScriptStatus";
		bc.innerHTML = aU.join("\n");
		switch (UserPrefs.windoworder) {
		case "queuetop":
			bc.innerHTML += aX.join("\n");
			bc.innerHTML += aV.join("\n");
			bc.innerHTML += aW.join("\n");
			bc.innerHTML += ba.join("\n");
			break;
		default:
			bc.innerHTML += aV.join("\n");
			bc.innerHTML += aW.join("\n");
			bc.innerHTML += aX.join("\n");
			bc.innerHTML += ba.join("\n");
			break;
		}
	}
	if (UserPrefs.adjust == undefined) {
		UserPrefs.adjust = 0;
	}
	var bd = UserPrefs.adjust;
	if (UserPrefs.orientation == undefined) {
		UserPrefs.orientation = 0;
	}
	var be;
	if (!UserPrefs.orientation) {
		be = 0;
	} else {
		be = UserPrefs.orientation;
	}
	var bf = 100;
	var bg = 138;
	var bh = 208;
	var bi = 54;
	if (UserPrefs.fbhide) {
		if (CanHide()) {
			bi = 0;
		}
	}
	if (pageWidth() < 1000) {
		bi += 21;
	}
	var bj = 30;
	var bk = 20;
	var bl = bf + bj;
	var bm = (pageHeight() - bl) - bi;
	var bn = (pageWidth() - bh) - bk;
	var bo;
	var bp;
	if (bd != 0) {
		if (be != 0) {
			bn -= bg;
			bl -= bf;
			bm += bf;
			bp = 138;
		} else {
			bo = (pageWidth() - bn) / 2;
			if (bo < bh) {
				bo = bh;
			}
		}
		aU.length = 0;
		aU.push("#app8743457343_container { z-index: 5; position: fixed; overflow: auto; top:" + bl + "px; ");
		if (be != 0) {
			aU.push("left: " + bp + "px; ");
		} else {
			aU.push("right: " + bo + "px; ");
		}
		aU.push("max-width: " + bn + "px; max-height: " + bm + "px;}");
		var bq = document.createElement("style");
		if (bq) {
			bq.type = "text/css";
			bq.innerHTML = aU.join("");
		}
		var br = document.getElementById("app_content_8743457343");
		if (br) {
			if (bq) {
				br.appendChild(bq);
			}
		}
	}
	aU.length = 0;
	aU.push("#ScriptStatus {" + " overflow: auto; ");
	aU.push("border:2px solid #6D84B4; background-color:#EEEEEE; color:#3B5998; padding:2px; font-weight:bold; width: 200px; max-height: " + ((pageHeight() - bj) - bi) + "px;}");
	aU.push("#ScriptStatus div.scriptStatusHeader { text-align:center; background: #6D84B4; color: #FFFFFF; }");
	aU.push("#ScriptStatus div.scriptStatusContent { border-width: 1px 1px 1px 1px; padding: 2px 2px 2px 2px; border-style: solid solid solid solid;}");
	var bs = document.createElement("style");
	if (bs) {
		bs.type = "text/css";
		bs.innerHTML = aU.join("");
	}
	try {
		var bt = document.getElementsByTagName("head");
		if (bt) {
			bt = bt[0];
			if (bt) {
				if (bs) {
					bt.appendChild(bs);
				}
			}
		}
	} catch(e) {}
	var bu = u.createFloatingDiv(208, 0, 30, "right", "<h2>-<a target=\"_blank\" style=\"color:blue;\" href=\"http://www.secureworldhosting.com/MWAutoHelper/HomePage.html\"><font size=1>FB MobWars Auto Helper&#8482;</font></a>-</h2>", "StatusMenu", true, false, false);
	if (bu) {
		if (bc) {
			bu.appendChild(bc);
		}
	}
	var bv = GM_getValue("StatusMenu_state", "max");
	if (bv == "min") {
		bc.style.display = "none";
	}
	if (bu) {
		document.body.insertBefore(bu, document.body.lastChild);
	}
	var bw = new Object;
	bw.prefs_button = document.getElementById("prefs_button");
	if (bw.prefs_button) {
		bw.prefs_button.addEventListener("click", clicked = Preferences.show(), true);
	}
	bw.hitlist_pref = document.getElementById("hitlist_pref");
	if (bw.hitlist_pref) {
		bw.hitlist_pref.addEventListener("click", clicked = HitListToggle(), true);
	}
	bw.Fight_pref = document.getElementById("Fight_pref");
	if (bw.Fight_pref) {
		bw.Fight_pref.addEventListener("click", clicked = FighterToggle(), true);
	}
	bw.fights = document.getElementById("fights");
	if (bw.fights) {
		bw.fights.addEventListener("click", clicked = Fights.show(), true);
	}
	bw.BankD = document.getElementById("BankD");
	if (bw.BankD) {
		bw.BankD.addEventListener("click", clicked = BankD(), true);
	}
	bw.HealFast = document.getElementById("HealFast");
	if (bw.HealFast) {
		bw.HealFast.addEventListener("click", clicked = function() {
			HealFast();
		},
		true);
	}
	bw.helpme = document.getElementById("helpme");
	if (bw.helpme) {
		bw.helpme.addEventListener("click", clicked = HelpMe.show(), true);
	}
	bw.Pause = document.getElementById("Pause");
	if (bw.Pause) {
		bw.Pause.addEventListener("click", clicked = function() {
			sysp(false);
		},
		true);
	}
	bw.bvl_button = document.getElementById("bvl_button");
	if (bw.bvl_button) {
		bw.bvl_button.addEventListener("click", clicked = BVL.show(), true);
	}
	bw.log_button = document.getElementById("log_button");
	if (bw.log_button) {
		bw.log_button.addEventListener("click", clicked = Log.show(), true);
	}
	bw.cancelstamwait = document.getElementById("cancelstamwait");
	if (bw.cancelstamwait) {
		bw.cancelstamwait.addEventListener("click", clicked = function() {
			if (boss.actions.stamina) {
				delete boss.actions.stamina;
				boss.save();
				location.reload();
			}
		},
		true);
	}
	bw.canceldeathwait = document.getElementById("canceldeathwait");
	if (bw.canceldeathwait) {
		bw.canceldeathwait.addEventListener("click", clicked = function() {
			if (boss.actions.Dead) {
				delete boss.actions.Dead;
				boss.save();
				HealFast();
			}
		},
		true);
	}
	N.update();
};
function pageWidth() {
	return t.pageWidth();
}
function pageHeight() {
	return t.pageHeight();
}
function R() {
	return t.posLeft();
}
function S() {
	return t.posTop();
}
function T() {
	return t.posRight();
}
function sysp(aT) {
	var button = document.getElementById("Pause");
	if (aT) {
		boss.pausingSys = 1;
		if (button) {
			button.innerHTML = "<font color=\"red\">PAUSED</font>";
		}
		boss.save();
	} else {
		if (boss.pausingSys == 0) {
			boss.pausingSys = 1;
			if (button) {
				button.innerHTML = "<font color=\"red\">PAUSED</font>";
			}
			boss.save();
		} else {
			boss.pausingSys = 0;
			if (button) {
				button.innerHTML = "PAUSE";
			}
			boss.save();
		}
	}
}
N.update = function() {
	var aT = document.getElementById("cash_stat");
	var aU = 0;
	if (aT) {
		aT.innerHTML = Q(boss.cash);
	}
	aU += boss.cash || 0;
	if (UserPrefs.showbounty) {
		aT = document.getElementById("bounty_stat");
		if (!boss.kill_count) {
			boss.kill_count = 0;
		}
		if (aT) {
			aT.innerHTML = int_to_dollars(Math.max(((boss.total_income - boss.total_upkeep) * 10 + boss.kill_count * 20 + 5000), 10000));
		}
	}
	aT = document.getElementById("bank_stat");
	if (aT) {
		aT.innerHTML = Q(boss.bank_cash);
	}
	aU += boss.bank_cash || 0;
	aT = document.getElementById("city_stat");
	if (aT) {
		aT.innerHTML = Q(boss.city_value);
	}
	aU += boss.city_value || 0;
	aT = document.getElementById("stockpile_stat");
	if (aT) {
		aT.innerHTML = Q(boss.stockpile_value);
	}
	aU += boss.stockpile_value || 0;
	aT = document.getElementById("total1_stat");
	if (aT) {
		aT.innerHTML = Q(aU);
	}
	aT = document.getElementById("income_stat");
	if (aT) {
		aT.innerHTML = Q(boss.total_income);
	}
	aT = document.getElementById("jobincome_stat");
	if (aT) {
		aT.innerHTML = Q(boss.job_income);
	}
	aT = document.getElementById("upkeep_stat");
	if (aT) {
		aT.innerHTML = Q(boss.total_upkeep);
	}
	aT = document.getElementById("total2_stat");
	aU = boss.total_income + boss.job_income - boss.total_upkeep;
	if (aT) {
		aT.innerHTML = "";
	}
	if (aU < 0) {
		if (aT) {
			aT.style.color = "red";
		}
		if (aT) {
			aT.innerHTML = "-";
		}
	}
	aU = Math.abs(aU);
	if (aT) {
		aT.innerHTML += Q(aU);
	}
	if (UserPrefs.expneeded) {
		if (boss.maxexpneeded != undefined && boss.maxexpneeded != 0 && boss.expneeded != 0 && (boss.exp != 0)) {
			aT = document.getElementById("expneeded");
			if (aT) {
				aT.innerHTML = "<table style=\"width: 100%;\" cellpadding=\"0\" cellspacing=\"0\"><tr><td>Exp needed to level:</td><td style=\"text-align: right;\">" + (boss.expneeded - boss.exp) + " (" + (((boss.maxexpneeded - (boss.expneeded - boss.exp)) / boss.maxexpneeded) * 100).toFixed(1) + "%)</td></tr></table><br />";
			}
		}
	}
};
Utils = new Object;
if (document.getElementsByClassName) {
	Utils.getElementsByClassName = function(aT, aU) {
		if (!aU) {
			aU = document;
		}
		return aU.getElementsByClassName(aT);
	};
} else {
	Utils.getElementsByClassName = function(aT, aU) {
		if (!aU) {
			aU = document;
		}
		var aV;
		var aW = new Array;
		aV = ".//*[contains(concat(' ', @class, ' '), ' " + aT + " ')]";
		var aX = document.evaluate(aV, aU, null, XPathResult.ANY_TYPE, null);
		while (aU = aX.iterateNext()) {
			aW.push(aU);
		}
		return aW;
	};
}
Utils.getElementsByXPath = function(aT, aU) {
	if (!aU) {
		aU = document;
	}
	var aV = new Array;
	var aW;
	aW = document.evaluate(aT, aU, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	var aX;
	while (aX = aW.iterateNext()) {
		aV.push(aX);
	}
	return aV;
};
function V() {
	this.name = "Anonymous";
	this.cash = 0;
	this.health = 100;
	this.max_health = 100;
	this.energy = 10;
	this.max_energy = 10;
	this.stamina = 3;
	this.max_stamina = 3;
	this.exp = 0;
	this.level = 0;
	this.type = "Unknown";
	this.new_level = 0;
	this.mobsters = 0;
	this.total_upkeep = 0;
	this.jail_delay = 0;
	this.pausingSys = 0;
	if (Page) {
		if (Page.c_user) {
			this.actions = {
				boss_type: {
					page: "profile",
					message: "Checking name and type of your boss",
					time: 0
				},
				boss_attack: {
					page: "profile",
					message: "Checking attack parameters of your boss",
					time: 0
				}
			};
		}
	}
	this.preferences = new Object;
	this.hitlist = new Array;
	this.fights = new Object;
	var aT = eval(GM_getValue("boss", "({})"));
	for (var i in aT) {
		this[i] = aT[i];
	}
}
V.prototype = new Object;
V.prototype.save = function() {
	GM_setValue("boss", this.toSource());
};
V.prototype.updateData = function() {
	if (itemlist.length < 1) {
		boss.new_level = 1;
	}
	boss.jail_delay = 0;
	var aT = document.getElementById("app8743457343_navMenu");
	var aU;
	if (aT) {
		aU = aT.getElementsByTagName("a");
		for (s = 0; s < aU.length; s++) {
			if (aU[s].innerHTML.match(/my mob/i)) {
				var aV = aU[s].innerHTML;
				if (aV) {
					aV = aV.match(/\d+/);
				}
				if (aV) {
					this.mobsters = parseInt(aV[0]);
				}
				break;
			}
		}
	}
	aT = document.getElementById("app8743457343_statusMenu");
	var aW;
	if (aT) {
		aW = Utils.getElementsByClassName("wrap3outer", aT);
	}
	if (aW) {
		for (var i = 0; i < aW.length; i++) {
			aU = aW[i].innerHTML;
			aU = aU.replace(/<[^>]*>/g, "");
			aU = aU.replace(/[, \t]/g, "");
			var aX = /(Cash|Health|Energy|Stamina|Exp|Level): ?\$?([0-9]+)\/?([0-9]+)?/;
			var aY = aU.match(aX);
			if (!aY) {
				continue;
			}
			switch (aY[1]) {
			case "Cash":
				this.cash = parseInt(aY[2]);
				break;
			case "Health":
				this.health = parseInt(aY[2]);
				this.max_health = parseInt(aY[3]);
				break;
			case "Energy":
				this.energy = parseInt(aY[2]);
				this.max_energy = parseInt(aY[3]);
				break;
			case "Stamina":
				this.stamina = parseInt(aY[2]);
				this.max_stamina = parseInt(aY[3]);
				break;
			case "Exp":
				this.exp = parseInt(aY[2]);
				break;
			case "Level":
				if (this.level != parseInt(aY[2])) {
					this.new_level = 1;
				}
				this.level = parseInt(aY[2]);
				break;
			default:
				break;
			}
		}
		this.exp = parseInt(aW[4].innerHTML.split(/exp:&nbsp;/)[1]);
	}
	var aZ = document.getElementById("app8743457343_cur_cash");
	if (aZ) {
		this.cash = parseInt(dollars_to_int(aZ.innerHTML.split("<")[0]));
	}
	aZ = document.getElementById("app8743457343_cur_health");
	if (aZ) {
		this.health = parseInt(aZ.innerHTML.split("/")[0]);
	}
	aZ = document.getElementById("app8743457343_cur_health");
	if (aZ) {
		this.max_health = parseInt(aZ.parentNode.innerHTML.split("/")[2]);
	}
	aZ = document.getElementById("app8743457343_cur_energy");
	if (aZ) {
		this.energy = parseInt(aZ.innerHTML.split("/")[0]);
	}
	aZ = document.getElementById("app8743457343_cur_energy");
	if (aZ) {
		this.max_energy = parseInt(aZ.parentNode.innerHTML.split("/")[2]);
	}
	aZ = document.getElementById("app8743457343_cur_recovery");
	if (aZ) {
		this.stamina = parseInt(aZ.innerHTML.split("/")[0]);
	}
	aZ = document.getElementById("app8743457343_cur_recovery");
	if (aZ) {
		this.max_stamina = parseInt(aZ.parentNode.innerHTML.split("/")[2]);
	}
	var ba;
	aT = undefined;
	aW = undefined;
	switch (Page.c_page) {
	case "jail":
		aT = document.getElementById("app8743457343_content");
		if (aT) {
			aW = aT.getElementsByTagName("p");
		}
		if (aW) {
			for (var j = 0; j < aW.length; j++) {
				var bb = aW[j].innerHTML.match(/jail in ([0-9.]+) hour/);
				if (bb) {
					bb = parseFloat(bb[1]) + 0.01;
					this.jail_delay = Page.now + Math.floor(3600 * bb);
					break;
				}
			}
		}
		break;
	case "profile":
		if (Page.c_page == "profile" && (Page.c_params.user_id == Page.c_user || Page.c_params.user_id == "" || Page.c_params.user_id == undefined)) {
			aT = document.getElementById("app8743457343_content");
			if (aT) {
				aW = aT.getElementsByTagName("tr");
			}
			if (aW) {
				this.attack_strength = parseInt(aW[1].getElementsByTagName("td")[1].innerHTML);
				this.defense_strength = parseInt(aW[2].getElementsByTagName("td")[1].innerHTML);
			}
			var bc = aT.getElementsByClassName("cStatVal");
			aT = aT.getElementsByTagName("h1")[0].innerHTML;
			if (aT) {
				var bd = aT.match(/"(.*)", Level [0-9]+ (\w+)/);
				if (bd) {
					this.name = bd[1];
					this.type = bd[2];
				}
			}
			if (bc) {
				var be = bc[1].parentNode.parentNode.lastChild.previousSibling.innerHTML.match(/[0-9]+/);
				if (be.length > 0) {
					this.kill_count = parseInt(be);
				}
			}
			ba = Utils.getElementsByClassName("announcement");
			if (ba) {
				if (ba[0].innerHTML.match("You need <b>")) {
					this.expneeded = parseInt(ba[0].innerHTML.split("You need <b>")[1]) + this.exp;
					this.maxexpneeded = levelupExp();
				} else {
					if (ba[1]) {
						if (ba[1].innerHTML.match("You need <b>")) {
							this.expneeded = parseInt(ba[1].innerHTML.split("You need <b>")[1]) + this.exp;
							this.maxexpneeded = levelupExp();
						}
					}
				}
			}
		}
		break;
	case "":
		aT = Utils.getElementsByXPath("//div[@id=\"app8743457343_content\"]/div")[0];
		if (aT) {
			aT = aT.innerHTML;
			aT = aT.match(/More energy in (\d+) seconds/);
			if (aT) {
				boss.energy_time = Page.now + parseInt(aT[1]);
			}
		}
	default:
		;
	}
	this.save();
};
GM_registerMenuCommand("--------------------------------", function() {
	return;
});
GM_registerMenuCommand("Reset MobWars Auto Helper(TM) database (all)...", function() {
	GM_setValue("boss", "({})");
	GM_getValue("UserPrefs", "({})");
	GM_setValue("inventory", "({})");
	GM_setValue("itemlist", "({})");
	GM_setValue("jobs", "({})");
	GM_setValue("victims", "");
	GM_setValue("fightlist", "");
	GM_setValue("fightlistblock", "");
	GM_setValue("hitlistblock", "");
	GM_setValue("PrevFights", "");
	location.reload();
});
GM_registerMenuCommand("-------------------------------", function() {
	return;
});
GM_registerMenuCommand("Reset All, except Victim and Fight Lists", function() {
	GM_setValue("boss", "({})");
	GM_setValue("inventory", "({})");
	GM_setValue("itemlist", "({})");
	GM_setValue("jobs", "({})");
	location.reload();
});
GM_registerMenuCommand("------------------------------", function() {
	return;
});
GM_registerMenuCommand("Reset Inventory", function() {
	GM_setValue("inventory", "({})");
	var aT = new Object;
	aT.page = "stockpile";
	aT.func = "checkstockpile";
	aT.message = "Checking stockpile available after user reset...";
	aT.time = 1;
	boss.actions.inventory_stockpile = aT;
	aT = new Object;
	aT.page = "city";
	aT.message = "Checking buildings available after user reset...";
	aT.func = "checkcities";
	aT.time = 1;
	boss.actions.inventory_city = aT;
	aT = new Object;
	aT.page = "jobs";
	aT.message = "Checking jobs available after user reset...";
	aT.time = 1;
	boss.actions.jobs_check = aT;
	boss.save();
	location.reload();
});
GM_registerMenuCommand("Reset Itemlist", function() {
	GM_setValue("itemlist", "({})");
	var aT = new Object;
	aT.page = "stockpile";
	aT.func = "checkstockpile";
	aT.message = "Checking stockpile available after user reset...";
	aT.time = 1;
	boss.actions.inventory_stockpile = aT;
	aT = new Object;
	aT.page = "city";
	aT.func = "checkcities";
	aT.message = "Checking buildings available after user reset...";
	aT.time = 1;
	boss.actions.inventory_city = aT;
	aT = new Object;
	aT.page = "jobs";
	aT.message = "Checking jobs available after user reset...";
	aT.time = 1;
	boss.actions.jobs_check = aT;
	boss.save();
	location.reload();
});
GM_registerMenuCommand("Reset Job Options", function() {
	GM_setValue("jobs", "({})");
	var aT = new Object;
	aT.page = "jobs";
	aT.message = "Checking jobs available after user reset...";
	aT.time = 1;
	boss.actions.jobs_check = aT;
	boss.save();
	location.reload();
});
GM_registerMenuCommand("Reset Boss (name, preferences, actions, etc.)", function() {
	GM_setValue("boss", "({})");
	location.reload();
});
GM_registerMenuCommand("----------------------------------", function() {
	return;
});
GM_registerMenuCommand("Reset Victims List", function() {
	GM_setValue("victims", "");
});
GM_registerMenuCommand("Reset Fight List", function() {
	GM_setValue("fightlist", "");
});
GM_registerMenuCommand("-----------------------------------", function() {
	return;
});
GM_registerMenuCommand("Reset HitList Block List", function() {
	GM_setValue("hitlistblock", "");
});
GM_registerMenuCommand("Reset Fight Block List", function() {
	GM_setValue("fightlistblock", "");
});
GM_registerMenuCommand("Reset Previous Mobs Fought List", function() {
	GM_setValue("PrevFights", "");
});
GM_registerMenuCommand("---------------------------------", function() {
	return;
});
GM_registerMenuCommand("Reset MWCaptcha Database", function() {
	GM_setValue("MWCaptcha", "({})");
});
function W() {
	this.type = "stockpile";
	this.name = "Unknown";
	this.needs = "Nothing";
	this.attack = 0;
	this.defense = 0;
	this.upkeep = 0;
	this.price = 0;
}
function X() {
	this.type = "city";
	this.name = "Unknown";
	this.city = "new_york";
	this.price = 0;
	this.income = 0;
	this.depends = "";
	this.best_qty = 0;
	this.inflation = 0;
	this.roi = 0;
	this.turns_purchase = 0;
	this.itemn = "Unknown";
	this.cost = 0;
}
function Y() {
	this.type = "prep";
	this.name = "Unknown";
	this.energy_per_unit = 0;
}
function Z() {
	var aT = eval(GM_getValue("itemlist", "({})"));
	for (var i in aT) {
		this[i] = aT[i];
	}
}
Z.prototype = new Object;
Z.prototype.save = function() {
	GM_setValue("itemlist", this.toSource());
};
var aa = eval(GM_getValue("donation", "({user:\"\",pass:\"\",key:\"\"})"));
if (aa.key == "") {
	aa.key = parseInt(Math.random() * 50000000000);
	GM_setValue("donation", aa.toSource());
}
Z.prototype.updateData = function() {
	var aT = ["stockpile", "jobs", "city"];
	if (aT.indexOf(Page.c_page) != -1) {
		for (var aU in this) {
			if (this[aU].type != Page.c_page) {
				continue;
			}
			if (Page.c_php == "pawn_shop.php") {
				continue;
			}
			if (Page.c_page == "stockpile") {
				var aV;
				if (Page.c_params.show_type) {
					aV = Page.c_params.show_type;
				} else {
					aV = "weapon";
				}
				if (this[aU].stocktype != aV) {
					continue;
				}
			}
			if (Page.c_page == "city") {
				var aW;
				if (Page.c_params.show_loc) {
					aW = Page.c_params.show_loc;
				} else {
					aW = "new_york";
				}
				if (this[aU].city != aW) {
					continue;
				}
			}
			delete this[aU];
		}
		var aX = document.getElementById("app8743457343_content");
		if (aX) {
			var aY = Utils.getElementsByXPath(".//a[contains(@name,\"item\")]", aX);
			if (aY) {
				for (var i = 0; i < aY.length; i++) {
					if (aY[i].name != "item_60" && aY[i].name != "item_59" || (Page.c_page != "jobs")) {
						if (Utils.getElementsByXPath("..//a[contains(@href,\"stockpile/#" + aY[i].name + "\")]", aY[i]).length) {
							continue;
						}
						var aZ = Utils.getElementsByXPath("./ancestor::tr", aY[i])[0];
						var ba = aY[i].name;
						var bb;
						switch (Page.c_page) {
						case "stockpile":
							bb = new W;
							if (ba == "item_41") {
								bb.needs = "item_32";
							}
							if (Page.c_params.show_type) {
								bb.stocktype = Page.c_params.show_type;
							} else {
								bb.stocktype = "weapon";
							}
							break;
						case "city":
							bb = new X;
							break;
						case "jobs":
							bb = new Y;
							break;
						default:
							;
						}
						if (Page.c_page != "jobs") {
							if (aZ) {
								bb.name = aZ.getElementsByTagName("img")[0].title;
							}
						} else {
							var bc = Utils.getElementsByXPath(".//a[contains(@href,\"item\")]/following-sibling::span", aZ)[0];
							if (bc) {
								bb.name = bc.previousSibling.title.match(/[0-9]+ (.*)/)[1];
							}
						}
						var bd;
						var be = aZ.innerHTML.replace(/\n/g, "");
						switch (Page.c_page) {
						case "jobs":
							bd = be.match(/\(\+(\d+)\).*Energy:&nbsp;(\d+)/);
							if (bd) {
								bb.energy_per_unit = bd[1] / bd[2];
							}
							break;
						case "city":
							bb.itemn = ba;
							bd = be.match(/Income: \$([0-9,]+).*\$([0-9,]+).*Owned: <[^<]*>(\d+)/);
							if (bd) {
								bb.income = parseInt(bd[1].replace(/,/g, ""));
								bb.price = parseInt(bd[2].replace(/,/g, "")) * 10 / (parseInt(bd[3]) + 10);
								var bf = parseInt(bd[2].replace(/,/g, ""));
								bb.cost = bf;
								if (Page.c_params.show_loc) {
									bb.city = Page.c_params.show_loc;
								}
							}
							bd = be.match(/Built On: (\w+ \w+)/);
							if (bd) {
								for (var j in this) {
									if (this[j].name == bd[1]) {
										bb.depends = j;
										break;
									}
								}
							}
							break;
						case "stockpile":
							bd = be.match(/Attack: (\d+)/);
							if (bd) {
								bb.attack = parseInt(bd[1]);
							}
							bd = be.match(/Defense: (\d+)/);
							if (bd) {
								bb.defense = parseInt(bd[1]);
							}
							bd = be.match(/upkeep.>\$([0-9,]+)/);
							if (bd) {
								bb.upkeep = parseInt(bd[1].replace(/,/g, ""));
							}
							bd = be.match(/\$([0-9,]+)[^\$]*Owned/);
							if (bd) {
								bb.price = parseInt(bd[1].replace(/,/g, ""));
							}
							break;
						default:
							break;
						}
						this[ba] = bb;
					}
				}
				this.save();
			}
		}
	}
};
var pausinghelp = 0;
var pausingprefs = 0;
var pausingFights = 0;
var pausingVictims = 0;
var pausingLog = 0;
Preferences = new Object;
Preferences.init = function() {
	this.handlers = new Array;
	this.div = document.createElement("div");
	this.div.id = "PreferencesMWAHV2.0";
	this.div.className = "facebook-gm-pref";
	var aT = ".facebook-gm-pref {display: none;" + " overflow: auto; background-color: white; border: 1px solid black; padding: 10px; width: 600px; height: " + (pageHeight() - 120) + "px}";
	GM_addStyle(aT);
	var aU = document.createElement("style");
	aU.type = "text/css";
	aU.innerHTML = "div.PrefMenuToggles { cursor:pointer; border: 5px; text-align:center; background: #EEEEEE; }";
	try {
		document.getElementsByTagName("head")[0].appendChild(aU);
	} catch(e) {}
	this.div.innerHTML = "<hr><h2>Script Preferences<font size=\"1\"> - V" + f + "</font></h2>";
	this.rule = document.createElement("hr");
	this.rule.id = "facebook-gm-rule";
	this.div.appendChild(this.rule);
	this.form = document.createElement("form");
	this.form.action = "";
	this.form.method = "";
	this.form.id = "facebook-gm-pref";
	this.div.appendChild(this.form);
	this.button = document.createElement("button");
	this.button.type = "button";
	this.button.id = "pref_submit";
	this.button.innerHTML = "Update preferences";
	this.form.appendChild(this.button);
	var aV = GM_getValue("MWAHPref", "25|25").split("|");
	this.divFloat = u.createFloatingDiv(623, aV[0], aV[1], "left", "<h1><a style=\"color:darkblue;\" target=\"_blank\" href=\"http://www.secureworldhosting.com/MWAutoHelper/HomePage.html\">MobWars Auto Helper&#8482; V" + f + "</a> Script Preferences<font size=\"1\"> - V" + f + "</font></h1>", "MWAHPref", true, true, true);
	this.divFloat.appendChild(this.div);
	var aW = ".PrefStuff {overflow: auto; min-width: 600px; height: " + (pageHeight() - 120 - 70) + "px}";
	GM_addStyle(aW);
	var aX = document.createElement("div");
	aX.id = "PrefStuff";
	aX.className = "PrefStuff";
	this.form.insertBefore(aX, this.button);
	return this;
};
Preferences.populate = function() {
	for (var i = 0; i < modules.length; i++) {
		if (J[modules[i] + "_pI"]) {
			J[modules[i] + "_pI"](this);
		}
	}
	for (var j = 0; j < modules.length; j++) {
		if (J[modules[j] + "_pH"]) {
			this.handlers.push(J[modules[j] + "_pH"]);
		}
	}
	this.button.addEventListener("click", this.eventListener(), true);
	this.form.addEventListener("submit", this.eventListener(), true);
};
Preferences.eventListener = function() {
	var aT = this;
	return function(aU) {
		var aV = false;
		var UserPrefs = eval(GM_getValue("UserPrefs", "({})"));
		aU.preventDefault();
		for (var i = 0; i < aT.handlers.length; i++) {
			if (aT.handlers[i](aT.form, UserPrefs)) {
				aV = true;
			}
		}
		if (!w) {
			aT.div.parentNode.parentNode.removeChild(aT.div.parentNode);
			pausingprefs = 0;
			if (aV) {
				GM_setValue("UserPrefs", UserPrefs.toSource());
				location.reload();
			}
		} else {
			w = false;
		}
	};
};
Preferences.show = function() {
	return function() {
		if (!document.getElementById("PreferencesMWAHV2.0")) {
			Preferences.pausePrefs();
			var aT = Preferences.init();
			Preferences.populate();
			aT.form.elements.namedItem("onHlist").value = hitlistblock.join(", ");
			aT.form.elements.namedItem("onFHlist").value = fightlistblock.join(", ");
			var aU = GM_getValue("MWAHPref_state", "max");
			if (aU == "min") {
				aT.div.style.display = "none";
			} else {
				aT.div.style.display = "block";
			}
			if (UserPrefs.popuphelp) {
				addPrefHelp();
			}
		}
	};
};
Preferences.pausePrefs = function() {
	pausingprefs = 1;
};
var modules = ["iv", "dd", "cs", "bl", "hl", "aF", "rt", "lv", "bk", "aC", "hp", "jb", "gf", "sk", "sp", "td", "fh", "ot", "snd", "dbm", "cc", "lg"];
function levelupExp() {
	var aT = boss.level;
	var aU = 0;
	if (aT >= 1 && aT <= 5) {
		aU = 20;
	} else if (aT >= 6 && aT <= 10) {
		aU = 60;
	} else if (aT >= 11 && aT <= 14) {
		aU = 100;
	} else if (aT >= 15 && aT <= 114) {
		aU = 300;
	} else if (aT >= 115 && aT <= 314) {
		aU = 500;
	} else if (aT >= 315 && aT <= 514) {
		aU = 1000;
	} else if (aT >= 515 && aT <= 664) {
		aU = 2000;
	} else if (aT >= 665 && aT <= 764) {
		aU = 4000;
	} else if (aT >= 765 && aT <= 889) {
		aU = 8000;
	} else if (aT >= 890 && aT <= 2399) {
		aU = 10000;
	} else if (aT >= 2400) {
		aU = 25000;
	}
	return aU;
}
K.hl_e = hl_e;
function hl_e() {
	if (boss.actions.Dead || boss.actions.stamina) {
		delete boss.actions.hitlist;
		return;
	}
	var aT = "Waiting for health";
	var aU = "Waiting for stamina regeneration...";
	if (!UserPrefs.hitlist_active) {
		if (boss.actions.hitlist) {
			delete boss.actions.hitlist;
		}
		return;
	}
	if (boss.actions.hitlist) {
		if (!boss.actions.hitlist.message.match(aT)) {
			if (!boss.actions.hitlist.message.match(aU)) {
				delete boss.actions.hitlist;
			} else {
				return;
			}
		} else {
			delete boss.actions.hitlist;
		}
	}
	var aV = hitlisttimeblock.length;
	for (var y = 0; y < aV; y++) {
		var aW = hitlisttimeblock[y].split(":");
		if (aW.length == 2) {
			if (parseInt(Page.currenttime) >= parseInt(aW[0]) && (parseInt(Page.currenttime) <= parseInt(aW[1]))) {
				var aX = document.getElementById("targetlock");
				if (aX) {
					aX.innerHTML = "<br><center>Bounty hunting deactivated because of the time of day<br>(as set in preferences)</center><br>";
				}
				if (boss.actions.hitlist) {
					delete boss.actions.hitlist;
				}
				var aY = new Object;
				aY.message = "Checking hitlist...";
				aY.page = "hitlist";
				aY.func = "hl_attack";
				aY.params = [];
				var aZ = 0;
				if (parseInt(aW[1]) == 2359) {
					if (hitlisttimeblock[(y + 1)]) {
						var ba = hitlisttimeblock[(y + 1)].split(":");
						if (parseInt(ba[0]) == 0) {
							aZ = (parseInt(ba[1]) * 60) + 60;
						}
					}
				}
				aY.time = Math.floor((new Date).getTime() / 1000) + (parseInt(aW[1]) - parseInt(Page.currenttime)) * 60 + 60 + aZ;
				boss.actions.hitlist_timedelay = aY;
				return;
			}
		} else if (boss.actions.hitlist_timedelay) {
			delete boss.actions.hitlist_timedelay;
		}
	}
	var aY = new Object;
	if (boss.stamina && (boss.health >= (UserPrefs.hmin / 100) * boss.max_health || UserPrefs.HealShortCut)) {
		aY.message = "Checking hitlist...";
		aY.page = "hitlist";
		aY.func = "hl_attack";
		aY.params = [];
		aY.time = Math.floor((new Date).getTime() / 1000) + UserPrefs.timerdelay;
		boss.actions.hitlist = aY;
	} else {
		if (!boss.stamina) {
			var bb = 107;
			if (UserPrefs.insider) {
				bb = Math.ceil(bb * 0.9);
			}
			aY.message = "Waiting for stamina regeneration...";
			aY.page = "profile";
			aY.time = Math.floor((new Date).getTime() / 1000) + UserPrefs.staminaregen * bb;
			aY.save = true;
			boss.actions.stamina = aY;
			var bc = document.getElementById("cancelstam");
			if (bc) {
				bc.innerHTML = "<a id=\"cancelstamwait\">Cancel Stamina Wait</a><br><br>";
				button = document.getElementById("cancelstamwait");
				if (button) {
					button.addEventListener("click", function() {
						if (boss.actions.stamina) {
							delete boss.actions.stamina;
							boss.save();
							location.reload();
						}
					},
					true);
				}
			}
		} else {
			aY.message = aT + "...Need " + Math.ceil(boss.max_health * (UserPrefs.hmin / 100)) + "...";
			aY.page = "hitlist";
			var bd = 120;
			if (boss.type == "Bulletproof") {
				bd = 107;
			}
			if (UserPrefs.insider) {
				bd = Math.ceil(bd * 0.9);
			}
			aY.time = Math.floor((new Date).getTime() / 1000) + (Math.ceil(boss.max_health * (UserPrefs.hmin / 100)) - boss.health) * bd;
			boss.actions.hitlist = aY;
		}
	}
}
function ae() {
	var aT = new XMLHttpRequest;
	aT.open("GET", "http://apps.facebook.com/mobwars/hospital/do.php?action=heal", true);
	aT.onreadystatechange = function() {
		if (aT.readyState == 4) {
			AjaxHospitalCaptcha_check(aT.responseText);
		}
	};
	aT.send(null);
}
function af(aT, aU, aV, aW, aX, name, aY, aZ, ba, bb, bc) {
	var bd = new XMLHttpRequest;
	if (aV.match(/get/i)) {
		aT = aT + "?" + aU;
		bd.open(aV, aT, true);
		if (UserPrefs.snipe == 2) {
			bd.onreadystatechange = function() {
				if (bd.readyState == 4) {
					AjaxCaptcha_check(bd.responseText, aW, aX, name, aY, aZ, ba, bb);
				}
			};
		}
		bd.send(null);
	} else if (aV.match(/post/i)) {
		bd.open(aV, aT, true);
		bd.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		if (UserPrefs.snipe == 2) {
			bd.onreadystatechange = function() {
				if (bd.readyState == 4) {
					AjaxCaptcha_check(bd.responseText, aW, aX, name, aY, aZ, ba, bb);
				}
			};
		}
		bd.send(aU);
	}
}
function ag(aT) {
	var aU;
	var aV;
	var aW;
	var aX = "";
	var aY = UserPrefs.maxsnipe;
	if (UserPrefs.varysnipe) {
		aY = B(aY, UserPrefs.varysnipeamount);
	}
	if (aY < 1) {
		aY = 1;
	}
	for (var k = 0; k < aT.length; k++) {
		var name = Utils.getElementsByXPath("../../td[position()=1]/a", document.forms[aT[k].split(":")[0]])[0];
		name = name.innerHTML;
		var aZ = document.forms[aT[k].split(":")[0]].getElementsByTagName("INPUT");
		aU = document.forms[aT[k].split(":")[0]].action;
		var ba = document.forms[aT[k].split(":")[0]].method;
		var bb = "";
		var bc;
		for (var j = 0; j < aZ.length; j++) {
			if (aZ[j].type == "submit") {
				bc = aZ[j];
			}
			if (aZ[j].name == "target_id") {
				aV = aZ[j].value;
			}
			if (aZ[j].name) {
				if (j != 0) {
					bb += "&";
				}
				bb += aZ[j].name + "=" + encodeURI(aZ[j].value);
			}
		}
		aW = aT[k].split(":")[1];
		for (var s = 0; s < aY; s++) {
			if ((s + 1) < aY || ((k + 1) < aT.length)) {
				setTimeout(af, UserPrefs.snipedelay, aU, bb, ba, aV, aW, name, false, "S+", false, (aT.length * aY), bc);
			} else {
				setTimeout(af, UserPrefs.snipedelay, aU, bb, ba, aV, aW, name, true, "S+", true, (aT.length * aY), bc);
			}
		}
		aX += "Hitting (sniping) " + aY + " times <a href='http{{//apps.facebook.com/mobwars/profile/?user_id=" + aV + "'>" + name + "</a>...(" + ba.substr(0, 1) + ")";
		if ((k + 1) < aT.length) {
			aX += "<br>";
		} else {
			if (UserPrefs.snipe == 1) {
				if (bc) {
					bc.click();
				}
			}
		}
	}
	var bd;
	if (Page.hitlist) {
		bd = Page.hitlist;
	} else {
		bd = GM_getValue("Lhitlist", "http://apps.facebook.com/mobwars/hitlist/");
	}
	Timer.start(bd, "Reloading hitlist (safety net)...", 35, "net");
	var be = document.getElementById("scriptsnipping");
	if (be) {
		be.innerHTML = aX.replace(/{{/g, ":") + "<br>";
	}
	l("Bounty Hunting{{ " + aX, 2);
}
var ah = 0;
K.hl_attack = hl_attack;
function hl_attack() {
	if (Page.c_page != "hitlist") {
		return;
	}
	var aT;
	var aU = 100;
	var aV = new Array;
	var aW;
	var aX;
	var aY = 0;
	var aZ = "";
	if (UserPrefs.MaxBounty == 0) {
		aT = Infinity;
	} else {
		aT = UserPrefs.MaxBounty;
	}
	var i;
	ah = 0;
	for (i = 0; i < document.forms.length; i++) {
		if (document.forms[i].action.match(/fight\/do.php/i) && (document.forms[i].style.visibility != "hidden")) {
			var ba = Utils.getElementsByXPath("../../td[position()=3]", document.forms[i])[0];
			ba = ba.innerHTML.replace(/[\$,]/g, "");
			ba = parseInt(ba);
			if ((ba >= UserPrefs.MinBounty) & ba <= aT || (UserPrefs.IgnoreMinimumBounty && boss.stamina == boss.max_stamina && ba < aT)) {
				var bb = document.forms[i].getElementsByTagName("INPUT");
				for (var j = 0; j < bb.length; j++) {
					if (bb[j].name == "target_id") {
						aX = bb[j].value;
						break;
					}
				}
				if (in_array_Int(aX, Enforcer)) {
					aZ = "<font color=\"red\">At least one target was blocked<br>(on the enforcer list)</font>!";
					continue;
				}
				if (UserPrefs.hitlistblock) {
					if (in_array_Int(aX, hitlistblock)) {
						aZ = "<font color=\"red\">At least one target blocked</font>!";
						continue;
					}
				}
				if (UserPrefs.snipemore && (UserPrefs.snipe > 0)) {
					aV.push(i + ":" + ba);
					continue;
				}
				if (!UserPrefs.hitlist_target) {
					aY = ba;
					aU = i;
					break;
				} else {
					if (UserPrefs.hitlist_target == 1) {
						if (aY < ba) {
							aU = i;
							aY = ba;
						}
					} else {
						if (aY > ba) {
							aU = i;
							aY = ba;
						} else {
							if (aY == 0) {
								aY = ba;
								aU = i;
							}
						}
					}
				}
			}
		}
	}
	if (UserPrefs.snipemore && (UserPrefs.snipe > 0)) {
		if (aV.length > 0) {
			ag(aV);
			return;
		}
	}
	if (aU != 100) {
		var name = Utils.getElementsByXPath("../../td[position()=1]/a", document.forms[aU])[0];
		name = name.innerHTML;
		if (UserPrefs.snipe > 0) {
			var bb = document.forms[aU].getElementsByTagName("INPUT");
			aW = document.forms[aU].action;
			var bc = document.forms[aU].method;
			var bd = "";
			var be;
			for (var j = 0; j < bb.length; j++) {
				if (bb[j].type == "submit") {
					be = bb[j];
				}
				if (bb[j].name == "target_id") {
					aX = bb[j].value;
				}
				if (bb[j].name) {
					if (j != 0) {
						bd += "&";
					}
					bd += bb[j].name + "=" + encodeURI(bb[j].value);
				}
			}
			boss.fights.target_id = aX;
			boss.fights.target_name = name;
			boss.fights.target_amount = aY;
			boss.save();
			var bf = UserPrefs.maxsnipe;
			if (UserPrefs.varysnipe) {
				bf = B(bf, UserPrefs.varysnipeamount);
			}
			if (bf < 1) {
				bf = 1;
			}
			for (var s = 0; s < bf; s++) {
				if ((s + 1) < bf) {
					setTimeout(af, UserPrefs.snipedelay, aW, bd, bc, aX, aY, name, false, "S", false, bf, be);
				} else {
					setTimeout(af, UserPrefs.snipedelay, aW, bd, bc, aX, aY, name, true, "S", true, bf, be);
					if (UserPrefs.snipe == 1) {
						if (be) {
							be.click();
						}
					}
				}
			}
			var bg;
			if (Page.hitlist) {
				bg = Page.hitlist;
			} else {
				bg = GM_getValue("Lhitlist", "http://apps.facebook.com/mobwars/hitlist/");
			}
			Timer.start(bg, "Reloading hitlist (safety net)...", 35, "net");
			var bh = document.getElementById("scriptsnipping");
			if (bh) {
				bh.innerHTML = "Hitting (sniping) " + bf + " times " + name + "...(" + bc.substr(0, 1) + ")<br>";
			}
			l("Bounty Hunting{{ Hitting (sniping) " + bf + " times <a href='http{{//apps.facebook.com/mobwars/profile/?user_id=" + aX + "'>" + name + "</a>...(" + bc.substr(0, 1) + ")", 2);
			if (aZ != "") {
				var bi = document.getElementById("targetlock");
				if (bi) {
					bi.innerHTML = "<br><center>" + aZ + "</center><br>";
				}
			}
			return;
		} else {
			var be;
			var bb = document.forms[aU].getElementsByTagName("INPUT");
			for (var j = 0; j < bb.length; j++) {
				if (bb[j].type == "submit") {
					be = bb[j];
				}
				if (bb[j].name == "target_id") {
					boss.fights.target_id = bb[j].value;
				}
			}
			boss.fights.target_name = name;
			boss.fights.target_amount = aY;
			boss.save();
			be.click();
			var bj = document.getElementById("scriptstatus");
			if (bj) {
				bj.innerHTML = "Hitting " + name + "...";
			}
			l("Bounty Hunting{{ Hitting <a href='http{{//apps.facebook.com/mobwars/profile/?user_id=" + boss.fights.target_id + "'>" + name + "</a>...", 2);
			if (aZ != "") {
				var bi = document.getElementById("targetlock");
				if (bi) {
					bi.innerHTML = "<br><center>" + aZ + "</center><br>";
				}
			}
			return;
		}
	}
	if (aZ != "") {
		var bi = document.getElementById("targetlock");
		if (bi) {
			bi.innerHTML = "<br><center>" + aZ + "</center><br>";
		}
	}
	var bg;
	if (Page.hitlist) {
		bg = Page.hitlist;
	} else {
		bg = GM_getValue("Lhitlist", "http://apps.facebook.com/mobwars/hitlist/");
	}
	Timer.start(bg, "Reloading hitlist...", B(UserPrefs.BHdelay, 1));
}
function ai(aT, aU, aV) {
	var aW;
	var aX = aT;
	if (aX.length == 0) {
		aX = "homelink";
	}
	if (Page[aX]) {
		aW = Page[aX];
	} else {
		aW = GM_getValue("L" + aX, "http://apps.facebook.com/mobwars/");
	}
	Timer.start(aW, aV, aU, "NextPager");
}
function aj(aT, aU, aV, aW) {
	if (!E.Retry || aW) {
		if (!UserPrefs.PromptAlert) {
			notify();
			alertSound(UserPrefs.sndid, UserPrefs.sndrepeat);
			CaptchaInput.init(aT, aU + "... Please enter manually", aV);
		} else {
			var aX = prompt(aU + "... Please enter manually");
			if (aX) {
				aT.value = aX.substr(0, UserPrefs.captchalength);
				Utils.getElementsByXPath("input[@type=\"submit\"]", aT.parentNode)[0].click();
			}
		}
	} else {
		ai(Page.c_page, 5, aU + ".... reloading....");
	}
}
function ak(aT, aU, aV) {
	GM_xmlhttpRequest({
		method: "GET",
		url: aT.src,
		overrideMimeType: "text/plain; charset=x-user-defined",
		onload: function(r) {
			var aW = "";
			var aX = r.responseText;
			var aY = aX.length;
			for (var i = 0; i < aY; i++) {
				aW += String.fromCharCode(aX.charCodeAt(i) & 255);
			}
			var aZ = btoa(aW);
			var ba;
			if ("GIF" == aX.substr(0, 3)) {
				ba = "data:image/gif;base64,";
			} else if ("PNG" == aX.substr(1, 3)) {
				ba = "data:image/png;base64,";
			} else if ("JFIF" == aX.substr(6, 4)) {
				ba = "data:image/jpg;base64,";
			} else {
				ba = "data:image/huh;base64,";
			}
			SendImage(ba + aZ, aU, aV);
		}
	});
}
function SendImage(aT, aU, aV) {
	E.sysAnswer = false;
	E.transid = "";
	GM_setValue("CaptchaSolver", E.toSource());
	if (z.CaptchaSolver) {
		clearTimeout(z.CaptchaSolver);
		var aW = document.getElementById("scriptstatus");
		if (aW) {
			aW.innerHTML = "";
		}
		aW = document.getElementById("scripttimer");
		if (aW) {
			aW.innerHTML = "";
		}
	}
	if (parseInt(E.MaxRetry) == 0 || (parseInt(E.Retries) <= parseInt(E.MaxRetry))) {
		var aX;
		var aY = Page.c_page;
		if (aY.length == 0) {
			aY = "homelink";
		}
		if (Page[aY]) {
			aX = Page[aY];
		} else {
			aX = GM_getValue("L" + aY, "http://apps.facebook.com/mobwars/");
		}
		if (h) {
			Timer.start(aX, "Waiting for Captcha Solver response (" + E.Retries + ")....", 60, "CaptchaSolver");
		} else {
			Timer.start(aX, "Waiting for Captcha Solver response....", 60, "CaptchaSolver");
		}
		var aZ = "AddOn";
		if (!g) {
			aZ = "GM";
		}
		if (aT) {
			aU.disabled = true;
			GM_xmlhttpRequest({
				method: "POST",
				url: "http://www.SecureWorldHosting.com/MWAutoHelper/Solver/enterc.php",
				data: "&version=" + encodeURIComponent(aZ) + "&client=fbmah&type=" + encodeURIComponent(aV) + "&prod=40&key=" + encodeURIComponent(E.key) + "&user=" + encodeURIComponent(E.user) + "&pass=" + encodeURIComponent(E.pass) + "&imagedata=" + encodeURIComponent(aT),
				headers: {
					'Content-type': "application/x-www-form-urlencoded"
				},
				onload: function(ba) {
					E.rtime = (new Date).getTime();
					if (z.CaptchaSolver) {
						clearTimeout(z.CaptchaSolver);
						var bb = document.getElementById("scriptstatus");
						if (bb) {
							bb.innerHTML = "";
						}
						bb = document.getElementById("scripttimer");
						if (bb) {
							bb.innerHTML = "";
						}
					}
					aU.disabled = false;
					var bc = ba.responseText.split("|");
					if (bc.length > 2) {
						E.transid = bc[1].substr(4);
						if (parseInt(bc[0].substr(6)) != 0) {
							E.valid = bc[0].substr(6) * 1000;
						}
						var bd = bc[2];
						if (h) {
							var be = document.getElementById("MobWarCaptcha");
							if (be) {
								be.innerHTML = bd;
							}
						}
						if (bd.substr(0, 9).match(/SUCCESS: /i)) {
							var bf = E.rtime - E.stime;
							if (bf < E.MinTime * 1000) {
								E.sysAnswer = true;
								aU.value = bd.substr(9, UserPrefs.captchalength);
								Timer.start(Utils.getElementsByXPath("input[@type=\"submit\"]", aU.parentNode)[0], "Entering captcha...", Math.ceil(E.MinTime - bf / 1000), "CapDelay");
							} else {
								if (bf > E.MaxTime * 1000) {
									ReportFailure("true");
									ai(Page.c_page, 5, "Didn't get a response in time... reloading page");
								} else {
									E.sysAnswer = true;
									aU.value = bd.substr(9, UserPrefs.captchalength);
									Utils.getElementsByXPath("input[@type=\"submit\"]", aU.parentNode)[0].click();
								}
							}
						} else {
							switch (bd) {
							case "OFFLINE":
								aj(aU, "The Captcha Solver service is currently offline.", aV, true);
								break;
							case "PIC_FAIL":
								ai(Page.c_page, 5, "Captcha image garbled in transmission... reloading page");
								break;
							case "L_FAILURE":
								break;
							case "TIME_OUT":
								ai(Page.c_page, 5, "Captcha Solver timeout... reloading page");
								break;
							case "H_WORK":
								ai(Page.c_page, 15, "Captcha Solver reports it is overloaded... please wait a few moments and try again... reloading..");
								break;
							case "EXP_ACCOUNT":
								aj(aU, "Your Captcha Solver account expired", aV, true);
								E.UseIt = false;
								break;
							case "NO_ACCOUNT":
								aj(aU, "There is no Captcha Solver account with that username and password", aV, true);
								E.UseIt = false;
								break;
							case "DB_ENTRY":
								break;
							case "QUERY":
								break;
							case "CLIENT":
								break;
							case "PROD":
								break;
							case "TYPE":
								break;
							case "PASS":
								aj(aU, "You must enter your Captcha Solver account password before you can use this service", aV, true);
								E.UseIt = false;
								break;
							case "USER":
								aj(aU, "You must enter your Captcha Solver account user name before you can use this service", aV, true);
								E.UseIt = false;
								break;
							case "NO_IMAGE":
								aj(aU, "Captcha image was not received", aV, false);
								break;
							case "GEN_FAIL":
								aj(aU, "Unknown error (1)", aV, false);
								break;
							case "FAIL":
								aj(aU, "Failed to decode captcha", aV, false);
								break;
							case "NODATA":
								aj(aU, "Captcha image was not received", aV, false);
								break;
							case "BAN":
								aj(aU, "System error", aV, true);
								break;
							case "CREDITS":
								aj(aU, "System error", aV, true);
								break;
							case "UNKNOWN":
								aj(aU, "Unknown error (2)", aV, false);
								break;
							case "GENERAL_ERROR":
								aj(aU, "Unknown error (3)", aV, false);
								break;
							case "MAX_SIZE":
								break;
							case "NET_ERROR":
								ai(Page.c_page, 10, "Network error... reloading page");
								break;
							case "L_ERROR":
								break;
							case "ADD":
								break;
							default:
								aj(aU, "Unknown error from Captcha Solver", aV, false);
								break;
							}
						}
					} else {
						if (h) {
							var be = document.getElementById("MobWarCaptcha");
							if (be) {
								be.innerHTML = ba.responseText;
							}
						}
						aj(aU, "Invalid response from Captcha Solver", aV, false);
					}
					GM_setValue("CaptchaSolver", E.toSource());
				}
			});
		}
	} else {
		var aW = "Maximum retries reached";
		if (!g) {
			aW += "<br><br><font size=1>You are using the GreaseMonkey version of the script.  The Captcha Solver is not as reliable, on all systems, with the GreaseMonkey version.  If you receive a lot of these maximum retries reached errors, you may want to consider upgrading to the AddOn version of the script.<br><br>If you do upgrade, make sure you disable or uninstall the GreaseMonkey version -- both can not run concurrently.<br><br>Also, keep in mind that there can be many reasons for this error, and upgrading may not cure the problem.<br><br></font>";
		}
		aj(aU, aW, aV, true);
	}
}
function ReportFailure(aT) {
	var aU = document.getElementById("MWCapStatus");
	if (aU) {
		aU.innerHTML = "<center>Reporting Captcha Solver result to system (failure)...</center><br><br>";
	}
	GM_xmlhttpRequest({
		method: "POST",
		url: "http://www.SecureWorldHosting.com/MWAutoHelper/Solver/badc.php",
		data: "&client=fbmah&prod=40&time=" + aT + "&transid=" + encodeURIComponent(E.transid),
		headers: {
			'Content-type': "application/x-www-form-urlencoded"
		},
		onload: function(aV) {
			var aW = document.getElementById("MWCapStatus");
			if (aW) {
				aW.innerHTML = "";
			}
		}
	});
}
function al() {
	E.sysAnswer = false;
	E.transid = "";
	E.stime = 0;
	E.rtime = 0;
	if (E.valid == undefined) {
		E.valid = 0;
	}
	if (E.key == undefined) {
		E.key = parseInt(Math.random() * 50000000000);
	}
	GM_setValue("CaptchaSolver", E.toSource());
}
function AjaxHospitalCaptcha_check(aT) {
	var aU = document.getElementById("autoheal");
	if (aU) {
		if (aU.innerHTML.match(/Doing background heal/i)) {
			aU.innerHTML = "";
		}
	}
	var aV = document.createElement("div");
	aV.id = "SnipeReply" + ah;
	aT = aT.split(/<div id="app8743457343_content".*>/)[1];
	var aW = aT.indexOf("<script type=");
	aV.innerHTML = aT.substring(0, (aW - 7));
	if (aT.search(/cap_answer/i) > -1 || (aT.search(/cap_value/i) > -1)) {
		if (aU) {
			aU.innerHTML = "<center><font color=red>Captcha while healing</font></center>";
		}
		document.getElementsByTagName("body")[0].appendChild(aV);
		var aX;
		var aY;
		if (aT.search(/cap_answer/i) > -1) {
			aX = Utils.getElementsByXPath(".//input[@name=\"cap_answer\"]", aV);
			aX = aX[(aX.length - 1)];
		} else {
			aX = Utils.getElementsByXPath(".//input[@name=\"cap_value\"]", aV);
			aX = aX[(aX.length - 1)];
		}
		var aZ;
		var ba = aX.parentNode.parentNode.getElementsByTagName("img")[0];
		boss.captcha_caught_src = ba.src;
		boss.save();
		if (ba.src.match("numeric")) {
			aY = "num";
		} else {
			aY = "letters";
		}
		if (E.UseIt) {
			E.stime = (new Date).getTime();
			aX.disabled = true;
			if (g) {
				var bb = new Image;
				bb.addEventListener("load", function() {
					SendImage(SB_convertImgToBase64Format(bb), aX, aY);
				},
				true);
				bb.src = ba.src;
			} else {
				ak(ba, aX, aY);
			}
		} else {
			var bc = document.getElementById("MobWarCaptcha");
			if (bc) {
				if (UserPrefs.ShowCaptcha) {
					bc.innerHTML = "<center><img src=\"" + boss.captcha_caught_src + "\" id=\"MobWarCaptchaImg\" width=100 height=50></center>";
				}
			} else {
				if (UserPrefs.ShowCaptcha) {
					var bd = document.createElement("div");
					document.getElementsByTagName("body")[0].appendChild(bd);
					bd.className = "HitListSnipeCaptchaSRC";
					var be = ".HitListSnipeCaptchaSRC {position: absolute; z-index: 99; left: 20px; top: 20px; overflow: auto; background-color: white; border: 1px solid black; padding: 10px;";
					GM_addStyle(be);
					bd.innerHTML = "<img src=" + boss.captcha_caught_src + "></img>";
				}
			}
			if (!UserPrefs.PromptAlert) {
				notify();
				alertSound(UserPrefs.sndid, UserPrefs.sndrepeat);
				CaptchaInput.init(aX, "Captcha while background healing -- Need Human attention!!", aY);
			} else {
				aZ = prompt("Captcha while background healing -- Need Human attention!!");
				if (aZ) {
					aX.value = aZ.substr(0, UserPrefs.captchalength);
					Utils.getElementsByXPath("input[@type=\"submit\"]", aX.parentNode)[0].click();
				}
			}
		}
	}
}
function AjaxCaptcha_check(aT, aU, aV, name, aW, aX, aY, aZ) {
	ah += 1;
	var ba = document.createElement("div");
	ba.id = "SnipeReply" + ah;
	aT = aT.split(/<div id="app8743457343_content".*>/)[1];
	var bb = aT.indexOf("<script type=");
	ba.innerHTML = aT.substring(0, (bb - 7));
	document.getElementsByTagName("body")[0].appendChild(ba);
	try {
		CheckFightSnipe(ba, aU, aV, name, aX);
	} catch(bc) {
		l("Error in checking snipe for results{{ " + bc.message, 3);
	}
	if (aT.search(/cap_answer/i) > -1 || (aT.search(/cap_value/i) > -1)) {
		var bd;
		var be;
		if (aT.search(/cap_answer/i) > -1) {
			bd = Utils.getElementsByXPath(".//input[@name=\"cap_answer\"]", ba);
			bd = bd[(bd.length - 1)];
		} else {
			bd = Utils.getElementsByXPath(".//input[@name=\"cap_value\"]", ba);
			bd = bd[(bd.length - 1)];
		}
		if (ah == aZ) {
			if (z.net) {
				clearTimeout(z.net);
				var bf = document.getElementById("scriptstatus");
				if (bf) {
					bf.innerHTML = "";
				}
			}
			var bg;
			var bh = bd.parentNode.parentNode.getElementsByTagName("img")[0];
			boss.captcha_caught_src = bh.src;
			boss.save();
			if (bh.src.match("numeric")) {
				be = "num";
			} else {
				be = "letters";
			}
			if (E.UseIt) {
				E.stime = (new Date).getTime();
				bd.disabled = true;
				if (g) {
					var bi = new Image;
					bi.addEventListener("load", function() {
						SendImage(SB_convertImgToBase64Format(bi), bd, be);
					},
					true);
					bi.src = bh.src;
				} else {
					ak(bh, bd, be);
				}
			} else {
				var bj = document.getElementById("MobWarCaptcha");
				if (bj) {
					if (UserPrefs.ShowCaptcha) {
						bj.innerHTML = "<center><img src=\"" + boss.captcha_caught_src + "\" id=\"MobWarCaptchaImg\" width=100 height=50></center>";
					}
				} else {
					if (UserPrefs.ShowCaptcha) {
						var bk = document.createElement("div");
						document.getElementsByTagName("body")[0].appendChild(bk);
						bk.className = "HitListSnipeCaptchaSRC";
						var bl = ".HitListSnipeCaptchaSRC {position: absolute; z-index: 99; left: 20px; top: 20px; overflow: auto; background-color: white; border: 1px solid black; padding: 10px;";
						GM_addStyle(bl);
						bk.innerHTML = "<img src=" + boss.captcha_caught_src + "></img>";
					}
				}
				if (!UserPrefs.PromptAlert) {
					notify();
					alertSound(UserPrefs.sndid, UserPrefs.sndrepeat);
					CaptchaInput.init(bd, "Possible Captcha while snipping -- Need Human attention!!", be);
				} else {
					bg = prompt("Possible Captcha while snipping -- Need Human attention!!");
					if (bg) {
						bd.value = bg.substr(0, UserPrefs.captchalength);
						Utils.getElementsByXPath("input[@type=\"submit\"]", bd.parentNode)[0].click();
					}
				}
			}
			return;
		} else {}
	}
	if (ah == aZ) {
		if (z.net) {
			clearTimeout(z.net);
		}
		var bm;
		if (Page.hitlist) {
			bm = Page.hitlist;
		} else {
			bm = GM_getValue("Lhitlist", "http://apps.facebook.com/mobwars/hitlist/");
		}
		Timer.start(bm, "Reloading hitlist...", B(UserPrefs.BHdelay, 1), "delay");
	}
}
function CheckFightSnipe(aT, aU, aV, name, aW) {
	RecordResults(aT, aU, name, aV, aW);
}
Log = new Object;
Log.init = function() {
	this.handlers = new Array;
	this.div = document.createElement("div");
	this.div.id = "LogDiv";
	this.div.className = "facebook-gm-log";
	var aT = ".facebook-gm-log { text-align:right; display: none;" + " margin-left: auto; margin-right: auto; border: 1px solid black; padding: 0px; width: 615px; height: " + (pageHeight() - 120) + "px; font-family: Arial; background-color:#EEEEEE; color:#3B5998; padding: 0px; font-weight:bold; }";
	aT += ".facebook-gm-log h1 { font-size: 12pt; text-align:center; background: #6D84B4; color: #FFFFFF; }";
	aT += ".facebook-gm-log table { border-width: 1px; padding: 2px; border-style: solid solid solid solid; }";
	aT += ".facebook-gm-log .td_l { text-align:left; font-size: 10pt; border-width: 1px; padding: 0px; }";
	aT += ".facebook-gm-log .td_r { text-align:right; font-size: 10pt; border-width: 1px; padding: 0px; }";
	aT += ".facebook-gm-log .td_h { font-size: 10pt; border-bottom: solid 1px black; }";
	aT += ".facebook-gm-log .td_c { text-align:center; font-size: 10pt; border-width: 1px; padding: 0px; }";
	aT += ".facebook-gm-log thead.fixedHeader tr { display: block; }";
	aT += ".facebook-gm-log tbody.scrollContent { display: block; overflow: auto; width: 100%; height: " + (pageHeight() - 200) + "px; }";
	aT += ".facebook-gm-log thead.fixedHeader th { width: 115px; }";
	aT += ".facebook-gm-log thead.fixedHeader th + th { width: 500px; }";
	aT += ".facebook-gm-log thead.fixedHeader td { width: 115px; }";
	aT += ".facebook-gm-log thead.fixedHeader td + td { width: 500px; }";
	aT += ".facebook-gm-log tbody.scrollContent td { width: 115px; }";
	aT += ".facebook-gm-log tbody.scrollContent td + td { width: 484px; }";
	GM_addStyle(aT);
};
Log.build = function() {
	var aT = GM_getValue("MWAutoHelperLog", "").split("|");
	var aU = "";
	aU += "<table width=\"615px\" cellspacing=0 id=\"log_table\">";
	aU += "<thead class=\"fixedHeader\"><tr><th class=\"td_h\" align=\"center\">Date</th><th class=\"td_h\" align=\"center\">Log Entry</th></tr></thead><tbody class=\"scrollContent\">";
	var aV;
	for (var aW in aT) {
		if (aT[aW] != "") {
			var aX = new Date(parseFloat(aT[aW].split(":")[0]));
			var aY = aX.getFullYear() + "";
			var aZ = aX.toTimeString() + "";
			aV = (aX.getMonth() + 1) + "/" + aX.getDate() + "/" + aY.substr(2, 2) + " " + aZ.substr(0, 8);
			aU += "<tr><td class=\"td_c\">" + aV + "</td><td>" + aT[aW].split(":")[1].replace(/{{/g, ":") + "</td></tr>";
		}
	}
	aU += "</tbody>";
	aU += "</table>";
	aU += "<br />";
	this.div.innerHTML += aU;
	this.form = document.createElement("form");
	this.form.action = "";
	this.form.method = "";
	this.form.id = "facebook-gm-log";
	this.div.appendChild(this.form);
	this.button_clear = document.createElement("button");
	this.button_clear.type = "button";
	this.button_clear.id = "log_clear";
	this.button_clear.innerHTML = "CLEAR";
	if (aT.length > 1) {
		this.form.appendChild(this.button_clear);
	}
	this.button_close = document.createElement("button");
	this.button_close.type = "button_close";
	this.button_close.id = "log_close";
	this.button_close.innerHTML = "CLOSE";
	this.form.appendChild(this.button_close);
	var ba = GM_getValue("LogList", "20|10").split("|");
	this.divFloat = u.createFloatingDiv(615, ba[0], ba[1], "left", "<h1><a style=\"color:darkblue;\" target=\"_blank\" href=\"http://www.secureworldhosting.com/MWAutoHelper/HomePage.html\">MobWars Auto Helper&#8482; V" + f + "</a> Log</h1>", "LogList", true, true, true);
	this.divFloat.appendChild(this.div);
	document.getElementsByTagName("body")[0].appendChild(this.divFloat);
	this.button_clear.addEventListener("click", this.eventListener(), true);
	this.button_close.addEventListener("click", this.eventListener(), true);
	this.form.addEventListener("submit", this.eventListener(), true);
};
Log.pausingLog = function() {
	pausingLog = 1;
};
Log.eventListener = function() {
	var aT = this;
	return function(aU) {
		if (this.id == "log_clear") {
			GM_setValue("MWAutoHelperLog", (new Date).getTime() + ":Log cleared");
			location.reload();
		}
		aU.preventDefault();
		aT.div.style.display = "none";
		aT.div.parentNode.parentNode.removeChild(aT.div.parentNode);
		pausingLog = 0;
	};
};
Log.show = function() {
	return function() {
		Log.pausingLog();
		var aT = document.getElementById("LogDiv");
		if (!aT) {
			Log.init();
			Log.build();
			aT = document.getElementById("LogDiv");
		}
		if (aT) {
			var aU = GM_getValue("LogList_state", "max");
			if (aU == "min") {
				aT.style.display = "none";
			} else {
				aT.style.display = "block";
			}
		}
	};
};
J.lg_pI = lg_pI;
J.lg_pH = lg_pH;
function lg_pI(aT) {
	var aU = new Array;
	aU.push("<div id=\"lg_toggle\" class=\"PrefMenuToggles\"><table width=\"100%\"><tr><td>Logging Preferences</td></tr></table></div><div id=\"logging_preferences\" style=\"display: none;\">");
	aU.push("<table width=\"100%\">");
	aU.push("<tr id=\"LogStuff\"><td>");
	aU.push("<label for=\"logstuff\">Keep a log of script activity: </label>");
	aU.push("</td><td>");
	var value = UserPrefs.logstuff;
	if (value) {
		aU.push("Yes <input type=\"radio\" name=\"logstuff\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"logstuff\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"logstuff\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"logstuff\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr>");
	aU.push("<tr id=\"LogLevel\"><td width=\"80%\"><label for=\"loglevel\">What actions should be logged: </label></td><td><select name=\"loglevel\">");
	aU.push("<option value=1");
	if (UserPrefs.loglevel == 1) {
		aU.push(" selected=\"selected\"");
	}
	aU.push(">Everything</option><option value=2");
	if (UserPrefs.loglevel == 2) {
		aU.push(" selected=\"selected\"");
	}
	aU.push(">Main Events/Errors</option><option value=3");
	if (UserPrefs.loglevel == 3) {
		aU.push(" selected=\"selected\"");
	}
	aU.push(">Errors only</option>");
	aU.push("</select></td></tr>");
	aU.push("<tr id=\"LogLength\"><td>");
	value = UserPrefs.loglength;
	aU.push("<label for=\"loglength\">How many log entries should be kept:</label>");
	aU.push("</td><td>");
	aU.push("<input type=\"text\" name=\"loglength\" maxlength=\"4\" size=\"4\" ");
	aU.push("value=\"" + value + "\"/>");
	aU.push("</td></tr>");
	aU.push("</table></div><hr>");
	var aV = document.createElement("div");
	if (aV) {
		aV.innerHTML = aU.join("\n");
	}
	var aW = document.getElementById("PrefStuff");
	if (aW) {
		aW.appendChild(aV);
	}
	var button = document.getElementById("lg_toggle");
	if (button) {
		button.addEventListener("click", function() {
			var aX = document.getElementById("logging_preferences");
			if (aX) {
				if (aX.style.display == "none") {
					aX.style.display = "block";
				} else {
					aX.style.display = "none";
				}
			}
		},
		true);
	}
}
function lg_pH(aT, UserPrefs) {
	var aU = false;
	if (isNaN(UserPrefs.loglevel)) {
		UserPrefs.loglevel = 2;
	}
	if (isNaN(UserPrefs.loglength)) {
		UserPrefs.loglength = 100;
	}
	var aV = aT.elements.namedItem("logstuff");
	if (UserPrefs.logstuff != aV.checked) {
		UserPrefs.logstuff = aV.checked;
		aU = true;
	}
	aV = parseInt(aT.elements.namedItem("loglength").value);
	if (isNaN(aV) || (aV < 1)) {
		alert("Invalid input for log length (Logging Preferences).  Preferences not changed.");
		w = true;
	} else {
		if (UserPrefs.loglength != aV) {
			UserPrefs.loglength = aV;
			aU = true;
		}
	}
	aV = aT.elements.namedItem("loglevel");
	aV = aV.options[aV.selectedIndex].value;
	if (UserPrefs.loglevel != aV) {
		UserPrefs.loglevel = aV;
		aU = true;
	}
	return aU;
}
function cs_pI(aT) {
	var aU = new Array;
	aU.push("<div id=\"cs_toggle\" class=\"PrefMenuToggles\"><table width=\"100%\"><tr><td>Captcha Solver</td></tr></table></div><div id=\"CaptchaSolver_preferences\" style=\"display: none;\">");
	if (!g) {
		aU.push("<br><center><font color=darkgreen>You are using the GreaseMonkey version of this script.  The Captcha Solver does not work as reliably with all systems when using the GreaseMonkey version.  If you sign up for this service, and you have less then satisfactory results, please consider upgrading to the AddOn version of this script.<br>If you do upgrade to the AddOn version, be sure to disable or uninstall the GreaseMonkey version, as both can not run concurrently.</font></center><br><br>");
	}
	aU.push("<table width=\"100%\"><tr><td><center>Captcha Solver&#8482 is now available for this script.  For a flat monthly rate, you can have UNLIMITED<font style=\"font-size:8px\">&#42;</font> captchas solved.<br><ol>- No worrying if you have enough 'points'<br>- No need to 'solve' captchas so you can have them solved for you.</ol><font color=\"blue\">Just one flat monthly rate for no worries</font>.<br><br>At the time of this version's publication, the following applies (all in United States Dollars):</center></td></tr><tr><td><center><table border=10><tr><td><table><tr><td>$11.95 - 1 month Unlimited<font style=\"font-size:8px\">&#42;</font> solved Captchas</td></tr></table></td></tr></table></center></td></tr><tr><td>After you subscribe, in a few moments you will receive an email with your username and password.  Enter them here, turn it on, and then just sit back and relax.<br><br>  If you have any questions, you can contact <a href=\"mailto:Donations@SecureWorldHosting.com\">Donations@SecureWorldHosting.com</a><br><br></td></tr></table>");
	aU.push("<table width=\"100%\">");
	var aV = "";
	var aW = "";
	var aX = false;
	if (E.user != undefined) {
		aV = E.user;
	}
	if (E.pass != undefined) {
		aW = E.pass;
	}
	aU.push("<tr><td><center><label for=\"CaptchaUserName\">Captcha Solver User Name:</label><br>");
	aU.push("<input type=\"text\" name=\"CaptchaUserName\" maxlength=\"32\" size=\"32\" ");
	aU.push("value=\"" + aV + "\"></center></td>");
	if (E.valid) {
		if ((new Date).getTime() < E.valid) {
			var aY = new Date(parseFloat(E.valid));
			var aZ = aY.getFullYear() + "";
			var ba = aY.toTimeString() + "";
			var bb = (aY.getMonth() + 1) + "/" + aY.getDate() + "/" + aZ.substr(2, 2) + " " + ba.substr(0, 8);
			aU.push("<td rowspan=2 colspan=2><center>Good Thru: " + bb + "<br><br><font color=\"green\">THANK YOU</font> for your support!!</center>");
		} else {
			aU.push("<td rowspan=2 colspan=2><a href=\"https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5553809\"><img src=\"https://www.paypal.com/en_US/i/btn/btn_subscribeCC_LG.gif\"></img></a>");
		}
	} else {
		aU.push("<td rowspan=2 colspan=2><a href=\"https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5553809\"><img src=\"https://www.paypal.com/en_US/i/btn/btn_subscribeCC_LG.gif\"></img></a>");
	}
	aU.push("</td>");
	aU.push("</tr><tr><td><center>");
	aU.push("<label for=\"CaptchaSolverPassword\">Captcha Solver User Password:</label><br>");
	aU.push("<input type=\"password\" name=\"CaptchaSolverPassword\" maxlength=\"25\" size=\"25\" ");
	aU.push("value=\"" + aW + "\"></center><br></td></tr>");
	aU.push("<tr id=\"UseCaptchaSolver\"><td colspan=2>");
	aU.push("<label for=\"SolveCaptcha\">Use Captcha Solver: </label>");
	aU.push("</td><td>");
	if (E.UseIt != undefined) {
		aX = E.UseIt;
	}
	if (aX) {
		aU.push("Yes <input type=\"radio\" name=\"SolveCaptcha\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"SolveCaptcha\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"SolveCaptcha\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"SolveCaptcha\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr>");
	var value = E.Retry;
	aU.push("<tr id=\"CaptchaSolverRetry\"><td colspan=2>");
	aU.push("<label for=\"SolveCaptchaRetry\">If a Captcha Solver system error should occur, reload and try again: </label>");
	aU.push("</td><td>");
	if (value) {
		aU.push("Yes <input type=\"radio\" name=\"SolveCaptchaRetry\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"SolveCaptchaRetry\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"SolveCaptchaRetry\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"SolveCaptchaRetry\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr>");
	aU.push("<tr id=\"CaptchaSolvermaxretry\"><td colspan=2>");
	aU.push("<label for=\"CaptchaSolverMaxRetry\">Max times to attempt an answer before giving up:</label></td><td>");
	aU.push("<input type=\"text\" name=\"CaptchaSolverMaxRetry\" maxlength=\"2\" size=\"2\" ");
	aU.push("value=\"" + E.MaxRetry + "\">");
	aU.push("</td></tr>");
	aU.push("<tr id=\"CaptchaSolvermintime\"><td colspan=2>");
	aU.push("<label for=\"CaptchaSolverMinTime\">Minimum time allowed for a captcha answer:</label></td><td>");
	aU.push("<input type=\"text\" name=\"CaptchaSolverMinTime\" maxlength=\"1\" size=\"1\" ");
	aU.push("value=\"" + E.MinTime + "\">");
	aU.push("</td></tr>");
	aU.push("<tr id=\"CaptchaSolvermaxtime\"><td colspan=2>");
	aU.push("<label for=\"CaptchaSolverMaxTime\">Max time allowed for a captcha answer:</label></td><td>");
	aU.push("<input type=\"text\" name=\"CaptchaSolverMaxTime\" maxlength=\"2\" size=\"2\" ");
	aU.push("value=\"" + E.MaxTime + "\">");
	aU.push("</td></tr>");
	aU.push("</table><center><font style=\"font-size:8px\">&#42;Capped at 5000/mth -- equivalent to $60 worth on other similar services.  If you should somehow reach this cap, more will be given, at no cost, at Captcha Solver's sole discretion, by request.  Not responsible for any outages, for any reason, that may cause the service to be unavailable.  Captcha Solver success rate solving individual captchas currently hovers around 75%, but may be lower or higher at any given time -- this includes both wrong answers and those that do not get answered in time. 1 month = 30 days. As with anything, there is always a small risk of getting caught violating a TOS somewhere, and thus a penalty of some sort.  As with everything related to this service, we will always work with you to solve any problems you may encounter, but unfortunately can't guarantee all problems can be corrected.</font><center></div><hr>");
	var bc = document.createElement("div");
	if (bc) {
		bc.innerHTML = aU.join("\n");
	}
	var bd = document.getElementById("PrefStuff");
	if (bd) {
		bd.appendChild(bc);
	}
	var button = document.getElementById("cs_toggle");
	if (button) {
		button.addEventListener("click", function() {
			var be = document.getElementById("CaptchaSolver_preferences");
			if (be) {
				if (be.style.display == "none") {
					be.style.display = "block";
				} else {
					be.style.display = "none";
				}
			}
		},
		true);
	}
}
J.cs_pI = cs_pI;
J.cs_pH = cs_pH;
function cs_pH(aT, UserPrefs) {
	var aU = false;
	if (aT.elements.namedItem("CaptchaUserName").value != undefined) {
		if (aT.elements.namedItem("CaptchaUserName").value != E.user) {
			E.user = aT.elements.namedItem("CaptchaUserName").value;
			GM_setValue("CaptchaSolver", E.toSource());
			aU = true;
		}
	}
	if (aT.elements.namedItem("CaptchaSolverPassword").value != undefined) {
		if (aT.elements.namedItem("CaptchaSolverPassword").value != E.pass) {
			E.pass = aT.elements.namedItem("CaptchaSolverPassword").value;
			GM_setValue("CaptchaSolver", E.toSource());
			aU = true;
		}
	}
	if (aT.elements.namedItem("CaptchaSolverMaxRetry").value != undefined && !isNaN(aT.elements.namedItem("CaptchaSolverMaxRetry").value)) {
		if (aT.elements.namedItem("CaptchaSolverMaxRetry").value != E.MaxRetry) {
			E.MaxRetry = aT.elements.namedItem("CaptchaSolverMaxRetry").value;
			GM_setValue("CaptchaSolver", E.toSource());
			aU = true;
		}
	} else {
		alert("Captcha Solver Max Retry entry is invalid.  Not all preferences are changed.");
		w = true;
	}
	if (aT.elements.namedItem("CaptchaSolverMaxTime").value != undefined && !isNaN(aT.elements.namedItem("CaptchaSolverMaxTime").value)) {
		if (aT.elements.namedItem("CaptchaSolverMaxTime").value != E.MaxTime) {
			E.MaxTime = aT.elements.namedItem("CaptchaSolverMaxTime").value;
			GM_setValue("CaptchaSolver", E.toSource());
			aU = true;
		}
	} else {
		alert("Captcha Solver Max Time entry is invalid.  Not all preferences are changed.");
		w = true;
	}
	if (aT.elements.namedItem("CaptchaSolverMinTime").value != undefined && !isNaN(aT.elements.namedItem("CaptchaSolverMinTime").value)) {
		if (aT.elements.namedItem("CaptchaSolverMinTime").value != E.MinTime) {
			E.MinTime = aT.elements.namedItem("CaptchaSolverMinTime").value;
			GM_setValue("CaptchaSolver", E.toSource());
			aU = true;
		}
	} else {
		alert("Captcha Solver Min Time entry is invalid.  Not all preferences are changed.");
		w = true;
	}
	if (aT.elements.namedItem("SolveCaptcha").checked != E.UseIt) {
		E.UseIt = aT.elements.namedItem("SolveCaptcha").checked;
		GM_setValue("CaptchaSolver", E.toSource());
		aU = true;
	}
	if (aT.elements.namedItem("SolveCaptchaRetry").checked != E.Retry) {
		E.Retry = aT.elements.namedItem("SolveCaptchaRetry").checked;
		GM_setValue("CaptchaSolver", E.toSource());
		aU = true;
	}
	return aU;
}
function bl_pI(aT) {
	var aU = new Array;
	aU.push("<div id=\"bl_toggle\" class=\"PrefMenuToggles\"><table width=\"100%\"><tr><td>BlockList Preferences</td></tr></table></div><div id=\"blocklist_preferences\" style=\"display: none;\"><table width=\"100%\">");
	aU.push("<tr><td colspan=3><hr><center>Hitlist/Bounty Hunting only blocklist</center><hr></td></tr>");
	aU.push("<tr id=\"hitlistbck\"><td colspan=2>");
	aU.push("<label for=\"hitlistblock\">Don't attack the mobs on the following list? <br><center><font size=1>(Works in both snipe and safe modes)</font></center></label>");
	aU.push("</td><td>");
	value = UserPrefs.hitlistblock;
	if (value) {
		aU.push("Yes <input type=\"radio\" name=\"hitlistblock\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"hitlistblock\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"hitlistblock\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"hitlistblock\" value=\"0\" checked=\"checked\"/>");
	}
	value = hitlistblock.join(", ");
	aU.push("</td></tr><tr id=\"whoonHlist\"><td><label for=\"onHlist\">On List:</label></td><td colspan=2><textarea cols=\"100\" rows=\"3\" name=\"onHlist\" wrap=virtual>" + value + "</textarea>");
	aU.push("</td></tr><tr><td colspan=3><center><font size=1>Mob IDs must be seperated by \",\" (a comma)</font></center>");
	aU.push("</td></tr><tr id=\"hitlistautoadd\"><td colspan=2>");
	aU.push("<label for=\"hitlistblockauto\">If you lose a battle with someone, automatically add them to the above list?</label>");
	aU.push("</td><td>");
	value = UserPrefs.hitlistblockauto;
	if (value) {
		aU.push("Yes <input type=\"radio\" name=\"hitlistblockauto\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"hitlistblockauto\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"hitlistblockauto\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"hitlistblockauto\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr><tr id=\"hfightsneeded\"><td width=\"5%\"></td><td width=\"75%\">");
	aU.push("<label for=\"hfneeded\">How many fights are needed before we consider blocking?</label>");
	aU.push("</td><td>");
	aU.push("<input type=\"text\" name=\"hfneeded\" maxlength=\"3\" size=\"3\" ");
	value = UserPrefs.hfightsneeded;
	aU.push("value=\"" + value + "\">");
	aU.push("</td></tr><tr id=\"hfightratio\"><td width=\"5%\"></td><td width=\"75%\">");
	aU.push("<label for=\"hfratio\">After the above # of fights, what win ratio is needed:</label>");
	aU.push("</td><td>");
	aU.push("<input type=\"text\" name=\"hfratio\" maxlength=\"3\" size=\"3\" ");
	value = UserPrefs.hratio;
	aU.push("value=\"" + value + "\">%");
	aU.push("</td></tr>");
	aU.push("<tr><td colspan=3><br><br><br><hr><center>Fighter Drone only blocklist</center><hr></td></tr>");
	aU.push("<tr id=\"fightblock\"><td colspan=2>");
	aU.push("<label for=\"fightlistblock\">Don't attack the mobs on the following list?</label>");
	aU.push("</td><td>");
	value = UserPrefs.fightlistblock;
	if (value) {
		aU.push("Yes <input type=\"radio\" name=\"fightlistblock\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"fightlistblock\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"fightlistblock\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"fightlistblock\" value=\"0\" checked=\"checked\"/>");
	}
	value = fightlistblock.join(", ");
	aU.push("</td></tr><tr id=\"fightOnlist\"><td><label for=\"onFHlist\">On List:</label></td><td colspan=2><textarea cols=\"100\" rows=\"3\" name=\"onFHlist\" wrap=virtual>" + value + "</textarea>");
	aU.push("</td></tr><tr><td colspan=3><center><font size=1>Mob IDs must be seperated by \",\" (a comma)</font></center>");
	aU.push("</td></tr><tr id=\"fightautoadd\"><td colspan=2>");
	aU.push("<label for=\"fightlistblockauto\">If you lose a fight with someone, automatically add them to the above list?</label>");
	aU.push("</td><td>");
	value = UserPrefs.fightlistblockauto;
	if (value) {
		aU.push("Yes <input type=\"radio\" name=\"fightlistblockauto\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"fightlistblockauto\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"fightlistblockauto\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"fightlistblockauto\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr><tr id=\"fightsneeded\"><td width=\"5%\"></td><td width=\"75%\">");
	aU.push("<label for=\"fneeded\">How many fights are needed before we consider blocking?</label>");
	aU.push("</td><td>");
	aU.push("<input type=\"text\" name=\"fneeded\" maxlength=\"3\" size=\"3\" ");
	value = UserPrefs.fightsneeded;
	aU.push("value=\"" + value + "\">");
	aU.push("</td></tr><tr id=\"fightratio\"><td width=\"5%\"></td><td width=\"75%\">");
	aU.push("<label for=\"fratio\">After the above # of fights, what win ratio is needed:</label>");
	aU.push("</td><td>");
	aU.push("<input type=\"text\" name=\"fratio\" maxlength=\"3\" size=\"3\" ");
	value = UserPrefs.fratio;
	aU.push("value=\"" + value + "\">%");
	aU.push("</td></tr>");
	value = InYourMob.join(", ");
	aU.push("<tr><td colspan=3><br><br><center>Those in your Mob:</center></td></tr>");
	aU.push("<tr id=\"InYourMoblist\"><td><label for=\"onInYourMoblist\">On List:</label></td><td colspan=2><textarea cols=\"100\" rows=\"3\" name=\"onInYourMoblist\" wrap=virtual>" + value + "</textarea>");
	aU.push("</td></tr><tr><td colspan=3><center><font size=1>Mob IDs must be seperated by \",\" (a comma)</font></center>");
	aU.push("</td></tr>");
	aU.push("<tr><td colspan=3><br><br><hr><center>Hitlist/Bounty Hunting AND Fighter Drone blocklist</center><hr></td></tr>");
	value = Enforcer.join(", ");
	aU.push("<tr><td colspan=3><center>Enforcers and other untouchables:</center></td></tr>");
	aU.push("<tr id=\"Enforcerlist\"><td><label for=\"onEnforcerlist\">On List:</label></td><td colspan=2><textarea cols=\"100\" rows=\"3\" name=\"onEnforcerlist\" wrap=virtual>" + value + "</textarea>");
	aU.push("</td></tr><tr><td colspan=3><center><font size=1>Mob IDs must be seperated by \",\" (a comma)</font></center>");
	aU.push("</td></tr>");
	aU.push("</table></div><hr>");
	var aV = document.createElement("div");
	if (aV) {
		aV.innerHTML = aU.join("\n");
	}
	var aW = document.getElementById("PrefStuff");
	if (aW) {
		aW.appendChild(aV);
	}
	var button = document.getElementById("bl_toggle");
	if (button) {
		button.addEventListener("click", function() {
			var aX = document.getElementById("blocklist_preferences");
			if (aX) {
				if (aX.style.display == "none") {
					aX.style.display = "block";
				} else {
					aX.style.display = "none";
				}
			}
		},
		true);
	}
}
J.bl_pI = bl_pI;
J.bl_pH = bl_pH;
function bl_pH(aT, UserPrefs) {
	var aU = false;
	var aV = aT.elements.namedItem("hitlistblock");
	if (UserPrefs.hitlistblock != aV.checked) {
		if (boss.actions.hitlist) {
			delete boss.actions.hitlist;
		}
		UserPrefs.hitlistblock = aV.checked;
		aU = true;
	}
	aV = aT.elements.namedItem("hitlistblockauto");
	if (UserPrefs.hitlistblockauto != aV.checked) {
		if (boss.actions.hitlist) {
			delete boss.actions.hitlist;
		}
		UserPrefs.hitlistblockauto = aV.checked;
		aU = true;
	}
	aV = aT.elements.namedItem("onHlist").value;
	aV = RemoveDupes(aV);
	if (hitlistblock != aV) {
		GM_setValue("hitlistblock", aV);
		aU = true;
	}
	aV = aT.elements.namedItem("hfneeded").value;
	if (UserPrefs.hfightsneeded != aV) {
		UserPrefs.hfightsneeded = aV;
		aU = true;
	}
	aV = aT.elements.namedItem("hfratio").value;
	if (UserPrefs.hratio != aV) {
		UserPrefs.hratio = aV;
		aU = true;
	}
	aV = aT.elements.namedItem("fratio").value;
	if (UserPrefs.fratio != aV) {
		UserPrefs.fratio = aV;
		aU = true;
	}
	aV = aT.elements.namedItem("fneeded").value;
	if (UserPrefs.fightsneeded != aV) {
		UserPrefs.fightsneeded = aV;
		aU = true;
	}
	aV = aT.elements.namedItem("onFHlist").value;
	aV = RemoveDupes(aV);
	if (fightlistblock != aV) {
		GM_setValue("fightlistblock", aV);
		aU = true;
	}
	aV = aT.elements.namedItem("fightlistblock");
	if (UserPrefs.fightlistblock != aV.checked) {
		UserPrefs.fightlistblock = aV.checked;
		aU = true;
	}
	aV = aT.elements.namedItem("fightlistblockauto");
	if (UserPrefs.fightlistblockauto != aV.checked) {
		UserPrefs.fightlistblockauto = aV.checked;
		aU = true;
	}
	aV = aT.elements.namedItem("onInYourMoblist").value;
	aV = RemoveDupes(aV);
	if (InYourMob != aV) {
		GM_setValue("InYourMob", aV.replace(/,/g, "|"));
		aU = true;
	}
	aV = aT.elements.namedItem("onEnforcerlist").value;
	aV = RemoveDupes(aV);
	if (Enforcer != aV) {
		GM_setValue("Enforcers", aV.replace(/,/g, "|"));
		aU = true;
	}
	return aU;
}
function rt_pI(aT) {
	var aU = new Array;
	aU.push("<div id=\"rt_toggle\" class=\"PrefMenuToggles\"><table width=\"100%\"><tr><td>Retaliate Preferences (Nonfunctional - work in progress)</td></tr></table></div><div id=\"retaliate_preferences\" style=\"display: none;\"><table width=\"100%\">");
	value = 0;
	aU.push("<tr id=\"rtCheckInterval\"><td></td><td>");
	aU.push("<label for=\"rtcheckinterval\">How often should the news/home page be checked?</label>");
	aU.push("</td><td>");
	aU.push("<input type=text\" name=\"rtcheckinterval\" maxlength=\"3\" size=\"3\" ");
	aU.push("value=\"" + value + "\">");
	aU.push("</td></tr>");
	value = 0;
	aU.push("<tr id=\"rtRetaliateLevel\"><td></td><td>");
	aU.push("<label for=\"rtretaliatelevel\">How many attacks warrant retaliation?</label>");
	aU.push("</td><td>");
	aU.push("<input type=text\" name=\"rtretaliatelevel\" maxlength=\"3\" size=\"3\" ");
	aU.push("value=\"" + value + "\">");
	aU.push("</td></tr>");
	value = 0;
	aU.push("<tr id=\"rtAmount\"><td></td><td>");
	aU.push("<label for=\"rtamount\">How many times should we retaliate/attack?</label>");
	aU.push("</td><td>");
	aU.push("<input type=text\" name=\"rtamount\" maxlength=\"3\" size=\"3\" ");
	aU.push("value=\"" + value + "\">");
	aU.push("</td></tr>");
	aU.push("</table></div><hr>");
	var aV = document.createElement("div");
	if (aV) {
		aV.innerHTML = aU.join("\n");
	}
	var aW = document.getElementById("PrefStuff");
	if (aW) {
		aW.appendChild(aV);
	}
	var button = document.getElementById("rt_toggle");
	if (button) {
		button.addEventListener("click", function() {
			var aX = document.getElementById("retaliate_preferences");
			if (aX) {
				if (aX.style.display == "none") {
					aX.style.display = "block";
				} else {
					aX.style.display = "none";
				}
			}
		},
		true);
	}
}
J.rt_pI = rt_pI;
J.rt_pH = rt_pH;
function rt_pH(aT, UserPrefs) {
	var aU = false;
	return aU;
}
function lv_pI(aT) {
	var aU = new Array;
	aU.push("<div id=\"lv_toggle\" class=\"PrefMenuToggles\"><table width=\"100%\"><tr><td>Leveling Partner/Revenge Preferences (Nonfunctional - Work in progress)</td></tr></table></div><div id=\"leveling_preferences\" style=\"display: none;\"><table width=\"100%\">");
	value = "List of your leveling partner's IDs, or those who you want to continually attack when possible, in order of priority";
	aU.push("<tr id=\"LevelList\"><td><label for=\"levellist\">On List:</label></td><td colspan=2><textarea cols=\"100\" rows=\"3\" name=\"levellist\" wrap=virtual>" + value + "</textarea>");
	aU.push("</td></tr><tr><td colspan=3><center><font size=1>Mob IDs must be seperated by \",\" (a comma)</font></center>");
	aU.push("</td></tr>");
	value = 0;
	aU.push("<tr id=\"lvInterval\"><td></td><td>");
	aU.push("<label for=\"LevelingInterval\">At what interval should we traverse the list?</label>");
	aU.push("</td><td>");
	aU.push("<input type=text\" name=\"LevelingInterval\" maxlength=\"3\" size=\"3\" ");
	aU.push("value=\"" + value + "\">");
	aU.push("</td></tr>");
	value = 0;
	aU.push("<tr id=\"lvStamina\"><td></td><td>");
	aU.push("<label for=\"LevelingStamina\">How many stamina points should be used?</label>");
	aU.push("</td><td>");
	aU.push("<input type=text\" name=\"LevelingStamina\" maxlength=\"3\" size=\"3\" ");
	aU.push("value=\"" + value + "\">");
	aU.push("</td></tr>");
	aU.push("</table></div><hr>");
	var aV = document.createElement("div");
	if (aV) {
		aV.innerHTML = aU.join("\n");
	}
	var aW = document.getElementById("PrefStuff");
	if (aW) {
		aW.appendChild(aV);
	}
	var button = document.getElementById("lv_toggle");
	if (button) {
		button.addEventListener("click", function() {
			var aX = document.getElementById("leveling_preferences");
			if (aX) {
				if (aX.style.display == "none") {
					aX.style.display = "block";
				} else {
					aX.style.display = "none";
				}
			}
		},
		true);
	}
}
J.lv_pI = lv_pI;
J.lv_pH = lv_pH;
function lv_pH(aT, UserPrefs) {
	var aU = false;
	return aU;
}
function hl_pI(aT) {
	var value = UserPrefs.hitlist_active;
	var aU = UserPrefs.MaxBounty;
	var aV = UserPrefs.MinBounty;
	var aW = UserPrefs.maxsnipe;
	var aX = UserPrefs.hitlistsnipesafe;
	var aY = new Array;
	aY.push("<div id=\"hl_toggle\" class=\"PrefMenuToggles\"><table width=\"100%\"><tr><td>HitList Preferences</td></tr></table></div><div id=\"hitlist_preferences\" style=\"display: none;\"><table width=\"100%\"><tr id=\"hitlistactive\"><td colspan=2>");
	aY.push("<label for=\"hitlist_active\">Automatically hunt bounties: </label>");
	aY.push("</td><td>");
	if (value) {
		aY.push("Yes <input type=\"radio\" name=\"hitlist_active\" value=\"1\" checked=\"checked\"/>");
		aY.push("No <input type=\"radio\" name=\"hitlist_active\" value=\"0\"/>");
	} else {
		aY.push("Yes <input type=\"radio\" name=\"hitlist_active\" value=\"1\"/>");
		aY.push("No <input type=\"radio\" name=\"hitlist_active\" value=\"0\" checked=\"checked\"/>");
	}
	aY.push("</td></tr>");
	aY.push("<tr><td colspan=3><hr></td></tr><tr><td colspan=3>List all time pairs, in 24hr format, of times you do NOT want the bounty hunting performed.  Time periods going over midnight must be split into two time periods.<br><center>Exmaple: '<b>2330:2359,0:33,100:200, 1832:1944</b>' <br> Would indicate that you <b><i>do not</i></b> want to bounty hunt from 11:30pm thru 12:33am, from 1 thru 2 am, and from 6:32pm thru 7:44pm.<br><br>Going over <b>MIDNIGHT</b> is tricky and <b><i>MUST</i></b> be done in a specific manner.  You must have one time pair end at 2359, and the very next pair must begin at '0', as shown above.</center></td></tr>");
	value = hitlisttimeblock.join(", ");
	aY.push("<tr id=\"HitListBlockTimes\"><td><label for=\"hitlistblocktimes\">Times:</label></td><td colspan=2><textarea cols=\"90\" rows=\"2\" name=\"hitlistblocktimes\" wrap=virtual>" + value + "</textarea>");
	aY.push("</td></tr><tr><td colspan=3><center><font size=1>Time pairs must be seperated by \",\" (a comma)</font></center>");
	aY.push("</td></tr>");
	aY.push("<tr><td colspan=3><hr></td></tr>");
	aY.push("<tr id=\"MaxBounty\"><td width=\"5%\"></td><td width=\"75%\">");
	aY.push("<label for=\"Max_Bounty\">Max Bounty (0 = unlimited)</label>");
	aY.push("</td><td>");
	aY.push("<input type=\"text\" name=\"Max_Bounty\" maxlength=\"12\" size=\"12\" ");
	aY.push("value=\"" + aU + "\">");
	aY.push("</td></tr><tr id=\"MinBounty\"><td></td><td>");
	aY.push("<label for=\"Min_Bounty\">Min Bounty</label>");
	aY.push("</td><td>");
	aY.push("<input type=\"text\" name=\"Min_Bounty\" maxlength=\"10\" size=\"10\" ");
	aY.push("value=\"" + aV + "\">");
	aY.push("</td></tr>");
	value = UserPrefs.IgnoreMinimumBounty;
	aY.push("<tr id=\"ignoreminimumbounty\"><td></td><td colspan>");
	aY.push("<label for=\"IgnoreMinimumBounty\">Ignore the minimum bounty if at full stamina: </label>");
	aY.push("</td><td>");
	if (value) {
		aY.push("Yes <input type=\"radio\" name=\"IgnoreMinimumBounty\" value=\"1\" checked=\"checked\"/>");
		aY.push("No <input type=\"radio\" name=\"IgnoreMinimumBounty\" value=\"0\"/>");
	} else {
		aY.push("Yes <input type=\"radio\" name=\"IgnoreMinimumBounty\" value=\"1\"/>");
		aY.push("No <input type=\"radio\" name=\"IgnoreMinimumBounty\" value=\"0\" checked=\"checked\"/>");
	}
	aY.push("<tr id=\"hitlisttarget\"><td></td><td>");
	aY.push("<label for=\"hitlist_target\">If more then 1 on hitlist, target which: </label>");
	aY.push("</td><td><select name=\"hitlist_target\">");
	aY.push("<option value=\"0\"");
	if (UserPrefs.hitlist_target == "0") {
		aY.push(" selected=\"selected\"");
	}
	aY.push(">First Come</option>");
	aY.push("<option value=\"1\"");
	if (UserPrefs.hitlist_target == "1") {
		aY.push(" selected=\"selected\"");
	}
	aY.push(">Highest bounty</option>");
	aY.push("<option value=\"2\"");
	if (UserPrefs.hitlist_target == "2") {
		aY.push(" selected=\"selected\"");
	}
	aY.push(">Lowest bounty</option>");
	aY.push("</select></td></tr>");
	var value = UserPrefs.snipe;
	aY.push("<tr id=\"hitlistsnipe\"><td colspan=2>");
	aY.push("<label for=\"hitlist_snipe\">Hunt with snipes, safe mode, or safer snipes:<font size=1><br><center>(Snipping WILL, on at least occasion, interfere with data collecting for the fight and victim lists<br> - Unrecorded, missing, or incorrect information.  Sometimes duplicating information)</font></label>");
	aY.push("</td><td>");
	aY.push("<select name=\"hitlist_snipe\">");
	aY.push("<option value=\"0\"");
	if (value == "0") {
		aY.push(" selected=\"selected\"");
	}
	aY.push(">Safe</option>");
	aY.push("<option value=\"1\"");
	if (value == "1") {
		aY.push(" selected=\"selected\"");
	}
	aY.push(">Safe snipe</option>");
	aY.push("<option value=\"2\"");
	if (value == "2") {
		aY.push(" selected=\"selected\"");
	}
	aY.push(">Snipe</option>");
	aY.push("</select>");
	aY.push("</td></tr>");
	aY.push("<tr id=\"maxsnipe\"><td></td><td>");
	aY.push("<label for=\"Max_snipe\">If sniping, snipe how many times? (min 1)</label>");
	aY.push("</td><td>");
	aY.push("<input type=text\" name=\"Max_snipe\" maxlength=\"3\" size=\"3\" ");
	aY.push("value=\"" + aW + "\">");
	aY.push("</td></tr>");
	value = UserPrefs.varysnipe;
	aY.push("<tr id=\"VarySnipe\"><td></td><td>");
	aY.push("<label for=\"varysnipe\">If sniping, vary the number of times you snipe:</label>");
	aY.push("</td><td>");
	if (value) {
		aY.push("Yes <input type=\"radio\" name=\"varysnipe\" value=\"1\" checked=\"checked\"/>");
		aY.push("No <input type=\"radio\" name=\"varysnipe\" value=\"0\"/>");
	} else {
		aY.push("Yes <input type=\"radio\" name=\"varysnipe\" value=\"1\"/>");
		aY.push("No <input type=\"radio\" name=\"varysnipe\" value=\"0\" checked=\"checked\"/>");
	}
	aY.push("</td></tr>");
	value = UserPrefs.varysnipeamount;
	aY.push("<tr id=\"VarySnipeAmount\"><td></td><td>");
	aY.push("<label for=\"varysnipeamount\">If sniping, and vary snipe is on, +/- by how many: (min 1, max 2)</label>");
	aY.push("</td><td>");
	aY.push("<input type=text\" name=\"varysnipeamount\" maxlength=\"1\" size=\"1\" ");
	aY.push("value=\"" + value + "\">");
	aY.push("</td></tr>");
	aY.push("<tr id=\"hitlistsnipemore\"><td></td><td>");
	value2 = UserPrefs.snipemore;
	aY.push("<label for=\"hitlist_snipemore\">Attack multiple targets: *Experimental*</label>");
	aY.push("</td><td>");
	if (value2) {
		aY.push("Yes <input type=\"radio\" name=\"hitlist_snipemore\" value=\"1\" checked=\"checked\"/>");
		aY.push("No <input type=\"radio\" name=\"hitlist_snipemore\" value=\"0\"/>");
	} else {
		aY.push("Yes <input type=\"radio\" name=\"hitlist_snipemore\" value=\"1\"/>");
		aY.push("No <input type=\"radio\" name=\"hitlist_snipemore\" value=\"0\" checked=\"checked\"/>");
	}
	aY.push("</td></tr>");
	value = UserPrefs.snipedelay;
	aY.push("<tr id=\"snipedelay\"><td></td><td>");
	aY.push("<label for=\"SnipeDelay\">If sniping, delay first snipe by how many milliseconds:</label>");
	aY.push("</td><td>");
	aY.push("<input type=text\" name=\"SnipeDelay\" maxlength=\"4\" size=\"4\" ");
	aY.push("value=\"" + value + "\">");
	aY.push("</td></tr>");
	aY.push("<tr id=\"staminaregen\"><td colspan=2>");
	value = UserPrefs.staminaregen;
	aY.push("<label for=\"staminaregen\">When stamina reachs 0, pause until stamina reaches what to restart?</label>");
	aY.push("</td><td>");
	aY.push("<input type=\"text\" name=\"staminaregen\" maxlength=\"3\" size=\"3\" ");
	aY.push("value=\"" + value + "\">");
	aY.push("</td></tr>");
	aY.push("</table></div><hr>");
	var aZ = document.createElement("div");
	if (aZ) {
		aZ.innerHTML = aY.join("\n");
	}
	var ba = document.getElementById("PrefStuff");
	if (ba) {
		ba.appendChild(aZ);
	}
	var button = document.getElementById("hl_toggle");
	if (button) {
		button.addEventListener("click", function() {
			var bb = document.getElementById("hitlist_preferences");
			if (bb) {
				if (bb.style.display == "none") {
					bb.style.display = "block";
				} else {
					bb.style.display = "none";
				}
			}
		},
		true);
	}
}
J.hl_pI = hl_pI;
J.hl_pH = hl_pH;
function hl_pH(aT, UserPrefs) {
	var aU = aT.elements.namedItem("hitlist_active");
	var aV = aT.elements.namedItem("hitlist_snipe");
	var aW = parseInt(aT.elements.namedItem("Max_snipe").value);
	var aX = aT.elements.namedItem("hitlist_snipemore");
	var aY = aT.elements.namedItem("Max_Bounty").value;
	var aZ = aT.elements.namedItem("Min_Bounty").value;
	var ba = parseInt(aT.elements.namedItem("staminaregen").value);
	var bb = false;
	var bc = aT.elements.namedItem("hitlist_target");
	if (UserPrefs.hitlist_target != bc.options[bc.selectedIndex].value) {
		UserPrefs.hitlist_target = bc.options[bc.selectedIndex].value;
		bb = true;
	}
	if (UserPrefs.hitlist_active != aU.checked) {
		if (boss.actions.hitlist) {
			delete boss.actions.hitlist;
		}
		UserPrefs.hitlist_active = aU.checked;
		bb = true;
	}
	aU = aT.elements.namedItem("IgnoreMinimumBounty");
	if (UserPrefs.IgnoreMinimumBounty != aU.checked) {
		UserPrefs.IgnoreMinimumBounty = aU.checked;
		bb = true;
	}
	aU = aT.elements.namedItem("hitlistblocktimes").value;
	var bd = aU.split(",");
	if (bd.length > 1 && (!q)) {
		alert("Non-donators can not have more then one time period in the hitlist time block preferences.  Preferences are not changed.");
		w = true;
	} else {
		for (var x = 0; x < bd.length; x++) {
			if (bd[x].split(":").length != 2) {
				bd.splice(x, 1);
				x--;
				continue;
			}
			if (parseInt(bd[x].split(":")[0]) >= parseInt(bd[x].split(":")[1])) {
				bd.splice(x, 1);
				x--;
				continue;
			}
			bd[x] = parseInt(bd[x].split(":")[0]) + ":" + parseInt(bd[x].split(":")[1]);
		}
		if (hitlisttimeblock != bd.join(",")) {
			GM_setValue("hitlisttimeblock", bd.join(","));
			bb = true;
		}
	}
	aU = parseInt(aT.elements.namedItem("SnipeDelay").value);
	if (UserPrefs.snipedelay != aU) {
		UserPrefs.snipedelay = aU;
		bb = true;
	}
	if (UserPrefs.snipe != aV.options[aV.selectedIndex].value) {
		UserPrefs.snipe = aV.options[aV.selectedIndex].value;
		bb = true;
	}
	if (UserPrefs.MaxBounty != aY) {
		UserPrefs.MaxBounty = aY;
		bb = true;
	}
	if (UserPrefs.staminaregen != ba) {
		UserPrefs.staminaregen = ba;
		bb = true;
	}
	if (UserPrefs.MinBounty != aZ) {
		UserPrefs.MinBounty = aZ;
		bb = true;
	}
	if (UserPrefs.maxsnipe != aW) {
		if (aW < 1) {
			aW = 1;
		}
		UserPrefs.maxsnipe = aW;
		bb = true;
	}
	aU = aT.elements.namedItem("varysnipe");
	if (UserPrefs.varysnipe != aU.checked) {
		UserPrefs.varysnipe = aU.checked;
		bb = true;
	}
	aU = aT.elements.namedItem("varysnipeamount").value;
	if (aU < 1) {
		aU = 1;
	} else if (aU > 2) {
		aU = 2;
	}
	if (UserPrefs.varysnipeamount != aU) {
		UserPrefs.varysnipeamount = aU;
		bb = true;
	}
	if (UserPrefs.snipemore != aX.checked) {
		if (boss.actions.hitlist) {
			delete boss.actions.hitlist;
		}
		UserPrefs.snipemore = aX.checked;
		if (UserPrefs.snipemore) {}
		bb = true;
	}
	return bb;
}
function RemoveDupes(aT) {
	var aU = aT.split(",");
	var aV = new Array;
	for (i = 0; i < aU.length; i) {
		var aW = aU[i];
		aU.splice(i, 1);
		if (!in_array_Int(aW, aU)) {
			if (!isNaN(parseInt(aW))) {
				aV.push(parseInt(aW));
			}
		}
	}
	return aV.join(",");
}
function fh_pI(aT) {
	var aU = new Array;
	var value = UserPrefs.fbhide;
	aU.push("<div id=\"fh_toggle\" class=\"PrefMenuToggles\"><table width=\"100%\"><tr><td>FaceBook Preferences</td></tr></table></div><div id=\"fh_preferences\" style=\"display: none;\"><table width=\"100%\"><tr id=\"fbookhide\"><td colspan=2>");
	aU.push("<label for=\"fbhide\">Hide FaceBook/MobWars advertisements:<br><center><font size=1>Only works if your screen height is less then 700px.  Best if used with main screen adjustment set to on.</font></center></label>");
	aU.push("</td><td>");
	if (value) {
		aU.push("Yes <input type=\"radio\" name=\"fbhide\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"fbhide\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"fbhide\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"fbhide\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr><tr id=\"fbpresencehide\"><td colspan=2>");
	aU.push("<label for=\"fbpresence\">Hide FaceBook Presence Bar:</label>");
	aU.push("</td><td>");
	value = UserPrefs.blockpresence;
	if (value) {
		aU.push("Yes <input type=\"radio\" name=\"fbpresence\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"fbpresence\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"fbpresence\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"fbpresence\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr></table></div><hr>");
	var aV = document.createElement("div");
	if (aV) {
		aV.innerHTML = aU.join("\n");
	}
	var aW = document.getElementById("PrefStuff");
	if (aW) {
		aW.appendChild(aV);
	}
	var button = document.getElementById("fh_toggle");
	if (button) {
		button.addEventListener("click", function() {
			var aX = document.getElementById("fh_preferences");
			if (aX) {
				if (aX.style.display == "none") {
					aX.style.display = "block";
				} else {
					aX.style.display = "none";
				}
			}
		},
		true);
	}
}
J.fh_pI = fh_pI;
J.fh_pH = fh_pH;
function fh_pH(aT, UserPrefs) {
	var aU = aT.elements.namedItem("fbhide");
	var aV = false;
	if (UserPrefs.fbhide != aU.checked) {
		UserPrefs.fbhide = aU.checked;
		aV = true;
	}
	aU = aT.elements.namedItem("fbpresence");
	if (UserPrefs.blockpresence != aU.checked) {
		UserPrefs.blockpresence = aU.checked;
		aV = true;
	}
	return aV;
}
function td_pI(aT) {
	var value = UserPrefs.timerdelay;
	var aU = new Array;
	aU.push("<div id=\"td_toggle\" class=\"PrefMenuToggles\"><table width=\"100%\"><tr><td>Timer Delay Preferences</td></tr></table></div><div id=\"td_preferences\" style=\"display: none;\"><table width=\"100%\"><tr id=\"tdelay\"><td width=\"80%\">");
	aU.push("<label for=\"Timer_Delay\">Default Timer Delay in seconds</label>");
	aU.push("</td><td>");
	aU.push("<input type=\"text\" name=\"Timer_Delay\" maxlength=\"3\" size=\"3\" ");
	aU.push("value=\"" + value + "\"/>");
	aU.push("</td></tr><tr id=\"BHdelay\"><td width=\"80%\">");
	aU.push("<label for=\"BH_Delay\">Bounty Hunting Delay in seconds</label>");
	aU.push("</td><td>");
	aU.push("<input type=\"text\" name=\"BH_Delay\" maxlength=\"3\" size=\"3\" ");
	value = UserPrefs.BHdelay;
	aU.push("value=\"" + value + "\"/>");
	aU.push("</td></tr><tr id=\"FDdelay\"><td width=\"80%\">");
	aU.push("<label for=\"FD_Delay\">Fighter Drone Delay in seconds</label>");
	aU.push("</td><td>");
	aU.push("<input type=\"text\" name=\"FD_Delay\" maxlength=\"3\" size=\"3\" ");
	value = UserPrefs.FDdelay;
	aU.push("value=\"" + value + "\"/>");
	aU.push("</td></tr><tr id=\"rdelay\"><td>");
	value = UserPrefs.refreshdelay;
	aU.push("<label for=\"Refresh_Delay\">Refresh Timer (60 secs min, 0 to disable):</label>");
	aU.push("</td><td>");
	aU.push("<input type=\"text\" name=\"Refresh_Delay\" maxlength=\"4\" size=\"4\" ");
	aU.push("value=\"" + value + "\"/>");
	aU.push("</td></tr>");
	value = UserPrefs.captchatimeoutlength;
	aU.push("<tr id=\"capdelay\"><td>");
	aU.push("<label for=\"Cap_Delay\">Captcha Timer (10 minutes min, 0 to disable):</label>");
	aU.push("</td><td>");
	aU.push("<input type=\"text\" name=\"Cap_Delay\" maxlength=\"3\" size=\"3\" ");
	aU.push("value=\"" + value + "\"/>");
	aU.push("</td></tr>");
	value = UserPrefs.randomizer;
	aU.push("<tr id=\"Randomizer\"><td>");
	aU.push("<label for=\"randomizer\">Automatically vary timer plus or minus 1 second:</label>");
	aU.push("</td><td>");
	if (value) {
		aU.push("Yes <input type=\"radio\" name=\"randomizer\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"randomizer\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"randomizer\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"randomizer\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr>");
	aU.push("</table></div><hr>");
	var aV = document.createElement("div");
	if (aV) {
		aV.innerHTML = aU.join("\n");
	}
	var aW = document.getElementById("PrefStuff");
	if (aW) {
		aW.appendChild(aV);
	}
	var button = document.getElementById("td_toggle");
	if (button) {
		button.addEventListener("click", function() {
			var aX = document.getElementById("td_preferences");
			if (aX) {
				if (aX.style.display == "none") {
					aX.style.display = "block";
				} else {
					aX.style.display = "none";
				}
			}
		},
		true);
	}
}
J.td_pI = td_pI;
J.td_pH = td_pH;
function td_pH(aT, UserPrefs) {
	var aU = parseInt(aT.elements.namedItem("Timer_Delay").value);
	var aV = parseInt(aT.elements.namedItem("BH_Delay").value);
	var aW = parseInt(aT.elements.namedItem("FD_Delay").value);
	var aX = parseInt(aT.elements.namedItem("Refresh_Delay").value);
	var aY = parseInt(aT.elements.namedItem("Cap_Delay").value);
	var aZ = false;
	if (aU != UserPrefs.timerdelay) {
		UserPrefs.timerdelay = aU;
		aZ = true;
	}
	if (aV != UserPrefs.BHdelay) {
		UserPrefs.BHdelay = aV;
		aZ = true;
	}
	if (aW != UserPrefs.FDdelay) {
		UserPrefs.FDdelay = aW;
		aZ = true;
	}
	if (aY < 10) {
		aY = 0;
	}
	if (aY != UserPrefs.captchatimeoutlength) {
		UserPrefs.captchatimeoutlength = aY;
		aZ = true;
	}
	if (aX < 60) {
		aX = 0;
	}
	if (aX != UserPrefs.refreshdelay) {
		UserPrefs.refreshdelay = aX;
		aZ = true;
	}
	var ba = aT.elements.namedItem("randomizer");
	if (UserPrefs.randomizer != ba.checked) {
		UserPrefs.randomizer = ba.checked;
		aZ = true;
	}
	return aZ;
}
var an = eval(GM_getValue("inventory", "({})"));
K.iv_e = iv_e;
function iv_e() {
	boss.city_check = boss.city_check || 0;
	boss.stockpile_check = boss.stockpile_check || 0;
	var aT = ["jobs", "city", "stockpile"];
	if (aT.indexOf(Page.c_page) != -1) {
		var aU = document.getElementById("app8743457343_content");
		if (aU) {
			var aV = Utils.getElementsByXPath(".//a[contains(@name,\"item\")]", aU);
			if (aV) {
				for (var i = 0; i < aV.length; i++) {
					var aW = Utils.getElementsByXPath("./ancestor::tr", aV[i])[0];
					if (aW) {
						var aX = aW.innerHTML.match(/Owned: (<[^<]*>)?(\d+)/);
						if (aX) {
							an[aV[i].name] = parseInt(aX[2]);
						}
					}
				}
				GM_setValue("inventory", an.toSource());
			}
		}
	}
	var aY = "ue;} el";
	var aZ = " = tr" + aY + "se {q";
	if (boss.new_level) {
		if (UserPrefs.newLevelAcCheck) {
			boss.city_check = 1;
		}
		if (UserPrefs.newLevelSpCheck) {
			boss.stockpile_check = 1;
		}
	}
	switch (Page.c_page) {
	case "city":
		itemlist.updateData();
		var ba = 0;
		var bb = 0;
		for (var bc in itemlist) {
			if (itemlist[bc].type != "city") {
				continue;
			}
			var bd = an[bc] || 0;
			ba += bd * itemlist[bc].income;
			var be = itemlist[bc].price / 2;
			while (bd) {
				if (bd >= 10) {
					bb += (10 + bd) * be;
					bd -= 10;
				} else {
					bb += (10 + bd) * bd * be / 10;
					bd = 0;
				}
			}
		}
		boss.total_income = ba;
		boss.city_value = bb;
		N.update();
		break;
	case "stockpile":
		itemlist.updateData();
		var bf = 0;
		var bg = 0;
		for (var bh in itemlist) {
			if (itemlist[bh].type != "stockpile") {
				continue;
			}
			var bi = an[bh] || 0;
			bf += bi * itemlist[bh].upkeep;
			bg += bi * itemlist[bh].price / 2;
		}
		boss.total_upkeep = bf;
		boss.stockpile_value = bg;
		N.update();
		break;
	case "jobs":
		itemlist.updateData();
		break;
	default:
		break;
	}
	var bj = new Object;
	if (boss.city_check == 1 && Page.c_page != "city") {
		bj.page = "city";
		bj.func = "checkcities";
		bj.message = "Checking new buildings available...";
		bj.time = Page.now + Math.floor(Math.random() * 31);
		boss.actions.inventory_city = bj;
		boss.city_check = 0;
	}
	if (boss.stockpile_check == 1 && Page.c_page != "stockpile") {
		bj = new Object;
		bj.page = "stockpile";
		bj.func = "checkstockpile";
		bj.message = "Checking stockpile...";
		bj.time = Page.now;
		boss.actions.inventory_stockpile = bj;
		boss.stockpile_check = 0;
	}
}
function ao() {
	this.payout_min = 0;
	this.payout_max = 0;
	this.exp = 0;
	this.mobsters = 0;
	this.req_items = new Object;
	this.prep_items = new Object;
	this.payout_items = new Object;
}
function int_to_dollars(aT) {
	aT = aT || 0;
	var aU = "";
	while (aT >= 1000) {
		var aV = aT % 1000;
		if (aV > 99) {
			aV = "" + aV;
		} else if (aV > 9) {
			aV = "0" + aV;
		} else {
			aV = "00" + aV;
		}
		aU = "," + aV + aU;
		aT = Math.floor(aT / 1000);
	}
	aU = "$" + aT + aU;
	return aU;
}
function dollars_to_int(aT) {
	if (aT != undefined) {
		return aT.replace(/,|\$/g, "");
	}
	return 0;
}
BVL = new Object;
BVL.init = function() {
	this.handlers = new Array;
	this.div = document.createElement("div");
	this.div.id = "BVLDiv";
	this.div.className = "facebook-gm-bvl";
	var aT = ".facebook-gm-bvl { text-align:right; display: none;" + " margin-left: auto; margin-right: auto; border: 0px solid black; padding: 0px; width: 610px; height: " + (pageHeight() - 120) + "px; font-family: Arial; background-color:#EEEEEE; color:#3B5998; padding:0px; font-weight:bold; }";
	aT += ".facebook-gm-bvl h1 { font-size: 12pt; text-align:center; background: #6D84B4; color: #FFFFFF; }";
	aT += ".facebook-gm-bvl table { border-width: 1px; padding: 0px; border-style: solid solid solid solid; }";
	aT += ".facebook-gm-bvl .td_l { text-align:left; font-size: 10pt; border-width: 1px; padding: 0px; }";
	aT += ".facebook-gm-bvl .td_r { text-align:right; font-size: 10pt; border-width: 1px; padding: 0px; }";
	aT += ".facebook-gm-bvl .td_h { font-size: 10pt; border-bottom: solid 1px black; }";
	aT += ".facebook-gm-bvl thead.fixedHeader tr { display: block; }";
	aT += ".facebook-gm-bvl tbody.scrollContent { display: block; overflow: auto; width: 100%; height: " + (pageHeight() - 220) + "px; }";
	aT += ".facebook-gm-bvl thead.fixedHeader th { width: 20px; }";
	aT += ".facebook-gm-bvl thead.fixedHeader th + th { width: 115px; }";
	aT += ".facebook-gm-bvl thead.fixedHeader th + th + th { width: 355px; }";
	aT += ".facebook-gm-bvl thead.fixedHeader th + th + th + th { width: 110px; }";
	aT += ".facebook-gm-bvl thead.fixedHeader td { width: 20px; }";
	aT += ".facebook-gm-bvl thead.fixedHeader td + td { width: 115px; }";
	aT += ".facebook-gm-bvl thead.fixedHeader td + td + td { width: 330px; }";
	aT += ".facebook-gm-bvl thead.fixedHeader td + td + td + td { width: 110px; }";
	aT += ".facebook-gm-bvl tbody.scrollContent td { width: 20px; }";
	aT += ".facebook-gm-bvl tbody.scrollContent td + td { width: 115px; }";
	aT += ".facebook-gm-bvl tbody.scrollContent td + td + td { width: 355px; }";
	aT += ".facebook-gm-bvl tbody.scrollContent td + td + td + td { width: 94px; }";
	GM_addStyle(aT);
};
BVL.build = function() {
	var aT = GM_getValue("victims", "").split("|");
	var aU = "";
	var aV = 0;
	aU += "<br><table width=\"610px\" cellspacing=0 id=\"bvl_table\">";
	aU += "<thead class=\"fixedHeader\"><tr><th class=\"td_h\" align=\"center\">S</th><th class=\"td_h\" align=\"center\">Date</th><th class=\"td_h\" align=\"left\">Opponent</th><th class=\"td_h\" align=\"left\">Bounty</th></tr></thead><tbody class=\"scrollContent\">";
	var aW;
	var aX;
	var aY = "";
	if (document.location.href.match(/#stop/)) {
		aY = "#stop";
	}
	aT.sort(function(a, b) {
		return Vsorting(a, b);
	});
	if (aT.length > 1) {
		for (var victim in aT) {
			if (aT[victim].split(":")[0] != "") {
				aX = " ";
				aW = "NR";
				if (aT[victim].split(":")[3] != undefined) {
					var aZ = new Date(parseFloat(aT[victim].split(":")[3]));
					var ba = aZ.getFullYear() + "";
					var bb = aZ.toTimeString() + "";
					aW = (aZ.getMonth() + 1) + "/" + aZ.getDate() + "/" + ba.substr(2, 2) + " " + bb.substr(0, 8);
				}
				if (aT[victim].split(":")[1] != "") {
					aU += "<tr style=\"cursor:pointer\" onclick=\"window.location.href='http://apps.facebook.com/mobwars/profile/?user_id=" + aT[victim].split(":")[1] + aY + "';\">";
				} else {
					aU += "<tr>";
				}
				if (aT[victim].split(":")[4] != undefined) {
					aX = aT[victim].split(":")[4];
				}
				var bc;
				if (!isNaN(aT[victim].split(":")[2])) {
					bc = int_to_dollars(aT[victim].split(":")[2]);
				} else {
					bc = aT[victim].split(":")[2];
				}
				aU += "<td class+\"td_l\">" + aX + "</td>";
				aU += "<td class=\"td_l\">" + aW + "</td><td class=\"td_l\">" + aT[victim].split(":")[0] + "</td><td class=\"td_r\">" + bc + "</td></tr>";
				aV += parseInt(dollars_to_int(bc));
			}
		}
	}
	aU += "</tbody><thead class=\"fixedHeader\"><tr id=\"bvl_table_total\"><td style=\"border-top:1px solid black;\"></td><td style=\"border-top:1px solid black;\"></td><td nowrap class=\"td_r\"  style=\"border-top:1px solid black;\">TOTAL BOUNTIES COLLECTED:</td><td nowrap class=\"td_r\" style=\"border-top:1px solid black;color:green\" id=\"bvl_total_bounties\">" + int_to_dollars(aV) + "</td></tr></thead>";
	aU += "</table>";
	aU += "<br />";
	this.div.innerHTML = aU;
	this.form = document.createElement("form");
	this.form.action = "";
	this.form.method = "";
	this.form.id = "facebook-gm-bvl";
	this.div.appendChild(this.form);
	this.button_clear = document.createElement("button");
	this.button_clear.type = "button";
	this.button_clear.id = "bvl_clear";
	this.button_clear.innerHTML = "CLEAR";
	if (aT.length > 1) {
		this.form.appendChild(this.button_clear);
	}
	this.button_close = document.createElement("button");
	this.button_close.type = "button_close";
	this.button_close.id = "bvl_close";
	this.button_close.innerHTML = "CLOSE";
	this.form.appendChild(this.button_close);
	var bd = GM_getValue("VictimList", "20|20").split("|");
	this.divFloat = u.createFloatingDiv(610, bd[0], bd[1], "left", "<h1><a style=\"color:darkblue;\" target=\"_blank\" href=\"http://www.secureworldhosting.com/MWAutoHelper/HomePage.html\">MobWars Auto Helper&#8482; V" + f + "</a> Bounty Victim List</h1>", "VictimList", true, true, true);
	this.divFloat.appendChild(this.div);
	document.getElementsByTagName("body")[0].appendChild(this.divFloat);
	this.button_clear.addEventListener("click", this.eventListener(), true);
	this.button_close.addEventListener("click", this.eventListener(), true);
	this.form.addEventListener("submit", this.eventListener(), true);
};
BVL.pausingVictims = function() {
	pausingVictims = 1;
};
BVL.eventListener = function() {
	var aT = this;
	return function(aU) {
		if (this.id == "bvl_clear") {
			GM_setValue("victims", "");
			location.reload();
		}
		aU.preventDefault();
		aT.div.style.display = "none";
		aT.div.parentNode.parentNode.removeChild(aT.div.parentNode);
		pausingVictims = 0;
	};
};
BVL.show = function() {
	return function() {
		BVL.pausingVictims();
		var aT = document.getElementById("BVLDiv");
		if (!aT) {
			BVL.init();
			BVL.build();
			aT = document.getElementById("BVLDiv");
		}
		if (aT) {
			var aU = GM_getValue("VictimList_state", "max");
			if (aU == "min") {
				aT.style.display = "none";
			} else {
				aT.style.display = "block";
			}
		}
	};
};
var Enforcer = GM_getValue("Enforcers", "1439889063|1646335294|1750411381|1746987705").split("|");
if (Enforcer == "") {
	Enforcer = "1439889063|1646335294|1750411381|1746987705".split("|");
}
var InYourMob, hitlistblock, hitlisttimeblock, fightlistblock;
function ap() {
	var aT = eval(GM_getValue("jobs", "({})"));
	for (var i in aT) {
		this[i] = aT[i];
	}
}
ap.prototype = new Object;
ap.prototype.save = function() {
	GM_setValue("jobs", this.toSource());
};
ap.prototype.updateData = function() {
	if (Page.c_page == "jobs") {
		for (var aT in this) {
			if (typeof this[aT] == "object") {
				delete this[aT];
			}
		}
		var aU = document.getElementById("app8743457343_content");
		var aV;
		if (aU) {
			aV = Utils.getElementsByClassName("rowData", aU);
		}
		if (aV) {
			for (var i = 0; i < aV.length; i++) {
				var aW = aV[i];
				var aX = new ao;
				var aY = aW.getElementsByTagName("b")[0];
				aX.name = aY.innerHTML;
				aY = aW.innerHTML.match(/Payout:.*\$([0-9,]+) - \$([0-9,]+)/);
				if (aY) {
					aX.payout_min = parseInt(aY[1].replace(/,/g, ""));
					aX.payout_max = parseInt(aY[2].replace(/,/g, ""));
				}
				aY = aW.innerHTML.match(/Experience: \+(\d+)/);
				if (aY) {
					aX.exp = parseInt(aY[1]);
				}
				aY = aW.innerHTML.match(/Mobsters:\&nbsp;(\d+)/);
				if (aY) {
					aX.mobsters = parseInt(aY[1]);
				}
				aY = aW.innerHTML.match(/Energy:\&nbsp;(\d+)/);
				if (aY) {
					aX.energy = parseInt(aY[1]);
				}
				var aZ = Utils.getElementsByXPath(".//a[contains(@href,\"#item\")]", aW);
				if (aZ) {
					for (var j = 0; j < aZ.length; j++) {
						aY = aZ[j].href;
						aY = aY.match(/(jobs\/|stockpile\/|power_item|weapon|armor|vehicle|city\/)?#(item_\d+)/);
						var ba = aY[2];
						aY = aZ[j].nextSibling;
						if (aY.tagName == "SPAN" && (aY = aY.innerHTML.match(/\((use |\+)?(\d+)(%)?\)/))) {
							if (aY[1] == "use ") {
								aX.prep_items[ba] = parseInt(aY[2]);
							} else if (aY[1] == "+") {
								aX.payout_items[ba] = parseInt(aY[2]);
							} else if (aY[3] == "%") {
								aX.payout_items[ba] = 1;
							} else {
								aX.req_items[ba] = parseInt(aY[2]);
							}
						} else {
							aX.req_items[ba] = 1;
						}
					}
				}
				aY = Utils.getElementsByXPath(".//input[@name=\"jobid\"]", aW)[0];
				if (aY) {
					this[aY.value] = aX;
				}
			}
			this.save();
		}
	}
};
K.jb_e = jb_e;
function jb_e() {
	if (boss.job_income == undefined) {
		boss.job_income = 0;
	}
	var aT = new ap;
	if (Page.c_page == "jobs") {
		aT.updateData();
	} else if (boss.new_level) {
		if (UserPrefs.newLevelJbCheck) {
			var aU = new Object;
			aU.page = "jobs";
			aU.message = "Checking new jobs available...";
			aU.time = Page.now + Math.floor(Math.random() * 31);
			boss.actions.jobs_check = aU;
			return;
		}
	}
	var aV = UserPrefs.job;
	var aW;
	switch (aV) {
	case "none":
		boss.job_income = 0;
		N.update();
		if (aV != UserPrefs.actualjob) {
			if (UserPrefs.autoCityBuy) {
				UserPrefs.actualjob = aV;
				GM_setValue("UserPrefs", UserPrefs.toSource());
				boss.autoCityBuy_item = "";
				boss.autoCityBuy_qty = 0;
				boss.autoCityBuy_cost = 0;
				if (boss.actions.autoCityBuy) {
					delete boss.actions.autoCityBuy;
				}
				if (boss.actions.autoCityBuyGo) {
					delete boss.actions.autoCityBuyGo;
				}
				var aX = new Object;
				aX.message = "You changed jobs, recalculating next city purchase...";
				aX.page = "city";
				aX.func = "checkcities";
				aX.params = [];
				aX.time = 1;
				boss.actions.inventory_city = aX;
			}
		}
		return;
	case "payout":
		aV = jobs_selectJob(aT, false);
		if (!aV) {
			aW = "You can not perform any job.";
		}
		break;
	case "exp":
		aV = jobs_selectJob(aT, true);
		if (!aV) {
			aW = "You can not perform any job.";
		}
		break;
	default:
		if (!jobs_canDoJob(aT[aV])) {
			aW = "You can not perform the job '" + aT[aV].name + "'";
			aV = 0;
			break;
		}
		var aY;
		if (aY = jobs_needPrepJob(aT, aV)) {
			if (!jobs_canDoJob(aT[aY])) {
				aW = "You can not perform the preparatory job '" + aT[aY].name + "' for '" + aT[aV].name + "'";
				aV = 0;
				break;
			} else {
				jobs_updateIncome(aV);
				aV = aY;
			}
		} else {
			jobs_updateIncome(aV);
		}
		break;
	}
	if (aV != UserPrefs.actualjob) {
		if (UserPrefs.autoCityBuy) {
			UserPrefs.actualjob = aV;
			GM_setValue("UserPrefs", UserPrefs.toSource());
			boss.autoCityBuy_item = "";
			boss.autoCityBuy_qty = 0;
			boss.autoCityBuy_cost = 0;
			if (boss.actions.autoCityBuy) {
				delete boss.actions.autoCityBuy;
			}
			if (boss.actions.autoCityBuyGo) {
				delete boss.actions.autoCityBuyGo;
			}
			var aX = new Object;
			aX.message = "You changed jobs, recalculating next city purchase...";
			aX.page = "city";
			aX.func = "checkcities";
			aX.params = [];
			aX.time = 1;
			boss.actions.inventory_city = aX;
		}
	}
	if (!aV) {
		var aZ = document.getElementById("scripterror");
		if (aZ) {
			aZ.innerHTML = "<center>" + aW + "<br><br></center>";
		}
		if (boss.actions.jobs) {
			delete boss.actions.jobs;
		}
		boss.job_income = 0;
		N.update();
		return;
	}
	if (boss.actions.jobs) {
		delete boss.actions.jobs;
	}
	var ba = new Object;
	ba.page = "jobs";
	ba.message = "Doing " + aT[aV].name + "...";
	ba.func = "jb_dojob";
	ba.params = [aV, aT[aV].name];
	var bb;
	if (boss.type == "Insomniac") {
		bb = 240;
	} else {
		bb = 300;
	}
	if (UserPrefs.insider) {
		bb = Math.ceil(bb * 0.9);
	}
	ba.time = (Page.now + (aT[aV].energy - boss.energy) * bb) + UserPrefs.jobdelay * 60;
	if (boss.energy_time) {
		ba.time -= (ba.time - boss.energy_time) % bb;
	}
	boss.actions.jobs = ba;
}
function jobs_updateIncome(aT) {
	if (!aT) {
		boss.job_income = 0;
		N.update();
		return;
	}
	var aU = jobs_payRatio(aT);
	var aV;
	switch (boss.type) {
	case "Insomniac":
		aV = 15;
		break;
	case "Tycoon":
		aV = 10.8;
		break;
	default:
		aV = 12;
		break;
	}
	if (boss.job_income != Math.floor(aV * aU)) {
		boss.job_income = Math.floor(aV * aU);
		N.update();
	}
}
function jobs_canDoJob(aT) {
	for (var aU in aT.req_items) {
		if (aT.req_items[aU] > an[aU]) {
			return false;
		}
	}
	if (aT.mobsters > boss.mobsters) {
		return false;
	}
	if (aT.energy > boss.max_energy) {
		return false;
	}
	return true;
}
function jobs_needPrepJob(aT, aU) {
	for (var aV in aT[aU].prep_items) {
		if (aT[aU].prep_items[aV] > an[aV]) {
			for (var aW in aT) {
				if (aT[aW].payout_items[aV]) {
					return aW;
				}
			}
		}
	}
	return 0;
}
function jobs_payRatio(aT, aU) {
	if (!aU) {
		aU = new ap;
	}
	var aV = aU[aT].energy + 0;
	for (var aW in aU[aT].prep_items) {
		aV += aU[aT].prep_items[aW] * itemlist[aW].energy_per_unit;
	}
	aV = (aU[aT].payout_min + aU[aT].payout_max) / aV;
	return aV / 2;
}
function jobs_selectJob(aT, aU) {
	var aV = 0;
	var aW = 0;
	var aX = 0;
	var aY = 0;
	var aZ;
	var ba;
	for (aZ in aT) {
		if (!aT[aZ].name) {
			continue;
		}
		var bb = 0 + aT[aZ].exp / aT[aZ].energy;
		var bc = jobs_payRatio(aZ, aT);
		if (aU) {
			if (bb < aW || (bb == aW && bc < aV)) {
				continue;
			}
		} else {
			if (bc < aV || (bc == aV && bb < aW)) {
				continue;
			}
		}
		if (!jobs_canDoJob(aT[aZ])) {
			continue;
		}
		var bd;
		if (bd = jobs_needPrepJob(aT, aZ)) {
			if (!jobs_canDoJob(aT[bd])) {
				continue;
			} else {
				aX = bd;
			}
		} else {
			aX = aZ;
		}
		aY = aZ;
		aV = bc;
		aW = bb;
	}
	jobs_updateIncome(aY);
	return aX;
}
K.jb_dojob = jb_dojob;
function jb_dojob(aT, aU) {
	aU = aU || 5;
	aU = aU - 2;
	if (aU < 0) {
		aU = 0;
	}
	if (UserPrefs.bank_active) {
		var aV = new ap;
		if (aV[aT[0]].payout_min > 0) {
			var aW = new Object;
			aW.message = "Going to the bank...";
			aW.page = "bank";
			aW.func = "bk_deposit";
			aW.params = [];
			aW.time = 1;
			boss.actions.bank = aW;
		}
	}
	var aX = Utils.getElementsByXPath("//input[@name=\"jobid\" and @value=\"" + aT[0] + "\"]/../input[@type=\"submit\"]");
	Timer.start(aX[0], "Doing " + aT[1] + "...", aU);
	l("Doing " + aT[1] + "... in " + aU, 2);
}
function jb_pI(aT) {
	var aU = new ap;
	var aV = new Array;
	aV.push("<div id=\"jb_toggle\" class=\"PrefMenuToggles\"><table width=\"100%\"><tr><td>Job Preferences</td></tr></table></div><div id=\"jb_preferences\" style=\"display: none;\"><table width=\"100%\"><tr id=\"joblist\"><td width=\"80%\"><label for=\"joblist\">Job to perform: </label></td><td><select name=\"joblist\">");
	aV.push("<option value=\"none\"");
	if (UserPrefs.job == "none") {
		aV.push(" selected=\"selected\"");
	}
	aV.push(">None</option><option value=\"payout\"");
	if (UserPrefs.job == "payout") {
		aV.push(" selected=\"selected\"");
	}
	aV.push(">Best payout/energy</option><option value=\"exp\"");
	if (UserPrefs.job == "exp") {
		aV.push(" selected=\"selected\"");
	}
	aV.push(">Best experience/energy</option>");
	for (var aW in aU) {
		if (aU[aW].name) {
			aV.push("<option value=\"" + aW + "\"");
			if (UserPrefs.job == aW) {
				aV.push(" selected=\"selected\" ");
			}
			aV.push(">" + aU[aW].name);
			aV.push("</option>");
		}
	}
	aV.push("</select></td></tr><tr id=\"JobDelay\"></td><td>");
	aV.push("<label for=\"jobdelay\">Delay doing a job by: (minutes)</label>");
	aV.push("</td><td>");
	aV.push("<input type=\"text\" name=\"jobdelay\" maxlength=\"3\" size=\"3\" ");
	var aX = UserPrefs.jobdelay;
	aV.push("value=\"" + aX + "\">");
	aV.push("</td></tr>");
	aV.push("<tr id=\"newleveljbcheck\"><td>");
	var value = UserPrefs.newLevelJbCheck;
	aV.push("<label for=\"newLevelJbCheck\">Check for new jobs available at new levels: </label>");
	aV.push("</td><td>");
	if (value) {
		aV.push("Yes <input type=\"radio\" name=\"newLevelJbCheck\" value=\"1\" checked=\"checked\"/>");
		aV.push("No <input type=\"radio\" name=\"newLevelJbCheck\" value=\"0\"/>");
	} else {
		aV.push("Yes <input type=\"radio\" name=\"newLevelJbCheck\" value=\"1\"/>");
		aV.push("No <input type=\"radio\" name=\"newLevelJbCheck\" value=\"0\" checked=\"checked\"/>");
	}
	aV.push("</td></tr>");
	aV.push("</table></div><hr>");
	var aY = document.createElement("div");
	if (aY) {
		aY.innerHTML = aV.join("\n");
	}
	var aZ = document.getElementById("PrefStuff");
	if (aZ) {
		aZ.appendChild(aY);
	}
	var button = document.getElementById("jb_toggle");
	if (button) {
		button.addEventListener("click", function() {
			var ba = document.getElementById("jb_preferences");
			if (ba) {
				if (ba.style.display == "none") {
					ba.style.display = "block";
				} else {
					ba.style.display = "none";
				}
			}
		},
		true);
	}
}
J.jb_pI = jb_pI;
J.jb_pH = jb_pH;
function jb_pH(aT, UserPrefs) {
	var aU;
	var aV = false;
	var aW = aT.elements.namedItem("joblist");
	aU = aW.options[aW.selectedIndex].value;
	if (aU != UserPrefs.job) {
		if (boss.actions.jobs) {
			delete boss.actions.jobs;
		}
		UserPrefs.job = aU;
		aV = true;
	}
	var aX = parseInt(aT.elements.namedItem("jobdelay").value);
	if (!isNaN(aX)) {
		if (UserPrefs.jobdelay != aX) {
			UserPrefs.jobdelay = aX;
			aV = true;
		}
	}
	var aX = aT.elements.namedItem("newLevelJbCheck");
	if (UserPrefs.newLevelJbCheck != aX.checked) {
		UserPrefs.newLevelJbCheck = aX.checked;
		aV = true;
	}
	return aV;
}
function snd_pI(aT) {
	var aU = new Array;
	var aV = UserPrefs.pmobsound;
	aU.push("<div id=\"snd_toggle\" class=\"PrefMenuToggles\"><table width=\"100%\"><tr><td>Sound Preferences</td></tr></table></div><div id=\"snd_preferences\" style=\"display: none;\"><table width=\"100%\"><tr><td colspan=2><center><font size=1>The flash bash sounds/music provided on the following list are hosted on external servers, and as such may be changed at any time.  Jave and Quicktime based sounds are internal to the script and will only potentially change between versions.</font></center></td></tr><tr id=\"SndList\"><td width=\"80%\"><label for=\"sndlist\">Sound to use when mob boss attention is needed: </label></td><td><select name=\"sndlist\">");
	aU.push("<option value=\"none\"");
	if (UserPrefs.sndid == "none") {
		aU.push(" selected=\"selected\"");
	}
	aU.push(">None</option>");
	for (var aW = 0; aW < snds.length; aW++) {
		aU.push("<option value=\"" + snds[aW][0] + "\"");
		if (UserPrefs.sndid == snds[aW][0]) {
			aU.push(" selected=\"selected\" ");
		}
		aU.push(">" + snds[aW][0]);
		aU.push("</option>");
	}
	aU.push("</select></td></tr><tr id=\"PMobSound\"><td width=\"80%\">");
	aU.push("<label for=\"pmobs\">Use sound with the Pause Mobster:</label>");
	aU.push("</td><td>");
	if (aV) {
		aU.push("Yes <input type=\"radio\" name=\"pmobs\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"pmobs\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"pmobs\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"pmobs\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr><tr id=\"SndRepeat\"></td><td>");
	aU.push("<label for=\"sndrepeat\">Times to repeat sound: </label>");
	aU.push("</td><td>");
	aU.push("<input type=\"text\" name=\"sndrepeat\" maxlength=\"3\" size=\"3\" ");
	var aX = UserPrefs.sndrepeat;
	aU.push("value=\"" + aX + "\">");
	aU.push("</td></tr></table><center><a id=\"testsnd\">Test Sound</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a id=\"stopsnd\">Stop Test</a></center></div><hr>");
	var aY = document.createElement("div");
	if (aY) {
		aY.innerHTML = aU.join("\n");
	}
	var aZ = document.getElementById("PrefStuff");
	if (aZ) {
		aZ.appendChild(aY);
	}
	var button = document.getElementById("snd_toggle");
	if (button) {
		button.addEventListener("click", function() {
			var ba = document.getElementById("snd_preferences");
			if (ba) {
				if (ba.style.display == "none") {
					ba.style.display = "block";
				} else {
					ba.style.display = "none";
				}
			}
		},
		true);
	}
	button = document.getElementById("testsnd");
	if (button) {
		button.addEventListener("click", function() {
			cur_f = Infinity;
			var ba = document.getElementById("alertSound2");
			if (ba) {
				ba.parentNode.removeChild(ba);
			}
			var bb = aT.form.elements.namedItem("sndlist");
			var bc = bb.options[bb.selectedIndex].value;
			if (bc != "none") {
				alertSound(bc, aT.form.elements.namedItem("sndrepeat").value, true);
			}
		},
		true);
	}
	button = document.getElementById("stopsnd");
	if (button) {
		button.addEventListener("click", function() {
			cur_f = Infinity;
			var ba = document.getElementById("alertSound2");
			if (ba) {
				ba.parentNode.removeChild(ba);
			}
		},
		true);
	}
}
J.snd_pI = snd_pI;
J.snd_pH = snd_pH;
function snd_pH(aT, UserPrefs) {
	var aU;
	var aV = false;
	var aW = aT.elements.namedItem("sndlist");
	aU = aW.options[aW.selectedIndex].value;
	if (aU != UserPrefs.sndid) {
		if (aU != "none") {
			UserPrefs.alertsound = true;
		} else {
			UserPrefs.alertsound = false;
		}
		UserPrefs.sndid = aU;
		aV = true;
	}
	var aX = aT.elements.namedItem("pmobs");
	if (UserPrefs.pmobsound != aX.checked) {
		UserPrefs.pmobsound = aX.checked;
		aV = true;
	}
	var aY = parseInt(aT.elements.namedItem("sndrepeat").value);
	if (!isNaN(aY)) {
		if (UserPrefs.sndrepeat != aY) {
			UserPrefs.sndrepeat = aY;
			aV = true;
		}
	}
	return aV;
}
function aq() {
	var aT = document.forms[2].elements.namedItem("deposit_amount").value;
	var aU = document.forms[1].elements.namedItem("withdraw_amount");
	var aV = function() {
		var i, aZ;
		var ba = this.value;
		if (!isNaN(ba)) {
			aU.value = Math.max(0, ba - aT);
		}
	};
	var aW = document.createElement("input");
	aW.setAttribute("type", "text");
	aW.style.marginBottom = "2px";
	aW.addEventListener("keyup", aV, true);
	var aX = document.createElement("label");
	aX.innerHTML = "Desired Cash Total: ";
	aX.style.marginLeft = aW.style.marginBottom;
	aX.style.marginBottom = aW.style.marginBottom;
	aX.style.fontWeight = "normal";
	aX.style.color = "white";
	var aY = document.getElementById("app8743457343_content");
	if (aY) {
		aY.appendChild(aX);
		aY.appendChild(aW);
	}
}
K.bk_e = bk_e;
function bk_e() {
	var aT = 1;
	var aU = boss.next_pay;
	switch (Page.c_page) {
	case "bank":
		var aV = Utils.getElementsByClassName("myBalance")[0];
		if (aV) {
			var aW = aV.innerHTML.match(/\$([0-9,]+)/)[1];
			aW = aW.replace(/,/g, "");
			if (isNaN(parseInt(aW))) {
				boss.bank_cash = 0;
			} else {
				boss.bank_cash = parseInt(aW);
			}
			N.update();
		}
		aq();
		break;
	case "city":
		var aX = document.getElementById("app8743457343_cur_cash_countdown");
		if (aX) {
			var aY = aX.innerHTML;
			if (aY) {
				boss.next_pay = Page.now + 60 * (parseInt(aY) + 1);
			} else {
				boss.next_pay = Page.now + 3600;
			}
		} else {
			boss.next_pay = Page.now + 3600;
		}
		if (aU == undefined) {
			aU = boss.next_pay;
		}
		break;
	case "hospital":
		var aZ = document.getElementById("app8743457343_content");
		if (aZ) {
			aZ = aZ.getElementsByTagName("span");
		}
		if (aZ.length) {
			aZ = aZ[aZ.length - 1];
			aZ = aZ.innerHTML.replace(/[\$,]/g, "");
			aZ = parseInt(aZ);
			if (aZ) {
				boss.bank_cash = aZ;
			}
			N.update();
		}
		break;
	default:
		break;
	}
	if (boss.bank_cash == undefined) {
		var ba = new Object;
		ba.message = "Going to the bank...";
		ba.page = "bank";
		ba.func = "";
		ba.params = [];
		ba.time = 1;
		boss.actions.bank = ba;
		return;
	}
	if (!boss.bank_cash) {
		aT = 10;
	}
	if (!UserPrefs.bank_active) {
		if (boss.actions.bank_checkdelay) {
			delete boss.actions.bank_checkdelay;
		}
		return;
	}
	if (aU == undefined) {
		var bb = new Object;
		bb.message = "Checking for next payroll...";
		bb.page = "city";
		bb.func = "";
		bb.params = [];
		bb.time = 1;
		boss.actions.bank_checkdelay = bb;
		return;
	}
	var bc = new Object;
	if (aU < Page.now && boss.cash > 1000 * aT) {
		bc.message = "Going to the bank...";
		bc.page = "bank";
		bc.func = "bk_deposit";
		bc.params = [];
		bc.time = 1;
		boss.actions.bank = bc;
	} else {
		bc.message = "Waiting for next payroll...";
		bc.page = "city";
		bc.func = "";
		bc.params = [];
		bc.time = boss.next_pay;
		boss.actions.bank_checkdelay = bc;
	}
}
K.bk_deposit = bk_deposit;
function bk_deposit(aT, aU) {
	var aV = Utils.getElementsByXPath("//input[@value=\"Deposit\" or @value=\"Open Account\"]")[0];
	var aW = aV.parentNode.elements.namedItem("deposit_amount");
	if (!isNaN(aT) && aT != undefined && (aT != "")) {
		if (aT >= 1000) {
			aW.value = aT;
		} else {
			if (boss.cash >= 1000) {
				aW.value = 1000;
			} else {
				return;
			}
		}
	} else {
		aW.value = boss.cash;
	}
	aU = aU - 2;
	if (aU < 0) {
		aU = 0;
	}
	Timer.start(aV, "Depositing $" + aW.value + " into the bank...", aU);
	l("Depositing $" + aW.value + " into the bank... in " + aU, 2);
	boss.FightsTotReward = 0;
}
K.bk_withdraw = bk_withdraw;
function bk_withdraw(aT, aU) {
	var aV = aT;
	if (aV < 1000) {
		if (boss.bank_cash >= 1000) {
			aV = 1000;
		} else {
			return;
		}
	}
	if (document.getElementsByName("withdraw_amount")[0] != null) {
		var aW = Utils.getElementsByXPath("//input[@value=\"Withdraw\"]")[0];
		document.getElementsByName("withdraw_amount")[0].value = aV;
		aU = aU - 2;
		if (aU < 0) {
			aU = 0;
		}
		Timer.start(aW, "Withdrawing $" + aV + " from the bank...", aU);
		l("Withdrawing $" + aV + " from the bank... in " + aU, 2);
	}
}
function bk_pI(aT) {
	var value = UserPrefs.bank_active;
	var aU = new Array;
	aU.push("<div id=\"bk_toggle\" class=\"PrefMenuToggles\"><table width=\"100%\"><tr><td>Bank Preferences</td></tr></table></div><div id=\"bk_preferences\" style=\"display: none;\"><table width=\"100%\"><tr id=\"bankactive\"><td colspan=2 width=\"80%\">");
	aU.push("<label for=\"bank_active\">Automatically deposit your money to the bank after jobs and payroll?</label>");
	aU.push("</td><td>");
	if (value) {
		aU.push("Yes <input type=\"radio\" name=\"bank_active\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"bank_active\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"bank_active\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"bank_active\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr><tr id=\"bankaftbounty\"><td colspan=2>");
	var value2 = UserPrefs.bank_bounty;
	aU.push("<label for=\"bank_bounty\">Automatically deposit your money to the bank after bounties?</label>");
	aU.push("</td></td>");
	if (value2) {
		aU.push("Yes <input type=\"radio\" name=\"bank_bounty\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"bank_bounty\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"bank_bounty\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"bank_bounty\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr><tr id=\"bankaftfights\"><td colspan=2>");
	value2 = UserPrefs.bank_fights;
	aU.push("<label for=\"bank_fights\">Automatically deposit your money to the bank after winning fights?</label>");
	aU.push("</td></td>");
	if (value2) {
		aU.push("Yes <input type=\"radio\" name=\"bank_fights\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"bank_fights\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"bank_fights\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"bank_fights\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr><tr id=\"bankminfights\"><td width=\"5%\"></td><td>");
	value = UserPrefs.minimumbank_fights;
	aU.push("<label for=\"bankminimumfights\">How much should you win before depositing? ($, $10000 min)</label>");
	aU.push("</td><td>");
	aU.push("<input type=\"text\" name=\"bankminimumfights\" maxlength=\"15\" size=\"15\" ");
	aU.push("value=\"" + value + "\"/>");
	aU.push("</td></tr><tr id=\"bankmin\"><td colspan=2>");
	value = UserPrefs.bankminimum;
	aU.push("<label for=\"bankminimum\">What amount should be left in the bank: ($, $2000 min)</label>");
	aU.push("</td><td>");
	aU.push("<input type=\"text\" name=\"bankminimum\" maxlength=\"15\" size=\"15\" ");
	aU.push("value=\"" + value + "\"/>");
	aU.push("</td></tr><tr id=\"bankrestrict\"><td colspan=2>");
	value = UserPrefs.bankrestricted;
	aU.push("<label for=\"bankrestricted\">What amount should be untouchable by auto functions (except heal): ($, min of bank minimum)</label>");
	aU.push("</td><td>");
	aU.push("<input type=\"text\" name=\"bankrestricted\" maxlength=\"15\" size=\"15\" ");
	aU.push("value=\"" + value + "\"/>");
	aU.push("</td></tr></table></div><hr>");
	var aV = document.createElement("div");
	if (aV) {
		aV.innerHTML = aU.join("\n");
	}
	var aW = document.getElementById("PrefStuff");
	if (aW) {
		aW.appendChild(aV);
	}
	var button = document.getElementById("bk_toggle");
	if (button) {
		button.addEventListener("click", function() {
			var aX = document.getElementById("bk_preferences");
			if (aX) {
				if (aX.style.display == "none") {
					aX.style.display = "block";
				} else {
					aX.style.display = "none";
				}
			}
		},
		true);
	}
}
J.bk_pI = bk_pI;
J.bk_pH = bk_pH;
function bk_pH(aT, UserPrefs) {
	var aU = aT.elements.namedItem("bank_active");
	var aV = aT.elements.namedItem("bank_bounty");
	var aW = false;
	if (UserPrefs.bank_active != aU.checked) {
		if (boss.actions.bank) {
			delete boss.actions.bank;
		}
		if (boss.actions.bank_checkdelay) {
			delete boss.actions.bank_checkdelay;
		}
		boss.next_pay = undefined;
		UserPrefs.bank_active = aU.checked;
		aW = true;
	}
	if (UserPrefs.bank_bounty != aV.checked) {
		if (boss.actions.bank) {
			delete boss.actions.bank;
		}
		if (boss.actions.bank_checkdelay) {
			delete boss.actions.bank_checkdelay;
		}
		UserPrefs.bank_bounty = aV.checked;
		aW = true;
	}
	aU = aT.elements.namedItem("bank_fights");
	if (UserPrefs.bank_fights != aU.checked) {
		if (boss.actions.bank) {
			delete boss.actions.bank;
		}
		UserPrefs.bank_fights = aU.checked;
		aW = true;
	}
	var aX = parseInt(aT.elements.namedItem("bankminimumfights").value);
	if (aX != UserPrefs.minimumbank_fights) {
		UserPrefs.minimumbank_fights = aX;
		aW = true;
	}
	var aY = parseInt(aT.elements.namedItem("bankminimum").value);
	if (aY != UserPrefs.bankminimum) {
		UserPrefs.bankminimum = aY;
		aW = true;
	}
	var aZ = parseInt(aT.elements.namedItem("bankrestricted").value);
	if (aZ != UserPrefs.bankrestricted) {
		UserPrefs.bankrestricted = aZ;
		aW = true;
	}
	if (UserPrefs.bankrestricted < UserPrefs.bankminimum) {
		UserPrefs.bankrestricted = UserPrefs.bankminimum;
		aW = true;
	}
	return aW;
}
K.hp_e = hp_e;
function hp_e() {
	if (boss.heal_cost == undefined) {
		boss.heal_cost = 0;
	}
	var aT = true;
	if (Page.c_page == "hospital") {
		if (!hospital_updateData()) {
			if (boss.actions.hospital) {
				delete boss.actions.hospital;
			}
			if (boss.actions.hospitalUser) {
				delete boss.actions.hospitalUser;
			}
			aT = false;
		}
	}
	if (UserPrefs.playdead && boss.health <= UserPrefs.playdeadhealth && (UserPrefs.playdeadtime > 0)) {
		if (boss.actions.hospital) {
			delete boss.actions.hospital;
		}
		if (boss.actions.fighter) {
			delete boss.actions.fighter;
		}
		if (boss.actions.hitlist) {
			delete boss.actions.hitlist;
		}
		if (!boss.actions.Dead) {
			var aU = new Object;
			aU.message = "Playing dead...<br>Will be alive....";
			if (UserPrefs.heal_limit > 0 && (UserPrefs.hitlist_active || UserPrefs.fight_active)) {
				aU.page = "hospital";
				aU.func = "hp_heal";
			} else {
				aU.page = "profile";
			}
			aU.params = [];
			var aV = Math.floor(Math.random() * (parseInt(UserPrefs.playdeadtimeMax) - parseInt(UserPrefs.playdeadtime) + 1));
			aU.time = Page.now + (parseInt(UserPrefs.playdeadtime) + aV) * 60;
			if (boss.actions.stamina && UserPrefs.stamwaitautohealoff) {
				if (boss.actions.stamina.time > aU.time) {
					aU.time = boss.actions.stamina.time + 5;
				}
			}
			aU.save = true;
			boss.actions.Dead = aU;
		}
		var aW = document.getElementById("canceldeath");
		if (aW) {
			aW.innerHTML = "<a id=\"canceldeathwait\">Cancel Death Wait</a><br><br>";
			button = document.getElementById("canceldeathwait");
			if (button) {
				button.addEventListener("click", function() {
					if (boss.actions.Dead) {
						delete boss.actions.Dead;
						boss.save();
						HealFast();
					}
				},
				true);
			}
		}
		return;
	}
	if (UserPrefs.autohealoff) {
		var aX = false;
		if (UserPrefs.stamwaitautohealoff) {
			if (boss.actions.stamina) {
				aX = true;
			}
		}
		if (!UserPrefs.hitlist_active && !UserPrefs.fight_active || aX == true || (!boss.actions.hitlist && !boss.actions.fighter)) {
			if (boss.actions.hospital) {
				delete boss.actions.hospital;
			}
			var aY = document.getElementById("autoheal");
			if (aY) {
				aY.innerHTML = "<font color=red><center>AutoHeal is OFF</center></font><br>";
			}
			return;
		}
	}
	if (aT && (Page.c_page == "hospital")) {
		var aZ = document.getElementById("app8743457343_content");
		if (aZ) {
			if (!aZ.innerHTML.match(/can only heal you if you are/i)) {
				if ((boss.health * 100) < boss.max_health * 60) {
					if (UserPrefs.heal_limit > 0 && (boss.bank_cash > boss.heal_cost)) {
						if (UserPrefs.healtomax) {
							if (!UserPrefs.AdminNoHeal) {
								if (boss.actions.autoCityBuy) {
									delete boss.actions.autoCityBuy;
								}
								if (boss.actions.autoCityBuyGo) {
									delete boss.actions.autoCityBuyGo;
								}
							}
							var aU = new Object;
							aU.message = "Healing...";
							aU.page = "hospital";
							aU.func = "hp_heal";
							aU.params = [];
							aU.time = 1;
							boss.actions.hospital = aU;
							return;
						}
					}
				}
			}
		}
	}
	if (aT && boss.health * 100 < boss.max_health * UserPrefs.heal_limit && boss.bank_cash > boss.heal_cost) {
		if (!UserPrefs.AdminNoHeal) {
			if (boss.actions.autoCityBuy) {
				delete boss.actions.autoCityBuy;
			}
			if (boss.actions.autoCityBuyGo) {
				delete boss.actions.autoCityBuyGo;
			}
		}
		if (UserPrefs.HealShortCut) {
			if (!I) {
				var aY = document.getElementById("autoheal");
				if (aY) {
					aY.innerHTML = "<font color=blue><center>Doing background heal</center></font><br>";
				}
				ae();
				boss.bank_cash = boss.bank_cash - boss.heal_cost;
			}
		} else {
			var aU = new Object;
			aU.message = "Healing...";
			aU.page = "hospital";
			aU.func = "hp_heal";
			aU.params = [];
			aU.time = 1;
			boss.actions.hospital = aU;
		}
	}
}
function hospital_updateData() {
	if (Page.c_page == "hospital") {
		var aT = document.getElementById("app8743457343_content");
		if (aT) {
			if (!aT.innerHTML.match(/can only heal you if you are/i)) {
				if ((boss.health * 100) < boss.max_health * 60) {
					var aU = Utils.getElementsByXPath("//input[@type=\"submit\"]")[0];
					if (aU) {
						aU = aU.value.replace(/,/g, "");
						if (aU) {
							aU = aU.match(/\d+/);
						}
						if (aU) {
							aU = parseInt(aU[0]);
						}
						if (!isNaN(aU)) {
							boss.heal_cost = aU;
							return true;
						} else {
							return false;
						}
					} else {
						return false;
					}
				} else {
					return false;
				}
			} else {
				return false;
			}
		} else {
			return false;
		}
	} else {
		return false;
	}
}
K.hp_heal = hp_heal;
function hp_heal(aT, aU) {
	var aV = Utils.getElementsByXPath("//input[@name=\"action\" and @value=\"heal\"]/../input[@type=\"submit\"]")[0];
	if (aV) {
		aU = aU - 2;
		if (aU < 0) {
			aU = 0;
		}
		Timer.start(aV, "Healing for $" + boss.heal_cost + "...", aU);
		l("Healing for $" + boss.heal_cost + "... in " + aU, 2);
		if (boss.actions.Dead) {
			delete boss.actions.Dead;
			boss.save();
		}
	}
	boss.bank_cash -= boss.heal_cost;
	if (boss.bank_cash < UserPrefs.bankminimum && (boss.bank_cash > 2000)) {
		if (boss.cash >= Math.ceil((UserPrefs.bankminimum - (boss.bank_cash - boss.heal_cost)) / 0.9)) {
			var aW = new Object;
			aW.message = "Replenishing bank account....";
			aW.page = "bank";
			aW.func = "bk_deposit";
			aW.params = Math.ceil((UserPrefs.bankminimum - (boss.bank_cash - boss.heal_cost)) / 0.9);
			aW.time = 2;
			boss.actions.bankmindeposit = aW;
		}
	}
}
function hp_pI(aT) {
	var value = UserPrefs.heal_limit;
	var aU = UserPrefs.autohealoff;
	var aV = new Array;
	aV.push("<div id=\"hp_toggle\" class=\"PrefMenuToggles\"><table width=\"100%\"><tr><td>Health Preferences</td></tr></table></div><div id=\"hp_preferences\" style=\"display: none;\"><table width=\"100%\"><tr id=\"autheal\"><td colspan=\"2\">");
	aV.push("<label for=\"heal_limit\">Heal your boss when weaker than? (% of max health; 0 to disable, 60% max)</label>");
	aV.push("</td><td>");
	aV.push("<input type=\"text\" name=\"heal_limit\" maxlength=\"3\" size=\"3\" ");
	aV.push("value=\"" + value + "\"/>");
	aV.push("</td></tr><tr id=\"autorest\"><td colspan=\"2\">");
	var value2 = UserPrefs.hmin;
	aV.push("<label for=\"hmin\">Rest until health is higher than? (% of max health; min of auto heal or 20%, 70% max)</label>");
	aV.push("</td><td>");
	aV.push("<input type=\"text\" name=\"hmin\" maxlength=\"3\" size=\"3\" ");
	aV.push("value=\"" + value2 + "\"/>");
	aV.push("</td></tr>");
	value2 = UserPrefs.healtomax;
	aV.push("<tr id=\"HealToMax\"><td colspan=\"2\">");
	aV.push("<label for=\"healtomax\">When health falls below automatic healing % above, heal to max allowed: </label>");
	aV.push("</td><td>");
	if (value2) {
		aV.push("Yes <input type=\"radio\" name=\"healtomax\" value=\"1\" checked=\"checked\"/>");
		aV.push("No <input type=\"radio\" name=\"healtomax\" value=\"0\"/>");
	} else {
		aV.push("Yes <input type=\"radio\" name=\"healtomax\" value=\"1\"/>");
		aV.push("No <input type=\"radio\" name=\"healtomax\" value=\"0\" checked=\"checked\"/>");
	}
	aV.push("</td></tr>");
	aV.push("<tr id=\"laylow\"><td colspan=\"2\">");
	aV.push("<label for=\"autohealoff\">Automatically turn off Automatic healing if not auto fighting or bounty hunting: </label>");
	aV.push("</td><td>");
	if (aU) {
		aV.push("Yes <input type=\"radio\" name=\"autohealoff\" value=\"1\" checked=\"checked\"/>");
		aV.push("No <input type=\"radio\" name=\"autohealoff\" value=\"0\"/>");
	} else {
		aV.push("Yes <input type=\"radio\" name=\"autohealoff\" value=\"1\"/>");
		aV.push("No <input type=\"radio\" name=\"autohealoff\" value=\"0\" checked=\"checked\"/>");
	}
	aV.push("</td></tr><tr id=\"stamlaylow\"><td width=\"5%\"></td><td width=\"75%\">");
	aV.push("<label for=\"stamautohealoff\">Also turn off Automatic healing if waiting for stamina to regenerate: </label>");
	aV.push("</td><td>");
	value = UserPrefs.stamwaitautohealoff;
	if (value) {
		aV.push("Yes <input type=\"radio\" name=\"stamautohealoff\" value=\"1\" checked=\"checked\"/>");
		aV.push("No <input type=\"radio\" name=\"stamautohealoff\" value=\"0\"/>");
	} else {
		aV.push("Yes <input type=\"radio\" name=\"stamautohealoff\" value=\"1\"/>");
		aV.push("No <input type=\"radio\" name=\"stamautohealoff\" value=\"0\" checked=\"checked\"/>");
	}
	aV.push("</td></tr>");
	value = UserPrefs.playdead;
	aV.push("<tr id=\"PlayDead\"><td colspan=\"2\">");
	aV.push("<label for=\"playdead\">If our health falls to the level set below, should we play dead: </label>");
	aV.push("</td><td>");
	if (value) {
		aV.push("Yes <input type=\"radio\" name=\"playdead\" value=\"1\" checked=\"checked\"/>");
		aV.push("No <input type=\"radio\" name=\"playdead\" value=\"0\"/>");
	} else {
		aV.push("Yes <input type=\"radio\" name=\"playdead\" value=\"1\"/>");
		aV.push("No <input type=\"radio\" name=\"playdead\" value=\"0\" checked=\"checked\"/>");
	}
	aV.push("</td></tr>");
	value = UserPrefs.playdeadhealth;
	aV.push("<tr id=\"PlayDeadHealth\"><td colspan=\"2\">");
	aV.push("<label for=\"playdeadhealth\">At what health will we consider ourselves 'dead': (NOT a %, max " + Math.ceil(boss.max_health * 0.55) + ")</label>");
	aV.push("</td><td>");
	aV.push("<input type=\"text\" name=\"playdeadhealth\" maxlength=\"4\" size=\"4\" ");
	aV.push("value=\"" + value + "\"/>");
	aV.push("</td></tr>");
	value = UserPrefs.playdeadtimeMax;
	aV.push("<tr id=\"PlayDeadTimeMax\"><td colspan=\"2\">");
	aV.push("<label for=\"playdeadtimeMax\">Play dead for how long maximum: (minutes)</label>");
	aV.push("</td><td>");
	aV.push("<input type=\"text\" name=\"playdeadtimeMax\" maxlength=\"3\" size=\"3\" ");
	aV.push("value=\"" + value + "\"/>");
	aV.push("</td></tr>");
	value = UserPrefs.playdeadtime;
	aV.push("<tr id=\"PlayDeadTime\"><td colspan=\"2\">");
	aV.push("<label for=\"playdeadtime\">Play dead for how long minimum: (minutes)</label>");
	aV.push("</td><td>");
	aV.push("<input type=\"text\" name=\"playdeadtime\" maxlength=\"3\" size=\"3\" ");
	aV.push("value=\"" + value + "\"/>");
	aV.push("</td></tr>");
	value = UserPrefs.AdminNoHeal;
	aV.push("<tr id=\"adminnoheal\"><td colspan=\"2\">");
	aV.push("<label for=\"AdminNoHeal\">If doing administration tasks, turn off Automatic healing: </label>");
	aV.push("</td><td>");
	if (value) {
		aV.push("Yes <input type=\"radio\" name=\"AdminNoHeal\" value=\"1\" checked=\"checked\"/>");
		aV.push("No <input type=\"radio\" name=\"AdminNoHeal\" value=\"0\"/>");
	} else {
		aV.push("Yes <input type=\"radio\" name=\"AdminNoHeal\" value=\"1\"/>");
		aV.push("No <input type=\"radio\" name=\"AdminNoHeal\" value=\"0\" checked=\"checked\"/>");
	}
	aV.push("</td></tr>");
	value = UserPrefs.HealShortCut;
	aV.push("<tr id=\"healshortcut\"><td colspan=\"2\">");
	aV.push("<label for=\"HealShortCut\">Use background healing: </label>");
	aV.push("</td><td>");
	if (value) {
		aV.push("Yes <input type=\"radio\" name=\"HealShortCut\" value=\"1\" checked=\"checked\"/>");
		aV.push("No <input type=\"radio\" name=\"HealShortCut\" value=\"0\"/>");
	} else {
		aV.push("Yes <input type=\"radio\" name=\"HealShortCut\" value=\"1\"/>");
		aV.push("No <input type=\"radio\" name=\"HealShortCut\" value=\"0\" checked=\"checked\"/>");
	}
	aV.push("</td></tr>");
	aV.push("</table></div><hr>");
	var aW = document.createElement("div");
	if (aW) {
		aW.innerHTML = aV.join("\n");
	}
	var aX = document.getElementById("PrefStuff");
	if (aX) {
		aX.appendChild(aW);
	}
	var button = document.getElementById("hp_toggle");
	if (button) {
		button.addEventListener("click", function() {
			var aY = document.getElementById("hp_preferences");
			if (aY) {
				if (aY.style.display == "none") {
					aY.style.display = "block";
				} else {
					aY.style.display = "none";
				}
			}
		},
		true);
	}
}
J.hp_pI = hp_pI;
J.hp_pH = hp_pH;
function hp_pH(aT, UserPrefs) {
	var aU = false;
	var aV = aT.elements.namedItem("heal_limit");
	aV = parseInt(aV.value);
	if (UserPrefs.heal_limit != aV) {
		if (boss.actions.hospital) {
			delete boss.actions.hospital;
		}
		if (aV >= 0 && aV <= 60) {
			UserPrefs.heal_limit = aV;
			aU = true;
		} else {
			alert("Heal your boss when weaker than X input is out of range (Health Preferences).  Preferences not changed.");
			w = true;
		}
	}
	aV = aT.elements.namedItem("hmin");
	aV = parseInt(aV.value);
	if (UserPrefs.hmin != aV) {
		if (boss.actions.hospital) {
			delete boss.actions.hospital;
		}
		if (aV >= 20 && aV <= 70) {
			UserPrefs.hmin = aV;
			aU = true;
		} else {
			alert("Rest until health is higher than X input is out of range (Health Preferences).  Preferences not changed.");
			w = true;
		}
	}
	aV = aT.elements.namedItem("healtomax");
	if (UserPrefs.healtomax != aV.checked) {
		UserPrefs.healtomax = aV.checked;
		aU = true;
	}
	aV = aT.elements.namedItem("autohealoff");
	if (UserPrefs.autohealoff != aV.checked) {
		UserPrefs.autohealoff = aV.checked;
		aU = true;
	}
	aV = aT.elements.namedItem("stamautohealoff");
	if (UserPrefs.stamwaitautohealoff != aV.checked) {
		UserPrefs.stamwaitautohealoff = aV.checked;
		aU = true;
	}
	if (UserPrefs.hmin < UserPrefs.heal_limit) {
		UserPrefs.hmin = UserPrefs.heal_limit;
	}
	aV = aT.elements.namedItem("playdead");
	if (UserPrefs.playdead != aV.checked) {
		UserPrefs.playdead = aV.checked;
		aU = true;
	}
	aV = aT.elements.namedItem("AdminNoHeal");
	if (UserPrefs.AdminNoHeal != aV.checked) {
		UserPrefs.AdminNoHeal = aV.checked;
		aU = true;
	}
	aV = aT.elements.namedItem("HealShortCut");
	if (UserPrefs.HealShortCut != aV.checked) {
		UserPrefs.HealShortCut = aV.checked;
		aU = true;
	}
	aV = aT.elements.namedItem("playdeadhealth").value;
	if (UserPrefs.playdeadhealth != aV) {
		if (aV <= Math.ceil(boss.max_health * 0.55)) {
			UserPrefs.playdeadhealth = aV;
			aU = true;
		} else {
			alert("Play dead health setting is above the max allowed (Health Preferences).  Preferences not changed.");
			w = true;
		}
	}
	aV = parseInt(aT.elements.namedItem("playdeadtime").value);
	if (isNaN(aV)) {
		alert("Play dead minimum time setting is invalid (Health Preferences).  Preferences not changed.");
		w = true;
	} else {
		if (UserPrefs.playdeadtime != aV) {
			UserPrefs.playdeadtime = aV;
			aU = true;
		}
	}
	aV = parseInt(aT.elements.namedItem("playdeadtimeMax").value);
	if (isNaN(aV) || (aV < UserPrefs.playdeadtime)) {
		alert("Play dead maximum time setting is invalid (Health Preferences).  Preferences not changed.");
		w = true;
	} else {
		if (UserPrefs.playdeadtimeMax != aV) {
			UserPrefs.playdeadtimeMax = aV;
			aU = true;
		}
	}
	return aU;
}
function dbm_pI(aT) {
	var aU = new Array;
	aU.push("<div id=\"dbm_toggle\" class=\"PrefMenuToggles\"><table width=\"100%\"><tr><td>Database Management</td></tr></table></div><div id=\"DBM\" style=\"display: none;\"><table id=\"DManagement\" width=\"100%\"><tr id=\"DBMBoss\"><td width=\"80%\">");
	aU.push("<label for=\"dbmboss\">Reset 'Boss' database:</label><br />");
	aU.push("</td><td>");
	aU.push("Yes <input type=\"radio\" name=\"dbmboss\" value=\"1\"/>");
	aU.push("No <input type=\"radio\" name=\"dbmboss\" value=\"0\" checked=\"checked\"/>");
	aU.push("</td></tr>");
	aU.push("<tr id=\"DBMUserPrefs\"><td width=\"80%\">");
	aU.push("<label for=\"dbmUserPrefs\">Reset 'User Preferences' database:</label><br />");
	aU.push("</td><td>");
	aU.push("Yes <input type=\"radio\" name=\"dbmUserPrefs\" value=\"1\"/>");
	aU.push("No <input type=\"radio\" name=\"dbmUserPrefs\" value=\"0\" checked=\"checked\"/>");
	aU.push("</td></tr>");
	aU.push("<tr id=\"DBMinventory\"><td width=\"80%\">");
	aU.push("<label for=\"dbminventory\">Reset 'Inventory' database:</label><br />");
	aU.push("</td><td>");
	aU.push("Yes <input type=\"radio\" name=\"dbminventory\" value=\"1\"/>");
	aU.push("No <input type=\"radio\" name=\"dbminventory\" value=\"0\" checked=\"checked\"/>");
	aU.push("</td></tr><tr id=\"DBMitemlist\"><td width=\"80%\">");
	aU.push("<label for=\"dbmitemlist\">Reset 'Items' database:</label><br />");
	aU.push("</td><td>");
	aU.push("Yes <input type=\"radio\" name=\"dbmitemlist\" value=\"1\"/>");
	aU.push("No <input type=\"radio\" name=\"dbmitemlist\" value=\"0\" checked=\"checked\"/>");
	aU.push("</td></tr><tr id=\"DBMjobs\"><td width=\"80%\">");
	aU.push("<label for=\"dbmjobs\">Reset 'Jobs' database:</label><br />");
	aU.push("</td><td>");
	aU.push("Yes <input type=\"radio\" name=\"dbmjobs\" value=\"1\"/>");
	aU.push("No <input type=\"radio\" name=\"dbmjobs\" value=\"0\" checked=\"checked\"/>");
	aU.push("</td></tr><tr id=\"DBMgodfather\"><td width=\"80%\">");
	aU.push("<label for=\"dbmgodfather\">Reset 'GodFather' database:</label><br />");
	aU.push("</td><td>");
	aU.push("Yes <input type=\"radio\" name=\"dbmgodfather\" value=\"1\"/>");
	aU.push("No <input type=\"radio\" name=\"dbmgodfather\" value=\"0\" checked=\"checked\"/>");
	aU.push("</td></tr><tr id=\"DBMhitlistblock\"><td width=\"80%\">");
	aU.push("<label for=\"dbmhitlistblock\">Reset 'HitList Block' database:</label><br />");
	aU.push("</td><td>");
	aU.push("Yes <input type=\"radio\" name=\"dbmhitlistblock\" value=\"1\"/>");
	aU.push("No <input type=\"radio\" name=\"dbmhitlistblock\" value=\"0\" checked=\"checked\"/>");
	aU.push("</td></tr><tr id=\"DBMfightlistblock\"><td width=\"80%\">");
	aU.push("<label for=\"dbmfightlistblock\">Reset 'FightList Block' database:</label><br />");
	aU.push("</td><td>");
	aU.push("Yes <input type=\"radio\" name=\"dbmfightlistblock\" value=\"1\"/>");
	aU.push("No <input type=\"radio\" name=\"dbmfightlistblock\" value=\"0\" checked=\"checked\"/>");
	aU.push("</td></tr><tr id=\"DBMPrevFights\"><td width=\"80%\">");
	aU.push("<label for=\"dbmPrevFights\">Reset 'Previous Fights' database:</label><br />");
	aU.push("</td><td>");
	aU.push("Yes <input type=\"radio\" name=\"dbmPrevFights\" value=\"1\"/>");
	aU.push("No <input type=\"radio\" name=\"dbmPrevFights\" value=\"0\" checked=\"checked\"/>");
	aU.push("</td></tr><tr id=\"DBMvictims\"><td width=\"80%\">");
	aU.push("<label for=\"dbmvictims\">Reset 'Victims' database:</label><br />");
	aU.push("</td><td>");
	aU.push("Yes <input type=\"radio\" name=\"dbmvictims\" value=\"1\"/>");
	aU.push("No <input type=\"radio\" name=\"dbmvictims\" value=\"0\" checked=\"checked\"/>");
	aU.push("</td></tr><tr id=\"DBMfightlist\"><td width=\"80%\">");
	aU.push("<label for=\"dbmfightlist\">Reset 'Fights' database:</label><br />");
	aU.push("</td><td>");
	aU.push("Yes <input type=\"radio\" name=\"dbmfightlist\" value=\"1\"/>");
	aU.push("No <input type=\"radio\" name=\"dbmfightlist\" value=\"0\" checked=\"checked\"/>");
	aU.push("</td></tr>");
	aU.push("</table></div><hr>");
	var aV = document.createElement("div");
	if (aV) {
		aV.innerHTML = aU.join("\n");
	}
	var aW = document.getElementById("PrefStuff");
	if (aW) {
		aW.appendChild(aV);
	}
	var button = document.getElementById("dbm_toggle");
	if (button) {
		button.addEventListener("click", function() {
			var aX = document.getElementById("DBM");
			if (aX) {
				if (aX.style.display == "none") {
					aX.style.display = "block";
				} else {
					aX.style.display = "none";
				}
			}
		},
		true);
	}
}
J.dbm_pI = dbm_pI;
J.dbm_pH = dbm_pH;
function dbm_pH(aT, UserPrefs) {
	var aU = false;
	var aV;
	var aW = aT.elements.namedItem("dbmboss");
	if (aW.checked != false) {
		GM_setValue("boss", "({})");
		aU = true;
	}
	aW = aT.elements.namedItem("dbmUserPrefs");
	if (aW.checked != false) {
		GM_getValue("UserPrefs", "({})");
		location.reload();
		aU = false;
	}
	aW = aT.elements.namedItem("dbmfightlist");
	if (aW.checked != false) {
		GM_setValue("fightlist", "");
		aU = true;
	}
	aW = aT.elements.namedItem("dbmfightlistblock");
	if (aW.checked != false) {
		GM_setValue("fightlistblock", "");
		aU = true;
	}
	aW = aT.elements.namedItem("dbmhitlistblock");
	if (aW.checked != false) {
		GM_setValue("hitlistblock", "");
		aU = true;
	}
	aW = aT.elements.namedItem("dbmgodfather");
	if (aW.checked != false) {
		GM_setValue("godfather", "({})");
		boss.GodFatherChecked = false;
		aU = true;
	}
	aW = aT.elements.namedItem("dbmPrevFights");
	if (aW.checked != false) {
		GM_setValue("PrevFights", "");
		aU = true;
	}
	aW = aT.elements.namedItem("dbminventory");
	if (aW.checked != false) {
		GM_setValue("inventory", "({})");
		aV = new Object;
		aV.page = "stockpile";
		aV.func = "checkstockpile";
		aV.message = "Checking stockpile available after user reset...";
		aV.time = 1;
		boss.actions.inventory_stockpile = aV;
		aV = new Object;
		aV.page = "city";
		aV.func = "checkcities";
		aV.message = "Checking buildings available after user reset...";
		aV.time = 1;
		boss.actions.inventory_city = aV;
		aV = new Object;
		aV.page = "jobs";
		aV.message = "Checking jobs available after user reset...";
		aV.time = 1;
		boss.actions.jobs_check = aV;
		aU = true;
	}
	aW = aT.elements.namedItem("dbmitemlist");
	if (aW.checked != false) {
		GM_setValue("itemlist", "({})");
		aV = new Object;
		aV.page = "stockpile";
		aV.func = "checkstockpile";
		aV.message = "Checking stockpile available after user reset...";
		aV.time = 1;
		boss.actions.inventory_stockpile = aV;
		aV = new Object;
		aV.page = "city";
		aV.func = "checkcities";
		aV.message = "Checking buildings available after user reset...";
		aV.time = 1;
		boss.actions.inventory_city = aV;
		aV = new Object;
		aV.page = "jobs";
		aV.message = "Checking jobs available after user reset...";
		aV.time = 1;
		boss.actions.jobs_check = aV;
		aU = true;
	}
	aW = aT.elements.namedItem("dbmjobs");
	if (aW.checked != false) {
		GM_setValue("jobs", "({})");
		aV = new Object;
		aV.page = "jobs";
		aV.message = "Checking jobs available after user reset...";
		aV.time = 1;
		boss.actions.jobs_check = aV;
		aU = true;
	}
	aW = aT.elements.namedItem("dbmvictims");
	if (aW.checked != false) {
		GM_setValue("victims", "");
		aU = true;
	}
	return aU;
}
function ot_pI(aT) {
	var value = UserPrefs.PromptAlert;
	var aU = new Array;
	aU.push("<div id=\"ot_toggle\" class=\"PrefMenuToggles\"><table width=\"100%\"><tr><td>Visible Behavior Preferences</td></tr></table></div><div id=\"ot_preferences\" style=\"display: none;\"><table width=\"100%\">");
	aU.push("<tr id=\"VisibleOrder\"><td width=\"80%\"><label for=\"visibleorder\">What order should things be visible: </label></td><td><select name=\"visibleorder\">");
	aU.push("<option value=\"standard\"");
	if (UserPrefs.windoworder == "standard") {
		aU.push(" selected=\"selected\"");
	}
	aU.push(">Standard</option><option value=\"queuetop\"");
	if (UserPrefs.windoworder == "queuetop") {
		aU.push(" selected=\"selected\"");
	}
	aU.push(">Queue on top</option>");
	aU.push("</select></td></tr>");
	aU.push("<tr id=\"promptalert\"><td width=\"80%\">");
	aU.push("<label for=\"PromptAlert\">Use the alert prompt for entering captchas:</label><br />");
	aU.push("</td><td>");
	if (value) {
		aU.push("Yes <input type=\"radio\" name=\"PromptAlert\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"PromptAlert\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"PromptAlert\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"PromptAlert\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr>");
	value = UserPrefs.ShowCaptcha;
	aU.push("<tr id=\"showcaptcha\"><td width=\"80%\">");
	aU.push("<label for=\"ShowCaptcha\">Show captcha image in status window and prompt:</label><br />");
	aU.push("</td><td>");
	if (value) {
		aU.push("Yes <input type=\"radio\" name=\"ShowCaptcha\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"ShowCaptcha\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"ShowCaptcha\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"ShowCaptcha\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr><tr id=\"place\"><td width=\"80%\">");
	value = UserPrefs.placement;
	aU.push("<label for=\"placement\">Status window on the side, or on top? (currently does NOT function)</label><br />");
	aU.push("</td><td>");
	if (value) {
		aU.push("Top <input type=\"radio\" name=\"placement\" value=\"1\" checked=\"checked\"/>");
		aU.push("Side <input type=\"radio\" name=\"placement\" value=\"0\"/>");
	} else {
		aU.push("Top <input type=\"radio\" name=\"placement\" value=\"1\"/>");
		aU.push("Side <input type=\"radio\" name=\"placement\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr><tr id=\"AddFBFriendHP\"><td>");
	value = UserPrefs.AddFaceBookFriendHomePage;
	aU.push("<label for=\"AFBFHP\">Add 'Add Facebook Friend' link to all mobs shown on home page?</label>");
	aU.push("</td><td>");
	if (value) {
		aU.push("Yes <input type=\"radio\" name=\"AFBFHP\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"AFBFHP\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"AFBFHP\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"AFBFHP\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr>");
	aU.push("<tr id=\"AddFBFriendFP\"><td>");
	value = UserPrefs.AddFaceBookFriendFightPage;
	aU.push("<label for=\"AFBFFP\">Add 'Add Facebook Friend' link to all mobs shown on fight page?</label>");
	aU.push("</td><td>");
	if (value) {
		aU.push("Yes <input type=\"radio\" name=\"AFBFFP\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"AFBFFP\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"AFBFFP\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"AFBFFP\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr>");
	aU.push("<tr id=\"PauseMobsterPref\"><td>");
	value = UserPrefs.pausemobster;
	aU.push("<label for=\"PMP\">Display mobster when paused and script wants to perform an action:</label>");
	aU.push("</td><td>");
	if (value) {
		aU.push("Yes <input type=\"radio\" name=\"PMP\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"PMP\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"PMP\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"PMP\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr><tr id=\"orient\"><td>");
	value = UserPrefs.orientation;
	aU.push("<label for=\"orientation\">Ad window horizontal or vertical?</label>");
	aU.push("</td><td>");
	if (value) {
		aU.push("Vert <input type=\"radio\" name=\"orientation\" value=\"1\" checked=\"checked\"/>");
		aU.push("Horiz <input type=\"radio\" name=\"orientation\" value=\"0\"/>");
	} else {
		aU.push("Vert <input type=\"radio\" name=\"orientation\" value=\"1\"/>");
		aU.push("Horiz <input type=\"radio\" name=\"orientation\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr><tr id=\"adjustmain\"><td>");
	value = UserPrefs.adjust;
	aU.push("<label for=\"adjust\">Adjust main screen position to avoid anything being hidden?</label>");
	aU.push("</td><td>");
	if (value) {
		aU.push("Yes <input type=\"radio\" name=\"adjust\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"adjust\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"adjust\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"adjust\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr><tr id=\"statd\"><td>");
	value = UserPrefs.statdisp;
	aU.push("<label for=\"statdisp\">Display mob status? (basically just for diagnostics at this time)</label>");
	aU.push("</td><td>");
	if (value) {
		aU.push("Yes <input type=\"radio\" name=\"statdisp\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"statdisp\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"statdisp\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"statdisp\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr><tr id=\"bankpbutton\"><td>");
	value = UserPrefs.bankbutton;
	aU.push("<label for=\"BankButton\">Place Bank Deposit button on status window:</label>");
	aU.push("</td><td>");
	if (value) {
		aU.push("Yes <input type=\"radio\" name=\"BankButton\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"BankButton\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"BankButton\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"BankButton\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr><tr id=\"healpbutton\"><td>");
	value = UserPrefs.healbutton;
	aU.push("<label for=\"HealButton\">Place Heal button on status window:</label>");
	aU.push("</td><td>");
	if (value) {
		aU.push("Yes <input type=\"radio\" name=\"HealButton\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"HealButton\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"HealButton\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"HealButton\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr><tr id=\"showbounty\"><td width=\"80%\">");
	aU.push("<label for=\"bounty\">Display your bounty value in the status screen:</label><br />");
	aU.push("</td><td>");
	value = UserPrefs.showbounty;
	if (value) {
		aU.push("Yes <input type=\"radio\" name=\"bounty\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"bounty\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"bounty\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"bounty\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr><tr id=\"showexp\"><td width=\"80%\">");
	aU.push("<label for=\"expneeded\">Display experience needed to level-up in the status screen:</label><br />");
	aU.push("</td><td>");
	value = UserPrefs.expneeded;
	if (value) {
		aU.push("Yes <input type=\"radio\" name=\"expneeded\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"expneeded\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"expneeded\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"expneeded\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr><tr id=\"pophelp\"><td width=\"80%\">");
	aU.push("<label for=\"popuphelp\">Display PopUp help screens:</label><br />");
	aU.push("</td><td>");
	value = UserPrefs.popuphelp;
	if (value) {
		aU.push("Yes <input type=\"radio\" name=\"popuphelp\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"popuphelp\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"popuphelp\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"popuphelp\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr>");
	aU.push("<tr id=\"errload\"><td>");
	value = UserPrefs.errorreload;
	aU.push("<label for=\"errorreload\">On FaceBook error, reload MobWars?</label>");
	aU.push("</td><td>");
	if (value) {
		aU.push("Yes <input type=\"radio\" name=\"errorreload\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"errorreload\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"errorreload\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"errorreload\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr>");
	aU.push("</table></div><hr>");
	var aV = document.createElement("div");
	if (aV) {
		aV.innerHTML = aU.join("\n");
	}
	var aW = document.getElementById("PrefStuff");
	if (aW) {
		aW.appendChild(aV);
	}
	var button = document.getElementById("ot_toggle");
	if (button) {
		button.addEventListener("click", function() {
			var aX = document.getElementById("ot_preferences");
			if (aX) {
				if (aX.style.display == "none") {
					aX.style.display = "block";
				} else {
					aX.style.display = "none";
				}
			}
		},
		true);
	}
}
J.ot_pI = ot_pI;
J.ot_pH = ot_pH;
function ot_pH(aT, UserPrefs) {
	var aU = aT.elements.namedItem("orientation");
	var aV = false;
	if (UserPrefs.orientation != aU.checked) {
		UserPrefs.orientation = aU.checked;
		aV = true;
	}
	aU = aT.elements.namedItem("PromptAlert");
	if (UserPrefs.PromptAlert != aU.checked) {
		UserPrefs.PromptAlert = aU.checked;
		aV = true;
	}
	aU = aT.elements.namedItem("ShowCaptcha");
	if (UserPrefs.ShowCaptcha != aU.checked) {
		UserPrefs.ShowCaptcha = aU.checked;
		aV = true;
	}
	aU = aT.elements.namedItem("adjust");
	if (UserPrefs.adjust != aU.checked) {
		UserPrefs.adjust = aU.checked;
		aV = true;
	}
	aU = aT.elements.namedItem("AFBFHP");
	if (UserPrefs.AddFaceBookFriendHomePage != aU.checked) {
		UserPrefs.AddFaceBookFriendHomePage = aU.checked;
		aV = true;
	}
	aU = aT.elements.namedItem("AFBFFP");
	if (UserPrefs.AddFaceBookFriendFightPage != aU.checked) {
		UserPrefs.AddFaceBookFriendFightPage = aU.checked;
		aV = true;
	}
	aU = aT.elements.namedItem("PMP");
	if (UserPrefs.pausemobster != aU.checked) {
		UserPrefs.pausemobster = aU.checked;
		aV = true;
	}
	aU = aT.elements.namedItem("popuphelp");
	if (UserPrefs.popuphelp != aU.checked) {
		UserPrefs.popuphelp = aU.checked;
		aV = true;
	}
	aU = aT.elements.namedItem("expneeded");
	if (UserPrefs.expneeded != aU.checked) {
		UserPrefs.expneeded = aU.checked;
		aV = true;
	}
	aU = aT.elements.namedItem("bounty");
	if (UserPrefs.showbounty != aU.checked) {
		UserPrefs.showbounty = aU.checked;
		aV = true;
	}
	aU = aT.elements.namedItem("statdisp");
	if (UserPrefs.statdisp != aU.checked) {
		UserPrefs.statdisp = aU.checked;
		aV = true;
	}
	aU = aT.elements.namedItem("HealButton");
	if (UserPrefs.healbutton != aU.checked) {
		UserPrefs.healbutton = aU.checked;
		aV = true;
	}
	aU = aT.elements.namedItem("BankButton");
	if (UserPrefs.bankbutton != aU.checked) {
		UserPrefs.bankbutton = aU.checked;
		aV = true;
	}
	aU = aT.elements.namedItem("placement");
	if (UserPrefs.placement != aU.checked) {
		UserPrefs.placement = aU.checked;
		aV = true;
	}
	aU = aT.elements.namedItem("errorreload");
	if (UserPrefs.errorreload != aU.checked) {
		UserPrefs.errorreload = aU.checked;
		aV = true;
	}
	aU = aT.elements.namedItem("visibleorder");
	aU = aU.options[aU.selectedIndex].value;
	if (UserPrefs.windoworder != aU) {
		UserPrefs.windoworder = aU;
		aV = true;
	}
	return aV;
}
function ar() {
	var aT, aU, aV, aW;
	var aX, aY;
	var aZ, ba;
	var bb;
	var bc = Utils.getElementsByXPath("//div[@id='app8743457343_content']/table/tbody/tr");
	aY = boss.level;
	ba = boss.mobsters;
	for (var i = 0; i < bc.length; i++) {
		if (!bc[i].innerHTML.match(/<td colspan="4">/i)) {
			aU = bc[i].getElementsByTagName("TD")[0].innerHTML;
			aV = /, Level ([0-9]+)/;
			aW = aU.match(aV);
			if (aW) {
				aZ = parseInt(bc[i].getElementsByTagName("TD")[1].innerHTML.split("/")[0]);
				aX = aW[1];
				aT = bc[i];
				aT.style.color = ColorCode(aZ, aX, ba, aY);
				bb = (aX < 50) ? 500 : ((aX - 50) * 2) + 500;
				bb += 1001;
				if (bb > 2002) {
					bb = 2002;
				}
				var bd = document.createElement("span");
				bd.innerHTML = "/" + bb;
				if (!bc[i].getElementsByTagName("TD")[1].innerHTML.split("/")[1]) {
					bc[i].getElementsByTagName("TD")[1].appendChild(bd);
				}
				aW = aU.match(/user_id=([0-9]+)/);
				if (UserPrefs.fightlistmark) {
					var be = GM_getValue("fightlist", "").split("|");
					for (mob in be) {
						if (be[mob].split(":")[1] != "") {
							if (parseInt(aW[1]) == parseInt(be[mob].split(":")[1])) {
								var bf = document.createElement("div");
								bf.id = aW[1];
								bf.innerHTML = "<font color='cyan'>(</font><font color='green'>" + be[mob].split(":")[3] + "</font><font color='cyan'>/</font><font color='red'>" + be[mob].split(":")[5] + "</font><font color='cyan'>)</font>";
								if (!isNaN(be[mob].split(":")[7] / be[mob].split(":")[3])) {
									bf.innerHTML += " <font color='cyan'>(</font><font color='green'>" + Math.ceil(be[mob].split(":")[7] / be[mob].split(":")[3]) + "</font><font color='cyan'>)</font>";
								}
								var bg = document.getElementById(aW[1]);
								if (bg) {
									bg.parentNode.removeChild(bg);
								}
								bc[i].getElementsByTagName("TD")[0].appendChild(bf);
							}
						}
					}
				}
				if (UserPrefs.AddFaceBookFriendFightPage) {
					if (bb > aZ) {
						if (aW) {
							var bh = document.createElement("span");
							bh.innerHTML = " <font color='cyan'>[</font><a href='http://www.facebook.com/addfriend.php?id=" + aW[1] + "' target='_blank'>Add Facebook Friend</a><font color='cyan'>]</font>";
							if (!bc[i].getElementsByTagName("TD")[0].innerHTML.match(/Add Facebook Friend/i)) {
								bc[i].getElementsByTagName("TD")[0].appendChild(bh);
							}
						}
					}
				}
			}
		}
	}
}
function ColorCode(aT, aU, aV, aW) {
	var aX = datadisplay_getFightPower("attack", datadisplay_getFightItems("attack"));
	var aY = UserPrefs.defskillmod / 100;
	if (aX > (aU * 3 * aY * aT) + aT * UserPrefs.enemydefensemodifier) {
		return "green";
	}
	if (aX > (aU * 2 * aY * aT) + aT * UserPrefs.enemydefensemodifier) {
		return "white";
	}
	if (aX > (aU * 1 * aY * aT) + aT * UserPrefs.enemydefensemodifier) {
		return "yellow";
	}
	return "red";
}
function as() {
	var aT = location.href.split("=")[1];
	var aU = document.createElement("span");
	aU.innerHTML = " <div>[<a href='http://www.facebook.com/addfriend.php?id=" + aT + "' target='_blank'>Add Facebook Friend</a>]</div>";
	var aV = document.getElementById("app8743457343_content");
	if (aV) {
		aV = aV.getElementsByTagName("h1")[0];
	}
	if (aV) {
		aV.appendChild(aU);
	}
}
function at() {
	if (UserPrefs.AddFaceBookFriendHomePage && (Page.c_page == "")) {
		var aT = Utils.getElementsByClassName("feedItem");
		if (aT) {
			for (i = 0; i < aT.length; i++) {
				var aU = parseInt(aT[i].getElementsByTagName("a")[0].href.split("user_id=")[1]);
				if (!isNaN(aU)) {
					var aV = document.createElement("span");
					if (aV) {
						aV.innerHTML = " [<a href='http://www.facebook.com/addfriend.php?id=" + aU + "' target='_blank'>Add Facebook Friend</a>]";
					}
					aT[i].appendChild(aV);
				}
			}
		}
	}
}
K.dd_e = dd_e;
function dd_e() {
	var aT = new Array;
	var aU = document.getElementById("informationMW");
	if (aU) {
		aU.parentNode.removeChild(aU);
	}
	var aV = document.createElement("div");
	if (aV) {
		aV.className = "earnings";
	}
	if (aV) {
		aV.id = "informationMW";
	}
	var aW = document.getElementById("app8743457343_content");
	if (aW) {
		aW = aW.getElementsByTagName("h1")[0];
	}
	switch (Page.c_page) {
	case "city":
		var aX = Utils.getElementsByXPath("//form[contains(@action,\"do.php\")]/select");
		if (aX) {
			for (var j = 0; j < aX.length; j++) {
				var aY = document.createElement("input");
				aY.name = "qty";
				aY.type = "text";
				aY.setAttribute("maxlength", "3");
				aY.setAttribute("size", "3");
				aY.value = aX[j].options[0].value;
				aX[j].parentNode.insertBefore(aY, aX[j]);
				aX[j].parentNode.removeChild(aX[j]);
			}
		}
		datadisplay_ROR();
		break;
	case "stockpile":
		var aZ = Utils.getElementsByXPath("//form[contains(@action,\"do.php\")]/select");
		if (aZ) {
			for (var i = 0; i < aZ.length; i++) {
				var ba = document.createElement("input");
				ba.name = "qty";
				ba.type = "text";
				ba.setAttribute("maxlength", "3");
				ba.setAttribute("size", "3");
				ba.value = aZ[i].options[0].value;
				aZ[i].parentNode.insertBefore(ba, aZ[i]);
				aZ[i].parentNode.removeChild(aZ[i]);
			}
		}
		if (!itemlist.item_14) {
			break;
		}
		var bb = datadisplay_getUpgrade(datadisplay_getFightItems("attack"), "attack", "weapon");
		GM_setValue("WeaponUpgrade", bb.toSource());
		var bc;
		if (bb[0] > 100) {
			bc = 100;
		} else {
			bc = bb[0];
		}
		aT.push("<div id=\"WeaponStuff\"><span id=\"bestweapon\">Best weapon upgrade: ");
		var bd;
		switch (bb[0]) {
		case 0:
			aT.push("N/A");
			break;
		case 1:
			aT.push("1 " + itemlist[bb[1]].name);
			bd = " (Buy 1 " + itemlist[bb[1]].name + ")";
			break;
		default:
			aT.push(bb[0] + " " + itemlist[bb[1]].name + "s");
			bd = " (Buy " + bc + " " + itemlist[bb[1]].name + "s)";
			break;
		}
		var be = datadisplay_getUpgrade(datadisplay_getFightItems("attack"), "attack", "armor");
		GM_setValue("ArmorUpgrade", be.toSource());
		var bf;
		if (be[0] > 100) {
			bf = 100;
		} else {
			bf = be[0];
		}
		aT.push("</span><span id=\"bestarmor\"><br>Best armor upgrade: ");
		var bg;
		switch (be[0]) {
		case 0:
			aT.push("N/A");
			break;
		case 1:
			aT.push("1 " + itemlist[be[1]].name);
			bg = " (Buy 1 " + itemlist[be[1]].name + ")";
			break;
		default:
			aT.push(be[0] + " " + itemlist[be[1]].name + "s");
			bg = " (Buy " + bf + " " + itemlist[be[1]].name + "s)";
			break;
		}
		var bh = datadisplay_getUpgrade(datadisplay_getFightItems("attack"), "attack", "vehicle");
		GM_setValue("VehicleUpgrade", bh.toSource());
		var bi;
		if (bh[0] > 100) {
			bi = 100;
		} else {
			bi = bh[0];
		}
		aT.push("</span><span id=\"bestvehicle\"><br>Best vehicle upgrade: ");
		var bj;
		switch (bh[0]) {
		case 0:
			aT.push("N/A");
			break;
		case 1:
			aT.push("1 " + itemlist[bh[1]].name);
			bj = " (Buy 1 " + itemlist[bh[1]].name + ")";
			break;
		default:
			aT.push(bh[0] + " " + itemlist[bh[1]].name + "s");
			bj = " (Buy " + bi + " " + itemlist[bh[1]].name + "s)";
			break;
		}
		var bk = datadisplay_getUnused(datadisplay_getFightItems("attack"));
		if (bk.length) {
			aT.push("</span><br />");
			aT.push("Unused items: ");
			aT.push(bk);
			aT.push("</div>");
		}
		if (aV) {
			aV.innerHTML = aT.join("");
		}
		if (aW) {
			aW.appendChild(aV);
		}
		if (bb[0] > 0) {
			var bl = document.getElementById("bestweapon");
			var bm = document.createElement("a");
			bm.addEventListener("click", function() {
				buystockpile([bb[1], bc, UserPrefs.timerdelay, "weapon", false]);
			},
			false);
			bm.innerHTML = bd;
			if (bl) {
				bl.appendChild(bm);
			}
		}
		if (be[0] > 0) {
			var bn = document.getElementById("bestarmor");
			var bo = document.createElement("a");
			bo.addEventListener("click", function() {
				buystockpile([be[1], bf, UserPrefs.timerdelay, "armor", false]);
			},
			false);
			bo.innerHTML = bg;
			if (bn) {
				bn.appendChild(bo);
			}
		}
		if (bh[0] > 0) {
			var bp = document.getElementById("bestvehicle");
			var bq = document.createElement("a");
			bq.addEventListener("click", function() {
				buystockpile([bh[1], bi, UserPrefs.timerdelay, "vehicle", false]);
			},
			false);
			bq.innerHTML = bj;
			if (bp) {
				bp.appendChild(bq);
			}
		}
		break;
	case "fight":
		ar();
		if (!itemlist.item_14) {
			break;
		}
		var br = datadisplay_getFightPower("attack", datadisplay_getFightItems("attack"));
		var bs = datadisplay_getFightPower("defense", datadisplay_getFightItems("defense"));
		aT.push("<div id=\"PowerStats\">(");
		aT.push("Attack strength: " + br);
		aT.push(", ");
		aT.push("Defense strength: " + bs);
		var bt = datadisplay_getMaxMobSize(parseInt(br));
		aT.push(",");
		aT.push("<br> Max mob you can attack with almost no danger of losing: " + bt);
		aT.push(")");
		aT.push("<br>These are <font color=\"yellow\">GUESS</font>timates - <br><center><font size=\"-1\" face=\"Times\">Attack strength, etc., that you have is considered, what the enemy has is factored in based on the<br>modifier you entered in preferences.</font></center><br><font color=\"green\"> You will probably win.<font color=\"white\"> You should win.<font color=\"yellow\"> You could win.<font color=\"red\"> Probably not.</div>");
		if (aV) {
			aV.innerHTML = aT.join("");
		}
		if (aW) {
			aW.appendChild(aV);
		}
		break;
	case "profile":
		as();
		break;
	default:
		break;
	}
}
K.buystockpileStart = buystockpileStart;
function buystockpileStart(aT) {
	if (Page.c_page == "stockpile") {
		if (Page.c_params.show_type != aT[3]) {
			if (!Page.c_params.show_type && (aT[3] == "weapon")) {
				stockpurchase(aT);
			} else {
				var aU = new Object;
				aU.message = "Buying stockpile items...";
				aU.page = aT[3];
				aU.func = "stockpurchase";
				aU.params = [aT[0], aT[1], aT[2], aT[3]];
				aU.time = 2;
				boss.actions.buystockpileStart = aU;
				boss.save();
				var aV;
				if (Page[aT[3]]) {
					aV = Page[aT[3]];
				} else {
					aV = GM_getValue("L" + aT[3], "http://apps.facebook.com/mobwars/city/?show_type=" + aT[3]);
				}
				Timer.start(aV, aU.message, aU.time);
			}
		} else {
			stockpurchase(aT);
		}
	}
}
K.stockpurchase = stockpurchase;
function stockpurchase(aT) {
	var aU = aT[2] - 2;
	if (aU < 1) {
		aU = 1;
	}
	if (aT[1] > 100) {
		aT[1] = 100;
	}
	if (aT[0] == "item_41") {
		an.item_32 -= aT[1];
		GM_setValue("inventory", an.toSource());
	}
	var aV = Utils.getElementsByXPath("//input[@name=\"item\" and @value=\"" + aT[0].substr(5) + "\"]/../input[@name=\"qty\"]");
	aV[0].value = aT[1];
	aV = Utils.getElementsByXPath("//input[@name=\"item\" and @value=\"" + aT[0].substr(5) + "\"]/../input[@type=\"submit\" and @value=\"Buy\"]");
	Timer.start(aV[0], "Buying " + aT[1] + " " + itemlist[aT[0]].name + "...", aU);
}
K.buystockpile = buystockpile;
function buystockpile(aT) {
	var aU = aT[2] - 2;
	if (aU < 1) {
		aU = 1;
	}
	if (aT[1] > 100) {
		aT[1] = 100;
	}
	var aV = parseInt(itemlist[aT[0]].price) * parseInt(aT[1]);
	if (itemlist[aT[0]].needs != "Nothing") {
		var aW = parseInt(aT[1]) - parseInt(an[itemlist[aT[0]].needs]);
		if (parseInt(aW) > 0) {
			aV += parseInt(itemlist[itemlist[aT[0]].needs].price) * parseInt(aW);
		}
	}
	if (parseInt(aV) > parseInt(boss.cash)) {
		if (parseInt(aV) > parseInt(boss.cash) + parseInt(boss.bank_cash)) {
			if (aT[4]) {
				if (boss.actions[aT[4]]) {
					delete boss.actions[aT[4]];
				}
			}
			return;
		}
		var aX = new Object;
		aX.message = "Buying " + aT[1] + " " + itemlist[aT[0]].name;
		aX.page = "stockpile";
		aX.func = "buystockpile";
		aX.params = [aT[0], aT[1], aT[2], aT[3], "buystockpile"];
		aX.time = aU;
		boss.actions.buystockpile = aX;
		if (aT[4]) {
			if (boss.actions[aT[4]]) {
				delete boss.actions[aT[4]];
			}
		}
		var aY = new Object;
		aY.message = "Going to bank for needed funds...";
		aY.page = "bank";
		aY.func = "bk_withdraw";
		aY.params = aV - boss.cash;
		aY.time = 0;
		boss.actions["bank_withdraw" + itemlist[aT[0]].name] = aY;
		boss.save();
		MainStuff();
		return;
	}
	if (itemlist[aT[0]].needs != "Nothing") {
		var aZ = aT[1] - an[itemlist[aT[0]].needs];
		if (aZ > 0) {
			var aX = new Object;
			aX.message = "Buying " + aZ + " " + itemlist[itemlist[aT[0]].needs].name;
			aX.page = "stockpile";
			aX.func = "buystockpileStart";
			aX.params = [itemlist[aT[0]].needs, aZ, aT[2], itemlist[itemlist[aT[0]].needs].stocktype.toLowerCase()];
			aX.time = 3;
			boss.actions.buystockpileDepend = aX;
		}
	}
	var aX = new Object;
	aX.message = "Buying " + aT[1] + " " + itemlist[aT[0]].name;
	aX.page = "stockpile";
	aX.func = "buystockpileStart";
	aX.params = [aT[0], aT[1], aT[2], aT[3].toLowerCase()];
	aX.time = 4;
	boss.actions.buystockpile = aX;
	if (aT[4]) {
		if (boss.actions[aT[4]]) {
			delete boss.actions[aT[4]];
		}
	}
	boss.save();
	MainStuff();
}
K.htUser = htUser;
function htUser(url, aT) {
	if (window.location.href != url) {
		var aU = new Object;
		aU.message = "Hitlisting user...";
		aU.page = "hitlist";
		aU.func = "htUser";
		aU.params = url;
		aU.time = 1;
		boss.actions.hitlistUser = aU;
		boss.save();
		window.location.href = url;
	} else {
		var aV = document.getElementsByName("bounty")[0].value;
		if (boss.cash < aV) {
			hitListCurrentUser();
		} else {
			Utils.getElementsByXPath("//form[contains(@action,\"do.php\")]/input[@type=\"submit\"]")[0].click();
		}
	}
}
function hitListCurrentUser() {
	if (boss.actions.bank_withdraw) {
		delete boss.actions.bank_withdraw;
	}
	if (boss.actions.hitlistUser) {
		delete boss.actions.hitlistUser;
	}
	var aT = document.getElementsByName("bounty")[0].value;
	if (boss.cash < aT) {
		if ((aT - boss.cash) > boss.bank_cash) {
			var aU = document.getElementById("hitCuser");
			if (aU) {
				aU.innerHTML = "<center><font color=blue>You don't have enough money to put this mob on the hitlist.<br></font></center>";
			}
			return;
		}
		var aV = new Object;
		aV.message = "Going to bank...";
		aV.page = "bank";
		aV.func = "bk_withdraw";
		aV.params = aT - boss.cash;
		aV.time = 1;
		boss.actions.bank_withdraw = aV;
		var aW = new Object;
		aW.message = "Hitlisting user...";
		aW.page = "bank";
		aW.func = "htUser";
		aW.params = window.location.href;
		aW.time = 1;
		boss.actions.hitlistUserNav = aW;
		boss.save();
		var aX;
		if (Page.bank) {
			aX = Page.bank;
		} else {
			aX = GM_getValue("Lbank", "http://apps.facebook.com/mobwars/bank/");
		}
		Timer.start(aX, "Going to bank...", (UserPrefs.timerdelay - 2));
	} else {
		htUser(window.location.href, null);
	}
}
K.RgUser = RgUser;
function RgUser(url, aT) {
	if (window.location.href != url) {
		var aU = new Object;
		aU.message = "Rigging mob's ignition...";
		aU.page = "hitlist";
		aU.func = "RgUser";
		aU.params = url;
		aU.time = 1;
		boss.actions.RigUser = aU;
		boss.save();
		window.location.href = url;
	} else {
		var aV = Utils.getElementsByXPath("//input[@name=\"action\" and @value=\"rig_ignition\"]/../input[@type=\"submit\"]");
		var aW = aV[0].value;
		if (aW) {
			aW = aW.replace(/<[^>]*>/g, "");
		}
		if (aW) {
			aW = aW.replace(/[, \t]/g, "");
		}
		if (aW) {
			aW = aW.match(/\d+/);
		}
		if (aW) {
			aW = aW[0];
		}
		if (!isNaN(aW)) {
			if (boss.cash < aW) {
				RigCurrentUser();
			} else {
				aV[0].click();
			}
		}
	}
}
function RigCurrentUser() {
	if (boss.actions.bank_withdraw) {
		delete boss.actions.bank_withdraw;
	}
	if (boss.actions.RigUser) {
		delete boss.actions.RigUser;
	}
	var aT = Utils.getElementsByXPath("//input[@name=\"action\" and @value=\"rig_ignition\"]/../input[@type=\"submit\"]");
	var aU = aT[0].value;
	if (aU) {
		aU = aU.replace(/<[^>]*>/g, "");
	}
	if (aU) {
		aU = aU.replace(/[, \t]/g, "");
	}
	if (aU) {
		aU = aU.match(/\d+/);
	}
	if (aU) {
		aU = aU[0];
	}
	if (!isNaN(aU)) {
		if (boss.cash < aU) {
			if ((aU - boss.cash) > boss.bank_cash) {
				var aV = document.getElementById("hitCuser");
				if (aV) {
					aV.innerHTML = "<center><font color=blue>You don't have enough money to Rig this mob's ignition.<br></font></center>";
				}
				return;
			}
			var aW = new Object;
			aW.message = "Going to bank...";
			aW.page = "bank";
			aW.func = "bk_withdraw";
			aW.params = aU - boss.cash;
			aW.time = 1;
			boss.actions.bank_withdraw = aW;
			var aX = new Object;
			aX.message = "Rigging mob's ignition...";
			aX.page = "bank";
			aX.func = "RgUser";
			aX.params = window.location.href;
			aX.time = 1;
			boss.actions.RigUserNav = aX;
			boss.save();
			var aY;
			if (Page.bank) {
				aY = Page.bank;
			} else {
				aY = GM_getValue("Lbank", "http://apps.facebook.com/mobwars/bank/");
			}
			Timer.start(aY, "Going to bank...", (UserPrefs.timerdelay - 2));
		} else {
			RgUser(window.location.href, null);
		}
	}
}
function datadisplay_getFightItems(aT) {
	var aU;
	var aV = new Object;
	var aW = ["weapon", "armor", "vehicle"];
	for (var aX = 0; aX < aW.length; aX++) {
		var aY = boss.mobsters;
		var aZ = true;
		aU = new Object;
		for (var i in an) {
			if (!an[i] || !itemlist[i]) {
				continue;
			}
			var ba;
			if (itemlist[i].stocktype == "power_item") {
				ba = "weapon";
			} else {
				ba = itemlist[i].stocktype;
			}
			if (itemlist[i].type != "stockpile" || ba != aW[aX]) {
				continue;
			}
			if (!itemlist[i].attack && !itemlist[i].defense) {
				continue;
			}
			aU[i] = an[i];
		}
		while (aY && aU.toSource() != "({})") {
			var bb = 0,
			bc = undefined,
			bd, be = 0;
			max_attack = 0;
			if (aT == "defense") {
				for (bc in aU) {
					if (itemlist[bc].defense < be) {
						continue;
					}
					be = itemlist[bc].defense;
					bd = bc;
				}
			}
			if (aT == "attack") {
				for (bc in aU) {
					if (itemlist[bc].attack < max_attack) {
						continue;
					}
					max_attack = itemlist[bc].attack;
					bd = bc;
				}
			}
			if (aT == "general") {
				for (bc in aU) {
					if (itemlist[bc].price < bb) {
						continue;
					}
					bb = itemlist[bc].price;
					bd = bc;
				}
			}
			var bf = Math.min(aY, aU[bd]);
			aV[bd] = bf;
			aY -= bf;
			delete aU[bd];
		}
	}
	return aV;
}
function datadisplay_getFightPower(aT, aU) {
	var aV = 0;
	if (aT != "attack" && aT != "defense") {
		return;
	}
	if (aT == "attack") {
		aV = boss.attack_strength * boss.mobsters;
	} else {
		aV = boss.defense_strength * boss.mobsters;
	}
	var aW;
	for (aW in aU) {
		aV += itemlist[aW][aT] * aU[aW];
	}
	return aV;
}
function datadisplay_getMaxMobSize(aT) {
	var aU = ["weapon", "armor", "vehicle"];
	var aV = 1 + 3 * (parseInt(boss.level) - 1);
	for (var aW = 0; aW < aU.length; aW++) {
		var aX = 0,
		aY = 0;
		for (var i in itemlist) {
			if (itemlist[i].type != "stockpile" || itemlist[i].stocktype != aU[aW]) {
				continue;
			}
			if (itemlist[i].price > aX && itemlist[i].defense != 0) {
				aX = itemlist[i].price;
				aY = itemlist[i].defense;
			}
		}
		aV += parseInt(aY);
	}
	return Math.floor(parseInt(aT) / parseInt(aV));
}
function datadisplay_ROR() {
	var aT = boss.total_income + boss.job_income - boss.total_upkeep;
	for (var aU in itemlist) {
		if (itemlist[aU].type != "city") {
			continue;
		}
		if (Page.c_params.show_loc) {
			if (itemlist[aU].city != Page.c_params.show_loc) {
				continue;
			}
		} else {
			if (itemlist[aU].city != "new_york") {
				continue;
			}
		}
		var aV = itemlist[aU].depends;
		if (aV.length) {
			aV = itemlist[aV].price;
		} else {
			aV = 0;
		}
		var aW = aV + Math.floor(itemlist[aU].price * (10 + an[aU]) / 10);
		var aX = 100 * (itemlist[aU].income / aW);
		var aY = "<br/>ROR: " + aX.toFixed(7);
		var aZ = aY.length;
		itemlist[aU].roi = aX;
		while (aZ < 16) {
			aY += "&nbsp;";
			aZ++;
		}
		aY += "<br/>";
		var ba = 100 * (11 + an[aU]) / (10 + an[aU]) - 100;
		itemlist[aU].inflation = ba;
		var bb = Math.ceil(ba / aX);
		var bc = Math.ceil(aW / aT);
		var bd = 1;
		if (bc <= bb) {
			bd = UserPrefs.CityPurchase;
		}
		if (bd == 1 && (boss.cash + boss.bank_cash) >= aW) {
			bd = Math.floor((boss.cash + boss.bank_cash) / aW);
		}
		if (bd > UserPrefs.CityPurchase) {
			bd = parseInt(UserPrefs.CityPurchase);
		}
		var be = Utils.getElementsByXPath("//a[@name=\"" + aU + "\"]/../../td[position() = 2]")[0];
		var bf;
		if (be) {
			bf = Utils.getElementsByXPath("..//input[@name=\"qty\"]", be)[0];
		}
		if (bf) {
			bf.value = bd;
		}
		itemlist[aU].best_qty = bd;
		aW = bd * Math.floor(itemlist[aU].price * (10 + an[aU]) / 10);
		if (itemlist[aU].depends.length) {
			aV = itemlist[aU].depends;
			var bg;
			bd - an[aV] >= 0 ? (bg = bd - an[aV]) : (bg = 0);
			aW += bg * itemlist[aV].price;
		}
		aW -= boss.cash + boss.bank_cash;
		bc = Math.ceil(aW / aT);
		if (bc < 0) {
			bc = 0;
		}
		aY += "Turns left: " + bc + "&nbsp";
		itemlist[aU].turns_purchase = bc;
		if (be) {
			var bh = document.getElementById("ROR_Display" + aU);
			if (bh) {
				bh.parentNode.removeChild(bh);
			}
			var bi = document.createElement("span");
			bi.id = "ROR_Display" + aU;
			bi.innerHTML = aY;
			be.appendChild(bi);
		}
	}
	itemlist.save();
}
function datadisplay_getUpgrade(aT, aU, aV) {
	if (aU != "attack" && aU != "defense" && aU != "total") {
		throw new TypeError;
	}
	var aW;
	if (aU == "attack") {
		aW = "defense";
	} else {
		aW = "attack";
	}
	var aX = [0, "item_14", Infinity];
	var aY = boss.mobsters;
	var aZ = 0;
	var ba;
	var bb = 0;
	for (var bc in itemlist) {
		if (itemlist[bc].type == "stockpile") {
			if (itemlist[bc].stocktype == aV || (aV == "weapon" && itemlist[bc].stocktype == "power_item")) {
				if (ba == undefined) {
					if (itemlist[bc].price == 0) {
						continue;
					}
					ba = bc;
					continue;
				}
				if (aU == "attack") {
					if (itemlist[bc].price == 0) {
						continue;
					}
					if (itemlist[ba].attack > itemlist[bc].attack) {
						continue;
					}
				}
				if (aU == "defense") {
					if (itemlist[bc].price == 0) {
						continue;
					}
					if (itemlist[ba].defense > itemlist[bc].defense) {
						continue;
					}
				}
				if (aU == "total") {
					if (itemlist[bc].price == 0) {
						continue;
					}
					if (itemlist[ba].price > itemlist[bc].price) {
						continue;
					}
				}
				ba = bc;
			}
		}
	}
	if (ba && (ba != undefined)) {
		for (var bc in an) {
			if (itemlist[bc]) {
				if (itemlist[bc].type == "stockpile") {
					if (itemlist[bc].stocktype == aV || (aV == "weapon" && itemlist[bc].stocktype == "power_item")) {
						if (aU == "attack") {
							if (itemlist[ba].attack > itemlist[bc].attack) {
								continue;
							}
							if (itemlist[bc].price == 0) {
								bb += an[bc];
								continue;
							}
						}
						if (aU == "defense") {
							if (itemlist[ba].defense > itemlist[bc].defense) {
								continue;
							}
							if (itemlist[bc].price == 0) {
								bb += an[bc];
								continue;
							}
						}
						if (aU == "total") {
							if (itemlist[ba].price > itemlist[bc].price) {
								continue;
							}
							if (itemlist[bc].price == 0) {
								bb += an[bc];
								continue;
							}
						}
					}
				}
			}
		}
		aX[0] = (aY - an[ba]) - bb;
		if (aX[0] < 0) {
			aX[0] = 0;
		}
		aX[1] = ba;
	}
	return aX;
}
function datadisplay_getUnused(aT) {
	var aU = new Array;
	var aV;
	for (var aW in itemlist) {
		if (itemlist[aW].type != "stockpile") {
			continue;
		}
		if (aT[aW] == undefined) {
			aT[aW] = 0;
		}
		if (aV = an[aW] - aT[aW]) {
			aU.push(aV + " " + itemlist[aW].name + (aV == 1 ? "": "s"));
		}
	}
	return aU.join(", ");
}
function HitListToggle() {
	return function() {
		if (UserPrefs.hitlist_active == false) {
			UserPrefs.hitlist_active = true;
		} else {
			UserPrefs.hitlist_active = false;
		}
		GM_setValue("UserPrefs", UserPrefs.toSource());
		location.reload();
	};
}
function FighterToggle() {
	return function() {
		if (UserPrefs.fight_active == false) {
			UserPrefs.fight_active = true;
		} else {
			UserPrefs.fight_active = false;
			UserPrefs.override = false;
		}
		GM_setValue("UserPrefs", UserPrefs.toSource());
		location.reload();
	};
}
Fights = new Object;
Fights.init = function() {
	this.handlers = new Array;
	this.div = document.createElement("div");
	this.div.id = "FightsDiv";
	this.div.className = "facebook-gm-fights";
	var aT = ".facebook-gm-fights { text-align:right; display: none;" + " margin-left: auto; margin-right: auto; border: 0px solid black; padding: 0px; width: 640px; min-height: " + (pageHeight() - 120) + "px; font-family: Arial; background-color:#EEEEEE; color:#3B5998; padding:0px; font-weight:bold; }";
	aT += ".facebook-gm-fights h1 { font-size: 12pt; text-align:center; background: #6D84B4; color: #FFFFFF; }";
	aT += ".facebook-gm-fights table { border-width: 1px; padding: 0px; border-style: solid solid solid solid; }";
	aT += ".facebook-gm-fights .td_l { text-align:left; font-size: 10pt; border-width: 1px; padding: 0px; }";
	aT += ".facebook-gm-fights .td_r { text-align:right; font-size: 10pt; border-width: 1px; padding: 0px; }";
	aT += ".facebook-gm-fights .td_h { font-size: 10pt; border-bottom: solid 1px black; }";
	aT += ".facebook-gm-fights thead.fixedHeader tr { display: block; }";
	aT += ".facebook-gm-fights tbody.scrollContent { display: block; overflow: auto; width: 635px; height: " + (pageHeight() - 210) + "px; }";
	aT += ".facebook-gm-fights thead.fixedHeader th { width: 20px; }";
	aT += ".facebook-gm-fights thead.fixedHeader th + th { width: 19px; }";
	aT += ".facebook-gm-fights thead.fixedHeader th + th + th { width: 117px; }";
	aT += ".facebook-gm-fights thead.fixedHeader th + th + th + th { width: 238px; }";
	aT += ".facebook-gm-fights thead.fixedHeader th + th + th + th + th { width: 25px; }";
	aT += ".facebook-gm-fights thead.fixedHeader th + th + th + th + th + th { width: 25px; }";
	aT += ".facebook-gm-fights thead.fixedHeader th + th + th + th + th + th + th { width: 25px; }";
	aT += ".facebook-gm-fights thead.fixedHeader th + th + th + th + th + th + th + th { width: 75px; }";
	aT += ".facebook-gm-fights thead.fixedHeader th + th + th + th + th + th + th + th + th { width: 91px; }";
	aT += ".facebook-gm-fights thead.fixedHeader td { width: 20px; }";
	aT += ".facebook-gm-fights thead.fixedHeader td + td { width: 19px; }";
	aT += ".facebook-gm-fights thead.fixedHeader td + td + td { width: 117px; }";
	aT += ".facebook-gm-fights thead.fixedHeader td + td + td + td { width: 238px; }";
	aT += ".facebook-gm-fights thead.fixedHeader td + td + td + td + td { width: 25px; }";
	aT += ".facebook-gm-fights thead.fixedHeader td + td + td + td + td + td { width: 25px; }";
	aT += ".facebook-gm-fights thead.fixedHeader td + td + td + td + td + td + td { width: 25px; }";
	aT += ".facebook-gm-fights thead.fixedHeader td + td + td + td + td + td + td + td { width: 75px; }";
	aT += ".facebook-gm-fights thead.fixedHeader td + td + td + td + td + td + td + td + td { width: 91px; }";
	aT += ".facebook-gm-fights tbody.scrollContent td { width: 20px; }";
	aT += ".facebook-gm-fights tbody.scrollContent td + td { width: 19px; }";
	aT += ".facebook-gm-fights tbody.scrollContent td + td + td { width: 117px; }";
	aT += ".facebook-gm-fights tbody.scrollContent td + td + td + td { width: 238px; }";
	aT += ".facebook-gm-fights tbody.scrollContent td + td + td + td + td { width: 25px; }";
	aT += ".facebook-gm-fights tbody.scrollContent td + td + td + td + td + td { width: 25px; }";
	aT += ".facebook-gm-fights tbody.scrollContent td + td + td + td + td + td + td { width: 25px; }";
	aT += ".facebook-gm-fights tbody.scrollContent td + td + td + td + td + td + td + td { width: 75px; }";
	aT += ".facebook-gm-fights tbody.scrollContent td + td + td + td + td + td + td + td + td { width: 75px; }";
	GM_addStyle(aT);
};
Fights.pausingFights = function() {
	pausingFights = 1;
};
Fights.build = function() {
	var aT = GM_getValue("fightlist", "").split("|");
	if (UserPrefs.fsort == undefined) {
		UserPrefs.fsort = 0;
	}
	var aU = "#3B5998";
	var aV = "#3B5998";
	var aW = "#3B5998";
	var aX = "#3B5998";
	var aY = "#3B5998";
	var aZ = "#3B5998";
	var ba = "#3B5998";
	switch (UserPrefs.fsort + "") {
	case "0":
		aW = "green";
		break;
	case "1":
		aV = "green";
		break;
	case "2":
		aX = "green";
		break;
	case "3":
		ba = "green";
		break;
	case "4":
		aZ = "green";
		break;
	case "5":
		aU = "green";
		break;
	case "6":
		aY = "green";
		break;
	default:
		break;
	}
	var bb = "";
	if (document.location.href.match(/#stop/)) {
		bb = "#stop";
	}
	aT.sort(function(a, b) {
		return sorting(a, b);
	});
	var bc = "";
	var bd = 0;
	var be = 0;
	var bf = 0;
	var bg;
	bc += "<br><table width=\"640px\" style=\"overflow:auto\" cellspacing=0 id=\"fights_table\"><thead class=\"fixedHeader\">";
	bc += "<tr><th align=\"center\" class=\"td_h\" id=\"Snpe\">S</th><th align=\"left\" class=\"td_h\" id=\"HL\"><a><font color=\"" + aU + "\">HL</font></a></th><th align=\"left\" class=\"td_h\" id=\"fdate\"><a><font color=\"" + aV + "\">Date</font></a></th><th align=\"left\" class=\"td_h\" id=\"OpName\"><a>Opponent</a></th><th align=\"right\" class=\"td_h\" id=\"fwins\"><a><font color=\"" + aW + "\">Wins</font></a></th><th align=\"right\" class=\"td_h\" id=\"flosses\"><a><font color=\"" + aX + "\">Loss</font></a></th><th align=\"right\" class=\"td_h\" id=\"Experience\"><a><font color=\"" + aY + "\">Exp</font></a></th><th align=\"right\" class=\"td_h\" id=\"HSR\"><a><font color=\"" + aZ + "\">HSR</font></a></th><th align=\"right\" class=\"td_h\" id=\"treward\"><a><font color=\"" + ba + "\">Total Reward</font></a></th></tr></thead><tbody class=\"scrollContent\">";
	var bh;
	if (aT.length > 1) {
		for (var victim in aT) {
			if (aT[victim].split(":")[0] != "") {
				bg = " ";
				if (aT[victim].split(":")[1] != "") {
					bc += "<tr style=\"cursor:pointer\" onclick=\"window.location.href='http://apps.facebook.com/mobwars/profile/?user_id=" + aT[victim].split(":")[1] + bb + "';\">";
				} else {
					bc += "<tr>";
				}
				if (aT[victim].split(":")[9] != undefined) {
					bg = aT[victim].split(":")[9];
				}
				bc += "<td>" + bg + "</td>";
				if (parseInt(aT[victim].split(":")[6]) == 1) {
					bc += "<td>**</td>";
				} else {
					bc += "<td></td>";
				}
				bh = "NR";
				if (aT[victim].split(":")[8] != undefined) {
					var bi = new Date(parseFloat(aT[victim].split(":")[8]));
					var bj = bi.getFullYear() + "";
					var bk = bi.toTimeString() + "";
					bh = (bi.getMonth() + 1) + "/" + bi.getDate() + "/" + bj.substr(2, 2) + " " + bk.substr(0, 8);
				}
				bc += "<td class=\"td_l\">" + bh + "</td><td class=\"td_l\">" + aT[victim].split(":")[0] + "</td>";
				bc += "<td class=\"td_r\">";
				if (aT[victim].split(":")[3] > aT[victim].split(":")[5]) {
					bc += "<font color=\"green\">" + aT[victim].split(":")[3] + "</font></td><td class=\"td_r\">" + aT[victim].split(":")[5] + "</td>";
				} else {
					bc += aT[victim].split(":")[3] + "</td><td class=\"td_r\"><font color=\"red\">" + aT[victim].split(":")[5] + "</font></td>";
				}
				be += parseInt(aT[victim].split(":")[3]);
				bf += parseInt(aT[victim].split(":")[5]);
				var bl = 0;
				if (aT[victim].split(":")[7] != undefined) {
					bl = parseInt(aT[victim].split(":")[7]) / (parseInt(aT[victim].split(":")[3]) + parseInt(aT[victim].split(":")[5]));
				}
				bc += "<td class=\"td_r\">" + Math.floor(bl) + "</td>";
				bc += "<td class=\"td_r\">" + int_to_dollars(aT[victim].split(":")[2]) + "</td><td class=\"td_r\">" + int_to_dollars(aT[victim].split(":")[4]) + "</td></tr>";
				var bm;
				if (isNaN(dollars_to_int(aT[victim].split(":")[4]))) {
					bm = "$0";
				} else {
					bm = aT[victim].split(":")[4];
				}
				bd += parseInt(dollars_to_int(bm));
			}
		}
	}
	bc += "</tbody><thead class=\"fixedHeader\"><tr id=\"fights_table_total\"><td style=\"border-top:1px solid black;\" colspan=2></td><td style=\"border-top:1px solid black;\"></td><td nowrap class=\"td_r\"  style=\"border-top:1px solid black;\">TOTAL REWARDS COLLECTED:</td><td style=\"border-top:1px solid black;\"></td><td style=\"border-top:1px solid black;\"></td><td style=\"border-top:1px solid black;\"></td><td style=\"border-top:1px solid black;\"></td><td nowrap class=\"td_r\" style=\"border-top:1px solid black;color:green\" id=\"fights_total_reward\">" + int_to_dollars(bd) + "</td></tr></thead>";
	bc += "</table></div><div><table width=\"100%\"><tr><td rowspan=2 width=\"75%\">Total Wins: " + be + "<br>Total Losses: " + bf + "</td><td id=\"FightStatsButtons\"></td></tr><tr><td></td></tr></table>";
	this.div.innerHTML = bc;
	var bn = GM_getValue("FightList", "10|10").split("|");
	this.divFloat = u.createFloatingDiv(640, bn[0], bn[1], "left", "<h1><a style=\"color:darkblue;\" target=\"_blank\" href=\"http://www.secureworldhosting.com/MWAutoHelper/HomePage.html\">MobWars Auto Helper&#8482; V" + f + "</a> Fight List</h1>", "FightList", true, true, true);
	this.divFloat.appendChild(this.div);
	document.getElementsByTagName("body")[0].appendChild(this.divFloat);
	this.form = document.createElement("form");
	this.form.action = "";
	this.form.method = "";
	this.form.id = "facebook-gm-fights";
	this.div.appendChild(this.form);
	var bo = document.getElementById("FightStatsButtons");
	this.button_clear = document.createElement("button");
	this.button_clear.type = "button";
	this.button_clear.id = "fights_clear";
	this.button_clear.innerHTML = "CLEAR";
	if (aT.length > 1) {
		if (bo) {
			bo.appendChild(this.button_clear);
		}
	}
	this.button_close = document.createElement("button");
	this.button_close.type = "button_close";
	this.button_close.id = "fights_close";
	this.button_close.innerHTML = "CLOSE";
	if (bo) {
		bo.appendChild(this.button_close);
	}
	this.button_clear.addEventListener("click", this.eventListener(), true);
	this.button_close.addEventListener("click", this.eventListener(), true);
	this.form.addEventListener("submit", this.eventListener(), true);
	var button = document.getElementById("treward");
	if (button) {
		button.addEventListener("click", function() {
			UserPrefs.fsort = 3;
			GM_setValue("UserPrefs", UserPrefs.toSource());
			Fights.build();
		},
		false);
	}
	button = document.getElementById("fdate");
	if (button) {
		button.addEventListener("click", function() {
			UserPrefs.fsort = 1;
			GM_setValue("UserPrefs", UserPrefs.toSource());
			Fights.build();
		},
		false);
	}
	button = document.getElementById("flosses");
	if (button) {
		button.addEventListener("click", function() {
			UserPrefs.fsort = 2;
			GM_setValue("UserPrefs", UserPrefs.toSource());
			Fights.build();
		},
		false);
	}
	button = document.getElementById("fwins");
	if (button) {
		button.addEventListener("click", function() {
			UserPrefs.fsort = 0;
			GM_setValue("UserPrefs", UserPrefs.toSource());
			Fights.build();
		},
		false);
	}
	button = document.getElementById("HL");
	if (button) {
		button.addEventListener("click", function() {
			UserPrefs.fsort = 5;
			GM_setValue("UserPrefs", UserPrefs.toSource());
			Fights.build();
		},
		false);
	}
	button = document.getElementById("HSR");
	if (button) {
		button.addEventListener("click", function() {
			UserPrefs.fsort = 4;
			GM_setValue("UserPrefs", UserPrefs.toSource());
			Fights.build();
		},
		false);
	}
	button = document.getElementById("Experience");
	if (button) {
		button.addEventListener("click", function() {
			UserPrefs.fsort = 6;
			GM_setValue("UserPrefs", UserPrefs.toSource());
			Fights.build();
		},
		false);
	}
	button = document.getElementById("OpName");
	if (button) {
		button.addEventListener("click", function() {
			UserPrefs.fsort = 7;
			GM_setValue("UserPrefs", UserPrefs.toSource());
			Fights.build();
		},
		false);
	}
};
Fights.eventListener = function() {
	var aT = this;
	return function(aU) {
		if (this.id == "fights_clear") {
			GM_setValue("fightlist", "");
			location.reload();
		}
		aU.preventDefault();
		aT.div.style.display = "none";
		aT.div.parentNode.parentNode.removeChild(aT.div.parentNode);
		pausingFights = 0;
	};
};
Fights.show = function() {
	return function() {
		Fights.pausingFights();
		var aT = document.getElementById("FightsDiv");
		if (!aT) {
			Fights.init();
			Fights.build();
			aT = document.getElementById("FightsDiv");
		}
		if (aT) {
			var aU = GM_getValue("FightList_state", "max");
			if (aU == "min") {
				aT.style.display = "none";
			} else {
				aT.style.display = "block";
			}
		}
	};
};
function BankD() {
	return function() {
		if (boss.cash == undefined) {
			boss.cash = 0;
		}
		if (boss.bank_cash == undefined) {
			boss.bank_cash = 0;
		}
		if (boss.cash > 0 && boss.bank_cash >= 2000 || boss.cash >= 10000) {
			var aT = new Object;
			aT.page = "bank";
			if (Page.c_page != aT.page) {
				aT.message = "Going to the bank...";
				aT.page = "bank";
				aT.func = "bk_deposit";
				aT.params = [];
				aT.time = 1;
				boss.actions.bank = aT;
				boss.save();
				var aU;
				if (Page.bank) {
					aU = Page.bank;
				} else {
					aU = GM_getValue("Lbank", "http://apps.facebook.com/mobwars/bank/");
				}
				Timer.start(aU, aT.message, 0);
				return;
			}
			bk_deposit(aT.params, 0);
		} else {
			var aV = document.getElementById("scriptstatus");
			if (boss.cash == 0) {
				if (aV) {
					aV.innerHTML = "You do not have any cash to deposit.";
					aV = document.getElementById("scripttimer");
					if (aV) {
						aV.innerHTML = "";
					}
				}
			} else {
				if (aV) {
					aV.innerHTML = "You need $10,000 or more to open a bank account.";
					aV = document.getElementById("scripttimer");
					if (aV) {
						aV.innerHTML = "";
					}
				}
			}
		}
	};
}
function HealFast() {
	var aT = new Object;
	aT.page = "hospital";
	if (Page.c_page != aT.page) {
		aT.message = "Healing...";
		aT.page = "hospital";
		aT.func = "hp_heal";
		aT.params = [];
		aT.time = 1;
		boss.actions.hospitalUser = aT;
		boss.save();
		var aU;
		if (Page.hospital) {
			aU = Page.hospital;
		} else {
			aU = GM_getValue("Lhospital", "http://apps.facebook.com/mobwars/hospital/");
		}
		Timer.start(aU, aT.message, 0);
		return;
	}
	if (hospital_updateData()) {
		hp_heal(aT.params, 0);
	} else {
		var aV = document.getElementById("scriptstatus");
		if (boss.bank_cash > boss.heal_cost) {
			if (aV) {
				aV.innerHTML = "You can not heal any further.";
			}
			aV = document.getElementById("scripttimer");
			if (aV) {
				aV.innerHTML = "<br>";
			}
		} else {
			if (aV) {
				aV.innerHTML = "You have insufficient bank cash available.";
			}
			aV = document.getElementById("scripttimer");
			if (aV) {
				aV.innerHTML = "";
			}
		}
	}
}
function ax(aT, aU, aV) {
	if (UserPrefs.fightlistblockauto) {
		if (UserPrefs.fightsneeded <= aU + aV) {
			if (UserPrefs.fratio >= (aV / (aV + aU)) * 100) {
				fightlistblock.push(aT);
				GM_setValue("fightlistblock", fightlistblock.join(","));
			}
		}
	}
}
function ay(aT, aU, aV) {
	if (UserPrefs.hitlistblockauto) {
		if (UserPrefs.hfightsneeded <= aU + aV) {
			if (UserPrefs.hratio >= (aV / (aV + aU)) * 100) {
				hitlistblock.push(aT);
				GM_setValue("hitlistblock", hitlistblock.join(","));
			}
		}
	}
}
function RecordResults(aT, aU, aV, aW, aX) {
	if (aU == undefined) {
		aU = "";
	}
	if (aV == undefined) {
		aV = "Unknown";
	}
	if (aW == undefined) {
		aW = 0;
	}
	var aY;
	var aZ;
	var ba;
	var bb;
	var bc;
	var bd = 0;
	var be = 0;
	var bf;
	var bg = new Date;
	var bh = bg.getTime();
	var bi;
	if (aX == undefined) {
		aX = " ";
	}
	var bj = true;
	var bk = aT.innerHTML.replace(/<(.|\n)*?/, "");
	var bl = new RegExp("claimed the bounty of (.*?)\\.");
	var bm = new RegExp("You won the fight, taking ([0-9]*?) damage and dealing ([0-9]*?) damage to your enemy\\. You gained (.*?) and ([0-9]*?) experience");
	var bn = new RegExp("lost the fight, taking ([0-9]*?) damage and dealing ([0-9]*?) damage");
	if (boss.fights.target_id != "") {
		aV = boss.fights.target_name;
		aU = boss.fights.target_id;
		aW = boss.fights.target_amount;
	} else {
		if (Page.c_page == "profile") {
			aV = aT.getElementsByTagName("A")[0];
		} else {
			aV = aT.getElementsByTagName("A")[1];
		}
		if (aV) {
			aU = parseInt(aV.href.split("user_id=")[1]);
			aV = aV.innerHTML.split("'s")[0];
		}
	}
	if (bk.match(bl)) {
		if (aW == 0) {
			aW = parseInt(bk.match(bl)[1].replace(/[\$,]/g, ""));
		}
		bj = true;
		var bo = GM_getValue("victims", "").split("|");
		if (bo[0] == "") {
			bo.splice(0, 1);
		}
		for (victim in bo) {
			if (bo[victim].split(":")[1] == aU) {
				if (bo[victim].split(":")[3] != undefined) {
					if (Math.abs(bh - parseInt(bo[victim].split(":")[3])) < 30000) {
						bj = false;
					}
				}
			}
		}
		if (bj == true) {
			bo.push(aV + ":" + aU + ":" + aW + ":" + bh + ":" + aX);
			GM_setValue("victims", bo.join("|"));
		}
		if (UserPrefs.bank_bounty) {
			var bp = new Object;
			bp.message = "Bounty! Going to the bank...";
			bp.page = "bank";
			bp.func = "bk_deposit";
			bp.params = [];
			bp.time = 1;
			boss.actions.bank = bp;
		}
	} else if (bk.match(/you killed/i)) {
		bj = true;
		var bo = GM_getValue("victims", "").split("|");
		if (bo[0] == "") {
			bo.splice(0, 1);
		}
		for (victim in bo) {
			if (bo[victim].split(":")[1] == aU) {
				if (bo[victim].split(":")[3] != undefined) {
					if (Math.abs(bh - parseInt(bo[victim].split(":")[3])) < 30000) {
						bj = false;
					}
				}
			}
		}
		if (bj == true) {
			aX = "F";
			bo.push(aV + ":" + aU + ":" + aW + ":" + bh + ":" + aX);
			GM_setValue("victims", bo.join("|"));
		}
	}
	if (bk.match(bm)) {
		bd = parseInt(bk.match(bm)[4]);
		be = parseInt(dollars_to_int(bk.match(bm)[3]));
		var bq = GM_getValue("fightlist", "").split("|");
		if (bq[0] == "") {
			bq.splice(0, 1);
		}
		if (!isNaN(bd)) {
			if (bd >= parseInt(UserPrefs.droneTargetMinExp)) {
				var br = GM_getValue("TargetExp", "").split("|");
				if (br[0] == "") {
					br.splice(0, 1);
				}
				br.push(aU);
				if (br.length > 100) {
					br.splice(0, (br.length - 100));
				}
				GM_setValue("TargetExp", br.join("|"));
			}
		}
		if (!isNaN(be)) {
			if (be >= parseInt(UserPrefs.droneTargetMinMoney)) {
				var br = GM_getValue("TargetMoney", "").split("|");
				if (br[0] == "") {
					br.splice(0, 1);
				}
				br.push(aU);
				if (br.length > 100) {
					br.splice(0, (br.length - 100));
				}
				GM_setValue("TargetMoney", br.join("|"));
			}
		}
		if (boss.FightsTotReward == undefined) {
			boss.FightsTotReward = 0;
		}
		if (UserPrefs.bank_fights) {
			if (Page.c_page == "fight" || (Page.c_page == "profile")) {
				boss.FightsTotReward += parseInt(be);
				if (boss.FightsTotReward >= UserPrefs.minimumbank_fights) {
					var bp = new Object;
					bp.message = "Depositing fight rewards...";
					bp.page = "bank";
					bp.func = "bk_deposit";
					bp.params = [];
					bp.time = 1;
					boss.actions.bank = bp;
				}
			}
		}
		aY = 1;
		aZ = 0;
		ba = be;
		bb = 1;
		bc = 0;
		bf = 0;
		if (aW != 0) {
			bf = 1;
		}
		for (bi in bq) {
			if (bq[bi].split(":")[0] != "") {
				if (aV == bq[bi].split(":")[0]) {
					var bs;
					if (bq[bi].split(":")[7] == undefined) {
						bs = 0;
					} else {
						bs = parseInt(bq[bi].split(":")[7]);
					}
					bs += bd;
					aY = parseInt(bq[bi].split(":")[3]) + parseInt(aY);
					ba = parseInt(bq[bi].split(":")[4]) + parseInt(ba);
					bc = parseInt(bq[bi].split(":")[5]);
					aX = bq[bi].split(":")[9];
					if (be < parseInt(bq[bi].split(":")[2])) {
						be = parseInt(bq[bi].split(":")[2]);
					}
					bq[bi] = aV + ":" + aU + ":" + be + ":" + aY + ":" + ba + ":" + bc + ":" + parseInt(bq[bi].split(":")[6]) + ":" + bs + ":" + bh + ":" + aX;
					bb = 0;
				}
			}
		}
		if (bb) {
			bq.push(aV + ":" + aU + ":" + be + ":" + aY + ":" + ba + ":" + bc + ":" + bf + ":" + bd + ":" + bh + ":" + " ");
		}
		GM_setValue("fightlist", bq.join("|"));
	}
	if (bk.match(bn)) {
		var bq = GM_getValue("fightlist", "").split("|");
		if (bq[0] == "") {
			bq.splice(0, 1);
		}
		if (UserPrefs.PredictiveAvoid) {
			var bt = bk.match(bn);
			var bu = parseInt(bt[1]);
			var bv = parseInt(bt[2]);
			var bw = Infinity;
			var bx = (bu + bv + 1) / 0.3;
			if (bx < boss.max_health) {
				bw = ((bu + 2) / 2) * ((bu + 2) / bv);
			} else {
				bw = (bu / 2) * (bu / (bv + 2));
			}
			if (bw < parseInt(UserPrefs.droneMinExp)) {
				var br = GM_getValue("PredictiveExpAvoid", "").split("|");
				if (br[0] == "") {
					br.splice(0, 1);
				}
				br.push(aU);
				if (br.length > 100) {
					br.splice(0, (br.length - 100));
				}
				GM_setValue("PredictiveExpAvoid", br.join("|"));
			}
		}
		aY = 0;
		aZ = 0;
		ba = 0;
		bb = 1;
		bc = 1;
		bf = 0;
		for (bi in bq) {
			if (bq[bi].split(":")[0] != "") {
				if (aV == bq[bi].split(":")[0]) {
					if (bq[bi].split(":")[7] == undefined) {
						bd = 0;
					} else {
						bd = parseInt(bq[bi].split(":")[7]);
					}
					bc = parseInt(bq[bi].split(":")[5]) + 1;
					aY = parseInt(bq[bi].split(":")[3]);
					ba = parseInt(bq[bi].split(":")[4]);
					aX = bq[bi].split(":")[9];
					bq[bi] = aV + ":" + aU + ":" + parseInt(bq[bi].split(":")[2]) + ":" + aY + ":" + ba + ":" + bc + ":" + parseInt(bq[bi].split(":")[6]) + ":" + bd + ":" + bh + ":" + aX;
					bb = 0;
				}
			}
		}
		if (bb) {
			bq.push(aV + ":" + aU + ":0:" + aY + ":" + ba + ":" + bc + ":" + bf + ":0:" + bh + ":" + " ");
		}
		GM_setValue("fightlist", bq.join("|"));
		if (aW != 0) {
			bf = 1;
			if (aU != "") {
				ay(aU, bc, aY);
			}
		} else {
			if (aU != "") {
				ax(aU, bc, aY);
			}
		}
	}
}
function az(aU) {
	var aW = document.getElementById("app8743457343_content");
	if (aU) {
		aW = aU.relatedNode;
	} else {
		if (aW) {
			aW = Utils.getElementsByClassName("announcement", aW)[0];
		}
	}
	if (!aW) {
		return;
	}
	RecordResults(aW);
	if (boss.fights.target_id != "") {
		if (Page.c_page == "fight" && (aW.innerHTML.match(/too weak to fight/i) || aW.innerHTML.match(/someone who is in your own mob/i) || aW.innerHTML.match(/can not fight/i) || aW.innerHTML.match(/This user has already been killed/i) || aW.innerHTML.match(/were unable to attack/i))) {
			if (aW.innerHTML.match(/this user is too weak to fight/i) || aW.innerHTML.match(/This user is currently too weak to fight/i)) {
				var aX = GM_getValue("TooWeakToFight", "").split("|");
				if (aX[0] == "") {
					aX.splice(0, 1);
				}
				aX.push(boss.fights.target_id);
				if (aX.length > UserPrefs.TooWeakMemory) {
					aX.splice(0, (aX.length - UserPrefs.TooWeakMemory));
				}
				GM_setValue("TooWeakToFight", aX.join("|"));
			}
			if (aW.innerHTML.match(/someone who is in your own mob/i)) {
				var aX = GM_getValue("InYourMob", "").split("|");
				if (aX[0] == "") {
					aX.splice(0, 1);
				}
				aX.push(boss.fights.target_id);
				GM_setValue("InYourMob", aX.join("|"));
			}
			if (Page.c_page == "fight") {
				var aY;
				if (Page.fight) {
					aY = Page.fight;
				} else {
					aY = GM_getValue("Lfight", "http://apps.facebook.com/mobwars/fight/");
				}
				Timer.start(aY, "Reloading fight page...", B(UserPrefs.FDdelay, 1));
				I = true;
				return;
			}
		}
	}
}
function Vsorting(a, b) {
	if (a.split(":")[0] == "") {
		return - 1;
	}
	if (b.split(":")[0] == "") {
		return 1;
	}
	var x = 0;
	var aT = 0;
	var aU = 0;
	if (b.split(":")[3] != undefined) {
		aT = parseFloat(b.split(":")[3]);
	}
	if (a.split(":")[3] != undefined) {
		aU = parseFloat(a.split(":")[3]);
	}
	x = aT - aU;
	return x;
}
function sorting(a, b) {
	if (UserPrefs.fsort == undefined) {
		UserPrefs.fsort = 0;
	}
	if (a.split(":")[0] == "") {
		return - 1;
	}
	if (b.split(":")[0] == "") {
		return 1;
	}
	var x = 0;
	if (UserPrefs.fsort == 0) {
		x = b.split(":")[3] - a.split(":")[3];
		if (x == 0) {
			x = b.split(":")[4] - a.split(":")[4];
		}
	}
	if (UserPrefs.fsort == 1) {
		var aT = 0;
		var aU = 0;
		if (b.split(":")[8] != undefined) {
			aT = parseFloat(b.split(":")[8]);
		}
		if (a.split(":")[8] != undefined) {
			aU = parseFloat(a.split(":")[8]);
		}
		x = aT - aU;
	}
	if (UserPrefs.fsort == 2) {
		x = b.split(":")[5] - a.split(":")[5];
		if (x == 0) {
			x = b.split(":")[4] - a.split(":")[4];
		}
	}
	if (UserPrefs.fsort == 3) {
		x = dollars_to_int(b.split(":")[4]) - dollars_to_int(a.split(":")[4]);
		if (x == 0) {
			x = b.split(":")[7] - a.split(":")[7];
		}
	}
	if (UserPrefs.fsort == 4) {
		x = dollars_to_int(b.split(":")[2]) - dollars_to_int(a.split(":")[2]);
		if (x == 0) {
			x = b.split(":")[4] - a.split(":")[4];
		}
	}
	if (UserPrefs.fsort == 5) {
		x = b.split(":")[6] - a.split(":")[6];
		if (x == 0) {
			x = b.split(":")[4] - a.split(":")[4];
		}
	}
	if (UserPrefs.fsort == 6) {
		var aV = 0;
		var aW = 0;
		if (b.split(":")[7] != undefined) {
			aV = b.split(":")[7];
		}
		if (a.split(":")[7] != undefined) {
			aW = a.split(":")[7];
		}
		x = (aV / (b.split(":")[3] + b.split(":")[5])) - aW / (a.split(":")[3] + a.split(":")[5]);
		if (x == 0) {
			x = b.split(":")[4] - a.split(":")[4];
		}
	}
	if (UserPrefs.fsort == 7) {
		var aX = [b.split(":")[0], a.split(":")[0]];
		aX.sort();
		if (aX[0] == b.split(":")[0]) {
			x = 1;
		} else {
			x = -1;
		}
	}
	return x;
}
K.checkstockpile = checkstockpile;
function checkstockpile() {
	if (!boss.actions.inventory_stockpileW && !boss.actions.inventory_stockpileA && !boss.actions.inventory_stockpileV && !boss.actions.inventory_stockpileP) {
		var aT = new Object;
		if (Page.c_params.show_type && (Page.c_params.show_type != "weapon")) {
			aT.page = "weapon";
			aT.message = "Checking weapons...";
			aT.time = Math.floor(Math.random() * 10131);
			if (aT.time < 5) {
				aT.time = 15;
			}
			boss.actions.inventory_stockpileW = aT;
		}
		if (Page.c_params.show_type != "armor") {
			aT = new Object;
			aT.page = "armor";
			aT.message = "Checking armor...";
			aT.time = Math.floor(Math.random() * 10131);
			if (aT.time < 5) {
				aT.time = 15;
			}
			boss.actions.inventory_stockpileA = aT;
		}
		if (Page.c_params.show_type != "vehicle") {
			aT = new Object;
			aT.page = "vehicle";
			aT.message = "Checking vehicles...";
			aT.time = Math.floor(Math.random() * 10131);
			if (aT.time < 5) {
				aT.time = 15;
			}
			boss.actions.inventory_stockpileV = aT;
		}
		if (Page.c_params.show_type != "power_item") {
			aT = new Object;
			aT.page = "power_item";
			aT.message = "Checking power items...";
			aT.time = Math.floor(Math.random() * 10131);
			if (aT.time < 5) {
				aT.time = 15;
			}
			boss.actions.inventory_stockpileP = aT;
		}
		if (boss.actions.inventory_stockpile) {
			delete boss.actions.inventory_stockpile;
		}
		boss.save();
		MainStuff();
	}
}
K.checkcities = checkcities;
function checkcities() {
	for (var x = 0; x < Page.cities.length; x++) {
		if (!Page.cities[x].href.match("help.php")) {
			var aT = Page.cities[x].href.split("show_loc=")[1];
			if (Page.c_params.show_loc != aT) {
				if (!Page.c_params.show_loc && (aT == "new_york")) {} else {
					if (!boss.actions["citycheck" + aT]) {
						var aU = new Object;
						aU.message = "Checking " + aT + "...";
						aU.page = aT;
						aU.func = "";
						aU.time = 1;
						aU.params = [];
						boss.actions["citycheck" + aT] = aU;
					}
				}
			}
		}
	}
	if (boss.actions.inventory_city) {
		delete boss.actions.inventory_city;
	}
	boss.save();
	MainStuff();
}
K.aC_e = aC_e;
function aC_e() {
	if (boss.bank_cash == undefined) {
		return;
	}
	if (!UserPrefs.autoCityBuy) {
		return;
	}
	if (boss.autoCityBuy_cost == undefined) {
		boss.autoCityBuy_cost = 0;
	}
	if (boss.autoCityBuy_item == undefined) {
		boss.autoCityBuy_item = "";
	}
	if (boss.autoCityBuy_city == undefined) {
		boss.autoCityBuy_city = "";
	}
	if (boss.autoCityBuy_qty == undefined) {
		boss.autoCityBuy_qty = 0;
	}
	if (Page.c_page == "city") {
		if (!autoCityBuy_getBestBuy()) {
			return;
		}
	}
	if ((boss.autoCityBuy_cost == 0 || boss.autoCityBuy_item == "" || boss.autoCityBuy_city == "")) {
		if (!boss.actions.inventory_city) {
			if (!Page.cities) {
				var aT = new Object;
				aT.message = "Checking next city purchase...";
				aT.page = "city";
				aT.func = "checkcities";
				aT.params = [];
				if (boss.new_level) {
					aT.time = Page.now + Math.floor(Math.random() * 31);
				} else {
					aT.time = 1;
				}
				boss.actions.inventory_city = aT;
				return;
			} else {
				for (var x = 0; x < Page.cities.length; x++) {
					if (!Page.cities[x].href.match("help.php")) {
						var aU = Page.cities[x].href.split("show_loc=")[1];
						if (Page.c_params.show_loc != aU) {
							if (!Page.c_params.show_loc && (aU == "new_york")) {} else {
								if (!boss.actions["citycheck" + aU]) {
									var aT = new Object;
									aT.message = "Checking next city purchase " + aU + "...";
									aT.page = aU;
									aT.func = "";
									aT.time = 1;
									aT.params = [];
									boss.actions["citycheck" + aU] = aT;
								}
							}
						}
					}
				}
				return;
			}
		}
		return;
	}
	if (boss.actions.hitlistUser || boss.actions.hitlistUserNav) {
		if (boss.actions.autoCityBuy) {
			delete boss.actions.autoCityBuy;
		}
		if (boss.actions.autoCityBuyGo) {
			delete boss.actions.autoCityBuyGo;
		}
		return;
	}
	if (boss.actions.inventory_city || boss.actions.citychecknew_york || boss.actions.citycheckchicago || boss.actions.citychecklondon || boss.actions.citycheckvegas || boss.actions.citycheckmoscow || boss.actions.citycheckdubai || boss.actions.citycheckshanghai || boss.actions.citychecktokyo) {
		return;
	}
	var money;
	var aV = boss.cash - UserPrefs.cashprotected;
	if (aV < 0) {
		aV = 0;
	}
	if (UserPrefs.autoCityBuy_withBank && boss.bank_cash > UserPrefs.bankrestricted) {
		money = aV + (boss.bank_cash - UserPrefs.bankrestricted);
	} else {
		money = aV;
	}
	if (boss.autoCityBuy_qty > 0) {
		if (boss.autoCityBuy_cost <= money) {
			if (boss.autoCityBuy_cost <= aV) {
				if (boss.actions.bank) {
					boss.actions.bank.time += 5;
				}
				if (boss.actions.bank_checkdelay) {
					delete boss.actions.bank_checkdelay;
				}
				if (!boss.actions.autoCityBuyGo) {
					var aW = new Object;
					aW.message = "Buying property...";
					aW.page = "city";
					aW.func = "aC_buyPropertyStart";
					aW.params = boss.autoCityBuy_city;
					aW.time = 2;
					boss.actions.autoCityBuy = aW;
				}
			} else {
				if (UserPrefs.autoCityBuy_withBank) {
					if (boss.actions.bank) {
						boss.actions.bank.time += 5;
					}
					if (boss.actions.bank_checkdelay) {
						delete boss.actions.bank_checkdelay;
					}
					var aX = new Object;
					aX.message = "Going to the bank...";
					aX.page = "bank";
					aX.func = "bk_withdraw";
					aX.params = boss.autoCityBuy_cost - aV;
					aX.time = 1;
					boss.actions.autoCityBuy = aX;
				}
			}
		}
	}
}
K.aC_buyPropertyStart = aC_buyPropertyStart;
function aC_buyPropertyStart(aT) {
	if (Page.c_page == "city") {
		if (Page.c_params.show_loc != aT) {
			if (!Page.c_params.show_loc && (aT == "new_york")) {
				aC_buyProperty();
			} else {
				var aU = new Object;
				aU.message = "Buying property...";
				aU.page = aT;
				aU.func = "aC_buyProperty";
				aU.time = 2;
				boss.actions.autoCityBuyGo = aU;
				boss.save();
				var aV;
				if (Page[aT]) {
					aV = Page[aT];
				} else {
					aV = GM_getValue("L" + aT, "http://apps.facebook.com/mobwars/city/?show_loc=" + boss.autoCityBuy_city);
				}
				Timer.start(aV, aU.message, aU.time);
			}
		} else {
			aC_buyProperty();
		}
	}
}
function autoCityBuy_getBestBuy() {
	boss.autoCityBuy_item = "";
	boss.autoCityBuy_qty = 0;
	boss.autoCityBuy_cost = 0;
	if (boss.bank_cash == undefined) {
		var aT = new Object;
		aT.message = "Going to the bank...";
		aT.page = "bank";
		aT.func = "";
		aT.params = [];
		aT.time = 1;
		boss.actions.bank = aT;
		return false;
	}
	var aU = 0;
	var money = 0;
	var aV = boss.cash - UserPrefs.cashprotected;
	if (aV < 0) {
		aV = 0;
	}
	if (UserPrefs.autoCityBuy_withBank && boss.bank_cash > UserPrefs.bankrestricted) {
		money = aV + (boss.bank_cash - UserPrefs.bankrestricted);
	} else {
		money = aV;
	}
	for (var aW in itemlist) {
		if (itemlist[aW].type == "city") {
			if (itemlist[aW].roi >= aU) {
				if (itemlist[aW].roi == aU) {
					if (boss.autoCityBuy_cost > 0) {
						if ((itemlist[aW].cost * itemlist[aW].best_qty) > money) {
							if (boss.autoCityBuy_cost < money || (boss.autoCityBuy_cost < itemlist[aW].cost * itemlist[aW].best_qty)) {
								continue;
							}
						}
					}
				}
				if (UserPrefs.maxland) {
					if (itemlist[aW].name == "Empty Lot" && ((parseInt(itemlist[aW].best_qty) + parseInt(an[aW])) > parseInt(UserPrefs.CityPurchase))) {
						continue;
					}
					if (itemlist[aW].name == "City Block" && ((parseInt(itemlist[aW].best_qty) + parseInt(an[aW])) > parseInt(UserPrefs.CityPurchase))) {
						continue;
					}
					if (itemlist[aW].name == "Downtown Square" && ((parseInt(itemlist[aW].best_qty) + parseInt(an[aW])) > parseInt(UserPrefs.CityPurchase))) {
						continue;
					}
					if (itemlist[aW].name == "Beachfront Lot" && ((parseInt(itemlist[aW].best_qty) + parseInt(an[aW])) > parseInt(UserPrefs.CityPurchase))) {
						continue;
					}
				}
				if (itemlist[aW].depends != "") {
					var aX = itemlist[aW].depends;
					if (itemlist[aW].best_qty > an[aX]) {
						boss.autoCityBuy_item = itemlist[aX].itemn;
						boss.autoCityBuy_city = itemlist[aX].city;
						boss.autoCityBuy_name = itemlist[aX].name;
						boss.autoCityBuy_cost = itemlist[aX].cost * (itemlist[aW].best_qty - an[aX]);
						boss.autoCityBuy_qty = itemlist[aW].best_qty - an[aX];
						aU = itemlist[aW].roi;
						continue;
					}
				}
				aU = itemlist[aW].roi;
				boss.autoCityBuy_item = itemlist[aW].itemn;
				boss.autoCityBuy_city = itemlist[aW].city;
				boss.autoCityBuy_name = itemlist[aW].name;
				boss.autoCityBuy_cost = itemlist[aW].cost * itemlist[aW].best_qty;
				boss.autoCityBuy_qty = itemlist[aW].best_qty;
			}
		}
	}
	if (boss.autoCityBuy_qty > UserPrefs.CityPurchase) {
		boss.autoCityBuy_qty = UserPrefs.CityPurchase;
	}
	if (UserPrefs.autoCityBuy_withBank && boss.bank_cash > UserPrefs.bankrestricted) {
		money = aV + (boss.bank_cash - UserPrefs.bankrestricted);
	}
	autocity = document.getElementById("AutoCityQueue");
	if (autocity) {
		var aY = boss.autoCityBuy_cost - money;
		if (aY < 0) {
			aY = 0;
		}
		autocity.innerHTML = "Buying: " + boss.autoCityBuy_qty + " " + boss.autoCityBuy_name + " (in " + boss.autoCityBuy_city + ") for " + Q(boss.autoCityBuy_cost) + ", still need: " + Q(aY);
	}
	return true;
}
K.aC_buyProperty = aC_buyProperty;
function aC_buyProperty() {
	if (Page.c_page == "city") {
		if (boss.autoCityBuy_qty > 0) {
			var aT = document.getElementsByName(boss.autoCityBuy_item)[0].parentNode.parentNode;
			Array.forEach(aT.getElementsByTagName("INPUT"), function(aU) {
				if (aU.name == "qty") {
					aU.value = boss.autoCityBuy_qty;
				}
				if (aU.value == "Buy") {
					boss.autoCityBuy_item = "";
					boss.autoCityBuy_cost = 0;
					Timer.start(aU, "Buying " + boss.autoCityBuy_qty + " " + aT.getElementsByTagName("B")[0].innerHTML + "s...", (UserPrefs.timerdelay - 2));
					l("Buying " + boss.autoCityBuy_qty + " " + aT.getElementsByTagName("B")[0].innerHTML + "s... in " + (UserPrefs.timerdelay - 2), 2);
				}
			});
		}
	}
}
function aC_pI(aT) {
	var aU = new Array;
	var value = UserPrefs.autoCityBuy;
	aU.push("<div id=\"aC_toggle\" class=\"PrefMenuToggles\"><table width=\"100%\"><tr><td>Auto City Purchase Preferences</td></tr></table></div><div id=\"aC_preferences\" style=\"display: none;\"><table width=\"100%\"><tr id=\"autocity\"><td colspan=2>");
	aU.push("<label for=\"AutoCity\">Automatically purchase city items: </label>");
	aU.push("</td><td>");
	if (value) {
		aU.push("Yes <input type=\"radio\" name=\"AutoCity\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"AutoCity\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"AutoCity\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"AutoCity\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr><tr id=\"autocitywbank\"><td width=\"5%\"></td><td width=\"75%\">");
	value = UserPrefs.autoCityBuy_withBank;
	aU.push("<label for=\"AutoCityBank\">Use bank money for purchases: </label>");
	aU.push("</td><td>");
	if (value) {
		aU.push("Yes <input type=\"radio\" name=\"AutoCityBank\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"AutoCityBank\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"AutoCityBank\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"AutoCityBank\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr><tr id=\"cashmin\"><td width=\"5%\"></td><td width=\"75%\">");
	value = UserPrefs.cashprotected;
	aU.push("<label for=\"cashminimum\">What amount of cash should be untouchable: ($)<br><font size=1><center>(from Auto City Purchases only)</center></font></label>");
	aU.push("</td><td>");
	aU.push("<input type=\"text\" name=\"cashminimum\" maxlength=\"15\" size=\"15\" ");
	aU.push("value=\"" + value + "\"/>");
	aU.push("</td></tr><tr id=\"autocitymaxland\"><td colspan=2>");
	value = UserPrefs.maxland;
	aU.push("<label for=\"AutoCityMaxLand\">Limit holdings of undeveloped land: </label>");
	aU.push("</td><td>");
	if (value) {
		aU.push("Yes <input type=\"radio\" name=\"AutoCityMaxLand\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"AutoCityMaxLand\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"AutoCityMaxLand\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"AutoCityMaxLand\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr>");
	value = UserPrefs.CityPurchase;
	aU.push("<tr id=\"citypurchase\"><td width=\"5%\"></td><td width=\"75%\">");
	aU.push("<label for=\"CityPurchase\">Purchase properties in groups up to:</label>");
	aU.push("</td><td>");
	aU.push("<input type=\"text\" name=\"CityPurchase\" maxlength=\"3\" size=\"3\" ");
	aU.push("value=\"" + value + "\"/>");
	aU.push("</td></tr>");
	aU.push("<tr id=\"newlevelaccheck\"><td colspan=2>");
	value = UserPrefs.newLevelAcCheck;
	aU.push("<label for=\"newLevelAcCheck\">Check for new property available at new levels: </label>");
	aU.push("</td><td>");
	if (value) {
		aU.push("Yes <input type=\"radio\" name=\"newLevelAcCheck\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"newLevelAcCheck\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"newLevelAcCheck\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"newLevelAcCheck\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr>");
	aU.push("</table></div><hr>");
	var aV = document.createElement("div");
	if (aV) {
		aV.innerHTML = aU.join("\n");
	}
	var aW = document.getElementById("PrefStuff");
	if (aW) {
		aW.appendChild(aV);
	}
	var button = document.getElementById("aC_toggle");
	if (button) {
		button.addEventListener("click", function() {
			var aX = document.getElementById("aC_preferences");
			if (aX) {
				if (aX.style.display == "none") {
					aX.style.display = "block";
				} else {
					aX.style.display = "none";
				}
			}
		},
		true);
	}
}
J.aC_pH = aC_pH;
J.aC_pI = aC_pI;
function aC_pH(aT, UserPrefs) {
	var aU = aT.elements.namedItem("AutoCity");
	var aV = aT.elements.namedItem("AutoCityBank");
	var aW = aT.elements.namedItem("AutoCityMaxLand");
	var aX = false;
	if (UserPrefs.autoCityBuy != aU.checked) {
		if (boss.actions.autoCityBuy) {
			delete boss.actions.autoCityBuy;
		}
		if (boss.actions.autoCityBuyGo) {
			delete boss.actions.autoCityBuyGo;
		}
		UserPrefs.autoCityBuy = aU.checked;
		aX = true;
	}
	aU = aT.elements.namedItem("newLevelAcCheck");
	if (UserPrefs.newLevelAcCheck != aU.checked) {
		UserPrefs.newLevelAcCheck = aU.checked;
		aX = true;
	}
	aU = parseInt(aT.elements.namedItem("CityPurchase").value);
	if (isNaN(aU) || aU < 0 || (aU > 10)) {
		alert("Invalid entry on city purchase group amount (Auty City Purchase Preferences), entry not changed");
		w = true;
	} else {
		if (UserPrefs.CityPurchase != aU) {
			UserPrefs.CityPurchase = aU;
			aX = true;
			boss.autoCityBuy_cost = 0;
			boss.autoCityBuy_qty = 0;
			boss.autoCityBuy_item = "";
			boss.save();
		}
	}
	if (UserPrefs.autoCityBuy_withBank != aV.checked) {
		UserPrefs.autoCityBuy_withBank = aV.checked;
		aX = true;
	}
	if (UserPrefs.maxland != aW.checked) {
		UserPrefs.maxland = aW.checked;
		aX = true;
	}
	var aY = parseInt(aT.elements.namedItem("cashminimum").value);
	if (isNaN(aY) || (aY < 0)) {
		alert("Invalid entry on Cash protected from Auto City purchases (Auty City Purchase Preferences), entry not changed");
		w = true;
	} else {
		if (aY != UserPrefs.cashprotected) {
			UserPrefs.cashprotected = aY;
			aX = true;
		}
	}
	return aX;
}
K.sp_e = sp_e;
function sp_e() {
	if (!UserPrefs.autostockpile_active) {
		return;
	}
	if (boss.actions.inventory_stockpile || boss.actions.inventory_stockpileP || boss.actions.inventory_stockpileW || boss.actions.inventory_stockpileA || boss.actions.inventory_stockpileV) {
		boss.oldMobsters = boss.mobsters;
		return;
	}
	if (boss.oldMobsters == undefined) {
		boss.oldMobsters = boss.mobsters;
	}
	if (boss.oldMobsters == boss.mobsters) {
		var aT = eval(GM_getValue("WeaponUpgrade", "[0,\"none\",0]"));
		var aU = eval(GM_getValue("ArmorUpgrade", "[0,\"none\",0]"));
		var aV = eval(GM_getValue("VehicleUpgrade", "[0,\"none\",0]"));
		if (aT[0] > 0) {
			if (!boss.actions.buystockpile && !boss.actions.buystockpileDepend && !boss.actions.buystockpileStart) {
				if (aT[0] < UserPrefs.autostockpile_minimum) {
					aT[0] = UserPrefs.autostockpile_minimum;
				}
				if (aT[0] > 100) {
					aT[0] = 100;
				}
				var aW = parseInt(itemlist[aT[1]].price) * parseInt(aT[0]);
				if (itemlist[aT[1]].needs != "Nothing") {
					var aX = parseInt(aT[0]) - parseInt(an[itemlist[aT[1]].needs]);
					if (parseInt(aX) > 0) {
						aW += parseInt(itemlist[itemlist[aT[1]].needs].price) * parseInt(aX);
					}
				}
				if (parseInt(aW) > parseInt(boss.cash)) {
					if (parseInt(aW) > parseInt(boss.cash) + parseInt(boss.bank_cash)) {
						return;
					}
				}
				var aY = new Object;
				aY.message = "Buying weapons...";
				aY.page = "stockpile";
				aY.func = "buystockpile";
				aY.params = [aT[1], aT[0], UserPrefs.timerdelay, "weapon", "stockpileweapon"];
				aY.time = 3;
				boss.actions.stockpileweapon = aY;
			}
		} else if (aU[0] > 0) {
			if (!boss.actions.buystockpile && !boss.actions.buystockpileDepend && !boss.actions.buystockpileStart) {
				if (aU[0] < UserPrefs.autostockpile_minimum) {
					aU[0] = UserPrefs.autostockpile_minimum;
				}
				if (aU[0] > 100) {
					aU[0] = 100;
				}
				var aW = parseInt(itemlist[aU[1]].price) * parseInt(aU[0]);
				if (itemlist[aU[1]].needs != "Nothing") {
					var aX = parseInt(aU[0]) - parseInt(an[itemlist[aU[1]].needs]);
					if (parseInt(aX) > 0) {
						aW += parseInt(itemlist[itemlist[aU[1]].needs].price) * parseInt(aX);
					}
				}
				if (parseInt(aW) > parseInt(boss.cash)) {
					if (parseInt(aW) > parseInt(boss.cash) + parseInt(boss.bank_cash)) {
						return;
					}
				}
				var aY = new Object;
				aY.message = "Buying armor...";
				aY.page = "stockpile";
				aY.func = "buystockpile";
				aY.params = [aU[1], aU[0], UserPrefs.timerdelay, "armor", "stockpilearmor"];
				aY.time = 3;
				boss.actions.stockpilearmor = aY;
			}
		} else if (aV[0] > 0) {
			if (!boss.actions.buystockpile && !boss.actions.buystockpileDepend && !boss.actions.buystockpileStart) {
				if (aV[0] < UserPrefs.autostockpile_minimum) {
					aV[0] = UserPrefs.autostockpile_minimum;
				}
				if (aV[0] > 100) {
					aV[0] = 100;
				}
				var aW = parseInt(itemlist[aV[1]].price) * parseInt(aV[0]);
				if (itemlist[aV[1]].needs != "Nothing") {
					var aX = parseInt(aV[0]) - parseInt(an[itemlist[aV[1]].needs]);
					if (parseInt(aX) > 0) {
						aW += parseInt(itemlist[itemlist[aV[1]].needs].price) * parseInt(aX);
					}
				}
				if (parseInt(aW) > parseInt(boss.cash)) {
					if (parseInt(aW) > parseInt(boss.cash) + parseInt(boss.bank_cash)) {
						return;
					}
				}
				var aY = new Object;
				aY.message = "Buying vehilces...";
				aY.page = "stockpile";
				aY.func = "buystockpile";
				aY.params = [aV[1], aV[0], UserPrefs.timerdelay, "vehicle", "stockpilevehicle"];
				aY.time = 3;
				boss.actions.stockpilevehicle = aY;
			}
		}
		return;
	}
	var aY = new Object;
	aY.page = "stockpile";
	aY.func = "checkstockpile";
	aY.message = "New mobster(s).. Checking stockpile...";
	aY.time = Page.now;
	boss.actions.inventory_stockpile = aY;
	boss.oldMobsters = boss.mobsters;
}
function sp_pI(aT) {
	var value = UserPrefs.autostockpile_active;
	var aU = new Array;
	aU.push("<div id=\"sp_toggle\" class=\"PrefMenuToggles\"><table width=\"100%\"><tr><td>Auto Stockpile Preferences (work in progress)</td></tr></table></div><div id=\"sp_preferences\" style=\"display: none;\">");
	aU.push("<center>LIMITED AutoStock purchase functionality.  It's still very BETA. It is now VERY aggressive in keeping your mob up to date.  It will check once every new (or loss of) mob member, and if you don't have enough money at that time, it will go to buy the needed items immediately when you do.  Also, if you sell any stockpile items while this is on, and that selling made it so that you now need items, it will immediately (if you have the money) go and buy the needed items.<br><br>Currently ignores minimum bank preferences.<br><br></center>");
	aU.push("<table width=\"100%\">");
	aU.push("<tr id=\"autostockpileact\"><td colspan=2>");
	aU.push("<label for=\"autostockpile_active\">Automatically purchase equipment as needed:</label>");
	aU.push("</td><td>");
	if (value) {
		aU.push("Yes <input type=\"radio\" name=\"autostockpile_active\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"autostockpile_active\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"autostockpile_active\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"autostockpile_active\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr><tr id=\"autostockpileminimum\"><td colspan=\"2\">");
	aU.push("<label for=\"autostockpile_minimum\">Minimum stockpile purchase? (100 max)</label>");
	aU.push("</td><td>");
	aU.push("<input type=\"text\" name=\"autostockpile_minimum\" maxlength=\"3\" size=\"3\" ");
	value = UserPrefs.autostockpile_minimum;
	aU.push("value=\"" + value + "\"/>");
	aU.push("</td></tr>");
	aU.push("<tr id=\"newlevelspcheck\"><td colspan=2>");
	value = UserPrefs.newLevelSpCheck;
	aU.push("<label for=\"newLevelSpCheck\">Check for new weapons/armor/vehicles/power items available at new levels: </label>");
	aU.push("</td><td>");
	if (value) {
		aU.push("Yes <input type=\"radio\" name=\"newLevelSpCheck\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"newLevelSpCheck\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"newLevelSpCheck\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"newLevelSpCheck\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr>");
	aU.push("</table>");
	aU.push("</div><hr>");
	var aV = document.createElement("div");
	if (aV) {
		aV.innerHTML = aU.join("\n");
	}
	var aW = document.getElementById("PrefStuff");
	if (aW) {
		aW.appendChild(aV);
	}
	var button = document.getElementById("sp_toggle");
	if (button) {
		button.addEventListener("click", function() {
			var aX = document.getElementById("sp_preferences");
			if (aX) {
				if (aX.style.display == "none") {
					aX.style.display = "block";
				} else {
					aX.style.display = "none";
				}
			}
		},
		true);
	}
}
J.sp_pI = sp_pI;
J.sp_pH = sp_pH;
function sp_pH(aT, UserPrefs) {
	var aU = aT.elements.namedItem("autostockpile_active");
	var aV = false;
	if (UserPrefs.autostockpile_active != aU.checked) {
		UserPrefs.autostockpile_active = aU.checked;
		if (UserPrefs.autostockpile_active) {
			var aW = new Object;
			aW.page = "stockpile";
			aW.func = "checkstockpile";
			aW.message = "Checking stockpile available after turning on Auto Stockpile...";
			aW.time = 1;
			boss.actions.inventory_stockpile = aW;
			boss.save();
		}
		aV = true;
	}
	aU = aT.elements.namedItem("newLevelSpCheck");
	if (UserPrefs.newLevelSpCheck != aU.checked) {
		UserPrefs.newLevelSpCheck = aU.checked;
		aV = true;
	}
	aU = parseInt(aT.elements.namedItem("autostockpile_minimum").value);
	if (!isNaN(aU)) {
		if (UserPrefs.autostockpile_minimum != aU) {
			UserPrefs.autostockpile_minimum = aU;
			aV = true;
		}
	}
	return aV;
}
function aA() {
	if (isNaN(UserPrefs.loglevel)) {
		UserPrefs.loglevel = 2;
	}
	if (isNaN(UserPrefs.loglength)) {
		UserPrefs.loglength = 100;
	}
	if (UserPrefs.logstuff == undefined) {
		UserPrefs.logstuff = false;
	}
	if (UserPrefs.skill == undefined) {
		UserPrefs.skill = "none";
	}
	if (UserPrefs.skill2 == undefined) {
		UserPrefs.skill = "none";
	}
	if (UserPrefs.skill3 == undefined) {
		UserPrefs.skill = "none";
	}
	if (E.Retry == undefined) {
		E.Retry = true;
	}
	if (E.UseIt == undefined) {
		E.UseIt = false;
	}
	if (E.user == undefined) {
		E.user = "";
	}
	if (E.pass == undefined) {
		E.pass = "";
	}
	if (E.sysAnswer == undefined) {
		E.sysAnswer = false;
	}
	if (E.transid == undefined) {
		E.transid = "";
	}
	if (E.valid == undefined) {
		E.valid = 0;
	}
	if (E.MaxRetry == undefined) {
		E.MaxRetry = 5;
	}
	if (E.Retries == undefined) {
		E.Retries = 0;
	}
	if (isNaN(E.MinTime)) {
		E.MinTime = 4;
	}
	if (isNaN(E.MaxTime)) {
		E.MaxTime = 13;
	}
	if (UserPrefs.insider == undefined) {
		UserPrefs.insider = false;
	}
	if (UserPrefs.godfather == undefined) {
		UserPrefs.godfather = "nothing";
	}
	if (isNaN(UserPrefs.godfatheruntouchpoints)) {
		UserPrefs.godfatheruntouchpoints = 0;
	}
	if (UserPrefs.fight_active == undefined) {
		UserPrefs.fight_active = false;
	}
	if (UserPrefs.fightlistblock == undefined) {
		UserPrefs.fightlistblock = true;
	}
	if (UserPrefs.fightlistblockauto == undefined) {
		UserPrefs.fightlistblockauto = true;
	}
	if (isNaN(UserPrefs.maxmob)) {
		UserPrefs.maxmob = 2;
	}
	if (isNaN(UserPrefs.minmob)) {
		UserPrefs.minmob = 1;
	}
	if (isNaN(UserPrefs.maxfights)) {
		UserPrefs.maxfights = 0;
	}
	if (isNaN(UserPrefs.minlevel)) {
		UserPrefs.minlevel = 1;
	}
	if (isNaN(UserPrefs.maxlevel)) {
		UserPrefs.maxlevel = 0;
	}
	if (UserPrefs.dronebycolor == undefined) {
		UserPrefs.dronebycolor = "green";
	}
	if (UserPrefs.dronebycolorchoice == undefined) {
		UserPrefs.dronebycolorchoice = false;
	}
	if (isNaN(UserPrefs.enemydefensemodifier)) {
		UserPrefs.enemydefensemodifier = 0;
	}
	if (UserPrefs.dronebylesscolor == undefined) {
		UserPrefs.dronebylesscolor = false;
	}
	if (isNaN(UserPrefs.fightsneeded)) {
		UserPrefs.fightsneeded = 1;
	}
	if (isNaN(UserPrefs.fratio)) {
		UserPrefs.fratio = 100;
	}
	if (isNaN(UserPrefs.defskillmod)) {
		UserPrefs.defskillmod = 95;
	}
	if (UserPrefs.fightforce == undefined) {
		UserPrefs.fightforce = false;
	}
	if (isNaN(UserPrefs.forcemin)) {
		UserPrefs.forcemin = 1;
	}
	if (isNaN(UserPrefs.droneMinExp)) {
		UserPrefs.droneMinExp = 0;
	}
	if (UserPrefs.fighttarget == undefined) {
		UserPrefs.fighttarget = false;
	}
	if (UserPrefs.fightlistmark == undefined) {
		UserPrefs.fightlistmark = false;
	}
	if (isNaN(UserPrefs.droneMinMoney)) {
		UserPrefs.droneMinMoney = 0;
	}
	if (isNaN(UserPrefs.dronememory)) {
		UserPrefs.dronememory = 60;
	}
	if (UserPrefs.droneTargetExp == undefined) {
		UserPrefs.droneTargetExp = false;
	}
	if (UserPrefs.droneTargetMoney == undefined) {
		UserPrefs.droneTargetMoney = false;
	}
	if (isNaN(UserPrefs.droneTargetMinMoney)) {
		UserPrefs.droneTargetMinMoney = UserPrefs.droneMinMoney;
	}
	if (isNaN(UserPrefs.droneTargetMinExp)) {
		UserPrefs.droneTargetMinExp = UserPrefs.droneMinExp;
	}
	if (UserPrefs.droneIgnoreOnline == undefined) {
		UserPrefs.droneIgnoreOnline = false;
	}
	if (UserPrefs.DroneIgnoreLevelB == undefined) {
		UserPrefs.DroneIgnoreLevelB = false;
	}
	if (UserPrefs.DroneIgnoreMembersB == undefined) {
		UserPrefs.DroneIgnoreMembersB = false;
	}
	if (UserPrefs.DroneIgnoreOnlineB == undefined) {
		UserPrefs.DroneIgnoreOnlineB = false;
	}
	if (UserPrefs.DroneIgnoreListB == undefined) {
		UserPrefs.DroneIgnoreListB = false;
	}
	if (UserPrefs.DroneIgnoreTimesB == undefined) {
		UserPrefs.DroneIgnoreTimesB = false;
	}
	if (UserPrefs.DroneIgnoreExpB == undefined) {
		UserPrefs.DroneIgnoreExpB = false;
	}
	if (UserPrefs.DroneIgnoreMoneyB == undefined) {
		UserPrefs.DroneIgnoreMoneyB = false;
	}
	if (UserPrefs.PredictiveAvoid == undefined) {
		UserPrefs.PredictiveAvoid = false;
	}
	if (UserPrefs.TooWeakMemory == undefined) {
		UserPrefs.TooWeakMemory = 10;
	}
	if (UserPrefs.IgnoreMinimumBounty == undefined) {
		UserPrefs.IgnoreMinimumBounty = true;
	}
	if (isNaN(UserPrefs.snipedelay)) {
		UserPrefs.snipedelay = 250;
	}
	if (UserPrefs.hitlistblock == undefined) {
		UserPrefs.hitlistblock = true;
	}
	if (UserPrefs.hitlistblockauto == undefined) {
		UserPrefs.hitlistblockauto = true;
	}
	if (UserPrefs.snipemore == undefined) {
		UserPrefs.snipemore = false;
	}
	if (UserPrefs.hitlist_active == undefined) {
		UserPrefs.hitlist_active = false;
	}
	if (isNaN(UserPrefs.staminaregen)) {
		UserPrefs.staminaregen = boss.max_stamina;
	}
	if (UserPrefs.staminaregen > boss.max_stamina) {
		UserPrefs.staminaregen = boss.max_stamina;
	}
	if (UserPrefs.hitlist_target == undefined) {
		UserPrefs.hitlist_target = false;
	}
	if (isNaN(UserPrefs.MaxBounty)) {
		UserPrefs.MaxBounty = 12000;
	}
	if (isNaN(UserPrefs.MinBounty)) {
		UserPrefs.MinBounty = 8000;
	}
	if (isNaN(UserPrefs.snipe)) {
		UserPrefs.snipe = 0;
	}
	if (isNaN(UserPrefs.maxsnipe)) {
		UserPrefs.maxsnipe = 1;
	}
	if (UserPrefs.varysnipe == undefined) {
		UserPrefs.varysnipe = true;
	}
	if (isNaN(UserPrefs.varysnipeamount)) {
		UserPrefs.varysnipeamount = 1;
	}
	if (UserPrefs.varysnipeamount > 2) {
		UserPrefs.varysnipeamount = 2;
	}
	if (UserPrefs.varysnipeamount < 1) {
		UserPrefs.varysnipeamount = 1;
	}
	if (isNaN(UserPrefs.hfightsneeded)) {
		UserPrefs.hfightsneeded = 1;
	}
	if (isNaN(UserPrefs.hratio)) {
		UserPrefs.hratio = 100;
	}
	if (UserPrefs.hitlistsnipesafe == undefined) {
		UserPrefs.hitlistsnipesafe = true;
	}
	if (UserPrefs.blockpresence == undefined) {
		UserPrefs.blockpresence = false;
	}
	if (UserPrefs.fbhide == undefined) {
		UserPrefs.fbhide = false;
		if (CanHide()) {
			UserPrefs.fbhide = true;
		}
	}
	if (isNaN(UserPrefs.timerdelay)) {
		UserPrefs.timerdelay = 7;
	}
	if (isNaN(UserPrefs.BHdelay)) {
		UserPrefs.BHdelay = UserPrefs.timerdelay;
	}
	if (isNaN(UserPrefs.FDdelay)) {
		UserPrefs.FDdelay = UserPrefs.timerdelay;
	}
	if (isNaN(UserPrefs.refreshdelay)) {
		UserPrefs.refreshdelay = 0;
	}
	if (isNaN(UserPrefs.captchatimeoutlength)) {
		UserPrefs.captchatimeoutlength = 0;
	}
	if (UserPrefs.randomizer == undefined) {
		UserPrefs.randomizer = true;
	}
	if (UserPrefs.job == undefined) {
		UserPrefs.job = "none";
	}
	if (UserPrefs.newLevelJbCheck == undefined) {
		UserPrefs.newLevelJbCheck = true;
	}
	if (isNaN(UserPrefs.jobdelay)) {
		UserPrefs.jobdelay = 0;
	}
	if (UserPrefs.sndid == undefined) {
		UserPrefs.sndid = "none";
	}
	if (UserPrefs.alertsound == undefined) {
		UserPrefs.alertsound = false;
	}
	if (isNaN(UserPrefs.sndrepeat)) {
		UserPrefs.sndrepeat = 2;
	}
	if (UserPrefs.pmobsound == undefined) {
		UserPrefs.pmobsound = false;
	}
	if (UserPrefs.bank_active == undefined) {
		UserPrefs.bank_active = false;
	}
	if (UserPrefs.bank_bounty == undefined) {
		UserPrefs.bank_bounty = false;
	}
	if (UserPrefs.bank_fights == undefined) {
		UserPrefs.bank_fights = false;
	}
	if (isNaN(UserPrefs.minimumbank_fights)) {
		UserPrefs.minimumbank_fights = 10000;
	}
	if (isNaN(UserPrefs.bankminimum)) {
		UserPrefs.bankminimum = 2000;
	}
	if (UserPrefs.bankminimum < 2000) {
		UserPrefs.bankminimum = 2000;
	}
	if (isNaN(UserPrefs.bankrestricted) || (UserPrefs.bankrestricted < UserPrefs.bankminimum)) {
		UserPrefs.bankrestricted = UserPrefs.bankminimum;
	}
	if (isNaN(UserPrefs.heal_limit)) {
		UserPrefs.heal_limit = 0;
	}
	if (UserPrefs.heal_limit > 60) {
		UserPrefs.heal_limit = 60;
	}
	if (isNaN(UserPrefs.hmin)) {
		UserPrefs.hmin = 30;
	}
	if (UserPrefs.hmin > 70) {
		boss.preferenses.hmin = 70;
	}
	if (UserPrefs.hmin < UserPrefs.heal_limit) {
		UserPrefs.hmin = UserPrefs.heal_limit;
	}
	if (UserPrefs.hmin < 20) {
		UserPrefs.hmin = 20;
	}
	if (UserPrefs.autohealoff == undefined) {
		UserPrefs.autohealoff = false;
	}
	if (UserPrefs.stamwaitautohealoff == undefined) {
		UserPrefs.stamwaitautohealoff = false;
	}
	if (UserPrefs.healtomax == undefined) {
		UserPrefs.healtomax = true;
	}
	if (UserPrefs.playdead == undefined) {
		UserPrefs.playdead = true;
	}
	if (isNaN(UserPrefs.playdeadhealth)) {
		UserPrefs.playdeadhealth = 10;
	}
	if (isNaN(UserPrefs.playdeadtime)) {
		UserPrefs.playdeadtime = 10;
	}
	if (isNaN(UserPrefs.playdeadtimeMax)) {
		UserPrefs.playdeadtimeMax = UserPrefs.playdeadtime * 2;
	}
	if (UserPrefs.AdminNoHeal == undefined) {
		UserPrefs.AdminNoHeal = true;
	}
	if (UserPrefs.HealShortCut == undefined) {
		UserPrefs.HealShortCut = false;
	}
	UserPrefs.DBMboss = false;
	UserPrefs.DBMfightlist = false;
	UserPrefs.DBMfightlistblock = false;
	UserPrefs.DBMhitlistblock = false;
	UserPrefs.DBMgodfather = false;
	UserPrefs.DBMPrevFights = false;
	UserPrefs.DBMinventory = false;
	UserPrefs.DBMitemlist = false;
	UserPrefs.DBMjobs = false;
	UserPrefs.DBMvictims = false;
	if (isNaN(UserPrefs.CityPurchase)) {
		UserPrefs.CityPurchase = 10;
	}
	if (UserPrefs.newLevelAcCheck == undefined) {
		UserPrefs.newLevelAcCheck = true;
	}
	if (UserPrefs.autoCityBuy == undefined) {
		UserPrefs.autoCityBuy = false;
	}
	if (UserPrefs.autoCityBuy_withBank == undefined) {
		UserPrefs.autoCityBuy_withBank = false;
	}
	if (isNaN(UserPrefs.cashprotected)) {
		UserPrefs.cashprotected = 0;
	}
	if (UserPrefs.maxland == undefined) {
		UserPrefs.maxland = true;
	}
	if (UserPrefs.windoworder == undefined) {
		UserPrefs.windoworder = "standard";
	}
	if (UserPrefs.PromptAlert == undefined) {
		UserPrefs.PromptAlert = false;
	}
	if (isNaN(UserPrefs.placement)) {
		UserPrefs.placement = 0;
	}
	if (UserPrefs.AddFaceBookFriendHomePage == undefined) {
		UserPrefs.AddFaceBookFriendHomePage = true;
	}
	if (UserPrefs.AddFaceBookFriendFightPage == undefined) {
		UserPrefs.AddFaceBookFriendFightPage = true;
	}
	if (UserPrefs.pausemobster == undefined) {
		UserPrefs.pausemobster = true;
	}
	if (isNaN(UserPrefs.orientation)) {
		UserPrefs.orientation = 0;
	}
	if (isNaN(UserPrefs.adjust)) {
		if (CanHide()) {
			UserPrefs.adjust = 1;
		} else {
			UserPrefs.adjust = 0;
		}
	}
	if (UserPrefs.statdisp == undefined) {
		UserPrefs.statdisp = false;
	}
	if (UserPrefs.bankbutton == undefined) {
		UserPrefs.bankbutton = true;
	}
	if (UserPrefs.healbutton == undefined) {
		UserPrefs.healbutton = true;
	}
	if (UserPrefs.showbounty == undefined) {
		UserPrefs.showbounty = false;
	}
	if (UserPrefs.expneeded == undefined) {
		UserPrefs.expneeded = false;
	}
	if (UserPrefs.popuphelp == undefined) {
		UserPrefs.popuphelp = true;
	}
	if (UserPrefs.errorreload == undefined) {
		UserPrefs.errorreload = false;
	}
	if (UserPrefs.ShowCaptcha == undefined) {
		UserPrefs.ShowCaptcha = true;
	}
	if (UserPrefs.newLevelSpCheck == undefined) {
		UserPrefs.newLevelSpCheck = true;
	}
	if (UserPrefs.autostockpile_active == undefined) {
		UserPrefs.autostockpile_active = false;
	}
	if (isNaN(UserPrefs.autostockpile_minimum)) {
		UserPrefs.autostockpile_minimum = 1;
	}
	if (isNaN(UserPrefs.captchalength)) {
		UserPrefs.captchalength = 3;
	}
	if (UserPrefs.checkcaptcha == undefined) {
		UserPrefs.checkcaptcha = true;
	}
}
function cc_pI(aT) {
	var aU = new Array;
	aU.push("<div id=\"cc_toggle\" class=\"PrefMenuToggles\"><table width=\"100%\"><tr><td>Captcha Input Checking</td></tr></table></div><div id=\"cc_preferences\" style=\"display: none;\">");
	aU.push("<table width=\"100%\">");
	var value = UserPrefs.checkcaptcha;
	aU.push("<tr id=\"CheckCaptcha\"><td colspan=2>");
	aU.push("<label for=\"checkcaptcha\">Check the result from MWCaptcha for validity:</label>");
	aU.push("</td><td>");
	if (value) {
		aU.push("Yes <input type=\"radio\" name=\"checkcaptcha\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"checkcaptcha\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"checkcaptcha\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"checkcaptcha\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr>");
	aU.push("<tr id=\"MaxCaptchaLength\"><td colspan=\"2\">");
	aU.push("<label for=\"captchalength\">Maximum length allowed for captcha entry (Default: 3): </label>");
	aU.push("</td><td>");
	aU.push("<input type=\"text\" name=\"captchalength\" maxlength=\"3\" size=\"3\" ");
	value = UserPrefs.captchalength;
	aU.push("value=\"" + value + "\"/>");
	aU.push("</td></tr>");
	aU.push("</table>");
	aU.push("</div><hr>");
	var aV = document.createElement("div");
	if (aV) {
		aV.innerHTML = aU.join("\n");
	}
	var aW = document.getElementById("PrefStuff");
	if (aW) {
		aW.appendChild(aV);
	}
	var button = document.getElementById("cc_toggle");
	if (button) {
		button.addEventListener("click", function() {
			var aX = document.getElementById("cc_preferences");
			if (aX) {
				if (aX.style.display == "none") {
					aX.style.display = "block";
				} else {
					aX.style.display = "none";
				}
			}
		},
		true);
	}
}
J.cc_pI = cc_pI;
J.cc_pH = cc_pH;
function cc_pH(aT, UserPrefs) {
	var aU = false;
	var aV = aT.elements.namedItem("checkcaptcha").checked;
	if (UserPrefs.checkcaptcha != aV) {
		UserPrefs.checkcaptcha = aV;
		aU = true;
	}
	aV = aT.elements.namedItem("captchalength").value;
	if (UserPrefs.captchalength != aV) {
		if (aV > 0) {
			UserPrefs.captchalength = aV;
			aU = true;
		}
	}
	return aU;
}
K.sk_e = sk_e;
function sk_e() {
	var aT = false;
	if (boss.actions.skill) {
		delete boss.actions.skill;
	}
	if (UserPrefs.skill == undefined || UserPrefs.skill == "none") {
		return;
	}
	var aU = document.getElementById("app8743457343_statusMenu");
	var aV;
	if (aU) {
		aV = Utils.getElementsByClassName("wrap3outer", aU);
	}
	if (aV != null && aV.length > 0) {
		var aW = aV[4].innerHTML;
		var aX = /Level Up/;
		var aY = aW.match(aX);
		if (aY) {
			aT = true;
		}
	}
	if (Page.c_page == "profile" && (Page.c_params.user_id == Page.c_user || Page.c_params.user_id == "" || Page.c_params.user_id == undefined)) {
		var aU = document.getElementById("app8743457343_content");
		var aZ;
		if (aU) {
			aZ = Utils.getElementsByClassName("announcement", aU);
		}
		if (aZ) {
			var ba = aZ[0].innerHTML.replace(/,/g, "");
			var aY = ba.match(/You have <b>?\$?([0-9]+)<\/b> skill point/);
			if (aY) {
				boss.points = parseInt(aY[1]);
				if (boss.points == 0) {
					boss.levelupL = 0;
					return;
				}
			} else {
				if (aZ[1]) {
					ba = aZ[1].innerHTML.replace(/,/g, "");
					aY = ba.match(/You have <b>?\$?([0-9]+)<\/b> skill point/);
					if (aY) {
						boss.points = parseInt(aY[1]);
						if (boss.points == 0) {
							boss.levelupL = 0;
							return;
						}
					} else {
						boss.points = 0;
						boss.levelupL = 0;
						return;
					}
				} else {
					boss.points = 0;
					boss.levelupL = 0;
					return;
				}
			}
		} else {
			boss.points = 0;
			boss.levelupL = 0;
			return;
		}
	}
	if (aT) {
		if ((boss.points < 2) & ((UserPrefs.skill == "recovery_max") & (UserPrefs.skill2 == "recovery_max" || UserPrefs.skill2 == "none")) & UserPrefs.skill3 == "none") {
			var bb = document.getElementById("scripterror");
			if (bb) {
				bb.innerHTML = "<center>You have skill points to allocate, but nothing set that can be allocated</center><br>";
			}
		} else {
			var bc = new Object;
			bc.message = "Leveling up...";
			bc.page = "profile";
			bc.func = "sk_levelUp";
			bc.params = [];
			bc.time = 1;
			boss.actions.skill = bc;
		}
	}
}
K.sk_levelUp = sk_levelUp;
function sk_levelUp(aT, aU) {
	var aV;
	var url;
	aU = aU - 2;
	if (aU < 0) {
		aU = 0;
	}
	if (boss.points > 0) {
		if ((boss.levelupL <= 0 || boss.levelupL > 3) || (boss.levelupL == undefined)) {
			boss.levelupL = 1;
		}
		if (boss.levelupL == undefined || (boss.levelupL == 1)) {
			if ((boss.points >= 2 || UserPrefs.skill != "recovery_max") & UserPrefs.skill != "none") {
				aV = Utils.getElementsByXPath("//a[contains(@href, \"type=" + UserPrefs.skill + "\")]")[0];
				if (aV) {
					url = aV;
					Timer.start(url, "Increasing skill '" + UserPrefs.skill + "'...", aU);
				} else {
					boss.points = 0;
				}
			} else {
				location.reload();
			}
			if (UserPrefs.skill2 != "none") {
				boss.levelupL = 2;
			} else {
				boss.levelupL = 1;
			}
		} else {
			if (boss.levelupL == 2) {
				if ((boss.points >= 2 || UserPrefs.skill2 != "recovery_max") & UserPrefs.skill2 != "none") {
					aV = Utils.getElementsByXPath("//a[contains(@href, \"type=" + UserPrefs.skill2 + "\")]")[0];
					if (aV) {
						url = aV;
						Timer.start(url, "Increasing skill '" + UserPrefs.skill2 + "'...", aU);
					} else {
						boss.points = 0;
					}
				} else {
					location.reload();
				}
				if (UserPrefs.skill3 != "none") {
					boss.levelupL = 3;
				} else {
					boss.levelupL = 1;
				}
			} else {
				if (boss.levelupL == 3) {
					if ((boss.points >= 2 || UserPrefs.skill3 != "recovery_max") & UserPrefs.skill3 != "none") {
						aV = Utils.getElementsByXPath("//a[contains(@href, \"type=" + UserPrefs.skill3 + "\")]")[0];
						if (aV) {
							url = aV;
							Timer.start(url, "Increasing skill '" + UserPrefs.skill3 + "'...", aU);
						} else {
							boss.points = 0;
						}
					} else {
						location.reload();
					}
					boss.levelupL = 1;
				}
			}
		}
	} else {
		var aW;
		if (Page.homelink) {
			aW = Page.homelink;
		} else {
			aW = GM_getValue("Lhomelink", "http://apps.facebook.com/mobwars/");
		}
		Timer.start(aW, "Levelup Error... Reloading...", B(UserPrefs.FDdelay, 1));
	}
}
function sk_pI(aT) {
	var aU = new Array;
	aU.push("<div id=\"sk_toggle\" class=\"PrefMenuToggles\"><table width=\"100%\"><tr><td>Skill/Level Up Preferences</td></tr></table></div><div id=\"sk_preferences\" style=\"display: none;\"><table id=\"skill\" width=\"100%\"><tr><td colspan=2><center>Will allocate skill points as follows<br><font size=\"1\">(Will cycle thru list, and repeat, until all skill points are used)</font></center></td></tr><tr><td width=\"80%\"><label for=\"skillList\">First skill to automatically level up: </label></td><td><select name=\"skillList\">");
	aU.push("<option value=\"none\"");
	if (UserPrefs.skill == "none") {
		aU.push(" selected=\"selected\"");
	}
	aU.push(">None</option><option value=\"attack\"");
	if (UserPrefs.skill == "attack") {
		aU.push(" selected=\"selected\"");
	}
	aU.push(">Attack Strength</option><option value=\"defense\"");
	if (UserPrefs.skill == "defense") {
		aU.push(" selected=\"selected\"");
	}
	aU.push(">Defense Strength</option><option value=\"energy_max\"");
	if (UserPrefs.skill == "energy_max") {
		aU.push(" selected=\"selected\"");
	}
	aU.push(">Max Energy</option><option value=\"health_max\"");
	if (UserPrefs.skill == "health_max") {
		aU.push(" selected=\"selected\"");
	}
	aU.push(">Max Health</option><option value=\"recovery_max\"");
	if (UserPrefs.skill == "recovery_max") {
		aU.push(" selected=\"selected\"");
	}
	aU.push(">Stamina</option></select></td></tr><tr><td><label for=\"skillList2\">Second skill to automatically level up:<br> &nbsp&nbsp&nbsp (First Skill must not be \"none\")</label></td><td><select name=\"skillList2\">");
	aU.push("<option value=\"none\"");
	if (UserPrefs.skill2 == "none") {
		aU.push(" selected=\"selected\"");
	}
	aU.push(">None</option><option value=\"attack\"");
	if (UserPrefs.skill2 == "attack") {
		aU.push(" selected=\"selected\"");
	}
	aU.push(">Attack Strength</option><option value=\"defense\"");
	if (UserPrefs.skill2 == "defense") {
		aU.push(" selected=\"selected\"");
	}
	aU.push(">Defense Strength</option><option value=\"energy_max\"");
	if (UserPrefs.skill2 == "energy_max") {
		aU.push(" selected=\"selected\"");
	}
	aU.push(">Max Energy</option><option value=\"health_max\"");
	if (UserPrefs.skill2 == "health_max") {
		aU.push(" selected=\"selected\"");
	}
	aU.push(">Max Health</option><option value=\"recovery_max\"");
	if (UserPrefs.skill2 == "recovery_max") {
		aU.push(" selected=\"selected\"");
	}
	aU.push(">Stamina</option></select></td></tr><tr><td><label for=\"skillList3\">Third skill to automatically level up:<br> &nbsp&nbsp&nbsp (First and Second Skills must not be \"none\") </label></td><td><select name=\"skillList3\">");
	aU.push("<option value=\"none\"");
	if (UserPrefs.skill3 == "none") {
		aU.push(" selected=\"selected\"");
	}
	aU.push(">None</option><option value=\"attack\"");
	if (UserPrefs.skill3 == "attack") {
		aU.push(" selected=\"selected\"");
	}
	aU.push(">Attack Strength</option><option value=\"defense\"");
	if (UserPrefs.skill3 == "defense") {
		aU.push(" selected=\"selected\"");
	}
	aU.push(">Defense Strength</option><option value=\"energy_max\"");
	if (UserPrefs.skill3 == "energy_max") {
		aU.push(" selected=\"selected\"");
	}
	aU.push(">Max Energy</option><option value=\"health_max\"");
	if (UserPrefs.skill3 == "health_max") {
		aU.push(" selected=\"selected\"");
	}
	aU.push(">Max Health</option></select></td></tr></table></div><hr>");
	var aV = document.createElement("div");
	if (aV) {
		aV.innerHTML = aU.join("\n");
	}
	var aW = document.getElementById("PrefStuff");
	if (aW) {
		aW.appendChild(aV);
	}
	var button = document.getElementById("sk_toggle");
	if (button) {
		button.addEventListener("click", function() {
			var aX = document.getElementById("sk_preferences");
			if (aX) {
				if (aX.style.display == "none") {
					aX.style.display = "block";
				} else {
					aX.style.display = "none";
				}
			}
		},
		true);
	}
}
J.sk_pI = sk_pI;
J.sk_pH = sk_pH;
function sk_pH(aT, UserPrefs) {
	var aU = false;
	var aV = aT.elements.namedItem("skillList");
	if (UserPrefs.skill != aV.options[aV.selectedIndex].value) {
		UserPrefs.skill = aV.options[aV.selectedIndex].value;
		aU = true;
	}
	aV = aT.elements.namedItem("skillList2");
	if (UserPrefs.skill2 != aV.options[aV.selectedIndex].value) {
		UserPrefs.skill2 = aV.options[aV.selectedIndex].value;
		aU = true;
	}
	aV = aT.elements.namedItem("skillList3");
	if (UserPrefs.skill3 != aV.options[aV.selectedIndex].value) {
		UserPrefs.skill3 = aV.options[aV.selectedIndex].value;
		aU = true;
	}
	if (UserPrefs.skill2 == "recovery_max") {
		if (UserPrefs.skill == "recovery_max") {
			UserPrefs.skill2 = "none";
			aU = true;
		}
	}
	if (UserPrefs.skill2 == "recovery_max" || (UserPrefs.skill == "recovery_max")) {
		UserPrefs.skill3 = "none";
	}
	if (UserPrefs.skill == "none") {
		UserPrefs.skill2 = "none";
	}
	if (UserPrefs.skill2 == "none") {
		UserPrefs.skill3 = "none";
	}
	return aU;
}
function aB() {
	this.type = "GFOption";
	this.name = "Unknown";
	this.godfather_points = 0;
}
function aC() {
	var aT = eval(GM_getValue("godfather", "({})"));
	for (var i in aT) {
		this[i] = aT[i];
	}
}
aC.prototype = new Object;
aC.prototype.save = function() {
	GM_setValue("godfather", this.toSource());
};
aC.prototype.updateData = function() {
	if (Page.c_page == "godfather") {
		boss.GodFatherChecked = true;
		for (var aT in this) {
			if (this[aT].type == "GFOption") {
				delete this[aT];
			}
		}
		for (i = 0; i < document.forms.length; i++) {
			if (document.forms[i].action.match(/godfather/)) {
				var aU = new aB;
				var aV;
				var aW = document.forms[i].getElementsByTagName("INPUT");
				for (k = 0; k < aW.length; k++) {
					if (aW[k].name == "reward") {
						aV = aW[k].value;
						switch (aV) {
						case "friend":
							aU.name = "Hired Guns";
							break;
						case "cash":
							aU.name = "Cash";
							break;
						case "specialWeapon":
							aU.name = "Special Weapon";
							break;
						case "energy":
							aU.name = "Energy";
							break;
						case "health":
							aU.name = "Health";
							break;
						case "recovery":
							aU.name = "Stamina";
							break;
						case "insider":
							aU.name = "Insider";
							break;
						default:
							break;
						}
					}
					if (aW[k].type == "submit") {
						aU.godfather_points = parseInt(aW[k].value.match(/\d+/));
						if (isNaN(aU.godfather_points)) {
							aU.godfather_points = 9999;
						}
					}
				}
				this[aV] = aU;
			}
		}
		this.save();
	}
};
K.gf_e = gf_e;
function gf_e() {
	if (boss.actions.godfather) {
		delete boss.actions.godfather;
	}
	var aT = document.getElementById("app8743457343_navMenu");
	if (aT) {
		var aU = Utils.getElementsByClassName("subCounts", aT)[0];
		boss.GFpoints = parseInt(aU.innerHTML.split("(")[1]);
	}
	GodFatherL.updateData();
	if (boss.GodFatherChecked == undefined || (boss.GodFatherChecked == false)) {
		if (boss.actions.hitlist) {
			delete boss.actions.hitlist;
		}
		if (boss.actions.fighter) {
			delete boss.actions.fighter;
		}
		var aV = new Object;
		aV.page = "godfather";
		aV.message = "Going to check offers from the GodFather...";
		aV.time = Math.floor((new Date).getTime() / 1000) + UserPrefs.timerdelay;
		boss.actions.godfather = aV;
		return;
	}
	if (UserPrefs.godfather == "nothing") {
		return;
	}
	if ((boss.GFpoints - UserPrefs.godfatheruntouchpoints) >= GodFatherL[UserPrefs.godfather].godfather_points) {
		if (boss.actions.hitlist) {
			delete boss.actions.hitlist;
		}
		if (boss.actions.fighter) {
			delete boss.actions.fighter;
		}
		var aW = new Object;
		aW.page = "godfather";
		aW.message = "Going to the GodFather for " + GodFatherL[UserPrefs.godfather].name + "...";
		aW.func = "gf_do";
		aW.params = [UserPrefs.godfather, GodFatherL[UserPrefs.godfather].name];
		aW.time = Math.floor((new Date).getTime() / 1000) + UserPrefs.timerdelay;
		boss.actions.godfather = aW;
	}
}
K.gf_do = gf_do;
function gf_do(aT, aU) {
	if (Page.c_page != "godfather") {
		return;
	}
	aU = aU || 5;
	aU = aU - 2;
	if (aU < 0) {
		aU = 0;
	}
	var aV = Utils.getElementsByXPath("//input[@name=\"reward\" and @value=\"" + aT[0] + "\"]/../input[@type=\"submit\"]");
	Timer.start(aV[0], "Asking for " + aT[1] + "...", aU);
}
function gf_pI(aT) {
	var aU = new Array;
	aU.push("<div id=\"gf_toggle\" class=\"PrefMenuToggles\"><table width=\"100%\"><tr><td>Godfather Preferences (Insider option here)</td></tr></table></div><div id=\"gf_preferences\" style=\"display: none;\"><table width=\"100%\">");
	aU.push("<tr id=\"godlisttr\"><td colspan=2 width=\"80%\"><label for=\"godlist\">Use GodFather points for: </label></td><td><select name=\"godlist\">");
	aU.push("<option value=\"nothing\"");
	if (UserPrefs.godfather == "nothing") {
		aU.push(" selected=\"selected\"");
	}
	aU.push(">Nothing</option>");
	for (var aV in GodFatherL) {
		if (GodFatherL[aV].type == "GFOption") {
			aU.push("<option value=\"" + aV + "\"");
			if (UserPrefs.godfather == aV) {
				aU.push(" selected=\"selected\" ");
			}
			aU.push(">" + GodFatherL[aV].name);
			aU.push("</option>");
		}
	}
	aU.push("</select></td></tr><tr id=\"GodFatherUntouched\"></td><td width=\"5%\"></td><td width=\"75%\">");
	aU.push("<label for=\"GFnopoints\">Do not use how many points:</label>");
	aU.push("</td><td>");
	aU.push("<input type=\"text\" name=\"GFnopoints\" maxlength=\"3\" size=\"3\" ");
	var aW = UserPrefs.godfatheruntouchpoints;
	aU.push("value=\"" + aW + "\">");
	aU.push("</td></tr>");
	var value = UserPrefs.insider;
	aU.push("<tr id=\"insideractive\"><td colspan=2>");
	aU.push("<label for=\"insider_active\">Are you a MobWars Insider: <br><center><font size=1></label>");
	aU.push("</td><td>");
	if (value) {
		aU.push("Yes <input type=\"radio\" name=\"insider_active\" value=\"1\" checked=\"checked\"/>");
		aU.push("No <input type=\"radio\" name=\"insider_active\" value=\"0\"/>");
	} else {
		aU.push("Yes <input type=\"radio\" name=\"insider_active\" value=\"1\"/>");
		aU.push("No <input type=\"radio\" name=\"insider_active\" value=\"0\" checked=\"checked\"/>");
	}
	aU.push("</td></tr></table>");
	aU.push("</div><hr>");
	var aX = document.createElement("div");
	if (aX) {
		aX.innerHTML = aU.join("\n");
	}
	var aY = document.getElementById("PrefStuff");
	if (aY) {
		aY.appendChild(aX);
	}
	var button = document.getElementById("gf_toggle");
	if (button) {
		button.addEventListener("click", function() {
			var aZ = document.getElementById("gf_preferences");
			if (aZ) {
				if (aZ.style.display == "none") {
					aZ.style.display = "block";
				} else {
					aZ.style.display = "none";
				}
			}
		},
		true);
	}
}
J.gf_pI = gf_pI;
J.gf_pH = gf_pH;
function gf_pH(aT, UserPrefs) {
	var aU = aT.elements.namedItem("insider_active");
	var aV = parseInt(aT.elements.namedItem("GFnopoints").value);
	var aW = false;
	var aX = aT.elements.namedItem("godlist");
	var aY = aX.options[aX.selectedIndex].value;
	if (aY != UserPrefs.godfather) {
		if (boss.actions.godfather) {
			delete boss.actions.godfather;
		}
		UserPrefs.godfather = aY;
		aW = true;
	}
	if (UserPrefs.insider != aU.checked) {
		UserPrefs.insider = aU.checked;
		aW = true;
	}
	if (!isNaN(aV)) {
		if (UserPrefs.godfatheruntouchpoints != aV) {
			UserPrefs.godfatheruntouchpoints = aV;
			aW = true;
		}
	}
	return aW;
}
K.aF_e = aF_e;
function aF_e() {
	var aT = "Waiting for health";
	var aU = "Waiting for stamina regeneration...";
	if (boss.actions.Dead || boss.actions.stamina) {
		if (boss.actions.fighter) {
			delete boss.actions.fighter;
		}
		return;
	}
	if (!UserPrefs.fight_active) {
		if (boss.actions.fighter) {
			delete boss.actions.fighter;
		}
		return;
	}
	if (boss.actions.fighter) {
		if (!boss.actions.fighter.message.match(aT)) {
			if (!boss.actions.fighter.message.match(aU)) {
				delete boss.actions.fighter;
			} else {
				return;
			}
		} else {
			delete boss.actions.fighter;
		}
	}
	if (UserPrefs.override == undefined) {
		UserPrefs.override = false;
	}
	if (boss.actions.hitlist) {
		if (UserPrefs.fightforce) {
			if (boss.stamina == boss.max_stamina) {
				var aV = document.getElementById("fightermode");
				if (aV) {
					aV.innerHTML = "<font color=blue>Forced</font>";
				}
				UserPrefs.override = true;
				delete boss.actions.hitlist;
			} else {
				if (UserPrefs.override == true) {
					if (boss.stamina <= UserPrefs.forcemin) {
						UserPrefs.override = false;
						GM_setValue("UserPrefs", UserPrefs.toSource());
						if (boss.actions.fighter) {
							delete boss.actions.fighter;
						}
						return;
					}
					UserPrefs.override = true;
					delete boss.actions.hitlist;
				} else {
					UserPrefs.override = false;
					GM_setValue("UserPrefs", UserPrefs.toSource());
					if (boss.actions.fighter) {
						delete boss.actions.fighter;
					}
					return;
				}
			}
		} else {
			UserPrefs.override = false;
			GM_setValue("UserPrefs", UserPrefs.toSource());
			if (boss.actions.fighter) {
				delete boss.actions.fighter;
			}
			return;
		}
	}
	GM_setValue("UserPrefs", UserPrefs.toSource());
	var aW = new Object;
	if (boss.stamina && (boss.health >= (UserPrefs.hmin / 100) * boss.max_health || UserPrefs.HealShortCut)) {
		aW.message = "Checking Fight page...";
		aW.page = "fight";
		aW.func = "drone";
		aW.params = [UserPrefs.dronebycolor, "Blocked for <font color=red>losses</font>:<br>", "Blocked for <font color=red>max fights</font>:<br>", "Blocked for <font color=red>low exp</font>:<br>", "Blocked for <font color=red>low money</font>:<br>", "Blocked for <font color=red>online</font>:<br>", "Blocked for <font color=red>too weak</font>:<br>", "Blocked for <font color=red>your mob</font>:<br>"];
		aW.time = Math.floor((new Date).getTime() / 1000) + UserPrefs.timerdelay;
		boss.actions.fighter = aW;
	} else {
		if (!boss.stamina) {
			var aX = 107;
			if (UserPrefs.insider) {
				aX = Math.ceil(aX * 0.9);
			}
			aW.message = "Waiting for stamina regeneration...";
			aW.page = "profile";
			aW.time = Math.floor((new Date).getTime() / 1000) + UserPrefs.staminaregen * aX;
			aW.save = true;
			boss.actions.stamina = aW;
			var aV = document.getElementById("cancelstam");
			if (aV) {
				aV.innerHTML = "<a id=\"cancelstamwait\">Cancel Stamina Wait</a><br><br>";
				button = document.getElementById("cancelstamwait");
				if (button) {
					button.addEventListener("click", function() {
						if (boss.actions.stamina) {
							delete boss.actions.stamina;
							boss.save();
							location.reload();
						}
					},
					true);
				}
			}
		} else {
			aW.message = aT + "...Need " + Math.ceil(boss.max_health * (UserPrefs.hmin / 100)) + "...";
			aW.page = "fight";
			var aY = 120;
			if (boss.type == "Bulletproof") {
				aY = 107;
			}
			if (UserPrefs.insider) {
				aY = Math.ceil(aY * 0.9);
			}
			aW.time = Math.floor((new Date).getTime() / 1000) + (Math.ceil(boss.max_health * (UserPrefs.hmin / 100)) - boss.health) * aY;
			boss.actions.fighter = aW;
		}
	}
}
function aD(aT) {
	if (in_array_Int(aT, fightlistblock)) {
		return true;
	}
	return false;
}
K.drone = drone;
function drone(aT) {
	var aU = new Array;
	var aV;
	var aW;
	var aX = GM_getValue("PrevFights", "").split("|");
	var aY = GM_getValue("TooWeakToFight", "").split("|");
	var aZ = aT[0];
	var ba = false;
	var bb = new Array;
	bb.push(aT[1]);
	var bc = new Array;
	bc.push(aT[2]);
	var bd = new Array;
	bd.push(aT[3]);
	var be = new Array;
	be.push(aT[4]);
	var bf = new Array;
	bf.push(aT[5]);
	var bg = new Array;
	bg.push(aT[6]);
	var bh = new Array;
	bh.push(aT[7]);
	var bi = new Array,
	bj = new Array,
	bk = new Array,
	bl = new Array,
	bm = new Array,
	bn = new Array,
	bo = new Array;
	if (UserPrefs.maxlevel == 0) {
		aV = Infinity;
	} else {
		aV = parseInt(UserPrefs.maxlevel);
	}
	if (UserPrefs.maxmob == 0) {
		aW = Infinity;
	} else {
		aW = parseInt(UserPrefs.maxmob);
	}
	if (Page.c_page == "fight") {
		var bp = document.getElementById("app8743457343_content");
		if (bp) {
			var bq = bp.getElementsByTagName("TR");
			function br(bA) {
				for (var i = 1; i < bq.length; i++) {
					if (!bq[i].innerHTML.match(/<td colspan="4">/i)) {
						var bB = parseInt(bq[i].getElementsByTagName("TD")[1].innerHTML);
						var bC = parseInt(bq[i].getElementsByTagName("TD")[0].innerHTML.split("Level ")[1]);
						var bD = ColorCode(bB, bC, boss.mobsters, boss.level);
						var bE = bq[i].getElementsByTagName("A")[0].href.split("=")[1].split(/&/)[0];
						var bF = bq[i].getElementsByTagName("TD")[0].innerHTML.match(/online now/i);
						var bG = bq[i].getElementsByTagName("A")[0].innerHTML;
						var bH = parseInt(bq[i].getElementsByTagName("TD")[2].getElementsByTagName("DIV")[2].style.width);
						if (bH > 19 && (!in_array_Int(bE, aY))) {
							if (!in_array_Int(bE, Enforcer)) {
								if (!in_array_Int(bE, InYourMob)) {
									if (!UserPrefs.dronebycolorchoice || (bD == aZ)) {
										if (bB <= aW && bB >= parseInt(UserPrefs.minmob) || (bA && UserPrefs.DroneIgnoreMembersB)) {
											if (bC <= aV && bC >= parseInt(UserPrefs.minlevel) || (bA && UserPrefs.DroneIgnoreLevelB)) {
												if ((UserPrefs.droneIgnoreOnline && !bF || !UserPrefs.droneIgnoreOnline) || (bA && UserPrefs.DroneIgnoreOnlineB)) {
													if (!aD(parseInt(bE)) || (bA && UserPrefs.DroneIgnoreListB)) {
														if (AvailforFights(parseInt(bE), aX) || (bA && UserPrefs.DroneIgnoreTimesB)) {
															aU.push(i + ":" + bE + ":" + bG);
														} else {
															if (!bc.join().match(bG)) {
																bc.push("&nbsp;&nbsp;" + bG + "<br>");
															}
															if (!bA) {
																bm.push(i + ":" + bE + ":" + bG);
															}
														}
													} else {
														if (!bb.join().match(bG)) {
															bb.push("&nbsp;&nbsp;" + bG + "<br>");
														}
														if (!bA) {
															bl.push(i + ":" + bE + ":" + bG);
														}
													}
												} else {
													if (!bf.join().match(bG)) {
														bf.push("&nbsp;&nbsp;" + bG + "<br>");
													}
													if (!bA) {
														bk.push(i + ":" + bE + ":" + bG);
													}
												}
											} else {
												if (!bA) {
													bi.push(i + ":" + bE + ":" + bG);
												}
											}
										} else {
											if (!bA) {
												bj.push(i + ":" + bE + ":" + bG);
											}
										}
									}
								} else {
									if (!bA) {
										if (!bh[0].match(bG)) {
											bh.push("&nbsp;&nbsp;" + bG + "<br>");
										}
									}
								}
							}
						} else {
							if (!bA) {
								if (!bg[0].match(bG)) {
									bg.push("&nbsp;&nbsp;" + bG + "<br>");
								}
							}
						}
					}
				}
				if (UserPrefs.fighttarget) {
					function bI(bQ, bR) {
						if (bR.split(":")[1] != "") {
							for (var bS = 0; bS < bQ.length; bS++) {
								if (parseInt(bR.split(":")[1]) == parseInt(bQ[bS].split(":")[1])) {
									if (bR.split(":")[3] > 0) {
										if (Math.ceil((bR.split(":")[7] / bR.split(":")[3])) < parseInt(UserPrefs.droneMinExp)) {
											if (!bd.join().match(bQ[bS].split(":")[2])) {
												bd.push("&nbsp;&nbsp;" + bQ[bS].split(":")[2] + "<br>");
											}
											if (!bA) {
												bn.push(bQ[bS]);
											}
											bQ.splice(bS, 1);
											break;
										}
									}
								}
							}
						}
						return bQ;
					}
					function bJ(bQ, bR) {
						if (bR.split(":")[1] != "") {
							for (var bS = 0; bS < bQ.length; bS++) {
								if (parseInt(bR.split(":")[1]) == parseInt(bQ[bS].split(":")[1])) {
									if (bR.split(":")[3] > 0) {
										if (Math.ceil((dollars_to_int(bR.split(":")[4]) / bR.split(":")[3])) < parseInt(UserPrefs.droneMinMoney)) {
											if (!be.join().match(bQ[bS].split(":")[2])) {
												be.push("&nbsp;&nbsp;" + bQ[bS].split(":")[2] + "<br>");
											}
											if (!bA) {
												bo.push(bQ[bS]);
											}
											bQ.splice(bS, 1);
											break;
										}
									}
								}
							}
						}
						return bQ;
					}
					var bK = GM_getValue("fightlist", "").split("|");
					for (var mob = 0; mob < bK.length; mob++) {
						if (bK[mob] != "") {
							if (! (bA && UserPrefs.DroneIgnoreExpB)) {
								aU = bI(aU, bK[mob]);
							}
							if (! (bA && UserPrefs.DroneIgnoreMoneyB)) {
								aU = bJ(aU, bK[mob]);
							}
						}
					}
				}
				if (UserPrefs.PredictiveAvoid) {
					var bL = GM_getValue("PredictiveExpAvoid", "").split("|");
					for (var bM = 0; bM < aU.length; bM++) {
						if (in_array_Int(aU[bM].split(":")[1], bL)) {
							if (!bd.join().match(aU[bM].split(":")[2])) {
								bd.push("&nbsp;&nbsp;(P) " + aU[bM].split(":")[2] + "<br>");
							}
							if (!bA) {
								bn.push(aU[bM]);
							}
							aU.splice(bM, 1);
							bM--;
						}
					}
				}
				if (UserPrefs.droneTargetExp) {
					var bN = GM_getValue("TargetExp", "").split("|");
					for (var bM = 0; bM < aU.length; bM++) {
						if (in_array_Int(aU[bM].split(":")[1], bN)) {
							document.getElementById("targetlock").innerHTML = "<br><center><font color=\"green\">Targeting " + aU[bM].split(":")[2] + " (E)<br><br></font></center>";
							var bO = new Array;
							bO.push(aU[bM]);
							aU = bO;
							break;
						}
					}
				}
				if (UserPrefs.droneTargetMoney) {
					var bP = GM_getValue("TargetMoney", "").split("|");
					for (var bM = 0; bM < aU.length; bM++) {
						if (in_array_Int(aU[bM].split(":")[1], bP)) {
							document.getElementById("targetlock").innerHTML = "<br><center><font color=\"green\">Targeting " + aU[bM].split(":")[2] + " (M)<br><br></font></center>";
							var bO = new Array;
							bO.push(aU[bM]);
							aU = bO;
							break;
						}
					}
				}
			}
			br(ba);
			if (aU.length <= 0) {
				ba = true;
				br(ba);
			}
			if (aU.length > 0) {
				var bs = Math.floor(Math.random() * aU.length);
				var bt = bq[aU[bs].split(":")[0]].getElementsByTagName("input");
				var bu;
				for (var k = 0; k < bt.length; k++) {
					if (bt[k].name == "target_id") {
						boss.fights.target_id = bt[k].value;
					}
					if (bt[k].type == "submit") {
						bu = bt[k];
					}
				}
				boss.fights.target_name = aU[bs].split(":")[2];
				boss.fights.target_amount = 0;
				AddToPrevFights(aU[bs].split(":")[1], aX);
				var bv = new Array;
				if (bi.length > 0 && ba && UserPrefs.DroneIgnoreLevelB) {
					bv.push("<br>(Ignored level)&nbsp;");
				}
				if (bj.length > 0 && ba && UserPrefs.DroneIgnore) {
					bv.push("<br>(Ignored members)&nbsp;");
				}
				if (bb.length > 1 || (bb[0].length != "Blocked for <font color=red>losses</font>:<br>".length)) {
					if (bl.length > 0 && ba && UserPrefs.DroneIgnoreListB) {
						bv.push("<br>(Ignored)&nbsp;");
					} else {
						bv.push("<br>");
					}
					bv.push(bb.join(""));
				}
				if (bc.length > 1 || (bc[0].length != "Blocked for <font color=red>max fights</font>:<br>".length)) {
					if (bm.length > 0 && ba && UserPrefs.DroneIgnoreTimesB) {
						bv.push("<br>(Ignored)&nbsp;");
					} else {
						bv.push("<br>");
					}
					bv.push(bc.join(""));
				}
				if (bd.length > 1 || (bd[0].length != "Blocked for <font color=red>low exp</font>:<br>".length)) {
					if (bn.length > 0 && ba && UserPrefs.DroneIgnoreExpB) {
						bv.push("<br>(Ignored)&nbsp;");
					} else {
						bv.push("<br>");
					}
					bv.push(bd.join(""));
				}
				if (be.length > 1 || (be[0].length != "Blocked for <font color=red>low money</font>:<br>".length)) {
					if (bo.length > 0 && ba && UserPrefs.DroneIgnoreMoneyB) {
						bv.push("<br>(Ignored)&nbsp;");
					} else {
						bv.push("<br>");
					}
					bv.push(be.join(""));
				}
				if (bf.length > 1 || (bf[0].length != "Blocked for <font color=red>online</font>:<br>".length)) {
					if (bk.length > 0 && ba && UserPrefs.DroneIgnoreOnlineB) {
						bv.push("<br>(Ignored)&nbsp;");
					} else {
						bv.push("<br>");
					}
					bv.push(bf.join(""));
				}
				if (bg.length > 1 || (bg[0].length != "Blocked for <font color=red>too weak</font>:<br>".length)) {
					bv.push("<br>");
					bv.push(bg.join(""));
				}
				if (bh.length > 1 || (bh[0].length != "Blocked for <font color=red>your mob</font>:<br>".length)) {
					bv.push("<br>");
					bv.push(bh.join(""));
				}
				var bw = document.getElementById("fighter_drone");
				if (bw) {
					bw.innerHTML = bv.join("");
				}
				if (bu) {
					Timer.start(bu, "Attacking " + boss.fights.target_name + "...", B(UserPrefs.FDdelay, 1));
					l("Fighter drone{{ Starting timer to attack <a href='http{{//apps.facebook.com/mobwars/profile/?user_id=" + boss.fights.target_id + "'>" + boss.fights.target_name + "</a>...", 2);
				} else {
					var bx;
					if (Page.fight) {
						bx = Page.fight;
					} else {
						bx = GM_getValue("Lfight", "http://apps.facebook.com/mobwars/fight/");
					}
					Timer.start(bx, "Error attacking....", UserPrefs.timerdelay);
					l("Fighter drone{{ Error in fighter drone....was trying to attack <a href='http{{//apps.facebook.com/mobwars/profile/?user_id=" + boss.fights.target_id + "'>" + boss.fights.target_name + "</a>", 3);
				}
				return;
			} else {
				if (UserPrefs.dronebylesscolor) {
					var by = new Array;
					if (aZ == "yellow") {
						by[0] = "white";
						by[1] = bb.join("");
						by[2] = bc.join("");
						by[3] = bd.join("");
						by[4] = be.join("");
						by[5] = bf.join("");
						by[6] = bg.join("");
						by[7] = bh.join("");
						drone(by);
						return;
					} else if (aZ == "white") {
						by[0] = "green";
						by[1] = bb.join("");
						by[2] = bc.join("");
						by[3] = bd.join("");
						by[4] = be.join("");
						by[5] = bf.join("");
						by[6] = bg.join("");
						by[7] = bh.join("");
						drone(by);
						return;
					} else if (aZ == "green") {}
				}
			}
		}
	}
	var bz;
	if (parseInt(UserPrefs.maxfights) != 0) {
		bz = parseInt(UserPrefs.maxfights);
	} else {
		bz = Infinity;
	}
	var bv = new Array;
	if (bi.length > 0 && ba && UserPrefs.DroneIgnoreLevelB) {
		bv.push("<br>(Ignored level)&nbsp;");
	}
	if (bj.length > 0 && ba && UserPrefs.DroneIgnore) {
		bv.push("<br>(Ignored members)&nbsp;");
	}
	if (bb.length > 1 || (bb[0].length != "Blocked for <font color=red>losses</font>:<br>".length)) {
		if (bl.length > 0 && ba && UserPrefs.DroneIgnoreListB) {
			bv.push("<br>(Ignored)&nbsp;");
		} else {
			bv.push("<br>");
		}
		bv.push(bb.join(""));
	}
	if (bc.length > 1 || (bc[0].length != "Blocked for <font color=red>max fights</font>:<br>".length)) {
		if (bm.length > 0 && ba && UserPrefs.DroneIgnoreTimesB) {
			bv.push("<br>(Ignored)&nbsp;");
		} else {
			bv.push("<br>");
		}
		bv.push(bc.join(""));
	}
	if (bd.length > 1 || (bd[0].length != "Blocked for <font color=red>low exp</font>:<br>".length)) {
		if (bn.length > 0 && ba && UserPrefs.DroneIgnoreExpB) {
			bv.push("<br>(Ignored)&nbsp;");
		} else {
			bv.push("<br>");
		}
		bv.push(bd.join(""));
	}
	if (be.length > 1 || (be[0].length != "Blocked for <font color=red>low money</font>:<br>".length)) {
		if (bo.length > 0 && ba && UserPrefs.DroneIgnoreMoneyB) {
			bv.push("<br>(Ignored)&nbsp;");
		} else {
			bv.push("<br>");
		}
		bv.push(be.join(""));
	}
	if (bf.length > 1 || (bf[0].length != "Blocked for <font color=red>online</font>:<br>".length)) {
		if (bk.length > 0 && ba && UserPrefs.DroneIgnoreOnlineB) {
			bv.push("<br>(Ignored)&nbsp;");
		} else {
			bv.push("<br>");
		}
		bv.push(bf.join(""));
	}
	if (bg.length > 1 || (bg[0].length != "Blocked for <font color=red>too weak</font>:<br>".length)) {
		bv.push("<br>");
		bv.push(bg.join(""));
	}
	if (bh.length > 1 || (bh[0].length != "Blocked for <font color=red>your mob</font>:<br>".length)) {
		bv.push("<br>");
		bv.push(bh.join(""));
	}
	bv.push("<br><center><font color=red>Nobody available to fight that has a mob size between " + UserPrefs.minmob + " and " + aW + ", a level between " + UserPrefs.minlevel + " and " + aV + ", ");
	if (UserPrefs.dronebycolorchoice) {
		bv.push("has a color code of " + UserPrefs.dronebycolor + ", ");
		if (UserPrefs.dronebylesscolor) {
			bv.push("down thru green, ");
		}
	}
	bv.push("and you've attacked less than " + bz + ", as you have set in preferences.</font></center>");
	var bw = document.getElementById("fighter_drone");
	if (bw) {
		bw.innerHTML = bv.join("");
	}
	var bx;
	if (Page.fight) {
		bx = Page.fight;
	} else {
		bx = GM_getValue("Lfight", "http://apps.facebook.com/mobwars/fight/");
	}
	Timer.start(bx, "Reloading fight page...", B(UserPrefs.FDdelay, 1));
}
function AvailforFights(aT, aU) {
	var a = true;
	var aV;
	if (parseInt(UserPrefs.maxfights) != 0) {
		aV = parseInt(UserPrefs.maxfights);
	} else {
		return true;
	}
	for (var i = 0; i < aU.length; i++) {
		if (aT == aU[i].split(":")[0]) {
			if (parseInt(aU[i].split(":")[1]) >= aV) {
				a = false;
			}
			break;
		}
	}
	return a;
}
function AddToPrevFights(aT, aU) {
	var a = true;
	var aV = new Array;
	var aW = UserPrefs.dronememory;
	if (aU) {
		for (var i = 0; i < aU.length; i++) {
			if (aT == aU[i].split(":")[0]) {
				a = false;
				aV.push(aU[i].split(":")[0] + ":" + (parseInt(aU[i].split(":")[1]) + 1));
			} else {
				aV.push(aU[i]);
			}
		}
	} else {
		aV.push(aT + ":1");
		a = false;
	}
	if (a) {
		if (aV.length < aW) {
			aV.push(aT + ":1");
		} else {
			aV.splice(0, 1);
			aV.push(aT + ":1");
		}
	}
	GM_setValue("PrevFights", aV.join("|"));
}
function in_array_Int(aT, aU) {
	var a = false;
	var aV = aU.length;
	for (var i = 0; i < aV; i++) {
		if (parseInt(aT) == parseInt(aU[i])) {
			a = true;
			break;
		}
	}
	return a;
}
function aF_pI(aT) {
	var value = UserPrefs.fight_active;
	var aU = UserPrefs.maxmob;
	var aV = UserPrefs.minmob;
	var aW = UserPrefs.maxlevel;
	var aX = UserPrefs.minlevel;
	var aY = UserPrefs.maxfights;
	var aZ = UserPrefs.dronebycolor;
	var ba = UserPrefs.dronebycolorchoice;
	var bb = UserPrefs.enemydefensemodifier;
	var bc = UserPrefs.dronebylesscolor;
	var bd = new Array;
	bd.push("<div id=\"aF_toggle\" class=\"PrefMenuToggles\"><table width=\"100%\"><tr><td>Fighter Drone Preferences</td></tr></table></div><div id=\"aF_preferences\" style=\"display: none;\"><table width=\"100%\"><tr id=\"fightactive\"><td colspan=2>");
	bd.push("<label for=\"fight_active\">Automatically fight mobs when bounty hunting is off? </label>");
	bd.push("</td><td>");
	if (value) {
		bd.push("Yes <input type=\"radio\" name=\"fight_active\" value=\"1\" checked=\"checked\"/>");
		bd.push("No <input type=\"radio\" name=\"fight_active\" value=\"0\"/>");
	} else {
		bd.push("Yes <input type=\"radio\" name=\"fight_active\" value=\"1\"/>");
		bd.push("No <input type=\"radio\" name=\"fight_active\" value=\"0\" checked=\"checked\"/>");
	}
	bd.push("</td></tr>");
	value = UserPrefs.droneIgnoreOnline;
	bd.push("<tr id=\"droneignoreonline\"><td></td><td>");
	bd.push("<label for=\"droneIgnoreOnline\">Ignore mobs that are currently online? </label>");
	bd.push("</td><td>");
	if (value) {
		bd.push("Yes <input type=\"radio\" name=\"droneIgnoreOnline\" value=\"1\" checked=\"checked\"/>");
		bd.push("No <input type=\"radio\" name=\"droneIgnoreOnline\" value=\"0\"/>");
	} else {
		bd.push("Yes <input type=\"radio\" name=\"droneIgnoreOnline\" value=\"1\"/>");
		bd.push("No <input type=\"radio\" name=\"droneIgnoreOnline\" value=\"0\" checked=\"checked\"/>");
	}
	bd.push("</td></tr>");
	bd.push("<tr id=\"maxmob\"><td width=\"5%\"></td><td width=\"75%\">");
	bd.push("<label for=\"Max_Mob\">Max Mob Size: (0=unlimited)</label>");
	bd.push("</td><td>");
	bd.push("<input type=\"text\" name=\"Max_Mob\" maxlength=\"4\" size=\"4\" ");
	bd.push("value=\"" + aU + "\">");
	bd.push("</td></tr><tr id=\"minmob\"><td></td><td>");
	bd.push("<label for=\"Min_Mob\">Minimum Mob Size:</label>");
	bd.push("</td><td>");
	bd.push("<input type=\"text\" name=\"Min_Mob\" maxlength=\"4\" size=\"4\" ");
	bd.push("value=\"" + aV + "\">");
	bd.push("</td></tr><tr id=\"maxlevel\"><td width=\"5%\"></td><td width=\"75%\">");
	bd.push("<label for=\"Max_LMob\">Max Mob Level: (0 = unlimited)</label>");
	bd.push("</td><td>");
	bd.push("<input type=\"text\" name=\"Max_LMob\" maxlength=\"4\" size=\"4\" ");
	bd.push("value=\"" + aW + "\">");
	bd.push("</td></tr><tr id=\"minlevel\"><td></td><td>");
	bd.push("<label for=\"Min_LMob\">Minimum Mob Level:</label>");
	bd.push("</td><td>");
	bd.push("<input type=\"text\" name=\"Min_LMob\" maxlength=\"4\" size=\"4\" ");
	bd.push("value=\"" + aX + "\">");
	bd.push("</td></tr><tr id=\"bycolor\"><td colspan=2>");
	bd.push("<label for=\"dronebycolorchoice\">Automatically fight based on color codes, in addition to your entries above? </label>");
	bd.push("</td><td>");
	if (ba) {
		bd.push("Yes <input type=\"radio\" name=\"dronebycolorchoice\" value=\"1\" checked=\"checked\"/>");
		bd.push("No <input type=\"radio\" name=\"dronebycolorchoice\" value=\"0\"/>");
	} else {
		bd.push("Yes <input type=\"radio\" name=\"dronebycolorchoice\" value=\"1\"/>");
		bd.push("No <input type=\"radio\" name=\"dronebycolorchoice\" value=\"0\" checked=\"checked\"/>");
	}
	bd.push("</td></tr>");
	bd.push("<tr id=\"whatcolor\"><td></td><td>");
	bd.push("<label for=\"dronebycolor\">If by color code, which color: </label>");
	bd.push("</td><td><select name=\"dronebycolor\">");
	bd.push("<option value=\"green\"");
	if (UserPrefs.dronebycolor == "green") {
		bd.push(" selected=\"selected\"");
	}
	bd.push(">Green</option>");
	bd.push("<option value=\"white\"");
	if (UserPrefs.dronebycolor == "white") {
		bd.push(" selected=\"selected\"");
	}
	bd.push(">White</option>");
	bd.push("<option value=\"yellow\"");
	if (UserPrefs.dronebycolor == "yellow") {
		bd.push(" selected=\"selected\"");
	}
	bd.push(">Yellow</option>");
	bd.push("</select></td></tr><tr id=\"bylesscolor\"><td colspan=2>");
	bd.push("<label for=\"dronebylesscolor\">If none of that color is available, go for the potentially weaker? </label>");
	bd.push("</td><td>");
	if (bc) {
		bd.push("Yes <input type=\"radio\" name=\"dronebylesscolor\" value=\"1\" checked=\"checked\"/>");
		bd.push("No <input type=\"radio\" name=\"dronebylesscolor\" value=\"0\"/>");
	} else {
		bd.push("Yes <input type=\"radio\" name=\"dronebylesscolor\" value=\"1\"/>");
		bd.push("No <input type=\"radio\" name=\"dronebylesscolor\" value=\"0\" checked=\"checked\"/>");
	}
	bd.push("</td></tr><tr id=\"modifier\"><td width=\"5%\"></td><td width=\"75%\">");
	bd.push("<label for=\"defensemodifier\">ENEMY Defense Modifier to use in color coding:</label>");
	bd.push("</td><td>");
	bd.push("<input type=\"text\" name=\"defensemodifier\" maxlength=\"4\" size=\"4\" ");
	bd.push("value=\"" + bb + "\">");
	bd.push("</td></tr><tr id=\"dskillmodifier\"><td width=\"5%\"></td><td width=\"75%\">");
	bd.push("<label for=\"defskillmodifier\">ENEMY Defense Skill Percentage to use in color coding:</label>");
	bd.push("</td><td>");
	bd.push("<input type=\"text\" name=\"defskillmodifier\" maxlength=\"3\" size=\"3\" ");
	var be = UserPrefs.defskillmod;
	bd.push("value=\"" + be + "\">%");
	bd.push("</td></tr><tr id=\"maxfights\"><td colspan=2>");
	bd.push("<label for=\"Max_fights\">Max times to attack one mob: (0 = unlimited)</label>");
	bd.push("</td><td>");
	bd.push("<input type=\"text\" name=\"Max_fights\" maxlength=\"4\" size=\"4\" ");
	bd.push("value=\"" + aY + "\">");
	bd.push("</td></tr>");
	bd.push("<tr id=\"dronememory\"><td></td><td>");
	bd.push("<label for=\"Max_fightsMem\">Max mobs to remember:</label>");
	bd.push("</td><td>");
	bd.push("<input type=\"text\" name=\"Max_fightsMem\" maxlength=\"3\" size=\"3\" ");
	value = UserPrefs.dronememory;
	bd.push("value=\"" + value + "\">");
	bd.push("</td></tr>");
	value = UserPrefs.TooWeakMemory;
	bd.push("<tr id=\"droneTooWeakmemory\"><td colspan=2>");
	bd.push("<label for=\"Max_fightsWeakMem\">Remember how many \"too Weak to fight\" results:</label>");
	bd.push("</td><td>");
	bd.push("<input type=\"text\" name=\"Max_fightsWeakMem\" maxlength=\"3\" size=\"3\" ");
	bd.push("value=\"" + value + "\">");
	bd.push("</td></tr>");
	bd.push("<tr id=\"force\"><td colspan=2>");
	bd.push("<label for=\"fightforce\">Force Fighter Drone mode if at full stamina?</label>");
	bd.push("</td><td>");
	value = UserPrefs.fightforce;
	if (value) {
		bd.push("Yes <input type=\"radio\" name=\"fightforce\" value=\"1\" checked=\"checked\"/>");
		bd.push("No <input type=\"radio\" name=\"fightforce\" value=\"0\"/>");
	} else {
		bd.push("Yes <input type=\"radio\" name=\"fightforce\" value=\"1\"/>");
		bd.push("No <input type=\"radio\" name=\"fightforce\" value=\"0\" checked=\"checked\"/>");
	}
	forcemin = UserPrefs.forcemin;
	bd.push("</td></tr><tr id=\"minforce\"><td width=\"5%\"></td><td width=\"75%\">");
	bd.push("<label for=\"forcemin\">Force until stamina falls to what:</label>");
	bd.push("</td><td>");
	bd.push("<input type=\"text\" name=\"forcemin\" maxlength=\"4\" size=\"4\" ");
	bd.push("value=\"" + forcemin + "\">");
	bd.push("</td></tr>");
	bd.push("<tr id=\"dronetargetexp\"><td colspan=2>");
	bd.push("<label for=\"droneTargetExp\">Target mobs based on experience obtained in past fights?</label>");
	bd.push("</td><td>");
	value = UserPrefs.droneTargetExp;
	if (value) {
		bd.push("Yes <input type=\"radio\" name=\"droneTargetExp\" value=\"1\" checked=\"checked\"/>");
		bd.push("No <input type=\"radio\" name=\"droneTargetExp\" value=\"0\"/>");
	} else {
		bd.push("Yes <input type=\"radio\" name=\"droneTargetExp\" value=\"1\"/>");
		bd.push("No <input type=\"radio\" name=\"droneTargetExp\" value=\"0\" checked=\"checked\"/>");
	}
	bd.push("</td></tr>");
	bd.push("<tr id=\"dronetargetminexp\"><td width=\"5%\"></td><td width=\"75%\">");
	bd.push("<label for=\"droneTargetMinExp\">Attempt to attack a mob again if exp obtained is greater than:</label>");
	bd.push("</td><td>");
	bd.push("<input type=\"text\" name=\"droneTargetMinExp\" maxlength=\"3\" size=\"3\" ");
	value = UserPrefs.droneTargetMinExp;
	bd.push("value=\"" + value + "\">");
	bd.push("</td></tr>");
	bd.push("<tr id=\"dronetargetmoney\"><td colspan=2>");
	bd.push("<label for=\"droneTargetMoney\">Target mobs based on money obtained in past fights?</label>");
	bd.push("</td><td>");
	value = UserPrefs.droneTargetMoney;
	if (value) {
		bd.push("Yes <input type=\"radio\" name=\"droneTargetMoney\" value=\"1\" checked=\"checked\"/>");
		bd.push("No <input type=\"radio\" name=\"droneTargetMoney\" value=\"0\"/>");
	} else {
		bd.push("Yes <input type=\"radio\" name=\"droneTargetMoney\" value=\"1\"/>");
		bd.push("No <input type=\"radio\" name=\"droneTargetMoney\" value=\"0\" checked=\"checked\"/>");
	}
	bd.push("</td></tr>");
	bd.push("<tr id=\"dronetargetminmoney\"><td width=\"5%\"></td><td width=\"75%\">");
	bd.push("<label for=\"droneTargetMinMoney\">Attempt to attack a mob again if money obtained is greater then:</label>");
	bd.push("</td><td>");
	bd.push("<input type=\"text\" name=\"droneTargetMinMoney\" maxlength=\"3\" size=\"3\" ");
	value = UserPrefs.droneTargetMinMoney;
	bd.push("value=\"" + value + "\">");
	bd.push("</td></tr>");
	value = UserPrefs.PredictiveAvoid;
	bd.push("<tr id=\"predictiveavoid\"><td colspan=2>");
	bd.push("<label for=\"PredictiveAvoid\">Avoid mobs based on predicted possible experience?</label>");
	bd.push("</td><td>");
	if (value) {
		bd.push("Yes <input type=\"radio\" name=\"PredictiveAvoid\" value=\"1\" checked=\"checked\"/>");
		bd.push("No <input type=\"radio\" name=\"PredictiveAvoid\" value=\"0\"/>");
	} else {
		bd.push("Yes <input type=\"radio\" name=\"PredictiveAvoid\" value=\"1\"/>");
		bd.push("No <input type=\"radio\" name=\"PredictiveAvoid\" value=\"0\" checked=\"checked\"/>");
	}
	bd.push("</td></tr>");
	bd.push("<tr><td colspan=\"3\"><hr><center>The options in this section may, on occasion, noticeably increase the script<br>processing time required when on the fight page.</center><hr></td></td>");
	bd.push("<tr id=\"DroneTarget\"><td colspan=2>");
	bd.push("<label for=\"dronetarget\">Avoid mobs based on past fights? </label>");
	bd.push("</td><td>");
	value = UserPrefs.fighttarget;
	if (value) {
		bd.push("Yes <input type=\"radio\" name=\"dronetarget\" value=\"1\" checked=\"checked\"/>");
		bd.push("No <input type=\"radio\" name=\"dronetarget\" value=\"0\"/>");
	} else {
		bd.push("Yes <input type=\"radio\" name=\"dronetarget\" value=\"1\"/>");
		bd.push("No <input type=\"radio\" name=\"dronetarget\" value=\"0\" checked=\"checked\"/>");
	}
	bd.push("</td></tr>");
	bd.push("<tr id=\"DroneMinExp\"><td width=\"5%\"></td><td width=\"75%\">");
	bd.push("<label for=\"droneminexp\">Avoid if average experience received is less then:</label>");
	bd.push("</td><td>");
	bd.push("<input type=\"text\" name=\"droneminexp\" maxlength=\"3\" size=\"3\" ");
	value = UserPrefs.droneMinExp;
	bd.push("value=\"" + value + "\">");
	bd.push("</td></tr>");
	bd.push("<tr id=\"DroneMinMoney\"><td width=\"5%\"></td><td width=\"75%\">");
	bd.push("<label for=\"droneminmoney\">Avoid if average money received is less then: (Max 70000)</label>");
	bd.push("</td><td>");
	bd.push("<input type=\"text\" name=\"droneminmoney\" maxlength=\"5\" size=\"5\" ");
	value = UserPrefs.droneMinMoney;
	bd.push("value=\"" + value + "\">");
	bd.push("</td></tr>");
	bd.push("<tr id=\"DroneMark\"><td colspan=2>");
	bd.push("<label for=\"dronemark\">Mark mobs on the fight page with win/loss/exp? </label>");
	bd.push("</td><td>");
	value = UserPrefs.fightlistmark;
	if (value) {
		bd.push("Yes <input type=\"radio\" name=\"dronemark\" value=\"1\" checked=\"checked\"/>");
		bd.push("No <input type=\"radio\" name=\"dronemark\" value=\"0\"/>");
	} else {
		bd.push("Yes <input type=\"radio\" name=\"dronemark\" value=\"1\"/>");
		bd.push("No <input type=\"radio\" name=\"dronemark\" value=\"0\" checked=\"checked\"/>");
	}
	bd.push("</td></tr>");
	bd.push("<tr><td colspan=3><hr><center>If you are on the fight page, and your restrictions above block out all available targets, do you want to ignore some of your restrictions so that you have someone to fight?  If so, select, in the options below, which restrictions you want to to ignore.</center><hr></td></tr>");
	value = UserPrefs.DroneIgnoreLevelB;
	bd.push("<tr id=\"droneignorelevelb\"><td colspan=2>");
	bd.push("<label for=\"DroneIgnoreLevelB\">Ignore level restrictions?</label>");
	bd.push("</td><td>");
	if (value) {
		bd.push("Yes <input type=\"radio\" name=\"DroneIgnoreLevelB\" value=\"1\" checked=\"checked\"/>");
		bd.push("No <input type=\"radio\" name=\"DroneIgnoreLevelB\" value=\"0\"/>");
	} else {
		bd.push("Yes <input type=\"radio\" name=\"DroneIgnoreLevelB\" value=\"1\"/>");
		bd.push("No <input type=\"radio\" name=\"DroneIgnoreLevelB\" value=\"0\" checked=\"checked\"/>");
	}
	bd.push("</td></tr>");
	value = UserPrefs.DroneIgnoreMembersB;
	bd.push("<tr id=\"droneignoremembersb\"><td colspan=2>");
	bd.push("<label for=\"DroneIgnoreMembersB\">Ignore mob size restrictions?</label>");
	bd.push("</td><td>");
	if (value) {
		bd.push("Yes <input type=\"radio\" name=\"DroneIgnoreMembersB\" value=\"1\" checked=\"checked\"/>");
		bd.push("No <input type=\"radio\" name=\"DroneIgnoreMembersB\" value=\"0\"/>");
	} else {
		bd.push("Yes <input type=\"radio\" name=\"DroneIgnoreMembersB\" value=\"1\"/>");
		bd.push("No <input type=\"radio\" name=\"DroneIgnoreMembersB\" value=\"0\" checked=\"checked\"/>");
	}
	bd.push("</td></tr>");
	value = UserPrefs.DroneIgnoreOnlineB;
	bd.push("<tr id=\"droneignoreonlineb\"><td colspan=2>");
	bd.push("<label for=\"DroneIgnoreOnlineB\">Ignore online restriction?</label>");
	bd.push("</td><td>");
	if (value) {
		bd.push("Yes <input type=\"radio\" name=\"DroneIgnoreOnlineB\" value=\"1\" checked=\"checked\"/>");
		bd.push("No <input type=\"radio\" name=\"DroneIgnoreOnlineB\" value=\"0\"/>");
	} else {
		bd.push("Yes <input type=\"radio\" name=\"DroneIgnoreOnlineB\" value=\"1\"/>");
		bd.push("No <input type=\"radio\" name=\"DroneIgnoreOnlineB\" value=\"0\" checked=\"checked\"/>");
	}
	bd.push("</td></tr>");
	value = UserPrefs.DroneIgnoreListB;
	bd.push("<tr id=\"droneignorelistb\"><td colspan=2>");
	bd.push("<label for=\"DroneIgnoreListB\">Ignore fight blocking list?</label>");
	bd.push("</td><td>");
	if (value) {
		bd.push("Yes <input type=\"radio\" name=\"DroneIgnoreListB\" value=\"1\" checked=\"checked\"/>");
		bd.push("No <input type=\"radio\" name=\"DroneIgnoreListB\" value=\"0\"/>");
	} else {
		bd.push("Yes <input type=\"radio\" name=\"DroneIgnoreListB\" value=\"1\"/>");
		bd.push("No <input type=\"radio\" name=\"DroneIgnoreListB\" value=\"0\" checked=\"checked\"/>");
	}
	bd.push("</td></tr>");
	value = UserPrefs.DroneIgnoreTimesB;
	bd.push("<tr id=\"droneignoretimesb\"><td colspan=2>");
	bd.push("<label for=\"DroneIgnoreTimesB\">Ignore number of times you've attacked a mob?</label>");
	bd.push("</td><td>");
	if (value) {
		bd.push("Yes <input type=\"radio\" name=\"DroneIgnoreTimesB\" value=\"1\" checked=\"checked\"/>");
		bd.push("No <input type=\"radio\" name=\"DroneIgnoreTimesB\" value=\"0\"/>");
	} else {
		bd.push("Yes <input type=\"radio\" name=\"DroneIgnoreTimesB\" value=\"1\"/>");
		bd.push("No <input type=\"radio\" name=\"DroneIgnoreTimesB\" value=\"0\" checked=\"checked\"/>");
	}
	bd.push("</td></tr>");
	value = UserPrefs.DroneIgnoreExpB;
	bd.push("<tr id=\"droneignoreexpb\"><td colspan=2>");
	bd.push("<label for=\"DroneIgnoreExpB\">Ignore minimum experience restriction?</label>");
	bd.push("</td><td>");
	if (value) {
		bd.push("Yes <input type=\"radio\" name=\"DroneIgnoreExpB\" value=\"1\" checked=\"checked\"/>");
		bd.push("No <input type=\"radio\" name=\"DroneIgnoreExpB\" value=\"0\"/>");
	} else {
		bd.push("Yes <input type=\"radio\" name=\"DroneIgnoreExpB\" value=\"1\"/>");
		bd.push("No <input type=\"radio\" name=\"DroneIgnoreExpB\" value=\"0\" checked=\"checked\"/>");
	}
	bd.push("</td></tr>");
	value = UserPrefs.DroneIgnoreMoneyB;
	bd.push("<tr id=\"droneignoremoneyb\"><td colspan=2>");
	bd.push("<label for=\"DroneIgnoreMoneyB\">Ignore minimum money restriction?</label>");
	bd.push("</td><td>");
	if (value) {
		bd.push("Yes <input type=\"radio\" name=\"DroneIgnoreMoneyB\" value=\"1\" checked=\"checked\"/>");
		bd.push("No <input type=\"radio\" name=\"DroneIgnoreMoneyB\" value=\"0\"/>");
	} else {
		bd.push("Yes <input type=\"radio\" name=\"DroneIgnoreMoneyB\" value=\"1\"/>");
		bd.push("No <input type=\"radio\" name=\"DroneIgnoreMoneyB\" value=\"0\" checked=\"checked\"/>");
	}
	bd.push("</td></tr>");
	bd.push("</table></div>");
	var bf = document.createElement("div");
	bd.push("<hr>");
	if (bf) {
		bf.innerHTML = bd.join("\n");
	}
	var bg = document.getElementById("PrefStuff");
	if (bg) {
		bg.appendChild(bf);
	}
	var button = document.getElementById("aF_toggle");
	if (button) {
		button.addEventListener("click", function() {
			var bh = document.getElementById("aF_preferences");
			if (bh) {
				if (bh.style.display == "none") {
					bh.style.display = "block";
				} else {
					bh.style.display = "none";
				}
			}
		},
		true);
	}
}
J.aF_pI = aF_pI;
J.aF_pH = aF_pH;
function aF_pH(aT, UserPrefs) {
	var aU = aT.elements.namedItem("fight_active");
	var aV = parseInt(aT.elements.namedItem("Max_Mob").value);
	var aW = parseInt(aT.elements.namedItem("Min_Mob").value);
	var aX = parseInt(aT.elements.namedItem("Max_fights").value);
	var aY = parseInt(aT.elements.namedItem("Max_LMob").value);
	var aZ = parseInt(aT.elements.namedItem("Min_LMob").value);
	var ba = aT.elements.namedItem("dronebycolorchoice");
	var bb = aT.elements.namedItem("dronebylesscolor");
	var bc = parseInt(aT.elements.namedItem("defensemodifier").value);
	var bd = parseInt(aT.elements.namedItem("forcemin").value);
	var be = aT.elements.namedItem("fightforce");
	var bf = false;
	var bg = aT.elements.namedItem("dronebycolor");
	if (UserPrefs.dronebycolor != bg.options[bg.selectedIndex].value) {
		UserPrefs.dronebycolor = bg.options[bg.selectedIndex].value;
		bf = true;
	}
	if (UserPrefs.dronebylesscolor != bb.checked) {
		UserPrefs.dronebylesscolor = bb.checked;
		bf = true;
	}
	if (UserPrefs.fightforce != be.checked) {
		UserPrefs.fightforce = be.checked;
		bf = true;
	}
	if (UserPrefs.forcemin != bd) {
		UserPrefs.forcemin = bd;
		if (UserPrefs.forcemin >= boss.max_stamina) {
			UserPrefs.forcemin = boss.max_stamina - 1;
		}
		bf = true;
	}
	if (UserPrefs.dronebycolorchoice != ba.checked) {
		UserPrefs.dronebycolorchoice = ba.checked;
		bf = true;
	}
	if (UserPrefs.fight_active != aU.checked) {
		if (boss.actions.fighter) {
			delete boss.actions.fighter;
		}
		UserPrefs.fight_active = aU.checked;
		bf = true;
	}
	aU = parseInt(aT.elements.namedItem("droneminexp").value);
	if (isNaN(aU) || (aU < 0)) {
		alert("Invalid input for Figher Drone minimum experience (Fighter Drone Preferences).  Preferences not updated");
		w = true;
	} else {
		if (UserPrefs.droneMinExp != aU) {
			GM_setValue("PredictiveExpAvoid", "");
			UserPrefs.droneMinExp = aU;
			bf = true;
		}
	}
	aU = aT.elements.namedItem("PredictiveAvoid");
	if (UserPrefs.PredictiveAvoid != aU.checked) {
		UserPrefs.PredictiveAvoid = aU.checked;
		bf = true;
	}
	aU = parseInt(aT.elements.namedItem("droneTargetMinExp").value);
	if (isNaN(aU) || (aU < 0)) {
		alert("Invalid input for Target Figher Drone minimum experience (Fighter Drone Preferences).  Preferences not updated");
		w = true;
	} else {
		if (UserPrefs.droneTargetMinExp != aU || (aU < UserPrefs.droneMinExp)) {
			if (aU < UserPrefs.droneMinExp) {
				aU = UserPrefs.droneMinExp;
			}
			GM_setValue("TargetExp", "");
			UserPrefs.droneTargetMinExp = aU;
			bf = true;
		}
	}
	aU = parseInt(aT.elements.namedItem("Max_fightsMem").value);
	if (isNaN(aU) || (aU < 0)) {
		alert("Invalid input for Figher Drone max fight memory (Fighter Drone Preferences).  Preferences not updated");
		w = true;
	} else {
		if (UserPrefs.dronememory != aU) {
			UserPrefs.dronememory = aU;
			bf = true;
		}
	}
	aU = parseInt(aT.elements.namedItem("Max_fightsWeakMem").value);
	if (isNaN(aU) || (aU < 0)) {
		alert("Invalid input for Figher Drone max fight memory (Fighter Drone Preferences).  Preferences not updated");
		w = true;
	} else {
		if (UserPrefs.TooWeakMemory != aU) {
			UserPrefs.TooWeakMemory = aU;
			var bh = GM_getValue("TooWeakToFight", "").split("|");
			if (bh.length > UserPrefs.TooWeakMemory) {
				bh.splice(0, (bh.length - UserPrefs.TooWeakMemory));
			}
			GM_setValue("TooWeakToFight", bh.join("|"));
			bf = true;
		}
	}
	aU = parseInt(aT.elements.namedItem("droneminmoney").value);
	if (isNaN(aU) || aU < 0 || (aU > 70000)) {
		alert("Invalid input for Figher Drone minimum money (Fighter Drone Preferences).  Preferences not updated");
		w = true;
	} else {
		if (UserPrefs.droneMinMoney != aU) {
			UserPrefs.droneMinMoney = aU;
			bf = true;
		}
	}
	aU = parseInt(aT.elements.namedItem("droneTargetMinMoney").value);
	if (isNaN(aU) || aU < 0 || (aU > 70000)) {
		alert("Invalid input for Target Figher Drone minimum money (Fighter Drone Preferences).  Preferences not updated");
		w = true;
	} else {
		if (UserPrefs.droneTargetMinMoney != aU || (aU < UserPrefs.droneMinMoney)) {
			if (aU < UserPrefs.droneMinMoney) {
				aU = UserPrefs.droneMinMoney;
			}
			GM_setValue("TargetMoney", "");
			UserPrefs.droneTargetMinMoney = aU;
			bf = true;
		}
	}
	aU = aT.elements.namedItem("dronetarget");
	if (UserPrefs.fighttarget != aU.checked) {
		UserPrefs.fighttarget = aU.checked;
		bf = true;
	}
	aU = aT.elements.namedItem("DroneIgnoreLevelB");
	if (UserPrefs.DroneIgnoreLevelB != aU.checked) {
		UserPrefs.DroneIgnoreLevelB = aU.checked;
		bf = true;
	}
	aU = aT.elements.namedItem("DroneIgnoreMembersB");
	if (UserPrefs.DroneIgnoreMembersB != aU.checked) {
		UserPrefs.DroneIgnoreMembersB = aU.checked;
		bf = true;
	}
	aU = aT.elements.namedItem("DroneIgnoreOnlineB");
	if (UserPrefs.DroneIgnoreOnlineB != aU.checked) {
		UserPrefs.DroneIgnoreOnlineB = aU.checked;
		bf = true;
	}
	aU = aT.elements.namedItem("DroneIgnoreListB");
	if (UserPrefs.DroneIgnoreListB != aU.checked) {
		UserPrefs.DroneIgnoreListB = aU.checked;
		bf = true;
	}
	aU = aT.elements.namedItem("DroneIgnoreTimesB");
	if (UserPrefs.DroneIgnoreTimesB != aU.checked) {
		UserPrefs.DroneIgnoreTimesB = aU.checked;
		bf = true;
	}
	aU = aT.elements.namedItem("DroneIgnoreExpB");
	if (UserPrefs.DroneIgnoreExpB != aU.checked) {
		UserPrefs.DroneIgnoreExpB = aU.checked;
		bf = true;
	}
	aU = aT.elements.namedItem("DroneIgnoreMoneyB");
	if (UserPrefs.DroneIgnoreMoneyB != aU.checked) {
		UserPrefs.DroneIgnoreMoneyB = aU.checked;
		bf = true;
	}
	aU = aT.elements.namedItem("droneIgnoreOnline");
	if (UserPrefs.droneIgnoreOnline != aU.checked) {
		UserPrefs.droneIgnoreOnline = aU.checked;
		bf = true;
	}
	aU = aT.elements.namedItem("droneTargetMoney");
	if (UserPrefs.droneTargetMoney != aU.checked) {
		UserPrefs.droneTargetMoney = aU.checked;
		bf = true;
	}
	aU = aT.elements.namedItem("droneTargetExp");
	if (UserPrefs.droneTargetExp != aU.checked) {
		UserPrefs.droneTargetExp = aU.checked;
		bf = true;
	}
	aU = aT.elements.namedItem("dronemark");
	if (UserPrefs.fightlistmark != aU.checked) {
		UserPrefs.fightlistmark = aU.checked;
		bf = true;
	}
	aU = aT.elements.namedItem("defskillmodifier").value;
	if (UserPrefs.defskillmod != aU) {
		UserPrefs.defskillmod = aU;
		bf = true;
	}
	if (UserPrefs.fight_active == false) {
		UserPrefs.override = false;
	}
	if (UserPrefs.minmob != aW) {
		UserPrefs.minmob = aW;
		bf = true;
	}
	if (UserPrefs.maxfights != aX) {
		UserPrefs.maxfights = aX;
		bf = true;
	}
	if (UserPrefs.maxmob != aV) {
		UserPrefs.maxmob = aV;
		bf = true;
	}
	if (UserPrefs.minlevel != aZ) {
		UserPrefs.minlevel = aZ;
		bf = true;
	}
	if (UserPrefs.maxlevel != aY) {
		UserPrefs.maxlevel = aY;
		bf = true;
	}
	var bh;
	if (UserPrefs.maxmob == 0) {
		bh = Infinity;
	} else {
		bh = UserPrefs.maxmob;
	}
	if (bh < UserPrefs.minmob) {
		UserPrefs.maxmob = UserPrefs.minmob;
		bf = true;
	}
	if (UserPrefs.enemydefensemodifier != bc) {
		UserPrefs.enemydefensemodifier = bc;
		bf = true;
	}
	if (UserPrefs.maxlevel == 0) {
		bh = Infinity;
	} else {
		bh = UserPrefs.maxlevel;
	}
	if (bh < UserPrefs.minlevel) {
		UserPrefs.maxlevel = UserPrefs.minlevel;
		bf = true;
	}
	return bf;
}
function aE() {
	if (document.body.innerHTML.match(/New York City City Jail/) || document.location.href == "http://www.facebook.com/mobwars/jail/") {}
}
function aF() {
	var aT = document.getElementById("queue");
	if (aT) {
		aT.innerHTML = "";
		for (var i in boss.actions) {
			if (i != "refresh") {
				aT.innerHTML += "<br><span id=\"" + i + "\"></span>";
			}
		}
		for (var k in boss.actions) {
			if (k != "refresh") {
				var aU = new Date(parseFloat(boss.actions[k].time) * 1000);
				var aV = aU.toTimeString() + "";
				var aW = document.getElementById(k);
				if (aW) {
					aW.innerHTML = " " + boss.actions[k].message + "<br>&nbsp&nbsp&nbsp at " + aV.substr(0, 8);
				}
			}
		}
	}
}
var aG, aH = document.title,
aI = 19,
aJ = 0;
function notify() {
	aJ = 0;
	aG = setInterval(function() {
		if (aJ < aI) {
			aJ++;
			document.title = (document.title.indexOf("ATTENTION NEEDED! ") != -1) ? aH: "ATTENTION NEEDED! " + aH;
		} else {
			clearInterval(aG);
		}
	},
	600);
}
var aK, cur_f = 0;
function aL(aT, aU) {
	cur_f = 0;
	aK = setInterval(function() {
		if (cur_f < aU) {
			cur_f++;
			setTimeout("try {var jobj = document.getElementById('" + aT + "');" + "if (jobj.Play) {jobj.Play();} " + "else if (jobj.play) {jobj.play();} else {throw 'cant beep';}}" + "catch(ex) {window.Packages.java.awt.Toolkit.getDefaultToolkit().beep();}", 1);
		} else {
			clearInterval(aK);
		}
	},
	1600);
}
var snds = [["Java - Beep", ""], ["Midi - Note", ""], ["Flash - Ambient 1", "MWAutoHelper/AlertSounds/AmbientSoundScape1/alert.html"], ["Flash - Ambient 2", "MWAutoHelper/AlertSounds/AmbientSoundScape2/alert.html"], ["Flash - Pop Rock 1", "MWAutoHelper/AlertSounds/PopRock1/alert.html"], ["Flash - Pop Rock 2", "MWAutoHelper/AlertSounds/PopRock2/alert.html"], ["Flash - Techno 1", "MWAutoHelper/AlertSounds/Techno1/alert.html"], ["Flash - Techno 2", "MWAutoHelper/AlertSounds/Techno2/alert.html"]];
function alertSound(aT, aU, aV) {
	if (UserPrefs.alertsound || aV) {
		var aW = document.getElementById("alertSound2");
		if (!aW) {
			var aX = document.createElement("style");
			if (aX) {
				aX.type = "text/css";
			}
			aW = document.createElement("div");
			if (aW) {
				aW.id = "alertSound2";
			}
			if (aX) {
				aX.innerHTML = "#alertSound2 { position: absolute; top: 0px; left: 0px; display: block; visibility: hidden; }";
				var aY = document.getElementsByTagName("head");
				if (aY) {
					aY = aY[0];
				}
				if (aY) {
					aY.appendChild(aX);
				}
			}
			if (document) {
				if (document.body) {
					if (aW) {
						document.body.insertBefore(aW, document.body.lastChild);
					}
				}
			}
		}
		if (aT.match("Flash")) {
			var aZ = "http://fbmaah.comli.com/";
			for (var i = 0; i < snds.length; i++) {
				if (aT == snds[i][0]) {
					setTimeout(function() {
						if (aW) {
							aW.innerHTML = "<iframe src=\"" + aZ + snds[i][1] + "\"></iframe>";
						}
					},
					1500);
					break;
				}
			}
		} else if (aT.match("Java")) {
			var ba = document.createElement("embed");
			if (ba) {
				ba.setAttribute("id", "javabeep");
				ba.setAttribute("src", "success.wav");
				ba.setAttribute("width", "1");
				ba.setAttribute("height", "1");
				ba.setAttribute("type", "application/x-java-applet;version=1.4");
				ba.setAttribute("initial_focus", "false");
				ba.setAttribute("codebase", "http://");
				ba.setAttribute("archive", "ltSounds.jar");
				ba.setAttribute("code", "SndPlay");
				if (aW) {
					ba = aW.appendChild(ba);
				}
				aL("javabeep", aU);
			}
		} else if (aT.match("Midi")) {
			var ba = document.createElement("embed");
			if (ba) {
				ba.setAttribute("id", "midinote");
				ba.setAttribute("src", "data:audio/midi;base64,TVRoZAAAAAYAAAABAeBNVHJrAAAAJQD%2FUQMHoSAA%2F1kCAwAA%2F1gEBAIwCADAKgCQUWmDX4BRAAH%2FLwA%3D");
				ba.setAttribute("width", "1");
				ba.setAttribute("height", "1");
				ba.setAttribute("autostart", "false");
				ba.setAttribute("loop", "false");
				if (aW) {
					ba = aW.appendChild(ba);
				}
				aL("midinote", aU);
			}
		}
	}
}
function aM() {
	var aT = Utils.getElementsByClassName("cap");
	if (aT.length || document.body.innerHTML.search(/cap_value/i) > -1 || (document.body.innerHTML.search(/cap_answer/i) > -1)) {
		E.Retries += 1;
		GM_setValue("CaptchaSolver", E.toSource());
		var aU;
		var aV;
		if (aT.length) {
			aV = Utils.getElementsByXPath(".//input[@name=\"cap_answer\"]")[0];
		} else {
			aV = Utils.getElementsByXPath(".//input[@name=\"cap_value\"]")[0];
		}
		var aW = aV.parentNode.parentNode.getElementsByTagName("img")[0];
		boss.captcha_caught_src = aW.src;
		boss.save();
		var aX;
		if (aW.src.match("numeric")) {
			aX = "num";
		} else {
			aX = "letters";
		}
		if (E.UseIt) {
			E.stime = (new Date).getTime();
			aV.disabled = true;
			if (g) {
				var aY = new Image;
				aY.addEventListener("load", function() {
					SendImage(SB_convertImgToBase64Format(aY), aV, aX);
				},
				true);
				aY.src = aW.src;
			} else {
				ak(aW, aV, aX);
			}
		} else {
			var aZ = document.getElementById("MobWarCaptcha");
			if (UserPrefs.ShowCaptcha) {
				if (aZ) {
					aZ.innerHTML = "<center><img src=\"" + boss.captcha_caught_src + "\" id=\"MobWarCaptchaImg\" width=100 height=50></center>";
				}
			}
			var ba = document.getElementById("scripterror");
			if (ba) {
				ba.innerHTML = "";
			}
			if (!UserPrefs.PromptAlert) {
				notify();
				alertSound(UserPrefs.sndid, UserPrefs.sndrepeat);
				CaptchaInput.init(aV, "Possible Captcha Error -- Need Human attention!!", aX);
			} else {
				aU = prompt("Possible Captcha Error -- Need Human attention!!");
				if (aU) {
					aV.value = aU.substr(0, UserPrefs.captchalength);
					Utils.getElementsByXPath("input[@type=\"submit\"]", aV.parentNode)[0].click();
				}
			}
		}
		I = true;
	} else {
		E.Retries = 0;
		GM_setValue("CaptchaSolver", E.toSource());
	}
}
CaptchaInput = new Object;
CaptchaInput.init = function(aT, aU, aV) {
	if (aV == "num") {
		if (UserPrefs.captchatimeoutlength != 0) {
			var aW;
			if (Page.homelink) {
				aW = Page.homelink;
			} else {
				aW = GM_getValue("Lhomelink", "http://apps.facebook.com/mobwars/");
			}
			Timer.start(aW, "Waiting for user input....<br>Canceling Bounty hunting if not answered", (UserPrefs.captchatimeoutlength * 60));
			setTimeout(function() {
				UserPrefs.hitlist_active = false;
				GM_setValue("UserPrefs", UserPrefs.toSource());
			},
			(((UserPrefs.captchatimeoutlength * 60) * 1000) - 100));
		}
	} else if (aV == "MWcaptcha") {
		if (UserPrefs.captchatimeoutlength != 0) {
			var aW;
			var aX = Page.c_page;
			if (aX.length == 0) {
				aX = "homelink";
			}
			if (Page[aX]) {
				aW = Page[aX];
			} else {
				aW = GM_getValue("L" + aX, "http://apps.facebook.com/mobwars/");
			}
			Timer.start(aW, "MWCaptcha failue.<br>Waiting for user input....<br>Reloading if not answered", (UserPrefs.captchatimeoutlength * 60));
		}
	} else if (aV == "nIP_TAKEN" || aV == "nUSERNAME" || aV == "nPASSWORD" || aV == "nPOINTS" || aV == "nOFFLINE" || (aV == "nSUSPEND")) {
		if (UserPrefs.captchatimeoutlength != 0) {
			var aW;
			if (Page.homelink) {
				aW = Page.homelink;
			} else {
				aW = GM_getValue("Lhomelink", "http://apps.facebook.com/mobwars/");
			}
			Timer.start(aW, "MWCaptcha failed with " + aV.substr(1) + " (unrecoverable)...<br>Waiting for user input....<br>Canceling Bounty hunting if not answered", (UserPrefs.captchatimeoutlength * 60));
			setTimeout(function() {
				UserPrefs.hitlist_active = false;
				GM_setValue("UserPrefs", UserPrefs.toSource());
			},
			(((UserPrefs.captchatimeoutlength * 60) * 1000) - 100));
		}
	}
	this.answer = aT;
	this.div = document.createElement("div");
	this.div.className = "Captcha_Check";
	var aY = ".Captcha_Check {display: block; text-align: center; position: fixed; z-index: 97; right: 208px; top: 200px; overflow: auto; background-color: white; border: 1px solid black; padding: 10px; width: 400px; min-height: 50px}";
	GM_addStyle(aY);
	this.div.innerHTML = "<center><span id=\"Captcha\"></span><hr><h2>" + aU + "</h2></center>";
	this.rule = document.createElement("hr");
	this.rule.id = "cap_rule";
	this.div.appendChild(this.rule);
	this.form = document.createElement("form");
	this.form.action = "";
	this.form.method = "";
	this.form.id = "cap_AH_input";
	this.div.appendChild(this.form);
	this.input = document.createElement("div");
	this.input.innerHTML = "<label for=\"CaptchaInput\">Please enter the captcha answer here, or directly on the page.</label><br><input type=\"text\" name=\"CaptchaInput\" maxlength=\"" + UserPrefs.captchalength + "\" size=\"" + UserPrefs.captchalength + "\" value=\"\"/><br><br>";
	if (UserPrefs.ShowCaptcha) {
		this.input.innerHTML += "<img src=\"" + boss.captcha_caught_src + "\" id=\"MWCaptchaImg\" width=100 height=50><br><br>";
	}
	if (UserPrefs.alertsound) {
		this.input.innerHTML += "<a id=\"stopit\">Stop Sound</a><br><br>";
	}
	this.form.appendChild(this.input);
	this.button = document.createElement("button");
	this.button.type = "button";
	this.button.id = "cap_AH_submit";
	this.button.innerHTML = "Submit Answer";
	this.form.appendChild(this.button);
	document.getElementsByTagName("body")[0].appendChild(this.div);
	this.form.elements.namedItem("CaptchaInput").focus();
	this.button.addEventListener("click", this.eventListener(), true);
	this.form.addEventListener("submit", this.eventListener(), true);
	var aZ = document.getElementById("stopit");
	if (aZ) {
		aZ.addEventListener("click", function() {
			cur_f = Infinity;
			var ba = document.getElementById("alertSound2");
			if (ba) {
				ba.parentNode.removeChild(ba);
			}
		},
		true);
	}
};
function aN(aT) {
	var aU = document.getElementById("processtime");
	if (aU) {
		aU.innerHTML = "<br>Time: " + ((new Date).getTime() - aT);
	}
}
CaptchaInput.eventListener = function() {
	var aT = this;
	return function(aU) {
		aU.preventDefault();
		var aV = aT.form.elements.namedItem("CaptchaInput").value;
		aT.div.style.display = "none";
		cur_f = Infinity;
		var aW = document.getElementById("alertSound2");
		if (aW) {
			aW.parentNode.removeChild(aW);
		}
		aT.answer.disabled = false;
		if (aV) {
			aT.answer.value = aV.substr(0, UserPrefs.captchalength);
			Utils.getElementsByXPath("input[@type=\"submit\"]", aT.answer.parentNode)[0].click();
		}
	};
};
var boss;
var UserPrefs;
var itemlist;
var GodFatherL;
function MainStuff(aT) {
	var aU = (new Date).getTime();
	for (var aV in z) {
		clearTimeout(z[aV]);
	}
	var button = document.getElementById("Mobster");
	if (button) {
		button.parentNode.removeChild(button);
	}
	button = document.getElementById("alertSound2");
	if (button) {
		button.parentNode.removeChild(button);
	}
	A = false;
	var aW = document.getElementsByTagName("iframe");
	for (var i = 0; i < aW.length; i++) {
		aW[i].parentNode.removeChild(aW[i]);
	}
	var aX;
	InYourMob = GM_getValue("InYourMob", "").split("|");
	hitlistblock = GM_getValue("hitlistblock", "").split(",");
	hitlisttimeblock = GM_getValue("hitlisttimeblock", "").split(",");
	fightlistblock = GM_getValue("fightlistblock", "").split(",");
	try {
		Page.init();
	} catch(aY) {}
	try {
		boss = new V;
		UserPrefs = eval(GM_getValue("UserPrefs", "({})"));
		if (boss.preferences.timerdelay) {
			UserPrefs = boss.preferences;
			GM_setValue("UserPrefs", UserPrefs.toSource());
			delete boss.preferences;
		}
		aA();
		itemlist = new Z;
		GodFatherL = new aC;
		boss.updateData();
		M();
		if (UserPrefs.blockpresence) {
			var p = document.getElementById("presence");
			if (p) {
				p.parentNode.removeChild(p);
			}
		}
	} catch(aY) {
		aX = aY;
	}
	try {
		N.init();
	} catch(aY) {}
	try {
		az(aT);
	} catch(aY) {
		var ba = document.getElementById("scripterror");
		if (ba) {
			ba.innerHTML = "Error grabbing fight information: " + aY.lineNumber + ": " + aY.message + "<br /><br />";
		}
	}
	boss.fights.target_id = "";
	boss.fights.bounty_id = "";
	boss.fights.target_name = "";
	if (aX) {
		var bb = document.getElementById("scripterror");
		if (bb) {
			bb.innerHTML = "Error in module 'base' on line " + aX.lineNumber + ": " + aX.message + "<br /><br />";
		}
	}
	if (document.body.innerHTML.match(/The letters you entered do not match!/) || document.body.innerHTML.match(/The numbers you entered do not match!/)) {
		if (E.UseIt && E.sysAnswer) {
			if ((E.rtime - E.stime) > 12000) {
				ReportFailure("true");
			} else {
				ReportFailure("false");
			}
		}
	}
	al();
	boss.captcha_caught_src = "";
	boss.save();
	if (document.location.href.match(/#stop/)) {
		var button = document.getElementById("disable_button");
		if (button) {
			button.innerHTML = "<font color=red>TAB DISABLED</font>";
		}
		if (button) {
			button.addEventListener("click", function() {
				location.href = location.href.replace(/#stop/, "");
			},
			true);
		}
		m();
		I = true;
	} else {
		var button = document.getElementById("disable_button");
		if (button) {
			button.addEventListener("click", function() {
				location.href = location.href + "#stop";
				location.reload();
			},
			true);
		}
	}
	aM();
	aE();
	for (var j = 0; j < modules.length; j++) {
		if (K[modules[j] + "_e"]) {
			try {
				now = Date.now();
				K[modules[j] + "_e"]();
			} catch(aY) {
				var bc = document.getElementById("scripterror");
				if (bc) {
					bc.innerHTML = "Error in module '" + modules[i] + "' on line " + aY.lineNumber + ": " + aY.message + "<br /><br />";
				}
			}
		}
	}
	if (UserPrefs.refreshdelay >= 60) {
		var bd = new Object;
		if (boss.actions.refresh) {
			delete boss.actions.refresh;
		}
		bd.message = "Inactivity Refresh....";
		bd.page = Page.c_page;
		if (Page.c_page == "profile") {
			if (Page.c_params.user_id != "" && Page.c_params.user_id != undefined && (Page.c_params.user_id != Page.c_user)) {
				bd.url_params = "user_id=" + Page.c_params.user_id;
			}
		}
		bd.func = "";
		bd.params = [];
		bd.time = Math.floor((new Date).getTime() / 1000) + UserPrefs.refreshdelay;
		boss.actions.refresh = bd;
	}
	if (document.location.href.match(/www.facebook.com\/common\/error.html/i) || document.location.href.match(/apps.facebook.com\/common\/error.html/i)) {
		if (UserPrefs.errorreload) {
			if (document) {
				if (document.body) {
					document.body.innerHTML += "<br><br><br><br><br>RELOADING MobWars in 5 seconds.....<br><font size=1>(As you have set in preferences)";
				}
			}
			var be;
			if (Page.homelink) {
				be = Page.homelink;
			} else {
				be = GM_getValue("Lhomelink", "http://apps.facebook.com/mobwars/");
			}
			Timer.start(be, "Reloading Mob Wars......", 5);
		}
		I = true;
	}
	if (document.location.href.match(/apps.facebook.com\/mobwars\/fight\/hitlist/i)) {
		if (document) {
			if (document.body) {
				document.body.innerHTML = "<center><font size=2><br><br><br><br><br>RELOADING Mob Wars in 5 seconds.....<br></font><font size=1>(Mob Wars error)</font></center>";
			}
		}
		var be;
		if (Page.hitlist) {
			be = Page.hitlist;
		} else {
			be = GM_getValue("Lhitlist", "http://apps.facebook.com/mobwars/hitlist/");
		}
		Timer.start(be, "Reloading Mob Wars Hitlist......", 5);
		I = true;
	}
	if (document.location.href.match(/apps.facebook.com\/mobwars\/hitlist\/hitlist/i)) {
		if (document) {
			if (document.body) {
				document.body.innerHTML = "<center><font size=2><br><br><br><br><br>RELOADING Mob Wars in 5 seconds.....<br></font><font size=1>(Mob Wars error)</font></center>";
			}
		}
		var be;
		if (Page.hitlist) {
			be = Page.hitlist;
		} else {
			be = GM_getValue("Lhitlist", "http://apps.facebook.com/mobwars/hitlist/");
		}
		Timer.start(be, "Reloading Mob Wars Hitlist......", 5);
		I = true;
	}
	if (document.title.match(/Error loading page/i)) {
		Timer.start(location.href, "Reloading Mob Wars......", 5);
		I = true;
	}
	if (document.body.innerHTML.match(/This page is being heavily rate limited. Please avoid constantly refreshing this page./)) {
		var bd = new Object;
		if (boss.actions.errorrefresh) {
			delete boss.actions.errorrefresh;
		}
		if (boss.actions.hitlist) {
			delete boss.actions.hitlist;
		}
		bd.message = "Pausing for rate limit....";
		bd.page = Page.c_page;
		bd.func = "";
		bd.params = [];
		bd.time = Math.floor((new Date).getTime() / 1000) + 30;
		boss.actions.errorrefresh = bd;
	} else {
		if (boss.actions.errorrefresh) {
			delete boss.actions.errorrefresh;
		}
	}
	if (UserPrefs.AdminNoHeal) {
		if (boss.actions.hospital) {
			for (var x in boss.actions) {
				if (x.match(/stockpile/i) || x.match(/city/i) || x.match(/jobs_check/i) || x.match(/skill/i) || x.match(/godfather/i) || (x == "bank")) {
					delete boss.actions.hospital;
					var bf = document.getElementById("autoheal");
					if (bf) {
						bf.innerHTML = "<font color=red><center>AutoHeal is OFF (Admin)</center></font><br>";
					}
					break;
				}
			}
		}
	}
	var bg = new Object;
	var bh;
	bg.time = Infinity;
	for (var k in boss.actions) {
		if (boss.actions[k].time < bg.time) {
			bg = boss.actions[k];
			bh = k;
		}
	}
	if (!bh) {
		boss.new_level = 0;
		boss.save();
		afterTasks();
		if (h) {
			aN(aU);
		}
		return;
	}
	var bi;
	if (bg.time < boss.jail_delay) {
		bg.time = boss.jail_delay;
	}
	if (bg.time == Infinity) {
		bi = UserPrefs.timerdelay;
	} else {
		bi = bg.time - Page.now;
	}
	if (bi < 0) {
		bi = 0;
	}
	var bj;
	if (bg.url_params != "" && (bg.url_params != undefined)) {
		bj = bg.url_params;
	} else {
		bj = bg.page;
	}
	var bk;
	if (location.hash) {
		bk = location.hash;
	} else {
		bk = location.href;
	}
	var bl = bg.page;
	if (bl.length == 0) {
		bl = "homelink";
	}
	if (bl == "boss") {
		bl = "profile";
	}
	if (!bk.match(bj)) {
		if (bg.url_params) {
			if (Page[bl].href.match(/\?/)) {
				url = Page[bl].href + "&" + bg.url_params;
			} else {
				url = Page[bl].href + "?" + bg.url_params;
			}
		} else {
			if (Page[bl]) {
				url = Page[bl];
			} else {
				url = GM_getValue("L" + bl, "http://apps.facebook.com/mobwars/");
			}
		}
		Timer.start(url, bg.message, bi);
		if (!bg.func) {
			if (!bg.save) {
				delete boss.actions[bh];
			} else {
				if (bg.time <= Page.now) {
					delete boss.actions[bh];
				}
			}
		}
		aF();
	} else if (bg.func) {
		K[bg.func](bg.params, bi);
		if (!bg.save) {
			delete boss.actions[bh];
		} else {
			if (bg.time <= Page.now) {
				delete boss.actions[bh];
			}
		}
		aF();
	} else {
		var bm;
		if (bg.url_params) {
			if (Page[bl].href.match(/\?/)) {
				bm = Page[bl].href + "&" + bg.url_params;
			} else {
				bm = Page[bl].href + "?" + bg.url_params;
			}
		} else {
			if (Page[bl]) {
				bm = Page[bl];
			} else {
				bm = GM_getValue("L" + bl, "http://apps.facebook.com/mobwars/");
			}
		}
		Timer.start(bm, bg.message, bi);
		if (!bg.save) {
			delete boss.actions[bh];
		} else {
			if (bg.time <= Page.now) {
				delete boss.actions[bh];
			}
		}
		aF();
	}
	boss.new_level = 0;
	boss.save();
	afterTasks();
	if (h) {
		aN(aU);
	}
}
function afterTasks() {
	if (UserPrefs.popuphelp) {
		addHelp();
	}
	try {
		at();
	} catch(aT) {}
	if (Page.c_page == "hitlist") {
		if (window.location.href.indexOf("add", 0) > 0) {
			var aU = Utils.getElementsByXPath("//form[contains(@action,\"do.php\")]");
			if (aU) {
				aU = aU[0];
			}
			var aV = document.createElement("a");
			if (aV) {
				aV.addEventListener("click", hitListCurrentUser, false);
				aV.innerHTML = "Withdraw money and hitlist this user.";
				if (aU) {
					aU.appendChild(aV);
				}
			}
		}
	}
	if (Page.c_page == "hitlist") {
		if (window.location.href.indexOf("rig_ign", 0) > 0) {
			var aW = Utils.getElementsByXPath("//form[contains(@action,\"do.php\")]");
			if (aW) {
				aW = aW[0];
			}
			var aX = document.createElement("a");
			if (aX) {
				aX.addEventListener("click", RigCurrentUser, false);
				aX.innerHTML = "Withdraw money and Rig this mobs ignition.";
				if (aW) {
					aW.appendChild(aX);
				}
			}
		}
	}
	n(false);
	document.addEventListener("DOMNodeRemoved", notificationStart, false);
	window.addEventListener("unload", WindowUnLoad, false);
	notificationStart();
}
var aS = location.href;
setTimeout(function() {
	MainStuff();
},
50);
function WindowUnLoad() {}
function notificationStart() {
	if (document.getElementById("app8743457343_content")) {
		document.getElementById("app8743457343_content").addEventListener("DOMNodeInserted", nodeInsertedProcess, false);
	} else if (document.getElementById("app8743457343_container")) {
		document.getElementById("app8743457343_container").addEventListener("DOMNodeInserted", nodeInserted, false);
	} else {
		document.addEventListener("DOMNodeInserted", nodeInserted, false);
	}
}
function nodeInserted(aT) {
	if (document.getElementById("app8743457343_content")) {
		document.getElementById("app8743457343_content").addEventListener("DOMNodeInserted", nodeInsertedProcess, false);
		document.getElementById("app8743457343_container").removeEventListener("DOMNodeInserted", nodeInserted, false);
		document.removeEventListener("DOMNodeInserted", nodeInserted, false);
	}
}
function nodeInsertedProcess(aT) {
	if (aT.relatedNode.id.match(/app8743457343_mw_aj/i) || aS != location.href || aT.relatedNode.id.match(/app8743457343_mw_alert/i)) {
		document.getElementById("app8743457343_content").removeEventListener("DOMNodeInserted", nodeInsertedProcess, false);
		aS = location.href;
		setTimeout(MainStuff, 0, aT);
	} else {}
}
function addHelp() {
	var aT = new Object;
	aT.prefs_button = document.getElementById("prefs_button");
	if (aT.prefs_button) {
		aT.prefs_button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Preferences Button", "Here you can enter all your choices for how this script should operate.<br><br><center><font color=grey>Remember, you are the mob boss,<br> you should have choices!</font></center><br><br>You can also turn off these PopUp help windows by going to the \"Visible Behavior Preferences\" here.", event);
		},
		true);
		aT.prefs_button.addEventListener("mouseout", HelpHover.hide, true);
	}
	aT.hitlist_pref = document.getElementById("hitlist_pref");
	if (aT.hitlist_pref) {
		aT.hitlist_pref.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Hunt Bounties Button", "Based on user defined parameters, entered on the preference screen, the script will hunt the hitlist for bounties.  This button will turn it on and off.", event);
		},
		true);
		aT.hitlist_pref.addEventListener("mouseout", HelpHover.hide, true);
	}
	aT.Fight_pref = document.getElementById("Fight_pref");
	if (aT.Fight_pref) {
		aT.Fight_pref.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Fighter Drone Button", "If asked, the fighter drone will go out and do your fighting with other mobs for you whenever you are not bounty hunting.  But it needs direction from the boss, <font color=grey>YOU</font>. &nbsp;Go to the preference screen to set up all your parameters.<br><br>Clicking on this button turns the fighter drone off and on.  While on, the button may show three different actions:<br><font color=red>Active</font>: The fighter drone is working, beating up other mobs.<br><font color=blue>Forced</font>: If set to do so in preferences, when at full stamina down to a user defined level, the fighter drone will force itself even if hunting bounties.<br><font color=orange>Waiting</font>: The fighter drone is active, but waiting for a turn.", event);
		},
		true);
		aT.Fight_pref.addEventListener("mouseout", HelpHover.hide, true);
	}
	aT.fights = document.getElementById("fights");
	if (aT.fights) {
		aT.fights.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Fights Button", "Here is a list of all the fights you've had - on the hitlist, or thru the fight page.", event);
		},
		true);
		aT.fights.addEventListener("mouseout", HelpHover.hide, true);
	}
	aT.BankD = document.getElementById("BankD");
	if (aT.BankD) {
		aT.BankD.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Bank Button", "Need to put money in the bank fast?  Press this button to go to the bank and deposit all your cash.", event);
		},
		true);
		aT.BankD.addEventListener("mouseout", HelpHover.hide, true);
	}
	aT.HealFast = document.getElementById("HealFast");
	if (aT.HealFast) {
		aT.HealFast.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Heal Button", "Need to heal quickly?  Press this button to go to the hospital and have a doctor take a look at you.", event);
		},
		true);
		aT.HealFast.addEventListener("mouseout", HelpHover.hide, true);
	}
	aT.bvl_button = document.getElementById("bvl_button");
	if (aT.bvl_button) {
		aT.bvl_button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Victims Button", "Here you can find a list of, and links to, all the people you've killed on the hitlist.", event);
		},
		true);
		aT.bvl_button.addEventListener("mouseout", HelpHover.hide, true);
	}
	aT.disable_button = document.getElementById("disable_button");
	if (aT.disable_button) {
		aT.disable_button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Disable in current browser window", "Here you can disable the script in the current tab or window, so you can mess around in Mob Wars while the script runs in another tab or window.<br><br>There are couple caveats in using this feature.<br>1) You need to give the script time to change the links on each page you view, so that if/when you click on one, it will still keep the script disabled.  Basically, if the status window has shown up, you've waited long enough.<br>2) This only works for the links -- clicking on a button (hitlist users, attack user on the hitlist, attack user on the fight page, etc.) will re-enable the script on that tab or window.<br>3) Clicking on \"Bank\" or \"Heal\" buttons on the script status window, or following a link in the fight or victim list reports in the script, will also re-enable the script on that tab or window.<br>4) And lastly, use with caution.  While anyone would be hard pressed to prove it, how many people do you know of that can do several things at once?", event);
		},
		true);
		aT.disable_button.addEventListener("mouseout", HelpHover.hide, true);
	}
	aT.log_button = document.getElementById("log_button");
	if (aT.log_button) {
		aT.log_button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Script Log", "Here you can find a log of all the actions taken by the script.  The logging must be turned on from withing preferences.", event);
		},
		true);
		aT.log_button.addEventListener("mouseout", HelpHover.hide, true);
	}
	aT.Pause = document.getElementById("Pause");
	if (aT.Pause) {
		aT.Pause.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Pause", "The preferred way to temporarily stop the script from performing any actions.", event);
		},
		true);
		aT.Pause.addEventListener("mouseout", HelpHover.hide, true);
	}
	aT.helpme = document.getElementById("helpme");
	if (aT.helpme) {
		aT.helpme.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Help", "Opens a window with general information on how to play the game. -- Currently mostly empty (someday it will get worked on.... :)  )", event);
		},
		true);
		aT.helpme.addEventListener("mouseout", HelpHover.hide, true);
	}
}
function addPrefHelp() {
	var button = document.getElementById("HealToMax");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Heal to Max", "If you have automatic healing on (not 0), then whenever you fall below your % given above, you will automatically heal until you are back above 60% (the max allowed by the game itself).<br><br>If enabled, whenever you are at the hospital screen, thru script action or your own, you will automatically heal to max.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("GodFatherUntouched");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Do Not Use some GodFather Points?", "Perhaps you are saving up for something big, like to be an insider.  Or you just want to keep some in 'reserve' for when you might need them.  Any points you don't want the script to consider using, enter them here.  The script will only consider points received after you already have this amount.<br><center><font color=grey>Defaults to 0</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("JobDelay");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Job Delay", "There is some evidence that waiting for some time after you can do a job, before you actually do a job, may increase your odds of getting one of the weapons or drop items from that job.  If you prescribe to this theory, you may add a delay here, and the script will wait approxametly that amount of time after you could do a job, before actually performing it.<br><center><font color=grey>Job Delay is in minutes<br>Defaults to 0</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("hitlistactive");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Activate Hitlist?", "If set to 'Yes', then hunt for bounties on the hitlist whenever there is nothing else that needs to be done.<br><br>Can also be turned on and off from the 'Hunt Bounties' button on the status screen.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("insideractive");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("MobWars Insider", "If set to 'Yes', the various timers in the script are adjusted to more acurately reflect your true wait times.  Setting this to 'Yes' when you are not actually an insider can only cause problems.<br><center><font color=grey>You must adjust this manually,<br>when you become an insider and when you<br>are no longer an insider.</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("MaxBounty");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Maximum Bounty", "What is the maximum bounty target that you are willing to attack?<br>Higher bounties often equate to stronger mobs(but not always).  Similarly, smaller bounties often equate to weaker mobs (but, again, not always)", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("MinBounty");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Minimum Bounty", "Just as with the maximum bounty target that you are willing to attack, what's the smallest?<br>Currently, the smallest bounty will be ignored if you are at full stamina -- some bounty is better than no bounty - unless you also set 'No' for 'Ignore the minimum bounty if at full stamina'.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("hitlisttarget");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Who should you pick on the hitlist?", "If there is more than one bounty available, who should you target?<br><font color=grey>First Come</font>: Take the first target on the list, and go straight for them.<br><font color=grey>Highest bounty</font>: Go thru the list, find the largest bounty currently available, and attack.<br><font color=grey>Lowest Bounty</font>: Go thru the list, find the smallest bounty currently available, and attack.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("hitlistsnipe");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Hunt with Snipes?", "Do you want to hunt for bounties using snipes, or use the safest method?<br><font color=grey>Snipes</font> allow you to attack a target multiple times very quickly, without having to wait for the page to reload between attacks, giving you a small additional chance of getting attacks in before the enemy boss is killed (and hopefully you'll be the one to do it).  The negatives, however, is that some information may not be recorded on the fight and victim lists, you could potentially kill yourself, and it is remotely more possible that Mob Wars/facebook could flag you as a bot (although anyone, script or not, can snipe)<br><font color=grey>Safe Snipe</font> is basically a combination of snipe and safe modes.  This version is, of the snipe modes, the least likely to get stuck (for 35 seconds), but also the mode (of all three) that has the worst fight and victim list recording success (this only effects script recording, you'll still get credit for any fights/kills in Mob Wars itself)<br><font color=grey>Safe</font> attacks are just like hitting the attack button once and letting the page reload.  There are fewer issues to worry about, and they are almost as effective.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("hitlistsnipemore");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Attack more than one?", "<font color=grey><center>Experimental Feature</center></font><br><br>If there is more than one target on the bounty list, and you have snipes enabled, should you attack all of them?  If you use this feature, 'target which' option set above is ignored and you just attack everyone on the list.<br><br>If you use this experimental feature, this can add up fast -- Example: 3 targets, 3 snipes each = 9 snipes if all go thru.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("godlisttr");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("GodFather Points", "<center>You've done well for yourself,<br>and the GodFather is pleased!</center><br>You've built up some good will with him, and when it's time to cash that in, what will you be asking for?  All available options are here.  Keep in mind, the best options are ussually the Special Weapon, Hired Guns, or Insider.  But you're priorities are what is important!  So pick whatever you want.<br><center><font color=grey>Defaults to 'Nothing'</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("maxsnipe");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Maximum times to snipe attack?", "If you're snipping, how many times should you attack?  If you also do 'Attack multiple targets', this can add up very fast, as you'll attack each target the number of times you set here.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("staminaregen");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Stamina Regeneration Wait", "If your stamina should fall to 0, what should your stamina be when we start bounty hunting again (or fighting with the figher drone -- see preferences below)?", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("hitlistbck");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Avoid these targets?", "Are there targets that you don't want to ever attack?  If so, enter them on the list below, and set this to 'Yes'.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("whoonHlist");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Manually edit hitlist block list", "These are all the mob IDs' of targets that you don't want to ever attack if they show up on the hitlist.  You must enter their ID, not their name.  The ID can be found by going to there profile page -- when on there profile page, their ID is the number shown in your web browsers address bar.  Each ID must be seperated from other IDs with a ',' (comma).  The script will check for duplicates on this list when you exist the preference window.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("hitlistautoadd");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Automatically add to the Do Not Attack list?", "If you attack someone on the hitlist, and you lose the fight, should we add the enemy mob to the above list so we don't keep, so to say, hitting a brick wall?<br><br>Even if you add them to the list, with this function or manually, they won't be blocked unless you also have it set not to attack mobs on this list.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("fbookhide");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("FB Ad Hide", "<font color=grey><center>This function only works if your browser window height is less than 700 pixels.</center></font><br>This function is only here to free up some screen realestate for those that need it.  This function does NOT stop the advertisements from downloading, so there is no reason to use this function unless you need it.<br>No matter how you feel about the facebook ads the internet world revolves around advertisements.  So please don't block them unless you have to.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("tdelay");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Time Delay", "This is the number of seconds to wait between script actions.  The script will bypass this wait for certain actions, including attacking on the hitlist, in which cases it performs actions as fast as possible.<br><center><font color=grey>Unlimited maximum</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("BHdelay");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Bounty Hunting Delay", "Initially going to the hitlist is controlled by the time delay default above.  This is the number of seconds to wait between hitlist reloads.  The script will attack any mob, within your given parameters, immediately, regardless of what is entered here.<br><center><font color=grey>Unlimited maximum</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("FDdelay");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Fighter Drone Delay", "Initially going to the fight screen is controlled by the time delay default above.  This is the number of seconds to wait between fight page reloads, and the delay in attacking an enemy mob.<br><center><font color=grey>Unlimited maximum</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("rdelay");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Inactivity Delay", "If the script has nothing to do, how often should it refresh the screen to keep tabs on your stats, etc.<br><center><font color=grey>60 seconds minimum<br>Unlimited Maximum<br>0 to disable</font></color>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("joblist");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Job List", "Tell the script what job you want to do, or let the script pick for you.<br><font color=grey>None</font>: If you want to control all job actions directly.<br><font color=grey>Best payout/energy</font>: if you want the best payout for every energy unit needed to do a job.<br><font color=grey>Best experience/energy</font>: if you want the best experience for every energy unit needed.<br><font color=grey>Any other</font>: if there is a specific job you want performed.<br><br>For any job depended on other jobs being completed, the script will <font color=orange>automatically</font> perform any depended jobs first.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("bankactive");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Automatically Bank", "Do you want your money automatically put into the bank after you perform jobs and get paid?", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("bankaftbounty");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Automatically Bank after Bounties", "When you get a bounty for killing someone on the hitlist, do you want all your money deposited into the bank?", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("autheal");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Automatically Heal", "If you're hurt, and your health is less then the percentage, that you enter here, of your max health, then go to the hospital and have a doctor fix you up.<br><center><font color=grey>0 minimum<br>60 maximum</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("autorest");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Automatically Rest", "If your health is lower then this percentage of your max health, then just sit and rest until you feel better.<br><center><font color=grey>Minimum is your AutoHeal percentage<br>70 maximum</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("laylow");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Ignore Health", "If you are not automatically hunting for bounties, or using the fighter drone, turn off automatic healing.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("place");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Where should the status window go?", "<font color=grey>This currently does not function.</font>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("AddFBFriendHP");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Place 'Add Facebook Friend' link near all mobs on your home page", "Setting this to Yes will have the script put a link to each mob's boss Facebook account, so that you can add them as a friend.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("orient");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Advertisement window orientation", "Should the advertisement window be placed horizontally or vertically", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("adjustmain");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Adjust the main MobWars screen", "Should we move the main MobWars screen so that nothing is covered by this script?  Especially useful for low resolution screens or windows.  Can also be useful during snipes so you can see the results of most of them.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("statd");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Display mob status", "A small window displaying your mobs vital stats is shown at the bottom of the status window.  Basically only there for diagnostics.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("showbounty");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Show what your bounty value", "Interested in knowing what your bounty value is?  If so, turn this on and your bounty value will be displayed in your status window.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("showexp");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Experience needed to level up", "If on, the experience needed to reach your next level will be displayed on your status window.  The percentage in () will reach 100% when you complete your current level.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("pophelp");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Show these PopUp help windows", "Don't want to see these help screens anymore?  Just turn this off.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("errload");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Error Reload", "If facebook has an error, reload mobwars?  This option refers to the 'common' error page of facebook, so any common facebook error will restart mobwars.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("autocity");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Automatically buy city items", "If enabled, the best properties, based on ROR (Rate of Return) will be selected for purchase, and will be purchased when you have enough money.  The best quantity will also be purchased at once, based on your rate of income, and the amount the item will go up in cost when you purchase it.  This quantity will be only a few to begin with, but as your income grows, and the costs increase, the number selected to be purchased at one time will ussually be 10.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("autocitymaxland");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Limit Undeveloped Land", "Even though Undeveloped Land is an investment, it is also an expense for building establishments.  Because of this, it is slightly better (from an income only point of view) to only purchase establishments -- only buying undeveloped land when needed to build them.<br><br>From an income only point of view, it's best to leave this set to Yes.<br><br>But from a land titan point of view, you may want to hoard properties -- undeveloped or not.  The income lost by doing this is a minimal percentage.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("autocitywbank");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Use Bank Money to buy property", "If selected, the script will include bank money in its' decision to purchase property or not.  If allowed, it will automatically withdraw any needed funds and use them to make purchases.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("bankmin");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("'Rainy Day Fund'", "Want to keep an amount in the bank at all times, so it's there if you need it in an emergency?  Enter an amount here that the script will not be allowed to touch, except for healing.  After anytime you heal, it will check if this minimum is still in the bank, and if it isn't it will automatically deposit more if you have it available in cash.<br><center><font color=grey>2000 minimum</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("bankrestrict");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Restricted Bank Amount", "This money is 'untouchable' by any of the scripts automatic functions, except to heal.  The only difference between this setting, and the 'Rainy Day Fund' setting above, is that when you fall below this amount, the script will not automatically replenish your bank account.<br><center><font color=grey>Minimum of 'Rainy Day Fund'</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("cashmin");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("'Untouchable' cash", "Don't want to allow the script to use all the case you have available?  Enter an amount here that the script will not be allowed to touch.<br><center><font color=grey>If nothing is entered here, the script could take any money you withdraw from the bank (that was protected there) and use for purchasing property</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("skill");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Skill/LevelUp Preferences", "Here you set what mob boss attributes you want increased each time you reach a new level.  You may select any combination of attributes that you want, but keep in mind that to increase stamina it takes 2 of the 3 points given each levelup, so only one of the three can be stamina.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("fightactive");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Activate Fighter Drone", "Want to do some mob wars fighting?  Turn this on and the script will start fighting other mobs on the fight screen whenever hunting bounties is turned off.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("maxmob");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Maximum Mob Size", "What is the maximum mob size (members) that you are willing to fight?<br><center><font color=grey>0 is unlimited<br>Can't be less then minimum size</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("minmob");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Minimum Mob Size", "What is the minimum mob size (members) that you are willing to fight?", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("maxlevel");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Maximum Mob Boss Level", "What is the maximum mob boss level that you are willing to fight?<br><center><font color=grey>0 is unlimited<br>Can't be less then minimum.</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("minlevel");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Minimum Mob Boss Level", "What is the minimum mob boss level that you are willing to fight?", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("bycolor");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Fight by Color Coding", "The fight screen is color coded when using this script.  Do you want to fight only mobs of a certain color code, in ADDITION to the other limits you've entered?", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("SndList");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Attention Sound", "This is a list of sounds currently available to get your attention when needed (currently, only when a 'Are you Human' response is required).  There are three types available.<br><br>Java - just a beep.  Nothing fancy, but the most likely to work.  Requires java.<br><br>Midi - a high pitched note.  Requires an appropriate plugin.<br><br>Flash - various, very short, tunes.  Requires the Adobe Flash plugin.<br><br>The java and Midi are built into the script, and as long as you have the correct plugin(s), should always work.  Flash options are hosted on an external server -- if they are unavailable, for whatever reason, the sound will not function.<br><br>All may take a few moments before starting.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("SndRepeat");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("How often should the sound repeat", "Each time attention is needed, how often should the beep or note be played before stopping?  This only effects the java beep, and midi note, options.  Flash will continue to repeat until you answer the question, refresh the page/change pages, or click 'stop sound'.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("bylesscolor");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Choose a potentially weaker mob if needed", "If you've choosen to fight by color code, but none of the color you desire shows up on the fight list, should a weaker mob get attacked?<br>If you selected 'yellow' as the color you desire to attack, but none is available, it will try 'white'.  And if none are available still, it will then try 'green'.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("whatcolor");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("What Color", "If you choose to also fight by color codes, what color do you want to fight?<br><font color=green>Green</font>: In most cases, you'll win with no problem, but the amount of experience you get from each fight may be low.<br><font color=white>White</font>: You should have no problem winning.<br><font color=yellow>Yellow</font>: You could win these fights.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("modifier");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("What defense modifier should be used", "The color coding on the fight page uses your total attack strength, and the estimate possible total defense strength that the enemy mob may have.  To help figure the total enemy defense strength, what modifier should we use?<br><br>This modifier should be the total defense you believe EACH enemy mob member might bring to the fight.<br><br>For example, if you believe each enemy mob member only has a baseball bat, and nothing else, the defense modifier would be 1 (one).  If you believe each enemy mob member would have a ChevyTac .408 (defense attribute of 14), a Tactical Armor (defense of 15), and a SWAT Bearcat (defense of 17), the total modifier you would enter is 46.<br><br><center><font color=grey>You will need to change this modifier as you go up in levels!</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("dskillmodifier");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("What defense modifier should be used", "If an enemy mob allocated 3 of 3 skill points, every level, to defense X% of the time (X = this modifier), and you can beat that, then it will be green.<br><br>If they allocated 2 of 3 points, every level, to defense X% of the time(X = this modifier), and you can beat that, then it will be white.<br><br>If they had allocated just 1 of 3 points, every level, to defense X% of the time (X = this modifier), and you can beat that then it will be yellow.<br><br>Defaults to 95%, but realistically may be lower (better to be safe then sorry), but could be higher.<br><br><center><font color=grey>Default 95%</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("maxfights");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Max times to attack one mob", "The maximum times you want to attack any one mob.  The script will remember the last 30 mobs you fight.<br><center><font color=grey>0 is unlimited</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("force");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Force Fighter Drone Mode", "Normally when hunting bounties and the fighter drone are both on, hunting bounties takes priority.  But if you turn this option on, when you are at full stamina, the script will change to Fighter Drone mode and continue fighting until your stamina reaches the level you select and will then switch back to hunting for bounties.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("minforce");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Cancel Forced Fighter Drone Mode", "If using the fighter drone in forced mode, return to normal mode when stamina falls to what level?", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("fightblock");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Don't fight those on the following list", "Instruct the fighter drone to NOT attack the mobs on the following list.  These mobs can be entered manually, or the system can enter them for you whenever you lose a battle with an enemy mob.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("fightOnlist");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Those on the Don't Fight list", "These are all the mob IDs' of targets that you don't want to ever attack if they show up on the fight page.  You must enter their ID, not their name.  The ID can be found by going to there profile page -- when on there profile page, their ID is the number shown in your web browsers address bar.  Each ID must be seperated from other IDs with a ',' (comma).  The script will check for duplicates on this list when you exist the preference window.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("fightautoadd");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Automatically add to the Fight Do Not Attack list", "If you attack someone on the fight page, and you lose the fight, should we add the enemy mob to the above list so we don't keep, so to say, hitting a brick wall?<br><br>Even if you add them to the list, with this function or manually, they won't be blocked unless you also have it set not to attack mobs on this list.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("hfightsneeded");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("How many fights until we cut our losses", "How many fights (not just losses) will take place before we consider how we're doing against a mob?  Do we want to check after one fight, where the loss (if we lost) could have been a random unfortunate event, or wait several fights where we may have been bloodied in every one, but at least then we know we don't have a chance.  Play it safe, or go headstrong into battle?<br><br><center><font color=grey>Defaults to 1 (play it safe)</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("fightsneeded");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("How many fights until we cut our losses", "How many fights (not just losses) will take place before we consider how we're doing against a mob?  Do we want to check after one fight, where the loss (if we lost) could have been a random unfortunate event, or wait several fights where we may have been bloodied in every one, but at least then we know we don't have a chance.  Play it safe, or go headstrong into battle?<br><br><center><font color=grey>Defaults to 1 (play it safe)</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("fightratio");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("What win/fights ratio is needed to continue", "After we've reached the number of fights per mob you entered above, if we fall below what ratio of wins to fights will it mean that we avoid fighting with this mob again?<br><br><center><font color=grey>Defaults to 100%<br>(any losses in fights to date will have us<br>avoid this enemy)", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("hfightratio");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("What win/fights ratio is needed to continue", "After we've reached the number of fights per mob you entered above, if we fall below what ratio of wins to fights will it mean that we avoid fighting with this mob again?<br><br><center><font color=grey>Defaults to 100%<br>(any losses in fights to date will have us<br>avoid this enemy)", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("stamlaylow");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Turn off Automatic Healing during stamina regen", "If you're waiting for your stamina to regenerate, do you want to lay low and let your health drop if you're attacked, so that you don't just keep healing while you can't do anything anyway.<br><br><center><font color=grey>Defaults to off<br>Turn off Automatic Healing when not<br> bounty hunting or fighter droning must also be on.</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("fbpresencehide");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Hide the lower FaceBook bar", "If set to 'Yes', the bottom FaceBook bar will be removed.  This has the added benefit of freeing up space, but also the FaceBook bar has been known to cause problems with this and other similar scripts in the past -- mainly the chat function on it.<br><br>Whether or not you use this option, you should TURN OFF/DISABLE chat while in mobwars.<br><br>While there are currently no known problems with chat, or the bar, with this script, you never know what the future will bring.<br><br>If you are having problems, DISABLE chat, and you may try enabling this option as well.<br><br><center><font color=grey>Defaults to 'No'<br></font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("PauseMobsterPref");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("The Pause Mobster", "If you have the system paused, and the script is waiting to perform an action (any action, including just refreshing the screen), this little guy comes out to..... take you out!<br><br>Ok, he won't actually do any harm to you, but he wants to remind you that you're paused, and that <font color=red>bad things happen</font> to those who \"fall asleep at the wheel\" of their mobs.<br><br><center><font color=grey>Defaults to showing<br>May be disabled in preferences.</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("healpbutton");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Display Heal Button", "Need to clear up some status bar realestate and don't want the Heal button there?  Then set this to 'No'.<br><br><center><font color=grey>Defaults to Yes</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("bankpbutton");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Display Bank Deposit Button", "Need to clear up some status bar realestate and don't want the Bank Deposit button there?  Then set this to 'No'.<br><br><center><font color=grey>Defaults to Yes</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("DManagement");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Database maintenance", "You should never have to come here.<br><br>But if something goes wrong in the script, and it doesn't self correct, then reseting a internal database may be the answer.<br><br>The 'Boss' database will be the most likely culprit of any problems.  It stores most of the problematic data about your mob.  Another possible culprit is your user preference settings, reseting them to the defaults may do the trick.  If you reset the 'User Preference' database, you'll have to reenter all of your preferences. <font color=\"red\"> Even if you set the 'User Preferences' database reset to 'Yes', if you change ANYTHING else on the preference screen, it will NOT reset. </font> Any other database will reset no matter what else you do.<br><br>The other databases are all as they seem.  If you have any questions, just ask.<br><br>It is not the end of the world if you reset any of these.  The script will regather needed data automatically.<br><br>You may, however, lose learned data, such as those on the Fight or Victim lists.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("bankaftfights");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Automatically deposit fight rewards", "Occasionally you may get a fair amount of money from just fighting other mobs.  Money you may want protected.  If you set this to 'Yes', the script will keep track of the money you've won from just fighting, and after you've reached a set amount (shown below), it will automatically deposit your money.<br><br><center><font color=grey>Defaults to 'No'</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("bankminfights");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Fight rewards minimum", "If you want your fight reward money automatically deposited, how much should you gain until it automatically deposits?  If you have this set at X amount, the script will remember how much you've won since the last automatic deposit and will wait until TOTAL rewards are greater then X.<br><br><center><font color=grey>Default $10,000</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("capdelay");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Captcha Timer", "Currently only has effect if SOUND is ON.<br><br>If human attention is required (for a captcha), and this timer is enabled, then we will wait for input for X minutes.  If no input is received, then:<br><br>1) If the MWCaptcha service is NOT enabled, cancel waiting for input and cancel bounty hunting, and then continue with other script operations (fighter drone, if enabled; jobs, if enabled; etc.).<br><br>2) If the MWCaptcha service is enabled, but fails with a recoverable error, will reload the same page and try everything again.<br><br>3) If the MWCaptcha service is enabled, but fails with an error that can't be recovered without human intervention, perform the same procedure(s) as 1) above.<br><br><center><font color=grey>Defaults to '0' (disabled)<br>Only has an effect with NUMBER captchas</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("PMobSound");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Use sound with the Pause Mobster", "Do you want the sound playing when the Pause Mobster is also active?", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("CheckCaptcha");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Check MWCaptcha input for validity", "Check the responses from the MWCaptcha service for validity (currently only the number captchas).  If the response is not valid, it will ask you for an answer.<br><br><center><font color=grey>Defaults to Yes</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("MaxCaptchaLength");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("How many characters should be allowed for captchas?", "What is the maximum length a Captcha response can be?  Currently this is 3, so you should have no need to change this.  But if Mob Wars should change there system, you can increase (or decrease) the allowed here.<br><br>Checks BOTH MWCaptcha responses and your own input.<br><br><center><font color=grey>Defaults to 3</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("promptalert");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Use an alert prompt for captchas?", "If you don't like the built in captcha windows, you can use alert prompts for input (the old style).  If you do wish to use the old style, the prompt timers will not function.<br><br><center><font color=grey>Defaults to No</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("Randomizer");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Randomizer the timers?", "Vary the Bounty Hunting and Fighter Drone timers by up to 1 second plus or minus.<br><br><center><font color=grey>Defaults to Yes</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("autostockpileact");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Automatically Keep Mob Armed?", "<center>BETA</center><br><br>Whenever your mob size changes, should the script make sure you have enough weapons, armor, and vehicles?<br><br><center><font color=grey>Defaults to No</font></center><br><br><center>BETA</center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("autostockpileminimum");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("What is the minimum number to<br>purchase at one time?", "If the script is keeping your mob armed, what is the minimum number of items to buy in one group?<br><br>Normally would be 1, unless your mob is over 500 strong and the cost of weapons, armor, and vehicles, starts to go up.<br><br><center><font color=grey>Defaults to 1</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("VarySnipe");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Vary the number of times you snipe?", "This will vary the number of times you snipe by +/1 the number of times you have set below (1 or 2).  Basically only to 'look' less bot-like.  Will never snipe more then the max allowed (3, 6 if a donator).<br><br>Example: You set 2 as your snipe amount, this on, and the number of times to vary to 1.  You will snipe between 1 and 3 times.<br><br>Example 2: You set 5 as your snipe amount (donator), this on, and the number of times to vary 2.  You will snipe between 3 and 6 times.<br><br><center><font color=grey>Defaults On</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("VarySnipeAmount");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("How many should we vary by", "See the description for 'If sniping, vary the number of times you snipe:'.<br><br><center><font color=grey>Defaults to 1</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("PlayDead");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Should we play dead?", "If our health falls to below the level we set below, should we consider ourselves 'Dead' and remain that way for the number of minutes also set below?<br><br>Current implementation does not consider how we got that low -- we may have done it to ourselves.  But if it wasn't our doing, playing dead may be a good way to get those chain attackers off of your back.<br><br><center><font color=grey>Defaults to 'Yes'</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("PlayDeadHealth");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("At what health should we consider ourselves dead?", "This is not a percent!  It is an absolute health point value.<br><br>If we fall to this level, or below, and the above setting is set to'Yes', then we will 'Play Dead' for the number of minutes set below.<br><br><center><font color=grey>Defaults to 10</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("PlayDeadTime");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("How long (minimum) should we Play Dead?", "If we are considering ourselves 'dead', how long (in minutes, minimum) should we act that way?  After the time period runs out, we will automatically go to the hospital to heal at least once (if we have auto heal turned on).<br><br><center><font color=grey>Defaults to 10</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("DroneTarget");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Drone Targeting", "Targeting, in this case, may be slightly inaccurate.  Current version of these options will not actually target those that have the most money, or the most experience to give.  But they will help you avoid those that don't have much of either.  Turn this option on, and enter your desired minimum target amounts below, if you want to use this feature.<br><br><center><font color=grey>Defaults to 'No'</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("DroneMinExp");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Minimum Experience", "Enter the minimum experience you want to obtain from your fights on the fight page.  While the drone won't target those that give you more then this, it will avoid those that give you less -- if you also have the mob avoiding set to 'Yes' above.<br>Changing this setting will reset your predictive experience record (only matters if you use predictive experience avoiding)", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("DroneMinMoney");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Minimum Money", "Enter the minimum money you want to obtain from your fights on the fight page.  While the drone won't target those that give you more then this, it will avoid those that give you less -- if you also have the mob avoiding set to 'Yes' above.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("DroneMark");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Mark fight page with wins/losses/experience", "If you select this option, the mobs on the fight page will be marked with past wins and losses, as well as the average experience you gained from them per win.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("LogStuff");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Log script activity", "Select this if you want all the script activity logged.  Currently, not everything will be logged, but most.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("LogLevel");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("What should be logged?", "You can also set it to log everything (in which case you may have a lot of \"reloading hitlist\", etc., entries), or \"Main Actions/Errors\" (which doesn't record all main actions yet, but many of them), or \"Errors Only\" (which currently only records one error that may occur with the fighter drone, but probably will never show up). More recording will be added over time.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("LogLength");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("How long should the log be?", "How many entries should be kept?", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("VisibleOrder");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Visible Order of status window", "Currently only two options: Standard, and Queue on top.  Changes the order of the status window.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("ignoreminimumbounty");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Ignore minimum bounty?", "If you are at full stamina, should we ignore your minimum bounty setting above?  Some bounty is better then none.<br><br><center><font color=grey>Defaults to 'Yes'</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("snipedelay");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Delay the first snipe?", "If you are bounty hunting in snipe mode, should we delay the first snipe?  There seems to be some evidence that a small delay can be beneficial.  But there is no set rule on this, so you'll need to experiment to find what works best for your situation.<br><br><center><font color=grey>Defaults to 0<br>(1000 milliseconds = 1 second)</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("droneignoreonline");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Ignore mobs that are online?", "Should the fighter drone avoid mobs that are currently online?  It is mildly less likely that you will have people retaliate if you attack a mob who's mob boss isn't currently there.<br><br><center><font color=grey>Defaults to 'No'</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("dronememory");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("How many mobs should be remembered for past fight limiting?", "This script will remember how many times you've attacked a particular mob, so that you can limit the number of times that you do.  How many mobs (MOBS, not fights) should be remember?<br><br><center><font color=grey>Defaults to 60</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("dronetargetexp");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Target mobs that give good experience", "If you fought a mob and the resultant fight gave you more experience then the number entered below, should we target them again if they show up on the fight list?<br>Remembers the last 100 mobs that meet the experience level entered below.  Changing the number entered below will reset this list.<br><br><center><font color=grey>Defaults to 'No'</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("dronetargetminexp");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Minimum experience needed to target", "What amount of experience must be gained per fight to warrant targeting?<br><br><center><font color=grey>Minimum of amount entered to avoid (see below)</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("dronetargetmoney");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Target mobs that give you enough money", "If you fought a mob and the resultant fight gave you more money then the number entered below, should we target them again if they show up on the fight list?<br>Remembers the last 100 mobs that meet the money amount entered below.  Changing the number entered below will reset this list.<br><br><center><font color=grey>Defaults to 'No'</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("dronetargetminmoney");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Minimum money gained needed to target", "What amount of money must be gained per fight to warrant targeting?<br><br><center><font color=grey>Minimum of amount entered to avoid (see below)</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("citypurchase");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Purchase properties in groups up to X", "How many properties should the autobuy routine be allowed to purchase at once?  Normally this should be left at 10.  The script will automatically pick a lower number if appropriate, and higher numbers provide no benefit.  But this option if you have a max preferred number to purchase at once.<br><br><center><font color=grey>Defaults to '10'<br>Minimum 1, Maximum 10</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("newlevelaccheck");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("At new levels, should we check our properties?", "Normally this should be left on.  And <font color=red>problems CAN arrise</font> if you don't leave this on.  However, if you find that, for whatever reason, the script spends more time checking properties then you would like, you can turn this off here.<br><br><center><font color=grey>Defaults to 'Yes'</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("PlayDeadTimeMax");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("What is the maximum time we should play dead?", "If we are playing dead, what is the maximum amount of time that we should pretend to be dead?  The script will randomly choose a time to play dead that is between this time and the minimum time entered below.<br><br><center><font color=grey>Defaults to twice the minimum<br>Minimum of minimum time entered below</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("newleveljbcheck");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("At new levels, should we check our jobs available?", "Normally this should be left on.  And <font color=red>problems CAN arrise</font> if you don't leave this on.  However, if you find that, for whatever reason, the script spends more time checking jobs then you would like, you can turn this off here.<br><br><center><font color=grey>Defaults to 'Yes'</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("newlevelspcheck");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("At new levels, should we check our stockpile?", "Normally this should be left on.  And <font color=red>problems CAN arrise</font> if you don't leave this on.  However, if you find that, for whatever reason, the script spends more time checking the stockpile then you would like, you can turn this off here.<br><br><center><font color=grey>Defaults to 'Yes'</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("showcaptcha");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Show captcha images in the script windows", "To help see the correct captcha to enter, the script puts an image of the captcha in status window and captcha prompt.  If, for whatever reason, you don't want the script to do this, you can turn this off here.  If you do turn it off, it can be problematic answering captchas if you are bounty hunting with snipes on.<br><br><center><font color=grey>Defaults to 'Yes'</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("AddFBFriendFP");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Place 'Add Facebook Friend' link near all mobs on your fight page", "Setting this to Yes will have the script put a link to each mob's boss Facebook account, so that you can add them as a friend.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("adminnoheal");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Do not Auto-Heal while performing administrative tasks", "If you turn this option on, you will not auto-heal while the script is checking your stockpile, city, or jobs available.  Nor will it auto-heal if the script is purchasing stockpile or city items, if allocating skill points, or if going for a favor from the GodFather.<br><br><center><font color=grey>Defaults to 'Yes'</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("healshortcut");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Use background healing", "<center>Still somewhat experimental</center><br>When we need to heal, should we use background healing?  That is, healing without actually displaying the hospital screen.<br><br><font color=orange>There are a couple caveats to using this method:</font><ol>&#9658; 'Heal to max' will not function.<br>&#9658; 'Rest until health' will not function.<br>&#9658; Your bank account may not udpate correctly after each time you heal -- this can cause problems if you run out of money in the bank, and other problems if you use bank funds for the auto city and stockpile purchases.<br>&#9658; Will perform whenever the script notices that healing is needed, even if paused.<br>&#9658; Will heal even while doing administration tasks even if asked not to.<br>&#9658; A few functions (the end of the death wait mainly) will still go to the actual hospital page to heal.<br>&#9658; There is a chance of captcha overlap (more then one at once)<br>&#9658; There is a minor chance of 'getting caught' using this method.</ol><br><center><font color=grey>Defaults to 'No'</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("droneignorelevelb");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Reconsider those outside your level restrictions", "", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("droneignoremembersb");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Reconsider those outside your mob member restrictions", "", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("droneignoreonlineb");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Reconsider those blocked for currently being online", "", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("droneignorelistb");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Reconsider those on your fight block list", "", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("droneignoretimesb");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Reconsider those who you've already attacked more then your set limit", "", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("droneignoreexpb");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Reconsider those outside your experience received restrictions", "", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("droneignoremoneyb");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Reconsider those outside your money gained restrictions", "", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("predictiveavoid");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Avoid mobs by predicted experience", "If you lose a fight, predict how much experience you COULD gain if you possibly beat the mob in the future.  If it is not higher then the minimum experience you desire (set below under 'Avoid if average experience received is less then' option below), then avoid fighting them in the future.<br><br>Remembers the last 100 mobs you lose a fight to AND doesn't meet your minimum experience setting -- list resets whenever you change your minimum experience setting.<br><br><center><font color=grey>Defaults to 'No'</font></center>", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("CaptchaSolverRetry");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Retry on Captcha Solver System Error", "If the Captcha Solver(tm) reports a system error (that is, it doesn't give an answer to the captcha, but reports an error), should we request a captcha answer again, or go straight to manual entry?<br><br>In most cases, asking again is a good idea -- there may be random errors, but there ussually isn't anything major.  Especially if you have the max retry set below, it's a good idea to have this set to 'Yes'.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("CaptchaSolvermaxretry");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Max Retries", "How many attempts should we give the Captcha Solver(tm) to answer the captcha correctly.  There can be many reasons why the answer is wrong (system error, wrong entry, Mob Wars change, Mob Wars error, etc.), so to protect yourself from indefinitely entering a wrong answer, you can set a limit here.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("CaptchaSolvermintime");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Minimum Time", "This is the minimum amount of time allowed between requesting an answer to a captcha, and entering the answer.  If you receive an answer to your request in less then this amount of time, the script will wait until this amount of time has passed before it actually enters the answer.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("CaptchaSolvermaxtime");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Maximum Time", "This is the maximum amount of time allowed between requesting an answer to a captcha, and receiving an answer.  If the answer took longer then this amount of time, it will be ignored, and another will be requested.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("InYourMoblist");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Who's in Your Mob", "These are the mobs that are part of your mob family.  The script will learn these over time, and automatically add them here.  But if you know the mob ids of the mobs in your mob, you can add them manually as well.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("Enforcerlist");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("The Untouchables", "This is the list of those who are, in essence, untouchable.  It comes prepopulated with a few known enforcers that should be avoided.  If you want to hit your head against a brick wall, you can remove them here. (Making the list totally empty will put them back, so put a random number in here if you just want it basically ignored)  You can also add any if you find them.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("HitListBlockTimes");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Bounty Hunting OFF Times", "Do you like to leave the bounty hunting option running, but want to avoid certain times?  (For whatever reason, whether to look less like a bot, or because you're not there to answer the captchas (see the Captcha Solver(tm) service), or the hitlist is just ussually dead at that/those times.   Whatever the reason).  You can enter those times here.<br><br>  Non-donators can enter only one time period (of any length), Donators can enter any number of periods.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
	button = document.getElementById("droneTooWeakmemory");
	if (button) {
		button.addEventListener("mouseover", help = function(event) {
			HelpHover.show("Too Weak Memory", "The script watches the 'health'/'vitals' bar on the fight page of potential Mobs you may want to fight and avoids those that are shown as too weak to fight.  Unfortunately, Mob Wars doesn't always report the correct health level of the mobs, so the script will often attack those that are 'too weak to fight'.  To minimize this, the script will remember mobs that come up as too weak to fight, and will avoid them in the future.  How many mobs should it remember?<br><br>It is a FIFO queue (First In, First Out), so as more mobs are added to the list, the first ones are taken off.", event);
		},
		true);
		button.addEventListener("mouseout", HelpHover.hide, true);
	}
}
function PauseMobster() {
	var aT = "<img width=\"100px\" height=\"200px\" style=\"display:block;\" src=\"data:image/gif;base64,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\" alt=\"Mobster.gif\" id=\"PMobster\"/>";
	var aU = document.createElement("style");
	if (aU) {
		aU.type = "text/css";
		aU.innerHTML = "#Mobster { display: block; opacity:.95;filter: alpha(opacity=95); z-index: 99; position: fixed; top: 27px; right: 180px; }";
	}
	try {
		if (document) {
			var aV = document.getElementsByTagName("head");
			if (aV) {
				aV = aV[0];
			}
			if (aV) {
				if (aU) {
					aV.appendChild(aU);
				}
			}
		}
	} catch(e) {}
	var aW = document.createElement("div");
	if (aW) {
		aW.id = "Mobster";
		aW.innerHTML = aT;
	}
	if (UserPrefs.pmobsound) {
		if (UserPrefs.sndid != "none") {
			alertSound(UserPrefs.sndid, UserPrefs.sndrepeat);
			aW.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a style='background-color: white;' id='stoppmob'>Stop Sound</a>";
		}
	}
	if (document) {
		if (document.body) {
			if (aW) {
				document.body.insertBefore(aW, document.body.lastChild);
			}
		}
	}
	var aX = new Object;
	aX.PMobster = document.getElementById("PMobster");
	if (aX.PMobster) {
		aX.PMobster.addEventListener("mouseover", help = function(event) {
			HelpHover.show("The Pause Mobster", "If you have the system paused, and the script is waiting to perform an action (any action, including just refreshing the screen), this little guy comes out to..... take you out!<br><br>Ok, he won't actually do any harm to you, but he wants to remind you that you're paused, and that <font color=red>bad things happen</font> to those who \"fall asleep at the wheel\" of their mobs.<br><br><center><font color=grey>Defaults to showing<br>May be disabled in preferences.</font></center>", event);
		},
		true);
		aX.PMobster.addEventListener("mouseout", HelpHover.hide, true);
	}
	var aY = new Object;
	aY.stoppmob = document.getElementById("stoppmob");
	if (aY.stoppmob) {
		aY.stoppmob.addEventListener("click", clicked = function() {
			cur_f = Infinity;
			var aZ = document.getElementById("alertSound2");
			if (aZ) {
				aZ.parentNode.removeChild(aZ);
			}
		},
		true);
	}
}