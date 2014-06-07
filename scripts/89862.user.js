// ==UserScript==
// @name           DGS move to next/prev
// @description    Go to previous move by left arrow and to next move by right arrow
// @namespace      Saynomoo
// @include        *dragongoserver.net/game.php*
// @version        1.0
// ==/UserScript==

document.addEventListener("keyup", function(e){
  try{
    function goToMove(offset){
      var gid = document.getElementsByName("gid")[0].value
      var currentMove = parseInt(document.getElementsByName("move")[0].value)
      var moveNumber = currentMove + offset
      var url = "http://www.dragongoserver.net/game.php?gid=" + gid + "&gotomove=" + moveNumber + "&movechange=View%20move"
      var lastMove = document.getElementsByTagName("option").length
      if(moveNumber>0 && moveNumber<=lastMove){
        window.location.href = url;
      }
    } 
    if(e.keyCode==37){
      goToMove(-1)
    }else if(e.keyCode==39){
      goToMove(1)
    }
  }catch(err){}
}, true)

