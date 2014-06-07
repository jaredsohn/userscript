// ==UserScript==
// @name         Ultimate Facepunch Scripts V2 beta
// @namespace    
// @description     Improves Facepunch forums in many ways. This version has a beta forum pager feature.
// @include       http://forums.facepunchstudios.com/*
// @include         http://*/viewthread.php?*
// @include         http://*/thread-*-*-*.html
// vBulletin
// @include         http://*/showthread.php?*
// @include         http://*/thread/*
// @version     2.0
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

//
//Forum auto pager
//


(function(){

if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(func, scope) {
		scope = scope || this;
		for (var i = 0, l = this.length; i < l; i++)
			func.call(scope, this[i], i, this); 
	}
}

Function.prototype.bind = function() {
	var __method = this, args = Array.prototype.slice.call(arguments,0), object = args.shift();
	return function() {
		return __method.apply(object, args.concat(Array.prototype.slice.call(arguments,0)));
	}
}

})();

(function(){

var AutoPager = function(){
	var plugin = null;
	var remain = -1;
	var Remain = function(){	
		if (document.compatMode == "CSS1Compat"){
			return {
				valueOf : function() {
					var sc = document.documentElement.scrollTop;
					var total = (document.documentElement.scrollHeight - document.documentElement.clientHeight);
					var remain = total - sc;
					return total - sc;
				}
			};
		} else if (document.compatMode == "BackCompat" || document.compatMode == "" || document.compatMode == null){
			return {
				valueOf : function() {
					var sc = document.body.scrollTop;
					var total = (document.body.scrollHeight - document.body.clientHeight);
					var remain = total - sc;
					return remain;
				}
			};
		}
	}();
  
	var monitorScroll = function() {
		var self = arguments.callee;
		var remain_tmp = Remain.valueOf();
		if (remain != remain_tmp){
			remain = remain_tmp;
			plugin.onScroll(remain);
		}
		setTimeout(self,150);
	};
	
	return {
		init : function(inPlugin){
			plugin = inPlugin;
			plugin.init();
			monitorScroll();
		}
	};
}();

window.AutoPager = AutoPager;

var AutoPagerComponent = function(){
	function init_protected(protected){
		protected.insertPoint=null;
		protected.maxPage=1;
		protected.requested=1;
		protected.nextPage=2;
		protected.scrollRange=1900;
		protected.url=null;
		protected.disabled=false;
		var $this=null;
		protected.infoBox={
			timer: null,
			startTime : 0,
			action : null,
			state : null,
			box : null,
			text : null,
			options: {
				hideDelay : 325,
				interval : 40,
				moveLength : 10
			},
			init: function(){
				$this=this;
				var div = document.createElement('div');
				div.setAttribute("style", "border: solid 1px; position: fixed; right: -200px; bottom: 100px; width: 200px; line-height: 50px;height: 50px;background-color: #ff5; opacity: 0.78;text-align: center; vertical-align: middle;");
				var text = document.createTextNode('');
				div.appendChild(text);
				div.id='_infoBox';
				document.body.appendChild(div);
				$this.text = text;
				$this.box = div;
				$this.action='idle';$this.state='hided';
			},
			setText: function(input){
				if (!$this.action) alert('setText');
				$this.text.nodeValue = input;
				return $this;
			},
			show: function(){
				if (!$this.action) alert('show');
				if ($this.action != 'showing' && $this.state != 'showed'){
					$this.action='showing';$this.state='showing';
					if (!$this.timer)
						$this.timer=setInterval($this.slide,$this.options.interval);
				}
				return $this;
			},
			hide: function(){
				if (!$this.action) alert('hide');
				if ($this.action != 'hiding' && $this.state != 'hided' && $this.state != 'wantToHide'){
					$this.state='wantToHide';
					$this.startTime=(new Date()).valueOf();
					if (!$this.timer)
						$this.timer=setInterval($this.slide,$this.options.interval);
				}
				return $this;
			},
			slide: function(){
				var value=parseInt($this.box.style.right.toString().match('-?\\d+'));				
				if ($this.action == 'hiding'){
					if (value<=-200){
						$this.action = 'idle';						
						if($this.state=='hiding')
							$this.state='hided';
					} else {
						var result=value-$this.options.moveLength + 'px';
						$this.box.style.right = result;
					}
				} else if ($this.action == 'showing'){
					if (value>=0){
						$this.action = 'idle';
						if($this.state=='showing')
							$this.state='showed';
					} else {
						var result=value+$this.options.moveLength + 'px';
						$this.box.style.right = result;
					}
				} else if ($this.state == 'wantToHide'){
					var diff= (new Date()).valueOf()-$this.startTime;
					if (diff > 3000){
						$this.action = 'hiding';$this.state='hiding';
						$this.startTime=0;						
					}
				} else if ($this.state == 'showed' || $this.state == 'hided'){
					clearInterval($this.timer);
					$this.timer=null;
				}
				return $this;
			}
		};
	}
	return {
		getInstance : function(protected){
			protected = protected || {};
			init_protected(protected);
			var $this= {
				onScroll : function(scroll){
					if(!protected.disabled && scroll<protected.scrollRange){
						if(protected.requested != protected.maxPage && protected.requested!=protected.nextPage)
						{
							protected.requested=protected.nextPage;
							if(protected.url != null)
							{
								this.sendRequest(protected.url);
							}
						}
					}
				},
				sendRequest : function(url){
					protected.infoBox.setText(' Loading Next Page ').show();
					var obj=document.createElement('html');
					var callback=function(data){
						protected.infoBox.setText(' Data Received ');
						obj.innerHTML=data;
						var oldFunction=unsafeWindow.document.write;
						unsafeWindow.document.write=function(){return;};
						protected.nextPage++;$this.ProcessResultData(data,obj);
						unsafeWindow.document.write=oldFunction;
						obj=null;
						protected.infoBox.hide();
					};
					var ajaxOptions= {
							type: "GET",
							url: url,
							data: null,
							contentType: "application/x-www-form-urlencoded",
							async: true,
							beforeSend: function(xml){
								xml.overrideMimeType('text/html;charset='+(!document.characterSet?document.charset:document.characterSet));
							},
							success: callback,
						};
					try{
						jQ.ajax(ajaxOptions);
					} catch(e){
						GM_xmlhttpRequest({
							method:ajaxOptions.type,
							url: ajaxOptions.url,
							data: ajaxOptions.data,
							overrideMimeType: 'text/html;charset='+(!document.characterSet?document.charset:document.characterSet),
							headers: {
								"X-Requested-With" : "XMLHttpRequest",
								"Content-Type" : "application/x-www-form-urlencoded"
							},
							onload: function(d){ ajaxOptions.success(d.responseText); }
						});
					}
				}
			};
			return $this;
		}
	};
}();

if (window.AutoPagerComponent==null)
	window.AutoPagerComponent=AutoPagerComponent;

})();



