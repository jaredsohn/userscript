// ==UserScript==
// @name           Facebook - Stalk this item!
// @namespace      Facebook - Stalk this item!
// @include        http://www.facebook.com/*
// ==/UserScript==


/*
The idea for this userscript and its code was developed entirely by James Poel.
You are not permitted to reupload or copy this userscript.
The script was designed for the English(UK) language on facebook.com.
Any other forms of language may work by are not officially supported.

The sendNotification() function took me many hours of decompiling facebook's internal javascript to get it working,
so that I particularly want to be respected. Please do not copy without permission.

http://www.facebook.com/OMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOMNOM
*/



//CONFIGURATION

var stalkTimeCheck = 10;
	/*the delay between checks of stalked feeds
	Keep this low. It is recommended that this should not fall below 10 seconds,
	Lower delays will reduce your internet speed, increase CPU, and may even crash your browser.*/

var inactiveTime = 0.5;
	/*the time a stalked feed needs to be idle before it is automatically unstalked (days)
	Again, is it strongly recommended that you KEEP THIS LOW. 
	If old stalks do not get removed, the amount of requests being made to facebook will make your internet's speed suffer.*/

var maxStalks = 15;
	/*The maximum feeds you can stalk at any one time, if you exceed this, the oldest stalk will be automatically UnStalked
	Keep this low to increase internet speed, too high and the amount of requests being made to facebook will make your internet's speed suffer.*/

/*YOU SHOULD EDIT THE ABOVE VALUES TO FIND A HAPPY MEDIUM BETWEEN PERFORMANCE AND SPEED, BASED ON YOUR COMPUTER AND ITS CONNECTION*/

var testMode = false; /*determines if you can stalk your own items, for testing purposes*/

//CONFIGURATION








	//BELOW IS DATE FORMAT. NOT WRITTEN BY ME

	/*
	 * Date Format 1.2.3
	 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
	 * MIT license
	 *
	 * Includes enhancements by Scott Trenda <scott.trenda.net>
	 * and Kris Kowal <cixar.com/~kris.kowal/>
	 *
	 * Accepts a date, a mask, or a date and a mask.
	 * Returns a formatted version of the given date.
	 * The date defaults to the current date/time.
	 * The mask defaults to dateFormat.masks.default.
	 */

	var dateFormat = function () {
		var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
			timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
			timezoneClip = /[^-+\dA-Z]/g,
			pad = function (val, len) {
				val = String(val);
				len = len || 2;
				while (val.length < len) val = "0" + val;
				return val;
			};

		// Regexes and supporting functions are cached through closure
		return function (date, mask, utc) {
			var dF = dateFormat;

			// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
			if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
				mask = date;
				date = undefined;
			}

			// Passing date through Date applies Date.parse, if necessary
			date = date ? new Date(date) : new Date;
			if (isNaN(date)) throw SyntaxError("invalid date");

			mask = String(dF.masks[mask] || mask || dF.masks["default"]);

			// Allow setting the utc argument via the mask
			if (mask.slice(0, 4) == "UTC:") {
				mask = mask.slice(4);
				utc = true;
			}

			var	_ = utc ? "getUTC" : "get",
				d = date[_ + "Date"](),
				D = date[_ + "Day"](),
				m = date[_ + "Month"](),
				y = date[_ + "FullYear"](),
				H = date[_ + "Hours"](),
				M = date[_ + "Minutes"](),
				s = date[_ + "Seconds"](),
				L = date[_ + "Milliseconds"](),
				o = utc ? 0 : date.getTimezoneOffset(),
				flags = {
					d:    d,
					dd:   pad(d),
					ddd:  dF.i18n.dayNames[D],
					dddd: dF.i18n.dayNames[D + 7],
					m:    m + 1,
					mm:   pad(m + 1),
					mmm:  dF.i18n.monthNames[m],
					mmmm: dF.i18n.monthNames[m + 12],
					yy:   String(y).slice(2),
					yyyy: y,
					h:    H % 12 || 12,
					hh:   pad(H % 12 || 12),
					H:    H,
					HH:   pad(H),
					M:    M,
					MM:   pad(M),
					s:    s,
					ss:   pad(s),
					l:    pad(L, 3),
					L:    pad(L > 99 ? Math.round(L / 10) : L),
					t:    H < 12 ? "a"  : "p",
					tt:   H < 12 ? "am" : "pm",
					T:    H < 12 ? "A"  : "P",
					TT:   H < 12 ? "AM" : "PM",
					Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
					o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
					S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
				};

			return mask.replace(token, function ($0) {
				return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
			});
		};
	}();

	// Some common format strings
	dateFormat.masks = {
		"default":      "ddd mmm dd yyyy HH:MM:ss",
		shortDate:      "m/d/yy",
		mediumDate:     "mmm d, yyyy",
		longDate:       "mmmm d, yyyy",
		fullDate:       "dddd, mmmm d, yyyy",
		shortTime:      "h:MM TT",
		mediumTime:     "h:MM:ss TT",
		longTime:       "h:MM:ss TT Z",
		isoDate:        "yyyy-mm-dd",
		isoTime:        "HH:MM:ss",
		isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
		isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
	};

	// Internationalization strings
	dateFormat.i18n = {
		dayNames: [
			"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
			"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
		],
		monthNames: [
			"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
			"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
		]
	};

	// For convenience...
	Date.prototype.format = function (mask, utc) {
		return dateFormat(this, mask, utc);
	};
	//DATE FORMAT END


