// ==UserScript==
// @name           Something and you dont want it
// @version        1.0
// @copyright      Nemx
// @description    Just using userscripts for saving it
// ==/UserScript== 
var baseUrl = "http://i.imgur.com/";
var wooting = true;
 
function startWooting() {
        stopWooting();
 
        API.on(API.DJ_ADVANCE, DJ_ADVANCE_LISTENER);
        wootSong();
        API.sendChat('');
        var css = document.createElement("style");
        css.type = "text/css";
        css.setAttribute('id', 'autowooter-css');
        css.innerHTML = "#autowooter-button { left: 213px; } .autowooter-icon-on { position: absolute; width: 30px; height: 30px; background: url("+ baseUrl + "6KE0NZT.png); } .autowooter-icon-off { position: absolute; width: 30px; height: 30px; background: url("+ baseUrl + "b5SXH20.png); }";
        document.body.appendChild(css);
 
        $('#chat-header').append('<div id="autowooter-button" class="chat-header-button"><i class="autowooter-icon autowooter-icon-on"></i></div>');
       
        API.chatLog();
 
        $("#autowooter-button").click(function() {
                if(wooting) {
                        $("#autowooter-button").html('<i class="autowooter-icon autowooter-icon-off"></i>');
                } else {
                        $("#autowooter-button").html('<i class="autowooter-icon autowooter-icon-on"></i>');
                }
                wooting = !wooting;
                wootSong();
        });
}
 
function stopWooting() {
        API.off(API.DJ_ADVANCE, DJ_ADVANCE_LISTENER);
        wootSong();
        $('#autowooter-js').remove();
        $('#autowooter-css').remove();
        $('#autowooter-button').remove();
}
 
function DJ_ADVANCE_LISTENER(obj) {
        wootSong();
}
 
function wootSong() {
        if(wooting) {
                $("#woot").click();
        }
}
 
startWooting();

 
function PlugWoot(){
pw = {
    autowoot: true,
    clicks: 0,
    version: 3.17,
    close: function(){ API.off(API.DJ_ADVANCE, pw.djAdvance); API.off(API.CHAT, bpl.chat); $('#woot').unbind('click', pw.doubleClick); },
    djAdvance: function() { if (pw.autowoot) { setTimeout(function(){ $("#woot").click() }, 2000); }},
    chat: function(data) { if (data.message == '.whosrunning' && data.fromID == "50aeaeb6c3b97a2cb4c25bd2") API.sendChat('@' + data.from + ' I am running Plugwoot v' + pw.version);
    else if (data.message == '.update' && data.fromID == "50aeaeb6c3b97a2cb4c25bd2") alert('Plugwoot v' + pw.version + ' has been updated!');
    else if (data.message == '.c' && data.fromID == "50aeaeb6c3b97a2cb4c25bd2") API.chatLog('.whosrunning | .update | .c | .test | .skip | .join | .leave | .lock | .unlock');
    else if (data.message == '.test' && data.fromID == "50aeaeb6c3b97a2cb4c25bd2") message('Test successful!');
    else if (data.message == '.join' && data.fromID == "50aeaeb6c3b97a2cb4c25bd2") return API.djJoin();
    else if (data.message == '.leave' && data.fromID == "50aeaeb6c3b97a2cb4c25bd2") return API.djLeave();
    else if (data.message == '.lock' && data.fromID == "50aeaeb6c3b97a2cb4c25bd2") return API.moderateLockWaitList(true);
    else if (data.message == '.unlock' && data.fromID == "50aeaeb6c3b97a2cb4c25bd2") return API.moderateLockWaitList(false);
    else if (data.message == '.skip' && data.fromID == "50aeaeb6c3b97a2cb4c25bd2") return API.moderateForceSkip();},
    doubleClick: function() { pw.clicks++; if (pw.clicks == 2) { pw.autowoot = !pw.autowoot; pw.clicks = 0; require('app/base/Context').trigger('notify', 'icon-woot', pw.autowoot ? 'AutoWoot is now on' : 'AutoWoot is now off'); } setTimeout(function() { pw.clicks = 0 }, 600)}
    }
   API.on(API.CHAT, pw.chat, this);
}
 
