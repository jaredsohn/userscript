// ==UserScript==
// @name           AreaLV_V2
// @namespace      XungokushiWizard
// @include        http://*.sangokushi.in.th/*
// ==/UserScript==

// contact @ xuu_@windowslive.com >_<

/************* Cookie Value ****************/
function setC(c_name,value)
{
var exdays=9999;
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

function getC(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}
/***************** END Cookie Value ***********/

/******************************* Code Area LV *********************************/
function arealv() {
	configAddButton();
	/******** Set Default Vaue ***********/
	//if(getC("minStar

    var picNum = [ 
    "http://upic.me/i/vx/80j01.png",
    "http://upic.me/i/tv/deg02.png",
    "http://upic.me/i/od/e93_2.png",
    "http://upic.me/i/2k/z74_2.png",
    "http://upic.me/i/53/nk5_2.png",
    "http://upic.me/i/94/db6_2.png",
    "http://upic.me/i/99/n97_3.png",
    "http://upic.me/i/3j/fa8_2.png",
    "http://upic.me/i/13/lw9_2.png",
    ];
    var areas = document.getElementsByTagName('area');
    var maxArea =  areas.length;
    var areaMinStar = getC("minStar");if(!areaMinStar){setC("minStar",3);areaMinStar=3;};
    var areaHoldStat = getC("areaHoldStat");if(!areaMinStar){setC("areaHoldStat",3);areaMinStar=3;}; //1Free 2Hold 3All
    var areaTaken = 0; // 0=all 1=free 2=taken
    var arealv;
    var areatmp ='';
	var star2num = '';
    for(var i =0; i<maxArea; i++){
		
		if(areas[i].title.split(' ').length!=2 &&areaHoldStat==1)continue;
		if(areas[i].title.split(' ').length==2 &&areaHoldStat==2)continue;
		
        //if(areas[i].title.split(' ').length==2)		//free area
        {
			star2num=areas[i].getAttribute('onmouseover').split("/img/common/star_warpower_b.gif");
            arealv = star2num.length -1;
		//	areas[i].setAttribute('onmouseover',star2num[0].split("img src")+"img src=\'/"+picNum[arealv-1]+star2num[star2num.length-1]);
			if(arealv>=areaMinStar)
            if(i<9)areatmp += '<img src="'+picNum[arealv-1]+'" class="mapAll0'+(i+1)+'" alt="">';else areatmp += '<img src="'+picNum[arealv-1]+'" class="mapAll'+(i+1)+'" alt="">';
        }
    }
    document.getElementById("mapsAll").innerHTML = document.getElementById("mapsAll").innerHTML + areatmp;
}

/** for config minstar **/
function configAddButton(){
	var a = document.createElement("a");
a.innerHTML = "<img src='http://upic.me/i/ac/minstar.png'>";
a.id="areaConfig1";
a.setAttribute("style","position:absolute;left:650px;top:240px;");
document.body.appendChild(a);
document.getElementById('areaConfig1').addEventListener('click', function(event) {
configAreaLV();
});
var a = document.createElement("a");
a.innerHTML = "<img src='http://upic.me/i/dl/status.png'>";
a.id="areaConfig2";
a.setAttribute("style","position:absolute;left:650px;top:280px;");
document.body.appendChild(a);
document.getElementById('areaConfig2').addEventListener('click', function(event) {
configAreaHold();
});
}
function configAreaLV(){
	var tmp = prompt("min star");
	setC("minStar",tmp);
	window.location.href = window.location.href;
}

/** for config area free/hold **/
function configAreaHold(){
	var tmp = prompt("1) free area only\n"+
						"2) hold area only\n"+
							"3) all area\n");
	setC("areaHoldStat",tmp);
	window.location.href = window.location.href;
}

/******************* END **********************/

/***************** Code New Patch Picture area **************************/
function newAreaPatch(){
/****BiG MAP****/
switch(document.getElementsByTagName('area').length){
	case 121://if(window.location.href.match("type=1"))
	document.getElementById("mapAll").setAttribute("style","background-image: url(../img/common/mapall_bg.gif);");
	break;
	case 225://if(window.location.href.match("type=2"))
	document.getElementById("mapAll").setAttribute("style","background-image: url(../img/common/mapall15_bg.gif);");
	break;
	case 400://if(window.location.href.match("type=3"))
	document.getElementById("mapAll").setAttribute("style","background-image: url(../img/common/mapall20_bg.gif);");
	break;
}
/****Small Area****/	
	var imgs = document.getElementById("mapAll").getElementsByTagName("img");
	var size = imgs.length;
	for(var i=0;i<size;i++){
if(document.getElementById("mapAll").getElementsByTagName("img")[i].src.match("/img/panel/territory"))
{
	document.getElementById("mapAll").getElementsByTagName("img")[i].src=document.getElementById("mapAll").getElementsByTagName("img")[i].src.replace(
		//"http://"+window.location.host+"/20110921-01/extend_project/thai/img/panel/territory"
		document.getElementById("mapAll").getElementsByTagName("img")[i].src.split("/territory")[0]+"/territory"
		//,"http://s13.3gokushi.jp/20120113-01/extend_project/w945/img/panel/territory");
		,"http://"+window.location.host+"/img/panel/territory");
}
}
}
/**************************** END NEW PATCH PIC ***************************/


if(window.location.href.match('.sangokushi.in.th/map.php')){
	arealv();
	newAreaPatch();
}
