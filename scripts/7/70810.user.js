// ==UserScript==
// @name           	theSidebar
// @namespace        	http://userscripts.org/
// @description    	sidebar v3.9
// @include        	http://*.astroempires.com/*
// @exclude        	http://*.astroempires.com/home.aspx
// @exclude        	http://*.astroempires.com/login.aspx
// @exclude 		http://*.astroempires.com/smilies.aspx
// @exclude 		http://forum.astroempires.com/*
// @require		      http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==




if ($('div[id=sidetitle1]').length!=0) return;





var version="3.9";




////////////// USER EDIT SECTION /////////////////
var addchar		      ="&#149;";
var addcharSize		="12px";


sidetitleBG			="rgb(10,40,10)";
sideoptionsBG		="rgb(10,40,10)";
sidelinksBG			="rgb(5,20,5)";
var locfg1			="RGB(200,200,200)";
var locfg2			="RGB(100,100,100)";
var locfg3			="RGB(255,255,255)";
var myFleetFG		="RGB(100,100,250)"; // my fleet size-graph foreground
var myFleetAlert		="RGB(000,000,150)"; // my fleet landing alert background
var otherFleetFG		="RGB(180,000,000)"; // other's fleet size-graph foreground
var otherFleetAlert	="RGB(180,000,000)"; // other's fleet landing alert background
var fleetBG			="RGB(170,170,170)"; // fleet size-graph background


var LOCaddcharFcolour	="rgb(255,0,0)";
var LOCaddcharBcolour	="none";
var FLTaddcharFcolour	="rgb(100,100,255)";
var FLTaddcharBcolour	="none";

var delchar		      ="X ";//8864
var insertchar		=String.fromCharCode(10004 )+" ";// "*";
var movechar		=String.fromCharCode(9650)+" ";//5123//11014
var fleetchar		="\u2580";
var titlename		="SIDEBAR ";
var newlabel		="new label";


//GM_setValue(server+"update","false");
//////////////////////////////////////////////////


// GLOBALS /////////////////////////////////////////

//GM
if (GM_getValue(server+"tabNum","")=="") GM_setValue(server+"tabNum","1");
var tab=GM_getValue(server+"tabNum","1");
var server=decodeURIComponent(window.location).replace("www.","").replace("http://","").split(".")[0].charAt(0).toUpperCase();




// URLs
var myFleetWav ="data:audio/wav;base64,UklGRiAEAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0Yb0DAAB9gX2Gmbj%2FiyA4f244UH2BbXODf4ueloCInJGAgIGDfGhPSXmupXJnlseoWytVocuZXl6QqXkwLnrPz35DS4mkgVNgo9evYCdHj7KSZWqVsJFIJmC11JpZUYKdgENBitXQfjc%2Bf6WLYmWZw6ZbIUWSxKdvYIWnjUYpZMDbl0xCeZqIVVWL0MJ1LjZ8sJ9xaou3n1olTKDXrWhQd52LTTV0x9aSRDZxoJdmX4%2FCtm8oNYPAsXVgfqqdVilQq92sXT5omI9bRn3G0Io5K2ypqnZnhLaraig4jNG%2FdE9tnJdaMFq336ZRMGKXoG9ZgL%2FDgTMnb7W8glx0oqZmJz%2BW3sBxP1%2BTmGdEarrVnEspWp6ugGR8r7d8Lypyw8iFUmOWoWw0SZ%2FguGUzVo6cdFZ2tMqSQyVep7%2BNZGydrnsyM4DSz4FFV4%2Bdd0NcpdyyYCpLlKyIYHGjvZE8IV%2Bxy5NbXo6leDo%2BjNvNeDhKiKB%2BVGWlzadVI0mXvpdnaJOwhz8naL7Xk09Ohp9%2BS02T1sNzM0CCqY9mbJzBnlMfSZ7NomJcg6WGRTFzy9uQREN8n41ZWpLQu2smOoW5omxnirKYTyNRq9unWkh5nYpPQn7O1os8M3OkmGdmj7%2BsYyI7jMmzbll6ppVQL16246hTOG2akV9ShsXBfTErb6%2BteGR%2Fr6djJT6U17tqSG%2BblFw8a77emUkvZZ2gcGCCurd0LCt6vL19XHOfoGIrS6XfuGE6YJWYaEl0v86VRSZlpbODZXmsr3QrMYDNyHxLY5ecajpWreKwXC9XlaN5XnW0wok4H2GwwYxfap2pdzI7i9vJdT9UkJl2SGSu1qFPJU%2BZr4hib6S1hjkmbcLUkVZdkaJ3O0qY3cJvMUOJooBYa6bGm0sdTqDCmWlmkq2DPzByzdmJSEyFn4BKV5vWt2UpQYivlGlqmLqWTSBUrNOeX1aGoYZFPILT04c8Pn2hjF5imMqvXyI8jMGmb2SIq5FIKF2436FURHeciVBMjdLGfDE0eKubbWeNuqVbJEGZ0rNrUnmgjlEwa8Pdm0c2bpyRZ1mPx75yJzB6u7N2YX%2BsnlomSKTcsWRBbZ2VWUJ7xtSQQC1noaRwY4S5sWwmMoHIvXlTcqCeXzNYs%2BKvWThhmJhoUXy%2ByIQ1I2its39heaeobio9kdrFdkVilptoPma126VTKFqapXxgeLC7gjElbbzFiFxom6BuM0We4b9qNFiOnnRQb7TRm0kgVp%2B6jGZvna56NSx4x86ETVaPnXREVaPeuWQATElTVDYAAABJTkZPSUNPUBYAAABBMSBGcmVlIFNvdW5kIEVmZmVjdHMASU5BTQwAAABUZWxlcGhvbmUgOQA%3D";