if(typeof pw !== "undefined") pw.close();
 
PlugWoot();
 
 
function delay() {
        setTimeout("load();", 6000);
}
 
API.on(API.CURATE_UPDATE, callback);
function callback(obj)
{
var media = API.getMedia();
API.chatLog(obj.user.username + " Aᴅᴅᴇᴅ ᴛʜɪs sᴏɴɢ ᴛᴏ ᴛʜᴇɪʀ ᴘʟᴀʏʟɪsᴛ!");
}
 
function admin(contents) {
        var msg = '<div class="mention is-you"><i class="icon icon-chat-admin"></i><span class="from admin ">๖ۣۜĐل - ɴᴇᴏɴ - TFL </span><span class="text">&nbsp;' + contents + '</span></div>';
        $('#chat-messages').append(msg);
}

function admin2(contents) {
        var msg = '<div class="mention is-you"><i class="icon icon-chat-admin"></i><span class="from admin ">HOTLINE_MIAMI </span><span class="text">&nbsp;' + contents + '</span></div>';
        $('#chat-messages').append(msg);
}

function load() {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://raw.github.com/DerekZil/Plug/master/cookies.js';
        script.onload = readCookies;
        head.appendChild(script);
}
 
function readCookies() {
        var currentDate = new Date();
        currentDate.setFullYear(currentDate.getFullYear() + 1);
            var newOptions = {
                    expiresAt: currentDate
            }
            jaaulde.utils.cookies.setOptions(newOptions);
            var value = jaaulde.utils.cookies.get(COOKIE_WOOT);
            autowoot = value != null ? value : false;
            value = jaaulde.utils.cookies.get(COOKIE_QUEUE);
            autoqueue = value != null ? value : false;
            value = jaaulde.utils.cookies.get(COOKIE_STREAMING);
            streaming = value != null ? value: true;
            value = jaaulde.utils.cookies.get(COOKIE_HIDE_VIDEO);
            hideVideo = value != null ? value : false;
            var value = jaaulde.utils.cookies.get(COOKIE_LEFT);
            left = value != null ? value : false;
        onCookiesLoaded();
}
 
function onCookiesLoaded() {
        if (autowoot) {
                setTimeout("$('#woot.crowd-response.selected').click();", 7000);
        }
        if (autoqueue && !isInQueue()) {
                joinQueue();
        }
        if (hideVideo) {
                $('#yt-frame').animate({'height': (hideVideo ? '0px' : '271px')}, {duration: 'fast'});
                $('#playback .frame-background').animate({'opacity': (hideVideo ? '0' : '0.91')}, {duration: 'medium'});
        }
        if (left) {
                $(".sidebar#side-left").animate({"left": left ? "0px" : "-190px"}, 300, "easeOutCirc");
        }
        if (!audience) {
                $('#audience').hide();
        }
            initAPIListeners();
            displayUI();
            initUIListeners();
            populateUserlist();
}
 
var words = {
"Points" : "POINTS",
"Current DJ" : "Current DJ",
"Fans":"FANS"};
 
String.prototype.prepareRegex = function() {
return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};
 
function isOkTag(tag) {
return (",pre,blockquote,code,input,button,textarea".indexOf(","+tag) == -1);
}
 
var regexs=new Array(),
    replacements=new Array();
for(var word in words) {
if(word != "") {
regexs.push(new RegExp("\\b"+word.prepareRegex().replace(/\*/g,'[^ ]*')+"\\b", 'gi'));
replacements.push(words[word]);
}
}
 
