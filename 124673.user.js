// ==UserScript==
// @name           Trac Timeline Advanced Filter
// @namespace      http://spoo.free.fr/
// @description    Adds a filter to Trac Timeline.
// @version        1.0
// @include        http*://*/timeline
// @include        http*://*/timeline?*
// ==/UserScript==

var script = function() {
	var nextElement = function(element, name) {
		while (element.nextSibling) {
			element = element.nextSibling;
			if (element.nodeName == name) {
				return element;
			}
		}
	};

	var filterTimelineByText = function(query) {
		var withText = true;
		if(query.length >= 1 && query.substring(0, 1) == '-') {
			withText = false;
			query = query.substring(1);
		}
		
		var dts = document.getElementsByTagName('dt');
		var i = 0;
		for (i = 0; i < dts.length; i++) {
			var dt = dts[i];
			var dd = nextElement(dt, 'DD');
			if (query != '') {
				var match = (dt.textContent.indexOf(query) != -1 || dd.textContent.indexOf(query) != -1);
				if (match != withText) {
					dt.style.display = 'none';
					dd.style.display = 'none';
					continue;
				}
			}
			dt.style.display = '';
			dd.style.display = '';
		}
	};

	var filterTimelineByType = function(query) {	
		var dls = document.getElementsByTagName('dl');
		var i = 0;
		for (i = 0; i < dls.length; i++) {
			var dl = dls[i];
			dl.className = query;
		}
	};

	var createQueryDiv = function() {
		var result = document.createElement('div');
		
		var input = document.createElement('input');
		input.type = 'text';
		input.addEventListener('keyup',
			   function () { filterTimelineByText(input.value); },
			   false);
		result.appendChild(input);
		
		var checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.id = 'filterTimelineChangeset';
		checkbox.addEventListener('change',
			   function () { filterTimelineByType(checkbox.checked ? 'changeset' : ''); },
			   false);
		result.appendChild(checkbox);
		var label = document.createElement('label');
		label.htmlFor = checkbox.id;
		label.innerHTML = 'Only repository changesets';
		result.appendChild(label);

		return result;
	};

	var initStyle = function() {
		GM_addStyle('dl.changeset dt, dl.changeset dd { display:none; }');
		GM_addStyle('dl.changeset dt.changeset, dl.changeset dd.changeset { display:block; }');
	};
	
	var initForm = function() {
		var prefs = document.getElementById('prefs');
		prefs.parentNode.insertBefore(createQueryDiv(), prefs);
	};
	
	return {
		init: function() {
			initStyle();
			initForm();
		}
	}
}();
script.init();