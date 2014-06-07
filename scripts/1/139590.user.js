// ==UserScript==
// @name       Go0gEl
// @version    1.13
// @include    http*://*.google.*/search*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @copyright  2012+, eMPee584
// ==/UserScript==

/* start    http://flesler-plugins.googlecode.com/files/jquery.rule-1.0.2-min.js */
/*
 * jQuery.Rule - Css Rules manipulation, the jQuery way.
 * Copyright (c) 2007-2011 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 02/7/2011
 * @author Ariel Flesler
 * @version 1.0.2
 */
(function(f){var c=f('<style rel="alternate stylesheet" type="text/css" />').appendTo("head")[0],k=c.sheet?"sheet":"styleSheet",i=c[k],m=i.rules?"rules":"cssRules",g=i.deleteRule?"deleteRule":"removeRule",d=i.ownerNode?"ownerNode":"owningElement",e=/^([^{]+)\{([^}]*)\}/m,l=/([^:]+):([^;}]+)/;i.disabled=true;var j=f.rule=function(n,o){if(!(this instanceof j)){return new j(n,o)}this.sheets=j.sheets(o);if(n&&e.test(n)){n=j.clean(n)}if(typeof n=="object"&&!n.exec){b(this,n.get?n.get():n.splice?n:[n])}else{b(this,this.sheets.cssRules().get());if(n){return this.filter(n)}}return this};f.extend(j,{sheets:function(p){var n=p;if(typeof n!="object"){n=f.makeArray(document.styleSheets)}n=f(n).not(i);if(typeof p=="string"){n=n.ownerNode().filter(p).sheet()}return n},rule:function(n){if(n.selectorText){return["",n.selectorText,n.style.cssText]}return e.exec(n)},appendTo:function(q,n,o){switch(typeof n){case"string":n=this.sheets(n);case"object":if(n[0]){n=n[0]}if(n[k]){n=n[k]}if(n[m]){break}default:if(typeof q=="object"){return q}n=i}var t;if(!o&&(t=this.parent(q))){q=this.remove(q,t)}var s=this.rule(q);if(n.addRule){n.addRule(s[1],s[2]||";")}else{if(n.insertRule){n.insertRule(s[1]+"{"+s[2]+"}",n[m].length)}}return n[m][n[m].length-1]},remove:function(o,q){q=q||this.parent(o);if(q!=i){var n=q?f.inArray(o,q[m]):-1;if(n!=-1){o=this.appendTo(o,0,true);q[g](n)}}return o},clean:function(n){return f.map(n.split("}"),function(o){if(o){return j.appendTo(o+"}")}})},parent:function(o){if(typeof o=="string"||!f.browser.msie){return o.parentStyleSheet}var n;this.sheets().each(function(){if(f.inArray(o,this[m])!=-1){n=this;return false}});return n},outerText:function(n){return !n||!n.selectorText?"":[n.selectorText+"{","\t"+n.style.cssText,"}"].join("\n").toLowerCase()},text:function(o,n){if(n!==undefined){o.style.cssText=n}return !o?"":o.style.cssText.toLowerCase()}});j.fn=j.prototype={pushStack:function(n,p){var o=j(n,p||this.sheets);o.prevObject=this;return o},end:function(){return this.prevObject||j(0,[])},filter:function(n){var p;if(!n){n=/./}if(n.split){p=f.trim(n).toLowerCase().split(/\s*,\s*/);n=function(){var o=this.selectorText||"";return !!f.grep(o.toLowerCase().split(/\s*,\s*/),function(q){return f.inArray(q,p)!=-1}).length}}else{if(n.exec){p=n;n=function(){return p.test(this.selectorText)}}}return this.pushStack(f.grep(this,function(q,o){return n.call(q,o)}))},add:function(n,o){return this.pushStack(f.merge(this.get(),j(n,o)))},is:function(n){return !!(n&&this.filter(n).length)},not:function(p,o){p=j(p,o);return this.filter(function(){return f.inArray(this,p)==-1})},append:function(n){var p=this,o;f.each(n.split(/\s*;\s*/),function(r,q){if((o=l.exec(q))){p.css(o[1],o[2])}});return this},text:function(n){return !arguments.length?j.text(this[0]):this.each(function(){j.text(this,n)})},outerText:function(){return j.outerText(this[0])}};f.each({ownerNode:d,sheet:k,cssRules:m},function(n,o){var p=o==m;f.fn[n]=function(){return this.map(function(){return p?f.makeArray(this[o]):this[o]})}});f.fn.cssText=function(){return this.filter("link,style").eq(0).sheet().cssRules().map(function(){return j.outerText(this)}).get().join("\n")};f.each("remove,appendTo,parent".split(","),function(n,o){j.fn[o]=function(){var p=f.makeArray(arguments),q=this;p.unshift(0);return this.each(function(r){p[0]=this;q[r]=j[o].apply(j,p)||q[r]})}});f.each(("each,index,get,size,eq,slice,map,attr,andSelf,css,show,hide,toggle,queue,dequeue,stop,animate,fadeIn,fadeOut,fadeTo").split(","),function(n,o){j.fn[o]=f.fn[o]});function b(o,n){o.length=0;Array.prototype.push.apply(o,n)}var h=f.curCSS;f.curCSS=function(o,n){return("selectorText" in o)?o.style[n]||f.prop(o,n=="opacity"?1:0,"curCSS",0,n):h.apply(this,arguments)};j.cache={};var a=function(n){return function(p){var o=p.selectorText;if(o){arguments[0]=j.cache[o]=j.cache[o]||{}}return n.apply(f,arguments)}};f.data=a(f.data);f.removeData=a(f.removeData);f(window).unload(function(){f(i).cssRules().remove()})})(jQuery);
/* end    http://flesler-plugins.googlecode.com/files/jquery.rule-1.0.2-min.js */


