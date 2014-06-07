// ==UserScript==
// @name          Currency Converter
// @namespace     http://lowcygier.pl
// @description   Currency Converter for lowcygier.pl website
// @include       http://lowcygier.pl/promocje/*
// @include       http://lowcygier.pl/bundle/*
// @include       http://lowcygier.pl/edycje-kolekcjonerskie/*
// @exclude       http://lowcygier.pl/forum/*
// @exclude       http://lowcygier.pl/sledzokazje/*
// @downloadURL   http://www.amistad18.net/Currency_Converter.user.js
// @updateURL     http://www.amistad18.net/Currency_Converter.user.js
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @require       http://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.0/jquery.cookie.min.js
// @icon          http://www.amistad18.net/lowcy_logo.png
// @grant         none
// @version       1.7.4
// ==/UserScript==

// author         amistad18
// contributors   Bruner, rob006, Murkee
// bug hunters    freqsize, Zodiac, taniec_chochola, MDA, Rerdrigar

jQuery(document).ready(function() {

	var convert_to_pln = function( usd_pln, eur_pln, gbp_pln, brl_pln ) {

		jQuery.fn.convert_temp = function() {
			var content = jQuery(this).html();
			var content_object = jQuery(this);
			var rm_bad_strong = content.replace(/<\/strong><strong>/g, "");
			var content = rm_bad_strong;
			content_object.html(rm_bad_strong);
			if (content.indexOf("R$") >= 0){
				var pattern = /((\d+\.\d{2}R\$)|(\d+\,\d{2}R\$)|(R\$\d+\.\d{2})|(R\$\d+\,\d{2})|(\d+R\$)|(R\$\d+))+/g;
				var matches = content.match(pattern);
				if(matches != null){
					matches.forEach(function(match){
						var number = match.replace("R$", "");
						var price = number.replace(",", ".");
						var price = parseFloat(price);
						var converted = price * brl_pln;
						var rounded = converted.toFixed(2);
						var pln_price = rounded.replace(".", ",");
						var correct_price = number.replace(".", ",");
						content = content.replace(match, "<span>R\$</span>"+correct_price+"&nbsp;<span class=\"convert_price\">("+pln_price+"zł)</span>");
					});
					content_object.html(content);
				}
			}
			if (content.indexOf("$") >= 0){
				var pattern = /((\d+\.\d{2}(?!R)\$)|(\d+\,\d{2}(?!R)\$)|((?!R)\$\d+\.\d{2})|((?!R)\$\d+\,\d{2})|(\d+(?!R)\$)|((?!R)\$\d+))+/g;
				var matches = content.match(pattern);
				if(matches != null){
					matches.forEach(function(match){
						var number = match.replace("$", "");
						var price = number.replace(",", ".");
						var price = parseFloat(price);
						var converted = price * usd_pln;
						var rounded = converted.toFixed(2);
						var pln_price = rounded.replace(".", ",");
						var correct_price = number.replace(",", ".");
						content = content.replace(match, "<span>$</span>"+correct_price+"&nbsp;<span class=\"convert_price\">("+pln_price+"zł)</span>");
					});
					content_object.html(content);
				}
			}
			if (content.indexOf("€") >= 0){
				var pattern = /((\d+\.\d{2}\€)|(\d+\,\d{2}\€)|(\€\d+\.\d{2})|(\€\d+\,\d{2})|(\d+\€)|(\€\d+))+/g;
				var matches = content.match(pattern);
				if(matches != null){
					matches.forEach(function(match){
						var number = match.replace("€", "");
						var price = number.replace(",", ".");
						var price = parseFloat(price);
						var converted = price * eur_pln;
						var rounded = converted.toFixed(2);
						var pln_price = rounded.replace(".", ",");
						var correct_price = number.replace(".", ",");
						content = content.replace(match, correct_price+"<span>€</span>&nbsp;<span class=\"convert_price\">("+pln_price+"zł)</span>");
					});
					content_object.html(content);
				}
			}
			if (content.indexOf("£") >= 0){
				var pattern = /((\d+\.\d{2}\£)|(\d+\,\d{2}\£)|(\£\d+\.\d{2})|(\£\d+\,\d{2})|(\d+\£)|(\£\d+))+/g;
				var matches = content.match(pattern);
				if(matches != null){
					matches.forEach(function(match){
						var number = match.replace("£", "");
						var price = number.replace(",", ".");
						var price = parseFloat(price);
						var converted = price * gbp_pln;
						var rounded = converted.toFixed(2);
						var pln_price = rounded.replace(".", ",");
						var correct_price = number.replace(",", ".");
						content = content.replace(match, "<span>£</span>"+correct_price+"&nbsp;<span class=\"convert_price\">("+pln_price+"zł)</span>");
					});
					content_object.html(content);
				}
			}
		}

		jQuery(".single .entry-content").convert_temp();
	};

	var styles_convert_price = {
		"color": "rgb(0, 127, 0)",
		"font-size": "14px",
		"font-weight": "bold"
	};

	var browser_width = jQuery(window).width();

	if(browser_width != null && browser_width >= 1220){
		var styles_convert_to_pln = {
			"width": "105px",
			"height": "auto",
			"background": "none",
			"top": "0px",
			"left": "-112px",
			"display": "block",
			"position": "absolute"
		};
	} else {
		var styles_convert_to_pln = {
			"width": "105px",
			"height": "auto",
			"background": "none",
			"top": "50px",
			"right": "15px",
			"display": "block",
			"position": "absolute"
		};
	}

	var styles_convert_to_pln_trigger = {
		"width": "81px",
		"height": "18px",
		"background": "rgb(53, 60, 59)",
		"color": "rgb(255, 255, 255)",
		"font-size": "12px",
		"font-family": "Oswald",
		"text-align": "right",
		"text-transform": "uppercase",
		"padding": "5px 12px 4px",
		"cursor": "pointer",
		"display": "block"
	};

	var styles_convert_to_pln_load_gif = {
		"width": "1px",
		"height": "1px",
		"background": "url('http://imgslot.com/upload/big/2013/12/21/52b5a9b68856c.gif') no-repeat",
		"top": "0px",
		"right": "0px",
		"padding": "0px",
		"margin": "0px",
		"display": "block",
		"position": "absolute"
	};

	var styles_convert_to_pln_show_btn = {
		"width": "auto",
		"height": "auto",
		"background": "rgb(53, 60, 59)",
		"text-shadow": "0px 2px 0px rgb(0, 0, 0)",
		"color": "rgb(255, 255, 255)",
		"font-size": "29px",
		"font-family": "calibri",
		"font-weight": "bold",
		"padding": "3px 7px 6px",
		"top": "0px",
		"right": "0px",
		"cursor": "pointer",
		"display": "none",
		"position": "absolute"
	};

	var styles_convert_to_pln_loading = {
		"width": "16px",
		"height": "16px",
		"top": "5px",
		"right": "110px",
		"display": "block",
		"position": "absolute"
	};

	var styles_convert_to_pln_curr_table = {
		"background": "rgb(255, 255, 255)",
		"color": "rgb(53, 60, 59)",
		"font-size": "16px",
		"font-family": "calibri",
		"font-weight": "bold",
		"text-align": "right",
		"padding": "5px 8px 5px",
		"display": "block"
	};

	var styles_cookie_test = {
		"top": "32px",
		"left": "4px",
		"position": "absolute"
	};

	jQuery(".single .entry").append("<div id='convert_to_pln'></div>");
	jQuery('#convert_to_pln').css(styles_convert_to_pln);
	jQuery(".single #convert_to_pln").append("<div id='convert_to_pln_trigger'>Przelicz na PLN</div>");
	jQuery('#convert_to_pln_trigger').css(styles_convert_to_pln_trigger);
	jQuery(".single #convert_to_pln").append("<div id='convert_to_pln_load_gif'></div>");
	jQuery('#convert_to_pln_load_gif').css(styles_convert_to_pln_load_gif);
	jQuery(".single #convert_to_pln").append("<div id='convert_to_pln_show_btn'>+</div>");
	jQuery('#convert_to_pln_show_btn').css(styles_convert_to_pln_show_btn);

	jQuery('.single #convert_to_pln_show_btn').click(function(){
		jQuery('#convert_to_pln_show_btn').hide();
		jQuery('#convert_to_pln_curr_table').show();
		jQuery('#convert_to_pln_trigger').show();
		jQuery('#cookie_test').show();
	});

	jQuery('.single #convert_to_pln_trigger').click(function(){
		if ('undefined' !== typeof convert_to_pln_loading_fadeOut) { clearTimeout(convert_to_pln_loading_fadeOut); }
		if ('undefined' !== typeof convert_to_pln_cookie_fadeOut) {	clearTimeout(convert_to_pln_cookie_fadeOut); }
		if ('undefined' !== typeof convert_to_pln_curr_table_fadeOut) {	clearTimeout(convert_to_pln_curr_table_fadeOut); }
		if ('undefined' !== typeof convert_to_pln_trigger_fadeOut) { clearTimeout(convert_to_pln_trigger_fadeOut); }
		if ('undefined' !== typeof convert_to_pln_show_btn_fadeIn) { clearTimeout(convert_to_pln_show_btn_fadeIn); }
		if (jQuery('#convert_to_pln_loading').length == 0 ) {
			jQuery(".single #convert_to_pln").append("<div id='convert_to_pln_loading'><img src=\"http://imgslot.com/upload/big/2013/12/21/52b5a9b68856c.gif\" alt=\"loading\" /></div>");
			jQuery('#convert_to_pln_loading').css(styles_convert_to_pln_loading);
		} else {
			jQuery('#convert_to_pln_loading').show();
		}
		if (jQuery('#cookie_test').length != 0 ) {
			jQuery( "#cookie_test" ).remove();
		}
		jQuery.cookie.defaults = { path: '/', expires: 1 };
		if(jQuery.cookie('usd_pln') == undefined || jQuery.cookie('eur_pln') == undefined || jQuery.cookie('gbp_pln') == undefined || jQuery.cookie('brl_pln') == undefined) {
			jQuery.removeCookie('usd_pln');
			jQuery.removeCookie('eur_pln');
			jQuery.removeCookie('gbp_pln');
			jQuery.removeCookie('brl_pln');
			jQuery.when(
				jQuery.get("http://rate-exchange.appspot.com/currency", { "from": "USD", "to": "PLN" }, function () {}, 'jsonp'),
				jQuery.get("http://rate-exchange.appspot.com/currency", { "from": "EUR", "to": "PLN" }, function () {}, 'jsonp'),
				jQuery.get("http://rate-exchange.appspot.com/currency", { "from": "GBP", "to": "PLN" }, function () {}, 'jsonp'),
				jQuery.get("http://rate-exchange.appspot.com/currency", { "from": "BRL", "to": "PLN" }, function () {}, 'jsonp')
			)
			.done(function( usd, eur, gbp, brl ) {
				var usd_pln = usd[0].rate;
				var eur_pln = eur[0].rate;
				var gbp_pln = gbp[0].rate;
				var brl_pln = brl[0].rate;
				jQuery.cookie('usd_pln', usd_pln);
				jQuery.cookie('eur_pln', eur_pln);
				jQuery.cookie('gbp_pln', gbp_pln);
				jQuery.cookie('brl_pln', brl_pln);
				convert_to_pln( usd_pln, eur_pln, gbp_pln, brl_pln );
				if (jQuery('#convert_to_pln_curr_table').length == 0 ) {
					jQuery(".single #convert_to_pln").append("<div id='convert_to_pln_curr_table'>$: "+usd_pln+"<br />€: "+eur_pln+"<br />£: "+gbp_pln+"<br />R$: "+brl_pln+"</div>");
				}
			})
			.fail(function() {
				var usd_pln = 3.04072;
				var eur_pln = 4.15813;
				var gbp_pln = 4.96986;
				var brl_pln = 1.27544;
				convert_to_pln( usd_pln, eur_pln, gbp_pln, brl_pln );
				if (jQuery('#convert_to_pln_curr_table').length == 0 ) {
					jQuery(".single #convert_to_pln").append("<div id='convert_to_pln_curr_table'>$: "+usd_pln+"<br />€: "+eur_pln+"<br />£: "+gbp_pln+"<br />R$: "+brl_pln+"</div>");
				}
			})
			.always(function() {
				jQuery(".single #convert_to_pln").append("<div id='cookie_test'><img src=\"http://ImgSlot.com/upload/big/2013/12/28/52beaae092e92.png\" alt=\"\" /></div>");
				jQuery('#cookie_test').css(styles_cookie_test);
				jQuery('#convert_to_pln_curr_table').show();
				jQuery('#convert_to_pln_curr_table').css(styles_convert_to_pln_curr_table);
				jQuery('.convert_price').css(styles_convert_price);
				convert_to_pln_loading_fadeOut = setTimeout(function() { jQuery("#convert_to_pln_loading").fadeOut(); }, 250);
			});
		} else {
			var usd_pln = jQuery.cookie('usd_pln');
			var eur_pln = jQuery.cookie('eur_pln');
			var gbp_pln = jQuery.cookie('gbp_pln');
			var brl_pln = jQuery.cookie('brl_pln');
			if (jQuery('#convert_to_pln_curr_table').length == 0 ) {
				jQuery(".single #convert_to_pln").append("<div id='convert_to_pln_curr_table'>$: "+usd_pln+"<br />€: "+eur_pln+"<br />£: "+gbp_pln+"<br />R$: "+brl_pln+"</div>");
			}
			jQuery(".single #convert_to_pln").append("<div id='cookie_test'><img src=\"http://ImgSlot.com/upload/big/2013/12/28/52beaae12620e.png\" alt=\"\" /></div>");
			jQuery('#cookie_test').css(styles_cookie_test);
			convert_to_pln( usd_pln, eur_pln, gbp_pln, brl_pln );
			jQuery('#convert_to_pln_curr_table').show();
			jQuery('#convert_to_pln_curr_table').css(styles_convert_to_pln_curr_table);
			jQuery('.convert_price').css(styles_convert_price);
			convert_to_pln_loading_fadeOut = setTimeout(function() { jQuery("#convert_to_pln_loading").fadeOut(); }, 250);
		}
		convert_to_pln_cookie_fadeOut = setTimeout(function() { jQuery("#cookie_test").fadeOut(); }, 5000);
		convert_to_pln_curr_table_fadeOut = setTimeout(function() { jQuery("#convert_to_pln_curr_table").fadeOut(); }, 5000);
		convert_to_pln_trigger_fadeOut = setTimeout(function() { jQuery("#convert_to_pln_trigger").fadeOut(); }, 6000);
		convert_to_pln_show_btn_fadeIn = setTimeout(function() { jQuery("#convert_to_pln_show_btn").fadeIn(); }, 6000);
	});
});