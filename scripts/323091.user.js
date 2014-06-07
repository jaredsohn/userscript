// ==UserScript==
// @name	ignore_user
// @namespace	me
// @description	This script ignores all trolls, and their quoted replies in the HardwareZone forums
// @include	http://forums.hardwarezone.com.sg/*
// @updateURL   https://userscripts.org/scripts/source/323091.meta.js
// @downloadURL https://userscripts.org/scripts/source/323091.user.js
// @version 1.0.1
// ==/UserScript==

function canIgnore(sUser) {
	if( sUser.match(/Yowe55/i) )
		return true;
	if( sUser.match(/ribena_berries/i) )
		return true;
	if( sUser.match(/radish/i) )
		return true;
	if( sUser.match(/paplumberwan/i) )
		return true;
	if( sUser.match(/NY__chickenpie/i) )
		return true;
	if( sUser.match(/Knight of Despair/i) )
		return true;
	if( sUser.match(/Bonadaly/i) )
		return true;
	if( sUser.match(/bemylove/i) )
		return true;
	if( sUser.match(/edmw_superman/i) )
		return true;
	if( sUser.match(/InnovaIQ/i) )
		return true;
	if( sUser.match(/angeltst/i) )
		return true;
	if( sUser.match(/Keverus/i) )
		return true;
	if( sUser.match(/emilyy/i) )
		return true;
	if( sUser.match(/Dr.Bonadaly/i) )
		return true;
	if( sUser.match(/stir ah stir/i) )
		return true;
	if( sUser.match(/twinkle07/i) )
		return true;
	if( sUser.match(/LightningStrikes/i) )
		return true;
	if( sUser.match(/hengheng96/i) )
		return true;
	if( sUser.match(/Wong K-Y/i) )
		return true;
	if( sUser.match(/654321/i) )
		return true;
	if( sUser.match(/Stupid Idiot/i) )
		return true;
	if( sUser.match(/Luckyboy86/i) )
		return true;
	if( sUser.match(/LazyBones/i) )
		return true;
	if( sUser.match(/Nitrile/i) )
		return true;
	if( sUser.match(/RJ45Cable/i) )
		return true;
	if( sUser.match(/Hiling care/i) )
		return true;
	if( sUser.match(/steven jialat/i) )
		return true;
	if( sUser.match(/jayjay07/i) )
		return true;
	if( sUser.match(/wMulew/i) )
		return true;
	if( sUser.match(/Ventide/i) )
		return true;
	if( sUser.match(/yeoyixin/i) )
		return true;
	if( sUser.match(/kitsura/i) )
		return true;
	if( sUser.match(/RadioAddict/i) )
		return true;
	if( sUser.match(/fox1/i) )
		return true;
	if( sUser.match(/Short_Time/i) )
		return true;
	if( sUser.match(/Ribbons_almark/i) )
		return true;
	if( sUser.match(/welli stewpig idiot/i) )
		return true;
	if( sUser.match(/sgt_hippo/i) )
		return true;
	if( sUser.match(/Singaporean1st/i) )
		return true;
	if( sUser.match(/michael_thm/i) )
		return true;
	if( sUser.match(/Nature Boy/i) )
		return true;
	if( sUser.match(/ProRick/i) )
		return true;
	if( sUser.match(/I<3PAP/i) )
		return true;
	if( sUser.match(/summersky1986/i) )
		return true;
	if( sUser.match(/nalide/i) )
		return true;
	if( sUser.match(/Luckyboy02/i) )
		return true;
	if( sUser.match(/Damn Stupid Wor/i) )
		return true;
	if( sUser.match(/smallbirdman/i) )
		return true;
	if( sUser.match(/mistersatki_/i) )
		return true;
	if( sUser.match(/WonderGirl/i) )
		return true;
	if( sUser.match(/onlinemoniter/i) )
		return true;
	if( sUser.match(/sAVaGEmP5/i) )
		return true;
	if( sUser.match(/TrueBlueSingaporean/i) )
		return true;
	if( sUser.match(/SiaoKau369/i) )
		return true;
	if( sUser.match(/Oppsuprlsr/i) )
		return true;
	if( sUser.match(/Poh Mata/i) )
		return true;
	if( sUser.match(/FriedBaconWong/i) )
		return true;
	if( sUser.match(/xiang887/i) )
		return true;
	if( sUser.match(/EDMW Psychiatrist/i) )
		return true;
	if( sUser.match(/bladehamster/i) )
		return true;
	if( sUser.match(/mikeoscar/i) )
		return true;
	if( sUser.match(/life_is_crazy/i) )
		return true;
	if( sUser.match(/Carnage/i) )
		return true;
	if( sUser.match(/PoYePoLuoMi/i) )
		return true;
	if( sUser.match(/ChinaCandy/i) )
		return true;
	if( sUser.match(/whitecolour/i) )
		return true;
	if( sUser.match(/cybercom8/i) )
		return true;
	if( sUser.match(/sxe_mytra/i) )
		return true;
	if( sUser.match(/ribenafish/i) )
		return true;
	if( sUser.match(/satki officer/i) )
		return true;
	if( sUser.match(/PoloBoiBoi/i) )
		return true;
	if( sUser.match(/widman01/i) )
		return true;
	if( sUser.match(/Tiongz/i) )
		return true;
	if( sUser.match(/whiterthanwhite/i) )
		return true;
	if( sUser.match(/machinery/i) )
		return true;
	if( sUser.match(/i ish hab a kwestion/i) )
		return true;
	if( sUser.match(/ahgong_tiger/i) )
		return true;
	if( sUser.match(/dunno88/i) )
		return true;
	if( sUser.match(/Abdul Rahman Bin Kassim/i) )
		return true;
	if( sUser.match(/Majulah/i) )
		return true;
	if( sUser.match(/behkan officer/i) )
		return true;
	if( sUser.match(/Rokusaburo/i) )
		return true;
	if( sUser.match(/Pigcanfly007/i) )
		return true;
	if( sUser.match(/misshanako/i) )
		return true;
	if( sUser.match(/cheesengboy/i) )
		return true;
	if( sUser.match(/pokkacoffee/i) )
		return true;
	if( sUser.match(/I_Love_PAP/i) )
		return true;
	if( sUser.match(/wujiandaosg/i) )
		return true;
	if( sUser.match(/A New Guy/i) )
		return true;
	if( sUser.match(/deathan9el/i) )
		return true;
	if( sUser.match(/bykte/i) )
		return true;
	if( sUser.match(/narcrollt/i) )
		return true;
	if( sUser.match(/Kumgong officer/i) )
		return true;
	if( sUser.match(/cheeko1234/i) )
		return true;
	if( sUser.match(/sinkiesongbo/i) )
		return true;
	if( sUser.match(/VanilaSky/i) )
		return true;
	if( sUser.match(/KiraX_19/i) )
		return true;
	if( sUser.match(/CAShop/i) )
		return true;
	if( sUser.match(/cran87/i) )
		return true;
	if( sUser.match(/ChinaCandy/i) )
		return true;
	if( sUser.match(/flower4s/i) )
		return true;
	if( sUser.match(/muddywaters/i) )
		return true;
	if( sUser.match(/Kumgong 0fficer/i) )
		return true;
	if( sUser.match(/pikafunk/i) )
		return true;
	if( sUser.match(/chiamingming/i) )
		return true;
	if( sUser.match(/cheeko4321/i) )
		return true;
	if( sUser.match(/typical_edmwer/i) )
		return true;
	if( sUser.match(/humanc0w/i) )
		return true;
	if( sUser.match(/Norman Osborn/i) )
		return true;
	if( sUser.match(/sleepy_person/i) )
		return true;
	if( sUser.match(/stir ah stir/i) )
		return true;
	if( sUser.match(/edmwclown/i) )
		return true;
	if( sUser.match(/_俏脸书生_/i) )
		return true;
	if( sUser.match(/Monster Boon/i) )
		return true;
	if( sUser.match(/[SG]Revolution/i) )
		return true;
	if( sUser.match(/.狗男人女人./i) )
		return true;
	if( sUser.match(/\*~内\*鬼~\*/g) )
		return true;
	if( sUser.match(/eatoofull/i) )
		return true;
	if( sUser.match(/celestite/i) )
		return true;
	if( sUser.match(/backsideitchy/i) )
		return true;
	if( sUser.match(/angelababy1/i) )
		return true;
	if( sUser.match(/born2win/i) )
		return true;
	if( sUser.match(/Stickerz/i) )
		return true;
	if( sUser.match(/honestedseller/i) )
		return true;
	if( sUser.match(/crimsontactics/i) )
		return true;
	if( sUser.match(/advrider/i) )
		return true;
	if( sUser.match(/cheowyonglee/i) )
		return true;
	if( sUser.match(/hoseiguy/i) )
		return true;
	if( sUser.match(/manutd887/i) )
		return true;
	if( sUser.match(/ImFromPipiForum/i) )
		return true;
	if( sUser.match(/AhBui168/i) )
		return true;
	if( sUser.match(/long_bird/i) )
		return true;
	if( sUser.match(/Patsfoo/i) )
		return true;
	if( sUser.match(/coltish/i) )
		return true;
	if( sUser.match(/thesealevel11/i) )
		return true;
	if( sUser.match(/whereismymill/i) )
		return true;
	if( sUser.match(/cheapeskate/i) )
		return true;
	if( sUser.match(/god_of_smallthings/i) )
		return true;
	if( sUser.match(/lovessammy/i) )
		return true;
	if( sUser.match(/chewbacca1/i) )
		return true;
	if( sUser.match(/prusswan.net/i) )
		return true;
	if( sUser.match(/Ferderico/i) )
		return true;
	if( sUser.match(/ashkrevron/i) )
		return true;
	if( sUser.match(/adrchi2000/i) )
		return true;
	if( sUser.match(/EveMuffins/i) )
		return true;
	if( sUser.match(/Jackygogogo/i) )
		return true;
	if( sUser.match(/sturrer/i) )
		return true;
	if( sUser.match(/vovolversace/i) )
		return true;
	if( sUser.match(/Magpir/i) )
		return true;
	if( sUser.match(/aromilk/i) )
		return true;
	if( sUser.match(/fapnoodles/i) )
		return true;
	if( sUser.match(/taogege/i) )
		return true;
	if( sUser.match(/derazor/i) )
		return true;
	if( sUser.match(/guayan/i) )
		return true;
	if( sUser.match(/TeenTitan01/i) )
		return true;
	if( sUser.match(/kamikazeben/i) )
		return true;
	if( sUser.match(/MoyoCase/i) )
		return true;
	if( sUser.match(/melonseed/i) )
		return true;
	if( sUser.match(/Whychiusostupid/i) )
		return true;
	if( sUser.match(/truefriend/i) )
		return true;
	if( sUser.match(/JM_LAU/i) )
		return true;
	if( sUser.match(/SMB388S/i) )
		return true;
	if( sUser.match(/smellypie/i) )
		return true;
	if( sUser.match(/Capitalist/i) )
		return true;
	if( sUser.match(/Zangief/i) )
		return true;
	if( sUser.match(/galatic/i) )
		return true;
	if( sUser.match(/kominato/i) )
		return true;
	if( sUser.match(/sweet_talker1/i) )
		return true;
	if( sUser.match(/hovivi/i) )
		return true;
	if( sUser.match(/megabyte14/i) )
		return true;
	if( sUser.match(/Strawberry_Cream/i) )
		return true;
	if( sUser.match(/Daimon/i) )
		return true;
	if( sUser.match(/ahboy82/i) )
		return true;
	if( sUser.match(/sgvideoman/i) )
		return true;
	if( sUser.match(/sevenoaks/i) )
		return true;
	if( sUser.match(/Dark84/i) )
		return true;
	if( sUser.match(/Ultrasofty/i) )
		return true;
	if( sUser.match(/bei_ge_wang/i) )
		return true;
	if( sUser.match(/jiiaying/i) )
		return true;
	if( sUser.match(/cloud24/i) )
		return true;
	if( sUser.match(/stanzza/i) )
		return true;
	if( sUser.match(/Jwee85/i) )
		return true;
	if( sUser.match(/Henry Ng/i) )
		return true;
	if( sUser.match(/therealsamhui/i) )
		return true;
	return false;
}

