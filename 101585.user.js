// ==UserScript==
// @name       Inpage video player
// @description en: Plays video directly in pages with links to video hostings.
// @description ru: Проигрывает видео в сообщениях с ссылками на видео хостинги.
// @version    2013.08.06
// @namespace  http://userscripts.org/scripts/show/101585
// @include    http://*
// @include    https://*
// @exclude    *.js
// @exclude    *.txt
// @exclude    *.pdf
// @exclude    *.fb2
// @exclude    *.jpg
// @exclude    *.jpeg
// @exclude    *.png
// @exclude    *.apng
// @exclude    *.gif
// @exclude    *.swf
// @exclude    *//localhost*
// @exclude    *//127.0.0.*
// @exclude    *//192.168.*
// @exclude    *//0.0.0.0*
// @exclude    *dragonfly.opera.com*
// @exclude    http*youtu.be*
// @exclude    http*dailymotion.com*
// @exclude    http*jsperf.com*
// @exclude    http*youtube.com*
// @exclude    http*vimeo.com*
// @exclude    http*twitvid.com*
// @exclude    http*rutube.ru*
// @exclude    http*google.*
// @exclude    http*yandex.*
// @exclude    http*bing.*
// @exclude    http*soundcloud.com*
// @exclude    http*videobam.com*
// @exclude    http*collegehumor.com*
// @exclude    http*xhamster.com*
// @exclude    http*pornhub.com*
// @exclude    http*acid3.acidtests.org*
// @run-at     document-end
// ==/UserScript==

