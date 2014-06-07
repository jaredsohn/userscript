// ==UserScript==
// @name           WLM AdRemover
// @namespace      http://jysoftware.com/offline/gm_scripts/
// @description    A tool to hidden Windows Live Mail Ad Banner
// @include        http://*mail.live.com/*
// @include        https://*mail.live.com/*
// ==/UserScript==
// Notes:

function adr(dd){
  var w,d,d2,ad,h, t;w=window;d=document;
  
  d2 = dd;
  if(!d2){
    //alert(d2);
    return;
  }

  //d2.__defineGetter__('xml',function() {});
  //w.document.addEventListener("click",ValidateButton,true);

  ad=d2.getElementById('RadAd_Banner');
  if(ad){
    h=ad.offsetHeight; //alert(h);
    ad.style.height='2px';
    ad.style.display='none';
    ad = ad.nextSibling;
    if(ad && /IMG/i.test(ad.tagName)) {
      ad.style.display = 'none';
    }
  }
  
  ad=d2.getElementById('RadAd_TodayPage_Banner');
  if(ad){
    ad.style.display='none';
  }
  
  ad=d2.getElementById('cMePresence');
  if(ad) ad=ad.parentNode;
  if(ad){ad.style.height='17px'; }

  ad=d2.getElementById('cRadAdsToday'); t=d2.getElementById('cContentColumn');
  if(t && ad){ h=ad.offsetWidth; ad.style.display='none'; t.style.width=(t.offsetWidth+h)+'px';}

  ad=d2.getElementById('MainResizeContainer');
  if(ad){ad.style.height=(ad.offsetHeight+h)+'px';}

  ad=d.getElementById('AdContainer');
  if(ad){
    h=ad.offsetHeight;
    ad.style.height='2px';
    ad.style.display='none';
  }
}

(function (){
  var t = window.frames;
  //if(false && t.length!=0){
  //  alert('Length: ' + t.length + '\nLocation: ' + document.location + '\n-------------------------<<<\n' + document.lastChild.innerHTML);
  //}
  if(t.length>1 && /ApplicationMain/i.test(document.location)){
    document.addEventListener("DOMContentLoaded", function(e){
      //alert('done');
    }, false);
    document.tniCount = 0;
    document.addEventListener("DOMNodeInserted", function(e){
      document.tniCount++;
      //if(document.tniCount%10 ==0) alert(document.tniCount);
      if(document.tniCount>220){
        //alert(document.tniCount);
        //alert(document.tniCount + ': g_observer=' + (typeof document.defaultView.g_observer) + '\nLocation:' + document.location + '\nnode inserted:\n' + e.relatedNode.innerHTML);
      }
      if(document.tniCount<=1){
        //alert(window.location + '\nLength=' + document.defaultView.frames.length + '\n' + document.defaultView.document.location);
        //alert(typeof document.defaultView);
        //alert(typeof top.frames[1].g_observer);
        if(typeof defaultView.g_observer=='object'){
          var s='document.defaultView.g_observer:\n\n', i=0, o; alert(s);
          for(; i<defaultView.g_observer.m_rgHandlers.length; i++){
            o=defaultView.g_observer.m_rgHandlers[i];
            s += '-- ' + i;
            //s += ' -------------------\n' + o.regex + '\n' + o.script + '\n' + o.minimumInterval + '\n' + o.timeOfLastRefresh + '\n--\n';
          }
          alert(s);
        }
      }
      if(document.tniCount<1){
        //alert('node inserted:\n' + e.relatedNode.innerHTML);
      }
    }, false);
    adr(document);
  }
} ());

