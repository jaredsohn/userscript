// ==UserScript==
// @name        Photo Sauce
// @namespace   http://userscripts.org/users/436161
// @description Adds links to the integrated image viewer
// @version     1.08
// @run-at      document-start
// @grant       GM_xmlhttpRequest
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// ==/UserScript==

// Only runs on ImageDocuments
if (unsafeWindow.ImageDocument && document instanceof unsafeWindow.ImageDocument) {
	main();
}

function main() {
	// add links relevant for the respective website
	[	facebook,
		imgur, flickr, imageshack,
		imagefap, motherless,
		fourchan,
		google
	].forEach(Function.call.bind(Function.call));
}

/*
 ##############################
 # website specific functions #
 ##############################
*/

function facebook() {
	/* facebook.com
		- Some urls contain the photo id. In this case we can
		  supply a link to the photo page. However you can only
		  view a photo page if the owner gave you the right to
		  view it.
		- Some urls contain the profile id of the owner. In
		  this case we can supply a link to the profile page.
		- In both cases we can supply a link to the full size
		  image. This is helpful if you only have a link to a
		  downsized version.
	*/

	var re = /^((https?:\/\/)((?:sphotos-[a-z]|profile)\.[a-z][a-z]\.fbcdn\.net|fbcdn-sphotos-[a-z]-a\.akamaihd\.net)(\/(?:hphotos|hprofile)(?:-ak)?-[a-z0-9]+))(?:\/q\d+)?(\/[ps]\d+x\d+)?((\/\d+_(\d+)_\d+_)([a-z])(\.[a-z0-9]+))$/i,
		m = re.exec(location.href)
	if (m) {
		addLink(
			'picture page',
			m[2] + 'facebook.com/photo.php?fbid=' + m[8]
		);
		if (m[9] !== 'o' || m[5]) addLink(
			'original size',
			m[1] + m[7] + 'o' + m[10]
		);
		return true;
	} else {
		var re = /^((https?:\/\/)((?:sphotos-[a-z]|profile)\.[a-z][a-z]\.fbcdn\.net|fbcdn-sphotos-[a-z]-a\.akamaihd\.net)(\/hphotos(?:-ak)?-[a-z0-9]+))(?:\/q\d+)?(\/p\d+x\d+)?((\/\d+_\d+_(\d+)_\d+_\d+_)([a-z])(\.[a-z0-9]+))$/i,
			m = re.exec(location.href)
		if (m) {
			addLink(
				'profile page',
				m[2] + 'facebook.com/profile.php?id=' + m[8]
			);
			if (m[9] !== 'o' || m[5]) addLink(
				'original size',
				m[1] + m[7] + 'o' + m[10]
			);
			return true;
		}
	}
}

function imgur() {
	/* imgur.com
		The urls contain the photo id. So we can supply a link
		to the page of the photo and a download link.

		Unfortunately it's not clear what part of the url is
		the photo id. This is because urls of downsized	photos
		look similar to urls of fullsized photos.
	*/
	var re = /^(https?:\/\/)i\.imgur\.com\/([a-z0-9]+?)(\.[a-z0-9]+)$/i,
		m = re.exec(location.href)
	if (m) {
		addLink(
			'picture page',
			m[1] + 'imgur.com/' + m[2]
		);
		addLink(
			'download',
			m[1] + 'imgur.com/download/' + m[2]
		);
		/*if (m[3]) addLink(
			'full size',
			m[1] + 'imgur.com/' + m[2] + m[4]
		);*/
		return true;
	}
}

function flickr() {
	/* flickr.com
		The urls contain the photo id. So we can
		supply a link to the page of the photo
		by sending a HEAD xhr to photo.gne. This
		is only done if the user wants the link.

		The server results are NOT cached because
		 - they are easy to acquire
		 - they are only relevant to that specific
		   photo
	*/
	var re = /^https?:\/\/farm\d+\.static\.?flickr\.com\/\d+\/(\d+)_[0-9a-f]+_[a-z]\.[a-z0-9]+$/i,
		m = re.exec(location.href)
	if (m) {
		var id = m[1];
		addLink(
			'find page',
			function(status) {
				GM_xmlhttpRequest({
					method: 'head',
					url: 'http://flickr.com/photo.gne?id=' + id,
					onload: function(res) {
						if (res.finalUrl) {
							status(
								'picture page',
								res.finalUrl
							);
						} else {
							status('error');
						}
					}
				});
			}
		);
		return true;
	}
}

