// ==UserScript==
// @name           Sticker Picker
// @namespace      KoLCtH
// @description    Kingdom of Loathing UI Enhancement. Makes putting scratch n sniff stickers on weaponry a breeze
// @include        *kingdomofloathing.com/inventory.php*
// @include        http://127.0.0.1*inventory.php*
// @include        file://*inventory.php*
// ==/UserScript==
if (!$('#curequip'))
	return
var bedazzleLink = $('a:contains("[bedazzle]")')
if (!bedazzleLink)
	return
bedazzleLink.addEventListener('click', buildBedazzler, false)

function buildBedazzler(e)
{
	e.preventDefault()
	var stickerChoice = $('#stickerChoice')
	if (stickerChoice)
	{
		stickerChoice.style.display = stickerChoice.style.display == 'none' ? 'block' : 'none'
		return
	}
	var offset = getOffset(this)
	var holder = document.body.appendChild(CE('div', 'id|stickerChoice', 'style|position:absolute; top:' + (offset[1] + 20) + 'px; left:' + (offset[0] - 10) + 'px; border:blue 2px solid; outline:white 1px solid; background-color:white; text-align:center;'))
	holder.appendChild(CE('div', 'style|background-color:blue; color:white; font-weight:bold', 'text|Loading...'))
	var buttonClose = holder.appendChild(CE('div', 'class|closeButton', 'text|×', 'style|position:absolute; top:0px; right:-1px; cursor:default; font-size:28pt; font-weight:bold; line-height:.4; height:.45em; width:.6em; background-color:white; border:black 1px solid; overflow:hidden; z-index:55;'));
	buttonClose.addEventListener('click', function () {this.parentNode.style.display = 'none';}, false);	
	GM_get('/bedazzle.php', massageResponse)

	function stick()
	{
		$('#stickerChoice').firstChild.textContent = 'Loading...'			
		var pwd = unsafeWindow.pwd
		var slot = this.parentNode.querySelector('[name=slot]').value
		var sticker = this.parentNode.querySelector('[name=sticker]').value
		var URL = '/bedazzle.php?action=stick&pwd=' + pwd + '&slot=' + slot + '&sticker=' + sticker
		GM_get(URL, massageResponse)
	}
	
	function massageResponse(text)
	{
		var temp = CE('div')
		temp.innerHTML = text
		var forms = $('form', true, temp)
		if (forms.length > 0)
		forms.forEach(function (f) {
			var td = $('td', false, f.parentNode)
			f.parentNode.insertBefore(td, f)
			f.parentNode.removeChild(f)
			var button = $('.button', false, td)
			button.type = 'button'
			button.addEventListener('click', stick, false)
		})
		var links = $('a', true, temp)
		if (links.length > 1)
		links.forEach(function (a)
		{
			if (a.textContent != '[Peel Off]')
				return
			a.addEventListener('click', function (e)
			{
				e.preventDefault()
				$('#stickerChoice').firstChild.textContent = 'Loading...'			
				GM_get(this.href, massageResponse)
			}, false)
		})
		var holder = $('#stickerChoice')
		if (holder.childNodes[5])
		{
			//console.log(holder.childNodes[5], holder.childNodes[6])
			holder.removeChild(holder.childNodes[5])
			holder.removeChild(holder.childNodes[5])
		}
		var centers = $('center', true, temp)
		//console.log(centers[centers.length - 1].childNodes[1])
		if (!$('#uni'))
		{
			var uni = holder.appendChild(CE('input', 'id|uni', 'class|button', 'type|button', 'value|Triple Unicorn'))
			uni.addEventListener('click', triple, false)
			var upc = holder.appendChild(CE('input', 'id|upc',  'class|button', 'type|button', 'value|Triple UPC'))
			upc.addEventListener('click', triple, false)
			holder.appendChild(CE('br'))
		}
		holder.appendChild(centers[centers.length - 1].childNodes[1])
		var fold = holder.appendChild(centers[centers.length - 1].childNodes[2])
		fold.addEventListener('click', function (e)
		{
			e.preventDefault()
			$('#stickerChoice').firstChild.textContent = 'Folding...'			
			GM_get(this.href, massageResponse)
		}, false)
		holder.firstChild.textContent = 'Bedazzle!'			
		holder.style.left = (offset[0] - 250) + 'px'
	}
	
	function triple()
	{
		var which = this.value.substr(7)
		if (which == 'UPC')
			var sticker = 3511
		else if (which == 'Unicorn')
			var sticker = 3509
		var pwd = unsafeWindow.pwd
		var currentStickers = $('a', true, this.parentNode.childNodes[5])
		if (currentStickers.length > 0)
		currentStickers.forEach(function (s, n)	{
			GM_get(s.href, null)
		})
		for (var n=1;n<4;n++)
		{
			var URL = '/bedazzle.php?action=stick&pwd=' + pwd + '&slot=' + n + '&sticker=' + sticker
			GM_get(URL, massageResponse)
		}
	}
}


function getOffset(node)
{
	var X = 0, Y = 0
	while (node.offsetParent)
	{
		X += node.offsetLeft
		Y += node.offsetTop
		node = node.offsetParent
	}
	return [X, Y]
}

function CE(tag/*,attributes*/)
{
	var node = document.createElement(tag)
	for (var i=1,len=arguments.length;i<len;i++)
	{
		var attr = arguments[i].split('|')
		if (attr[0] == 'text')
			node.textContent = attr[1]
		else
			node.setAttribute(attr[0], attr[1])
	}
	return node
}

function $(selector, all, scope)
{
	scope = scope || document
	if (selector.indexOf(':contains') != -1)
	{
		var test = selector.match(/([^:]+):contains\(["'](.+)["']\)/)
		var res = scope.querySelectorAll(test[1])
		for (a in res)
		{
			if (res[a].textContent && res[a].textContent.indexOf(test[2]) != -1)
				return res[a]
		}
	}
	else if (all)
		return Array.slice.call(scope.querySelectorAll(selector))
	else
		return scope.querySelector(selector)
}

function GM_get(target, callback) {
	if (target.indexOf('http') == -1)
		target = 'http://' + window.location.host + target
	GM_xmlhttpRequest({
		method: 'GET',
		url: target,
		onload: function (details) {
			if (typeof callback == 'function')
				callback(details.responseText);
		}
	});
}
