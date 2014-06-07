// ==UserScript==
// @name         Let's Talk
// @namespace    h-card
// @description  Displays contact info in an h-card as a set of standard icons.
// @include      *
// ==/UserScript==

// https://snarfed.org/2014-03-10_lets-talk-userscript
// Ryan Barrett <public@ryanb.org>
//
// Displays and highlights the contact info in a web site's h-card as a set of
// standard icons. Expands it, renders the contact methods (p-facetime, p-tel,
// u-email, u-impp, u-url), hides the rest, and pins it to the upper left
// corner.
//
// Motivated by "People Focused Communication"
// http://tantek.com/2013/338/b1/people-focused-mobile-communication-experience
//
// Bundles the microformat-shiv library: http://microformatshiv.com/
// I originally loaded it with this in the metadata block instead:
// @require      https://raw.github.com/glennjones/microformat-shiv/master/microformat-shiv.min.js
// ...but that doesn't work in Chrome.
//
// More about microformats2 h-cards: http://microformats.org/wiki/h-card
// And genericons: http://genericons.com/
//
// License: This project is placed in the public domain.
//
// Changelog:
// 0.2 2013-03-10:
// - bundle microformat-shiv library, since Chrome won't load it remotely.
// 0.1 2013-03-10:
// - initial release

function lt_render() {
  var items = microformats.getItems({'filters': ['h-card']});
  console.log(JSON.stringify(items));

  var props = items.items[0].properties;
  node = document.createElement('div');
  node.setAttribute('class', 'lt');

  var inner = '';
  if (props.url)
    inner += '<a class="u-url" href="' + props.url[0] + '"></a>';
  if (props.impp)
    inner += '<a class="u-impp" href="' + props.impp[0] + '"></a>';
  if (props.facetime)
    inner += '<a class="p-facetime" href="' + props.facetime[0] + '"></a>';
  if (props.tel)
    inner += '<a class="p-tel" href="' + props.tel[0] + '"></a>';
  if (props.email)
    inner += '<a class="u-email" href="' + props.email[0] + '"></a>';

  node.innerHTML = inner;
  document.body.appendChild(node);

  // add stylesheet using GreaseMonkey API
  // TODO: use standard DOM methods instead to avoid GM dependency.
  GM_addStyle(lt_css);
}

// Include the stylesheet as a string instead of a separate file. Ugly, I hate
// it, but userscripts.org doesn't let you upload separate resource files.
//
// For posterity, I used to include this as a separate resource file by storing it in
// lets_talk.user.css, putting this in the metadata block:
//
// @resource     css lets_talk.user.css
//
// ...and calling this at the end of lt_render():
//
//   GM_addStyle(GM_getResourceText('css'));

var lt_css = " \
.lt { \
  position: fixed; \
  left: 0; \
  top: 0; \
  color: #ddd; \
  background-color: gold; \
  padding: 1em; \
  z-index: 9999; \
} \
 \
/* Individual elements override this below */ \
.lt * { \
  content: '' !important; \
  /* display: none; */ \
} \
 \
.lt .p-facetime, \
.lt .p-tel, \
.lt .u-email, \
.lt .u-impp, \
.lt .u-url { \
  display: inline-block !important; \
  content: 'X'; \
} \
 \
.lt .p-facetime:before, \
.lt .p-tel:before, \
.lt .u-email:before, \
.lt .u-impp:before, \
.lt .u-url:before { \
  display: inline-block !important; \
  -webkit-font-smoothing: antialiased; \
  font: normal 16px/1 Genericons; \
  font-size: 2rem; \
  vertical-align: top; \
} \
 \
/* see http://genericons.com/ */ \
.lt .p-facetime:before { content: '\\f403'; }  /* genericon-show */ \
.lt .p-tel:before      { content: '\\f437'; }  /* genericon-phone */ \
.lt .u-email:before    { content: '\\f410'; }  /* genericon-mail */ \
.lt .u-impp:before     { content: '\\f300'; }  /* genericon-contact */ \
.lt .u-url:before      { content: '\\f409'; }  /* genericon-home */ \
 \
/* Genericons! http://genericons.com/ \
 * Base64 version from \
 * https://github.com/Automattic/Genericons/blob/master/genericons.css@0baeeca \
 */ \
@font-face { \
	font-family: Genericons; \
    src: url(data:application/font-woff;charset=utf-8;base64,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) format('woff'); \
	/* src: url(https://snarfed.org/w/wp-content/themes/ryu/fonts/genericons-regular-webfont.eot); */ \
	/* src: url(https://snarfed.org/w/wp-content/themes/ryu/fonts/genericons-regular-webfont.eot?#iefix) format('embedded-opentype'), */ \
	/* 	 url(https://snarfed.org/w/wp-content/themes/ryu/fonts/genericons-regular-webfont.woff) format('woff'), */ \
	/* 	 url(https://snarfed.org/w/wp-content/themes/ryu/fonts/genericons-regular-webfont.ttf) format('truetype'), */ \
	/* 	 url(https://snarfed.org/w/wp-content/themes/ryu/fonts/genericons-regular-webfont.svg#genericonsregular) format('svg'); */ \
	font-weight: normal; \
	font-style: normal; \
} \
";


///// begin github.com/glennjones/microformat-shiv microformat-shiv.js@fcb581c /////

/*!
	Parser
	Copyright (C) 2012 Glenn Jones. All Rights Reserved.
	MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt

	*/

var microformats = {};



// The module pattern
microformats.Parser = function () {
    this.version = '0.3.1';
	this.rootPrefix = 'h-';
	this.propertyPrefixes = ['p-', 'dt-', 'u-', 'e-'];
	this.options = {
		'baseUrl': '',
		'filters': [],
		'version1': true,
		'children': true,
		'childrenRel': false,
		'rel': true,
		'includes': true,
		'textFormat': 'normalised'
	};
	this.maps = {};
	this.rels = {};
};


