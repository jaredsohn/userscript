// ==UserScript==
// @name           _@/ planet-f1
// @author         Chris Porter
// @version        0.3b
// @date           2009-03-28
// @namespace      http://www.crazysnailboy.net/greasemonkey/
// @include        http://forum.planet-f1.com/*
// @include        http://www.planet-f1.com/*
// @include        http://www.planetf1.com/*
// ==/UserScript==

var GM_consoleLineOffset = 12; try { generateError(); } catch(error){ GM_consoleLineOffset = (error.lineNumber - GM_consoleLineOffset); }
var GM_log = function(){ if (unsafeWindow.console == undefined){ return; } unsafeWindow.console.log(arguments[0]); };
var GM_logError = function() { if (unsafeWindow.console == undefined){ return; } unsafeWindow.console.error(((typeof(arguments[0].method) == "undefined") ? "" : arguments[0].method + ": ") + arguments[0].name + " - " + arguments[0].message + ", line " + (arguments[0].lineNumber-GM_consoleLineOffset)); };

//alert = function(){ if (_showAlert) { _showAlert = confirm(arguments[0]); }}; var _showAlert = true;

document.createStyleSheet = function(sValue) { var o = this.createElement("style"); o.type = "text/css"; o.innerHTML = sValue; this.getElementsByTagName("head")[0].appendChild(o); };
document.getElementByXPath = function(sValue) { var a = this.evaluate(sValue, ((arguments.lenth > 1) ? arguments[1] : this), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); if (a.snapshotLength > 0) { return a.snapshotItem(0); } };
document.getElementsByXPath = function(sValue){ var aResult = new Array();var a = this.evaluate(sValue, this, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);for ( var i = 0 ; i < a.snapshotLength ; i++ ){aResult.push(a.snapshotItem(i));}return aResult;};
document.removeElementsByXPath = function(sValue) { var a = this.evaluate(sValue, this, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); var i = a.snapshotLength; for ( var i = 0 ; i < a.snapshotLength ; i++ ) { a.snapshotItem(i).parentNode.removeChild(a.snapshotItem(i)); } return i; };



// =============================================================================================
// PlanetF1
// ---------------------------------------------------------------------------------------------
//
//
// =============================================================================================

