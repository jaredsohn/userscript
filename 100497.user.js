// ==UserScript==
// @name           Theuu
// @namespace      Theuu
// @description    Travian
// @include        *//www.theuu999.com/*
// @include        http://ts6.travian.asia/a2b.php
// @include        http://ts6.travian.asia/a2b.php?x=*&y=*&t*=*&c=4
// @include        http://ts6.travian.asia/build.php?gid=16
// ==/UserScript==

function city_loot(xx,yy,tt,nn,jj){
	var url = 'http://ts6.travian.asia/a2b.php?x='+xx+'&y='+yy+'&t'+tt+'='+nn+'&c=4';
	mywindow[jj] = window.open(url);
}
function GetValueQueryString(key, default_){
	if (default_==null){
		default_="";
	}
	key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
	var qs = regex.exec(window.location.href);
	if(qs==null){
		return default_;
	}
	else{
		return qs[1];
	}
}

var mywindow = new Array();
for(k=0;k<=1;k++){
	mywindow[k]=k;
}

//Start Page
if(location.href=='http://www.theuu999.com/'){
	if(confirm('Start Script ?')==true){
		var group1 = 1;
		var group2 = 1;
		var group3 = 0;
		
		//city_loot(x,y,type,amount);
		
		if(group1==1){
			//group1					
			city_loot(-99,91,1,15,0);	//Fairy Tail (-99|91)				
			city_loot(-101,87,5,6,0);	//Number First (-101|87)			
		}
		if(group2==1){
			//group2
			city_loot(-94,83,4,5,0);	//SmallRoom (-94|83)
			city_loot(-92,88,4,7,0);	//slyers (-92|88)
		}
		if(group3==1){
			//group3
		}
	}
}
else{
	var check_p1=GetValueQueryString("c");

	if(check_p1==4){
		document.forms[0].submit();
		document.getElementsByName('x')[1].value=x;
	}
	else if(location.href=='http://ts6.travian.asia/a2b.php'){
		document.forms[0].submit();
	}
	else if(location.href=='http://ts6.travian.asia/build.php?gid=16'){
		if(mywindow[1]==true){
			for(i=0;i<=1;i++){
				mywindow[i] = window.close();
			}
		}
	}
}