globalsep="[*SEP*]";
var spacer_char=String.fromCharCode(8201);//8195//5123
var charpx=new Array();
charpx[0]=3 ;
charpx[1]=4 ;
charpx[2]=5 ;
charpx[3]=9 ;
charpx[4]=7 ;
charpx[5]=12 ;
charpx[6]=9 ;
charpx[7]=3 ;
charpx[8]=5 ;
charpx[9]=5 ;
charpx[10]=8 ;
charpx[11]=9 ;
charpx[12]=4 ;
charpx[13]=5 ;
charpx[14]=4 ;
charpx[15]=5 ;
charpx[16]=7 ;
charpx[17]=7 ;
charpx[18]=7 ;
charpx[19]=7 ;
charpx[20]=7 ;
charpx[21]=7 ;
charpx[22]=7 ;
charpx[23]=7 ;
charpx[24]=7 ;
charpx[25]=7 ;
charpx[26]=4 ;
charpx[27]=4 ;
charpx[28]=9 ;
charpx[29]=9 ;
charpx[30]=9 ;
charpx[31]=6 ;
charpx[32]=11 ;
charpx[33]=8 ;
charpx[34]=8 ;
charpx[35]=9 ;
charpx[36]=9 ;
charpx[37]=8 ;
charpx[38]=7 ;
charpx[39]=9 ;
charpx[40]=9 ;
charpx[41]=5 ;
charpx[42]=5 ;
charpx[43]=8 ;
charpx[44]=7 ;
charpx[45]=9 ;
charpx[46]=8 ;
charpx[47]=9 ;
charpx[48]=8 ;
charpx[49]=10 ;
charpx[50]=8 ;
charpx[51]=8 ;
charpx[52]=7 ;
charpx[53]=9 ;
charpx[54]=8 ;
charpx[55]=13 ;
charpx[56]=8 ;
charpx[57]=7 ;
charpx[58]=7 ;
charpx[59]=4 ;
charpx[60]=5 ;
charpx[61]=4 ;
charpx[62]=9 ;
charpx[63]=10 ;
charpx[64]=5 ;
charpx[65]=7 ;
charpx[66]=7 ;
charpx[67]=6 ;
charpx[68]=7 ;
charpx[69]=7 ;
charpx[70]=4 ;
charpx[71]=7 ;
charpx[72]=7 ;
charpx[73]=2 ;
charpx[74]=3 ;
charpx[75]=7 ;
charpx[76]=2 ;
charpx[77]=10 ;
charpx[78]=7 ;
charpx[79]=7 ;
charpx[80]=7 ;
charpx[81]=7 ;
charpx[82]=5 ;
charpx[83]=6 ;
charpx[84]=5 ;
charpx[85]=7 ;
charpx[86]=6 ;
charpx[87]=10 ;
charpx[88]=6 ;
charpx[89]=6 ;
charpx[90]=6 ;
charpx[91]=7 ;
charpx[92]=3 ;
charpx[93]=5 ;




// teclas
var iamdragging=false;
/*
unsafeWindow.document.onkeypress = function (e) {
	if ( e.altKey){
		// ALT+o // reinicia sidebar na origem
		if (e.which*1==111){
			GM_setValue(server+"sidebarY","0px");
			GM_setValue(server+"sidebarX","0px");
			iamdragging=false;
			refreshloc();
			window.location.reload();
		}
	}
}
*/

GX=GM_getValue(server+"sidebarX","").replace("px","")*1;
GY=GM_getValue(server+"sidebarY","").replace("px","")*1;
if (GX=="" || GX > (window.innerWidth-10) || GY=="" || GY > (window.innerHeight-10)){
			GM_setValue(server+"sidebarY","0px");GY="0px";
			GM_setValue(server+"sidebarX","0px");GX="0px";
}else{
	GX+="px";
	GY+="px";
}


// new version popup
// check if it is the first time the new updated version is running
if (GM_getValue(server+"oldversion","0")==version){
		// its up to date
		//alert("its up to date");
	}else{
		// detected a new version
		GM_setValue(server+"oldversion",version);
		var htm="";
		htm+="- version 3.9\n";
		htm+="----------------------------------------------------\n";
		htm+="- new firefox graphic charset fixed \n";
		htm+="-----------------------------------------------------\n";
		htm+="\n";
		alert(htm);
}






// REFRESH FLEET TIMEOUT /////////////////////////

refreshTimer();
function refreshTimer(){
	var RT= window.setTimeout(refreshTimer, 1000);

	$('w[timestamp]').each(function(){
		if ($(this).attr('timestamp')!="0"){
			ts=getCounter($(this).attr('timestamp')-agoraSegundos());
			$(this).text(ts);
			index=1*$(this).attr('index');
			alertbg=$(this).attr('alertbg');
			if (ts=='0:01:00'){
				wav=unsafeWindow.document.getElementById('myFleetWav');if (wav) wav.Play();
				$('div[id=sditem'+index+']').css('background',alertbg);
			}
			if (ts=='0:00:59'){
				$('div[id=sditem'+index+']').css('background',sidelinksBG);
			}

			if (ts=='0:00:05'){
				wav=unsafeWindow.document.getElementById('myFleetWav');if (wav) wav.Play();
				$('div[id=sditem'+index+']').css('background',alertbg);
			}
			if (ts=='0:00:00' || ts.substring(0,1)=='-'){
				$('div[id=sditem'+index+']').css('background',sidelinksBG);
				editfleetlabel(index,1,"0");
				$(this).text("Landed");
			}
		}
	});
}