function imageshack() {
	var re = /^(https?:\/\/)imageshack\.us\/(?:a\/img|scaled\/[^\/]+\/)(\d+)(?:\/\d+)?\/([^\/]+\.[a-z0-9]+)$/i,
		m = re.exec(location.href);
	if (m) {
		addLink(
			'picture page',
			m[1] + 'imageshack.us/photo/my-images/' + m[2] + '/' + m[3] + '/'
		);
		return true;
	}
}

function imagefap() {
	/* imagefap.com
		The urls contain the photo id. So we can supply a link
		to the page of the photo.
	*/
	var re = /^(https?:\/\/)fap\.to\/images\/full\/\d+\/\d+\/(\d+)\.[a-z0-9]+$/i,
		m = re.exec(location.href);
	if (m) {
		addLink(
			'picture page',
			m[1] + 'www.imagefap.com/photo/' + m[2] + '/'
		);
		return true;
	}
}

function motherless() {
	/* motherless.com
		We can supply a link to the page of the
		photo by sending a HEAD xhr to the mogile
		api. This is only done if the user wants
		the link.

		The server results are NOT cached because
		 - they are easy to acquire
		 - they are only relevant to that specific
		   photo
	*/
	var re = /^https?:\/\/[0-9a-z]+\.motherlessmedia\.com\//i,
		m = re.exec(location.href);
	if (m) {
		addLink(
			'find page',
			function(status) {
				status('requesting link');
				GM_xmlhttpRequest({
					method: 'head',
					url: 'http://motherless.com/mogile_api.php?path=' + encode(location.href) + '&redirect=1',
					onload: function(res) {
						if (res.finalUrl) {
							status(
								'picture page',
								res.finalUrl
							);
						} else {
							status('error');
						}
					}
				});
			}
		);
		return true;
	}
}

