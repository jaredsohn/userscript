// ==UserScript==
// @name           AreaLV
// @namespace      AreaLV
// @include        *.sangokushi.in.th/*
// ==/UserScript==

// created by xun
// areaLv version 1.0 2011-03-20

/******************************* Code Area LV *********************************/
function arealv() {
"http://upic.me/i/vx/80j01.png",
"http://upic.me/i/tv/deg02.png",
"http://upic.me/i/b3/8uz03.png",
"http://upic.me/i/q6/cch04.png",
"http://upic.me/i/tm/19605.png",
"http://upic.me/i/tm/hlu06.png",
"http://upic.me/i/vi/gsq07.png",
"http://upic.me/i/xe/re608.png",
"http://upic.me/i/qc/wlq09.png",

    
        if(areas[i].title.split(' ').length==2)		//free area
        {
            arealv = areas[i].getAttribute('onmouseover').split("/img/common/star_warpower_b.gif").length -1;
            if(i<9)areatmp += '<img src="'+picNum[arealv-1]+'" class="mapAll0'+(i+1)+'" alt="">';else areatmp += '<img src="'+picNum[arealv-1]+'" class="mapAll'+(i+1)+'" alt="">';
        }
    }
    document.getElementById("mapsAll").innerHTML = document.getElementById("mapsAll").innerHTML + areatmp;
}
/******************* END **********************/
  if(window.location.href.match('.sangokushi.in.th/map.php'))arealv();