// REFRESH SIDEBAR //////////////////////////////
function refreshloc(){
	tab=GM_getValue(server+"tabNum","1");
	var str = GM_getValue(server+"quick"+tab,"");
	var a = str.split("_");
	var strlab = GM_getValue(server+"quicklabel"+tab,"");
	var alab = strlab.split("_");


	if ($('div[id=sidetitle]').length==0){
		
		htm="";
		htm+= "<div id='sidebar' style='	position:fixed;left:"+ GX +";top:"+ GY +";width:112px;'>";
		htm+=	"<div id='sidetitle'";
				htm+=	"     style='font-size:10px; cursor:move;";
				htm+=	"	border: 1px solid rgb(32, 128, 86);padding:5px;";
				htm+=	"	background: "+sidetitleBG+";'>"+ titlename + version;
		htm+=	"</div>";
		htm+=	"<div id='sideoptions'";
				htm+=	"     style='font-size:10px;text-align:center;";
				htm+=	"	border: 1px solid rgb(32, 128, 86);padding-top:5px;padding-bottom:5px;";
				htm+=	"	background: "+sideoptionsBG+";'>";
				for (i=1;i<=5;i++){
					htm+= "<span style=';padding:5px;'>";
						htm+=	"<a style='color: "+locfg2+";font-size:12px' id='tab"+i+"' href='#'>"+i+"</a>";
					htm+= "</span>";
				}
				htm+=	"     <embed src='"+myFleetWav+"' autostart=false width=0 height=0 id='myFleetWav' enablejavascript='true'>";
		htm+=	"</div>";
		htm+=	"<div id='sidelinks'";
				htm+=	"     style='font-size:10px;text-align:center;";
				htm+=	"	border: 1px dotted rgb(32, 128, 86);padding-top:0px;padding-bottom:0px;";
				htm+=	"	background: "+sidelinksBG+";'>";
		htm+=	"</div>";
		htm+=	"</div>";
	}
	$('body' ).append(htm);

	// selected tab
	for (i=1;i<=5;i++){
		if (tab==i){
			bg=sidelinksBG;
		}else{
			bg=sideoptionsBG;
		}
		$('a[id=tab'+i+']').parent().css('background',bg);
	}



	// procedimento de arrastar ////////////////////////////////////////////////////////
	// implements the drag feature
	
	var dragx0,dragy0; // remember functions in javascript are static

	// captura o movimento do cursor
	// capture mousemove x,y coords
	document.addEventListener("mousemove",function(event) {
		x=event.pageX;y=event.pageY;
		// verifica se esta a arastar neste momento
		// e actualiza a posicao do painel
		// check if its dragging right now and update the panel position
		if (iamdragging){
			dragw=$('div[id=sidebar]').css("width");
			dragh=$('div[id=sidebar]').css("height");
			$('div[id=sidebar]').css("left",x - dragx0);
			$('div[id=sidebar]').css("top" ,y - dragy0);
			$('div[id=sidebar]').css("width",dragw);
			$('div[id=sidebar]').css("height",dragh);
		}

	},true);
	
	// comecou a arrastar
	// callback that deals when user starts to drag
	document.getElementById("sidetitle").addEventListener("mousedown",function(event) {
		dragx0=event.pageX - 1*( $('div[id=sidebar]').css("left") ).replace("px","");
		dragy0=event.pageY - 1*( $('div[id=sidebar]').css("top" ) ).replace("px","");
		iamdragging=true;
		//event.stopPropagation();
    		//event.preventDefault();
	},true);

	// largou, terminou o arrastar
	// callback that deals when user finishes to drag
	document.addEventListener("mouseup",function(event) {
		iamdragging=false;
		GM_setValue(server+"sidebarX",$('div[id=sidebar]').css("left") ) ;
		GM_setValue(server+"sidebarY",$('div[id=sidebar]').css("top") ); 
		//event.stopPropagation();
    		//event.preventDefault();
	},true);


	///////////////// refresh the panel /////////////

	//check for the presence of an input box "destination"
	var idest= $('input[id = destination]');
	var inputdest= idest.attr("id")=="destination";

	// se parsing entao sai!
	if ($('div[id=regionScoutDiv]').html()!= null){
		htm="";
		htm+= "<w style='color: rgb(0,120,255);font-size:10px;'>Parse Region<br>detected!</w><br>";
		$('div[id=sideguild]').html(htm);
		return;
	};


	



	//**********************
	//**********************
	//**********************  USER LOC/FLEET ***********************
	//**********************
	//**********************

	var htm="";
	if (a.length==1){
		htm+= "<div style='background:"+sidelinksBG+";position:relative;top:0px;height:20px;width:110px;border-bottom: 1px dotted RGB(32, 86, 128);text-align:center'>";
			htm+= "<w style='color: "+locfg2+";font-size:9px');'>empty</w>";
		htm+= "</div>";
		$('div[id=sidelinks]').html(htm);
	}else{
	for(var i=1;i<a.length;i++){
		var loc=a[i].split("=");
		if (loc.length>0) {loc=loc[loc.length-1]}else{loc="bad link!"};
		if (alab[i].split(globalsep).length>1){

			// FLEET
			tipo="FLT";
			iheight=50;
			flabel=alab[i].split(globalsep);
			fnome=flabel[0];
			ftime=flabel[1];
			fid  =flabel[2];
				if (fid==0){
						fleetFG=otherFleetFG;
						alertBG=otherFleetAlert;
					}else{
						fleetFG=myFleetFG;
						alertBG=myFleetAlert;
				}
			fsize=1*flabel[3];
				alg=""+fsize;alg=1*alg.length-2;if (alg<=0) alg=1;
				fchar="";
				for(j=1;j<=7;j++){
					if (j<=alg){
						fchar+="<w style='color:"+fleetFG+"'>"+fleetchar+"</w>";
					}else{
						fchar+="<w style='color:"+fleetBG+"'>"+fleetchar+"</w>";
					}
				}
				if (fsize>=1000000){
					fsize=Math.round((fsize/1000000)*10)/10 + "M"; 
				}
				if (fsize>=1000 && fsize<1000000){
					fsize=Math.round((fsize/1000)*10)/10 + "K";
				}


			if (ftime==0){
					ftimeS="Landed";
				}else{
					ftimeS=getCounter(ftime-agoraSegundos());
			}
			flink=flabel[4];
		}else{

			// LOC
			tipo="LOC";
			iheight=30;
		}

		if (inputdest) {pchar=insertchar;}else{pchar=delchar;}

		if(inputdest){var q='javascript:fastloc("'+loc+'"';}else{var q='#';}
		
		htm+= "<div id='sditem"+i+"' style='background:"+sidelinksBG+";position:relative;top:0px;height:"+iheight+"px;width:110px;border-bottom: 1px dotted RGB(32, 86, 128);text-align:left'>";
		
		htm+= "<div style='position:absolute; top:12px; left:2px'>";
			htm+= "<a style='color: "+locfg2+";font-size:12px' id='qlmov"+i+"' index='"+i+"' href='#');'>"+movechar+"</a>";
		htm+= "</div>";

		htm+= "<div style='position:absolute; top:0px; left:14px;text-align:left;'>";

			if (tipo=="FLT"){
				htm+= "<a id='qllab"+i+"' index='"+i+"' href='#' style='color: "+locfg2+";font-size:9px;'>"+ fnome +"</a>";
				htm+= "<br><a href='" + a[i] + "' style='color: "+locfg1+"'>" + loc + "</a>";
				htm+= "<a href='"+ flink+"'>";
					htm+= "<br><w style='color: "+fleetFG+";font-size:9px;'>"+fsize+"</w> ";
					htm+= "<w timestamp='"+ftime+"' index='"+i+"' alertbg='"+alertBG+"' style='color: "+locfg2+";font-size:9px;'>"+ ftimeS +"</w>";
					htm+= "<br><w style='color: "+fleetFG+";font-size:12px;'>"+fchar;
				htm+= "</a>";
			}

			else if (tipo=="LOC"){
				htm+= "<a id='qllab"+i+"' index='"+i+"' href='#' style='color: "+locfg2+";font-size:9px;'>"+ alab[i] +"</a>";
				htm+= "<br><a href='" + a[i] + "' style='color: "+locfg1+"'>" + loc + "</a>";
			}
		htm+= "</div>";

		htm+= "<div style='position:absolute; top:0px; left:95px'>";
			htm+= "<a style='font-size:10px;color:"+locfg2+";' id='qlrem"+i+"' index='"+i+"' href='"+q+");'>"+pchar+"</a>";

		htm+= "</div>";



		htm+= "</div>";


	}
	$('div[id=sidelinks]').html(htm);
	for(i=1;i<a.length;i++){
		document.getElementById("qlrem"+i).addEventListener("click",function(event) {
			if (!inputdest){
				// remove
				var index=$(this).attr("index");
				removeloc(index);
				refreshloc();
    				event.stopPropagation();
    				event.preventDefault();
			}
		}, true);
		document.getElementById("qllab"+i).addEventListener("click",function(event) {
			if (!inputdest){
				// remove
				var index=$(this).attr("index");
				tlabel=getloc_("quicklabel"+tab,index);
				if (tlabel.split(globalsep).length==1){
					// LOC label
					var uinput=prompt("edit label",tlabel);
					if (uinput==null) uinput="new label";
					editloc_("quicklabel"+tab,index,uinput);
				}else{
					// FLEET label
					var uinput=prompt("edit label",tlabel.split(globalsep)[0]);
					if (uinput==null) uinput="new label";
					editfleetlabel(index,0,uinput);
				}

				refreshloc();
    				event.stopPropagation();
    				event.preventDefault();
			}
		}, true);
		document.getElementById("qlmov"+i).addEventListener("click",function(event) {
				var index=$(this).attr("index");
				moveuploc(index);
				refreshloc();
    				event.stopPropagation();
    				event.preventDefault();
		}, true);
	}
	}
}