function getFBTime() {

	var offset = "-7";
    // create Date object for current location
    d = new Date();
   
    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
   
    // create new Date object for different city
    // using supplied offset
    nd = new Date(utc + (3600000*offset));
	
	nd = dateFormat(nd, "ddd, d mmm yyyy HH:MM:ss -0700");
   
    // return time as a string
    return nd;

}

function getFBTimeLocale(){
	var nd = new Date();
	var nd1 = dateFormat(nd, "dddd, dd mmmm yyyy");
	var nd2 = dateFormat(nd, "HH:MM");
	return nd1 + " at " + nd2;;
}







//welcome();


function welcome() {
    var window = document.createElement("div");
    window.className = "pop_container_advanced";
    window.innerHTML = "<div class='pop_content' id='pop_content'>" + "<h2 class='dialog_title' style='padding:5px;'>Welcome to Facebook Stalker.</a>" + "<div class='dialog_content'><div class='dialog_body' style='color:black;'>" + "hello<br>hello<br>hello" + "</div></div>" + "</div>";

    window.style.width = "300";
    window.style.height = "300";
    window.style.position = "absolute";
    window.style.left = "50%";
    window.style.top = "50%";

    document.getElementsByTagName("body")[0].appendChild(window);

}



function getTopMostID(){
	var TopMostID = getElementsByClassName("notification",null,document);
	return parseInt(TopMostID[0].id.replace("notification_",""))+1;
}


