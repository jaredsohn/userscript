// ==UserScript==
// @name           Digg Me Later v1.0 (Perry-mod)
// @namespace      http://blog.dujodu.com
// @description    Save the Digg!
// @include    *
// @exclude	http://*digg.com*
// ==/UserScript==

// only execute if the link has come from digg

if(((document.referrer.indexOf("http://www.digg.com") == 0) || (document.referrer.indexOf("http://digg.com") == 0)) == true) {
    
    var imgIcon = 'http://i8.tinypic.com/89k0944.png';
    
    var imgClose = 'http://i4.tinypic.com/7wa9jic.png';
    
    // intercept click event for closing bar
    document.addEventListener ('click', function(event) {
        if(event.target == document.getElementById("diggMeLaterClose")) {
            var e = document.getElementById('diggMeLater');
            e.parentNode.removeChild (e);
            document.body.style.paddingTop = '0';
        }
    }, true);
    
    // don't execute inside of iframes (otherwise it gets caught by advertisements)
    if(parent.location.href ) {
            var u = window.location.href;
            if (location.hostname.indexOf("duggmirror.com") > -1) u = location.href.replace(/duggmirror\.com/, "digg.com");
            var diggMeLater = document.createElement("div");
            diggMeLater.innerHTML = '<div id="diggMeLater" style="background:#1b5891;text-align:right;border-bottom: 1px solid #888888;margin-bottom:5px;padding:5px;position:fixed;width:100%;top:0;left:0;z-index:99999;display:block;">'+
            '<a href="http://www.digg.com/"><img id="diggMeLaterIcon" style="padding:0; margin:1px 0 0 5px; line-height:0; float:left; border:0;" /></a>'+
            '<img id="diggMeLaterClose" style="padding:0; margin:1px 15px 0 0; line-height:0; float: right; border:0; cursor: pointer;" />'+
            "<iframe src='http://digg.com/tools/diggthis.php?u="+escape(u)+"&k=1b5891&s=compact' style='height:18px; width:120px;margin: 4px 4px 0 0;float:right;' frameborder='0' scrolling='no'></iframe>"+
            '</div>';
            document.body.style.paddingTop = '29px';
            document.body.insertBefore(diggMeLater, document.body.firstChild);
            var diggMeLaterIcon = document.getElementById("diggMeLaterIcon");
            var diggMeLaterClose = document.getElementById("diggMeLaterClose");
            
            diggMeLaterIcon.src = imgIcon;
            diggMeLaterClose.src = imgClose;
    }
}