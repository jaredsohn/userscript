// ==UserScript==
// @version       0.1
// @name          AutoTaobaoKe
// @description   淘宝客自主推广
// @namespace     lxyu
// @include       http://detail.tmall.com/item.htm*
// @include       http://item.taobao.com/item.htm*
// @include       http://u.alimama.com/union/spread/common/allCode.htm*
// @include       http://www.alimama.com/user/base_info.htm*
// @grant         GM_log
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_deleteValue
// ==/UserScript==


var gm_config_info=["----------","TaoBaoKe GM CONFIGS:","  TBK_PID: "+GM_getValue("TBK_PID"),"  TBK_ITEM_URL: "+GM_getValue("TBK_ITEM_URL"),"----------"].join("\n");GM_log(gm_config_info);var path=function(){var a=document.createElement("a");a.href=document.URL;return a.hostname+a.pathname}();if(path==="item.taobao.com/item.htm"||path==="detail.tmall.com/item.htm"){var pid=GM_getValue("TBK_PID");if(pid===undefined){GM_log("tbk pid undefined.");GM_setValue("TBK_ITEM_URL",document.URL);window.location="http://www.alimama.com/user/base_info.htm"}else{var params=function(){var d={};var c=window.location.search.substring(1);var e=c.split("&");for(var b=0;b<e.length;b++){var f=e[b].split("=");if(typeof d[f[0]]==="undefined"){d[f[0]]=f[1]}else{if(typeof d[f[0]]==="string"){var a=[d[f[0]],f[1]];d[f[0]]=a}else{d[f[0]].push(f[1])}}}return d}();if(params.ali_trackid===undefined||params.ali_trackid.indexOf(pid)===-1){window.location="http://u.alimama.com/union/spread/common/allCode.htm?specialType=item&auction_id="+params.id}}}else{if(path==="u.alimama.com/union/spread/common/allCode.htm"){(function loop(a){setTimeout(function(){document.getElementById("J_urlRadio").click();var b=document.getElementById("J_codeArea").value;if(b.indexOf("http://s.click.taobao.com")===0){window.location=b}else{if(--a){GM_log("get taobaoke url failed, will try again");loop(a)}}},616)})(5)}else{if(path==="www.alimama.com/user/base_info.htm"){var pid=document.getElementById("J_baseInfoForm").getElementsByTagName("span")[1].innerHTML;if(pid!==undefined&&pid!==""){GM_log("Got pid from user info: "+pid);GM_setValue("TBK_PID",pid)}var item_url=GM_getValue("TBK_ITEM_URL");GM_deleteValue("TBK_ITEM_URL");if(item_url!==undefined&&item_url.indexOf("alimama.com")===-1){GM_log("redirect back to item page: "+item_url);window.location=item_url}}}};