// ==UserScript==
// @name           Coppermine Photo Gallery
// @namespace      http://blog.wu-boy.com/2008/04/01/165/
// @description    Expand Coppermine Photo Gallery album
// @homepage       http://blog.wu-boy.com/2008/04/01/165/  
// @include        http://pic.segaa.net/thumb*
// ==/UserScript==


function album_expander($)
{
    var imgs = "";
    imgs = "<div align='center'>";
    $(".thumbnails").each(function() {
      var a = $("a", this);
      var alink = a.attr("href");
      if(typeof alink != "undefined")
      {
        var img = $("img", this);
	var imgsrc = img.attr("src").replace(/thumb/gi, "normal");
        imgs += "<a href='" + alink + "'><img alt='' src='" + imgsrc + "'></a><br />";
      }

    });
    imgs += "</div>";
    $("table").slice(6,7).html(imgs);
}

function GM_wait()
{
    if (typeof unsafeWindow.jQuery == "undefined")
      window.setTimeout(GM_wait, 100);
    else
      album_expander(unsafeWindow.jQuery);
}

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-latest.pack.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName("head")[0].appendChild(GM_JQ);

GM_wait();