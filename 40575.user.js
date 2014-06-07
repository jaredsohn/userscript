// ==UserScript==
// @name         Ultimate FP + Fixed FP emotes v4.5 (Different Server)
// @namespace    
// @description     made by cosmic duck/vampired (small edit by cheesylard)/Miss Erika's Server Edit
// @include       http://forums.facepunchstudios.com/*
// @version     1.3.4.5
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
//FP emotes
"smile.gif",
"frown.gif",
"wink.gif",
"emot-v.gif",
"biggrin.gif",
"emot-raise.gif",
"emot-geno.gif",
"emot-keke.gif",
"mad.gif",
"emot-sigh.gif",
"rolleyes.gif",
"emot-q.gif",
"emot-silent.gif",
"emot-argh.gif",
"emot-sax.gif",
"confused.gif",
"emot-downs.gif",
"emot-crying.gif",
"emot-10bux.gif",
"emot-firstpost.gif",
"emot-words.gif",
"emot-aaaaa.gif",
"emot-butt.gif",
"emot-c00l.gif",
"emot-cheers.gif",
"emot-chef.gif",
"emot-clint.gif",
"cool.gif",
"emot-cop.gif",
"emot-dance.gif",
"emot-eek.gif",
"emot-emo.gif",
"emot-eng101.gif",
"emot-ese.gif",
"emot-f5.gif",
"emot-fappery.gif",
"emot-ghost.gif",
"emot-haw.gif",
"emot-holy.gif",
"emot-huh.gif",
"emot-j.gif",
"emot-jihad.gif",
"emot-monocle.gif",
"emot-ninja.gif",
"emot-nyd.gif",
"redface.gif",
"emot-patriot.gif",
"emot-rock.gif",
"emot-roflolmao.gif",
"emot-rolleye.gif",
"emot-science.gif",
"emot-derp.gif",
"emot-ssj.gif",
"emot-weed.gif",
"emot-burger.gif",
"emot-neckbeard.gif",
"emot-snoop.gif",
"emot-golfclap.gif",
"emot-20bux.gif",
"emot-byewhore.gif",
"emot-emoticon.gif",
"emot-iceburn.gif",
"emot-krad2.gif",
"emot-laffo.gif",
"emot-lol.gif",
"emot-lost.gif",
"emot-04.gif",
"emot-05.gif",
"emot-06.gif",
"emot-07.gif",
"emot-wtc.gif",
"emot-wtf.gif",
"emot-911.gif",
"emot-australia.gif",
"emot-belarus.gif",
"emot-britain.gif",
"emot-ca.gif",
"emot-canada.gif",
"emot-china.gif",
"emot-denmark.gif",
"emot-foxnews.gif",
"emot-france.gif",
"emot-furcry.gif",
"emot-scotland.gif",
"emot-spain.gif",
"emot-sweden.gif",
"emot-ussr.gif",
"emot-wcw.gif",
"emot-question.gif",
"emot-lovewcc.gif",
"emot-laugh.gif",
"emot-mario.gif",
"emot-megaman.gif",
"emot-quagmire.gif",
"emot-sg.gif",
"emot-wookie.gif",
"emot-yoshi.gif",
"emot-zoid.gif",
];

//this is just the :P emote
var lardemotes = [
"http://d2k5.com/sa_emots/emot-p.gif",
];


