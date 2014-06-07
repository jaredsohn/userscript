// ==UserScript==
// @name        GoogleBlogSearchButton
// @namespace   http://userscripts.org/users/useridnumber
// @description Add google blog search link
// @include     *www.google.com*
// @version     0.2
// ==/UserScript==

/*
v0.2  2014/4/21
Change to event listener "keyup".
*/

var input = document.getElementById("lst-ib");
var content = input.value;
// input.setAttribute("onkeyup", "createButton()");
input.addEventListener("keyup", createButton, true);

function createButton(){
	console.log(".....");
	// var a = "aaaaaaaa";
	// console.log(a);
	content = document.getElementById("lst-ib").value;
	console.log("search content", content);
	if(!content==''){ 
		var PREFIX = "http://www.google.com/search?tbm=blg&q=";

		var bar = document.getElementById("hdtb_msb");
		// console.log("bar", bar);

		//创建按钮
		var blogButton = document.createElement("div");
		blogButton.setAttribute("class", "hdtb_mitem");
		blogButton.setAttribute("id", "blogSearchButton");

		//创建链接
		var linkEle = document.createElement("a");
		linkEle.setAttribute("class", "q qs");
		linkEle.href = PREFIX + content;
		linkEle.innerHTML = "Blog Search";

		blogButton.appendChild(linkEle);

		var ifButton = document.getElementById("blogSearchButton");
		if(ifButton != undefined){
			// console.log("button exists!!!");
			ifButton.parentNode.removeChild(ifButton);
		}
		bar.appendChild(blogButton);
		
	}
}


