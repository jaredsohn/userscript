// ==UserScript==
// @name           FH2
// @namespace      http://114.32.51.232
// @description    FH2
// @include        http://114.32.51.232/*
// ==/UserScript==
//var GM_JQ = document.createElement('script');
//GM_JQ.src = 'http://userscripts.org/scripts/source/118049.user.js';
//GM_JQ.type = 'text/javascript';
//document.getElementsByTagName('head')[0].appendChild(GM_JQ);

Main();

function Main()
{
    if (location.href.indexOf('top.cgi') != -1) log();
    if(wait()) return;
    if (location.href.indexOf('top.cgi') != -1)
    {
        if(hp() < 0.5)
        {
            QK();
            return;
        }
        setTimeout(battle1,1200+Math.random()*3000);
        return;    
    }
    if (location.href.indexOf('town.cgi') != -1 && parent.menu.document.getElementById('battle').innerHTML)
    {
        setTimeout(azuke,1000);
        return;
    }
    if (location.href.indexOf('town.cgi') != -1)
    {
        setTimeout(QKOK,1300);
        return;
    }
    if (location.href.indexOf('battle.cgi') != -1)
    {
        var table = document.getElementsByTagName('table');
        parent.menu.document.getElementById('battle').innerHTML = table[table.length-3].innerHTML ;
        document.getElementsByTagName('form')[parseInt(Math.random()*2)].submit();
        return;
    }
    
    if (location.href.indexOf('menu.cgi') != -1)
    {
        document.body.innerHTML += '<div id="battle" style="display:none">ccc</div>';
        alert("OK");
        return;
    }
    //alert(location.href);
}

function wait()
{
    if (!document.getElementById("tok")) return 0;
    if(document.getElementById("tok").innerHTML.indexOf('ＯＫ') != -1) return 0;
    
    setTimeout(Main,1300);
    return 1;
}
function azuke()
{
    if (!document.getElementsByName('azuke')) return;
        document.getElementsByTagName('form')[0].submit();
}

function QK()
{
    if (!document.getElementById('shop2')) return;
    document.getElementById('shop2').checked = true;
    document.getElementsByTagName('form')[1].submit();
}
function QKOK()
{
    var td = document.getElementsByTagName('input');
    for(i=0;i<td.length;i++)
    {
        if (td[i].value == "　離　開　旅　館　")
        {
            document.getElementsByTagName('form')[0].submit();
            return;
        }
    }
}

function hp()
{
    var td = document.getElementsByTagName('font');
    if (!td) return 0;
    var flag = td.length;
    for(i=0;i<td.length;i++)
    {
        if (td[i].innerHTML.indexOf('ＨＰ') != -1) flag = i+1
        if (i == flag)
        {
            var result = /([\d]*)／([\d]*)/.exec(td[i].innerHTML);
            if (!result || !result.length || !result[2]) return 0;
            return result[1]/result[2];
        }
    }

    return 0;
}

function log()
{
    if (document.getElementsByTagName('table')[5] && parent.menu.document.getElementById('battle').innerHTML)
    {
        document.getElementsByTagName('table')[5].innerHTML = parent.menu.document.getElementById('battle').innerHTML;
        parent.menu.document.getElementById('battle').innerHTML = "";
    }
    return 0;    
    
}

function battle1()
{
    
    if(document.getElementById('barea11'))
    {
       document.getElementById('barea11').checked = true;
       document.getElementsByTagName('form')[0].submit();
       return;
    }
    for(i=1;i<10;i++)
    {
        if(document.getElementById('barea'+i))
        {
            document.getElementById('barea'+i).checked = true;
            document.getElementsByTagName('form')[0].submit();
            return;
        }
    }
}