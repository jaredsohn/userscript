// ==UserScript==
// @name           deviantART Deviation Frame 
// @namespace      http://www.w3.org/1999/xhtml
// @description    Put a frame around your deviations easily!
// @include        http://*.deviantart.com/art/*
// ==/UserScript==

if (!document.getElementById('lit-view'))
{
var css= ".bubbleview .shadow img {-moz-border-radius-topright: 1em !important; -moz-border-radius-topleft: 1em !important; -moz-border-radius-bottomright: 1em !important; -moz-border-radius-bottomleft: 1em !important; }";

if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}

var framesize = 5;
var framep = false;

function frame_smaller()
{
framesize -= 1;
frame();
}

function frame_bigger()
{
framesize += 1;
frame();
}

function frame() {
color();
elements = document.getElementsByTagName("img");
for (var i=0; i < elements.length; i++)
{
if (elements[i].getAttribute('collect_fullview'))
{
if (!framep)
{
elements[i].style.padding = '0em !important;';
}
else
{
elements[i].style.padding = framesize + 'em !important;';
}
}
}
var element = document.getElementById('zoomed-in');
var elementsp = element.getElementsByTagName("img");
for (var i=0; i < elementsp.length; i++)
{
if (!framep)
{
elementsp[i].style.padding = '0em !important;';
}
else
{
elementsp[i].style.padding = framesize + 'em !important;';
}
}
}

function frametry(){
var t = true;
color();
var element = document.getElementById('zoomed-in');
var elementsp = element.getElementsByTagName("img");
for (var i=0; i < elementsp.length; i++)
{
if (!framep)
{
elementsp[i].style.padding = '0em !important;';
}
else
{
elementsp[i].style.padding = framesize + 'em !important;';
}
t = false;
}
if (t)
{
setTimeout(frametry,100);
}
}

var colorp = 0;

function color() {
if (framep)
{
var colort;
if (colorp == 0)
{
document.getElementById('dev-color').innerHTML = 'Black Frame';
colort = '#000000 !important;'
}
else if(colorp == 1)
{
document.getElementById('dev-color').innerHTML = 'Dark Green Frame';
colort = '#374341 !important;'
}
else if(colorp == 2)
{
document.getElementById('dev-color').innerHTML = 'Light Green Frame';
colort = '#D5E2DF !important;'
}
else if(colorp == 3)
{
document.getElementById('dev-color').innerHTML = 'White Frame';
colort = '#FFFFFF !important;'
}
elements = document.getElementsByTagName("img");
for (var i=0; i < elements.length; i++)
{
if (elements[i].getAttribute('collect_fullview'))
{
elements[i].style.backgroundColor = colort;
}
}
var element = document.getElementById('zoomed-in');
var elementsp = element.getElementsByTagName("img");
for (var i=0; i < elementsp.length; i++)
{
elementsp[i].style.backgroundColor = colort;
}
}
}

var element = document.createElement("i");
element.setAttribute("class","i18");
document.getElementById('deviation-links').appendChild(element);

element = document.createElement("a");
element.setAttribute("id","dev-goo");
document.getElementById('deviation-links').appendChild(element);
document.getElementById('dev-goo').innerHTML = '<br />';

element = document.createElement("i");
element.setAttribute("class","i14");
document.getElementById('deviation-links').appendChild(element);

element = document.createElement("a");
element.setAttribute("id","dev-frames");
element.setAttribute("href","#");
document.getElementById('deviation-links').appendChild(element);
document.getElementById('dev-frames').innerHTML = 'Add Frame';

element = document.createElement("i");
element.setAttribute("class","i14");
document.getElementById('deviation-links').appendChild(element);

element = document.createElement("a");
element.setAttribute("id","dev-color");
element.setAttribute("href","#");
document.getElementById('deviation-links').appendChild(element);
document.getElementById('dev-color').innerHTML = 'Black Frame';

element = document.createElement("i");
element.setAttribute("class","i14");
document.getElementById('deviation-links').appendChild(element);

element = document.createElement("a");
element.setAttribute("id","dev-frame-smaller");
element.setAttribute("href","#");
document.getElementById('deviation-links').appendChild(element);
document.getElementById('dev-frame-smaller').innerHTML = 'Smaller Frame';

element = document.createElement("i");
element.setAttribute("class","i14");
document.getElementById('deviation-links').appendChild(element);

element = document.createElement("a");
element.setAttribute("id","dev-frame-bigger");
element.setAttribute("href","#");
document.getElementById('deviation-links').appendChild(element);
document.getElementById('dev-frame-bigger').innerHTML = 'Bigger Frame';

elements = document.getElementsByTagName("img");
for (var i=0; i < elements.length; i++)
{
if (elements[i].getAttribute('collect_fullview'))
{
elements[i].setAttribute('id','deviation-small');
}
}

function Set_Cookie( name, value, expires, path, domain, secure ) 
{
// set time, it's in milliseconds
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

function Get_Cookie( check_name ) {
	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f
	
	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split( '=' );
		
		
		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
	
		// if the extracted name matches passed check_name
		if ( cookie_name == check_name )
		{
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if ( a_temp_cookie.length > 1 )
			{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			// note that in cases where cookie is initialized but no value, null is returned
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

var x;
x = Get_Cookie('framec');
if (x)
{
framep = x;
frame();
if (!framep)
{
document.getElementById('dev-frames').innerHTML = 'Add Frame';
}
else
{
document.getElementById('dev-frames').innerHTML = 'Remove Frame';
}
}
x = Get_Cookie('colorc');
if (x)
{
colorp  = x;
color();
}
x = Get_Cookie('framesizec');
if (x)
{
framesize  = x;
frame();
}

document.getElementById('dev-frames').addEventListener('click', function(e){
if (framep)
{
framep = false;
document.getElementById('dev-frames').innerHTML = 'Add Frame';
}
else
{
framep = true;
document.getElementById('dev-frames').innerHTML = 'Remove Frame';
}
frame();
Set_Cookie('framec', framep, '', '/', 'deviantart.com', '' )
}, false);

document.getElementById('deviation-small').addEventListener('click', function(e){
frametry();
}, false);

document.getElementById('dev-frame-smaller').addEventListener('click', function(e){
frame_smaller();
Set_Cookie('framesizec', framesize, '', '/', 'deviantart.com', '' )
}, false);


document.getElementById('dev-frame-bigger').addEventListener('click', function(e){
frame_bigger();
Set_Cookie('framesizec', framesize, '', '/', 'deviantart.com', '' )
}, false);

document.getElementById('dev-color').addEventListener('click', function(e){
colorp += 1;
if (colorp > 3)
{
colorp = 0;
}
color();
Set_Cookie('colorc', colorp, '', '/', 'deviantart.com', '' )
}, false);

}