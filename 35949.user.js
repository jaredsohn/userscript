// ==UserScript==
// @name         Ultimate Facepunch Scripts - Moderator Edition
// @namespace    
// @description     Improves Facepunch forums in many ways. This version is for moderators only as the other features will be of no real use to non mods.
// @include       http://forums.facepunchstudios.com/*
// @version     1.2
// ==/UserScript==

function $()
{
	var elements = new Array();
	for (var i = 0; i < arguments.length; i++)
	{
		var element = arguments[i];
		if (typeof element == 'string')
			element = document.getElementById(element);
		if (arguments.length == 1)
			return element;
		elements.push(element);
	}
	return elements;
}
function $A(iterable)
{
	if (!iterable)
	{
		return [];
	}
	if (iterable.toArray)
	{
		return iterable.toArray();
	}
	var length = iterable.length || 0, results = new Array(length); 
	while (length--)
	{
		results[length] = iterable[length];
	}
	return results;
}

var Event = {
	add: function( t, ev, fn )
	{
		var t = $(t);
		if( typeof document.addEventListener != "undefined" )
		{
			t.addEventListener( ev, fn, false)
		}else
		{
			t.attachEvent( "on"+ev, fn )
		}
	},
	remove: function( t, ev, fn )
	{
		var t = $(t);
		if( typeof document.removeEventListener != "undefined" )
		{
			t.removeEventListener( ev, fn, false )
		}else
		{
			t.detachEvent( "on"+ev, fn )
		}
	}
};
var Dom = {
	add: function( dest, type, debug )
	{
		var el = document.createElement( type );
		var dest = $(dest);
		if( debug )
		{
			where( dest );
		}
		dest.appendChild(el);
		return el;
	},
	addText: function( dest, text )
	{
		var node = document.createTextNode( text );
		var dest = $(dest);
		dest.appendChild(node);
		return node;
	},
	remove: function( el )
	{
		var el = $(el);
		el.parentNode.removeChild(el);
	},
	removeAll: function( el )
	{
		el = $(el);
		if( el.hasChildNodes() )
		{
			while( el.childNodes.length >= 1 )
			{
				Dom.remove( el.firstChild );       
			} 
		}
	}
}
Function.prototype.eventBind = function(object) {
	var __method = this, args = $A(arguments), object = args.shift();
	return function(event) {
		return __method.apply(object, [( event || window.event)].concat(args).concat($A(arguments)));
	}
}

// 
// Emote window
// 