(function(){

var Discuz6 = function(){
	var protected = {};
	var that = AutoPagerComponent.getInstance(protected);

	that.init = function(){
		protected.infoBox.init();
		try{
			var xpath=document.evaluate(".//div[@class='pages_btns']/div[@class='pages']/a[attribute::class='next']/preceding-sibling::a[position()=1]/text()"
				,document,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if (xpath.snapshotLength==2)
				protected.maxPage=xpath.snapshotItem(1).nodeValue.match(/(\d+)/)[1];
			else
				throw "Cannot get maximum page of this thread.";
			protected.insertPoint=xpath.snapshotItem(1).parentNode.parentNode.parentNode.nextSibling;
			var div = xpath.snapshotItem(0).parentNode.parentNode;
			xpath=document.evaluate("./strong/child::text()",div,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var curpage=xpath.snapshotItem(0).nodeValue;
			if (curpage==protected.maxPage){
				throw "Already the last page of thread.";
			}
			protected.nextPage = curpage;
			protected.nextPage++;
			
			var loc=document.location.href.toString();
			var result=null;
			if (loc.match(/\?tid=\d+/)){
				if (loc.match(/&page=\d+/)){
					protected.url = loc.replace(/&page=\d+/,'&page='+protected.nextPage);
				}else // curpage == 1
					protected.url=loc+'&page='+protected.nextPage;
			}else if (result=loc.match(/thread-(\d+)-(\d+)-(\d+)/)){
				protected.url = loc.replace(/thread.*?\.html/,'viewthread.php?tid='+result[1]+'&extra=page='+result[3]+'&page='+protected.nextPage);
			}else{
				throw "Cannot get the next link of thread.";
			}
		}catch(e){
			protected.disabled=true;
			throw (e);
			return;
		}
	};

	that.ProcessResultData = function(data, obj){
		// mixing descendant with ancestor seems odd, but who knows?
		var xpath = document.evaluate(".//form//div[@class='mainbox viewthread']/ancestor::form"
			,obj,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var content=[];
		content[1]=xpath.snapshotItem(0).cloneNode(true);

		xpath=document.evaluate(".//div[@class='pages_btns']"
			,obj,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		content[0]=xpath.snapshotItem(0).cloneNode(true);
		content[2]=xpath.snapshotItem(1).cloneNode(true);

		content.forEach(function(item){
			protected.insertPoint.parentNode.insertBefore(item,protected.insertPoint);
		});
		
		protected.url = protected.url.replace(/&page=\d+/,'&page='+protected.nextPage);
	};

	return that;
}();

var Discuz5 = function(){
	var protected = {};
	var that = AutoPagerComponent.getInstance(protected);

	that.init = function(){
		protected.infoBox.init();
		try{
			var xpath=document.evaluate("self::node()/descendant-or-self::node()/child::div[attribute::class='maintable']/descendant-or-self::node()/child::div[attribute::class='p_bar']/a[attribute::class='p_pages']/child::text()"
				,document,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if (xpath.snapshotLength==2)
				protected.maxPage=xpath.snapshotItem(1).nodeValue.match("/(\\d+)")[1];
			else
				throw "Cannot get maximum page of this thread.";
			protected.insertPoint=xpath.snapshotItem(1).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling;
			var div = xpath.snapshotItem(0).parentNode.parentNode;
			xpath=document.evaluate("self::node()/child::a[attribute::class='p_curpage']/child::text()",div,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var curpage=xpath.snapshotItem(0).nodeValue;
			if (curpage==protected.maxPage){
				throw "Already the last page of thread.";
			}
			protected.nextPage = curpage;
			protected.nextPage++;
			
			var loc=document.location.href.toString();
			var result=null;
			if (loc.match(/\?tid=\d+/)){
				if (loc.match(/&page=\d+/)){
					protected.url = loc.replace(/&page=\d+/,'&page='+protected.nextPage);
				}else // curpage == 1
					protected.url=loc+'&page='+protected.nextPage;
			}else if (result=loc.match(/thread-(\d+)-(\d+)-(\d+)/)){
				protected.url = loc.replace(/thread.*?\.html/,'viewthread.php?tid='+result[1]+'&extra=page='+result[3]+'&page='+protected.nextPage);
			}else{
				throw "Cannot get the next link of thread.";
			}
		}catch(e){
			protected.disabled=true;
			throw (e);
			return;
		}
	};

	that.ProcessResultData = function(data, obj){
		// mixing descendant with ancestor seems odd, but who knows?
		var xpath = document.evaluate("self::node()/descendant-or-self::node()/child::div[attribute::class='maintable']/descendant-or-self::node()/child::div[attribute::class='p_bar']/ancestor::div[attribute::class='maintable']"
			,obj,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var content=[];

		content[0]=xpath.snapshotItem(0).cloneNode(true);
		content[2]=xpath.snapshotItem(1).cloneNode(true);

		// anyway to specify two OR child nodes in one statement?
		xpath = document.evaluate("self::node()/descendant-or-self::node()/child::div[attribute::class='maintable']/descendant-or-self::node()/child::tr[attribute::class='header']/ancestor::div[attribute::class='maintable']"
			,obj,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		content[1]=xpath.snapshotItem(0).cloneNode(true);

		content.forEach(function(item){
			protected.insertPoint.parentNode.insertBefore(item,protected.insertPoint);
		});
		
		protected.url = protected.url.replace(/&page=\d+/,'&page='+protected.nextPage);
	};

	return that;
}();

var vBulletin = function(){
	var protected = {};
	var that = AutoPagerComponent.getInstance(protected);

	that.init = function(){
		protected.infoBox.init();
		//var xpath=document.evaluate("self::node()/descendant-or-self::node()/child::div[attribute::class='page']/descendant-or-self::node()/child::div[attribute::class='pagenav']/descendant-or-self::node()/td[attribute::class='vbmenu_control']"
		var xpath=document.evaluate(".//div[@class='page']//div[@class='pagenav']//td[@class='vbmenu_control']"
			,document,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (xpath.snapshotLength==4)
			protected.maxPage=xpath.snapshotItem(2).firstChild.nodeValue.match(/(\d+)/g)[1];			
		else {
			protected.disabled=true;
			return;
		}

		var pagebar = xpath.snapshotItem(2).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
		protected.style=pagebar.parentNode.getAttribute('style');
		protected.insertPoint=pagebar.parentNode;
		// move page bar location
		var pagebar2 = pagebar.cloneNode(true);
		pagebar.parentNode.parentNode.insertBefore(pagebar2,pagebar.parentNode);
		pagebar2.setAttribute('style',protected.style);
		pagebar.parentNode.removeChild(pagebar);
	 
		var curpage=xpath.snapshotItem(2).firstChild.nodeValue.match(/(\d+)/g)[0];
		if (curpage==protected.maxPage){
			protected.disabled=true;
			return;
		}
		protected.nextPage = curpage;
		protected.nextPage++;
		var a=xpath.snapshotItem(3).previousSibling.previousSibling.firstChild.href.toString();		
		var result=null;
		if (a.match(/\/showthread\.php\?/)){
			protected.url = a.toString().replace(/&page=\d+/,'&page='+protected.nextPage);
		}else if (result=a.match(/\/thread\/(\d+)\/(\d+)\//)){
			protected.url = a.replace(/\/thread\/.*/,'/showthread.php?t='+result[2]+'&page='+protected.nextPage);
		}
	};
	that.ProcessResultData = function(data, obj){
		var xpath = document.evaluate(".//table//div[@class='pagenav']//td[@class='vbmenu_control']/ancestor::table/ancestor::table"
			,obj,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var content=[];
		content[0]=xpath.snapshotItem(0).cloneNode(true);
		content[3]=xpath.snapshotItem(1).cloneNode(true);
		xpath = document.evaluate(".//td[@id='threadtools']/ancestor::table[@class='tborder']"
			,obj,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		content[1]=xpath.snapshotItem(0).cloneNode(true);
		content[1].setAttribute('style','background-color: none');
		content.forEach(function(item){
			item.setAttribute('style',protected.style);
		});
		xpath = document.evaluate(".//div[@id='posts']"
			,obj,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		content[2]=xpath.snapshotItem(0).cloneNode(true);

		content.forEach(function(item){
			protected.insertPoint.parentNode.insertBefore(item,protected.insertPoint);
		});
		protected.url = protected.url.replace(/&page=\d+/,'&page='+protected.nextPage);
	};

	return that;
}();

var generator = document.evaluate("self::node()/descendant-or-self::node()/meta[attribute::name='generator']",document,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
if (generator!=null){
  generator = generator.content || "";
  if (generator.match("Discuz! 6")){
    AutoPager.init(Discuz6);
  }
  else if (generator.match("Discuz! 5")){
    AutoPager.init(Discuz5);
  }
  else if (generator.match("vBulletin 3")){
    AutoPager.init(vBulletin);
  }
}

})();