microformats.Parser.prototype = {

	// internal parse function 
	get: function(dom, rootNode, options) {
		var errors = null,
			items, 
			children, 
			data = [],
			ufs = [],
			x,
			i,
			z,			
			y,
			rels,
			baseTag,
			href;

		this.mergeOptions(options);
		this.rootID = 0;

		if(!dom || !rootNode){
			errors = [{'error': 'No DOM or rootNode given'}];
			return {'errors': errors, 'data': {}};
		}else{

			// add includes
			if(this.options.includes){
				this.addIncludes(dom, rootNode);
			}
			
			// find base tag to set baseUrl
 			baseTag = dom.querySelector('base');
			if(baseTag) {
				href = this.domUtils.getAttribute(dom, baseTag, 'href');
				if(href){
					this.options.baseUrl = href;
				}
			}

			// find starts points in the DOM
			items = this.findRootNodes(dom, rootNode);
			if(items && !errors) {
				x = 0;
				i = items.length;
				while(x < i) {
					if(!this.domUtils.hasAttribute(dom, items[x], 'data-include')) {
						// find microformats - return as an array, there maybe more than one root on a element
						ufs = this.walkTree(dom, items[x], true);
						z = 0;
						y = ufs.length;
						while(z < y) {
							// make sure its a valid structure and apply filter if its requested  
							if(ufs[z] && this.utils.hasProperties(ufs[z].properties) && this.shouldInclude(ufs[z], this.options.filters)) {
								// find any children in the microformats dom tree that are not attached toa property
								if(this.options.children){
									children = this.findChildItems(dom, items[x], ufs[z].type[0]);
									if(children.length > 0) {
										ufs[z].children = children;
									}
								}
								data.push(ufs[z]);
							}
							z++;
						}
					}
					x++;
				}
			}

			// find any rel
			if(this.options.rel){
				rels = this.findRels(dom, rootNode);
				if(rels && this.shouldInclude(rels, this.options.filters)) {
					data.push(rels);
				}
			}

		}
		this.clearUpDom(dom);
		return {'items': data};
	},


	// get the count of items
	count: function(dom, rootNode, options) {
		var out = {},
			keys = [],
			count,
			x,
			i;

		items = this.findRootNodes(dom, rootNode);	
		i = items.length;
		while(i--) {
			classItems = this.domUtils.getAttributeList(dom, items[i], 'class');
			x = classItems.length;
			while(x--) {
				// find v2 names
				if(this.utils.startWith( classItems[x], 'h-' )){
					append(classItems[x], 1);
				}
				// find v1 names
				for(key in this.maps) {
					// has v1 root but not also a v2 root so we dont double count
					if(this.maps[key].root === classItems[x] && classItems.indexOf(key) === -1) {
						append(key, 1);
					}
				}
			}
		}
		
		function append(name, count){
			if(out[name]){
				out[name] = out[name] + count;
			}else{
				out[name] = count;
			}
		}
	
		return out;
	},


	// is the uf type in the filter list
	shouldInclude: function(uf, filters) {
		var i;

		if(this.utils.isArray(filters) && filters.length > 0) {
			i = filters.length;
			while(i--) {
				if(uf.type[0] === filters[i]) {
					return true;
				}
			}
			return false;
		} else {
			return true;
		}
	},


	// finds uf within the tree of a parent uf but where they have on property
	findChildItems: function(dom, rootNode, ufName) {
		var items, 
			out = [],
			ufs = [],
			x,
			i,
			z,			
			y,
			rels;


		items = this.findRootNodes(dom, rootNode, true);
		if(items.length > 0) {
			i = items.length;
			x = 0; // 1 excludes parent
			while(x < i) {
				var classes = this.getUfClassNames(dom, items[x], ufName);
				if(classes.root.length > 0 && classes.properties.length === 0) {
					ufs = this.walkTree(dom, items[x], true);
					y = ufs.length;
					z = 0;
					while(z < y) {
						// make sure its a valid structure 
						if(ufs[z] && this.utils.hasProperties(ufs[z].properties)) {
							out.push(ufs[z]);
						}
						z++;
					}
				}
				x++;
			}
		}

		// find any rel add them as child even if the node a property
		if(this.options.rel && this.options.childrenRel){
			rels = this.findRels(dom, rootNode);
			if(rels) {
				out.push(rels);
			}
		}

		return out;
	},





	// returns all the root nodes in a document
	findRootNodes: function(dom, rootNode, fromChildren) {
		var arr = null,			
			out = [], 
			classList = [],
			test,
			items,
			x,
			i,
			y,
			key;


		// build any array of v1 root names    
		for(key in this.maps) {
			classList.push(this.maps[key].root);
		}

		// get all elements that have a class attribute  
		fromChildren = (fromChildren) ? fromChildren : false;
		if(fromChildren) {
			arr = this.domUtils.getNodesByAttribute(dom, rootNode, 'class');
		} else {
			arr = this.domUtils.getNodesByAttribute(dom, rootNode, 'class');
		}


		// loop elements that have a class attribute
		x = 0;    
		i = arr.length;
		while(x < i) {

			items = this.domUtils.getAttributeList(dom, arr[x], 'class');

			// loop classes on an element
			y = items.length;
			while(y--) {
				// match v1 root names 
				if(classList.indexOf(items[y]) > -1) {
					out.push(arr[x]);
					break;
				}

				// match v2 root name prefix
				if(this.utils.startWith(items[y], 'h-')) {
					out.push(arr[x]);
					break;
				}
			}

			x++;
		}
		return out;
	},


	// starts the tree walking for a single microformat
	walkTree: function(dom, node) {
		var classes,
			out = [],
			obj,
			itemRootID,
			x,
			i;

		// loop roots found on one element
		classes = this.getUfClassNames(dom, node);
		if(classes){
			x = 0;
			i = classes.root.length;
			while(x < i) {
				this.rootID++;
				itemRootID = this.rootID,
				obj = this.createUfObject(classes.root[x]);

				this.walkChildren(dom, node, obj, classes.root[x], itemRootID);
				this.impliedRules(dom, node, obj);
				out.push(obj);
				x++;
			}
		}
		return out;
	},


	// test for the need to apply the "implied rules" for name, photo and url
	impliedRules: function(dom, node, uf) {
		var context = this,
			value,
			descendant,
			newDate;


		function getNameAttr(dom, node) {
			var value = context.domUtils.getAttrValFromTagList(dom, node, ['img'], 'alt');
			if(!value) {
				value = context.domUtils.getAttrValFromTagList(dom, node, ['abbr'], 'title');
			}
			return value;
		}

		function getPhotoAttr(dom, node) {
			var value = context.domUtils.getAttrValFromTagList(dom, node, ['img'], 'src');
			if(!value) {
				value = context.domUtils.getAttrValFromTagList(dom, node, ['object'], 'data');
			}
			return value;
		}


		if(uf && uf.properties) {
			
			// implied name rule
			/*
				img.h-x[alt]
				abbr.h-x[title] 
				.h-x>img:only-node[alt] 
				.h-x>abbr:only-node[title] 
				.h-x>:only-node>img:only-node[alt]
				.h-x>:only-node>abbr:only-node[title] 
			*/

			if(!uf.properties.name) {
				value = getNameAttr(dom, node);
				if(!value) {
					descendant = this.domUtils.isSingleDescendant(dom, node, ['img', 'abbr']);
					if(descendant){
						value = getNameAttr(dom, descendant);
					}
					if(node.children.length > 0){
						child = this.domUtils.isSingleDescendant(dom, node);
						if(child){
							descendant = this.

							domUtils.isSingleDescendant(dom, child, ['img', 'abbr']);
							if(descendant){
								value = getNameAttr(dom, descendant);
							}
						}
					}
				}
				if(!value) {
					value = this.text.parse(dom, node, this.options.textFormat);
				}
				if(value) {
					uf.properties.name = [this.utils.trim(value).replace(/[\t\n\r ]+/g, ' ')];
				}
			}


			// implied photo rule
			/*
				img.h-x[src] 
				object.h-x[data] 
				.h-x>img[src]:only-of-type
				.h-x>object[data]:only-of-type 
				.h-x>:only-child>img[src]:only-of-type 
				.h-x>:only-child>object[data]:only-of-type 
			*/
			if(!uf.properties.photo) {
				value = getPhotoAttr(dom, node);
				if(!value) {
					descendant = this.domUtils.isOnlySingleDescendantOfType(dom, node, ['img', 'object']);
					if(descendant){
						value = getPhotoAttr(dom, descendant);
					}

					// single child that has a single descendant that is a img or object i.e. .h-x>:only-child>img[src]:only-of-type
					if(node.children.length > 0){
						child = this.domUtils.isSingleDescendant(dom, node);
						if(child){
							descendant = this.domUtils.isOnlySingleDescendantOfType(dom, child, ['img', 'object']);
							if(descendant){
								value = getPhotoAttr(dom, descendant);
							}
						}
					}
				}
				if(value) {
					// if we have no protocal separator, turn relative url to absolute ones
					if(value && value !== '' && value.indexOf(':') === -1) {
						value = this.domUtils.resolveUrl(dom, value, this.options.baseUrl);
					}
					uf.properties.photo = [this.utils.trim(value)];
				}
			}
			// implied url rule
			if(!uf.properties.url) {
				value = this.domUtils.getAttrValFromTagList(dom, node, ['a'], 'href');
				if(value) {
					uf.properties.url = [this.utils.trim(value)];
				}
			}

		}

		// implied date rule - temp fix
		// only apply to first date and time match
		if(uf.times.length > 0 && uf.dates.length > 0) {
			newDate = this.dates.dateTimeUnion(uf.dates[0][1], uf.times[0][1]);
			uf.properties[this.removePropPrefix(uf.times[0][0])][0] = newDate.toString();
		}
		delete uf.times;
		delete uf.dates;

	},


	// find child properties of microformat
	walkChildren: function(dom, node, out, ufName, rootID) {
		var context = this,
			childOut = {},
			rootItem,
			itemRootID,
			value,
			propertyName,
			i,
			x,
			y,
			z, 
			child;

		y = 0;
		z = node.children.length;
		while(y < z) {
			child = node.children[y];
	
			// get uf classes for this single element
			var classes = context.getUfClassNames(dom, child, ufName);

			// a property which is a microformat
			if(classes.root.length > 0 && classes.properties.length > 0) {
				// create object with type, property and value
				rootItem = context.createUfObject(
					classes.root, 
					this.text.parse(dom, child, this.options.textFormat)
				);

				// add the microformat as an array of properties
				propertyName = context.removePropPrefix(classes.properties[0]);
				if(out.properties[propertyName]) {
					out.properties[propertyName].push(rootItem);
				} else {
					out.properties[propertyName] = [rootItem];
				}
				context.rootID++;

				x = 0;
				i = rootItem.type.length;
				itemRootID = context.rootID;
				while(x < i) {
					context.walkChildren(dom, child, rootItem, rootItem.type[x], itemRootID);
					x++;
				}
				context.impliedRules(dom, child, rootItem);
			}

			// a property which is NOT a microformat and has not been use for a given root element
			if(classes.root.length === 0 && classes.properties.length > 0) {
				
				x = 0;
				i = classes.properties.length;
				while(x < i) {

					value = context.getValue(dom, child, classes.properties[x], out);
					propertyName = context.removePropPrefix(classes.properties[x]);

					// if the value is not empty 
					// and we have not added this value into a property with the same name already
					if(value !== '' && !context.hasRootID(dom, child, rootID, propertyName)) {
					//if(value !== '') {
						// add the property as a an array of properties 
						if(out.properties[propertyName]) {
							out.properties[propertyName].push(value);
						} else {
							out.properties[propertyName] = [value];
						}
						// add rootid to node so we track it use
						context.appendRootID(dom, child, rootID, propertyName);
					}
					x++;
				}

				context.walkChildren(dom, child, out, ufName, rootID);
			}

			// if the node has no uf classes, see if its children have
			if(classes.root.length === 0 && classes.properties.length === 0) {
				context.walkChildren(dom, child, out, ufName, rootID);
			}

			y++;
		}

	},



	// gets the value of a property
	getValue: function(dom, node, className, uf) {
		var value = '';

		if(this.utils.startWith(className, 'p-')) {
			value = this.getPValue(dom, node, true);
		}

		if(this.utils.startWith(className, 'e-')) {
			value = this.getEValue(dom, node);
		}

		if(this.utils.startWith(className, 'u-')) {
			value = this.getUValue(dom, node, true);
		}

		if(this.utils.startWith(className, 'dt-')) {
			value = this.getDTValue(dom, node, className, uf, true);
		}
		return value;
	},


	// gets the value of node which contain 'p-' property
	getPValue: function(dom, node, valueParse) {
		var out = '';
		if(valueParse) {
			out = this.getValueClass(dom, node, 'p');
		}

		if(!out && valueParse) {
			out = this.getValueTitle(dom, node);
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['abbr'], 'title');
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['data'], 'value');
		}

		if(node.name === 'br' || node.name === 'hr') {
			out = '';
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['img', 'area'], 'alt');
		}

		if(!out) {
			out = this.text.parse(dom, node, this.options.textFormat);
		}

		return(out) ? out : '';
	},


	// get the value of node which contain 'e-' property
	getEValue: function(dom, node) {
		node = this.expandURLs(dom, node, this.options.baseUrl)
		return this.domUtils.innerHTML(dom, node);
	},


	// get the value of node which contain 'u-' property
	getUValue: function(dom, node, valueParse) {
		// not sure this should be used for u property
		var out = '';
		if(valueParse) {
			out = this.getValueClass(dom, node, 'u');
		}

		if(!out && valueParse) {
			out = this.getValueTitle(dom, node);
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['a', 'area'], 'href');
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['img'], 'src');
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['object'], 'data');
		}

		// if we have no protocal separator, turn relative url to absolute ones
		if(out && out !== '' && out.indexOf(':') === -1) {
			out = this.domUtils.resolveUrl(dom, out, this.options.baseUrl);
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['abbr'], 'title');
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['data'], 'value');
		}

		if(!out) {
			out = this.text.parse(dom, node, this.options.textFormat);
		}

		return(out) ? out : '';
	},


	// get the value of node which contain 'dt-' property
	getDTValue: function(dom, node, className, uf, valueParse) {
		var out = '',
			format = 'uf';

		if(valueParse) {
			out = this.getValueClass(dom, node, 'dt');
		}

		if(!out && valueParse) {
			out = this.getValueTitle(dom, node);
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['time', 'ins', 'del'], 'datetime');
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['abbr'], 'title');
		}

		if(!out) {
			out = this.domUtils.getAttrValFromTagList(dom, node, ['data'], 'value');
		}

		if(!out) {
			out = this.text.parse(dom, node, this.options.textFormat);
		}

		if(out) {
			if(this.dates.isDuration(out)) {
				// just duration
				return out;
			} else if(this.dates.isTime(out)) {
				// just time or time+timezone
				if(uf) {
					uf.times.push([className, this.dates.parseAmPmTime(out)]);
				}
				return this.dates.parseAmPmTime(out);
			} else {
				// returns a date - uf profile 
				if(out.indexOf(' ') > 0){
					format = 'HTML5'
				}
				if(uf) {
					uf.dates.push([className, new ISODate(out).toString( format )]);
				}

				return new ISODate(out).toString( format );
			}
		} else {
			return '';
		}
	},


	// appends a new rootid to a given node
	appendRootID: function(dom, node, id, propertyName) {
		var rootids = [];
		if(this.domUtils.hasAttribute(dom, node,'rootids')){
			rootids = this.domUtils.getAttributeList(dom, node,'rootids');
		}
		rootids.push('id' + id + '-' + propertyName);
		this.domUtils.setAttribute(dom, node, 'rootids', rootids.join());
	},


	// does a given node already have a rootid
	hasRootID: function(dom, node, id, propertyName) {
		var rootids = [];
		if(!this.domUtils.hasAttribute(dom, node,'rootids')){
			return false;
		} else {
			rootids = this.domUtils.getAttributeList(dom, node, 'rootids');
			return(rootids.indexOf('id' + id + '-' + propertyName) > -1);
		}
	},


	// gets the text of any child nodes with the class value
	getValueClass: function(dom, node, propertyType) {
		var context = this,
			out = [],
			child,
			x,
			i;

		x = 0;
		i = node.children.length;
		while(x < i) {
			child = node.children[x];
			var value = null;
			if(this.domUtils.hasAttributeValue(dom, child, 'class', 'value')) {
				switch(propertyType) {
				case 'p':
					value = context.getPValue(dom, child, false);
					break;
				case 'u':
					value = context.getUValue(dom, child, false);
					break;
				case 'dt':
					value = context.getDTValue(dom, child, '', null, false);
					break;
				}
				if(value) {
					out.push(this.utils.trim(value));
				}
			}
			x++;
		}
		if(out.length > 0) {
			if(propertyType === 'p') {
				return out.join(' ').replace(/[\t\n\r ]+/g, ' ');
			}
			if(propertyType === 'u') {
				return out.join('');
			}
			if(propertyType === 'dt') {
				return this.dates.concatFragments(out).toString();
			}
		} else {
			return null;
		}
	},


	// returns a single string of the 'title' attr from all 
	// the child nodes with the class 'value-title' 
	getValueTitle: function(dom, node) {
		var out = [],
			items,
			i,
			x;

		items = this.domUtils.getNodesByAttributeValue(dom, node, 'class', 'value-title');
		x = 0;
		i = items.length;		
		while(x < i) {
			if(this.domUtils.hasAttribute(dom, items[x], 'title')) {
				out.push(this.domUtils.getAttribute(dom, items[x], 'title'));
			}
			x++;
		}
		return out.join('');
	},



	// returns any uf root and property assigned to a single element
	getUfClassNames: function(dom, node, ufName) {
		var out = {
				'root': [],
				'properties': []
			},
			classNames,
			key,
			items,
			item,
			i,
			x,
			z,
			y,
			map,
			prop,
			propName,
			v2Name,
			impiedRel;


		classNames = this.domUtils.getAttribute(dom, node, 'class');
		if(classNames) {
			items = classNames.split(' ');
			x = 0;
			i = items.length;
			while(x < i) {

				item = this.utils.trim(items[x]);

				// test for root prefix - v2
				if(this.utils.startWith(item, this.rootPrefix) && out.root.indexOf(item) === -1) {
					out.root.push(item);
				}

				// test for property prefix - v2
				z = this.propertyPrefixes.length;
				while(z--) {
					if(this.utils.startWith(item, this.propertyPrefixes[z]) && out.properties.indexOf(item) === -1) {
						out.properties.push(item);
					}
				}

				if(this.options.version1){

					// test for mapped root classnames v1
					for(key in this.maps) {
						if(this.maps.hasOwnProperty(key)) {
							// only add a root once
							if(this.maps[key].root === item && out.root.indexOf(key) === -1) {
								// if root map has subTree set to true
								// test to see if we should create a property or root
								if(this.maps[key].subTree && this.isSubTreeRoot(dom, node, this.maps[key], items) === false) {
									out.properties.push('p-' + this.maps[key].root);
								} else {
									out.root.push(key);
								}
								break;
							}
						}
					}

					// test for mapped property classnames v1
					map = this.getMapping(ufName);
					if(map) {
						for(key in map.properties) {
							prop = map.properties[key];
							propName = (prop.map) ? prop.map : 'p-' + key;

							if(key === item) {
								if(prop.uf) {
									// loop all the classList make sure 
									//   1. this property is a root
									//   2. that there is not already a equivalent v2 property ie url and u-url on the same element
									y = 0;
									while(y < i) {
										v2Name = this.getV2RootName(items[y]);
										// add new root
										if(prop.uf.indexOf(v2Name) > -1 && out.root.indexOf(v2Name) === -1) {
											out.root.push(v2Name);
										}
										y++;
									}
									//only add property once
									if(out.properties.indexOf(propName) === -1) {
										out.properties.push(propName);
									}
								} else {
									if(out.properties.indexOf(propName) === -1) {
										out.properties.push(propName);
									}
								}
								break;
							}

						}
					}
				}
				x++;

			}
		}

		impiedRel = this.findRelImpied(dom, node, ufName);
		if(impiedRel && out.properties.indexOf(impiedRel) === -1) {
			out.properties.push(impiedRel);
		}

		return out;
	},



	// given a V1 or V2 root name return mapping object
	getMapping: function(name) {
		var key;
		for(key in this.maps) {
			if(this.maps[key].root === name || key === name) {
				return this.maps[key];
			}
		}
		return null;
	},


	// given a V1 root name returns a V2 root name ie vcard >>> h-card
	getV2RootName: function(name) {
		var key;
		for(key in this.maps) {
			if(this.maps[key].root === name) {
				return key;
			}
		}
		return null;
	},


	// use to find if a subTree mapping should be a property or root
	isSubTreeRoot: function(dom, node, map, classList) {
		var out,
			hasSecondRoot,
			i,
			x;

		out = this.createUfObject(map.name);
		hasSecondRoot = false;	

		// loop the classList to see if there is a second root
		x = 0;
		i = classList.length;	
		while(x < i) {
			var item = this.utils.trim(classList[x]);
			for(var key in this.maps) {
				if(this.maps.hasOwnProperty(key)) {
					if(this.maps[key].root === item && this.maps[key].root !== map.root) {
						hasSecondRoot = true;
						break;
					}
				}
			}
			x++;
		}

		// walk the sub tree for properties that match this subTree
		this.walkChildren(dom, node, out, map.name, null);

		if(this.utils.hasProperties(out.properties) && hasSecondRoot === false) {
			return true;
		} else {
			return false;
		}
	},


	// finds any alt rel=* mappings for a given node/microformat
	findRelImpied: function(dom, node, ufName) {
		var out,
			map,
			i;

		map = this.getMapping(ufName);
		if(map) {
			for(var key in map.properties) {
				var prop = map.properties[key],
					propName = (prop.map) ? prop.map : 'p-' + key,
					relCount = 0;

				// if property as an alt rel=* mapping run test
				if(prop.relAlt && this.domUtils.hasAttribute(dom, node, 'rel')) {
					i = prop.relAlt.length;
					while(i--) {
						if(this.domUtils.hasAttributeValue(dom, node, 'rel', prop.relAlt[i])) {
							relCount++;
						}
					}
					if(relCount === prop.relAlt.length) {
						out = propName;
					}
				}
			}
		}
		return out;
	},


	// creates a blank uf object
	createUfObject: function(names, value) {
		var out = {};

		if(value) {
			out.value = value;
		}
		if(this.utils.isArray(names)) {
			out.type = names;
		} else {
			out.type = [names];
		}
		out.properties = {};
		out.times = [];
		out.dates = [];
		return out;
	},




	// removes uf property prefixs from a string
	removePropPrefix: function(str) {
		var i;

		i = this.propertyPrefixes.length;
		while(i--) {
			var prefix = this.propertyPrefixes[i];
			if(this.utils.startWith(str, prefix)) {
				str = str.substr(prefix.length);
			}
		}
		return str;
	},




	findRels: function(dom, rootNode, fromChildren) {
		var uf,
			out = {},
			x,
			i,
			y,
			z,
			relList,
			items,
			item,
			key,
			value,
			arr;


		// get all elements that have a rel attribute
		fromChildren = (fromChildren) ? fromChildren : false; 
		if(fromChildren) {
			arr = this.domUtils.getNodesByAttribute(dom, rootNode, 'rel');
		} else {
			arr = this.domUtils.getNodesByAttribute(dom, rootNode, 'rel');
		}

		x = 0;
		i = arr.length;
		while(x < i) {
			relList = this.domUtils.getAttribute(dom, arr[x], 'rel');

			if(relList) {
				items = relList.split(' ');

				z = 0;
				y = items.length;
				while(z < y) {
					item = this.utils.trim(items[z]);
					for(key in this.rels) {
						if(key === item) {
							value = this.domUtils.getAttrValFromTagList(dom, arr[x], ['a', 'area'], 'href');
							if(!value) {
								value = this.domUtils.getAttrValFromTagList(dom, arr[x], ['link'], 'href');
							}
							if(!out[key]) {
								out[key] = [];
							}
							// turn relative to abosulte urls
							if(value && value !== '' && value.indexOf(':') === -1) {
								value = this.domUtils.resolveUrl(dom, value, this.options.baseUrl);
							}
							out[key].push(value);
						}
					}
					z++;
				}
			}
			x++;
		}

		if(this.utils.hasProperties(out)) {
			uf = this.createUfObject('rel');
			delete uf.times;
			delete uf.dates;
			uf.properties = out;
		}
		return uf;
	},


	// add all the includes ino the dom structure
	addIncludes: function(dom, rootNode) {
		this.addAttributeIncludes(dom, rootNode, 'itemref');
		this.addAttributeIncludes(dom, rootNode, 'headers');
		this.addClassIncludes(dom, rootNode);
	},


	// add attribute based includes ie 'itemref' and 'headers'
	addAttributeIncludes: function(dom, rootNode, attributeName) {
		var out = {},
			arr,
			idList,
			i,
			x,
			z,
			y;

		arr = this.domUtils.getNodesByAttribute(dom, rootNode, attributeName);
		x = 0;
		i = arr.length;
		while(x < i) {
			idList = this.domUtils.getAttributeList(dom, arr[x], attributeName);
			if(idList) {
				z = 0;
				y = idList.length;
				while(z < y) {
					this.apppendInclude(dom, arr[x], idList[z]);
					z++;
				}
			}
			x++;
		}
	},


	// add class based includes
	addClassIncludes: function(dom, rootNode) {
		var out = {},
			node,
			id,
			clone,
			arr,
			x = 0,
			i;

		arr = this.domUtils.getNodesByAttributeValue(dom, rootNode, 'class', 'include');
		i = arr.length;
		while(x < i) {
			id = this.domUtils.getAttrValFromTagList(dom, arr[x], ['a'], 'href');
			if(!id) {
				id = this.domUtils.getAttrValFromTagList(dom, arr[x], ['object'], 'data');
			}
			this.apppendInclude(dom, arr[x], id);
			x++;
		}
	},


	// appends a clone of an element into another node
	apppendInclude: function(dom, node, id){
		var include,
			clone;

		id = this.utils.trim(id.replace('#', ''));
		include = dom.getElementById(id);
		if(include) {
			clone = this.domUtils.clone(dom, include);
			this.markIncludeChildren(dom, clone);
			this.domUtils.appendChild(dom, node, clone);
		}
	},


	// add a attribute to all the child microformats roots  
	markIncludeChildren: function(dom, rootNode) {
		var arr,
			x,
			i;

		// loop the array and add the attribute
		arr = this.findRootNodes(dom, rootNode);
		x = 0;
		i = arr.length;
		this.domUtils.setAttribute(dom, rootNode, 'data-include', 'true');
		this.domUtils.setAttribute(dom, rootNode, 'style', 'display:none');
		while(x < i) {
			this.domUtils.setAttribute(dom, arr[x], 'data-include', 'true');
			x++;
		}
	},


	// looks at nodes in DOM structures find href and src and expandes relative URLs
	expandURLs: function(dom, node, baseUrl){
		var context = this;
		node = this.domUtils.clone(dom, node)
		expand( this.domUtils.getNodesByAttribute(dom, node, 'href'), 'href' );
		expand( this.domUtils.getNodesByAttribute(dom, node, 'src'), 'src' );

		function expand( nodeList, attrName ){
			if(nodeList && nodeList.length){
				var i = nodeList.length;
				while (i--) {
					// this gives the orginal text
				    href =  nodeList[i].getAttribute(attrName)
				    if(href.toLowerCase().indexOf('http') !== 0){
				    	nodeList[i].setAttribute(attrName, context.domUtils.resolveUrl(dom, href, context.options.baseUrl));
				    }
				}
			}
		}
		return node;
	},


	// merges passed and default options -single level clone of properties
	mergeOptions: function(options) {
		var key;
		for(key in options) {
			if(options.hasOwnProperty(key)) {
				this.options[key] = options[key];
			}
		}
	},

	// removes an changes made to dom during parse process
	clearUpDom: function(dom){
		var arr,
			i;

		// remove all the items that where added as includes
		arr = this.domUtils.getNodesByAttribute(dom, dom, 'data-include');
		i = arr.length;
		while(i--) {
			this.domUtils.removeChild(dom,arr[i]);
		}
		// remove additional attibutes
		arr = this.domUtils.getNodesByAttribute(dom, dom, 'rootids');
		i = arr.length;
		while(i--) {
			this.domUtils.removeAttribute(dom, arr[i],'rootids');
		}
	}

};


