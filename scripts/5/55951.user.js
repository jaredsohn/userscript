// ==UserScript==
// @name           Facebook MouseHunt Game Auto Horn Blower
// @author         NOrack
// @version        2.2
// @namespace      http://apps.facebook.com/mousehunt/
// @description    (Version 2.2) A macro to blow the horn of facebook mousehunt game when the right time comes
// @source         http://userscripts.org/scripts/review/53071
// @identifier     http://userscripts.org/scripts/source/53071.user.js
// @include        https://apps.facebook.com/mousehunt/
// @include        https://apps.facebook.com/mousehunt/index.php
// @include        https://apps.facebook.com/mousehunt/soundthehorn.php
// @include        https://apps.new.facebook.com/mousehunt/
// @include        https://apps.new.facebook.com/mousehunt/index.php
// @include        https://apps.new.facebook.com/mousehunt/soundthehorn.php
// ==/UserScript==

var inputs = document.getElementsByTagName("input");
var timeToWaitHORN = -1;

//check the trap on the checkTrap minute every hour, this action will not initiate horn blowing.
//player may check trap every :00 minute of hours, but it is better to put 2 up to 5 into this variable
//to anticipate the different between player computer time and server time.
var checkTrap = 3;

if(inputs)
{
   //loop through and find the horn timer hidden input box and get it's value
   for(i = 0; i < inputs.length; i++)
   {
      if(inputs[i].id.indexOf("hornWaitValue") != -1)
      {
		//when the hidden timer is found, adjust the time by adding with a random delay between 3 and 15 seconds.
		timeToWaitHORN = parseInt(inputs[i].value) + Math.round(Math.random() * 12) + 3;				
		break;
      }
   }   
}

inputs = null;

//check if the hidden timer has been found then show the timer on
//mousehunt title bar to let player knows when the horn will be blown
if(timeToWaitHORN > 0)
{ 
	window.setTimeout(function() { startCountDown() }, 1000);
}

function startCountDown()
{
	var jam, menit, detik, sisawaktu;
	
	timeToWaitHORN -= 1;

	if (timeToWaitHORN > 0)
	{
		jam = parseInt(timeToWaitHORN / 3600);
		sisawaktu = timeToWaitHORN % 3600;
		menit = parseInt(sisawaktu / 60);
		detik = sisawaktu % 60;
		document.title = menit + " m " + detik + " s " + "  until next horn blowing";
		window.setTimeout(function() { startCountDown() }, 1000);
		if(HourlyCheck())
		{
			document.title = "Checking the Trap";
			window.location.href = "https://apps.facebook.com/mousehunt/index.php";
		}				
	}
	else
	{
		document.title = "Blowing The Horn";
		window.location.href = "https://apps.facebook.com/mousehunt/soundthehorn.php";
	}
}

function HourlyCheck()
{
	var today=new Date();
	var h=today.getHours();
	var m=today.getMinutes();
	var s=today.getSeconds();
	var kena=false;

	if(s == 0 && m == checkTrap) kena = true;	
	return kena;
}



/********** SCRIPT VERSION CONTROL 0.5 *************/
/* Any help about this functions can be found at
http://sylvain.comte.online.fr/AirCarnet/?post/GreaseMonkey-Script-Update-Control
*/
/* parameters */
/* SET YOUR OWN SCRIPT VALUES */
var thisId=53071;		// your script userscript id
var thisVersion="2.2";		// the @version metadata value
//var thisReleaseDate="20090707"; // release date of your script. Not mandatory, use this paramater
				// only if you want to be sharp on version control frequency.

/* script version control parameters */
var GMSUCtime=23;   // Delay before alert disapears (seconds)
                    // set to 0 if you don't want it to disapear (might be a bit intrusive!)
var GMSUCfreq=2;    // Update control frequency (days)

/* colorpalettes */
	// feel free to create your own. color in this order : back, highlight, front, light.
	var cpChrome=new colorPalette("#E1ECFE","#FD2","#4277CF","#FFF");	// but for Firefox ;-)
	var cpUserscript=new colorPalette("#000","#F80","#FFF","#EEE");		// javascrgeek only
	var cpFlickr=new colorPalette("#FFF","#FF0084","#0063DC","#FFF");	// pink my blue
// choose yours
var GMSUCPal=cpChrome; 	// colorPalette you prefer

/* launching script version control  */
GM_scriptVersionControl();

// define launch function
function GM_scriptVersionControl() {
	if(self.location==top.location) { // avoid script execution in each frame of the page
		// test if script should be performed to control new release regarding frequency
		var GMSUCreleaseDate=new Date();
		GMSUCreleaseDate.setFullYear(eval(thisReleaseDate.substring(0,4)),eval(thisReleaseDate.substring(4,6))-1,eval(thisReleaseDate.substring(6,8)));
		var GMSUCtoday=new Date(); var GMSUCdif=Math.floor((GMSUCtoday-GMSUCreleaseDate)/1000/60/60/24);
		if (GMSUCdif%GMSUCfreq==0) {
			GMSUC_Control();
			}}}

