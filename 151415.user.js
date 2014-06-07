// ==UserScript==
// @name           Salesforce - Custom Objects Page Enhancements
// @description    allows to filter custom object list by package

// @author         Tobias Beer, OnCommerce GmbH
// @homepage       http://www.oncommerce.de
// @version        1.0
// @date           2012-11-01
// @license        (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/

// @namespace      SalesforceCustomObjects
// @include        https://*.salesforce.com/*CustomObjectsPage*
// @grant          none

// ==/UserScript==

// Add jQuery
var script = document.createElement('script');
script.src = '//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

// When jQuery is loaded
script.addEventListener('load', function(){ 
  jQuery = unsafeWindow['jQuery'];
  jQuery.noConflict();

	//The actual script
	(function($){
	  var p,pkgs = [],$sel,
			$where = $('.pbButton'),
	 		$objects = $('.pbBody tr:not(.headerRow)',$where.closest('.bPageBlock'));

	  if(!$where)return;
		$objects.each(function(){
			var $o = $(this),
				$i = $('.iconColumn',$o),
				pkg = $.trim($o.find('th').first().next().text());

			if(pkg && $.inArray(pkg,pkgs)<0){	
				pkgs.push(pkg);
			}
		});

		pkgs.sort();
		$sel = $('<select class="select-package"/>');
		$sel.appendTo($where).css({
			'margin-left':'5px'
		}).attr('title','Filter objects by package...');

		$('<option value=":all">All Objects</option>').appendTo($sel);
		$('<option value=":unpackaged">Unpackaged Objects</option>').appendTo($sel);
		$('<option value=":packaged">Packaged Objects</option>').appendTo($sel);
		for (p=0;p<pkgs.length;p++){
			$('<option value="' + pkgs[p] + '">Package: ' + pkgs[p] + '</option>').appendTo($sel);
		}
		
		$sel.change(function(ev){
			var ev = ev || window.event,
				$sel = $(this),
				v = $sel.val(),
				$objects = $('.pbBody tr:not(.headerRow)',$where.closest('.bPageBlock'));

			$objects.show();
			
			if(v!=':all'){
				$objects.each(function(){
					$o = $(this),
					pkg = $.trim($o.find('th').first().next().text());
					if(v == ':unpackaged'){
						if(pkg)$o.hide();
					} else if(v == ':packaged'){
						if(!pkg)$o.hide();
					} else {
						if(pkg != v)$o.hide();
					}
				});
			}
		});

	})(jQuery);

}, false);