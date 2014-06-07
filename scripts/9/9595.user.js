// ==UserScript==
// @name           IMDB google headshot
// @namespace      userscripts.org/alien_scum
// @description    Get extra photos for actors on movie pages
// @include        http://*imdb.com/title/*
// ==/UserScript==

// Based on Henrik's awsome IMDB enlarge actor pictures on hover
// http://userscripts.org/scripts/show/4169

resObj = document.body.appendChild(document.createElement('div'));
resObj.style.display = 'none';

var tiny_heads_xp = "//a[contains(@href, 'tinyhead')]/img";

GM_addStyle(
  // Since we replaced thumbs with medium images and removed width/height, keep them small this way
  "img.GM_actorPicture { height:32px; width:22px; }" +
  // Enlarge on hover
  "tr:hover a img.GM_actorPicture { height:auto; width:100px; position:absolute; margin-left:-77px !important; margin-top:-51px !important; }"
);

$x(tiny_heads_xp).forEach(function(img) {
  img.src = img.src.replace(/(\d)t\.(jpg|gif|png)$/, "$1m.$2");  // Replace thumbs with medium images
  img.className = "GM_actorPicture";
  img.height = img.width = null;    
});

$x('.cast//tr').forEach(function(tr){
  if(i=$('img[contains(@src,"addtiny.gif")]',tr))
    xhr($('.nm//a',tr).href+'photogallery',function(r,i,n){
       resObj.innerHTML = r.match(/<body[^>]*>([\s\S]*)<\/body>/)[1];
       photos=$x('#tn15content//img[contains(@src,"Photos")]',resObj)
       if(photos.length) {
         face=photos[0];
         //portrait is better than landscape
         photos.forEach(function(p){
           if(face.height<face.width&&p.height>p.width) face=p;
         });
         i.style.border="2px solid green;"; //warn people this is might be wrong wrong
         i.style.margin="-2px";        
         i.className = "GM_actorPicture";
         i.src=face.src.replace(/th-/,'');
         //google face search it's a bit crappy but hey
       }else xhr('http://images.google.com/images?imgtype=face&q=%22'+escape(n+'"'),function(r,i){
         resObj.innerHTML = r.match(/<body[^>]*>([\s\S]*)<\/body>/)[1];
         i.src=img=$('img[contains(@src,"google.com/images")]',resObj).src;
         i.style.border="2px solid red;"; //warn people this is probably wrong
         i.style.margin="-2px";        
         i.className = "GM_actorPicture";
       },i);
    },i,$('.nm//a',tr).textContent);
});

function xhr(uri,f,a,b,c) {GM_xmlhttpRequest({method: 'get',headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'},url: uri,onload:function(res){f(res.responseText,a,b,c)}});}


function $x(xpath,root) { 
  xpath=xpath.replace(/((^|\|)\s*)([^/|\s]+)/g,'$2.//$3').replace(/\.([\w-]+)(?![^[]*])/g,'[@class="$1"]').replace(/#([\w-]*)/g,'[@id="$1"]').replace(/\/\[/g,'/*[');
  var got=document.evaluate(xpath,root||document,null,null,null), result=[];
  while(next=got.iterateNext()) result.push(next);
  return result;
}
function $(xpath,root){return $x(xpath,root)[0]}