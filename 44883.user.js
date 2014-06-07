// ==UserScript==
// @name          4Chan Thread Monitor
// @namespace     xkero
// @description   Keeps a track on open threads by updating the pages, caching all images posted and subtle alerts for 404's
// @include       http://zip.4chan.org/*/res/*.html
var iform = document.getElementsByTagName('form')[1];
var posts = iform.getElementsByTagName('table');
var imgs = iform.getElementsByTagName('img');
var postsNum = posts.length - 1;
var postbottom = posts[postsNum-1].nextSibling;

var dumpSpace = document.createElement('div');
dumpSpace.style.display = 'none';
iform.appendChild(dumpSpace);

var statusmsg = document.createElement('div');
statusmsg.setAttribute('style', 'position: fixed; top: 0; left: 0; width: 100%; background: rgba(255,0,0,0.7); color: white; -moz-border-radius: 0 0 0.3em 0.3em; font-size: 200%; text-align: center;');
statusmsg.innerHTML = 'Starting...';
document.body.appendChild(statusmsg);

for (var i = 0; i < imgs.length; i++)
	{
	imgs[i].src = imgs[i].parentNode.href;
	imgs[i].parentNode.removeAttribute('href');
	imgs[i].parentNode.removeAttribute('target');
	imgs[i].setAttribute('onClick', 'if(this.height != "'+imgs[i].height+'" && this.width != "'+imgs[i].width+'") {this.height="'+imgs[i].height+'";this.width="'+imgs[i].width+'"}else{this.removeAttribute("height");this.removeAttribute("width")};'); // onclick toggle for thumbnail size to full size
	}

var intv = setInterval(function()
	{
	GM_xmlhttpRequest
		(
			{
			method: 'GET',
			url: window.location.href,
			headers:
				{
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/xml,text/xml'
				},
			onload: function(responseDetails)
				{
				switch(responseDetails.status)
					{
					case 200:
						dumpSpace.innerHTML = responseDetails.responseText;
						var newposts = document.getElementsByTagName('form')[2].getElementsByTagName('table');
						var newpostsL = newposts.length - 1
						newposts[newpostsL].innerHTML = '';
						document.getElementsByTagName('form')[2].removeChild(newposts[newpostsL]);
						//statusmsg.innerHTML = 'Just plain update';
						statusmsg.style.display = 'none';
						if(postsNum < newposts.length)
							{
							for (var i = postsNum; i < newposts.length; i++)
								{
								iform.insertBefore(newposts[i],postbottom);
								if (posts[postsNum].getElementsByTagName('img')[0] != "undefined")
									{
									var insertedImg = posts[postsNum].getElementsByTagName('img')[0];
									insertedImg.src = insertedImg.parentNode.href;
									insertedImg.parentNode.removeAttribute('href');
									insertedImg.parentNode.removeAttribute('target');
									insertedImg.setAttribute('onClick', 'if(this.height != "'+insertedImg.height+'" && this.width != "'+insertedImg.width+'") {this.height="'+insertedImg.height+'";this.width="'+insertedImg.width+'"}else{this.removeAttribute("height");this.removeAttribute("width")};'); // onclick toggle for thumbnail size to full size
									}
								postsNum += 1;
								}
							statusmsg.innerHTML = 'Updated with new posts';
							statusmsg.style.display = 'block';
							}
						dumpSpace.innerHTML = '';
						//statusmsg.style.display = 'none';
						break;
					case 404:
						statusmsg.innerHTML = 'Thread has 404\'d! It\'s gone when you close this...';
						statusmsg.style.display = 'block';
						clearInterval(intv);
						break;
					default:
						statusmsg.innerHTML = 'Something bad happened :(. Retrying in 5 seconds...';
						statusmsg.style.display = 'block';
					}
				}
			}
		);
	}, 5000);

// ==/UserScript==