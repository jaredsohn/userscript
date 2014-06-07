


// ==UserScript==
// @name           	Sidebar
// @namespace        
// @description    	LSD sidebar v2.6
// @include        	http://delta.astroempires.com/*
// @exclude        	http://*.astroempires.com/
// @exclude        	http://*.astroempires.com/home.aspx
// @exclude        	http://*.astroempires.com/login.aspx
// @require		      http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

/* history
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


var version="2.6";



////////////// USER EDIT SECTION /////////////////
var addchar		      ="&#149;";
var addcharFcolour	="rgb(255,0,0)";
var addcharBcolour	="none";
var addcharSize		="12px";

var delchar		      ="- ";
var insertchar		="* ";
var movechar		="^ ";
var titlename		="LSD ";

var newlabel		="new label";

var updateurl="http://mariovsky.zzl.org/gm/g43/sb.user.js";
//GM_setValue("update","false");
//////////////////////////////////////////////////


// new version popup
// check if it is the first time the new updated version is running
if (GM_getValue("oldversion","0")==version){
		// its up to date
		//alert("its up to date");
	}else{
		// detected a new version
		GM_setValue("oldversion",version);
		var htm="";
		htm+="version 2.5\n";
		htm+="----------------------------------------------------\n";
		htm+="- added a moveup button to each location link (sort) \n";
		htm+="- better layout to Battle Reports copy&paste \n";
		htm+="-----------------------------------------------------\n";
		htm+="\n";
		htm+="goto guild page to refresh!\n";		
		alert(htm);
}


// encriptaÃ§Ã£o ///////////////////////////////////

var key1=	[ 3, 3, 3, 3, 3, 3, 3, 3];
var key2=   [-6, 8, 2,-2, 8,-6, 4, 7];
var key3=	[88,-7,46,51,-6,74,39,-6];

function decode(numero,index){
	return ((numero-key3[index])/key2[index] - key1[index]);
}
function strToArr(str){
	var a=new Array();
	for(var i=0;i<8;i++){
		a[i]=1*str.substring(i*2,i*2+2);
	}
	return a;
}
function decodestrloc(str){
	var numArray=strToArr(str);
	var locstr="";
	for(var i=0;i<4;i++){
		if (i==0){locstr+="D";}else{locstr+=":";}
		locstr+=decode(numArray[i*2],i*2);
		locstr+=decode(numArray[i*2+1],i*2+1);		
	}
	return locstr;
}

// decode label text
function decode4chars(str4){
	var numArray=strToArr(str4);
	var str="";
	for(var i=0;i<4;i++){
		if (i!=0) str+="_";
		str+=decode(numArray[i*2],i*2);
		str+=decode(numArray[i*2+1],i*2+1);		
	}
	var a=str.split("_");
	s=String.fromCharCode(a[0],a[1],a[2],a[3]);
	return s;
}

function decode16chars(char16){
	var str="";
	for (var i=0;i<4;i++){
		str+=decode4chars(char16.substring(i*16,i*16+16));
	}
	return str;
}



// REFRESH //////////////////////////////////////


function refreshloc(){
	var str = GM_getValue("quick","");
	var a = str.split("_");
	var strlab = GM_getValue("quicklabel","");
	var alab = strlab.split("_");
	var strgs=GM_getValue("guildlz","");
	var ags=strgs.split("_");
	var strgsi=GM_getValue("guildinfolz","");
	var agsi=strgsi.split("_");

	// if the panel doesnt exists, create a new one
	if ($('div[id=sidelinks]').length==0){
		$('body' ).append(
		"<div id='sidebar' style='	position:fixed;left:"+ GM_getValue("sidebarX","5px") +";top:"+ GM_getValue("sidebarY","150px") +";'>" +
			"<div id='sidetitle'"+
					"     style='font-size:10px; cursor:move;" +
					"	border: 1px solid rgb(32, 86, 128);padding:5px;" +
					"	background: rgb(40,40,90);'>"+ titlename + version +
			"</div>"+
			"<div id='sideguild'"+
					"     style='font-size:10px;text-align:center;" +
					"	border: 1px solid rgb(32, 86, 128);padding:5px;" +
					"	background: rgb(10,10,50);'>"+
			"</div>"+	
			"<div id='sidelinks'"+
					"     style='font-size:10px;text-align:center;" +
					"	border: 1px solid rgb(32, 86, 128);padding:5px;" +
					"	background: rgb(10,10,50);'>"+
			"</div>"+
		"</div>");

	}

	// procedimento de arrastar ////////////////////////////////////////////////////////
	// implements the drag feature
	
	var iamdragging=false;
	var dragx0,dragy0; // remember functions in javascript are static

	// captura o movimento do cursor
	// capture mousemove x,y coords
	document.addEventListener("mousemove",function(event) {
		x=event.pageX;y=event.pageY;
		// verifica se estÃƒÂ¡ a arastar neste momento
		// e actualiza a posiÃƒÂ§ÃƒÂ£o do painel
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
	
	// comeï¿½ou a arrastar
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
		GM_setValue("sidebarX",$('div[id=sidebar]').css("left") ) ;
		GM_setValue("sidebarY",$('div[id=sidebar]').css("top") ); 
		//event.stopPropagation();
    		//event.preventDefault();
	},true);


	///////////////// refresh the panel /////////////

	//check for the presence of an input box "destination"
	var idest= $('input[id = destination]');
	var inputdest= idest.attr("id")=="destination";

	//////////////// special guild location RED /////////

	var htm="";
	for(var i=1;i<ags.length;i++){
		if (inputdest){
			var q = 'javascript:fastloc("'+ags[i]+'"';
			htm+= "<a style='color: rgb(255,0,0);' id='idguild"+i+"' index='"+i+"' href='"+q+")'>"+insertchar+"</a>";
		}
			htm+= "<a style='color: rgb(255,0,0);' href='map.aspx?loc=" + ags[i] + "'>" + ags[i] + "</a><br>";
			htm+= "<w style='color: rgb(255,120,0);font-size:8px;'>" + agsi[i] + "</w><br>";
	}
	$('div[id=sideguild]').html(htm);
	

	// NOTIFY UPDATE TO NEW VERSION
	var update=GM_getValue("update","false");
	if (update!="false"){
		var htm= "<a style='color: rgb(0,255,0);' href='"+updateurl+"'>UPDATE V"+update+"!</a>";
		$('div[id=sideguild]').html(htm);
	}
	

	////////////////  user locations GREEN /////////////////
	htm="";
	if (inputdest) {pchar=insertchar;}else{pchar=delchar;}
	for(var i=1;i<a.length;i++){
		var loc=a[i].split("=");
		if (loc.length>0) {loc=loc[loc.length-1]}else{loc="bad link!"};
		if(inputdest){var q='javascript:fastloc("'+loc+'"';}else{var q='#';}
		htm+= "<a id='qlrem"+i+"' index='"+i+"' href='"+q+");'>"+pchar+"</a>";
		htm+= "<a id='qlmov"+i+"' index='"+i+"' href='#');'>"+movechar+"</a>";
		htm+= "<a href='" + a[i] + "'>" + loc + "</a><br>";
		htm+= "<a id='qllab"+i+"' index='"+i+"' href='#' style='color: rgb(20,100,0);font-size:9px;'>"+ alab[i] +"</a><br>";

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
				var uinput=prompt("edit label",getloc_("quicklabel",index));
				if (uinput==null) uinput="new label";
				editloc_("quicklabel",index,uinput);
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


function addloc(str){
	var str2 = GM_getValue("quick","") + "_" + str;
	GM_setValue("quick",str2);
	var str2 = GM_getValue("quicklabel","") + "_" + newlabel;
	GM_setValue("quicklabel",str2);
}
function moveuploc(index){
	if (index<=1) return;
	moveuploc_("quick",index);
	moveuploc_("quicklabel",index);
}

function getloc_(varstr,index){
	var str = GM_getValue(varstr,"");
	var a = str.split("_");
	return a[index];
}

function editloc_(varstr,index,vstr){
	var str = GM_getValue(varstr,"");
	var a = str.split("_");
	a[index]=vstr;
	str=a.join("_");
	GM_setValue(varstr,str);
}

function moveuploc_(varstr,index){
	if (index<=1) return;
	var str = GM_getValue(varstr,"");
	var a = str.split("_");
	up=a[index-1];
	a[index-1]=a[index];
	a[index]=up;
	str=a.join("_");
	GM_setValue(varstr,str);
}




function fillemptylabels(){
	//GM_setValue("quicklabel","");
	var str1 = GM_getValue("quick"     ,""); var aquick      = str1.split("_");
	var str2 = GM_getValue("quicklabel",""); var aquicklabel = str2.split("_");
	//alert(str1 + " " + str2 + " " + aquick.length + " " + aquicklabel.length );
	if (aquick.length==aquicklabel.length) return;
	for(var i=0;i<(aquick.length-aquicklabel.length);i++){
		str2+="_" +newlabel; 
	}
	GM_setValue("quicklabel",str2);
}


function removeloc(index){
	removeloc_("quick"     ,index);
	removeloc_("quicklabel",index);
}

function removeloc_(varstr,index){
	//alert(index);
	var str = GM_getValue(varstr,"");
	var a = str.split("_");
	a.splice(index,1);
	str=a.join("_");
	GM_setValue(varstr,str);
}

//GM_setValue("quick","");

// SEARCH FOR LINKS IN CURRENT PAGE
fillemptylabels();
var idc=0;
$('a[href^=map.aspx?loc=],a[href^=bookmarks.aspx?action=add&astro=]').each(function(){
	var loc_string=$(this).attr('href');
	// put the red little link after each location link
	$(this).after( "<a id='qladd"+ idc +"' href='#' style='font-size:"+ addcharSize +";color: "+ addcharFcolour +";background: "+ addcharBcolour  +";'>"+ addchar +"</a>");

	document.getElementById('qladd'+idc).addEventListener("click",function(event) {
		var loc_string=$(this).prev().attr('href');
		if (loc_string.substring(0,9)=="bookmarks"){
			loc_string="map.aspx?loc=" + loc_string.substring(loc_string.length-12,loc_string.length);
		}
		addloc(loc_string);
		refreshloc();
    		event.stopPropagation();event.preventDefault();
	}, true);
	idc++;
});



//////////////// get special lz from guild page

// check if we are at guild page
var p1=decodeURIComponent(window.location).match("guild.aspx")=="guild.aspx";
var p2=decodeURIComponent(window.location.search).replace('?','')=="";
var paginaguild= p1 && p2;

if (paginaguild){

	// get guild encoded locations
	str="";
	$('font:contains(enigma)').each( function(){
		str+= "_" + decodestrloc( $(this).text().replace("enigma ","") );
	});
	GM_setValue("guildlz",str);

	// get guild encoded info lz
	str="";
	$('font:contains(stigma)').each( function(){
		str+= "_" + decode16chars( $(this).text().replace("stigma ","") );
	});
	GM_setValue("guildinfolz",str);
	

	// check for updates
	var stupidquote="X1SEF4ASVS7JLTS9FD3 ";
	var newversion=$('font:contains('+stupidquote+')').text().replace(stupidquote,"");
	if (version!=newversion){
		//update new version
		GM_setValue("update",newversion);
	}else{
		GM_setValue("update","false");
	}

}

// REFRESH THE PANEL /////////////////////////
refreshloc();
//////////////////////////////////////////////
















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



// check for a location page (empty base, etc)
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
	htm+="<a id='paste'  href='#'>[paste]</a> ";
	htm+="</div>";
	$('textarea[id=body]').after(htm);
	document.getElementById("paste").addEventListener("click",function(event){paste();},true);
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
	GM_setValue("col1",col1);
	GM_setValue("col2",col2);
}



// FLEET COPY
function copyfleet(loc){

	col1=sep + "H1 " + loc + sep;
	col2=sep + sep;
	copyfleets('map_fleets');
	//alert(col1 + "\n\n" + col2);
	GM_setValue("col1",col1);
	GM_setValue("col2",col2);
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

	GM_setValue("col1",col1);
	GM_setValue("col2",col2);
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
bbclen[1]=17; bbcprefix[1]=           "[color='#50FF50']"; bbcsufix[1]="[/color]\n";
bbclen[2]=17; bbcprefix[2]=           "[color='#FFFFFF']"; bbcsufix[2]="[/color]\n";
bbclen[3]=17; bbcprefix[3]=           "[color='#ff0000']";  bbcsufix[3]="[/color]\n";
bbclen[4]=25; bbcprefix[4]=           "[color='#9090FF']";bbcsufix[4]="[/color]\n";
bbclen[5]=0 ; bbcprefix[5]= "\n" +  "[size='5'][b][color='#cc00']"  ;  bbcsufix[5]="[/size][/b][/color]\n";
bbclen[6]=0 ; bbcprefix[6]= "\n" +  "[size='5'][b][color='GREEN']"  ;  bbcsufix[6]="[/size][/b][/color]\n";
bbclen[7]=0 ; bbcprefix[7]= "\n" +  "[size='5'][b][color='#202099']";  bbcsufix[7]="[/size][/b][/color]\n";


function strToLength(str,len,car){
	rstr=str;
	rstr+="[color='0']";
	for(var i=0;i<((len-str.length)/car.length);i++){
		rstr+=car;
	}
	rstr+="[/color]";
	return rstr;
}



function replaceAll(what, cut, place) {return what.split(cut).join(place);}

// format table
function bbctable(c1,c2){
	var ca1=c1.split(sep);
	var ca2=c2.split(sep);
	var bbcstr ="[list][list][size='3'][code]";
	for(var i=1;i<ca1.length-1;i++){
		if (ca2[i]=="") ca2[i]=" ";
		var h = 1*ca1[i].substring(1,2);
		ca1[i]=ca1[i].substring(2,ca1[i].length);
		GM_log(i + " " +h + " " + bbcprefix[h] );
		if (h<5) ca1[i]=strToLength(ca1[i],bbclen[h],"_"); 
		bbcstr += bbcprefix[h] + ca1[i] + " " + ca2[i] + bbcsufix[h];
	}
	bbcstr +="[/code][/size][/list][/list]";
	$('textarea[id=body]').text(bbcstr);
}

// paste function
function paste(){

	if (GM_getValue("col1"," ").match("Battle Report")!=null){
		//BATTLE REPORT
		col1=GM_getValue("col1"," ");
		$('textarea[id=body]').text(col1);
		//alert("1-"+col1);
	}else{
		// BASE // FLEET
		bbctable(GM_getValue("col1",sep + "H1 Copy something first" + sep +sep),GM_getValue("col2",sep+sep+sep));
		//alert("2-"+col1);
	}
}






// BATTLE REPORT

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
			ln="\n";
			t1=$(this).parent().next().find('table[class=battle-report_info]');
			t2=$(this).parent().next().find('table[class=battle-report_attack]');
			t3=$(this).parent().next().find('table[class=battle-report_defense]');
			brstr+=ln+tableToBBC(t1.html(),12);
			brstr+=ln+tableToBBC(t2.html(),9);
			brstr+=ln+tableToBBC(t3.html(),9);
			brstr+=ln;
			var t4="";
			$(this).parent().next().find('center').each(function(){
				pre="";suf="";
				if ($(this).attr("class").match("orange")!=null){pre="[color='ORANGE']";suf="[/color]";}
				if ($(this).attr("class").match("red")!=null){pre="[color='RED']";suf="[/color]";}
				t4+=pre+$(this).html()+suf+"\n";

			});
			t4=t4.replace( /<small>/g,"[size='2']");
			t4=t4.replace( /<\/small>/g,"[/size]");
			brstr="[u]" + brstr + "[/u]";
			brstr+="[list][code]" + t4 + "[/code][/list]";
			col1="[list][list][size='3'][code]" +brstr+ "[/code][/size][/list][/list]";
			GM_setValue("col1",col1);
			//alert(GM_getValue("col1","*"));
		},true);
	}

}




function tableToBBC(html,tablen){

	//$(jstable + ' a[id^=qladd]').remove();	
	br1=html;	

	// save some space
	br1=br1.replace( /Planetary Ring/g,"PR");
	br1=br1.replace( /Dreadnought/g,"DN");
	br1=br1.replace( /Heavy Cruiser/g,"HC");
	br1=br1.replace( /Heavy Bombers/g,"HB");
	br1=br1.replace( /Ion Bombers/g,"IonB");
	br1=br1.replace( /Ion Frigate/g,"IonF");
	br1=br1.replace( /Scout Ship/g,"SS");
	br1=br1.replace( /Outpost Ship/g,"OS");
	br1=br1.replace( /Planetary Shield/g,"PS");
	br1=br1.replace( /Barracks/g,"Barcks");
	br1=br1.replace( /Laser Turrets/g,"LaserT");
	br1=br1.replace( /Missile Turrets/g,"MissiT");
	br1=br1.replace( /Plasma Turrets/g,"PlasmT");
	br1=br1.replace( /Ion Turrets/g,"Ion T");
	br1=br1.replace( /Photon Turrets/g,"PhotoT");
	br1=br1.replace( /Disruptor Turrets/g,"DisruT");
	br1=br1.replace( /Deflection Shields/g,"DShiel");
	br1=br1.replace( /Planetary Shield/g,"PShiel");
	br1=br1.replace( /Planetary Ring/g,"PRing");
	br1=br1.replace( /Location/g,"Loc");
	br1=br1.replace( /Time/g,"Time");
	br1=br1.replace( /Player/g,"Yup");
	br1=br1.replace( /Fleet Name/g,"Fleet");
	br1=br1.replace( /Start Defenses/g,"Strt");
	br1=br1.replace( /End Defenses/g,"End");
	br1=br1.replace( /Command Centers/g,"CCs");
	br1=br1.replace( /Commander/g,"Comm");
	br1=br1.replace( /Start Quant./g,"StartQ");
	br1=br1.replace( /End Quant./g,"EndQ");
	br1=br1.replace( /Power/g,"Pwr");
	br1=br1.replace( /Armour/g,"Arm");
	br1=br1.replace( /Shield/g,"Shd");

	br1=br1.replace( /Cruiser/g,"CR");
	br1=br1.replace( /Fighters/g,"FT");
	br1=br1.replace( /Bombers/g,"Bomb");
	br1=br1.replace( /Battleship/g,"BS");
	br1=br1.replace( /Leviathan/g,"Levi");
	br1=br1.replace( /Carrier/g,"CA");
	br1=br1.replace( /Recycler/g,"RC");
	br1=br1.replace( /Destroyer/g,"Dest");
	br1=br1.replace( /Frigate/g,"Frig");
	br1=br1.replace( /Corvette/g,"Corv");

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
			for(var j=0;j<(tablen-temp.length);j++){
				spacer+="_";
			}

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
	br1=br1.replace(/<indent>/g,"[color='0']____[color='White']");
	//br1=br1.replace(/<orange>/g,"[color='ORANGE']");
	br1=br1.replace(/<b>/g,"[b]");
	br1=br1.replace(/<\/b>/g,"[/b]");
	br1=br1.replace(/<small>/g,"[size='2']");
	br1=br1.replace(/<\/small>/g,"[/size]");
	br1=br1.replace(/<a href="/g,"[url='");
	br1=br1.replace(/">/g,"']");
	br1=br1.replace(/<\/a>/g,"[/url]");
	
	return br1;
}