//SA emotes
var emotes2 = [
"emot-350.gif",
"emot-3.gif",
"emot-aaa.gif",
"emot-am.gif",
"emot-angel.gif",
"emot-bang.gif",
"emot-banjo.gif",
"emot-black101.gif",
"emot-blush.gif",
"emot-buddy.gif",
"emot-cawg.gif",
"emot-comeback.gif",
"emot-crossarms.gif",
"emot-Dawkins102.gif",
"emot-devil.gif",
"emot-dominic.gif",
"emot-downsgun.gif",
"emot-eng99.gif",
"emot-engleft.gif",
"emot-flame.gif",
"emot-flashfact.gif",
"emot-flashfap.gif",
"emot-gay.gif",
"emot-gibs.gif",
"emot-glomp.gif",
"emot-goleft.gif",
"emot-gonk.gif",
"emot-hehe.gif",
"emot-hfive.gif",
"emot-hist101.gif",
"emot-hitler.gif",
"emot-hydrogen.gif",
"emot-jerkbag.gif",
"emot-jewish.gif",
"mmmhmm.gif",
"emot-pervert.gif",
"emot-pipe.gif",
"emot-pirate.gif",
"emot-pseudo.gif",
"emot-rant.gif",
"emot-saddowns.gif",
"emot-shobon.gif",
"emot-suicide.gif",
"emot-sweatdrop.gif",
"emot-tinfoil.gif",
"emot-what.gif",
"emot-whip.gif",
"emot-witch.gif",
"emot-wth.gif",
"emot-xd.gif",
"emot-yarr.gif",
"emot-zombie.gif",
"livestock~01-14-04-whore.gif",
"emot-11tea.gif",
"emot-2bong.png",
"emot-a2m.gif",
"emot-arghfist.gif",
"emot-awesome.gif",
"emot-awesomelon.gif",
"emot-axe.gif",
"emot-bahgawd.gif",
"emot-barf.gif",
"emot-bick.gif",
"emot-bigtran.gif",
"emot-boonie.gif",
"emot-buttertroll.gif",
"emot-c00lbert.gif",
"emot-c00lbutt.gif",
"emot-c.png",
"emot-camera6.gif",
"emot-can.gif",
"emot-catholic.gif",
"emot-clownballoon.gif",
"emot-ccb.gif",
"emot-chatter.gif",
"emot-coal.gif",
"emot-coffee.gif",
"emot-colbert.gif",
"emot-commissar.gif",
"emot-d.png",
"emot-doh.gif",
"emot-dong.gif",
"emot-doom.gif",
"emot-downsbravo.gif",
"emot-downsrim.gif",
"emot-drac.gif",
"emot-drugnerd.gif",
"emot-drum.gif",
"emot-f5h.gif",
"emot-fh.gif",
"emot-flaccid.gif",
"emot-flag.gif",
"emot-fork.png",
"emot-frogsiren.gif",
"emot-ftbrg.gif",
"emot-gbsmith.gif",
"emot-george.gif",
"emot-gizz.gif",
"emot-goatse.gif",
"emot-gooncamp.gif",
"emot-guitar.gif",
"emot-h.png",
"emot-happyelf.gif",
"emot-havlat.gif",
"emot-hchatter.gif",
"emot-hf.gif",
"emot-fuckyou.gif",
"emot-itjb.gif",
"emot-joel.gif",
"emot-kamina.gif",
"emot-kiddo.gif",
"emot-killdozer.gif",
"emot-kratos.gif",
"emot-love.gif",
"emot-lsd.gif",
"emot-madmax.gif",
"emot-munch.gif",
"emot-obama.gif",
"emot-pcgaming.gif",
"emot-pedo.gif",
"emot-phoneb.gif",
"emot-phoneline.gif",
"emot-phone.gif",
"emot-pleaseno.gif",
"emot-pluto.gif",
"emot-pranke.gif",
"emot-psyberger.gif",
"emot-psylon.gif",
"emot-psypop.gif",
"emot-onlyoption.gif",
"emot-pwn.gif",
"emot-redhammer.gif",
"emot-respek.gif",
"emot-riker.gif",
"emot-rimshot.gif",
"emot-rodimus.gif",
"rubshandstogetherandgrinsevilly.gif",
"emot-s.png",
"emot-shivdurf.gif",
"emot-siren.gif",
"emot-sissies.gif",
"emot-slick.gif",
"emot-smith.gif",
"emot-smithicide.gif",
"emot-sonia.gif",
"emot-sotw.gif",
"emot-spidey.gif",
"emot-spooky.gif",
"emot-ssh.gif",
"emot-stalker.gif",
"emot-stat.gif",
"emot-sun.gif",
"emot-supaburn.gif",
"emot-swoon.gif",
"emot-sympathy.gif",
"emot-taco.gif",
"emot-toot.gif",
"emot-toughguy.gif",
"emot-unsmith.gif",
"emot-wal.gif",
"emot-woop.gif",
"emot-wooper.gif",
"emot-worship.gif",
"emot-xie.gif",

"emot-airquote.gif",
"emot-allears.gif",
"emot-byobear.gif",
"emot-byodood.gif",
"emot-crow.gif",
"emot-dogout.gif",
"emot-frogdowns.png",
"emot-gb2hd2k.gif",
"emot-goonboot.gif",
"emot-hampants.gif",
"emot-horse.gif",
"emot-lron.gif",
"emot-nattyburn.gif",
"emot-niggly.gif",
"emot-ohdear.png",
"emot-pcgaming1.gif",
"emot-psyboom.gif",
"emot-qfg.gif",
"emot-razz.gif",
"emot-regd08.gif",
"emot-regd09.gif",
"emot-smug.gif",
"emot-smugdog.gif",
"emot-spergin.png",
"emot-sweep.gif",
"emot-tf.gif",
"classic_fillmore.gif",
"emot-tiphat.gif",
"emot-tito.gif",
"emot-tubular.gif",
"emot-twisted.gif",
"emot-ughh.gif",
"emot-uhaul.gif",
"emot-weed.gif",
"emot-whoptc.gif",
"emot-FYH.gif",
"emot-aslol.gif",
"emot-bandwagon.gif",
"emot-bravo2.gif",
"emot-bravo.gif",
"emot-byob.gif",
"emot-chio.gif",
"emot-coupons.gif",
"emot-damn.gif",
"emot-doink.gif",
"emot-downsowned.gif",
"emot-downswords.gif",
"emot-effort.gif",
"evol-anim.gif",
"emot-fiesta.gif",
"emot-filez.gif",
"emot-fireman.gif",
"emot-frogout.gif",
"emot-fry.gif",
"emot-fuckoff.gif",
"emot-gb2byob.gif",
"emot-gb2fyad.gif",
"emot-gb2gbs.gif",
"emot-godwin.gif",
"emot-goof.gif",
"emot-google.gif",
"emot-goon.gif",
"emot-goonsay.gif",
"emot-gtfoycs.gif",
"emot-hawaaaafap.gif",
"emot-hellyeah.gif",
"emot-hurr.gif",
"emot-iia.png",
"emot-iiaca.gif",
"emot-iiam.gif",
"emot-irony.gif",
"emot-master.gif",
"emot-milk.gif",
"emot-moustache.gif",
"emot-ms.gif",
"emot-nms.gif",
"emot-nws.gif",
"emot-nyoron.gif",
"emot-owned.gif",
"emot-page3.gif",
"emot-protarget.gif",
"emot-rice.gif",
"emot-russbus.gif",
"emot-shlick.gif",
"emot-synpa.gif",
"emot-techno.gif",
"emot-their.gif",
"emot-todd.gif",
"emot-toxx.gif",
"emot-twentyfour.gif",
"emot-vick.gif",
"emot-w00t.gif",
"emot-w2byob.gif",
"emot-waycool.gif",
"emot-whatup.gif",
"emot-wrongful.gif",
"emot-zerg.gif",

"emot-cthulhu.gif",
"emot-frog.gif",
"emot-frogbon.gif",
"emot-frogc00l.gif",
"emot-froggonk.gif",
"emot-gonchar.gif",
"emot-kraken.gif",
"emot-monar.gif",
"emot-psyduck.gif",
"emot-shroom.gif",
"emot-signings.gif",
"emot-stoat.gif",
"emot-trashbear.gif",
"emot-woof.gif",
"emot-wotwot.gif",
"emot-bsg.gif",
"emot-hr.gif",
"emot-mexico.gif",
"emot-wink.gif",
"emot-bubblewoop.gif",
"emot-dota101.gif",
"emot-golgo.gif",
"emot-ironicat.gif",
"emot-mufasa.png",
"emot-objection.gif",
"emot-orks.gif",
"emot-qirex.gif",
"emot-rudebox.gif",
"emot-sharpton.gif",
"emot-shopkeeper.gif",
"emot-wcc.gif",
"emot-coolfish.gif",
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
	div2.style.width = "7000px";
	
	
	
	for( i=0; i<emotes.length; i++ )
	{
		var a = Dom.add( div2, "a" );
		a.href = "javascript:;";
		a.title = "[img]http://d2k5.com/sa_emots/"+emotes[i]+"[/img]";
		Event.add( a, "click", function( e, code )
		{
			var left = textarea.value.substr(0, textarea.selectionStart);
			var right = textarea.value.substr(textarea.selectionEnd);
			textarea.value = left + code + right;
			textarea.selectionStart = textarea.selectionEnd = left.length + code.length;
			textarea.focus();
		}.eventBind( a, "[img]http://d2k5.com/sa_emots/"+emotes[i]+"[/img]" ) );
		
		var img = Dom.add( a, "img" );
		img.src = "http://d2k5.com/sa_emots/"+emotes[i];
		
		
	}
	
	//lard emotes
	for( i=0; i<lardemotes.length; i++ )
	{
		var a = Dom.add( div2, "a" );
		a.href = "javascript:;";
		a.title = "[img]"+lardemotes[i]+"[/img]";
		Event.add( a, "click", function( e, code )
		{
			var left = textarea.value.substr(0, textarea.selectionStart);
			var right = textarea.value.substr(textarea.selectionEnd);
			textarea.value = left + code + right;
			textarea.selectionStart = textarea.selectionEnd = left.length + code.length;
			textarea.focus();
		}.eventBind( a, "[img]"+lardemotes[i]+"[/img]" ) );
		
		var img = Dom.add( a, "img" );
		img.src = lardemotes[i];
		
		
	}
	
	
	//not so good emotes
	for( i=0; i<emotes2.length; i++ )
	{
		var a = Dom.add( div2, "a" );
		a.href = "javascript:;";
		a.title = "[img]http://d2k5.com/sa_emots/"+emotes2[i]+"[/img]";
		Event.add( a, "click", function( e, code )
		{
			var left = textarea.value.substr(0, textarea.selectionStart);
			var right = textarea.value.substr(textarea.selectionEnd);
			textarea.value = left + code + right;
			textarea.selectionStart = textarea.selectionEnd = left.length + code.length;
			textarea.focus();
		}.eventBind( a, "[img]http://d2k5.com/sa_emots/"+emotes2[i]+"[/img]" ) );
		
		var img = Dom.add( a, "img" );
		img.src = "http://d2k5.com/sa_emots/"+emotes2[i];
		
		
	}
	
}