microformats.parser = new microformats.Parser();
microformats.getItems = function(options){
	var dom,
		node;

	dom = (options && options.document)? options.document : document;
	node = (options && options.node)? options.node : dom;

	options = (options)? options : {};
	if(!options.baseUrl && dom && dom.location){
		options.baseUrl = dom.location.href;
	}

	return this.parser.get(dom, node, options);
};

microformats.getCounts = function(options) {
	var dom,
		node;

	dom = (options && options.document)? options.document : document;
	node = (options && options.node)? options.node : dom;
	options = (options)? options : {};

	return this.parser.count(dom, node, options);
}


// Simple support for CommonJS
if (typeof exports !== 'undefined') {
	exports.microformats = microformats;
}
	









/*
   Utilities
   Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
   MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
   
   */

microformats.parser.utils = {

    // is the object a string
    isString: function( obj ) {
        return typeof( obj ) === 'string';
    },


    // does a string start with the test
    startWith: function( str, test ) {
        return(str.indexOf(test) === 0);
    },


    // remove spaces at front and back of string
    trim: function( str ) {
        if(this.isString(str)){
            return str.replace(/^\s+|\s+$/g, '');
        }else{
            return '';
        }
    },


    // is a string only contain white space chars
    isOnlyWhiteSpace: function( str ){
        return !(/[^\t\n\r ]/.test( str ));
    },


    // removes white space from a string
    removeWhiteSpace: function( str ){
        return str.replace(/[\t\n\r ]+/g, ' ');
    },


    // is the object a array
    isArray: function( obj ) {
        return obj && !( obj.propertyIsEnumerable( 'length' ) ) && typeof obj === 'object' && typeof obj.length === 'number';
    },


    // simple function to find out if a object has any properties. 
    hasProperties: function( obj ) {
        var key;
        for(key in obj) {
            if( obj.hasOwnProperty( key ) ) {
                return true;
            }
        }
        return false;
    }

};





