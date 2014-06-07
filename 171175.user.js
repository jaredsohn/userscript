// ==UserScript==
// @id             OUTSIDER48-Grey
// @name           OUTSIDER48-Grey
// @namespace      localhost
// @description    Tampilan eSim OUTSIDER48-Grey
// @author         WND
// @version        1.0.0.1
// @include        http://*.e-sim.org/*
// @run-at         document-end
// ==/UserScript==
function setTheme() {
	Element.prototype.css = function(name, value)
	{
		this.style[name] = value;
		this.style['-webkit-'+name] = value;
		this.style['-moz-'+name] = value;
		this.style['-o-'+name] = value;
		this.style['-khtml-'+name] = value;
		this.style['-ms-'+name] = value;
		return this;
	};
if(document.getElementById('bestTopBar') == undefined) {
	var style = document.createElement('style');
	document.getElementById('homeButton').setAttribute('style', '');
	document.getElementById('menuFacebook').setAttribute('style', '');
	document.getElementById('container').setAttribute('style', 'top: 40px; width: 990px; margin: 0 auto; position: relative;');
	document.body.setAttribute('style', '');
	var wypelniacz = document.createElement('div');
	wypelniacz.setAttribute('style', 'background: #222; width: 100%; height: 40px; position: fixed; left: 0px; top: 0px; border-bottom: 1px solid #666; z-index: 997;');
	document.body.appendChild(wypelniacz);
	if(document.getElementsByClassName('topbarBox')[0] != undefined)
	{
		setTimeout(function() {
		document.getElementsByClassName('topbarBox')[0].setAttribute('style', ''); }, 1000);
		document.getElementsByClassName('topbarBox')[0].childNodes[1].setAttribute('style','');
		document.getElementsByClassName('topbarBox')[0].childNodes[3].setAttribute('style','font-weight: bold;');
	}
	document.getElementById('homeButton').innerHTML = 'Home';
	document.getElementById('headerRow').childNodes[1].innerHTML = '<a href="index.html"><div style="width: 400px; height: 112px; background: url(http://i964.photobucket.com/albums/ae130/When-d_Kidz_Fourever/e-Sim/OSEsim_zps96963b85.png) no-repeat; margin: 0 auto;"><span style="text-shadow: 0px 0px 4px black; color: #cccccc; font-family: &#8217;Russo One&#8217;,Impact; font-size: 58px; line-height: 105px; margin-left: 110px;">OUTSIDER48</span></div></a>';
	document.getElementById('homeButton').css('transition', '500ms');
	document.getElementById('menuFacebook').css('transition', '500ms');
    style.innerHTML = "body{ background: radial-gradient(black 15%, transparent 16%) 0 0, radial-gradient(black 15%, transparent 16%) 8px 8px, radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 0 1px, radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 8px 9px; background-color:#282828; background-size:16px 16px; } #container: { top: 27px; width: 990px; margin: 0 auto; position: relative; } .menuButton{ background: #222; height: 27px; z-index: 999; -webkit-transition: 500ms; -o-transition: 500ms; -moz-transition: 500ms; -khtml-transition: 500ms; -ms-transition: 500ms;} .menuButton:hover{ background: #111; } #navigationRow{ display: table; position: fixed; top: 0px; left: 50%; margin-left: -480px; background: #222; width: 100%; height: 27px; z-index: 998; align: center;} #homeButton{ background: #222; height: 27px; width: 40px;} #homeButton:hover{ background: #111; } .subMenu{ top: 32px; background: #222; border-left: 1px solid #666; border-right: 1px solid #666; border-bottom: 1px solid #666; } #menuFacebook{ background: #222; width: 120px; height: 27px; } .mShaded{ background: #222 !important; } .tableShaded{ box-shadow: 0px 0px 1px 1px rgba(102,102,102,0.4); border-radius: 0px; border: 1px solid rgba(102,102,102,1); color: gray; } .shadedTable{ box-shadow: 0px 0px 1px 1px rgba(102,102,102,0.4); border-radius: 0px; border: 1px solid rgba(102,102,102,1); color: gray; } #userMenu{ background: #222; border-radius: 0px; border: 1px solid #666; } #userMenu:hover{ background: #222; } .currencyFlag + b { color: gray; } .plate{ border-radius: 0px; background: #222; border-bottom: 1px solid #666; } .smallHeader { color: gray; } .rightTabGrey{ background: #222; border-radius: 0px; border-top: 1px solid #666; border-left: 1px solid #666; box-shadow: 0px 0px 1px 1px rgba(102,102,102,0.4);text-shadow: 1px 1px 0.5px #111; } .rightTabBlue{ background: #222; border-radius: 0px; border-top: 1px solid #666; border-bottom: 1px solid #666; border-left: 1px solid #666; border-right: 1px solid #666; box-shadow: 0px 0px 1px 1px rgba(102,102,102,0.4); text-shadow: 1px 1px 0.5px #111; } .miniContent{ background: #222; border-radius: 0px; border-top: 2px solid #666; border-bottom: 2px solid #666; border-left: 2px solid #666; border-right: 2px solid #666; box-shadow: 0px 0px 2px 2px rgba(102,102,102,0.4); text-shadow: 1px 1px 0.5px #111; } #userName{ color: gray; } .avatarPlate {  background-color: #222; margin-bottom: 5px; margin-left: -1px; border-radius: 0px; box-shadow: 0 0 1.5px 1.5px rgba(0, 0, 0, 0.1), 0px 0px 1.55px 1.5px rgba(0, 0, 0, 0.1) inset; border: 1.5px solid #666; padding: 0px; } .ui-corner-all{ border-radius: 0px; } .ui-widget-content{ background: #222; border: 1px solid #666; color: gray; } .miniContent { border-radius: 0px; background: #222; } .shout2 { background: #222; border-radius: 0px; border: 1px solid #666; } .showShoutDetails:hover{ background: #222; } .citizenButtons b { text-shadow: 0px 0px 0px #222; } .testDivblue { background: #222; border-radius: 0px; border: 1px solid #666; color: gray; } .smallStatsLabel b{ color: gray; text-shadow: 1px 1px 1px #222; } .blueLabel{ background: #222; border-radius: 0px; border: 1px solid #666; } .dataTable{ border-radius: 0px; border: 1px solid #666; } .dataTable > tbody > tr:first-child > td { color: gray !important; background: #222; } .dataTable tr:nth-child(even) td { background: #333; } .dataTable tr td { background: #444; } h2{ color: white; } h1{ color: white; } .testDivwhite{ background: #222; color: gray; border-radius: 0px; border: 1px solid #666; } #pagination-digg a:link, #pagination-digg a:visited { background: #222; color: #666; } .equipmentBlueBox{ background: #222; border-radius: 1px; border: 1px solid #666; } .equipmentBlueCap{ background: #222; border-radius: 1px; border: 1px solid #666; } .achievement{ background: #222; border-radius: 0px; border: 1px solid #666; } .achievement > div > b { color: #666; } .achievement > b { font-size: 12px; color: #666; } .equipmentBox, .equipmentName { background: #222; border-radius: 0px; border: 1px solid #666; } div.congressParties > div:first-child { background: #222; border-radius: 0px; border: 1px solid #666; text-shadow: 0px 0px 1px #222; } .section { color: gray; } .blueBox{ background: #BBEBFF; } .redBox{ background: #ffBBBB; } #comments > div:nth-child(odd) { background: #333; } #comments > div:nth-child(even) { background: #444; } #mapSideInfo{ background: #222 !important; } .topbarBox{ width: 240px; position: fixed; height: 80px; top: 120px; left: 5px; right: 0px; margin: 0px; font-size: 1em; color: gray; background: #222; border: 1px solid #666; border-radius: 0px; text-align: center;} .redLabel { background: #FF7373; } .greenLabel{ background: #99FD77; }  .mediumStatsLabel{ color: gray !important; text-shadow: 0px 0px 1px #222 !important; } .testDivred{ background: #666 !important; box-shadow: 0px 0px 3px red; } .medal { color: black !important; } .help { color: gray !important; } blockquote{ background-color: #222; } .shoutFundraiser{ background: #593C57; } .shoutModerator{ background: #3e3c59; } div.menuButton{text-align:center;} .subMenu a{display:block;} .mediumStatsLabel b, .smallStatsLabel a { color: gray; text-shadow: 0px 0px 1px #222; } #militaryLeader, #militaryLeader b { color: gray !important; } #twitterPlate { color: gray !important; background: #666 !important; border-radius: 0px; border: 1px solid rgba(102,102,102,1); } ";	
	document.head.appendChild(style);
	}
}
setTheme();