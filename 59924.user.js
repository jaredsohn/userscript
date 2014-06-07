// ==UserScript==
// @name          Facebook ZINGA & PLAYFISH Games Blocker 1.0
// @namespace     http://userscripts.org
// @description	  This User Script blocking games from zynga and playfish
// @include       http://apps.facebook.tld/onthefarm/*
// @include       http://apps.facebook.tld/inthemafia/*
// @include       http://apps.facebook.tld/texas_holdem/*
// @include       http://apps.facebook.tld/yoville/*
// @include       http://apps.facebook.tld/vampiresgame/*
// @include       http://apps.facebook.tld/cafeworld/*
// @include       http://apps.facebook.tld/coasterkingdom/*
// @include       http://apps.facebook.tld/streetracinggame/*
// @include       http://apps.facebook.tld/piratesrule/*
// @include       http://apps.facebook.tld/dragonwars/*
// @include       http://apps.facebook.tld/specialforces/*
// @include       http://apps.facebook.tld/fashionwarsgame/*
// @include       http://apps.facebook.tld/black_jack/*
// @include       http://apps.facebook.tld/onthefarm/*
// @include       http://apps.facebook.tld/scramblegame/*
// @include       http://apps.facebook.tld/wordtwist/*
// @include       http://apps.facebook.tld/pathwords/*
// @include       http://apps.facebook.tld/challengesudoku/*
// @include       http://apps.facebook.tld/petsociety/*
// @include       http://apps.facebook.tld/restaurantcity/*
// @include       http://apps.facebook.tld/countrystory/*
// @include       http://apps.facebook.tld/crazyplanets/*
// @include       http://apps.facebook.tld/quiztasticgame/*
// @include       http://apps.facebook.tld/geochallenge/*
// @include       http://apps.facebook.tld/bowlingbuddies/*
// @include       http://apps.facebook.tld/wordchallenge/*
// @include       http://apps.facebook.tld/minigolfparty/*
// @include       http://apps.facebook.tld/biggestbrain/*
// ==/UserScript==

	//creating new div
	var oDiv = document.createElement("div");
	oDiv.id="msg";
	oDiv.style.width="100%";
	oDiv.style.height="100%";
	oDiv.style.backgroundColor="#010478";
	oDiv.style.color="#ffffff";
	oDiv.style.textAlign="center";
	oDiv.style.fontSize="+20";
	oDiv.style.display="block";
	//Erase Body
	document.body.innerHTML ="";
	//Apending child
	document.body.appendChild(oDiv);
	//Adding MSG
	document.getElementById("msg").innerHTML="This Game Is So Stupid!! Don't Play It!";
	//Redirecting...
	document.location="http://facebook.com/home.php?";

