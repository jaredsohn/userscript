// ==UserScript==
// @name        DeviantArt: Artist name on thumbnails
// @author      http://userscripts.org/users/fremea
// @namespace   http://userscripts.org/scripts/show/177088
// @description Show the artist's name on top of thumbnails where it's possible & necessary
// @icon        https://cdn4.iconfinder.com/data/icons/iconset-addictive-flavour/png/social media/social_deviantart.png
// @date        2013/09/02
// @source        http://userscripts.org/scripts/review/177088
// @updateURL     https://userscripts.org/scripts/source/177088.meta.js
// @downloadURL   https://userscripts.org/scripts/source/177088.user.js
// @include     http://www.deviantart.com/
// @include     http://www.deviantart.com/*
// @include     http://browse.deviantart.com/*
// @include     https://www.deviantart.com/
// @include     https://www.deviantart.com/*
// @include     https://browse.deviantart.com/*
// @version     0.9
// @grant       GM_addStyle
// @run-at      document-end
// ==/UserScript==

///////////////////////////////////////////////////////////////////////////////
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
////////////////////////// START OF HELPER FUNCTIONS //////////////////////////

// une fonction log personnalisée dans la console web (section 'journal')
function _log(info) {
    console.log('\t\t\t\t::: ' + GM_info.script.name + ' ' + GM_info.script.version + ' :::\n' + info + '\n...........................................................................');
}

function $id(id) {
    return document.getElementById(id);
}

function $class(className) {
    return document.getElementsByClassName(className);
}

// Get 'Meta' attribute 'content' by selecting 'property' attribute, equivalent to the jquery $("meta[property='og:type']").attr("content");
function GetMetaValue(cls,propname, propname_value) {
    var _cls = $class(cls);
    var counter = 0;
    for (counter; counter < _cls.length; counter++) {
   // _log(_cls[counter].getAttribute(propname));

        if (_cls[counter].getAttribute(propname) == propname_value) {
           return _cls[counter];
        }
    }
    return "no meta found with this value";
}

function hasclass(target,tasks,cls) {
// tasks possibles: add , remove , toggle , contains
   element.classList.tasks(cls)
}

function username(target,usrinfo,cls,insbf) {
      var thumbs = target.querySelectorAll(usrinfo);
   // _log('thumbs = ' +thumbs);
   // _log('target = ' +target+"\nusrinfo = "+usrinfo+"\ncls = "+cls+"\ninsbf = "+insbf);
   // _log('thumbs.length = ' +thumbs.length);

      if (thumbs) {
          for(var i = 0; i < thumbs.length; i++) {
   // _log('thumbs = ' +thumbs[i]);
            switch (cls) {
             case "da_show_artist_browse_expanded":
             var done = thumbs[i].querySelector('.'+cls);
             break;

             case "da_show_artist_deviations_expanded":
             var done = thumbs[i].parentNode.querySelector('.'+cls);
             break;
            }
   // _log('done = ' + done);

            if (!done) {
               var thumb_username = thumbs[i].getAttribute("username")
               var cat = target.querySelector(insbf);
   // _log("cat : " + cat);
               if (cat) {
                   span = thumbs[i].querySelector(insbf);
               }
               else {
                   span = thumbs[i];
               }
                un_span = document.createElement("SPAN");
                artist_link = document.createElement("A");
                artist_link.href = "http://" + thumb_username.toLowerCase() + ".deviantart.com/";
                artist_link.appendChild(document.createTextNode(thumb_username));
                un_span.appendChild(artist_link);
                span.parentNode.insertBefore(un_span, span);
                un_span.className = cls;
            }
         }

         if ((typeof(thumbs) == 'undefined') || (thumbs == null)) {
            return false;
         }
      }
}

function doShowArtist() {
   // _log("doShowArtist : ok\nlis_el = "+lis_el+"\nlis_cls = "+lis_cls);
    username(lis_el,".tt-a",lis_cls,".thumb");
}

