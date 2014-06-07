// ==UserScript==
// @name           MOFA.CC share
// @namespace      http://t.163.com/rok
// @description    MOFA.CC搞笑图新浪微博看图分享插件
// @version        1.13
// @author         forumz
// @include        http://t.sina.com.cn/*
// @include        http://weibo.com/*
// @include        http://www.weibo.com/*
// @include        http://*.weibo.com/*
// @exclude        http://game.weibo.com/*
// @exclude        http://weibo.com/app/*
// @exclude        http://weibo.com/app
// @exclude        http://talk.weibo.com/*
// @updateinfo     发布日期 2012-04-05|# 修正当图片框为相对固定时拖动图片框后变成不固定的问题
// ==/UserScript==

//version for auto update
var tsinam_version = "1.13";
var t_rdate = "2012-04-05";

GM_addStyle('#tsinam_more{margin:0;padding-right:10px;cursor:pointer;float:right}ul.t_topnav{list-style:none;padding:0;margin:0}ul.t_topnav li{clear:none;width:auto;float:left;margin:0;padding:0 2px 0 2px;positoin:relative;background:none !important}ul.t_topnav li a{padding:0 3px 0 3px;cursor:pointer;text-decoration:none;outline:none;-moz-border-radius:3px;-webkit-border-radius:3px}#tsinam_imgframed{padding:10px 10px 25px 10px;background:#f0f0f0;border:1px solid #fff;-moz-box-shadow:2px 5px 15px #333;-webkit-box-shadow:2px 5px 15px #333}#tsinam_imgarea{position:relative}.t_imgtitle{padding-bottom:5px;text-align:right;lineHeight:10px;display:none}.t_imgtitle li{float:none !important}.t_imginfo{padding-top:10px;text-align:center;font-size:1.2em}.t_imginfo a{text-decoration:none}.t_imginfo a.t_imgbtn{font-size:0.8em}.t_imgurl{cursor:pointer;font-size:0.8em}.t_imgurl a{color:#0080c0}.t_turnsign{cursor:pointer;text-decoration:none;outline:none;opacity:0.6}.t_turnsign:hover{opacity:0.9}#tsinam_turnspan{position:absolute;z-index:99;left:10px;top:10px;display:none}#tsinam_zoomspan{position:absolute;z-index:99;left:10px;top:36px;display:none}.t_chat_frame{width:850px;height:650px;border:0}.t_chat_div{padding:5px 0 5px 0;background:#f0f0f0;border:1px solid #fff;-moz-box-shadow:2px 5px 15px #333;-moz-border-radius:10px;-webkit-box-shadow:2px 5px 15px #333;-webkit-border-radius:10px;width:870px;height:650px}.t_showframe{padding:10px 10px 10px 10px;background:#f0f0f0;border:1px solid #fff;-moz-box-shadow:2px 5px 15px #333;-moz-border-radius:10px;-webkit-box-shadow:2px 5px 15px #333;-webkit-border-radius:10px}#tsinam_rtjddiv{width:650px;height:437px}#tsinam_setdiv{width:600px;height:295px}.t_setdiv{background:#fcfcfc;width:100%;height:100%}.t_set_tb{font-family:"Lucida Sans Unicode","Lucida Grande",Sans-Serif !important;font-size:12px !important;text-shadow:none !important;border-collapse:collapse !important;margin:0 !important;width:95%;line-height:120%}.t_set_tb thead td{background:#0080c0;color:#fff;border:none !important;padding:4px 8px 4px !important;-moz-border-radius-topleft:10px;-moz-border-radius-topright:10px;-webkit-border-top-left-radius:10px;-webkit-border-top-right-radius:10px}.t_set_tb th,.t_set_tb td{padding:8px;background:#e8edff;border:none !important;border-top:2px solid #fcfcfc !important;color:#669;line-height:1.1em !important}.t_set_tb td input,.t_set_tb td textarea{font-size:12px !important;padding:0 !important}.t_set_tb tbody tr:hover th,.t_set_tb tbody tr:hover td{background:#d0dafd}.t_set_tb tfoot td{-moz-border-radius-bottomleft:10px;-moz-border-radius-bottomright:10px;-webkit-border-bottom-left-radius:10px;-webkit-border-bottom-right-radius:10px}.t_set_ft{font-family:Arial,sans-serif,宋体 !important;font-size:12px !important;font-weight:bold !important;text-shadow:none !important;margin-top:15px !important}.t_set_ft a{text-decoration:none;color:#000}.t_setbtn{border:1px solid black;padding:2px;cursor:pointer;background:#fff;color:#0080c0}.t_setftbtn span{padding:2px 10px 2px 10px !important}.t_rtjdbtn{background:#0080c0 !important;color:#fff !important}.t_rtjdtxtpos{padding-top:5px}.t_rtjdchk{vertical-align:middle;margin-top:-2px;margin-bottom:1px}#tsinam_rthint{font-family:Arial,sans-serif,宋体 !important;font-size:16px !important;font-weight:bold;padding:5px 10px 5px 10px;position:fixed;top:20px;-moz-border-radius:5px;-webkit-border-radius:5px;display:inline-block;opacity:0.7}.t_rthint_n{color:#fff !important;background:#000 !important}.t_rthint_f{background:#880000 !important;color:#ffffdd !important}.t_jchkbox{display:inline;font-size:20px;line-height:15px;padding-right:4px;cursor:pointer;cursor:hand}.t_jchkbox .mark{display:inline}.t_jchkbox img{vertical-align:middle;width:45px;height:15px}.t_jchkbox img{background:transparent url("data:image/png;base64,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") no-repeat}.t_jchkbox img{background-position:0 0}.t_jchkbox-hover img{background-position:0 -15px}.t_jchkbox-checked img{background-position:0 -30px}.t_jchkbox-checked .t_jchkbox-hover img{background-position:0 -45px}.t_jchkbox-disabled img{background-position:0 -60px}.t_jchkbox-checked .t_jchkbox-disabled img{background-position:0 -75px}.t_jradbox{display:inline;font-size:16px;line-height:16px;padding-right:3px;cursor:pointer;cursor:hand}.t_jradbox .mark{display:inline}.t_jradbox img{vertical-align:middle;width:16px;height:16px}.t_jradbox img{background:transparent url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAABACAMAAABMUIWcAAAAA3NCSVQICAjb4U/gAAABoVBMVEX////7+/v5+fn4+Pj39/f29vb19fX09PTz8/Py8vPx8fHw8PDv7+/u7u7t7e3s7Ozq6uro6Ojm5ubl5eXk5OTi4uLg4ODf39+26vXb2/zb2/3a2v3c3NzZ2fbZ2fjI3vTY2NjX1/LX19fU1ebU1NTT09PQ0NDOzs6k2PCh1v+x0fHKysrIyMiqzfDGxsbCwsLAwMCWyO6lw+G9vb2Nw/i6urqZwNabv+K4uLi3t7eYu920tLSzs7ODu/SysrKEtuisrKyIstyLstJ3su6mpqZ+rNt/p890qONrquiKo8hup9+cnJxkpOVuoNJfoeRunMlindhZneGTk5ORkZpTmd9RlttVldSLi4uLi5N8jZ5yi76GhpRZjsSGhoZ9h5N/gbZMjtBgiLGCgoqBgYFXh71Gis5/f397e3t7e4I+hMpleY11dXVLea9YeJlwcHBMcJQ1csNpaWlBb5xoaG5jY2NCZIY0ZZZYWZ4rY7ZLXJ9PUphUVFRHVWQkWKwhT6VATFkbRZw0RFUWOJIiNkkWJjcXGBoTFSAUFRYOERUJDBEBAQEtwLhRAAAACXBIWXMAAAsSAAALEgHS3X78AAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA4tWjSeAAAAu1JREFUSInNlGtXElEUhimssIsIhIXUigydbBRJwCDESjAvqCEqYxeQRAZR85KXMMW4mMH51Z19Zk/M4Uvap561hrXemWctDnu/jM7+F3QXEBzza8i8A245VvaQFQcTVlw6ZGAJhLVgGzKyxoR94Toi7oJw7L+HDB8zYUu8iYhbNsp+0IEE9202nc22IRgRIQfCbqAbCewyISN0IUIShC2/G/FvMEHq7kC6JRByvj7EJzMh7jQhzjgIGU8P4kkyIdqlHtIRBUFyq4d0S0yIWNQ5mCMgxIU7iBBVziAaECEOc5B8VsQnsTmIuQ0kJ4LAZ1iW4QFiUPbD5Ytss8HSzz17c9YKAql3aZ8/JvWHIDxZ/qZwTj6yB8vfFWqQqXA0+YiRIudH8PzowyBjnWUqVOaeAYM1slkBoZJ9A7ytk8MKE0qLP8rv+/tPyMliCSZZyZerX8bGyqScr7BJni6sk9rLSfLrxcIpCKX8Aam/+0xqM/kSE4pzs2ekeka+zs4VmZBNs3yYzipCYW4iViekOjExWwDhNJtYhZxIZE8VYTYc3ib1mXBYEYrpWIx+yadYLF1kws50KBSqbtOP6R0QCompqanqAf1IFJiwGurt7X1Or97QKgib416v9xW9vOObTEgN3UeGUjCH1OhTZDR1wT7Y1f23NvWh9dJ9+FfB6BtBfEa4xWcqBK3q/8IaBIHPVBgxXUEsTOAzFQIWPWL2d1L4rOvs9JiuIWYPCHymgtukvkBMAyDwmQou0y3E5AKBz1QQ228g7SIIfKaCYFQPZewBgc9U6DGov9vgBIHPcAbLVcTcB3PgM52DxeNDPBYQ+AzL0quvHL2yHy5fbt0BKWJvzlrBnMm025uztg+SHOD6wLKmD4Ic5/qg5EYfDFJG0PYBM/TB+jri1OuH5RHsA5dZH1yy1NaRkW6rfdBmpQ9RORKVxUYfNFnpw92kLEc0fdBk7IMoJ03aPjSy2oeIi+/Dn6z2oaWpDy3/Ux9+AyHcPO1jtxhjAAAAAElFTkSuQmCC") no-repeat}.t_jradbox img{background-position:0 0}.t_jradbox-hover img{background-position:-16px 0}.t_jradbox-checked img{background-position:0 -16px}.t_jradbox-checked .t_jradbox-hover img{background-position:-16px -16px}.t_jradbox-disabled img{background-position:0 -32px}.t_jradbox-checked .t_jradbox-disabled img{background-position:0 -48px}#tmo_updatediv{width:400px;height:305px}.t_upbtn{background:#0080c0 !important;color:#fff !important}.t_upinfo{height:120px !important;vertical-align:text-top !important}#tmo_updatediv th{border-right:2px solid #fcfcfc !important}#tmo_updatediv tfoot td{border:none !important;border-top:2px solid #fcfcfc !important;font-family:Arial,sans-serif,宋体 !important;font-size:12px !important;font-style:normal !important;text-shadow:none !important}#tsinam_imgloading{-moz-user-select:none}.t_imgprev{height:100%;left:0;position:absolute;top:0;width:15%}.t_imgprev span{opacity:0.6;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAl5JREFUSEutlruLGlEUxlXsts+/42NRRMUIVoIIFtaWIhYWNna6YGETsRPL4GNjzEYsNIngKspqwLeiruL7kR0fmZt7BibVjnNn2QMfDIN+vzmPO2fEIhwqlermcrl8pGn6ViwWf4B7bw2E0EwikTxIpdLPmUzmwJjLZLI7uVweJ5VCoYhXKpVnv99f4voPeIK3CF+YSY3Z30UikRrOGK1WK8rj8fy8AjED4JMQQCAQeDydTuh8PjOCa7fbXXjNA7xFQsxdLld+v9//BVPQ8XhEsVjst1qtTnL5EAPsdnt2uVyeKIpCrNLpdBf6ce0hiQBGo/HLeDz+gwOxyufzIz5zAPMCNBpNqtForA+HA8LlYVQqlWYk5kSAQqEw2e12aLvdMgKYwWC4J+3d1QySyWR3vV6jzWbDqNVq7aFcpOZXMwiHw0+4qTDrjEaj0REaLcScE4CfvLdYLBAAQL1e78Vms30Xas4JwOM3mM/niFWn03mxWCzf3g2gVCoTuESN2WyGWLXbbcpqtT4IhXA2GY9hAkd/Op0iVtVqdavT6YgniHdMAZLL5aaTyQSxKhaLK61WmyLNhPeg6fX6+3K5vMFTBJPEKJvNPr8bAIxMJtPXer1ODYdDBOr3+3Q8Hh+SQHgzYE3wGcg1m83LYDBAIDy6dDQabfNBiAFg5HQ6f+DTTOMMIAvU7XbpUChUh6njfF0LWTjQdJ/PV8bnArHC44scDkf+NQCzcISuTIAEg8EnMK7Vake8hH7BPQ6A+a1LP5FKpaZer/eR67X9f+mzny2QiZBycdUcPMCL+aLA8Q+BA/3CSVjHCgAAAABJRU5ErkJggg==") no-repeat scroll 0 0 transparent;position:absolute;width:24px;height:24px;top:50%;margin-top:-12px;left:6px;display:none}.t_imgnext{height:100%;right:0;position:absolute;top:0;width:15%}.t_imgnext span{opacity:0.6;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAmlJREFUSEutlruLGlEUh1Xs0uff8RFUUDGi1YJYKbZ2Cgo2FnYiWFgYLS2sgm6MMRsjuG4QNoqyivh+xdX4wOf6ytzcMzBhCY6O7l74wTDOfJ/3nnO5w2bhIRKJ3uz3+/cEQbxjs9lv4d6lAyE04HA4N1wu92MsFluScB6P5+Lz+aFDcblc99ls9pHud7r7wAQ2C19c0T1ks9l+TCaT9W63I/x+f/4CyRUIPhx60Wq1pjAYUdlsNoTT6bw/RwJsFt0LYrH4OhgMljAYbbdbMvP5/I/ZbL49R0IrAIhAIAjjQtXX6zWiMhqNNjqd7htTyVEBJUmlUr9WqxWi0ul0lgqFIsJEclJASTKZzO/FYoEgy+USFYvFiUQiuT4lYSQAiFKp/Fwqlaaz2QxRSSaTvVcTAEilUkWr1epiOp0iCG5hIhwO149JGM+AghgMhu/dbneL4SBAuOiE1+t9oJOcLQAQ7qJ4s9l8Go/HCDIcDolQKNQ4JLlIoNFovtZqtScMBjiZaDTaehWBVqu9wXVYDwYDRMXn8xWFQmH4xQKZTBbJ5XKzfr+PqOAiN2FDvrgGUqn0UzqdnvR6PUQlkUj0j8FByrgG8Xj8EXcPooI33lQul5/czYwEuEPauGuIdruNIIVCYa1Wq7+c2mSMZhAIBKqNRoNotVoIUi6X93q9PsEEflQAXeHxeAr1ep3A/x5BKpUKYTKZ7pjCSQHdgWM0Gm9xr6PncTgcmVNFfS4nDxy6IxNmYLFY0vl8foP7Hrnd7odz4CAC9tFDH4B2u/1nJBI52Y7/L9u/Q5/6bAEb3XKds+bAABb5RYHHX6xg/dZ/kVfVAAAAAElFTkSuQmCC") no-repeat scroll 0 0 transparent;position:absolute;width:24px;height:24px;top:50%;margin-top:-12px;right:5px;display:none}.t_txtshow{text-align:center;background:#0080c0;color:#f0f0f0;-moz-user-select:none}.t_loadshow{padding:5px !important;font-size:1.1em;line-height:1.2em}.t_frshow{padding:5px !important;font-size:1.5em;line-height:1.7em}@media screen and (-webkit-min-device-pixel-ratio:0){#tsinam_rtjddiv{height:417px}#tsinam_setdiv{height:295px}#tmo_updatediv{height:315px}}');

