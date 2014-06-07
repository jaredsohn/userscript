// ==UserScript==
// @name           demoronifier
// @namespace      cosmodro.me
// @description    hides morons on forums
// @include        http://board.flashkit.com/board/*
// @include        http://forums.somethingawful.com/showthread.php?*
// ==/UserScript==

var rawMoronIndicators = GM_getValue('moronIndicators', " u | r | more then | less then | a women ");
var moronIndicators;
var posts;

function getFKPosts(){
  var posts = document.getElementsByTagName("DIV");
  var postdivs = new Array();
  for (var i = 0; i < posts.length; i++){
   var p = posts[i]; 
   if (p.id.indexOf("post_message") != -1){
     postdivs.push(p)
   }
  }
  return postdivs;
}

function getSAPosts(){
  return document.getElementsByClassName("postbody");
}

/**
* looks through text nodes of post, if it finds an instance of a moronIndicator, 
*it flags the post as moronic 
*/
function processPost(p){
  var pt = p.textContent;
  for (var j = 0; j < moronIndicators.length; j++){
    if (pt.indexOf(moronIndicators[j]) != -1){
      //found a moron.  alter post, then return
      var blackout = document.createElement("DIV");
      blackout.id = "blackout"+p.id
      blackout.className = "moronBlackout";
      blackout.innerHTML = "<b>THIS POST CONTAINS HIGH LEVELS OF STUPIDITY</b><input type=\"button\" value=\"Show Anyway\" onclick=\"document.getElementById('"+p.id+"').style.display=''; document.getElementById('blackout"+p.id+"').style.display='none';\" />";
      blackout.style.width = p.clientWidth + "px";
      blackout.style.height = p.clientHeight + "px";
      p.parentNode.insertBefore(blackout, p);
      p.style.display="none";
    }
  }
}

function addMoronIndicator(){
  var text = prompt("Enter a term only morons use", window.getSelection().toString());
  if (text){
    rawMoronIndicators += "|"+text;
    GM_setValue('moronIndicators', rawMoronIndicators);
    removeAllBlackouts();
    demoronify();
  }
}

function editMoronIndicators(){
  //toss up a div with inputs and a delete button for each indicator, and a save button, also cancel
  GM_log("rawMoronIndicators: "+rawMoronIndicators);
  var menu = document.createElement("DIV");
  //menu.style.width = '500px';
  menu.style.position = 'fixed';
  menu.style.top = '100px';
  menu.style.left = '100px';
  menu.style.backgroundColor = 'gray';
  var title = document.createElement("SPAN");
  title.innerHTML = "<b>Edit Moron indicators.  Spaces count!</b>";
  menu.appendChild(title);
  for (var k = 0; k < moronIndicators.length; k++){
   var entry = document.createElement("DIV");
   var inp = document.createElement("input");
   inp.type="text";
   inp.value = moronIndicators[k];
   inp.className = "mIndicator";
   entry.appendChild(inp);
   var del = document.createElement("input");
   del.type = "button";
   del.value = "delete";
   del.addEventListener("click", function(){menu.removeChild(this.parentNode);}, false);
   entry.appendChild(del); 
   menu.appendChild(entry);
  }
  var save = document.createElement('input');
  save.type = "button";
  save.value= "save";
  save.addEventListener("click", function(){
             var inds = new Array();
             var entries = menu.getElementsByClassName('mIndicator');
             for (var idx = 0; idx < entries.length; idx++){
               inds.push(entries[idx].value);
             }
             rawMoronIndicators = inds.join("|");
             GM_log('moronIndicators in save: '+rawMoronIndicators);
             GM_setValue('moronIndicators', rawMoronIndicators);
             menu.parentNode.removeChild(menu);
             menu = null;
             removeAllBlackouts();
             demoronify();
         }, false);
   menu.appendChild(save);
   var cancel = document.createElement('input');
   cancel.type="button";
   cancel.value = "cancel";
   cancel.addEventListener("click", function(){
             menu.parentNode.removeChild(menu);
             menu = null;
          }, false);
   menu.appendChild(cancel);
   document.body.appendChild(menu);  
}

function removeAllBlackouts(){
  var bos = document.getElementsByClassName("moronBlackout");
  for (var a = 0 ; a < bos.length; a++){
    document.getElementById(bos[a].id.substring("blackout".length)).style.display = "";
    bos[a].parentNode.removeChild(bos[a]);
  }
}

//========

GM_registerMenuCommand("add moron indicator", addMoronIndicator);
GM_registerMenuCommand("edit moron indicators", editMoronIndicators);

function demoronify(){
  moronIndicators = rawMoronIndicators.split("|");
  if (document.domain.indexOf("flashkit.com") != -1){
    posts = getFKPosts();
  }else if (document.domain.indexOf("somethingawful.com") != -1){
    posts = getSAPosts();
  }else{
    GM_log("couldn't get posts because site appears to be incorrect");
  }
  for (var i = 0; i < posts.length; i++){
    processPost(posts[i]);
  }
}
demoronify(); //process page