function sendNotification(friendName, fid, fbid, link, img) {
    if (friendName == 0) {
        friendName = "A facebook friend";
    }

    link = mobileToPC(link);

    var friendName, link, smallIcon, friendPic;
    friendPic = img;
    smallIcon = "http://i28.tinypic.com/icoh9y.png";
    smallIconHalf = "http://i26.tinypic.com/28sh1f.png";
    var alertMsg1 = "<span class=\"blueName\">" + friendName + "</span> has new activity.";
    var alertMsg2 = "<a href='http://www.facebook.com/profile.php?id="+fid+"'>"+friendName+"</a> has <a href='" + link + "'>new activity.</a>";
    var alertID = getTopMostID();
	var titleDate = getFBTimeLocale();
	var dataDate = getFBTime();
	var timestamp = Date.now();
	

    var test1 = {
        type: "channelMsg",
        channel: "p_" + fbid,
        msg: {
            alert_id: alertID,
            markup: "<li class=\"notification\" id=\"notification_" + alertID + "\"><a href=\"" + link + "\"><div class=\"UIImageBlock clearfix\"><img class=\"uiProfilePhoto UIImageBlock_Image UIImageBlock_ICON_Image uiProfilePhotoLarge img\" src=\"" + friendPic + "\" alt=\"\"></img><div class=\"info UIImageBlock_Content UIImageBlock_ICON_Content\"><div>" + alertMsg1 + "</div> <div class=\"UIImageBlock clearfix metadata\"><img class=\"staticAppIcon UIImageBlock_Image UIImageBlock_ICON_Image img\" src=\"http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif\" alt=\"\" style=\"background-image: url(" + smallIcon + ")\"></img><span class=\"UIImageBlock_Content UIImageBlock_ICON_Content fss fwn fcg\"><abbr title=\""+titleDate+"\" data-date=\""+dataDate+"\" class=\"timestamp\">A few seconds ago.</abbr></span></div></div></div></a></li>",
            unread: 1,
            type: "notification"
        }
    };
    var test2 = {
        t: "msg",
        c: "p_" + fbid,
        s: 5,
        ms: [{
            alert_id: alertID,
            markup: "<li class=\"notification\" id=\"notification_" + alertID + "\"><a href=\"" + link + "\"><div class=\"UIImageBlock clearfix\"><img class=\"uiProfilePhoto UIImageBlock_Image UIImageBlock_ICON_Image uiProfilePhotoLarge img\" src=\"" + friendPic + "\" alt=\"\"></img><div class=\"info UIImageBlock_Content UIImageBlock_ICON_Content\"><div>" + alertMsg1 + "</div> <div class=\"UIImageBlock clearfix metadata\"><img class=\"staticAppIcon UIImageBlock_Image UIImageBlock_ICON_Image img\" src=\"http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif\" alt=\"\" style=\"background-image: url(" + smallIcon + ")\"></img><span class=\"UIImageBlock_Content UIImageBlock_ICON_Content fss fwn fcg\"><abbr title=\""+titleDate+"\" data-date=\""+dataDate+"\" class=\"timestamp\">A few seconds ago.</abbr></span></div></div></div></a></li>",
            unread: 1,
            type: "notification"
        }]
    };
    var test3 = {
        type: "channelMsg",
        channel: "p_" + fbid,
        msg: {
            type: "seq",
            seq: 5
        }
    };
    unsafeWindow.postMessage(unsafeWindow.JSON.encode(test1), "*");
    unsafeWindow.postMessage(unsafeWindow.JSON.encode(test2), "*");
    unsafeWindow.postMessage(unsafeWindow.JSON.encode(test3), "*");

    var test1 = {
        t: "msg",
        c: "p_" + fbid,
        s: 3,
        ms: [{
            type: "app_msg",
            app_id: 30729425562,
            event_name: "beep_event",
            response: {
                error: 0,
                errorSummary: "",
                errorDescription: "",
                errorIsWarning: false,
                silentError: 0,
                payload: {
                    alertId: alertID,
                    platformType: "general",
                    applicationName: "Wall",
                    alert: {
                        from_uid: 100001323590122,
                        alert_type: 1,
                        time_sent: timestamp,//1279545197,
                        unread: true,
                        text: "hi",
                        has_app: 2719290516,
                        post_fbid: 417467693185,
                        app_id: 2719290516,
                        to_user: fbid,
                        alert_id: alertID
                    },
                    userId: fbid,
                    fromId: null,
                    title: alertMsg2,
                    body: null,
                    link: "",
                    userPic: null,
                    icon: smallIconHalf,
                    applicationId: 2719290516,
                    type: "NotificationBeep",
                    html: "<div class=\"UIBeep\"><div class=\"UIBeep_NonIntentional\"><div class=\"UIBeep_Icon\"><img class=\"beeper_icon img\" src=\"" + smallIconHalf + "\"></img></div><a class=\"beeper_x\">&nbsp;</a></div><div class=\"UIBeep_Title\">" + alertMsg2 + "</div></div></div>",
                    isIntentional: false,
                    href: "http://www.facebook.com/profile.php?id=711158185&v=wall&story_fbid=417467693185"
                },
                css: ["awtL8"],
                invalidate_cache: [0],
                resource_map: {
                    awtL8: {
                        name: "css/presence/beeper.css",
                        type: "css",
                        permanent: 1,
                        src: "http://static.ak.fbcdn.net/rsrc.php/z26KQ/hash/3i3wex1y.css"
                    }
                }
            },
            hasCapture: true
        }]
    };
    var test2 = {
        type: "channelMsg",
        channel: "p_" + fbid,
        msg: {
            type: "app_msg",
            app_id: 30729425562,
            event_name: "beep_event",
            response: {
                error: 0,
                errorSummary: "",
                errorDescription: "",
                errorIsWarning: false,
                silentError: 0,
                payload: {
                    alertId: alertID,
                    platformType: "general",
                    applicationName: "Wall",
                    alert: {
                        from_uid: 100001323590122,
                        alert_type: 1,
                        time_sent: timestamp,//1279545197,
                        unread: true,
                        text: "hi",
                        has_app: 2719290516,
                        post_fbid: 417467693185,
                        app_id: 2719290516,
                        to_user: fbid,
                        alert_id: alertID
                    },
                    userId: fbid,
                    fromId: null,
                    title: alertMsg2,
                    body: null,
                    link: "",
                    userPic: null,
                    icon: smallIconHalf,
                    applicationId: 2719290516,
                    type: "NotificationBeep",
                    html: "<div class=\"UIBeep\"><div class=\"UIBeep_NonIntentional\"><div class=\"UIBeep_Icon\"><img class=\"beeper_icon img\" src=\"" + smallIconHalf + "\"></img></div><a class=\"beeper_x\">&nbsp;</a></div><div class=\"UIBeep_Title\">" + alertMsg2 + "</div></div></div>",
                    isIntentional: false,
                    href: link
                },
                css: ["awtL8"],
                invalidate_cache: [0],
                resource_map: {
                    awtL8: {
                        name: "css/presence/beeper.css",
                        type: "css",
                        permanent: 1,
                        src: "http://static.ak.fbcdn.net/rsrc.php/z26KQ/hash/3i3wex1y.css"
                    }
                }
            },
            hasCapture: true
        }
    };
    var test3 = {
        type: "channelMsg",
        channel: "p_" + fbid,
        msg: {
            type: "seq",
            seq: 3
        }
    };
    unsafeWindow.postMessage(unsafeWindow.JSON.encode(test1), "*");
    unsafeWindow.postMessage(unsafeWindow.JSON.encode(test2), "*");
    unsafeWindow.postMessage(unsafeWindow.JSON.encode(test3), "*");
    //count++;
}



