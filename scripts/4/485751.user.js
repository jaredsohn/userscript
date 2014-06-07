// ==UserScript==
// @name          [HFR] pomf.se webm
// @version       0.11.2
// @namespace     roger21.free.fr
// @description   permet d'afficher les webm de pomf.se  (i.e. comme des gif) avec le bbcode [webm][/webm]
// @icon          http://reho.st/self/8be6cfd410001113ffc0e909a807205fdb5b6751.png
// @include       http://forum.hardware.fr/*
// @grant         GM_info
// @grant         GM_deleteValue
// @grant         GM_getValue
// @grant         GM_listValues
// @grant         GM_setValue
// @grant         GM_getResourceText
// @grant         GM_getResourceURL
// @grant         GM_addStyle
// @grant         GM_log
// @grant         GM_openInTab
// @grant         GM_registerMenuCommand
// @grant         GM_setClipboard
// @grant         GM_xmlhttpRequest
// ==/UserScript==

// $Rev: 912 $


// historique :
// 0.11.2 (29/04/14) :
// Hébergement des images sur pomf.se 
// 0.11.1 (13/04/14) :
// - complément de la description
// 0.11 (08/04/14) :
// - gestion de la touche echap pour pauser les webms et activer les contrôls
// 0.10 (07/04/14) :
// - changement du bbcode : 4chan -> webm
// 0.9 (06/04/14) :
// - création

//var regexp=/\[webm\](https?:\/\/i\.4cdn\.org\/wsg\/[0-9]+\.webm)\[\/webm\]/gi;
var regexp=/\[webm\](http?:\/\/a\.pomf\.se\/[a-zA-Z0-9]+\.webm)\[\/webm\]/gi;

document.addEventListener("keypress", function(e){
  if(e.keyCode == 27){
    var webms=document.querySelectorAll("video.fourchanwebm");
    for(var webm of webms){
      webm.pause();
      webm.controls=true;
    }
  }
}, false);

GM_registerMenuCommand("[HFR] 4chan webm -> largeur maximale des 4chan webm", set_max_width);

function set_max_width(){
  var l_max_width=GM_getValue("max_width", 0);
  l_max_width=window.prompt("[HFR] 4chan webm -> largeur maximale des 4chan webm (-1 désactivé, 0 auto, x personalisé) :",
                            l_max_width);
  if(l_max_width === null)
    return;
  if(parseInt(l_max_width) === -1)
    GM_setValue("max_width", -1);
  else if(isNaN(parseInt(l_max_width)))
    GM_setValue("max_width", 0);
  else
    GM_setValue("max_width", Math.max(parseInt(l_max_width), 0));
}

var max_width=GM_getValue("max_width", 0);
if(max_width === -1)
  max_width=null;
if(max_width === 0)
  max_width=window.innerWidth - 275;

function find_and_replace(node){
  var children=node.childNodes;
  var i=0;
  while(i < children.length){
    var child=children[i++];
    if(child.nodeType === 1){
      find_and_replace(child);
    }
    else if((child.nodeType === 3) && (child.nodeValue.search(regexp) != -1)){
      var last_index=0;
      var parent=child.parentNode;
      while(result=regexp.exec(child.nodeValue)){
        if(result.index != last_index){
          parent.insertBefore(document.createTextNode(child.nodeValue.substring(last_index, result.index)), child);
        }
        var src=result[1];
        last_index=regexp.lastIndex;
        GM_log(src);
        media=document.createElement("video");
        media.setAttribute("src", src);
        media.setAttribute("autoplay", "autoplay");
        media.setAttribute("muted", "muted");
        media.setAttribute("preload", "auto");
        media.setAttribute("loop", "loop");
        media.setAttribute("class", "fourchanwebm");
        if(max_width !== null)
          media.style.maxWidth=max_width+"px";
        media.setAttribute("title", src);
        parent.insertBefore(media, child);
      }
      if(last_index != child.nodeValue.length){
        parent.insertBefore(document.createTextNode(child.nodeValue.substring(last_index)), child);
      }
      parent.removeChild(child);
    }
  }
}

var messages=document.evaluate("//td[@class='messCase2']//div[starts-with(@id,'para')]",
                               document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var i=0;
while(i < messages.snapshotLength){
  var message=messages.snapshotItem(i++)
    find_and_replace(message);
}
