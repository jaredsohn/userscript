// ==UserScript==
// @name           Neopets - SSW Sniperspace
// @description    Adds a link to open the SSW in its own window. Added highlighting upon hover of the search field for ease of use
// @include        http://www.neopets.com/*
// @match          http://www.neopets.com/*
// ==/UserScript==

if ( window.location.pathname == "/ssw-popout" && document.title != "SSW" ) {
	/* If we're on the popout page and it hasn't been replaced, we need to replace it. */
	document.open();
	/* Overwrite the Neopets 404 page */
	document.write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">'+
	'<html>'+
	'<head>'+
	'<title>SSW</title>'+
	'<script src="http://images.neopets.com/js/jquery-1.7.1.min.js" type="text/javascript"></script>'+
	'<script src="http://images.neopets.com/js/jquery-ui-1.8.17.min.js" type="text/javascript"></script>'+
	'<script src="http://images.neopets.com/js/jquery.ui-1.8.23/ui/jquery.ui.widget.js"></script>'+
	'<script src="http://images.neopets.com/js/jquery.ui-1.8.23/ui/jquery.ui.widget.js"></script>'+
	'<script src="http://images.neopets.com/js/jquery.ui-1.8.23/ui/jquery.ui.mouse.js"></script>'+
	'<script src="http://images.neopets.com/js/jquery.ui-1.8.23/ui/jquery.ui.sortable.js"></script>'+
	'<script id="js-browserdetect" type="text/javascript" language="JavaScript" src="http://images.neopets.com/js/getbrowser.js?v=1"></script>'+
	'<link rel=StyleSheet href="http://images.neopets.com/premium/menu/template.css?v=3" type="text/css">'+
	'<link rel="stylesheet" type="text/css" href="http://images.neopets.com/css/default.css?v=4">'+
	/* Include Neopets scripts and styles above, and add a little extra css to make it fit how I want. */
	'<style type="text/css">'+
	'#outer-container, #ssw_tabs_pane {'+
	'	margin-left: -121px;'+
	'	margin-top: -10px;'+
	'}'+
	'#shopkeeper {'+
	'	display: none;'+
	'}'+
	'body {'+
	'	overflow: hidden;'+
	'}'+
	'</style>'+
	'</head>'+
	'<body>'+
	/* Nearly all of the rest of the new page is directly from the normal SSW. */
	'<ul id="footer_menu">'+
	'				<li id="sswmenu" style=\'z-index: 10110;\'>'+
	'				<ul class="sswdrop">'+
	'<script language="JavaScript">'+
	'		var NS_SSW = NS_SSW || {};'+
	'		NS_SSW.submitLock = false;'+
	'		NS_SSW.handleSubmit = function(e) {'+
	'			e.preventDefault();'+
	'			if (NS_SSW.submitLock) return;'+
	'			NS_SSW.submitLock = true;'+
	'			var $el = $(e.target);'+
	'			var $form = $(\'#sswsearch\');'+
	''+
	'			search_str = $(\'#searchstr\').val();'+
	'			$(\':input[name="shopwizard"]\').val(search_str); /* stuff this value into form submit input element. */'+
	''+
	'			$(\'#results\').html("<div style=\'width:100%;height:100%;\'><img src=\'http://images.neopets.com/games/pages/Z8AGM.gif\' alt=\'Loading...\' /></div>");'+
	''+
	'			search_str = $(\'#searchstr\').val();'+
	'			$(\':input[name="shopwizard"]\').val(search_str); /* stuff this value into form submit input element. */'+
	''+
	'			radios = $("#area input[type=\'radio\']");'+
	'			checkedRadioInput = radios.filter(":checked");'+
	'			/*context = $("input[name=\'area\']:checked").val() */'+
	'			ssw_shop_value = $(checkedRadioInput).attr(\'value\');'+
	'			if (ssw_shop_value == \'shop\') {'+
	'				context = 0;'+
	'			} else {'+
	'				context = 1;'+
	'			}'+
	'			context = ( $(checkedRadioInput).attr(\'value\') == \'shop\' ? 0 : 1);'+
	'		'+
	'			$(\':input[name="context"]\').val(context); /* 0=shop 1=gallery */'+
	'			'+
	'			/* @todo pull price only checkbox */'+
	'			priceLimited = $(\'input#price-limited:checked\').val();'+
	'			if (priceLimited == "price-limited") {'+
	'				priceLimited = 1;'+
	'			} else {'+
	'				priceLimited = 0;'+
	'			}'+
	'			$(\':input[name="priceonly"]\').val(priceLimited);'+
	''+
	'			/* @todo pull price and price-max */'+
	'			minPrice = $(\'input#price\').val();'+
	'			maxPrice = $(\'input#price-max\').val();'+
	'			$(\':input[name="max_price"]\').val(maxPrice);'+
	'			$(\':input[name="min_price"]\').val(minPrice);'+
	''+
	'			ssw_criteria_obj = $(\'#search-form #ssw-criteria\');'+
	'			ssw_criteria = \'containing\';'+
	'			if (ssw_criteria_obj.length) {'+
	'				ssw_criteria = ssw_criteria_obj.val();'+
	'			}'+
	'			if (ssw_criteria != \'containing\') {'+
	'				$(\':input[name="partial"]\').val(0);'+
	'			} else {'+
	'				$(\':input[name="partial"]\').val(1);'+
	'			}'+
	'		'+
	'			$.ajax({'+
	'				type: \'GET\','+
	'				url: \'http://www.neopets.com/shops/ssw/ssw_query.php\','+
	'				dataType: \'json\','+
	'				data: { '+
	'					q: search_str,'+
	'					priceOnly: $form.find(\':input[name="priceonly"]\').val(),'+
	'					context: $form.find(\':input[name="context"]\').val(),'+
	'					partial: $form.find(\':input[name="partial"]\').val(),'+
	'					min_price: $form.find(\':input[name="min_price"]\').val(),'+
	'					max_price: $form.find(\':input[name="max_price"]\').val(),'+
	'					lang: "en",'+
	'					json: "1",'+
	'					cb: "534614"'+
	'				},'+
	'				success: function(sswob) {'+
	'					/*console.log(sswob); */'+
	'					var searchingFor;'+
	'					search_str = $(\'#sswsearch\').find(\':input[name="shopwizard"]\').val();'+
	'					$(\'#results\').html(sswob[\'html\']);'+
	'					searchingFor = "Searching for \'" + search_str + "\', matching \'" + sswob[\'req\'][\'item_name\'] + "\'...";'+
	'					/*searchingFor = searchingFor.replace(/%1\\$s/, search_str);'+
	'					searchingFor = searchingFor.replace(/%2\\$s/, sswob[\'req\'][\'item_name\']);*/'+
	'					$(\'#search_for\').html(searchingFor);'+
	'					$(\':input[name="shopwizard"]\').val( sswob[\'req\'][\'search\']);'+
	'					$(\':input[name="sw_type"]\').val( sswob[\'req\'][\'search\']);'+
	'					$(\':input[name="ssw-criteria"]\').val( sswob[\'req\'][\'criteria\']);'+
	'					$(\':input[name="min_price"]\').val( sswob[\'req\'][\'minp\']);'+
	'					$(\':input[name="max_price"]\').val( sswob[\'req\'][\'maxp\']);'+
	'					errorMsg = \'\' + sswob[\'data\'][\'error\'];'+
	'					$(\'ssw-tabs-2 div#sswerror\').html(errorMsg);'+
	'				},'+
	'				complete: function() {'+
	'					NS_SSW.submitLock = false;'+
	'				}'+
	''+
	'			});'+
	''+
	'			if($(".tabs").length > 0) { '+
	'				alert("Error in jquery handleSubmit function: The tabs module is not loaded and should have been.");'+
	'			} else {'+
	'			  $tabs = $(\'#ssw-tabs\').tabs(); '+
	'				$tabs.tabs(\'select\',1);'+
	'			}'+
	'			'+
	'		};  '+
	'		'+
	'		$(function() {'+
	'			$("input[name=searchstr]").on("mouseenter mouseleave", function() {' +
	'			    $(this).focus();' +
	'			    $(this).select();' +
	'			});' +
	'			var $tabs = \'\';'+
	'	'+
	'			if($(".tabs").length > 0) {'+
	'				alert("Error in jquery on ready function: The tabs module is not loaded and should have been.");'+
	'			}'+
	'			/*$tabs = $(\'#ssw-tabs\').tabs(); */'+
	'			/*$tabs.tabs(\'select\',0); */'+
	''+
	'			$(\'div#button-search\').bind(\'click\', NS_SSW.handleSubmit); '+
	'			$(\'#button-resubmit\').bind(\'click\', NS_SSW.handleSubmit);'+
	'			$(document).keyup(function(e) {'+
	'				if(e.keyCode == 13) {'+
	'					NS_SSW.handleSubmit(e);'+
	'				}'+
	'			});'+
	'			$(\'#button-new-search\').bind(\'click\', function() {'+
	'			    $(\'#ssw-tabs\').tabs(\'select\',0);'+
	'			});'+
	''+
	'			/* Initial search on ready... */'+
	'			search_str = $(\'#searchstr\').val();'+
	'			/* alert(\'finding search string on search button press: \'+search_str); */'+
	'			$(\':input[name="shopwizard"]\').val(search_str); /* stuff this value into form submit input element. */'+
	''+
	'			$("#area ").change(function () {'+
	'				var checked_value = $(".status:checked").val();'+
	'			});'+
	'		});'+
	'</script>'+
	''+
	'<link rel="StyleSheet" href="http://images.neopets.com/premium/menu/ssw_pane.css?v=20120618" type="text/css">'+
	''+
	'<div id="outer-container" class="mod-container">'+
	'	<div class="mod-header-left"></div>'+
	'	<div class="mod-header-right"></div>'+
	'	<div id="close-button" style="visibility: hidden;" class="close-button"></div>'+
	''+
	'	<div class="mod-c1">'+
	'		<div class="mod-c2">'+
	'			<div class="mod-c3">'+
	'				<div class="mod-content">'+
	'					<div id="inner-container" class="inner-container">'+
	'						<div class="mod-header-left"></div>'+
	'						<div class="mod-header-right"></div>'+
	'						<div class="mod-c1">'+
	'							<div class="mod-c2">'+
	'								<div class="mod-c3">'+
	'									<div class="inner-content"><!-- Only purpose of this is to pad the inner box vertially. --></div>'+
	'							</div>'+
	'						</div>'+
	'						<br class="clear">'+
	'						</div>'+
	'						<div class="mod-footer-left"></div>'+
	'						<div class="mod-footer-right"></div>	'+
	'				</div>'+
	'			</div>'+
	'		</div>'+
	'		'+
	'				<br class="clear">'+
	'		'+
	'		</div>'+
	'	</div>'+
	''+
	'	<div id="ssw_tabs_pane" style="display: block;">'+
	''+
	'				'+
	'		<div id="ssw-tabs">'+
	'			<ul id="tabs-header">'+
	'				<li><a href="#ssw-tabs-1">Search</a></li>'+
	'				<li><a href="#ssw-tabs-2">Results</a></li>'+
	'				<li><a href="#ssw-tabs-3">Errors</a></li>'+
	'			</ul>'+
	'			<div id="ssw-tabs-1">'+
	'					<div id="intro">'+
	'						<p id="p1">Type in what you want to buy and I will search through<br>every single shop in the market at once to find you the best prices!</p>'+
	'						<p id="p2">Be forewarned... With so many shops to check, I tire rather easily.</p>'+
	'					</div>'+
	'					<br class="clear">'+
	'					<fieldset id="search-form" style="border: none;">'+
	'						<div id="left-container" style="width: 535px;">'+
	'														<div id="area" style="position: relative; float: right;">'+
	'								<span style="font-weight: bold; float: left;">Area</span><br>'+
	'								<span>'+
	'									<label for="area-input-shop" style="font-weight: normal; margin: auto; width:45px; float: left;">Shop:</label>'+
	'									<input type="radio" name="area" value="shop" tabindex="40" id="area-input-shop" checked="checked">'+
	'									<label for="area-input-gallery" style="font-weight: normal; margin: auto; width: 40px; float: left;">Gallery:</label>'+
	'									<input type="radio" name="area" value="gallery" tabindex="50" id="area-input-gallery">'+
	'								</span>'+
	'							</div>'+
	'							<p>'+
	'								<label for="searchstr">What are you looking for?</label>'+
	'								<input name="searchstr" type="text" id="searchstr" class="textfield" value="" tabindex="10">'+
	'							</p>'+
	'							<p>'+
	'								<label for="ssw-criteria">Search Items</label>'+
	'								<select name="ssw-criteria" id="ssw-criteria" tabindex="20">'+
	'									<option value="containing">containing my phrase</option>'+
	'									<option value="exact">identical to my phrase</option>'+
	'								</select>'+
	'							</p>'+
	'							<div class="price-min-max">'+
	'								<div>'+
	'									<div style="margin-right: 25px; float: left;">Min</div>'+
	'									<div style="float: left;">Max</div>'+
	'								</div>'+
	'							</div>'+
	'							<p style="margin-top: 2px; clear: left;">'+
	'								<input name="price" type="text" id="price" class="textfield" tabindex="30">'+
	'								<label for="price">Price</label> - <input name="price-max" type="text" id="price-max" class="textfield" tabindex="35"> NP (optional)							</p>'+
	'							<p>'+
	'								<label for="price-limited">Price Only (limited)</label>'+
	'								<input type="checkbox" id="price-limited" value="price-limited" tabindex="37">'+
	'							</p>'+
	'													</div>'+
	'					</fieldset>'+
	'					<ul id="results_buttons">'+
	'						<li id="but3">'+
	'							<div id="button-search"></div>'+
	'						</li>'+
	'					</ul>'+
	'			</div>'+
	'			<div id="ssw-tabs-2">'+
	'				<div id="search_for"></div>'+
	'				<div id="results"></div>'+
	'							<br class="clear">'+
	'				<form id="sswsearch" method="POST" action="/shops/ssw/ssw_query.php">'+
	'					<input type="hidden" name="shopwizard" value="">'+
	'					<input type="hidden" name="sw_type" value="process_wizard">'+
	'					<input type="hidden" name="partial" value="1">'+
	'					<input type="hidden" name="min_price" value="0">'+
	'					<input type="hidden" name="priceonly" value="0">'+
	'					<input type="hidden" name="max_price" value="0">'+
	'					<input type="hidden" name="context" value="0">'+
	'					<input type="hidden" name="partial" value="1">'+
	'					<input type="hidden" name="link" value="/closet.phtml">'+
	'		'+
	'				<ul id="results_buttons">'+
	'					<li id="but1"><input type="submit" name="submit" value="" class="xbutton_up" id="button-resubmit"></li>'+
	'					<li id="but2"><input type="button" name="tryagain" value="" class="xbutton_up" id="button-new-search"></li>'+
	'				</ul>'+
	'				</form>'+
	'				<div id="sswerror"></div>'+
	'			</div>'+
	'			<div id="ssw-tabs-3">'+
	'				<div style="width:100%;height:100%;outline:3px grey solid;"></div>'+
	'			</div>'+
	'		</div>'+
	''+
	'	</div>'+
	'	<div id="shopkeeper"></div>'+
	'</div>'+
	''+
	''+
	''+
	'					</ul>'+
	'				</li>'+
	'</ul>'+
	''+
	''+
	'</body>'+
	'</html>');

	document.close();
} else {
	/* If not running on our page, add a popout link to the SSW */

	var p = document.createElement('p');
	var a = document.createElement('a');
	a.setAttribute('onclick', 'javascript: window.open("/ssw-popout", "SSWwindow", "height=284,width=612,status=0,toolbar=0,resizable=0,scrollbars=0,location=0,menubar=0,toolbar=0");');
	a.setAttribute('style', 'cursor: pointer;');
	p.setAttribute('style', 'width: 100%; text-align: center; clear: both;');
	a.textContent = "SSW Popout";

	p.appendChild(a);
    document.getElementById('area').appendChild(p);
}