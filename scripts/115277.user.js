// ==UserScript==
// @name			 RIT webman project search
// @namespace	harry
// @version		0.2
// @include		https://webman.rit.edu/webman/?action=sitelist

// ==/UserScript==



// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

// the guts of this userscript
function main() {
	$(document).ready(function() {
		var mainCon = $('#maincontent'),
			projectsTable = $('#sitelist'),
			thead = $('<thead></thead>'),
            filterCon, filterLabel, filterInput, matchesCon,
			recentSites, recentSitesArr, recentSiteRows = [],
            recentSitesCon,
            formatTimer;
		
		matchesCon = $('<div id="filter-matches"></div>').css({'margin':'15px 0', 'display':'none'});
		mainCon.prepend(matchesCon);

		// create the filter container
		filterCon = $('<div></div>').css({'margin-bottom':'10px'});
		// create the input filter
		filterInput = $('<input type="text" name="filter" placeholder="find a project" />')
			.attr('id', 'filter-projects')
			.css({'width':'300px', 'height':'20px', 'padding':'2px 4px', 'outline':'none', 'border-radius':'4px'});
		
		filterCon.append(filterInput);
		mainCon.prepend(filterCon);


		
		thead.append(projectsTable.find('tr:first')).prependTo(projectsTable);
		
		/*
		 * LiveFilter - jQuery plugin 1.3
		 *
		 * Copyright (c) 2010 Harry Groover
		 *
		 * Based on LiveFilter by Mike Merritt:
		 * http://www.mikemerritt.me/blog/tag/jquery-plugins/
		 *
		 */
		(function(a){a.fn.liveFilter=function(e,c){var h={effect:"basic",speed:400};var c=a.extend(h,c);var g=this;var i;if(e.is("ul")){i="li"}else{if(e.is("ol")){i="li"}else{if(e.is("table")){i="tbody tr"}}}var d;var b;var f;g.keyup(function(){f=g.val();d=e.find(i+':not(:Contains("'+f+'"))');b=e.find(i+':Contains("'+f+'")');if(c.effect=="basic"){d.hide();b.show()}else{if(c.effect=="slide"){d.slideUp(c.speed);b.slideDown(c.speed)}else{if(c.effect=="fade"){d.fadeOut(c.speed);b.fadeIn(c.speed)}}}});jQuery.expr[":"].Contains=function(l,n,j){var o=a.trim(j[3].replace(/\s+/g," ")).split(" ");var k=o.length>0;a(o).each(function(){if(jQuery(l).text().toLowerCase().indexOf(this.toLowerCase())<0){k=false}});return k};return this}})(jQuery);

		filterInput.liveFilter(projectsTable);
		filterInput.focus().on('keyup', function(e) {
            var firstTr = projectsTable.children('tbody').children().filter(':visible').first(),
                firstLink;
			if (e.keyCode == 13 && firstTr.length > 0) {
                firstLink = firstTr.find('a:first-child');
                firstLink.trigger('click');
                window.location = firstLink.attr('href');
			}
		});
        
        
        function inArray(needle, haystack) {
            var i = haystack.length;
            
            while (i--) {
                if (haystack[i] == needle) return true;
            }
            
            return false;
        }
        function uniqueArray(arr) {
            var u = {}, a = [];
            for (var i = 0, l = arr.length; i < l; ++i) {
                if (!u.hasOwnProperty(arr[i])) {
                    a.push(arr[i]);
                    u[arr[i]] = 1;
                }
            }
            return a;
        }
        
        /*!
         * jQuery Cookie Plugin v1.3
         * https://github.com/carhartl/jquery-cookie
         *
         * Copyright 2011, Klaus Hartl
         * Dual licensed under the MIT or GPL Version 2 licenses.
         * http://www.opensource.org/licenses/mit-license.php
         * http://www.opensource.org/licenses/GPL-2.0
         */
        (function(e,h,k){function l(b){return b}function m(b){return decodeURIComponent(b.replace(n," "))}var n=/\+/g,d=e.cookie=function(b,c,a){if(c!==k){a=e.extend({},d.defaults,a);null===c&&(a.expires=-1);if("number"===typeof a.expires){var f=a.expires,g=a.expires=new Date;g.setDate(g.getDate()+f)}c=d.json?JSON.stringify(c):String(c);return h.cookie=[encodeURIComponent(b),"=",d.raw?c:encodeURIComponent(c),a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+a.path:"",a.domain?"; domain="+
        a.domain:"",a.secure?"; secure":""].join("")}c=d.raw?l:m;a=h.cookie.split("; ");f=0;for(g=a.length;f<g;f++){var j=a[f].split("=");if(c(j.shift())===b)return b=c(j.join("=")),d.json?JSON.parse(b):b}return null};d.defaults={};e.removeCookie=function(b,c){return null!==e.cookie(b)?(e.cookie(b,null,c),!0):!1}})(jQuery,document);

        
        recentSites = $.cookie('webman_recent_sites');
        
        if (recentSites) {
            recentSitesArr = recentSites.split(',');
            
            projectsTable.children('tbody').children().each(function() {
                var me = $(this),
                    td = me.children(':eq(3)'),
                    username = td.text();
                
                if (inArray(username, recentSitesArr)) {
                    var clone = me.clone();
                    clone.append('<td><a href="#" class="remove" data-id="'+username+'">remove</a></td>');
                    recentSiteRows.push(clone);
                }
            });
        }
        
        if (recentSiteRows.length > 0) {
	        recentSitesCon = $('<table cellspacing="1" id="recent-sites"></table>').css({'margin':'15px 0'});
            recentSitesCon.append(recentSiteRows);
            mainCon.prepend(recentSitesCon).prepend('<h3>Recent Sites</h3>');
            
            recentSitesCon.find('a.remove').on('click', function(e) {
				var me = $(this),
                	username = me.data('id'),
                    index;
                
                e.preventDefault(); 
                
               	arr = recentSites.split(',');
                index = $.inArray(username, arr);
                arr.splice(index, 1);
                recentSites = arr.join(',');
                $.cookie('webman_recent_sites', recentSites, { expires: 365 });
                
				me.closest('tr').remove();
            });
        }

        projectsTable.children('tbody').children().find('a').on('click', function(e) {
            var username = $(this).closest('tr').children(':eq(3)').text(),
                arr = [];
            
            if (recentSites) {
                arr = recentSites.split(',');
            }
            
            arr.push(username);
            arr = uniqueArray(arr);

            $.cookie('webman_recent_sites', arr.join(','), { expires: 365 });
        });
		/*
		filterInput.bind('keyup', function(e) {
			if ($(this).val() != '') {
				clearTimeout(formatTimer);
				formatTimer = setTimeout(function() {
					var matches = projectsTable.find('tbody').find('tr:visible');
					if (matches.length <= 8) {
						console.log(matches.length);
						addMatches(matches);
					}
				}, 100);
			}
		});
		
		function addMatches(trs) {
			var matchCon = $('<div></div>').css({'width':'25%', 'float':'left'}),
				matchCon1 = $('<a></a>').css({'margin':'7px 15px 7px 0', 'padding':'5px', 'border':'1px solid #ccc', 'display':'block', 'background-color':'#f6f6f6', 'color':'#444'}),
				clone;
			
			matchCon1.append($('<div class="img"><img/></div>').css({'width':'60px', 'height':'60px', 'vertical-align':'middle', 'margin-right':'10px', 'background-color':'#ddd', 'float':'left', 'border':'1px solid #bbb'}));
			matchCon1.append($('<h2></h2>').css({'font-size':'12px', 'padding-top':'0px'}));
			//matchCon1.append($('<div class="details"></div>'));
			matchCon1.append($('<div style="clear:both"></div>'));
			matchCon.append(matchCon1);
			matchesCon.empty();
			if (trs.length > 0) {
				trs.each(function() {
					var tr = $(this),
						link = $(tr.children('td:nth-child(1)').html());
					clone = matchCon.clone();
					clone.find('h2').text(link.text());
					clone.find('a').attr('href', link.attr('href'));
					clone.find('img').error(function() {
						$(this).css('visibility', 'hidden');
					}).attr('src', 'http://www-staging.rit.edu/'+tr.children('td:nth-child(3)').text()+'/webman-logo.png');
					//clone.find('.details').html('<p>'+tr.children('td:nth-child(3)').text()+'</p>');
					matchesCon.append(clone)
				});
				matchesCon.show();
			} else {
				matchesCon.hide();
			}
		}
		*/

	});
}

// load jQuery and execute the main function
addJQuery(main);