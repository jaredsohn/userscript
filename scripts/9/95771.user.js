// ==UserScript==
// @name           Sell Item Helper
// @namespace      http://userscripts.org/users/62850
// @include        http://*.gaiaonline.com/marketplace/mystore/sell/?item_id=*&item_param=*&item_param2=*
// ==/UserScript==
function addCommas(nStr){//http://www.mredkj.com/javascript/nfbasic.html
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}
function warn(ele,LMP,sellVal){
	if (!isNaN(sellVal) && LMP>0){
		if(sellVal<LMP-LMP*.25){
			if (sellVal<=LMP/2){
				ele.textContent=addCommas(sellVal)+" yo! that low!";
			}
			else{
				ele.textContent=addCommas(sellVal)+" yo! that low!";
			}
		}
		else if(sellVal>LMP+LMP*.25){
			if (sellVal>=LMP*2){
				ele.textContent=addCommas(sellVal)+" yo! that high!";
			}
			else{
				ele.textContent=addCommas(sellVal)+" yo! that high!";
			}
		}
		else{
			ele.textContent=addCommas(sellVal);
		}
	}
	else if (LMP>0){
		ele.textContent="That is not a number!";
	}
	else{
		ele.textContent=addCommas(sellVal)+" Insufficient Data :(";
	}
	return;
}
var ITL=document.getElementById('transactionWindowInfoTopLeft').getElementsByTagName('strong')
if (ITL[1].textContent=='Gaia Gold'||ITL[1].textContent=='Tickets') {
	var num=2;
}
else{
	var num=1;
}
var x=escape(ITL[num].nextSibling.textContent).replace(/(%09|%0A|%20|%2C)/g,'');
var LMP=Number(x.slice(0,x.length-1));
var ele=document.getElementsByClassName('disabletarget_buy')[0].parentNode;
var amt=document.getElementsByName('item_param');
if(amt[0].offsetHeight>2){
	var Nele=document.createElement('span');
	Nele.id='warning';
	Nele.setAttribute('style','font-weight:bold;color:red');
	Nele.textContent=addCommas(LMP*amt[0].value);
	ele.appendChild(Nele);
	ele.childNodes[1].value=LMP*amt[0].value;
	ele.childNodes[1].addEventListener('keyup',function(){warn(Nele,Number(LMP*amt[0].value),Number(this.value))},false);
	amt[0].addEventListener('keyup',function(){
		ele.childNodes[1].value=LMP*this.value;
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent("keyup", true, true);
		ele.childNodes[1].dispatchEvent(evt);
	},false);
}
else{
	var Nele=document.createElement('span');
	Nele.id='warning';
	Nele.setAttribute('style','font-weight:bold;color:red');
	Nele.textContent=addCommas(LMP-1);
	ele.appendChild(Nele);
	ele.childNodes[1].value=LMP-877;
	ele.childNodes[1].addEventListener('keyup',function(){warn(Nele,LMP,Number(this.value))},false);
}
//This is for compatibility with the tektek toolbar.
window.addEventListener('load',function(){
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent("keyup", true, true);
	ele.childNodes[1].dispatchEvent(evt);
},false);