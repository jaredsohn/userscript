// ==UserScript==
// @name		filterThreadPostRemoverizer
// @namespace	http://www.ibsomeurl/filterThreadRemoverizer
// @description	pa1
// @include	*forumdisplay.php*
// @include	*showthread.php*
// ==/UserScript==

/*
DESCRIPTION
------------------------------------------------------------------------------------------------
basically this script has grown out of a need to dump (hide) rows in a table (eg in forums) where language is used that is NWS, or just annoying net etiquette. The thought at the moment is that people can edit the script to include to be able to apply their acceptable level of language and terms.. so instead of ignoring the user you are ignoring the users posts or threads that don't meet your criteria.

this script searches text fields only, so any titles or any other things are not checked which may contain language you do not want when you mouse over.

Note:
*the dictionary used is very large. trim it or expand it as you need or desire / need.
*a notice in the title at the top of the webpage will say  'removerized x items' x being a number
*sometimes it will blank an entire page due to odd matches within a page to the dictionary.. just disable it with the monkey face button and refresh.. renable after leaving that page

NOTE: THIS SCRIPT DOES NOT REMOVE THE HTML, ONLY HIDES OFFENDING THINGS FROM VIEW. SEE 'LICENSE'.

INSTRUCTIONS
you have to at this time modify the file to make additions or modifications to the dictionary.
if you want a special dictionary for one site and another for another you need to have two scripts loaded where they include only the sites you want.

KNOWN ISSUES
some forums used in conjunction with this script have been noted to block the entire page!? but since I am not using these forums or these forums do not imho have a need for such a filter I came down with a case of the fuck its.

UNKOWN ISSUES
post them on the userscripts.org site where you found this script.
_______________________________________________________

CREDIT
------------------------------------------------------------------------------------------------
This script used a number of scripts which it has grown out of. Including :
 * badwords and a few lines of script from "profanity filter" by MCE version 1.0 http://www.arantius.com/article/arantius/clean+language/ or http://userscripts.org/scripts/show/4175
 * lots of tutorials.
_______________________________________________________

LICENSE
------------------------------------------------------------------------------------------------
filterThreadPostRemoverizer - "removes offending threads and posts ..kinda fast!"
Copyright (C) 2006 whatrick

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
_______________________________________________________

NOTICE:
------------------------------------------------------------------------------------------------
Licensed for unlimited modification and redistribution as long as this notice is kept intact.
_______________________________________________________
*/
var badwords=['wtf','wop','whore','whoar','wetback','wank','vagina','twaty','twat','titty','titties','tits','testicles','teets','spunk','spic','snatch','smut','sluts','slut','sleaze','slag','shiz','shitty','shittings','shitting','shitters','shitter','shitted','shits','shitings','shiting','shitfull','shited','shit','shemale','sheister','sh!t','scrotum','screw','schlong','retard','qweef','queer','queef','pussys','pussy','pussies','pusse','punk','prostitute','pricks','prick','pr0n','pornos','pornography','porno','porn','pissoff','pissing','pissin','pisses','pissers','pisser','pissed','piss','pimp','phuq','phuks','phukking','phukked','phuking','phuked','phuk','phuck','phonesex','penis','pecker','orgasms','orgasm','orgasims','orgasim','niggers','nigger','nigga','nerd','muff','mound','motherfucks','motherfuckings','motherfucking','motherfuckin','motherfuckers','motherfucker','motherfucked','motherfuck','mothafucks','mothafuckings','mothafucking','mothafuckin','mothafuckers','mothafucker','mothafucked','mothafuckaz','mothafuckas','mothafucka','mothafuck','mick','merde','masturbate','lusting','lust','loser','lesbo','lesbian','kunilingus','kums','kumming','kummer','kum','kuksuger','kuk','kraut','kondums','kondum','kock','knob','kike','kawk','jizz','jizm','jiz','jism','jesus h christ', 'jesus fucking christ','jerk-off','jerk','jap','jackoff','jacking off','jackass','jack-off','jack off','hussy','hotsex','horny','horniest','hore','hooker','honkey','homo','hoer','hell','hardcoresex','hard on','h4x0r','h0r','guinne','gook','gonads','goddamn','gazongers','gaysex','gay','gangbangs','gangbanged','gangbang','fux0r','furburger','fuks','fuk','fucks','fuckme','fuckings','fucking','fuckin','fuckers','fucker','fucked','fuck','fu','foreskin','fistfucks','fistfuckings','fistfucking','fistfuckers','fistfucker','fistfucked','fistfuck','fingerfucks','fingerfucking','fingerfuckers','fingerfucker','fingerfucked','fingerfuck','fellatio','felatio','feg','feces','fcuk','fatso','fatass','farty','farts','fartings','farting','farted','fart','fags','fagots','fagot','faggs','faggot','faggit','fagging','fagget','fag','ejaculation','ejaculatings','ejaculating','ejaculates','ejaculated','ejaculate','dyke','dumbass','douche bag','dong','dipshit','dinks','dink','dildos','dildo','dike','dick','damn','damn','cyberfucking','cyberfuckers','cyberfucker','cyberfucked','cyberfuck','cyberfuc','cunts','cuntlicking','cuntlicker','cuntlick','cunt','cunnilingus','cunillingus','cunilingus','cumshot','cums','cumming','cummer','cum','crap','cooter','cocksucks','cocksucking','cocksucker','cocksucked','cocksuck','cocks','cock','cobia','clits','clit','clam','circle jerk','chink','cawk','buttpicker','butthole','butthead','buttfucker','buttfuck','buttface','butt hair','butt fucker','butt breath','butt','butch','bung hole','bum','bullshit','bull shit','bucket cunt','browntown','browneye','brown eye','boner','bonehead','blowjobs','blowjob','blow job','bitching','bitchin','bitches','bitchers','bitcher','bitch','bestiality','bestial','belly whacker','beaver','beastility','beastiality','beastial','bastard','balls','asswipe','asskisser','assholes','asshole','asses','ass lick','ass'];

