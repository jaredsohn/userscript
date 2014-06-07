// ==UserScript==
// @name       	Furyans MiniToolbar
// @namespace   Mafiawars by Zynga
// @description Easy way to access a few bookmarklets without unframing, Contains autoheal, repeatjob, en2xp etc etc
// @include     http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     http://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     http://facebook.mafiawars.zynga.com/mwfb/xd_receiver.htm
// @include     http://apps.facebook.com/inthemafia/*
// @include     http://apps.new.facebook.com/inthemafia/*
// @include     http://www.facebook.com/connect/uiserver*
// @exclude     http://mwfb.zynga.com/mwfb/*#*
// @exclude     http://facebook.mafiawars.zynga.com/mwfb/*#*
// @exclude     http://apps.facebook.com/inthemafia/sk_updater.php*
// @exclude	http://facebook.mafiawars.zynga.com/mwfb/iframe_proxy.php*
// @version     Sempoii
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
}

// 	Credits to Jarett for their update script --> http://userscripts.org/scripts/review/20145
	var SUC_script_num = 112487; // Change this to the number given to the script by userscripts.org (check the address bar)

	try {
		function updateCheck(forced) {
			if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) {// Checks once a day (24 h * 60 m * 60 s * 1000 ms)
				try {
					GM_xmlhttpRequest( {
						method: 'GET',
						url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
						headers: {'Cache-Control': 'no-cache'},
						onload: function(resp) {
							var local_version, remote_version, rt, script_name;
							rt=resp.responseText;
							GM_setValue('SUC_last_update', new Date().getTime()+'');
							remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
							local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
							if(local_version!=-1) {
								script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
								GM_setValue('SUC_target_script_name', script_name);
								if (remote_version > local_version) {
									if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?'))
									{
										window.location.href='http://userscripts.org/scripts/source/'+SUC_script_num+'.user.js';
										GM_setValue('SUC_current_version', remote_version);
									}
								}
								else if (forced)
									alert('No update is available for "'+script_name+'."');
							}else GM_setValue('SUC_current_version', remote_version+'');
						}
					});
				}catch (err) {
					if (forced)
						alert('An error occurred while checking for updates:\n'+err);
				}
			}
		}
		GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});
		updateCheck(false);
	} catch(err) {}

    function x$(selector, context) {
        context = context || document;
        return document.evaluate(selector, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
    }
	
	function aboveTheFrame() {
		var canvas_iframe = x$('//iframe[@class="canvas_iframe_util"]');
			if (canvas_iframe !== null) {
			var divGX = document.createElement('div');
			divGX.innerHTML = '<span style="font-weight: bold; font-size: 14px;"><a target="_blank" http://userscripts.org/scripts/show/113947">Furyans MiniToolbar</a>&nbsp;|&nbsp;' +
			'<a target="_blank" http://www.facebook.com/pages/Fu%D1%8Fyans-Battlefield/123944047665059?sk=app_179191362131547">Furyans PlayGround</a>&nbsp;|&nbsp;'+
			'<a target="_blank" href="http://www.facebook.com/groups/167073823315866/">Mafia Wars Family Center</a>&nbsp;|&nbsp;'+
			'<a target="_blank" href="http://www.spockholm.com/mafia/bookmarklets.php">Spockholm</a>'+
			'</span>';
			canvas_iframe.parentNode.insertBefore(divGX, canvas_iframe);
			document.getElementById('UpD').addEventListener('click', updateCheck, false);					
			}
	}aboveTheFrame()

var myscript = function () {
        var xw_user = /sf_xw_user_id': '(.+)'/.exec(document.body.innerHTML)[1];
        var name = /\'name\': \'(.+?)\b /.exec(document.body.innerHTML)[1];
        var city = /mw_city(\d)/.exec(document.getElementById("mw_city_wrapper").className)[1];
        var RobOn = false;
        var healOn = false;
		var expOn = false;
        var healat = 500;
        var stopat = 500;
		var stopEn = 0;
		var stopSta = 0;
		var Robstopat = 500;
        var jobsOn = false;
        var pauseOn = false;
        var pauseRob = false;
        var NYjobon = false;
        var BKjobon = false;
        var Bjobon = false;
        var Bjobid = 0;
        var ajax = false;
        var ILVjobon = false;
        var killtehmbar = false;
		var killcarosell = false;
		var healInterval;
        var energyInterval;
        var en2xpInterval;
		var rref = 5900;
		var Rboards=0;
		var currstam = 0;
		var currexp = 0;
		var WhereAmI = HereYouIs();
		var iLike = '<iframe src="//www.facebook.com/plugins/like.php?app_id=121963871237246&amp;href=https%3A%2F%2Fwww.facebook.com%2Fpages%2F%25E1%25B9%2580%25E1%25BD%25A7%25E1%25B9%2582-%25E1%25B8%25A1%25E1%25B9%259D%25E1%25BB%25A0%25E1%25B9%25B9%25E1%25BF%25AC%2F227532373941666&amp;send=false&amp;layout=button_count&amp;width=450&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font=arial&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:80px; height:20px;" allowTransparency="true"></iframe>';
		var en2xppic = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAPCAYAAAACsSQRAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAACc0lEQVR42mL8//8/Ay6gOuPA/NsZDomaqqIcl7Y7X2ZlZWJBV7Nozd1FAAHEhMsATjVDARlzBwcuIJ0TLZ/DysCgwvD7nwIyfvro47O44pP1AAGE0xABz/gEHyEGBQGv+IQoN+lohl//GFDwzz8Pchsv5YLUAgQQC06v+CXEy7EzMFhrCRUIcjD/Z/jxB0V+2fb7y9bteXwOxAYIIKyG8NgEGuTMWS8ACq4ymdPiQAM4kOW//fjLsPHgl40LNkurMTIyMQAEECNvzvxGXmkFOWluBgYWXgEBDhUDAyagJ6NlGBS+3znBEMcyg4HnzytcDn7Qt/ZxP0AAMYJiR7JmQ394cECAiTCDAiNQhhFMMDBITxNisNdkw2lA2YrP5V1bv64CCCBGWBRz+RYGOJX19/tLMyhwsoDNYPj+8Q1cB+uZqQzx/6bADShe+aW4d9f3dSAOQAAxIqcTVkVDAa2e/ft1uL4bMLKwMjAyMTP8//+P4f+fPww1tz1+aDI/BIXNg9xV33InH/ixBaYPIIBQAvb3/fMfBGY++fLo+ycGRlY2BkZmoPS/vwwmDxYyCEl/ZmD4+/dB+qrv6TOP/dqFrA8ggFDSCYu2o8L/v/8Z/v7+A8R/Gf6y8TL8AdLdAmsY/v/6y+CzmLUG3QAQAAggFJcwG/oH/Hn/2oaRi2/Pv9cPH/2andEca8a35o8Kp7LlsyKBZ5pfRLGFMEAAMYDCBIbZuu/vZ++6vZvFvSAAxFcRZGD5Vsm6VdfKuoK9+85etp77+5HVwzBAAKFwmEr3z0fmz/dmagzXZLSA8ZnLUOVhGCCAGLAJwnCgKoMRPnkYBggwAB7mUT+/Zgm1AAAAAElFTkSuQmCC';
				
		function writeCookie() {
            var a = healOn + "|" + expOn + "|" + healat + "|" + stopat + "|" + Robstopat + "|" + jobsOn + "|" + pauseOn + "|" + pauseRob + "|" + killtehmbar + "|" + killcarosell + "|" + rref + "|" + rjref + "|" + stopEn + "|" + stopSta;
            createCookie("toolbarx", a)
        }
		
        function readCookieSettings() {
            try {
                var a = readCookie("toolbarx");
                if (a == null || (/undefined/.test(a)) || a.length < 12) {
                    healOn = false;
					expOn = false;
                    healat = 500;
                    stopat = 500;
					Robstopat = 500;
                    jobsOn = false;
                    pauseOn = false;
					pauseRob = false;
					killtehmbar = false;
					killcarosell = false;
					rref = 5900;
                    rjref = 1000;
					stopEn = 0;
					stopSta = 0;

                    writeCookie();
                    return
                }
                a = a.split("|");
                healOn = a[0];
				expOn = a[1];
                healat = a[2];
                stopat = a[3];
				Robstopat = a[4];
                jobsOn = a[5];
                pauseOn = a[6];
				pauseRob = a[7];
				killtehmbar = a[8];
				killcarosell = a[9];
				rref = a[10] || 5900;
                rjref = a[11] || 1000;
				stopEn = a[12] || 0;
				stopSta = a[13] || 0;

            } catch (e) {}
        }
        
		function createCookie(a, b) {
            var c = new Date();
            c.setDate(c.getDate() + 120);
            document.cookie = a + "=" + b + ";expires=" + c.toGMTString() + "; path=/"
        }
		
        function readCookie(a) {
            var i, cookie, nameEQ = a + "=",
                cookieArray = document.cookie.split(";");
            for (i = 0; i < cookieArray.length; i++) {
                cookie = cookieArray[i];
                while (cookie.charAt(0) == " ") {
                    cookie = cookie.substring(1, cookie.length)
                }
                if (cookie.indexOf(nameEQ) == 0) {
                    return cookie.substring(nameEQ.length, cookie.length)
                }
            }
            return null
        }

		function topshelfstuff() {
		// Start Esailija & Mr Sim y0 Magic edit
			var mlbarr = 0;
			mlbarr = window.setInterval( function(){
				if( document.getElementById("mw_like_button") ) {
					$('#mw_like_button').remove();
					window.clearInterval ;
				}
			}, 50 );
			var sbarr = 0;
			sbarr = window.setInterval( function(){
				if( document.getElementById("snapi_zbar") ) {
					$('#snapi_zbar').parent().remove();
					window.clearInterval ;
				}
			}, 50 );
		// End Esailija & Mr Sim y0 Magic edit
		}topshelfstuff()
		
        function toggleRob() {
            if (RobOn == true) {
				RobOn = false;
                document.getElementById("RobOnOff").setAttribute("class", "sexy_button_new short black");
                document.getElementById("RobOnOff").innerHTML = '<span class="sexy_health_new"><span><img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_stamina_16x16.png"></span></span>'
                } else {
					do_ajax ('mainDiv', 'remote/html_server.php?xw_controller=robbing&xw_action=view&xw_city='+WhereAmI+'')
					setTimeout(LetThereBeRobberies, 3500);
					RobOn = true;
					Rboards = 0;
					currstam = parseInt(document.getElementById('user_stamina').innerHTML);
					currexp = parseInt(document.getElementById('exp_to_next_level').innerHTML);		 
					document.getElementById("RobOnOff").setAttribute("class", "sexy_button_new short red");
					document.getElementById("RobOnOff").innerHTML = '<span class="sexy_health_new"><span><img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_stamina_16x16.png"></span></span>'
                }
        }
		
		function toggleEXP() {
		    if (expOn == true) {
                expOn = false;
                clearInterval(en2xpInterval);
                document.getElementById("E2XPOnOff").setAttribute("class", "sexy_button_new short black");
                document.getElementById("E2XPOnOff").innerHTML = '<span class="sexy_health_new"><span>' + '<img src="'+en2xppic+'">' + '</span></span>';
            }else {
				expOn = true;
                en2xpInterval = setInterval(GiveMeXP, 3000);				
                document.getElementById("E2XPOnOff").setAttribute("class", "sexy_button_new short white");
                document.getElementById("E2XPOnOff").innerHTML = '<span class="sexy_health_new"><span>' + '<img src="'+en2xppic+'">' + '</span></span>';
            }		
			writeCookie();
		}

        function toggleHeal() {
            if (healOn == true) {
                healOn = false;
                clearInterval(healInterval);
                document.getElementById("HealOnOff").setAttribute("class", "sexy_button_new short black");
                document.getElementById("HealOnOff").innerHTML = '<span class="sexy_health_new"><span><img  src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_health_16x16_01.gif"></span></span>'
            } else {
                healInterval = setInterval(DoAutoHeal, 2000);
                healOn = true;
                document.getElementById("HealOnOff").setAttribute("class", "sexy_button_new short green");
                document.getElementById("HealOnOff").innerHTML = '<span class="sexy_health_new"><span><img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_health_16x16_01.gif"></span></span>'
            }
            writeCookie()
        }
		
        function toggleJobs() {
            if (jobsOn == true) {
                NYjobon = false;
                jobsOn = false;
                clearInterval(energyInterval);
                document.getElementById("JobsOnOff").setAttribute("class", "sexy_button_new short black");
                document.getElementById("JobsOnOff").innerHTML = '<span class="sexy_health_new"><span><img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_energy_16x16_01.gif"></span></span>'
            } else {
                energyInterval = setInterval(Jobber, (rjref));
                jobsOn = true;
                document.getElementById("JobsOnOff").setAttribute("class", "sexy_button_new short green");
                document.getElementById("JobsOnOff").innerHTML = '<span class="sexy_health_new"><span><img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_energy_16x16_01.gif"></span></span>'
            }
            writeCookie()
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
                if (document.getElementById("TBX_links")) {
                    toolbar_div = document.getElementById("TBX_links");
                    document.getElementById("tools_container").addEventListener("click", toggleToolsMenu, false);
                    document.getElementById("tools_container").addEventListener("mouseover", openToolsMenu, false);
                    document.getElementById("tools_container").addEventListener("mouseout", closeToolsMenu, false)
                } else {
                    toolbar_div = document.createElement("div");
                    toolbar_div.id = "TBX_links";
                    toolbar.appendChild(toolbar_div);
                    var toolbarhtml = '<style type="text/css">#toolsMenu {border: 1px solid #cdcdcd; border-width: 0 1px 1px; font-size: 12px; font-weight: bold; margin: 0 2px;}</style><div id="tools_container" style="width: 148px; position: relative; left: 600px; top: 173px;"><a class="sexy_button_new short black_white_border" style="width: 143px;"><span><span style="background: transparent url(http://mwfb.static.zynga.com/mwfb/graphics/dropdown_travel_arrow.gif) no-repeat scroll 125px 50%; text-align: left; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous;">Furyans Tools</span</span></a><div id="toolsMenu" style="z-index: 20; display: none;margin-top:-2px;width:150x;" ><a  href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://spocklet.com/bookmarklet/assassin-a-nator.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B"><div class="sexy_destination middle">&nbsp;&nbsp;Assassin-a-Nator</div></a><a  href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://spocklet.com/bookmarklet/robber.bg.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B">' + '<div class="sexy_destination middle">&nbsp;&nbsp;Robber BG</div></a><a  href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://spocklet.com/bookmarklet/family-boss-fighter.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B">' + '<div class="sexy_destination middle">&nbsp;&nbsp;Boss Fight</div></a><a  href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://www.exellerate.com/mafia/link-a-nator.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B"><div class="sexy_destination middle">&nbsp;&nbsp;Link-a-Nator</div></a><a href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://www.exellerate.com/mafia/mystery_bagger.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B">' + '<div class="sexy_destination middle">&nbsp;&nbsp;Bagman Mugger</div></a><a href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://www.exellerate.com/mafia/free_gift_get_a_nator.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B"><div class="sexy_destination middle">&nbsp;&nbsp;Get-a-Nator </div></a><a  href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://spocklet.com/bookmarklet/stream-scanner.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B">' + '<div class="sexy_destination middle">&nbsp;&nbsp;Stream Scanner</div></a><a href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://www.exellerate.com/mafia/loose_slots.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B"><div class="sexy_destination middle">&nbsp;&nbsp;Lose Slots</div></a><a href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://unlockedmw.com/toolbar/switch.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B"><div class="sexy_destination middle">&nbsp;&nbsp;Switch</div></a><a  href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://simony.dk/gs/Chucker.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B"><div class="sexy_destination middle">&nbsp;&nbsp;Chucker</div></a><a  href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://www.spockholm.com/mafia/minipack.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B"><div class="sexy_destination middle">&nbsp;&nbsp;Mini Pack</div></a><a  href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://www.creallaborate.com/guessx/gxsdrone.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B"><div class="sexy_destination middle">&nbsp;&nbsp;Drone.〤</div></a><a  href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://www.creallaborate.com/guessx/ineed.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B"><div class="sexy_destination middle">&nbsp;&nbsp;I Need.〤</div></a><a  href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://www.creallaborate.com/guessx/icollect.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B"><div class="sexy_destination middle">&nbsp;&nbsp;I Collect.〤</div></a></div></div>'; 
					toolbar_div.innerHTML = toolbarhtml;
                    document.getElementById("tools_container").addEventListener("click", toggleToolsMenu, false);
                    document.getElementById("tools_container").addEventListener("mouseover", openToolsMenu, false);
                    document.getElementById("tools_container").addEventListener("mouseout", closeToolsMenu, false)
                }
            }
        }
        function Toolbar() {
            var toolbar = document.getElementById("menubar");
            if (toolbar) {
                var toolbar_div;
                if (document.getElementById("tbx_toolbar")) {
                    toolbar_div = document.getElementById("tbx_toolbar");
                    document.getElementById("BankButtonB").addEventListener("click", Bank, false);
					document.getElementById('E2XPOnOff').addEventListener('click', toggleEXP, false);
                    document.getElementById("HealOnOff").addEventListener("click", toggleHeal, false);
                    document.getElementById("RobOnOff").addEventListener("click", toggleRob, false);
                    document.getElementById("tbxSettings").addEventListener("click", Settings, false);
                } else {
                    toolbar_div = document.createElement("div");
                    toolbar_div.id = "tbx_toolbar";
                    toolbar.appendChild(toolbar_div);
                    var toolbarhtml = '<div id="toolbar_content" class="clearfix empire_module_title" style="height: 30px;width:750px;"><a href="http://spockon.me/u" id="logo" target="_blank" title="Check my Bookmarklet site out!" style="position:relative; top:-5px;" > ' + 'Furyans</a> '+iLike+'<a id="tbxSettings" title="Settings" style="position:relative; top:-5px; left:145px;" class="sexy_button_new short black"><span class="sexy_health_new"><span><img src="http://mwfb.static.zgncdn.com/mwfb/graphics/v3/icon_hammer_wrench.png"></span></span></a><a class="sexy_button_new short black" id="BankButtonB" title="Bank all money" style="position:relative; top:-5px; left:150px"><span><span><img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_cash_16x16_01.gif"></span></span></a><a id="RobOnOff" title="Start Robbing" style="position:relative; top:-5px; left:155px;" class="sexy_button_new short black"><span class="sexy_health_new"><span><img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_stamina_16x16.png"></span></span></a><a id="E2XPOnOff" title="EN2XP On/Off" style="position: relative; top:-5px; left:160px;" class="sexy_button_new short black">' + '<span class="sexy_health_new"><span>' + '<img src="'+en2xppic+'">' + '</span></span></a><a id="HealOnOff" title="AutoHeal On/Off" style="position:relative; top:-5px; left:165px;" class="sexy_button_new short black"><span class="sexy_health_new"><span><img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_health_16x16_01.gif"></span></span></a><a id="JobsOnOff" title="RepeatJob On/Off" style="position:relative; top:-5px; left:170px;" class="sexy_button_new short black"><span class="sexy_health_new"><span><img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_energy_16x16_01.gif"></span></span></a>';
                    toolbar_div.innerHTML = toolbarhtml;
                    document.getElementById("BankButtonB").addEventListener("click", Bank, false);
   					document.getElementById('E2XPOnOff').addEventListener('click', toggleEXP, false);
					document.getElementById("HealOnOff").addEventListener("click", toggleHeal, false);
                    document.getElementById("RobOnOff").addEventListener("click", toggleRob, false);
                    document.getElementById("JobsOnOff").addEventListener("click", toggleJobs, false);
                    document.getElementById("tbxSettings").addEventListener("click", Settings, false);
                    if (RobOn == "true" || RobOn == true) {
                        document.getElementById("RobOnOff").setAttribute("class", "sexy_button_new short red");
                        document.getElementById("RobOnOff").innerHTML = '<span class="sexy_health_new"><span><img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_stamina_16x16.png"></span></span>'
                    }
					if (expOn == 'true' || expOn == true) {
                        document.getElementById("E2XPOnOff").setAttribute("class", "sexy_button_new short white");
                        document.getElementById("E2XPOnOff").innerHTML = '<span class="sexy_health_new"><span>' + '<img src="'+en2xppic+'">' + '</span></span>';
                    }
                    if (healOn == "true" || healOn == true) {
                        document.getElementById("HealOnOff").setAttribute("class", "sexy_button_new short green");
                        document.getElementById("HealOnOff").innerHTML = '<span class="sexy_health_new"><span><img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_health_16x16_01.gif"></span></span>'
                    }
                    if (jobsOn == "true" || jobsOn == true) {
                        document.getElementById("JobsOnOff").setAttribute("class", "sexy_button_new short green");
                        document.getElementById("JobsOnOff").innerHTML = '<span class="sexy_health_new"><span><img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_energy_16x16_01.gif"></span></span>'
                    }
                }
            }
            ExternalLinks()
        }
		
        function Jobber() {
            if (NYjobon || BKjobon || ILVjobon || Bjobon) {
                if (pauseOn) {
                    if (parseInt(document.getElementById("exp_to_next_level").innerHTML) < stopat) {
                        NYjobon = false;
                        BKjobon = false;
                        ILVjobon = false;
                        Bjobon = false;
						document.getElementById("JobsOnOff").setAttribute("class", "sexy_button_new short black");	
						document.getElementById("JobsOnOff").innerHTML = '<span class="sexy_health_new"><span>' + '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_energy_16x16_01.gif">' + '</span></span>';
					return
                    }
                }
				if (parseInt(document.getElementById("user_energy").innerHTML) < stopEn) {
					NYjobon = false;
                    BKjobon = false;
                    ILVjobon = false;
                    Bjobon = false;
					document.getElementById("JobsOnOff").setAttribute("class", "sexy_button_new short black");
					document.getElementById("JobsOnOff").innerHTML = '<span class="sexy_health_new"><span>' + '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_energy_16x16_01.gif">' + '</span></span>';
				return;
				}
                var Job;
                var url;
                if (NYjobon) {
                    Job = document.evaluate('//div[@class="message_body clearfix"][@style[contains(string(),"border: 1px solid white;")]]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                    Job = Job.snapshotItem(0).innerHTML;
                    city = /mw_city(\d)/.exec(document.getElementById("mw_city_wrapper").className)[1];
                    if (parseInt(document.getElementById("user_energy").innerHTML) < parseInt((/([\d]+) Energy/.exec(Job))[1])) {
                        NYjobon = false;
                        return
                    }
                    url = "html_server.php?xw_controller=job&xw_action=dojob&xw_city=" + city + "&tmp=" + (/tmp=([\da-f]+)/.exec(Job))[1] + "&cb=" + (/cb=([\da-f]+)/.exec(Job))[1] + "&xw_person=" + (/person=([\d]+)/.exec(Job))[1] + "&job=" + (/job=([\d]+)/.exec(Job))[1] + "&tab=" + (/tab=([\d]+)/.exec(Job))[1]
                } else {
                    if (BKjobon) {
                        if ((/Do This Job Again!/.test(document.getElementById("inner_page").innerHTML))) {
                            Job = document.evaluate("//a[@class='sexy_button_new short orange sexy_energy_new'][contains(string(),'Do This Job Again!')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                            url = "html_server.php?" + (/xw_controller=job&xw_action=dojob([&\w\d\=]+)/.exec(Job.snapshotItem(0).onclick))[0]
                        } else {
                            if ((/Do This Job Again/.test(document.getElementById("inner_page").innerHTML))) {
                                Job = document.evaluate("//a[@class='sexy_button_new short orange sexy_energy_new'][contains(string(),'Do This Job Again')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                                url = "html_server.php?" + (/xw_controller=story&xw_action=dojob([&\w\d\=]+)/.exec(Job.snapshotItem(0).onclick))[0]
                            } else {
                                BKjobon = false;
                                return
                            }
                        }
                    } else {
                        if (ILVjobon) {
                            if (document.getElementsByClassName("buy_prompt").length > 0) {
                                ILVjobon = false;
                                return
                            }
                            city = /mw_city(\d)/.exec(document.getElementById("mw_city_wrapper").className)[1];
                            Job = document.evaluate('//div[@class="job_info"][@style[contains(string(),"255, 255, 255")]]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                            Job = parseInt((/job([\d]+)/.exec(Job.snapshotItem(0).id))[1]);
                            if (([4, 6, 8, 13, 16, 25, 28, 31, 39, 42, 46, 49, 52, 59, 60, 61, 70, 74, 79, 82].indexOf(Job) !== -1 && city == 6) || ([5, 11, 12, 20, 23, 33, 41, 46, 51, 54, 56, 62, 65, 67, 72, 76, 78].indexOf(Job) !== -1 && city == 5)) {
                                ExpertMapController.selectNode(Job);
                                return MapController.doFightJob(Job, (/(p\|[\d]+)/.exec(document.getElementById("fight_list0").onclick))[1], 1, (/'p\|([\d]+)',0,'(.+)'\);/.exec(document.getElementById("fight_list0").onclick))[2])
                            } else {
                                ExpertMapController.selectNode(Job);
                                return MapController.panelButtonDoJob(Job)
                            }
                        } else {
                            if (Bjobon) {
                                var clickMe = document.getElementById("btn_dojob_" + Bjobid);
                                var evt = document.createEvent("MouseEvents");
                                evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                                clickMe.dispatchEvent(evt);
                                return
                            }
                        }
                    }
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
                            document.getElementById("level_bar").setAttribute("style", "overflow-x: hidden; overflow-y: hidden; background-color: rgb(41, 202, 49); text-align: left; float: left; width: " + (/percent_complete":([\d]+),"/.exec(response))[1] + "%;");
                            document.getElementById("user_stamina").innerHTML = (/"user_stamina":([\d]+),"user_max_stamina/.exec(response))[1]
                        } else {
                            if ((/user_cash_nyc'\] = "([$\d,]+)/.test(response))) {
                                document.getElementById("inner_page").innerHTML = response;
                                document.getElementById("user_energy").innerHTML = (/user_energy'\] = parseInt\("([\d]+)/.exec(response))[1];
                                document.getElementById("level_bar").setAttribute("style", "overflow-x: hidden; overflow-y: hidden; background-color: rgb(41, 202, 49); text-align: left; float: left; width: " + (/percent_complete'\] = "([\d]+)/.exec(response))[1] + "%;");
                                document.getElementsByClassName("cur_cash").innerHTML = (/user_cash'\] = parseInt\("([\d]+)/.exec(response))[1];
                                document.getElementById("exp_to_next_level").innerHTML = (/exp_to_next_level'\] = parseInt\("([\d]+)/.exec(response))[1];
                                document.getElementById("user_cash_nyc").innerHTML = (/user_cash_nyc'\] = "([$\d,]+)"/.exec(response))[1];
                                document.getElementById("user_cash_bangkok").innerHTML = (/user_cash_bangkok'\] = "([B$\d,]+)"/.exec(response))[1];
                                document.getElementById("user_cash_italy").innerHTML = (/'user_cash_italy'\] = "([L$\d,]+)"/.exec(response))[1];
                                document.getElementById("user_cash_vegas").innerHTML = (/'user_cash_vegas'\] = "([V$\d,]+)"/.exec(response))[1];
                                document.getElementById("user_cash_brazil").innerHTML = (/'user_cash_brazil'\] = "([BRL$\d,]+)"/.exec(response))[1]
                            }
                        }
                    }
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
                    local_xw_sig = (/local_xw_sig = '([0-9a-f]+)/.exec(response))[1]
                }
            }
        }

        function DoAutoHeal() {
            var url = "html_server.php?xw_controller=survey&xw_action=show_nps_survey&xw_client_id=8";
            var maxHealth = parseInt(document.getElementById("user_max_health").innerHTML);
            var CurHealth = parseInt(document.getElementById("user_health").innerHTML);
            var client = new XMLHttpRequest();
            client.open("POST", url, true);
            client.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            client.setRequestHeader("Accept", "*/*");
            client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            client.send("ajax=1&liteload=1&sf_xw_user_id=" + xw_user + "&sf_xw_sig=" + local_xw_sig + "&skip_req_frame=1");
            client.onreadystatechange = function () {
                if (this.readyState == 4) {
                    response = client.responseText;
                    CurHealth = document.getElementById("user_health").innerHTML = (/user_health":([\d]+)."/.exec(response))[1]
                }
            };
            if (parseInt(CurHealth) < healat) {
                HealNY()
            }
        }

        function Bank() {
            city = /mw_city(\d)/.exec(document.getElementById("mw_city_wrapper").className)[1];
            if (city == 5) {
                vegascash = /V\$([\d,]+)/.exec(document.getElementById("user_cash_vegas").innerHTML)[1];
                vegascash = parseInt(vegascash.replace(/\,/g, ""));
                url = "html_server.php?xw_controller=propertyV2&xw_action=doaction&xw_city=5&doaction=ActionBankDeposit&amount=" + vegascash + "&building_type=6&city=5&xw_client_id=8"
            } else {
                url = "html_server.php?xw_controller=bank&xw_action=deposit_all&xw_city=" + city + "&amount=1000000000"
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
                        document.getElementById("user_cash_brazil").innerHTML = (/user_cash_brazil":"([BRL$\d,]+)"/.exec(response))[1]
                    }
                }
            }
        }

        function HealNY() {
            url = "html_server.php?xw_controller=hospital&xw_action=heal&xcity=1";
            send = "ajax=1&liteload=1&sf_xw_user_id=" + xw_user + "&sf_xw_sig=" + local_xw_sig;
            var client = new XMLHttpRequest();
            client.open("POST", url, true);
            client.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            client.send(send);
            client.onreadystatechange = function () {
                if (this.readyState == 4) {
                    response = client.responseText;
                    CurHealth = parseInt((/user_health":([\d]+),/.exec(response))[1]);
                    document.getElementById("user_health").innerHTML = CurHealth
                }
            }
        }
		
        function Settings() {
            popupTitle = "Furyans Settings";
            content = '<div align="center"><hr><br>Heal Threshold&nbsp;<input value="' + healat + '" type="integer" style= "resize:none;width:50px;" id="postformid2"><br><br>Robbing Refresh Rate&nbsp;<input value="' + (rref / 1000) + '" type="integer" style= "resize:none;width:35px;" id="postformid5"><br><br>RepeatJob Refresh Rate&nbsp;<input value="' + (rjref / 1000) + '" type="integer" style= "resize:none;width:35px;" id="postformid6"><br><br><input type="checkbox" id="pausecheck" name="pausecheck" value="Checked">Pause at XP remaining&nbsp;<input value="' + stopat + '" type="integer" style= "resize:none;width:50px;" id="postformid3"><br><br><input type="checkbox" id="pauserobck" name="pauserobck" value="Checked">Stop Robbing with XP remaining&nbsp;<input value="' + Robstopat + '" type="integer" style= "resize:none;width:35px;" id="postformid4"><br><br>Stop with <img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon-energy.gif"><input value="' + stopEn + '" type="integer" style= "resize:none;width:30px;" id="postformid7"> remaining<br><br>Stop with <img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_stamina_16x16.png"><input value="' + stopSta + '" type="integer" style= "resize:none;width:30px;" id="postformid8"> remaining<br><br><input type="checkbox" id="ihatembar" name="ihatembar" value="Checked">Kill the missions bar*<br><br><input type="checkbox" id="killcaro" name="killcaro" value="Checked">Kill the Carousel*<br><br><a id="SaveSettings" class="sexy_button_new black"><span><span>Save</span></span></a><br><font size="1">*Things marked with a star require manually reloading <br>MW when turning off.</font><br></div>';
            height = "495";
            myPop(popupTitle, content, height);
            document.getElementById("SaveSettings").onclick = saveSettings;
            if (pauseOn) {
                document.getElementById("pausecheck").checked = true
            }
			if (pauseRob) {
                document.getElementById("pauserobck").checked = true
            }
			if (killtehmbar) {			
				document.getElementById("ihatembar").checked = true
			}
			if (killcarosell) {			
				document.getElementById("killcaro").checked = true
			}
        }

		function myPop(popupTitle, content, height) {
            var pop = '<div id="myPopup" class="pop_box " style="display: block; top:25px;left: 200px; width:350px;height:' + height + 'px;z-index:999;"><a id="myPopupClose" href="#" onclick="$(\'#myPopup\').hide();$(\'#myPopup\').fadeOut(200);$(\'#content_row\').height(\'auto\');$(\'#myPopup .trigger_on_hide\').trigger(\'MW.hide\');return false;" class="pop_close"></a><div class="account_settings_title"><span style=" position:relative; left:100px; top:10px;font-weight:bold;">' + popupTitle + '</span></div><br><span style="text-align:center;">' + content + "</span></div>";
            document.getElementById("popup_fodder").innerHTML = pop
        }		

        function saveSettings() {
            setTimeout(myPopupClose, 10);
            rref = parseInt(document.getElementById("postformid5").value) * 1000;
            rjref = parseInt(document.getElementById("postformid6").value) * 1000;			
            healat = parseInt(document.getElementById("postformid2").value);
            stopat = parseInt(document.getElementById("postformid3").value);
   			stopEn = parseInt(document.getElementById("postformid7").value);
			stopSta = parseInt(document.getElementById("postformid8").value);
			Robstopat = parseInt(document.getElementById("postformid4").value);
			if (document.getElementById("pausecheck").checked == true) {
                pauseOn = true
            } else {
                pauseOn = false
            }
			if (document.getElementById("pauserobck").checked == true) {
                pauseRob = true
            } else {
                pauseRob = false
            }
			if (document.getElementById("ihatembar").checked == true) {
                killtehmbar = true
				setInterval(barbar, 1500);
			} else {
                killtehmbar = false
				clearInterval(barbar);
			}
			if (document.getElementById("killcaro").checked == true) {
                killcarosell = true
				setInterval(mainmod, 1500);
			} else {
                killcarosell = false
			}
            writeCookie()
        }
		
		function mainmod() {
			try {
				document.getElementById('FeaturedEventsModule').parentNode.removeChild(document.getElementById('FeaturedEventsModule'))
			} catch (err) {}
		}
		
		function barbar() {
			try {
				document.getElementById('quest_bar').parentNode.removeChild(document.getElementById('quest_bar'))
			} catch (err) {}
		}

        function getRadioValue(radioObject) {
            var value = null;
            var i;
            for (i = 0; i < radioObject.length; i++) {
                if (radioObject[i].checked) {
                    value = radioObject[i].value;
                    break
                }
            }
            return value
        }

        function myPopupClose() {
            $("#myPopup").hide();
            $("#myPopup").fadeOut(750);
            $("#content_row").height("auto");
            $("#myPopup.trigger_on_hide").trigger("MW.hide");
            return
        }

		function getCity(){
			var city = $('#mw_city_wrapper').attr('class');
			switch(city){
				case 'mw_city1':
					return 'NewYork';
				case 'mw_city2':
					return 'Cuba';
				case 'mw_city3':
					return 'Moscow';
				case 'mw_city4':
					return 'Bangkok';
				case 'mw_city5':
					return 'LasVegas';
				case 'mw_city6':
					return 'Italy';
				case 'mw_city7':
					return 'Brazil';
				default:
					return 'UnknowCity';
			}
		}
		
		function GiveMeXP(){
			switch(getCity()){
				case 'NewYork':
					$('.job_reward').children('.experience').each(function(){
					var en = parseInt($(this).parent().parent().children('.job_energy').children('.energy').text());
					var exp = parseInt($(this).text());
					var ratio = (exp/Math.max(en,0)).toFixed(4);
					$(this).html(exp+' <span style="font-size:75%;font-weight:100;color:#666666;">['+ratio+']</span>');});
				break;
				case 'Cuba':
					$('.job_reward').children('.experience').each(function(){
					var en = parseInt($(this).parent().parent().children('.job_energy').children('.energy').text());
					var exp = parseInt($(this).text());
					var ratio = (exp/Math.max(en,0)).toFixed(4);
					$(this).html(exp+' <span style="font-size:75%;font-weight:100;color:#666666;">['+ratio+']</span>');});
				break;
				case 'LasVegas':
					$('.job_pays').children('.clearfix').children('.experience').each(function(){
					var en = parseInt($(this).parent().parent().parent().parent().children('.job_uses').children('.clearfix').children('.energy').text());
					if(isNaN(en)){en = parseInt($(this).parent().parent().parent().parent().children('.job_uses').children('.clearfix').children('.stamina').text());}
					var exp = parseInt($(this).text());var ratio = (exp/Math.max(en,0)).toFixed(4);
					$(this).html(exp+' <span style="font-size:75%;font-weight:100;color:#666666;">['+ratio+']</span>');});					
				break;
				case 'Italy':
					$('.job_pays').children('.clearfix').children('.experience').each(function(){
					var en = parseInt($(this).parent().parent().parent().parent().children('.job_uses').children('.clearfix').children('.energy').text());
					if(isNaN(en)){en = parseInt($(this).parent().parent().parent().parent().children('.job_uses').children('.clearfix').children('.stamina').text());}
					var exp = parseInt($(this).text());var ratio = (exp/Math.max(en,0)).toFixed(4);
					$(this).html(exp+' <span style="font-size:75%;font-weight:100;color:#666666;">['+ratio+']</span>');});					
				break;
				case 'Brazil':								
					$('.job').each(function(index){
					var energy = $(this).find('.uses.clearfix').find('.energy').attr('current_value');
					var experience = $(this).find('.pays.clearfix').find('.experience').attr('current_value');
					var ratio = (experience/energy).toFixed(4);
					$(this).find('.uses.clearfix').find('.energy').html(energy+ '<span style="font-size:75%;font-weight:100;color:#666666;"> ['+ratio+']</span>');});
				break;		
			}
		}	
		
		function HereYouIs() {
			if ($('#mw_city_wrapper').hasClass('mw_city1')) {
				return 1
			} else if ($('#mw_city_wrapper').hasClass('mw_city2')) {
				return 2
			} else if ($('#mw_city_wrapper').hasClass('mw_city3')) {
				return 3
			} else if ($('#mw_city_wrapper').hasClass('mw_city4')) {
				return 4
			} else if ($('#mw_city_wrapper').hasClass('mw_city5')) {
				return 5
			} else if ($('#mw_city_wrapper').hasClass('mw_city6')) {
				return 6
			} else if ($('#mw_city_wrapper').hasClass('mw_city7')) {
				return 7
			} else if ($('#mw_city_wrapper').hasClass('mw_city8')) {
				return 8
			}	
		}
		
        function CloseDoopidPopup() {
            if ($(".pop_bg").length > 0) {
                $(".pop_bg").each(function () {
                    var id = this.id;
                    MW.Popup.hide(id.substr(id.lastIndexOf("_") + 1))
                })
            }
        }

        function LetThereBeRobberies() {
            var DoesIHaveStam = parseInt(document.getElementById("user_stamina").innerHTML);
			if (!RobOn){
				return;
			}	
			if (parseInt(document.getElementById("user_stamina").innerHTML) < stopSta) {
				RobOn = false;
				document.getElementById("RobOnOff").setAttribute("class", "sexy_button_new short black");
				document.getElementById("RobOnOff").innerHTML = '<span class="sexy_health_new"><span>' + '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_stamina_16x16.png">' + '</span></span>';
				return;
			}
			if (pauseRob) {
				if (parseInt(document.getElementById("exp_to_next_level").innerHTML) < Robstopat) {
					RobOn = false;
					document.getElementById("RobOnOff").setAttribute("class", "sexy_button_new short black");
					document.getElementById("RobOnOff").innerHTML = '<span class="sexy_health_new"><span>' + '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_stamina_16x16.png">' + '</span></span>';
					return;
				}
			} 
			if (DoesIHaveStam < 50) {
                var anystam = parseInt(document.getElementById("user_stamina").innerHTML);
                var anyexp = parseInt(document.getElementById("exp_to_next_level").innerHTML);
                var XPratio = (currexp - anyexp) / (currstam - anystam);
                alert("Sorry you need more stamina to clear the board!\n\nResults : \n\n Start Stamina : " + currstam + " \n\n End Stamina : " + anystam + "\n\n Boards Cleared: "+Rboards+" \n\n Experience Gained : " + (currexp - anyexp) + "\n\n Exp Ratio achieved : " + XPratio + " \n\n***If the stats look wack its because you leveled & threw the hardcoded calculators outta wack***"); 
				RobOn = false;
				document.getElementById("RobOnOff").setAttribute("class", "sexy_button_new short black");
				document.getElementById("RobOnOff").innerHTML = '<span class="sexy_health_new"><span>' + '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_stamina_16x16.png">' + '</span></span>';
				return;
            } else {
                do_ajax("", "remote/html_server.php?xw_controller=robbing&xw_action=rob&xw_city=" + WhereAmI + "&slot=0", 1, 0, RobbingController.preRob(0), RobbingController.rob);
                do_ajax("", "remote/html_server.php?xw_controller=robbing&xw_action=rob&xw_city=" + WhereAmI + "&slot=1", 1, 0, RobbingController.preRob(1), RobbingController.rob);
                do_ajax("", "remote/html_server.php?xw_controller=robbing&xw_action=rob&xw_city=" + WhereAmI + "&slot=2", 1, 0, RobbingController.preRob(2), RobbingController.rob);
                do_ajax("", "remote/html_server.php?xw_controller=robbing&xw_action=rob&xw_city=" + WhereAmI + "&slot=3", 1, 0, RobbingController.preRob(3), RobbingController.rob);
                do_ajax("", "remote/html_server.php?xw_controller=robbing&xw_action=rob&xw_city=" + WhereAmI + "&slot=4", 1, 0, RobbingController.preRob(4), RobbingController.rob);
                do_ajax("", "remote/html_server.php?xw_controller=robbing&xw_action=rob&xw_city=" + WhereAmI + "&slot=5", 1, 0, RobbingController.preRob(5), RobbingController.rob);
                do_ajax("", "remote/html_server.php?xw_controller=robbing&xw_action=rob&xw_city=" + WhereAmI + "&slot=6", 1, 0, RobbingController.preRob(6), RobbingController.rob);
                do_ajax("", "remote/html_server.php?xw_controller=robbing&xw_action=rob&xw_city=" + WhereAmI + "&slot=7", 1, 0, RobbingController.preRob(7), RobbingController.rob);
                do_ajax("", "remote/html_server.php?xw_controller=robbing&xw_action=rob&xw_city=" + WhereAmI + "&slot=8", 1, 0, RobbingController.preRob(8), RobbingController.rob);
                setTimeout(RefreshMe, (rref))
				return;
            }
			return;
        }
		
        function RefreshMe() {
            try {
                var IsEveryoneDeadYet = document.evaluate("//a[@id=\"rob_refresh_cost\"]//span//span[contains(string(),'Refresh: 0')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                if (IsEveryoneDeadYet.snapshotLength >= 1) {
                    Rboards++;
					do_ajax("", "remote/html_server.php?xw_controller=robbing&xw_action=refresh");
                    setTimeout(KickMeBackToThirdGrade, 3000)
                } else {
                    LetThereBeRobberies()
                }
            } catch (err) {}
        }
		
        function KickMeBackToThirdGrade() {
            CloseDoopidPopup();
            LetThereBeRobberies()
        }
		
        function startup() {
            readCookieSettings();
            Toolbar();
            if (expOn == 'true' || expOn == true) {
                expOn = true;
                en2xpInterval = setInterval(GiveMeXP, 3000);
            } else {
                expOn = false;
            }
			if (killtehmbar == "true" || killtehmbar == true) {
                killtehmbar = true
				setInterval(barbar, 1500);
            } else {
                killtehmbar = false
            }
			if (killcarosell == "true" || killcarosell == true) {
				killcarosell = true
				setInterval(mainmod, 1500);
            } else {
                killcarosell = false
            }
            if (healOn == "true" || healOn == true) {
                healOn = true;
                healInterval = setInterval(DoAutoHeal, 2000)
            } else {
                healOn = false
            }
            if (jobsOn == "true" || jobsOn == true) {
                jobsOn = true;
                energyInterval = setInterval(Jobber, 1000)
            } else {
                jobsOn = false
            }
            if (pauseOn == "true" || pauseOn == true) {
                pauseOn = true
            } else {
                pauseOn = false
            }
			if (pauseRob == "true" || pauseRob == true) {
                pauseRob = true
            } else {
                pauseRob = false
            }
            setInterval(Toolbar, 10000);
            setInterval(UpdateXWSig, 10000)
        }
		
        if (document.getElementById("tbx_toolbar")) {
            return
        } else {
            startup()
        }

        $("body").ajaxComplete(function (e, xhr, settings) {
            var response = xhr.responseText;
            if (ajax) {
                ajax = false;
                return
            }
            if (document.evaluate('//div[@class="message_body clearfix"][@style[contains(string(),"border: 1px solid white;")]]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0) {
                NYjobon = true
            } else {
                if (NYjobon) {
                    NYjobon = false
                }
            }
            if ((/Do This Job Again/.test(document.getElementById("inner_page").innerHTML))) {
                BKjobon = true
            } else {
                if (BKjobon) {
                    BKjobon = false
                }
            }
            if (document.evaluate('//div[@class="job_info"][@style[contains(string(),"255, 255, 255")]]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0 && document.getElementsByClassName("buy_prompt").length == 0) {
                ILVjobon = true
            } else {
                if (ILVjobon) {
                    ILVjobon = false
                }
            }
            if (/jobResult":{"city":7/.test(response)) {
                Bjobid = /jobResult":{"city":7,"id":(\d+),/.exec(response)[1];
                Bjobon = true
            } else {
                if (Bjobon) {
                    Bjobon = false
                }
            }
        })
    };
injectScript(myscript);