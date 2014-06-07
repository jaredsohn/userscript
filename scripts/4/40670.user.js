// ==UserScript==
// @author         FUBAR
// @version        v1.4
// @name           Kustom Katz
// @description    Customize the Katz search engine. Blocks ads as well.
// @include        http://katz.ws/*
// @include        http://katz.cd/*
// @include        http://games.katz.cd/*
// @include        http://apps.katz.cd/*
// @include        http://tv.katz.cd/*
// @include        http://movies.katz.cd/*
// @include        http://music.katz.cd/*
// @include        http://ebooks.katz.cd/*
// @include        http://other.katz.cd/*
// @include        http://www.katzporn.com/*
// @include		  http://katzporn.com/*
// ==/UserScript==

// Example:
// Set_Cookie("myCookie", "my value", 24, "/", ".myurl.com");
// Stores the string "my value" in the cookie "myCookie" which expires after 24 hours.
function Set_Cookie( name, value, expires, path, domain, secure )
{
var today = new Date();
today.setTime( today.getTime() );
/*
if the expires variable is set, make the correct
expires time, the current script below will set
it for x number of days, to make it for hours,
delete * 24, for minutes, delete * 60 * 24
*/
if ( expires )
{
expires = expires * 1000 * 60 * 60 * 24;
}
var expires_date = new Date( today.getTime() + (expires) );
document.cookie = name + "=" +escape( value ) +
( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
( ( path ) ? ";path=" + path : "" ) +
( ( domain ) ? ";domain=" + domain : "" ) +
( ( secure ) ? ";secure" : "" );
}

// Gets cookie and reads it
function Get_Cookie( check_name ) {
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false;
	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		a_temp_cookie = a_all_cookies[i].split( '=' );
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
		if ( cookie_name == check_name )
		{
			b_cookie_found = true;
			if ( a_temp_cookie.length > 1 )
			{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found )
	{
		return null;
	}
}


// Initiate Global Styles
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


//Changes current theme and stores value in a cookie
// If you add a new theme you must add another else statement before "Set_Cookie"
// i.e.
//else 								<<<addthis
//	if(chtheme == "theme2"){		<<<addthis
//		addGlobalStyle(theme2);		<<<addthis
//	}								<<<addthis
// Set_Cookie( 'kustomkatz', chtheme, 30, '/', '.katz.cd' )
function selectTheme(){
	var chtheme = ctheme.value;
	if(chtheme == "theme0"){
		addGlobalStyle(theme0);
	}
else 
	if(chtheme == "theme1"){
		addGlobalStyle(theme1);
	}				
	Set_Cookie( 'kustomkatz', chtheme, 30, '/', '.katz.cd' )
	Set_Cookie( 'kustomkatzporn', chtheme, 30, '/', '.katzporn.com' )
}			  


// Adds default links and theme seletion to menu
// To add a new theme insert <option></option> tag before the </select> tag
// i.e. <option value='theme2'>Theme 2</option>
var newlinks = "Change Theme: <select id='stheme' tabindex='3' name='t'><option value='theme0'>Default</option><option value='theme1'>Theme 1</option></select><span>|</span><a id='star' title='Add to Favorites' target='_self' href='javascript:book();'>Bookmark Us</a><br/><a href='http://www.katzforums.com/' style='color: green'>>Katz Forums</a><span>|</span><a href='http://katz.cd/faq.php' style='color: navy'>>FAQs</a><span>|</span><a class='snap_noshots' href='http://katz.cd/webmasters.php' style='color: #FF8040'>>Webmasters</a><span>|</span><a class='snap_noshots' href='http://katz.cd/faq.php#Contact' style='color: red'>>Contact Us</a>";
document.getElementById('pans').getElementsByTagName('div')[0].innerHTML = newlinks;


//Default theme I recommend not making any changes here
//You can change theme1 or create a new one
var theme0 = 'body {background-color: #FFFFFF; color: #000000;}' + 
			  'a:visited {color: #FF0000;}' + 
			  'a:link, tbody a:link, tbody, #pans div a{color: #003366;}' +
			  '#pans {background: #C9E9F4 url(http://s.katz.cd/bg3.gif) repeat-x scroll center top; color: #003366;}' +
			  '#tabs a, #pg td a{background: #2F94BA url(http://s.katz.cd/bg4.gif) repeat-x scroll center top; color: #FFFFFFl}' + 
			  '.dl1 {background: #C9E9F4 url(http://s.katz.cd/bg1.gif) repeat-y scroll left center;}' +
			  '.dl2 {background: #E7F7FB url(http://s.katz.cd/bg5.gif) repeat-y scroll left center;}' +
			  '#tabs a#this, #tabs a:hover, #pg td a:hover, #pg td a#th2 {color: #003366;}' +
			  '#tabs a#this, #tabs a:hover {background: #E1F4FB url(http://s.katz.cd/bg2.gif) repeat-x scroll 0 0;}' +
			  '#pg td a:hover, #pg td a#th2 {background: #E0F4FB url(http://s.katz.cd/bg3.gif) repeat-x scroll center bottom;}' +
			  '.on {background-color: #D2EEF7;}' +
			  '.dl2 tbody a:hover {color: #006699;}';
			  
			  
// Modify this theme or create a new one.
// Create a new theme type
// var theme2 = 'YOUR_STYLE_HERE'
// If you create a new one please add it in the selection drop down box
// and the selectTheme function.
// Also if you add a new style place the default setting for it in theme0.
var theme1 = 'body {background-color: #000000; color: #FFFFFF;}' + // Set background and font color
			  'a:link, tbody a:link, tbody, #pans div a {color: #FFFFFF;}' + // Changes link color
			  'a:visited { color: #FFFFFF; text-decoration: line-through;}' + // Changes visited link color
			  '#tabs a, #pg td a, #pans {background: #000000; color: #FFFFFF;}' + //Changes tabs and search box background
			  '.dl1, .dl2 {background: #000000;}' + // Changes main table bakground color
			  '#tabs a#this, #pg td a#th2 {background :#000000; background-color: #FFFFFF; color: #FF0000;}' + // Changes selected tab for top and bottom page navigation
			  '.on, #tabs a:hover, #pg td a:hover {background :#000000; background-color: #666666; color: #FF0000;}' + // Changes hover color for navigation tabs and table rows
			  '.dl2 tbody a:hover {color: #FFFFFF;}'; // Changes hover color for text on table
			  
// Checks url, gets appropriate cookie, then applies theme			  
var myurl = document.location;
if (/katz\.cd\//i.test(myurl))	{		  
	var curtheme = Get_Cookie('kustomkatz');
} else {
	var curtheme = Get_Cookie('kustomkatzporn');
}
if(curtheme !=null && curtheme !=""){
	document.getElementById('stheme').value = curtheme;
} 
var ctheme = document.getElementById('stheme');
selectTheme();


// Changes theme based on user selection
ctheme.addEventListener("change", selectTheme, true);


// Code to help with alignment
addGlobalStyle('#panc {overflow: visible; padding: 0px;}');
// Set overall width
addGlobalStyle('#con { background: none; width: 800px;}');
// Center and stretch logo and navigation tabs
addGlobalStyle('#pant {margin: 0px;}');
// Removes date display
addGlobalStyle('.date {display: none;}');
// Removes "Live Sex" tab from navigation tabs
addGlobalStyle('#im {display: none;}');
// Disables any iframes
addGlobalStyle('iframe {display: none;}');
// Disables hidden ad
addGlobalStyle('#snap_com_shot_main {display: none;}');
// Disables text ads
addGlobalStyle('#panc a.adHeadline, #panc a.adText, .fright tad, .tad span.adHeadline {display: none;}');


			  

// Remove left and right ads
var rlads = document.getElementById('con').getElementsByTagName('div')[0];
rlads = document.getElementById('panr');
rlads.parentNode.removeChild(rlads);
rlads = document.getElementById('panl');
rlads.parentNode.removeChild(rlads);


// Adds new logo banner
var tabs, newElement;
tabs = document.getElementById('tabs');
var logo = document.createElement("div");
logo.id = 'logo';
logo.align = 'center';
logo.style.margin = '10px';
logo.innerHTML = '<a target="_self" href="./"><img width="407" height="61" src="http://katz.cd/pic/katzws.gif"/></a>';
tabs.parentNode.insertBefore(logo, tabs);


// Sets Focus to Search Box
function setFocus() {
	document.getElementByName("q").focus();
}


// Deletes ad on no search matches
var myurl1 = document.location;
var i = 0;
if (/katz\.cd\//i.test(myurl1))
{
	var ad1 = document.getElementById('con').getElementsByTagName('div')[0];
	ad1.parentNode.removeChild(ad1); // Comment these 2 <<^^ lines if the tabs do not appear
	// Removes ads when search results are small
	for (i = 0; i <= 20; i ++ ) {
		var remhr = document.getElementById('panc').getElementsByTagName('hr')[0];
		remhr.parentNode.removeChild(remhr);
	}
	var srchbox = document.getElementById('pans').getElementsByTagName('form')[0].getElementsByTagName('input')[0];
	var remcop = document.getElementById('panc').getElementsByTagName('div')[3];
	remcop.parentNode.removeChild(remcop);
	if(document.getElementById('pg')) {
		}
	else {
		var noad1 = "Your search for <b>" + srchbox.value + "</b> did not produce any results.<br><br><br><div class='small'> © 2001-2008 <a target='_blank' href='http://katz.com/'>Katz Network</a></div>";
		document.getElementById('panc').getElementsByTagName('div')[2].innerHTML = noad1;

	}
}


// Checks for katzporn.com and removes ads
var myurl2 = document.location;
var i = 0;
if (/katzporn\.com\//i.test(myurl2))
{
	for (i = 0; i <= 0; i ++ ) { // Change <= 0; to <= 1; if a blank space or ad
								 //	appears above logo
		var addiv = document.getElementById('con').getElementsByTagName('div')[0];
		addiv.parentNode.removeChild(addiv);
	}

	var addiv2 = document.getElementById('panc').getElementsByTagName('div')[0];
	addiv2.parentNode.removeChild(addiv2);
	
	for (i = 0; i <= 5; i ++ ){
		var remhr = document.getElementById('panc').getElementsByTagName('hr')[0];
		remhr.parentNode.removeChild(remhr);
	}
	var srchbox = document.getElementById('pans').getElementsByTagName('form')[0].getElementsByTagName('input')[0];
	var remcop = document.getElementById('panc').getElementsByTagName('div')[3];
	remcop.parentNode.removeChild(remcop);
	if(document.getElementById('pg')) {
		}
	else {
		var noad = "Your search for <b>" + srchbox.value + "</b> did not produce any results.<br><br><br><div class='small'> © 2001-2008 <a target='_blank' href='http://katz.com/'>Katz Network</a></div>";
		document.getElementById('panc').getElementsByTagName('div')[2].innerHTML = noad;

	}
}