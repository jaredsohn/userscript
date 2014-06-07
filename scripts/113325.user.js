// ==UserScript==
// @name           Yolk Chicago
// @namespace      Yolk Chicago
// @include        http://yolkchicago.net/*
// ==/UserScript==

function ajax()
{
	var xhr = new XMLHttpRequest()
	xhr.open('get', this.url, true)
	var _this = this
	xhr.send()
	xhr.onreadystatechange = function() {		
		if(xhr.readyState == 4)
			_this.run(xhr.responseText)				
	}	
}

function Icon(node) 
{
	this.a = document.createElement('a')
	this.div = document.createElement('div')
	this.img = document.createElement('img')
	this.url = node.getElementsByTagName('a')[0].href
	this.text = ''
	this.initialize()
	node.getElementsByTagName('a')[0].setAttribute('style', 'display: inline')
	node.setAttribute('style', 'text-align: left');
	node.appendChild(this.a)
}

Icon.prototype = {
	initialize: function()
	{
		this.a.setAttribute('class', 'prnode')
		this.div.setAttribute('class', 'msg msg2 prediv')
		this.img.src = 'http://img15.imageshack.us/img15/4337/loupey.jpg'
		this.img.alt = 'aperçu'
		this.img.setAttribute('width', '80%')
		var _this = this
		this.img.addEventListener('mouseover', function()
		{
			_this.div.innerHTML = '<img  style="margin: auto; display: block" src="http://s3.noelshack.com/uploads/images/20188032684831_loading.gif" alt="Loading" width="35%" />'
			ajax.call(_this)
		},
		false)
		this.a.appendChild(this.img)
		this.a.appendChild(this.div)
	},
	run: function(data)
	{
		var prems = data.split(/<div id="message_[0-9]+" class="msg msg(1|2)">/)
		this.text = prems[2]
		if(this.text.split('<li').length < 4)
			this.text = prems[4]
		this.text = this.text.split('</div>')[0]
		this.div.innerHTML = this.text
		var post = this.div.getElementsByClassName('post')[0]
	}
}

var script = 
{
	run: function() {
		var nodes = document.evaluate('//a[@class="ltopic"]/..', document, null, 7, null)
		for ( var i=0 ; i < nodes.snapshotLength; i++ )
			new Icon(nodes.snapshotItem(i))	
	}
}

script.run()
GM_addStyle('.prediv{position: absolute; z-index: 1000; width: 500px; max-height: 400px; overflow-y: scroll; display: none;}'
	+ '.prediv .post, .prediv .pseudo{text-align: left; color: black; font-weight: normal; font-family: Arial} '
	+ '.prediv a {display: inline !important} '
	+ '.prediv .date {color: black}'
	+ '.prnode {display: none !important; float: right} '
	+ '.tr1:hover .prnode, .tr2:hover .prnode {display: inline !important} '
	+ '.prnode:hover .prediv{display: block}'
)