function getUserFromQuote(sHtml) {
	aM=sHtml.match(/<strong>(.+?)<\/strong>\s*wrote:\s*$/i);
	if(aM[1])
		return aM[1];
		
	return ''; //user not found
}

function setIgnoreThread() {
	var a; var s;
	
	a=document.evaluate(
    "//span[starts-with(@style, 'cursor:pointer')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	for (var i=0; i<a.snapshotLength; i++) {
		s=a.snapshotItem(i).innerHTML;
		if( canIgnore(s) ) {
			//a.snapshotItem(i).parentNode.parentNode.parentNode.style.display = 'none';
			a.snapshotItem(i).parentNode.parentNode.parentNode.innerHTML = '<td class="alt1"></td><td class="alt2"></td><td class="alt1"></td><td class="alt2"></td><td class="alt1"></td><td class="alt2"></td>';
		}
	}
}

function setIgnorePost() {
	var a; var s;
	
	a=document.evaluate(
    "//a[starts-with(@class, 'bigusername')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	for (var i=0; i<a.snapshotLength; i++) {
		s=a.snapshotItem(i).innerHTML;
		if( canIgnore(s) ) {
			//a.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
			a.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML = '<table width="100%"><tr><td class="thead">...</td></tr></table>';
		}
	}
}

function setIgnoreQuote() {
	var a; var s;
	
	a=document.evaluate(
    "//span[starts-with(@class, 'byline')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	for (var i=0; i<a.snapshotLength; i++) {
		s=getUserFromQuote( a.snapshotItem(i).innerHTML );
		if( s!='' && canIgnore(s) ) {
			//a.snapshotItem(i).parentNode.style.display = 'none';
			a.snapshotItem(i).parentNode.innerHTML = '';
		}
	}
}

if(window.opera) { //opera only
	(function(){
		document.addEventListener('DOMContentLoaded', function() {
			setIgnoreThread();
			setIgnorePost();
			setIgnoreQuote();
		}, false);
	})()
} else {
	setIgnoreThread();
	setIgnorePost();
	setIgnoreQuote();
}