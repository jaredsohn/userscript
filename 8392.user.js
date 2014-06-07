// ==UserScript==
// @author      improved by Otyugh based on luckyman script, modified by tomasz.frelik (at) enzo.pl, modified by usr8472(at)gmail.com,
// @namespace     http://userscripts.org/
// @name     Travian: Navigator
// @description     Travian Page Navigator
// @include     http://s*.travian.*/*.php*
// ==/UserScript==

if ( navigator.appName == 'Opera' ) {
     eventSource = document;
} else {
     eventSource = window;
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
     head="Enough resources today at ";
     } else if(days==1){
     head="Enough resources tomorrow at " ;
     } else {
     head="Enough resources in " +d + " days at ";
     }
     
     var ret=head+time[0]+":"+time[1];

return ret+":"+time[2]+tail;

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

     function checkUncheckAll(theElement) {
     var theForm = eventSource.form, z = 0;
      for(z=0; z<theForm.length;z++){
      if(theForm[z].type == 'checkbox' && theForm[z].name != 'checkall'){
       theForm[z].checked = theElement.checked;
       }
     }
    }

/* -------------------------------------------------------- */
function spielerid()
{
var i=document.getElementsByTagName('a');
for (var j=i.length-1; j>1; j--)
	{
    var linkdata =  i[j].getAttribute('href');
    var linkparts = linkdata.split('=');
if (linkdata.match('spieler.') == 'spieler.' )
		{
	    var s = i[j].innerHTML;
	    var s1 = s.indexOf('<');
	    if( s1 < 0 )
			{if(i[j].innerHTML == 'Profile'){/*alert(linkparts[1]);*/}}
		}
	}
}

