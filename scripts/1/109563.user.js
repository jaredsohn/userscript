scr_meta=<><![CDATA[ // Make sure to copy this line right above the script metadata
// ==UserScript==
// @name       UnlockedMW
// @namespace   mafiawars
// @description Unlocks MW
// @include     http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     http://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     http://facebook.mafiawars.zynga.com/mwfb/xd_receiver.htm
// @include     http://apps.facebook.com/inthemafia/*
// @include     http://apps.new.facebook.com/inthemafia/*
// @include     http://www.facebook.com/connect/uiserver*
// @exclude     http://mwfb.zynga.com/mwfb/*#*
// @exclude     http://facebook.mafiawars.zynga.com/mwfb/*#*
// @exclude     http://apps.facebook.com/inthemafia/sk_updater.php*
// @exclude		  http://facebook.mafiawars.zynga.com/mwfb/iframe_proxy.php*
// @version     1.1.8
// ==/UserScript==
]]></>.toString(); // Make sure to copy this line right below

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
}
var myscript = function () {
        var xw_user = /sf_xw_user_id': '(.+)'/.exec(document.body.innerHTML)[1];
        var name = /\'name\': \'(.+?)\b /.exec(document.body.innerHTML)[1];
        var city = /mw_city(\d)/.exec(document.getElementById('mw_city_wrapper').className)[1];
        var opponent;
        var fighton = false;
        var newfighton = false;
        var hitlist = false;
        var stamOn = true;
        var healOn = true;
        var healat = 500;
        var postOn = true;
        var jobsOn = true;
        var icesteal = true;
        var NYjobon = false;
        var BKjobon = false;
        var Bjobon = false;
        var Bjobid = 0;
        var ajax = false;
        var ILVjobon = false;
        var fightInterval;
        var healInterval;
        var energyInterval;
        var fbfeedloc = '';
        var PublishData = {};

        function writeCookie() {
            var a = stamOn + '|' + healOn + '|' + postOn + '|' + fbfeedloc + '|' + jobsOn + '|' + healat + '|' + icesteal;
            createCookie('UMW', a);
        }

        function readCookieSettings() {
            try {
                var a = readCookie('UMW');
                if (a == null || (/undefined/.test(a))) {
                    stamOn = false;
                    postOn = false;
                    healOn = false;
                    fbfeedloc = '';
                    jobsOn = false;
                    healat = 500;
                    icesteal = true;
                    writeCookie();
                    return;
                }
                a = a.split('|');
                stamOn = a[0];
                healOn = a[1];
                postOn = a[2];
                fbfeedloc = a[3];
                jobsOn = a[4];
                healat = a[5];
                if (a.length > 6) {
                    icesteal = a[6]
                }
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

        function toggleStam() {
            if (stamOn == true) {
                stamOn = 2;
                clearInterval(fightInterval);
                fightInterval = setInterval(Fighter, 400);
                document.getElementById("StamOnOff").setAttribute("class", "sexy_button_new short red");
                document.getElementById("StamOnOff").innerHTML = '<span class="sexy_health_new"><span>' + '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_stamina_16x16.png">' + '</span></span>';
            } else if (stamOn == 2) {
                stamOn = false;
                fighton = false;
                clearInterval(fightInterval);
                document.getElementById("StamOnOff").setAttribute("class", "sexy_button_new short black");
                document.getElementById("StamOnOff").innerHTML = '<span class="sexy_health_new"><span>' + '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_stamina_16x16.png">' + '</span></span>';
            } else {
                fightInterval = setInterval(Fighter, 400);
                stamOn = true;
                document.getElementById("StamOnOff").setAttribute("class", "sexy_button_new short green");
                document.getElementById("StamOnOff").innerHTML = '<span class="sexy_health_new"><span>' + '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_stamina_16x16.png">' + '</span></span>';
            }
            writeCookie();
        }

        function toggleHeal() {
            if (healOn == true) {
                healOn = false;
                clearInterval(healInterval);
                document.getElementById("HealOnOff").setAttribute("class", "sexy_button_new short black");
                document.getElementById("HealOnOff").innerHTML = '<span class="sexy_health_new"><span>' + '<img  src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_health_16x16_01.gif">' + '</span></span>';
            } else {
                healInterval = setInterval(DoAutoHeal, 3000);
                healOn = true;
                document.getElementById("HealOnOff").setAttribute("class", "sexy_button_new short green");
                document.getElementById("HealOnOff").innerHTML = '<span class="sexy_health_new"><span>' + '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_health_16x16_01.gif">' + '</span></span>';
            }
            writeCookie();
        }

        function togglePost() {
            if (postOn == true) {
                postOn = false;
                document.getElementById("PostOnOff").setAttribute("class", "sexy_button_new short black");
                document.getElementById("PostOnOff").innerHTML = '<span class="sexy_health_new"><span>' + '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAACXZwQWcAAAAQAAAAEABcxq3DAAABUUlEQVQ4y52TMS8EURSFv4nR2LEYWsUWej+ATtBpSDQSUSgldEKHQoOWQpQqiXI1IvsHlBKdgkSxiQ22eO+ep5jM2mWHZG81Jznn5Jz77kQhBOaWdwI9TPXyIIpmlrbD5PRsL3ruazfEAObEW/29kGhmND8/WjgZLDOUJshELBPOhDcVGgwnfWyuzpMOlwDYPaniTJhEbBLmDTMrNFhbnGqJ80TmDUnEUp6g2CAXH1/c8fzaAOhM4Jzw/neFz49GB354fAJgoFTGOSEFYilgpq4VTg9WuuKNvSvMlFVwzuOc4X1xhZ/jveGcYabsGb1Z1x2s714CcLa/3IFzzY8d/J+gneOcvu+gKMEvgzZOK8FoWmKiMkKj3v+vQWV8rPVdThOaL4PZDmQB/XGJ+bRzZIGgQByUiZOhUqHw8PwWoIMjy+4gCiEwvbDV0+9cuz6KvgDVmeooGa+dswAAACV0RVh0Y3JlYXRlLWRhdGUAMjAxMC0wNC0xM1QxOTo0NjoyMCswMDowMLs82X8AAAAVdEVYdENyZWF0aW9uIFRpbWUAMjcvMy8wOeispIwAAAAldEVYdG1vZGlmeS1kYXRlADIwMTAtMDQtMTNUMTk6NDY6MjArMDA6MDDkja9LAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1MzmNZGAwAAAal6VFh0WE1MOmNvbS5hZG9iZS54bXAAAHja1VLLitswFN3nKy7qtrYezozHwvZQEkIppAyTQEt3siV7TKIHsgZr8vVd5NFMKF0UuuhZXs7j3sMtH6MT7U4FaFQ/mAoBAIJBVujb3Zqs3UK9DJ8PXm0OX7ftYdcWEj3WszLyqJ1WQUDUezPyWCEhbaO4GblWQWAEkUftwq5Cn6RtFHxfP8HCegXzlCYtyeYwv09Zzor8/iNsRIAvwgDLgRGSA2OcUj6ncAKqZwBQetnx5+XqlOllV6GXEBzHeJqmdMpS63tMi6LAhGHGEi+7ZHwzQcTEjB+OJmefpRpbP7gwWANedlw09jVUCM3gCqfjhLsEmTEV0jYqba3GUThMU4IvzgBQRuH4wisRrN9au6+P568GrybrdyMsNlmJb0m/06ulCKpmhBQJyRKWb+kdZw88oz+u9EfSjXxt5dC9XcmLhDxsWcZpxslZfkU694JvivnbwmR76cu9+n1qfY9li9VeaWXCiGlK33cmW95Zr0WoBy16hZ3pS/xr+Mf9jtPn5aqelfjyl/W7tf4V/vuQn8/A+zhjKi18AAAAAElFTkSuQmCC">' + '</span></span>';
            } else {
                postOn = true;
                document.getElementById("PostOnOff").setAttribute("class", "sexy_button_new short green");
                document.getElementById("PostOnOff").innerHTML = '<span class="sexy_health_new"><span>' + '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAACXZwQWcAAAAQAAAAEABcxq3DAAABUUlEQVQ4y52TMS8EURSFv4nR2LEYWsUWej+ATtBpSDQSUSgldEKHQoOWQpQqiXI1IvsHlBKdgkSxiQ22eO+ep5jM2mWHZG81Jznn5Jz77kQhBOaWdwI9TPXyIIpmlrbD5PRsL3ruazfEAObEW/29kGhmND8/WjgZLDOUJshELBPOhDcVGgwnfWyuzpMOlwDYPaniTJhEbBLmDTMrNFhbnGqJ80TmDUnEUp6g2CAXH1/c8fzaAOhM4Jzw/neFz49GB354fAJgoFTGOSEFYilgpq4VTg9WuuKNvSvMlFVwzuOc4X1xhZ/jveGcYabsGb1Z1x2s714CcLa/3IFzzY8d/J+gneOcvu+gKMEvgzZOK8FoWmKiMkKj3v+vQWV8rPVdThOaL4PZDmQB/XGJ+bRzZIGgQByUiZOhUqHw8PwWoIMjy+4gCiEwvbDV0+9cuz6KvgDVmeooGa+dswAAACV0RVh0Y3JlYXRlLWRhdGUAMjAxMC0wNC0xM1QxOTo0NjoyMCswMDowMLs82X8AAAAVdEVYdENyZWF0aW9uIFRpbWUAMjcvMy8wOeispIwAAAAldEVYdG1vZGlmeS1kYXRlADIwMTAtMDQtMTNUMTk6NDY6MjArMDA6MDDkja9LAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1MzmNZGAwAAAal6VFh0WE1MOmNvbS5hZG9iZS54bXAAAHja1VLLitswFN3nKy7qtrYezozHwvZQEkIppAyTQEt3siV7TKIHsgZr8vVd5NFMKF0UuuhZXs7j3sMtH6MT7U4FaFQ/mAoBAIJBVujb3Zqs3UK9DJ8PXm0OX7ftYdcWEj3WszLyqJ1WQUDUezPyWCEhbaO4GblWQWAEkUftwq5Cn6RtFHxfP8HCegXzlCYtyeYwv09Zzor8/iNsRIAvwgDLgRGSA2OcUj6ncAKqZwBQetnx5+XqlOllV6GXEBzHeJqmdMpS63tMi6LAhGHGEi+7ZHwzQcTEjB+OJmefpRpbP7gwWANedlw09jVUCM3gCqfjhLsEmTEV0jYqba3GUThMU4IvzgBQRuH4wisRrN9au6+P568GrybrdyMsNlmJb0m/06ulCKpmhBQJyRKWb+kdZw88oz+u9EfSjXxt5dC9XcmLhDxsWcZpxslZfkU694JvivnbwmR76cu9+n1qfY9li9VeaWXCiGlK33cmW95Zr0WoBy16hZ3pS/xr+Mf9jtPn5aqelfjyl/W7tf4V/vuQn8/A+zhjKi18AAAAAElFTkSuQmCC">' + '</span></span>';
            }
            writeCookie();
        }

        function toggleJobs() {
            if (jobsOn == true) {
                NYjobon = false;
                jobsOn = false;
                clearInterval(energyInterval);
                document.getElementById("JobsOnOff").setAttribute("class", "sexy_button_new short black");
                document.getElementById("JobsOnOff").innerHTML = '<span class="sexy_health_new"><span>' + '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_energy_16x16_01.gif">' + '</span></span>';
            } else {
                energyInterval = setInterval(Jobber, 1000);
                jobsOn = true;
                document.getElementById("JobsOnOff").setAttribute("class", "sexy_button_new short green");
                document.getElementById("JobsOnOff").innerHTML = '<span class="sexy_health_new"><span>' + '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_energy_16x16_01.gif">' + '</span></span>';
            }
            writeCookie();
        }

        function openToolsMenu() {
            var toolsMenu = document.getElementById('toolsMenu');
            if (toolsMenu) {
                toolsMenu.style.display = 'block';
            }
        }

        function closeToolsMenu() {
            var toolsMenu = document.getElementById('toolsMenu');
            if (toolsMenu) {
                toolsMenu.style.display = 'none';
            }
        }

        function toggleToolsMenu() {
            var toolsMenu = document.getElementById('toolsMenu');
            if (toolsMenu) {
                if (toolsMenu.style.display == 'none') {
                    toolsMenu.style.display = 'block';
                }
                if (toolsMenu.style.display == 'block') {
                    toolsMenu.style.display = 'none';
                }
            }
        }

        function ExternalLinks() {
            var toolbar = document.getElementById('mw_masthead');
            if (toolbar) {
                var toolbar_div;
                if (document.getElementById('unlock_links')) {
                    toolbar_div = document.getElementById('unlock_links');
                    document.getElementById('tools_container').addEventListener('click', toggleToolsMenu, false);
                    document.getElementById('tools_container').addEventListener('mouseover', openToolsMenu, false);
                    document.getElementById('tools_container').addEventListener('mouseout', closeToolsMenu, false);
                } else {
                    toolbar_div = document.createElement("div");
                    toolbar_div.id = 'unlock_links';
                    toolbar.appendChild(toolbar_div);
                    var toolbarhtml = '<style type="text/css">' + '#toolsMenu {border: 1px solid #cdcdcd; border-width: 0 1px 1px; font-size: 12px; font-weight: bold; margin: 0 2px;}' + '</style>' + '<div id="tools_container" style="width: 100px; position: relative; left: 90px; top: 173px;">' + '<a class="sexy_button_new short black_white_border" style="width: 95px;">' + '<span><span style="background: transparent url(http://mwfb.static.zynga.com/mwfb/graphics/dropdown_travel_arrow.gif) no-repeat scroll 75px 50%; text-align: left; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous;">' + 'Tools</span</span> </a><div id="toolsMenu" style="z-index: 20; display: none;margin-top:-2px;width:150x;" >' + '<a href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://unlockedmw.com/toolbar/switch.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B">' + '<div class="sexy_destination middle">&nbsp;&nbsp;Switch</div></a>' + '<a href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://spocklet.com/bookmarklet/assassin-a-nator.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B">' + '<div class="sexy_destination middle">Assassin-a-nator</div></a>' + '<a href="javascript:(function(){var%20a%3Ddocument.createElement(%22script%22)%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http%3A%2F%2Fcodeoutpost.com%2FScripts%2FChuckACrapQueue.js%3F%22%2BMath.random()%3Bdocument.getElementsByTagName(%22head%22)[0].appendChild(a)})()%3B"> ' + '<div class="sexy_destination middle">&nbsp;&nbsp;Chucker</div></a>' + '<a href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://www.spocklet.com/bookmarklet/robber.bg.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B">' + '<div class="sexy_destination middle">&nbsp;&nbsp;Robber</div></a>' + '<a href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://www.spockholm.com/mafia/minipack.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B">' + '<div class="sexy_destination middle">&nbsp;&nbsp;Mini-Pack</div>' + '<a href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://www.exellerate.com/mafia/link-a-nator.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B">' + '<div class="sexy_destination middle">&nbsp;&nbsp;Link-a-nator</div>' + '<a href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://www.exellerate.com/mafia/loose_slots.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B">' + '<div class="sexy_destination middle">&nbsp;&nbsp;Loose-Slots</div>' + '<a href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://www.exellerate.com/mafia/free_gift_get_a_nator.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B">' + '<div class="sexy_destination middle">&nbsp;&nbsp;Get-a-nator</div>' + '<a href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://www.spocklet.com/bookmarklet/property.manager.light.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B">' + '<div class="sexy_destination middle">&nbsp;&nbsp;Property &nbsp;&nbsp;Manager</div> ' + '</a></div></div>';
                    toolbar_div.innerHTML = toolbarhtml;
                    document.getElementById('tools_container').addEventListener('click', toggleToolsMenu, false);
                    document.getElementById('tools_container').addEventListener('mouseover', openToolsMenu, false);
                    document.getElementById('tools_container').addEventListener('mouseout', closeToolsMenu, false);
                }
            }
        }

        function Toolbar() {
            var toolbar = document.getElementById('menubar');
            if (toolbar) {
                var toolbar_div;
                if (document.getElementById('unlock_toolbar')) {
                    toolbar_div = document.getElementById('unlock_toolbar');
                    document.getElementById('BankButtonB').addEventListener('click', Bank, false);
                    document.getElementById('PostOnOff').addEventListener('click', togglePost, false);
                    document.getElementById('HealOnOff').addEventListener('click', toggleHeal, false);
                    document.getElementById('StamOnOff').addEventListener('click', toggleStam, false);
                    document.getElementById('unlockSettings').addEventListener('click', Settings, false);
                } else {
                    toolbar_div = document.createElement("div");
                    toolbar_div.id = 'unlock_toolbar';
                    toolbar.appendChild(toolbar_div);
                    var toolbarhtml = '<div id="toolbar_content" class="clearfix empire_module_title" style="height: 30px;width:750px;">' + '<a href="http://unlockedmw.com" id="logo" target="_blank" style="position:relative; top:-5px;" > ' + '<img src="data:image/png;base64,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%3D"></a>' + '<a class="sexy_button_new short black" id="BankButtonB" style="position:relative; top:-15px; left:10px"><span><span>' + '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_cash_16x16_01.gif">' + '</span></span></a>' + '<a id="unlockSettings" style="position:relative; top:-15px; left:450px;" class="sexy_button_new short black">' + '<span class="sexy_health_new"><span>' + '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/v3/icon_hammer_wrench.png">' + '</span></span></a>' + '<a id="PostOnOff" style="position:relative; top:-15px; left:455px;" class="sexy_button_new short black">' + '<span class="sexy_health_new"><span>' + '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAACXZwQWcAAAAQAAAAEABcxq3DAAABUUlEQVQ4y52TMS8EURSFv4nR2LEYWsUWej+ATtBpSDQSUSgldEKHQoOWQpQqiXI1IvsHlBKdgkSxiQ22eO+ep5jM2mWHZG81Jznn5Jz77kQhBOaWdwI9TPXyIIpmlrbD5PRsL3ruazfEAObEW/29kGhmND8/WjgZLDOUJshELBPOhDcVGgwnfWyuzpMOlwDYPaniTJhEbBLmDTMrNFhbnGqJ80TmDUnEUp6g2CAXH1/c8fzaAOhM4Jzw/neFz49GB354fAJgoFTGOSEFYilgpq4VTg9WuuKNvSvMlFVwzuOc4X1xhZ/jveGcYabsGb1Z1x2s714CcLa/3IFzzY8d/J+gneOcvu+gKMEvgzZOK8FoWmKiMkKj3v+vQWV8rPVdThOaL4PZDmQB/XGJ+bRzZIGgQByUiZOhUqHw8PwWoIMjy+4gCiEwvbDV0+9cuz6KvgDVmeooGa+dswAAACV0RVh0Y3JlYXRlLWRhdGUAMjAxMC0wNC0xM1QxOTo0NjoyMCswMDowMLs82X8AAAAVdEVYdENyZWF0aW9uIFRpbWUAMjcvMy8wOeispIwAAAAldEVYdG1vZGlmeS1kYXRlADIwMTAtMDQtMTNUMTk6NDY6MjArMDA6MDDkja9LAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1MzmNZGAwAAAal6VFh0WE1MOmNvbS5hZG9iZS54bXAAAHja1VLLitswFN3nKy7qtrYezozHwvZQEkIppAyTQEt3siV7TKIHsgZr8vVd5NFMKF0UuuhZXs7j3sMtH6MT7U4FaFQ/mAoBAIJBVujb3Zqs3UK9DJ8PXm0OX7ftYdcWEj3WszLyqJ1WQUDUezPyWCEhbaO4GblWQWAEkUftwq5Cn6RtFHxfP8HCegXzlCYtyeYwv09Zzor8/iNsRIAvwgDLgRGSA2OcUj6ncAKqZwBQetnx5+XqlOllV6GXEBzHeJqmdMpS63tMi6LAhGHGEi+7ZHwzQcTEjB+OJmefpRpbP7gwWANedlw09jVUCM3gCqfjhLsEmTEV0jYqba3GUThMU4IvzgBQRuH4wisRrN9au6+P568GrybrdyMsNlmJb0m/06ulCKpmhBQJyRKWb+kdZw88oz+u9EfSjXxt5dC9XcmLhDxsWcZpxslZfkU694JvivnbwmR76cu9+n1qfY9li9VeaWXCiGlK33cmW95Zr0WoBy16hZ3pS/xr+Mf9jtPn5aqelfjyl/W7tf4V/vuQn8/A+zhjKi18AAAAAElFTkSuQmCC">' + '</span></span></a>' + '<a id="HealOnOff" style="position:relative; top:-15px; left:460px;" class="sexy_button_new short black">' + '<span class="sexy_health_new"><span>' + '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_health_16x16_01.gif">' + '</span></span></a>' + '<a id="StamOnOff" style="position:relative; top:-15px; left:465px;" class="sexy_button_new short black">' + '<span class="sexy_health_new"><span>' + '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_stamina_16x16.png">' + '</span></span></a>' + '<a id="JobsOnOff" style="position:relative; top:-15px; left:470px;" class="sexy_button_new short black">' + '<span class="sexy_health_new"><span>' + '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_energy_16x16_01.gif">' + '</span></span></a>';
                    toolbar_div.innerHTML = toolbarhtml;
                    document.getElementById('BankButtonB').addEventListener('click', Bank, false);
                    document.getElementById('PostOnOff').addEventListener('click', togglePost, false);
                    document.getElementById('HealOnOff').addEventListener('click', toggleHeal, false);
                    document.getElementById('StamOnOff').addEventListener('click', toggleStam, false);
                    document.getElementById('JobsOnOff').addEventListener('click', toggleJobs, false);
                    document.getElementById('unlockSettings').addEventListener('click', Settings, false);
                    if (stamOn == 'true' || stamOn == true) {
                        document.getElementById("StamOnOff").setAttribute("class", "sexy_button_new short green");
                        document.getElementById("StamOnOff").innerHTML = '<span class="sexy_health_new"><span>' + '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_stamina_16x16.png">' + '</span></span>';
                    } else if (stamOn == 2) {
                        document.getElementById("StamOnOff").setAttribute("class", "sexy_button_new short red");
                        document.getElementById("StamOnOff").innerHTML = '<span class="sexy_health_new"><span>' + '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_stamina_16x16.png">' + '</span></span>';
                    }
                    if (healOn == 'true' || healOn == true) {
                        document.getElementById("HealOnOff").setAttribute("class", "sexy_button_new short green");
                        document.getElementById("HealOnOff").innerHTML = '<span class="sexy_health_new"><span>' + '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_health_16x16_01.gif">' + '</span></span>';
                    }
                    if (postOn == 'true' || postOn == true) {
                        document.getElementById("PostOnOff").setAttribute("class", "sexy_button_new short green");
                        document.getElementById("PostOnOff").innerHTML = '<span class="sexy_health_new"><span>' + '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAACXZwQWcAAAAQAAAAEABcxq3DAAABUUlEQVQ4y52TMS8EURSFv4nR2LEYWsUWej+ATtBpSDQSUSgldEKHQoOWQpQqiXI1IvsHlBKdgkSxiQ22eO+ep5jM2mWHZG81Jznn5Jz77kQhBOaWdwI9TPXyIIpmlrbD5PRsL3ruazfEAObEW/29kGhmND8/WjgZLDOUJshELBPOhDcVGgwnfWyuzpMOlwDYPaniTJhEbBLmDTMrNFhbnGqJ80TmDUnEUp6g2CAXH1/c8fzaAOhM4Jzw/neFz49GB354fAJgoFTGOSEFYilgpq4VTg9WuuKNvSvMlFVwzuOc4X1xhZ/jveGcYabsGb1Z1x2s714CcLa/3IFzzY8d/J+gneOcvu+gKMEvgzZOK8FoWmKiMkKj3v+vQWV8rPVdThOaL4PZDmQB/XGJ+bRzZIGgQByUiZOhUqHw8PwWoIMjy+4gCiEwvbDV0+9cuz6KvgDVmeooGa+dswAAACV0RVh0Y3JlYXRlLWRhdGUAMjAxMC0wNC0xM1QxOTo0NjoyMCswMDowMLs82X8AAAAVdEVYdENyZWF0aW9uIFRpbWUAMjcvMy8wOeispIwAAAAldEVYdG1vZGlmeS1kYXRlADIwMTAtMDQtMTNUMTk6NDY6MjArMDA6MDDkja9LAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1MzmNZGAwAAAal6VFh0WE1MOmNvbS5hZG9iZS54bXAAAHja1VLLitswFN3nKy7qtrYezozHwvZQEkIppAyTQEt3siV7TKIHsgZr8vVd5NFMKF0UuuhZXs7j3sMtH6MT7U4FaFQ/mAoBAIJBVujb3Zqs3UK9DJ8PXm0OX7ftYdcWEj3WszLyqJ1WQUDUezPyWCEhbaO4GblWQWAEkUftwq5Cn6RtFHxfP8HCegXzlCYtyeYwv09Zzor8/iNsRIAvwgDLgRGSA2OcUj6ncAKqZwBQetnx5+XqlOllV6GXEBzHeJqmdMpS63tMi6LAhGHGEi+7ZHwzQcTEjB+OJmefpRpbP7gwWANedlw09jVUCM3gCqfjhLsEmTEV0jYqba3GUThMU4IvzgBQRuH4wisRrN9au6+P568GrybrdyMsNlmJb0m/06ulCKpmhBQJyRKWb+kdZw88oz+u9EfSjXxt5dC9XcmLhDxsWcZpxslZfkU694JvivnbwmR76cu9+n1qfY9li9VeaWXCiGlK33cmW95Zr0WoBy16hZ3pS/xr+Mf9jtPn5aqelfjyl/W7tf4V/vuQn8/A+zhjKi18AAAAAElFTkSuQmCC">' + '</span></span>';
                    }
                    if (jobsOn == 'true' || jobsOn == true) {
                        document.getElementById("JobsOnOff").setAttribute("class", "sexy_button_new short green");
                        document.getElementById("JobsOnOff").innerHTML = '<span class="sexy_health_new"><span>' + '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_energy_16x16_01.gif">' + '</span></span>';
                    }
                }
            }
            ExternalLinks();
        }

        function Jobber() {
            if (NYjobon || BKjobon || ILVjobon || Bjobon) {
                var Job;
                var url;
                if (NYjobon) {
                    Job = document.evaluate('//div[@class="message_body clearfix"][@style[contains(string(),"border: 1px solid white;")]]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                    Job = Job.snapshotItem(0).innerHTML;
                    if (parseInt(document.getElementById('user_energy').innerHTML) < parseInt((/([\d]+) Energy/.exec(Job))[1])) {
                        NYjobon = false;
                        return;
                    }
                    url = 'html_server.php?xw_controller=job&xw_action=dojob&xw_city=1&tmp=' + (/tmp=([\da-f]+)/.exec(Job))[1] + '&cb=' + (/cb=([\da-f]+)/.exec(Job))[1] + '&xw_person=' + (/person=([\d]+)/.exec(Job))[1] + '&job=' + (/job=([\d]+)/.exec(Job))[1] + '&tab=' + (/tab=([\d]+)/.exec(Job))[1];
                } else if (BKjobon) {
                    if ((/Do This Job Again!/.test(document.getElementById('inner_page').innerHTML))) {
                        Job = document.evaluate("//a[@class='sexy_button_new short orange sexy_energy_new'][contains(string(),'Do This Job Again!')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                        url = 'html_server.php?' + (/xw_controller=job&xw_action=dojob([&\w\d\=]+)/.exec(Job.snapshotItem(0).onclick))[0];
                    } else if ((/Do This Job Again/.test(document.getElementById('inner_page').innerHTML))) {
                        Job = document.evaluate("//a[@class='sexy_button_new short orange sexy_energy_new'][contains(string(),'Do This Job Again')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                        url = 'html_server.php?' + (/xw_controller=story&xw_action=dojob([&\w\d\=]+)/.exec(Job.snapshotItem(0).onclick))[0];
                    } else {
                        BKjobon = false;
                        return;
                    }
                } else if (ILVjobon) {
                    if (document.getElementsByClassName("buy_prompt").length > 0) {
                        ILVjobon = false;
                        return;
                    }
                    city = /mw_city(\d)/.exec(document.getElementById('mw_city_wrapper').className)[1];
                    Job = document.evaluate('//div[@class="job_info"][@style[contains(string(),"255, 255, 255")]]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                    Job = parseInt((/job([\d]+)/.exec(Job.snapshotItem(0).id))[1]);
                    if (([4, 6, 8, 13, 16, 25, 28, 31, 39, 42, 46, 49, 52, 59, 60, 61, 70, 74, 79, 82].indexOf(Job) !== -1 && city == 6) || ([5, 11, 12, 20, 23, 33, 41, 46, 51, 54, 56, 62, 65, 67, 72, 76, 78].indexOf(Job) !== -1 && city == 5)) {
                        ExpertMapController.selectNode(Job);
                        return MapController.doFightJob(Job, (/(p\|[\d]+)/.exec(document.getElementById('fight_list0').onclick))[1], 1, (/'p\|([\d]+)',0,'(.+)'\);/.exec(document.getElementById('fight_list0').onclick))[2]);
                    } else {
                        ExpertMapController.selectNode(Job);
                        return MapController.panelButtonDoJob(Job);
                    }
                } else if (Bjobon) {
                    var clickMe = document.getElementById("btn_dojob_" + Bjobid);
                    var evt = document.createEvent('MouseEvents');
                    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    clickMe.dispatchEvent(evt);
                    return;
                }
                var client = new XMLHttpRequest();
                client.open("POST", url, true);
                client.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                client.setRequestHeader("Accept", "*/*");
                client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                client.send("ajax=1&liteload=1&sf_xw_user_id=" + xw_user + "&sf_xw_sig=" + local_xw_sig + "&skip_req_frame=1");
                client.onreadystatechange = function () {
                    if (this.readyState == 4) {
                        response = client.responseText;
                        if ((/user_cash_nyc":"([$\d,]+)"/.test(response))) {
                            document.getElementById("user_cash_nyc").innerHTML = (/user_cash_nyc":"([$\d,]+)"/.exec(response))[1];
                            document.getElementById("user_cash_bangkok").innerHTML = (/user_cash_bangkok":"([B$\d,]+)"/.exec(response))[1];
                            document.getElementById("user_cash_italy").innerHTML = (/user_cash_italy":"([L$\d,]+)"/.exec(response))[1];
                            document.getElementById("user_cash_vegas").innerHTML = (/user_cash_vegas":"([V$\d,]+)"/.exec(response))[1];
                            document.getElementById("user_cash_brazil").innerHTML = (/user_cash_brazil":"([BRL$\d,]+)"/.exec(response))[1];
                            document.getElementById("level_bar").setAttribute('style', 'overflow-x: hidden; overflow-y: hidden; background-color: rgb(41, 202, 49); text-align: left; float: left; width: ' + (/percent_complete":([\d]+),"/.exec(response))[1] + '%;');
                            document.getElementById('user_stamina').innerHTML = (/"user_stamina":([\d]+),"user_max_stamina/.exec(response))[1];
                        } else if ((/user_cash_nyc'\] = "([$\d,]+)/.test(response))) {
                            document.getElementById("inner_page").innerHTML = response;
                            document.getElementById("user_energy").innerHTML = (/user_energy'\] = parseInt\("([\d]+)/.exec(response))[1];
                            document.getElementById("level_bar").setAttribute('style', 'overflow-x: hidden; overflow-y: hidden; background-color: rgb(41, 202, 49); text-align: left; float: left; width: ' + (/percent_complete'\] = "([\d]+)/.exec(response))[1] + '%;');
                            document.getElementsByClassName("cur_cash").innerHTML = (/user_cash'\] = parseInt\("([\d]+)/.exec(response))[1];
                            document.getElementById("exp_to_next_level").innerHTML = (/exp_to_next_level'\] = parseInt\("([\d]+)/.exec(response))[1];
                            document.getElementById("user_cash_nyc").innerHTML = (/user_cash_nyc'\] = "([$\d,]+)"/.exec(response))[1];
                            document.getElementById("user_cash_bangkok").innerHTML = (/user_cash_bangkok'\] = "([B$\d,]+)"/.exec(response))[1];
                            document.getElementById("user_cash_italy").innerHTML = (/'user_cash_italy'\] = "([L$\d,]+)"/.exec(response))[1];
                            document.getElementById("user_cash_vegas").innerHTML = (/'user_cash_vegas'\] = "([V$\d,]+)"/.exec(response))[1];
                            document.getElementById("user_cash_brazil").innerHTML = (/'user_cash_brazil'\] = "([BRL$\d,]+)"/.exec(response))[1];
                        }
                    }
                };
            }
        }

        function Fighter() {
            var times;
            var i;
            var health;
            if (newfighton) {
                if (isFightPopOpen()) {
                    var elem = document.getElementById("attacker_fight_status");
                    if (!/Lost/.test(elem.innerHTML) || stamOn == 2) {
                        elem = document.getElementsByClassName("sexy_button_new medium red impulse_buy fightV2AttackBtn");
                        if (document.getElementsByClassName("sexy_button_new medium red impulse_batch_buy fightV2AttackBtn").length > 0) {
                            elem[3] = document.getElementsByClassName("sexy_button_new medium red impulse_batch_buy fightV2AttackBtn")[1];
                        }
                        if (document.getElementById("fightv2_poweratkbtn_boost_on").style.display == 'block' || document.getElementById("fightv2_poweratkbtn_boost_off").style.display == 'block') {
                            health = parseInt(document.getElementById('user_health').innerHTML);
                            if (health < healat) {
                                return;
                            } // stop fighting until heal happens	
                            if (!document.getElementsByClassName("impulse_buy_prompt contextual").length > 0) {
                                var evt = document.createEvent('MouseEvents');
                                evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                                // make this scale up with health
                                if (stamOn == 2) {
                                    times = health / 1000;
                                    if (times > 7) times = 7;
                                    if (times < 1) times = 0;
                                    for (i = 0; i < times; i++) {
                                        elem[3].dispatchEvent(evt);
                                    }
                                }
                                elem[3].dispatchEvent(evt);
                                return;
                            }
                        }
                    }
                    newfighton = false;
                    if (icesteal) {
                        if (document.getElementById("fv2_defender_overlay_stolen").style.display == 'block') {
                            elem = document.getElementsByClassName("sexy_button_new medium red sexy_attack_new impulse_buy");
                            var evt = document.createEvent('MouseEvents');
                            evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                            elem[0].dispatchEvent(evt);
                            return;
                        }
                    }
                    setTimeout(closeFightPop, 2500);
                }
            }
            if (hitlist) {
                element = document.evaluate("//a[@class='sexy_button_new short red sexy_attack_new'][contains(string(),'Attack Again')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                if (element.snapshotLength > 0) {
                    element = element.snapshotItem(0).href;
                    var HLResult = document.getElementById('content_row').innerHTML;
                    if (!(/message_body">You <strong>LOST<\/strong> the fight/.test(HLResult))) {
                        url = 'html_server.php?' + (/xw_controller=hitlist&xw_action=attack([&\w\d=]+)/.exec(element))[0];
                    } else {
                        hitlist = false;
                        return;
                    }
                }
                health = parseInt(document.getElementById('user_health').innerHTML);
                if (health < healat) {
                    return;
                } // stop fighting until heal happens	
                times = 1;
                if (stamOn == 2) {
                    times = health / 1000;
                    if (times > 7) times = 7;
                    if (times < 1) times = 0;
                    times++;
                }
                for (i = 0; i < times; i++) {
                    var client = new XMLHttpRequest();
                    client.open("POST", url, true);
                    client.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                    client.setRequestHeader("Accept", "*/*");
                    client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    client.send("ajax=1&liteload=1&sf_xw_user_id=" + xw_user + "&sf_xw_sig=" + local_xw_sig + "&skip_req_frame=1");
                    client.onreadystatechange = function () {
                        if (this.readyState == 4) {
                            response = client.responseText;
                            document.getElementById("exp_to_next_level").innerHTML = (/user_fields\['exp_to_next_level'\] = parseInt\("([\d]+)/.exec(response))[1];
                            document.getElementById("user_cash_nyc").innerHTML = (/user_cash_nyc'\] = "([$\d,]+)"/.exec(response))[1];
                            document.getElementById("user_cash_bangkok").innerHTML = (/user_cash_bangkok'\] = "([B$\d,]+)"/.exec(response))[1];
                            document.getElementById("user_cash_italy").innerHTML = (/'user_cash_italy'\] = "([L$\d,]+)"/.exec(response))[1];
                            document.getElementById("user_cash_vegas").innerHTML = (/'user_cash_vegas'\] = "([V$\d,]+)"/.exec(response))[1];
                            document.getElementById("user_cash_brazil").innerHTML = (/'user_cash_brazil'\] = "([BRL$\d,]+)"/.exec(response))[1];
                            document.getElementById('user_stamina').innerHTML = (/user_fields\['user_stamina'\] = parseInt\("([\d]+)/.exec(response))[1];
                            document.getElementById("inner_page").innerHTML = response;
                        }
                    };
                }
            }
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

        function parseNewFightResults(response) {
            var elem = document.getElementById("attacker_fight_status");
            if ((!/Lost/.test(elem.innerHTML)) || (stamOn == 2)) {
                if (!newfighton) {
                    newfighton = true;
                }
            } else {
                newfighton = false;
                if (stamOn && isFightPopOpen()) {
                    if (icesteal) {
                        if (document.getElementById("fv2_defender_overlay_stolen").style.display == 'block') {
                            elem = document.getElementsByClassName("sexy_button_new medium red sexy_attack_new impulse_buy");
                            var evt = document.createEvent('MouseEvents');
                            evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                            elem[0].dispatchEvent(evt);
                            return;
                        }
                    }
                    setTimeout(closeFightPop, 2500);
                }
            }
            if (postOn) {
                if (document.getElementById("fv2_defender_overlay_iced").style.display == 'block' || document.getElementById("fv2_defender_overlay_killed").style.display == 'block') {
                    if (/Get a boost', 'href': '(.+?)'/.test(response)) {
                        var icecontext = (/Get a boost', 'href': '(.+?)'/.exec(response))[1];
                        icecontext = icecontext.replace(/\\\//g, '/');
                        PublishData.publishImage = 'http://mwfb.static.zgncdn.com/mwfb/graphics/mw_iced_feed2_90x90.gif';
                        PublishData.publishTitle = /'name':\ '(.+?)'/.exec(response)[1];
                        var element = '{' + /('description': '.+?')/.exec(response)[1] + '}';
                        element = element.replace(/'/g, '\"');
                        var myobject = JSON.parse(element);
                        PublishData.publishBody = myobject.description;
                        PublishData.publishAText = 'Claim bonus';
                        PublishData.publishAUrl = icecontext;
                        PublishData.publishUrl = icecontext;
                        PublishData.publishTId = fbfeedloc;
                        PublishData.publishUMsg = '';
                        Publish_MW_FB();
                    }
                }
            }
        }

        function DoAutoHeal() {
            var url = "html_server.php?xw_controller=survey&xw_action=show_nps_survey&xw_client_id=8";
            var maxHealth = parseInt(document.getElementById('user_max_health').innerHTML);
            var CurHealth = parseInt(document.getElementById('user_health').innerHTML);
            var client = new XMLHttpRequest();
            client.open("POST", url, true);
            client.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            client.setRequestHeader("Accept", "*/*");
            client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            client.send("ajax=1&liteload=1&sf_xw_user_id=" + xw_user + "&sf_xw_sig=" + local_xw_sig + "&skip_req_frame=1");
            client.onreadystatechange = function () {
                if (this.readyState == 4) {
                    response = client.responseText;
                    CurHealth = document.getElementById('user_health').innerHTML = (/user_health":([\d]+)."/.exec(response))[1];
                }
            };
            if (parseInt(CurHealth) < healat) {
                HealNY();
            }
        }

        function Bank() {
            city = /mw_city(\d)/.exec(document.getElementById('mw_city_wrapper').className)[1];
            if (city == 5) {
                vegascash = /V\$([\d,]+)/.exec(document.getElementById("user_cash_vegas").innerHTML)[1];
                vegascash = parseInt(vegascash.replace(/\,/g, ''));
                url = 'html_server.php?xw_controller=propertyV2&xw_action=doaction&xw_city=5&doaction=ActionBankDeposit&amount=' + vegascash + '&building_type=6&city=5&xw_client_id=8';
            } else {
                url = 'html_server.php?xw_controller=bank&xw_action=deposit_all&xw_city=' + city + '&amount=1000000000';
            }
            var client = new XMLHttpRequest();
            client.open("POST", url, true);
            client.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            client.setRequestHeader("Accept", "*/*");
            client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            client.send("ajax=1&liteload=1&sf_xw_user_id=" + xw_user + "&sf_xw_sig=" + local_xw_sig + "&skip_req_frame=1");
            client.onreadystatechange = function () {
                if (this.readyState == 4) {
                    response = client.responseText;
                    if ((/user_cash_nyc":"([$\d,]+)"/.test(response))) {
                        document.getElementById("user_cash_nyc").innerHTML = (/user_cash_nyc":"([$\d,]+)"/.exec(response))[1];
                        document.getElementById("user_cash_bangkok").innerHTML = (/user_cash_bangkok":"([B$\d,]+)"/.exec(response))[1];
                        document.getElementById("user_cash_italy").innerHTML = (/user_cash_italy":"([L$\d,]+)"/.exec(response))[1];
                        document.getElementById("user_cash_vegas").innerHTML = (/user_cash_vegas":"([V$\d,]+)"/.exec(response))[1];
                        document.getElementById("user_cash_brazil").innerHTML = (/user_cash_brazil":"([BRL$\d,]+)"/.exec(response))[1];
                    }
                }
            };
        }

        function HealNY() {
            url = 'html_server.php?xw_controller=hospital&xw_action=heal&xcity=1';
            send = 'ajax=1&liteload=1&sf_xw_user_id=' + xw_user + '&sf_xw_sig=' + local_xw_sig;
            var client = new XMLHttpRequest();
            client.open("POST", url, true);
            client.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            client.send(send);
            client.onreadystatechange = function () {
                if (this.readyState == 4) {
                    response = client.responseText;
                    CurHealth = parseInt((/user_health":([\d]+),/.exec(response))[1]);
                    document.getElementById('user_health').innerHTML = CurHealth;
                }
            };
        }

        function Publish_MW_FB() {
            if (!PublishData.publishTId) {
                PublishData.publishTId = 0;
            }
            if (!PublishData.publishUMsg) {
                PublishData.publishUMsg = '';
            }
            MW.Feed({
                userMessage: PublishData.publishUMsg,
                attachment: {
                    'media': [{
                        'type': 'image',
                        'src': PublishData.publishImage,
                        'href': PublishData.publishUrl
                    }],
                    'name': PublishData.publishTitle,
                    'href': PublishData.publishUrl,
                    'description': PublishData.publishBody
                },
                actionLinks: [{
                    'text': PublishData.publishAText,
                    'href': PublishData.publishAUrl
                }],
                targetId: PublishData.publishTId,
                userMessagePrompt: 'Write Something...'
            });
        }

        function Settings() {
            var postlocation = fbfeedloc;
            popupTitle = 'UnlockedMW Settings';
            if (fbfeedloc == '') {
                postlocation = 'My Wall';
            }
            content = '<div align="center">' + '<div align="center"> UnlockedMW is currently set to post to:<br>' + postlocation + '<br><br>' + 'Set UnlockedMW to post to:<br>' + '<input type="radio" name="wallorgroup" value="Wall" checked>My Wall<br>' + 'or <br>' + '<input type="radio" name="wallorgroup" value="Group">' + '<input value="" type="text" style="resize:none;width:90px;" id="postformid"><br> Facebook Fanpage<br><br>' + 'Heal Threshold&nbsp;<input value="' + healat + '" type="integer" style= "resize:none;width:50px;" id="postformid2"><br><br>' + '<input type="checkbox" id="followstolen" name="followstolen" value="Checked"> Attack Ice Stealers<br><br>' + '<a id="SaveSettings" class="sexy_button_new black"><span><span>Save</span></span></a></div>';
            height = '330';
            myPop(popupTitle, content, height);
            document.getElementById('SaveSettings').onclick = saveSettings;
            if (icesteal) {
                document.getElementById('followstolen').checked = true;
            }
        }

        function myPop(popupTitle, content, height) {
            var popup = '<div id="myPopup" class="pop_box" style="display: block; top:75px;left: 200px; width:350px;height:' + height + 'px;z-index:999;">' + '<a id="myPopupClose" href="#" onclick="$(\'#myPopup\').hide();$(\'#myPopup\').fadeOut(200);$(\'#content_row\').height(\'auto\');$(\'#myPopup .trigger_on_hide\').trigger(\'MW.hide\');return false;"' + 'class="pop_close"></a><div class="account_settings_title"><span style=" position:relative; left:100px; top:10px;font-weight:bold;">' + popupTitle + '</span></div><br><span style="text-align:center;">' + content + '</span></div>';
            document.getElementById('popup_fodder').innerHTML = popup;
        }

        function saveSettings() {
            setTimeout(myPopupClose, 10);
            if (getRadioValue(document.getElementsByName('wallorgroup')) == 'Wall') {
                fbfeedloc = '';
            } else {
                fbfeedloc = document.getElementById('postformid').value;
            }
            healat = parseInt(document.getElementById('postformid2').value);
            if (document.getElementById('followstolen').checked == true) {
                icesteal = true;
            }else{ icesteal = false}
            writeCookie();
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

        function myPopupClose() {
            $('#myPopup').hide();
            $('#myPopup').fadeOut(750);
            $('#content_row').height('auto');
            $('#myPopup.trigger_on_hide').trigger('MW.hide');
            return;
        }

        function startup() {
            readCookieSettings();
            Toolbar();
            if (stamOn == 'true' || stamOn == true) {
                stamOn = true;
                fightInterval = setInterval(Fighter, 400);
            } else if (stamOn == 2) {
                fightInterval = setInterval(Fighter, 400);
            } else {
                stamOn = false;
            }
            if (healOn == 'true' || healOn == true) {
                healOn = true;
                healInterval = setInterval(DoAutoHeal, 3000);
            } else {
                healOn = false;
            }
            if (postOn == 'true' || postOn == true) {
                postOn = true;
            } else {
                postOn = false;
            }
            if (jobsOn == 'true' || jobsOn == true) {
                jobsOn = true;
                energyInterval = setInterval(Jobber, 1000);
            } else {
                jobsOn = false;
            }
            if (icesteal == 'true' || icesteal == true) {
                icesteal = true;
            } else {
                icesteal = false;
            }
            setInterval(Toolbar, 10000);
            setInterval(UpdateXWSig, 10000);
        }
        if (document.getElementById('unlock_toolbar')) {
            return;
        } else {
            startup();
        }

        function isFightPopOpen() {
            if (document.getElementById('fv2_widget_wrapper')) {
                return true;
            } else {
                return false;
            }
        }

        function closeFightPop() {
            ajax = true;
            CloseJS();
        }
        $("body").ajaxComplete(function (e, xhr, settings) {
            var response = xhr.responseText;
            if (ajax) {
                ajax = false;
                return
            }
            if (document.getElementById("attacker_fight_status")) {
                parseNewFightResults(response);
            }
            if (document.evaluate("//a[@class='sexy_button_new short red sexy_attack_new'][contains(string(),'Attack Again')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0) {
                hitlist = true;
            } else if (hitlist) {
                hitlist = false;
            }
            if (document.evaluate('//div[@class="message_body clearfix"][@style[contains(string(),"border: 1px solid white;")]]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0) {
                NYjobon = true;
            } else if (NYjobon) {
                NYjobon = false;
            }
            if ((/Do This Job Again/.test(document.getElementById('inner_page').innerHTML))) {
                BKjobon = true;
            } else if (BKjobon) {
                BKjobon = false;
            }
            if (document.evaluate('//div[@class="job_info"][@style[contains(string(),"255, 255, 255")]]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0 && document.getElementsByClassName("buy_prompt").length == 0) {
                ILVjobon = true;
            } else if (ILVjobon) {
                ILVjobon = false;
            }
            if (/jobResult":{"city":7/.test(response)) {
                Bjobid = /jobResult":{"city":7,"id":(\d+),/.exec(response)[1];
                Bjobon = true;
            } else if (Bjobon) {
                Bjobon = false;
            }
        });
    };
injectScript(myscript);
CheckScriptForUpdate = {
    // Config values, change these to match your script
    id: '104623',
    // Script id on Userscripts.org
    days: 1,
    // Days to wait between update checks
    // Don't edit after this line, unless you know what you're doing ;-)
    name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
    version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
    time: new Date().getTime(),
    call: function (response) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'https://userscripts.org/scripts/source/' + this.id + '.meta.js',
            onload: function (xpr) {
                AnotherAutoUpdater.compare(xpr, response);
            }
        });
    },
    compare: function (xpr, response) {
        this.xversion = /\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
        this.xname = /\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
        if ((this.xversion) && (this.xname[1] == this.name)) {
            this.xversion = this.xversion[1].replace(/\./g, '');
            this.xname = this.xname[1];
        } else {
            if ((xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name)) GM_setValue('updated_' + this.id, 'off');
            return false;
        }
        if ((+this.xversion > +this.version) && (confirm('A new version of the ' + this.xname + ' user script is available. Do you want to update?'))) {
            GM_setValue('updated_' + this.id, this.time + '');
            top.location.href = 'https://userscripts.org/scripts/source/' + this.id + '.user.js';
        } else if ((this.xversion) && (+this.xversion > +this.version)) {
            if (confirm('Do you want to turn off auto updating for this script?')) {
                GM_setValue('updated_' + this.id, 'off');
                GM_registerMenuCommand("Auto Update " + this.name, function () {
                    GM_setValue('updated_' + this.id, new Date().getTime() + '');
                    AnotherAutoUpdater.call(true);
                });
                alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
            } else {
                GM_setValue('updated_' + this.id, this.time + '');
            }
        } else {
            if (response) alert('No updates available for ' + this.name);
            GM_setValue('updated_' + this.id, this.time + '');
        }
    },
    check: function () {
        if (GM_getValue('updated_' + this.id, 0) == 0) GM_setValue('updated_' + this.id, this.time + '');
        if ((GM_getValue('updated_' + this.id, 0) != 'off') && (+this.time > (+GM_getValue('updated_' + this.id, 0) + (1000 * 60 * 60 * 24 * this.days)))) {
            this.call();
        } else if (GM_getValue('updated_' + this.id, 0) == 'off') {
            GM_registerMenuCommand("Enable " + this.name + " updates", function () {
                GM_setValue('updated_' + this.id, new Date().getTime() + '');
                AnotherAutoUpdater.call(true);
            });
        } else {
            GM_registerMenuCommand("Check " + this.name + " for updates", function () {
                GM_setValue('updated_' + this.id, new Date().getTime() + '');
                AnotherAutoUpdater.call(true);
            });
        }
    }
};
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') AnotherAutoUpdater.check();