// ==UserScript==
// @name        JVTopics Préférés
// @namespace   JVScript
// @include     http://www.jeuxvideo.com/forums/0*
// @include     http://www.jeuxvideo.com/forums/1*
// @include     http://www.jeuxvideo.com/forums/3*
// @version     2
// ==/UserScript==


var IO = {
	add: function(forum, topic, nom)
	{
		localStorage.setItem('pic_pref:' + forum + ':' + topic, nom)		
	},
	remove: function(forum, topic)
	{	
		localStorage.removeItem('pic_pref:' + forum + ':' + topic)	
	},
	clear: function()
	{
		var length = localStorage.length
		for(var i = 0; i < length; i++) {
			var key = localStorage.key(i)
			if(key.match(/^pic_pref/))
				localStorage.removeItem(key)
		}
	},
	getAll: function()
	{
		var length = localStorage.length
		var tab = []
		for(var i = 0; i < length; i++) {
			var key = localStorage.key(i)
			if(key.match(/^pic_pref/)) {
				var f = key.split(':')[1]
				var t = key.split(':')[2]
				tab.push({ forum: f, topic: t, nom: localStorage.getItem(key)})
			}
		}
		return tab
	},	
	exists: function(forum, topic)
	{
		var length = localStorage.length
		for(var i = 0; i < length; i++) {
			var key = localStorage.key(i)
			if(key.match(/^pic_pref/))
				if(key == 'pic_pref:' + forum + ':' + topic)
					return true
			}
		return false
	}
}

function Topic(f, t, n) {
	this.nom = n
	this.forum = f
	this.topic = t
	this.li = document.createElement('li')
	this.link = document.createElement('a')
	this.del = document.createElement('a')
	this.initialize()
}

Topic.prototype.initialize = function() {
	this.link.setAttribute('href', 'http://www.jeuxvideo.com/forums/1-' + 
	this.forum + '-' + this.topic + '-1-0-1-0-0.htm')
	this.link.innerHTML = this.nom
	var _this = this
	this.del.setAttribute('class', 'sup_pref')
	this.del.setAttribute('title', 'Supprimer ce topic?')
	
	this.del.addEventListener('click', function() {
		IO.remove(_this.forum, _this.topic)
		_this.li.setAttribute('style', 'display: none')
	}, false)
	
	this.li.appendChild(this.link)
	this.li.appendChild(this.del)
}

Topic.prototype.toHTMLNode = function() {
	return this.li
} 

var Utils = {
	getIds : function() {
		var link = document.location.toString()
		var matches = link.match(/http:\/\/www\.jeuxvideo\.com\/forums\/(1|3)-([0-9]+)-([0-9]+).*/)
		var sujet = document.getElementsByClassName('sujet')[0].textContent;
		var nom = sujet.match(/^Sujet : «(.+)»$/)
		return {forum: matches[2], topic: matches[3], nom: nom[1]}
	}
}

var script = {
	initialize: function() {
		var div = document.createElement('div')
		div.setAttribute('class', 'bloc3')
		div.setAttribute('id', 'topic_pre')
		div.innerHTML = '<h3 class="titre_bloc">'
				+'<span id="bloc_forums_img">Mes Topics Préférés</span>'
				+'</h3>'
				+'<div class="bloc_inner">'
				+'<ul id="liste_topic_pref" class="liste_liens"></ul></div>'
		var blocPub = document.getElementById('pub_carre1')
		document.getElementById('col2').insertBefore(div, blocPub)
		this.run()
	},
	run: function() {
		if(!document.location.toString().match(/http:\/\/www\.jeuxvideo\.com\/forums\/0/)) {
			var idCurrentTopic = Utils.getIds()
			if(!IO.exists(idCurrentTopic.forum, idCurrentTopic.topic))
				this.putClover()
		}
		var ids = IO.getAll();
		var topics = []
		for(var i = 0; i < ids.length; i++)
			topics.push(new Topic(ids[i].forum, ids[i].topic, ids[i].nom))
		
		var bloc = document.getElementById('liste_topic_pref')
		for(var i = 0; i < topics.length; i++)
			bloc.appendChild(topics[i].toHTMLNode())
	},
	putClover: function() {
		var a = document.createElement('a')
		a.addEventListener('click', function() {
			var ids = Utils.getIds()
			IO.add(ids.forum, ids.topic, ids.nom)
			document.getElementById('liste_topic_pref').appendChild(
				new Topic(ids.forum, ids.topic, ids.nom).toHTMLNode()
			)
			a.setAttribute('style', 'display: none')
		}, false)
		a.setAttribute('class', 'pref_icon')
		a.innerHTML = '<img src="http://image.noelshack.com/fichiers/2012/29/1342695153-clover.png" />'
		var spot = document.getElementById('forum_pref')
		spot.appendChild(a)
	}	
}

script.initialize()

if (typeof GM_addStyle == "undefined") { 
	function GM_addStyle(css) { 
		var head = document.getElementsByTagName('head')[0]
		var node = document.createElement("style")
		node.setAttribute('type', 'text/css')
		node.appendChild(document.createTextNode(css))
		head.appendChild(node)
	} 
} 

GM_addStyle('.pref_icon img { right: 18px !important; top: 6px !important; cursor: pointer; }'
+'#liste_topic_pref li:hover a.sup_pref {'
+'background: transparent url(http://image.jeuxvideo.com/css_img/defaut/bt_forum_supp_pref.png) no-repeat scroll right top;'
+'display: inline;'
+'height: 10px;'
+'float: right;'
+'width: 10px;}')