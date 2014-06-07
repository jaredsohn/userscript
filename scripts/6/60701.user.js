// ==UserScript==
// @name           gal6time
// @namespace      Maillor
// @description    proper time
// @include        http://hu.gal6.com/universe/galaxyforum/*
// ==/UserScript==



(function(){
b = document.getElementById("gal6time").innerHTML.split("&");
mosttick=parseInt(b[1].split("=")[1]);
mostminute=parseInt(b[2].split("=")[1].split(" ")[0].slice(0, -1));

for(i = 0; (a = document.getElementsByTagName("td")[i]); i++){
	if(a.className == " col4"){
		original = a.innerHTML;
		ora = a.innerHTML.split(":")[1];
		perc = a.innerHTML.split(":")[2];
			if (parseInt(ora.substring(1,1)) == 0) {
				ora=parseInt(ora.substr(1,ora.lenght-1));
			}
			if (parseInt(perc.substring(1,1)) == 0) {
				perc=parseInt(perc.substr(1,perc.lenght-1));
			}
			if (mostminute >= perc) {
				elteltora = mosttick-ora; 
				elteltperc = Math.abs(perc-mostminute);
			}
			else { ora++; 
				elteltora = parseInt(mosttick-ora); 
				elteltperc = Math.abs(60-perc+mostminute);
			}
			if (elteltora<0){
				elteltora++;
			}
			
			a.innerHTML= elteltora + " órája és " + elteltperc + " perce <br>" + original;
	}
}
})();

