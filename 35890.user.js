// ==UserScript==
// @name         Ultimate Facepunch Scripts
// @namespace    
// @description     Improves Facepunch forums in many ways.
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
	"b", "i", "u", "lua", "code", "highlight", "quote", "noparse", "url", "img","media", "img_thumb", "release"
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
		a.href = "	http://forums.facepunchstudios.com/eventlog.php?user="+myid;
		Dom.addText(a, "My events");
		
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

