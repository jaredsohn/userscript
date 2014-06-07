// ==UserScript==
// @name           4chan Sounds Mark II
// @namespace      tripflag
// @description    Allows to post sounds in 4chan's boards.
// @include        http://boards.4chan.org/*
// @include        https://boards.4chan.org/*
// @include        http://archive.foolz.us/*/thread/*
// @include        https://archive.foolz.us/*/thread/*
// ==/UserScript==

var chrome = (navigator.userAgent+'').indexOf(' Chrome/') != -1;
var archive = (document.location+'').indexOf('boards.4chan.org') == -1;
var xmlhttp = chrome? get_chrome:get_grease;

function insertAfter(referenceNode, newNode)
{
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
function byClass(items, cl)
{
	for (var i = 0; i < items.length; i++)
	{
		if (items[i].getAttribute('class') == cl)
		{
			return items[i];
		}
	}
	return null;
}
function s2ab(text)
{
	var dicks = new ArrayBuffer(text.length);
	var docks = new Uint8Array(dicks);
	for (var a = 0; a < text.length; a++)
	{
		docks[a] = text.charCodeAt(a);
	}
	return dicks;
}
function progressPrepare(id)
{
	var item = document.getElementById('ys_link'+id).parentNode.parentNode;
	item.style.position = 'relative';
	progress[id] = document.createElement('div');
	progress[id].style.right = '0';
	progress[id].style.bottom = '0';
	progress[id].style.width = '3px';
	progress[id].style.opacity = '.5';
	progress[id].style.position = 'absolute';
	progress[id].style.background = '#000';
	progress[id].style.borderLeft = '1px solid #fff';
	item.appendChild(progress[id]);
}
function progressTick(e, id)
{
	var dub = Math.round(1000 * e.loaded / e.total) / 10;
	progress[id].style.height = (100 - dub) + '%';
	progress[id].style.opacity = 0.4 + (dub / 60);
}
function get_chrome(uri, tag, id, callback)
{
	//alert(id + ':' + uri + '@' + tag);
	var xhr = new XMLHttpRequest();
	xhr.open('GET', uri, true);
	xhr.overrideMimeType('text/plain; charset=x-user-defined');
	xhr.responseType = 'arraybuffer';
	xhr.onload = function(e)
	{
		if (this.status == 200)
		{
			callback(findOgg(this.response, tag, id), actualTag);
		}
	}
	xhr.onprogress = function(e) { progressTick(e, id); }
	xhr.send();
}
function get_grease(uri, tag, id, callback)
{
	//alert(id + ':' + uri + '@' + tag);
	GM_xmlhttpRequest(
	{
		method: "GET",
		url: uri,
		overrideMimeType: 'text/plain; charset=x-user-defined',
		onload: function(e)
		{
			if (e.status == 200)
			{
				var text = e.responseText;
				var dicks = s2ab(text);
				callback(findOgg(dicks, tag, id), actualTag);
			}
		},
		onprogress: function(e) { progressTick(e, id); }
	});
}
var actualTag;
function findOgg(raw, tag, id)
{
	var tagU = s2ab('[' + tag + ']');
	var skip = s2ab(' "\r\n');
	var oggU = s2ab('OggSxx');
	var tag8 = new Uint8Array(tagU);
	var skp8 = new Uint8Array(skip);
	var ogg8 = new Uint8Array(oggU);
	ogg8[4] = 0;
	ogg8[5] = 2;
	var alerts = '';
	var data = new Uint8Array(raw);
	var eof = skp8.byteLength + 12;
	var ptr = -1;

	// keep comparing data to [tag] until match
	for (var i = 0; i < data.byteLength - eof; i++)
	{
		var match = true;
		// match the tag and brackets
		for (var j = 0; j < tag8.byteLength; j++)
		{
			if (data[i+j] != tag8[j])
			{
				match = false;
				break;
			}
		}
		if (!match)
		{
			continue;
		}
		i += tagU.byteLength;
		// skip whitespace and newline
		for (var j = 0; j < skp8.byteLength; j++)
		{
			if (data[i] == skp8[j])
			{
				j = -1;
				i++;
			}
		}
		// match against ogg header
		for (var j = 0; j < ogg8.byteLength; j++)
		{
			if (data[i+j] != ogg8[j])
			{
				//alert('ogg header mismatch at ' + j + ': ' + String.fromCharCode(data[i+j]));
				match = false;
				break;
			}
		}
		if (!match)
		{
			//alert('<WARNING> ogg header mismatch');
			continue;
		}
		ptr = i;
		break;
	}
	if (ptr < 0)
	{
		// matching against tag failed, try just the ogg header
		for (var i = 0; i < data.byteLength - eof; i++)
		{
			var match = true;
			for (var j = 0; j < ogg8.byteLength; j++)
			{
				if (data[i+j] != ogg8[j])
				{
					match = false;
					break;
				}
			}
			if (match)
			{
				ptr = i;
				break;
			}
		}
		if (ptr > 0)
		{
			var ofs = [-1,-1];
			var find = s2ab('[]');
			var fin8 = new Uint8Array(find);
			for (var j = ptr; j > ptr - 100; j--)
			{
				if (data[j] == fin8[0] && ofs[1] > 0)
				{
					ofs[0] = j;
					break;
				}
				else if (data[j] == fin8[1] && ofs[0] < 0)
				{
					ofs[1] = j;
				}
			}
			if (ofs[0] > 0 && ofs[1] > 0)
			{
				var newtag = '';
				for (var j = ofs[0] + 1; j <= ofs[1] - 1; j++)
				{
					newtag += String.fromCharCode(data[j]);
				}
				alerts = '[' + tag + '] not found\r\n\r\n' + 'playing ' + newtag + ' instead';
				tag = newtag;
			}
		}
	}
	if (ptr > 0)
	{
		actualTag = tag;
		return raw.slice(ptr);
		if (alerts.length > 0)
		{
			//alert(alerts);
		}
	}
	else
	{
		alert('no audio in this image ;_;');
	}
}
function b64(raw, i)
{
	var chunk;
	var base64 = '';
	// Modification of http://stackoverflow.com/questions/7370943/
	var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	var bytes = new Uint8Array(raw, i);
	// Assertation of correct offset:
	// alert(String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3]));
	var byteLength = bytes.byteLength;
	var byteRemainder = byteLength % 3;
	var mainLength = byteLength - byteRemainder;
	for (var i = 0; i < mainLength; i += 3)
	{
		chunk = (bytes[i] << 16) | (bytes[i+1] << 8) + bytes[i+2];
		base64 +=
			encodings[(chunk & 0xFC0000) >> 18] +
			encodings[(chunk & 0x3F000) >> 12] +
			encodings[(chunk & 0xFC0) >> 6] +
			encodings[(chunk & 0x3F)];
	}
	if (byteRemainder == 1)
	{
		chunk = bytes[mainLength];
		base64 +=
			encodings[(chunk & 0xFC) >> 2] +
			encodings[(chunk & 0x03) << 4] +
			'==';
	}
	else if (byteRemainder == 2)
	{
		chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];
		base64 +=
			encodings[(chunk & 0x3F00) >> 8] +
			encodings[(chunk & 0x3F0) >> 4] +
			encodings[(chunk & 0xF) << 2] +
			'=';
	}
	return base64;
}
function getPostID(o)
{
	var o = o.getAttribute('id');
	if (!archive)
	{
		o = o.substr(1);
	}
	return parseInt(o);
}
function deepscan(a,p,level)
{
	var repeat = false;
	if (!a || !p) return;
	if (level > 3) return; // remove this to make firefox segfault
	for (var j = 0; j < p.childNodes.length; j++)
	{
		var match = null;
		var node = p.childNodes[j];
		if (node.nodeType != 3)
		{
			// not a text node, so could be spoiler/greentext or even a soundlink.
			// that said, only soundlinks have IDs, so why make it complicated
			if (!node.id && deepscan(a,p.childNodes[j],level+1))
			{
				repeat = true;
			}
			continue;
		}
		if (!(match = node.nodeValue.match(/(.*)\[([^\]]+)\](.*)/)))
		{
			continue;
		}
		repeat = true;
		var href = a.href;
		var code = match[2];
		var link = document.createElement('a');
		link.innerHTML = '[' + code + ']';
		link.href = href;
		link.tag = code;
		link.id = 'ys_link' + no;
		players[no++] = null;
		if (level > 0)
		{
			link.style.color = 'inherit';
			link.style.fontWeight = 'bold';
			//link.style.textDecoration = 'none';
		}
		else
		{
			link.className = 'quotelink';
		}
		link.addEventListener('click', function(e)
		{
			e.preventDefault();
			var id = parseInt(this.id.substr(7));
			try
			{
				players[id].pause();
				players[id] = null;
			}
			catch (ex)
			{
				progressPrepare(id);
				this.innerHTML = '[loading]';
				xmlhttp(this.href, this.tag, id, function(music, tag)
				{   // Callbacks; all the cool kids are doing it.
					var BlobBuilder = (window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder);
					var bb = new BlobBuilder();
					bb.append(music);
					var blob = bb.getBlob('audio/ogg');
					var url = (window.webkitURL || window.URL).createObjectURL(blob);
					players[id] = new player(url);
					container.appendChild(players[id].container);
					// players[id].container.offsetHeight;
					// players[id].container.style[playerY[0]];
					var po = e.target.parentNode.parentNode;
					while (!po.id) po = po.parentNode;
					players[id].songTitle('>>[' + tag + ']', '#' + po.id);
					if (!chrome)
					{
						// what
						players[id].play();
						players[id].pause();
						players[id].play();
					}
					else
					{
						players[id].play();
					}
					progress[id].parentNode.removeChild(progress[id]);
					progress[id] = null;
					e.target.innerHTML = '[' + tag + ']';
				});
			}
		});
		node.nodeValue = match[1];
		insertAfter(node, link);
		var text = document.createTextNode(match[3]);
		insertAfter(link, text);
	}
	return repeat;
}
var no = 1;
var players = [];
var progress = [];
var lastPost = null;	// last post that was hyperlink()ed
var lastHyper = 0;		// unixtime*1000 for last hyperlink()
function hyperlink()
{
	var tmpDate = (new Date()).getTime();
	if (tmpDate < lastHyper + 2000)
	{
		return;
	}
	lastHyper = tmpDate;
	var newLastPost = null;
	var posts = archive? 'article':'blockquote';
	posts = document.getElementsByTagName(posts);
	newLastPost = getPostID(posts[posts.length-1]);
	if (newLastPost == lastPost)
	{
		return;
	}
	for (var i = 0; i < posts.length; i++)
	{
		// dom-insertion listener lags the fuck out on longer threads
		if (lastPost && getPostID(posts[i]) <= lastPost)
		{
			// fixed (somewhat)
			continue;
		}
		var repeat = true;
		while (repeat)
		{
			repeat = false;
			var a = null;
			var p = null;
			if (!archive)
			{
				p = posts[i];
				a = byClass(posts[i].parentNode.getElementsByTagName('a'), 'fileThumb');
				if (!a) continue;
			}
			else
			{
				a = byClass(posts[i].getElementsByTagName('a'), 'thread_image_link');
				p = byClass(posts[i].getElementsByTagName('div'), 'text');
				if (!a || !p) continue;
			}
			repeat = deepscan(a,p,0);
		}
	}
	lastPost = newLastPost;
}
hyperlink();
document.body.addEventListener('DOMNodeInserted', function(e)
{
	hyperlink(); // I am a strong void hyperlink who dont need no e
});
function create(type, parent, attributes)
{
	var element = document.createElement(type);
	for (attr in attributes)
	{
		element.setAttribute(attr, attributes[attr]);
	}
	if (parent != undefined)
	{
		parent.appendChild(element);
	}
	return element;
}

