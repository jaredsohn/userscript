// ==UserScript==
// @name           jappy recharged
// @namespace      DebugR
// @description    profilebesucher mit bild, version 0.2
// @include        http://www.jappy.de/user/*
// ==/UserScript==

GM_log('loading...');

// register user menu
GM_registerMenuCommand('Boy-Mode'+(GM_getValue('loadMode', '')=='m'?' (aktiv)':''), function(e) {
	GM_setValue('loadMode', 'm');
	GM_log('boy mode activated');
}); 
GM_registerMenuCommand('Girli-Mode'+(GM_getValue('loadMode', '')=='w'?' (aktiv)':''), function(e) {
	GM_setValue('loadMode', 'w');
	GM_log('girli mode activated');
}); 
GM_registerMenuCommand('Bi-Mode'+(GM_getValue('loadMode', '')==''?' (aktiv)':''), function(e) {
	GM_setValue('loadMode', '');
	GM_log('girli mode activated');
}); 

// const imageWidth = 100;
var loadDelay = 1000;
var loaderImage = "data:image/gif;base64,R0lGODlhEAAQAPMAAP%2F%2F%2FwAAAAAAAIKCgnJycqioqLy8vM7Ozt7e3pSUlOjo6GhoaAAAAAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh%2BQQJCgAAACwAAAAAEAAQAAAEKxDISau9OE%2FBu%2F%2FcQBTGgWDhWJ5XSpqoIL6s5a7xjLeyCvOgIEdDLBqPlAgAIfkECQoAAAAsAAAAABAAEAAABCsQyEmrvThPwbv%2FXJEMxIFg4VieV0qaqCC%2BrOWu8Yy3sgrzoCBHQywaj5QIACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7%2F9xhFMlAYOFYnldKmqggvqzlrvGMt7IK86AgR0MsGo%2BUCAAh%2BQQJCgAAACwAAAAAEAAQAAAEMRDISau9OE%2FBu%2F%2BcghxGkQyEFY7lmVYraaKqIMpufbc0bLOzFyXGE25AyI5myWw6KREAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv%2FnKQgh1EkA0GFwFie6SqIpImq29zWMC6xLlssR3vdZEWhDwBqejTQqHRKiQAAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv%2FHKUgh1EkAyGF01ie6SqIpImqACu5dpzPrRoMpwPwhjLa6yYDOYuaqHRKjQAAIfkECQoAAAAsAAAAABAAEAAABDEQyEmrvThPwbv%2FnKUgh1EkAxFWY3mmK9WaqCqIJA3fbP7aOFctNpn9QEiPZslsOikRACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7%2FxymIIexEOE1lmdqrSYqiGTsVnA7q7VOszKQ8KYpGo%2FICAAh%2BQQJCgAAACwAAAAAEAAQAAAEJhDISau9OE%2FBu%2F%2BcthBDEmZjeWKpKYikC6svGq9XC%2B6e5v%2FAICUCACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7%2Fxy2EENSGOE1lmdqrSYqiGTsVnA7q7VOszKQ8KYpGo%2FICAAh%2BQQJCgAAACwAAAAAEAAQAAAEMRDISau9OE%2FBu%2F%2BctRBDUhgHElZjeaYr1ZqoKogkDd9s%2Fto4Vy02mf1ASI9myWw6KREAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv%2FHLUQQ1IYByKF01ie6SqIpImqACu5dpzPrRoMpwPwhjLa6yYDOYuaqHRKjQAAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv%2FnLQQQ1IYB0KFwFie6SqIpImq29zWMC6xLlssR3vdZEWhDwBqejTQqHRKiQAAIfkECQoAAAAsAAAAABAAEAAABDEQyEmrvThPwbv%2F3EIMSWEciBWO5ZlWK2miqiDKbn23NGyzsxclxhNuQMiOZslsOikRADsAAAAAAAAAAAA%3D";
var failureImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIsSURBVDjLpVNLSJQBEP7%2Bh6uu62vLVAJDW1KQTMrINQ1vPQzq1GOpa9EppGOHLh0kCEKL7JBEhVCHihAsESyJiE4FWShGRmauu7KYiv6Pma%2BDGoFrBQ7MzGFmPr5vmDFIYj1mr1WYfrHPovA9VVOqbC7e%2F1rS9ZlrAVDYHig5WB0oPtBI0TNrUiC5yhP9jeF4X8NPcWfopoY48XT39PjjXeF0vWkZqOjd7LJYrmGasHPCCJbHwhS9%2FF8M4s8baid764Xi0Ilfp5voorpJfn2wwx%2Fr3l77TwZUvR%2BqajXVn8PnvocYfXYH6k2ioOaCpaIdf11ivDcayyiMVudsOYqFb60gARJYHG9DbqQFmSVNjaO3K2NpAeK90ZCqtgcrjkP9aUCXp0moetDFEeRXnYCKXhm%2BuTW0CkBFu4JlxzZkFlbASz4CQGQVBFeEwZm8geyiMuRVntzsL3oXV%2BYMkvjRsydC1U%2BlhwZsWXgHb%2BoWVAEzIwvzyVlk5igsi7DymmHlHsFQR50rjl%2B981Jy1Fw6Gu0ObTtnU%2Bcgs28AKgDiy%2BAwpj5OACBAhZ%2Fqh2HOo6i%2BNeA73jUAML4%2FqWux8mt6NjW1w599CS9xb0mSEqQBEDAtwqALUmBaG5FV3oYPnTHMjAwetlWksyByaukxQg2wQ9FlccaK%2FOXA3%2FuAEUDp3rNIDQ1ctSk6kHh1%2FjRFoaL4M4snEMeD73gQx4M4PsT1IZ5AfYH68tZY7zv%2FApRMY9mnuVMvAAAAAElFTkSuQmCC";


