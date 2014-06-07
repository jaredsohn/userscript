// ==UserScript==
// @name           izigfd
// @namespace      http://inria.fr/
// @include        https://portail-izi.inria.fr/tiki-g-run_activity.php*
// ==/UserScript==

function addEvtListnrs() {
	for(var a=1;a<20;a++) {
		var obj=document.getElementById('f_date_d:'+a+':');
		if(obj) {
			obj.addEventListener('keyup',function() { var newid=this.id.replace("_d:","_a:"); document.getElementById(newid).value=this.value; },false);
			document.getElementById('changeTrajet:'+a+':').addEventListener('click',addEvtListnrs,false);
		}
	}
	var inputs=document.getElementsByTagName("input");
	for(var i=0;i<inputs.length;i++) {
		inputs[i].addEventListener('click',addEvtListnrs,false);
	}
}

addEvtListnrs();

