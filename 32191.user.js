// ==UserScript==
// @name           deviantART - Unfav from Favourites
// @namespace      http://davidjcobb.deviantart.com/
// @description    Allows you to unfavourite deviations while editing your Favourites.
// @include        http://*.deviantart.com/favourites
// @include        http://*.deviantart.com/favourites/
// @include        http://*.deviantart.com/favourites/*
// @include        http://*.deviantart.com/favourites/#_edit_
// @include        http://*.deviantart.com/favourites/#_edit_*
// @exclude        http://*.deviantart.com/favourites/v1
// @exclude        http://*.deviantart.com/favourites/v1/
// @exclude        http://*.deviantart.com/favourites/v1/*
// ==/UserScript==

unsafeWindow.DJC_GM=unsafeWindow.DJC_GM||{};
unsafeWindow.DJC_GM.dA=unsafeWindow.DJC_GM.dA||{};
window.uIDs=unsafeWindow.DJC_GM.dA.unFavIds=new (function(){var data={};var length=0;this.__defineGetter__("length",function(){return length});this.add=function(i){data[i]=1;length++};this.rmv=function(i){delete data[i];length--};this.check=function(i){return data[i]||!1};this.enumerate=function(){var a=[],i;for(i in data){if(!(i in {}))a.push(i)}return a};this.deletionRecord=new (function(O){var logs={},length=0;this.owner=O;this.add=function(i){length+=(logs[i]=1)};this.check=function(i){return !!logs[i]};this.__defineGetter__("length",function(){return length});this.enumerate=function(){var a=[],i;for(i in logs){if(!(i in {}))a.push(i)}return a}})(this);})();

unsafeWindow.DJC_GM.dA.unFavRefreshPage=window.refresh=
function(p) {
   var u=unsafeWindow,A=u.Keeper2.get(u.Tree.get("div.artzone")),T=A._KP_getPropTask("page");
   u.Bug.log("Milestone from setprop","page:="+A.getProp("page")+"("+T.listeners.length+" listening)");
   T.milestone("data",A.getProp("page"),"set","page");
};

unsafeWindow.DJC_GM.dA.unFavListMgr=
{
   list:[],
   add:
      function(s,d) {
         if(this!=unsafeWindow.DJC_GM.dA.unFavListMgr)return arguments.callee.apply(unsafeWindow.DJC_GM.dA.unFavListMgr,arguments);
         if(s) {
            unsafeWindow.DJC_GM.dA.unFavListMgr.list.push([1,d.request.args[1],(d.response.content.match(/">([a-zA-Z\d _'"\+\.,\$\?\:\-]+)<\/a><br\/><small><\/small><!-- TTT\$ --><\/span><\/div>$/)||[0,null])[1]]);
            this.show();
         }
      },
   show:
      function() {
         if(this!=unsafeWindow.DJC_GM.dA.unFavListMgr)return arguments.callee.apply(unsafeWindow.DJC_GM.dA.unFavListMgr,arguments);
         if(!this.ready)this.init();
         this.ul.innerHTML="";
         var i=0,s="\n",L=this.list,l=L.length;
         for(;i<l;i++) {
            s+="<li"+(i%2?" class='odd'":"")+"><a href='http://www.deviantart.com/deviation/"+L[i][1]+"'>"+(L[i][2]||"[can't display title]")+"</a></li>\n";
         }
         this.div.className="";
         this.ul.innerHTML=s;
         this.div.lastChild.innerHTML="[collapse]";
         this.div.lastChild.setAttribute("onclick","DJC_GM.dA.unFavListMgr.hide()");
      },
   hide:
      function() {
         if(this!=unsafeWindow.DJC_GM.dA.unFavListMgr)return arguments.callee.apply(unsafeWindow.DJC_GM.dA.unFavListMgr,arguments);
         if(!this.ready)this.init();
         this.div.className="hidden";
         this.ul.innerHTML="";
         this.div.lastChild.innerHTML="[show]";
         this.div.lastChild.setAttribute("onclick","DJC_GM.dA.unFavListMgr.show()");
      },
   ul:null,
   div:null,
   style:null,
   init:
      function() {
         if(this!=unsafeWindow.DJC_GM.dA.unFavListMgr)return arguments.callee.apply(unsafeWindow.DJC_GM.dA.unFavListMgr,arguments);
         this.div=document.body.appendChild(document.createElement("div"));
         this.div.id="DJC-GM-Unfav-ListHolder";
         this.div.innerHTML="\
<span>Unfav'd Deviations</span>\n\
<p>This list will be cleared when you leave or reload the page.</p>\
";
         this.ul=this.div.appendChild(document.createElement("ul"));
         this.ul.id="DJC-GM-Unfav-List";
         this.div.appendChild(document.createElement("i")).innerHTML="[collapse]";
         this.div.lastChild.setAttribute("onclick","DJC_GM.dA.unFavListMgr.hide()");
         this.style=document.body.appendChild(document.createElement("style"));
         this.style.innerHTML="\n\
#DJC-GM-Unfav-ListHolder{display:none}\n\
body.editmode>#DJC-GM-Unfav-ListHolder{display:block}\n\
\n\
#DJC-GM-Unfav-ListHolder{padding:0;margin:0;width:178px;position:fixed;right:0;top:37px;z-index:9999;background:#666;color:#DDD;border:0 solid #FFF;border-width:0 0 3px 3px;-moz-border-radius:0 0 0 10px}\n\
#DJC-GM-Unfav-ListHolder.hidden{width:125px!important}\n\
   #DJC-GM-Unfav-ListHolder>span{font-size:1.25em;font-weight:bold;padding:5px}\n\
   #DJC-GM-Unfav-ListHolder>p{font-size:.8em;padding:0 5px 5px 5px;margin:0}\n\
   #DJC-GM-Unfav-ListHolder>i{font-size:.8em;position:absolute;bottom:0;padding:5px;font-style:normal;cursor:pointer}\n\
   #DJC-GM-Unfav-ListHolder>i:hover{color:#FFF}\n\
\n\
#DJC-GM-Unfav-List{display:block;list-style:none;padding:0;margin:0 0 22px 0;width:177px;height:200px;overflow-y:auto;background:#444;border:0 solid #CCC;border-width:2px 0}\n\
#DJC-GM-Unfav-ListHolder.hidden>#DJC-GM-Unfav-List{height:0;border-top-width:0}\n\
   #DJC-GM-Unfav-List>li{padding:0 5px 5px 5px;background:#555}\n\
   #DJC-GM-Unfav-List>li.odd{background:#5D5D5D}\n\
      #DJC-GM-Unfav-List>li>a{color:#DDD}\n\
";
         this.ready=!0
      }
};

