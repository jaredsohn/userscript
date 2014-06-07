// ==UserScript==
// @name        AutoFarmBin
// @namespace   AutoFarmBin
// @description AutoFarm Bin - Nicht zur Installation gedacht!
// @include     *
// @version     1.0
// ==/UserScript==

window.setTimeout("myPoll()", getRandom(8000,10000));
window.setInterval("myPoll()", getRandom(310000,360000));

var wood;
var stone;
var iron;
var storage;
var townLinks;

function myPoll(){
	/*if(isStorageFull()){
		//return;
	}*/ 

	Layout.wnd.Create(Layout.wnd.TYPE_FARM_TOWN_OVERVIEWS, "Bauerndörfer Farmen");
	window.setTimeout("myFarmingPre()", getRandom(2000,3000));
}

function init(){
	wood = new Array();
	stone = new Array();
	iron = new Array();
	storage = new Array();
	townLinks = new Array();

	var tlist = document.getElementById("fto_town_list");
	var lis = tlist.getElementsByTagName("li");

	for(var i=1;i<lis.length;i++)
		if(lis[i].getAttribute("class").contains("town")&&!lis[i-1].getAttribute("class").contains("town"))
			townLinks.push(lis[i]);  
	
	for(var i=0;i<townLinks.length;i++){
		var values = townLinks[i].getElementsByTagName("div")[0].innerHTML.match(/\d+/g);
		wood[i] = values[0];
		stone[i] = values[1];
		iron[i] = values[2]; 
		storage[i] = values[3];
	}
}

function isStorageFull(i){
	var dif = getRandom(100,300);
	if(storage[i] - iron[i] < dif|| storage[i] - stone[i] < dif || storage[i] - wood[i] < dif)
		return true;
	return false;
}

function myFarmingPre(){
	console.info("init...");
	init();
	myFarming(0);
}

function myFarming(i) {
	console.info("myFarming("+i+")");
	if(i<wood.length){	
                townLinks[i].click();
		window.setTimeout("myFarming2("+i+")", getRandom(4500,6000));
	}
	else{
		window.setTimeout("myFarmingClose()", getRandom(4500,6000));
		console.info("schließen...");
	}
}

function myFarming2(i) {	
	console.info("myFarming2("+i+")");
	var newI = i - (-1);
	if(!isStorageFull(i)){
		console.info("fordern... i="+i);
		document.getElementById("fto_claim_button").click();
		window.setTimeout("myFarming("+newI+")", getRandom(4500,6000));
	}else		
		window.setTimeout("myFarming("+newI+")", getRandom(1500,2000));	
}

function myRemoveChild(a){
	a.parentNode.removeChild(a);
}

function myFarmingClose() {
	var abc = document.getElementById("fto_claim_button").parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	abc.getElementsByTagName("div")[0].getElementsByTagName("a")[0].click();
}

function getRandom(min, max) {
 if(min > max) {
  return -1;
 }
 
 if(min == max) {
  return min;
 }
 
 var r;
 
 do {
  r = Math.random();
 }
 while(r == 1.0);
 
 return min + parseInt(r * (max-min+1));
}
