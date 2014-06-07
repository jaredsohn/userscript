// ==UserScript==
// @name           Nue Chuckyhacks
// @namespace      NueCH
// @description    Nue Chuckyhacks
// @include        http://www.gamefaqs.com/boards/402-*/*
// ==/UserScript==

document.getElementsByClassName = function(sClass)
{
	var aData = new Array();
	var oClassRegExp = new RegExp("\\b" + sClass + "\\b");
	var aItems = this.getElementsByTagName("*");
	var sName = "";
	for ( var i = 0; i < aItems.length; i++ )
	{
		sName = aItems[i].className;
		if ( oClassRegExp.test(sName) )
		{
			aData.push(aItems[i]);
		}
	}
	return aData;
};

var aChuckyisms = new Array
(
	"rats rite rorge",
	"a important mesage from that batman person<br><br>http://img208.imageshack.us/img208/9531/batmanxmassmfj6.jpg<br>---",
	"am any \"moderatir\" apliactions open soon?<br><br>do i submit new one or does that \"cjay\" person habe my old one<br>---",
	"are that one \"chris rock\" person and \"kid rock\" person related<br><br>i no they are one is white and one is colored but i think you can still be rlated if you aresnt the same color<br>---",
	"ATNN: LtUaE posters that like large girls<br><br>maybe i get advice fom that \"richie\" person or somebne can help<br><br>anyway my quaetsion is does it cost more when they eat or the same im think more because they eat more im ask beacause i have to take this one girl to eat and im wonder where to go<br><br>thanks in adbance<br>---",
	"ATTN: \"SBallin\" person<br><br>i want my change my userneme to say chuckyhacks & duckbeard<br><br>thanks in adbance<br>---",
	"Alright chums, I'm back. Let's do this!<br><br>LEEEEEEEROT JAAAAAAANKINS!<br>---",
	"Least I have chicken.<br><br>LOL IS IT RITE?<br>---",
	"ATTN: LtUaE moderators<br><br>Can somebody make another one of those stickpin topics? I thought it was a good idea to have a topic at the top containing some of the more common questions and answers pertaining to this board.<br><br>Thanks.<br>---",
	"bomp<br>---",
	"My cat is almost full grown now - PIC<br><br>I got him as a Christmas present, and I think he's the bestest kitty ever.<br><br>http://i40.tinypic.com/2mx0lyd.jpg<br>---",
	"Guess how many donuts I can fit around my dong<br><br>All correct posters win a free donut.<br>---",
	"I just ate 5 chicken breasts<br><br>I thought they only had 2.<br><br>LOL IS IT RITE?<br><br>I MEAN IS IT RITE?<br>---",
	"I just trapped a squirrel<br><br>It was living in my roof, so I bought a \"hav-a-heart\" trap and baited it with peanut butter on bread. Took about 4 hours before the dumbass got himself caught.<br><br>Now I just wait a couple of days for him to die.<br><br>WOOP<br>---",
	"For chipmunks I fill up a big barrel full of water and place some irresistable treats on top. When the chipmunks go for it, sploosh. They're dumber than squirrels.<br><br>LOL IS IT RITE?<br>---",
	"I SAY LOL IS IT RITE?<br>---",
	"It's called \"hav-a-heart\" because it traps them live, and then you're supposed to release them in teh wild.<br><br>Not me.<br>---",
	"LOL at Renesaince Fairs LOL<br><br>I got chased through the grounds last week because I threw a rock at one of the horses LOL.<br>---",
	"My toenails are curling under my toes<br><br>I make a \"click-clack\" sound when I walk in the kitchen barefoot.<br><br>LOL<br>---",
	"Pamela Anderson having sex - PIC<br><br>http://img222.echo.cx/img222/5248/00330js.gif<br>---",
	"tag<br>---",
	"wft<br>---",
	"XOMG saem time post<br>---",
	"LOL IS IT RITE?<br>---",
	"let mobolo back in<br>---",
	"x & d<br>---",
	"I must say, I fancy a couple of drinks tonight<br> I think I'll go out for a couple, just to take the edge off.<br>---",
	"some guy was oputside and follows me yeelling stuff and i said wft man get out my face or i throw you in the river man<br>---",
	"you cant<br><br>seriously new \"mod people\" are only picked once ebery couple days<br><br>LOL SIST RITE<br>---",
	"yfzlol<br><br>http://img161.imageshack.us/img161/3410/yfzzl8.jpg<br>---",
	"wastwed warnedpost<br><br>#9 LO IS IT RITE?<br>---",
	"zip zip<br><br>aw yerah<br><br>brake it down<br><br>me and teh duckbeard wachin some \"tv\"<br> along come polly say a 1 2 3<br> nuthin else on oops i forgpt to eat<br> me and teh duckbeard we need forgot to eat<br> we need to go eat<br><br>aw yeah<br><br>brake it down<br>---",
	"roops ri rorgot ro ralk rike rooby rog<br>---",
	"ATNN: LtUaE posters from teh \"england\"<br><br>stop makeing up words for stuff<br><br>it called soccer<br><br>it called a cell phone<br><br>it called a windsheidl<br><br>and plaese start making good music<br>---",
	"ziop zip<br><br>aw yeah<br><br>today day 10 im got a new pen<br> habe to feed duckbeard tehn cook \"spagheti\" weird<br> huh huh<br> it alreight now no complane<br> i gonna wach this one movie call snake in the plane<br><br>brake it down<br>---",
	"uh huh<br><br>that rite<br><br>KCIK IT<br><br>chuckyhacks donr need no support yo<br> he dont habe boob like a big fat ho<br> 100 precent man wit amrs of steal<br> mess wit me and im make you sqeel<br> like a pig taht is<br> oink oink oink<br> zip zip<br><br>barek it down<br>---",
	"mmm sails my bioat in teh harbor<br>---",
	"i pooped on teh \"sidewalk\" yestreday<br><br>i want to see if i can get it to be a srtaifht line and not curl up so i went on teh \"sidewalk\" at liek 2 am but it end up looki ng like a H<br>---"
);
var iRarity = 10000; // don't change this unless everyone else is told to, or else you'll see him in different places