//*****************
// gestao da pilha
//*****************
//alert(GM_getValue(server+"tabNum","erro"));
//GM_setValue(server+"quick1",GM_getValue(server+"quick",""));
//GM_setValue(server+"quicklabel1",GM_getValue(server+"quicklabel",""));


function addloc(str,label){
	//tab=GM_getValue(server+"tabNum","1");
	var str2 = GM_getValue(server+"quick"+tab,"") + "_" + str;
	GM_setValue(server+"quick"+tab,str2);
	var str2 = GM_getValue(server+"quicklabel"+tab,"") + "_" + label;
	GM_setValue(server+"quicklabel"+tab,str2);
}

function moveuploc(index){
	if (index<=1) return;
	//tab=GM_getValue(server+"tabNum","1");	
	moveuploc_("quick"+tab,index);
	moveuploc_("quicklabel"+tab,index);
}
function editfleetlabel(index,indexprop,vstr){
	//tab=GM_getValue(server+"tabNum","1");
	var str=getloc_("quicklabel"+tab,index);
	var a=str.split(globalsep);
	a[indexprop]=vstr;
	str=a.join(globalsep);
	editloc_("quicklabel"+tab,index,str);
}

function getloc_(varstr,index){
	var str = GM_getValue(server+varstr,"");
	var a = str.split("_");
	return a[index];
}

function editloc_(varstr,index,vstr){
	var str = GM_getValue(server+varstr,"");
	var a = str.split("_");
	a[index]=vstr;
	str=a.join("_");
	GM_setValue(server+varstr,str);
}


function moveuploc_(varstr,index){
	if (index<=1) return;
	var str = GM_getValue(server+varstr,"");
	var a = str.split("_");
	up=a[index-1];
	a[index-1]=a[index];
	a[index]=up;
	str=a.join("_");
	GM_setValue(server+varstr,str);
}




function fillemptylabels(){
	//tab=GM_getValue(server+"tabNum","1");
	var str1 = GM_getValue(server+"quick"+tab     ,""); var aquick      = str1.split("_");
	var str2 = GM_getValue(server+"quicklabel"+tab,""); var aquicklabel = str2.split("_");
	//alert(str1 + " " + str2 + " " + aquick.length + " " + aquicklabel.length );
	if (aquick.length==aquicklabel.length) return;
	for(var i=0;i<(aquick.length-aquicklabel.length);i++){
		str2+="_" +newlabel; 
	}
	GM_setValue(server+"quicklabel"+tab,str2);
}


function removeloc(index){
	//tab=GM_getValue(server+"tabNum","1");
	removeloc_("quick"+tab     ,index);
	removeloc_("quicklabel"+tab,index);
}

function removeloc_(varstr,index){
	//alert(index);
	var str = GM_getValue(server+varstr,"");
	var a = str.split("_");
	a.splice(index,1);
	str=a.join("_");
	GM_setValue(server+varstr,str);
}

//******** STR FORMAT FUNCTIONS *****
function trimchar(str,ch){return str.split(ch).join("");}