function fourchan() {
	/* 4chan.org
		We can supply a link to the post by using
		the 4chan api to look through all threads
		of the specific board. This is only done
		if the user wants the link.

		The server results are cached (with
		GM_get/setValue) because
		 - it is time consuming to acquire them
		 - they contain lots of useful data for
		   subsequent requests
	*/
	var re = /^https?:\/\/i\.4cdn\.org\/(\w+)\/src\/(\d+)\.(?:gif|jpe?g?|png)$/,
		m = re.exec(location.href),
		thumbnail = false;
	if (!m) {
		var re = /^https?:\/\/\d+\.thumbs\.4chan\.org\/(\w+)\/thumb\/(\d+)s\.jpg$/,
			m = re.exec(location.href);
		if (m) {
			thumbnail = true;
		} else {
			return;
		}
	}
	var expired = false;
	var board = m[1];
	var tim = parseInt(m[2]);
	var images = GM_getValue(board);
	if (images) {
		images = JSON.parse(images);
		expired = (0 > tim - Object.keys(images).sort(function(a, b) {return a - b;})[0]);
	} else {
		images = {};
	}
	if (expired) {
		addLink(
			'thread expired'
		);
		if (thumbnail) {
			addLink(
				'find full size',
				bruteForceFullSize(function(err, url, status) {
					if (err) {
						status(err);
					} else {
						status(
							'full size',
							url
						);
					}
				})
			);
		}
	} else if (tim in images) {
		addLink(
			'relevant post',
			url(images[tim])
		);
		if (thumbnail) {
			addLink(
				'full size',
				imgurl(images[tim].ext)
			);
		}
	} else {
		addLink(
			'find post',
			findPost(function(err, image, status) {
				if (err) {
					status(err);
				} else if (thumbnail) {
					status('relevant post', url(image), 'full size', imgurl(image.ext));
					if (thumblink) {
						thumblink.remove();
					}
				} else {
					status('relevant post', url(image));
				}
			})
		);
		if (thumbnail) {
			var thumblink = addLink(
				'find full size',
				bruteForceFullSize(function(err, url, status) {
					if (err) {
						status(err);
					} else {
						status(
							'full size',
							url
						);
					}
				})
			);
		}
	}
	return true;
	function bruteForceFullSize(cb) {
		return function(status) {
			var exts = ['.jpg', '.png', '.gif'];
			next();
			function next() {
				if (exts.length) {
					var ext = exts.shift();
					status('trying ' + ext);
					GM_xmlhttpRequest({
						method: 'head',
						url: imgurl(ext),
						onload: function(res) {
							if (res.status === 200) {
								cb(null, res.finalUrl, status);
							} else {
								next();
							}
						}
					});
				} else {
					cb('not found');
				}
			}
		};
	}
	function findPost(cb) {
		return function(status) {
			images = GM_getValue(board);
			if (images) {
				images = JSON.parse(images);
				if (tim in images) {
					return cb(null, images[tim], status);
				}
			} else {
				images = {};
			}
			status('reading catalog');
			get(0, function(pages) {
				var threads = pages.reduce(function(a, b) {
					return a.concat(b.threads);
				}, []);
				var oldThreads = Object.keys(Object.keys(images).reduce(function(threads, tim) {
					threads[images[tim].thread] = true;
					return threads;
				}, {})).filter(function(no) {
					no = parseInt(no);
					threads.every(function(thread) {
						return thread.no !== no;
					});
				});
				Object.keys(images).forEach(function(tim) {
					if (0 <= oldThreads.indexOf(images[tim].thread)) {
						delete images[tim];
					}
				});
				threads.forEach(function(thread) {
					images[thread.tim] = {
						thread: thread.no,
						post: thread.no,
						ext: thread.ext
					};
				});
				if (images[tim]) {
					GM_setValue(board, JSON.stringify(images));
					return cb(null, images[tim], status);
				}
				var total = threads.length;
				var threadPics = {};
				Object.keys(images).forEach(function(tim) {
					if (threadPics[images[tim].thread]) {
						threadPics[images[tim].thread]++;
					} else {
						threadPics[images[tim].thread] = 1;
					}
				});
				(function loop() {
					while (threads.length && (threads[0].images+1) <= threadPics[threads[0].no]) {
						threads.shift();
					}
					if (threads.length === 0) {
						return cb('thread not found', null, status);
					}
					status('reading threads (' + (100 - 100 * threads.length / total).toFixed(0) + '%)');
					get(threads.shift().no, function(posts) {
						posts.forEach(function(post) {
							if (post.tim) {
								images[post.tim] = {
									thread: posts[0].no,
									post: post.no,
									ext: post.ext
								};
							}
						});
						if (images[tim]) {
							GM_setValue(board, JSON.stringify(images));
							return cb(null, images[tim], status);
						}
						loop();
					});
				}());
			});
		};
	}
	function get(threadId, callback) {
		var url;
		if (!threadId) {
			url = 'http://api.4chan.org/' + board + '/catalog.json';
		} else {
			url = 'http://api.4chan.org/' + board + '/res/' + threadId + '.json';
		}
		GM_xmlhttpRequest({
			method: 'get',
			url: url,
			onload: function(xhr) {
				var data;
				try {
					data = JSON.parse(xhr.responseText);
				} catch (e) {
					return callback([]);
				}
				if (!threadId) {
					return callback(data);
				} else {
					return callback(data.posts);
				}
			}
		});
	}
	function url(image) {
		return 'http://boards.4chan.org/' + board + '/res/' + image.thread + (
			(image.thread === image.post) ? '' : '#p' + image.post
		);
	}
	function imgurl(ext) {
		return 'http://images.4chan.org/' + board + '/src/' + tim + (ext || '.jpg');
	}
}