//({type: "channelMsg", channel: "p_711158185", msg: {alert_id: 87860205, markup: "<li class=\"pvs nolinks notification notif_19675640871 jewelItemNew\" id=\"notification_87860205\"><a href=\"http://www.facebook.com/profile.php?id=596407194&amp;v=wall&amp;story_fbid=446500197194&amp;ref=notif&amp;notif_t=feed_comment_reply\"><div class=\"UIImageBlock clearfix\"><img class=\"uiProfilePhoto UIImageBlock_Image UIImageBlock_ICON_Image uiProfilePhotoLarge img\" src=\"http://profile.ak.fbcdn.net/hprofile-ak-snc4/hs344.snc4/41441_508372443_3561_q.jpg\" alt=\"\"></img><div class=\"info UIImageBlock_Content UIImageBlock_ICON_Content\"><div>Shiv Mcfarlane commented on Scott &#039;swig&#039; Mccubbin's new relationship status.</div> <div class=\"UIImageBlock clearfix metadata\"><img class=\"staticAppIcon UIImageBlock_Image UIImageBlock_ICON_Image img\" src=\"http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif\" alt=\"\" style=\"background-image: url(/images/app_icons/wall_post.gif)\"></img><span class=\"UIImageBlock_Content UIImageBlock_ICON_Content fss fwn fcg\"><abbr title=\"Monday, July 19, 2010 at 1:44pm\" data-date=\"Mon, 19 Jul 2010 05:44:14 -0700\" class=\"timestamp\">2 seconds ago</abbr></span></div></div></div></a></li>", unread: 1, type: "notification"}});
//({t: "msg", c: "p_711158185", s: 5, ms: [{alert_id: 87860205, markup: "<li class=\"pvs nolinks notification notif_19675640871 jewelItemNew\" id=\"notification_87860205\"><a href=\"http://www.facebook.com/profile.php?id=596407194&amp;v=wall&amp;story_fbid=446500197194&amp;ref=notif&amp;notif_t=feed_comment_reply\"><div class=\"UIImageBlock clearfix\"><img class=\"uiProfilePhoto UIImageBlock_Image UIImageBlock_ICON_Image uiProfilePhotoLarge img\" src=\"http://profile.ak.fbcdn.net/hprofile-ak-snc4/hs344.snc4/41441_508372443_3561_q.jpg\" alt=\"\"></img><div class=\"info UIImageBlock_Content UIImageBlock_ICON_Content\"><div>Shiv Mcfarlane commented on Scott &#039;swig&#039; Mccubbin's new relationship status.</div> <div class=\"UIImageBlock clearfix metadata\"><img class=\"staticAppIcon UIImageBlock_Image UIImageBlock_ICON_Image img\" src=\"http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif\" alt=\"\" style=\"background-image: url(/images/app_icons/wall_post.gif)\"></img><span class=\"UIImageBlock_Content UIImageBlock_ICON_Content fss fwn fcg\"><abbr title=\"Monday, July 19, 2010 at 1:44pm\" data-date=\"Mon, 19 Jul 2010 05:44:14 -0700\" class=\"timestamp\">2 seconds ago</abbr></span></div></div></div></a></li>", unread: 1, type: "notification"}]});
//({type: "channelMsg", channel: "p_711158185", msg: {type: "seq", seq: 5}});
//({t: "msg", c: "p_711158185", s: 3, ms: [{type: "app_msg", app_id: 30729425562, event_name: "beep_event", response: {error: 0, errorSummary: "", errorDescription: "", errorIsWarning: false, silentError: 0, payload: {alertId: 87862504, platformType: "general", applicationName: "Wall", alert: {from_uid: 100001323590122, alert_type: 1, time_sent: 1279545197, unread: true, text: "hi", has_app: 2719290516, post_fbid: 417467693185, app_id: 2719290516, to_user: 711158185, alert_id: 87862504}, userId: 711158185, fromId: null, title: "<a href=\"http://www.facebook.com/profile.php?id=100001323590122\">Suite Hancroft</a> posted <a href=\"http://www.facebook.com/profile.php?id=711158185&amp;v=wall&amp;story_fbid=417467693185\">Something</a> on your Wall.", body: null, link: "", userPic: null, icon: "http://static.ak.fbcdn.net/rsrc.php/z7CG7/hash/8n0fsut0.gif", applicationId: 2719290516, type: "NotificationBeep", html: "<div class=\"UIBeep\"><div class=\"UIBeep_NonIntentional\"><div class=\"UIBeep_Icon\"><img class=\"beeper_icon img\" src=\"http://static.ak.fbcdn.net/rsrc.php/z7CG7/hash/8n0fsut0.gif\"></img></div><a class=\"beeper_x\">&nbsp;</a></div><div class=\"UIBeep_Title\"><a href=\"http://www.facebook.com/profile.php?id=100001323590122\">Suite Hancroft</a> posted <a href=\"http://www.facebook.com/profile.php?id=711158185&amp;v=wall&amp;story_fbid=417467693185\">Something</a> on your Wall.</div></div></div>", isIntentional: false, href: "http://www.facebook.com/profile.php?id=711158185&v=wall&story_fbid=417467693185"}, css: ["awtL8"], invalidate_cache: [0], resource_map: {awtL8: {name: "css/presence/beeper.css", type: "css", permanent: 1, src: "http://static.ak.fbcdn.net/rsrc.php/z26KQ/hash/3i3wex1y.css"}}}, hasCapture: true}]});
//({type: "channelMsg", channel: "p_711158185", msg: {type: "app_msg", app_id: 30729425562, event_name: "beep_event", response: {error: 0, errorSummary: "", errorDescription: "", errorIsWarning: false, silentError: 0, payload: {alertId: 87862504, platformType: "general", applicationName: "Wall", alert: {from_uid: 100001323590122, alert_type: 1, time_sent: 1279545197, unread: true, text: "hi", has_app: 2719290516, post_fbid: 417467693185, app_id: 2719290516, to_user: 711158185, alert_id: 87862504}, userId: 711158185, fromId: null, title: "<a href=\"http://www.facebook.com/profile.php?id=100001323590122\">Suite Hancroft</a> posted <a href=\"http://www.facebook.com/profile.php?id=711158185&amp;v=wall&amp;story_fbid=417467693185\">Something</a> on your Wall.", body: null, link: "", userPic: null, icon: "http://static.ak.fbcdn.net/rsrc.php/z7CG7/hash/8n0fsut0.gif", applicationId: 2719290516, type: "NotificationBeep", html: "<div class=\"UIBeep\"><div class=\"UIBeep_NonIntentional\"><div class=\"UIBeep_Icon\"><img class=\"beeper_icon img\" src=\"http://static.ak.fbcdn.net/rsrc.php/z7CG7/hash/8n0fsut0.gif\"></img></div><a class=\"beeper_x\">&nbsp;</a></div><div class=\"UIBeep_Title\"><a href=\"http://www.facebook.com/profile.php?id=100001323590122\">Suite Hancroft</a> posted <a href=\"http://www.facebook.com/profile.php?id=711158185&amp;v=wall&amp;story_fbid=417467693185\">Something</a> on your Wall.</div></div></div>", isIntentional: false, href: "http://www.facebook.com/profile.php?id=711158185&v=wall&story_fbid=417467693185"}, css: ["awtL8"], invalidate_cache: [0], resource_map: {awtL8: {name: "css/presence/beeper.css", type: "css", permanent: 1, src: "http://static.ak.fbcdn.net/rsrc.php/z26KQ/hash/3i3wex1y.css"}}}, hasCapture: true}});
//({type: "channelMsg", channel: "p_711158185", msg: {type: "seq", seq: 3}});










