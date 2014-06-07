// ==UserScript==
// @name           切换　+　弹幕地址
// @namespace      Aristotle9
// @include        http://220.170.79.48/*
// @include        http://124.228.254.234/*
// @include        http://acfun.cn/*
// @include        http://www.acfun.cn/*
// ==/UserScript==

var sel=document.getElementById("dedepagetitles");
if(sel)
{
    sel.setAttribute("onchange","window.open(this.options[this.selectedIndex].value);");
}

var em = document.getElementsByTagName('embed');
if(em.length>0)
{
    var flash = em[0];
    var fvars=flash.getAttribute('flashvars');
    if (fvars)
        fvars +=  '&' + flash.getAttribute('src');
    else
        fvars = flash.getAttribute('src');
    var file = '';
    var id = '';
    if(fvars.match(/file=([^&]+)/i))
    {
        file = RegExp.$1;
    }
    if(fvars.match(/id=([^&'"]+)/i))
    {
        id = RegExp.$1;
    }
    if(fvars.match(/(player[^\/]*\.swf)/i))
    {
        player = RegExp.$1;
    }

    var a = document.createElement('a');
    a.setAttribute('href','/newflvplayer/xmldata/' + id +'/comment_on.xml');
    a.setAttribute('title','右键另存为即可');
    a.appendChild(document.createTextNode("下载弹幕"));
    if(sel) {
        sel.parentNode.appendChild(a);
    }
    else {
        var tds = document.getElementsByTagName('td');
        for(var i = 0; i< tds.length;i ++)
        {
            var dat = tds[i].innerHTML;
            if(dat.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} .*? 投稿/i))
            {
                tds[i].appendChild(a);
                break;
            }
        }
    }
}