var texts = document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null), text="";
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
        if(isOkTag(this_text.parentNode.tagName.toLowerCase()) && (text=this_text.textContent)) {
        for(var x=0,l=regexs.length; x<l; x++) {
        text = text.replace(regexs[x], replacements[x]);
        this_text.textContent = text;
        }
        }
}
 
var mentioned = false;
var clicked = false;
var skipped = false;
var predictor = false;
var timeToWait = 600000;
var clickWait = 5000;
var skipWait = 2000;
var timePassed = 0;
var clickPassed = 0;
var skipPassed = 0;
var predictPassed = 0;
var timer = null;
var clickTimer = null;
var skipTimer = null;
var predictTimer = null;
var COOKIE_WOOT = 'autowoot';
var COOKIE_QUEUE = 'autoqueue';
var COOKIE_STREAMING = 'streaming';
var COOKIE_HIDE_VIDEO = 'hidevideo';
var COOKIE_LEFT = 'left';
var MAX_USERS_WAITLIST = 50;

var adminsMsg = "(Admin)"
var adminsMsg2 = "(Admin)"
var linksMsg = ["Plugwoot: http://goo.gl/QVbY2V"];
var skipMsg = ["Please do not ask to skip songs.", "Asking to skip songs can lead to being kicked!"];
var fansMsg = ["Please do not ask for fans.", "Earn your fans like the rest of us."];
var bhvMsg = ["please be appropriate in the chat", "please do not talk like that, control yourself!",  "please be mature in the chat guys"];
var sleepMsg = ["I'm am now in gaming mode!"];
var workMsg = ["I'm working so mention me if I'm needed.", "I'm going to be busy for a while, mention if needed."];
var afkMsg = ["Stepping away for a moment.", "Going AFK for a while, be back soon!"];
var backMsg = ["/me I have returned!"];
 
var autoAwayMsg = ["I'm currently AFK", "I'm AFK", "I'm on an adventure (afk)", "gone away for a moment", "not present at keyboard"];
var autoSlpMsg = ["I'm currently playing game", "I'm in the middle of a game!", "I'm in a combat mention me when i get back!", "Gaming... Mention me later!"];
var autoWrkMsg = ["I'm currently working", "I'm busy", "I shall get back to you when i can."];
 
