// ==UserScript==
// @id             OS-Cute
// @name           OS-Cute
// @namespace      localhost
// @description    Tampilan KoSim OS Cute
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
	wypelniacz.setAttribute('style', 'background: #222; width: 100%; height: 40px; position: fixed; left: 0px; top: 0px; border-bottom: 1px solid #ff00ff; z-index: 997;');
	document.body.appendChild(wypelniacz);
	if(document.getElementsByClassName('topbarBox')[0] != undefined)
	{
		setTimeout(function() { document.getElementsByClassName('topbarBox')[0].setAttribute('style', ''); }, 1000);
		document.getElementsByClassName('topbarBox')[0].childNodes[1].setAttribute('style','');
		document.getElementsByClassName('topbarBox')[0].childNodes[3].setAttribute('style','font-weight: bold;');
	}
	document.getElementById('homeButton').innerHTML = 'Home';
	document.getElementById('headerRow').childNodes[1].innerHTML = '<a href="index.html"><div style="width: 400px; height: 112px; background: url(http://i964.photobucket.com/albums/ae130/When-d_Kidz_Fourever/e-Sim/OSEsim_zps96963b85.png) no-repeat; margin: 0 auto;"><span style="text-shadow: 0px 0px 4px black; color: #cccccc; font-family: &#8217;Russo One&#8217;,Impact; font-size: 58px; line-height: 105px; margin-left: 110px;">OUTSIDER48</span></div></a>';
	document.getElementById('homeButton').css('transition', '500ms');
	document.getElementById('menuFacebook').css('transition', '500ms');
    style.innerHTML = "body{ background: #000000; } #container: { top: 27px; width: 990px; margin: 0 auto; position: relative; } .menuButton{ background: #222; height: 27px; z-index: 999; -webkit-transition: 500ms; -o-transition: 500ms; -moz-transition: 500ms; -khtml-transition: 500ms; -ms-transition: 500ms;} .menuButton:hover{ background: #ff00ff; } #navigationRow{ display: table; position: fixed; top: 0px; left: 50%; margin-left: -480px; background: #222; width: 100%; height: 27px; z-index: 998; align: center;} #homeButton{ background: #222; height: 27px; width: 40px;} #homeButton:hover{ background: #ff00ff; } .subMenu{ top: 32px; background: #222; border-left: 1px solid #ff00ff; border-right: 1px solid #ff00ff; border-bottom: 1px solid #ff00ff; } #menuFacebook{ background: #222; width: 120px; height: 27px; } .mShaded{ background: #0f0f0f !important; } .tableShaded{ box-shadow: 0px 0px 2px 2px rgba(255, 0, 255, 0.4); border-radius: 0px; border: 1px solid rgba(255,0,255,1); color: fuchsia; } .shadedTable{ border-radius: 0px; border: 1px solid rgba(255,0,255,1); box-shadow: 0px 0px 2px 2px rgba(255,0,255, 0.4); color: fuchsia; } #userMenu{ background: #0f0f0f; border-radius: 0px; border: 1px solid #ff00ff; } #userMenu:hover{ background: #0f0f0f; } .currencyFlag + b { color: lime; } .plate{ border-radius: 0px; background: #0f0f0f; border-bottom: 1px solid #ff00ff; } .smallHeader { color: fuchsia; } .rightTabGrey{ background: #0f0f0f; border-radius: 0px; border-top: 1px solid #ff00ff; border-left: 1px solid #ff00ff; box-shadow: 0px 0px 2px 2px rgba(255, 0, 255, 0.4);text-shadow: 1px 1px 0.5px #111; } .rightTabBlue{ background: #0f0f0f; border-radius: 0px; border-top: 1px solid #ff00ff; border-bottom: 1px solid #ff00ff; border-left: 1px solid #ff00ff; border-right: 1px solid #ff00ff; box-shadow: 0px 0px 2px 2px rgba(255, 0, 255, 0.4); text-shadow: 1px 1px 0.5px #111; } .miniContent{ background: #0f0f0f; border-radius: 0px; border-top: 2px solid #ff00ff; border-bottom: 2px solid #ff00ff; border-left: 2px solid #ff00ff; border-right: 2px solid #ff00ff; box-shadow: 0px 0px 2px 2px rgba(255, 0, 255, 0.4); text-shadow: 1px 1px 0.5px #111; } #userName{ color: fuchsia; } .avatarPlate {  background-color: #0f0f0f; margin-bottom: 5px; margin-left: -1px; border-radius: 0px; box-shadow: 0 0 1.5px 1.5px rgba(0, 0, 0, 0.1), 0px 0px 1.55px 1.5px rgba(0, 0, 0, 0.1) inset; border: 1.5px solid #ff00ff; padding: 0px; } .ui-corner-all{ border-radius: 0px; } .ui-widget-content{ background: #0f0f0f; border: 1px solid #ff00ff; color: fuchsia; } .miniContent { border-radius: 0px; background: #0f0f0f; } .shout2 { background: #0f0f0f; border-radius: 0px; border: 1px solid #ff00ff; } .showShoutDetails:hover{ background: #0f0f0f; } .citizenButtons b { text-shadow: 0px 0px 0px #0f0f0f; } .testDivblue { background: #0f0f0f; border-radius: 0px; border: 1px solid #ff00ff; color: fuchsia; } .smallStatsLabel b{ color: fuchsia; text-shadow: 1px 1px 1px #0f0f0f; } .blueLabel{ background: #0f0f0f; border-radius: 0px; border: 1px solid #ff00ff; } .dataTable{ border-radius: 0px; border: 1px solid #ff00ff; } .dataTable > tbody > tr:first-child > td { color: gray !important; background: #0f0f0f; } .dataTable tr:nth-child(even) td { background: #222; } .dataTable tr td { background: #333; } h2{ color: fuchsia; } h1{ color: fuchsia; } .testDivwhite{ background: #0f0f0f; color: fuchsia; border-radius: 0px; border: 1px solid #ff00ff; } #pagination-digg a:link, #pagination-digg a:visited { background: #0f0f0f; color: #ff00ff; } .equipmentBlueBox{ background: #0f0f0f; border-radius: 1px; border: 1px solid #ff00ff; } .equipmentBlueCap{ background: #0f0f0f; border-radius: 1px; border: 1px solid #ff00ff; } .achievement{ background: #0f0f0f; border-radius: 0px; border: 1px solid #ff00ff; } .achievement > div > b { color: #ff00ff; } .achievement > b { font-size: 12px; color: #ff00ff; } .equipmentBox, .equipmentName { background: #0f0f0f; border-radius: 0px; border: 1px solid #ff00ff; } div.congressParties > div:first-child { background: #0f0f0f; border-radius: 0px; border: 1px solid #ff00ff; text-shadow: 0px 0px 1px #0f0f0f; } .section { color: fuchsia; } .blueBox{ background: #00ffff; } .redBox{ background: #ffff00; } #comments > div:nth-child(odd) { background: #111; } #comments > div:nth-child(even) { background: #222; } #mapSideInfo{ background: #111 !important; } .topbarBox{ width: 240px; position: fixed; height: 80px; top: 120px; left: 5px; right: 0px; margin: 0px; font-size: 1em; color: fuchsia; background: #222; border: 1px solid #FF00FF; border-radius: 0px; text-align: center;} .redLabel { background: #ff0000; } .greenLabel{ background: #00ff00; } .mediumStatsLabel{ color: lime !important; text-shadow: 0px 0px 1px #222 !important; } .testDivred{ background: #4f0047 !important; box-shadow: 0px 0px 3px red; } .medal { color: black !important; } .help { color: fuchsia !important; } blockquote{ background-color: #222; } .shoutFundraiser{ background: #593C57; } .shoutModerator{ background: #666; } div.menuButton{text-align:center;} .subMenu a{display:block;} .mediumStatsLabel b, .smallStatsLabel a { color: fuchsia; text-shadow: 0px 0px 1px #111; } #militaryLeader, #militaryLeader b { color: fuchsia !important; } #twitterPlate { color: fuchsia !important; background: #FF00FF !important; border-radius: 0px; border: 1px solid rgba(255,0,255,1); } ";
	document.head.appendChild(style);
	}
}
setTheme();