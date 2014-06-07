// ==UserScript==
// @id             showlist.eztv@bernstein.users.userscripts.org
// @name           eztv.it - Hide shows
// @author         bernstein
// @description    Hide shows from the showlist with a friendly GUI. Filter without reload, adds addtional filters.
// @version        0.9
// @updateURL      https://userscripts.org/scripts/source/157700.user.js
// @domain         eztv.it
// @include        http*://eztv.it/showlist*
// @run-at         document-end
// @namespace      org.userscripts.user.bernstein
// @grant          GM_addStyle
// @grant          GM_setValue
// @grant          GM_getValue
// ==/UserScript==
// TODO new feature: highlight favorite shows (style checkboxes & add a second one) '\u2605 \u2606 \u2665 \u2661' // star, hollow star, heart, hollow heart
// TODO new feature: local sorting
// TODO add another checkbox to toggle edit mode
// TODO add more info (classification,genre,premiere,ending,current season)

GM_addStyle('td > input { margin: 2px 8px 1px -2px; } .hidden, .filtered { display: none; }');

({
	init: function()
	{
	   this.selectivelyHideShows();
	   this.localFiltering();
	},
	selectivelyHideShows: function()
	{
		var form = document.querySelector('form');
		var nodes = document.querySelectorAll('table td:first-child');
		
		// add show all checkbox
		var l = document.createElement('label');
		var a = document.createElement('input');
		a.type = 'checkbox';
		a.addEventListener("click", function(event) {
			for (var i=2, iL=nodes.length; i < iL; i++)
				if (!nodes[i].children[0].checked)
					if (event.target.checked)
						nodes[i].parentNode.classList.remove("hidden");
					else
						nodes[i].parentNode.classList.add("hidden");
		}, true);
		l.appendChild(a);
		l.style.cssFloat = 'right';
		l.appendChild(document.createTextNode('Show All'));
		form.appendChild(l);
		
		// add checkbox to show listitems
		for (var i=2, iL=nodes.length; i < iL; i++)
		{
		    var url = nodes[i].children[0].href;
			
			var e = document.createElement("input");
			e.type = 'checkbox';
			e.id = 'show' + url.substr(22, url.indexOf('/',22) - 22);
			e.checked = GM_getValue(e.id, true);
			e.addEventListener("click", function(event) {
				GM_setValue(event.target.id, event.target.checked);
				if (!event.target.checked && !a.checked)
					event.target.parentNode.parentNode.classList.add("hidden");
			}, true);
			nodes[i].insertBefore(e, nodes[i].children[0]);
			
			if (!e.checked) nodes[i].parentNode.classList.add("hidden");
			
			// !!!!! label the items for local filtering !!!!!
			nodes[i].parentNode.classList.add(nodes[i].nextElementSibling.children[0].className);
		}
	},
	localFiltering: function()
	{
		let f = document.querySelector('form');
		f.action = "javascript:orgUserscriptsUsersBernsteinEztvShowlist();";
		let s = f.querySelector('select');
		s.children[0].value = "airing break ended pending"
		s.appendChild(this.createOptionElement('Airing + Break', 'airing break', true));
		s.appendChild(this.createOptionElement('Ended + Pending', 'ended pending', false));
		this.filter();
		unsafeWindow.orgUserscriptsUsersBernsteinEztvShowlist = this.filter;
	},
	createOptionElement: function(text, value, selected)
	{
		let e = document.createElement('option');
		e.textContent = text;
		e.value = value;
		e.selected = selected;
		return e;
	},
	filter: function()
	{
		let s = document.querySelector('select');
		let show = s.children[s.selectedIndex].value.split(' ');
		
		for (i=1, iL=s.options.length; i < iL; i++)
		{
			let className = s.options[i].value;
			
			let add = !(show.indexOf(className) > -1);
			let nodes = document.querySelectorAll('tr.' + className);
			
			for(j=0, jL=nodes.length; j < jL; j++)
				if (add)
					nodes[j].classList.add('filtered');
				else
					nodes[j].classList.remove('filtered');
		}
	}
}).init();
