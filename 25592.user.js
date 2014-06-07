// ==UserScript==
// @name           Twitter activity visualizer
// @namespace      http://ido.nu/kuma/
// @description    visualizing twitter activity
// @include        http://twitter.com/*
// ==/UserScript==

if ( !Array.prototype.reduce ) {

	Array.prototype.reduce = function (fn, initialValue) {
	  return ( this.length == 0 ) ? initialValue : this.slice(1).reduce(fn, fn(initialValue, this[0]));  
	};
}



function acc (a, op, init) {
	return a.reduce( function (a,b) {
		return ( op(a, b) ) ? a : b;
	}, init );
	
}
function min (a) {
	return acc( a, function (a,b) {
		return Number(a) < Number(b);
	}, 0xffffffff);
}
function max (a) {
	return acc( a, function (a,b) {
		return Number(a) > Number(b);
	}, 0-0xffffffff);
}

function keys (o) {
	var r = [];
	var i ;
	for ( i in o ) {
		r.push(i);
	}
	return r;
}


// $X
// based on: http://lowreal.net/blog/2007/11/17/1
// 
// $X(exp);
// $X(exp, context);
// $X(exp, type);
// $X(exp, {context: context,
//          type: type,
//          namespace: {h:"http://www.w3.org/1999/xhtml"}});
function $X (exp, context) {
	var type, namespace={};
	// console.log(String(exp));
	if(typeof context == "function"){
		type = context;
		context = null;
	}else if(typeof context != "undefined" && !context['nodeType']){
		type = context['type'];
		namespace = context['namespace'] || context['ns'];
		context = context['context'];
	}

	if (!context) context = document;
	var exp = (context.ownerDocument || context).createExpression(exp, function (prefix) {
			return namespace[prefix] || document.createNSResolver((context.ownerDocument == null ? context
					: context.ownerDocument).documentElement)
			.lookupNamespaceURI(prefix) || document.documentElement.namespaceURI;
			});

	switch (type) {
		case String:
			return exp.evaluate(
					context,
					XPathResult.STRING_TYPE,
					null
					).stringValue;
		case Number:
			return exp.evaluate(
				context,
				XPathResult.NUMBER_TYPE,
				null
			).numberValue;
		case Boolean:
			return exp.evaluate(
				context,
				XPathResult.BOOLEAN_TYPE,
				null
			).booleanValue;
		case Array:
			var result = exp.evaluate(
				context,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
				null
			);
			var ret = [];
			for (var i = 0, len = result.snapshotLength; i < len; ret.push(result.snapshotItem(i++)));
			return ret;
		case undefined:
			var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
			switch (result.resultType) {
				case XPathResult.STRING_TYPE : return result.stringValue;
				case XPathResult.NUMBER_TYPE : return result.numberValue;
				case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
				case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
					// not ensure the order.
					var ret = [];
					var i = null;
					while (i = result.iterateNext()) {
						ret.push(i);
					}
					return ret;
				}
			}
			return null;
		default:
			throw(TypeError("$X: specified type is not valid type."));
	}
}

		function init () {
			var canvas = document.createElement('canvas');
			canvas.width = width;
			canvas.height = height;
			canvas.style.padding = 0;
			canvas.style.margin = 0;
			
			var d = document.createElement('div');
			d.style.position = 'fixed';
			d.style.bottom = '0';
			d.style.left = '0';
			d.style.background = 'white';
			d.style.opacity = 1;
			d.style.borderTop = '1px solid';
			d.style.padding = 0;
			d.style.margin = 0;
			d.appendChild(canvas);
			document.body.appendChild(d);
			ctx = canvas.getContext('2d');

			//unsafeWindow.ctx = canvas;
		}

function parse(context) {

	ctx.strokeStyle = "rgb(0, 0,255)";
	var datetimes = $X('.//abbr/@title', context);
	published = datetimes.map( function (e) {
		var dt = e.nodeValue;
		var m = dt.match(/(\d+)-0?(\d+)-0?(\d+)T0?(\d+):0?(\d+):(\d+)/);
		m.shift();
		m[1]--;

		var d =  new Date(Date.UTC.apply(null, m));
		return Math.floor( ( now - d ) / 1000 / (60*10) );
	} ).reduce( function (stat, t) {
		if ( stat[t] )
			stat[t]++;
		else
			stat[t] = 1;
		return stat;
	}, published);
}


function draw () {
	function c( n ) {
	   n = ((n + 24) -2) % 24;
	var rgb = [
	[68,75,251],
	[72,228,126],
	[245,214,41],
	];

	  if ( n < 8 ) {
			var p = 0;
			var q = 8;
			var a = rgb[0];
			var b = rgb[1];
		   var t =  a.map( function (v, i) {
			   return  v*(q - n)/(q-p) + b[i]*(n - p)/(q-p)
			}  ).map( Math.floor);
			 return t;
		} else if ( n < 16 ) {
			var p = 8;
			var q = 16;
			var a = rgb[1];
			var b = rgb[2];
		   var t =  a.map( function (v, i) {
			   return  v*(q - n)/(q-p) + b[i]*(n - p)/(q-p)
			}  ).map( Math.floor);
			 return t;
		} else {
		 var p = 16;
			var q = 24;
			var a = rgb[2];
			var b = rgb[0];
		   var t =  a.map( function (v, i) {
			   return  v*(q - n)/(q-p) + b[i]*(n - p)/(q-p)
			}  ).map( Math.floor);
			 return t;
		}
	}

	ctx.fillStyle = "white";
	ctx.fillRect(0 ,0,width ,height+ 4);

	for ( var i = 0; i < width / pixelPerHour ; i++  ) {
		if ( 1 || i % 2) {
			var h = now.getHours();
			h = ( (h + 24) - (Math.floor(i ) % 24) ) % 24;
			var rgba = "rgba(" + c(h).join(",")+ ", 0.2)";
			ctx.fillStyle = rgba;
		} else
			ctx.fillStyle = "white";
			
		ctx.fillRect(i * pixelPerHour ,0,pixelPerHour,height + 4);

	}
	
	var p = max( keys(published))
	var q = (width / (pixelPerHour / 6));
	var to = min([ p,q  ]);

	ctx.beginPath();
	var base = 10;
	for ( var slot = 0 ; slot <= to; slot++ ) {
		var x = slot * 2;
		var n = published[slot] || 0;
		var y = height - offsetY - (Math.pow(n,1.6) * 2.5);

		if ( slot == 0 ) {
		//console.log("moveTo", x,y);
			ctx.moveTo(x, y);
		} else {
		//console.log("lineTo", x,y);
			ctx.lineTo(x, y);
		}
	}
	ctx.stroke();


}

var height = 100;
var width = document.body.clientWidth;
var pixelPerHour = 6;
	var offsetY = 10;

var ctx;

var now = new Date();

init();


var published = {};

function f(elements) {
//console.log(elements, keys(published).length, keys(published));
	elements.map( function (e) {
		parse(e);
	} );
	draw();
}

f([document]);

if ( AutoPagerize && AutoPagerize.addFilter ) {
	AutoPagerize.addFilter( f );
}

