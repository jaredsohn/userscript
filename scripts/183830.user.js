// ==UserScript==
// @name        Wikipedia TOC Enhanced
// @author      teamrc
// @namespace   https://github.com/teamrc/wikitoc
// @homepage    http://teamrc.github.io/wikitoc/
// @license     GNU GPL version 3.0
// @description Table of Contents Enhancer for Wikipedia
// @require     http://code.jquery.com/jquery-1.3.2.min.js
// @include     *wikipedia.org/*
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1
// @compatible  Greasemonkey
// ==/UserScript==


/** Wiki TOC Enhancer - Users' Guide
    This is a Greasemonkey user script that enhances the TOC(Table of Content) on wikipedia.org.
    It moves the TOC to the left hand side panel, and highlights the current section that the reader is on.
    It also retains the ability for the user to jump to different sections on the TOC by clicking on the links.
*/


console.log("wikitoc script start");


var db = 
{
    /** 
        DB is an API to store/retrieve wikitoc values using greasemonkey's GM_setValue/GM_getValue functions
        Saves variables serialised, into a single variable named wikitoc
        
        Saved values include:
        1) whether user has enabled wikitoc to run
        2) whether TOC should be on LHS (for this current site)
        3) the width of TOC when TOC is on the LHS (for this current site)
        
    */
    
    get_wikitoc_status:function()
    {
        /** returns the status of whether user has enabled wikitoc to run.
            returns true/false/null. 
            null will be returned of there are not previous saved values
        */
        console.log("set_wikitoc_status");
        var gm_values = db.gm_deserialize();
        console.log(gm_values);
        
        if (gm_values.hasOwnProperty("is_wikitoc_enabled"))
        {
            //has wikitoc running status
            return gm_values.is_wikitoc_enabled;
        } else
        {
            //there is no wikitoc running status
            return null;
        }
    },
    
    set_wikitoc_status:function(is_wikitoc_enabled)
    {
        /** set true if user specifies wikitoc to be enabled
            false otherwise
        */
        var gm_values = db.gm_deserialize();
        //console.log("try to set wikitoc value");
        gm_values.is_wikitoc_enabled = is_wikitoc_enabled;
        
        console.log("try to set wikitoc value");
        console.log(gm_values);
        db.gm_serialize(gm_values);
        //console.log("try to set wikitoc value");
    },
    
    get_wikitoc_on_lhs:function()
    {
        var gm_values = db.gm_deserialize();
        var hostname = window.location.host;
        if ( ! gm_values.hasOwnProperty(hostname))
        {
            return null;
        }
        else if (! gm_values[hostname].hasOwnProperty("is_wikitoc_on_lhs"))
        {
            return null;
        }
        else
        {
            return gm_values[hostname]["is_wikitoc_on_lhs"];
        }
        
        return null;
    },
    
    set_wikitoc_on_lhs:function(is_toc_on_lhs)
    {
        /** set true if user specifies wikitoc to be on the LHS
            false otherwise (i.e. TOC is to be on the original RHS content section)
        */
        
        var gm_values = db.gm_deserialize();
        var hostname = window.location.host;
        if ( ! gm_values.hasOwnProperty(hostname))
        {
            console.log("initialise gm_values[" + hostname + "]");
            gm_values[hostname] = {};
        }
        gm_values[hostname]["is_wikitoc_on_lhs"] = is_toc_on_lhs;
        
        console.log(gm_values);
        db.gm_serialize(gm_values);
        
    },
    
    get_wikitoc_margin_position:function()
    {
        var gm_values = db.gm_deserialize();
        var hostname = window.location.host;
        if ( ! gm_values.hasOwnProperty(hostname))
        {
            return null;
        }
        else if (! gm_values[hostname].hasOwnProperty("wikitoc_margin_position"))
        {
            return null;
        }
        else
        {
            console.log("\t\tdb.restoring margin_position:" + gm_values[hostname]["wikitoc_margin_position"]);
            return gm_values[hostname]["wikitoc_margin_position"];
        }
        
        return null;
    },
    
    set_wikitoc_margin_position:function(wikitoc_margin)
    {
        //wikitoc_margin is the value of the margin of the TOC on LHS in pixels
        
        var gm_values = db.gm_deserialize();
        var hostname = window.location.host;
        if ( ! gm_values.hasOwnProperty(hostname))
        {
            console.log("initialise gm_values[" + hostname + "]");
            gm_values[hostname] = {};
        }
        
        gm_values[hostname]["wikitoc_margin_position"] = wikitoc_margin;
        
        console.log("\t\tdb.saving margin_position:" + gm_values[hostname]["wikitoc_margin_position"]);
        db.gm_serialize(gm_values);
    },
    
    
    gm_deserialize:function(def) {
        /*  Used to store and retrieve multiple values (typically as a serialized hash) in a single GM_getValue slot. 
        
            e.g.
            var values = {a: 1, b: 2, c: 3};
            gm_serialize(values);
            var _settings = gm_deserialize();
        */
        var gm_store_name = "wikitoc";
        return eval(GM_getValue(gm_store_name, (def || '({})')));
    },

    gm_serialize:function(val) {
        /*  Used to store and retrieve multiple values (typically as a serialized hash) in a single GM_getValue slot. 
        
            e.g.
            var values = {a: 1, b: 2, c: 3};
            gm_serialize(values);
            var _settings = gm_deserialize();
        */
        var gm_store_name = "wikitoc";
        GM_setValue(gm_store_name, uneval(val));
    },
};


