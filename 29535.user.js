// ==UserScript==
        // @name        SA Forums: Auto-Update Forums in Background
        // @namespace   meta.ironi.st
        // @description Updates the thread-list pages when they are not in focus
        // @include     http://forums.somethingawful.com/forumdisplay.php?*
        // @include     http://forums.somethingawful.com/usercp.php
        // @include     http://forums.somethingawful.com/bookmarkthreads.ph*
        // @author      Nigglypuff
        // ==/UserScript==
        
        function whenLoaded(callback) {
        	(function () {
        		var testEl = document.querySelector('#debug');
        		if (testEl) callback();
        		else setTimeout(arguments.callee, 100);
        	})();
        };
        
        whenLoaded(function() {
        	function fetch(url, callback) {
        		var xhr = new XMLHttpRequest;
        		xhr.open('get', url);
        		xhr.onload = function () {
        			callback(xhr.responseText);
        		};
        		xhr.send(null);
        	};
        
        	function between(subject, start, end) {
        		return (subject.split(start)[1] || '').split(end)[0];
        	};
        
        	function log(message) {
        		console.log(message);
        		log.messages.push(new Date().toString().split(' ')[4] + ' : ' + message);
        		setTimeout(function () {
        			if (log.messages.length)
        				log.element.innerHTML = '<pre>' + log.messages.join('\n\n') + '</pre>';
        			log.messages = [];
        		}, 10);
        	};
        
        	log.messages = [];
        
        	log.element = document.getElementById('debug');
        
        
        	var fetcher = {
        		url: document.URL,
        		element: document.getElementById('forum'),
        		updateInterval: 1000,
        		requestInterval: 1000,
        		running: false,
        		content: null,
        		
        		start: function () {
        			log('starting fetcher.');
        			this.running = true;
        			
        			this.content = null;
        			
        			this.startUpdating();
        			
        			this.startRequesting();
        		},
        		
        		stop: function () {
        			log('stopping fetcher.');
        			this.running = false;
        		},
        		
        		updateElement: function () {
        			log('fetcher.updateElement() called');
        			log('typeof fetcher.content == ' + typeof fetcher.content);
        			
        			if (null === this.content)
        				return;
        				
        			log('there is data!!');
        				
        			this.element.innerHTML = this.content;
        			this.content = null;
        		},
        		
        		startUpdating: function () {
        			var me = this;
        			
        			(function () {
        				if (! me.running) return;
        				setTimeout(arguments.callee, me.updateInterval);
        				
        				me.updateElement();
        			})();
        		},
        		
        		startRequesting: function () {
        			var interval = this.requestInterval,
        				me = this;
        				
        			(function () {
        				if (! me.running) return;
        				
        				log('request loop ticked.');
        				
        				setTimeout(arguments.callee, interval);
        				interval *= 2;
        				
        				fetch(me.url, function (response) {
        					log('request returned!!!');
        					log('response.length == ' + response.length);
        					var content = between(response, FORUM_START, FORUM_END);
        					
        					me.content = content;
        				});
        			})();
        		}
        	};
        
        	// --
        
        	var FORUM_START = '<table id="forum" summary="Threads" class="threadlist ">',
        		FORUM_END = '</table>';
        
        
        	window.addEventListener('blur', function () {
        		log('blur event caught.');
        		fetcher.start();
        	}, false);
        
        	window.addEventListener('focus', function () {
        		log('focus event caught.');
        		fetcher.stop();
        	}, false);
        
        	log('update script loaded ok.');
        });