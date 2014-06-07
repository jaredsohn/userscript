// ==UserScript==
// @name           ToRupees
// @namespace      SachinM
// @description    Displays all Dollars on page as Rupees
// @include        http://snapsort.com/*
// ==/UserScript==

var originalBody='';
var originalOn=true;
addMenuSpecific();
function addMenuSpecific() {
	var myspan=document.getElementById("myspan")
	if (myspan == undefined) {
		banner=document.getElementById("banner-menu");
		//banner.innerHTML+="<span onClick=\"myAction();\">Click</span>";
		mySpan = document.createElement("span");
		mySpan.setAttribute("id", "myspan");
		mySpan.innerHTML="Convert";
		banner.appendChild(mySpan);
	}
	mySpan.addEventListener("click",myAction, false);
}
function addMenuGeneral() {
  var div = document.createElement("div");
  //div.setAttribute("onclick", "return window;");
  div.setAttribute("id", "mydiv");
  div.innerHtml="Hello";
  div.setAttribute("style", "position:fixed;background:#fff4c8;border:1px solid #ffcc00;width:150px;z-index:9999999;");
  document.body.appendChild(div);
  //p = div.onclick();
  }
 
 function myAction() {
	if (!originalOn) {
		alert(originalOn);
		originalOn=true;
		document.body.innerHTML=originalBody;
		alert('b');
		addMenuSpecific();
		document.getElementById("myspan").innerHTML="Toggle to Rupee";
	} else {
		originalOn=false;
		var body=document.body.innerHTML;
		originalBody=body;
		parts=body.split('$');
		for(i=1;i<parts.length;i++) {
			temp=parts[i];
			for(j=0;j<temp.length;j++) {
				if (isNaN(temp.charAt(j)) || temp.charAt(j)=='.') {
					break;
				}
			}
			
			if (j>0) {
				converted=new Number(temp.substring(0,j)).valueOf()*48;
				parts[i]=converted+temp.substring(j);
			}
		}
		document.body.innerHTML=parts.join("Rs.");
		addMenuSpecific();
		document.getElementById("myspan").innerHTML="Toggle to Dolllars";

	}
 }