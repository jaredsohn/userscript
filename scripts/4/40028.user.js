// ==UserScript==
// @name           Chucky!
// @namespace      TheAmazingOne@gamefaqs.com
// @description    Adds chuckyhacks to random topics
// @include        http://www.gamefaqs.com/boards/genmessage.php?board=402&topic=*
// ==/UserScript==

//-------------------------------------------------------------------
// The original author of this script is unknown.
// 
// I have made some minor changes since it wasn't working for me
// for some reason.
//   - The Amazing One
//-------------------------------------------------------------------
top=window.location.href;
if (/genmessage.php/.test(top)) {

var chuckyisms = new Array(
"rats rite rorge",
"a important mesage from that batman person <br> <br> http://img208.imageshack.us/img208/9531/batmanxmassmfj6.jpg <br> ---",
"am any ''moderatir'' apliactions open soon? <br> <br> do i submit new one or does that ''cjay'' person habe my old one <br> ---",
"are that one ''chris rock'' person and ''kid rock'' person related <br> <br> i no they are one is white and one is colored but i think you can still be rlated if you aresnt the same color <br> ---",
"ATNN: LtUaE posters that like large girls <br> <br> maybe i get advice fom that ''richie'' person or somebne can help <br> <br> anyway my quaetsion is does it cost more when they eat or the same im think more because they eat more im ask beacause i have to take this one girl to eat and im wonder where to go <br> <br> thanks in adbance <br> ---",
"ATTN: ''SBallin'' person <br> <br> i want my change my userneme to say chuckyhacks & duckbeard <br> <br> thanks in adbance <br> ---",
"Alright chums, I'm back. Let's do this! <br> <br> LEEEEEEEROT JAAAAAAANKINS! <br> ---",
"Least I have chicken. <br> <br> LOL IS IT RITE? <br> ---",
"ATTN: LtUaE moderators <br> <br> Can somebody make another one of those stickpin topics? I thought it was a good idea to have a topic at the top containing some of the more common questions and answers pertaining to this board. <br> <br> Thanks. <br> ---",
"bomp <br> ---",
"My cat is almost full grown now - PIC <br> <br> I got him as a Christmas present, and I think he's the bestest kitty ever. <br> <br> http://img147.echo.cx/my.php?image=kitty7lj.png <br> ---",
"Guess how many donuts I can fit around my dong <br> <br> All correct posters win a free donut. <br> ---",
"I just ate 5 chicken breasts <br> <br> I thought they only had 2. <br> <br> LOL IS IT RITE? <br> <br> I MEAN IS IT RITE? <br> ---",
"I just trapped a squirrel <br> <br> It was living in my roof, so I bought a ''hav-a-heart'' trap and baited it with peanut butter on bread. Took about 4 hours before the dumbass got himself caught. <br> <br> Now I just wait a couple of days for him to die. <br> <br> WOOP <br> ---",
"For chipmunks I fill up a big barrel full of water and place some irresistable treats on top. When the chipmunks go for it, sploosh. They're dumber than squirrels. <br> <br> LOL IS IT RITE? <br> ---",
"I SAY LOL IS IT RITE? <br> ---",
"It's called ''hav-a-heart'' because it traps them live, and then you're supposed to release them in teh wild. <br> <br> Not me. <br> ---",
"LOL at Renesaince Fairs LOL <br> <br> I got chased through the grounds last week because I threw a rock at one of the horses LOL. <br> ---",
"My toenails are curling under my toes <br> <br> I make a ''click-clack'' sound when I walk in the kitchen barefoot. <br> <br> LOL <br> ---",
"Pamela Anderson having sex - PIC <br> <br> http://img222.echo.cx/img222/5248/00330js.gif <br> ---",
"tag <br> ---",
"wft <br> ---",
"XOMG saem time post <br> ---",
"LOL IS IT RITE? <br> ---",
"let mobolo back in <br> ---",
"x & d <br> ---",
"I must say, I fancy a couple of drinks tonight <br> I think I'll go out for a couple, just to take the edge off. <br> ---",
"some guy was oputside and follows me yeelling stuff and i said wft man get out my face or i throw you in the river man <br> ---",
"you cant <br> <br> seriously new ''mod people'' are only picked once ebery couple days <br> <br> LOL SIST RITE <br> ---",
"yfzlol <br> <br> http://img161.imageshack.us/img161/3410/yfzzl8.jpg <br> ---",
"wastwed warnedpost <br> <br> #9 LO IS IT RITE? <br> ---",
"zip zip <br> <br> aw yerah <br> <br> brake it down <br> <br> me and teh duckbeard wachin some ''tv'' <br> along come polly say a 1 2 3 <br> nuthin else on oops i forgpt to eat <br> me and teh duckbeard we need forgot to eat <br> we need to go eat <br> <br> aw yeah <br> <br> brake it down <br> ---",
"roops ri rorgot ro ralk rike rooby rog <br> ---",
"ATNN: LtUaE posters from teh ''england'' <br> <br> stop makeing up words for stuff <br> <br> it called soccer <br> <br> it called a cell phone <br> <br> it called a windsheidl <br> <br> and plaese start making good music <br> ---",
"ziop zip <br> <br> aw yeah <br> <br> today day 10 im got a new pen <br> habe to feed duckbeard tehn cook ''spagheti'' weird <br> huh huh <br> it alreight now no complane <br> i gonna wach this one movie call snake in the plane <br> <br> brake it down <br> ---",
"uh huh <br> <br> that rite <br> <br> KCIK IT <br> <br> chuckyhacks donr need no support yo <br> he dont habe boob like a big fat ho <br> 100 precent man wit amrs of steal <br> mess wit me and im make you sqeel <br> like a pig taht is <br> oink oink oink <br> zip zip <br> <br> barek it down <br> ---",
"mmm sails my bioat in teh harbor <br> ---",
"i pooped on teh ''sidewalk'' yestreday <br> <br> i want to see if i can get it to be a srtaifht line and not curl up so i went on teh ''sidewalk'' at liek 2 am but it end up looki ng like a H <br> ---"


);
var rarity=10000; // don't change this unless everyone else is told to, or else you'll see him in different places

var ch=false;
var messageID=new Array();
topicID=top.substr(top.indexOf("&topic=")+7,8);

var divs=document.getElementsByTagName("div");
for (k in divs) {
	if (divs[k].className=="board") {
		var messagebox=divs[k];
		break;
	}
}

var links=messagebox.getElementsByTagName("a");
var direction=messagebox.getElementsByTagName("colgroup");
if (direction.length==1) { var horizontal=true; }
else { var horizontal=false; }

msgs=messagebox.getElementsByTagName("tr");
for (l in links) {
	if (links[l].href!=undefined) {
		find=links[l].href.indexOf("&message=");
		if (find != -1) {
			messageID.push(links[l].href.substring(find+12));
		}
	}
}
tn=(topicID-rarity*Math.floor(topicID/rarity));
for (n in messageID) {
	chucky=(messageID[n]%tn);
	if (ch) {
		if (n%2==1) { msgs[n].setAttribute("class","even"); }
		else { msgs[n].setAttribute("class",""); }
	}
	if ((chucky==0) && (!ch)) {
		ch=true;
		if (horizontal) {
			before=msgs[n].getElementsByTagName("td");
			time=before[0].innerHTML;
			sta=time.indexOf("Posted");
			fin=time.indexOf("<br>\n<a");
			chuckytime=time.substring(sta,fin);
			var tr=document.createElement("tr");
			var first=document.createElement("td");
			var second=document.createElement("td");
			first.setAttribute("class","author");
			tr.setAttribute("class","even");
			first.innerHTML="<a href=\"#\" class=\"name\">chuckyhacks</a><br/>" + chuckytime + "<br/><a href=\"#\">message detail</a>";
			cn=messageID[n] % chuckyisms.length;
			second.innerHTML=chuckyisms[cn];
			par=msgs[n];
			par.parentNode.insertBefore(tr,par.nextSibling);
			tr.appendChild(first);
			tr.appendChild(second);
		}
		else {
			time=msgs[(2*n)].innerHTML;
			sta=time.indexOf("Posted");
			fin=time.indexOf("|\n<a");
			chuckytime=time.substring(sta,fin);
			var firsttr=document.createElement("tr");
			var firsttd=document.createElement("td");
			firsttr.appendChild(firsttd);
			firsttd.innerHTML="<a href=\"#\" class=\"name\">chuckyhacks</a> | "+ chuckytime + " | <a href=\"#\">message detail</a>";
			var secondtr=document.createElement("tr");
			var secondtd=document.createElement("td");
			secondtr.appendChild(secondtd);
			secondtr.setAttribute("class","even");
			cn=messageID[n] % chuckyisms.length;
			secondtd.innerHTML=chuckyisms[cn];
			par=msgs[(2*n+1)];
			par.parentNode.insertBefore(secondtr,par.nextSibling);
			par.parentNode.insertBefore(firsttr,secondtr);
		}
	}
}

}