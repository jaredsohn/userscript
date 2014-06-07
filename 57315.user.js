// ==UserScript==
// @name           Danbooru: Improved Tooltips
// @include        http://danbooru.donmai.us/*
// @include        http://safebooru.donmai.us/*
// ==/UserScript==

/*
  BUGS:
    Excessively long tags or favorites lists aren't handled well.
    Nonexistant posts (i.e. posts that have been double-deleted, or posts with rating:[qe] on Safebooru) aren't handled.
    Positioning broken inside tables (the offsetParent of a element that is a child of a table element is the table element).

    Chrome:
      Scrolling out of a tooltip doesn't hide the tooltip until the mouse is moved.
      Sometimes when clicking the more tags link then quickly moving to another thumbnail
      the original tooltip won't hide.
*/

function include_script(code, load) {
	var script  = document.createElement('script');
	script.type = 'text/javascript';

	if (typeof code === 'string') {
		script.src = code;
	} else {
		script.innerHTML = '(' + code + ')();';
	}

	script.addEventListener('load', load, false);

	document.getElementsByTagName('head')[0].appendChild(script);
}

function include(scripts) {
	if (scripts) {
		include_script(scripts[0], function () {
			include(scripts.slice(1));
		});
	}
}

function main() {
	$T = {};
	$T.buildTag = function (tag, attributes) {
		var element = new Element(tag, attributes);

		function coerce(obj) {
			if (Object.isElement(obj)) {
				element.appendChild(obj);
			} else if (obj === null || obj === undefined) {
				return;
			} else if (Object.isFunction(obj)) {
				coerce(obj(element));
			} else if (obj.each) {
				obj.each(function (elmt) {
					coerce(elmt);
				});
			} else {
				var text = document.createTextNode(obj.toString());
				element.appendChild(text);
			}
		}

		for (var i = 2; i < arguments.length; ++i) {
			coerce(arguments[i]);
		}

		return element;
	};

	var tags = $A([
		'a', 'button', 'br', 'canvas', 'dd', 'div', 'dl', 'dt', 'em', 'fieldset',
		'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'img', 'input',
		'label', 'legend', 'li', 'ol', 'optgroup', 'option', 'p', 'pre',
		'select', 'span', 'strong', 'style', 'table', 'tbody', 'td', 'textarea', 'tfoot',
		'th', 'thead', 'tr', 'tt', 'ul'
	]);

	tags.each(function (tag) {
		$T[tag] = $T.buildTag.curry(tag);
	});

/********************/

	CSS = {};
	CSS.build = function (rules) {
		var text = '';

		$H(rules).each(function (rule) {
			text += rule.key + " {\n";

			$H(rule.value).each(function (prop) {
				// Convert camelCase to camel-case.
				prop.key = prop.key.dasherize().gsub(/([A-Z])/, function (match) {
					return '-' + match[1].toLowerCase();
				});

				text += "\t" + prop.key + ': ' + prop.value + ";\n";
			});

			text += "}\n";
		});

		var style = $T.style({ type: 'text/css' }, text);

		$$('head').first().insert(style);
	};

/*************/

	Rect = Class.create({
		initialize: function (dimensions) {
			this.width  = dimensions.width  !== undefined ? dimensions.width  : Math.max(0, dimensions.right  - dimensions.left);
			this.height = dimensions.height !== undefined ? dimensions.height : Math.max(0, dimensions.bottom - dimensions.top);

			this.left   = dimensions.left   !== undefined ? dimensions.left   : dimensions.right  - dimensions.width;
			this.right  = dimensions.right  !== undefined ? dimensions.right  : dimensions.left   + dimensions.width;
			this.top    = dimensions.top    !== undefined ? dimensions.top    : dimensions.bottom - dimensions.height;
			this.bottom = dimensions.bottom !== undefined ? dimensions.bottom : dimensions.top    + dimensions.height;

			this.area   = this.width * this.height;
		},

		intersect: function(other) {
			var o = new Rect({
				top:    Math.max(this.top,  other.top),
				left:   Math.max(this.left, other.left),
				right:  Math.min(this.left + this.width,  other.left + other.width),
				bottom: Math.min(this.top  + this.height, other.top  + other.height)
			});

			return o;
		}
	});

/************/

	Policy = Class.create({
		initialize: function (policyType, newPolicies) {
			var policies = this.constructor.policies;
			var policy   = policies.get(policyType);

			if (!policy) {
				policy = $H();
				policies.set(policyType, policy);
			}

			$H(newPolicies).each(function (pair) {
				policy.set(pair.key, pair.value);
			});
		}
	});

	Policy.create = function (component, options) {
		options = Object.clone(options);

		var policies = this.policies;
		var policy   = policies.get(options.type);

		var constructor = policy.get(component.type);
		if (Object.isUndefined(constructor)) {
			constructor = policy.get('default');
		}

		return constructor(component, options);
	};

	Policy.Placement = Class.create(Policy, {});
	Policy.Placement.create = Policy.create;
	Policy.Placement.policies = $H();

	Policy.Display = Class.create(Policy, {});
	Policy.Display.create = Policy.create;
	Policy.Display.policies = $H();

/****************/

	Placement = Class.create({
		initialize: function(component, options) {
			this.options = options || { };

			this.component = component;
		},

		placeAt: function(left, top) {
			this.component.element.style.left = left + 'px';
			this.component.element.style.top  = top  + 'px';
		},

		placeElement: function () { }
	});

	Placement.getAbsoluteRect = function (element) {
		if (element.getClientRects && element.getClientRects().length) {
			var scrollOffsets = document.viewport.getScrollOffsets();
			var r = element.getClientRects()[0];

			return new Rect({
				left:   scrollOffsets.left + r.left,
				top:    scrollOffsets.top  + r.top,
				width:  r.right  - r.left,
				height: r.bottom - r.top
			});
		} else {
			var cumulativeOffset = element.cumulativeOffset();
			var dimensions       = element.getDimensions();

			return new Rect({
				left:   cumulativeOffset.left,
				top:	  cumulativeOffset.top,
				width:  dimensions.width,
				height: dimensions.height
			});			
		}
	};

/********/

	Placement.Static = Class.create(Placement, {
		type: 'static',

		initialize: function($super, component, options) {
			$super(component, options);
		},

		placeElement: function () { }
	});

	new Policy.Placement('static', {
		'default': function (component, options) {
			return new Placement.Static(component, options);
		}
	});

/**********/

	Placement.Absolute = Class.create(Placement, {
		type: 'absolute',

		initialize: function($super, component, options) {
			$super(component, options);

			this.options.offset   = this.options.offset   || { };
			this.options.offset.x = this.options.offset.x || 0;
			this.options.offset.y = this.options.offset.y || 0;

			this.component.element.style.position = 'absolute';
		},

		position: function (left, top, offset) {
			var parentOffset = this.component.element.getOffsetParent().cumulativeOffset();
			var elementRect  = Placement.getAbsoluteRect(this.component.element);

			return new Rect({
				left:   left + offset.x - parentOffset.left,
				top:    top  + offset.y - parentOffset.top,
				width:  elementRect.width,
				height: elementRect.height
			});
		},

		placeElement: function () {
			var dest = this.position(0, 0, this.options.offset);
			return this.placeAt(dest.left, dest.top);
		}
	});

	new Policy.Placement('absolute', {
		'default': function (component, options) {
			return new Placement.Absolute(component, options);
		}
	});

/*******/

	Placement.Relative = Class.create(Placement.Absolute, {
		type: 'relative',

		initialize: function($super, target, component, options) {
			$super(component, options);

			this.options.anchor         = this.options.anchor         || { };
			this.options.anchor.target  = this.options.anchor.target  || 'bottom-left';
			this.options.anchor.element = this.options.anchor.element || 'top-left';

			this.options.reposition = this.options.reposition === undefined ? true : this.options.reposition;

			this.target = target;
		},

		position: function ($super, anchor, offset) {
			var targetOffset  = this.computeOffset(this.target,            anchor.target);
			var elementOffset = this.computeOffset(this.component.element, anchor.element);

			var targetRect  = Placement.getAbsoluteRect(this.target);

			return $super(
				targetRect.left + elementOffset.x - targetOffset.x,
				targetRect.top  + elementOffset.y - targetOffset.y,
				offset
			);
		},

		rotatePosition: {
			'left-top':      'top-center',
			'top-left':      'top-center',
			'top-center':    'top-right',
			'top-right':     'right-center',
			'right-top':     'right-center',
			'right-center':  'right-bottom',
			'right-bottom':  'bottom-center',
			'bottom-right':  'bottom-center',
			'bottom-center': 'bottom-left',
			'bottom-left':   'left-center',
			'left-bottom':   'left-center',
			'left-center':   'left-top'
		},

		placeElement: function ($super) {
			var scrollOffsets = document.viewport.getScrollOffsets();
			var viewportRect = new Rect({
				top:    scrollOffsets.top,
				left:   scrollOffsets.left,
				width:  document.viewport.getWidth(),
				height: document.viewport.getHeight()
			});

			var targetRect  = Placement.getAbsoluteRect(this.target);
			var elementRect = Placement.getAbsoluteRect(this.component.element);

			var anchor = Object.clone(this.options.anchor);
			var offset = Object.clone(this.options.offset);

			var dest = this.position(anchor, offset);

			var viewportOverlap = dest.intersect(viewportRect);
			if (this.options.reposition && viewportOverlap.area < elementRect.area) {
				var candidates = $A([]);
				var weight = [3, 5, 1, 6, 0, 4, 2];

				for (var i = 0; i < 8; i++) {
					offset = {
						x: (offset.x - offset.y) / Math.sqrt(2),
						y: (offset.x + offset.y) / Math.sqrt(2)
					};

					anchor = {
						target:  this.rotatePosition[anchor.target],
						element: this.rotatePosition[anchor.element]
					};

					dest = this.position(anchor, offset);

					var viewportOverlap = dest.intersect(viewportRect);
					var targetOverlap   = dest.intersect(targetRect);

					candidates.push({
						rect:           Object.clone(dest),
						elementVisible: Math.min(1, viewportOverlap.area / elementRect.area),
						targetVisible:  1 - (targetOverlap.area / targetRect.area),
						weight:         weight[i]
					});
				}

				candidates = candidates.sort(function(left, right) {
					return  left.elementVisible < right.elementVisible ?  1
						: left.elementVisible > right.elementVisible ? -1
						: left.targetVisible  < right.targetVisible  ?  1
						: left.targetVisible  > right.targetVisible  ? -1
						: left.weight         < right.weight         ?  1
						: left.weight         > right.weight         ? -1
						: 0;
				});

				dest = candidates.first().rect;
			}

			this.placeAt(dest.left, dest.top);
		},

		computeOffset: function (element, location) {
			if (element.getClientRects && element.getClientRects().length) {
				var r = element.getClientRects()[0];
			} else {
				var r = { width: element.getWidth(), height: element.getHeight() };
			}

			var width  = r.width;
			var height = r.height;

			switch(location) {
				case 'left-top':
				case 'top-left':      return { x: 0, y: 0 };
				case 'top-center':    return { x: -(width / 2), y: 0 };
				case 'right-top':
				case 'top-right':     return { x: -width, y: 0 };
				case 'left-center':   return { x: 0, y: -(height / 2) };
				case 'right-center':  return { x: -width, y: -(height / 2) };
				case 'left-bottom':
				case 'bottom-left':   return { x: 0, y: -height };
				case 'bottom-center': return { x: -(width / 2), y: -height };
				case 'right-bottom':
				case 'bottom-right':  return { x: -width, y: -height };
				default:              throw "Invalid location: " + location;
			}
		}
	});


	new Policy.Placement('relative', {
		DropdownMenu: function (component, options) {
			return new Placement.Relative(component.root, component, options);
		},

		Tooltip: function (component, options) {
			return new Placement.Relative(options.target || component.trigger, component, options);
		},

		'default': function (component, options) {
			return new Placement.Relative(options.target, component, options);
		}
	});

/***********/

	Placement.Fixed = Class.create(Placement, {
		type: 'fixed',

		initialize: function ($super, component, options) {
			$super(component, options);

			this.component.element.style.position = 'fixed';

			this.options.horizontal = this.options.horizontal || 'center';
			this.options.vertical   = this.options.vertical   || 'center';
		},

		placeElement: function ($super) {
			var r = Placement.getAbsoluteRect(this.component.element);

			var left = this.computeOffset(this.options.horizontal, document.viewport.getWidth(),  r.width);
			var top  = this.computeOffset(this.options.vertical,   document.viewport.getHeight(), r.height);

			this.placeAt(left, top);
		},

		computeOffset: function (placement, viewportDimension, elementDimension) {
			switch (placement) {
				case 'top':
				case 'left':   return 0;
				case 'center': return viewportDimension / 2 - elementDimension / 2;
				case 'bottom':
				case 'right':  return viewportDimension - elementDimension;
			}
		}
	});

	new Policy.Placement('fixed', {
		'default': function (component, options) {
			return new Placement.Fixed(component, options);
		}
	});

/*****************************/

	Display = Class.create({
		initialize: function(component, options) {
			this.options = options || { };

			this.options.show = this.options.show || { };
			this.options.hide = this.options.hide || { };

			this.component = component;

			this.hasBeenShown = false;

			if (this.options.initialShow == false) {
				this.component.element.style.display = 'none';
			} else {
				this.show();
			}
		},

		visible: function () {
			// XXX what if parent is display: none?
			return this.component.element.visible();
		},

		toggle: function () {
			this.visible() ? this.hide() : this.show();
		},

		hide: function () {
			this.component.fire('hide');

			if (this.options.hide.effect) {
				new this.options.hide.effect(this.component.element, this.options.hide.options);
			} else {
				this.component.element.hide();
			}
		},

		show: function (reposition) {
			if (this.hasBeenShown == false) {
				this.component.fire('firstshown');
				this.hasBeenShown = true;
			}

			this.component.fire('show');

			if (reposition === undefined ? true : reposition) {
				this.reposition();
			}

			if (this.options.show.effect) {
				new this.options.show.effect(this.component.element, this.options.show.options);
			} else {
				this.component.element.show();
			}
		},

		reposition: function () {
			this.component.placement.placeElement();
		},

		enableEventListeners: function () {
		},

		disableEventListeners: function () {
		},
	});

/*******/

	Display.Static = Class.create(Display, {
		type: 'static'
	});

	new Policy.Display('static', {
		'default': function (component, options) {
			return new Display.Static(component, options);
		}
	});

/********/

	Display.Click = Class.create(Display, {
		type: 'click',

		initialize: function($super, trigger, component, options) {
			$super(component, $H({
				initialShow: false
			}).merge(options).toObject());

			this.trigger = trigger;

			var click = function (event) {
//				this.toggle();
				this.show();
			};

			var clickout = function (event) {
				if (event.findElement() != this.component.element && this.visible()) {
					this.hide();
				}
			};

			this.click    = click.bind(this);
			this.clickout = clickout.bind(this);

			this.enableEventListeners();
		},

		enableEventListeners: function () {
			this.trigger.observe('click', this.click);
			document.observe('click', this.clickout);
		},

		disableEventListeners: function () {
			this.trigger.stopObserving('click', this.click);
			document.stopObserving('click', this.clickout);
		}
	});

	new Policy.Display('click', {
		DropdownMenu: function (component, options) {
			return new Display.Click(component.root, component, options);
		},

		'default': function (component, options) {
			return new Display.Click(options.trigger, component, options);
		}
	});

/********/

	Display.Hover = Class.create(Display, {
		type: 'hover',

		initialize: function($super, trigger, component, options) {
			$super(component, $H({
				initialShow: false
			}).merge(options).toObject());

			this.options.show.delay = this.options.show.delay || 0;
			this.options.hide.delay = this.options.hide.delay || 0;

			this.trigger = trigger;

			this.delayShow = null;
			this.delayHide = null;

			var mouseout = function (event) {
				if (!this.inElements(event, [ this.trigger, this.component.element ])) {
					return;
				}

				if (this.delayShow) {
					window.clearTimeout(this.delayShow);
					this.delayShow = null;
					return;
				}

				if (this.options.hide.delay) {
					if (this.delayHide === null) {
						this.delayHide = this.hide.bind(this).delay(this.options.hide.delay);
					}
				} else {
					this.hide();
				}
			};

			var mouseover = function (event) {
				if (!this.inElements(event, [ this.trigger, this.component.element ])) {
					return;
				}

				if (this.delayHide) {
					window.clearTimeout(this.delayHide);
					this.delayHide = null;
					return;
				}

				if (this.options.show.delay) {
					if (this.delayShow === null) {
						this.delayShow = this.show.bind(this).delay(this.options.show.delay);
					}
				} else {
					this.show();
				}
			};

			var mousemove = function (event) {
				if (this.delayShow) {
					window.clearTimeout(this.delayShow);
					this.delayShow = this.show.bind(this).delay(this.options.show.delay);
				}
			};

			this.mouseout  = mouseout.bind(this);
			this.mouseover = mouseover.bind(this);
			this.mousemove = mousemove.bind(this);

			this.enableEventListeners();
		},

		hide: function ($super) {
			this.delayHide = null;
			$super();
		},

		show: function ($super, reposition) {
			this.delayShow = null;
			$super(reposition);
		},

		enableEventListeners: function () {
			this.trigger.observe('mouseout',  this.mouseout);
			this.trigger.observe('mouseover', this.mouseover);

			this.trigger.observe('mousemove', this.mousemove);

			this.component.element.observe('mouseout',  this.mouseout);
			this.component.element.observe('mouseover', this.mouseover);
		},

		disableEventListeners: function () {
			this.trigger.stopObserving('mouseout',  this.mouseout);
			this.trigger.stopObserving('mouseover', this.mouseover);

			this.trigger.stopObserving('mousemove', this.mousemove);

			this.component.element.stopObserving('mouseout',  this.mouseout);
			this.component.element.stopObserving('mouseover', this.mouseover);
		},

		inElements: function (event, elements) {
			var parent = event.relatedTarget;
	            while (parent && !elements.include(parent)) {
				try {
					parent = parent.parentNode;
				} catch (e) {
					return false;
				}
			}

			return !elements.include(parent) && event.relatedTarget !== null;
		}
	});

	new Policy.Display('hover', {
		Tooltip: function (component, options) {
			return new Display.Hover(options.trigger || component.trigger, component, options);
		},

		'default': function (component, options) {
			return new Display.Hover(options.trigger, component, options);
		}
	});

/*********************/

	Theme = Class.create({
		initialize: function (themeName, rules, parentTheme) {
			Theme.themes[themeName] = this;

			this.name   = themeName;
			this.rules  = $H(rules);
			this.parent = parentTheme;

			var css    = { };
			var object = this;

			this.rules.each(function (pair) {
				var componentName  = pair.key;
				var componentRules = pair.value;

				$H(componentRules).each(function (pair) {
					var elementName = pair.key;
					var cssRules    = pair.value;

					if (elementName === 'options') {
						return;
					}

					css['.' + object.getClass(componentName, elementName)] = cssRules;
				});
			});

			CSS.build(css);
		},

		extend: function (themeName, rules) {
			return new Theme(themeName, rules, this);
		},

		getClass: function(componentType, elementClass) {
			return "#{id}-#{themeName}-#{componentType}-#{elementClass}".interpolate({
				id:            Theme.id,
				themeName:     this.name,
				componentType: componentType,
				elementClass:  elementClass
			});
		},

		getOptions: function (component, options) {
			var options = $H(options);

			// XXX cross-browser?
			var klass = component.constructor;
			while (klass) {
				var componentRules = this.rules.get(klass.prototype.type);

				if (componentRules) {
					function recursiveMerge(left, right) {
						var result = new Hash();

						left.keys().concat(right.keys()).uniq().each(function (key) {
							var leftValue  = left.get(key);
							var rightValue = right.get(key);

							if (leftValue === undefined) {
								result.set(key, rightValue);
							} else if (rightValue === undefined) {
								result.set(key, leftValue);
							} else if (leftValue.constructor === Object && rightValue.constructor === Object) {
								result.set(key, recursiveMerge($H(leftValue), $H(rightValue)).toObject());
							} else {
								result.set(key, rightValue);
							}
						});

						return result;			
					}

					options = recursiveMerge($H($H(componentRules).get('options')), options);
				}

				klass = klass.superclass;
			}

			if (this.parent) {
				options = this.parent.getOptions(component, options);
			}

			return options;
		},

		apply: function(component, elementName) {
			if (this.parent) {
				this.parent.apply(component, elementName);
			}

			var element = component[elementName];

			// XXX
			var klass = component.constructor;
			while (klass) {
				element.addClassName(this.getClass(klass.prototype.type, elementName));
				klass = klass.superclass;
			}
		}
	});

	Theme.id = 'protrols';
	Theme.themes = {};

	new Theme('default', {
		Component: {
			options: {
				placement: {
					type: 'static'
				},
				display: {
					type: 'static'
				}
			},
			element: {
				backgroundColor: 'white'
			}
		},
		Layer: {
			element: {
				zIndex: 9000
			}
		},
		Overlay: {
			options: {
				placement: {
					type: 'fixed',
					horizontal: 'left',
					vertical:   'top'
				},
				display: {
					type: 'static',
					initialShow: false,
					show: { effect: Effect.Appear, options: { to: 0.5, duration: 0.50 } },
					hide: { effect: Effect.Fade,   options: { duration: 0.50 } }
				}
			},
			element: {
				backgroundColor: 'black',
				width:  '100%',
				height: '100%',
				zIndex: 8999,

				// Workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=201307
				overflow: 'auto'
			}
		},
		Window: {
			options: {
				close: true,

				placement: {
					type: 'fixed'
				}
			},
			header: {
				display: 'table',
				cursor:  'move',
				width:   '100%'
			},
			titlebar: {
				display: 'table-row'
			},
			title: {
				display: 'table-cell'
			},
			close: {
				display: 'table-cell'
			}
		},
		ModalWindow: {
			options: {
				placement: {
					type:       'fixed',
					horizontal: 'center',
					vertical:   'center'
				},
				display: {
					initialShow: false,
					show: { effect: Effect.Appear, options: { duration: 0.50 } },
					hide: { effect: Effect.Fade,   options: { duration: 0.50 } }
				}
			}
		},
		Tooltip: {
			options: {
				close: false,

				placement: {
					type: 'relative'
				},
				display: {
					type: 'hover'
				}
			},
		},
		MenuItem: {
			element: {
				padding: '0.25em 1em',
				cursor: 'default'
			}
		},
		DropdownMenu: {
			options: {
				placement: {
					type: 'relative',
					reposition: false,
					anchor: {
						target:  'bottom-left',
						element: 'top-left'
					}
				},
				display: {
					type: 'click'
//					type: 'static',
//					initialShow: false
				}
			},
			content: {
				border: '2px outset black'
			}
		}
	});

	Theme.themes['default'].extend('bare');

	Theme.themes['default'].extend('basic', {
		Window: {
			element: {
				border: '2px solid #666666',
				'-moz-border-radius': '4px',
				'-webkit-border-radius': '4px'
			},
			content: {
				padding: '1em'
			},
			header: {
				backgroundColor: 'lightgray'
			},
			title: {
				fontWeight:  'bold',
				paddingLeft: '1em'
			}
		}
	});


	Theme.themes.basic.extend('danbooru-tooltip', {
		Tooltip: {
			element: {
				backgroundColor: '#EEEEEE'
			},
			content: {
				display: 'table'
			}
		}
	});

	Theme.themes.bare.extend('danbooru-note-placeholder', {
		Layer: {
			element: {
				backgroundColor: '#FFFFEE',
				border: '1px solid black',
				opacity: 0.5
			}
		}
	});

	Theme.themes.bare.extend('danbooru-note', {
		Tooltip: {
			element: {
				backgroundColor: '#FFFFEE',
				border:    '1px solid black',
				minWidth:  '160px',
				maxHeight: '100px',
				overflow:  'auto',
				padding:   '5px'
			}
		}
	});

/****************/

	Component = Class.create({
		type: 'Component',

		initialize: function (element, options) {
			options = options || {};

			this.theme = options.theme || Theme.themes.basic;

			this.options = this.theme.getOptions(this, options).toObject();

			this.element = element;
			this.theme.apply(this, 'element');

			var component = this;
			$H(this.options.events).each(function (pair) {
				component.observe(pair.key, pair.value);
			});

			if (this.options.parent) {
				this.options.parent.insert({ top: this.element });
			} else {
				Component.components.appendChild(this.element);
			}

			this.placement = Policy.Placement.create(this, this.options.placement);
			this.display   = Policy.Display.create  (this, this.options.display);
		},

		observe: function (event, handler) {
			var component = this;
			var func = function (event) {
				event.stop();

				if (event.findElement() != component.element) {
					return;
				}

				return handler(event.memo);
			};

			this.element.observe('protrols:' + event, func);

			return func;
		},

		stopObserving: function (event, handler) {
			this.element.stopObserving('protrols:' + event, handler);
		},

		fire: function (eventName) {
			this.element.fire('protrols:' + eventName, this, false);
		}
	});

	Component.id = (Math.random() * Math.pow(10, 16)).round();

	Component.components = $T.div({ id: 'component-' + Component.id });
	document.body.insert(Component.components);

	Layer = Class.create(Component, {
		type: 'Layer',

		initialize: function ($super, content, options) {
			$super($T.div(), options);

			this.content = $T.div({ }, content);
			this.element.insert(this.content);

			this.theme.apply(this, 'content');
		}
	});

	Overlay = Class.create(Layer, {
		type: 'Overlay',

		initialize: function ($super, options) {
			$super(null, options);
		}
	});

	Window = Class.create(Layer, {
		type: 'Window',

		initialize: function ($super, content, options) {
			$super(content, options);

			if (this.options.title || this.options.close) {
				this.titlebar = $T.div();
				this.header   = $T.div({ }, this.titlebar);

				this.theme.apply(this, 'titlebar');
				this.theme.apply(this, 'header');

				this.element.insert({ top: this.header });


				var object = this;
				this.draggable = new Draggable(this.element, {
					handle: object.titlebar
				});

				Draggables.addObserver({
					element: this.element,

					onStart: function () {
						object.display.disableEventListeners();
					},

					onEnd: function () {
						object.display.enableEventListeners();
					}
				});
			}

			if (this.options.title) {
				this.title = $T.span({ }, this.options.title);

				this.theme.apply(this, 'title');

				this.titlebar.insert({ top: this.title });
			}

			if (this.options.close) {
				this.close = $T.a({ href: '#' }, 'X');

				var object = this;
				this.close.observe('click', function (event) {
					object.display.hide();
					event.stop();
				});

				this.theme.apply(this, 'close');

				this.titlebar.insert({ bottom: this.close });
			}
		}
	});

	ModalWindow = Class.create(Window, {
		type: 'ModalWindow',

		initialize: function ($super, content, options) {
			$super(content, options);

			this.overlay = new Overlay();

			var modal   = this;
			var overlay = this.overlay;
			overlay.element.observe('click', function (event) {
				modal.display.hide();
			});

			this.observe('hide', function (component) {
				overlay.display.hide();
			});

			this.observe('show', function (component) {
				overlay.display.show();
			});

			this.display.show();
		}
	});

	Tooltip = Class.create(Window, {
		type: 'Tooltip',

		initialize: function ($super, trigger, content, options) {
			this.trigger = $(trigger);

			$super(content, options);
		}
	});

	MenuItem = Class.create(Component, {
		type: 'MenuItem',

		initialize: function ($super, name, options) {
			$super($T.div({}, name), options);
		}
	});

	Menu = Class.create(Layer, {
		type: 'Menu',

		initialize: function ($super, options) {
			$super(null, options);
		},

		appendItem: function (item) {
			this.content.insert({ bottom: item.element });
		}
	});

	DropdownMenu = Class.create(Menu, {
		type: 'DropdownMenu',

		initialize: function ($super, root, options) {
			this.root = root;

			$super(options);
		}
	});

/**********************/


	CSS.build({
		'.danbooru-tooltip-preview': {
			display: 'table-cell',
			verticalAlign: 'middle',
			paddingRight: '1em'
		},

		'.danbooru-tooltip-info': {
			display: 'table-cell'
		},

		'.danbooru-tooltip-filesize': {
			'float': 'right',
			paddingRight: '1em'
		}
	});



	function to_human_size(size) {
		if (size < 1024) {
			return size + " bytes";
		} else if (size < 1024 * 1024) {
			return (size / 1024).toFixed(2) + " kb";
		} else {
			return (size / (1024 * 1024)).toFixed(2) + " Mb";
		}
	}



	function make_tooltip(link) {
		if (link.down() === null) {
			var trigger = link;
			var target  = trigger;
		} else if (link.down('img')) {
			var trigger = link.down('img');
			var target  = link.up('span');

			trigger.title = '';
		}

		function firstShown(tooltip) {
			var post_id = Number(link.href.match(/\/post\/show\/([0-9]+)/)[1]);
			var post    = Post.posts.get(post_id);
			
			if (post) {
				build_tooltip(tooltip, post);
				return;
			}

			new Ajax.Request('/post/index.json', {
				method: 'get',
				parameters: { tags: 'id:' + post_id },
				onSuccess: function (transport) {
					if (transport.responseJSON.length === 1) {
						post = transport.responseJSON[0];
						post.tags = post.tags.split(' ');
						build_tooltip(tooltip, post);
					} else if (transport.responseJSON.length === 0) {
						new Ajax.Request('/post/index.json', {
							method: 'get',
							parameters: { tags: 'status:deleted id:' + post_id },
							onSuccess: function (transport) {
								post = transport.responseJSON[0];
								post.tags = post.tags.split(' ');
								build_tooltip(tooltip, post);
							}
						});
					}
				} // onSuccess: function (transport)
			}); // new Ajax.Request
		} // function firstShown(tooltip)

		var options = { 
			display: {
				show: { delay: 0.50, effect: Effect.Appear, options: { duration: 0.20 } },
				hide: { delay: 0.25, effect: Effect.Fade,   options: { duration: 0.20 } }
			},
			placement: {
				anchor: {
					target:  'bottom-center',
					element: 'top-center'
				},
				offset: { y: 30 }
			},
			events: {
				firstshown: firstShown
			},
			close: true,
			title: $T.em({ }, 'Loading...'),
			theme: Theme.themes['danbooru-tooltip']
		};

		new Tooltip(
			trigger,
			$T.img({ style: 'width: 170px; height: 170px;', src: '/data/d68a1f25d17ca14afc14ef2335b61d2a.gif' }),
			options
		);
	}


	function build_tooltip(tooltip, post) {
		tooltip.content.innerHTML = '';
		tooltip.title.innerHTML   = '';

//		tooltip.element.style.minWidth = '36em';
//		tooltip.element.style.maxWidth = '40em';
		tooltip.element.style.width = '40em';

		tooltip.title.appendChild($T.span({ style: 'padding-right: 1em' }, '#' + post.id + (post.status !== 'active' ? ' (' + post.status.capitalize() + ')' : '')));
		tooltip.title.appendChild(
			$T.span({ className: 'danbooru-tooltip-filesize' },
				  post.width + ' x ' + post.height + ' (' + to_human_size(post.file_size) + ')'
			)
		);

		var vote_up = $T.a({ href: '#' }, 'up');
		vote_up.observe('click', function (event) {
			Post.vote(1, post.id);
			event.stop();
		});

		var vote_down = $T.a({ href: '#' }, 'down');
		vote_down.observe('click', function (event) {
			Post.vote(-1, post.id);
			event.stop();
		});

		var info = {};

		info.score = $T.span({ }, post.score, ' (vote ', vote_up, '/', vote_down, ')');

		info.rating = post.rating === 'e' ? 'Explicit'
				: post.rating === 'q' ? 'Questionable'
				: post.rating === 's' ? 'Safe'
				: null;

		var date = new Date();
		date.setTime(post.created_at.s * 1000);

		info.date = $T.a({ href: '/post/index?tags=date:' + encodeURIComponent(date.toDateString().replace(/\s+/g, '_')) }, date.toDateString());

		info.user = $T.a({ href: '/post/index?tags=user:' + encodeURIComponent(post.author) }, post.author);

		if (post.parent_id) {
			info.parent = $T.a({ href: '/post/show/' + post.parent_id }, post.parent_id);
			make_tooltip(info.parent);
		}

		if (post.source.match(/^http(s)?:\/\//)) {
			if (post.source.match(/^http:\/\/img[0-9]+\.pixiv\.net\/img\/.*\/([0-9]+)/)) {
				var illust_id = post.source.match(/^http:\/\/img[0-9]+\.pixiv\.net\/img\/.*\/([0-9]+)/)[1];
				info.source = $T.a({ href: 'http://www.pixiv.net/member_illust.php?mode=medium&illust_id=' + illust_id, title: post.source }, post.source.slice(7, 27) + '...');
			} else {
				info.source = $T.a({ href: post.source, title: post.source }, post.source.slice(7, 27) + '...');
			}
		} else if (post.source) {
			info.source = post.source;
		}

		function build_list(container, limit, search, items) {
			var elements = items.map(function (item) {
				var element = $T.a({
					style: 'margin-right: 0.5em;',
					href:  search + encodeURIComponent(item)
				}, item + ' ');

				return element;
			});

			elements.slice(0, limit).each(function (element) {
				container.appendChild(element);
			});

			var elements_remaining = elements.slice(limit).length;
			if (elements_remaining === 0) {
				return;
			}

			var more = $T.a({ href: '#' }, elements_remaining + ' more');
			var more_span = $T.span({ }, '(', more, ')' );
			more.observe('click', function (event) {
				event.stop();
				more_span.remove();
				elements.slice(limit).each(function (elements) {
					container.appendChild(elements);
				});
			});

			container.appendChild(more_span);
		}

		info.tags = $T.span();
		build_list(info.tags, 12, '/post/index?tags=', post.tags);

		if (post.has_children) {
			info.children = $T.span({ }, $T.em({ }, 'Loading...'));
			new Ajax.Request('/post/index.json', {
				method: 'get',
				parameters: { tags: 'parent:' + post.id },

				onSuccess: function (transport) {
					info.children.innerHTML = '';
					var children = transport.responseJSON.pluck('id').reject(function (id) { return id == post.id; });
					build_list(info.children, 3, '/post/show/', children);

					$A(info.children.children).each(function(child) {
						make_tooltip(child);
					});
				}
			});
		}

		info.favorited_by = $T.span({ }, $T.em({ }, 'Loading...'));
		new Ajax.Request('/favorite/list_users.json', {
			method: 'get',
			parameters: { id: post.id },

			onSuccess: function (transport) {
				if (transport.responseJSON.favorited_users.blank()) {
					info.favorited_by.replace($T.em({ }, 'Nobody'));
					return;
				}

				info.favorited_by.innerHTML = '';
				build_list(info.favorited_by, 6, '/post/index?tags=fav:', transport.responseJSON.favorited_users.split(/,/));
			}
		});

		var preview_image = $T.img({
			src:    post.preview_url,
			width:  post.preview_width,
			height: post.preview_height
		});

		var preview_container = $T.div({ style: 'position: relative' }, preview_image);

		var info_div  = $T.div({ className: 'danbooru-tooltip-info' });
		var container =
			$T.div({ style: 'display: table-row' },
				$T.div({ className: 'danbooru-tooltip-preview' }, preview_container),
				info_div
			);

		tooltip.content.appendChild(container);

		var note_placeholders = $A([]);
		if (post.has_notes) {
			new Ajax.Request('/note/index.json', {
				method: 'get',
				parameters: { post_id: post.id },

				onSuccess: function (transport) {
					var horiz_scale = post.preview_width  / post.width;
					var vert_scale  = post.preview_height / post.height;

					var tooltips = $A([]);
					$A(transport.responseJSON).each(function (note) {
						note.x *= horiz_scale;
						note.y *= vert_scale;

						note.width  *= horiz_scale;
						note.height *= vert_scale;

						if (note.is_active && note.width * note.height > 10) {
							var placeholder = new Layer(null, {
								theme:  Theme.themes['danbooru-note-placeholder'],
								parent: preview_container
							});

							var element = placeholder.element;

							element.style.position = 'absolute';
							element.style.left = note.x + 'px';
							element.style.top  = note.y + 'px';

							element.style.width  = note.width  + 'px';
							element.style.height = note.height + 'px';
							
							var tooltip = new Tooltip(element, note.body, {
								parent: preview_container,
								theme: Theme.themes['danbooru-note'],
								display: {
									show: { delay: 0.05 },
									hide: { delay: 0.25 }
								},
								placement: {
									reposition: false,
									target: preview_container,
									anchor: {
										target:  'top-right',
										element: 'top-left'
									},
									offset: { x: 12 }
								},
								events: {
									show: function(tooltip) {
										tooltips.each(function (tip) {
											if (tip != tooltip) {
												tip.display.hide();
											}
										});
									}
								}
							});

							tooltips.push(tooltip);
							note_placeholders.push(element);
						} else {
//							console.log(note);
						}
					});
				}
			});
		}

		preview_image.observe('click', function (event) {
			note_placeholders.invoke('toggle');
		});

		function build_row(attributes) {
			var row = $T.div();
			attributes.each(function (attribute) {
				if (info[attribute]) {
					row.appendChild(
						$T.span({ style: 'margin-right: 1em;' },
							$T.strong({ }, attribute.capitalize().replace('_', ' ') + ' '),
							info[attribute]
						)
					);
				}
			});

			info_div.appendChild(row);
		}

		build_row([ 'user', 'date' ]);
		build_row([ 'rating', 'score' ]);
		build_row([ 'source' ]);
		build_row([ 'parent', 'children' ]);
		build_row([ 'favorited_by' ]);
		build_row([ 'tags' ]);

		tooltip.display.reposition();
	} // function build_tooltip(tooltip, post)



	$$('a[href^=/post/show/]').each(function (link) {
		make_tooltip(link);
	});


/*
	$$('span.thumb').each(function (span) {
		var post_id = Number(span.id.match(/p(\d+)/)[1]);

		var menubar = $T.div({ style: 'width: 180px; border: 1px solid black' });

		var ratebutton = $T.span({}, 'Rate...');
		var ratemenu   = new DropdownMenu(ratebutton, {
			parent: menubar
		});

		var ratesafe, ratequestionable, rateexplicit;
		ratemenu.appendItem(ratesafe         = new MenuItem('Safe'));
		ratemenu.appendItem(ratequestionable = new MenuItem('Questionable'));
		ratemenu.appendItem(rateexplicit     = new MenuItem('Explicit'));

		ratesafe.element.observe('click', function (event) {
			Post.update(post_id, { 'post[rating]': 'safe' });
		});
		ratequestionable.element.observe('click', function (event) {
			Post.update(post_id, { 'post[rating]': 'questionable' });
		});
		rateexplicit.element.observe('click', function (event) {
			Post.update(post_id, { 'post[rating]': 'explicit' });
		});


		var editbutton = $T.span({}, 'Edit');

		editbutton.observe('click', function (event) {
			var post     = Post.posts.get(post_id);
			var old_tags = post.tags.join(' ');

			var textarea = $T.textarea({ rows: 7, cols: 30, style: 'vertical-align: middle; display: table-cell' }, old_tags)
			var prompt = $T.div({ style: 'display: table-row' },
				$T.img({
					src: post.preview_url, width: post.preview_width, height: post.preview_height,
					style: 'vertical-align: middle; display: table-cell; padding: 1em;'
				}),
				textarea
			);

			var edit_window = new ModalWindow(prompt, { title: 'Edit tags' });

			textarea.observe('keydown', function(event) {
				if (event.keyCode === Event.KEY_RETURN) {
					Post.update(post_id, {
						'post[old_tags]': old_tags,
						'post[tags]':     textarea.value
					});

					edit_window.display.hide();
				}
			});

			textarea.focus();
		});

		menubar.insert({ bottom: editbutton });
		menubar.insert({ bottom: ratebutton });

		var tooltip = new Tooltip(span, menubar, {
			theme: Theme.themes.bare,
			placement: {
				reposition: false,
				anchor: {
					target:  'bottom-left',
					element: 'bottom-left'
				},
			}
		});
	});
*/
}

include([
	'http://script.aculo.us/dragdrop.js',
	main
]);