// ==UserScript==
// @name        Blendle Normaal Verticaal
// @namespace   http://twitter.com/depositado
// @include     https://beta.blendle.nl/#item/*
// @version     1
// @grant       none
// ==/UserScript==

/*
// @updateURL   http://userscripts.org/scripts/source/486622.meta.js
*/


if (typeof console == 'undefined') {
    window.console = {
        log: function () {
        }
    };
}


// cookie plugin
// http://plugins.jquery.com/cookie/
(function(e){if(typeof define==="function"&&define.amd){define(["jquery"],e)}else if(typeof exports==="object"){e(require("jquery"))}else{e(jQuery)}})(function(e){function n(e){return u.raw?e:encodeURIComponent(e)}function r(e){return u.raw?e:decodeURIComponent(e)}function i(e){return n(u.json?JSON.stringify(e):String(e))}function s(e){if(e.indexOf('"')===0){e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")}try{e=decodeURIComponent(e.replace(t," "));return u.json?JSON.parse(e):e}catch(n){}}function o(t,n){var r=u.raw?t:s(t);return e.isFunction(n)?n(r):r}var t=/\+/g;var u=e.cookie=function(t,s,a){if(s!==undefined&&!e.isFunction(s)){a=e.extend({},u.defaults,a);if(typeof a.expires==="number"){var f=a.expires,l=a.expires=new Date;l.setTime(+l+f*864e5)}return document.cookie=[n(t),"=",i(s),a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+a.path:"",a.domain?"; domain="+a.domain:"",a.secure?"; secure":""].join("")}var c=t?undefined:{};var h=document.cookie?document.cookie.split("; "):[];for(var p=0,d=h.length;p<d;p++){var v=h[p].split("=");var m=r(v.shift());var g=v.join("=");if(t&&t===m){c=o(g,s);break}if(!t&&(g=o(g))!==undefined){c[m]=g}}return c};u.defaults={};e.removeCookie=function(t,n){if(e.cookie(t)===undefined){return false}e.cookie(t,"",e.extend({},n,{expires:-1}));return!e.cookie(t)}})


// livequery plugin
// https://github.com/brandonaaron/livequery
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){a.extend(a.fn,{livequery:function(b,c,d){var e=a.livequery.findorcreate(this,b,c,d);return e.run(),this},expire:function(b,c,d){var e=a.livequery.find(this,b,c,d);return e&&e.stop(),this}}),a.livequery=function(b,c,d,e){this.selector=c,this.jq=b,this.context=b.context,this.matchedFn=d,this.unmatchedFn=e,this.stopped=!1,this.id=a.livequery.queries.push(this)-1,d.$lqguid=d.$lqguid||a.livequery.guid++,e&&(e.$lqguid=e.$lqguid||a.livequery.guid++)},a.livequery.prototype={run:function(){this.stopped=!1,this.jq.find(this.selector).each(a.proxy(function(a,b){this.added(b)},this))},stop:function(){this.jq.find(this.selector).each(a.proxy(function(a,b){this.removed(b)},this)),this.stopped=!0},matches:function(b){return!this.isStopped()&&a(b,this.context).is(this.selector)&&this.jq.has(b).length},added:function(a){this.isStopped()||this.isMatched(a)||(this.markAsMatched(a),this.matchedFn.call(a,a))},removed:function(a){!this.isStopped()&&this.isMatched(a)&&(this.removeMatchedMark(a),this.unmatchedFn&&this.unmatchedFn.call(a,a))},getLQArray:function(b){var c=a.data(b,a.livequery.key)||[],d=a.inArray(this.id,c);return c.index=d,c},markAsMatched:function(b){var c=this.getLQArray(b);-1===c.index&&(c.push(this.id),a.data(b,a.livequery.key,c))},removeMatchedMark:function(b){var c=this.getLQArray(b);c.index>-1&&(c.splice(c.index,1),a.data(b,a.livequery.key,c))},isMatched:function(a){var b=this.getLQArray(a);return-1!==b.index},isStopped:function(){return this.stopped===!0}},a.extend(a.livequery,{version:"2.0.0-pre",guid:0,queries:[],watchAttributes:!0,attributeFilter:["class","className"],setup:!1,timeout:null,method:"none",prepared:!1,key:"livequery",htcPath:!1,prepare:{mutationobserver:function(){var b=new MutationObserver(a.livequery.handle.mutationobserver);b.observe(document,{childList:!0,attributes:a.livequery.watchAttributes,subtree:!0,attributeFilter:a.livequery.attributeFilter}),a.livequery.prepared=!0},mutationevent:function(){document.addEventListener("DOMNodeInserted",a.livequery.handle.mutationevent,!1),document.addEventListener("DOMNodeRemoved",a.livequery.handle.mutationevent,!1),a.livequery.watchAttributes&&document.addEventListener("DOMAttrModified",a.livequery.handle.mutationevent,!1),a.livequery.prepared=!0},iebehaviors:function(){a.livequery.htcPath&&(a("head").append("<style>body *{behavior:url("+a.livequery.htcPath+")}</style>"),a.livequery.prepared=!0)}},handle:{added:function(b){a.each(a.livequery.queries,function(a,c){c.matches(b)&&setTimeout(function(){c.added(b)},1)})},removed:function(b){a.each(a.livequery.queries,function(a,c){c.isMatched(b)&&setTimeout(function(){c.removed(b)},1)})},modified:function(b){a.each(a.livequery.queries,function(a,c){c.isMatched(b)?c.matches(b)||c.removed(b):c.matches(b)&&c.added(b)})},mutationevent:function(b){var c={DOMNodeInserted:"added",DOMNodeRemoved:"removed",DOMAttrModified:"modified"},d=c[b.type];"modified"===d?a.livequery.attributeFilter.indexOf(b.attrName)>-1&&a.livequery.handle.modified(b.target):a.livequery.handle[d](b.target)},mutationobserver:function(b){a.each(b,function(b,c){"attributes"===c.type?a.livequery.handle.modified(c.target):a.each(["added","removed"],function(b,d){a.each(c[d+"Nodes"],function(b,c){a.livequery.handle[d](c)})})})}},find:function(b,c,d,e){var f;return a.each(a.livequery.queries,function(a,g){return c!==g.selector||b!==g.jq||d&&d.$lqguid!==g.matchedFn.$lqguid||e&&e.$lqguid!==g.unmatchedFn.$lqguid?void 0:(f=g)&&!1}),f},findorcreate:function(b,c,d,e){return a.livequery.find(b,c,d,e)||new a.livequery(b,c,d,e)}}),a(function(){if("MutationObserver"in window?a.livequery.method="mutationobserver":"MutationEvent"in window?a.livequery.method="mutationevent":"behavior"in document.documentElement.currentStyle&&(a.livequery.method="iebehaviors"),!a.livequery.method)throw new Error("Could not find a means to monitor the DOM");a.livequery.prepare[a.livequery.method]()})});


// script details/updates

var us_486622_Name = GM_info.script.name;
var us_486622_Version = GM_info.script.version;

function firstRun() {
    if ($.cookie('us_486622_name') == null) {
        //set cookies
        $.cookie('us_486622_name', us_486622_Name, {
            expires: 365,
            path: '/'
        });
        $.cookie('us_486622_version', us_486622_Version, {
            expires: 365,
            path: '/'
        });
        console.info('Hi, thanks for using userscript: ' + us_486622_Name + ' v' + us_486622_Version);
    }
}
function checkIfUpdated() {
    if ($.cookie('us_486622_version') != us_486622_Version) {
        //re-set cookies
        $.cookie('us_486622_name', us_486622_Name, {
            expires: 365,
            path: '/'
        });
        $.cookie('us_486622_version', us_486622_Version, {
            expires: 365,
            path: '/'
        });
        console.info('Userscript updated to version: ' + us_486622_Version);
        alert('Userscript ' + us_486622_Name + ' is updated. \n\n Thanks for updating.');
    }
}
function setActiveCookie() {
    console.info('setActiveCookie()');
    if ($.cookie('us_486622_active') == null) {
        console.log('cookie us_486622_active not set');
        //set cookie
        $.cookie('us_486622_active', 'true', {
            path: '/'
        });
        // session
        console.log('cookie us_486622_active set to true');
    }
}

function removeCrap(){
    
    // remove all kinds of crap
    $('.v-social, #logintarget, #fb-root, #twttrHubFrameSecure').remove();
    
    // remove annoying styles
    // $('.pane-content, .item-content, .item-image, .kolom-staging, .item-columns, .kolom-column').removeAttr("style");
    
    // create hidden form element
    $('<div>').attr({
        id: 'BNV_articleContent',
        class: 'BNV_articleContent'
    }).appendTo('body');    
    
    // article content
    var article = $('.item-columns').html();
    
    // copay article content in new div
    $('#BNV_articleContent').html(article);
    
    $('.a-main, .a-overlay, .l-overlay, .a-item, .a-dialog, .a-footer, .a-error').remove();    
    
    $('link[rel=stylesheet]').attr('disabled', 'disabled');
    //$('link[rel=stylesheet]').remove();
    $('head').append("<link href='//dl.dropboxusercontent.com/u/3899/userscripts/blendle-normaal-verticaal/v1.css' id='us_486622_css' rel='stylesheet' type='text/css'>");
    
    /*
    $('div, p, h1, h2, h3, h4, h5, h6').each(function () {
        console.log('BNV: '+this);
        this.removeAttr("style");
    });
    */    
}

$(function () {
    console.log('BNV: userscript loaded: Blendle Normaal Verticaal');
    firstRun();
    checkIfUpdated();
    setActiveCookie();
    console.info('BNV: jQuery: ' + jQuery.fn.jquery);    
    
    var $blendleBody = $('body');
    $blendleBody.livequery(
        'div', // the selector to match against
        function(elem) { // a matched function
            // this = elem = the li element just added to the DOM
            var classList = $(this).attr('class').split(/\s+/);
            $.each( classList, function(index, item){
                // console.info('BNV: elem with class: '+item+' added.');
                if (item === 'item-content') {
                   console.info('BNV: Article successfully loaded.');
                   // removeCrap();
                   setTimeout(function(){ removeCrap(); }, 1000);
                }
            });
            
        }
    );    
    
    var $newContent = $('#BNV_articleContent');
    $newContent.livequery(
        'div', // the selector to match against
        function(elem) { // a matched function
            // this = elem = the li element just added to the DOM
            console.info('BNV: element added into new div.');
            var classList = $(this).attr('class').split(/\s+/);
            $.each( classList, function(index, item){
                // console.info('BNV: elem with class: '+item+' added.');
                if (item === 'item-content') {
                   console.info('BNV: Content copied into new div.');
                }
            });
            
        }
     );    
    
});