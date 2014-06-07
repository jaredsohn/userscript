// ==UserScript==
// @name           DS Angriffe nach Ziel gruppieren
// @description    Gruppiert die Angriffe in der BefehlsÃ¼bersicht nach den ZieldÃ¶rfern
// @author         
// @namespace      http://osor.de/
// @include *
// @include        http://de*.die-staemme.de/game.php?*
// ==/UserScript==

// -----------------------------------------------------------------------------
//      Modifikationen und Weiterverbreitung dieses Scripts benÃ¶tigen die 
//                           Zustimmung des Autors.
// -----------------------------------------------------------------------------

(function(){
	
	var view = document.getElementById('overview');
	if(!view || (view.value != 'commands' && view.value != 'incomings'))
		return;
	view = view.value;

	// XPath helper
	var $x = function(p, context) {
		if(!context)
			context = document;
		var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (i = 0; item = xpr.snapshotItem(i); i++)
			arr.push(item);
		return arr;
	};

	var groupCoords = function() {
		var view = document.getElementById('overview').value;
		if(view == 'commands')
			var links = $x('//table/tbody/tr/td/span[starts-with(@id,"label[")]/a[contains(@href,"screen=info_command")]');
		else if(view == 'incomings')
			var links = $x('//table/tbody/tr/td/a[contains(@href,"screen=overview") and contains(.,") K")]');
		var coords = [];
		for(var i = 0; i < links.length; i++) {
			var m = /\((\d+\|\d+)\) K\d+/.exec(links[i].textContent);
			if(!m)
				continue;
			coords[i] = m[1];
			for(var j = 0; j < i; j++) {
				if(coords[i] == coords[j]) {
					if(view == 'commands') {
						var swaprow = links[j].parentNode.parentNode.parentNode;
						var link = links[i].parentNode.parentNode.parentNode;
					} else if(view == 'incomings') {
						var swaprow = links[j].parentNode.parentNode;
						var link = links[i].parentNode.parentNode;
					}
					link.parentNode.insertBefore(swaprow, link);
				}
			}
		}
		if(view == 'commands')
			links = $x('//table/tbody/tr/td/span[starts-with(@id,"label[")]/a[contains(@href,"screen=info_command")]');
		else if(view == 'incomings')
			links = $x('//table/tbody/tr/td/a[contains(@href,"screen=overview") and contains(.,") K")]');
		var lastab = '';
		var lastcoord = '';
		var ab = '';
		for(var i = 0; i < links.length; i++) {
			var m = /\((\d+\|\d+)\) K\d+/.exec(links[i].textContent);
			if(!m)
				continue;
			if(lastcoord != m[1]) {
				ab = lastab == 'a' ? 'b' : 'a';
				lastab = ab;
				lastcoord = m[1];
			} else {
				ab = lastab;
			}
			if(view == 'commands')
				links[i].parentNode.parentNode.parentNode.className = links[i].parentNode.parentNode.parentNode.className.replace(/row_[ab]/, 'row_' + ab);
			else if(view == 'incomings')
				links[i].parentNode.parentNode.className = links[i].parentNode.parentNode.className.replace(/row_[ab]/, 'row_' + ab);
		}
	};
	
	var btn = document.createElement('button');
	btn.addEventListener('click', function(){
		groupCoords();
		this.parentNode.removeChild(this);
	}, false);
	btn.textContent = 'Gruppieren';
	btn.setAttribute('style', 'font-size: 11px; padding: 0px; margin-left: 4px;');
	
	if(view == 'commands')
		var h = $x('//th[.="Befehl"]');
	else if(view == 'incomings')
		var h = $x('//th[.="Ziel"]');
	if(h.length > 0)
		h[0].appendChild(btn);

})();