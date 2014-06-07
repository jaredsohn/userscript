// ==UserScript==
// @name        QRcode Generater
// @namespace   http://userstyles.org
// @description 将网址转换为二维码
// @grant       GM_registerMenuCommand
// ==/UserScript==

//定义二维码转换引擎
var Engine = 'http://qr.liantu.com/api.php?m=7&text=';

//生成当前网址的二维码
function QRcodeForCurrentURL() {
    var CurrentURL = window.location.href;
    AddElement(CurrentURL, CurrentURL);
}

//生成输入的网址的二维码
function QRcodeForInputURL() {
	InputURL = prompt('Please input an URL:', '');
	if (InputURL == null || InputURL == '') {
		return;
	}
    AddElement(InputURL, InputURL);
}

//显示二维码
function AddElement(URLToEncode, URLInfo) {
    body = document.getElementsByTagName('body')[0];
    QRcodeElement = document.createElement('div');
    QRcodeElement.setAttribute('id', 'QRcode');
    QRcodeElement.setAttribute('style', 'position:fixed; top:0; left:0; width:100%; height:' + document.body.clientHeight +'px; z-index:60000; text-align:center; background-image: -moz-repeating-linear-gradient(top left -35deg, rgba(255,255,255,.1),rgba(0,0,0,.1) 2px,rgba(0,0,0,.1) 5px,rgba(255,255,255,.1) 6px,rgba(255,255,255,.1) 8px); background-color:rgba(0,0,0,.45);');
    QRcodeElement.innerHTML = '<p style="margin:90px 5% 10px;;display:inline-block; padding:3px 10px; border-radius:10px; font-weight:bold; font-size:16px; background-color:white;">' + URLInfo + '</p><p><br /></p><img src="' + Engine + URLToEncode + '"></img>';
    body.insertBefore(QRcodeElement, body.firstChild);
	document.getElementById('QRcode').addEventListener('click', function () { 
        var Temp = document.getElementById('QRcode');
        Temp.parentNode.removeChild(Temp);
        }, false);
}

//在“用户脚本命令”添加两个命令
GM_registerMenuCommand('Generate QRcode For Current URL', QRcodeForCurrentURL);
GM_registerMenuCommand('Generate QRcode For Input URL', QRcodeForInputURL);