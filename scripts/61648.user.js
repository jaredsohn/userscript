// ==UserScript==
// @name           twitter_bg_viewer
// @namespace      http://twitter.com/towtter
// @include        http://twitter.com/*
// ==/UserScript==
function toggle_display_style(obj){
  var a = document.getElementById("userdropdownmenu-toggle-show-hide-background");
  if ((obj.style.display == "") || (obj.style.display == "block")){
    obj.style.display = "none";
    if (a)
      a.innerHTML = "Show Background";
  } else {
    obj.style.display = "block";
      a.innerHTML = "Hide Background";
  }
}
(function(){
   // for new twitter UI
   var ulists = document.getElementsByTagName("ul");
   for (var i = 0; i < ulists.length; i++) {
     if (ulists[i].className == 'user-dropdown') {
       var a = document.createElement("a");
       a.innerHTML = "Hide Background";
       a.addEventListener("click", 
         function(){
           var container = document.getElementById("page-container");
           if (container)
             toggle_display_style(container);
         }, false);
       a.id = "userdropdownmenu-toggle-show-hide-background";
       var newli = document.createElement("li");
       newli.appendChild(a);
       var form = document.getElementById("signout-form");
       if (form) {
         ulists[i].insertBefore(newli, form.parentNode);         
       } else {
         ulists[i].appendChild(newli);         
       }
     }
   }
/*
 // for old twitter UI
   var divTags = document.getElementsByTagName("div");
   for (var i = 0; i < divTags.length ; i ++){
     if (divTags[i].className == 'content-bubble-arrow') {
       var bubble = divTags[i];
       bubble.addEventListener("click", 
         function(){
           var tbl = document.getElementsByTagName("table");
           for (var i = 0; i < tbl.length; i++){
             if (tbl[i].className == "columns"){
               toggle_display_style(tbl[i]);
             }
           }
           var footer = document.getElementById("footer");
           toggle_display_style(footer);
           var header = document.getElementById("header");
           toggle_display_style(header);
         }, false);
     }
   }
*/
})();