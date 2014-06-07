// ==UserScript==
// @name           JToolbar
// @namespace      http://www.dound.com
// @description    Toolbar which can be hooked into any page.  As an example, it hooks into Amazon.com and Stanford's CS website.  This is an early beta stage project.
// @include        http://www.amazon.com/
// @include        http://cs.stanford.edu*
// ==/UserScript==

/**
 * JavaScript Toolbar Widget
 * David Underhill and James Chen
 */
/* createCookie(), readCookie() are by Peter-Paul Koch of quirksmode.org */

var JTB = function() {
    /*  private constants */
    var SPRINGINESS_FACTOR = 1.3;
    var SPLIT_CLOSE = 1.0 - (1.0 / SPRINGINESS_FACTOR);
    var ICON_SIZE = 16;
    var ICON_BORDER_SIZE = 1;
    var ICON_MARGIN = 1;
    var ICON_COUNT = 3;
    var ICON_ANCHOR = null;
    var ICON_ANCHOR_WIDTH = 32;
    var ICON_ANCHOR_HEIGHT = 48;
    var MAX_DEBUG_LINES = 5;
    var COOKIE_LIFETIME_DAYS = 60;

    /* private members */
    var toolbars = [];
    var mouseDragX, mouseDragY;
    var mouseX, mouseY;

    var debugErrReported = false;
    function debug(newstr) {
        if(window.console) {
            console.debug(newstr);
        }
        else if(!debugErrReported) {
            debugErrReported = true;
            alert('warning: you need to run firebug and enable the console to see debugging output');
        }
    }

    function createCookie(name,value,days,path) {
        var expires;
        if(days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            expires = "; expires="+date.toGMTString();
        }
        else {
            expires = "";
        }
        document.cookie = name+"="+value+expires+"; path=" + path;
    }

    function createBooleanCookie(name,value,days,path) {
        if(value === true) {
            createCookie(name, 'T', days, path);
        }
        else {
            createCookie(name, 'F', days, path);
        }
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while(c.charAt(0)==' ') {
                c = c.substring(1,c.length);
            }
            if(c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length,c.length);
            }
        }
        return null;
    }

    function readBooleanCookie(name) {
        var v = readCookie(name);
        if(v === null) {
            return null;
        }
        return (v === 'T');
    }

    function eraseCookie(name,path) {
        createCookie(name,"",-1,path);
    }

    /** simple object containing a set of coordinates */
    function Coords(x, y) {
        this.x = x;
        this.y = y;
    }

    /** returns the distance squared from a point to a rectangle */
    function distanceSqToRectangle(x, y, rx, ry, rw, rh) {
        var dx, dy;
        if(x < rx) {
            dx = rx - x;
        }
        else if(x > rx + rw) {
            dx = x - rx - rw;
        }
        else {
            dx = 0;
        }

        if(y < ry) {
            dy = ry - y;
        }
        else if(y > ry + rh) {
            dy = y - ry - rh;
        }
        else {
            dy = 0;
        }

        return (dx*dx) + (dy*dy);
    }

    function findPosX(obj) {
        var curleft = 0;
        if(obj.offsetParent) {
            while(1) {
                curleft += obj.offsetLeft;
                if(!obj.offsetParent) {
                    break;
                }
                obj = obj.offsetParent;
            }
        }
        else if(obj.x) {
            curleft += obj.x;
        }

        return curleft;
    }

    function findPosY(obj) {
        var curtop = 0;
        if(obj.offsetParent) {
            while(1) {
                curtop += obj.offsetTop;
                if(!obj.offsetParent) {
                    break;
                }
                obj = obj.offsetParent;
            }
        }
        else if(obj.y) {
            curtop += obj.y;
        }

        return curtop;
    }

    /** returns the effective value of a property of obj */
    function findValue(obj, propName, inheritedIsDefault) {
        var v = eval('obj.' + propName);

        if(v === '') {
            if(!inheritedIsDefault) {
                return 0;
            }
        }
        else if(v != 'inherit') {
            return v;
        }

        if(obj.parentNode==document.body || obj.parentNode===null) {
            return 0;
        }
        else {
            return findValue(obj.parentNode, propName);
        }
    }

    /**
     * gets the width not included in offsetWidth (e.g. borders,
     * padding, and margin)
     */
    function getExtraWidth(e) {
        if(e === null) {
            return 0;
        }

        var ret = 0;
        ret += parseInt(findValue(e, 'style.paddingLeft',      false), 10);
        ret += parseInt(findValue(e, 'style.paddingRight',     false), 10);
        ret += parseInt(findValue(e, 'style.marginLeft',       false), 10);
        ret += parseInt(findValue(e, 'style.marginRight',      false), 10);
        ret += parseInt(findValue(e, 'style.borderLeftWidth',  false), 10);
        ret += parseInt(findValue(e, 'style.borderRightWidth', false), 10);
        return ret;
    }

    /**
     * gets the height not included in offsetHeight (e.g. borders,
     * padding, and margin)
     */
    function getExtraHeight(e) {
        if(e === null) {
            return 0;
        }

        var ret = 0;
        ret += parseInt(findValue(e, 'style.paddingTop',        false), 10);
        ret += parseInt(findValue(e, 'style.paddingBottom',     false), 10);
        ret += parseInt(findValue(e, 'style.marginTop',         false), 10);
        ret += parseInt(findValue(e, 'style.marginBottom',      false), 10);
        ret += parseInt(findValue(e, 'style.borderTopWidth',    false), 10);
        ret += parseInt(findValue(e, 'style.borderBottomWidth', false), 10);
        return ret;
    }

    /** returns the effective z-index of the object */
    function findZIndex(obj) {
        var z = obj.style.zIndex;
        if(z === '') {
            if(obj.parentNode==document.body || obj.parentNode===null) {
                return 0;
            }
            else {
                return findZIndex(obj.parentNode);
            }
        }
        else {
            return z;
        }
    }

    /** get a child element */
    function getChild(elt, child_name) {
        var children = elt.childNodes;
        var i;

        for(i=0; i<children.length; i++) {
            try {
                var c = children[i];
                var name = c.getAttribute('id');
                if(name == child_name) {
                    return c;
                }
            }
            catch(err) {}
        }
        return null;
    }

    /** updates the toolbar's size and position based on the ongoing animation */
    function handleToolbarAnimation(tb) {
        tb.refreshGfx();

        /* periodically call this method until the animation is done */
        if(tb.isAnimating()) {
            setTimeout(function(){JTB.handleAnimationCallback(tb.tb_id);},
                       JTB.ANIM_INTERVAL_MSEC);
        }
        else if(tb.isChildToolbar() && tb.getState()==JTB.STATE_INVIS) {
            var container = tb.tb_parent.getContainer();
            if(container !== null) {
                try { container.removeChild(tb.e_tb); } catch(err) { /* ignore */ }
            }
        }
    }

    /** Compute the size in pixels of some length field. */
    function lengthToPixels(len, isWidth) {
        if(len===null || len==='') {
            return 0;
        }

        var val = parseInt(len, 10);
        if(typeof(len) == 'string') {
            if(len.indexOf('%') >= 0) {
                var max;
                if(isWidth) {
                    max = document.body.offsetWidth;
                }
                else {
                    max = document.body.offsetHeight;
                }
                return parseInt(val * max / 100, 10);
            }
        }

        /* assume pixels as units */
        return val;
    }


    /** compute the maximum x and y values used according to absolutely
     * positioned children (recursve) */
    function computeMaxXY(e, skipSelf) {
        var i, c, cur;

        var max;
        if(skipSelf===true || (e.style && e.style.position=='absolute')) {
            max = new Coords(0, 0);
        }
        else {
            max = new Coords(lengthToPixels(e.offsetLeft + e.offsetWidth, true),
                             lengthToPixels(e.offsetTop + e.offsetHeight, false));
        }

        var tx=max.x, ty=max.y;

        for(i=0; i<e.childNodes.length; i++) {
            cur = computeMaxXY(e.childNodes[i], false);
            if(cur.x > max.x) {
                max.x = cur.x;
            }
            if(cur.y > max.y) {
                max.y = cur.y;
            }
        }

        return max;
    }

    /** sets the style parameters of an icon div */
    function setupIconDiv(e) {
        e.style.backgroundRepeat = 'no-repeat';
        e.style.border = ICON_BORDER_SIZE + 'px solid black';
        e.style.width = ICON_SIZE + 'px';
        e.style.height = ICON_SIZE + 'px';
        e.style.position = 'absolute';
        var m = ICON_MARGIN + 'px ';
        e.style.margin = m + m + m + m;
    }

    /* export public members */
    return {
        /* public constants */
        VERSION        : "0.1",
        ORIENT_LEFT    : "left",
        ORIENT_RIGHT   : "right",
        ORIENT_TOP     : "top",
        ORIENT_BOTTOM  : "bottom",
        STATE_VIS      : "vis",
        STATE_INVIS    : "invis",
        ANIM_INTERVAL_MSEC : 25,
        DOCK_CLOSEST_INCUMBENT_ADVANTAGE : 1.1,

        /**
         * Helps determine what size an element should be.  It allows width
         * and/or the height dimensions to be forced to a specific value if
         * desired.
         */
        SizeHelper : function(e, tb) {
            /** the element this handles size for */
            this.e = e;

            /** the toolbar this is associated with */
            this.tb = tb;

            /** the current intended width of this element */
            this.width = 0;

            /** the current intended height of this element */
            this.height = 0;

            /**
             * The width of this element when it is in a vertical orientation.
             * If empty, then the "natural" width is used.  If a percentage is
             * specified, then it will be a percentage of the container.
             */
            this.vert_orient_width = '';

            /**
             * The height of this element when it is in a horizontal
             * orientation.  If empty, then the "natural" width is used.  If a
             * percentage is specified, then it will be a percentage of the
             * container.
             */
            this.horiz_orient_height = '';

            /**
             * The width and height of this element when it is floating.  If
             * empty, then the "natural" width is used.  If a percentage is
             * specified, then it will be a percentage of the container.
             */
            this.float_width = '';
            this.float_height = '';

            /**
             * Whether to have size based on orientation even if in float mode
             * (e.g. whether to ignore the float_width and float_height fields).
             */
            this.float_ignore = true;

            /** cached parameters to enable quick bailout from size computation */
            this.cached_isVert  = null;
            this.cached_isFloat = null;

            /* set the natural size override based on the style values */
            if(e.style.width !== '') {
                this.float_width = this.vert_orient_width = e.style.width;
            }
            else if(tb === null) {
                this.float_width = this.e.offsetWidth;
            }

            if(e.style.height !== '') {
                this.float_height = this.horiz_orient_height = e.style.height;
            }
            else if(tb === null) {
                this.float_height = this.e.offsetHeight;
            }
        },

        /**
         * Toolbar link constructor
         */
        ToolbarLink : function(name, link, encToolbar) {
            this.name = name;
            this.link = link;
            this.encToolbar = encToolbar;
        },

        /**
         * Toolbar constructor
         * @param content_name  name of the element the toolbar is attached to
         * @param tb_name       name of the element to use or make for the toolbar
         * @param ...           remaining arguments specify name-link pairs
         */
        Toolbar : function(content_name, tb_name) {
            /* name of the element which is the toolbar is attached to */
            this.content_id     = content_name;

            /* name of the div which contains the toolbar */
            this.tb_id          = tb_name;

            /* elements which compose the toolbar */
            this.e_container      = null;
            this.e_content        = null;
            this.e_tb             = null;
            this.e_icons          = null;
            this.e_icon_drag      = null;
            this.e_icon_float     = null;
            this.e_icon_pin       = null;
            this.e_links          = null;

            /* toolbar hierarchy support */
            this.tb_parent        = null;
            this.vis_tb_child     = null;

            /* sizing information helpers */
            this.sz_container     = null;
            this.sz_tb            = null;

            /* time the toolbar animation started */
            this.anim_start     = -1;

            /* % of time for the first half of the animation */
            this.anim_split     = 0;

            /* src width and height of an animation */
            this.anim_src_width  = 0;
            this.anim_src_height = 0;
            this.anim_first_half = true;

            /* orientation of the toolbar */
            this.orient         = JTB.ORIENT_LEFT;

            /* whether the toolbar is docked */
            this.docked         = true;

            /* threshold (in pixels) for a position to be considered in a docking area */
            this.docking_threshold = 100;

            /* absolute position offset from parent if not docked */
            this.floatx         = 0;
            this.floaty         = 0;

            /* whether to clamp a floating toolbar to its container's size */
            this.clamp_size_on_float = false;

            /* how to deal with toolbar overflow */
            this.overflow_style = 'visible';

            /* position at the beginning of a drag */
            this.dragStartX     = 0;
            this.dragStartY     = 0;

            /* whether to show the drag graphic */
            this.show_drag      = true;

            /* whether to show the float graphic */
            this.show_float       = true;

            /* whether to show the pin/unpin graphic */
            this.show_pin       = true;

            /* path to icon location */
            this.img_path       = 'images/';

            /* whether the toolbar is being dragged */
            this.dragging       = false;

            /* whether the toolbar is currently pinned */
            this.pinned         = true;

            /** whether the toolbar always takes up space (even when unpinned) */
            this.alwaysShiftContent = false;

            /* whether the toolbar is visible, invis, or transitioning */
            this.state          = JTB.STATE_VIS;

            /* number of milliseconds for the toolbar to slide in/out */
            this.animation_len_msec = 400;

            /* whether to use the spring animation or not */
            this.anim_springy   = true;

            /* pixels from the edge which triggers the toolbar to show */
            this.trigger_dist   = 100;

            /* path to use to store cookies (page means use the page URL */
            this.cookie_path    = '/';

            /** array of functions to call when orientation changes */
            this.orientation_listeners = [];

            /** array of functions to call when visibility changes */
            this.visibility_listeners = [];

            /* array of ToolbarLink objects to show in the toolbar div */
            this.links          = [];

            /* register the toolbar so we can find it later */
            toolbars[toolbars.length] = this;

            /* create the requested links */
            if(arguments.length > 1) {
                var i, name, link;
                for(i=1; i<arguments.length/2; i+=1) {
                    name = arguments[2*i];
                    link = arguments[2*i+1];
                    if (typeof(link) != "string") {                   	
                    	// link is actually a nested toolar
                    	link.setParentToolbar(this);	
                    }
                    this.links[i-1] = new JTB.ToolbarLink(name, link, this);
                }
            }

            this.hookup();
        },

        init : function() {
            /** Compute the size for this element based on the reference toolbar's status. */
            JTB.SizeHelper.prototype.refreshSizeData = function() {
                var orient;
                var isFloat;

                if(this.tb !== null) {
                    var rt = this.tb.getRootToolbar();
                    orient = rt.getOrientation();
                    isFloat = rt.isFloating();
                }
                else {
                    orient = null;
                    isFloat = true;
                }

                this.refreshSizeDataFull(orient, isFloat);
            };

            /** Compute the size for this element based on the specified toolbar
             * status. */
            JTB.SizeHelper.prototype.refreshSizeDataFull = function(orient, isFloat) {
                var isVert  = (orient==JTB.ORIENT_LEFT || orient==JTB.ORIENT_RIGHT);
                var isHoriz = (orient==JTB.ORIENT_TOP  || orient==JTB.ORIENT_BOTTOM);

                /* stop now if the parameters have not changed */
                if(this.cached_isVert===isVert && this.cached_isFloat===isFloat) {
                    return;
                }
                this.cached_isVert = isVert;
                this.cached_isFloat = isFloat;

                /* get the predetermined height and width values (if any) */
                var w=0, h=0;
                if((!isFloat || this.float_ignore) && this.tb!==null) {
                    if(isVert) {
                        w = lengthToPixels(this.vert_orient_width, true);
                    }
                    else if(isHoriz) {
                        h = lengthToPixels(this.horiz_orient_height, false);
                    }
                }
                else {
                    this.width = lengthToPixels(this.float_width,  true);
                    this.height = lengthToPixels(this.float_height, false);
                    return;
                }

                /* save the current values: we're just getting not setting sizes */
                var es       = this.e.style;
                var orig_w   = es.width;
                var orig_h   = es.height;
                var orig_dis = es.display;
                var orig_pos = es.position;

                /* prepare each dimension */
                es.width  = ((w===0) ? '' : (w + 'px'));
                es.height = ((h===0) ? '' : (h + 'px'));

                /* make sure the element is visible and unrestricted in size */
                es.display = 'block';
                es.position = 'absolute';

                /* get the preferred sizes: incorrect if there absolutely
                 * positioned elements inside of us */
                if(this.assume_no_abs_postioned_elts) {
                    this.width = this.e.offsetWidth;
                    this.height = this.e.offsetHeight;
                }
                else {
                    /* compute the real preferred size by looking at all
                     * children inside the element (absolute positioned elements
                     * otherwise screw us up)
                     */
                    var maxXY = computeMaxXY(this.e, true);
                    this.width  = ((w===0) ? maxXY.x : w);
                    this.height = ((h===0) ? maxXY.y : h);
                    this.first = false;
                }

                /* restore the original style */
                es.width    = orig_w;
                es.height   = orig_h;
                es.display  = orig_dis;
                es.position = orig_pos;
            };

            /**
             * Invalidates any cached values.  Should be called whenever the
             * content of a toolbar changes.
             */
            JTB.SizeHelper.prototype.invalidateCacheAndRefreshSizeData = function() {
                this.cached_isVert = this.cached_isFloat = null;
                this.refreshSizeData();
            };

            /** Sets the width of the element when it is vertically orientated */
            JTB.SizeHelper.prototype.setVertOrientWidth = function(w) {
                if(this.vert_orient_width != w) {
                    this.vert_orient_width = w;

                    if(!this.tb.isFloating() || this.float_ignore) {
                        this.invalidateCacheAndRefreshSizeData();
                    }
                }
            };

            /** Sets the height of the element when it is horizontally orientated */
            JTB.SizeHelper.prototype.setHorizOrientHeight = function(h) {
                if(this.horiz_orient_height != h) {
                    this.horiz_orient_height = h;

                    if(!this.tb.isFloating() || this.float_ignore) {
                        this.invalidateCacheAndRefreshSizeData();
                    }
                }
            };

            /** Sets the orientation-specific dimension sizes. */
            JTB.SizeHelper.prototype.setOrientSpecificSize = function(w, h) {
                if(this.vert_orient_width!=w && this.horiz_orient_height!=h) {
                    this.vert_orient_width = w;
                    this.horiz_orient_height = h;

                    if(!this.tb.isFloating() || this.float_ignore) {
                        this.invalidateCacheAndRefreshSizeData();
                    }
                }
            };

            /** Sets the width of the element when it is floating */
            JTB.SizeHelper.prototype.setFloatWidth = function(w) {
                if(this.float_width != w) {
                    this.float_width = w;

                    if(this.tb.isFloating()) {
                        this.invalidateCacheAndRefreshSizeData();
                    }
                }
            };

            /** Sets the height of the element when it is floating */
            JTB.SizeHelper.prototype.setFloatHeight = function(h) {
                if(this.float_height != h) {
                    this.float_height = h;

                    if(this.tb.isFloating()) {
                        this.invalidateCacheAndRefreshSizeData();
                    }
                }
            };

            /** Sets the orientation-specific dimension sizes. */
            JTB.SizeHelper.prototype.setFloatSize = function(w, h) {
                if(this.float_width!=w && this.float_height!=h) {
                    this.float_width = w;
                    this.float_height = h;

                    if(this.tb.isFloating()) {
                        this.invalidateCacheAndRefreshSizeData();
                    }
                }
            };

            /** Sets whether floating should not be taken into account when
             * determining size (e.g. true=ignore setFloatXXX values). */
            JTB.SizeHelper.prototype.setFloatIgnore = function(b) {
                if(this.float_ignore != b) {
                    this.float_ignore = b;

                    if(this.tb.isFloating()) {
                        this.invalidateCacheAndRefreshSizeData();
                    }
                }
            };

            /** gets the preferred width of the element */
            JTB.SizeHelper.prototype.getPreferredWidth = function() {
                return this.width;
            };



            /** gets the preferred height of the element */
            JTB.SizeHelper.prototype.getPreferredHeight = function() {
                return this.height;
            };

            /** gets the current width of the element */
            JTB.SizeHelper.prototype.getCurrentWidth = function() {
                return this.e.offsetWidth;
            };

            /** gets the current height of the element */
            JTB.SizeHelper.prototype.getCurrentHeight = function() {
                return this.e.offsetHeight;
            };

            /** string representation */
            JTB.SizeHelper.prototype.toString = function() {
                return this.e.getAttribute('id') + ': ' +
                  'pref='   + this.getPreferredWidth() + '/' + this.getPreferredHeight() + '  ' +
                  'curr='   + this.getCurrentWidth() + '/' + this.getCurrentHeight() + '  ' +
                  'orient=' + this.vert_orient_width + '/' + this.horiz_orient_height + '  ' +
                  'float='  + this.float_width + '/' + this.float_height + '  ' + '(' + this.float_ignore + ')';
            };


            /** return the HTML representation of this link object */
            JTB.ToolbarLink.prototype.makeLink = function() {            	
               	var orient = this.encToolbar.getOrientation();
               	var displayStyle = (orient == JTB.ORIENT_LEFT || orient == JTB.ORIENT_RIGHT) ? "block" : "table-cell";
               	if (typeof(this.link) == "string") {
               		// normal link           		       		
               		return '<div style="display: ' + displayStyle + '"> <a href="' + this.link + '">' + this.name + '</a> </div>';  			
               	}
                else {
                	// link is actually a nested toolbar            	
                	var tbName = this.link.getToolbarName();
                	//return '<div onmouseover=\"JTB.showChildToolbar(\'' + tbName + '\', 100, 100)\">' + this.name + '</div>'; 	
               		return '<div onmouseover=\"JTB.showChildToolbar(\'' + tbName + '\', JTB.findXOffset(\'' + tbName + '\', event)' + ', JTB.findYOffset(\'' + tbName + '\', event))\" style=\"display: ' + displayStyle + '">' + this.name + '</div>';
            	}
            };


            JTB.Toolbar.prototype.getParentToolbar = function () {
                return this.tb_parent;	
            };
			
            JTB.Toolbar.prototype.setParentToolbar = function (tb) {
                this.tb_parent = tb;
                return this;	
            };	

            JTB.Toolbar.prototype.getRootToolbar = function () {
                if(this.tb_parent === null) {
                    return this;
                }
                else {
                    return this.tb_parent.getRootToolbar();
                }
            };			
			
            /** get the name of the element the toolbar is attached to (may be null) */
            JTB.Toolbar.prototype.getContentName = function() {
                if(this.tb_parent === null) {
                    return this.content_id;
                }
                else {
                    return this.tb_parent.getContentName();
                }
            };

            /** set the name of the element the toolbar is attached to */
            JTB.Toolbar.prototype.setContentName = function(content_name) {
                if(this.tb_parent === null) {
                    this.content_id = content_name;
                }
                else {
                    this.tb_parent.setContentName(content_name);
                }
                return this;
            };

            /** get the parent element of the toolbar and its attached content (may be null) */
            JTB.Toolbar.prototype.getParent = function() {
                var content = this.getContent();
                if(content === null) {
                    return null;
                }
                else {
                    return content.parentNode;
                }
            };

            /** get the container element which holds toolbar and its attached content (may be null) */
            JTB.Toolbar.prototype.getContainer = function() {
                if(this.tb_parent === null) {
                    return this.e_container;
                }
                else {
                    return this.tb_parent.getContainer();
                }
            };

            /** get the container size information (may be null on unattached
             * child toolbars) */
            JTB.Toolbar.prototype.getContainerSize = function() {
                if(this.tb_parent === null) {
                    return this.sz_container;
                }
                else {
                    return this.tb_parent.getContainerSize();
                }
            };

            /** get the content element to which the toolbar is attached (may be null) */
            JTB.Toolbar.prototype.getContent = function() {
                if(this.tb_parent === null) {
                    return this.e_content;
                }
                else {
                    return this.tb_parent.getContent();
                }
            };

            /** return the name of the element containing the toolbar */
            JTB.Toolbar.prototype.getToolbarName = function() {
                return this.tb_id;
            };

            /** shows a child toolbar (makes childToolbar a child if it isn't already one) */
            JTB.Toolbar.prototype.showChildToolbar = function(childToolbar, x, y) {
                /* do nothing if this child is already being shown by this toolbar */
                if(childToolbar == this.vis_tb_child) {
                    return;
                }

                /* remove the child from any old parent */
                childToolbar.hideFromParentToolbar();

                /* remove any other child this toolbar was showing */
                if(this.vis_tb_child !== null) {
                    this.vis_tb_child.hideFromParentToolbar();
                    this.vis_tb_child = null;
                }

                /* tell the child toolbar it belongs to us now */
                childToolbar.tb_parent = this;

                /* copy parent's styles into child unless the child has its own */
                var cs = childToolbar.e_tb.style;
                var ps = this.e_tb.style;
                if(cs.backgroundColor==='')      { cs.backgroundColor      = ps.backgroundColor; }
                if(cs.backgroundImage==='')      { cs.backgroundImage      = ps.backgroundImage; }
                if(cs.backgroundRepeat==='')     { cs.backgroundRepeat     = ps.backgroundRepeat; }
                if(cs.backgroundAttachment==='') { cs.backgroundAttachment = ps.backgroundAttachment; }
                if(cs.backgroundPosition==='')   { cs.backgroundPosition   = ps.backgroundPosition; }
                if(cs.border==='')               { cs.border               = ps.border; }
                if(childToolbar.e_tb.getAttribute('class')==='') {
                    childToolbar.e_tb.setAttribute('class', this.e_tb.getAttribute('class'));
                }

                /* float the child to the correct position */
                childToolbar.floatx = x;
                childToolbar.floaty = y;

                /* put the child at the same depth as its parent */
                childToolbar.setZIndex(this.e_tb.style.zIndex);

                /* make sure the child is in the container */
                var container = this.getContainer();
                if(container !== null) {
                    container.appendChild(childToolbar.e_tb);
                }

                /* show the child */
                this.vis_tb_child = childToolbar;
                childToolbar.setState(JTB.STATE_VIS);
                this.refreshGfx();

                return this;
            };

            /** returns true if this is a child toolbar */
            JTB.Toolbar.prototype.isChildToolbar = function() {
                return this.e_content === null;
            };

            /** hides a child toolbar */
            JTB.Toolbar.prototype.hideFromParentToolbar = function() {
                var e = this;
                if(e.tb_parent !== null) {
                    if(e.tb_parent.vis_tb_child == e) {
                        e.tb_parent.vis_tb_child = null;
                        e.setState(JTB.STATE_INVIS);
                        e.tb_parent.refreshGfx();
                    }
                }
            };

            /** get the location of the toolbar on its parent */
            JTB.Toolbar.prototype.getOrientation = function() {
                return this.orient;
            };

            /** returns true if the toolbar is side-oriented */
            JTB.Toolbar.prototype.isSideOriented = function() {
                return (this.orient==JTB.ORIENT_LEFT || this.orient==JTB.ORIENT_RIGHT);
            };

            /** set the location of the toolbar on its parent */
            JTB.Toolbar.prototype.setOrientation = function(orient) {
                if(orient != this.orient) {
                    var oldOrient = this.orient;

                    this.orient = orient;
                    this.refreshGfx();
                    createCookie("orient", this.orient, COOKIE_LIFETIME_DAYS, this.cookie_path);

                    this.fireOrientationListeners(oldOrient);
                }
                return this;
            };

            /** get whether the toolbar is docked */
            JTB.Toolbar.prototype.isDocked = function() {
                return !this.isChildToolbar() && this.docked;
            };

            /** get whether the toolbar is floating */
            JTB.Toolbar.prototype.isFloating = function() {
                return !this.isDocked();
            };

            /** set whether the toolbar is docked */
            JTB.Toolbar.prototype.setDocked = function(b) {
                this.docked = !this.isChildToolbar() && b;
                this.refreshGfx();
                createBooleanCookie("docked", this.docked, COOKIE_LIFETIME_DAYS, this.cookie_path);
                return this;
            };

            /** get the docking threshold */
            JTB.Toolbar.prototype.getDockingThreshold = function() {
                return this.docking_threshold;
            };

            /** set the docking threshold */
            JTB.Toolbar.prototype.setDockingThreshold = function(thresh) {
                this.docking_threshold = thresh;
                return this;
            };

            /** get the float x offset of this toolbar from its parent */
            JTB.Toolbar.prototype.getFloatPosX = function() {
                return this.floatx;
            };

            /** set the float x offset of this toolbar from its parent */
            JTB.Toolbar.prototype.setFloatPosX = function(x) {
                this.setFloatPos(x, this.floaty);
                return this;
            };

            /** get the float y offset of this toolbar from its parent */
            JTB.Toolbar.prototype.getFloatPosY = function() {
                return this.floaty;
            };

            /** set the float y offset of this toolbar from its parent */
            JTB.Toolbar.prototype.setFloatPosY = function(y) {
                this.setFloatPos(this.floatx, y);
                return this;
            };

            /** set the float offsets of this toolbar from its parent */
            JTB.Toolbar.prototype.setFloatPos = function(x, y) {
                this.floatx = x;
                this.floaty = y;
                if(this.isFloating()) {
                    this.refreshGfx();
                }
                createCookie("floatx", this.floatx, COOKIE_LIFETIME_DAYS, this.cookie_path);
                createCookie("floaty", this.floaty, COOKIE_LIFETIME_DAYS, this.cookie_path);
                return this;
            };

            /** get whether the toolbar is clamped to the container's size when floating */
            JTB.Toolbar.prototype.isClampFloatingToolbarSize = function() {
                return this.clamp_size_on_float;
            };

            /** set whether the toolbar is clamped to the container's size when floating */
            JTB.Toolbar.prototype.setClampFloatingToolbarSize = function(b) {
                this.clamp_size_on_float = b;
                if(this.isFloating()) {
                    this.refreshGfx();
                }
                return this;
            };

            /** get how the toolbar deals with overflow */
            JTB.Toolbar.prototype.getOverflowStyle = function() {
                return this.overflow_style;
            };

            /** set how the toolbar deals with overflow */
            JTB.Toolbar.prototype.setOverflowStyle = function(o) {
                this.overflow_style = o;
                this.refreshGfx();
                return this;
            };

            /** returns true if an animation is going on */
            JTB.Toolbar.prototype.isAnimating = function() {
                return (this.anim_start != -1);
            };

            /** set toolbar attributes so it displays according to the current Toolbar state */
            JTB.Toolbar.prototype.refreshGfx = function() {
                /* efficiency: hide the toolbar container while we arrange it */
                var container = this.getContainer();
                var sz_container = this.getContainerSize();
                var sz_container_w=0, sz_container_h=0;
                if(sz_container !== null) {
                    sz_container.refreshSizeData();
                    sz_container_w = sz_container.getPreferredWidth();
                    sz_container_h = sz_container.getPreferredHeight();
                }
                else {
                    sz_container_w = 0;
                    sz_container_h = 0;
                }
                var content = this.getContent();
                if(container===null || content===null) {
                    /* no-op if the toolbar isn't inside or attached to anything */
                    return;
                }

                var origDisp = container.style.display;
                container.style.display = '';

                var extraW = getExtraWidth(content);
                var extraH = getExtraHeight(content);

                /* coerce the toolbar to a reasonable size */
                this.sz_tb.refreshSizeData();

                /* if the toolbar is docked, make sure the content and toolbar
                 * are the same size on the docked dimension */
                var sideOriented = this.isSideOriented();
                if(this.isDocked()) {
                    if(sideOriented) {
                        var extraH_tb = getExtraHeight(this.e_tb);
                        var c_toth = sz_container.height + extraH;
                        var t_toth = this.sz_tb.height + extraH_tb;
                        var maxh = Math.max(c_toth, t_toth);
                        if(c_toth == maxh) {
                            this.sz_tb.height = c_toth - extraH_tb;
                        }
                        else {
                            sz_container_h = sz_container.height = t_toth - extraH;
                        }
                    }
                    else {
                        var extraW_tb = getExtraWidth(this.e_tb);
                        var c_totw = sz_container.width + extraW;
                        var t_totw = this.sz_tb.width + extraW_tb;
                        var maxw = Math.max(c_totw, t_totw);
                        if(c_totw == maxw) {
                            this.sz_tb.width = c_totw - extraW_tb;
                        }
                        else {
                            sz_container_w = sz_container.width = t_totw - extraW;
                        }
                    }
                }

                /* determine the toolbar's current size */
                var tw = this.sz_tb.getPreferredWidth();
                var th = this.sz_tb.getPreferredHeight();
                var vis = (this.getState() == JTB.STATE_VIS);
                if(this.isAnimating()) {
                    /* always visible during the animation */
                    this.e_tb.style.display = 'block';
                    this.e_tb.style.overflow = 'hidden';

                    /* compute how far done (%) the animation is */
                    var millisElapsed = new Date().getTime() - this.anim_start;
                    var percentDone = millisElapsed / this.animation_len_msec;

                    if(percentDone >= 1.0) {
                        percentDone = 1.0;
                        this.anim_start = -1;
                    }
                    else {
                        var mult = (this.anim_springy ? SPRINGINESS_FACTOR : 0.5);

                        /* set the actual toolbar size based on the animation */
                        var p, nextw=tw, nexth=th;
                        if(percentDone <= this.anim_split) {
                            /* first part of animation: go beyond normal max size */
                            p = percentDone / this.anim_split;
                            if(sideOriented) {
                                nextw *= mult;
                            }
                            else {
                                nexth *= mult;
                            }
                        }
                        else {
                            if(this.anim_first_half) {
                                this.anim_first_half = false;
                                this.anim_src_width = this.sz_tb.getCurrentWidth();
                                this.anim_src_height = this.sz_tb.getCurrentHeight();
                            }

                            /* second part: go to final dst */
                            p = (percentDone - this.anim_split) / (1.0 - this.anim_split);
                            if(!vis) {
                                if(sideOriented) {
                                    nextw = 0;
                                }
                                else {
                                    nexth = 0;
                                }
                            }
                        }

                        tw = parseInt(p*nextw + (1.0-p)*this.anim_src_width,  10);
                        th = parseInt(p*nexth + (1.0-p)*this.anim_src_height, 10);
                    }
                }
                else {
                    /* always crop overflow: some users may want scroll here */
                    this.e_tb.style.overflow = this.overflow_style;
                }

                /* show/hide toolbar based on its state if there is no anim */
                if(!this.isAnimating()) {
                    this.e_tb.style.display = (vis ? 'block' : 'none');
                }

                /* determine where in the container the toolbar should be positioned */
                var tx, ty; // toolbar position
                var cx=0, cy=0; // content position
                if(this.isDocked()) {
                    switch(this.orient) {
                    case JTB.ORIENT_LEFT:
                        tx = 0;
                        ty = 0;
                        if(this.isShiftContent()) {
                            cx = tw;
                        }
                        break;

                    case JTB.ORIENT_RIGHT:
                        tx = sz_container_w - tw + extraW;
                        ty = 0;
                        break;

                    case JTB.ORIENT_TOP:
                        tx = 0;
                        ty = 0;
                        if(this.isShiftContent()) {
                            cy = th;
                        }
                        break;

                    case JTB.ORIENT_BOTTOM:
                        tx = 0;
                        ty = sz_container_h - th + extraH;
                        break;
                    }
                }
                else {
                    tx = this.floatx;
                    ty = this.floaty;
                }

                /* compute the content's size */
                var cw, ch;
                if(vis && this.isShiftContent()) {
                    cw = ((cx < tx) ? (tx - cx) : (sz_container_w  - cx));
                    ch = ((cy < ty) ? (ty - cy) : (sz_container_h - cy));
                }
                else {
                    cw = sz_container_w;
                    ch = sz_container_h;
                }

                /* set the toolbar's and content's sizes and positions */
                var px = container.offsetLeft;
                var py = container.offsetTop;

                /* the root toolbar handles the content style */
                if(!this.isChildToolbar()) {
                    content.style.left   = (px + cx) + 'px';
                    content.style.top    = (py + cy) + 'px';
                    content.style.width  = cw + 'px';
                    content.style.height = ch + 'px';
                }

                if(this.isFloating() && this.isClampFloatingToolbarSize()) {
                    var cwf = cw + getExtraWidth(content);
                    var chf = ch + getExtraHeight(content);

                    /* clamp the toolbar's size to be within the container */
                    if(tx < 0) {
                        tw += tx;
                        tx = 0;
                    }

                    if(tx + tw > cwf) {
                        tw = cwf - tx;
                    }

                    if(ty < 0) {
                        th += ty;
                        ty = 0;
                    }

                    if(ty + th > chf) {
                        th = chf - ty;
                    }
                }

                /* use offset relative to parent toolbar if there is one (vice container) */
                if(this.tb_parent !== null) {
                    px = this.tb_parent.e_tb.offsetLeft;
                    py = this.tb_parent.e_tb.offsetTop;
                }
                this.e_tb.style.left = (px + tx) + 'px';
                this.e_tb.style.top  = (py + ty) + 'px';
                this.e_tb.style.width  = tw + 'px';
                this.e_tb.style.height = th + 'px';

                /* setup the pin/unpin icon */
                this.refreshIconsGfx();

                /* refresh child toolbars */
                if(this.vis_tb_child !== null) {
                    this.vis_tb_child.refreshGfx();
                }

                /* show it again */
                container.style.display = origDisp;

                return this;
            };

            /** set pin icon attributes so it displays according to the current Toolbar state */
            JTB.Toolbar.prototype.refreshIconsGfx = function() {
                var imgName;
                var iconTotalSize = ICON_SIZE + 2*ICON_MARGIN + 2*ICON_BORDER_SIZE;

                var esd = this.e_icon_drag.style;
                var esf = this.e_icon_float.style;
                var esp = this.e_icon_pin.style;

                /* handle the case where no icons should be shown now */
                if(this.isChildToolbar()) {
                    esd.display = 'none';
                    esf.display = 'none';
                    esp.display = 'none';
                    return;
                }

                var x = 0;
                var y = 0;
                var dx, dy;
                if(this.isSideOriented()) {
                    dx = iconTotalSize;
                    dy = 0;
                }
                else {
                    dx = 0;
                    dy = iconTotalSize;
                    x -= iconTotalSize;


                    if(this.getOrientation() == JTB.ORIENT_BOTTOM) {
                        dy = -dy;
                        y = ICON_COUNT * iconTotalSize;
                    }
                    else {
                        y = this.e_tb.offsetHeight - (ICON_COUNT+1) * iconTotalSize;
                    }
                }
                if(this.getOrientation() != JTB.ORIENT_RIGHT) {
                    x += this.e_tb.offsetWidth + getExtraWidth(this.e_tb) / 2;
                    if(this.getOrientation() == JTB.ORIENT_LEFT) {
                        x -= ((ICON_COUNT+1) * iconTotalSize);
                    }
                }
                else {
                    dx = -dx;
                    x += (ICON_COUNT * iconTotalSize);
                }

                var iconOn = 0;
                if(this.isShowDragIcon()) {
                    /* show it */
                    imgName = this.getImagePath() + (this.isDragging() ? 'dragging.gif' : 'drag.gif');
                    esd.backgroundImage = 'url(' + imgName + ')';
                    esd.display = 'block';
                    esd.left = (x + dx) + 'px';
                    esd.top = (y + dy) + 'px';
                }
                else {
                    /* hide it */
                    esd.display = 'none';
                }

                x += dx;
                y += dy;
                iconOn += 1;
                if(this.isShowFloatIcon()) {
                    /* show it */
                    imgName = this.getImagePath() + (this.isDocked() ? 'float.gif' : 'floating.gif');
                    esf.backgroundImage = 'url(' + imgName + ')';
                    esf.display = 'block';
                    esf.left = (x + dx) + 'px';
                    esf.top = (y + dy) + 'px';
                }
                else {
                    /* hide it */
                    esf.display = 'none';
                }

                x += dx;
                y += dy;
                iconOn += 1;
                if(this.isShowPinIcon()) {
                    /* show it */
                    imgName = this.getImagePath() + (this.isPinned() ? 'pin.gif' : 'unpin.gif');
                    esp.backgroundImage = 'url(' + imgName + ')';
                    esp.display = 'block';
                    esp.left = (x + dx) + 'px';
                    esp.top = (y + dy) + 'px';
                }
                else {
                    /* hide it */
                    esp.display = 'none';
                }

                return this;
            };

            /** get whether the drag icon is showing */
            JTB.Toolbar.prototype.isShowDragIcon = function() {
                return this.show_drag;
            };

            /** set whether the drag icon is showing */
            JTB.Toolbar.prototype.setShowDragIcon = function(b) {
                this.show_drag = b;
                return this;
            };

            /** get whether the float icon is showing */
            JTB.Toolbar.prototype.isShowFloatIcon = function() {
                return this.show_float;
            };

            /** set whether the drag icon is showing */
            JTB.Toolbar.prototype.setShowFloatIcon = function(b) {
                this.show_float = b;
                return this;
            };

            /** get whether the pin icon is showing */
            JTB.Toolbar.prototype.isShowPinIcon = function() {
                return this.show_pin;
            };

            /** set whether the pin icon is showing */
            JTB.Toolbar.prototype.setShowPinIcon = function(b) {
                this.show_pin = b;
                return this;
            };

            /** get the path to the location where images are stored */
            JTB.Toolbar.prototype.getImagePath = function() {
                return this.img_path;
            };

            /** set the path to the location where images are stored */
            JTB.Toolbar.prototype.setImagePath = function(path) {
                this.img_path = path;
                this.refreshIconsGfx();
                return this;
            };

            /** get whether the toolbar is being dragged */
            JTB.Toolbar.prototype.isDragging = function() {
                return this.dragging;
            };

            /** get whether the toolbar is pinned (child toolbars are always unpinned) */
            JTB.Toolbar.prototype.isPinned = function() {
                return !this.isChildToolbar() && this.pinned;
            };

            /** set whether the toolbar is pinned (always false if this is a child toolbar) */
            JTB.Toolbar.prototype.setPinned = function(b) {
                this.pinned = (this.isChildToolbar() ? false : b);
                createBooleanCookie("pinned", this.pinned, COOKIE_LIFETIME_DAYS, this.cookie_path);
                return this;
            };

            /**
             * get whether the toolbar takes up space (versus being in front of
             * the content).  Always false unless docked.  Otherwise this
             * returns true if the toolbar is pinned or should 'always' shift
             * content.
             */
            JTB.Toolbar.prototype.isShiftContent = function() {
                return this.isDocked() && (this.isPinned() || this.alwaysShiftContent);
            };

            /** set whether the toolbar takes up space even when it isn't pinned. */
            JTB.Toolbar.prototype.setAlwaysShiftContent = function(b) {
                this.alwaysShiftContent = b;
                return this;
            };

            /** get the state of the toolbar's visibility */
            JTB.Toolbar.prototype.getState = function() {
                return this.state;
            };

            /** whether the toolbar is visible */
            JTB.Toolbar.prototype.isVisible = function() {
                return this.state == JTB.STATE_VIS;
            };

            /** show or hide the toolbar */
            JTB.Toolbar.prototype.setVisible = function(b) {
                if(b) {
                    this.setState(JTB.STATE_VIS);
                }
                else {
                    this.setState(JTB.STATE_INVIS);
                }
                return this;
            };

            /** update the state and make the transition as appropriate */
            JTB.Toolbar.prototype.setState = function(newState) {
                /* do nothing if the state has not changed */
                if(newState == this.state) {
                    return this;
                }

                /* reject state changes which try to occur during an animation */
                if(this.isAnimating()) {
                    return false;
                }

                /* if we're hiding this toolbar, hide its child too */
                if(newState == JTB.STATE_INVIS && this.vis_tb_child) {
                    this.vis_tb_child.setVisible(false);
                    this.vis_tb_child = null;
                }

                this.state = newState;

                /* get sizing info */
                var sz_container = this.getContainerSize();
                var sz_container_w=0, sz_container_h=0;
                if(sz_container !== null) {
                    sz_container_w = sz_container.getPreferredWidth();
                    sz_container_h = sz_container.getPreferredHeight();
                }
                else {
                    sz_container_w = 0;
                    sz_container_h = 0;
                }

                /* perform the transition animation */
                this.anim_start = new Date().getTime();
                if(this.isSideOriented()) {
                    this.anim_src_width = this.sz_tb.getCurrentWidth();
                    if(this.isChildToolbar()) {
                        this.anim_src_height = this.sz_tb.getCurrentHeight();
                    }
                    else {
                        this.anim_src_height = sz_container_h + getExtraHeight(this.getContent());
                    }
                }
                else {
                    if(this.isChildToolbar()) {
                        this.anim_src_width = sz_container_w + getExtraWidth(this.getContent());
                    }
                    else {
                        this.anim_src_width = this.sz_tb.getCurrentWidth();
                    }
                    this.anim_src_height = this.sz_tb.getCurrentHeight();
                }
                this.anim_first_half = true;
                this.anim_split = ((newState==JTB.STATE_VIS) ? (1.0-SPLIT_CLOSE) : SPLIT_CLOSE);
                handleToolbarAnimation(this);

                this.fireVisibilityListeners();
                return this;
            };

            /** sets the visibility of the toolbar based on the mouse location */
            JTB.Toolbar.prototype.setStateBasedOnMouse = function() {
                /* always show if pinned or if a child is active */
                if(this.isPinned() || this.vis_tb_child!==null) {
                    this.setVisible(true);
                    return;
                }

                /* determine the max deviation from the top-left corner of the toolbar */
                var vis = (this.getState() == JTB.STATE_VIS);
                var maxdx, maxdy;
                if(vis || this.isFloating()) {
                    maxdx = this.sz_tb.getPreferredWidth();
                    maxdy = this.sz_tb.getPreferredHeight();
                }
                else {
                    if(this.isSideOriented()) {
                        maxdx = this.trigger_dist;
                        maxdy = this.sz_tb.getPreferredHeight();
                    }
                    else {
                        maxdx = this.sz_tb.getPreferredWidth();
                        maxdy = this.trigger_dist;
                    }
                }

                /* get the position of the toolbar */
                var x, y;
                if(this.isDocked()) {
                    x = findPosX(this.e_tb);
                    y = findPosY(this.e_tb);

                    /* adjust based on orientation */
                    var content = this.getContent();
                    var cw, ch;
                    if(content === null) {
                        cw = ch = 0;
                    }
                    else {
                        cw = content.offsetWidth;
                        ch = content.offsetHeight;
                    }

                    if(this.orient == JTB.ORIENT_RIGHT) {
                        x = findPosX(content) + cw - this.sz_tb.getPreferredWidth();
                    }
                    else if(this.orient == JTB.ORIENT_BOTTOM) {
                        y = findPosY(content) + ch - this.sz_tb.getPreferredHeight();
                    }
                }
                else {
                    x = this.floatx;
                    y = this.floaty;
                }

                /* determine whether the mouse is over this toolbar's area */
                vis = (mouseX>=x && mouseX<x+maxdx && mouseY>=y && mouseY<y+maxdy);

                if(this.isChildToolbar() && this.tb_parent!==null && !vis) {
                    /* only popout children if the mouse is also not over its parents */
                    vis = this.tb_parent.isMouseOverMeOrParents();
                    if(!vis) {
                        this.hideFromParentToolbar();
                    }
                }
                else {
                    /* display the toolbar iff the mouse is within the maximum deviation */
                    this.setVisible(vis);
                }
            };

            /** get the number of milliseconds the animation will last */
            JTB.Toolbar.prototype.getAnimationLength = function() {
                return this.animation_len_msec;
            };

            /** set the number of milliseconds the animation will last */
            JTB.Toolbar.prototype.setAnimationLength = function(msec) {
                this.animation_len_msec = msec;
                return this;
            };

            /** get whether animations will be springy */
            JTB.Toolbar.prototype.isAnimationSpringy = function() {
                return this.anim_springy;
            };

            /** set whether animations will be springy */
            JTB.Toolbar.prototype.setAnimationSpringy = function(b) {
                this.anim_springy = b;
                return this;
            };

            /** get the # of pixels from the edge at which the toolbar will popup */
            JTB.Toolbar.prototype.getTriggerDistance = function() {
                return this.trigger_dist;
            };

            /** set the # of pixels from the edge at which the toolbar will popup */
            JTB.Toolbar.prototype.setTriggerDistance = function(d) {
                this.trigger_dist = d;
                return this;
            };

            /** get the path cookies are saved with */
            JTB.Toolbar.prototype.getCookiePath = function() {
                return this.cookie_path;
            };

            /** set the path to save cookies with */
            JTB.Toolbar.prototype.setCookiePath = function(path) {
                if(path == 'page') {
                    this.cookie_path = document.location.pathname;
                }
                else {
                    this.cookie_path = path;
                }
                return this;
            };

            /**
             * Register for a callback when orientation changes.  Two arguments
             * will be passed - the toolbar and the old orientation state.  (The
             * new state can be determined with toolbar.getOrientation()).
             */
            JTB.Toolbar.prototype.addOrientationListener = function(f) {
                this.orientation_listeners[this.orientation_listeners.length] = f;
            };

            /** Unregister an orientation listener. */
            JTB.Toolbar.prototype.removeOrientationListener = function(f) {
                var i = this.orientation_listeners.indexOf(f);
                if(i >= 0) {
                    this.orientation_listeners[i] = this.orientation_listeners[0];
                    this.orientation_listeners.shift();
                }
            };

            /** Notify orientation listeners that an orientation change has occurred. */
            JTB.Toolbar.prototype.fireOrientationListeners = function(oldOrientation) {
                var i;
                for(i=0; i<this.orientation_listeners.length; i++) {
                    var f = this.orientation_listeners[i];
                    f(this, oldOrientation);
                }
            };

            /**
             * Register for a callback when visibility changes.  One argument
             * will be passed - the toolbar.
             */
            JTB.Toolbar.prototype.addVisibilityListener = function(f) {
                this.visibility_listeners[this.visibility_listeners.length] = f;
            };

            /** Unregister a visibility listener. */
            JTB.Toolbar.prototype.removeVisibilityListener = function(f) {
                var i = this.visibility_listeners.indexOf(f);
                if(i >= 0) {
                    this.visibility_listeners[i] = this.visibility_listeners[0];
                    this.visibility_listeners.shift();
                }
            };

            /** Notify visibility listeners that a visibility change has occurred. */
            JTB.Toolbar.prototype.fireVisibilityListeners = function() {
                var i;
                for(i=0; i<this.visibility_listeners.length; i++) {
                    var f = this.visibility_listeners[i];
                    f(this);
                }
            };

            /** get the array of ToolbarLinks links associated with the toolbar */
            JTB.Toolbar.prototype.getLinks = function() {
                return this.links;
            };

            /** add a link to the toolbar (at the end of the array) */
            JTB.Toolbar.prototype.addLink = function(name, link) {
                this.insertLink(this.links.length, name, link);
                return this;
            };

            /** insert a link into the array of basic toolbar links */
            JTB.Toolbar.prototype.insertLink = function(index, name, link) {
                var i, len;
                len = this.links.length;

                if(index > len || index < 0) {
                    throw("bad index in Toolbar.insertLink");
                }

                for(i=len; i>=index; i--) {
                    this.links[i] = this.links[i-1];
                }

                this.links[index] = new JTB.ToolbarLink(name, link);
                this.refreshLinks();
                return this;
            };

            /** remove a link from the array of basic toolbar links */
            JTB.Toolbar.prototype.removeLink = function(index) {
                var i, len;
                len = this.links.length;
                for(i=index; i<len-1; i++) {
                    this.links[i] = this.links[i+1];
                }

                this.refreshLinks();
                return this;
            };

            /** refresh the links shown in the toolbar */
            JTB.Toolbar.prototype.refreshLinks = function() {
                var i, len;

                this.e_links.innerHTML = "";

                len = this.links.length;
                for(i=0; i<len; i++) {
                    this.e_links.innerHTML += this.links[i].makeLink();
                }

                this.sz_tb.invalidateCacheAndRefreshSizeData();
                this.refreshGfx();
            };

            /** initialize the container and content divs */
            JTB.Toolbar.prototype.initContainerAndContent = function() {
                /* get the content and its parent */
                this.e_content = document.getElementById(this.content_id);
                if(this.e_content === null) {
                    this.content_id = null;
                    return;
                }
                var parent = this.e_content.parentNode;

                /* create a div to hold the toolbar and its attached content */
                this.e_container = document.createElement("div");
                this.e_container.setAttribute('id', this.tb_id + "_container");

                /* determine where in the parent's list of children the content is */
                var childIndex, nextChild = null;
                for(childIndex=0; childIndex<parent.childNodes.length; childIndex++) {
                    if(parent.childNodes[childIndex] == this.e_content) {
                        if(parent.childNodes.length > childIndex + 1) {
                            nextChild = parent.childNodes[childIndex + 1];
                        }
                        break;
                    }
                }

                /* remove the content for now */
                parent.removeChild(this.e_content);

                /* give container position, size, and layout properties of orig content */
                this.e_container.style.display = this.e_content.style.display;
                this.e_container.style.height  = this.e_content.style.height;
                this.e_container.style.left    = this.e_content.style.left;
                this.e_container.style.top     = this.e_content.style.top;
                this.e_container.style.width   = this.e_content.style.width;
                this.e_container.style.zIndex  = this.e_content.style.zIndex;

                /* clear the copied properties from the content */
                this.e_content.style.display = 'block';
                this.e_content.style.height  = '';
                this.e_content.style.left    = '';
                this.e_content.style.top     = '';
                this.e_content.style.width   = '';
                this.e_content.style.position = 'absolute';

                /* put our new elements into the DOM */
                this.e_container.appendChild(this.e_tb);
                this.e_container.appendChild(this.e_content);

                if(nextChild === null) {
                    parent.appendChild(this.e_container);
                }
                else {
                    parent.insertBefore(this.e_container, nextChild);
                }

                this.sz_container = new JTB.SizeHelper(this.e_container, null);
            };

            /* create and hook the toolbar into the UI (assumes it is not already hooked in */
            JTB.Toolbar.prototype.hookup = function() {
                var tb_id = this.tb_id;

                /* get the toolbar element */
                this.e_tb = document.getElementById(this.tb_id);
                var isBasicToolbar = (this.e_tb === null);
                if(isBasicToolbar) {
                    /* create the toolbar if it doesn't exist */
                    this.e_tb = document.createElement("div");
                    this.e_tb.setAttribute('id', this.tb_id);
                }
                else {
                    /* remove the toolbar from its current parent */
                    this.e_tb.parentNode.removeChild(this.e_tb);
                }

                var hasContent = (this.content_id !== null);
                if(hasContent) {
                    this.initContainerAndContent();
                    hasContent = (this.content_id !== null);
                }
                var inferOrientation = (hasContent && !isBasicToolbar && readCookie("orient")===null);

                /* create a div to put the links in within the toolbar */
                this.e_links = document.createElement("div");
                this.e_links.setAttribute('id', this.tb_id + "_links");
                this.e_tb.appendChild(this.e_links);

                /* create a div to put the icons in */
                this.e_icons = document.createElement("div");
                this.e_icons.setAttribute('id', this.tb_id + "_icons");
                this.e_icons.style.display = 'block';
                this.e_tb.insertBefore(this.e_icons, this.e_tb.childNodes[0]);

                /* create a div for the drag icon */
                this.e_icon_drag = document.createElement("div");
                this.e_icon_drag.setAttribute('id', this.tb_id + "_icon_drag");
                this.e_icon_drag.addEventListener('mousedown',
                                                  function(e){JTB.handleDragStartEvent(tb_id, e);},
                                                  false);
                setupIconDiv(this.e_icon_drag);
                this.e_icons.appendChild(this.e_icon_drag);

                /* create a div for the float icon */
                this.e_icon_float = document.createElement("div");
                this.e_icon_float.setAttribute('id', this.tb_id + "_icon_float");
                this.e_icon_float.addEventListener('click',
                                                  function(e){JTB.handleFloatClickEvent(tb_id);},
                                                  false);
                setupIconDiv(this.e_icon_float);
                this.e_icons.appendChild(this.e_icon_float);

                /* create a div for the pin icon */
                this.e_icon_pin = document.createElement("div");
                this.e_icon_pin.setAttribute('id', this.tb_id + "_icon_pin");
                this.e_icon_pin.addEventListener('click',
                                                 function(e){JTB.handlePinClickEvent(tb_id);},
                                                 false);
                setupIconDiv(this.e_icon_pin);
                this.e_icons.appendChild(this.e_icon_pin);

                /* toolbar and content will be absolutely positioned within the container */
                this.e_tb.style.position = 'absolute';

                /* toolbar just in front of the content */

                if(hasContent) {
                	var z = findZIndex(this.e_content);
                    this.e_content.style.zIndex = z;
                    this.setZIndex(z + 1);
                }

                /* make sure the anchor is always in front */
                if(ICON_ANCHOR.style.zIndex < z + 1) {
                    ICON_ANCHOR.style.zIndex = z + 1;
                }

                /* create size helpers */
                this.sz_tb = new JTB.SizeHelper(this.e_tb, this);

                /* infer the default orientation for custom root toolbars */
                if(inferOrientation) {
                    var w = lengthToPixels(this.e_tb.offsetWidth, true);
                    var h = lengthToPixels(this.e_tb.offsetHeight, false);

                    if(h > w) {
                        /* vertical */
                        if(this.e_tb.offsetLeft <= (document.body.offsetWidth / 2)) {
                            this.setOrientation(JTB.ORIENT_LEFT);
                        }
                        else {
                            this.setOrientation(JTB.ORIENT_RIGHT);
                        }
                    }
                    else if(w > h) {
                        /* horizontal */
                        if(this.e_tb.offsetTop <= (document.body.offsetHeight / 2)) {
                            this.setOrientation(JTB.ORIENT_TOP);
                        }
                        else {
                            this.setOrientation(JTB.ORIENT_BOTTOM);
                        }
                    }
                }

                /* build the toolbar links (triggers a ui redraw too) */
                this.refreshLinks();

                this.restoreFromCookie();
            };

            /** unhook the toolbar from the UI (assumes it is currently hooked in) */
            JTB.Toolbar.prototype.unhook = function() {
                /* TODO */
            };

            /** set the zIndex of the toolbar and its icons */
            JTB.Toolbar.prototype.setZIndex = function(z) {
                this.e_tb.style.zIndex = z;
                this.e_icon_drag.style.zIndex = z;
                this.e_icon_float.style.zIndex = z;
                this.e_icon_pin.style.zIndex = z;
            };

            /** refreshes the toolbar elements to reflect a change in available space */
            JTB.Toolbar.prototype.handleResizing = function() {
                this.sz_tb.invalidateCacheAndRefreshSizeData();
                var sz_container = this.getContainerSize();
                if(sz_container !== null) {
                    sz_container.invalidateCacheAndRefreshSizeData();
                }
                this.refreshGfx();
            };

            /** terminates any ongoing drag operation */
            JTB.Toolbar.prototype.handleMouseUp = function() {
                if(this.isDragging()) {
                    ICON_ANCHOR.style.display = 'none';
                    this.dragging = false;
                    this.refreshGfx();

                    /* re-enable text selection on the toolbar */
                    this.e_tb.setAttribute("onmousedown", "");
                }
            };

            /** clears the toolbar's cookies */
            JTB.Toolbar.prototype.clearCookies = function() {
                eraseCookie("orient", this.cookie_path);
                eraseCookie("docked", this.cookie_path);
                eraseCookie("floatx", this.cookie_path);
                eraseCookie("floaty", this.cookie_path);
                eraseCookie("pinned", this.cookie_path);
            };

            /** restores the toolbar's UI-changable options from the cookie */
            JTB.Toolbar.prototype.restoreFromCookie = function() {
                var orient = readCookie("orient");
                if(orient !== null) { this.setOrientation(orient); }

                var docked = readBooleanCookie("docked");
                if(docked !== null) { this.docked = docked; }

                var floatx = readCookie("floatx");
                if(floatx !== null) { this.floatx = parseInt(floatx, 10); }

                var floaty = readCookie("floaty");
                if(floaty !== null) { this.floaty = parseInt(floaty, 10); }

                var pinned = readBooleanCookie("pinned");
                if(pinned !== null) { this.pinned = pinned; }

                this.refreshGfx();
            };

            /**
             * Returns the closest dock within thresh pixels, or null if none.
             * The current docking location is given an advantage of
             * curAdvantageMultiple (e.g. higher number => greater preference).
             */
            JTB.Toolbar.prototype.getClosestDock = function(x, y, thresh, curAdvantageMultiple) {
                var container = this.getContainer();
                if(container === null) {
                    return null;
                }
                var cw = container.offsetWidth;
                var ch = container.offsetHeight;
                var tw = lengthToPixels(this.sz_tb.vert_orient_width, true);
                var th = lengthToPixels(this.sz_tb.horiz_orient_height, false);

                /* compute distance to the docking locations */
                var dl = distanceSqToRectangle(x, y, 0, 0, tw, ch);
                var dt = distanceSqToRectangle(x, y, 0, 0, cw, th);
                var dr = distanceSqToRectangle(x, y, cw - tw, 0, tw, ch);
                var db = distanceSqToRectangle(x, y, 0, ch - th, cw, th);

                /* compute the minimum distance */
                var minDist = Math.min(dl, Math.min(dt, Math.min(dr, db)));
                if(minDist > thresh * thresh) {
                    return null;
                }

                /* check the current dock first (e.g. tie => use same dock) */
                var o = this.getOrientation();
                var scaledMinDist = minDist * curAdvantageMultiple;
                switch(o) {
                case JTB.ORIENT_LEFT:   if(dl <= scaledMinDist) { return o; } break;
                case JTB.ORIENT_RIGHT:  if(dr <= scaledMinDist) { return o; } break;
                case JTB.ORIENT_TOP:    if(dt <= scaledMinDist) { return o; } break;
                case JTB.ORIENT_BOTTOM: if(db <= scaledMinDist) { return o; } break;
                }

                /* check the current dock first (e.g. tie => use same dock) */
                if(dl == minDist) { return JTB.ORIENT_LEFT; }
                if(dr == minDist) { return JTB.ORIENT_RIGHT; }
                if(dt == minDist) { return JTB.ORIENT_TOP; }
                return JTB.ORIENT_BOTTOM;
            };

            /** returns whether the mouse is over the toolbar */
            JTB.Toolbar.prototype.isMouseOver = function() {
                var container = this.getContainer();
                if(container === null) {
                    return false;
                }

                var d = this.getClosestDock(mouseX-findPosX(container),
                                            mouseY-findPosY(container),
                                            0,
                                            1);
                return (d == this.getOrientation());
            };

            /**
             * Returns whether the mouse is over the toolbar or any of its
             * active parents.  A parent is active for a given child if that
             * parent is currently displaying the child.
             */
            JTB.Toolbar.prototype.isMouseOverMeOrParents = function() {
                var b = this.isMouseOver();
                if(!b && this.tb_parent!==null && this.tb_parent.vis_tb_child===this) {
                    return this.tb_parent.isMouseOverMeOrParents();
                }
                return b;
            };

            /** gets a toolbar object based on its name */
            JTB.getToolbar = function(name) {
                var i;
                for(i=0; i<toolbars.length; i++) {
                    if(toolbars[i].tb_id == name) {
                        return toolbars[i];
                    }
                }

                return null;
            };

            /** called when the mouse moves */
            JTB.handleMouseMove = function(event) {
                mouseX = event.pageX;
                mouseY = event.pageY;

                var i;
                for(i=0; i<toolbars.length; i++) {
                    var tb = toolbars[i];
                    if(tb.isDragging()) {
                        tb.setFloatPos(mouseX - mouseDragX + tb.dragStartX,
                                       mouseY - mouseDragY + tb.dragStartY);

                        if(tb.isDocked()) {
                            var d;
                            var container = tb.getContainer();
                            if(container !== null) {
                                d = tb.getClosestDock(mouseX-findPosX(container),
                                                      mouseY-findPosY(container),
                                                      tb.docking_threshold,
                                                      JTB.DOCK_CLOSEST_INCUMBENT_ADVANTAGE);
                                if(d !== null) {
                                    tb.setOrientation(d);
                                }
                            }
                            else {
                                d = null;
                            }

                            var imgName = tb.getImagePath() + ((d===null) ? 'anchor.gif' : 'anchor_highlighted.gif');
                            ICON_ANCHOR.style.backgroundImage = 'url(' + imgName + ')';
                            ICON_ANCHOR.style.left = mouseX - ICON_ANCHOR_WIDTH / 2;
                            ICON_ANCHOR.style.top = mouseY - ICON_ANCHOR_HEIGHT / 2;
                            ICON_ANCHOR.style.display = 'block';
                        }
                    }
                    else if(!tb.isPinned() && !tb.isAnimating()) {
                        tb.setStateBasedOnMouse();
                    }
                }
            };

            /** handle a click on the drag icon */
            JTB.handleDragStartEvent = function(tb_id, event) {
                var tb = JTB.getToolbar(tb_id);
                if(tb === null) {
                    return;
                }

                mouseDragX = event.pageX;
                mouseDragY = event.pageY;
                tb.dragStartX = tb.e_tb.offsetLeft;
                tb.dragStartY = tb.e_tb.offsetTop;
                tb.dragging = true;
                tb.refreshGfx();

                /* disable text selection on the toolbar */
                tb.e_tb.setAttribute("onmousedown", "return false;");
            };

            /** handle a click on a float icon */
            JTB.handleFloatClickEvent = function(tb_id) {
                var tb = JTB.getToolbar(tb_id);
                if(tb === null) {
                    return;
                }

                if(tb.isDocked()) {
                    /* if we undock, start floating in our current position */
                    var x = tb.e_tb.offsetLeft - tb.e_tb.parentNode.offsetLeft;
                    var y = tb.e_tb.offsetTop - tb.e_tb.parentNode.offsetTop;
                    tb.setFloatPos(x, y);
                }
                else {
                    /* if we dock, snap to the dock closest to our floating position */
                    var d = tb.getClosestDock(tb.floatx, tb.floaty,
                                              tb.docking_threshold,
                                              JTB.DOCK_CLOSEST_INCUMBENT_ADVANTAGE);
                    if(d !== null) {
                        tb.setOrientation(d);
                    }
                }

                tb.setDocked(!tb.isDocked());
                tb.refreshGfx();
                tb.setStateBasedOnMouse();
            };

            /** handle a click on a pin icon */
            JTB.handlePinClickEvent = function(tb_id) {
                var tb = JTB.getToolbar(tb_id);
                if(tb === null) {
                    return;
                }

                tb.setPinned(!tb.isPinned());
                tb.refreshGfx();
                tb.setStateBasedOnMouse();
            };

            /** handle callback for an animation event */
            JTB.handleAnimationCallback = function(tb_id) {
                var tb = JTB.getToolbar(tb_id);
                if(tb === null) {
                    return;
                }

                handleToolbarAnimation(tb);
            };

            /** handle the callback for the window being resized */
            JTB.handleWindowResizeEvent = function() {
                var i;
                for(i=0; i<toolbars.length; i++) {
                    toolbars[i].handleResizing();
                }
            };

            /** handle the callback for the mouse button being released */
            JTB.handleMouseUp = function(event) {
                var i;
                for(i=0; i<toolbars.length; i++) {
                    toolbars[i].handleMouseUp();
                }
            };

            /** shows a child toolbar */
            JTB.showChildToolbar = function(childToolbarName, x, y) {
                var c = JTB.getToolbar(childToolbarName);
                if(c===null) {
                    return;
                }

                c.tb_parent.showChildToolbar(c, x, y);
            };

            /** calculates the x-offset of a child toolbar from its parent toolbar */
            JTB.findXOffset = function(childToolbarName, event) {
            	var childToolbar = JTB.getToolbar(childToolbarName);
            	var linkDiv = event.target;
            	var parentToolbar = childToolbar.getParentToolbar();
            	var orient = parentToolbar.getOrientation();
            	// Remove the units from the width string
            	var w = parentToolbar.e_tb.style.width;
            	w = w.substr(0,w.length-2);
            	if (orient == JTB.ORIENT_LEFT) {
            		return linkDiv.offsetLeft + (+w);
            	} else if (orient == JTB.ORIENT_RIGHT) {
            		return linkDiv.offsetLeft - (+w);	
            	} else {
            		return linkDiv.offsetLeft;
            	}
            };

            /** calculates the y-offset of a child toolbar from its parent toolbar */
            JTB.findYOffset = function(childToolbarName, event) {
            	var childToolbar = JTB.getToolbar(childToolbarName);
            	var linkDiv = event.target;
            	var parentToolbar = childToolbar.getParentToolbar();
            	var orient = parentToolbar.getOrientation();
            	var h = parentToolbar.e_tb.style.height;
            	h = h.substr(0,h.length-2);
            	if (orient == JTB.ORIENT_TOP) {
            		return linkDiv.offsetTop + (+h);
            	} else if (orient == JTB.ORIENT_BOTTOM) {
            		return linkDiv.offsetTop - (+h);	
            	} else {
            		return linkDiv.offsetTop;
            	}
            };

            /* install a global event handlers */
            window.addEventListener('resize',    JTB.handleWindowResizeEvent, false);
            window.addEventListener('mouseup',   JTB.handleMouseUp,           false);
            window.addEventListener('mousemove', JTB.handleMouseMove,         false);

            /* create a div for the shared anchor icon */
            ICON_ANCHOR = document.createElement("div");
            ICON_ANCHOR.setAttribute('id', "toolbar_anchor");
            ICON_ANCHOR.style.width = ICON_ANCHOR_WIDTH + 'px';
            ICON_ANCHOR.style.height = ICON_ANCHOR_HEIGHT + 'px';
            ICON_ANCHOR.style.position = 'absolute';
            ICON_ANCHOR.style.display = 'none';
            ICON_ANCHOR.style.zIndex = 0;
            document.body.appendChild(ICON_ANCHOR);
        }
    };
}();
JTB.init();

if(document.location == 'http://www.amazon.com/') {
    var e = document.getElementById('navbar');
    e.style.height = e.offsetHeight + 'px';
    new JTB.Toolbar('page-wrap', 'navbar').setImagePath('http://www.stanford.edu/~dgu/images_opaque/');
    document.body.removeChild(document.getElementById('page-footer'));
}
else {
    new JTB.Toolbar('body', 'cs-title').setImagePath('http://www.stanford.edu/~dgu/images_opaque/');
    document.getElementById('cs-title').removeChild(document.getElementById('cs-topshadow'));
}