var iTopicID = parseInt(document.location.toString().replace(/^http:\/\/www\.gamefaqs\.com\/boards\/\d+\-.*?\/(.*?)$/, "$1").replace(/^(\d+)\?.*?$/, "$1")).toString();

var bHorizontal = ( ( document.getElementsByTagName("colgroup").length == 1 ) ? true : false );

if ( bHorizontal == true )
{
	var aRawInfo = document.getElementsByClassName("msg_stats_left");
}
else
{
	var aRawInfo = document.getElementsByClassName("msg_stats");
}
var aRawPosts = document.getElementsByClassName("msg_body");
var aPostIDs = new Array();
var iNodeID = ( 4 + ( ( bHorizontal == true ) ? 1 : 0 ) );
for ( var i = 0; i < aRawInfo.length; i++ )
{
	aPostIDs.push(aRawInfo[i].childNodes[iNodeID].toString().replace(/^http:\/\/www\.gamefaqs\.com\/boards\/\d+\-.*?\/\d+\/(\d+)$/, "$1"));
}

var iTn = ( iTopicID - iRarity * Math.floor( iTopicID / iRarity) );
var bChucky = false;
var o = document.evaluate("//table[@class='board message']//tr", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var aRows = new Array();
for ( var i = 0; i < o.snapshotLength; i++ )
{
	if ( i == 2 )
	{
		continue;
	}
	aRows.push(o.snapshotItem(i));
}

for ( var i = 0; i < aPostIDs.length; i++ )
{
	iChucky = ( aPostIDs[i] % iTn );
	if ( bChucky == true )
	{
		if ( ( i % 2) == 1 )
		{
			aRawInfo[i].setAttribute("class", "even");
		}
		else
		{
			aRawInfo[i].setAttribute("class", "");
		}
	}
	if ( iChucky == 0 && bChucky == false )
	{
		bChucky == true;
		if ( bHorizontal == true )
		{
			//alert("chucky");
			sTime = aRawInfo[i].childNodes[3].nodeValue.toString().replace(/ \(.*?\)/g, "").replace(/^Posted (.*?) \| $/g, "$1");
			oInfoRow = document.createElement("tr");
			oInfoRow.setAttribute("class", "even");
			oInfoCell = document.createElement("td");
			oInfoCell.setAttribute("style", "background-color: rgb(204, 255, 255) ! important;");
			oInfoCell.setAttribute("class", "author");
			oInfoCell.innerHTML = "<div class=\"msg_stats_left\"><a name=\"chucky\"></a><a href=\"#\" class=\"name\">chuckyhacks</a><br/>Posted " + sTime + "<br/><a href=\"#\">message detail</a><br /><a href=\"#\">quote</a></div>";
			oInfoRow.appendChild(oInfoCell);
			var oMsgCell = document.createElement("td");
			iCn = ( aPostIDs[i] % aChuckyisms.length );
			oMsgCell.innerHTML = "<div class=\"msg_body\">" + aChuckyisms[iCn] + "</div>";
			oInfoRow.appendChild(oInfoCell);
			oInfoRow.appendChild(oMsgCell);
			oParent = aRows[i];
			oParent.parentNode.insertBefore(oInfoRow, oParent.nextSibling);
		}
		else
		{
			//alert("chucky");
			sTime = aRawInfo[i].childNodes[3].nodeValue.toString().replace(/ \(.*?\)/g, "").replace(/^Posted (.*?) \| $/g, "$1");
			oInfoRow = document.createElement("tr");
			oInfoCell = document.createElement("td");
			oInfoCell.setAttribute("style", "background-color: rgb(204, 255, 255) ! important;");
			oInfoRow.appendChild(oInfoCell);
			oInfoCell.innerHTML = "<div class=\"msg_stats\"><a href=\"#\" class=\"name\">chuckyhacks</a> | <a name=\"chucky\"></a>Posted " + sTime + " | <a href=\"#\">message detail</a> | <a href=\"#\">quote</a></div>";
			var oMsgRow = document.createElement("tr");
			var oMsgCell = document.createElement("td");
			oMsgRow.appendChild(oMsgCell);
			oMsgRow.setAttribute("class", "even");
			iCn = ( aPostIDs[i] % aChuckyisms.length );
			oMsgCell.innerHTML = "<div class=\"msg_body\">" + aChuckyisms[iCn] + "</div>";
			oParent = aRawPosts[i].parentNode.parentNode;
			oParent.parentNode.insertBefore(oMsgRow, oParent.nextSibling);
			oParent.parentNode.insertBefore(oInfoRow, oMsgRow);
		}
	}
}