//*******************************************
// SEARCH FOR LINKS IN CURRENT PAGE
//*******************************************
//GM_setValue(server+"quick","");
fillemptylabels();
var idc=0;
$('a[href^=map.aspx?loc=],a[href^=bookmarks.aspx?action=add&astro=],a[href^=map.aspx?cmp=2&loc=],a[href^=fleet.aspx?fleet=]').each(function(){

	var tipo="";
	if ($(this).attr('href').match("map.aspx")=="map.aspx") tipo="LOC";
	if ($(this).attr('href').match("fleet.aspx")=="fleet.aspx") tipo="FLT"; 


	// CONDICOES DE EXCLUSAO

		// se estiver numa vista de galaxia n o insere LOC!
		// impedir que modifique os bookmarks do proprio jogo
		wl=decodeURIComponent(window.location);
		if ((wl.match("map.aspx")=="map.aspx")&&(wl.match("cmp=2")!="cmp=2")&& tipo=="LOC") return;

		//se estiver numa view=move_start (acabou de lan ar uma frota) sai
		if ((wl.match("view=move_start")) && tipo=="FLT") return;		

		// se parsing entao sai!
		if ($('div[id=regionScoutDiv]').html()!= null) return;


	if (tipo=="LOC" || tipo=="") {
		// LOCATION LINK DETECTED
		var addcharFcolour=LOCaddcharFcolour;
		var addcharBcolour=LOCaddcharBcolour;
	}


	if (tipo=="FLT") {
		// se for uma operacao(move,atack,rename,etc) de fleet nao insere a bolinha!
		if ($(this).attr('href').match("view=")=="view=") return;
		if ($(this).attr('href').match("action=")=="action=") return;

		// FLEET LINK DETECTED
		var addcharFcolour=FLTaddcharFcolour;
		var addcharBcolour=FLTaddcharBcolour;

		var fnome=$(this).parent().parent().children('td:first').children('a:first').text();
		if (fnome=="" || fnome=="Overview") return;
	}

  

	// poe a bolinha
	var loc_string=$(this).attr('href');
	$(this).after( " <a id='qladd"+ idc +"' href='#' style='font-size:"+ addcharSize +";color: "+ addcharFcolour +";background: "+ addcharBcolour  +";'>"+ addchar +"</a>");

	document.getElementById('qladd'+idc).addEventListener("click",function(event) {
		var loc_string=$(this).prev().attr('href');
		if (loc_string.substring(0,9)=="bookmarks"){
			loc_string="map.aspx?loc=" + loc_string.substring(loc_string.length-12,loc_string.length);
			tipo="LOC";
		}
		if (tipo=="FLT"){
			//alert($(this).parent().parent().html());

			var fdestloc1=$(this).parent().parent().find('a[href^=map.aspx?loc=]:first').attr('href');
			var fdestloc2=$(this).parent().parent().find('a[href^=map.aspx?loc=]:last').attr('href');
			var fdestloc3=wl.split('=')[1];
			var fdestloc4=$('a[href^=map.aspx?loc=]').html();
			if (fdestloc3==undefined){
				//fleet view
				fdestloc1=fdestloc1.split('=')[1];
				fdestloc2=fdestloc2.split('=')[1];
				var fdestloc=fdestloc1;
				if (fdestloc1!=fdestloc2){
					fdestloc=fdestloc2;
				}
			}else{
				if (fdestloc3.match(":")==null){
					//base view
					var fdestloc=fdestloc4;
				}else{
					// loc view	
					var fdestloc=fdestloc3;
				}
			}
			fdestloc="map.aspx?loc=" + fdestloc.substring(0,12);
			// caso da pagina de scanners
			wl=decodeURIComponent(window.location);if (wl.match("scanners")=="scanners") fdestloc=fdestloc1;
			//alert(fdestloc + " -> " + fdestloc1 + " " + fdestloc2 + " " + fdestloc3 + " " + fdestloc4);
			var fsize=$(this).parent().parent().children('td[sorttable_customkey]:last').text();
			fsize=fsize.substring(0,fsize.length-1);
			fsize=trimchar(fsize,",");
			var fmyselfid=$('th[id=account]').next().html();
				// new skin // multi-skin
				if (fmyselfid==null){
					fmyselfid=$('table[id=main-header-infobox_content] td:contains(.) td[class=field-center]').html();
				}			
			fmyselfid=fmyselfid.substring(2,fmyselfid.length);
			var fid=$(this).parent().parent().children('td').find('a[href^=profile]').attr('href');

				if (fid==undefined){
					fid=fmyselfid;
				}else{
					fid=fid.split('=')[1];
				}
				if (fmyselfid==fid){
						fid=1;
					}else{
						fid=0;
				}
			var ftime=$(this).parent().parent().children('td[id^=time]').text();
			if (ftime.match(" - ")!=null) ftime=ftime.split(" - ")[0];
			var ftime2=$(this).parent().parent().children('td[id^=time]').html();
			if (ftime2!=null && ftime2.match("<br>")!=null) ftime=ftime2.split("<br>")[0];
			if(ftime=="" || ftime=="-"){
				ftime="0";//landed
			}else{
				ftime=agoraSegundos()+getSegundos(ftime);
			}

			fnome=fnome.substring(0,13);
			fnome+= globalsep + ftime + globalsep +fid+ globalsep + fsize + globalsep + loc_string;
			//alert(fdestloc+ " " + fnome.split(globalsep));
			addloc(fdestloc, fnome );
		}
		else if (tipo=="LOC"){
			addloc(loc_string,newlabel);
		}


		refreshloc();
    		event.stopPropagation();event.preventDefault();
	}, true);
	idc++;
});

// SEARCH FOR LOC INPUTBOX (scout script removes this links)
	$('input[id = loc]').each(function(){
		$(this).after( "<a id='qladd"+ idc +"' href='#' style='font-size:"+ addcharSize +";color: "+ LOCaddcharFcolour +";background: "+ LOCaddcharBcolour  +";'>"+ addchar +"</a>");
		var loc_string="map.aspx?loc=" + $(this).attr("value");		
		document.getElementById('qladd'+idc).addEventListener("click",function(event) {
			addloc(loc_string, newlabel);
			refreshloc();
		},true);
		idc++;
	});



// REFRESH THE PANEL /////////////////////////
refreshloc();

for(i=1;i<=5;i++){
	document.getElementById("tab"+i).addEventListener("click",function(event) {
		tab=$(this).attr("id").replace('tab','');
		GM_setValue(server+"tabNum",tab);
		refreshloc();
	}, true);
}
//////////////////////////////////////////////



//***********************
// REFRESH FLEET TIMEOUTS
//***********************
function getSegundos(counter){
	var c=counter.split(':');
	return (1*c[0]*60*60 + 1*c[1]*60 + 1*c[2]);
};

function getCounter(segundos){
	segundos*=1;
	var h=Math.floor(segundos/(60*60));
	var m=Math.floor((segundos-h*60*60)/60);if (m<10) m="0"+m;
	var s=Math.floor(segundos-h*60*60-m*60);if (s<10) s="0"+s;

	return(h+":"+m+":"+s);

}


function agoraSegundos(){
	var TimeStamp = new Date();
	return 1*(Math.floor(TimeStamp .getTime()/1000));
}

























/////////////////////////////////////////////
// COPY & PASTE DETAILS
var sep="**SEP**";
var col1=sep;
var col2=sep;



