// ==UserScript== 
// @name          e621 AJAX Fix
// @version       1.0.1
// @description   Fixes internal server errors caused by a massive amount of concurrent requests
// @author        Lizardite

// @namespace     e621
// @run-at        document-idle
// @include       http://e621.net/post
// @include       https://e621.net/post
// @include       http://e621.net/post/*
// @include       https://e621.net/post/*
// @match         http://e621.net/post
// @match         https://e621.net/post
// @match         http://e621.net/post/*
// @match         https://e621.net/post/*
// ==/UserScript== 

var h = document.createElement("script");

h.innerHTML = "(" + function() {
	var schedule = [];
	var running = false;

	var startRequest = function() {
		new Ajax.Request('/post/update.json', {
			parameters: schedule[0],

			onComplete: function(xhr) {
				if (xhr.status >= 500 && xhr.status <= 599) {
					error('Internal Server Error. Waiting 10 seconds...');
					setTimeout(startRequest, 10000);
				} else {
					Post.notice_update("dec");

					if (xhr.responseJSON.success) {
						Post.register(xhr.responseJSON.post);
					} else {
						error('Error: ' + resp.reason);
					}

					schedule = schedule.slice(1);
					if (schedule.length > 0) {
						startRequest();
					} else {
						running = false;
					}
				}
			}
		});
	}

	var injectFunction = function() {
		if (window.Post && Post.update) {
			Post.update = function(postId, params) {
				params.id = postId;
				schedule.push(params);

				Post.notice_update("inc");

				if (!running) {
					running = true;
					startRequest();
				}
			}
		} else {
			setTimeout(injectFunction, 100);
		}
	}
	injectFunction();
} + ")();";
h.type = "text/javascript";
document.body.appendChild(h);
