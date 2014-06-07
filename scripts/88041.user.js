// ==UserScript==
// @name           Reddit Comments Back Button Support
// @namespace      reddit
// @include        http://www.reddit.com/r/*
// @include        http://www.reddit.com/comments/*
// ==/UserScript==

var oldHideComment = unsafeWindow.hidecomment;
var oldShowComment = unsafeWindow.showcomment;
var $ = unsafeWindow.$;
var jQuery = unsafeWindow.jQuery;

/*
 * jQuery BBQ: Back Button & Query Library - v1.2.1 - 2/17/2010
 * http://benalman.com/projects/jquery-bbq-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,p){var i,m=Array.prototype.slice,r=decodeURIComponent,a=$.param,c,l,v,b=$.bbq=$.bbq||{},q,u,j,e=$.event.special,d="hashchange",A="querystring",D="fragment",y="elemUrlAttr",g="location",k="href",t="src",x=/^.*\?|#.*$/g,w=/^.*\#/,h,C={};function E(F){return typeof F==="string"}function B(G){var F=m.call(arguments,1);return function(){return G.apply(this,F.concat(m.call(arguments)))}}function n(F){return F.replace(/^[^#]*#?(.*)$/,"$1")}function o(F){return F.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/,"$1")}function f(H,M,F,I,G){var O,L,K,N,J;if(I!==i){K=F.match(H?/^([^#]*)\#?(.*)$/:/^([^#?]*)\??([^#]*)(#?.*)/);J=K[3]||"";if(G===2&&E(I)){L=I.replace(H?w:x,"")}else{N=l(K[2]);I=E(I)?l[H?D:A](I):I;L=G===2?I:G===1?$.extend({},I,N):$.extend({},N,I);L=a(L);if(H){L=L.replace(h,r)}}O=K[1]+(H?"#":L||!K[1]?"?":"")+L+J}else{O=M(F!==i?F:p[g][k])}return O}a[A]=B(f,0,o);a[D]=c=B(f,1,n);c.noEscape=function(G){G=G||"";var F=$.map(G.split(""),encodeURIComponent);h=new RegExp(F.join("|"),"g")};c.noEscape(",/");$.deparam=l=function(I,F){var H={},G={"true":!0,"false":!1,"null":null};$.each(I.replace(/\+/g," ").split("&"),function(L,Q){var K=Q.split("="),P=r(K[0]),J,O=H,M=0,R=P.split("]["),N=R.length-1;if(/\[/.test(R[0])&&/\]$/.test(R[N])){R[N]=R[N].replace(/\]$/,"");R=R.shift().split("[").concat(R);N=R.length-1}else{N=0}if(K.length===2){J=r(K[1]);if(F){J=J&&!isNaN(J)?+J:J==="undefined"?i:G[J]!==i?G[J]:J}if(N){for(;M<=N;M++){P=R[M]===""?O.length:R[M];O=O[P]=M<N?O[P]||(R[M+1]&&isNaN(R[M+1])?{}:[]):J}}else{if($.isArray(H[P])){H[P].push(J)}else{if(H[P]!==i){H[P]=[H[P],J]}else{H[P]=J}}}}else{if(P){H[P]=F?i:""}}});return H};function z(H,F,G){if(F===i||typeof F==="boolean"){G=F;F=a[H?D:A]()}else{F=E(F)?F.replace(H?w:x,""):F}return l(F,G)}l[A]=B(z,0);l[D]=v=B(z,1);$[y]||($[y]=function(F){return $.extend(C,F)})({a:k,base:k,iframe:t,img:t,input:t,form:"action",link:k,script:t});j=$[y];function s(I,G,H,F){if(!E(H)&&typeof H!=="object"){F=H;H=G;G=i}return this.each(function(){var L=$(this),J=G||j()[(this.nodeName||"").toLowerCase()]||"",K=J&&L.attr(J)||"";L.attr(J,a[I](K,H,F))})}$.fn[A]=B(s,A);$.fn[D]=B(s,D);b.pushState=q=function(I,F){if(E(I)&&/^#/.test(I)&&F===i){F=2}var H=I!==i,G=c(p[g][k],H?I:{},H?F:2);p[g][k]=G+(/#/.test(G)?"":"#")};b.getState=u=function(F,G){return F===i||typeof F==="boolean"?v(F):v(G)[F]};b.removeState=function(F){var G={};if(F!==i){G=u();$.each($.isArray(F)?F:arguments,function(I,H){delete G[H]})}q(G,2)};e[d]=$.extend(e[d],{add:function(F){var H;function G(J){var I=J[D]=c();J.getState=function(K,L){return K===i||typeof K==="boolean"?l(I,K):l(I,L)[K]};H.apply(this,arguments)}if($.isFunction(F)){H=F;return G}else{H=F.handler;F.handler=G}}})})(jQuery,this);
/*
 * jQuery hashchange event - v1.2 - 2/11/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,i,b){var j,k=$.event.special,c="location",d="hashchange",l="href",f=$.browser,g=document.documentMode,h=f.msie&&(g===b||g<8),e="on"+d in i&&!h;function a(m){m=m||i[c][l];return m.replace(/^[^#]*#?(.*)$/,"$1")}$[d+"Delay"]=100;k[d]=$.extend(k[d],{setup:function(){if(e){return false}$(j.start)},teardown:function(){if(e){return false}$(j.stop)}});j=(function(){var m={},r,n,o,q;function p(){o=q=function(s){return s};if(h){n=$('<iframe src="javascript:0"/>').hide().insertAfter("body")[0].contentWindow;q=function(){return a(n.document[c][l])};o=function(u,s){if(u!==s){var t=n.document;t.open().close();t[c].hash="#"+u}};o(a())}}m.start=function(){if(r){return}var t=a();o||p();(function s(){var v=a(),u=q(t);if(v!==t){o(t=v,u);$(i).trigger(d)}else{if(u!==t){i[c][l]=i[c][l].replace(/#.*/,"")+"#"+u}}r=setTimeout(s,$[d+"Delay"])})()};m.stop=function(){if(!n){r&&clearTimeout(r);r=0}};return m})()})(jQuery,this);

