// ==UserScript==
// @name           DouMailPreview
// @namespace      http://www.douban.com/people/down2crawl/
// @description    preview doumail at list page
// @include        http://www.douban.com/doumail/
// @include        http://www.douban.com/doumail/?start=*
// @include        http://www.douban.com/doumail/outbox
// @include        http://www.douban.com/doumail/outbox?start=*
// @author         down2crawl
// @version        0.1.0
// ==/UserScript==

function getContentByRegExp (myRegExp, queryStr){
	var re = new RegExp(myRegExp, "g");
	var returnArr = re.exec(queryStr);

	if (returnArr != null) {
		return returnArr;
	}
}

function sleep(n){  
	var start=new Date().getTime();  
	while(true) if(new Date().getTime()-start>n) break;  
}   

function addPreview (event){
	var infoPattern = "<br/><br/>(.*)<br/><br/>";
	var request = false;
	var addArea = document.getElementById("preview");

	addArea.innerHTML = '&nbsp;&nbsp;&nbsp;<b>Loading...</b>&nbsp;&nbsp;&nbsp;'
	addArea.style.display='block';
	sleep(3);

	if (!request && typeof XMLHttpRequest != 'undefined') {
		request = new XMLHttpRequest();
	}

	var url = this;
	request.open("GET", url, true);
	request.onreadystatechange = function (){
		if (request.readyState == 4) {
			if (request.responseText.replace(/\n/g, "").split("<br/><br/>")[3] != undefined){
				addArea.innerHTML = request.responseText.replace(/\n/g, "").split("<br/><br/>")[3];
			}
		}
	};
	request.send(null);

//	addArea.style.display='block';
	addArea.style.top =  parseInt(document.documentElement.scrollTop)+parseInt(event.clientY)+"px"
	freq = 1.2
	if (event.clientX > 350){
		freq = 1
	}
	addArea.style.left = parseInt(event.clientX*freq)+"px";

}

function ridPreview (){
	var addArea = document.getElementById("preview");
	addArea.innerHTML = "";
	addArea.style.display='none';
}


var hiddArea = document.createElement("div");
hiddArea.innerHTML = '<div id="preview" name="down2crawl" style="display:none;position:absolute;z-index:1001;background-color:#adeaea;color:#666666"></div>';
document.body.insertBefore(hiddArea, document.body.firstChild);

mailInfo = "";
testString = "";
mailPattern = "/doumail/\\d+";
allTagA = document.getElementsByTagName("a");

for (var i = 0; i < allTagA.length; i++) {
	regReturn = getContentByRegExp(mailPattern, allTagA[i]);
	if (regReturn != undefined) {
		allTagA[i].addEventListener("mouseover", addPreview, false);
		allTagA[i].addEventListener("mouseout", ridPreview, false);
	}
}
