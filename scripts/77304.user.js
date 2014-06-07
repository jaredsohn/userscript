// ==UserScript==
// @name NZBMatrix Inline Comment Viewer :: redux
// @namespace http://userscripts.org/users/167815
// @include *nzbmatrix.com*
// ==/UserScript==

// ---------- COMMENT RETRIEVAL ----------

function fetch(e)
{
	reset();
	show(popupWindow);
	get('#page').href = this.href;
	var page = GM_xmlhttpRequest({url:this.href,method:'GET',onload: function(page) { retrieve(page); }});
	e.preventDefault();
}

function retrieve(page)
{
	var comments = page.responseText.replace(/[\r\n]/g,'').match(/<div class="bubble">(.+?)<\/div>/gi);
	if (comments)
	{
		hide(get('#fetching'));
		show(get('#container'));
		for each (var x in comments) get('#container').innerHTML += x;
		center();
	}
	else get('#fetching').innerHTML = 'No comment found';
}

// ---------- POPUP L&F ----------

GM_addStyle('.nzbComments {'
		+ 'display: none;'
		+ 'position: fixed;'
		+ 'background: white;'
		+ 'border: 1px black groove;'
		+ 'max-width: ' + parseInt(window.innerWidth*0.6) + 'px; }'

	+ ' .nzbComments #container {'
		+ 'background-color: white;'
		+ 'overflow-y: scroll;'
		//+ 'max-height: ' + parseInt(document.body.clientHeight) + 'px;'
		+ 'padding: 5px 5px 0px 5px; }'

	+ ' .nzbComments #dragger { text-align: right; cursor: move; background-color: #000000; color: #ffffff; }'	
	+ ' .nzbComments #close, #page { cursor: pointer; font-size: 9px; font-weight: 800; color: #ffffff; }'
	+ ' .nzbComments #close:hover, #page:hover { color: #c0c0c0 }'
);

function center()
{
	popupWindow.style.right = Math.abs(parseInt((window.innerWidth-popupWindow.offsetWidth)/2)) + 'px';
	popupWindow.style.bottom = Math.abs(parseInt((window.innerHeight-popupWindow.offsetHeight)/2)) + 'px';
}

function reset()
{
	get('#fetching').innerHTML = 'Fetching comments...';
	get('#container').innerHTML = '';
	hide(get('#container'));
	show(get('#fetching'));
	center();
}

// ---------- DRAG&DROP ----------

function startDragging(e)
{
	x = e.clientX; y = e.clientY;
	nzbX = parseInt(popupWindow.style.right); nzbY = parseInt(popupWindow.style.bottom); 
	document.addEventListener('mousemove',drag,false);
	document.addEventListener('mouseup',stopDragging,false);
	e.preventDefault();
}

function drag(e)
{
	x2 = e.clientX; y2 = e.clientY;
	popupWindow.style.right = -x2 + nzbX + x;
	popupWindow.style.bottom = -y2 + nzbY + y;
}

function stopDragging(e)
{
	document.removeEventListener('mousemove',drag,false);
	document.removeEventListener('mouseup',stopDragging,false);
}

// ---------- MISC ----------

function get(exp) { return popupWindow.querySelector(exp); }
function show(element) { element.style.display = 'block'; }
function hide(element) { element.style.display = 'none'; }

// ---------- POPUP CREATION ----------

var popupWindow = document.createElement('div');
popupWindow.className = 'nzbComments';
popupWindow.innerHTML = '<div id="dragger"><a id="page">go to page</a> | <a id="close">close</a></div><div id="fetching"></div><div id="container"></div>';
document.body.appendChild(popupWindow);
reset();

// ---------- EVENT LISTENERS ----------

var targets = document.evaluate('.//a[contains(@href,"nzb-comment.php?id=")]',document.body,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null), x;
while (x=targets.iterateNext()) {
	x.addEventListener('mouseover',fetch,false);
	x.addEventListener('mouseout', function() { hide(popupWindow); }, false);
}
get('#dragger').addEventListener('mousedown',startDragging,false);
get('#close').addEventListener('click',function() { hide(popupWindow); },false);