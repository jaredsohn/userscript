// ==UserScript==
// @name           Liverpool FC Forums
// @namespace      http://forums.liverpoolfc.com
// @description    Liverpool FC Forum Enhancements
// @include        http://forums.liverpoolfc.com/*
// ==/UserScript==

var lfc = {
    
    navtabs: null,
    navlinks: [],   // array of all popup menu links in navtabs container
    
    // local storage arrays
    _images : [], // array of image links 
    _videos : [], // array of video links
    
    // script configuration defaults 
    settings : {
        image_state : 1,     // 0 = don't show; 1 = show unique (ignore duplicates); 2 = show all 
        image_limit : 10,    // limit the number of images to show on a single page
        image_width : 400,   // constrain image width (px)
        video_state : true,  // embed videos
        video_width : 450,
        video_height : 350
    },

    // configuration input defs    
    inputs : [
        {
            id : 'image_state',
            label : 'Display Images?',
            title : 'Optionally display images inline in posts',
            type : 'select',
            options : [
                {
                    text : 'None',
                    value : 0,
                    defaultSelected : false,
                    selected : false
                },
                {
                    text : 'Unique',
                    value : 1,
                    defaultSelected : false,
                    selected : false
                },                    
                {
                    text : 'All',
                    value : 2,
                    defaultSelected : false,
                    selected : false
                } 
            ]
        },
        {
            id : 'image_limit',
            label : 'Image Limit',
            title : 'Set a limit on the number of images displayed (0 = no limit)',
            type : 'text',
            size : 4,
            checkInput : function() { return !isNaN(this.value); } 
        },
        {
            id : 'image_width',
            label : 'Image Width',
            title : 'Set a limit on the width of images (in px, 0 = no limit)',
            type : 'text',
            size : 4,
            postfix : 'px',
            checkInput : function() { return !isNaN(this.value); } 
        },        
        { 
            id : 'video_state',
            label : 'Display Videos?',
            title : 'Optionally display videos inline in posts',
            type : 'checkbox'
        },
        {
            id : 'video_width',
            label : 'Video Width',
            title : 'Set the width of videos',
            type : 'text',
            size : 4,
            postfix : 'px',
            checkInput : function() { return (!isNaN(this.value) && this.value!=0); }
        },    
        {
            id : 'video_height',
            label : 'Video Height',
            title : 'Set the height of videos',
            type : 'text',
            size : 4,
            postfix : 'px',
            checkInput : function() { return (!isNaN(this.value) && this.value!=0); }
        }
    ],
        
    // menu defs 
    menus : {
        
        config_menu : {
            id : 'navtabs_config',          // id of the li container
            link_id : 'config_menu_link',   // id of the link 
            link_label : 'Post Settings',   // link text
            panel_id : 'config_menu',       // id of the menu panel
            panel_init : function() { return lfc.getConfigMenu(); }
        }

    },
    
    // video match/replace defs 
    video : {
    
        youtube : { 
            match : '^http://(?:(?:au|br|ca|cz|de|es|fr|hk|ie|il|in|it|jp|kr|m|mx|nl|nz|pl|ru|se|tw|uk|www)\\.)?youtube\\.com(?:[^\\"]*?)?(?:[&|&amp;|/|\\?|;|\\%3F|\\%2F])(?:video_id=|v(?:/|=|\\%3D|\\%2F))([0-9a-zA-Z-_]{11})',
            replace : "http://youtube.com/v/$1&amp;rel=0&amp;fs=1"
        }
        
    },

/**
 * Init this script
**/    
    init : function() {
        // if navbar links don't initialise we're on an intermediate landing page, nothing to do here 
        if (this.initNavbarLinks() == false) return;
        // parse links only if video or image display is enabled 
        if (this.settings.image_state || this.settings.video_state) {
            // parse links in thread posts 
            if (this.parseLinks()) {
                // we have links to process...
                if (this.settings.image_state)
                    this.parseImageLinks();
                if (this.settings.video_state)
                    this.parseVideoLinks();
            }
        }
        // publish the css queue 
        this.gm.applyStyles();
    },

/**
 * initialize nav links and panels 
**/
    initNavbarLinks : function()
    {
        this.navtabs = document.getElementById('navtabs');
        // if navtabs isn't present we're on an intermediate landing page, nothing to do here 
        if (!this.navtabs) return false;
        this.loadSettings();
        // the first ul in navtabs contains the list we're interested in 
        var list = this.navtabs.getElementsByTagName('ul')[0];
        // init the menu(s) ...
        for (var menu in this.menus) {
            // get a popup menu list item link using menu config 
            var item = this.vb.popUpMenu(this.menus[menu]);
            // load the panel for this menu
            var panel = this.menus[menu].panel_init.call();
            item.appendChild(panel);
            list.appendChild(item);
        }
        // menu(s) added, now capture the array of popup menu links
        var navlinks = list.getElementsByTagName('a');  
        if (navlinks) {
            for (var i=0;i<navlinks.length;i++) {
                if (this.util.hasClass(navlinks[i], 'popupctrl')) {
                    // fix for the inconsistent menu behaviour depending on click order 
                    if (!lfc.util.hasClass(navlinks[i], 'lfcforums'))
                        unsafeWindow.YAHOO.util.Event.removeListener(navlinks[i].id, "click");
                    navlinks[i].addEventListener('click', lfc.menuToggle, true);
                    this.navlinks.push(navlinks[i]);
                }
            }
        }
        // style the popupbody consistently (co-ordinates disappear when yui events aren't involved)
        lfc.gm.addStyle('.navtabs .popupbody { left: 0px; top: 23px; }');
        return true; 
    },

/**
 * show dropdown in hover state if any of the tabs are active
**/
    menuHover : function(e)
    {
        // note: no longer in lfc object scope here (var this = hovered element)
	    e = e || unsafeWindow.event;
	    var el = e.target || e.srcElement;	    
	    // if we're already hovering the active tab we're done 
        if (lfc.util.hasClass(el, 'active')) return false;
        var active = false;
        // see if any of the tabs are active
        if (lfc.navlinks) {
            for (var i=0;i<lfc.navlinks.length;i++) {
                if (lfc.util.hasClass(lfc.navlinks[i], 'active')) {
                    lfc.util.removeClass(lfc.navlinks[i], 'active');
                    document.removeEventListener('click', lfc.menuClose, true);
                    active = true;
                }            
                var panel = lfc.util.nextElement(lfc.navlinks[i]);
                if (panel)
                    panel.style.display = 'none';                
            }
        }
        // another tab was active, activate hovered tab 
	    if (active) {
            var panel = lfc.util.nextElement(el);
            panel.style.display = 'block';
            lfc.util.addClass(el, 'active');
            document.addEventListener('click', lfc.menuClose, true);
        }
        return false;
    },

/**
 * toggle a popup menu's visibility
**/
    menuToggle : function(e)
    {   
        // note: no longer in lfc object scope here (var this = clicked element)
	    e = e || unsafeWindow.event;
	    var el = e.target || e.srcElement,
            panel = lfc.util.nextElement(el);
        if (!panel) return;
        // toggle panel state 
        if (lfc.util.hasClass(el, 'active')) {
            panel.style.display = 'none';
            lfc.util.removeClass(el, 'active');
            document.removeEventListener('click', lfc.menuClose, true);
        } else { 
            panel.style.display = 'block';
            lfc.util.addClass(el, 'active');
            document.addEventListener('click', lfc.menuClose, true);
        }
        // add or remove mouseover listeners based on resulting toggled state 
        if (lfc.navlinks) {
            for (var i=0;i<lfc.navlinks.length;i++) {
                if (lfc.util.hasClass(el, 'active')) {
                    lfc.navlinks[i].addEventListener('mouseover', lfc.menuHover, false);
                } else {
                    lfc.navlinks[i].removeEventListener('mouseover', lfc.menuHover, false);
                }
            }
        }
        return false;
    },

/**
 * close menu when click occurs outside
**/
    menuClose : function(e)
    {
        // note: no longer in lfc object scope here (var this = clicked element)
	    e = e || unsafeWindow.event;
	    var el = e.target || e.srcElement,
            panel, link;
        // determine the active tab 
        if (lfc.navlinks) {
            for (var i=0;i<lfc.navlinks.length;i++) {
                if (lfc.util.hasClass(lfc.navlinks[i], 'active')) {
                    link = lfc.navlinks[i];
                    panel = lfc.util.nextElement(link);
                    break;
                }
            }
        }
	    do {
		    if (panel == el) // click was inside panel 
			    return false;
		    el = el.parentNode;
	    } while (panel && el);
	    // Click was outside the panel
        e.stopPropagation(); // stop this event bubbling up 
        // deactivate tab and hide menu 
        if (link)
            lfc.util.removeClass(link, 'active');
        if (panel)
	        panel.style.display = 'none';
	    document.removeEventListener('click', lfc.menuClose, true);
    },

/**
 * get config menu
**/
    getConfigMenu : function()
    {
        // create the panel containers 
        var panel = this.vb.popUpBody(this.menus['config_menu']),
            head = document.createElement('div'),
            body = document.createElement('div'),
            foot = document.createElement('div');

        // create the header 
        head.className = 'panel-head';
        head.id = 'config_menutitle';
        head.appendChild(document.createTextNode('Options'));

        if (this.inputs.length) {        
            // create the body 
            body.className = 'panel-body';
            // populate form inputs 
            for(var i=0;i<this.inputs.length;i++) {
                // create row for each input 
                var row = document.createElement('div');
                row.className = 'tablerow';
                // create left col (label container) 
                var leftcol = document.createElement('div');
                leftcol.className = 'leftcol';
                var label = document.createElement('label');
                label.htmlFor = this.inputs[i].id;
                label.title = this.inputs[i].title;
                label.appendChild(document.createTextNode(this.inputs[i].label));
                leftcol.appendChild(label);
                row.appendChild(leftcol); 
                // create right col (input container) 
                var rightcol = document.createElement('div');
                rightcol.className = 'rightcol';
                if (this.inputs[i].prefix) 
                    rightcol.appendChild(document.createTextNode(this.inputs[i].prefix));  
                var input = (this.inputs[i].type != 'select') ? 
                    document.createElement('input') : document.createElement('select');
                input.type = this.inputs[i].type;
                input.id = this.inputs[i].id;
                switch (this.inputs[i].type) {
                    case 'checkbox':
                        input.checked = this.settings[this.inputs[i].id];
                    break;
                    case 'text':
                        input.value = this.settings[this.inputs[i].id];
                        if (this.inputs[i].size)
                            input.size = this.inputs[i].size;
                    break;
                    case 'select':
                        if (this.inputs[i].options.length) {
                            for (var o=0;o<this.inputs[i].options.length; o++) {
                                opt = new Option(
                                    this.inputs[i].options[o].text,
                                    this.inputs[i].options[o].value,
                                    this.inputs[i].options[o].defaultSelected,
                                    this.inputs[i].options[o].selected
                                );
                                if (opt.value == this.settings[this.inputs[i].id])
                                    opt.selected = true;
                                input.add(opt);
                            }
                        }                        
                    break;                
                }
                rightcol.appendChild(input);
                if (this.inputs[i].postfix) 
                    rightcol.appendChild(document.createTextNode(this.inputs[i].postfix));          
                row.appendChild(rightcol);                
                body.appendChild(row);
            }

        }
        // create footer 
        foot.className = 'panel-foot';
        var button = document.createElement('input');
        button.type = 'button';
        button.className = 'button'; //using pre-existing style 
        button.value = 'Save';
        button.addEventListener('click', function() { lfc.saveSettings(); });
        foot.appendChild(button);

        // add containers to panel 
        panel.appendChild(head);
        panel.appendChild(body);
        panel.appendChild(foot);
        
        // style the panel elements 
        this.gm.addStyle('#config_menu .panel-head { padding: 2px 5px; border-top: 1px solid #B80000;  line-height: 26px; }');
        this.gm.addStyle('#config_menu .panel-body { display: table; width: 100%; }');
        // table layout for form using divs 
        this.gm.addStyle('#config_menu .tablerow { display: table-row; line-height: 26px; }');
        this.gm.addStyle('#config_menu .tablerow div { display: table-cell; padding: 2px 5px;  border-top: 1px solid #B80000; }');
        this.gm.addStyle('#config_menu .leftcol { width: 120px; }');
        this.gm.addStyle('#config_menu .rightcol { width: 80px; }');
        this.gm.addStyle('#config_menu .panel-foot { padding: 2px 5px; text-align: center;  border-top: 1px solid #B80000; }');
        // clear float on pre-existing .button style
        this.gm.addStyle('#config_menu .button { float: none; }');

        return panel;
    },

/**
 * Load stored config settings
**/
    loadSettings : function()
    {
        if (this.inputs.length) {
            for(var i=0;i<this.inputs.length;i++) {
                this.settings[this.inputs[i].id] = GM_getValue(this.inputs[i].id, this.settings[this.inputs[i].id]);
                var input = document.getElementById(this.inputs[i].id);
                if (input) {
                    switch (this.inputs[i].type) {
                        case 'checkbox':
                            input.checked = this.settings[this.inputs[i].id];
                        break;
                        case 'text':
                            input.value = this.settings[this.inputs[i].id];
                        break;
                        case 'select':
                            input.selectedIndex = this.settings[this.inputs[i].id];
                        break;
                    }
                }
            }
        }
        return true;
    },

/**
 * Save config settings
**/
    saveSettings : function()
    {
        var hspan = document.getElementById('config_menutitle');
        hspan.firstChild.data = 'Options - Saving...';
        if (this.inputs.length) {
            for(var i=0;i<this.inputs.length;i++) {
                var el = document.getElementById(this.inputs[i].id);
                if (!el) continue;
                switch (this.inputs[i].type) {
                    case 'checkbox':
                        GM_setValue(this.inputs[i].id, el.checked);
                    break;
                    case 'text':
                        var is_valid = (this.inputs[i].checkInput) ? this.inputs[i].checkInput.call(el) : true;
                        if (is_valid) 
                            GM_setValue(this.inputs[i].id, el.value);
                    break;
                    case 'select':
                        var idx = el.selectedIndex;
                        GM_setValue(this.inputs[i].id, el.options[idx].value);
                    break;
                }
            }
        }
        hspan.firstChild.data = 'Options - Saved!';
        this.loadSettings();
        this.parseImageLinks();
        this.parseVideoLinks();
        setTimeout(function() { hspan.firstChild.data = 'Options'; }, 3000);
    },

/**
 * Parse links in thread posts 
**/
    parseLinks : function()
    {
        var posts = document.getElementById('posts');
        if (!posts) return;
        var links = posts.getElementsByTagName('a');
        if (!links.length) return;
        // match image links 
        var img_re = new RegExp('\\.(jpg|jpeg|png|bmp|gif)$','i');

        for (var i=0;i<links.length;i++) {
            var url = links[i].getAttribute('href');
            if (!url) continue;
            if (img_re.test(url)) {
                links[i].title = links[i].firstChild.data
                this._images.push(links[i]);
            } else {
                for (var provider in this.video) {
                    var vid_re = new RegExp(this.video[provider].match);
                    if (vid_re.test(url)) {
                        links[i].watch = url.replace(vid_re, this.video[provider].replace);
                        this._videos.push(links[i]);
                    }
                }
                
            }
        }
        var found = (this._images.length > 0 || this._videos.length > 0);
        return found;      
    },

/**
 * Parse array of video links
**/
    parseVideoLinks : function()
    {
        if (!this._videos.length) return;
        // wait til swfobject is available before proceeding 
        if (!this.swf.isLoaded()) {
            setTimeout(function() { lfc.parseVideoLinks() }, 100);
        } else {
            var width = (!this.settings.video_width) ? 450 : this.settings.video_width,
                height = (!this.settings.video_height) ? 350 : this.settings.video_height,
                flashver = '9.0.0';
            for (var i=0;i<this._videos.length;i++) {
                var vid = '_video'+i;
                var div = document.getElementById(vid);
                if (!div && this.settings.video_state == true) {
                    div = document.createElement('div');
                    div.id = vid;
                    this._videos[i].title = this._videos[i].firstChild.data;
                    this._videos[i].firstChild.data = '';
                    this._videos[i].appendChild(div);
                    unsafeWindow.swfobject.embedSWF(this._videos[i].watch, vid, width, height, flashver);
                } else if (div) {
                    if (this.settings.video_state == false) {
                        // state changed, replace video with link 
                        this._videos[i].firstChild.data = this._videos[i].title;
                        div.parentNode.removeChild(div);
                    } else if (width != div.offsetWidth || height != div.offsetHeight) {
                        // width or height changed, redraw video 
                        unsafeWindow.swfobject.embedSWF(this._videos[i].watch, vid, width, height, flashver);
                    }
                }
            }
        }    
    },

/**
 * Parse array of image links
**/
    parseImageLinks : function()
    {        
        // if there are no images, we're done 
        if (!this._images.length) return;
        // keep track of processed images (so we can check limit and duplicity)
        var imgs = [];
        for (var i=0;i<this._images.length;i++) {
            // Display images isn't None, and either no limits or not at limit 
            var iid = '_image'+i,
                img = document.getElementById(iid);
            if ( this.settings.image_state != 0 && 
                (this.settings.image_limit == 0 || imgs.length < this.settings.image_limit) ) {
                var src = this._images[i].getAttribute('href');
                if (this.settings.image_state == 2) {
                    // Display Images set to All
                    imgs[imgs.length] = src;
                } else if (this.settings.image_state == 1) {
                    // Display Images set to Unique, skip if we've seen it
                    if (imgs.indexOf(src) >= 0) continue;
                    imgs[imgs.length] = src;
                }

                if (img) {
                    this.displayImage(img);
                    continue; 
                }
                // create the image to display instead of the link 
                img = new Image();
                img.onload = function() { lfc.displayImage(this); }; 
                img.src = src;
                img.id = iid;
                img.title = 'Click to view original image...';
                img.alt = src;
                img.style.display = 'none';
                img.style.margin = '0 0 1em 0';
                this._images[i].appendChild(img); 
            } else {
                if (img) {
                    img.parentNode.firstChild.data = img.parentNode.title;
                    img.parentNode.removeChild(img);
                }
            }    
        }
    },

/**
 * Image onload callback to handle resize/display after image is cached in browser
**/ 
    displayImage : function(img)
    {
        img.parentNode.firstChild.data='';
        if (this.settings.image_width && img.naturalWidth > this.settings.image_width) {
            var resized = img.cloneNode(true);
            resized.setAttribute('width', this.settings.image_width + 'px');
            resized.style.display = 'inline';
            img.parentNode.replaceChild(resized, img);
        } else {    
            img.style.display = 'inline';
        }      
    },

/**
 * Util functions
**/
    util : {
        prevElement : function(p)
        {
            do p = p.previousSibling;
            while (p && p.nodeType != 1);
            return p;        
        },
        nextElement : function(n)
        {
            do n = n.nextSibling;
            while (n && n.nodeType != 1);
            return n;
        },

        hasClass : function(el, cls)
        {
            return el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        },
        addClass : function(el, cls)
        {
            if (!this.hasClass(el, cls)) el.className += ' ' + cls;
        },
        removeClass : function(el, cls)
        {
            var class_re = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            el.className = el.className.replace(class_re,' ');
        }
    },

/**
 * SWFObject helpers
**/
    swf : {
        included : false,
        include : function()
        {
            if (this.included) return;
            this.included = true;
            if (this.isLoaded()) return;
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js';
            document.getElementsByTagName('head')[0].appendChild(script);
        },
        isLoaded : function()
        {   
            if (typeof unsafeWindow.swfobject != 'undefined') {
                this.included = true;
                return true;
            }
            if (!this.included)
                this.include();
            return false;
        }
    },

/**
 * GreaseMonkey Util Functions
**/
    gm : {

        _styles : [],
        
        addStyle : function(css)
        {
            if (this._styles.indexOf(css) < 0)
                this._styles.push(css);
        },
        applyStyles : function()
        {
            if (this._styles.length)
                GM_addStyle(this._styles.join(" "));
            this._styles = [];
        },
        clearFix : function()
        {
            this.addStyle('.clearfix:after { content: "."; display: block; height: 0; clear: both;visibility: hidden; }');
        }
    },

/**
 * vBulletin Util Functions
**/
    vb : {

        popUpMenu : function(config)
        {   
            // create the nav tab container  
            var li = document.createElement('li');
            if (typeof config.id != 'undefined')
                li.id = config.id;
            var link = document.createElement('a');
            link.appendChild(document.createTextNode(config.link_label));
            link.className = 'popupctrl lfcforums';
            if (typeof config.link_id != 'undefined')
                link.id = config.link_id;
            if (typeof config.link_class != 'undefined')
                lfc.util.addClass(link, config.link_class);
            li.appendChild(link);
            return li;
        },        
        popUpBody : function(config)
        {
            // create the panel container 
            var div = document.createElement('div');
            if (typeof config.panel_id != 'undefined')
                div.id = config.panel_id;
            div.className = 'popupbody panel-container';
            lfc.gm.addStyle('.navtabs .panel-container { color: #333333; background-color: #F4F4F4; border: 1px solid #B80000; width: 220px; z-index: 1000; }');
            return div;
        }
        
    }
};
lfc.init();