var util = 
{
    
    debug:function(debug_string)
    {
        var debugging = true;
        
        if (debugging)
        {
            console.log("DEBUG " + window.location.host + ": " + debug_string);
        }
    },

    pixels_to_int:function(a)
    {
        var pixels = parseInt(a);
        
        if ( pixels >= 0)
        {
            return pixels;
        } else 
        {
            util.debug("Invalid pixel value here: " + a);
            return null;
        }
    },
    
    pixels_addition:function(a, b)
    {
        var pixels_a = util.pixels_to_int(a);
        var pixels_b = util.pixels_to_int(b);
        
        return pixels_a + pixels_b;
    },
    
    pixels_subtraction:function(a, b)
    {
        var pixels_a = util.pixels_to_int(a);
        var pixels_b = util.pixels_to_int(b);
        
        return pixels_a - pixels_b;
    },
    
    
};

util.debug("wiki_toc init()");




var wiki_toc=
{
    varname: "macintosh",
    
    init:function(o)
    {
        // process TOC chapter listing
        // then save TOC CSS settings
        // then save frame CSS settings
        // then add buttons to TOC
        // then run toc_toggle_left()
        // then adds the scroll event
        
        db.set_wikitoc_status(true);
        
        if (db.get_wikitoc_status() == true) 
        {
            util.debug("Initialising wiki_toc()...1");
            this.init_html_buttons(o);
            util.debug("Initialising wiki_toc()...2");
            this.init_save_positions(o);
            util.debug("Initialising wiki_toc()...3");
            this.init_toc_chapter_listing(o);
            util.debug("Initialising wiki_toc()...4");
            this.init_events(o);
            util.debug("Initialising wiki_toc()...5");
            //this.init_saved_values(o);
            util.debug("Initialising wiki_toc()...6");
            
            if (db.get_wikitoc_on_lhs() == null)
            {
                //initialise wikitoc on lhs for new sites to be LHS
                db.set_wikitoc_on_lhs(true);
            }
            
            if (db.get_wikitoc_on_lhs() == true)
            {
                this.toc_toggle_left(o);
            }
            util.debug("DEBUG:Done with initialising wiki_toc");
        } else {
            util.debug("DEBUG:wiki_toc is not running");
        }
        
    },
    
    
    
    
    init_events:function(o)
    {
        this.addevt(window,'scroll','scroll',o);
        this.scroll(o);
        
        util.debug("DEBUG:3");
        var toctoggle = document.getElementById("toctoggle");
        this.addevt(toctoggle,'click','toc_toggle',o);
        
        var tocresizeleft = document.getElementById("tocresizeleft");
        this.addevt(tocresizeleft,'click','frame_move_left',o);
        
        var tocresizeright = document.getElementById("tocresizeright");
        this.addevt(tocresizeright,'click','frame_move_right',o);
    },
    
    init_save_positions:function(o)
    {
        //save original toc settings
        o.toc_original = {};
        o.toc_original["height"] = $("#toc").css("height");
        o.toc_original["width"] = $("#toc").css("width");
        o.toc_original["overflow"] = $("#toc").css("overflow");
        o.toc_original["border"] = $("#toc").css("border");
        o.toc_original["position"] = $("#toc").css("position");
        o.toc_original["left"] = $("#toc").css("left");
        o.toc_original["top"] = $("#toc").css("top");
        
        //save LHS frame settings
        o.frame_left_navigation = $("#left-navigation").css('margin-left');
        o.frame_content = $("#content").css('margin-left');
        
        
    },
    

    init_html_buttons:function(o)
    {
        /** add html control buttons to TOC
        */
        
        // find <div id="toctitle"
        // then create the buttons
        // then add the created buttons to the HTML page.
        
        
        var toctitle = document.getElementById('toctitle');
        
        //Main toc toggle button
        var toctoggle = document.createElement('a');
        toctoggle.setAttribute("id", "toctoggle");
        toctoggle.setAttribute("title", "Click here to toggle TOC between Left Hand or Right Hand panel");
        var toctoggle_img = document.createElement('img');
        toctoggle_img.setAttribute("width", "13");
        toctoggle_img.setAttribute("height", "13");
        toctoggle_img.setAttribute("srcset", "13");
        toctoggle_img.setAttribute("src", "http://openiconlibrary.sourceforge.net/gallery2/open_icon_library-full/icons/png/64x64/actions/draw-text-2.png");
        toctoggle_img.setAttribute("alt", "toggle_toc");
        toctoggle.appendChild(toctoggle_img);
        
        //left resize button
        var tocresizeleft = document.createElement('a');
        tocresizeleft.setAttribute("id", "tocresizeleft");
        tocresizeleft.setAttribute("title", "Reduce size of TOC");
        tocresizeleft.innerHTML = "<<";
        
        //right resize button
        var tocresizeright = document.createElement('a');
        tocresizeright.setAttribute("id", "tocresizeright");
        tocresizeright.setAttribute("title", "Increase size of TOC");
        tocresizeright.innerHTML = ">>";
        
        
        //Now add all the created elements into the HTML document
        toctitle.appendChild(tocresizeleft);
        toctitle.appendChild(toctoggle);
        toctitle.appendChild(tocresizeright);
    },
    
    init_toc_chapter_listing:function(o)
    {
        var div_list=document.getElementsByClassName('mw-headline');
        var content_listing = [];
        var chapters_listing = [];
        var cloned_node;
        var i = 0;
        for (i=0; i<div_list.length; i++)
        {
            //util.debug(div_list[i].outerHTML);
            content_listing.push(div_list[i]);
        }
        
        for (i=0; i<content_listing.length; i++)
        {
            cloned_node = content_listing[i].cloneNode(true);
            //obj.appendChild(cloned_node);
            var anchor_class = content_listing[i].className;
            var active_class = "";
            
            chapters_listing[i]=[
                content_listing[i],
                cloned_node,
                anchor_class,
                anchor_class+' '+active_class,
                100 //scrollspeed
            ];
            
            //util.debug("adding: " + content_listing[i].outerHTML );
        }
        
        o.chapters_listing = chapters_listing;
        
        for (i=0; i<chapters_listing.length; i++)
        {
            //util.debug("verifying: " + chapters_listing[i][1].outerHTML);
            var j = 0;
        }
    },
    
    toc_toggle:function(o)
    {
        util.debug("toc_toggle()");
        if (db.get_wikitoc_on_lhs() == true)
        {
            util.debug("going to move TOC to right");
            this.toc_toggle_right(o);
            
        } else 
        {
            util.debug("going to move TOC to left");
            this.toc_toggle_left(o);
        }
    },
        
    toc_toggle_left:function(o)
    {
        /**toggle TOC to LHS
        */
        
        var toc_height = window.innerHeight.toString() + "px";
        //var toc_width = $("#content").offsetLeft + "px";
        //var toc_width =  $("#mw-head-base").css('margin-left');
        var toc_width = db.get_wikitoc_margin_position(); 
        if (toc_width == null)
        {
            toc_width = $("#toc").css('width');
        }
        
        util.debug("toc_toggle_left() toc_height:" + toc_height + " toc_width:" + toc_width);
     
        //$("#toc").css({"z-index": "9999", height: toc_height, width: toc_width, overflow: 'auto', border: '1px solid black', position: 'fixed', left:'2px', top: '0px' });
        $("#toc").css({"z-index": "1", height: toc_height, width: toc_width, overflow: 'auto', position: 'fixed', left:'2px', top: '0px' });
        $("#toc").css("display", "block");
        
        //var css_link = document.createElement("link");
        //css_link.setAttribute("rel", "stylesheet");
        //css_link.setAttribute("href", "https://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css");
        //document.head.appendChild(css_link);
        
        //$("#toc").attr("class", "toc ui-widget-content ui-resizable");
        //$('#toc').resizable("enable")
        
        
        db.set_wikitoc_on_lhs(true);
        
        
        
        
        //resize the main content section on RHS on fit the size of the TOC on LHS
        util.debug("\t\tTOC margin" + toc_width);
        util.debug("\t\tleft-nav left margin:" + $("#left-navigation").css('margin-left'));
        util.debug("\t\tcontent left margin:" + $("#content").css('margin-left'));
        //$("#left-navigation").css('margin-left', toc_width);
        //$("#content").css('margin-left', toc_width);
        
        toc_width = util.pixels_to_int(toc_width); //strip away "px", convert to int
        var margin_left = util.pixels_to_int($("#left-navigation").css('margin-left'));
        if (toc_width > margin_left)
        {
            $("#left-navigation").css('margin-left', toc_width);
            $("#content").css('margin-left',  toc_width);
        }
    },
    
    
    toc_toggle_right:function(o)
    {
        /* move TOC to LHS
        uses original toc values from o.toc_original dictionary.
        */
        
        $("#toc").css({"z-index": "9999", height: o.toc_original["height"], width: o.toc_original["width"], overflow: o.toc_original["overflow"],
                       border: o.toc_original["border"], position: o.toc_original["position"], left:o.toc_original["left"], top: o.toc_original["top"] });
        this.frame_restore(o);
        
        db.set_wikitoc_on_lhs(false);
    },
    
    frame_restore:function(o)
    {
        $("#left-navigation").css('margin-left', o.frame_left_navigation);
        $("#content").css('margin-left',  o.frame_content);
    },
    
    frame_move_left:function(o)
    {
        var pixels_to_move = 30;
        var margin_left;
        
        if (db.get_wikitoc_on_lhs())
        {
            margin_left = parseInt($("#left-navigation").css('margin-left'));
            margin_left -= pixels_to_move;
            
            if (margin_left  > 10)  //hardcoded
            {		
                margin_left = parseInt($("#left-navigation").css('margin-left'));
                margin_left -= pixels_to_move;
                margin_left += "px";
                $("#left-navigation").css('margin-left', margin_left);
                
                margin_left = parseInt($("#content").css('margin-left'));
                margin_left -= pixels_to_move;
                margin_left += "px";
                $("#content").css('margin-left',  margin_left);
                
                var toc_width = parseInt($("#toc").css('width'));
                toc_width -= pixels_to_move;
                toc_width += "px";
                $("#toc").css('width',  toc_width);
                db.set_wikitoc_margin_position(toc_width); 
                
            }
        }
    },
    
    frame_move_right:function(o)
    {
        var pixels_to_move = 30;
        var margin_left;
        
        if (db.get_wikitoc_on_lhs())
        {
            margin_left = parseInt($("#left-navigation").css('margin-left'));
            margin_left += pixels_to_move;
            margin_left += "px";
            $("#left-navigation").css('margin-left', margin_left);
            
            margin_left = parseInt($("#content").css('margin-left'));
            margin_left += pixels_to_move;
            margin_left += "px";
            $("#content").css('margin-left',  margin_left);
            
            var toc_width = parseInt($("#toc").css('width'));
            toc_width += pixels_to_move;
            toc_width += "px";
            $("#toc").css('width',  toc_width);
            db.set_wikitoc_margin_position(toc_width); 
        }
        
    },
    
    scroll:function(o)
    {
        /** event that gets called when user scrolls.
            Hightlights current chapter in the TOC
        */
        
        var nu = 0;
        for (nu=0,i=0; i<o.chapters_listing.length; i++){
            o.chapters_listing[i][1].className=o.chapters_listing[i][2];
            //(this.pos(o.chapters_listing[i][0])[1]-this.wwhs()[3]-this.wwhs()[1]/2)<0?nu=i:null;
            (this.pos(o.chapters_listing[i][0])[1]-this.wwhs()[3]-this.wwhs()[1]/100)<0?nu=i:null;
            
        }
        if (nu !== null) {
            util.debug("hit paydirt: chapter is " + o.chapters_listing[nu][0].outerHTML);
            o.chapters_listing[nu][1].className=o.chapters_listing[nu][3];
            
            var current_section = o.chapters_listing[nu][0].getAttribute("id");
            this.update_toc(o, current_section);
        }
    },
    
    update_toc:function(o, current_section)
    {
        /**given the name of the current_section, update the toc (table of contents) to highlight this section, and also unhighlight any other highlighted sections
        */
        
        var toc_table = document.getElementById("toc");
        var toc_table_ul = toc_table.lastElementChild;
        
        //Given the <ul> of the TOC, find each <a href> and look for current_section
        var anchor_links = toc_table_ul.getElementsByTagName("a");
        for (var index in anchor_links) 
        {
            try 
            {
                var section_tmp = anchor_links[index].getAttribute("href");
                section_tmp = section_tmp.substring(1); //strip away leading # from a href
                if (section_tmp == current_section)
                {
                    //Found the right section, now <bold> the text of this section
                    
                    var new_element = document.createElement("B");
                    new_element.textContent = anchor_links[index].lastChild.textContent;
                    anchor_links[index].lastChild.textContent = "";
                    anchor_links[index].lastChild.appendChild(new_element);
                    
                } else 
                {
                    //Not the  right section, remove any <bold> this section
                    
                    var section_name = anchor_links[index].lastChild.lastChild.textContent;
                    anchor_links[index].lastChild.removeChild(anchor_links[index].lastChild.lastChild);
                    anchor_links[index].lastChild.textContent = section_name;
                }
            } catch (err)
            {
                //util.debug("well, you can't quite handle " + anchor_links[index].innerHTML + " " + err);
            }
        }
    },
    
    wwhs:function()
    {
        /** returns:
                clientWidth
                clientHeight
                scrollLeft
                scrollTop
        */
        if (window.innerHeight) 
            return [window.innerWidth-10,window.innerHeight-10,window.pageXOffset,window.pageYOffset];
        else if (document.documentElement.clientHeight) 
            return [document.documentElement.clientWidth-10,document.documentElement.clientHeight-10,document.documentElement.scrollLeft,document.documentElement.scrollTop];
            
            return [document.body.clientWidth,document.body.clientHeight,document.body.scrollLeft,document.body.scrollTop];
    },
    
    
    addevt:function(o,event_name,function_name,p)
    {
        /*
            Docs for EventTarget.addEventListener:
                target.addEventListener(type, listener[, useCapture]);
                target.addEventListener(type, listener[, useCapture, wantsUntrusted Non-standard]); // Gecko/Mozilla only
            
                    type A string representing the event type to listen for.
                    listener The object that receives a notification when an event of the specified type occurs. This must be an object implementing the EventListener interface, or simply a JavaScript function.
        */
        var oop=this;
        if (o.addEventListener){
            o.addEventListener(event_name,function(e){ return oop[function_name](p,e);}, false);
            //util.debug("adding event listener:" + event_name + " function_name:" + function_name + " p:" + p);
        }
        else if (o.attachEvent){
            o.attachEvent('on'+event_name,function(e){ return oop[function_name](p,e); });
            //util.debug("adding attach event :" + event_name + " function_name:" + function_name + " p:" + p);
        }
            },
    
    pos:function(obj)
    {
        var rtn=[0,0];
        while(obj)
        {
            rtn[0]+=obj.offsetLeft;
            rtn[1]+=obj.offsetTop;
            obj=obj.offsetParent;
        }
        return rtn;
    }
    
};

util.debug("calling wiki_toc.init({})");
wiki_toc.init({});

util.debug("wiki_toc.init({}) exit");

/*
function deserialize(name, def) {
  return eval(GM_getValue(name, (def || '({})')));
}

function serialize(name, val) {
  GM_setValue(name, uneval(val));
}
*/