//flushGM();

function flushGM() {
    alert(GM_getValue("stalkList").split(",").length + " records deleted.");
    GM_deleteValue("stalkList");
    GM_deleteValue("countList");
    GM_deleteValue("stalkTime");
}

//viewGM();


function viewGM() {
    alert("StalkList: " + GM_getValue("stalkList"));
    alert("countList: " + GM_getValue("countList"));
    alert("stalkTime: " + GM_getValue("stalkTime"));
}

//var likes = document.evaluate('//*[@name="like"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
//setTimeout(boot,1000);

var stalkList = GM_getValue("stalkList");

if (!stalkList) {
    GM_setValue("stalkList", "");
    stalkList = "";
}
stalkList = stalkList.split(",");

var countList = GM_getValue("countList");

if (!countList) {
    GM_setValue("countList", "");
    countList = "";
}
countList = countList.split(",");

var stalkTime = GM_getValue("stalkTime");

if (!stalkTime) {
    GM_setValue("stalkTime", "");
    stalkTime = "";
}
stalkTime = stalkTime.split(",");



flushOld();

function flushOld() {
    var today = new Date();
    var one_day = 1000 * 60 * 60 * 24

    for (i = 0; i < stalkTime.length; i++) {
        var t = new Date(stalkTime[i]);
        if (((today.getTime() - t.getTime()) / (one_day)) > inactiveTime) {
            removeStalkById(i);
        }
    }
}

