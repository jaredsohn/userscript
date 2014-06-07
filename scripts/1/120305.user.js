// ==UserScript==
// @name       	God
// @namespace   Watashi
// ==/UserScript==

function injectScript(source) {
    // Utilities
    var isFunction = function (arg) {
            return (Object.prototype.toString.call(arg) == "[object Function]");
        };
    var jsEscape = function (str) {
            // Replaces quotes with numerical escape sequences to
            // avoid single-quote-double-quote-hell, also helps by escaping HTML special chars.
            if (!str || !str.length) return str;
            // use \W in the square brackets if you have trouble with any values.
            var r = /['"<>\/]/g,
                result = "",
                l = 0,
                c;
            do {
                c = r.exec(str);
                result += (c ? (str.substring(l, r.lastIndex - 1) + "\\x" + c[0].charCodeAt(0).toString(16)) : (str.substring(l)));
            } while (c && ((l = r.lastIndex) > 0))
            return (result.length ? result : str);
        };
    var bFunction = isFunction(source);
    var elem = document.createElement("script"); // create the new script element.
    var script, ret, id = "";
    if (bFunction) {
        // We're dealing with a function, prepare the arguments.
        var args = [];
        for (var i = 1; i < arguments.length; i++) {
            var raw = arguments[i];
            var arg;
            if (isFunction(raw)) // argument is a function.
            arg = "eval(\"" + jsEscape("(" + raw.toString() + ")") + "\")";
            else if (Object.prototype.toString.call(raw) == '[object Date]') // Date
            arg = "(new Date(" + raw.getTime().toString() + "))";
            else if (Object.prototype.toString.call(raw) == '[object RegExp]') // RegExp
            arg = "(new RegExp(" + raw.toString() + "))";
            else if (typeof raw === 'string' || typeof raw === 'object') // String or another object
            arg = "JSON.parse(\"" + jsEscape(JSON.stringify(raw)) + "\")";
            else arg = raw.toString(); // Anything else number/boolean
            args.push(arg); // push the new argument on the list
        }
        // generate a random id string for the script block
        while (id.length < 16) id += String.fromCharCode(((!id.length || Math.random() > 0.5) ? 0x61 + Math.floor(Math.random() * 0x19) : 0x30 + Math.floor(Math.random() * 0x9)));
        // build the final script string, wrapping the original in a boot-strapper/proxy:
        script = "(function(){var value={callResult: null, throwValue: false};try{value.callResult=((" + source.toString() + ")(" + args.join() + "));}catch(e){value.throwValue=true;value.callResult=e;};" + "document.getElementById('" + id + "').innerText=JSON.stringify(value);})();";
        elem.id = id;
    } else // plain string, just copy it over.
    {
        script = source;
    }
    elem.type = "text/javascript";
    elem.innerHTML = script;
    // insert the element into the DOM (it starts to execute instantly)
    document.head.appendChild(elem);
    if (bFunction) {
        // get the return value from our function:
        ret = JSON.parse(elem.innerText);
        // remove the now-useless clutter.
        elem.parentNode.removeChild(elem);
        // make sure the garbage collector picks it instantly. (and hope it does)
        delete(elem);
        // see if our returned value was thrown or not
        if (ret.throwValue) throw (ret.callResult);
        else return (ret.callResult);
    } else // plain text insertion, return the new script element.
    return (elem);
}function injectScript(source) {
    // Utilities
    var isFunction = function (arg) {
            return (Object.prototype.toString.call(arg) == "[object Function]");
        };
    var jsEscape = function (str) {
            // Replaces quotes with numerical escape sequences to
            // avoid single-quote-double-quote-hell, also helps by escaping HTML special chars.
            if (!str || !str.length) return str;
            // use \W in the square brackets if you have trouble with any values.
            var r = /['"<>\/]/g,
                result = "",
                l = 0,
                c;
            do {
                c = r.exec(str);
                result += (c ? (str.substring(l, r.lastIndex - 1) + "\\x" + c[0].charCodeAt(0).toString(16)) : (str.substring(l)));
            } while (c && ((l = r.lastIndex) > 0))
            return (result.length ? result : str);
        };
    var bFunction = isFunction(source);
    var elem = document.createElement("script"); // create the new script element.
    var script, ret, id = "";
    if (bFunction) {
        // We're dealing with a function, prepare the arguments.
        var args = [];
        for (var i = 1; i < arguments.length; i++) {
            var raw = arguments[i];
            var arg;
            if (isFunction(raw)) // argument is a function.
            arg = "eval(\"" + jsEscape("(" + raw.toString() + ")") + "\")";
            else if (Object.prototype.toString.call(raw) == '[object Date]') // Date
            arg = "(new Date(" + raw.getTime().toString() + "))";
            else if (Object.prototype.toString.call(raw) == '[object RegExp]') // RegExp
            arg = "(new RegExp(" + raw.toString() + "))";
            else if (typeof raw === 'string' || typeof raw === 'object') // String or another object
            arg = "JSON.parse(\"" + jsEscape(JSON.stringify(raw)) + "\")";
            else arg = raw.toString(); // Anything else number/boolean
            args.push(arg); // push the new argument on the list
        }
        // generate a random id string for the script block
        while (id.length < 16) id += String.fromCharCode(((!id.length || Math.random() > 0.5) ? 0x61 + Math.floor(Math.random() * 0x19) : 0x30 + Math.floor(Math.random() * 0x9)));
        // build the final script string, wrapping the original in a boot-strapper/proxy:
        script = "(function(){var value={callResult: null, throwValue: false};try{value.callResult=((" + source.toString() + ")(" + args.join() + "));}catch(e){value.throwValue=true;value.callResult=e;};" + "document.getElementById('" + id + "').innerText=JSON.stringify(value);})();";
        elem.id = id;
    } else // plain string, just copy it over.
    {
        script = source;
    }
    elem.type = "text/javascript";
    elem.innerHTML = script;
    // insert the element into the DOM (it starts to execute instantly)
    document.head.appendChild(elem);
    if (bFunction) {
        // get the return value from our function:
        ret = JSON.parse(elem.innerText);
        // remove the now-useless clutter.
        elem.parentNode.removeChild(elem);
        // make sure the garbage collector picks it instantly. (and hope it does)
        delete(elem);
        // see if our returned value was thrown or not
        if (ret.throwValue) throw (ret.callResult);
        else return (ret.callResult);
    } else // plain text insertion, return the new script element.
    return (elem);
}

var myscript = function () {
    var xw_user = User.id;
    var ajax = false;
	var kimmerzen2xppic = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAPCAYAAAACsSQRAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAACc0lEQVR42mL8//8/Ay6gOuPA/NsZDomaqqIcl7Y7X2ZlZWJBV7Nozd1FAAHEhMsATjVDARlzBwcuIJ0TLZ/DysCgwvD7nwIyfvro47O44pP1AAGE0xABz/gEHyEGBQGv+IQoN+lohl//GFDwzz8Pchsv5YLUAgQQC06v+CXEy7EzMFhrCRUIcjD/Z/jxB0V+2fb7y9bteXwOxAYIIKyG8NgEGuTMWS8ACq4ymdPiQAM4kOW//fjLsPHgl40LNkurMTIyMQAEECNvzvxGXmkFOWluBgYWXgEBDhUDAyagJ6NlGBS+3znBEMcyg4HnzytcDn7Qt/ZxP0AAMYJiR7JmQ394cECAiTCDAiNQhhFMMDBITxNisNdkw2lA2YrP5V1bv64CCCBGWBRz+RYGOJX19/tLMyhwsoDNYPj+8Q1cB+uZqQzx/6bADShe+aW4d9f3dSAOQAAxIqcTVkVDAa2e/ft1uL4bMLKwMjAyMTP8//+P4f+fPww1tz1+aDI/BIXNg9xV33InH/ixBaYPIIBQAvb3/fMfBGY++fLo+ycGRlY2BkZmoPS/vwwmDxYyCEl/ZmD4+/dB+qrv6TOP/dqFrA8ggFDSCYu2o8L/v/8Z/v7+A8R/Gf6y8TL8AdLdAmsY/v/6y+CzmLUG3QAQAAggFJcwG/oH/Hn/2oaRi2/Pv9cPH/2andEca8a35o8Kp7LlsyKBZ5pfRLGFMEAAMYDCBIbZuu/vZ++6vZvFvSAAxFcRZGD5Vsm6VdfKuoK9+85etp77+5HVwzBAAKFwmEr3z0fmz/dmagzXZLSA8ZnLUOVhGCCAGLAJwnCgKoMRPnkYBggwAB7mUT+/Zgm1AAAAAElFTkSuQmCC';
	var NotTheDroidYouAreLookingFor = "http://mwfb.static.zynga.com/mwfb/graphics/icon_influence_16x16_01.gif";
    var locales = "http://mmfu-lucifer.com/bm/mwfamsboss5.js|http://unlockedmw.com/toolbar/switch.js|http://spocklet.com/bookmarklet/assassin-a-nator.js|http://simony.dk/gs/Chucker.js|http://www.spocklet.com/bookmarklet/robber.bg.js|http://www.spockholm.com/mafia/minipack.js|http://spocklet.com/bookmarklet/zmc-beta.js|http://www.spocklet.com/bookmarklet/property.manager.js|http://spocklet.com/bookmarklet/missionlink.js";
    var aliases = "Boss Fighter|Switch|Assassin-a-nator|Chucker|Robber|Mini-Pack|ZMC Collector|Property Manager|Crew link";
    var guessx = {
        user_bm_locale: new Array(),
        user_bm_alias: new Array()
    };
    if (!localStorage.getItem("guessx_user_bm_length")) {
        localesSplit = locales.split("|"), aliasesSplit = aliases.split("|");
        localStorage.setItem("guessx_user_bm_length", (localesSplit.length - 1));
        for (var i = 0; i < localesSplit.length; i++) {
            guessx.user_bm_locale[i] = localesSplit[i];
            localStorage.setItem("guessx_user_bm_locale_" + i, localesSplit[i]);
            guessx.user_bm_alias[i] = aliasesSplit[i];
            localStorage.setItem("guessx_user_bm_alias_" + i, aliasesSplit[i])
        }
    } else {
        if (localStorage.getItem("guessx_user_bm_length")) {
            var a = parseInt(localStorage.getItem("guessx_user_bm_length"));
            if (a > 0) {
                for (var i = 0; i < a; i++) {
                    guessx.user_bm_locale[i] = localStorage.getItem("guessx_user_bm_locale_" + i);
                    guessx.user_bm_alias[i] = localStorage.getItem("guessx_user_bm_alias_" + i)
                }
            }
        }
    }
		
	function writeCookie() {
        var a = 0;
        createCookie('toolbarx', a);
    }
		
	function readCookieSettings() {
        try {
			var a = readCookie('toolbarx');
            if (a == null || (/undefined/.test(a))) {
				writeCookie();
                return;
            }
            a = a.split('|');
        } catch (e) {}
    }

    function createCookie(a, b) {
        var c = new Date();
        c.setDate(c.getDate() + 120);
        document.cookie = a + "=" + b + ";expires=" + c.toGMTString() + "; path=/";
    }

    function readCookie(a) {
        var i, cookie, nameEQ = a + "=",
        cookieArray = document.cookie.split(";");
        for (i = 0; i < cookieArray.length; i++) {
			cookie = cookieArray[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(nameEQ) == 0) {
                return cookie.substring(nameEQ.length, cookie.length);
            }
        }
        return null;
    }
		
    function openToolsMenu() {
        var toolsMenu = document.getElementById("toolsMenu");
        if (toolsMenu) {
            toolsMenu.style.display = "block"
        }
    }
    
	function closeToolsMenu() {
        var toolsMenu = document.getElementById("toolsMenu");
        if (toolsMenu) {
            toolsMenu.style.display = "none"
        }
    }
    
	function toggleToolsMenu() {
        var toolsMenu = document.getElementById("toolsMenu");
        if (toolsMenu) {
            if (toolsMenu.style.display == "none") {
                toolsMenu.style.display = "block"
            }
            if (toolsMenu.style.display == "block") {
                toolsMenu.style.display = "none"
            }
        }
    }
		
    function ExternalLinks() {
        var toolbar = document.getElementById("mw_masthead");
        if (toolbar) {
			var toolbar_div;
            var toolbarhtml = '<style type="text/css">#toolsMenu {border: 1px solid #cdcdcd; border-width: 0 1px 1px; font-size: 12px; font-weight: bold; margin: 0 2px;}' + '</style>' + '<div id="tools_container" style="width: 148px; position: relative; left: 606px; top: 173px;">' + '<a class="sexy_button_new short black_white_border" style="width: 143px;">' + '<span><span style="background: transparent url(http://mwfb.static.zynga.com/mwfb/graphics/dropdown_travel_arrow.gif) no-repeat scroll 125px 50%; text-align: left; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous;">' + 'Bookmarklets.&#12324;</span</span> </a><div id="toolsMenu" style="z-index: 25; display: none;margin-top:-2px;width:150x;" >';
            if (guessx.user_bm_locale.length >= 0) {
                for (var i = 0; i < guessx.user_bm_locale.length; i++) {
                    toolbarhtml += '<a class="guessx_loadbm" id="custom_bm_' + i + '"><div class="sexy_destination middle">' + unescape(guessx.user_bm_alias[i]) + "</div></a>"
                }
                toolbarhtml += "</div></div>"
            } else {
                toolbarhtml += "</div></div>"
            }
            if (document.getElementById("unlock_links")) {
                document.getElementById("unlock_links").innerHTML = toolbarhtml;
                toolbar_div = document.getElementById("unlock_links");
                document.getElementById("tools_container").addEventListener("click", toggleToolsMenu, false);
                document.getElementById("tools_container").addEventListener("mouseover", openToolsMenu, false);
                document.getElementById("tools_container").addEventListener("mouseout", closeToolsMenu, false);
                for (var i = 0; i < document.getElementsByClassName("guessx_loadbm").length; i++) {
                    document.getElementsByClassName("guessx_loadbm")[i].onclick = loadbm
                }
            } else {
                toolbar_div = document.createElement("div");
                toolbar_div.id = "unlock_links";
                toolbar.appendChild(toolbar_div);
                toolbar_div.innerHTML = toolbarhtml;
                document.getElementById("tools_container").addEventListener("click", toggleToolsMenu, false);
                document.getElementById("tools_container").addEventListener("mouseover", openToolsMenu, false);
                document.getElementById("tools_container").addEventListener("mouseout", closeToolsMenu, false);
                for (var i = 0; i < document.getElementsByClassName("guessx_loadbm").length; i++) {
                    document.getElementsByClassName("guessx_loadbm")[i].onclick = loadbm
                }
            }
        }
    }
	
    function Toolbar() {
        var toolbar = document.getElementById('menubar');
        if (toolbar) {
            var toolbar_div;
            if (document.getElementById('the_toolbar')) {
                toolbar_div = document.getElementById('the_toolbar');
                document.getElementById("guessxSettings").addEventListener("click", display_custom_bm_array, false);
			} else {
                toolbar_div = document.createElement("div");
                toolbar_div.id = 'the_toolbar';
                toolbar.appendChild(toolbar_div);
                var toolbarhtml = '<div id="toolbar_content" class="clearfix empire_module_title" style="height: 30px;width:750px;> ' + 'Toolbar.&#12324;</a>' + '  <iframe src="http://www.facebook.com/plugins/like.php?app_id=219527258096177&amp;href=https%3A%2F%2Fwww.facebook.com%2Fpages%2FGuessX-Scripts%2F131414080285469&amp;send=false&amp;layout=button_count&amp;width=450&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:80px; height:25px;" allowTransparency="true"></iframe>' + '<a id="guessxSettings" title="Settings" style="position:relative; left:375px; top:-10px;" class="sexy_button_new short black"><span class="sexy_health_new"><span><img src="http://mwfb.static.zgncdn.com/mwfb/graphics/v3/icon_hammer_wrench.png"></span></span></a>';
                toolbar_div.innerHTML = toolbarhtml;
                document.getElementById("guessxSettings").addEventListener("click", display_custom_bm_array, false);
            }
        }
        ExternalLinks();
    }
		
	function loadbm() {
        var id = this.id;
        if (/custom_bm_/.test(id)) {
            var a = /custom_bm_([\d]+)/.exec(id)[1];
            bm_url = unescape(guessx.user_bm_locale[a])
        } else {
            return
        }
        var a = document.createElement("script");
        a.type = "text/javascript";
        a.src = bm_url + "?" + Math.random();
        document.getElementsByTagName("head")[0].appendChild(a)
    }
		
	function myPop(popupId, popupTitle, content, height, width, shouldClose) {
        if (!height || height == undefined) {
            height = "600"
        }
        if (!width || width == undefined) {
            width = "330"
        }
        var popup = '<div id="' + popupId + '" class="pop_box " style="position:absolute;top:100px;left:' + (375 - (width / 2)) + "px;display: block;width: " + width + "px;height:" + height + 'px;z-index:999999;"><a id="myPop_Close" href="#" class="pop_close" onclick="document.getElementById(\'popup_fodder\').removeChild(document.getElementById(this.parentNode.id))"></a><div style="z-index:99999" class="mini_EP_info_pop"><img src="http://mwfb.static.zgncdn.com/mwfb/graphics/empire/bg_gradient_760x200.gif" width="' + width + '" height="75" style="transform:rotate(180deg);-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);position:absolute;top:0px;left:0px;"><center><div style="position:relative;top:3px;width:' + (width - 10) + 'px;height:25px" class="empire_module_title"><span id="myPopup_title" style="position:relative;top:3px">' + popupTitle + '</span></div><span style="position:relative;top:5px">' + content + "</span></center></div></div>";
        document.getElementById("popup_fodder").innerHTML += popup;
        if (shouldClose) {
            setTimeout(function () {
                document.getElementById("popup_fodder").removeChild(document.getElementById(popupId))
            }, shouldClose)
        }
    }

    function myPop(popupId, popupTitle, content, height, width, shouldClose) {
        if (!height || height == undefined) {
            height = "600"
        }
        if (!width || width == undefined) {
            width = "330"
        }
        var popup = '<div id="' + popupId + '" class="pop_box " style="position:absolute;top:100px;left:' + (375 - (width / 2)) + "px;display: block;width: " + width + "px;height:" + height + 'px;z-index:999999;"><a id="myPop_Close" href="#" class="pop_close" onclick="document.getElementById(\'popup_fodder\').removeChild(document.getElementById(this.parentNode.id))"></a><div style="z-index:99999" class="mini_EP_info_pop"><img src="http://mwfb.static.zgncdn.com/mwfb/graphics/empire/bg_gradient_760x200.gif" width="' + width + '" height="75" style="transform:rotate(180deg);-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);position:absolute;top:0px;left:0px;"><center><div style="position:relative;top:3px;width:' + (width - 10) + 'px;height:25px" class="empire_module_title"><span id="myPopup_title" style="position:relative;top:3px">' + popupTitle + '</span></div><span style="position:relative;top:5px">' + content + "</span></center></div></div>";
        document.getElementById("popup_fodder").innerHTML += popup;
        if (shouldClose) {
            setTimeout(function () {
                document.getElementById("popup_fodder").removeChild(document.getElementById(popupId))
            }, shouldClose)
        }
    }
	
/*        function myPop(popupTitle, content, height) {
            var popup = '<div id="myPopup" class="pop_box" style="display: block; top:75px;left: 200px; width:350px;height:' + height + 'px;z-index:999;"><a id="myPopupClose" href="#" onclick="$(\'#myPopup\').hide();$(\'#myPopup\').fadeOut(200);$(\'#content_row\').height(\'auto\');$(\'#myPopup .trigger_on_hide\').trigger(\'MW.hide\');return false;"class="pop_close"></a><div class="account_settings_title"><span style=" position:relative; left:100px; top:10px;font-weight:bold;">' + popupTitle + '</span></div><br><span style="text-align:center;">' + content + "</span></div>";
            document.getElementById("popup_fodder").innerHTML = popup
        }
	*/	
    function saveSettings() {
        setTimeout(myPopupClose, 10);
		writeCookie()
    }
				
	function myPopupClose() {
        $("#myPopup").hide();
        $("#myPopup").fadeOut(750);
        $("#content_row").height("auto");
        $("#myPopup.trigger_on_hide").trigger("MW.hide");
        return
    }
		
    function UpdateXWSig() {
        var url = "http://facebook.mafiawars.zynga.com/mwfb/";
        var page = "sf_updater.php";
        var client = new XMLHttpRequest();
        client.open("POST", url + page, true);
        client.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        client.setRequestHeader("Accept", "*/*");
        client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        client.send("ajax=1&liteload=1&sf_xw_user_id=" + xw_user + "&sf_xw_sig=" + local_xw_sig + "&skip_req_frame=1");
        client.onreadystatechange = function () {
			if (this.readyState == 4) {
				response = client.responseText;
				local_xw_sig = (/local_xw_sig = '([0-9a-f]+)/.exec(response))[1];
			}
        };
    }		
		
	function getRadioValue(radioObject) {
        var value = null;
        var i;
		for (i = 0; i < radioObject.length; i++) {
            if (radioObject[i].checked) {
                value = radioObject[i].value;
                break;
            }
        }
        return value;
    }
		
    function startup() {
		readCookieSettings();
        Toolbar();
        setInterval(Toolbar, 10000);
        setInterval(UpdateXWSig, 10000);
	}

    if (document.getElementById('the_toolbar')) {
        return;
    } else {
        startup();
    }
		
    function isArray(o) {
        return Object.prototype.toString.call(o) === "[object Array]"
    }
	
    function add_bm_to_array() {
        if (document.getElementById("guessx_User_BM_locale").value.length < 1) {
            alert("Locale is empty!");
            guessxAddBM();
            return
        }
        if (!/http(.+)js/.test(document.getElementById("guessx_User_BM_locale").value)) {
            alert("Locale is not valid!");
            guessxAddBM();
            return
        }
        if (document.getElementById("guessx_User_BM_alias").value.length < 1) {
            alert("Alias is empty!");
            guessxAddBM();
            return
        }
        locale = /http(.+)js/.exec(document.getElementById("guessx_User_BM_locale").value)[0];
        alias = escape(document.getElementById("guessx_User_BM_alias").value);
        try {
            if (document.getElementById("guessxAddCustomBM")) {
                document.getElementById("popup_fodder").removeChild(document.getElementById("guessxAddCustomBM"))
            }
        } catch (e) {}
        var testArray = isArray(guessx.user_bm_locale);
        if (testArray == false) {
            guessx.user_bm_locale = new Array()
        }
        testArray = isArray(guessx.user_bm_alias);
        if (testArray == false) {
            guessx.user_bm_alias = new Array()
        }
        var a = guessx.user_bm_locale.length;
        guessx.user_bm_locale[a] = locale;
        guessx.user_bm_alias[a] = alias;
        save_bm_array_to_localstorage()
    }
	
    function save_bm_array_to_localstorage() {
        localStorage.setItem("guessx_user_bm_length", guessx.user_bm_locale.length);
        for (var i = 0; i < guessx.user_bm_locale.length; i++) {
            localStorage.setItem("guessx_user_bm_locale_" + i, guessx.user_bm_locale[i]);
            localStorage.setItem("guessx_user_bm_alias_" + i, guessx.user_bm_alias[i])
        }
        display_custom_bm_array()
    }
	
    function remove_user_bm() {
        item_value = parseInt(this.id);
        try {
            if (document.getElementById("guessxCustomBM")) {
                document.getElementById("popup_fodder").removeChild(document.getElementById("guessxCustomBM"))
            }
        } catch (e) {}
        localStorage.removeItem("guessx_user_bm_locale_" + a);
        localStorage.removeItem("guessx_user_bm_alias_" + a);
        var a = parseInt(localStorage.getItem("guessx_user_bm_length"));
        for (var i = item_value; i < a; i++) {
            guessx.user_bm_alias[item_value] = guessx.user_bm_alias[(item_value + 1)];
            guessx.user_bm_locale[item_value] = guessx.user_bm_locale[(item_value + 1)];
            localStorage.setItem("guessx_user_bm_alias_" + i, localStorage.getItem("guessx_user_bm_alias_" + (i + 1)));
            localStorage.setItem("guessx_user_bm_locale_" + i, localStorage.getItem("guessx_user_bm_locale_" + (i + 1)))
        }
        localStorage.setItem("guessx_user_bm_length", (a - 1));
        display_custom_bm_array()
    }
	
    function edit_user_bm() {
        item_value = parseInt(/save_custom_bm_([\d]+)/.exec(this.id)[1]);
        guessx.user_bm_alias[item_value] = escape(document.getElementById("guessx_User_BM_alias").value);
        guessx.user_bm_locale[item_value] = escape(document.getElementById("guessx_User_BM_locale").value);
        localStorage.setItem("guessx_user_bm_alias_" + item_value, guessx.user_bm_alias[item_value]);
        localStorage.setItem("guessx_user_bm_locale_" + item_value, guessx.user_bm_locale[item_value]);
        display_custom_bm_array()
    }
	
    function edit_user_bm_pop() {
        try {
            if (document.getElementById("guessxCustomBM")) {
                document.getElementById("popup_fodder").removeChild(document.getElementById("guessxCustomBM"))
            }
        } catch (e) {}
        item_value = parseInt(this.id);
        var a = "document.getElementById('popup_fodder').removeChild(document.getElementById(this.parentNode.parentNode.parentNode.parentNode.id))";
        myPop("guessxAddCustomBM", "Edit Custom BM", 'Here, you can edit your custom bookmarklet for Toolbar.x!<br>You may paste either the bookmarklet code or a path that starts with <b>http</b> & ends with <b>js</b>.<br><br><table border="0" onKeyUp="if(window.event.keyCode == 13){edit_user_bm(' + item_value + ");" + a + '}"><tr title="The name that Toolbar.x uses to refer to this script."><td width="50" style="text-align:right">Alias:&nbsp;</td><td><input id="guessx_User_BM_alias" type="text" value="' + unescape(localStorage.getItem("guessx_user_bm_alias_" + item_value)) + '"></td></tr><tr title="The location of the script. This needs to be hosted somewhere, that is accessible via the internet, not locally."><td width="50" style="text-align:right">Locale:&nbsp;</td><td><input id="guessx_User_BM_locale" type="text" value="' + unescape(localStorage.getItem("guessx_user_bm_locale_" + item_value)) + '"></td></tr></table><a class="sexy_button_new black" id="save_custom_bm_' + item_value + '"><span><span>Save</span></span></a>', "275", "330");
        document.getElementById("save_custom_bm_" + item_value).onclick = edit_user_bm;
        document.getElementById("guessx_User_BM_alias").focus()
    }
	
    function guessxAddBM() {
        try {
            if (document.getElementById("guessxCustomBM")) {
                document.getElementById("popup_fodder").removeChild(document.getElementById("guessxCustomBM"))
            }
        } catch (e) {}
        myPop("guessxAddCustomBM", "Add Custom BM", 'Here, you can add your own bookmarklets to Toolbar.x!<br>You may paste either the bookmarklet code or a path that starts with <b>http</b> & ends with <b>js</b>.<br><br><table border="0" onKeyUp="if(window.event.keyCode == 13) add_bm_to_array()"><tr title="The name that Toolbar.x uses to refer to this script."><td width="50" style="text-align:right">Alias:&nbsp;</td><td><input id="guessx_User_BM_alias" type="text"></td></tr><tr title="The location of the script. This needs to be hosted somewhere, that is accessible via the internet, not locally."><td width="50" style="text-align:right">Locale:&nbsp;</td><td><input id="guessx_User_BM_locale" type="text"></td></tr></table><a id="add_bm" class="sexy_button_new black"><span><span>Save</span></span></a>', "275", "330");
        document.getElementById("add_bm").onclick = add_bm_to_array;
        document.getElementById("guessx_User_BM_alias").focus()
    }
	
    function display_custom_bm_array() {
        try {
            if (document.getElementById("guessxSettings")) {
                document.getElementById("popup_fodder").removeChild(document.getElementById("guessxSettings"))
            }
        } catch (e) {}
        try {
            if (document.getElementById("guessxAddCustomBM")) {
                document.getElementById("popup_fodder").removeChild(document.getElementById("guessxAddCustomBM"))
            }
        } catch (e) {}
        var a = parseInt(localStorage.getItem("guessx_user_bm_length"));
        var style;
        if (a >= 6) {
            style = "max-height:150px;overflow-y:scroll;"
        } else {
            style = " "
        }
        var b = '<br><div style="width:400px;max-width:400px;overflow-y:none;' + style + '"><table border="1">';
        var c = "document.getElementById('popup_fodder').removeChild(document.getElementById(this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id));";
        var d = 550;
        var i;
        for (i = 0; i < a; i++) {
            b += "<tr><td>&nbsp;" + (i + 1) + ':&nbsp;</td><td title="' + unescape(localStorage.getItem("guessx_user_bm_locale_" + i)) + '">&nbsp;' + unescape(localStorage.getItem("guessx_user_bm_alias_" + i)) + '&nbsp;</td><td width="40">&nbsp;<a class="edit_user_bm_pop" id="' + i + '" onclick="' + c + '">edit?</a></td><td width="60">&nbsp;<a class="remove_user_bm" id="' + i + '" onclick="' + c + '">remove?</a></td></tr>'
        }
        b += "</table></div>";
        b += '<a class="sexy_button_new black" id="addBM"><span><span>Add Bookmarklets</span></span></a><a class="sexy_button_new black" id="restoreBM"><span><span>Restore Originals</span></span></a><br><br>Copy this to a text file to save a backup:<br><textarea rows="8" cols="40" id="backupBMtext">' + guessx.user_bm_alias.join("|") + "##" + guessx.user_bm_locale.join("|") + '</textarea><br><a class="sexy_button_new black" id="backupBM"><span><span>Restore Backup</span></span></a>';
        myPop("guessxCustomBM", "Current custom bookmarklets", b, d, "600");
        for (var r = 0; r < i; r++) {
            document.getElementsByClassName("edit_user_bm_pop")[r].onclick = edit_user_bm_pop;
            document.getElementsByClassName("remove_user_bm")[r].onclick = remove_user_bm
        }
        document.getElementById("addBM").onclick = guessxAddBM;
        document.getElementById("backupBM").onclick = restore_custom_bms;
        document.getElementById("restoreBM").onclick = restore_stock_bms
    }
	
    function restore_custom_bms() {
        var count = parseInt(localStorage.getItem("guessx_user_bm_length"));
        for (var i = 0; i < count; i++) {
            localStorage.removeItem("guessx_user_bm_locale_" + i);
            localStorage.removeItem("guessx_user_bm_alias_" + i)
        }
        var stuff = document.getElementById("backupBMtext").value;
        var useraliases = stuff.split("##")[0];
        var userlocales = stuff.split("##")[1];
        try {
            if (document.getElementById("guessxCustomBM")) {
                document.getElementById("popup_fodder").removeChild(document.getElementById("guessxCustomBM"))
            }
        } catch (e) {}
        localesSplit = userlocales.split("|"), aliasesSplit = useraliases.split("|");
        localStorage.setItem("guessx_user_bm_length", (localesSplit.length - 1));
        for (var i = 0; i < localesSplit.length; i++) {
            guessx.user_bm_locale[i] = localesSplit[i];
            localStorage.setItem("guessx_user_bm_locale_" + i, localesSplit[i]);
            guessx.user_bm_alias[i] = aliasesSplit[i];
            localStorage.setItem("guessx_user_bm_alias_" + i, aliasesSplit[i])
        }
        display_custom_bm_array()
    }

    function restore_stock_bms() {
        try {
            if (document.getElementById("guessxCustomBM")) {
                document.getElementById("popup_fodder").removeChild(document.getElementById("guessxCustomBM"))
            }
        } catch (e) {}
        var count = parseInt(localStorage.getItem("guessx_user_bm_length"));
        for (var i = 0; i < count; i++) {
            localStorage.removeItem("guessx_user_bm_locale_" + i);
            localStorage.removeItem("guessx_user_bm_alias_" + i)
        }
        localesSplit = locales.split("|"), aliasesSplit = aliases.split("|");
        localStorage.setItem("guessx_user_bm_length", (localesSplit.length - 1));
        for (var i = 0; i < localesSplit.length; i++) {
            guessx.user_bm_locale[i] = localesSplit[i];
            localStorage.setItem("guessx_user_bm_locale_" + i, localesSplit[i]);
            guessx.user_bm_alias[i] = aliasesSplit[i];
            localStorage.setItem("guessx_user_bm_alias_" + i, aliasesSplit[i])
        }
        display_custom_bm_array()
    }

	$("body").ajaxComplete(function (e, xhr, settings) {
        var response = xhr.responseText;
        if (ajax) {
            ajax = false;
            return
        }
    })
};
injectScript(myscript);