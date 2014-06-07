// ==UserScript==
// @name		dynamicznyMikrob
// @namespace	mk.dev
// @description	Skrypt automatycznie klikający przycisk nowe wpisy
// @author		m4kb0l
// @version		1.0
// @grant		none
// @include		http://www.wykop.pl/mikroblog/*
// ==/UserScript==

(function dynamicznyMikrob() {

	if (window.top != window.self) { return; }

	function addJQuery(callback) {
		var script = document.createElement("script");
		script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
		script.addEventListener('load', function () {
			var script = document.createElement("script");
			script.textContent = "(" + callback.toString() + ")();";
			document.body.appendChild(script);
		}, false);
		document.body.appendChild(script);
	}
	
	function main() {
	
		var dm = {
			hasFocus: true,
			isEnqueued: false,
			target: null,
			lastRun: 0,
			MutationObserver: window.MutationObserver ||
							   window.WebKitMutationObserver || 
							   window.MozMutationObserver,
			show: function(el) {
				el.click();
			},	
			setTitle: function(n) {	
				if(!n) { return; }			
				var _title = document.title,
					t 	   = /\[\d+\]/,
					info   = '[' + n + '] ';
				
				if( t.test(_title) == false ) {
					document.title = info + _title;
				}
				else {
					document.title = _title.replace(t, info);
				}
			},
			resetTitle: function() {
				var _title = document.title;
				document.title = _title.replace(/\[\d+\]\s/, '');		
			},		
			count: function() {
				var counter = dm.target.find('span');		
				if(counter.length == 0) { return null; }			
				if(counter.text().toLowerCase() == 'nowy wpis') {
					return 1;
				}
				else {
					var n = counter.text().match(/\d+/g);
					if(n != null) {
						return n[0];
					}
					else { return null; }
				}
			},	
			mutation: function() {
				if ( new Date() - dm.lastRun > 500) {
					if (dm.hasFocus) {						
						dm.show( dm.target.children(0) );
						dm.lastRun = new Date();
					}
					else {
						dm.isEnqueued = true;						
						dm.setTitle( dm.count() );						
					}			
				}
			},		
			init: function() {				
				dm.target = $('.recentPlaceHolder');				
				$('head').append('<style>.recentPlaceHolder {display:none !important} #activities-stream { margin-top: 20px; }</style>');
				
				$(window).on({
					'blur': function() {
						dm.hasFocus = false;
						
					},
					'focus': function() {
						dm.hasFocus = true;
						if(dm.isEnqueued) {
							dm.show(dm.target.children(0));
							dm.isEnqueued = false;
							dm.resetTitle();
							
						}
						
					}
				});
				
				if (dm.MutationObserver) {
					var observer = new dm.MutationObserver(function() {
						dm.mutation();
					});
					
					observer.observe(dm.target.get(0), {
						childList: true,
						characterData: true,
						subtree: true
					});
				}			
			}
		}
		
		dm.init();
		
	}	
	
	if( typeof(jQuery) === "undefined") {		
		addJQuery( main ); 
	}
	else {		
		main();
	}
	
	
})();