function constrainLength() {
    if (stalkList.length > maxStalks + 1) {
        for (i = 0; i < (stalkList.length - maxStalks + 1); i++) {
            deleteOldest();
        }
    }
}

function deleteOldest() {
    var stored = null;
    for (i = 0; i < stalkTime.length; i++) {
        if (!stored) {
            stored = i;
        } else {
            if (i < stored) {
                stored = i;
            }
        }
    }
    removeStalkById(stored);
}

checkLengths();

function checkLengths() {
    var var1 = (GM_getValue("stalkList").split(",").length);
    var var2 = (GM_getValue("countList").split(",").length);
    var var3 = (GM_getValue("stalkTime").split(",").length);
    if (var1 == var2 && var2 == var3) {
        //alert("All is fine.");
    } else {
        var doFlush = confirm("Somethings gone wrong with the Stalk script that will cause it to not function correctly!\nResetting your Stalk history may rectify the problem.\nWould you like to do this? You will have to re-stalk your statuses.");
        if (doFlush == true) {
            flushGM();
        }
        else {

        }

    }
}

function addToStalk(stalk, fbimg) {
    stalk = PCtoMobile(stalk);

    stalk = stalk.replace("&ref=mf", "");


    var stalkListNew = GM_getValue("stalkList");
    stalkListNew = stalkListNew.split(",");
    stalkListNew.push(stalk);
    stalkList = stalkListNew;
    stalkListNew = stalkListNew.join(",");
    GM_setValue("stalkList", stalkListNew);

    var countListNew = GM_getValue("countList");
    countListNew = countListNew.split(",");
    countListNew.push(0);
    countList = countListNew;
    countListNew = countListNew.join(",");
    GM_setValue("countList", countListNew);

    var stalkTimeNew = GM_getValue("stalkTime");
    stalkTimeNew = stalkTimeNew.split(",");

    var today = new Date();
    stalkTimeNew.push(today);
    stalkTime = stalkTimeNew;
    stalkTimeNew = stalkTimeNew.join(",");
    GM_setValue("stalkTime", stalkTimeNew);
    getUrl(stalk);
    checkLengths();
    constrainLength();
}

function updateTime(num) {
    var stalkTimeNew = GM_getValue("stalkTime");
    stalkTimeNew = stalkTimeNew.split(",");
    stalkTimeNew[num] = new Date();
    stalkTime = stalkTimeNew;
    stalkTimeNew = stalkTimeNew.join(",");
    GM_setValue("stalkTime", stalkTimeNew);
}

function editCount(num, edit) {
    var countListNew = GM_getValue("countList");
    countListNew = countListNew.split(",");
    countListNew[num] = edit;
    countList = countListNew;
    countListNew = countListNew.join(",");
    GM_setValue("countList", countListNew);
}

function removeStalkById(num) {
    var stalkListNew = GM_getValue("stalkList");
    stalkListNew = stalkListNew.split(",");
    stalkListNew.splice(num, 1);
    stalkList = stalkListNew;
    stalkListNew = stalkListNew.join(",");
    GM_setValue("stalkList", stalkListNew);

    var countListNew = GM_getValue("countList");
    countListNew = countListNew.split(",");
    countListNew.splice(num, 1);
    countList = countListNew;
    countListNew = countListNew.join(",");
    GM_setValue("countList", countListNew);

    var stalkTimeNew = GM_getValue("stalkTime");
    stalkTimeNew = stalkTimeNew.split(",");
    stalkTimeNew.splice(num, 1);
    stalkTime = stalkTimeNew;
    stalkTimeNew = stalkTimeNew.join(",");
    GM_setValue("stalkTime", stalkTimeNew);
    checkLengths();
}

function removeFromStalk(stalk) {
    stalk = PCtoMobile(stalk);

    stalk = stalk.replace("&ref=mf", "");

    var stalkListNew = GM_getValue("stalkList");
    stalkListNew = stalkListNew.split(",");
    var stalkPos = stalkListNew.indexOf(stalk);
    stalkListNew = removeItem(stalkListNew, stalk);
    stalkList = stalkListNew;
    stalkListNew = stalkListNew.join(",");
    GM_setValue("stalkList", stalkListNew);
    //alert(stalkList);
    var countListNew = GM_getValue("countList");
    countListNew = countListNew.split(",");
    countListNew.splice(stalkPos, 1);
    countList = countListNew;
    countListNew = countListNew.join(",");
    GM_setValue("countList", countListNew);
    //alert(countList);
    var stalkTimeNew = GM_getValue("stalkTime");
    stalkTimeNew = stalkTimeNew.split(",");
    stalkTimeNew.splice(stalkPos, 1);
    stalkTime = stalkTimeNew;
    stalkTimeNew = stalkTimeNew.join(",");
    GM_setValue("stalkTime", stalkTimeNew);



    checkLengths();
}


