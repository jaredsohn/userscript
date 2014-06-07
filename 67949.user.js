// ==UserScript==
// @name          Facepunch Avatar Displayer
// @namespace     http://www.facepunch.com/*
// @description   Hovers a users avatar over a link to their profile (works on whos online list and for users whos avatars are not showing because they are banned, it will show thier real avatar. Works in other places too)
// @include       http://*.facepunch*.com/*
// ==/UserScript==


(function() {

//I dont know what this shit does but it makes it work
var isoify = false
if ( document.evaluate("//link[@href='/fp/styles-oify.css']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0 ) {
	isoify = true
};

//This too
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


}
Function.prototype.eventBind = function(object) {
	var __method = this, args = $A(arguments), object = args.shift();
	return function(event) {
		return __method.apply(object, [( event || window.event)].concat(args).concat($A(arguments)));
	}
}


// 
// Avatar tooltip
// 
GM_addStyle( ".avatarimg{ float: left; margin-right: 10px; display: none; }" );

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
			img.src = "http://www.facepunch.com/image.php?u="+id;
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

})();