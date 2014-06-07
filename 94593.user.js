// ==UserScript==
// @name           przybornik pl
// @description    Skrypt pomaga dopasować ekwipunek, do konkretnych zadań, prac itp. Wersja obsługuje spodnie i paski wersja 3
// @description    zapożyczone pomysły od: Storan, Aleksandra
// @include        http://pl*.the-west.*/game.php*
// @include        http://ru*.the-west.*/game.php*
// @include        http://de*.the-west.*/game.php*
// @exclude        http://www.the-west.*
// @exclude        http://forum.the-west.*
// @include        http://userscripts.org/scripts/source/94593.meta.js
// @require        http://userscripts.org/scripts/source/74144.user.js
// @version        PL_3.3.19
//
// ==/UserScript==

var PrzVer = "PL_3.3.19";

try {
	ScriptUpdater.check(94593, PrzVer);
} catch(e) { }; // sprawdzenie aktualizacji


aWindow = (unsafeWindow) ? unsafeWindow : window;
// +++++

//aWindow = window;
// +++++

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {return;}
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// ============ Opcje menu ============
	var actual_world = window.location.host.substr(0,3);
	var actual_region = window.location.host.substr(0,2);
		addGlobalStyle('#workbar_left { margin-top: 25px; }');

// ============= dodatkowe przyciski ==================

function addFooterIcon(mylink,idname, title) {
	var head, style;
	footer_menu_left = document.getElementById('footer_minimap_icon');
	if (footer_menu_left) footer_menu_left = footer_menu_left.parentNode;
	if (footer_menu_left) footer_menu_left = footer_menu_left.parentNode;
	if (!footer_menu_left) {return false;}
	var iconlink = document.createElement('a');
	iconlink.setAttribute('href',mylink);
	iconlink.innerHTML = "<img id=\""+idname+"\" alt=\"\" src=\"images/transparent.png\"/>";
	footer_menu_left.appendChild(iconlink);
	addPop(idname,'<b>'+title+'</b>');
	return true;
};

function addPop (id,title){
	if (document.getElementById(id))
		setTimeout(function() {document.getElementById(id).setAttribute('title', title)},2500)
}

add_link_button = function (){
	fml = document.getElementById('footer_minimap_icon');
	if (!fml) {setTimeout(add_link_button, 2000);return;}

	addEndDiv('\
		if (Character.home_town == null) {\
			var footer_menu_left = document.getElementById(\'footer_minimap_icon\');\
			footer_menu_left.parentNode.parentNode.setAttribute(\'class\',\'homeless\');\
		}\
	;');
};

function addEndDiv(code) {
    var bodyx, enddiv;
    bodyx = document.getElementsByTagName('body')[0];
    if (!bodyx) {return;}
    enddiv = document.createElement('script');
    enddiv.type = 'text/javascript';
    enddiv.innerHTML = code;
    bodyx.appendChild(enddiv);
}

add_link_button();

// prędkość poruszania się = zaokrąglij(100/(100+%);4)

//====================================== BEST ITEMS ====================================

var menu_pk_s3 = document.createElement("div");
menu_pk_s3.id="menu_pk_s3";
menu_pk_s3.innerHTML = '<a id=\"_menu_pk_s3\" title=\"Kliknij przycisk, aby rozpocząć poszukiwania przydatnych przedmiotów\" href=\"javascript:PK_S3.show_window_settings(false);void(0);\"></a>';
addGlobalStyle('#menu_pk_s3 { background:url(http://pl-the-west.googlecode.com/svn/trunk/pl-the-west/images/przybornik.png); }');

addGlobalStyle('.bug_mini { width:35px; height:35px; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEQAACxEBf2RfkQAAAAd0SU1FB9oLHgkGAg/ieXEAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAIC0lEQVRYR72Y2W/UVRTHZ0rAmBiXCIEYH3gwpkCVQDcKGOk20326TDvdN3a60H2nQEspWjb9F+TF6MT4QBMffDTyJ2kMXM/nnHtnplNeteHk/ub+7u+e7/2e9RKNRCJR+TtYUBB9N+Iih1zEFTCn/zJ/zj/lz+X+zlmuj+Gb/PncTaNv3Js3f8vKv2T2H5C8U/TZpyVd8dIXydqSn1J1Zenu+nKRc+nexvPpnoYKGSvSfU0XRM7rfCpertLTcC7dJ2t41998IT2Y+EpH1jH2ytgVL0t3yZ7sG54ZRRfy4+fHjzXKkY4KmEORAwcKPpSXL273174WcTNDcTc1gMTkuU5lbqTBTQ/GVWaH6/S9rbX3C5cb3dLVZrd8rWWPLF5p8mtsP2SasT+m36Ozvab4N7FKsYB5P3KgoOBIKl72M4oyYIbqMx/rBoMGbG6kPrM5AOdGRWQMYNZutro7t9rc2s2EgmJ+drjezY82ujkZ0THRW+PGe6rdZF+NPrdVnf1DwNQKmMMReTjWKbSZ0vhbmcmePHv6JVHGyWGE94tXGt3K9Rb9vXK9WQC1qixfS2TWcCD0AGKyr1ZBJSrP/FkQjTYKmKMKBnuycHakzgOqk9M06IlU4TUUJPTU62PtMra61RsJt3KjRQEE4f2KzAOCufXxdl2/JusDS4DxJtIxUXX2lYBpyoDBYfGFIAuXGxQEG67esBMi62Nt7u54h4goEWG8N2G/GTenu7Jzfv7+7aRnqEUPyKExEcy8FQzejuOag9YLrQYEAPcnk6ZwQpR7uTfZ4VDC742ppNuc6lR5MJPS9bxD7LsOz5SZCx8zdmIKqOXSmb3M9DSUp0O0gH5ZzIIpYALFqnDaFG6IEpQ+nOvR8dFCrzx36+9tGbfnZV4YgqUHMzYG9jAX5laHFlBYoq26eC+YXsklMMJLIoQT3BEgCCcECEq2ZlMq3yz2uUfyGwCPVwbdt0v9Mm9AeMezAexWwBv+EPgPB1243OQWRRg7YqV7waTEZ9SBBQyOhp+oo3owKIUBgKCQZ5Ruz/e6J6uDbmdpQJ93lgf09+OVAXnfLyD7dN3DWQ7SrQxheo1AYWdWUkhrVR4zZETLJXEBY8wQLdgbJZw+mAMlT1eH3NO1IVX8dG3YPbsz4p6LfLc+Ks/DOgdbgNqREXPB8Pq45SDzHXJZ3LXmmyk4MMwQRcuSJ4iWexNJpXpHwMDItjDESe30WXki4ADzfH1E3z3LgJE1wpayI/vgb7BNQsRv0LcvtEl6M5rwMJNFEpTycaCfTTEDJ1cmRDFMMDIHINjKghpSdgyI+dfmVEpDHzcIvpOMl72SXJfNMyS9kH0xEws3prrUzsE3oBzF39+9rCPMmFkAYxKAhBFz7Sz3q6k4FGA0McphQx1TMLlJD5+Z8UkPMGTRzWmLGpwQMVYMjDEiogzZyFwuU8FkfLcj32/P92kOghnL0AlxiWaXjEs05TKjYHw0WY1JiMMRzr3quGwI5SgLzGAaFGKa4MT4Cj7zRFhjPoQ97LAXAQEzBAfMoGefmSgHIekBBgfmQ5wOMChTH/GswFAuMJ4BkBtdAAOQsuv9hogCTDAR5hJ/3c9MqNpE06qvQwamR22uDBA13mExTzANzqv5RvxKo0nAWv7BgSXfiGCmULtgZukqLUaT66x7iwMHMIQcPkMpIJyJIs0XQjWA1Fn9qXnWnIKTioSwD+aybwWUvCOaYNsiyYDMjzSamfIdOMuM9SLkGVI+QAL96rDeRMqQB4VPPVqQEiEmfexBm89YjkFghQOu3WzLsEJ90nKQ68CdsbI0VRRAVg6MGcyUOa1nARA4M6ygLCiFIVjAZBpBnhWrad1uy9coygyOaw0ZZirfDybXZ2CGEKTIsRm2R8leANAflGbNwbqQnfnWEl53JqxXCWk1kTVv6sC5ZuqMlWbaTurG+piFoCU9Cl5/TnHsyWRczbBiGg1nAcFvE0wTiqmAkX2015F0gZlghTpIp5DcV7X3ZGCJJq3abVr6sbX1LtafsKk5pLUI5I+QFEMrEYokzOj3AoZeyBqtNjWPNeoN+x0YnwlXE6tN5sQUyiwg2VAbppRvrsQPUCJzodd5IFn74Rythr2zXqZLapwA8Zk3VOyQZNtrSvL6mTp64HrtvrAnQn2yDq1DN92SnsSotpYSkKFxsgZMlOqc1bStGQOj8wqGsE7YdSdzB6OfyWvIU4DRcmB3HAPT4u9A0gfLZqEPxnxEBGI9Cs/SqEs/rEwCTAripmeEtpW2wa4t2aY8ZPx9YKy5soY8e0vEd+Q64htz/IjfIQfZZU0Knl/DOubs9mCyJr8xCz6Cf9C/6N3JpxH07etnAMO1YaK3OnOrtNDjxijmk1H7Vn9po7EGWCh4zGtTJie3A9ghrOmmt7bbJCDC5Q1dk3KZa6nMux1YoYzpDc+unrX+rg1bMQWFD3FKO2n2tIDlxPOj9QqId4Qu5g7363BpC1fbsVSVG+s2af769J4b5ZH26uIfuIRPDdTqBYuPAZFpuPzNMmRNu20a7dk7unWJAZzO+0OFNQFMuGvfSlW+rr/45e+S9Kr1rs3t//gnh6vjF754UV1+8tdLpYUvq8pO7FaVn9iV3zrWVJzarT1ftFtbUaTPMXlmRGzNyd3qcydtTka+qZQ9KksLd9mLNfyWvXcvlRSG+ZeVZYW/HDv8wYRgOK3/CyF/B0EVjUaKZLwoUiUC0v9a0IO+U54VcOh/UfHwnshHIh//j4I+9KI/+i+/f7oer6phJgAAAABJRU5ErkJggg==); }');
addGlobalStyle('#window_pereodevalka_setting_title {background:url(http://pl-the-west.googlecode.com/svn/trunk/pl-the-west/images/title_przybornik.png); background-repeat:no-repeat; background-position: center top;}');
addGlobalStyle('#window_pereodevalka_informer_title {background:url(http://pl-the-west.googlecode.com/svn/trunk/pl-the-west/images/title_informacja.png); background-repeat:no-repeat; background-position: center top;}');
addGlobalStyle('#window_pereodevalka_rezult_title {background:url(http://pl-the-west.googlecode.com/svn/trunk/pl-the-west/images/title_wyniki.png); background-repeat:no-repeat; background-position: center top;}');
addGlobalStyle('.bug_mini_red { width:35px; height:35px; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAMAAAApB0NrAAAABGdBTUEAALGPC/xhBQAAAwBQTFRFdiYcdycdeCcdfCYbfCcdeCgdeSkeeikfeiofeC0idDIkdDMmdDQndTQodzYoeDMmeDcpeDgpeDgqeTkra1ZAa1dCa1hCbFlDbVpDbVpEbltFb1xFb1xGcFtEcF1FcFxGcF1HcV5GcV5Hcl9IcV9JcmBIc2BJdGBJdGFKdWFLdWJJdWJKdWJLdmNMd2RLd2RMd2RNeGVMeGVNeGVOeWZNeWZOemZPemhOemhPfGlPe2hQfGlQfGlRfGpQfWpRfmtSfmtTfmxRfmxSf2xTnAoGiCccjC8igTIlijAjizAkjDEkjTEljDIkjTIljjMmjzQmjzQnjzQokCwgki8ikDUokTYpswMAtAMAugMAvAIAvwwHgG1TgG5TgG1UgW5UgW9VgnBUgnBVgnBWg3BXhHFWhHFXhHJWhHJXhXJYhXNZhnRYhnRZhnRah3VbiHVZiHZZiHZaiXZbiXdcinhbinhci3hdi3pdi3pejHlcjHldjHpdjHpejXtfjnxfjnxgj31hkH1hkH5hkH5ikX9jwwMAxAkFzAMA0QMA1AMA0woF5wMA6AMA7AMA8QMA+QMA/gMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAibcs2gAAAAlwSFlzAAALEAAACxABrSO9dQAAAAd0SU1FB9oLHgkGAg/ieXEAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAADwElEQVQ4T32U/WObRBjH2bR1Ot9flqWs0h4jiXKUyiCy0F4U5lyzdHauvsy01FAtjMtmaEBtjkCg07mxdv+yV1p/nA+/HNzn+T7PPTzPMS+Oj4ri2cusKI6OXzDHT+/d7K6vb9z55u7G+u3b6xt3N7/b3Njc6HS7nW7n1s2fimPm+b15FixwPN8AQFhgeR4qGjWZBxw1dv7rv4+YogNYcJW+LvJ1HjTEBlQMdF2DNVgH1Uq1+s6PBVOscaDUgYp64q/AJU1RDaOpQJ6rzlUu/lAwz7q8AHgRymoTtVf1zymHdEMz26uwxrEs++b3lFkXBEGUtZZhIMs0zZ7Zc8yeZdqGJvLVuVOmC0DtM82wexTYss2f+33Xtu2eRaM1uCtzF0sdAER1FW3RTdvF7tDHPv7F2XN65moTNoS3Tpg7NUFUELL72HWDR5iEHg4833f7dluVJOndUocXYKuNbDx08TAYkGgQkfH+KHjg9QwFXi11OotAVHRrQIb+fjwhSTrNkyQch3v2l9eV+kLJdIEgq+a2/wfGAaEWTzOShOQg8G2kQaE81xrgJa1nD6KDKEmzPEviyTSLwwDjXbOlSu+fnV1UHS8YjLPDjORpmk6zaZaE4WAX0YKWTIeWUN8NRqMoPczzKX2oVkai0UPbNJrL75UMLyw1dwbDKMwP6eYkSRNCJoTqWEjXmqUOreGSavnDJDvMU4rlhJ4tmQQBpjn/F4sDcgv5v4WTOEvyPI/J7yQl4f7+Q8fUr53lzAGoI3wwDifUPaXJBiQhByTEVkuTPjnNmQPLhvloTJLplGY7iYLhn5PJOAgctHJNapT/Yu0KR3X8gKRJFqbjyTghcRQR7Ln9dhPKH5QMzccwXRzGFCBRNCZhTAjGvm02pQYsY93igPIF8vbDYYCTOBySOAxHdO25OysQ1MpYtMekFuo7eG/PDX1/MIpCLxxjx+tbK3JNLHXWOF5Sje2+4zuu63sOdn8deJ7r7JiGUueFt8sa1hqSpPYs9wHt0T5tLae/VzKWXqdtfNrzfA1KGjJ2eiZqt20Tmdv2rrOzhU6aHoCS6QDA85KuGS3dMJGh09mxLAspsijwHHfGsJdZOp91UZKVVV3XZFnTm1qjVgPcXOVy9XQuFiuVOQ4siqqiLMtiXfhUXoaQjjpbrXx06dIbdE6Lb+c/rrKLAEAZyqIoAJaX6gKgXpSpVD98/X7BHP311avM+ZmZmdkLr81emJ09Wc3MnKOfzjEMc/6VG0+OmOPiyeP7L7fH/9D7h95jz//P6D32LzEDhBUz1GjIAAAAAElFTkSuQmCC); }');
    
    // dodanie przybornika pod ekwipunkiem

var menu_inventory = document.getElementById('menu_inventory');
if (menu_inventory) {
    menu_inventory.parentNode.insertBefore(menu_pk_s3, menu_inventory.nextSibling);
}

var pk_s3_code='';
var pk_s3_body, pk_s3_script, pk_s3_style, pk_s3_head; 
pk_s3_body = document.getElementsByTagName('body')[0];
pk_s3_script = document.createElement('script');
pk_s3_script.type = 'text/javascript';


PK_S3 = new Object();

PK_S3.init = function(){

	Str = 'http://dariuszszyndler.pl/wp/braki-w-przyborniku/';
	paypal = '<span style=\"float:left;\">Uważasz że warto mi postawić piwo lub kawę, kliknij przycisk. </span>\n';
	paypal += '<form action=\"https://www.paypal.com/cgi-bin/webscr\" method=\"post\" target=\"_blank\">\n';
	paypal += '<input type=\"hidden\" name=\"cmd\" value=\"_s-xclick\" />\n';
	paypal += '<input type=\"hidden\" name=\"hosted_button_id\" value=\"WTP9QLYFZPMU8\" />\n';
	paypal += '<input type=\"image\" src=\"https://www.paypal.com/pl_PL/PL/i/btn/btn_donate_SM.gif\" border=\"0\" name=\"submit\" alt=\"PayPal — Płać wygodnie i bezpiecznie\" />\n';
	paypal += '<img alt=\"\" border=\"0\" src=\"https://www.paypal.com/pl_PL/i/scr/pixel.gif\" width=\"1\" height=\"1\" />\n';
	paypal += '</form>\n';
	PrzVer = 'PL_3.3.19';
	s10_link = 'http://www.the-west.pl/?ref=westplayer_invite_linkrl&player_id=845806&world_id=10&hash=87fe&inviteVia=reflink';
	s11_link = 'http://www.the-west.pl/?ref=westplayer_invite_linkrl&player_id=845806&world_id=11&hash=4488&inviteVia=reflink';
	s13_link = 'http://www.the-west.pl/?ref=westplayer_invite_linkrl&player_id=845806&world_id=13&hash=3cdd&inviteVia=reflink';
	w1_link = 'http://public.beta.the-west.net/?ref=westplayer_invite_linkrl&player_id=8580&world_id=1&hash=fd16&inviteVia=reflink';
	de10_link = 'http://www.the-west.de/?ref=westplayer_invite_linkrl&player_id=1033465&world_id=12&hash=eaaf&inviteVia=reflink';

    PK_S3.types = ['head', 'neck', 'body', 'belt', 'pants', 'foot', 'right_arm', 'left_arm', 'animal', 'yield'];
    PK_S3.types_name = ['Nakrycie głowy', 'Naszyjnik', 'Odzież', 'Pas', 'Spodnie', 'Obuwie', 'Broń pojed.', 'Broń fortowa', 'Jazda', 'Produkt'];
    PK_S3.nabory=['set_farmer', 'set_mexican', 'set_indian', 'set_quackery', 'set_pilgrim_male', 'set_pilgrim_female', 'set_gentleman', 'set_dancer', 'fireworker_set', 'gold_set', 'greenhorn_set', 'set_sleeper', 'season_set'];
    PK_S3.skills = ['build', 'punch', 'tough', 'endurance', 'health', 'ride', 'reflex', 'dodge', 'hide', 'swim', 'aim', 'shot', 'pitfall', 'finger_dexterity', 'repair', 'leadership', 'tactic', 'trade', 'animal', 'appearance'];
    PK_S3.skillsi = {build: 0, punch:1, tough:2, endurance:3, health:4, ride:5, reflex:6, dodge:7, hide:8, swim:9, aim:10, shot:11, pitfall:12, finger_dexterity:13, repair:14, leadership:15, tactic:16, trade:17, animal:18, appearance:19}
    PK_S3.attributes = ['strength', 'flexibility', 'dexterity', 'charisma'];
    PK_S3.skill2atr = {build:'strength', punch:'strength', tough:'strength', endurance:'strength', health:'strength',ride:'flexibility', reflex:'flexibility', dodge:'flexibility', hide:'flexibility', swim:'flexibility',aim:'dexterity', shot:'dexterity', pitfall:'dexterity', finger_dexterity:'dexterity', repair:'dexterity', leadership:'charisma', tactic:'charisma', trade:'charisma', animal:'charisma', appearance:'charisma'};
    PK_S3.informer = '';
    PK_S3.rezultat = '';
    PK_S3.fort_affects = ['defense', 'offense', 'damage'];
    PK_S3.vsego_s_TO = 10;
    
    
    PK_S3.bonus = {};
    PK_S3.bonus.speed = (Character.characterClass != 'duelist') ? 1.0 : (PremiumBoni.hasBonus('character')) ? 1.2 : 1.1;
    PK_S3.bonus.money = (PremiumBoni.hasBonus('money')) ? 1.5 : 1.0;
    PK_S3.bonus.drop = (Character.characterClass != 'adventurer') ? 1.0 : (PremiumBoni.hasBonus('character')) ? 1.2 : 1.1;
    PK_S3.bonus.life = (Character.characterClass != 'soldier') ? 10 : (PremiumBoni.hasBonus('character')) ? 20 : 15;
    PK_S3.bonus.exp = (Character.characterClass) != 'worker' ? 1.0 : (PremiumBoni.hasBonus('character')) ? 1.1 : 1.05;
    PK_S3.bonus.build = (Character.characterClass) != 'worker' ? 1.0 : (PremiumBoni.hasBonus('character')) ? 1.1 : 1.05;
    PK_S3.bonus.weapon = (Character.characterClass != 'soldier') ? 0 : (PremiumBoni.hasBonus('character')) ? 6 : 3;
    PK_S3.bonus.leader = (Character.characterClass != 'soldier') ? 1.0 : (PremiumBoni.hasBonus('character')) ? 1.5 : 1.25;

    
    PK_S3.items = [];
    PK_S3.raboty = [];
    PK_S3.komplekty = {};
    
    PK_S3.raboty.max = 127;
    PK_S3.raboty.build = 199;
    PK_S3.raboty.moving = 200;
    PK_S3.raboty.health = 201;
    PK_S3.raboty.energy = 202;
    PK_S3.raboty.fort_min = 301;
    PK_S3.raboty.fort_max = 400;
    PK_S3.raboty.fort_middle = 304;
    PK_S3.raboty.duel_min = 401;
    PK_S3.raboty.duel_max = 500;
    //PK_S3.raboty.surprise = 999;
    

    PK_S3.rekurs = {};
    PK_S3.rekurs.max_count = 2000;
    PK_S3.rekurs.time = 0;
    PK_S3.rekurs.working = 1024;
    PK_S3.rekurs.delay = 32;
    PK_S3.rekurs.itteration = 0;
    PK_S3.rekurs.overflow = 5;

    PK_S3.vyvod = {};
    PK_S3.vyvod.type = 'name';
    PK_S3.vyvod.negativ = false;
    PK_S3.vyvod.nativ = false;
    PK_S3.vyvod.to = 0;
//    PK_S3.vyvod.type_old = 'nothing';
    PK_S3.cookies = {};
    PK_S3.cookies.save = [];


    PK_S3.progress = {};
    PK_S3.progress.percent = 0;
    PK_S3.progress.id = 0;
    PK_S3.progress.array_mask = [];
    var temp_progress_summ = 0;
    var max_mask = Math.pow(2, PK_S3.types.length) - 1;
    for (var i = 0; i <= max_mask / 2; ++i){
	PK_S3.progress.array_mask[i] = 0;
	for (var j = i + 1; j < max_mask; ++j){
	    if (!(i&j)){
		++temp_progress_summ;
	    }
	}
	PK_S3.progress.array_mask[i] = temp_progress_summ;
    }
    for (var i = 0; i <= max_mask / 2; ++i){
	PK_S3.progress.array_mask[i] /= temp_progress_summ;
    }

    PK_S3.text_info = '';
    

    PK_S3.odevalo4ka = {};
    PK_S3.odevalo4ka.items = [];
    PK_S3.odevalo4ka.wait_inventory = 2000;
    PK_S3.odevalo4ka.wait_carry = 1000;
    PK_S3.odevalo4ka.repeat = 10;
    PK_S3.odevalo4ka.count = 0;
    PK_S3.odevalo4ka.bagazh = false;
    
    PK_S3.forty = {};
    PK_S3.forty.ves = {aim:1, dodge:1, leadership:1, skill:1};
    PK_S3.forty.is_zero = true;

    
    PK_S3.items[0] = {item_id:0, nshort:'nothing', name:'Pięść', type:'zaty4ka', level:0, price:0, image:'/images/items/unknown.png?1', image_mini:'/images/items/unknown.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:1, damage_max:7}, sub_type:'hand'};
	
/* --------------------------------------- BRONIE BIAŁE --------------------------------------- */	
	PK_S3.items[1] = {item_id:1, nshort:'clayjug', name:'Rozbity dzban', type:'right_arm', level:1, price:16, image:'/images/items/right_arm/clayjug.png?1', image_mini:'/images/items/right_arm/mini/clayjug.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:1, damage_max:7}, sub_type:'hand'};
    PK_S3.items[2] = {item_id:2, nshort:'winebottle', name:'Rozbita butelka po winie', type:'right_arm', level:5, price:26, image:'/images/items/right_arm/winebottle.png?1', image_mini:'/images/items/right_arm/mini/winebottle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:2, damage_max:10}, sub_type:'hand'};
    PK_S3.items[3] = {item_id:3, nshort:'whiskeybottle', name:'Rozbita butelka po whisky', type:'right_arm', level:7, price:40, image:'/images/items/right_arm/whiskeybottle.png?1', image_mini:'/images/items/right_arm/mini/whiskeybottle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:3, damage_max:13}, sub_type:'hand'};
	
	PK_S3.items[4] = {item_id:4, nshort:'rotty_club', name:'Złamany kij', type:'right_arm', level:7, price:26, image:'/images/items/right_arm/rotty_club.png?1', image_mini:'/images/items/right_arm/mini/rotty_club.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:3, damage_max:9}, sub_type:'hand'};
    PK_S3.items[5] = {item_id:5, nshort:'club', name:'Kij', type:'right_arm', level:10, price:63, image:'/images/items/right_arm/club.png?1', image_mini:'/images/items/right_arm/mini/club.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:6, damage_max:12}, sub_type:'hand'};
    PK_S3.items[6] = {item_id:6, nshort:'nail_club', name:'Kij z gwoździem', type:'right_arm', level:13, price:125, image:'/images/items/right_arm/nail_club.png?1', image_mini:'/images/items/right_arm/mini/nail_club.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:8, damage_max:16}, sub_type:'hand'};
	
    PK_S3.items[7] = {item_id:7, nshort:'rusty_razor', name:'Rdzawa brzytwa', type:'right_arm', level:12, price:64, image:'/images/items/right_arm/rusty_razor.png?1', image_mini:'/images/items/right_arm/mini/rusty_razor.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:7, damage_max:11}, sub_type:'hand'};
    PK_S3.items[8] = {item_id:8, nshort:'razor', name:'Brzytwa', type:'right_arm', level:15, price:146, image:'/images/items/right_arm/razor.png?1', image_mini:'/images/items/right_arm/mini/razor.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:11, damage_max:15}, sub_type:'hand'};
    PK_S3.items[9] = {item_id:9, nshort:'sharp_razor', name:'Ostra brzytwa', type:'right_arm', level:18, price:354, image:'/images/items/right_arm/sharp_razor.png?1', image_mini:'/images/items/right_arm/mini/sharp_razor.png?1', bonus:{skills:{aim:1}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:14, damage_max:20}, sub_type:'hand'};
    PK_S3.items[10] = {item_id:10, nshort:'figaros_razor', name:'Brzytwa Figara', type:'right_arm', level:25, price:1740, image:'/images/items/right_arm/figaros_razor.png?1', image_mini:'/images/items/right_arm/mini/figaros_razor.png?1', bonus:{skills:{finger_dexterity:3, aim:3}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:true, tradeable:false, sellable:true, damage:{damage_min:32, damage_max:48}, sub_type:'hand'};
	
    PK_S3.items[11] = {item_id:11, nshort:'rusty_skewer', name:'Rdzawy sztylet', type:'right_arm', level:17, price:122, image:'/images/items/right_arm/rusty_skewer.png?1', image_mini:'/images/items/right_arm/mini/rusty_skewer.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:7, damage_max:17}, sub_type:'hand'};
    PK_S3.items[12] = {item_id:12, nshort:'skewer', name:'Sztylet', type:'right_arm', level:20, price:384, image:'/images/items/right_arm/skewer.png?1', image_mini:'/images/items/right_arm/mini/skewer.png?1', bonus:{skills:{punch:1}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:13, damage_max:23}, sub_type:'hand'};
    PK_S3.items[13] = {item_id:13, nshort:'sharp_skewer', name:'Ostry sztylet', type:'right_arm', level:23, price:554, image:'/images/items/right_arm/sharp_skewer.png?1', image_mini:'/images/items/right_arm/mini/sharp_skewer.png?1', bonus:{skills:{punch:1}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:18, damage_max:28}, sub_type:'hand'};
    PK_S3.items[14] = {item_id:14, nshort:'codys_skewer', name:'Sztylet Cody\'ego', type:'right_arm', level:30, price:2600, image:'/images/items/right_arm/codys_skewer.png?1', image_mini:'/images/items/right_arm/mini/codys_skewer.png?1', bonus:{skills:{health:4, punch:3}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:true, tradeable:false, sellable:true, damage:{damage_min:42, damage_max:60}, sub_type:'hand'};
	
    PK_S3.items[15] = {item_id:15, nshort:'rusty_bowie', name:'Zardzewiała finka', type:'right_arm', level:27, price:450, image:'/images/items/right_arm/rusty_bowie.png?1', image_mini:'/images/items/right_arm/mini/rusty_bowie.png?1', bonus:{skills:{appearance:1}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:16, damage_max:24}, sub_type:'hand'};
    PK_S3.items[16] = {item_id:16, nshort:'bowie', name:'Finka', type:'right_arm', level:30, price:850, image:'/images/items/right_arm/bowie.png?1', image_mini:'/images/items/right_arm/mini/bowie.png?1', bonus:{skills:{appearance:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:22, damage_max:34}, sub_type:'hand'};
    PK_S3.items[17] = {item_id:17, nshort:'sharp_bowie', name:'Ostra finka', type:'right_arm', level:33, price:1220, image:'/images/items/right_arm/sharp_bowie.png?1', image_mini:'/images/items/right_arm/mini/sharp_bowie.png?1', bonus:{skills:{appearance:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:32, damage_max:40}, sub_type:'hand'};
    PK_S3.items[18] = {item_id:18, nshort:'bowies_knife', name:'Nóż Bowie\'ego', type:'right_arm', level:40, price:4600, image:'/images/items/right_arm/bowies_knife.png?1', image_mini:'/images/items/right_arm/mini/bowies_knife.png?1', bonus:{skills:{appearance:4, pitfall:5}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:true, tradeable:false, sellable:true, damage:{damage_min:68, damage_max:80}, sub_type:'hand'};
	
    PK_S3.items[19] = {item_id:19, nshort:'rusty_foil', name:'Rdzawy floret', type:'right_arm', level:32, price:730, image:'/images/items/right_arm/rusty_foil.png?1', image_mini:'/images/items/right_arm/mini/rusty_foil.png?1', bonus:{skills:{tactic:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:18, damage_max:32}, sub_type:'hand'};
    PK_S3.items[20] = {item_id:20, nshort:'foil', name:'Floret', type:'right_arm', level:35, price:1134, image:'/images/items/right_arm/foil.png?1', image_mini:'/images/items/right_arm/mini/foil.png?1', bonus:{skills:{tactic:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:24, damage_max:44}, sub_type:'hand'};
    PK_S3.items[21] = {item_id:21, nshort:'sharp_foil', name:'Ostry floret', type:'right_arm', level:38, price:1655, image:'/images/items/right_arm/sharp_foil.png?1', image_mini:'/images/items/right_arm/mini/sharp_foil.png?1', bonus:{skills:{tactic:3}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:30, damage_max:54}, sub_type:'hand'};
    PK_S3.items[22] = {item_id:22, nshort:'athos_foil', name:'Floret Athosa', type:'right_arm', level:45, price:5775, image:'/images/items/right_arm/athos_foil.png?1', image_mini:'/images/items/right_arm/mini/athos_foil.png?1', bonus:{skills:{finger_dexterity:5, endurance:6}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:true, tradeable:false, sellable:true, damage:{damage_min:68, damage_max:100}, sub_type:'hand'};
	
    PK_S3.items[23] = {item_id:23, nshort:'rusty_machete', name:'Rdzawa maczeta', type:'right_arm', level:37, price:940, image:'/images/items/right_arm/rusty_machete.png?1', image_mini:'/images/items/right_arm/mini/rusty_machete.png?1', bonus:{skills:{tough:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:5, damage_max:55}, sub_type:'hand'};
    PK_S3.items[24] = {item_id:24, nshort:'machete', name:'Maczeta', type:'right_arm', level:40, price:1560, image:'/images/items/right_arm/machete.png?1', image_mini:'/images/items/right_arm/mini/machete.png?1', bonus:{skills:{tough:3}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:10, damage_max:70}, sub_type:'hand'};
    PK_S3.items[25] = {item_id:25, nshort:'sharp_machete', name:'Ostra maczeta', type:'right_arm', level:43, price:2150, image:'/images/items/right_arm/sharp_machete.png?1', image_mini:'/images/items/right_arm/mini/sharp_machete.png?1', bonus:{skills:{tough:3}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:15, damage_max:85}, sub_type:'hand'};
    PK_S3.items[26] = {item_id:26, nshort:'nats_machete', name:'Maczeta Nata', type:'right_arm', level:50, price:6750, image:'/images/items/right_arm/nats_machete.png?1', image_mini:'/images/items/right_arm/mini/nats_machete.png?1', bonus:{skills:{leadership:6, tough:6}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:true, tradeable:false, sellable:true, damage:{damage_min:20, damage_max:163}, sub_type:'hand'};
	
    PK_S3.items[27] = {item_id:27, nshort:'rusty_conquistador', name:'Rdzawy miecz konkwistadora', type:'right_arm', level:47, price:1710, image:'/images/items/right_arm/rusty_conquistador.png?1', image_mini:'/images/items/right_arm/mini/rusty_conquistador.png?1', bonus:{skills:{reflex:3}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:37, damage_max:49}, sub_type:'hand'};
    PK_S3.items[28] = {item_id:28, nshort:'conquistador', name:'Miecz konkwistadora', type:'right_arm', level:50, price:2560, image:'/images/items/right_arm/conquistador.png?1', image_mini:'/images/items/right_arm/mini/conquistador.png?1', bonus:{skills:{reflex:4}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:48, damage_max:60}, sub_type:'hand'};
    PK_S3.items[29] = {item_id:29, nshort:'sharp_conquistador', name:'Ostry miecz konkwistadora', type:'right_arm', level:53, price:3370, image:'/images/items/right_arm/sharp_conquistador.png?1', image_mini:'/images/items/right_arm/mini/sharp_conquistador.png?1', bonus:{skills:{reflex:5}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:54, damage_max:74}, sub_type:'hand'};
    PK_S3.items[30] = {item_id:30, nshort:'henandos_conquistador', name:'Miecz Hernanda de Soto', type:'right_arm', level:50, price:8700, image:'/images/items/right_arm/henandos_conquistador.png?1', image_mini:'/images/items/right_arm/mini/henandos_conquistador.png?1', bonus:{skills:{trade:6, reflex:7}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:true, tradeable:false, sellable:true, damage:{damage_min:95, damage_max:125}, sub_type:'hand'};
	
    PK_S3.items[31] = {item_id:31, nshort:'rusty_tomahawk', name:'Rdzawy tomahawk', type:'right_arm', level:57, price:2900, image:'/images/items/right_arm/rusty_tomahawk.png?1', image_mini:'/images/items/right_arm/mini/rusty_tomahawk.png?1', bonus:{skills:{hide:2, dodge:3}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:12, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:43, damage_max:71}, sub_type:'hand'};
    PK_S3.items[32] = {item_id:32, nshort:'tomahawk', name:'Tomahawk', type:'right_arm', level:60, price:3800, image:'/images/items/right_arm/tomahawk.png?1', image_mini:'/images/items/right_arm/mini/tomahawk.png?1', bonus:{skills:{hide:3, dodge:3}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:12, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:50, damage_max:88}, sub_type:'hand'};
    PK_S3.items[33] = {item_id:33, nshort:'sharp_tomahawk', name:'Ostry tomahawk', type:'right_arm', level:63, price:4900, image:'/images/items/right_arm/sharp_tomahawk.png?1', image_mini:'/images/items/right_arm/mini/sharp_tomahawk.png?1', bonus:{skills:{hide:3, dodge:3}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:12, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:65, damage_max:95}, sub_type:'hand'};
    PK_S3.items[34] = {item_id:34, nshort:'taschunkas_tomahawk', name:'Tomahawk Tashunka', type:'right_arm', level:70, price:10100, image:'/images/items/right_arm/taschunkas_tomahawk.png?1', image_mini:'/images/items/right_arm/mini/taschunkas_tomahawk.png?1', bonus:{skills:{swim:7, hide:3, dodge:5}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:true, tradeable:false, sellable:true, damage:{damage_min:100, damage_max:140}, sub_type:'hand'};
	
    PK_S3.items[35] = {item_id:35, nshort:'rusty_axe', name:'Zardzewiała siekiera drwala', type:'right_arm', level:62, price:3400, image:'/images/items/right_arm/rusty_axe.png?1', image_mini:'/images/items/right_arm/mini/rusty_axe.png?1', bonus:{skills:{punch:4}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:13, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:20, damage_max:112}, sub_type:'hand'};
    PK_S3.items[36] = {item_id:36, nshort:'axe', name:'Siekiera drwala', type:'right_arm', level:65, price:4400, image:'/images/items/right_arm/axe.png?1', image_mini:'/images/items/right_arm/mini/axe.png?1', bonus:{skills:{punch:5}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:13, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:25, damage_max:127}, sub_type:'hand'};
    PK_S3.items[37] = {item_id:37, nshort:'sharp_axe', name:'Ostra siekiera drwala', type:'right_arm', level:68, price:5600, image:'/images/items/right_arm/sharp_axe.png?1', image_mini:'/images/items/right_arm/mini/sharp_axe.png?1', bonus:{skills:{punch:6}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:13, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:30, damage_max:144}, sub_type:'hand'};
	PK_S3.items[38] = {item_id:38, nshort:'boones_axe', name:'Siekiera Boone', type:'right_arm', level:75, price:10200, image:'/images/items/right_arm/boones_axe.png?1', image_mini:'/images/items/right_arm/mini/boones_axe.png?1', bonus:{skills:{punch:8, build:8}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:true, tradeable:false, sellable:true, damage:{damage_min:35, damage_max:205}, sub_type:'hand'};
	
    PK_S3.items[39] = {item_id:39, nshort:'rusty_sabre', name:'Zardzewiała szabla kawaleryjska', type:'right_arm', level:67, price:4200, image:'/images/items/right_arm/rusty_sabre.png?1', image_mini:'/images/items/right_arm/mini/rusty_sabre.png?1', bonus:{skills:{tactic:5}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:14, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:64, damage_max:84}, sub_type:'hand'};
    PK_S3.items[40] = {item_id:40, nshort:'sabre', name:'Szabla kawaleryjska', type:'right_arm', level:70, price:5230, image:'/images/items/right_arm/sabre.png?1', image_mini:'/images/items/right_arm/mini/sabre.png?1', bonus:{skills:{tactic:6}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:14, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:75, damage_max:93}, sub_type:'hand'};
    PK_S3.items[41] = {item_id:41, nshort:'sharp_sabre', name:'Ostra szabla kawaleryjska', type:'right_arm', level:73, price:6350, image:'/images/items/right_arm/sharp_sabre.png?1', image_mini:'/images/items/right_arm/mini/sharp_sabre.png?1', bonus:{skills:{tactic:6}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:14, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:85, damage_max:105}, sub_type:'hand'};
	PK_S3.items[42] = {item_id:42, nshort:'grants_sabre', name:'Szabla Generała Granta', type:'right_arm', level:80, price:10800, image:'/images/items/right_arm/grants_sabre.png?1', image_mini:'/images/items/right_arm/mini/grants_sabre.png?1', bonus:{skills:{tactic:9, ride:9}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:true, sellable:true, damage:{damage_min:110, damage_max:134}, sub_type:'hand'};
	
    PK_S3.items[43] = {item_id:43, nshort:'screwdriver', name:'Śrubokręt', type:'right_arm', level:10, price:114, image:'/images/items/right_arm/screwdriver.png?1', image_mini:'/images/items/right_arm/mini/screwdriver.png?1', characterClass:'worker', bonus:{skills:{finger_dexterity:1}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true, damage:{damage_min:4, damage_max:14}, sub_type:'hand'};
    PK_S3.items[44] = {item_id:44, nshort:'spanner', name:'Klucz płaski', type:'right_arm', level:21, price:628, image:'/images/items/right_arm/spanner.png?1', image_mini:'/images/items/right_arm/mini/spanner.png?1', characterClass:'worker', bonus:{skills:{build:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true, damage:{damage_min:20, damage_max:24}, sub_type:'hand'};
    PK_S3.items[45] = {item_id:45, nshort:'crowbar', name:'Łom', type:'right_arm', level:36, price:1594, image:'/images/items/right_arm/crowbar.png?1', image_mini:'/images/items/right_arm/mini/crowbar.png?1', characterClass:'worker', bonus:{skills:{repair:3}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true, damage:{damage_min:30, damage_max:46}, sub_type:'hand'};
    PK_S3.items[46] = {item_id:46, nshort:'whips', name:'Bicz', type:'right_arm', level:30, price:594, image:'/images/items/right_arm/whips.png?1', image_mini:'/images/items/right_arm/mini/whips.png?1', characterClass:'adventurer', bonus:{skills:{reflex:5}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true, damage:{damage_min:30, damage_max:46}, sub_type:'hand'};
    PK_S3.items[47] = {item_id:47, nshort:'pillow', name:'Poduszka', type:'right_arm', level:45, price:450, image:'/images/items/right_arm/pillow.png?1', image_mini:'/images/items/right_arm/mini/pillow.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_sleeper', name:'Śpioszek'}, auctionable:true, dropable:true, tradeable:false, sellable:true, damage:{damage_min:0, damage_max:1}, sub_type:'hand'};
    PK_S3.items[48] = {item_id:48, nshort:'bowie_xmas', name:'Nóż do krojenia bożonarodzeniowego ciasta', type:'right_arm', level:1, price:512, image:'/images/items/right_arm/bowie_xmas.png?1', image_mini:'/images/items/right_arm/mini/bowie_xmas.png?1', bonus:{skills:{appearance:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:100, auctionable:true, dropable:false, tradeable:true, sellable:true, damage:{damage_min:1, damage_max:2}, sub_type:'hand'};

    PK_S3.items[50] = {item_id:50, nshort:'goldensable', name:'Złota szabla', type:'right_arm', level:70, price:22500, image:'/images/items/right_arm/goldensable.png?1', image_mini:'/images/items/right_arm/mini/goldensable.png?1', bonus:{skills:{aim:4, punch:8}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'gold_set', name:'Złoty komplet'}, traderlevel:100, auctionable:false, dropable:false, tradeable:true, sellable:false, damage:{damage_min:101, damage_max:149}, sub_type:'hand'};
	PK_S3.items[51] = {item_id:51, nshort:'fakegoldensable', name:'Podrobiona złota szabla', type:'right_arm', level:80, price:10500, image:'/images/items/right_arm/fakegoldensable.png?1', image_mini:'/images/items/right_arm/mini/fakegoldensable.png?1', bonus:{skills:{aim:2, punch:5}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:false, sellable:true, damage:{damage_min:1, damage_max:7}, sub_type:'hand'};
    PK_S3.items[52] = {item_id:52, nshort:'greenhorn_axe', name:'Topór skauta', type:'right_arm', level:6, price:550, image:'/images/items/right_arm/greenhorn_axe.png?1', image_mini:'/images/items/right_arm/mini/greenhorn_axe.png?1', bonus:{skills:{punch:1}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'greenhorn_set', name:'Zestaw nowicjusza'}, auctionable:false, dropable:false, tradeable:false, sellable:true, damage:{damage_min:6, damage_max:14}, sub_type:'hand'};
	PK_S3.items[53] = {item_id:53, nshort:'xmas_rod', name:'Rózga', type:'right_arm', level:0, price:250, image:'/images/items/right_arm/xmas_rod.png?1', image_mini:'/images/items/right_arm/mini/xmas_rod.png?1', bonus:{skills:{appearance:-2, aim:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true, damage:{damage_min:1, damage_max:12}, sub_type:'hand'};

    PK_S3.items[55] = {item_id:55, nshort:'bouquet', name:'Bukiet kwiatów', type:'right_arm', level:1, price:22, image:'/images/items/right_arm/bouquet.png?1', image_mini:'/images/items/right_arm/mini/bouquet.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true, damage:{damage_min:0, damage_max:0}, sub_type:'hand'};
	PK_S3.items[56] = {item_id:56, nshort:'golden_tomahawk', name:'Złoty Tomahawk', type:'right_arm', level:70, price:11750, image:'/images/items/right_arm/golden_tomahawk.png?1', image_mini:'/images/items/right_arm/mini/golden_tomahawk.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:100, auctionable:true, tradeable:true, sellable:true, damage:{damage_min:100, damage_max:200}, sub_type:'hand'};
    PK_S3.items[57] = {item_id:57, nshort:'hacketts_pickaxe', name:'Kilof staruszka Hacketta', type:'right_arm', level:10, price:75, image:'/images/items/right_arm/hacketts_pickaxe.png?1', image_mini:'/images/items/right_arm/mini/hacketts_pickaxe.png?1', bonus:{skills:{punch:2, build:1}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, damage:{damage_min:8, damage_max:20}, sub_type:'hand'};
	PK_S3.items[58] = {item_id:58, nshort:'collector_saber', name:'Szabla kolekcjonera', type:'right_arm', level:100, price:10000, image:'/images/items/right_arm/collector_saber.png?1', image_mini:'/images/items/right_arm/mini/collector_saber.png?1', bonus:{skills:{animal:15, hide:15}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'collector_set', name:'Zestaw kolekcjonera'}, damage:{damage_min:75, damage_max:175}, sub_type:'hand'};
	PK_S3.items[59] = {item_id:59, nshort:'sam_hawkens_knive', name:'Nóż Sama Hawkena', type:'right_arm', level:70, price:0, image:'/images/items/right_arm/sam_hawkens_knive.png?1', image_mini:'/images/items/right_arm/mini/sam_hawkens_knive.png?1', bonus:{skills:{trade:20}, attributes:{}, fortbattle:{offense:1, defense:1}, fortbattlesector:{damage:1, offense:1, defense:1}}, set:{}, traderlevel:100, tradeable:true, damage:{damage_min:110, damage_max:140}, sub_type:'hand'};
	PK_S3.items[60] = {item_id:60, nshort:'vargas_sabre', name:'Emilio Vargas\'s sabre', type:'right_arm', level:50, price:1500, image:'/images/items/right_arm/vargas_sabre.png?1', image_mini:'/images/items/right_arm/mini/vargas_sabre.png?1', bonus:{skills:{tactic:5, dodge:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true, damage:{damage_min:54, damage_max:74}, sub_type:'hand'};
	
	PK_S3.items[63] = {item_id:63, nshort:'bunny_carot', name:'Marchewka zajączka wielkanocnego', type:'right_arm', level:1, price:0, image:'/images/items/right_arm/bunny_carot.png?1', image_mini:'/images/items/right_arm/mini/bunny_carot.png?1', bonus:{skills:{animal:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'bunny_set', name:'Zestaw zajączka wielkanocnego'}, damage:{damage_min:3, damage_max:5}, sub_type:'hand'};

/* --------------------------------------- BRONIE FORTOWE --------------------------------------- */
	PK_S3.items[100] = {item_id:100, nshort:'stone_left', name:'Kamień', type:'left_arm', level:1, price:0, image:'/images/items/left_arm/stone_left.png?1', image_mini:'/images/items/left_arm/mini/stone_left.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true, damage:{damage_min:50, damage_max:110}};
	PK_S3.items[101] = {item_id:101, nshort:'bow_rusty', name:'Zbutwiały łuk', type:'left_arm', level:5, price:400, image:'/images/items/left_arm/bow_rusty.png?1', image_mini:'/images/items/left_arm/mini/bow_rusty.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:50, damage_max:130}};
	PK_S3.items[102] = {item_id:102, nshort:'bow_normal', name:'Łuk', type:'left_arm', level:10, price:650, image:'/images/items/left_arm/bow_normal.png?1', image_mini:'/images/items/left_arm/mini/bow_normal.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:70, damage_max:150}};
    PK_S3.items[103] = {item_id:103, nshort:'bow_best', name:'Precyzyjny łuk', type:'left_arm', level:13, price:1275, image:'/images/items/left_arm/bow_best.png?1', image_mini:'/images/items/left_arm/mini/bow_best.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:100, damage_max:188}};
	
    PK_S3.items[104] = {item_id:104, nshort:'crossbow_rusty', name:'Zbutwiała kusza', type:'left_arm', level:10, price:520, image:'/images/items/left_arm/crossbow_rusty.png?1', image_mini:'/images/items/left_arm/mini/crossbow_rusty.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:75, damage_max:129}};
	PK_S3.items[105] = {item_id:105, nshort:'crossbow_normal', name:'Kusza', type:'left_arm', level:20, price:755, image:'/images/items/left_arm/crossbow_normal.png?1', image_mini:'/images/items/left_arm/mini/crossbow_normal.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:90, damage_max:150}};
    PK_S3.items[106] = {item_id:106, nshort:'crossbow_best', name:'Precyzyjna kusza', type:'left_arm', level:23, price:1600, image:'/images/items/left_arm/crossbow_best.png?1', image_mini:'/images/items/left_arm/mini/crossbow_best.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:120, damage_max:192}};
	
    PK_S3.items[107] = {item_id:107, nshort:'arkebuse_rusty', name:'Zardzewiały arkebuz', type:'left_arm', level:18, price:684, image:'/images/items/left_arm/arkebuse_rusty.png?1', image_mini:'/images/items/left_arm/mini/arkebuse_rusty.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:80, damage_max:160}};
	PK_S3.items[108] = {item_id:108, nshort:'arkebuse_normal', name:'Arkebuz', type:'left_arm', level:30, price:1070, image:'/images/items/left_arm/arkebuse_normal.png?1', image_mini:'/images/items/left_arm/mini/arkebuse_normal.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:90, damage_max:190}};
	PK_S3.items[109] = {item_id:109, nshort:'arkebuse_best', name:'Precyzyjny arkebuz', type:'left_arm', level:33, price:2444, image:'/images/items/left_arm/arkebuse_best.png?1', image_mini:'/images/items/left_arm/mini/arkebuse_best.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:112, damage_max:232}};
	
	PK_S3.items[110] = {item_id:110, nshort:'blunderbuss_rusty', name:'Zardzewiała strzelba', type:'left_arm', level:20, price:775, image:'/images/items/left_arm/blunderbuss_rusty.png?1', image_mini:'/images/items/left_arm/mini/blunderbuss_rusty.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:1, damage_max:256}};
	PK_S3.items[111] = {item_id:111, nshort:'blunderbuss_normal', name:'Puszka', type:'left_arm', level:35, price:1300, image:'/images/items/left_arm/blunderbuss_normal.png?1', image_mini:'/images/items/left_arm/mini/blunderbuss_normal.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:1, damage_max:300}};
	PK_S3.items[112] = {item_id:112, nshort:'blunderbuss_best', name:'Precyzyjna strzelba', type:'left_arm', level:38, price:2950, image:'/images/items/left_arm/blunderbuss_best.png?1', image_mini:'/images/items/left_arm/mini/blunderbuss_best.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:1, damage_max:360}};
	
    PK_S3.items[113] = {item_id:113, nshort:'musket_rusty', name:'Zardzewiały muszkiet', type:'left_arm', level:25, price:920, image:'/images/items/left_arm/musket_rusty.png?1', image_mini:'/images/items/left_arm/mini/musket_rusty.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:83, damage_max:193}};
    PK_S3.items[114] = {item_id:114, nshort:'musket_normal', name:'Muszkiet', type:'left_arm', level:40, price:1580, image:'/images/items/left_arm/musket_normal.png?1', image_mini:'/images/items/left_arm/mini/musket_normal.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:100, damage_max:220}};
	PK_S3.items[115] = {item_id:115, nshort:'musket_best', name:'Precyzyjny muszkiet', type:'left_arm', level:43, price:3850, image:'/images/items/left_arm/musket_best.png?1', image_mini:'/images/items/left_arm/mini/musket_best.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:126, damage_max:266}};
	
	PK_S3.items[116] = {item_id:116, nshort:'flint_rusty', name:'Zardzewiała flinta', type:'left_arm', level:35, price:1350, image:'/images/items/left_arm/flint_rusty.png?1', image_mini:'/images/items/left_arm/mini/flint_rusty.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:120, damage_max:192}};
	PK_S3.items[117] = {item_id:117, nshort:'flint_normal', name:'Flinta', type:'left_arm', level:50, price:2440, image:'/images/items/left_arm/flint_normal.png?1', image_mini:'/images/items/left_arm/mini/flint_normal.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:135, damage_max:225}};
	PK_S3.items[118] = {item_id:118, nshort:'flint_best', name:'Precyzyjna flinta', type:'left_arm', level:53, price:6300, image:'/images/items/left_arm/flint_best.png?1', image_mini:'/images/items/left_arm/mini/flint_best.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:168, damage_max:268}};
	PK_S3.items[119] = {item_id:119, nshort:'shotgun_rusty', name:'Zardzewiały shotgun', type:'left_arm', level:40, price:1600, image:'/images/items/left_arm/shotgun_rusty.png?1', image_mini:'/images/items/left_arm/mini/shotgun_rusty.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:11, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:1, damage_max:242}};
	PK_S3.items[120] = {item_id:120, nshort:'shotgun_normal', name:'Shotgun', type:'left_arm', level:55, price:3000, image:'/images/items/left_arm/shotgun_normal.png?1', image_mini:'/images/items/left_arm/mini/shotgun_normal.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:11, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:1, damage_max:380}};
	PK_S3.items[121] = {item_id:121, nshort:'shotgun_best', name:'Precyzyjny shotgun', type:'left_arm', level:58, price:7000, image:'/images/items/left_arm/shotgun_best.png?1', image_mini:'/images/items/left_arm/mini/shotgun_best.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:11, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:1, damage_max:444}};
	
	PK_S3.items[122] = {item_id:122, nshort:'percussion_rusty', name:'Zardzewiały Karabin Sharpsa', type:'left_arm', level:45, price:2000, image:'/images/items/left_arm/percussion_rusty.png?1', image_mini:'/images/items/left_arm/mini/percussion_rusty.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:12, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:126, damage_max:226}};
	PK_S3.items[123] = {item_id:123, nshort:'percussion_normal', name:'Karabin Sharpsa', type:'left_arm', level:60, price:3800, image:'/images/items/left_arm/percussion_normal.png?1', image_mini:'/images/items/left_arm/mini/percussion_normal.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:12, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:150, damage_max:250}};
	PK_S3.items[124] = {item_id:124, nshort:'percussion_best', name:'Precyzyjny Karabin Sharpsa', type:'left_arm', level:63, price:8800, image:'/images/items/left_arm/percussion_best.png?1', image_mini:'/images/items/left_arm/mini/percussion_best.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:12, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:172, damage_max:292}};
	PK_S3.items[125] = {item_id:125, nshort:'breechloader_rusty', name:'Zardzewiała odtylcówka', type:'left_arm', level:55, price:3150, image:'/images/items/left_arm/breechloader_rusty.png?1', image_mini:'/images/items/left_arm/mini/breechloader_rusty.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:14, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:160, damage_max:232}};
	PK_S3.items[126] = {item_id:126, nshort:'breechloader_normal', name:'Karabin łamany', type:'left_arm', level:70, price:6000, image:'/images/items/left_arm/breechloader_normal.png?1', image_mini:'/images/items/left_arm/mini/breechloader_normal.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:14, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:190, damage_max:250}};
	PK_S3.items[127] = {item_id:127, nshort:'breechloader_best', name:'Precyzyjna odtylcówka', type:'left_arm', level:73, price:12600, image:'/images/items/left_arm/breechloader_best.png?1', image_mini:'/images/items/left_arm/mini/breechloader_best.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:14, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:200, damage_max:296}};
	PK_S3.items[128] = {item_id:128, nshort:'winchester_rusty', name:'Zardzewiały Winchester', type:'left_arm', level:60, price:3900, image:'/images/items/left_arm/winchester_rusty.png?1', image_mini:'/images/items/left_arm/mini/winchester_rusty.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:15, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:160, damage_max:252}};
	PK_S3.items[129] = {item_id:129, nshort:'winchester_normal', name:'Winchester', type:'left_arm', level:75, price:7600, image:'/images/items/left_arm/winchester_normal.png?1', image_mini:'/images/items/left_arm/mini/winchester_normal.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:15, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:180, damage_max:280}};
    PK_S3.items[130] = {item_id:130, nshort:'winchester_best', name:'Precyzyjny Winchester', type:'left_arm', level:78, price:15400, image:'/images/items/left_arm/winchester_best.png?1', image_mini:'/images/items/left_arm/mini/winchester_best.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:15, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:200, damage_max:312}};
	
	PK_S3.items[132] = {item_id:132, nshort:'bear', name:'Niedźwiedź', type:'left_arm', level:45, price:2600, image:'/images/items/left_arm/bear.png?1', image_mini:'/images/items/left_arm/mini/bear.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_sleeper', name:'Śpioszek'}, auctionable:true, dropable:true, tradeable:false, sellable:true, damage:{damage_min:0, damage_max:1}};
    PK_S3.items[133] = {item_id:133, nshort:'muzzleloader_bowie', name:'Pistolet odprzodowy Bowie\'ego', type:'left_arm', level:30, price:1480, image:'/images/items/left_arm/muzzleloader_bowie.png?1', image_mini:'/images/items/left_arm/mini/muzzleloader_bowie.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:true, tradeable:false, sellable:true, damage:{damage_min:145, damage_max:155}};
	PK_S3.items[134] = {item_id:134, nshort:'golden_rifle', name:'Podrobiona złota strzelba', type:'left_arm', level:75, price:11480, image:'/images/items/left_arm/golden_rifle.png?1', image_mini:'/images/items/left_arm/mini/golden_rifle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true, damage:{damage_min:192, damage_max:308}};
	PK_S3.items[135] = {item_id:135, nshort:'elephantgun', name:'Strzelba na słonie', type:'left_arm', level:40, price:12480, image:'/images/items/left_arm/elephantgun.png?1', image_mini:'/images/items/left_arm/mini/elephantgun.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true, damage:{damage_min:1, damage_max:400}};
    PK_S3.items[136] = {item_id:136, nshort:'golden_rifle', name:'Złota strzelba', type:'left_arm', level:75, price:65480, image:'/images/items/left_arm/golden_rifle.png?1', image_mini:'/images/items/left_arm/mini/golden_rifle.png?1', bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{offense:3, defense:3}, fortbattlesector:{damage:15, offense:2, defense:2}}, set:{key:'gold_set', name:'Złoty komplet'}, auctionable:false, dropable:false, tradeable:false, sellable:true, damage:{damage_min:232, damage_max:348}};
    PK_S3.items[137] = {item_id:137, nshort:'deathsythe', name:'Kosa Śmierci', type:'left_arm', level:50, price:17400, image:'/images/items/left_arm/deathsythe.png?1', image_mini:'/images/items/left_arm/mini/deathsythe.png?1', bonus:{skills:{}, attributes:{charisma:1, dexterity:1, flexibility:1, strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{key:'season_set', name:'Zestaw świąteczny'}, auctionable:false, dropable:false, tradeable:false, sellable:true, damage:{damage_min:42, damage_max:158}};
	
	PK_S3.items[139] = {item_id:139, nshort:'high_wall', name:'Winchester 1885 High Wall', type:'left_arm', level:70, price:13400, image:'/images/items/left_arm/high_wall.png?1', image_mini:'/images/items/left_arm/mini/high_wall.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:100, auctionable:true, tradeable:true, sellable:true, damage:{damage_min:200, damage_max:400}};
	PK_S3.items[140] = {item_id:140, nshort:'collector_rifle', name:'Strzelba kolekcjonera', type:'left_arm', level:100, price:10000, image:'/images/items/left_arm/collector_rifle.png?1', image_mini:'/images/items/left_arm/mini/collector_rifle.png?1', bonus:{skills:{repair:15, health:15}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'collector_set', name:'Zestaw kolekcjonera'}, traderlevel:100, auctionable:false, dropable:false, tradeable:true, sellable:false, damage:{damage_min:100, damage_max:300}};
	
/* --------------------------------------- NAKRYCIA GŁOWY --------------------------------------- */
    PK_S3.items[200] = {item_id:200, nshort:'band_red', name:'Czerwona opaska na czoło', type:'head', level:1, price:4, image:'/images/items/head/band_red.png?1', image_mini:'/images/items/head/mini/band_red.png?1', bonus:{skills:{trade:1, tough:1}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[201] = {item_id:201, nshort:'band_green', name:'Zielona opaska na czoło', type:'head', level:2, price:4, image:'/images/items/head/band_green.png?1', image_mini:'/images/items/head/mini/band_green.png?1', bonus:{skills:{trade:1, dodge:1}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[202] = {item_id:202, nshort:'band_blue', name:'Niebieska opaska na czoło', type:'head', level:2, price:4, image:'/images/items/head/band_blue.png?1', image_mini:'/images/items/head/mini/band_blue.png?1', bonus:{skills:{trade:1, finger_dexterity:1}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[203] = {item_id:203, nshort:'band_yellow', name:'Żółta opaska na czoło', type:'head', level:2, price:4, image:'/images/items/head/band_yellow.png?1', image_mini:'/images/items/head/mini/band_yellow.png?1', bonus:{skills:{trade:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[204] = {item_id:204, nshort:'band_brown', name:'Brązowa opaska na czoło', type:'head', level:3, price:18, image:'/images/items/head/band_brown.png?1', image_mini:'/images/items/head/mini/band_brown.png?1', bonus:{skills:{trade:1, swim:1, health:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[205] = {item_id:205, nshort:'band_black', name:'Czarna opaska na czoło', type:'head', level:3, price:18, image:'/images/items/head/band_black.png?1', image_mini:'/images/items/head/mini/band_black.png?1', bonus:{skills:{trade:2, repair:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[206] = {item_id:206, nshort:'slouch_cap_grey', name:'Szara czapeczka z daszkiem', type:'head', level:3, price:46, image:'/images/items/head/slouch_cap_grey.png?1', image_mini:'/images/items/head/mini/slouch_cap_grey.png?1', bonus:{skills:{tough:5}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[207] = {item_id:207, nshort:'slouch_cap_brown', name:'Brązowa czapeczka z daszkiem', type:'head', level:5, price:112, image:'/images/items/head/slouch_cap_brown.png?1', image_mini:'/images/items/head/mini/slouch_cap_brown.png?1', bonus:{skills:{ride:3, tough:6}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[208] = {item_id:208, nshort:'slouch_cap_black', name:'Czarna czapeczka z daszkiem', type:'head', level:5, price:112, image:'/images/items/head/slouch_cap_black.png?1', image_mini:'/images/items/head/mini/slouch_cap_black.png?1', bonus:{skills:{leadership:3, pitfall:3, tough:3}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[209] = {item_id:209, nshort:'slouch_cap_fine', name:'Szlachecka czapeczka z daszkiem', type:'head', level:6, price:520, image:'/images/items/head/slouch_cap_fine.png?1', image_mini:'/images/items/head/mini/slouch_cap_fine.png?1', bonus:{skills:{tactic:4, aim:4, reflex:4, tough:6}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[210] = {item_id:210, nshort:'cap_grey', name:'Szara czapka', type:'head', level:4, price:90, image:'/images/items/head/cap_grey.png?1', image_mini:'/images/items/head/mini/cap_grey.png?1', bonus:{skills:{swim:8}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[211] = {item_id:211, nshort:'cap_red', name:'Czerwona czapka', type:'head', level:5, price:175, image:'/images/items/head/cap_red.png?1', image_mini:'/images/items/head/mini/cap_red.png?1', bonus:{skills:{swim:6, endurance:5}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[212] = {item_id:212, nshort:'cap_green', name:'Zielona czapka', type:'head', level:5, price:175, image:'/images/items/head/cap_green.png?1', image_mini:'/images/items/head/mini/cap_green.png?1', bonus:{skills:{swim:6}, attributes:{flexibility:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[213] = {item_id:213, nshort:'cap_blue', name:'Niebieska czapka', type:'head', level:5, price:175, image:'/images/items/head/cap_blue.png?1', image_mini:'/images/items/head/mini/cap_blue.png?1', bonus:{skills:{pitfall:5, swim:6}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[214] = {item_id:214, nshort:'cap_yellow', name:'Żółta czapka', type:'head', level:5, price:175, image:'/images/items/head/cap_yellow.png?1', image_mini:'/images/items/head/mini/cap_yellow.png?1', bonus:{skills:{appearance:5, swim:6}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[215] = {item_id:215, nshort:'cap_brown', name:'Brązowa czapka', type:'head', level:6, price:300, image:'/images/items/head/cap_brown.png?1', image_mini:'/images/items/head/mini/cap_brown.png?1', bonus:{skills:{swim:10, tough:4}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[216] = {item_id:216, nshort:'cap_black', name:'Czarna czapka', type:'head', level:6, price:300, image:'/images/items/head/cap_black.png?1', image_mini:'/images/items/head/mini/cap_black.png?1', bonus:{skills:{tactic:4, finger_dexterity:4, swim:6}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[217] = {item_id:217, nshort:'cap_fine', name:'Szlachecka czapka', type:'head', level:8, price:1100, image:'/images/items/head/cap_fine.png?1', image_mini:'/images/items/head/mini/cap_fine.png?1', bonus:{skills:{animal:5, shot:5, swim:10, tough:5}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[218] = {item_id:218, nshort:'slouch_hat_grey', name:'Szary kapelusz ', type:'head', level:7, price:220, image:'/images/items/head/slouch_hat_grey.png?1', image_mini:'/images/items/head/mini/slouch_hat_grey.png?1', bonus:{skills:{pitfall:12}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[219] = {item_id:219, nshort:'slouch_hat_brown', name:'Brązowy kapelusz ', type:'head', level:9, price:520, image:'/images/items/head/slouch_hat_brown.png?1', image_mini:'/images/items/head/mini/slouch_hat_brown.png?1', bonus:{skills:{pitfall:9, dodge:4, punch:5}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_farmer', name:'Komplet Farmera'}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[220] = {item_id:220, nshort:'slouch_hat_black', name:'Czarny kapelusz ', type:'head', level:9, price:520, image:'/images/items/head/slouch_hat_black.png?1', image_mini:'/images/items/head/mini/slouch_hat_black.png?1', bonus:{skills:{tactic:4, pitfall:9}, attributes:{dexterity:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[221] = {item_id:221, nshort:'slouch_hat_fine', name:'Szlachecki kapelusz ', type:'head', level:12, price:1920, image:'/images/items/head/slouch_hat_fine.png?1', image_mini:'/images/items/head/mini/slouch_hat_fine.png?1', bonus:{skills:{leadership:6, pitfall:10, reflex:6, endurance:6}, attributes:{dexterity:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[222] = {item_id:222, nshort:'bowler_grey', name:'Szary melonik', type:'head', level:10, price:420, image:'/images/items/head/bowler_grey.png?1', image_mini:'/images/items/head/mini/bowler_grey.png?1', bonus:{skills:{trade:11}, attributes:{charisma:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[223] = {item_id:223, nshort:'bowler_brown', name:'Brązowy melonik', type:'head', level:12, price:808, image:'/images/items/head/bowler_brown.png?1', image_mini:'/images/items/head/mini/bowler_brown.png?1', bonus:{skills:{trade:11, reflex:5, build:6}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[224] = {item_id:224, nshort:'bowler_black', name:'Czarny melonik', type:'head', level:12, price:808, image:'/images/items/head/bowler_black.png?1', image_mini:'/images/items/head/mini/bowler_black.png?1', bonus:{skills:{trade:11, shot:6}, attributes:{charisma:1}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_quackery', name:'Komplet Konowała'}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[225] = {item_id:225, nshort:'bowler_fine', name:'Szlachecki melonik', type:'head', level:15, price:1850, image:'/images/items/head/bowler_fine.png?1', image_mini:'/images/items/head/mini/bowler_fine.png?1', bonus:{skills:{trade:11, repair:5, ride:5, tough:6}, attributes:{charisma:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[226] = {item_id:226, nshort:'cloth_hat_grey', name:'Szary materiałowy kapelusz ', type:'head', level:14, price:655, image:'/images/items/head/cloth_hat_grey.png?1', image_mini:'/images/items/head/mini/cloth_hat_grey.png?1', bonus:{skills:{aim:10, health:10}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[227] = {item_id:227, nshort:'cloth_hat_brown', name:'Brązowy materiałowy kapelusz ', type:'head', level:20, price:1270, image:'/images/items/head/cloth_hat_brown.png?1', image_mini:'/images/items/head/mini/cloth_hat_brown.png?1', bonus:{skills:{aim:7, swim:7, health:13}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[228] = {item_id:228, nshort:'cloth_hat_black', name:'Czarny materiałowy kapelusz ', type:'head', level:20, price:1270, image:'/images/items/head/cloth_hat_black.png?1', image_mini:'/images/items/head/mini/cloth_hat_black.png?1', bonus:{skills:{appearance:7, aim:13, health:7}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[229] = {item_id:229, nshort:'cloth_hat_fine', name:'Szlachecki materiałowy kapelusz ', type:'head', level:22, price:3900, image:'/images/items/head/cloth_hat_fine.png?1', image_mini:'/images/items/head/mini/cloth_hat_fine.png?1', bonus:{skills:{tactic:8, aim:9, dodge:8, health:9}, attributes:{dexterity:1, strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[230] = {item_id:230, nshort:'cylinder_grey', name:'Szary cylinder', type:'head', level:18, price:1270, image:'/images/items/head/cylinder_grey.png?1', image_mini:'/images/items/head/mini/cylinder_grey.png?1', bonus:{skills:{leadership:14, finger_dexterity:13}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[231] = {item_id:231, nshort:'cylinder_red', name:'Czerwony cylinder', type:'head', level:24, price:1900, image:'/images/items/head/cylinder_red.png?1', image_mini:'/images/items/head/mini/cylinder_red.png?1', bonus:{skills:{leadership:10, finger_dexterity:9, punch:8}, attributes:{strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[232] = {item_id:232, nshort:'cylinder_green', name:'Zielony cylinder', type:'head', level:24, price:1900, image:'/images/items/head/cylinder_green.png?1', image_mini:'/images/items/head/mini/cylinder_green.png?1', bonus:{skills:{leadership:10, finger_dexterity:9, hide:8}, attributes:{flexibility:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[233] = {item_id:233, nshort:'cylinder_blue', name:'Niebieski cylinder', type:'head', level:24, price:1900, image:'/images/items/head/cylinder_blue.png?1', image_mini:'/images/items/head/mini/cylinder_blue.png?1', bonus:{skills:{leadership:10, finger_dexterity:12}, attributes:{dexterity:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[234] = {item_id:234, nshort:'cylinder_yellow', name:'Żółty cylinder', type:'head', level:24, price:1900, image:'/images/items/head/cylinder_yellow.png?1', image_mini:'/images/items/head/mini/cylinder_yellow.png?1', bonus:{skills:{leadership:13, finger_dexterity:9}, attributes:{charisma:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[235] = {item_id:235, nshort:'cylinder_brown', name:'Brązowy cylinder', type:'head', level:25, price:2700, image:'/images/items/head/cylinder_brown.png?1', image_mini:'/images/items/head/mini/cylinder_brown.png?1', bonus:{skills:{leadership:10, finger_dexterity:9, ride:9, health:8}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_gentleman', name:'Komplet Dżentelmena'}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[236] = {item_id:236, nshort:'cylinder_black', name:'Czarny cylinder', type:'head', level:25, price:2700, image:'/images/items/head/cylinder_black.png?1', image_mini:'/images/items/head/mini/cylinder_black.png?1', bonus:{skills:{leadership:13, finger_dexterity:13}, attributes:{charisma:1, dexterity:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[237] = {item_id:237, nshort:'cylinder_fine', name:'Cylinder Lincolna', type:'head', level:27, price:5400, image:'/images/items/head/cylinder_fine.png?1', image_mini:'/images/items/head/mini/cylinder_fine.png?1', bonus:{skills:{leadership:13, finger_dexterity:12, ride:8, build:9}, attributes:{charisma:1, dexterity:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[238] = {item_id:238, nshort:'leather_hat_grey', name:'Szary skórzany kapelusz', type:'head', level:24, price:2000, image:'/images/items/head/leather_hat_grey.png?1', image_mini:'/images/items/head/mini/leather_hat_grey.png?1', bonus:{skills:{animal:11, reflex:12}, attributes:{charisma:1, flexibility:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[239] = {item_id:239, nshort:'leather_hat_brown', name:'Brązowy skórzany kapelusz', type:'head', level:28, price:3500, image:'/images/items/head/leather_hat_brown.png?1', image_mini:'/images/items/head/mini/leather_hat_brown.png?1', bonus:{skills:{animal:11, reflex:12, punch:10}, attributes:{flexibility:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[240] = {item_id:240, nshort:'leather_hat_black', name:'Czarny skórzany kapelusz', type:'head', level:28, price:3500, image:'/images/items/head/leather_hat_black.png?1', image_mini:'/images/items/head/mini/leather_hat_black.png?1', bonus:{skills:{animal:11, repair:10, reflex:12}, attributes:{charisma:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[241] = {item_id:241, nshort:'leather_hat_fine', name:'Szlachecki skórzany kapelusz', type:'head', level:30, price:4100, image:'/images/items/head/leather_hat_fine.png?1', image_mini:'/images/items/head/mini/leather_hat_fine.png?1', bonus:{skills:{animal:14, aim:8, reflex:15, tough:9}, attributes:{charisma:1, flexibility:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[242] = {item_id:242, nshort:'stetson_grey', name:'Szary Stetson', type:'head', level:30, price:2555, image:'/images/items/head/stetson_grey.png?1', image_mini:'/images/items/head/mini/stetson_grey.png?1', bonus:{skills:{finger_dexterity:14, health:13}, attributes:{dexterity:1, strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[243] = {item_id:243, nshort:'stetson_brown', name:'Brązowy Stetson', type:'head', level:33, price:4500, image:'/images/items/head/stetson_brown.png?1', image_mini:'/images/items/head/mini/stetson_brown.png?1', bonus:{skills:{finger_dexterity:13, dodge:12, health:13}, attributes:{strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[244] = {item_id:244, nshort:'stetson_black', name:'Czarny Stetson', type:'head', level:33, price:4500, image:'/images/items/head/stetson_black.png?1', image_mini:'/images/items/head/mini/stetson_black.png?1', bonus:{skills:{leadership:12, finger_dexterity:13, health:13}, attributes:{dexterity:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[245] = {item_id:245, nshort:'stetson_fine', name:'Szlachecki Stetson', type:'head', level:36, price:7100, image:'/images/items/head/stetson_fine.png?1', image_mini:'/images/items/head/mini/stetson_fine.png?1', bonus:{skills:{trade:9, finger_dexterity:16, swim:8, health:16}, attributes:{dexterity:1, strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[246] = {item_id:246, nshort:'xmas_hat', name:'Czapka bożonarodzeniowa', type:'head', level:1, price:50, image:'/images/items/head/xmas_hat.png?1', image_mini:'/images/items/head/mini/xmas_hat.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[247] = {item_id:247, nshort:'southcap', name:'Czapka armii', type:'head', level:20, price:800, image:'/images/items/head/southcap.png?1', image_mini:'/images/items/head/mini/southcap.png?1', characterClass:'soldier', bonus:{skills:{pitfall:5, punch:11}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[248] = {item_id:248, nshort:'adventurerhat', name:'Kapelusz poszukiwacza przygód', type:'head', level:22, price:2980, image:'/images/items/head/adventurerhat.png?1', image_mini:'/images/items/head/mini/adventurerhat.png?1', characterClass:'adventurer', bonus:{skills:{hide:6, ride:8, tough:10}, attributes:{dexterity:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[249] = {item_id:249, nshort:'fedora_black', name:'Czarny kapelusz filcowy', type:'head', level:22, price:1700, image:'/images/items/head/fedora_black.png?1', image_mini:'/images/items/head/mini/fedora_black.png?1', characterClass:'duelist', bonus:{skills:{shot:10, aim:6}, attributes:{charisma:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[250] = {item_id:250, nshort:'feather_hat_brown', name:'Brązowy kapelusz z piór', type:'head', level:18, price:1460, image:'/images/items/head/feather_hat_brown.png?1', image_mini:'/images/items/head/mini/feather_hat_brown.png?1', characterClass:'worker', bonus:{skills:{dodge:5, reflex:4, endurance:3, tough:2}, attributes:{flexibility:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};

    PK_S3.items[253] = {item_id:253, nshort:'indian_hat', name:'Indiański pióropusz', type:'head', level:51, price:3200, image:'/images/items/head/indian_hat.png?1', image_mini:'/images/items/head/mini/indian_hat.png?1', bonus:{skills:{appearance:11, leadership:12}, attributes:{charisma:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_indian', name:'Komplet Indianina'}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[254] = {item_id:254, nshort:'mexican_sombrero', name:'Sombrero', type:'head', level:30, price:1270, image:'/images/items/head/mexican_sombrero.png?1', image_mini:'/images/items/head/mini/mexican_sombrero.png?1', bonus:{skills:{shot:6, health:6, tough:10}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_mexican', name:'Komplet Meksykanina'}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[256] = {item_id:256, nshort:'pilger_cap', name:'Czapka pielgrzyma', type:'head', level:37, price:1270, image:'/images/items/head/pilger_cap.png?1', image_mini:'/images/items/head/mini/pilger_cap.png?1', characterSex:'female', bonus:{skills:{leadership:6, repair:6, endurance:10}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_pilgrim_female', name:'Komplet Pielgrzyma(damski)'}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[257] = {item_id:257, nshort:'pilger_hat', name:'Kapelusz pielgrzyma', type:'head', level:37, price:1270, image:'/images/items/head/pilger_hat.png?1', image_mini:'/images/items/head/mini/pilger_hat.png?1', characterSex:'male', bonus:{skills:{trade:6, repair:6, health:10}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_pilgrim_male', name:'Komplet Pielgrzyma'}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[258] = {item_id:258, nshort:'cylinder_xmas', name:'Kapelusz bałwana', type:'head', level:30, price:2412, image:'/images/items/head/cylinder_xmas.png?1', image_mini:'/images/items/head/mini/cylinder_xmas.png?1', bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'season_set', name:'Zestaw świąteczny'}, traderlevel:100, auctionable:false, dropable:false, tradeable:true, sellable:true};
	PK_S3.items[259] = {item_id:259, nshort:'dancer_hat', name:'Pióro we włosach', type:'head', level:42, price:2500, image:'/images/items/head/dancer_hat.png?1', image_mini:'/images/items/head/mini/dancer_hat.png?1', characterSex:'female', bonus:{skills:{tactic:10, pitfall:8, aim:9}, attributes:{flexibility:1}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_dancer', name:'Komplet Tancerki'}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[261] = {item_id:261, nshort:'sleep_cap', name:'Szlafmyca', type:'head', level:45, price:1200, image:'/images/items/head/sleep_cap.png?1', image_mini:'/images/items/head/mini/sleep_cap.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_sleeper', name:'Śpioszek'}, auctionable:true, dropable:true, tradeable:false, sellable:true};
    PK_S3.items[262] = {item_id:262, nshort:'greenhorn_hat', name:'Znaleziony kapelusz', type:'head', level:4, price:515, image:'/images/items/head/greenhorn_hat.png?1', image_mini:'/images/items/head/mini/greenhorn_hat.png?1', bonus:{skills:{trade:3, tactic:3, pitfall:2}, attributes:{flexibility:1}, fortbattle:{}, fortbattlesector:{}}, set:{key:'greenhorn_set', name:'Zestaw nowicjusza'}, auctionable:false, dropable:false, tradeable:false, sellable:true};

    PK_S3.items[264] = {item_id:264, nshort:'collector_hat', name:'Kapelusz kolekcjonera', type:'head', level:100, price:10000, image:'/images/items/head/collector_hat.png?1', image_mini:'/images/items/head/mini/collector_hat.png?1', bonus:{skills:{finger_dexterity:15, endurance:15}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'collector_set', name:'Zestaw kolekcjonera'}, traderlevel:66, auctionable:false, dropable:false, tradeable:true, sellable:false};
	PK_S3.items[265] = {item_id:265, nshort:'bunny_hat', name:'Uszy zajączka', type:'head', level:1, price:0, image:'/images/items/head/bunny_hat.png?1', image_mini:'/images/items/head/mini/bunny_hat.png?1', bonus:{skills:{animal:2}, attributes:{flexibility:1}, fortbattle:{}, fortbattlesector:{}}, set:{key:'bunny_set', name:'Zestaw zajączka wielkanocnego'}, traderlevel:66, tradeable:true};
	
	PK_S3.items[299] = {item_id:299, nshort:'band_grey', name:'Szara opaska na czoło', type:'head', level:1, price:2, image:'/images/items/head/band_grey.png?1', image_mini:'/images/items/head/mini/band_grey.png?1', bonus:{skills:{trade:1}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
/* --------------------------------------- ODZIEŻ --------------------------------------- */
    PK_S3.items[300] = {item_id:300, nshort:'tatter_grey', name:'Szara koszula', type:'body', level:1, price:2, image:'/images/items/body/tatter_grey.png?1', image_mini:'/images/items/body/mini/tatter_grey.png?1', bonus:{skills:{pitfall:1}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[301] = {item_id:301, nshort:'tatter_red', name:'Czerwona koszula', type:'body', level:1, price:12, image:'/images/items/body/tatter_red.png?1', image_mini:'/images/items/body/mini/tatter_red.png?1', bonus:{skills:{pitfall:1, build:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[302] = {item_id:302, nshort:'tatter_green', name:'Zielona koszula', type:'body', level:1, price:12, image:'/images/items/body/tatter_green.png?1', image_mini:'/images/items/body/mini/tatter_green.png?1', bonus:{skills:{pitfall:1, ride:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[303] = {item_id:303, nshort:'tatter_blue', name:'Niebieska koszula', type:'body', level:1, price:12, image:'/images/items/body/tatter_blue.png?1', image_mini:'/images/items/body/mini/tatter_blue.png?1', bonus:{skills:{pitfall:3}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[304] = {item_id:304, nshort:'tatter_yellow', name:'Żółta koszula', type:'body', level:1, price:12, image:'/images/items/body/tatter_yellow.png?1', image_mini:'/images/items/body/mini/tatter_yellow.png?1', bonus:{skills:{leadership:2, pitfall:1}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[305] = {item_id:305, nshort:'tatter_brown', name:'Brązowa koszula', type:'body', level:2, price:38, image:'/images/items/body/tatter_brown.png?1', image_mini:'/images/items/body/mini/tatter_brown.png?1', bonus:{skills:{pitfall:1, reflex:2, punch:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[306] = {item_id:306, nshort:'tatter_black', name:'Czarna koszula', type:'body', level:2, price:38, image:'/images/items/body/tatter_black.png?1', image_mini:'/images/items/body/mini/tatter_black.png?1', bonus:{skills:{tactic:2, pitfall:3}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[307] = {item_id:307, nshort:'poncho_grey', name:'Szare poncho', type:'body', level:3, price:38, image:'/images/items/body/poncho_grey.png?1', image_mini:'/images/items/body/mini/poncho_grey.png?1', bonus:{skills:{dodge:5}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[308] = {item_id:308, nshort:'poncho_red', name:'Czerwone poncho', type:'body', level:4, price:80, image:'/images/items/body/poncho_red.png?1', image_mini:'/images/items/body/mini/poncho_red.png?1', bonus:{skills:{dodge:3, tough:4}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[309] = {item_id:309, nshort:'poncho_green', name:'Zielone poncho', type:'body', level:4, price:80, image:'/images/items/body/poncho_green.png?1', image_mini:'/images/items/body/mini/poncho_green.png?1', bonus:{skills:{dodge:7}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[310] = {item_id:310, nshort:'poncho_blue', name:'Niebieskie poncho', type:'body', level:4, price:80, image:'/images/items/body/poncho_blue.png?1', image_mini:'/images/items/body/mini/poncho_blue.png?1', bonus:{skills:{aim:4, dodge:3}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[311] = {item_id:311, nshort:'poncho_yellow', name:'Żółte poncho', type:'body', level:4, price:80, image:'/images/items/body/poncho_yellow.png?1', image_mini:'/images/items/body/mini/poncho_yellow.png?1', bonus:{skills:{trade:4, dodge:3}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[312] = {item_id:312, nshort:'poncho_brown', name:'Brązowe poncho', type:'body', level:5, price:174, image:'/images/items/body/poncho_brown.png?1', image_mini:'/images/items/body/mini/poncho_brown.png?1', bonus:{skills:{dodge:6, endurance:4}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_mexican', name:'Komplet Meksykanina'}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[313] = {item_id:313, nshort:'poncho_black', name:'Czarne poncho', type:'body', level:5, price:174, image:'/images/items/body/poncho_black.png?1', image_mini:'/images/items/body/mini/poncho_black.png?1', bonus:{skills:{animal:4, shot:3, dodge:3}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[314] = {item_id:314, nshort:'poncho_fine', name:'Poncho Clinta', type:'body', level:6, price:800, image:'/images/items/body/poncho_fine.png?1', image_mini:'/images/items/body/mini/poncho_fine.png?1', bonus:{skills:{appearance:4, pitfall:4, dodge:7, build:5}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[315] = {item_id:315, nshort:'clothes_grey', name:'Szare ubranie', type:'body', level:7, price:138, image:'/images/items/body/clothes_grey.png?1', image_mini:'/images/items/body/mini/clothes_grey.png?1', bonus:{skills:{leadership:9}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[316] = {item_id:316, nshort:'clothes_red', name:'Czerwone ubranie', type:'body', level:8, price:260, image:'/images/items/body/clothes_red.png?1', image_mini:'/images/items/body/mini/clothes_red.png?1', bonus:{skills:{leadership:6, health:6}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[317] = {item_id:317, nshort:'clothes_green', name:'Zielone ubranie', type:'body', level:14, price:260, image:'/images/items/body/clothes_green.png?1', image_mini:'/images/items/body/mini/clothes_green.png?1', bonus:{skills:{leadership:6, hide:6}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[318] = {item_id:318, nshort:'clothes_blue', name:'Niebieskie ubranie', type:'body', level:8, price:260, image:'/images/items/body/clothes_blue.png?1', image_mini:'/images/items/body/mini/clothes_blue.png?1', bonus:{skills:{leadership:6, finger_dexterity:6}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[319] = {item_id:319, nshort:'clothes_yellow', name:'Żółte ubranie', type:'body', level:8, price:260, image:'/images/items/body/clothes_yellow.png?1', image_mini:'/images/items/body/mini/clothes_yellow.png?1', bonus:{skills:{leadership:7}, attributes:{charisma:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[320] = {item_id:320, nshort:'clothes_brown', name:'Brązowe ubranie', type:'body', level:8, price:425, image:'/images/items/body/clothes_brown.png?1', image_mini:'/images/items/body/mini/clothes_brown.png?1', bonus:{skills:{leadership:6, swim:5, build:4}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[321] = {item_id:321, nshort:'clothes_black', name:'Czarne ubranie', type:'body', level:8, price:425, image:'/images/items/body/clothes_black.png?1', image_mini:'/images/items/body/mini/clothes_black.png?1', bonus:{skills:{leadership:10, repair:5}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_farmer', name:'Komplet Farmera'}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[322] = {item_id:322, nshort:'clothes_fine', name:'Ubranie świąteczne', type:'body', level:10, price:1650, image:'/images/items/body/clothes_fine.png?1', image_mini:'/images/items/body/mini/clothes_fine.png?1', bonus:{skills:{leadership:6, finger_dexterity:5, reflex:6, endurance:6}, attributes:{charisma:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[323] = {item_id:323, nshort:'shirt_grey', name:'Rozpinana szara koszula', type:'body', level:12, price:310, image:'/images/items/body/shirt_grey.png?1', image_mini:'/images/items/body/mini/shirt_grey.png?1', bonus:{skills:{appearance:13}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[324] = {item_id:324, nshort:'shirt_red', name:'Rozpinana czerwona koszula', type:'body', level:13, price:560, image:'/images/items/body/shirt_red.png?1', image_mini:'/images/items/body/mini/shirt_red.png?1', bonus:{skills:{appearance:9, health:8}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[325] = {item_id:325, nshort:'shirt_green', name:'Rozpinana zielona koszula', type:'body', level:13, price:560, image:'/images/items/body/shirt_green.png?1', image_mini:'/images/items/body/mini/shirt_green.png?1', bonus:{skills:{appearance:9, ride:8}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[326] = {item_id:326, nshort:'shirt_blue', name:'Rozpinana niebieska koszula', type:'body', level:13, price:560, image:'/images/items/body/shirt_blue.png?1', image_mini:'/images/items/body/mini/shirt_blue.png?1', bonus:{skills:{appearance:9, aim:8}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[327] = {item_id:327, nshort:'shirt_yellow', name:'Rozpinana żółta koszula', type:'body', level:13, price:560, image:'/images/items/body/shirt_yellow.png?1', image_mini:'/images/items/body/mini/shirt_yellow.png?1', bonus:{skills:{appearance:13}, attributes:{charisma:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[328] = {item_id:328, nshort:'shirt_brown', name:'Rozpinana brązowa koszula', type:'body', level:14, price:800, image:'/images/items/body/shirt_brown.png?1', image_mini:'/images/items/body/mini/shirt_brown.png?1', bonus:{skills:{appearance:9, reflex:6, endurance:5}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[329] = {item_id:329, nshort:'shirt_black', name:'Rozpinana czarna koszula', type:'body', level:14, price:800, image:'/images/items/body/shirt_black.png?1', image_mini:'/images/items/body/mini/shirt_black.png?1', bonus:{skills:{appearance:9, pitfall:6}, attributes:{charisma:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[330] = {item_id:330, nshort:'shirt_fine', name:'Szlachecka koszula', type:'body', level:15, price:1305, image:'/images/items/body/shirt_fine.png?1', image_mini:'/images/items/body/mini/shirt_fine.png?1', bonus:{skills:{appearance:10, shot:7, ride:7, punch:6}, attributes:{charisma:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[331] = {item_id:331, nshort:'plaid_shirt_grey', name:'Szara koszula w kratę', type:'body', level:15, price:560, image:'/images/items/body/plaid_shirt_grey.png?1', image_mini:'/images/items/body/mini/plaid_shirt_grey.png?1', bonus:{skills:{punch:12}, attributes:{strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[332] = {item_id:332, nshort:'plaid_shirt_red', name:'Czerwona koszula w kratę', type:'body', level:16, price:800, image:'/images/items/body/plaid_shirt_red.png?1', image_mini:'/images/items/body/mini/plaid_shirt_red.png?1', bonus:{skills:{punch:15}, attributes:{strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[333] = {item_id:333, nshort:'plaid_shirt_green', name:'Zielona koszula w kratę', type:'body', level:16, price:800, image:'/images/items/body/plaid_shirt_green.png?1', image_mini:'/images/items/body/mini/plaid_shirt_green.png?1', bonus:{skills:{swim:9, punch:11}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[334] = {item_id:334, nshort:'plaid_shirt_blue', name:'Niebieska koszula w kratę', type:'body', level:16, price:800, image:'/images/items/body/plaid_shirt_blue.png?1', image_mini:'/images/items/body/mini/plaid_shirt_blue.png?1', bonus:{skills:{shot:9, punch:11}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[335] = {item_id:335, nshort:'plaid_shirt_yellow', name:'Żółta koszula w kratę', type:'body', level:16, price:800, image:'/images/items/body/plaid_shirt_yellow.png?1', image_mini:'/images/items/body/mini/plaid_shirt_yellow.png?1', bonus:{skills:{tactic:9, punch:11}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[336] = {item_id:336, nshort:'plaid_shirt_brown', name:'Brązowa koszula w kratę', type:'body', level:17, price:1200, image:'/images/items/body/plaid_shirt_brown.png?1', image_mini:'/images/items/body/mini/plaid_shirt_brown.png?1', bonus:{skills:{ride:7, punch:12}, attributes:{strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[337] = {item_id:337, nshort:'plaid_shirt_black', name:'Czarna koszula w kratę', type:'body', level:17, price:1200, image:'/images/items/body/plaid_shirt_black.png?1', image_mini:'/images/items/body/mini/plaid_shirt_black.png?1', bonus:{skills:{tactic:7, repair:6, punch:11}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[338] = {item_id:338, nshort:'plaid_shirt_fine', name:'Koszula drwala', type:'body', level:19, price:3900, image:'/images/items/body/plaid_shirt_fine.png?1', image_mini:'/images/items/body/mini/plaid_shirt_fine.png?1', bonus:{skills:{animal:8, pitfall:7, hide:8, punch:13}, attributes:{strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[339] = {item_id:339, nshort:'vest_grey', name:'Szara kamizelka', type:'body', level:16, price:900, image:'/images/items/body/vest_grey.png?1', image_mini:'/images/items/body/mini/vest_grey.png?1', bonus:{skills:{shot:10, reflex:11}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[340] = {item_id:340, nshort:'vest_brown', name:'Brązowa kamizelka', type:'body', level:20, price:1800, image:'/images/items/body/vest_brown.png?1', image_mini:'/images/items/body/mini/vest_brown.png?1', bonus:{skills:{shot:7, reflex:9, health:8}, attributes:{flexibility:1}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_quackery', name:'Komplet Konowała'}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[341] = {item_id:341, nshort:'vest_black', name:'Czarna kamizelka', type:'body', level:20, price:1800, image:'/images/items/body/vest_black.png?1', image_mini:'/images/items/body/mini/vest_black.png?1', bonus:{skills:{leadership:8, shot:9, reflex:7}, attributes:{dexterity:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[342] = {item_id:342, nshort:'vest_fine', name:'Szlachecka kamizelka', type:'body', level:20, price:5200, image:'/images/items/body/vest_fine.png?1', image_mini:'/images/items/body/mini/vest_fine.png?1', bonus:{skills:{trade:8, shot:10, reflex:10, endurance:9}, attributes:{dexterity:1, flexibility:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[343] = {item_id:343, nshort:'coat_grey', name:'Szara kurtka z materiału', type:'body', level:20, price:1300, image:'/images/items/body/coat_grey.png?1', image_mini:'/images/items/body/mini/coat_grey.png?1', bonus:{skills:{pitfall:12, build:13}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[344] = {item_id:344, nshort:'coat_red', name:'Czerwona kurtka z materiału', type:'body', level:20, price:2000, image:'/images/items/body/coat_red.png?1', image_mini:'/images/items/body/mini/coat_red.png?1', bonus:{skills:{pitfall:8, build:12}, attributes:{strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[345] = {item_id:345, nshort:'coat_green', name:'Zielona kurtka z materiału', type:'body', level:20, price:2000, image:'/images/items/body/coat_green.png?1', image_mini:'/images/items/body/mini/coat_green.png?1', bonus:{skills:{pitfall:8, hide:8, build:9}, attributes:{flexibility:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[346] = {item_id:346, nshort:'coat_blue', name:'Niebieska kurtka z materiału', type:'body', level:20, price:2000, image:'/images/items/body/coat_blue.png?1', image_mini:'/images/items/body/mini/coat_blue.png?1', bonus:{skills:{pitfall:11, build:9}, attributes:{dexterity:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[347] = {item_id:347, nshort:'coat_yellow', name:'Żółta kurtka z materiału', type:'body', level:20, price:2000, image:'/images/items/body/coat_yellow.png?1', image_mini:'/images/items/body/mini/coat_yellow.png?1', bonus:{skills:{leadership:8, pitfall:8, build:9}, attributes:{charisma:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[348] = {item_id:348, nshort:'coat_brown', name:'Brązowa kurtka z materiału', type:'body', level:21, price:2500, image:'/images/items/body/coat_brown.png?1', image_mini:'/images/items/body/mini/coat_brown.png?1', bonus:{skills:{pitfall:8, swim:9, build:12}, attributes:{strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[349] = {item_id:349, nshort:'coat_black', name:'Czarna kurtka z materiału', type:'body', level:21, price:2500, image:'/images/items/body/coat_black.png?1', image_mini:'/images/items/body/mini/coat_black.png?1', bonus:{skills:{animal:9, pitfall:11, build:9}, attributes:{dexterity:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[350] = {item_id:350, nshort:'coat_fine', name:'Szlachecka kurtka z materiału', type:'body', level:22, price:6300, image:'/images/items/body/coat_fine.png?1', image_mini:'/images/items/body/mini/coat_fine.png?1', bonus:{skills:{appearance:9, pitfall:11, dodge:9, build:12}, attributes:{dexterity:1, strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[351] = {item_id:351, nshort:'jacket_grey', name:'Szary żakiet', type:'body', level:20, price:1850, image:'/images/items/body/jacket_grey.png?1', image_mini:'/images/items/body/mini/jacket_grey.png?1', bonus:{skills:{trade:10, reflex:9}, attributes:{charisma:1, flexibility:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[352] = {item_id:352, nshort:'jacket_brown', name:'Brązowy żakiet', type:'body', level:25, price:3500, image:'/images/items/body/jacket_brown.png?1', image_mini:'/images/items/body/mini/jacket_brown.png?1', bonus:{skills:{trade:10, reflex:9, tough:10}, attributes:{flexibility:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[353] = {item_id:353, nshort:'jacket_black', name:'Czarny żakiet', type:'body', level:25, price:3500, image:'/images/items/body/jacket_black.png?1', image_mini:'/images/items/body/mini/jacket_black.png?1', bonus:{skills:{trade:10, aim:10, reflex:9}, attributes:{charisma:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[354] = {item_id:354, nshort:'jacket_fine', name:'Szlachecki żakiet', type:'body', level:27, price:7200, image:'/images/items/body/jacket_fine.png?1', image_mini:'/images/items/body/mini/jacket_fine.png?1', bonus:{skills:{trade:13, aim:9, reflex:13, punch:9}, attributes:{charisma:1, flexibility:1}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_gentleman', name:'Komplet Dżentelmena'}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[355] = {item_id:355, nshort:'leather_coat_grey', name:'Szara skórzana kurtka', type:'body', level:25, price:2700, image:'/images/items/body/leather_coat_grey.png?1', image_mini:'/images/items/body/mini/leather_coat_grey.png?1', bonus:{skills:{hide:12, tough:13}, attributes:{flexibility:1, strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[356] = {item_id:356, nshort:'leather_coat_brown', name:'Brązowa skórzana kurtka', type:'body', level:28, price:5000, image:'/images/items/body/leather_coat_brown.png?1', image_mini:'/images/items/body/mini/leather_coat_brown.png?1', bonus:{skills:{hide:13, tough:13}, attributes:{flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[357] = {item_id:357, nshort:'leather_coat_black', name:'Czarna skórzana kurtka', type:'body', level:28, price:5000, image:'/images/items/body/leather_coat_black.png?1', image_mini:'/images/items/body/mini/leather_coat_black.png?1', bonus:{skills:{leadership:11, repair:12, hide:11, tough:12}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[358] = {item_id:358, nshort:'leather_coat_fine', name:'Szlachecka skórzana kurtka', type:'body', level:30, price:9000, image:'/images/items/body/leather_coat_fine.png?1', image_mini:'/images/items/body/mini/leather_coat_fine.png?1', bonus:{skills:{appearance:10, finger_dexterity:9, hide:15, tough:16}, attributes:{flexibility:1, strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[359] = {item_id:359, nshort:'greatcoat_grey', name:'Szary płaszcz', type:'body', level:33, price:3500, image:'/images/items/body/greatcoat_grey.png?1', image_mini:'/images/items/body/mini/greatcoat_grey.png?1', bonus:{skills:{tactic:15, shot:14}, attributes:{charisma:1, dexterity:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[360] = {item_id:360, nshort:'greatcoat_brown', name:'Brązowy płaszcz', type:'body', level:40, price:6280, image:'/images/items/body/greatcoat_brown.png?1', image_mini:'/images/items/body/mini/greatcoat_brown.png?1', bonus:{skills:{tactic:13, shot:13, ride:13, health:12}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[361] = {item_id:361, nshort:'greatcoat_fine', name:'Szlachecki płaszcz', type:'body', level:45, price:9500, image:'/images/items/body/greatcoat_fine.png?1', image_mini:'/images/items/body/mini/greatcoat_fine.png?1', bonus:{skills:{tactic:17, shot:16, ride:9, endurance:9}, attributes:{charisma:1, dexterity:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[362] = {item_id:362, nshort:'uniform', name:'Mundur', type:'body', level:20, price:800, image:'/images/items/body/uniform.png?1', image_mini:'/images/items/body/mini/uniform.png?1', characterClass:'soldier', bonus:{skills:{appearance:2, hide:4}, attributes:{charisma:2}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	PK_S3.items[363] = {item_id:363, nshort:'uniform_burned', name:'Spalony mundur', type:'body', level:20, price:80, image:'/images/items/body/uniform_burned.png?1', image_mini:'/images/items/body/mini/uniform_burned.png?1', characterClass:'soldier', bonus:{skills:{appearance:-2, hide:4}, attributes:{charisma:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:false, sellable:true};
	PK_S3.items[364] = {item_id:364, nshort:'greatcoat_black', name:'Czarny płaszcz', type:'body', level:40, price:6280, image:'/images/items/body/greatcoat_black.png?1', image_mini:'/images/items/body/mini/greatcoat_black.png?1', bonus:{skills:{tactic:16, shot:15}, attributes:{charisma:2, dexterity:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[365] = {item_id:365, nshort:'adventurerjacket', name:'Kurtka poszukiwacza przygód', type:'body', level:40, price:0, image:'/images/items/body/adventurerjacket.png?1', image_mini:'/images/items/body/mini/adventurerjacket.png?1', characterClass:'adventurer', bonus:{skills:{hide:4, ride:10, tough:9}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	PK_S3.items[366] = {item_id:366, nshort:'vest_leather_brown', name:'Brązowa skórzana kamizelka', type:'body', level:14, price:0, image:'/images/items/body/vest_leather_brown.png?1', image_mini:'/images/items/body/mini/vest_leather_brown.png?1', characterClass:'duelist', bonus:{skills:{dodge:8, reflex:7, punch:5}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[367] = {item_id:367, nshort:'shirt_canvas', name:'Lniana koszula', type:'body', level:8, price:425, image:'/images/items/body/shirt_canvas.png?1', image_mini:'/images/items/body/mini/shirt_canvas.png?1', characterClass:'worker', bonus:{skills:{animal:3, dodge:2}, attributes:{strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
	PK_S3.items[368] = {item_id:368, nshort:'dancer_dress', name:'Sukienka tancerki', type:'body', level:45, price:7500, image:'/images/items/body/dancer_dress.png?1', image_mini:'/images/items/body/mini/dancer_dress.png?1', characterSex:'female', bonus:{skills:{animal:10, finger_dexterity:11, shot:8, endurance:8}, attributes:{charisma:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_dancer', name:'Komplet Tancerki'}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[369] = {item_id:369, nshort:'indian_jacket', name:'Indiańskie ubranie', type:'body', level:55, price:7500, image:'/images/items/body/indian_jacket.png?1', image_mini:'/images/items/body/mini/indian_jacket.png?1', bonus:{skills:{pitfall:8, hide:9, punch:8}, attributes:{dexterity:1, flexibility:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_indian', name:'Komplet Indianina'}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[372] = {item_id:372, nshort:'pilger_dress', name:'Szata pielgrzyma', type:'body', level:38, price:2500, image:'/images/items/body/pilger_dress.png?1', image_mini:'/images/items/body/mini/pilger_dress.png?1', characterSex:'female', bonus:{skills:{dodge:10, build:8}, attributes:{strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_pilgrim_female', name:'Komplet Pielgrzyma(damski)'}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[373] = {item_id:373, nshort:'pilger_jacket', name:'Koszula pielgrzyma', type:'body', level:38, price:2500, image:'/images/items/body/pilger_jacket.png?1', image_mini:'/images/items/body/mini/pilger_jacket.png?1', characterSex:'male', bonus:{skills:{hide:10, build:8}, attributes:{dexterity:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_pilgrim_male', name:'Komplet Pielgrzyma'}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[375] = {item_id:375, nshort:'night_shirt', name:'Koszula nocna', type:'body', level:45, price:1500, image:'/images/items/body/night_shirt.png?1', image_mini:'/images/items/body/mini/night_shirt.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_sleeper', name:'Śpioszek'}, auctionable:true, dropable:true, tradeable:false, sellable:true};

/* --------------------------------------- OBUWIE --------------------------------------- */
    PK_S3.items[400] = {item_id:400, nshort:'ripped_shoes_grey', name:'Szare zniszczone buty', type:'foot', level:1, price:4, image:'/images/items/foot/ripped_shoes_grey.png?1', image_mini:'/images/items/foot/mini/ripped_shoes_grey.png?1', bonus:{skills:{repair:1}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[401] = {item_id:401, nshort:'ripped_shoes_brown', name:'Brązowe zniszczone buty', type:'foot', level:3, price:30, image:'/images/items/foot/ripped_shoes_brown.png?1', image_mini:'/images/items/foot/mini/ripped_shoes_brown.png?1', bonus:{skills:{swim:4, build:4}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[402] = {item_id:402, nshort:'ripped_shoes_black', name:'Czarne zniszczone buty', type:'foot', level:3, price:30, image:'/images/items/foot/ripped_shoes_black.png?1', image_mini:'/images/items/foot/mini/ripped_shoes_black.png?1', bonus:{skills:{leadership:4, repair:4}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[403] = {item_id:403, nshort:'light_grey', name:'Szare buty materiałowe', type:'foot', level:5, price:70, image:'/images/items/foot/light_grey.png?1', image_mini:'/images/items/foot/mini/light_grey.png?1', bonus:{skills:{endurance:5}, attributes:{strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[404] = {item_id:404, nshort:'light_brown', name:'Brązowe buty materiałowe', type:'foot', level:9, price:170, image:'/images/items/foot/light_brown.png?1', image_mini:'/images/items/foot/mini/light_brown.png?1', bonus:{skills:{hide:5, endurance:3}, attributes:{strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[405] = {item_id:405, nshort:'light_black', name:'Czarne buty materiałowe', type:'foot', level:9, price:170, image:'/images/items/foot/light_black.png?1', image_mini:'/images/items/foot/mini/light_black.png?1', bonus:{skills:{trade:5, shot:5, endurance:3}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[406] = {item_id:406, nshort:'light_fine', name:'Szlacheckie buty materiałowe', type:'foot', level:11, price:1500, image:'/images/items/foot/light_fine.png?1', image_mini:'/images/items/foot/mini/light_fine.png?1', bonus:{skills:{appearance:6, pitfall:6, reflex:6, endurance:4}, attributes:{strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[407] = {item_id:407, nshort:'working_grey', name:'Szare buty robocze', type:'foot', level:9, price:660, image:'/images/items/foot/working_grey.png?1', image_mini:'/images/items/foot/mini/working_grey.png?1', bonus:{skills:{pitfall:12}, attributes:{dexterity:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[408] = {item_id:408, nshort:'working_brown', name:'Brązowe buty robocze', type:'foot', level:13, price:1200, image:'/images/items/foot/working_brown.png?1', image_mini:'/images/items/foot/mini/working_brown.png?1', bonus:{skills:{pitfall:8, ride:7, endurance:7}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[409] = {item_id:409, nshort:'working_black', name:'Czarne buty robocze', type:'foot', level:13, price:1200, image:'/images/items/foot/working_black.png?1', image_mini:'/images/items/foot/mini/working_black.png?1', bonus:{skills:{tactic:7, pitfall:10}, attributes:{dexterity:1}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_farmer', name:'Komplet Farmera'}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[410] = {item_id:410, nshort:'working_fine', name:'Szlacheckie buty robocze', type:'foot', level:15, price:4300, image:'/images/items/foot/working_fine.png?1', image_mini:'/images/items/foot/mini/working_fine.png?1', bonus:{skills:{trade:8, pitfall:11, dodge:8, punch:8}, attributes:{dexterity:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[411] = {item_id:411, nshort:'spur_grey', name:'Szare buty skórzane', type:'foot', level:14, price:1400, image:'/images/items/foot/spur_grey.png?1', image_mini:'/images/items/foot/mini/spur_grey.png?1', bonus:{skills:{animal:7, shot:7}, attributes:{charisma:1, dexterity:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[412] = {item_id:412, nshort:'spur_brown', name:'Brązowe buty skórzane', type:'foot', level:17, price:2450, image:'/images/items/foot/spur_brown.png?1', image_mini:'/images/items/foot/mini/spur_brown.png?1', bonus:{skills:{animal:7, shot:6, reflex:9, tough:9}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[413] = {item_id:413, nshort:'spur_black', name:'Czarne buty skórzane', type:'foot', level:17, price:2450, image:'/images/items/foot/spur_black.png?1', image_mini:'/images/items/foot/mini/spur_black.png?1', bonus:{skills:{animal:10, shot:9}, attributes:{charisma:1, dexterity:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[414] = {item_id:414, nshort:'spur_fine', name:'Szlacheckie buty skórzane', type:'foot', level:20, price:6230, image:'/images/items/foot/spur_fine.png?1', image_mini:'/images/items/foot/mini/spur_fine.png?1', bonus:{skills:{animal:11, shot:10, swim:8, health:8}, attributes:{charisma:1, dexterity:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[415] = {item_id:415, nshort:'boots_grey', name:'Szare kozaki', type:'foot', level:16, price:3000, image:'/images/items/foot/boots_grey.png?1', image_mini:'/images/items/foot/mini/boots_grey.png?1', bonus:{skills:{tactic:12, shot:12}, attributes:{charisma:1, dexterity:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[416] = {item_id:416, nshort:'boots_brown', name:'Brązowe kozaki', type:'foot', level:20, price:5100, image:'/images/items/foot/boots_brown.png?1', image_mini:'/images/items/foot/mini/boots_brown.png?1', bonus:{skills:{tactic:10, shot:9, dodge:12, tough:12}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[417] = {item_id:417, nshort:'boots_black', name:'Czarne kozaki', type:'foot', level:20, price:5100, image:'/images/items/foot/boots_black.png?1', image_mini:'/images/items/foot/mini/boots_black.png?1', bonus:{skills:{tactic:12, shot:11}, attributes:{charisma:2, dexterity:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[418] = {item_id:418, nshort:'boots_fine', name:'Szlacheckie kozaki', type:'foot', level:22, price:8870, image:'/images/items/foot/boots_fine.png?1', image_mini:'/images/items/foot/mini/boots_fine.png?1', bonus:{skills:{tactic:10, shot:9, hide:8, endurance:8}, attributes:{charisma:2, dexterity:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[419] = {item_id:419, nshort:'rider_grey', name:'Szare kozaki jeździeckie', type:'foot', level:30, price:2600, image:'/images/items/foot/rider_grey.png?1', image_mini:'/images/items/foot/mini/rider_grey.png?1', bonus:{skills:{ride:15, punch:14}, attributes:{flexibility:1, strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[420] = {item_id:420, nshort:'rider_brown', name:'Brązowe kozaki jeździeckie', type:'foot', level:33, price:6200, image:'/images/items/foot/rider_brown.png?1', image_mini:'/images/items/foot/mini/rider_brown.png?1', bonus:{skills:{ride:14, punch:13}, attributes:{flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[421] = {item_id:421, nshort:'rider_black', name:'Czarne kozaki jeździeckie', type:'foot', level:33, price:6200, image:'/images/items/foot/rider_black.png?1', image_mini:'/images/items/foot/mini/rider_black.png?1', bonus:{skills:{animal:14, pitfall:13}, attributes:{charisma:2, dexterity:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[422] = {item_id:422, nshort:'rider_fine', name:'Szlacheckie kozaki jeździeckie', type:'foot', level:35, price:9500, image:'/images/items/foot/rider_fine.png?1', image_mini:'/images/items/foot/mini/rider_fine.png?1', bonus:{skills:{appearance:8, aim:8, ride:11, punch:10}, attributes:{flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[423] = {item_id:423, nshort:'soldier_boots', name:'Buty żołnierskie', type:'foot', level:30, price:5500, image:'/images/items/foot/soldier_boots.png?1', image_mini:'/images/items/foot/mini/soldier_boots.png?1', characterClass:'soldier', bonus:{skills:{tactic:9, ride:12, health:12, tough:10}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[425] = {item_id:425, nshort:'lace-up_shoes_brown', name:'Brązowe buty sznurowane', type:'foot', level:13, price:1290, image:'/images/items/foot/lace-up_shoes_brown.png?1', image_mini:'/images/items/foot/mini/lace-up_shoes_brown.png?1', characterClass:'duelist', bonus:{skills:{appearance:4, shot:4, aim:5}, attributes:{dexterity:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[426] = {item_id:426, nshort:'pilgrim_shoes_brown', name:'Brązowe buty pielgrzyma', type:'foot', level:15, price:1530, image:'/images/items/foot/pilgrim_shoes_brown.png?1', image_mini:'/images/items/foot/mini/pilgrim_shoes_brown.png?1', characterClass:'worker', bonus:{skills:{repair:6, punch:6, build:4}, attributes:{strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[427] = {item_id:427, nshort:'gentleman_shoes', name:'Buty szlacheckie', type:'foot', level:45, price:5600, image:'/images/items/foot/gentleman_shoes.png?1', image_mini:'/images/items/foot/mini/gentleman_shoes.png?1', characterSex:'male', bonus:{skills:{appearance:8, reflex:9}, attributes:{dexterity:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_gentleman', name:'Komplet Dżentelmena'}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[428] = {item_id:428, nshort:'mexican_shoes', name:'Sandały', type:'foot', level:28, price:2650, image:'/images/items/foot/mexican_shoes.png?1', image_mini:'/images/items/foot/mini/mexican_shoes.png?1', bonus:{skills:{animal:7, aim:6, dodge:8, health:8}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_mexican', name:'Komplet Meksykanina'}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[429] = {item_id:429, nshort:'mokassins', name:'Mokasyny', type:'foot', level:45, price:5600, image:'/images/items/foot/mokassins.png?1', image_mini:'/images/items/foot/mini/mokassins.png?1', bonus:{skills:{tactic:9, hide:9, endurance:9}, attributes:{flexibility:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_indian', name:'Komplet Indianina'}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[431] = {item_id:431, nshort:'pilger_boots', name:'Buty pielgrzyma(damskie)', type:'foot', level:39, price:2600, image:'/images/items/foot/pilger_boots.png?1', image_mini:'/images/items/foot/mini/pilger_boots.png?1', characterSex:'female', bonus:{skills:{finger_dexterity:8, shot:8, hide:6, build:7}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_pilgrim_female', name:'Komplet Pielgrzyma(damski)'}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[432] = {item_id:432, nshort:'pilger_shoes', name:'Buty pielgrzyma', type:'foot', level:39, price:2600, image:'/images/items/foot/pilger_shoes.png?1', image_mini:'/images/items/foot/mini/pilger_shoes.png?1', characterSex:'male', bonus:{skills:{leadership:8, reflex:8, tough:6, build:7}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_pilgrim_male', name:'Komplet Pielgrzyma'}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[433] = {item_id:433, nshort:'dancer_boots', name:'Buty na obcasie', type:'foot', level:41, price:4000, image:'/images/items/foot/dancer_boots.png?1', image_mini:'/images/items/foot/mini/dancer_boots.png?1', characterSex:'female', bonus:{skills:{repair:8, aim:9}, attributes:{charisma:1, dexterity:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_dancer', name:'Komplet Tancerki'}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[435] = {item_id:435, nshort:'quackery_shoes', name:'Buty konowała', type:'foot', level:45, price:5600, image:'/images/items/foot/quackery_shoes.png?1', image_mini:'/images/items/foot/mini/quackery_shoes.png?1', bonus:{skills:{trade:9, swim:9, ride:9}, attributes:{flexibility:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_quackery', name:'Komplet Konowała'}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[436] = {item_id:436, nshort:'slippers', name:'Pantofle', type:'foot', level:45, price:2000, image:'/images/items/foot/slippers.png?1', image_mini:'/images/items/foot/mini/slippers.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_sleeper', name:'Śpioszek'}, auctionable:true, dropable:true, tradeable:false, sellable:true};
    PK_S3.items[437] = {item_id:437, nshort:'thanksgiving_boots', name:'Buty dziękczynne', type:'foot', level:30, price:4600, image:'/images/items/foot/thanksgiving_boots.png?1', image_mini:'/images/items/foot/mini/thanksgiving_boots.png?1', bonus:{skills:{hide:6, tough:12}, attributes:{dexterity:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'season_set', name:'Zestaw świąteczny'}, traderlevel:99, auctionable:false, dropable:false, tradeable:true, sellable:true};
    PK_S3.items[438] = {item_id:438, nshort:'greenhorn_shoes', name:'Buty nowicjusza', type:'foot', level:6, price:460, image:'/images/items/foot/greenhorn_shoes.png?1', image_mini:'/images/items/foot/mini/greenhorn_shoes.png?1', bonus:{skills:{finger_dexterity:3, reflex:6}, attributes:{dexterity:1}, fortbattle:{}, fortbattlesector:{}}, set:{key:'greenhorn_set', name:'Zestaw nowicjusza'}, auctionable:false, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[439] = {item_id:439, nshort:'collector_shoes', name:'Buty kolekcjonera', type:'foot', level:100, price:10000, image:'/images/items/foot/collector_shoes.png?1', image_mini:'/images/items/foot/mini/collector_shoes.png?1', bonus:{skills:{pitfall:15, tough:15}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'collector_set', name:'Zestaw kolekcjonera'}, traderlevel:99, auctionable:false, dropable:false, tradeable:true, sellable:false};
	PK_S3.items[440] = {item_id:440, nshort:'bunny_shoes', name:'Stopy zajączka', type:'foot', level:1, price:0, image:'/images/items/foot/bunny_shoes.png?1', image_mini:'/images/items/foot/mini/bunny_shoes.png?1', bonus:{skills:{animal:2}, attributes:{strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{key:'bunny_set', name:'Zestaw zajączka wielkanocnego'}, traderlevel:99, tradeable:true};

/* --------------------------------------- NASZYJNIKI --------------------------------------- */
	PK_S3.items[500] = {item_id:500, nshort:'neckband_grey', name:'Szara chustka na szyję', type:'neck', level:0, price:10, image:'/images/items/neck/neckband_grey.png?1', image_mini:'images/items/neck/neckband_grey.png?1', bonus:{skills:{swim:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[501] = {item_id:501, nshort:'neckband_red', name:'Czerwona chustka na szyję', type:'neck', level:0, price:14, image:'/images/items/neck/neckband_red.png?1', image_mini:'images/items/neck/neckband_red.png?1', bonus:{skills:{swim:2, build:1}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[502] = {item_id:502, nshort:'neckband_green', name:'Zielona chustka na szyję', type:'neck', level:0, price:14, image:'/images/items/neck/neckband_green.png?1', image_mini:'images/items/neck/neckband_green.png?1', bonus:{skills:{swim:3}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[503] = {item_id:503, nshort:'neckband_blue', name:'Niebieska chustka na szyję', type:'neck', level:0, price:14, image:'/images/items/neck/neckband_blue.png?1', image_mini:'images/items/neck/neckband_blue.png?1', bonus:{skills:{aim:1, swim:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[504] = {item_id:504, nshort:'neckband_yellow', name:'Żółta chustka na szyję', type:'neck', level:0, price:14, image:'/images/items/neck/neckband_yellow.png?1', image_mini:'images/items/neck/neckband_yellow.png?1', bonus:{skills:{appearance:1, swim:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[505] = {item_id:505, nshort:'neckband_brown', name:'Brązowa chustka na szyję', type:'neck', level:0, price:20, image:'/images/items/neck/neckband_brown.png?1', image_mini:'images/items/neck/neckband_brown.png?1', bonus:{skills:{swim:3, health:1}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[506] = {item_id:506, nshort:'neckband_black', name:'Czarna chustka na szyję', type:'neck', level:0, price:20, image:'/images/items/neck/neckband_black.png?1', image_mini:'images/items/neck/neckband_black.png?1', bonus:{skills:{tactic:1, shot:1, swim:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[507] = {item_id:507, nshort:'indian_chain_grey', name:'Szary naszyjnik indiański', type:'neck', level:0, price:35, image:'/images/items/neck/indian_chain_grey.png?1', image_mini:'images/items/neck/indian_chain_grey.png?1', bonus:{skills:{animal:5}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[508] = {item_id:508, nshort:'indian_chain_red', name:'Czerwony naszyjnik indiański', type:'neck', level:0, price:75, image:'/images/items/neck/indian_chain_red.png?1', image_mini:'images/items/neck/indian_chain_red.png?1', bonus:{skills:{animal:5, endurance:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[509] = {item_id:509, nshort:'indian_chain_green', name:'Zielony naszyjnik indiański', type:'neck', level:0, price:75, image:'/images/items/neck/indian_chain_green.png?1', image_mini:'images/items/neck/indian_chain_green.png?1', bonus:{skills:{animal:5, ride:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[510] = {item_id:510, nshort:'indian_chain_blue', name:'Niebieski naszyjnik indiański', type:'neck', level:0, price:75, image:'/images/items/neck/indian_chain_blue.png?1', image_mini:'images/items/neck/indian_chain_blue.png?1', bonus:{skills:{animal:5, finger_dexterity:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[511] = {item_id:511, nshort:'indian_chain_yellow', name:'Żółty naszyjnik indiański', type:'neck', level:0, price:75, image:'/images/items/neck/indian_chain_yellow.png?1', image_mini:'images/items/neck/indian_chain_yellow.png?1', bonus:{skills:{animal:7}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[512] = {item_id:512, nshort:'indian_chain_fine', name:'Złoty naszyjnik indiański', type:'neck', level:0, price:660, image:'/images/items/neck/indian_chain_fine.png?1', image_mini:'images/items/neck/indian_chain_fine.png?1', bonus:{skills:{animal:8, pitfall:3, hide:4, punch:4}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_indian', name:'Komplet Indianina'}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[513] = {item_id:513, nshort:'loop_grey', name:'Szara opaska', type:'neck', level:0, price:125, image:'/images/items/neck/loop_grey.png?1', image_mini:'images/items/neck/loop_grey.png?1', bonus:{skills:{shot:9}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[514] = {item_id:514, nshort:'loop_red', name:'Czerwona opaska', type:'neck', level:0, price:240, image:'/images/items/neck/loop_red.png?1', image_mini:'images/items/neck/loop_red.png?1', bonus:{skills:{shot:8, health:4}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[515] = {item_id:515, nshort:'loop_green', name:'Zielona opaska', type:'neck', level:0, price:240, image:'/images/items/neck/loop_green.png?1', image_mini:'images/items/neck/loop_green.png?1', bonus:{skills:{shot:8, swim:4}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[516] = {item_id:516, nshort:'loop_blue', name:'Niebieska opaska', type:'neck', level:0, price:240, image:'/images/items/neck/loop_blue.png?1', image_mini:'images/items/neck/loop_blue.png?1', bonus:{skills:{shot:12}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[517] = {item_id:517, nshort:'loop_yellow', name:'Żółta opaska', type:'neck', level:0, price:240, image:'/images/items/neck/loop_yellow.png?1', image_mini:'images/items/neck/loop_yellow.png?1', bonus:{skills:{trade:4, shot:8}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[518] = {item_id:518, nshort:'loop_brown', name:'Brązowa opaska', type:'neck', level:0, price:385, image:'/images/items/neck/loop_brown.png?1', image_mini:'images/items/neck/loop_brown.png?1', bonus:{skills:{shot:8, dodge:4, endurance:3}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[519] = {item_id:519, nshort:'loop_black', name:'Czarna opaska', type:'neck', level:0, price:385, image:'/images/items/neck/loop_black.png?1', image_mini:'images/items/neck/loop_black.png?1', bonus:{skills:{appearance:3, shot:11}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[520] = {item_id:520, nshort:'fly_grey', name:'Szara muszka', type:'neck', level:0, price:282, image:'/images/items/neck/fly_grey.png?1', image_mini:'images/items/neck/fly_grey.png?1', bonus:{skills:{build:13}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[521] = {item_id:521, nshort:'fly_red', name:'Czerwona muszka', type:'neck', level:0, price:446, image:'/images/items/neck/fly_red.png?1', image_mini:'images/items/neck/fly_red.png?1', bonus:{skills:{build:11}, attributes:{strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[522] = {item_id:522, nshort:'fly_green', name:'Zielona muszka', type:'neck', level:0, price:446, image:'/images/items/neck/fly_green.png?1', image_mini:'images/items/neck/fly_green.png?1', bonus:{skills:{ride:6, build:11}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[523] = {item_id:523, nshort:'fly_blue', name:'Niebieska muszka', type:'neck', level:0, price:446, image:'/images/items/neck/fly_blue.png?1', image_mini:'images/items/neck/fly_blue.png?1', bonus:{skills:{aim:6, build:11}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[524] = {item_id:524, nshort:'fly_yellow', name:'Żółta muszka', type:'neck', level:0, price:446, image:'/images/items/neck/fly_yellow.png?1', image_mini:'images/items/neck/fly_yellow.png?1', bonus:{skills:{animal:6, build:11}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[525] = {item_id:525, nshort:'fly_brown', name:'Brązowa muszka', type:'neck', level:0, price:650, image:'/images/items/neck/fly_brown.png?1', image_mini:'images/items/neck/fly_brown.png?1', bonus:{skills:{hide:4, build:10}, attributes:{strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[526] = {item_id:526, nshort:'fly_black', name:'Czarna muszka', type:'neck', level:0, price:650, image:'/images/items/neck/fly_black.png?1', image_mini:'images/items/neck/fly_black.png?1', bonus:{skills:{trade:4, pitfall:4, build:11}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[527] = {item_id:527, nshort:'fly_fine', name:'Szlachecka muszka', type:'neck', level:0, price:2200, image:'/images/items/neck/fly_fine.png?1', image_mini:'images/items/neck/fly_fine.png?1', bonus:{skills:{tactic:5, repair:6, dodge:6, build:11}, attributes:{strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_quackery', name:'Komplet Konowała'}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[528] = {item_id:528, nshort:'cross_bronze', name:'Metalowy krzyżyk', type:'neck', level:0, price:730, image:'/images/items/neck/cross_bronze.png?1', image_mini:'images/items/neck/cross_bronze.png?1', bonus:{skills:{}, attributes:{charisma:1, dexterity:1, flexibility:1, strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_pilgrim_female', name:'Komplet Pielgrzyma(damski)'}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[529] = {item_id:529, nshort:'cross_silver', name:'Srebrny krzyżyk', type:'neck', level:0, price:1200, image:'/images/items/neck/cross_silver.png?1', image_mini:'images/items/neck/cross_silver.png?1', bonus:{skills:{}, attributes:{charisma:1, dexterity:1, flexibility:2, strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_pilgrim_male', name:'Komplet Pielgrzyma'}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[530] = {item_id:530, nshort:'cross_gold', name:'Złoty krzyżyk', type:'neck', level:0, price:3400, image:'/images/items/neck/cross_gold.png?1', image_mini:'images/items/neck/cross_gold.png?1', bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[531] = {item_id:531, nshort:'cravat_grey', name:'Szary krawat', type:'neck', level:0, price:820, image:'/images/items/neck/cravat_grey.png?1', image_mini:'images/items/neck/cravat_grey.png?1', bonus:{skills:{leadership:11, health:10}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[532] = {item_id:532, nshort:'cravat_red', name:'Czerwony krawat', type:'neck', level:0, price:1205, image:'/images/items/neck/cravat_red.png?1', image_mini:'images/items/neck/cravat_red.png?1', bonus:{skills:{leadership:8, health:7}, attributes:{strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[533] = {item_id:533, nshort:'cravat_green', name:'Zielony krawat', type:'neck', level:0, price:1205, image:'/images/items/neck/cravat_green.png?1', image_mini:'images/items/neck/cravat_green.png?1', bonus:{skills:{leadership:8, reflex:9, health:8}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[534] = {item_id:534, nshort:'cravat_blue', name:'Niebieski krawat', type:'neck', level:0, price:1205, image:'/images/items/neck/cravat_blue.png?1', image_mini:'images/items/neck/cravat_blue.png?1', bonus:{skills:{leadership:8, shot:9, health:8}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[535] = {item_id:535, nshort:'cravat_yellow', name:'Żółty krawat', type:'neck', level:0, price:1205, image:'/images/items/neck/cravat_yellow.png?1', image_mini:'images/items/neck/cravat_yellow.png?1', bonus:{skills:{leadership:7, health:8}, attributes:{charisma:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[536] = {item_id:536, nshort:'cravat_brown', name:'Brązowy krawat', type:'neck', level:0, price:1500, image:'/images/items/neck/cravat_brown.png?1', image_mini:'images/items/neck/cravat_brown.png?1', bonus:{skills:{leadership:8, dodge:6, health:9}, attributes:{strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[537] = {item_id:537, nshort:'cravat_black', name:'Czarny krawat', type:'neck', level:0, price:1500, image:'/images/items/neck/cravat_black.png?1', image_mini:'images/items/neck/cravat_black.png?1', bonus:{skills:{leadership:9, finger_dexterity:6, health:8}, attributes:{charisma:1}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_gentleman', name:'Komplet Dżentelmena'}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[538] = {item_id:538, nshort:'cravat_fine', name:'Szlachecki krawat', type:'neck', level:0, price:4400, image:'/images/items/neck/cravat_fine.png?1', image_mini:'images/items/neck/cravat_fine.png?1', bonus:{skills:{leadership:10, pitfall:7, swim:8, health:10}, attributes:{charisma:1, strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[539] = {item_id:539, nshort:'bullet_metal', name:'Metalowa Kula', type:'neck', level:0, price:1800, image:'/images/items/neck/bullet_metal.png?1', image_mini:'images/items/neck/bullet_metal.png?1', bonus:{skills:{}, attributes:{charisma:1, dexterity:1, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[540] = {item_id:540, nshort:'bullet_silver', name:'Srebrna Kula', type:'neck', level:0, price:3350, image:'/images/items/neck/bullet_silver.png?1', image_mini:'images/items/neck/bullet_silver.png?1', bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[541] = {item_id:541, nshort:'bullet_gold', name:'Złota Kula', type:'neck', level:0, price:6750, image:'/images/items/neck/bullet_gold.png?1', image_mini:'images/items/neck/bullet_gold.png?1', bonus:{skills:{}, attributes:{charisma:2, dexterity:3, flexibility:3, strength:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
	PK_S3.items[542] = {item_id:542, nshort:'kerchief_grey', name:'Szara chustka', type:'neck', level:0, price:2500, image:'/images/items/neck/kerchief_grey.png?1', image_mini:'images/items/neck/kerchief_grey.png?1', bonus:{skills:{appearance:12, finger_dexterity:13}, attributes:{charisma:1, dexterity:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[543] = {item_id:543, nshort:'kerchief_red', name:'Czerwona chustka', type:'neck', level:0, price:3400, image:'/images/items/neck/kerchief_red.png?1', image_mini:'images/items/neck/kerchief_red.png?1', bonus:{skills:{appearance:13, finger_dexterity:13, build:14}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[544] = {item_id:544, nshort:'kerchief_green', name:'Zielona chustka', type:'neck', level:0, price:3400, image:'/images/items/neck/kerchief_green.png?1', image_mini:'images/items/neck/kerchief_green.png?1', bonus:{skills:{appearance:13, finger_dexterity:13, ride:14}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[545] = {item_id:545, nshort:'kerchief_blue', name:'Niebieska chustka', type:'neck', level:0, price:3400, image:'/images/items/neck/kerchief_blue.png?1', image_mini:'images/items/neck/kerchief_blue.png?1', bonus:{skills:{appearance:13, finger_dexterity:12}, attributes:{dexterity:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[546] = {item_id:546, nshort:'kerchief_yellow', name:'Żółta chustka', type:'neck', level:0, price:3400, image:'/images/items/neck/kerchief_yellow.png?1', image_mini:'images/items/neck/kerchief_yellow.png?1', bonus:{skills:{appearance:12, finger_dexterity:13}, attributes:{charisma:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[547] = {item_id:547, nshort:'kerchief_brown', name:'Brązowa chustka', type:'neck', level:0, price:4360, image:'/images/items/neck/kerchief_brown.png?1', image_mini:'images/items/neck/kerchief_brown.png?1', bonus:{skills:{appearance:13, finger_dexterity:13, hide:9, punch:10}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[548] = {item_id:548, nshort:'kerchief_black', name:'Czarna chustka', type:'neck', level:0, price:4360, image:'/images/items/neck/kerchief_black.png?1', image_mini:'images/items/neck/kerchief_black.png?1', bonus:{skills:{appearance:12, finger_dexterity:13}, attributes:{charisma:2, dexterity:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[549] = {item_id:549, nshort:'bullchain_metal', name:'Metalowy Bawół', type:'neck', level:0, price:2400, image:'/images/items/neck/bullchain_metal.png?1', image_mini:'images/items/neck/bullchain_metal.png?1', bonus:{skills:{}, attributes:{charisma:1, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[550] = {item_id:550, nshort:'bullchain_silver', name:'Srebrny Bawół', type:'neck', level:0, price:4490, image:'/images/items/neck/bullchain_silver.png?1', image_mini:'images/items/neck/bullchain_silver.png?1', bonus:{skills:{}, attributes:{charisma:3, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[551] = {item_id:551, nshort:'bullchain_gold', name:'Złoty Bawół', type:'neck', level:0, price:8300, image:'/images/items/neck/bullchain_gold.png?1', image_mini:'images/items/neck/bullchain_gold.png?1', bonus:{skills:{}, attributes:{charisma:3, dexterity:3, flexibility:3, strength:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[552] = {item_id:552, nshort:'talisman', name:'Talizman', type:'neck', level:0, price:1000, image:'/images/items/neck/talisman.png?1', image_mini:'images/items/neck/talisman.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:11, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[553] = {item_id:553, nshort:'stonechain', name:'Kamienny naszyjnik', type:'neck', level:0, price:1000, image:'/images/items/neck/stonechain.png?1', image_mini:'images/items/neck/stonechain.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:11, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[554] = {item_id:554, nshort:'southcross', name:'Medal waleczności', type:'neck', level:0, price:650, image:'/images/items/neck/southcross.png?1', image_mini:'images/items/neck/southcross.png?1', characterClass:'soldier', bonus:{skills:{appearance:7, tactic:8, ride:4}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:11, auctionable:false, dropable:false, tradeable:true, sellable:true};
	PK_S3.items[555] = {item_id:555, nshort:'aztecchains', name:'Naszyjnik Azteków', type:'neck', level:0, price:1200, image:'/images/items/neck/aztecchains.png?1', image_mini:'images/items/neck/aztecchains.png?1', characterClass:'adventurer', bonus:{skills:{hide:9, ride:10, tough:8}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[556] = {item_id:556, nshort:'arrowhead', name:'Grot', type:'neck', level:0, price:1150, image:'/images/items/neck/arrowhead.png?1', image_mini:'images/items/neck/arrowhead.png?1', characterClass:'duelist', bonus:{skills:{shot:7, aim:7}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[557] = {item_id:557, nshort:'bone_necklace', name:'Naszyjnik z kości', type:'neck', level:0, price:1700, image:'/images/items/neck/bone_necklace.png?1', image_mini:'images/items/neck/bone_necklace.png?1', characterClass:'worker', bonus:{skills:{appearance:3}, attributes:{strength:5}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[561] = {item_id:561, nshort:'mexican_neck', name:'Meksykańska chustka na szyję', type:'neck', level:28, price:600, image:'/images/items/neck/mexican_neck.png?1', image_mini:'images/items/neck/mexican_neck.png?1', bonus:{skills:{punch:17}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_mexican', name:'Komplet Meksykanina'}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[567] = {item_id:567, nshort:'amulett', name:'Naszyjnik miłości', type:'neck', level:30, price:2412, image:'/images/items/neck/amulett.png?1', image_mini:'images/items/neck/amulett.png?1', bonus:{skills:{appearance:15, animal:15, trade:15, leadership:15}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'season_set', name:'Zestaw świąteczny'}, traderlevel:100, auctionable:false, dropable:false, tradeable:true, sellable:true};
    PK_S3.items[568] = {item_id:568, nshort:'teethchain', name:'Talizman odstraszający duchy', type:'neck', level:40, price:2012, image:'/images/items/neck/teethchain.png?1', image_mini:'images/items/neck/teethchain.png?1', bonus:{skills:{tactic:4, leadership:8, hide:4}, attributes:{charisma:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:100, auctionable:false, dropable:false, tradeable:true, sellable:true};
    PK_S3.items[569] = {item_id:569, nshort:'greenhorn_neck', name:'Zakurzona chusta', type:'neck', level:1, price:350, image:'/images/items/neck/greenhorn_neck.png?1', image_mini:'images/items/neck/greenhorn_neck.png?1', bonus:{skills:{hide:1, endurance:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'greenhorn_set', name:'Zestaw nowicjusza'}, auctionable:false, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[566] = {item_id:566, nshort:'dancer_chain', name:'Perłowy naszyjnik', type:'neck', level:43, price:1800, image:'/images/items/neck/dancer_chain.png?1', image_mini:'images/items/neck/dancer_chain.png?1', characterSex:'female', bonus:{skills:{trade:9, leadership:8, pitfall:6}, attributes:{charisma:1}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_dancer', name:'Komplet Tancerki'}, auctionable:true, dropable:true, tradeable:false, sellable:true};
	
	PK_S3.items[570] = {item_id:570, nshort:'xmas_schal', name:'Szalik zimowy', type:'neck', level:1, price:2010, image:'/images/items/neck/xmas_schal.png?1', image_mini:'images/items/neck/xmas_schal.png?1', bonus:{skills:{}, attributes:{charisma:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:66, auctionable:true, dropable:false, tradeable:true, sellable:true};
	
	PK_S3.items[572] = {item_id:572, nshort:'scalp', name:'Skalp', type:'neck', level:1, price:10, image:'/images/items/neck/scalp.png?1', image_mini:'images/items/neck/scalp.png?1', bonus:{skills:{leadership:10, hide:10, endurance:10}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:66, tradeable:true, sellable:true};
	
	PK_S3.items[574] = {item_id:574, nshort:'neckband_golddigger', name:'Maska poszukiwacza złota', type:'neck', level:10, price:35, image:'/images/items/neck/neckband_golddigger.png?1', image_mini:'images/items/neck/neckband_golddigger.png?1', bonus:{skills:{trade:1, endurance:1, tough:1}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:true, tradeable:false, sellable:true};
	PK_S3.items[575] = {item_id:575, nshort:'collector_neck', name:'Naszyjnik kolekcjonera', type:'neck', level:100, price:10000, image:'/images/items/neck/collector_neck.png?1', image_mini:'images/items/neck/collector_neck.png?1', bonus:{skills:{tactic:15, ride:15}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'collector_set', name:'Zestaw kolekcjonera'}, auctionable:false, dropable:true, tradeable:false, sellable:false};
	PK_S3.items[576] = {item_id:576, nshort:'roalstad_scarf', name:'Szal Marii Roalstad', type:'neck', level:90, price:500, image:'/images/items/neck/roalstad_scarf.png?1', image_mini:'images/items/neck/roalstad_scarf.png?1', bonus:{skills:{appearance:12, trade:12, ride:16}, attributes:{charisma:3}, fortbattle:{defense:5}, fortbattlesector:{}}, set:{}, sellable:true};

/* --------------------------------------- WIERZCHOWCE --------------------------------------- */
    PK_S3.items[600] = {item_id:600, nshort:'donkey', name:'Osioł', type:'animal', level:1, price:250, image:'/images/items/animal/donkey.png?1', image_mini:'/images/items/animal/mini/donkey.png?1', speed:0.8, bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_mexican', name:'Komplet Meksykanina'}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[601] = {item_id:601, nshort:'pony', name:'Kucyk', type:'animal', level:1, price:500, image:'/images/items/animal/pony.png?1', image_mini:'/images/items/animal/mini/pony.png?1', speed:0.666, bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[602] = {item_id:602, nshort:'mustang', name:'Mustang', type:'animal', level:1, price:850, image:'/images/items/animal/mustang.png?1', image_mini:'/images/items/animal/mini/mustang.png?1', speed:0.571, bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_indian', name:'Komplet Indianina'}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[603] = {item_id:603, nshort:'berber', name:'Biały koń', type:'animal', level:1, price:1250, image:'/images/items/animal/berber.png?1', image_mini:'/images/items/animal/mini/berber.png?1', speed:0.5, bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[604] = {item_id:604, nshort:'araber', name:'Arab', type:'animal', level:1, price:2000, image:'/images/items/animal/araber.png?1', image_mini:'/images/items/animal/mini/araber.png?1', speed:0.444, bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[605] = {item_id:605, nshort:'quarter', name:'Kłusak', type:'animal', level:1, price:2800, image:'/images/items/animal/quarter.png?1', image_mini:'/images/items/animal/mini/quarter.png?1', speed:0.4, bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[606] = {item_id:606, nshort:'charriot', name:'Wóz do zaprzężenia woła', type:'animal', level:1, price:1500, image:'/images/items/animal/charriot.png?1', image_mini:'/images/items/animal/mini/charriot.png?1', speed:0.909, bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:66, auctionable:true, tradeable:true, sellable:true};
    PK_S3.items[607] = {item_id:607, nshort:'young_stallion', name:'Młody ogier', type:'animal', level:1, price:250, image:'/images/items/animal/young_stallion.png?1', image_mini:'/images/items/animal/mini/young_stallion.png?1', speed:0.8, bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'greenhorn_set', name:'Zestaw nowicjusza'}, traderlevel:66, auctionable:false, dropable:false, tradeable:true, sellable:true};
	PK_S3.items[608] = {item_id:608, nshort:'xmas_rudolph', name:'Rudolf', type:'animal', level:1, price:250, image:'/images/items/animal/xmas_rudolph.png?1', image_mini:'/images/items/animal/mini/xmas_rudolph.png?1', speed:0.8, bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:66, auctionable:true, tradeable:true, sellable:true};
    PK_S3.items[609] = {item_id:609, nshort:'xmas_slide', name:'Bożonarodzeniowe sanie', type:'animal', level:1, price:550, image:'/images/items/animal/xmas_slide.png?1', image_mini:'/images/items/animal/mini/xmas_slide.png?1', speed:0.8, bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'season_set', name:'Zestaw świąteczny'}, traderlevel:66, auctionable:false, dropable:false, tradeable:true, sellable:true};
	PK_S3.items[610] = {item_id:610, nshort:'golden_donkey', name:'Złoty osioł', type:'animal', level:1, price:0, image:'/images/items/animal/golden_donkey.png?1', image_mini:'/images/items/animal/mini/golden_donkey.png?1', speed:0.4, bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:66, tradeable:true};
	PK_S3.items[611] = {item_id:611, nshort:'camel', name:'Wielbłąd', type:'animal', level:100, price:0, image:'/images/items/animal/camel.png?1', image_mini:'/images/items/animal/mini/camel.png?1', speed:0.4, bonus:{skills:{appearance:15, swim:15}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'collector_set', name:'Zestaw kolekcjonera'}, traderlevel:66, tradeable:true};
	PK_S3.items[612] = {item_id:612, nshort:'elephant', name:'Słoń', type:'animal', level:1, price:75050, image:'/images/items/animal/elephant.png?1', image_mini:'/images/items/animal/mini/elephant.png?1', speed:0.4, bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:66, tradeable:true, sellable:true};
	PK_S3.items[613] = {item_id:613, nshort:'ostrich', name:'Struś', type:'animal', level:1, price:0, image:'/images/items/animal/ostrich.png?1', image_mini:'/images/items/animal/mini/ostrich.png?1', speed:0.4, bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:66, tradeable:true};
    PK_S3.items[614] = {item_id:614, nshort:'turtle', name:'Żółw', type:'animal', level:1, price:50, image:'/images/items/animal/turtle.png?1', image_mini:'/images/items/animal/mini/turtle.png?1', speed:0.909, bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:66, auctionable:false, dropable:false, tradeable:true, sellable:false};
	PK_S3.items[615] = {item_id:615, nshort:'bison', name:'Bizon', type:'animal', level:1, price:500, image:'/images/items/animal/bison.png?1', image_mini:'/images/items/animal/mini/bison.png?1', speed:0.666, bonus:{skills:{tough:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:66, tradeable:true};

/* --------------------------------------- PRODUKTY --------------------------------------- */
    PK_S3.items[700] = {item_id:700, nshort:'ham', name:'Szynka', type:'yield', level:0, price:10, image:'/images/items/yield/ham.png?1', image_mini:'images/items/yield/ham.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[701] = {item_id:701, nshort:'cereals', name:'Zboże', type:'yield', level:0, price:3, image:'/images/items/yield/cereals.png?1', image_mini:'images/items/yield/cereals.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[702] = {item_id:702, nshort:'tabacco', name:'Liście tytoniu', type:'yield', level:0, price:5, image:'/images/items/yield/tabacco.png?1', image_mini:'images/items/yield/tabacco.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[703] = {item_id:703, nshort:'sugar', name:'Cukier', type:'yield', level:0, price:8, image:'/images/items/yield/sugar.png?1', image_mini:'images/items/yield/sugar.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[704] = {item_id:704, nshort:'cotton', name:'Bawełna', type:'yield', level:0, price:6, image:'/images/items/yield/cotton.png?1', image_mini:'images/items/yield/cotton.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[705] = {item_id:705, nshort:'trout', name:'Pstrąg', type:'yield', level:0, price:4, image:'/images/items/yield/trout.png?1', image_mini:'images/items/yield/trout.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[706] = {item_id:706, nshort:'berrys', name:'Jagody', type:'yield', level:0, price:4, image:'/images/items/yield/berrys.png?1', image_mini:'images/items/yield/berrys.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[707] = {item_id:707, nshort:'shearings', name:'Wełna', type:'yield', level:0, price:8, image:'/images/items/yield/shearings.png?1', image_mini:'images/items/yield/shearings.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[708] = {item_id:708, nshort:'copper_pyrites', name:'Piryt', type:'yield', level:0, price:16, image:'/images/items/yield/copper_pyrites.png?1', image_mini:'images/items/yield/copper_pyrites.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[709] = {item_id:709, nshort:'turkey', name:'Indyk', type:'yield', level:0, price:14, image:'/images/items/yield/turkey.png?1', image_mini:'images/items/yield/turkey.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[710] = {item_id:710, nshort:'beef', name:'Stek', type:'yield', level:0, price:24, image:'/images/items/yield/beef.png?1', image_mini:'images/items/yield/beef.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[711] = {item_id:711, nshort:'planks', name:'Drewno', type:'yield', level:0, price:16, image:'/images/items/yield/planks.png?1', image_mini:'images/items/yield/planks.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[712] = {item_id:712, nshort:'leather', name:'Skóra', type:'yield', level:0, price:16, image:'/images/items/yield/leather.png?1', image_mini:'images/items/yield/leather.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	
    PK_S3.items[714] = {item_id:714, nshort:'beaver', name:'Skóra z bobra', type:'yield', level:0, price:36, image:'/images/items/yield/beaver.png?1', image_mini:'images/items/yield/beaver.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[715] = {item_id:715, nshort:'fabric', name:'Sukno', type:'yield', level:0, price:22, image:'/images/items/yield/fabric.png?1', image_mini:'images/items/yield/fabric.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[716] = {item_id:716, nshort:'stone', name:'Kamienie', type:'yield', level:0, price:10, image:'/images/items/yield/stone.png?1', image_mini:'images/items/yield/stone.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[717] = {item_id:717, nshort:'grund', name:'Łosoś', type:'yield', level:0, price:14, image:'/images/items/yield/grund.png?1', image_mini:'images/items/yield/grund.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[718] = {item_id:718, nshort:'coyote', name:'Ząb kojota', type:'yield', level:0, price:42, image:'/images/items/yield/coyote.png?1', image_mini:'images/items/yield/coyote.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[719] = {item_id:719, nshort:'cigar', name:'Cygara', type:'yield', level:0, price:24, image:'/images/items/yield/cigar.png?1', image_mini:'images/items/yield/cigar.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[720] = {item_id:720, nshort:'gems', name:'Kamienie półszlachetne', type:'yield', level:0, price:70, image:'/images/items/yield/gems.png?1', image_mini:'images/items/yield/gems.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[721] = {item_id:721, nshort:'coal', name:'Węgiel', type:'yield', level:0, price:20, image:'/images/items/yield/coal.png?1', image_mini:'images/items/yield/coal.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[722] = {item_id:722, nshort:'meal', name:'Ciepły posiłek', type:'yield', level:0, price:14, image:'/images/items/yield/meal.png?1', image_mini:'images/items/yield/meal.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[723] = {item_id:723, nshort:'ring', name:'Pierścionek', type:'yield', level:0, price:160, image:'/images/items/yield/ring.png?1', image_mini:'images/items/yield/ring.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_pilgrim_female', name:'Komplet Pielgrzyma(damski)'}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[724] = {item_id:724, nshort:'buffalo', name:'Skóra z bizona', type:'yield', level:0, price:40, image:'/images/items/yield/buffalo.png?1', image_mini:'images/items/yield/buffalo.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[725] = {item_id:725, nshort:'silver', name:'Srebro', type:'yield', level:0, price:200, image:'/images/items/yield/silver.png?1', image_mini:'images/items/yield/silver.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[726] = {item_id:726, nshort:'indiangold', name:'Złoto Azteków', type:'yield', level:0, price:290, image:'/images/items/yield/indiangold.png?1', image_mini:'images/items/yield/indiangold.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[727] = {item_id:727, nshort:'medal', name:'Medal zasłużonych', type:'yield', level:0, price:500, image:'/images/items/yield/medal.png?1', image_mini:'images/items/yield/medal.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[728] = {item_id:728, nshort:'watch', name:'Zegarek kieszonkowy', type:'yield', level:0, price:210, image:'/images/items/yield/watch.png?1', image_mini:'images/items/yield/watch.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[729] = {item_id:729, nshort:'stolen_goods', name:'Towar przemycany', type:'yield', level:0, price:110, image:'/images/items/yield/stolen_goods.png?1', image_mini:'images/items/yield/stolen_goods.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[730] = {item_id:730, nshort:'necklet', name:'Biżuteria damska', type:'yield', level:0, price:230, image:'/images/items/yield/necklet.png?1', image_mini:'images/items/yield/necklet.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[731] = {item_id:731, nshort:'grizzly', name:'Trofeum', type:'yield', level:0, price:150, image:'/images/items/yield/grizzly.png?1', image_mini:'images/items/yield/grizzly.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	
    PK_S3.items[733] = {item_id:733, nshort:'packet', name:'Paczka', type:'yield', level:0, price:32, image:'/images/items/yield/packet.png?1', image_mini:'images/items/yield/packet.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[734] = {item_id:734, nshort:'slicer', name:'Hebel', type:'yield', level:0, price:44, image:'/images/items/yield/slicer.png?1', image_mini:'images/items/yield/slicer.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	
    PK_S3.items[736] = {item_id:736, nshort:'spade', name:'Łopata', type:'yield', level:0, price:40, image:'/images/items/yield/spade.png?1', image_mini:'images/items/yield/spade.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[737] = {item_id:737, nshort:'dynamite', name:'Dynamit', type:'yield', level:0, price:80, image:'/images/items/yield/dynamite.png?1', image_mini:'images/items/yield/dynamite.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	
	PK_S3.items[739] = {item_id:739, nshort:'fence', name:'Drut kolczasty', type:'yield', level:0, price:36, image:'/images/items/yield/fence.png?1', image_mini:'images/items/yield/fence.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[740] = {item_id:740, nshort:'horn', name:'Krowi róg', type:'yield', level:0, price:78, image:'/images/items/yield/horn.png?1', image_mini:'images/items/yield/horn.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[741] = {item_id:741, nshort:'pitcher', name:'Dzban', type:'yield', level:0, price:24, image:'/images/items/yield/pitcher.png?1', image_mini:'images/items/yield/pitcher.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[742] = {item_id:742, nshort:'saw', name:'Piła', type:'yield', level:0, price:40, image:'/images/items/yield/saw.png?1', image_mini:'images/items/yield/saw.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[743] = {item_id:743, nshort:'poster', name:'Plakat', type:'yield', level:0, price:4, image:'/images/items/yield/poster.png?1', image_mini:'images/items/yield/poster.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[744] = {item_id:744, nshort:'newspaper', name:'Gazeta "Echo The West"', type:'yield', level:0, price:6, image:'/images/items/yield/newspaper.png?1', image_mini:'images/items/yield/newspaper.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[745] = {item_id:745, nshort:'flour', name:'Mąka', type:'yield', level:0, price:5, image:'/images/items/yield/flour.png?1', image_mini:'images/items/yield/flour.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[746] = {item_id:746, nshort:'beans', name:'Fasola', type:'yield', level:0, price:6, image:'/images/items/yield/beans.png?1', image_mini:'images/items/yield/beans.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[747] = {item_id:747, nshort:'hammer', name:'Młotek', type:'yield', level:0, price:22, image:'/images/items/yield/hammer.png?1', image_mini:'images/items/yield/hammer.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[748] = {item_id:748, nshort:'corn', name:'Kukurydza', type:'yield', level:0, price:4, image:'/images/items/yield/corn.png?1', image_mini:'images/items/yield/corn.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[749] = {item_id:749, nshort:'rope', name:'Lasso', type:'yield', level:0, price:32, image:'/images/items/yield/rope.png?1', image_mini:'images/items/yield/rope.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[750] = {item_id:750, nshort:'nippers', name:'Kajdanki', type:'yield', level:0, price:58, image:'/images/items/yield/nippers.png?1', image_mini:'images/items/yield/nippers.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[751] = {item_id:751, nshort:'pipe', name:'Fajka pokoju', type:'yield', level:0, price:72, image:'/images/items/yield/pipe.png?1', image_mini:'images/items/yield/pipe.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[752] = {item_id:752, nshort:'oil', name:'Ropa', type:'yield', level:0, price:76, image:'/images/items/yield/oil.png?1', image_mini:'images/items/yield/oil.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[753] = {item_id:753, nshort:'pick', name:'Kilof', type:'yield', level:0, price:44, image:'/images/items/yield/pick.png?1', image_mini:'images/items/yield/pick.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[754] = {item_id:754, nshort:'horseshoe', name:'Podkowa', type:'yield', level:0, price:30, image:'/images/items/yield/horseshoe.png?1', image_mini:'images/items/yield/horseshoe.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[755] = {item_id:755, nshort:'flag', name:'Chorągiewka', type:'yield', level:0, price:32, image:'/images/items/yield/flag.png?1', image_mini:'images/items/yield/flag.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[756] = {item_id:756, nshort:'toolbox', name:'Skrzynka z narzędziami', type:'yield', level:0, price:110, image:'/images/items/yield/toolbox.png?1', image_mini:'images/items/yield/toolbox.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[757] = {item_id:757, nshort:'feather', name:'Pióro kruka', type:'yield', level:0, price:8, image:'/images/items/yield/feather.png?1', image_mini:'images/items/yield/feather.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[758] = {item_id:758, nshort:'flag_north', name:'Flaga Stanów Północnych', type:'yield', level:0, price:86, image:'/images/items/yield/flag_north.png?1', image_mini:'images/items/yield/flag_north.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[759] = {item_id:759, nshort:'ticket', name:'Bilet kolejowy', type:'yield', level:0, price:34, image:'/images/items/yield/ticket.png?1', image_mini:'images/items/yield/ticket.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[760] = {item_id:760, nshort:'map', name:'Mapa', type:'yield', level:0, price:32, image:'/images/items/yield/map.png?1', image_mini:'images/items/yield/map.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[761] = {item_id:761, nshort:'sledgehammer', name:'Młot kowalski', type:'yield', level:0, price:52, image:'/images/items/yield/sledgehammer.png?1', image_mini:'images/items/yield/sledgehammer.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[762] = {item_id:762, nshort:'flag_south', name:'Flaga Stanów Południowych', type:'yield', level:0, price:86, image:'/images/items/yield/flag_south.png?1', image_mini:'images/items/yield/flag_south.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[763] = {item_id:763, nshort:'wolf', name:'Bransoleta z zębem', type:'yield', level:0, price:44, image:'/images/items/yield/wolf.png?1', image_mini:'images/items/yield/wolf.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[764] = {item_id:764, nshort:'shackle', name:'Okowy', type:'yield', level:0, price:62, image:'/images/items/yield/shackle.png?1', image_mini:'images/items/yield/shackle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[765] = {item_id:765, nshort:'sickle', name:'Sierp', type:'yield', level:0, price:44, image:'/images/items/yield/sickle.png?1', image_mini:'images/items/yield/sickle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[766] = {item_id:766, nshort:'water', name:'Szklanka wody', type:'yield', level:0, price:6, image:'/images/items/yield/water.png?1', image_mini:'images/items/yield/water.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[767] = {item_id:767, nshort:'string', name:'Szpulka drutu', type:'yield', level:0, price:34, image:'/images/items/yield/string.png?1', image_mini:'images/items/yield/string.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[768] = {item_id:768, nshort:'hymnal', name:'Śpiewnik', type:'yield', level:0, price:48, image:'/images/items/yield/hymnal.png?1', image_mini:'images/items/yield/hymnal.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_pilgrim_male', name:'Komplet Pielgrzyma'}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[769] = {item_id:769, nshort:'empty_bottle', name:'Pusta butelka', type:'yield', level:0, price:2, image:'/images/items/yield/empty_bottle.png?1', image_mini:'images/items/yield/empty_bottle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[770] = {item_id:770, nshort:'beer', name:'Piwo', type:'yield', level:0, price:0, image:'/images/items/yield/beer.png?1', image_mini:'images/items/yield/beer.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[771] = {item_id:771, nshort:'trap', name:'Pułapka na bobry', type:'yield', level:0, price:50, image:'/images/items/yield/trap.png?1', image_mini:'images/items/yield/trap.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[772] = {item_id:772, nshort:'falcon', name:'Złoty Sokół', type:'yield', level:0, price:0, image:'/images/items/yield/falcon.png?1', image_mini:'images/items/yield/falcon.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[773] = {item_id:773, nshort:'paper1', name:'Kawałek kartki (część 1)', type:'yield', level:0, price:1400, image:'/images/items/yield/paper1.png?1', image_mini:'images/items/yield/paper1.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:true, tradeable:false, sellable:true};
    PK_S3.items[774] = {item_id:774, nshort:'paper2', name:'Kawałek kartki (część 2)', type:'yield', level:0, price:590, image:'/images/items/yield/paper2.png?1', image_mini:'images/items/yield/paper2.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[775] = {item_id:775, nshort:'paper3', name:'Kawałek kartki (część 3)', type:'yield', level:0, price:590, image:'/images/items/yield/paper3.png?1', image_mini:'images/items/yield/paper3.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[776] = {item_id:776, nshort:'kates_ring', name:'Pierścień Kate', type:'yield', level:0, price:1000, image:'/images/items/yield/kates_ring.png?1', image_mini:'images/items/yield/kates_ring.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[777] = {item_id:777, nshort:'brush', name:'Szczotka dla konia', type:'yield', level:0, price:16, image:'/images/items/yield/brush.png?1', image_mini:'images/items/yield/brush.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
	PK_S3.items[778] = {item_id:778, nshort:'cooking_pot', name:'Garnek do gotowania', type:'yield', level:0, price:22, image:'/images/items/yield/cooking_pot.png?1', image_mini:'images/items/yield/cooking_pot.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[779] = {item_id:779, nshort:'post_horn', name:'Trąbka pocztyliona', type:'yield', level:0, price:60, image:'/images/items/yield/post_horn.png?1', image_mini:'images/items/yield/post_horn.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[780] = {item_id:780, nshort:'rounds', name:'Naboje', type:'yield', level:0, price:50, image:'/images/items/yield/rounds.png?1', image_mini:'images/items/yield/rounds.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[781] = {item_id:781, nshort:'documents', name:'Dokumenty', type:'yield', level:0, price:120, image:'/images/items/yield/documents.png?1', image_mini:'images/items/yield/documents.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[782] = {item_id:782, nshort:'angle', name:'Wędka', type:'yield', level:0, price:42, image:'/images/items/yield/angle.png?1', image_mini:'images/items/yield/angle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[783] = {item_id:783, nshort:'gold_sculpture', name:'Złota figura', type:'yield', level:0, price:144, image:'/images/items/yield/gold_sculpture.png?1', image_mini:'images/items/yield/gold_sculpture.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[784] = {item_id:784, nshort:'nails', name:'Gwoździe', type:'yield', level:0, price:8, image:'/images/items/yield/nails.png?1', image_mini:'images/items/yield/nails.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	
    PK_S3.items[786] = {item_id:786, nshort:'picture', name:'Obraz', type:'yield', level:0, price:340, image:'/images/items/yield/picture.png?1', image_mini:'images/items/yield/picture.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[787] = {item_id:787, nshort:'saddle', name:'Siodło', type:'yield', level:0, price:80, image:'/images/items/yield/saddle.png?1', image_mini:'images/items/yield/saddle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[788] = {item_id:788, nshort:'bell', name:'Dzwon okrętowy', type:'yield', level:0, price:130, image:'/images/items/yield/bell.png?1', image_mini:'images/items/yield/bell.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[789] = {item_id:789, nshort:'coin', name:'Ćwierćdolarówka', type:'yield', level:0, price:2, image:'/images/items/yield/coin.png?1', image_mini:'images/items/yield/coin.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[790] = {item_id:790, nshort:'iron', name:'Pręty metalowe', type:'yield', level:0, price:36, image:'/images/items/yield/iron.png?1', image_mini:'images/items/yield/iron.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[791] = {item_id:791, nshort:'orange', name:'Pomarańcza', type:'yield', level:0, price:8, image:'/images/items/yield/orange.png?1', image_mini:'images/items/yield/orange.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[792] = {item_id:792, nshort:'tequila', name:'Tequila', type:'yield', level:0, price:24, image:'/images/items/yield/tequila.png?1', image_mini:'images/items/yield/tequila.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_mexican', name:'Komplet Meksykanina'}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[793] = {item_id:793, nshort:'tomato', name:'Pomidor', type:'yield', level:0, price:6, image:'/images/items/yield/tomato.png?1', image_mini:'images/items/yield/tomato.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[794] = {item_id:794, nshort:'potion', name:'Eliksir', type:'yield', level:0, price:360, image:'/images/items/yield/potion.png?1', image_mini:'images/items/yield/potion.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_quackery', name:'Komplet Konowała'}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[795] = {item_id:795, nshort:'peg', name:'Pal drewniany', type:'yield', level:0, price:15, image:'/images/items/yield/peg.png?1', image_mini:'images/items/yield/peg.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[796] = {item_id:796, nshort:'brush_shoe', name:'Szczotka do butów', type:'yield', level:0, price:14, image:'/images/items/yield/brush_shoe.png?1', image_mini:'images/items/yield/brush_shoe.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[797] = {item_id:797, nshort:'pitchfork', name:'Widły', type:'yield', level:0, price:32, image:'/images/items/yield/pitchfork.png?1', image_mini:'images/items/yield/pitchfork.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_farmer', name:'Komplet Farmera'}, auctionable:true, dropable:false, tradeable:false, sellable:true};

/* --------------------------------------- BRONIE PALNE --------------------------------------- */
    PK_S3.items[800] = {item_id:800, nshort:'stone_pebble', name:'Krzemień', type:'right_arm', level:2, price:15, image:'/images/items/right_arm/stone_pebble.png?1', image_mini:'/images/items/right_arm/mini/stone_pebble.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:1, damage_max:7}, sub_type:'shot'};
    PK_S3.items[801] = {item_id:801, nshort:'stone_flint', name:'Wzbogacony Krzemień', type:'right_arm', level:5, price:26, image:'/images/items/right_arm/stone_flint.png?1', image_mini:'/images/items/right_arm/mini/stone_flint.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:1, damage_max:11}, sub_type:'shot'};
    PK_S3.items[802] = {item_id:802, nshort:'stone_granite', name:'Granit', type:'right_arm', level:8, price:46, image:'/images/items/right_arm/stone_granite.png?1', image_mini:'/images/items/right_arm/mini/stone_granite.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:1, damage_max:15}, sub_type:'shot'};
	
    PK_S3.items[803] = {item_id:803, nshort:'crutch_rusty', name:'Wytarta proca', type:'right_arm', level:7, price:26, image:'/images/items/right_arm/crutch_rusty.png?1', image_mini:'/images/items/right_arm/mini/crutch_rusty.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:4, damage_max:8}, sub_type:'shot'};
    PK_S3.items[804] = {item_id:804, nshort:'crutch', name:'Proca', type:'right_arm', level:10, price:63, image:'/images/items/right_arm/crutch.png?1', image_mini:'/images/items/right_arm/mini/crutch.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:6, damage_max:12}, sub_type:'shot'};
    PK_S3.items[805] = {item_id:805, nshort:'crutch_accurate', name:'Precyzyjna proca', type:'right_arm', level:13, price:148, image:'/images/items/right_arm/crutch_accurate.png?1', image_mini:'/images/items/right_arm/mini/crutch_accurate.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:9, damage_max:17}, sub_type:'shot'};
    PK_S3.items[806] = {item_id:806, nshort:'crutch_huckeberry', name:'Proca Huckleberry\'ego', type:'right_arm', level:20, price:1360, image:'/images/items/right_arm/crutch_huckeberry.png?1', image_mini:'/images/items/right_arm/mini/crutch_huckeberry.png?1', bonus:{skills:{swim:3, ride:3}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:true, tradeable:false, sellable:true, damage:{damage_min:20, damage_max:40}, sub_type:'shot'};
	
    PK_S3.items[807] = {item_id:807, nshort:'leadshot_rusty', name:'Zardzewiała broń śrutowa', type:'right_arm', level:17, price:124, image:'/images/items/right_arm/leadshot_rusty.png?1', image_mini:'/images/items/right_arm/mini/leadshot_rusty.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:5, damage_max:19}, sub_type:'shot'};
    PK_S3.items[808] = {item_id:808, nshort:'leadshot', name:'Pistolet śrutowy', type:'right_arm', level:20, price:384, image:'/images/items/right_arm/leadshot.png?1', image_mini:'/images/items/right_arm/mini/leadshot.png?1', bonus:{skills:{tough:1}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:8, damage_max:28}, sub_type:'shot'};
    PK_S3.items[809] = {item_id:809, nshort:'leadshot_accurate', name:'Precyzyjna broń śrutowa', type:'right_arm', level:23, price:550, image:'/images/items/right_arm/leadshot_accurate.png?1', image_mini:'/images/items/right_arm/mini/leadshot_accurate.png?1', bonus:{skills:{tough:1}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:10, damage_max:36}, sub_type:'shot'};
    PK_S3.items[810] = {item_id:810, nshort:'leadshot_granmonts', name:'Pistolet Granmonta', type:'right_arm', level:30, price:2680, image:'/images/items/right_arm/leadshot_granmonts.png?1', image_mini:'/images/items/right_arm/mini/leadshot_granmonts.png?1', bonus:{skills:{finger_dexterity:4, tough:3}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:true, tradeable:false, sellable:true, damage:{damage_min:15, damage_max:89}, sub_type:'shot'};
	
    PK_S3.items[811] = {item_id:811, nshort:'muzzleloader_rusty', name:'Zardzewiała broń odprzodowa', type:'right_arm', level:22, price:326, image:'/images/items/right_arm/muzzleloader_rusty.png?1', image_mini:'/images/items/right_arm/mini/muzzleloader_rusty.png?1', bonus:{skills:{aim:1}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:10, damage_max:22}, sub_type:'shot'};
    PK_S3.items[812] = {item_id:812, nshort:'muzzleloader', name:'Broń odprzodowa', type:'right_arm', level:25, price:545, image:'/images/items/right_arm/muzzleloader.png?1', image_mini:'/images/items/right_arm/mini/muzzleloader.png?1', bonus:{skills:{aim:1}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:15, damage_max:31}, sub_type:'shot'};
    PK_S3.items[813] = {item_id:813, nshort:'muzzleloader_accurate', name:'Precyzyjna broń odprzodowa', type:'right_arm', level:28, price:940, image:'/images/items/right_arm/muzzleloader_accurate.png?1', image_mini:'/images/items/right_arm/mini/muzzleloader_accurate.png?1', bonus:{skills:{aim:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:24, damage_max:36}, sub_type:'shot'};
    PK_S3.items[814] = {item_id:814, nshort:'muzzleloader_drake', name:'Pistolet odprzodowy Francisa Drake\'a', type:'right_arm', level:35, price:3580, image:'/images/items/right_arm/muzzleloader_drake.png?1', image_mini:'/images/items/right_arm/mini/muzzleloader_drake.png?1', bonus:{skills:{aim:4, swim:4}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:true, tradeable:false, sellable:true, damage:{damage_min:47, damage_max:79}, sub_type:'shot'};
	
    PK_S3.items[815] = {item_id:815, nshort:'deringer_rusty', name:'Rdzawy Deringer', type:'right_arm', level:32, price:730, image:'/images/items/right_arm/deringer_rusty.png?1', image_mini:'/images/items/right_arm/mini/deringer_rusty.png?1', bonus:{skills:{reflex:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:18, damage_max:32}, sub_type:'shot'};
    PK_S3.items[816] = {item_id:816, nshort:'deringer', name:'Deringer', type:'right_arm', level:35, price:1280, image:'/images/items/right_arm/deringer.png?1', image_mini:'/images/items/right_arm/mini/deringer.png?1', bonus:{skills:{reflex:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:29, damage_max:45}, sub_type:'shot'};
    PK_S3.items[817] = {item_id:817, nshort:'deringer_accurate', name:'Precyzyjny Deringer', type:'right_arm', level:38, price:1655, image:'/images/items/right_arm/deringer_accurate.png?1', image_mini:'/images/items/right_arm/mini/deringer_accurate.png?1', bonus:{skills:{reflex:3}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:30, damage_max:54}, sub_type:'shot'};
    PK_S3.items[818] = {item_id:818, nshort:'deringer_bellestar', name:'Deringer Belle Starr', type:'right_arm', level:45, price:5500, image:'/images/items/right_arm/deringer_bellestar.png?1', image_mini:'/images/items/right_arm/mini/deringer_bellestar.png?1', bonus:{skills:{hide:4, reflex:5}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:true, tradeable:false, sellable:true, damage:{damage_min:71, damage_max:97}, sub_type:'shot'};
	
    PK_S3.items[819] = {item_id:819, nshort:'pepperbox_rusty', name:'Zardzewiały rewolwer wiązkowy', type:'right_arm', level:37, price:940, image:'/images/items/right_arm/pepperbox_rusty.png?1', image_mini:'/images/items/right_arm/mini/pepperbox_rusty.png?1', bonus:{skills:{dodge:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:13, damage_max:47}, sub_type:'shot'};
    PK_S3.items[820] = {item_id:820, nshort:'pepperbox', name:'Rewolwer wiązkowy', type:'right_arm', level:40, price:1440, image:'/images/items/right_arm/pepperbox.png?1', image_mini:'/images/items/right_arm/mini/pepperbox.png?1', bonus:{skills:{dodge:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:23, damage_max:57}, sub_type:'shot'};
    PK_S3.items[821] = {item_id:821, nshort:'pepperbox_accurate', name:'Precyzyjny rewolwer wiązkowy', type:'right_arm', level:43, price:2150, image:'/images/items/right_arm/pepperbox_accurate.png?1', image_mini:'/images/items/right_arm/mini/pepperbox_accurate.png?1', bonus:{skills:{dodge:3}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:27, damage_max:73}, sub_type:'shot'};
    PK_S3.items[822] = {item_id:822, nshort:'pepperbox_allen', name:'Rewolwer wiązkowy Allena', type:'right_arm', level:50, price:6850, image:'/images/items/right_arm/pepperbox_allen.png?1', image_mini:'/images/items/right_arm/mini/pepperbox_allen.png?1', bonus:{skills:{leadership:6, aim:5}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:true, tradeable:false, sellable:true, damage:{damage_min:33, damage_max:153}, sub_type:'shot'};
	
    PK_S3.items[823] = {item_id:823, nshort:'smith_rusty', name:'Zardzewiały Smith & Wesson Model 1 ', type:'right_arm', level:47, price:1650, image:'/images/items/right_arm/smith_rusty.png?1', image_mini:'/images/items/right_arm/mini/smith_rusty.png?1', bonus:{skills:{shot:3}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:38, damage_max:46}, sub_type:'shot'};
    PK_S3.items[824] = {item_id:824, nshort:'smith', name:'Smith & Wesson Model 1', type:'right_arm', level:50, price:2350, image:'/images/items/right_arm/smith.png?1', image_mini:'/images/items/right_arm/mini/smith.png?1', bonus:{skills:{shot:3}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:49, damage_max:57}, sub_type:'shot'};
    PK_S3.items[825] = {item_id:825, nshort:'smith_accurate', name:'Precyzyjny Smith & Wesson Model 1 ', type:'right_arm', level:53, price:3180, image:'/images/items/right_arm/smith_accurate.png?1', image_mini:'/images/items/right_arm/mini/smith_accurate.png?1', bonus:{skills:{shot:4}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:60, damage_max:66}, sub_type:'shot'};
    PK_S3.items[826] = {item_id:826, nshort:'smith_younger', name:'Rewolwer Youngera', type:'right_arm', level:60, price:8700, image:'/images/items/right_arm/smith_younger.png?1', image_mini:'/images/items/right_arm/mini/smith_younger.png?1', bonus:{skills:{pitfall:7, shot:6}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:true, tradeable:false, sellable:true, damage:{damage_min:105, damage_max:125}, sub_type:'shot'};
	
    PK_S3.items[827] = {item_id:827, nshort:'remington_rusty', name:'Zardzewiały Remington', type:'right_arm', level:52, price:2150, image:'/images/items/right_arm/remington_rusty.png?1', image_mini:'/images/items/right_arm/mini/remington_rusty.png?1', bonus:{skills:{tough:3}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:11, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:41, damage_max:59}, sub_type:'shot'};
    PK_S3.items[828] = {item_id:828, nshort:'remington', name:'Remington', type:'right_arm', level:55, price:2950, image:'/images/items/right_arm/remington.png?1', image_mini:'/images/items/right_arm/mini/remington.png?1', bonus:{skills:{tough:4}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:11, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:49, damage_max:71}, sub_type:'shot'};
    PK_S3.items[829] = {item_id:829, nshort:'remington_accurate', name:'Precyzyjny Remington', type:'right_arm', level:58, price:3940, image:'/images/items/right_arm/remington_accurate.png?1', image_mini:'/images/items/right_arm/mini/remington_accurate.png?1', bonus:{skills:{tough:5}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:11, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:63, damage_max:79}, sub_type:'shot'};
	PK_S3.items[830] = {item_id:830, nshort:'remington_ike', name:'Rewolwer Ike\'a', type:'right_arm', level:65, price:9400, image:'/images/items/right_arm/remington_ike.png?1', image_mini:'/images/items/right_arm/mini/remington_ike.png?1', bonus:{skills:{endurance:7, tough:7}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:true, sellable:true, damage:{damage_min:97, damage_max:133}, sub_type:'shot'};
	
    PK_S3.items[831] = {item_id:831, nshort:'peacemaker_rusty', name:'Zardzewiały Colt Peacemaker', type:'right_arm', level:62, price:3380, image:'/images/items/right_arm/peacemaker_rusty.png?1', image_mini:'/images/items/right_arm/mini/peacemaker_rusty.png?1', bonus:{skills:{appearance:4}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:13, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:45, damage_max:85}, sub_type:'shot'};
    PK_S3.items[832] = {item_id:832, nshort:'peacemaker', name:'Colt Peacemaker', type:'right_arm', level:65, price:4570, image:'/images/items/right_arm/peacemaker.png?1', image_mini:'/images/items/right_arm/mini/peacemaker.png?1', bonus:{skills:{appearance:5}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:13, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:55, damage_max:99}, sub_type:'shot'};
    PK_S3.items[833] = {item_id:833, nshort:'peacemaker_accurate', name:'Precyzyjny Colt Peacemaker', type:'right_arm', level:68, price:5400, image:'/images/items/right_arm/peacemaker_accurate.png?1', image_mini:'/images/items/right_arm/mini/peacemaker_accurate.png?1', bonus:{skills:{appearance:6}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:13, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:60, damage_max:112}, sub_type:'shot'};
	PK_S3.items[834] = {item_id:834, nshort:'peacemaker_billy', name:'Colt Peacemaker Billa', type:'right_arm', level:75, price:10300, image:'/images/items/right_arm/peacemaker_billy.png?1', image_mini:'/images/items/right_arm/mini/peacemaker_billy.png?1', bonus:{skills:{appearance:7, health:8}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:true, sellable:true, damage:{damage_min:79, damage_max:163}, sub_type:'shot'};
    PK_S3.items[835] = {item_id:835, nshort:'schofield_rusty', name:'Zardzewiały Smith & Wesson Schofield', type:'right_arm', level:67, price:4250, image:'/images/items/right_arm/schofield_rusty.png?1', image_mini:'/images/items/right_arm/mini/schofield_rusty.png?1', bonus:{skills:{tactic:5}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:14, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:60, damage_max:90}, sub_type:'shot'};
    PK_S3.items[836] = {item_id:836, nshort:'schofield', name:'Smith & Wesson Schofield', type:'right_arm', level:70, price:5230, image:'/images/items/right_arm/schofield.png?1', image_mini:'/images/items/right_arm/mini/schofield.png?1', bonus:{skills:{tactic:6}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:14, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:69, damage_max:99}, sub_type:'shot'};
    PK_S3.items[837] = {item_id:837, nshort:'schofield_accurate', name:'Precyzyjny Smith & Wesson Schofield', type:'right_arm', level:73, price:6400, image:'/images/items/right_arm/schofield_accurate.png?1', image_mini:'/images/items/right_arm/mini/schofield_accurate.png?1', bonus:{skills:{tactic:7}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:14, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:79, damage_max:111}, sub_type:'shot'};
    PK_S3.items[838] = {item_id:838, nshort:'schofield_jessejames', name:'Smith & Wesson Schofield Jesseiego James\'a', type:'right_arm', level:80, price:10600, image:'/images/items/right_arm/schofield_jessejames.png?1', image_mini:'/images/items/right_arm/mini/schofield_jessejames.png?1', bonus:{skills:{trade:8, tactic:8}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:true, tradeable:false, sellable:true, damage:{damage_min:96, damage_max:148}, sub_type:'shot'};
	
    PK_S3.items[839] = {item_id:839, nshort:'buntline_rusty', name:'Zardzewiały Colt Buntline', type:'right_arm', level:72, price:5375, image:'/images/items/right_arm/buntline_rusty.png?1', image_mini:'/images/items/right_arm/mini/buntline_rusty.png?1', bonus:{skills:{reflex:7}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:15, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:77, damage_max:91}, sub_type:'shot'};
    PK_S3.items[840] = {item_id:840, nshort:'buntline', name:'Colt Buntline', type:'right_arm', level:75, price:6250, image:'/images/items/right_arm/buntline.png?1', image_mini:'/images/items/right_arm/mini/buntline.png?1', bonus:{skills:{reflex:7}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:15, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:87, damage_max:99}, sub_type:'shot'};
    PK_S3.items[841] = {item_id:841, nshort:'buntline_accurate', name:'Precyzyjny Colt Buntline', type:'right_arm', level:78, price:7250, image:'/images/items/right_arm/buntline_accurate.png?1', image_mini:'/images/items/right_arm/mini/buntline_accurate.png?1', bonus:{skills:{reflex:7}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:15, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:89, damage_max:115}, sub_type:'shot'};
    PK_S3.items[842] = {item_id:842, nshort:'buntline_wyattearp', name:'Wyatt Earp\'s Colt Buntline', type:'right_arm', level:85, price:11200, image:'/images/items/right_arm/buntline_wyattearp.png?1', image_mini:'/images/items/right_arm/mini/buntline_wyattearp.png?1', bonus:{skills:{tactic:7, aim:4, reflex:4, health:4}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:true, tradeable:false, sellable:true, damage:{damage_min:124, damage_max:126}, sub_type:'shot'};
	
    PK_S3.items[843] = {item_id:843, nshort:'boomerang', name:'Bumerang', type:'right_arm', level:8, price:126, image:'/images/items/right_arm/boomerang.png?1', image_mini:'/images/items/right_arm/mini/boomerang.png?1', characterClass:'duelist', bonus:{skills:{reflex:1}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true, damage:{damage_min:1, damage_max:17}, sub_type:'shot'};
    PK_S3.items[844] = {item_id:844, nshort:'throwing_knives', name:'Nóż do rzucania', type:'right_arm', level:33, price:1152, image:'/images/items/right_arm/throwing_knives.png?1', image_mini:'/images/items/right_arm/mini/throwing_knives.png?1', characterClass:'duelist', bonus:{skills:{hide:3}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true, damage:{damage_min:2, damage_max:66}, sub_type:'shot'};
    PK_S3.items[845] = {item_id:845, nshort:'sawed_off', name:'Krótka śrutówka', type:'right_arm', level:51, price:2940, image:'/images/items/right_arm/sawed_off.png?1', image_mini:'/images/items/right_arm/mini/sawed_off.png?1', characterClass:'duelist', bonus:{skills:{appearance:3, shot:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true, damage:{damage_min:20, damage_max:88}, sub_type:'shot'};
	PK_S3.items[846] = {item_id:846, nshort:'trompet', name:'Trąba', type:'right_arm', level:20, price:1200, image:'/images/items/right_arm/trompet.png?1', image_mini:'/images/items/right_arm/mini/trompet.png?1', characterClass:'soldier', bonus:{skills:{}, attributes:{charisma:6}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true, damage:{damage_min:7, damage_max:14}, sub_type:'shot'};

    PK_S3.items[854] = {item_id:854, nshort:'elixier', name:'Żrący kwas', type:'right_arm', level:42, price:1500, image:'/images/items/right_arm/elixier.png?1', image_mini:'/images/items/right_arm/mini/elixier.png?1', bonus:{skills:{appearance:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_quackery', name:'Komplet Konowała'}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:4, damage_max:80}, sub_type:'shot'};
    PK_S3.items[856] = {item_id:856, nshort:'smells_like_eggspirit', name:'Zgniłe jajka', type:'right_arm', level:45, price:2500, image:'/images/items/right_arm/smells_like_eggspirit.png?1', image_mini:'/images/items/right_arm/mini/smells_like_eggspirit.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'season_set', name:'Zestaw świąteczny'}, auctionable:false, dropable:false, tradeable:false, sellable:true, damage:{damage_min:36, damage_max:49}, sub_type:'shot'};
	PK_S3.items[857] = {item_id:857, nshort:'fakegolden_gun', name:'Podrobiony złoty Colt', type:'right_arm', level:80, price:10500, image:'/images/items/right_arm/fakegolden_gun.png?1', image_mini:'/images/items/right_arm/mini/fakegolden_gun.png?1', bonus:{skills:{shot:5, aim:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:100, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:81, damage_max:119}, sub_type:'shot'};
    PK_S3.items[858] = {item_id:858, nshort:'golden_gun', name:'Złoty Colt', type:'right_arm', level:70, price:22500, image:'/images/items/right_arm/golden_gun.png?1', image_mini:'/images/items/right_arm/mini/golden_gun.png?1', bonus:{skills:{shot:8, aim:4}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'gold_set', name:'Złoty komplet'}, traderlevel:100, auctionable:false, dropable:false, tradeable:true, sellable:false, damage:{damage_min:101, damage_max:149}, sub_type:'shot'};
    PK_S3.items[859] = {item_id:859, nshort:'greenhorn_gun', name:'Proca nowicjusza', type:'right_arm', level:6, price:550, image:'/images/items/right_arm/greenhorn_gun.png?1', image_mini:'/images/items/right_arm/mini/greenhorn_gun.png?1', bonus:{skills:{shot:1}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'greenhorn_set', name:'Zestaw nowicjusza'}, auctionable:false, dropable:false, tradeable:false, sellable:true, damage:{damage_min:6, damage_max:14}, sub_type:'shot'};
	
    PK_S3.items[861] = {item_id:861, nshort:'computerbild_promo_gun', name:'Rewolwer Buffalo Billa', type:'right_arm', level:10, price:0, image:'/images/items/right_arm/computerbild_promo_gun.png?1', image_mini:'/images/items/right_arm/mini/computerbild_promo_gun.png?1', bonus:{skills:{}, attributes:{charisma:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:100, tradeable:true, damage:{damage_min:10, damage_max:20}, sub_type:'shot'};
	
	PK_S3.items[863] = {item_id:863, nshort:'collector_gun', name:'Rewolwer kolekcjonera', type:'right_arm', level:100, price:0, image:'/images/items/right_arm/collector_gun.png?1', image_mini:'/images/items/right_arm/mini/collector_gun.png?1', bonus:{skills:{trade:15, reflex:15}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'collector_set', name:'Zestaw kolekcjonera'}, traderlevel:100, tradeable:true, damage:{damage_min:75, damage_max:175}, sub_type:'shot'};
	PK_S3.items[864] = {item_id:864, nshort:'hackett_shotgun', name:'Śrutówka staruszka Hacketta', type:'right_arm', level:50, price:1500, image:'/images/items/right_arm/hackett_shotgun.png?1', image_mini:'/images/items/right_arm/mini/hackett_shotgun.png?1', bonus:{skills:{shot:2, tough:5}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true, damage:{damage_min:54, damage_max:74}, sub_type:'shot'};
	
	PK_S3.items[867] = {item_id:867, nshort:'old_bible', name:'Stara biblia', type:'right_arm', level:85, price:0, image:'/images/items/right_arm/old_bible.png?1', image_mini:'/images/items/right_arm/mini/old_bible.png?1', bonus:{skills:{appearance:15}, attributes:{strength:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, damage:{damage_min:0, damage_max:0}, sub_type:'shot'};
	PK_S3.items[868] = {item_id:868, nshort:'old_bible_bullet_hole', name:'Stara Biblia z dziurą po kuli', type:'right_arm', level:85, price:1, image:'/images/items/right_arm/old_bible_bullet_hole.png?1', image_mini:'/images/items/right_arm/mini/old_bible_bullet_hole.png?1', bonus:{skills:{appearance:15, tough:5}, attributes:{strength:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true, damage:{damage_min:0, damage_max:0}, sub_type:'shot'};
	PK_S3.items[869] = {item_id:869, nshort:'bannisters_colt', name:'Colt Bannistera', type:'right_arm', level:65, price:2300, image:'/images/items/right_arm/bannisters_colt.png?1', image_mini:'/images/items/right_arm/mini/bannisters_colt.png?1', bonus:{skills:{appearance:5, trade:8, tough:2}, attributes:{dexterity:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true, damage:{damage_min:48, damage_max:88}, sub_type:'shot'};

    PK_S3.items[999] = {item_id:999, nshort:'surprise', name:'Niespodzianka', type:'yield', level:0, price:0, image:'/images/items/unknown.png?1', image_mini:'/images/items/unknown.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};

/* --------------------------------------- PRODUKTY --------------------------------------- */
	PK_S3.items[1364] = {item_id:1364, nshort:'uniform_perfect', name:'Mundur', type:'body', level:20, price:0, image:'/images/items/body/uniform_perfect.png?1', image_mini:'/images/items/body/mini/uniform_perfect.png?1', characterClass:'soldier', bonus:{skills:{appearance:3, hide:4}, attributes:{charisma:2}, fortbattle:{}, fortbattlesector:{}}, set:{}};

    PK_S3.items[1701] = {item_id:1701, nshort:'arrow', name:'Стрелы', type:'yield', level:0, price:5, image:'/images/items/yield/arrow.png?1', image_mini:'images/items/yield/arrow.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[1702] = {item_id:1702, nshort:'compass', name:'Kompas', type:'yield', level:0, price:380, image:'/images/items/yield/compass.png?1', image_mini:'images/items/yield/compass.png?1', bonus:{skills:{ride:3}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[1703] = {item_id:1703, nshort:'lamp', name:'Lampa', type:'yield', level:0, price:80, image:'/images/items/yield/lamp.png?1', image_mini:'images/items/yield/lamp.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};

    PK_S3.items[1706] = {item_id:1706, nshort:'letter', name:'List', type:'yield', level:0, price:1, image:'/images/items/yield/letter.png?1', image_mini:'images/items/yield/letter.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};

    PK_S3.items[1708] = {item_id:1708, nshort:'whiskey', name:'Whiskey', type:'yield', level:0, price:10, image:'/images/items/yield/whiskey.png?1', image_mini:'images/items/yield/whiskey.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1709] = {item_id:1709, nshort:'gold', name:'Skarb Indian', type:'yield', level:0, price:0, image:'/images/items/yield/gold.png?1', image_mini:'images/items/yield/gold.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	PK_S3.items[1710] = {item_id:1710, nshort:'key1', name:'1. Stary klucz ', type:'yield', level:0, price:42, image:'/images/items/yield/key1.png?1', image_mini:'images/items/yield/key1.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1711] = {item_id:1711, nshort:'key2', name:'2. Stary klucz', type:'yield', level:0, price:46, image:'/images/items/yield/key2.png?1', image_mini:'images/items/yield/key2.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
    PK_S3.items[1712] = {item_id:1712, nshort:'key3', name:'Stary klucz', type:'yield', level:0, price:7500, image:'/images/items/yield/key3.png?1', image_mini:'images/items/yield/key3.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1713] = {item_id:1713, nshort:'easteregg', name:'Jajko wielkanocne', type:'yield', level:0, price:20, image:'/images/items/yield/easteregg.png?1', image_mini:'images/items/yield/easteregg.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};

    PK_S3.items[1715] = {item_id:1715, nshort:'cane', name:'Laska', type:'yield', level:42, price:2800, image:'/images/items/yield/cane.png?1', image_mini:'images/items/yield/cane.png?1', characterSex:'male', bonus:{skills:{}, attributes:{charisma:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_gentleman', name:'Komplet Dżentelmena'}, auctionable:true, dropable:true, tradeable:false, sellable:true};
    PK_S3.items[1716] = {item_id:1716, nshort:'letter', name:'List osobisty', type:'yield', level:0, price:2, image:'/images/items/yield/letter.png?1', image_mini:'images/items/yield/letter.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1717] = {item_id:1717, nshort:'chamber_pot', name:'Nocnik', type:'yield', level:0, price:750, image:'/images/items/yield/chamber_pot.png?1', image_mini:'images/items/yield/chamber_pot.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_sleeper', name:'Śpioszek'}, auctionable:true, dropable:true, tradeable:false, sellable:true};
	
	PK_S3.items[1733] = {item_id:1733, nshort:'henrys_packet', name:'Paczka Henrego', type:'yield', level:0, price:32, image:'/images/items/yield/henrys_packet.png?1', image_mini:'images/items/yield/henrys_packet.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	
	PK_S3.items[1750] = {item_id:1750, nshort:'ponytail', name:'Warkocz', type:'yield', level:0, price:66, image:'/images/items/yield/ponytail.png?1', image_mini:'images/items/yield/ponytail.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	PK_S3.items[1751] = {item_id:1751, nshort:'ruby', name:'Rubin', type:'yield', level:0, price:66, image:'/images/items/yield/ruby.png?1', image_mini:'images/items/yield/ruby.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[1752] = {item_id:1752, nshort:'egg1', name:'1. jajko wielkanocne', type:'yield', level:0, price:4, image:'/images/items/yield/egg1.png?1', image_mini:'images/items/yield/egg1.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[1753] = {item_id:1753, nshort:'egg2', name:'2. jajko wielkanocne', type:'yield', level:0, price:4, image:'/images/items/yield/egg2.png?1', image_mini:'images/items/yield/egg2.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[1754] = {item_id:1754, nshort:'egg3', name:'3. jajko wielkanocne', type:'yield', level:0, price:4, image:'/images/items/yield/egg3.png?1', image_mini:'images/items/yield/egg3.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1755] = {item_id:1755, nshort:'bag', name:'Torba z łupami', type:'yield', level:0, price:2000, image:'/images/items/yield/bag.png?1', image_mini:'images/items/yield/bag.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1756] = {item_id:1756, nshort:'mask', name:'Maska', type:'yield', level:0, price:200, image:'/images/items/yield/mask.png?1', image_mini:'images/items/yield/mask.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1757] = {item_id:1757, nshort:'dfprocket1', name:'Prototyp', type:'yield', level:0, price:1, image:'/images/items/yield/dfprocket1.png?1', image_mini:'images/items/yield/dfprocket1.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[1758] = {item_id:1758, nshort:'hgfrocket2', name:'Niewypał', type:'yield', level:0, price:1, image:'/images/items/yield/hgfrocket2.png?1', image_mini:'images/items/yield/hgfrocket2.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1759] = {item_id:1759, nshort:'dfgrocket1a', name:'Rakieta', type:'yield', level:0, price:2700, image:'/images/items/yield/dfgrocket1a.png?1', image_mini:'images/items/yield/dfgrocket1a.png?1', bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'season_set', name:'Zestaw świąteczny'}, auctionable:false, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1760] = {item_id:1760, nshort:'bucket', name:'Puste wiadro', type:'yield', level:0, price:20, image:'/images/items/yield/bucket.png?1', image_mini:'images/items/yield/bucket.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1761] = {item_id:1761, nshort:'bucket_full', name:'Pełne wiadro', type:'yield', level:0, price:21, image:'/images/items/yield/bucket_full.png?1', image_mini:'images/items/yield/bucket_full.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1762] = {item_id:1762, nshort:'bucket_fire', name:'Wiadro do gaszenia', type:'yield', level:0, price:25, image:'/images/items/yield/bucket_fire.png?1', image_mini:'images/items/yield/bucket_fire.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'fireworker_set', name:'Komplet strażaka'}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[1763] = {item_id:1763, nshort:'threekeynote', name:'Kartka z trzema kluczami...', type:'yield', level:0, price:2, image:'/images/items/yield/threekeynote.png?1', image_mini:'images/items/yield/threekeynote.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1764] = {item_id:1764, nshort:'treasuremap', name:'Mapa skarbu!', type:'yield', level:0, price:5543, image:'/images/items/yield/treasuremap.png?1', image_mini:'images/items/yield/treasuremap.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[1765] = {item_id:1765, nshort:'treasurebox', name:'Skrzynia ze skarbem', type:'yield', level:0, price:23402, image:'/images/items/yield/treasurebox.png?1', image_mini:'images/items/yield/treasurebox.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1766] = {item_id:1766, nshort:'mudball', name:'Dziwna gruda ziemi', type:'yield', level:0, price:1, image:'/images/items/yield/mudball.png?1', image_mini:'images/items/yield/mudball.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[1767] = {item_id:1767, nshort:'muditem', name:'Zabrudzony przedmiot', type:'yield', level:0, price:10, image:'/images/items/yield/muditem.png?1', image_mini:'images/items/yield/muditem.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[1768] = {item_id:1768, nshort:'dustgun', name:'Zakurzony rewolwer', type:'yield', level:0, price:100, image:'/images/items/yield/dustgun.png?1', image_mini:'images/items/yield/dustgun.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[1769] = {item_id:1769, nshort:'goldgun', name:'Złoty rewolwer', type:'yield', level:0, price:0, image:'/images/items/yield/goldgun.png?1', image_mini:'images/items/yield/goldgun.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[1770] = {item_id:1770, nshort:'bloodycloth', name:'Zakrwawiony kawałek materiału', type:'yield', level:0, price:1, image:'/images/items/yield/bloodycloth.png?1', image_mini:'images/items/yield/bloodycloth.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1771] = {item_id:1771, nshort:'photo', name:'Stara fotografia', type:'yield', level:0, price:1, image:'/images/items/yield/photo.png?1', image_mini:'images/items/yield/photo.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1772] = {item_id:1772, nshort:'umbrella', name:'Parasol Kudrama', type:'yield', level:42, price:2800, image:'/images/items/yield/umbrella.png?1', image_mini:'images/items/yield/umbrella.png?1', characterSex:'female', bonus:{skills:{trade:8, finger_dexterity:6, endurance:10}, attributes:{strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_dancer', name:'Komplet Tancerki'}, auctionable:true, dropable:true, tradeable:false, sellable:true};
    PK_S3.items[1773] = {item_id:1773, nshort:'testament', name:'Testament', type:'yield', level:0, price:1, image:'/images/items/yield/testament.png?1', image_mini:'images/items/yield/testament.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1774] = {item_id:1774, nshort:'engagementring', name:'Pierścionek zaręczynowy', type:'yield', level:0, price:1, image:'/images/items/yield/engagementring.png?1', image_mini:'images/items/yield/engagementring.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[1775] = {item_id:1775, nshort:'birthcertificate', name:'Świadectwo urodzenia', type:'yield', level:0, price:1, image:'/images/items/yield/birthcertificate.png?1', image_mini:'images/items/yield/birthcertificate.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[1776] = {item_id:1776, nshort:'darkplans', name:'Niecne plany', type:'yield', level:0, price:1, image:'/images/items/yield/darkplans.png?1', image_mini:'images/items/yield/darkplans.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[1777] = {item_id:1777, nshort:'docreport', name:'Diagnoza lekarska', type:'yield', level:0, price:1, image:'/images/items/yield/docreport.png?1', image_mini:'images/items/yield/docreport.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1778] = {item_id:1778, nshort:'brandingiron', name:'Pogięty stempel do znakowania', type:'yield', level:0, price:1, image:'/images/items/yield/brandingiron.png?1', image_mini:'images/items/yield/brandingiron.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[1779] = {item_id:1779, nshort:'cardpiece1', name:'1. kawałek mapy', type:'yield', level:0, price:1, image:'/images/items/yield/cardpiece1.png?1', image_mini:'images/items/yield/cardpiece1.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[1780] = {item_id:1780, nshort:'cardpiece2', name:'2. kawałek mapy', type:'yield', level:0, price:1, image:'/images/items/yield/cardpiece2.png?1', image_mini:'images/items/yield/cardpiece2.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[1781] = {item_id:1781, nshort:'cardpiece3', name:'3. kawałek mapy', type:'yield', level:0, price:1, image:'/images/items/yield/cardpiece3.png?1', image_mini:'images/items/yield/cardpiece3.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1782] = {item_id:1782, nshort:'cardpiece4', name:'4. kawałek mapy', type:'yield', level:0, price:1, image:'/images/items/yield/cardpiece4.png?1', image_mini:'images/items/yield/cardpiece4.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[1783] = {item_id:1783, nshort:'cardcomplete', name:'Kompletna mapa', type:'yield', level:0, price:1, image:'/images/items/yield/cardcomplete.png?1', image_mini:'images/items/yield/cardcomplete.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[1784] = {item_id:1784, nshort:'itemlist', name:'Lista przedmiotów', type:'yield', level:0, price:1, image:'/images/items/yield/itemlist.png?1', image_mini:'images/items/yield/itemlist.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[1785] = {item_id:1785, nshort:'torch', name:'Pochodnia', type:'yield', level:0, price:1, image:'/images/items/yield/torch.png?1', image_mini:'images/items/yield/torch.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[1786] = {item_id:1786, nshort:'bagpack', name:'Plecak', type:'yield', level:0, price:1, image:'/images/items/yield/bagpack.png?1', image_mini:'images/items/yield/bagpack.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1787] = {item_id:1787, nshort:'ashes', name:'Popiół', type:'yield', level:0, price:1, image:'/images/items/yield/ashes.png?1', image_mini:'images/items/yield/ashes.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1788] = {item_id:1788, nshort:'gravel', name:'Krzemienie', type:'yield', level:0, price:10, image:'/images/items/yield/gravel.png?1', image_mini:'images/items/yield/gravel.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1789] = {item_id:1789, nshort:'brokenshovel', name:'Złamana łopata', type:'yield', level:0, price:50, image:'/images/items/yield/brokenshovel.png?1', image_mini:'images/items/yield/brokenshovel.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1790] = {item_id:1790, nshort:'treeboat', name:'Wydrążony pień drzewa', type:'yield', level:0, price:50, image:'/images/items/yield/treeboat.png?1', image_mini:'images/items/yield/treeboat.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1791] = {item_id:1791, nshort:'golddust', name:'Złoty pył', type:'yield', level:0, price:100, image:'/images/items/yield/golddust.png?1', image_mini:'images/items/yield/golddust.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1792] = {item_id:1792, nshort:'goldnugget', name:'Kawałek złota.', type:'yield', level:0, price:5000, image:'/images/items/yield/goldnugget.png?1', image_mini:'images/items/yield/goldnugget.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1793] = {item_id:1793, nshort:'bendmetall', name:'Zabrudzony, wygięty kawał metalu', type:'yield', level:0, price:1, image:'/images/items/yield/bendmetall.png?1', image_mini:'images/items/yield/bendmetall.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1794] = {item_id:1794, nshort:'dirtymetall', name:'Zabrudzony kawał metalu', type:'yield', level:0, price:10, image:'/images/items/yield/dirtymetall.png?1', image_mini:'images/items/yield/dirtymetall.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1795] = {item_id:1795, nshort:'goldblade', name:'Czyste złote ostrze', type:'yield', level:0, price:100, image:'/images/items/yield/goldblade.png?1', image_mini:'images/items/yield/goldblade.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1796] = {item_id:1796, nshort:'sharpgoldblade', name:'Ostre złote ostrze', type:'yield', level:0, price:100, image:'/images/items/yield/sharpgoldblade.png?1', image_mini:'images/items/yield/sharpgoldblade.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[1797] = {item_id:1797, nshort:'sheriffpaper', name:'Raport szeryfa', type:'yield', level:0, price:10, image:'/images/items/yield/sheriffpaper.png?1', image_mini:'images/items/yield/sheriffpaper.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	
	PK_S3.items[1799] = {item_id:1799, nshort:'crystallball', name:'Kryształowa kula', type:'yield', level:0, price:10000, image:'/images/items/yield/crystallball.png?1', image_mini:'images/items/yield/crystallball.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	PK_S3.items[1800] = {item_id:1800, nshort:'toadblood', name:'Krew ropuchy', type:'yield', level:0, price:10, image:'/images/items/yield/toadblood.png?1', image_mini:'images/items/yield/toadblood.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	PK_S3.items[1801] = {item_id:1801, nshort:'coyoteheart', name:'Serce kojota', type:'yield', level:0, price:10, image:'/images/items/yield/coyoteheart.png?1', image_mini:'images/items/yield/coyoteheart.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	PK_S3.items[1802] = {item_id:1802, nshort:'phantomdrawing', name:'Portret pamięciowy', type:'yield', level:0, price:10, image:'/images/items/yield/phantomdrawing.png?1', image_mini:'images/items/yield/phantomdrawing.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	PK_S3.items[1803] = {item_id:1803, nshort:'candyorange', name:'Kandyzowana pomarańcza', type:'yield', level:0, price:10, image:'/images/items/yield/candyorange.png?1', image_mini:'images/items/yield/candyorange.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[1804] = {item_id:1804, nshort:'smellingfish', name:'ТŚmierdząca ryba', type:'yield', level:0, price:10, image:'/images/items/yield/smellingfish.png?1', image_mini:'images/items/yield/smellingfish.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1805] = {item_id:1805, nshort:'needleandthreat', name:'Igła z nitką', type:'yield', level:0, price:5, image:'/images/items/yield/needleandthreat.png?1', image_mini:'images/items/yield/needleandthreat.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1806] = {item_id:1806, nshort:'cottonbale', name:'Kulka bawełny', type:'yield', level:0, price:15, image:'/images/items/yield/cottonbale.png?1', image_mini:'images/items/yield/cottonbale.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[1807] = {item_id:1807, nshort:'sock', name:'Zniszczona ostroga', type:'yield', level:0, price:0, image:'/images/items/yield/sock.png?1', image_mini:'images/items/yield/sock.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1808] = {item_id:1808, nshort:'potatoe', name:'Ziemniak', type:'yield', level:0, price:5, image:'/images/items/yield/potatoe.png?1', image_mini:'images/items/yield/potatoe.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1809] = {item_id:1809, nshort:'hay', name:'Siano', type:'yield', level:0, price:5, image:'/images/items/yield/hay.png?1', image_mini:'images/items/yield/hay.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1810] = {item_id:1810, nshort:'pumpkin', name:'Dynia', type:'yield', level:0, price:25, image:'/images/items/yield/pumpkin.png?1', image_mini:'images/items/yield/pumpkin.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1811] = {item_id:1811, nshort:'blueberries', name:'Borówki', type:'yield', level:0, price:15, image:'/images/items/yield/blueberries.png?1', image_mini:'images/items/yield/blueberries.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1812] = {item_id:1812, nshort:'pit', name:'Nasiona', type:'yield', level:0, price:1, image:'/images/items/yield/pit.png?1', image_mini:'images/items/yield/pit.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1813] = {item_id:1813, nshort:'eagle_feather', name:'Orle pióro', type:'yield', level:0, price:35, image:'/images/items/yield/eagle_feather.png?1', image_mini:'images/items/yield/eagle_feather.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1814] = {item_id:1814, nshort:'lotus', name:'Kwiat lotosu', type:'yield', level:0, price:45, image:'/images/items/yield/lotus.png?1', image_mini:'images/items/yield/lotus.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1815] = {item_id:1815, nshort:'crabmeat', name:'Mięso kraba', type:'yield', level:0, price:12, image:'/images/items/yield/crabmeat.png?1', image_mini:'images/items/yield/crabmeat.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1816] = {item_id:1816, nshort:'chalk', name:'Kreda', type:'yield', level:0, price:2, image:'/images/items/yield/chalk.png?1', image_mini:'images/items/yield/chalk.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1817] = {item_id:1817, nshort:'sheriffstar', name:'Gwiazda szeryfa', type:'yield', level:0, price:50, image:'/images/items/yield/sheriffstar.png?1', image_mini:'images/items/yield/sheriffstar.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1818] = {item_id:1818, nshort:'sulfurstone', name:'Ruda siarki', type:'yield', level:0, price:25, image:'/images/items/yield/sulfurstone.png?1', image_mini:'images/items/yield/sulfurstone.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1819] = {item_id:1819, nshort:'pokergame', name:'Zestaw do pokera', type:'yield', level:0, price:150, image:'/images/items/yield/pokergame.png?1', image_mini:'images/items/yield/pokergame.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1820] = {item_id:1820, nshort:'snakehide', name:'Skóra węża', type:'yield', level:0, price:27, image:'/images/items/yield/snakehide.png?1', image_mini:'images/items/yield/snakehide.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1821] = {item_id:1821, nshort:'salpetersalt', name:'Saletra', type:'yield', level:0, price:13, image:'/images/items/yield/salpetersalt.png?1', image_mini:'images/items/yield/salpetersalt.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1822] = {item_id:1822, nshort:'cigaretts', name:'Papierosy', type:'yield', level:0, price:3, image:'/images/items/yield/cigaretts.png?1', image_mini:'images/items/yield/cigaretts.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1823] = {item_id:1823, nshort:'rodeo_trophy', name:'Puchar za rodeo', type:'yield', level:0, price:75, image:'/images/items/yield/rodeo_trophy.png?1', image_mini:'images/items/yield/rodeo_trophy.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1824] = {item_id:1824, nshort:'cougar_hide', name:'Skóra pumy', type:'yield', level:0, price:55, image:'/images/items/yield/cougar_hide.png?1', image_mini:'images/items/yield/cougar_hide.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1825] = {item_id:1825, nshort:'indigo', name:'Indygo', type:'yield', level:0, price:65, image:'/images/items/yield/indigo.png?1', image_mini:'images/items/yield/indigo.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1826] = {item_id:1826, nshort:'rum', name:'Rum', type:'yield', level:0, price:7, image:'/images/items/yield/rum.png?1', image_mini:'images/items/yield/rum.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1827] = {item_id:1827, nshort:'lead', name:'Ołów', type:'yield', level:0, price:27, image:'/images/items/yield/lead.png?1', image_mini:'images/items/yield/lead.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1828] = {item_id:1828, nshort:'uncut_ruby', name:'Nieoszlifowany rubin', type:'yield', level:0, price:75, image:'/images/items/yield/uncut_ruby.png?1', image_mini:'images/items/yield/uncut_ruby.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1829] = {item_id:1829, nshort:'uncut_emerald', name:'Nieoszlifowany szmaragd', type:'yield', level:0, price:55, image:'/images/items/yield/uncut_emerald.png?1', image_mini:'images/items/yield/uncut_emerald.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1830] = {item_id:1830, nshort:'uncut_diamond', name:'Nieoszlifowany diament', type:'yield', level:0, price:100, image:'/images/items/yield/uncut_diamond.png?1', image_mini:'images/items/yield/uncut_diamond.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1831] = {item_id:1831, nshort:'woodcross', name:'Drewniany krzyżyk', type:'yield', level:0, price:3, image:'/images/items/yield/woodcross.png?1', image_mini:'images/items/yield/woodcross.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1832] = {item_id:1832, nshort:'metall_chip', name:'Metalowy żeton', type:'yield', level:0, price:50, image:'/images/items/yield/metall_chip.png?1', image_mini:'images/items/yield/metall_chip.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1833] = {item_id:1833, nshort:'death_warrant', name:'Wyrok śmierci', type:'yield', level:0, price:5, image:'/images/items/yield/death_warrant.png?1', image_mini:'images/items/yield/death_warrant.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1834] = {item_id:1834, nshort:'peaceflower', name:'Kwiat pokoju', type:'yield', level:0, price:1, image:'/images/items/yield/peaceflower.png?1', image_mini:'images/items/yield/peaceflower.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1835] = {item_id:1835, nshort:'rose', name:'Róża', type:'yield', level:0, price:10, image:'/images/items/yield/rose.png?1', image_mini:'images/items/yield/rose.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1836] = {item_id:1836, nshort:'marriage_certificate', name:'Świadectwo zawarcia małżeństwa', type:'yield', level:0, price:2, image:'/images/items/yield/marriage_certificate.png?1', image_mini:'images/items/yield/marriage_certificate.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1837] = {item_id:1837, nshort:'printing_plate', name:'Forma drukarska', type:'yield', level:0, price:150, image:'/images/items/yield/printing_plate.png?1', image_mini:'images/items/yield/printing_plate.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1838] = {item_id:1838, nshort:'wolf_geislein', name:'Wilk z dużym brzuchem', type:'yield', level:0, price:3, image:'/images/items/yield/wolf_geislein.png?1', image_mini:'images/items/yield/wolf_geislein.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1839] = {item_id:1839, nshort:'geislein', name:'Koźlątko', type:'yield', level:0, price:75, image:'/images/items/yield/geislein.png?1', image_mini:'images/items/yield/geislein.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1840] = {item_id:1840, nshort:'bunny', name:'Zając', type:'yield', level:0, price:75, image:'/images/items/yield/bunny.png?1', image_mini:'images/items/yield/bunny.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1841] = {item_id:1841, nshort:'elefant', name:'Słoń', type:'yield', level:0, price:75, image:'/images/items/yield/elefant.png?1', image_mini:'images/items/yield/elefant.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1842] = {item_id:1842, nshort:'lion', name:'Lew', type:'yield', level:0, price:75, image:'/images/items/yield/lion.png?1', image_mini:'images/items/yield/lion.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1843] = {item_id:1843, nshort:'brownbear', name:'Niedźwiedź Grizzly', type:'yield', level:0, price:50, image:'/images/items/yield/brownbear.png?1', image_mini:'images/items/yield/brownbear.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1844] = {item_id:1844, nshort:'wolf2', name:'Wilk', type:'yield', level:0, price:25, image:'/images/items/yield/wolf2.png?1', image_mini:'images/items/yield/wolf2.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1845] = {item_id:1845, nshort:'snake', name:'Wąż', type:'yield', level:0, price:10, image:'/images/items/yield/snake.png?1', image_mini:'images/items/yield/snake.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1846] = {item_id:1846, nshort:'dwarfpony', name:'Kucyk', type:'yield', level:0, price:35, image:'/images/items/yield/dwarfpony.png?1', image_mini:'images/items/yield/dwarfpony.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1847] = {item_id:1847, nshort:'eagle', name:'Orzeł bielik', type:'yield', level:0, price:350, image:'/images/items/yield/eagle.png?1', image_mini:'images/items/yield/eagle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1848] = {item_id:1848, nshort:'cougar', name:'Puma', type:'yield', level:0, price:250, image:'/images/items/yield/cougar.png?1', image_mini:'images/items/yield/cougar.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1849] = {item_id:1849, nshort:'sheriff_helper', name:'Gwiazda szeryfa', type:'yield', level:0, price:1, image:'/images/items/yield/sheriff_helper.png?1', image_mini:'images/items/yield/sheriff_helper.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1850] = {item_id:1850, nshort:'animal_card', name:'Карта леса', type:'yield', level:0, price:1, image:'/images/items/yield/animal_card.png?1', image_mini:'images/items/yield/animal_card.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[1851] = {item_id:1851, nshort:'elixir_bear', name:'Eliksir niedźwiedzia', type:'yield', level:0, price:1, image:'/images/items/yield/elixir_bear.png?1', image_mini:'images/items/yield/elixir_bear.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1852] = {item_id:1852, nshort:'elixir_cougar', name:'Eliksir pumy', type:'yield', level:0, price:1, image:'/images/items/yield/elixir_cougar.png?1', image_mini:'images/items/yield/elixir_cougar.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1853] = {item_id:1853, nshort:'elixir_eagle', name:'Eliksir orła', type:'yield', level:0, price:1, image:'/images/items/yield/elixir_eagle.png?1', image_mini:'images/items/yield/elixir_eagle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1854] = {item_id:1854, nshort:'elixir_snake', name:'Eliksir węża', type:'yield', level:0, price:1, image:'/images/items/yield/elixir_snake.png?1', image_mini:'images/items/yield/elixir_snake.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1855] = {item_id:1855, nshort:'charcoal', name:'Węgiel drzewny', type:'yield', level:0, price:31, image:'/images/items/yield/charcoal.png?1', image_mini:'images/items/yield/charcoal.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1856] = {item_id:1856, nshort:'waterjar', name:'Dzban wody', type:'yield', level:0, price:30, image:'/images/items/yield/waterjar.png?1', image_mini:'images/items/yield/waterjar.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1857] = {item_id:1857, nshort:'fieldbottle', name:'Manierka', type:'yield', level:0, price:130, image:'/images/items/yield/fieldbottle.png?1', image_mini:'images/items/yield/fieldbottle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1858] = {item_id:1858, nshort:'workingknife', name:'Nóż', type:'yield', level:0, price:120, image:'/images/items/yield/workingknife.png?1', image_mini:'images/items/yield/workingknife.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1859] = {item_id:1859, nshort:'cookingpan', name:'Patelnia', type:'yield', level:0, price:74, image:'/images/items/yield/cookingpan.png?1', image_mini:'images/items/yield/cookingpan.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1860] = {item_id:1860, nshort:'cuttingwood', name:'Deska do krojenia', type:'yield', level:0, price:56, image:'/images/items/yield/cuttingwood.png?1', image_mini:'images/items/yield/cuttingwood.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1861] = {item_id:1861, nshort:'flint', name:'Krzesiwo', type:'yield', level:0, price:32, image:'/images/items/yield/flint.png?1', image_mini:'images/items/yield/flint.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1862] = {item_id:1862, nshort:'cornflour', name:'Mąka kukurydziana', type:'yield', level:0, price:20, image:'/images/items/yield/cornflour.png?1', image_mini:'images/items/yield/cornflour.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1863] = {item_id:1863, nshort:'beansandbacon', name:'Fasola z bekonem', type:'yield', level:0, price:133, image:'/images/items/yield/beansandbacon.png?1', image_mini:'images/items/yield/beansandbacon.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1864] = {item_id:1864, nshort:'marmelade', name:'Dżem', type:'yield', level:0, price:130, image:'/images/items/yield/marmelade.png?1', image_mini:'images/items/yield/marmelade.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1865] = {item_id:1865, nshort:'mash', name:'Zacier', type:'yield', level:0, price:90, image:'/images/items/yield/mash.png?1', image_mini:'images/items/yield/mash.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1866] = {item_id:1866, nshort:'dough', name:'Ciasto', type:'yield', level:0, price:41, image:'/images/items/yield/dough.png?1', image_mini:'images/items/yield/dough.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1867] = {item_id:1867, nshort:'seasonedsteak', name:'Marynowany stek', type:'yield', level:0, price:115, image:'/images/items/yield/seasonedsteak.png?1', image_mini:'images/items/yield/seasonedsteak.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1868] = {item_id:1868, nshort:'licor', name:'Trunek', type:'yield', level:0, price:264, image:'/images/items/yield/licor.png?1', image_mini:'images/items/yield/licor.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
	PK_S3.items[1869] = {item_id:1869, nshort:'cake', name:'Tort', type:'yield', level:0, price:83, image:'/images/items/yield/cake.png?1', image_mini:'images/items/yield/cake.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1870] = {item_id:1870, nshort:'fishfond', name:'Bulion rybny', type:'yield', level:0, price:42, image:'/images/items/yield/fishfond.png?1', image_mini:'images/items/yield/fishfond.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1871] = {item_id:1871, nshort:'grilled_turkey', name:'Pieczony indyk', type:'yield', level:0, price:91, image:'/images/items/yield/grilled_turkey.png?1', image_mini:'images/items/yield/grilled_turkey.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
	PK_S3.items[1872] = {item_id:1872, nshort:'fishsoup', name:'Уха', type:'yield', level:0, price:130, image:'/images/items/yield/fishsoup.png?1', image_mini:'images/items/yield/fishsoup.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1873] = {item_id:1873, nshort:'veggiepun', name:'Овощные пельмени', type:'yield', level:0, price:256, image:'/images/items/yield/veggiepun.png?1', image_mini:'images/items/yield/veggiepun.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1874] = {item_id:1874, nshort:'meatloaf', name:'Фарш', type:'yield', level:0, price:244, image:'/images/items/yield/meatloaf.png?1', image_mini:'images/items/yield/meatloaf.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1875] = {item_id:1875, nshort:'fishonastick', name:'Dorsz', type:'yield', level:0, price:74, image:'/images/items/yield/fishonastick.png?1', image_mini:'images/items/yield/fishonastick.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1876] = {item_id:1876, nshort:'parfumsmoke', name:'Kadzidło', type:'yield', level:0, price:54, image:'/images/items/yield/parfumsmoke.png?1', image_mini:'images/items/yield/parfumsmoke.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
    PK_S3.items[1877] = {item_id:1877, nshort:'sauce', name:'Sos', type:'yield', level:0, price:131, image:'/images/items/yield/sauce.png?1', image_mini:'images/items/yield/sauce.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1878] = {item_id:1878, nshort:'paperfish', name:'Ryba zawinięta w gazetę', type:'yield', level:0, price:84, image:'/images/items/yield/paperfish.png?1', image_mini:'images/items/yield/paperfish.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
	PK_S3.items[1879] = {item_id:1879, nshort:'gentlemendinner', name:'Obiad dżentelmena', type:'yield', level:0, price:188, image:'/images/items/yield/gentlemendinner.png?1', image_mini:'images/items/yield/gentlemendinner.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1880] = {item_id:1880, nshort:'gum', name:'Żywica', type:'yield', level:0, price:64, image:'/images/items/yield/gum.png?1', image_mini:'images/items/yield/gum.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1881] = {item_id:1881, nshort:'sulfur', name:'Siarka', type:'yield', level:0, price:47, image:'/images/items/yield/sulfur.png?1', image_mini:'images/items/yield/sulfur.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1882] = {item_id:1882, nshort:'pipecleaner', name:'Wycior', type:'yield', level:0, price:190, image:'/images/items/yield/pipecleaner.png?1', image_mini:'images/items/yield/pipecleaner.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1883] = {item_id:1883, nshort:'stomach', name:'Lek na żołądek', type:'yield', level:0, price:48, image:'/images/items/yield/stomach.png?1', image_mini:'images/items/yield/stomach.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1884] = {item_id:1884, nshort:'sulfuracid', name:'Kwas siarkowy', type:'yield', level:0, price:79, image:'/images/items/yield/sulfuracid.png?1', image_mini:'images/items/yield/sulfuracid.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1885] = {item_id:1885, nshort:'ink', name:'Atrament', type:'yield', level:0, price:164, image:'/images/items/yield/ink.png?1', image_mini:'images/items/yield/ink.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true}; 
    PK_S3.items[1886] = {item_id:1886, nshort:'petroleum', name:'Nafta', type:'yield', level:0, price:215, image:'/images/items/yield/petroleum.png?1', image_mini:'images/items/yield/petroleum.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1887] = {item_id:1887, nshort:'fetish', name:'Bożek', type:'yield', level:0, price:288, image:'/images/items/yield/fetish.png?1', image_mini:'images/items/yield/fetish.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1888] = {item_id:1888, nshort:'destillate', name:'Дистиллят', type:'yield', level:0, price:470, image:'/images/items/yield/destillate.png?1', image_mini:'images/items/yield/destillate.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1889] = {item_id:1889, nshort:'firewater', name:'Самогон', type:'yield', level:0, price:135, image:'/images/items/yield/firewater.png?1', image_mini:'images/items/yield/firewater.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1890] = {item_id:1890, nshort:'tea', name:'Чай', type:'yield', level:0, price:72, image:'/images/items/yield/tea.png?1', image_mini:'images/items/yield/tea.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1891] = {item_id:1891, nshort:'chewtabaco', name:'Жевательный табак', type:'yield', level:0, price:179, image:'/images/items/yield/chewtabaco.png?1', image_mini:'images/items/yield/chewtabaco.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1892] = {item_id:1892, nshort:'fruitlicor', name:'Фруктовый ликёр', type:'yield', level:0, price:124, image:'/images/items/yield/fruitlicor.png?1', image_mini:'images/items/yield/fruitlicor.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1893] = {item_id:1893, nshort:'battery', name:'Гальванический элемент', type:'yield', level:0, price:180, image:'/images/items/yield/battery.png?1', image_mini:'images/items/yield/battery.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1894] = {item_id:1894, nshort:'lye', name:'Щёлок', type:'yield', level:0, price:139, image:'/images/items/yield/lye.png?1', image_mini:'images/items/yield/lye.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1895] = {item_id:1895, nshort:'herbbrew', name:'Травяной ликёр', type:'yield', level:0, price:122, image:'/images/items/yield/herbbrew.png?1', image_mini:'images/items/yield/herbbrew.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1896] = {item_id:1896, nshort:'rec_paper', name:'Макулатура', type:'yield', level:0, price:126, image:'/images/items/yield/rec_paper.png?1', image_mini:'images/items/yield/rec_paper.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1897] = {item_id:1897, nshort:'mathdraw', name:'Циркуль', type:'yield', level:0, price:83, image:'/images/items/yield/mathdraw.png?1', image_mini:'images/items/yield/mathdraw.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1898] = {item_id:1898, nshort:'rosewater', name:'Розовая вода', type:'yield', level:0, price:83, image:'/images/items/yield/rosewater.png?1', image_mini:'images/items/yield/rosewater.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1899] = {item_id:1899, nshort:'hotiron', name:'Stopione żelazo', type:'yield', level:0, price:72, image:'/images/items/yield/hotiron.png?1', image_mini:'images/items/yield/hotiron.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1900] = {item_id:1900, nshort:'bajonett', name:'Bagnet', type:'yield', level:0, price:154, image:'/images/items/yield/bajonett.png?1', image_mini:'images/items/yield/bajonett.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1901] = {item_id:1901, nshort:'weightstone', name:'Odważnik', type:'yield', level:0, price:108, image:'/images/items/yield/weightstone.png?1', image_mini:'images/items/yield/weightstone.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1902] = {item_id:1902, nshort:'steel', name:'Stal', type:'yield', level:0, price:142, image:'/images/items/yield/steel.png?1', image_mini:'images/items/yield/steel.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
	PK_S3.items[1903] = {item_id:1903, nshort:'liquid_lead', name:'Stopiony ołów', type:'yield', level:0, price:134, image:'/images/items/yield/liquid_lead.png?1', image_mini:'images/items/yield/liquid_lead.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1904] = {item_id:1904, nshort:'forge', name:'Kowadło', type:'yield', level:0, price:246, image:'/images/items/yield/forge.png?1', image_mini:'images/items/yield/forge.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1905] = {item_id:1905, nshort:'lead_figure', name:'Ołowiana figurka', type:'yield', level:0, price:219, image:'/images/items/yield/lead_figure.png?1', image_mini:'images/items/yield/lead_figure.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1906] = {item_id:1906, nshort:'hot_marbel', name:'Niezastygnięta kulka', type:'yield', level:0, price:164, image:'/images/items/yield/hot_marbel.png?1', image_mini:'images/items/yield/hot_marbel.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1907] = {item_id:1907, nshort:'rivets', name:'Nity', type:'yield', level:0, price:46, image:'/images/items/yield/rivets.png?1', image_mini:'images/items/yield/rivets.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
    PK_S3.items[1908] = {item_id:1908, nshort:'handprotection', name:'Kabłąk', type:'yield', level:0, price:144, image:'/images/items/yield/handprotection.png?1', image_mini:'images/items/yield/handprotection.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
	PK_S3.items[1909] = {item_id:1909, nshort:'coolingpackage', name:'Chusta do chłodzenia', type:'yield', level:0, price:62, image:'/images/items/yield/coolingpackage.png?1', image_mini:'images/items/yield/coolingpackage.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
    PK_S3.items[1910] = {item_id:1910, nshort:'weaponchain', name:'Łańcuch do broni', type:'yield', level:0, price:78, image:'/images/items/yield/weaponchain.png?1', image_mini:'images/items/yield/weaponchain.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	
	
	
	
	PK_S3.items[1915] = {item_id:1915, nshort:'druse', name:'Nierozłupana geoda', type:'yield', level:0, price:112, image:'/images/items/yield/druse.png?1', image_mini:'images/items/yield/druse.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1916] = {item_id:1916, nshort:'polishstone', name:'Полировочный камень', type:'yield', level:0, price:252, image:'/images/items/yield/polishstone.png?1', image_mini:'images/items/yield/polishstone.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1917] = {item_id:1917, nshort:'leatherband', name:'Rzemień', type:'yield', level:0, price:60, image:'/images/items/yield/leatherband.png?1', image_mini:'images/items/yield/leatherband.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
	PK_S3.items[1918] = {item_id:1918, nshort:'horseshoe_equip', name:'Podkucie kopyt', type:'yield', level:0, price:68, image:'/images/items/yield/horseshoe_equip.png?1', image_mini:'images/items/yield/horseshoe_equip.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1919] = {item_id:1919, nshort:'powerfood', name:'Pasza treściwa', type:'yield', level:0, price:32, image:'/images/items/yield/powerfood.png?1', image_mini:'images/items/yield/powerfood.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	
	
	
    PK_S3.items[1923] = {item_id:1923, nshort:'branding_iron', name:'Клеймо', type:'yield', level:0, price:220, image:'/images/items/yield/branding_iron.png?1', image_mini:'images/items/yield/branding_iron.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1924] = {item_id:1924, nshort:'notworking_compass', name:'Неработающий компас', type:'yield', level:0, price:304, image:'/images/items/yield/notworking_compass.png?1', image_mini:'images/items/yield/notworking_compass.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	
	PK_S3.items[1927] = {item_id:1927, nshort:'harnish', name:'Уздечка Элама Харниша', type:'yield', level:0, price:154, image:'/images/items/yield/harnish.png?1', image_mini:'images/items/yield/harnish.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	
	
	
	
	
	
	PK_S3.items[1934] = {item_id:1934, nshort:'gem_knob', name:'Łęk siodła', type:'yield', level:0, price:194, image:'/images/items/yield/gem_knob.png?1', image_mini:'images/items/yield/gem_knob.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
    PK_S3.items[1935] = {item_id:1935, nshort:'fixed_spade', name:'Sklejona łopata', type:'yield', level:0, price:15, image:'/images/items/yield/fixed_spade.png?1', image_mini:'images/items/yield/fixed_spade.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1936] = {item_id:1936, nshort:'money_bag', name:'Portfel', type:'yield', level:0, price:25, image:'/images/items/yield/money_bag.png?1', image_mini:'images/items/yield/money_bag.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[1937] = {item_id:1937, nshort:'travelbag', name:'Torba podróżna', type:'yield', level:0, price:22, image:'/images/items/yield/travelbag.png?1', image_mini:'images/items/yield/travelbag.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1938] = {item_id:1938, nshort:'sharpweapon', name:'Zaostrzenie broni', type:'yield', level:0, price:16, image:'/images/items/yield/sharpweapon.png?1', image_mini:'images/items/yield/sharpweapon.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1939] = {item_id:1939, nshort:'filtercigaretts', name:'Papieros z filtrem', type:'yield', level:0, price:29, image:'/images/items/yield/filtercigaretts.png?1', image_mini:'images/items/yield/filtercigaretts.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1940] = {item_id:1940, nshort:'cake_piece', name:'Kawałek tortu', type:'yield', level:0, price:17, image:'/images/items/yield/cake_piece.png?1', image_mini:'images/items/yield/cake_piece.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1941] = {item_id:1941, nshort:'tomato_mash', name:'Puree pomidorowe', type:'yield', level:0, price:6, image:'/images/items/yield/tomato_mash.png?1', image_mini:'images/items/yield/tomato_mash.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1942] = {item_id:1942, nshort:'tomato_sauce', name:'Sos pomidorowy', type:'yield', level:0, price:15, image:'/images/items/yield/tomato_sauce.png?1', image_mini:'images/items/yield/tomato_sauce.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1943] = {item_id:1943, nshort:'baked_beans', name:'Zapieczone fasolki', type:'yield', level:0, price:50, image:'/images/items/yield/baked_beans.png?1', image_mini:'images/items/yield/baked_beans.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1944] = {item_id:1944, nshort:'raw_pyrit', name:'Nieoszlifowany piryt', type:'yield', level:0, price:16, image:'/images/items/yield/raw_pyrit.png?1', image_mini:'images/items/yield/raw_pyrit.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1945] = {item_id:1945, nshort:'pyritsun', name:'Dysk z pirytu', type:'yield', level:0, price:20, image:'/images/items/yield/pyritsun.png?1', image_mini:'images/items/yield/pyritsun.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1946] = {item_id:1946, nshort:'pyrit_amulett', name:'Amulet', type:'yield', level:0, price:50, image:'/images/items/yield/pyrit_amulett.png?1', image_mini:'images/items/yield/pyrit_amulett.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1947] = {item_id:1947, nshort:'graphit', name:'Grafit', type:'yield', level:0, price:20, image:'/images/items/yield/graphit.png?1', image_mini:'images/items/yield/graphit.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1948] = {item_id:1948, nshort:'graphitpulver', name:'Sproszkowany grafit', type:'yield', level:0, price:25, image:'/images/items/yield/graphitpulver.png?1', image_mini:'images/items/yield/graphitpulver.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1949] = {item_id:1949, nshort:'graphit_glue', name:'Smar grafitowy', type:'yield', level:0, price:50, image:'/images/items/yield/graphit_glue.png?1', image_mini:'images/items/yield/graphit_glue.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1950] = {item_id:1950, nshort:'workedleather', name:'Wygarbowana skóra', type:'yield', level:0, price:16, image:'/images/items/yield/workedleather.png?1', image_mini:'images/items/yield/workedleather.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
    PK_S3.items[1951] = {item_id:1951, nshort:'leathersac', name:'Skórzana torba', type:'yield', level:0, price:25, image:'/images/items/yield/leathersac.png?1', image_mini:'images/items/yield/leathersac.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1952] = {item_id:1952, nshort:'foodsac', name:'Torba z paszą', type:'yield', level:0, price:50, image:'/images/items/yield/foodsac.png?1', image_mini:'images/items/yield/foodsac.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1953] = {item_id:1953, nshort:'simple_bow', name:'Łuk', type:'yield', level:0, price:50, image:'/images/items/yield/simple_bow.png?1', image_mini:'images/items/yield/simple_bow.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1954] = {item_id:1954, nshort:'simple_rifle', name:'Broń', type:'yield', level:0, price:50, image:'/images/items/yield/simple_rifle.png?1', image_mini:'images/items/yield/simple_rifle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[1955] = {item_id:1955, nshort:'scalp_yield', name:'Skalp', type:'yield', level:1, price:10, image:'/images/items/yield/scalp_yield.png?1', image_mini:'images/items/yield/scalp_yield.png?1', bonus:{skills:{leadership:5, hide:7, endurance:7}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:66, tradeable:true, sellable:true};
    PK_S3.items[1956] = {item_id:1956, nshort:'totem_snake', name:'Totem węża', type:'yield', level:1, price:10, image:'/images/items/yield/totem_snake.png?1', image_mini:'images/items/yield/totem_snake.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[1957] = {item_id:1957, nshort:'totem_cougart', name:'Totem pumy', type:'yield', level:1, price:0, image:'/images/items/yield/totem_cougart.png?1', image_mini:'images/items/yield/totem_cougart.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[1958] = {item_id:1958, nshort:'totem_eagle', name:'Totem orła', type:'yield', level:1, price:10, image:'/images/items/yield/totem_eagle.png?1', image_mini:'images/items/yield/totem_eagle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};

    PK_S3.items[1960] = {item_id:1960, nshort:'leatherbag', name:'Skórzany worek', type:'yield', level:0, price:39, image:'/images/items/yield/leatherbag.png?1', image_mini:'images/items/yield/leatherbag.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1961] = {item_id:1961, nshort:'leatherpouch', name:'Skórzana sakiewka', type:'yield', level:0, price:93, image:'/images/items/yield/leatherpouch.png?1', image_mini:'images/items/yield/leatherpouch.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1962] = {item_id:1962, nshort:'salt', name:'Sól', type:'yield', level:0, price:55, image:'/images/items/yield/salt.png?1', image_mini:'images/items/yield/salt.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1963] = {item_id:1963, nshort:'fertilizer', name:'Nawóz', type:'yield', level:0, price:49, image:'/images/items/yield/fertilizer.png?1', image_mini:'images/items/yield/fertilizer.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1964] = {item_id:1964, nshort:'tin', name:'Blaszanka', type:'yield', level:0, price:110, image:'/images/items/yield/tin.png?1', image_mini:'images/items/yield/tin.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1965] = {item_id:1965, nshort:'old_letters', name:'Stare listy', type:'yield', level:0, price:1, image:'/images/items/yield/old_letters.png?1', image_mini:'images/items/yield/old_letters.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1966] = {item_id:1966, nshort:'ownership_certification', name:'Prawo własności farmy', type:'yield', level:0, price:30, image:'/images/items/yield/ownership_certification.png?1', image_mini:'images/items/yield/ownership_certification.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1967] = {item_id:1967, nshort:'bag_of_vittles', name:'Sakiewka z prowiantem', type:'yield', level:0, price:93, image:'/images/items/yield/bag_of_vittles.png?1', image_mini:'images/items/yield/bag_of_vittles.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1968] = {item_id:1968, nshort:'horse_tonic', name:'Tonik dla konia', type:'yield', level:0, price:69, image:'/images/items/yield/horse_tonic.png?1', image_mini:'images/items/yield/horse_tonic.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[1969] = {item_id:1969, nshort:'12_years_old_whiskey', name:'Dwunastoletnia whiskey', type:'yield', level:0, price:62, image:'/images/items/yield/12_years_old_whiskey.png?1', image_mini:'images/items/yield/12_years_old_whiskey.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1970] = {item_id:1970, nshort:'cherry_cake', name:'Tort wiśniowy', type:'yield', level:0, price:39, image:'/images/items/yield/cherry_cake.png?1', image_mini:'images/items/yield/cherry_cake.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1971] = {item_id:1971, nshort:'tabacopipe', name:'Dobrze upchana fajka pokoju', type:'yield', level:0, price:99, image:'/images/items/yield/tabacopipe.png?1', image_mini:'images/items/yield/tabacopipe.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[1972] = {item_id:1972, nshort:'harmonica', name:'Harmonijka', type:'yield', level:0, price:0, image:'/images/items/yield/harmonica.png?1', image_mini:'images/items/yield/harmonica.png?1', bonus:{skills:{finger_dexterity:8}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[1973] = {item_id:1973, nshort:'juniper_brew', name:'Gin', type:'yield', level:0, price:7, image:'/images/items/yield/juniper_brew.png?1', image_mini:'images/items/yield/juniper_brew.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1974] = {item_id:1974, nshort:'lifeelixir', name:'Eliksir życia', type:'yield', level:0, price:7, image:'/images/items/yield/lifeelixir.png?1', image_mini:'images/items/yield/lifeelixir.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[1975] = {item_id:1975, nshort:'productchest_1', name:'Torba z zwykłym produktem', type:'yield', level:0, price:7, image:'/images/items/yield/productchest_1.png?1', image_mini:'images/items/yield/productchest_1.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	PK_S3.items[1976] = {item_id:1976, nshort:'productchest_2', name:'Skrzynka z rzadkim produktem', type:'yield', level:0, price:7, image:'/images/items/yield/productchest_2.png?1', image_mini:'images/items/yield/productchest_2.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	PK_S3.items[1977] = {item_id:1977, nshort:'reset_potion', name:'Napój nowego początku', type:'yield', level:0, price:10, image:'/images/items/yield/reset_potion.png?1', image_mini:'images/items/yield/reset_potion.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:99, tradeable:true, sellable:true};
	PK_S3.items[1978] = {item_id:1978, nshort:'skill_reset_potion', name:'Napój zapomnienia', type:'yield', level:0, price:10, image:'/images/items/yield/skill_reset_potion.png?1', image_mini:'images/items/yield/skill_reset_potion.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:99, tradeable:true, sellable:true};
	PK_S3.items[1979] = {item_id:1979, nshort:'att_reset_potion', name:'Napój oduczenia', type:'yield', level:0, price:10, image:'/images/items/yield/att_reset_potion.png?1', image_mini:'images/items/yield/att_reset_potion.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:99, tradeable:true, sellable:true};
    PK_S3.items[1980] = {item_id:1980, nshort:'dried_meat', name:'Вяленое мясо', type:'yield', level:0, price:83, image:'/images/items/yield/dried_meat.png?1', image_mini:'images/items/yield/dried_meat.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[1981] = {item_id:1981, nshort:'gulash', name:'Gulasz', type:'yield', level:0, price:278, image:'/images/items/yield/gulash.png?1', image_mini:'images/items/yield/gulash.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
	PK_S3.items[1982] = {item_id:1982, nshort:'spare_ribs', name:'Żeberka', type:'yield', level:0, price:416, image:'/images/items/yield/spare_ribs.png?1', image_mini:'images/items/yield/spare_ribs.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
	
	PK_S3.items[1984] = {item_id:1984, nshort:'hair_tonic', name:'Odżywka do włosów', type:'yield', level:0, price:630, image:'/images/items/yield/hair_tonic.png?1', image_mini:'images/items/yield/hair_tonic.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
	
	PK_S3.items[1988] = {item_id:1988, nshort:'adorned_holster', name:'Wytrzymała kabura', type:'yield', level:0, price:207, image:'/images/items/yield/adorned_holster.png?1', image_mini:'images/items/yield/adorned_holster.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
	
	PK_S3.items[1990] = {item_id:1990, nshort:'silvered_flask', name:'Piersiówka', type:'yield', level:0, price:618, image:'/images/items/yield/silvered_flask.png?1', image_mini:'images/items/yield/silvered_flask.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
	
	PK_S3.items[1992] = {item_id:1992, nshort:'old_newspaper', name:'Stara gazeta', type:'yield', level:0, price:1, image:'/images/items/yield/old_newspaper.png?1', image_mini:'images/items/yield/old_newspaper.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	PK_S3.items[1993] = {item_id:1993, nshort:'bearer_bond_stack', name:'Sterta papierów wartościowych', type:'yield', level:0, price:0, image:'/images/items/yield/bearer_bond_stack.png?1', image_mini:'images/items/yield/bearer_bond_stack.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	PK_S3.items[1994] = {item_id:1994, nshort:'lamb_meat', name:'Baranina', type:'yield', level:0, price:25, image:'/images/items/yield/lamb_meat.png?1', image_mini:'images/items/yield/lamb_meat.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[1995] = {item_id:1995, nshort:'buffalo_meat', name:'Bawole mięso', type:'yield', level:0, price:20, image:'/images/items/yield/buffalo_meat.png?1', image_mini:'images/items/yield/buffalo_meat.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	PK_S3.items[1996] = {item_id:1996, nshort:'loaf_bread', name:'Bochenek chleba', type:'yield', level:0, price:8, image:'/images/items/yield/loaf_bread.png?1', image_mini:'images/items/yield/loaf_bread.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	PK_S3.items[1997] = {item_id:1997, nshort:'thanksgiving_turkey', name:'Świąteczny pieczony indyk', type:'yield', level:0, price:1, image:'/images/items/yield/thanksgiving_turkey.png?1', image_mini:'images/items/yield/thanksgiving_turkey.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	PK_S3.items[1998] = {item_id:1998, nshort:'christmas_stollen', name:'Świąteczna babka', type:'yield', level:0, price:1, image:'/images/items/yield/christmas_stollen.png?1', image_mini:'images/items/yield/christmas_stollen.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[1999] = {item_id:1999, nshort:'canned_beans', name:'Fasola w puszce', type:'yield', level:0, price:500, image:'/images/items/yield/canned_beans.png?1', image_mini:'images/items/yield/canned_beans.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
	PK_S3.items[2000] = {item_id:2000, nshort:'habanero_chilis', name:'Papryczki Habanero', type:'yield', level:0, price:200, image:'/images/items/yield/habanero_chilis.png?1', image_mini:'images/items/yield/habanero_chilis.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
	
    PK_S3.items[2102] = {item_id:2102, nshort:'medium_work_manual', name:'Zaawansowane wskazówki do prac', type:'yield', level:50, price:0, image:'/images/items/yield/medium_work_manual.png?1', image_mini:'images/items/yield/medium_work_manual.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	PK_S3.items[2003] = {item_id:2003, nshort:'cobra_fangs', name:'Ząb kobry', type:'yield', level:0, price:200, image:'/images/items/yield/cobra_fangs.png?1', image_mini:'images/items/yield/cobra_fangs.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
	
	PK_S3.items[2006] = {item_id:2006, nshort:'cossack_saddle_blanket', name:'Kozacki czaprak', type:'yield', level:0, price:200, image:'/images/items/yield/cossack_saddle_blanket.png?1', image_mini:'images/items/yield/cossack_saddle_blanket.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
	
	PK_S3.items[2009] = {item_id:2009, nshort:'gilded_cogs', name:'Pozłacane tryby', type:'yield', level:0, price:200, image:'/images/items/yield/gilded_cogs.png?1', image_mini:'images/items/yield/gilded_cogs.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
	
    PK_S3.items[2100] = {item_id:2100, nshort:'low_work_manual', name:'Podstawowe wskazówki do prac', type:'yield', level:20, price:0, image:'/images/items/yield/low_work_manual.png?1', image_mini:'images/items/yield/low_work_manual.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	PK_S3.items[2101] = {item_id:2101, nshort:'low_detail_work_manual', name:'Podstawowe szczegółowe wskazówki do prac', type:'yield', level:20, price:0, image:'/images/items/yield/low_detail_work_manual.png?1', image_mini:'images/items/yield/low_detail_work_manual.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	
	PK_S3.items[2116] = {item_id:2116, nshort:'lifejuice', name:'Flakonik życia', type:'yield', level:0, price:0, image:'/images/items/yield/lifejuice.png?1', image_mini:'images/items/yield/lifejuice.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	
	PK_S3.items[2118] = {item_id:2118, nshort:'very_low_detail_work_manual', name:'Trivial detailed work instructions', type:'yield', level:10, price:0, image:'/images/items/yield/very_low_detail_work_manual.png?1', image_mini:'images/items/yield/very_low_detail_work_manual.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	PK_S3.items[2119] = {item_id:2119, nshort:'weak_very_low_fort_damage', name:'Tłusty olej do broni', type:'yield', level:0, price:0, image:'/images/items/yield/weak_very_low_fort_damage.png?1', image_mini:'images/items/yield/weak_very_low_fort_damage.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	PK_S3.items[2120] = {item_id:2120, nshort:'strong_very_low_fort_damage', name:'Bardzo tłusty olej do broni', type:'yield', level:0, price:0, image:'/images/items/yield/strong_very_low_fort_damage.png?1', image_mini:'images/items/yield/strong_very_low_fort_damage.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	
	PK_S3.items[2126] = {item_id:2126, nshort:'very_low_work_manual', name:'Banalne wskazówki do prac', type:'yield', level:10, price:0, image:'/images/items/yield/very_low_work_manual.png?1', image_mini:'images/items/yield/very_low_work_manual.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	
    PK_S3.items[2135] = {item_id:2135, nshort:'weak_fast_movement', name:'Proszek ze skorupy rakietowego żółwia', type:'yield', level:0, price:0, image:'/images/items/yield/weak_fast_movement.png?1', image_mini:'images/items/yield/weak_fast_movement.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	PK_S3.items[2136] = {item_id:2136, nshort:'yellow_letter', name:'Zielony list', type:'yield', level:0, price:0, image:'/images/items/yield/yellow_letter.png?1', image_mini:'images/items/yield/yellow_letter.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	PK_S3.items[2137] = {item_id:2137, nshort:'red_letter', name:'Czerwony list', type:'yield', level:0, price:0, image:'/images/items/yield/red_letter.png?1', image_mini:'images/items/yield/red_letter.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	
	PK_S3.items[2144] = {item_id:2144, nshort:'bunny_egg', name:'Jajko zajączka wielkanocnego', type:'yield', level:0, price:0, image:'/images/items/yield/bunny_egg.png?1', image_mini:'images/items/yield/bunny_egg.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	PK_S3.items[2145] = {item_id:2145, nshort:'fitzburn_recommendation', name:'Letter of recommendation', type:'yield', level:0, price:0, image:'/images/items/yield/fitzburn_recommendation.png?1', image_mini:'images/items/yield/fitzburn_recommendation.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	PK_S3.items[2146] = {item_id:2146, nshort:'bible_quote', name:'Notatka', type:'yield', level:0, price:0, image:'/images/items/yield/bible_quote.png?1', image_mini:'images/items/yield/bible_quote.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[2147] = {item_id:2147, nshort:'small_powder_box', name:'Puszka z proszkiem', type:'yield', level:0, price:0, image:'/images/items/yield/small_powder_box.png?1', image_mini:'images/items/yield/small_powder_box.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[2148] = {item_id:2148, nshort:'letter_to_seaver', name:'List do ojca Seavera', type:'yield', level:0, price:0, image:'/images/items/yield/letter_to_seaver.png?1', image_mini:'images/items/yield/letter_to_seaver.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	
/* --------------------------------------- SPODNIE --------------------------------------- */
	PK_S3.items[10000] = {item_id:10000, nshort:'shredded_grey', name:'Podarte szare spodnie', type:'pants', level:1, price:10, image:'/images/items/pants/shredded_grey.png?1', image_mini:'/images/items/pants/mini/shredded_grey.png?1', bonus:{skills:{ride:1}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10001] = {item_id:10001, nshort:'shredded_yellow', name:'Podarte żółte spodnie', type:'pants', level:1, price:35, image:'/images/items/pants/shredded_yellow.png?1', image_mini:'/images/items/pants/mini/shredded_yellow.png?1', bonus:{skills:{tactic:1, leadership:1}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[10002] = {item_id:10002, nshort:'shredded_blue', name:'Podarte niebieskie spodnie', type:'pants', level:2, price:55, image:'/images/items/pants/shredded_blue.png?1', image_mini:'/images/items/pants/mini/shredded_blue.png?1', bonus:{skills:{animal:2, ride:1}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10003] = {item_id:10003, nshort:'shredded_green', name:'Podarte zielone spodnie', type:'pants', level:2, price:65, image:'/images/items/pants/shredded_green.png?1', image_mini:'/images/items/pants/mini/shredded_green.png?1', bonus:{skills:{swim:1, punch:2, build:1}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10004] = {item_id:10004, nshort:'shredded_brown', name:'Podarte brązowe spodnie', type:'pants', level:3, price:95, image:'/images/items/pants/shredded_brown.png?1', image_mini:'/images/items/pants/mini/shredded_brown.png?1', bonus:{skills:{appearance:1, leadership:1}, attributes:{charisma:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10005] = {item_id:10005, nshort:'shredded_black', name:'Podarte czarne spodnie', type:'pants', level:3, price:95, image:'/images/items/pants/shredded_black.png?1', image_mini:'/images/items/pants/mini/shredded_black.png?1', bonus:{skills:{pitfall:1, endurance:1}, attributes:{strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10006] = {item_id:10006, nshort:'shredded_p1', name:'Szlacheckie podarte spodnie', type:'pants', level:4, price:290, image:'/images/items/pants/shredded_p1.png?1', image_mini:'/images/items/pants/mini/shredded_p1.png?1', bonus:{skills:{hide:1, reflex:1, ride:3}, attributes:{flexibility:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10007] = {item_id:10007, nshort:'shredded_fine', name:'Podarte spodnie Jima', type:'pants', level:6, price:420, image:'/images/items/pants/shredded_fine.png?1', image_mini:'/images/items/pants/mini/shredded_fine.png?1', bonus:{skills:{repair:3, finger_dexterity:3, endurance:3, build:6}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[10010] = {item_id:10010, nshort:'shorts_grey', name:'Szare spodenki', type:'pants', level:7, price:232, image:'/images/items/pants/shorts_grey.png?1', image_mini:'/images/items/pants/mini/shorts_grey.png?1', bonus:{skills:{tactic:3, swim:3, ride:4}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10011] = {item_id:10011, nshort:'shorts_yellow', name:'Żółte spodenki', type:'pants', level:8, price:430, image:'/images/items/pants/shorts_yellow.png?1', image_mini:'/images/items/pants/mini/shorts_yellow.png?1', bonus:{skills:{leadership:5, hide:7}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10012] = {item_id:10012, nshort:'shorts_blue', name:'Niebieskie spodenki', type:'pants', level:8, price:430, image:'/images/items/pants/shorts_blue.png?1', image_mini:'/images/items/pants/mini/shorts_blue.png?1', bonus:{skills:{animal:6, trade:2, ride:5}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10013] = {item_id:10013, nshort:'shorts_green', name:'Zielone spodenki', type:'pants', level:8, price:430, image:'/images/items/pants/shorts_green.png?1', image_mini:'/images/items/pants/mini/shorts_green.png?1', bonus:{skills:{repair:5, punch:4, build:5}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10014] = {item_id:10014, nshort:'shorts_brown', name:'Brązowe spodenki', type:'pants', level:9, price:470, image:'/images/items/pants/shorts_brown.png?1', image_mini:'/images/items/pants/mini/shorts_brown.png?1', bonus:{skills:{pitfall:5, shot:3, endurance:3}, attributes:{strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10015] = {item_id:10015, nshort:'shorts_black', name:'Czarne spodenki', type:'pants', level:9, price:480, image:'/images/items/pants/shorts_black.png?1', image_mini:'/images/items/pants/mini/shorts_black.png?1', bonus:{skills:{trade:4, leadership:6}, attributes:{charisma:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10016] = {item_id:10016, nshort:'shorts_p1', name:'Szlacheckie spodenki', type:'pants', level:10, price:1280, image:'/images/items/pants/shorts_p1.png?1', image_mini:'/images/items/pants/mini/shorts_p1.png?1', bonus:{skills:{appearance:6, finger_dexterity:8, reflex:5, tough:4}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10017] = {item_id:10017, nshort:'shorts_fine', name:'Spodenki Franka Butlera', type:'pants', level:12, price:1460, image:'/images/items/pants/shorts_fine.png?1', image_mini:'/images/items/pants/mini/shorts_fine.png?1', bonus:{skills:{shot:8, aim:7, dodge:7, health:6}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[10020] = {item_id:10020, nshort:'puritan_grey', name:'Gładkie szare spodnie', type:'pants', level:12, price:360, image:'/images/items/pants/puritan_grey.png?1', image_mini:'/images/items/pants/mini/puritan_grey.png?1', bonus:{skills:{hide:2, ride:5, punch:4}, attributes:{strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10021] = {item_id:10021, nshort:'puritan_yellow', name:'Gładkie żółte spodnie', type:'pants', level:13, price:600, image:'/images/items/pants/puritan_yellow.png?1', image_mini:'/images/items/pants/mini/puritan_yellow.png?1', bonus:{skills:{hide:6, reflex:5}, attributes:{dexterity:1, flexibility:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10022] = {item_id:10022, nshort:'puritan_blue', name:'Gładkie niebieskie spodnie', type:'pants', level:13, price:640, image:'/images/items/pants/puritan_blue.png?1', image_mini:'/images/items/pants/mini/puritan_blue.png?1', bonus:{skills:{pitfall:4, swim:10}, attributes:{strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10023] = {item_id:10023, nshort:'puritan_green', name:'Gładkie zielone spodnie', type:'pants', level:13, price:630, image:'/images/items/pants/puritan_green.png?1', image_mini:'/images/items/pants/mini/puritan_green.png?1', bonus:{skills:{leadership:7, endurance:5, build:8}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10024] = {item_id:10024, nshort:'puritan_brown', name:'Gładkie brązowe spodnie', type:'pants', level:14, price:650, image:'/images/items/pants/puritan_brown.png?1', image_mini:'/images/items/pants/mini/puritan_brown.png?1', bonus:{skills:{tactic:8, finger_dexterity:7, tough:6}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10025] = {item_id:10025, nshort:'puritan_black', name:'Gładkie czarne spodnie', type:'pants', level:14, price:670, image:'/images/items/pants/puritan_black.png?1', image_mini:'/images/items/pants/mini/puritan_black.png?1', bonus:{skills:{animal:9, trade:5, shot:7}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_farmer', name:'Komplet Farmera'}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10026] = {item_id:10026, nshort:'puritan_p1', name:'Szlacheckie gładkie spodnie', type:'pants', level:15, price:1680, image:'/images/items/pants/puritan_p1.png?1', image_mini:'/images/items/pants/mini/puritan_p1.png?1', bonus:{skills:{pitfall:5, reflex:9}, attributes:{dexterity:1, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10027] = {item_id:10027, nshort:'puritan_fine', name:'Gładkie spodnie Huckleberry\'ego', type:'pants', level:16, price:1800, image:'/images/items/pants/puritan_fine.png?1', image_mini:'/images/items/pants/mini/puritan_fine.png?1', bonus:{skills:{repair:6, finger_dexterity:6, swim:8, build:12}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[10030] = {item_id:10030, nshort:'shortscheck_grey', name:'Szare szorty', type:'pants', level:16, price:610, image:'/images/items/pants/shortscheck_grey.png?1', image_mini:'/images/items/pants/mini/shortscheck_grey.png?1', bonus:{skills:{endurance:10, punch:7}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10031] = {item_id:10031, nshort:'shortscheck_yellow', name:'Żółte szorty', type:'pants', level:17, price:1520, image:'/images/items/pants/shortscheck_yellow.png?1', image_mini:'/images/items/pants/mini/shortscheck_yellow.png?1', bonus:{skills:{repair:10, pitfall:8}, attributes:{dexterity:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10032] = {item_id:10032, nshort:'shortscheck_blue', name:'Niebieskie szorty', type:'pants', level:17, price:1560, image:'/images/items/pants/shortscheck_blue.png?1', image_mini:'/images/items/pants/mini/shortscheck_blue.png?1', bonus:{skills:{}, attributes:{charisma:2, dexterity:3, flexibility:1, strength:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10033] = {item_id:10033, nshort:'shortscheck_green', name:'Zielone szorty', type:'pants', level:17, price:1520, image:'/images/items/pants/shortscheck_green.png?1', image_mini:'/images/items/pants/mini/shortscheck_green.png?1', bonus:{skills:{hide:10, tough:8}, attributes:{charisma:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10034] = {item_id:10034, nshort:'shortscheck_brown', name:'Brązowe szorty', type:'pants', level:18, price:1620, image:'/images/items/pants/shortscheck_brown.png?1', image_mini:'/images/items/pants/mini/shortscheck_brown.png?1', bonus:{skills:{shot:10, aim:7, dodge:9}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10035] = {item_id:10035, nshort:'shortscheck_black', name:'Czarne szorty', type:'pants', level:18, price:1660, image:'/images/items/pants/shortscheck_black.png?1', image_mini:'/images/items/pants/mini/shortscheck_black.png?1', bonus:{skills:{appearance:9, trade:10, tactic:8}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10036] = {item_id:10036, nshort:'shortscheck_p1', name:'Szlacheckie szorty', type:'pants', level:19, price:2880, image:'/images/items/pants/shortscheck_p1.png?1', image_mini:'/images/items/pants/mini/shortscheck_p1.png?1', bonus:{skills:{repair:10, finger_dexterity:10, pitfall:9, shot:8}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10037] = {item_id:10037, nshort:'shortscheck_fine', name:'Szorty Washingtona Irvinga', type:'pants', level:20, price:3120, image:'/images/items/pants/shortscheck_fine.png?1', image_mini:'/images/items/pants/mini/shortscheck_fine.png?1', bonus:{skills:{leadership:8, swim:10, reflex:9, ride:12}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[10040] = {item_id:10040, nshort:'check_grey', name:'Szare spodnie w kratę', type:'pants', level:20, price:690, image:'/images/items/pants/check_grey.png?1', image_mini:'/images/items/pants/mini/check_grey.png?1', bonus:{skills:{hide:8, reflex:5, endurance:5}, attributes:{strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10041] = {item_id:10041, nshort:'check_yellow', name:'Żółte spodnie w kratę', type:'pants', level:21, price:1720, image:'/images/items/pants/check_yellow.png?1', image_mini:'/images/items/pants/mini/check_yellow.png?1', bonus:{skills:{tough:7, punch:8}, attributes:{dexterity:2, strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10042] = {item_id:10042, nshort:'check_blue', name:'Niebieskie spodnie w kratę', type:'pants', level:21, price:1760, image:'/images/items/pants/check_blue.png?1', image_mini:'/images/items/pants/mini/check_blue.png?1', bonus:{skills:{pitfall:8, swim:6, build:10}, attributes:{flexibility:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10043] = {item_id:10043, nshort:'check_green', name:'Zielone spodnie w kratę', type:'pants', level:21, price:1780, image:'/images/items/pants/check_green.png?1', image_mini:'/images/items/pants/mini/check_green.png?1', bonus:{skills:{appearance:7, health:8, punch:6}, attributes:{strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10044] = {item_id:10044, nshort:'check_brown', name:'Brązowe spodnie w kratę', type:'pants', level:22, price:1840, image:'/images/items/pants/check_brown.png?1', image_mini:'/images/items/pants/mini/check_brown.png?1', bonus:{skills:{shot:8, hide:6, ride:8}, attributes:{flexibility:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10045] = {item_id:10045, nshort:'check_black', name:'Czarne spodnie w kratę', type:'pants', level:22, price:1880, image:'/images/items/pants/check_black.png?1', image_mini:'/images/items/pants/mini/check_black.png?1', bonus:{skills:{repair:10, finger_dexterity:10}, attributes:{flexibility:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10046] = {item_id:10046, nshort:'check_p1', name:'Szlacheckie spodnie w kratę', type:'pants', level:24, price:3540, image:'/images/items/pants/check_p1.png?1', image_mini:'/images/items/pants/mini/check_p1.png?1', bonus:{skills:{appearance:12, animal:10, trade:12, tactic:12}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10047] = {item_id:10047, nshort:'check_fine', name:'Spodnie w kratę Annie Oakley', type:'pants', level:25, price:3630, image:'/images/items/pants/check_fine.png?1', image_mini:'/images/items/pants/mini/check_fine.png?1', bonus:{skills:{shot:12, aim:14, dodge:10, health:9}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[10050] = {item_id:10050, nshort:'fur_grey', name:'Szare futrzane spodnie', type:'pants', level:25, price:1230, image:'/images/items/pants/fur_grey.png?1', image_mini:'/images/items/pants/mini/fur_grey.png?1', bonus:{skills:{shot:7, hide:8, reflex:8}, attributes:{dexterity:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10051] = {item_id:10051, nshort:'fur_yellow', name:'Żółte futrzane spodnie', type:'pants', level:26, price:3000, image:'/images/items/pants/fur_yellow.png?1', image_mini:'/images/items/pants/mini/fur_yellow.png?1', bonus:{skills:{endurance:8, punch:8, build:9}, attributes:{strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10052] = {item_id:10052, nshort:'fur_blue', name:'Niebieskie futrzane spodnie', type:'pants', level:26, price:3060, image:'/images/items/pants/fur_blue.png?1', image_mini:'/images/items/pants/mini/fur_blue.png?1', bonus:{skills:{animal:8, pitfall:14, hide:10}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10053] = {item_id:10053, nshort:'fur_green', name:'Zielone futrzane spodnie', type:'pants', level:26, price:3000, image:'/images/items/pants/fur_green.png?1', image_mini:'/images/items/pants/mini/fur_green.png?1', bonus:{skills:{appearance:16}, attributes:{charisma:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10054] = {item_id:10054, nshort:'fur_brown', name:'Brązowe futrzane spodnie', type:'pants', level:27, price:3090, image:'/images/items/pants/fur_brown.png?1', image_mini:'/images/items/pants/mini/fur_brown.png?1', bonus:{skills:{tactic:14, leadership:11, finger_dexterity:7}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_mexican', name:'Komplet Meksykanina'}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10055] = {item_id:10055, nshort:'fur_black', name:'Czarne futrzane spodnie', type:'pants', level:27, price:3120, image:'/images/items/pants/fur_black.png?1', image_mini:'/images/items/pants/mini/fur_black.png?1', bonus:{skills:{trade:17, endurance:12}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10056] = {item_id:10056, nshort:'fur_p1', name:'Szlacheckie futrzane spodnie', type:'pants', level:30, price:4725, image:'/images/items/pants/fur_p1.png?1', image_mini:'/images/items/pants/mini/fur_p1.png?1', bonus:{skills:{repair:10, swim:15, ride:15, tough:10}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10057] = {item_id:10057, nshort:'fur_fine', name:'Futrzane spodnie Czejenów', type:'pants', level:32, price:5075, image:'/images/items/pants/fur_fine.png?1', image_mini:'/images/items/pants/mini/fur_fine.png?1', bonus:{skills:{shot:19, dodge:15}, attributes:{charisma:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[10060] = {item_id:10060, nshort:'dungarees_grey', name:'Szary kombinezon', type:'pants', level:31, price:1395, image:'/images/items/pants/dungarees_grey.png?1', image_mini:'/images/items/pants/mini/dungarees_grey.png?1', bonus:{skills:{pitfall:15}, attributes:{dexterity:2, strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10061] = {item_id:10061, nshort:'dungarees_yellow', name:'Żółty kombinezon', type:'pants', level:32, price:3360, image:'/images/items/pants/dungarees_yellow.png?1', image_mini:'/images/items/pants/mini/dungarees_yellow.png?1', bonus:{skills:{repair:12, finger_dexterity:10, reflex:14}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10062] = {item_id:10062, nshort:'dungarees_blue', name:'Niebieski kombinezon', type:'pants', level:32, price:3420, image:'/images/items/pants/dungarees_blue.png?1', image_mini:'/images/items/pants/mini/dungarees_blue.png?1', bonus:{skills:{ride:15, punch:9, build:12}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10063] = {item_id:10063, nshort:'dungarees_green', name:'Zielony kombinezon', type:'pants', level:32, price:3420, image:'/images/items/pants/dungarees_green.png?1', image_mini:'/images/items/pants/mini/dungarees_green.png?1', bonus:{skills:{swim:14, endurance:12, tough:11}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10064] = {item_id:10064, nshort:'dungarees_brown', name:'Brązowy kombinezon', type:'pants', level:33, price:3510, image:'/images/items/pants/dungarees_brown.png?1', image_mini:'/images/items/pants/mini/dungarees_brown.png?1', bonus:{skills:{shot:15, hide:15}, attributes:{dexterity:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10065] = {item_id:10065, nshort:'dungarees_black', name:'Czarny kombinezon', type:'pants', level:33, price:3540, image:'/images/items/pants/dungarees_black.png?1', image_mini:'/images/items/pants/mini/dungarees_black.png?1', bonus:{skills:{trade:14, tactic:10, leadership:14}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10066] = {item_id:10066, nshort:'dungarees_p1', name:'Szlachecki kombinezon', type:'pants', level:35, price:5250, image:'/images/items/pants/dungarees_p1.png?1', image_mini:'/images/items/pants/mini/dungarees_p1.png?1', bonus:{skills:{appearance:15, animal:15}, attributes:{charisma:3, dexterity:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10067] = {item_id:10067, nshort:'dungarees_fine', name:'Kombinezon Boba Budowniczego', type:'pants', level:38, price:5775, image:'/images/items/pants/dungarees_fine.png?1', image_mini:'/images/items/pants/mini/dungarees_fine.png?1', bonus:{skills:{endurance:17, punch:17, build:17}, attributes:{strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[10070] = {item_id:10070, nshort:'fine_grey', name:'Szare płócienne spodnie', type:'pants', level:37, price:1470, image:'/images/items/pants/fine_grey.png?1', image_mini:'/images/items/pants/mini/fine_grey.png?1', bonus:{skills:{trade:10, leadership:11}, attributes:{charisma:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10071] = {item_id:10071, nshort:'fine_yellow', name:'Żółte płócienne spodnie', type:'pants', level:38, price:3600, image:'/images/items/pants/fine_yellow.png?1', image_mini:'/images/items/pants/mini/fine_yellow.png?1', bonus:{skills:{animal:19, pitfall:7, ride:10}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10072] = {item_id:10072, nshort:'fine_blue', name:'Niebieskie płócienne spodnie', type:'pants', level:38, price:3570, image:'/images/items/pants/fine_blue.png?1', image_mini:'/images/items/pants/mini/fine_blue.png?1', bonus:{skills:{repair:7, swim:15, hide:15}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10073] = {item_id:10073, nshort:'fine_green', name:'Zielone płócienne spodnie', type:'pants', level:38, price:3570, image:'/images/items/pants/fine_green.png?1', image_mini:'/images/items/pants/mini/fine_green.png?1', bonus:{skills:{appearance:17, tactic:17}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10074] = {item_id:10074, nshort:'fine_brown', name:'Brązowe płócienne spodnie', type:'pants', level:40, price:3630, image:'/images/items/pants/fine_brown.png?1', image_mini:'/images/items/pants/mini/fine_brown.png?1', bonus:{skills:{reflex:19}, attributes:{dexterity:3, flexibility:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10075] = {item_id:10075, nshort:'fine_black', name:'Czarne płócienne spodnie', type:'pants', level:40, price:3450, image:'/images/items/pants/fine_black.png?1', image_mini:'/images/items/pants/mini/fine_black.png?1', bonus:{skills:{dodge:9, health:8, endurance:15}, attributes:{strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_gentleman', name:'Komplet Dżentelmena'}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10076] = {item_id:10076, nshort:'fine_p1', name:'Szlacheckie płócienne spodnie', type:'pants', level:45, price:5775, image:'/images/items/pants/fine_p1.png?1', image_mini:'/images/items/pants/mini/fine_p1.png?1', bonus:{skills:{finger_dexterity:12, shot:12, tough:15, punch:12}, attributes:{dexterity:1, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10077] = {item_id:10077, nshort:'fine_fine', name:'Płócienne spodnie Williama Mastersona', type:'pants', level:48, price:6300, image:'/images/items/pants/fine_fine.png?1', image_mini:'/images/items/pants/mini/fine_fine.png?1', bonus:{skills:{pitfall:18, hide:18}, attributes:{dexterity:3, flexibility:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[10080] = {item_id:10080, nshort:'breeches_grey', name:'Szare bryczesy', type:'pants', level:41, price:2020, image:'/images/items/pants/breeches_grey.png?1', image_mini:'/images/items/pants/mini/breeches_grey.png?1', bonus:{skills:{finger_dexterity:7, pitfall:14}, attributes:{flexibility:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10081] = {item_id:10081, nshort:'breeches_yellow', name:'Żółte bryczesy', type:'pants', level:42, price:5000, image:'/images/items/pants/breeches_yellow.png?1', image_mini:'/images/items/pants/mini/breeches_yellow.png?1', bonus:{skills:{leadership:12, repair:17}, attributes:{charisma:1, dexterity:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10082] = {item_id:10082, nshort:'breeches_blue', name:'Niebieskie bryczesy', type:'pants', level:42, price:5040, image:'/images/items/pants/breeches_blue.png?1', image_mini:'/images/items/pants/mini/breeches_blue.png?1', bonus:{skills:{appearance:9, trade:12, tactic:12}, attributes:{flexibility:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10083] = {item_id:10083, nshort:'breeches_green', name:'Zielone bryczesy', type:'pants', level:42, price:5040, image:'/images/items/pants/breeches_green.png?1', image_mini:'/images/items/pants/mini/breeches_green.png?1', bonus:{skills:{endurance:11, tough:6, punch:12}, attributes:{charisma:1, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10084] = {item_id:10084, nshort:'breeches_brown', name:'Brązowe bryczesy', type:'pants', level:44, price:5240, image:'/images/items/pants/breeches_brown.png?1', image_mini:'/images/items/pants/mini/breeches_brown.png?1', bonus:{skills:{repair:14, finger_dexterity:6, shot:10}, attributes:{dexterity:2, flexibility:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10085] = {item_id:10085, nshort:'breeches_black', name:'Czarne bryczesy', type:'pants', level:44, price:5240, image:'/images/items/pants/breeches_black.png?1', image_mini:'/images/items/pants/mini/breeches_black.png?1', bonus:{skills:{hide:14, reflex:14}, attributes:{dexterity:1, flexibility:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_quackery', name:'Komplet Konowała'}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10086] = {item_id:10086, nshort:'breeches_p1', name:'Szlacheckie bryczesy', type:'pants', level:50, price:7965, image:'/images/items/pants/breeches_p1.png?1', image_mini:'/images/items/pants/mini/breeches_p1.png?1', bonus:{skills:{animal:15, ride:15, build:15}, attributes:{charisma:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10087] = {item_id:10087, nshort:'breeches_fine', name:'Bryczesy Harmoniki', type:'pants', level:52, price:8100, image:'/images/items/pants/breeches_fine.png?1', image_mini:'/images/items/pants/mini/breeches_fine.png?1', bonus:{skills:{shot:15, aim:10, dodge:18, health:10}, attributes:{charisma:1, dexterity:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[10090] = {item_id:10090, nshort:'indian_grey', name:'Szare indiańskie spodnie', type:'pants', level:51, price:3330, image:'/images/items/pants/indian_grey.png?1', image_mini:'/images/items/pants/mini/indian_grey.png?1', bonus:{skills:{tough:5, build:15}, attributes:{strength:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10091] = {item_id:10091, nshort:'indian_yellow', name:'Żółte indiańskie spodnie', type:'pants', level:52, price:7000, image:'/images/items/pants/indian_yellow.png?1', image_mini:'/images/items/pants/mini/indian_yellow.png?1', bonus:{skills:{endurance:14, punch:14}, attributes:{dexterity:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10092] = {item_id:10092, nshort:'indian_blue', name:'Niebieskie indiańskie spodnie', type:'pants', level:52, price:7000, image:'/images/items/pants/indian_blue.png?1', image_mini:'/images/items/pants/mini/indian_blue.png?1', bonus:{skills:{repair:12, finger_dexterity:14, pitfall:12}, attributes:{flexibility:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10093] = {item_id:10093, nshort:'indian_green', name:'Zielone indiańskie spodnie', type:'pants', level:52, price:7000, image:'/images/items/pants/indian_green.png?1', image_mini:'/images/items/pants/mini/indian_green.png?1', bonus:{skills:{swim:20, hide:12, reflex:12}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10094] = {item_id:10094, nshort:'indian_brown', name:'Brązowe indiańskie spodnie', type:'pants', level:55, price:7150, image:'/images/items/pants/indian_brown.png?1', image_mini:'/images/items/pants/mini/indian_brown.png?1', bonus:{skills:{shot:15, dodge:10, health:10}, attributes:{dexterity:2, flexibility:1}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_indian', name:'Komplet Indianina'}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10095] = {item_id:10095, nshort:'indian_black', name:'Czarne indiańskie spodnie', type:'pants', level:55, price:7300, image:'/images/items/pants/indian_black.png?1', image_mini:'/images/items/pants/mini/indian_black.png?1', bonus:{skills:{animal:10, tactic:14, ride:15}, attributes:{charisma:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10096] = {item_id:10096, nshort:'indian_p1', name:'Szlacheckie indiańskie spodnie', type:'pants', level:60, price:11100, image:'/images/items/pants/indian_p1.png?1', image_mini:'/images/items/pants/mini/indian_p1.png?1', bonus:{skills:{appearance:17, trade:15, leadership:17}, attributes:{charisma:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10097] = {item_id:10097, nshort:'indian_fine', name:'Spodnie Sacajawei', type:'pants', level:70, price:13320, image:'/images/items/pants/indian_fine.png?1', image_mini:'/images/items/pants/mini/indian_fine.png?1', bonus:{skills:{animal:18, pitfall:18, hide:18, ride:18}, attributes:{dexterity:2, flexibility:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[10100] = {item_id:10100, nshort:'chapsrough_grey', name:'Szare czapsy', type:'pants', level:54, price:4095, image:'/images/items/pants/chapsrough_grey.png?1', image_mini:'/images/items/pants/mini/chapsrough_grey.png?1', bonus:{skills:{tough:15, punch:15}, attributes:{strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10101] = {item_id:10101, nshort:'chapsrough_yellow', name:'Żółte czapsy', type:'pants', level:56, price:8085, image:'/images/items/pants/chapsrough_yellow.png?1', image_mini:'/images/items/pants/mini/chapsrough_yellow.png?1', bonus:{skills:{aim:15, health:18, punch:15}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10102] = {item_id:10102, nshort:'chapsrough_blue', name:'Niebieskie czapsy', type:'pants', level:56, price:8085, image:'/images/items/pants/chapsrough_blue.png?1', image_mini:'/images/items/pants/mini/chapsrough_blue.png?1', bonus:{skills:{repair:17, endurance:14, build:17}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10103] = {item_id:10103, nshort:'chapsrough_green', name:'Zielone czapsy', type:'pants', level:56, price:8085, image:'/images/items/pants/chapsrough_green.png?1', image_mini:'/images/items/pants/mini/chapsrough_green.png?1', bonus:{skills:{animal:15, pitfall:15}, attributes:{charisma:2, dexterity:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10104] = {item_id:10104, nshort:'chapsrough_brown', name:'Brązowe czapsy', type:'pants', level:59, price:8470, image:'/images/items/pants/chapsrough_brown.png?1', image_mini:'/images/items/pants/mini/chapsrough_brown.png?1', bonus:{skills:{finger_dexterity:14, hide:14, ride:15}, attributes:{flexibility:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10105] = {item_id:10105, nshort:'chapsrough_black', name:'Czarne czapsy', type:'pants', level:59, price:8470, image:'/images/items/pants/chapsrough_black.png?1', image_mini:'/images/items/pants/mini/chapsrough_black.png?1', bonus:{skills:{appearance:14, trade:14, shot:15}, attributes:{charisma:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10106] = {item_id:10106, nshort:'chapsrough_p1', name:'Szlacheckie czapsy', type:'pants', level:65, price:12610, image:'/images/items/pants/chapsrough_p1.png?1', image_mini:'/images/items/pants/mini/chapsrough_p1.png?1', bonus:{skills:{tactic:17, leadership:17, swim:13, reflex:13}, attributes:{strength:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10107] = {item_id:10107, nshort:'chapsrough_fine', name:'Czapsy Billy\'ego Kida', type:'pants', level:66, price:13195, image:'/images/items/pants/chapsrough_fine.png?1', image_mini:'/images/items/pants/mini/chapsrough_fine.png?1', bonus:{skills:{dodge:20, health:20}, attributes:{charisma:3, dexterity:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[10110] = {item_id:10110, nshort:'cavalry_grey', name:'Szare wojskowe spodnie', type:'pants', level:61, price:5160, image:'/images/items/pants/cavalry_grey.png?1', image_mini:'/images/items/pants/mini/cavalry_grey.png?1', bonus:{skills:{animal:15, swim:12, reflex:15}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10111] = {item_id:10111, nshort:'cavalry_yellow', name:'Żółte wojskowe spodnie', type:'pants', level:63, price:9660, image:'/images/items/pants/cavalry_yellow.png?1', image_mini:'/images/items/pants/mini/cavalry_yellow.png?1', bonus:{skills:{shot:19, ride:20}, attributes:{dexterity:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10112] = {item_id:10112, nshort:'cavalry_blue', name:'Niebieskie wojskowe spodnie', type:'pants', level:63, price:9600, image:'/images/items/pants/cavalry_blue.png?1', image_mini:'/images/items/pants/mini/cavalry_blue.png?1', bonus:{skills:{pitfall:17, hide:18, endurance:18}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10113] = {item_id:10113, nshort:'cavalry_green', name:'Zielone wojskowe spodnie', type:'pants', level:63, price:9540, image:'/images/items/pants/cavalry_green.png?1', image_mini:'/images/items/pants/mini/cavalry_green.png?1', bonus:{skills:{trade:15, leadership:15, finger_dexterity:15}, attributes:{charisma:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10114] = {item_id:10114, nshort:'cavalry_brown', name:'Brązowe wojskowe spodnie', type:'pants', level:65, price:9720, image:'/images/items/pants/cavalry_brown.png?1', image_mini:'/images/items/pants/mini/cavalry_brown.png?1', bonus:{skills:{tough:18, punch:18}, attributes:{strength:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10115] = {item_id:10115, nshort:'cavalry_black', name:'Czarne wojskowe spodnie', type:'pants', level:65, price:10020, image:'/images/items/pants/cavalry_black.png?1', image_mini:'/images/items/pants/mini/cavalry_black.png?1', bonus:{skills:{repair:15, build:17}, attributes:{dexterity:2, strength:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10116] = {item_id:10116, nshort:'cavalry_p1', name:'Szlacheckie wojskowe spodnie', type:'pants', level:75, price:15120, image:'/images/items/pants/cavalry_p1.png?1', image_mini:'/images/items/pants/mini/cavalry_p1.png?1', bonus:{skills:{appearance:15, aim:15, dodge:15}, attributes:{charisma:3, dexterity:3, flexibility:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10117] = {item_id:10117, nshort:'cavalry_fine', name:'Spodnie George\'a Crooka', type:'pants', level:85, price:16100, image:'/images/items/pants/cavalry_fine.png?1', image_mini:'/images/items/pants/mini/cavalry_fine.png?1', bonus:{skills:{tactic:23, reflex:15, health:15}, attributes:{charisma:3, strength:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[10120] = {item_id:10120, nshort:'jeans_grey', name:'Szare jeansy', type:'pants', level:71, price:7590, image:'/images/items/pants/jeans_grey.png?1', image_mini:'/images/items/pants/mini/jeans_grey.png?1', bonus:{skills:{tactic:15, shot:15}, attributes:{charisma:2, dexterity:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10121] = {item_id:10121, nshort:'jeans_yellow', name:'Żółte jeansy', type:'pants', level:74, price:11180, image:'/images/items/pants/jeans_yellow.png?1', image_mini:'/images/items/pants/mini/jeans_yellow.png?1', bonus:{skills:{swim:16, endurance:17, punch:16}, attributes:{strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10122] = {item_id:10122, nshort:'jeans_blue', name:'Niebieskie jeansy', type:'pants', level:74, price:11180, image:'/images/items/pants/jeans_blue.png?1', image_mini:'/images/items/pants/mini/jeans_blue.png?1', bonus:{skills:{repair:16, tough:16, build:17}, attributes:{flexibility:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10123] = {item_id:10123, nshort:'jeans_green', name:'Zielone jeansy', type:'pants', level:74, price:11180, image:'/images/items/pants/jeans_green.png?1', image_mini:'/images/items/pants/mini/jeans_green.png?1', bonus:{skills:{pitfall:16, ride:17, health:16}, attributes:{dexterity:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10124] = {item_id:10124, nshort:'jeans_brown', name:'Brązowe jeansy', type:'pants', level:79, price:12350, image:'/images/items/pants/jeans_brown.png?1', image_mini:'/images/items/pants/mini/jeans_brown.png?1', bonus:{skills:{appearance:16, aim:17, dodge:16}, attributes:{charisma:2, dexterity:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10125] = {item_id:10125, nshort:'jeans_black', name:'Czarne jeansy', type:'pants', level:79, price:12350, image:'/images/items/pants/jeans_black.png?1', image_mini:'/images/items/pants/mini/jeans_black.png?1', bonus:{skills:{tactic:17, leadership:16, finger_dexterity:16}, attributes:{flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10126] = {item_id:10126, nshort:'jeans_p1', name:'Szlacheckie jeansy', type:'pants', level:90, price:18900, image:'/images/items/pants/jeans_p1.png?1', image_mini:'/images/items/pants/mini/jeans_p1.png?1', bonus:{skills:{appearance:20, animal:18, trade:20, hide:20}, attributes:{charisma:3, flexibility:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[10127] = {item_id:10127, nshort:'jeans_fine', name:'Jeansy Pata F. Garretta', type:'pants', level:99, price:20700, image:'/images/items/pants/jeans_fine.png?1', image_mini:'/images/items/pants/mini/jeans_fine.png?1', bonus:{skills:{repair:22, shot:20, dodge:24, ride:20}, attributes:{dexterity:3, flexibility:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[10130] = {item_id:10130, nshort:'leather_grey', name:'Szare skórzane spodnie', type:'pants', level:76, price:8880, image:'/images/items/pants/leather_grey.png?1', image_mini:'/images/items/pants/mini/leather_grey.png?1', bonus:{skills:{aim:28}, attributes:{strength:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10131] = {item_id:10131, nshort:'leather_yellow', name:'Żółte skórzane spodnie', type:'pants', level:80, price:13650, image:'/images/items/pants/leather_yellow.png?1', image_mini:'/images/items/pants/mini/leather_yellow.png?1', bonus:{skills:{health:18, tough:20}, attributes:{strength:4}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10132] = {item_id:10132, nshort:'leather_blue', name:'Niebieskie skórzane spodnie', type:'pants', level:80, price:13650, image:'/images/items/pants/leather_blue.png?1', image_mini:'/images/items/pants/mini/leather_blue.png?1', bonus:{skills:{finger_dexterity:18, swim:20}, attributes:{flexibility:4}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10133] = {item_id:10133, nshort:'leather_green', name:'Zielone skórzane spodnie', type:'pants', level:80, price:13650, image:'/images/items/pants/leather_green.png?1', image_mini:'/images/items/pants/mini/leather_green.png?1', bonus:{skills:{reflex:18, build:20}, attributes:{dexterity:4}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10134] = {item_id:10134, nshort:'leather_brown', name:'Brązowe skórzane spodnie', type:'pants', level:85, price:14625, image:'/images/items/pants/leather_brown.png?1', image_mini:'/images/items/pants/mini/leather_brown.png?1', bonus:{skills:{aim:17, dodge:17, punch:17}, attributes:{dexterity:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10135] = {item_id:10135, nshort:'leather_black', name:'Czarne skórzane spodnie', type:'pants', level:85, price:14625, image:'/images/items/pants/leather_black.png?1', image_mini:'/images/items/pants/mini/leather_black.png?1', bonus:{skills:{pitfall:17, hide:17, endurance:17}, attributes:{dexterity:2, flexibility:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10136] = {item_id:10136, nshort:'leather_p1', name:'Szlacheckie skórzane spodnie', type:'pants', level:95, price:20400, image:'/images/items/pants/leather_p1.png?1', image_mini:'/images/items/pants/mini/leather_p1.png?1', bonus:{skills:{animal:20, tactic:20, repair:20}, attributes:{flexibility:4, strength:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[10137] = {item_id:10137, nshort:'leather_fine', name:'Skórzane spodnie Cochise\'a', type:'pants', level:100, price:21680, image:'/images/items/pants/leather_fine.png?1', image_mini:'/images/items/pants/mini/leather_fine.png?1', bonus:{skills:{appearance:15, trade:20, leadership:20, shot:16}, attributes:{charisma:4, flexibility:4}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[10140] = {item_id:10140, nshort:'chapsfine_grey', name:'Szare kowbojskie spodnie', type:'pants', level:84, price:11625, image:'/images/items/pants/chapsfine_grey.png?1', image_mini:'/images/items/pants/mini/chapsfine_grey.png?1', bonus:{skills:{finger_dexterity:17, reflex:17}, attributes:{charisma:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10141] = {item_id:10141, nshort:'chapsfine_yellow', name:'Żółte kowbojskie spodnie', type:'pants', level:88, price:16660, image:'/images/items/pants/chapsfine_yellow.png?1', image_mini:'/images/items/pants/mini/chapsfine_yellow.png?1', bonus:{skills:{leadership:20, swim:24, tough:20}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[10142] = {item_id:10142, nshort:'chapsfine_blue', name:'Niebieskie kowbojskie spodnie', type:'pants', level:88, price:17000, image:'/images/items/pants/chapsfine_blue.png?1', image_mini:'/images/items/pants/mini/chapsfine_blue.png?1', bonus:{skills:{aim:26, health:20}, attributes:{flexibility:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[10143] = {item_id:10143, nshort:'chapsfine_green', name:'Zielone kowbojskie spodnie', type:'pants', level:88, price:17000, image:'/images/items/pants/chapsfine_green.png?1', image_mini:'/images/items/pants/mini/chapsfine_green.png?1', bonus:{skills:{animal:19, trade:20}, attributes:{charisma:3, flexibility:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10144] = {item_id:10144, nshort:'chapsfine_brown', name:'Brązowe kowbojskie spodnie', type:'pants', level:94, price:18105, image:'/images/items/pants/chapsfine_brown.png?1', image_mini:'/images/items/pants/mini/chapsfine_brown.png?1', bonus:{skills:{appearance:11, punch:20, build:20}, attributes:{charisma:1, flexibility:1, strength:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10145] = {item_id:10145, nshort:'chapsfine_black', name:'Czarne kowbojskie spodnie', type:'pants', level:94, price:18360, image:'/images/items/pants/chapsfine_black.png?1', image_mini:'/images/items/pants/mini/chapsfine_black.png?1', bonus:{skills:{trade:15, finger_dexterity:20, swim:13, tough:20}, attributes:{charisma:2, flexibility:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10146] = {item_id:10146, nshort:'chapsfine_p1', name:'Szlacheckie kowbojskie spodnie', type:'pants', level:99, price:23310, image:'/images/items/pants/chapsfine_p1.png?1', image_mini:'/images/items/pants/mini/chapsfine_p1.png?1', bonus:{skills:{leadership:25, aim:20, dodge:20, ride:20}, attributes:{charisma:1, dexterity:2, flexibility:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10147] = {item_id:10147, nshort:'chapsfine_fine', name:'Spodnie Buffalo Billa', type:'pants', level:110, price:25920, image:'/images/items/pants/chapsfine_fine.png?1', image_mini:'/images/items/pants/mini/chapsfine_fine.png?1', bonus:{skills:{pitfall:18, reflex:20, endurance:20, tough:20}, attributes:{charisma:3, dexterity:3, flexibility:3, strength:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[10148] = {item_id:10148, nshort:'greenhorn_pants', name:'Wełniane spodnie', type:'pants', level:1, price:259, image:'/images/items/pants/greenhorn_pants.png?1', image_mini:'/images/items/pants/mini/greenhorn_pants.png?1', bonus:{skills:{swim:3, ride:3}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'greenhorn_set', name:'Zestaw nowicjusza'}, auctionable:false, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[10149] = {item_id:10149, nshort:'undergarn', name:'Halka', type:'pants', level:40, price:3450, image:'/images/items/pants/undergarn.png?1', image_mini:'/images/items/pants/mini/undergarn.png?1', bonus:{skills:{aim:9, hide:15, health:8}, attributes:{charisma:1}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_dancer', name:'Komplet Tancerki'}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[10150] = {item_id:10150, nshort:'collector_pants', name:'Spodnie kolekcjonera', type:'pants', level:100, price:0, image:'/images/items/pants/collector_pants.png?1', image_mini:'/images/items/pants/mini/collector_pants.png?1', bonus:{skills:{leadership:15, dodge:15}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'collector_set', name:'Zestaw kolekcjonera'}, traderlevel:99, tradeable:true};

/* --------------------------------------- PASKI --------------------------------------- */
    PK_S3.items[11000] = {item_id:11000, nshort:'cotton_grey', name:'Szary wełniany pas', type:'belt', level:1, price:10, image:'/images/items/belt/cotton_grey.png?1', image_mini:'/images/items/belt/mini/cotton_grey.png?1', bonus:{skills:{endurance:1}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11001] = {item_id:11001, nshort:'cotton_yellow', name:'Żółty wełniany pas', type:'belt', level:2, price:35, image:'/images/items/belt/cotton_yellow.png?1', image_mini:'/images/items/belt/mini/cotton_yellow.png?1', bonus:{skills:{pitfall:1, swim:1}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[11002] = {item_id:11002, nshort:'cotton_blue', name:'Niebieski wełniany pas', type:'belt', level:3, price:45, image:'/images/items/belt/cotton_blue.png?1', image_mini:'/images/items/belt/mini/cotton_blue.png?1', bonus:{skills:{reflex:1, ride:1, punch:1}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[11003] = {item_id:11003, nshort:'cotton_green', name:'Zielony wełniany pas', type:'belt', level:3, price:45, image:'/images/items/belt/cotton_green.png?1', image_mini:'/images/items/belt/mini/cotton_green.png?1', bonus:{skills:{repair:1, tough:1, build:1}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11004] = {item_id:11004, nshort:'cotton_brown', name:'Brązowy wełniany pas', type:'belt', level:4, price:60, image:'/images/items/belt/cotton_brown.png?1', image_mini:'/images/items/belt/mini/cotton_brown.png?1', bonus:{skills:{}, attributes:{flexibility:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11005] = {item_id:11005, nshort:'cotton_black', name:'Czarny wełniany pas', type:'belt', level:4, price:60, image:'/images/items/belt/cotton_black.png?1', image_mini:'/images/items/belt/mini/cotton_black.png?1', bonus:{skills:{}, attributes:{dexterity:1}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_farmer', name:'Komplet Farmera'}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11006] = {item_id:11006, nshort:'cotton_p1', name:'Szlachecki wełniany pas', type:'belt', level:5, price:250, image:'/images/items/belt/cotton_p1.png?1', image_mini:'/images/items/belt/mini/cotton_p1.png?1', bonus:{skills:{appearance:1, aim:1, dodge:2}, attributes:{charisma:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11007] = {item_id:11007, nshort:'cotton_fine', name:'Wełniany pas Johna Butterfielda', type:'belt', level:8, price:390, image:'/images/items/belt/cotton_fine.png?1', image_mini:'/images/items/belt/mini/cotton_fine.png?1', bonus:{skills:{repair:2, build:3}, attributes:{charisma:1, strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[11010] = {item_id:11010, nshort:'check_grey_belt', name:'Szary pas w kratę', type:'belt', level:7, price:142, image:'/images/items/belt/check_grey_belt.png?1', image_mini:'/images/items/belt/mini/check_grey_belt.png?1', bonus:{skills:{shot:1, health:1}, attributes:{dexterity:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11011] = {item_id:11011, nshort:'check_yellow_belt', name:'Żółty pas w kratę', type:'belt', level:8, price:290, image:'/images/items/belt/check_yellow_belt.png?1', image_mini:'/images/items/belt/mini/check_yellow_belt.png?1', bonus:{skills:{finger_dexterity:3, hide:1, reflex:1}, attributes:{charisma:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11012] = {item_id:11012, nshort:'check_blue_belt', name:'Niebieski pas w kratę', type:'belt', level:9, price:310, image:'/images/items/belt/check_blue_belt.png?1', image_mini:'/images/items/belt/mini/check_blue_belt.png?1', bonus:{skills:{animal:4, swim:3, ride:3}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11013] = {item_id:11013, nshort:'check_green_belt', name:'Zielony pas w kratę', type:'belt', level:10, price:370, image:'/images/items/belt/check_green_belt.png?1', image_mini:'/images/items/belt/mini/check_green_belt.png?1', bonus:{skills:{appearance:3, trade:4}, attributes:{charisma:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11014] = {item_id:11014, nshort:'check_brown_belt', name:'Brązowy pas w kratę', type:'belt', level:11, price:390, image:'/images/items/belt/check_brown_belt.png?1', image_mini:'/images/items/belt/mini/check_brown_belt.png?1', bonus:{skills:{tactic:5, leadership:6}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11015] = {item_id:11015, nshort:'check_black_belt', name:'Czarny pas w kratę', type:'belt', level:11, price:390, image:'/images/items/belt/check_black_belt.png?1', image_mini:'/images/items/belt/mini/check_black_belt.png?1', bonus:{skills:{pitfall:6, hide:5}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11016] = {item_id:11016, nshort:'check_p1_belt', name:'Szlachecki pas w kratę', type:'belt', level:12, price:1160, image:'/images/items/belt/check_p1_belt.png?1', image_mini:'/images/items/belt/mini/check_p1_belt.png?1', bonus:{skills:{aim:6, punch:7}, attributes:{strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11017] = {item_id:11017, nshort:'check_fine_belt', name:'Pas Neda Buntline\'a', type:'belt', level:15, price:1280, image:'/images/items/belt/check_fine_belt.png?1', image_mini:'/images/items/belt/mini/check_fine_belt.png?1', bonus:{skills:{appearance:3, shot:7, aim:6}, attributes:{dexterity:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[11020] = {item_id:11020, nshort:'fine_grey_belt', name:'Porządny szary pas', type:'belt', level:12, price:210, image:'/images/items/belt/fine_grey_belt.png?1', image_mini:'/images/items/belt/mini/fine_grey_belt.png?1', bonus:{skills:{tough:7}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11021] = {item_id:11021, nshort:'fine_yellow_belt', name:'Porządny żółty pas', type:'belt', level:14, price:450, image:'/images/items/belt/fine_yellow_belt.png?1', image_mini:'/images/items/belt/mini/fine_yellow_belt.png?1', bonus:{skills:{swim:3, health:5, endurance:6}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11022] = {item_id:11022, nshort:'fine_blue_belt', name:'Porządny niebieski pas', type:'belt', level:14, price:440, image:'/images/items/belt/fine_blue_belt.png?1', image_mini:'/images/items/belt/mini/fine_blue_belt.png?1', bonus:{skills:{dodge:5, reflex:4}, attributes:{dexterity:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11023] = {item_id:11023, nshort:'fine_green_belt', name:'Porządny zielony pas', type:'belt', level:15, price:480, image:'/images/items/belt/fine_green_belt.png?1', image_mini:'/images/items/belt/mini/fine_green_belt.png?1', bonus:{skills:{trade:6, leadership:4}, attributes:{charisma:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11024] = {item_id:11024, nshort:'fine_brown_belt', name:'Porządny brązowy pas', type:'belt', level:15, price:480, image:'/images/items/belt/fine_brown_belt.png?1', image_mini:'/images/items/belt/mini/fine_brown_belt.png?1', bonus:{skills:{finger_dexterity:4, shot:6}, attributes:{strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11025] = {item_id:11025, nshort:'fine_black_belt', name:'Porządny czarny pas', type:'belt', level:17, price:540, image:'/images/items/belt/fine_black_belt.png?1', image_mini:'/images/items/belt/mini/fine_black_belt.png?1', bonus:{skills:{animal:6, tactic:6, ride:6}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11026] = {item_id:11026, nshort:'fine_p1_belt', name:'Porządny szlachecki pas', type:'belt', level:17, price:1300, image:'/images/items/belt/fine_p1_belt.png?1', image_mini:'/images/items/belt/mini/fine_p1_belt.png?1', bonus:{skills:{appearance:6, leadership:7, punch:8}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11027] = {item_id:11027, nshort:'fine_fine_belt', name:'Porządny pas Thomasa Harta Bentona', type:'belt', level:20, price:1620, image:'/images/items/belt/fine_fine_belt.png?1', image_mini:'/images/items/belt/mini/fine_fine_belt.png?1', bonus:{skills:{repair:8, build:9}, attributes:{dexterity:1, strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[11030] = {item_id:11030, nshort:'buckle_grey', name:'Szary pas ze sprzączką', type:'belt', level:18, price:420, image:'/images/items/belt/buckle_grey.png?1', image_mini:'/images/items/belt/mini/buckle_grey.png?1', bonus:{skills:{}, attributes:{dexterity:2, flexibility:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11031] = {item_id:11031, nshort:'buckle_yellow', name:'Żółty pas ze sprzączką', type:'belt', level:20, price:1160, image:'/images/items/belt/buckle_yellow.png?1', image_mini:'/images/items/belt/mini/buckle_yellow.png?1', bonus:{skills:{repair:7, endurance:6}, attributes:{strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11032] = {item_id:11032, nshort:'buckle_blue', name:'Niebieski pas ze sprzączką', type:'belt', level:20, price:1140, image:'/images/items/belt/buckle_blue.png?1', image_mini:'/images/items/belt/mini/buckle_blue.png?1', bonus:{skills:{appearance:9, tactic:7}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11033] = {item_id:11033, nshort:'buckle_green', name:'Zielony pas ze sprzączką', type:'belt', level:22, price:1340, image:'/images/items/belt/buckle_green.png?1', image_mini:'/images/items/belt/mini/buckle_green.png?1', bonus:{skills:{shot:9, dodge:10}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11034] = {item_id:11034, nshort:'buckle_brown', name:'Brązowy pas ze sprzączką', type:'belt', level:22, price:1340, image:'/images/items/belt/buckle_brown.png?1', image_mini:'/images/items/belt/mini/buckle_brown.png?1', bonus:{skills:{aim:9, punch:10}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_pilgrim_male', name:'Komplet Pielgrzyma'}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11035] = {item_id:11035, nshort:'buckle_black', name:'Czarny pas ze sprzączką', type:'belt', level:24, price:1520, image:'/images/items/belt/buckle_black.png?1', image_mini:'/images/items/belt/mini/buckle_black.png?1', bonus:{skills:{repair:4, finger_dexterity:10}, attributes:{flexibility:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_pilgrim_female', name:'Komplet Pielgrzyma(damski)'}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11036] = {item_id:11036, nshort:'buckle_p1', name:'Szlachecki pas ze sprzączką', type:'belt', level:25, price:2700, image:'/images/items/belt/buckle_p1.png?1', image_mini:'/images/items/belt/mini/buckle_p1.png?1', bonus:{skills:{trade:10, tactic:10, reflex:10}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11037] = {item_id:11037, nshort:'buckle_fine', name:'Pas Charlesa Goodnighta', type:'belt', level:27, price:3000, image:'/images/items/belt/buckle_fine.png?1', image_mini:'/images/items/belt/mini/buckle_fine.png?1', bonus:{skills:{trade:10, leadership:10, tough:10, build:10}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[11040] = {item_id:11040, nshort:'bull_grey', name:'Szary pas z bykiem', type:'belt', level:23, price:490, image:'/images/items/belt/bull_grey.png?1', image_mini:'/images/items/belt/mini/bull_grey.png?1', bonus:{skills:{hide:7, endurance:7}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11041] = {item_id:11041, nshort:'bull_yellow', name:'Żółty pas z bykiem', type:'belt', level:24, price:1360, image:'/images/items/belt/bull_yellow.png?1', image_mini:'/images/items/belt/mini/bull_yellow.png?1', bonus:{skills:{pitfall:14}, attributes:{strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11042] = {item_id:11042, nshort:'bull_blue', name:'Niebieski pas z bykiem', type:'belt', level:24, price:1320, image:'/images/items/belt/bull_blue.png?1', image_mini:'/images/items/belt/mini/bull_blue.png?1', bonus:{skills:{ride:2, build:15}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11043] = {item_id:11043, nshort:'bull_green', name:'Zielony pas z bykiem', type:'belt', level:26, price:1400, image:'/images/items/belt/bull_green.png?1', image_mini:'/images/items/belt/mini/bull_green.png?1', bonus:{skills:{appearance:7, animal:8, repair:8}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11044] = {item_id:11044, nshort:'bull_brown', name:'Brązowy pas z bykiem', type:'belt', level:27, price:1500, image:'/images/items/belt/bull_brown.png?1', image_mini:'/images/items/belt/mini/bull_brown.png?1', bonus:{skills:{leadership:7, health:7, tough:10}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11045] = {item_id:11045, nshort:'bull_black', name:'Czarny pas z bykiem', type:'belt', level:27, price:1540, image:'/images/items/belt/bull_black.png?1', image_mini:'/images/items/belt/mini/bull_black.png?1', bonus:{skills:{tactic:7, shot:8}, attributes:{flexibility:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11046] = {item_id:11046, nshort:'bull_p1', name:'Szlachecki pas z bykiem', type:'belt', level:28, price:2940, image:'/images/items/belt/bull_p1.png?1', image_mini:'/images/items/belt/mini/bull_p1.png?1', bonus:{skills:{appearance:8, trade:8}, attributes:{charisma:2, dexterity:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11047] = {item_id:11047, nshort:'bull_fine', name:'Pas Billa Hickoka', type:'belt', level:30, price:3210, image:'/images/items/belt/bull_fine.png?1', image_mini:'/images/items/belt/mini/bull_fine.png?1', bonus:{skills:{animal:5, swim:10, hide:10, ride:10}, attributes:{strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[11050] = {item_id:11050, nshort:'studs_grey', name:'Szary ćwiekowany pas', type:'belt', level:27, price:780, image:'/images/items/belt/studs_grey.png?1', image_mini:'/images/items/belt/mini/studs_grey.png?1', bonus:{skills:{reflex:4, health:10}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11051] = {item_id:11051, nshort:'studs_yellow', name:'Żółty ćwiekowany pas', type:'belt', level:28, price:2220, image:'/images/items/belt/studs_yellow.png?1', image_mini:'/images/items/belt/mini/studs_yellow.png?1', bonus:{skills:{finger_dexterity:11, swim:10}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11052] = {item_id:11052, nshort:'studs_blue', name:'Niebieski ćwiekowany pas', type:'belt', level:28, price:2100, image:'/images/items/belt/studs_blue.png?1', image_mini:'/images/items/belt/mini/studs_blue.png?1', bonus:{skills:{aim:7, dodge:7}, attributes:{dexterity:1, flexibility:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11053] = {item_id:11053, nshort:'studs_green', name:'Zielony ćwiekowany pas', type:'belt', level:30, price:2280, image:'/images/items/belt/studs_green.png?1', image_mini:'/images/items/belt/mini/studs_green.png?1', bonus:{skills:{endurance:19}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11054] = {item_id:11054, nshort:'studs_brown', name:'Brązowy ćwiekowany pas', type:'belt', level:30, price:2340, image:'/images/items/belt/studs_brown.png?1', image_mini:'/images/items/belt/mini/studs_brown.png?1', bonus:{skills:{tough:10, punch:12}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11055] = {item_id:11055, nshort:'studs_black', name:'Czarny ćwiekowany pas', type:'belt', level:31, price:2430, image:'/images/items/belt/studs_black.png?1', image_mini:'/images/items/belt/mini/studs_black.png?1', bonus:{skills:{reflex:12, ride:11}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11056] = {item_id:11056, nshort:'studs_p1', name:'Szlachecki ćwiekowany pas', type:'belt', level:32, price:3640, image:'/images/items/belt/studs_p1.png?1', image_mini:'/images/items/belt/mini/studs_p1.png?1', bonus:{skills:{animal:12, pitfall:12, hide:10}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11057] = {item_id:11057, nshort:'studs_fine', name:'Ćwiekowany pas Sama Houstona', type:'belt', level:35, price:3990, image:'/images/items/belt/studs_fine.png?1', image_mini:'/images/items/belt/mini/studs_fine.png?1', bonus:{skills:{shot:11, aim:11, ride:12, punch:11}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[11060] = {item_id:11060, nshort:'horse_grey', name:'Szary pas z koniem', type:'belt', level:31, price:840, image:'/images/items/belt/horse_grey.png?1', image_mini:'/images/items/belt/mini/horse_grey.png?1', bonus:{skills:{dodge:8}, attributes:{dexterity:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11061] = {item_id:11061, nshort:'horse_yellow', name:'Żółty pas z koniem', type:'belt', level:33, price:2430, image:'/images/items/belt/horse_yellow.png?1', image_mini:'/images/items/belt/mini/horse_yellow.png?1', bonus:{skills:{}, attributes:{charisma:2, dexterity:3, flexibility:2, strength:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11062] = {item_id:11062, nshort:'horse_blue', name:'Niebieski pas z koniem', type:'belt', level:33, price:2370, image:'/images/items/belt/horse_blue.png?1', image_mini:'/images/items/belt/mini/horse_blue.png?1', bonus:{skills:{swim:4}, attributes:{charisma:3, flexibility:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11063] = {item_id:11063, nshort:'horse_green', name:'Zielony pas z koniem', type:'belt', level:35, price:2520, image:'/images/items/belt/horse_green.png?1', image_mini:'/images/items/belt/mini/horse_green.png?1', bonus:{skills:{finger_dexterity:9, health:8}, attributes:{charisma:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11064] = {item_id:11064, nshort:'horse_brown', name:'Brązowy pas z koniem', type:'belt', level:35, price:2520, image:'/images/items/belt/horse_brown.png?1', image_mini:'/images/items/belt/mini/horse_brown.png?1', bonus:{skills:{pitfall:5, hide:6}, attributes:{flexibility:1, strength:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11065] = {item_id:11065, nshort:'horse_black', name:'Czarny pas z koniem', type:'belt', level:36, price:2640, image:'/images/items/belt/horse_black.png?1', image_mini:'/images/items/belt/mini/horse_black.png?1', bonus:{skills:{repair:10, swim:9}, attributes:{flexibility:1, strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11066] = {item_id:11066, nshort:'horse_p1', name:'Szlachecki pas z koniem', type:'belt', level:37, price:3395, image:'/images/items/belt/horse_p1.png?1', image_mini:'/images/items/belt/mini/horse_p1.png?1', bonus:{skills:{tactic:5, leadership:6, tough:12}, attributes:{charisma:1, strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11067] = {item_id:11067, nshort:'horse_fine', name:'Pas Setha Bullocka', type:'belt', level:40, price:4130, image:'/images/items/belt/horse_fine.png?1', image_mini:'/images/items/belt/mini/horse_fine.png?1', bonus:{skills:{dodge:8, reflex:8, health:9}, attributes:{dexterity:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[11070] = {item_id:11070, nshort:'eagle_grey', name:'Szary pas z orłem', type:'belt', level:37, price:885, image:'/images/items/belt/eagle_grey.png?1', image_mini:'/images/items/belt/mini/eagle_grey.png?1', bonus:{skills:{animal:5, pitfall:7, build:7}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11071] = {item_id:11071, nshort:'eagle_yellow', name:'Żółty pas z orłem', type:'belt', level:38, price:2310, image:'/images/items/belt/eagle_yellow.png?1', image_mini:'/images/items/belt/mini/eagle_yellow.png?1', bonus:{skills:{hide:11, endurance:11}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11072] = {item_id:11072, nshort:'eagle_blue', name:'Niebieski pas z orłem', type:'belt', level:38, price:2460, image:'/images/items/belt/eagle_blue.png?1', image_mini:'/images/items/belt/mini/eagle_blue.png?1', bonus:{skills:{tactic:10, finger_dexterity:13}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11073] = {item_id:11073, nshort:'eagle_green', name:'Zielony pas z orłem', type:'belt', level:42, price:2730, image:'/images/items/belt/eagle_green.png?1', image_mini:'/images/items/belt/mini/eagle_green.png?1', bonus:{skills:{leadership:10, repair:10}, attributes:{charisma:1, flexibility:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11074] = {item_id:11074, nshort:'eagle_brown', name:'Brązowy pas z orłem', type:'belt', level:42, price:2730, image:'/images/items/belt/eagle_brown.png?1', image_mini:'/images/items/belt/mini/eagle_brown.png?1', bonus:{skills:{animal:10, swim:10}, attributes:{charisma:1, flexibility:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11075] = {item_id:11075, nshort:'eagle_black', name:'Czarny pas z orłem', type:'belt', level:45, price:2940, image:'/images/items/belt/eagle_black.png?1', image_mini:'/images/items/belt/mini/eagle_black.png?1', bonus:{skills:{appearance:13, trade:12, build:5}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11076] = {item_id:11076, nshort:'eagle_p1', name:'Szlachecki pas z orłem', type:'belt', level:45, price:4200, image:'/images/items/belt/eagle_p1.png?1', image_mini:'/images/items/belt/mini/eagle_p1.png?1', bonus:{skills:{aim:10, dodge:10, reflex:10}, attributes:{charisma:1, dexterity:1, flexibility:1, strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11077] = {item_id:11077, nshort:'eagle_fine', name:'Pas Ala Swearengena', type:'belt', level:48, price:4235, image:'/images/items/belt/eagle_fine.png?1', image_mini:'/images/items/belt/mini/eagle_fine.png?1', bonus:{skills:{pitfall:15, shot:8, ride:15}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_gentleman', name:'Komplet Dżentelmena'}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[11080] = {item_id:11080, nshort:'ammo_grey', name:'Szary pas na naboje', type:'belt', level:44, price:1300, image:'/images/items/belt/ammo_grey.png?1', image_mini:'/images/items/belt/mini/ammo_grey.png?1', bonus:{skills:{punch:11}, attributes:{dexterity:1, strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[11081] = {item_id:11081, nshort:'ammo_yellow', name:'Żółty pas na naboje', type:'belt', level:47, price:3600, image:'/images/items/belt/ammo_yellow.png?1', image_mini:'/images/items/belt/mini/ammo_yellow.png?1', bonus:{skills:{repair:10, tough:10, build:10}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11082] = {item_id:11082, nshort:'ammo_blue', name:'Niebieski pas na naboje', type:'belt', level:47, price:3600, image:'/images/items/belt/ammo_blue.png?1', image_mini:'/images/items/belt/mini/ammo_blue.png?1', bonus:{skills:{leadership:10, finger_dexterity:10, endurance:10}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[11083] = {item_id:11083, nshort:'ammo_green', name:'Zielony pas na naboje', type:'belt', level:48, price:3600, image:'/images/items/belt/ammo_green.png?1', image_mini:'/images/items/belt/mini/ammo_green.png?1', bonus:{skills:{animal:10, trade:10, tactic:10}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11084] = {item_id:11084, nshort:'ammo_brown', name:'Brązowy pas na naboje', type:'belt', level:49, price:4000, image:'/images/items/belt/ammo_brown.png?1', image_mini:'/images/items/belt/mini/ammo_brown.png?1', bonus:{skills:{appearance:10, shot:10, hide:10, reflex:10}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11085] = {item_id:11085, nshort:'ammo_black', name:'Czarny pas na naboje', type:'belt', level:49, price:4120, image:'/images/items/belt/ammo_black.png?1', image_mini:'/images/items/belt/mini/ammo_black.png?1', bonus:{skills:{swim:10, health:10}, attributes:{dexterity:1, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_quackery', name:'Komplet Konowała'}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11086] = {item_id:11086, nshort:'ammo_p1', name:'Szlachecki pas na naboje', type:'belt', level:52, price:5805, image:'/images/items/belt/ammo_p1.png?1', image_mini:'/images/items/belt/mini/ammo_p1.png?1', bonus:{skills:{aim:15}, attributes:{charisma:3, dexterity:1, flexibility:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11087] = {item_id:11087, nshort:'ammo_fine', name:'Pas Calamity Jane', type:'belt', level:57, price:6750, image:'/images/items/belt/ammo_fine.png?1', image_mini:'/images/items/belt/mini/ammo_fine.png?1', bonus:{skills:{aim:10, health:10, punch:10}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
	PK_S3.items[11094] = {item_id:11094, nshort:'flag_poland', name:'Polski pas', type:'belt', level:55, price:3000, image:'/images/items/belt/flag_poland.png?1', image_mini:'/images/items/belt/mini/flag_poland.png?1', bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, tradeable:true, sellable:true};
	
	PK_S3.items[11101] = {item_id:11101, nshort:'inno_belt', name:'Pas InnoGames', type:'belt', level:55, price:16500, image:'/images/items/belt/inno_belt.png?1', image_mini:'/images/items/belt/mini/inno_belt.png?1', bonus:{skills:{}, attributes:{charisma:10, dexterity:10, flexibility:10, strength:10}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, tradeable:true, sellable:true};
    PK_S3.items[11102] = {item_id:11102, nshort:'skull_grey', name:'Szary pas z czaszką', type:'belt', level:57, price:4500, image:'/images/items/belt/skull_grey.png?1', image_mini:'/images/items/belt/mini/skull_grey.png?1', bonus:{skills:{punch:5, build:15}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11103] = {item_id:11103, nshort:'skull_yellow', name:'Żółty pas z czaszką', type:'belt', level:60, price:6825, image:'/images/items/belt/skull_yellow.png?1', image_mini:'/images/items/belt/mini/skull_yellow.png?1', bonus:{skills:{repair:15, tough:15}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[11104] = {item_id:11104, nshort:'skull_blue', name:'Niebieski pas z czaszką', type:'belt', level:60, price:6825, image:'/images/items/belt/skull_blue.png?1', image_mini:'/images/items/belt/mini/skull_blue.png?1', bonus:{skills:{pitfall:15, endurance:15}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11105] = {item_id:11105, nshort:'skull_green', name:'Zielony pas z czaszką', type:'belt', level:65, price:7605, image:'/images/items/belt/skull_green.png?1', image_mini:'/images/items/belt/mini/skull_green.png?1', bonus:{skills:{tactic:15, finger_dexterity:15}, attributes:{flexibility:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11106] = {item_id:11106, nshort:'skull_brown', name:'Brązowy pas z czaszką', type:'belt', level:65, price:7605, image:'/images/items/belt/skull_brown.png?1', image_mini:'/images/items/belt/mini/skull_brown.png?1', bonus:{skills:{animal:15, health:15}, attributes:{dexterity:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11107] = {item_id:11107, nshort:'skull_black', name:'Czarny pas z czaszką', type:'belt', level:70, price:8190, image:'/images/items/belt/skull_black.png?1', image_mini:'/images/items/belt/mini/skull_black.png?1', bonus:{skills:{appearance:15, trade:15}, attributes:{charisma:1, strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11108] = {item_id:11108, nshort:'skull_p1', name:'Szlachecki pas z czaszką', type:'belt', level:70, price:11550, image:'/images/items/belt/skull_p1.png?1', image_mini:'/images/items/belt/mini/skull_p1.png?1', bonus:{skills:{leadership:15, shot:15, ride:15}, attributes:{charisma:1, dexterity:1, flexibility:1, strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11109] = {item_id:11109, nshort:'skull_fine', name:'Pas Billy\'ego Kida', type:'belt', level:80, price:12600, image:'/images/items/belt/skull_fine.png?1', image_mini:'/images/items/belt/mini/skull_fine.png?1', bonus:{skills:{}, attributes:{charisma:6, dexterity:6, flexibility:6, strength:6}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
    PK_S3.items[11110] = {item_id:11110, nshort:'pistols_grey', name:'Szary pas z pistoletami', type:'belt', level:75, price:7350, image:'/images/items/belt/pistols_grey.png?1', image_mini:'/images/items/belt/mini/pistols_grey.png?1', bonus:{skills:{swim:15, reflex:15}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[11111] = {item_id:11111, nshort:'pistols_yellow', name:'Żółty pas z pistoletami', type:'belt', level:85, price:10575, image:'/images/items/belt/pistols_yellow.png?1', image_mini:'/images/items/belt/mini/pistols_yellow.png?1', bonus:{skills:{}, attributes:{charisma:4, dexterity:5, flexibility:4, strength:5}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11112] = {item_id:11112, nshort:'pistols_blue', name:'Niebieski pas z pistoletami', type:'belt', level:90, price:10875, image:'/images/items/belt/pistols_blue.png?1', image_mini:'/images/items/belt/mini/pistols_blue.png?1', bonus:{skills:{hide:15, dodge:25}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11113] = {item_id:11113, nshort:'pistols_green', name:'Zielony pas z pistoletami', type:'belt', level:95, price:12825, image:'/images/items/belt/pistols_green.png?1', image_mini:'/images/items/belt/mini/pistols_green.png?1', bonus:{skills:{}, attributes:{charisma:6, dexterity:5, flexibility:6, strength:5}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11114] = {item_id:11114, nshort:'pistols_brown', name:'Brązowy pas z pistoletami', type:'belt', level:100, price:12375, image:'/images/items/belt/pistols_brown.png?1', image_mini:'/images/items/belt/mini/pistols_brown.png?1', bonus:{skills:{repair:15, finger_dexterity:15}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11115] = {item_id:11115, nshort:'pistols_black', name:'Czarny pas z pistoletami', type:'belt', level:105, price:13500, image:'/images/items/belt/pistols_black.png?1', image_mini:'/images/items/belt/mini/pistols_black.png?1', bonus:{skills:{appearance:15, shot:15, reflex:15, punch:15}, attributes:{charisma:1, dexterity:1, flexibility:1, strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11116] = {item_id:11116, nshort:'pistols_p1', name:'Szlachecki pas z pistoletami', type:'belt', level:110, price:19200, image:'/images/items/belt/pistols_p1.png?1', image_mini:'/images/items/belt/mini/pistols_p1.png?1', bonus:{skills:{tactic:15, leadership:15, endurance:15, build:15}, attributes:{charisma:3, dexterity:3, flexibility:3, strength:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[11117] = {item_id:11117, nshort:'pistols_fine', name:'Pas Williama Tilghmana', type:'belt', level:115, price:21600, image:'/images/items/belt/pistols_fine.png?1', image_mini:'/images/items/belt/mini/pistols_fine.png?1', bonus:{skills:{dodge:15, ride:15, health:15, tough:15}, attributes:{charisma:4, dexterity:4, flexibility:4, strength:4}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[11118] = {item_id:11118, nshort:'greenhorn_belt', name:'Skórzany pas', type:'belt', level:4, price:375, image:'/images/items/belt/greenhorn_belt.png?1', image_mini:'/images/items/belt/mini/greenhorn_belt.png?1', bonus:{skills:{leadership:2, shot:3, build:3}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'greenhorn_set', name:'Zestaw nowicjusza'}, auctionable:false, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[11137] = {item_id:11137, nshort:'flag_indian', name:'Indiański pas', type:'belt', level:55, price:3000, image:'/images/items/belt/flag_indian.png?1', image_mini:'/images/items/belt/mini/flag_indian.png?1', bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_indian', name:'Komplet Indianina'}, traderlevel:20, tradeable:true, sellable:true};
    PK_S3.items[11138] = {item_id:11138, nshort:'adah_belt', name:'Pas Adah Isaacs Menken', type:'belt', level:48, price:4235, image:'/images/items/belt/adah_belt.png?1', image_mini:'/images/items/belt/mini/adah_belt.png?1', bonus:{skills:{animal:15, trade:15, swim:8}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'set_dancer', name:'Komplet Tancerki'}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[11139] = {item_id:11139, nshort:'collector_belt', name:'Pas kolekcjonera', type:'belt', level:100, price:10000, image:'/images/items/belt/collector_belt.png?1', image_mini:'/images/items/belt/mini/collector_belt.png?1', bonus:{skills:{aim:15, build:15}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'collector_set', name:'Zestaw kolekcjonera'}, traderlevel:99, tradeable:true};
	PK_S3.items[11140] = {item_id:11140, nshort:'bunny_belt', name:'Pas z jajkami', type:'belt', level:1, price:0, image:'/images/items/belt/bunny_belt.png?1', image_mini:'/images/items/belt/mini/bunny_belt.png?1', bonus:{skills:{animal:2}, attributes:{dexterity:1}, fortbattle:{}, fortbattlesector:{}}, set:{key:'bunny_set', name:'Zestaw zajączka wielkanocnego'}, traderlevel:99, tradeable:true};

/* --------------------------------------- INNE PRZEDMIOTY --------------------------------------- */
    PK_S3.items[12700] = {item_id:12700, nshort:'adventcal', name:'Kalendarz Adwentowy', type:'yield', level:0, price:10, image:'/images/items/yield/adventcal.png?1', image_mini:'images/items/yield/adventcal.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[12701] = {item_id:12701, nshort:'xmas_licorice', name:'Lukrecja', type:'yield', level:0, price:15, image:'/images/items/yield/xmas_licorice.png?1', image_mini:'images/items/yield/xmas_licorice.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
    PK_S3.items[12702] = {item_id:12702, nshort:'xmas_oat', name:'Owies', type:'yield', level:0, price:32, image:'/images/items/yield/xmas_oat.png?1', image_mini:'images/items/yield/xmas_oat.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
    PK_S3.items[12703] = {item_id:12703, nshort:'xmas_cracker', name:'Bożonarodzeniowy krakers', type:'yield', level:0, price:27, image:'/images/items/yield/xmas_cracker.png?1', image_mini:'images/items/yield/xmas_cracker.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
	PK_S3.items[12704] = {item_id:12704, nshort:'xmas_lebkuchen', name:'Piernik', type:'yield', level:0, price:31, image:'/images/items/yield/xmas_lebkuchen.png?1', image_mini:'images/items/yield/xmas_lebkuchen.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
    PK_S3.items[12705] = {item_id:12705, nshort:'xmas_cookie', name:'Ciastko czekoladowe', type:'yield', level:0, price:29, image:'/images/items/yield/xmas_cookie.png?1', image_mini:'images/items/yield/xmas_cookie.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
    PK_S3.items[12706] = {item_id:12706, nshort:'xmas_potato', name:'Kartofelek marcepanowy', type:'yield', level:0, price:39, image:'/images/items/yield/xmas_potato.png?1', image_mini:'images/items/yield/xmas_potato.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
	PK_S3.items[12707] = {item_id:12707, nshort:'xmas_coal', name:'Kawałek węgla', type:'yield', level:0, price:2, image:'/images/items/yield/xmas_coal.png?1', image_mini:'images/items/yield/xmas_coal.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
    PK_S3.items[12708] = {item_id:12708, nshort:'xmas_sphere', name:'Szklana kulka', type:'yield', level:0, price:35, image:'/images/items/yield/xmas_sphere.png?1', image_mini:'images/items/yield/xmas_sphere.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
	PK_S3.items[12709] = {item_id:12711, nshort:'xmas_present', name:'Prezent', type:'yield', level:0, price:39, image:'/images/items/yield/xmas_present.png?1', image_mini:'images/items/yield/xmas_present.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
	PK_S3.items[12710] = {item_id:12711, nshort:'xmas_present_mid', name:'Fajny prezent', type:'yield', level:0, price:39, image:'/images/items/yield/xmas_present_mid.png?1', image_mini:'images/items/yield/xmas_present_mid.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
	PK_S3.items[12711] = {item_id:12711, nshort:'xmas_present_high', name:'Ekskluzywny prezent', type:'yield', level:0, price:39, image:'/images/items/yield/xmas_present_high.png?1', image_mini:'images/items/yield/xmas_present_high.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
	PK_S3.items[12712] = {item_id:12712, nshort:'xmas_keks', name:'Herbatnik maślany', type:'yield', level:0, price:35, image:'/images/items/yield/xmas_keks.png?1', image_mini:'images/items/yield/xmas_keks.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
	PK_S3.items[12713] = {item_id:12713, nshort:'xmas_bag', name:'Sakiewka szklanych kulek', type:'yield', level:0, price:330, image:'/images/items/yield/xmas_bag.png?1', image_mini:'images/items/yield/xmas_bag.png?1', bonus:{skills:{finger_dexterity:5}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	
    PK_S3.items[13701] = {item_id:13701, nshort:'promo_tomato', name:'Soczysty pomidor', type:'yield', level:0, price:15, image:'/images/items/yield/promo_tomato.png?1', image_mini:'images/items/yield/promo_tomato.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
    PK_S3.items[13702] = {item_id:13702, nshort:'promo_horseshoe', name:'Szlachetna podkowa', type:'yield', level:0, price:32, image:'/images/items/yield/promo_horseshoe.png?1', image_mini:'images/items/yield/promo_horseshoe.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
    PK_S3.items[13703] = {item_id:13703, nshort:'promo_cigaretts', name:'Ręcznie zwijane papierosy', type:'yield', level:0, price:27, image:'/images/items/yield/promo_cigaretts.png?1', image_mini:'images/items/yield/promo_cigaretts.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
    PK_S3.items[13704] = {item_id:13704, nshort:'promo_whiskey', name:'Dobry trunek', type:'yield', level:0, price:31, image:'/images/items/yield/promo_whiskey.png?1', image_mini:'images/items/yield/promo_whiskey.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
    PK_S3.items[13705] = {item_id:13705, nshort:'promo_meal', name:'Pieczona fasola', type:'yield', level:0, price:29, image:'/images/items/yield/promo_meal.png?1', image_mini:'images/items/yield/promo_meal.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
    PK_S3.items[13706] = {item_id:13706, nshort:'promo_orange', name:'Dojrzała pomarańcza', type:'yield', level:0, price:39, image:'/images/items/yield/promo_orange.png?1', image_mini:'images/items/yield/promo_orange.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};

    PK_S3.items[16100] = {item_id:16100, nshort:'fb_aidkit', name:'Torba lekarska', type:'yield', level:0, price:590, image:'/images/items/yield/fb_aidkit.png?1', image_mini:'images/items/yield/fb_aidkit.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};

    PK_S3.items[17000] = {item_id:17000, nshort:'fb_chest_wooden', name:'Drewniane pudełko', type:'yield', level:0, price:0, image:'/images/items/yield/fb_chest_wooden.png?1', image_mini:'images/items/yield/fb_chest_wooden.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true};
    PK_S3.items[17001] = {item_id:17001, nshort:'fb_chest_iron', name:'Skrzynia z żelaznymi okuciami', type:'yield', level:0, price:0, image:'/images/items/yield/fb_chest_iron.png?1', image_mini:'images/items/yield/fb_chest_iron.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true};
    PK_S3.items[17002] = {item_id:17002, nshort:'fb_chest_steel', name:'Skrzynia ze stalowymi okuciami', type:'yield', level:0, price:0, image:'/images/items/yield/fb_chest_steel.png?1', image_mini:'images/items/yield/fb_chest_steel.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true};
	PK_S3.items[17003] = {item_id:17003, nshort:'premiumchest', name:'Skrzynia premium', type:'yield', level:0, price:7, image:'/images/items/yield/premiumchest.png?1', image_mini:'images/items/yield/premiumchest.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	PK_S3.items[17004] = {item_id:17004, nshort:'xmas_repeat', name:'Bożonarodzeniowy prezent', type:'yield', level:0, price:7, image:'/images/items/yield/xmas_repeat.png?1', image_mini:'images/items/yield/xmas_repeat.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	
	PK_S3.items[17020] = {item_id:17020, nshort:'clean_sand', name:'Czysty piasek', type:'yield', level:0, price:0, image:'/images/items/yield/clean_sand.png?1', image_mini:'images/items/yield/clean_sand.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	PK_S3.items[17021] = {item_id:17021, nshort:'hot_granit', name:'Rozgrzany do czerwoności granit', type:'yield', level:0, price:0, image:'/images/items/yield/hot_granit.png?1', image_mini:'images/items/yield/hot_granit.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	PK_S3.items[17022] = {item_id:17022, nshort:'metall_ring', name:'Metalowy pierścień', type:'yield', level:0, price:0, image:'/images/items/yield/metall_ring.png?1', image_mini:'images/items/yield/metall_ring.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	PK_S3.items[17023] = {item_id:17023, nshort:'clear_water', name:'Przefiltrowana woda', type:'yield', level:0, price:0, image:'/images/items/yield/clear_water.png?1', image_mini:'images/items/yield/clear_water.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};

	PK_S3.items[17027] = {item_id:17027, nshort:'liquid_glas', name:'Stopione szkło', type:'yield', level:0, price:0, image:'/images/items/yield/liquid_glas.png?1', image_mini:'images/items/yield/liquid_glas.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
/* --------------------------------------- RECEPTURY --------------------------------------- */
	
	
	PK_S3.items[20003] = {item_id:20003, nshort:'beansandbacon_recipe', name:'Przepis: Fasola z bekonem', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20004] = {item_id:20004, nshort:'marmelade_recipe', name:'Przepis: Przyrządzenie dżemu', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20005] = {item_id:20005, nshort:'mash_recipe', name:'Przepis: Przyrządzenie zacieru', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20006] = {item_id:20006, nshort:'dough_recipe', name:'Przepis: Przyrządzenie ciasta', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20007] = {item_id:20007, nshort:'steakseasoning_recipe', name:'Przepis: Marynowanie steku', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20008] = {item_id:20008, nshort:'licor_recipe', name:'Przepis: Warzenie trunku', type:'recipe', level:1, price:750, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20009] = {item_id:20009, nshort:'cake_recipe', name:'Przepis: Przyrządzenie tortu', type:'recipe', level:1, price:750, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20010] = {item_id:20010, nshort:'fishfond_recipe', name:'Przepis: Przyrządzenie bulionu rybnego', type:'recipe', level:1, price:1750, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20011] = {item_id:20011, nshort:'turkey_recipe', name:'Przepis: Przyrządzenie pieczonego indyka', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20012] = {item_id:20012, nshort:'fishsoup_recipe', name:'Przepis: Przyrządzenie zupy rybnej', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20013] = {item_id:20013, nshort:'veggiepun_recipe', name:'Przepis: Przyrządzenie pierogów z warzywami', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20014] = {item_id:20014, nshort:'meatloaf_recipe', name:'Przepis: Przyrządzenie siekanego mięsa', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20015] = {item_id:20015, nshort:'fishonastick_recipe', name:'Przepis: Przyrządzenie dorsza', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20016] = {item_id:20016, nshort:'parfumsmoke_recipe', name:'Instrukcja: Wytworzenie kadzidła', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20017] = {item_id:20017, nshort:'sauce_recipe', name:'Przepis: Przyrządzenie sosu', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20018] = {item_id:20018, nshort:'paperfish_recipe', name:'Instrukcja: Ryba zawinięta w gazetę', type:'recipe', level:1, price:3500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20019] = {item_id:20019, nshort:'gentlemen_recipe', name:'Przepis: Przyrządzenie obiadu dżentelmena', type:'recipe', level:1, price:3500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:false, tradeable:true, sellable:true};
	
	
	
	PK_S3.items[20023] = {item_id:20023, nshort:'pipecleaner_recipe', name:'Instrukcja: Wytworzenie wycioru', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20024] = {item_id:20024, nshort:'stomach_recipe', name:'Instrukcja: Wytworzenie leku na żołądek', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20025] = {item_id:20025, nshort:'sulfuracid_recipe', name:'Instrukcja: Wytworzenie kwasu siarkowego', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20026] = {item_id:20026, nshort:'ink_recipe', name:'Instrukcja: Wytworzenie atramentu', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20027] = {item_id:20027, nshort:'petroleum_recipe', name:'Instrukcja: Wytworzenie nafty', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20028] = {item_id:20028, nshort:'fetish_recipe', name:'Instrukcja: Wytworzenie bożka', type:'recipe', level:1, price:750, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20029] = {item_id:20029, nshort:'destillate_recipe', name:'Instrukcja: Wytworzenie różnych destylatów', type:'recipe', level:1, price:750, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20030] = {item_id:20030, nshort:'firewater_recipe', name:'Przepis: Przyrządzenie bimbru', type:'recipe', level:1, price:1750, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20031] = {item_id:20031, nshort:'tea_recipe', name:'Przepis: Mieszanka herbat', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20032] = {item_id:20032, nshort:'chewtabaco_recipe', name:'Instrukcja: Mieszanie prymki', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20033] = {item_id:20033, nshort:'fruitlicor_recipe', name:'Przepis: Przyrządzenie nalewki', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20034] = {item_id:20034, nshort:'battery_recipe', name:'Instrukcja: Wytworzenie baterii', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20035] = {item_id:20035, nshort:'lye_recipe', name:'Instrukcja: Wytworzenie ługu', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20036] = {item_id:20036, nshort:'herbbrew_recipe', name:'Przepis: Przyrządzenie likieru ziołowego', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20037] = {item_id:20037, nshort:'paper_recipe', name:'Instrukcja: Przerabianie papieru', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20038] = {item_id:20038, nshort:'mathdraw_recipe', name:'Instrukcja: Wytworzenie cyrkla', type:'recipe', level:1, price:3500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20039] = {item_id:20039, nshort:'rosewater_recipe', name:'Instrukcja: Wytworzenie wody różanej', type:'recipe', level:1, price:3500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:false, tradeable:true, sellable:true};
	
	
	
	PK_S3.items[20043] = {item_id:20043, nshort:'bajonett_recipe', name:'Instrukcja: Wytworzenie bagnetu', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20044] = {item_id:20044, nshort:'weightstone_recipe', name:'Instrukcja: Wytworzenie odważnika', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20045] = {item_id:20045, nshort:'steel_recipe', name:'Instrukcja: Odlewanie stali', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20046] = {item_id:20046, nshort:'liquid_lead_recipe', name:'Instrukcja: Topienie ołowiu', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20047] = {item_id:20047, nshort:'forge_recipe', name:'Instrukcja: Wytworzenie kowadła', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20048] = {item_id:20048, nshort:'leadfigure_recipe', name:'Instrukcja: Wytworzenie ołowianej figurki', type:'recipe', level:1, price:750, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20049] = {item_id:20049, nshort:'marble_recipe', name:'Instrukcja: Wytworzenie niezastygniętej kulki', type:'recipe', level:1, price:750, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20050] = {item_id:20050, nshort:'rivets_recipe', name:'Instrukcja: Wytwarzanie nitów', type:'recipe', level:1, price:1750, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20051] = {item_id:20051, nshort:'gripprotection_recipe', name:'Instrukcja: Wytwarzanie kabłąku', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20052] = {item_id:20052, nshort:'coolingpackage_recipe', name:'Instrukcja: Wytworzenie chusty do chłodzenia', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20053] = {item_id:20053, nshort:'weaponchain_recipe', name:'Instrukcja: Wytworzenie łańcucha do broni', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20054] = {item_id:20054, nshort:'handle_recipe', name:'Instrukcja: Wytworzenie rękojeści', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20055] = {item_id:20055, nshort:'revolverform_recipe', name:'Instrukcja: Wytworzenie kształtownika rewolweru', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20056] = {item_id:20056, nshort:'steelblade_recipe', name:'Instrukcja: Wytworzenie stalowego ostrza', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20057] = {item_id:20057, nshort:'customize_recipe', name:'Instrukcja: Wytworzenie ozdób do broni', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
	PK_S3.items[20059] = {item_id:20059, nshort:'polishstone_recipe', name:'Instrukcja: Wytworzenie kamienia polerskiego', type:'recipe', level:1, price:3500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:false, tradeable:true, sellable:true};
	
	
	
	PK_S3.items[20063] = {item_id:20063, nshort:'horseshoe_recipe', name:'Instrukcja: Podkuwanie kopyt', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20064] = {item_id:20064, nshort:'energyfood_recipe', name:'Instrukcja: Wytworzenie paszy treściwej', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20065] = {item_id:20065, nshort:'naked_saddle_recipe', name:'Instrukcja: Zdjęcie pokrycia z siodła', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20066] = {item_id:20066, nshort:'fillmaterial_recipe', name:'Instrukcja: Wytworzenie wypełniacza', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20067] = {item_id:20067, nshort:'leatherskin_recipe', name:'Instrukcja: Wytworzenie skórzanego pokrycia', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20068] = {item_id:20068, nshort:'brandingiron_recipe', name:'Instrukcja: Wytworzenie znakownika', type:'recipe', level:1, price:750, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20069] = {item_id:20069, nshort:'notworking_compass_recipe', name:'Instrukcja: Wytworzenie niewyregulowanego kompasu', type:'recipe', level:1, price:750, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20070] = {item_id:20070, nshort:'ironstep_recipe', name:'Instrukcja: Wytworzenie strzemienia', type:'recipe', level:1, price:1750, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20071] = {item_id:20071, nshort:'spores_recipe', name:'Instrukcja: Wytworzenie ostrogi', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20072] = {item_id:20072, nshort:'harnish_recipe', name:'Instrukcja: Wytworzenie uzdy', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20073] = {item_id:20073, nshort:'fieldcamp_recipe', name:'Instrukcja: Szycie śpiwora', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20074] = {item_id:20074, nshort:'horse_cloth_recipe', name:'Instrukcja: Szycie dery', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20075] = {item_id:20075, nshort:'custom_leather_recipe', name:'Instrukcja: Wytworzenie ozdób do wyrobów skórzanych', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20076] = {item_id:20076, nshort:'charriotpiece_recipe', name:'Instrukcja: Wytworzenie części powozu', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20077] = {item_id:20077, nshort:'wagonwheel_recipe', name:'Instrukcja: Wytworzenie koła powozu', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20078] = {item_id:20078, nshort:'aimwater_recipe', name:'Przepis: Przyrządzenie eliksiru celności', type:'recipe', level:1, price:3500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20079] = {item_id:20079, nshort:'gemsaddle_recipe', name:'Instrukcja: Wytworzenie łęku siodła', type:'recipe', level:1, price:3500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:false, tradeable:true, sellable:true};
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	PK_S3.items[20096] = {item_id:20096, nshort:'dried_meat_recipe', name:'Przepis: Przyrządzenie suszonego mięsa', type:'recipe', level:1, price:250, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20097] = {item_id:20097, nshort:'gulash_recipe', name:'Przepis: Przyrządzenie gulaszu', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:true, tradeable:true, sellable:true};
	PK_S3.items[20098] = {item_id:20098, nshort:'spare_ribs_recipe', name:'Przepis: Przyrządzenie żeberek', type:'recipe', level:1, price:5000, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:true, tradeable:true, sellable:true};
	
	
	PK_S3.items[20101] = {item_id:20101, nshort:'snake_oil_recipe', name:'Przepis: Przyrządzenie panaceum', type:'recipe', level:1, price:250, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:true, sellable:true};
	
	
	
	
	PK_S3.items[20106] = {item_id:20106, nshort:'fine_leather_polish_recipe', name:'Instrukcja: Wytworzenie wykwintnego impregnatu', type:'recipe', level:1, price:250, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:true, sellable:true};
	
	PK_S3.items[20108] = {item_id:20108, nshort:'fine_adorned_holster', name:'Instrukcja: Wytworzenie wytrzymałej kabury', type:'recipe', level:1, price:5000, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:true, sellable:true};
	
	
	PK_S3.items[20111] = {item_id:20111, nshort:'rustprove_bolts_recipe', name:'Instrukcja: Wytworzenie nierdzewnych śrub', type:'recipe', level:1, price:250, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:true, sellable:true};
	
    PK_S3.items[21345] = {item_id:21345, nshort:'fanta_drink', name:'Fanta', type:'yield', level:0, price:0, image:'/images/items/yield/fanta_drink.png?1', image_mini:'images/items/yield/fanta_drink.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};

/* --------------------------------------- INNE PRZEDMIOTY --------------------------------------- */
    PK_S3.items[40000] = {item_id:40000, nshort:'greenhorn_poncho', name:'Wełniane poncho', type:'body', level:1, price:125, image:'/images/items/body/greenhorn_poncho.png?1', image_mini:'/images/items/body/mini/greenhorn_poncho.png?1', bonus:{skills:{appearance:3, tough:3}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'greenhorn_set', name:'Zestaw nowicjusza'}, auctionable:false, dropable:true, tradeable:false, sellable:true};
	PK_S3.items[40001] = {item_id:40001, nshort:'vest_golddigger', name:'Kamizelka poszukiwacza złota', type:'body', level:10, price:50, image:'/images/items/body/vest_golddigger.png?1', image_mini:'/images/items/body/mini/vest_golddigger.png?1', bonus:{skills:{swim:1, endurance:1, tough:4}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:true, tradeable:false, sellable:true};
	PK_S3.items[40002] = {item_id:40002, nshort:'collector_jacket', name:'Kurtka kolekcjonera', type:'body', level:100, price:10000, image:'/images/items/body/collector_jacket.png?1', image_mini:'/images/items/body/mini/collector_jacket.png?1', bonus:{skills:{shot:15, punch:15}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'collector_set', name:'Zestaw kolekcjonera'}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[40003] = {item_id:40003, nshort:'bunny_dress', name:'Kostium zajączka', type:'body', level:1, price:0, image:'/images/items/body/bunny_dress.png?1', image_mini:'/images/items/body/mini/bunny_dress.png?1', bonus:{skills:{animal:2}, attributes:{charisma:1}, fortbattle:{}, fortbattlesector:{}}, set:{key:'bunny_set', name:'Zestaw zajączka wielkanocnego'}};
	
	PK_S3.items[100002] = {item_id:100002, nshort:'licor3', name:'Zabierz to szkło! Mam już dosyć.', type:'collection', level:0, price:0, image:'/images/items/collection/licor3.png?1', image_mini:'images/items/collection/licor3.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
	
	
	PK_S3.items[100005] = {item_id:100005, nshort:'cake1', name:'Ciasto czekoladowe', type:'collection', level:0, price:0, image:'/images/items/collection/cake1.png?1', image_mini:'images/items/collection/cake1.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[100006] = {item_id:100006, nshort:'cake2', name:'Ciasto czekoladowe', type:'collection', level:0, price:0, image:'/images/items/collection/cake2.png?1', image_mini:'images/items/collection/cake2.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[100007] = {item_id:100007, nshort:'cake3', name:'Ciasto czekoladowe', type:'collection', level:0, price:0, image:'/images/items/collection/cake3.png?1', image_mini:'images/items/collection/cake3.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[100008] = {item_id:100008, nshort:'cake4', name:'Ciasto czekoladowe', type:'collection', level:0, price:0, image:'/images/items/collection/cake4.png?1', image_mini:'images/items/collection/cake4.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
	PK_S3.items[100009] = {item_id:100009, nshort:'cake5', name:'Ciasto czekoladowe', type:'collection', level:0, price:0, image:'/images/items/collection/cake5.png?1', image_mini:'images/items/collection/cake5.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    
	PK_S3.items[185147] = {item_id:185147, nshort:'magic_wand', name:'Magiczna różdżka', type:'right_arm', level:1, price:0, image:'/images/items/right_arm/magic_wand.png?1', image_mini:'/images/items/right_arm/mini/magic_wand.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'wooden_magician_set', name:'Zestaw leśnego maga'}, damage:{damage_min:1, damage_max:1}, sub_type:'hand'};
	PK_S3.items[185148] = {item_id:185148, nshort:'slim_belt', name:'Sznur do zaciskania pasa', type:'belt', level:1, price:0, image:'/images/items/belt/slim_belt.png?1', image_mini:'/images/items/belt/mini/slim_belt.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'wooden_magician_set', name:'Zestaw leśnego maga'}, traderlevel:99, tradeable:true};
	PK_S3.items[185149] = {item_id:185149, nshort:'dude_jacket', name:'Fajowska szata', type:'body', level:1, price:0, image:'/images/items/body/dude_jacket.png?1', image_mini:'/images/items/body/mini/dude_jacket.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'wooden_magician_set', name:'Zestaw leśnego maga'}};
	PK_S3.items[185150] = {item_id:185150, nshort:'wooden_shoes', name:'Szałowe chodaki', type:'foot', level:1, price:0, image:'/images/items/foot/wooden_shoes.png?1', image_mini:'/images/items/foot/mini/wooden_shoes.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'wooden_magician_set', name:'Zestaw leśnego maga'}, traderlevel:99, tradeable:true};
	PK_S3.items[185151] = {item_id:185151, nshort:'fake_beard', name:'Broda Merlina', type:'neck', level:1, price:0, image:'/images/items/neck/fake_beard.png?1', image_mini:'images/items/neck/fake_beard.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'wooden_magician_set', name:'Zestaw leśnego maga'}};
	PK_S3.items[185152] = {item_id:185152, nshort:'magician_hat', name:'Kapelusz leśnego maga', type:'head', level:1, price:0, image:'/images/items/head/magician_hat.png?1', image_mini:'/images/items/head/mini/magician_hat.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'wooden_magician_set', name:'Zestaw leśnego maga'}, traderlevel:66, tradeable:true};
	
	PK_S3.items[185200] = {item_id:185200, nshort:'easter_11_egg1', name:'Jajko wielkanocne', type:'yield', level:0, price:15, image:'/images/items/yield/easter_11_egg1.png?1', image_mini:'images/items/yield/easter_11_egg1.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[185201] = {item_id:185201, nshort:'easter_11_egg2', name:'Jajko wielkanocne', type:'yield', level:0, price:32, image:'/images/items/yield/easter_11_egg2.png?1', image_mini:'images/items/yield/easter_11_egg2.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
	PK_S3.items[185202] = {item_id:185202, nshort:'easter_11_egg3', name:'Jajko wielkanocne', type:'yield', level:0, price:27, image:'/images/items/yield/easter_11_egg3.png?1', image_mini:'images/items/yield/easter_11_egg3.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[185203] = {item_id:185203, nshort:'easter_11_egg4', name:'Jajko wielkanocne', type:'yield', level:0, price:31, image:'/images/items/yield/easter_11_egg4.png?1', image_mini:'images/items/yield/easter_11_egg4.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[185204] = {item_id:185204, nshort:'easter_11_egg5', name:'Jajko wielkanocne', type:'yield', level:0, price:29, image:'/images/items/yield/easter_11_egg5.png?1', image_mini:'images/items/yield/easter_11_egg5.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};
    PK_S3.items[185205] = {item_id:185205, nshort:'easter_11_egg6', name:'Jajko wielkanocne', type:'yield', level:0, price:39, image:'/images/items/yield/easter_11_egg6.png?1', image_mini:'images/items/yield/easter_11_egg6.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:false, tradeable:false, sellable:true};



/* -------------------############-------------------- PRACE -------------------############-------------------- */   
    PK_S3.raboty[1] = {rus_name:'Pilnowanie świń', name:'swine', malus:2, navyki:{tough:1,endurance:1,leadership:1,animal:2}, resultaty:{dengi:3, opyt:1, vezenie:0, boom:1, produkty:{700:20}}};
    PK_S3.raboty[2] = {rus_name:'Przepędzanie ptaków z pola', name:'scarecrow', malus:1, navyki:{build:1,shot:1,pitfall:1,tactic:1,animal:1}, resultaty:{dengi:1, opyt:3, vezenie:2, boom:20, produkty:{757:20}}};
    PK_S3.raboty[3] = {rus_name:'Rozwieszanie plakatów', name:'wanted', malus:1, navyki:{endurance:1,ride:1,hide:1,finger_dexterity:1,pitfall:1}, resultaty:{dengi:2, opyt:3, vezenie:0, boom:10, produkty:{743:40}}};
    PK_S3.raboty[4] = {rus_name:'Zrywanie liści tytoniu', name:'tabacco', malus:1, navyki:{tough:1,finger_dexterity:2,tactic:1,trade:1}, resultaty:{dengi:6, opyt:1, vezenie:2, boom:2, produkty:{702:100}}};
    PK_S3.raboty[5] = {rus_name:'Zbiór bawełny', name:'cotton', malus:2, navyki:{tough:1,endurance:1,finger_dexterity:1,leadership:1,trade:1}, resultaty:{dengi:1, opyt:4, vezenie:0, boom:3, produkty:{704:50}}};
    PK_S3.raboty[6] = {rus_name:'Zrywanie trzciny cukrowej', name:'sugar', malus:4, navyki:{punch:1,tough:1,finger_dexterity:1,repair:1,trade:1}, resultaty:{dengi:5, opyt:2, vezenie:4, boom:1, produkty:{703:100}}};
    PK_S3.raboty[7] = {rus_name:'Wędkowanie', name:'angle', malus:3, navyki:{hide:1,swim:3,repair:1}, resultaty:{dengi:1, opyt:0, vezenie:6, boom:2, produkty:{705:60, 782:3}}};
    PK_S3.raboty[8] = {rus_name:'Zbieranie zboża', name:'cereal', malus:11, navyki:{punch:1,tough:1,endurance:1,ride:1,finger_dexterity:1}, resultaty:{dengi:2, opyt:6, vezenie:2, boom:4, produkty:{701:55}}};
    PK_S3.raboty[9] = {rus_name:'Zbieranie jagód', name:'berry', malus:16, navyki:{tough:2,hide:1,finger_dexterity:2}, resultaty:{dengi:2, opyt:6, vezenie:5, boom:6, produkty:{706:45}}};
    PK_S3.raboty[10] = {rus_name:'Wypasanie owiec', name:'sheeps', malus:12, navyki:{tough:1,endurance:1,leadership:1,animal:2}, resultaty:{dengi:3, opyt:5, vezenie:0, boom:2, produkty:{707:25}}};
    PK_S3.raboty[11] = {rus_name:'Sprzedaż gazet \&quot;Echo The West\&quot;', name:'newspaper', malus:9, navyki:{ride:2,trade:2,appearance:1}, resultaty:{dengi:6, opyt:1, vezenie:2, boom:1, produkty:{744:60}}};
    PK_S3.raboty[12] = {rus_name:'Koszenie pastwiska', name:'cut', malus:22, navyki:{punch:1,ride:1,finger_dexterity:1,animal:2}, resultaty:{dengi:5, opyt:7, vezenie:3, boom:3, produkty:{765:5}}};
    PK_S3.raboty[13] = {rus_name:'Mielenie zboża', name:'grinding', malus:25, navyki:{punch:1,tough:1,endurance:1,ride:1,finger_dexterity:1}, resultaty:{dengi:11, opyt:7, vezenie:0, boom:5, produkty:{745:40}}};
    PK_S3.raboty[14] = {rus_name:'Zbieranie kukurydzy', name:'corn', malus:23, navyki:{finger_dexterity:1,tactic:1,trade:1,animal:1,appearance:1}, resultaty:{dengi:4, opyt:7, vezenie:8, boom:5, produkty:{748:25}}};
    PK_S3.raboty[15] = {rus_name:'Zbieranie fasoli', name:'beans', malus:23, navyki:{endurance:1,finger_dexterity:1,leadership:1,tactic:1,animal:1}, resultaty:{dengi:9, opyt:7, vezenie:4, boom:5, produkty:{746:40}}};
    PK_S3.raboty[16] = {rus_name:'Obserwacja fortecy', name:'fort_guard', malus:25, navyki:{reflex:1,shot:1,leadership:1,appearance:2}, resultaty:{dengi:3, opyt:9, vezenie:2, boom:7, produkty:{758:2}}};
    PK_S3.raboty[17] = {rus_name:'Garbowanie', name:'tanning', malus:40, navyki:{tough:1,endurance:1,swim:1,finger_dexterity:1,trade:1}, resultaty:{dengi:12, opyt:15, vezenie:5, boom:18, produkty:{712:15}}};
    PK_S3.raboty[18] = {rus_name:'Wydobycie złota', name:'digging', malus:31, navyki:{tough:1,reflex:1,swim:1,trade:2}, resultaty:{dengi:11, opyt:3, vezenie:5, boom:7, produkty:{708:17, 1791:1}}};
    PK_S3.raboty[19] = {rus_name:'Kopanie grobów', name:'grave', malus:76, navyki:{build:1,punch:1,tough:1,endurance:1,ride:1}, resultaty:{dengi:16, opyt:12, vezenie:22, boom:9, produkty:{736:8}}};
    PK_S3.raboty[20] = {rus_name:'Polowanie na indyki', name:'turkey', malus:43, navyki:{reflex:1,hide:2,shot:1,pitfall:1}, resultaty:{dengi:3, opyt:14, vezenie:7, boom:21, produkty:{709:13}}};
    PK_S3.raboty[21] = {rus_name:'Rozkładanie torów', name:'rail', malus:45, navyki:{build:2,endurance:1,repair:1,leadership:1}, resultaty:{dengi:10, opyt:18, vezenie:5, boom:10, produkty:{766:25}}};
    PK_S3.raboty[22] = {rus_name:'Hodowla krów', name:'cow', malus:39, navyki:{ride:2,reflex:1,tactic:1,animal:1}, resultaty:{dengi:5, opyt:17, vezenie:0, boom:11, produkty:{710:15}}};
    PK_S3.raboty[23] = {rus_name:'Naprawianie płotów', name:'fence', malus:36, navyki:{finger_dexterity:1,repair:2,animal:2}, resultaty:{dengi:7, opyt:11, vezenie:5, boom:6, produkty:{747:11}}};
    PK_S3.raboty[24] = {rus_name:'Tartak', name:'saw', malus:64, navyki:{reflex:2,finger_dexterity:2,trade:1}, resultaty:{dengi:23, opyt:12, vezenie:6, boom:32, produkty:{742:10}}};
    PK_S3.raboty[25] = {rus_name:'Kamieniołom', name:'stone', malus:53, navyki:{punch:3,endurance:1,reflex:1}, resultaty:{dengi:17, opyt:8, vezenie:9, boom:33, produkty:{716:22}}};
    PK_S3.raboty[26] = {rus_name:'Wyrównywanie koryta rzeki', name:'straighten', malus:85, navyki:{build:1,swim:3,tactic:1}, resultaty:{dengi:8, opyt:22, vezenie:15, boom:12, produkty:{795:5}}};
    PK_S3.raboty[27] = {rus_name:'Wycinka drzew', name:'wood', malus:48, navyki:{punch:2,endurance:1,reflex:1,appearance:1}, resultaty:{dengi:18, opyt:5, vezenie:2, boom:21, produkty:{711:25}}};
    PK_S3.raboty[28] = {rus_name:'Budowa urządzeń nawadniających', name:'irrigation', malus:45, navyki:{build:1,ride:1,repair:1,leadership:1,tactic:1}, resultaty:{dengi:7, opyt:13, vezenie:15, boom:6, produkty:{736:6}}};
    PK_S3.raboty[29] = {rus_name:'Znakowanie bydła', name:'brand', malus:50, navyki:{ride:1,reflex:1,pitfall:1,animal:2}, resultaty:{dengi:8, opyt:25, vezenie:0, boom:35, produkty:{740:13}}};
    PK_S3.raboty[30] = {rus_name:'Zakładanie ogrodzenia z drutu kolczastego', name:'wire', malus:58, navyki:{build:1,finger_dexterity:2,pitfall:1,animal:1}, resultaty:{dengi:17, opyt:13, vezenie:6, boom:0, produkty:{739:10}}};
    PK_S3.raboty[31] = {rus_name:'Burzenie tamy', name:'dam', malus:54, navyki:{swim:2,tactic:2,animal:1}, resultaty:{dengi:4, opyt:18, vezenie:9, boom:41, produkty:{714:5}}};
    PK_S3.raboty[32] = {rus_name:'Poszukiwanie kamieni półszlachetnych', name:'gems', malus:75, navyki:{swim:2,finger_dexterity:1,trade:2}, resultaty:{dengi:25, opyt:7, vezenie:8, boom:4, produkty:{720:8}}};
    PK_S3.raboty[33] = {rus_name:'Ustanowienie prawa własności', name:'claim', malus:57, navyki:{build:1,endurance:1,swim:1,trade:1,appearance:1}, resultaty:{dengi:31, opyt:4, vezenie:4, boom:29, produkty:{755:25}}};
    PK_S3.raboty[34] = {rus_name:'Naprawa wozów osadnikówк', name:'chuck_wagon', malus:134, navyki:{ride:1,repair:2,leadership:1,trade:1}, resultaty:{dengi:5, opyt:23, vezenie:42, boom:11, produkty:{722:15}}};
    PK_S3.raboty[35] = {rus_name:'Ujeżdżanie koni', name:'break_in', malus:72, navyki:{ride:2,reflex:1,pitfall:1,animal:1}, resultaty:{dengi:13, opyt:32, vezenie:10, boom:52, produkty:{787:5}}};
    PK_S3.raboty[36] = {rus_name:'Handel', name:'trade', malus:85, navyki:{pitfall:1,trade:2,appearance:2}, resultaty:{dengi:15, opyt:3, vezenie:25, boom:12, produkty:{715:13, 774:1}}};
    PK_S3.raboty[37] = {rus_name:'Stawianie masztów telegraficznych', name:'mast', malus:75, navyki:{build:2,punch:1,swim:1,repair:1}, resultaty:{dengi:21, opyt:25, vezenie:3, boom:14, produkty:{767:14}}};
    PK_S3.raboty[38] = {rus_name:'Kopanie studni', name:'spring', malus:103, navyki:{build:1,endurance:1,swim:1,leadership:1,tactic:1}, resultaty:{dengi:9, opyt:33, vezenie:23, boom:19, produkty:{741:10}}};
    PK_S3.raboty[39] = {rus_name:'Polowanie na bobry', name:'beaver', malus:120, navyki:{hide:2,pitfall:3}, resultaty:{dengi:32, opyt:17, vezenie:6, boom:21, produkty:{714:17, 771:13}}};
    PK_S3.raboty[40] = {rus_name:'Wydobycie węgla', name:'coal', malus:86, navyki:{punch:2,reflex:1,finger_dexterity:1,trade:1}, resultaty:{dengi:30, opyt:14, vezenie:0, boom:13, produkty:{721:37}}};
    PK_S3.raboty[41] = {rus_name:'Drukowanie gazet Echo The West', name:'print', malus:83, navyki:{tough:1,endurance:1,finger_dexterity:1,repair:1,leadership:1}, resultaty:{dengi:30, opyt:20, vezenie:5, boom:7, produkty:{744:40}}};
    PK_S3.raboty[42] = {rus_name:'Połów ryb', name:'fishing', malus:91, navyki:{swim:2,pitfall:2,leadership:1}, resultaty:{dengi:6, opyt:23, vezenie:23, boom:38, produkty:{717:15, 705:5}}};
    PK_S3.raboty[43] = {rus_name:'Budowa stacji kolejowej', name:'trainstation', malus:113, navyki:{build:2,finger_dexterity:1,repair:1,leadership:1}, resultaty:{dengi:12, opyt:47, vezenie:7, boom:15, produkty:{759:7}}};
    PK_S3.raboty[44] = {rus_name:'Budowa wiatraków', name:'windmeel', malus:164, navyki:{build:1,endurance:1,ride:1,leadership:1,tactic:1}, resultaty:{dengi:42, opyt:43, vezenie:6, boom:18, produkty:{756:5}}};
    PK_S3.raboty[45] = {rus_name:'Eksploracja kontynentu', name:'explore', malus:112, navyki:{endurance:1,shot:1,ride:1,swim:1,leadership:1}, resultaty:{dengi:1, opyt:45, vezenie:22, boom:37, produkty:{760:15}}};
    PK_S3.raboty[46] = {rus_name:'Spław drewna', name:'float', malus:138, navyki:{reflex:1,swim:3,tactic:1}, resultaty:{dengi:23, opyt:45, vezenie:0, boom:52, produkty:{711:30}}};
    PK_S3.raboty[47] = {rus_name:'Budowa mostów', name:'bridge', malus:108, navyki:{build:1,endurance:1,swim:2,repair:1}, resultaty:{dengi:17, opyt:33, vezenie:18, boom:53, produkty:{761:8}}};
    PK_S3.raboty[48] = {rus_name:'Łapanie koni', name:'springe', malus:135, navyki:{endurance:1,ride:2,animal:2}, resultaty:{dengi:29, opyt:45, vezenie:0, boom:42, produkty:{749:22}}};
    PK_S3.raboty[49] = {rus_name:'Budowa trumien', name:'coffin', malus:119, navyki:{build:1,reflex:1,repair:2,appearance:1}, resultaty:{dengi:42, opyt:8, vezenie:15, boom:20, produkty:{734:25}}};
    PK_S3.raboty[50] = {rus_name:'Transportowanie amunicji', name:'dynamite', malus:145, navyki:{ride:1,reflex:1,shot:1,finger_dexterity:1,appearance:1}, resultaty:{dengi:23, opyt:12, vezenie:64, boom:93, produkty:{737:5}}};
    PK_S3.raboty[51] = {rus_name:'Polowanie na kojoty', name:'coyote', malus:141, navyki:{endurance:2,shot:1,pitfall:1,hide:1}, resultaty:{dengi:15, opyt:43, vezenie:26, boom:45, produkty:{718:6}}};
    PK_S3.raboty[52] = {rus_name:'Polowanie na bizony', name:'buffalo', malus:179, navyki:{ride:1,pitfall:1,leadership:1,tactic:1,animal:1}, resultaty:{dengi:24, opyt:62, vezenie:0, boom:72, produkty:{724:14}}};
    PK_S3.raboty[53] = {rus_name:'Budowa posiadłości', name:'fort', malus:225, navyki:{build:1,pitfall:1,repair:1,leadership:2}, resultaty:{dengi:33, opyt:71, vezenie:17, boom:35, produkty:{762:3}}};
    PK_S3.raboty[54] = {rus_name:'Handlowanie z Indianami', name:'indians', malus:224, navyki:{pitfall:1,trade:2,appearance:2}, resultaty:{dengi:11, opyt:14, vezenie:63, boom:34, produkty:{719:13}}};
    PK_S3.raboty[55] = {rus_name:'Karczowanie lasu', name:'clearing', malus:179, navyki:{punch:2,reflex:1,leadership:1,tactic:1}, resultaty:{dengi:62, opyt:8, vezenie:9, boom:16, produkty:{711:65}}};
    PK_S3.raboty[56] = {rus_name:'Wydobycie srebra', name:'silver', malus:194, navyki:{punch:1,tough:1,finger_dexterity:1,trade:2}, resultaty:{dengi:76, opyt:8, vezenie:0, boom:32, produkty:{725:17}}};
    PK_S3.raboty[57] = {rus_name:'Ochrona powozu pocztowego', name:'diligence_guard', malus:404, navyki:{ride:1,shot:1,repair:1,leadership:2}, resultaty:{dengi:34, opyt:77, vezenie:45, boom:43, produkty:{780:12}}};
    PK_S3.raboty[58] = {rus_name:'Polowanie na wilki', name:'wolf', malus:208, navyki:{hide:2,pitfall:2,animal:1}, resultaty:{dengi:21, opyt:63, vezenie:15, boom:67, produkty:{763:11}}};
    PK_S3.raboty[59] = {rus_name:'Ochrona wozu osadników', name:'track', malus:213, navyki:{hide:2,leadership:2,tactic:1}, resultaty:{dengi:10, opyt:60, vezenie:30, boom:33, produkty:{778:12}}};
    PK_S3.raboty[60] = {rus_name:'Kradzież koni', name:'ox', malus:238, navyki:{reflex:1,hide:1,pitfall:2,animal:1}, resultaty:{dengi:64, opyt:34, vezenie:18, boom:43, produkty:{787:13}}};
    PK_S3.raboty[61] = {rus_name:'Strażnik więzienia', name:'guard', malus:222, navyki:{punch:1,reflex:1,shot:1,appearance:2}, resultaty:{dengi:25, opyt:35, vezenie:38, boom:4, produkty:{750:1}}};
    PK_S3.raboty[62] = {rus_name:'Misjonarze', name:'bible', malus:236, navyki:{tough:1,ride:1,trade:1,appearance:2}, resultaty:{dengi:5, opyt:61, vezenie:52, boom:77, produkty:{768:1}}};
    PK_S3.raboty[63] = {rus_name:'Pony-Express', name:'ponyexpress', malus:226, navyki:{endurance:1,ride:2,shot:1,animal:1}, resultaty:{dengi:15, opyt:45, vezenie:51, boom:44, produkty:{779:5}}};
    PK_S3.raboty[64] = {rus_name:'Sprzedaż broni Indianom', name:'weapons', malus:258, navyki:{hide:1,shot:1,repair:1,trade:2}, resultaty:{dengi:15, opyt:35, vezenie:72, boom:82, produkty:{783:4}}};
    PK_S3.raboty[65] = {rus_name:'Plądrowanie zwłok', name:'dead', malus:266, navyki:{tough:1,hide:1,finger_dexterity:2,repair:1}, resultaty:{dengi:14, opyt:14, vezenie:90, boom:34, produkty:{774:1,723:1}}};
    PK_S3.raboty[66] = {rus_name:'Polowanie na grizzly', name:'grizzly', malus:281, navyki:{hide:1,shot:1,pitfall:2,animal:1}, resultaty:{dengi:25, opyt:78, vezenie:35, boom:71, produkty:{731:3}}};
    PK_S3.raboty[67] = {rus_name:'Wydobycie ropy', name:'oil', malus:295, navyki:{build:1,tough:1,endurance:1,leadership:1,trade:1}, resultaty:{dengi:83, opyt:25, vezenie:20, boom:7, produkty:{752:25}}};
    PK_S3.raboty[68] = {rus_name:'Poszukiwanie skarbu', name:'treasure_hunting', malus:294, navyki:{hide:2,repair:2,tactic:1}, resultaty:{dengi:20, opyt:20, vezenie:83, boom:24, produkty:{726:1}}};
    PK_S3.raboty[69] = {rus_name:'Służba w armii', name:'army', malus:299, navyki:{endurance:1,swim:1,shot:1,pitfall:1,appearance:1}, resultaty:{dengi:55, opyt:76, vezenie:17, boom:35, produkty:{727:2}}};
    PK_S3.raboty[70] = {rus_name:'Okradanie ludzi', name:'steal', malus:372, navyki:{reflex:1,hide:1,shot:1,pitfall:1,finger_dexterity:1}, resultaty:{dengi:48, opyt:50, vezenie:74, boom:66, produkty:{728:4}}};
    PK_S3.raboty[71] = {rus_name:'Pracuj jako żołdak', name:'mercenary', malus:332, navyki:{tough:1,swim:1,shot:1,repair:1,appearance:1}, resultaty:{dengi:92, opyt:52, vezenie:23, boom:65, produkty:{1708:85}}};
    PK_S3.raboty[72] = {rus_name:'Ściganie bandytów', name:'bandits', malus:385, navyki:{tough:1,endurance:1,hide:1,leadership:1,tactic:1}, resultaty:{dengi:28, opyt:75, vezenie:85, boom:83, produkty:{729:5}}};
    PK_S3.raboty[73] = {rus_name:'Napad', name:'aggression', malus:422, navyki:{hide:2,pitfall:1,tactic:1,appearance:1}, resultaty:{dengi:78, opyt:27, vezenie:78, boom:86, produkty:{730:13,774:1}}};
    PK_S3.raboty[74] = {rus_name:'Napad na powóz pocztowy', name:'diligence_aggression', malus:476, navyki:{shot:1,pitfall:1,leadership:1,tactic:1,appearance:1}, resultaty:{dengi:43, opyt:73, vezenie:95, boom:67, produkty:{733:15}}};
    PK_S3.raboty[75] = {rus_name:'Łowca nagród', name:'bounty', malus:426, navyki:{punch:1,endurance:1,shot:1,pitfall:1,appearance:1}, resultaty:{dengi:92, opyt:32, vezenie:79, boom:72, produkty:{1756:25}}};
    PK_S3.raboty[76] = {rus_name:'Transport więźniów', name:'captured', malus:438, navyki:{endurance:1,reflex:1,hide:1,tactic:2}, resultaty:{dengi:23, opyt:69, vezenie:85, boom:44, produkty:{764:4}}};
    PK_S3.raboty[77] = {rus_name:'Napad na pociąg', name:'train', malus:506, navyki:{endurance:1,hide:1,shot:1,pitfall:1,trade:1}, resultaty:{dengi:67, opyt:87, vezenie:92, boom:96, produkty:{1755:1}}};
    PK_S3.raboty[78] = {rus_name:'Włamanie', name:'burglary', malus:518, navyki:{endurance:1,hide:2,tactic:1,trade:1}, resultaty:{dengi:80, opyt:34, vezenie:81, boom:26, produkty:{786:12}}};
    PK_S3.raboty[79] = {rus_name:'Pracuj jako konował', name:'quackery', malus:316, navyki:{hide:1,shot:1,pitfall:1,trade:1,appearance:1}, resultaty:{dengi:65, opyt:50, vezenie:52, boom:67, produkty:{794:9}}};
    PK_S3.raboty[80] = {rus_name:'Rokowania pokojowe', name:'peace', malus:367, navyki:{endurance:1,hide:1,shot:1,trade:1,appearance:1}, resultaty:{dengi:33, opyt:68, vezenie:76, boom:44, produkty:{751:8}}};
    PK_S3.raboty[82] = {rus_name:'Pilotowanie Parowców Kołowych', name:'ship', malus:348, navyki:{punch:1,swim:2,leadership:2}, resultaty:{dengi:82, opyt:35, vezenie:15, boom:14, produkty:{788:12}}};
    PK_S3.raboty[83] = {rus_name:'Przemyt', name:'smuggle', malus:411, navyki:{hide:1,swim:1,shot:1,trade:1,appearance:1}, resultaty:{dengi:62, opyt:45, vezenie:83, boom:56, produkty:{729:22}}};
    PK_S3.raboty[84] = {rus_name:'Budowa Rancza', name:'ranch', malus:221, navyki:{build:2,endurance:1,ride:1,animal:1}, resultaty:{dengi:28, opyt:61, vezenie:17, boom:24, produkty:{784:45}}};
    PK_S3.raboty[85] = {rus_name:'Wydobycie żelaza', name:'iron', malus:177, navyki:{build:1,punch:1,reflex:1,finger_dexterity:1,repair:1}, resultaty:{dengi:52, opyt:32, vezenie:15, boom:29, produkty:{790:38, 753:2}}};
    PK_S3.raboty[86] = {rus_name:'Zbieranie agawy', name:'agave', malus:153, navyki:{punch:1,tough:2,endurance:1,finger_dexterity:1}, resultaty:{dengi:25, opyt:42, vezenie:12, boom:27, produkty:{792:12}}};
    PK_S3.raboty[87] = {rus_name:'Zbieranie pomidorów', name:'tomato', malus:43, navyki:{ride:1,finger_dexterity:1,leadership:1,tactic:1,trade:1}, resultaty:{dengi:13, opyt:12, vezenie:7, boom:11, produkty:{793:33}}};
    PK_S3.raboty[88] = {rus_name:'Podkuwanie koni', name:'horseshoe', malus:93, navyki:{punch:1,ride:2,animal:2}, resultaty:{dengi:14, opyt:28, vezenie:9, boom:23, produkty:{754:22}}};
	
    PK_S3.raboty[90] = {rus_name:'Gaszenie pożaru', name:'fire', malus:229, navyki:{build:1,tough:1,reflex:1,leadership:1,tactic:1}, resultaty:{dengi:15, opyt:41, vezenie:65, boom:45, produkty:{781:2}}};
    PK_S3.raboty[91] = {rus_name:'Zbieranie pomarańczy', name:'orange', malus:67, navyki:{endurance:1,reflex:1,pitfall:1,repair:1,tactic:1}, resultaty:{dengi:14, opyt:25, vezenie:10, boom:21, produkty:{791:25}}};
    PK_S3.raboty[92] = {rus_name:'Sprzątanie stajni', name:'muck_out', malus:8, navyki:{tough:1,ride:1,repair:1,animal:2}, resultaty:{dengi:4, opyt:5, vezenie:2, boom:6, produkty:{797:5}}};
    PK_S3.raboty[93] = {rus_name:'Czyszczenie butów', name:'shoes', malus:1, navyki:{hide:1,pitfall:1,finger_dexterity:1,trade:1,appearance:1}, resultaty:{dengi:3, opyt:2, vezenie:3, boom:2, produkty:{789:35}}};
    PK_S3.raboty[94] = {rus_name:'Zakładanie ostróg', name:'socks_darn', malus:1, navyki:{tough:2,endurance:1,finger_dexterity:2}, resultaty:{dengi:1, opyt:4, vezenie:0, boom:2, produkty:{1807:75}}};
    PK_S3.raboty[95] = {rus_name:'Wykopki', name:'potatoe', malus:113, navyki:{tough:2,endurance:2,finger_dexterity:1}, resultaty:{dengi:8, opyt:53, vezenie:5, boom:5, produkty:{1808:75}}};
    PK_S3.raboty[96] = {rus_name:'Karmienie bydła', name:'feed_animal', malus:147, navyki:{punch:1,tough:1,leadership:1,animal:2}, resultaty:{dengi:17, opyt:60, vezenie:10, boom:20, produkty:{1809:50}}};
    PK_S3.raboty[97] = {rus_name:'Zbieranie dyń', name:'pumpkin', malus:175, navyki:{punch:2,tough:1,endurance:1,tactic:1}, resultaty:{dengi:45, opyt:45, vezenie:10, boom:10, produkty:{1810:60}}};
    PK_S3.raboty[98] = {rus_name:'Zbieranie borówek', name:'blueberries', malus:200, navyki:{punch:1,tough:1,ride:2,finger_dexterity:1}, resultaty:{dengi:52, opyt:35, vezenie:35, boom:15, produkty:{1811:65}}};
    PK_S3.raboty[99] = {rus_name:'Sadzenie drzew', name:'plant_trees', malus:226, navyki:{build:2,ride:1,finger_dexterity:1,tactic:1}, resultaty:{dengi:34, opyt:25, vezenie:54, boom:25, produkty:{1812:30}}};
    PK_S3.raboty[100] = {rus_name:'Zbieranie orlich piór', name:'gather_feathers', malus:276, navyki:{finger_dexterity:1, repair:2,tactic:1,trade:1}, resultaty:{dengi:47, opyt:23, vezenie:60, boom:15, produkty:{1813:20}}};
    PK_S3.raboty[101] = {rus_name:'Zbieranie kwiatów lotosu', name:'lotus_gathering', malus:351, navyki:{tough:1,swim:2,finger_dexterity:1,repair:1}, resultaty:{dengi:54, opyt:45, vezenie:35, boom:20, produkty:{1814:15}}};
    PK_S3.raboty[102] = {rus_name:'Połów krabów', name:'crab_hunting', malus:376, navyki:{tough:1,reflex:1,swim:2,finger_dexterity:1}, resultaty:{dengi:67, opyt:56, vezenie:35, boom:12, produkty:{1815:10}}};
    PK_S3.raboty[103] = {rus_name:'Nauczanie', name:'teaching', malus:401, navyki:{endurance:1,pitfall:1,leadership:1,appearance:2}, resultaty:{dengi:54, opyt:79, vezenie:5, boom:23, produkty:{1816:25}}};
    PK_S3.raboty[104] = {rus_name:'Pracuj jako szeryf', name:'sheriff_work', malus:411, navyki:{reflex:1,shot:2,leadership:1,appearance:1}, resultaty:{dengi:67, opyt:76, vezenie:56, boom:45, produkty:{1817:50}}};
    PK_S3.raboty[105] = {rus_name:'Wydobycie siarki', name:'sulfur_gathering', malus:421, navyki:{punch:2,reflex:2,repair:1}, resultaty:{dengi:76, opyt:34, vezenie:78, boom:32, produkty:{1818:10}}};
    PK_S3.raboty[106] = {rus_name:'Spływ rwącą rzeką', name:'wildwater', malus:426, navyki:{reflex:2,swim:2,tactic:1}, resultaty:{dengi:84, opyt:74, vezenie:30, boom:57, produkty:{999:25}}};
    PK_S3.raboty[107] = {rus_name:'Hazardzista w trasie', name:'gambler', malus:431, navyki:{reflex:1,hide:1,shot:1,trade:1,appearance:1}, resultaty:{dengi:67, opyt:57, vezenie:69, boom:63, produkty:{1819:25}}};
    PK_S3.raboty[108] = {rus_name:'Polowanie na grzechotniki', name:'rattlesnake', malus:441, navyki:{reflex:2,hide:1,pitfall:1,animal:1}, resultaty:{dengi:72, opyt:46, vezenie:71, boom:73, produkty:{1820:15}}};
    PK_S3.raboty[109] = {rus_name:'Kopanie saletry', name:'salpeter_gathering', malus:451, navyki:{tough:2,endurance:1,finger_dexterity:1,repair:1}, resultaty:{dengi:62, opyt:53, vezenie:58, boom:27, produkty:{1821:35}}};
    PK_S3.raboty[110] = {rus_name:'Transport koni', name:'horse_transport', malus:451, navyki:{ride:2,leadership:1,animal:2}, resultaty:{dengi:66, opyt:82, vezenie:69, boom:48, produkty:{1822:10}}};
    PK_S3.raboty[111] = {rus_name:'Rodeo', name:'rodeo', malus:500, navyki:{endurance:1,ride:2,pitfall:1,animal:1}, resultaty:{dengi:76, opyt:56, vezenie:69, boom:78, produkty:{1823:5}}};
    PK_S3.raboty[112] = {rus_name:'Wędrowny handlarz', name:'travelling_salesman', malus:501, navyki:{tough:1,pitfall:1,trade:2,appearance:1}, resultaty:{dengi:59, opyt:46, vezenie:97, boom:67, produkty:{999:7}}};
    PK_S3.raboty[113] = {rus_name:'Oszust matrymonialny', name:'con_artist', malus:521, navyki:{endurance:1,pitfall:1,tactic:1,trade:1,appearance:1}, resultaty:{dengi:78, opyt:89, vezenie:35, boom:83, produkty:{1836:2}}};
    PK_S3.raboty[114] = {rus_name:'Polowanie na pumy', name:'cougar', malus:541, navyki:{shot:2,pitfall:1,tactic:1,animal:1}, resultaty:{dengi:46, opyt:89, vezenie:39, boom:93, produkty:{1824:20}}};
    PK_S3.raboty[115] = {rus_name:'Zbiór indygo', name:'indigo_gathering', malus:591, navyki:{reflex:1,finger_dexterity:2,tactic:1,trade:1}, resultaty:{dengi:87, opyt:73, vezenie:29, boom:69, produkty:{1825:5}}};
    PK_S3.raboty[116] = {rus_name:'Transport alkoholu', name:'alcohol', malus:601, navyki:{ride:1,hide:2,shot:1,leadership:1}, resultaty:{dengi:74, opyt:91, vezenie:34, boom:56, produkty:{1826:50}}};
    PK_S3.raboty[117] = {rus_name:'Wydobycie ołowiu', name:'lead_gathering', malus:621, navyki:{punch:1,finger_dexterity:1,repair:2,leadership:1}, resultaty:{dengi:89, opyt:72, vezenie:22, boom:72, produkty:{1827:30}}};
    PK_S3.raboty[118] = {rus_name:'Poszukiwanie rzadkich kamieni szlachetnych', name:'gem_gathering', malus:641, navyki:{punch:2,endurance:1,shot:1,repair:1}, resultaty:{dengi:91, opyt:78, vezenie:23, boom:77, produkty:{1828:20, 1829:20, 1830:20}}};
    PK_S3.raboty[119] = {rus_name:'Budowa domu misyjnego', name:'mission', malus:571, navyki:{build:2,punch:1,endurance:1,repair:1}, resultaty:{dengi:92, opyt:82, vezenie:54, boom:38, produkty:{1831:3}}};
    PK_S3.raboty[120] = {rus_name:'Budowa kasyna', name:'casino', malus:651, navyki:{build:3,repair:1,leadership:1}, resultaty:{dengi:78, opyt:92, vezenie:23, boom:45, produkty:{1832:10}}};
    PK_S3.raboty[121] = {rus_name:'Pracuj jako Marshall', name:'marshall', malus:701, navyki:{ride:1,shot:2,pitfall:1,appearance:1}, resultaty:{dengi:87, opyt:90, vezenie:60, boom:94, produkty:{1833:1}}};
    PK_S3.raboty[122] = {rus_name:'Rozbijanie gangów', name:'shatter_gang', malus:726, navyki:{endurance:1,hide:2,pitfall:1,tactic:1}, resultaty:{dengi:84, opyt:70, vezenie:89, boom:99, produkty:{999:10}}};
    PK_S3.raboty[123] = {rus_name:'Napad na bank', name:'bankrobbery', malus:741, navyki:{hide:2,pitfall:1,leadership:1,trade:1}, resultaty:{dengi:93, opyt:84, vezenie:30, boom:89, produkty:{1837:1}}};
    PK_S3.raboty[124] = {rus_name:'Uwalnianie niewolników', name:'free_slaves', malus:751, navyki:{swim:1,shot:1,leadership:1,tactic:1,appearance:1}, resultaty:{dengi:84, opyt:93, vezenie:28, boom:92, produkty:{1834:5}}};
    PK_S3.raboty[125] = {rus_name:'Występ z Buffalo Billem', name:'buffelo_bill', malus:801, navyki:{ride:1,shot:1,animal:1,appearance:2}, resultaty:{dengi:92, opyt:94, vezenie:65, boom:70, produkty:{1835:5}}};
    PK_S3.raboty[126] = {rus_name:'Budowa palisady', name:'build_palisade', malus:301, navyki:{build:1,punch:1,endurance:1,repair:1,leadership:1}, resultaty:{dengi:33, opyt:65, vezenie:20, boom:30, produkty:{999:20}}};

    PK_S3.raboty[PK_S3.raboty.build] = {rus_name:'! Rozbudowa miasta/fortu \u2617', name:'build', malus:0, navyki:{build:3,repair:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};
    PK_S3.raboty[PK_S3.raboty.moving] = {rus_name:'! Przemieszczanie się \u261E', name:'moving', malus:0, navyki:{ride:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};
    PK_S3.raboty[PK_S3.raboty.health] = {rus_name:'! Życie \u2665', name:'health', malus:0, navyki:{health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};
    PK_S3.raboty[PK_S3.raboty.energy] = {rus_name:'! Regeneracja energii \u2672', name:'energy', malus:0, navyki:{health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};
//
    PK_S3.raboty[301] = {rus_name:'Atak na fort', name:'attack', malus:0, navyki:{aim:.5,dodge:.5,endurance:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[302] = {rus_name:'\u29BF Atak na fort (celność)', name:'attack', malus:0, navyki:{aim:1,dodge:.001,endurance:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[303] = {rus_name:'\u293D Atak na fort (unik)', name:'attack', malus:0, navyki:{aim:.001,dodge:1,endurance:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[304] = {rus_name:'Obrona fortu', name:'defend', malus:0, navyki:{aim:.5,dodge:.5,hide:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};
    PK_S3.raboty[305] = {rus_name:'\u29BF Obrona fortu (celność)', name:'defend', malus:0, navyki:{aim:1,dodge:.001,hide:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};
    PK_S3.raboty[306] = {rus_name:'\u293D Obrona fortu (unik)', name:'defend', malus:0, navyki:{aim:.001,dodge:1,hide:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};
    PK_S3.raboty[307] = {rus_name:'\u2665 Atak na fort (życie)', name:'attack', malus:0, navyki:{aim:.001,dodge:.001,endurance:.001,leadership:.001,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[308] = {rus_name:'\u2665 Obrona fortu (życie)', name:'defend', malus:0, navyki:{aim:.001,dodge:.001,hide:.001,leadership:.001,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};
//    
    PK_S3.raboty[401] = {rus_name:'! Strzelec \u21D2 strzelec', name:'sh_vs_sh_at', malus:0, navyki:{aim:1, dodge:1, shot:1, reflex:1, appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[402] = {rus_name:'! Strzelec \u2602 strzelec', name:'sh_vs_sh_de', malus:0, navyki:{aim:1, dodge:1, shot:1, reflex:1, tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[403] = {rus_name:'! Strzelec \u21D2 siepacz', name:'sh_vs_me_at', malus:0, navyki:{aim:1, dodge:1, shot:1, tough:1, appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[404] = {rus_name:'! Strzelec \u2602 siepacz', name:'sh_vs_me_de', malus:0, navyki:{aim:1, dodge:1, shot:1, tough:1, tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[405] = {rus_name:'! Strzelec \u2614', name:'sh_vs_al_de', malus:0, navyki:{aim:1, dodge:1, shot:1, tough:0.75, reflex:0.75}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[406] = {rus_name:'! Siepacz \u21D2 strzelec', name:'me_vs_sh_at', malus:0, navyki:{aim:1, dodge:1, punch:1, reflex:1, appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[407] = {rus_name:'! Siepacz \u2602 strzelec', name:'me_vs_sh_de', malus:0, navyki:{aim:1, dodge:1, punch:1, reflex:1, tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[408] = {rus_name:'! Siepacz \u21D2 siepacz', name:'me_vs_me_at', malus:0, navyki:{aim:1, dodge:1, punch:1, tough:1, appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[409] = {rus_name:'! Siepacz \u2602 siepacz', name:'me_vs_me_de', malus:0, navyki:{aim:1, dodge:1, punch:1, tough:1, tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[410] = {rus_name:'! Siepacz \u2614', name:'me_vs_al_de', malus:0, navyki:{aim:1, dodge:1, punch:1, tough:0.75, reflex:0.75}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
//
    PK_S3.raboty[421] = {rus_name:'Zaskok, celność', name:'duel421', malus:0, navyki:{appearance:1, aim:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[422] = {rus_name:'Zaskok, celność, strzelanie', name:'duel422', malus:0, navyki:{aim:1,shot:1,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[423] = {rus_name:'Zaskok, celność, siła', name:'duel423', malus:0, navyki:{aim:1,punch:1,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[424] = {rus_name:'Zaskok, celność, unik', name:'duel424', malus:0, navyki:{aim:1,dodge:1,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[425] = {rus_name:'Zaskok, celność, unik, strzelanie', name:'duel425', malus:0, navyki:{aim:1,dodge:1,appearance:1, shot:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[426] = {rus_name:'Zaskok, unik', name:'duel426', malus:0, navyki:{dodge:1,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[427] = {rus_name:'Taktyka, unik', name:'427', malus:0, navyki:{dodge:1,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[428] = {rus_name:'Taktyka, unik, celność', name:'duel428', malus:0, navyki:{aim:1,dodge:1,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[429] = {rus_name:'Taktyka, unik, celność, strzelanie', name:'duel429', malus:0, navyki:{aim:1,dodge:1,tactic:1, shot:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[430] = {rus_name:'Strzelanie, celność', name:'duel430', malus:0, navyki:{aim:1,shot:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[431] = {rus_name:'Strzelanie, unik', name:'duel431', malus:0, navyki:{dodge:1,shot:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[432] = {rus_name:'Siła, celność', name:'duel432', malus:0, navyki:{aim:1,punch:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[433] = {rus_name:'Siła, refleks, \u00BD odporność', name:'duel433', malus:0, navyki:{punch:1,reflex:1,tough:0.5}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[434] = {rus_name:'Siła, odporność, \u00BD refleksu', name:'duel434', malus:0, navyki:{punch:1,reflex:0.5,tough:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[435] = {rus_name:'Siła, celność, refleks, \u00BD odporność', name:'duel435', malus:0, navyki:{aim:1,punch:1,reflex:1,tough:0.5}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[436] = {rus_name:'Siła, celność, odporność, \u00BD refleksu', name:'duel436', malus:0, navyki:{aim:1,punch:1,reflex:0.5,tough:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[437] = {rus_name:'Celność, refleks, \u00BD odporność', name:'duel437', malus:0, navyki:{aim:1,reflex:1,tough:0.5}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[438] = {rus_name:'Celność, odporność, \u00BD refleksu', name:'duel438', malus:0, navyki:{aim:1,reflex:0.5,tough:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
	// testy
    PK_S3.raboty[439] = {rus_name:'Celność, unik', name:'duel439', malus:0, navyki:{aim:1,dodge:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[440] = {rus_name:'Celność, unik, 0.1 zaskok, 0.001 strzelanie', name:'duel440', malus:0, navyki:{aim:1,dodge:1,appearance:0.1,shot:0.001}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
//
    PK_S3.komplekty.max = 9;
    PK_S3.komplekty.set_farmer=[];
    PK_S3.komplekty.set_farmer[1] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_farmer[2] = {bonus:{attributes:{flexibility:1, strength:1}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_farmer[2].raboty[8]=10; // Zbieranie zboża
	PK_S3.komplekty.set_farmer[2].raboty[12]=10; // Koszenie pastwiska
	PK_S3.komplekty.set_farmer[2].raboty[13]=10; // Mielenie zboża
    PK_S3.komplekty.set_farmer[3] = {bonus:{attributes:{flexibility:1, strength:1, dexterity:1, charisma:1}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_farmer[3].raboty[8]=10; // Zbieranie zboża
	PK_S3.komplekty.set_farmer[3].raboty[12]=10; // Koszenie pastwiska
	PK_S3.komplekty.set_farmer[3].raboty[13]=10; // Mielenie zboża
    PK_S3.komplekty.set_farmer[3].raboty[88]=20; // Podkuwanie koni
	PK_S3.komplekty.set_farmer[3].raboty[30]=20; // Zakładanie ogrodzenia z drutu kolczastego
	PK_S3.komplekty.set_farmer[3].raboty[22]=20; // Hodowla krów
    PK_S3.komplekty.set_farmer[4] = {bonus:{attributes:{flexibility:2, strength:2, dexterity:2, charisma:2}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_farmer[4].raboty[8]=10; // Zbieranie zboża
	PK_S3.komplekty.set_farmer[4].raboty[12]=10; // Koszenie pastwiska
	PK_S3.komplekty.set_farmer[4].raboty[13]=10; // Mielenie zboża
    PK_S3.komplekty.set_farmer[4].raboty[88]=20; // Podkuwanie koni
	PK_S3.komplekty.set_farmer[4].raboty[30]=20; // Zakładanie ogrodzenia z drutu kolczastego
	PK_S3.komplekty.set_farmer[4].raboty[22]=20; // Hodowla krów
    PK_S3.komplekty.set_farmer[4].raboty[48]=40; // Łapanie koni
	PK_S3.komplekty.set_farmer[4].raboty[84]=40; // Budowa Rancza
	PK_S3.komplekty.set_farmer[4].raboty[44]=40; // Budowa wiatraków
    PK_S3.komplekty.set_farmer[5] = {bonus:{attributes:{flexibility:2, strength:2, dexterity:2, charisma:2}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_farmer[5].raboty[8]=10; // Zbieranie zboża
	PK_S3.komplekty.set_farmer[5].raboty[12]=10; // Koszenie pastwiska
	PK_S3.komplekty.set_farmer[5].raboty[13]=10; // Mielenie zboża
    PK_S3.komplekty.set_farmer[5].raboty[88]=20; // Podkuwanie koni
	PK_S3.komplekty.set_farmer[5].raboty[30]=20; // Zakładanie ogrodzenia z drutu kolczastego
	PK_S3.komplekty.set_farmer[5].raboty[22]=20; // Hodowla krów
    PK_S3.komplekty.set_farmer[5].raboty[48]=40; // Łapanie koni
	PK_S3.komplekty.set_farmer[5].raboty[84]=40; // Budowa Rancza
	PK_S3.komplekty.set_farmer[5].raboty[44]=40; // Budowa wiatraków
    PK_S3.komplekty.set_farmer[5].raboty[95]=40; // Wykopki
    PK_S3.komplekty.set_farmer[6] = {bonus:{attributes:{flexibility:2, strength:2, dexterity:2, charisma:2}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_farmer[6].raboty[8]=10; // Zbieranie zboża
	PK_S3.komplekty.set_farmer[6].raboty[12]=10; // Koszenie pastwiska
	PK_S3.komplekty.set_farmer[6].raboty[13]=10; // Mielenie zboża
    PK_S3.komplekty.set_farmer[6].raboty[88]=20; // Podkuwanie koni
	PK_S3.komplekty.set_farmer[6].raboty[30]=20; // Zakładanie ogrodzenia z drutu kolczastego
	PK_S3.komplekty.set_farmer[6].raboty[22]=20; // Hodowla krów
    PK_S3.komplekty.set_farmer[6].raboty[48]=40; // Łapanie koni
	PK_S3.komplekty.set_farmer[6].raboty[84]=40; // Budowa Rancza
	PK_S3.komplekty.set_farmer[6].raboty[44]=40; // Budowa wiatraków
    PK_S3.komplekty.set_farmer[6].raboty[95]=40; // Wykopki
    PK_S3.komplekty.set_farmer[6].raboty[110]=40; // Transport koni
    PK_S3.komplekty.set_farmer[7] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_farmer[8] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_farmer[9] = {bonus:{attributes:{}, skills:{}}, raboty:[]};

    PK_S3.komplekty.set_indian=[];
    PK_S3.komplekty.set_indian[1] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_indian[2] = {bonus:{attributes:{flexibility:2}, skills:{hide:8}}, speed:(1 / 1.15), raboty:[]};
    PK_S3.komplekty.set_indian[2].raboty[51]=30; // Polowanie na kojoty
    PK_S3.komplekty.set_indian[3] = {bonus:{attributes:{flexibility:5}, skills:{hide:8, swim:8}}, speed:(1 / 1.3), raboty:[]};
    PK_S3.komplekty.set_indian[3].raboty[51]=30; // Polowanie na kojoty
	PK_S3.komplekty.set_indian[3].raboty[52]=40; // Polowanie na bizony
    PK_S3.komplekty.set_indian[4] = {bonus:{attributes:{flexibility:8}, skills:{hide:8, swim:8, pitfall:8}}, speed:(1 / 1.45), raboty:[]};
    PK_S3.komplekty.set_indian[4].raboty[51]=30; // Polowanie na kojoty
	PK_S3.komplekty.set_indian[4].raboty[52]=40; // Polowanie na bizony
	PK_S3.komplekty.set_indian[4].raboty[58]=50; // Polowanie na wilki
    PK_S3.komplekty.set_indian[5] = {bonus:{attributes:{flexibility:12}, skills:{hide:8, swim:8, pitfall:8, animal:8}}, speed:(1 / 1.6), raboty:[]};
    PK_S3.komplekty.set_indian[5].raboty[51]=30; // Polowanie na kojoty
	PK_S3.komplekty.set_indian[5].raboty[52]=40; // Polowanie na bizony
	PK_S3.komplekty.set_indian[5].raboty[58]=50; // Polowanie na wilki
	PK_S3.komplekty.set_indian[5].raboty[66]=60; // Polowanie na grizzly
    PK_S3.komplekty.set_indian[6] = {bonus:{attributes:{flexibility:16}, skills:{hide:8, swim:8, pitfall:8, animal:8, shot:8}}, speed:(1 / 1.75), raboty:[]};
    PK_S3.komplekty.set_indian[6].raboty[51]=30; // Polowanie na kojoty
	PK_S3.komplekty.set_indian[6].raboty[52]=40; // Polowanie na bizony
	PK_S3.komplekty.set_indian[6].raboty[58]=50; // Polowanie na wilki
	PK_S3.komplekty.set_indian[6].raboty[66]=60; // Polowanie na grizzly
	PK_S3.komplekty.set_indian[6].raboty[114]=70; // Polowanie na pumy
    PK_S3.komplekty.set_indian[7] = {bonus:{attributes:{flexibility:21}, skills:{tough:8, hide:8, swim:8, pitfall:8, animal:8, shot:8}}, speed:(1 / 1.9), raboty:[]};
    for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.set_indian[7].raboty[i]=25};PK_S3.komplekty.set_indian[7].raboty[PK_S3.raboty.build]=25; // wszystkie prace
    PK_S3.komplekty.set_indian[7].raboty[51]+=30; // Polowanie na kojoty
	PK_S3.komplekty.set_indian[7].raboty[52]+=40; // Polowanie na bizony
	PK_S3.komplekty.set_indian[7].raboty[58]+=50; // Polowanie na wilki
	PK_S3.komplekty.set_indian[7].raboty[66]+=60; // Polowanie na grizzly
	PK_S3.komplekty.set_indian[7].raboty[114]+=70; // Polowanie na pumy
    PK_S3.komplekty.set_indian[8] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_indian[9] = {bonus:{attributes:{}, skills:{}}, raboty:[]};

    PK_S3.komplekty.set_mexican=[];
    PK_S3.komplekty.set_mexican[1] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_mexican[2] = {bonus:{attributes:{strength:1}, skills:{}}, speed:(1 / 1.12), raboty:[]};
    PK_S3.komplekty.set_mexican[3] = {bonus:{attributes:{strength:2}, skills:{}}, speed:(1 / 1.24), raboty:[]};
    PK_S3.komplekty.set_mexican[3].raboty[86]=60; // Zbieranie agawy
    PK_S3.komplekty.set_mexican[4] = {bonus:{attributes:{strength:4}, skills:{}}, speed:(1 / 1.36), raboty:[]};
    PK_S3.komplekty.set_mexican[4].raboty[86]=60; // Zbieranie agawy
	PK_S3.komplekty.set_mexican[4].raboty[67]=70; // Wydobycie ropy
    PK_S3.komplekty.set_mexican[5] = {bonus:{attributes:{strength:6}, skills:{}}, speed:(1 / 1.48), raboty:[]};
    PK_S3.komplekty.set_mexican[5].raboty[86]=60; // Zbieranie agawy
	PK_S3.komplekty.set_mexican[5].raboty[67]=70; // Wydobycie ropy
	PK_S3.komplekty.set_mexican[5].raboty[83]=80; // Przemyt
    PK_S3.komplekty.set_mexican[6] = {bonus:{attributes:{strength:9}, skills:{}}, speed:(1 / 1.6), raboty:[]};
    PK_S3.komplekty.set_mexican[6].raboty[86]=60; // Zbieranie agawy
	PK_S3.komplekty.set_mexican[6].raboty[67]=70; // Wydobycie ropy
	PK_S3.komplekty.set_mexican[6].raboty[83]=80; // Przemyt
	PK_S3.komplekty.set_mexican[6].raboty[50]=90; // Transportowanie amunicji
    PK_S3.komplekty.set_mexican[7] = {bonus:{attributes:{strength:12}, skills:{}}, speed:(1 / 1.72), raboty:[]};
    PK_S3.komplekty.set_mexican[7].raboty[86]=60; // Zbieranie agawy
	PK_S3.komplekty.set_mexican[7].raboty[67]=70; // Wydobycie ropy
	PK_S3.komplekty.set_mexican[7].raboty[83]=80; // Przemyt
	PK_S3.komplekty.set_mexican[7].raboty[50]=90; // Transportowanie amunicji
	PK_S3.komplekty.set_mexican[7].raboty[116]=100; // Transport alkoholu
    PK_S3.komplekty.set_mexican[8] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_mexican[9] = {bonus:{attributes:{}, skills:{}}, raboty:[]};

    PK_S3.komplekty.set_quackery=[];
    PK_S3.komplekty.set_quackery[1] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_quackery[2] = {bonus:{attributes:{dexterity:1}, skills:{endurance:5, trade:5}}, raboty:[]};
    PK_S3.komplekty.set_quackery[2].raboty[79]=30; // Pracuj jako konował
    PK_S3.komplekty.set_quackery[3] = {bonus:{attributes:{dexterity:2}, skills:{endurance:10, trade:10}}, raboty:[]};
    PK_S3.komplekty.set_quackery[3].raboty[79]=60; // Pracuj jako konował
    PK_S3.komplekty.set_quackery[4] = {bonus:{attributes:{dexterity:4}, skills:{endurance:15, trade:15}}, raboty:[]};
    PK_S3.komplekty.set_quackery[4].raboty[79]=90; // Pracuj jako konował
    PK_S3.komplekty.set_quackery[5] = {bonus:{attributes:{dexterity:6}, skills:{endurance:20, trade:20}}, raboty:[]};
    PK_S3.komplekty.set_quackery[5].raboty[79]=120; // Pracuj jako konował
    PK_S3.komplekty.set_quackery[6] = {bonus:{attributes:{dexterity:9}, skills:{endurance:20, trade:20, reflex:18, tough:18, aim:18, shot:18}}, raboty:[]};
    PK_S3.komplekty.set_quackery[6].raboty[79]=120; // Pracuj jako konował
    PK_S3.komplekty.set_quackery[7] = {bonus:{attributes:{dexterity:12}, skills:{endurance:20, trade:20, reflex:18, tough:18, aim:18, shot:18, tactic:18, appearance:18, dodge:18}}, raboty:[]};
    PK_S3.komplekty.set_quackery[7].raboty[79]=120; // Pracuj jako konował
	PK_S3.komplekty.set_quackery[7].raboty[113]=50; // Oszust matrymonialny
    PK_S3.komplekty.set_quackery[8] = {bonus:{attributes:{dexterity:16}, skills:{endurance:20, trade:20, reflex:18, tough:18, aim:18, shot:18, tactic:18, appearance:18, dodge:18}}, speed:(1 / 1.50), raboty:[]};
    PK_S3.komplekty.set_quackery[8].raboty[79]=120; // Pracuj jako konował
	PK_S3.komplekty.set_quackery[8].raboty[113]=100; // Oszust matrymonialny
    PK_S3.komplekty.set_quackery[9] = {bonus:{attributes:{}, skills:{}}, raboty:[]};

    PK_S3.komplekty.set_pilgrim_male=[];
    PK_S3.komplekty.set_pilgrim_male[1] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_pilgrim_male[2] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_pilgrim_male[2].raboty[PK_S3.raboty.build]=5; // Budowanie
    PK_S3.komplekty.set_pilgrim_male[3] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_pilgrim_male[3].raboty[PK_S3.raboty.build]=15; // Budowanie
    PK_S3.komplekty.set_pilgrim_male[4] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_pilgrim_male[4].raboty[PK_S3.raboty.build]=30; // Budowanie
    PK_S3.komplekty.set_pilgrim_male[5] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_pilgrim_male[5].raboty[PK_S3.raboty.build]=50; // Budowanie
	PK_S3.komplekty.set_pilgrim_male[5].raboty[62]=150; // Misjonarze
    PK_S3.komplekty.set_pilgrim_male[6] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_pilgrim_male[6].raboty[PK_S3.raboty.build]=75; // Budowanie
	PK_S3.komplekty.set_pilgrim_male[6].raboty[62]=150; // Misjonarze
	PK_S3.komplekty.set_pilgrim_male[6].raboty[119]=175; // Budowa domu misyjnego
    PK_S3.komplekty.set_pilgrim_male[7] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_pilgrim_male[8] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_pilgrim_male[9] = {bonus:{attributes:{}, skills:{}}, raboty:[]};

    PK_S3.komplekty.set_pilgrim_female=[];
    PK_S3.komplekty.set_pilgrim_female[1] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_pilgrim_female[2] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_pilgrim_female[2].raboty[PK_S3.raboty.build]=5; // Budowanie
    PK_S3.komplekty.set_pilgrim_female[3] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_pilgrim_female[3].raboty[PK_S3.raboty.build]=15; // Budowanie
    PK_S3.komplekty.set_pilgrim_female[4] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_pilgrim_female[4].raboty[PK_S3.raboty.build]=30; // Budowanie
    PK_S3.komplekty.set_pilgrim_female[5] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_pilgrim_female[5].raboty[PK_S3.raboty.build]=50; // Budowanie
	PK_S3.komplekty.set_pilgrim_female[5].raboty[62]=150; // Misjonarze
    PK_S3.komplekty.set_pilgrim_female[6] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_pilgrim_female[6].raboty[PK_S3.raboty.build]=75; // Budowanie
	PK_S3.komplekty.set_pilgrim_female[6].raboty[62]=150; // Misjonarze
	PK_S3.komplekty.set_pilgrim_female[6].raboty[119]=175; // Budowa domu misyjnego
    PK_S3.komplekty.set_pilgrim_female[7] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_pilgrim_female[8] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_pilgrim_female[9] = {bonus:{attributes:{}, skills:{}}, raboty:[]};

    PK_S3.komplekty.set_gentleman=[];
    PK_S3.komplekty.set_gentleman[1] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_gentleman[2] = {bonus:{attributes:{charisma:1}, skills:{appearance:8}}, raboty:[]};
    for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.set_gentleman[2].raboty[i]=5};PK_S3.komplekty.set_gentleman[2].raboty[PK_S3.raboty.build]=5; // wszystkie prace
    PK_S3.komplekty.set_gentleman[3] = {bonus:{attributes:{charisma:3}, skills:{appearance:8, leadership:8}}, raboty:[]};
    for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.set_gentleman[3].raboty[i]=15};PK_S3.komplekty.set_gentleman[3].raboty[PK_S3.raboty.build]=15; // wszystkie prace
    PK_S3.komplekty.set_gentleman[4] = {bonus:{attributes:{charisma:6}, skills:{appearance:8, leadership:8, trade:8}}, raboty:[]};
    for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.set_gentleman[4].raboty[i]=30};PK_S3.komplekty.set_gentleman[4].raboty[PK_S3.raboty.build]=30; // wszystkie prace
    PK_S3.komplekty.set_gentleman[5] = {bonus:{attributes:{charisma:10}, skills:{appearance:16, leadership:8, trade:8}}, raboty:[]};
    for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.set_gentleman[5].raboty[i]=50};PK_S3.komplekty.set_gentleman[5].raboty[PK_S3.raboty.build]=50; // wszystkie prace
    PK_S3.komplekty.set_gentleman[6] = {bonus:{attributes:{charisma:15}, skills:{appearance:25, leadership:8, trade:8}}, raboty:[]};
    for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.set_gentleman[6].raboty[i]=75};PK_S3.komplekty.set_gentleman[6].raboty[PK_S3.raboty.build]=75; // wszystkie prace
    PK_S3.komplekty.set_gentleman[7] = {bonus:{attributes:{charisma:20}, skills:{appearance:25, leadership:8, trade:20}}, raboty:[]};
    for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.set_gentleman[7].raboty[i]=100};PK_S3.komplekty.set_gentleman[7].raboty[PK_S3.raboty.build]=100; // wszystkie prace
    PK_S3.komplekty.set_gentleman[8] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_gentleman[9] = {bonus:{attributes:{}, skills:{}}, raboty:[]};

    PK_S3.komplekty.set_dancer=[];
    PK_S3.komplekty.set_dancer[1] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_dancer[2] = {bonus:{attributes:{charisma:2}, skills:{appearance:10}}, raboty:[]};
    for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.set_dancer[2].raboty[i]=5};PK_S3.komplekty.set_dancer[2].raboty[PK_S3.raboty.build]=5; // wszystkie prace
    PK_S3.komplekty.set_dancer[3] = {bonus:{attributes:{charisma:5}, skills:{appearance:10, animal:10}}, raboty:[]};
    for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.set_dancer[3].raboty[i]=15};PK_S3.komplekty.set_dancer[3].raboty[PK_S3.raboty.build]=15; // wszystkie prace
    PK_S3.komplekty.set_dancer[4] = {bonus:{attributes:{charisma:9}, skills:{appearance:10, animal:10, finger_dexterity:12}}, raboty:[]};
    for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.set_dancer[4].raboty[i]=30};PK_S3.komplekty.set_dancer[4].raboty[PK_S3.raboty.build]=30; // wszystkie prace
    PK_S3.komplekty.set_dancer[5] = {bonus:{attributes:{charisma:11},skills:{endurance :6, appearance:16, animal:10, finger_dexterity:12}}, raboty:[]};
    for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.set_dancer[5].raboty[i]=50};PK_S3.komplekty.set_dancer[5].raboty[PK_S3.raboty.build]=50; // wszystkie prace
    PK_S3.komplekty.set_dancer[6] = {bonus:{attributes:{charisma:15},skills:{endurance :6, appearance:25, animal:10, finger_dexterity:12}}, raboty:[]};
    for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.set_dancer[6].raboty[i]=75};PK_S3.komplekty.set_dancer[6].raboty[PK_S3.raboty.build]=75; // wszystkie prace
    PK_S3.komplekty.set_dancer[7] = {bonus:{attributes:{charisma:20},skills:{endurance :18, appearance:25, animal:10, finger_dexterity:12}}, raboty:[]};
    for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.set_dancer[7].raboty[i]=100};PK_S3.komplekty.set_dancer[7].raboty[PK_S3.raboty.build]=100; // wszystkie prace
    PK_S3.komplekty.set_dancer[8] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_dancer[9] = {bonus:{attributes:{}, skills:{}}, raboty:[]};

    PK_S3.komplekty.fireworker_set=[];
    PK_S3.komplekty.fireworker_set[1] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.fireworker_set[1].raboty[90]=15; // Gaszenie pożaru
    PK_S3.komplekty.fireworker_set[2] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.fireworker_set[3] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.fireworker_set[4] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.fireworker_set[5] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.fireworker_set[6] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.fireworker_set[7] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.fireworker_set[8] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.fireworker_set[9] = {bonus:{attributes:{}, skills:{}}, raboty:[]};

    PK_S3.komplekty.gold_set=[];
    PK_S3.komplekty.gold_set[1] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.gold_set[2] = {bonus:{attributes:{}, skills:{health:10}}, speed:(1 / 1.2), raboty:[]};
    for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.gold_set[2].raboty[i]=25};PK_S3.komplekty.gold_set[2].raboty[PK_S3.raboty.build]=25; // wszystkie prace
    PK_S3.komplekty.gold_set[3] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.gold_set[4] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.gold_set[5] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.gold_set[6] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.gold_set[7] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.gold_set[8] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.gold_set[9] = {bonus:{attributes:{}, skills:{}}, raboty:[]};

    PK_S3.komplekty.greenhorn_set=[];
    PK_S3.komplekty.greenhorn_set[1] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.greenhorn_set[2] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.greenhorn_set[2].raboty[6]=10; // Zrywanie trzciny cukrowej
    PK_S3.komplekty.greenhorn_set[3] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.greenhorn_set[3].raboty[6]=10; // Zrywanie trzciny cukrowej
	PK_S3.komplekty.greenhorn_set[3].raboty[27]=40; // Wycinka drzew
    PK_S3.komplekty.greenhorn_set[4] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.greenhorn_set[4].raboty[6]=10; // Zrywanie trzciny cukrowej
	PK_S3.komplekty.greenhorn_set[4].raboty[27]=40; // Wycinka drzew
	PK_S3.komplekty.greenhorn_set[4].raboty[17]=25; // Garbowanie
    PK_S3.komplekty.greenhorn_set[5] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.greenhorn_set[5].raboty[6]=10; // Zrywanie trzciny cukrowej
	PK_S3.komplekty.greenhorn_set[5].raboty[27]=40; // Wycinka drzew
	PK_S3.komplekty.greenhorn_set[5].raboty[17]=25; // Garbowanie
	PK_S3.komplekty.greenhorn_set[5].raboty[20]=20; // Polowanie na indyki
    PK_S3.komplekty.greenhorn_set[6] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.greenhorn_set[6].raboty[6]=10; // Zrywanie trzciny cukrowej
	PK_S3.komplekty.greenhorn_set[6].raboty[27]=40; // Wycinka drzew
	PK_S3.komplekty.greenhorn_set[6].raboty[17]=25; // Garbowanie
	PK_S3.komplekty.greenhorn_set[6].raboty[20]=20; // Polowanie na indyki
	PK_S3.komplekty.greenhorn_set[6].raboty[22]=30; // Hodowla krów
    PK_S3.komplekty.greenhorn_set[7] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
	for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.greenhorn_set[7].raboty[i]=10};PK_S3.komplekty.greenhorn_set[7].raboty[PK_S3.raboty.build]=10; // wszystkie prace
    PK_S3.komplekty.greenhorn_set[7].raboty[6]+=10; // Zrywanie trzciny cukrowej
	PK_S3.komplekty.greenhorn_set[7].raboty[27]+=40; // Wycinka drzew
	PK_S3.komplekty.greenhorn_set[7].raboty[17]+=25; // Garbowanie
	PK_S3.komplekty.greenhorn_set[7].raboty[20]+=20; // Polowanie na indyki
	PK_S3.komplekty.greenhorn_set[7].raboty[22]+=30; // Hodowla krów
    PK_S3.komplekty.greenhorn_set[8] = {bonus:{attributes:{strength:1, charisma:1}, skills:{}}, speed:(1 / 1.2), raboty:[]};
	for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.greenhorn_set[8].raboty[i]=50};PK_S3.komplekty.greenhorn_set[8].raboty[PK_S3.raboty.build]=50; // wszystkie prace
    PK_S3.komplekty.greenhorn_set[8].raboty[6]+=10; // Zrywanie trzciny cukrowej
	PK_S3.komplekty.greenhorn_set[8].raboty[27]+=40; // Wycinka drzew
	PK_S3.komplekty.greenhorn_set[8].raboty[17]+=25; // Garbowanie
	PK_S3.komplekty.greenhorn_set[8].raboty[20]+=20; // Polowanie na indyki
	PK_S3.komplekty.greenhorn_set[8].raboty[22]+=30; // Hodowla krów
    PK_S3.komplekty.greenhorn_set[9] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
 
    PK_S3.komplekty.set_sleeper = [];
    PK_S3.komplekty.set_sleeper[1] = {regeneration: 1.0, bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_sleeper[2] = {regeneration: 1.06, bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_sleeper[3] = {regeneration: 1.08, bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_sleeper[4] = {regeneration: 1.12, bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_sleeper[5] = {regeneration: 1.18, bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_sleeper[6] = {regeneration: 1.25, bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_sleeper[7] = {regeneration: 0, bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_sleeper[8] = {regeneration: 0, bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_sleeper[9] = {regeneration: 0, bonus:{attributes:{}, skills:{}}, raboty:[]};
    
    PK_S3.komplekty.collector_set = [];
    PK_S3.komplekty.collector_set[1] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.collector_set[2] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.collector_set[3] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.collector_set[4] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.collector_set[5] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.collector_set[6] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.collector_set[7] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.collector_set[8] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.collector_set[9] = {regeneration: 1.20, bonus:{attributes:{}, skills:{}}, speed:(1 / 1.5), raboty:[]};
	for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.collector_set[9].raboty[i]=15};PK_S3.komplekty.collector_set[9].raboty[PK_S3.raboty.build]=15; // wszystkie prace
    
    PK_S3.komplekty.season_set = [];  
    PK_S3.komplekty.season_set[1] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.season_set[2] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.season_set[3] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.season_set[4] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.season_set[5] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.season_set[6] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.season_set[7] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.season_set[8] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.season_set[9] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    
    PK_S3.komplekty.bunny_set = [];  
    PK_S3.komplekty.bunny_set[1] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.bunny_set[2] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.bunny_set[3] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.bunny_set[4] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.bunny_set[5] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.bunny_set[6] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.bunny_set[7] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.bunny_set[8] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.bunny_set[9] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    
    PK_S3.komplekty.wooden_magician_set = [];  
    PK_S3.komplekty.wooden_magician_set[1] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.wooden_magician_set[2] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.wooden_magician_set[3] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.wooden_magician_set[4] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.wooden_magician_set[5] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.wooden_magician_set[6] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
	PK_S3.komplekty.wooden_magician_set[6].raboty[27]+=1; // Wycinka drzew
    PK_S3.komplekty.wooden_magician_set[7] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.wooden_magician_set[8] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.wooden_magician_set[9] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    
    PK_S3.my_name_is();
/*    
    var al='';
    var it = [];
    var hou = 4 * 6;
    for (var i = 0; i < PK_S3.raboty.max; ++i){
	if (!PK_S3.raboty[i]) continue;
	for (j in PK_S3.raboty[i].resultaty.produkty){
	    if (j==999) continue;
	    var val = PK_S3.raboty[i].resultaty.produkty[j] * hou / 100;
	    if (!it[j] || (it[j].value<val)){
		it[j] = {value:val, name:PK_S3.items[j].name};
	    }
	}
    }
    
    for (var i = 0; i < it.length; ++i){
	if (!it[i]) continue;
	al += it[i].name += '\t' + it[i].value + '\n';
    }
    alert (al);
 */

    PK_S3.setJSHTML = AjaxWindow.setJSHTML;
    AjaxWindow.setJSHTML = function(div,content) {
	PK_S3.setJSHTML(div,content);
	if (div&&(div.id.indexOf('window_job')!=-1)){
	    var tmp = document.createElement('div');
	    tmp.innerHTML = content;
	    var h2 = tmp.getElementsByTagName('h2')[0];
	    var name = h2.textContent;
	    var jd = div.getElementsByClassName('jobDetails');
	    if (jd) jd = jd[0];
	    if (!jd) return;
	    var divb = new Element ('div', {'style':'text-align:center; margin: -15px 0px 0px;'});
	    var span = document.createElement('span');
	    var html = '<a class="button_wrap button" style="padding: 0px 5px;" href="#" onClick="PK_S3.equip_motivation(\''+name+'\')">' + '<span class="button_left"></span><span class="button_middle">Ubierz</span><span class="button_right"></span></a>';
	    span.innerHTML = html;
	    for (var i = 0; i < PK_S3.cookies.save.length; ++i){
		if (PK_S3.cookies.save[i].name == name){
		    divb.appendChild(span);
		    break;
		}
	    }
	    var span = document.createElement('span');
	    var html = '<a class="button_wrap button" style="padding: 0px 5px;"  href="#" onClick="PK_S3.four_init(\''+name+'\')">' + '<span class="button_left"></span><span class="button_middle">Oblicz</span><span class="button_right"></span></a>';
	    span.innerHTML = html;
	    divb.appendChild(span);
	    jd.appendChild(divb);
	}
    }
    
     
    if (Wear && Wear.open){
	PK_S3.wear_open = Wear.open;
	Wear.open = function (){
	    PK_S3.wear_open();
	    setTimeout(PK_S3.spam_bagazh,PK_S3.odevalo4ka.wait_inventory);
	}
    }

};

PK_S3.fort_bonus = function (value){
    return isNaN(value) ? .5 : .5 + Math.pow(value, .4);
}

PK_S3.apply_fort_bonus_lead = function (bonus){
    var value = bonus - .5;
    value = Math.pow(value, 2.5);
    value *= PK_S3.bonus.leader;
    return PK_S3.fort_bonus(value);
}

PK_S3.qsort = function(arr, li, ri, key){
    if ((li+1)>=ri) return;
    var tmp;
    if (ri-li<15){
	for (var ii=li+1;ii<ri;++ii){
	    var tmp = arr[ii];
	    jj=ii-1;
	    while((jj>=li)&&(arr[jj][key]>tmp[key])){
		arr[jj+1]=arr[jj];
		--jj;
	    }
	    arr[jj+1]=tmp;
	}
    }
    else{
	var mi=parseInt((li+ri)/2,10);
	if (arr[li][key]>arr[ri-1][key]){
	    tmp=arr[li];
	    arr[li]=arr[ri-1];
	    arr[ri-1]=tmp;
	}
	if (arr[li][key]>arr[mi][key]){
	    tmp=arr[li];
	    arr[li]=arr[mi];
	    arr[mi]=tmp;
	}
	if (arr[mi][key]>arr[ri-1][key]){
	    tmp=arr[mi];
	    arr[mi]=arr[ri-1];
	    arr[ri-1]=tmp;
	}
	var em=arr[mi][key];
	var cl=li;
	var cr=ri-1;
	while(cl<cr){
	    while((cl<ri)&&(arr[cl][key]<=em)) ++cl;
	    while((cr>li)&&(arr[cr][key]>=em)) --cr;
	    if (cl<cr){
		tmp=arr[cl];
		arr[cl]=arr[cr];
		arr[cr]=tmp;
	    }
	}
	if (cr < ri -1){
	    PK_S3.qsort(arr,li,cr+1,key);
	}
	PK_S3.qsort(arr,cl,ri,key);
    }
};

PK_S3.bsort = function (arr, key){
    var left = 0;
    var right = arr.length - 1;
    var last = 0;
    while (left < right){
	for (var i = left; i < right; ++i){
	    if (arr[i][key] > arr[i+1][key]){
		var tmp = arr[i];
		arr[i] = arr[i+1];
		arr[i+1]=tmp;
		last = i;
	    }
	}
	right = last;
	for (var i = right; i > left; --i){
	    if (arr[i][key] < arr[i-1][key]){
		var tmp = arr[i];
		arr[i] = arr[i-1];
		arr[i-1]=tmp;
		last = i;
	    }
	}
	left = last;
    }
}

PK_S3.input_select_rdf = function(){
    var sl;
    var i1 = j1 = 4;
    var str_id = 'pk_s3_select_rab'
    for (var i = 0; i < 4; ++i){
	for (var j = 0; j < 3; ++j){
	    sl = document.getElementById(str_id+'_'+'rdfo'[i]+'onv'[j]);
	    if (sl.checked){
		i1 = i; j1 = j;
		break;
	    }
	}
    }
    sl = document.getElementById(str_id);
    sl.innerHTML = '';
    var ind_beg;
    var ind_end
    if (i1 == 0){
	ind_beg = 1; ind_end = PK_S3.raboty.fort_min;
    }
    else if (i1 == 1){
	ind_beg = PK_S3.raboty.duel_min; ind_end = PK_S3.raboty.duel_max;
    }
    else if (i1 == 2){
	ind_beg = PK_S3.raboty.fort_min; ind_end = PK_S3.raboty.fort_max;
    }
    else{
	ind_beg = ind_end = 0; j1 = 0;
    }
    if (j1 == 2) {
	ind_beg = ind_end = 0;
    }
    var srab = [];
    srab[0]={id:0, name:'Wybierz pracę, pojedynki, forty'};
    var opt = document.createElement('option');
    opt.value = 0;
    var txt = '';
    if ((i1 == 3)){
	txt = 'Wybierz z listy';
    }
    else if (j1 == 2){
	txt = 'Wybierz wszystkie ';
	if (i1 == 0){
	    txt += 'prace';
	}
	else if (i1 == 1){
	    txt += 'pojedynki';
	}
	else if (i1 == 2){
	    txt += 'forty'
	}
    }
    else if (i1 == 4){
	txt = 'Wybierz umiejętności z konstruktora';
    }
    else{
	txt = 'Wybierz ';
	if (i1 == 0) txt += 'pracę';
	if (i1 == 1) txt += ' rodzaj pojedynku';
	if (i1 == 2) txt += ' rodzaj fortu';
    }
    opt.textContent = txt;
    opt.disabled = true;
    opt.selected = true;
    sl.appendChild(opt);

    if ((j1 == 0)||(j1 == 2)||(i1 == 3)){
	sl.size = 1;
	sl.multiple = null;
	sl.style.height = '25px';
    }
    else{
	sl.size = 5;
	sl.multiple = true;
	sl.style.height = '125px';
    }
    
    j = 1;
    for (var i = ind_beg; i < ind_end; ++i){
	if (PK_S3.raboty[i]&&(!PK_S3.raboty[i].except)){
	    srab[j]={id:i, name:PK_S3.raboty[i].rus_name};
	    ++j;
	}
    }
    PK_S3.qsort(srab, 1, j, 'name');
    for (var i = 1; i < j; ++i){
	var opt = document.createElement('option');
	opt.value = srab[i].id;
	opt.textContent = srab[i].name;
	sl.appendChild(opt);
    }
 
    var elem = document.getElementById('pk_s3_select_konstr_en');
    if (elem){
	for (var i=0;i<20;++i){
	    var el = document.getElementById('pk_s3_select_konstr_s'+i);
	    if (elem.checked) {el.disabled=false}
	    else {el.value = null;el.disabled=true;}
	}
	for (var i=0;i<4;++i){
	    var el = document.getElementById('pk_s3_select_konstr_a'+i);
	    if (elem.checked) {el.disabled=false}
	    else {el.value = null;el.disabled=true;}
	}
    }
}

PK_S3.running_bar = function(){
    var progress = $('pk_s3_progress_bar');
    if (progress){
	progress.setAttribute ('value', PK_S3.progress.percent);
	if (++PK_S3.progress.percent > 100) PK_S3.progress.percent = 0;
    }
    else{
	clearInterval(PK_S3.progress.id);
    }
}

PK_S3.minimize_window_settings = function(){
    AjaxWindow.toggleSize('pereodevalka_setting');
    setTimeout(PK_S3.minimize_window_settings2, 100);
}

PK_S3.minimize_window_settings2 = function(){
    var bar = $('window_bar_pereodevalka_setting');
    if (!bar){
        setTimeout(PK_S3.minimize_window_settings2, 100);
	return;
    }
    bar.firstChild.firstChild.nextSibling.innerHTML='Przybornik';
}

PK_S3.show_window_settings = function(init){
    var name = 'pereodevalka_setting';
    //var group = 'inventory';
    var group = 'inventory_new';
    var window_div = $('window_' + name);
    
    if (!window_div){
	window_div = new Element('div',{'id':'window_' + name,'class':'window css_inventory'});
	AjaxWindow.windows[name] = window_div;
	window_div.injectInside('windows');
	window_div.centerLeft();
    }
    else{
	AjaxWindow.maximize (name);
	if (init){
	    window_div.innerHTML = '';
	}
	else{
	    return;
	}
    }
    AjaxWindow.bringToTop(window_div);

    var xhtml = '';
    xhtml += '<div class="window_borders">';
    xhtml += '  <h2 id="window_' + name + '_title" class="window_title"> </h2>';
    xhtml += '	<a class="window_refresh" href="javascript:PK_S3.show_window_settings(true);void(0)" title="<b>Odśwież okno</b>"></a>'
    xhtml += '  <a href="javascript:AjaxWindow.closeAll();" class="window_closeall" title="<b>Zamknij wszystkie okna</b>"></a>';
    //xhtml += '  <a href="javascript:AjaxWindow.toggleSize(\'' + name + '\', \'' + group + '\');" class="window_minimize" title="<b>Minimalizuj okno</b>"></a>';
    xhtml += '  <a href="javascript:PK_S3.minimize_window_settings();" class="window_minimize" title="<b>Minimalizuj okno</b>"></a>';
    xhtml += '  <a href="javascript:AjaxWindow.close(\'' + name + '\');" class="window_close" title="<b>Zamknij okno</b>"></a>';
    xhtml += '  <div id="window_' + name + '_content" class="window_content">';
    xhtml += '    	<table class="shadow_table" style="margin-left:6px; width:100%; height:390px">';
    xhtml += '    		<tr>';
    xhtml += '    			<td class="edge_shadow_top_left"></td>';
    xhtml += '    			<td class="border_shadow_top"></td>';
    xhtml += '    			<td class="edge_shadow_top_right"></td>';
    xhtml += '    		</tr>';
    xhtml += '    		<tr>';
    xhtml += '    			<td class="border_shadow_left"></td>';
    xhtml += '    			<td class="shadow_content">';
    xhtml += '    				<div style="overflow:none; width: 675px; height:390px; position: relative;" id="pk_s3_settings">';
    xhtml += '    				</div>';
    xhtml += '    			</td>';
    xhtml += '    			<td class="border_shadow_right"></td>';
    xhtml += '    		</tr>';
    xhtml += '    		<tr>';
    xhtml += '    			<td class="edge_shadow_bottom_left"></td>';
    xhtml += '    			<td class="border_shadow_bottom"></td>';
    xhtml += '    			<td class="edge_shadow_bottom_right"></td>';
    xhtml += '	 		</tr>';
    xhtml += '	 	</table>';
    xhtml += '	</div>';
    xhtml += '</div>';
    window_div.setHTML(xhtml);
    
    //перезагрузка, иногда не срабатывало в инит()
    PK_S3.bonus.speed = (Character.characterClass != 'duelist') ? 1.0 : (PremiumBoni.hasBonus('character')) ? 1.2 : 1.1;
    PK_S3.bonus.money = (PremiumBoni.hasBonus('money')) ? 1.5 : 1.0;
    PK_S3.bonus.drop = (Character.characterClass != 'adventurer') ? 1.0 : (PremiumBoni.hasBonus('character')) ? 1.2 : 1.1;
    PK_S3.bonus.life = (Character.characterClass != 'soldier') ? 10 : (PremiumBoni.hasBonus('character')) ? 20 : 15;
    PK_S3.bonus.exp = (Character.characterClass) != 'worker' ? 1.0 : (PremiumBoni.hasBonus('character')) ? 1.1 : 1.05;
    PK_S3.bonus.build = (Character.characterClass) != 'worker' ? 1.0 : (PremiumBoni.hasBonus('character')) ? 1.1 : 1.05;
    PK_S3.bonus.weapon = (Character.characterClass != 'soldier') ? 0 : (PremiumBoni.hasBonus('character')) ? 6 : 3;
    PK_S3.bonus.leader = (Character.characterClass != 'soldier') ? 1.0 : (PremiumBoni.hasBonus('character')) ? 1.5 : 1.25;

	
    var window_title_div = $('window_' + name + '_title');
    window_div.makeDraggable({handle:window_title_div});
    window_title_div.addEvent('dblclick',function(){
				window_div.centerLeft();
				window_div.setStyle('top',133);
				});
    window_div.addEvent('mousedown',AjaxWindow.bringToTop.bind(AjaxWindow,[window_div]));
    window_title_div.addEvent('mousedown',AjaxWindow.bringToTop.bind(AjaxWindow,[window_div]));

    var div_left = new Element('div', {'style':'margin: 0; height: 390px; width: 240px; float: left;'});
    var div_sel = new Element('div', {'style':'height: 30px; width: 240px;'});
	var div_ver = new Element('div', {'style':'height: 100px; width: 240px; color:#8C660D; text-align:center;'});
    div_ver.innerHTML = '<div style="width:100%; color:blue; z-index:1">Wersja: <strong>'+PrzVer+'</strong></div><div style="width:100%; font-size:10px; margin:5px;">'+paypal+'</div><div style="width:100%">TUTAJ JESTEM: <a href="javascript:void(0)" onclick="window.open(\''+s10_link+'\', \'świat 10\'); return false">s10</a> <a href="javascript:void(0)" onclick="window.open(\''+s13_link+'\', \'świat 13\'); return false">s13</a> <a href="javascript:void(0)" onclick="window.open(\''+w1_link+'\', \'beta 1\'); return false">b1</a> <a href="javascript:void(0)" onclick="window.open(\''+de10_link+'\', \'de 10\'); return false">de10</a></div>';

    var spis = new Element('select',{'id':'pk_s3_select_rab','size':'1','style':'background-color:#e8dab3; font-size: 12px; margin: 5px 1px 5px 5px; width:235px; height:25px; position:relative;'});
    spis.multiple = null;
    div_sel.appendChild(spis);
    div_left.appendChild(div_sel);
    div_left.appendChild(div_ver);
    
    var div_zakup = new Element('div', {'style':'height: 175px; width: 240px; border-bottom: 1px solid #321; border-right: 1px solid #321;'});
    var div_zakup_zag = new Element ('div', {'style':'clear: both; font-weight:bold; text-align:center;', 'title':'Dlaczego masz się ograniczać tylko do swojego ekwipunku? Lepiej poszukać przedmioty, które mogą nam bardzo w tym pomoć!'});
    div_zakup_zag.textContent = 'Brakujące przedmioty:';
    div_zakup.appendChild(div_zakup_zag);
    
    var div = new Element ('div', {'title':'Podaj kwotę którą chcesz przeznaczyć na zakupy. :)'});
    var img = new Element('span', {'style':'width:23px; height:23px; background-image:url(http://www.the-west.pl/images/job/danger.png); float:left; margin: 2px 5px 2px 5px;', 'title':'UWAGA! Może spowolnić wyszukiwanie.'});
    div.appendChild(img);
    var inp = new Element ('input', {'id':'pk_s3_select_baks_n', 'type':'text', 'size':'6', 'value':'0','style':'background-color:#e8dab3; margin: 2px 5px 2px 0px;'});
    inp.addEventListener('change',function () {this.value = parseInt(this.value); if (isNaN(this.value)) this.value=0; if (this.value < 0) this.value=0;}, false);
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = '$ Wydasz na zakupy';
    div.appendChild(span);
    div_zakup.appendChild(div);

    var div = new Element ('div', {'title':'Obrabowałeś bank.<br />Cena nie jest ważna!', 'style':'width:100%;'});
    var inp = new Element ('input', {'id':'pk_s3_select_baks_inf', 'type':'checkbox', 'style':'margin: 3px 5px 3px 0px;'});
    inp.addEventListener('change', function () {var bks = $('pk_s3_select_baks_n'); if (this.checked) { bks.value = 0; bks.disabled=true;} else {bks.disabled=false;} }, false);
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Milioner';
    div.appendChild(span);
    div_zakup.appendChild(div);

    var div = new Element ('div', {'title':'Zakup ekwipunku w sklepach i na targu. Cena podawana jest wdług cen zakupu, nie uwzględnia cen na targu.<br />Należy podać kwotę którą chcemy przeznaczyć na zakupy lub zaznaczyć opcję Milioner.'});
    var inp = new Element ('input', {'id':'pk_s3_select_auction', 'type':'checkbox', 'style':'margin: 3px 5px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Targ';
    div.appendChild(span);
    div_zakup.appendChild(div);

/*
    var div = new Element ('div', {'title':'Brane są wszystkie przedmioty.<br />Proszę podać cenę lub pozostawić 0 (cena nie gra roli :) ).'});
    var inp = new Element ('input', {'id':'pk_s3_select_drop', 'type':'checkbox', 'style':'margin: 3px 5px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Najlepszy ekwipunek';
    div.appendChild(span);
    div_zakup.appendChild(div);
*/
    var div = new Element ('div', {'title':'Unikalne przedmioty z zadań. Koszt zakupu jest zerowy.'});
    var inp = new Element ('input', {'id':'pk_s3_select_unique', 'type':'checkbox', 'style':'margin: 3px 5px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Unikaty';
    div.appendChild(span);
    div_zakup.appendChild(div);

    var div = new Element ('div', {'title':'Ubieranie z maksymalnym szczęsciem.<br />Unikalne przedmioty ze skrzyń, unikalne dropy. Koszt 0,<br />niektóre możesz kupić tylko na targu.'});
    var inp = new Element ('input', {'id':'pk_s3_select_season', 'type':'checkbox', 'style':'margin: 5px 5px 5px 5px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Szczęscie';
    div.appendChild(span);
    div_zakup.appendChild(div);

//    div_left.appendChild(div_zakup);    

    var div = new Element('div', {'title':'Oblicz dla postaci o określonym poziomie.'});
    var inp = new Element ('input', {'id':'pk_s3_select_level',  'type':'text', 'value':Character.level?Character.level:0, 'size':'3', 'style':'background-color:#e8dab3; margin: 3px 5px; width: 30px;'});
    inp.addEventListener('change',function () {this.value = parseInt(this.value); if (isNaN(this.value)) this.value=1; if (this.value < 1) this.value=1;}, false);
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Licz dla poziomu';
    div.appendChild(span);
    div_zakup.appendChild(div);
    div_left.appendChild(div_zakup);    

//    var div_slots_zag = new Element ('div', {'style':'float:right; clear: both; font-weight:bold; text-align:center;'});
//    div_slots_zag.textContent = 'Wybierz opcje:';
//    div_left.appendChild(div_slots_zag);
    
    var div = document.createElement('div');
    div.style.borderTop = '1px solid #321';
    div.style.borderRight = '1px solid #321';
    div.style.marginTop = '10px';
    div.style.clear = 'both';
    // <span id="submit_delete_reports"><a href="#" class="button_wrap button"><span class="button_left"></span><span class="button_middle">Удалить</span><span class="button_right"></span><span style="clear: both;"></span></a></span>
    var span = document.createElement('span');
    span.id = 'pk_s3_poehali';
    span.style.margin = '10px 5px';
    var text = 'Dalej';
    span.innerHTML = '<a href="#" class="button_wrap button"><span class="button_left"></span><span class="button_middle">'+text+'</span><span class="button_right"></span><span style="clear: both;"></span></a>';
    span.addEventListener('click',PK_S3.second_init, false);
    div.appendChild (span);
    var span = document.createElement('span');
    span.id = 'pk_s3_prosto_veshi';
    span.style.margin = '10px 5px';
    var text = 'Bez zestawów';
    span.innerHTML = '<a href="#" class="button_wrap button" style="display:none;"><span class="button_left"></span><span class="button_middle">'+text+'</span><span class="button_right"></span><span style="clear: both;"></span></a>';
    span.addEventListener('click',PK_S3.second_init, false);
    div.appendChild (span);
    div_left.appendChild(div);
    
    var div = new Element('div', {'id':'pk_s3_sprogress'});
    var percent = new Element ('progress', {'id':'pk_s3_progress_bar', 'style':'margin: 5px; width:208px', 'max':100, 'value':1});
    div.appendChild(percent);
    div_left.appendChild(div);

    var div_top = new Element('div', {'style':'margin: 0; height: 390px; width:425px; float: left;'});
    var div_right = new Element('div',{'style':'clear:left; margin:0; padding:0, border:0'})

    var form_sel = document.createElement('form');
    form_sel.id = 'pk_s3_form_select';
    
    var div_sel_rab = new Element ('div', {'style':'height: 80px; width: 140px; float:left;  margin: 5px 0px;'});
    var div_sel_rab_zag = new Element ('div', {'style':'clear: both; font-weight:bold; text-align:center;'});
    div_sel_rab_zag.textContent = 'Prace:';
    div_sel_rab.appendChild(div_sel_rab_zag);

    var div = document.createElement('div');
    var inp = new Element ('input', {'id':'pk_s3_select_rab_ro', 'name':'pk_s3_raboty_radio', 'type':'radio', 'checked':'true', 'style':'margin: 2px 2px 2px 15px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Jedna';
    div.appendChild(span);
    div_sel_rab.appendChild(div);
    
    var div = document.createElement('div');
    var inp = new Element ('input', {'id':'pk_s3_select_rab_rn', 'name':'pk_s3_raboty_radio','type':'radio', 'style':'margin: 2px 2px 2px 15px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Wybrane';
    div.appendChild(span);
    div_sel_rab.appendChild(div);

    var div = document.createElement('div');
    var inp = new Element ('input', {'id':'pk_s3_select_rab_rv', 'name':'pk_s3_raboty_radio','type':'radio', 'style':'margin: 2px 2px 2px 15px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Wszystkie';
    div.appendChild(span);
    div_sel_rab.appendChild(div);

    form_sel.appendChild(div_sel_rab);

    var div_sel_duel = new Element ('div', {'style':'height: 80px; width: 140px;  margin: 5px 0px; float:left;'});
    var div_sel_duel_zag = new Element ('div', {'style':'clear: both; font-weight:bold; text-align:center;'});
    div_sel_duel_zag.textContent = 'Pojedynki:';
    div_sel_duel.appendChild(div_sel_duel_zag);

    var div = document.createElement('div');
    var inp = new Element ('input', {'id':'pk_s3_select_rab_do', 'name':'pk_s3_raboty_radio', 'type':'radio', 'style':'margin: 2px 2px 2px 5px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Jeden';
    div.appendChild(span);
    div_sel_duel.appendChild(div);
    
    var div = document.createElement('div');
    var inp = new Element ('input', {'id':'pk_s3_select_rab_dn', 'name':'pk_s3_raboty_radio', 'type':'radio', 'style':'margin: 2px 2px 2px 5px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Wybrane';
    div.appendChild(span);
    div_sel_duel.appendChild(div);
    
    var div = document.createElement('div');
    var inp = new Element ('input', {'id':'pk_s3_select_rab_dv', 'name':'pk_s3_raboty_radio', 'type':'radio', 'style':'margin: 2px 2px 2px 5px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Wszystkie';
    div.appendChild(span);
    div_sel_duel.appendChild(div);

    
    form_sel.appendChild(div_sel_duel);

    var div_sel_fort = new Element ('div', {'style':'height: 80px; width: 140px; margin: 5px 0px; float:left;'});
    var div_sel_fort_zag = new Element ('div', {'style':'clear: both; font-weight:bold; text-align:center;'});
    div_sel_fort_zag.textContent = 'Forty:';
    div_sel_fort.appendChild(div_sel_fort_zag);
    
    var div = document.createElement('div');
    var inp = new Element ('input', {'id':'pk_s3_select_rab_fo', 'name':'pk_s3_raboty_radio', 'type':'radio', 'style':'margin: 2px 2px 2px 5px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Jeden';
    div.appendChild(span);
    div_sel_fort.appendChild(div);
    
    var div = document.createElement('div');
    var inp = new Element ('input', {'id':'pk_s3_select_rab_fn', 'name':'pk_s3_raboty_radio', 'type':'radio', 'style':'margin: 2px 2px 2px 5px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Wybrane';
    div.appendChild(span);
    div_sel_fort.appendChild(div);
    
    var div = document.createElement('div');
    var inp = new Element ('input', {'id':'pk_s3_select_rab_fv', 'name':'pk_s3_raboty_radio', 'type':'radio', 'style':'margin: 2px 2px 2px 5px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Wszystkie';
    div.appendChild(span);
    div_sel_fort.appendChild(div);
    form_sel.appendChild(div_sel_fort);
    form_sel.appendChild(div_right);

    var div_sel_dop = new Element ('div', {'style':'height: 80px; width: 250px; padding: 1px 0px; float:left; border-bottom: 1px solid #321; border-right: 1px solid #321; border-left: 1px solid #321;'});

    var attribs = ['Siła (3+)', 'Sprawność (3+)', 'Zręczność (3+)', 'Charyzma (3+)']
    var skills = ['Budowanie', 'Siła uderzenia', 'Odporność', 'Wytrzymałość', 'Punkty życia', 'Jazda konna', 'Refleks', 'Unik', 'Chowanie się', 'Pływanie', 'Celność', 'Strzelanie', 'Zakładanie pułapek', 'Sprawność manualna', 'Naprawa', 'Dowodzenie', 'Taktyka', 'Handel', 'Obchodzenie się ze zwierzętami', 'Zaskoczenie'];
    var skills_color = ['#ff9999', '#99ff99', '#9999ff', '#ffff99'];
    var div = new Element('div', {'title':'Wszystkie prace z wybranych umiejętności. W przypadku atrybutów - trzy umiejętności w pracy.'});
    var inp = new Element ('input', {'id':'pk_s3_select_rab_oo', 'name':'pk_s3_raboty_radio', 'type':'radio', 'style':'margin: 2px 2px 2px 2px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Umiejętności ';
    div.appendChild(span);
    var sel = new Element ('select', {'id':'pk_s3_select_nav','size':'1','style':'background-color:#e8dab3; font-size: 12px; width:150px; height:25px'})
    sel.addEventListener('change', function() {var elem = document.getElementById('pk_s3_select_rab_oo');elem.checked = true;}, false);
    var opt = new Element ('option', {'value':'0', 'selected':'true', 'disabled':'true'});
    opt.textContent = 'Wybierz umiejętności (dla prac)';
    sel.appendChild(opt);
    for (var j = 0; j < 4; ++j)
    {
	var style = 'background-color: ' + skills_color[j];
	var opt = new Element ('option', {'value':100+j, 'style':style})
	opt.style.fontWeight = 'bold';
	opt.textContent = attribs[j];
	sel.appendChild(opt);
	for (var i = 0; i < 5; ++i){
	    var opt = new Element ('option', {'value':(j*5+i), 'style':style});
	    opt.textContent = skills[j*5+i];
	    sel.appendChild(opt);
	}
    }

    div.appendChild(sel);

    div_sel_dop.appendChild(div);
    
    var div = new Element('div', {'title':'Wszystkie prace, które dają wybrany produkt (niespodzianki nie są realizowane).'});
    var inp = new Element ('input', {'id':'pk_s3_select_rab_on', 'name':'pk_s3_raboty_radio', 'type':'radio', 'style':'margin: 2px 2px 2px 2px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Podukty';
    div.appendChild(span);
    var sel = new Element ('select', {'id':'pk_s3_select_product','size':'1','style':'background-color:#e8dab3; font-size: 12px; width:173px; height:25px; margin: 0 0 0 8px'})
    sel.addEventListener('change', function() {var elem = document.getElementById('pk_s3_select_rab_on');elem.checked = true;}, false);
    var opt = new Element ('option', {'value':'0', 'selected':'true', 'disabled':'true'});
    opt.textContent = 'Wybierz przedmiot';
    sel.appendChild(opt);
    var drop = [];
    for (var i = 1; i < PK_S3.raboty.max; ++i){
	if (!PK_S3.raboty[i]) continue;
	for (var j in PK_S3.raboty[i].resultaty.produkty){
	    if (isNaN(j)||(j==0)) continue;
	    drop.push({id:j, name:PK_S3.items[j].name});
	}
    }
    PK_S3.qsort(drop, 0, drop.length, 'name');
    for (var i = 1; i < drop.length; ++i){
	if (drop[i].id == drop[i-1].id){
	    drop.splice(i,1);
	    --i;
	}
    }
    for (var i = 0; i < drop.length; ++i){
	var opt = new Element ('option', {'value':drop[i].id})
	opt.textContent = drop[i].name;
	sel.appendChild(opt);
    }
    div.appendChild(sel);

    div_sel_dop.appendChild(div);
    
    var div = new Element('div', {'title':'Wyszukaj niepotrzebne przedmioty, które nie mają zastosowania w wybranych przacach/pojedynkach/fortach'});
    var inp = new Element ('input', {'id':'pk_s3_select_rab_ov', 'name':'pk_s3_raboty_radio', 'type':'radio', 'style':'margin: 5px 2px 0px 2px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Szukaj niepotrzebne eq';
    div.appendChild(span);
    div_sel_dop.appendChild(div);
    

/*
    var div = document.createElement('div');
    var inp = new Element ('input', {'id':'pk_s3_select_rab_ov', 'name':'pk_s3_raboty_radio', 'disabled':'true', 'type':'radio', 'style':'margin: 2px 2px 2px 2px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Zadanie';
    div.appendChild(span);
    var sel = new Element ('select', {'id':'pk_s3_select_quest', 'size':'1', 'disabled':'true', 'style':'background-color:#e8dab3; font-size: 12px; width:180px; height:25px; margin: 0 0 0 4px;'})
    sel.addEventListener('change', function() {var elem = document.getElementById('pk_s3_select_rab_ov');elem.checked = true;}, false);
    var opt = new Element ('option', {'value':'0', 'selected':'true', 'disabled':'true'});
    opt.textContent = 'Wybierz zadanie';
    sel.appendChild(opt);
    var opt = new Element ('option', {'value':'1'});
    opt.textContent = 'Zrób sobie dobrze :P';
    sel.appendChild(opt);
    div.appendChild(sel);
    div_sel_dop.appendChild(div);
*/    
    
    form_sel.appendChild(div_sel_dop);

    var div_sel_hp = new Element ('div', {'style':'height: 80px; padding: 3px 0px; float:left; text-align:center; width:160px;'});
    var div = new Element('div', {title:'Zostaną znalezione przedmioty <b>dla fortów</b> z życiem nie mnijszym niż określone w polu życie.'});
    var span = document.createElement('span');
    span.textContent = 'Punkty życia w forcie:';
    div.appendChild(span);
    var aprox_hp = 90 + Character.level * 10 + Character.skills.health * PK_S3.bonus.life + Math.round(Character.level * .25 * PK_S3.bonus.life);
    var inp = new Element ('input', {'id':'pk_s3_select_hp', 'type':'text', 'value':aprox_hp, 'size':'5', 'style':'background-color:#e8dab3; margin: 2px 2px 2px 5px;'});
    inp.addEventListener('change',function () {this.value = parseInt(this.value); if (isNaN(this.value)) this.value=0; if (this.value < 0) this.value=0;}, false);
    div.appendChild(inp);
    div_sel_hp.appendChild(div);
    
    var div = document.createElement('div');
    var div_zag = new Element ('div', {'style':'clear: both; font-weight:bold; text-align:right; border-top: 1px solid #321'});
    div_zag.textContent = 'Konstruktor umiejek:';
    div.appendChild(div_zag);
    var inp = new Element ('input', {'id':'pk_s3_select_konstr_en', 'type':'radio', 'name':'pk_s3_raboty_radio', 'style':'margin: 2px 7px 2px 2px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = '"Trudność:"';
    div.appendChild(span);
    var inp = new Element ('input', {'id':'pk_s3_select_konstr_to', 'type':'text', 'value':0, 'size':'3', 'style':'background-color:#e8dab3; margin: 2px 0px 2px 2px; width: 25px;'});
    inp.addEventListener('change',function () {this.value = parseInt(this.value); if (isNaN(this.value)) this.value=0; if (this.value < 0) this.value=0;}, false);
    div.appendChild(inp);
    div_sel_hp.appendChild(div);
 
    var div_right = new Element('div',{'style':'clear:left; margin:0; padding:0, border:0'})
   
    form_sel.appendChild(div_sel_hp);
    form_sel.appendChild(div_right);

    form_sel.addEventListener('change',PK_S3.input_select_rdf, false);

    div_top.appendChild(form_sel);

    var div_slots = new Element ('div', {'style':'float: left; width: 150px;'});
    //var name_slots=['Nakrycia głowy', 'Naszyjniki', 'Odzież', 'Pasy', 'Spodnie', 'Obuwie', 'Bronie pojedynkowe', 'Bronie fortowe', 'Wierzchowce', 'Produkt'];
    /*
     <select style="margin:0px 5px 0px 2px; width:40px;" id="pk_s3_select_slot_8"><option value="0">----</option><option value="100">из экипировки</option><option value="505">Жеребёнок</option></select><span>Верховое животное</span></div>
    */
    for (var i = 0; i < 10; ++i){
	var div = document.createElement('div');
	var id = 'pk_s3_select_slot_'+i;
	//var inp = new Element ('input', {'id':id, 'type':'checkbox', 'style':'margin: 2px 5px 2px 2px;'});
	//div.appendChild (inp);
	var sel = new Element ('select', {'id':id, 'style':'background-color:#e8dab3; width:40px; height:19px; margin:1px 5px 1px 1px;'});
	var opt = document.createElement('option');
	opt.value = 0;
	opt.textContent = '-----';
	sel.appendChild(opt);
	var opt = document.createElement('option');
	opt.value = 99;
	opt.textContent = '(puste miejsce)';
	sel.appendChild(opt);
	var opt = document.createElement('option');
	opt.value = 98;
	opt.textContent = '(nie zmieniać)';
	sel.appendChild(opt);
	var typ = PK_S3.types[i]
	if (typ != 'yield'){
	    for (var j in PK_S3.items){
		if (isNaN(j)) continue;
		var obj = PK_S3.items[j];
		if (typ != obj.type) continue;
		var is_shop = obj.tradeable && obj.traderlevel && (obj.traderlevel <= 15);
		var is_set = obj.set && obj.set.key;
		var opt = document.createElement('option');
		opt.value = j;
		opt.textContent = obj.name;
		if (!is_shop){
		    opt.style.backgroundColor = '#ff8c76';
		    opt.style.color = 'firebrick';
		}
		if (is_set){
		    opt.style.backgroundColor = 'darkslategray';
		    opt.style.color = 'white';
		}
		if (!is_shop && is_set){
		    opt.style.fontWeight = 'bold';
		    opt.style.backgroundColor = 'darkslategray';
		    opt.style.color = 'firebrick';
		}
		sel.appendChild(opt);
	    }
	}
	else{
	    for (var j in PK_S3.items){
		if (isNaN(j)) continue;
		var obj = PK_S3.items[j];
		if (typ != obj.type) continue;
		var is_set = obj.set && obj.set.key;
		if (!is_set) continue;
		var opt = document.createElement('option');
		opt.value = j;
		opt.textContent = obj.name;
		sel.appendChild(opt);
	    }
	}
	div.appendChild (sel);
	var span = document.createElement('span');
	span.textContent = PK_S3.types_name[i];
	div.appendChild(span);
	div_slots.appendChild(div);
    }
    div_top.appendChild(div_slots);

    var skills2 = ['budow', 's.u. ', 'odpor', 'wytrz', 'p.ż. ', 'jazda', 'refle', 'unik ', 'chowa', 'pływa', 'celow', 'strze', 'z.p. ', 's.man', 'napra', 'dowo.', 'takty', 'hande', 'o.zwi', 'zasko'];
    var attrib2 = ['siła ', 'spraw', 'zręcz', 'chary'];
    var skills_color2 = ['#900','#060','#009','#660']
    var div_konstr1 = new Element ('div', {'style':'float: left; width: 250px; font-family: monospace; border-left: 1px solid #321'});
    for (var j = 0; j < 4; ++j){
	var div = document.createElement('div');
	var span1 = document.createElement('span');
	span1.style.color = skills_color2[j];
	span1.style.fontWeight = 'bold';
	var id = 'pk_s3_select_konstr_a'+(j*1);
	var inp = new Element ('input', {'id':id, 'type':'text', 'size':'2', 'style': 'margin: 1px 2px 1px 10px; width: 25px;', 'disabled':'true'});
	inp.addEventListener('change',function () {this.value = parseFloat(this.value); if (isNaN(this.value)) this.value=0; if (this.value < 0) this.value=0; if (this.value > 5) this.value=5;}, false);
	span1.appendChild(inp);
	var span = document.createElement('span');
	span.textContent = attrib2[j];
	span1.appendChild(span);
	div.appendChild(span1);
	for (var i = 0; i < 5; ++i){
	    var span1 = document.createElement('span');
	    span1.style.color = skills_color2[j];
	    var id = 'pk_s3_select_konstr_s'+(j*5+i);
	    var inp = new Element ('input', {'id':id, 'type':'text', 'size':'2', 'style': 'margin: 1px 2px 1px 10px; width: 25px;', 'disabled':'true'});
	    inp.addEventListener('change',function () {this.value = parseFloat(this.value); if (isNaN(this.value)) this.value=0; if (this.value < 0) this.value=0; if (this.value > 5) this.value=5;}, false);
	    span1.appendChild(inp);
	    var span = document.createElement('span');
	    span.textContent = skills2[j*5+i];
	    span1.appendChild(span);
	    div.appendChild(span1);
	}
	div_konstr1.appendChild(div);
    }
    div_top.appendChild(div_konstr1);
    
    
    var div_right = new Element('div',{'style':'clear:left; margin:0; padding:0, border:0'})

    var wind = document.getElementById('pk_s3_settings');
    wind.appendChild(div_left);
    wind.appendChild(div_top);
    wind.appendChild(div_right);
    PK_S3.input_select_rdf();
    //PK_S3.progress.id = setInterval(PK_S3.running_bar, 594);
};

PK_S3.minimize_window_informer = function(){
    AjaxWindow.toggleSize('pereodevalka_informer');
    setTimeout(PK_S3.minimize_window_informer2, 100);
};

PK_S3.minimize_window_informer2 = function(){
    var bar = $('window_bar_pereodevalka_informer');
    if (!bar){
        setTimeout(PK_S3.minimize_window_informer2, 100);
	return;
    }
    bar.firstChild.firstChild.nextSibling.innerHTML='Informacja';
};


PK_S3.show_window_informer = function (){
    var name = 'pereodevalka_informer';
    var group = 'messages';
    var window_div = $('window_' + name);
    
    if (!window_div){
	window_div = new Element('div',{'id':'window_' + name,'class':'window css_messages'});
	AjaxWindow.windows[name] = window_div;
	window_div.injectInside('windows');
	window_div.centerLeft();
    }
    else{
	AjaxWindow.maximize (name);
	window_div.innerHTML = '';
    }
    AjaxWindow.bringToTop(window_div);

    var xhtml = '';
    xhtml += '<div class="window_borders">';
    xhtml += '  <h2 id="window_' + name + '_title" class="window_title"> </h2>';
    xhtml += '	<a class="window_refresh" href="javascript:AjaxWindow.close(\'' + name + '\'); PK_S3.show_window_informer();void(0)" title="<b>Odśwież okno</b>"></a>'
    xhtml += '  <a href="javascript:AjaxWindow.closeAll();" class="window_closeall" title="<b>Zamknij wszystkie okna</b>"></a>';
    //xhtml += '  <a href="javascript:AjaxWindow.toggleSize(\'' + name + '\', \'' + group + '\');" class="window_minimize" title="<b>Minimalizuj okno</b>"></a>';
    xhtml += '  <a href="javascript:PK_S3.minimize_window_informer();" class="window_minimize" title="<b>Minimalizuj okno</b>"></a>';
    xhtml += '  <a href="javascript:AjaxWindow.close(\'' + name + '\');" class="window_close" title="<b>Zamknij okno</b>"></a>';
    xhtml += '  <div id="window_' + name + '_content" class="window_content">';
    xhtml += '    	<table class="shadow_table" style="margin-left:6px; width:100%; height:370px">';
    xhtml += '    		<tr>';
    xhtml += '    			<td class="edge_shadow_top_left"></td>';
    xhtml += '    			<td class="border_shadow_top"></td>';
    xhtml += '    			<td class="edge_shadow_top_right"></td>';
    xhtml += '    		</tr>';
    xhtml += '    		<tr>';
    xhtml += '    			<td class="border_shadow_left"></td>';
    xhtml += '    			<td class="shadow_content">';
    xhtml += '    				<div style="font-size:12px; overflow:none; width: 675px; height:370px; position: relative;" id="pk_s3_informer">';
    xhtml += '    				</div>';
    xhtml += '    			</td>';
    xhtml += '    			<td class="border_shadow_right"></td>';
    xhtml += '    		</tr>';
    xhtml += '    		<tr>';
    xhtml += '    			<td class="edge_shadow_bottom_left"></td>';
    xhtml += '    			<td class="border_shadow_bottom"></td>';
    xhtml += '    			<td class="edge_shadow_bottom_right"></td>';
    xhtml += '	 		</tr>';
    xhtml += '    		<tr>';
    xhtml += '    			<td></td>';
    xhtml += '    			<td><a href="javascript:void(0)" target="_blank" onclick="location.href=\''+Str+'\'; return false">Tutaj prześlij braki w ekwipunku</a></td>';
    xhtml += '    			<td></td>';
    xhtml += '	 		</tr>';
    xhtml += '	 	</table>';
    xhtml += '	</div>';
    xhtml += '</div>';
    window_div.setHTML(xhtml);
	
    var window_title_div = $('window_' + name + '_title');
    window_div.makeDraggable({handle:window_title_div});
    window_title_div.addEvent('dblclick',function(){
				window_div.centerLeft();
				window_div.setStyle('top',133);
				});
    window_div.addEvent('mousedown',AjaxWindow.bringToTop.bind(AjaxWindow,[window_div]));
    window_title_div.addEvent('mousedown',AjaxWindow.bringToTop.bind(AjaxWindow,[window_div]));

    var wind = document.getElementById('pk_s3_informer');
    var text = new Element ('textarea',{'style':'clear:left; margin:5px; width:661px; height:353px;', 'readonly':'true'});
    text.value = (PK_S3.informer);
    wind.appendChild(text);
};

PK_S3.sortirovka_rabot = function (type, old_type){
    var otse4to = $('pk_s3_sortirovka_valueto').value;
    var vy4islennoe = $('pk_s3_sortirovka_native').checked;
    // resultaty:{dengi:87, opyt:73, vezenie:29, boom:69,
    var array = [];
    var tmp_node = ['name', 'opyt', 'dengi', 'vezenie', 'boom', 'to', 'malus'];
    for (nod in tmp_node){
	if (isNaN(nod)) continue;
	var elem = $('pk_s3_sortirovka_'+tmp_node[nod]);
	if (elem){
	    elem.style.backgroundColor = '';
	}
    };
    var elem = $('pk_s3_sortirovka_'+type);
    if (type != old_type){
	elem.style.backgroundColor = '#6c6';
	PK_S3.vyvod.negativ = true;;
    }
    else{
	if (PK_S3.vyvod.negativ){
	    elem.style.backgroundColor = '#c66';
	}
	else{
	    elem.style.backgroundColor = '#6c6';
	}
	PK_S3.vyvod.negativ = !PK_S3.vyvod.negativ;
    }
    for (var ir = 0; ir < PK_S3.setting.porabotaem.length; ++ir){
	if (!PK_S3.resultaty[ir]) continue;
	if (PK_S3.resultaty[ir].TO < otse4to) continue;
	var val = 0;
	switch (type){
	case 'name':
	    val = PK_S3.raboty[ir].rus_name;
	    break;
	case 'malus':
	    val = PK_S3.raboty[ir].malus;
	    break;
	case 'to':
	    val = PK_S3.resultaty[ir].TO;
	    break;
	default:
	    if (vy4islennoe){
		val = PK_S3.resultaty[ir][type];
	    }
	    else{
		val = PK_S3.raboty[ir].resultaty[type];
	    }
	};
	if (PK_S3.vyvod.negativ&&(type!='name'))	val = -val;
	array.push ({val:val, ind:ir});
    }
    PK_S3.qsort(array, 0, array.length, 'val');
    PK_S3.vyvod.type = type;
    if (PK_S3.setting.knopka == 'poehali'){
	PK_S3.print_raboty(array);
    }
    else{
	alert ('бе-бе-бе, воть!');
    }
};

PK_S3.print_raboty_to = function (arr){
    main = $('pk_s3_rezultaten_arbeiten0');
    if (!main) return;
    main.innerHTML = '';
    for (var i = 0; i < arr.length; ++i){
	var div0 = new Element('div', {'style':'width:650px; height:138px; border-bottom: 1px solid #321; clear:both; padding-top:5px;'});
	var divI = new Element ('div', {'style':'float:left; width:260px;'});
	if ((arr[i].ind >= PK_S3.raboty.fort_min)&&(arr[i].ind < PK_S3.raboty.fort_max)){
	    divI.style.width = '250px';
	}
	var divIo = new Element ('div', {'style':'float:left; width:27px; height:81px;'});
	var tmp_div = new Element ('div', {'style':'float:left; padding: 2px;'});
	var aa0 = new Element ('a', {'href':'javascript:PK_S3.equip_items_save('+arr[i].ind+')'});
	var img0 = new Element ('img', {'style':'width:23px; height:23px; background:url(../img.php?type=menu&amp;dummy) -104px -126px; display:block; margin: 2px;', 'src':'/images/transparent.png', 'title':'Zapisz zestaw...'});
	aa0.appendChild(img0);
	tmp_div.appendChild(aa0);
	var aa1 = new Element ('a', {'href':'javascript:PK_S3.equip_items_delete('+arr[i].ind+')'});
	var img1 = new Element ('img', {'style':'width:23px; height:23px; background:url(../img.php?type=menu&amp;dummy) -129px -101px; display:block; margin: 2px;', 'src':'/images/transparent.png', 'title':'Usuń zestaw'});
	aa1.appendChild(img1)
	tmp_div.appendChild(aa1);
	var aa2 = new Element ('a', {'href':'javascript:PK_S3.except_raboty('+arr[i].ind+', true)'});
	var img2 = new Element ('img', {'style':'width:23px; height:23px; background:url(/images/window/window2_buttons.png) 0px -20px; display:block; margin: 2px;', 'src':'/images/transparent.png', 'title':'Скрыть работу'});
	aa2.appendChild(img2)
	tmp_div.appendChild(aa2);
	divIo.appendChild(tmp_div);
	divI.appendChild(divIo);
	var divIa = new Element ('div', {'style':'float:left;'});
	divIa1 = new Element ('div', {'style':'heigth:20px; font-weight:bold;'});
	var tname = PK_S3.raboty[arr[i].ind].rus_name;
	if (tname.length > 28) tname = tname.slice(0,25) + '...';
	divIa1.textContent = tname;
	divIa.appendChild(divIa1);
	var divIa2 = new Element('div');
	var divIa2i = new Element ('div', {'style':'float:left'});
	var src = '';
	if (arr[i].ind <= PK_S3.raboty.max){
	    src = '/images/jobs/'+PK_S3.raboty[arr[i].ind].name+'.png';
	    var img0 = new Element ('img', {'src':'/images/jobs/'+PK_S3.raboty[arr[i].ind].name+'.png', 'title':PK_S3.raboty[arr[i].ind].rus_name, 'alt':PK_S3.raboty[arr[i].ind].rus_name});
	}
	else if ((arr[i].ind == PK_S3.raboty.health)||(arr[i].ind == PK_S3.raboty.energy)){
	    src = '/images/jobs/mini/sleep.png';
	}
	else if (arr[i].ind == PK_S3.raboty.moving){
	    src = '/images/jobs/mini/walk.png';
	}
	else if (arr[i].ind == PK_S3.raboty.build){
	    src = '/images/jobs/build.png';
	}
	else if ((arr[i].ind >= PK_S3.raboty.fort_min) && (arr[i].ind < PK_S3.raboty.fort_middle)){
	    src = '/images/fort/battle/button_attack.png';
	}
	else if ((arr[i].ind >= PK_S3.raboty.fort_middle) && (arr[i].ind < PK_S3.raboty.fort_max)){
	    src = '/images/fort/battle/button_defend.png';
	}
	else if ((arr[i].ind >= PK_S3.raboty.duel_min) && (arr[i].ind < PK_S3.raboty.duel_max)){
	    src = '/images/jobs/duell.png';
	}
	else{
	    src = '/images/skill/skill_pure.png';
	}
	var title = PK_S3.raboty[arr[i].ind].rus_name + '<hr />Kliknij, aby umieścić wybrane pozycje';
	var img0 = new Element ('img', {'src':src, 'title':title, 'alt':title, 'style':'width:63px; height:63px;'});
	var aa = new Element('a', {'href':'javascript:PK_S3.equip_adds('+arr[i].ind+');void(0);'});
	aa.appendChild(img0);
	divIa2i.appendChild(aa);
	divIa2.appendChild(divIa2i);
	var divIa2ii = new Element ('div', {'style':'float:left;'});
	divIa2ii.innerHTML=' ';
	var dob = 0;
	for (var iii in PK_S3.raboty[arr[i].ind].resultaty.produkty){
	    ++dob;
	    if (isNaN(iii)) continue;
	    var tmp_div = new Element('div', {'style':'float:left; padding: 10px 2px 0px 2px; text-align:center;'});
	    var img = new Element ('img', {'src':PK_S3.items[iii].image_mini, 'title':PK_S3.items[iii].name, 'alt':PK_S3.items[iii].name, 'class':'bug_mini', 'style':'clear:both; display:block'});
	    tmp_div.appendChild(img);
	    //divIa2ii.appendChild(img);
	    span = new Element ('span');
	    var val = Math.round(PK_S3.raboty[arr[i].ind].resultaty.produkty[iii] * PK_S3.bonus.money)
	    span.textContent = '' + ((val>100)?100:val) + '%';
	    if (PK_S3.bonus.money > 1.0){
		span.style.color = '#287f10';
		span.style.fontWeight = 'bold';
	    }
	    tmp_div.appendChild(span);
	    divIa2ii.appendChild(tmp_div);
	}
	if (dob == 0){
	    var tmp_div = new Element('div', {'style':'float:left; padding: 10px 2px 0px 2px; text-align:center;'});
	    var img = new Element ('img', {'src':'/images/transparent.png', 'title':'', 'alt':'', 'class':'bug_mini', 'style':'clear:both; display:block'});
	    tmp_div.appendChild(img);
	    //divIa2ii.appendChild(img);
	    divIa2ii.appendChild(tmp_div);
	}
	divIa2ii.appendChild(tmp_div);
	divIa2.appendChild(divIa2ii);
	divIa.appendChild(divIa2);
	divI.appendChild(divIa);
	if (arr[i].ind <= PK_S3.raboty.max){
	    var divIb = new Element('div', {'style':'clear:both;'});
	    var divIb1 = new Element('div', {'style':'width:110px; float:left;', 'title':'Zarobek'});
	    var img0 = new Element('img', {'src':'/images/job/dollar.png', 'style':'float:left;'});
	    divIb1.appendChild(img0);
	    var bar = new Element('div', {'class':'bar', 'style':'width:26px; border:1px solid black; float:left;'})
	    var bar_fill = new Element('div', {'class':'bar_fill', 'style':'width:'+Math.round(PK_S3.raboty[arr[i].ind].resultaty.dengi*.25)+'px;'})
	    bar.appendChild(bar_fill);
	    var bar_perc = new Element('div', {'class':'bar_perc', 'style':'width:25px;'});
	    bar_perc.textContent = PK_S3.raboty[arr[i].ind].resultaty.dengi+'%';
	    bar.appendChild(bar_perc);
	    divIb1.appendChild(bar);
	    var span = new Element('div', {'style':'float:left; font-weight:bold; margin: 2px 0px 0px 5px;'});
	    span.textContent = PK_S3.resultaty[arr[i].ind].dengi + '$';
	    divIb1.appendChild(span);
	    divIb.appendChild(divIb1);

	    var divIb3 = new Element('div', {'style':'float:left;', 'title':'Удача'});
	    var img0 = new Element('img', {'src':'/images/job/luck.png', 'style':'float:left;'});
	    divIb3.appendChild(img0);
	    var bar = new Element('div', {'class':'bar', 'style':'width:26px; border:1px solid black; float:left;'})
	    var bar_fill = new Element('div', {'class':'bar_fill', 'style':'width:'+Math.round(PK_S3.raboty[arr[i].ind].resultaty.vezenie*.25)+'px;'})
	    bar.appendChild(bar_fill);
	    var bar_perc = new Element('div', {'class':'bar_perc', 'style':'width:25px;'});
	    bar_perc.textContent = PK_S3.raboty[arr[i].ind].resultaty.vezenie+'%';
	    bar.appendChild(bar_perc);
	    divIb3.appendChild(bar);
	    var span = new Element('div', {'style':'float:left; font-weight:bold; margin: 2px 0px 0px 5px;'});
	    span.textContent = Math.round(PK_S3.resultaty[arr[i].ind].vezenie/3)+' - ' + PK_S3.resultaty[arr[i].ind].vezenie + ' ($)';
	    divIb3.appendChild(span);
	    divIb.appendChild(divIb3);

	    var divIb2 = new Element('div', {'style':'width:110px; float:left;', 'title':'Doświadczenie'});
	    var img0 = new Element('img', {'src':'/images/job/experience.png', 'style':'float:left;'});
	    divIb2.appendChild(img0);
	    var bar = new Element('div', {'class':'bar', 'style':'width:26px; border:1px solid black; float:left;'})
	    var bar_fill = new Element('div', {'class':'bar_fill', 'style':'width:'+Math.round(PK_S3.raboty[arr[i].ind].resultaty.opyt*.25)+'px;'})
	    bar.appendChild(bar_fill);
	    var bar_perc = new Element('div', {'class':'bar_perc', 'style':'width:25px;'});
	    bar_perc.textContent = PK_S3.raboty[arr[i].ind].resultaty.opyt+'%';
	    bar.appendChild(bar_perc);
	    divIb2.appendChild(bar);
	    var span = new Element('div', {'style':'float:left; font-weight:bold; margin: 2px 0px 0px 5px;'});
	    span.textContent = PK_S3.resultaty[arr[i].ind].opyt + ' XP';
	    divIb2.appendChild(span);
	    divIb.appendChild(divIb2);

	    var divIb4 = new Element('div', {'style':'float:left;', 'title':'Niebezpieczeństwo'});
	    var img0 = new Element('img', {'src':'/images/job/danger.png', 'style':'float:left;'});
	    divIb4.appendChild(img0);
	    var bar = new Element('div', {'class':'bar', 'style':'width:26px; border:1px solid black; float:left;'})
	    var bar_fill = new Element('div', {'class':'bar_fill', 'style':'width:'+Math.round(PK_S3.raboty[arr[i].ind].resultaty.boom*.25)+'px;'})
	    bar.appendChild(bar_fill);
	    var bar_perc = new Element('div', {'class':'bar_perc', 'style':'width:25px;'});
	    bar_perc.textContent = PK_S3.raboty[arr[i].ind].resultaty.boom+'%';
	    bar.appendChild(bar_perc);
	    divIb4.appendChild(bar);
	    var span = new Element('div', {'style':'float:left; font-weight:bold; margin: 2px 0px 0px 5px;'});
	    span.textContent =  PK_S3.resultaty[arr[i].ind].boom + ' !';
	    divIb4.appendChild(span);
	    divIb.appendChild(divIb4);

	    divI.appendChild(divIb);
	}
	div0.appendChild(divI);
	var divII = new Element('div', {'style':'width:390px; float:left;'});
	if ((arr[i].ind >= PK_S3.raboty.fort_min)&&(arr[i].ind < PK_S3.raboty.fort_max)){
	    divII.style.width = '400px';
	}
	var divIIa = new Element ('div', {'style':'clear:both;'});
	var divIIa1 = new Element ('div', {'style':'float:left; width:105px;'});
	if ((arr[i].ind >= PK_S3.raboty.fort_min)&&(arr[i].ind < PK_S3.raboty.fort_max)){
	    divIIa1.style.width = '115px';
	}
	var tmp_div = new Element ('span', {'style':'float:left; width:47px;'});
	if ((arr[i].ind >= PK_S3.raboty.fort_min)&&(arr[i].ind < PK_S3.raboty.fort_max)){
	    tmp_div.style.width = '57px';
	}
	var title = 'Bonus umiejętności';
	if (arr[i].ind == PK_S3.raboty.moving){
	    title = 'Bonus szybkości';
	}
	else if ((arr[i].ind == PK_S3.raboty.energy)||(arr[i].ind == PK_S3.raboty.health)){
	    title = 'Twoje życie';
	}
	else if ((arr[i].ind >= PK_S3.raboty.fort_min) && (arr[i].ind < PK_S3.raboty.fort_max)){
	    title = 'Atak';
	}
	tmp_div.innerHTML = '<img src="images/task_points/plus.png" width="20" height="20" title="'+title+'" /> '+PK_S3.resultaty[arr[i].ind].selfTO;
	if ((arr[i].ind < PK_S3.raboty.max)&&(PK_S3.resultaty[arr[i].ind].selfTO > PK_S3.raboty[arr[i].ind].malus)){
	    tmp_div.style.color = "#060";
	    tmp_div.style.fontWeight = "bold";
	}
	divIIa1.appendChild(tmp_div);
	var tmp_div = new Element ('span', {'style':'float:left; clear:right; width:58px;'});
	var title = 'Бонус экипировки';
	if (arr[i].ind == PK_S3.raboty.moving){
	    title = 'Бонус к скорости';
	}
	else if ((arr[i].ind == PK_S3.raboty.energy)||(arr[i].ind == PK_S3.raboty.health)){
	    title = 'Бонус к навыку здоровья';
	}
	else if ((arr[i].ind >= PK_S3.raboty.fort_min) && (arr[i].ind < PK_S3.raboty.fort_max)){
	    title = 'Защита';
	}
	tmp_div.innerHTML = '<img src="images/task_points/plus.png" width="20" height="20" title="'+title+'" /> '+PK_S3.resultaty[arr[i].ind].bonus;
	divIIa1.appendChild(tmp_div);
	var tmp_div = new Element ('span', {'style':'float:left; width:47px;'});
	if ((arr[i].ind >= PK_S3.raboty.fort_min)&&(arr[i].ind < PK_S3.raboty.fort_max)){
	    tmp_div.style.width = '57px';
	}
	tmp_div.innerHTML = '<img src="images/task_points/minus.png" width="20" height="20" title="Сложность работы" /> '+PK_S3.raboty[arr[i].ind].malus;
	divIIa1.appendChild(tmp_div);
	var tmp_div = new Element ('span', {'style':'float:left; clear:right; width:58px;'});
	var title = 'Трудовых очков';
	if (arr[i].ind == PK_S3.raboty.moving){
	    title = 'Итоговая скорость';
	}
	else if (arr[i].ind == PK_S3.raboty.energy){
	    title = 'Процент регенерации';
	}
	else if (arr[i].ind == PK_S3.raboty.health){
	    title = 'Итоговое здоровье'
	}
	else if ((arr[i].ind >= PK_S3.raboty.fort_min) && (arr[i].ind < PK_S3.raboty.fort_max)){
	    title = 'Значение выбранного бонуса';
	}
	var t0 = PK_S3.resultaty[arr[i].ind].TO;
	tmp_div.innerHTML = '<img src="images/task_points/equal.png" width="20" height="20" title="'+title+'" /> <b>'+t0+'</b>';
	if (t0 < 0){
	    tmp_div.style.color = "maroon";
	}
	if ((arr[i].ind < PK_S3.raboty.max)&&(PK_S3.resultaty[arr[i].ind].TO > 0)){
	    tmp_div.style.color = "#00c";
	}
	divIIa1.appendChild(tmp_div);
	divIIa.appendChild(divIIa1);
	var divIIa2 = new Element ('div', {'style':'float:left; width: 285px;'})
	for (var s in PK_S3.raboty[arr[i].ind].navyki){
	    for (var j = 0; j < PK_S3.raboty[arr[i].ind].navyki[s]; ++j){
		// skill_box skill_flexibility img0
		if (PK_S3.skill2atr[s]){
		    var clas = 'skill_box skill_' + PK_S3.skill2atr[s] + ' img' + (PK_S3.skillsi[s] % 5);
		    var id = 'skill_'+s;
		    var span1 = new Element('span', {'class':clas, 'title':'<b>'+Character.skill_titles[s]+':</b> '+PK_S3.resultaty[arr[i].ind].skills[s]});
		    span1.innerHTML = '<span class="skill_value">'+PK_S3.resultaty[arr[i].ind].skills[s]+'</span>';
		    
		    divIIa2.appendChild(span1);
		}
		else{ // характеристика из конструктора
		    // class="skill_box skill_circle_flexibility"
		    var clas = 'skill_box skill_circle_'+s;
		    var span1 = new Element('span', {'class':clas, 'title':Character.attribute_titles[s]+': '+PK_S3.resultaty[arr[i].ind].skills[s]});
		    span1.innerHTML = '<span class="skill_value">'+PK_S3.resultaty[arr[i].ind].skills[s]+'</span>';
		    divIIa2.appendChild(span1);
		}
	    }
	}
	divIIa.appendChild(divIIa2);
	divII.appendChild(divIIa);
	var divIIb = new Element('div', {'style':'clear:both; padding-top: 15px;'});
	var no_item_fort = true;
	for (var j = 0; j < PK_S3.types.length; ++j){
	    var div1 = new Element('div', {'style':'float:left; width:39px;'});
	    var iID = PK_S3.resultaty[arr[i].ind].items[PK_S3.types[j]];
	    if (iID&&(iID>0)){
		if ((PK_S3.types[j]!='animal')&&(PK_S3.types[j]!='left_arm')){
		    no_item_fort = false;
		}
		var iobj = PK_S3.items[iID];
		var title = '<b>' + iobj.name + '</b><hr />';
		var is_f = true;
		for (var a in iobj.bonus.attributes){
		    if (!is_f){
			title += '<br />';
		    }
		    else{
			is_f = false;
		    }
		    title += '<b>' + Character.attribute_titles[a] + ':' + iobj.bonus.attributes[a] + '</b>';
		}
		for (var s in iobj.bonus.skills){
		    if (!is_f){
			title += '<br />';
		    }
		    else{
			is_f = false;
		    }
		    title += Character.skill_titles[s] + ':' + iobj.bonus.skills[s];
		}
		if (iobj.speed){
		    if (!is_f){
			title += '<br />';
		    }
		    else{
			is_f = false;
		    }
		    title += 'szybkość: '+Math.round(100/iobj.speed)+'%';
		}
		if ((iobj.type == 'left_arm')||(iobj.type == 'right_arm')){
		    if (!is_f){
			title += '<br />';
		    }
		    title += 'obrażenia: ' + iobj.damage.damage_min + ' - ' + iobj.damage.damage_max + ' (' + parseInt((iobj.damage.damage_min + iobj.damage.damage_max)/2, 10) + ' śred.)';
		};
		title += '<hr />';
		if (iobj.set.key){
		    title += iobj.set.name +'<hr />';
		};
		title += 'poziom: ' + (iobj.level ? iobj.level : '0') + '<br />';
		title += 'cena: <b style="' + (PK_S3.svoi_veschi[iID]) ? 'color:green' : 'color:red' + '">-1-$ ' + iobj.price + '</b>';
		title += '<hr />Kliknij aby założyć ten przedmiot'
		var aa = new Element ('a', {'href':'javascript:PK_S3.equip_add('+iID+');void(0);'});
		var classi = (PK_S3.svoi_veschi[iID]) ? 'bug_mini' : 'bug_mini_red';
		var img = new Element ('img', {'src':iobj.image_mini, 'class':classi, 'title':title});
		aa.appendChild(img);
		div1.appendChild(aa);
		if ((arr[i].ind < PK_S3.raboty.fort_min)||(arr[i].ind >= PK_S3.raboty.fort_max)){
		    var podp = new Element ('div', {'style':'text-align:center;'});
		    podp.textContent = PK_S3.resultaty[arr[i].ind].itemsto[PK_S3.types[j]];
		    div1.appendChild(podp);
		}
	    }
	    divIIb.appendChild(div1);
	}
	if (no_item_fort){
	    var div1 = new Element('div', {'style':'font-weight:bold;'});
	    div1.textContent = 'Zbyt duża ilość pkt. życia, nie można znaleźć żadnego zestawu!';
	    divIIb.appendChild(div1);
	}
	divII.appendChild(divIIb);
	div0.appendChild(divII);
	main.appendChild(div0);
    }
}

PK_S3.vyvod_nenuzhnykh_items = function (){
    var wind = $('pk_s3_rezultaten_arbeiten');
    wind.innerHTML = '';
    var text = new Element ('div',{'style':'margin:2px; width:675px; height:385px; overflow-y:scroll; overflow-x:none;', 'id':'pk_s3_rezultaten_arbeiten1'});
    for (var i in PK_S3.svoi_veschi){
	if (isNaN(i)) continue;
	if (!PK_S3.ispolzuemye[i]){
	    obj = PK_S3.items[i];
	    if ((obj.type == 'yield')||(obj.type == 'recipe')) continue;
	    var div1 = new Element('div', {'style':'float:left; width:39px;'});
	    var title = '<b>' + obj.name + '</b><hr />';
	    var is_f = true;
	    for (var a in obj.bonus.attributes){
		if (!is_f){
		    title += '<br />';
		}
		else{
		    is_f = false;
		}
		title += '<b>' + Character.attribute_titles[a] + ':' + obj.bonus.attributes[a] + '</b>';
	    }
	    for (var s in obj.bonus.skills){
		if (!is_f){
		    title += '<br />';
		}
		else{
		    is_f = false;
		}
		title += Character.skill_titles[s] + ':' + obj.bonus.skills[s];
	    }
	    if (obj.speed){
		if (!is_f){
		    title += '<br />';
		}
		else{
		    is_f = false;
		}
		title += 'szybkość: '+Math.round(100/obj.speed)+'%';
	    }
	    if ((obj.type == 'left_arm')||(obj.type == 'right_arm')){
		if (!is_f){
		    title += '<br />';
		}
		title += 'obrażenia: ' + obj.damage.damage_min + ' - ' + obj.damage.damage_max + ' (' + parseInt((obj.damage.damage_min + obj.damage.damage_max)/2, 10) + ' śred.)';
	    };
	    title += '<hr />';
	    if (obj.set.key){
		title += obj.set.name +'<hr />';
	    };
	    title += 'poziom: ' + (obj.level ? obj.level : '0') + '<br />';
	    title += 'cena: <b style="' + (PK_S3.svoi_veschi[iID]) ? 'color:green' : 'color:red' + '">-2-$ ' + obj.price + '</b>';
	    var simple = false;
	    if (obj.tradeable && obj.traderlevel && (obj.traderlevel <= 15)) simple = true;
	    if (obj.set && obj.set.key) simple = false;
	    if (obj.characterClass) simple = false;
	    var classi = (simple) ? 'bug_mini' : 'bug_mini_red';
	    var img = new Element ('img', {'src':obj.image_mini, 'class':classi, 'title':title});
	    div1.appendChild(img);
	    text.appendChild(div1);
	}
    }
    wind.appendChild(text);
}

PK_S3.print_raboty = function (arr){
    var main = $('pk_s3_rezultaten_arbeiten0');
    if (!main) return;
    main.innerHTML = '';
    for (var i = 0; i < arr.length; ++i){
	var div0 = new Element('div', {'style':'width:650px; height:138px; border-bottom: 1px solid #321; clear:both; padding-top:5px;'});
	var divI = new Element ('div', {'style':'float:left; width:260px;'});
	if ((arr[i].ind >= PK_S3.raboty.fort_min)&&(arr[i].ind < PK_S3.raboty.fort_max)){
	    divI.style.width = '250px';
	}
	var divIo = new Element ('div', {'style':'float:left; width:29px; height:58px;'});
	var tmp_div = new Element ('div', {'style':'float:left; padding: 3px;'});
	var aa0 = new Element ('a', {'href':'javascript:PK_S3.equip_items_save('+arr[i].ind+')'});
	var img0 = new Element ('img', {'style':'width:23px; height:23px; background:url("../images/window/messages/icons.png") repeat scroll -217px -2px transparent; display:block; margin: 2px;', 'src':'/images/transparent.png', 'title':'Zapisz zestaw...'});
	aa0.appendChild(img0);
	tmp_div.appendChild(aa0);
	var aa1 = new Element ('a', {'href':'javascript:PK_S3.equip_items_delete('+arr[i].ind+')'});
	var img1 = new Element ('img', {'style':'width:23px; height:23px; background:url("../images/window/messages/icons.png") repeat scroll -265px -2px transparent; display:block; margin: 2px;', 'src':'/images/transparent.png', 'title':'Usuń zestaw'});
	aa1.appendChild(img1)
	tmp_div.appendChild(aa1);
	var aa2 = new Element ('a', {'href':'javascript:PK_S3.except_raboty('+arr[i].ind+', true)'});
	var img2 = new Element ('img', {'style':'width:23px; height:23px; background:url("../images/window/messages/icons.png") repeat scroll -241px -2px transparent; display:block; margin: 2px;', 'src':'/images/transparent.png', 'title':'Ukryj prace'});
	aa2.appendChild(img2)
	tmp_div.appendChild(aa2);
	divIo.appendChild(tmp_div);
	divI.appendChild(divIo);
	var divIa = new Element ('div', {'style':'float:left;'});
	divIa1 = new Element ('div', {'style':'heigth:20px; font-weight:bold;'});
	var tname = PK_S3.raboty[arr[i].ind].rus_name;
	if (tname.length > 28) tname = tname.slice(0,25) + '...';
	divIa1.textContent = tname;
	divIa.appendChild(divIa1);
	var divIa2 = new Element('div');
	var divIa2i = new Element ('div', {'style':'float:left'});
	var src = '';
	if (arr[i].ind <= PK_S3.raboty.max){
	    src = '/images/jobs/'+PK_S3.raboty[arr[i].ind].name+'.png';
	}
	else if ((arr[i].ind == PK_S3.raboty.health)||(arr[i].ind == PK_S3.raboty.energy)){
	    src = '/images/jobs/sleep.png';
	}
	else if (arr[i].ind == PK_S3.raboty.moving){
	    src = '/images/jobs/walk.png';
	}
	else if (arr[i].ind == PK_S3.raboty.build){
	    src = '/images/jobs/build.png';
	}
	else if ((arr[i].ind >= PK_S3.raboty.fort_min) && (arr[i].ind < PK_S3.raboty.fort_middle)){
	    src = '/images/fort/battle/button_attack.png';
	}
	else if ((arr[i].ind >= PK_S3.raboty.fort_middle) && (arr[i].ind < PK_S3.raboty.fort_max)){
	    src = '/images/fort/battle/button_defend.png';
	}
	else if ((arr[i].ind >= PK_S3.raboty.duel_min) && (arr[i].ind < PK_S3.raboty.duel_max)){
	    src = '/images/jobs/duell.png';
	}
	else{
	    src = '/images/skill/skill_pure.jpg';
	}
	var title = PK_S3.raboty[arr[i].ind].rus_name + '<hr />Kliknij, aby ubrać się w wybrany ekwipunek';
	var img0 = new Element ('img', {'src':src, 'title':title, 'alt':title, 'style':'width:63px; height:63px;'});
	var aa = new Element('a', {'href':'javascript:PK_S3.equip_adds('+arr[i].ind+');void(0);'});
	aa.appendChild(img0);
	divIa2i.appendChild(aa);
	divIa2.appendChild(divIa2i);
	var divIa2ii = new Element ('div', {'style':'float:left;'});
	divIa2ii.innerHTML=' ';
	var dob = 0;
	for (var iii in PK_S3.raboty[arr[i].ind].resultaty.produkty){
	    ++dob;
	    if (isNaN(iii)) continue;
	    var tmp_div = new Element('div', {'style':'float:left; padding: 10px 2px 0px 2px; text-align:center;'});
	    var img = new Element ('img', {'src':PK_S3.items[iii].image_mini, 'title':PK_S3.items[iii].name, 'alt':PK_S3.items[iii].name, 'class':'bug_mini', 'style':'clear:both; display:block'});
	    tmp_div.appendChild(img);
	    //divIa2ii.appendChild(img);
	    span = new Element ('span');
	    var val = Math.round(PK_S3.raboty[arr[i].ind].resultaty.produkty[iii] * PK_S3.bonus.money * PK_S3.bonus.drop)
	    span.textContent = '' + ((val>100)?100:val) + '%';
	    if (PK_S3.bonus.money > 1.0){
		span.style.color = '#287f10';
		span.style.fontWeight = 'bold';
	    }
	    tmp_div.appendChild(span);
	    divIa2ii.appendChild(tmp_div);
	}
	if (dob == 0){
	    var tmp_div = new Element('div', {'style':'float:left; padding: 10px 2px 0px 2px; text-align:center;'});
	    var img = new Element ('img', {'src':'/images/transparent.png', 'title':'', 'alt':'', 'class':'bug_mini', 'style':'clear:both; display:block'});
	    tmp_div.appendChild(img);
	    //divIa2ii.appendChild(img);
	    divIa2ii.appendChild(tmp_div);
	}
	divIa2ii.appendChild(tmp_div);
	divIa2.appendChild(divIa2ii);
	divIa.appendChild(divIa2);
	divI.appendChild(divIa);
	if (arr[i].ind <= PK_S3.raboty.max){
	    var divIb = new Element('div', {'style':'clear:both;'});
	    var divIb1 = new Element('div', {'style':'width:110px; float:left;', 'title':'Zarobek'});
	    var img0 = new Element('img', {'src':'/images/job/dollar.png', 'style':'float:left;'});
	    divIb1.appendChild(img0);
	    var bar = new Element('div', {'class':'bar', 'style':'width:26px; border:1px solid black; float:left;'})
	    var bar_fill = new Element('div', {'class':'bar_fill', 'style':'width:'+Math.round(PK_S3.raboty[arr[i].ind].resultaty.dengi*.25)+'px;'})
	    bar.appendChild(bar_fill);
	    var bar_perc = new Element('div', {'class':'bar_perc', 'style':'width:25px;'});
	    bar_perc.textContent = PK_S3.raboty[arr[i].ind].resultaty.dengi+'%';
	    bar.appendChild(bar_perc);
	    divIb1.appendChild(bar);
	    var span = new Element('div', {'style':'float:left; font-weight:bold; margin: 2px 0px 0px 5px;'});
	    span.textContent = PK_S3.resultaty[arr[i].ind].dengi + '$';
	    divIb1.appendChild(span);
	    divIb.appendChild(divIb1);

	    var divIb3 = new Element('div', {'style':'float:left;', 'title':'Szczęscie'});
	    var img0 = new Element('img', {'src':'/images/job/luck.png', 'style':'float:left;'});
	    divIb3.appendChild(img0);
	    var bar = new Element('div', {'class':'bar', 'style':'width:26px; border:1px solid black; float:left;'})
	    var bar_fill = new Element('div', {'class':'bar_fill', 'style':'width:'+Math.round(PK_S3.raboty[arr[i].ind].resultaty.vezenie*.25)+'px;'})
	    bar.appendChild(bar_fill);
	    var bar_perc = new Element('div', {'class':'bar_perc', 'style':'width:25px;'});
	    bar_perc.textContent = PK_S3.raboty[arr[i].ind].resultaty.vezenie+'%';
	    bar.appendChild(bar_perc);
	    divIb3.appendChild(bar);
	    var span = new Element('div', {'style':'float:left; font-weight:bold; margin: 2px 0px 0px 5px;'});
	    span.textContent = Math.round(PK_S3.resultaty[arr[i].ind].vezenie/3)+' - ' + PK_S3.resultaty[arr[i].ind].vezenie + ' ($)';
	    divIb3.appendChild(span);
	    divIb.appendChild(divIb3);

	    var divIb2 = new Element('div', {'style':'width:110px; float:left;', 'title':'Doświadczenie'});
	    var img0 = new Element('img', {'src':'/images/job/experience.png', 'style':'float:left;'});
	    divIb2.appendChild(img0);
	    var bar = new Element('div', {'class':'bar', 'style':'width:26px; border:1px solid black; float:left;'})
	    var bar_fill = new Element('div', {'class':'bar_fill', 'style':'width:'+Math.round(PK_S3.raboty[arr[i].ind].resultaty.opyt*.25)+'px;'})
	    bar.appendChild(bar_fill);
	    var bar_perc = new Element('div', {'class':'bar_perc', 'style':'width:25px;'});
	    bar_perc.textContent = PK_S3.raboty[arr[i].ind].resultaty.opyt+'%';
	    bar.appendChild(bar_perc);
	    divIb2.appendChild(bar);
	    var span = new Element('div', {'style':'float:left; font-weight:bold; margin: 2px 0px 0px 5px;'});
	    span.textContent = PK_S3.resultaty[arr[i].ind].opyt + ' XP';
	    divIb2.appendChild(span);
	    divIb.appendChild(divIb2);

	    var divIb4 = new Element('div', {'style':'float:left;', 'title':'Niebezpieczeństwo'});
	    var img0 = new Element('img', {'src':'/images/job/danger.png', 'style':'float:left;'});
	    divIb4.appendChild(img0);
	    var bar = new Element('div', {'class':'bar', 'style':'width:26px; border:1px solid black; float:left;'})
	    var bar_fill = new Element('div', {'class':'bar_fill', 'style':'width:'+Math.round(PK_S3.raboty[arr[i].ind].resultaty.boom*.25)+'px;'})
	    bar.appendChild(bar_fill);
	    var bar_perc = new Element('div', {'class':'bar_perc', 'style':'width:25px;'});
	    bar_perc.textContent = PK_S3.raboty[arr[i].ind].resultaty.boom+'%';
	    bar.appendChild(bar_perc);
	    divIb4.appendChild(bar);
	    var span = new Element('div', {'style':'float:left; font-weight:bold; margin: 2px 0px 0px 5px;'});
	    span.textContent =  PK_S3.resultaty[arr[i].ind].boom + ' !';
	    divIb4.appendChild(span);
	    divIb.appendChild(divIb4);

	    divI.appendChild(divIb);
	}
	div0.appendChild(divI);
	var divII = new Element('div', {'style':'width:390px; float:left;'});
	if ((arr[i].ind >= PK_S3.raboty.fort_min)&&(arr[i].ind < PK_S3.raboty.fort_max)){
	    divII.style.width = '400px';
	}
	var divIIa = new Element ('div', {'style':'clear:both;'});
	var divIIa1 = new Element ('div', {'style':'float:left; width:105px;'});
	if ((arr[i].ind >= PK_S3.raboty.fort_min)&&(arr[i].ind < PK_S3.raboty.fort_max)){
	    divIIa1.style.width = '115px';
	}
	var tmp_div = new Element ('span', {'style':'float:left; width:47px;'});
	if ((arr[i].ind >= PK_S3.raboty.fort_min)&&(arr[i].ind < PK_S3.raboty.fort_max)){
	    tmp_div.style.width = '57px';
	}
	var title = 'Bonus umiejętności';
	if (arr[i].ind == PK_S3.raboty.moving){
	    title = 'Bonus szybkości';
	}
	else if ((arr[i].ind == PK_S3.raboty.energy)||(arr[i].ind == PK_S3.raboty.health)){
	    title = 'Bonus życia';
	}
	if ((arr[i].ind >= PK_S3.raboty.fort_min) && (arr[i].ind < PK_S3.raboty.fort_max)){
	    tmp_div.innerHTML = '<img src="images/fort/battle/attacker_primary.png" title="Atak" /> '+PK_S3.resultaty[arr[i].ind].selfTO;
	}
	else{
	    tmp_div.innerHTML = '<img src="images/task_points/plus.png" width="20" height="20" title="'+title+'" /> '+PK_S3.resultaty[arr[i].ind].selfTO;
	}
	if ((arr[i].ind < PK_S3.raboty.max)&&(PK_S3.resultaty[arr[i].ind].selfTO > PK_S3.raboty[arr[i].ind].malus)){
	    tmp_div.style.color = "#060";
	    tmp_div.style.fontWeight = "bold";
	}
	divIIa1.appendChild(tmp_div);
	var tmp_div = new Element ('span', {'style':'float:left; clear:right; width:58px;'});
	var title = 'Bonus ekwipunku';
	if (arr[i].ind == PK_S3.raboty.moving){
	    title = 'Bonus szybkości';
	}
	else if ((arr[i].ind == PK_S3.raboty.energy)||(arr[i].ind == PK_S3.raboty.health)){
	    title = 'Bonus życia';
	}
	if ((arr[i].ind >= PK_S3.raboty.fort_min) && (arr[i].ind < PK_S3.raboty.fort_max)){
	    tmp_div.innerHTML = '<img src="images/fort/battle/defender_primary.png" title="Obrona" /> '+PK_S3.resultaty[arr[i].ind].bonus;
	}
	else{
	    tmp_div.innerHTML = '<img src="images/task_points/plus.png" width="20" height="20" title="'+title+'" /> '+PK_S3.resultaty[arr[i].ind].bonus;
	}
	divIIa1.appendChild(tmp_div);
	var tmp_div = new Element ('span', {'style':'float:left; width:47px;'});
	if ((arr[i].ind >= PK_S3.raboty.fort_min)&&(arr[i].ind < PK_S3.raboty.fort_max)){
	    tmp_div.style.width = '57px';
	}
	tmp_div.innerHTML = '<img src="images/task_points/minus.png" width="20" height="20" title="Trudność" /> '+PK_S3.raboty[arr[i].ind].malus;
	divIIa1.appendChild(tmp_div);
	var tmp_div = new Element ('span', {'style':'float:left; clear:right; width:58px;'});
	var title = 'Punkty pracy';
	var t0 = PK_S3.resultaty[arr[i].ind].TO;
	if (arr[i].ind == PK_S3.raboty.moving){
	    title = 'Szybkość';
		t0 += '%';
	}
	else if (arr[i].ind == PK_S3.raboty.energy){
	    title = 'Szybkość regeneracji';
		t0 += '%';
	}
	else if (arr[i].ind == PK_S3.raboty.health){
	    title = 'Życie'
	}
	else if ((arr[i].ind >= PK_S3.raboty.fort_min) && (arr[i].ind < PK_S3.raboty.fort_max)){
	    title = 'Wybrany bonus';
	}
	tmp_div.innerHTML = '<img src="images/task_points/equal.png" width="20" height="20" title="'+title+'" /> <b>'+t0+'</b>';
	if (t0 < 0){
	    tmp_div.style.color = "maroon";
	}
	if ((arr[i].ind < PK_S3.raboty.max)&&(PK_S3.resultaty[arr[i].ind].TO > 0)){
	    tmp_div.style.color = "#00c";
	}
	divIIa1.appendChild(tmp_div);
	divIIa.appendChild(divIIa1);
	var divIIa2 = new Element ('div', {'style':'float:left; width: 285px;'})
	for (var s in PK_S3.raboty[arr[i].ind].navyki){
	    for (var j = 0; j < PK_S3.raboty[arr[i].ind].navyki[s]; ++j){
		// skill_box skill_flexibility img0
		if (PK_S3.skill2atr[s]){
		    var clas = 'skill_box skill_' + PK_S3.skill2atr[s] + ' img' + (PK_S3.skillsi[s] % 5);
		    var id = 'skill_'+s;
		    var span1 = new Element('span', {'class':clas, 'title':'<b>'+Character.skill_titles[s]+':</b> '+PK_S3.resultaty[arr[i].ind].skills[s]});
		    span1.innerHTML = '<span class="skill_value">'+PK_S3.resultaty[arr[i].ind].skills[s]+'</span>';
		    
		    divIIa2.appendChild(span1);
		}
		else{ // характеристика из конструктора
		    // class="skill_box skill_circle_flexibility"
		    var clas = 'skill_box skill_circle_'+s;
		    var span1 = new Element('span', {'class':clas, 'title':Character.attribute_titles[s]+': '+PK_S3.resultaty[arr[i].ind].skills[s]});
		    span1.innerHTML = '<span class="skill_value">'+PK_S3.resultaty[arr[i].ind].skills[s]+'</span>';
		    divIIa2.appendChild(span1);
		}
	    }
	}
	divIIa.appendChild(divIIa2);
	divII.appendChild(divIIa);
	var divIIb = new Element('div', {'style':'clear:both; padding-top: 15px;'});
	var no_item_fort = true;
	for (var j = 0; j < PK_S3.types.length; ++j){
	    var div1 = new Element('div', {'style':'float:left; width:39px;'});
	    var iID = PK_S3.resultaty[arr[i].ind].items[PK_S3.types[j]];
	    if (iID&&(iID>0)){
		if ((PK_S3.types[j]!='animal')&&(PK_S3.types[j]!='left_arm')){
		    no_item_fort = false;
		}
		var iobj = PK_S3.items[iID];
		var title = '<b>' + iobj.name + '</b><hr />';
		var is_f = true;
		for (var a in iobj.bonus.attributes){
		    if (!is_f){
			title += '<br />';
		    }
		    else{
			is_f = false;
		    }
		    title += '<b>' + Character.attribute_titles[a] + ':' + iobj.bonus.attributes[a] + '</b>';
		}
		for (var s in iobj.bonus.skills){
		    if (!is_f){
			title += '<br />';
		    }
		    else{
			is_f = false;
		    }
		    title += Character.skill_titles[s] + ':' + iobj.bonus.skills[s];
		}
		if (iobj.speed){
		    if (!is_f){
			title += '<br />';
		    }
		    else{
			is_f = false;
		    }
		    title += 'szybkość: '+Math.round(100/iobj.speed)+'%';
		}
		if ((iobj.type == 'left_arm')||(iobj.type == 'right_arm')){
		    if (!is_f){
			title += '<br />';
		    }
		    title += 'obrażenia: ' + iobj.damage.damage_min + ' - ' + iobj.damage.damage_max + ' (' + parseInt((iobj.damage.damage_min + iobj.damage.damage_max)/2, 10) + ' śred.)';
		};
		title += '<hr />';
		if (iobj.set.key){
		    title += iobj.set.name +'<hr />';
		};
		title += 'poziom: ' + (iobj.level ? iobj.level : '0') + '<br />';
		
		title += (PK_S3.svoi_veschi[iID]) ? 'cena: <b style="color:green">posiadasz go</b>' : (iobj.price = 0) ? 'cena: <b style="color:red">TYLKO OSIĄGNIĘCIA LUB SKRZYNIE</b>' : 'cena: <b style="color:red">$ ' + iobj.price + '</b>';
		title += '<br />można kupić na targu: ';
		title += (iobj.auctionable == true) ? 'tak':'nie';
		title += '<hr />Kliknij, aby założyć ten przedmiot'
		var aa = new Element ('a', {'href':'javascript:PK_S3.equip_add('+iID+');void(0);'});
		var classi = (PK_S3.svoi_veschi[iID]) ? 'bug_mini' : 'bug_mini_red';
		var img = new Element ('img', {'src':iobj.image_mini, 'class':classi, 'title':title});
		aa.appendChild(img);
		div1.appendChild(aa);
		if ((arr[i].ind < PK_S3.raboty.fort_min)||(arr[i].ind >= PK_S3.raboty.fort_max)){
		    var podp = new Element ('div', {'style':'text-align:center;'});
		    podp.textContent = PK_S3.resultaty[arr[i].ind].itemsto[PK_S3.types[j]];
		    div1.appendChild(podp);
		}
	    }
	    divIIb.appendChild(div1);
	}
	if (no_item_fort){
	    var div1 = new Element('div', {'style':'font-weight:bold;'});
	    div1.textContent = 'Nie ma ekwipunku, który wpływa na ten wybór!';
	    divIIb.appendChild(div1);
	}
	divII.appendChild(divIIb);
	div0.appendChild(divII);
	main.appendChild(div0);
    }
}

PK_S3.minimize_window_rezult = function(){
    AjaxWindow.toggleSize('pereodevalka_rezult');
    setTimeout(PK_S3.minimize_window_rezult2, 100);
};

PK_S3.minimize_window_rezult2 = function(){
    var bar = $('window_bar_pereodevalka_rezult');
    if (!bar){
        setTimeout(PK_S3.minimize_window_rezult2, 100);
	return;
    }
    bar.firstChild.firstChild.nextSibling.innerHTML='Wyniki';
};


PK_S3.show_window_rezultat = function (){
    var name = 'pereodevalka_rezult';
    var group = 'work';
    var window_div = $('window_' + name);
    
    if (!window_div){
	window_div = new Element('div',{'id':'window_' + name,'class':'window css_work'});
	AjaxWindow.windows[name] = window_div;
	window_div.injectInside('windows');
	window_div.centerLeft();
    }
    else{
	AjaxWindow.maximize (name);
	window_div.innerHTML = '';
    }
    AjaxWindow.bringToTop(window_div);

    var xhtml = '';
    xhtml += '<div class="window_borders">';
    xhtml += '  <h2 id="window_' + name + '_title" class="window_title"> </h2>';
    xhtml += '	<a class="window_refresh" href="javascript:AjaxWindow.close(\'' + name + '\'); PK_S3.show_window_rezultat();void(0)" title="<b>Odśwież okno</b>"></a>'
    xhtml += '  <a href="javascript:AjaxWindow.closeAll();" class="window_closeall" title="<b>Zamknij wszystkie okna</b>"></a>';
    xhtml += '  <a href="javascript:PK_S3.minimize_window_rezult();" class="window_minimize" title="<b>Minimalizuj okno</b>"></a>';
    xhtml += '  <a href="javascript:AjaxWindow.close(\'' + name + '\');" class="window_close" title="<b>Zamknij okno</b>"></a>';
    xhtml += '  <div id="window_' + name + '_content" class="window_content">';
    xhtml += '    	<table class="shadow_table" style="margin-left:6px; width:100%; height:370px">';
    xhtml += '    		<tr>';
    xhtml += '    			<td class="edge_shadow_top_left"></td>';
    xhtml += '    			<td class="border_shadow_top"></td>';
    xhtml += '    			<td class="edge_shadow_top_right"></td>';
    xhtml += '    		</tr>';
    xhtml += '    		<tr>';
    xhtml += '    			<td class="border_shadow_left"></td>';
    xhtml += '    			<td class="shadow_content">';
    xhtml += '    				<div style="overflow:none; width: 675px; height:370px; position: relative;" id="pk_s3_rezultaten_arbeiten">';
    xhtml += '    				</div>';
    xhtml += '    			</td>';
    xhtml += '    			<td class="border_shadow_right"></td>';
    xhtml += '    		</tr>';
    xhtml += '    		<tr>';
    xhtml += '    			<td class="edge_shadow_bottom_left"></td>';
    xhtml += '    			<td class="border_shadow_bottom"></td>';
    xhtml += '    			<td class="edge_shadow_bottom_right"></td>';
    xhtml += '	 		</tr>';
    xhtml += '    		<tr>';
    xhtml += '    			<td></td>';
    xhtml += '    			<td>'+paypal+'</td>';
    xhtml += '    			<td></td>';
    xhtml += '	 		</tr>';
    xhtml += '	 	</table>';
    xhtml += '	</div>';
    xhtml += '</div>';
    window_div.setHTML(xhtml);
	
    var window_title_div = $('window_' + name + '_title');
    window_div.makeDraggable({handle:window_title_div});
    window_title_div.addEvent('dblclick',function(){
				window_div.centerLeft();
				window_div.setStyle('top',133);
				});
    window_div.addEvent('mousedown',AjaxWindow.bringToTop.bind(AjaxWindow,[window_div]));
    window_title_div.addEvent('mousedown',AjaxWindow.bringToTop.bind(AjaxWindow,[window_div]));

    if (PK_S3.activity == 'nenuzhnoe'){
	PK_S3.vyvod_nenuzhnykh_items();
	return;
    }
    var wind = document.getElementById('pk_s3_rezultaten_arbeiten');
    var sortir = new Element('div', {'style':'padding: 2px; width:670px; height: 28px; border-bottom: 2px solid #321;'});
    var span = new Element('div', {'style':'padding: 3px; border-right: 2px solid #321; float:left; height:20px;'});
    span.textContent = 'Sortowanie :';
    sortir.appendChild(span);
    var span = new Element('div', {'style':'padding: 3px; border-right: 2px solid #321; float:left; height:20px;', 'id':'pk_s3_sortirovka_name'});
    span.innerHTML = '<a href="javascript:PK_S3.sortirovka_rabot(\'name\', PK_S3.vyvod.type)"><img src=\"../images/work/icons/work.png\" title=\"Nazwa\" /></a>'
    sortir.appendChild(span);
    var span = new Element('div', {'style':'padding: 3px; border-right: 2px solid #321; float:left; height:20px;', 'id':'pk_s3_sortirovka_opyt'});
    span.innerHTML = '<a href="javascript:PK_S3.sortirovka_rabot(\'opyt\', PK_S3.vyvod.type)"><img src=\"../images/work/icons/experience.png\" title=\"Doświadczenie\" /></a>';
    sortir.appendChild(span);
    var span = new Element('div', {'style':'padding: 3px; border-right: 2px solid #321; float:left; height:20px;', 'id':'pk_s3_sortirovka_dengi'});
    span.innerHTML = '<a href="javascript:PK_S3.sortirovka_rabot(\'dengi\', PK_S3.vyvod.type)"><img src=\"../images/work/icons/dollar.png\" title=\"Zarobek\" /></a>';
    sortir.appendChild(span);
    var span = new Element('div', {'style':'padding: 3px; border-right: 2px solid #321; float:left; height:20px;', 'id':'pk_s3_sortirovka_vezenie'});
    span.innerHTML = '<a href="javascript:PK_S3.sortirovka_rabot(\'vezenie\', PK_S3.vyvod.type)"><img src=\"../images/work/icons/luck.png\" title=\"Szczęscie\" /></a>';
    sortir.appendChild(span);
    var span = new Element('div', {'style':'padding: 3px; border-right: 2px solid #321; float:left; height:20px;', 'id':'pk_s3_sortirovka_boom'});
    span.innerHTML = '<a href="javascript:PK_S3.sortirovka_rabot(\'boom\', PK_S3.vyvod.type)"><img src=\"images/job/danger.png\" width="20" height="20" title=\"Niebezpieczeństwo\" /></a>';
    sortir.appendChild(span);
    var span = new Element('div', {'style':'padding: 3px; border-right: 2px solid #321; float:left; height:20px;', 'id':'pk_s3_sortirovka_to'});
    span.innerHTML = '<a href="javascript:PK_S3.sortirovka_rabot(\'to\', PK_S3.vyvod.type)"><img src=\"../images/work/icons/workpoints.png\" title=\"Punkty Pracy\" /></a>';
    sortir.appendChild(span);
    var span = new Element('div', {'style':'padding: 3px; border-right: 2px solid #321; float:left; height:20px;', 'id':'pk_s3_sortirovka_malus'});
    span.innerHTML = '<a href="javascript:PK_S3.sortirovka_rabot(\'malus\', PK_S3.vyvod.type)"><img src=\"../images/work/icons/malus.png\" title=\"Trudność\" /></a>';
    sortir.appendChild(span);
    var span = new Element('div', {'style':'padding: 3px; border-left: 2px solid #321; float:right; height:20px;'});
    var inp = new Element ('input', {'id':'pk_s3_sortirovka_native', 'title':'Brać pod uwagę obecne PP', 'type':'checkbox', 'checked':'true', 'style':'margin: 5px 5px 5px 0px;'});
    inp.addEventListener('change',function () {PK_S3.sortirovka_rabot(PK_S3.vyvod.type);}, false);
    span.appendChild(inp);
    sortir.appendChild(span);
    var span = new Element('div', {'style':'padding: 3px; border-left: 2px solid #321; float:right; height:20px;'});
    var valueto = (PK_S3.activity=='alljob')? 0 : -999;
    var inp = new Element ('input', {'id':'pk_s3_sortirovka_valueto', 'type':'text', 'size':'3', 'value':valueto, 'title':'Uwzględnij PP, ujemny pokaże pracę do których nam brakuje podana liczbę PP', 'style':'background-color:#e8dab3; margin: 0px 5px;'});
    inp.addEventListener('change',function () {this.value = parseInt(this.value); if (isNaN(this.value)) this.value=0; PK_S3.sortirovka_rabot(PK_S3.vyvod.type);}, false);
    span.appendChild(inp);
    sortir.appendChild(span);
    
    var span = new Element('div', {'style':'padding: 3px; border-left: 2px solid #321; float:right; height:21px; width:80px;'});
    var sel = new Element ('select', {'id':'restore_except_raboty','style':'background-color:#e8dab3; margin: 0px 1px; width: 50px; height:21px;'})
    var opt = new Element ('option', {'value':0});
    opt.textContent = '----';
    sel.appendChild(opt);
    for (var i = 1; i < 999; ++i){
	if (PK_S3.raboty[i] && PK_S3.raboty[i].except){
	    var opt = new Element ('option', {'value':i});
	    opt.textContent = PK_S3.raboty[i].rus_name;
	    sel.appendChild(opt);
	}
    }
    span.appendChild(sel);
    var img = new Element ('img', {'style':'width:23px; height:23px; background:url("../images/window/messages/icons.png") -25px -4px; display:inline; margin: 0px 2px;', 'src':'/images/transparent.png', 'title':'Przywróć'});
    img.addEventListener('click',function () {var sel = $('restore_except_raboty'); var ind = parseInt(sel.value, 10); if (ind > 0) PK_S3.except_raboty(ind, false);}, false);
    span.appendChild(img)

    sortir.appendChild(span);
    wind.appendChild(sortir);

    var text = new Element ('div',{'style':'margin:2px; width:675px; height:330px; overflow-y:scroll; overflow-x:none;', 'id':'pk_s3_rezultaten_arbeiten0'});
    text.value = (PK_S3.rezultat);
    wind.appendChild(text);

    PK_S3.sortirovka_rabot('name');
  
};


PK_S3.four_init = function (name){
    PK_S3.tekushaya_rabota = 0;
    PK_S3.resultaty = [];

    
    PK_S3.bonus.speed = (Character.characterClass != 'duelist') ? 1.0 : (PremiumBoni.hasBonus('character')) ? 1.2 : 1.1;
    PK_S3.bonus.money = (PremiumBoni.hasBonus('money')) ? 1.5 : 1.0;
    PK_S3.bonus.life = (Character.characterClass != 'soldier') ? 10 : (PremiumBoni.hasBonus('character')) ? 20 : 15;
    PK_S3.bonus.exp = (Character.characterClass) != 'worker' ? 1.0 : (PremiumBoni.hasBonus('character')) ? 1.1 : 1.05;
    PK_S3.bonus.build = (Character.characterClass) != 'worker' ? 1.0 : (PremiumBoni.hasBonus('character')) ? 1.1 : 1.05;
    PK_S3.bonus.weapon = (Character.characterClass != 'soldier') ? 0 : (PremiumBoni.hasBonus('character')) ? 6 : 3;

    PK_S3.setting = {};
    PK_S3.setting.knopka = 'poehali';
    PK_S3.setting.bablo = 0;
    PK_S3.setting.is_millioner = false;
    PK_S3.setting.is_auction = false;
    PK_S3.setting.is_drop = false;
    PK_S3.setting.is_luck = false;
    PK_S3.setting.is_unique = false;
    PK_S3.setting.level = Character.level
    PK_S3.setting.slots = {};
    var slot_id = 'pk_s3_select_slot_';
    for (var i = 0; i < PK_S3.types.length; ++i){
	PK_S3.setting.slots[i] = 0;
	PK_S3.setting.slots[PK_S3.types[i]] = PK_S3.setting.slots[i];
    }

    var hp = 0;
    PK_S3.setting.min_health = (hp - 90 - Character.level * 10 - Character.skills.health * PK_S3.bonus.life) / PK_S3.bonus.life;
    PK_S3.setting.porabotaem = [];
    PK_S3.setting.s4itaem_rabot = 0;
    PK_S3.setting.sej4as_rabota = 0;

    for (var ind = PK_S3.raboty.max - 1; ind > 0; --ind){
        if (PK_S3.raboty[ind]){
	    if ((PK_S3.raboty[ind].rus_name == name)||(PK_S3.raboty[ind].orig_name == name)){
		PK_S3.setting.porabotaem[ind] = true;
		++PK_S3.setting.s4itaem_rabot;
		break;
	    }
	}
    }
    var minimap_job = $('minimap_job_id');
    if (minimap_job){
	minimap_job.value = ind;
    }
    PK_S3.activity = 'onejob';
    PK_S3.rezultat = '';
    PK_S3.is_show_inventory = null;
    setTimeout(PK_S3.waiting_inventory, PK_S3.rekurs.delay);
}

PK_S3.second_init = function (){
    //clearInterval(PK_S3.progress.id);
    PK_S3.tekushaya_rabota = 0;
    PK_S3.resultaty = [];
    PK_S3.ispolzuemye = [];
    
    PK_S3.bonus.speed = (Character.characterClass != 'duelist') ? 1.0 : (PremiumBoni.hasBonus('character')) ? 1.2 : 1.1;
    PK_S3.bonus.money = (PremiumBoni.hasBonus('money')) ? 1.5 : 1.0;
    PK_S3.bonus.life = (Character.characterClass != 'soldier') ? 10 : (PremiumBoni.hasBonus('character')) ? 20 : 15;
    PK_S3.bonus.exp = (Character.characterClass) != 'worker' ? 1.0 : (PremiumBoni.hasBonus('character')) ? 1.1 : 1.05;
    PK_S3.bonus.build = (Character.characterClass) != 'worker' ? 1.0 : (PremiumBoni.hasBonus('character')) ? 1.1 : 1.05;
    PK_S3.bonus.weapon = (Character.characterClass != 'soldier') ? 0 : (PremiumBoni.hasBonus('character')) ? 6 : 3;

    PK_S3.setting = {};
    PK_S3.setting.knopka = (this.id == 'pk_s3_poehali') ? 'poehali' : 'to';
    PK_S3.setting.bablo = parseInt(document.getElementById('pk_s3_select_baks_n').value,10);
    PK_S3.setting.is_millioner = document.getElementById('pk_s3_select_baks_inf').checked;
    PK_S3.setting.is_auction = document.getElementById('pk_s3_select_auction').checked;
    //PK_S3.setting.is_drop = document.getElementById('pk_s3_select_drop').checked;
    PK_S3.setting.is_unique = document.getElementById('pk_s3_select_unique').checked;
    PK_S3.setting.is_luck = document.getElementById('pk_s3_select_season').checked;
    PK_S3.setting.level = parseInt(document.getElementById('pk_s3_select_level').value,10);
    if (PK_S3.setting.level<=0) PK_S3.setting.level = Character.level
    PK_S3.setting.slots = {};
    var slot_id = 'pk_s3_select_slot_';
    for (var i = 0; i < PK_S3.types.length; ++i){
	elc = document.getElementById(slot_id + i);
	PK_S3.setting.slots[i] = parseInt(elc.value, 10);;
	PK_S3.setting.slots[PK_S3.types[i]] = PK_S3.setting.slots[i];
    }

    var hp = parseInt(document.getElementById('pk_s3_select_hp').value,10);
    PK_S3.setting.min_health = (hp - 90 - Character.level * 10 - Character.skills.health * PK_S3.bonus.life) / PK_S3.bonus.life;
    PK_S3.setting.porabotaem = [];
    PK_S3.setting.s4itaem_rabot = 0;
    PK_S3.setting.sej4as_rabota = 0;
    
    var els = document.getElementById('pk_s3_select_rab');
    var el = document.getElementById('pk_s3_select_rab_ro');
    if (el.checked){
	var ind = parseInt(els.value, 10);
	PK_S3.setting.porabotaem[ind] = true;
	++PK_S3.setting.s4itaem_rabot;
	PK_S3.activity = 'onejob';
	var minimap_job = $('minimap_job_id');
	if (minimap_job){
	    minimap_job.value = ind;
	}
    }
    el = document.getElementById('pk_s3_select_rab_rn');
    if (el.checked){
	for (var i = 0; i < els.options.length; ++i){
	    if (els.options[i] && els.options[i].selected){
		var ind = parseInt(els.options[i].value, 10)
		PK_S3.setting.porabotaem[ind] = true;
		++PK_S3.setting.s4itaem_rabot;
	    }
	}
	PK_S3.activity = 'morejob';
    }
    el = document.getElementById('pk_s3_select_rab_rv');
    if (el.checked){
	for (var ind = 0; ind < PK_S3.raboty.max; ++ind){
	    if (PK_S3.raboty[ind]&&(!PK_S3.raboty[ind].except)){
		PK_S3.setting.porabotaem[ind] = true;
		++PK_S3.setting.s4itaem_rabot;
	    }
	}
	if (!PK_S3.raboty[PK_S3.raboty.build].except){
	    PK_S3.setting.porabotaem[PK_S3.raboty.build] = true;
	    ++PK_S3.setting.s4itaem_rabot;
	}
	if (!PK_S3.raboty[PK_S3.raboty.energy].except){
	    PK_S3.setting.porabotaem[PK_S3.raboty.energy] = true;
	    ++PK_S3.setting.s4itaem_rabot;
	}
	if (!PK_S3.raboty[PK_S3.raboty.health].except){
	    PK_S3.setting.porabotaem[PK_S3.raboty.health] = true;
	    ++PK_S3.setting.s4itaem_rabot;
	}
	if (!PK_S3.raboty[PK_S3.raboty.moving].except){
	    PK_S3.setting.porabotaem[PK_S3.raboty.moving] = true;
	    ++PK_S3.setting.s4itaem_rabot;
	}
	PK_S3.activity = 'alljob';
    }
    var el = document.getElementById('pk_s3_select_rab_do');
    if (el.checked){
	var ind = parseInt(els.value, 10);
	PK_S3.setting.porabotaem[ind] = true;
	++PK_S3.setting.s4itaem_rabot;
	PK_S3.activity = 'oneduel';
    }
    el = document.getElementById('pk_s3_select_rab_dn');
    if (el.checked){
	for (var i = 0; i < els.options.length; ++i){
	    if (els.options[i] && els.options[i].selected){
		var ind = parseInt(els.options[i].value, 10)
		PK_S3.setting.porabotaem[ind] = true;
		++PK_S3.setting.s4itaem_rabot;
	    }
	}
	PK_S3.activity = 'moreduel';
    }
    el = document.getElementById('pk_s3_select_rab_dv');
    if (el.checked){
	for (var ind = PK_S3.raboty.duel_min; ind < PK_S3.raboty.duel_max; ++ind){
	    if (PK_S3.raboty[ind]&&(!PK_S3.raboty[ind].except)){
		PK_S3.setting.porabotaem[ind] = true;
		++PK_S3.setting.s4itaem_rabot;
	    }
	}
	PK_S3.activity = 'allduel';
    }
    var el = document.getElementById('pk_s3_select_rab_fo');
    if (el.checked){
	var ind = parseInt(els.value, 10);
	PK_S3.setting.porabotaem[ind] = true;
	++PK_S3.setting.s4itaem_rabot;
	PK_S3.activity = 'onefort';
    }
    el = document.getElementById('pk_s3_select_rab_fn');
    if (el.checked){
	for (var i = 0; i < els.options.length; ++i){
	    if (els.options[i] && els.options[i].selected){
		var ind = parseInt(els.options[i].value, 10)
		PK_S3.setting.porabotaem[ind] = true;
		++PK_S3.setting.s4itaem_rabot;
	    }
	}
	PK_S3.activity = 'morefort';
    }
    el = document.getElementById('pk_s3_select_rab_fv');
    if (el.checked){
	for (var ind = PK_S3.raboty.fort_min; ind < PK_S3.raboty.fort_max; ++ind){
	    if (PK_S3.raboty[ind]&&(!PK_S3.raboty[ind].except)){
		PK_S3.setting.porabotaem[ind] = true;
		++PK_S3.setting.s4itaem_rabot;
	    }
	}
	PK_S3.activity = 'allfort';
    }
    var el = document.getElementById('pk_s3_select_rab_oo');
    if (el.checked){
	var el1 = document.getElementById('pk_s3_select_nav');
	var ind = parseInt(el1.value, 10);
	if (ind < 100){ // Umiejętności
	    var nav = PK_S3.skills[ind]
	    for (var is = 1; is < PK_S3.raboty.max; ++is){
		if (!PK_S3.raboty[is]) continue;
		for (var ind1 in PK_S3.raboty[is].navyki){
		    if (ind1 == nav){
			PK_S3.setting.porabotaem[is] = true;
			++PK_S3.setting.s4itaem_rabot;
		    }
		}
	    }
	    for (var ind1 in PK_S3.raboty[PK_S3.raboty.build]){
		if (ind1 == nav){
		    PK_S3.setting.porabotaem[PK_S3.raboty.build] = true;
		    ++PK_S3.setting.s4itaem_rabot;
		}
	    }
	    if (nav == 'ride'){
		PK_S3.setting.porabotaem[PK_S3.raboty.moving] = true;
		++PK_S3.setting.s4itaem_rabot;
	    }
	}
	else{
	    var atr = PK_S3.attributes[ind - 100];
	    var navs = Character.skill_names[atr].toString().split(',');
	    navb = {};
	    for (var i = 0; i < navs.length; ++i){
		navb[navs[i]] = true;
	    }
	    for (var ia = 1; ia < PK_S3.raboty.max; ++ia){
		if (!PK_S3.raboty[ia]) continue;
		var count = 0;
		for (var ind1 in PK_S3.raboty[ia].navyki){
		    if (navb[ind1]){
			count += PK_S3.raboty[ia].navyki[ind1];
		    }
		}
		if (count >= 3){
		    PK_S3.setting.porabotaem[ia] = true;
		    ++PK_S3.setting.s4itaem_rabot;
		}
	    }
	    if (atr=='strength'){
		PK_S3.setting.porabotaem[PK_S3.raboty.build] = true;
		++PK_S3.setting.s4itaem_rabot;
	    }
	}
	PK_S3.activity = 'skill';
    }
    var el = document.getElementById('pk_s3_select_rab_on');
    if (el.checked){
	var el1 = document.getElementById('pk_s3_select_product');
	var ind = parseInt(el1.value, 10);
	for (var id = 0; id < PK_S3.raboty.max; ++id){
	    if (!PK_S3.raboty[id]) continue;
	    
	    for (var ind1 in PK_S3.raboty[id].resultaty.produkty){
		if (ind == ind1){
		    PK_S3.setting.porabotaem[id] = true;
		    ++PK_S3.setting.s4itaem_rabot;
		    var minimap_job = $('minimap_job_id');
		    if (minimap_job){
			minimap_job.value = id;
		    }
		}
	    }
	}
	PK_S3.activity = 'produkt';
    }
    var el = document.getElementById('pk_s3_select_rab_ov');
    if (el.checked){
	for (var ind = 0; ind < 999; ++ind){
	    if (PK_S3.raboty[ind]&&(!PK_S3.raboty[ind].except)){
		PK_S3.setting.porabotaem[ind] = true;
		++PK_S3.setting.s4itaem_rabot;
	    }
	}
	PK_S3.activity = 'nenuzhnoe';
    }
    var el = document.getElementById('pk_s3_select_konstr_en');
    if (el.checked){
	PK_S3.raboty[999] = {rus_name:'Konstruktor', name:'constructor', malus:0, navyki:{}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};
	var el1 = document.getElementById('pk_s3_select_konstr_to');
	PK_S3.raboty[999].malus = parseInt (el1.value, 10);
	for (var j = 0; j < 4; ++j){
	    var el2 = document.getElementById('pk_s3_select_konstr_a'+j);
	    var val = parseFloat(el2.value, 10);
	    if (val > 0){
		PK_S3.raboty[999].navyki[PK_S3.attributes[j]] = val;
	    }
	}
	for (var i = 0; i < 20; ++i){
	    var el2 = document.getElementById('pk_s3_select_konstr_s'+i);
	    var val = parseFloat(el2.value, 10);
	    if (val > 0){
		PK_S3.raboty[999].navyki[PK_S3.skills[i]] = val;
	    }
	}
	PK_S3.setting.porabotaem[999]=true;
	++PK_S3.setting.s4itaem_rabot;
	PK_S3.activity = 'construct';
    }
    if (PK_S3.setting.porabotaem.length == 0) PK_S3.setting.porabotaem[0] = true;
    PK_S3.rezultat = '';
    PK_S3.is_show_inventory = null;
    setTimeout(PK_S3.waiting_inventory, PK_S3.rekurs.delay);
    
}

PK_S3.waiting_inventory = function (){
    if (PK_S3.text_info == '') PK_S3.restore_text_message();
    if ((wman.getById(Wear.uid)) && (Bag.loaded)){
	var sl='';
	for (var i in Wear.wear) sl+=i;
	if ((sl=='')&&(PK_S3.is_show_inventory < 18)){
	    setTimeout(PK_S3.waiting_inventory, 1000);
	    return;
	}
	PK_S3.parsing_inventory();
	return;
    }
    if (!PK_S3.is_show_inventory){
	PK_S3.is_show_inventory = 0;
	Wear.open();
	//AjaxWindow.show('inventory');
	PK_S3.show_text_message('Otwieranie ekwipunku...',2000);
	setTimeout(function () {el = $('window_pereodevalka_setting'); if (el) AjaxWindow.bringToTop(el);}, 333);
    }
    if (PK_S3.is_show_inventory++ < 20){
	setTimeout(PK_S3.waiting_inventory, 1000);
    }
    else{
	PK_S3.show_popup_message ('error', 'Otwórz ponownie ekwipunek');
    }
};

PK_S3.show_popup_message = function (state, str){
    new HumanMessage(str, {type: state});
}

PK_S3.show_text_message = function (str, delay){
    if (PK_S3.text_info == ''){
	PK_S3.restore_text_message();
    }
    var current_task = $('current_task_box_text');
    if (!current_task) return;
    current_task.textContent = str;
    setTimeout (PK_S3.restore_text_message, delay);
}

PK_S3.restore_text_message = function (){
    var current_task = $('current_task_box_text');
    if (!current_task) return;
    if (PK_S3.text_info==''){
	PK_S3.text_info = current_task.innerHTML;
    }
    else{
	current_task.innerHTML = PK_S3.text_info;
	PK_S3.text_info = '';
    }
}

PK_S3.compare_item = function (obj){
    var cID = obj.item_id;
    var opisv = false;
    if (!PK_S3.items[cID]){return {err:false, mis:true, opis:false}; }
    if (!PK_S3.items[cID].item_id) {return {err:false, mis:true, opis:false}; }
    if (cID != PK_S3.items[cID].item_id) {return {err:true, mis:false, opis:false}; }
    if (!PK_S3.items[cID].type) {return {err:false, mis:true, opis:false}; }
    if (obj.type != PK_S3.items[cID].type) {return {err:true, mis:false, opis:false}; }
    if ((obj.level != PK_S3.items[cID].level)&&(obj.level)&&(PK_S3.items[cID].level)) {return {err:true, mis:false, opis:false}; }
    if ((obj.price != PK_S3.items[cID].price)&&(obj.price)&&(PK_S3.items[cID].price)) {return {err:true, mis:false, opis:false}; }
    if (obj.characterClass != PK_S3.items[cID].characterClass) {return {err:true, mis:false, opis:false}; }
    if (obj.characterSex != PK_S3.items[cID].characterSex) {return {err:true, mis:false, opis:false}; }
    if (!obj.speed){
	if (PK_S3.items[cID].speed)	return {err:true, mis:false, opis:false};
    }
    else{
	if (!PK_S3.items[cID].speed)	return {err:false, mis:true, opis:false};
	if (obj.speed!=PK_S3.items[cID].speed)	return {err:true, mis:false, opis:false};
    }
    for (var i = PK_S3.skills.length - 1; i >= 0; --i){
	var skill_name = PK_S3.skills[i];
	if (obj.bonus.skills[skill_name]&&PK_S3.items[cID].bonus.skills[skill_name]){
	    if (obj.bonus.skills[skill_name]!=PK_S3.items[cID].bonus.skills[skill_name])	return {err:true, mis:false, opis:false};
	}
	else if (obj.bonus.skills[skill_name])	    return {err:false, mis:true, opis:false};
	else if (PK_S3.items[cID].bonus.skills[skill_name])    return {err:true, mis:false, opis:false};	
    }
    for (var i = PK_S3.attributes.length - 1; i >= 0; --i){
	var attribute_name = PK_S3.attributes[i];
	if (obj.bonus.attributes[attribute_name]&&PK_S3.items[cID].bonus.attributes[attribute_name]){
	    if (obj.bonus.attributes[attribute_name]!=PK_S3.items[cID].bonus.attributes[attribute_name])	return {err:true, mis:false, opis:false};
	}
	else if (obj.bonus.attributes[attribute_name])	    return {err:false, mis:true, opis:false};
	else if (PK_S3.items[cID].bonus.attributes[attribute_name])    return {err:true, mis:false, opis:false};
    }

    if (obj.bonus.fortbattle){
	if (!PK_S3.items[cID].bonus.fortbattle)	return {err:false, mis:true, opis:false};
	for (var i = PK_S3.fort_affects.length - 1; i >= 0; --i){
	    if (obj.bonus.fortbattle[PK_S3.fort_affects[i]]){
		if (!PK_S3.items[cID].bonus.fortbattle[PK_S3.fort_affects[i]])	return {err:false, mis:true, opis:false};
		if (obj.bonus.fortbattle[PK_S3.fort_affects[i]] != PK_S3.items[cID].bonus.fortbattle[PK_S3.fort_affects[i]])	return {err:true, mis:false, opis:false};
	    }
	    else{
		if (PK_S3.items[cID].bonus.fortbattle[PK_S3.fort_affects[i]])	return {err:true, mis:false, opis:false};
	    }
	}
    }
    else{
	if (PK_S3.items[cID].bonus.fortbattle)	return {err:true, mis:false, opis:false};
    }
    for (var i = PK_S3.fort_affects.length - 1; i >= 0; --i){
	if (obj.bonus.fortbattlesector[PK_S3.fort_affects[i]]){
	    if (!PK_S3.items[cID].bonus.fortbattlesector[PK_S3.fort_affects[i]])	return {err:false, mis:true, opis:false};
	    if (obj.bonus.fortbattlesector[PK_S3.fort_affects[i]] != PK_S3.items[cID].bonus.fortbattlesector[PK_S3.fort_affects[i]])	return {err:true, mis:false, opis:false};
	}
	else{
	    if (PK_S3.items[cID].bonus.fortbattlesector[PK_S3.fort_affects[i]])	return {err:true, mis:false, opis:false};
	}
    }
    if (!obj.set){
	if (PK_S3.items[cID].set.key)	return {err:true, mis:false, opis:false};
    }
    else{
	if (!PK_S3.items[cID].set.key)	return {err:false, mis:true, opis:false};
	if (obj.set.key!=PK_S3.items[cID].set.key)	return {err:true, mis:false, opis:false};
	if (PK_S3.vyvod.region=='ru'){
	    if (obj.set.name!=PK_S3.items[cID].set.name)	opisv=true;
	}
    }
    if (!obj.damage){
	if (PK_S3.items[cID].damage)	return {err:true, mis:false, opis:false};
    }
    else{
	if (!PK_S3.items[cID].damage)	return {err:false, mis:true, opis:false};
	if (obj.damage.damage_min!=PK_S3.items[cID].damage.damage_min)	return {err:true, mis:false, opis:false};
	if (obj.damage.damage_max!=PK_S3.items[cID].damage.damage_max)	return {err:true, mis:false, opis:false};
    }
    if (!obj.traderlevel){
	if (PK_S3.items[cID].traderlevel)	return {err:true, mis:false, opis:false};
    }
    else{
	if (!PK_S3.items[cID].traderlevel)	return {err:false, mis:true, opis:false};
	if (obj.traderlevel!=PK_S3.items[cID].traderlevel)	return {err:true, mis:false, opis:false};
    }
    if (!obj.auctionable){
	if (PK_S3.items[cID].auctionable)	return {err:true, mis:false, opis:false};
    }
    else{
	if (!PK_S3.items[cID].auctionable)	return {err:false, mis:true, opis:false};
    }
    if (!obj.dropable){
	if (PK_S3.items[cID].dropable)	return {err:true, mis:false, opis:false};
    }
    else{
	if (!PK_S3.items[cID].dropable)	return {err:false, mis:true, opis:false};
    }
    
    if (!obj.tradeable){
	if (PK_S3.items[cID].tradeable)	return {err:true, mis:false, opis:false};
    }
    else{
	if (!PK_S3.items[cID].tradeable)	return {err:false, mis:true, opis:false};
    }
    
    if (!obj.sellable){
	if (PK_S3.items[cID].sellable)	return {err:true, mis:false, opis:false};
    }
    else{
	if (!PK_S3.items[cID].sellable)	return {err:false, mis:true, opis:false};
    }
//sub_type
    if (!obj.sub_type){
	if (PK_S3.items[cID].sub_type)	return {err:true, mis:false, opis:false};
    }
    else{
	if (obj.sub_type!=PK_S3.items[cID].sub_type)	return {err:true, mis:false, opis:false};
    }
    if (obj.short != PK_S3.items[cID].nshort)	opisv = true;
    if (PK_S3.vyvod.region=='ru'){
	if (obj.name != PK_S3.items[cID].name)	opisv = true;
    }
    if (obj.image != PK_S3.items[cID].image)	opisv = true;
    if (obj.image_mini != PK_S3.items[cID].image_mini)	opisv = true;
    return {err:false, mis:false, opis:opisv};
};

PK_S3.assign_item = function (obj){
    var cID = obj.item_id;
    PK_S3.items[cID] = {item_id:obj.item_id, nshort:obj.short, name:obj.name, type:obj.type, level:obj.level, price:obj.price, image:obj.image, image_mini:obj.image_mini, characterClass:obj.characterClass, characterSex:obj.characterSex, speed:obj.speed, bonus:obj.bonus, set:obj.set, traderlevel:obj.traderlevel, auctionable:obj.auctionable, dropable:obj.dropable, tradeable:obj.tradeable, sellable:obj.sellable};
    if (!PK_S3.items[cID].bonus)	PK_S3.items[cID].bonus	= {};
    if (!PK_S3.items[cID].bonus.skills)	PK_S3.items[cID].bonus.skills = {};
    if (!PK_S3.items[cID].bonus.attributes)	PK_S3.items[cID].bonus.attributes = {};
    if (!PK_S3.items[cID].bonus.fortbattle)	PK_S3.items[cID].bonus.fortbattle = {};
    if (!PK_S3.items[cID].bonus.fortbattlesector)	PK_S3.items[cID].bonus.fortbattlesector = {};
    if (!PK_S3.items[cID].set)	PK_S3.items[cID].set = {key:null, name:null};
    if (obj.damage)	PK_S3.items[cID].damage = obj.damage;
    if (obj.sub_type)	PK_S3.items[cID].sub_type = obj.sub_type;
};

PK_S3.print_item = function (cID){
    var str='';
    obj = PK_S3.items[cID];
    str += '    PK_S3.items['+cID+'] = {item_id:'+cID+', nshort:\''+obj.nshort;
    var cl = (obj.level) ? obj.level : '0'
    str += '\', name:\'' + obj.name + '\', type:\''+obj.type+'\', level:'+cl;
    var cp = obj.price ? obj.price : 0;
    str += ', price:'+cp+', image:\''+obj.image+'\', image_mini:\''+obj.image_mini+'\'';
    if (obj.characterClass) str += ', characterClass:\''+ obj.characterClass + '\'';
    if (obj.characterSex) str += ', characterSex:\'' + obj.characterSex + '\'';
    if (obj.speed) str += ', speed:' + obj.speed;
    str += ', bonus:{skills:{';

    var ss = false;
    for (var i = PK_S3.skills.length - 1; i >= 0; --i){
	if (obj.bonus.skills[PK_S3.skills[i]]){
	    if (ss){
		str += ', ';
	    }
	    else ss = true;
	    str += PK_S3.skills[i]+':'+obj.bonus.skills[PK_S3.skills[i]];
	}
    }
    str += '}, attributes:{';
    var aa = false;
    for (var i = PK_S3.attributes.length - 1; i >= 0; --i){
	if (obj.bonus.attributes[PK_S3.attributes[i]]){
	    if (aa){
		str += ', ';
	    }
	    else aa = true;
	    str += PK_S3.attributes[i]+':'+obj.bonus.attributes[PK_S3.attributes[i]];
	}
    }
    str += '}, fortbattle:{';
    var fb = false;
    for (var i = PK_S3.fort_affects.length - 1; i >= 0; --i){
	if (obj.bonus.fortbattle[PK_S3.fort_affects[i]]){
	    if (fb){
		str += ', ';
	    }
	    else fb = true;
	    str += PK_S3.fort_affects[i]+':'+obj.bonus.fortbattle[PK_S3.fort_affects[i]];
	}
    }
    str += '}, fortbattlesector:{';
    var fb = false;
    for (var i = PK_S3.fort_affects.length - 1; i >= 0; --i){
	if (obj.bonus.fortbattlesector[PK_S3.fort_affects[i]]){
	    if (fb){
		str += ', ';
	    }
	    else fb = true;
	    str += PK_S3.fort_affects[i]+':'+obj.bonus.fortbattlesector[PK_S3.fort_affects[i]];
	}
    }
    str += '}}, set:{'
    if (obj.set.key) {
	str += 'key:\'' + obj.set.key + '\', name:\'' + obj.set.name + '\'';
    }
    str += '}';
    if (obj.traderlevel) str += ', traderlevel:' + obj.traderlevel;
    if (obj.auctionable) str += ', auctionable:' + obj.auctionable;
    if (obj.dropable) str += ', dropable:' + obj.dropable;
    if (obj.tradeable) str += ', tradeable:' + obj.tradeable;
    if (obj.sellable) str += ', sellable:' + obj.sellable;
    if (obj.damage){
	str += ', damage:{damage_min:' + obj.damage.damage_min + ', damage_max:' + obj.damage.damage_max + '}';
    }
    if (obj.sub_type){
	str += ', sub_type:\'' + obj.sub_type +'\'';
    }
    str += '};\n';
    return str;
}

PK_S3.parsing_inventory = function (){
    var bagazh = Bag.items;
    var odezhda = Wear.wear;
    PK_S3.svoi_veschi = [];
    PK_S3.vozmozhnye_veschi = [];
    PK_S3.nado_veschi = [];
    for (var i = 0; i < PK_S3.types.length; ++i){
	var typ = PK_S3.types[i];
	for (var vv in bagazh[typ]){
	    if (!bagazh[typ][vv].obj) continue;
	    var compar = PK_S3.compare_item(bagazh[typ][vv].obj);
	    if (compar.err||compar.mis||compar.opis){
	        PK_S3.assign_item(bagazh[typ][vv].obj);
	        PK_S3.informer += compar.err ? 'Informacje o przedmiocie są nieprawidłowe, wer.:'+PrzVer+'[code]\n' : compar.mis ? 'Brak danych o przedmiocie, wer.:'+PrzVer+'[code]\n' : 'Błędne dane o przedmiocie, wer.:'+PrzVer+'[code]\n'
	        PK_S3.informer += PK_S3.print_item(bagazh[typ][vv].obj.item_id) + '[/code]\n';
	    }
	    PK_S3.svoi_veschi[bagazh[typ][vv].obj.item_id] = true;
	}
    }
    for (var i = 0; i < PK_S3.types.length; ++i){
	if (odezhda[PK_S3.types[i]]){
	    var compar = PK_S3.compare_item(odezhda[PK_S3.types[i]].obj);
	    if (compar.err||compar.mis||compar.opis){
		PK_S3.assign_item(odezhda[PK_S3.types[i]].obj);
		PK_S3.informer += compar.err ? 'Informacje o przedmiocie są nieprawidłowe, wer.:'+PrzVer+'[code]\n' : compar.mis ? 'Brak danych o przedmiocie, wer.:'+PrzVer+'[code]\n' : 'Błędne dane o przedmiocie, wer.:'+PrzVer+'[code]\n';
		PK_S3.informer += PK_S3.print_item(odezhda[PK_S3.types[i]].obj.item_id) + '[/code]\n';
	    }
	    PK_S3.svoi_veschi[odezhda[PK_S3.types[i]].obj.item_id] = true;
	    if (PK_S3.setting.slots[i] == 98){// забинден предмет из экипировки.
		PK_S3.setting.slots[i] = odezhda[PK_S3.types[i]].obj.item_id;
		PK_S3.setting.slots[PK_S3.types[i]] = odezhda[PK_S3.types[i]].obj.item_id;
	    }
	}
	else{
	    if (PK_S3.setting.slots[i] == 98){// забинден пустой слот из экипировки
		PK_S3.setting.slots[i] = 99;
		PK_S3.setting.slots[PK_S3.types[i]] = 99;
	    }
	}
    }
    if (PK_S3.informer != ''){
	PK_S3.show_window_informer();
    }
    PK_S3.otbor_vozmozhnyh()
};

PK_S3.otbor_vozmozhnyh = function (){
    for (var id in PK_S3.items){
	if (isNaN(id)) continue;
	var obj = PK_S3.items[id];
	// 0 - перебор, 99 - пустота, 98 - экипировка
	// отсекаем рецепты, и прочий крафт - там undefined
	if (PK_S3.setting.slots[obj.type] != 0) continue; 
	if (obj.characterClass&&(obj.characterClass != Character.characterClass)) continue;
	if (obj.characterSex&&(obj.characterSex != Character.characterSex)) continue;
	var lvl = PK_S3.setting.level;
	if ((obj.type=='left_arm')||(obj.type=='right_arm')) lvl += PK_S3.bonus.weapon;
	if (obj.level&&(obj.level>lvl)) continue;
	var add = false;
	if (!PK_S3.svoi_veschi[id]){// предмета в рюкзаке/экипировке нет. проверка на покупку/нахождение
	    var is_shop = obj.tradeable && obj.traderlevel && (obj.traderlevel <= 15);
	    if (is_shop){	// торгуется в магазинах
		if (PK_S3.setting.is_millioner){
		    add = true;
		}
		else if (PK_S3.setting.bablo >= obj.price){
		    add = true;
		}
	    }
	    if (PK_S3.setting.is_auction){
		if (obj.auctionable && !is_shop){
		    if (PK_S3.setting.is_millioner){
			add = true
		    }
		    else if (PK_S3.setting.bablo >= obj.price){
			add = true;
		    }
		}
	    }
	    if (PK_S3.setting.is_drop){	// удача, удача и ещё раз удача :)
		if (obj.dropable&& !is_shop){
		    add = true;
		}
	    }
	    if (PK_S3.setting.is_unique && !is_shop && !obj.auctionable && !obj.dropable){
		add = true;
	    }
	}
	else{	// своя вещь
	    add = true; 
	}
	if (add) PK_S3.vozmozhnye_veschi[id] = true;
    }
    // проверяем "бинды" экипировки/вещей
    for (var i = 0; i < 10; ++i){
	if (PK_S3.setting.slots[i] != 0){
	    if (PK_S3.setting.slots[i] == 99) continue;
	    PK_S3.vozmozhnye_veschi[PK_S3.setting.slots[i]] = true;
	    PK_S3.nado_veschi[PK_S3.setting.slots[i]] = true;
	}
    }
    if (PK_S3.setting.knopka=='poehali'){
	setTimeout(PK_S3.otbor_nuzhnykh, PK_S3.rekurs.delay);
    }
    else{
	setTimeout(PK_S3.prostoj_otbor_to, PK_S3.rekurs.delay);
    }
}

PK_S3.summa_to = function (bonus, navyki){
    var to = 0;
    for (var num_index in navyki){
	if (bonus.skills[num_index]){
	    to += bonus.skills[num_index] * navyki[num_index];
	}
	if (PK_S3.skill2atr[num_index] && bonus.attributes[PK_S3.skill2atr[num_index]]){
	    to+=bonus.attributes[PK_S3.skill2atr[num_index]] * navyki[num_index];
	}
	if (bonus.attributes[num_index]){
	    to += bonus.attributes[num_index] * navyki[num_index];
	}
    }
    return to;
};

PK_S3.summa_to2 = function (bonus, navyki){
    var to = 0;
    for (var num_index in navyki){
	if (bonus.skills[num_index]){
	    to += bonus.skills[num_index] * navyki[num_index];
	}
	else if (bonus.attributes[num_index]){
	    to += bonus.attributes[num_index] * navyki[num_index];
	}
    }
    
    return to;
}

PK_S3.cena_pods4eta = function(obj){
    var cID = obj.item_id;
    if (PK_S3.svoi_veschi[cID]) return 0;
    if (PK_S3.nado_veschi[cID]) return 0;
    var is_shop = obj.tradeable && obj.traderlevel && (obj.traderlevel <= 15);
    if (is_shop && PK_S3.setting.is_millioner)	return 0;
    if (obj.auctionable && !is_shop && PK_S3.setting.is_auction){
	if (PK_S3.setting.is_millioner){
	    return 0;
	}
    }
    if (obj.dropable &&  !is_shop && PK_S3.setting.is_drop)	return 0;
    if (PK_S3.setting.is_unique && !is_shop && !obj.auctionable && !obj.dropable) return 0;
    return obj.price;
}

PK_S3.prostoj_otbor_to = function(){
    for (var irabota in PK_S3.setting.porabotaem){
	if (isNaN(irabota))	continue;
	if (!PK_S3.setting.porabotaem[irabota])	continue;
	PK_S3.setting.porabotaem[irabota] = false;
	++PK_S3.setting.sej4as_rabota;
	if (irabota==0) {PK_S3.show_popup_message('error', 'Сначала выберите работу, дуэль, форт, конструктор или спец. перебор'); setTimeout(PK_S3.otbor_nuzhnykh, 100);continue};
	PK_S3.tekushaya_rabota = irabota;
	var crabota = PK_S3.raboty[irabota];
	var is_duel = ((irabota >= PK_S3.raboty.duel_min)&&(irabota < PK_S3.raboty.duel_max)) ? true : false;
	var hand_shot = Character.skills.punch - Character.skills.shot;
	if (is_duel){
	    if (crabota.navyki.punch){
		hand_shot = 100;
	    }
	    else if (crabota.navyki.shot){
		hand_shot = -100;
	    }
	}
	if (PK_S3.vyborka_to){
	    PK_S3.vyborka_to = null;
	}
	PK_S3.vyborka_to = [];
	for (var i = 0; i < PK_S3.types.length; ++i){
	    PK_S3.vyborka_to[PK_S3.types[i]] = [];
	    PK_S3.vyborka_to[PK_S3.types[i]].push ({bonus:0, id:0});
	}
	for (var i in PK_S3.vozmozhnye_veschi){
	    if (isNaN(i)) continue;
	    var cID = i;
	    var vesch = PK_S3.items[cID];
	    var ochki = PK_S3.summa_to(vesch.bonus, crabota.navyki);
	    if (is_duel&&(vesch.type=='right_arm')){
		ochki += (vesch.damage.damage_min + vesch.damage.damage_max)/2;
		if (vesch.sub_type=='hand'){
		    ochki += hand_shot;
		}
		if (vesch.sub_type=='shot'){
		    ochki -= hand_shot;
		}
	    }
	    if ((ochki > 0)){
		for (var ind = PK_S3.vyborka_to[vesch.type].length; ind > 0; --ind){
		    if (PK_S3.vyborka_to[vesch.type][ind-1].bonus < ochki){
			if (PK_S3.vyborka_to[vesch.type].length == ind){
			    PK_S3.vyborka_to[vesch.type].push ({bonus: ochki, id: cID});
			}
			else{
			    PK_S3.vyborka_to[vesch.type].splice (ind, 0, {bonus: ochki, id: cID})
			}
			break;
		    }
		}
		if ((ind == 0)&&(PK_S3.vyborka_to[vesch.type].length < PK_S3.vsego_s_TO)){
		    PK_S3.vyborka_to[vesch.type].unshift ({bonus:ochki, id: cID})
		}
		else if (PK_S3.vyborka_to[vesch.type].length > PK_S3.vsego_s_TO){
		    PK_S3.vyborka_to[vesch.type].shift();
		}
	    }
	}
	for (var j = 0; is_duel && (j < PK_S3.vyborka_to.right_arm.length); ++j){
	    PK_S3.vyborka_to.right_arm[j].bonus -= (vesch.damage.damage_min + vesch.damage.damage_max)/2;
	    if (vesch.sub_type=='hand'){
		PK_S3.vyborka_to.right_arm[j].bonus -= hand_shot;
	    }
	    if (vesch.sub_type=='shot'){
		PK_S3.vyborka_to.right_arm[j].bonus += hand_shot;
	    }
	}
	PK_S3.podgotavlivaem_rezultat_to();
    }
    PK_S3.vyvod_prostyh_rabot();
}

PK_S3.otbor_nuzhnykh = function(){
    for (var irabota in PK_S3.setting.porabotaem){
	if (isNaN(irabota))	continue;
	if (!PK_S3.setting.porabotaem[irabota])	continue;
	PK_S3.setting.porabotaem[irabota] = false;
	++PK_S3.setting.sej4as_rabota;
	if (irabota==0) {PK_S3.show_popup_message('error', 'Proszę wybrać pracę, pojedynek, fort lub konstruktora.'); setTimeout(PK_S3.otbor_nuzhnykh, 100);continue};
	if (irabota == PK_S3.raboty.moving){
	    PK_S3.otbor_nuzhnykh_moving();
	    return;
	}
	if (irabota == PK_S3.raboty.energy){
	    PK_S3.otbor_nuzhnykh_sleep();
	    return;
	}
	if ((irabota >= PK_S3.raboty.fort_min)&&(irabota < PK_S3.raboty.fort_max)){
	    PK_S3.otbor_nuzhnykh_fort(irabota);
	    return;
	}

	PK_S3.tekushaya_rabota = irabota;
	var crabota = PK_S3.raboty[irabota];
	var is_duel = ((irabota >= PK_S3.raboty.duel_min)&&(irabota < PK_S3.raboty.duel_max)) ? true : false;
	var hand_shot = Character.skills.punch - Character.skills.shot;
	if (is_duel){
	    if (crabota.navyki.punch){
		hand_shot = 100;
	    }
	    else if (crabota.navyki.shot){
		hand_shot = -100;
	    }
	}
	if (PK_S3.vyborka) PK_S3.vyborka = null;
	PK_S3.vyborka = [];
	for (var i = 0; i < PK_S3.types.length; ++i){
	    PK_S3.vyborka[PK_S3.types[i]] = [];
	    for (var j = 0; j < PK_S3.nabory.length; ++j){
		PK_S3.vyborka[PK_S3.types[i]][PK_S3.nabory[j]] = null;
	    }
	    PK_S3.vyborka[PK_S3.types[i]]['simple'] = [];
	    PK_S3.vyborka[PK_S3.types[i]].simple[0] = {bonus: 0, price: 0, id: 0}
	}
	for (var i in PK_S3.vozmozhnye_veschi){
	    if (isNaN(i)) continue;
	    var cID = i;
	    var vesch = PK_S3.items[cID];
	    var ochki = PK_S3.summa_to(vesch.bonus, crabota.navyki);
	    if (is_duel&&(vesch.type=='right_arm')){
		ochki += (vesch.damage.damage_min + vesch.damage.damage_max)/2;
		if (vesch.sub_type=='hand'){
		    ochki += hand_shot;
		}
		if (vesch.sub_type=='shot'){
		    ochki -= hand_shot;
		}
	    }
	    var cena = PK_S3.cena_pods4eta(vesch);
	    if (vesch.set.key){
		if (!PK_S3.vyborka[vesch.type][vesch.set.key] || (PK_S3.vyborka[vesch.type][vesch.set.key].bonus <= ochki)){
		    PK_S3.vyborka[vesch.type][vesch.set.key] = {bonus: ochki, price: cena, id: cID};
		}
	    }
	    if (vesch.type=='animal'){
		if (PK_S3.vyborka.animal.simple.length > 0){
		    aID = PK_S3.vyborka.animal.simple[0].id;
		    if ((PK_S3.items[aID].speed > vesch.speed)&&(PK_S3.vyborka.animal.simple[0].bonus <= ochki)){
			PK_S3.vyborka.animal.simple[0] = {bonus: ochki, price:cena, id:cID}
		    }
		}
	    }
	    if ((ochki > 0)){
		var add = true;
		for (var ii = PK_S3.vyborka[vesch.type].simple.length - 1; ii >= 0 ; --ii){
		    if ((PK_S3.vyborka[vesch.type].simple[ii].bonus >= ochki) && (PK_S3.vyborka[vesch.type].simple[ii].price <= cena)){
			add = false; break;
		    }
		    if ((PK_S3.vyborka[vesch.type].simple[ii].bonus <= ochki) && (PK_S3.vyborka[vesch.type].simple[ii].price >= cena)){
			PK_S3.vyborka[vesch.type].simple.splice(ii,1);
			continue;
		    }
		}
		if (add) PK_S3.vyborka[vesch.type].simple.push( {bonus:ochki, price:cena, id: cID});
	    }
	}
	PK_S3.nabory_dlya_raboty = {};
	for (var i = 0; i < PK_S3.nabory.length; ++i){
	    PK_S3.nabory_dlya_raboty[PK_S3.nabory[i]] = [];
	    for (var j = 1; j <= PK_S3.komplekty.max; ++j){
		var kompl = PK_S3.komplekty[PK_S3.nabory[i]][j];
		var tok = PK_S3.summa_to (kompl.bonus, crabota.navyki)
		if (kompl.raboty[irabota])
		    tok += kompl.raboty[irabota];
		PK_S3.nabory_dlya_raboty[PK_S3.nabory[i]][j] = tok;
	    }
	}
	if (PK_S3.setting.is_luck){
	    for (var l = 0; l < PK_S3.types.length; ++l){
		//PK_S3.vyborka[PK_S3.types[i]][PK_S3.nabory[j]] = null
		if (PK_S3.vyborka[PK_S3.types[l]]['season_set']){
		    for (var j = 0; j < PK_S3.nabory.length; ++j){
			if (PK_S3.nabory[j] != 'season_set'){
			    PK_S3.vyborka[PK_S3.types[l]][PK_S3.nabory[j]] = null;
			}
			PK_S3.vyborka[PK_S3.types[l]]['simple'] = [];
			PK_S3.vyborka[PK_S3.types[l]].simple[0] = {bonus: 0, price: 0, id: 0}
		    }
		}
	    }
	}
	setTimeout(PK_S3.otsev_nenuzhnykh, PK_S3.rekurs.delay);
	return;
    }
    PK_S3.vyvod_prostyh_rabot();
};

PK_S3.otbor_nuzhnykh_fort = function (frab){
    PK_S3.tekushaya_rabota = frab;
    var frabota = PK_S3.raboty[frab];
    if (PK_S3.forty.is_zero){ // первая итерация для этого фортового обсчёта
	PK_S3.forty.max_value = 0;
	PK_S3.forty.old_value = 0;
	PK_S3.resultaty[frab] = {};
	var aim = Character.skills.aim;
	var leadership = Character.skills.leadership;
	var dodge = Character.skills.dodge;
	var skill = frabota.navyki.endurance ? Character.skills.endurance : Character.skills.hide;
	var sum =  aim + leadership + skill + dodge + 1;
	PK_S3.forty.ves.aim = (sum - aim)/sum;
	PK_S3.forty.ves.leadership = (sum - leadership)/sum;
	PK_S3.forty.ves.skill = (sum - skill)/sum;
	PK_S3.forty.ves.dodge = (sum - dodge)/sum;
	if (frabota.navyki.aim < 0.1){
	    PK_S3.forty.ves.aim = 0.001;
	}
	else if (frabota.navyki.dodge < 0.1){
	    PK_S3.forty.ves.dodge = 0.001;
	}
	PK_S3.forty.is_zero = false;
    }
    var zz = {aim:PK_S3.forty.ves.aim, dodge:PK_S3.forty.ves.dodge, leadership:PK_S3.forty.ves.leadership};
    if (frabota.navyki.endurance){
	zz.endurance = PK_S3.forty.ves.skill;
    }
    else{
	zz.hide = PK_S3.forty.ves.skill;
    };
    
    PK_S3.vyborka = null;
    PK_S3.vyborka = [];
    for (var i = 0; i < PK_S3.types.length; ++i){
	PK_S3.vyborka[PK_S3.types[i]] = [];
	for (var j = 0; j < PK_S3.nabory.length; ++j){
	    PK_S3.vyborka[PK_S3.types[i]][PK_S3.nabory[j]] = null;
	}
	PK_S3.vyborka[PK_S3.types[i]]['simple'] = [];
	PK_S3.vyborka[PK_S3.types[i]].simple[0] = {bonus:0, health:0, price:0, id:0}
    }
    for (var f in PK_S3.vozmozhnye_veschi){
	if (isNaN(f)) continue;
	var fID = f;
	var bronya = PK_S3.items[fID];
	var bonus = PK_S3.summa_to(bronya.bonus, zz)
	var health = PK_S3.summa_to (bronya.bonus, {health:1});
	if (bronya.type == 'left_arm'){
	    bonus += (bronya.damage.damage_min + bronya.damage.damage_max) / 2;
	}
	
	var cena = PK_S3.cena_pods4eta(bronya);

	if (bronya.set.key){
	    if (!PK_S3.vyborka[bronya.type][bronya.set.key] || (PK_S3.vyborka[bronya.type][bronya.set.key].bonus <= bonus)){
		PK_S3.vyborka[bronya.type][bronya.set.key] = {bonus:bonus, health:health, price:cena, id:fID};
	    }
	}
	if (bonus+health > 0){
	    var add = true;
	    for (var ff = PK_S3.vyborka[bronya.type].simple.length - 1; ff >= 0 ; --ff){
		var tmp = PK_S3.vyborka[bronya.type].simple[ff];
		if ((tmp.bonus >= bonus) && (tmp.health >= health) && (tmp.price <= cena)){
		    add = false; break;
		}
		if ((tmp.bonus <= bonus) && (tmp.health <= health) && (tmp.price >= cena)){
		    PK_S3.vyborka[bronya.type].simple.splice(ff,1);
		    continue;
		}
	    }
	    if (add) PK_S3.vyborka[bronya.type].simple.push( {bonus:bonus, health:health, price:cena, id:fID});
	}
	else if ((bonus < 0)||(health < 0)){
	    alert ('error fort sum, health');
	}
    }
    PK_S3.nabory_dlya_raboty = {};
    for (var i = 0; i < PK_S3.nabory.length; ++i){
	PK_S3.nabory_dlya_raboty[PK_S3.nabory[i]] = [];
	for (var j = 1; j <= PK_S3.komplekty.max; ++j){
	    var kompl = PK_S3.komplekty[PK_S3.nabory[i]][j];
	    var bonus = PK_S3.summa_to (kompl.bonus, zz);
	    var health = PK_S3.summa_to (kompl.bonus, {health:1});
	    PK_S3.nabory_dlya_raboty[PK_S3.nabory[i]][j] = {bonus:bonus, health:health};
	}
    }
    setTimeout(PK_S3.otsev_nenuzhnykh_fort, PK_S3.rekurs.delay);
    return;
}

PK_S3.otbor_nuzhnykh_moving = function (){
    var Imove = PK_S3.raboty.moving;
    PK_S3.tekushaya_rabota = Imove;
    var mrabota = PK_S3.raboty[Imove];
    if (PK_S3.vyborka) PK_S3.vyborka = null;
    PK_S3.vyborka = [];
    for (var i = 0; i < PK_S3.types.length; ++i){
	PK_S3.vyborka[PK_S3.types[i]] = [];
	for (var j = 0; j < PK_S3.nabory.length; ++j){
	    PK_S3.vyborka[PK_S3.types[i]][PK_S3.nabory[j]] = null;
	}
	PK_S3.vyborka[PK_S3.types[i]]['simple'] = [];
	PK_S3.vyborka[PK_S3.types[i]].simple[0] = {ride: 0, speed: 1.0, price: 0, id: 0}
    }

    for (var r in PK_S3.vozmozhnye_veschi){
	if (isNaN(r)) continue;
	var mID = r;
	var popona = PK_S3.items[mID];
	var ride = PK_S3.summa_to(popona.bonus, mrabota.navyki);
	var speed = popona.speed ? popona.speed : 1.0;
	var cena = PK_S3.cena_pods4eta(popona);

	if (popona.set.key){
	    if (!PK_S3.vyborka[popona.type][popona.set.key] || (PK_S3.vyborka[popona.type][popona.set.key].ride <= ride)){
		PK_S3.vyborka[popona.type][popona.set.key] = {ride: ride, speed: speed, price: cena, id: mID};
	    }
	}
	if ((ride > 0)||(speed < 1.0)){
	    var add = true;
	    for (var ir = PK_S3.vyborka[popona.type].simple.length - 1; ir >= 0 ; --ir){
		if ((PK_S3.vyborka[popona.type].simple[ir].ride >= ride) && (PK_S3.vyborka[popona.type].simple[ir].price <= cena) && (PK_S3.vyborka[popona.type].simple[ir].speed <= speed)){
		    add = false; break;
		}
		if ((PK_S3.vyborka[popona.type].simple[ir].ride <= ride) && (PK_S3.vyborka[popona.type].simple[ir].price >= cena) && (PK_S3.vyborka[popona.type].simple[ir].speed >= speed)){
		    PK_S3.vyborka[popona.type].simple.splice(ir,1);
		    continue;
		}
	    }
	    if (add) PK_S3.vyborka[popona.type].simple.push( {ride: ride, speed: speed, price: cena, id: mID});
	}
    }
    PK_S3.nabory_dlya_raboty = {};
    for (var i = 0; i < PK_S3.nabory.length; ++i){
	PK_S3.nabory_dlya_raboty[PK_S3.nabory[i]] = [];
	for (var j = 1; j <= PK_S3.komplekty.max; ++j){
	    var kompl = PK_S3.komplekty[PK_S3.nabory[i]][j];
	    var rik = PK_S3.summa_to (kompl.bonus, mrabota.navyki)
	    var spk = kompl.speed ? (1 / kompl.speed) - 1 : 0.0;
	    PK_S3.nabory_dlya_raboty[PK_S3.nabory[i]][j] = {ride: rik, speed: spk};
	}
    }
    setTimeout(PK_S3.otsev_nenuzhnykh_moving, PK_S3.rekurs.delay);
}

PK_S3.otbor_nuzhnykh_sleep = function(){
    PK_S3.tekushaya_rabota = PK_S3.raboty.energy;
    var srabota = PK_S3.raboty[PK_S3.raboty.energy];
    if (PK_S3.vyborka) PK_S3.vyborka = null;
    PK_S3.vyborka = [];
    for (var i = 0; i < PK_S3.types.length; ++i){
	PK_S3.vyborka[PK_S3.types[i]] = [];
	for (var j = 0; j < PK_S3.nabory.length; ++j){
	    PK_S3.vyborka[PK_S3.types[i]][PK_S3.nabory[j]] = null;
	}
	PK_S3.vyborka[PK_S3.types[i]].simple = [];
	PK_S3.vyborka[PK_S3.types[i]].simple[0] = {heal: 0, regen: 1.0, price: 0, id: 0};
    }

    for (var s in PK_S3.vozmozhnye_veschi){
	if (isNaN(s)) continue;
	var sID = s;
	var krovatka = PK_S3.items[sID];
	var heal = PK_S3.summa_to(krovatka.bonus, srabota.navyki);
	var regen = krovatka.regeneration ? krovatka.regeneration : 1.0;
	var cena = PK_S3.cena_pods4eta(krovatka);
	if (krovatka.set.key){
	    if (!PK_S3.vyborka[krovatka.type][krovatka.set.key] || (PK_S3.vyborka[krovatka.type][krovatka.set.key].heal <= heal)){
		PK_S3.vyborka[krovatka.type][krovatka.set.key] = {heal: heal, regen: regen, price: cena, id: sID};
	    }
	}
	if ((heal > 0)||(regen > 1.0)){
	    var add = true;
	    for (var is = PK_S3.vyborka[krovatka.type].simple.length - 1; is >= 0 ; --is){
		if ((PK_S3.vyborka[krovatka.type].simple[is].heal >= heal) && (PK_S3.vyborka[krovatka.type].simple[is].price <= cena) && (PK_S3.vyborka[krovatka.type].simple[is].regen >= regen)){
		    add = false; break;
		}
		if ((PK_S3.vyborka[krovatka.type].simple[is].heal <= heal) && (PK_S3.vyborka[krovatka.type].simple[is].price >= cena) && (PK_S3.vyborka[krovatka.type].simple[is].regen <= regen)){
		    PK_S3.vyborka[krovatka.type].simple.splice(is,1);
		    continue;
		}
	    }
	    if (add) PK_S3.vyborka[krovatka.type].simple.push( {heal: heal, regen: regen, price: cena, id: sID});
	}
    }
    PK_S3.nabory_dlya_raboty = {};
    for (var i = 0; i < PK_S3.nabory.length; ++i){
	PK_S3.nabory_dlya_raboty[PK_S3.nabory[i]] = [];
	for (var j = 1; j <= PK_S3.komplekty.max; ++j){
	    var kompl = PK_S3.komplekty[PK_S3.nabory[i]][j];
	    var hek = PK_S3.summa_to (kompl.bonus, srabota.navyki)
	    var rek = kompl.regeneration ? kompl.regeneration : 1.0;
	    PK_S3.nabory_dlya_raboty[PK_S3.nabory[i]][j] = {heal: hek, regen: rek};
	}
    }
    setTimeout(PK_S3.otsev_nenuzhnykh_sleep, PK_S3.rekurs.delay);
};

PK_S3.otsev_nenuzhnykh = function(){
    PK_S3.so4etaniya = [];
    var max_mask = Math.pow(2, PK_S3.types.length) - 1;;
    for (var i = 0; i <= max_mask; ++i)
	PK_S3.so4etaniya[i] = [];
    var mask = 0;
    var ivyb = [];
    var t0 = 0;
    for (var t = 0; t < PK_S3.types.length; ++t)
	ivyb[t] = 0;
    var itype = 0;
    var potra4eno = 0;
    while (itype >= 0){
	if (itype == PK_S3.types.length){
	    --itype;
	    ivyb[itype]++;
	    continue;
	}
	if (ivyb[itype] == PK_S3.vyborka[PK_S3.types[itype]].simple.length){
	    ivyb[itype] = 0;
	    --itype;
	    if (itype >= 0) ++ivyb[itype];
	    continue;
	}
	var vesch = PK_S3.vyborka[PK_S3.types[itype]].simple[ivyb[itype]];
	potra4eno = vesch.price;
	t0 = vesch.bonus;
	mask = Math.pow(2, itype);
	    var add = true;
	    for (var ii = PK_S3.so4etaniya[mask].length - 1; ii >= 0; --ii){
		if ((PK_S3.so4etaniya[mask][ii].bonus >= t0) && (PK_S3.so4etaniya[mask][ii].price <= potra4eno)){
		    add = false; break;
		}
		if ((PK_S3.so4etaniya[mask][ii].bonus <= t0) && (PK_S3.so4etaniya[mask][ii].price >= potra4eno)){
		    PK_S3.so4etaniya[mask].splice(ii,1);
		    continue;
		}
	    }
	    if (add){
		PK_S3.so4etaniya[mask].push( {bonus:t0, price:potra4eno});
		var l = PK_S3.so4etaniya[mask].length - 1;
		PK_S3.so4etaniya[mask][l].ids = [];
		PK_S3.so4etaniya[mask][l].ids[0] = vesch.id;
		PK_S3.so4etaniya[mask][l].sets = 0;
	    }
	++itype;
    }

    var qkompl = 0;
    for (var k = 0; k < PK_S3.nabory.length; ++k){
	var nabor_name = PK_S3.nabory[k];
	var mask = 0;
	var ivyb = [];
	var t0 = 0;
	var IDs = [];
	for (var t = 0; t < PK_S3.types.length; ++t)
	    ivyb[t] = 0;
	var itype = 0;
	var potra4eno = 0;
	while (itype >= 0){
	    if (itype == PK_S3.types.length){
		--itype;
		ivyb[itype]++;
		continue;
	    }
	    if (ivyb[itype] > 1){
		ivyb[itype] = 0;
		--itype;
		if (itype >= 0) ++ivyb[itype]; // нет уверенности в javascript'ном if(--itype>=0) :)
		continue;
	    }
	    if (ivyb[itype]==0){
		if (PK_S3.vyborka[PK_S3.types[itype]][PK_S3.nabory[k]]){
		    var vesch = PK_S3.vyborka[PK_S3.types[itype]][PK_S3.nabory[k]];
		    potra4eno += vesch.price;
		    if (qkompl > 0) t0 -= PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl];
		    ++qkompl;
		    t0 += vesch.bonus;
		    t0 += PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl];
		    mask += Math.pow(2, itype);
		    IDs.push(vesch.id);
		    if ((potra4eno <= PK_S3.setting.bablo) && ((t0 > 0) || (nabor_name == 'season_set'))){
			var add = true;
			for (var iii = PK_S3.so4etaniya[mask].length - 1; iii >= 0 ; --iii){
			    if ((PK_S3.so4etaniya[mask][iii].bonus >= t0) && (PK_S3.so4etaniya[mask][iii].price <= potra4eno)){
				add = false; break;
			    }
			    if ((PK_S3.so4etaniya[mask][iii].bonus <= t0) && (PK_S3.so4etaniya[mask][iii].price >= potra4eno)){
				PK_S3.so4etaniya[mask].splice(iii,1);
				continue;
			    }
			}
			if (add){
			    PK_S3.so4etaniya[mask].push( {bonus:t0, price:potra4eno});
			    var l = PK_S3.so4etaniya[mask].length - 1;
			    PK_S3.so4etaniya[mask][l].ids = [];
			    for (var j = 0; j < IDs.length; ++j)
				PK_S3.so4etaniya[mask][l].ids.push(IDs[j]);
			    PK_S3.so4etaniya[mask][l].sets = Math.pow(2, k);
			}
		    } // конец проверки на добавление
		} // вещь из набора в данный слот существовала
		++itype;
	    }
	    else if (ivyb[itype]==1){
		if (PK_S3.vyborka[PK_S3.types[itype]][PK_S3.nabory[k]]){
		    var vesch = PK_S3.vyborka[PK_S3.types[itype]][PK_S3.nabory[k]];
		    potra4eno -= vesch.price;
		    t0 -= vesch.bonus;
		    t0 -= PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl];
		    --qkompl;
		    if (qkompl > 0) t0 += PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl];
		    mask -= Math.pow(2, itype);
		    IDs.pop ();
		} // подчищаем ранее плюсанутые свойства.
		++itype;
	    }
	    else{
		alert ('error');
		break;
	    }
	}
    } // просмотрели все наборы.
    PK_S3.rekurs.mask = -1;
    PK_S3.rekurs.index_mask = -1;
    PK_S3.rekurs.count = PK_S3.rekurs.max_count;
    var date = new Date();
    PK_S3.rekurs.time = date.getTime();
    setTimeout (PK_S3.polnyj_perebor, PK_S3.rekurs.delay);
}

PK_S3.otsev_nenuzhnykh_fort = function(){
    PK_S3.so4etaniya = [];
    var max_mask = Math.pow(2, PK_S3.types.length) - 1;;
    for (var i = 0; i <= max_mask; ++i)
	PK_S3.so4etaniya[i] = [];
    var mask = 0;
    var ivyb = [];
    var t0 = 0;
    for (var t = 0; t < PK_S3.types.length; ++t)
	ivyb[t] = 0;
    var itype = 0;
    var potra4eno = 0;
    while (itype >= 0){
	if (itype == PK_S3.types.length){
	    --itype;
	    ivyb[itype]++;
	    continue;
	}
	if (ivyb[itype] == PK_S3.vyborka[PK_S3.types[itype]].simple.length){
	    ivyb[itype] = 0;
	    --itype;
	    if (itype >= 0) ++ivyb[itype];
	    continue;
	}
	var bronya = PK_S3.vyborka[PK_S3.types[itype]].simple[ivyb[itype]];
	var potra4eno = bronya.price;
	var b0 = bronya.bonus;
	var h0 = bronya.health;
	
	mask = Math.pow(2, itype);
	    var add = true;
	    for (var ii = PK_S3.so4etaniya[mask].length - 1; ii >= 0; --ii){
		var tmp = PK_S3.so4etaniya[mask][ii];
		if ((tmp.bonus >= b0) && (tmp.health >= h0) && (tmp.price <= potra4eno)){
		    add = false; break;
		}
		if ((tmp.bonus <= b0) && (tmp.health <= h0) && (tmp.price >= potra4eno)){
		    PK_S3.so4etaniya[mask].splice(ii,1);
		    continue;
		}
	    }
	    if (add){
		PK_S3.so4etaniya[mask].push( {bonus:b0, health:h0, price:potra4eno});
		var l = PK_S3.so4etaniya[mask].length - 1;
		PK_S3.so4etaniya[mask][l].ids = [];
		PK_S3.so4etaniya[mask][l].ids[0] = bronya.id;
		PK_S3.so4etaniya[mask][l].sets = 0;
	    }
	++itype;
    }
    var qkompl = 0;
    for (var k = 0; k < PK_S3.nabory.length; ++k){
	var mask = 0;
	var ivyb = [];
	var potra4eno = 0;
	var b0 = 0;
	var IDs = [];
	for (var t = 0; t < PK_S3.types.length; ++t)
	    ivyb[t] = 0;
	var itype = 0;
	var potra4eno = 0;
	while (itype >= 0){
	    if (itype == PK_S3.types.length){
		--itype;
		ivyb[itype]++;
		continue;
	    }
	    if (ivyb[itype] > 1){
		ivyb[itype] = 0;
		--itype;
		if (itype >= 0) ++ivyb[itype]; // нет уверенности в javascript'ном if(--itype>=0) :)
		continue;
	    }
	    if (ivyb[itype]==0){
		if (PK_S3.vyborka[PK_S3.types[itype]][PK_S3.nabory[k]]){
		    var bronya = PK_S3.vyborka[PK_S3.types[itype]][PK_S3.nabory[k]];
		    potra4eno += bronya.price;
		    if (qkompl > 0){
			b0 -= PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].bonus;
			h0 -= PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].health;
		    }
		    b0 += bronya.bonus;
		    h0 += bronya.health;
		    
		    ++qkompl;
		    b0 += PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].bonus;
		    h0 += PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].health;
		    mask += Math.pow(2, itype);
		    IDs.push(bronya.id);
		    if ((potra4eno <= PK_S3.setting.bablo) && ((b0 > 0)||(h0 > 0))){
			var add = true;
			for (var iii = PK_S3.so4etaniya[mask].length - 1; iii >= 0 ; --iii){
			    var tmp = PK_S3.so4etaniya[mask][iii];
			    if ((tmp.bonus >= b0) && (tmp.health >= h0) && (tmp.price <= potra4eno)){
				add = false; break;
			    }
			    if ((tmp.bonus <= b0) && (tmp.health <= h0) && (tmp.price >= potra4eno)){
				PK_S3.so4etaniya[mask].splice(iii,1);
				continue;
			    }
			}
			if (add){
			    PK_S3.so4etaniya[mask].push( {bonus:b0, health:h0, price:potra4eno});
			    var l = PK_S3.so4etaniya[mask].length - 1;
			    PK_S3.so4etaniya[mask][l].ids = [];
			    for (var j = 0; j < IDs.length; ++j)
				PK_S3.so4etaniya[mask][l].ids.push(IDs[j]);
			    PK_S3.so4etaniya[mask][l].sets = Math.pow(2, k);
			}
		    } // конец проверки на добавление
		} // вещь из набора в данный слот существовала
		++itype;
	    }
	    else if (ivyb[itype]==1){
		if (PK_S3.vyborka[PK_S3.types[itype]][PK_S3.nabory[k]]){
		    var bronya = PK_S3.vyborka[PK_S3.types[itype]][PK_S3.nabory[k]];
		    potra4eno -= bronya.price;
		    b0 -= bronya.bonus;
		    h0 -= bronya.health;
		    
		    b0 -= PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].bonus;
		    h0 -= PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].health;
		    --qkompl;
		    if (qkompl > 0) {
			b0 += PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].bonus;
			h0 += PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].health;
		    }
		    mask -= Math.pow(2, itype);
		    IDs.pop ();
		} // подчищаем ранее плюсанутые свойства.
		++itype;
	    }
	    else{
		alert ('error');
		break;
	    }
	}
    } // просмотрели все наборы.
    PK_S3.rekurs.mask = -1;
    PK_S3.rekurs.index_mask = -1;
    PK_S3.rekurs.count = PK_S3.rekurs.max_count;
    var date = new Date();
    PK_S3.rekurs.time = date.getTime();
    setTimeout (PK_S3.polnyj_perebor_fort, PK_S3.rekurs.delay);
}


PK_S3.otsev_nenuzhnykh_moving = function() {
    PK_S3.so4etaniya = [];
    var max_mask = Math.pow(2, PK_S3.types.length) - 1;;
    for (var im = 0; im <= max_mask; ++im)
	PK_S3.so4etaniya[im] = [];
    var mask = 0;
    var ivyb = [];
    var r0 = 0;
    var s0 = 1.0;
    for (var t = 0; t < PK_S3.types.length; ++t)
	ivyb[t] = 0;
    var itype = 0;
    var potra4eno = 0;
    while (itype >= 0){
	if (itype == PK_S3.types.length){
	    --itype;
	    ivyb[itype]++;
	    continue;
	}
	if (ivyb[itype] == PK_S3.vyborka[PK_S3.types[itype]].simple.length){
	    ivyb[itype] = 0;
	    --itype;
	    if (itype >= 0) ++ivyb[itype];
	    continue;
	}
	var popona = PK_S3.vyborka[PK_S3.types[itype]].simple[ivyb[itype]];
	potra4eno = popona.price;
	r0 = popona.ride;
	s0 = popona.speed;
	mask = Math.pow(2, itype);
	var add = true;
	for (var ir = PK_S3.so4etaniya[mask].length - 1; ir >= 0; --ir){
	    if ((PK_S3.so4etaniya[mask][ir].ride >= r0) && (PK_S3.so4etaniya[mask][ir].price <= potra4eno) && (PK_S3.so4etaniya[mask][ir].speed <= s0)){
		add = false; break;
	    }
	    if ((PK_S3.so4etaniya[mask][ir].ride <= r0) && (PK_S3.so4etaniya[mask][ir].price >= potra4eno) && (PK_S3.so4etaniya[mask][ir].speed >= s0)){
		PK_S3.so4etaniya[mask].splice(ir,1);
		continue;
	    }
	}
	if (add){
	    PK_S3.so4etaniya[mask].push( {ride: r0, speed: s0, kompl: 0, price:potra4eno});
	    var l = PK_S3.so4etaniya[mask].length - 1;
	    PK_S3.so4etaniya[mask][l].ids = [];
	    PK_S3.so4etaniya[mask][l].ids[0] = popona.id;
	    PK_S3.so4etaniya[mask][l].sets = 0;
	}
	++itype;
    }

    var qkompl = 0;
    for (var k = 0; k < PK_S3.nabory.length; ++k){
	var mask = 0;
	var ivyb = [];
	var r0 = 0;
	var s0 = 1.0;
	var k0 = 0;
	var IDs = [];
	for (var t = 0; t < PK_S3.types.length; ++t)
	    ivyb[t] = 0;
	var itype = 0;
	var potra4eno = 0;
	while (itype >= 0){
	    if (itype == PK_S3.types.length){
		--itype;
		ivyb[itype]++;
		continue;
	    }
	    if (ivyb[itype] > 1){
		ivyb[itype] = 0;
		--itype;
		if (itype >= 0) ++ivyb[itype]; // нет уверенности в javascript'ном if(--itype>=0) :)
		continue;
	    }
	    if (ivyb[itype]==0){
		if (PK_S3.vyborka[PK_S3.types[itype]][PK_S3.nabory[k]]){
		    var popona = PK_S3.vyborka[PK_S3.types[itype]][PK_S3.nabory[k]];
		    potra4eno += popona.price;
		    if (qkompl > 0) r0 -= PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].ride;
		    if (qkompl > 0) k0 -= PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].speed;
		    ++qkompl;
		    r0 += popona.ride;
		    s0 *= popona.speed;
		    r0 += PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].ride;
		    k0 += PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].speed;
		    mask += Math.pow(2, itype);
		    IDs.push(popona.id);
		    if ((potra4eno <= PK_S3.setting.bablo) && ((r0 > 0)||(k0 > 0)||(s0 < 1.0))){
			    var add = true;
			    for (var iir = PK_S3.so4etaniya[mask].length - 1; iir >= 0 ; --iir){
				var rtmp = PK_S3.so4etaniya[mask][iir];
				if ((rtmp.ride >= r0) && (rtmp.kompl >= k0) && (rtmp.price <= potra4eno) && (rtmp.speed <= s0)){
				    add = false; break;
				}
				if ((rtmp.ride <= r0) && (rtmp.kompl <= k0) && (rtmp.price >= potra4eno) && (rtmp.speed >= s0)){
				    PK_S3.so4etaniya[mask].splice(iir,1);
				    continue;
				}
			    }
			    if (add){
				PK_S3.so4etaniya[mask].push( {ride: r0, speed: s0, kompl: k0, price:potra4eno});
				var l = PK_S3.so4etaniya[mask].length - 1;
				PK_S3.so4etaniya[mask][l].ids = [];
				for (var j = 0; j < IDs.length; ++j)
				    PK_S3.so4etaniya[mask][l].ids.push(IDs[j]);
				PK_S3.so4etaniya[mask][l].sets = Math.pow(2, k);
			    }
		    } // конец проверки на добавление
		} // вещь из набора в данный слот существовала
		++itype;
	    }
	    else if (ivyb[itype]==1){
		if (PK_S3.vyborka[PK_S3.types[itype]][PK_S3.nabory[k]]){
		    var popona = PK_S3.vyborka[PK_S3.types[itype]][PK_S3.nabory[k]];
		    potra4eno -= popona.price;
		    r0 -= popona.ride;
		    s0 /= popona.speed;
		    r0 -= PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].ride;
		    k0 -= PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].speed;
		    --qkompl;
		    if (qkompl > 0) r0 += PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].ride;
		    if (qkompl > 0) k0 += PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].speed;
		    mask -= Math.pow(2, itype);
		    IDs.pop ();
		} // подчищаем ранее плюсанутые свойства.
		++itype;
	    }
	    else{
		alert ('error');
		break;
	    }
	}
    } // просмотрели все наборы.
    PK_S3.rekurs.mask = -1;
    PK_S3.rekurs.index_mask = -1;
    PK_S3.rekurs.count = PK_S3.rekurs.max_count;
    var date = new Date();
    PK_S3.rekurs.time = date.getTime();
    setTimeout (PK_S3.polnyj_perebor_moving, PK_S3.rekurs.delay);
}

PK_S3.otsev_nenuzhnykh_sleep = function() {
    PK_S3.so4etaniya = [];
    var max_mask = Math.pow(2, PK_S3.types.length) - 1;;
    for (var is = 0; is <= max_mask; ++is)
	PK_S3.so4etaniya[is] = [];
    var mask = 0;
    var ivyb = [];
    var h0 = 0;
    var r0 = 1.0;
    for (var t = 0; t < PK_S3.types.length; ++t)
	ivyb[t] = 0;
    var itype = 0;
    var potra4eno = 0;
    while (itype >= 0){
	if (itype == PK_S3.types.length){
	    --itype;
	    ivyb[itype]++;
	    continue;
	}
	if (ivyb[itype] == PK_S3.vyborka[PK_S3.types[itype]].simple.length){
	    ivyb[itype] = 0;
	    --itype;
	    if (itype >= 0) ++ivyb[itype];
	    continue;
	}
	var krovatka = PK_S3.vyborka[PK_S3.types[itype]].simple[ivyb[itype]];
	potra4eno = krovatka.price;
	h0 = krovatka.heal;
	r0 = krovatka.regen;
	mask = Math.pow(2, itype);
	var add = true;
	for (var is = PK_S3.so4etaniya[mask].length - 1; is >= 0; --is){
	    if (PK_S3.so4etaniya[mask][is].regen > r0){
		add = false; break;
	    }
	    if (PK_S3.so4etaniya[mask][is].regen < r0){
		PK_S3.so4etaniya[mask].splice(is,1);
		continue;
	    }
	    if ((PK_S3.so4etaniya[mask][is].heal >= h0) && (PK_S3.so4etaniya[mask][is].price <= potra4eno)){
		add = false; break;
	    }
	    if ((PK_S3.so4etaniya[mask][is].heal <= h0) && (PK_S3.so4etaniya[mask][is].price >= potra4eno)){
		PK_S3.so4etaniya[mask].splice(is,1);
		continue;
	    }
	}
	if (add){
	    PK_S3.so4etaniya[mask].push( {heal: h0, regen: r0, price:potra4eno});
	    var l = PK_S3.so4etaniya[mask].length - 1;
	    PK_S3.so4etaniya[mask][l].ids = [];
	    PK_S3.so4etaniya[mask][l].ids[0] = krovatka.id;
	    PK_S3.so4etaniya[mask][l].sets = 0;
	}
	++itype;
    }

    var qkompl = 0;
    for (var k = 0; k < PK_S3.nabory.length; ++k){
	var mask = 0;
	var ivyb = [];
	var h0 = 0;
	var r0 = 1.0;
	var IDs = [];
	for (var t = 0; t < PK_S3.types.length; ++t)
	    ivyb[t] = 0;
	var itype = 0;
	var potra4eno = 0;
	while (itype >= 0){
	    if (itype == PK_S3.types.length){
		--itype;
		ivyb[itype]++;
		continue;
	    }
	    if (ivyb[itype] > 1){
		ivyb[itype] = 0;
		--itype;
		if (itype >= 0) ++ivyb[itype]; // нет уверенности в javascript'ном if(--itype>=0) :)
		continue;
	    }
	    if (ivyb[itype]==0){
		if (PK_S3.vyborka[PK_S3.types[itype]][PK_S3.nabory[k]]){
		    var krovatka = PK_S3.vyborka[PK_S3.types[itype]][PK_S3.nabory[k]];
		    potra4eno += krovatka.price;
		    if (qkompl > 0) h0 -= PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].heal;
		    if (qkompl > 0) r0 /= PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].regen;
		    ++qkompl;
		    h0 += krovatka.heal;
		    r0 *= krovatka.regen;
		    h0 += PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].heal;
		    r0 *= PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].regen;
		    mask += Math.pow(2, itype);
		    IDs.push(krovatka.id);
		    if ((qkompl > 1) && (potra4eno <= PK_S3.setting.bablo)){
			var add = true;
			for (var iis = PK_S3.so4etaniya[mask].length - 1; iis >= 0 ; --iis){
			    if (PK_S3.so4etaniya[mask][iis].regen > r0){
				add = false; break;
			    }
			    if (PK_S3.so4etaniya[mask][iis].regen < r0){
				PK_S3.so4etaniya[mask].splice(iis,1);
				continue;
			    }
			    if ((PK_S3.so4etaniya[mask][iis].heal >= h0) && (PK_S3.so4etaniya[mask][iis].price <= potra4eno)){
				add = false; break;
			    }
			    if ((PK_S3.so4etaniya[mask][iis].heal <= h0) && (PK_S3.so4etaniya[mask][iis].price >= potra4eno)){
				PK_S3.so4etaniya[mask].splice(iis,1);
				continue;
			    }
			}
			if (add){
			    PK_S3.so4etaniya[mask].push( {heal: h0, regen: r0, price:potra4eno});
			    var l = PK_S3.so4etaniya[mask].length - 1;
			    PK_S3.so4etaniya[mask][l].ids = [];
			    for (var j = 0; j < IDs.length; ++j)
				PK_S3.so4etaniya[mask][l].ids.push(IDs[j]);
			    PK_S3.so4etaniya[mask][l].sets = Math.pow(2, k);
		        }
		    } // конец проверки на добавление
		} // вещь из набора в данный слот существовала
		++itype;
	    }
	    else if (ivyb[itype]==1){
		if (PK_S3.vyborka[PK_S3.types[itype]][PK_S3.nabory[k]]){
		    var krovatka = PK_S3.vyborka[PK_S3.types[itype]][PK_S3.nabory[k]];
		    potra4eno -= krovatka.price;
		    h0 -= krovatka.heal;
		    r0 /= krovatka.regen;
		    h0 -= PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].heal;
		    r0 /= PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].regen;
		    --qkompl;
		    if (qkompl > 0) h0 += PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].heal;
		    if (qkompl > 0) r0 *= PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].regen;
		    mask -= Math.pow(2, itype);
		    IDs.pop ();
		} // подчищаем ранее плюсанутые свойства.
		++itype;
	    }
	    else{
		alert ('error');
		break;
	    }
	}
    } // просмотрели все наборы.
    PK_S3.rekurs.mask = -1;
    PK_S3.rekurs.index_mask = -1;
    PK_S3.rekurs.count = PK_S3.rekurs.max_count;
    var date = new Date();
    PK_S3.rekurs.time = date.getTime();
    setTimeout (PK_S3.polnyj_perebor_sleep, PK_S3.rekurs.delay);
}


PK_S3.polnyj_perebor = function(){
    var max_mask = Math.pow(2, PK_S3.types.length) - 1;
    var progress = $('pk_s3_progress_bar');
    var current_task = $('current_task_box_text');
    var fval = (PK_S3.rekurs.mask>0)?PK_S3.progress.array_mask[PK_S3.rekurs.mask]:0;
    fval = 100 * (fval + PK_S3.setting.sej4as_rabota - 1) / PK_S3.setting.s4itaem_rabot;
    if (progress){
	progress.setAttribute ('value', parseInt(fval, 10));
    }
    if (current_task){
	var sx = new Array(parseInt(fval/3.3, 10)).join('#');
	var ss = new Array(parseInt(31 - fval/3.3, 10)).join('=');
	var sv = '|'+sx+ss+'|';
	current_task.textContent = sv;
    }

    var infinity = true;
    while (infinity){
	var date = new Date();
	if (PK_S3.rekurs.time + PK_S3.rekurs.working < date.getTime()){
	    PK_S3.rekurs.time = date.getTime() + PK_S3.rekurs.delay;
	    setTimeout (PK_S3.polnyj_perebor, PK_S3.rekurs.delay);
	    return;
	}
	if (PK_S3.rekurs.mask > max_mask / 2){
	    var izmeneniya = false;
	    for (var m7 = 0; m7 < max_mask; ++m7){
	        for (var i7 = PK_S3.so4etaniya[m7].length - 1; i7>= 0; --i7){
		    if (!PK_S3.so4etaniya[m7][i7].ispolz){
			PK_S3.so4etaniya[m7][i7].old = true;
		    }
		    else{
		        PK_S3.so4etaniya[m7][i7].ispolz = false;
		        izmeneniya = true;
		    }
		}
	    }
	    if (!izmeneniya) infinity = false;
//	    PK_S3.rekurs.count -= 50;
	    PK_S3.rekurs.mask = -1;
	    PK_S3.rekurs.index_mask = -1;
	    continue;
	}
	if (PK_S3.rekurs.index_mask < 0){
	    // пора переходить на следущую маску;
	    ++PK_S3.rekurs.mask;
	    PK_S3.rekurs.index_mask = PK_S3.so4etaniya[PK_S3.rekurs.mask].length - 1;
	    continue;
	}
	var m1 = PK_S3.rekurs.mask;
	var i1 = PK_S3.rekurs.index_mask;
	var old1 = PK_S3.so4etaniya[m1][i1].old;
        var bon1 = PK_S3.so4etaniya[m1][i1].bonus;
	var cen1 = PK_S3.so4etaniya[m1][i1].price;
	var sets1 = PK_S3.so4etaniya[m1][i1].sets;
        for (var m2 = m1 + 1; m2 < max_mask; ++m2){
	    if (m1&m2) continue;
	    var m3 = m1 + m2;
	    for (var i2 = PK_S3.so4etaniya[m2].length - 1; i2 >= 0; --i2){
		if (old1&&PK_S3.so4etaniya[m2][i2].old) continue;
		sets2 = PK_S3.so4etaniya[m2][i2].sets;
		if (sets1&sets2) continue;
		var bonus = bon1 + PK_S3.so4etaniya[m2][i2].bonus;
		var cena = cen1 + PK_S3.so4etaniya[m2][i2].price;
		if (cena <= PK_S3.setting.bablo){
		    var add = true;
		    for (var ii = PK_S3.so4etaniya[m3].length - 1; ii >= 0; --ii){
		        if ((PK_S3.so4etaniya[m3][ii].bonus >= bonus) && (PK_S3.so4etaniya[m3][ii].price <= cena)){
			    add = false; break;
		        }
			if ((PK_S3.so4etaniya[m3][ii].bonus <= bonus) && (PK_S3.so4etaniya[m3][ii].price >= cena)){
			    PK_S3.so4etaniya[m3].splice(ii,1);
			    continue;
			}
		    }
		    if (add){
			PK_S3.so4etaniya[m3].push( {bonus:bonus, price:cena});
			var l = PK_S3.so4etaniya[m3].length - 1;
			PK_S3.so4etaniya[m3][l].ids = [];
			for (var j1 = 0; j1 < PK_S3.so4etaniya[m1][i1].ids.length; ++j1){
			    PK_S3.so4etaniya[m3][l].ids.push(PK_S3.so4etaniya[m1][i1].ids[j1]);
			}
			for (var j2 = 0; j2 < PK_S3.so4etaniya[m2][i2].ids.length; ++j2){
			    PK_S3.so4etaniya[m3][l].ids.push(PK_S3.so4etaniya[m2][i2].ids[j2]);
			}
			PK_S3.so4etaniya[m3][l].sets = sets1 + sets2;
			PK_S3.so4etaniya[m3][l].ispolz = true;
			PK_S3.so4etaniya[m1][i1].ispolz = true;
			PK_S3.so4etaniya[m2][i2].ispolz = true;
			PK_S3.so4etaniya[m3][l].old = false;
			PK_S3.so4etaniya[m1][i1].old = false;
			PK_S3.so4etaniya[m2][i2].old = false;
		    }
		}
	    }
	}
	--PK_S3.rekurs.index_mask;
    }
    PK_S3.podgotavlivaem_rezultat();
}

PK_S3.polnyj_perebor_fort = function(){
    var max_mask = Math.pow(2, PK_S3.types.length) - 1;
    var progress = $('pk_s3_progress_bar');
    var current_task = $('current_task_box_text');
    var fval = (PK_S3.rekurs.mask>0)?PK_S3.progress.array_mask[PK_S3.rekurs.mask]:0;
    fval = 100 * (fval + PK_S3.setting.sej4as_rabota - 1) / PK_S3.setting.s4itaem_rabot;
    if (progress){
	progress.setAttribute ('value', parseInt(fval, 10));
    }
    if (current_task){
	var sx = new Array(parseInt(fval/3.3, 10)).join('#');
	var ss = new Array(parseInt(31 - fval/3.3, 10)).join('=');
	var sv = '|'+sx+ss+'|';
	current_task.textContent = sv;
    }

    var infinity = true;
    while (infinity){
	var date = new Date();
	if (PK_S3.rekurs.time + PK_S3.rekurs.working < date.getTime()){
	    var date1 = new Date();
	    PK_S3.rekurs.time = date1.getTime() + PK_S3.rekurs.delay;
	    setTimeout (PK_S3.polnyj_perebor_fort, PK_S3.rekurs.delay);
	    return;
	}
	if (PK_S3.rekurs.mask > max_mask / 2){
	    var izmeneniya = false;
	    for (var mf = 0; mf < max_mask; ++mf){
	        for (var ix = PK_S3.so4etaniya[mf].length - 1; ix>= 0; --ix){
		    if (!PK_S3.so4etaniya[mf][ix].ispolz){
			PK_S3.so4etaniya[mf][ix].old = true;
		    }
		    else{
		        PK_S3.so4etaniya[mf][ix].ispolz = false;
		        izmeneniya = true;
		    }
		}
	    }
	    if (!izmeneniya) infinity = false;
//	    PK_S3.rekurs.count -= 50;
	    PK_S3.rekurs.mask = -1;
	    PK_S3.rekurs.index_mask = -1;
	    continue;
	}
	if (PK_S3.rekurs.index_mask < 0){
	    // пора переходить на следущую маску;
	    ++PK_S3.rekurs.mask;
	    PK_S3.rekurs.index_mask = PK_S3.so4etaniya[PK_S3.rekurs.mask].length - 1;
	    continue;
	}
	var m1 = PK_S3.rekurs.mask;
	var i1 = PK_S3.rekurs.index_mask;
	var old1 = PK_S3.so4etaniya[m1][i1].old
        var bonus1 = PK_S3.so4etaniya[m1][i1].bonus;
        var health1 = PK_S3.so4etaniya[m1][i1].health;
	var cen1 = PK_S3.so4etaniya[m1][i1].price;
	var sets1 = PK_S3.so4etaniya[m1][i1].sets;
        for (var m2 = m1 + 1; m2 < max_mask; ++m2){
	    if (m1&m2) continue;
	    var m3 = m1 + m2;
	    for (var i2 = PK_S3.so4etaniya[m2].length - 1; i2 >= 0; --i2){
		if (old1&&PK_S3.so4etaniya[m2][i2].old) continue;
		sets2 = PK_S3.so4etaniya[m2][i2].sets;
		if (sets1&sets2) continue;
		var bonus = bonus1 + PK_S3.so4etaniya[m2][i2].bonus;
		var health = health1 + PK_S3.so4etaniya[m2][i2].health;
		var cena = cen1 + PK_S3.so4etaniya[m2][i2].price;
		if (cena <= PK_S3.setting.bablo){
		    var add = true;
		    for (var ii = PK_S3.so4etaniya[m3].length - 1; ii >= 0; --ii){
			    var tmp = PK_S3.so4etaniya[m3][ii];
			    if ((tmp.bonus >= bonus) && (tmp.health >= health) && (tmp.price <= cena)){
				add = false; break;
			    }
			    if ((tmp.bonus <= bonus) && (tmp.health <= health) && (tmp.price >= cena)){
				PK_S3.so4etaniya[m3].splice(ii,1);
				continue;
			    }
		    }
		    if (add){
			PK_S3.so4etaniya[m3].push({bonus:bonus, health:health, price:cena});
			var l = PK_S3.so4etaniya[m3].length - 1;
			PK_S3.so4etaniya[m3][l].ids = [];
			for (var j1 = 0; j1 < PK_S3.so4etaniya[m1][i1].ids.length; ++j1){
			    PK_S3.so4etaniya[m3][l].ids.push(PK_S3.so4etaniya[m1][i1].ids[j1]);
			}
			for (var j2 = 0; j2 < PK_S3.so4etaniya[m2][i2].ids.length; ++j2){
			    PK_S3.so4etaniya[m3][l].ids.push(PK_S3.so4etaniya[m2][i2].ids[j2]);
			}
			PK_S3.so4etaniya[m3][l].sets = sets1 + sets2;
			PK_S3.so4etaniya[m3][l].ispolz = true;
			PK_S3.so4etaniya[m1][i1].ispolz = true;
			PK_S3.so4etaniya[m2][i2].ispolz = true;
			PK_S3.so4etaniya[m3][l].old = false;
			PK_S3.so4etaniya[m1][i1].old = false;
			PK_S3.so4etaniya[m2][i2].old = false;
		    }
		}
	    }
	}
	--PK_S3.rekurs.index_mask;
    }
    PK_S3.podgotavlivaem_rezultat_fort();
}

PK_S3.polnyj_perebor_moving = function(){
    var max_mask = Math.pow(2, PK_S3.types.length) - 1;
    var progress = $('pk_s3_progress_bar');
    var current_task = $('current_task_box_text');
    var fval = (PK_S3.rekurs.mask>0)?PK_S3.progress.array_mask[PK_S3.rekurs.mask]:0;
    fval = 100 * (fval + PK_S3.setting.sej4as_rabota - 1) / PK_S3.setting.s4itaem_rabot;
    if (progress){
	progress.setAttribute ('value', parseInt(fval, 10));
    }
    if (current_task){
	var sx = new Array(parseInt(fval/3.3, 10)).join('#');
	var ss = new Array(parseInt(31 - fval/3.3, 10)).join('=');
	var sv = '|'+sx+ss+'|';
	current_task.textContent = sv;
    }

    var infinity = true;
    while (infinity){
	var date = new Date();
	if (PK_S3.rekurs.time + PK_S3.rekurs.working < date.getTime()){
	    PK_S3.rekurs.time = date.getTime() + PK_S3.rekurs.delay;
	    setTimeout (PK_S3.polnyj_perebor_moving, PK_S3.rekurs.delay);
	    return;
	}

	if (PK_S3.rekurs.mask > max_mask / 2){
	    var izmeneniya = false;
	    for (var m6 = 0; m6 < max_mask; ++m6){
	        for (var i6 = PK_S3.so4etaniya[m6].length - 1; i6>= 0; --i6){
		    if (!PK_S3.so4etaniya[m6][i6].ispolz){
			PK_S3.so4etaniya[m6][i6].old = true;
		    }
		    else{
		        PK_S3.so4etaniya[m6][i6].ispolz = false;
		        izmeneniya = true;
		    }
		}
	    }
	    if (!izmeneniya) infinity = false;
//	    PK_S3.rekurs.count -= 50;
	    PK_S3.rekurs.mask = -1;
	    PK_S3.rekurs.index_mask = -1;
	    continue;
	}
	if (PK_S3.rekurs.index_mask < 0){
	    // пора переходить на следущую маску;
	    ++PK_S3.rekurs.mask;
	    PK_S3.rekurs.index_mask = PK_S3.so4etaniya[PK_S3.rekurs.mask].length - 1;
	    continue;
	}
	if (PK_S3.so4etaniya[PK_S3.rekurs.mask][PK_S3.rekurs.index_mask].old){
	    --PK_S3.rekurs.index_mask;
	    continue;
	}
	var mr1 = PK_S3.rekurs.mask;
	var ir1 = PK_S3.rekurs.index_mask;
	var old1 = PK_S3.so4etaniya[mr1][ir1].old
        var rid1 = PK_S3.so4etaniya[mr1][ir1].ride;
	var spe1 = PK_S3.so4etaniya[mr1][ir1].speed;
	var kom1 = PK_S3.so4etaniya[mr1][ir1].kompl;
	var cen1 = PK_S3.so4etaniya[mr1][ir1].price;
	var sets1 = PK_S3.so4etaniya[mr1][ir1].sets;
        for (var mr2 = mr1 + 1; mr2 < max_mask; ++mr2){
	    if (mr1&mr2) continue;
	    var mr3 = mr1 + mr2;
	    for (var ir2 = PK_S3.so4etaniya[mr2].length - 1; ir2 >= 0; --ir2){
		if (old1||PK_S3.so4etaniya[mr2][ir2].old) continue;
		sets2 = PK_S3.so4etaniya[mr2][ir2].sets;
		if (sets1&sets2) continue;
		var ride = rid1 + PK_S3.so4etaniya[mr2][ir2].ride;
		var speed = spe1 * PK_S3.so4etaniya[mr2][ir2].speed;
		var kompl = kom1 + PK_S3.so4etaniya[mr2][ir2].kompl;
		var cena = cen1 + PK_S3.so4etaniya[mr2][ir2].price;
		if (cena <= PK_S3.setting.bablo){
		    var add = true;
		    for (var ii = PK_S3.so4etaniya[mr3].length - 1; ii >= 0; --ii){
		        if ((PK_S3.so4etaniya[mr3][ii].ride >= ride) && (PK_S3.so4etaniya[mr3][ii].kompl >= kompl) && (PK_S3.so4etaniya[mr3][ii].price <= cena) && (PK_S3.so4etaniya[mr3][ii].speed <= speed)){
			    add = false; break;
		        }
			if ((PK_S3.so4etaniya[mr3][ii].ride <= ride) && (PK_S3.so4etaniya[mr3][ii].kompl <= kompl) && (PK_S3.so4etaniya[mr3][ii].price >= cena) && (PK_S3.so4etaniya[mr3][ii].speed >= speed)){
			    PK_S3.so4etaniya[mr3].splice(ii,1);
			    continue;
			}
		    }
		    if (add){
			PK_S3.so4etaniya[mr3].push( {ride: ride, speed: speed, kompl: kompl, price:cena});
			var l = PK_S3.so4etaniya[mr3].length - 1;
			PK_S3.so4etaniya[mr3][l].ids = [];
			for (var j1 = 0; j1 < PK_S3.so4etaniya[mr1][ir1].ids.length; ++j1){
			    PK_S3.so4etaniya[mr3][l].ids.push(PK_S3.so4etaniya[mr1][ir1].ids[j1]);
			}
			for (var j2 = 0; j2 < PK_S3.so4etaniya[mr2][ir2].ids.length; ++j2){
			    PK_S3.so4etaniya[mr3][l].ids.push(PK_S3.so4etaniya[mr2][ir2].ids[j2]);
			}
			PK_S3.so4etaniya[mr3][l].sets = sets1 + sets2;
			PK_S3.so4etaniya[mr3][l].ispolz = true;
			PK_S3.so4etaniya[mr1][ir1].ispolz = true;
			PK_S3.so4etaniya[mr2][ir2].ispolz = true;
			PK_S3.so4etaniya[mr3][l].old = false;
			PK_S3.so4etaniya[mr1][ir1].old = false;
			PK_S3.so4etaniya[mr2][ir2].old = false;
		    }
		}
	    }
	}
	--PK_S3.rekurs.index_mask;
    }
    PK_S3.podgotavlivaem_rezultat_moving();
}

PK_S3.polnyj_perebor_sleep = function(){
    var max_mask = Math.pow(2, PK_S3.types.length) - 1;
    var progress = $('pk_s3_progress_bar');
    var current_task = $('current_task_box_text');
    var fval = (PK_S3.rekurs.mask>0)?PK_S3.progress.array_mask[PK_S3.rekurs.mask]:0;
    fval = 100 * (fval + PK_S3.setting.sej4as_rabota - 1) / PK_S3.setting.s4itaem_rabot;
    if (progress){
	progress.setAttribute ('value', parseInt(fval, 10));
    }
    if (current_task){
	var sx = new Array(parseInt(fval/3.3, 10)).join('#');
	var ss = new Array(parseInt(31 - fval/3.3, 10)).join('=');
	var sv = '|'+sx+ss+'|';
	current_task.textContent = sv;
    }

    var infinity = true;
    while (infinity){
	var date = new Date();
	if (PK_S3.rekurs.time + PK_S3.rekurs.working < date.getTime()){
	    PK_S3.rekurs.time = date.getTime() + PK_S3.rekurs.delay;
	    setTimeout (PK_S3.polnyj_perebor_sleep, PK_S3.rekurs.delay);
	    return;
	}
	if (PK_S3.rekurs.mask > max_mask / 2){
	    var izmeneniya = false;
	    for (var m8 = 0; m8 < max_mask; ++m8){
	        for (var i8 = PK_S3.so4etaniya[m8].length - 1; i8>= 0; --i8){
		    if (!PK_S3.so4etaniya[m8][i8].ispolz){
			PK_S3.so4etaniya[m8][i8].old = true;
		    }
		    else{
		        PK_S3.so4etaniya[m8][i8].ispolz = false;
		        izmeneniya = true;
		    }
		}
	    }
	    if (!izmeneniya) infinity = false;
	    PK_S3.rekurs.mask = -1;
	    PK_S3.rekurs.index_mask = -1;
	}
	if (PK_S3.rekurs.index_mask < 0){
	    // пора переходить на следущую маску;
	    ++PK_S3.rekurs.mask;
	    PK_S3.rekurs.index_mask = PK_S3.so4etaniya[PK_S3.rekurs.mask].length - 1;
	    continue;
	}
	var ms1 = PK_S3.rekurs.mask;
	var is1 = PK_S3.rekurs.index_mask;
	var old1 = PK_S3.so4etaniya[ms1][is1].old
        var hea1 = PK_S3.so4etaniya[ms1][is1].heal;
	var reg1 = PK_S3.so4etaniya[ms1][is1].regen;
	var cen1 = PK_S3.so4etaniya[ms1][is1].price;
	var sets1 = PK_S3.so4etaniya[ms1][is1].sets;
        for (var ms2 = ms1 + 1; ms2 < max_mask; ++ms2){
	    if (ms1&ms2) continue;
	    var ms3 = ms1 + ms2;
	    for (var is2 = PK_S3.so4etaniya[ms2].length - 1; is2 >= 0; --is2){
		if (old1&&PK_S3.so4etaniya[ms2][is2].old) continue;
		sets2 = PK_S3.so4etaniya[ms2][is2].sets;
		if (sets1&sets2) continue;
		var heal = hea1 + PK_S3.so4etaniya[ms2][is2].heal;
		var regen = reg1 * PK_S3.so4etaniya[ms2][is2].regen;
		var cena = cen1 + PK_S3.so4etaniya[ms2][is2].price;
		if (cena <= PK_S3.setting.bablo){
		    var add = true;
		    for (var ii = PK_S3.so4etaniya[ms3].length - 1; ii >= 0; --ii){
			if (PK_S3.so4etaniya[ms3][ii].regen > regen){
			    add = false; break;
			}
			if (PK_S3.so4etaniya[ms3][ii].regen < regen){
			    PK_S3.so4etaniya[ms3].splice(ii,1);
			    continue;
			}
		        if ((PK_S3.so4etaniya[ms3][ii].heal >= heal) && (PK_S3.so4etaniya[ms3][ii].price <= cena)){
			    add = false; break;
		        }
			if ((PK_S3.so4etaniya[ms3][ii].heal <= heal) && (PK_S3.so4etaniya[ms3][ii].price >= cena)){
			    PK_S3.so4etaniya[ms3].splice(ii,1);
			    continue;
			}
		    }
		    if (add){
			PK_S3.so4etaniya[ms3].push( {heal: heal, regen: regen, price:cena});
			var l = PK_S3.so4etaniya[ms3].length - 1;
			PK_S3.so4etaniya[ms3][l].ids = [];
			for (var j1 = 0; j1 < PK_S3.so4etaniya[ms1][is1].ids.length; ++j1){
			    PK_S3.so4etaniya[ms3][l].ids.push(PK_S3.so4etaniya[ms1][is1].ids[j1]);
			}
			for (var j2 = 0; j2 < PK_S3.so4etaniya[ms2][is2].ids.length; ++j2){
			    PK_S3.so4etaniya[ms3][l].ids.push(PK_S3.so4etaniya[ms2][is2].ids[j2]);
			}
			PK_S3.so4etaniya[ms3][l].sets = sets1 + sets2;
			PK_S3.so4etaniya[ms3][l].ispolz = true;
			PK_S3.so4etaniya[ms1][is1].ispolz = true;
			PK_S3.so4etaniya[ms2][is2].ispolz = true;
			PK_S3.so4etaniya[ms3][l].old = false;
			PK_S3.so4etaniya[ms1][is1].old = false;
			PK_S3.so4etaniya[ms2][is2].old = false;
		    }
		}
	    }
	}
	--PK_S3.rekurs.index_mask;
    }
    PK_S3.podgotavlivaem_rezultat_sleep();
}

PK_S3.podgotavlivaem_rezultat_to = function (){
    var progress = $('pk_s3_progress_bar');
    if (progress){
	progress.setAttribute ('value', parseInt((0.99 + PK_S3.setting.sej4as_rabota - 1) / PK_S3.setting.s4itaem_rabot * 100, 10));
    }
    var irab = PK_S3.tekushaya_rabota;


    PK_S3.resultaty[irab] = {};
    PK_S3.resultaty[irab].bonus = 0;
    PK_S3.resultaty[irab].selfTO = Math.floor(PK_S3.summa_to2(Character, PK_S3.raboty[irab].navyki));
    PK_S3.resultaty[irab].TO = PK_S3.resultaty[irab].bonus + PK_S3.resultaty[irab].selfTO - PK_S3.raboty[irab].malus;
    if (irab == PK_S3.raboty.health){
	PK_S3.resultaty[irab].TO = 90 + Character.level * 10 + PK_S3.resultaty[irab].TO * PK_S3.bonus.life;
    }
	
    var val = Math.round((((0.9 * PK_S3.raboty[irab].resultaty.dengi + 5) * Math.pow(PK_S3.resultaty[irab].TO + 1, 0.2))) * 2 * PK_S3.bonus.money);
    PK_S3.resultaty[irab].dengi = (isNaN(val)||(val < 0)||(PK_S3.resultaty[irab].TO < 0)) ? 0 : val;
    val = Math.round(PK_S3.raboty[irab].resultaty.opyt * 2 * PK_S3.bonus.exp);
    PK_S3.resultaty[irab].opyt = (isNaN(val)||(val < 0)||(PK_S3.resultaty[irab].TO < 0)) ? 0 : val;
    val = Math.round((((0.9 * PK_S3.raboty[irab].resultaty.vezenie + 5) * Math.pow(PK_S3.resultaty[irab].TO + 1, 0.2))) * 15 * PK_S3.bonus.money);
    PK_S3.resultaty[irab].vezenie = (isNaN(val)||(val < 0)||(PK_S3.resultaty[irab].TO < 0)) ? 0 : val;
    // vezmin = vezmax / 3.   vez_sred = (min+max)/2 = vezmin*2/3;
    val = Math.round((8*Math.pow(PK_S3.raboty[irab].resultaty.boom, 1.35)) / (PK_S3.resultaty[irab].TO + 4));
    PK_S3.resultaty[irab].boom = (isNaN(val)||(val < 0)||(PK_S3.resultaty[irab].TO < 0)) ? 99999 : val;

    PK_S3.resultaty[irab].items = [];
    PK_S3.resultaty[irab].itemsto = [];
    for (var i = 0; i < PK_S3.types.length; ++i){
	var t = PK_S3.types[i];
	PK_S3.resultaty[irab].items[t] = [];
	PK_S3.resultaty[irab].itemsto[t] = [];
	for (var j = 0; j < PK_S3.vyborka_to[t].length; ++j){
	    PK_S3.resultaty[irab].items[t][j] = PK_S3.vyborka_to[t][j].id;
	    PK_S3.resultaty[irab].itemsto[t][j] = PK_S3.vyborka_to[t][j].bonus;
	}
    }

    PK_S3.resultaty[irab].skills = {};
    for (var s in PK_S3.raboty[irab].navyki){
	var sk = (Character.skills[s]||(Character.skills[s]==0)) ? Character.skills[s] : Character.attributes[s];
	PK_S3.resultaty[irab].skills[s] = sk;
    }

    var progress = $('pk_s3_progress_bar');
    var current_task = $('current_task_box_text');
    var fval = 100 * PK_S3.setting.sej4as_rabota / PK_S3.setting.s4itaem_rabot;
    if (progress){
	progress.setAttribute ('value', parseInt(fval, 10));
    }
    if (current_task){
	var sx = new Array(parseInt(fval/3.3, 10)).join('#');
	var ss = new Array(parseInt(31 - fval/3.3, 10)).join('=');
	var sv = '|'+sx+ss+'|';
	current_task.textContent = sv;
    }
    //setTimeout (PK_S3.prostoj_otbor_to, PK_S3.rekurs.delay);
};

PK_S3.podgotavlivaem_rezultat = function (){
    var progress = $('pk_s3_progress_bar');
    if (progress){
	progress.setAttribute ('value', parseInt((0.99 + PK_S3.setting.sej4as_rabota - 1) / PK_S3.setting.s4itaem_rabot * 100, 10));
    }
    var max_mask = Math.pow(2, PK_S3.types.length) - 1;
    var max_index = -1;
    var max_value = -1;
    var irab = PK_S3.tekushaya_rabota;
    for (var i = PK_S3.so4etaniya[max_mask].length - 1; i >= 0; --i){
	if (PK_S3.so4etaniya[max_mask][i].bonus > max_value){
	    max_value = PK_S3.so4etaniya[max_mask][i].bonus;
	    max_index = i;
	}
    }
    if (max_index >= 0){
	
	var is_duel = ((irab >= PK_S3.raboty.duel_min)&&(irab < PK_S3.raboty.duel_max)) ? true : false;
	var hand_shot = Character.skills.punch - Character.skills.shot;
	if (is_duel){
	    if (PK_S3.raboty[irab].navyki.punch){
		hand_shot = 100;
	    }
	    else if (PK_S3.raboty[irab].navyki.shot){
		hand_shot = -100;
	    }
	}
	for (var i = PK_S3.so4etaniya[max_mask][max_index].ids.length - 1; i >= 0; --i){
	    cID = PK_S3.so4etaniya[max_mask][max_index].ids[i];
	    if (cID > 0){
		var vesch = PK_S3.items[cID];
		var ochki = 0; //PK_S3.summa_to(vesch.bonus, PK_S3.raboty[irab].navyki);
		if (is_duel&&(vesch.type=='right_arm')){
		    ochki += (vesch.damage.damage_min + vesch.damage.damage_max)/2;
		    if (vesch.sub_type=='hand'){
			ochki += hand_shot;
		    }
		    if (vesch.sub_type=='shot'){
			ochki -= hand_shot;
		    }
		    PK_S3.so4etaniya[max_mask][max_index].bonus -= ochki;
		}
	    }
	}

        PK_S3.resultaty[irab] = {};
	PK_S3.resultaty[irab].bonus = Math.floor(PK_S3.so4etaniya[max_mask][max_index].bonus);
	PK_S3.resultaty[irab].selfTO = Math.floor(PK_S3.summa_to2(Character, PK_S3.raboty[irab].navyki));
	PK_S3.resultaty[irab].TO = PK_S3.resultaty[irab].bonus + PK_S3.resultaty[irab].selfTO - PK_S3.raboty[irab].malus;
	
	if ((irab == PK_S3.raboty.build)&&(PK_S3.bonus.build)){
	    PK_S3.resultaty[irab].TO *= PK_S3.bonus.build;
	}
	if (irab == PK_S3.raboty.health){
	    PK_S3.resultaty[irab].TO = 90 + Character.level * 10 + PK_S3.resultaty[irab].TO * PK_S3.bonus.life;
	}
	var val = Math.round((((0.9 * PK_S3.raboty[irab].resultaty.dengi + 5) * Math.pow(PK_S3.resultaty[irab].TO + 1, 0.2))) * 2 * PK_S3.bonus.money);
	PK_S3.resultaty[irab].dengi = (isNaN(val)||(val < 0)||(PK_S3.resultaty[irab].TO < 0)) ? 0 : val;
	val = Math.round(PK_S3.raboty[irab].resultaty.opyt * 2 * PK_S3.bonus.exp);
	PK_S3.resultaty[irab].opyt = (isNaN(val)||(val < 0)||(PK_S3.resultaty[irab].TO < 0)) ? 0 : val;
	val = Math.round((((0.9 * PK_S3.raboty[irab].resultaty.vezenie + 5) * Math.pow(PK_S3.resultaty[irab].TO + 1, 0.2))) * 15 * PK_S3.bonus.money);
	PK_S3.resultaty[irab].vezenie = (isNaN(val)||(val < 0)||(PK_S3.resultaty[irab].TO < 0)) ? 0 : val;
	// vezmin = vezmax / 3.   vez_sred = (min+max)/2 = vezmin*2/3;
	val = Math.round((8*Math.pow(PK_S3.raboty[irab].resultaty.boom, 1.35)) / (PK_S3.resultaty[irab].TO + 4));
	PK_S3.resultaty[irab].boom = (isNaN(val)||(val < 0)||(PK_S3.resultaty[irab].TO < 0)) ? 99999 : val;
	PK_S3.resultaty[irab].sets = PK_S3.so4etaniya[max_mask][max_index].sets;
	PK_S3.resultaty[irab].items = [];
	PK_S3.resultaty[irab].itemsto = [];
	for (var i = PK_S3.so4etaniya[max_mask][max_index].ids.length - 1; i >= 0; --i){
	    cID = PK_S3.so4etaniya[max_mask][max_index].ids[i];
	    if (cID > 0){
		PK_S3.resultaty[irab].items[PK_S3.items[cID].type] = cID;
		PK_S3.resultaty[irab].itemsto[PK_S3.items[cID].type] = PK_S3.summa_to(PK_S3.items[cID].bonus, PK_S3.raboty[irab].navyki);
	    }
	}
	if (PK_S3.setting.is_luck){
	    for (var i = 0; i < PK_S3.types.length; ++i){
		var vyb = PK_S3.vyborka[PK_S3.types[i]]['season_set']
		if (vyb){
		    PK_S3.resultaty[irab].items[PK_S3.types[i]] = vyb.id;
		    PK_S3.resultaty[irab].itemsto[PK_S3.types[i]] = vyb.bonus;
		}
	    }
	}
	if (!PK_S3.resultaty[irab].items.animal){
	    PK_S3.resultaty[irab].itemsto.animal = 0;
	    for (var i = 605; i >= 600; --i){
		if (PK_S3.vozmozhnye_veschi[i]){
		    PK_S3.resultaty[irab].items.animal = i;
		    break;
		}
	    }
	    if (!PK_S3.resultaty[irab].items.animal && PK_S3.vozmozhnye_veschi[607]) PK_S3.resultaty[irab].items.animal = 607;
	    if (!PK_S3.resultaty[irab].items.animal && PK_S3.vozmozhnye_veschi[607]) PK_S3.resultaty[irab].items.animal = 609;
	    if (!PK_S3.resultaty[irab].items.animal && PK_S3.vozmozhnye_veschi[607]) PK_S3.resultaty[irab].items.animal = 614;
	}
	if (!PK_S3.resultaty[irab].items.animal){
	    PK_S3.resultaty[irab].itemsto.animal = 0;
	}
	else{
	    PK_S3.resultaty[irab].itemsto.animal = PK_S3.summa_to(PK_S3.items[PK_S3.resultaty[irab].items.animal].bonus, PK_S3.raboty[irab].navyki);
	};
	if (PK_S3.activity == 'nenuzhnoe'){
	    for (var i = 0; i < PK_S3.types.length; ++i){
		if (PK_S3.resultaty[irab].items[PK_S3.types[i]]){
		    PK_S3.ispolzuemye[PK_S3.resultaty[irab].items[PK_S3.types[i]]] = true;
		}
	    }
	}
	PK_S3.resultaty[irab].skills = {};
	var kompl = [];
	for (var i = 0; i < PK_S3.nabory.length; ++i){
	    kompl[i] = 0;
	    for (var j = 0; j < PK_S3.types.length; ++j){
		var cID = PK_S3.resultaty[irab].items[PK_S3.types[j]];
		if (cID&&(cID>0)&&(PK_S3.items[cID].set.key==PK_S3.nabory[i])){
		    ++kompl[i];
		}
	    }
	}
	for (var s in PK_S3.raboty[irab].navyki){
	    var sk = (Character.skills[s]||(Character.skills[s]==0)) ? Character.skills[s] : Character.attributes[s];
	    var z = {};
	    z[s] = 1;
	    for (var i = 0; i < PK_S3.types.length; ++i){
		var cID = PK_S3.resultaty[irab].items[PK_S3.types[i]];
		if (cID&&(cID>0)){
		    sk += PK_S3.summa_to(PK_S3.items[cID].bonus, z);
		}
	    }
	    for (var k = 0; k < PK_S3.nabory.length; ++k){
		if (kompl[k]>0){
		    sk += PK_S3.summa_to(PK_S3.komplekty[PK_S3.nabory[k]][kompl[k]].bonus, z);
		}
	    }
	    PK_S3.resultaty[irab].skills[s] = sk;
	}
    }
    else{
	alert ('error d\'t find max set');
    }

    var progress = $('pk_s3_progress_bar');
    var current_task = $('current_task_box_text');
    var fval = 100 * PK_S3.setting.sej4as_rabota / PK_S3.setting.s4itaem_rabot;
    if (progress){
	progress.setAttribute ('value', parseInt(fval, 10));
    }
    if (current_task){
	var sx = new Array(parseInt(fval/3.3, 10)).join('#');
	var ss = new Array(parseInt(31 - fval/3.3, 10)).join('=');
	var sv = '|'+sx+ss+'|';
	current_task.textContent = sv;
    }
    setTimeout (PK_S3.otbor_nuzhnykh, PK_S3.rekurs.delay);
};

PK_S3.podgotavlivaem_rezultat_fort = function(){
    var progress = $('pk_s3_progress_bar');
    if (progress){
	progress.setAttribute ('value', parseInt((100 * PK_S3.setting.sej4as_rabota - 1) / PK_S3.setting.s4itaem_rabot, 10));
    }
    var max_mask = Math.pow(2, PK_S3.types.length) - 1;
    for (var i = PK_S3.so4etaniya[max_mask].length - 1; i >= 0; --i){
	if (PK_S3.so4etaniya[max_mask][i].health < PK_S3.setting.min_health){
	    PK_S3.so4etaniya[max_mask].splice(i,1);
	}
    }
    var frab = PK_S3.tekushaya_rabota
    var frabota = PK_S3.raboty[frab];
    var max_value = 0;
    var max_index = -1;
    var dmg = 0;
    for (var i = PK_S3.so4etaniya[max_mask].length - 1; i >= 0; --i){
	var aim = Character.skills.aim;
	var dodge = Character.skills.dodge;
	var leadership = Character.skills.leadership;
	var skill = 0;
	if (frabota.navyki.endurance){
	    skill += Character.skills.endurance;
	}
	else{
	    skill += Character.skills.hide;
	}
	kompl = {};
	for (var j = PK_S3.so4etaniya[max_mask][i].ids.length - 1; j >= 0; --j){
	    var fID = PK_S3.so4etaniya[max_mask][i].ids[j];
	    if (fID && (fID > 0)){
		var bron = PK_S3.items[fID];
		if (bron.type == 'left_arm'){
		    var dmg_c = bron.damage.damage_min + bron.damage.damage_max;
		    if (dmg_c < dmg) continue;
		    dmg = dmg_c;
		}
		aim += PK_S3.summa_to(bron.bonus, {aim:1});
		dodge += PK_S3.summa_to(bron.bonus, {dodge:1});
		leadership += PK_S3.summa_to(bron.bonus, {leadership:1});
		if (frabota.navyki.endurance){
		    skill+= PK_S3.summa_to(bron.bonus, {endurance:1});
		}
		else{
		    skill+= PK_S3.summa_to(bron.bonus, {hide:1});
		}
		if (bron.set.key){
		    if (kompl[bron.set.key]){
			++kompl[bron.set.key]
		    }
		    else{
			kompl[bron.set.key] = 1;
		    }
		}
	    }
	}
	for (var j = 0; j < PK_S3.nabory.length; ++j){
	    if (kompl[PK_S3.nabory[j]]){
		var kbonus = PK_S3.komplekty[PK_S3.nabory[j]][kompl[PK_S3.nabory[j]]].bonus
		aim += PK_S3.summa_to(kbonus, {aim:1});
		dodge += PK_S3.summa_to(kbonus, {dodge:1});
		leadership += PK_S3.summa_to(kbonus, {leadership:1});
		if (frabota.navyki.endurance){
		    skill += PK_S3.summa_to(kbonus, {endurance:1});
		}
		else{
		    skill += PK_S3.summa_to(kbonus, {hide:1});
		}
	    }
	}
	var f_a = PK_S3.fort_bonus(aim);
	var f_d = PK_S3.fort_bonus(dodge);
	var f_s = PK_S3.fort_bonus(skill);
	var f_l = PK_S3.fort_bonus(leadership);
	var value = f_a * frabota.navyki.aim + f_d * frabota.navyki.dodge + f_s + f_l;
	if (value > max_value){
	    max_value = value;
	    max_index = i;
	    // попытка сделать навыки более "ровными"
	    var delit = 4;
	    if (frabota.navyki.aim < 0.1){
		aim = 0;
		delit = 3;
	    }
	    if ((frabota.navyki.dodge < 0.1)){
		dodge = 0;
		delit = 3;
	    }
	    var sum = aim + dodge + skill + leadership;
	    var sa = sum / delit;
	    var d_aim = sa - Character.skills.aim;
	    if (d_aim <= 0) d_aim = 0.001;
	    if (frabota.navyki.aim < 0.1){
		d_aim = 0.001;
	    }
	    var d_dodge = sa - Character.skills.dodge;
	    if (d_dodge <= 0) d_dodge = 0.001;
	    if ((frabota.navyki.dodge < 0.1)){
		d_dodge = 0.001;
	    }
	    var d_leadership = sa - Character.skills.leadership;
	    if (d_leadership <= 0) d_leadership = 0.001;
	    
	    if (frabota.navyki.endurance){
		var d_skill = sa - Character.skills.endurance;
	    }
	    else{
		var d_skill = sa - Character.skills.hide;
	    }
	    if (d_skill <= 0) d_skill = 0.001;

	    var d_sum = d_aim + d_dodge + d_skill + d_leadership;
	    // окончание попытки.
	    
	    PK_S3.forty.ves.aim = d_aim / d_sum;
	    PK_S3.forty.ves.dodge = d_dodge / d_sum;
	    PK_S3.forty.ves.leadership = d_leadership / d_sum;
	    PK_S3.forty.ves.skill = d_skill / d_sum;
	    PK_S3.forty.items = [];
	    for (var f = PK_S3.so4etaniya[max_mask][max_index].ids.length - 1; f >= 0; --f){
		PK_S3.forty.items[f] = PK_S3.so4etaniya[max_mask][max_index].ids[f];
	    }
	    PK_S3.forty.old_attack = 23.5 + f_a + f_s + PK_S3.apply_fort_bonus_lead(f_l);
	    PK_S3.forty.old_defense = 8.5 + f_d + f_s + PK_S3.apply_fort_bonus_lead(f_l);
	}
	
    }
    if (max_index >= 0){
	var next = false;
	if (PK_S3.forty.max_value < max_value){
	    PK_S3.forty.max_value = max_value;
	    PK_S3.resultaty[frab].items = [];
	    for (var f = PK_S3.forty.items.length - 1; f >= 0; --f){
		fID = PK_S3.forty.items[f];
		if (fID > 0){
		    PK_S3.resultaty[frab].items[PK_S3.items[fID].type] = fID;
		}
	    }
	    if (!PK_S3.resultaty[frab].items.animal){
		for (var ff = 605; ff >= 600; --ff){
		    if (PK_S3.vozmozhnye_veschi[ff]){
		        PK_S3.resultaty[frab].items.animal = ff;
		        break;
		    }
		}
		if (!PK_S3.resultaty[frab].items.animal && PK_S3.vozmozhnye_veschi[607]) PK_S3.resultaty[frab].items.animal = 607;
	    }
	    PK_S3.forty.attack = PK_S3.forty.old_attack;
	    PK_S3.forty.defense = PK_S3.forty.old_defense;
	    next = true;
	}
	else if (PK_S3.forty.old_value < max_value){
	    PK_S3.forty.old_value = max_value;
	    next = true;
	}
	if (PK_S3.forty.old_value == PK_S3.forty.max_value){
	    next = false;
	}
	if (next){
	    PK_S3.otbor_nuzhnykh_fort(frab);
	    return;
	}
    }
    // вещи хранятся в результатах.
    PK_S3.resultaty[frab].dengi = 0;
    PK_S3.resultaty[frab].opyt = 0;
    PK_S3.resultaty[frab].vezenie = 0;
    PK_S3.resultaty[frab].boom = 0;


    if (PK_S3.forty.max_value <= 0){
	var aim = Character.skills.aim;
	var dodge = Character.skills.dodge;
	var leadership = Character.skills.leadership;
	var skill = 0;
	if (frabota.navyki.endurance){
	    skill += Character.skills.endurance;
	}
	else{
	    skill += Character.skills.hide;
	}
	PK_S3.resultaty[frab].items = [];
	var f_a = PK_S3.fort_bonus(aim);
	var f_d = PK_S3.fort_bonus(dodge);
	var f_s = PK_S3.fort_bonus(skill);
	var f_l = PK_S3.fort_bonus(leadership);
	PK_S3.forty.attack = 23.5 + f_a + f_s + PK_S3.apply_fort_bonus_lead(f_l);
	PK_S3.forty.defense = 8.5 + f_a + f_s + PK_S3.apply_fort_bonus_lead(f_l);
	PK_S3.forty.max_value = 0;
    }
    
    PK_S3.resultaty[frab].skills = {};
    var kompl = [];
    for (var i = 0; i < PK_S3.nabory.length; ++i){
	kompl[i] = 0;
	for (var j = 0; j < PK_S3.types.length; ++j){
	    var cID = PK_S3.resultaty[frab].items[PK_S3.types[j]];
	    if (cID&&(cID>0)&&(PK_S3.items[cID].set.key==PK_S3.nabory[i])){
		++kompl[i];
	    }
	}
    }
    var hnav = frabota.navyki;
    hnav.health = 1;
    for (var s in hnav){
	var sk = Character.skills[s];
	var z = {};
	z[s] = 1;
	for (var i = 0; i < PK_S3.types.length; ++i){
	    var cID = PK_S3.resultaty[frab].items[PK_S3.types[i]];
	    if (cID&&(cID>0)){
		sk += PK_S3.summa_to(PK_S3.items[cID].bonus, z);
	    }
	}
	for (var k = 0; k < PK_S3.nabory.length; ++k){
	    if (kompl[k]>0){
		sk += PK_S3.summa_to(PK_S3.komplekty[PK_S3.nabory[k]][kompl[k]].bonus, z);
	    }
        }
	PK_S3.resultaty[frab].skills[s] = sk;
    }
    PK_S3.resultaty[frab].selfTO = Math.round(PK_S3.forty.attack*100)/100;
    PK_S3.resultaty[frab].bonus = Math.round(PK_S3.forty.defense*100)/100;
    PK_S3.resultaty[frab].TO = Math.round(PK_S3.forty.max_value*100)/100;
    PK_S3.forty.ves = {aim:1, dodge:1, leadership:1, skill:1};
    PK_S3.forty.is_zero = true;


    if (PK_S3.activity == 'nenuzhnoe'){
        for (var i = 0; i < PK_S3.types.length; ++i){
	    if (PK_S3.resultaty[frab].items[PK_S3.types[i]]){
		PK_S3.ispolzuemye[PK_S3.resultaty[frab].items[PK_S3.types[i]]] = true;
	    }
	}
    }

    var progress = $('pk_s3_progress_bar');
    var current_task = $('current_task_box_text');
    var fval = 100 * PK_S3.setting.sej4as_rabota / PK_S3.setting.s4itaem_rabot;
    if (progress){
	progress.setAttribute ('value', parseInt(fval, 10));
    }
    if (current_task){
	var sx = new Array(parseInt(fval/3.3, 10)).join('#');
	var ss = new Array(parseInt(31 - fval/3.3, 10)).join('=');
	var sv = '|'+sx+ss+'|';
	current_task.textContent = sv;
    }
    setTimeout (PK_S3.otbor_nuzhnykh, PK_S3.rekurs.delay);
}

PK_S3.podgotavlivaem_rezultat_moving = function (){
    var progress = $('pk_s3_progress_bar');
    if (progress){
	progress.setAttribute ('value', parseInt((0.99 + PK_S3.setting.sej4as_rabota - 1) / PK_S3.setting.s4itaem_rabot * 100, 10));
    }
    var max_mask = Math.pow(2, PK_S3.types.length) - 1;
    var max_index = -1;
    var max_value = 0;
    var max_zver = 0;
    var irab = PK_S3.raboty.moving;
    var iRide = Character.skills.ride;
    for (var i = PK_S3.so4etaniya[max_mask].length - 1; i >= 0; --i){
	aID = 0;
	for (var j = PK_S3.so4etaniya[max_mask][i].ids.length; j >= 0; --j){
	    var cID = PK_S3.so4etaniya[max_mask][i].ids[j];
	    if ((cID >= 600)&&(cID < 700)){
		aID = cID;
	    }
	}
	var skorost = 100;
	if (aID){
	    //var skor_zverya = PK_S3.items[aID].speed;
	    //var skor_bonusov = PK_S3.so4etaniya[max_mask][i].speed / skor_zverya; // невероятная (пока?) скорость на других предметах
	    //skorost = 100 / skor_zverya + iRide + PK_S3.so4etaniya[max_mask][i].ride;
	    //skorost /= skor_bonusov;
	    skorost = 100 / PK_S3.so4etaniya[max_mask][i].speed + iRide + PK_S3.so4etaniya[max_mask][i].ride;
	    skorost *= (1 + PK_S3.so4etaniya[max_mask][i].kompl);
	}
	else{	// пеший идиот
	    skorost = 100 / PK_S3.so4etaniya[max_mask][i].speed * (1 + PK_S3.so4etaniya[max_mask][i].kompl);
	}
	if (skorost > max_value){
	    max_value = skorost;
	    max_index = i;
	    max_zver = aID;
	}
    }
    if (max_index >= 0){
	max_value *= PK_S3.bonus.speed;
        PK_S3.resultaty[irab] = {};
	PK_S3.resultaty[irab].bonus = Math.round(100 * (1 + PK_S3.so4etaniya[max_mask][max_index].kompl))+'%';
	PK_S3.resultaty[irab].selfTO = PK_S3.so4etaniya[max_mask][max_index].ride + iRide; //Character.skills
	PK_S3.resultaty[irab].TO = Math.round(max_value);
	PK_S3.resultaty[irab].sets = PK_S3.so4etaniya[max_mask][max_index].sets;
	PK_S3.resultaty[irab].items = [];
	PK_S3.resultaty[irab].itemsto = [];
	for (var i = PK_S3.so4etaniya[max_mask][max_index].ids.length - 1; i >= 0; --i){
	    cID = PK_S3.so4etaniya[max_mask][max_index].ids[i];
	    if (cID > 0){
		PK_S3.resultaty[irab].items[PK_S3.items[cID].type] = cID;
		PK_S3.resultaty[irab].itemsto[PK_S3.items[cID].type] = PK_S3.summa_to(PK_S3.items[cID].bonus, PK_S3.raboty[irab].navyki);
	    }
	}
	if (PK_S3.resultaty[irab].items.animal){
	    PK_S3.resultaty[irab].itemsto.animal = Math.round(100 / PK_S3.items[PK_S3.resultaty[irab].items.animal].speed) + '%';
	}
	PK_S3.resultaty[irab].skills = {};
	PK_S3.resultaty[irab].skills.ride = PK_S3.so4etaniya[max_mask][max_index].ride + iRide;
	PK_S3.resultaty[irab].dengi = 0;
	PK_S3.resultaty[irab].opyt = 0;
	PK_S3.resultaty[irab].vezenie = 0;
	PK_S3.resultaty[irab].boom = 99999;

        if (PK_S3.activity == 'nenuzhnoe'){
            for (var i = 0; i < PK_S3.types.length; ++i){
		if (PK_S3.resultaty[irab].items[PK_S3.types[i]]){
		    PK_S3.ispolzuemye[PK_S3.resultaty[irab].items[PK_S3.types[i]]] = true;
		}
	    }
	}
    }
    var progress = $('pk_s3_progress_bar');
    var current_task = $('current_task_box_text');
    var fval = 100 * PK_S3.setting.sej4as_rabota / PK_S3.setting.s4itaem_rabot;
    if (progress){
	progress.setAttribute ('value', parseInt(fval, 10));
    }
    if (current_task){
	var sx = new Array(parseInt(fval/3.3, 10)).join('#');
	var ss = new Array(parseInt(31 - fval/3.3, 10)).join('=');
	var sv = '|'+sx+ss+'|';
	current_task.textContent = sv;
    }
    setTimeout (PK_S3.otbor_nuzhnykh, PK_S3.rekurs.delay);
}


PK_S3.podgotavlivaem_rezultat_sleep = function (){
    var progress = $('pk_s3_progress_bar');
    if (progress){
	progress.setAttribute ('value', parseInt((0.99 + PK_S3.setting.sej4as_rabota - 1) / PK_S3.setting.s4itaem_rabot * 100, 10));
    }
    var max_mask = Math.pow(2, PK_S3.types.length) - 1;
    var max_index = -1;
    var max_value = 0;
    var max_value2 = 0;
    var irab = PK_S3.raboty.energy;
    var iHealth = Character.skills.health;
//    var baseHP = 90 + Character.level * 10 + iHealth * PK_S3.bonus.life;
    for (var i = PK_S3.so4etaniya[max_mask].length - 1; i >= 0; --i){
	var regeneration = PK_S3.so4etaniya[max_mask][i].regen;
	var health = PK_S3.so4etaniya[max_mask][i].heal;
	if (regeneration > max_value){
	    max_value = regeneration;
	    max_value2 = health;
	    max_index = i;
	}
	else if ((regeneration == max_value) && (health > max_value2)){
	    max_value = regeneration;
	    max_value2 = health;
	    max_index = i;
	}
    }
    if (max_index >= 0){
        PK_S3.resultaty[irab] = {};
	PK_S3.resultaty[irab].bonus = PK_S3.so4etaniya[max_mask][max_index].heal;
	PK_S3.resultaty[irab].selfTO = iHealth; //Character.skills
	PK_S3.resultaty[irab].TO = Math.round(max_value*10000)/100;
	PK_S3.resultaty[irab].sets = PK_S3.so4etaniya[max_mask][max_index].sets;
	PK_S3.resultaty[irab].items = [];
	PK_S3.resultaty[irab].itemsto = [];
	for (var i = PK_S3.so4etaniya[max_mask][max_index].ids.length - 1; i >= 0; --i){
	    cID = PK_S3.so4etaniya[max_mask][max_index].ids[i];
	    if (cID > 0){
		PK_S3.resultaty[irab].items[PK_S3.items[cID].type] = cID;
		PK_S3.resultaty[irab].itemsto[PK_S3.items[cID].type] = PK_S3.summa_to(PK_S3.items[cID].bonus, {health:1});
	    }
	}
 	if (!PK_S3.resultaty[irab].items.animal){
	    for (var i = 605; i >= 600; --i){
		if (PK_S3.vozmozhnye_veschi[i]){
		    PK_S3.resultaty[irab].items.animal = i;
		    break;
		}
	    }
	    if (!PK_S3.resultaty[irab].items.animal && PK_S3.vozmozhnye_veschi[607]) PK_S3.resultaty[irab].items.animal = 607;
	    if (PK_S3.resultaty[irab].items.animal){
		PK_S3.resultaty[irab].itemsto.animal = 0;
	    }
	}
	PK_S3.resultaty[irab].skills = {};
	PK_S3.resultaty[irab].skills.health = PK_S3.so4etaniya[max_mask][max_index].heal + iHealth;
	PK_S3.resultaty[irab].dengi = 0;
	PK_S3.resultaty[irab].opyt = 0;
	PK_S3.resultaty[irab].vezenie = 0;
	PK_S3.resultaty[irab].boom = 99999;

        if (PK_S3.activity == 'nenuzhnoe'){
            for (var i = 0; i < PK_S3.types.length; ++i){
		if (PK_S3.resultaty[irab].items[PK_S3.types[i]]){
		    PK_S3.ispolzuemye[PK_S3.resultaty[irab].items[PK_S3.types[i]]] = true;
		}
	    }
	}

   }
    var progress = $('pk_s3_progress_bar');
    var current_task = $('current_task_box_text');
    var fval = 100 * PK_S3.setting.sej4as_rabota / PK_S3.setting.s4itaem_rabot;
    if (progress){
	progress.setAttribute ('value', parseInt(fval, 10));
    }
    if (current_task){
	var sx = new Array(parseInt(fval/3.3, 10)).join('#');
	var ss = new Array(parseInt(31 - fval/3.3, 10)).join('=');
	var sv = '|'+sx+ss+'|';
	current_task.textContent = sv;
    }
    setTimeout (PK_S3.otbor_nuzhnykh, PK_S3.rekurs.delay);
}


PK_S3.vyvod_prostyh_rabot = function (){
    setTimeout(PK_S3.restore_text_message, 2000);
    PK_S3.show_window_rezultat();
}

PK_S3.equip_adds = function(rabota_id){
    for (var i = 0; i < PK_S3.types.length; ++i){// PK_S3.resultaty[rabota_id].items.length;++i){
	var qID = PK_S3.resultaty[rabota_id].items[PK_S3.types[i]];
	if (qID){
	    PK_S3.odevalo4ka.items.push(qID);
	}
    }
    if ((rabota_id > 0)&&(rabota_id < PK_S3.raboty.max)){
	var minimap_job = $('minimap_job_id');
	if (minimap_job){
	    minimap_job.value = rabota_id;
	}
    }
    setTimeout(PK_S3.equip_start,PK_S3.rekurs.delay);
    return;
}

PK_S3.equip_add = function(item_id) {
    PK_S3.odevalo4ka.items.push(item_id);
    setTimeout(PK_S3.equip_start,PK_S3.rekurs.delay);
    return;
}

PK_S3.equip_start = function(){
    PK_S3.odevalo4ka.count = 0;
    if ((!wman.getById(Wear.uid)) || (!(Bag.loaded))){
	Wear.open();
	PK_S3.odevalo4ka.bagazh = true;
	PK_S3.show_text_message ('Otwieranie ekwipunku...', 5000);
    }
    setTimeout(PK_S3.equip_wait_bagazh, 10);
}

PK_S3.equip_wait_bagazh = function(){
    if (++PK_S3.odevalo4ka.count > PK_S3.odevalo4ka.repeat){
	PK_S3.show_text_message ('Nie można otwożyć ekwipunku!', 5000);
	return;
    }
    if ((!wman.getById(Wear.uid)) || (!(Bag.loaded))){
	setTimeout(PK_S3.equip_wait_bagazh, PK_S3.odevalo4ka.wait_inventory);
	return;
    }
    PK_S3.odevalo4ka.count = 0;
    PK_S3.equip_carring();
}

PK_S3.equip_carring = function(){
    if (PK_S3.odevalo4ka.items.length == 0){
	if (Character.characterSex == 'male'){
	    PK_S3.show_text_message ('Jesteś ubrany!', 5000);
	}
	else{
	    PK_S3.show_text_message ('Jesteś ubrana!', 5000);
	}
	return;
    }
    PK_S3.show_text_message ('Ubieranie!', 1000);
    var eID = PK_S3.odevalo4ka.items[0];
    var type = (PK_S3.items[eID]) ? PK_S3.items[eID].type : ' ';
    if ((type==' ')||Wear.wear[type]){
	if ((type==' ')||(Wear.wear[type].obj.item_id == eID)){
	    //уже одето, выплёвываем из очереди
	    PK_S3.odevalo4ka.items.shift();
	    PK_S3.odevalo4ka.count = 0;
	    PK_S3.equip_carring();
	    return;
	}
    }
    var bag = Bag;
    var wear = Wear;
    var he_find = 0;
    for (var t = 0; (he_find == 0) && (t < PK_S3.types.length); ++t){
	var bag_type = bag.items[PK_S3.types[t]];
	for (var ii in bag_type){
	    if (bag_type[ii].obj.item_id == eID){
	       he_find = bag_type[ii];
	       break;
	    }
	}
    }
    if (he_find == 0){
	//не нашли такое, выплёвываем
	PK_S3.odevalo4ka.items.shift();
	PK_S3.equip_wait_bagazh();
	return;
    }
    wear.carry(he_find);
    PK_S3.odevalo4ka.count = 0;
    setTimeout(PK_S3.equip_wait_carry,PK_S3.odevalo4ka.wait_carry)
}

PK_S3.equip_wait_carry = function() {
    if (++PK_S3.odevalo4ka.count > PK_S3.odevalo4ka.repeat){
	// одеть не удалось, материмся и отказываемся от этой вещи
	PK_S3.show_text_message ('Przedmiot: '+PK_S3.items[PK_S3.odevalo4ka.items[0]].name+' nie może zostać założony!', 3000);
	PK_S3.odevalo4ka.items.shift();
	PK_S3.equip_carring();
	return;
    }
    var eID = PK_S3.odevalo4ka.items[0];
    var type = PK_S3.items[eID].type;
    
    if (Wear.wear[type]&&(Wear.wear[type].obj.item_id == eID)){
	PK_S3.equip_carring();
	return;
    }
    setTimeout(PK_S3.equip_wait_carry,PK_S3.odevalo4ka.wait_carry);
}

PK_S3.equip_items_save = function(irabot){
    ind = PK_S3.cookies.save.length;
    for (var i = 0; i < PK_S3.cookies.save.length; ++i){
	if (PK_S3.cookies.save[i].name == PK_S3.raboty[irabot].rus_name){
	    ind = i;
	    break;
	}
    }
    PK_S3.cookies.save[ind] = {};
    PK_S3.cookies.save[ind].name = PK_S3.raboty[irabot].rus_name;
    PK_S3.cookies.save[ind].ids = [];
    for (var i = 0; i < PK_S3.types.length; ++i){
	if (PK_S3.resultaty[irabot].items[PK_S3.types[i]]){
	    PK_S3.cookies.save[ind].ids.push (PK_S3.resultaty[irabot].items[PK_S3.types[i]]);
	}
    }
    PK_S3.save_nabory();
    PK_S3.spam_bagazh_option();
}

PK_S3.equip_items_delete = function(irabot){
    name = PK_S3.raboty[irabot].rus_name;
    for (var i = PK_S3.cookies.save.length - 1; i >= 0; --i){
	if (PK_S3.cookies.save[i].name == name){
	    PK_S3.cookies.save.splice(i,1);
	}
    }
    PK_S3.save_nabory();
    PK_S3.spam_bagazh_option();
}

PK_S3.my_name_is = function (){
    if (Character&&Character.name){
	PK_S3.cookies.name = location.host.substr(0,4)+Character.name;
	PK_S3.vyvod.region = location.host.substr(0,2);
	setTimeout(PK_S3.load_nabory, 1000);
	setTimeout(PK_S3.load_raboty, 2000);
	setTimeout(PK_S3.check_raboty, 3000);
    }
    else{
	setTimeout(PK_S3.my_name_is, 1000);
    }
};

PK_S3.check_raboty = function (){
    if (!window.JobList) return;
    if (PK_S3.vyvod.region=='ru'){
	for (var i = 1; i < PK_S3.raboty.max; ++i){
	    if (JobList[i]&&JobList[i].name && (JobList[i].name != PK_S3.raboty[i].rus_name)){
	        PK_S3.informer += 'Niewłaściwa praca. Stara nazwa: "'+PK_S3.raboty[i].rus_name+'", Nowa nazwa: "'+JobList[i].name+'"\n';
	        PK_S3.raboty[i].rus_name = JobList[i].name;
	    }
	}
    }
    else{
	for (var i = 1; i < PK_S3.raboty.max; ++i){
	    if (JobList[i]){
		PK_S3.raboty[i].orig_name = JobList[i].name;
	    }
	}
    }
}

PK_S3.except_raboty = function (id, value){
    if (PK_S3.raboty[id]){
	PK_S3.raboty[id].except = value;
    }
    PK_S3.save_raboty();
}


PK_S3.set_cookie = function (name, value){
    expires = new Date();
    expires.setTime(expires.getTime() + (1000 * 60 * 60 * 24 * 180));
    document.cookie = escape(name) + "=" + escape(value) + "; expires=" + expires.toGMTString();
}

PK_S3.get_cookie = function (name) {
    var cookie = " " + document.cookie;
    var search = " " + escape(name) + "=";
    var setStr = null;
    var offset = 0;
    var end = 0;
    if (cookie.length > 0) {
	offset = cookie.indexOf(search);
	if (offset != -1) {
	    offset += search.length;
	    end = cookie.indexOf(";", offset)
	    if (end == -1) {
		end = cookie.length;
	    }
	    setStr = unescape(cookie.substring(offset, end));
	}
    }
    return(setStr);
};

PK_S3.save_nabory = function (){
    PK_S3.bsort(PK_S3.cookies.save, 'name');
    var str = '';
    for (var i = 0; i < PK_S3.cookies.save.length; ++i){
	str += (str=='')?'':'@';
	str += PK_S3.cookies.save[i].name + '~';
	var str2 = '';
	for (var j = 0; j < PK_S3.cookies.save[i].ids.length; ++j){
	    str2+= (str2=='') ? '' : ',';
	    str2+= PK_S3.cookies.save[i].ids[j];
	}
	str += str2;
    }
    PK_S3.set_cookie(PK_S3.cookies.name, str);

    PK_S3.show_text_message ('Zestaw został zapisany', 1500);    
}

PK_S3.save_raboty = function (){
    var str = '';
    for (var i = 1; i < 999; ++i){
	if (!PK_S3.raboty[i]) continue;
	if (PK_S3.raboty[i].except){
	    str += (str=='')?'':',';
	    str += i;
	}
    }
    PK_S3.set_cookie(PK_S3.cookies.name+'r', str);
};

PK_S3.load_nabory = function (){
    var str = PK_S3.get_cookie(PK_S3.cookies.name);
    PK_S3.cookies.save = [];
    if (!str||(str=='')||(str.length==0)) return;
    var ar1 = str.split('@');
    for (var i = 0; i < ar1.length; ++i){
	if (ar1[i].length == 0) continue;
	PK_S3.cookies.save[i] = {};
	var ar2 = ar1[i].split('~');
	PK_S3.cookies.save[i].name = ar2[0];
	PK_S3.cookies.save[i].ids = [];
	if (!ar2[1]) continue;
	var ar3 = ar2[1].split(',');
	for (var j = 0; j < ar3.length; ++j){
	    PK_S3.cookies.save[i].ids.push (ar3[j]);
	}
    }
    var izbytok = false;
    for (var i = PK_S3.cookies.save.length - 1; i >= 0; --i){
	if (!PK_S3.cookies.save[i]){
	    PK_S3.cookies.save.splice(i,1);
	}
    }
    PK_S3.bsort(PK_S3.cookies.save, 'name');
    for (var i = PK_S3.cookies.save.length - 1; i > 0; --i){
	    if (PK_S3.cookies.save[i].name == PK_S3.cookies.save[i-1].name){
		PK_S3.cookies.save.splice(i,1);
		izbytok = true;
	}
    }
    if (izbytok) PK_S3.save_nabory();
}

PK_S3.load_raboty = function (){
    var str = PK_S3.get_cookie(PK_S3.cookies.name+'r');
    if (!str||(str=='')||(str.length==0)) return;
    var ar = str.split(',');
    for (var i = 0; i < ar.length; ++i){
	if (PK_S3.raboty[ar[i]]) PK_S3.raboty[ar[i]].except = true;
    }
}


PK_S3.equip_motivation = function (job_name){
    PK_S3.load_nabory();
    for (var i = 0; i < PK_S3.cookies.save.length; ++i){
	if (PK_S3.cookies.save[i].name==job_name){
	    if (!PK_S3.cookies.save[i].ids) return;
	    for (var j = 0; j < PK_S3.types.length; ++j){
		var qID = PK_S3.cookies.save[i].ids[j]
		if (qID){
		    PK_S3.odevalo4ka.items.push(qID);
		}
	    }
	    setTimeout(PK_S3.equip_start,PK_S3.rekurs.delay);
	    return;
	}
    }
    PK_S3.show_text_message ('Brak zapisanego zestawu', 3000);
};

PK_S3.equip_add2 = function (){
    var elem = $('pk_s3_odevalo4ka_select2');
    if (!elem) return;
    var ind = elem.value - 1;
    if (!PK_S3.cookies.save[ind]) return;
    for (var i = 0; i < PK_S3.types.length; ++i){
	var qID = PK_S3.cookies.save[ind].ids[i]
	if (qID){
	    PK_S3.odevalo4ka.items.push(qID);
	}
    }
    setTimeout(PK_S3.equip_start,PK_S3.rekurs.delay);
    return;
}

PK_S3.equip_add3 = function (){
    var elem = $('pk_s3_odevalo4ka_select3');
    if (!elem) return;
    var ind = elem.value - 1;
    if (!PK_S3.cookies.save[ind]) return;
    for (var i = 0; i < PK_S3.types.length; ++i){
	var qID = PK_S3.cookies.save[ind].ids[i]
	if (qID){
	    PK_S3.odevalo4ka.items.push(qID);
	}
    }
    setTimeout(PK_S3.equip_start,PK_S3.rekurs.delay);
    return;
}

PK_S3.equip_save = function (){
    var inp = $('pk_s3_odevalo4ka_input');
    if (!inp) return;
    var name = inp.value;
    var ind = PK_S3.cookies.save.length;
    for (var i = 0; i < PK_S3.cookies.save.length; ++i){
	if (PK_S3.cookies.save[i].name == name){
	    ind = i;
	    break;
	}
    }
    PK_S3.cookies.save[ind] = {};
    PK_S3.cookies.save[ind].name = name;
    PK_S3.cookies.save[ind].ids = [];
    for (var itype = 0; itype < PK_S3.types.length; ++itype){
	var type = PK_S3.types[itype];
	if (Wear.wear[type]){
	    PK_S3.cookies.save[ind].ids.push (Wear.wear[type].obj.item_id);
	}
    }
    inp.value = '';
    PK_S3.save_nabory();
    PK_S3.spam_bagazh_option();
}

PK_S3.equip_del = function (){
    var elem = $('pk_s3_odevalo4ka_select2');
    if (!elem) return;
    var ind = elem.value - 1;
    PK_S3.cookies.save.splice(ind,1);
    PK_S3.save_nabory();
    PK_S3.spam_bagazh_option();
}

PK_S3.spam_bagazh_option = function (){
    var elem2 = $('pk_s3_odevalo4ka_select2');
    var elem3 = $('pk_s3_odevalo4ka_select3')
    while (elem2 && elem2.firstChild){
	elem2.removeChild(elem2.firstChild);
    }
    while (elem3 && elem3.firstChild){
	elem3.removeChild(elem3.firstChild);
    }
    for (var i = 0; i < PK_S3.cookies.save.length; ++i){
	var opt = new Element ('option', {'value':(i+1)});
	opt.textContent = PK_S3.cookies.save[i].name;
	if (elem2) elem2.appendChild(opt);
	if (elem3) elem3.appendChild(opt);
    }
}

PK_S3.spam_bagazh = function(){
	//id_graczy = [
	//{'id':'845806','nazwa':'Darius II'}];
	//sponsor = false;
	if(PremiumBoni.endTimes.automationEnd == null) return;
	//jQuery.each(id_graczy, function() {
	//	if(Character.playerId == this['id']) sponsor = true;
	//});
	//if(sponsor = false) return;
    var wear_wind = $('wear_drop')
    if (!wear_wind) return;
    if ($('pk_s3_odevalo4ka_all')) return;
    wear_wind = wear_wind.parentNode;
    PK_S3.load_nabory();
    var all = new Element ('div', {'id':'pk_s3_odevalo4ka_all', 'style':'float: left; padding: 1px 0px; position: relative; left: -5px; top: -47px;'});
    var span = new Element ('div', {'style':'cursor:pointer; font-weight:bold; color:white; padding: 0px 5px; display:inline; font-size:11px;'});
    span.textContent = 'usuń';
    span.addEventListener('click', PK_S3.equip_del, false);
    all.appendChild(span);
    var sel = new Element ('select', {'id':'pk_s3_odevalo4ka_select2', 'style':'width: 125px; background-color:#e8dab3; font-size:11px; height:18px;'});
    all.appendChild(sel);
    var span = new Element ('div', {'style':'cursor:pointer; font-weight:bold; color:white; padding: 0px 5px; display:inline; font-size:11px;'});
    span.textContent = 'ubierz się';
    span.addEventListener('click', PK_S3.equip_add2, false);
    all.appendChild(span);
    wear_wind.appendChild(all);

    var all2 = new Element ('div', {'id':'pk_s3_odevalo4ka_all2', 'style':'float:left; padding: 1px 0px; position: relative; left: -5px; top: -47px;'});
    var span = new Element ('div', {'style':'cursor:pointer; font-weight:bold; color: white; padding: 0px 5px; display:inline; font-size:11px;'});
    span.textContent = 'zapisz';
    span.addEventListener('click', PK_S3.equip_save, false);
    all2.appendChild(span);
    var inp = new Element ('input', {'id':'pk_s3_odevalo4ka_input', 'type':'text', 'value':'Nowa nazwa', 'style':'width: 150px; background-color:#e8dab3; font-size:11px; height:13px;'});
    all2.appendChild(inp);
    wear_wind.appendChild(all2);

    PK_S3.spam_bagazh_option();
}

var PK_S3funs = ['init','qsort','bsort','input_select_rdf', 'show_window_settings', 'minimize_window_settings', 'minimize_window_settings2', 'show_window_informer',
		 'minimize_window_informer', 'minimize_window_informer2', 'running_bar', 'summa_to', 'summa_to2', 'fort_bonus', 'apply_fort_bonus_lead', 'show_popup_message', 'second_init',
		 'waiting_inventory', 'compare_item', 'assign_item', 'print_item', 'parsing_inventory', 'cena_pods4eta', 'otbor_vozmozhnyh', 'otbor_nuzhnykh',
		 'otbor_nuzhnykh_fort', 'otbor_nuzhnykh_moving', 'otbor_nuzhnykh_sleep', 'otsev_nenuzhnykh', 'otsev_nenuzhnykh_fort', 'otsev_nenuzhnykh_moving',
		 'otsev_nenuzhnykh_sleep', 'polnyj_perebor', 'polnyj_perebor_fort', 'polnyj_perebor_moving', 'polnyj_perebor_sleep', 'podgotavlivaem_rezultat',
		 'podgotavlivaem_rezultat_fort', 'podgotavlivaem_rezultat_moving', 'podgotavlivaem_rezultat_sleep', 'sortirovka_rabot', 'print_raboty', 'vyvod_prostyh_rabot',
		 'show_window_rezultat', 'minimize_window_rezult', 'minimize_window_rezult2', 'equip_start', 'equip_wait_bagazh', 'equip_carring', 'equip_wait_carry', 'equip_add',
		 'equip_adds', 'my_name_is', 'set_cookie', 'get_cookie', 'spam_bagazh', 'spam_bagazh_option', 'load_nabory', 'save_nabory', 'equip_add2', 'equip_add3', 'equip_del',
		 'equip_save', 'equip_items_save', 'equip_items_delete', 'equip_motivation', 'four_init', 'restore_text_message', 'show_text_message', 'prostoj_otbor_to',
		 'podgotavlivaem_rezultat_to', 'check_raboty', 'except_raboty', 'load_raboty', 'save_raboty', 'vyvod_nenuzhnykh_items'];

pk_s3_code += 'if (window.PK_S3 == undefined){ window.PK_S3 = new Object();';
for (var i = 0; i < PK_S3funs.length; ++i){
    var PK_S3fun = 'PK_S3.'+PK_S3funs[i];
    //if (i<3) alert(eval(PK_S3fun.toString()));
    pk_s3_code += PK_S3fun + ' = ' + eval(PK_S3fun.toString()) + '\n';
};

pk_s3_code += '};\n	PK_S3.init();';
//pk_s3_code += " window.addEventListener('load', PK_S3.init, false);\n}";
pk_s3_script.innerHTML = pk_s3_code;
pk_s3_body.appendChild(pk_s3_script);

//aWindow.addEventListener('load', PK_S3.init, false);

// ================== ФУКЦИЙ ИСПРАВЛЕННЫЕ == КОНЕЦ ==================