var bbcode = [
	"b", "i", "u", "lua", "code", "highlight", "quote", "noparse", "url", "img","media", "img_thumb", "release", "sp"
];
var emotes = [
	[ ":howdy:",		"howdy.gif" ],
	[ ":hellnaw:",		"emot-hellnaw.gif" ],
	[ ":lol:",		"emot-lol.gif" ],
	[ ":beerbear:",		"emot-beerbear.png" ],
	[ ":moore:",		"emot-moore.gif" ],
	[ ":q:",		"emot-q.png" ],
	[ ":v:",		"emot-v.png" ],
	[ ":ghost:",		"emot-ghost.gif" ],
	[ ":excited:",		"emotboingpn7.gif" ],
	[ ":megaman:",		"emot-megaman.gif" ],
	[ ":monocle:",		"emot-monocle.gif" ],
	[ ":megamonoc:",	"emot-megamonocle.gif" ],
	[ ":fap:",		"emot-fap.gif" ],
	[ ":dance:",		"emot-dance.gif" ],
	[ ":4chan:",		"4chan.gif" ],
	[ ":freeman:",		"emot-freeman.gif" ],
	[ ":eng101:",		"emot-eng101.png" ],
	[ ":science:",		"emot-science.gif" ],
	[ ":holy:",		"emot-holy.gif" ],
	[ ":geno:",		"emot-geno.png" ],
	[ ":emo:",		"emot-emo.gif" ],
	[ ":raise:",		"emot-raise.gif" ],
	[ ":sigh:",		"emot-sigh.gif" ],
	[ ":goatse:",		"emot-goatse.gif" ],
	[ ":derp:",		"emot-derp.gif" ],
	[ ":krad:",		"emot-krad2.gif" ],
	[ ":denmark:",		"emot-denmark.gif" ],
	[ ":911:",		"emot-911.gif" ],
	[ ":britain:",		"emot-britain.gif" ],
	[ ":cthulhu:",		"emot-cthulhu.gif" ],
	[ ":ussr:",		"emot-ussr.gif" ],
	[ ":xbox:",		"emot-xbox.png" ],
	[ ":loleyes:",		"emot-loleyes.gif" ],
	[ ":ssh:",		"emot-ssh.png" ],
	[ ":dog:",		"emot-dog.png" ],
	[ ":foxnews:",		"emot-foxnews.gif" ],
	[ ":rock:",		"emot-rock.gif" ],
	[ ":siren:",		"emot-siren.gif" ],
	[ ":clint:",		"emot-clint.gif" ],
	[ ":c00l:",		"emot-c00l.gif" ],
	[ ":nws:",		"emot-nws.gif" ],
	[ ":love:",		"emot-love.gif" ],
	[ ":burger:",		"emot-burger.gif" ],
	[ ":nyd:",		"emot-nyd.gif" ],
	[ ":mad:",		"mad.png" ],
	[ ":jewish:",		"emot-jewish.png" ],
	[ ":geno:",		"emot-geno.png" ],
	[ ":keke:",		"emot-keke.png" ],
	[ ":)",			"smile.png" ],
	[ ":confused:",		"confused.png" ],
	[ ":chicago:",		"emot-chicago.gif" ],
	[ ":xd:",		"emot-xd.png" ],
	[ ":weed:",		"emot-weed.png" ],
	[ ":silent:",		"emot-silent.png" ],
	[ ":china:",		"emot-china.gif" ],
	[ ":downs:",		"emot-downs.png" ],
	[ ":witch:",		"emot-witch.png" ],
	[ ":comeback:",		"emot-comeback.gif" ],
	[ ":ssj:",		"emot-ssj.gif" ],
	[ ":rolleye:",		"emot-rolleye.png" ],
	[ ":04:",		"emot-04.gif" ],
	[ ":patriot:",		"emot-patriot.png" ],
	[ ":canada:",		"emot-canada.gif" ],
	[ ":(",			"frown.png" ],
	[ ":cop:",		"emot-cop.gif" ],
	[ ":words:",		"emot-words.gif" ],
	[ ":eek:",		"emot-eek.png" ],
	[ ":tinfoil:",		"emot-tinfoil.gif" ],
	[ ":question:",		"emot-question.gif" ],
	[ ":10bux:",		"emot-10bux.gif" ],
	[ ":ham:",		"emot-ham.png" ],
	[ ":laugh:",		"emot-laugh.gif" ],
	[ ":wtf:",		"emot-wtf.gif" ],
	[ ":crying:",		"emot-crying.gif" ],
	[ ":tizzy:",		"emot-tizzy.gif" ],
	[ ":cheers:",		"emot-cheers.png" ],
	[ ":20bux:",		"emot-20bux.gif" ],
	[ ":metis:",		"emot-metis.gif" ],
	[ ":D",			"biggrin.png" ],
	[ ":laffo:",		"emot-laffo.gif" ],
	[ ":chef:",		"emot-chef.png" ],
	[ ":quagmire:",		"emot-quagmire.gif" ],
	[ ";)",			"wink.png" ],
	[ ":o:",		"redface.png" ],
	[ ":wooow:",		"wooow.gif" ],
	[ ":ese:",		"emot-ese.gif" ],
	[ ":coal:",		"emot-coal.png" ],
	[ ":cool:",		"cool.png" ],
	[ ":ninja:",		"emot-ninja.gif" ],
	[ ":jihad:",		"emot-jihad.png" ],
	[ ":banjo:",		"emot-banjo.gif" ],
	[ ":huh:",		"emot-huh.gif" ],
	[ ":argh:",		"emot-argh.gif" ],
	[ ":sg:",		"emot-sg.gif" ],
	[ ":yoshi:",		"emot-yoshi.gif" ],
	[ ":mario:",		"emot-mario.gif" ],
	[ ":meatwad:",		"emot-meatwad.gif" ],
	[ ":scax:",		"emot-scax.png" ],
	[ ":sax:",		"emot-sax.png" ],
	[ ":pirate:",		"emot-pirate.gif" ],
	[ ":yarr:",		"emot-yarr.png" ],
	[ ":cow:",		"emot-cow.gif" ],
	[ ":zoid:",		"emot-zoid.gif" ],
	[ ":mmph:",		"emotowvr9.png" ],
	[ ":pwn:",		"emot-pwn.png" ],
	[ ":tama:",		"rk8yfp.gif" ],
	[ ":specialschool:",		"emotengdownsdancevd9.gif" ],
	[ ":girlv:",		"emot-j.gif" ],
	[ ":uhoh:",		"emotuhohhe8.png" ],
	[ ":ahaw:",		"emot-haw.gif" ],
	[ ":lepard:",		"leperdancenb0.gif" ],
	[ ":bees:",		"panic.gif" ],
	[ ":3:",		"3.gif" ],
	[ ":wth:",		"emot-wth.png" ],
	[ "[quote]:roflolmao[/quote]",		"emot-roflolmao.gif" ],


];

