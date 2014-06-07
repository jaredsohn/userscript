// ==UserScript==
// @name           deviantART - Chat: Word Breaker
// @namespace      http://davidjcobb.deviantart.com/
// @description    Prevents long words, like URLs, from stretching the page.
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==

unsafeWindow.FFGM_DJC_DA_ProcessMessageWordBreak=
function(msg) {
   var djcdiv=document.createElement("div"),$=unsafeWindow.jQuery; // dA has jQuery, we might as well use it.
   if(!$)return msg;

   var createImg=function(){var x=document.createElement("img");x.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";return x};

   djcdiv.innerHTML=msg;
   var previousCS=""; // required to preserve state across text nodes -- otherwise, things like "12345<b>67</b>890reallylongtext" wouldn't get wrapped.
   $(djcdiv).contents().filter(function(){return this.nodeType==3}).each(
      function() {
         var S=this.nodeValue,SL=S.length,i=0,CS="",pCS=previousCS,N=[];
         for(;i<SL;i++) {
            if(S[i].match(/^\s$/)) {
               N.push(document.createTextNode(CS));
               N[N.length-1].nodeValue+=S[i];
               CS="";
            } else if (pCS.length+CS.length>49) {
               N.push(document.createTextNode(CS));
               try{N.push(createImg());}catch(e){throw "N.push(createImg());"}
               CS=S[i];
            } else {
               CS+=S[i];
            }
         }
         if(CS)N.push(document.createTextNode(CS));
         if(NL=N.length) {
            $(this).replaceWith(N[0]);
            for(i=1;i<NL;i++) {
               try{N[0].parentNode.insertBefore(N[i],N[i-1].nextSibling);}catch(e){throw "N[0].parentNode.insertBefore(N[i],N[i-1].nextSibling);\n"+i+"<"+NL}
            }
         }
         previousCS=CS;
      }
   );
   var djctxt=document.createElement("textarea");
   djctxt.innerHTML=djcdiv.innerHTML;
   msg=djctxt.value;
   return msg;
};

var Run= // injects the code.
function() { // no unsafeWindow or GM APIs -- see comments on Prep(), below.
   dAmnChanChat.prototype.__DJC_FormatMsg=dAmnChanChat.prototype.FormatMsg;
   dAmnChanChat.prototype.FormatMsg=function(B,G){return FFGM_DJC_DA_ProcessMessageWordBreak(dAmnChanChat.prototype.__DJC_FormatMsg(B,G))};
};

var Prep= // FF3 prevents sandboxes (like GM scripts) from screwing around with prototypes in other sandboxes.
function() { // this function takes Run() and converts it intl a JS URL to cleverly work around the limitation.
   var STR=Run.toString().replace(/\n/g,"");
   window.location.href="javascript:("+STR+")();void(0);";
};

window.addEventListener("load",Prep,!0);