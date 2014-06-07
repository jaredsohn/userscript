// ==UserScript==
// @name        WKW_youtube
// @namespace   WKW_youtube
// @description Bindet einen "empfehlen" Button ein
// @include     http://www.youtube.com/watch?*
// @include     http://www.wer-kennt-wen.de*
// @version     1
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==



function eventlistener(){
    allSpan = document.getElementsByClassName('yt-uix-button-content');
    if (allSpan) {
        for (var x = 0; x < allSpan.length; x++) {
            thisSpan = allSpan[x];
            if ( thisSpan.firstChild.data == "Teilen " ) {
                thisSpan.parentNode.addEventListener("click",warte,false);

            }
        }
    }
}

function wkwBTN(){

    ulTAG = document.getElementsByTagName("ul");
    if (document.getElementById("shareWKW")==null) {
        for (var x = 0; x < ulTAG.length; x++) {
            thisUL = ulTAG[x];
            if ( thisUL.getAttribute("class", false) == "share-group ytg-box" ) {
            newA = document.createElement('a');
            newA.href = "http://www.wer-kennt-wen.de/";
            newA.id = "shareWKW";
            newA.setAttribute("target","_blank");
            newIMG = document.createElement('img');
            newIMG.setAttribute("data-tooltip-text","Teilen auf werkenntwen");
            newIMG.setAttribute("class","yt-uix-tooltip share-service-button");
            newIMG.setAttribute("title","Teilen auf werkenntwen");
            newIMG.setAttribute("style","max-width:32px; max-height:32px;");
            newIMG.src = "http://static.werkenntwen.de/images/empfehlen_buttons/socialButton_Logo_36px.png";
            newA.appendChild(newIMG);
            thisUL.parentNode.insertBefore(newA, thisUL.previousSibling);
            videoTitle = document.getElementById("eow-title");
            GM_setValue("title", videoTitle.title);
            GM_setValue("url", document.URL);
            }
        }
    }
}

function warte(){
    setTimeout(function(){watchload();}, 300);
}

function watchload(){
    if ( document.getElementById("share-panel-buttons")==null){
        warte();
    }
    if ( document.getElementById("share-panel-buttons")!=null){
        wkwBTN();
    }
}



if ( document.URL.indexOf('youtube')>-1){
  start();
}          
function start() {  
  var pagecontainer=document.getElementById('page-container');
  if (!pagecontainer) return;
  if (/^https?:\/\/www\.youtube.com\/watch\?/.test(window.location.href)) eventlistener();     
  var isAjax=/class[\w\s"'-=]+spf\-link/.test(pagecontainer.innerHTML);
  var content=document.getElementById('content');
  if (isAjax && content) { // Ajax UI    
      var mo=window.MutationObserver||window.MozMutationObserver||window.WebKitMutationObserver;
      if(typeof mo!=='undefined') {
        var observer=new mo(function(mutations) {
          mutations.forEach(function(mutation) {
              if(mutation.addedNodes!==null) {
                for (var i=0; i<mutation.addedNodes.length; i++) {
                    if (mutation.addedNodes[i].id=='watch7-container') { // old value: movie_player
                      eventlistener(); 
                      break;
                    }
                }
              }
          });
        });
        observer.observe(content, {childList: true, subtree: true}); // old value: pagecontainer
      } else { // MutationObserver fallback for old browsers
        pagecontainer.addEventListener('DOMNodeInserted', eventlistener, false);
      }
  } 
}



if ( document.URL.indexOf('wer-kennt-wen')&&document.referrer.indexOf('youtube')>-1){
    var title = GM_getValue('title',null);
    var ytURL = GM_getValue('url',null);
    var textfeld = document.getElementById("wkwComposerInput");
    document.getElementById("wkwComposer").setAttribute("class","compose is-collapsable left open");
    textfeld.value = ytURL+'\n'+title+'\n';
}     