/*
   DOM Utilities
   Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
   MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
   
   */


microformats.parser.domUtils = {

	innerHTML: function(dom, node){
		return node.innerHTML;
	},


	// returns whether attribute exists
	hasAttribute: function(dom, node, attributeName) {
		return (node.attributes[attributeName]) ? true : false;
	},
	

	// returns the string value of an attribute
	getAttribute: function(dom, node, attributeName) {
		return node.getAttribute(attributeName);
	},


	// removes an attribute
	removeAttribute: function(dom, node, attributeName) {
		node.removeAttribute(attributeName);
	},


	// returns the an array of string value of an attribute
	getAttributeList: function(dom, node, attributeName) {
		var out = [],
			attList;

		attList = node.getAttribute(attributeName);
		if(attList && attList !== '') {
			if(attList.indexOf(' ') > -1) {
				out = attList.split(' ');
			} else {
				out.push(attList);
			}
		}
		return out;
	},


	// returns whether an attribute has an item of the given value
	hasAttributeValue: function(dom, node, attributeName, value) {
		var attList = this.getAttributeList(dom, node, attributeName);
		return (attList.indexOf(value) > -1);
	},



	// returns whether an attribute has an item that start with the given value
	hasAttributeValueByPrefix: function(dom, node, attributeName, value) {
		var attList = [],
			x = 0,
			i;

		attList = this.getAttributeList(dom, node, attributeName);
		i = attList.length;
		while(x < i) {
			if(utils.startWith(utils.trim(attList[x]), value)) {
				return true;
			}
			x++;
		}
		return false;
	},


	// return an array of elements that match an attribute/value
	getNodesByAttribute: function(dom, node, name) {
		var selector = '[' + name + ']';
		return node.querySelectorAll(selector);
	},


	// return an arry of elements that match an attribute/value
	getNodesByAttributeValue: function(dom, rootNode, name, value) {
		var arr = [],
			x = 0,
			i,
			out = [];

		arr = this.getNodesByAttribute(dom, rootNode, name);
		if(arr) {
			i = arr.length;
			while(x < i) {
				if(this.hasAttributeValue(dom, arr[x], name, value)) {
					out.push(arr[x]);
				}
				x++;
			}
		}
		return out;
	},


	// set the attribute value
	setAttribute: function(dom, node, name, value){
		node.setAttribute(name, value);
	},


	// returns the attribute value only if the node tagName is in the tagNames list
	getAttrValFromTagList: function(dom, node, tagNames, attributeName) {
		var i = tagNames.length;

		while(i--) {
			if(node.tagName.toLowerCase() === tagNames[i]) {
				var attr = this.getAttribute(dom, node, attributeName);
				if(attr && attr !== '') {
					return attr;
				}
			}
		}
		return null;
	},


	// return a node if it is the only descendant AND of a type ie CSS :only-node
	isSingleDescendant: function(dom, rootNode, tagNames){
		var count = 0,
			out = null,
			child,
			x,
			i,
			y;

		x = 0;
		y = rootNode.children.length;
		while(x < y) {
			child = rootNode.children[x];
			if(child.tagName) {
				// can filter or not by tagNames array
				if(tagNames && this.hasTagName(child, tagNames)){
					out = child;
				}
				if(!tagNames){
					out = child;
				}
				// count all tag/element nodes
				count ++;
			}
			x++;
		}
		if(count === 1 && out) {
			return out;
		} else {
			return null;
		}
	},



	// return a node if it is the only descendant of a type ie CSS :only-of-type 
	isOnlySingleDescendantOfType: function(dom, rootNode, tagNames) {
		var i = rootNode.children.length,
			count = 0,
			child,
			out = null;

		while(i--) {
			child = rootNode.children[i];
			if(child.nodeType === 1) {
				if(this.hasTagName(child, tagNames)){
					out = child;
					count++;
				}
			}
		}
		if(count === 1 && out){
			return out;
		}else{
			return null;
		}
	},


	hasTagName: function(node, tagNames){
		var i = tagNames.length;
		while(i--) {
			if(node.tagName.toLowerCase() === tagNames[i]) {
				return true;
			}
		}
		return false;
	},


	// append a child node
	appendChild: function(dom, node, childNode){
		node.appendChild(childNode);
	},


	// removes child node
	removeChild: function(dom, node){
		if (node.parentNode) {
			node.parentNode.removeChild(node);
		}
	},


	// simple dom node cloning function 
	clone: function(dom, node) {
		var newNode = node.cloneNode(true);
		newNode.removeAttribute('id');
		return newNode;
	},


	// where possible resolves url to absolute version ie test.png to http://example.com/test.png
	resolveUrl: function(dom, url, baseUrl) {
		// its not empty or null and we have no protocal separator
		if(url && url !== '' && url.indexOf(':') === -1){
			var dp = new DOMParser();
			var doc = dp.parseFromString('<html><head><base href="' + baseUrl+ '"><head><body><a href="' + url+ '"></a></body></html>', 'text/html');
			return doc.getElementsByTagName('a')[0].href;
		}
		return url;
	},


	resolveUrliFrame: function(dom, url, baseUrl){
		iframe = dom.createElement('iframe')
		iframe.innerHTML('<html><head><base href="' + baseUrl+ '"><head><body><a href="' + baseUrl+ '"></a></body></html>');
		return iframe.document.getElementsByTagName('a')[0].href;
	}


};   



