// ==UserScript==
// @name           SVZ - Faster Fototagging
// @namespace      *
// @description    per Tastatur zu verlinkenden User auswaehlen
// @include        http://www.meinvz.net/Photos/View/*
// @include        http://www.studivz.net/Photos/View/*
// @include        http://www.schuelervz.net/Photos/View/*
// @include        http://meinvz.net/Photos/View/*
// @include        http://studivz.net/Photos/View/*
// @include        http://schuelervz.net/Photos/View/*
// ==/UserScript==
function a() {return a.caller.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2')}
document.body.appendChild(document.createElement('script')).innerHTML=a();
return;

window.setInterval('setKeyupHandler()',500);

noteEditLength=0;
usrSelected=0;
function setKeyupHandler(){
  if($(".fn-note-edit-select").length == noteEditLength) return; //save ressources by checking if change was already made
  noteEditLength=$(".fn-note-edit-select").length;
  for(i in $(".fn-note-edit-select")){
    if($(".fn-note-edit-select")[i].getElementsByTagName && $(".fn-note-edit-select")[i].getElementsByTagName("input")){
      $(".fn-note-edit-select")[i].getElementsByTagName("input")[0].addEventListener("keyup", function(e){
        e=e?e:window.event;
        var keyCode = (e.charCode) ? e.charCode : e.keyCode;
        with(this.parentNode.getElementsByTagName("select")[0]){
          if(keyCode==38)
            usrSelected=usrSelected<=0?options.length-1:usrSelected-1;
          if(keyCode==40)
            usrSelected=usrSelected>=options.length-1?0:usrSelected+1;
          selectedIndex=usrSelected;
        }
      },false);
      //$(".fn-note-edit-select")[i].getElementsByTagName("input")[0].style.backgroundColor="#ff6600";//just for testing if input was found and is changeable
    }
  }
}