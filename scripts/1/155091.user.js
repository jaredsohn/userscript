// ==UserScript==
// @name            JVChatIgnore
// @namespace       ignore
// @description		Fonction ignoré sur JVChat !
// @version			1.1
// @include         http://www.jeuxvideo.com/*
// ==/UserScript==

var IO = {
	add: function(value)
	{
		var pseudos = this.getAll()
		pseudos.push(value)
		localStorage.setItem('banned', pseudos.join(','))		
	},
	remove: function(value)
	{
		var pseudos = this.getAll()
		var tmp = []
		for(var i = 0; i < pseudos.length; i++)
			if(pseudos[i] != value)			
				tmp.push(pseudos[i])			
		localStorage.setItem('banned', tmp.join(','))	
	},
	clear: function()
	{
		localStorage.removeItem('banned')
	},
	getAll: function()
	{
		return localStorage.getItem('banned') ? localStorage.getItem('banned').split(',') : []
	},
	exists: function(pseudo)
	{
		var psd = IO.getAll()
		for(var i = 0; i < psd.length; i++)
			if(psd[i] == pseudo)
				return true
		return false
	}
}

function Post(node)
{
	this.node = node
	this.pseudo = node.getElementsByTagName('strong')[0].textContent.toLowerCase()
	this.message = node.getElementsByClassName('post')[0]
	this.icon = document.createElement('a')
	this.initialize()
}

Post.prototype = {
	initialize: function()
	{
		var _this = this
		this.icon.addEventListener('click', function()
		{
			if(IO.exists(_this.pseudo))
			{
				IO.remove(_this.pseudo)	
			}
			else
			{
				if(confirm('Voulez-vous vraiment ignorer ' + _this.pseudo + '?'))
					IO.add(_this.pseudo)
			}
			location.reload()
		}, false)
		
		this.icon.setAttribute('style', 'cursor: pointer; margin-right: 3px;')
		this.node.getElementsByClassName('pseudo')[0].appendChild(this.icon)
		if(IO.exists(this.pseudo))
		{
			this.icon.innerHTML = '<img src="http://s3.noelshack.com/uploads/images/9788694412662_voir.gif" alt="Déban" />'
			this.message.innerHTML = '<span style="font-style: italic">Membre ignoré!</span>'
			this.node.style.backgroundColor = '#EDEDED'
		}
		else
			this.icon.innerHTML = '<img src="http://s3.noelshack.com/uploads/images/18934928287803_ignorer.gif" alt="Ban" />'
	}
}

function Topic(node, pseudo)
{
	this.node = node
	this.pseudo = pseudo
	this.topic = node.getElementsByClassName('ltopic')[0]
	this.icon = document.createElement('a')
	this.initialize()
}

Topic.prototype = {
	initialize: function()
	{
		var _this = this
		this.icon.addEventListener('click', function()
		{
			IO.remove(_this.pseudo)
			location.reload()
		}, false)
		
		this.icon.innerHTML = ' <img src="http://s3.noelshack.com/uploads/images/9788694412662_voir.gif" alt="Déban" />'
		this.topic.innerHTML = '<span style="font-style: italic">Membre ignoré!</span>'

		this.icon.setAttribute('style', 'display: inline; cursor: pointer; float: right')
		this.topic.setAttribute('style', 'display: inline')
		this.topic.parentNode.setAttribute('style', 'text-align: left');
		this.topic.parentNode.appendChild(this.icon)
		this.topic.parentNode.parentNode.style.backgroundColor = '#EDEDED'
	}
}

Ignore = {
	topic: function(method)
	{
		var nodes = document.evaluate('//tr[@class="tr1" or @class="tr2"]', document, null, 7, null)
		for (var i=0 ; i < nodes.snapshotLength; i++ )
		{
			var pseudo = nodes.snapshotItem(i).getElementsByClassName('pseudo')[0].textContent.toLowerCase()
			if(IO.exists(pseudo))
				new Topic(nodes.snapshotItem(i), pseudo)	

		}
	},
	post: function()
	{
			var nodes = document.evaluate('//div[@class="msg msg1" or @class="msg msg2"]', document, null, 7, null)
			for (var i=0 ; i < nodes.snapshotLength; i++ )
				new Post(nodes.snapshotItem(i))			
	}
}

OptionPanel = {
	initialize: function()
	{
		var _this = this
		var container = document.getElementById('liste_forums').parentNode
		var p = document.createElement('div')
		p.addEventListener('click', function() {
			if(!document.getElementById('igdiv'))
			{
				var btRemove = document.createElement('button')
				var btClear = document.createElement('button')
				var psdArea = document.createElement('select')
				var mainDiv = document.createElement('div')				
				
				var psd = IO.getAll()
				for(var i = 0; i < psd.length; i++)
					psdArea.add(new Option(psd[i], psd[i]), null)
					
				
				
				btRemove.textContent = 'Supprimer'
				btRemove.addEventListener('click', function()
				{
					if(psdArea.selectedIndex != -1) 
						if(confirm("Voulez-vous vraiment supprimer ce pseudo de la liste?")) 
						{
							IO.remove(psdArea.options[psdArea.selectedIndex].text)
							psdArea.remove(psdArea.selectedIndex)
						}
				}, false)
		
				btClear.textContent = 'Clear'
				btClear.addEventListener('click', function()
				{
					IO.clear()
					var i = 0;
					while(psdArea.length)
						psdArea.remove(psdArea.length - 1)
				}, false)
				
				psdArea.setAttribute('multiple', 'true')
				mainDiv.appendChild(psdArea)
				mainDiv.appendChild(btRemove)
				mainDiv.appendChild(btClear)
				mainDiv.setAttribute('id', 'igdiv')
				container.appendChild(mainDiv)
			}
			else
			{
				document.getElementById('igdiv').style.display = document.getElementById('igdiv').style.display == 'none' ? 'block' : 'none'
			}
		
		
		
		}, false)
		p.innerHTML = '<a style="cursor: pointer">JVIgnorer Option</a>'
		p.setAttribute('class', 'lien_base')
		container.appendChild(p)

	}
}

var script = {
	run: function()
	{
		OptionPanel.initialize()
		if(location.href.match(/http:\/\/www\.jeuxvideo\.com\/forums\/0-.*/))
			Ignore.topic()
		else
			Ignore.post()
	}
}

script.run()

GM_addStyle('#igdiv{margin-left: 25px}'
+'#igdiv select {float: left; width: 150px}'
+'#igdiv button{width: 100px}')