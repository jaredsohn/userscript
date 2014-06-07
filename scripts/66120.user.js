// ==UserScript==
// @name		Russian army orders
// @version		0.03
// @description	Show current order
// @author		Toshka
// @namespace	ToshkaSpace
// @include		http://ww*.erepublik.com/*
// @require		http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// ==/UserScript==

// ===============================================================================
// License and Disclaimer (lets make it simple :))
// ===============================================================================
// This software is donationware. You are welcome to donate eRepublik in-game gold
// to author of this script.  Amount of gold is up to you and it reflects what you 
// think author deserves for the effort of contributing to the eRepublik community.
// Software is provided 'AS IS' and without any warranty. 
// Use on your own responsibility.
// ===============================================================================

// Add 'missing' trim to the String class
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); }

// URL Setup
var currURL = location.href;
var arrURL = currURL.split('/');
var BASE_URL = arrURL[0] + '/' + arrURL[1] + '/' + arrURL[2] + '/';
var TUMBLR_URL = 'http://regular-army.tumblr.com/api/read/json?num=1';


function ShowOrder(){
    // add new tab to user pref
    $('ul.tabs li a span').css('width','134px');
    $('ul.tabs li.last').removeClass('last');
    $('ul.tabs').append('<li class="last"><a href="#" id="order_tab"><span>Order</span></a></li>');
    $('ul.tabs li.last a span').css('width','126px');
    $('ul.tabs').parent().append('<div id="order_tab_holder" style="display:none;min-height:383px;"><div id="oth" style="width:100%;min-height:383px;">&nbsp;</div></div>')
    
    $('#order_tab').live('click', function(){
        $('#career_tab_content, #bio_tab_content, #friend_tab_holder').hide();
        $('#carrrer_tab, #bio_tab, #friends_tab').removeClass('on');
        $('#order_tab').addClass('on');
        $('#oth').html('&nbsp;');
        $('#order_tab_holder').show();
        GM_xmlhttpRequest({
            method: 'GET',
            url: TUMBLR_URL,
            onload: function (data) {
                eval(data.responseText);
                $('#oth').html('<div style="width:100%;"><img src="'+tumblr_api_read.posts[0]["photo-url-400"]+'" style="margin-left:122px;background-color:#F0F0F0;padding:8px;"/><br/><br/>'+tumblr_api_read.posts[0]["photo-caption"]+'<br/><br/><p>'+tumblr_api_read.posts[0]["date"]+'</p>'+'</div>').show();
            }
        });
        return false;
    });

    $('#carrrer_tab, #bio_tab, #friends_tab').click(function(){
        $('#order_tab_holder').hide();
        $('#order_tab').removeClass('on');
    });
}



function Main(e) {

    if (typeof unsafeWindow == 'undefined')
        unsafeWindow = window;

    var subURL = currURL.substr(BASE_URL.length);
    LOCALE = subURL.substring(0, 2) + '/';
    BASE_URL += LOCALE;
    subURL = currURL.substr(BASE_URL.length);

    var pagesFunctions = [
        //{p: '/',	s:1,	f: ShowOrder},
        {p: 'citizen/profile/',	s:1,	f: ShowOrder}
    ];

    pagesFunctions.forEach(function(v) {
        if (subURL.substr(0, v.p.length) == v.p)
            v.f();
    });

};

window.addEventListener('load', function(){var checker=setInterval(function(){
    if(typeof ($ = jQuery.noConflict()) != "undefined") {
        clearInterval(checker);
        Main();
    }
},100);}, false);


// =============================================================================================================
//  Version     Date            Change Log
//  0.03        13 Jan 2010         - Opera support was added
//  0.02        11 Jan 2010         - Get data from tumblr api
//  0.01        10 Jan 2010         - Show orders for Russian regular army