var divElements = document.getElementsByTagName("div");
for(a=0; a<divElements.length; a++) {
    if(divElements[a].className == "ldN") {
			divElements[a].style.textAlign = 'center';
      var anchors = divElements[a].getElementsByTagName("a");
			//GM_log(anchors.length);
      for(b=0;b<anchors.length;b++) {
				
				var a = anchors[b];
				var mode = GM_getValue('loadMode', '');
				if(mode != '' && !a.innerHTML.match(new RegExp('^'+mode, 'i'))) continue;
				
				var username = a.href.match(/user\/(.*)/)[1];
				a.style.display = 'block';
				a.style.padding = '5px';
				a.appendChild(document.createElement('br'));
				
				// create userImage
				var userImage = document.createElement('img');
				userImage.id = 'userimage-'+username;
				a.appendChild(userImage);
				
				// check for cached image
				var cachedImage = GM_getValue('userimage-'+username);
				if(typeof cachedImage != 'undefined') {
					GM_log('found cached image for '+username+': '+cachedImage);
					userImage.src = cachedImage;
					userImage.width = 100;
					continue;
				}
				
				// insert loaderImage
				userImage.src = loaderImage;
					
				GM_log('fetching image for: '+username);
				
				var delay = loadDelay * (b+1);
				GM_log('waiting '+delay/1000+' seconds');
				setTimeout((function(username, a) {
					return function() {
						GM_xmlhttpRequest({
							method: 'GET',
							url: 'http://www.jappy.de/user/'+username,
							/**
							 * success, got xhr response
							 */
							onload: (function(username, a) {
								return function(responseDetails) {
									try {
										// locating img tag
										var img = responseDetails.responseText.match(/<img[^>]*alt="userbild"[^>]*>/i)[0];
										// locating img src
										var src = img.match(/src="([^"]+)"/i)[1];
										GM_log('image found: '+src+'');
										// cache image location
										GM_setValue('userimage-'+username, src);
										// show the image
										var img = document.getElementById('userimage-'+username);
										img.src = '';
										img.src = src;
										img.alt = username;
										img.title = username;
										img.width = 100;
									} catch(e) {
										var img = document.getElementById('userimage-'+username);
										img.src = failureImage;
										img.alt = 'Not found.';
									}
								}
							})(username, a),
							/**
							 * xhr error (404 or timeout, eg)
							 */
							onerror: (function(username, a) {
								return function(response) {
									var img = document.getElementById('userimage-'+username);
									img.src = failureImage;
									img.alt = 'Not found.';
								}
							})(username, a)
							
						});
					}
				})(username,a), delay);
				/**/
			}
    }
}
		
GM_log('loaded.');
