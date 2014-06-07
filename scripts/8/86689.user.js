// Copyright (c) 2010-2012, RxR

// ==UserScript==
// @name	Gladiatus Guildmail Link
// @namespace	RxR Gladiatus
// @description	Adds link to Guildmail
// @include	http://*.gladiatus.*/game/index.php?*
//
// Auto-update function. Many thanks, Buzzy!
// @require	http://buzzy.260mb.com/AutoUpdater.js
// @version	0.13
//
// @history	0.13 29.07.2012 settings are in "Game" section of "Profile" (because of new design of "Profile" in v.1.10.0)
// @history	0.12 20.07.2012 fixed bug
// @history	0.11 19.07.2012 added check for praying to prevent unceasing refreshing if auto-attack is turned on; added link to settings
// @history	0.10 18.07.2012 added auto-attack for dungeons feature; added options object and ability to turn on/off all features
// @history	0.08 15.07.2012 added links to Costumes and Mystery-box; set automatically Duration to 24 hours in the Market; automatically check for bonus
// @history	0.07 07.06.2012 added feature of removing ads
// @history	0.06 15.03.2012 fixed bug in Guild Bank caused by changes in v.1.7.0
// @history	0.05 18.02.2012 redesigned to work under v.1.7.0
// @history	0.04 25.12.2011 redesigned to work under v.1.6.0
// @history	0.03 13.02.2011 removes all dots in amount of gold
// @history	0.02 17.12.2010 automatically adds total amount of gold to Guild Bank's "How much" input
// @history	0.01 24.09.2010 first version
//
// ==/UserScript==

autoUpdate (86689, "0.13");					// Buzzy's autoaupdate

if (!GM_getValue || !GM_setValue) return;			// opps, my precious functions're missing

var delayForReady = 10;						// delay in milliseconds for waitForReady's setTimeout
var maxDelayForReady = 1000;					// maximum delay in milliseconds for waitForReady's
waitForReady(main, delayForReady);				// wait while document is ready and then call main()

const dot = ".";
const SPRTR = "&";						// separator

const cLOWER = -1;						// constants for versions comparison
const cHIGHER = 1;
const cEQUAL  = 0;

const I_GM_LINK		= "RxR_GM_link";
const I_COSTUMES_LINK	= "RxR_costumes_link";
const I_MB_LINK		= "RxR_MB_link";
const I_REMOVE_ADS	= "RxR_remove_ads";
const I_ADD_CASH	= "RxR_add_cash";
const I_CHECK_BONUS	= "RxR_check_bonus";
const I_SAVE_BUTTON	= "RxR_save_button";
const I_OFFER_DURATION	= "RxR_offer_duration";
const I_SETT_BOOKMARK	= "RxR_sett_bookmark";

const fDURATION_2	= "0";
const fDURATION_8	= "1";
const fDURATION_24	= "2";

var refreshPage;						// function for page's refreshing - used for auto-attack

// game version template
function tGameVersion () {
	this.bigVer = 0;
	this.midVer = 0;
	this.lowVer = 0;

	this.getGameVersion = function () {
		var footerNodes = xpath(document, '//div[(@class="footer_links")]/a');
		if (footerNodes.snapshotLength > 3) {
			footerNodes = footerNodes.snapshotItem(3).innerHTML.split(".");
			this.bigVer = footerNodes[0].replace("v", "");
			this.midVer = footerNodes[1];
			this.lowVer = footerNodes[2];
		}
	}
	this.getGameVersion();
	this.compareWith = function (ver) {				// ver is string e.g. "1.1.2"
		ver = ver.split(".");

		var bVer = parseInt(ver[0], 10);
		var mVer = (ver.length > 1)?parseInt(ver[1], 10):0;
		var lVer = (ver.length > 2)?parseInt(ver[2], 10):0;

		if (this.bigVer < bVer) return (cLOWER);
		if (this.bigVer > bVer) return (cHIGHER);
		if (this.midVer < mVer) return (cLOWER);
		if (this.midVer > mVer) return (cHIGHER);
		if (this.lowVer < lVer) return (cLOWER);
		if (this.lowVer > lVer) return (cHIGHER);
		return (cEQUAL);
	}
}

function tOptions (_L, _S) {					// _L = label for get/set, _S = items' separator
	const fAUTO_ATTACK	= "A";
	const fSHOW_GM		= "G";
	const fSHOW_COSTUMES	= "C";
	const fSHOW_MB		= "M";
	const fREMOVE_ADS	= "R";
	const fADD_CASH		= "D";
	const fCHECK_BONUS	= "B";
	const fNOTHING		= "-";

	this.label = trimStr(_L);
	this.itemsSeparator = _S;

	this.autoAttack = false;
	this.showGM = true;					// if true, link to guildmail will be added
	this.showCostumes = true;				// if true, link to costumes will be added
	this.showMysteryBox = true;				// if true, link to mystery-box will be added
	this.removeAds = true;					// if true, ads will be removed
	this.addCash = true;					// if true, all cash will be automatically added to donation
	this.checkBonus = true;					// if true, bonus will be checked once a day
	this.marketDuration = fDURATION_24;			// value of market offer's duration
	this.lastCheck = "01.01.2012";				// date of last bonus' check

	this.read = function () {
		var options = GM_getValue(this.label, "");
		if (options == "") return;
		options = options.split(this.itemsSeparator);

		this.autoAttack		= options[0].charAt(0)	== fAUTO_ATTACK;
		this.showGM		= options[0].charAt(1)	== fSHOW_GM;
		this.showCostumes	= options[0].charAt(2)	== fSHOW_COSTUMES;
		this.showMysteryBox	= options[0].charAt(3)	== fSHOW_MB;
		this.removeAds		= options[0].charAt(4)	== fREMOVE_ADS;
		this.addCash		= options[0].charAt(5)	== fADD_CASH;
		this.checkBonus		= options[0].charAt(6)	== fCHECK_BONUS;

		if (options.length > 1) this.marketDuration = options[1];
		if (options.length > 2) this.lastCheck = options[2];
	}
	this.save = function () {
		var options = 	((this.autoAttack)?fAUTO_ATTACK:fNOTHING) +
				((this.showGM)?fSHOW_GM:fNOTHING) +
				((this.showCostumes)?fSHOW_COSTUMES:fNOTHING) +
				((this.showMysteryBox)?fSHOW_MB:fNOTHING) +
				((this.removeAds)?fREMOVE_ADS:fNOTHING) +
				((this.addCash)?fADD_CASH:fNOTHING) +
				((this.checkBonus)?fCHECK_BONUS:fNOTHING);
		options += this.itemsSeparator + this.marketDuration;
		options += this.itemsSeparator + this.lastCheck;
		GM_setValue(this.label, options);		// write options
	}
	this.modifyDuration = function () {
		return (this.marketDuration != fNOTHING);
	}
}
var globalOptions = new tOptions(window.location.hostname.toUpperCase() + " settings", SPRTR);
globalOptions.read();