function CutText( text, before, after )
{
	var newtext = text.substr( text.indexOf( before ) + before.length );
	newtext = newtext.substr( 0, newtext.indexOf( after ) );
	return newtext;
}

GM_addStyle( ".tagbtn:link { background-color: #BBBBBB; color: #000000; padding: 2px 5px; margin: 2px; text-decoration: none }"+
".tagbtn:hover { background-color: #CCCCCC; }" );


var textarea = $("vB_Editor_QR_textarea");
if(!textarea)
{
	textarea = $("vB_Editor_001_textarea");
}
if(textarea)
{
	var div = Dom.add(textarea.parentNode.parentNode, "div");
	
	for( i=0; i<bbcode.length; i++ )
	{
		var a = Dom.add( div, "a" );
		a.href = "javascript:;";
		a.className = "tagbtn";
		Dom.addText(a, bbcode[i]);
		
		Event.add( a, "click", function( e, tag )
		{
			var codeleft = "["+tag+"]";
			var coderight = "[/"+tag+"]";
			
			var left = textarea.value.substr(0, textarea.selectionStart);
			var middle = textarea.value.substr(textarea.selectionStart, textarea.selectionEnd-textarea.selectionStart);
			var right = textarea.value.substr(textarea.selectionEnd);
			
			textarea.value = left + codeleft + middle + coderight + right;
			textarea.selectionStart = left.length + codeleft.length;
			textarea.selectionEnd = left.length + codeleft.length + middle.length;
			textarea.focus();
		}.eventBind( a, bbcode[i] ) );
		
	}
	
	var div = Dom.add(textarea.parentNode.parentNode, "div");
	
	div.style.overflowX = "scroll";
	div.style.width = textarea.clientWidth+"px";
	
	
	var div2 = Dom.add( div, "div" );
	div2.style.width = "3500px";
	
	
	for( i=0; i<emotes.length; i++ )
	{
		var a = Dom.add( div2, "a" );
		a.href = "javascript:;";
		a.title = emotes[i][0];
		Event.add( a, "click", function( e, code )
		{
			var left = textarea.value.substr(0, textarea.selectionStart);
			var right = textarea.value.substr(textarea.selectionEnd);
			textarea.value = left + code + right;
			textarea.selectionStart = textarea.selectionEnd = left.length + code.length;
			textarea.focus();
		}.eventBind( a, emotes[i][0] ) );
		
		var img = Dom.add( a, "img" );
		img.src = "/images/smilies/"+emotes[i][1];
		
		
	}
	
}

// 

//GM_addStyle( ".avatarimg{ float: left; margin-right: 10px; display: none; }" );

// 
// Avatar tooltip
// 

var tt = Dom.add( document.body, "div" );
tt.style.position = "fixed";
tt.style.display = "none";
var img = Dom.add( tt, "img" );
Event.add( img, "load", function()
{
	tt.style.display = "block";
} );
Event.add( window, "mousemove", function(e)
{
	if( tt.style.display == "block" )
	{
		tt.style.left = (e.clientX+10)+"px";
		tt.style.top = e.clientY+"px";
	}
});

var els = document.getElementsByTagName( "a" );
for( var i=0;i<els.length;i++ )
{
	var p = els[i].href.indexOf( "member.php?u=" );
	if( p > -1 )
	{
		var el = els[i];
		var userid = els[i].href.substr( p+13 );
		Event.add( el, "mouseover", function( e, id )
		{
			img.src = "http://forums.facepunchstudios.com/image.php?u="+id;
			tt.style.left = (e.clientX+10)+"px";
			tt.style.top = e.clientY+"px";
		}.eventBind( el, userid ) );
		
		Event.add( el, "mouseout", function( e, id )
		{
			tt.style.display = "none";
			img.src = "";
		}.eventBind( el, userid ) );
	}
}