// define control function
function GMSUC_Control() {
	var scriptId=thisId;var version=thisVersion;
	var scriptUrl="http://userscripts.org/scripts/source/"+scriptId+".meta.js";
	// go to script home page to get official release number and compare it to current one
	GM_xmlhttpRequest({
		method: 'GET',
		url: scriptUrl,
		headers: {
			 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			 'Accept': 'text/html,application/xml,text/xml',
			 },
		onload: function(responseDetails) {
			var textResp=responseDetails.responseText;
			var offRel=/\/\/\s*@version\s*(.*)\s*\n/i.exec(textResp)[1];
			var scriptName=/\/\/\s*@name\s*(.*)\s*\n/i.exec(textResp)[1];
			if(offRel!=version) {
				// Styling
				GM_addStyle("#GMSUC-alerte {position:absolute;top:5px;left:50%;margin:20px 0 0 -128px;padding:6px;width:250px;-moz-border-radius:6px;background:"+GMSUCPal.back+";border:"+GMSUCPal.light+" 1px solid;color:"+GMSUCPal.front+";font-size:1em;text-align:center} #GMSUC-alerte a {font-weight:bold;font-size:1em} #GMSUC-alerte * {color:"+GMSUCPal.front+";} #GMSUC-alerte table {width:100%;margin:0.5em 0 0 0} #GMSUC-alerte td {width:33%;text-align:center;border:solid 1px "+GMSUCPal.front+"} #GMSUC-alerte td:hover{background:"+GMSUCPal.high+"} #GMSUC-alerte td:hover a {color:"+GMSUCPal.front+"} #GMSUC-timer {font:2em bold;margin:0.5em 0 0 0} #GMSUC-info {text-align:right;font:0.5em serif;margin:1em 0 0 0} #GMSUC-info a {font:0.75em serif}  #GMSUC-info a:hover {background:"+GMSUCPal.front+";color:"+GMSUCPal.back+"}");
				// Lang detection and apply
				var Langues="en, fr";
				var lang=navigator.language;
				var reg=new RegExp(lang,"g");
				if(!Langues.match(lang)) lang="en";
				/* traductions / translations */
					var Txt=new Array();
					for(i=1;i<7;i++) {Txt[i]=new Array();} 
					// franÃ§ais
					Txt[1]["fr"]="Vous utilisez la version";
					Txt[2]["fr"]="du script";
					Txt[3]["fr"]="La version officielle est diffÃ©rente";
					Txt[4]["fr"]="installer";
					Txt[5]["fr"]="voir le code";
					Txt[6]["fr"]="propulsÃ© par";
					// english
					Txt[1]["en"]="You're using";
					Txt[2]["en"]="version of";
					Txt[3]["en"]="script. Official release version is different";
					Txt[4]["en"]="install";
					Txt[5]["en"]="view code";
					Txt[6]["en"]="powered by";
				/* ------------------------------- */	
				var alerte=document.createElement('div');
				alerte.setAttribute('id','GMSUC-alerte');
				var GMSUCtextAlerte=Txt[1][lang]+" "+version+" "+Txt[2][lang]+" <i><b>"+scriptName+"</b></i>";
				GMSUCtextAlerte+=". "+Txt[3][lang]+" (<a href='http://userscripts.org/scripts/show/"+scriptId+"'>"+offRel+"</a>)";
				GMSUCtextAlerte+="";
				GMSUCtextAlerte+="<table><tr><td><a href='http://userscripts.org/scripts/show/"+scriptId+"'>v."+offRel+"</a></td><td><a href='http://userscripts.org/scripts/review/"+scriptId+"'>"+Txt[5][lang]+"</a></td><td><a  href='http://userscripts.org/scripts/source/"+scriptId+".user.js'>"+Txt[4][lang]+"</a></td></tr></table>"
				if(GMSUCtime>0) GMSUCtextAlerte+="<div id='GMSUC-timer'>"+GMSUCtime+" s</div>";
				GMSUCtextAlerte+="<div id='GMSUC-info'>"+Txt[6][lang]+" <a href='http://sylvain.comte.online.fr/AirCarnet/?post/GreaseMonkey-Script-Update-Control'>GM Script Update Control</a></div>";
				document.body.appendChild(alerte);
				document.getElementById('GMSUC-alerte').innerHTML=GMSUCtextAlerte;
				if(GMSUCtime>0) {
					function disparition() {
						if(GMSUCtime>0) {
							document.getElementById("GMSUC-timer").innerHTML=GMSUCtime+" s";
							GMSUCtime+=-1;
							setTimeout(disparition,1000)
							}
						else document.getElementById("GMSUC-alerte").setAttribute("style","display:none");
						}
					disparition();
					}
				}
			}
		});
	}

/* Color palette creator */	
function colorPalette(b,h,f,l) {this.back=b;this.high=h;this.front=f;this.light=l;}	
	
/******* END OF SCRIPT VERSION CONTROL **********/
