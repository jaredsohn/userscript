// ==UserScript==
// @name    Mg9Hs Bagman Mugger
// @authors        Vern
// @description   bagman opener
// @include         http://www.spockholm.com/mafia/
// @version        1.0
// ==/UserScript==
/*
Credits:
Vern for a lot of code and inspiration, http://vern.com/mwtools/
Francisco Moraes for code to handle mw-friends only.
Max Power for the loot logging code.
Pete Lundrigan for contributing code.
Mg9H's MB auto opener Code
Martin Hedman - Bunches of Guidance and Encouragement
http://www.spockholm.com/mafia/

*/


javascript: (function() {
    var version = 'Mg9Hs Bagman Mugger - PP_mod v1.02 beta (ajax)';
    try {
        if (document.getElementById('app10979261223_iframe_canvas')) {
            window.location.href = document.getElementById('app10979261223_iframe_canvas').src;
            return;
        }
        else if (document.getElementsByClassName('canvas_iframe_util')[0]) {
            window.location.href = document.getElementsByClassName('canvas_iframe_util')[0].src;
            return;
        }
        else if (document.getElementById('some_mwiframe')) {
            //new mafiawars.com iframe
            window.location.href = document.getElementById('some_mwiframe').src;
            return;
        }
        else {
            document.body.parentNode.style.overflowY = "scroll";
            document.body.style.overflowX = "auto";
            document.body.style.overflowY = "auto";
            try {
                document.evaluate('//div[@id="mw_city_wrapper"]/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).style.margin = "auto";
                if (typeof FB != 'undefined') {
                    FB.CanvasClient.stopTimerToSizeToContent;
                    window.clearInterval(FB.CanvasClient._timer);
                    FB.CanvasClient._timer = -1;
                }
                document.getElementById('mw_zbar').parentNode.removeChild(document.getElementById('mw_zbar'));
            }
            catch (fberr) { }
        }
        // from Yevgen Silant'yev, http://joyka.pp.ua/
        function getMWURL() {
            str = document.location;
            str = str.toString();
            beg = str.substring(0, str.indexOf('?') + 1);
            str = str.substring(str.indexOf('?') + 1);
            str = str.split('&');
            mid = '';
            for (var i = 0; i < str.length; i++) {
                if (str[i].indexOf('sf_xw_') == 0) { mid = mid + str[i] + '&'; }
            }
            return beg + mid;
        }
        if (navigator.appName == 'Microsoft Internet Explorer') {
            alert('You are using Internet Explorer, this bookmarklet will not work.\nUse Firefox or Chrome instead.');
            return;
        }
        var MWURL = getMWURL();
        var sf_xw_sig = /sf_xw_sig=([a-fA-F0-9]+)/.exec(MWURL);
        var run = 1, xmlHTTP, content = document.getElementById('popup_fodder'), debug = false, specialmsg = '', output = '',
	x = 0, second = false, last_url = null, retries = 0, tmpkey = false, totalfriends = 0, combinedloot = '', done = 0, list = 0, ach = 1,
	mw_url = 'http://apps.facebook.com/inthemafia/profile.php?id=%7B%22user%22%3A%22ID%22%7D', color = '#BCD2EA',
	fb_url = 'http://www.facebook.com/profile.php?id=', cuba_gained = 0, ny_gained = 0, moscow_gained = 0, bangkok_gained = 0, exp_gained = 0, friends_helped = 0;
        var wait1 = 1, wait2 = 1, skip = 0, city = '', oldcity = '';
        var log_size = 10;
        var log_keep = /(Limit|friends|Facebook|Starting)/;
        var newfriends = [], newnames = [], friendslist = [], nameslist = [], friendarray = [], friendsint = [], namesint = [], names = [];
        var currentPageCount = 1;
        var jobsdone = [];
        var friendquicklist = '', gift_url = '';
        var xw_city = 1;
        //var userid = FB.Facebook.apiClient.get_session().uid+'';
        var userid = /'sf_xw_user_id': '(.+)'/.exec(document.body.innerHTML)[1];
        var fbuserid = FB.Facebook.apiClient.get_session().uid + '';
        //var userid = /sf_xw_user_id=([0-9]+)/.exec(document.body.innerHTML)[1];
        //var myId = /'uid': ([0-9]*)/.exec(document.body.innerHTML)[1];
        var myId = userid;
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var URLs = [];
        var successful = 0, failed = 0, total = 0, leech = false;
        var limit = 5000;

        // createCookie from Vern's Toolkit http://vern.com/mwtools/
        function createCookie(name, value) {
            // expire one month from now
            var expires = new Date();
            expires.setDate(expires.getDate() + 30);
            document.cookie = name + "=" + value + ";expires=" + expires.toGMTString() + "; path=/";
        }

        // readCookie from Vern's Toolkit http://vern.com/mwtools/
        function readCookie(name) {
            var i,
			cookie,
			nameEQ = name + "=",
			cookieArray = document.cookie.split(";");
            for (i = 0; i < cookieArray.length; i++) {
                cookie = cookieArray[i];
                while (cookie.charAt(0) == ' ')
                    cookie = cookie.substring(1, cookie.length);
                if (cookie.indexOf(nameEQ) == 0)
                    return cookie.substring(nameEQ.length, cookie.length);
            }
            return null;
        }

        //Pistol Pete FQL code
        function parseFBFr() {
            var fql = "SELECT activities,about_me, quotes FROM user WHERE (strpos(quotes, 'next_action=accept_gift')>=0 or strpos(activities, 'next_action=accept_gift')>=0 or strpos(about_me, 'next_action=accept_gift')>=0) and uid IN (SELECT uid2 FROM friend WHERE uid1=" + fbuserid + " LIMIT " + limit + ") AND is_app_user = 1"; //FB.Facebook.apiClient.get_session().uid 
            //alert(fql);
            var f = function() {
                var results = [];
                var friendquicklist;
                return {
                    getResults: function() { return results; },
                    process: function(fbfr) {
                        if (fbfr) {
                            for (i = 0; i < fbfr.length; i++) {
                                //results[results.length]={	'id':fbfr[i].uid, 'name':fbfr[i].name };
                                if (fbfr[i].activities != null) {
                                    friendquicklist += fbfr[i].activities + ' ' + fbfr[i].about_me + ' ' + fbfr[i].quotes + ' ';
                                }

                            }
                        }
                        else { friendquicklist = 'Unable to retrieve list. Please try again.'; }
                        //friend=results;
                        document.getElementById('friendlist').value = friendquicklist.replace(/undefined/, '');
                    }
                };
            } ();
            document.getElementById('friendlist').value = 'Loading...Be Patient...';
            FB.Facebook.apiClient.fql_query(fql, f.process);
            return;
        }

        function checkleech() {
            var fql = "SELECT activities,about_me, quotes FROM user WHERE (strpos(quotes, 'next_action=accept_gift')>=0 or strpos(activities, 'next_action=accept_gift')>=0 or strpos(about_me, 'next_action=accept_gift')>=0) and uid=" + userid + " AND is_app_user = 1";
            //alert(fql);
            var f = function() {
                var results = [];
                return {
                    getResults: function() { return results; },
                    process: function(fbfr2) {
                        if (fbfr2) {

                            if (fbfr2.length === undefined) { leech = true; }
                        }
                    }
                };
            } ();
            FB.Facebook.apiClient.fql_query(fql, f.process);
            return;
        }


        //}	

        //wait1 = readCookie('spockjobs_wait1');
        //if (wait1) wait1=wait1.replace(/[^0-9]/g,'');
        if ((wait1 == null) || (wait1.length == 0)) { wait1 = 1; }
        //wait2 = readCookie('spockjobs_wait2');
        //if (wait2) wait2=wait2.replace(/[^0-9]/g,'');
        if ((wait2 == null) || (wait2.length == 0)) { wait2 = 1; }
        skip = 0 //readCookie('brutus_skip');
        if (skip) skip = skip.replace(/[^0-9]/g, '');
        if ((skip == null) || (skip.length == 0)) { skip = 0; }
        redo = "";

        function myRandom(min, max) {
            return min + Math.floor(Math.round((Math.random() * (max - min))));
        }
        // deliberate pause from Vern's toolkit.js, http://vern.com/mwtools/
        // given a number of seconds, an optional message and a resume
        // function, will pause a few seconds and then execute the function
        function pausing(seconds, message, resume_func) {
            // if the message was left out, shuffle things a bit
            if (typeof (message) == 'function') {
                resume_func = message;
                message = null;
            }
            if (message)
                message = message;
            else
                message = 'Pausing';
            msg(message + ' <span id="seconds">' + seconds + ' second' + (seconds == 1 ? '' : 's') + '</span>...');
            //var me = this;
            var timer = setInterval(function() {//)
                seconds--;
                if (document.getElementById('seconds'))
                    document.getElementById('seconds').innerHTML = seconds + ' second' + (seconds == 1 ? '' : 's');
                else
                    clearInterval(timer);
                if (seconds <= 0) {
                    clearInterval(timer);
                    if (typeof (resume_func) == 'function')
                        resume_func();
                }
            }, 1000);
        }
        function unix_timestamp() {
            return parseInt(new Date().getTime().toString().substring(0, 10))
        }
        function getnewgiftlink() {


            var baglink = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=freegifts&xw_action=view&xw_city=1&cb=' + userid + unix_timestamp() + '&tab=2&interstitial_gift_id=527&interstitial_gift_cat=1&interstitial_gift_list=2&do=Proceed+to+Send%21&skip_req_frame=1&sf_xw_user_id=' + userid + '&sf_xw_sig=' + local_xw_sig;
            $.ajax({ type: "GET", url: baglink,
                success: function(msg) {
                    document.getElementById('gift_url').innerHTML = (/<fb:req-choice url='([^']+)'/.exec(msg)[1]);
                }
            });
        }
        var config_html =
	'<style type="text/css">' +
		'.messages img{margin:0 3px;vertical-align:top};' +
		'#close{display:inline};' +
	'</style>' +
	'<form name="spockform">' +
		'<table class="messages">' +
			'<tr><td>Configuration</td><td colspan="2" align="right" style="text-align:right;font-size:0.8em;">' + version + ' - <a href="http://www.spockholm.com/mafia/bookmarklets.php" target="_top">Spockholm Mafia Tools</a> - <a href="http://www.spockholm.com/mafia/donate.php?MysteryBagger" alt="Buy me a beer" target="_blank">PintWare</a> (Donate) - <a href="#" id="close"><img src="http://www.spockholm.com/mafia/stop.gif" title="Close" width="16" height="16"></a></td></tr>' +
			'<tr><td colspan="3"><span class="energy_highlight">You can also try <a id="loadfriendslnk" href="#">clicking here</a>. Wait a while and see if Facebook can help you populate the list.<br />You may need to click a few times.<br /></span></td></tr>' +
			'<tr><td>Limit:</td><td colspan="2"><input type="text" maxlength="5" size="5" id="thelimit" value="' + limit + '"> Number of friends to check, lower this if you are having problems.</td></tr>' +
			'<tr id="manual_list">' +
				'<td valign="top">Money Bag List:</td>' +
				'<td colspan="2"><textarea name="friendlist" id="friendlist" class="instructions" rows="25" cols="50">' +
					'Enter in this box the full money bag url.\n' +
				'</textarea></td>' +
			'</tr>' +
			'<tr><td valign="top">Your MB Link:<br />Add it to <a href="http://www.facebook.com/editprofile.php?sk=basic" target="_blank">Favorite Quotes here</a>.</td><td colspan="2"><span id="gift_url" style="text-align:left;font-size:0.8em;">Loading...</span></td></tr>' +
			'<tr><td colspan="3"><span class="energy_highlight">Copy and paste the link above into the quotes section of your profile page at least DAILY so that your mafia friends can reap the same great rewards that you will when you click start below.</span></td></tr>' +
			'<tr><td>Debug: </td><td><input type="checkbox" name="debug" id="debug" /></td><td> Output messages for debugging?</td></tr>' +
			'<tr><td colspan="3"><a class="sexy_button" id="start">Start</a></td></tr>' +
		'</table>' +
	'</form>';

        var running_html =
	'<style type="text/css">' +
		'.messages img{margin:0 3px;vertical-align:top}' +
		'.messages input {border: 1px solid #FFF;margin 0;padding 0;background: #000; color: #FFF; width: 20px;}' +
		'#play{display:none}' +
		'#pause{display:inline}' +
		'#close{display:inline}' +
	'</style>' +
	'<table class="messages">' +
	'<tr>' +
		'<td></td><td colspan="2" align="right" style="text-align:right;font-size:0.8em;">' + version + ' - <a href="http://www.spockholm.com/mafia/bookmarklets.php" target="_top">Spockholm Mafia Tools</a> - <a href="http://www.spockholm.com/mafia/donate.php?MysteryBagger" alt="Buy me a beer" target="_blank">PintWare</a> (Donate) - <a href="#" id="play"><img src="http://www.spockholm.com/mafia/play.gif" title="Play" width="16" height="16" /></a> <a href="#" id="pause"><img src="http://www.spockholm.com/mafia/pause.gif" title="Pause" width="16" height="16" /></a> <a href="#" id="close"><img src="http://www.spockholm.com/mafia/stop.gif" title="Close" width="16" height="16"></a></td></tr>' +
	'</tr>' +
	'<tr>' +
		'<td width="100">Progress:</td>' +
		'<td><span id="progress"></span></td><td></td>' +
		'</tr>' +
	'<tr>' +
		'<td width="100">Stats:</td>' +
		'<td><span id="stats"></span></td><td></td>' +
	'</tr>' +
		'<tr>' +
		'<td>Status:</td>' +
		'<td colspan="2" id="status"></td>' +
	'</tr>' +
	'<tr>' +
		'<td valign="top"><a href="#" id="lootshow">Showing</a> loot:</td>' +
		'<td colspan="2" id="loot"></td>' +
	'</tr>' +
	'<tr>' +
		'<td valign="top"><a href="#" id="logshow">Showing</a> Log:<br/>Limit: <input id="logsize" name="logsize" type="text" value="' + log_size + '" maxlength="4" /><br /></td>' +
		'<td colspan="2" id="log" valign="top"></td>' +
	'</tr>' +
	'</table>';
        function create_div() {
            if (document.getElementById('spockdiv')) {
                document.getElementById('spockdiv').innerHTML = config_html;
            }
            else {
                var spock_div = document.createElement("div");
                spock_div.id = 'spockdiv';
                spock_div.innerHTML = config_html;
                content.insertBefore(spock_div, content.firstChild);
            }
        }
        create_div();
        parseFBFr();
        checkleech();
        getnewgiftlink();
        //alert(leech);
        if (leech == true) { document.getElementById('start').innerHTML = 'DISABLED - No usable links found. Please load a link in your profile.' }
        document.getElementById('close').onclick = function(e) {
            run = 0;
            //delete xmlHTTP['onreadystatechange'];
            document.getElementById("content_row").removeChild(document.getElementById("spockdiv"));
            return false;
        };
        //document.getElementById("list").onchange=function(e) {
        //if (document.getElementById("list").value == 0) { document.getElementById("manual_list").style.display = 'none'; }
        //else { document.getElementById("manual_list").style.display = 'table-row'; list=1; }
        //};
        //document.getElementById("list").onchange();
        //document.getElementById("friendlist").onfocus=function(e) {
        //document.getElementById("friendlist").value="";
        //document.getElementById("friendlist").style.color="#000";
        //document.getElementById("friendlist").onfocus=null;
        //};


        document.getElementById('loadfriendslnk').onclick = function(e) {
            document.getElementById("friendlist").focus();
            limit = parseInt(document.getElementById('thelimit').value);
            document.getElementById('thelimit').value = limit;
            parseFBFr();
        };

        //document.getElementById('getnewlink').onclick=function(e) {

        //	getnewgiftlink();
        //};

        //start start function
        //document.getElementById('start').onclick=function(e) {
        function start() {
            run = 1;
            //wait1 = parseInt(document.spockform.wait1.value);
            //createCookie("spockjobs_wait1",wait1);
            //wait2 = parseInt(document.spockform.wait2.value);
            //createCookie("spockjobs_wait2",wait2);
            //skip = parseInt(document.spockform.skip.value);
            //createCookie("brutus_skip",skip);

            var tmpURLs = document.getElementById('friendlist').value.split(/[ \n]/);

            for (var i = 0; i < tmpURLs.length; ++i)
                if (tmpURLs[i].indexOf('next_params') >= 0)
                URLs.push(tmpURLs[i]);
            URLs.push('dummyURL');
            total += URLs.length - 1;


            document.getElementById('spockdiv').innerHTML = running_html;

            document.getElementById('stats').innerHTML = "Successful: <span id='successful'>0</span>&nbsp; Failed: <span id='failed'>0</span>";
            document.getElementById('progress').innerHTML = (successful + failed) + ' of ' + total + ' &nbsp; <span class="more_in">(' + ((successful + failed) / total * 100).toFixed(1) + '%)</span>';

            //if (document.getElementById('_summary') == null)
            //document.getElementById('hr_mafia').innerHTML = "<div id='_log'><table id='_MBsum' border='1' style='bordercolor: #ffffff; border-collapse: collapse'><tr id='_MBheader'><td id='_MBheadercount' width='10' style='text-align:center'>Cnt</td><td id='_MBheaderimage' width='80' style='text-align:center'>Image</td><td id='_MBheaderdescription' width='400' style='text-align:center'>Description</td><td id='_MBheaderfrom' width='210' style='text-align:center'>From</td></tr></table></div></div>";
            setTimeout(actionSequentialGetBag, 200);
            msg('Starting....');

            document.getElementById('lootshow').onclick = function(e) {
                var row = document.getElementById("loot");
                if (row.style.display == '') {
                    row.style.display = 'none';
                    document.getElementById("lootshow").innerHTML = 'Hiding';
                }
                else {
                    row.style.display = '';
                    document.getElementById("lootshow").innerHTML = 'Showing';
                }
                return false;
            };

            document.getElementById('logshow').onclick = function(e) {
                var row = document.getElementById("log");
                if (row.style.display == '') {
                    row.style.display = 'none';
                    document.getElementById("logshow").innerHTML = 'Hiding';
                }
                else {
                    row.style.display = '';
                    document.getElementById("logshow").innerHTML = 'Showing';
                }
                return false;
            };

            document.getElementById('pause').onclick = function(e) {
                run = 0;
                document.getElementById("pause").style.display = 'none';
                document.getElementById("play").style.display = 'inline';
                return false;
            };
            document.getElementById('play').onclick = function(e) {
                run = 1;
                document.getElementById("play").style.display = 'none';
                document.getElementById("pause").style.display = 'inline';
                msg('Resuming... (<a href="' + last_url + '">url</a>)');
                retries = 0;
                request(last_url);
                return false;
            };
            function decode64(input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                do {
                    enc1 = keyStr.indexOf(input.charAt(i++));
                    enc2 = keyStr.indexOf(input.charAt(i++));
                    enc3 = keyStr.indexOf(input.charAt(i++));
                    enc4 = keyStr.indexOf(input.charAt(i++));
                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;
                    output = output + String.fromCharCode(chr1);
                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
                } while (i < input.length);
                return unescape(output);
            };

            function actionDo(url, pattern, callback, callback_param, invoke) {
                if (!invoke) {
                    if (callback != undefined) {
                        if (!(callback_param instanceof Array)) {
                            var callback_param2 = [callback_param, false];
                            callback_param = callback_param2;
                        } else {
                            callback_param[callback_param - 1] = false;
                        }
                        setTimeout(function() {
                            callback.apply(document, callback_param);
                        }, 200);
                    }
                } else {
                    $.ajax({
                        type: "POST",
                        url: 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?' + url,
                        data: { 'ajax': 1, 'liteload': 1, 'sf_xw_user_id': myId, 'sf_xw_sig': local_xw_sig },
                        success: function(msg) {
                            var isOk = (msg.indexOf(pattern) >= 0);

                            if (isOk) {
                                if (debug) alert('ok with ' + url);
                            }
                            else {
                                if (debug) alert('not ok with ' + url);
                            }

                            if (pattern == 'by sending a free' && isOk) {
                                var imark;
                                var text = msg;
                                var from;
                                var img;
                                text = text.substr(text.indexOf('You got...'));
                                img = text.substr(text.indexOf('<img'));
                                img = img.substr(img.indexOf("src='") + "src='".length);
                                img = img.substr(0, img.indexOf("'"));
                                var subpattern = 'class="good"';
                                text = text.substr(text.indexOf(subpattern) + subpattern.length);
                                text = text.substr(text.indexOf('>') + 1);
                                imark = text.indexOf('</div>');
                                from = text.substr(imark);
                                text = text.substr(0, imark);
                                text = text.replace(/<br\/>/g, ' ');
                                text = text.replace(/<\/div>/g, ' ');
                                from = from.substr(from.indexOf('Thank ') + 'Thank '.length);
                                from = from.substr(0, from.indexOf(pattern));
                               // alert(text);
                                add_loot(text);
                                // from_user = /from_user=(\d+)/.exec(url)[1];
                                //log('Collected Mystery Bag from ' + from + '. ' + fblink(from_user));
                                //alert('should resuming');  
                            }

                            //alert(' resuming');  

                            if (callback != undefined) {
                                if (!(callback_param instanceof Array)) {
                                    var callback_param2 = [callback_param, isOk];
                                    callback_param = callback_param2;
                                } else {
                                    callback_param[callback_param.length - 1] = isOk;
                                }
                                setTimeout(function() {
                                    callback.apply(document, callback_param);
                                }, 200);
                            }
                        },
                        error: function(msg) {
                            URLs.push('dummyURL');
                            setTimeout(actionSequentialGetBag, 200);
                        }
                    });
                }
            };
            function actionOpenBag(from_user, invoke) {
                msg('Checking Mystery Bag from ' + from_user + '.');
                actionDo('xw_controller=mysterybag&xw_action=mystery_thank&activehustle=send_gifts&from_user=' + from_user, 'by sending a free', actionSequentialGetBag, 'dummy', invoke);
            };
            function actionGetBag(from_user, time_id, gift_cat, gift_id, gkey, invoke) {
                actionDo('xw_controller=interstitial&xw_action=accept_gift&from_user=' + from_user + '&time_id=' + time_id + '&item_cat=' + gift_cat + '&item_id=' + gift_id + '&gkey=' + gkey, '', actionOpenBag, from_user, invoke);
            };
            function actionSequentialGetBag(dummy, invoked) {
                URLs.pop();
                if (debug) msg(URLs.length);
                var currentURL;
                if ((typeof invoked) != 'undefined') {
                    if (invoked) {
                        successful++;
                        document.getElementById('successful').innerHTML = successful + ' (' + parseFloat(successful / total * 100).toFixed(0) + '%)';
                    } else {
                        failed++;
                        document.getElementById('failed').innerHTML = failed + ' (' + parseFloat(failed / total * 100).toFixed(0) + '%)';
                    }
                    document.getElementById('progress').innerHTML = (successful + failed) + ' of ' + total + ' &nbsp; <span class="more_in">(' + ((successful + failed) / total * 100).toFixed(1) + '%)</span>';

                }
                while (1) {
                    if (URLs.length <= 0) { msg('Finished!'); return; }
                    currentURL = URLs[URLs.length - 1];
                    var isCorrect = currentURL.indexOf('next_params=');
                    if (isCorrect >= 0) break; else URLs.pop();
                }
                var str = decode64(currentURL.substr(isCorrect + 'next_params='.length));
                if (debug) alert(str);
                var _from_user = /from_user=([0-9]+)/.exec(str); if (_from_user != null) _from_user = _from_user[1];
                var _time_id = /time_id=([0-9]+)/.exec(str); if (_time_id != null) _time_id = _time_id[1];
                var _gift_cat = /item_cat=([0-9]+)/.exec(str); if (_gift_cat != null) _gift_cat = _gift_cat[1];
                var _gift_id = /item_id=([0-9]+)/.exec(str); if (_gift_id != null) _gift_id = _gift_id[1];
                var _gkey = /gkey=([0-9a-fA-F]+)/.exec(str); if (_gkey != null) _gkey = _gkey[1];
                if (_gkey == null && _gift_id == null && _gift_cat == null && _time_id == null && _from_user == null) {
                    str = unescape(currentURL);
                    _from_user = /"from_user":"(p[|0-9]+)"/.exec(str); if (_from_user != null) _from_user = _from_user[1];
                    _time_id = /"time_id":"([0-9]+)"/.exec(str); if (_time_id != null) _time_id = _time_id[1];
                    _gift_cat = /"item_cat":"([0-9]+)"/.exec(str); if (_gift_cat != null) _gift_cat = _gift_cat[1];
                    _gift_id = /"item_id":"([0-9]+)"/.exec(str); if (_gift_id != null) _gift_id = _gift_id[1];
                    _gkey = /"gkey":"([0-9a-fA-F]+)"/.exec(str); if (_gkey != null) _gkey = _gkey[1];
                }
                actionGetBag(_from_user, _time_id, _gift_cat, _gift_id, _gkey, true);
            };



            document.getElementById('pause').onclick = function(e) {
                run = 0;
                document.getElementById("pause").style.display = 'none';
                document.getElementById("play").style.display = 'inline';
                return false;
            };
            document.getElementById('play').onclick = function(e) {
                run = 1;
                document.getElementById("play").style.display = 'none';
                document.getElementById("pause").style.display = 'inline';
                msg('Resuming job/boost searching... (<a href="' + last_url + '">url</a>)');
                retries = 0;
                request(last_url);
                return false;
            };
            document.getElementById('close').onclick = function(e) {
                run = 0;
                //delete xmlHTTP['onreadystatechange'];
                document.getElementById("popup_fodder").removeChild(document.getElementById("spockdiv"));
                return false;
            };
            //document.getElementById('delay1').onkeyup=function(e) {
            //	time = parseInt(document.getElementById('delay1').value);
            //	if((time < 0) || (!time)) { wait1 = 0; }
            //	else { wait1 = time; }
            //	//createCookie('spockaX_wait1',wait1);
            //	document.getElementById('delay1').value=wait1;
            //};
            //document.getElementById('delay2').onkeyup=function(e) {
            //	time = parseInt(document.getElementById('delay2').value);
            //	if((time < 0) || (!time)) { wait2 = 0; }
            //	else { wait2 = time; }
            //createCookie('spockaX_wait2',wait2);
            //	document.getElementById('delay2').value=wait2;
            //};

            //totalfriends = friends.length;
            //document.getElementById('progress').innerHTML = done+' of '+friends.length+' &nbsp; <span class="more_in">('+(done/totalfriends*100).toFixed(1)+'%)</span>';
            //log(timestamp()+'Starting check of '+friends.length+' friends.');
            //document.getElementById('remaining').onclick=dirtypop;
            //search_job();
        }
        //end start function
        document.getElementById("start").onclick = start;





        // From Vern's toolkit.js, http://vern.com/mwtools/
        // log puts a message in the log array and outputs it
        // limit is how many log lines we keep (0 == infinite)
        // keep is a regex of lines that we never delete
        logs = [];
        extralog = [];
        function logtrunc(message, limit, keep) {
            logs.unshift(message);
            if (limit > 0) {
                if (logs.length > limit) {
                    message = logs.pop();
                    if ((keep.test) && (keep.test(message)))
                        extralog.unshift(message);
                }
            }
            if ((document.getElementById('log')) && (document.getElementById('log').nodeName == 'TD')) {
                document.getElementById('log').innerHTML = logs.concat(extralog, '').join('<br/>');
            }
        }
        function log(s) {
            document.getElementById('loot').innerHTML = combinedloot;
            var l = document.getElementById('log');
            if (s) {
                logtrunc(s, log_size, log_keep);
            }
        }

        var Loots = new Array();
        function add_loot(s) {
            var f = -1;
            for (var i = 0; i < Loots.length && f == -1; ++i) {
                if (Loots[i][0] == s) { f = i; }
            }
            if (f != -1) { Loots[f][1]++; }
            else { Loots[Loots.length] = new Array(s, 1); }
            var t = '';
            Loots.sort();
            for (var i = 0; i < Loots.length; ++i) {
                t += '<span class="good">' + Loots[i][1] + 'x</span> ' + Loots[i][0] + '<br />';
            }
            combinedloot = t;
            log(combinedloot);
        }
        function msg(s) {
            document.getElementById('status').innerHTML = s;
        }
        function commas(s) {
            while (d = /(\d+)(\d{3}.*)/.exec(s)) {
                s = d[1] + ',' + d[2];
            }
            return s;
        }
        function retry(s) {
            if (retries > 3) {
                msg(s + ', not retrying any more.');
            }
            else {
                setTimeout(function() {
                    retries++;
                    msg(s + '; retry #' + retries + '...');
                    request(last_url);
                }, 5000);
            }
        }
        function mwlink(s) {
            return '<span class="more_in">[<a href="' + mw_url.replace(/ID/, s) + '">MW</a>]</span>';
        }
        function fblink(s) {
            return '<span class="more_in">[<a href="' + fb_url + s + '">FB</a>]</span>';
        }
        function fblink2(s) {
            return '<a href="' + fb_url + friends[0] + '">' + s + '</a>';
        }




        function timestamp() {
            now = new Date();
            var CurH = now.getHours();
            CurH = (CurH < 10 ? "0" + CurH : CurH);
            var CurM = now.getMinutes();
            CurM = (CurM < 10 ? "0" + CurM : CurM);
            return '<span class="more_in">[' + CurH + ':' + CurM + ']</span> ';
        }


        //testing to add analytics
        function loadContent(file) {
            var head = document.getElementsByTagName('head').item(0)
            var scriptTag = document.getElementById('loadScript');
            if (scriptTag) head.removeChild(scriptTag);
            script = document.createElement('script');
            script.src = file;
            script.type = 'text/javascript';
            script.id = 'loadScript';
            head.appendChild(script);
        }
        loadContent('http://www.google-analytics.com/ga.js');
        try {
            var pageTracker = _gat._getTracker("UA-8435065-3");
            pageTracker._trackPageview();
            pageTracker._trackPageview("/script/MysteryBagger");
        } catch (err) { }
        //end analytics

    } //end try
    catch (mainerr) {
        var spock_div = document.getElementById('spockdiv');
        if (spock_div) {
            spock_div.innerHTML = '';
        }
        alert('Some error occured, Mystery Bagger not loaded.\nDid you run it on your gift page or unframed MW page?\nIf you did, report the message below (NOT THIS TEXT) to Spockholm:\n\n' + version + '\n' + mainerr);
    }
} ())