// ==UserScript==
// @name           WZL filter
// @version        1.0
// @namespace      http://www.userscripts.org
// @creator        SaWey
// @description    Filter WZL fun page naar wens
// @include        http://*wzl.be/fun/index.asp?par=f_day*
// @include        http://*wijfzonderlijf.be/fun/index.asp?par=f_day*
// @include        http://*wzl.be/fun/
// @include        http://*wijfzonderlijf.be/fun/

// ==/UserScript==

function addToBlacklist(e){
	var string = document.getElementById('blacklistMe').value;
	if(trim(string) == ""){
		alert("Gelieve een waarde in te vullen.");		
	}else{
		var str = GM_getValue("wzlBL");
		GM_setValue("wzlBL", str + "|" + string);
		var check = GM_getValue("wzlLijst");
		if(check == 0){
			blacklist();
		}else{
			whitelist();	
		}	
		document.getElementById("blacklistMe").value = "Toegevoegd";
		setTimeout("document.getElementById(\"blacklistMe\").value = \"\"",500);
	}
}

function blacklist(){
	var str = GM_getValue("wzlBL");
	strArr = "";
	if(str !=null){
		strArr = str.split("|");
	}	
	var blacklist = new Array();
	for(n=0; n<strArr.length; n++){
		if(trim(strArr[n]) != ""){
			blacklist[n] = strArr[n];
		}
	}
	var tdArr = document.getElementsByTagName("td");
	for(i=0; i<tdArr.length;i++){
		if(tdArr[i].className=="center"){
			var  parent_td = tdArr[i];
			var items = parent_td.getElementsByTagName("td");
			for(o=0; o<items.length; o++){
				for(p=0; p<blacklist.length; p++){
					if(items[o].innerHTML.match(blacklist[p]) && blacklist[p] != null){
						items[o].parentNode.style.display = "none";					
					}
				}
			}
		
		}
	}
}

function showBL(e){
	var str = GM_getValue("wzlBL");
	var strArr = "";
	if(str !=null){
		strArr = str.split("|");
	}	
	var blacklist = new Array();
	var bl = document.getElementById("blList");
	bl.innerHTML = "<br /> ";
	for(n=0; n<strArr.length; n++){
		//alert(strArr[n])
		if(trim(strArr[n]) != "" && trim(strArr[n]) != null){
			var imgv = document.createElement("img");
			imgv.title = "Verwijder uit lijst!";
			imgv.id = strArr[n];
			imgv.src = "http://www.wzl.be/imgs/common/hot2.gif";
			imgv.style.cursor = "pointer";
			imgv.addEventListener('click', verwVanBlacklist , true);
			var text = document.createElement("span");
			text.innerHTML = strArr[n] + "<br />";
			bl.appendChild(imgv);
			bl.appendChild(text);
		}
	}
}


function verwVanBlacklist(e){
	var str = GM_getValue("wzlBL");
	strArr = "";
	if(str !=null){
		strArr = str.split("|");
	}
	var blacklist = new Array();
	var blacklistStr = "";
	var bl = document.getElementById("blList");
	bl.innerHTML = " ";
	for(n=0; n<strArr.length; n++){
		if(strArr[n] != this.id && strArr[n] != ""){
			blacklistStr += "|" + strArr[n];
		}else{
			blacklistStr += "";
			}
	}
	GM_setValue("wzlBL", blacklistStr);
	window.location=window.location.href;
}

function whitelist(){
	var str = GM_getValue("wzlBL");
	strArr = "";
	if(str !=null){
		strArr = str.split("|");
	}	
	var whitelist = new Array();
	for(n=0; n<strArr.length; n++){
		if(trim(strArr[n]) != ""){
			whitelist[n] = strArr[n];
		}
	}
	var ko = 0;
	var temp = new Array();
	var tdArr = document.getElementsByTagName("td");
	for(i=0; i<tdArr.length;i++){
		if(tdArr[i].className=="center"){
			var  parent_td = tdArr[i];
			var items = parent_td.getElementsByTagName("td");
			for(o=0; o<items.length; o++){
				for(p=0; p<whitelist.length; p++){
					if(items[o].innerHTML.match(whitelist[p]) && whitelist[p] != null){
						temp.push(o);
						//items[o].parentNode.style.display = "";	
					}else{
						items[o].parentNode.style.display = "none";	
					}
				}
			}
			for(o=0; o<temp.length; o++){
				items[temp[o]].parentNode.style.display = "";
			}
		
		}
	}
}

function trim(value) {
  value = value.replace(/^\s+/,''); 
  value = value.replace(/\s+$/,'');
  return value;
}

