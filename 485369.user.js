// ==UserScript==
// @author   	CB
// @name        [CB] FM_orders
// @version		1.3
// @include		http://www.erepublik.com/*
// @description ERPK FM_orders by CB
// @grant    GM_getValue
// @grant    GM_setValue
// @grant    GM_deleteValue
// @downloadURL http://userscripts.org/scripts/source/171276.user.js
// @updateURL	http://userscripts.org/scripts/source/171276.meta.js
// ==/UserScript==

var e=!1;
function g(c){function f(b,a){if("object"==typeof a){for(var d in a)if(f(b,a[d]))return!0;return e}return"string"==typeof a&&"string"==typeof b&&-1<b.indexOf(a)}c.fn.l=function(){return 0<c(this).length};var h=document.URL.split("?")[0].split("#")[0],n="http://www.erepublik.com/"+h.split("erepublik.com/")[1].split("/")[0],j={set:function(b,a){if(null===a)return j.f(b);localStorage.setItem("orders__"+b,"object"==typeof a?JSON.stringify(a):a)},k:function(a){return"undefined"!=typeof localStorage["orders__"+a]},
get:function(a,c){var d=localStorage.getItem("orders__"+a);if(null!==d){if("false"==d)return e;if("true"==d)return!0;try{d=JSON.parse(d)}catch(f){}}return d||c||null},f:function(a){if(f(a,"*")){a=a.replace("*","");for(var c=0;c<localStorage.length;c++){var d=localStorage.key(c);f(d,a)&&localStorage.removeItem(d)}}else localStorage.removeItem("orders__"+a)}};if(h==n)var a={title:"FM Orders",id:"FM_Orders",d:"0AhDp8qaIzboadHcyQ3p0eU1SeTdwVWxjbkh1b2FhWVE",g:function(){a.show()},a:e,b:{message:e,h:e,
i:e,c:0},e:9E5,get:function(){if(a.a)return a.show();var b=j.get(a.id,a.b);if(b&&b.c&&b.c+a.e>(new Date).getTime())return a.a=b,a.show();c.ajax({url:"https://docs.google.com/spreadsheet/pub?key="+a.d+"&single=true&output=txt",async:!0,global:e,dataType:"json",success:function(b){var d=e;if(b)return d=a.b,c.extend(d,b),d.ts=(new Date).getTime(),j.set(a.id,JSON.stringify(d)),a.a=d,a.show()}});return!0},show:function(){if(!a.a)return a.get();if(a.a.message||a.a.battle_id){var b=c("#orders_"+a.id);if(1>
b.length){var b=document.createElement("div"),f=document.getElementById("content").getElementsByClassName("column")[0];f.insertBefore(b,f.firstChild);b.id="orders_"+a.id;b.className="boxes order_of_day";b.innerHTML="<h1>"+a.title+'</h1><div><strong>Fight for Iran in Balochistan</strong><a href="javasctipt:;" class="blue_beauty"><q>Battlefield</q></a></div>';b=c(b)}a.a.message&&b.find("strong").text(a.a.message);a.a.battle_id?b.find("a").attr("href",a.a.battle_link):b.find("a").hide()}}};"undefined"!=
typeof a&&h==n&&a.g()}
if("undefined"!=typeof unsafeWindow&&"undefined"!=typeof unsafeWindow.jQuery)g(unsafeWindow.jQuery);else{var k=document,l=k.createElement("script"),m=k.getElementsByTagName("head")[0],p="__"+Math.random().toString(36).substr(2,16);k.body.addEventListener(p,function(c){c.currentTarget.removeEventListener(p,arguments.callee,e);null!==c.detail&&("object"===typeof c.detail&&"function"==typeof c.detail.j)&&g(c.detail.j)},e);l.type="text/javascript";l.textContent="(function(){var a=document.createEvent('CustomEvent');a.initCustomEvent('"+p+
"',false,false,{w:window,j:jQuery});document.body.dispatchEvent(a)})()";m.appendChild(l);m.removeChild(l)};