function quickMenu(store_wood,store_iron,store_clay,store_crop){
var the_div = document.createElement( 'div' );
the_div.setAttribute('id', 'controller');

spielerid();
var mymenu_div = document.createElement( 'div' );
// trying to set position but failed, will do it again in ver 3
//mymenu_div.setAttribute('style', 'position:absolute; z-index:5; border: 0px solid #000000; left: 0px; top: 200px');
mymenu_div.className = "unem";
mymenu_div.style.right = "0px";
mymenu_div.style.position = "absolute";
var newmenu = "";
newmenu += "<script type=text/javascript>";
newmenu += "function jump(fe){";
newmenu += "     var opt_key = fe.selectedIndex;";
newmenu += "     var uri_val = fe.options[opt_key].value;";
newmenu += "     window.open(uri_val,'_top');";
newmenu += "     return true;";
newmenu += "     }";
newmenu += "function AllMsg1()";
newmenu += "{";
newmenu += "for(var x=0;x<document.forms['msg'].elements.length;x++)";
newmenu += "{";
newmenu += "var y=document.forms['msg'].elements[x];";
newmenu += "if(y.name!='del') y.checked=true";     // alert('Here:'+y.name+y.checked); document.forms['msg'].elements[x].checked;
newmenu += "}";
newmenu += "}";

newmenu += "</script>";

newmenu += "<form name=jumpto method=get><table cellspacing=1 cellpadding=1 class=tbg id=mymenu><tbody>";
newmenu += "<tr><td td colspan=2><iframe src=http://otyugh.007ihost.com/scriptnews.html width=235px height=90px scrolling=no frameborder=0></iframe></td></tr>";

newmenu += "<tr class=rbg><td colspan=2>Travian : Navigator v1.1</td></tr>";
newmenu += "<tr><td colspan=2>";
newmenu += "<table border=1px width=100% cellpadding=0 cellspacing=0><tbody><tr>";
newmenu += "			<td><a href=\"#\" onClick=\"AllMsg1();\"><img src=\"http://s3.travian.com/img/un/a/del.gif\" border=\"0\" title=\"Select all msg for deletion\">Select all msg to delete</a></td>";
newmenu += "			<td width=1%><img src=http://s3.travian.com/img/un/r/4.gif></td>";
newmenu += "		</tr><tr>";
newmenu += "			<td><table width="+store_wood+"% cellpadding=0 cellspacing=0><tbody><tr><td width=1%><img src=http://s3.travian.com/img/un/r/1.gif></td><td style='background-color: rgb("+(100-store_wood)+","+(100-store_wood)+","+(100-store_wood)+");font-size:8pt;color: #FF8000'>"+store_wood+"%</td></tr></tbody></table></td>";
newmenu += "			<td rowspan=3 height=100% valign=bottom style='background-color: rgb("+(5+store_crop)+","+(200-store_crop)+","+(200-store_crop)+");'><table border=0 width=100% height="+store_crop+"% cellpadding=0 cellspacing=0><tbody><tr><td style='background-color: rgb("+(100-store_crop)+","+(100-store_crop)+","+(100-store_crop)+");font-size:8pt;color: #FF8000'>"+store_crop+"</td></tr></tbody></table></td>";
newmenu += "		</tr><tr>";
newmenu += "			<td><table width="+store_clay+"% cellpadding=0 cellspacing=0><tbody><tr><td width=1%><img src=http://s3.travian.com/img/un/r/2.gif></td><td style='background-color: rgb("+(100-store_clay)+","+(100-store_clay)+","+(100-store_clay)+");font-size:8pt;color: #FF8000'>"+store_clay+"%</td></tr></tbody></table></td>";
newmenu += "		</tr><tr>";
newmenu += "			<td><table width="+store_iron+"% cellpadding=0 cellspacing=0><tbody><tr><td width=1%><img src=http://s3.travian.com/img/un/r/3.gif></td><td style='background-color: rgb("+(100-store_iron)+","+(100-store_iron)+","+(100-store_iron)+");font-size:8pt;color: #FF8000'>"+store_iron+"%</td></tr></tbody></table></td>";
newmenu += "		</tr></tbody></table>";
newmenu += "</td></tr>";

newmenu += "<tr class=cbg1><td style='font-size:8pt'>Armies</td>";
newmenu += "<td><select name='gid' onChange='return jump(this);' size='1' style='font-size:8pt'>";
newmenu += "     <option value=#>Select an option</option>";
newmenu += "     <option value=build.php?id=39>Troops Report</option>";
newmenu += "     <option value=a2b.php?s=4>Send Troops</option>";
newmenu += "     <option value=warsim.php>War Simulator</option>";
newmenu += "</select></td></tr>";

newmenu += "<tr class=cbg1><td style='font-size:8pt'>Marketplace</td>";
newmenu += "<td><select name='gid' onChange='return jump(this);' size='1' style='font-size:8pt'>";
newmenu += "     <option value=#>Select an option</option>";
newmenu += "     <option value=build.php?gid=17>Send Resources</option>";
newmenu += "     <option value=build.php?gid=17&t=1>Buy</option>";
newmenu += "     <option value=build.php?gid=17&t=2>Offer</option>";
newmenu += "     <option value=build.php?gid=17&t=3>NPC Trading</option>";
newmenu += "</select></td></tr>";

newmenu += "<tr class=cbg1><td style='font-size:8pt'>Reports</td>";
newmenu += "<td><select name='gid' onChange='return jump(this);' size='1' style='font-size:8pt'>";
newmenu += "     <option value=#>Select an option</option>";
newmenu += "     <option value=berichte.php>All Reports</option>";
newmenu += "     <option value=berichte.php?t=1>Reinforcement</option>";
newmenu += "     <option value=berichte.php?t=2>Trade</option>";
newmenu += "     <option value=berichte.php?t=3>Attacks</option>";
newmenu += "     <option value=berichte.php?t=4>Miscellaneous</option>";
newmenu += "</select></td></tr>";

newmenu += "<tr class=cbg1><td style='font-size:8pt'>Messages</td>";
newmenu += "<td><select name='gid' onChange='return jump(this);' size='1' style='font-size:8pt'>";
newmenu += "     <option value=#>Select an option</option>";
newmenu += "     <option value=nachrichten.php>Inbox</option>";
newmenu += "     <option value=nachrichten.php?t=1>Write</option>";
newmenu += "     <option value=nachrichten.php?t=2>Sent</option>";
newmenu += "</select></td></tr>";


newmenu += "<tr class=cbg1><td style='font-size:8pt'>Statistics</td>";
newmenu += "<td><select name='gid' onChange='return jump(this);' size='1' style='font-size:8pt'>";
newmenu += "     <option value=#>Select an option</option>";
newmenu += "     <option value=statistiken.php>Player</option>";
newmenu += "     <option value=statistiken.php?id=2>Villages</option>";
newmenu += "     <option value=statistiken.php?id=4>Alliances</option>";
newmenu += "     <option value=statistiken.php?id=31>Offense</option>";
newmenu += "     <option value=statistiken.php?id=32>Defense</option>";
newmenu += "     <option value=statistiken.php?id=0>General</option>";
newmenu += "</select></td></tr>";

newmenu += "<tr class=cbg1><td style='font-size:8pt'>Alliance</td>";
newmenu += "<td><select name='gid' onChange='return jump(this);' size='1' style='font-size:8pt'>";
newmenu += "     <option value=#>Select an option</option>";
newmenu += "     <option value=allianz.php>Overview</option>";
newmenu += "     <option value=allianz.php?s=2>Forum</option>";
newmenu += "     <option value=allianz.php?s=6>Chat</option>";
newmenu += "     <option value=allianz.php?s=3>Attack</option>";
newmenu += "     <option value=allianz.php?s=4>News</option>";
newmenu += "     <option value=allianz.php?s=5>Options</option>";
newmenu += "</select></td></tr>";

newmenu += "<tr class=cbg1><td style='font-size:8pt'>Resources</td>";
newmenu += "<td><select name='gid' onChange='return jump(this);' size='1' style='font-size:8pt'>";
newmenu += "     <option value=#>Select an option</option>";
newmenu += "     <option value=build.php?gid=4>Cropland</option>";
newmenu += "     <option value=build.php?gid=1>Woodcutter</option>";
newmenu += "     <option value=build.php?gid=2>Clay pit</option>";
newmenu += "     <option value=build.php?gid=3>Iron mine</option>";
newmenu += "     <option value=build.php?gid=10>Warehouse</option>";
newmenu += "     <option value=build.php?gid=11>Granary</option>";
newmenu += "     <option value=build.php?gid=23>Cranny</option>";
newmenu += "     <option value=build.php?gid=17>Marketplace</option>";
newmenu += "     <option value=build.php?gid=8>Grain mill</option>";
newmenu += "     <option value=build.php?gid=7>Iron foundry</option>";
newmenu += "     <option value=build.php?gid=6>Brickyard</option>";
newmenu += "     <option value=build.php?gid=5>Sawmill</option>";
newmenu += "     <option value=build.php?gid=9>Bakery</option>";
newmenu += "     <option value=build.php?gid=35>Brewery</option>";
newmenu += "</select></td></tr>";

newmenu += "<tr class=cbg1><td style='font-size:8pt'>Military</td>";
newmenu += "<td><select name='gid' onChange='return jump(this);' size='1' style='font-size:8pt'>";
newmenu += "     <option value=#>Select an option</option>";
newmenu += "     <option value=build.php?gid=33>Palisade</option>";
newmenu += "     <option value=build.php?gid=31>City wall</option>";
newmenu += "     <option value=build.php?gid=32>Earth wall</option>";
newmenu += "     <option value=build.php?gid=19>Barracks</option>";
newmenu += "     <option value=build.php?gid=36>Trapper</option>";
newmenu += "     <option value=build.php?gid=22>Academy</option>";
newmenu += "     <option value=build.php?gid=13>Armoury</option>";
newmenu += "     <option value=build.php?gid=20>Stable</option>";
newmenu += "     <option value=build.php?gid=21>Workshop</option>";
newmenu += "     <option value=build.php?gid=12>Blacksmith</option>";
newmenu += "     <option value=build.php?gid=29>Big Barracks</option>";
newmenu += "     <option value=build.php?gid=30>Big Stable</option>";
newmenu += "     <option value=build.php?gid=37>The Mansion</option>";
newmenu += "</select></td></tr>";

newmenu += "<tr class=cbg1><td style='font-size:8pt'>Goverment</td>";
newmenu += "<td><select name='gid' onChange='return jump(this);' size='1' style='font-size:8pt'>";
newmenu += "     <option value=#>Select an option</option>";
newmenu += "     <option value='#'>Goverment</option>";
newmenu += "     <option value=build.php?gid=15>Main building</option>";
newmenu += "     <option value=build.php?gid=16>Rally point</option>";
newmenu += "     <option value=build.php?gid=25>Residence</option>";
newmenu += "     <option value=build.php?gid=18>Embassy</option>";
newmenu += "     <option value=build.php?gid=26>Palace</option>";
newmenu += "     <option value=build.php?gid=24>Townhall</option>";
newmenu += "     <option value=build.php?gid=34>Stonemason</option>";
newmenu += "     <option value=build.php?gid=28>Trade office</option>";
newmenu += "     <option value=build.php?gid=27>Treasury</option>";
newmenu += "     <option value=build.php?gid=14>Tour. square</option>";
newmenu += "</select></form></td></tr>";
newmenu += "</tbody></table>";

mymenu_div.innerHTML=newmenu;
//It is below here is the problem
//Travian page have 2 div which
//use ba as its classname
document.getElementById("ba").appendChild(mymenu_div);
document.getElementById("ba").appendChild(the_div);

return;
}

