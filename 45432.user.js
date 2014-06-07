scr_meta=<><![CDATA[
// ==UserScript==
// @name           Quake Live Tier Viewer
// @version        1.0.3
// @namespace      http://userscripts.org/users/38506
// @description    display your skill tier in each gametype
// @include        http://www.quakelive.com/*
// ==/UserScript==
]]></>.toString();

var quakelive = unsafeWindow.quakelive;
var $;

function h(a, b) {
    var charcode = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var asum = 0;
    var output = [];
    var i;
    for (i = 0; i < a.length; i++) {
        asum += a.charCodeAt(i);
    }
    for (i = 0; i < b.length; i++) {
        var out = (charcode.indexOf(b.charAt(i))) - (i + 1) * asum % 65;
        output.push((out > -1 ? out : out + 65));
    }
    return output;
}

function display_skills() {
    var alert_message = "";
    var bot_sk = h(unsafeWindow.quakelive.session, this.textContent);

    var gametypes = [];
    gametypes[0] = "FFA";
    gametypes[1] = "Duel";
    gametypes[3] = "TDM";
    gametypes[4] = "CA";
    gametypes[5] = "CTF";
    
    gametypes.forEach(function (value, index, array) {
        alert_message += " <span>" + array[index] + ": " + (bot_sk[index] || "?") + "</span>";
    });

    this.innerHTML = alert_message;
    $("#qltv_skillTiers span:even").css("color", "#AFF");
    $("#qltv_skillTiers span:odd").css("color", "#3FF");
}

function wait_for_toplinks() {
    var qlv_topLinks = document.getElementById('qlv_topLinks');
    if (qlv_topLinks) {
        $ = unsafeWindow.jQuery;
        $('<div id="qltv_skillTiers"/>')
            .insertAfter("#qlv_statusTop")
            .addClass("smallWhite")
            .css("position", "absolute")
            .css("float", "right")
            .css("top", "16px")
            .css("right", "15px")
            .text("Loading skills...")
            .load("/offlinegame #bot_sk", {}, display_skills);
    
    }
    else {
        window.setTimeout(wait_for_toplinks, 250);
    }
}

wait_for_toplinks();



// Another Auto Update Script from http://userscripts.org/scripts/show/38017
// Copyleft Michael Medley <medleymind@gmail.com>, All Wrongs Reserved
aaus_38017={i:'45432',d:2,n:/\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1],v:/\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1],t:new Date().getTime()|0,ca:function(r){GM_xmlhttpRequest({method:'GET',url:'https://userscripts.org/scripts/source/'+this.i+'.meta.js',headers:{'User-agent':window.navigator.userAgent,'Accept':'application/atom+xml,application/xml,text/xml'},onload:function(x){aaus_38017.co(x,r)}})},co:function(x,r){this.xv=/\/\/\s*@version\s*(.*)\s*\n/i.exec(x.responseText)[1];this.xn=/\/\/\s*@name\s*(.*)\s*\n/i.exec(x.responseText)[1];if(this.xv!=this.v&&confirm('A new version of the '+this.xn+' user script is available. Do you want to update?')){GM_setValue('updated',this.t);GM_openInTab('http://userscripts.org/scripts/source/'+this.i+'.user.js')}else if(this.xv&&this.xv!=this.v){if(confirm('Do you want to turn off auto updating for this script?')){GM_setValue('updated','off');GM_registerMenuCommand("Auto Update "+this.n,function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca('return')});alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.')}else{GM_setValue('updated',this.t)}}else{if(r)alert('No updates available for '+this.n);GM_setValue('updated',this.t)}},ch:function(){if(GM_getValue('updated',0)==0)GM_setValue('updated',this.t);if(GM_getValue('updated',0)!='off'&&+this.t>+GM_getValue('updated',0)+86400000*this.d){this.ca()}else if(GM_getValue('updated',0)=='off'){GM_registerMenuCommand("Enable "+this.n+" updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)})}else{GM_registerMenuCommand("Check "+this.n+" for updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)})}}};if(self.location==top.location&&GM_xmlhttpRequest)aaus_38017.ch();