/*! jQuery v1.7.1 jquery.com | jquery.org/license */
(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cv(a){if(!ck[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){cl||(cl=c.createElement("iframe"),cl.frameBorder=cl.width=cl.height=0),b.appendChild(cl);if(!cm||!cl.createElement)cm=(cl.contentWindow||cl.contentDocument).document,cm.write((c.compatMode==="CSS1Compat"?"<!doctype html>":"")+"<html><body>"),cm.close();d=cm.createElement(a),cm.body.appendChild(d),e=f.css(d,"display"),b.removeChild(cl)}ck[a]=e}return ck[a]}function cu(a,b){var c={};f.each(cq.concat.apply([],cq.slice(0,b)),function(){c[this]=a});return c}function ct(){cr=b}function cs(){setTimeout(ct,0);return cr=f.now()}function cj(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ci(){try{return new a.XMLHttpRequest}catch(b){}}function cc(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function cb(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function ca(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bE.test(a)?d(a,e):ca(a+"["+(typeof e=="object"||f.isArray(e)?b:"")+"]",e,c,d)});else if(!c&&b!=null&&typeof b=="object")for(var e in b)ca(a+"["+e+"]",b[e],c,d);else d(a,b)}function b_(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function b$(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bT,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=b$(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=b$(a,c,d,e,"*",g));return l}function bZ(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bP),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bC(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?bx:by,g=0,h=e.length;if(d>0){if(c!=="border")for(;g<h;g++)c||(d-=parseFloat(f.css(a,"padding"+e[g]))||0),c==="margin"?d+=parseFloat(f.css(a,c+e[g]))||0:d-=parseFloat(f.css(a,"border"+e[g]+"Width"))||0;return d+"px"}d=bz(a,b,b);if(d<0||d==null)d=a.style[b]||0;d=parseFloat(d)||0;if(c)for(;g<h;g++)d+=parseFloat(f.css(a,"padding"+e[g]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+e[g]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+e[g]))||0);return d+"px"}function bp(a,b){b.src?f.ajax({url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)}function bo(a){var b=c.createElement("div");bh.appendChild(b),b.innerHTML=a.outerHTML;return b.firstChild}function bn(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)}function bm(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bk(a,b){var c;if(b.nodeType===1){b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase();if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(f.expando)}}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c+(i[c][d].namespace?".":"")+i[c][d].namespace,i[c][d],i[c][d].data)}h.data&&(h.data=f.extend({},h.data))}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function U(a){var b=V.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function T(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(O.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function S(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function K(){return!0}function J(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?parseFloat(d):j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7.1",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.add(a);return this},eq:function(a){a=+a;return a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")}},bindReady:function(){if(!A){A=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a&&typeof a=="object"&&"setInterval"in a},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||D.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw new Error(a)},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(H)return H.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h){var i=a.length;if(typeof c=="object"){for(var j in c)e.access(a,j,c[j],f,g,d);return a}if(d!==b){f=!h&&f&&e.isFunction(d);for(var k=0;k<i;k++)g(a[k],c,f?d.call(a[k],k,g(a[k],c)):d,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?m(g):h==="function"&&(!a.unique||!o.has(g))&&c.push(g)},n=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,l=j||0,j=0,k=c.length;for(;c&&l<k;l++)if(c[l].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}i=!1,c&&(a.once?e===!0?o.disable():c=[]:d&&d.length&&(e=d.shift(),o.fireWith(e[0],e[1])))},o={add:function(){if(c){var a=c.length;m(arguments),i?k=c.length:e&&e!==!0&&(j=a,n(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){i&&f<=k&&(k--,f<=l&&l--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&o.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(i?a.once||d.push([b,c]):(!a.once||!e)&&n(b,c));return this},fire:function(){o.fireWith(this,arguments);return this},fired:function(){return!!e}};return o};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);return this},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var b,d,e,g,h,i,j,k,l,m,n,o,p,q=c.createElement("div"),r=c.documentElement;q.setAttribute("className","t"),q.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=q.getElementsByTagName("*"),e=q.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=q.getElementsByTagName("input")[0],b={leadingWhitespace:q.firstChild.nodeType===3,tbody:!q.getElementsByTagName("tbody").length,htmlSerialize:!!q.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:q.className!=="t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0},i.checked=!0,b.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,b.optDisabled=!h.disabled;try{delete q.test}catch(s){b.deleteExpando=!1}!q.addEventListener&&q.attachEvent&&q.fireEvent&&(q.attachEvent("onclick",function(){b.noCloneEvent=!1}),q.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),b.radioValue=i.value==="t",i.setAttribute("checked","checked"),q.appendChild(i),k=c.createDocumentFragment(),k.appendChild(q.lastChild),b.checkClone=k.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=i.checked,k.removeChild(i),k.appendChild(q),q.innerHTML="",a.getComputedStyle&&(j=c.createElement("div"),j.style.width="0",j.style.marginRight="0",q.style.width="2px",q.appendChild(j),b.reliableMarginRight=(parseInt((a.getComputedStyle(j,null)||{marginRight:0}).marginRight,10)||0)===0);if(q.attachEvent)for(o in{submit:1,change:1,focusin:1})n="on"+o,p=n in q,p||(q.setAttribute(n,"return;"),p=typeof q[n]=="function"),b[o+"Bubbles"]=p;k.removeChild(q),k=g=h=j=q=i=null,f(function(){var a,d,e,g,h,i,j,k,m,n,o,r=c.getElementsByTagName("body")[0];!r||(j=1,k="position:absolute;top:0;left:0;width:1px;height:1px;margin:0;",m="visibility:hidden;border:0;",n="style='"+k+"border:5px solid #000;padding:0;'",o="<div "+n+"><div></div></div>"+"<table "+n+" cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>",a=c.createElement("div"),a.style.cssText=m+"width:0;height:0;position:static;top:0;margin-top:"+j+"px",r.insertBefore(a,r.firstChild),q=c.createElement("div"),a.appendChild(q),q.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",l=q.getElementsByTagName("td"),p=l[0].offsetHeight===0,l[0].style.display="",l[1].style.display="none",b.reliableHiddenOffsets=p&&l[0].offsetHeight===0,q.innerHTML="",q.style.width=q.style.paddingLeft="1px",f.boxModel=b.boxModel=q.offsetWidth===2,typeof q.style.zoom!="undefined"&&(q.style.display="inline",q.style.zoom=1,b.inlineBlockNeedsLayout=q.offsetWidth===2,q.style.display="",q.innerHTML="<div style='width:4px;'></div>",b.shrinkWrapBlocks=q.offsetWidth!==2),q.style.cssText=k+m,q.innerHTML=o,d=q.firstChild,e=d.firstChild,h=d.nextSibling.firstChild.firstChild,i={doesNotAddBorder:e.offsetTop!==5,doesAddBorderForTableAndCells:h.offsetTop===5},e.style.position="fixed",e.style.top="20px",i.fixedPosition=e.offsetTop===20||e.offsetTop===15,e.style.position=e.style.top="",d.style.overflow="hidden",d.style.position="relative",i.subtractsBorderForOverflowNotVisible=e.offsetTop===-5,i.doesNotIncludeMarginInBodyOffset=r.offsetTop!==j,r.removeChild(a),q=a=null,f.extend(b,i))});return b}();var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[j]:a[j]&&j,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[j]=n=++f.uuid:n=j),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[h]:h;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)||(b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h=null;if(typeof a=="undefined"){if(this.length){h=f.data(this[0]);if(this[0].nodeType===1&&!f._data(this[0],"parsedAttrs")){e=this[0].attributes;for(var i=0,j=e.length;i<j;i++)g=e[i].name,g.indexOf("data-")===0&&(g=f.camelCase(g.substring(5)),l(this[0],g,h[g]));f._data(this[0],"parsedAttrs",!0)}}return h}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split("."),d[1]=d[1]?"."+d[1]:"";if(c===b){h=this.triggerHandler("getData"+d[1]+"!",[d[0]]),h===b&&this.length&&(h=f.data(this[0],a),h=l(this[0],a,h));return h===b&&d[1]?this.data(d[0]):h}return this.each(function(){var b=f(this),e=[d[0],c];b.triggerHandler("setData"+d[1]+"!",e),f.data(this,a,c),b.triggerHandler("changeData"+d[1]+"!",e)})},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){typeof a!="string"&&(c=a,a="fx");if(c===b)return f.queue(this[0],a);return this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise()}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,a,b,!0,f.attr)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,a,b,!0,f.prop)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];{if(!!arguments.length){e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.nodeName.toLowerCase()]||f.valHooks[this.type];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}if(g){c=f.valHooks[g.nodeName.toLowerCase()]||f.valHooks[g.type];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}}}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!!a&&j!==3&&j!==8&&j!==2){if(e&&c in f.attrFn)return f(a)[c](d);if(typeof a.getAttribute=="undefined")return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g}},removeAttr:function(a,b){var c,d,e,g,h=0;if(b&&a.nodeType===1){d=b.toLowerCase().split(p),g=d.length;for(;h<g;h++)e=d[h],e&&(c=f.propFix[e]||e,f.attr(a,e,""),a.removeAttribute(v?e:c),u.test(e)&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]}},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/^(?:textarea|input|select)$/i,A=/^([^\.]*)?(?:\.(.+))?$/,B=/\bhover(\.\S+)?\b/,C=/^key/,D=/^(?:mouse|contextmenu)|click/,E=/^(?:focusinfocus|focusoutblur)$/,F=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G=function(a){var b=F.exec(a);b&&(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},H=function(a,b){var c=a.attributes||{};return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||(c.id||{}).value===b[2])&&(!b[3]||b[3].test((c["class"]||{}).value))},I=function(a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1")};f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=f.trim(I(c)).split(" ");for(k=0;k<c.length;k++){l=A.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:G(g),namespace:n.join(".")},p),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d,e){var g=f.hasData(a)&&f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;if(!!g&&!!(o=g.events)){b=f.trim(I(b||"")).split(" ");for(h=0;h<b.length;h++){i=A.exec(b[h])||[],j=k=i[1],l=i[2];if(!j){for(j in o)f.event.remove(a,j+b[h],c,d,!0);continue}p=f.event.special[j]||{},j=(d?p.delegateType:p.bindType)||j,r=o[j]||[],m=r.length,l=l?new RegExp("(^|\\.)"+l.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;for(n=0;n<r.length;n++)s=r[n],(e||k===s.origType)&&(!c||c.guid===s.guid)&&(!l||l.test(s.namespace))&&(!d||d===s.selector||d==="**"&&s.selector)&&(r.splice(n--,1),s.selector&&r.delegateCount--,p.remove&&p.remove.call(a,s));r.length===0&&m!==r.length&&((!p.teardown||p.teardown.call(a,l)===!1)&&f.removeEvent(a,j,g.handle),delete o[j])}f.isEmptyObject(o)&&(q=g.handle,q&&(q.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;if(E.test(h+f.event.triggered))return;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"";if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,m=E.test(s+h)?e:e.parentNode,n=null;for(;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length&&!c.isPropagationStopped();l++)m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d)===!1&&c.preventDefault();c.type=h,!g&&!c.isDefaultPrevented()&&(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=[],j,k,l,m,n,o,p,q,r,s,t;g[0]=c,c.delegateTarget=this;if(e&&!c.target.disabled&&(!c.button||c.type!=="click")){m=f(this),m.context=this.ownerDocument||this;for(l=c.target;l!=this;l=l.parentNode||this){o={},q=[],m[0]=l;for(j=0;j<e;j++)r=d[j],s=r.selector,o[s]===b&&(o[s]=r.quick?H(l,r.quick):m.is(s)),o[s]&&q.push(r);q.length&&i.push({elem:l,matches:q})}}d.length>e&&i.push({elem:this,matches:d.slice(e)});for(j=0;j<i.length&&!c.isPropagationStopped();j++){p=i[j],c.currentTarget=p.elem;for(k=0;k<p.matches.length&&!c.isImmediatePropagationStopped();k++){r=p.matches[k];if(h||!c.namespace&&!r.namespace||c.namespace_re&&c.namespace_re.test(r.namespace))c.data=r.data,c.handleObj=r,n=((f.event.special[r.origType]||{}).handle||r.handler).apply(p.elem,g),n!==b&&(c.result=n,n===!1&&(c.preventDefault(),c.stopPropagation()))}}return c.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?K:J):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=K;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=K;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=K,this.stopPropagation()},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c=this,d=a.relatedTarget,e=a.handleObj,g=e.selector,h;if(!d||d!==c&&!f.contains(c,d))a.type=e.origType,h=e.handler.apply(this,arguments),a.type=b;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){this.parentNode&&!a.isTrigger&&f.event.simulate("submit",this.parentNode,a,!0)}),d._submit_attached=!0)})},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;z.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return z.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=J;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on.call(this,a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.type+"."+e.namespace:e.type,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=J);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.on(b,null,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),C.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),D.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1||d===9){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var L=/Until$/,M=/^(?:parents|prevUntil|prevAll)/,N=/,/,O=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,Q=f.expr.match.POS,R={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(T(this,a,!1),"not",a)},filter:function(a){return this.pushStack(T(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?Q.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=Q.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(S(c[0])||S(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling(a.parentNode.firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c);L.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!R[a]?f.unique(e):e,(this.length>1||N.test(d))&&M.test(a)&&(e=e.reverse());return this.pushStack(e,a,P.call(arguments).join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var V="abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|style)/i,bb=/<(?:script|object|embed|option|style)/i,bc=new RegExp("<(?:"+V+")","i"),bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh=U(c);bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.text(a.call(this,b,c.text()))});if(typeof a!="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return f.text(this)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=f.isFunction(a);return this.each(function(c){f(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f.clean(arguments);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f.clean(arguments));return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!bg[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(var c=0,d=this.length;c<d;c++)this[c].nodeType===1&&(f.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(e){this.empty().append(a)}}else f.isFunction(a)?this.each(function(b){var c=f(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bi(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,bp)}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!bb.test(j)&&(f.support.checkClone||!bd.test(j))&&(f.support.html5Clone||!bc.test(j))&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d,e,g,h=f.support.html5Clone||!bc.test("<"+a.nodeName)?a.cloneNode(!0):bo(a);if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bk(a,h),d=bl(a),e=bl(h);for(g=0;d[g];++g)e[g]&&bk(d[g],e[g])}if(b){bj(a,h);if(c){d=bl(a),e=bl(h);for(g=0;d[g];++g)bj(d[g],e[g])}}d=e=null;return h},clean:function(a,b,d,e){var g;b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);var h=[],i;for(var j=0,k;(k=a[j])!=null;j++){typeof k=="number"&&(k+="");if(!k)continue;if(typeof k=="string")if(!_.test(k))k=b.createTextNode(k);else{k=k.replace(Y,"<$1></$2>");var l=(Z.exec(k)||["",""])[1].toLowerCase(),m=bg[l]||bg._default,n=m[0],o=b.createElement("div");b===c?bh.appendChild(o):U(b).appendChild(o),o.innerHTML=m[1]+k+m[2];while(n--)o=o.lastChild;if(!f.support.tbody){var p=$.test(k),q=l==="table"&&!p?o.firstChild&&o.firstChild.childNodes:m[1]==="<table>"&&!p?o.childNodes:[];for(i=q.length-1;i>=0;--i)f.nodeName(q[i],"tbody")&&!q[i].childNodes.length&&q[i].parentNode.removeChild(q[i])}!f.support.leadingWhitespace&&X.test(k)&&o.insertBefore(b.createTextNode(X.exec(k)[0]),o.firstChild),k=o.childNodes}var r;if(!f.support.appendChecked)if(k[0]&&typeof (r=k.length)=="number")for(i=0;i<r;i++)bn(k[i]);else bn(k);k.nodeType?h.push(k):h=f.merge(h,k)}if(d){g=function(a){return!a.type||be.test(a.type)};for(j=0;h[j];j++)if(e&&f.nodeName(h[j],"script")&&(!h[j].type||h[j].type.toLowerCase()==="text/javascript"))e.push(h[j].parentNode?h[j].parentNode.removeChild(h[j]):h[j]);else{if(h[j].nodeType===1){var s=f.grep(h[j].getElementsByTagName("script"),g);h.splice.apply(h,[j+1,0].concat(s))}d.appendChild(h[j])}}return h},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bq=/alpha\([^)]*\)/i,br=/opacity=([^)]*)/,bs=/([A-Z]|^ms)/g,bt=/^-?\d+(?:px)?$/i,bu=/^-?\d/,bv=/^([\-+])=([\-+.\de]+)/,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Left","Right"],by=["Top","Bottom"],bz,bA,bB;f.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return f.access(this,a,c,!0,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)})},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bz(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bv.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(bz)return bz(a,c)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]}}),f.curCSS=f.css,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){var e;if(c){if(a.offsetWidth!==0)return bC(a,b,d);f.swap(a,bw,function(){e=bC(a,b,d)});return e}},set:function(a,b){if(!bt.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return br.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bq,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bq.test(g)?g.replace(bq,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){var c;f.swap(a,{display:"inline-block"},function(){b?c=bz(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(bA=function(a,b){var c,d,e;b=b.replace(bs,"-$1").toLowerCase(),(d=a.ownerDocument.defaultView)&&(e=d.getComputedStyle(a,null))&&(c=e.getPropertyValue(b),c===""&&!f.contains(a.ownerDocument.documentElement,a)&&(c=f.style(a,b)));return c}),c.documentElement.currentStyle&&(bB=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f===null&&g&&(e=g[b])&&(f=e),!bt.test(f)&&bu.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f||0,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),bz=bA||bB,f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)});var bD=/%20/g,bE=/\[\]$/,bF=/\r?\n/g,bG=/#.*$/,bH=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bI=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bJ=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bK=/^(?:GET|HEAD)$/,bL=/^\/\//,bM=/\?/,bN=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bO=/^(?:select|textarea)/i,bP=/\s+/,bQ=/([?&])_=[^&]*/,bR=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bS=f.fn.load,bT={},bU={},bV,bW,bX=["*/"]+["*"];try{bV=e.href}catch(bY){bV=c.createElement("a"),bV.href="",bV=bV.href}bW=bR.exec(bV.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bS)return bS.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bN,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bO.test(this.nodeName)||bI.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bF,"\r\n")}}):{name:b.name,value:c.replace(bF,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.on(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?b_(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),b_(a,b);return a},ajaxSettings:{url:bV,isLocal:bJ.test(bW[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bX},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bZ(bT),ajaxTransport:bZ(bU),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?cb(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=cc(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bH.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bG,"").replace(bL,bW[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bP),d.crossDomain==null&&(r=bR.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bW[1]&&r[2]==bW[2]&&(r[3]||(r[1]==="http:"?80:443))==(bW[3]||(bW[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),b$(bT,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bK.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bM.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bQ,"$1_="+x);d.url=y+(y===d.url?(bM.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bX+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=b$(bU,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){if(s<2)w(-1,z);else throw z}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)ca(g,a[g],c,e);return d.join("&").replace(bD,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cd=f.now(),ce=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cd++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=b.contentType==="application/x-www-form-urlencoded"&&typeof b.data=="string";if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(ce.test(b.url)||e&&ce.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(ce,l),b.url===j&&(e&&(k=k.replace(ce,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var cf=a.ActiveXObject?function(){for(var a in ch)ch[a](0,1)}:!1,cg=0,ch;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ci()||cj()}:ci,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,cf&&delete ch[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n),m.text=h.responseText;try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cg,cf&&(ch||(ch={},f(a).unload(cf)),ch[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var ck={},cl,cm,cn=/^(?:toggle|show|hide)$/,co=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,cp,cq=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cr;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(cu("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),e===""&&f.css(d,"display")==="none"&&f._data(d,"olddisplay",cv(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(cu("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(cu("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]),h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cv(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cn.test(h)?(o=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),o?(f._data(this,"toggle"+i,o==="show"?"hide":"show"),j[o]()):j[h]()):(k=co.exec(h),l=j.cur(),k?(m=parseFloat(k[2]),n=k[3]||(f.cssNumber[i]?"":"px"),n!=="px"&&(f.style(this,i,(m||1)+n),l=(m||1)/j.cur()*l,f.style(this,i,l+n)),k[1]&&(m=(k[1]==="-="?-1:1)*m+l),j.custom(l,m,n)):j.custom(l,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b]&&g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:cu("show",1),slideUp:cu("hide",1),slideToggle:cu("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=cr||cs(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){e.options.hide&&f._data(e.elem,"fxshow"+e.prop)===b&&f._data(e.elem,"fxshow"+e.prop,e.start)},h()&&f.timers.push(h)&&!cp&&(cp=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=cr||cs(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(cp),cp=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(["width","height"],function(a,b){f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now)+a.unit)}}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?f.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(d){}var e=b.ownerDocument,g=e.documentElement;if(!c||!f.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=e.body,i=cy(e),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||f.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||f.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:f.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);var c,d=b.offsetParent,e=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(f.support.fixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===d&&(l+=b.offsetTop,m+=b.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cw.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),e=d,d=b.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;f.support.fixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each(["Left","Top"],function(a,c){var d="scroll"+c;f.fn[d]=function(c){var e,g;if(c===b){e=this[0];if(!e)return null;g=cy(e);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:f.support.boxModel&&g.document.documentElement[d]||g.document.body[d]:e[d]}return this.each(function(){g=cy(this),g?g.scrollTo(a?f(g).scrollLeft():c,a?c:f(g).scrollTop()):this[d]=c})}}),f.each(["Height","Width"],function(a,c){var d=c.toLowerCase();f.fn["inner"+c]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,d,"padding")):this[d]():null},f.fn["outer"+c]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,d,a?"margin":"border")):this[d]():null},f.fn[d]=function(a){var e=this[0];if(!e)return a==null?null:this;if(f.isFunction(a))return this.each(function(b){var c=f(this);c[d](a.call(this,b,c[d]()))});if(f.isWindow(e)){var g=e.document.documentElement["client"+c],h=e.document.body;return e.document.compatMode==="CSS1Compat"&&g||h&&h["client"+c]||g}if(e.nodeType===9)return Math.max(e.documentElement["client"+c],e.body["scroll"+c],e.documentElement["scroll"+c],e.body["offset"+c],e.documentElement["offset"+c]);if(a===b){var i=f.css(e,d),j=parseFloat(i);return f.isNumeric(j)?j:i}return this.css(d,typeof a=="string"?a:a+"px")}}),a.jQuery=a.$=f,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return f})})(window);

if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
	this.GM_getValue=function (key,def) {
		return localStorage[key] || def;
	};
	this.GM_setValue=function (key,value) {
		return localStorage[key]=value;
	};
	this.GM_deleteValue=function (key) {
		return delete localStorage[key];
	};
}

var defCol = ['#0079B2','#E6F1F9','#004A6F','#FFFFFF']; //背景,字体,背景选中,字体选中
/*
GM_deleteValue('t_smbg'); //删除已保存的颜色配置,恢复默认配置
GM_deleteValue('t_smtc');
GM_deleteValue('t_smbgh');
GM_deleteValue('t_smtch');
*/
var cuCol = [];
cuCol[0] = GM_getValue('t_smbg',defCol[0]);
cuCol[1] = GM_getValue('t_smtc',defCol[1]);
cuCol[2] = GM_getValue('t_smbgh',defCol[2]);
cuCol[3] = GM_getValue('t_smtch',defCol[3]);

var firstRun = parseInt(GM_getValue('tsm_fr','1'));
var asetIrs = ['tsinam_setScstep','tsinam_setScmin','tsinam_setScmax','tsinam_setZtop'];
var defimgSet = ['0.2','0.2','2','10001']; //缩放变动值,最小缩放倍数,最大缩放倍数,查看框Z-Index
var tScaleStep;
var tScaleMin;
var tScaleMax;
var zTop;
var cuimgSet =[];
t_getSettings();
var tmplCfh = 680; //评论查看框高度
var rot = 0;
var cvScale = 1;
var tframeLoaded = 0;
var timgLarge; //默认查看大图
var timgTitle; //顶部原图切换键
var timgLock; //起始图片框相对固定
var timgAction; //直接点击图片触发 0-否, 1-是
var rtjdImg = '';
var rtjdUser =GM_getValue('tsm_jduser','');
var rtjdMail = GM_getValue('tsm_jdmail','');
var rtjdChk = GM_getValue('tsm_jdchk','checked');
var rtjdTxt ='';
var imgList;
var curImg;
function t_getSettings(){
	cuimgSet[0] = GM_getValue('tsm_scsetp',defimgSet[0]);
	cuimgSet[1] = GM_getValue('tsm_scmin',defimgSet[1]);
	cuimgSet[2] = GM_getValue('tsm_scmax',defimgSet[2]);
	cuimgSet[3] = GM_getValue('tsm_ztop',defimgSet[3]);
	tScaleStep = parseFloat(cuimgSet[0]);
	tScaleMin = parseFloat(cuimgSet[1]);
	tScaleMax = parseInt(cuimgSet[2]);
	zTop = parseInt(cuimgSet[3]);
	timgLarge = GM_getValue('tsm_imglarge','checked');
	timgTitle = GM_getValue('tsm_imgtitle', 'checked');
	timgLock = GM_getValue('tsm_imglock','checked');
	timgAction = parseInt(GM_getValue('tsm_imgact','1'));
}

var loadpic = 'data:image/gif;base64,R0lGODlhEAAQAKIHADZmvyRl1FZ5upOjxHWOv7G5yb2/w////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAHACwAAAAAEAAQAAADQ3i6B8CQORdXCG0eIeC92cZ11seMZBlxjGFUC0EcrgvLcv1W+GzDB1lrxxgMILqi8bhIFgqHJbP5ej6j04gVClxcIwkAIfkEBQAABwAsAAAAABAAEAAAAz94uifCkDkXFwBtHkLgvdnGddbHjGQZcUwQVMswHK4Ly3L9VvhswwcZcFEoDIlFI8xgOCSVESbTCY1Kj4ppJAEAIfkEBQAABwAsAAAAABAADgAAAzt4ukfEkDkXlxBtnjHgvdnGddbHjGQZcQwAVEtRHK4Ly3L9VvhswwcZIxCIGAwQIpFxPA6VzGayCHEqEgAh+QQFAAAHACwAAAAAEAAQAAADPni6N8OQORcXIW2eUuC92cZ11seMZBlxjCBUi2EcrgvLcv1W+GzDBxkDAAAOiUXjAVkMBIzEg9OplE6r1koCACH5BAUAAAcALAAAAAAOABAAAAM8eLpXxVA5F88YbR5j1r3ZxnXWx4xkGXEKQVSM68KtTNc3IwhRECy7HcPnUwR5AMCB+DMik8piBKq8JSEJACH5BAUAAAcALAAAAAAQABAAAAM+eLpnxpA5F1cpbdZzb95cBzLeeAzDGAQnmlbr6r5RzKIquxBEBAAQHo/x+zGEPYHgUAQek8qlcRNdmg7KSgIAIfkEBQAABwAsAAACABAADgAAAz54aqZ+IbzD2Ivx1eaw1Nz1KUUxTQBwlOWppClrurDauq/qDMMpCBMe7/H7PYQ9AuFQBB6TyqURF13iHkpXAgAh+QQFAAAHACwAAAAAEAAQAAADPni6F8GQORfjfADURXPejKeBy7cYBikIB4pu6+qmVcy+4MoURUQQEB6P8fvthIfB4FAEHpPKpXETXZIUykoCADs=';
var tleftimg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAB90RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgOLVo0ngAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDcvMTAvMTGIBvGJAAAE50lEQVRIiZWWa2xTZRjHf+85Le26jV3Yxi5sA9KFy9zMCLdgWBCiWQjUELJE4zRGURv8oIZgjEJYDANNCKhfLJcPxESjMSG4L6CiCHIJbgwYtwElwK6MjtGWrl3b0/P4YescriPxSU7yJOf//P7nfU7e93mViJAqnO7mdGAN8CqwAJgOaKOvI0A/cBbY7/W4TqSEACqVgdPdvBLYC8zWlFJJ7VjRSCYiYIqYQAuw2etxnXqqgdPdbAe2akptMkVsVotGVXk2dTVFrKqeTmmeg0gswe37IU5d83GkrZebvY8RQUwRA/ga+MTrccUmGDjdzTmAB1ivKaVXFGeys6GaZ8qzJ1s9AOdvD9L001WudgUQIQEc8Hpc7lQGXwCbLLrS1y0pZfO6uWSnT3kqfHx8+l07h852kTAlAewBPvZ6XAltFP6CppRb15T28vJymhqq/xccYEt9JWsXlaAUOvABsHBsBU5382Wgsqo8Wx14bzE5GanhgXCYH07d4OiVIMEYWKwaw/5HbFgxk9dWVRONm6xtOkGnLyymyHFgtcXpbl4PzNc1pT5aN29SeKu3i71nQly4lcvDoVIisQSJhDC7OIbVPgSAzaqxpb6SjXtbVcyQWmCZBXgXUHNKprLQmZsSfuziTXb8EafvXhED/gGU5odEDNOI4ksrQVP/amsrC6goyuR6d1AzRV63AJVKodYuKkYfrxyNHn+AfS0RQr0zGTSi6Fn5OAzQNSEaUeRqfqLR2BM1tZUFdPQEFcISCyM7lNrKgpRff+jcLfo6i+kOm6RZrBTYDTILHlCSG8YwwAgFsOqFT9Qsm5vHvl+9Cii2ALoIVBRlpjS42KnTHbBjSBirpFFW2s3O+hmUT8vGME1MEezWJ//b/NKsZJphSQUdjhnYp1gIDQ1xp+cRoUgJSg2TYJjnZ8WpKMxHRJiiJrYUwBx3OlgAUym03sEIxblpAOz/rY2WG/fJLivgETkgfiQeRtKncbLH5NLB02jBQXa/U4fDbp1gcLUzkExDGhAAONLWOyZoWFHFzLJiuu7OIOifhYoFUGYcY9hP1+159IYyeGt1TUo4wJkOH4AA3RpwTgQOn+shbpgA5KSnsW1dDTNzbzDVMQxZTrTMHEy9CDPjGo11OSxyzkgJBzjW3s9ol05rwJeA4e17zNmbD8dEuq6z/ZVlVE9vxZlnUJaWz4yie2x5MZ2FzjKCwSDRaHQC/MSVB3T6hjBFEsC3mtfj+gW4IILs/rmDgeBIUTQaxWG3s+uN5RQ6zhOz3+XtBUOsWVqNz+dDRMaeZDyOGDT+eAUjIQL8CfydnFCbAX9Hd5DdzR0A2Gw24vE4+VlZNNZXs2HxEBtfqiUUCuFwOHA4HNhsNpLzKBJLsPX7dnoHwwAG8L7X44qPP663MTJs9LoFRWypryRvqm3SPo+PSCzB5oMXOHapHyBuinwG7PB6XOb4fbAHmG2KNBxt69Pa7/rZ0VDN0jl5k4JjhsnJaw/YdbiDO/0hRDCAr7we1/akZsJMdrqbP9SUajJF7FaLpsryHKysms6qZwtxFmUQjZlc7w5wumOA45f76RoII4IAw6bI58BOr8cVn9Rg1GQh8A1QA2iaUiiFSkqVIgnFFIkBvwONXo+r5b+slAajJlOA54A3gSVACWAHEsAQI9eWv4C9Xo+rdbI2/gMdlSw0y/IHQwAAAABJRU5ErkJggg==';
var trightimg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAB90RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgOLVo0ngAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDcvMTAvMTGIBvGJAAAE80lEQVRIiZWWa2yTVRjHf+e87dp169iWUViXMQMdQ8aGgw28wIyiEZE1EpyYQIwhMTYYo4RMDZdITACNBlE/WCIxhoiXmBjcF2ICARTkPsJ9gU4IG+2udfd17fue44dtuNmOxPPpJO/z///yPOc8z3mF1ppUyxeozwBWAmuBBcA0QI5+HgLagFPA16Gg/3hKE0CkAvgC9U8De4GZUggxFntfNLLTWoPSWgHngLpQ0H/igQBfoN4JbJNCbFJaO+w2SVlRNssr8llWPo3CPBdDcYum1n5OXO/gUEOYm+E+tEYrrU3gC2BzKOiPJwF8gfocIAislkIYxV43u9aVM68oe7LsAbjQFGXHz9e41tyD1ljAvlDQH0gF+BjYZDOEsWpxIXWr5pCdkfZA8/Fry4HL/HKqGUtpC/gMeD8U9Fty1PxZKUTAkEK+srSIHevK/5c5wNbaUmqqChACA3gHqLyfgS9QfwUoLSvKFvveXERO5oj5is37ibtngBBoBDNzDF6qzOO5hSUpIcMJRc2O49ztGNRK66PACuO71gWrgQ2GFPKT1yrw5bvvC74510tL93ya29LpHCigrTeH87dN7g22UjLNQabDMQFgMwRFUzM41BARltKFwDEb8AYgSgqyqPTlThAoK0F3dxTV14KwpRMdcNEVnYKZyOJG5DZ7amfiyXJP0FSXeijOd3OjpVcqrV+VQKkQiJoqL4YUE4L7e4fIdWbjdM9jStYsXA4vhiudO1Eb4WYvnx9uTFmq6lIPQiCAxZKRDqW61JMUWODsYX5xI9ULbrKovAlvfhdT7QZ2p+Zel52jNzO50NScpHt8Th6MNKbXBhhaQ3G+Oynwh621KMtCCoEQgiOXQmw5FCURySGWiGF0ZnP6VisLZxVO0M0tnDK2zZRJruNWut1OhtNJusOBMy2NF6rmUuIMYZkJtBymP2bS29MDgKUUpqUAUOOmgw1QQiDD0SG8uekpQQ1/Rdh54BgFc2cTsXIQ1gBYf2MaUzkdtfPWj2eJtUZ4b81SfPm5XLvbMybtl0APwKGG8KSZlBV5eKZqDk3N2UTCxWC2I7SFMqN0hsq4FXFT89hsZk3PAeDPxg4ADbRI4IzWcPDMPRKmSgmwGwaB5RUseyiMdnWhMwqR7lwy7TMYdIdZXzWMf/HDjA3ew5fbGK3SSQnsAcxQpI9TN7tSAuLxOAMDA2x8cSlrS2/h9ZjMdOTh8bbzemUHLy95hEQiAcDxq+3c7RhAaW0B+2Uo6P8NuKg1evevjXT2DicBtNaYpklfXx+b1zxFtecyQ5nNPF90hw0rlxKLxVBK0Tdksv2nq5iW1sAx4OzYLaoDuhtbetldn9w8aWlpuFwuhBDYbDa2rV3C2vlR3q19EtM0kVKihI1t318mHB0EMIG3Q0F/Yvy4/oCRx8ZYviCfrbWl5GU5kmBKKaT893ZrrYklFHXfXuTwpTaAhNL6Q2BnKOhX4wFZwJfAOimE9Oams3NdOY+W5KU8F4C4qfj9ejufHmzkdls/WmMCe0JBf91YTNKb7AvUb5RC7FBaO+02KWbkuXi6bBrL5k/Hl5/JcFxxo6WHk42dHL3SRnPnIFqjgZjS+iNgVyjoT0wKGIVUAl8BFYAcGRWIsVAhGDNFaR0HjgDbQ0H/uf96pQSMQtKAJ4D1wGKgAHACFjDAyG/LH8DeUNB/frIy/gPEWhpBelK3gwAAAABJRU5ErkJggg==';
var tzoutimg = 'data:image/png;base64,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';
var tzinimg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNy8xMC8xMYgG8YkAAAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAAHIklEQVRIiY2VaXBVZxnHn3c559xzzj333DW5WSAJkI0lkX2xhelYHYl1cKyiWEaptq4Uy9SNYewwo6N8YJyqg+NAK+AGxbYs01amJFihlbINJCFAgEAScknulrufe9b39UM/ORX0+f78f99+P8Q5h4fd9h0/UBd1L+3yyXITIYQBIJl5nmtaxujwjesD2368o/Swf/QgwO49LzXPbZ//+VhNzWcUWVpMCdExQgAA4Hke2K5brFTMgXQ6+faNm8OHn/vO8yP/N+D4W0c2t85p/WE0HJ5pWWXIZNKQnS5yw7QYAgDFJ+FwMIDC0Qhg6oNkKp24Ozqy6wuf+/JLDwX85KfPRz71iZ7ftrZ2bMDIg6tDA9A/nEol8iRZ9pSiB7IDAIC5KQZEIzAzxGu72uKxzo52qFRtuDVy82Dfyb7v/WrXb3IfAaxYvUTd+fOdBzo75j6ZyUxB7+mLhaGU/4Yrt2R9iuYKAgUMCDzOmOUyXrUccI0y0flE7aIZdueaVR8LiJIKQ9euHt13YO/XXjv0ZhEAgOzYsQMAABrq615cML/r29nsJBw5cS55y2i7HKxtK4d1SQzIIGJwBccxCfNswUe5qIiYCqKAbLG2MJ7DyUJyWGttqlFr4nUd4VAUz5u7oBcAAAMA/PEvf1g6Z3brj1ynAm/3XciOsa4rdfWNLKR4ii5TQgmiU5lsc6Vaaa+albbsdK5FJED8PoL81JV9Wq3Vn2u51Pt+f1aTRWht63hh9+9/vRIAACOEoKmp5bmgronnzl+xhguNV+N1DUzzMZ9PEnFIk3HRcGhnox7b9qUF8W0buurmNumxvGFTXVOQKAlIFZnk88fMSxP64ODQsN1QF6PNzbO+37mwk5C9r+xe3Nba/kvHNqS+C+PjEO6+H9WxIouU+EQB+/0iKlRsUqvT4LL2KFIl6t26X7HzJs5EQyrzGEcYY6AEkZKrGp6RUObPioUYx00BXTuJNT34FVWRA4nJKa/II+mgrmGJIsIxxlXHo5bLiO1xalgeKpsOlE0bGaaDbNcjjuNS02EEYURkCVM9qKF0NZBOZfIspGtaNBh6kqqKuhYhDqlpo0rk2qqmYEGilAzdvjdDV0WpVCS8XDRQtDFORVFgnHMUC6nCzcTU7GLR48zxUKpsWy0z6u7mqpzdLwu5ZK5cjYZDakAPPkEpIXOAczBt5kqywjABnK+4XlPMr3x33TylXDUZQgghjJhtuxwB8J7lDWjt0nrNZQxUn4R2HR4o9g7kUoNjdjabypCe+aGFoiCoAhXbKGOMMM5B8lFiFJB7/Pz0VKZYRuu6hSZRJILPo5xQgi3HZYwjAACOEOJUIB53mYcxRtMVt3LqciENks8FQn0YY44xAGMMU9OyxgF4s18W6LWJfOlfo/5cVEHy2evZ0s5XB5EgUK9QttCS9hppUWsEEAc41Z/1PriWtAN+kXuuSwbuFqqRWp3kTexGZeoLBxTRcxlYZnWM5qanez2XPRPWVaFSKmCGIl5YZ3jSEy4dOO8QQSb2yL2SuJWjjy9pjygAAOeH09VdJwpn6hoiJrNsURIiXFMxzpa4O7seAi31Yc2oWpBKp/twJpM+mMsX7fpYmC6stxpth3HDExwsqlU1GC77gzUVVY+WVVXiPpEiSaBYVUQuhaOVUCxuBKJhQ1T8potEBh6DNe3CzMZ4mCbTGWsikTiEXzt+9L3E5FSfIiuwdmGgszk4HU5WJdPlCLkA4CLMGULYdhyRMyYBZ6LrupJPpFQQCBEIpZRikrVEsylWjHzxkYYOAAp3Rsfe2bdvzxmSGLvvHTv2Ri4crX2qc069qNqJwJl7gREQZaZImACRmF8VcSE9FboxUbbPXMtWLo+W8jhYP0EFyhB3SNEmtl0t4V/0WI/3PNoVvzJ4A06927v55Il3byPOOSCE4OVX9ry8+tFHviEQDw69NzG0d2jWaUcM2SEVi6pMkeMBKtsfmtcvIhAIcMN0+XTJs7E1Lb6wIrn6Wz1d8ybTBTh2/Mj+LZu3Pv0fuv7suk83rF+/4fVVK1cuF4gH/+hPjP31evSDq+WZk1RWuapIXJQ/lKNlAKtUTOSYJdTtn6j7+hJzxRMr25rSqQIcffPoPw//7dWN758+N/GR4GzctKH1sTWP/XnZ0uXL6mqDMDGV8s6OWMOXUtpowgpOWyC4AAAit+hMuRBeGjeb13Tq7c0NdWRkLAG9J0++vmXL1mc45/kHJrN78dzoVzdu+tmCBV3PdrTNIZpCwajakDdsq2IxCyEEmo9KEV2RAooM+bIFA1evVy5cPPe77dte3M45d/5nkwEAnv3m06u6uxdtamluejwej7Xomh8ESgAQAs9lUCwbkLifHL8zeueN8xfO7v/T/oP9/23ngQAAAIQQ2fjU+sZIbfyTuqavDujaLEAA+Vx+fGpq6mIiMXH872+9c/thG/8G0z543Vl1kT8AAAAASUVORK5CYII=';
var tzoriimg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNy8xMC8xMYgG8YkAAAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAAHQElEQVRIiY2Va3BUZxnHn/dyztlzdvfsPZt7NiFX6IaGFnqBgNVhEGSmxQGxM5Sho4NQK639oNOpWrR1Rv2m9UtvKkw7RSwgWIRpAozBgkTalEAIaciNJEv2ft891/f1m+NMpfr//vx/83z5/xDnHL4oB3/xEzXavSIqy3IHIdQDHMCy7YKmVcZvjo/d+PGLPyt90T26F+D1t37b3tnRvTMYCm1RFEdUIMSNEQIAAMu2wbSsfLmsjSaS8Q+mbk8d3/+dZ2//34C/nDnx/fbWjh8EA4FaQy9CMpWEdKbAK5rOEAAoDgn7vSryBwOAqQPi8WR8bm76taf27/5V+a5u3hPwwg/3+7du3vbrjs7uXRhsuHFjFD79LJGI5Ui8ZCsFG2QTAABzTVTFitrs4+HeztpQT3cXlKsG3L792YlLVy7tffXlX6Y+B9jxza3qM888f6ine/kT2XQcBob+mb4Rd02Yclva6VRtQSDIthm2OWeMA6tolqVXCoKHL9Q82Gx2f2nt/X5BVGBs7Map3x9686n3j3xQAAAgBw8eBAAAt6r+NLoi+u1MZgmOnr6UGY43zFC12VIk5LGtipciU/YohEuEidVqyatrFR8mSC4xrzUZZ6VickruaQ3LNTW1XX5/EK/oiQ7++4PD77659uGH+v+mODD506nz8YHZhqUdX+luaAvLxOWgKJ6riCf+PpesD9dM2TZni0uJZdvXN4eCXqdRKBl8Ol5lJ4YmYtt7y7WPb1obXlzKWB9durj+u/sOXMb9X11JWlraD/g8LnLl6qf6ZKl5TPUF+QPtPqqIiE0v5ng8XeIYE3A7HcTllCjGCJbSJT69mGMBj8PuW6YSJHmMqzHv9dGbE0ZDXYhGIq3PIQVh8qOXXl7d2dH1qmVUxMHh+TskuGqeWaWa3ojHfXE0xobG80uAHclwQK143TIXRYIoFfWZhJm6MBov+lzUHfSKdOR2pig462J2acG1YlnIxzhuaW9rG6Sq27PTpThcM3MzdoEHUmGPi+SzS9RijAAA724NVe5rr60WippgWgxjxqC+xqu1NIgaQ8iBMSKGCZQSLvp8Kk4UXMlEKtfi87jdAa9/J3U6nZsBcUhkKlUshysuGUteVbZPD89X8yXTinaGsGUzEWGEBYFwzDCybE4BuNgQcJPrM4nqrTs526/KtmkzSBelTDxbqgb9PqfqUTdRSkg7cA6awSxJVphpmzTSWJOiFOd8LgcRCRIYMMktCwAAwDgwmwEzbVtoCHtMWZEn59OVaixRLQ5dWchkEkmy5T7fKlEQnJSKnZQxhhnnIDkoqeaRefJqJsEZZ401Dqm9FjmDLuKSJSRKAsYIITAszsq6baYKpjafNorji1p+IlauFMtVMDXGEKEOjDHHGIAxhqmm6/MAPOKSBXpzIVe+PKsmm5XsMsnC9TOzzNTF0JTHq+oU2aINCHSD2UXNstMlqFRLRSlMM90dTnCkMFmaQb7JkJJz+FVFsi0Guladw5lM5kPbYuD3OMVyMY8sLBsu0fI/93h728beQGMsb9oF7iykNFpJlrGW1bGuMYdOXT6tajG6a31d24s7u9olbHqZIRrLQkhtrfe7KlUdEsnkOZxKJ49kcwWzIeQnffV6o21wbnBqOBXJrBiWHU9lXYl43I+YqTgcEnfIMgjYVMrZeLCSzrqpKFgBr9O0gFrALbShizY31vppPJkyFhZjR+jpU3/+qKtz+flIU3jT5lWenpMzmU+yVaKLlFob+prB53H3ATOlM9cSdzK04xMAQD6W7HqyX23hqEV7sKcWJAHbeY1oTaG8f8ejDd0IUZienR04fOiNi/ji0FXj1q3x38wtJOGB5RHXC+ty/YQbwq35PHUQ7vxyNOiJNjkDErGdnAjAicAlwpwrm13+jffXeixDd165FSeYa8IrXyP9fdEO1+jNSRgZHXktsVQ0EeccEELw1ttv/G59/7qnJZHBO4PTs+9d904YRDFUGVOKmIAVb5EGWuIAAFZ6LswqObfNsZmtMIsYBXHfOrv7e9vWtNxN5uD4yeOHDjz7/B7g/zHXX9++tWnbth3HHn3kkdWiwODcSGzy8FjoH9fKLXcFWbW9bqCyCBIAQNUAPVsAyyhnSZ97vm7fmurDT6zr6ogtZeDo+0fjA+c+3DBw5vzE54Sza8+THY9teOydNasfWlMX9sLCUsK+PKVPfJxwzy7qnowOogUAIHKdNsl5/5raamRDj6ertbGRzMzH4NjxY+PnL1x4aeDs4Il7KnNl3/Lg7t17XolGe/f2dLZjtyJAuapDrmLoZZ3pCCFwO6gU8CiSqiiQL2kwcv0m+/jq8Ot/PHrk59dGxhb/p5MBAPbu+9ba3ujKpyORyMa62lCzx+0CgRIAhMC2GBRKFViI3Z2fmpkeHB6+8od3D7839N967gkAAEAI0R3f2NYUrqvf4vf5H/aoaoQjjnLZ3J1kMnl5bm767Nm/npvhnFv36vgXpiGskNnQUhoAAAAASUVORK5CYII=';
var cbemptyimg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAAAAAApWe5zwAAAAF0Uk5TAEDm2GYAAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII=';
/*!
 * jQuery blockUI plugin
 * Version 2.33 (29-MAR-2010)
 * @requires jQuery v1.2.3 or later
 * Copyright (c) 2007-2008 M. Alsup
 */
;(function($){if(/1\.(0|1|2)\.(0|1|2)/.test($.fn.jquery)||/^1.1/.test($.fn.jquery)){alert('blockUI requires jQuery v1.2.3 or later!  You are using v'+$.fn.jquery);return}$.fn._fadeIn=$.fn.fadeIn;var noOp=function(){};var mode=document.documentMode||0;var setExpr=$.browser.msie&&(($.browser.version<8&&!mode)||mode<8);var ie6=$.browser.msie&&/MSIE 6.0/.test(navigator.userAgent)&&!mode;$.blockUI=function(opts){install(window,opts)};$.unblockUI=function(opts){remove(window,opts)};$.growlUI=function(title,message,timeout,onClose){var $m=$('<div class="growlUI"></div>');if(title)$m.append('<h1>'+title+'</h1>');if(message)$m.append('<h2>'+message+'</h2>');if(timeout==undefined)timeout=3000;$.blockUI({message:$m,fadeIn:700,fadeOut:1000,centerY:false,timeout:timeout,showOverlay:false,onUnblock:onClose,css:$.blockUI.defaults.growlCSS})};$.fn.block=function(opts){return this.unblock({fadeOut:0}).each(function(){if($.css(this,'position')=='static')this.style.position='relative';if($.browser.msie)this.style.zoom=1;install(this,opts)})};$.fn.unblock=function(opts){return this.each(function(){remove(this,opts)})};$.blockUI.version=2.33;$.blockUI.defaults={message:'<h1>Please wait...</h1>',title:null,draggable:true,theme:false,css:{padding:0,margin:0,width:'30%',top:'40%',left:'35%',textAlign:'center',color:'#000',border:'3px solid #aaa',backgroundColor:'#fff',cursor:'wait'},themedCSS:{width:'30%',top:'40%',left:'35%'},overlayCSS:{backgroundColor:'#000',opacity:0.6,cursor:'wait'},growlCSS:{width:'350px',top:'10px',left:'',right:'10px',border:'none',padding:'5px',opacity:0.6,cursor:'default',color:'#fff',backgroundColor:'#000','-webkit-border-radius':'10px','-moz-border-radius':'10px','border-radius':'10px'},iframeSrc:/^https/i.test(window.location.href||'')?'javascript:false':'about:blank',forceIframe:false,baseZ:1000,centerX:true,centerY:true,allowBodyStretch:true,bindEvents:true,constrainTabKey:true,fadeIn:200,fadeOut:400,timeout:0,showOverlay:true,focusInput:true,applyPlatformOpacityRules:true,onBlock:null,onUnblock:null,quirksmodeOffsetHack:4};var pageBlock=null;var pageBlockEls=[];function install(el,opts){var full=(el==window);var msg=opts&&opts.message!==undefined?opts.message:undefined;opts=$.extend({},$.blockUI.defaults,opts||{});opts.overlayCSS=$.extend({},$.blockUI.defaults.overlayCSS,opts.overlayCSS||{});var css=$.extend({},$.blockUI.defaults.css,opts.css||{});var themedCSS=$.extend({},$.blockUI.defaults.themedCSS,opts.themedCSS||{});msg=msg===undefined?opts.message:msg;if(full&&pageBlock)remove(window,{fadeOut:0});if(msg&&typeof msg!='string'&&(msg.parentNode||msg.jquery)){var node=msg.jquery?msg[0]:msg;var data={};$(el).data('blockUI.history',data);data.el=node;data.parent=node.parentNode;data.display=node.style.display;data.position=node.style.position;if(data.parent)data.parent.removeChild(node)}var z=opts.baseZ;var lyr1=($.browser.msie||opts.forceIframe)?$('<iframe class="blockUI" style="z-index:'+(z++)+';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+opts.iframeSrc+'"></iframe>'):$('<div class="blockUI" style="display:none"></div>');var lyr2=$('<div class="blockUI blockOverlay" style="z-index:'+(z++)+';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');var lyr3,s;if(opts.theme&&full){s='<div class="blockUI blockMsg blockPage ui-dialog ui-widget ui-corner-all" style="z-index:'+z+';display:none;position:fixed">'+'<div class="ui-widget-header ui-dialog-titlebar blockTitle">'+(opts.title||'&nbsp;')+'</div>'+'<div class="ui-widget-content ui-dialog-content"></div>'+'</div>'}else if(opts.theme){s='<div class="blockUI blockMsg blockElement ui-dialog ui-widget ui-corner-all" style="z-index:'+z+';display:none;position:absolute">'+'<div class="ui-widget-header ui-dialog-titlebar blockTitle">'+(opts.title||'&nbsp;')+'</div>'+'<div class="ui-widget-content ui-dialog-content"></div>'+'</div>'}else if(full){s='<div class="blockUI blockMsg blockPage" style="z-index:'+z+';display:none;position:fixed"></div>'}else{s='<div class="blockUI blockMsg blockElement" style="z-index:'+z+';display:none;position:absolute"></div>'}lyr3=$(s);if(msg){if(opts.theme){lyr3.css(themedCSS);lyr3.addClass('ui-widget-content')}else lyr3.css(css)}if(!opts.applyPlatformOpacityRules||!($.browser.mozilla&&/Linux/.test(navigator.platform)))lyr2.css(opts.overlayCSS);lyr2.css('position',full?'fixed':'absolute');if($.browser.msie||opts.forceIframe)lyr1.css('opacity',0.0);var layers=[lyr1,lyr2,lyr3],$par=full?$('body'):$(el);$.each(layers,function(){this.appendTo($par)});if(opts.theme&&opts.draggable&&$.fn.draggable){lyr3.draggable({handle:'.ui-dialog-titlebar',cancel:'li'})}var expr=setExpr&&(!$.boxModel||$('object,embed',full?null:el).length>0);if(ie6||expr){if(full&&opts.allowBodyStretch&&$.boxModel)$('html,body').css('height','100%');if((ie6||!$.boxModel)&&!full){var t=sz(el,'borderTopWidth'),l=sz(el,'borderLeftWidth');var fixT=t?'(0 - '+t+')':0;var fixL=l?'(0 - '+l+')':0}$.each([lyr1,lyr2,lyr3],function(i,o){var s=o[0].style;s.position='absolute';if(i<2){full?s.setExpression('height','Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.boxModel?0:'+opts.quirksmodeOffsetHack+') + "px"'):s.setExpression('height','this.parentNode.offsetHeight + "px"');full?s.setExpression('width','jQuery.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"'):s.setExpression('width','this.parentNode.offsetWidth + "px"');if(fixL)s.setExpression('left',fixL);if(fixT)s.setExpression('top',fixT)}else if(opts.centerY){if(full)s.setExpression('top','(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');s.marginTop=0}else if(!opts.centerY&&full){var top=(opts.css&&opts.css.top)?parseInt(opts.css.top):0;var expression='((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + '+top+') + "px"';s.setExpression('top',expression)}})}if(msg){if(opts.theme)lyr3.find('.ui-widget-content').append(msg);else lyr3.append(msg);if(msg.jquery||msg.nodeType)$(msg).show()}if(($.browser.msie||opts.forceIframe)&&opts.showOverlay)lyr1.show();if(opts.fadeIn){var cb=opts.onBlock?opts.onBlock:noOp;var cb1=(opts.showOverlay&&!msg)?cb:noOp;var cb2=msg?cb:noOp;if(opts.showOverlay)lyr2._fadeIn(opts.fadeIn,cb1);if(msg)lyr3._fadeIn(opts.fadeIn,cb2)}else{if(opts.showOverlay)lyr2.show();if(msg)lyr3.show();if(opts.onBlock)opts.onBlock()}bind(1,el,opts);if(full){pageBlock=lyr3[0];pageBlockEls=$(':input:enabled:visible',pageBlock);if(opts.focusInput)setTimeout(focus,20)}else center(lyr3[0],opts.centerX,opts.centerY);if(opts.timeout){var to=setTimeout(function(){full?$.unblockUI(opts):$(el).unblock(opts)},opts.timeout);$(el).data('blockUI.timeout',to)}};function remove(el,opts){var full=(el==window);var $el=$(el);var data=$el.data('blockUI.history');var to=$el.data('blockUI.timeout');if(to){clearTimeout(to);$el.removeData('blockUI.timeout')}opts=$.extend({},$.blockUI.defaults,opts||{});bind(0,el,opts);var els;if(full)els=$('body').children().filter('.blockUI').add('body > .blockUI');else els=$('.blockUI',el);if(full)pageBlock=pageBlockEls=null;if(opts.fadeOut){els.fadeOut(opts.fadeOut);setTimeout(function(){reset(els,data,opts,el)},opts.fadeOut)}else reset(els,data,opts,el)};function reset(els,data,opts,el){els.each(function(i,o){if(this.parentNode)this.parentNode.removeChild(this)});if(data&&data.el){data.el.style.display=data.display;data.el.style.position=data.position;if(data.parent)data.parent.appendChild(data.el);$(el).removeData('blockUI.history')}if(typeof opts.onUnblock=='function')opts.onUnblock(el,opts)};function bind(b,el,opts){var full=el==window,$el=$(el);if(!b&&(full&&!pageBlock||!full&&!$el.data('blockUI.isBlocked')))return;if(!full)$el.data('blockUI.isBlocked',b);if(!opts.bindEvents||(b&&!opts.showOverlay))return;var events='mousedown mouseup keydown keypress';b?$(document).bind(events,opts,handler):$(document).unbind(events,handler)};function handler(e){if(e.keyCode&&e.keyCode==9){if(pageBlock&&e.data.constrainTabKey){var els=pageBlockEls;var fwd=!e.shiftKey&&e.target==els[els.length-1];var back=e.shiftKey&&e.target==els[0];if(fwd||back){setTimeout(function(){focus(back)},10);return false}}}if($(e.target).parents('div.blockMsg').length>0)return true;return $(e.target).parents().children().filter('div.blockUI').length==0};function focus(back){if(!pageBlockEls)return;var e=pageBlockEls[back===true?pageBlockEls.length-1:0];if(e)e.focus()};function center(el,x,y){var p=el.parentNode,s=el.style;var l=((p.offsetWidth-el.offsetWidth)/2)-sz(p,'borderLeftWidth');var t=((p.offsetHeight-el.offsetHeight)/2)-sz(p,'borderTopWidth');if(x)s.left=l>0?(l+'px'):'0';if(y)s.top=t>0?(t+'px'):'0'};function sz(el,p){return parseInt($.css(el,p))||0}})(jQuery);

/*! 
 * jquery.event.drag - v 2.0.0 
 * Copyright (c) 2010 Three Dub Media - http://threedubmedia.com
 */
;(function(f){f.fn.drag=function(b,a,d){var e=typeof b=="string"?b:"",k=f.isFunction(b)?b:f.isFunction(a)?a:null;if(e.indexOf("drag")!==0)e="drag"+e;d=(b==k?a:d)||{};return k?this.bind(e,d,k):this.trigger(e)};var i=f.event,h=i.special,c=h.drag={defaults:{which:1,distance:0,not:":input",handle:null,relative:false,drop:true,click:false},datakey:"dragdata",livekey:"livedrag",add:function(b){var a=f.data(this,c.datakey),d=b.data||{};a.related+=1;if(!a.live&&b.selector){a.live=true;i.add(this,"draginit."+ c.livekey,c.delegate)}f.each(c.defaults,function(e){if(d[e]!==undefined)a[e]=d[e]})},remove:function(){f.data(this,c.datakey).related-=1},setup:function(){if(!f.data(this,c.datakey)){var b=f.extend({related:0},c.defaults);f.data(this,c.datakey,b);i.add(this,"mousedown",c.init,b);this.attachEvent&&this.attachEvent("ondragstart",c.dontstart)}},teardown:function(){if(!f.data(this,c.datakey).related){f.removeData(this,c.datakey);i.remove(this,"mousedown",c.init);i.remove(this,"draginit",c.delegate);c.textselect(true); this.detachEvent&&this.detachEvent("ondragstart",c.dontstart)}},init:function(b){var a=b.data,d;if(!(a.which>0&&b.which!=a.which))if(!f(b.target).is(a.not))if(!(a.handle&&!f(b.target).closest(a.handle,b.currentTarget).length)){a.propagates=1;a.interactions=[c.interaction(this,a)];a.target=b.target;a.pageX=b.pageX;a.pageY=b.pageY;a.dragging=null;d=c.hijack(b,"draginit",a);if(a.propagates){if((d=c.flatten(d))&&d.length){a.interactions=[];f.each(d,function(){a.interactions.push(c.interaction(this,a))})}a.propagates= a.interactions.length;a.drop!==false&&h.drop&&h.drop.handler(b,a);c.textselect(false);i.add(document,"mousemove mouseup",c.handler,a);return false}}},interaction:function(b,a){return{drag:b,callback:new c.callback,droppable:[],offset:f(b)[a.relative?"position":"offset"]()||{top:0,left:0}}},handler:function(b){var a=b.data;switch(b.type){case !a.dragging&&"mousemove":if(Math.pow(b.pageX-a.pageX,2)+Math.pow(b.pageY-a.pageY,2)<Math.pow(a.distance,2))break;b.target=a.target;c.hijack(b,"dragstart",a); if(a.propagates)a.dragging=true;case "mousemove":if(a.dragging){c.hijack(b,"drag",a);if(a.propagates){a.drop!==false&&h.drop&&h.drop.handler(b,a);break}b.type="mouseup"}case "mouseup":i.remove(document,"mousemove mouseup",c.handler);if(a.dragging){a.drop!==false&&h.drop&&h.drop.handler(b,a);c.hijack(b,"dragend",a)}c.textselect(true);if(a.click===false&&a.dragging){jQuery.event.triggered=true;setTimeout(function(){jQuery.event.triggered=false},20);a.dragging=false}break}},delegate:function(b){var a= [],d,e=f.data(this,"events")||{};f.each(e.live||[],function(k,j){if(j.preType.indexOf("drag")===0)if(d=f(b.target).closest(j.selector,b.currentTarget)[0]){i.add(d,j.origType+"."+c.livekey,j.origHandler,j.data);f.inArray(d,a)<0&&a.push(d)}});if(!a.length)return false;return f(a).bind("dragend."+c.livekey,function(){i.remove(this,"."+c.livekey)})},hijack:function(b,a,d,e,k){if(d){var j={event:b.originalEvent,type:b.type},n=a.indexOf("drop")?"drag":"drop",l,o=e||0,g,m;e=!isNaN(e)?e:d.interactions.length; b.type=a;b.originalEvent=null;d.results=[];do if(g=d.interactions[o])if(!(a!=="dragend"&&g.cancelled)){m=c.properties(b,d,g);g.results=[];f(k||g[n]||d.droppable).each(function(q,p){l=(m.target=p)?i.handle.call(p,b,m):null;if(l===false){if(n=="drag"){g.cancelled=true;d.propagates-=1}if(a=="drop")g[n][q]=null}else if(a=="dropinit")g.droppable.push(c.element(l)||p);if(a=="dragstart")g.proxy=f(c.element(l)||g.drag)[0];g.results.push(l);delete b.result;if(a!=="dropinit")return l});d.results[o]=c.flatten(g.results); if(a=="dropinit")g.droppable=c.flatten(g.droppable);a=="dragstart"&&!g.cancelled&&m.update()}while(++o<e);b.type=j.type;b.originalEvent=j.event;return c.flatten(d.results)}},properties:function(b,a,d){var e=d.callback;e.drag=d.drag;e.proxy=d.proxy||d.drag;e.startX=a.pageX;e.startY=a.pageY;e.deltaX=b.pageX-a.pageX;e.deltaY=b.pageY-a.pageY;e.originalX=d.offset.left;e.originalY=d.offset.top;e.offsetX=b.pageX-(a.pageX-e.originalX);e.offsetY=b.pageY-(a.pageY-e.originalY);e.drop=c.flatten((d.drop||[]).slice()); e.available=c.flatten((d.droppable||[]).slice());return e},element:function(b){if(b&&(b.jquery||b.nodeType==1))return b},flatten:function(b){return f.map(b,function(a){return a&&a.jquery?f.makeArray(a):a&&a.length?c.flatten(a):a})},textselect:function(b){f(document)[b?"unbind":"bind"]("selectstart",c.dontstart).attr("unselectable",b?"off":"on").css("MozUserSelect",b?"":"none")},dontstart:function(){return false},callback:function(){}};c.callback.prototype={update:function(){h.drop&&this.available.length&& f.each(this.available,function(b){h.drop.locate(this,b)})}};h.draginit=h.dragstart=h.dragend=c})(jQuery);

/**
 * jQuery custom checkboxes
 * 
 * Copyright (c) 2008 Khavilo Dmitry (http://widowmaker.kiev.ua/checkbox/)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @version 1.3.0 Beta 1
 * @author Khavilo Dmitry
 * @mailto wm.morgun@gmail.com
**/
(function($){var i=function(e){if(!e)var e=window.event;e.cancelBubble=true;if(e.stopPropagation)e.stopPropagation()};$.fn.checkbox=function(f){try{document.execCommand('BackgroundImageCache',false,true)}catch(e){}var g={cls:'jquery-checkbox',empty:'empty.png'};g=$.extend(g,f||{});var h=function(a){var b=a.checked;var c=a.disabled;var d=$(a);if(a.stateInterval)clearInterval(a.stateInterval);a.stateInterval=setInterval(function(){if(a.disabled!=c)d.trigger((c=!!a.disabled)?'disable':'enable');if(a.checked!=b)d.trigger((b=!!a.checked)?'check':'uncheck')},10);return d};return this.each(function(){var a=this;var b=h(a);if(a.wrapper)a.wrapper.remove();a.wrapper=$('<span class="'+g.cls+'"><span class="mark"><img src="'+g.empty+'" /></span></span>');a.wrapperInner=a.wrapper.children('span:eq(0)');a.wrapper.hover(function(e){a.wrapperInner.addClass(g.cls+'-hover');i(e)},function(e){a.wrapperInner.removeClass(g.cls+'-hover');i(e)});b.css({position:'absolute',zIndex:-1,visibility:'hidden'}).after(a.wrapper);var c=false;if(b.attr('id')){c=$('label[for='+b.attr('id')+']');if(!c.length)c=false}if(!c){c=b.closest?b.closest('label'):b.parents('label:eq(0)');if(!c.length)c=false}if(c){c.hover(function(e){a.wrapper.trigger('mouseover',[e])},function(e){a.wrapper.trigger('mouseout',[e])});c.click(function(e){b.trigger('click',[e]);i(e);return false})}a.wrapper.click(function(e){b.trigger('click',[e]);i(e);return false});b.click(function(e){i(e)});b.bind('disable',function(){a.wrapperInner.addClass(g.cls+'-disabled')}).bind('enable',function(){a.wrapperInner.removeClass(g.cls+'-disabled')});b.bind('check',function(){a.wrapper.addClass(g.cls+'-checked')}).bind('uncheck',function(){a.wrapper.removeClass(g.cls+'-checked')});$('img',a.wrapper).bind('dragstart',function(){return false}).bind('mousedown',function(){return false});if(window.getSelection)a.wrapper.css('MozUserSelect','none');if(a.checked)a.wrapper.addClass(g.cls+'-checked');if(a.disabled)a.wrapperInner.addClass(g.cls+'-disabled')})}})(jQuery);

/*!
* img ready
* http://www.planeart.cn/?p=1121
* TangBin - MIT Licensed
*/
var imgReady = function (url,callback,error){var width,height,intervalId,check,div,img = new Image(),body = document.body;img.src = url;if (img.complete){return callback(img.width,img.height);};if (body){div = document.createElement('div');div.style.cssText = 'visibility:hidden;position:absolute;left:0;top:0;width:1px;height:1px;overflow:hidden';div.appendChild(img);body.appendChild(div);width = img.offsetWidth;height = img.offsetHeight;check = function (){if (img.offsetWidth !== width || img.offsetHeight !== height){clearInterval(intervalId);callback(img.offsetWidth,img.offsetHeight);img.onload = null;div.innerHTML = '';div.parentNode.removeChild(div);};};intervalId = setInterval(check,150);};img.onload = function (){clearInterval(intervalId);callback(img.width,img.height);img.onload = img.onerror = null;body && img.parentNode.removeChild(img);};img.onerror = function (){error && error();clearInterval(intervalId);body && img.parentNode.removeChild(img);};};

/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */
(function(a){function d(b){var c=b||window.event,d=[].slice.call(arguments,1),e=0,f=!0,g=0,h=0;return b=a.event.fix(c),b.type="mousewheel",c.wheelDelta&&(e=c.wheelDelta/120),c.detail&&(e=-c.detail/3),h=e,c.axis!==undefined&&c.axis===c.HORIZONTAL_AXIS&&(h=0,g=-1*e),c.wheelDeltaY!==undefined&&(h=c.wheelDeltaY/120),c.wheelDeltaX!==undefined&&(g=-1*c.wheelDeltaX/120),d.unshift(b,e,g,h),(a.event.dispatch||a.event.handle).apply(this,d)}var b=["DOMMouseScroll","mousewheel"];if(a.event.fixHooks)for(var c=b.length;c;)a.event.fixHooks[b[--c]]=a.event.mouseHooks;a.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=b.length;a;)this.addEventListener(b[--a],d,!1);else this.onmousewheel=d},teardown:function(){if(this.removeEventListener)for(var a=b.length;a;)this.removeEventListener(b[--a],d,!1);else this.onmousewheel=null}},a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery)

t_custom_style= '.t_customCss li a{background: '+ cuCol[0] +' !important;color: ' + cuCol[1] + ' !important}';
t_custom_style += '\n' + '.t_customCss li a:hover{background: '+ cuCol[2] +' !important;color: '+ cuCol[3] +' !important}';
t_custom_style += '\n' + '.t_customChbtn:hover{background: '+ cuCol[0] +' !important;color: ' + cuCol[1] + ' !important}';
t_custom_css = '<style>'+ t_custom_style +'</style>';
$('head').append(t_custom_css)

t_set_html='<div id="tsinam_setdiv"class="t_showframe"><div class="t_setdiv"align="center"><div style="padding-top:5px;padding-bottom:5px;"><b>MOFA.CC share 设置</b></div><table class="t_set_tb"border="0"cellspacing="0"cellpadding="0"width="90%"><thead><tr><td colspan="2"align="left"><b>图片查看</b></td></tr></thead><tr><td style="width:12%;">图片尺寸</td><td style="width:88%;"><input type="radio"class="t_rtjdchk"id="tsinam_imgLarge"name="simgsize" />原图大小　<input type="radio"class="t_rtjdchk"id="tsinam_imgMid"name="simgsize" />中等大小　　　点击图片打开查看: <input type="checkbox"class="t_rtjdchk"id="tsinam_setimgAct" /></td></tr><tr><td>图片缩放</td><td>缩放变动值:<input id="tsinam_setScstep"class="t_setfloat"type="text"style="width:30px;"/> <span id="tsinam_irs1"class="t_setbtn t_settrs">重置</span>　最小缩放倍数:<input id="tsinam_setScmin"class="t_setfloat"type="text"style="width:30px;"/> <span id="tsinam_irs2"class="t_setbtn t_settrs">重置</span>　最大缩放倍数:<input id="tsinam_setScmax"class="t_setnum"type="text"style="width:30px;"/> <span id="tsinam_irs3"class="t_setbtn t_settrs">重置</span></td></tr><tr><td>查看框</td><td>相对固定: <input type="checkbox" class="t_rtjdchk" id="tsinam_setimgLock" />　顶部显示原图切换键: <input type="checkbox"class="t_rtjdchk"id="tsinam_setimgTitle"/>　Z-Index:<input id="tsinam_setZtop"class="t_setnum"type="text"style="width:45px;"/> <span id="tsinam_irs4"class="t_setbtn t_settrs">重置</span></td></tr><tfoot><tr><td colspan="2"style="line-height:15px">说明：【图片尺寸】 选择图片框默认显示图片的尺寸<br/>　　　【点击图片打开查看】 通过点击缩略图打开图片框<br />　　　【图片缩放】 图片缩放的步进变动值与可缩放的最小、最大倍数<br/>　　　【查看框】　 查看框被拖动前是否相对固定不动，经常看长图片建议关闭<br />　　　　　　　　　 在查看中等大小图片时顶部是否显示原图切换键，也可双击图片切换到原图<br/>　　　　　　　　　 当查看框被网页内其他元素遮挡时可通过增大Z-Index值解决</td></tr></tfoot></table><div class="t_set_ft"style="width:95%"><table cellspacing="0"cellpadding="0"style="width: 100%;"><tr><td style="width: 50%;text-align:left;"><a href="http://t.163.com/rok"target="_blank"></a></td><td style="width: 50%;text-align:right;" class="t_setftbtn"><span id="tsinam_setsave"class="t_setbtn t_rtjdbtn">保存</span>　<span id="tsinam_setcancel"class="t_setbtn">取消</span>　<span id="tsinam_help"class="t_setbtn">帮助</span>　<span id="tsinam_update"class="t_setbtn">检查更新</span></td></tr></table></div></div></div>';
t_rtjd_html='<div id="tsinam_rtjddiv"class="t_showframe"><div class="t_setdiv"align="center"><div style="padding-top:5px;padding-bottom:5px;"><b>转发图片到MOFA.CC</b></div><table class="t_set_tb"border="0"cellspacing="0"cellpadding="0"width="90%"><thead><tr><td colspan="3"align="left"><b>转发内容</b></td></tr></thead><tr><td style="width:12%;">称呼</td><td style="width:80%;"><input id="tjd_user"type="text"style="width:100%;"/></td><td></td></tr><tr><td>邮箱</td><td><input id="tjd_mail"type="text"style="width:100%;"/></td><td></td></tr><tr><td>评论内容</td><td><textarea id="tjd_rttxt"rows="4"style="width:100%;"></textarea><div class="t_rtjdtxtpos"><input type="radio"class="t_rtjdchk"id="tjd_txttop"name="jdtxtpos"/>显示在图片上方　<input type="radio"class="t_rtjdchk"id="tjd_txtbot"name="jdtxtpos"/>显示在图片下方</div></td><td><span id="tjd_loadtxt"class="t_setbtn">加载</span></td></tr><tr><td>图片网址</td><td><input id="tjd_rtimg"type="text"style="width:83%;"/><select id="tjd_imgsize"name="imgsize"style="width:16%"><option value="bmiddle">中等大小</option><option value="large">原图大小</option></select></td><td><span id="tjd_viewimg"class="t_setbtn">预览</span></td></tr><tr><td>图集选择</td><td><input type="radio"class="t_rtjdchk"id="tjd_2mofa"name="jdpiclib"/>发到MOFA　　<input type="checkbox"class="t_rtjdchk"id="tjd_chkafter"/>转发成功后打开图集</td><td></td></tr><tfoot><tr><td colspan="3"style="line-height:15px">说明：【称呼】/【邮箱】 首次转发后会自动保存，下次自动填入<br/>　　　【评论内容】 默认为空白，按“加载”键把转发图片所在的那条微博文字内容填入（新上传图片无内容）<br/>　　　　　　　　　 可选择转发后评论内容出现在图片的上方或下方<br/>　　　【图片网址】 转发图片的实际网址，选择图片大小，按“预览”键打开新窗口查看该网址指向的图片<br/>　　　【图集选择】 选择图片转发到MOFA.CC，转发成功后是否在新窗口打开对应图集查看</td></tr></tfoot></table><div class="t_set_ft"style="width:95%"><table cellspacing="0"cellpadding="0"style="width: 100%;"><tr><td style="width: 50%;text-align:left;"><a href="http://t.163.com/rok" target="_blank"></a></td><td style="width: 50%;text-align:right" class="t_setftbtn"><span id="tjd_send"class="t_setbtn t_rtjdbtn">转发</span>　<span id="tjd_cancel"class="t_setbtn">取消</span>　<span id="tjd_help"class="t_setbtn">帮助</span>　<span id="tjd_update"class="t_setbtn">检查更新</span></td></tr></table></div></div></div>';

if(firstRun>0 && window.location.href.toLowerCase()!='http://weibo.com/'){
	t_FRshow();
}
t_More();
setTimeout(function(){preloadImgs($('div.feed_lists ul.piclist img.bigcursor'),0);},500);
$('<li><a id="tsinam_setting" style="cursor:pointer;">MOFA.CC</a></li>').insertBefore($('div.header ul.person li[node-type=account] ul li:last'));
$('#tsinam_setting').click(function(){t_Settings();});

function preloadImgs(preimgList,idx){
	for(var i=idx;i<preimgList.length;i++){
		img = new Image();
		img.src = $(preimgList.get(i)).attr('src').replace('/thumbnail/','/large/');
	}
}

function t_More(){
        $(document).on('mouseenter','div.feed_lists dl.feed_list',function(){
            t_bePrepare($(this),false);
        });
        $(document).on('mouseleave','div.feed_lists dl.feed_list',function(){
        	$('#tsinam_more').remove();
        });
        $(document).on('mouseenter','ul.MIB_feed li',function(){
            t_bePrepare($(this),true);
        });
        $(document).on('mouseleave','ul.MIB_feed li',function(){
        	$('#tsinam_more').remove();
        });
        $(document).on('mouseover','div.layer_send_pic div.laPic_Pic img',function(){
            $(this).css('cursor','pointer');
        });
        $(document).on('click','div.layer_send_pic div.laPic_Pic img',function(){
            rtjdImg = $(this).attr('src').replace('/small/','/bmiddle/');
            rtjdTxt = '';
            t_Rtjd();
        });
}

function t_bePrepare(sItem,isEP){
    var isImg = false;
    var isCmt = false;
    var isChat = false;
    var imgItem = t_chkImg(sItem,isEP);
    if(imgItem.url!=''){
        isImg = true;
    }
    if(isEP){
    	var ftOp = sItem.find('div.feed_att div.rt');
    	if(ftOp.length>1){
    		ftOp = ftOp.eq(0);
    	}
    	var tCmt = sItem.find('div.MIB_assign p.source span.source_att');
    }else{
		var ftOp = sItem.find('p.info:first span');
    	var tCmt = sItem.find('dl.comment:first dd.info span');
    }
    if(ftOp.text().indexOf('评论(')!=-1){
        isChat = true;
    }
    if(tCmt.length>0){
        if(tCmt.text().indexOf('评论(')!=-1){
            isCmt = true;
        }
    }
    if(isImg || isCmt || isChat){
		t_removeMore();
        t_setMore();
        $('#tsinam_img').hide();
        $('#tsinam_ccmt').hide();
        $('#tsinam_chat').hide();
        if(isCmt){
            $('#tsinam_ccmt').show();
        }
        if(isChat){
            $('#tsinam_chat').show();
        }
        if(isImg){
            $('#tsinam_img').show();
        }
    	$('#tsinam_more').insertAfter(ftOp).show();
        t_setMenu(imgItem,sItem,isEP);
    }
}

function t_setMore(){
    $('<span id="tsinam_more"><ul class="t_topnav t_customCss"><li><a id="tsinam_img">图</a></li><li><a id="tsinam_ccmt">原评</a></li><li><a id="tsinam_chat">评</a></li></ul></span>').appendTo('body').hide();
}

function t_setMenu(sImg,sItem,isEP){
    if(sImg.url!=''){
        $('#tsinam_img').bind('click',function(){
            var imginfo = t_getimgInfo(sItem,isEP);
            if(isEP){
            	imgList = $('ul.MIB_feed div.feed_img img.imgicon');
            }else{
            	imgList = $('div.feed_lists ul.piclist img.bigcursor');
        	}
            curImg = imgList.index(sImg.item);
            preloadImgs(imgList,curImg);
            t_showImgbox(sImg.url,imginfo,false,isEP);
        });
        if(timgAction==1){
        	sImg.item.parent().mouseenter(function(){
        		$(this).attr('action-type','').click(function(){
        			if(sImg.isact){
        				sImg.item.attr('action-type','');
        			}
		            var imginfo = t_getimgInfo(sItem,isEP);
		            if(isEP){
		            	imgList = $('ul.MIB_feed div.feed_img img.imgicon');
		            }else{
		            	imgList = $('div.feed_lists ul.piclist img.bigcursor');
		        	}
		            curImg = imgList.index(sImg.item);
		            preloadImgs(imgList,curImg);
		            t_showImgbox(sImg.url,imginfo,false,isEP);
        		});
         	});
        	sImg.item.parent().mouseleave(function(){
        		$(this).attr('action-type','feed_list_media_img').unbind('click');
        		if(sImg.isact){
        			sImg.item.attr('action-type','feed_list_media_img');
        		}
        	});
        }else{
        	sImg.item.parent().unbind('mouseenter').unbind('mouseleave');
        }
    }
    
    $('#tsinam_ccmt').bind('click',function(){
        t_showOriCmt(sItem);
    });
    
    $('#tsinam_chat').bind('click',function(){
        t_showCurCmt(sItem); 
    });
}

function t_removeMore(){
	if($('#tsinam_more').length>0){
		$('#tsinam_more').remove();
	}
}

function t_getfdItem(sImg,isEP){
	if(isEP){
		var sItem = sImg.parents('li.MIB_linedot_l');
		if(sItem.length==0){
			sItem = sImg.parents('li.MIB_linedot2');
		}
		return sItem;
	}else{
		return sImg.parents('dl.feed_list');
	}
}

function t_getimgInfo(sItem,isEP){
	var isQ = false;
	var iUser = '';
	if(document.domain=='q.weibo.com'){
		var isQ = true;
	}
	if(isEP){
    	var imgInfo = sItem.find('div.MIB_feed_c p.sms');
    	var qtMsg = sItem.find('div.MIB_assign_c p.source');
	}else{
    	var imgInfo = sItem.find('p[node-type=feed_list_content]');
		if(isQ){
    		imgInfo = sItem.find('dd.content p').eq(1);
    		iUser = sItem.find('dd.content p.pname span');
    		var k=1;
    		if(iUser.eq(1).html()==''){
	    		for(k=0;k<iUser.length;k++){
	    			if(iUser.eq(k).html().indexOf('action-type="usercard"')>-1){
						break;
	    			}
	    		}
    		}
    		iUser = iUser.eq(k).html().replace(/(^\s*)|(\s*$)/g, '')+'：';
    	}
    	var qtMsg = sItem.find('dt[node-type=feed_list_forwardContent]');
	}
	if(imgInfo.length>0){
	    if(imgInfo.find('em').length==0){
	    	if(isEP){
	    		rtjdTxt = '@'+$('div.profile_wrap div.tit_prf span').text().replace(/(^\s*)|(\s*$)/g, '')+'：';	
	    	}else{
	    		if(isQ){
	    			rtjdTxt = '@'+sItem.find('dd.content p.pname span').eq(1).text().replace(/(^\s*)|(\s*$)/g, '')+'：';
	    		}else{
		    		rtjdTxt = '@'+$('div.perAll_info div.name').text().replace(/(^\s*)|(\s*$)/g, '')+'：';
	    		}
	    	}
	    }else{
	    	rtjdTxt = '@';
	    }
	    rtjdTxt += imgInfo.text().replace(/(^\s*)|(\s*$)/g, '');
	    imgInfo=iUser+imgInfo.html().replace(/(^\s*)|(\s*$)/g, '');
	    if(qtMsg.length>0){
	        var tmpTxt = qtMsg.text().replace(/(^\s*)|(\s*$)/g, '');
	        var tmp = tmpTxt.indexOf('：');
	        rtjdTxt = tmpTxt.substring(0,tmp-1).replace(/(^\s*)|(\s*$)/g, '') + '：';
	        rtjdTxt += tmpTxt.substring(tmp+1).replace(/(^\s*)|(\s*$)/g, '');
	        imgInfo = imgInfo + ' <b>回复：</b>' + qtMsg.html().replace(/(^\s*)|(\s*$)/g, '');
	    }
	}else{
		imgInfo = '';
	}
    return imgInfo;
}
function t_chkImg(sItem,isEP){
	var t_imgact = false;
	if(isEP){
		var t_pimg = sItem.find('div.feed_img img.imgicon');
	}else{
		var t_pimg = sItem.find('ul.piclist img.bigcursor');
	}
    if(t_pimg.length==0){
        return {url:'',item:null};
    }
    var t_img = t_pimg.attr('src');
    if(t_img.indexOf('/thumbnail/')<0){
        return {url:t_img,item:t_pimg};
    }
    if(timgLarge == 'checked'){
    	t_img = t_img.replace('/thumbnail/','/large/');
    }else{
    	t_img = t_img.replace('/thumbnail/','/bmiddle/');
    }
    if(t_pimg.attr('action-type')!=null){
    	t_imgact=true;
    }
return {url:t_img,item:t_pimg,isact:t_imgact};
}

function t_showImgbox(sImg,sInfo,isNav,isEP){
    isCancelimg = false;
    tframeLoaded = 0;
    var sleft = (document.documentElement.clientWidth - 550 ) /2;
    $.blockUI({
        message: '<div id="tsinam_imgloading" class="t_showframe t_txtshow t_loadshow"><div id="tsinam_loadtxt"><img src="'+ loadpic +'" />　载入中,若图片太大需时读入,请稍候.若长时间无响应则可能图片已被删除<br>双击中间定位查看,点击左、右两边切换上、下一张图或点击背景返回</div><div class="t_imgprev"></div><div class="t_imgnext"></div></div>',
        css: {
                border: '',
                width: '520px',
                left: sleft+'px',
                cursor: 'default',
                backgroundColor: '#fff'
        },
        overlayCSS:  { 
            backgroundColor: '#000', 
            opacity:         0.4 
        }             
    });
    $('.blockOverlay').css('z-index',zTop-100);
    $('.blockPage').css('z-index',zTop);
    $('.blockPage').css('background-color','transparent');

    if(isNav){
        setTimeout(function(){
            t_scrollToLoading(t_getfdItem($(imgList.get(curImg)),isEP));
        },500);
    }else{
        t_scrollToLoading(t_getfdItem($(imgList.get(curImg)),isEP));
    }
    
    imgReady(sImg,function(sW,sH){
        if(isNav){
            setTimeout(function(){
                t_showImg(sImg,sW,sH,sInfo,isEP);
            },500);
        }else{
            t_showImg(sImg,sW,sH,sInfo,isEP);
        }
	});
    
    $('.blockOverlay').click(function(){
        isCancelimg = true;
        $.unblockUI();
    });
	t_setNaviAction(isEP);
}

function t_scrollToLoading(sItem){
	$('#tsinam_loadtxt').dblclick(function(){
		$('html,body').animate({scrollTop: sItem.offset().top-50}, 500);	
	});
}

function t_showImg(sImg,sW,sH,sInfo,isEP){
    if(tframeLoaded==1){
        return;
    }
    $('.blockPage').css('display','none');
    $.unblockUI();
    if(isCancelimg){
        return;
    }
    rot = 0;
    cvScale = 1;
    var oriImgW = sW;
    var oriImgH = sH;
    if(oriImgW>window.screen.availWidth-50){
        var sHint = '图片过宽,拖动查看或双击图片切换缩放';
    }else{
    	if(sImg.indexOf('/bmiddle/')>-1){
    		var sHint = '双击图片查看原图';
    	}else{
        	var sHint = '';
        }
    }
    var stop = (document.documentElement.clientHeight - oriImgH - 60) /2;
    if(stop<0)  stop = 0;
    if(timgLock!='checked'){
    	stop = stop + $(document).scrollTop();
    }
    var sleft = (document.documentElement.clientWidth - oriImgW) /2;
    if(sleft<0)sleft = 0;
    var imgInfo = sInfo;
    $.blockUI({ 
        message: '<div id="tsinam_imgframed"><div class="t_imgtitle"><ul class="t_topnav t_customCss"><li><a id="tsinam_imgla"class="t_imgbtn">原图</a></li></ul></div><div id="tsinam_imgarea"><canvas id="tsinam_canvas"style="display:none;"></canvas><img id="tsinam_showimg"src="'+ sImg + '"title="'+sHint+'"/><div class="t_imgprev"><span></span></div><div class="t_imgnext"><span></span></div><span id="tsinam_turnspan"><a id="turnLsign"class="t_turnsign"><img src="'+ tleftimg +'"title="向左转"/></a>&nbsp;<a id="turnRsign"class="t_turnsign"><img src="'+ trightimg +'"title="向右转"/></a></span><span id="tsinam_zoomspan"><a id="tZoomori"class="t_turnsign"><img src="'+ tzoriimg +'"title="还原"/></a>&nbsp;<a id="tZoomout"class="t_turnsign"><img src="'+ tzoutimg +'"title="缩小"/></a>&nbsp;<a id="tZoomin"class="t_turnsign"><img src="'+ tzinimg +'"title="放大"/></a></span></div><div class="t_imginfo">'+ imgInfo + '<div><span id="tsinam_imglocate"class="t_imgurl"><b><a>定位</a></b></span> | <span class="t_imgurl"><b><a target=_blank href='+sImg+'>另存</a></b></span> | <span id="tjd_rtjd"class="t_imgurl"><b><a>转到MOFA.CC</a></b></span></div><span style="float:right;"><ul class="t_topnav t_customCss"><li><a id="tsinam_imgrt"class="t_imgbtn">返回</a></li></ul></span></div></div>',
        css: {
            top: stop + 'px', 
            left: sleft + 'px',
            width: sW+20+'px',
            cursor: 'default',
            border: ''
        }, 
        overlayCSS:{
            cursor: 'pointer',
            backgroundColor: '#000', 
            opacity: 0.4 
        } 
    });
    if(timgLock!='checked'){
    	$('.blockPage').css('position','absolute');
    }
    $('#tjd_rtjd').click(function(){
    	$('html,body').animate({scrollTop: t_getfdItem($(imgList.get(curImg)),isEP).offset().top-50}, 500);
        rtjdImg = sImg.replace('/large/','/bmiddle/');
        $.unblockUI();
        t_Rtjd(); 
    });
    $('#tsinam_imgla').click(function(){
    	t_showImgbox(sImg.replace('/bmiddle/','/large/'),sInfo,true,isEP);
    });
    $('#tsinam_imglocate').click(function(){
		$('html,body').animate({scrollTop: t_getfdItem($(imgList.get(curImg)),isEP).offset().top-50}, 500);
		$.unblockUI();
    });
    $('#tsinam_imgrt').bind('click',function(){
        $.unblockUI();        
    });
    $('#turnLsign').click(t_imgTurnLeft);
    $('#turnRsign').click(t_imgTurnRight);
    $('#tZoomout').click(function(){
        t_imgZoom(0);    
    });
    $('#tZoomin').click(function(){
        t_imgZoom(1);   
    });
    $('#tZoomori').click(function(){
        t_imgZoom(2);   
    });
    if(sImg.indexOf('/bmiddle/')>-1){
    	if(timgTitle=='checked'){
    		$('#tsinam_imgframed div.t_imgtitle').show();
    	}
    	$('#tsinam_imgarea').dblclick(function(){
    		t_showImgbox(sImg.replace('/bmiddle/','/large/'),sInfo,true,isEP)
    	});
    }else{
    	$('#tsinam_imgarea').dblclick(t_toogleImgSize);
	}

    $('#tsinam_imgframed').hover(function(){
            $('#tsinam_turnspan').css('display','block');
            $('#tsinam_zoomspan').css('display','block');
        },
        function(){
            $('#tsinam_turnspan').css('display','none');
            $('#tsinam_zoomspan').css('display','none');
        }
    )
    
    $('.blockPage').css('background-color','transparent');
    $('.blockPage .t_imginfo a').not('#tsinam_imgrt').attr('target','_blank');
	$('.blockPage').drag(function( ev, dd ){
        if(timgLock!='checked'){
			var dtop = 0;
		}else{
    		var dtop = $(document).scrollTop();
		}
		$( this ).css({
			top: dd.offsetY-dtop,
			left: dd.offsetX
		});
	});
	$('.blockPage').mousewheel(function(event,delta,deltaX,deltaY){
		if(parseInt($('.blockPage').css('height')) >=document.documentElement.clientHeight){
    	    $(this).css('top', parseInt($(this).css('top'))+deltaY*80);
		}
		if(event.altKey){
			if(delta>0){
				t_imgZoom(1);
			}else{
				t_imgZoom(0);
			}
		}
    	return false;
	});
    $('.blockPage').css('z-index',zTop);
    $('.blockOverlay').click($.unblockUI);
    t_setNaviAction(isEP);
    tframeLoaded = 1;
    event.preventDefault();
}

function t_setNaviAction(isEP){
    if(curImg>0){
        $('div.t_imgprev').bind('click',function(){
	       	$.unblockUI();
            curImg--;
            var fdItem = t_getfdItem($(imgList.get(curImg)),isEP);
            var imginfo = t_getimgInfo(fdItem,isEP);
            $.unblockUI();
            t_showImgbox(t_chkImg(fdItem,isEP).url,imginfo,true,isEP);
        }).mouseenter(function(){
        	$('.t_imgprev span').fadeIn(150);
        }).mouseleave(function(){
        	$('.t_imgprev span').fadeOut(150);
        }).css('cursor','pointer');
    }
    if(curImg<imgList.length-1){
        $('div.t_imgnext').bind('click',function(){
       		$.unblockUI();
            curImg++;
            var fdItem = t_getfdItem($(imgList.get(curImg)),isEP);
            var imginfo = t_getimgInfo(fdItem,isEP);
			$.unblockUI();
            t_showImgbox(t_chkImg(fdItem,isEP).url,imginfo,true,isEP);
        }).mouseenter(function(){
        	$('.t_imgnext span').fadeIn(150);
        }).mouseleave(function(){
        	$('.t_imgnext span').fadeOut(150);
        }).css('cursor','pointer');
    }else{
		$('div.t_imgnext').css('cursor','se-resize');
		$('div.t_imgnext').bind('click',function(){
			if(isEP){
				$('html,body').animate({scrollTop: $('div.MIB_bobar').offset().top}, 500);
				t_rtHint(5);
				$.unblockUI();
			}else{
				if($('div.W_pages').length>0){
					var nextp = $('div.W_pages a.W_btn_a:last').attr('href');
					if(nextp.indexOf('http://')<0){
						nextp = 'http://' + document.domain + nextp;
					}
					t_rtHint(4);
					location.href = nextp;
				}else{
					$('html,body').animate({scrollTop: $('div.W_loading').offset().top}, 500);
					t_rtHint(3);
					setTimeout(function(){
			            if(isEP){
			            	imgList = $('ul.MIB_feed div.feed_img img.imgicon');
			            }else{
			            	imgList = $('div.feed_lists ul.piclist img.bigcursor');
			        	}
			            preloadImgs(imgList,curImg);
			            var fdItem = t_getfdItem($(imgList.get(curImg)),isEP);
			            var imginfo = t_getimgInfo(fdItem,isEP);
			            $.unblockUI();
			            t_showImgbox(t_chkImg(fdItem,isEP).url,imginfo,true,isEP);
			            t_rtHintOut();
		            },2500);
		        }
		    }
		});
    }
}

function t_imgFrametune(){
    var cvW = $('#tsinam_canvas').width();
    $('.blockPage').css('width',cvW+20+'px');
    
    var cvH = $('#tsinam_canvas').height();
    var sTop = (document.documentElement.clientHeight - cvH - 45)/2;
    if(sTop <0) sTop =0;
    if(timgLock!='checked'){
    	sTop = sTop + $(document).scrollTop();
   	}
    var sleft = (document.documentElement.clientWidth - cvW - 20) /2;
    if(sleft<0)sleft = 0;
    $('.blockPage').css('left',sleft+'px').css('top',sTop+'px');
}

function t_imgZoom(imode){
    switch(imode){
        case 0:
            cvScale -= tScaleStep;
            if(cvScale <tScaleMin) cvScale=tScaleMin;
            break;
        case 1:
            cvScale += tScaleStep;
            if(cvScale >tScaleMax) cvScale=tScaleMax;
            break;
        case 2:
            cvScale = 1;
            break;
        default:
            break;    
    }    
    rotate(document.getElementById("tsinam_canvas"),document.getElementById("tsinam_showimg"));
    t_imgFrametune();    
}


function t_imgTurnLeft(){
    fun.left();
    t_imgFrametune();
}

function t_imgTurnRight(){
    fun.right();    
    t_imgFrametune();
}

var rotate = function(canvas,img){
    var w = img.width;
    var h = img.height;
	if(!rot){
		rot = 0;	
	}
	var rotation = Math.PI * rot / 180;
	var c = Math.round(Math.cos(rotation) * 1000) / 1000;
	var s = Math.round(Math.sin(rotation) * 1000) / 1000;
	canvas.height = (Math.abs(c*h) + Math.abs(s*w))*cvScale;
	canvas.width = (Math.abs(c*w) + Math.abs(s*h))*cvScale;
	var context = canvas.getContext("2d");
	context.save();
	if (rotation <= Math.PI/2) {
		context.translate(s*h*cvScale,0);
	} else if (rotation <= Math.PI) {
		context.translate(canvas.width,-c*h*cvScale);
	} else if (rotation <= 1.5*Math.PI) {
		context.translate(-c*w*cvScale,canvas.height);
	} else {
		context.translate(0,-s*w*cvScale);
	}
	context.rotate(rotation);
    context.scale(cvScale,cvScale);
	context.drawImage(img, 0, 0, w, h);
	context.restore();
    canvas.style.display = "block";
	img.style.display = "none";	
}
var fun = {
	right: function(){
		rot += 90;
		rotate(document.getElementById("tsinam_canvas"), document.getElementById("tsinam_showimg"));
		if(rot === 360){
			rot = 0;	
		}	
	},
	left: function(){
		rot -= 90;
		if(rot === -90){
			rot = 270;	
		}
		rotate(document.getElementById("tsinam_canvas"), document.getElementById("tsinam_showimg"));
	}
};

function t_toogleImgSize(){
    var cW = document.documentElement.clientWidth;
    var oriImgW = $('#tsinam_showimg').width();
    var oriImgH = $('#tsinam_showimg').height();
    if(rot!=0 && rot!=180){
        var tmp = oriImgH;
        oriImgH = oriImgW;
        oriImgW = tmp;
    }
    var cvW = $('#tsinam_canvas').width();
    var cvH = $('#tsinam_canvas').height();
    var cvShow = 1;
    if($('#tsinam_canvas').css('display')=='none'){
        cvW = oriImgW;
        cvH = oriImgH;
        cvShow = 0;        
    };

        var sW = cvW;
        var sH = cvH;
    if(oriImgW>cW){
        if(oriImgW == sW){
            var nW = cW -120;
            var nH = nW * sH / sW;
            cvScale = nW/sW;
        }else{
            var nW = oriImgW; 
            var nH = oriImgH;
            cvScale = 1;
        }
        rotate(document.getElementById("tsinam_canvas"),document.getElementById("tsinam_showimg"));
        $('.blockPage').css('width',nW+20+'px');
        var sTop = (document.documentElement.clientHeight - nH - 45)/2;
        if(sTop <0) sTop =0;
	    if(timgLock!='checked'){
	    	sTop = sTop + $(document).scrollTop();
	   	}
        var sleft = (document.documentElement.clientWidth - nW - 20) /2;
        if(sleft<0)sleft = 0;
        $('.blockPage').css('left',sleft+'px').css('top',sTop+'px');
    }else{
        $.unblockUI();
    }
}

function t_showCurCmt(sItem){
    var uLnk = sItem.find('p.info a.date').attr('href');
    if(uLnk.indexOf('http://')==-1){
        uLnk = 'http://weibo.com' + uLnk;
    }    
    t_popupChat(uLnk);        
}

function t_showOriCmt(sItem){
    var uLnk = sItem.find('dd.info a.date').attr('href');
    if(uLnk.indexOf('http://')==-1){
        uLnk = 'http://weibo.com' + uLnk;
    }
    t_popupChat(uLnk);        
}

function t_popupChat(sLnk){
    tframeLoaded = 0;
    var sleft = (document.documentElement.clientWidth - 550 ) /2;
    $.blockUI({
        message: '<div id="tsinam_imgloading" class="t_showframe t_txtshow t_loadshow"><img src="'+ loadpic +'" />　评论加载中,请稍候,若无响应请点击背景返回再试一次</div>', 
        css: {
                border: '',
                width: '520px',
                left: sleft+'px',
                cursor: 'default',
                backgroundColor: '#fff'
        },
        overlayCSS:  { 
            backgroundColor: '#000', 
            opacity: 0.4 
        }             
    });
    $('.blockOverlay').css('z-index',zTop-100);
    $('.blockPage').css('z-index',zTop);
    $('.blockPage').css('background-color','transparent');
    
    $('.blockOverlay').click(function(){
        $.unblockUI();
    });
    
    var uCmt = sLnk + '#a_comment';
    var cframe = $('<iframe class="t_chat_frame t_customCf" src="'+uCmt+'" ></iframe>').appendTo('body').hide();
    $(cframe).one('load',function(){
        if(tframeLoaded==1){
            cframe.remove();
            return;
        }
        $.unblockUI();
        
        var cuCfh = tmplCfh;    
        var stop = (document.documentElement.clientHeight - cuCfh -20) /2;
        var sleft = (document.documentElement.clientWidth - 850) /2;
        
        $.blockUI({
            message: '<div id="tsinam_chatdiv" class="t_chat_div t_customCf"></div>',
            css: {
                    top: stop + 'px', 
                    left: sleft + 'px',
                    border: '',
                    width: '870px',
                    height: cuCfh+'px',
                    cursor: 'default',
            },
            overlayCSS:  { 
                backgroundColor: '#000', 
                cursor: 'pointer',
                opacity: 0.4 
            }             
        });
        cframe.appendTo($('#tsinam_chatdiv')).show();
        $('.blockPage').css('background-color','transparent');
        $('.blockPage').css('z-index',zTop);
        $('.blockOverlay').click(function(){
            $.unblockUI();
        });
        tframeLoaded = 1;
        
    });
}

function t_Rtjd(){
        var stop = (document.documentElement.clientHeight - 500) /2;
        var sleft = (document.documentElement.clientWidth - 650) /2;
                
        $.blockUI({
            message: t_rtjd_html,
            css: {
                    top: stop + 'px', 
                    left: sleft + 'px',
                    border: '',
                    width: '675px',
                    cursor: 'default',
            },
            overlayCSS:  { 
                backgroundColor: '#000', 
                cursor: 'pointer',
                opacity:         0.4 
            }             
        });
        $('#tsinam_rtjddiv input:radio').checkbox({cls:'t_jradbox',empty:cbemptyimg});
        $('#tsinam_rtjddiv input:checkbox').checkbox({cls:'t_jchkbox',empty:cbemptyimg});
        $('.t_set_ft a:first').text('MOFA.CC share v'+ tsinam_version + ' - forumz @ ' + t_rdate);
        $('.blockPage').css('background-color','transparent');
        $('.blockPage').css('z-index',zTop);
        $('#tjd_user').val(rtjdUser);
        $('#tjd_mail').val(rtjdMail);
        $('#tjd_rtimg').val(rtjdImg);
        $('#tjd_2pic').attr('checked','checked');
        $('#tjd_txttop').attr('checked','checked');
        if(rtjdChk=='checked'){
            $('#tjd_chkafter').attr('checked','checked');
        }
        $('#tjd_imgsize').change(function(){
            var tmpUrl = $('#tjd_rtimg').val();
            if(tmpUrl.indexOf('/large/')>-1 | tmpUrl.indexOf('/bmiddle/')>-1){
                tmpUrl = tmpUrl.replace('/large/','/'+$(this).val()+'/');
                tmpUrl = tmpUrl.replace('/bmiddle/','/'+$(this).val()+'/');
                $('#tjd_rtimg').val(tmpUrl);
            } 
        });
        $('#tjd_loadtxt').click(function(){
            $('#tjd_rttxt').val(rtjdTxt);
            document.getElementById('tjd_rttxt').focus();
        });
        $('#tjd_viewimg').click(function(){
            window.open($('#tjd_rtimg').val());
        });
        $('#tjd_send').click(function(){
            rtjdUser=$('#tjd_user').val().replace(/(^\s*)|(\s*$)/g,'');
            rtjdMail=$('#tjd_mail').val().replace(/(^\s*)|(\s*$)/g,'');
            if(rtjdUser=='' || rtjdMail=='' || $('#tjd_rtimg').val()==''){
                t_rtHint(-2);
                return;
            }
            GM_setValue('tsm_jduser',rtjdUser);
            GM_setValue('tsm_jdmail',rtjdMail);
            if($('#tjd_chkafter').attr('checked')=='checked'){
                GM_setValue('tsm_jdchk',rtjdChk = 'checked');
            }else{
                GM_setValue('tsm_jdchk',rtjdChk = false);
            }
            if($('#tjd_2pic').attr('checked')=='checked'){
                var jdplib = '26402'
            }else{
                var jdplib = '21183'
            }
            if($('#tjd_txttop').attr('checked')=='checked'){
                var jdtxtup = true;
            }else{
                var jdtxtup = false;
            }
            t_rtjdSend($('#tjd_user').val(),$('#tjd_mail').val(),$('#tjd_rttxt').val().replace(/(^\s*)|(\s*$)/g, ''),$('#tjd_rtimg').val(),jdplib,jdtxtup);
        });
        
        $('#tjd_update').click(function(){
            update(true);
        });
        $('#tjd_help').click(function(){
           window.open('http://userscripts.org/scripts/show/100253');
        });

        $('#tjd_cancel').click($.unblockUI);        
        $('.blockOverlay').click(function(){
            $.unblockUI();
        });
                  
}

function t_rtjdSend(sUser,sMail,sText,sImg,sPlib,isTxtup){
	var rtMsg='author='+encodeURIComponent(sUser)+'&email='+encodeURIComponent(sMail);
    if(sText!=''){
        var crlf='%0A';
    }else{
        var crlf='';
    }
    if(isTxtup){
        rtMsg += '&comment=' + encodeURIComponent(sText)+ crlf + encodeURIComponent('<img src="' + sImg + '">');
    }else{
        rtMsg += '&comment=' + encodeURIComponent('<img src="' + sImg + '">') + crlf + encodeURIComponent(sText);
    }
    rtMsg += '&comment_post_ID='+sPlib;
    t_rtHint(2);
    
    GM_xmlhttpRequest({
      method: 'POST',
      url: 'http://mofa.cc/wp-content/plugins/ajax-comments/ajax-comments-post.php',
      data: rtMsg,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Referer': 'http://' + document.domain,
      },
      onload: function(response){
        if(response.responseText.indexOf('Error: please fill the required fields (name, email)')>-1){
            t_rtHint(-1);
        }else if(response.responseText.indexOf('Error')>-1){
            t_rtHint(0);
        }else{
            t_rtHint(1);
            if(rtjdChk=='checked'){
                switch(sPlib){
                    case '26402':
                        window.open('http://mofa.cc')
                        break;
                    case '21183':
                        window.open('http://mofa.cc')
                        break;
                    default:
                        break;
                }
            }
            $.unblockUI();
        };
      },
      onerror: function(response){
        t_rtHint(0);
      }
    });    
};

function t_Settings(){
    var stop = (document.documentElement.clientHeight - 290-250) /2;
    var sleft = (document.documentElement.clientWidth - 600) /2;
            
    $.blockUI({
        message: t_set_html,
        css: {
                top: stop + 'px', 
                left: sleft + 'px',
                border: '',
                width: '625px',
                cursor: 'default',
        },
        overlayCSS:  { 
            backgroundColor: '#000', 
            cursor: 'pointer',
            opacity:         0.4 
        }             
    });
    $('#tsinam_setdiv input:radio').checkbox({cls:'t_jradbox',empty:cbemptyimg});
    $('#tsinam_setdiv input:checkbox').checkbox({cls:'t_jchkbox',empty:cbemptyimg});
    $('.blockPage').css('z-index',zTop);
    $('.t_set_ft a:first').text('MOFA.CC share v'+ tsinam_version + ' - forumz @ ' + t_rdate);
    $('.blockPage').css('background-color','transparent');
    $('#tsinam_setcancel').click($.unblockUI);
    $('.blockOverlay').click(function(){
        $.unblockUI();
    });
    if(timgLarge == 'checked'){
    	$('#tsinam_imgLarge').attr('checked','checked');
    }else{
    	$('#tsinam_imgMid').attr('checked','checked');
    }
    if(timgTitle == 'checked'){
    	$('#tsinam_setimgTitle').attr('checked','checked');
    }
    if(timgLock == 'checked'){
    	$('#tsinam_setimgLock').attr('checked','checked');
    }
    if(timgAction==1){
    	$('#tsinam_setimgAct').attr('checked','checked');
    }
    for(k=0;k<asetIrs.length;k++){
    	$('#'+asetIrs[k]).val(cuimgSet[k]);
    }
    $('.t_settrs').click(function(){
        var cid = $(this).attr('id');
        cid = cid.substring(cid.length-1)-1;
        $('#'+asetIrs[cid]).val(defimgSet[cid]);
    })
    $('.t_setnum').bind('keypress',function(e){
        var key = e.which;
        if(key!=13 && key!=8 && key!=0){
            var keychar = String.fromCharCode(key);
            reg = /[0-9]/;
            return reg.test(keychar);
        }
    });
    $('.t_setfloat').bind('keypress',function(e){
        var key = e.which;
        if(key!=13 && key!=8 && key!=0){
            var keychar = String.fromCharCode(key);
            reg = /[.0-9]/;
            return reg.test(keychar);
        }
    });
    $('#tsinam_setsave').click(function(){
    	if($('#tsinam_imgLarge').attr('checked')=='checked'){
    		GM_setValue('tsm_imglarge','checked');
    	}else{
    		GM_setValue('tsm_imglarge',false);
    	}
    	if($('#tsinam_setimgTitle').attr('checked')=='checked'){
    		GM_setValue('tsm_imgtitle','checked');
    	}else{
    		GM_setValue('tsm_imgtitle',false);
    	}
    	if($('#tsinam_setimgLock').attr('checked')=='checked'){
    		GM_setValue('tsm_imglock','checked');
    	}else{
    		GM_setValue('tsm_imglock',false);
    	}
    	if($('#tsinam_setimgAct').attr('checked')=='checked'){
    		GM_setValue('tsm_imgact','1');
    	}else{
    		GM_setValue('tsm_imgact','0');
    	}
		if(parseInt($('#'+asetIrs[3]).val())<=1000){$('#'+asetIrs[3]).val('10001');}
    	GM_setValue('tsm_scsetp',$('#'+asetIrs[0]).val());
    	GM_setValue('tsm_scmin',$('#'+asetIrs[1]).val());
    	GM_setValue('tsm_scmax',$('#'+asetIrs[2]).val());
    	GM_setValue('tsm_ztop',$('#'+asetIrs[3]).val());
		t_getSettings();
    	$.unblockUI();
    });
    $('#tsinam_update').click(function(){
        update(true);
    });
    $('#tsinam_help').click(function(){
       window.open('http://userscripts.org/scripts/show/100253');
    });
}

function t_FRshow(){
    var sleft = (document.documentElement.clientWidth - 620 ) /2;
            
    $.blockUI({
        message: '<div class="t_showframe t_txtshow t_frshow">感谢使用 MOFA.CC share 脚本，更多功能选项可通过右上角的【账号】菜单的【MOFA.CC share】进行设置</div>',
        css: {
                width: '600px',
                left: sleft + 'px',
                border: '',
                cursor: 'default',
                backgroundColor: '#fff'
        },
        overlayCSS:  {
            backgroundColor: '#000',
            cursor: 'pointer',
            opacity: 0.4
        }
        
    });
    $('.blockOverlay').css('z-index',zTop-100);
    $('.blockPage').css('z-index',zTop);
    $('.blockPage').css('background-color','transparent');
    $('.blockOverlay').click(function(){
        $.unblockUI();
    });
    GM_setValue('tsm_fr','0');
}

function t_rtHintpos(){
    var iW = $('#tsinam_rthint').width() +20;
    var iH = $('#tsinam_rthint').height() +10;
    var ileft = (document.documentElement.clientWidth - iW)/2;
    $('#tsinam_rthint').css('top',(document.documentElement.clientHeight - iH -200)/2+'px').css('left',ileft+'px').css('z-index',zTop+2000);
}

function t_rtHint(iMode){
    var hint = '';
    switch(iMode){
        case -1:
            hint = '发送失败，请填写称呼和邮箱后重试';
            break;
        case -2:
            hint = '称呼、邮箱和图片网址都是必填项';
            break;
        case 3:
        	hint = '加载更多图片，请稍候...';
        	break;
       	case 4:
       		hint = '正在打开下一页，请稍候';
       		break;
       	case 5:
       		hint = '请手动翻页';
       		break;
        case 0:
            hint = '发送失败，请重试';
            break;
        case 1:
            hint = '发送成功';
            break;
        case 2:
            hint = '发送中，请稍候';
            break;
        default:
            break;
    }
    if($('#tsinam_rthint').length==0){
        $('<div id="tsinam_rthint" class="t_rthint_n">'+ hint +'</div>').appendTo('body').hide();
        t_rtHintpos();        
    }
    if(iMode >1 && iMode!=5){
        $('#tsinam_rthint').show();
    }else{
        $('#tsinam_rthint').fadeOut(100,function(){
            $('#tsinam_rthint').text(hint);
            t_rtHintpos();
            var hold = 1500;
            if(iMode<=0){
                $('#tsinam_rthint').removeClass('t_rthint_n').addClass('t_rthint_f');
                hold = 2500;
            }
            $('#tsinam_rthint').fadeIn(200,function(){
                setTimeout(t_rtHintOut,hold);
            });
        });
    }
}

function t_rtHintOut(){
    $('#tsinam_rthint').fadeOut(200,function(){
        $('#tsinam_rthint').remove();
    });
}

//helper method to auto update
function autoUpdateFromUserscriptsDotOrg(SCRIPT) {
  
  // Update code from Junk Blocker: http://loonyone.livejournal.com/
  // usage example
  // autoUpdateFromUserscriptsDotOrg({
  //   url: 'http://userscripts.org/scripts/source/688.user.js',
  //   version: "1.2",
  // });

  try {
    if (!GM_getValue) return; // Older version of Greasemonkey. Can't run.

    // avoid a flood of dialogs e.g. when opening a browser with multiple tabs set to homepage
    // and a script with * includes or opening a tabgrop
    var DoS_PREVENTION_TIME = 2 * 60 * 1000;
    var isSomeoneChecking = GM_getValue('CHECKING', null);
    var now = new Date().getTime();
    GM_setValue('CHECKING', now.toString());

    if (!SCRIPT.forceUpdate && isSomeoneChecking && (now - isSomeoneChecking) < DoS_PREVENTION_TIME) return;

    // check daily
    var ONE_DAY = 24 * 60 * 60 * 1000;
    //var ONE_WEEK = 7 * ONE_DAY;
    //var TWO_WEEKS = 2 * ONE_WEEK;
    var lastChecked = GM_getValue('LAST_CHECKED', null);
    if (!SCRIPT.forceUpdate && lastChecked && (now - lastChecked) < ONE_DAY) return;

    GM_xmlhttpRequest({
      method: 'GET',
  	  url: SCRIPT.url.replace('.user.','.meta.') + '?'+new Date().getTime(), // don't increase the 'installed' count just for update checks
  	  headers: {'Cache-Control': 'no-cache'},
  	  onload: function(result) {
    	  if (!result.responseText.match(/@version\s+([\d.]+)/)) return;     // did not find a suitable version header
    
    	  var theOtherVersion = parseFloat(RegExp.$1);
    	  if (theOtherVersion <= parseFloat(SCRIPT.version))       
        {
          // no updates or older version on userscripts.orge site
          if(SCRIPT.forceUpdate)
          {
            alert("您当前所安装的 v" + SCRIPT.version + " 是最新版本，无需更新。")
          }
          return;
        }
        //find the name of the script
        result.responseText.match(/@name\s+(.+)/);
        var scriptName = RegExp.$1;
        result.responseText.match(/@updateinfo\s+(.+)/);
        var updateInfo = RegExp.$1;
		updateInfo = updateInfo.replace(/\|/g,'<br>');
		t_showUpdate(scriptName,SCRIPT.version,theOtherVersion,updateInfo,SCRIPT.web,SCRIPT.url);
  	 }
    });
    GM_setValue('LAST_CHECKED', now.toString());
  } catch (ex) {
  }
}

function t_showUpdate(p_name,p_cur_ver,p_new_ver,p_updateinfo,p_weburl,p_scripturl){
    var stop = (document.documentElement.clientHeight - 500) /2;
    var sleft = (document.documentElement.clientWidth - 425) /2;
    $.blockUI({
        message: '<div id="tmo_updatediv"class="t_showframe"><div class="t_setdiv"align="center"><div style="padding-top:5px;padding-bottom:5px;"><b>更新提示</b></div><table class="t_set_tb"border="0"cellspacing="0"cellpadding="0"width="90%"><thead><tr><td colspan="2"align="left"><b>脚本：'+p_name+'</b></td></tr></thead><tr><th style="width:20%;">当前版本</th><td style="width:80%;">'+p_cur_ver+'</td></tr><tr><th>最新版本</th><td>'+p_new_ver+'</td></tr><tr><th>更新内容</th><td class="t_upinfo">'+p_updateinfo+'</td></tr><tfoot><tr><td colspan="2"style="line-height:15px">提示：脚本更新安装完毕后请刷新当前页面</td></tr></tfoot></table><div class="t_set_ft t_setftbtn"style="width:95% text-align:center;"><span id="tmo_update"class="t_setbtn t_upbtn">更新</span>　<span id="tmo_upcancel"class="t_setbtn">取消</span>　<span id="tmo_help"class="t_setbtn">帮助</span></div></div></div>',
        css: {
                top: stop + 'px', 
                left: sleft + 'px',
                border: '',
                width: '425px',
                cursor: 'default',
        },
        overlayCSS:  { 
            backgroundColor: '#000', 
            cursor: 'default',
            opacity:0.4 
        }
    });
    $('.blockPage').css('background-color','transparent');
    $('.blockPage').css('z-index',zTop);
    $('#tmo_update').click(function(){
    	GM_openInTab(p_scripturl);
    });
    $('#tmo_upcancel').click($.unblockUI);
    $('#tmo_help').click(function(){
    	GM_openInTab(p_weburl);
    });
}

function update(forceUpdate)
{
  autoUpdateFromUserscriptsDotOrg({
    url: 'http://userscripts.org/scripts/source/100253.user.js',
    version: tsinam_version,
    forceUpdate: forceUpdate,
    web: 'http://userscripts.org/scripts/show/100253'
  });
}

update(false);

if(GM_registerMenuCommand){
	GM_registerMenuCommand('从 userscript.org 更新 MOFA.CC share',function(){update(true)});
}
