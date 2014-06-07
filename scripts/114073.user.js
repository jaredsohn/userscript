// ==UserScript==
// @name           FA_Toggle_Filter
// @namespace      http://mywebsite.is-a-geek.com/gmscripts/
// @description    Toggle between general and mature/adult artwork
// @include        http*://www.furaffinity.net/*
// @exclude        http://forums.furaffinity.net/*
// ==/UserScript==

function $(i,p){if(!p)p=document;return p.getElementById(i);}
function _$(i,p){if(!p)p=document;var e=p.getElementById(i);if(e){e.parentNode.removeChild(e);return true;}return false;}
function $c(c,p){if(!p)p=document;return p.getElementsByClassName(c);}
function $t(t,p){if(!p)p=document;return p.getElementsByTagName(t);}
function $n(n,p){if(!p)p=document;return p.getElementsByName(n);}
function $$(t,a,c){var e=document.createElement(t);if(a){for(var i in a){e.setAttribute(i,a[i]);}}if(c){for(var i in c){e.appendChild(c[i]);}}return e;}
function $$t(t){return document.createTextNode(t);}

function findNode(tag, attr, regex)
{
	var els = $t(tag);
	for(var i=0; i<els.length; i++)
	{
		var a = els[i].getAttribute(attr);
		if(a && regex.test(a)) return els[i];
	}
}

function parseTag(html)
{
	var tagname, attrbits = [], tagtxt = '';
	var tagbits = html.match(/^<([a-z]+)\s*(.*?)>(?:(.*?)(?:<\/\1>))?/i);
	tagname = tagbits[1];
	if(tagbits[2]) attrbits = tagbits[2].match(/[a-z]+=["'].*?["']/gi);
	if(tagbits[3]) tagtxt = tagbits[3];

	var attrs = {};
	for(var pair in attrbits)
	{
		var bits = attrbits[pair].split(/=/);
		attrs[bits[0].toLowerCase()] = bits[1].replace(/['"]/g, '');
	}
	return {'name':tagname, 'attrs':attrs, 'txt':tagtxt};
}

function getSettings()
{
	h = new XMLHttpRequest();
	h.open('get', '/controls/settings', false);
	h.send(null);

	var html = h.responseText.toString().replace(/[\n\r]+/g, ' ');
	var form_html = html.match(/<form\s.*?(?:name="MsgForm").*?>(.*?)(?:<\/form>)/i)[1];
	var data = {};
	
	// inputs
	var inputs = form_html.match(/<input\s[^>]*(?:type=["']?(?:hidden|text|password|checkbox)["']?).*?>/gi);
	for(var i in inputs)
	{
		var tag = parseTag(inputs[i]);
		if(tag['attrs']['type'] != 'checkbox' || tag['attrs']['checked'])
		{
			data[tag['attrs']['name']] = tag['attrs']['value'];
		}
	}
	
	// selects
	var selects = form_html.match(/<select.*?>.*?(?:<\/select>)/gi);
	for(var s in selects)
	{
		var stag = parseTag(selects[s]);
		var options = (stag['txt']).match(/<option\s[^>]*(?:selected).*?>.*?(?:<\/option>)/gi);
		for(var o in options)
		{
			var otag = parseTag(options[o]);
			data[stag['attrs']['name']] = otag['attrs']['value'];
		}
	}
	return data;
}


function toggleRating(evt) //0=on (no porn), 1=off (porn)
{
	evt.preventDefault();
	var data = getSettings();
	data['oldpassword'] = GM_getValue('fapass');
	if(!data['oldpassword']) data['oldpassword'] = prompt("FA requires your password to change any profile settings. Enter it here and it will be stored in your browser config file (prefs.js) for future use (in plain text just so you know)\n\nTo view it, enter about:config in the address bar and type FA_Toggle in the filter. You can remove it by right clicking the line and selecting Reset.",'');
	
	data['viewmature'] = (data['viewmature'] == '1')?0:1;
	h = new XMLHttpRequest();
	h.open('post', 'https://www.furaffinity.net/controls/settings/', true);
	h.onreadystatechange = function()
	{
		if(h.readyState != 4 || h.status != 200) return;
		if(/Account settings have been updated/i.test(h.responseText))
		{
			GM_setValue('fapass', data['oldpassword']);
			GM_setValue('fafilter', data['viewmature']?'OFF':'ON');
			colorLnk(data['viewmature']?'OFF':'ON');
			if(confirm("You are now viewing FurAffinity "+(data['viewmature']?"in PORN MODE\n\n Please remember to wash your hands.":'with the filter on.')+"\n\nReload the page?"))
					window.location.reload();
		}
		else if(/Invalid account password/i.test(h.responseText))
		{
			GM_setValue('fapass', '');
			alert('Invalid password!');
		}
		else
			alert('Oh dear, that didn\'t work');
	}
	var data_arr = [];
	for(var i in data)
	{
		data_arr.push(encodeURIComponent(i)+'='+encodeURIComponent(data[i]));
	}
	var data_str = data_arr.join('&');
	h.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	h.setRequestHeader("Content-length", data_str.length);
	h.setRequestHeader("Connection", "close");
	h.send(data_str);
	
	removePorn();
}

function removePorn()
{
	els_td = $t('td');
	for(var i in els_td)
	{
		if(/^#(?:697cc1|971c1c)$/i.test(els_td[i].bgColor))
		{
			els_td[i].innerHTML = 'an innocent colored square';
		}
	}
}

function panic()
{
	var el_body = $t('body')[0];
	el_body.style.backgroundColor = '#FFFFFF';
	el_body.innerHTML = '';
	el_body.appendChild(
		$$('div', {'style':'text-align:center;'}, [
			$$('img', {'src':'data:image/png;base64,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'}),
			$$('br'),
			$$('span', {'style':'font-size:15pt;color:#B0B0B0;'}, [$$t("I was just doing my homework"), $$('br'), $$('br'), $$t('This is a website about studying and things.')])
		])
	);
}

function colorLnk(filter)
{
	if(!filter) return;
	$('lnk_toggle').style.color = '#'+((filter == 'OFF')?'FF0000':'8888FF');
}


(function(){
	var el_tog = $$('a', {'id':'lnk_toggle' ,'href':'#','style':'margin-right:20px;'}, [$$t('Toggle Filter')]);
	el_tog.addEventListener('click', toggleRating, false);
	
	el_logout = findNode('a', 'href', /\/logout\/?$/);
	el_logout.parentNode.insertBefore(el_tog, el_logout);

	var filter = GM_getValue('fafilter');
	if(filter && filter == 'OFF')
	{
		var el_pan = $$('a', {'id':'lnk_panic' ,'href':'#','style':'margin-right:20px;'}, [$$t('Panic Button')]);
		el_pan.addEventListener('click', panic, false);
		el_logout.parentNode.insertBefore(el_pan, el_tog);
	}
	colorLnk(filter);
})();