// s/^([\t]*)    /\1\t/
// s/[ \t]*$//
function listProps(e)
{
	var msg = [];
	var imsg = 0;
	var nmsg = 0;
	for (var prop in e)
	{
		if ((e[prop]+'').length < 30)
		{
			msg[imsg] += prop + ":  " + e[prop] + '\n';
			if (++nmsg > 30)
			{
				msg[++imsg] = '';
				nmsg = 0;
			}
		}
	}
	for (var a = 0; a <= imsg; a++)
	{
		alert(msg[a]);
	}
}
function player(audio)
{
	/*
		Todo:
			Seeking
			If it's still broken (probably?) fix inline quoting
			Figure out if it's possible to fix Firefox progressbar bug
			Play animated gifs along with song.
	*/
	// In case it's hard to tell, this is a flat layout of the html generated and not just pure chaos.
	var container       = create('div', undefined, {'class':'pContainer'});
	var nowPlaying      = create('div', container, {'class':'nowPlaying'});
	var songTitle       = create('a', nowPlaying, {'class':'songTitle'});
	var controls        = create('div', container, {'class':'controls'});
	var playBTN         = create('div', controls, {'class':'playBTN'});
	var volumeBTN       = create('div', controls, {'class':'volumeBTN'});
	var volumeSlider    = create('div', volumeBTN, {'class':'volumeSlider'});
	var slider          = create('div', volumeSlider, {'class':'slider'});
	var progressBarBG   = create('div', controls, {'class':'progressBarBG'});
	var progressBar     = create('div', progressBarBG, {'class':'progressBar'});
	var counter         = create('div', progressBar, {'class':'counter'});
	var seekInfo        = create('div', progressBarBG, {'class':'seekInfo'});
	var loopBTN         = create('div', controls, {'class':'loopBTN'});
	var actions         = create('div', container, {'class':'actions'});
	var saveBTN         = create('div', actions, {'class':'saveBTN'});
	var save            = create('a', saveBTN, {'class':'save'});
	var cfBTN           = create('div', actions, {'class':'cfBTN actionsActive'});
	var closeBTN        = create('div', actions, {'class':'closeBTN'});
	var audioElement    = create('audio', container, {'class':'audioElement','src': audio});

	var duration = 0;
	var mousedown = false;

	function destroy()
	{
		container.parentNode.removeChild(container);
	}
	function setVolume(e)
	{
		var volume = e.layerX / e.target.offsetWidth;
		// firefox seems to have a logarithmic scale
		// todo: test in chrome
		if (volume > 0 && volume <= 1)
		{
			audioElement.volume = volume;
			localStorage.setItem('lastVolume', volume);
			slider.style.left = e.layerX + 'px';
		}
	}
	function seekPosition(e)
	{
		var offset = (e.layerX - progressBarBG.offsetLeft) / progressBarBG.offsetWidth;
		
		// For some strange-ass reason, seeking works perfectly with files like [AndImHome].
		// Some other files can only seek to targets <= current playback position: [Connect].
		
		// seekable.end(0) indicates it should be able to seek through the full 90 seconds
		// of [Connect] from the very beginning. What the fuck.
		
		if (offset > 0 && offset <= 1) // && audioElement.seekable.end(0) > duration * offset)
		{
			audioElement.currentTime = parseInt(duration * offset);
		}
	}
	this.addEventListener = audioElement.addEventListener.bind(audioElement);
	this.destroy = destroy;
	this.play = audioElement.play.bind(audioElement);
	this.pause = audioElement.pause.bind(audioElement);
	this.play = audioElement.play.bind(audioElement);
	this.container = container;
	this.songTitle = function(title, link)
	{
		songTitle.innerHTML = title;
		songTitle.href = link;
	}
	this.src = audioElement.src;
	audioElement.addEventListener('play', function(e)
	{
		if (!chrome && duration == 0)
		{ // Workaround for Firefox bug #583444
			var interval = setInterval(function()
			{
				try { duration = audioElement.buffered.end(0); }
				catch(ex) { duration = 0; }
				if (duration != 0)
				{
					clearInterval(interval);
				}
			}, 50);
		}
		playBTN.className = 'pauseBTN';
	});
	audioElement.addEventListener('ended', function(e)
	{
		if (cfBTN.className == 'cfBTN actionsActive')
		{
			destroy();
		}
		else
		{
			playBTN.className = 'playBTN';
		}
	});
	audioElement.addEventListener('timeupdate', function(e)
	{
		if (this.currentTime > 0)
		{
			var progress = Math.floor((100 / duration) *
					this.currentTime);
			var minutes = Math.floor(this.currentTime / 60);
			var seconds = Math.floor(this.currentTime % 60);
			if (seconds < 10) seconds = '0' + seconds.toString();
			counter.innerHTML = minutes + ':' + seconds;
		}
		progressBar.style.width = progress + '%';
	});
	closeBTN.innerHTML = 'close';
	closeBTN.addEventListener('click', function(e)
	{
		destroy();
	});
	cfBTN.innerHTML = 'close on finish';
	cfBTN.addEventListener('click', function(e)
	{
		if (cfBTN.className == 'cfBTN actionsActive')
		{
			cfBTN.className = 'cfBTN';
		}
		else cfBTN.className = 'cfBTN actionsActive';
	});
	loopBTN.addEventListener('click', function(e)
	{
		if (this.className == 'loopBTN')
		{
			this.className = 'loopBTNActive';
			audioElement.loop = true;
		}
		else
		{
			this.className = 'loopBTN';
			audioElement.loop = false;
		}
	});
	playBTN.addEventListener('click', function(e)
	{
		if (this.className == 'playBTN')
		{
			audioElement.play();
			this.className = 'pauseBTN';
		}
		else if (this.className == 'pauseBTN')
		{
			audioElement.pause();
			this.className = 'playBTN';
		}
	});
	saveBTN.innerHTML = 'save';
	saveBTN.addEventListener('click', function(e)
	{
		var string = atob(audio.split(',')[1]);
		var arrayBuffer = s2ab(string);
		var BlobBuilder = (window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder);
		var bb = new BlobBuilder();
		bb.append(arrayBuffer);
		var blob = bb.getBlob();
		var url = (window.webkitURL || window.URL).createObjectURL(blob);
		location.href = url;
	});
	volumeBTN.addEventListener('click', function(e)
	{
		e.stopPropagation();
		if (this.className == 'volumeBTN')
		{
			this.className = 'muteBTN';
			audioElement.muted = true;
		}
		else
		{
			this.className = 'volumeBTN';
			audioElement.muted = false;
		}
		mousedown = false;
	});
	volumeBTN.addEventListener('mousemove', function(e)
	{
		if (!mousedown)
		{
			slider.style.left =
				(volumeSlider.offsetWidth *
				 audioElement.volume) + 'px';
		}
		if (e.target.className != 'volumeSlider' &&
			e.target.className != 'slider')
		{
			mousedown = false;
		}
	});
	volumeSlider.addEventListener('mousedown', function(e)
	{
		e.stopPropagation();
		mousedown = true;
	});
	volumeSlider.addEventListener('click', function(e)
	{
		mousedown = false;
	});
	volumeSlider.addEventListener('click', function(e)
	{
		e.stopPropagation();
		setVolume(e);
	});
	slider.addEventListener('click', function(e)
	{
		e.stopPropagation();
		mousedown = false;
	});
	slider.addEventListener('mouseup', function(e)
	{
		e.stopPropagation();
		mousedown = false;
	});
	volumeSlider.addEventListener('mousemove', function(e)
	{
		if (mousedown == true && e.target.className != 'slider') setVolume(e);
	});
	progressBarBG.addEventListener('click', function(e)
	{
		e.stopPropagation();
		seekPosition(e);
	});
	if (!localStorage.getItem('lastVolume'))
	{
		audioElement.volume = 0.30;
	}
	else
	{
		audioElement.volume = localStorage.getItem('lastVolume');
	}
	return this;
}
var container = document.createElement('div');
var body = document.getElementsByTagName('body')[0];
body.appendChild(container);
container.style.position = 'fixed';
container.style.right = '0px';
container.style.bottom = '25px';

