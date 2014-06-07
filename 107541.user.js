// MurdochAlert - Warn users at risk for exposure to Murdoch-family controlled domains
//
// NewsCorp agents in multiple countries have been arrested for hacking into the phones and computers
// of at least thousands of innocent people.   Since the Murdoch family controls 100+ high-traffic domains, 
// it is difficult for average users to know which sites place them at risk. 
//
// Users can install this script to help them identify which sites may place them at risk.  
// 
// To test functionality without using a NewsCorp site, go to: 
// http://en.wikipedia.org/wiki/Foreign_Corrupt_Practices_Act	 
//
// ==UserScript==
// @name           MurdochAlert
// @namespace      MurdochAlert
// @description    Adds an alert and/or warning bar on pages MurdochFamily-controlled pages
// @include       http://en.wikipedia.org/wiki/Foreign_Corrupt_Practices_Act
// @include *.4kids.tv/*
// @include *.adelaidenow.com.au/*
// @include *.allthingsd.com/*
// @include *.alphamagazine.com.au/*
// @include *.avonromance.com/*
// @include *.biensimple.com/*
// @include *.bigcharts.com/*
// @include *.bigtennetwork.com/*
// @include *.blueskystudios.com/*
// @include *.canalfox.com/*
// @include *.careerone.com.au/*
// @include *.carsguide.com.au/*
// @include *.couriermail.com.au/*
// @include *.dailytelegraph.com.au/*
// @include *.dowjones.com/*
// @include *.espnstar.com/*
// @include *.fins.com/*
// @include *.fox.com/*
// @include *.foxbusiness.com/*
// @include *.foxconnect.com/*
// @include *.foxinternational.com/*
// @include *.foxinternationalchannels.com/*
// @include *.foxlife.com.br/*
// @include *.foxlife.tv/*
// @include *.foxmovies.com/*
// @include *.foxnewsinsider.com/*
// @include *.foxsearchlight.com/*
// @include *.foxsports.com.au/*
// @include *.foxsports.com/*
// @include *.foxsportsradio.com/*
// @include *.foxstudios.com/*
// @include *.fxnetworks.com/*
// @include *.golfchannel.com/*
// @include *.harpercollins.co.uk/*
// @include *.harpercollins.com/*
// @include *.harpercollinscatalogs.com/*
// @include *.harpercollinschildrens.com/*
// @include *.harperteen.com/*
// @include *.heraldsun.com/*
// @include *.hulu.com/*
// @include *.kdfi27.com/*
// @include *.marketwatch.com/*
// @include *.msg.com/*
// @include *.mundofox.com/*
// @include *.mxnet.com.au/*
// @include *.my20dc.com/*
// @include *.my20houston.com/*
// @include *.my24wutb.com/*
// @include *.my29tv.com/*
// @include *.my45.com/*
// @include *.my50chicago.com/*
// @include *.my65orlando.com/*
// @include *.my9tv.com/*
// @include *.myfox9.com/*
// @include *.myfoxatlanta.com/*
// @include *.myfoxaustin.com/*
// @include *.myfoxboston.com/*
// @include *.myfoxchicago.com/*
// @include *.myfoxdc.com/*
// @include *.myfoxdetroit.com/*
// @include *.myfoxdfw.com/*
// @include *.myfoxhouston.com/*
// @include *.myfoxla.com/*
// @include *.myfoxmemphis.com/*
// @include *.myfoxny.com/*
// @include *.myfoxorlando.com/*
// @include *.myfoxphilly.com/*
// @include *.myfoxphoenix.com/*
// @include *.myfoxtampabay.com/*
// @include *.myspace.com/*
// @include *.natgeotv.com/*
// @include *.news.com.au/*
// @include *.newscorp.com/*
// @include *.newsinternational.co.uk/*
// @include *.newsoftheworld.co.uk/*
// @include *.newsspace.com.au/*
// @include *.nypost.com/*
// @include *.perthnow.com.au/*
// @include *.realestate.com/*
// @include *.sky.com/*
// @include *.sky.de/*
// @include *.sky.it/*
// @include *.skysports.com/*
// @include *.skytv.co.nz/*
// @include *.smartmoney.com/*
// @include *.smartsource.com/*
// @include *.speedtv.com/*
// @include *.staplescenter.com/*
// @include *.theaustralian.com.au/*
// @include *.thedaily.com/*
// @include *.thegarden.com/*
// @include *.thestreet.com/*
// @include *.thesun.co.uk/*
// @include *.thesundaytimes.co.uk/*
// @include *.thetimes.co.uk/*
// @include *.truelocal.com.au/*
// @include *.tvguide.com/*
// @include *.vedomosti.ru/*
// @include *.webmd.com/*
// @include *.weeklystandard.com/*
// @include *.weeklytimesnow.com.au/*
// @include *.wogx.com/*
// @include *.wsj.com/*
// @include *.wsjclassroomedition.com/*
// @include http://*.nationalgeographic.com/*
// @include http://www.nationalgeographic.com/*
// ==/UserScript==


