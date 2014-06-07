// ==UserScript==
// @id             Youtube_scrollable_related_videos
// @name           Youtube scrollable related videos
// @description    Scrollable related videos on YouTube.
// @version        2.0.7
// @author         REVerdi
// @namespace      http://userscripts.org/users/67570
// @copyright      2012+, REVerdi (http://userscripts.org/users/67570)
// @license        (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// Por causa do SPF, não posso usar // @include            http*://www.youtube.com/watch?*
// porque se o 1º link no YouTube não for do tipo acima, esse script nunca será executado.
// @include        http*://www.youtube.com/*
// @run-at         document-end
// ==/UserScript==


/* TESTED ONLY ON FIREFOX */


/*
Sorry, but I'm not a programmer, at least for now :).
Please, let me know the fixes and improvements made to this script.
*/


/*
 * See the topic on http://userscripts.org/topics/102213.
 */


(function(){


// alert('YSRV debug msg: entering the script');
//GM_log('YSRV debug msg: entering the script');


//GM_log('YSRV debug msg: page url ' + location.href);
//GM_log('YSRV debug msg: page title ' + document.title);




// jackabood's source (http://userscripts.org/users/439319)
// GM_addStyle(" #watch-related-container               {max-height:580px !important; overflow:auto !important; } ");
// GM_addStyle(" #watch-related                         {max-height:580px !important; overflow:auto !important; } "); // update (04-nov-2012).
// GM_addStyle(" #watch-sidebar                         {max-height:580px !important; overflow:auto !important; } "); // update (04-nov-2012).
// GM_addStyle(" #watch7-sidebar .watch-sidebar-section {max-height:730px !important; overflow:auto !important; } "); // update (06-dec-2012).
// GM_addStyle("                 .watch-sidebar-section {max-height:730px !important; overflow:auto !important; } "); // also works
// GM_addStyle(" #watch7-sidebar .watch-sidebar-section {max-height:657px !important; overflow:auto !important; } "); // update (27-nov-2013).
function addStyleToRelVidsList() {
   GM_addStyle(" #watch7-sidebar .watch-sidebar-section {max-height:739px !important; overflow:auto !important; } "); // update (02-dez-2013). //728 739 740
// GM_addStyle(" #watch7-sidebar .watch-sidebar-section {background-color: #F1F1F1 !important; } ");                  // #FFFFFF #FAFAFA #F2F2F2 #F1F1F1 lightgray
}

// Takato's source (http://userscripts.org/users/82358)
/*
suggestThumbs = document.getElementById("watch-sidebar").getElementsByClassName("video-thumb");
var count = 0;
while (count < suggestThumbs.length) {
if (suggestThumbs[count].getAttribute("class").indexOf("-110") > -1) {
    img = suggestThumbs[count].getElementsByTagName("img")[0];
    imgPath = img.getAttribute("data-thumb");
    if (imgPath != undefined) {
      img.setAttribute("src", imgPath);
    }
  }
  count++;
}
*/




function loadThumbsOfRelVids() {
  // The code written by me is based on code written by Takato, but my code is independent of the size of the thumbnail.
  //suggestThumbs = document.getElementById("watch-sidebar").getElementsByClassName("yt-thumb-clip-inner");
  //suggestThumbs = document.getElementById("watch-related").getElementsByClassName("yt-thumb-clip-inner"); // update 06-dec-2012
  //suggestThumbs =                                 document.getElementsByClassName("yt-thumb-clip-inner"); // also works
  //suggestThumbs = document.getElementById("watch-related").getElementsByClassName("yt-thumb-clip"      ); // update 22-nov-2013
  //suggestThumbs =                                 document.getElementsByClassName("yt-thumb-clip"      ); // update 05-jan-2014 // commented 26-apr-2014
    suggestThumbs = document.getElementById("watch-related").getElementsByClassName("yt-uix-simple-thumb-wrap yt-uix-simple-thumb-related");
  for ( var i = 0; i < suggestThumbs.length; i++ ) {
    img = suggestThumbs[i].getElementsByTagName("img")[0];
    imgPath = img.getAttribute("data-thumb");
    if( imgPath != undefined ) img.setAttribute("src", imgPath); //data-yhumb -> src
  }
}




/*
 * DOM mutation observer
 * https://developer.mozilla.org/en-US/docs/DOM/MutationObserver
 * http://msdn.microsoft.com/pt-br/library/ie/dn265034(v=vs.85).aspx
 * http://msdn.microsoft.com/pt-br/library/ie/dn265032(v=vs.85).aspx
 */
/*
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    GM_log('YSRV debug msg: loading thumbnails of related videos...');
    GM_log('YSRV debug msg: page url ' + location.href);
    GM_log('YSRV debug msg: page title ' + document.title);
//   alert('YSRV debug msg: ' + mutation.type + ' mutation');
    GM_log('YSRV debug msg: ' + mutation.type + ' mutation'); // use console.log no lugar de GM_log para ver APENAS no console do Firefox
    switch(mutation.type) { // switch apenas por exercício
      case 'attributes':
//       alert('YSRV debug msg: attributes mutation');
        GM_log('YSRV debug msg: attributes mutation');
        break;
      case 'characterData':
//       alert('YSRV debug msg: characterData mutation');
        GM_log('YSRV debug msg: characterData mutation');
        break;
      case 'childList':
//       alert('YSRV debug msg: childList mutation');
        GM_log('YSRV debug msg: childList mutation');
//        for( var i = 0; i < mutation.addedNodes.length; i++ ) {
//          GM_log('YSRV debug msg: mutation url ' + mutation.addedNodes[i].getElementsByTagName('A')[0].href); // [0].getAttribute('href') also works
//          var link = mutation.addedNodes[i].getElementsByTagName('A')[0].href;
//          mutation.addedNodes[i].getElementsByTagName('A')[0].href = link.slice( 0, link.lastIndexOf('?') );
//        }
        break;
      default:
//       alert('YSRV debug msg: ' + mutation.type + ' mutation');
        GM_log('YSRV debug msg: ' + mutation.type + ' mutation');
    }
//    for( var i = 0; i < mutation.addedNodes.length; i++ ) {
//      //GM_log('YSRV debug msg: mutation url ' + mutation.addedNodes[i].getElementsByTagName('A')[0].href); // [0].getAttribute('href') also works
//      //var link = mutation.addedNodes[i].getElementsByTagName('A')[0].href;
//      //mutation.addedNodes[i].getElementsByTagName('A')[0].href = link.slice( 0, link.lastIndexOf('?') );
//    }
  });
});
*/


if ( /https?:\/\/www\.youtube\.com\/watch\?/.test(document.location) == true ) {
  addStyleToRelVidsList();
  loadThumbsOfRelVids();
}


var pLoc = location.href; // old-cur-new, prev-curr(pres)-next(post), previous=anterior, active
var cLoc = location.href;


var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if ( /https?:\/\/www\.youtube\.com\/watch\?/.test(document.location) == true ) {
      cLoc = location.href;
      if ( cLoc != pLoc ) {
//      GM_log('YSRV debug msg: loading thumbnails of related videos...');
//      GM_log('YSRV debug msg: page url ' + location.href);
//      GM_log('YSRV debug msg: page title ' + document.title);
        pLoc = cLoc;
        addStyleToRelVidsList();
        loadThumbsOfRelVids();
      }
    }
  });
});