(function(DOMParser) {
    "use strict";

    var DOMParser_proto;
    var real_parseFromString;
    var textHTML;         // Flag for text/html support
    var textXML;          // Flag for text/xml support
    var htmlElInnerHTML;  // Flag for support for setting html element's innerHTML

    // Stop here if DOMParser not defined
    if (!DOMParser) return;

    // Firefox, Opera and IE throw errors on unsupported types
    try {
        // WebKit returns null on unsupported types
        textHTML = !!(new DOMParser).parseFromString('', 'text/html');

    } catch (er) {
      textHTML = false;
    }

    // If text/html supported, don't need to do anything.
    if (textHTML) return;

    // Next try setting innerHTML of a created document
    // IE 9 and lower will throw an error (can't set innerHTML of its HTML element)
    try {
      var doc = document.implementation.createHTMLDocument('');
      doc.documentElement.innerHTML = '<title></title><div></div>';
      htmlElInnerHTML = true;

    } catch (er) {
      htmlElInnerHTML = false;
    }

    // If if that failed, try text/xml
    if (!htmlElInnerHTML) {

        try {
            textXML = !!(new DOMParser).parseFromString('', 'text/xml');

        } catch (er) {
            textHTML = false;
        }
    }

    // Mess with DOMParser.prototype (less than optimal...) if one of the above worked
    // Assume can write to the prototype, if not, make this a stand alone function
    if (DOMParser.prototype && (htmlElInnerHTML || textXML)) { 
        DOMParser_proto = DOMParser.prototype;
        real_parseFromString = DOMParser_proto.parseFromString;

        DOMParser_proto.parseFromString = function (markup, type) {

            // Only do this if type is text/html
            if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
                var doc, doc_el, first_el;

                // Use innerHTML if supported
                if (htmlElInnerHTML) {
                    doc = document.implementation.createHTMLDocument("");
                    doc_el = doc.documentElement;
                    doc_el.innerHTML = markup;
                    first_el = doc_el.firstElementChild;

                // Otherwise use XML method
                } else if (textXML) {

                    // Make sure markup is wrapped in HTML tags
                    // Should probably allow for a DOCTYPE
                    if (!(/^<html.*html>$/i.test(markup))) {
                        markup = '<html>' + markup + '<\/html>'; 
                    }
                    doc = (new DOMParser).parseFromString(markup, 'text/xml');
                    doc_el = doc.documentElement;
                    first_el = doc_el.firstElementChild;
                }

                // Is this an entire document or a fragment?
                if (doc_el.childElementCount == 1 && first_el.localName.toLowerCase() == 'html') {
                    doc.replaceChild(first_el, doc_el);
                }

                return doc;

            // If not text/html, send as-is to host method
            } else {
                return real_parseFromString.apply(this, arguments);
            }
        };
    }
}(DOMParser));



