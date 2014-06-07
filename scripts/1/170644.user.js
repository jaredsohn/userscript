// ==UserScript==
// @id             e-sim_black_theme
// @name           E-Sim Black Theme
// @namespace      http://fenixinteractive.net
// @description    Zmienia motyw w grze przeglądarkowej E-Sim
// @author         Fenix2412 <dygulski13@gmail.com>
// @homepage       http://fenixinteractive.net
// @version        1.0.5.7
// @require 			 http://update.sizzlemctwizzle.com/170644.js
// @include        http://*.e-sim.org/*
// @run-at         document-end
// ==/UserScript==
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

if( document.getElementById('bestTopBar') == undefined ) {
	var style = document.createElement('style');
	document.getElementById('homeButton').setAttribute('style', '');
	document.getElementById('menuFacebook').setAttribute('style', '');
	document.getElementById('container').setAttribute('style', 'top: 50px; width: 990px; margin: 0 auto; position: relative;');
	document.body.setAttribute('style', '');
	var wypelniacz = document.createElement('div');
	wypelniacz.setAttribute('style', 'background: #222; width: 100%; height: 53px; position: fixed; left: 0px; top: 0px; border-bottom: 1px solid #2158C6; z-index: 997;');
	document.body.appendChild(wypelniacz);
	if( window.location.href.indexOf('battle.html') > -1 )
	{
		var len = document.getElementsByClassName('fightButton').length;
		for(var i = 0; i<len; i++)
		{
			document.getElementsByClassName('fightButton')[i].setAttribute('onclick', "setTimeout(function() { if( document.getElementById('fightResponse').getElementsByTagName('div')[0].getElementsByTagName('div')[0] != undefined ) { document.getElementById('fightResponse').getElementsByTagName('div')[0].getElementsByTagName('div')[0].setAttribute('style', 'font-size:20px;font-weight:bold;margin-bottom:5px;'); } }, 1000);");
		}
		if( document.getElementsByClassName('testDivwhite')[0].getElementsByTagName('div')[1].getElementsByClassName('biggerFont')[0] != undefined )
		{
			document.getElementsByClassName('testDivwhite')[0].getElementsByTagName('div')[5].setAttribute('style', 'font-size: 17px; font-weight: bold; color: white;');
			document.getElementsByClassName('testDivwhite')[1].getElementsByTagName('b')[1].setAttribute('style', 'width: 200px; font-size: 14px; color: white;');
		}
		else
		{
			document.getElementsByClassName('testDivwhite')[0].getElementsByTagName('div')[6].setAttribute('style', 'font-size: 17px; font-weight: bold; color: white;');
			document.getElementsByClassName('testDivwhite')[1].getElementsByTagName('b')[1].setAttribute('style', 'width: 200px; font-size: 14px; color: white;');
		}
	}
	if( window.location.href.indexOf('stockCompany.html') > -1 )
	{
		document.getElementsByClassName('testDivwhite')[1].getElementsByTagName('div')[0].setAttribute('style', 'width: 330px; height: 180px; overflow: hidden; background: white; border: 1px solid #CECECE;');
	}
	if( window.location.href.indexOf('article.html') > -1 )
	{
		document.getElementsByClassName('testDivblue')[2].getElementsByTagName('div')[0].setAttribute('style', 'text-align: center; font-size: 15px; font-weight: bold; color: white;');
	}
	if( window.location.href.indexOf('acceptedCitizenshipApplications.html') > -1 )
	{
		setTimeout(function() {
			var divs = document.getElementsByClassName('testDivblue')[2].getElementsByTagName('div');
			var divlen = divs.length;
			for(var i = 0; i<divlen; i++)
			{
				if( divs[i].getElementsByTagName('div')[1] != undefined )
				{
					divs[i].getElementsByTagName('div')[1].setAttribute('style', 'padding: 4px;text-align: left; width: 340px; float: left; background: #222; word-wrap: break-word; border:1px solid #ccc;');
				}
			}
		}, 1000);
	}
	if( window.location.href.indexOf('pendingCitizenshipApplications.html') > -1 )
	{
		setTimeout(function() {
			var divs = document.getElementsByClassName('testDivblue')[3].getElementsByTagName('div');
			var divlen = divs.length;
			for(var i = 0; i<divlen; i++)
			{
				if( divs[i].getElementsByTagName('div')[1] != undefined )
				{
					divs[i].getElementsByTagName('div')[1].setAttribute('style', 'padding: 4px;text-align: left; width: 340px; float: left; background: #222; word-wrap: break-word; border:1px solid #ccc;');
				}
			}
		}, 1000);
	}
	if( window.location.href.indexOf('militaryUnitRecrutation.html') > -1 )
	{
		if( document.getElementsByClassName('dataTable')[0].getElementsByTagName('tr')[1].getElementsByTagName('td')[4] != undefined )
		var recrulen = document.getElementsByClassName('dataTable')[0].getElementsByTagName('tr').length;
		for(var i = 1; i<recrulen; i++)
		{
			document.getElementsByClassName('dataTable')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[4].getElementsByTagName('div')[0].setAttribute('style', 'padding: 4px;text-align: left; width: 210px; float: left; background: #222; word-wrap: break-word; border:1px solid #ccc;');
		}
	}
	if( window.location.href.indexOf('joinMilitaryUnit.html') > -1 )
	{
		if( document.getElementsByClassName('dataTable')[0].getElementsByTagName('tr')[1].getElementsByTagName('td')[2] != undefined )
		var recrulen = document.getElementsByClassName('dataTable')[0].getElementsByTagName('tr').length;
		for(var i = 1; i<recrulen; i++)
		{
			document.getElementsByClassName('dataTable')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[2].getElementsByTagName('div')[0].setAttribute('style', 'padding: 4px;text-align: left; width: 240px; float: left; background: #222; word-wrap: break-word; border:1px solid #ccc; margin-left: 20px');
		}
	}
	if(document.getElementsByClassName('topbarBox')[0] != undefined)
	{
		setTimeout(function() { document.getElementsByClassName('topbarBox')[0].setAttribute('style', ''); }, 1000);
		document.getElementsByClassName('topbarBox')[0].childNodes[1].setAttribute('style','');
		document.getElementsByClassName('topbarBox')[0].childNodes[3].setAttribute('style','font-weight: bold;');
	}
	document.getElementById('homeButton').innerHTML = 'Home';
	if( window.location.href.indexOf('secura.e-sim.org') > -1 )
	{
		document.getElementById('headerRow').childNodes[1].innerHTML = '<a href="index.html"><div style="width: 600px; height: 112px; background: url(http://e-sim.home.pl/testura/img/bestEsim.png) no-repeat; margin: 0 auto;"><span style="text-shadow: 0px 0px 4px black; color: #E2EAE9; font-family: &#8217;Russo One&#8217;,sans-serif; font-size: 70px; line-height: 105px; margin-left: 110px;">E-$im $ecura</span></div></a>';
	}
	else
	{
		document.getElementById('headerRow').childNodes[1].innerHTML = '<a href="index.html"><div style="width: 600px; height: 112px; background: url(http://e-sim.home.pl/testura/img/bestEsim.png) no-repeat; margin: 0 auto;"><span style="text-shadow: 0px 0px 4px black; color: #E2EAE9; font-family: &#8217;Russo One&#8217;,sans-serif; font-size: 70px; line-height: 105px; margin-left: 110px;">E-Sim Primera</span></div></a>';
	}
	//document.getElementById('homeButton').css('transition', '500ms');
	//document.getElementById('menuFacebook').css('transition', '500ms');
	style.innerHTML = "body{ background: #0A3790; } #container: { top: 40px; width: 990px; margin: 0 auto; position: relative; } .menuButton{ background: #222; z-index: 999; -webkit-transition: 500ms; -o-transition: 500ms; -moz-transition: 500ms; -khtml-transition: 500ms; -ms-transition: 500ms;} .menuButton:hover{ background: #444; } #navigationRow{ display: table; position: fixed; top: 0px; left: 50%; margin-left: -480px; background: #222; width: 100%; height: 30px; z-index: 998; align: center;} #homeButton{ background: #222; height: 40px; width: 40px;} #homeButton:hover{ background: #444; } .subMenu{ background: #222; border-left: 1px solid #2158C6; border-right: 1px solid #2158C6; border-bottom: 1px solid #2158C6; } #menuFacebook{ background: #222; width: 120px; height: 40px; } .mShaded{ background: #222 !important; } .tableShaded{ box-shadow: 0 0 7px 7px rgba(20, 20, 20, 0.4); border-radius: 0px; border: 1px solid rgba(54,116,242,1); color: white; } .shadedTable{ border-radius: 0px; border: 1px solid rgba(54,116,242,1); box-shadow: 0px 0px 7px 7px rgba(20, 20, 20, 0.4); color: white; } #userMenu{ background: #222; border-radius: 0px; border: 1px solid #1A3D84; } #userMenu:hover{ background: #222; } .currencyFlag + b { color: white; } .plate{ border-radius: 0px; background: #222; border-bottom: 1px solid #1A3D84; } .smallHeader { color: white; } .rightTabGrey{ background: #222; border-radius: 0px; border-top: 1px solid #2158C6; border-left: 1px solid #2158C6; text-shadow: 1.2px 1.2px 0.5px #333; } .rightTabBlue{ background: #222; border-radius: 0px; border-top: 1px solid #2158C6; border-left: 1px solid #2158C6; text-shadow: 1.2px 1.2px 0.5px #333;} #userName{ color: white; } .avatarPlate {  background-color: #222; margin-bottom: 5px; margin-left: -1px; border-radius: 0px; box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.1), 0px 0px 5px 5px rgba(0, 0, 0, 0.1) inset; border: 1.5px solid #2158C6; padding: 0px; } .ui-corner-all{ border-radius: 0px; } .ui-widget-content{ background: #333; border: 1px solid #2158C6; color: white; } .miniContent { border-radius: 0px; background: #333; } .shout2 { background: #444; border-radius: 0px; border: 1px solid #2158C6; } .showShoutDetails:hover{ background: #555; } .citizenButtons b { text-shadow: 1px 1px 1px #333; } .testDivblue { background: #333; border-radius: 0px; border: 1px solid #2158C6; color: white; } .smallStatsLabel b{ color: white; text-shadow: 1px 1px 1px #444; } .blueLabel{ background: #444; border-radius: 0px; border: 1px solid #2158C6; } .dataTable{ border-radius: 0px; } .dataTable > tbody > tr:first-child > td { color: white !important; background: #333; } .dataTable tr:nth-child(even) td { background: #333 !important; } .dataTable tr td { background: #444 !important; } h2{ color: white; } h1{ color: white; } .testDivwhite{ background: #333; color: white; border-radius: 0px; border: 1px solid #2158C6; } #pagination-digg a:link, #pagination-digg a:visited { background: #333; color: #4583FF; } .equipmentBlueBox{ background: #333; border-radius: 1px; border: 1px solid #2158C6; } .equipmentBlueCap{ background: #333; border-radius: 1px; border: 1px solid #2158C6; } .achievement{ background: #333; border-radius: 0px; border: 1px solid #2158C6; } .achievement > div > b { color: #666; } .achievement > b { font-size: 12px; color: #777; } .equipmentBox, .equipmentName { background: #333; border-radius: 0px; border: 1px solid #2158C6; } div.congressParties > div:first-child { background: #444; border-radius: 0px; border: 1px solid #2158C6; text-shadow: 0px 0px 1px #333; } .section { color: white; } .blueBox{ background: #3636C1; } .redBox{ background: #AD2E2E; } #comments > div:nth-child(odd) { background: #555; } #comments > div:nth-child(even) { background: #444; } #mapSideInfo{ background: #333 !important; } .topbarBox{ width: 240px; position: fixed; height: 80px; top: 120px; left: 5px; right: 0px; margin: 0px; font-size: 1em; color: white; background: #222; border: 1px solid #2158C6; border-radius: 0px; text-align: center;} .redLabel { background: #AD2E2E; } .greenLabel{ background: #20832A; } .mediumStatsLabel{ color: white !important; text-shadow: 0px 0px 1px #222 !important; } .testDivred{ background: #AD2E2E !important; box-shadow: 0px 0px 3px red; } .medal { color: black !important; } .help { color: white !important; } blockquote{ background-color: #444; } .shoutFundraiser{ background: #593C57; } .shoutModerator{ background: #666; } div.menuButton{text-align:center;} .subMenu a{display:block;} .mediumStatsLabel b, .smallStatsLabel a { color: white; text-shadow: 0px 0px 1px #333; } #militaryLeader, #militaryLeader b { color: white !important; } #twitterPlate { color: white !important; background: #A0A0A0 !important; border-radius: 0px; border: 1px solid rgba(54,116,242,1); } a.button { border: 1px solid #2158C6; background: #444; -webkit-transition: 500ms; -o-transition: 500ms; -moz-transition: 500ms; -khtml-transition: 500ms; -ms-transition: 500ms; } a.button:hover { background: #555; } input[type='submit'], input[type='button'] { border-radius: 0px; border: 1px solid #2158C6; background: #444; -webkit-transition: 500ms; -o-transition: 500ms; -moz-transition: 500ms; -khtml-transition: 500ms; -ms-transition: 500ms; } input[type='submit']:hover, input[type='button']:hover { background: #555; } input, select, textarea, option { border-radius: 0px; color: white !important; background: #555; border: 1px solid #2158C6; box-shadow: 0px 0px 0px #000 !important; } input:focus, textarea:focus { background: #555; } a:link, a:visited { color: #B0CAFE; } strong, b { color: white; } .foodLimitMod, .giftLimitMod { 	width: 16px; 	float: right; 	position: relative; 	top: 5px; 	right: 2px; 	font-size: 13px; 	background-color: #ffffff; 	border: 1px solid #333333; 	text-align: center; 	color: black !important; 	padding: 2px 3px 2px 3px; 	cursor: default; }  .foodItem { 	float:left; 	width:27px; 	height:46px; 	cursor:pointer; 	padding: 0px 1px 0px 1px; 	margin: 0px 3px 5px 2px; 	background-color: #ffffff; 	color: black !important; 	box-shadow: 1px 1px 2px 0px #9bbef8; } 	.foodItem .imageFood { 		width:80%; 		color: black !important; 		margin: 3px 3px 0px 3px; 	} 	.foodItem .qualityImage { 		width:94%; 		color: black !important; 		margin:1px 0px 0px 1px; 	} 	.foodItem .numberItems { 		text-align:center; 		font-size: 100%; 		font-weight:bold; 		font-family:Georgia; 		color: black !important; 	} 	.itemDisabled { 		cursor: default; 		box-shadow: inset 0px 0px 2px 0px #ff6767; 	} 	.foodItemHover { box-shadow: 0px 1px 3px 1px #6baef8 !important; } 	.foodItemSelected {  		box-shadow: inset 0px 0px 2px 1px #58a5fa !important; 		background-color: #aed4ff !important; 		color: black !important; 	}  .skillSelector { 	display: inline-block; 	margin: 4px 4px 4px 4px; 	padding: 2px 4px; 	font-size: 13px; 	font-weight: bold; 	background: #ffffff; 	box-shadow: 0px 0px 2px 0px #9bbef8; 	cursor: pointer; 	color: black !important; } 	.skillSelectorSelected { 		box-shadow: inset 0px 0px 2px 1px #58a5fa !important; 		background-color: #aed4ff !important; 		color: black !important; 	}  #chartdiv615 { background: white !important; } .numberItems { color: black !important; } .dayOk { color: black !important; } .dashedLine { border-bottom: 2px dashed #2158C6; } .littleDashedLine { border-bottom: 1px dashed #2158C6; border-top: 1px dashed #2158C6; } .skill { color: black; } .linkMyOffersProductMarket { color: white; } #blockInfoDamage { color: white; } .biggerFont{ color: white !important; }"
	document.head.appendChild(style)
}

