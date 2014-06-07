// ==UserScript==
// @name       Google Upgrade 
// @version    1.0
// @description  Google
// @include *//*.google.*/
// @copyright  WTFPL2
// ==/UserScript==
function google(){
var b = 2;
for(var i =0; document.getElementsByClassName('gbmtc')[i] && b>0;i = i+1){
	var ob = document.getElementsByClassName('gbmtc')[i];
	var lvist = document.getElementById('gbzc');
		if(ob.innerHTML.replace(/<\/?[^>]+(>|$)/g,'') != ''){
			var blio = document.createElement('blio');
			var ulrd;
			var data = ob.innerHTML;
			data = data.substring(data.indexOf("href=")+6);  
			data = data.substring(0,data.indexOf('"'));
			blio.innerHTML = '<a target="_blank" onclick="gbar.logger.il(1,{t:51});" class="gbzt" id="gb_51" href="'+ data  +'"><span class="gbtb2"></span><span class="gbts">'+ ob.innerHTML.replace(/<\/?[^>]+(>|$)/g,'') +'</span></a>';

			blio.className = 'gbt';
			lvist.appendChild(blio);
		}else{
			var flagb=true;
		}
		if(flagb){
			b=b-1;
		}
}

document.getElementById('gbztm').innerHTML='';
document.getElementById('gbd').innerHTML='';
}
document.onload='google();';