unsafeWindow.Element.prototype.click = function () {		// we need it because of auto-attack feature
	var evt = this.ownerDocument.createEvent('MouseEvents');
	evt.initMouseEvent('click', true, true, this.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
	this.dispatchEvent(evt);
}

const diceIcon	 = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%20%00%00%00%20%08%06%00%00%00szz%F4%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%00H%00%00%00H%00F%C9k%3E%00%00%00%09vpAg%00%00%00%20%00%00%00%20%00%87%FA%9C%9D%00%00%09%95IDATX%C3%8D%97il%1DW%19%86%9Fs%CE%CC%5D%BD%C6qb%C7v%9C%C4q%12'q%9D4Ii%0B)%5DI%D3D%B4%94%02%09P%10%AB%90%10T%80T%84%40H%A5-RE%8B%80%3F%08*T%81Z%A9H%88E%94BSZ%BAB%D3%A4%A5%A4i%E2%3A%89%D38%BE%B1c%FB%5E%2Fw%9D%99%B3%F0%E3%3A%5EZ%12q%A4%D1%8CfF%E7%7D%BE%F7%FB%BE3g%84s%8E%DF%7Fy%2F%17%1B%3A%08%97%A7%976%FE%7C%C9%EA%B6%CD%02%13%84%85%02%3ABD%95(%17%16J%25%A0%E8%AC%9D%04%CA%D6%D8%9Cs.%87s%D3X%3Ba%9D%9Bt%D6%0E%3Bcs8%ABU%2C%5EF%CC%CF%7D%FB%2F%9F%C0%E3%12%C3%84%D1%E5k%3E%B8%FD%8F%5B%F6%EF%EE%F0%E2)%86O%14(%E4%25%1Dk%3DR%B5%02%1D%1Ap%A0%83%10g%2C%3A%8A%B0%91%C6j%8D%095%26%8A%8C%09%A2%C0%E8(%98%1E%CEUN%1Cx%E1%BB8%FB%08b%9E%E2%A2%00%BA%1C%A4%9B%7BV%DF%B3%FDswt%1C%7F%23%E4%C0%C3%FF%E0%E4%D1%09%F2%BA%8D%BB%7F%BA%95%8D%3Bj%F1%93%16%00%3F%95%86%B9%D0%16%9D%15%90%02%95%0A%8B%82%EC%C93%DF%18%3F%3E%F0%B8%8A%C7%CA%97%04%B0%C6%90j%AA%BF%7F%CB%FE%BD%7B%11q%8E%BCt%86%A1sqn%FB%EA%0D%C4k%A0ks%120%80%E3%FF%19aI%22d%82%F6m%DB6L%0C%9C%D8%84s%87%2F%B8%F0%3F%01L%10u%F5%7C%F2%FA%3B%1BWw%03%25%3E%F1%B5N%3E%F1%B5U%EF%8A%D0%01%12%B0%97%06q%605(%2F%60%E5%8E%0E%BF%FF%C9%DA%CD%95%99%D2a%A9.%02%60%C2%88%A5%DD%9D%0F%AC%BCr%CB%12%08%16%88U%C7%C4y%CD%9BO%1D%E1%CC%D1%0C'2%CD%DC%F4%F1n%AE%BDu%C9E!%82%BC%04%23%19%3AQ%A4X%B2%D4.k%DCR%9E*%80%920%1B%C2%3C%AC%B5%08%25%BF%DD%B7%7F%CFG%FDt%DD%AC%CD%F3%A1%84%01%3C%FA%E0%19%1E%B8%BB%9F%81%C1%14%E9t%92%E6%D6%D8%C5%83%B7%E0%90%24R%11%C3'Gy%FC%17%23h%D5%B0G%0A%9B%7Co%0D8%875%F6%8A%9E%3D%1F%BCg%E9%BA.%20%7C%CF%84~%CC%B1%FB%93-l%FD%C0.Voh%A2%A5S%12K%98%D9%B4%5C%98%CA%CE%A5EW%24%CE%81)%15H%A6%02%CE%9D%9E%A4%D4%93%5E%23%25%DB%1D%BC%B8%08%40%07aK%DB%B6%8D%3F%D9%7C%C7-%F1%8B%E5U%08X%BF5%CD%FA%AD5%B3%22%1A%E7%04%99%C1%0A%D9%93gy%EB%98!%5D%9F%E2%9A%BD-4.%8B%11%14%15.*%91P%A3%2Ck%11(%25%F1%97%2C%93%DEx%E2%86R%C1%CC%03XcH44%FE%B0%F7%8E%5B%AE%AAFc%2FQ%D3%0B%9FI%0E%3F%9B%E7%C1%BB%5Ef%3Cs%84B%C5cy%CBZ%D6%F5%5DGcS%02%3F%E5%B0%D9%11%847IKk%3D%3D%97%2F%A3%B1%5D%10L%D4u%17g%B2%F3)%10%C2%EDX%B7k%D7G%93KV%11%95J(_%22%A4%03%E1%10%F2%12%2C8%1A%97I%AE%DE%DDN%2C%B5%8Am%3B%DB%A9m%B4t%F5%D4P%CE%83%09%2B%C4%A2q%F0%2C%09%BF%CC%A7%BF%90%A6%BE%C9%E7d%AE%A5s%E4%C4%98%04%AC%07%E0%A7R%FB%DB%B7%AF%AB%8B%CA!%BA%22%00%81T%20%3D%87%F4A%F9%2C%EE%BE*4B%40%D7%A6%1A%EE%FAQ_%B5%E0%9CA*A9'%10%9E%C3%E4%CE%E1%C7%A6%40%C7%C1%05%B4%B4%3AH%D5%90j%AA%E9%10B%24%81b%B5%06%9C%8C%81%22%91%0E!%A11%11Xm%B0%C6b%8D%C0%05%D5%02%10R%82%148%2B1Fb%CDl%2BI%87%94%80%90HO%12%AF%B7D%C5%0AI%7B%0A%E1%020%B3%F4%01%A0%CA%A4%EB%E3%AD*%E6m%00%5E%9B-B%7B%5E%F9%05d%5Cr%E6X%C0%1B%2F%14Y%D3%E3%D3%BB%C3%81%09%B1%91A%60%10%CAa%03%0F%AB%0D%84%1A%1B%0A%8C%06%ED%24B)%84R%A0bx%F1F%04%20l%04%26%5C%DC%ED%A1%22Y%17%F3%95%A7%3E0%07%60%B59a%CB%05%262u%3C%F0%CD%D7%F8%C3S%8F%B3a%E5v%BE%7D%CF%87%B8y%9F%87%C4%A0%03%C7%81%3Fh%0E%BFx%8E%DE%EDM%DC%B4%C7P%D7X%80%D0%02%11%26%F2(%CD%C4%88%A9%02%A53m%F8%AD%DD8%9B%C47%93%8B%01%22I2%ED%E1'%FC%AE%F9.%D0%FAh%98%9F%09Jze%7Cp%ECmF9Dv%E8%2CO%FF%BE%9B%9Bo_%0B1%CD%3Bo%A6%F8%C9C%CF%F1%F4%F1%DF%B0%FE%B77R%9A%BE%8DO%7DQ%82%0C%18%1E%AA%E3%D1_%05%BC%F2%F2%00%EF%DF%B9%92%7D%FBg%A8M%94%90%AE%16t%08N-%A8%1FA%2C%E6%D3%D0R%BBrn%25%B4%C6%0EU%A6%0B%F9d%8Dek%EFV%24i%3CjH%D7%C4%01%0DV%13%05%3Ee5%06%CC0T%F97%FDof%C1%3Ap%8E%A3%FFi%E0w%7F%7D%9E%3F%1D%7B%88%9F%FF%FAo%BCu%C4!u%1E%A3%EAp%DA%82%8D%A8%16V%086%00%CFR%DF%9Cn%9Es%C0D%BAR%18%9F%C9to--%DD%B5%B7%93%99%B1%EF%93L%C6%F8%F8%97Z%C1U%20%D2%D47%86l%EB%BD%82%83G%9F%A3-%BE%99%B5%3D%0D%20f%A0lH%A4S%D4%B5j%18%86%5C%25%C3T.%20%A1%B2%E4%E3%2B0e%F0de%BE%8D%9C%03%ABH%D6%FA%8D%0B%D6%01%11Ng%26F%A1%D2w%ED%9E%88%AB%AF%D9%88%F2%22%94W%81%D0%80%B3%ACh%1D%E7%F6%0Fw%924%F7%B3~s%9A%5B%3FR%80(%00%A5%A9%AF%9D%A6%AF%EBF%0E%1D%EA%A7%AF%E3%3A%FA%FA%02%BCh%02%95X%8Dqq%3C3MukPu%0C%13%12%95%83%D2%1C%80%F4%14%D9wF3%26_B%C5%04%B1d%05%8C%9E%13%C7%1A%40%B3%F3%9Aq%AE%BA%C2CyY%A4(Cd%C1%196u%9F%E4%F3%FB%96%B0%7D%C3%D7Y%BF%AE%CC%86%AEa%82B%03%5E%BD%C0%A94%B8%5C%B5%1B%9C%03_%60%0Be%CE%0Dd%DF%DA0%E7%80%92%14%B33'%A73c%2CY%D3%5C%15%B6%06%DC%ECa5X%83p%1A%3FV%06m%C0%DA%B9%FB1%A5%E9%DD4D%EFf%09%A6%02A%08Q%01%1Dh%BCx-%04f%B6%96%1C8%C1%D4h%89%A9%B1%D2%81%B9%22%14B%A0%83%E8%D5%EC%E9%91%D9O%C1%02as%01%A6*Fd%E7%C5%9D%AE%BEg%2C%84%0E*%01T%2CX%87%B4E%C2b%88%88%D5%10%86)*Q%BA%FA%1D%11%9A%A9%F3%85%8C%D6%EEI%166%A8s%EE%D5%E2%C4%CC%08%3A%9A%157%8B%85%DE%ED%C8%C2w.%5C%9B%D9tY%83%12!%B68%85U%0D%BC1%D0%C13%AFn%00%25%20%D4%9C%3BU8%8Ccr%11%80%902_%CC%E5%9F%23%08%80%D9%88eX%3D%DC%05%98%85%E2z%B13F%CF%DE%D3%60-%CA%8B%F0%A3Q%22%1A%98%9AT%1C%FC%97%06%11%E7%FC%992%E7%87%82%BF%2BO%B0%08%40*I!%9B%7F%C5DAu%12%2CS%D9z%A6r%0D%20%AA%AB%DD%9C%80%08%C1%8F%40%85%F3%C2NW%FB%DD%CD%EE%A2%04%C4%C58x1%BC%9Af%26%C6%23rS%B5dN%15_%D7%DA%3Erag%3E%EF%80%10%94%A7%CB%83%C5%89%19%F0%1D%FFx%3A%CD7%BFz%96o%7D%7D%84W%5E%AE%07%E9%AA%22%22%22%97%AD%E3%AD7V06%DA%042%02%17U%5D%10%1A%E2%0E%12%12%7CGBL%22%7D%C7%B2%B6%1A%EA%1Ak%C8%E5%24S%E3%C1%A3J%89%E2%05%5Do%3E%05%82%B0%14%F6%8F%1C%3B%5B%AE%5B%B6-%F9%C4%13Y%1Ey%FE%3E%40S(%7D%87%1F%B7%B7%D3%D6%3E%C8%F4D%13%F7%3F%E0%F8%CBS%CF%B0%A5w%13%F7%7C%A7%83%F5%ABO%820%04Q%8A%7F%FEk%05%23%23%3E%3B.%9F%A1%AB%E3%1C%C2%96%E8X%23%F9%D0%8D%96%DC%D9%89p*k%9E%95J-%D8%D2%2C%DCr)9%989%3Ez%B8%92%2F%D3%B9n9I%2F%09D%8Cg%A7(%16%3C%90%86%B7O%B5sp%F0%10o%97%FE%C4_%0E%FE%96%3F%1FX%0A.%0ER%F1%CC%C1-%7C%EB%DE%A3%7C%FE%BE%87%F9%DE%0F-%E3%93%CB%91%D1%14~%5D%92%AB7%1D%26%7Bj%F8o%D6%CA%FF%2C%D4%5C%04%20%95%B03c%A5G%A3%E2(%3B%AFN%F1%99%9B%EF%E6%CA%96%CFr%E7%BEu%AC%ED%1C%86%C0%D0%D4%90%E7%B2%9E%ED%80OR5%D1%D8%00%08MXI%90%C95QJ%1C%23%A0%9FC'%5E%25s%BE%19Q%CC%81W%CB%F89%19%94%F2%FA%07B%8A%85%92%8B%FF%0B%84%10%E8%C8%3E6%F0%E2%3Bwm%DC%E96%DE%FB%DD%26%ACy%1FK%5B%26%90%A2%08%91%A0%AB%ED8%9F%BB%ED2%1A%D4%CFhY%12%F2%B1%DD%FD%60%03b%BE%A1%7BU%89%8D%9D%D7s%FA%9D%22%5B%D7%5CNg%DBy%C2%7C%1A%B1%DC%E7T%BF~%D6Z%F7%DA%02%F7%DF%0B0%EBBq%F0%DF%E7%EF%CC%0CL%ECknK%AEjjM%B5%96%87%FDV%CF%97K%E3%09Q%13%8F%5B%D5%BB%E2%9F%F4%7C%A5%81d*%40%C9bu%9A%98%E5%CA%CB%0E%C1%9D%9B%B8%A9o%25%EF%BB*%A0%A9%F94y%BF%97%D2%C4%08%B9%E1%B1%C7%A5%A7%DE-%F7%BF%7F%CD%94%2F_%8F%02%FB%FA%D9%81%02C%C7%F3R(%11%93J%A4%A5%14%EB%84%12%EB%95%A0My%99%E6x%D2%ABM%A6%FD%DAXB%A4%FC%B8L%26S%D3%C969%22V_%11KK%1B%CA%23%2F%D5%17%2B~%7F4uz%F0%15%AB%F5cR%BD%17%E0%BFVW%DF%A7%D2%0D%12%FB%00%00%00%25tEXtdate%3Acreate%002010-02-11T11%3A50%3A35-06%3A009H%03%D8%00%00%00%25tEXtdate%3Amodify%002006-05-11T17%3A39%3A46-05%3A00vt%02E%00%00%00%00IEND%AEB%60%82";
const armourIcon = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%20%00%00%00%20%08%03%00%00%00D%A4%8A%C6%00%00%03%00PLTE%01%00%00%FF%FE%CB%FF%FE%99%FF%FEe%FF%FE3%FD%FD%00%FF%CB%FE%FF%CB%CB%FF%CB%99%FF%CBe%FF%CC3%FD%CB%00%FF%99%FE%FF%99%CB%FF%99%99%FF%98e%FF%983%FD%98%00%FFe%FE%FFe%CB%FFe%98%FFee%FFe3%FDe%00%FF3%FE%FF3%CB%FF3%98%FF3e%FF33%FD2%00%FD%00%FD%FD%00%CB%FD%00%98%FD%00e%FD%002%FD%00%00%CB%FF%FF%CB%FF%CB%CC%FF%99%CB%FFe%CC%FF3%CB%FD%00%CB%CB%FF%CC%CC%CC%CB%CB%98%CC%CBf%CB%CB2%CC%CB%00%CB%99%FF%CB%98%CB%CB%98%98%CC%98f%CB%982%CC%99%00%CBe%FF%CCf%CB%CCf%98%CCff%CBe2%CCe%00%CB3%FF%CB2%CB%CB2%98%CB2e%CB22%CC2%00%CB%00%FD%CC%00%CB%CC%00%98%CC%00e%CC%002%CC%00%00%99%FF%FF%99%FF%CB%99%FF%99%98%FFe%99%FF3%98%FD%00%99%CC%FF%98%CB%CB%98%CB%98%99%CCf%98%CB2%99%CC%00%99%99%FF%98%98%CB%99%99%99%98%98e%99%983%98%97%00%98e%FF%98f%CC%98e%98%98ee%99e3%98e%00%983%FF%982%CB%993%98%993e%9933%982%00%98%00%FD%98%00%CC%98%00%97%98%00e%98%002%98%00%00e%FF%FFe%FF%CBe%FF%98e%FFef%FF3e%FD%00e%CB%FFf%CC%CCf%CC%98f%CCfe%CB2f%CC%00e%98%FFf%99%CCe%98%98e%98ef%993e%98%00ee%FFff%CCee%98fffee2fe%00e3%FFe2%CBe3%99e2ee22f2%00e%00%FDe%00%CCe%00%98f%00ef%002f%00%003%FF%FF3%FF%CC3%FF%983%FFf3%FF32%FD%003%CC%FF2%CB%CB2%CB%982%CBe2%CB23%CC%003%99%FF2%98%CB3%99%993%99e3%9932%98%003f%FF2e%CB3f%992ee2e23f%0033%FF22%CB33%9922e33321%002%00%FD2%00%CC2%00%982%00f2%0012%00%00%00%FD%FD%00%FD%CB%00%FD%98%00%FDe%00%FD2%00%FD%00%00%CB%FD%00%CC%CC%00%CC%99%00%CCe%00%CC3%00%CC%00%00%98%FD%00%99%CC%00%98%98%00%98e%00%982%00%98%00%00e%FD%00f%CC%00e%98%00ff%00f2%00f%00%002%FD%003%CC%002%98%003f%0022%002%00%00%00%FD%00%00%CC%00%00%98%00%00f%00%002%EE%00%00%DC%00%00%BA%00%00%AA%00%00%88%00%00v%00%00T%00%00D%00%00%22%00%00%10%00%00%00%EE%00%00%DC%00%00%BA%00%00%AA%00%00%88%00%00v%00%00T%00%00D%00%00%22%00%00%10%00%00%00%EE%00%00%DC%00%00%BA%00%00%AA%00%00%88%00%00v%00%00T%00%00D%00%00%22%00%00%10%EE%EE%EE%DD%DD%DD%BB%BB%BB%AA%AA%AA%88%88%88wwwUUUDDD%22%22%22%11%11%11%00%00%00%11%A6%F0E%00%00%00%01tRNS%00%40%E6%D8f%00%00%01%94IDATx%DAm%92%CDJ%C3%40%14%85%CF%E4%A7%0D%14%8A%88%CF%E0%C6w(%7D%05%D7%E2JhC%A9%7D%16)%B8%A8h%17J%C0E%C1%17pU%7C%86%3C%82%1BQ%8AX0i~%BCw~%92I%CC%90%90%CC%BD%1F%E7%CC%9C%19%81%E6(%E9%15vA4%7B%18%00If%97E%DD%3B%D6%A5%24%01jF~%CA%09b%FAlG%DB%11%B6'%1F%C3%EF!3%C2%02n%E2%D5t5%C5%9D%D1%1D%EC%8E%B0%17m%0B%20%3F%B8%B9%9B%2F%D6%3F%01Z%16%05%23%25%BD%D4%07%01%80%7F%08l%8B%82%25%18%90%24%13m%C0(%14%3C%EB%02%B8%AFVB%C8u%1B%A8%1D%14%A1%00(B%D4%0E%E3X%07%85%8B%F5%90%D2%CADKa%FCfb%98D%FB%CA%DER%98%B1B%2C%15%A2~%87%82I%8B%C6%2C%DA%C1)%7C%D1%CE%A1%90%BB%A4%B1%88%3E%E1%E5%7D%1B%40I!%A7%E8%C9%07%F3h%FF%1B%24%FD%B6%02rc1g%05%EF_%92%94%84%A3~%3A%00*%93G%E6e%F0R%2Fd%87%83%DF8n%B5J%9AQ%E0nh%AD%B1%02%E4*y%E7%25%9CN%40%25%E1%E5%E4%24Bk%13%0D%05%14%8E%2C%85%9B%F7n%05W%87%CB%40%D0%B8r%D5*%B5%C5%E6%2B3%02%EA%2C%A0%EFZ)%2C%07%DD%14T%7F%00%AE%8A%EA%A8%C4r%F3%0A%AF%F4%B9%CA%D3%7B%A0%07%5C%AA%DBh%00%97%CE%F2%09Hy%FA(%81%1E%CE%D5%7D%A4%B1%8Co%E1%3A%2F%A9%06%9E%B5r%0F%A78%93%10%01%3E%B8%AF%1C%0D%20%854T%B7%81%3F%98%D3%F9%AED%D7.%C5%00%00%00%00IEND%AEB%60%82";
const autoAttack = "data:image/gif,GIF89a%19%00%19%00%E6%00%00LSUYeh%1C%14%0EI6*%3CCD%1F%16%10%9B%AE%B13(%15BIJv%86%89-13%2B%22%11kz%7C%26**%82%90%91%1A%17%11bI%3AYB3%23%1A%12QYZ%20%19%0D(%2C-%A7%B7%B8%22%24%23%14%14%13%25%1D%0E%1C%1C%1C0556%3C%3E289GOP%15%12%0B7%3F%40%0C%0C%0B49%3A178%17%18%16bopQ%3D.%1E%19%0E%13%0F%06S%5E_%1E%20%1F%2B%2F0%8D%9F%A2%3E.%22%3B%2F%16'%1F%0F3%3B%3C5%3B%3B%B0%BF%C0.0%2F%24()'(%25C2%26696(%20%10%3A%40A%3B%3F%40D4%19%17%19%19%23%1B%0D%5Ekm%FF%FF%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%09%00%00%3F%00%2C%00%00%00%00%19%00%19%00%00%08%FE%00%7F%08%1C8%F0%C0%82%05%2Fp%2C8%40%B0%A1%C3%1F%07z%5C%D8%80%20%C5%04%0E%15N0%7CHp%C7%8B%0B%15%198%60%C1%22%C1%84%09%0A(l%7C%E8%E2A%0A%162J%10%400%02%04%8D%0D2%0C%24P%B1%80%25%0D%0F%1EJL%00%11C%C4%86%11%0FV%00%F0%11%80%00%88%9E%1DU8%B0PC%C3%D1%15%1D%08%88%D0%C0aC%83%10%2C%2C%C0%C8%40%F0%C4H%00%1CH(%00%A0%C3%C5%80%1D6%02l%1DA%C0%81%81%1A%05%2F%F8%40%A0%A0%ABU%20%80%03%D7%A8%C0%17F%00%0F8%04f%08%00%00%83%0A%8A%172%04%0E%BCC%EE%05%0C3%18T%F8%E1%A2%81N%1D%2B4%F0%C0%00a2%60%089.4%10%E1C%86%87%03%07%26%B0%18%B1%C1%03%02%0C%05L%07~%00%60(%0D%918%5E8%08%80%15%E3%83%03%BA%01%EFH%D1%A1%83%02%02%2Cz%BC%20%40B%83%0A%0D%1F%04%94N%0E%81%40%85%EA%18t%ECP%A0%90%02%81%07%00%00x%E4%0E%0Ca%3B%60%00%01%10%F4%5E%91%01E%82%1CYa%90p1%19%C2%8E%C9%3E%94%D0%97w%14h%90%40W%1Ct%40%82%7B%C99%E0%C3%0C%1D%E4%90%D1t4%D0%D0%80%0A%0F%24gZj%0D%D4%40B%0F%19%F8p%DE%04%00%F0%A7a%60%25%8C%B8%C2%0B%3D%24%00%C2%06%20t%C0%60%7B%EDM%E6%80%020%E4%D0%40%0F%3D0%F0b%82%A6%D1%C8%20%10X%E9HA%06%04XX%C3%05%0F%14P%00%04%02h'%C0%93S%DE%90Z%05%0Dh%90A%06)z%90%02%00'P%20%A5%00%11L%09%81%93%08%94%80%C0I3%2C%D0%23%82%0A%16%20%80%0DQ%0E%20%C0%07v%0A0%81%0FE6%C0%22%031%F45%02%09bF%99%5D%94Q%16%00_q%0Dd%80%83%0A%18%8C%86A%08(%80%B8%E5%96%20%F6%F0%81c%18D%1AB%0F%01%01%00";
const prefsIcon	 = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%20%00%00%00%20%08%06%00%00%00szz%F4%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%0AOiCCPPhotoshop%20ICC%20profile%00%00x%DA%9DSgTS%E9%16%3D%F7%DE%F4BK%88%80%94KoR%15%08%20RB%8B%80%14%91%26*!%09%10J%88!%A1%D9%15Q%C1%11EE%04%1B%C8%A0%88%03%8E%8E%80%8C%15Q%2C%0C%8A%0A%D8%07%E4!%A2%8E%83%A3%88%8A%CA%FB%E1%7B%A3k%D6%BC%F7%E6%CD%FE%B5%D7%3E%E7%AC%F3%9D%B3%CF%07%C0%08%0C%96H3Q5%80%0C%A9B%1E%11%E0%83%C7%C4%C6%E1%E4.%40%81%0A%24p%00%10%08%B3d!s%FD%23%01%00%F8~%3C%3C%2B%22%C0%07%BE%00%01x%D3%0B%08%00%C0M%9B%C00%1C%87%FF%0F%EAB%99%5C%01%80%84%01%C0t%918K%08%80%14%00%40z%8EB%A6%00%40F%01%80%9D%98%26S%00%A0%04%00%60%CBcb%E3%00P-%00%60'%7F%E6%D3%00%80%9D%F8%99%7B%01%00%5B%94!%15%01%A0%91%00%20%13e%88D%00h%3B%00%AC%CFV%8AE%00X0%00%14fK%C49%00%D8-%000IWfH%00%B0%B7%00%C0%CE%10%0B%B2%00%08%0C%000Q%88%85)%00%04%7B%00%60%C8%23%23x%00%84%99%00%14F%F2W%3C%F1%2B%AE%10%E7*%00%00x%99%B2%3C%B9%249E%81%5B%08-q%07WW.%1E(%CEI%17%2B%146a%02a%9A%40.%C2y%99%192%814%0F%E0%F3%CC%00%00%A0%91%15%11%E0%83%F3%FDx%CE%0E%AE%CE%CE6%8E%B6%0E_-%EA%BF%06%FF%22bb%E3%FE%E5%CF%ABp%40%00%00%E1t~%D1%FE%2C%2F%B3%1A%80%3B%06%80m%FE%A2%25%EE%04h%5E%0B%A0u%F7%8Bf%B2%0F%40%B5%00%A0%E9%DAW%F3p%F8~%3C%3CE%A1%90%B9%D9%D9%E5%E4%E4%D8J%C4B%5Ba%CAW%7D%FEg%C2_%C0W%FDl%F9~%3C%FC%F7%F5%E0%BE%E2%24%812%5D%81G%04%F8%E0%C2%CC%F4L%A5%1C%CF%92%09%84b%DC%E6%8FG%FC%B7%0B%FF%FC%1D%D3%22%C4Ib%B9X*%14%E3Q%12q%8ED%9A%8C%F32%A5%22%89B%92)%C5%25%D2%FFd%E2%DF%2C%FB%03%3E%DF5%00%B0j%3E%01%7B%91-%A8%5Dc%03%F6K'%10Xt%C0%E2%F7%00%00%F2%BBo%C1%D4(%08%03%80h%83%E1%CFw%FF%EF%3F%FDG%A0%25%00%80fI%92q%00%00%5ED%24.T%CA%B3%3F%C7%08%00%00D%A0%81*%B0A%1B%F4%C1%18%2C%C0%06%1C%C1%05%DC%C1%0B%FC%606%84B%24%C4%C2B%10B%0Ad%80%1Cr%60)%AC%82B(%86%CD%B0%1D*%60%2F%D4%40%1D4%C0Qh%86%93p%0E.%C2U%B8%0E%3Dp%0F%FAa%08%9E%C1(%BC%81%09%04A%C8%08%13a!%DA%88%01b%8AX%23%8E%08%17%99%85%F8!%C1H%04%12%8B%24%20%C9%88%14Q%22K%915H1R%8AT%20UH%1D%F2%3Dr%029%87%5CF%BA%91%3B%C8%002%82%FC%86%BCG1%94%81%B2Q%3D%D4%0C%B5C%B9%A87%1A%84F%A2%0B%D0dt1%9A%8F%16%A0%9B%D0r%B4%1A%3D%8C6%A1%E7%D0%ABh%0F%DA%8F%3EC%C70%C0%E8%18%073%C4l0.%C6%C3B%B18%2C%09%93c%CB%B1%22%AC%0C%AB%C6%1A%B0V%AC%03%BB%89%F5c%CF%B1w%04%12%81E%C0%096%04wB%20a%1EAHXLXN%D8H%A8%20%1C%244%11%DA%097%09%03%84Q%C2'%22%93%A8K%B4%26%BA%11%F9%C4%18b21%87XH%2C%23%D6%12%8F%13%2F%10%7B%88C%C47%24%12%89C2'%B9%90%02I%B1%A4T%D2%12%D2F%D2nR%23%E9%2C%A9%9B4H%1A%23%93%C9%DAdk%B2%079%94%2C%20%2B%C8%85%E4%9D%E4%C3%E43%E4%1B%E4!%F2%5B%0A%9Db%40q%A4%F8S%E2(R%CAjJ%19%E5%10%E54%E5%06e%982AU%A3%9AR%DD%A8%A1T%115%8FZB%AD%A1%B6R%AFQ%87%A8%134u%9A9%CD%83%16IK%A5%AD%A2%95%D3%1Ah%17h%F7i%AF%E8t%BA%11%DD%95%1EN%97%D0W%D2%CB%E9G%E8%97%E8%03%F4w%0C%0D%86%15%83%C7%88g(%19%9B%18%07%18g%19w%18%AF%98L%A6%19%D3%8B%19%C7T071%EB%98%E7%99%0F%99oUX*%B6*%7C%15%91%CA%0A%95J%95%26%95%1B*%2FT%A9%AA%A6%AA%DE%AA%0BU%F3U%CBT%8F%A9%5ES%7D%AEFU3S%E3%A9%09%D4%96%ABU%AA%9DP%EBS%1BSg%A9%3B%A8%87%AAg%A8oT%3F%A4~Y%FD%89%06Y%C3L%C3OC%A4Q%A0%B1_%E3%BC%C6%20%0Bc%19%B3x%2C!k%0D%AB%86u%815%C4%26%B1%CD%D9%7Cv*%BB%98%FD%1D%BB%8B%3D%AA%A9%A19C3J3W%B3R%F3%94f%3F%07%E3%98q%F8%9CtN%09%E7(%A7%97%F3~%8A%DE%14%EF)%E2)%1B%A64L%B91e%5Ck%AA%96%97%96X%ABH%ABQ%ABG%EB%BD6%AE%ED%A7%9D%A6%BDE%BBY%FB%81%0EA%C7J'%5C'Gg%8F%CE%05%9D%E7S%D9S%DD%A7%0A%A7%16M%3D%3A%F5%AE.%AAk%A5%1B%A1%BBDw%BFn%A7%EE%98%9E%BE%5E%80%9ELo%A7%DEy%BD%E7%FA%1C%7D%2F%FDT%FDm%FA%A7%F5G%0CX%06%B3%0C%24%06%DB%0C%CE%18%3C%C55qo%3C%1D%2F%C7%DB%F1QC%5D%C3%40C%A5a%95a%97%E1%84%91%B9%D1%3C%A3%D5F%8DF%0F%8Ci%C6%5C%E3%24%E3m%C6m%C6%A3%26%06%26!%26KM%EAM%EE%9ARM%B9%A6)%A6%3BL%3BL%C7%CD%CC%CD%A2%CD%D6%995%9B%3D1%D72%E7%9B%E7%9B%D7%9B%DF%B7%60ZxZ%2C%B6%A8%B6%B8eI%B2%E4Z%A6Y%EE%B6%BCn%85Z9Y%A5XUZ%5D%B3F%AD%9D%AD%25%D6%BB%AD%BB%A7%11%A7%B9N%93N%AB%9E%D6g%C3%B0%F1%B6%C9%B6%A9%B7%19%B0%E5%D8%06%DB%AE%B6m%B6%7Dagb%17g%B7%C5%AE%C3%EE%93%BD%93%7D%BA%7D%8D%FD%3D%07%0D%87%D9%0E%AB%1DZ%1D~s%B4r%14%3AV%3A%DE%9A%CE%9C%EE%3F%7D%C5%F4%96%E9%2FgX%CF%10%CF%D83%E3%B6%13%CB)%C4i%9DS%9B%D3Gg%17g%B9s%83%F3%88%8B%89K%82%CB.%97%3E.%9B%1B%C6%DD%C8%BD%E4Jt%F5q%5D%E1z%D2%F5%9D%9B%B3%9B%C2%ED%A8%DB%AF%EE6%EEi%EE%87%DC%9F%CC4%9F)%9EY3s%D0%C3%C8C%E0Q%E5%D1%3F%0B%9F%950k%DF%AC~OCO%81g%B5%E7%23%2Fc%2F%91W%AD%D7%B0%B7%A5w%AA%F7a%EF%17%3E%F6%3Er%9F%E3%3E%E3%3C7%DE2%DEY_%CC7%C0%B7%C8%B7%CBO%C3o%9E_%85%DFC%7F%23%FFd%FFz%FF%D1%00%A7%80%25%01g%03%89%81A%81%5B%02%FB%F8z%7C!%BF%8E%3F%3A%DBe%F6%B2%D9%EDA%8C%A0%B9A%15A%8F%82%AD%82%E5%C1%AD!h%C8%EC%90%AD!%F7%E7%98%CE%91%CEi%0E%85P~%E8%D6%D0%07a%E6a%8B%C3~%0C'%85%87%85W%86%3F%8Ep%88X%1A%D11%975w%D1%DCCs%DFD%FAD%96D%DE%9Bg1O9%AF-J5*%3E%AA.j%3C%DA7%BA4%BA%3F%C6.fY%CC%D5X%9DXIlK%1C9.*%AE6nl%BE%DF%FC%ED%F3%87%E2%9D%E2%0B%E3%7B%17%98%2F%C8%5Dpy%A1%CE%C2%F4%85%A7%16%A9.%12%2C%3A%96%40L%88N8%94%F0A%10*%A8%16%8C%25%F2%13w%25%8E%0Ay%C2%1D%C2g%22%2F%D16%D1%88%D8C%5C*%1EN%F2H*Mz%92%EC%91%BC5y%24%C53%A5%2C%E5%B9%84'%A9%90%BCL%0DL%DD%9B%3A%9E%16%9Av%20m2%3D%3A%BD1%83%92%91%90qB%AA!M%93%B6g%EAg%E6fv%CB%ACe%85%B2%FE%C5n%8B%B7%2F%1E%95%07%C9k%B3%90%AC%05Y-%0A%B6B%A6%E8TZ(%D7*%07%B2geWf%BF%CD%89%CA9%96%AB%9E%2B%CD%ED%CC%B3%CA%DB%907%9C%EF%9F%FF%ED%12%C2%12%E1%92%B6%A5%86KW-%1DX%E6%BD%ACj9%B2%3Cqy%DB%0A%E3%15%05%2B%86V%06%AC%3C%B8%8A%B6*m%D5O%AB%EDW%97%AE~%BD%26zMk%81%5E%C1%CA%82%C1%B5%01k%EB%0BU%0A%E5%85%7D%EB%DC%D7%ED%5DOX%2FY%DF%B5a%FA%86%9D%1B%3E%15%89%8A%AE%14%DB%17%97%15%7F%D8(%DCx%E5%1B%87o%CA%BF%99%DC%94%B4%A9%AB%C4%B9d%CFf%D2f%E9%E6%DE-%9E%5B%0E%96%AA%97%E6%97%0En%0D%D9%DA%B4%0D%DFV%B4%ED%F5%F6E%DB%2F%97%CD(%DB%BB%83%B6C%B9%A3%BF%3C%B8%BCe%A7%C9%CE%CD%3B%3FT%A4T%F4T%FAT6%EE%D2%DD%B5a%D7%F8n%D1%EE%1B%7B%BC%F64%EC%D5%DB%5B%BC%F7%FD%3E%C9%BE%DBU%01UM%D5f%D5e%FBI%FB%B3%F7%3F%AE%89%AA%E9%F8%96%FBm%5D%ADNmq%ED%C7%03%D2%03%FD%07%23%0E%B6%D7%B9%D4%D5%1D%D2%3DTR%8F%D6%2B%EBG%0E%C7%1F%BE%FE%9D%EFw-%0D6%0DU%8D%9C%C6%E2%23pDy%E4%E9%F7%09%DF%F7%1E%0D%3A%DAv%8C%7B%AC%E1%07%D3%1Fv%1Dg%1D%2FjB%9A%F2%9AF%9BS%9A%FB%5Bb%5B%BAO%CC%3E%D1%D6%EA%DEz%FCG%DB%1F%0F%9C4%3CYyJ%F3T%C9i%DA%E9%82%D3%93g%F2%CF%8C%9D%95%9D%7D~.%F9%DC%60%DB%A2%B6%7B%E7c%CE%DFj%0Fo%EF%BA%10t%E1%D2E%FF%8B%E7%3B%BC%3B%CE%5C%F2%B8t%F2%B2%DB%E5%13W%B8W%9A%AF%3A_m%EAt%EA%3C%FE%93%D3O%C7%BB%9C%BB%9A%AE%B9%5Ck%B9%EEz%BD%B5%7Bf%F7%E9%1B%9E7%CE%DD%F4%BDy%F1%16%FF%D6%D5%9E9%3D%DD%BD%F3zo%F7%C5%F7%F5%DF%16%DD~r'%FD%CE%CB%BB%D9w'%EE%AD%BCO%BC_%F4%40%EDA%D9C%DD%87%D5%3F%5B%FE%DC%D8%EF%DC%7Fj%C0w%A0%F3%D1%DCG%F7%06%85%83%CF%FE%91%F5%8F%0FC%05%8F%99%8F%CB%86%0D%86%EB%9E8%3E99%E2%3Fr%FD%E9%FC%A7C%CFd%CF%26%9E%17%FE%A2%FE%CB%AE%17%16%2F~%F8%D5%EB%D7%CE%D1%98%D1%A1%97%F2%97%93%BFm%7C%A5%FD%EA%C0%EB%19%AF%DB%C6%C2%C6%1E%BE%C9x31%5E%F4V%FB%ED%C1w%DCw%1D%EF%A3%DF%0FO%E4%7C%20%7F(%FFh%F9%B1%F5S%D0%A7%FB%93%19%93%93%FF%04%03%98%F3%FCc3-%DB%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%09%E9IDATX%C3%ADW%7BpU%C5%19%FF%ED%9E%D7%3D7%B9%AF%BCn%DE%09%24%60%881%40T%04!P%0AR%A1%B6j%A7X%ADt%D4q%D4%F6%8F%8E%D3q%3Au%AC%FF%B4%D3%D6%E9%7B%3A%EALkm%15%5Bl)%03%AD%3A%22%88%80%10%02%84%40%80%F2%90%BC%C8%F3%E6%9D%DC%9B%FB%3C%E7%9Es%F6%EB%1F%09yP%95%3A%F6%9B%D99%BB%DF%F9v%F7%B7%BF%FDv%CF%EF%B0_%FE%FA%E7%B0a%81%DB%12%00%0E%000%2C%03%F7l%BEGc%0A%CCC%8D%87%03%DC%10%3BRF%FA%5D%C7%12%2F%13%11%88%08%00%A0%C9%C0%C9.%09M%DD%1C%9A%8C%19%13%0C%909%7F2%2F%DB%B3!%9E%B2%C6%A21%E3%0D%D2x%13%3E%C6%E4%8Fs*%B2%BC%EDH%C3%A1%C7%08%D8%185%A2%F1%05%85%E5%E5%9Bn%5B%F1%D2%81%03%07n%8DLL%3E)I%92%0D%00%8C%01%AA%0AH%AA%01.M%F5%25%02%98%E3z%FC%C1%7BW%FD%A1%BC%BC%18%D1X%12%C7%9B.o%3B%7D%E9%EAfU%96%8E%7F%02%00%06%82%80p%08%B6myjj%AB%7F%E2%D63%CA%9A%9BO%17%AB%A4%F4%8D%8D%8E%BD%5D%B1%B0r%89%B5%CE%7C%EC%D0%A1%C3%87%DDz%E6_%00%82%24%09%D4I%1E%7Cx%B0%0AQ%93%831%80%84%C9%96oh%7D%B8%E6%E6r%1C%3Eu%15F%1AXXV%E8%BD%D2%19z(m%A6%8F3%06%D8%0E%01%200%C6%A79%07%40D%10%C2%06%B8XQuSuYu%F5%CDH%5B%E6f%87%09%D8%96%EDD%22%11%2C(_%08I%E2_%9A%8C%8C!%16%0D%C3H%8E%A3%F9%22G%D2%94%00%C6%40%60%B0%85%08V%94%07%EB%12%A6%C0d8%8Cxl%12%C3%C3%C3%B0%05%A2%A6%20%A4%1C%C0%9D%E1B%86G%87%E6%92%A6%18p%1C%07d9%B79%0E%3B%23%AB%DC%2F%84%83%82%82B%DC%B1b%E5%8F%2F%7Dtq%CD%D2%5Bj%BF%EA%F5z%90H%C4%01%06%96v%2Cp%92%C0%D2%80%1C%E8%40%5E%DD%15h2%40%20%A4M%B6rA%D9%16%DF%C8x%02%04%06%99%11%A2q%13%A9%A4y%C4%B0%08u%15.%EC%F8%C5%E3PU%0D%CD%CD%8D%90%89hYnv%EEs%A5E%A5%F7%9D%3B%7B%EE%C1d*%D9%D0%DB%DB%9B%AC%5C%B4%C8%BD~%FD%FA%E0%DA%FA%FAo%09%10%92%A9%04%C2%91%08%92%09%A3Eb%1A8c%909%83%10%04%B2U%10%09%08%12%C8%D0%F4%FA%AC%EC%2C%5C%E9%19%86%ED%10%14%08%8CM%A6F%25f7%D7%2FfXs3!%DB%AB%83I%0A%3C%BA%0C%EE%F1zv%DF%FB%E5%7B%B7%D6%AF%A9W%8AK%8B%9F%F3x%7C%23%17%2F%5E%F8Y%5Bk%2B%24IB%CALadt%10%24%08%8D%8D%0D%1F%D9%96%F9%06%91%8D%B4e%A0%A3%AB%0B%AD%E7O%82l%06%D3R%91L%C9J0%3B%A7%5E%C8%0A%A2%89%148%97%60Y6%86%C6%92Gk%8B)%BC%F6%26%0B%9C%03LR%A62%8FK%90%E3%B1%F0%8F%DA%3A%DA%B7%D7%D6%D4%20''gYwowE%C0%93%FD%D3%7D%FB%F6%DA%BD%BD%3D%DF%BF%7D%C5%1D%D9%AA%AAB%10099y%C5%261z%AA%E9%2C%86%87%C6%E1%90%0D%E6%24%A1%CB~%98%9Ee%00%A5%DD%D9Y%DE%AA%84a%83K*%24ME4fQ~F%B4ce%A5%F4%94%A4d%AE%24%C6%E5%0F%8F%1C~%5D%96%E5%83%A1P7%A4M%9B%EA%CF%0F%84%06%8BS%A6Q%A7%AA*%EF%EF%0D%5D%00%A1%85%C8i%EC%E9%E9%EA%0E%06%F3%B7fffB%92%248%96%9D%F5%CF%B7%F7%BE%DE%D6%D9%9DTU%17%04%048%E7%E0v%1C%B6%5E%86%98%01'%9A4W%D7%06%93%8B%AA%7Cc%18M%E9%98%18%9F%10%0F%AC%D4%97%3C%B4%F5%FE%07V%DC%B1zYgG%7BQK%CB%99%D7zzzC%B1h%18%5C%96%18%84H%3F%D5%D2r%F6%25%22BII%D1%B3I%2B%19%10%20H%9C%1F%1A%1F%1F%8B%24%93%06N65%A1%A9%F9l%9E%DF%9F%F5~07%F77%A1%BE.%90p%E0%08%82H%C7%E0K%9D%C5%F7%B6%AD%B6%B7%DDU%F9tP7%E3%0B%0Bs%10j%3F%DF%B7%A2%24%11y%F4%A1%FBs%F2%F2%8B%B0o%FF%DE%8E%FE%FE%D0ZO%A6%EF%94%A6%BA%BC%9CK%B7p%DB%16%00%09%C1%E1%FC%A0%AD%AD%B5%B5%AC%AC%ACBW%B5gt%CD%03Ys%8F%F5%0F%0C7%B9%DDn%1Ck%3C%81%BA%5B%EB%D8o%7F%F5%C2%F2u%F5w%3E%11%8F%C7%F2%D2i%2B'%3B%3B%E7%3DU%CB%F8%A1%94hGQ%ECm%04%F9U%B9%AC0K%1B%09G%87k%83%B1%076%ADZ%2C%14W%06%86%86%06%D1%DE%D9%FE%A2%AC%C8%97m%C7%D1u%B7%B6%D3%9D%E1yY%DA%B8q3%40%0A%C0e%CB4%D3%A3%BE%80%EF%EB%99%DE%40%DDd%CF%F1%B7%3C%83o%25%A2%96%ABj%F9%AA%0D%ABC%03!%A4M%13%8C%09%04%FC%015%12O%AC%CB%0A%04%1Ey%E6%E9%EF%D6WUU%7D%B1%F9%D4%C9%F4%E2%F4%FE%0B%96o%D9%B6%B2%CA%9AM%5DWN%1F%C6%E4%E5%86%05%D5%AB%9F*.*%929%93%D0%D6%D1*ONF%A2YYY%2F%DC%7F%DF%D7%B6L%84%C7%87%D8%B5%7B%1D%00%0C%C3%E0%7F%DE%FE%C7%FDU%D5%B5%1B%AF%9E%DCy%C5%13n%D4%F6%B5e%E6-_%FF%CD%8C%2Bm%EDX%B3j%25*%2B%CA%91L%C4%C1%25%09B%00%BD%7D%DD%D03%FC%D8%FF%CE.%7Cci%7Cr%5C%AFs%E7%D7%DC%AD%8C%B4%ECH%A5%C6%3AS%8B%EF~%3E%B0%F8%A6EL%08%82i%98%18%18%08%A1%A2%A2%12n%B7%1B%AF%FE%E9%F7%AF%B1%C6%93%A7g%00%D8%B6%8D%C6%13%C7n%2F%2B-%3C%92%97%ED%D7%5B%8E%BD%8B%15_%D8%8A%F1p%18%10%0E23u%5C%BA%7C%09%96%03%94%95%95%A00%98%87X%C2%C0%EE%BFo%C7%B7%EF%CABaA%01%FE%9D%AC%06%E32b%FD-(X%B2%1E5%B7%2C%C5%F8%C4%084%97%0B%5E%8F%0F%BAK%87%10%84%83%07%3F%B0%CE%9F%3B%B7An%F8%C7%EFf%000%C6%E0V%E5%E6%E1d%DF%CE%BC%FA%7B%1E%F5%E4%94%A3%AC%24%1F%92%02%A8%B2%823-g%D0%DD7%84%F4x%07R%E3%C5(%D8%B2%15%5E%9F%17%BA%CA%40%B1~%F4%D9%26%5C%A5%AB%D0%DD%D5%89%60%D12%94%96W%A2%B7%BF%1B%25%C5%A5%18%1C%1C%C3%D0%E0%08%84%10%E8%ECh%EF%E8%EA%E9z%963%B5A%AE%E6%7F%9B%05%00%40%18%84h%BA%D2%3F6%BC%1C%8B%AB%97c%D7%9E%3D%08%F8sQ%5B%5B%0DYQ%90%91%E9%C7%5DKo%C3%F9S%0DpHF0'%80%8A%9A%95x%B5%F9%0Ct%CD%C2%9A%CC0%8AJ%CA%B1dI5.%5E%BE%80%85%0B*%D0%D9q%15G%8F%EE%DC%1E7%FD%EF%3Ai%3B%2C%81N%B9%DCZ%94%1C%80%0B6%F5%FD%BEV%D2%8ES%B2pQ%D5%06%84%5B%D1%D7%DF%07%8D%A5%F1%FE%3B%3Bp%B5%A7%1F%5E%8F%17%9A%CC%F0%E6%FE%CB%88h%8B%E0R%25%F4%87%FA124%80%B2%CA%25%18%8Ds%C4%A21dg%E7%E2%D8%89F%A8%8A%86%DE%DE~%5Cjx%13%B9%A3%7B%F6%06%A2%C7v)%12%7D%20%ABztf%D1%DB%BF%E3%99%A3%24%04%08%EC%E1u%8F%BC%F8%D74%F3c%DCP%90%E9%F5a%20%14BN%5E%10%8A%2CCUT%C4%13%09%04%FC%01%08a%23%99J!%12%0EC%96%15%08rP%5CT%82%C9%D8%24%18%80%0Cw%26F%86CXT%E0%C6%E1W%1E%D9%9E%0A%87%1EM%FA%96%22%92%FB%15%40%F7%83l%19ran%7Cv%0B%08H%DA%FE%05%DE%E2%DB%E1%F6f%A3%D8N%80%84%C0%E2%F2%028vzJ%09%91%00gn%08%C7%02%11%07%F3%BB!%15e%82%C8%01%03%C1%B6%12%C8%D5%250%12%10%22%8A%C2%85%3E0w.%FCE%D5%E5%D1%F00%D7%13mB5_A%CA%BB%0C%02*%E4%D0%84%3E%87%00%1B%9A%A6%06%B9%C4%90%8C%8D%82%1C%13%201%25sHL%15%88%D9%FAt%9B%AE%8B%A1%E9%18F%02%E4Xp%2Bnxs%8AJ%03%5EG%D3t%9E%02M%80%89%F7%A7%14%11Y3%9A%04d%03zv%B0%80s%06a%C6%01a%CF%0E%3C%3D(%5D7%F9%7Cp%0E%40%04F%CE%B4%9F%00a%01v%12%92%EA%CE%11%02%5E%22%96%22H%B8%A6%E1diV%14A8%8E%9C%5DT%5D%E2%CE%0C%C0%B0%13%20%C8S%83%E0%06%2C%CC%C4%CC%01y%0D%B0%90%A1(2%B4%8C%1C%D7D%94%8A%14S%1Dfs5%A1!%A7g%1A%0E%09%DDH%84%2B%DBO%FD%0BFb%E2%1A%2Fs%1E4%DF%07%9A%AD%CEV%A6%FD4u%AE%89%20k%3D%88%8F%F7)%9A%E6*c%5C%B4%CC%13%A5I%C9%98MB%0Ec%A0%ED%E8%EE%B1%88%F1D*%19%03%1CsJ%FA%D2uR%96%E1%7F%B4%A9%40%AE%F9%80%89s%17%15I%BE%086%BF%B3%9C%2B%BB%E6%00'K%82r%A8b%F9%BA'4%11%870%A3%B8%BE%C3g6%C6%C13%F2q%EE%40%5BK4%1Am%07%E3%F3%01%EC%3E%3A%8F8T%15%DA%FA%9D%3E%0E%AF%9A%01%3B%E5%7Cn%00%8Cq0%B7%0B'%D2p%3D%BF%CB%80i_%C7%C0%9E%D3%C6%3C%C7%96%A5%8A%AA%C0%82%10S%22%F3%C6%7C%B3%1B%BC%25H%8E%09%D3%22W4%05%D9!%B2o%F0g%E4p%3B%9D%84%C7%93%0FF4%9F%01%C2Lb%7D%BC%D1%7F%B58%97%00%B2%10%89%5B%92%20%F8%00%8C%7F%1A%00~%AE%5B4%7F%F8%C1%7B%1D%AB%D7%AE%AFd%5C%9A%BE%9Ei6%B3I%00%A0i%0Cs%DBsc0uA%01%E0%20%F4v%B7%1B%FB%CE%C6%0E%11%A0%5C%5B%C2'%F1%C7%00%F8%F2%BDXZS%8CU%92%24%E9D%A0%CF%93%03%9C%91%E8%19%13%9D%1F%0D%E24%80a%00%91%1Bm%A0%0C%40%9F~%C7%3E%CB%A1%FB%94%3D%91%00%D8%00%E2S7%D4%8D3H%9A.%FFO%B3%AF%9F%1C%00%FE%03%DA%5E%0A%17%9C'%F9%FD%00%00%00%00IEND%AEB%60%82";

// ************************************************************************************************************************
function main() {
	var myNodes, myDiv, myLink, myPicture, newDiv;

	// remove all ads
	if (globalOptions.removeAds) {
		// <iframe id="UKIGL160" name="UKIGL160" src="http://delivery.ads.gfsrv.net/afr.php?n=UKIGL160&amp;zoneid=1187&amp;target=_blank&amp;cb={$random_number}&amp;os={$os}&amp;kid={$kid}" frameborder="0" scrolling="no" width="160" height="600" allowtransparency="true"><a href="http://delivery.ads.gfsrv.net/ck.php?n=UKIGL160&amp;cb={$random_number}" target="_blank"><img src="http://delivery.ads.gfsrv.net/avw.php?zoneid=1187&amp;cb={$random_number}&amp;n=UKIGL160" border="0" alt="" /></a></iframe>';
		myNodes = xpath(document, '//iframe[contains(@src, "delivery.ads.gfsrv.net")]');
		for (var i = 0; i < myNodes.snapshotLength; i++) {
			var myNode = myNodes.snapshotItem(i);
			myNode.parentNode.removeChild(myNode);
		}
	}

	var gameVersion = new tGameVersion();				// find the game's version

	const curMod = paramValue("mod", window.location.href);		// find where we are

	// add cash to guild bank
	if (globalOptions.addCash)
	if (curMod == ((gameVersion.compareWith("1.7.0")==cLOWER)?"guild_safe":"guildBankingHouse")) {	// Guild Bank
		myNodes = xpath(document, (gameVersion.compareWith("1.7.0")==cLOWER)?'//form/following-sibling::th[2]/text()':'//form/table/tbody/tr[1]/th[2]/text()');
		if (myNodes.snapshotLength == 1) {
			var ix = 0;
			var amount = trimStr(myNodes.snapshotItem(0).nodeValue.replace(dot, ""));

			// there could be more dots: remove them all
			while ((ix = amount.indexOf(dot, ix)) >= 0) amount = amount.replace(dot, "");

			myNodes = xpath(document, '//input[@name="donation"]');		// find <input name="donation" size="10" maxlength="10" type="text">
			if (myNodes.snapshotLength == 1) myNodes.snapshotItem(0).value = amount;
		}
	}

	// set automatically Duration to 24 hours
	if ((curMod == "market") && globalOptions.modifyDuration()) {
		var myNodes = xpath(document, '//select[@id="dauer"]');
		if (myNodes.snapshotLength == 1) myNodes.snapshotItem(0).selectedIndex = globalOptions.marketDuration;
	}

	var shParam = paramValue("sh", window.location.href);		// get sh parameter
	if (shParam == "") return;

	// auto-attack
	if (globalOptions.autoAttack)
	if (myDiv = document.getElementById("cooldown_bar_fill_dungeon"))
	if (myDiv.className.indexOf("cooldown_bar_fill_ready") >= 0) {	// let attack them!!!
		if (curMod != "dungeon") {				// switch to dungeon immediatelly
			// if we're prying there's following span on the page: <span id="ticker1" class="z" style="text-align:left;"> 0:00:27</span> Minutes</td>
			if ((curMod != "guildTemple") || (!document.getElementById("ticker1"))) {
				var myLink = xpath(myDiv, 'following-sibling::a[contains(@href,"mod=dungeon")]');
				if (myLink.snapshotLength > 0) window.location.href = myLink.snapshotItem(0).href;
			}
		}

		myDiv = xpath(document, '//map[@name="dmap"]/area');	// find all areas
		if (myDiv.snapshotLength > 0) {
			var minValue = null;
			var minValueIndex = 1*5000;
			for (var i = 0; i < myDiv.snapshotLength; i++) {
				var myArea = myDiv.snapshotItem(i);
				var myAreaIndex = getAreaIndex(myArea.getAttribute("onclick"));
				if (!myAreaIndex) myAreaIndex = minValueIndex;
				if (!minValue || (myAreaIndex < minValueIndex)) {
					minValue = myArea;
					minValueIndex = myAreaIndex;
				}
			}
			if (minValue) minValue.click();
		}
	}
	else if ((myDiv.className.indexOf("cooldown_bar_fill_progress") >= 0) &&
		 (myDiv = document.getElementById("cooldown_bar_text_dungeon")) && (curMod != "dungeon")) {
		refreshPage = setTimeout (function() {
		 	var tmp = document.getElementById("cooldown_bar_text_dungeon");
			if (tmp) {
				tmp = xpath(tmp, 'following-sibling::a[contains(@href,"mod=dungeon")]');
				if (tmp.snapshotLength > 0) window.location.href = tmp.snapshotItem(0).href;
			}
		}, getMilliseconds(myDiv.innerHTML)-10000);	// switch to dungeon 10 seconds before cooldown time expires
	}
	// insert switch for auto-attack
	if (myDiv = document.getElementById("icon_dungeonpoints")) {
		newDiv = myDiv.cloneNode(true);
		myLink = document.createElement("a");			// create link
		myLink.style.display = "block";
		myLink.style.width = "100%";
		myLink.style.height = "100%";
		myLink.href = window.location.href;
		myLink.addEventListener("click", function() {
			globalOptions.autoAttack = !globalOptions.autoAttack;
			globalOptions.save();				// save options
		}, true);

		myDiv.parentNode.replaceChild(myLink, myDiv);
		myLink.appendChild(newDiv);
		if (globalOptions.autoAttack) {
			myPicture = document.createElement("img");	// create image
			myPicture.src = autoAttack;
			myPicture.alt = myPicture.title = "Turn off auto-attack";
			newDiv.appendChild(myPicture);
		}
		else newDiv.title = "Turn on auto-attack";
	}

	// settings
	if ((curMod == "settings") && (paramValue("submod", window.location.href) == "gameSettings")) {
		myDiv = xpath(document, '//div/div/div/descendant::form[contains(@action, "mod=settings&submod=edit&img=save")]/../../..');	// find appropriate div
		if (myDiv.snapshotLength == 1) {
			myDiv = myDiv.snapshotItem(0);

			newDiv = document.createElement("div");		// out-most div
			newDiv.style.margin = "20px";
			newDiv.id = "RxR_GM_settings";
			myDiv = myDiv.parentNode.insertBefore(newDiv, myDiv.nextSibling);

			newDiv = document.createElement("form");	// form
			newDiv.method = "post";
			newDiv.action = window.location.href;
			newDiv.name = "RxR_GM_settings";
			myDiv = myDiv.appendChild(newDiv);

			newDiv = document.createElement("div");		// middle div
			myDiv = myDiv.appendChild(newDiv);

			newDiv = document.createElement("div");		// title box
			newDiv.className = "title_box";
//			newDiv.innerHTML = '<a name="' + I_SETT_BOOKMARK + '"><div class="title_inner">Guildmail Link settings</div></a>';
			newDiv.innerHTML = '<div class="title_inner">Guildmail Link settings</div>';
			myDiv.appendChild(newDiv);

			newDiv = document.createElement("div");		// title2 box
			newDiv.className = "title2_box";
			myDiv = myDiv.appendChild(newDiv);

			newDiv = document.createElement("div");		// title2 inner
			newDiv.className = "title2_inner";
			myDiv = myDiv.appendChild(newDiv);

			// Show link to Guildmail
			newDiv = document.createElement("input");
			newDiv.type = "checkbox";
			newDiv.value = "ON";
			newDiv.id = newDiv.name = I_GM_LINK;
			newDiv.checked = globalOptions.showGM;
			myDiv.appendChild(newDiv);
			myDiv.appendChild(document.createTextNode("Show link to Guildmail"));
			myDiv.appendChild(document.createElement("br"));

			// Show link to Costumes
			newDiv = document.createElement("input");
			newDiv.type = "checkbox";
			newDiv.value = "ON";
			newDiv.id = newDiv.name = I_COSTUMES_LINK;
			newDiv.checked = globalOptions.showCostumes;
			myDiv.appendChild(newDiv);
			myDiv.appendChild(document.createTextNode("Show link to Costumes"));
			myDiv.appendChild(document.createElement("br"));

			// Show link to Magic Box
			newDiv = document.createElement("input");
			newDiv.type = "checkbox";
			newDiv.value = "ON";
			newDiv.id = newDiv.name = I_MB_LINK;
			newDiv.checked = globalOptions.showMysteryBox;
			myDiv.appendChild(newDiv);
			myDiv.appendChild(document.createTextNode("Show link to Magic Box"));
			myDiv.appendChild(document.createElement("br"));

			// Remove Ads
			newDiv = document.createElement("input");
			newDiv.type = "checkbox";
			newDiv.value = "ON";
			newDiv.id = newDiv.name = I_REMOVE_ADS;
			newDiv.checked = globalOptions.removeAds;
			myDiv.appendChild(newDiv);
			myDiv.appendChild(document.createTextNode("Remove Ads"));
			myDiv.appendChild(document.createElement("br"));

			// Donate all the cash
			newDiv = document.createElement("input");
			newDiv.type = "checkbox";
			newDiv.value = "ON";
			newDiv.id = newDiv.name = I_ADD_CASH;
			newDiv.checked = globalOptions.addCash;
			myDiv.appendChild(newDiv);
			myDiv.appendChild(document.createTextNode("Donate all the cash"));
			myDiv.appendChild(document.createElement("br"));

			// Check every day for bonus
			newDiv = document.createElement("input");
			newDiv.type = "checkbox";
			newDiv.value = "ON";
			newDiv.id = newDiv.name = I_CHECK_BONUS;
			newDiv.checked = globalOptions.checkBonus;
			myDiv.appendChild(newDiv);
			myDiv.appendChild(document.createTextNode("Check every day for bonus"));
			myDiv.appendChild(document.createElement("br"));

			// Default duration of the offer on the Market
			newDiv = document.createElement("select");	// create select
			newDiv.size = "1";
			newDiv.id = newDiv.name = I_OFFER_DURATION;
			newDiv.innerHTML = '<option value="' + fDURATION_2  + '"' + ((globalOptions.marketDuration == fDURATION_2)? " selected":"") + ">2 h</option>" +
					   '<option value="' + fDURATION_8  + '"' + ((globalOptions.marketDuration == fDURATION_8)? " selected":"") + ">8 h</option>" +
					   '<option value="' + fDURATION_24 + '"' + ((globalOptions.marketDuration == fDURATION_24)?" selected":"") + ">24 h</option>";
			myDiv.appendChild(newDiv);
			myDiv.appendChild(document.createTextNode(" Default duration of the offer on the Market"));
			myDiv.appendChild(document.createElement("br"));

			// "Apply options" button
			myDiv.appendChild(document.createElement("br"));
			newDiv = document.createElement("input");
			newDiv.className = "button2";
			newDiv.value = "Apply options";
			newDiv.type = "submit";
			newDiv.id = newDiv.name = I_SAVE_BUTTON;
			newDiv.style.marginBottom = "5px";
			newDiv.addEventListener("click", function() {
				var iNode = document.getElementById(I_GM_LINK);
				if (iNode) globalOptions.showGM = iNode.checked;
				iNode = document.getElementById(I_COSTUMES_LINK);
				if (iNode) globalOptions.showCostumes = iNode.checked;
				iNode = document.getElementById(I_MB_LINK);
				if (iNode) globalOptions.showMysteryBox = iNode.checked;
				iNode = document.getElementById(I_REMOVE_ADS);
				if (iNode) globalOptions.removeAds = iNode.checked;
				iNode = document.getElementById(I_ADD_CASH);
				if (iNode) globalOptions.addCash = iNode.checked;
				iNode = document.getElementById(I_CHECK_BONUS);
				if (iNode) globalOptions.checkBonus = iNode.checked;
				iNode = document.getElementById(I_OFFER_DURATION);
				if (iNode) globalOptions.marketDuration = iNode.options[iNode.selectedIndex].value;

				globalOptions.save();			// save options
			}, true);
			myDiv.appendChild(newDiv);
			if (window.location.hash == ("#"+I_SETT_BOOKMARK)) window.location.hash = I_SETT_BOOKMARK;
		}
	}

	var header = xpath(document, '//div[@id="header_game"]');	// find appropriate div
	if (header.snapshotLength != 1) return;
	header = header.snapshotItem(0);

	// check for bonus
	if (globalOptions.checkBonus) {
		const bonusLabel = window.location.hostname.toUpperCase() + " bonusCheck";
		if (GM_deleteValue) GM_deleteValue(bonusLabel);		// remove value from previous version
		var justNow = header.childNodes[13].innerHTML.substr(0, 10);
		if (justNow != globalOptions.lastCheck) {
			globalOptions.lastCheck = justNow;
			globalOptions.save();
			window.location.href = prepareLink("mod=overview&sh=" + shParam);
		}
	}

	// insert link to guildmail
	if (globalOptions.showGM) {
		myDiv = document.createElement("div");			// create div
		myDiv.id = "gm-link-rxr";
		myDiv.title = "Write guildmail";
		myDiv.style.position = "relative";
		myDiv.style.top = "68px";
		myDiv.style.left = "92px";
		myDiv.style.width = "65px";
		myDiv.style.height = "51px";
		myDiv.style.backgroundColor = "transparent";
		myDiv.style.border = "1px dotted yellow";

		myLink = document.createElement("a");			// create link itself
		myLink.style.display = "block";
		myLink.style.width = "100%";
		myLink.style.height = "100%";
		myLink.href = prepareLink(((gameVersion.compareWith("1.7.0")==cLOWER)?"mod=guild_main&submod=admin_mail":"mod=guild&submod=adminMail") + "&sh=" + shParam);

		myDiv.appendChild(myLink);
		header.appendChild(myDiv);
	}

	// insert link to costumes
	if (globalOptions.showCostumes) {
		myDiv = document.createElement("div");			// create div
		myDiv.id = "costumes-rxr";
		myDiv.style.position = "relative";
		myDiv.style.top = (globalOptions.showGM)?"34px":"87px";
		myDiv.style.left = "163px";
		myDiv.style.width = "32px";
		myDiv.style.height = "32px";
		myDiv.style.backgroundColor = "transparent";
		myDiv.style.border = "1px dotted yellow";

		myLink = document.createElement("a");			// create link itself
		myLink.style.display = "block";
		myLink.style.width = "100%";
		myLink.style.height = "100%";
		myLink.href = prepareLink("mod=costumes&sh=" + shParam);

		myPicture = document.createElement("img");		// create image
		myPicture.src = armourIcon;
		myPicture.alt = myPicture.title = "Costumes";

		myLink.appendChild(myPicture);
		myDiv.appendChild(myLink);
		header.appendChild(myDiv);
	}

	// insert link to mysterybox
	if (globalOptions.showMysteryBox) {
		myDiv = document.createElement("div");			// create div
		myDiv.id = "mysterybox-rxr";
		myDiv.style.position = "relative";
		myDiv.style.top = (globalOptions.showCostumes)?((globalOptions.showGM)?"0px":"53px"):((globalOptions.showGM)?"34px":"87px");
		myDiv.style.left = (globalOptions.showCostumes)?"201px":"163px";
		myDiv.style.width = "32px";
		myDiv.style.height = "32px";
		myDiv.style.backgroundColor = "transparent";
		myDiv.style.border = "1px dotted yellow";

		myLink = document.createElement("a");			// create link itself
		myLink.style.display = "block";
		myLink.style.width = "100%";
		myLink.style.height = "100%";
		myLink.href = prepareLink("mod=mysterybox&sh=" + shParam);

		myPicture = document.createElement("img");		// create image
		myPicture.src = diceIcon;
		myPicture.alt = myPicture.title = "Mystery box";

		myLink.appendChild(myPicture);
		myDiv.appendChild(myLink);
		header.appendChild(myDiv);
	}

	// insert link to settings
	myDiv = document.createElement("div");				// create div
	myDiv.id = "gml-settings-rxr";
	myDiv.title = "Settings";
	myDiv.style.position = "relative";
	var styleTop = 87;
	if (globalOptions.showGM)
		if (globalOptions.showCostumes) myDiv.style.top = (globalOptions.showMysteryBox)?"-34px":"0px";
		else myDiv.style.top = (globalOptions.showMysteryBox)?"0px":"34px";
	else
		if (globalOptions.showCostumes) myDiv.style.top = (globalOptions.showMysteryBox)?"19px":"53px";
		else myDiv.style.top = (globalOptions.showMysteryBox)?"53px":"87px";
	myDiv.style.left = "54px";
	myDiv.style.width = "32px";
	myDiv.style.height = "32px";
	myDiv.style.backgroundColor = "transparent";
	myDiv.style.border = "1px dotted yellow";

	myLink = document.createElement("a");				// create link itself
	myLink.style.display = "block";
	myLink.style.width = "100%";
	myLink.style.height = "100%";
//	myLink.href = prepareLink("mod=settings&sh=" + shParam + "#" + I_SETT_BOOKMARK);
	myLink.href = prepareLink("mod=settings&submod=gameSettings&sh=" + shParam);

	myPicture = document.createElement("img");			// create image
	myPicture.src = prefsIcon;
	myPicture.alt = myPicture.title = "Settings";

	myLink.appendChild(myPicture);
	myDiv.appendChild(myLink);
	header.appendChild(myDiv);

} // DO NOT TOUCH!! -> function main() {

// FUNCTIONS *************************************************************************************************************

function prepareLink (newSearch) {
	var myLink = window.location.href.replace(window.location.hash, "");	// remove hash
	return (myLink.replace(window.location.search, "?") + newSearch);
}

function getAreaIndex (str) {						// str = "startFight('5', '21942');showWait();return false;"
	var r_e = /startFight\(\'(\d{1,})\'/i;				// pattern: startFight('<number>'
	var num = str.match(r_e);
	if (num)
	if (num.length > 1) return (1*num[1]);
	return (null);
}

function getMilliseconds (str) {					// str is time in format hh:mm:ss
	const timeSeparator = ":";
	var x = str.split(timeSeparator);
	return (1000*(1*x[2]+60*(1*x[1]+60*1*x[0])));
}
function trimStr(str) {		// thanks to Steve @ http://blog.stevenlevithan.com/archives/faster-trim-javascript
	var	str = str.replace(/^\s\s*/, ''),
		ws = /\s/,
		i = str.length;
	while (ws.test(str.charAt(--i)));
	return str.slice(0, i + 1);
}

function xpath(node, query) {
	return document.evaluate(query, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function paramValue(name, url_string) {
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(url_string);
	if (results != null) return results[1];
	return "";
}

function waitForReady(callback, delayInMS) {				// thanks to GIJoe
	if (maxDelayForReady < 0) return;

	var docState = "";						// since readyState returns String... should be string null
	try {
		docState = window.document.readyState;			// returns "loading" while the Document is loading,
	}								//	   "interactive" once it is finished parsing but still loading sub-resources, and
	catch(e) {}							//	   "complete" once it has loaded.

	if (docState != "complete") {
//	if (docState == "loading") {
		window.setTimeout(waitForReady, delayInMS, callback);
		maxDelayForReady -= delayInMS;
		return;
	}
	callback();
}