// 
// Toggle extra media tags
// 

var currentid;
unsafeWindow.PlayMedia = function( id )
{
	if( currentid )
	{
		$("mediabuttons_"+currentid).style.display = "block";
		$("mediadiv_"+currentid).style.display = "none";
		
	}
	currentid = id;
	
	var buttons 	= $( 'mediabuttons_' + id );
	var movie	= $( 'mediadiv_' + id );
	
	buttons.style.display = 'none';
	movie.style.display = 'inline';
	
}


// 
// Collapse Threads
// 

GM_addStyle( ".collapselink{ margin:0px 0px 0px 20px; padding:2px 0px 2px 24px; height:16px; background:url('http://forums.facepunchstudios.com/images/famfam/control_eject_blue.png') no-repeat; }" );

var posts = $("posts");
if(posts)
{
	var els = posts.childNodes;
	for(var i=0; i<els.length; i++)
	{
		if(els[i].id && els[i].id.substring(0,4) == "post")
		{
			var header = els[i].childNodes[1];
			var userinfo = els[i].childNodes[3];
			var message = els[i].childNodes[5];
			var footer = els[i].childNodes[7];
			var a = Dom.add(header, "a");
			a.className = "collapselink";
			a.href = "javascript:;";
			Event.add(a,"click", function(e,u,m,f)
			{
				var d = u.style.display == "none"?"":"none";
				Dom.removeAll(this);
				Dom.addText(this, u.style.display == "none"?"Collapse":"Expand");
				u.style.display = d;
				m.style.display = d;
				f.style.display = d;
			}.eventBind(a,userinfo,message,footer));
			Dom.addText(a, "Collapse");
		}
	}
}

// 
// Extra links in top corner
// 

var els = document.getElementsByTagName("div");
for(var i=0; i<els.length; i++)
{
	var el = els[i];
	if(el.className == "smallfont" && el.parentNode.className == "alt2")
	{
		var selflink = el.childNodes[1].childNodes[1];
		var myid = selflink.href.substr("http://forums.facepunchstudios.com/member.php?u=".length);
		var myname = selflink.firstChild.nodeValue;;
		
		Dom.add(el, "br");

		
		var a = Dom.add(el, "a");
		a.href = "http://forums.facepunchstudios.com/search.php?do=process&showposts=0&starteronly=1&exactname=1&searchuser="+myname;
		Dom.addText(a, "My threads");
		
		Dom.addText(el, ", ");
		
		var a = Dom.add(el, "a");
		a.href = "http://forums.facepunchstudios.com/search.php?do=finduser&u="+myid;
		Dom.addText(a, "My posts");
		
		Dom.addText(el, ", ");
		
		
		var a = Dom.add(el, "a");
		a.href = "http://forums.facepunchstudios.com/eventlog.php?user="+myid;
		Dom.addText(a, " My Events");
		
		Dom.addText(el, ", ");
		
			var a = Dom.add(el, "a");
		a.href = "http://forums.facepunchstudios.com/login.php?do=logout";
		Dom.addText(a, "Logout");
		
	
		// This should only happen for one element.
		break;
	}
}


//
// Any extra styles
//

GM_addStyle(".messagetext a:link, .messagetext a:visited { text-decoration: underline } div.rate_bar { display: inline !important; position: static !important } div.rate_text { display: inline !important; }");

//
//Extra 'more menu' items.
//

var moremenu = document.getElementById("ListSpecialPages");
menuadd = document.createElement('p')
menuadd.innerHTML = "<a href=\"http://lab.facepunchstudios.com/\" style=\"\">Facepunch Lab</a> - A beta test of the new forums"
moremenu.appendChild(menuadd);

var moremenu = document.getElementById("ListSpecialPages");
menuadd = document.createElement('p')
menuadd.innerHTML = "<a href=\"forumdisplay.php?f=56\" style=\"\">Oify</a> - You don't really want to go here"
moremenu.appendChild(menuadd);

