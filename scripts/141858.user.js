// ==UserScript==
// @name        Steamgifts - Thanks for Skyrim
// @namespace   http://steamcommunity.com/id/mckack
// @description Auto-fill the comment field of giveaways with random and adaptive "thanks" to show your lazy appreciation.
// @include     http://www.steamgifts.com/giveaway/*
// @match       http://www.steamgifts.com/giveaway/*
// @version     1.7.4
// ==/UserScript==

// Set us up some functions and variables
function chr(charCode){
	return String.fromCharCode(charCode)
}

function rand(maxNum){
	return Math.floor(Math.random()*maxNum)
}

function checkType(gameName,lookFor){
	if(gameName.toLowerCase().indexOf(lookFor.toLowerCase()) == -1){
  		return "0"
	} else {
		return "1"
	}
}

function capStr(capText){
    return capText.charAt(0).toUpperCase() + capText.slice(1);
}

function decapStr(decapText){
    return decapText.charAt(0).toLowerCase() + decapText.slice(1);
}

function daCompment(preFix){
	if (preFix != null){
		var daCompments = ["an awesome","a cool","a nice","a great","a superb","an excellent","a neat","a neato","a wonderful","a wicked","an interesting","an incredible"]
	} else {
		var daCompments = ["awesome","cool","nice","great","superb","excellent","neat","neato","wonderful","wicked","interesting","incredible"]
	}
	return daCompments[rand(daCompments.length)]
}

var isGiveaway = null
var isEligible = null
var isIdentified = null
var giftName = null
var giftType = null
var giftCreator = null
var buttonLabel = null
var thankEnds = [" you","s"]
var thankEnd = thankEnds[rand(thankEnds.length)]
var endIngs = ["",".",".","!"]
var endIng = endIngs[rand(endIngs.length)]
var daEmotes = [":-)",";-)",":)",";)","=)",":]",";]","=]",":D",";D","=D",":3",";3","=3","^^","^_^"]
var daEmote = daEmotes[rand(daEmotes.length)]
var daChances = ["chance","opportunity"]
var daChance = daChances[rand(daChances.length)]
var daBunches = ["a bunch","a lot","a ton"]
var daBunch = daBunches[rand(daBunches.length)]
// I believe the check below shouldn't be necessary as we only match giveaway URL, but hey, let's be sure!
if (window.location.pathname.substring(0, 10) == '/giveaway/'){ isGiveaway = 1 }

// Check if you are eligible to enter in the first place
if (isGiveaway){
	buttonLabel = document.querySelector(".submit_entry")
	if (buttonLabel != null){
		if (buttonLabel.textContent.substring(0, 13) == 'Enter to Win!'){ isEligible = 1 }
	}
}

