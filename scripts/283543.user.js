// ==UserScript==
// @id             Youtube_without_recommended_or_featured_videos
// @name           Youtube without recommended or featured videos
// @description    Youtube related videos without recommended or featured ones.
// @version        1.0.2
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


(function(){



function testRelatedVideo(relVid) {                      // relVid = relatedVideo
  var relVidSpans = relVid.getElementsByTagName('SPAN'); // relVidSpans = span(s) dentro do relVid
  var n = 0;
  for ( var s = 0; s < relVidSpans.length; s++ ) {
    //GM_log('className = ' + relVidSpans[s].className);
    if( relVidSpans[s].className == 'stat attribution' ) {
      n++;
      if( n > 1 ) {
        //relVid.style.backgroundColor = '#FFD4D4'; //'red';
        relVid.style.display = 'none';
        break;
      }
    }
    else if( relVidSpans[s].className == 'stat alt badge' ) {
      //relVid.style.backgroundColor = '#FFFFD4'; //'yellow';
      relVid.style.display = 'none';
      break;
    }
  }
}



function processWatchRelatedVideosList() {
  var relVidsList = document.getElementById('watch-related').getElementsByClassName('video-list-item');
  for ( var v = 0; v < relVidsList.length; v++ ) {
    testRelatedVideo(relVidsList[v]);
  }
  //
  // REMOVE AS SUGESTÕES DA VEVO:
  //
  var watchSidebarSections = document.getElementById('watch7-sidebar').getElementsByClassName('watch-sidebar-section');
  if( watchSidebarSections.length >= 2 ) {   // só faz algo se houver mais de uma sessão

    //watchSidebarSections[0].style.display = 'none';                        // oculta a DIV
    watchSidebarSections[0].parentNode.removeChild(watchSidebarSections[0]); // remove a DIV

    //GM_addStyle(" #watch7-sidebar .watch-sidebar-head {display:none !important; } ");                             // oculta a H4
    // não consegui remover a tag a partir de watchSidebarSections[1]
    var wacthSidebarHeads = document.getElementById('watch7-sidebar').getElementsByClassName('watch-sidebar-head'); // remove a H4
    if( wacthSidebarHeads.length ) wacthSidebarHeads[0].parentNode.removeChild(wacthSidebarHeads[0]);

    // falta remover o texto abaixo dos nós removidos
  }
}



if ( /https?:\/\/www\.youtube\.com\/watch\?/.test(document.location) == true ) {
  processWatchRelatedVideosList();
}



//// CÓDIGO ANTIGO QUE DEIXOU DE FUNCIONAR COM O SPF NO YOUTUBE
//var observer = new MutationObserver(function(mutations) {
//  mutations.forEach(function(mutation) {
//    for ( var i = 0; i < mutation.addedNodes.length; i++ ) {
//      if( mutation.addedNodes[i].className == 'video-list-item' ) {
//        //var spans = mutation.addedNodes[i].getElementsByTagName('SPAN');
//        //for ( var s = 0; s < spans.length; s++ ) {
//        //  if( spans[s].className == 'title' ) GM_log( spans[s].getAttribute('title') ); // FUNCIONA!!!
//        //}
//        testRelatedVideo(mutation.addedNodes[i]);
//      }
//    }
//  });
//});
//var target = document.getElementById('watch-more-related'); // document.querySelector('#watch-more-related') também funciona!!!
//var config = { attributes: false, characterData: false, childList: true };
//observer.observe(target, config);
//// CÓDIGO NOVO A PARTIR DO SPF NO YOUTUBE
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if ( /https?:\/\/www\.youtube\.com\/watch\?/.test(document.location) == true ) {
      processWatchRelatedVideosList();
    }
  });
});
var config = { attributes: true, characterData: true, childList: true};
var target = document.getElementById('content');
if( target != null ) observer.observe(target, config);



})();