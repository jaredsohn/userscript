// ==UserScript==
// @name           Ogame - how much time left to fill up magazines on current production
// @namespace      ogameresourcesproductiontime
// @description    Wyswietla ile jeszcze zostalo czasu do zapelnienia magazykow przy aktualnej produkcji
// @include        http://*.ogame.*
// ==/UserScript==

unsafeWindow.console.log();
function getinfo(type)
{
    var patt1=/\'>(.*?)<\/span/gi;
    var xxx = document.getElementById(type+'_box').title.match(patt1);
    xxx[0] = document.getElementById('resources_'+type).innerHTML;
    for(i in xxx)
        xxx[i] = xxx[i].replace(/[^0-9]+/g, '');
    if(document.getElementById(type+'hours'))
    {
        if(xxx[2]> 0 )
            time = ((xxx[1]-xxx[0])/xxx[2]).toFixed(2);
        else
            time = 0;
        var linklist = document.getElementById(type+'hours');
        linklist.innerHTML = time+'h';
    }
    else
    {
        var linklist = document.getElementById(type+'_box').childNodes[3];
        if(xxx[2]> 0 )
            time = ((xxx[1]-xxx[0])/xxx[2]).toFixed(2);
        else
            time = 0;
        var newlink = document.createElement('div');
        newlink.style.color =  '#0b0';
        newlink.id = type+'hours';
        newlink.innerHTML = time+'h';        
        linklist.appendChild(newlink);
    }
}
setInterval(getinfo, 10000, 'metal');
setInterval(getinfo, 10000, 'crystal');
setInterval(getinfo, 10000, 'deuterium');
getinfo('metal');
getinfo('crystal');
getinfo('deuterium');
shipeneededtotakeallsura();
allsura();
function allsura()
{
    var res = planetsura();
    m = document.URL.match(/cp=[\d]{7,10}/g);
    if(m){
        var  v = m[0].split('='); 
        localStorage['i'+parseInt(v[1])] = JSON.stringify(res);
    }
    var meta = 0;
    var kris = 0;
    var dex = 0;
    for(i in localStorage)
    {
        if(i[0] == 'i')
        {
            sura = JSON.parse(localStorage[i]);
            meta += sura[0];
            kris += sura[1];
            dex += sura[2];
        }
    }
    var topInfoxxx = document.getElementById('topInfoxxx');
    topInfoxxx.innerHTML = topInfoxxx.innerHTML+"&nbsp;&nbsp;&nbsp;M:"+addCommas(meta)+'&nbsp;&nbsp;K:'+addCommas(kris)+'&nbsp;&nbsp;D:'+addCommas(dex);
}


function addCommas(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
}



function planetsura()
{
    var resources = [];
    resources.push(document.getElementById('resources_metal').innerHTML,
        document.getElementById('resources_crystal').innerHTML,
        document.getElementById('resources_deuterium').innerHTML);
    for(i in resources)
        resources[i] = parseInt(resources[i].replace(/[^0-9]+/g, ''));
    return resources;
    
}
function shipeneededtotakeallsura()
{
    
    var helper = document.getElementById('helper');
    var resources = [];
    resources.push(document.getElementById('resources_metal').innerHTML,
        document.getElementById('resources_crystal').innerHTML,
        document.getElementById('resources_deuterium').innerHTML);
    for(i in resources)
        resources[i] = parseInt(resources[i].replace(/[^0-9]+/g, ''));
    var neededships = document.createElement('div');
    neededships.id = 'topInfoxxx';
    neededships.style.color =  '#6F9FC8';
    neededships.style.backgroundColor =  '#0D1014';
    neededships.style.paddingTop =  '4px';
    neededships.style.height =  '18px';
    neededships.style.fontSize =  '11px';
    neededships.style.fontWeight =  900;
    neededships.style.textAlign = 'center';
    neededships.style.position = 'relative';
    neededships.style.top = '-20px';
    var allsura = resources[0]+resources[1]+resources[2];
    var text = 'DT: '+addCommas((allsura/25000).toFixed(0))+'&nbsp;&nbsp;'+'MT: '+addCommas((allsura/5000).toFixed(0));
    neededships.innerHTML = text;  
    helper.appendChild(neededships,helper.firstChild);
}
