// ==UserScript==
// @name           Tabnotator
// @namespace      http://casperbp.dk/
// @description    Tab-notation functionality for your home page.
// @include        http://lyrics.wikia.com/lyrics/*
// ==/UserScript==

window.casperbp = {};
window.casperbp.tabnotator = function() {
	
	/**
	 * Keeps track of the over-all state of the DOM and the chords to be annotated.
	 * Used for export/import of tabs -- at some point.
	 */
	var state = {
		nodeCount : 0,
		nodeTabStates : [],
		validChords : ['Am','F','C','G'],
		
		add : function(wrapper) {
			wrapper.state = new AnnotationState(wrapper);
			
			this.nodeTabStates.push(wrapper);
			this.nodeCount++;
		}
	}

	/**
	 * For DOM traversal and text node finding.
	 */
	var AnnotationParser = function() {
		var nodes = [];

		return {
			parseTextNodes: function (node, textNodes) {
				if (nodes.length > 0) return nodes;

				if (!node.childNodes || node.childNodes.length == 0) return textNodes;

				var childNodes = node.childNodes;
				for (var i = 0; i < childNodes.length; i++) {
					var child = childNodes[i];
					textNodes = this.parseTextNodes(child, textNodes);
					if (child.nodeType == 3 || child.tagName=='BR') {
						textNodes.push([node, child]);
					}
				}

				return textNodes;
			},

			setNodes: function (newNodes) {
				nodes = newNodes;
			},

			getNodes: function () {
				return nodes;
			}
		}
	}
	
	/**
	 * Keeps track of containing content and annotation.
	 */
	var WrapperController = function(node) {
		// INIT
		node.annotation = node.firstChild;
		node.content = node.lastChild;
		
		// NO IMPLEMENTATION AS OF YET -- REMOVE ME?
	}
	
	/**
	 * Controller for "content"-nodes; i.e. the words themselves.
	 */
	var ContentController = function(node) {
		node.addEventListener('click', function() {
			if (!node.wrapper.state.isAnnotated())
				node.wrapper.annotation.controller.annotate();
			else node.wrapper.annotation.controller.unAnnotate();
		},true);
		
		node.addEventListener('mouseover', function () {
			styler.highlight(this);
		},true);
		
		node.addEventListener('mouseout', function () {
			styler.unhighlight(this);			
		},true);
	}
	
	/**
	 * Controller for "annotation"-nodes; i.e. the chords themselves.
	 * Should refer to state to see what chord is in the annotation.
	 */
	var AnnotationController = function(node) {
		this.annotate = function() {
			node.wrapper.state.setAnnotated(true);
			styler.show(node);
			node.innerHTML = 'Am';
		}
		
		this.unAnnotate = function() {
			node.wrapper.state.setAnnotated(false);
			styler.hide(node);
		}
	}
	
	/**
	 * Keeps track of the state of a node; meant for use on the "wrapper"-node.
	 */
	var AnnotationState = function(node) {
		node.annotated = false;
		
		this.isAnnotated = function() {
			return node.annotated;
		}
		
		this.setAnnotated = function(bool) {
			node.annotated = bool;
		}
	}
	
	
	
	/**
	 * "Static" methods for setting styles on nodes inline.
	 */
	var InlineStyler = {		
		highlight : function(node) {
			node.style.color = "magenta";
		},
		
		unhighlight : function(node) {
			node.style.color = "inherit";
		},
		
		wrapperize : function(node) {
			node.style.cssFloat = "left";
			node.style.marginRight = "0.33em";
			node.style.padding = "0.25em 0 0.25em 0";
		},
		
		annotationize : function(node) {
			node.style.color = "blue";
			node.style.display = "none";
		},
		
		show : function(node) {
			node.style.display = "";
			node.style.marginTop = "-1em";
			node.style.position = "absolute";
		},
		
		hide : function(node) {
			node.style.display = "none";
		}
	}
	
	// For swapping styling theme.
	var styler = InlineStyler;
	
	/**
	 * STUB.
	 * To implement your own decorator, call this function and add the properties
	 * "tag" and "decorationNodeFunction" and "decorationLineFunction"
	 */
	var Decorator = function () {
		return function () {
			this.decorate = function (decoratee, parent, decorateFunction) {
				var elm = document.createElement(this.tag);
				elm.appendChild(decoratee);
				parent.insertBefore(elm, parent.firstChild);
				decorateFunction(elm, parent);
			}

			this.decorateNodes = function (nodes) {
				var PARENT = 0;
				var CHILD = 1;
				for (i = nodes.length-1; i>=0; i--) {
					if (nodes[i][CHILD].nodeValue) {
						var children = nodes[i][CHILD].nodeValue.split(/ +/);
						for (var j = children.length - 1; j >= 0; j--) {
							this.decorate(document.createTextNode(children[j]+''), nodes[i][PARENT], this.decorationNodeFunction);
						}
						this.decorate(document.createTextNode(children[0]), nodes[i][PARENT], this.decorationLineFunction);
						nodes[i][PARENT].removeChild(nodes[i][CHILD]);
					} else {
						this.decorate(nodes[i][CHILD], nodes[i][PARENT], this.decorationLineFunction);
					}
				}
			}
		}
	}

	var SpanDecorator = Decorator();
	SpanDecorator.prototype.tag = 'span';
	SpanDecorator.prototype.decorationNodeFunction = function (decoratee, parent) {
		if (!decoratee.innerHTML.match(/\S/)) return; // If empty text field, ignore
		
		// Wrapper div
		var outerDiv = document.createElement('div');
		
		// Controller for decoratee (content-node)
		decoratee.controller = new ContentController(decoratee);
		decoratee.wrapper = outerDiv;
		
		// Annotation span
		var annotationSpan = document.createElement('span');
		annotationSpan.controller = new AnnotationController(annotationSpan);
		annotationSpan.wrapper = outerDiv;
		
		// DOM juggling
		parent.replaceChild(outerDiv,decoratee);
		outerDiv.appendChild(decoratee);
		outerDiv.insertBefore(annotationSpan, decoratee);
		outerDiv.annotation = annotationSpan;
		outerDiv.content = decoratee;
		
		// Adds wrapper to overall state, and maps the children to the div.
		state.add(outerDiv);
		
		// Styles
		styler.wrapperize(outerDiv);
		styler.annotationize(annotationSpan);
	}
	
	SpanDecorator.prototype.decorationLineFunction = function (decoratee, parent) {
		if (decoratee.getElementsByTagName('BR').length<=0){
			// Only decorate if the decoratee does not contain a break.
			var clearDiv = document.createElement('div');
			clearDiv.style.clear = 'left';
			parent.insertBefore(clearDiv,decoratee);
			parent.removeChild(decoratee);
		}
	}

	
	
	var spanDecorator = new SpanDecorator();
	var parser = null;
	var annotate = function () {
		parser = new AnnotationParser();
		var nodeToMistreat = null;
		for (var i=0; i<document.getElementById('bodyContent').childNodes.length; i++) {
			var curChild = document.getElementById('bodyContent').childNodes[i];
			if (curChild && curChild.className=="lyricbox") {
				nodeToMistreat = curChild;
				break;
			}
		}
		
		if (nodeToMistreat!=null) {
			parser.setNodes(parser.parseTextNodes(nodeToMistreat, []));
			spanDecorator.decorateNodes(parser.getNodes());
		}
	}
	
	annotate();
}

window.casperbp.tabnotator();