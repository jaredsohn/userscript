// ==UserScript==
// @name           RapidShare Helper
// @include        http://rapidshare.de/*
// @include        http://*.rapidshare.de/*
// @include        http://rapidshare.com/*
// @include        http://*.rapidshare.com/*
// @exclude        http://rapidshare.com/index.html
// @exclude        http://rapidshare.com/rewards.html
// @exclude        http://rapidshare.com/news.html
// @exclude        http://rapidshare.com/supportseite.html
// @exclude        http://rapidshare.com/freezone.html
// @exclude        http://ssl.rapidshare.*/*
// @exclude        http://*.rapidshare.de/*/progress.html
// ==/UserScript==

var timetowait = 9999;

function updatetimer()
{
    if(timetowait>0 || (document.getElementById("captcha") && document.getElementById("captcha").value.length!=3)) {
        timetowait=timetowait-0.1;
        document.getElementById("ttime").innerHTML=timetowait.toFixed(1);
        if(timetowait<0) timetowait=0;
        setTimeout(updatetimer,100);
    } else {
        document.forms[0].submit();
    }
}

function postToURL(url, values)
{
    values = values || {};

    var form = document.createElement("form");
    form.setAttribute("action", url);
    form.setAttribute("method", "POST");
    form.setAttribute("style", "display: none");
    for (var property in values)
    {
        if (values.hasOwnProperty(property))
        {
            var inp = document.createElement("input");
            inp.setAttribute("type","hidden");
            inp.setAttribute("name",property);
            inp.setAttribute("value",values[property]);
            form.appendChild(inp);
        }
    }
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}


function retry(time)
{
    history.go(-1);
}

function rand(start,end)
{
    return (start+Math.random()*(end-start)).toFixed(0);
}

var cont = document.body.innerHTML.toLowerCase();
var p = new String(document.location);

if(p.indexOf("rapidshare.de")>-1) {
    if(p.indexOf("uploadjs.cgi")==-1) {
        var sIndex=p.indexOf("/files/");
        if (sIndex>0)
        {
            postToURL('http://rapidshare.de',{uri: p.substr(sIndex), "dl.start": "Free"});
        }
        else if (secret=cont.match("[0-9a-fA-F%]{40,}")) //Download page
        {
            timetowait=window.c;
            //unsafeWindow.c=0;
            secret=unescape(secret);
            //alert(secret);
            document.body.innerHTML ='<div id="form" style="width:300px;margin:auto;margin-top:50px;"><div style="font-size:1.2em">Download starts in <b id="ttime">' + timetowait + '</b> seconds</div>';
            document.body.innerHTML+='</div><div id="dl" style="display:none"></div>';
            document.getElementById("dl").innerHTML = secret;
            var fDiv=document.getElementById("form");
            fDiv.innerHTML+='<form id="dlf" name="dlf" action="' + document.forms[0].action + '" method="post">';
            fDiv.innerHTML+='</form>';
            
            var form=document.getElementById("dlf");
            var inp = document.createElement("input");
            inp.setAttribute("type","image");
            inp.setAttribute("src",document.images[0].src);
            inp.setAttribute("name","actionstring");
            inp.setAttribute("id","Download");
            form.appendChild(inp);
            var inp = document.createElement("input");
            inp.setAttribute("type","text");
            inp.setAttribute("name","captcha");
            inp.setAttribute("id","captcha");
            form.appendChild(inp);
            document.getElementById("captcha").focus();
            document.body.removeChild(document.getElementById("dl"));
            updatetimer();
        } else if(cont.indexOf('is already downloading a file')!=-1) {
            document.body.innerHTML='<div style="font-size:1.2em;width:300px;margin:auto;margin-top:50px;">You are already downloading a file.<br /> Automatic retry in <b id="ttime">120</b> seconds.</div>';
            retry(120); // retrying in 5 min
        }
        else if(cont.indexOf('download limit exceeded')!=-1)
        {
            document.body.innerHTML='<div style="font-size:1.2em;width:300px;margin:auto;margin-top:50px;">Error occured.<br /> Automatic retry in <b id="ttime">120</b> seconds.</div>';
            retry(120); // retrying in 5 min
        }
    }
} else {
    if (nexturl=cont.match('<form id="ff" action="(http:\/\/[^"]+)"'))
    {
        postToURL(nexturl[1],{"dl.start": "Free"});
    }
    else if (nexturl=cont.match('<form name="dlf" action="(http:\/\/[^"]+)'))
    {
        timetowait=window.c;
        document.body.innerHTML ='<div style="font-size:1.2em;width:300px;margin:auto;margin-top:50px;">Download starts in <b id="ttime">' + timetowait + '</b> seconds</div>';
        document.body.innerHTML+='<form id="dlf" name="dlf" action="' + nexturl[1] + '" method="post"></form>';
        var form=document.getElementById("dlf");
        var inp = document.createElement("input");
        inp.setAttribute("type","hidden");
        inp.setAttribute("name","mirror");
        inp.setAttribute("value","on");
        form.appendChild(inp);
        var inp = document.createElement("input");
        inp.setAttribute("type","hidden");
        inp.setAttribute("name","x");
        inp.setAttribute("value",rand(10,100));
        form.appendChild(inp);
        var inp = document.createElement("input");
        inp.setAttribute("type","hidden");
        inp.setAttribute("name","y");
        inp.setAttribute("value",rand(10,100));
        form.appendChild(inp);
        updatetimer();
    }
    else
    {
        if(details=cont.match('or try again in about ([0-9]+) minutes')) {
            document.body.innerHTML='<div style="font-size:1.2em;width:300px;margin:auto;margin-top:50px;">Wait <b id="ttime">' + (details[1]*60) + '</b> seconds for retry</div>';
            retry(details[1]*60);
        } else if(cont.indexOf('is already downloading a file')!=-1) {
            document.body.innerHTML='<div style="font-size:1.2em;width:300px;margin:auto;margin-top:50px;">You are already downloading a file.<br /> Automatic retry in <b id="ttime">120</b> seconds.</div>';
            retry(120); // retrying in 5 min
        }
    }
}

function retry(time) {
    if(time>0) {
        document.getElementById('ttime').innerHTML=time;
        time--;
        setTimeout('retry('+time+')',1000);
    } else {
        window.location.reload();
    }
}
