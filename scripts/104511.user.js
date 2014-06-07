// ==UserScript==
// @name           Mouseless Links
// @namespace      MouselessLinks
// @description    Open links with keyboard
// @include        *
// ==/UserScript==

window.addEventListener('DOMContentLoaded', function() {
    //Lazy loading
    document.addEventListener('keydown', function(e) {
	if(e.which === Main.startTrigger) {
		GM_addStyle('span.mouseless-links-box {background-color: buttonface;border: 1px solid buttonshadow;box-shadow: none;color: buttontext;display: none;font-family: arial;font-size: 11px;line-height: 11px;padding: 2px;position: absolute;border-radius: 3px;z-index: 101;}');
		GM_addStyle('span.mouseless-links-box-active {background-color: buttonshadow !important;box-shadow: 2px 2px 5px black;border: 1px solid black !important;}');
	    Main.init();
	    Main.keydown(e);
	    //Remove this event
	    document.removeEventListener('keydown', arguments.callee, false);
	}
    }, false);
}, false);

var Main = {
    startTrigger: 220, //"\" - Event code that will trigger the event
	
    closeTrigger: 27, //"Esc" - Event code that will close stop recording
	
    ids: 'asdfqwe', //The IDs to be assigned for each link
	
    recording: false,
	
    recorded: '',
	
    map: {
	x: [],
	y: [],
	id: {}
    },
	
    /**
     * Starts the applications and hooks all necessary events.
     */
    init: function() {
	var that = this;
	this.anchors = document.getElementsByTagName('a');
	this.container = document.createElement('span');

	document.body.appendChild(this.container);
	Base.init(this.ids);

	//Create all Link objects
	var links = [], i, len;
	for(i = 0, len = this.anchors.length; i < len; i++) {
	    links[i] = new Link(this.anchors[i]);
	    links[i].appendTo(this.container).position();
	}
	Generator.init(links);
		
	//Add event listeners
	document.addEventListener('keydown', function(e) {
	    that.keydown.call(that, e);
	}, false);
	document.addEventListener('keyup', function(e) {
	    that.keyup.call(that, e);
	}, false);
    },

    keydown: function(e) {
	//If corret key, apply select
	var unicode = this.getUnicode(e),
	key;

	if(unicode === this.startTrigger) {
	    //Only process when it was not recording
	    if(!this.recording) {
		this.links = Generator.generate(); //Generate for the current set of links
		//Show all links
		for(key in this.links) {
		    if(this.links.hasOwnProperty(key)) {
			this.links[key].show();
		    }
		}
	    }
	    
	    this.recording = true; //Trigger recording on
	//Stop recoding when asked to
	} else if(unicode === this.closeTrigger) {
	    this.stopRecord();
	//Rest of the command should be recoded
	} else if(this.recording){
	    this.record.apply(this, [e, String.fromCharCode(unicode).toLowerCase()]);
	}
    },
	
    keyup: function(e) {
	var unicode = this.getUnicode(e);
	if(unicode === this.startTrigger) {
	    this.recording && this.active && GM_openInTab(this.active.anchor.href);
	    this.stopRecord();
	}
    },
	
    /**
     * Takes in valid user input and set the active link.
     */
    record: function(e, char) {
	//Only accept valid input
	var checkChar = this.recorded + char;
	if(this.isId(char) && this.links[checkChar]) {
	    //Un-hilight the previous link
	    this.recorded.length > 0 && this.links[this.recorded].focus(false);
	    //Record and hilight current links
	    this.recorded = checkChar;
	    this.active = this.links[checkChar].focus(true);
	    e.preventDefault();
	}
    },
	
    /**
     * Revert back to pre-recording state.
     */
    stopRecord: function() {
	var key;

	this.recording = false;
	this.recorded = '';
	this.active && this.active.focus(false);
	this.active = undefined;

	for(key in this.links) {
	    if(this.links.hasOwnProperty(key)) {
		this.links[key].hide();
	    }
	}
    },
	
    /**
     * Check if the character is one of the IDs.
     * @param char The character to be checked.
     * @return true if exists, false otherwise.
     */
    isId: function(char) {
	var i, len;
	for(i=0, len=this.ids.length; i<len; i++) {
	    if(this.ids[i] === char) {
		return true;
	    }
	}
	return false;
    },
	
    /**
     * @param e The event to be checked.
     * @return the unicode value of the which, keyCode and charCode properties depending on wheter they are set.
     */
    getUnicode: function(e) {
	return e.which || e.keyCode || e.charCode;
    }
};