$(unsafeWindow).bind('hashchange', function(evt) {
    if(!triggerHashChange) {
        triggerHashChange = true;
        return;
    }
    uncollapseThings();
    restoreState();
});

function kpsm() {
    this.items = [];
}
kpsm.prototype.add = function(id) {
    if(!this.contains(id)) {
        this.items.push(id);
    }
}
kpsm.prototype.remove = function(id) {
    if(this.contains(id)) {
        this.items.splice(this.items.indexOf(id), 1);
    }
}
kpsm.prototype.contains = function(id) {
    return this.items.indexOf(id) != -1;
}

var hideItems = new kpsm();
var showItems = new kpsm();

var triggerHashChange = true;

unsafeWindow.hidecomment = function(elem) {
    var t = $(elem).thing();
    var id = t.thing_id();
    if(showItems.contains(id)) {
        showItems.remove(id);  
    }
    hideItems.add(id);
    saveState();
    return oldHideComment(elem);
};

unsafeWindow.showcomment = function(elem) {
    var t = $(elem).thing();
    var id = t.thing_id();
    if(hideItems.contains(id)) {
        hideItems.remove(id);  
    }
    showItems.add(id);
    saveState();
    return oldShowComment(elem);
};

function saveState() 
{
    var parts = [];
    if(hideItems.items.length > 0) {
        parts.push('h=' + hideItems.items.join(','));
    }
    if(showItems.items.length > 0) {
        parts.push('s=' + showItems.items.join(','));
    }
    triggerHashChange = false;
    location.hash = parts.join('&');
}

var fn = function(str, lst) {
    var idz = str.split(',');
    for(var n in idz) {
        if(idz[n].length < 1) {
            continue;
        }
        lst.add(idz[n]);
    }
};
    
function restoreState()
{   
    hideItems.items = [];
    showItems.items = [];
    
    var items = getItemsFromUrl(location.hash);

    hideItems = items.hideItems;
    showItems = items.showItems;
    
    for(var n in hideItems.items) {
        var elem = unthing(hideItems.items[n]);
        hidecomment2(elem);
    }
    for(var n in showItems.items) {
        var elem = unthing(showItems.items[n]);
        showcomment2(elem);
    }
}

function getPartsFromUrl(turl)
{
    var url = turl || '#';
    url = url.substr(1);
    
    var parts = [];
    if(url.indexOf('&') != -1) {
        parts = url.split('&');
    } else {
        parts.push(url);
    }
    return parts;
}

function getItemsFromUrl(turl)
{
    var parts = getPartsFromUrl(turl);
    
    var strHideItems = '';
    var strShowItems = '';
    
    for(var n in parts) {
        var str = parts[n];
        if(str.length < 1) {
            continue;
        }
        if(str.substr(0, 1) == 'h') {
            strHideItems = str.substr(2);
        }
        else if(str.substr(0, 1) == 's') {
            strShowItems = str.substr(2);
        }
    }
    
    var lHideItems = new kpsm();
    var lShowItems = new kpsm();
    
    fn(strHideItems, lHideItems);
    fn(strShowItems, lShowItems);
    
    return {
        hideItems: lHideItems,
        showItems: lShowItems
    };
}

function uncollapseThings()
{
    $(".collapsed[style='']").each(function() { 
        oldShowComment(this);
    });
}

function hidecomment2(elem) {
    var t = $(elem).thing();
    t.hide().find(".noncollapsed:first, .midcol:first").hide().end().show().find(".entry:first .collapsed").show();
    if (t.hasClass("message")) {
        $.request("collapse_message", {
            "id": $(t).thing_id()
        });
    } else {
        t.find(".child:first").hide();
    }
    return false;
}

function showcomment2(elem) {
    var t = $(elem).thing();
    t.find(".entry:first .collapsed").hide().end().find(".noncollapsed:first, .midcol:first").show().end().show();
    if (t.hasClass("message")) {
        $.request("uncollapse_message", {
            "id": $(t).thing_id()
        });
    } else {
        t.find(".child:first").show();
    }
    return false;
}

function unthing(id) {
    return $('.id-' + id).children()[0];
}

$(document).ready(function() {
    restoreState();
});