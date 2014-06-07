// Twitter Hashtag Ignore
// version 0.3
// 2008-01-25
// Copyright (c) 2009, August Lilleaas
// Released under the MIT license
// http://www.opensource.org/licenses/mit-license.php
//
// ==UserScript==
// @name           Twitter Hashtag Ignore
// @namespace      http://www.twitter.com/*
// @description    Ignore tweets that contains hashtags you specify.
// @include        http://twitter.com/
// @include        http://twitter.com/*
// @include				 http://www.twitter.com/
// @include				 http://www.twitter.com/*
// ==/UserScript==


function TwitterHashtagIgnore(){
	var timeline = document.getElementById('timeline')
	this.statuses = timeline.getElementsByClassName('hentry status')
	this.ignores = []
	this.cookieName = 'twitter_hashtag_ignore'

	this.initView()
	this.initDatabase()
}

TwitterHashtagIgnore.prototype = {
	initDatabase: function(){
		if (document.cookie && document.cookie != '') {
			if (!this.readCookie()) {
				this.writeCookie()
			}
			this.readDatabase()
		} else {
			alert("There was an error initializing the cookie used for data storage by the Twitter Hashtag Ignore greasemonkey extension.")
		}
	},
	
	readDatabase: function(){
		var cookieData = this.readCookie()
		if (cookieData != '') {
			this.ignores = cookieData.split('||')
		}
		this.rebuildView()
	},
	
	removeIgnore: function(ignore){
		var newIgnores = []
		for (var i = 0; i < this.ignores.length; i++) {
			var oldIgnore = this.ignores[i]
			if (ignore == oldIgnore) {
			} else {
				newIgnores.push(oldIgnore)
			}
		}
		this.ignores = newIgnores
		
		this.writeCookie()
		this.readDatabase()
	},
	
	addIgnore: function(ignore){
		if (this.isIgnoring(ignore)) {
			alert("Already ignoring that hashtag.")
		} else {
			this.ignores.push(ignore)
			this.writeCookie()
		}
		this.readDatabase()
	},
	
	readCookie: function(){
		var ourCookie
		var cookies = document.cookie.split(';')

		for (var i = 0; i < cookies.length; i++) {
			var cookie = this.trimString(cookies[i])
			if (cookie.substring(0, this.cookieName.length + 1) == (this.cookieName + '=')) {
				ourCookie = decodeURIComponent(cookie.substring(this.cookieName.length + 1))
				break
			}
		}
		
		return ourCookie
	},
	
	writeCookie: function(){
		var date = new Date()
		date.setTime(Date.parse('Jan 1, 2020'))
		var expires	= '; expires =' + date.toUTCString()
		var path		= '; path=/'
		var domain	= '; domain=twitter.com'
		document.cookie = [this.cookieName, '=', this.ignores.join('||'), expires, path, domain].join('')
		
		this.readCookie()
	},
	
	initView: function(){
		this.addCSS()
		this.drawSettingsPanel()
	},
	
	addCSS: function(){
		var css = '.status.ignored { color:#ccc; background-color:#eee; } ' +
		'.status.ignored a { color:#ccc; } ' +
		'#side ul#ignore_list { margin-bottom: 1em; overflow:hidden; } ' +
		'#side ul#ignore_list li { clear:both } ' +
		'#side ul#ignore_list li span { float:left; clear:right;  } ' +
		'#side ul#ignore_list li .unignore { float:right; } '
		
		var styleTag = document.createElement('style')
		styleTag.setAttribute('type', 'text/css')
		styleTag.appendChild(document.createTextNode(css))
		document.getElementsByTagName('head')[0].appendChild(styleTag)
	},
	
	ignoreEntries: function(){
		for (var i = 0; i < this.statuses.length; i++) {
			var status = this.statuses[i]
			var entry = status.getElementsByClassName('entry-content')[0]
			var hashtags = entry.innerHTML.match(/#[a-z]+/ig)

			status.className = status.className.replace(/ ignored/, '')

			if (hashtags) {
				for (var i2 = 0; i2 < hashtags.length; i2++) {
					var hashtag = hashtags[i2]
					// Ideally, the capture shoudln't contain the hash.
					hashtag = hashtag.slice(1, hashtag.length)
					
					if (this.isIgnoring(hashtag)) {
						status.className += ' ignored'
					}
				}
			}
		}
	},
	
	drawSettingsPanel: function(){
		var self = this
		
		var sectionHeader = document.createElement('div')
		sectionHeader		.setAttribute('class', 'section-header')
		var txt					= document.createElement('h1')
		txt							.appendChild(document.createTextNode('Hashtag Ignores'))
		sectionHeader		.appendChild(txt)
		
		var ignoreList 	= document.createElement('ul')
		ignoreList			.setAttribute('id', 'ignore_list')

		var entryForm 	= document.createElement('form')
		var input 			= document.createElement('input')
		input						.setAttribute('type', 'text')
		input						.setAttribute('size', '15')
		var button 			= document.createElement('button')
		button					.appendChild(document.createTextNode('Add'))
		
		entryForm				.appendChild(input)
		entryForm				.appendChild(button)

		this.hookEvent(entryForm, 'submit', function(){
			self.addIgnore(input.value)
			input.value = ''
		})
				
		var settings 		= document.createElement('div')
		settings				.setAttribute('class', 'section last')

		settings				.appendChild(sectionHeader)
		settings				.appendChild(ignoreList)
		settings				.appendChild(entryForm)

		document				.getElementById('side').appendChild(settings)
	},
	
	fillSettingsPanel: function(){
		var self = this
		
		
		var ignoreList = document.getElementById('ignore_list')
		ignoreList.innerHTML = ''
		
		for (var i = 0; i < this.ignores.length; i++) {
			var ignoreText		= this.ignores[i]
			
			var ignoreEntry 	= document.createElement('li')

			var unignore		 	= document.createElement('a')
			unignore					.setAttribute('href', '#') // gief colorz
			unignore					.setAttribute('class', 'unignore')
			unignore					.setAttribute('title', ignoreText)
			unignore					.appendChild(document.createTextNode('x'))
			self.hookEvent(unignore, 'click', function(){
				self.removeIgnore(this.getAttribute('title'))
			})

			var spanWrap			= document.createElement('span')
			spanWrap					.appendChild(document.createTextNode(ignoreText))
			
			ignoreEntry				.appendChild(spanWrap)
			ignoreEntry				.appendChild(unignore)

			ignoreList.appendChild(ignoreEntry)
		}
	},
	
	rebuildView: function(){
		this.ignoreEntries()
		this.fillSettingsPanel()
	},
	
	isIgnoring: function(ignore){
		for (var i = 0; i < this.ignores.length; i++) {
			if (ignore == this.ignores[i]) {
				return true
			}
		}
	},
	
	hookEvent: function(target, eventName, func){
		target.addEventListener(eventName, function(e){
			if (e) { // Returning false won't cut it.
				try {
			  	e.stopPropagation();
					e.preventDefault();
				} catch (ex) {}
			}
			func.call(target)
		}, false)
	},
	
	trimString: function(string) {
		// Stolen from jQuery
		return string.replace(/^\s+|\s+$/g, "")
	}
}

new TwitterHashtagIgnore()