function google() {
	/* google image search
		- On regular urls we supply a link.
		- On data-urls we supply an upload mechanism
		  which results in a link.
	*/
	var re = /^data:([^;,]+);base64,([0-9a-zA-Z\/+=]+)$/,
		m = re.exec(location.href.replace(/\s+/g, ''));
	if (m) {
		addLink(
			'upload to find similar images',
			function(status) {
				try {
					var type = m[1];
					var data = atob(m[2]);
					var array = new Uint8Array(data.length);
					for (var i = 0; i < data.length; i++) {
						array[i] = data.charCodeAt(i);
					}
					var blob = new Blob([array], {type: type});
					upload(status, blob);
				} catch (e) {
					status(''+e)
				}
			}
		);
	} else if (location.protocol === 'file:') {
		addLink(
			'upload to find similar images',
			function(status) {
				try {
				    status('scaling image');
				    var img = document.body.getElementsByTagName('img')[0];
                    scale(img, 100).toBlob(function(blob) {
        				upload(status, blob);				
    				}, 'image/jpeg', 0.9);
				} catch (e) {
					status(''+e)
				}
			}
		);
	} else {
		addLink(
			'similar images',
			'https://www.google.com/searchbyimage?image_url=' + encode(location.href)
		);
	}
    function upload(status, blob) {
        try {
    		status('uploading image');
    		var fd = new FormData();
    		fd.append('encoded_image', blob);
    		GM_xmlhttpRequest({
    			method: 'post',
    			url: 'https://www.google.de/searchbyimage/upload',
    			data: fd,
    			onload: function(res) {
    				if (res.finalUrl) {
    					status(
    						'similar images',
    						res.finalUrl
    					);
    				} else {
    					status('error');
    				}
    			},
    			upload: {
    				onprogress: function(res) {
    					console.log(res);
    					if (res.lengthComputable) {
    						status('uploading (' + Math.floor(res.loaded / res.total * 100) + '%)');
    					}
    				}
    			}
    		});  
		} catch (e) {
			status(''+e)
		}  				
	}
	function scale(img, maxSize) {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var width = img.naturalWidth, height = img.naturalHeight;
        var scaledWidth, scaledHeight;
        if (width <= maxSize || height <= maxSize) {
        	scaledWidth = width;
        	scaledHeight = height;
        } else if (width < height) {
        	scaledWidth = maxSize;
        	scaledHeight = Math.round(height * maxSize / width);
        } else {
        	scaledWidth = Math.round(width * maxSize / height);
        	scaledHeight = maxSize;
        }
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;
        ctx.drawImage(img, 0, 0, width, height, 0, 0, scaledWidth, scaledHeight);
        return canvas;
    }
	return true;
}

/*
 #########
 # tools #
 #########
*/

function addLink(text, href) {
	var divId = 'unhotlink_photos_container';
	var div = document.getElementById(divId);
	if (!div) {
		GM_addStyle([{
			selector: 'div#unhotlink_photos_container',
			styles: {
				'position': 'fixed',
				'top': '0px',
				'right': '0px',
				'background-color': 'white',
				'opacity': '0.2'
			}
		}, {
			selector: 'div#unhotlink_photos_container:hover',
			styles: {
				'opacity': '1.0'
			}
		}].map(function(rule) {
			return rule.selector + '{' + Object.keys(rule.styles).map(function(key) {
				return {key: key, value: rule.styles[key]};
			}).map(function(style) {
				return style.key + ':' + style.value + ';';
			}).join('') + '}';
		}).join(''));
		div = document.createElement('div');
		div.id = divId;
		/*div.style.position = 'fixed';
		div.style.top = '0px';
		div.style.right = '0px';
		div.style.backgroundColor = 'white';*/
		document.documentElement.appendChild(div);
	}
	var container = document.createElement('div');
	var a;
	if (typeof href === 'string') {
		a = document.createElement('a');
		a.href = href;
	} else if (typeof href === 'function') {
		a = document.createElement('button');
		a.addEventListener('click', function onclick() {
			a.removeEventListener('click', onclick, false);
			a.disabled = true;
			var status = document.createElement('a');
			a.parentNode.replaceChild(status, a);
			a = status;
			href(function(msg, url) {
				a.textContent = msg;
				if (url) {
					a.setAttribute('href', url);
				} else {
					a.removeAttribute('href');
				}
				if (arguments.length > 2) {
					for (var i = 2; i < arguments.length; i = i + 2) {
						a = document.createElement('a');
						a.textContent = arguments[i];
						if (arguments[i + 1]) {
							a.href = arguments[i + 1];
						}
						container.appendChild(document.createElement('br'));
						container.appendChild(a);
					}
				}
			});
		}, false);
	} else {
		a = document.createElement('span');
	}
	a.textContent = text;
	container.appendChild(a);
	div.appendChild(container);
	return {
		remove: function() {
			if (container && div && container.parentNode === div) {
				div.removeChild(container);
			}
		}
	};
}

function encode(uriPart) {
	return encodeURIComponent(uriPart).replace(/%20/g, '+');
}