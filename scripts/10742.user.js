// ==UserScript==
// @author		thanks to usr8472, modified by kao_kai
// @namespace	        http://userscripts.org/
// @name		Travian: resursni statistiki
// @description	        statistiki za resursi i sgradi
// @include		http://s*.travian.*/*.php*
// ==/UserScript==

if ( navigator.appName == 'Opera' ) {
     eventSource = document;
} else {
     eventSource = window;
}

function TimeFieldToSecond(maxtime) { // convert a hh:mm:ss time stamp to seconds
   var limit = maxtime.split(":");
   return (limit.length == 3) ? (parseInt(limit[0]) * 3600 + parseInt(limit[1]) * 60 + parseInt(limit[2])) : 0;
}

var autotime;

function StartTimer() { // clock for launching a new page
var go = 0;
var resource = [];

	for(var i=0;i<4;i++) {
	  rtd  = returnObjById("l"+(i+1));
	  if(!rtd) return;
	  prod  = parseInt(rtd.title);
	  store = parseInt(rtd.textContent.match(/\-?(\d+)\//));
	  storeMax = parseInt(rtd.textContent.replace(/(\d+)\//,""));  
	  resource[i]=[prod,store,storeMax];
 
	auto="res"+i;
	parselimit=returnObjById(auto);
	if(!parselimit) return;
	
		parselimit=TimeFieldToSecond(parselimit.innerHTML)-1;

		var sec=0;
				
		if(prod >0){
				sec= parseInt(3600*(storeMax-store)/prod);
		}  else if( prod < 0) {
				sec= parseInt(3600*-store/prod);
		}	

		if(sec<parselimit) parselimit=sec;
					
		if(parselimit>0) {
		    var insertArea=document.getElementById(auto);
			    go=1;
				
					if(parselimit<300) {
						insertArea.style.color="red";
					} 
					else {
						insertArea.style.color="green";
					}

				insertArea.innerHTML = formatORG(parselimit);
		}

		

		if(parselimit<=0){
			var insertArea=document.getElementById(auto);
			if(insertArea.innerHTML.indexOf("00:00:00 h")==-1) {insertArea.innerHTML="00:00:00 h";insertArea.style.color="red";}
		}

		
	}

	

	if(go==1){
		updateBar(parseInt(100*(resource[0][1]/resource[0][2]) ).toFixed(0),"wood");
		updateBar(parseInt(100*(resource[1][1]/resource[1][2]) ).toFixed(0),"clay");
		updateBar(parseInt(100*(resource[2][1]/resource[2][2]) ).toFixed(0),"iron");
		updateBar(parseInt(100*(resource[3][1]/resource[3][2]) ).toFixed(0),"crop");
		autotime = window.setTimeout(StartTimer, 1000);
	} else {
		clearTimeout(autotime);
		return;
	}

 }
 
function RGB2HTML(blue, green, red)
{
    var decColor = red + 256 * green + 65536 * blue;
	
	decColor=decColor.toString(16);
	
	while( decColor.length < 6){
		decColor="0"+decColor;
	}
	
    return "#"+decColor;
}

function formatTime(maxtime,hours, minutes, seconds, off){
     var hrs = Math.floor(maxtime/3600);
     var min = Math.floor(maxtime/60) % 60;
     var sec = maxtime % 60;
     hours=hrs+hours+off;
     minutes=min+minutes;
     seconds=seconds+sec;
     return [hours,minutes,seconds];
}

var military=0;
var dayOff=0;

function EstGen(time){
     var days=0;
     var head="";

     var tail=" Clock ";

     while(time[2]>=60){
     time[2]-=60;
     time[1]+=1;
     }

     while(time[1]>=60){
     time[1]-=60;
     time[0]+=1;
     }

     while(time[0]>=24){
     time[0]-=24;
     days+=1;
     }

     if(military==-1){
     if(time[0]>12){
          time[0]-=12;
          tail=" pm";
     } else{
          if(time[0]==0) {time[0]=12;}
          tail=" am";
     }
     }

     if(time[0]<10){
     time[0]="0"+time[0];
     }
     if(time[1]<10){
     time[1]="0"+time[1];
     }
     if(time[2]<10){
     time[2]="0"+time[2];
     }

     if(days==0){
     head="Достатъчно ресури днес в ";
     } else if(days==1){
     head="Достатъчно ресури утре в " ;
     } else {
     head="Достатъчно ресури след " +d + " дена в ";
     }
     

return head+time[0]+":"+time[1]+":"+time[2]+tail;

}

function formatORG(maxtime){

     var helper=formatTime(maxtime,0, 0, 0, 0);

     var hrs = helper[0];
     var min = helper[1];
     var sec = helper[2];
     
     var t = hrs + ":";
     if(min < 10){t += "0";}
     t += min;
     t += ":";
     if(sec < 10){t += "0";}
     t += sec;
     return t+" h";
}

function returnObjById( id )
{
    if (document.getElementById)
        return document.getElementById(id);
    else if (document.all)
        return document.all[id];
    else if (document.layers)
        return document.layers[id];
}

function getElementsByClassName(oElm, strTagName, strClassName){
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
     
    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement;
    for(var i=0; i<arrElements.length; i++){
        oElement = arrElements[i];      
        if(oRegExp.test(oElement.className)){
       arrReturnElements.push(oElement);
        }   
    }
    return (arrReturnElements)
}

/* ----------------------------------------------------- */

function updateBar(store, id){
var c=returnObjById(id+"color");

if(c.innerHTML.indexOf(store+"%")!=-1) return;

returnObjById(id+"bar").width=store+"%";
	
var tol=255;
var font="white";
var sec=tol-100-store;

	if(store<50){
		tol=150;
		font="white";
	} else {
		tol=255;
		font="black";
	}

var red=parseInt(tol*(store/100));


	if(store>=90){
		c.style.textDecoration="blink";
	} 
	else {
		c.style.textDecoration="none";
	}
		
	c.innerHTML=store+"%";
	var color =RGB2HTML(red,sec,sec);
	c.style.background=color;
	c.color=font;
	
}

function quickBar(store, elbar, elcol, img ){
var newmenu="";

var tol=255;
var font="white";
var sec=tol-100-store;

if(store<50){
tol=150;
font="white";
} else {
tol=255;
font="black";
}

var red=parseInt(tol*(store/100));
if(store>=90){
font=font+";text-decoration: blink;";
}
newmenu += "<tr>";
newmenu += "<td colspan=2><table id="+elbar+" width="+store+"% cellpadding=0 cellspacing=0><tbody><tr><td width=1%><img src=http://s3.travian.com/img/un/r/"+img+".gif></td><td id="+elcol+" style='background-color: rgb("+red+","+sec+","+sec+");font-size:8pt;color: "+font+"'>"+store+"%</td></tr></tbody></table></td>";
newmenu += "</tr>";

return newmenu;
}

function quickMenu(store_wood,store_iron,store_clay,store_crop, out){

var mymenu_div = document.createElement( 'div' );

mymenu_div.setAttribute('style', 'z-index:5;');
mymenu_div.className = "unem";
mymenu_div.style.position = "relative";
mymenu_div.style.left = "130px";
mymenu_div.style.width = "550px";
mymenu_div.style.top = "120px";
mymenu_div.style.clear = "both";

var newmenu = "";

newmenu += "<table cellspacing=1 cellpadding=1 class=tbg id=mymenu><tbody>";
newmenu += "<tr class=rbg><td colspan=2>Ресурси в часове</td></tr>";

newmenu += "<tr><td width=270>"+out[0]+"</td><td>"+out[1]+"</td></tr><tr><td width=270>"+out[2]+"</td><td>"+out[3]+"</td></tr>";

newmenu += "<tr>";
newmenu += "<td colspan=2 class=rbg>Ресурсни барове</td>";
newmenu += "</tr>";


newmenu += quickBar(store_wood, "woodbar", "woodcolor",1);
newmenu += quickBar(store_clay,"claybar", "claycolor",2);
newmenu += quickBar(store_iron,"ironbar", "ironcolor",3);
newmenu += quickBar(store_crop,"cropbar", "cropcolor",4);

newmenu += "</tbody></table>";

mymenu_div.innerHTML=newmenu;


//mda
if(window.location.href.indexOf("build")!=-1 || window.location.href.indexOf("statistiken")!=-1 || window.location.href.indexOf("allianz")!=-1){
mymenu_div.style.top = "10px";}

document.getElementById("ce").appendChild(mymenu_div)
}

/* -------------------------------------------------- */

function onLoad(){

     var results = document.evaluate('//td[@id]/text()',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

     if (results.snapshotLength == 0) {return;}
	 	 
	var out = [], resource = [], ele = [];
	ele[0]="дърво";
	ele[1]="глина";
	ele[2]="желязо";
	ele[3]="жито";

	for(var i=0;i<4;++i) {
	 rtd  = returnObjById("l"+(i+1));
	  if(!rtd) return;
	  
	  prod  = parseInt(rtd.title);
	  store = parseInt(rtd.textContent.match(/\-?(\d+)\//));
	  storeMax = parseInt(rtd.textContent.replace(/(\d+)\//,""));  
	  resource[i]=[prod,store,storeMax];
	  
	    if(store>0){ 
			if(prod > 0) {
				secFull = (3600*(storeMax-store)/prod);
		  	    out[i]="препълване: <span id=res"+i+" >"+formatORG(Math.ceil(Math.max(0,secFull)))+" </span>";
			}  else if(prod[i] < 0) {
			    secFull = (3600*-store/prod);
				out[i]="изпразване: <span id=res"+i+" >"+formatORG(Math.ceil(Math.max(0,secFull))) +" </span>";
			} else {
				out[i]="Unknown: <span id=res"+i+" > 00:00:00 h"+"</span>";
			}
			out[i]="<span style='font-size:8pt;'>"+ele[i]+" "+out[i]+" </span>"
		} else {
			out[i]="Unknown: <span id=res"+i+" > 00:00:00 h"+"</span>";
			out[i]="<span style='font-size:8pt;'>"+ele[i]+" "+out[i]+" </span>"
		}
		
		
	} 
	 
     var wood = resource[0][1];
     var clay = resource[1][1];
     var iron = resource[2][1];
     var crop = resource[3][1];

     var woodp = resource[0][0];
     var clayp = resource[1][0];
     var ironp = resource[2][0];
     var cropp = resource[3][0];
	 
	var wood_storage = resource[0][2];
	var clay_storage = resource[1][2];
	var iron_storage = resource[2][2];
	var crop_storage = resource[3][2];

	var store_wood = parseInt(100*(wood/wood_storage) ).toFixed(0);
	var store_iron = parseInt(100*(iron/iron_storage) ).toFixed(0);
	var store_clay = parseInt(100*(clay/clay_storage) ).toFixed(0);
	var store_crop = parseInt(100*(crop/crop_storage) ).toFixed(0);


     var woodsn=0,claysn=0,ironsn=0,cropsn=0;
     if (wood<woodneed) woodsn=woodneed-wood;
     if (clay<clayneed) claysn=clayneed-clay;
     if (iron<ironneed) ironsn=ironneed-iron;
     if (crop<cropneed) cropsn=cropneed-crop;
	 	
	quickMenu(store_wood,store_iron,store_clay,store_crop, out);
		
     var need = document.evaluate('//table[@class="f10"]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
     if(need.snapshotLength==0) {return;}

     var hours;
     var minutes;
     var seconds;
     
     var servertime=returnObjById("tp1").textContent.split(":");
     
     if(servertime.length!=0){
     hours=parseInt(servertime[0]);
     minutes=parseInt(servertime[1]);
     seconds=parseInt(servertime[2]);
     military=0;
     dayOff=0;
     } else {
     var Digital=new Date();
     hours=Digital.getHours();
     minutes=Digital.getMinutes();
     seconds= Digital.getSeconds();
     military=0;
     dayOff=0;
     }
     
     for (var i=0;i<need.snapshotLength;i++){

     if (need.snapshotItem(i).textContent.indexOf("|")==-1||need.snapshotItem(i).textContent.charAt(0)=="\n") continue;
     var needs = need.snapshotItem(i).textContent.split(" | ");

     var woodneed = parseInt(needs[0]);
     var clayneed = parseInt(needs[1]);
     var ironneed = parseInt(needs[2]);
     var cropneed = parseInt(needs[3]);

     var woodsn=0,claysn=0,ironsn=0,cropsn=0;
     if (wood<woodneed) woodsn=woodneed-wood;
     if (clay<clayneed) claysn=clayneed-clay;
     if (iron<ironneed) ironsn=ironneed-iron;
     if (crop<cropneed) cropsn=cropneed-crop;

     var maxtime=0,time,t;
     woodtime = woodsn/woodp*3600;
     if (maxtime<woodtime) maxtime=woodtime;
     claytime = claysn/clayp*3600;
     if (maxtime<claytime) maxtime=claytime;
     irontime = ironsn/ironp*3600;
     if (maxtime<irontime) maxtime=irontime;
     croptime = cropsn/cropp*3600;
     if (maxtime<croptime) maxtime=croptime;

     maxtime=parseInt(maxtime);

     t=formatTime(maxtime,hours, minutes, seconds, dayOff);

     t=EstGen(t);
        maxtime=formatORG(maxtime);

     croptime=parseInt(croptime);
        irontime=parseInt(irontime);
     claytime=parseInt(claytime);
     woodtime=parseInt(woodtime);

     if(woodtime>0){
     woodtime=formatORG(woodtime);}

     if(claytime>0){
        claytime=formatORG(claytime);}

     if(irontime>0){
     irontime=formatORG(irontime);}

     if(croptime>0){
     croptime=formatORG(croptime);
     }

         var timeo=0;

     if (wood>woodneed && woodsn==0)
     {
        woodsn=wood-woodneed;
        woodsn="+"+woodsn;
     }
     else if(woodsn!=0)
     {
        timeo=1;
        woodsn="-"+woodsn;
     }

     if (clay>clayneed && claysn==0)
     {
        claysn=clay-clayneed;
        claysn="+"+claysn;
     }
     else if (claysn!=0)
     {
        timeo=1;
        claysn="-"+claysn;
     }

     if (iron>ironneed && ironsn==0  )
     {
        ironsn=iron-ironneed;
        ironsn="+"+ironsn;
     }
     else if( ironsn!=0 )
     {
        timeo=1;
        ironsn="-"+ironsn;
     }

     if(crop>cropneed && cropsn==0 )
     {
         cropsn=crop-cropneed;
          cropsn="+"+cropsn;
     }
     else if( cropsn!=0 )
     {
          timeo=1;
          cropsn="-"+cropsn;
     }

        if ('0'!=woodsn && '0'!=claysn && '0'!=ironsn && '0'!=cropsn)
     {
          var resource_div = document.createElement( 'div' );
          resource_div.style.background="transparent";
          resource_div.style.cssFloat = "left";
          var iner = '<b>Нужни</b> за построяване: (+) в повече, (-) дефицит <br/><table border=0><tr><td></td><td><b><font color=green>баланс</font></b></td><td><b><font color=green>съдържание</font></b></td></tr><tr><td colspan=3 height=10px><hr size=1></td></tr><tr>';
iner+=imageTag(1, "дърво", woodsn,woodtime,woodneed);
iner+=imageTag(2, "глина", claysn,claytime,clayneed);
iner+=imageTag(3, "желязо", ironsn,irontime,ironneed);
iner+=imageTag(4, "жито", cropsn,croptime,cropneed);

          if(timeo==1)
          {
          iner+='<tr><td colspan=3><span>'+t+" | Моля изчакайте : "+maxtime+"</span></td></tr>";
          }
          iner+="</table>";
          resource_div.innerHTML=iner;
          need.snapshotItem(i).appendChild(resource_div);


     }
     }
	 
	 
StartTimer();
}

function imageTag(numberid, resourceid, resource,time, need){
    var text='<tr><td><img src="img/un/r/'+numberid+'.gif" width="18" height="12"></td><td>'+resource+"</td><td>";
     if(time==0){
     text+="<font color=navy>"+((parseInt(resource)/need)*100).toFixed(2)+" % стигат </font> - <font color=green><b>OK</b></font><br/>";
     } else {
     text+="<font color=red><b>" +resourceid+" ще бъде готово в : " + time+"</b></font><br/>";
     }
     text += "</td></tr>";
     return text;
}

eventSource.addEventListener( 'load', function( e ) {  onLoad();  } ,false);
