// ==UserScript==
// @name        RallyDev Improvements
// @namespace   http://userscripts.org/scripts/show/107207
// @include     https://*rallydev*/*
// @include     http://*rallydev*/*
// @description Make RallyDev Better with toggable columns, 
// @copyright   2013+, Brendan Crosser-McGay
// @version     1
// @licence     MIT
// ==/UserScript==
function changeSizeIfNeeded(width,things) {
  for(var i=0;i<things.length; i++) {
    try {
      if (document.getElementsByName(things[i])[0].style["width"] != width)
        document.getElementsByName(things[i])[0].style["width"]=width;  
    } catch (e) { } 
  }
}

setInterval(function(){
  // Make some things smaller
  var things = ["tasksForLikeIterations", "tasksForLikeReleases", "owner", "list[0].owner", "list[0].estimate", "list[0].remaining", "list[0].actual", "projectOid", "agileOwner", "submitter", "priority", "severity"];
  changeSizeIfNeeded("80px",things);
  
  // Make some small things smaller
  things = ["estimate0","remaining0","actual0"]
  changeSizeIfNeeded("25px",things);
  
  // Make some things larger
  things = ["list[0].name"] 
  changeSizeIfNeeded("350px",things);
  
  //things = document.getElementsByClassName("sprite-edit");
//   for(var i=0;i<things.length;i++) {
//     things[i].onclick = "tpsrefresh();return false;";
//     things[i].addEventListener("click", function(e) {
//       alert('this');      
//     }, false);    
//   }
  
  //document.getElementsByClassName("sprite-edit")[0].onclick="return false";document.getElementsByClassName("sprite-edit")[0].addEventListener("click",function(e) { alert(e.type); }, false); 
},500)