function doShowArtist2(mutationRecords) {
   // _log("doShowArtist2 : ok");

    mutationRecords.forEach (function (mutation) {

        if (    mutation.type               == "childList"
            &&  typeof mutation.addedNodes  == "object"
            &&  mutation.addedNodes.length
        ) {
            for (var i = 0; i < mutation.addedNodes.length; i++) {
   // _log("node : " + mutation.addedNodes[i]);
          username(mutation.addedNodes[i],".tt-a",lis_cls,".thumb");
            }
        }
    } );
}

function load(target,fn) {
   target.addEventListener("click", fn, false);
}

/////////////////////////// END OF HELPER FUNCTIONS ///////////////////////////
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
///////////////////////////  START OF MAIN SCRIPT  ////////////////////////////
   // _log('- will update? : ' + GM_info.scriptWillUpdate);

   // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   ////////////////////////  START OF MutationObserver  //////////////////////////

   // create an observer instance
   MutationObserver = window.MutationObserver;
   observer = new MutationObserver(doShowArtist2);

   // configuration of the observer:
   config = { attributes: false,
               attributeOldValue: false,
   //             attributeFilter: ["class"],
               childList: true,
                  subtree:true,
               characterData: false,
                  characterDataOldValue: false
             };
   // later, you can stop observing
   // observer.disconnect();

   /////////////////////////// END OF MutationObserver ///////////////////////////
   // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// attendre le chargement de la page complet avant de lancer les fonctions suivantes (nécessaire)
// window.onload = function() {
var searchANDbrowse = $id("browse-results");
var deviations = $id("messages");
   // _log("deviations : " + deviations);
// select the node to listen or process
if (searchANDbrowse) {lis_el = searchANDbrowse; lis_cls = "da_show_artist_browse_expanded";}
else if (deviations) {lis_el = deviations; lis_cls = "da_show_artist_deviations_expanded";}
   // _log("lis_el : " +lis_cls);

if (lis_el){
doShowArtist();
// pass in the target node, as well as the observer options
observer.observe(lis_el, config);
//     load(document,doShowArtist);
}
// }

////////////////////////////  END OF MAIN SCRIPT   ////////////////////////////
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//////////////////////////    START OF CSS STYLES   //////////////////////////

var _cls_browse = $class("da_show_artist_browse_expanded");
var _cls_deviations = $class("da_show_artist_deviations_expanded");
   // _log('_cls_browse = ' + _cls_browse);
   // _log('_cls_deviations = ' + _cls_deviations);

if (_cls_deviations) {
// Adds the CSS styles for the script to the page
GM_addStyle("/* da_show_artist_deviations_expanded */\
               .mcb-app{display:none!important}\
               .da_show_artist_deviations_expanded a{-moz-hyphens:none!important;color:#000!important;text-decoration:none!important;word-wrap:break-word!important}\
               .da_show_artist_deviations_expanded a:hover{color:#FFF!important}\
               .da_show_artist_deviations_expanded{background-color:#C93;border-radius:0 0 8px 0;display:inline-block;font-size:12pt;left:0;line-height:16pt;position:absolute;top:0;width:80%}");
}

if (_cls_browse) {
// Adds the CSS styles for the script to the page
GM_addStyle("/* da_show_artist_browse_expanded */\
               .da_show_artist_browse_expanded a{-moz-hyphens:none!important;color:#000!important;text-decoration:none!important;word-wrap:break-word!important}\
               .da_show_artist_browse_expanded a:hover{color:#FFF!important}\
               .da_show_artist_browse_expanded{background-color:#C93;border-radius:8px 8px 0 0;display:inline-block;font-size:12pt;left:0;line-height:16pt;position:relative;text-align:center;top:0;width:100%;z-index:99!important}");
}
///////////////////////////    END OF CSS STYLES    ///////////////////////////
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
///////////////////////////////////////////////////////////////////////////////