var Link = function(elem) {
    this.anchor = elem;
	
    var box = document.createElement('span');
    box.appendChild(document.createTextNode(''));
	box.className = 'mouseless-links-box';
	/*
    this.css(box, {
	display: 'none',
	position: 'absolute',
	padding: '2px',
	fontSize: '11px',
	lineHeight: '11px',
	fontFamily: 'arial',
	backgroundColor: 'buttonface',
	border: '1px solid buttonshadow',
	color: 'buttontext',
	borderRadius: '3px'
    });
	*/
	
    this.box = box;
}

Link.prototype = {
	
    css: function(elem, style) {
	for(prop in style) {
	    if(style.hasOwnProperty(prop)) {
		elem.style[prop] = style[prop];
	    }
	}
	return this;
    },
	
    offset: function() {
	var elem = this.anchor,
	offset = {
	    left: 0,
	    top: 0
	};
		
	while(true) {
	    offset.left += elem.offsetLeft;
	    offset.top += elem.offsetTop;
	    elem = elem.offsetParent;
	    if(!elem) {
		break;
	    }
	}
		
	return offset;
    },
	
    position: function() {
	var offset = this.offset();
	this.top = offset.top - 5;
	this.left = offset.left;
	
	this.css(this.box, {
	    top: this.top + 'px',
	    left: this.left + 'px'
	});

	return this;
    },
	
    appendTo: function(parent) {
	parent.appendChild(this.box);
	return this;
    },
	
    hide: function() {
	this.box.style.display = 'none';
	return this;
    },
	
    show: function() {
	this.box.style.display = 'inline';
	return this;
    },
	
    focus: function(state) {
	this.box.className = state ? 'mouseless-links-box mouseless-links-box-active' : 'mouseless-links-box';
	return this;
    },

    setId: function(id) {
	this.box.innerHTML = id;
    }

};


var Base = {
    slots: [],
	
    init: function(keys) {
	this.keys = keys;
	this.base = keys.length;
    },
	
    increment: function() {
	var i, len;
	//Keep looping until the first slot can be incremented
	//i<=len will add one more slot if there is not enough
	for(i=0, len=this.slots.length; i<=len; i++) {
	    //If this slot reaches the max, reset to zero and continue
	    if(this.slots[i] === this.base - 1) {
		this.slots[i] = 0;
	    } else { //It can still be incremented
		this.slots[i] = isNaN(this.slots[i]) ? 0 : this.slots[i] + 1;
		//Done incrementing
		break;
	    }
	}
		
	return this;
    },

    reset: function() {
	this.slots = [];
    },
	
    /**
     * Converts the slots into the a string representation using the keys.
     * It will also reverse the order.
     */
    toString: function() {
	var result = '', i, len;
	for(i=this.slots.length-1; i>=0; i--) {
	    result += this.keys[this.slots[i]];
	}
	return result;
    }
};


var Generator = {

    init: function(links) {
	this.links = links;
    },

    generate: function() {
	//Generate a Link for each anchor tag and give them an ID each.
	var pos = this.viewPosition(), newLinks = {}, i, len;
	Base.reset();

	for(i = 0, len = this.links.length; i < len; i++) {
	    var link = this.links[i];
	    //Makes sure it is in the viewport
	    if(link.top >= pos.top && link.top <= pos.bottom) {
		var id = Base.increment().toString();
		newLinks[id] = link;
		link.setId(id);
	    }
	}

	return newLinks;
    },

    viewPosition: function() {
	var top = document.documentElement.scrollTop,
	result = {
	    top: top,
	    bottom: top + document.documentElement.clientHeight
	}

	return result;
    }

}