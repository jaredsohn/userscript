// ==UserScript==
// @name           Gaia Booty Grab Auto Re-Sizer
// @description    Re-sizes the aquarium to reduce lag thus allowing higher scores.
// @include        http://www.gaiaonline.com/tank/*?*
// @include        http://www.gaiaonline.com/aquariumViewer/FishTankViewer.html?*
// ==/UserScript==

//settings
var StartSize = 150; //sets how tall it is to start with (in pixels).
var is = 25; //sets the buttons increase and decrease sizes in pixles.
//function
function resize(fx){
	var FishTank = document.getElementById('FishTank');
	var TnkHt = document.getElementById('TnkHt');
	var height = Number(FishTank.style.height.replace('px',''));
	var NewHeight = height+fx*is;
	if (NewHeight<0){NewHeight=0;}
	FishTank.style.height=NewHeight+'px';
	TnkHt.value=NewHeight;
}
if(document.body.offsetWidth>200){//avoid market preview
	//the following line makes the comment captcha stuff less blinding if you dont like it you can delete it.
	GM_addStyle('html{background-color:black;}#add_comment,#comment_box{text-align:center;}#recaptcha_image{opacity:.65}#recaptcha_response_field,#comment_body{background-color:gray !important;color:white}');

	var FishTank = document.getElementById('FishTank');
	if(FishTank){
		//set default styles
		FishTank.width='100%';
		FishTank.style.height=StartSize+'px';
		FishTank.removeAttribute('height');

		//set notification if flash can't find mouse
		FishTank.setAttribute('onmouseover','document.getElementById("alert").textContent=""');
		FishTank.setAttribute('onmouseout','document.getElementById("alert").textContent="Flash can\'t find mouse!!!"');

		//insert input fields
		var NewDiv = document.createElement('div');
		NewDiv.setAttribute('style','font-size:15px;width:100%;height:23px');
		NewDiv.innerHTML='<span style="font-size:12px;float:left;margin-right:68px;"><input id="plus" value="+'+is+' pixles" onmouseover="this.focus()" type="button"/><input id="minus" value="-'+is+' pixles" onmouseover="this.focus()" type="button"/></span><span style="color: white;float:right;">Aquarium height is <input id="TnkHt" onmouseover="this.select();this.focus();" title="Press \'Enter\' to apply changes." onkeypress="if (event.which==13)document.getElementById(\'FishTank\').style.height=this.value+\'px\'" style="width:30px;position:relative;top:1px;" value="'+StartSize+'" type="text"> <span>pixels.</span></span><center><span id="alert" style="color: red;">Flash can\'t find mouse!!!</span></center>';
		FishTank.parentNode.insertBefore(NewDiv,FishTank);

		//add event listener
		document.getElementById("plus").addEventListener('click', function(){ resize(1); }, false);
		document.getElementById("minus").addEventListener('click', function(){ resize(-1); }, false);
	}
	else{
		var input=document.createElement('input');
		input.value="Submit Captcha";
		input.type="submit";
		document.getElementById('tank_captcha').appendChild(input);
	}
}