/******************************* Default Assets *******************************/
var ACTIONSBG		= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAVCAIAAAAIMBNTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAcSURBVHjaYli9ejUTIyMjCoYBZDYuMRgfST9gALkiAoSiRA5TAAAAAElFTkSuQmCC';
var ACTIONSBGACTIVE	= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAYCAIAAAC0rgCNAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAmSURBVHjaYli8eDETIyMjCmZiYsKgmZiYmJiZmVH4MIAuhmQWYADPZgKEG6h1qQAAAABJRU5ErkJggg==';
var LOOPBTN			= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAIAAADZrBkAAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAE1SURBVHjalFKxqoNAEDxzFrEQ4gfYHiKkFQN+xH2qXcAmEAKxDAix8gMEEWOu0HC3pthwz5yP93CqZXbGHZmzqqoi62G3bRsEwSpPXdc2AADAKts0TfY0TUqp5a7rOhx2u52xAgAbAAzb4/E4nU5zhnOOJOf8Y1NKSSm1ou/78/lsfD5NUxxQCQBfIZ/P5+VywTlJEtd1CSHH41H7UWle057D4eA4jpRSCDE/i0qllA0A85CEkCiKttstktfrdWkDACvLMt/3VxUghPgKmef5fB3HMQ7DMNxuN818CjBCIvb7PfLjOBZF8f+/ISilUsrX63W/35EJw/CngGXdCEylEQQBpfT3AgghjDFKaVmWcw9jzLIsLTPrZoxhdMaYft+bzUYX/debNLDcfq41TbOqN8/z3gMAo4AD0p7bZFwAAAAASUVORK5CYII=';
var LOOPBTNACTIVE	= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAIAAADZrBkAAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAE/SURBVHjalFIxqoNAEF2zFloICdja5zrpUgaCkJSCoBcQEdKGCJ4hbJ+7eAAhBI0WUXZnU0zYb9bAx6mGN+/tvOWNUZYlmV/m4/FYr9ezNFVVmQAAALNkUkpTSimEmM7qusZmuVxqIwAwAUCTNU2z2+3GCGMMQcbYRyaE4JwrxvP53O/32vObzQYbZALAl8m2bX3fx74oCsdxCCHb7VbpkalvU5o8z23b5px3XTdei0whhAkAY5OEkPP5bFkWgofDYSoDAON2u3meNyuAruu+TB6Px/H4crlg83q9giBQyCcAzSTW6XRCvO/7MAz//xsWpZRzPgxDFEWIZFn2F8A0bix0pSpNU0rp7wAIIUmSUErjOB5rkiQxDEPRAMC4Xq+u6063qfteLBba6PO3nya1y9BPWUp5v99n5bZard4DAJCG9wDFCtv8AAAAAElFTkSuQmCC';
var MUTEBTN			= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAIAAADZrBkAAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAC4SURBVHjavJK7DoMwDEVdlDUDf8HEmAGJr+cPsjGwZEOKWDKCrzukooin3KFnjHN07TivYRhIj5mmqaoqlTOOowEAQKWJiBERZlZpAAyAXzRmXpZlV/De13V9oxW5yS3e+xACX7NP6/ueiEIIRHRsYYWZDYD1RhYyN9onbZ7nY+308Jt2+iTPadsmU0pEZK3Vzda2LRF1XWetvU8r8rq3NE2TUlIsYMU59zDbf/+kiMQYVVpZlu8BAPcrEHw/0yb4AAAAAElFTkSuQmCC';
var NOWPLAYINGBG	= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAUCAIAAADDbMD2AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAnSURBVHjafIixDQAgDICA/3+spziY6OZAIDCzUqpSL8C3jwneB/YA2WAC6xD2JfoAAAAASUVORK5CYII=';
var PAUSEBTN		= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAIAAADZrBkAAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAACRSURBVHjavJIxCgQhDEV3wNbCxtLaymvbeSMPIIgXMPnZZrBxXcgUk/LB4yf8XLXWj37MGCPGqHJaawYAAJUmIkZEmFmlATAAnmjMTEQL5ZyttSGElNKJADguucNFfqSt2eEizGwAaLU7bc65aztchJmfLHkX8OJtp7r/F3CVUrz3qi8hopd/UkR67yrNOfcdAOtbxg3xXtyxAAAAAElFTkSuQmCC';
var PLAYBTN			= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAIAAADZrBkAAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAC+SURBVHjatNKxCoQwDAbgHPQFujq4OFQQHB0EB99/c3dxE8TFUfPnhh5Vqj3twXUqbb4mIX31fU/xS83znOd5lBnHUQEAEMVERIkIM0cxAArAL4yZt21zR13XEVFZljfMK3IYBrcviuJptjM2xni3zKwAnNkZZ1nmZ1vX9UsnDqdpume7LPK4lmUhoiRJXNhnACFmQdu2RHSMCfZmQdM0HgiO24K6ru2rTwdQVdVlhptx//lPisg0TVFMa/0eAA9IwQPsdW4sAAAAAElFTkSuQmCC';
var PROGRESSBAR		= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAASCAIAAAAVNSPrAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAuSURBVHjaZMqxDQAwEMLAiP0X+0mYApwq36Q4yYXPzAgQoLYrybZtJfm8D7gDAFlFNMcEr+GnAAAAAElFTkSuQmCC';
var SLIDER			= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAALCAYAAABYpyyrAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAA4SURBVHjaYly/fv0CAwODeAYGBobNmzenMDGgARYGBgaGt2/fwgUwVNBEgIWBgYHh4cOHuFUABgAwYAud/uKJAQAAAABJRU5ErkJggg==';
var VOLUMEBTN		= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAIAAADZrBkAAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAEMSURBVHjanFKxqoQwENwnthb+xKGFYGUhWFoI/qpgIfgB9hJsxMLGThAbSzObK3JInt69wzfVZDbD7G7yM44j3Ye9rqvnebc88zzbzMzMt2xKKVspBeCWjZktZsZnFEVxFZnZAiAvaNtWkzzPy7I8VZnZ0k2a6LpumiYAVVUByLJMEzPN1mm66WEYiGiaJiKSUqZpWtd1mqb6eMwGwGbmQ9IGjUPUxLS90vZ9v67rEDUx7wD41aSJL2lmk9u2EZHjOH/bzrMlSUJETdM4jiOlFEKEYfg27c1zx3G8bRuAIAgACCE0+fgAB6Io0mLf977vny4w85c/+Xg8rtXXSv7xlW2l1LIst2yu6z4HAKo9iSzRVtC1AAAAAElFTkSuQmCC';
var VOLUMESLIDERBG	= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAZCAIAAAB/8tMoAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAkSURBVHjafMcxEQAwEMMw2/y5hGIJ9H7QILalBqSeqvM/wBsA4D4ChiE+Tt4AAAAASUVORK5CYII=';