// CUSTOMIZE mode  
var MurdochAlert_BeepMode			=	false; 	// if true, Display an alert box with a beep.
var MurdochAlert_SilentMode			=	false;	// if true, Display a confirmation box without a beep.
var MurdochAlert_BottomBannerMode	=	true; 	// if true, Display a banner warning on bottom. 



var MurdochAlert_txt="WARNING: This domain is controlled by the Murdoch Family. Your computer's ip address has been exposed and may be logged.";
var MurdochAlert_html="<span style='font-size: 100%'>ALERT:</span><span style='margin-left: 1em; font-size: 70%;'>This domain is controlled by the Murdoch Family. Your computer's ip address has been exposed and may be logged.</span>";
var MurdochAlert_css="width: 100%;  color: #ddd; padding: 0; margin:0; z-index: auto;";


// If Beepmode true, alert().  If not, then if SilentMode is true, confirm()
if (MurdochAlert_BeepMode==true) 			{	alert(MurdochAlert_txt)		;}
else if (MurdochAlert_SilentMode==true) 	{	confirm(MurdochAlert_txt)	;}

// If BottomBannerMode is true, display the banner at the bottom
if (MurdochAlert_BottomBannerMode == true )
{
var css = 'position:fixed;  z-index:9999; bottom:0px; left:0px; border:0; margin: 0; padding: 0; ' +          
          'overflow:hidden; width: 100%;  background-color: rgba(255, 200, 200, 0.8); border-top: 1px black solid; padding-top: 2px;'

  var bodyelement = document.getElementsByTagName("body")[0];
  if (bodyelement) 
	{	
	var iframe = document.createElement('iframe');
	iframe.setAttribute('style', css);
	iframe.setAttribute('id', 'MurdochAlert_iframe');
	iframe.src = 'about:blank';
	document.body.appendChild(iframe);
	iframe.addEventListener("load", function() {
		var doc = iframe.contentDocument;
		doc.body.setAttribute('style', 'margin: 0;'); // set iframe body style
		doc.body.innerHTML = '<div style="margin: 0; padding: 0; opacity: 1;  width: 100%; background-color: rgba(255, 220, 220, 0.8);  height: 2em; margin-left: auto; margin-right: auto;  padding-left: .5em;">'+MurdochAlert_html+'</div>';

        // TODO: Add clickable X to hide iframe from within
		//doc.body.innerHTML = '<div style="float: right;"><a href="javascript: window.parent.document.getElementById(\'MurdochAlert_iframe\').CloseOnClick();">x</a></div><div style="margin: 0; padding: 0; opacity: 1;  width: 100%; background-color: rgba(255, 220, 220, 0.8);  height: 2em; margin-left: auto; margin-right: auto;  padding-left: .5em;">'+MurdochAlert_html+'</div>';
		//doc.body.innerHTML = '<script language="JavaScript">function InlineAlert() { alert(\'inlinealert\'); }</script><div style="float: right;"><a href="javascript: InlineAlert();">x</a></div><div style="margin: 0; padding: 0; opacity: 1;  width: 100%; background-color: rgba(255, 220, 220, 0.8);  height: 2em; margin-left: auto; margin-right: auto;  padding-left: .5em;">'+MurdochAlert_html+'</div>';

		//iframe.style.width = doc.body.offsetWidth + "px";
		iframe.style.height = doc.body.offsetHeight*.8 + "px";
		}, false);
		
		
	}

} 

// TODO:  handle clicks from clickable X in iframe
/*  
function InlineAlert()
{
alert("click");
iframe.setAttribute('style', "visibility: hidden;");	
}
*/
