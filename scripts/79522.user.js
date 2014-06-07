// ==UserScript==
// @name           RP modifier
// @namespace      Pokec.sk, nove, dizajn, redizajn, styl, reklama, RP
// @include        http://rpx.azet.sk/index.phtml?i9=*
// @include        http://rpx.azet.sk/?i9=*
// @include        http://pokec.azet.sk/sluzby/rp/*
// @date           2010-06-19
// @author         c-ice
// @version        0.2
// ==/UserScript==

{
    document.getElementById("rpBanner").parentNode.removeChild(document.getElementById("rpBanner"));
    
    var content = document.getElementById("content").cloneNode(true);

    while(document.body.firstChild.firstChild)
        document.body.firstChild.removeChild(document.body.firstChild.firstChild);
    document.body.firstChild.appendChild(content);
    
    var p = document.getElementsByTagName("p");
    for(var i=0; i < p.length; i++){
        if( p[i].className=="css_fotka" )
        {
            p[i].parentNode.style.marginTop="0px";
            p[i].style.display="none";
        }
        if( p[i].className=="css_usmev" )
        {
            p[i].parentNode.className="";
            p[i].parentNode.removeChild(p[i]);
        }
    }

    var vpisText = document.getElementsByTagName("fieldset");
    for(i=0; i < vpisText.length; i++){
        if (vpisText[i].parentNode.parentNode.className=="css_vpistext")
        {
            vpisText[i].style.width="65%";
            vpisText[i].style.marginLeft="65px";
            break;
        }
    }
    document.getElementById("rp_oldlinks").parentNode.removeChild(document.getElementById("rp_oldlinks"));
    resize(704,430);
    window.scroll(0,0);
    var pridajNick=document.getElementById("content_users").getElementsByTagName("div");
    for(i=0; i < p.length; i++){
        if( pridajNick[i].className == "css_pridajnick" )
        {
            pom= pridajNick[i].cloneNode(true);
            pom.setAttribute("style", "top: auto");
            pridajNick[i].parentNode.removeChild(pridajNick[i]);
            document.getElementById("contactList").parentNode.setAttribute("style", "margin-top: 0px;");
            document.getElementById("contactList").parentNode.insertBefore(pom, document.getElementById("contactList").nextSibling);
            break;
        }
    }
    var a = document.getElementsByTagName("a");
    a[a.length-1].parentNode.removeChild(a[a.length-1]);

    document.body.firstChild.setAttribute("class", "css_rptelo");
    document.body.firstChild.setAttribute("style", "background: #CEE6F2");
}

function resize(w,h) {
 if (parseInt(navigator.appVersion)>3) {
    top.resizeTo(w,h);
 }
}
