// ==UserScript==
// @name           pixiv_search_helper
// @namespace      yktmt.com
// @include        http://www.pixiv.net/member_illust.php*
// @include        http://www.pixiv.net/search.php*
// @include        http://www.pixiv.net/tags.php*
// @include        http://www.pixiv.net/tags_r18.php*
// ==/UserScript==

(function(){

var r18 = (document.URL.indexOf("tags_r18.php") > -1);
var items = ["or","minus","wrap","clear","disable","search","and-mode"];
var p = null;
if(document.URL.indexOf("member_illust.php") > -1 && document.getElementById("tag_area"))){
   p = document.getElementById("tag_area").getElementsByTagName("p")[0];
}else if(document.URL.indexOf("tags.php") > -1 || document.URL.indexOf("search.php") > -1 || r18){
   document.getElementsByName("word")[0].value += " ";
   /*
   p = document.getElementsByClassName("search_a2_result")[0];
   for(var i=0,l=p.parentNode.childNodes.length; i<l; i++){
      p = p.previousSibling;
      if(p && p.tagName == "DIV"){ break; }
   }
   */
   p = document.getElementsByClassName("related-tag")[0];
   p.setAttribute("id","tags");
}else[
   return;
}
p.innerHTML += " ";
var span = document.createElement("span");
span.setAttribute("id","helpon");
span.setAttribute("style","display:none;");
span.innerHTML += "[";
for(var i=0;items[i];i++){
   var a = document.createElement("a");
   a.href = "javascript:void(0)";
   a.innerHTML = items[i];
   switch(items[i]){
      case "and-mode":
         a.setAttribute("id","helpoff");
         p.appendChild(a);
         break;
      case "search":
         a.href = r18 ? "tags_r18.php" : "tags.php";
         span.appendChild(a);
         break;
      default:
         span.appendChild(a);
         span.innerHTML += "|";
   }
}
span.innerHTML += "]";
p.appendChild(span);

document.getElementById("helpoff").addEventListener("click", function(e){
   var ph = document.getElementsByClassName("placeholder")[0];
   if(ph){   ph.parentNode.removeChild(ph); }
   var tags = document.getElementById("tags").getElementsByTagName("a");
   for(var i=0;tags[i];i++){
      if(tags[i].href.indexOf("?tag=") > -1){
         tags[i].addEventListener("click", addTag, false);
      }
   }
   e.target.setAttribute("style","display:none;");
   document.getElementById("helpon").setAttribute("style","display:inline;");
}, false);

var oprts = document.getElementById("helpon").getElementsByTagName("a");
sethref();
for(var i=0;oprts[i];i++){
   switch(oprts[i].innerHTML){
      case "or":
         oprts[i].addEventListener("click", addTag, false);
         break;
      case "minus":
         oprts[i].addEventListener("click", function(e){
            document.getElementsByName("word")[0].value += "-";
            sethref();
         }, false);
         break;
      case "wrap":
         oprts[i].addEventListener("click", function(e){
            var word = document.getElementsByName("word")[0].value;
            document.getElementsByName("word")[0].value = "(" + word + ") ";
            sethref();
         }, false);
         break;
      case "clear":
         oprts[i].addEventListener("click", function(){
            document.getElementsByName("word")[0].value = "";
            sethref();
         }, false);
         break;
      case "disable":
         oprts[i].addEventListener("click", function(){
            var tags = document.getElementById("tags").getElementsByTagName("a");
            for(var i=0;tags[i];i++){
               if(tags[i].href.indexOf("?tag=") > -1){
                  tags[i].removeEventListener("click", addTag, false);
               }
            }
            document.getElementById("helpoff").setAttribute("style","display:inline;");
            document.getElementById("helpon").setAttribute("style","display:none;");
         }, false);
         break;
   }
}

document.getElementsByName("word")[0].addEventListener("change", function(e){
   sethref();
}, false);

function addTag(e){
   e.preventDefault();
   document.getElementsByName("word")[0].value += e.target.innerHTML + " ";
   sethref();
}

function sethref(){
   var search = oprts[oprts.length - 1];
   var word = encodeURIComponent(document.getElementsByName("word")[0].value);
   if(word != ""){
      if(r18 && word.indexOf("R-18") < 0){ word += "R-18"; }
      search.href = "search.php?word=" + word.replace(/%20/g,"+") + "&s_mode=s_tag";
   }else{
      search.href = r18 ? "tags_r18.php" : "tags.php";
   }
}

})();
