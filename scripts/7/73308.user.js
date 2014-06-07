// ==UserScript==
// @name           ytdl
// @namespace      ftf.at.ua
// @description    download video from youtube
// @include        http://*.youtube.com/watch*
// ==/UserScript==
if (!yt && chrome && chrome.extension) {
	var scr=document.createElement("script");
	scr.src=chrome.extension.getURL("script.js");
	document.body.appendChild(scr);
} else {
(function(window) {

    function findposx(obj) {
        var curleft = 0;
        if (obj.offsetParent) {
            while (1) {
                curleft += obj.offsetLeft;
                if (!obj.offsetParent) {
                    break;
                }
                obj = obj.offsetParent;
            }
        } else if (obj.x) {
            curleft += obj.x;
        }
        return curleft;
    }

    function findPosY(obj) {
        var curtop = 0;
        if (obj.offsetParent) {
            while (1) {
                curtop += obj.offsetTop;
                if (!obj.offsetParent) {
                    break;
                }
                obj = obj.offsetParent;
            }
        } else if (obj.y) {
            curtop += obj.y;
        }
        return curtop;
    }
    //	some core functions: $,$x,$c,$q {{{1

    function $(x) {
        return document.getElementById(x)
    }

    function $x(xpath, root, cb) {
        root = root ? root : document;
        try {
            var a = document.evaluate(xpath, root, null, 7, null);
        } catch (e) {
            return [];
        }
        if (cb) {
            for (var i = 0; i < a.snapshotLength; i++) {
                cb(a.snapshotItem(i));
            }
            return a.snapshotLength;
        } else {
            var b = [];
            for (var i = 0; i < a.snapshotLength; i++) {
                b[i] = a.snapshotItem(i);
            }
            return b;
        }
    }

    function $c(type, params) {
        if (type == "#text" || type == "#") {
            return document.createTextNode(params);
        } else if (typeof(type) == "string" && type.substr(0, 1) == "#") {
            return document.createTextNode(type.substr(1));
        } else {
            var node = document.createElement(type);
        }
        for (var i in params) if (i == "kids") {
            for (var j in params[i]) {
                if (typeof(params[i][j]) == 'object') {
                    node.appendChild(params[i][j]);
                }
            }
        } else if (i == "#text") {
            node.appendChild(document.createTextNode(params[i]));
        } else {
            node.setAttribute(i, params[i]);
        }
        return node;
    }

    function $q(url, callback, postdata, asyn) {
        try {
            var xmlhttp = new XMLHttpRequest();
        } catch (e) {
            return 0;
        }
        var asyn = asyn === undefined ? 1 : asyn;
        var method = postdata ? "POST" : "GET";
        xmlhttp.open(method, url, asyn);
        xmlhttp.url = url;
        var bComplete;
        xmlhttp.onreadystatechange = function(e) {
            e = e.target;
            if (e.readyState == 4 && !bComplete) {
                bComplete = true;
                if (callback) callback(e);
            }
        };
        xmlhttp.send(postdata);
        return xmlhttp;
    }
    //}}}

    function searchdl(e) {
        var c = $c("a", {
            href: "javascript:void(0)",
            "#text": "[DL]",
            "class": "ldl"
        });
        var href = e.href;
        c.style.marginLeft = "5px";
        arr = $x(".//span[@class='title']", e);
        if (arr[0]) {
            arr[0].appendChild(c);
        } else {
            e.parentNode.appendChild(c);
        }
        delete(e);
        c.addEventListener("click", function(e) {
            do_searchdl(e, href)
        });
    }

    function do_searchdl(e, href) {
        var text = $q(href, 0, null, 0).responseText;
        var a = /"fmt_url_map": "([^"]*)"/.exec(text);
        if (!a) return;
        a = a[1];
        var arr = [],
            r;
        while (r = /(\d+)\|([^,]+)/g.exec(a))
        arr.push([0, r[2], formats[r[1]].description + " ." + formats[r[1]].format]);
        do_popup(arr, findPosX(e.target) + 10, findPosY(e.target) + 15);
    }

    function do_popup(fum, x, y, button_) {
        var t = $("dll");
        if (t) {
            t.parentNode.removeChild(t);
        }
        var popup = $c("div", {
            "id": "dll",
            "style": "padding:4px;border:1px solid #EAEAEA;border-radius:5px; position:absolute; text-align:left; background: #f1f1ff;display:none; z-index: 90001;"
        });
        for (var i = 0; i < fum.length; i++) {
            var t = fum[i];
            popup.appendChild($c("a", {
                "href": t.url,
                "#text": t.text
            }));
            popup.appendChild($c("br"));
        }
        document.body.appendChild(popup);
        if (button_) {
            button_.addEventListener("click", function(e) {
                $("dll").style.display = $("dll").style.display ? "" : "none";
                $("dll").style.left = x + "px";
                $("dll").style.top = y + "px";
                e.preventDefault();
            }, 0);
        } else {
            $("dll").style.display = "";
            $("dll").style.left = x + "px";
            $("dll").style.top = y + "px";
        }
        popup.addEventListener("click", function(e) {
            $("dll").style.display = "none";
        }, 1);
        popup.addEventListener("mouseout", function(e) {
            if (e.toElement != $("dll") && e.toElement.parentNode != $("dll")) {
                $("dll").style.display = "none";
            }
        }, 0);
        return popup;
    }
    var formats = {
        0: {
            description: "LQ",
            format: "flv"
        },
        5: {
            description: "LQ",
            format: "flv"
        },
        6: {
            description: "HQ",
            format: "flv"
        },
        13: {
            description: "LQ H.263",
            format: "3gpp"
        },
        15: {
            description: "Original",
            format: "mp4"
        },
        17: {
            description: "LQ MPEG-4",
            format: "3gpp"
        },
        18: {
            description: "HQ - iPod",
            format: "mp4"
        },
        22: {
            description: "720p",
            format: "mp4"
        },
        34: {
            description: "360p",
            format: "flv"
        },
        35: {
            description: "480p",
            format: "flv"
        },
        36: {
            description: "HQ MPEG-4",
            format: "3gpp"
        },
        37: {
            description: "1080p",
            format: "mp4"
        },
        38: {
            description: "original",
            format: "mp4"
        },
        43: {
            description: "360p",
            format: "webm"
        },
        44: {
            description: "480p",
            format: "webm"
        },
        45: {
            description: "720p",
            format: "webm"
        },
        46: {
            description: "720p/3D",
            format: "mp4"
        },
        84: {
            description: "720p/3D",
            format: "mp4"
        },
        102: {
            description: "720p/3D",
            format: "webm"
        },
        82: {
            description: "360p/3D",
            format: "mp4"
        },
        100: {
            description: "360p/3D",
            format: "webm"
        },
        83: {
            description: "480p/3D",
            format: "mp4"
        },
        101: {
            description: "480p/3D",
            format: "webm"
        },
    };
    ///program
    $x("(//li[@class='video-list-item ']|//div[@class='video-long-title'])/a", document, searchdl);

    if (!/\/watch/.exec(document.location.href)) return;
    var img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oEAw4sDkxT92QAAAJySURBVDjLhVM9TxtBEH17u3s2xiIGCSQiRZfeipUKLFoUkZ9Bkz7JH4jSpE3KFJH4A0gUVCiFfcgSdI7c4MLoQClihePjbO7su5vdSQGcRBDJSE872t2ZfW9mB/iP7e7ulv91Lv7eGAwGr6Mo+lStVgeVSuW367oqjuNJmqZPoih61mw2Xz2abX9///Px8TGPx2PO85yzLOMsywo/DEPu9/u8t7f34QGDVqvV9Tzv5eLiIgAgyzJYayGEgBACjuNAa40syxCGIYIg+LaxsfFGAEC/398UQmzNz89DKQVmxtraGpj55hUhYK3F4eEhpJQYj8e4vLxEo9EQCgCurq62lpeX4TgOrLWQUsLzPCilCnnMDCEEiAilUgnVahXtdrulAKBWq0FrXVBVShXUhbhRaa2FUgpEBAAol8uo1WpQ5+fniOMYWmtIKSGlhOu694LvzHVdOI6DPM+htcbs7OwPp9vtstYarutCa41SqQQpJYgIxpgCeZ5DKQWtNbTWha8ajcaXNE3fWmsBAKurqxBCYG5uDsaYezVYWVkBAPi+D2YGEcFZWlp6N51O23c6Dw4OUKlUQETI87wAEaFcLqPT6YCZwcxIkgTObRe2iajQ7Ps+kiTBZDIpEIYhfN+H4zjFPwnD8GdB8fT0lK+vrzlNUyYiZmau1+tcr9fZ8zy21rIxhqfTKUdRxEdHR9sAbhgAQBAE7SRJioTWWvR6PczMzCAIgqIOzIzRaPTr4uLi+4NZ6HQ6L4bD4dfJZMLGGDbGMBEVaxzHfHJystlqtd4/Oo0A0Ov1dhYWFnZuW/qciJ4mSTI8OzvDaDT6uL6+znd3/wBi23W60h83NQAAAABJRU5ErkJggg==";
    var styl = "height:16px;width:16px;display:inline-block;" + "margin:0px;" + "background-image:url(" + img + ")";
    var wa = $("vo") ? $("vo") : $("watch-actions");
    var bu1 = ($("rd") ? $("rd") : $("watch-share"));
    var button = $c("button", {
        "id": "dlb",
        "class": "yt-uix-button yt-uix-button-default",
        "style": "height:32px;margin:-1px 4px 0px 3px",
        "kids": [

        //		$c("span",{"#text":"Download","style":""}),
        $c("span", {
            "style": styl
        })]
    });
    wa.insertBefore(button, bu1.nextSibling);
	function parseq(s){
		var
		a = s.split("&"),
		o = {},
		i = a.length,
		k, l;
		while(i--){
			l = a[i];
			k = l.search("=");
			o[unescape(l.substr(0, k))] = unescape(l.substr(k + 1));
		}
		a = null;
		return o;
	}
	//player = $("movie_player"),
	//fum = parseq(player.getAttribute("flashvars"))["url_encoded_fmt_stream_map"];
	//fum = fum.split(",");
	//fum = yt.config_.PLAYER_CONFIG.args.url_encoded_fmt_stream_map.split(",");
    var
	fum = window.yt.playerConfig.args.url_encoded_fmt_stream_map.split(",");
	for(var i = fum.length;i--;){
		var
		fui = parseq(fum[i]),
		format = formats[fui.itag];
		if (format) {
			fui.text = format.description + " ." + format.format;
		} else {
			fui.text = "unkn " + fui.itag;
		}
		fum[i] = fui;
	}
	do_popup(fum, ($("dlb").offsetLeft + 10), ($("dlb").offsetTop + 26), button);
})(typeof unsafeWindow !="undefined" ? unsafeWindow : window);
}