/*!
    ISO Date Parser
    Parses and builds ISO dates to the uf, W3C , HTML5 or RFC3339 profiles
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt

    */

function ISODate() {
    this.dY = -1;
    this.dM = -1;
    this.dD = -1;
    this.dDDD = -1;
    this.tH = -1;
    this.tM = -1;
    this.tS = -1;
    this.tD = -1;
    this.tzH = -1;
    this.tzM = -1;
    this.tzPN = '+';
    this.z = false;
    this.format = 'uf'; // uf or W3C or RFC3339 or HTML5
    this.setFormatSep();

    // optional should be full iso date/time string 
    if(arguments[0]) {
        this.parse(arguments[0]);
    }
}

ISODate.prototype = {

    // parses a full iso date/time string i.e. 2008-05-01T15:45:19Z
    parse: function( dateString ) {
        var dateNormalised = '',
            parts = [],
            tzArray = [],
            position = 0,
            datePart = '',
            timePart = '',
            timeZonePart = '';

        dateString = dateString.toString().toUpperCase().replace(' ','T');

        // break on 'T' divider or space
        if(dateString.indexOf('T') > -1) {
            parts = dateString.split('T');
            datePart = parts[0];
            timePart = parts[1];

            // zulu UTC                 
            if(timePart.indexOf( 'Z' ) > -1) {
                this.z = true;
            }

            // timezone
            if(timePart.indexOf( '+' ) > -1 || timePart.indexOf( '-' ) > -1) {
                tzArray = timePart.split( 'Z' ); // incase of incorrect use of Z
                timePart = tzArray[0];
                timeZonePart = tzArray[1];

                // timezone
                if(timePart.indexOf( '+' ) > -1 || timePart.indexOf( '-' ) > -1) {
                    position = 0;

                    if(timePart.indexOf( '+' ) > -1) {
                        position = timePart.indexOf( '+' );
                    } else {
                        position = timePart.indexOf( '-' );
                    }

                    timeZonePart = timePart.substring( position, timePart.length );
                    timePart = timePart.substring( 0, position );
                }
            }

        } else {
            datePart = dateString;
        }

        if(datePart !== '') {
            this.parseDate( datePart );
            if(timePart !== '') {
                this.parseTime( timePart );
                if(timeZonePart !== '') {
                    this.parseTimeZone( timeZonePart );
                }
            }
        }
        return this.toString();
    },


    // parses just the date element of a iso date/time string i.e. 2008-05-01
    parseDate: function( dateString ) {
        var dateNormalised = '',
            parts = [];

        // YYYY-DDD
        parts = dateString.match( /(\d\d\d\d)-(\d\d\d)/ );
        if(parts) {
            if(parts[1]) {
                this.dY = parts[1];
            }
            if(parts[2]) {
                this.dDDD = parts[2];
            }
        }

        if(this.dDDD === -1) {
            // YYYY-MM-DD ie 2008-05-01 and YYYYMMDD ie 20080501
            parts = dateString.match( /(\d\d\d\d)?-?(\d\d)?-?(\d\d)?/ );
            if(parts[1]) {
                this.dY = parts[1];
            }
            if(parts[2]) {
                this.dM = parts[2];
            }
            if(parts[3]) {
                this.dD = parts[3];
            }
        }
        return this.toString();
    },


    // parses just the time element of a iso date/time string i.e. 13:30:45
    parseTime: function( timeString ) {
        var timeNormalised = '',
            parts = [];

        // finds timezone HH:MM:SS and HHMMSS  ie 13:30:45, 133045 and 13:30:45.0135
        parts = timeString.match( /(\d\d)?:?(\d\d)?:?(\d\d)?.?([0-9]+)?/ );
        if(parts[1]) {
            this.tH = parts[1];
        }
        if(parts[2]) {
            this.tM = parts[2];
        }
        if(parts[3]) {
            this.tS = parts[3];
        }
        if(parts[4]) {
            this.tD = parts[4];
        }
        return this.toString();
    },


    // parses just the time element of a iso date/time string i.e. +08:00
    parseTimeZone: function( timeString ) {
        var timeNormalised = '',
            parts = [];

        // finds timezone +HH:MM and +HHMM  ie +13:30 and +1330
        parts = timeString.match( /([\-\+]{1})?(\d\d)?:?(\d\d)?/ );
        if(parts[1]) {
            this.tzPN = parts[1];
        }
        if(parts[2]) {
            this.tzH = parts[2];
        }
        if(parts[3]) {
            this.tzM = parts[3];
        }
        return this.toString();
    },


    // returns iso date/time string in in W3C Note, RFC 3339, HTML5 or Microformat profile
    toString: function( format ) {
        var output = '';

        if(format){
            this.format = format;
        }
        this.setFormatSep();

        if(this.dY  > -1) {
            output = this.dY;
            if(this.dM > 0 && this.dM < 13) {
                output += this.dsep + this.dM;
                if(this.dD > 0 && this.dD < 32) {
                    output += this.dsep + this.dD;
                    if(this.tH > -1 && this.tH < 25) {
                        output += this.sep + this.toTimeString( this );
                    }
                }
            }
            if(this.dDDD > -1) {
                output += this.dsep + this.dDDD;
            }
        } else if(this.tH > -1) {
            output += this.toTimeString( this );
        }

        return output;
    },


    // returns just the time string element of a iso date/time
    toTimeString: function( iso ) {
        var out = '';

        this.setFormatSep();
        // time and can only be created with a full date
        if(iso.tH) {
            if(iso.tH > -1 && iso.tH < 25) {
                out += iso.tH;
                out += (iso.tM > -1 && iso.tM < 61) ? this.tsep + iso.tM : this.tsep + '00';
                out += (iso.tS > -1 && iso.tS < 61) ? this.tsep + iso.tS : this.tsep + '00';
                out += (iso.tD > -1) ? '.' + iso.tD : '';
                // time zone offset 
                if(iso.z) {
                    out += 'Z';
                } else {
                    if(iso.tzH && iso.tzH > -1 && iso.tzH < 25) {
                        out += iso.tzPN + iso.tzH;
                        out += (iso.tzM > -1 && iso.tzM < 61) ? this.tzsep + iso.tzM : this.tzsep + '00';
                    }
                }
            }
        }
        return out;
    },


    // congifures the separators for a given profile
    setFormatSep: function() {
        switch( this.format ) {
            case 'RFC3339':
                this.sep = 'T';
                this.dsep = '';
                this.tsep = '';
                this.tzsep = '';
                break;
            case 'W3C':
                this.sep = 'T';
                this.dsep = '-';
                this.tsep = ':';
                this.tzsep = ':';
                break;
            case 'HTML5':
                this.sep = ' ';
                this.dsep = '-';
                this.tsep = ':';
                this.tzsep = ':';
                break;
            default:
                // uf
                this.sep = 'T';
                this.dsep = '-';
                this.tsep = ':';
                this.tzsep = '';
        }
    },

    hasFullDate: function() {
        return(this.dY !== -1 && this.dM !== -1 && this.dD !== -1);
    },


    hasDate: function() {
        return(this.dY !== -1);
    },


    hasTime: function() {
        return(this.tH !== -1);
    },


    hasTimeZone: function() {
        return(this.tzH !== -1);
    }

};



/*!
    Date Utilities
    Helper functions for microformat date parsing, and fragment concat
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt

    */

