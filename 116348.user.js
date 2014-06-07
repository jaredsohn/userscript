// ==UserScript==
// @name           DoodleHelper
// @namespace      Fiskie/An!Ok.CAT.BOY.
// @description    Doodle or Die Color Palette Mod by An!Ok.CAT.BOY
// @include        http://www.doodleordie.com/*
// @include        http://doodleordie.com/*
// @version        1.9
// @copyright      2011, Catboy Studios
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @supported      Firefox 3.5+, Opera 10.50+, Chrome 4+
// ==/UserScript==

//Get Elements, thanks doodle.no.de for not using IDs when you're supposed to.
var divs=document.getElementsByClassName("colors");
var divs2=document.getElementsByClassName("sizes");
var container=document.getElementsByClassName("container");
var colortable='<table width="100%" class="colortable">';
var sizeslist="";
var toolsdiv=document.getElementsByClassName("tools");
var submitdiv=document.getElementsByClassName("actions");

//It's working

//Initiate Colors
var colors=new Array(
Array("black","Black","#000"),
Array("black","Darkestestest Grey","#111"),
Array("black","Darkestest Grey","#222"),
Array("black","Darkest Grey","#333"),
Array("black","Darkerer Grey","#444"),
Array("black","Darker Grey","#555"),
Array("gray","Dark Grey","#666"),
Array("gray","Grey","#777"),
Array("gray","Slightly Light Grey","#888"),
Array("gray","Light Grey","#999"),
Array("gray","Lighter Grey","#AAA"),
Array("gray","Lighterer Grey","#BBB"),
Array("white","Lightest Grey","#CCC"),
Array("white","Lightestest Grey","#DDD"),
Array("white","Lightestestest Grey","#EEE"),
Array("white","White","#FFF"),
Array("white","Beige","#F5F5DC"),
Array("brown","Hair and Skin #1","#EDE4C8"),
Array("brown","Hair and Skin #2","#E5C8A8"),
Array("brown","Hair and Skin #3","#FFDCB1"),
Array("brown","Hair and Skin #4","#E4B98E"),
Array("brown","Hair and Skin #5","#E3A173"),
Array("brown","Hair and Skin #6","#D0926E"),
Array("brown","Hair and Skin #7","#A7856A"),
Array("brown","Hair and Skin #8","#6A4E42"),
Array("brown","Peru","#CD853F"),
Array("brown","Brown","#A65628"), 
Array("red","Kidney Bean","#B13E0F"),
Array("red","Dark Red","#990000"),
Array("red","Fire Brick","#CD2626"),
Array("red","Red","#E41A1C"),
Array("orange","Orange","#FF7F00"),
Array("orange","Dark Yellow","#DAA520"),
Array("orange","Australium Gold","#FFB90F"),
Array("yellow","Sign Yellow","#FCD116"),
Array("yellow","Yellow","#ff0"),
Array("yellow","Goldenrod","#DBDB70"),
Array("green","Pear","#D1E231"),
Array("green","Yellowish Green","#BBF065"),
Array("green","Light Green","#99FF99"),
Array("green","Green","#4DAF4A"),
Array("green","Dark Green","#006600"),
Array("lightblue","Teal","#388E8E"),
Array("lightblue","Sky Blue","#99CCFF"),
Array("lightblue","More Blue","#50E0ff"),
Array("lightblue","Sketcher's Delight","#0ff"),
Array("lightblue","Turquoise","#00C5CD"),
Array("darkblue","Topaz","#0198E1"),
Array("darkblue","Cobalt","#6666FF"),
Array("darkblue","Dark Blue","#00f"),
Array("darkblue","A Hint of Slate","#4000FF"),
Array("darkblue","Slate Blue","#7F00FF"),
Array("purple","Purple","#984EA3"),
Array("purple","Orchid","#DA70D6"),
Array("purple","Pink","#FF6EC7"),
Array("purple","Plum","#EAADEA"),
Array("purple","Thistle","#EED2EE")
);

//Initiate Sizes
var sizes=new Array(1,3,5,7,10,15,20,40,60);

//Add colors to the table
var int=0;
var int2=0;
while (colors[int]!==undefined){
	int2++;
	if(int2==0){
		colortable+='<tr><td>';		
	}
	colortable+='<a class="color ' + colors[int][0] + ' btn" href="#drawing" data-color="' + colors[int][2] + '" data-class="' + colors[int][0] + '" style="width: 12px; height:12px; background: ' + colors[int][2] + ';" title="' + colors[int][1] + '"></a>';
	int++;
	if(int2==13){
		colortable+='</td></tr>';
		int2=0;
	}
}
colortable+='</table>';

//Add sizes to the element
var int=0;
while (sizes[int]!==undefined){
	if(sizes[int]<30){
		graphicsize=sizes[int]*2;
		icon="●";
	}
	else{
		graphicsize=20;
		icon=sizes[int]+"px";
	}
	sizeslist+='<a href="#drawing" data-size="'+sizes[int]+'" class="btn size size5" style="line-height:30px; font-size:'+graphicsize+'px;" title="'+sizes[int]+' px">'+icon+'</a>';
	int++;
}

window.addEventListener("load", function(e) {
	divs[0].innerHTML=colortable;
	divs2[0].innerHTML=sizeslist;
	console.log("DoodleHelper - load complete");
}, false);

divs[0].style.padding="0px";
divs[0].style.border="none";
divs[0].style.borderStyle="none";
divs[0].style.horizontalAlign="left";
divs2[0].style.verticalAlign="middle";
divs2[0].style.horizontalAlign="center";