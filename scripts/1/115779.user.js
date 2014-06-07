// ==UserScript==
// @name           Easy Account
// @description    Sayfalara kolayca giriş yapın!
// @include        *accounts.google.com*
// @include        *userscripts.org/login
// @include        *joinbigbang.co.cc:*
// @exclude        *chip.com.tr*
// @include        *facebook.com*
// @version        1.0
// ==/UserScript==

// Add sites to disable script on with @exclude

function init(){
	var aForms=document.forms;
	for(var i=0;i<aForms.length;i++){
		var blHasUserIdField=false;
		var blHasPasswordField=false;
		var aEls=aForms[i].elements;
		for(var j=0;j<aEls.length;j++){
			if(aEls[j].value && aEls[j].value.length!=0 && aEls[j].value.toLowerCase().indexOf("user")==-1 && blHasPasswordField==false && blHasUserIdField==false && aEls[j].type && aEls[j].type=="text"){
				blHasUserIdField=true;
				continue;
			}
			if(blHasPasswordField==false && blHasUserIdField==true && aEls[j].type && aEls[j].type=="password"){
				blHasPasswordField=true;
				continue;
			}
			if(aEls[j].value && aEls[j].value.length!=0 && blHasPasswordField==true && blHasUserIdField==true && aEls[j].type && aEls[j].type=="submit"){
				aEls[j].click();
				return;
			}
		}	
	}
}

setTimeout(init, 3000);