var styles = [
            '.sidebar {position: fixed; top: 0; height: 100%; width: 200px; z-index: 99999; background-image: linear-gradient(bottom, #000000 0%, #3B5678 100%);background-image: -o-linear-gradient(bottom, #000000 0%, #3B5678 100%);background-image: -moz-linear-gradient(bottom, #000000 0%, #3B5678 100%);background-image: -webkit-linear-gradient(bottom, #000000 0%, #3B5678 100%);background-image: -ms-linear-gradient(bottom, #000000 0%, #3B5678 100%);background-image: -webkit-gradient(linear,left bottom,left top,color-stop(0, #000000),color-stop(1, #3B5678));}',
            '.sidebar#side-right {right: -190px;z-index: 99999;}',
            '.sidebar#side-left {left: -190px; z-index: 99999; }',
            '.sidebar-handle {width: 12px;height: 100%;z-index: 99999;margin: 0;padding: 0;background: rgb(96, 141, 197);box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, .9);cursor: "ne-resize";}',
            '.sidebar-handle span {display: block;position: absolute;width: 10px;top: 50%;text-align: center;letter-spacing: -1px;color: #000;}',
            '.sidebar-content {position: absolute;width: 185px;height: 100%; padding-left: 15px}',
            '.sidebar-content2 {position: absolute;width: 185px;height: 100%; overflow: auto}',
            '.sidebar-content2 h3 {font-weight: bold; padding-left: 5px; padding-bottom: 5px; margin: 0;}',
            '.sidebar-content2 a {font-weight: bold; font-size: 13px; padding-left: 5px;}',
            '#side-right .sidebar-handle {float: left;}',
            '#side-left .sidebar-handle {float: right;}',
            '#side-right a {display: block;min-width: 100%;cursor: pointer;padding: 4px 5px 8px 5px;border-radius: 4px;font-size: 13px;}',
            '.sidebar-content2 span {display: block; min-width: 94%;cursor: pointer;border-radius: 4px; padding: 0 5px 0 5px; font-size: 12px;}',
            '#side-right a span {padding-right: 8px;}',
            '#side-right a:hover {background-color: rgba(97, 146, 199, 0.65);text-decoration: none;}',
            '.sidebar-content2 span:hover {background-color: rgba(97, 146, 199, 0.65);text-decoration: none;}',
            '.sidebar-content2 a:hover {text-decoration: none;}',
            '#chat .update .text {color: #07ACE0;font-weight: "Roboto,sans-serif";margin-top: 0px; padding-top: 0px;}',
            '.chat-text {color: #0EACE9;font-weight: "Comic Sans MS", "Lucida Grande";margin-top: 0px; padding-top: 0px;}',
            '#chat .text a:hover {color: #ac76ff;font-weight: "Comic Sans MS", "Lucida Grande";margin-top: 0px; padding-top: 0px;}',
            '#chat .text a:visited {color: rgb(196,196,241);font-weight: "Comic Sans MS", "Lucida Grande";margin-top: 0px; padding-top: 0px;}',
            '#chat .text a {color: rgb(222,233,125);font-weight: "Comic Sans MS", "Lucida Grande";margin-top: 0px; padding-top: 0px;}',
        '#chat .from.you {color: #0BB1F1; font-weight: "Comic Sans MS", "Lucida Grande";margin-top: 0px; padding-top: 0px;}',
            '.is-you .name {color: rgb(0, 204, 255); font-weight: "Comic Sans MS", "Lucida Grande";margin-top: 0px; padding-top: 0px;}',
            '.chat-from-you {color: rgb(0, 204, 255); font-weight: "Comic Sans MS", "Lucida Grande";margin-top: 0px; padding-top: 0px;}',
            '.chat-from-featureddj {color: #ac76ff; font-weight: "Comic Sans MS", "Lucida Grande"; margin-top: 0px; padding-top: 0px;}',
            '.chat-from-bouncer {color: #ac76ff; font-weight: "Comic Sans MS", "Lucida Grande"; margin-top: 0px; padding-top: 0px;}',
            '.chat-from-manager {color: #ac76ff; font-weight: "Comic Sans MS", "Lucida Grande"; margin-top: 0px; padding-top: 0px;}',
            '.chat-from-cohost {color: #ac76ff;font-weight: "Comic Sans MS", "Lucida Grande";margin-top: 0px; padding-top: 0px;}',
            '.chat-from-host {color: #16a765;font-weight: "Comic Sans MS", "Lucida Grande";margin-top: 0px; padding-top: 0px;}',
           '#chat-from-ambassador {color: #89be6c;font-weight: "Comic Sans MS", "Lucida Grande";margin-top: 0px; padding-top: 0px;}',
        '#chat .mention.is-you {border-left: #6F9DFF 3px solid;}',
            '#chat .emote .text {color: #dee97d;}',
            '.dark-label {color: #076CEC;}',
        '#footer .dark-label {color: #076CEC;}',
            '#user-meta .label {color: #076CEC;}',
        '.meta-header span {color: rgba(255, 255, 255, 0.79); position: absolute; left: 15px; font-size: 10px;}',
            '.chat-message:nth-child(2n), .chat-mention:nth-child(2n), .chat-skip:nth-child(2n), .chat-moderation:nth-child(2n), .chat-emote:nth-child(2n), .chat-update:nth-child(2n) {background-color: rgba(26, 26, 26, 0.65);}',
            '.frame-background {background-color: rgba(0, 0, 0, 0.8);}',
            '#hr-div {height: 100%; width: 100%;margin: 0;padding-left: 12px;}',
            '#hr2-div2 {height: 100%; width: 100%;margin: 0;}',
            '#hr-style {position: absolute;display: block;height: 20px;width: 100%;bottom: 0%;background-image: url(http://i.imgur.com/jQhf3BW.png);}',
            '#hr2-style2 {position: absolute;display: block;height: 20px;width: 94%%;bottom: 0%;background-image: url(http://i.imgur.com/jQhf3BW.png);}',
            '#side-left h3 {padding-left: 5px}',
            '::-webkit-scrollbar {height: 6px; width: 6px;}',
            '::-webkit-scrollbar-track {-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); -webkit-border-radius: 6px;border-radius: 6px;}',
            '::-webkit-scrollbar-thumb {-webkit-border-radius: 2px;border-radius: 6px;background: rgb(132,37,236); -webkit-box-shadow: inset 0 0 4px rgba(0,0,0,0.5);}',
            '::-webkit-scrollbar-thumb:window-inactive {background: rgba(232,37,236,0.4);}',
];
 
