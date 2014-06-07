// ==UserScript==
// @name           4chan email selector
// @namespace      boards.4chan.org/
// @description    see http://userscripts.org/scripts/show/82045
// @include        http://boards.4chan.org/*
// ==/UserScript==

var Dom = {
	id: function(id) { return document.getElementById(id); },

	new: function(type, attrs, text) {
		if (type=='#')
			type = 'span';
		var e = document.createElement(type);
		if (attrs)
			for (attr in attrs)
				e.setAttribute(attr, attrs[attr]);
		if (text)
			e.textContent = text;
		return e;
	},

	newText: function(text, attrs) { return Dom.new('#', attrs, text); },

	del: function(e) {
		if (e instanceof Array)
			for each (i in e)
				Dom.del(i);
		else if (e&&e.parentNode) e.parentNode.removeChild(e);
	},

	X: function(xpath, root) {
		var nodes = document.evaluate(xpath, root ? root : document.body, null, 0, null);
		var result = [];
		switch (nodes.resultType) {
			case nodes.STRING_TYPE: return nodes.stringValue;
			case nodes.NUMBER_TYPE: return nodes.numberValue;
			case nodes.BOOLEAN_TYPE: return nodes.booleanValue;
			default:
				while (node = nodes.iterateNext())
					result.push(node);
				return result;
		}
	}
};

function postField(field)
{
	return Dom.X("div[@class='postarea'][1]/form[@name='post'][1]//input[@name='"+field+"'][1]")[0];
};

function addbutton(name, anchor)
{
	var button = Dom.new('input', {id: '4sel_post_email_' + name, type: 'button', name: '4sel_post_email_' + name});
	button.value = name; // button caption
	button.addEventListener('click', (function() { emailfield.value = name; }), false);
	anchor.appendChild(button);
};

var emailfield = postField('email');
var anchor = emailfield.parentNode;

emailfield.id = '4sel_post_email';
emailfield.style.width = '300px';

addbutton("sage", anchor);
addbutton("noko", anchor);
