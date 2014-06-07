// ==UserScript==
// @name           ffs 2.0 asset calculator
// @namespace      LOL
// @include        http://app.ffs.likagames.com/users/show/*
// ==/UserScript==
//alert("allo");

delay1=3000;   // delay before start or the window never load.
setTimeout(AddButton,delay1);

function AddButton(){
	document.getElementsByClassName("headline")[0].innerHTML=
	document.getElementsByClassName("headline")[0].innerHTML+
	'<input id="greasemonkeyButton" type="button" value="Asset">';
	addButtonListener();
}

function addButtonListener(){
  var button = document.getElementById("greasemonkeyButton");
  button.addEventListener('click',start,true);
}

function start(){
	if(document.getElementsByClassName("money")){
		a=document.getElementsByClassName("money");
		player_value=delcommas(a[1].innerHTML);
		player_money=delcommas(a[2].innerHTML);
		b=document.getElementsByClassName("pets-item");
		sum_pet=0; chore100=0; chore75=0;
		for(i=0;i<b.length;i++){
			petvalue=delcommas(b[i].getElementsByClassName("money")[0].innerHTML);
			sum_pet +=petvalue;
			chore100+=Math.floor(100*Math.sqrt(petvalue));
			chore75+=Math.floor(75*Math.sqrt(petvalue))*2;
		}
		asset=player_money+sum_pet;
		ratio=(asset/player_value).toFixed(2);
		invested=(100*sum_pet/asset).toFixed(2);
		alert(
		"Asset calculator ffs 2.0\n\n"+
		"Total Asset: "+addcommas(asset)+"\n"+
		"Sum of pet: "+addcommas(sum_pet)+"\n\n"+
		"Ratio: "+addcommas(ratio)+"\n"+
		"Percent invested:"+addcommas(invested)+"\n\n"+
		"Work 100: "+addcommas(chore100)+"\n"+
		"Work 75: "+addcommas(chore75)
		);
	}
}
function delcommas(txt){return parseInt(txt.substring(1).replace(/,/g,''));}
function addcommas(num){
	var txt=String(num);
	var oRegEx=new RegExp('(-?[0-9]+)([0-9]{3})');
		
	while(oRegEx.test(txt))txt=txt.replace(oRegEx,'$1,$2');
	return txt;
}
