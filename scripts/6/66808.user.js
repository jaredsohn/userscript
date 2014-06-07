// ==UserScript==
// @name           North Atlantic Defense Coalition - Alliance Stats Updater
// @namespace      meh
// @description    Visit the NADC alliance stats page and it will update the our script with the latest details. 
// @include        http://www.cybernations.net/stats_alliance_stats_custom.asp?Alliance=North%20Atlantic%20Defense%20Coalition
// ==/UserScript==


// commands
GM_registerMenuCommand('Update Stats', toPastebin);



// textarea selection...
var textAreaSelection = null;
document.addEventListener('select', textAreaHandler, false);
function textAreaHandler(e)
{
	var ta = e.target;
	textAreaSelection = ta.value.substr(ta.selectionStart, ta.selectionEnd-ta.selectionStart);
	ta.addEventListener('blur', cleanTA, false);
}
function cleanTA(e)
{
	textAreaSelection = null;
	e.target.removeEventListener('blur', cleanTA, false);
}




//copy selection to pastebin
function toPastebin(e)
{
	var txt = null;
	var nohtml = getSelText();
var html = getSelText();

	
	if(textAreaSelection)
		txt = textAreaSelection;
	else if( html == nohtml )
		txt = html;
		
	}
	
	
	}
	
	debug('Copying to pastebin...');

	GM_xmlhttpRequest({
		method: "POST",
		url: "http://p.gpdx.com/submit.php",
		headers: { "Content-type" : "application/x-www-form-urlencoded" },
		data: encodeURI('input_text='+txt+''),
		onload: function(e){
			getId('debugg').innerHTML = '';
			debug('Copied text:');
			debug(txt);
			closeTimeout();
		}
	});
	
	cleanup();
}





// from   http://www.codetoad.com/javascript_get_selected_text.asp
function getSelText()
{
	var txt = null;
	if (window.getSelection)
		txt = document.documentElement.innerHTML();
	else if (document.getSelection)
		txt = document.documentElement.innerHTML();
	else if (document.selection)
		txt = document.documentElement.innerHTML();
	else 
		return null;
	return txt;
}




var ms = 6000;
function closeTimeout()
{
	ms -= 1000;
	if(ms<=0){
		ms = 6000;
		var d = getId('divdebug');
		d.parentNode.removeChild(d);
		return;
	}
	getId('closedebug').value = 'close ('+(ms/1000)+')';
	setTimeout(closeTimeout,ms)
}


function cleanup()
{
	textAreaSelection = null;
}














function createElement(type, attrArray, evtListener, html)
{
	var node = document.createElement(type);

	for (var attr in attrArray) if (attrArray.hasOwnProperty(attr)){
		node.setAttribute(attr, attrArray[attr]);
	}

	if(evtListener){
		var a = evtListener.split(' ');
		node.addEventListener(a[0], eval(a[1]), eval(a[2]));
	} 
 
	if(html) 
		node.innerHTML = html;
	
	return node;
}

function getId(id, parent){
	if(!parent)
		return document.getElementById(id);
	return parent.getElementById(id);	
}

function getTag(name, parent){
	if(!parent)
		return document.getElementsByTagName(name);
	return parent.getElementsByTagName(name);
}

function xp(p, context) {
  if (!context) 
	context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) 
	arr.push(item);
  return arr;
}

//TODO:  print debugObj with added variables
function debug(str)
{
	
	var d = document.getElementById('debugg');
	if(!d){
		var div = document.createElement('div');
		div.setAttribute('id','divdebug');
		div.setAttribute('style', 'background-color:#000000; position:fixed; bottom:3px; left:3px;  padding:3px; z-index:9999;');
		
		var closeButton = document.createElement('input');
		closeButton.setAttribute('id','closedebug');
		closeButton.setAttribute('type', 'button');
		closeButton.setAttribute('value', 'close');
		closeButton.setAttribute('onClick', 'this.parentNode.parentNode.removeChild(this.parentNode);');
		
		d = document.createElement('textarea');
		d.setAttribute('id','debugg');
		d.setAttribute('style',"height:200px; min-width:400px;");
		
		div.appendChild(d);
		div.appendChild(document.createElement('br'));
		div.appendChild(closeButton);
		document.body.appendChild(div);
	}
	d.innerHTML += '\n'+str;
	d.scrollTop = d.scrollHeight;
}