var moremenu = document.getElementById("ListSpecialPages");
menuadd = document.createElement('p')
menuadd.innerHTML = "<a href=\"javascript:R=0;%20x1=.1;%20y1=.05;%20x2=.25;%20y2=.24;%20x3=1.6;%20y3=.24;%20x4=300;%20y4=200;%20x5=300;%20y5=200;%20DI=document.getElementsByTagName(%22img%22);%20DIL=DI.length;%20function%20A(){for(i=0;%20i-DIL;%20i++){DIS=DI[%20i%20].style;%20DIS.position='absolute';%20DIS.left=(Math.sin(R*x1+i*x2+x3)*x4+x5)+%22px%22;%20DIS.top=(Math.cos(R*y1+i*y2+y3)*y4+y5)+%22px%22}R++}setInterval('A()',5);%20void(0);\" style=\"\">Crazyness</a> - Use this when bored"
moremenu.appendChild(menuadd);


//
//
//Moderator Menu
//
//


//Missing Scripts
var pooscr =

'var MouseX = 0;' +
'var MouseY = 0;' +


'function OpenEvent( $data ){' +
'	if ( ajEvent ){' +
'		alert( \'One at a time!\' );' +
'		return false;' +
'	};' +
'	if ( EventWindow ){' +
'		document.body.removeChild( EventWindow );' +
'		delete EventWindow;' +
'		EventWindow = false;' +
'	};' +
'	ClickX = MouseX;' +
'	ClickY = MouseY;' +
'	ajEvent = new vB_AJAX_Handler(true);' +
'	ajEvent.onreadystatechange( ShowEventCallback );' +
'	ajEvent.send( \'/eventlog.php\', \'aj=1&\' + $data );' +
'	EventURL = \'/eventlog.php?\' + $data ;' +
'	return false;' +
'};'

//vars pulled from GM
var THEBACKGROUND = GM_getValue("cssbackgr", 'http://www.garry.tv/img/trip/gr-bk.gif');
var thedomain = window.location.host;
var	bodyel = document.getElementsByTagName('body')[0];
if( thedomain.search(/forums.facepunchstudios.com/) == -1 ){ return; }
var shitlist = GM_getValue("slistarray", 'fake1,fake2');
shitlist = shitlist.split(',')
var myfnlocation = window.location.href
var isoify = false
if ( document.evaluate("//link[@href='/OIFY.css']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0 ) {
	isoify = true
};

//Append Javascript
function ADDJSString_Page(string) {
	var theheader, modheader, addeditem, add2;
	theheader = document.getElementsByTagName('head');
	modheader = theheader[0];
	addeditem = document.createElement('script');
	addeditem.type = 'text/javascript';
	add2 = document.createTextNode( string )
	addeditem.appendChild( add2 )
	modheader.appendChild( addeditem );
};

function getCookie(c_name){
	if (document.cookie.length>0) {
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1){
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		};
	};
	return "";
};

