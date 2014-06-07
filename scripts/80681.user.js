// ==UserScript==
// @name            SVZ Werbung entfernen
// @author          JaSK
// @description     Entfernt nervige Werbung.
// @include         http://schuelerVZ.net/*
// @include         http://*.schuelerVZ.net/*
// @include         http://*.studiVZ.net/*
// @include         http://studiVZ.net/*
// @include         http://*.meinvz.net/*
// @include         http://meinvz.net/*
// ==/UserScript==



unsafeWindow.showBackground = false;

unsafeWindow.Phx.Ads.initBackgroundAds = function(o,n,b,f) {return;};


var adfarm = document.getElementsByTagName('script');
if (adfarm != null)
{
    var text = "";
    for (var i = 0; i < adfarm.length; i++)
    {
        text = adfarm.item(i).innerHTML;
       // if(text.search(/src="http://studivz.adfarm1.adition.com/banner?/i) != -1)
        if(text.search(/studivz.adfarm1.adition/i) != -1)
        {
            //alert(adfarm.item(i).innerHTML);
            adfarm.item(i).innerHTML = '';
            adfarm.item(i).parentNode.removeChild(adfarm.item(i));
        }
        //alert(adfarm.item(i).innerHTML);
    }
}

var ad = document.getElementById('Grid-Advertising-Top');
if (ad != null)
{
    while (ad.hasChildNodes())
    {
        ad.removeChild(ad.firstChild)
    }
    ad.parentNode.removeChild(ad);
}

ad = document.getElementById('wallpaperTop');
if (ad != null) {
    while (ad.hasChildNodes()) {
        ad.removeChild(ad.firstChild)
    }
    ad.parentNode.removeChild(ad);
}

ad = document.getElementById('wallpaperRight');
if (ad != null) {
    while (ad.hasChildNodes()) {
        ad.removeChild(ad.firstChild)
    }
}
ad = document.getElementById('wallpaperLeft');
if (ad != null) {
    while (ad.hasChildNodes()) {
        ad.removeChild(ad.firstChild)
    }
}


ad = document.getElementById('ad440x45');
if (ad != null) {
    ad.parentNode.removeChild(ad);
}

var wmbox = document.getElementById('wfb-wm-snippet');
if (wmbox != null) {
    wmbox.parentNode.removeChild(wmbox);
}

var ad = document.getElementById('ad440x340');
if (ad != null) {
    ad.parentNode.removeChild(ad);
}

ad = document.getElementById('ad280x25');
if (ad != null) {
    ad.parentNode.removeChild(ad);
}

for (var i=2; i<4;i++)
{
    adad280x25 = document.getElementById('ad280x25_'+i);
    if (adad280x25 != null)
    {
        adad280x25.parentNode.removeChild(adad280x25);
    }
}

ad = document.getElementById('ad280x50');
if (ad != null) {
    ad.parentNode.removeChild(ad);
}

ad = document.getElementById('ad125x125');
if (ad != null) {
    ad.parentNode.removeChild(ad);
}

ad = document.getElementById('ad440x340');
if (ad != null) {
    ad.parentNode.removeChild(ad);
}

ad = document.getElementById('ad440x110');
if (ad != null) {
    ad.parentNode.removeChild(ad);
}

var polls = document.getElementsByClassName('poll-container');
if (polls != null) {
    for (var i=0;i<polls.length;i++) {
        polls[i].parentNode.removeChild(polls[i]);
    }
}









unsafeWindow.backgroundAdvUrl = 'www.google.de';
unsafeWindow.backgroundColor = '#0F0FFF';


//function onReady() { Phx.Ads.initBackgroundAds(backgroundColor,"", backgroundAdvUrl,""); }

/*
initBackgroundAds:function(o,n,b,f)
{
    var c=$("#Grid-Page");
    var k=$("#Grid-Advertising-Top");
    var j=$("#Grid-Page-Left");
    var g=$("body");
    var a=$("#Grid-Wrapper");
    var m=$("#wallpaperRight");
    var h=$("#wallpaperTop");
    var e=$("#wallpaperExtension");
    var l=$("#ad728x90");
    var d=$("#Grid-Advertising-Right");

    g.css("background-color",o);
    if(!$.browser.opera)
    {
        g.css("cursor","pointer");
    }
    if(!$.browser.msie)
    {
        g.css("height",$(document).height())
    }

    a.css({width:"970px",cursor:"auto"});
    l.css({width:"810px",cursor:"pointer",margin:"0 160px 0 0"});
    h.css({width:"810px",left:"0px",padding:"0 0 0 40px"});
    m.css("left","810px");
    c.css({padding:"9px",border:"1px solid #ccc"});
    j.css({left:"9px"});
    d.css({"z-index":"-1"});
    k.css("margin-bottom","0");

    if(n!==null&&n!="")
    {
        g.css("background-image","url("+n+")");

        switch(f)
        {
        case 1:
            g.css("background-repeat","no-repeat");
            break;
        case 2:
            g.css("background-repeat","repeat-x");
            break;
        case 3:
            g.css("background-repeat","repeat-y");
            break;
        default:
            break
        }
    }

    $(document).click(function(p)
      {
          switch(p.target)
          {
          case document.body:
          case document.documentElement:
          case m[0]:
          case l[0]:
          case e[0]:
              Phx.Event.stop(p);
              window.open(b,"newWin").focus();
          default:
              return
          }
      }
    )
}

*/

//unsafeWindow.Phx.Ads.initBackgroundAds:function(o,n,b,f) {return;};
