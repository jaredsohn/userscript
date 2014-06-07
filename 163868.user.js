// ==UserScript==
// @name        verydom
// @namespace   very
// @version     1.0
// ==/UserScript==

function get(parent, selector) {
	if (typeof parent === 'string') {
		selector = parent;
		parent = document;
	}
	return parent.querySelector(selector);
}

function getAll(parent, selector) {
	if (typeof parent === 'string') {
		selector = parent;
		parent = document;
	}
	return Array.slice(parent.querySelectorAll(selector));
}

function make(node, ...instructions) {
	/*	Usage:
			make(<node>, <instruction>*)				modifies the supplied node
			make(<non-empty string>, <instruction>*)	creates a node using the supplied string as tag name
			make(<falsey>, <instruction>*)				creates a document fragment

		The first argument is the node you want to modify, and the remaining arguments describe how you want to make it.

		The instructions are handled from left to right. The same kind of instruction can be used multiple times.

		There are five kinds of instructions:
			1. falsey
				Any instruction that is falsey doesn't do anything.
				eg. make(node, false, null, '', undefined, false && 'doesn\'t matter') does nothing at all
			2. array
				If an instruction is an array, its elements get appended to the node.
				Again there are four kinds of elements:
					1. falsey
						Any element that is falsey is ignored.
					2. array
						If an element is an instance of Array itself, its elements get appended recursively.
					3. string
						Elements that are of string type get appended as text nodes.
					4. node
						Nodes are appended via Node#appendChild.
				eg. make(span, ['Hello ', !happy && 'cruel ', 'World!']) appends two or three text nodes to the span
			3. string
				Most of the time you do NOT want to use this. But sometimes it's very useful.
				If the type of an instruction is string, the following actions are taken depending on the string:
					remove: remove the current child node
					clear: removes all child nodes
					before/after: moves before/after the current child node
					front/rear: move before/after all child nodes
					enter: enters the current child node
					exit: exits the node
				eg. make(div, 'clear', ['nothing to see here']) replaces the content of the div with a single text node
					make(div, 'exit', 'remove', ['nothing to see here'], 'enter') replaces the div with a single text node and returns the text node
			4. object
				If the type of an instruction is object, the property name/value are used depending on the type of the value:
					1. undefined
						Ignored.
					2. object
						The properties of the object are merge onto the node.
					3. function
						The value is added as an event listener.
					4. boolean
						An appropriate attribute gets added (true) to the node or removed (false) from the node.
					5. string, number
						The property is set as an attribute on the node.
				eg. var onclick; make(link, blackLinks && {style: {color: '#000000'}}, {click: onclick = function(e) {link.removeEventListener(onclick, false); e.preventDefault(); scrollTo(0, 0);}, href: '#top'})
					might set link.style.color to black, adds a click handler and changes the href attribute (take care to save a reference of the handler in case you want to remove it later)
			5. function
				If the type of an intruction is function, the function is called when the instruction gets processed.
				This could be necessary if you are missing some functionality in make.
				The current node is used as the only argument and as the value of `this`.
				eg. make(node, {click: onclick}, function(node) {node.removeEventListener('click', onclick, false);})
	*/
	var commands = getCommands(), cursor = null;
	if (!node) {
		node = document.createDocumentFragment();
	} else if (typeof node === 'string') {
		node = document.createElement(node);
	}
	instructions.forEach(processInstruction);
	return node;

	function processInstruction(instruction) {
		if (!instruction) {
			// don't process falsey arguments
		} else if (typeof instruction === 'string') {
			processCommand(instruction);
		} else if (instruction instanceof Array) {
			processChildList(instruction);
		} else if (typeof instruction === 'object') {
			processProperties(instruction);
		} else if (typeof instruction === 'function') {
			processInitializer(instruction);
		}
	}

	function processCommand(command) {
		if (command in commands) {
			commands[command]();
		}
	}

	function getCommands() {
		return {
			clear: function() {
				while (node.lastChild) {
					node.removeChild(node.lastChild);
				}
				cursor = null;
			},
			before: function() {
				if (cursor) {
					if (cursor.previousSibling) {
						cursor = cursor.previousSibling;
					}
				} else {
					cursor = node.lastChild;
				}
			},
			after: function() {
				if (cursor) {
					cursor = cursor.nextSibling;
				}
			},
			front: function() {
				cursor = node.firstChild;
			},
			rear: function() {
				cursor = null;
			},
			enter: function() {
				if (cursor) {
					node = cursor.previousSibling;
					cursor = null;
				} else {
					node = node.lastChild;
				}
			},
			exit: function() {
				cursor = node.nextSibling;
				node = node.parentNode;
			},
			remove: function() {
				if (cursor) {
					node.removeChild(cursor.previousSibling);
				} else {
					node.removeChild(node.lastChild);
				}
			}
		};
	}

	function processChildList(list) {
		list.forEach(processChild);
	}

	function processChild(child) {
		if (!child) {
			// don't process falsey arguments
		} else if (typeof child === 'string') {
			node.insertBefore(document.createTextNode(child), cursor);
		} else if (child instanceof Array) {
			processChildList(child);
		} else if (child instanceof Node) {
			node.insertBefore(child, cursor);
		}
	}

	function processProperties(props) {
		Object.keys(props).forEach(function(name) {
			processProperty(name, props[name]);
		});
	}

	function processProperty(name, value) {
		if (typeof value === 'object') {
			if (!node[name]) {
				node[name] = {};
			}
			Object.keys(value).forEach(function(prop) {
				node[name][prop] = value[prop];
			});
		} else if (typeof value === 'function') {
			node.addEventListener(name, value, false);
		} else if (typeof value === 'boolean') {
			if (value) {
				node.setAttribute(name, name);
			} else {
				node.removeAttribute(name);
			}
		} else if (typeof value !== 'undefined') {
			node.setAttribute(name, value);
		}
	}

	function processInitializer(init) {
		init.call(node, node);
	}
}