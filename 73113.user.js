// ==UserScript==
// @name           RLSlog TimeChanger
// @namespace      listorioslinkwechsler
// @description    Changes the posttime to your Timezone on rlslog.net
// @include        http://*rlslog.net/*
// ==/UserScript==
var timezone=new Date().getTimezoneOffset();
//alert(timezone);
var allDivs=document.getElementsByTagName('div')
//alert(allDivs.length);
for (var i = 0; i < allDivs.length; i++)
    {
    var hit=allDivs[i].innerHTML.match(/(\d{2})\.(\d{2})\.(\d{4}) at (\d{2}):(\d{2})/gi);
    //alert(allDivs[i].className);
    if (hit && allDivs[i].className=='entrymeta')
        {
        nDate = new Date(RegExp.$3, RegExp.$2-1, RegExp.$1, RegExp.$4, RegExp.$5, 0);
        timeOffset=(-60-timezone)*60*1000
        nDate.setTime(nDate.getTime()+timeOffset);
        allDivs[i].innerHTML=allDivs[i].innerHTML.replace(hit,
        nDate.getDate() +'.' + (nDate.getMonth()+1) + '.'+ nDate.getFullYear()
        + ' at ' + nDate.getHours() + ':' + nDate.getMinutes())
        }
    }
