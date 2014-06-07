// ==UserScript==
// @name           Ikariam Transport Resources Event Handler
// @namespace      Ikariam Transport Resources Event Handler
// @author         Martynius (http://userscripts.org/users/68307)
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://userscripts.org/users/68307
// @description    Event handler for Transport page (NOT A COMPLETE SCRIPT).
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @include        http://s*.ikariam.*/index.php?*view=transport*
// @exclude        http://support*.ikariam.*/*
// ==/UserScript==

function IkariamTransportResourcesHandler( callBackFn ) {
	this.goods	= {wood:0, wine:0, marble:0, glass:0, sulfur:0 };
	this.total	= 0;
	this.callback	= (typeof callBackFn == 'function'?callBackFn:undefined);
	this.dragging	= false;

	this.getWood		= function() { return this.goods.wood; };
	this.getWine		= function() { return this.goods.wine; };
	this.getMarble		= function() { return this.goods.marble; };
	this.getGlass		= function() { return this.goods.glass; };
	this.getSulfur		= function() { return this.goods.sulfur; };
	this.getTotal		= function() { return this.total; };
	this.delayDrag		= function() { this.changeResource( this.dragging.r, this.dragging.i.value ); };
	this.changeResource	= function( resource, input ) {
			var value = parseInt( input );
			if ( !isNaN( value ) ) {
				this.goods[resource] = value;
				this.total = 0;
				for ( var i in this.goods ) this.total += this.goods[i];
				if ( this.callback !== undefined )
					this.callback( this );
			}
		};

	var that = this;	
	for ( var r in this.goods ) {
		$("li." + r).each( function() {
			var resource = r;
			var input = $("input.textfield", this)[0];
			$("div.sliderinput", this).each( function() {
				$("div.sliderthumb", this)
					.mousedown(	function() { that.dragging = {r:resource, i:input}; });
				$(this)	.click( function() { that.changeResource( resource, input.value ); });
				$("a", this)
					.click( function() { that.changeResource( resource, input.value ); });
			});
			$("input.textfield", this)
				.keyup( function() { that.changeResource( resource, input.value ); });
		});
	}

	$("body").mousemove( function() {
			if (that.dragging !== false)
				setTimeout( function() { that.delayDrag.call( that ) }, 5 );
		})
		.mouseup   ( function() { that.dragging = false; });
}

//new IkariamTransportResourcesHandler( function( handler ) { GM_log( "Total: " + handler.getTotal() + ", Wood: " + handler.getWood() + ", Wine: " + handler.getWine() + ", Marble: " + handler.getMarble() + ", Glass: " + handler.getGlass() + ", Sulfur: " + handler.getSulfur() ); } );