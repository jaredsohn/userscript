// ==UserScript==
// @name         ==widgets==js==
// @version 3.6
// @namespace   
// @description    done2 use plzz its parsonal u ass holes
// ==/UserScript==widgets



function init_widget(params){
	document.getElementById("wd_id").innerHTML='<style>#outerdiv{width:'+arguments[0]+'px; height:'+arguments[1]+'px;  border:1px solid #FFFF00;top:-45px;left:-53px;overflow:hidden;position:relative;}#innerIframe{position:absolute;top:'+arguments[3]+'px;left:'+arguments[4]+'px;width:1119px;height:1111px;}</style><link rel="stylesheet" href="my1.css"/><div style="position:absolute; left: 25px; top: 49px;"><div id="outerdiv"><div><iframe src="'+arguments[4]+'" id="innerIframe" scrolling=no></iframe></div></div></div> ';
}