function activatewhitelist(e){
	GM_setValue("wzlLijst", 1);	
	whitelist();
	var img_white = document.getElementById("whitelisticon");
	img_white.style.display = "none";
	var img_black = document.getElementById("blacklisticon");
	img_black.style.display = "";
	var titel = document.getElementById("lijstTitel");
	titel.innerHTML = "Whitelist: ";
}

function activateBlacklist(e){
	GM_setValue("wzlLijst", 0);	
	window.location=window.location.href;
	var img_white = document.getElementById("whitelisticon");
	img_white.style.display = "";
	var img_black = document.getElementById("blacklisticon");
	img_black.style.display = "none";
	var titel = document.getElementById("lijstTitel");
	titel.innerHTML = "Blacklist: ";
}


var lijst = 0;//blacklist by default
if(GM_getValue("wzlLijst") != null){
	lijst = GM_getValue("wzlLijst");
}
if(lijst == 0){
	blacklist();	
}else{
	whitelist();	
}



//extra filtermenu aanmaken
var tdArr = document.getElementsByTagName("td");
for(i=0; i<tdArr.length;i++){
	if(tdArr[i].className=="right"){
		//we zitten aan de items
		var  parent_td = tdArr[i];
		var parent_header = parent_td.getElementsByTagName("FORM");
		
		var br = document.createElement("BR");
		parent_header[0].appendChild(br);
		
//		var lijst_ = 0;
//		if(GM_getValue("wzlLijst") != null){
//			lijst_ = GM_getValue("wzlLijst");
//		}
		
		var title = document.createElement("H2");
		//////////////////////////////////////////////
		var imgf = document.createElement("img");
		imgf.title = "Toon lijst";
		imgf.src = "http://www.wzl.be/imgs/tabs/fun/fun_icon.gif";
		imgf.border = 0;
		imgf.height = 9;
		imgf.width = 11;
		imgf.style.cursor = "pointer";
		imgf.addEventListener('click', showBL , true);
		//////////////////////////////////////////////
		var whitelisticon = document.createElement("img");
		whitelisticon.id = "whitelisticon";
		whitelisticon.title = "Toggle whitelist";
		whitelisticon.src = "http://www.wzl.be/imgs/tabs/my/my_icon.gif";
		whitelisticon.border = 0;
		whitelisticon.height = 9;
		whitelisticon.width = 11;
		whitelisticon.style.cursor = "pointer";
		whitelisticon.addEventListener('click', activatewhitelist , true);
		//////////////////////////////////////////////
		var blacklisticon = document.createElement("img");
		blacklisticon.id = "blacklisticon";
		blacklisticon.title = "Toggle blacklist";
		blacklisticon.src = "http://wzl.be/imgs/tabs/balzak/balzak_icon.gif";
		blacklisticon.border = 0;
		blacklisticon.height = 9;
		blacklisticon.width = 11;
		blacklisticon.style.cursor = "pointer";
		blacklisticon.addEventListener('click', activateBlacklist , true);
		//////////////////////////////////////////////
		if(lijst == 0){
			blacklisticon.style.display = "none";
			whitelisticon.style.display = "";
		}else{
			blacklisticon.style.display = "";
			whitelisticon.style.display = "none";	
		}
		
		
		var text = document.createElement("span");
		text.innerHTML = "&nbsp;&nbsp;ADV FILTER &nbsp;&nbsp;&nbsp;";

		parent_header[0].appendChild(title);
		title.appendChild(imgf);
		title.appendChild(text);
		title.appendChild(whitelisticon);
		title.appendChild(blacklisticon);
		
		
		var descr = document.createElement("B");
		descr.id = "lijstTitel";
		if(lijst == 0){
			descr.innerHTML = 'Blacklist: ';
		}else{
			descr.innerHTML = 'Whitelist: ';
			}
		
		parent_header[0].appendChild(descr);
		
		
		var input = document.createElement("input");
		input.type = "text";
		input.id = "blacklistMe";
		input.name = "blacklistMe";
		input.width = 130;
		parent_header[0].appendChild(input);
	
		var img = document.createElement("img");
		img.id = "blacklistMeImg";
		img.title = "Voeg toe aan lijst!";
		img.src = "http://wzl.be/imgs/common/filter.gif";
		img.style.cursor = "pointer";
		img.addEventListener('click', addToBlacklist , true);
		parent_header[0].appendChild(img);
		
		var bl = document.createElement("span");
		bl.id = "blList";
		bl.innerHTML = "";
		parent_header[0].appendChild(bl);
	}
}