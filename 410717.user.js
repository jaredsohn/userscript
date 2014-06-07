// ==UserScript==
// @name        kickjava enhancer
// @namespace   kickjava enhancer
// @include     http://kickjava.com/*.java
// @include     http://kickjava.com/*.java.htm
// @version     1
// @grant       none
// ==/UserScript==

//在源代码头添加工具栏框contentColumn0
var contentColumn = document.getElementById("contentColumn");
var contentColumn0 = document.createElement("div");
var contentHeading1 = document.getElementById("contentHeading1");
contentColumn.insertBefore(contentColumn0, contentHeading1);
contentColumn0.style.marginTop = "10px";
contentColumn0.style.backgroundColor = "#DDCC88";
contentColumn0.style.padding = "12px 20px";
var buttonLineNum = document.createElement("input");
buttonLineNum.setAttribute("type","button");
buttonLineNum.setAttribute("id","button-LN");
contentColumn0.appendChild(buttonLineNum);
buttonLineNumStyle = document.createElement("style");
document.body.appendChild(buttonLineNumStyle);
buttonLineNumStyle.innerHTML = "#button-LN\n" +
	"{\n" +
	"\twidth: 180px;\n" +
	"\theight: 26px;\n" +
	"\tbackground-color: #EAEAEA;\n" +
	"\tbackground-image: linear-gradient(#FAFAFA, #EAEAEA);\n" +
	"\tbackground-image: -moz-linear-gradient(#fafafa, #eaeaea);\n" +
	"\tbackground-image: -webkit-linear-gradient(#fafafa, #eaeaea);\n" +
	"\tbackground-repeat: repeat-x;\n" +
	"\tborder-color: #DDDDDD #DDDDDD #C5C5C5;\n" +
	"\tborder-radius: 5px;\n" +
	"\tborder-style: solid;\n" +
	"\tborder-width: 1px;\n" +
	"\tbox-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n" +
	"\tcolor: #333333;\n" +
	"\tfont-weight: bold;\n" +
	"\ttext-align: center;\n" +
	"\tvertical-align: middle;\n" +
	"\ttext-shadow: 0 1px 0 rgba(255, 255, 255, 0.9);\n" +
	"}\n" +
	"#button-LN:hover, #button-LN:active\n" +
	"{\n" +
	"\tcursor: pointer;\n" +
	"\tbackground-color: #dadada;\n" +
	"\tbackground-image: -moz-linear-gradient(#fafafa, #dadada);\n" +
	"\tbackground-image: -webkit-linear-gradient(#fafafa, #dadada);\n" +
	"\tbackground-image: linear-gradient(#fafafa, #dadada);\n" +
	"\tborder-color: #ccc #ccc #b5b5b5;\n" +
	"}\n" + 
	"#button-LN:focus\n" +
	"{\n" +
	"\toutline: none;\n" +
	"\tborder-color: #CC9933;\n" +
	"\tborder-style: solid;\n" +
	"\tbox-shadow: 0 0 5px rgba(192, 96, 0,0.5);\n" +
	"}\n" + 
	"#button-LN::-moz-focus-inner\n" +
	"{\n" +
	"\toutline: none;\n" +
	"\tborder-color:transparent;\n" +
	"}\n";

//定义复制到剪切板函数
function setClipBoard(s) {
	if (window.clipboardData) { //IE
		window.clipboardData.setData("Text", s);
	} else {
		alert("This utility is only for IE");
	}
}

//隐藏行号
function hideLineNum() {
	tags = document.getElementsByTagName("font");
	for (var i = 0; i < tags.length; i++) {
		if (tags[i].id == "LN") {
			tags[i].style.display = "none";
		}
	}
	buttonLineNum.onclick = showLineNum;
	buttonLineNum.value = "show line numbers";
}

//显示行号
function showLineNum() {
	tags = document.getElementsByTagName("font");
	for (var i = 0; i < tags.length; i++) {
		if (tags[i].id == "LN") {
			tags[i].style.display = "inline";
		}
	}
	buttonLineNum.onclick = hideLineNum;
	buttonLineNum.value = "hide line numbers";
}

hideLineNum();