unsafeWindow.FFGM_DJC_DA_KillFav=window.FFGM_DJC_DA_KillFav=
function(success,data) {
   if (success) {
      //alert("The favorite was successfully removed.");
      
      var u=unsafeWindow,$ARTZONE$=u.Keeper2.get(u.Tree.get("div.artzone")),$GALLERY$=null,sections,a=0,i,tID=data.request.args[0];

      // refresh the display

      // just in case any more DiFi calls are made, we want them to get the updated 
      // result, not the Favourites as they were before we removed a Deviation from them.
      // to that end, we clear the cached calls and results from the DiFi cache.
      // think of it as clearing your browser cache.
      // NOTE: this step might not be necessary; additional research is needed.
      u.DiFi.cached={};

      // We've already deleted the cache, so if we wanted to, we could completely 
      // refresh all RIDs and cached deviations by doing:
      //   $GALLERY$.off();$GALLERY$.on();
      // but that's slow and a little disruptive to the GUI (makes everything 
      // disappear for a few seconds).
      // so instead, we find the section affected by this change, and manually 
      // remove the unfaved deviation's entry from it.
      try{ // this won't work in sections 'cause there's no div.gallery node.
         $GALLERY$=u.Keeper2.get(u.Tree.get("div.gallery"))
      }catch(IS){
         try{
            // ArtZone's always available, so as a last resort we grab it and use its up() method to grab the Gallery instance
            $GALLERY$=$ARTZONE$.up(u.Gallery)
         }catch(WTF){GM_log("DavidJCobb - dA Unfav from Favourites -- Can't find the Gallery object!!")}
      }
      sections=$GALLERY$.peek("data","sections").status.result;

      // Remove this Deviation's entries from all sections.
      for(;sections[a];a++){
         for(i=0;i<sections[a].ids.length&&sections[a].ids[i];i++){
            if(sections[a].ids[i][1]==tID){
               sections[a].ids.splice(i,1);
               break
            }
         }
      }

      // then, we set the page to itself, causing the display to "refresh".
      // (we can't just use $ARTZONE$.setProp("page",$ARTZONE$.getProp("page"))
      //  because setProp is coded to return if the operation is redundant 
      //  (if no actual change would be made to the value);
      //  however we do need to notify all listeners of this property just like 
      //  setProp would.
      //  Fun fact: to achieve that, I just lifted the following lines 
      //  ('cept the first) from setProp.  )
      window.refresh();

      window.uIDs.deletionRecord.add(tID)
   } else {
      alert("Unable to remove Favourite. Please try again.")
   }

   u.DiFi.pushPublicGet("Resources","htmlFromRID",[1,tID,"thumb150","artist:0\,title:1"],u.DJC_GM.dA.unFavListMgr.add);

   // revert top bar to default text if no more favourites are being removed
   window.uIDs.rmv(tID);
   document.getElementById('editmode').getElementsByTagName('span')[0].innerHTML=(success)?'Favourite removed.':'Unable to remove favourite.';
   u.setTimeout("document.getElementById('editmode').getElementsByTagName('span')[0].innerHTML=['Editing','Removing favourite...'][Number(!!DJC_GM.dA.unFavIds.length)];",2000); // return to default text.
};

