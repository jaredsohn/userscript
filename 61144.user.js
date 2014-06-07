// ==UserScript==
// @name No More YTMND
// @description    Blocks annoying YTMND pages
// @namespace      http://s13.zetaboards.com/TheExodus/index/
// @version        0.1.2
// @include       http://*ytmnd.com*
// @include http://*ProlapseMan.com*
// @include http://*WalkTheDinosaur.com*
// @include http://*TheMacUser.org*
// @include http://*LolTrain.com*
// @include http://*FruitLauncher.com*
// @include http://*OctopusGirl.com*
// @include http://*MilkFountain.com*
// @include http://*Homewares.org*
// @include http://*JapScat.org*
// @include http://*DadParty.com*
// @include http://*Hai2U.com*
// @include http://*BottleGuy.com*
// @include http://*Turdgasm.com*
// @include http://*VomitGirl.org*
// @include http://*1Priest1Nun.com*
// @include http://*BowlGirl.com*
// @include http://*EelSoup.net*
// @include http://*GoatseGirl.*
// @include http://*ClownSong.*
// @include http://*PhoneJapan.*
// @include http://*WormGush.*
// @include http://*WhipCrack.*
// @include http://*FunnelChair.*
// @include http://*LOLHello.*
// @include http://*MudMonster.*
// @include http://*NutAbuse.*
// @include http://*SuckDude.*
// @include http://*painolympics.*
// @include http://*TubGirl.*
// @include http://*LemonParty.*
// @include http://*1man1jar.*
// @include http://*Meatspin.*
// @include http://*thehomo.*
// @include http://*Selfpwn.*
// @include http://*Goatse.*
// @include http://www.youtube.com/watch?v=oHg5SJYRHA0*
// @include http://www.yougotrickrolled.com/*
// @include http://www.smouch.net/*

//@include http://www.bagslap.com*
//@include http://www.mudfall.com*
//@include http://www.youaresogay.com*
//@include http://www.lemonparty.org*
//@include http://www.bottleguy.com*
//@include http://www.lastmeasure.com*
//@include http://smoke.rotten.com/bird*
//@include http://www.blacksnake.com*
//@include http://www.thepounder.com*
//@include http://www.zentastic.com/videos/bmevideo-3.wmv*
//@include http://cyberscat.com/*
//@include http://www.Brad.com*
//@include http://dontwatch.us/*
//@include http://ourspace.be*
//@include http://denial.be*
//@include http://www.fnord.org/gummi/kids_in_sandbox.mpg*
//@include http://www.detroithardcore.com/*
//@include http://www.mongface.com*
//@include http://www.populationpaste.com/*
//@include http://www.phreak.org/ana/skinny.html
//@include http://www.Tubboy.net*
//@include http://www.Supermodelsfart.com*
//@include http://www.Fuck.Org*
//@include http://www.jiztini.com*
//@include http://www.Shitpassion.com*
//@include http://www.cadaver.org/head-th.jpg*
//@include http://www.Exet.nu*
//@include http://www.iheartu.tk*
//@include http://www.goregasm.com*
//@include http://www.dr47.com*

// ==/UserScript==


(function () {
	var block = (document.getElementsByTagName("body")[0]);
	block.setAttribute('style', 'display:none!important');
})();

check(document.title)

function check(text)
{
	if (text.match(/rick/i)) 
	{
		if (text.match(/roll/i) || text.match(/astley/i)) 
		{
			window.stop()
		}
	}
}