// If eligible, fetch game name, and gift creator's name (hey, it's not like I'm a soulless script!)
if ((isGiveaway) & (isEligible)){
	giftName = document.querySelector(".title")
	giftName = giftName.textContent

	// Determine what type of gift it is before stripping stuff away
	// Kind of flakey but should look legit 98.37 times out of a 100
	if (!isIdentified){
		if 		(checkType(giftName,"DLC") == 1)						{ giftType = "DLC"; isIdentified = 1 }
		else if (checkType(giftName,"Pack") == 1)						{ giftType = "pack"; isIdentified = 2 }
		else if (checkType(giftName,"Bundle") == 1)						{ giftType = "bundle"; isIdentified = 2 }
		else if (checkType(giftName,"Indie Gala") == 1)					{ giftType = "bundle"; isIdentified = 2 }
		else if (checkType(giftName,"Collection") == 1)					{ giftType = "collection"; isIdentified = 2 }
		else if (checkType(giftName,"Season Pass") == 1)				{ giftType = "pass"; isIdentified = 1 }
		else if (checkType(giftName," Complete") == 1)					{ giftType = "collection"; isIdentified = 3 }
		else if (checkType(giftName,"Franchise") == 1)					{ giftType = "franchise"; isIdentified = 2 }
		else if (checkType(giftName,"Geneforge Saga") == 1)				{ giftType = "series"; isIdentified = 2 }
		else if (checkType(giftName,"Just Cause 2: ") == 1)				{ giftType = "DLC"; isIdentified = 2 }
		else if (checkType(giftName,"Magicka: ") == 1)					{ giftType = "DLC"; isIdentified = 1 }
		else if (checkType(giftName,"Saints Row: The Third - ") == 1)	{ giftType = "DLC"; isIdentified = 2 }
		else if (checkType(giftName,"Darksiders II - ") == 1)			{ giftType = "DLC"; isIdentified = 1 }
		else															{ giftType = "game"; isIdentified = 1 }
	}

	// Identification value also tetermines if a prefix/suffix should be applied ("1" is ignored)
	// Example for "2": "The Game Weapons Pack seems like a cool pack!" instead of "Game Weapons Pack seems like a cool pack!"
	// Example for "3": "The Game Complete collection seems like a cool collection!" instead of "The Game Complete seems like a cool collection!"
	if (isIdentified == 2){
		giftName = "the " + giftName
	} else if (isIdentified == 3){
		giftName = "the " + giftName + " " + giftType
	}

	// Strip away giveaway categories, types and other mumbo jumbo
	giftName = giftName.replace("Group Contributor: ","")
	giftName = giftName.replace("Contributor: ","")
	giftName = giftName.replace("Developer: ","")
	giftName = giftName.replace("Featured: ","")
	giftName = giftName.replace("Group: ","")
	giftName = giftName.replace("Private: "," ")
	giftName = giftName.replace(" DLC","")
	giftName = giftName.replace(": The Game","")
	giftName = giftName.replace(":","")
	giftName = giftName.replace(/\s\(.*\)/,"")

	// Fetch usernames
	giftCreator = document.querySelector('.hosted_by a')
	giftCreator = giftCreator.textContent
	meBaby = document.querySelector('#comment_form .author_name a')
	if (meBaby != null){
		meBaby = meBaby.textContent
	} else {
		meBaby = "Yours truly"
	}

	// Personalize well-known gifters (open to suggestions for additions. No Wormy allowed!)
	if (giftCreator == "MoneyHypeMike"){
		var mikeNames = ["MoneyHypeMike","Mike","Mikey"]
		giftCreator = mikeNames[rand(mikeNames.length)]
	} else if (giftCreator == "Rinarin"){
		var rinaNames = ["Rinarin","Lina","Lina-chan","Lina chan","Rina","Rina-chan","Rina chan","Rin"]
		giftCreator = rinaNames[rand(rinaNames.length)]
	} else if (giftCreator == "Crossbourne"){
		var crossNames = ["Crossbourne","Cross","David"]
		giftCreator = crossNames[rand(crossNames.length)]
	} else if (giftCreator == "SuperFluffyKitty"){
		var sfkittyNames = ["SuperFluffyKitty","Fluffy","Fluffy :3","Kitty","Fluffyneko","Fluffynyan","Fluffy-chan","Fluffy chan","Kitty-chan","Kitty chan"]
		giftCreator = sfkittyNames[rand(sfkittyNames.length)]
	} else if (giftCreator == "Kuroi1337"){
		var kuroiNames = ["Kuroi1337","Kuroi","Kuroi-Sama","Kuroi Sama","Kuroisama","Master Kuroi","Dark Master","Black Master"]
		giftCreator = kuroiNames[rand(kuroiNames.length)]
	}
}