// check for a base///////////////
var base=$('table[id=base_processing-capacities]').length==1;
if (base){
	// found a base
	// make the link
	var htm="";
	htm+="<div align='center'>";
	htm+="<a id='longcopy'  href='#'>[LongCopy]</a> ";
      htm+="<a id='shortcopy' href='#'>[shortCopy]</a>";
	htm+="</div>";
	$('table[class=base]').before(htm);
	document.getElementById("longcopy").addEventListener("click",function(event){copybase("long");event.stopPropagation();event.preventDefault();},true);
	document.getElementById("shortcopy").addEventListener("click",function(event){copybase("short");event.stopPropagation();event.preventDefault();},true);
}		



// check for a  page (empty base, etc)
var l1=decodeURIComponent(window.location).match("map.aspx")=="map.aspx";
if (l1) {
	// check if its an astro complete location
	var s1=decodeURIComponent(window.location.search).replace('?','').split("loc=");
	if (s1[1].length==12){
		// check for fleets
		var f1= $('table[id=map_fleets]');
		if (f1.length!=0){
			// found a fleet table
			// make the link
			var htm="";
			htm+="<div align='center'>";
		      htm+="<a id='copyfleets' href='#'>[Copy]</a>";
			htm+="</div>";
			f1.before(htm);
			document.getElementById("copyfleets").addEventListener("click",function(event){copyfleet(s1[1]);event.stopPropagation();event.preventDefault();},true);
		}
	}
}



// check for fleet details table
var f2= $('table[id=fleet_overview]');
	if (f2.length!=0){
		// found a fleet details table
		// make the link
		var htm="";
		htm+="<div align='center'>";
		htm+="<a id='copyfleetdetails' href='#'>[Copy]</a>";
		htm+="</div>";
		f2.before(htm);
		document.getElementById("copyfleetdetails").addEventListener("click",function(event){copyfleetdetails();event.stopPropagation();event.preventDefault();},true);
	}


// check for message/post textarea
var messpost = $('textarea[id=body]').length==1;
if (messpost ){
	// found a good textarea
	// make the link
	var htm="";
	htm+="<div align='center'>";
	htm+="<a id='paste_'  href='#'>[paste]</a> ";
	htm+="</div>";
	$('textarea[id=body]').after(htm);
	document.getElementById("paste_").addEventListener("click",function(event){paste();},true);
}






// COPY FLEET DETAILS
function copyfleetdetails(){ //static function
	var i;
	if (i==null) i=0;
	var sloc=$('tr[align=center] a[href^=map.aspx?loc=]').text();
	var player=$('tr[align=center] a[href^=profile.aspx?player]').text();
	col1= sep + "H1 " + sloc + sep + "H1 " + player + sep + "H6 fleet overview" + sep;
	col2= sep + sep + sep + sep;
	$('table[id=fleet_overview] table[class=layout listing] td').each(function(){
		var content=$(this).text();
		if (content.length>0){
			i++;
			if (Math.floor(i/2)==(i/2)){
				if (content.match('Fleet Size:')=='Fleet Size:'){
					col1+= "H1 " + content + sep;
					col2+= sep;
				}else{
					col2+= content + sep;
				}
					
			}else{
				col1+= "H1 " + content + sep;
			}
		}
	});
	GM_setValue(server+"col1",col1);
	GM_setValue(server+"col2",col2);
}



// FLEET COPY
function copyfleet(loc){

	col1=sep + "H1 " + loc + sep;
	col2=sep + sep;
	copyfleets('map_fleets');
	//alert(col1 + "\n\n" + col2);
	GM_setValue(server+"col1",col1);
	GM_setValue(server+"col2",col2);
}


// BASE COPY ////////////////////////////////////////////
function copybase(mode_) {
	var long=(mode_=="long");

	// start parsing

	var own="teste";
	var occ="teste";

	col1 ="";
	col2 ="";


	// parse base capacities//////////////////////////
	
	if (long){
		col1+="H6 capacities" + sep;
		col2+= sep;
	}

	var base_ele=[
		"Construction",
		"Production",
		"Research",
		"Economy",
		"Owner Income",
		"Base Owner",
		"Occupied by"
	];
	for(var i=0;i<base_ele.length;i++){
		var temp2=$('table[id=base_processing-capacities] table[class=layout listing3] tr:contains('+base_ele[i]+')').text().replace(base_ele[i],"");
		if ((!long && i==3)||long){
			col2+= temp2 + sep;
			col1+= "H1" + base_ele[i] + sep;
		}

		if (i==5) own=temp2;
		if (i==6) occ=temp2;
	}

	if (long){
		col1+="H6 structures" + sep;
		col2+=sep;
	}

	// parse table structures/////////////////////////////

	str="" + $('table[id=base_resume-structures] tr[align=center]').html();
	var a=str.split("<td>");
	for(var i=1;i<a.length;i++){
		var cf;
		switch(i){
			case 1:
				cf="H1";break;
			case 2:
				cf="";break;
			case 3:
				cf="H3";break;
			case 4:
				cf=""  ;break;
			case 5:
				cf="H3";break;
			case 6:
				cf=""  ;break;
		}
		a[i]=replaceAll(a[i],"</td>",sep);a[i]=replaceAll(a[i],"<br>",sep + cf);
		a[i]=a[i].substring(0,a[i].length-(1+cf.length + sep.length-1));
		if (a[i]=="") a[i]=sep;
		if (i==1 || i==3 || i==5){
			if (i==3) col1+="H5 defenses " + sep;
			if ((!long && i>=3)||long){
				 col1+=cf+a[i];
			}
		}else{
			if ((!long && i>=3)||long){
				if (i==4) col2+=sep;
				col2+=a[i];
			}
		}
	}

	
	//parse commander
	scom= $('table[class=base] td:contains(Base Commander:) small').html();
	col1+="H3 Commander" + sep;
	col2+=scom + sep;

	// parsefleets
	copyfleets('base_fleets');

	// parse base name
	var basename = $('th[class=dropcap]').text();

	// parse location
	var sloc=$('tr[align=center] a[href^=map.aspx?loc=]').text();
	col1=sep + "H6 " + sloc  + " " + basename + sep + "H1 " + own + occ  + sep + col1;
	col2=sep + sep + sep + col2;

	GM_setValue(server+"col1",col1);
	GM_setValue(server+"col2",col2);
}





	// parse fleets /////////////////////////////
