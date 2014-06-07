// ==UserScript==
// @name           Pixiv Sort and View
// @namespace      http://d.hatena.ne.jp/verno3632/
// @description    pixiv
// @include        http://www.pixiv.net/*
// @exclude	   http://www.pixiv.net/search.php?*&p=*
// ==/UserScript==

searchlimit = 300;
/*function*/
function push(obj){
	list[list.length] = obj;
}


function getResultNO(){	
	var query = "//div[@id = 'content3']/table/tbody/tr[1]/td[1]/span[2]";
	var result = document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var str = 0;
	if(result.snapshotLength){
		var str = result.snapshotItem(0).innerHTML.match(/[0-9]+/) - 0;
	}
	return str;
}


function getAllProperty(){
	count++;
	var str;
	

	if(count == 1){
		str = document.getElementById("illust_c5").innerHTML;
	}else{
		viewStatus("download..." + count + "/" + pageno);
		url = document.URL + "&p=" + count;
		req = new XMLHttpRequest();
	
		req.open("GET", url, false);
		req.overrideMimeType('application/xml');
		req.send(null);
		str = req.responseText;
		var reg1 = new RegExp('<div id="illust_c5">(.*\n)*?<div style="width:50%;float:left;">', "gm");
		var reg2 = new RegExp('<div style="width:50%;float:left;">', "gm");
		str = str.match(reg1);
		str = str.toString();	
		str = str.replace(reg2, "");
	}
	var reg3 = new RegExp('<li>(.*\n)*?.*</li>', "gm");
	var reg4 = new RegExp('');
	var reg6 = new RegExp('');
	reg4.compile(/[0-9]+.user/gm);
	reg6.compile(/id=([0-9]+)/gm)
	li = str.match(reg3);
	for(var i = 0; i < li.length; i++){
		var obj = new Object();
		obj.li = li[i].replace('<a href', '<a target="' + date + '" href');
		var user = obj.li.match(reg4);
		if(user == null){
			obj.BMno = 0;
		}else{
			obj.BMno = Number(user[0].split(" ")[0]);
		}
		obj.li.match(reg6);
		obj.id = RegExp.$1;
		push(obj);	
	}
	return count;
}

function newTable(){
	var i,j;
	var col = list.length%5;
	var row = (list.length-col) / 5 + 1;
	var table = document.createElement("div");
	var str = "";
	var no = 0;
	table.id = "illust_c5";
	
	for(i = 0;i < row-1;i++){
		str += "<ul>";
		for(j = 0;j < 5;j++){
			str += list[no].li;
			no++ ;
		}
		str += "</ul>";
		str += '<div class="clear pdgTop30"></div>';
	}
	str += "<ul>";
	for(i = 0;i < col;i++){
		str += list[no].li;
		no++;
	}
	str += "</ul>";
	str += '<div class="clear pdgTop30"></div>';

	table.innerHTML = str;
	return table;
}

function rewriteResult(){
	var table = document.getElementById("illust_c5");
	var pager = document.getElementById("pager");
	var div = document.getElementById("content3").getElementsByTagName("div");
	var pager2 = div[div.length-2];
	var button = document.getElementById("sortButton");
	
	var newtable = newTable();
	if(table){
		table.parentNode.insertBefore(newtable, table.nextSibling);
		table.parentNode.removeChild(table);
	}
	if(pager){
		pager.parentNode.removeChild(pager);
	}
	if(pager2){
		pager2.parentNode.removeChild(pager2);
	}
	if(button){
		button.parentNode.removeChild(button);
	}
}	

function viewStatus(status){
	var statusWindow = document.getElementById("status");
	statusWindow.innerHTML = status;
}

function buttonOnclick(){
	viewStatus("starting...");
	GM_log(pageno);
	if(!(pageno == 1)){

		loop = setInterval(function(){
			value = getAllProperty();
			if(value >= pageno){
				afterAccess();
				clearInterval(loop);
				loop = null;
			}
		}, air);
	}else{
            afterAccess();
    }
}

function linkOnclick(i,page){
	if(page == 1){
		setCookie("PSID", date);
	}
	setCookie("PSflag", 1);
	setCookie("PSNO", i)
}

function setClickEvent(){
	elements = document.getElementById("illust_c5").getElementsByTagName("li");
	for(i = 0; i < elements.length; i++){
		eval("func=function(){linkOnclick(" + i + ",1)};");
		elements[i].addEventListener(
				"click", 
				func, 
				false
		) ;
	}
	
}