//_____________________________________________________
//CODE
//---------------------------------------------------------------------------------------------
//###############################################
//this code will id tr's and then loops through all text element's.
//this code takes the one above and.. applies badwords finds them

//## dictionary fix for regexp's
//var badwords=['OMG','edu'];
var bw="\\b("+badwords.join("|")+")\\b";
bw=new RegExp(bw, "gi");

//## find tr's and identify those that go against the dictionary
var allTrs, thisTr, badTrs = [];
allTrs = document.evaluate(
    "//tr|//tr//descendant::text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
var n = 0, trCnt =0, bwCnt =0;
for (var i = 0; i < allTrs.snapshotLength; i++) {
    thisTr  = allTrs.snapshotItem(i);
    var output1 = thisTr.nodeValue;
    if (thisTr == "[object XPCNativeWrapper [object HTMLTableRowElement]]" && thisTr.nodeValue == null) trCnt++;
    else if (thisTr.nodeValue.match(bw)){
        badTrs[bwCnt] = trCnt-1;
        bwCnt++;
    }
}

//###############################################
//loop again but this time remove the offending tr element's and their children
//## dictionary
var bT="\\b("+badTrs.join("|")+")\\b";
bT=new RegExp(bT, "gi");
allTrs = document.evaluate(
    "//tr",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
killIt = 0; // just for debugging
for (var i = 0; i < allTrs.snapshotLength; i++) {
    thisTr  = allTrs.snapshotItem(i);
    tmp=i+""; //convert loop variable to a string to be able to apply regexp's
    if (tmp.match(bT)) {
       var newTr = thisTr.cloneNode(false); // no child nodes;
       thisTr.parentNode.replaceChild(newTr,thisTr);
       killIt++;
   }
}//alert("ok .. killed : " +killIt);
document.title=document.title+" -- removerized "+killIt +" items";
//Copyright (C) 2006 whatrick -- EOF