// ==UserScript==
// @name        JVRang
// @namespace   JVScript
// @include     http://www.jeuxvideo.com/profil/*
// @version     0.1.2
// @copyright	MIT
// @grant	none
// ==/UserScript==

(function(){

"use strict";

var IO = {
	setRang: function(psd, value)
	{
		localStorage.setItem(psd, value)		
	},
	getRang: function(psd)
	{
		return localStorage.getItem(psd) ? localStorage.getItem(psd) : null
	},
	remove: function(psd)
	{
		localStorage.removeItem(psd)
	}
}

function Rang(rang, pos) {
	this.rang = rang
	this.position = pos
	this.div = document.createElement('div')
	this.td = document.createElement('td')
	this.initialize()
}

Rang.prototype.initialize = function() {
	this.div.innerHTML = '&nbsp;'
	this.div.setAttribute('class', 'jvrangspan')
	this.div.setAttribute('title', this.rang)
	this.td.setAttribute('class', 'jvrangli')
	this.td.appendChild(this.div)
	this.td.setAttribute('style', 'background-position: left -' + this.position + 'px;')
	var _this = this
	this.td.addEventListener('click', function() {
		IO.setRang(utils.getPseudo(), _this.rang)
		utils.getCDV().setAttribute('class', _this.rang.toLowerCase())
		if(utils.isProfil())
			utils.$('td_rang').innerHTML = '<strong>' + _this.rang.toUpperCase() + '</strong>'
	}, false)
}

Rang.prototype.writeHTML = function(elem) {
	elem.appendChild(this.td)
}


var utils = {
	getPseudo : function() {
		if(!this.isBanned())
			return this.$('pseudo').getElementsByTagName('h1')[0].innerHTML
	},
	getRangIcon: function() {
		return this.$('rang')
	},
	isBanned: function() {
		 //return this.$('pseudo') == 'undefined' ? true : false
		 return document.getElementsByClassName('banni').length != 0
	},
	getCDV: function() {
		if(this.$('cdv_profil')) 
			return this.$('cdv_profil')
		if(this.$('cdv_cpcoeur')) 
			return this.$('cdv_cpcoeur')
		if(this.$('cdv_contribs')) 
			return this.$('cdv_contribs')
	},
	$: function(str) {
		return document.getElementById(str)
	},
	isProfil: function() {
		return this.$('cdv_profil')
	}
	
}

var script = {
	initialize : function() {
		this.table = document.createElement('table')
		this.tr = document.createElement('tr')
		this.tr.setAttribute('style', 'height: 100%')
		this.table.appendChild(this.tr)
		this.table.setAttribute('class', 'jvrangul')
		this.table.setAttribute('style', 'top: 12px;')
	}, 
	run: function() {
		var pseudo = utils.getPseudo()
		
		if(IO.getRang(pseudo) != null) {			
			utils.getCDV().setAttribute('class', IO.getRang(pseudo).toLowerCase())
			if(utils.isProfil())
				utils.$('td_rang').innerHTML = '<strong>' + IO.getRang(pseudo).toUpperCase() + '</strong>'
		}
		var rangIcon = utils.getRangIcon()
		rangIcon.addEventListener('click', function() {
			IO.remove(pseudo)
			document.location.reload()
		}, false)
		rangIcon.setAttribute('title', 'Reset Rang')
		rangIcon.setAttribute('style', 'cursor: pointer')
		var rangs = [new Rang('Carton', 4), new Rang('Bronze', 34), 
		new Rang('Argent', 64), new Rang('Or', 94),
		new Rang('Rubis', 124), new Rang('Saphir', 364),
		new Rang('Emeraude', 424), new Rang('Diamant', 154)]
		utils.$('cdv_header').appendChild(this.table)
		var _this = this
		rangs.forEach(function(r) {
			r.writeHTML(_this.tr)
		})
		
		this.addStyle('.jvrangli {background: url("http://image.jeuxvideo.com/css_img/defaut/cdv/ico_rangs_v2.png") no-repeat scroll left top transparent; list-style-type: none; height:100%; }'
			+ '.jvrangul {position: absolute; display: none; height: 28px !important; right: 145px; top 8px !important;}'
			+ '.jvrangul div {font-size: 0.7em; width: 25px; height: 20px; cursor: pointer}'
			+ '#cdv_header:hover .jvrangul {display: inline}'
		)
	}, 
	exec: function() {
		if(!utils.isBanned()) {
			this.initialize()
			this.run()
		}	
	},
	addStyle: function(css) { 
		var head = document.getElementsByTagName('head')[0]
		var node = document.createElement("style")
		node.setAttribute('type', 'text/css')
		node.appendChild(document.createTextNode(css))
		head.appendChild(node)
	} 
}

script.exec()

})()
