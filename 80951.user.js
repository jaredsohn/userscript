// ==UserScript==
// @name            SVZ Anti-Dereferer 2.0
// @author          JaSK
// @description     Die Zielseite wird direkt in einem neuen Tab/Fenster geöffnet ohne dass zuerst der Dereferer erscheint.
// @include         http://*.schuelervz.net/*
// @include         http://schuelervz.net/*
// @include         http://*.studivz.net/*
// @include         http://studivz.net/*
// @include         http://*.meinvz.net/*
// @include         http://meinvz.net/*
// ==/UserScript==


// d = url
// g = original link text
// h = class
// c = new link text (cut short if necessary)
if (unsafeWindow.Phx.Util.GetLinkTag != null)
{
    unsafeWindow.Phx.Util.GetLinkTag=function(d,g,e,b,h)
    {
        if((!d) || (d.indexOf("script:/") !== -1) || (d.indexOf("http") !== 0))
        {
            return""
        }

        var c;

        if(g.length>e-12)
        {
            c=g.substr(0,e-12)+"..."+g.substr(d.length-3)
        }
        else
        {
            c=g
        }

        h=h||"";
        return'<a href="'+d+'" rel="nofollow" target="_blank" '+h+'>'+c+'</a>';
    };
}


/*
unsafeWindow.Phx.Util.GetLinkTag=function(d,g,e,b,h)
{
    if((!d) || (d.indexOf("script:/") !== -1) || (d.indexOf("http") !== 0))
    {
        return""
    }

    var c;

    if(e&&g.length>e-12)
    {
        c=g.substr(0,e-12)+"..." + g.substr(g.length-3)
    }
    else
    {
        c=g
    }
    h=h||"";
    if(b)
    {
        var a="http://"+window.location.host+"/Link/Dereferer/?"+encodeURIComponent(d);var f='<a href="'+a+'" rel="nofollow" target="_blank" '+h+">"+c+"</a>";return f
    }
    else
    {
        return'<a href="'+d+'" rel="nofollow" target="_blank" '+h+">"+c+"</a>"
    }
};
*/



