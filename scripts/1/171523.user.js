// ==UserScript==
// @name          Bento filmweb.no Video resizer
// @namespace     http://www.filmweb.no
// @description   Resizes videos on filmweb.com/trailere/
// @include       http://www.filmweb.no/trailere/*
// ==/UserScript==

//videosize:
//original: 634 x 357
//set to: 1200 x 675
//matches: 1280 x 720


function partB() {

  if (document.getElementById("player")==null) {
    window.setTimeout(partB,1000);
    return;
  }

  document.getElementsByClassName("BgContentContainer")[0].style.width = '1200px';
  document.getElementsByClassName("fw_columns")[0].style.margin = '0';
  document.getElementsByClassName("column small")[0].style.display = 'none';
  document.getElementsByClassName("column middle")[0].style.width = '1200px';
  document.getElementsByClassName("column middle")[0].style.margin = '0';
  document.getElementById("player").width = 1200;
  document.getElementById("player").height = 675;
}

partB();

/*
//jquery code
$(".BgContentContainer").width(1200);
$(".fw_columns").css("margin", "0"):
$(".column.small").hide();
$(".column.middle").width(1200).css("margin", "0");
$("#player").width(1200).height(675);
*/