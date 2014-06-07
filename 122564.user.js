// ==UserScript==
// @name           autoSelAll
// @namespace      ktuan
// @include        */admin.php?action=members&operation=ban*
// ==/UserScript==
var fm = document.getElementById("cpform");
var inputs = fm.getElementsByTagName("input");
function ck(elem,namee,val){
	if(elem.name==namee){
		if(elem.value==val){
			elem.setAttribute("checked","checked");	
		}
	}
}

for(var i=0; i<inputs.length; i++){
	ck(inputs[i],"bannew","visit");
	ck(inputs[i],"chkall","1");
	//ck(inputs[i],"delpost","1");
	//ck(inputs[i],"deldoing","1");
	//ck(inputs[i],"delblog","1");
	//ck(inputs[i],"delalbum","1");
	//ck(inputs[i],"delshare","1");
	//ck(inputs[i],"delcomment","1");
}

document.getElementById("submit_bansubmit").click();