// ==UserScript==
// @name          del.icio.us skin
// @namespace     no webbie yet :(
// @description	  skins del.icio.us by dt
// @include       http://del.icio.us/*
// ==/UserScript==
// thanks to http://docs.g-blog.net/code/greasemonkey/PostAnUrlDammit.user.js 
//script helped me alot thanks :D 
//i cant figure out how to do multi line varibles so the a varible has no lines
(function() {
var dt = {
injectcss:function(css){
		    head = window._content.document.getElementsByTagName("head")[0];
            script = window._content.document.createElement("style");
            script.setAttribute("type", 'text/css');
		script.innerHTML = css;
		head.appendChild(script);
		}
		
		
       /* injectjava:function (jsCode)
        {
            head = window._content.document.getElementsByTagName("head")[0];
            script = window._content.document.createElement("script");
            script.setAttribute("type", 'text/javascript');
            script.innerHTML = jsCode;
            head.appendChild(script);
        }
*/
}


var a = (' DIV.delLeft, DIV.delRight, DIV.delRightTitle, DIV.delPostInfo, DIV.delBanner, DIV.delBannerText, SPAN.delBannerText, DIV.delBannerRight, DIV.delRightTitle, DIV.delBookmark, DIV.delPost, DIV.delPostInfo, DIV.delPostExtended, DIV.delMain, DIV.delPage, DIV.delInfo, SPAN.delNote, SPAN.delNum { font-family: "Lucida Sans Unicode", arial,sans-serif; font-size: 12px !important; } /* Banner */ /* ------------------------------------------------------- */ DIV.delBanner a, DIV.delBanner, SPAN.delBannerText a, SPAN.delBannerText { color: #fff; text-shadow: 2px 2px 1px #333; font-size: 13px !important; font-weight: bold; } DIV.delBanner { padding-top: 10px !important; } DIV.delBanner img{ display: none; } SPAN.delBannerText { background: url(http://del.icio.us/delicious.gif) no-repeat 5px center !important; padding-left: 33px; } DIV.delBannerText, SPAN.delBannerText a, SPAN.delBannerText { font-size: 15px !important; } DIV.delBannerRight { padding-top: 2px !important; } DIV.delBannerRight a { color: #fff; text-shadow: 2px 2px 1px #333; } DIV.delBanner a, SPAN.delBannerText a { font-weight: bold; text-decoration: underline; } DIV.delBanner { background-color: #ccc !important; background-position: 0 0 ; background-repeat: repeat-x; height: 25px; position: fixed; left: 0; top: 0; width: 100%; } DIV.delBannerRight { padding-right: 20px !important; } /* main column */ /* ------------------------------------------------------- */ DIV.delMain { padding: 10px 0 0 0 !important; font-size: 12px !important; } DIV.delMain>DIV[style="font-size: 80%"] { margin-left: 170px !important; padding-bottom: 10px; } DIV.delMain+DIV.delMain { margin-left: 170px !important; } DIV.delPostInfo { padding: 20px 0 5px 10px !important; margin: 0 0 0 160px !important; border-left: 1px solid #ccc; } DIV.delPage { background-color: #fff !important; } /* bookmarks */ DIV.delPost { padding-bottom: 4px !important; padding-top: 4px !important; padding-left: 10px !important; background: #f1f1f1; margin-left: 160px !important; margin-bottom: 0 !important; border-left: 1px solid #ccc; border-bottom: 1px solid #ccc; } DIV.delPost+DIV.delPost { background: #fff; } DIV.delPost+DIV.delPost+DIV.delPost { background: #f1f1f1;} DIV.delPost+DIV.delPost+DIV.delPost+DIV.delPost { background: #fff;} DIV.delPost+DIV.delPost+DIV.delPost+DIV.delPost+DIV.delPost { background: #f1f1f1;} DIV.delPost+DIV.delPost+DIV.delPost+DIV.delPost+DIV.delPost+DIV.delPost { background: #fff;} DIV.delPost+DIV.delPost+DIV.delPost+DIV.delPost+DIV.delPost+DIV.delPost+DIV.delPost { background: #f1f1f1;} DIV.delPost+DIV.delPost+DIV.delPost+DIV.delPost+DIV.delPost+DIV.delPost+DIV.delPost+DIV.delPost { background: #fff;} DIV.delPost+DIV.delPost+DIV.delPost+DIV.delPost+DIV.delPost+DIV.delPost+DIV.delPost+DIV.delPost+DIV.delPost { background: #f1f1f1;} DIV.delPost+DIV.delPost+DIV.delPost+DIV.delPost+DIV.delPost+DIV.delPost+DIV.delPost+DIV.delPost+DIV.delPost+DIV.delPost { background: #fff;} a.delLink { color: #000 !important; font-size: 13px; } a.delLink:visited { color: #333; } /* Left hand column */ /* ------------------------------------------------------- */ DIV.delRight, DIV.delPage { padding-top: 42px !important; padding-bottom: 4px; } DIV.delRight { float: left !important; background-color: #fff !important; width: 160px; margin-left: 0 !important; margin-right: 0 !important; padding-left: 0 !important; padding-right: 0 !important; border-right: 1px solid #ccc; border-bottom: 1px solid #ccc; } SPAN.delNum { float: left; width: 20px; color: #666; font-size: 11px; margin-right: 8px; text-align: right; } DIV.delRight div { padding-left: 10px !important; } /* title */ DIV.delRightTitle, DIV.delPage form a { color: #4D4D4D; text-shadow: 2px 2px 1px #fff; font-size: 11px !important; font-weight: bold; text-transform: capitalize; } DIV.delRightTitle { width: 150px; background: #ddd !important; padding-bottom: 4px; padding-left: 10px; padding-top: 4px !important; border-bottom: 1px solid #ccc; border-top: 1px solid #ccc; } DIV.delRightTitle SPAN.delNum { width: 0 !important; margin: 0 !important; } DIV.delRightTitle SPAN.delNum:before { content: ""; } DIV.delRightTitle SPAN.delNum:after { content: ""; } /* Different sections */ /* ------------------------------------------------------- */ DIV.delRight+DIV.delRight+DIV.delPage+DIV.delMain+DIV.delMain+DIV.delMain, DIV.delRight+DIV.delRight+DIV.delPage+DIV.delMain+DIV.delMain { margin-left: 320px !important; } DIV.delRight+DIV.delRight+DIV.delPage+DIV.delMain { margin-left:161px !important; } DIV.delBanner+form>DIV.delPage { padding: 60px 40px 0 40px !important; } DIV.delRight+DIV.delMain { padding-top: 60px !important; } DIV.delMain +DIV.delRight { padding-top: 0 !important; } DIV.delRight+DIV.delPage { padding-top: 47px !important; padding-bottom: 0 !important; background: #ddd !important; height: 17px !important; border-bottom: 1px solid #ccc; color: #4D4D4D; text-shadow: 2px 2px 1px #fff !important; font-size: 11px !important; font-weight: bold; text-transform: capitalize; } DIV.delMain +DIV.delRight+DIV.delPage { padding-top: 4px !important; border-top: 1px solid #ccc; } form+DIV.delMain { border-left: 0 !important; } DIV.delMain>form>table { margin: 60px 0 0 85px; } /* forms */ /* ------------------------------------------------------- */ DIV.delPage form { text-align: right; margin: -5px 0 0 0 !important; } DIV.delPage form a { color: #333 !important; } DIV.delPage form input{ width: 320px; border: 1px solid #ccc; padding: 1px; color: #aaa; font: 11px "Lucida Sans Unicode"; } td { font-size: 12px; } td[align="right"] { width: 120px ; } A.delNav:link { background: transparent !important; } ');
dt.injectcss(a);
})();