var Inject=
function() {
   MenuTraffic.overrides['gallerylink']=
      function (H) {
         var L=H.split("/"),D=[],J,E=0,C,I=Number(L[1]),B=L[2].split("-"),F,K,G=(B.length>1?String(B.length):""),A;
         DRE.assert(B.length>0,"woo hah");
         A = (F=Gallery.getInstance()).typeid==COMMENT_FAVCOLLECTIONS;
         F.peek("data","relevant sections").reset();
         F.get("data","relevant sections");
         J=[F.getCurrentSection(F.peek("data","sections").status.result),F.featured_section_data].concat(F.peek("data","relevant sections").status.result);
         for(;E!=J.length;E++) {
            if(!J[E])continue;
            C=0;
            if(B.length > 1){
               if(J[E].name=="Featured"&&!F.getProp("sectionid")||(Number(J[E].sectionid)==I))C--;
            } else {
               for(;J[E].ids[C];C++) {
                  if(J[E].ids[C][0]+":"+J[E].ids[C][1]==B[0]){
                     C=-1;
                     break;
                  }
               }
            }
            if (C==-1){
               D.push({title:(J[E].name=="Featured"?"Remove from \""+(A?"Favourites":"Gallery")+"\"":"Remove "+G+" from \""+J[E].name+"\"")+(F.is_group?"...":""),path:L.concat(["unput",J[E].sectionid]),children:null,flag:Math.min(E,2)});
            }else{
               D.push({title:J[E].name=="Featured"?"Show in \""+(A?"Favourites":"Gallery")+"\"":"Show "+G+" in \""+(J[E].name||"Devious Folder")+"\"",path:L.concat(["put",J[E].sectionid]),children:null,flag:Math.min(E,2)});
            }
            if(J[E].name=="Featured")D.push({title:"Remove from Favourites",path:L.concat("unfavourite"),children:null,flag:0});
         }
         MenuTraffic.got(true,H,{volatile:true,all:null,title:null,path:L,children:D});
         return true;
      };
   ArtZone.prototype.galleryMenuBack=
      function anonymous(F, A) {
         var C, B, H, D, G, I, J, E;
         if (F != "") {
            Pager.select(A, "");
            C = F.split("/");
            DRE.assert(C.shift() == "gallerylink", "bottom bottom");
            G = Number(C.shift());
            B = C.shift().split("-");
            Popup.complete(A.node);
            switch (C[0]) {
               case "unfavourite":
                  if(!confirm("Remove this deviation from your Favourites?"))return;
                  if (DJC_GM.dA.unFavIds.deletionRecord.check(B[0].split(":")[1])) {
                     DJC_GM.dA.unFavRefreshPage();
                     break;
                  }
                  DiFi.pushPost("Deviation", "Favourite", [B[0].split(":")[1]], FFGM_DJC_DA_KillFav, {value: F, sectionid: this.sectionid});
                  DiFi.send();
                  document.getElementById("editmode").getElementsByTagName("span")[0].innerHTML = "Removing favourite...";
                  DJC_GM.dA.unFavIds.add(B[0].split(":")[1]);
                  break;
                  this.up(Gallery).featured_warning_done = true;
                  for(D=0;D!=B.length;D++) {
                     this.broadcast("sectionui", this.up(Gallery).featured_section_data.sectionid, "resource", B[D].split(":"), 0);
                  }
                  break;
               case "unfeature":
                  if (!this.up(Gallery).featured_warning_done || this.up(Gallery).is_group) {
                     this.up(Gallery).featured_warning_done = true;
                     if (this.up(Gallery).is_group) {
                        if (!confirm("Are you sure you want to remove the selected art?"))return;
                     } else {
                        if (this.up(Gallery).typeid == COMMENT_FAVCOLLECTIONS) {
                           if (!confirm("After this item has been hidden from your Favourites, you can bring it back any time by finding it in the \"Browse\" section."))return;
                        } else {
                           if (!confirm("After this item has been removed from \"Featured\", you can bring it back any time by finding it in the \"Browse\" section."))return;
                        }
                     }
                  }
                  for (D=0;D!=B.length;D++) {
                      this.broadcast("sectionui", this.sectionid, "resource", B[D].split(":"), -1);
                  }
                  break;
               case "put":
                  for (D=0;D!=B.length;D++) {
                     this.broadcast("sectionui", C[1], "resource", B[D].split(":"), 0);
                  }
                  break;
               case "unput":
                  if (this.up(Gallery).is_group) {
                     if (!confirm("Are you sure you want to remove the selected art?"))return;
                  }
                  for (D=0;D!=B.length;D++) {
                     this.broadcast("sectionui", C[1], "resource", B[D].split(":"), -1);
                  }
                  break;
               default:
                  alert("Unknown command. Please try again later.");
            }
         }
         return false;
      };

   // don't know if this is necessary.
   /*var a = document.createElement("style");
   a.innerHTML="iframe.hidoframe{width:0px!important;height:0px!important;display:none!important;}";
   document.documentElement.appendChild(a); */

};

window.init=
function() {
   var STR=Inject.toString().replace(/\n/g,""); // FF3 prevents sandboxes from screwing around with the prototypes of other sandboxes/windows' objects.
   window.location.href="javascript:("+STR+")();void(0);"; // so we will cleverly use a JS URL to work around that.
};

window.addEventListener("load",window.init,!0);