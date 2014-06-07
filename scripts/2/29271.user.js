// ==UserScript==
// @name           Blog Comment Identity
// @author         Alex@Net http://www.alexatnet.com/
// @namespace      an.blog.comment.identity
// @description    Allows you to select your name, email and website URL on blogs
// @include        *
// ==/UserScript==

// AS IS, NO WARRANTY, FREE DISTRIBUTION, DO NOT REMOVE COPYRIGHT.
// Copyright 2008, Alex Netkachov
// Bugs/comments/suggestions: http://www.alexatnet.com/

(function () {

	function addOption(select, value, text, selected) {
		var option = select.appendChild(document.createElement('option'));
		option.setAttribute('value', value);
		option.appendChild(document.createTextNode(text));
		if (selected)
			option.setAttribute('selected', 'yes');
		return option;
	}

	function updateUI(select, controls, identities) {
		with (select) while (lastChild) removeChild(lastChild);
		var ds = identities.toListBoxDataSource();
		if (0 == ds.length)
			addOption(nameSelect, '', '', true);
		for (var i = 0; i < ds.length; i++)
			with (ds[i])
				addOption(nameSelect, value, text, selected);
		addOption(nameSelect, '-----', '----------------------'
			+ '-------------------------').disabled = true;
		addOption(nameSelect, 'create_new_identity', '[Create new identity]');
		if (0 != ds.length)
			addOption(nameSelect, 'delete_current', '[Delete current identity]');
		addOption(nameSelect, 'turn_off', '[Turn identity manager off]');
		if (0 != ds.length)
			updateControls(controls, identities.selected());
	}

	function updateControls(controls, identity) {
		controls.author.value = identity.name;
		controls.email.value = identity.email;
		controls.url.value = identity.url;
	}

	var blogType = null;
	var metaTags = document.getElementsByTagName('meta');
	for (var i = 0; i < metaTags.length; i++) {
		var tag = metaTags[i];
		var nameAttr = tag.getAttributeNode('name');
		var contentAttr = tag.getAttributeNode('content');
		if (null != nameAttr && null != contentAttr
			&& 'generator' == nameAttr.nodeValue.toLowerCase())
		{
			blogType = contentAttr.nodeValue.toLowerCase();
			break;
		}
	}
	if (null == blogType) return;

	// Model
	function Identities() {

		var list = {};
		var names = [];
		var selected = -1;

		this.add = function (identity) {
			list[identity.name] = identity;
			names.push(identity.name);
			if (-1 == selected)
				selected = 0;
		};

		this.selected = function () {
			if (-1 == selected)
				return null;
			return list[names[selected]];
		};

		this.selectAt = function (index) {
			selected = index;
		};

		this.removeSelected = function () {
			delete list[names[selected]];
			names.splice(selected, 1);
			if (0 == names.length)
				selected = -1;
			else if (selected >= names.length)
				selected--;
		};

		this.toString = function () {
			var result = [];
			for (var name in list) {
				var identity = list[name];
				result.push(identity.name + ','
					+ identity.email + ',' + identity.url);
			}
			return result.join('|');
		};

		this.toListBoxDataSource = function () {
			var result = [];
			for (var name in list) {
				result.push({
					'value' : name,
					'text' : name,
					'selected' : name == names[selected]
				});
			}
			return result;
		};

	}

	Identities.createFromString = function (str) {
		var result = new Identities();
		if ('' != str) {
			var parts = str.split('|');
			for (var i = 0; i < parts.length; i++) {
				var row = parts[i].split(',');
				result.add({ 'name' : row[0], 'email' : row[1], 'url' : row[2] });
			}
		}
		return result;
	};

	// Load model data
	var identities = Identities.createFromString(GM_getValue('identities') || '');

	if (0 == blogType.indexOf('wordpress')) {
		var controls = {
			'author' : document.getElementById('author'),
			'email' : document.getElementById('email'),
			'url' : document.getElementById('url')
		};
		if (controls.author && controls.email && controls.url) {
			var nameSelect = document.createElement('select');
			var nameTextBox = controls.author;
			controls.author.parentNode.replaceChild(nameSelect, nameTextBox);
			with (controls.author = nameSelect) {
				setAttribute('id', 'author');
				setAttribute('name', 'author');
			}

			updateUI(nameSelect, controls, identities);
			(function (element, event, handler) {
				if (element.addEventListener)
					element.addEventListener(event, handler, false);
				else if (element.attachEvent)
					element.attachEvent('on' + event, handler);
				else
					element['on' + event] = handler;
			})(nameSelect, 'change', function () {
				if ('' == this.value) {
					controls.email.value = '';
					controls.email.url = '';
				} else if ('turn_off' == this.value) {
					nameSelect.parentNode.replaceChild(nameTextBox, nameSelect);
					controls.author = nameTextBox;
				} else if ('delete_current' == this.value) {
					if (confirm('Are you sure you want to delete the "'
						+ identities.selected().name + '" identity?'))
					{
						identities.removeSelected();
					}
					GM_setValue('identities', identities.toString());
					updateUI(nameSelect, controls, identities);
				} else if ('create_new_identity' == this.value) {
					var identityInfo = prompt('Type identity information (name,email,url):');
					if (identityInfo) {
						var parserIdentity = identityInfo.split(/, */);
						if (parserIdentity.length > 1) {
							identities.add({
								'name' : parserIdentity[0],
								'email' : parserIdentity[1],
								'url' : parserIdentity[2] || ''
							});
						}
					}
					GM_setValue('identities', identities.toString());
					updateUI(nameSelect, controls, identities);
				} else {
					identities.selectAt(this.selectedIndex);
					updateUI(nameSelect, controls, identities);
				}
			});

		}
	}
})();