//button for the menu itself
function Menu_button_add(parm) {
	var baseel = document.evaluate("//div/div/table/tbody/tr[2]/td/ul", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	var crapmenuitem = document.createElement('li')
	crapmenuitem.ID = "tbcal"
	crapmenuitem.innerHTML = "<li><img src='images/as/navsep2.gif' alt='' /></li><li id='tbcal'><a onclick=\"return ToggleDiv('ListFaceRaper', true);\" href=\"#\">Moderator Menu</a></li>"
	baseel.appendChild(crapmenuitem)
	
	//Ban Bypass
	if ( myfnlocation.search(/showthread.php/) != -1 || myfnlocation.search(/newreply.php/) != -1) {
		
		if ( myfnlocation.search(/showthread.php/) != -1 ) {
			var baseel2 = document.getElementById("vB_Editor_QR").childNodes[1];
		} else if  ( myfnlocation.search(/newreply.php/) != -1 ) {
			var baseel2 = document.evaluate("//div/div/fieldset[2]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		};
	
	};
	
};

//
//Actual Menu Items
//

function Upanel_Setup(param) {
	var mycruddyjs;
	var crapmenushell, crapmenuitem1, crapmenuitem2, crapmenuitem3, crapmenuinner, crapmenuitemx;

	//SHitty Menu
	crapmenushell = document.createElement('div')
	crapmenushell.className = "SpecialPages"
	crapmenushell.style.display = "none"
	crapmenushell.style.top = 0
	crapmenushell.style.left = 0
	crapmenushell.style.width = "auto"
	crapmenushell.id = "ListFaceRaper"
	
	//Inner
	crapmenuinner = document.createElement('div')
	crapmenuinner.id = "InnerFaceRaper"
	crapmenuinner.style.clear = "both"
	crapmenushell.appendChild(crapmenuinner)
	
	//SHitty Menu Item 1
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<a href='http://forums.facepunchstudios.com/moderator.php?do=useroptions&u="+ getCookie('bbuserid') + "'>Your ModCP</a> - It's the ModCP bitches!"
	crapmenuinner.appendChild(crapmenuitem1)
	
	//SHitty Menu Item 1
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<a href=\"http://forums.facepunchstudios.com/modcp/index.php?loc=user.php?do=doips\" style=\"\">Search IP's</a> - Find Users by IP Address etc."
	crapmenuinner.appendChild(crapmenuitem1)
	
	
	//SHitty Menu Item 1
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<a href='http://forums.facepunchstudios.com/modcp/index.php?loc=user.php%3Fdo%3Davatar%26u%3D"+ getCookie('bbuserid') + "'>Mod avatar</a> - Change your unlimited avatar"
	crapmenushell.appendChild(crapmenuitem1)
	
	//Image
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<img style='' src='http://forums.facepunchstudios.com/image.php?u="+ getCookie('bbuserid') + "'></img>"
	crapmenushell.appendChild(crapmenuitem1)
	
	//Toggle Button
	crapmenuitem2 = document.createElement('div')
	crapmenuitem2.className = "cbutton"
	crapmenuitem2.style.display = "block"
	crapmenuitem2.style.marginLeft = "0px"
	crapmenuitem2.setAttribute("onclick", "return ToggleDiv('quick_forum_chooser', false);")
	crapmenuitem2.innerHTML = "<span class=''><span style='font-size: 13px;'><FONT COLOR='RED'>--Forum Quick List--</FONT></span>"
	crapmenushell.appendChild(crapmenuitem2)
	
	//Forum Quick Link
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = ""
	crapmenuitem1.innerHTML += "<br/>"
	crapmenuitem1.innerHTML += "<a href='./forumdisplay.php?f=3'><span style='font-size: 13px;'>Facepunch Studios</span></a><br>"
	crapmenuitem1.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='./forumdisplay.php?f=6'>General Discussion</a><br/>"
	crapmenuitem1.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='./forumdisplay.php?f=110'>Video Games</a><br/>"
	crapmenuitem1.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='./forumdisplay.php?f=460'>Music</a><br/>"
	crapmenuitem1.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='./forumdisplay.php?f=56900'>PC Hardware & Software</a><br/>"
	crapmenuitem1.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='./forumdisplay.php?f=60'>Fast Threads</a><br/>"
	crapmenuitem1.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='./forumdisplay.php?f=64'>Videos And Flash Movies and That Kind Of Crap</a><br/>"
	crapmenuitem1.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='./forumdisplay.php?f=75'>Creationism Corner</a><br/>"
	crapmenuitem1.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='./forumdisplay.php?f=51'>News Node</a><br/>"
	crapmenuitem1.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='./forumdisplay.php?f=57708'>Marketplace</a><br/>"
	crapmenuitem1.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='./forumdisplay.php?f=46'>The Gold Member's Crack Lounge</a><br/>"
	crapmenuitem1.innerHTML += "<br/>"
	crapmenuitem1.innerHTML += "<a href='./forumdisplay.php?f=11'><span style='font-size: 13px;'>Garry's Mod</span></a><br>"
	crapmenuitem1.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='./forumdisplay.php?f=15'>Garry's Mod Discussion</a><br/>"
	crapmenuitem1.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='./forumdisplay.php?f=57244'>Screenshots and Movies</a><br/>"
	crapmenuitem1.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='./forumdisplay.php?f=65'>LUA Scripting</a><br/>"
	crapmenuitem1.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='./forumdisplay.php?f=37'>Mods / Addons</a><br/>"
	crapmenuitem1.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='./forumdisplay.php?f=38'>Mapping</a><br/>"
	crapmenuitem1.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='./forumdisplay.php?f=40'>Models / Skins</a><br/>"
	crapmenuitem1.innerHTML += "<br/>"
	crapmenuitem1.innerHTML += "<a href='./forumdisplay.php?f=4'><span style='font-size: 13px;'>Facewound</span></a><br>"
	crapmenuitem1.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='./forumdisplay.php?f=7'>General</a><br/>"
	crapmenuitem1.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='./forumdisplay.php?f=9'>Facewound Mods</a><br/>"
	crapmenuitem1.innerHTML += "<br/>"
	crapmenuitem1.innerHTML += "<a href='./forumdisplay.php?f=57245'><span style='font-size: 13px;'>Everything Else</span></a><br>"
	crapmenuitem1.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='./forumdisplay.php?f=33'>Moderators</a><br/>"
	crapmenuitem1.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='./forumdisplay.php?f=45'>Reported Posts</a><br/>"
	crapmenuitem1.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='./forumdisplay.php?f=62'>Refugee Camp</a><br/>"
	crapmenuitem1.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='./forumdisplay.php?f=36'>Drop Dead Thread</a><br/>"
	
	crapmenushell.appendChild(crapmenuitem1)
	
	//SHitty Menu Item 1
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<a href=\"http://forums.facepunchstudios.com/modcp/index.php?loc=user.php?do=find\" style=\"\">Search Users</a> - Find those users"
	crapmenuinner.appendChild(crapmenuitem1)
	
	//SHitty Menu Item 1
	crapmenuitem1 = document.createElement('p')
	crapmenuitem1.innerHTML = "<a href=\"http://facepunchstudios.50webs.com/ForumLeaders.html\" style=\"\">Forum Moderators</a> - A list of the mods, as if you didn't know"
	crapmenuinner.appendChild(crapmenuitem1)
	
	bodyel.appendChild( crapmenushell );
};

function PostBitPlus_Setup(param){
	var findallposts, foundapost, creatthebutton, createtheimg;
	findallposts=document.evaluate("//div[@class='postbit']",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
		
	var mycruddyjs =


//This works better for most stuff, like tables
'function ToggleElementEX( id ) {' +
'	panel = fetch_object( id );' +
'	if (!panel) return false;' +

'	if (panel.style.display == \'none\') {' +
'		panel.style.display = \'\';' +
'	}' +
'	else {' +
'		panel.style.display = \'none\';' +
'	}' +

'	return false;' +
'};'
ADDJSString_Page(mycruddyjs)
		
	for (var i = 0; i < findallposts.snapshotLength; i++) {
		foundapost = findallposts.snapshotItem(i);
		//safetychecks
		if ( foundapost.childNodes[1].className == 'header'){
		

			//Pseudo Sigs
			if (GM_getValue("pseudosigs", false ) == true ){
				if ( foundapost.childNodes[3].childNodes[1].className == "rate_it_icon" ) {
					var poopy = foundapost.childNodes[3].childNodes[3].childNodes[1].href.replace(/member/gi, "image")
				} else {
					var poopy = foundapost.childNodes[3].childNodes[1].childNodes[1].href.replace(/member/gi, "image")
				};
				
				createtheimg = document.createElement('img');
				createtheimg.style.cssText = "vertical-align:left; display: block;";
				createtheimg.src = poopy +'&type=profile';
				createtheimg.title = 'Profile Picture'
				foundapost.childNodes[5].childNodes[1].appendChild( createtheimg );
			};
		};
	};
};


//Automerge Bypass...
function DPostFag_Setup(param) {
	//Please don't delete this...
	if ( !isoify ) { return; }


	
	if ( myfnlocation.search(/showthread.php/) != -1 ) {
		if( !document.getElementById("vB_Editor_QR") ){ return; }
		textelid = "vB_Editor_QR_textarea";
		brotherelem = document.getElementById("vB_Editor_QR").childNodes[1].childNodes[0];
		textelname = "Quick Reply"
	} else if ( myfnlocation.search(/newreply.php/) != -1 ) {
		textelid = "vB_Editor_001_textarea";
		brotherelem = findallposts=document.evaluate("//input[@name='preview']",
									document,
									null,
									XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
									null).snapshotItem(0);
		
		bodyel.appendChild( crapmenushell );
	};
};

//EMotefag...
function DEMoteFag_Setup(param) {

	
	if ( myfnlocation.search(/showthread.php/) != -1 ) {
		if( !document.getElementById("vB_Editor_QR") ){ return; }
		textelid = "vB_Editor_QR_textarea";
		brotherelem = document.getElementById("vB_Editor_QR").childNodes[1].childNodes[0];
		textelname = "Quick Reply"
	} else if ( myfnlocation.search(/newreply.php/) != -1 ) {
		textelid = "vB_Editor_001_textarea";
		brotherelem = findallposts=document.evaluate("//input[@name='preview']",
									document,
									null,
									XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
									null).snapshotItem(0);
		
		bodyel.appendChild( crapmenushell );
	};
};

//Blocklist cfg
function IGNORE_Setup(param) {

	
	bodyel.appendChild( crapmenushell );
};

//Stylistic Shit
function ExternCss_Setup(param) {

	if ( isoify ) {
		if (GM_getValue("oifyskin", false ) == true ){
			document.evaluate("//link[@href='/OIFY.css']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).href = 'http://forums.facepunchstudios.com/styles.css';
			stylemolest( phallic );
		} else {
			if ( GM_getValue("extocss", '' ) != '' ) {
				document.evaluate("//link[@href='/OIFY.css']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).href = GM_getValue("extocss", '' );
			};
		};
	} else {
		if ( GM_getValue("extncss", '' ) != '' ) {
			document.evaluate("//link[@href='/styles.css?2']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).href = GM_getValue("extncss", '' );
		};
	};
	
	//This fucked shit up
	getfiles=document.evaluate("//link[@href='/file_styles.css?6']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	if(getfiles.snapshotLength > 0 ){
		foundfile = getfiles.snapshotItem(0);
		foundfile.parentNode.removeChild(foundfile)
	};
};


//HTML...
function D_HTMLFagSetup(param) {
	if (GM_getValue("pseudohtml", false ) == false ){ return; }
	
	if ( myfnlocation.search(/showthread.php/) != -1 ) {
		//ENum all posts
		var themessages = document.evaluate("//div[@class='messagetext']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		
		for (var i = 0; i < themessages.snapshotLength; i++) {
			var thisthread = themessages.snapshotItem(i);
			var poo = thisthread.innerHTML
			poo = poo.replace(/&gt;/g,">");
			poo = poo.replace(/&lt;/g,"<");
			thisthread.innerHTML = poo;
		};

	};
}

//linefeeder...
function D_LINEFagSetup(param) {

	if (GM_getValue("linefeeder", false ) == false ){ return; }
	
	if ( myfnlocation.search(/showthread.php/) != -1 ) {
		//ENum all posts
		var themessages = document.evaluate("//div[@class='messagetext']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		
		for (var i = 0; i < themessages.snapshotLength; i++) {
			var thisthread = themessages.snapshotItem(i);
			var poo = thisthread.innerHTML
			
			poo = poo.replace(/<br>\n<br>\n<br>\n/g,"");
			thisthread.innerHTML = poo;
		};	
	};
}


//Call the Scripts
Menu_button_add('p');
//ADDJSInc_Page()
Upanel_Setup('p');


//
//Mikfoz is old :v
//

(function() {

	//some performance settings
	var MillisecondsPauseBetweenBatches=3;
	var NodesPerBatch = 20;
	var ReplacementText = "mikfoz is old";
	
	//edit the words here
	//sorted alpha backwords to catch bad word groupings
	var badwords=['mikfoz'];

	var i = 0;
	var st = new Date().valueOf();  //for performance testing	
	var els = document.evaluate('//text()', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var bw="\\b("+badwords.join("|")+")\\b";
	bw=new RegExp(bw, "gi");

	//do the title first
	document.title=document.title.replace(bw, ReplacementText);

	function CleanSome() 
	{		
		var el;

		var newval="";
		var data = "";
		var loopCount = 0;
		while ((el=els.snapshotItem(i++)) && (loopCount <= NodesPerBatch)) 
		{
			data = el.data;
			newval = data.replace(bw, ReplacementText);
			if (newval.length != data.length ||  newval != data)
			{
				//check the length first since its quicker than a a string comparison.
				//only change the value if we need to. its quicker.
				el.data = newval;
			}
			loopCount++;
		}
		
		if (el != null)
		{
			//more work left to do
			i--;
			GoNow(MillisecondsPauseBetweenBatches);
		}
		else
		{
			//we're done
			DoneNow();
		}
	}
	
	function DoneNow()
	{
		var et = new Date().valueOf();
		//alert("Milliseconds to complete: " + (et - st).toString()); //timer code
	}

	function GoNow(WaitUntil)
	{
		window.setTimeout(CleanSome, WaitUntil); 
	}
	
	//spin the initial "thread"
	GoNow(0);

})
();

//
//He is so old.
//