function copyfleets(table){
	var col1__="H7 fleets";
	var col2__="";
	var lk=0;
	$('table[id='+table+'] td[sorttable_customkey]').each(function(){
		var str=$(this).text();
		var islink=$(this).children().attr('href')!=null;
		if (islink) lk++;
		if (lk==1){
			col1__+= sep + "H4 ";
			col2__+= sep;
		}
		if (lk==3) {
			col2__+=str;
		}
		if (lk==2){
			col1__+=" " + str;
		}
		if (lk>=3) lk=0;
	});
	col1__+= sep;
	col2__+= sep;
	//alert(col1__ + "\n\n" + col2__);
	col1+=col1__;
	col2+=col2__;
}




var bbcprefix =[0];
var bbcsufix  =[0];
var bbclen    =[0];
bbclen[1]=150; bbcprefix[1]=""; bbcsufix[1]="\n";
bbclen[2]=150; bbcprefix[2]=""; bbcsufix[2]="\n";
bbclen[3]=150; bbcprefix[3]=""; bbcsufix[3]="\n";
bbclen[4]=200; bbcprefix[4]=""; bbcsufix[4]="\n";
bbclen[5]=0  ; bbcprefix[5]= "\n" +  "[size=2][b][color=#cc00]"  ;  bbcsufix[5]="[/size][/b][/color]\n";
bbclen[6]=0  ; bbcprefix[6]= "\n" +  "[size=2][b][color=GREEN]"  ;  bbcsufix[6]="[/size][/b][/color]\n";
bbclen[7]=0  ; bbcprefix[7]= "\n" +  "[size=2][b][color=#202099]";  bbcsufix[7]="[/size][/b][/color]\n";


function strToLength(str,len,car){
	rstr=str;
	rstr+="[color=0]";
	for(var i=0;i<((len-str.length)/car.length);i++){
		rstr+=car;
	}
	rstr+="[/color]";
	return rstr;
}

// devolve o n mero de espa os
// que uma string tem (space=10px)
function spacerw(str,pxwidth){
	px=0;
	for (var i=0;i<str.length;i++){
		c=str.charCodeAt(i)-32;
		if (c>=0 && c<=93){
			px+=charpx[c];
		}else{
			px+=5;
		}
	}
	var spc10=String.fromCharCode(8195);
	var spc2 =String.fromCharCode(8201);
	str="";
	px=pxwidth-px;
	px10=Math.floor(px/10);
	px2 =Math.round((px - px10*10)/2);
	for(var j=0;j<px10;j++){
		str+=spc10 ;
	}
	for(var j=0;j<px2;j++){
		str+=spc2 ;
	}
	return str;
}

function replaceAll(what, cut, place) {return what.split(cut).join(place);}

// format table
function bbctable(c1,c2){
	var ca1=c1.split(sep);
	var ca2=c2.split(sep);
	var bbcstr ="[list][list][size=1]";
	for(var i=1;i<ca1.length-1;i++){
		if (ca2[i]=="") ca2[i]=" ";
		var h = 1*ca1[i].substring(1,2);
		ca1[i]=ca1[i].substring(2,ca1[i].length);
		GM_log(i + " " +h + " " + bbcprefix[h] );
		if (h<5) ca1[i]= ca1[i]+spacerw(ca1[i],1*bbclen[h]);
		bbcstr += bbcprefix[h] + ca1[i] + " " + ca2[i] + bbcsufix[h];
	}
	bbcstr +="[/size][/list][/list]";
	$('textarea[id=body]').text(bbcstr);
}

// paste function
function paste(){

	if (GM_getValue(server+"col1"," ").match("Defensive Force")!=null){
		//BATTLE REPORT
		col1=GM_getValue(server+"col1"," ");
		$('textarea[id=body]').text(col1);
		//alert("1-"+col1);
	}else{
		// BASE // FLEET
		bbctable(GM_getValue(server+"col1",sep + "H1 Copy something first" + sep +sep),GM_getValue(server+"col2",sep+sep+sep));
		//alert("2-"+col1);
	}
}






// BATTLE REPORT

ln="\n";
//block="[code]";
//eblock="[/code]";
block="[quote]"; // "/n";
eblock="[/quote]";

// check for a battle report
if ($('div[class=battle-report]').length>=1){
	var ibr=0;
	$('div[class=battle-report]').each(function(){
		// found a BR
		// make the link
		ibr++;
		var htm="";
		htm+="<div align='center'>";
		htm+="<a id='copybr"+ibr+"'  href='javascript:'>[copy BR]</a> ";
		htm+="</div>";
		$(this).before(htm);
		//$(this).attr("br",""+ibr);
	});
	for(var i=1;i<=ibr;i++){
		document.getElementById("copybr"+i).addEventListener("click",function(event){
			// remove sidebar links inside the table
			$('a[id^=qladd]').remove();
			$('a[href^=profile.aspx]').removeAttr("style");
			brstr="";
			t1=$(this).parent().next().find('table[class=battle-report_info]');
			t2=$(this).parent().next().find('table[class=battle-report_attack]');
			t3=$(this).parent().next().find('table[class=battle-report_defense]');
			brstr+=block+tableToBBC(t1.html(),60)+eblock;
			brstr+=block+tableToBBC(t2.html(),90)+eblock;
			brstr+=block+tableToBBC(t3.html(),90)+eblock;
			//brstr+=ln;
			var t4="";
			$(this).parent().next().find('center').each(function(){
				pre="";suf="";
				if ($(this).attr("class").match("orange")!=null){pre="[color=ORANGE]";suf="[/color]";}
				if ($(this).attr("class").match("red")!=null){pre="[color=RED]";suf="[/color]";}
				t4+=pre+$(this).html()+suf+"\n";

			});
			t4=t4.replace( /<small>/g,"[size=1]");
			t4=t4.replace( /<\/small>/g,"[/size]");
			brstr+=block + t4 + eblock;
			col1="[size=1]" +brstr+ "[/size]";
			GM_setValue(server+"col1",col1);
			//alert(GM_getValue(server+"col1","*"));
		},true);
	}

}




