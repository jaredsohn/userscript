// ==UserScript==
// @name           DoodleHelper Extra
// @namespace      Colorfag, based on original script by An!Ok.CAT.BOY http://userscripts.org/users/397571
// @description    Doodle or Die Color Palette Mod
// @homepage       http://userscripts.org/scripts/show/135960
// @updateURL      http://userscripts.org/scripts/source/135960.user.js
// @include        http://www.doodleordie.com/*
// @include        http://doodleordie.com/*
// @version        1.9ex
// @copyright      2012 Colorfag, 2011, Catboy Studios
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
Array("brown","Pastel Red","#f69679"),
Array("brown","Pastel Red Orange","#f9ad81"),
Array("brown","Pastel Yellow Orange","#fdc689"),
Array("brown","Pastel Yellow","#fff799"),
Array("brown","Pastel Pea Green","#c4df9b"),
Array("brown","Pastel Yellow Green","#a3d39c"),
Array("brown","Pastel Green","#82ca9c"),
Array("brown","Pastel Cyan Green","#7accc8"),
Array("brown","Pastel Cyan","#6dcff6"),
Array("brown","Pastel Cyan Blue","#7da7d9"),
Array("brown","Pastel Blue","#8393ca"),
Array("brown","Pastel Blue Violet","#8781bd"),
Array("brown","Pastel Violet","#a186be"),
Array("brown","Pastel Violet Magenta","#bd8cbf"),
Array("brown","Pastel Magenta","#f49ac1"),
Array("brown","Pastel Magenta Red","#f5989d"),
Array("red","Light Red","#f26c4f"),
Array("red","Light Red Orange","#f68e56"),
Array("red","Light Yellow Orange","#fbaf5d"),
Array("red","Light Yellow","#fff568"),
Array("red","Light Pea Green","#acd373"),
Array("red","Light Yellow Green","#7cc576"),
Array("red","Light Green","#3cb878"),
Array("red","Light Cyan Green","#1cbbb4"),
Array("red","Light Cyan","#00bff3"),
Array("red","Light Cyan Blue","#448ccb"),
Array("red","Light Blue","#5674b9"),
Array("red","Light Blue Violet","#605ca8"),
Array("red","Light Violet","#8560a8"),
Array("red","Light Violet Magenta","#a864a8"),
Array("red","Light Magenta","#f06eaa"),
Array("red","Light Magenta Red","#f26d7d"),
Array("orange","Pure Red","#ed1c24"),
Array("orange","Pure Red Orange","#f26522"),
Array("orange","Pure Yellow Orange","#f7941d"),
Array("orange","Pure Yellow","#fff200"),
Array("orange","Pure Pea Green","#8dc63f"),
Array("orange","Pure Yellow Green","#39b54a"),
Array("orange","Pure Green","#00a651"),
Array("orange","Pure Cyan Green","#00a99d"),
Array("orange","Pure Cyan","#00aeef"),
Array("orange","Pure Cyan Blue","#0072bc"),
Array("orange","Pure Blue","#0054a6"),
Array("orange","Pure Blue Violet","#2e3192"),
Array("orange","Pure Violet","#662d91"),
    Array("orange","Pure Violet Magenta","#92278f"),
    Array("orange","Pure Magenta","#ec008c"),
    Array("orange","Pure Magenta Red","#ed145b"),
    Array("yellow","Dark Red","#9e0b0f"),
    Array("yellow","Dark Red Orange","#a0410d"),
    Array("yellow","Dark Yellow Orange","#a3620a"),
    Array("yellow","Dark Yellow","#aba000"),
    Array("yellow","Dark Pea Green","#598527"),
    Array("yellow","Dark Yellow Green","#197b30"),
    Array("yellow","Dark Green","#007236"),
    Array("yellow","Dark Cyan Green","#00726b"),
    Array("yellow","Dark Cyan","#0076a3"),
    Array("yellow","Dark Cyan Blue","#004a80"),
    Array("yellow","Dark Blue","#003471"),
    Array("yellow","Dark Blue Violet","#1b1464"),
    Array("yellow","Dark Violet","#440e62"),
    Array("yellow","Dark Violet Magenta","#630460"),
    Array("yellow","Dark Magenta","#9e005d"),
    Array("yellow","Dark Magenta Red","#9e0039"),
    Array("green","Darker Red","#790000"),
    Array("green","Darker Red Orange","#7b2e00"),
    Array("green","Darker Yellow Orange","#7d4900"),
    Array("green","Darker Yellow","#827b00"),
    Array("green","Darker Pea Green","#406618"),
    Array("green","Darker Yellow Green","#005e20"),
    Array("green","Darker Green","#005826"),
    Array("green","Darker Cyan Green","#005952"),
    Array("green","Darker Cyan","#005b7f"),
    Array("green","Darker Cyan Blue","#003663"),
    Array("green","Darker Blue","#002157"),
    Array("green","Darker Blue Violet","#0d004c"),
    Array("green","Darker Violet","#32004b"),
    Array("green","Darker Violet Magenta","#4b0049"),
    Array("green","Darker Magenta","#7b0046"),
    Array("green","Darker Magenta Red","#7a0026"),
    Array("lightblue","Pale Cool Brown","#c7b299"),
    Array("lightblue","Light Cool Brown","#998675"),
    Array("lightblue","Medium Cool Brown","#736357"),
    Array("lightblue","Dark Cool Brown","#534741"),
    Array("lightblue","Darker Cool Brown","#362f2d"),
    Array("lightblue","Pale Warm Brown","#c69c6d"),
    Array("lightblue","Light Warm Brown","#a67c52"),
    Array("lightblue","Medium Warm Brown","#8c6239"),
    Array("lightblue","Dark Warm Brown","#754c24"),
    Array("lightblue","Darker Warm Brown","#603913"),
    Array("darkblue","Red","#ff0000"),
    Array("darkblue","Yellow","#ffff00"),
    Array("darkblue","Green","#00ff00"),
    Array("dakrblue","Cyan","#00ffff"),
    Array("darkblue","Blue","#0000ff"),
    Array("darkblue","Magenta","#ff00ff"),
    Array("purple","Beige","#F5F5DC"),
    Array("purple","Hair and Skin #1","#EDE4C8"),
    Array("purple","Hair and Skin #2","#E5C8A8"),
    Array("purple","Hair and Skin #3","#FFDCB1"),
    Array("purple","Hair and Skin #4","#E4B98E"),
    Array("purple","Hair and Skin #5","#E3A173"),
    Array("purple","Hair and Skin #6","#D0926E"),
    Array("purple","Hair and Skin #7","#A7856A"),
    Array("purple","Hair and Skin #8","#6A4E42"),
    Array("purple","Peru","#CD853F"),
    Array("purple","Brown","#A65628"), 
    Array("purple","Kidney Bean","#B13E0F"),
    Array("purple","Dark Red","#990000"),
    Array("purple","Fire Brick","#CD2626"),
    Array("purple","Red","#E41A1C"),
    Array("purple","Orange","#FF7F00"),
    Array("purple","Dark Yellow","#DAA520"),
    Array("purple","Australium Gold","#FFB90F"),
    Array("purple","Sign Yellow","#FCD116"),
    Array("purple","Yellow","#ff0"),
    Array("purple","Goldenrod","#DBDB70"),
    Array("purple","Pear","#D1E231"),
    Array("purple","Yellowish Green","#BBF065"),
    Array("purple","Light Green","#99FF99"),
    Array("purple","Green","#4DAF4A"),
    Array("purple","Dark Green","#006600"),
    Array("purple","Teal","#388E8E"),
    Array("purple","Sky Blue","#99CCFF"),
    Array("purple","More Blue","#50E0ff"),
    Array("purple","Sketcher's Delight","#0ff"),
    Array("purple","Turquoise","#00C5CD"),
    Array("purple","Topaz","#0198E1"),
    Array("purple","Cobalt","#6666FF"),
    Array("purple","Dark Blue","#00f"),
    Array("purple","A Hint of Slate","#4000FF"),
    Array("purple","Slate Blue","#7F00FF"),
    Array("purple","Purple","#984EA3"),
    Array("purple","Orchid","#DA70D6"),
    Array("purple","Pink","#FF6EC7"),
    Array("purple","Plum","#EAADEA"),
    Array("purple","Thistle","#EED2EE"),
    Array("purple","Plumt","#DFCBC0"),
    Array("purple","Plumti","#9d8964"),
    Array("purple","Plumtic","#8e795a"),
    Array("purple","ArachnidsGrip Blue","#005682"),
    Array("purple","CarcinoGeneticist Grey","#626262")
);

//Initiate Sizes
var sizes=new Array(1,2,3,5,7,10,15,20,40,60,120);

//Add colors to the table
var int=0;
var int2=0;
while (colors[int]!==undefined){
	int2++;
	if(int2==0){
		colortable+='<tr><td>';		
	}
	colortable+='<a class="color ' + colors[int][0] + ' btn" href="#drawing" data-color="' + colors[int][2] + '" data-class="' + colors[int][0] + '" style="width: 13px; height:13px; background: ' + colors[int][2] + ';" title="' + colors[int][1] + '"></a>';
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
	if(sizes[int]<4){
		graphicsize=20;
		icon=sizes[int]+"px ";
    }
	else if(sizes[int]<30){
		graphicsize=sizes[int]*2;
		icon="? ";
	}
	else{
		graphicsize=20;
		icon=sizes[int]+"px ";
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
/*
Exception: divs[0] is undefined
@Scratchpad:191
*/