(function(window){
if (window.name === 'autopatchwork-request-iframe') return;

// Settings
var autoEmbed = false; // automatic embedding // автовстраивание всех видео
var langDetect = true; // language detection // определение языка
//var MAX_LINKS = 100; // if there are more links to videos than that page is ignored //если ссылок больше - страница игнорируется
var defaultMultiply = 4.5/3; // 1, 4/3, 5/3, 2 - base player scale // начальный масштаб плеера
var onlyOne = true; // show only one player at a time // показывать всегда только один проигрыватель
var tabIcon = false; // show tab mini-icon if page have opened players // показывать мини-иконку в табе если открыт хоть один плеер

var videohosts = [
/*Video hostings SITEINFO: 
 * domain (without www; can include path) = string
 * videoid = regexp with capturing group for $1
 * playerbase = string, URL of IFRAME-based player
 * options = string, if you set this to empty string ('') player will ignore autoEmbed setting
 * mediaWidth, mediaHeight = integer, default player size
*/
{
domain:'youtube.com'
,videoid: 'v=([^&]+)'
,playerbase:'http://www.youtube.com/embed/' 
,options: '?autoplay=' + (autoEmbed ? '0' : '1')+ '&fs=1&rel=0&modestbranding=1&hd=1&iv_load_policy=3'
,mediaWidth: 480
,mediaHeight: 360
},
{
domain:'youtu.be'
,videoid: 'youtu\\.be/([^&]+)'
,playerbase:'http://www.youtube.com/embed/' 
,options: '?autoplay=' + (autoEmbed ? '0' : '1')+ '&fs=1&rel=0&modestbranding=1&hd=1&iv_load_policy=3'
,mediaWidth: 480
,mediaHeight: 360
},
{
domain:'vimeo.com'
,videoid: '\\.com/(?:v=)?([\\d]+)'
,playerbase:'http://player.vimeo.com/video/'
,options: '?autoplay=' + (autoEmbed ? '0' : '1')
,mediaWidth: 480
,mediaHeight: 360
},
{
domain:'dailymotion.com'
,videoid: '\\.com/video/([^_]+)'
,playerbase:'http://www.dailymotion.com/embed/video/'
,options: '?autoPlay=' + (autoEmbed ? '0' : '1')
,mediaWidth: 480
,mediaHeight: 210
},
{
domain:'videobam.com'
,videoid: '\\.com/(.+)'
,playerbase:'http://videobam.com/widget/'
,options: ''
,mediaWidth: 480
,mediaHeight: 325
},
{
domain:'twitvid.com'
,videoid: '\\.com/([^/&]+)'
,playerbase:'http://www.twitvid.com/embed.php?guid='
,options: '?autoplay=' + (autoEmbed ? '0' : '1')
,mediaWidth: 480
,mediaHeight: 360
},
{
domain:'rutube.ru'
,videoid: '/v=([^&]+)'
,playerbase:'http://video.rutube.ru/'
,options: '?autoplay=' + (autoEmbed ? '0' : '1')
,mediaWidth: 480
,mediaHeight: 360
},
{
domain:'collegehumor.com'
,videoid: 'video/(\\d+)'
,playerbase:'http://www.collegehumor.com/e/'
,options: ''
,mediaWidth: 530
,mediaHeight: 300
},
{
domain:'soundcloud.com'
,videoid: '(https?://([^\\.]+\\.)?soundcloud.com/[^\\s]+)'
,playerbase:'https://w.soundcloud.com/player/?url='
,options: ''
,mediaWidth: 500
,mediaHeight: 80
},
{
domain:'xhamster.com'
,videoid: '/(?:movies\\/)([\\d]+)'
,playerbase:'http://xhamster.com/xembed.php?video='
,options: ''
,mediaWidth: 510
,mediaHeight: 400
},
{
domain:'pornhub.com'
,videoid: '(?:viewkey=)([\\d\\w]+)'
,playerbase:'http://www.pornhub.com/embed/'
,options: ''
,mediaWidth: 465
,mediaHeight: 360
}
];


// Service functions
function insertAfter(referenceNode, node) { referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling); }

function addEvent(obj, sEvent, sFunc) {
    if (obj.addEventListener) obj.addEventListener(sEvent, sFunc, false);
    else if (obj.attachEvent) obj.attachEvent('on' + sEvent, sFunc);
}

function stripEvents(ele) { var node = ele.cloneNode(true); ele.parentNode.replaceChild(node, ele); return node; }

function onLoad() {
if(!document.body) return;
if(typeof document.evaluate === 'undefined') { alert('[InpageVideo] Your browser is not supported.'); return; }

var SITE_PREFIX = '^https?://(?:m\\.|www\\d*\\.)?';

var cssText = '#video_div {overflow: visible !important; color: #999; background:transparent; margin:0 !important; padding:0 !important; display: block !important; border: none !important}\
#video_div p { font-size: 13px !important; line-height: 150% !important; border: none !important; margin:0 !important; padding:0 !important; background-color: transparent !important}\
#video_div a { padding: 0px 3px 2px 3px; color: #6da3bd; text-decoration: none; }\
#video_div a:hover { color: #05B; text-decoration: none; }\
iframe#player_frame { overflow: visible !important; display: block !important; }\
a[data-player-href]::before { \
background-image: url(data:image/png;base64,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);\
content: "";\
vertical-align: middle;\
display: inline-block;\
height: 16px;\
margin-right: 4px;\
position: relative;\
width: 16px;\
}\
#player_size:lang(ru), #player_size:lang(ru_RU) {content: "\u0440\u0430\u0437\u043c\u0435\u0440 \u043f\u043b\u0435\u0435\u0440\u0430"}\
#close_player:lang(ru), #player_size:lang(ru_RU) {content: "\u0437\u0430\u043a\u0440\u044b\u0442\u044c \u043f\u043b\u0435\u0435\u0440"}\
';

function onVideoLink(event) {
    var playerHref = this.getAttribute('data-player-href'),
        width = parseInt(this.getAttribute('data-width'),10),
        height = parseInt(this.getAttribute('data-height'),10);
        
    if ((!!event && (event.shiftKey || event.altKey || event.ctrlKey)) || !playerHref || isNaN(width) || isNaN(height)) return;
    if (!!event) {
        event.preventDefault();
        !!event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
    }

    if (playerHref.length > 0) {
        if (onlyOne && !autoEmbed) {
            var close_links = document.querySelectorAll('a[href="javascript:void()"][id="close_player"]');
            var cl_len = close_links.length;
            for (var i = 0; i < cl_len; i++){
                close_links[i].click();
            }
        }

        if (tabIcon && !autoEmbed) Tinycon.setBubble('\u25ba');

        var playerDIV = document.createElement('div');
        if (langDetect) {
            playerDIV.setAttribute('lang', window.navigator.language);
            playerDIV.setAttribute('xml:lang', window.navigator.language);
        }
        playerDIV.setAttribute('style', 'width:'+width*defaultMultiply+'px');
        var iframe = document.createElement('iframe');
        iframe.setAttribute('id', 'player_frame');
        iframe.setAttribute('width', width*defaultMultiply);
        iframe.setAttribute('height', height*defaultMultiply);
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('src', playerHref);
        //iframe.setAttribute('allowfullscreen','');
        iframe.setAttribute('allowtransparency', 'true');
        iframe.setAttribute('scrolling','no');
        playerDIV.appendChild(iframe);
 
        playerDIV.setAttribute('id', 'video_div');
        var p = document.createElement('p');
        p.setAttribute('style', 'float: right;');

        var a = document.createElement('span');
        a.setAttribute('id', 'player_size');
        a.appendChild(document.createTextNode('player size'));
        p.appendChild(a);
        p.appendChild(document.createTextNode(' : '));
        
        function createSizeLink(id, width, height){
            a = document.createElement('a');
            a.setAttribute('href', 'javascript:void()');
            a.setAttribute('id', id);
            a.appendChild(document.createTextNode((Math.round(width/10)*10).toString() + 'x' + (Math.round(height/10)*10).toString()));
            addEvent(a, 'click', function(e){
                setSize.apply(this, [width, height]);
                e.preventDefault();
                return false;
            });
            p.appendChild(a);
            
        }
        
        function setSize(width, height) {
            this.parentNode.parentNode.firstChild.setAttribute('width', width);
            this.parentNode.parentNode.setAttribute('style', 'width: '+width+'px;');
            this.parentNode.parentNode.firstChild.setAttribute('height', height);
        }

        createSizeLink('normal_video', width, height);
        p.appendChild(document.createTextNode(' | '));
        createSizeLink('big_video', width*4/3, height*4/3);
        p.appendChild(document.createTextNode(' | '));
        createSizeLink('huge_video', width*5/3, height*5/3);
        p.appendChild(document.createTextNode(' | '));
        createSizeLink('giant_video', width*2, height*2);

        playerDIV.appendChild(p);

        p = document.createElement('p');
        p.setAttribute('style', 'float: left;');
        a = document.createElement('a');
        a.setAttribute('href', 'javascript:void()');
        a.setAttribute('id', 'close_player');
        a.appendChild(document.createTextNode('close player'));
        addEvent(a, 'click', function (e) {
            var grandpa = this.parentNode.parentNode;
            grandpa.previousSibling.setAttribute('style', grandpa.previousSibling.getAttribute('bakstyle'));
            grandpa.parentNode.removeChild(grandpa);
            if (tabIcon && !autoEmbed) Tinycon.reset();
            e.preventDefault();
            return false;
        });
        p.appendChild(a);
        playerDIV.appendChild(p);
        p = document.createElement('br');
        p.setAttribute('style', 'clear:both');
        playerDIV.appendChild(p);

        insertAfter(this, playerDIV);
        this.setAttribute('bakstyle', this.getAttribute('style'));
        this.setAttribute('style', 'display: none');

        return false;
    }
}


// Main
// Checking if we are somehow turn out on the video hosting domain end return if true
for (var h = 0; h < videohosts.length; h++) {
    if ((new RegExp (SITE_PREFIX + videohosts[h].domain.replace(/\./g, '\\.'), 'i')).test(window.location.href))
        return;
}

var css = document.createElement('style');
css.setAttribute('id', 'ippCSS');
css.setAttribute('type', 'text/css');
css.appendChild(document.createTextNode(cssText));
(document.getElementsByTagName('head')[0] || document.documentElement).appendChild(css);

function parseLinks (doc) {
    var xpath = '//a[count(child::*) = 0 and not(@data-player-href) and ('; // and not(@data-found-no-video)
    for (var h = 0; h < videohosts.length; h++)
        xpath += 'contains(@href,\"' + videohosts[h].domain + '\") or ';
    xpath += 'false)]';

    var links = (doc instanceof window.HTMLDocument ? doc : document).evaluate(xpath, doc, null, window.XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    //if (links.snapshotLength > MAX_LINKS) return; //seems like a link-dump

    for (var lnk = null, i = 0; (lnk = links.snapshotItem(i)); i++) {
        // only non-empty <a>text...</a> links supported
        //lnk.setAttribute('data-found-no-video'); //?
        if (!lnk.firstChild || lnk.firstChild.textContent === '') continue;

        for (var h = 0; h < videohosts.length; h++) {
            if ((new RegExp (SITE_PREFIX + videohosts[h].domain.replace(/\./gi, '\\.'), 'i')).test(lnk.href)) {
                if (!(new RegExp (videohosts[h].videoid, 'i')).test(lnk.href)) continue;

                lnk = stripEvents(lnk); // removes predefined events from a node

                lnk.setAttribute('data-player-href', videohosts[h].playerbase + encodeURIComponent(RegExp.$1) + videohosts[h].options);
                lnk.setAttribute('data-width', videohosts[h].mediaWidth);
                lnk.setAttribute('data-height', videohosts[h].mediaHeight);
                
                addEvent(lnk, 'click', onVideoLink);
                if (autoEmbed && videohosts[h].options != '') onVideoLink.call(lnk);
                lnk = null;

                break;
            }
        }
    }
}

parseLinks(document);

// AutoPagerize and AutoPatchWork support
function addFilterHandler () {
    setTimeout(function () {
        window.AutoPagerize.addDocumentFilter(parseLinks);
    }, 300);
}

(typeof window.AutoPagerize !== 'undefined') ? addFilterHandler() : window.addEventListener('GM_AutoPagerizeLoaded', addFilterHandler, false);
window.addEventListener('AutoPatchWork.DOMNodeInserted', function (e) {
    parseLinks(e.target);
}, false);

} // onLoad end

if (typeof document !== 'undefined') {
    if (typeof document.addEventListener !== 'undefined') document.addEventListener('DOMContentLoaded', onLoad, false);
    else addEvent(document, 'load', onLoad);
    if (tabIcon !== true) return;
} else return;

/*!
  Tinycon - A small library for manipulating the Favicon
  Tom Moor, http://tommoor.com
  Copyright (c) 2012 Tom Moor
  MIT Licensed
  @version 0.5-mod1
*/
var Tinycon={};var currentFavicon=null;var originalFavicon=null;var originalTitle=document.title;var faviconImage=null;var canvas=null;var options={};var defaults={width:7,height:9,font:'10px arial',colour:'#ffffff',background:'#F03D25',fallback:true,abbreviate:true};var ua=(function(){var agent=navigator.userAgent.toLowerCase();return function(browser){return agent.indexOf(browser)!==-1}}());var browser={ie:ua('msie'),chrome:ua('chrome'),webkit:ua('chrome')||ua('safari'),safari:ua('safari')&&!ua('chrome'),mozilla:ua('mozilla')&&!ua('chrome')&&!ua('safari')};var getFaviconTag=function(){var links=document.getElementsByTagName('link');for(var i=0,len=links.length;i<len;i++){if((links[i].getAttribute('rel')||'').match(/\bicon\b/)){return links[i]}}return false};var removeFaviconTag=function(){var links=document.getElementsByTagName('link');var head=document.getElementsByTagName('head')[0];for(var i=0,len=links.length;i<len;i++){var exists=(typeof(links[i])!=='undefined');if(exists&&(links[i].getAttribute('rel')||'').match(/\bicon\b/)){head.removeChild(links[i])}}};var getCurrentFavicon=function(){if(!originalFavicon||!currentFavicon){var tag=getFaviconTag();originalFavicon=currentFavicon=tag?tag.getAttribute('href'):'/favicon.ico'}return currentFavicon};var getCanvas=function(){if(!canvas){canvas=document.createElement("canvas");canvas.width=16;canvas.height=16}return canvas};var setFaviconTag=function(url){removeFaviconTag();var link=document.createElement('link');link.type='image/x-icon';link.rel='icon';link.href=url;document.getElementsByTagName('head')[0].appendChild(link)};var log=function(message){if(window.console)window.console.log(message)};var drawFavicon=function(label,colour){if(!getCanvas().getContext||browser.ie||browser.safari||options.fallback==='force'){return updateTitle(label)}var context=getCanvas().getContext("2d");var colour=colour||'#000000';var src=getCurrentFavicon();faviconImage=new Image();faviconImage.onload=function(){context.clearRect(0,0,16,16);context.drawImage(faviconImage,0,0,faviconImage.width,faviconImage.height,0,0,16,16);if((label+'').length>0)drawBubble(context,label,colour);refreshFavicon()};if(!src.match(/^data/)){faviconImage.crossOrigin='anonymous'}faviconImage.src=src};var updateTitle=function(label){if(options.fallback){if((label+'').length>0){document.title='('+label+') '+originalTitle}else{document.title=originalTitle}}};var drawBubble=function(context,label,colour){if(typeof label=='number'&&label>99&&options.abbreviate){label=abbreviateNumber(label)}var len=(label+'').length-1;var width=options.width+(6*len);var w=16-width;var h=16-options.height;context.font=(browser.webkit?'bold ':'')+options.font;context.fillStyle=options.background;context.strokeStyle=options.background;context.lineWidth=1;context.fillRect(w,h,width-1,options.height);context.beginPath();context.moveTo(w-0.5,h+1);context.lineTo(w-0.5,15);context.stroke();context.beginPath();context.moveTo(15.5,h+1);context.lineTo(15.5,15);context.stroke();context.beginPath();context.strokeStyle="rgba(0,0,0,0.3)";context.moveTo(w,16);context.lineTo(15,16);context.stroke();context.fillStyle=options.colour;context.textAlign="right";context.textBaseline="top";context.fillText(label,16,8.5)};var refreshFavicon=function(){if(!getCanvas().getContext)return;try{setFaviconTag(getCanvas().toDataURL())}catch(e){}};var abbreviateNumber=function(label){var metricPrefixes=[['G',1000000000],['M',1000000],['k',1000]];for(var i=0;i<metricPrefixes.length;++i){if(label>=metricPrefixes[i][1]){label=round(label/metricPrefixes[i][1])+metricPrefixes[i][0];break}}return label};var round=function(value,precision){var number=new Number(value);return number.toFixed(precision)};Tinycon.setOptions=function(custom){options={};for(var key in defaults){options[key]=custom.hasOwnProperty(key)?custom[key]:defaults[key]}return this};Tinycon.setImage=function(url){currentFavicon=url;refreshFavicon();return this};Tinycon.setBubble=function(label,colour){label=label||'';drawFavicon(label,colour);return this};Tinycon.reset=function(){setFaviconTag(originalFavicon)};Tinycon.setOptions(defaults);
Tinycon.setOptions({
    width: 7,
    height: 8,
    font: '7px arial',
    colour: '#ffffff',
    background: '#6184C5',
    fallback: true
})

})(typeof unsafeWindow !== 'undefined' ? unsafeWindow : window);