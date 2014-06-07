// ==UserScript==
// @name           Greasemonkey Shell
// @namespace      http://davidjcobb.deviantart.com/
// @description    Allows you to run code from a Greasemonkey sandbox.
// @include        *
// ==/UserScript==

(function() { // anon function so the shell's command line can't mess with the shell itself

var CSS=""+
"body{padding:0;margin:0;border:0}\n"+
"#DJC-GM-GMShell{position:fixed;z-index:999;border:3px solid #000;-moz-border-radius:15px;background:rgb(180,120,0) none;color:#FFF0CF;width:600px;text-align:center;font-family:tahoma,arial,sans-serif}\n"+
"   #DRAGGER{position:absolute;right:19px;top:6px}\n"+
"   #DJC-GM-GMShell>h1{margin:5px 0 0 0;font-weight:normal;border:0;margin:0}\n"+
"   #DJC-GM-GMShell>p{margin:5px 10px 1em 5px}\n"+
"   #DJC-GM-GMShell>div{width:564px;margin:0 auto}\n"+
"      #DJC-GM-GMShell>div>div:first-child{float:left;text-align:left;width:280px;height:6em;background:#FFE1A2;border:1px solid #000;color:#000;overflow-y:auto}\n"+
"         #DJC-GM-GMShell>div>div:first-child>div{display:inline-block;min-width:266px;border:0 solid #666;border-width:1px 0;padding:0 7px;background:#FFF0CF}/*history item*/\n"+
"            #DJC-GM-GMShell>div>div:first-child>div>pre:first-child{font-weight:bold;color:#04F;margin:0}/*history input*/\n"+
"            #DJC-GM-GMShell>div>div:first-child>div>pre:first-child+pre{margin:0}/*history output*/\n"+
"            #DJC-GM-GMShell>div>div:first-child>div>pre:first-child+pre.error{white-space:pre-wrap;color:#F00}/*history output (errors)*/\n"+
"      #DJC-GM-GMShell>div>div:first-child+div{float:left;width:282px}\n"+
"         #DJC-GM-GMShell>div>div:first-child+div>textarea{-moz-user-modify:read-write!important;font-size:0.8125em;width:281px;height:76px;background:#FFF0CF;border:1px solid #000;border-width:1px 1px 1px 0;margin:0;padding:0}\n"+
"         #DJC-GM-GMShell>div>div:first-child+div>ul{display:block;list-style:none;padding:0;margin:0}\n"+
"            #DJC-GM-GMShell>div>div:first-child+div>ul>li{cursor:pointer;background:#FFE1A2;border:1px solid #000;height:21px;border-width:0 1px 1px 0;margin:0;padding:0;float:left;color:#000}\n"+
"            #DJC-GM-GMShell>div>div:first-child+div>ul>li.DIS{color:#653;cursor:default}\n"+
"   #DJC-GM-GMShell>input{margin:1em 0;padding:0 6px;background:#FFE1A2;border:1px solid #000;-moz-border-radius:8px;border-color:#5F3E00 #5F3E00 #000 #5F3E00;font-family:verdana,arial,sans-serif}";

var Base64_DragIcon="data:image/gif;base64,R0lGODlhHwAfAPcAAAQCBLR2BIRWBEQuBJRmBPzipEQuDKRuBLR6BJxmBEQyDAAAAAALMAAA6xUAEgAAABECAQAAAAAAAAAAAAACHwIAAAAAAAAAAAAAHwMAAAAAAAAAAEAFwOcA9hIAEgAAAOkVH+UAAIEAAHwAAACQAAABAAEAAAAAAFabAABgAADxAAB3AEjEVubAABL9AQB/AXMAAADwAAD9AAB/AGgATOcA6RIAEgAAABgAb+4ALpAA13wAWnB5VgV6AJHxAXx3Af+IAP96AP/xAP93AG1W/wUA/5EB/3wB/4UAAecAnoEAgHwAfAAFVgAAABUAAQAAAWATXwMAAAAAAAAAAMgQBvPpABkSAAAAAMBsoGXqABUSAAAAAABAFgAHAADhAAAAAH4AAAAAAAAAAMAAAADAAADoAAASAAAAAP86Af/hAP9BAP9+AP9WAP8AAP8BAP8BAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAB/AADdABVBAAB+AHgAAOcAABIAAAAAANJWAOYAAIEBAHwBAMBfAGUAABUAAAAAAEoGB+MAAIEAAHwAAGCgANoAAFAAAAAAAMAWAGUAAAEAFQAAAGwoAAAAAAAAAAAAALTDAOYcABIAAAAAAACQAADoAAASAAAAAAiFAPwrABKDAAB8ABgAOO4AAJAAvnwAAHAAAAUAAJEAAHwAAP8AAP8AAP8AAP8AAG0pagW3AJGSAHx8AEoYavQAAIAAAHwAAAA0hABk7hWDEgB8AAAA/wAA/wAA/wAA/8AAAGUAABUAAAAAAAB0vAHo6QASEgAAAAA0BgBknQCDTAB8AFcInPT86YASEnwAAKAYd+jucBKQTwB8AMAA0GW36RWSEgB8AEj/NH7/ZPH/g3f/fCAYukAA6/UAEncAAAA0lABk/wCD/wB8f5S4UITp6/ESEncAAAHnAABkAACDAAB8AByINOhkZBKDgwB8fBQAAOAAAEEAAH4AAFYwwwAAHAEAAAEAAMgAPOcAABIAvgAAAFgfgeoARRIASAAAACH5BAAAAAAALAAAAAAfAB8ABwjXABEIHEhwYAABAAQEKMiwYcODAAokXOiwIkOEBTImtMgRAcSMICd2dIgRZEgBIxsiBMBSIsuNKR0eiAjgQEyOMyXavFkxZ02ePWnuTHkQJUOfQwkKUHiRZUOkDVkaFfgRwFOhUSUy/ajzgNevCWgm+Eo2olauLl+qFVBgpdqXJ82anEu37tyEct+ubasXrkaFJQ2Q/UpA7GCvZkV+VHBVZ1aRAxEOaPyToVSGRSknjcw0JlSgmkGHFl3wM2m3NF9O5Vny7uqbaP9SFN0aJmmPGCHfxq3bYkAAOw==";

var DJC={}; // replacement for window

EV=DJC.EV=
{
   node:null,
   cb:{},
   scheduled_for_add:[],
   init:
      function(node) {
         if(!node)return;
         this.node=node;
         while(this.scheduled_for_add.length) {
            this.addEventListener.apply(this,this.scheduled_for_add[0]);
            this.scheduled_for_add.splice(0,1);
         }
         this.init=function(){};
      },
   EL:
      function(e) {
         var E=e.type.toLowerCase().replace(/^on/i,""),i=0,n=e.target,X,Y=0,x,c;
         if(!DJC.EV.cb[E])return;
         for(;i<DJC.EV.cb[E].length;i++) {
            if(DJC.EV.cb[E][i][0]==n) return DJC.EV.cb[E][i][1].call(n,e)
         }// no callbacks found
      },
   addEventListener:
      function(n,E,f) {
         if(!n+!f)return !1;
         if(!this.node) {
            this.scheduled_for_add.push([n,E,f]);
         }
         if(!this.cb[E]){this.cb[E]=[];this.node.addEventListener(E,function(e){DJC.EV.EL(e)},!0)}
         this.cb[E].push([n,f]);
         return !0;
      },
   removeEventListener:
      function(n,E,f) {
         if(!n+!E+!f+!this.cb[E])return;
         for(var i=0;i<this.cb[E].length;i++) {
            if(this.cb[E][i][0]==n&&this.cb[E][i][1]==f)return !(this.cb[E].splice(i,1))||undefined;
         }
         if(this.cb[E].length) {
            delete this.cb[E];
            this.node.removeEventListener(E,function(e){DJC.EV.EL(e)},!0);
         }
      }
};

var Trigger={key:Math.floor(Math.random()*Number.MAX_VALUE)};
// code in the textarea runs at GM-level privs -- we don't want page 
// scripts modding the TA's value and faking a click event.
// this tells us if the event handler itself is real. Telling whether 
// or not the click event is real is done in the event handler -- 
// see below.

DJC.GUI=
{
   $:
      {
         updateIframe:
            function() {
               DJC.iframe.style.width=DJC.node.offsetWidth+"px";
               DJC.iframe.style.height=DJC.node.offsetHeight+"px";
               DJC.iframe.style.marginLeft=(-(DJC.iframe.offsetWidth/2)+DJC.Dragger.offsetX)+"px";
               DJC.iframe.style.marginTop=(-(DJC.iframe.offsetHeight/2)+DJC.Dragger.offsetY)+"px";
            }
      },
   Run:
      function(T) {
         var C,R,P,ERROR;
         if(T===Trigger){
            C=DJC.node.getElementsByTagName("textarea")[0].value;
            if(!C.replace(/\s/g,""))return;

            try{r=R=eval(C)}catch(e){r=R="Error: "+e.message+((e.line)?"\nLine: "+e.line:"");ERROR=true;}
            try{if(!ERROR)R=uneval(R)}catch(e){R="undefined"}
            if(R==="(void 0)")R="undefined";
            if(R==="{}")R=r.toString();
            if(R==="null"&&r!=null)R=r.toString(); // fix erroneous "null"s, which happen with uneval(any XPCNativeWrapper).

            P=document.createElement("div");
            P.appendChild(document.createElement("pre")).innerHTML=C;
            P.appendChild(document.createElement("pre")).innerHTML=R.replace(/</g,"&lt;");
            if(ERROR)P.childNodes[1].className="error";

            DJC.resultNode.appendChild(P);
         }
      },
   Clear:
      function(T) {
         if(T===Trigger) {
            while(DJC.resultNode.firstChild) {
               DJC.resultNode.removeChild(DJC.resultNode.firstChild);
            }
         }
      },
   Enlarge:
      function(T) {
         if(T===Trigger) {
            var TA=DJC.node.getElementsByTagName("textarea")[0],RN=DJC.resultNode,
                curTAHt=Number(DJC.iframe.contentWindow.getComputedStyle(TA,"").getPropertyValue("height").replace(/\D/g,"")),
                curRNHt=Number(DJC.iframe.contentWindow.getComputedStyle(RN,"").getPropertyValue("height").replace(/\D/g,"")),
                EngBtn=DJC.node.getElementsByTagName("li")[2],ShrBtn=DJC.node.getElementsByTagName("li")[3];
            if(curTAHt<=124) {
               TA.style.height=(curTAHt+22)+"px";
               RN.style.height=(curRNHt+20)+"px";
            }
            EngBtn.className=(curTAHt<=104)?"":"DIS";
            ShrBtn.className=(curTAHt>=74)?"":"DIS";
            DJC.GUI.$.updateIframe();
         }
      },
   Shrink:
      function(T) {
         if(T===Trigger) {
            var TA=DJC.node.getElementsByTagName("textarea")[0],RN=DJC.resultNode,
                curTAHt=Number(DJC.iframe.contentWindow.getComputedStyle(TA,"").getPropertyValue("height").replace(/\D/g,"")),
                curRNHt=Number(DJC.iframe.contentWindow.getComputedStyle(RN,"").getPropertyValue("height").replace(/\D/g,""))
                EngBtn=DJC.node.getElementsByTagName("li")[2],ShrBtn=DJC.node.getElementsByTagName("li")[3];
            if(curTAHt>=94) {
               TA.style.height=(curTAHt-18)+"px";
               RN.style.height=(curRNHt-20)+"px";
            }
            EngBtn.className=(curTAHt<=144)?"":"DIS";
            ShrBtn.className=(curTAHt>94)?"":"DIS";
            DJC.GUI.$.updateIframe();
         }
      }
};

DJC.killConsole=
function(){
   DJC.iframe.style.display="none";
};

DJC.Dragger=
{
   event_mousedown:
      function(E) {
         DJC.Dragger.start(E);
         E.preventDefault();
         return false;
      },
   start:
      function(E) {
         DJC.iframe.contentDocument.body.addEventListener("mousemove",DJC.Dragger.move,false);
         document.body.addEventListener("mousemove",DJC.Dragger.move,false);
         DJC.iframe.contentDocument.getElementById("DRAGGER").style.cursor="move";
         DJC.Dragger.dragStartX=E.screenX;
         DJC.Dragger.dragStartY=E.screenY;
         DJC.Dragger.originalX=DJC.Dragger.offsetX;
         DJC.Dragger.originalY=DJC.Dragger.offsetY;
      },
   cancel:
      function() {
         DJC.clearTimeout(DJC.Dragger.startTimeout);
      },
   move:
      function(E) {
         if(DJC.Dragger.dragStartX==-1)return;
         var WLimit=(window.innerWidth-DJC.iframe.offsetWidth)/2,HLimit=(window.innerHeight-DJC.iframe.offsetHeight)/2;
         DJC.Dragger.offsetX=Math.max(-WLimit,Math.min(E.screenX-DJC.Dragger.dragStartX+DJC.Dragger.originalX,WLimit));
         DJC.Dragger.offsetY=Math.max(-HLimit,Math.min(E.screenY-DJC.Dragger.dragStartY+DJC.Dragger.originalY,HLimit));
         DJC.Dragger._updateIframePosition();
      },
   stop:
      function() {
         if(DJC.Dragger.dragStartX==-1)return;
         DJC.iframe.contentDocument.body.removeEventListener("mousemove",DJC.Dragger.move,false);
         document.body.removeEventListener("mousemove",DJC.Dragger.move,false);
         DJC.iframe.contentDocument.getElementById("DRAGGER").style.cursor="default";
         DJC.Dragger.dragStartX=DJC.Dragger.dragStartY=-1;
      },
   _updateIframePosition:
      function() {
         DJC.iframe.style.marginLeft=(-(DJC.iframe.offsetWidth/2)+DJC.Dragger.offsetX)+"px";
         DJC.iframe.style.marginTop=(-(DJC.iframe.offsetHeight/2)+DJC.Dragger.offsetY)+"px";
      },
   offsetX:0,
   offsetY:0,
   dragStartX:-1,
   dragStartY:-1,
   originalX:-1,
   originalY:-1,
   startTimeout:null
};

a=document.createElement("iframe");
a.style.position="fixed";a.style.top=a.style.left="50%";a.style.width="600px";a.style.zIndex=9999;a.style.border="none";a.style.display="none";
DJC.iframe=a;
DJC.node=null;
DJC.iframe.addEventListener("load",
   function() {
      DJC.iframe.contentDocument.body.appendChild(document.createElement("style")).innerHTML=CSS;
      DJC.node=DJC.iframe.contentDocument.createElement("div");
      DJC.node.innerHTML='<div>\n   <img src="'+Base64_DragIcon+'" id="DRAGGER" ondragstart="return false" onselectstart="return false">\n   <h1>Greasemonkey Shell</h1>\n   <p>Please enter the code you would like to run \n   from a Greasemonkey sandbox.</p>\n   <div>\n      <div></div>\n      <div>\n         <textarea></textarea>\n         <ul>\n            <li style="width:70px">Run</li>\n            <li style="width:69px">Clear</li>\n            <li style="width:69px">Enlarge</li>\n            <li style="width:69px">Shrink</li>\n         </ul>\n      </div>\n      <div style="clear:both"></div>\n   </div>\n   <input type="button" value="Close Shell">\n</div>';
      DJC.node=DJC.node.firstChild;
      DJC.node.id="DJC-GM-GMShell";
      DJC.node.parentNode.removeChild(DJC.node);
      DJC.iframe.contentDocument.body.appendChild(DJC.node);
      DJC.resultNode=DJC.node.getElementsByTagName("div")[0].getElementsByTagName("div")[0];

      EV.init(DJC.iframe.contentDocument);

      EV.addEventListener(DJC.node.getElementsByTagName("li")[0],"click",
         function(e){
            if(e.layerX)DJC.GUI.Run(Trigger) // "faked" events can't set layerX or layerY in FF3 or below.
         }
      );

      EV.addEventListener(DJC.node.getElementsByTagName("li")[1],"click",
         function(e){
            if(e.layerX&&DJC.resultNode.firstChild&&confirm("Clear all of the output from the GM Shell?"))DJC.GUI.Clear(Trigger) // "faked" events can't set layerX or layerY in FF3 or below.
         }
      );

      EV.addEventListener(DJC.node.getElementsByTagName("li")[2],"click",
         function(e){
            if(e.layerX&&this.className.indexOf("DIS")<0)DJC.GUI.Enlarge(Trigger) // "faked" events can't set layerX or layerY in FF3 or below.
         }
      );

      EV.addEventListener(DJC.node.getElementsByTagName("li")[3],"click",
         function(e){
            if(e.layerX&&this.className.indexOf("DIS")<0)DJC.GUI.Shrink(Trigger) // "faked" events can't set layerX or layerY in FF3 or below.
         }
      );

      EV.addEventListener(DJC.iframe.contentDocument.getElementById("DRAGGER").wrappedJSObject,"mousedown",DJC.Dragger.event_mousedown);
      DJC.iframe.contentDocument.addEventListener("mouseup",DJC.Dragger.stop,true);
      document.addEventListener("mouseup",DJC.Dragger.stop,true);

      EV.addEventListener(DJC.node.getElementsByTagName("input")[0],"click",DJC.killConsole);

    },false);

document.body.appendChild(DJC.iframe);

DJC.invoke=
function(){
   DJC.iframe.style.display="";
   if(!DJC.node)DJC.node=DJC.iframe.contentDocument.getElementById("DJC-GM-GMShell");
   DJC.GUI.$.updateIframe();
};

GM_registerMenuCommand("Open Greasemonkey Shell",DJC.invoke);

})();