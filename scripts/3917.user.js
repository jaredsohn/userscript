// ==UserScript==
// @name           GameFAQs message date context
// @namespace      tag:neonpaul@gmail.com,1988-06-25:GFAQMDC
// @description    Displays message dates in terms of "minutes ago", "hours ago", etc
// @include        http://boards.gamefaqs.com/gfaqs/gentopic.php?board=*
// @version	   1.1
// ==/UserScript==



(function(){


var defaultSetting="on";




		function get(name){								//
		  var r="";									//
		  var var_string=(window.location+"?").split("?")[1].split("&");		//
			for(var i=0;i<var_string.length;i++){					//
			   var pair=var_string[i].split("=");					//
			   	if(name==unescape(pair[0].split("+").join("%20"))){						//
				   var r=pair[1].split("+").join("%20");						//
				   break;							//
				}								//
			}									//
		   return unescape(r);								//
		}

var board=get("board");


if(get("context")){

GM_setValue("board"+board,get("context"));
}


if(GM_getValue("board"+board,defaultSetting)=="on"){
document.getElementsByTagName("table")[0].rows[0].cells[4].innerHTML+=" <a href=?board="+board+"&context=off title='Turn context off for this board'><font size=1 color=#FFFFCC>C</font></a>";

today=new Date();

for(i=1; i<document.getElementsByTagName("table")[0].rows.length; i++){

txtDate=document.getElementsByTagName("table")[0].rows[i].cells[4].innerHTML;
msgDate=new Date(new Date().getFullYear()+"/"+txtDate.replace(/(.?M)/," $1"));


diff=(today-msgDate)/(1000*60);
timeType="minute";

if(diff>60){
diff=diff/60;
timeType="hour";

if(diff>24){

diff=diff/24;
timeType="day";


if(diff>7){
diff=diff/7;
timeType="week";
}else if(diff>30){
diff=diff/30;
timeType="month";
}else if(diff>365){
diff=diff/365;
timeType="year";
}


}

}

if(parseInt(diff)>1){
timeType+="s";
}


document.getElementsByTagName("table")[0].rows[i].cells[4].innerHTML="<font title='"+txtDate+"' ondblclick=\"alert('"+txtDate+"')\">About "+parseInt(diff)+" "+timeType+" ago.</a>";


}

}else{
document.getElementsByTagName("table")[0].rows[0].cells[4].innerHTML+=" <a href=?board="+board+"&context=on title='Turn context on for this board'><font size=1 color=#FFFFCC><s>C</s></font></a>";
}



})();