microformats.parser.dates = {

    utils:  microformats.parser.utils,

    removeAMPM: function(str) {
        return str.replace('pm', '').replace('p.m.', '').replace('am', '').replace('a.m.', '');
    },


    hasAM: function(time) {
        time = time.toLowerCase();
        return(time.indexOf('am') > -1 || time.indexOf('a.m.') > -1);
    },


    hasPM: function(time) {
        time = time.toLowerCase();
        return(time.indexOf('pm') > -1 || time.indexOf('p.m.') > -1);
    },


    // is str a ISO duration  i.e.  PY17M or PW12
    isDuration: function(str) {
        if(this.utils.isString(str)){
            str = str.toLowerCase();
            str = this.utils.trim( str );
            if(this.utils.startWith(str, 'p') && !str.match(/t|\s/) && !str.match('-') && !str.match(':')) {
                return true;
            }
        }
        return false;
    },


    // is str a time or timezone
    // ie HH-MM-SS or z+-HH-MM-SS 08:43 | 15:23:00:0567 | 10:34pm | 10:34 p.m. | +01:00:00 | -02:00 | z15:00 
    isTime: function(str) {
        if(this.utils.isString(str)){
            str = str.toLowerCase();
            str = this.utils.trim( str );
            // start with timezone char
            if( str.match(':') 
                && ( this.utils.startWith(str, 'z') 
                    || this.utils.startWith(str, '-') 
                    || this.utils.startWith(str, '+') )) {
                return true;
            }
            // has ante meridiem or post meridiem
            if( str.match(/^[0-9]/) && 
                ( this.hasAM(str) || this.hasPM(str) )) {
                return true;
            }
            // contains time delimiter but not datetime delimiter
            if( str.match(':') && !str.match(/t|\s/) ) {
                return true;
            }
        }
        return false;
    },


    // parses a time string and turns it into a 24hr time string
    // 5:34am = 05:34:00 and 1:52:04p.m. = 13:52:04
    parseAmPmTime: function(time) {
        var out = time,
            times = [];

        // if the string has a time : or am or pm
        if(this.utils.isString(out)) {
            time = time.toLowerCase();
            time = time.replace(/[ ]+/g, '');

            if(time.match(':') || this.hasAM(time) || this.hasPM(time)) {

                if(time.match(':')) {
                    times = time.split(':');
                } else {
                    times[0] = time;
                    times[0] = this.removeAMPM(times[0]);
                }

                if(this.hasAM(time)) {
                    if(times[0] === '12') {
                        times[0] = '00';
                    }
                }
                if(this.hasPM(time)) {
                    if(times[0] < 12) {
                        times[0] = parseInt(times[0], 10) + 12;
                    }
                }

                // add leading zero's where needed
                if(times[0] && times[0].length === 1) {
                    times[0] = '0' + times[0];
                }
                if(times[0]) {
                    time = times.join(':');
                }
            }
        }
        return this.removeAMPM(time);
    },


    // overlays a different time on a given data to return the union of the two
    dateTimeUnion: function(date, time) {
        var isodate = new ISODate(date),
            isotime = new ISODate();

        isotime.parseTime(this.parseAmPmTime(time));
        if(isodate.hasFullDate() && isotime.hasTime()) {
            isodate.tH = isotime.tH;
            isodate.tM = isotime.tM;
            isodate.tS = isotime.tS;
            isodate.tD = isotime.tD;
            return isodate;
        } else {
            new ISODate();
        }
    },


    // passed an array of date/time string fragments it creates an iso 
    // datetime string using microformat rules for value and value-title
    concatFragments: function (arr) {
        var out = null,
            i = 0,
            date = '',
            time = '',
            offset = '',
            value = '';

        for(i = 0; i < arr.length; i++) {
            value = arr[i].toUpperCase();
            // if the fragment already contains a full date just return it once its converted W3C profile
            if(value.match('T')) {
                return new ISODate(value);
            }
            // if it looks like a date
            if(value.charAt(4) === '-') {
                date = value;
                // if it looks like a timezone    
            } else if((value.charAt(0) === '-') || (value.charAt(0) === '+') || (value === 'Z')) {
                if(value.length === 2) {
                    offset = value[0] + '0' + value[1];
                } else {
                    offset = value;
                }
            } else {
                // else if could be a time 
                time = this.parseAmPmTime(value);
            }
        }

        if(date !== '') {
            return new ISODate(date + (time ? 'T' : '') + time + offset);
        } else {
            out = new ISODate(value);
            if(time !== '') {
                out.parseTime(time);
            }
            if(offset !== '') {
                out.parseTime(offset);
            }
            return out;
        }
    }

};


/*
    InnerText Parser 
    extracts plain text from DOM nodes
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt

    The text parser works like textContent but with five additional parsing rules 
    * It excluded the content from tag in the "excludeTags" list ie noframes script etc
    * It adds a single space behind the text string of any node considered block level
    * It removes all line return/feeds and tabs
    * It turns all whitespace into single spaces
    * It trims the final output

    */



function Text(){
    this.textFormat = 'normalised'; // normalised or whitespace
    this.blockLevelTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'hr', 'pre', 'table',
        'address', 'article', 'aside', 'blockquote', 'caption', 'col', 'colgroup', 'dd', 'div', 
        'dt', 'dir', 'fieldset', 'figcaption', 'figure', 'footer', 'form',  'header', 'hgroup', 'hr', 
        'li', 'map', 'menu', 'nav', 'optgroup', 'option', 'section', 'tbody', 'testarea', 
        'tfoot', 'th', 'thead', 'tr', 'td', 'ul', 'ol', 'dl', 'details'];

    this.excludeTags = ['noframe', 'noscript', 'script', 'style', 'frames', 'frameset'];
} 


Text.prototype = {

    // gets the text from dom node 
    parse: function(dom, node, textFormat){
        var out;

        this.textFormat = (textFormat)? textFormat : this.textFormat;
        if(this.textFormat === 'normalised'){
            out = this.walkTreeForText( node );
            if(out !== undefined){
                out = out.replace( /&nbsp;/g, ' ') ;    // exchanges html entity for space into space char
                out = this.removeWhiteSpace( out );     // removes linefeeds, tabs and addtional spaces
                out = this.decodeEntities( dom, out );  // decode HTML entities
                out = out.replace( '–', '-' );          // correct dash decoding
                return this.trim( out );
            }else{
                return undefined;
            }
        }else{
           return dom(node).text(); 
        }
    },



    // extracts the text nodes in the tree
    walkTreeForText: function( node ) {
        var out = '',
            j = 0;

        if(this.excludeTags.indexOf( node.name ) > -1){
            return out;
        }

        // if node is a text node get its text
        if(node.nodeType && node.nodeType === 3){
            out += this.getElementText( node ); 
        }

        // get the text of the child nodes
        if(node.childNodes && node.childNodes.length > 0){
            for (j = 0; j < node.childNodes.length; j++) {
                var text = this.walkTreeForText( node.childNodes[j] );
                if(text !== undefined){
                    out += text;
                }
            }
        }

        // if its a block level tag add an additional space at the end
        if(this.blockLevelTags.indexOf( node.name ) !== -1){
            out += ' ';
        } 
        
        return (out === '')? undefined : out ;
    },    


    // get the text from a node in the dom
    getElementText: function( node ){
        if(node.nodeValue){
            return node.nodeValue;
        }else{
            return '';
        }
    },

    // remove spaces at front and back of string
    trim: function( str ) {
        return str.replace(/^\s+|\s+$/g, '');
    },


    // removes white space from a string
    removeWhiteSpace: function( str ){
        return str.replace(/[\t\n\r ]+/g, ' ');
    },

    decodeEntities: function( dom, str ){
        return dom.createTextNode( str ).nodeValue;
    }

};


microformats.parser.text = {};

microformats.parser.text.parse = function(dom, node, textFormat){
    var text = new Text();
    return text.parse(dom, node, textFormat);
} 



/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.maps['h-adr'] = {
	root: 'adr',
	name: 'h-adr',
	properties: {
		'post-office-box': {},
		'street-address': {},
		'extended-address': {},
		'locality': {},
		'region': {},
		'postal-code': {},
		'country-name': {}
	}
};



