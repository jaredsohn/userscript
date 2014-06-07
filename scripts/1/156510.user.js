// ==UserScript==
// @name        Fetlife, How You Met Them
// @namespace   http://example.com
// @description Private notes for fetlife profiles
// @include     https://fetlife.com/users/*
// @grant       none
// ==/UserScript==

(function() {
	
	if (/fetlife.com.users.\d+$/.test(document.location)) {
	
		var user = /\d+$/.exec(document.location)[0]
		var key = 'how_you_met_them'
		var data = JSON.parse(localStorage.getItem(key)) || {}
	
		var edit = function(div) {
			return function() {
				div.querySelector('form').setAttribute('style','')
				div.querySelector('td div').setAttribute('style','display:none;')
				return false;
			}
		}
	
		var update = function(div) {
			return function() {
				data[user] = div.querySelector('textarea').value
				localStorage.setItem(key, JSON.stringify(data))
				div.querySelector('td span').textContent = data[user]
				div.querySelector('form').setAttribute('style','display:none;')
				div.querySelector('td div').setAttribute('style','')
				return false;
			}
		}
	
		var install_after_username = function() {
			var table = document.createElement('table')
			table.innerHTML = '<tr><th width="150px">How you met them:</th><td><div><span></span> <span class="smaller quiet">(<a href="">edit</a>)</span></div><form style="display:none"><textarea style="width:100%;height:12ex;"></textarea><input type="submit" value="update"></form></td></tr>'
		
			table.querySelector('td span').textContent = data[user] || ""
			table.querySelector('textarea').textContent = data[user] || "At "
			table.querySelector('a').onclick = edit(table)
			table.querySelector('input').onclick = update(table)

			var elem = document.querySelector('h2 + p + table')
		  elem.parentNode.insertBefore(table, elem)
		}
	
		install_after_username()

  }
	
})()