function tableToBBC(html,tablen){

	//$(jstable + ' a[id^=qladd]').remove();	
	br1=html;	

	// save some space
	br1=br1.replace( /Planetary Ring/g,"Plan.Ring");
	br1=br1.replace( /Dreadnought/g,"Dreadnought");
	br1=br1.replace( /Heavy Cruiser/g,"Heavy Cruiser");
	br1=br1.replace( /Heavy Bombers/g,"Heavy Bombers");
	br1=br1.replace( /Ion Bombers/g,"Ion Bombers");
	br1=br1.replace( /Ion Frigate/g,"Ion Frigate");
	br1=br1.replace( /Scout Ship/g,"Scout Ship");
	br1=br1.replace( /Outpost Ship/g,"Outpost Ship");
	br1=br1.replace( /Planetary Shield/g,"Plan Shield");
	br1=br1.replace( /Barracks/g,"Barracks");
	br1=br1.replace( /Laser Turrets/g,"Laser Turrets");
	br1=br1.replace( /Missile Turrets/g,"Missile Turrets");
	br1=br1.replace( /Plasma Turrets/g,"Plasma Turrets");
	br1=br1.replace( /Ion Turrets/g,"Ion Turrets");
	br1=br1.replace( /Photon Turrets/g,"Photon Turrets");
	br1=br1.replace( /Disruptor Turrets/g,"D.Turrets");
	br1=br1.replace( /Deflection Shields/g,"D.Shields");
	br1=br1.replace( /Location/g,"Location");
	br1=br1.replace( /Time/g,"Time");
	br1=br1.replace( /Player/g,"Player");
	br1=br1.replace( /Fleet Name/g,"Fleet Name");
	br1=br1.replace( /Start Defenses/g,"Start Defenses");
	br1=br1.replace( /End Defenses/g,"End Defenses");
	br1=br1.replace( /Command Centers/g,"C.Centers");
	br1=br1.replace( /Commander/g,"Commander");
	br1=br1.replace( /Start Quant./g,"Start Quant.");
	br1=br1.replace( /End Quant./g,"End Quant.");
	br1=br1.replace( /Power/g,"Power");
	br1=br1.replace( /Armour/g,"Armour");
	br1=br1.replace( /Shield/g,"Shield");

	br1=br1.replace( /Cruiser/g,"Cruiser");
	br1=br1.replace( /Fighters/g,"Fighters");
	br1=br1.replace( /Bombers/g,"Bombers");
	br1=br1.replace( /Battleship/g,"Battleship");
	br1=br1.replace( /Leviathan/g,"Leviathan");
	br1=br1.replace( /Carrier/g,"Carrier");
	br1=br1.replace( /Recycler/g,"Recycler");
	br1=br1.replace( /Destroyer/g,"Destroyer");
	br1=br1.replace( /Frigate/g,"Frigate");
	br1=br1.replace( /Corvette/g,"Corvette");

	br1=br1.replace( / style="color: green;"/g,""); // remove green AEtoolkit
	br1=br1.replace(/<tbody>/g,"");
	br1=br1.replace(/<\/tbody>/g,"");
	br1=br1.replace(/<\/tr>/g,"\n");
	br1=br1.replace(/<tr>/g,"");
	br1=br1.replace(/<tr align="center">/g,"");
	br1=br1.replace(/<th colspan="[013456789]">/g,"<td><b>");
	br1=br1.replace(/<th colspan="[2]">/g,"<td><b><indent>");
	br1=br1.replace(/<th>/g,"<td><b>");
	br1=br1.replace(/<\/th>/g,"</b></td>");

	br1=br1.replace(/<td class="orange hilite">/g,"<td>");
	br1=br1.replace(/<b class="orange hilite">/g,"");
	br1=br1.replace(/&nbsp;/g,"");

// format tab spacer
	var a=br1.split("<td>");
	for (var i=0;i<a.length;i++){
		if (a[i].match(/ *<\/td>/)!=null){
			// count valid chars
			temp=a[i].replace(/<\/?[^>]+(>|$)/g, "");
			spacer="";
			templastchar=temp.charAt(temp.length-1);
			spacer=spacerw(temp,tablen);

			if (templastchar=="\n"){
					atemp=a[i].substring(0,a[i].length-1);
				}else{
					atemp=a[i];
					templastchar="";
			}			
			//a[i]=atemp+"[color='0']"+ spacer + "[/color]" + templastchar;
			a[i]=atemp+ spacer + templastchar;
		}
	}
	//alert(a);
	br1=a.join("<td>");


	//format bbc code
	br1=br1.replace(/<a href="map\/?[^>]+(>|$)/g, "");
	br1=br1.replace(/<td>/g,"");
	br1=br1.replace(/<\/td>/g,"");
	br1=br1.replace(/<indent>/g,"    ");
	//br1=br1.replace(/<orange>/g,"[color=ORANGE]");
	br1=br1.replace(/<b>/g,"[b]");
	br1=br1.replace(/<\/b>/g,"[/b]");
	br1=br1.replace(/<small>/g,"[size=1]");
	br1=br1.replace(/<\/small>/g,"[/size]");
	br1=br1.replace(/<a href="/g,"[url=");
	br1=br1.replace(/">/g,"]");
	br1=br1.replace(/<\/a>/g,"[/url]");
	return br1;
}




/* history
version 3.9
-----------
new firefox graphic charset fixed
-----------


version 3.7
-----------
works on any skin 
-----------


version 3.6
-----------
CSS left/top/width/height/px deprecated - bugfix
-----------

version 3.5
-----------
NaN bugfix 
-----------

version 3.4
-----------
Multiserver
-----------

version 3.2
-----------
AE new animated time format fixed
-----------

version 3.2
-----------
- fleet bookmark 
- fleet landing alarm 
- multitab (5 tabs) 
-----------


version 3.1
-----------
- fleet bookmark and new design

version 3.0
-----------
- stargaze Parse Region compatible.
- bookmark links on lz posted inside the boards


version 2.9
-----------
- old bbccode format bugfixs


version 2.8
-----------
- inserts a red dot after a location astro.
- fancy battle reports

version 2.7
-----------
- improved copy&paste layout

version 2.6
-----------
- added a moveup button to each location link (sort)
- better layout to Battle Reports copy&paste


version 2.5
-----------
- Battle Reports (bugfixed)

version 2.4
-----------
- added copy and paste Battle Reports 


version 2.3
-----------
- added copy and paste feature 
users can now copy base details, fleet overview and fleet details into the board/message textareas.
its useful when someone wants to post on the board base and fleet details and the guild has no eyes.


version 2.2
-----------
- * button updates the travel distance on move fleet view
- added bookmark labels

version 2.1
-----------
- keys changed
- * button doest mess with prod. pages
- * button doest mess with browser scroll bar
- added a label for special guild location
*/