function removeItem(originalArray, itemToRemove) {
    var j = 0;
    while (j < originalArray.length) {
        // alert(originalArray[j]);
        if (originalArray[j] == itemToRemove) {
            originalArray.splice(j, 1);
        } else {
            j++;
        }
    }
    return originalArray;
}

function fbidpos(fbid) {
    for (var i = 0; i < stalkList.length; i++) {
        if (stalkList[i].indexOf(fbid) > -1) {
            return i;
        }
    }
    return false;
}

setTimeout(checkStalks, 1500);

function checkStalks() {
    for (var i = 0; i < stalkList.length; i++) {
        if (stalkList[i].length > 1) {
            getUrl(stalkList[i]);
        }
    }
    setTimeout(checkStalks, stalkTimeCheck * 1000);
}

function mobileToPC(mobileURL) {
    mobileURL += "&";
    var id = mobileURL.split("?id=")[1];
    id = id.split("&")[0];

    var storyid = mobileURL.split("&story_fbid=")[1];
    storyid = storyid.split("&")[0];

    return "http://www.facebook.com/profile.php?id=" + id + "&story_fbid=" + storyid;
}

function PCtoMobile(url) {
    if (url.indexOf("story_fbid=") > -1) {
        var id = url.substring(url.indexOf("id=") + 3);
        id = id.split("&")[0];
        var storyid = url.substring(url.indexOf("story_fbid=") + 11);
        storyid += "&";
        storyid = storyid.split("&")[0];
        var mobileURL = "http://m.facebook.com/story.php?id=" + id + "&story_fbid=" + storyid;
        return mobileURL;
    } else {
        return false;
    }
}

function getUrl(url1) {

    var id = url1.substring(url1.indexOf("id=") + 3);
    id = id.split("&")[0];
    var storyid = url1.substring(url1.indexOf("story_fbid=") + 11);
    storyid += "&";
    storyid = storyid.split("&")[0];

    url1 = PCtoMobile(url1);


    GM_xmlhttpRequest({
        method: "GET",
        url: url1,
        headers: {
            "User-Agent": "Mozilla/5.0",
            "Accept": "text/xml"
        },
        onload: function (response) {
            if ((response.readyState == 4) && (response.status == 200)) checkStalk(response.responseText, url1, storyid);
        }
    });



}

function checkStalk(source, url, storyid) {
    var counter = source.substring(source.indexOf("#comment_box_") + 13);
    counter = counter.substring(counter.indexOf(">") + 1);
    counter = counter.split("<")[0];
    counter = counter.split(" ");
    if (counter.length != 2) {
        counter = 0;
    } else {
        counter = counter[0];
    }

    var fbid = storyid;
    var fbname = source.substring(source.indexOf("refid=0\">") + 9);
	
    var uid = url + "&";
    uid = uid.split("id=")[1];
    uid = uid.split("&")[0];

    fbname = fbname.split("<")[0];
    var fbpic = "http://i31.tinypic.com/se7kt1.png";


    if (counter > countList[fbidpos(fbid)]) {
        if (countList[fbidpos(fbid)] != 0) {
            //alert("New! - " + url);
            sendNotification(fbname, uid, fbid, url, fbpic);
            updateTime(fbidpos(fbid));
        }
        editCount(fbidpos(fbid), counter);
    } else {
        editCount(fbidpos(fbid), counter);
    }

}

start();
function start(){
	var notifications = getElementsByClassName("notification",null,document);
	if(notifications.length == 0){
		if(unsafeWindow.presenceNotifications){
			unsafeWindow.presenceNotifications.loadTab();
		}
		setTimeout(start,500);
	}else{
		checkForUpdate();
	}
}


function checkForUpdate() {
    document.documentElement.removeEventListener('DOMNodeInserted', checkForUpdate, false);
    setTimeout(boot, 0);
    document.documentElement.addEventListener("DOMNodeInserted", checkForUpdate, false);
}

var userID;