// Random comment
function insertCommentR(){
	var thanksMessages = [
	chr(65399) + chr(65408) + chr(9473) + chr(9473) + chr(9473) + chr(9473) + chr(40) + chr(65439) + chr(1044) + chr(65439) + chr(59) + chr(41) + chr(9473) + chr(9473) + chr(9473) + chr(9473) + chr(65281),
	"# <3",
	"# <3 " + giftCreator,
	"# <3 " + giftCreator + endIng,
	"# :-)",
	"# " + chr(9824) + " Thank" + thankEnd + endIng,
	"# " + chr(9827) + " Thank" + thankEnd + endIng,
	"# " + chr(9829) + " Thank" + thankEnd + endIng,
	"# " + chr(9830) + " Thank" + thankEnd + endIng,
	"# Thank" + thankEnd + " " + chr(9824),
	"# Thank" + thankEnd + " " + chr(9827),
	"# Thank" + thankEnd + " " + chr(9829),
	"# Thank" + thankEnd + " " + chr(9830),
	"# Thank" + thankEnd + "! " + daEmote,
	"# Thank" + thankEnd + endIng,
	"# why thank you " + giftCreator.toLowerCase() + " " + daEmote,
	"# [<3 " + giftCreator + "](http://i.imgur.com/6oSvA.jpg)",
	"*Want this! ... Thank-you for this " + daCompment().toUpperCase() + " " + giftType + " giveaway" + endIng + "*",
	"Another generic thank you comment " + daEmote,
	"Amazingly awesome, thanks" + endIng,
	"Awesomeness",
	"Big thanks to " + giftCreator + ". This is " + daCompment(1) + " " + giftType + " " + daEmote,
	"Cheers" + endIng,
	"Cheers" + endIng + " " + daEmote,
	"cheers mate",
	"Choo choo, thank you" + endIng,
	"Danke" + endIng,
	"Danke" + endIng + " " + daEmote,
	"Danke schon" + endIng,
	"Danke schoen" + endIng,
	"gl and thnx " + daEmote,
	"Grateful for the " + daChance + " to win this" + endIng,
	"Grateful for the " + daChance + endIng,
	"Gratitude for the " + daChance + endIng,
	"Gracias",
	"Holy smokes, cheers for this" + endIng,
	"Hope a god of randomness will choose me...  \n  \nAnyway thank you for chance.",
	"Appreciate it, thank" + thankEnd + endIng,
	"Appreciate the " + daChance + " to win this" + endIng,
	"Appreciate the " + daChance + endIng,
	"Hope I win this, thank" + thankEnd + endIng,
	"I'll give it a shot, thank" + thankEnd + endIng,
	"I want the " + giftType + " so badly T_T Thank" + thankEnd + " for the giveaway" + endIng,
	"Like-a-baws" + endIng,
	"Looks " + daCompment() + ", thank" + thankEnd + endIng,
	"Looks " + daCompment() + ", I wonder how I missed this one coming out" + endIng,
	"Looks " + daCompment() + ", missed this one" + endIng,
	"Looks like " + daCompment(1) + " " + giftType + endIng,
	"Looks like " + daCompment(1) + " " + giftType + " and I don't have it" + endIng,
	"Looks like " + daCompment(1) + " " + giftType + " and I don't have it. Thank you " + giftCreator + endIng,
	"Many thanks for this " + daChance + endIng,
	"Many thanks" + endIng,
	"Many Thanks" + endIng,
	"many thanks~ <3",
	"Many thankyous" + endIng,
	"Me likey" + endIng,
	"Me likey! Thank" + thankEnd + endIng,
	"Merci" + endIng,
	"Much appreciated" + endIng,
	"Naisu wan" + endIng,
	"niiiiice <3 thank" + thankEnd + " " + daBunch + endIng,
	"Not bad at all" + endIng,
	"Not too shabby, thank" + thankEnd + endIng,
	"now this is just " + daCompment() + " thanks for putting it up " + daEmote,
	"Ooh Ive been wanting this" + endIng,
	"pls pick mee " + daEmote,
	"Seems " + daCompment() + ", thank" + thankEnd + endIng,
	"Seems " + daCompment() + ", I wonder how I missed this one coming out" + endIng,
	"Seems " + daCompment() + ", missed this one" + endIng,
	"Seems like " + daCompment(1) + " " + giftType + endIng,
	"Seems like " + daCompment(1) + " " + giftType + " and I don't have it" + endIng,
	"Seems like " + daCompment(1) + " " + giftType + " and I don't have it. Thank you " + giftCreator + endIng,
	"SEXYTIMES",
	"Such a perfect " + giftType + "! Thanks for the lovely giveaway! xx",
	"Sweet" + endIng,
	"sweet gibs bro, thank" + endIng,
	"Tank" + thankEnd + endIng,
	"Thamks " + daEmote,
	"Thank ya" + endIng,
	"Thank you kindly" + endIng,
	"Thanks-A-Many!",
	"Thank" + thankEnd + endIng,
	"Thank" + thankEnd + " " + chr(9829) + "~~",
	"Thank" + thankEnd + " !",
	"Thank" + thankEnd + " !!",
	"Thank" + thankEnd + " **" + giftCreator + "**" + endIng,
	"Thank" + thankEnd + " " + daEmote,
	"Thank" + thankEnd + " and good luck to all" + endIng,
	"Thank" + thankEnd + " and good luck to everyone" + endIng,
	"Thank" + thankEnd + " for " + giftName + "rim" + endIng + " " + daEmote,
	"Thank" + thankEnd + " for " + giftName + "rim" + endIng,
	"Thank" + thankEnd + " for " + giftName + endIng,
	"Thank" + thankEnd + " for adding this giveaway" + endIng,
	"Thank" + thankEnd + " for being awesome " + giftCreator + endIng,
	"Thank" + thankEnd + " for being awesome" + endIng,
	"Thank" + thankEnd + " for contribootin' " + giftCreator + endIng,
	"Thank" + thankEnd + " for doing this" + endIng,
	"Thank" + thankEnd + " for giving this " + giftType + " away" + endIng,
	"Thank" + thankEnd + " for giving this away" + endIng,
	"Thank" + thankEnd + " for giving this away" +endIng,
	"Thank" + thankEnd + " for making the giveaway " + daEmote,
	"Thank" + thankEnd + " for making this giveaway " + daEmote,
	"Thank" + thankEnd + " for putting this " + giftType + " up for grabs" + endIng,
	"Thank" + thankEnd + " for putting this " + giftType + " up" + endIng,
	"Thank" + thankEnd + " for putting this up for grabs" + endIng,
	"Thank" + thankEnd + " for putting this up" + endIng,
	"Thank" + thankEnd + " for sharing" + endIng,
	"Thank" + thankEnd + " for sharing this " + giftType + endIng,
	"Thank" + thankEnd + " for sharing this" + endIng,
	"Thank" + thankEnd + " for the great " + daChance + endIng,
	"Thank" + thankEnd + " for the great " + giftType + endIng,
	"Thank" + thankEnd + " for the " + giftType,
	"Thank" + thankEnd + " for the " + giftType + " !!! <3",
	"Thank" + thankEnd + " for the " + giftType + " contribution" + endIng,
	"Thank" + thankEnd + " for the " + giftType + " giveaway" + endIng,
	"Thank" + thankEnd + " for the " + daChance + " at " + giftName + endIng,
	"Thank" + thankEnd + " for the " + daChance + " at this" + endIng,
	"Thank" + thankEnd + " for the " + daChance + " at this " + daEmote,
	"Thank" + thankEnd + " for the " + daChance + " to win " + giftName + ", " + giftCreator + endIng,
	"Thank" + thankEnd + " for the " + daChance + " to win " + giftName + endIng,
	"Thank" + thankEnd + " for the " + daChance + " to win this " + giftType + endIng,
	"Thank" + thankEnd + " for the " + daChance + endIng,
	"Thank" + thankEnd + " for the " + daChance + ", " + giftCreator + endIng,
	"Thank" + thankEnd + " for the " + daChance + ", " + giftCreator,
	"Thank" + thankEnd + " for the contribution " + giftCreator + endIng,
	"Thank" + thankEnd + " for the contribution" + endIng,
	"Thank" + thankEnd + " for the giveaway" + endIng,
	"Thank" + thankEnd + " for the giveaway, " + giftCreator + endIng,
	"thank" + thankEnd + " for the giveaway and good luck to everyone " + daEmote,
	"Thank" + thankEnd + " for the luck" + endIng,
	"Thank" + thankEnd + " for this awesome " + daChance + " for the community" + endIng,
	"Thank" + thankEnd + " for this " + daCompment() + " " + giftType + " contribution" + endIng,
	"Thank" + thankEnd + " for this " + daCompment() + " " + giftType + " gift" + endIng,
	"Thank" + thankEnd + " for this " + daCompment() + " " + giftType + " giveaway" + endIng,
	"Thank" + thankEnd + " for this " + daCompment() + " contribution" + endIng,
	"Thank" + thankEnd + " for this " + daCompment() + " gift" + daEmote,
	"Thank" + thankEnd + " for this " + daCompment() + " giveaway" + endIng,
	"Thank" + thankEnd + " for this " + daCompment() + " " + daChance + endIng,
	"Thank" + thankEnd + " for this " + daCompment() + " " + daChance + ", " + giftCreator + endIng,
	"Thank" + thankEnd + " for this " + giftType + " giveaway" + endIng,
	"Thank" + thankEnd + " for this " + daChance + endIng,
	"Thank" + thankEnd + " for this giveaway" + endIng,
	"Thank" + thankEnd + " for this" + endIng,
	"Thank" + thankEnd + " for throwing this up as a giveaway" + endIng,
	"Thank" + thankEnd + " for your " + giftType + " giveaway" + endIng,
	"Thank" + thankEnd + " for your generosity" + endIng,
	"Thank" + thankEnd + " for your generosity" + endIng + " " + daEmote,
	"Thank" + thankEnd + " for your giveaway" + endIng,
	"Thank" + thankEnd + " good sir/madam" + endIng,
	"Thank" + thankEnd + " kind sir/madam" + endIng,
	"Thank" + thankEnd + " indeed" + endIng,
	"Thank" + thankEnd + " so much for this" + endIng,
	"Thank" + thankEnd + " so much for the " + daChance + endIng,
	"Thank" + thankEnd + " so much" + endIng,
	"Thank" + thankEnd + " so much" + endIng + " " + daEmote,
	"Thank" + thankEnd + " very much and good luck to all" + endIng,
	"Thank" + thankEnd + " very much for this" + endIng,
	"Thank" + thankEnd + " VERY much for your giveaway" + endIng,
	"Thank" + thankEnd + " very much good sir/madam" + endIng,
	"Thank" + thankEnd + " very much kind sir/madam" + endIng,
	"Thank" + thankEnd + " very much! " + daEmote,
	"Thank" + thankEnd + " very much" + endIng,
	"Thank" + thankEnd + " very much, "+ giftCreator + "! " + daEmote,
	"Thank" + thankEnd + " very, very much! It's " + daCompment(1) + " " + giftType + endIng,
	"Thank" + thankEnd + " so very, very much for a shot at this " + daCompment() + " " + giftType + ". I really do appreciate it! **<3**",
	"Thank" + thankEnd + "! " + capStr(daCompment()) + " giveaway" + endIng,
	"Thank" + thankEnd + "! " + daEmote,
	"Thank" + thankEnd + "! Appreciate the giveaway" + endIng,
	"Thank" + thankEnd + "! Good luck to everyone else" + endIng,
	"Thank" + thankEnd + "! Good luck to everyone" + endIng,
	"Thank" + thankEnd + ", thats pretty generous" + endIng + " " + daEmote,
	"Thank" + thankEnd + "! This is very generous of you" + endIng,
	"Thank" + thankEnd + "! This is very generous of you, " + giftCreator + endIng,
	"Thank" + thankEnd + "! This is very generous" + endIng,
	"Thank" + thankEnd + "! Very generous of you" + endIng,
	"Thank" + thankEnd + "! Very generous of you, " + giftCreator + endIng,
	"Thank" + thankEnd + ", **" + giftCreator + "**" + endIng,
	"Thank" + thankEnd + ", " + giftCreator + " for the " + daChance + " to win " + giftName + endIng,
	"Thank" + thankEnd + ", " + giftCreator + " for the " + daChance + " to win this " + giftType + endIng,
	"Thank" + thankEnd + ", " + giftCreator + " for the " + daChance + "!",
	"Thank" + thankEnd + ", " + giftCreator + "! " + capStr(daCompment()) + " " + giftType + endIng,
	"Thank" + thankEnd + ", " + giftCreator + "! " + capStr(daCompment()) + " giveaway" + endIng,
	"Thank" + thankEnd + ", " + giftCreator + "! This is very generous of you" + endIng,
	"Thank" + thankEnd + ", " + giftCreator + "! This is very generous" + endIng,
	"Thank" + thankEnd + ", " + giftCreator + ", " + giftName + " looks like " + daCompment(1) + " " + giftType + endIng,
	"Thank" + thankEnd + ", " + giftCreator + ", " + giftName + " seems like " + daCompment(1) + " " + giftType + endIng,
	"Thank" + thankEnd + ", " + giftCreator + ", I'd like to give this " + giftType + " a shot" + endIng,
	"Thank" + thankEnd + ", " + giftCreator + ", I've been on the lookout for this " + giftType + endIng,
	"Thank" + thankEnd + ", " + giftCreator + ", looks like " + daCompment(1) + " " + giftType + endIng,
	"Thank" + thankEnd + ", " + giftCreator + ", seems like " + daCompment(1) + " " + giftType + endIng,
	"Thank" + thankEnd + ", " + giftCreator + ", great looking " + giftType + endIng,
	"Thank" + thankEnd + ", " + giftCreator + ", this " + giftType + " looks " + daCompment() + endIng,
	"Thank" + thankEnd + ", " + giftCreator + ", this " + giftType + " seems " + daCompment() + endIng,
	"Thank" + thankEnd + ", " + giftCreator + endIng,
	"Thank" + thankEnd + ", I'd like to give this " + giftType + " a shot" + endIng,
	"Thank" + thankEnd + ", I'd like to give this a shot" + endIng,
	"Thank" + thankEnd + ", I've been eyeing this" + endIng,
	"Thank" + thankEnd + ", I've been on the lookout for this " + giftType + endIng,
	"Thank" + thankEnd + ", looks like " + daCompment(1) + " " + giftType + endIng,
	"Thank" + thankEnd + ", seems like " + daCompment(1) + " " + giftType + endIng,
	"Thank" + thankEnd + ", this " + giftType + " looks " + daCompment() + endIng,
	"thank" + thankEnd + ", much love <3",
	"[THX](http://i.imgur.com/zFBvv.gif)",
	"# [THX](http://i.imgur.com/zFBvv.gif)",
	"Thank you <3~~",
	"Thank you~ <3",
	"Thank you ^~^",
	"Thankee kindly" + endIng,
	"Thankey matey" + endIng,
	"Thankie" + endIng,
	"Thankies~",
	"Thankings, friend!",
	"thank" + thankEnd + " " + daBunch,
	"thank" + thankEnd + " " + daEmote,
	"Thanks " + daBunch + endIng,
	"Thanks " + daBunch + " for this" + endIng,
	"Thanks " + daBunch + " for the " + daChance + endIng,
	"Thanks " + daBunch + " for this " + daChance + endIng,
	"Thanks " + daBunch + ". Good job" + endIng,
	"Thanks " + daBunch + ". Great job" + endIng,
	"thanks " + daBunch + "! SUPER thanks =P",
	"Thanks A LOT! <3",
	"Thanks a LOT!!!",
	"Thanks a bunch...of bananas! " + daEmote,
	"Thanks mate! Good luck to all who entered.  \n  \n* " + meBaby + " :3",
	"thank you",
	"thankyou",
	"thanks" + endIng,
	"thanks " + daEmote,
	"THANKS" + endIng,
	"THANKS " + daEmote,
	"thanks~ " + daEmote,
	"Thanks~" + endIng,
	"Thanky" + endIng,
	"Thanky<3",
	"Thanky" + endIng + " <3",
	"Thanq!",
	"tanks",
	"thanx",
	"thanx alot",
	"THX! " + daEmote,
	"Thx <3",
	"thx~",
	"tNX!",
	"TNX!",
	"TY!!! <3",
	"ty" + endIng,
	"Ty" + endIng,
	"ty " + daEmote,
	"ty, " + giftCreator + endIng,
	"tyvm",
	"TYVM! " + daEmote,
	"This is " + daCompment() + ", thank" + thankEnd + " so much" + endIng,
	"This is " + daCompment() + ", thank" + thankEnd + " so much, " + giftCreator + endIng,
	"This is " + daCompment() + ", thank" + thankEnd + ", " + giftCreator + "!",
	"This is " + daCompment() + ", thank" + thankEnd + endIng,
	"Yet another thank you comment " + daEmote,
	"You're awesome, " + giftCreator + "! Thank" + thankEnd + endIng,
	"You rock! Thank" + thankEnd + ". " + daEmote,
	"Woah ! Thanks " + giftCreator + " !",
	"Why thank you" + endIng,
	"Why thank you quite much" + endIng,
	"Wow thanks" + endIng,
	"Wow" + endIng + " thank" + thankEnd + endIng,
	"wow" + endIng + " thank" + thankEnd + " for the " + daChance + endIng,
	"Wow" + endIng + " thank" + thankEnd + " for the " + daChance + endIng,
	"Wow, what " + daCompment(1) + " " + giftType + ", thank" + thankEnd + endIng,
	"wow " + daCompment() + " " + giftType + ". thank" + thankEnd,
	"WOW, thank" + thankEnd + endIng,
	"WOW, thank" + thankEnd + endIng + " " + daEmote,
	"Yay!!!! Thank" + thankEnd,
	"Yumtastic" + endIng,
	giftCreator + " thank" + thankEnd + " so much for this " + daCompment() + " " + daChance + endIng,
	giftCreator + " thanks " + daBunch + " for this " + daCompment() + " " + daChance + endIng,
	capStr(daBunch) + " of thanks" + endIng,
	capStr(daBunch) + " of thanks for this" + endIng,
	capStr(daBunch) + " of thanks for this, " + giftCreator + endIng,
	capStr(daBunch) + " of thanks for the " + daChance + endIng,
	capStr(daBunch) + " of thanks for the " + daChance + ", " + giftCreator + endIng,
	capStr(daCompment()) + " " + giftType,
	daCompment() + " " + giftType + " - thank" + thankEnd + endIng,
	capStr(daCompment()) + " " + capStr(giftType),
	capStr(daCompment()) + " " + daEmote + " Thank" + thankEnd + endIng,
	capStr(daCompment()) + " " + giftType + ", "+ giftCreator + "! Thank" + thankEnd + endIng,
	capStr(daCompment()) + " gift, "+ giftCreator + "! Thank" + thankEnd + endIng,
	capStr(daCompment()) + " gift! Thank" + thankEnd + endIng,
	capStr(daCompment()) + " gift, thank" + thankEnd + " and good luck to all" + endIng,
	capStr(daCompment()) + " giveaway" + endIng,
	capStr(daCompment()) + " giveaway, thank" + thankEnd + endIng + " " + daEmote,
	capStr(daCompment()) + " giveaway, thank" + thankEnd + endIng,
	capStr(daCompment()) + " giveaway, thank" + thankEnd + " so much for the " + daChance + endIng + " " + daEmote,
	capStr(daCompment()) + " giveaway, thanks " + daBunch + " for the " + daChance + endIng + " " + daEmote,
	capStr(daCompment()) + " one! Thank" + thankEnd + endIng,
	capStr(daCompment()) + " one, thank" + thankEnd + ", "+ giftCreator + endIng,
	capStr(daCompment()) + "! I forgot about this " + giftType,
	capStr(daCompment()) + "! Thank" + thankEnd + ", " + giftCreator + " " + daEmote,
	capStr(daCompment()) + "! Thank" + thankEnd + ", " + giftCreator + endIng,
	capStr(daCompment()) + "! Thank" + thankEnd + endIng + " " + daEmote,
	capStr(daCompment()) + "! Thank" + thankEnd + endIng,
	capStr(daCompment()) + ", looks " + daCompment() + endIng,
	capStr(daCompment()) + ", thank" + thankEnd + ", " + giftCreator + endIng + " " + daEmote,
	capStr(daCompment()) + ", thank" + thankEnd + ", " + giftCreator + endIng,
	capStr(daCompment()) + ", thank" + thankEnd + endIng + " " + daEmote,
	capStr(daCompment()) + ", thank" + thankEnd + endIng,
	capStr(giftName) + " doesn't look too bad! Thank" + thankEnd + ", " + giftCreator + endIng,
	capStr(giftName) + " doesn't look too bad, thank" + thankEnd + endIng,
	capStr(giftName) + " looks " + daCompment() + "! Thank" + thankEnd + ", " + giftCreator + endIng,
	capStr(giftName) + " looks " + daCompment() + ", thank" + thankEnd + endIng,
	capStr(giftName) + " looks like " + daCompment(1) + " " + giftType + ", thank" + thankEnd + endIng,
	capStr(giftName) + " seems like " + daCompment(1) + " " + giftType + ", thank" + thankEnd + endIng,
	capStr(giftName) + " seems like " + daCompment(1) + " " + giftType + endIng,
	capStr(giftName) + " will be mine! Thank" + thankEnd + ", " + giftCreator + endIng,
	capStr(giftName) + " will be mine! Thank" + thankEnd + endIng,
	capStr(giftName) + " will be mine" + endIng,
	capStr(giftName) + "!!! Thank" + thankEnd + endIng
	]
	
	document.getElementById("body").value = thanksMessages[rand(thanksMessages.length)]
}

// Static comment (fallback if failed to fetch names for some reason)
function insertCommentS(){
	document.getElementById("body").value = "Thanks for the chance to win this!"
}

// Insert the comment with a 2sec delay (for stabilities sake)
if ((giftCreator) && (giftName)){
window.setTimeout(insertCommentR(),2000)
} else if ((isGiveaway) && (isEligible)){
window.setTimeout(insertCommentS(),2000)
}