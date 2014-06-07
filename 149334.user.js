// ==UserScript==
// @name        nCore másik borító nézet
// @namespace   2db9d226fa083c6988daace47f5eefc6
// @description Valódibb borító nézet hatású tákolmány. Semmi köze a másik (ne ess zavarba, ez a "másik" szó itt megkülönöztetésre szolgál, nem a név része) nCore borító nézet szkripthez, a név a hasonló funkció miatt hasonlít. Ez egy kísérlet, távolról sem kiforrott termék. Valószínű, hogy lassú, zabálja a memóriát, vagy esetleg egyáltalán nem is működik. Csak Firefox 15.0.1-en volt kipróbálva, egyéb böngészőkkel még annál is kevesebb siker várható.
// @include     http://ncore.cc/torrents.php*
// @include     https://ncore.cc/torrents.php*
// @version     0
// @grant       GM_addStyle
// ==/UserScript==
GM_addStyle(
"\
img.lazy { \
    display:none !important; \
} \
div.lista_all div.box_torrent_all div.box_torrent { \
} \
div.box_torrent > div.box_alap_img { \
    display:none !important; \
} \
div.torrent_lenyilo_lehetoseg { \
    background:none !important; \
    width:275px !important; \
    height:40px !important; \
} \
div.box_nev2 { \
    width:300px !important; \
    position:relative !important; \
    white-space:nowrap; !important; \
} \
div.torrent_txt2 { \
    width:275px !important; \
} \
div.torrent_txt { \
    width:275px !important; \
} \
div.torrent_txt2 a nobr { \
    display:none !important; \
} \
div.torrent_txt a nobr { \
    display:none !important; \
} \
div.box_torrent_name { \
    width:275px !important; \
    overflow:hidden !important; \
    text-overflow: ellipsis !important; \
} \
div.box_nagy2 { \
    border-width:0px !important; \
    width:300px !important; \
    height:442px !important; \
} \
div.box_nagy { \
    border-width:0px !important; \
    width:300px !important; \
    height:442px !important; \
} \
div.box_torrent div.box_cover { \
    border-style:solid !important; \
    border-width:0px !important; \
    border-color:blue !important; \
    clear:both !important; \
    width:300px !important; \
    height:300px !important; \
} \
div.torrent_ok { \
    position:absolute !important; \
    top:40px !important; \
    left:280px !important; \
    margin: 0 0 0 0 !important; \
} \
div.torrent_unchecked { \
    position:absolute !important; \
    top:40px !important; \
    left:280px !important; \
    margin: 0 0 0 0 !important; \
} \
div.torrent_err { \
    position:absolute !important; \
    top:40px !important; \
    left:280px !important; \
    margin: 0 0 0 0 !important; \
} \
div.torrent_new { \
    position:absolute !important; \
    top:20px !important; \
    left:280px !important; \
    margin: 0 0 0 0 !important; \
} \
div.infobar { \
    display:none !important; \
} \
div.box_buttons { \
    clear: both !important; \
} \
div.box_buttons:after { \
} \
");

var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://raw.github.com/tuupola/jquery_lazyload/master/jquery.lazyload.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

//remove line breaks
var bigBox=document.getElementsByClassName('box_torrent_all')[0];
var divs=selectNodes(document,bigBox,'div');
for (var i = 0; i < divs.length; i++) {
   var div=divs[i];
   if('clear:both;' == (div.getAttribute('style'))) {
    //alert(div);break;
     div.parentNode.removeChild(div);
   }
}

//process torrents
var torrents=document.getElementsByClassName('box_torrent');
var id="FAIL";
for (var it = 0; it < torrents.length; it++) {
    var torrent=torrents[it];
    //no ajax on torrent links
    var links=selectNodes(document,torrent,'div//a[nobr]');
    if(links.length>0) {
        var link=links[0];
        var click=link.getAttribute('onclick');
        //id=click.split("'")[1];
        id=click.split("(")[1].split(")")[0].replace("'","");
        link.removeAttribute('onclick');
        link.setAttribute('target','_blank');
        if(link.hasAttribute('title')) {
            var addDiv=document.createElement('div');
            addDiv.setAttribute('class','box_torrent_name');
            addDiv.textContent=link.getAttribute('title');
            link.appendChild(addDiv);
        }
    }
    
    //add download button
    torrent.setAttribute('data-id',id);

    var divNagy=selectNodes(document,torrent,'div[div[@class="users_box_sepa"]]')[0];
    var div=document.createElement('div');
    div.setAttribute('class','users_box_sepa');
    divNagy.appendChild(div);

    div=document.createElement('div');
    div.setAttribute('class','box_buttons');
    div.innerHTML='<div class="torrent_lenyilo_lehetoseg"> \
    '+selectNodes(document,torrent,'div[@class="box_alap_img"]')[0].outerHTML+'\
    <div class="download_separ"></div> \
    <div class="letoltve"><a href="torrents.php?action=download&id='+id+'"><img class="torr_reszletek_btn" src="data:image/gif;base64,R0lGODlhDwAPAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAPAA8AAAINlI+py+0Po5y02otnAQA7"></a></div><div class="letoltve_txt"><a href="torrents.php?action=download&id='+id+'">Letöltés</a></div> \
    </div>';
    divNagy.appendChild(div);
}
console.log('x999');