var scripts = [
            '(function(e){e.fn.hoverIntent=function(t,n,r){var i={interval:100,sensitivity:7,timeout:0};if(typeof t==="object"){i=e.extend(i,t)}else if(e.isFunction(n)){i=e.extend(i,{over:t,out:n,selector:r})}else{i=e.extend(i,{over:t,out:t,selector:n})}var s,o,u,a;var f=function(e){s=e.pageX;o=e.pageY};var l=function(t,n){n.hoverIntent_t=clearTimeout(n.hoverIntent_t);if(Math.abs(u-s)+Math.abs(a-o)<i.sensitivity){e(n).off("mousemove.hoverIntent",f);n.hoverIntent_s=1;return i.over.apply(n,[t])}else{u=s;a=o;n.hoverIntent_t=setTimeout(function(){l(t,n)},i.interval)}};var c=function(e,t){t.hoverIntent_t=clearTimeout(t.hoverIntent_t);t.hoverIntent_s=0;return i.out.apply(t,[e])};var h=function(t){var n=jQuery.extend({},t);var r=this;if(r.hoverIntent_t){r.hoverIntent_t=clearTimeout(r.hoverIntent_t)}if(t.type=="mouseenter"){u=n.pageX;a=n.pageY;e(r).on("mousemove.hoverIntent",f);if(r.hoverIntent_s!=1){r.hoverIntent_t=setTimeout(function(){l(n,r)},i.interval)}}else{e(r).off("mousemove.hoverIntent",f);if(r.hoverIntent_s==1){r.hoverIntent_t=setTimeout(function(){c(n,r)},i.timeout)}}};return this.on({"mouseenter.hoverIntent":h,"mouseleave.hoverIntent":h},i.selector)}})(jQuery)',
            'if (jQuery.easing.easeOutCirc === undefined) jQuery.easing.easeOutCirc = function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a}',
            '$("#side-right").hoverIntent(function() {var timeout_r = $(this).data("timeout_r");if (timeout_r) {clearTimeout(timeout_r);}$(this).animate({"right": "0px"}, 500, "easeOutCirc");}, function() {$(this).data("timeout_r", setTimeout($.proxy(function() {$(this).animate({"right": "-190px"}, 500, "easeOutCirc");}, this), 500));});',
];
 
function initAPIListeners() {
        API.on(API.DJ_ADVANCE, djAdvanced);
          API.on(API.CHAT, autoRespond);
          API.on(API.DJ_UPDATE, queueUpdate);
          API.on(API.VOTE_UPDATE, function (obj) {
                    populateUserlist();
 
            });
        API.on(API.USER_JOIN, function (user) {
                  populateUserlist();
            });
            API.on(API.USER_LEAVE, function (user) {
                    populateUserlist();
            });
}
 

delay();
$('body').prepend('<style type="text/css" id="plug-css">' + "\n" + styles.join("\n") + "\n" + '</style>');
$('body').append();
$('body').append('<script type="text/javascript" id="plug-js-extra">' + "\n" + scripts.join("\n") + "\n" + '</script>');