//var target = document.getElementById('body');                                       //
//  var target = document.getElementById('body-container');                           //
//    var target = document.getElementById('page-container');                         //
//      var target = document.getElementById('page');                                 //
          var target = document.getElementById('content');                            // dispara trocentas mutações
//          var target = document.getElementById('watch7-container');                 //
//            var target = document.getElementById('watch7-main-container');          //
//              var target = document.getElementById('watch7-main');                  //
//                var target = document.getElementById('watch7-sidebar');             //
//                  var target = document.getElementById('watch7-sidebar-contents');  //
//                    var target = document.getElementById('watch-sidebar-modules');  //
//                      var target = document.getElementById('watch-related');        //

//var target = document.getElementById('watch-related').getElementsByTagName('LI')[0];
//var target = document.getElementById('watch-related').getElementsByTagName('LI');
//var target = document.getElementById('watch-related');
//var target = document.getElementById("watch-related").getElementsByClassName("yt-thumb-clip")[0]; //aparentemente só dispara mutações ao entrar na página
//var target = document.getElementById("watch-related").getElementsByClassName("yt-thumb-clip");


var config = { attributes: true, characterData: false, childList: false};


if( target != null ) observer.observe(target, config);

/* Funciona, mas na primeira execução desse script os comentários
   não eram carregados nem o símbolo de play no título era exibido.
window.onload = function() {
  observer.observe(target, config);
// alert('YSRV debug msg: loading');
//GM_log('YSRV debug msg: loading');
};
*/

window.onunload = function() {
  observer.disconnect();
// alert('YSRV debug msg: unloading');
//GM_log('YSRV debug msg: unloading');
};




// alert('YSRV debug msg: exiting the script');
//GM_log('YSRV debug msg: exiting the script');


})();