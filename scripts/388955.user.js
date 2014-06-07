// ==UserScript==
// @name         ==widgets==js==
// @version 3.6
// @namespace   
// @description    done2 use it for parsonal use in ur own risk
// ==/UserScript==widgets



	
function init_widget(params){
	document.getElementById("wd_id").innerHTML='<style>#outerdiv{background: '+arguments[6]+'; z-index: 5; width:'+arguments[0]+'px; height:'+arguments[1]+'px;  border:'+arguments[5]+'px solid #FFFF00;top:0px;left:0px;overflow:hidden;position:relative;}#innerIframe{position:absolute;top:'+arguments[2]+'px;left:'+arguments[3]+'px;width:1119px;height:1111px;}</style><link rel="stylesheet" href="my1.css"/><div style="left: 0px; top: 0px;"><div id="outerdiv"><div><iframe src="'+arguments[4]+'" id="innerIframe" scrolling=no></iframe></div></div></div> ';
 $("#wd_id").css({"height":""+arguments[1]+"px","width":""+arguments[0]+"px"});
 }