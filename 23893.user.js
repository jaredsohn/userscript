// ==UserScript==
// @name				GMail, Yahoo, MSN, HotMail, Orkut Login Version.
// @description			Add a drop-down box with your ID's to the login form.
// @include		http*://login.live.com/*
// @include		http*://login.passport.net/*
// @include		http*://*google.com*
// @include		http*://login.yahoo.com/*
// @include		http*://mail.yahoo.com/*
// @include		http*://my.screenname.aol.com/*
// ==/UserScript==

/* You must configure the script before it will work propery.
 For this click start> Run> type-
 1. %appdata%\Mozilla\firefox\Profiles
 2. open the folder you see, now open another folder  name 'gm_scripts'
 3. open 'gmailyahoomailhotmaillog.user.js' in notepad
 4. find these lines ( should be line number 17)
 5. Add your user ID's to this array in the format bellow...
 6. var names = ['youmailid1','youmailid2'];
*/

//Add your user ID's to this array
var names = ['vikysaran','vikkysaran'];


function copyUserIdLogin( x ) {
	userId.value = x ;
	userId.focus();
};

function showSimpleLogin( obj ) {
	obj.style.display = "none";
	userId.style.cssText = userId.css;
	copyUserIdLogin("");
};

function updateLoginName( ) {
	if( userSelect.selectedIndex == userSelect.options.length-1 ){
		showSimpleLogin( userSelect );
	} else {
		copyUserIdLogin( userSelect.options[ userSelect.selectedIndex ].value );
		userPasswd.focus();
	}
};

var userId = 0;
var userPasswd = 0;
var userSelect = 0;
function showMultipleLogin( ) {
	if( userId.type=="hidden" ) return;

	var op = [];
	var se = document.createElement("select");
	if(se.addEventListener) se.addEventListener( 'change', updateLoginName, false );

	se.style.cssText = "-moz-box-sizing:border-box; width:"+userId.offsetWidth+"px";
	if( userId.className ) se.className = userId.className;

	var H = ( (g[0]=="hotmail") ? g[4] : "");
	names[names.length] = "insert another name...";
	
	for(var i=0; i<names.length; i++) 
	{
	op[i] = document.createElement("option");
	if( i == names.length-1 )
		op[i].style.cssText = "color:ThreeDShadow; margin-top:1px; text-align:center; border:1px solid ThreeDFace";
	else
		op[i].style.cssText = "padding-left:19px; background:2px 0 no-repeat url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAFfKj/FAAAAB3RJTUUH2AELDR4lT0XimAAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAARnQU1BAACxjwv8YQUAAACrUExURf///05OTqOjo9vrwc3jqIO2Jb3aiKfMZZrFTanNaW2XH9/tx9Hmrsffm7rXhoidYZ/HVpK/QIe5K9XotMrio3aIVPC/e5fDR4q8M+21bPvqz6Z3TeelVuKVQ91/LJZnPZ+XjNi4ifLKjuejVtl+Ko1+bbqddfnguvfaq/HDg7t6NFpJNId0Xpp7VM+1kOPEl8KVWpNkK1tJMoZzXJRzR5VwQZFmMFxIMZKBbJfYeBMAAAABdFJOUwBA5thmAAAAgUlEQVR42mNgAAIxEMEExKqaQIKRkZEBAtS1gYQkI0LIxAwqIyMHpph4+ASEYKrRgLGpOYShpqEFYTDJykMZUhA93Lz8gqwMECsZsRhjYWyBzNXR1dM3MDRCCCgoKokpq6BolJaWRuIxCYuIivGLS8CUMDGzsLKxc3ByseJwNBoAAFDfBz2TWu/IAAAAAElFTkSuQmCC')";
	
	op[i].value = names[i]+( (i<names.length-1)?H:"" );
	op[i].innerHTML = names[i];
	se.appendChild( op[i] );
	};

	copyUserIdLogin( names[0]+H );
	userId.css = ""+userId.style.cssText;
	userId.style.cssText = "position:absolute;left:-2000px;";
	userSelect = userId.parentNode.insertBefore( se,userId );

};

var g = 0;
function getLoginInput( ) {
var r = document.getElementsByTagName("form");
if( r.length )
	{
	for(var i=0; i<r.length; i++)
	{
	var f = r.item(i);
	if( f.action.indexOf('ServiceLoginBoxAuth')!=-1 )
		g = ['blogger','','Email','Passwd','@gmail.com'];	
	else if( f.action.indexOf('login.live.com')!=-1 )
		g = ['hotmail','','login','passwd','@hotmail.com'];
	else if( f.action.indexOf('ServiceLogin')!=-1 )
		g = ['google','','Email','Passwd']; //'width:10em'
	else if( f.action.indexOf('ServiceLogin')!=-1 )
		g = ['orkut','','Email','Passwd']; //'width:10em'
	else if( f.action.indexOf('login.yahoo.com')!=-1 )
		g = ['yahoo','','login','passwd']; //'width:130px'

	if( g )
		{
		userId = f.elements.namedItem( g[2] );
		userPasswd = f.elements.namedItem( g[3] );
		break;
		}
	}
	}
};

function locateUserLogin( ){
	window.setTimeout(function( ){
	getLoginInput( );
	if( userId && userPasswd )
	{ 
	showMultipleLogin( );
	userPasswd.focus( );
	}
	else{
	locateUserLogin( );
	}
	}, 100);
};

locateUserLogin( );
//