/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.maps['h-card'] =  {
	root: 'vcard',
	name: 'h-card',
	properties: {
		'fn': {
			'map': 'p-name'
		},
		'adr': {
			'uf': ['h-adr']
		},
		'agent': {
			'uf': ['h-card']
		},
		'bday': {
			'map': 'dt-bday'
		},
		'class': {},
		'category': {
			'map': 'p-category',
			'relAlt': ['tag']
		},
		'email': {
			'map': 'u-email'
		},
		'geo': {
			'map': 'p-geo', 
			'uf': ['h-geo']
		},
		'key': {},
		'label': {},
		'logo': {
			'map': 'u-logo'
		},
		'mailer': {},
		'honorific-prefix': {},
		'given-name': {},
		'additional-name': {},
		'family-name': {},
		'honorific-suffix': {},
		'nickname': {},
		'note': {}, // could be html i.e. e-note
		'org': {},
		'p-organization-name': {},
		'p-organization-unit': {},
		'photo': {
			'map': 'u-photo'
		},
		'rev': {
			'map': 'dt-rev'
		},
		'role': {},
		'sequence': {},
		'sort-string': {},
		'sound': {
			'map': 'u-sound'
		},
		'title': {},
		'tel': {},
		'tz': {},
		'uid': {
			'map': 'u-uid'
		},
		'url': {
			'map': 'u-url'
		}
	}
};


/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.maps['h-entry'] = {
	root: 'hentry',
	name: 'h-entry',
	properties: {
		'entry-title': {
			'map': 'p-name'
		},
		'entry-summary': {
			'map': 'p-summary'
		},
		'entry-content': {
			'map': 'e-content'
		},
		'published': {
			'map': 'dt-published'
		},
		'updated': {
			'map': 'dt-updated'
		},
		'author': { 
			'uf': ['h-card']
		},
		'category': {
			'map': 'p-category',
			'relAlt': ['tag']
		},
		'geo': {
			'map': 'p-geo', 
			'uf': ['h-geo']
		},
		'latitude': {},
		'longitude': {},
		'url': {
            'map': 'u-url',
            'relAlt': ['bookmark']
        }
	}
};


/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.maps['h-event'] = {  
	root: 'vevent',
	name: 'h-event',
	properties: {
		'summary': {
			'map': 'p-name'
		},
		'dtstart': {
			'map': 'dt-start'
		},
		'dtend': {
			'map': 'dt-end'
		},
		'description': {},
		'url': {
			'map': 'u-url'
		},
		'category': {
			'map': 'p-category',
			'relAlt': ['tag']
		},
		'location': {
			'uf': ['h-card']
		},
		'geo': {
			'uf': ['h-geo']
		},
		'latitude': {},
		'longitude': {},
		'duration': {
			'map': 'dt-duration'
		},
		'contact': {
			'uf': ['h-card']
		},
		'organizer': {
			'uf': ['h-card']},
		'attendee': {
			'uf': ['h-card']},
		'uid': {
			'map': 'u-uid'
		},
		'attach': {
			'map': 'u-attach'
		},
		'status': {},
		'rdate': {}, 
		'rrule': {}
	}
};


/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.maps['h-geo'] = {
	root: 'geo',
	name: 'h-geo',
	properties: {
		'latitude': {},
		'longitude': {}
	}
};


/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.maps['h-item'] = {
	root: 'item',
	name: 'h-item',
	subTree: true,
	properties: {
		'fn': {
			'map': 'p-name'
		},
		'url': {
			'map': 'u-url'
		},
		'photo': {
			'map': 'u-photo'
		}
	}
};


/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.maps['h-listing'] = {
  root: 'hlisting',
  name: 'h-listing',
  properties: {
    'version': {},
    'lister': {
      'uf': ['h-card']
    },
    'dtlisted': {
      'map': 'dt-listed'
    },
    'dtexpired': {
      'map': 'dt-expired'
    },
    'location': {},
    'price': {},
    'item': {
      'uf': ['h-card','a-adr','h-geo']
    },
    'summary': {
      'map': 'p-name'
    },
    'description': {
      'map': 'e-description'
    },
    'listing': {}
  }
};

/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.maps['h-news'] = {
  root: 'hnews',
  name: 'h-news',
  properties: {
    'entry': {
      'uf': ['h-entry']
    },
    'geo': {
      'uf': ['h-geo']
    },
    'latitude': {},
    'longitude': {},
    'source-org': {
      'uf': ['h-card']
    },
    'dateline': {
      'uf': ['h-card']
    },
    'item-license': {
      'map': 'u-item-license'
    },
    'principles': {
      'map': 'u-principles', 
      'relAlt': ['principles']
    }
  }
};



/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.maps['h-org'] = {
    root: 'h-x-org',  // drop this from v1 as it causes issue with fn org hcard pattern
    name: 'h-org',
    properties: {
        'organization-name': {},
        'organization-unit': {}
    }
};



/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.maps['h-product'] = {
  root: 'hproduct',
  name: 'h-product',
  properties: {
    'brand': {
      'uf': ['h-card']
    },
    'category': {
      'map': 'p-category',
      'relAlt': ['tag']
    },
    'price': {},
    'description': {
      'map': 'e-description'
    },
    'fn': {
      'map': 'p-name'
    },
    'photo': {
      'map': 'u-photo'
    },
    'url': {
      'map': 'u-url'
    },
    'review': {
      'uf': ['h-review', 'h-review-aggregate']
    },
    'listing': {
      'uf': ['h-listing']
    },
    'identifier': {
      'map': 'u-identifier'
    }
  }
};


/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.maps['h-recipe'] = {
  root: 'hrecipe',
  name: 'h-recipe',
  properties: {
    'fn': {
      'map': 'p-name'
    },
    'ingredient': {
      'map': 'e-ingredient'
    },
    'yield': {},
    'instructions': {
      'map': 'e-instructions'
    },
    'duration': {
      'map': 'dt-duration'
    },
    'photo': {
      'map': 'u-photo'
    },
    'summary': {},
    'author': {
      'uf': ['h-card']
    },
    'published': {
      'map': 'dt-published'
    },
    'nutrition': {},
    'tag': {}
  }
};



/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.maps['h-resume'] = {
	root: 'hresume',
	name: 'h-resume',
	properties: {
		'summary': {},
		'contact': {
			'uf': ['h-card']
		},
		'education': {
			'uf': ['h-card', 'h-event']
		},
		'experience': {
			'uf': ['h-card', 'h-event']
		},
		'skill': {},
		'affiliation': {
			'uf': ['h-card']
		}
	}
};


/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.maps['h-review-aggregate'] = {
    root: 'hreview-aggregate',
    name: 'h-review-aggregate',
    properties: {
        'summary': {
            'map': 'p-name'
        },
        'item': {
            'map': 'p-item',
            'uf': ['h-item', 'h-geo', 'h-adr', 'h-card', 'h-event', 'h-product']
        },
        'rating': {},
        'average': {},
        'best': {},
        'worst': {},       
        'count': {},
        'votes': {},
        'category': {
            'map': 'p-category',
            'relAlt': ['tag']
        },
        'url': {
            'map': 'u-url',
            'relAlt': ['self', 'bookmark']
        }
    }
};



/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.maps['h-review'] = {
    root: 'hreview',
    name: 'h-review',
    properties: {
        'summary': {
            'map': 'p-name'
        },
        'description': {
            'map': 'e-description'
        },
        'item': {
            'map': 'p-item',
            'uf': ['h-item', 'h-geo', 'h-adr', 'h-card', 'h-event', 'h-product']
        },
        'reviewer': {
            'uf': ['h-card']
        },
        'dtreviewer': {
            'map': 'dt-reviewer'
        },
        'rating': {},
        'best': {},
        'worst': {},
        'category': {
            'map': 'p-category',
            'relAlt': ['tag']
        },
        'url': {
            'map': 'u-url',
            'relAlt': ['self', 'bookmark']
        }
    }
};


/*
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
  */
microformats.parser.rels = {
	// xfn
	//        ['link', 'a or area'] yes, no or external
	'friend': [ 'yes','external'], 
	'acquaintance': [ 'yes','external'],  
	'contact': [ 'yes','external'], 
	'met': [ 'yes','external'], 
	'co-worker': [ 'yes','external'],  
	'colleague': [ 'yes','external'], 
	'co-resident': [ 'yes','external'],  
	'neighbor': [ 'yes','external'], 
	'child': [ 'yes','external'],  
	'parent': [ 'yes','external'],  
	'sibling': [ 'yes','external'],  
	'spouse': [ 'yes','external'],  
	'kin': [ 'yes','external'], 
	'muse': [ 'yes','external'],  
	'crush': [ 'yes','external'],  
	'date': [ 'yes','external'],  
	'sweetheart': [ 'yes','external'], 
	'me': [ 'yes','external'], 

	// other rel= 
	'license': [ 'yes','yes'],
	'nofollow': [ 'no','external'],
	'tag': [ 'no','yes'],
	'self': [ 'no','external'],
	'bookmark': [ 'no','external'],
	'author': [ 'no','external'],
	'home': [ 'no','external'],
	'directory': [ 'no','external'],
	'enclosure': [ 'no','external'],
	'pronunciation': [ 'no','external'],
	'payment': [ 'no','external'],
	'principles': [ 'no','external']

};

///// end microformat-shiv.js /////

window.onload = lt_render();
