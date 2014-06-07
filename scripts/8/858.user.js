// ==UserScript==
// @name          del.icio.us skin 2
// @namespace     http://sputnik.bitacoras.com
// @description	  del.icio.us skin 2
// @include       http://del.icio.us/*
// ==/UserScript==
// based on: http://darkt.everywebhost.com/gm/del.icio.usskin.user.js 

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

var a = (' DIV.delLeft, DIV.delRight, DIV.delRightTitle, DIV.delPostInfo, DIV.delBanner, DIV.delBannerText, SPAN.delBannerText, DIV.delBannerRight, DIV.delRightTitle, DIV.delBookmark, DIV.delPost, DIV.delPostInfo, DIV.delPostExtended, DIV.delMain, DIV.delPage, DIV.delInfo, SPAN.delNote, SPAN.delNum { font-family: "Lucida Sans Unicode", arial,sans-serif; font-size: 12px !important; } /* Banner */ /* ------------------------------------------------------- */ DIV.delBanner a, DIV.delBanner, SPAN.delBannerText a, SPAN.delBannerText { color: #fff; text-shadow: 2px 2px 1px #333; font-size: 13px !important; font-weight: bold; } DIV.delBanner { padding-top: 10px !important; } DIV.delBanner img{ display: none; } SPAN.delBannerText { background: url(http://del.icio.us/delicious.gif) no-repeat 5px center !important; padding-left: 33px; } DIV.delBannerText, SPAN.delBannerText a, SPAN.delBannerText { font-size: 15px !important; color: #666 } DIV.delBannerRight { padding-top: 2px !important; } DIV.delBannerRight a { color: #fff; text-shadow: 2px 2px 1px #333; } DIV.delBanner a, SPAN.delBannerText a { font-weight: bold; text-decoration: underline; color: #666 } DIV.delBanner { color: #666; background-color: #eee !important; background-position: 0 0 ; background-repeat: repeat-x; height: 25px; position: fixed; left: 0; top: 0; width: 100%; border-bottom: 1px solid #ccc } DIV.delBannerRight { padding-right: 20px !important; } /* main column */ /* ------------------------------------------------------- */ DIV.delMain { padding: 10px 0 0 0 !important; font-size: 12px !important;   } DIV.delMain>DIV[style="font-size: 80%"] { margin-left: 180px !important; padding-bottom: 10px; } DIV.delMain+DIV.delMain { margin-left: 170px !important; } DIV.delPostInfo { padding: 20px 0 5px 10px !important; margin: 0 0 0 160px !important; border-left: 1px solid #ccc; } DIV.delPage { background-color: #fff !important; } /* bookmarks */ DIV.delPost { padding-bottom: 4px !important; padding-top: 4px !important; padding-left: 10px !important;  margin-left: 160px !important; margin-bottom: 0 !important; border-left: 1px solid #ccc;  } DIV.delPost+DIV.delPost { background: #fff; }  a.delLink { color: #000 !important; font-size: 13px; border-bottom: 1px dashed #6aa;  } a.delLink:visited { color: #333; } /* Left hand column */ /* ------------------------------------------------------- */ DIV.delRight, DIV.delPage { padding-top: 42px !important; padding-bottom: 14px; } DIV.delRight { float: left !important; background-color: #fff !important; width: 160px; margin-left: 2px !important; margin-right: 0 !important; padding-left: 0 !important; padding-right: 0 !important; border-right: 1px solid #ccc; border-bottom: 1px solid #ccc;  } SPAN.delNum { float: left; width: 20px; color: #666; font-size: 11px; margin-right: 8px; text-align: right; } DIV.delRight div { padding-left: 10px !important;  } a { color: #06a; } /* title */ DIV.delRightTitle, DIV.delPage form a { color: #4D4D4D; text-shadow: 2px 2px 1px #fff; font-size: 11px !important; font-weight: bold; text-transform: capitalize; } DIV.delRightTitle { width: 150px; background: #eee !important; font-variant: small-caps; padding-bottom: 4px; padding-left: 10px; padding-top: 4px !important; border-bottom: 1px solid #ccc; border-top: 1px solid #ccc; } DIV.delRightTitle SPAN.delNum { width: 0 !important; margin: 0 !important; } DIV.delRightTitle SPAN.delNum:before { content: ""; } DIV.delRightTitle SPAN.delNum:after { content: ""; } /* Different sections */ /* ------------------------------------------------------- */ DIV.delRight+DIV.delRight+DIV.delPage+DIV.delMain+DIV.delMain+DIV.delMain, DIV.delRight+DIV.delRight+DIV.delPage+DIV.delMain+DIV.delMain { margin-left: 320px !important; } DIV.delRight+DIV.delRight+DIV.delPage+DIV.delMain { margin-left:161px !important; } DIV.delBanner+form>DIV.delPage { padding: 60px 40px 0 40px !important; } DIV.delRight+DIV.delMain { padding-top: 60px !important; } DIV.delMain +DIV.delRight { padding-top: 0 !important; } DIV.delRight+DIV.delPage { padding-top: 47px !important; padding-bottom: 0 !important; background: #eee !important; height: 19px !important; border-bottom: 1px solid #ccc; color: #4D4D4D; text-shadow: 2px 2px 1px #fff !important; font-size: 11px !important; font-weight: bold; text-transform: capitalize; } DIV.delMain +DIV.delRight+DIV.delPage { padding-top: 4px !important; border-top: 1px solid #ccc; } form+DIV.delMain { border-left: 0 !important; } DIV.delMain>form>table { margin: 60px 0 0 85px; } /* forms */ /* ------------------------------------------------------- */ DIV.delPage form { text-align: right; margin: -5px 0 0 0 !important; } DIV.delPage form a { color: #333 !important; } DIV.delPage form input{ width: 320px; border: 1px solid #ccc; padding: 1px; color: #aaa; font: 11px "Lucida Sans Unicode"; } td { font-size: 12px; } td[align="right"] { width: 120px ; } A.delNav:link { background: transparent !important; } DIV.meta { padding-top: 2px} DIV.extended { padding-top: 2px } DIV.post {margin-left: 170px;} ');
dt.injectcss(a);
})();

