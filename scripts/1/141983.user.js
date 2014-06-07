// ==UserScript==
// @name           Asmandez Resource and Army Send
// @namespace      gOx
// @include        http://s9.asmandez.ir/*
// @include		   http://s9.asmandez.ir/planet/
// @exclude        http://s9.asmandez.ir/login/
// ==/UserScript==

//---------------اطلاعات مربوط به خودم
  demongox = document.createElement('div');
  demongox.style.position = 'absolute';
  //demongox.style.align = 'right';
  demongox.style.top = '10px';
  demongox.style.left = '10px';
  demongox.style.padding = '2px';
  demongox.style.color = '#000';
  demongox.style.backgroundColor = '#fff';
  demongox.innerHTML = 'Powered by demongox';
  body = document.getElementsByTagName('body')[0];
  body.appendChild(demongox);
  //------------------
  
  //--------------
  demongox = document.createElement('div');
  demongox.style.position = 'absolute';
  demongox.style.top = '200px';
  demongox.style.left = '10px';
  demongox.style.padding = '2px';
  demongox.style.color = '#000';
  demongox.style.backgroundColor = '#fff';
  demongox.innerHTML = 'A.R.and.A.S enabled';
  body = document.getElementsByTagName('body')[0];
  body.appendChild(demongox);
  //------------------
  
  
function createSpan(id,PlanetLists)
    {
        var spanTag = document.createElement("span");
        spanTag.style.color = '#ffffff';
        spanTag.id = id;		
		PlanetLists.appendChild(spanTag);		
    }

function createResourceAnchor(targetID,link){
	var mydiv = document.getElementById(targetID);
	var aTag = document.createElement('a');
	aTag.setAttribute('href',link);
	//aTag.innerHTML =  '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAB3RJTUUH3AcVFQMn6AWKegAAASVJREFUeJwlzEtLAlEUAOBzzp2r44sSBxVChbKgB0FEEBq1iKBl5Dpo1T9rE/QPgqDHMlpJmwitMDRLe4zOOPee06LvB3zIzAAAAJENLp9On78eVgpbm6UDAQZAR0QEBBFDO3r3WwAyGHdYGEAAwCEkQACAmHK10n7EU/FpReq/dCY2aPauRtFwtbATVynmflJn+n77/u1iNruGt63zZu+Gxc5kyqEJBsFwwVt6/W5/jnu5RNHJJoqaYgLS9buI4Cjd+XkJTeCqpKvTtJiv1SsNYyeERKBEbGDGIhxz3Hq5QcZG897G7tyR4dCKJVTGRlrF9xdO8ukKMjOLVeQ8ftxdt85YJKkze9VjL1WybAkACJXhqJpbXy5s/04GtfKhlyoZGxHSH74WjK/gDHunAAAAAElFTkSuQmCC" alt="ارسال منابع" title="ارسال منابع" width="25" height = "25" />';
	aTag.innerHTML =  '<img src="http://s9.asmandez.ir/application/views/base/images/transfer.png"  alt="ارسال منابع" title="ارسال منابع" width="15" heigh="15" />';
	mydiv.appendChild(aTag);
}
function createArmyAnchor(targetID,link){
	var mydiv = document.getElementById(targetID);
	var aTag = document.createElement('a');
	aTag.setAttribute('href',link);
	//aTag.innerHTML =  '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAB3RJTUUH3AcVFQM2grWqiAAAAShJREFUeJwl0D8vQ1EUAPBzzzvvveoflRddaEo6iURiNWHQND6BpQODRWKySDrwKUQwSCQMhM8gJjFUE0MXU2mkrf7VuL33nmPw+wg/YGZ2zM6Z0ah5cNhYWWudnjMzW8vMKCLiLIhwp2srVc/3ufomzoGIMJNCVIgA4IUh+cSOw4mYIlIACoBY6/7dg6p/JDYLmE65Th2jpKm8Dm9uw+KGapyc8e09jcc0kxFr3PeIshkYG1t7N8tLFMzndGYauz3b6oECFfruswlEOJfzsrMYFQuJ3R0TBsojQAJhCAPQ2iQTU9slZGMm11dT+3vOWkQFAjD84SiKjsuxfF4xsziHRIPHp8HFpdduq3g8fVQOFhfEWvhvcVqLyNfVdW2r1H9+ERH7q5n5D7q7ov54mOSMAAAAAElFTkSuQmCC" alt="ارسال نیروی پشتیبان" title="ارسال نیروی پشتیبان" width="25" height = "25"/>';
	aTag.innerHTML =  '<img src="http://s9.asmandez.ir/application/views/base/images/red_arrow.png"  alt="ارسال نیروی پشتیبان" title="ارسال نیروی پشتیبان" width="10" heigh="10" />';
	mydiv.appendChild(aTag);
}

//لیست سیاره ها	
var PlanetLists = document.getElementsByClassName('planet');  
var thisPlanet = Array.filter( PlanetLists, function(elem){  
  return (document.getElementsByTagName("a"));  
}); 
for (var i=0; thisPlanet.length ;i++){
thisPlanet[i] = thisPlanet[i].innerHTML;
thisPlanet[i] = thisPlanet[i].substring(37,42);
thisPlanet[i] = thisPlanet[i].replace(/[A-z`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
var resourceLink 	= "http://s9.asmandez.ir/transport/"+thisPlanet[i];
var armyLink 	 	= "http://s9.asmandez.ir/support/"+thisPlanet[i];

createSpan(thisPlanet[i],PlanetLists[i]);
createResourceAnchor(thisPlanet[i],resourceLink);
createArmyAnchor(thisPlanet[i],armyLink);
}

