// ==UserScript==
// @name        redmine_allactivity
// @namespace   https://fluidapp.com
// @description This script is an alert script for redmine all activity that does growl and badges
// @include     */projects/activity
// @include     */projects/activity?*
// @author      Tanguy de Courson
// ==/UserScript==
/* === GETELEMENTSBYCLASSNAME ===
   Developed by Robert Nyman, http://www.robertnyman.com
   Code/licensing: http://code.google.com/p/getelementsbyclassname/
   ============================== */


var getElementsByClassName = function(className, tag, elm) {
    if (document.getElementsByClassName) {
        getElementsByClassName = function(className, tag, elm) {
            elm = elm || document;
            var elements = elm.getElementsByClassName(className),
            nodeName = (tag) ? new RegExp("\\b" + tag + "\\b", "i") : null,
            returnElements = [],
            current;
            for (var i = 0, il = elements.length; i < il; i += 1) {
                current = elements[i];
                if (!nodeName || nodeName.test(current.nodeName)) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    }
    else if (document.evaluate) {
        getElementsByClassName = function(className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
            classesToCheck = "",
            xhtmlNamespace = "http://www.w3.org/1999/xhtml",
            namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace) ? xhtmlNamespace: null,
            returnElements = [],
            elements,
            node;
            for (var j = 0, jl = classes.length; j < jl; j += 1) {
                classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
            }
            try {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
            }
            catch(e) {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
            }
            while ((node = elements.iterateNext())) {
                returnElements.push(node);
            }
            return returnElements;
        };
    }
    else {
        getElementsByClassName = function(className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
            classesToCheck = [],
            elements = (tag === "*" && elm.all) ? elm.all: elm.getElementsByTagName(tag),
            current,
            returnElements = [],
            match;
            for (var k = 0, kl = classes.length; k < kl; k += 1) {
                classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
            }
            for (var l = 0, ll = elements.length; l < ll; l += 1) {
                current = elements[l];
                match = false;
                for (var m = 0, ml = classesToCheck.length; m < ml; m += 1) {
                    match = classesToCheck[m].test(current.className);
                    if (!match) {
                        break;
                    }
                }
                if (match) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    }
    return getElementsByClassName(className, tag, elm);
};

/* === //GETELEMENTSBYCLASSNAME === */

   

/* === GETCOOKIE, SETCOOKIE and DELETECOOKIE ===
   Wanted to use GM_setValue and GM_getValue but both didn’t work with
   GreaseKit. So I had to use cookies which fortunately worked.
   Those tree functions were found at dustindiaz.com:
   http://www.dustindiaz.com/top-ten-javascript/
   ============================== */

function getCookie(name) {
    var start = document.cookie.indexOf(name + "=");
    var len = start + name.length + 1;
    if ((!start) && (name != document.cookie.substring(0, name.length))) {
        return null;
    }
    if (start == -1) return null;
    var end = document.cookie.indexOf(';', len);
    if (end == -1) end = document.cookie.length;
    return unescape(document.cookie.substring(len, end));
}

function setCookie(name, value, expires, path, domain, secure) {
    var today = new Date();
    today.setTime(today.getTime());
    if (expires) {
        expires = expires * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date(today.getTime() + (expires));
    document.cookie = name + '=' + escape(value) +
    ((expires) ? ';expires=' + expires_date.toGMTString() : '') +
    //expires.toGMTString()
    ((path) ? ';path=' + path: '') +
    ((domain) ? ';domain=' + domain: '') +
    ((secure) ? ';secure': '');
}

function deleteCookie(name, path, domain) {
    if (getCookie(name)) document.cookie = name + '=' +
    ((path) ? ';path=' + path: '') +
    ((domain) ? ';domain=' + domain: '') +
    ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
}


(function () {
    if (window.fluid) {
		// do yer thang!
		
		
		//do style
		var tmpElm = document.createElement("style");
        tmpElm.setAttribute("type", "text/css");
        tmpElm.appendChild(document.createTextNode('#header{display:none!important;}'));
		document.getElementsByTagName('head')[0].appendChild(tmpElm);
		
		
		 var lastone = getCookie("lastid");
	//alert("lastone:" + lastone);

	        if (lastone == null) {
	            lastone = 0;
	        }
	//lastone = 0; //debug lastone bad idea to hit everything but oh well
		var contents = document.getElementsByTagName("dt");
		var firstcontentid = contents[0].getAttribute('id');
		setCookie("lastid", firstcontentid, 1, '/');
		var badgecount = getCookie('badgecount');
		if(!badgecount)
			badgecount = 0;
	//	alert(lastone + ':' + currentid + ':' + firstcontentid);
		//1239327311:undefined:1239476461
		//1239327311:undefined:1239476461
		for(var i=0; i < contents.length; i++)
		{
			//alert(lastone + ':' + currentid);
			var thiscontent = contents[i];
			var currentid = thiscontent.getAttribute('id');
			if(!currentid)
				continue;
			if(currentid > lastone)
			{
				//alert(lastone + ':' + currentid);
				badgecount++;
				var thistitle = thiscontent.getElementsByTagName('span')[1].innerText ;
                var thisbody = thiscontent.getElementsByTagName('a')[0].innerText;
                var thisicon = thiscontent.parentNode.getElementsByTagName('img')[0].getAttribute('src');
				//var thispriority = (thisbody.indexOf(thisuser) == -1) ? 0 : 1;
				var thispriority =  0;
				window.fluid.showGrowlNotification({
                    title: thistitle,
                    description: thisbody,
                    priority: thispriority,
                    sticky: false,
                    identifier: "redminenotice" + currentid,
                    icon: thisicon
                });
			}
		}
		if(badgecount > 0)
		{
    		setCookie('badgecount', badgecount);
			window.fluid.dockBadge = badgecount;
		}
		
		
		
    }
})();

window.onfocus = clearbadge_timer;
window.onblur = clearbadge_stop;

var focused = false;
function clearbadge_timer()
{
	focused = true;
	setTimeout(clearbadge, 2000);
}
function clearbadge()
{
	if(focused)
	{
		window.fluid.dockBadge = '';
		setCookie('badgecount', '');
	}
}
function clearbadge_stop()
{
	
	focused = false;
}