//add cover images to divs
var icons=document.getElementsByClassName('infobar_ico');
for (var i = 0; i < icons.length; i++) {
   var img=icons[i];
   var imgSrc=img.getAttribute('onmouseover').split("'")[1];
   var imgHeight=parseInt(img.getAttribute('onmouseover').split("'")[3]);
   var padTop=(300-imgHeight)/2+5;
   var padBottom=300-padTop-imgHeight;

   var divNagy=img.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
   var div=document.createElement('div');
   div.setAttribute('class','users_box_sepa');
   divNagy.appendChild(div);

   div=document.createElement('div');
   div.setAttribute('class','box_cover');

   var newImg=document.createElement('img');
   newImg.setAttribute('src','data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==');
   newImg.setAttribute('data-src',imgSrc);
   newImg.setAttribute('height',imgHeight);
   newImg.setAttribute('style','display:block; margin-left: auto; margin-right: auto; padding-top:'+padTop.toFixed(0)+"px; padding-bottom:"+padBottom.toFixed(0)+"px");
   div.appendChild(newImg);
   divNagy.appendChild(div);


}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

// helper function copied from “Google Image Relinker” Greasemonkey script
function selectNodes(doc, context, xpath) {
    var nodes = doc.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var result = new Array( nodes.snapshotLength );

    for (var x=0; x < result.length; x++)
    {
        result[x] = nodes.snapshotItem(x);
    }

    return result;
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

/*!
 * Lazy Load Images without jQuery
 * http://ezyz.github.com/Lazy-Load-Images-without-jQuery/
 *
 * (c) 2012 Mike Pulaski. http://www.mikepulaski.com
 * Modified and maintained by Yifei Zhang. http://yifei.co
 */

(function(window) {
  var addEventListener =  window.addEventListener || function(n,f) { window.attachEvent('on'+n, f); },
      removeEventListener = window.removeEventListener || function(n,f,b) { window.detachEvent('on'+n, f); };

  var lazyLoader = {
    cache: [],
    mobileScreenSize: 500,
    //tinyGif: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',

    addObservers: function() {
      addEventListener('scroll', lazyLoader.throttledLoad);
      addEventListener('resize', lazyLoader.throttledLoad);
    },

    removeObservers: function() {
      removeEventListener('scroll', lazyLoader.throttledLoad, false);
      removeEventListener('resize', lazyLoader.throttledLoad, false);
    },

    throttleTimer: new Date().getTime(),

    throttledLoad: function() {
      var now = new Date().getTime();
      if ((now - lazyLoader.throttleTimer) >= 200) {
        lazyLoader.throttleTimer = now;
        lazyLoader.loadVisibleImages();
      }
    },

    loadVisibleImages: function() {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;
      var pageHeight = window.innerHeight || document.documentElement.clientHeight;
      var range = {
        min: scrollY - 200,
        max: scrollY + pageHeight + 200
      };

      var i = 0;
      while (i < lazyLoader.cache.length) {
        var image = lazyLoader.cache[i];
        var imagePosition = getOffsetTop(image);
        var imageHeight = image.height || 0;

        if ((imagePosition >= range.min - imageHeight) && (imagePosition <= range.max)) {
          var mobileSrc = image.getAttribute('data-src-mobile');

          image.onload = function() {
            this.className = 'lazy-loaded';
          };

          if (mobileSrc && screen.width <= lazyLoader.mobileScreenSize) {
            image.src = mobileSrc;
          }
          else {
            image.src = image.getAttribute('data-src');
          }

          image.removeAttribute('data-src');
          image.removeAttribute('data-src-mobile');

          lazyLoader.cache.splice(i, 1);
          continue;
        }

        i++;
      }

      if (lazyLoader.cache.length === 0) {
        lazyLoader.removeObservers();
      }
    },

    init: function() {
      // Patch IE7- (querySelectorAll)
      if (!document.querySelectorAll) {
        document.querySelectorAll = function(selector) {
          var doc = document,
              head = doc.documentElement.firstChild,
              styleTag = doc.createElement('STYLE');
          head.appendChild(styleTag);
          doc.__qsaels = [];
          styleTag.styleSheet.cssText = selector + "{x:expression(document.__qsaels.push(this))}";
          window.scrollBy(0, 0);
          return doc.__qsaels;
        }
      }

      addEventListener('load', function _lazyLoaderInit() {
        var imageNodes = document.querySelectorAll('img[data-src]');
        //var imageNodes = document.getElementsByTagName('img');

        for (var i = 0; i < imageNodes.length; i++) {
          var imageNode = imageNodes[i];

          // Add a placeholder if one doesn't exist
          //imageNode.src = imageNode.src || lazyLoader.tinyGif;

          //if('' != imageNode.getAttribute('data-src')) { 
          lazyLoader.cache.push(imageNode);
          //}
        }

        lazyLoader.addObservers();
        lazyLoader.loadVisibleImages();

        removeEventListener('load', _lazyLoaderInit, false);
      });
    }
  }

  // For IE7 compatibility
  // Adapted from http://www.quirksmode.org/js/findpos.html
  function getOffsetTop(el) {
    var val = 0;
    if (el.offsetParent) {
      do {
        val += el.offsetTop;
      } while (el = el.offsetParent);
      return val;
    }
  }

  lazyLoader.init();
})(unsafeWindow);
