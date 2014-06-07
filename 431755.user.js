// ==UserScript==
// @name	EventHandler - Manage JavaScript Events
// @description	Constructor/library to add, search through and remove event listeners. Supports adding and removing multiple types of events simultaneously.
// @namespace	Makaze
// @version	1.1.1
// ==/UserScript==

// ABOUT THIS SCRIPT:
//
// Notes:
//
//	This constructor can only handle events added using the constructor. It cannot be used to access listeners delegated through other means.
//
// Chaining:
//
//	Methods can be chained until the selection is cleared by either .remove() or .output().
//
// USAGE:
//
// Initialization:
//
//	var Events = new EventHandler();
//
// Outputting events:
//
//	Events.output();
//	// Returns an Array of event listeners in the current search selection; matches all event listeners if no search has been run
//
// Set the selector to handle:
//
//	Events.selector(selector);
//	// If unset, defaults to document
//
// Add an event:
//
//	Events.add('type1 type2', 'namespace', listener, useCapture);
//	// Add event listeners of 'type1' and 'type2' with the listener 'listener', the namespace 'namespace' and the useCapture value 'useCapture' to last selector
//
// Remove an event:
//
//	Events.remove();
//	// Removes all event listeners in the current search selection; defaults to last selector
//
//	Events.remove('type1 type2', 'namespace', listener, useCapture);
//	// Removes event listeners of 'type1' and 'type2' with the listener 'listener', the namespace 'namespace' and the useCapture value 'useCapture' from last selector
//
// Search methods:
//
//	Events.getAllEvents();
//	// Gets all existing event listeners
//
//	Events.getEventsBySelector(selector);
//	// Gets existing event listeners on the selector
//
//	Events.getEventsByType('type');
//	// Gets existing event listeners of type 'type'
//
//	Events.getEventsByName('namespace');
//	// Gets existing event listeners with the namespace 'namespace'
//
//	Event.getEventsByListener(listener);
//	// Gets existing event listeners with the listener 'listener'
//
// Chaining xamples:
//
//	Events.selector(document.getElementById('someID')).add( /* Some event */ );
//	// Add Some event to #someID
//
//	Events.selector(document.getElementById('someID')).remove( /* Some event */ );
//	// Remove Some event from #someID
//
//	Events.getEventsBySelector(document.getElementById('someID')).getEventsByName('myEvents').output();
//	// Return all listeners on #someID with the name 'myEvents'
//
//	Events.getEventsByName('myEvents').getEventsByType('click').remove();
//	// Remove all listeners with the name 'myEvents' and type 'click'

function EventHandler() {
	var events = [],
	matchedEvents = [],
	selector = document,
	self = this;

	this.selector = function(toSelect) {
		selector = toSelect;
		return self;
	};

	this.add = function(types, namespace, listener, useCapture) {
		var type,
		event,
		i = 0;

		types = types.split(/[\b\s]/);

		events.push({'selector': selector, 'namespace': namespace, 'types': types, 'listener': listener, 'useCapture': useCapture});
		event = events[events.length - 1];

		for (i = 0; i < event.types.length; i++) {
			type = event.types[i];
			selector.addEventListener(type, listener, useCapture);
		}

		return self;
	};

	this.remove = function(types, namespace, listener, useCapture) {
		var event,
		eventType,
		eventTypes,
		type,
		i = 0,
		j = 0,
		k = 0;

		if (!arguments.length) {
			if (matchedEvents.length) {
				for (i = 0; i < matchedEvents.length; i++) {
					event = matchedEvents[i];
					for (j = 0; j < event.types.length; j++) {
						type = event.types[j];
						event.selector.removeEventListener(type, event.listener, event.useCapture);
					}
				}
			} else {
				self.getEventsBySelector(selector).remove();
			}
		} else {
			types = types.split(/[\b\s]/);

			for (i = 0; i < events.length; i++) {
				event = events[i];
				if (event.selector == selector && event.namespace === namespace && event.useCapture === useCapture && event.listener === listener) {
					eventTypes = event.types;
					for (j = 0; j < eventTypes.length; j++) {
						eventType = eventTypes[j];
						for (k = 0; k < event.types.length; k++) {
							type = types[k];
							if (type === eventType) {
								selector.removeEventListener(type, event.listener, event.useCapture);
							}
						}
					}
					break;
				}
			}
		}

		matchedEvents = [];

		return self;
	};

	this.output = function() {
		if (!matchedEvents.length) {
			self.getAllEvents().output();
		} else {
			var output = matchedEvents;
			matchedEvents = [];
			return output;
		}
	};

	this.getAllEvents = function() {
		matchedEvents = events;
		return self;
	};

	this.getEventsBySelector = function(getSelector) {
		var event,
		i = 0;

		if (matchedEvents.length) {
			for (i = 0; i < matchedEvents.length; i++) {
				event = matchedEvents[i];
				if (event.selector != getSelector) {
					matchedEvents.splice(i, 1);
				}
			}
		} else {
			for (i = 0; i < events.length; i++) {
				event = events[i];
				if (event.selector == getSelector) {
					matchedEvents.push(event);
				}
			}
		}

		return self;
	};

	this.getEventsByType = function(types) {
		var eventTypes,
		eventType,
		event,
		type,
		hasType = false,
		i = 0,
		j = 0,
		k = 0;

		types = types.split(/[\b\s]/);

		if (matchedEvents.length) {
			for (i = 0; i < matchedEvents.length; i++) {
				event = matchedEvents[i];
				for (j = 0; j < eventTypes.length; j++) {
					eventType = eventTypes[j];
					for (k = 0; k < event.types.length; k++) {
						type = types[k];
						if (type === eventType) {
							hasType = true;
							break;
						}
					}
					if (hasType) {
						break;
					}
				}
				if (hasType) {
					matchedEvents.splice(i, 1);
				}
			}
		} else {
			for (i = 0; i < events.length; i++) {
				event = events[i];
				for (j = 0; j < eventTypes.length; j++) {
					eventType = eventTypes[j];
					for (k = 0; k < event.types.length; k++) {
						type = types[k];
						if (type === eventType) {
							hasType = true;
							break;
						}
					}
					if (hasType) {
						break;
					}
				}
				if (hasType) {
					matchedEvents.push(event);
				}
			}
		}
		
		return self;
	};

	this.getEventsByName = function(namespace) {
		var event,
		i = 0;

		if (matchedEvents.length) {
			for (i = 0; i < matchedEvents.length; i++) {
				event = matchedEvents[i];
				if (event.namespace !== namespace) {
					matchedEvents.splice(i, 1);
				}
			}
		} else {
			for (i = 0; i < events.length; i++) {
				event = events[i];
				if (event.namespace === namespace) {
					matchedEvents.push(event);
				}
			}
		}

		return self;
	};

	this.getEventsByListener = function(listener) {
		var event,
		i = 0;

		if (matchedEvents.length) {
			for (i = 0; i < matchedEvents.length; i++) {
				event = matchedEvents[i];
				if (event.listener !== listener) {
					matchedEvents.splice(i, 1);
				}
			}
		} else {
			for (i = 0; i < events.length; i++) {
				event = events[i];
				if (event.listener === listener) {
					matchedEvents.push(event);
				}
			}
		}

		return self;
	};
}