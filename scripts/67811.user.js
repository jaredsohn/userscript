/*
Facepunch Ultra Script
version 0.95 (mm3guy)
2009-18-5

Origional Fix Copyright (c) 2006, Tristan Pemble
Released under the GPL license
http://www.gnu.org/copyleft/gpl.html

Portions Copyright (c) 2005, Mark Pilgrim
Also Released under the GPL license

Origional OIFY Styles (oify.css, and _phallic.css) probably Copyright (c) 2004, Garry Newman
The missing Scripts are Copyright ©2000 - 2004, Jelsoft Enterprises Limited and/or Copyright (c) 2004, Garry Newman, god knows that they are licensed under.

Code Molested by Morphology53
Still Released under the GPL license

Updated for Facepunch 2009 by mm3guy

Some code stolen from Cosmic Duck's Greasemonkey Script which was originally made by vampired

Image/text box resize code credits:
Justin Watt & Raik Juergens
	
Custom titals based off of Joscpe's title script
*/
// ==UserScript==
// @name          Facepunch Ultra Script
// @namespace     http://www.facepunch.com/*
// @description   Makes facepunch awesome
// @include       http://*.facepunch*.com/*
// ==/UserScript==

//Example Backgrounds
//Green down				http://www.garry.tv/img/trip/gr-dn.gif
//Garrys Avatar				http://www.garry.tv/img/avatar-64a.jpg
//Static					http://www.garry.tv/img/trip/gr-bk.gif
(function() {
var newfavicon = 'data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoAwAAF' +
'gAAACgAAAAQAAAAIAAAAAEAGAAAAAAAQAMAAAAAAAAAAAAAAAAAAAAAAAAA%2FwAA%2' +
'FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2F' +
'wAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2Fw' +
'AA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAAAAAA%' +
'2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAAAAAA%2FwAA%2FwAA%2Fw' +
'AA%2FwAA%2FwAA%2FwAAAAAAAAAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2F' +
'wAAAAAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAAAAAAAAAA%2FwAA%2FwAA%2Fw' +
'AA%2FwAA%2FwAA%2FwAAAAAAAAAAAAAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAAAAAAA' +
'AAAAAAAAAAA%2FwAA%2FwAA%2FwAAAAAAAAAA%2FwAAAAAAAAAA%2FwAA%2FwAA%2Fw' +
'AA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwA' +
'A%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA' +
'%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAAAAAAAAA' +
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%2FwAA%2FwAAAAAAAA' +
'AA%2FwAA%2FwAA%2FwAAAAAAAAAAAAAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAAAAAA%' +
'2FwAA%2FwAAAAAA%2FwAA%2FwAAAAAA%2FwAA%2FwAAAAAAAAAAAAAA%2FwAA%2FwAA' +
'%2FwAAAAAAAAAA%2FwAA%2FwAAAAAA%2FwAAAAAAAAAAAAAA%2FwAAAAAAAAAAAAAAA' +
'AAA%2FwAAAAAAAAAAAAAA%2FwAA%2FwAAAAAA%2FwAA%2FwAAAAAA%2FwAA%2FwAAAA' +
'AAAAAAAAAA%2FwAA%2FwAA%2FwAAAAAAAAAA%2FwAA%2FwAAAAAAAAAA%2FwAA%2FwA' +
'A%2FwAAAAAAAAAAAAAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAAAAAA%2FwAA%2FwAAAA' +
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%2FwAA%2FwAA%' +
'2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2FwAA%2' +
'FwAA%2FwAA%2FwAA%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'

// the background for ignored posts
var hiddenimage = "data:image/png;base64,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";

// the ignore thread image
var delthread = "data:image/png;base64,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";

function getCookie(name) {
	if(document.cookie.match(/;/)) {
		var cooks = document.cookie.split("; ");
		for(var x = 0; x < cooks.length; x++) {
			var cookie = cooks[x];
			if(cookie.match(name + "=")) {
				var value = cookie.replace(name + "=", "");
				break;
			} else {
				var value = false;
			}
		}
	} else {
		var cookie = document.cookie;
		if(cookie.match(name + "="))
			var value = cookie.replace(name + "=", "");
		else
			var value = false;
	}
	
	return value;
}


//Various Settings
//(Strings)
var oifybannertext = 'Internet OIFY';
var oifyreporttext = '>:[';
if ( typeof(unsafeWindow) != 'undefined' ) var window = unsafeWindow;
tehJquery = window.jQuery;										// Load jQuery

//var THEBACKGROUND = GM_getValue("magicalback", 'http://www.vulomedia.com/images/30456lawl.png');
//var THEBACKGROUND = GM_getValue("magicalback", "http://www.filecram.com/files/nightofamillionsax.gif");
var THEBACKGROUND = GM_getValue("magicalback", 'http://www.garry.tv/img/trip/gr-bk.gif');

var FunkyMusicTable = [ 'music.mid', 'music8.mid', 'music7.mid', 'music6.mid', 'music5.mid', 'music4.mid', 'music3.mid', 'music2.mid', 'music10.mid' ]

//bbcodes
var bbcode = [
	"b", "i", "u", "code", "highlight", "quote", "noparse", "url", "img", "img_thumb", "media", "hd", "release", "sp", "indent", "tab"
];

//user titals
var userA = [
    ["garry", "Head Honcho"],
    ["mikfoz", "Pissing in a sea of piss"],
    ["7DeadlySyns", "1/3 of the planet's population doesn't like me being a Gold Member."],
    ["chris0132", "I got blue member because I post'd \"Hamster throwing\""],
    ["Neckbeard", "<img src=\"http://www.facepunch.com/fp/emoot/argh.gif\" /> Sir Talks-A-Lot"],
    ["Mystfit27", "Machinima GOD"],
    ["Gurant", "A man with problems"],
    ["AshweeFTFW", "Banging HARDCORERAPE"],
    ["Greeman", "King of the OIFY"],
    ["Craptasket", "Queen of the OIFY"],
    ["Loompa Lord", "Not a Super Moderator"],
	["fps_THEPWNER", "gud speler"]
];

var userB = "garry=Head Honcho,mikfoz=Pissing in a sea of piss";

//emotes
var emotes = [
	[ ":frown:",		"frown.gif" ],
	[ ":smile:",		"smile.gif" ],
	[ ":350:",		"350.gif" ],
	[ ":3:",		"3.gif" ],
	[ ":biggrin:",		"biggrin.gif" ],
	[ ":aaa:",		"aaa.gif" ],
	[ ":aaaaa:",		"aaaaa.gif" ],
	[ ":am:",		"am.gif" ],
	[ ":angel:",		"angel.gif" ],
	[ ":bang:",		"bang.gif" ],
	[ ":banjo:",		"banjo.gif" ],
	[ ":black101:",		"black101.gif" ],
	[ ":blush:",		"blush.gif" ],
	[ ":buddy:",		"buddy.gif" ],
	[ ":butt:",		"butt.gif" ],
	[ ":c00l:",		"c00l.gif" ],
	[ ":cawg:",		"cawg.gif" ],
	[ ":cheers:",		"cheers.gif" ],
	[ ":chef:",		"chef.gif" ],
	[ ":clint:",		"clint.gif" ],
	[ ":comeback:",		"comeback.gif" ],
	[ ":confused:",		"confused.gif" ],
	[ ":cool:",		"cool.gif" ],
	[ ":cop:",		"cop.gif" ],
	[ ":crossarms:",		"crossarms.gif" ],
	[ ":crying:",		"crying.gif" ],
	[ ":dance:",		"dance.gif" ],
	[ ":Dawkins102:",		"Dawkins102.gif" ],
	[ ":devil:",		"devil.gif" ],
	[ ":dominic:",		"dominic.gif" ],
	[ ":downs:",		"downs.gif" ],
	[ ":downsgun:",		"downsgun.gif" ],
	[ ":eek:",		"eek.gif" ],
	[ ":emo:",		"emo.gif" ],
	[ ":eng101:",		"eng101.gif" ],
	[ ":eng99:",		"eng99.gif" ],
	[ ":engleft:",		"engleft.gif" ],
	[ ":ese:",		"ese.gif" ],
	[ ":f5:",		"f5.gif" ],
	[ ":fappery:",		"fappery.gif" ],
	[ ":flame:",		"flame.gif" ],
	[ ":flashfact:",		"flashfact.gif" ],
	[ ":flashfap:",		"flashfap.gif" ],
	[ ":gay:",		"gay.gif" ],
	[ ":geno:",		"geno.gif" ],
	[ ":ghost:",		"ghost.gif" ],
	[ ":gibs:",		"gibs.gif" ],
	[ ":glomp:",		"glomp.gif" ],
	[ ":goleft:",		"goleft.gif" ],
	[ ":gonk:",		"gonk.gif" ],
	[ ":haw:",		"haw.gif" ],
	[ ":hehe:",		"hehe.gif" ],
	[ ":hfive:",		"hfive.gif" ],
	[ ":hist101:",		"hist101.gif" ],
	[ ":hitler:",		"hitler.gif" ],
	[ ":holy:",		"holy.gif" ],
	[ ":huh:",		"huh.gif" ],
	[ ":hydrogen:",		"hydrogen.gif" ],
	[ ":j:",		"j.gif" ],
	[ ":jerkbag:",		"jerkbag.gif" ],
	[ ":jewish:",		"jewish.gif" ],
	[ ":jihad:",		"jihad.gif" ],
	[ ":keke:",		"keke.gif" ],
	[ ":mad:",		"mad.gif" ],
	[ ":mmmhmm:",		"mmmhmm.gif" ],
	[ ":monocle:",		"monocle.gif" ],
	[ ":ninja:",		"ninja.gif" ],
	[ ":nyd:",		"nyd.gif" ],
	[ ":redface:",		"redface.gif" ],
	[ ":patriot:",		"patriot.gif" ],
	[ ":pervert:",		"pervert.gif" ],
	[ ":pipe:",		"pipe.gif" ],
	[ ":pirate:",		"pirate.gif" ],
	[ ":pseudo:",		"pseudo.gif" ],
	[ ":q:",		"q.gif" ],
	[ ":raise:",		"raise.gif" ],
	[ ":rant:",		"rant.gif" ],
	[ ":rock:",		"rock.gif" ],
	[ ":roflolmao:",		"roflolmao.gif" ],
	[ ":rolleye:",		"rolleye.gif" ],
	[ ":rolleyes:",		"rolleyes.gif" ],
	[ ":saddowns:",		"saddowns.gif" ],
	[ ":science:",		"science.gif" ],
	[ ":shobon:",		"shobon.gif" ],
	[ ":sigh:",		"sigh.gif" ],
	[ ":silent:",		"silent.gif" ],
	[ ":ssj:",		"ssj.gif" ],
	[ ":suicide:",		"suicide.gif" ],
	[ ":sweatdrop:",		"sweatdrop.gif" ],
	[ ":tinfoil:",		"tinfoil.gif" ],
	[ ":v:",		"v.gif" ],
	[ ":what:",		"what.gif" ],
	[ ":whip:",		"whip.gif" ],
	[ ":witch:",		"witch.gif" ],
	[ ":wth:",		"wth.gif" ],
	[ ":xd:",		"xd.gif" ],
	[ ":yarr:",		"yarr.gif" ],
	[ ":zombie:",		"zombie.gif" ],
	[ ":wink:",		"wink.gif" ],
	[ ":livestock~01-14-04-whore:",		"livestock~01-14-04-whore.gif" ],
	[ ":11tea:",		"11tea.gif" ],
	[ ":2bong:",		"2bong.png" ],
	[ ":weed:",		"weed.gif" ],
	[ ":a2m:",		"a2m.gif" ],
	[ ":argh:",		"argh.gif" ],
	[ ":arghfist:",		"arghfist.gif" ],
	[ ":awesome:",		"awesome.gif" ],
	[ ":awesomelon:",		"awesomelon.gif" ],
	[ ":axe:",		"axe.gif" ],
	[ ":bahgawd:",		"bahgawd.gif" ],
	[ ":barf:",		"barf.gif" ],
	[ ":bick:",		"bick.gif" ],
	[ ":bigtran:",		"bigtran.gif" ],
	[ ":boonie:",		"boonie.gif" ],
	[ ":buttertroll:",		"buttertroll.gif" ],
	[ ":burger:",		"burger.gif" ],
	[ ":c00lbert:",		"c00lbert.gif" ],
	[ ":c00lbutt:",		"c00lbutt.gif" ],
	[ ":c:",		"c.png" ],
	[ ":camera6:",		"camera6.gif" ],
	[ ":can:",		"can.gif" ],
	[ ":catholic:",		"catholic.gif" ],
	[ ":clownballoon:",		"clownballoon.gif" ],
	[ ":ccb:",		"ccb.gif" ],
	[ ":chatter:",		"chatter.gif" ],
	[ ":coal:",		"coal.gif" ],
	[ ":coffee:",		"coffee.gif" ],
	[ ":colbert:",		"colbert.gif" ],
	[ ":commissar:",		"commissar.gif" ],
	[ ":d:",		"d.png" ],
	[ ":derp:",		"derp.gif" ],
	[ ":doh:",		"doh.gif" ],
	[ ":dong:",		"dong.gif" ],
	[ ":doom:",		"doom.gif" ],
	[ ":downsbravo:",		"downsbravo.gif" ],
	[ ":downsrim:",		"downsrim.gif" ],
	[ ":drac:",		"drac.gif" ],
	[ ":drugnerd:",		"drugnerd.gif" ],
	[ ":drum:",		"drum.gif" ],
	[ ":f5h:",		"f5h.gif" ],
	[ ":fh:",		"fh.gif" ],
	[ ":flaccid:",		"flaccid.gif" ],
	[ ":flag:",		"flag.gif" ],
	[ ":fork:",		"fork.png" ],
	[ ":frogsiren:",		"frogsiren.gif" ],
	[ ":ftbrg:",		"ftbrg.gif" ],
	[ ":gbsmith:",		"gbsmith.gif" ],
	[ ":george:",		"george.gif" ],
	[ ":gizz:",		"gizz.gif" ],
	[ ":goatse:",		"goatse.gif" ],
	[ ":gooncamp:",		"gooncamp.gif" ],
	[ ":guitar:",		"guitar.gif" ],
	[ ":h:",		"h.png" ],
	[ ":happyelf:",		"happyelf.gif" ],
	[ ":havlat:",		"havlat.gif" ],
	[ ":hchatter:",		"hchatter.gif" ],
	[ ":hf:",		"hf.gif" ],
	[ ":fuckyou:",		"fuckyou.gif" ],
	[ ":itjb:",		"itjb.gif" ],
	[ ":joel:",		"joel.gif" ],
	[ ":kamina:",		"kamina.gif" ],
	[ ":kiddo:",		"kiddo.gif" ],
	[ ":killdozer:",		"killdozer.gif" ],
	[ ":kratos:",		"kratos.gif" ],
	[ ":love:",		"love.gif" ],
	[ ":lsd:",		"lsd.gif" ],
	[ ":madmax:",		"madmax.gif" ],
	[ ":munch:",		"munch.gif" ],
	[ ":neckbeard:",		"neckbeard.gif" ],
	[ ":obama:",		"obama.gif" ],
	[ ":pcgaming:",		"pcgaming.gif" ],
	[ ":pedo:",		"pedo.gif" ],
	[ ":phone:",		"phone.gif" ],
	[ ":phoneb:",		"phoneb.gif" ],
	[ ":phoneline:",		"phoneline.gif" ],
	[ ":pleaseno:",		"pleaseno.gif" ],
	[ ":pluto:",		"pluto.gif" ],
	[ ":pranke:",		"pranke.gif" ],
	[ ":psyberger:",		"psyberger.gif" ],
	[ ":psylon:",		"psylon.gif" ],
	[ ":psypop:",		"psypop.gif" ],
	[ ":onlyoption:",		"onlyoption.gif" ],
	[ ":pwn:",		"pwn.gif" ],
	[ ":redhammer:",		"redhammer.gif" ],
	[ ":respek:",		"respek.gif" ],
	[ ":riker:",		"riker.gif" ],
	[ ":rimshot:",		"rimshot.gif" ],
	[ ":rodimus:",		"rodimus.gif" ],
	[ ":rubshandstogetherandgrinsevilly:",		"rubshandstogetherandgrinsevilly.gif" ],
	[ ":s:",		"s.png" ],
	[ ":sax:",		"sax.gif" ],
	[ ":shivdurf:",		"shivdurf.gif" ],
	[ ":siren:",		"siren.gif" ],
	[ ":sissies:",		"sissies.gif" ],
	[ ":slick:",		"slick.gif" ],
	[ ":smith:",		"smith.gif" ],
	[ ":smithicide:",		"smithicide.gif" ],
	[ ":snoop:",		"snoop.gif" ],
	[ ":sonia:",		"sonia.gif" ],
	[ ":sotw:",		"sotw.gif" ],
	[ ":spidey:",		"spidey.gif" ],
	[ ":spooky:",		"spooky.gif" ],
	[ ":ssh:",		"ssh.gif" ],
	[ ":stalker:",		"stalker.gif" ],
	[ ":stat:",		"stat.gif" ],
	[ ":sun:",		"sun.gif" ],
	[ ":supaburn:",		"supaburn.gif" ],
	[ ":swoon:",		"swoon.gif" ],
	[ ":sympathy:",		"sympathy.gif" ],
	[ ":taco:",		"taco.gif" ],
	[ ":toot:",		"toot.gif" ],
	[ ":toughguy:",		"toughguy.gif" ],
	[ ":unsmith:",		"unsmith.gif" ],
	[ ":wal:",		"wal.gif" ],
	[ ":woop:",		"woop.gif" ],
	[ ":wooper:",		"wooper.gif" ],
	[ ":worship:",		"worship.gif" ],
	[ ":xie:",		"xie.gif" ],
	[ ":airquote:",		"airquote.gif" ],
	[ ":allears:",		"allears.gif" ],
	[ ":byobear:",		"byobear.gif" ],
	[ ":byodood:",		"byodood.gif" ],
	[ ":crow:",		"crow.gif" ],
	[ ":dogout:",		"dogout.gif" ],
	[ ":frogdowns:",		"frogdowns.png" ],
	[ ":gb2hd2k:",		"gb2hd2k.gif" ],
	[ ":golfclap:",		"golfclap.gif" ],
	[ ":goonboot:",		"goonboot.gif" ],
	[ ":hampants:",		"hampants.gif" ],
	[ ":horse:",		"horse.gif" ],
	[ ":lron:",		"lron.gif" ],
	[ ":nattyburn:",		"nattyburn.gif" ],
	[ ":niggly:",		"niggly.gif" ],
	[ ":ohdear:",		"ohdear.png" ],
	[ ":pcgaming1:",		"pcgaming1.gif" ],
	[ ":psyboom:",		"psyboom.gif" ],
	[ ":qfg:",		"qfg.gif" ],
	[ ":razz:",		"razz.gif" ],
	[ ":regd08:",		"regd08.gif" ],
	[ ":regd09:",		"regd09.gif" ],
	[ ":smug:",		"smug.gif" ],
	[ ":smugdog:",		"smugdog.gif" ],
	[ ":spergin:",		"spergin.png" ],
	[ ":sweep:",		"sweep.gif" ],
	[ ":tf:",		"tf.gif" ],
	[ ":classic_fillmore:",		"classic_fillmore.gif" ],
	[ ":tiphat:",		"tiphat.gif" ],
	[ ":tito:",		"tito.gif" ],
	[ ":tubular:",		"tubular.gif" ],
	[ ":twisted:",		"twisted.gif" ],
	[ ":ughh:",		"ughh.gif" ],
	[ ":uhaul:",		"uhaul.gif" ],
	[ ":weed:",		"weed.gif" ],
	[ ":whoptc:",		"whoptc.gif" ],
	[ ":wom:",		"wom.gif" ],
	[ ":yohoho:",		"yohoho.gif" ],
	[ ":zoro:",		"zoro.gif" ],
	[ ":10bux:",		"10bux.gif" ],
	[ ":20bux:",		"20bux.gif" ],
	[ ":FYH:",		"FYH.gif" ],
	[ ":aslol:",		"aslol.gif" ],
	[ ":bandwagon:",		"bandwagon.gif" ],
	[ ":bravo2:",		"bravo2.gif" ],
	[ ":bravo:",		"bravo.gif" ],
	[ ":byewhore:",		"byewhore.gif" ],
	[ ":byob:",		"byob.gif" ],
	[ ":chio:",		"chio.gif" ],
	[ ":coupons:",		"coupons.gif" ],
	[ ":damn:",		"damn.gif" ],
	[ ":doink:",		"doink.gif" ],
	[ ":downsowned:",		"downsowned.gif" ],
	[ ":downswords:",		"downswords.gif" ],
	[ ":effort:",		"effort.gif" ],
	[ ":emoticon:",		"emoticon.gif" ],
	[ ":evol-anim:",		"evol-anim.gif" ],
	[ ":fiesta:",		"fiesta.gif" ],
	[ ":filez:",		"filez.gif" ],
	[ ":fireman:",		"fireman.gif" ],
	[ ":firstpost:",		"firstpost.gif" ],
	[ ":frogout:",		"frogout.gif" ],
	[ ":fry:",		"fry.gif" ],
	[ ":fuckoff:",		"fuckoff.gif" ],
	[ ":gb2byob:",		"gb2byob.gif" ],
	[ ":gb2fyad:",		"gb2fyad.gif" ],
	[ ":gb2gbs:",		"gb2gbs.gif" ],
	[ ":godwin:",		"godwin.gif" ],
	[ ":goof:",		"goof.gif" ],
	[ ":google:",		"google.gif" ],
	[ ":goon:",		"goon.gif" ],
	[ ":goonsay:",		"goonsay.gif" ],
	[ ":gtfoycs:",		"gtfoycs.gif" ],
	[ ":hawaaaafap:",		"hawaaaafap.gif" ],
	[ ":hellyeah:",		"hellyeah.gif" ],
	[ ":hurr:",		"hurr.gif" ],
	[ ":iceburn:",		"iceburn.gif" ],
	[ ":iia:",		"iia.png" ],
	[ ":iiaca:",		"iiaca.gif" ],
	[ ":iiam:",		"iiam.gif" ],
	[ ":irony:",		"irony.gif" ],
	[ ":krad2:",		"krad2.gif" ],
	[ ":laffo:",		"laffo.gif" ],
	[ ":lol:",		"lol.gif" ],
	[ ":lost:",		"lost.gif" ],
	[ ":master:",		"master.gif" ],
	[ ":milk:",		"milk.gif" ],
	[ ":moustache:",		"moustache.gif" ],
	[ ":ms:",		"ms.gif" ],
	[ ":nms:",		"nms.gif" ],
	[ ":nws:",		"nws.gif" ],
	[ ":nyoron:",		"nyoron.gif" ],
	[ ":owned:",		"owned.gif" ],
	[ ":page3:",		"page3.gif" ],
	[ ":protarget:",		"protarget.gif" ],
	[ ":04:",		"04.gif" ],
	[ ":05:",		"05.gif" ],
	[ ":06:",		"06.gif" ],
	[ ":07:",		"07.gif" ],
	[ ":rice:",		"rice.gif" ],
	[ ":russbus:",		"russbus.gif" ],
	[ ":shlick:",		"shlick.gif" ],
	[ ":synpa:",		"synpa.gif" ],
	[ ":techno:",		"techno.gif" ],
	[ ":their:",		"their.gif" ],
	[ ":todd:",		"todd.gif" ],
	[ ":toxx:",		"toxx.gif" ],
	[ ":twentyfour:",		"twentyfour.gif" ],
	[ ":vick:",		"vick.gif" ],
	[ ":w00t:",		"w00t.gif" ],
	[ ":w2byob:",		"w2byob.gif" ],
	[ ":waycool:",		"waycool.gif" ],
	[ ":whatup:",		"whatup.gif" ],
	[ ":words:",		"words.gif" ],
	[ ":wrongful:",		"wrongful.gif" ],
	[ ":wtc:",		"wtc.gif" ],
	[ ":wtf:",		"wtf.gif" ],
	[ ":zerg:",		"zerg.gif" ],
	[ ":cthulhu:",		"cthulhu.gif" ],
	[ ":frog:",		"frog.gif" ],
	[ ":frogbon:",		"frogbon.gif" ],
	[ ":frogc00l:",		"frogc00l.gif" ],
	[ ":froggonk:",		"froggonk.gif" ],
	[ ":gonchar:",		"gonchar.gif" ],
	[ ":kraken:",		"kraken.gif" ],
	[ ":monar:",		"monar.gif" ],
	[ ":psyduck:",		"psyduck.gif" ],
	[ ":shroom:",		"shroom.gif" ],
	[ ":signings:",		"signings.gif" ],
	[ ":stoat:",		"stoat.gif" ],
	[ ":trashbear:",		"trashbear.gif" ],
	[ ":woof:",		"woof.gif" ],
	[ ":wotwot:",		"wotwot.gif" ],
	[ ":911:",		"911.gif" ],
	[ ":australia:",		"australia.gif" ],
	[ ":belarus:",		"belarus.gif" ],
	[ ":britain:",		"britain.gif" ],
	[ ":bsg:",		"bsg.gif" ],
	[ ":ca:",		"ca.gif" ],
	[ ":canada:",		"canada.gif" ],
	[ ":china:",		"china.gif" ],
	[ ":denmark:",		"denmark.gif" ],
	[ ":foxnews:",		"foxnews.gif" ],
	[ ":france:",		"france.gif" ],
	[ ":furcry:",		"furcry.gif" ],
	[ ":hr:",		"hr.gif" ],
	[ ":mexico:",		"mexico.gif" ],
	[ ":scotland:",		"scotland.gif" ],
	[ ":spain:",		"spain.gif" ],
	[ ":sweden:",		"sweden.gif" ],
	[ ":ussr:",		"ussr.gif" ],
	[ ":wcw:",		"wcw.gif" ],
	[ ":wink:",		"wink.gif" ],
	[ ":question:",		"question.gif" ],
	[ ":bubblewoop:",		"bubblewoop.gif" ],
	[ ":dota101:",		"dota101.gif" ],
	[ ":golgo:",		"golgo.gif" ],
	[ ":ironicat:",		"ironicat.gif" ],
	[ ":laugh:",		"laugh.gif" ],
	[ ":lovewcc:",		"lovewcc.gif" ],
	[ ":mario:",		"mario.gif" ],
	[ ":megaman:",		"megaman.gif" ],
	[ ":mufasa:",		"mufasa.png" ],
	[ ":objection:",		"objection.gif" ],
	[ ":orks:",		"orks.gif" ],
	[ ":qirex:",		"qirex.gif" ],
	[ ":quagmire:",		"quagmire.gif" ],
	[ ":rudebox:",		"rudebox.gif" ],
	[ ":sg:",		"sg.gif" ],
	[ ":sharpton:",		"sharpton.gif" ],
	[ ":shopkeeper:",		"shopkeeper.gif" ],
	[ ":wcc:",		"wcc.gif" ],
	[ ":wookie:",		"wookie.gif" ],
	[ ":yoshi:",		"yoshi.gif" ],
	[ ":zoid:",		"zoid.gif" ],
	[ ":coolfish:",		"coolfish.gif" ],
];

//My style string
var phallic =
//Green Static background
'body {' +
'	background-image: url('+ THEBACKGROUND +') ! important;' +
'	background-color: #111 ! important;' +
'	background-repeat: repeat ! important;' +
'	color: #000 ! important;' +
'	font: 13px System ! important;' +
'	margin: 0px 20px ! important;' +
'}' +

'a:link {' +
'	color: #0A0 ! important;' +
'}' +

'a:hover, a:active {' +
'	color: #F00 ! important;' +
'	cursor: url(\'ncur.cur\'),auto ! important;' +
'}' +

'a:visited {' +
'	color: #0F0 ! important;' +
'}' +

'.page {' +
'	background: transparent url('+ THEBACKGROUND +') repeat scroll 0% ! important;' +
'	border-left: 0px #888 solid ! important;' +
'	border-top: 0px #888 solid ! important;' +
'	border-right: 0px #888 solid ! important;' +
'	border-bottom: 1px #888 solid ! important;' +
'	color: #0F0 ! important;' +
'	cursor: url(\'ncur.cur\'),auto ! important;' +
'}' +

'td, th, p, li {' +
'	cursor: url(\'ncur.cur\'),auto ! important;' +
'}' +

'.tborder {' +
'	background-color: #070 ! important;' +
'	color: #5C5 ! important;' +
'	cursor: url(\'ncur.cur\'),auto ! important;' +
'}' +

'.tcat {' +
'	background-color: #FFAAAA ! important;' +
'	color: #111 ! important;' +
'	cursor: url(\'ncur.cur\'),auto ! important;' +
'}' +

'.tcat a:link {' +
'	color: #FFF ! important;' +
'}' +

'.tcat a:visited {' +
'	color: #FFF ! important;' +
'}' +

'.tcat a:hover, .tcat a:active {' +
'	color: #FFF ! important;' +
'}' +

'.thead {' +
'	background-color: #FFAA00 ! important;' +
'	border-left: 1px #888 solid ! important;' +
'	border-top: 1px #888 solid ! important;' +
'	border-right: 1px #888 solid ! important;' +
'	border-bottom: 1px #888 solid ! important;' +
'	color: #eee ! important;' +
'	cursor: url(\'ncur.cur\'),auto ! important;' +
'}' +

'.thead a:link {' +
'	color: #eee ! important;' +
'}' +

'.thead a:visited {' +
'	color: #eee ! important;' +
'}' +

'.thead a:hover, .thead a:active {' +
'	color: #fff ! important;' +
'}' +

'.tfoot {' +
'	background-color: #333 ! important;' +
'	color: #888 ! important;' +
'}' +

'td.tfoot {' +
'	background-color: #fa0 ! important;' +
'	color: #888 ! important;' +
'}' +

'.alt1, .alt1Active {' +
'	background-color: #335533 ! important;' +
'	color: #00AA00 ! important;' +
'	border-left: 1px #888 solid ! important;' +
'	border-top: 1px #888 solid ! important;' +
'	border-bottom: 1px #888 solid ! important;' +
'	border-right: 1px #888 solid ! important;' +
'}' +

'.alt1 A, .alt1Active A {' +
'	color: #00AA00 ! important;' +
'}' +

//Banlist Hack
'TD.alt1 DIV A:visited, TD.alt1Active DIV A:visited {' +
'	color: #00DD00 ! important;' +
'}' +

'.alt2, .alt2Active {' +
'	background-color: #040 ! important;' +
'	color: #000 ! important;' +
'}' +

'.alt2 A, .alt2Active A {' +
'	color: #00AA00 ! important;' +
'}' +

'.wysiwyg {' +
'	background-color: #F5F5F5 ! important;' +
'	color: #000000 ! important;' +
'}' +

'.button {' +
'	background-color: #111 ! important;' +
'	color: #181 ! important;' +
'	border: 1px #888 dotted ! important;' +
'}' +

'.smallfont {' +
'	color: #ddd ! important;' +
'}' +

//Your login info
'DIV.smallfont {' +
'	color: #222222 ! important;' +
'}' +

//VB Copyrights
'FORM DIV DIV.smallfont {' +
'	color: #ddd ! important;' +
'}' +

'.time {' +
'	color: #FFF ! important;' +
'}' +

//Highlight Tags
'.highlight {' +
'	color: #FF0000 ! important;' +
'}' +

'.fjsel {' +
'	background-color: #1B4CA2 ! important;' +
'	color: #FFFFFF ! important;' +
'}' +

'.fjdpth0 {' +
'	background-color: #F7F7F7 ! important;' +
'	color: #000000 ! important;' +
'}' +

'.panel {' +
'	color: #000000 ! important;' +
'}' +

//Houses Quick Reply
'.panelsurround {' +
'	background-image: url() ! important;' +
'	color: #000000 ! important;' +
'	background-color: #030 ! important;' +
'	border-left: 1px #888888 solid ! important;' +
'	border-top: 0px #888888 solid ! important;' +
'	border-bottom: 0px #888888 solid ! important;' +
'	border-right: 1px #888888 solid ! important;' +
'}' +

//No IDea
'legend {' +
'	color: #a00 ! important;' +
'}' +

'.vbmenu_control {' +
'	color: #ddd ! important;' +
'	background-color: #00AA22 ! important;' +
'	border-left: 1px #55BB99 solid ! important;' +
'	border-top: 1px #55BB99 solid ! important;' +
'	border-bottom: 1px #009933 solid ! important;' +
'	border-right: 1px #009933 solid ! important;' +
'}' +

'.vbmenu_control a:link {' +
'	color: #ccc ! important;' +
'}' +

'.vbmenu_control a:visited {' +
'	color: #ccc ! important;' +
'}' +

'.vbmenu_control a:hover, .vbmenu_control a:active {' +
'	color: #800 ! important;' +
'}' +

'.vbmenu_popup {' +
'	color: #060 ! important;' +
'	background-color: #040 ! important;' +
'	border-left: 1px #888 solid ! important;' +
'	border-top: 1px #888 solid ! important;' +
'	border-bottom: 1px #888 solid ! important;' +
'	border-right: 1px #888 solid ! important;' +
'}' +

'.vbmenu_option {' +
'	background: #000 url(/images/as/pin_light.gif); ! important;' +
'	color: #060 ! important;' +
'	cursor: pointer ! important;' +
'}' +

'.vbmenu_option a:link {' +
'	color: #1B4CA2 ! important;' +
'}' +

'.vbmenu_option a:visited {' +
'	color: #1B4CA2 ! important;' +
'}' +

'.vbmenu_option a:hover, .vbmenu_option a:active {' +
'	color: #FFFFFF ! important;' +
'}' +

'.vbmenu_hilite {' +
'	background: #1B4CA2 url(/images/as/pin_blue.gif) ! important;' +
'	color: #FFFFFF ! important;' +
'	cursor: pointer ! important;' +
'}' +

'.vbmenu_hilite a:link {' +
'	color: #FFFFFF ! important;' +
'}' +

'.vbmenu_hilite a:visited {' +
'	color: #FFFFFF ! important;' +
'}' +

'.vbmenu_hilite a:hover, .vbmenu_hilite a:active {' +
'	color: #FFFFFF ! important;' +
'}' +

'.tableborder {' +
'	background-color: #f00 ! important;' +
'	color: #000000 ! important;' +
'}' +

'.toolbar {' +
'	background: url() ! important;' +
'	background-color: #222 ! important;' +
'	color: #111 ! important;' +
'	border-top: 1px #090 solid ! important;' +
'	border-bottom: 1px #888 solid ! important;' +
'}' +

'#toolbar {' +
'	background: url() ! important;' +
'	background: #01A3E5 ! important;' +
'	color: #ddd ! important;' +
'}' +

'#toolbar a {' +
'	color: #ddd ! important;' +
'}' +

'.quotename {' +
'	color: #171 ! important;' +
'	border: 1px #aaa dotted ! important;' +
'	border-bottom: 0px ! important;' +
'	background: #222 ! important;' +
'	font: 13px System ! important;' +
'}' +

'.quote {' +
'	color: #181 ! important;' +
'	background: #111 ! important;' +
'	font: 13px System ! important;' +
'}' +

'.sticky {' +
'	background-color: #050 ! important;' +
'}' +

'.locked {' +
'	background-color: #000 ! important;' +
'}' +

'.announce {' +
'	background-color: #040 ! important;' +
'}' +

//Fixed colors as per update 14
'DIV.mediabox {' +
'	color: #080 ! important;' +
'	background-color: #111 ! important;' +
'	border: 1px solid #888 ! important;' +
'	background-image: url() ! important;' +
'}' +

//Shows a users total ratings
'#Rate_It_Popup {' +
'	color: #080 ! important;' +
'	background-color: #444 ! important;' +
'	border: 1px solid #222 ! important;' +
'	opacity: 0.96 ! important;' +
'	filter: Alpha(opacity=96) ! important;' +
'}' +

'DIV.rateit_namebox {' +
'	background-color: #FFAA00 ! important;' +
'	border: 1px solid #FFFF0D ! important;' +
'}' +

'DIV.rate_it DIV.rate_text_line {' +
'	background-color: #335533 ! important;' +
'	border-left: 1px #FFFF0D solid ! important;' +
'	border-top: 1px #FFFF0D solid ! important;' +
'	border-bottom: 1px #FFFF0D solid ! important;' +
'	border-right: 1px #FFFF0D solid ! important;' +
'	color: #911 ! important;' +
'	background-color: #224422 ! important;' +
'}' +

//Basic rateing numbers
'DIV.rate_it_display, DIV.rate_it_display_box, DIV.rate_it_thread {' +
'	color: #ddd ! important;' +
'}' +

//Global post rating box
'#Rate_It_Popup DIV DIV.rate_it_display_box A{' +
'	color: #ddd ! important;' +
//'	white-space: nowrap;' +
'}' +

'DIV.rate_it_display_names {' +
'	color: #ddd ! important;' +
'	border: 1px solid #FFFF0D ! important;' +
'}' +

'DIV.rate_it_display_names A{' +
'	color: #333333 ! important;' +
'}' +

'DIV.rate_it_display_names A:visited{' +
'	color: #FF0000 ! important;' +
'}' +

'DIV.rate_it_display_names:hover {' +
'	background-color: #0066BB ! important;' +
'	border-left: 1px #5599BB solid ! important;' +
'	border-top: 1px #6699BB solid ! important;' +
'	border-bottom: 1px #003399 solid ! important;' +
'	border-right: 1px #003388 solid ! important;' +
'}' +

//Killed Garry's image, and added transparency.
'DIV.rate_bar {' +
'	color: #ddd ! important;' +
'	background-image: url() ! important;' +
'	background-color: #0066BB ! important;' +
'	border-left: 1px #5599BB solid ! important;' +
'	border-top: 1px #6699BB solid ! important;' +
'	border-bottom: 1px #003399 solid ! important;' +
'	border-right: 1px #003388 solid ! important;' +
'	opacity: 0.8 ! important;' +
'	filter: Alpha(opacity=80) ! important;' +
'	width: 135px ! important;' +
'	height: 100px ! important;' +
'}' +

//Neat Rate Hover SHit
'DIV.inner A.rate_button:hover {' +
'	opacity: 0.7 ! important;' +
'	filter: Alpha(opacity=70) ! important;' +
'}' +

'DIV.rate_bar DIV.inner{' +
'	padding: 0px' +
'}' +

'DIV.inner DIV.rate_text {' +
'	white-space: nowrap;' +
'}' +

'DIV.SpecialPages {' +
'	background-color: #111 ! important;' +
'	border: 1px solid #01A3E5 ! important;' +
'}' +

'A.disabledlink {' +
'	color: #aaa ! important;' +
'}' +

//New Thread
'.cbutton {' +
'	color: #fff ! important;' +
'	background-color: #0066BB ! important;' +
'	border-left: 1px #5599BB solid ! important;' +
'	border-top: 1px #6699BB solid ! important;' +
'	border-bottom: 1px #003399 solid ! important;' +
'	border-right: 1px #003388 solid ! important;' +
'}' +

'.cbutton:hover {' +
'	color: #FFFFFF ! important;' +
'}' +

'.cbutton a:link {' +
'	color: #FFFFFF ! important;' +
'}' +

'.cbutton a:visited {' +
'	color: #FFFFFF ! important;' +
'}' +

'.cbutton a:hover, .vbmenu_control a:active {' +
'	color: #FFFFFF ! important;' +
'}' +

'#navbar {' +
'	background-color: #FFFF00;' +
'	border-style: dashed;' +
//'	border: 1px solid #FFAA00 ! important;' +
'	border-color: #FE0100;' +
'	border-width: 10px;' +
'	background: #FFFF00;' +
'}' +

'.tpagnav, .tpagnavdisabled {' +
'	background-color: #01A3E5 ! important;' +
'	border-left: 0px #050 solid ! important;' +
'	border-top: 0px #050 solid ! important;' +
'	border-bottom: 0px #050 solid ! important;' +
'	border-right: 0px #050 solid ! important;' +
'	background-color: #0a0a0a ! important;' +
'}' +

'.tpagnavdisabled A {' +
'	color: #500 ! important;' +
'}' +

//Odd numbered threads (forumdisplay.php)
'TD.thread {' +
'	background-color: #338833 ! important;' +
'	border: 0px solid #888 ! important;' +
'}' +

//Even numbered threads (forumdisplay.php)
'TD.threadb{' +
'	background-color: #335533 ! important;' +
'	border: 0px solid #888 ! important;' +
'}' +

//Odd numbered thread info (forumdisplay.php)
'TD.thread_small {' +
'	background-color: #335533 ! important;' +
'	border: 0px solid #888 ! important;' +
'}' +

//Even numbered thread info (forumdisplay.php)
'TD.thread_smallb {' +
'	background-color: #338833 ! important;' +
'	border: 0px solid #888 ! important;' +
'}' +

'TD.threadsticky{' +
'	background-color: #f8c850 ! important;' +
'	border: 0px solid #888 ! important;' +
'}' +

'TD.threadbsticky{' +
'	background-color: #d8b850 ! important;' +
'	border: 0px solid #888 ! important;' +
'}' +

'TD.thread_smallsticky {' +
'	background-color: #d8b850 ! important;' +
'	border: 0px solid #888 ! important;' +
'}' +

'TD.thread_smallbsticky {' +
'	background-color: #f8c850 ! important;' +
'	border: 0px solid #888 ! important;' +
'}' +

'TD.threadold {' +
'	background-color: #101010 ! important;' +
'	border: 0px solid #888 ! important;' +
'}' +

'TD.threadbold{' +
'	background-color: #202020 ! important;' +
'	border: 0px solid #888 ! important;' +
'}' +

'TD.thread_smallold {' +
'	background-color: #202020 ! important;' +
'	border: 0px solid #888 ! important;' +
'}' +

'TD.thread_smallbold {' +
'	background-color: #101010 ! important;' +
'	border: 0px solid #888 ! important;' +
'}' +

'TD.threaddeleted {' +
'	background-color: #200000 ! important;' +
'	border: 0px solid #888 ! important;' +
'}' +

'TD.threaddeleted_small{' +
'	background-color: #300000 ! important;' +
'	border: 0px solid #888 ! important;' +
'}' +

//Thread Links
'TD.thread A:visited, TD.threadb A:visited, TD.thread_small A:visited, TD.thread_smallb A:visited{' +
'	color: #0d0 ! important;' +
'}' +

'TD.thread A, TD.thread_smallb A {' +
'	color: #335533 ! important;' +
'}' +

'TD.threadb A, TD.thread_small A {' +
'	color: #338833 ! important;' +
'}' +

//Older Thread Links
'TD.threadold A:visited, TD.thread_smallbold A:visited {' +
'	color: #337733 ! important;' +
'}' +

'TD.threadbold A:visited, TD.thread_smallold A:visited {' +
'	color: #33AA33 ! important;' +
'}' +

'TD.threadold A, TD.thread_smallbold A {' +
'	color: #335533 ! important;' +
'}' +

'TD.threadbold A, TD.thread_smallold A {' +
'	color: #338833 ! important;' +
'}' +

//How many new posts a thread has
'DIV.newposts {' +
'	background-image: url( \'images/smilies/emot-sax.png\' ) ! important;' +
'	background-color: #FFAA00 ! important;' +
'	border: 1px solid #888888 ! important;' +
//'	padding: 4px 4px 4px 30px ! important;' +
'}' +

'DIV.newposts:hover {' +
'	background-color: #202020 ! important;' +
'	border-color: #888 ! important;' +
'}' +

'DIV.newposts A {' +
'	color: #f00 ! important;' +
'}' +

'DIV.newposts A:visited {' +
'	color: #f00 ! important;' +
'}' +

//Post SHit
'DIV.postbit {' +
'	width: 100% ! important;' +
'	background-image: url() ! important;' +
'	background-repeat: repeat-n ! important;' +
'	color: #fff ! important;' +
'	background-color: #335533 ! important;' +
'	overflow: hidden ! important;' +
'	border-left: 1px #FFFF0D solid ! important;' +
'	border-top: 0px #FFFF0D solid ! important;' +
'	border-bottom: 1px #FFFF0D solid ! important;' +
'	border-right: 1px #FFFF0D solid ! important;' +
'	margin-bottom: 12px ! important;' +
'	margin-top: 12px ! important;' +
'}' +

'DIV.postbitalt {' +
'	background-color: #335533 ! important;' +
'	border-left: 0px solid #888 ! important;' +
'	border-right: 0px solid #888 ! important;' +
'}' +

'DIV.postbitalt {' +
'	background-color: #3e3e3e ! important;' +
'}' +


'DIV.postbit div.message {' +
//'	margin-left:150px ! important;' +
'}' +


//Message Text
'DIV.postbit div.message div.messagetext {' +
'	color: #fff ! important;' +
'	background-color: #335533 ! important;' +
'}' +

//Release Tags
'DIV.postbit div.message div.messagetext div {' +
'	color: #161 ! important;' +
'}' +

//Time posted, and my post-hider button
'DIV.postbit div.header {' +
//'	background-image: url( \'http://garry.tv/img/str2.gif\' ) ! important;' +
'	background-color: #FFAA00 ! important;' +
'	color: #333333 ! important;' +
'	border-left: 0px #090 solid ! important;' +
'	border-top: 1px #FFFF0D solid ! important;' +
'	border-bottom: 1px #FFFF0D solid ! important;' +
'	border-right: 0px #090 solid ! important;' +
'}' +

//User Info
'DIV.postbit div.userinfo {' +
'	background-color: #224422 ! important;' +
'	border-left: 0px #FFFF0D solid ! important;' +
'	border-top: 0px #FFFF0D solid ! important;' +
'	border-bottom: 0px #FFFF0D solid ! important;' +
'	border-right: 1px #FFFF0D solid ! important;' +
'	padding-bottom: 32767px ! important;' +
'	margin-bottom: -32767px ! important;' +
'}' +

//Reply, edit, and reporting
'DIV.postbit div.footer {' +
'	background-color: #335533 ! important;' +
'	border-left: 0px #FFFF0D solid ! important;' +
'	border-top: 1px #FFFF0D solid ! important;' +
'	border-bottom: 0px #FFFF0D solid ! important;' +
'	border-right: 0px #FFFF0D solid ! important;' +
'	padding-left: 160px ! important;' +
'}' +

'DIV.postbit div.header A {' +
'	color: #fff ! important;' +
'}' +

//New shit, subject to change
//Post SHit
'DIV.postbitnew {' +
'	width: 100% ! important;' +
'	background-image: url() ! important;' +
'	background-repeat: repeat-n ! important;' +
'	color: #fff ! important;' +
'	background-color: #335533 ! important;' +
'	overflow: hidden ! important;' +
'	border-left: 1px #FFFF0D solid ! important;' +
'	border-top: 0px #FFFF0D solid ! important;' +
'	border-bottom: 1px #FFFF0D solid ! important;' +
'	border-right: 1px #FFFF0D solid ! important;' +
'	margin-bottom: 12px ! important;' +
'	margin-top: 12px ! important;' +
'}' +

'DIV.postbitnew div.message {' +
//'	margin-left:150px ! important;' +
'}' +

//Message Text
'DIV.postbitnew div.message div.messagetext {' +
'	color: #fff ! important;' +
'	background-color: #335533 ! important;' +
'}' +

//Release Tags
'DIV.postbitnew div.message div.messagetext div {' +
'	color: #161 ! important;' +
'}' +

//Time posted, and my post-hider button
'DIV.postbitnew div.header {' +
//'	background-image: url( \'http://garry.tv/img/str2.gif\' ) ! important;' +
'	background-color: #FFAA00 ! important;' +
'	color: #333333 ! important;' +
'	border-left: 0px #090 solid ! important;' +
'	border-top: 1px #FFFF0D solid ! important;' +
'	border-bottom: 1px #FFFF0D solid ! important;' +
'	border-right: 0px #090 solid ! important;' +
'}' +

//User Info
'DIV.postbitnew div.userinfo {' +
'	background-color: #224422 ! important;' +
'	border-left: 0px #FFFF0D solid ! important;' +
'	border-top: 0px #FFFF0D solid ! important;' +
'	border-bottom: 0px #FFFF0D solid ! important;' +
'	border-right: 1px #FFFF0D solid ! important;' +
'	padding-bottom: 32767px ! important;' +
'	margin-bottom: -32767px ! important;' +
'}' +

//Reply, edit, and reporting
'DIV.postbitnew div.footer {' +
'	background-color: #335533 ! important;' +
'	border-left: 0px #FFFF0D solid ! important;' +
'	border-top: 1px #FFFF0D solid ! important;' +
'	border-bottom: 0px #FFFF0D solid ! important;' +
'	border-right: 0px #FFFF0D solid ! important;' +
'	padding-left: 160px ! important;' +
'}' +

'DIV.postbitnew div.header A {' +
'	color: #fff ! important;' +
'}' +

//ENd new shit

// above but for postbitold
//New shit, subject to change
//Post SHit
'DIV.postbitold {' +
'	width: 100% ! important;' +
'	background-image: url() ! important;' +
'	background-repeat: repeat-n ! important;' +
'	color: #fff ! important;' +
'	background-color: #335533 ! important;' +
'	overflow: hidden ! important;' +
'	border-left: 1px #FFFF0D solid ! important;' +
'	border-top: 0px #FFFF0D solid ! important;' +
'	border-bottom: 1px #FFFF0D solid ! important;' +
'	border-right: 1px #FFFF0D solid ! important;' +
'	margin-bottom: 12px ! important;' +
'	margin-top: 12px ! important;' +
'}' +

'DIV.postbitold div.message {' +
//'	margin-left:150px ! important;' +
'}' +

//Message Text
'DIV.postbitold div.message div.messagetext {' +
'	color: #fff ! important;' +
'	background-color: #335533 ! important;' +
'}' +

//Release Tags
'DIV.postbitold div.message div.messagetext div {' +
'	color: #161 ! important;' +
'}' +

//Time posted, and my post-hider button
'DIV.postbitold div.header {' +
//'	background-image: url( \'http://garry.tv/img/str2.gif\' ) ! important;' +
'	background-color: #FFAA00 ! important;' +
'	color: #333333 ! important;' +
'	border-left: 0px #090 solid ! important;' +
'	border-top: 1px #FFFF0D solid ! important;' +
'	border-bottom: 1px #FFFF0D solid ! important;' +
'	border-right: 0px #090 solid ! important;' +
'}' +

//User Info
'DIV.postbitold div.userinfo {' +
'	background-color: #224422 ! important;' +
'	border-left: 0px #FFFF0D solid ! important;' +
'	border-top: 0px #FFFF0D solid ! important;' +
'	border-bottom: 0px #FFFF0D solid ! important;' +
'	border-right: 1px #FFFF0D solid ! important;' +
'	padding-bottom: 32767px ! important;' +
'	margin-bottom: -32767px ! important;' +
'}' +

//Reply, edit, and reporting
'DIV.postbitold div.footer {' +
'	background-color: #335533 ! important;' +
'	border-left: 0px #FFFF0D solid ! important;' +
'	border-top: 1px #FFFF0D solid ! important;' +
'	border-bottom: 0px #FFFF0D solid ! important;' +
'	border-right: 0px #FFFF0D solid ! important;' +
'	padding-left: 160px ! important;' +
'}' +

'DIV.postbitold div.header A {' +
'	color: #fff ! important;' +
'}' +

//ENd new shit
// end postbitold



'td.vBulletin_editor {' +
'	background-color: #444 ! important;' +
'	color: #ddd ! important;' +
'}' +

//White, as per request.
'textarea {' +
'	background-color: #fff ! important;' +
'	color: #111 ! important;' +
'	border-left: 1px #777 solid ! important;' +
'	border-top: 1px #777 solid ! important;' +
'	border-bottom: 1px #777 solid ! important;' +
'	border-right: 1px #777 solid ! important;' +
'}' +

//DOn't remember
'table {' +
'	background-color: #335533 ! important;' +
'	color: #111 ! important;' +
'	border-left: 0px #777 solid ! important;' +
'	border-top: 0px #777 solid ! important;' +
'	border-bottom: 0px #777 solid ! important;' +
'	border-right: 0px #777 solid ! important;' +
'}' +

//Fixes CODE TAGS, makes it legible.
'.code {' +
'	background-color: #111 ! important;' +
'	color: #ddd ! important;' +
'}' +

//Lua Tags
'.lua {' +
'	background-color: #111 ! important;' +
'	color: #ddd ! important;' +
'}' +

//? people viewing crap
'span.threadviewers {' +
'	background-color: #111 ! important;' +
'	color: #090 ! important;' +
'	border: 1px solid #090 ! important;' +
'	float: right ! important;' +
'	margin-top: -13px ! important;' +
'	margin-right: 80px ! important;' +
'}' +

//fixes shitty fonts in Iframes, among other things.
'html {' +
'	font: 13px System ! important;' +
'	color: #eee ! important;' +
'}' +

'#posts {' +
'	border-left: 0px #FFFF0D solid ! important;' +
'	border-top: 0px #FFFF0D solid ! important;' +
'	border-bottom: 0px #FFFF0D solid ! important;' +
'	border-right: 0px #FFFF0D solid ! important;' +
'}' +

//Experimental
'INPUT.bginput, TEXTAREA {' +
'	border-left: 0px #FFFF0D solid ! important;' +
'	border-top: 0px #FFFF0D solid ! important;' +
'	border-bottom: 0px #FFFF0D solid ! important;' +
'	border-right: 0px #FFFF0D solid ! important;' +
'}' +

'table, div, p, body, a, tr, td, span, thead, strong, form, input, textarea, select, option, optgroup, legend {' +
'	cursor: url(\'ncur.cur\'),auto ! important;' +
'}'
//END

//Missing Scripts
var pooscr =
//'var currentPost = window.location.hash;' +
'var MouseX = 0;' +
'var MouseY = 0;' +

//make fancy menus rawr
"function CreateFloatingDiv2( x, y, id , color)" +
"{" +
"	var Exists = $( '#'+id );" +
"	if ( Exists[0] )" +
"	{	" +
"		Exists[0].style.left = x + 'px';" +
"		Exists[0].style.top = y + 'px';" +
"		Exists[0].style.display = 'none';" +
"		Exists.show( 'fast' );" +
"		return;" +
"	}" +
"	" +
"	var div = document.createElement( 'div' );" +
"	div.style.left = x + 'px';" +
"	div.style.top = y + 'px';" +
"	div.style.position = \"absolute\";" +
"	div.style.background = color;" +
"	div.style.border = \"1px solid #777\";" +
"	div.style.padding = '5px';" +
"	div.style.color = '#555';" +
"	div.style.fontSize = '11px';" +
"	div.style.display = 'none';" +
"	div.className = \"top\";" +
"	div.id = id;" +
"	" +
"	document.body.appendChild( div );" +
"	" +
"	$( div ).show( 'fast' );" +
"	" +
"	return div;" +
"}" +

'function ToggleDiv( id, $name, color ) {' +
'	panel = fetch_object( id );' +
'	var div = CreateFloatingDiv2( MouseX, MouseY, $name, color );' +
'	if (!div) return false;' +
'	' +
'	div.innerHTML += panel.innerHTML;' +
//'	$(div).click( function(){ $(div).hide(); } );' +
'	' +
'	$( div ).show( \'fast\' );' +

/*'	if (!panel) return false;' +

'	if (panel.style.display == \'none\') {' +
'		panel.style.display = \'block\';' +
'		if ( bPosition ) {' +
'			if (panel.className == \'rate_bar\' ) {' +
'				panel.style.left = MouseX + \'px\';' +
'				panel.style.top = (MouseY - 60)+ \'px\';' +
'			}' +
'			else {' +
'				panel.style.left = MouseX + \'px\';' +
'				panel.style.top = MouseY + \'px\';' +
'			};' +
'		};' +
'	}' +
'	else {' +
'		panel.style.display = \'none\';' +
'	}' +
'	return false;' +*/
'};';



//Below this are not default crap, either I made them or modified them from Garry's Scripts.
var custpooscr =
/*
//old shit
//The Post Hider Crap
'function TogglePost( id ) {' +
'	panel = fetch_object( id );' +
'	if (!panel) return false;' +

'	if (panel.childNodes[3].style.display == \'none\') {' +
'		panel.childNodes[3].style.display = \'\';' +
'		panel.childNodes[5].style.display = \'\';' +
'		panel.childNodes[7].style.display = \'\';' +
'	}' +
'	else {' +
'		panel.childNodes[3].style.display = \'none\';' +
'		panel.childNodes[5].style.display = \'none\';' +
'		panel.childNodes[7].style.display = \'none\';' +
'	}' +

'	return false;' +
'};' +
*/
// new post hide script
'function TogglePost(obj) {' +
'	var el = document.getElementById(obj);' +
'	if ( el.childNodes[1].childNodes[3].style.display != \'none\' ) {' +
'		el.childNodes[1].childNodes[3].style.display = \'none\';' +
'		el.childNodes[1].childNodes[5].style.display = \'none\';' +
'		el.childNodes[1].childNodes[7].style.display = \'none\';' +
'	}' +
'	else {' +
'		el.childNodes[1].childNodes[3].style.display = \'\';' +
'		el.childNodes[1].childNodes[5].style.display = \'\';' +
'		el.childNodes[1].childNodes[7].style.display = \'\';' +
'	}' +
'};'+

//This works better for most stuff, like tables
'function ToggleElementEX( id ) {' +
'	panel = fetch_object( id );' +
'	if (!panel) return false;' +

'	if (panel.style.display == \'none\') {' +
'		panel.style.display = \'\';' +
'	}' +
'	else {' +
'		panel.style.display = \'none\';' +
'	}' +

'	return false;' +
'};';

//Check if this is really facepunchstudios forum, because people are retarded, and I can't code for shit.
var thedomain, comparison;
var	bodyel = document.getElementsByTagName('body')[0];
thedomain = window.location.host;
comparison = thedomain.search(/www.facepunch.com/)
if(comparison == -1 ){ return; }

//A bunch of vars
var shitlist = GM_getValue("slistarray", '999999999,111111111');
shitlist = shitlist.split(',')
var tshitlist = GM_getValue("tblistarray", '1,2');
tshitlist = tshitlist.split(',')
var myfnlocation = window.location.href
var thegoggles = 'THEY DO NOTHING!'

// filched from Ain't It Readable
// http://diveintomark.org/projects/greasemonkey/
// This overrides the default style with my whatever I want.
function stylemolest(css) {
	var head, style, magicalico;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

//OIFY CHECK (old)
/*var isoify = false
if ( document.evaluate("//link[@href='/OIFY.css']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0 ) {
	isoify = true
};*/

//OIFY CHECK
var isoify = false
if ( document.evaluate("//link[contains(@href,'/fp/styles-oify.css')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0 ) {
	isoify = true
};

//Check if the menus work
if (!GM_registerMenuCommand) {
    alert('Please upgrade to the latest version of Greasemonkey, dumbass!');
    return;
}




//Define the functions
//resizers
unsafeWindow.toggleresizetexts =function( e ) {
	//Begin Gay wrapper
	window.setTimeout(function() {
	if (GM_getValue("resizetexts", true ) == true ){
		GM_setValue("resizetexts", false );
		alert('Text box resizing disabled');
		return;
	};
	if (GM_getValue("resizetexts", true ) == false ){
		GM_setValue("resizetexts", true );
		alert('Text box resizing enabled');
		return;
	};
	}, 0);
};

unsafeWindow.toggleresizeiframes =function( e ) {
	//Begin Gay wrapper
	window.setTimeout(function() {
	if (GM_getValue("resizeiframes", true ) == true ){
		GM_setValue("resizeiframes", false );
		alert('Iframe resizing disabled');
		return;
	};
	if (GM_getValue("resizeiframes", true ) == false ){
		GM_setValue("resizeiframes", true );
		alert('Iframe resizing enabled');
		return;
	};
	}, 0);
};

unsafeWindow.toggleresizeimages =function( e ) {
	//Begin Gay wrapper
	window.setTimeout(function() {
	if (GM_getValue("resizeimages", false ) == true ){
		GM_setValue("resizeimages", false );
		alert('Image resizing disabled');
		return;
	};
	if (GM_getValue("resizeimages", false ) == false ){
		GM_setValue("resizeimages", true );
		alert('Image resizing enabled');
		return;
	};
	}, 0);
};
//Facepunch skinning
unsafeWindow.togglefpskin =function( e ) {
	//Begin Gay wrapper
	window.setTimeout(function() {
	var oifyskinng = confirm('Use the Modded Classic skin in the OIFY?')
	//var thegayhous = confirm('Use the Excellent Mouse Cursor?')
	var mybackgrod = prompt("Enter a URL for a Background Image (Blank for none)", "http://www.garry.tv/img/trip/gr-bk.gif");
	
	if ( oifyskinng ){
		GM_setValue("oifyskin", true );
		alert('OIFY Skin Enabled');
	} else {
		GM_setValue("oifyskin", false );
		alert('OIFY Skin Disabled');
	};
	
	GM_setValue("magicalback", mybackgrod );
	//End Gay wrapper
	}, 0);
};

//Asshole blocklist toggle
unsafeWindow.togglehitlist =function( e ) {
	//Begin Gay wrapper
	window.setTimeout(function() {
	if (GM_getValue("hitlist", true ) == true ){
		GM_setValue("hitlist", false );
		alert('Blacklist Disabled');
		return;
	};
	if (GM_getValue("hitlist", true ) == false ){
		GM_setValue("hitlist", true );
		alert('Blacklist Enabled');
		return;
	};
	}, 0);
};

//Block Notify toggle
function togglenotify( e ) {

	if (GM_getValue("blocknotify", false ) == true ){
		GM_setValue("blocknotify", false );
		alert('Blacklist Notifications Disabled');
		return;
	};
	if (GM_getValue("blocknotify", false ) == false ){
		GM_setValue("blocknotify", true );
		alert('Blacklist Notifications Enabled');
		return;
	};
};

//User Panel toggle
unsafeWindow.toggleupanel =function( e ) {
	//Begin Gay wrapper
	window.setTimeout(function() {
	if (GM_getValue("upanel", true ) == true ){
		GM_setValue("upanel", false );
		alert('User Panel Disabled');
		return;
	};
	if (GM_getValue("upanel", true ) == false ){
		GM_setValue("upanel", true );
		alert('User Panel Enabled');
		return;
	};
	}, 0);
};

// thread blacklist
unsafeWindow.managetblist = function( threadid ) {
	//Begin Gay wrapper
	window.setTimeout(function() {
	var name = threadid;
	var realshitlist = GM_getValue("tblistarray", '1,2');
	realshitlist = realshitlist.split(',')
	var finished = false;
	
	for (var x=0; x<realshitlist.length; x++) {
		var thisblistitem = realshitlist[x];
		
		if ( name == thisblistitem ) {
			var willyou = confirm('Are you sure you want to remove thread ID #' + name + ' from the blacklist?')
			if (willyou){
				alert('Thread ID#' + name + ' is now no longer in the blacklist. Refresh the page to see the changes.');
				realshitlist.splice(x,1);
				var thefork = realshitlist.toString()
				GM_setValue("tblistarray", thefork );
			}
			else{
				alert('Keeping ' + name);
			};
			finished = true;
		};
	};
	if ( !finished ) {
		var willyou = confirm('Add thread ID #' + name + ' to blacklist?')
		if (willyou){
			alert('Added thread ID #' + name + ' to the blacklist. Refresh the page to see the changes.');
			realshitlist[realshitlist.length] = name;
			var thefork = realshitlist.toString()
			GM_setValue("tblistarray", thefork );
		}
		else{
			alert('Didn\'t add ' + name);
		};
	};
	}, 0);
};

// user blacklist
unsafeWindow.manageublist = function( userid ) {
	//Begin Gay wrapper
	window.setTimeout(function() {
	var name = userid;
	var realshitlist = GM_getValue("slistarray", '999999999,111111111');
	realshitlist = realshitlist.split(',')
	var finished = false;
	
	for (var x=0; x<realshitlist.length; x++) {
		var thisblistitem = realshitlist[x];
		
		if ( name == thisblistitem ) {
			var willyou = confirm('Are you sure you want to remove User ID #' + name + ' from the blacklist?')
			if (willyou){
				alert('User ID#' + name + ' is no longer in the blacklist. Refresh the page to see the changes.');
				realshitlist.splice(x,1);
				var thefork = realshitlist.toString()
				GM_setValue("slistarray", thefork );
			}
			else{
				alert('Keeping User ID #' + name + 'in the blacklist');
			};
			finished = true;
		};
	};
	if ( !finished ) {
		var willyou = confirm('Add User ID #' + name + ' to blacklist?')
		if (willyou){
			alert('Added User ID #' + name + ' to the blacklist. Refresh the page to see the changes.');
			realshitlist[realshitlist.length] = name;
			var thefork = realshitlist.toString()
			GM_setValue("slistarray", thefork );
		}
		else{
			alert('Didn\'t add User ID #' + name);
		};
	};
	}, 0);
};

//Blacklisting
function manageblistnames( e ) {
	var name = prompt("Enter a Username", "Type the name here");
	var realshitlist = GM_getValue("slistarray", 'fake1,fake2');
	realshitlist = realshitlist.split(',')
	var finished = false;
	
	for (var x=0; x<shitlist.length; x++) {
		var thisblistitem = realshitlist[x];
		
		if ( name == thisblistitem ) {
			var willyou = confirm('User is already in the list, remove?')
			if (willyou){
				alert('Removed ' + name);
				realshitlist.splice(x,1);
				var thefork = realshitlist.toString()
				GM_setValue("slistarray", thefork );
			}
			else{
				alert('Keeping ' + name);
			};
			finished = true;
		};
	};
	if ( !finished ) {
		var willyou = confirm('Add user to blacklist?')
		if (willyou){
			alert('Added thread ID #' + name + ' to the blacklist.');
			realshitlist[realshitlist.length] = name;
			var thefork = realshitlist.toString()
			GM_setValue("slistarray", thefork );
		}
		else{
			alert('Didn\'t add thread ID #' + name + ' to the blacklist.');
		};
	};
};

//Unicoded threads
function toggleunicode( e ) {

	if (GM_getValue("ununicode", true ) == true ){
		GM_setValue("ununicode", false );
		alert('Retarded Characters Enabled');
		return;
	};
	if (GM_getValue("ununicode", true ) == false ){
		GM_setValue("ununicode", true );
		alert('Retarded Characters Disabled');
		return;
	};
};

//toggle postenhancer
unsafeWindow.togglepostenhancer = function( e ) {
	//Begin Gay wrapper
	window.setTimeout(function() {
		if (GM_getValue("postenhancer", true ) == true ){
			GM_setValue("postenhancer", false );
			alert('Emoticon and BBCode buttons disabled');
			return;
		};
		if (GM_getValue("postenhancer", true ) == false ){
			GM_setValue("postenhancer", true );
			alert('Emoticon and BBCode buttons enabled');
			return;
		};
	//End Gay wrapper
	}, 0);
};

//inhtml music toggle
//EPIC MUSIC BABY
unsafeWindow.togglepicmusic = function( e ) {
	//Begin Gay wrapper
	window.setTimeout(function() {
		if (GM_getValue("epicmusic", false ) == true ){
			GM_setValue("epicmusic", false );
			alert('Epic Music Disabled');
			return;
		};
		if (GM_getValue("epicmusic", false ) == false ){
			GM_setValue("epicmusic", true );
			alert('Epic Music Enabled');
			return;
		};
	//End Gay wrapper
	}, 0);
};

//Create the menus
/*GM_registerMenuCommand("Style CFG", togglefpskin)
GM_registerMenuCommand("User Panel", toggleupanel)
GM_registerMenuCommand("Retarded Characters", toggleunicode)
GM_registerMenuCommand("Blacklisting", togglehitlist)
GM_registerMenuCommand("Notify Blocks", togglenotify)
GM_registerMenuCommand("Manage Blacklist", manageblistnames)
GM_registerMenuCommand("Epic Music", toggepicmusic)*/

//make it the hottest place on the web - mm3guy
//i stole the html for the blinkey text from hl2ooooooooo or however many o's he had
if (isoify) {
var myvar, main, newElement;
main = document.getElementById('navbar');
myvar = '<blink><font color="#bb0000" size="+3">T</font><font color="#bb0000" size="+2">h</font><font color="#bb0000" size="+4"><b>i</b></font><font color="#bb0000" size="+2">s</font></blink><font size="+1"><i>is</i></font>   the <blink><font size="+4"><b><i><font color="#dd11bb">HOttEST</font></i></b></font></blink><blink><font color="#0033dd" size="+3"> place</font></blink> <font size="+2">ON THE </font><blink><font color="#0099dd" size="+3">Web </font></blink>';
if (main) {
    newElement = document.createElement('div');
    newElement.innerHTML = myvar;
	newElement.align = 'center';
    main.parentNode.insertBefore(newElement, main);
}
}
function $()
{
	var elements = new Array();
	for (var i = 0; i < arguments.length; i++)
	{
		var element = arguments[i];
		if (typeof element == 'string')
			element = document.getElementById(element);
		if (arguments.length == 1)
			return element;
		elements.push(element);
	}
	return elements;
}
function $A(iterable)
{
	if (!iterable)
	{
		return [];
	}
	if (iterable.toArray)
	{
		return iterable.toArray();
	}
	var length = iterable.length || 0, results = new Array(length); 
	while (length--)
	{
		results[length] = iterable[length];
	}
	return results;
}

var Event = {
	add: function( t, ev, fn )
	{
		var t = $(t);
		if( typeof document.addEventListener != "undefined" )
		{
			t.addEventListener( ev, fn, false)
		}else
		{
			t.attachEvent( "on"+ev, fn )
		}
	},
	remove: function( t, ev, fn )
	{
		var t = $(t);
		if( typeof document.removeEventListener != "undefined" )
		{
			t.removeEventListener( ev, fn, false )
		}else
		{
			t.detachEvent( "on"+ev, fn )
		}
	}
};
var Dom = {
	add: function( dest, type, debug )
	{
		var el = document.createElement( type );
		var dest = $(dest);
		if( debug )
		{
			where( dest );
		}
		dest.appendChild(el);
		return el;
	},
	addText: function( dest, text )
	{
		var node = document.createTextNode( text );
		var dest = $(dest);
		dest.appendChild(node);
		return node;
	},
	remove: function( el )
	{
		var el = $(el);
		el.parentNode.removeChild(el);
	},
	removeAll: function( el )
	{
		el = $(el);
		if( el.hasChildNodes() )
		{
			while( el.childNodes.length >= 1 )
			{
				Dom.remove( el.firstChild );       
			} 
		}
	}
}
Function.prototype.eventBind = function(object) {
	var __method = this, args = $A(arguments), object = args.shift();
	return function(event) {
		return __method.apply(object, [( event || window.event)].concat(args).concat($A(arguments)));
	}
}


//increase the image height limit
GM_addStyle( "IMG {   max-height: 99999px; }" );

//cosmic duck's style shit
GM_addStyle( ".tagbtn:link { background-color: #BBBBBB; border: 1px solid #888888; color: #000000; padding: 1px 3px; margin: 2px; text-decoration: none }"+
".tagbtn:hover { background-color: #CCCCCC; }" );
GM_addStyle(".messagetext a:link, .messagetext a:visited { text-decoration: underline } div.rate_bar { display: inline !important; position: static !important } div.rate_text { display: inline !important; }");
GM_addStyle(".blockimg IMG {    opacity: 0.40;    filter: alpha(opacity = 40); } .blockimg IMG:hover {    opacity: 1.0;    filter: alpha(opacity = 100); }");

//Extra User Crap
//arrg so convoluted -mm3guy
//offline users
ANONUPANEL = function(param) {
	var usersdats, thisuser, ntr, cloneddta, cloneuname, ntable, ntablebdy, tntd,poop;
	usersdats=document.evaluate("//a[contains(@class,'line')]",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
		
	for (var i = 0; i < usersdats.snapshotLength; i++) {
		thisuser = usersdats.snapshotItem(i);
		tehpostid = thisuser.parentNode.parentNode.parentNode.parentNode.id

		// buttonssss beta
		pageelem=document.evaluate("//div[@id='" + tehpostid + "']//div[@class='postmetajunk']",
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null);
		foundpageelem = pageelem.snapshotItem(0);

		newbuttons = document.createElement('a');
		cloneddta = thisuser.cloneNode(true);
		newbuttons.href = cloneddta.href.replace(/member.php\?/gi, "profile.php?do=addlist&userlist=buddy&");
		newbuttons.innerHTML = '<img src="http://www.facepunch.com/fp/navbar/note_socgroupinvitecount.png" alt="Add this user to your Buddy List" />&nbsp;';

		newbuttons1 = document.createElement('a');
		cloneddta = thisuser.cloneNode(true);
		newbuttons1.href = cloneddta.href.replace(/member.php\?/gi, "private.php?do=newpm&");
		newbuttons1.innerHTML = '<img src="http://www.facepunch.com/fp/navbar/note_pmunread.png" alt="Send this user a PM" />&nbsp;';

		newbuttons2 = document.createElement('a');
		cloneddta = thisuser.cloneNode(true);
		newbuttons2.href = cloneddta.href.replace(/member.php\?/gi, "search.php?do=finduser&");
		newbuttons2.innerHTML = '<img src="http://static.facepunch.com/fp/navbar/search.png" alt="Stalk this user (Search recently made posts)" />&nbsp;';

		newbuttons3 = document.createElement('a');
		cloneddta = thisuser.cloneNode(true);
		newbuttons3.href = cloneddta.href.replace(/member.php\?/gi, "profile.php?do=addlist&userlist=ignore&");
		newbuttons3.innerHTML = '<img src="http://www.facepunch.com/fp/events/pban.png" alt="Ignore this user" />&nbsp;';

		foundpageelem.appendChild(newbuttons);
		foundpageelem.appendChild(newbuttons1);
		foundpageelem.appendChild(newbuttons2);
		foundpageelem.appendChild(newbuttons3);

		//Hide Button
/*		tehpostid = thisuser.parentNode.parentNode.parentNode.parentNode.id
		var postidd = tehpostid.replace(/edit/gi, "hiddentext_");
		var postiddd = tehpostid.replace(/edit/gi, "hiddenbutton_");
		cloneddta = thisuser.cloneNode(true)
		cloneddta.href = "javascript:void(0);"
		if( isoify ){
			cloneddta.replaceChild( document.createTextNode( 'Hide Psot' ),cloneddta.firstChild)
			cloneddta.firstChild.innerHTML = 'Hide Psot'
		} else {
			cloneddta.replaceChild( document.createTextNode( 'Hide Post' ),cloneddta.firstChild)
			cloneddta.firstChild.innerHTML = 'Hide Post'
		}
		cloneddta.style.borderBottomWidth = "0px ! important;"
		cloneddta.className = ""
		
		var postid1 = tehpostid.replace(/edit/gi, "post_message_");
		tntd = document.createElement('div')
		tntd.className = "button"
		tntd.id = postiddd;
		tntd.style.width = "75%"
		tntd.style.marginLeft = "0px"
		tntd.setAttribute("onclick", "javascript:document.getElementById('" + postid1 + "').parentNode.parentNode.childNodes[3].style.display = 'none';javascript:document.getElementById('" + postid1 + "').parentNode.parentNode.childNodes[5].style.display = 'none';javascript:document.getElementById('" + postid1 + "').parentNode.parentNode.childNodes[7].style.display = 'none';javascript:document.getElementById('" + postiddd + "').style.display = 'none';javascript:document.getElementById('" + postidd + "').style.display = '';")

		var postid = tehpostid.replace(/edit/gi, "post_message_");
		var postit = document.getElementById(postid);
		hidetext = document.createElement('div')
		hidetext.id = postidd;
		hidetext.style.display = 'none';
		hidetext.innerHTML = "<a href=\"javascript:void(0);\" onclick=\"javascript:document.getElementById('" + postid1 + "').parentNode.parentNode.childNodes[3].style.display = '';javascript:document.getElementById('" + postid1 + "').parentNode.parentNode.childNodes[5].style.display = '';javascript:document.getElementById('" + postid1 + "').parentNode.parentNode.childNodes[7].style.display = '';javascript:document.getElementById('" + postiddd + "').style.display = '';javascript:document.getElementById('" + postidd + "').style.display = 'none';\">Post hidden. Click here to unhide post.</a>";

		pageelem=document.evaluate("//div[@id='" + tehpostid + "']/div/div[1]",
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null);
		foundpageelem = pageelem.snapshotItem(0);


		foundpageelem.appendChild(hidetext)*/

		// Parse event tags
		var postid = tehpostid.replace(/edit/gi, "post_message_");
		var postit = document.getElementById(postid);
		postit.innerHTML = postit.innerHTML.replace(/\[event\](.*?)\[\/event\]/ig, "<a href=\"#\" onclick=\"return OpenEvent( 'id=$1', 'id$1' );\" alt=\"Individual Event\">$1</a>");

	};
};

konamiran = false;
if (window.addEventListener) {
    // create the keys and konami variables
    var keys = [],
        konami = "38,38,40,40,37,39,37,39,66,65";
 
    // bind the keydown event to the Konami function
    window.addEventListener("keydown", function(e){
        // push the keycode to the 'keys' array
        keys.push(e.keyCode);
 
        // and check to see if the user has entered
        // the Konami code
        if (keys.toString().indexOf(konami) >= 0) {
		if(!konamiran){
			konamiran = true;
			//pr3dophile ban reasons
			var pr3dbans = ["banned", "no it is not", "I'M FEELING GENEROUS (OR GAY (OR BOTH))", "nah", "nah", "posted in this thread", "it was me stupid", "I'LL CALL HIM", "But I can ban you!!!", "tl; dr", "Requested by mrhappy15 (mrhappy15@gmail.com)", "COMEDY HURR OPTION!!!", "what?", "stupid", "COMEDY HURR OPTION!!!", "COMEDY HURR OPTION!!!", "COMEDY HURR OPTION!!!", "gay", "gay shut up", "Okay..OH SHIT I BANNED YOU BY MISTAKE!!!", "I will not ban Firerain you faggot.", "DON'T PUSH YOUR LUCK", "ilu", "random ip's? seriously?", "YOU ALL WIN A FREE BAN", "Happy fun time!", "YOU ALL WIN A FREE BAN", "YOU ALL WIN A FREE BAN, GO WILD", "I DUNNO, WHAT HAPPENED?", "NOPE THIS IS ME TA", "IDIOT CULL 3000", "LIAR", "ANOTHER ONE BITES THE DUST", "YEAH YOU DUMB CUNT", "YOU'RE A GODDAMN FUCKING PERVERT", "YOU'RE JUST A DUMB CUNT", "FUCK OFF", "NO THANKS", "GO SUCK A DICK", "WHY DO YOU POST NON STEAM NEWS LIKE A FAGGOT", "NO THANKS BUT YOU CAN HAVE MARS INSTEAD !!", "OH MY GOD JC A BONG", "SO I HEAR YOU LIKE DICKS IN YOUR MOUTH", "OH HI FAGGOT", "NIGERIAN", "I AM FACEPUNCH, BOW BEFORE ME", "A MESSAGE FROM PAWNSTICK: EAT MY SHIT", "A PASSWORD?! IN MY FORUM?! IT'S MORE LIKELY THAN YOU THINK", "JIMBOMCB LIKES POTATOES, BLAME HIM FOR THIS BAN", "nobody cares about your shitty avatar", "SHUT UP NOBODY CARES", "STOP CARING ABOUT AN INTERNET FORUM SO MUCH YOU FAGGOT", "WHO THE FUCK ARE YOU AND WHY AM I BANNING YOU", "CIRCLEJERK FAGGOT", "garry you fucking suck at coding jesus christ you can't even create a tool that unbans people, I guess coding shit that is fun is hard for you to do", "SHUT THE FUCK UP", "B-B-B-AND!!!!", "You're a fucking awesome poster, I love you.", "TOO LONG DIDN'T FUCKING READ YOU FUCKING FAG", "I will not ban Firerain you faggot.", "HAHAHA I CAN USE THE PARAGRAPH GENERATOR I AM SO WITTY FUCK OFF", "Okay..OH SHIT I BANNED YOU BY MISTAKE!!!"];
			//ban message
			var myvar, main, newElement;
			main = document.getElementById('navbar');
			topban = pr3dbans[ eval( "Math.floor( pr3dbans.length * Math.random())" )];
			myvar = '<br /><br /><font color="red" size="+3"><b>YOU ARE BANNED!</b></font><br /><br /><br /><font color="red">You\'ve been banned. You probably know why - but the reason that the moderator gave is below. If you feel this is unjust or just want to bitch about how we\'re nazis and get laughed at then feel free to make a post in the refugee camp. You won\'t be able to see other people\'s threads and they won\'t be able to see yours. So don\'t think that wasting your time spamming will prove a point about how awesome you are.<br /><br />Reason: <b>' + topban + '</b><br />Date Lifted: <b>Never</b><br /><br /><blink>SPAMMING THE REFUGEE CAMP IS A WASTE OF TIME BECAUSE NO-ONE BUT MODERATORS CAN SEE YOUR POSTS - AND YOUR BAN WILL GET EXTENDED.</blink><br /><br /></font>';
			if (main) {
				newElement = document.createElement('div');
				newElement.innerHTML = myvar;
				newElement.align = 'center';
				//newElement.style = "border-width: 2px;  border-style: dashed; border-color: red;";
				newElement.style.borderStyle = 'dashed';
				newElement.style.borderColor = 'red';
				newElement.style.borderWidth = '20px';
				newElement.style.background = "#FFFF00";
				newElement.style.margin = "10px";
				main.parentNode.insertBefore(newElement, main);
			}
			// ban. everyone.
			spusers=document.evaluate("//a/font/b",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
					
				for (var i = 0; i < spusers.snapshotLength; i++) {
					thisspuser = spusers.snapshotItem(i);
					thisspuser.parentNode.setAttribute("color", "red");
					thisspuser.parentNode.setAttribute("size", "2");
				}
			spusers=document.evaluate("//a/strong/font|//font[@color=\"#9a32cd\"]",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
					
				for (var i = 0; i < spusers.snapshotLength; i++) {
					thisspuser = spusers.snapshotItem(i);
					thisspuser.setAttribute("color", "red");
					thisspuser.setAttribute("size", "2");
				}
			if ( myfnlocation.search(/showthread/) != -1 || myfnlocation.search(/private/) != -1 || myfnlocation.search(/showpost/) != -1 ){
				usernames=document.evaluate("//div/a[contains(@class,'line')]",
					document,
					null,
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
					null);
						
					for (var i = 0; i < usernames.snapshotLength; i++) {
						thisusername = usernames.snapshotItem(i);
						thisusername.innerHTML = "<font color=\"red\">" + thisusername.innerHTML + "</font>";
					}
				avatars=document.evaluate("//div[contains(@id,'edit')]/div/div[2]/center/a/img",
					document,
					null,
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
					null);
						
					for (var i = 0; i < avatars.snapshotLength; i++) {
						thisavatar = avatars.snapshotItem(i);
						thisavatar.src = "http://static.facepunch.com/fp/avatar_banned.png";
						thisavatar.width = "100";
						thisavatar.height = "50";
					}
				posts=document.evaluate("//div[contains(@id,'post_message_')]",
					document,
					null,
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
					null);
						
					for (var i = 0; i < posts.snapshotLength; i++) {
						thispost = posts.snapshotItem(i);
						currban = pr3dbans[ eval( "Math.floor( pr3dbans.length * Math.random())" )];
						thispost.innerHTML = thispost.innerHTML + "<br /><br /><span class=\"highlight\">(User was permabanned for this post (\"" + currban + "\" - Pr3dator))</span>";
					}
				usernames=document.evaluate("//div/a[contains(@class,'line')]",
					document,
					null,
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
					null);
						
					for (var i = 0; i < usernames.snapshotLength; i++) {
						thisusername = usernames.snapshotItem(i);
						thisusername.innerHTML = "<font color=\"red\">" + thisusername.innerHTML + "</font>";
					}
			}
			forums=document.evaluate("//td[contains(@id,'f')]/div[1]/a/strong|//td[contains(@id,'f')]/table/tbody/tr/td[3]/div/a/strong",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
					
				for (var i = 0; i < forums.snapshotLength; i++) {
					thisforum = forums.snapshotItem(i);
					thisforum.innerHTML = "Refugee Camp";
				}
			descs=document.evaluate("//td[contains(@id,'f')]/div[2]|//td[contains(@id,'f')]/table/tbody/tr/td[3]/div[2]",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
					
				for (var i = 0; i < descs.snapshotLength; i++) {
					thisdesc = descs.snapshotItem(i);
					thisdesc.innerHTML = "Banned users can post in here but they can only see their own threads.";
				}
			uonlines=document.evaluate("//tbody[@id='collapseobj_forumhome_activeusers']/tr/td[2]/div/div[2]/a|//table/tbody/tr/td[2]/a",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
					
				for (var i = 0; i < uonlines.snapshotLength; i++) {
					thisuser = uonlines.snapshotItem(i);
					thisuser.innerHTML = "<font color=\"red\">" + thisuser.innerHTML + "</font>";
				}
				}
            // and finally clean up the keys array
            keys = [];
        };
    }, true);
};

//My evil ignore list
ANONIGNORELST = function(param) {
/*if ( myfnlocation.search(/forumdisplay/) != -1 ){
	var allthreads, thisthread, thisblistitem, poop, thrtital, pageelem, foundpageelem, dupeheader;
	var ntr, ntxt1, na1, ntd, ndiv, ntb, ntable, ntbdy;
	allthreads=document.evaluate("//a[contains(@id, \"thread_title_\")]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	//Create the table to stuff these fuckers in
	ntr1 = document.createElement('tr')
	ntable = document.createElement('tbody')
	ntable.id = 'cockbiterlist'
	ntable.className = 'alt1 rating_3'

	ntable.style.display = 'none'


	
	ntr = document.createElement('tbody')
	ndiv = document.createElement('td')
	ndiv.className = "thead"
	ndiv.setAttribute("colspan", "6")
	ndiv.setAttribute("onclick", 'return ToggleElementEX( \'cockbiterlist\');')
	
	ntxt1 = document.createTextNode( 'Click here to hide/show ignored threads' )
	ndiv.appendChild( ntxt1 )
	//ntbdy = document.createElement('div')

	for (var i = 0; i < allthreads.snapshotLength; i++) {
	
		thisthread = allthreads.snapshotItem(i);
		threadid = thisthread.href.replace(/http:\/\/www.facepunch.com\/showthread.php\?t=/gi, "")
		poop = thisthread.firstChild;
		blink = document.createElement('a');
		blink.href = "javascript:void(0);";
		blink.className = "blockimg";
		blink.setAttribute("onclick", 'managetblist(\'' + threadid + '\');')
		noob = document.createElement('img');
		//leleheh = thisthread.parentNode.childNodes[1].childNodes[2].className;
		noob.src = delthread;
		blink.appendChild( noob );
		thisthread.parentNode.appendChild( blink );
//		thisthread.parentNode.insertBefore( blink,thisthread );
		
		for (var x=0; x<tshitlist.length; x++) {
			thisblistitem = tshitlist[x];
			
			if ( threadid == thisblistitem ) {
				
				if (GM_getValue("blocknotify", false ) == true ){
					alert('IGNORED USER==' + threadid);
				};
					ntr2 = document.createElement('tr')
					ntd2 = document.createElement('td')
					ntd2.className = "alt2"
					ntd2.width = "50"
					
				thrtital = thisthread.parentNode.parentNode.parentNode.cloneNode(true);
				thisthread.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild( thrtital );
					ntr2 = document.createElement('tr')
					ntd2 = document.createElement('td')
					ntd2.width = "50"
					ntd2.setAttribute("colspan", "1")
					ntd2.style.background = "#FF6666";
					ntd3 = document.createElement('td')
					ntd3.style.background = "#FF6666";
					ntd3.setAttribute("colspan", "3")
					ntable.appendChild( ntd2 );
					ntable.appendChild( thrtital );
					thrtital.className = "";
					thrtital.style.background = "#FF6666";
					//ntbdy.appendChild( dupeheader );
					ntr2.appendChild( ntd2 );
					ntr2.appendChild( thrtital );
					ntr2.appendChild( ntd3 );
					ntable.appendChild( ntr2 );
				//ntbdy.appendChild( ntr2 );
				thisthread.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild( thisthread.parentNode.parentNode.parentNode.parentNode );
			};
		};
	};
	pageelem=document.evaluate("//tbody[contains(@id,\"threadbits_forum_\")]",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
	foundpageelem = pageelem.snapshotItem(0);
	ntr.appendChild( ndiv );
	
//	ntable.appendChild( ntbdy );
	//ntr1.appendChild( ntable );
	foundpageelem.parentNode.insertBefore( ntr , foundpageelem );
	foundpageelem.parentNode.insertBefore( ntable , foundpageelem );
}*/

//block every thread made by a blocked user
if ( myfnlocation.search(/forumdisplay/) != -1 ){
	var allthreads, thisthread, thisblistitem, poop, thrtital, pageelem, foundpageelem, dupeheader;
	var ntr, ntxt1, na1, ntd, ndiv, ntb, ntable, ntbdy;
	allthreads=document.evaluate('//span[contains(@onclick,"window.open(\'member.php")]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	//Create the table to stuff these fuckers in
	ntr1 = document.createElement('tr')
	ntable = document.createElement('tbody')
	ntable.id = 'cockbiterlist'
	ntable.className = 'alt1 rating_3'
/*	ntable.width = "100%"
	ntable.cellSpacing = "0"
	ntable.cellPadding = "5"
	ntable.border = "0"
	ntable.align = "center"
	ntable.style.borderStyle = 'solid'
	ntable.style.borderColor = 'rgb(136, 136, 136)'
	ntable.style.borderWidth = '1px 1px 1px 1px'*/
	ntable.style.display = 'none'


	
	ntr = document.createElement('tbody')
	ndiv = document.createElement('td')
	ndiv.className = "thead"
	ndiv.setAttribute("colspan", "6")
	ndiv.setAttribute("onclick", 'return ToggleElementEX( \'cockbiterlist\');')
	
	ntxt1 = document.createTextNode( 'Click here to hide/show ignored threads' )
	ndiv.appendChild( ntxt1 )
	//ntbdy = document.createElement('div')

	for (var i = 0; i < allthreads.snapshotLength; i++) {
	
		thisthread = allthreads.snapshotItem(i);
		threadid = thisthread.getAttribute("onclick").replace("window.open('member.php?u=", "");
		threadid = threadid.replace("', '_self')", "");
		poop = thisthread.firstChild;
		blink = document.createElement('a');
		blink.href = "javascript:void(0);";
		blink.className = "blockimg";
		blink.setAttribute("onclick", 'manageublist(\'' + threadid + '\');')
		noob = document.createElement('img');
		//leleheh = thisthread.parentNode.childNodes[1].childNodes[2].className;
		noob.src = delthread;
		blink.appendChild( noob );
		thisthread.parentNode.appendChild( blink );
//		thisthread.parentNode.insertBefore( blink,thisthread );
		
		for (var x=0; x<shitlist.length; x++) {
			thisblistitem = shitlist[x];
			
			if ( threadid == thisblistitem ) {
				
				if (GM_getValue("blocknotify", false ) == true ){
					alert('IGNORED USER==' + threadid);
				};
					ntr2 = document.createElement('tr')
					ntd2 = document.createElement('td')
					ntd2.className = "alt2"
					ntd2.width = "50"
					
				thrtital = thisthread.parentNode.parentNode.parentNode.cloneNode(true);
				thisthread.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild( thrtital );
					ntr2 = document.createElement('tr')
					ntd2 = document.createElement('td')
					ntd2.width = "50"
					ntd2.setAttribute("colspan", "1")
					ntd2.style.background = "#FF6666";
					ntd3 = document.createElement('td')
					ntd3.style.background = "#FF6666";
					ntd3.setAttribute("colspan", "3")
					ntable.appendChild( ntd2 );
					ntable.appendChild( thrtital );
					thrtital.className = "";
					thrtital.style.background = "#FF6666";
					//ntbdy.appendChild( dupeheader );
					ntr2.appendChild( ntd2 );
					ntr2.appendChild( thrtital );
					ntr2.appendChild( ntd3 );
					ntable.appendChild( ntr2 );
				//ntbdy.appendChild( ntr2 );
				thisthread.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild( thisthread.parentNode.parentNode.parentNode.parentNode );
			};
		};
	};
	pageelem=document.evaluate("//tbody[contains(@id,\"threadbits_forum_\")]",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
	foundpageelem = pageelem.snapshotItem(0);
	ntr.appendChild( ndiv );
	
//	ntable.appendChild( ntbdy );
	//ntr1.appendChild( ntable );
	foundpageelem.parentNode.insertBefore( ntr , foundpageelem );
	foundpageelem.parentNode.insertBefore( ntable , foundpageelem );
}

if ( myfnlocation.search(/showthread/) != -1 || myfnlocation.search(/private/) != -1 || myfnlocation.search(/showpost/) != -1 ){
	// Now fer teh user ignore list
	var usersdats, thisuser, ntr, cloneddta, cloneuname, ntable, ntablebdy, tntd,poop;
	usersdats=document.evaluate("//a[contains(@class,'line')]",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
		
	for (var i = 0; i < usersdats.snapshotLength; i++) {
		thisuser = usersdats.snapshotItem(i);
		userid = thisuser.href.replace(/http:\/\/www.facepunch.com\/member.php\?u=/gi, "");
		username = thisuser.innerHTML;
		postid = thisuser.parentNode.parentNode.parentNode.parentNode.id;
		postid1 = postid.replace(/edit/gi, "post_message_");
		postidd = postid.replace(/edit/gi, "hiddentext_");
		postiddd = postid.replace(/edit/gi, "hiddenbutton_");
		blink = document.createElement('a');
		blink.href = "javascript:void(0);";
		blink.className = "blockimg";
		blink.setAttribute("onclick", 'manageublist(\'' + userid + '\');')
		noob = document.createElement('img');
		//leleheh = thisthread.parentNode.childNodes[1].childNodes[2].className;
		noob.src = delthread;
		
		var postit = document.getElementById(postid);
		hidetext = document.createElement('div')
		hidetext.id = postidd;
		hidetext.style.display = 'none';
		hidetext.innerHTML = "<a href=\"javascript:void(0);\" onclick=\"javascript:document.getElementById('" + postid1 + "').parentNode.parentNode.childNodes[3].style.display = '';javascript:document.getElementById('" + postid1 + "').parentNode.parentNode.childNodes[5].style.display = '';javascript:document.getElementById('" + postid1 + "').parentNode.parentNode.childNodes[7].style.display = '';javascript:document.getElementById('" + postidd + "').style.display = 'none';\">This post by <b>" + username + "</b> is hidden. Click here to unhide post.</a>";

		pageelem=document.evaluate("//div[@id='" + postid + "']/div/div[1]",
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null);
		foundpageelem = pageelem.snapshotItem(0);


		foundpageelem.appendChild(hidetext);
		
		blink.appendChild( noob );
		thisuser.parentNode.appendChild( blink );
		for (var x=0; x<shitlist.length; x++) {
			thisblistitem = shitlist[x];
			if ( userid == thisblistitem ) {
				thisuser.parentNode.parentNode.parentNode.childNodes[3].style.display = 'none';
				thisuser.parentNode.parentNode.parentNode.style.background = '#fff url(\'' + hiddenimage + '\') repeat-y';
				thisuser.parentNode.parentNode.parentNode.childNodes[5].style.display = 'none';
				thisuser.parentNode.parentNode.parentNode.childNodes[7].style.display = 'none';
				var postit = document.getElementById(postidd);
				postit.style.display = '';
			}
		}
	}
}
};

//Autohide Blacklist
ANONAUTOPSTHIDE = function(param) {
	var allthreads, thisthread, thisblistitem, poop, thrtital;
	allthreads=document.evaluate("//a[@class='bigusername']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allthreads.snapshotLength; i++) {
		thisthread = allthreads.snapshotItem(i);
		poop = thisthread.firstChild
		
		if ( poop.nodeName != "#text" ) {
			poop = poop.firstChild
			if ( poop.nodeName != "#text" ) {
				poop = poop.firstChild
			};
		};
		
		for (var x=0; x<shitlist.length; x++) {
			thisblistitem = shitlist[x];
			
			if ( poop.nodeValue == thisblistitem ) {
				
				if (GM_getValue("blocknotify", false ) == true ){
					alert('IGNORED USER==' + poop.nodeValue);
				};
					
				thisthread.parentNode.parentNode.parentNode.childNodes[3].style.display = 'none';
				thisthread.parentNode.parentNode.parentNode.childNodes[5].style.display = 'none';
				thisthread.parentNode.parentNode.parentNode.childNodes[7].style.display = 'none';
			};
		};
	};
};

//Posthider and back to top buttons
//commenting out for now
/*
ANONPOSTHIDER = function(param) {
	var findallposts, foundapost, creatthebutton, createtheimg;
	findallposts=document.evaluate('//div[contains(@id,"edit")]',
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
	
	for (var i = 0; i < findallposts.snapshotLength; i++) {
		foundapost = findallposts.snapshotItem(i);
		//safetychecks
		//if ( foundapost.childNodes[1].childNodes[1].className == 'header'){

			//Post Hider
			creatthebutton = document.createElement('a');
			creatthebutton.setAttribute("onclick", 'return TogglePost( \''+ foundapost.id + '\');');
			creatthebutton.href = 'javascript:return(0);';
			createtheimg = document.createElement('img');
			createtheimg.src = 'http://d2k5.com/sa_emots/emot-eek.gif';
			createtheimg.title = 'Hide/Unhide Post'
			creatthebutton.appendChild( createtheimg );
			foundapost.insertBefore( creatthebutton, foundapost.childNodes[1] );
//			foundapost.childNodes[1].childNodes[1].insertBefore( creatthebutton, foundapost.childNodes[1].childNodes[1].childNodes[3] );
			
			//Back to top
			creatthebutton = document.createElement('a');
			creatthebutton.href = '#poststop';
			createtheimg = document.createElement('img');
			createtheimg.src = 'http://d2k5.com/sa_emots/emot-rolleye.gif';
			createtheimg.title = 'Go to Top'
			creatthebutton.appendChild( createtheimg );
			foundapost.childNodes[1].childNodes[1].childNodes[1].insertBefore( creatthebutton, foundapost.childNodes[1].childNodes[1].childNodes[1].firstChild );
			
			//Unread Posts
			if ( foundapost.style.backgroundImage == 'url( )' ){
				createtheimg = document.createElement('img');
				createtheimg.src = 'http://d2k5.com/sa_emots/emot-sax.gif';
				createtheimg.title = 'Freshly Pooped!'
				foundapost.childNodes[1].insertBefore( createtheimg, foundapost.childNodes[1].childNodes[3] );
			};
			//Hack
			if ( isoify ){
				foundapost.style.backgroundImage = 'url() ! important;';
			};
		//};
	};
	
	
	//New stuff, Will optomize later
	findallposts=document.evaluate('//div[contains(@id,"edit")]',
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
		
	for (var i = 0; i < findallposts.snapshotLength; i++) {
		foundapost = findallposts.snapshotItem(i);
		//alert(foundapost.id);
		//safetychecks
		if ( foundapost.childNodes[1].childNodes[1].className == 'header'){
			//Post Hider
			creatthebutton = document.createElement('a');
			creatthebutton.setAttribute("onclick", 'return TogglePost( \''+ foundapost.id + '\');');
			creatthebutton.href = '#';
			createtheimg = document.createElement('img');
			createtheimg.src = 'http://d2k5.com/sa_emots/emot-eek.gif';
			createtheimg.title = 'Hide/Unhide Post'
			creatthebutton.appendChild( createtheimg );
			foundapost.childNodes[1].insertBefore( creatthebutton, foundapost.childNodes[1].childNodes[3] );
			
			//Back to top
			creatthebutton = document.createElement('a');
			creatthebutton.href = '#poststop';
			createtheimg = document.createElement('img');
			createtheimg.src = '/images/smilies/emot-rolleye.png';
			createtheimg.title = 'Go to Top'
			creatthebutton.appendChild( createtheimg );
			foundapost.childNodes[1].childNodes[1].insertBefore( creatthebutton, foundapost.childNodes[1].childNodes[1].firstChild );
			
			//Unread Posts
			if ( foundapost.style.backgroundImage == 'url( )' ){
				createtheimg = document.createElement('img');
				createtheimg.src = '/images/smilies/emot-sax.png';
				createtheimg.title = 'Freshly Pooped!'
				foundapost.childNodes[1].insertBefore( createtheimg, foundapost.childNodes[1].childNodes[3] );
			};
			//Hack
			if ( isoify ){
				foundapost.style.backgroundImage = 'url() ! important;';
			};
		};
	};
	
};
*/
	
// Put a star beside titles with unicode characters, as that usually means it's a blank title. Better than completely replacing the title as it frequently give false positives -mm3guy
ANONUNBLANKTIT = function(param) {
	var threadtitles, thisthreadtitle, newthreadtitle, compstr;
	threadtitles=document.evaluate("//a[contains(@id,'thread_title_')]",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
	
	for (var i = 0; i < threadtitles.snapshotLength; i++) {
		thisthreadtitle = threadtitles.snapshotItem(i);
		
		if ( thisthreadtitle.hasChildNodes() == false ){
			newthreadtitle = document.createTextNode( 'Blank Title' );
			thisthreadtitle.appendChild( newthreadtitle );
		}
		else {
			compstr = thisthreadtitle.firstChild.nodeValue
			for (var n=0; n< compstr.length; n++) {
				if ( compstr.charCodeAt(n) > 122 ) {
					newthreadtitle = document.createTextNode( "   ۞" );
					thisthreadtitle.appendChild( newthreadtitle );

//					thisthreadtitle.firstChild.nodeValue = thisthreadtitle.firstChild.nodeValue + " "
					break;
				};
			};
		};
	};
};

//Added Javascript
ANONJSADDER = function(param) {
	var theheader, modheader, addeditem, add2;
	theheader = document.getElementsByTagName('head');
	modheader = theheader[0];
	addeditem = document.createElement('script');
	addeditem.type='text/javascript';
	add2 = document.createTextNode( pooscr )
	addeditem.appendChild( add2 )
	modheader.appendChild( addeditem );
};

//Custom Crap
ANONJSADDERCUST = function(param) {
	var frostedbutts = document.getElementsByTagName('body')[0];
//what the fuck this was what was wrong with the post jumper thingey
	//	frostedbutts.setAttribute("onload", '')

	var theheader, modheader, addeditem, add2;
	theheader = document.getElementsByTagName('head');
	modheader = theheader[0];
	addeditem = document.createElement('script');
	addeditem.type='text/javascript';
	add2 = document.createTextNode( custpooscr );
	addeditem.appendChild( add2 );
	modheader.appendChild( addeditem );
};

REMOVEMUSIC = function(param) {
	var getfiles;
	// first remove olde music
		getfiles=document.evaluate("//embed[@src='http://www.garry.tv/img/music.mid']",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
	
	for (var i = 0; i < getfiles.snapshotLength; i++) {
		foundfile = getfiles.snapshotItem(0);
		foundfile.parentNode.removeChild(foundfile)
	};
}

	var getfiles;
//The InnerHTML was generated someplace, I forgot where though, all I did was escape the quotes
ANONPLYTHTFUKYMUSIC = function(param) {
	var newembed, newobj, newparam, findbody, themusic, getfiles;
	
	themusic = FunkyMusicTable[ eval( "Math.floor( FunkyMusicTable.length * Math.random())" )]
	
	findbody = document.getElementsByTagName('body')[0];


	newobj = document.createElement('b');
	newobj.innerHTML = ''+
'		<OBJECT id=\'mediaPlayer\' width="1" height="1"'+
'		classid=\'CLSID:22D6F312-B0F6-11D0-94AB-0080C74C7E95\''+
'		codebase=\'http:\/\/activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,0,02,902\''+
'		standby=\'Loading Microsoft Windows Media Player components...\' type=\'application/x-oleobject\'>'+
'		<param name=\'fileName\' value=\'http://www.garry.tv/img/'+ themusic +'\'>'+
'		<param name=\'animationatStart\' value=\'true\'>'+
'		<param name=\'transparentatStart\' value=\'true\'>'+
'		<param name=\'autoStart\' value="true">'+
'		<param name=\'showControls\' value="false">'+
'		<param name=\'playCount\' value="666">'+
'		<param name=\'Volume\' value="100">'+
'		<param name=\'uiMode\' value="invisible">'+
'		<EMBED type=\'application/x-mplayer2\''+
'		pluginspage=\'http:\/\/microsoft.com/windows/mediaplayer/en/download/\''+
'		id=\'mediaPlayer\' name=\'mediaPlayer\' displaysize=\'4\' autosize=\'-1\''+
'		bgcolor=\'darkblue\' showcontrols="false" showtracker=\'-1\' playcount=\'666\' Volume="100"'+
'		showdisplay=\'0\' showstatusbar=\'-1\' videoborder3d=\'-1\' width="1" height="1"'+
'		src=\'http://www.garry.tv/img/'+ themusic +'\' autostart="true" designtimesp=\'5311\'>'+
'		</EMBED>'+
'		</OBJECT>'+
'';

	findbody.appendChild( newobj );
};

//Stylistic Shit
ANONSKINNING = function(param) {
	//This was part of the origional script.
	var allOIFYLinks,thisOIFYLink, getfiles, foundfile;
	allOIFYLinks=document.evaluate("//link[contains(@href,'/fp/styles-oify.css')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	//OIFY Skinning
	for(var i=0;i<allOIFYLinks.snapshotLength;i++){
		//If it is found...
		if(allOIFYLinks.snapshotLength > 0 ){
			//stick this in it's pooper
			thisOIFYLink = allOIFYLinks.snapshotItem(i);
			thisOIFYLink.href='/fp/styles.css?6';
//thisOIFYLink.href='http://web.archive.org/web/20080209103119/http://forums.facepunchstudios.com/styles.css';
		
			//My shitty toggle feature for OIFY SKINNING
			if (GM_getValue("oifyskin", true ) == true ) {
				stylemolest( phallic )
			};
		};
	};
};

// add emotes and bbcode buttons
EMOTIBUTTONS = function(param) {
	var textarea = $("vB_Editor_QR_textarea");
if(!textarea)
{
	textarea = $("vB_Editor_001_textarea");
}
if(textarea)
{
	var div = Dom.add(textarea.parentNode.parentNode, "div");
	
	for( i=0; i<bbcode.length; i++ )
	{
		var a = Dom.add( div, "a" );
		a.href = "javascript:;";
		a.className = "tagbtn";
		Dom.addText(a, bbcode[i]);
		
		Event.add( a, "click", function( e, tag )
		{
			var codeleft = "["+tag+"]";
			var coderight = "[/"+tag+"]";
			
			var left = textarea.value.substr(0, textarea.selectionStart);
			var middle = textarea.value.substr(textarea.selectionStart, textarea.selectionEnd-textarea.selectionStart);
			var right = textarea.value.substr(textarea.selectionEnd);
			
			textarea.value = left + codeleft + middle + coderight + right;
			textarea.selectionStart = left.length + codeleft.length;
			textarea.selectionEnd = left.length + codeleft.length + middle.length;
			textarea.focus();
		}.eventBind( a, bbcode[i] ) );
		
	}
	
	var div = Dom.add(textarea.parentNode.parentNode, "div");
	
	div.style.overflowX = "scroll";
	div.style.width = textarea.clientWidth+"px";
	
	
	var div2 = Dom.add( div, "div" );
	div2.style.width = "17000px";
	
	
	for( i=0; i<emotes.length; i++ )
	{
		var a = Dom.add( div2, "a" );
		a.href = "javascript:;";
		a.title = emotes[i][0];
		Event.add( a, "click", function( e, code )
		{
			var left = textarea.value.substr(0, textarea.selectionStart);
			var right = textarea.value.substr(textarea.selectionEnd);
			textarea.value = left + code + right;
			textarea.selectionStart = textarea.selectionEnd = left.length + code.length;
			textarea.focus();
		}.eventBind( a, emotes[i][0] ) );
		
		var img = Dom.add( a, "img" );
		img.src = "/fp/emoot/"+emotes[i][1];
		img.title = emotes[i][0];
		img.className = "smileyclick";
		
		
	}
	
}
}

//NON OIFY FP LOGO Nuking + NonOIFY FP Banner
ANONNFPBANNER = function(param) {
	var fplogos,thisfplogo,lolwut;
	var FPBannerspace, theFPBanner, newFPbanner, FPbannertxt, newFPbannerp2;
	
	lolwut=document.evaluate("//table/tbody/tr/td/marquee",
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null);

	if ( myfnlocation.search(/nosearch.php/) != -1 || lolwut.snapshotLength > 0 ) {
		fplogos=document.evaluate("/html/body/div/div/div",
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null);
	}
	else {
		fplogos=document.evaluate("/html/body/div/div/div[2]",
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null);
	};
	thisfplogo = fplogos.snapshotItem(0);
	
	//This part is retarded
	thisfplogo.parentNode.parentNode.parentNode.insertBefore(newFPbannerp2, thisfplogo.parentNode.parentNode.parentNode.firstChild )
	thisfplogo.parentNode.removeChild(thisfplogo);
};

//Oify banner
ANONOIFYBANNER = function(param) {
	var allOIFYBanners, thisOIFYBanner, newbanner, bannertxt, newbannerp2;

	allOIFYBanners = document.evaluate("//center/a[@href='http://www.facepunch.com/forumdisplay.php?f=56']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

	for (var i = 0; i < allOIFYBanners.snapshotLength; i++) {
		thisOIFYBanner = allOIFYBanners.snapshotItem(i);
	
		if (GM_getValue("oifyskin", true ) == true ){
			newbannerp2 = document.createElement('center');
	
			newbanner = document.createElement('blink');
			newbanner.innerHTML = oifybannertext
			
			newbanner.style.color = "#0f0 ! important";
			newbanner.style.font = "40px System ! important";
			
			newbannerp2.appendChild( newbanner );
	
			thisOIFYBanner.insertBefore(newbannerp2, thisOIFYBanner.firstChild)
		};
		
		if (GM_getValue("oifyskin", true ) == false ){
			thisOIFYBanner.parentNode.removeChild(thisOIFYBanner)
		};
	};
};

//Fix OIFY Spoiler tags
ANONOIFYSTAGS = function(param) {
	var tspoilers, curspoiler, modspoiler, newspoiler, mystyles;
	tspoilers=document.evaluate("//span[ starts-with(@style,'background-color: rgb(51, 51, 51)') ]",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < tspoilers.snapshotLength; i++) {
	//If this is the OIFY, I'm using the results of the style fix script for this.
		curspoiler = tspoilers.snapshotItem(i)
		curspoiler.style.color = '#111'
		curspoiler.style.background = '#111 ! important'
	};
};

//Reporting...
ANONOIFYREPORT = function(param) {
	var reporting,thisreport,newreport;
	reporting=document.evaluate("//a[ starts-with(@onclick,'ReportPost' ) ]",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);

	for (var i = 0; i < reporting.snapshotLength; i++) {
		thisreport = reporting.snapshotItem(i);
	
		newreport = document.createTextNode( oifyreporttext );

		thisreport.removeChild(thisreport.firstChild)
		thisreport.appendChild(newreport)
	};
};

//Favicon
ANONFAVICOMOD = function(param) {
	var head, magicalico;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	magicalico = document.createElement('link');
	magicalico.rel = 'SHORTCUT ICON'
	magicalico.href = newfavicon;
	head.appendChild(magicalico);
};

//login logout shit

//menu stolen from faceraper
RAPERMENU = function(parm) {
	var baseel = document.evaluate("//div/div/div[10]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	var crapmenuitem = document.createElement('div')
//	crapmenuitem.className = "navbarlink"
	crapmenuitem.innerHTML = "<div class=\"navbarlink\"><a href=\"./login.php?do=logout\"><img class=\"smileyclick\" src=\"/fp/navbar/register.png\" alt=\"More\"> Log Out</a></div>\n \n<div class=\"navbarlink\"><a onclick=\"return ToggleDiv( 'ListFaceRaper', 'rapemenu', '#FFFFDD' );\" href=\"javascript:void(0);\"><img src=\"/fp/navbar/more.png\" alt=\"More\"> Moar...</a></div>\n"
//	baseel.appendChild(crapmenuitem)
	baseel.parentNode.insertBefore(crapmenuitem, baseel);

};

// meh
unsafeWindow.showpopthr =function( poop ) {

	//Begin Gay wrapper
	window.setTimeout(function() {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.facepunch.com/fp_popular.php',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(popstuff) {
			//document.getElementById('popmenu').innerHTML = "<div style=\"float: right;\"><a href=\"javascript:void(0);\" onclick=\"return CloseThis(this);\"><img src=\"/fp/close.png\"></a></div><br />" + popstuff.responseText;
			meh = document.createElement('div');
			meh.innerHTML = popstuff.responseText;
			blah = "<div style=\"float: right;\"><a href=\"javascript:void(0);\" onclick=\"return CloseThis(this);\"><img src=\"/fp/close.png\"></a></div><br /><table>";
			ranknums = document.evaluate("//tbody/tr/td[contains(@id,'td_threadstatusicon_')]/div",
					meh,
					null,
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
					null);
			for(var i = 0;i<ranknums.snapshotLength;i++) {
				numbah = ranknums.snapshotItem(i);
				thingid = numbah.parentNode.id.replace("td_threadstatusicon_", "");
				title = document.evaluate("//a[@id='thread_title_" + thingid + "']", meh, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).parentNode.innerHTML;
				viewing = document.evaluate("//td[@id='td_threadtitle_" + thingid + "']/div/div[2]/span[2]", meh, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML;
				blah += "<tr><td>" + numbah.innerHTML + "</td><td>" + title + "</td><td>" + viewing + "</td></tr>";
			}
			blah += "</table>";
			document.getElementById('popmenu').innerHTML = blah;
			//alert(blah);
		}
	});
	}, 0);
};


//more menu stuff
MOARMENU = function(param) {
	var mycruddyjs;
	var crapmenushell, crapmenuitem1, crapmenuitem2, crapmenuitem3, crapmenuinner, crapmenuitemx, findbody;
	findbody = document.getElementsByTagName('body')[0];
	//SHitty Menu
	crapmenushell = document.createElement('div')
	crapmenushell.className = "top"
	crapmenushell.style.display = "none"
	crapmenushell.style.top = 0
	crapmenushell.style.left = 0
	crapmenushell.style.width = "auto"
	crapmenushell.style.padding = "5px"
	crapmenushell.style.background = "rgb(255, 255, 221) none repeat scroll 0% 0%"
	crapmenushell.id = "ListFaceRaper"
	var usera = document.evaluate("/html/body/div[1]/div[@id='navbar']/div[@id='navbar-login']/b/a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
//	var userid = getCookie('bbsessionhash');
	var userid = usera.href.replace(/http:\/\/www.facepunch.com\/member.php\?u=/gi, "");

	crapmenushell.innerHTML = "<div style=\"float: right;\"><a href=\"javascript:void(0);\" onclick=\"return CloseThis(this);\"><img src=\"/fp/close.png\"></a></div><br />" +
	"<b><u>Cool tools</u></b>:<br/>" +
	"<a href='javascript:void(0);' onclick=\"showpopthr('sdfs');return ToggleDiv( 'PopThreads', 'popmenu', '#AAFF00' );\">Quick Popular Threads</a> - Opens a quick version of popular threads<br />" +
	"<a href=\"javascript:void(0);\" onclick=\"return OpenEvent( '', 'fulllog' );\">Quick event log</a> - Opens a quick version of the event log<br />" +
	"<br /><b><u>Settings</u></b><br />Please note: You need to refresh the webpage for these settings to take place." +
	"<br /><br /><b>General forum config</b>" +
	"<br /><a href='javascript:void(0);' onclick=\"togglepostenhancer();\">Posting enhancer: <span class='highlight'>"+ GM_getValue("postenhancer", true ) +"</span></a> - Enable emote and BBCode buttons" +
	"<br /><a href='javascript:void(0);' onclick=\"toggleupanel();\">Post panel: <span class='highlight'>"+ GM_getValue("upanel", true ) +"</span></a> - The special buttons that are by the event/report buttons" +
	"<br /><a href='javascript:void(0);' onclick=\"togglehitlist();\">Blacklist system: <span class='highlight'>"+ GM_getValue("hitlist", true ) +"</span></a> - Enable/disable the user blacklist system." +
	"<br /><a href='javascript:void(0);' onclick=\"toggleresizetexts();\">Resizable Textboxes: <span class='highlight'>"+ GM_getValue("resizetexts", true ) +"</span></a> - Useful for making large posts" +
	"<br /><a href='javascript:void(0);' onclick=\"toggleresizeiframes();\">Resizable Iframes: <span class='highlight'>"+ GM_getValue("resizeiframes", true ) +"</span></a> - Useful for the news node" +
	"<br /><a href='javascript:void(0);' onclick=\"toggleresizeimages();\">Resizable Images: <span class='highlight'>"+ GM_getValue("resizeimages", false ) +"</span></a> - Useful for the LMAO Pics Thread and all around the forum in general <br />(<b>WARNING</b>: In topics with hundreds of images, this can cause Firefox to crash)" +
	"<br /><br /><b>OIFY Related Settings</b><br />" +
	"<a href='javascript:void(0);' onclick=\"togglefpskin();\">Custom Style: <span class='highlight'>"+ GM_getValue("oifyskin", true ) +"</span></a> - Use OIFY custom style? Also, click to config background.<br />" +
	"<a href='javascript:void(0);' onclick=\"togglepicmusic();\">Epic Music: <span class='highlight'>"+ GM_getValue("epicmusic", false ) +"</span></a> - Oify Music" +
	"<br /><br /><b>Misc. Features</b><br />" +
	"<a href=\"javascript:void(0);\" onclick=\"return OpenEvent( 'user=" + userid + "', " + userid + " );\">Your events</a> - If you want a link to your events, go <a href=\"./fp_events.php?user=" + userid + "\">here</a>.<br />" +
	"<a href=\"./search.php?do=finduser&u=" + userid + "\">Your posts</a><br />" +
	"<a href=\"./search.php?do=finduser&u=" + userid + "&starteronly=1\">Your threads</a><br />" +
	"<a href=\"./forumdisplay.php?f=56\" style=\"\">OIFY - INTERNET!</a> - Also, cocks.<br />" +
	"<a href=\"javascript: document.body.contentEditable = 'true'; document.designMode = 'on'; void 0;\" style=\"\">Edit Facepunch</a> - Please note: a lot of things get messed up if you do this.<br />" +
	"<a href=\"javascript:R=0;%20x1=.1;%20y1=.05;%20x2=.25;%20y2=.24;%20x3=1.6;%20y3=.24;%20x4=300;%20y4=200;%20x5=300;%20y5=200;%20DI=document.getElementsByTagName(%22img%22);%20DIL=DI.length;%20function%20A(){for(i=0;%20i-DIL;%20i++){DIS=DI[%20i%20].style;%20DIS.position='absolute';%20DIS.left=(Math.sin(R*x1+i*x2+x3)*x4+x5)+%22px%22;%20DIS.top=(Math.cos(R*y1+i*y2+y3)*y4+y5)+%22px%22}R++}setInterval('A()',5);%20void(0);\" style=\"\">Crazyness</a> - Use this when bored<br />";
	findbody.appendChild( crapmenushell );
	
	var mycruddyjs;
	var crapmenushell2, crapmenuitem1, crapmenuitem2, crapmenuitem3, crapmenuinner, crapmenuitemx, findbody;
	findbody = document.getElementsByTagName('body')[0];
	//SHitty Menu
	crapmenushell2 = document.createElement('div')
	//crapmenushell.className = "top"
	crapmenushell2.style.display = "none"
	crapmenushell2.style.top = 0
	crapmenushell2.style.left = 0
	crapmenushell2.style.width = "auto"
	crapmenushell2.style.padding = "5px"
	crapmenushell2.style.background = "#AAFF00 none repeat scroll 0% 0%"
	crapmenushell2.id = "PopThreads"
	crapmenushell2.innerHTML = 	"<div style=\"float: right;\"><a href=\"javascript:void(0);\" onclick=\"return CloseThis(this);\"><img src=\"/fp/close.png\"></a></div><br />" +
	"Loading...<br /><img src=\"http://garrysmod.com/img/entry-load.gif\" />";

	findbody.appendChild( crapmenushell2 );
	
	//bodyel.appendChild( crapmenushell );
};

//resizable shit
RESIZER = function(parm) {
  var resizeTa = {
    TAlength: 0,
    TA: new Array(),
    
    collectionToArray: function(col){
      a = new Array();
      for(i = 0, l = col.length; i < l; i++)
        a[a.length] = col[i];
      return a;
    },
    
    load: function(){
if (GM_getValue("resizetexts", true ) == true ){
      resizeTa.TA = resizeTa.collectionToArray(document.getElementsByTagName("textarea"));
}
if (GM_getValue("resizeiframes", true ) == true ){
      resizeTa.TA = resizeTa.TA.concat(resizeTa.collectionToArray(document.getElementsByTagName("iframe")));
}

if (GM_getValue("resizeimages", false ) == true ){
      var objects;
      objects = document.getElementsByTagName("img");
      for(var i = 0, l = objects.length; i < l; i++){
	  if(objects[i].parentNode.className == "messagetext"){
          //inputs[i].getAttribute("type") == "password"
        //}else{
          resizeTa.TA.push(objects[i]);
	  }	  
	  if(objects[i].parentNode.className == "message") {
			  resizeTa.TA.push(objects[i]);
		  }
		   

      }
}


    },
    
    init: function(aEvent){
      resizeTa.load();
      
      resizeTa.TAlength = resizeTa.TA.length;
      if(resizeTa.TAlength == 0){
        return;
      }
      else{
        resizeTa.rootElem = document.getElementsByTagName("html")[0];
        var i = resizeTa.TAlength;
        while(i--){
          if(
            resizeTa.TA[i].tagName.toLowerCase() == "textarea" ||
            resizeTa.TA[i].tagName.toLowerCase() == "img" ||
            resizeTa.TA[i].tagName.toLowerCase() == "iframe"
          ){
            resizeTa.newdiv("4", "1", "gripH_", i, "w");
            resizeTa.newdiv("1", "4", "gripV_", i, "n");
            resizeTa.newdiv("10", "10", "gripX_", i, "se");
          }
          else if(resizeTa.TA[i].tagName.toLowerCase() == "select"){
            resizeTa.newdiv("1", "4", "gripV_", i, "n");        
          }
          else if(resizeTa.TA[i].tagName.toLowerCase() == "input"){
            resizeTa.newdiv("4", "1", "gripH_", i, "w");
          }
        }
        resizeTa.newdiv("0", "0", "showCursor", "", "w");
        CursorDiv = document.getElementById("showCursor");
        CursorDiv.removeEventListener("mousedown", resizeTa.activate, true);
        CursorDiv.style.left = "0px";
        CursorDiv.style.top  = "0px";
        resizeTa.posdivs();
        window.addEventListener("resize", resizeTa.posdivs, true);
      }
    },
    
    newdiv: function(w, h, id, nr, cu){
      var grip = document.createElement("div");
      grip.setAttribute("id", id + nr);
      grip.setAttribute(
        "style",
        "position: absolute; z-index: 9999; width: "+w+"px; height: "+h+"px; cursor: "+cu+"-resize;"
      );
      grip.addEventListener("mousedown", resizeTa.activate, true);
      resizeTa.rootElem.appendChild(grip);
    },
    
    getposition: function(i){
      var curElem = resizeTa.TA[i];
      var curX = curElem.offsetLeft;
      while(curElem.offsetParent){
        curX += curElem.offsetParent.offsetLeft;
        curElem = curElem.offsetParent;
      }
      curElem = resizeTa.TA[i];
      var curY = curElem.offsetTop;
      while(curElem.offsetParent){
        curY += curElem.offsetParent.offsetTop;
        curElem = curElem.offsetParent;
      }
      return [curX,curY];
    },
    
    posdivs: function(){
      var k = resizeTa.TAlength;
      while(k--){
        curPos = resizeTa.getposition(k);
        
        // only add horizontal grip to input boxes
        // note: height is different due to absense of corner grip
        if(resizeTa.TA[k].tagName.toLowerCase() == "input"){
          document.getElementById('gripH_'+k).style.left   = curPos[0]+resizeTa.TA[k].offsetWidth -2 + "px";
          document.getElementById('gripH_'+k).style.top    = curPos[1]                               + "px";
          document.getElementById('gripH_'+k).style.height =           resizeTa.TA[k].offsetHeight   + "px";
        }
        
        // only add vertical grip to select box
        if(resizeTa.TA[k].tagName.toLowerCase() == "select"){
          document.getElementById('gripV_'+k).style.left   = curPos[0]                                + "px";
          document.getElementById('gripV_'+k).style.top    = curPos[1]+resizeTa.TA[k].offsetHeight-2  + "px";
          document.getElementById('gripV_'+k).style.width  =           resizeTa.TA[k].offsetWidth -18 + "px";        
        }
        
        // add horizontal, vertical, and corner grippies to textarea and select
        if(
          resizeTa.TA[k].tagName.toLowerCase() == "textarea" ||
          resizeTa.TA[k].tagName.toLowerCase() == "img" ||
          resizeTa.TA[k].tagName.toLowerCase() == "iframe"
        ){
          document.getElementById('gripH_'+k).style.left   = curPos[0]+resizeTa.TA[k].offsetWidth -2 + "px";
          document.getElementById('gripH_'+k).style.top    = curPos[1]                               + "px";
          document.getElementById('gripH_'+k).style.height =           resizeTa.TA[k].offsetHeight-8 + "px";      
          
          document.getElementById('gripV_'+k).style.left   = curPos[0]                               + "px";
          document.getElementById('gripV_'+k).style.top    = curPos[1]+resizeTa.TA[k].offsetHeight-2 + "px";
          document.getElementById('gripV_'+k).style.width  =           resizeTa.TA[k].offsetWidth -8 + "px";
          
          document.getElementById('gripX_'+k).style.left   = curPos[0]+resizeTa.TA[k].offsetWidth -8 + "px";
          document.getElementById('gripX_'+k).style.top    = curPos[1]+resizeTa.TA[k].offsetHeight-8 + "px";
        }
      }
    },
    
    activate: function(e){
      resizeTa.load();
      CursorDiv       = document.getElementById("showCursor");
      var curTargetId = e.target.getAttribute("id").split("_");
      curTarget       = curTargetId[0];
      curTA_Nr        = parseInt(curTargetId[1]);
      document.addEventListener("mouseup", resizeTa.deactivate, true);
      switch(curTarget){
        case "gripH": document.addEventListener("mousemove", resizeTa.resizeta_h, true); break;
        case "gripV": document.addEventListener("mousemove", resizeTa.resizeta_v, true); break;
        case "gripX": document.addEventListener("mousemove", resizeTa.resizeta_x, true); break;
      }
      CursorDiv.style.width  = resizeTa.rootElem.offsetWidth + "px";
      CursorDiv.style.height = resizeTa.rootElem.offsetHeight + "px";
      CursorDiv.style.cursor = e.target.style.cursor;
    },
    
    deactivate: function(){
      document.removeEventListener("mouseup", resizeTa.deactivate, true);
      switch(curTarget){
        case "gripH": document.removeEventListener("mousemove", resizeTa.resizeta_h, true); break;
        case "gripV": document.removeEventListener("mousemove", resizeTa.resizeta_v, true); break;
        case "gripX": document.removeEventListener("mousemove", resizeTa.resizeta_x, true); break;
      }
      CursorDiv.style.width  = "0px";
      CursorDiv.style.height = "0px";
      resizeTa.posdivs();
    },
    
    resizeta_h: function(e){
      curPos = resizeTa.getposition(curTA_Nr);
      //if(e.pageX - curPos[0] > 20){
        resizeTa.TA[curTA_Nr].style.width = e.pageX - curPos[0] + "px";
      //}
    },
    
    resizeta_v: function(e){
      curPos = resizeTa.getposition(curTA_Nr);
      //if(e.pageY - curPos[1] > 20){
        resizeTa.TA[curTA_Nr].style.height = e.pageY - curPos[1] + "px";
      //}
      if(resizeTa.TA[curTA_Nr].tagName.toLowerCase() == "select"){
        if(e.pageY - curPos[1] < 25){
          resizeTa.TA[curTA_Nr].setAttribute("size", 1);
        }
        else{
          resizeTa.TA[curTA_Nr].setAttribute("size", 2);
        }
      }
    },
    
    resizeta_x: function(e){
      curPos = resizeTa.getposition(curTA_Nr);
      
      //if(e.pageX - curPos[0] > 20 && e.pageY - curPos[1] > 20){
        resizeTa.TA[curTA_Nr].style.width  = e.pageX - curPos[0] + 2 + "px";
        resizeTa.TA[curTA_Nr].style.height = e.pageY - curPos[1] + 2 + "px";
      //}
      if(resizeTa.TA[curTA_Nr].tagName.toLowerCase() == "select"){
        resizeTa.TA[curTA_Nr].setAttribute("size", 2);
      }
    }
  }
  
  if(document.body) resizeTa.init();
  



};


// 
// Avatar tooltip
// 
GM_addStyle( ".avatarimg{ float: left; margin-right: 10px; display: none; }" );

var tt = Dom.add( document.body, "div" );
tt.style.position = "fixed";
tt.style.display = "none";
var img = Dom.add( tt, "img" );
Event.add( img, "load", function()
{
	tt.style.display = "block";
} );
Event.add( window, "mousemove", function(e)
{
	if( tt.style.display == "block" )
	{
		tt.style.left = (e.clientX+10)+"px";
		tt.style.top = e.clientY+"px";
	}
});

var els = document.getElementsByTagName( "a" );
for( var i=0;i<els.length;i++ )
{
	var p = els[i].href.indexOf( "member.php?u=" );
	if( p > -1 )
	{
		var el = els[i];
		var userid = els[i].href.substr( p+13 );
		Event.add( el, "mouseover", function( e, id )
		{
			img.src = "http://www.facepunch.com/image.php?u="+id;
			tt.style.left = (e.clientX+10)+"px";
			tt.style.top = e.clientY+"px";
		}.eventBind( el, userid ) );
		
		Event.add( el, "mouseout", function( e, id )
		{
			tt.style.display = "none";
			img.src = "";
		}.eventBind( el, userid ) );
	}
}

/*allUsers=document.getElementsByClassName("username");
userarray = userB.split(',');
for(var i=0; i < allUsers.length; i++){
	curUser = allUsers[i];
	if(curUser.nodeName == "DIV"){
			curUserURLs = curUser.parentNode.getElementsByTagName("a");
			curUserURL = curUserURLs[curUserURLs.length - 2];
            while(curUserURL.nodeType != 3){
                curUserURL = curUserURL.childNodes[0];
            }
		for(var u=0; u < userarray.length; u++){
			userA = userarray[u].split('=');
			var user = userA[0], msg = userA[1];
			if(curUserURL.nodeType == 3){
				if(curUserURL.nodeValue == user){
					var usrInfo = curUser.parentNode;
					
					usrMsgText = msg; 
					usrMsg = document.createElement("div");
					usrMsg.setAttribute("class", "usertitle"); 
					usrMsg.innerHTML = msg;                                           
					
					usrInfo.insertBefore(usrMsg, curUser.nextSibling);
				}
			}
		}
	}
}
// add user titals
allUsers=document.getElementsByClassName("username");
userarray = userB.split(',');
for(var i=0; i < allUsers.length; i++){
	curUser = allUsers[i];
	if(curUser.nodeName == "DIV"){
			curUserURLs = curUser.parentNode.getElementsByTagName("a");
			curUserURL = curUserURLs[curUserURLs.length - 2];
            while(curUserURL.nodeType != 3){
                curUserURL = curUserURL.childNodes[0];
            }
		for(var u=0; u < userarray.length; u++){
			userA = userarray[u].split('=');
			var user = userA[0], msg = userA[1];
			if(curUserURL.nodeType == 3){
				if(curUserURL.nodeValue == user){
					var usrInfo = curUser.parentNode;
					
					usrMsgText = msg; 
					usrMsg = document.createElement("div");
					usrMsg.setAttribute("class", "usertitle"); 
					usrMsg.innerHTML = msg;                                           
					
					usrInfo.insertBefore(usrMsg, curUser.nextSibling);
				}
			}
		}
	}
}*/


//Call all of the anonymous functions if necessary
RESIZER('nooo')
//Javascript adder
ANONJSADDERCUST('nooo')
ANONJSADDER('nooo')
//SKINNING

RAPERMENU('noo')

//MOAR!!!!
MOARMENU('nooo')
//emotes
if (GM_getValue("postenhancer", true ) == true ){
EMOTIBUTTONS('nooo')
}
//OIFY CRAP
if ( isoify ){
	REMOVEMUSIC('nooo')
	ANONFAVICOMOD('noo')
	//Skin related
	if (GM_getValue("oifyskin", true ) == true ){
		ANONSKINNING('noo')
		//Oify Music
		if (GM_getValue("epicmusic", false ) == true ){
				ANONPLYTHTFUKYMUSIC('fhgg')
		};
		//Spoiler tag fix
		ANONOIFYSTAGS('noo')
		//reporting
		ANONOIFYREPORT('noo')
		
		
	};
	ANONOIFYBANNER('noo')
};
//NON-OIFY CRAP
if ( !isoify ){
	if (GM_getValue("skintog", false ) == true ){
		ANONJSADDER('nooo')
		//FP BAnner
		ANONNFPBANNER('noo')
	};
};
//Thread Shit
if ( myfnlocation.search(/showthread/) != -1 || myfnlocation.search(/private/) != -1 || myfnlocation.search(/showpost/) != -1 ){
	//User PanelF, posthider, and jump to top
	if (GM_getValue("upanel", true ) == true ){
		ANONUPANEL('noo')
		//ANONUPANELon('noo')
		//ANONPOSTHIDER('noo')
	};
	//Post Ignore list
	if (GM_getValue("hitlist", true ) == true ){
		//ANONAUTOPSTHIDE('noo')
		ANONIGNORELST('noo')
	};
};
//Forum Shit
if ( myfnlocation.search(/forumdisplay/) != -1 ){
	//Blank Titles
	if (GM_getValue("ununicode", true ) == true ){
		ANONUNBLANKTIT('noo')
	};
	//Thread Ignore list
	if (GM_getValue("hitlist", true ) == true ){
		ANONIGNORELST('noo')
	};
};

})();

//This Space for Rent!