function boot() {

    var likes = getElementsByClassName("like_link", "button", document);
    for (var i = 0; i < likes.length; i++) {

        var Devider = document.createElement("span");
        Devider.innerHTML = " · ";

        var friendTest = /profile_action_add_friend/g;
        if (!friendTest.test(likes[i].parentNode.innerHTML)) {
            if (getElementsByClassName("Stalk", null, likes[i].parentNode).length == 0) {
                var feedItem = likes[i].parentNode.parentNode;




                var isAllowed;
                isAllowed = true;
                var group = feedItem.getElementsByTagName("a");
				var timeHolder = feedItem.getElementsByTagName("abbr");
				
				if(timeHolder.length > 0){
                var href = timeHolder[0].parentNode.href;

                if (cannotStalkMessage(group, href)) {
                    isAllowed = false;
                } else {
                    var fbid = timeHolder[0].parentNode.href + "&";
                    fbid = fbid.split("&story_fbid=")[1];
                    fbid = fbid.split("&")[0];
                }

                if (isAllowed == true) {
                    var StalkBtn = document.createElement("a");
                } else {
                    var StalkBtn = document.createElement("a");
                    StalkBtn.style.color = "#aaa";
                    StalkBtn.style.cursor = "default";
                    StalkBtn.style.textDecoration = "none";
                }

                StalkBtn.className = "Stalk";
                //if(stalkList.indexOf(feedItem.getElementsByTagName("abbr")[0].parentNode.href.replace("&ref=mf","")) > -1){


                if (fbidpos(fbid) > 0) {
                    StalkBtn.innerHTML = "UnStalk";
                    StalkBtn.title = "Click here to UnStalk this item";
                } else {
                    StalkBtn.innerHTML = "Stalk";
                    StalkBtn.title = "Click here to Stalk this item";
                }

                if (isAllowed == false) {
                    StalkBtn.innerHTML = "Stalk";
                    StalkBtn.title = cannotStalkMessage(group, href);
                }


                insertAfter(likes[i].parentNode, StalkBtn, likes[i]);
                insertAfter(likes[i].parentNode, Devider, likes[i]);

                if (isAllowed == true) {
                    StalkBtn.addEventListener('click', function () {
                        //alert("Stalk " + i + "?");
                        //this.parentNode.style.display = "none"
                        //var wallpost = this.parentNode.parentNode.getElementsByTagName("abbr")[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                        //var fbimg = getElementsByClassName("UIProfileImage UIProfileImage_LARGE img","img",wallpost)[0].src;
                        stalkUser(this.parentNode.parentNode.getElementsByTagName("abbr")[0].parentNode.href, null, this);
                    }, false);
                }
				/*else{
					StalkBtn.addEventListener('click', function () {
						group = this.parentNode.parentNode.getElementsByTagName("a");
						href = this.parentNode.parentNode.getElementsByTagName("abbr")[0].parentNode.href;
						alert(cannotStalkMessage(group,href));
					}, false);
				}*/

					
				}

            }
        }

    }
}

function cannotStalkMessage(hrefgroup, href) {
    userID = unsafeWindow.Env["user"];
    var uid = href + "&";
    uid = uid.split("id=")[1];
    uid = uid.split("&")[0];

    if (userID == uid && testMode == false) {
        return "Why would you want to stalk yourself? Get a grip!";
    }

    for (i = 0; i < hrefgroup.length; i++) {
        if (hrefgroup[i].href.indexOf("application.php") > -1 && hrefgroup[i].className.indexOf("UIImageBlock_Image")==-1) {
            return "You cannot stalk applications";
        }
    }

    if (href.indexOf("/album.php") > -1) {
        return "You cannot stalk photo albums";
    }

    if (href.indexOf("story_fbid=") == -1) {
        return "You cannot stalk this feed. It is not a wallpost or status";
    }

    return false;
}

function isApplication(check) {
    for (i = 0; i < check.length; i++) {
        if (check[i].href.indexOf("application.php") > -1) {
            return true;
        }
    }
    return false;
}

function findFeedItem(item) {
    if (item.id) {
        if (item.id.indexOf("div_story_") == 0) {
            return item;
        } else {
            return findFeedItem(item.parentNode);
        }
    } else {
        return findFeedItem(item.parentNode);
    }
}

function stalkUser(e, fbimg, btn) {
    var link = e;
    if (btn.innerHTML == "Stalk") {
        btn.innerHTML = "UnStalk";
        btn.title = "Click here to UnStalk this item";
        addToStalk(e, fbimg);
    } else {
        btn.innerHTML = "Stalk";
        btn.title = "Click here to Stalk this item";
        removeFromStalk(e);
    }

}


function getElementsByClassName(className, tag, elm) {
    var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
    var tag = tag || "*";
    var elm = elm || document;
    var elements = (tag == "*" && elm.all) ? elm.all : elm.getElementsByTagName(tag);
    var returnElements = [];
    var current;
    var length = elements.length;
    for (var i = 0; i < length; i++) {
        current = elements[i];
        if (testClass.test(current.className)) {
            returnElements.push(current);
        }
    }
    return returnElements;
}


function insertAfter(parent, node, referenceNode) {
    parent.insertBefore(node, referenceNode.nextSibling);
}