var cssText =
"#res li.psli { margin-bottom: 1em !important; padding:5px !important; } \
li.g { \
    font-family:sans-serif !important; \
    font-size:1.1em !important; \
    line-height:1.1em !important; \
    border:dashed 1px #aaa; \
    background:#fcfcfc !important; \
    margin-right:0px !important; \
    padding:5px 3px 5px 42px !important; \
    -webkit-border-radius:15px !important; \
    -moz-border-radius:15px !important; \
    borderRadius:15px !important; \
} \
li.g:hover, li.g:active { border-color:black; !important} \
h3.r { font-size:1.2em !important; line-height:1.5em !important; } \
.gb1,a.gb2,a.gb3,.w,#prs a:visited,#prs a:active,.q:active,.q:visited,.kl:active, \
a.ss-unselected, a.wtall, .f a.wtall, .f a.wtaal, .f a.wtalm, \
span.inlbtnlbl, #subform_ctrl a.gl,.w,.q:active,.q:visited,.tbotu, \
a.fl:link,.fl a,.flt,a.flt,.gl a:link,a.mblink,.mblink b, #foot a.slink, \
#fll a,#bfl a, .s a em, #tads .ac a b,#tadsb .ac a b,#rhs .ac a b, \
a.nlrl:hover, a.lrln:active, \
h3.r a, .vsc a, #rhs a { text-decoration: none !important; color:#2565dd !important;} \
#res h3.r { overflow: visible !important; } \
.vsc a:hover { color:#23c !important; } \
.vsc a:active { color:#494 !important; } \
.vsc a:visited { color:#83c !important; } \
h3.r a { border:solid 1px transparent !important; \
    display: inline-block !important; \
    padding: 5px; \
    -webkit-border-radius:5px !important; \
    -moz-border-radius:5px !important; \
    borderRadius:5px !important; } \
h3.r a:hover { border:solid 1px #aaa !important; } \
h3.r a:active { border:solid 1px #222 !important; background-color:#f0f0f0 !important; } \
.vshid { display:inline !important; margin-left:7px !important; font-size:0.6em !important; } \
.vsh.nyc_opening .vsc:hover .vspii, \
.vsh.nyc_open .vsc:hover .vspii, \
.vso .vspii { border-colör:#ccc !important; } \
.vspii .vspiic, .vsh .vspib:focus .vspiic { opacity:1 !important; } \
div.vspib { padding-right:9px !important; -webkit-transition:padding-right .2s ease; } \
.nyc_open .vso .vspib, .nyc_opening .vso .vspib, \
.nyc_open .vso .vsta .vspib, .nyc_opening .vso .vsta .vspib { padding-right:0px !important; margin-right:-8px !important; } \
.nyc_open .sld .vso .vspib, .nyc_opening .sld .vso .vspib { padding-right:0px !important; border:solid 1px cyan !important; } \
.s { max-width:100% !important; } \
.s .st { width:75% !important; } \
.ksb { height:auto !important; } \
.luzb { width:auto !important; } \
.vsc span[style~='float:left'] { float:right !important; } \
.vsc div[style~='width:160px'] { width:auto !important; } \
.w { cursor:default !important; font-size: large !important; } \
.ts td[width='112'] { width:25% !important; } \
.mslg .vsc .vspib { left:100% !important; } \
.mslg .vsc, .tbbc { width:84% !important; margin-right:1em !important; } \
.tsnip td { line-height: 1em !important; } \
.intrlu { margin-top: 10px !important; margin-left: -10px !important; } \
table.tsnip td, table.tsnip th { line-height:1.1em !important; } \
.g#produkctbox { margin-right:0px !important; } \
#rhs #mbEnd, #tads, #tadsto, #tadsb { width:auto !important; opacity:0.3 !important; }";
$.rule(cssText).appendTo('style');

var inc = 420;
function incAttr(rule, inc, attr, prio) {
    var value = parseInt($.rule(rule).attr('style').getPropertyValue(attr));
    if (0 && isNaN(value))
      alert(rule+"->"+attr+" = ("+typeof(value)+") "+value);
    else
      $.rule(rule+'{ '+attr+':'+(value+inc)+'px '+prio+'; }').appendTo('style');
}

if ($('#leftnav li.msel:first-child:first').length) {
    $('.mw').css({'max-width': '100% !important'});
}
incAttr('#cnt #center_col, #cnt #foot, #cnt .ab_center_col', inc, 'width', '!important');
incAttr('#nyc', inc, 'margin-left', '!important');

incAttr('.mdm #nyc', inc, 'margin-left', '!important');
incAttr('.big #nyc', inc, 'margin-left', '!important');
incAttr('#rhs', inc, 'margin-left', '!important');
incAttr('.mdm #rhs', inc, 'margin-left', '!important');
incAttr('.big #rhs', inc, 'margin-left', '!important');

// kill the click tracking URL rewriting!
$('a[onmousedown^="return rwt"]').removeAttr('onmousedown');

// expand search options
$('.ms:not(".open") .msm').click();
if ($('#tbd .tbt[style*="0px"]').length) {
    $('#tbpi .tbpc').click();
}

// add favicons
$('h3.r a').each(function() {
    $(this).css({
        'background': "url(https://www.google.com/s2/u/0/favicons?domain=" + this.hostname + ") 10px 45% no-repeat",
        'padding-left': '35px',
        'padding-right': '10px',
        "margin-left": "-35px"
    });
});