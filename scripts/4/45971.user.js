var fileMETA = <><![CDATA[
// ==UserScript==
// @name          Facebook - Show status on Home Page
// @namespace     http://userscripts.org/users/84393
// @description   The new Facebook doesn't show your current status on your home page.  This is a simple script that adds it.  It should also update if you change your status from the home page.
// @author        Marco Rogers
// @copyright     2009, Marco Rogers (http://marcorogers.com/)
// @version       0.8
// @include       http://*.facebook.com/*
// @include       http://facebook.com/*
// @include       https://*.facebook.com/*
// @include       https://facebook.com/*
// ==/UserScript==
]]></>;

function $(ele) { return document.getElementById(ele); }
function $$(cstr) { return document.getElementsByClassName(cstr); }

// Totally stolen from John Resig's site for expediency - http://ejohn.org
function bind(context, name){
  if(typeof(name) != 'function' && context[name]) name = context[name];

  return function(){
      return name.apply(context, Array.prototype.slice.call(arguments, 2));
  };
}

var freq = 1000;
var upint = setInterval(updateStatus, freq);

function resetUpdateInterval(){
  clearInterval(upint);
  var upint = setInterval(updateStatus, freq);
}

function updateStatus() {
  if($('home_stream') && $('chat_status_control')) {
    var fbhome = new (function(){

    this.cur_status = null;

    this.add_status = function(){

        if(!$('home_stream')) return;

        var d = null;

        var chat_su_text = $('chat_su_text');
        chat_su_text = (chat_su_text) ? chat_su_text.textContent : '';

        //Only update if that status actually changed
        if(this.cur_status && this.cur_status === chat_su_text) { return; }

        var chat_su_name = $('chat_su_name');
        chat_su_name = (chat_su_name) ? chat_su_name.textContent : '';

        var chat_su_time = $('chat_su_time');
        chat_su_time = (chat_su_time) ? chat_su_time.textContent : '';

        try {

            d = <div class="profile_name_and_status"><h1 id="profile_name">Marco Rogers</h1><div class="mobile_status"><span id="profile_status"><span id="status_text">is still playing catch up... and losing.</span><small><span id="status_time"><span id="status_time_inner">11 hours ago</span></span></small></span></div></div>;

            d..*.(function::attribute('id') == 'profile_name')[0] = chat_su_name;
            d..*.(function::attribute('id') == 'status_text')[0] = chat_su_text;
            d..*.(function::attribute('id') == 'status_time_inner')[0] = chat_su_time;
        } catch(e) {
            return;
        }

        if(d){
            GM_addStyle('#fb_added_status #status_text {font-size:13px; color:#333}');
            GM_addStyle('#fb_added_status #profile_name, #fb_added_status .mobile_status {display:inline;}');
            GM_addStyle('#fb_added_status .profile_name_and_status {margin-bottom:6px;}');

            var div = $('fb_added_status');
            if(!div) {
                div = document.createElement('div');
                div.setAttribute('id', 'fb_added_status');
                var hs = $('home_stream');
                hs.insertBefore(div, hs.childNodes[0]);
            }
            div.innerHTML = d.toXMLString();

            this.cur_status = chat_su_text;
            return;
        }
    }

})();

var add_status = bind(fbhome, fbhome.add_status);

add_status();

var sbox = $('chat_status_control');
if(sbox) sbox.addEventListener('DOMNodeInserted', add_status, false);
}
}

$('chat_status_control').addEventListener('DOMNodeInserted', resetUpdateInterval, false);
