// ==UserScript==
// @name       Auto Timming 2
// @namespace  http://use.i.E.your.homepage/
// @version    2.1
// @description  Oh my village,never die again！QAQ
// @include		http://diam.ngct.net/*
// @copyright  2014+, Chao Bao Zi
// ==/UserScript==



//以下是校正按鈕製作
if(document.location.href.split("_")[1]=="play.php?room"){
	var tr = document.getElementsByTagName("tr")[1];
	var td = tr.insertCell(1);
	td.align = "right";
	td.innerHTML="<input type=button value='時間校正' id='adbt'>";
 	//以下定義校正函數，計算現在時間庾人狼時間的差，存入adjusting變數（其實是存到類似cookie的地方以長期記憶）
	document.getElementById("adbt").onclick = function(){
		var adjustTime=0;
		var d=new Date();
		var mForAdjust=d.getMinutes();
		var lastTimeForAdjust=document.getElementsByTagName("span")[1].innerHTML.substring(1,3);
		adjustTime=lastTimeForAdjust-mForAdjust+1;
    	if(adjustTime>30){
    		adjustTime=adjustTime-60;
    	}
		GM_setValue("adjusting",adjustTime);
    	tr.deleteCell(1);
    };
}







//初次載入時執行（F5等方式重刷之後也會執行一次）
setTimeout(function(){
	var d=new Date();
	var m=d.getMinutes();
	var lastTime;
	var timePass;
	var adjust=GM_getValue("adjusting");
	if(document.location.href.split("_")[1]=="play.php?room"){
		lastTime=document.getElementsByTagName("span")[1].innerHTML.substring(1,3);
		timePass=adjust+m-lastTime;
    	if(timePass<0){
    		timePass=timePass+60;
		}
		GM_setValue("GM",timePass);
	}
	//上方函數用以計算經過的時間，並存入GM變數中（也是類似cookie的地方），存完之後，執行下面的函數
    //這裡設兩百豪秒後執行是為了給上面函數先做完的時間
    setTimeout(function(){      
        var a=GM_getValue("GM",0);
        if(a>7&&a<30){       	
			var h=d.getHours();
				if(h<10){
					h="0"+h.toString();
				}
				else{
					h=h.toString();
				}
		var mm=d.getMinutes()+adjust-1;
			if(mm<10){
				mm="0"+mm.toString();
			}
			else{
				mm=mm.toString();
			}
    	document.getElementById("say").value=h+mm;    
    	document.getElementById("submit").click();
		window.location.reload();    
        }    
    },200)
    //以上函數判斷時間差大於7就執行發話，限制小於30是因為
    //若使用者時間比人狼時間慢（校正前），會讓程式以為過了五十分鐘以上而不斷執行，造成洗頻
},200)




//以下每分鐘檢查一次，動作與上面完全相同（我根本複製貼上）
setInterval(function(){
	var d=new Date();
	var m=d.getMinutes();
	var lastTime;
	var timePass;
	var adjust=GM_getValue("adjusting");
	if(document.location.href.split("_")[1]=="play.php?room"){
		lastTime=document.getElementsByTagName("span")[1].innerHTML.substring(1,3);
		timePass=adjust+m-lastTime;
    	if(timePass<0){
    		timePass=timePass+60;
   		}
		GM_setValue("GM",timePass);
	}
    setTimeout(function(){
        var a=GM_getValue("GM",0);
        if(a>7&&a<30){
			var d=new Date();
			var h=d.getHours();
			if(h<10){
				h="0"+h.toString();
			}
			else{
				h=h.toString();
			}
			var mm=d.getMinutes()+adjust-1;
			if(mm<10){
				mm="0"+mm.toString();
			}
			else{
				mm=mm.toString();
			}
			document.getElementById("say").value=h+mm;  
			document.getElementById("submit").click();
			window.location.reload();    
        }
    },200)
},60000)
