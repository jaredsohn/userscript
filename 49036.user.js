// ==UserScript==
// @name           سكربت كشف الهجوم على قراك 
// @description    تعريب منصور العتيبي & Dream1  
// @include        http://*.travian.*/*
// @exclude 	   http://*.travian.*/login.php*
// @exclude        http://*.travian.*/logout.php*
// @exclude 	   http://*.travian.*/chat.php*
// @exclude 	   http://forum.travian.*
// @exclude 	   http://*.travian.*/index.php*
// @exclude 	   http://*.travian.*/manual.php*
// ==/UserScript==

//********Globals**************
var sHref = new Array();
var sActive_v = "";
var sCountryCode = countryCode();
//-----------------------------

function countryCode(){
	//document.location.href.match(/\b[a-z]{2,3}\/\b/).toString().substring(0,document.location.href.match(/\b[a-z]{2,3}\/\b/).toString().length-1));
	var sc = document.location.href.match(/\b[a-z]{2,3}\/\b/).toString();
	return sc.substring(0,sc.length-1);
	
}

function write( sData ){
	sData = sData.split(","); //i, img, number, info, newdid
	var v = document.evaluate('//td[@class="right"]/table[@class="dtbl"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	var oTD = document.createElement("td");
	var oDiv = document.createElement("div");
	var a = document.createElement("a");
	var nImg = document.createElement("img");
	
	var number = sData[2].split(" ");
	if(number[0].match(/\&raquo;/)){ number[0] = "»"; }
	if(number[0].match(/\&laquo;/)){ number[0] = "«"; }
	sData[2] = number[0] +" "+ number[1];
	
	nImg.title = sData[2] +" "+ sData[3]; //info;
	nImg.src = sData[1];
	
	a.href = "build.php?newdid=" + sData[4].toString() +"&gid=16";
	a.appendChild(nImg);
	
	oDiv.id = "info_link";
	oDiv.appendChild(a);
	v.snapshotItem(sData[0]).childNodes[1].childNodes[0].appendChild(oDiv);
}

function getHref(){ 	        	 					//table         tbody		  tr(i)	   		     td				a
	var tr = document.evaluate('//td[@class="nbr"]/a', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);   //[1].childNodes[0].childNodes[2];
	
	var i = 0;

	var active = document.evaluate('//a[@class="active_vl"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(active.snapshotLength > 0){
		sActive_v = active.snapshotItem(0).href.toString().split("=")[1];
	}

	if(tr.snapshotLength > 0){
		while(i < tr.snapshotLength){
			sHref[i] = tr.snapshotItem(i).toString().split("=")[1];
			i++;
		}
		sHref = sHref.join("|");
	}
}

function process(k,url){
	var xmlhttp = new XMLHttpRequest();
	var aImg = new Array;
	var aNumber = new Array;
	var aType = new Array;
	var aData = new Array;
	
	var re0 = new RegExp('<div id="ltbw0">[^%]*<div id="lrpr">','gi');
	var re1 = new RegExp('<div id="ltbw1">[^%]*<div id="lrpr">','gi');
	var ri = new RegExp('<img src="[^<>]*" border="0">','gi');
	var rn = new RegExp('<b class="[^<>]*" align="right">[^<>]*</b>','gi');
	var rt = new RegExp('<b class="[^<>]*">[^<>1-9]*</b>','gi');

	if(xmlhttp){
		try{
			xmlhttp.open("GET",url,true);
			xmlhttp.onreadystatechange = function handleRequestStateChange(){
				if(xmlhttp.readyState == 4){
					if(xmlhttp.status == 200){
						var data = xmlhttp.responseText.match(re0);						
						if(data == null){
							data = xmlhttp.responseText.match(re1).toString();
						}
						else{
							data = data.toString();
						}
						for(var i=0; i < data.match(ri).length; i++){
							aImg[i] = data.match(ri)[i].split('"')[1];
							aNumber[i] = data.match(rn)[i].slice(data.match(rn)[i].indexOf('>')+1,data.match(rn)[i].lastIndexOf('<'));
							aType[i] = data.match(rt)[i].slice(data.match(rt)[i].indexOf('>')+1,data.match(rt)[i].lastIndexOf('<'));
							
							aData[i] = k +","+ aImg[i] +","+ aNumber[i] +","+ aType[i] +","+ url.split("=")[1]; 
							
							write( aData[i] );
							storeData("sData",aData[i]);
						}
					}
				}
			};
			xmlhttp.send(null);
		}catch(e){ alert("hiba: "+ e); }
	}
}

function storeData(key,value){
	key = sCountryCode+"_"+key;
	var oValue = GM_getValue(key,"");

	if(oValue == ""){
		GM_setValue(key,value);
	}
	else{
		if(oValue.indexOf(value) == -1){
			GM_setValue(key,oValue +"|"+ value);
		}
	}
}

function refresh(){
	if(sHref != ""){
		GM_setValue(sCountryCode+"_"+"sData","");	//clean old data
		sHref = sHref.split("|");
		
		for(var j=0; j<sHref.length; j++){
			if(sHref[j] == sActive_v){
				var a_v_id = j;
			}
			else{
				process(j,"http://"+document.location.href.split("//")[1].split("/")[0]+"/dorf1.php?newdid="+sHref[j]);
			}
		}
		process(a_v_id,"http://"+document.location.href.split("//")[1].split("/")[0]+"/dorf1.php?newdid="+sActive_v);
	}
	
	GM_setValue("LastRefresh",$("tp1").childNodes[0].nodeValue);
	if($("007")){
		$("007").value = "وقت التحديث: 00:10:00";
	}
	//window.setTimeout("refresh()",1000);
}

function lastRefresh(returnType){
	var sTime = $("tp1").childNodes[0].nodeValue; //server time
	var myDate = GM_getValue("LastRefresh","0:0:0");
	var bReturn = false;

	myDate = myDate.split(":");
	sTime = sTime.split(":");
	
	var hour = parseInt(sTime[0]) - parseInt(myDate[0]);
	var minute = parseInt(sTime[1]) - parseInt(myDate[1]);
	var second = parseInt(sTime[2]) - parseInt(myDate[2]);
	
	if (second < 0){
		second = 60 + second;
		minute = minute - 1;
	}
	if (minute < 0){
		minute = 60 + minute;
		hour = hour - 1;
		bReturn = minute <= 10 ? false : true;
	}
	
	if(returnType == "boolean"){
		if(bReturn != true){ bReturn = hour == 0 ? false : true; }
		return bReturn;
	}
	if(returnType == "str"){
		return hour +":"+ minute +":"+ second;
	}
}

function timer(){
	var oBtn = $("007");
	var timeLeft = lastRefresh("str");

	timeLeft = timeLeft.split(":");
	
	//timeLeft[1] = parseInt(timeLeft[1]) == 0 ? 9 : 9 - parseInt(timeLeft[1]);
	//timeLeft[2] = parseInt(timeLeft[2]) == 0 ? 0 : 60 - parseInt(timeLeft[2]);
	if(parseInt(timeLeft[2]) == 0){
		timeLeft[2] = 0;
		timeLeft[1] =  10 - parseInt(timeLeft[1]);
	}
	else{
		timeLeft[1] = 9 - parseInt(timeLeft[1]);
		timeLeft[2] =  60 - parseInt(timeLeft[2]);
	}
	
	oBtn.value = "وقت التحديث: "+ convert(timeLeft[0])+":"+convert(timeLeft[1])+":"+convert(timeLeft[2]);
	
	//var t = setTimeout("timer()",500);
}

function convert(num){
	if(num < 0){ refresh(); return "00"; }
	if(num < 10){ return "0"+num; }
	else{ return num; }
}

function $(id) {
  return document.getElementById(id);
}

function onLoad(){
	getHref();
	if(lastRefresh("boolean") == true){
		refresh();
	}
	else{
		var data = GM_getValue(sCountryCode+"_"+"sData","");
		if(data != ""){
			if(data.indexOf("|") > -1){
				data = data.split("|");
				for(var i=0; i<data.length; i++){
					write(data[i]);
				}
			}
			else{
				write(data);
			}
		}
	}
	
	var oDiv = document.createElement("div");
	var oA = document.createElement("a");
	oA.href = "dorf3.php";
	var oSpan = '<span class="f10 c0 s7 b">القرى:</span>';

	var oInput = document.createElement("input");
	oInput.id = "007";
	oInput.name = "att_check"
	oInput.type = "button";
	oInput.value = "وقت التحديث: ";
	oInput.title = "اضغط لكشف الهجوم";
	oInput.addEventListener("click",refresh,false);
	
	oA.innerHTML=oSpan;
	oDiv.appendChild(oA);
	oDiv.appendChild(oInput);
	
	var pDiv = $("lright1");
	pDiv.replaceChild(oDiv,pDiv.childNodes[0]);
	
	timer();
}

//*******************
//* Main program
//*******************
//onLoad();
window.addEventListener('load',onLoad,false);