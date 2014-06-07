// ==UserScript==
// @name           LFCForums Users
// @namespace      http://forums.liverpoolfc.com/
// @description    Make user titles customisable on the Liverpool FC Official Forums.
// @include        http://forums.liverpoolfc.com/*
// ==/UserScript==
var lfcUsers = {
    
    userlinks : [], // array of links on current page (not unique) 

    // base64 encoded ratings images 
    rateOff : "data:image/gif;base64,R0lGODlhCwAMALMPAP7+/rrEuMnW28/Qt6GkeKeti6Oogautg7/Kw7u8mq+2ne7u5dDf7eXm2bKzjN3d3SH5BAEAAA8ALAAAAAALAAwAAAQ98MnH0LwyGHxNEtyDJI1yFSixAATqDkAsL0fxDIcMDAYoOatYgnHJJVQDi0RwMCAEHlOG4GMoCJMA8aKMAAA7",
    rateOn : "data:image/gif;base64,R0lGODlhCwAMAMQfAO6aEMbFwKd5M7ilhLOWZdHd6vjJWtyQFqx7LumWDp1uI6V0KJtpGr2CIa52HruulrR8I62GS6p/O8rX3cPArs2GGNWKFsrNzvKvMaZ6OMqMKvW6RfCkH62NWKx3It3d3SH5BAEAAB8ALAAAAAALAAwAAAVL4CeKz2iKhRKc4+AQrCgkwjQSCLI0myZIkstAcOAYDABAAtL5BDIVDPLgKIkCjSTAAmtZKoyswBSBRAoEz6KAYgxGFJXosjJNKJ8QADs=",

    init : function()
    {
        if (!this.refreshUserLinks()) return;
        // style the ratings 
        this.gm.addStyle('.username_container .user_rating { display: inline; margin-left: 10px; }');
        this.gm.addStyle('.username_container .user_rating a { display: inline-block; width: 11px; height: 12px; background-image: url(' + this.rateOff + '); background-repeat: no-repeat;  }');
        this.gm.addStyle('.username_container .user_rating a.on {  background-image: url(' + this.rateOn +'); }');
        this.gm.applyStyles();
    },

    refreshUserLinks : function(user_id)
    {
        if (!this.getUserLinks()) return;
        var links = this.userlinks;
        for (var i=0;i<links.length;i++) {    
            var id = links[i].getAttribute('user_id'),
                name = links[i].getAttribute('user_name'),
                span = links[i].parentNode.parentNode.getElementsByTagName('span')[0];
            if (!span) {
                // Fans, unlike Kopites, are in p tags for some reason :(
                span = links[i].parentNode.parentNode.getElementsByTagName('p')[0];
                if (!span) continue;
            }
            var title = this.util.trim(span.firstChild.data),
                user = this.getUser(id);
            if (user_id && id != user_id) continue;
            span.setAttribute('user_id', id);
            span.setAttribute('user_name', name);
            // store original title the first time we encounter it 
            if (!span.getAttribute('user_title'))
                span.setAttribute('user_title', title);
            span.title = 'Click to edit title for ' + name;
            span.addEventListener('click', lfcUsers.editUserTitle, true);
            var rating = 0; 
            if (user) {
                var update = false;
                // keep any user name changes in sync with stored object 
                if (user.name != name) {
                    user.name = name;
                    update = true;
                }
                // same for title change 
                if (user.title != span.getAttribute('user_title')) {
                    user.title = span.getAttribute('user_title');
                    update = true;
                }            
                // if something changed, update user 
                if (update)
                    this.setUser(id, user);
                // use custom title if we have one
                if (user.alt_title && user.alt_title != user.title)
                    span.firstChild.data = user.alt_title;
                if (user.rating != 'undefined')
                    rating = user.rating;
            } else {
                 if (title != span.getAttribute('user_title')) {
                    // custom title was reset, restore original 
                    span.firstChild.data = span.getAttribute('user_title');
                 }
            }
            var ratings = this.util.prevElement(span);
            if (!ratings || !this.util.hasClass(ratings, 'user_rating')) {
                ratings = document.createElement('div');
                ratings.className = 'user_rating';
                span.parentNode.insertBefore(ratings, span);
            }
            var rates = ratings.getElementsByTagName('a');
            for (var r=0;r<5;r++) {
                var rate = rates[r];
                if (!rate) {
                    rate = document.createElement('a');
                    rate.addEventListener('mouseover', lfcUsers.rateOver, false);
                    rate.addEventListener('mouseout', lfcUsers.rateOut, false);
                    rate.addEventListener('click', lfcUsers.rateUser, true);
                    ratings.appendChild(rate); 
                }
                if (r < rating) 
                    rate.className = 'on';
            }            
        }

        return true;   
    },

    rateUser : function(e)
    {
	    var el = e.target || e.srcElement,
	        rates = el.parentNode.getElementsByTagName('a'),
	        span = lfcUsers.util.nextElement(el.parentNode),
	        id = span.getAttribute('user_id'),
	        user = lfcUsers.getUser(id);
	    if (!user) {
	        user = lfcUsers.createUser(id, span.getAttribute('user_name'), span.getAttribute('user_title'));
	    }
	    for (var i=0; i<rates.length; i++) {
	        if (el == rates[i])
	            user.rating = i+1;
	    }
	    lfcUsers.setUser(id, user);
	    lfcUsers.refreshUserLinks(id);  
	    return false; 	        
    },

    rateOver : function(e)
    {
	    e = e || unsafeWindow.event;
	    var el = e.target || e.srcElement,
	        rates = el.parentNode.getElementsByTagName('a'),
	        active = true;	    
	    for (var i=0; i<rates.length; i++) {
	        if (active) {
	            lfcUsers.util.addClass(rates[i], 'on');
	        } else {
	            lfcUsers.util.removeClass(rates[i], 'on');
	        }
	        if (el == rates[i])
	            active = false;
	    }           
    },

    rateOut : function(e)
    {
	    var el = e.target || e.srcElement,
	        rates = el.parentNode.getElementsByTagName('a'),
	        span = lfcUsers.util.nextElement(el.parentNode),
	        user = lfcUsers.getUser(span.getAttribute('user_id'));
	    for (var i=0; i<rates.length; i++) {
            if (user && user.rating && i<user.rating) {
	            lfcUsers.util.addClass(rates[i], 'on');
	        } else {
	            lfcUsers.util.removeClass(rates[i], 'on');
	        }
	    } 	    	        
    },

    getUserLinks : function()
    {
        if (this.userlinks.length) return true;
        var posts = document.getElementById('posts');
        if (!posts) return;
        var links = posts.getElementsByTagName('a');
        if (!links.length) return;
        // match poster links members/(id)-(name) - @todo check permitted name characters 
        var user_re = new RegExp('^members/(\\d+)-(\\w+)$');     
        for (var i=0;i<links.length;i++) {
            if (!this.util.hasClass(links[i], 'username')) continue;
            var url = links[i].getAttribute('href');
            if (!url) continue;
            if (user_re.test(url)) {
                var match = user_re.exec(url);
                links[i].setAttribute('user_id', parseInt(match[1]));
                links[i].setAttribute('user_name', match[2]);
                this.userlinks.push(links[i]);
            }
        }
        return this.userlinks.length;
    },
    
    createUser : function(id, name, title)
    {
        var user = {};
        user.id = id;
        user.name = name;
        user.title = title;
        user.alt_title = '';
        user.rating = 0;
        user.notes = '';
        return user;
    },

    getUser : function(id)
    {
        return this.ls.getObject(id);
    },
    
    setUser : function(id, user)
    {
        return this.ls.setObject(id, user);
    },

    deleteUser : function(id)
    {
        return this.ls.removeObject(id);
    },

    editUserTitle : function(e)
    {
	    e = e || unsafeWindow.event;
	    var el = e.target || e.srcElement,
	        id = el.getAttribute('user_id'),
            input = document.createElement('input');
        input.type = 'text';
        input.value = ''; // set inital value empty (workaround for caret at beginning of text)
        input.id = 'edit_active';
        el.appendChild(input);
        el.removeEventListener('click', lfcUsers.editUserTitle, true);
        document.addEventListener('click', lfcUsers.saveUserTitle, true);
        input.focus(); // focus first, but only after attaching to parent
        input.value = lfcUsers.util.trim(el.firstChild.data); // set actual value, forces caret to end of text
        el.firstChild.data = '';         
    },
    
    saveUserTitle : function(e)
    {
	    e = e || unsafeWindow.event;
	    var el = e.target || e.srcElement,
	        edit = document.getElementById('edit_active');
	    if (edit) {
    	    do {
	    	    if (edit == el) {
	    	        // click was inside input 
	    		    return false;
	    	    }
	    	    el = el.parentNode;
	        } while (el);
	        // click outside input
	        var id = edit.parentNode.getAttribute('user_id'),
	            user = lfcUsers.getUser(id),
	            name = edit.parentNode.getAttribute('user_name'),
	            title = edit.parentNode.getAttribute('user_title'),
	            alt_title = lfcUsers.util.trim(edit.value),
	            update = false;
	        // see if the title changed 
            if (alt_title == '' || alt_title == title) {
                // title empty or original, reset if necessary 
                if (user) {
                    // user has been customised before 
                    if (!user.rating) {
                        // no other customisations, no need to store
                        lfcUsers.deleteUser(id);
                    } else {
                        // store updated title
                        user.alt_title = '';
                        update = true;
                    }
                } else { /*not stored anyway, nothing to do here*/ }
            } else {
                // custom title, create user if we haven't got one already 
                if (!user)
                    user = lfcUsers.createUser(id, name, title);
                // update if title changed  
                if (user.alt_title != alt_title) {
                    user.alt_title = alt_title;
                    update = true;
                }
            }
            // store the user customisation if necessary
            if (update && user)
                lfcUsers.setUser(id, user);
            // if title was reset, show original 
            if (alt_title == '')
                alt_title = title;  
            
	        edit.parentNode.firstChild.data = alt_title;
	        edit.parentNode.addEventListener('click', lfcUsers.editUserTitle, true);
	        edit.parentNode.removeChild(edit);
	        lfcUsers.refreshUserLinks(id);
	    }
        document.removeEventListener('click', lfcUsers.saveUserTitle, true);
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

        trim : function(str)
        {
            return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
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
 * localStorage wrapper properties and methods
**/
    ls : {
        store : unsafeWindow.localStorage,
        
        setObject : function(key, value)
        {
            this.store.setItem(key, JSON.stringify(value));
        },
        
        getObject : function(key)
        {
            var value = this.store.getItem(key);
            return value && JSON.parse(value);
        },
        removeObject : function(key)
        {
            this.store.removeItem(key);
        },
        clearAll : function()
        {
            this.store.clear();
        },
        getStoreSize : function()
        {
            var size = 0;
            for (var i=0; i<this.store.length; i++)
                size += this.store[i].length;
            return size;
        }
    }
};
lfcUsers.init();