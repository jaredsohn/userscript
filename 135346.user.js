// ==UserScript==
// @name Facebook Autopoker
// @author Kingster
// @namespace http://www.kingster.in
// @description The FB Autopoker
// @include       http*://*.facebook.com/*
// @exclude       htt*://*static*.facebook.com*
// @exclude       htt*://*channel*.facebook.com*
// @exclude       htt*://developers.facebook.com/*
// @exclude       htt*://upload.facebook.com/*
// @exclude       htt*://*onnect.facebook.com/*
// @exclude       htt*://*acebook.com/connect*
// @exclude       htt*://*.facebook.com/plugins/*
// @exclude       htt*://*.facebook.com/l.php*
// @exclude       htt*://*.facebook.com/ai.php*
// @exclude       htt*://*.facebook.com/extern/*
// @exclude       htt*://*.facebook.com/pagelet/*
// @exclude       htt*://api.facebook.com/static/*
// @exclude       htt*://*.facebook.com/contact_importer/*
// @exclude       htt*://*.facebook.com/ajax/*
// @exclude       htt*://www.facebook.com/places/map*_iframe.php*
// @version 0.1.16
// ==/UserScript==


/* EDIT UR Exceptions HERE */
var except=["672396272"];
/* DO NOT TOUCH BELOW */

var $ , jQ;
function getCookie(a){var b,c,d,e=document.cookie.split(";");for(b=0;b<e.length;b++){c=e[b].substr(0,e[b].indexOf("="));d=e[b].substr(e[b].indexOf("=")+1);c=c.replace(/^\s+|\s+$/g,"");if(c==a){return unescape(d)}}}
function get_userid(){user=getCookie("c_user");return user}
function generatePhstamp(a,b){var c=a.length;numeric_csrf_value="";for(var d=0;d<b.length;d++){numeric_csrf_value+=b.charCodeAt(d)}return"1"+numeric_csrf_value+c}
function dopoke(a,b){user=get_userid();fb_dtsg=jQ("input[name=fb_dtsg]").val();phs=generatePhstamp("__a=1&__user="+user+"&uid="+a+"&pokeback=1&nctr[_mod]=pagelet_pokes&fb_dtsg="+fb_dtsg,fb_dtsg);postdata="__a=1&__user="+user+"&uid="+a+"&pokeback=1&nctr[_mod]=pagelet_pokes&fb_dtsg="+fb_dtsg+"&phstamp="+phs;pokeurl=window.location.protocol+"//www.facebook.com/ajax/pokes/poke_inline.php";jQ.ajax({type:"POST",url:pokeurl,data:postdata,success:function(a){b.replaceWith("Auto Poked")},error:function(){}});}
function getUrlVars(a){var b=[],c;var d=a.slice(a.indexOf("?")+1).split("&");for(var e=0;e<d.length;e++){c=d[e].split("=");b.push(c[0]);b[c[0]]=c[1]}return b}

// Add jQuery
(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
            GM_JQ = document.createElement('script');

        GM_JQ.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;
        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        jQ = unsafeWindow.jQuery.noConflict(true);
        $ = jQ;
		jQ.expr[':'].icontains = function(a,i,m){
			 return jQ(a).text().toUpperCase().indexOf(m[3].toUpperCase())>=0;
		};
		letsJQuery(); 
    }
}

// All your GM code must be inside this function
function letsJQuery() { 
 
       jQ('body').find('a').filter(':icontains("Poke Back")').each(function(){
            $lp = jQ(this);
			link = $lp.attr('ajaxify'); params = getUrlVars(link);
            if ( typeof params ['uid'] !== "undefined"  &&  jQ.inArray(params ['uid'], except) == -1 ) {   dopoke(params ['uid'] , $lp); $lp.replaceWith("Auto Poked"); }
        });
        setTimeout(letsJQuery,500);
}