/* -------------------------------------------------- */

function onLoad(){

     var results = document.evaluate('//td[@id]/text()',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

     if (results.snapshotLength == 0) {return;}

     var wood = parseInt(results.snapshotItem(0).data.split('/'));
     var clay = parseInt(results.snapshotItem(1).data.split('/'));
     var iron = parseInt(results.snapshotItem(2).data.split('/'));
     var crop = parseInt(results.snapshotItem(3).data.split('/'));

     var woodp = parseInt(results.snapshotItem(0).parentNode.title);
     var clayp = parseInt(results.snapshotItem(1).parentNode.title);
     var ironp = parseInt(results.snapshotItem(2).parentNode.title);
     var cropp = parseInt(results.snapshotItem(3).parentNode.title);
var wood_storage = results.snapshotItem(0).data.split('/',2)[1];
var clay_storage = results.snapshotItem(1).data.split('/',2)[1];
var iron_storage = results.snapshotItem(2).data.split('/',2)[1];
var crop_storage = results.snapshotItem(3).data.split('/',2)[1];
var store_wood = parseInt(100*wood/results.snapshotItem(0).data.split('/',2)[1]).toFixed(0);
var store_iron = parseInt(100*iron/results.snapshotItem(1).data.split('/',2)[1]).toFixed(0);
var store_clay = parseInt(100*clay/results.snapshotItem(2).data.split('/',2)[1]).toFixed(0);
var store_crop = parseInt(100*crop/results.snapshotItem(3).data.split('/',2)[1]).toFixed(0);


     var woodsn=0,claysn=0,ironsn=0,cropsn=0;
     if (wood<woodneed) woodsn=woodneed-wood;
     if (clay<clayneed) claysn=clayneed-clay;
     if (iron<ironneed) ironsn=ironneed-iron;
     if (crop<cropneed) cropsn=cropneed-crop;
quickMenu(store_wood,store_iron,store_clay,store_crop);
ExtraLink();
     var need = document.evaluate('//table[@class="f10"]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
     if(need.snapshotLength==0) {return;}

     var hours;
     var minutes;
     var seconds;

     var timeblock=getElementsByClassName(document, "*", "div3");
     
     var servertime=returnObjById("tp1").textContent.split(":");
     
     if(servertime.length!=0){
     hours=parseInt(servertime[0]);
     minutes=parseInt(servertime[1]);
     seconds=parseInt(servertime[2]);
     var searcharea=timeblock[0].textContent; 
     
     if( searcharea.indexOf("am")!=-1){
     military=-1;
     dayOff=0;
     } else if( searcharea.indexOf("pm")!=-1){
     military=-1;
     dayOff=12;
     } else {
     military=0;
     dayOff=0;
     }
          
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
          var iner = '<b>Needed</b> for upgrading: (+) surplus, (-) needed <br/><table border=0><tr><td></td><td><b><font color=green>Balance</font></b></td><td><b><font color=green>Status</font></b></td></tr><tr><td colspan=3 height=10px><hr size=1></td></tr><tr>';
iner+=imageTag(1, "Wood", woodsn,woodtime,woodneed);
iner+=imageTag(2, "Clay", claysn,claytime,clayneed);
iner+=imageTag(3, "Iron", ironsn,irontime,ironneed);
iner+=imageTag(4, "Crop", cropsn,croptime,cropneed);

          if(timeo==1)
          {
          iner+='<tr><td colspan=3><span>'+t+" | Please wait : "+maxtime+"</span></td></tr>";
          }
          iner+="</table>";
          resource_div.innerHTML=iner;
          need.snapshotItem(i).appendChild(resource_div);


     }
     }

}

function imageTag(numberid, resourceid, resource,time, need){
    var text='<tr><td><img src="img/un/r/'+numberid+'.gif" width="18" height="12"></td><td>'+resource+"</td><td>";
     if(time==0){
     text+="<font color=navy>"+((parseInt(resource)/need)*100).toFixed(2)+" % enough </font> - <font color=green><b>OK</b></font><br/>";
     } else {
     text+="<font color=red><b>" +resourceid+" will complete in : " + time+"</b></font><br/>";
     }
     text += "</td></tr>";
     return text;
}

function ExtraLink() 
{
var i=document.getElementsByTagName('a');
for (var j=i.length-1; j>1; j--) 
	{
    var linkdata =  i[j].getAttribute("href");
    var linkparts = linkdata.split("=");
    if (linkdata.match("karte.") == "karte." ) 
		{
	    var s = i[j].innerHTML;
	    var s1 = s.indexOf('<');
	    if( s1 < 0 )
			{
			var imgattack = new Image(); 
			imgattack.src = 'http://forum.travian.com/images/smilies/icon_evil.gif';
			imgattack.border=0;
			imgattack.title="Attack";
		
			var imgsend = new Image(); 
			imgsend.src = 'http://forum.travian.com/images/smilies/icon_arrow.gif';
			imgsend.width = '16';
			imgsend.height = '16';
			imgsend.border=0;
			imgsend.title="Send resource";

			var imgcmap = new Image(); 
			imgcmap.src = 'http://forum.travian.com/images/smilies/icon_question.gif';

			imgcmap.border=0;
			imgcmap.title="Center on map";
		
		        var attklink = document.createElement("a");
		        attklink.href="a2b.php"+"?z="+linkparts[1];
		        attklink.appendChild( imgattack );
		        
			var bizlink = document.createElement("a");
		        bizlink.href="build.php"+"?z="+linkparts[1]+"&gid=17";
		        bizlink.appendChild( imgsend );

			var maplink = document.createElement("a");
		        maplink.href="karte.php"+"?z="+linkparts[1];
		        maplink.appendChild( imgcmap );

		        maplink.appendChild(document.createTextNode("  "));
		        i[j].parentNode.insertBefore( maplink ,i[j]);
		        i[j].parentNode.insertBefore( attklink ,i[j]);
		        i[j].parentNode.insertBefore( bizlink ,i[j]);
 
	    		}
        	} // karte
    if (linkdata.match("spieler.") == "spieler." ) 
		{
	    var s = i[j].innerHTML;
	    var s1 = s.indexOf('<');
	    if( s1 < 0 )
			{
			var imgprofile = new Image(); 
			imgprofile.src = 'http://forum.travian.com/images/smilies/icon_question.gif';
			imgprofile.border=0;
			imgprofile.title="View profile";
		
			var imgsend = new Image(); 
			imgsend.src = 'http://forum.travian.com/images/smilies/icon_arrow.gif';
			//imgsend.width = '16';
			//imgsend.height = '16';
			imgsend.border=0;
			imgsend.title="Send message";


		
		        var profilelink = document.createElement("a");
		        profilelink.href="spieler.php"+"?uid="+linkparts[1];
		        profilelink.appendChild( imgprofile );
		        
			var msglink = document.createElement("a");
		        msglink.href="nachrichten.php?t=1&"+"id="+linkparts[1];
		        msglink.appendChild( imgsend );


		        profilelink.appendChild(document.createTextNode("  "));

		        i[j].parentNode.insertBefore( profilelink ,i[j]);
		        i[j].parentNode.insertBefore( msglink ,i[j]);
 
	    		}
        	} // spieler
	}

}

eventSource.addEventListener( 'load', function( e ) {  onLoad();  } ,false);