/********************************* Default CSS ********************************/
var CSS =
'.actions{background:#ababab url('+ACTIONSBG+');color:#797979;font:0.9em sans-serif;height:18px;padding-bottom:0;padding-top:3px;}'+
'.actions div{cursor:default;}                                                '+
'.cfBTN{float:left;height:18px;text-align:center;width:168px;}                '+
'.closeBTN{border-left:1px solid #9d9d9d;float:right;text-align:center;width:40px;}'+
'.controls{background-color:#d0d0d0;border:1px solid #c2c2c2;height:18px;}    '+
'.counter{color:#555;font-weight:700;padding: 2px;}                           '+
'.loopBTN{background:url('+LOOPBTN+') no-repeat;float:right;}                 '+
'.loopBTNActive{background:url('+LOOPBTNACTIVE+') no-repeat;float:right;display:block;}'+
'.muteBTN{background:url('+MUTEBTN+') no-repeat;}                             '+
'.nowPlaying{background:url('+NOWPLAYINGBG+') #e7e7e7 repeat-x;border:1px solid #eee;color:#848282;height:18px;overflow:hidden;padding-bottom:0;padding-left:3px;padding-top:3px;}'+
'.pauseBTN{background:url('+PAUSEBTN+') no-repeat;}                           '+
'.playBTN{background:url('+PLAYBTN+') no-repeat;}                             '+
'.playBTN,.volumeBTN,.loopBTN,.loopBTNActive,.pauseBTN,.muteBTN{border-left:1px solid #c2c2c2;border-right:1px solid #c2c2c2;float:left;height:18px;width:18px;}'+
'.pContainer{border:1px solid #eee;font:12px sans-serif;height:60px;padding:0;vertical-align:middle;width:250px;}                                       '+
'.progressBar{background:url('+PROGRESSBAR+') repeat-x;width:100px;}          '+
'.progressBarBG,.progressBar{border-left:1px solid #c2c2c2;border-right:1px solid #c2c2c2;float:left;height:18px;width:186px;}'+
'.saveBTN{border-right:1px solid #9d9d9d;float:left;}                         '+
'.saveBTN,.closeBTN{height:18px;}                                             '+
'.saveBTN,.closeButton{text-align:center;width:40px;}                         '+
'.saveBTN:hover,.cfBTN:hover,.closeBTN:hover,.actionsActive{background:#bebebe url('+ACTIONSBGACTIVE+');}'+
'.slider{background:url('+SLIDER+');height:11px;left:3px;position:relative;top:4px;width:4px;}'+
'.songTitle a{color:#555;}                                                    '+
'.songTitle a: hover{color:#888;text-decoration:none;}                        '+
'.volumeBTN{background:url('+VOLUMEBTN+') no-repeat;}                         '+
'.volumeBTN:hover .slider {display: block;}                                   '+
'.volumeBTN:hover .volumeSlider{background:url('+VOLUMESLIDERBG+') repeat-x;border-right:1px solid #9d9d9d;display:block;height:18px;left:19px;position:relative;width:60px;}    '+
'.volumeSlider{display:none;}                                                 '+
'.volumeSlider:hover{display:block;}                                          ';
style = document.createElement('style');
style.setAttribute('type', 'text/css');
style.innerHTML = CSS;
document.getElementsByTagName('head')[0].appendChild(style);