function afterAccess(){
	viewStatus("sorting...");
	quickSort(0, list.length-1);
	rewriteResult();
	setClickEvent();
	viewStatus("complete!");
	if(list.length < 400){
		var length = list.length;
	}else{
		var length = 400;
	}
	for(var i = 0;i < length; i++){
		idlist[i] = (list[i].id-0).toString(36);
	}
	setCookie("PSlist", idlist.toSource());
	deleteCookie("PSurl");
}

function setCookie(name, value){
	document.cookie = name + "=" + value;
}

function getCookie(name){
	var cookie = document.cookie + ";" ;
	var reg = new RegExp(name + "=(.*?);");
	var value = cookie.match(reg);

	if(value){
		 value = RegExp.$1;
	}
	return value;
}

function deleteCookie(name){  
	document.cookie = name + "=;expires=Thu,01-Jan-70 00:00:01 GMT;";
}

function setLimit(){
	GM_setValue("psv_max", searchlimit);
	
}

function removeLimit(){
	GM_setValue("psv_max", 0);
}



/* sort function */
air =1999;
function pivot(i,j){
	var k = i+1;
	while(k <= j && list[i].BMno == list[k].BMno){
		k++;
	}
	if(k > j){
		return -1;
	}
	if(list[i].BMno >= list[k].BMno){
		return i;
	}
	return k;
}
	
function partition(i,j,x){
	var l = i;
	var r = j;
	while(l<=r){
		while(l <= j && list[l].BMno >= x){
			l++;
		}
		while(r >= i && list[r].BMno < x){
			r--;
		}
		
		if(l>r){
			break;
		}
		var t = list[l];
		list[l] = list[r];
		list[r] = t;
		l++;
		r--;
	
	}
	return l;
}

function quickSort(i,j){
	if(i > j){
		return;
	}
	var p = pivot(i,j);
	if(p != -1){
		var k = partition(i,j,list[p].BMno);
		quickSort(i,k-1);
		quickSort(k,j);
	}
}


// main
var max = GM_getValue("psv_max", 0);
switch(max){
	case 0:
		GM_registerMenuCommand("pixiv s&v - max search limit :" + searchlimit, setLimit);
		break;
	default:
		GM_registerMenuCommand("pixiv s&v - max search limit : nothing",removeLimit);
		break;
}

var content3 = document.getElementById("content3");
var content2 = document.getElementById("content2");
var no = getResultNO();
if(max != 0 && no > max)	no = max;
var pageno = ((no-1) - (no-1)%20) / 20 + 1;
var date = new Date().getTime();
var count = 0;
if(content3 && no){
	var addElement = document.createElement("div");
	var newButton = document.createElement("button");
	var statusWindow = document.createElement("div");
	var list = new Array();
	var idlist = new Array();
	getAllProperty();
	/*rewriteResult();
	setClickEvent();
	setCookie("PSurl", document.URL);
	*/
	for(var i = 0;i < list.length; i++){
		idlist[i] = (list[i].id-0).toString(36);
	}
	setCookie("PSlist", idlist.toSource());
	setCookie("PSID", date);
	addElement.align = "center";
	newButton.innerHTML = "sort";
	newButton.id = "sortButton";
	newButton.addEventListener("click", buttonOnclick, false) ;
	statusWindow.innerHTML = "status";
	statusWindow.id = "status";
	addElement.appendChild(newButton);
	addElement.appendChild(statusWindow);
	content3.parentNode.insertBefore(addElement, content3);
	
}else if(getCookie("PSflag") && getCookie("PSID") == window.name && content2){
	deleteCookie("PSflag");
	var pager = document.createElement("ul");
	var previous = document.createElement("li");
	var next = document.createElement("li");
	var str = getCookie("PSlist");
	var list = eval(str);
	var thisno = getCookie("PSNO");
	
	previous.setAttribute("style", "float:left");
	next.setAttribute("style", "float:right");
	
	if(thisno > 0){
		previous.innerHTML = '<a href="http://www.pixiv.net/member_illust.php?mode=medium&illust_id=' + parseInt(list[thisno - 1], 36) + '"><<<</a>';
		previous.addEventListener("click", function(){linkOnclick(thisno-1, 0);}, false);
	}else{
		previous.innerHTML = "<<<";
	}
	
	if(thisno < list.length - 1){
		next.innerHTML = '<a href="http://www.pixiv.net/member_illust.php?mode=medium&illust_id=' + parseInt(list[thisno - 0 + 1], 36) + '">>>></a>';
		next.addEventListener("click", function(){linkOnclick(thisno-0+1, 0);}, false);
	}else{
		next.innerHTML = ">>>";
	}
	pager.appendChild(previous);
	pager.appendChild(next);
	content2.parentNode.insertBefore(pager, content2);
}

