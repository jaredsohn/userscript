// ==UserScript==
// @name			XKCD - Thread Link Adder
// @namespace		xkcd - thread link adder
// @description		Adds a link to the comic's thread
// @include			http://xkcd.com/*
// @include			http://www.xkcd.com/*
// ==/UserScript==

// version 0.02
// - Forwarded the Request Response using a function to reduce the number of line columns

insert = function (content)
	{
		response = content.responseText
	
		if (response.match(/topictitle/g).length > 1)
			{
				text = document.createTextNode('Discussion Threads for this comic: ')
				url = get
			}

		else
			{
				text = document.createTextNode('Discussion Thread for this comic: ')
				suffix = response.match('href="\.(.*?)&amp;hilit=.*?" class="topictitle"')[1]
				suffix = suffix.replace('&amp;','&')
				url = base + suffix
			}

		a = document.createElement('a')
		h3 = document.createElement('h3')

		a.setAttribute('style','cursor: help; display: inline !important;')
		a.setAttribute('href',url)
		a.innerHTML = url

		h3.appendChild(text)
		h3.appendChild(a)

		document.getElementsByTagName('h3')[1].parentNode.appendChild(h3)
	}

if (!!document.URL.match(/xkcd.com\/[0-9]*?/i))
	{
		title = document.title.match(/: (.*$)/i)[1]
		base = 'http://echochamber.me'
		extra = '"&terms=all&fid[]=7&sc=0&sf=titleonly&sr=topics&sk=t&sd=d&st=0&ch=1000&t=0&submit=Search'

		while (title.match(' '))
			title = title.replace(' ','+')

		get = base + '/search.php?keywords="+' + title.replace('-','+') + extra

		GM_xmlhttpRequest
				({
					method:		'GET',
					url:		get,
					headers:	{ 'User-Agent':	'monkeyagent' },
					onload:		insert
				})
	}
