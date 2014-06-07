// ==UserScript==
// @name           Facebook MobWars Hitlist Helper
// @namespace      http://apps.facebook.com/mobwars/hitlist/*
// @description    Hitlist Helper
// @include http://apps.facebook.com/mobwars/hitlist/*
// @include http://apps.new.facebook.com/mobwars/hitlist/*
// @include http://apps.facebook.com/mobwars/hospital/*
// @include http://apps.new.facebook.com/mobwars/hospital/*
// ==/UserScript==

var reload=true;
var StaminaRechargeTime = 2*60*1000;

var MyCurrentStamina = document.getElementById("app8743457343_cur_recovery").innerHTML;
var MyCurrentHealth = document.getElementById("app8743457343_cur_health").innerHTML;
var MyMaxHealth = document.getElementById("app8743457343_cur_health_max").innerHTML;
var MyCurrentHealthPercent = (MyCurrentHealth / MyMaxHealth) * 100;
var MinHealthPercent = 45;

if(document.location.href.indexOf("hospital") > 0)
	MinHealthPercent = 60;

if(MyCurrentHealthPercent < MinHealthPercent)
{
	document.location = "http://apps.facebook.com/mobwars/hospital/do.php?action=heal";
}
else
{
	if(document.location == "http://apps.facebook.com/mobwars/hospital/")
		document.location = "http://apps.facebook.com/mobwars/hitlist/";
	else
	{
		if(MyCurrentStamina < 1)
			setTimeout("document.location = document.location;",StaminaRechargeTime);
		else
		{
			Array.forEach(document.getElementsByTagName("INPUT"),function(input){if (input.value=="attack" && document.getElementById("app8743457343_cur_recovery").innerHTML > 0) {input.click();reload=false;}});
			if (reload)
				document.location = "http://apps.facebook.com/mobwars/hitlist/";
		}
	}
}