var PlanetF1 = {

	site: {

		get main() { return (location.hostname.indexOf("www.") == 0); },
		get forum() { return (location.hostname.indexOf("forum.") == 0); }

	},


	nowViewing: {

		get homePage() { return (location.pathname.indexOf("/", 1) == -1); },
		get drivers() { return (location.pathname.indexOf("/drivers") == 0); },
		get gallery() { return (location.pathname.indexOf("/gallery") == 0); },
		get news() { return (location.pathname.indexOf("/news") == 0); },
		get story() { return (location.pathname.indexOf("/story") == 0); }

	},


// -------------------------------------------------------------------------------------------------
// addFavIcon

	addFavIcon: function() { try
	{

	// remove existing favicon <link> elements, as the image they point to doesn't exist
	document.removeElementsByXPath("//link[@rel='shortcut icon']");

	// create a <link> element to display a favicon (icon data encoded from an old planet-f1.com favicon)
	oLink = document.createElement("link");
	oLink.setAttribute("rel", "shortcut icon");

	oLink.setAttribute("href",
	"data:image/x-icon;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAQAMAAAAAAAAAAAAAAAA" +
	"AAAAAAAD////////////Pz/46Ov5UVP75+f////////////////////////+ysv45Of5nZ/7////////////Fxf4CAv4lJf739//" +
	"///////////////////////+hof4CAv47O/7////////////Fxf4CAv4iIv7a2v/f3//f3//f3//q6v////////+8vP8CAv47O/7" +
	"////////////Fxf4CAv4DA/4DA/4DA/4DA/4DA/4ZGf7i4v////+8vP8CAv47O/7////////////Fxf4CAv4PD/5VVf5XV/5XV/5" +
	"XV/5XV/6Li/7///+8vP8CAv47O/7////////////Gxv4CAv4GBv6MjP6goP6goP6goP6trf7+/v+Wlv5iYv4CAv48PP7////////" +
	"////6+v9KSv4CAv4CAv4CAv4CAv4CAv4CAv6Skv6wsP4CAv4CAv44OP7////////////////4+P+8vP+4uP+4uP+4uP+4uP+4uP/" +
	"Cwv7+/v/AwP+4uP/IyP9/f/48PP6Ghv7///////////////////+AgICAgICAgICAgIC7u7v///////////9ZWf4DA/5kZP7////" +
	"///////////////8CAgICAgICAgICAgJ4eHj///////////9ZWf4CAv5mZv729v/19f/19f/19f/19f8GBgYGBgYGBgYGBgZ4eHj" +
	"5+fn5+fn5+flZWf4CAv4MDP4dHf4dHf4dHf4dHf4dHf4dHf5vb+ze3uDg4OGFhYUfHx8gICAgICBqav4eHv4eHv4eHv4eHv4eHv4" +
	"eHv4PD/4EBP49Pf7///////+Hh4cCAgICAgICAgLk5P7W1v/X1//X1//X1//X1//U1P9bW/4CAv47O/7h4eHj4+OGhoYcHBweHh4" +
	"eHh7AwP4EBP4CAv4CAv4CAv4CAv4CAv4DA/4DA/4EBIEFBQUDAwN3d3f9/f37+/v7+/v///+Tk/5YWP5aWv5aWv5aWv5aWv5aWv4" +
	"CAoAODkACAgICAgJ5eXn///////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
	"AAAAAAAAAAAAAAAAA");

	// attach the <link> element to the document header
	var oHead = document.getElementsByTagName("head")[0];
	oHead.insertBefore(oLink, oHead.firstChild);

	GM_log("PlanetF1.addFavIcon");
	}
	catch(error){ GM_logError(error); }},


// -------------------------------------------------------------------------------------------------
// removeElements

	removeElements: function() { try
	{
	var aXPath = [];

	aXPath.push("//div[@id='header']/div[@id='masthead']/div[@id='banner']");  // header banner ad
	aXPath.push("//div[@id='infobar']/div[@id='gamingbuttons']"); // gaming buttons on info bar to right of marquee
	aXPath.push("//div[@id='subwrapper']/div[@class='right']/div[@class='mpu']");  // center column square ad
	aXPath.push("//div[@id='subwrapper']/div[@class='storypagesky']");  // right column vertical banner ad
	aXPath.push("//div[object/embed[@width=160 and @height=600]] //div[object/embed[@width=120 and @height=600]]");  // far right vertical banner ad
	aXPath.push("//div[a/img[@width=120 and @height=600]]");
	aXPath.push("//div[@id='hockeyStickEnd']/a"); // ad link below hockeystick
	aXPath.push("//div[@id='container']/div[@id='networklinks']"); // 365 media network content links
	aXPath.push("//div[@id='subwrapper']//div[@class='submit_links clearfix']");  // digg & del.icio.us links
	aXPath.push("//div[@id='subwrapper']//div[@class='user_links clearfix']");  // e-mail, print friendly and rss links

	document.removeElementsByXPath(aXPath.join(" | "));
	}
	catch(error){ GM_logError(error); }},


// -------------------------------------------------------------------------------------------------
// formatDocument

	formatDocument: function() { try
	{
	var aCSS = [];


	// decrease the height of the page header and reposition the logo
	aCSS.push("div#header { height:70px; background-position:0px -20px; }");

	// increase the width of the news ticker, and make it blend into the info bar
	aCSS.push("#infobar { margin-bottom:0px; }");
	aCSS.push("#infobar #scroll { margin-left: 5px; }");
	aCSS.push("#infobar #scroll { background-color:transparent !important; width:750px; }");
	aCSS.push("#infobar #scroll .tickertext  { width:750px; }");
	aCSS.push("#infobar #scroll marquee { background-color:transparent !important; border:none !important; width:750px; }");
	aCSS.push("#infobar #scroll marquee a { color:white !important; }");
	aCSS.push("#infobar #scroll marquee a:hover { text-decoration:underline; }");

	// make the news ticker scroll more smoothly, and stop on mouseover
	var oMarquee = document.getElementByXPath("//div[@id='infobar']//marquee");
	oMarquee.setAttribute("scrolldelay", "5");
	oMarquee.setAttribute("scrollamount", "2");
	oMarquee.setAttribute("onmouseover", "this.stop();");
	oMarquee.setAttribute("onmouseout", "this.start();");

	// create event handler functions to make the list items behave like their child anchors
	var eventHandlers = { onclick : "" , onmouseover : "" , onmouseout : "" };
	for ( var eventHandler in eventHandlers )
		{
		switch( eventHandler )
			{
			case "onclick":
				eventHandlers[eventHandler] = "location.href = this.getElementsByTagName('a')[0].getAttribute('href');";
				break;

			case "onmouseover":
			case "onmouseout":
				eventHandlers[eventHandler] = "" +
					"this.getElementsByTagName('a')[0].style.textDecoration = '" +
					((eventHandler != "onmouseover") ? "" : "underline" ) +
					((eventHandler != "onmouseout")  ? "" : "none" ) +
					"'; " +
				"";
				break;
			}
		}

	// attach the event handlers to the list items
	var a = document.getElementsByXPath("//ul[@id='nav']/li");
	for (var i = 0 ; i < a.length ; i++ )
		{
		for ( var eventHandler in eventHandlers )
			{
			a[i].setAttribute( eventHandler , eventHandlers[eventHandler] );
			}
		}

	// fix margin inconsistencies to correctly align hockeystick banner and right hand column images
	aCSS.push("div.hockeystick { margin-left:0px; }");
	aCSS.push("div#subwrapper div.right { margin:0px 0px 0px 9px; }");

	var getHockeystickBackgroundImage =
		function()
		{
		var sImage = "";
		for ( var i = 0 ; i < document.styleSheets.length ; i++ )
			{
			var a = document.styleSheets[i];
			for ( var i2 = 0 ; i2 < a.cssRules.length ; i2++ )
				{
				var s = "" +
				((PlanetF1.nowViewing.homePage) ? "#home .branded" : ".branded") +
				"";
				if (s == a.cssRules[i2].selectorText.toLowerCase())
					{
					sImage = a.cssRules[i2].style.backgroundImage;
					}
				if (sImage != "") { break; }
				}
			if (sImage != "") { break; }
			}
		return sImage;
		};
	var s = getHockeystickBackgroundImage();
	switch (s)
		{
		case "url(/Images/PlanetF1/hockeystick-bg-philips.gif)":
		case "url(/Images/PlanetF1/hockeystick-bg-philips2.gif)":
		aCSS.push("div.hockeystick.branded.clear { " + ((this.nowViewing.homePage) ? "background-position:4px 0px !important; " : "background-position:174px 0px !important;") + " }");
		break;
		default: GM_log("Unexpected hockeystick image: " + s);
		}

	// expand the width of the hockeystick link holder div
	aCSS.push("div.hockeystick div.links { width:530px; }");

	// expand the width of the centre column to fill empty ad space, unless we're viewing the home page
	if (!this.nowViewing.homePage)
		{
		aCSS.push("div#subwrapper div.centre { width:655px; }");
		}

	// strike-through visited news story links
	aCSS.push(".promo5 li a:visited { text-decoration:line-through; }");
	aCSS.push(".promo5 li a.more:visited { text-decoration:none; }");
	aCSS.push("#home .topstory h2 .instorylink:visited { text-decoration:line-through; }");
	aCSS.push("#home .topstory .instorylink:visited { text-decoration:line-through; }");
	aCSS.push("#infobar #scroll marquee a:visited { text-decoration:line-through; }");
	aCSS.push("#index .centre li a:visited { text-decoration:line-through; }");
	aCSS.push("#index .centre #galleryBox ul li a:visited { color:black; }");

	// expand the centre column content to fill the centre column
	if (this.nowViewing.drivers)
		{
		aCSS.push("div.secondarystory { width:640px !important; }");
		}

	// expand the space available to view the image gallery
	if (this.nowViewing.gallery)
		{
		aCSS.push("#subwrapper .right { margin:0px 0px 0px -5px !important; }");
		aCSS.push("#subwrapper .centre { width:669px !important; }");
		"";
		}

	// balance the column width on the two-column news item / gallery list
	if ((this.nowViewing.news) || (this.nowViewing.gallery))
		{
		aCSS.push("div.topstory { width:640px !important; }");
		aCSS.push("div.secondarystory { width:320px !important; }");
		aCSS.push("#index .centre ul { width:640px !important; }");
		aCSS.push("#index .centre li { width:310px; }");
		}

	document.createStyleSheet(aCSS.join("\n"));

	}
	catch(error){ GM_logError(error); }},


// -------------------------------------------------------------------------------------------------
// onCreate

	onCreate: function() { try
	{
	if (this.site.forum)
		{
		this.addFavIcon();
		}

	if (this.site.main)
		{
		this.removeElements();
		this.formatDocument();
		}
	}
	catch(error){ GM_logError(error); }}

};

PlanetF1.onCreate();
GM_log("_@/ planet-f1");
