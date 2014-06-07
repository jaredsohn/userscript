/* 

Lickr -- replace Flickr's Flash interface for photos with similar
         browser-based interface, plus other enhancements.
         
version: 0.25 
$Id: lickr.user.js,v 1.32 2005/05/08 08:03:29 brevity Exp $

Copyright (c) 2005, Neil Kandalgaonkar
Released under the BSD license
http://www.opensource.org/licenses/bsd-license.php

--------------------------------------------------------------------------

This is a Greasemonkey user script, intended for use with Firefox 1.0.2 or 
later. It may work with other versions of Firefox or Mozilla.

To use this software, you must first install the Greasemonkey extension: 

  http://greasemonkey.mozdev.org/
  
Then restart Firefox and open this script in the browser. Select the 
Firefox menu item "Tools : Install User Script". Accept the default 
configuration and install.

To uninstall, go to the menu item Tools : Manage User Scripts, select 
"Lickr", and click Uninstall.

*/

// ==UserScript==
// @name      Lickr
// @namespace   http://brevity.org/greasemonkey
// @description   non-Flash interface for Flickr photo pages, plus other enhancements.
// @include     http://www.flickr.com/photos/*
// @include     http://flickr.com/photos/*
// ==/UserScript==


// XXX todo

// why does the main photo 'flash' on some note operations? it isn't being reloaded.
// thumbnail notes go to max width, when any text included. why?

// like to have:
// proper 'star' image for faves... cannot rely on asterisk height x-platform.

(function() {
    

    //------------------------------------------------------------------------
    // constants
    // http status constants
    var OK = 200
    
    // xmlhttprequest readystate
    var COMPLETE = 4

    // dom
    // nodeType
    var TEXT_NODE = 3  
    
    // misc
    var API_KEY = 'de468b48e226d3e788d6e7d426412aba';
    // var DEBUG = true;
    
    // magic numbers: the flash file is larger than the img size by this much, due to 
    // toolbar and border
    var ps_w_flash_extra = 2
    var ps_h_flash_extra = 28

    // minimum width of flash file, due to toolbar. 
    // If flash file is this size, the width of the image cannot be determined
    var ps_w_flash_min = 362 
     
  
    //-------------------------------------------------------------------------
    // utility functions

    function xpath_single_node(context_node, xpath) {
        return  document.evaluate( 
                     xpath + '[1]',                              
                     context_node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
                ).singleNodeValue;
    }
   
    
    // ultimately stolen from http://persistent.info/greasemonkey/gmail.user.js
    function getObjectMethodClosure(object, method) {
        return function() {
            return object[method](); 
        }
    }

    function getObjectMethodClosure1(object, method) {
        return function(arg) {
            return object[method](arg); 
        }
    }

    // Shorthand
    var elm = getObjectMethodClosure1(document, "createElement");
    var txt = getObjectMethodClosure1(document, "createTextNode");
    
    function css( el, s ) {
        for (var attr in s) {
            el.style[attr] = s[attr];
        }
    }  

    
    // flickr api 
     
    function do_req( method, proc_request, url, referer, data ) {
        var req = new XMLHttpRequest();
        // alert(url);
        req.onreadystatechange = function() { proc_request(req) };
        req.open(method, url );

        if (referer != null) {
            req.setRequestHeader( 'Referer', referer );
        }
        
        if (data != null) {
            req.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
            req.send(data);
        } else {
            req.send('');
        }
        
    }

    // space out requests in time, instead of spamming
    //var request_interval = 300;
    //var max_request_time = 0;
    //function queue(fn, arg) {
    //  var d = new Date()
    //  var now = d.getMilliseconds;
    //  if (max_request_time <= now) {
    //      max_request_time = now
    //      fn(arg)
    //  } else {
    //      max_request_time += request_interval;
    //      setTimeout( function() { fn(arg); }, max_request_time - now );
    //  }
    //}


    function procException(msg, req) {
        this.msg = msg
        this.req = req
    }
    
    
    // a proc just spins around waiting for the thing to succeed or fail
    // then calls a callback, if we got 200 OK message.
    function make_proc(op_name, ok_cb) {

        return function(req) { 
            
            try {
                // init progress
                document.body.style.cursor = 'progress';
                
                if (req.readyState != COMPLETE) {
                    return;
                }
                
                // if (alert_response) { alert(req.responseText); }
                 
                if( req.status != OK ) {
                    throw new procException( op_name + " request status was '" + req.status + "'", req )
                }

                ok_cb(req);
                
            } catch(e) {
                
                // clean up progress
                document.body.style.cursor = 'default';
                
                if (e instanceof procException) {
                    alert( e.msg );
                    if (DEBUG) {
                        alert(e.req.responseText);
                    }
                } else {
                    throw(e);
                }
            }

            // clean up progress

            document.body.style.cursor = 'default';
        }
    }


    // this is wraps the spinning proc like above,
    // except it parses the flickr api response a little before deciding all is well,
    // and passing control to the all-is-well callback
    function make_flickr_api_proc(op_name, ok_cb) {

        function parse_and_ok_cb(req) {
            var rsp = req.responseXML.getElementsByTagName('rsp').item(0);
            if (rsp == null) {
                throw new procException( "Could not understand Flickr's response.", req );
            }
            
            var stat = rsp.getAttribute("stat");
            if (stat == null) {
                throw new procException( "Could not find status of Flickr request", req);
            }
  
            if (stat != 'ok') {
                if (stat == 'fail') {
                    var err_node = rsp.getElementsByTagName('err').item(0);
                    var err_msg = err_node.getAttribute("msg");
                    throw new procException( err_msg, req );
                } else {
                    throw new procException("Unknown error status: '" + stat + "'", req)
                }
            }

            ok_cb(req, rsp);
        }

        return make_proc(op_name, parse_and_ok_cb);
    }
    
    
    // construct a flickr api request, with method and args, 
    // if that worked, call callback with request object.
    function flickr_api_call( method, args, ok_cb ) {
        
         var url = '/services/rest/?api_key=' + API_KEY;
         url += '&method=' + encodeURIComponent(method);
         
         for (var key in args) {
             url += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(args[key])
         }
         
         var proc = make_flickr_api_proc( method, ok_cb )
         
         do_req('GET', proc, url, null, null)
    }



    // --------------------------------------------------------------------------
    // and now, we begin

    var swf_td     = xpath_single_node(document, "//td[@class='photoswftd']");
    if (swf_td == null) { return; }

    
    var photo_div;
    var photo_img;
    
    // Flickr's writeSwfOrImg() will, depending on Flash detection, insert Flash object or a photo.
    // it would be nice if we could stop writeSwfOrImg from executing, 
    // but that seems to be impossible. 

    // Flash 
    if (photo_div = xpath_single_node(swf_td, "div[@id='photoImgDiv" + ps_photo_id + "']")) {
        // n.b. if this breaks, another way to detect photo_div; look for object, get parentNode.
        
        // remove the swf.
        photo_div.removeChild(xpath_single_node(photo_div, "object"));
        
        photo_img = elm('img');
        photo_img.src = 'http://photos' + ps_photo_server + '.flickr.com/' 
                        + ps_photo_id + '_' + ps_photo_secret + '.jpg';
        
    // no Flash 
    } else { 
        
        // the user does not have Flash, so a <div> with the medium size image has conveniently 
        // been written to the dom for us.
    
        no_swf_div = xpath_single_node(swf_td, "div");
        photo_img = xpath_single_node(no_swf_div, "img");
        
        photo_div = elm('div');
        
        swf_td.replaceChild(photo_div, no_swf_div); 
        
    }
    
    // if underlying page has changed so we couldn't parse it, give up.
    if (! photo_img ) { return; }
    
     
    // styling...  
    css( photo_div, { 'position':'relative', 'margin':'5px'  });
      

    // having real image width and height eliminates dancing at page load
    // n.b. the toolbar in the flash file forces a minimum width, so we can't know the true width of
    // narrow photos. The following is a compromise that generally produces the least dancing
    // of title and image, given this imperfect information.
    // we could use Flickr API to get the real width, but the problem there is that the API
    // call is async. We can't wait on it, not without rewriting everything. So the page would
    // proceed merrily along, and actually look worse (title element gets smushed into small space).
    if (ps_w_flash > ps_w_flash_min) {
        photo_img.width = ps_w_flash - ps_w_flash_extra;
    }
    photo_img.height = ps_h_flash - ps_h_flash_extra;  
   
    photo_img.style.borderColor = '#000000';
    photo_img.style.borderWidth = 1;
   
    // and, insert the image 
    photo_div.appendChild(photo_img);
    
    
    var orig_photo_img_src = photo_img.src; // saved in pristine state for photo_rotate


    // ---------------------------------------------
    // notes

    /*<note id="313" author="12037949754@N01"
            authorname="Bees" x="10" y="10"
            w="50" h="50">foo</note> */
 
    var note_insert_point = elm('span');
    photo_div.appendChild(note_insert_point);


    // Drag is based on DOM-Drag by Aaron Boodman.
    // <http://www.youngpup.net/2001/domdrag>
    // do not blame him for bugs, it's radically modified and simplified.
    var Drag = {

        obj : null,

        init : function(o, set_bounding, onDragStart, onDrag, onDragEnd)
        {
            o.onmousedown    = Drag.start;

            o.set_bounding = set_bounding;
            
            o.onDragStart =  (onDragStart != null) ? onDragStart : function(){};
            o.onDrag =       (onDrag      != null) ? onDrag      : function(){};
            o.onDragEnd =    (onDragEnd   != null) ? onDragEnd   : function(){};
        },

        start : function(e)
        {
            var o = Drag.obj = this;
            var y = parseInt(o.style.top);
            var x = parseInt(o.style.left);
           
            // this could be set for all of them, after a successful drag, instead. 
            bounds = o.set_bounding();
            o.minX = bounds[0];
            o.maxX = bounds[1];
            o.minY = bounds[2];
            o.maxY = bounds[3];
            
            o.onDragStart(x, y);

            o.lastMouseX    = e.clientX;
            o.lastMouseY    = e.clientY;
            o.minMouseX    = e.clientX - x + o.minX;
            o.maxMouseX    = o.minMouseX + o.maxX - o.minX;
            o.minMouseY    = e.clientY - y + o.minY;
            o.maxMouseY    = o.minMouseY + o.maxY - o.minY;

            document.onmousemove    = Drag.drag;
            document.onmouseup        = Drag.end;

            return false;
        },

        drag : function(e)
        {
            var o = Drag.obj;

            var ey    = e.clientY;
            var ex    = e.clientX;
            var y = parseInt(o.style.top);
            var x = parseInt(o.style.left);
            var nx, ny;

            ex = Math.max(ex, o.minMouseX);
            ex = Math.min(ex, o.maxMouseX);
            ey = Math.max(ey, o.minMouseY);
            ey = Math.min(ey, o.maxMouseY);

            nx = x + ex - o.lastMouseX;
            ny = y + ey - o.lastMouseY;

            Drag.obj.style.left = nx + "px";
            Drag.obj.style.top = ny + "px";
            Drag.obj.lastMouseX    = ex;
            Drag.obj.lastMouseY    = ey;

            Drag.obj.onDrag(nx, ny);
            return false;
        },

        end : function()
        {
            document.onmousemove = null;
            document.onmouseup   = null;
            Drag.obj.onDragEnd(    parseInt(Drag.obj.style.left), 
                                        parseInt(Drag.obj.style.top)   );
            Drag.obj = null;
        },

    };
    
    /*  end of drag */
    
    
        
    var Notes = new Array();    

    
    function visiblizer( el, vis ) {
        return function() {
            el.style.visibility = vis ? 'visible' : 'hidden';
        }
    }

    var notes_span;
    var texts_span;
    
    
    /* resizable note handler divs */
    var handle_size = 6;
    var handle_div;
    function prep_resizable_notes() {
        // cloneable for resize handlers.
        handle_div = elm("div");
        css( handle_div, {
            'width'       : handle_size + 'px',
            'height'      : handle_size + 'px',
            'position'    : 'absolute',
            'borderColor' : '#000000',
            'borderStyle' : 'solid',
            'borderWidth' : '1px',
            'background'  : '#e0e0e0'
        } );
    }
        



    

    var notes_hider_timeout;

    function timeouter_notes(ms) {
        return function() {
            if (notes_hider_timeout != null) {
                clearTimeout(notes_hider_timeout);
            }
            notes_hider_timeout = setTimeout( visiblizer( notes_span, false ), ms );
        }
    }
    
    var timeout_hide_notes = timeouter_notes(300);
    var slow_timeout_hide_notes = timeouter_notes(2000);

    function flash_notes() {             
        notes_span.style.visibility = 'visible';
        slow_timeout_hide_notes();
    }
   
    function reveal_notes() { 
        if (notes_hider_timeout != null) {
            clearTimeout(notes_hider_timeout);
        }
        notes_span.style.visibility = 'visible';
    }
   
    function remake_notes() {}; // forward declaration (??); 
  
    
    
    function Note(n) {
        for (var prop in n) {
            this[prop] = n[prop];
        }
        
        Notes.push(this);

        this.x2 = this.x + this.w; 
        this.y2 = this.y + this.h;
        
        // defining each note:
        
        //   notes_span (visible or hidden)
        //     highlight_div (yellow highlight on mouseover)          
        //     rect_div (black, true boundary of note)
        //     inner_rect_div (white, receives mouseovers)    
        //     ...
        //           
        //   texts_span (always in front of every rect)
        //     text_div (visible on mouseover of associated inner_rect)
        //  
       
        this.highlight_rect_div = elm('div');
        notes_span.appendChild(this.highlight_rect_div);

        this.rect_div = elm('div');
        notes_span.appendChild(this.rect_div);
        
        this.inner_rect_div = elm('div');
        notes_span.appendChild(this.inner_rect_div);


       
        // styling them all...
        
        css( this.rect_div, {
            'position' : 'absolute',
            'left'  : this.x + 'px',  'top'    : this.y + 'px',
            'width' : this.w + 'px',  'height' : this.h + 'px',
            'borderColor' : '#000000',
            'borderStyle' : 'solid',
            'borderWidth' : '1px'
        } );
        
        css( this.inner_rect_div, {
            'position'    : 'absolute',
            'left'        : (this.x + 1) + 'px',
            'top'         : (this.y + 1) + 'px',
            'width'       : (this.w - 2) + 'px',
            'height'      : (this.h - 2) + 'px',
            'borderColor' : '#ffffff',
            'borderStyle' : 'solid',
            'borderWidth' : '1px',
        } );
        
        // XXX what if this is negative?
        css( this.highlight_rect_div, {
            'position'    : 'absolute',
            'left'        : (this.x - 2) + 'px',
            'top'         : (this.y - 2) + 'px',
            'width'       : (this.w + 2) + 'px',
            'height'      : (this.h + 2) + 'px',
            'borderColor' : '#ffff00',
            'borderStyle' : 'solid',
            'borderWidth' : '2px',
            // opacity is CSS 3, only recognized in newer Mozillas (as of 2005).
            'opacity'     : 0.5,
            'visibility'  : 'hidden'
            
        } );


        
        // ------------
        
        var note = this;  // to disambiguate "this" inside these next functions.

        // TEXTS
            
        var note_own_style = new Object;
        var note_other_style = new Object;


        note_own_style.color = '#fff4ad';
            
        note_own_style['img_nw'] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%07%00%00%00%06%08%06%00%00%00%0F%0E%84v%00%00%00JIDATx%DAcd%80%82%1F%EF%B7i%B2%B2%FC-a%F8%FF%C7%8D%89%E9%9F%0CH%8C%11D%FC%F9%B4-%9C%99%E9%FB%22%20%93%8D%01%090%82t%B0%B3~%BF%80.%01%02L%60%A3%B0H%80%25Av0%E0%00L0%CB%B1%01%00P%F4%15%C6y%09%DA%F8%00%00%00%00IEND%AEB%60%82"
                

        note_own_style['img_ne'] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%09%00%00%00%06%08%06%00%00%00%11%C7%B4%C5%00%00%00%85IDATx%DAc%F8%F3q%DD%93%AF%AF%D7-%3Aq%60%921%03%03%03%17%10%B3%021%13%1032%C0%C0%FF%2Fk%FF%83%F0%DF%CFk~%1D%DD%DB%9F%0F%14%92%00bn%20f%81)d%82)fbdd57%95%E9)%C8%0ErFR%C8%0CR%08W%04%02%CCLL%2C%91%E1%B6Y%40%A62%10%8B%001%07H%3F%0B%03%1APU%14%D5%85*%FA%0E%C4_%81%F8%17%13%BA%22AAN%5E%A8u%E2%40%0Cb%B3%00%00%97Y%1E%F5%10%EC%B1%AE%00%00%00%00IEND%AEB%60%82"

        note_own_style['img_se'] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%09%00%00%00%09%08%06%00%00%00%E0%91%06%10%00%00%00%AAIDATx%DAc%FC%FFe%ED%7F%06%24%F0%E6%ED%D7o%A2%F2q%8B%81%CC%1B%40%7C%02D31%A0%81%93g%EE%3D%07R%7F%91%F0%7F%14E%BF%FF%FC%FD%D7%DA%B5%EA*%90%F9%0B%88%BFC%E9%7FL%C8%0AJ%AB%97%1F%3F~%F2%DAk%20%F7%13%10%7F%00%E2o%20%D3X%40n%00Y%012%01%AA%E0%3D%10%BF%00%E2%97%40%FC%19%88%FF0%02%89%19P%BB%7FAM%00)%B8%0B%C5%20%85%DFY%80%C4u%A8%A2%1FP%2B%40%8A%40%8E%7F%03%15%FB%07Rt%12%C9%A4oP%2B%40%F8'%CCw%20%EB%04%40%0C%90%0E%A8%E0o%98%24%143%00%00%E9%A8%5C%02%D0Q%17%08%00%00%00%00IEND%AEB%60%82"

        note_own_style['img_sw'] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%07%00%00%00%09%08%06%00%00%00%FEX6%A3%00%00%00%82IDATx%DAc%FC%F3q%DD%13f%E6%FF%D2%0CX%00%D3%CF_%0C%FB%18p%00%A6%CBW%9FL%FC%F7%FF%FFo%AC%92%16%0Ey%D7O%9Cz%5C%FA%F7%DF%BF%3F%E8%92%CC%40%CC8o%D1%CE%7B%9F%3E%FD%BD%24%24%2C%20%C1%C5%C1%26%C0%C9%C9%CA%0E%92d%84*%E0%04bq%20V%86b%09%20%E6c%86%9A%F0%0F%88A%C6%FE%04%E2oP%FC%99%11*%093%01d%1C%2F%14s1%22%D9%CF%88%A4%88%15D%03%00%C4%93%24%CC%B2%FADq%00%00%00%00IEND%AEB%60%82"

        note_own_style['img_e'] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%09%00%00%00%01%08%06%00%00%00%0C%C2%84%7D%00%00%00%1CIDATx%DAc%FC%FFe%ED%7F%064%C0%C8%13%3C%0DH%DD%00%E2%13%40%7C%0B%00%96%A1%07%11U%2B%F8W%00%00%00%00IEND%AEB%60%82"

        note_own_style['img_s'] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%01%00%00%00%09%08%06%00%00%00%F3FF%E4%00%00%00%1EIDATx%DAc%F8%FFe%ED%7F%26%06%20%40%23%40%60%263%90P%05%11%8C%20%E2%2B%00%A7%B6%05e%D8%14%81X%00%00%00%00IEND%AEB%60%82"



        note_other_style['color'] = '#cdffb0';

        note_other_style['img_nw'] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%07%00%00%00%06%08%06%00%00%00%0F%0E%84v%00%00%00TIDATx%DAcd%80%82%AB%DF%B6i%FEa%FBW%F2%8B%E1%8F%1B%133%83%0CH%8C%11D%DC%F9%B9-%FC%3D%EB%CFEL%8C%8Cl%0CH%80%F1%E1%D7m%9A%AF9%7F%5E%60D%93%00%01%A6_l%FFK%B0I%80%25%BF1%FEvc%C0%01%98%FE%40-%C7%06%00mq%18JC%94%14%8F%00%00%00%00IEND%AEB%60%82"

        note_other_style['img_ne'] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%09%00%00%00%06%08%06%00%00%00%11%C7%B4%C5%00%00%00%88IDATx%DAc8%F7%7B%FD%93K%9F%D7%2F%DAzt%921%03%03%03%17%10%B3%021%13%1032%40%01%D3%7F%16F%E9%DF%3C%8C%B1%E2%E62%C77%1C%EEO%05%8A%09%031'%103%C3%142%C1T323%B1J%5B%C8%F5%A4%E6%059%03%B9%12%40%CC%0DS%08W%04%D6%C1%C2%CC%E2%15e%97%05d*%03%B1%08%10s%80%85%19%D0%80%A8%AA%A8.T%D1w%20%FE%0A%C4%BF%98%D0%15q%0Aq%F3B%AD%13%07b%10%9B%05%006p%175%08%93%F9%F5%00%00%00%00IEND%AEB%60%82"

        note_other_style['img_se'] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%09%00%00%00%09%08%06%00%00%00%E0%91%06%10%00%00%00%AAIDATx%DAc%3C%FB%7F%C3%7F%06%24%F0%E9%F5%E7o%8Eb%B1%8B%81%CC%1B%40%7C%02D31%A0%81k%A7%EE%3D%07R%7F%91%F0%7F%14E%BF~%FD%F97%A7u%E5U%10%13%88%BFC%E9%7FL%C8%0A%A6%97-%3D~%FE%F8%B5%D7%20%5B%81%F8%03%10%7F%03%99%C6%F2%1E%E8%86%9B%40%2B%40%26%40%15%BC%07%E2%17%40%FC%12%88%3F%03%F1%1FF%201%03j%F7%2F%A8%09%20%05w%A1%18%A4%F0%3B%0B%90%B8%0EU%F4%03j%05H%11%C8%F1o%A0b%FF%40%8AN%22%99%F4%0Dj%05%08%FF%84%F9%0Ed%9D%00%88%01%D2%01%15%FC%0D%93%84b%06%00%2F%B0%5C%5B%D5%DD%B3%9C%00%00%00%00IEND%AEB%60%82"

        note_other_style['img_sw'] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%07%00%00%00%09%08%06%00%00%00%FEX6%A3%00%00%00%82IDATx%DAc%3C%F7%7B%FD%93%FF%2C%8C%D2%0CX%00%D3%FF%9F%0C%FB%18p%00%A6%7B%97%1EO%FC%FB%F7%DFo%AC%92%A1Vy%D7%EF%9CxX%FA%E7%CF%DF%3F%E8%92%CC%40%CC%B8v%DE%CE%7B%7F%3E%FD%B9%24(%C4%2F%C1%C2%C9*%C0%C1%C9%C6%0E%92d%84*%E0%04bq%20V%86b%09%20%E6c%86%9A%F0%0F%88A%C6%FE%04%E2oP%FC%99%11*%093%01d%1C%2F%14s1%22%D9%CF%88%A4%88%15D%03%00%C6%D0%24%DE%15%EE%8B%14%00%00%00%00IEND%AEB%60%82"

        note_other_style['img_e'] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%09%00%00%00%01%08%06%00%00%00%0C%C2%84%7D%00%00%00%1CIDATx%DAc%3C%FB%7F%C3%7F%064%60%CC%180%0DH%DD%00%E2%13%40%7C%0B%00%93%D1%07%11y~W%C7%00%00%00%00IEND%AEB%60%82"

        note_other_style['img_s'] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%01%00%00%00%09%08%06%00%00%00%F3FF%E4%00%00%00%1EIDATx%DAc8%FB%7F%C3%7F%26%06%20%40%23%40%60%263%90P%05%11%8C%20%E2%2B%00%A1u%05A%3C%08%7D%FC%00%00%00%00IEND%AEB%60%82";

        var td_proto = elm('td');
        td_proto.style.margin = 0;
        td_proto.style.padding = 0;
        
        var tbl_proto = elm('table')
        tbl_proto.cellPadding = 0;
        tbl_proto.cellSpacing = 0;
        
        
            
        function mk_img(w,h) {
            var img = elm('img');
            img.width = w;
            img.height = h;
            img.style.border = '0px';// !important";
            return img;
        }
            
        
        // ...Oh no, he's using TABLES! OMG!
        // sorry but the circumlocutions I've seen to do rounded corners in pure css
        // are pretty sad, and won't work for pngs with alpha channels.
        // if someone has a better solution, I'll slap it in here.
        function note_proto() {
           
            var p = new Object();
             
            p.div = elm('div');
            p.div.id = 'note';
            p.div.style.width = '250px';
            p.div.style.position = 'absolute';
           
            var tbl = tbl_proto.cloneNode(false);
            
            // offset contents from inner note rect. also gives the mouse pointer a "bridge" to this
            // element so the note text won't disappear when going from inner_rect.
            tbl.style.paddingTop = '8px'; 
            p.note_area = tbl;
            p.div.appendChild(tbl);
            
            // top row

            var tr_top = elm('tr');
            tbl.appendChild(tr_top);
            
            var td_nw = td_proto.cloneNode(false);
            p.img_nw = mk_img(7,6);
            td_nw.appendChild(p.img_nw);
            tr_top.appendChild(td_nw);

            p.td_n = td_proto.cloneNode(false);
            tr_top.appendChild(p.td_n);

            var td_ne = td_proto.cloneNode(false);
            p.img_ne = mk_img(9,6);
            td_ne.appendChild(p.img_ne);
            tr_top.appendChild(td_ne);


            // middle row

            var tr_middle = elm('tr');
            tbl.appendChild(tr_middle);
            
            p.td_w = td_proto.cloneNode(false);
            tr_middle.appendChild(p.td_w);

            p.td_txt = elm('td'); 
            p.td_txt.style.paddingRight = '2px'; 
            p.td_txt.style.paddingBottom = '2px'; 
            p.td_txt.style.paddingTop = '0';
            p.td_txt.style.paddingLeft = '0';
            p.td_txt.style.fontSize = '12px';  
            p.td_txt.style.fontFamily = 'Arial, Helvetica, sans-serif';
            tr_middle.appendChild(p.td_txt);

            p.td_e = td_proto.cloneNode(false);
            tr_middle.appendChild(p.td_e);
            

            // bottom row
            
            var tr_bottom = elm('tr');
            tbl.appendChild(tr_bottom);

            var td_sw = td_proto.cloneNode(false);
            p.img_sw = mk_img(7,9);
            td_sw.appendChild(p.img_sw);
            tr_bottom.appendChild(td_sw);

            p.td_s = td_proto.cloneNode(false);
            tr_bottom.appendChild(p.td_s);
            
            var td_se = td_proto.cloneNode(false);
            p.img_se = mk_img(9,9);
            td_se.appendChild(p.img_se);
            tr_bottom.appendChild(td_se);


            return p;
        }
        
        
        this.text_node = function() {
            
            text_node = elm('span');
            text_node.className = 'note_text';
                // show newlines as br's 
            var text_lines = note.text.split("\n");
            this.line_length = 0;
            
            for (var i in text_lines) {
                markup(text_node, text_lines[i]);
                
                // newlines to <br>s
                if (i < (text_lines.length-1)) {
                    text_node.appendChild( elm('br') );
                }
            }


            return text_node;
        }
      
        // strings to text nodes
        // urls to anchors
        // flickr photo urls to anchor+img thumbnails
        const re = new RegExp('\\b(https?://[^\\s>\\]]+)', 'ig'); 
        const tag_re = new RegExp('\\bhttp://(?:www\\.)?flickr\\.com/photos/tags/([^/\\s]+)'); 
        const photo_re = new RegExp('\\bhttp://(?:www\\.)?flickr\\.com/photos/[^/\\s]+/(\\d+)'); 
        const personal_re = new RegExp('\\bhttp://(?:www\\.)?flickr\\.com/(people|photos)/([^/\\s]+)/?$')
        const icon_name_re = /<h1>\s*(?:<a[^>]+>)?(<img [^>]+>)(?:<\/a>)?\s*&nbsp;\s*(.+?)\s*[<&]/;
        const align_re =  /align\s*=\s*\S+/; 
        buddy_icon_dim = 24 // 50% of normal size which is 48x48. flickr scales in the browser, yuck.
        
        function markup(n, str) {

            // aaron's linkify... but how to append if no link detected?
            var prevIndex = 0; 
            re.lastIndex = 0;
            
            while (match = re.exec(str)) {
                n.appendChild(txt(str.substring(prevIndex, match.index)));
                prevIndex = re.lastIndex;
                var url = match[0];
                
                var a = elm("a");
                a.setAttribute("href", url);
                var url_txt = txt(url);
                a.appendChild(url_txt);
                n.appendChild(a);
          
                // the following goes back and replaces the link text, perhaps asynchronously. 
                
                // tag urls look like they do on the rest of the page, globe with tagname
                if (tag_re.exec(url)) {
                    var tag = RegExp.$1
                    var tag_icon = elm('img');
                    tag_icon.src = '/images/icon_globe_over.gif'; // using the dark version because it's easier to see on green or yellow
                    tag_icon.height = tag_icon.width = '16';
                    tag_icon.alt = "Click this icon to see all public photos tagged with " + tag;
                    tag_icon.className = "icon";
                    tag_icon.style.paddingRight = '0.2em';
                    var span = elm('span');
                    span.style.whiteSpace = 'nowrap';
                    span.appendChild(tag_icon);
                    span.appendChild( txt(tag) );
                    a.style.textDecoration = "none";
                    a.replaceChild(span, url_txt);
                // get thumbnail for photo url in note 
                } else if (photo_re.exec(url)) {
                    var photo_id = RegExp.$1;
                    // happens async: may swoop down and replace text in above link later.
                    // xxx when the long link is replaced for a smaller thumnail, and there is any 
                    // other text in the note, the note width doesn't shrink.
                    // perhaps being completely empty triggers a resize, somehow. perhaps remove all children and
                    // add them back in.
                    function get_thumb(req, rsp) {
                        var thumbnail = xpath_single_node(rsp, "//size[@label='Thumbnail']")
                        if (thumbnail != null) {
                            var img = elm('img')
                            img.src = thumbnail.getAttribute('source');
                            if (img.src == null) { return }
                            img.style.width = thumbnail.getAttribute('width')
                            img.style.height = thumbnail.getAttribute('height')
                            a.replaceChild(img, url_txt);
                        }
                    }
                    flickr_api_call( "flickr.photos.getSizes", { 'photo_id' : photo_id }, get_thumb );
                // matches personal photostream or profiles
                } else if (personal_re.exec(url)) {
                     
                     function get_user_details(req, rsp) {
                         //alert(req.responseText);
                         user = rsp.getElementsByTagName('user').item(0);
                         id = user.getAttribute('id')
                         username = user.getElementsByTagName('username').item(0).firstChild.nodeValue;
                          
                         icon = elm('img');
                         icon.src = '/buddyicons/' + id + '.jpg';
                         icon.width = icon.height = 24;  // scaled in browser; really 48. yuck.
                         icon.align = 'absmiddle'; // what the hell, it's html 4.01 transitional anyway.
                         icon.style.marginRight = '0.3em';

                         a.replaceChild(icon, url_txt);
                         a.appendChild( txt(username) );     
                           
                     }
                     flickr_api_call( "flickr.urls.lookupUser", { 'url': url }, get_user_details );
                }

            }
            n.appendChild(txt(str.substring(prevIndex)));
            n.normalize(); 
            
            
        }
       
        // adds a little signature to notes by other people 
        this.author_node = function() {  
            var author = elm('i')
            // only way to get entities is to use innerHTML, 
            // apparently. or unescape??
            author.innerHTML = ' &ndash;&nbsp;' +this.authorname;
            return author;
        }
        
        this.make_shadowed_text_div = function() {

            note.author_owner = (note.author == ps_photo_character_id);
       
            nstyle = note.author_owner ? note_own_style : note_other_style;
                 
            var n = note_proto();
            
            n.img_nw.src = nstyle['img_nw'];
            n.td_n.style.background = nstyle['color'];
            n.img_ne.src = nstyle['img_ne'];
            
            n.td_w.style.background = nstyle['color'];
            n.td_txt.style.background = nstyle['color'];
            var text_node = note.text_node();
            n.td_txt.appendChild(text_node);

            // if it's not the photo owner's note,
            // and if it was retrieved, not a new one we're creating,
            // add little signature at bottom
            if ( (!note.author_owner) && note.id) { 
                n.td_txt.appendChild(note.author_node());
            }
            
            n.td_e.style.background = 'transparent url(' + nstyle['img_e'] + ')';
            
            n.img_sw.src = nstyle['img_sw'];
            n.td_s.style.background = 'transparent url(' + nstyle['img_s'] + ')';
            n.img_se.src = nstyle['img_se'];

            
            note.text_div = n.div;
            note.note_area = n.note_area;
            texts_span.appendChild(note.text_div);
            
            // for manipulating, when we edit.
            note.inner_text_td = n.td_txt;
            note.inner_text_node = text_node;
            
            note.position_text_div();
        }
    

        this.position_text_div = function() { 
            css( note.text_div, {
                'left'     : note.x + 'px',
                'top'      : (note.y + note.h) + 'px',
            } );
        }
        
        note.make_shadowed_text_div();  
        note.text_div.style.visibility = 'hidden';
        
        this.showText = function() {
            // hide all other note texts (they may be on timeout)
            for (i in Notes) {
                if (Notes[i].id != note.id) {
                    Notes[i].hideText();
                }
            }
                
            // and show me
            clearTimeout(note.textTimeout); // this note text
            clearTimeout(notes_hider_timeout); // all notes rects
            note.text_div.style.visibility = 'visible';
            note.highlight_rect_div.style.visibility = 'visible';
        };

        this.hideText = function() {
            // alert("note hide!")
            note.text_div.style.visibility = 'hidden';
            note.highlight_rect_div.style.visibility = 'hidden';
        };

        // on mouseout, we slightly delay hiding note text. 
        // things in the note text are now clickable, and the mouse
        // may wander a little on its way there. Also it may go diagonally across the L formed
        // by note rectangle and text.
        this.hideTextTimeout = function() {
            note.textTimeout = setTimeout( note.hideText, 150 );
        }

        
        this.inner_rect_div.addEventListener( "mouseover", this.showText, false );
        this.inner_rect_div.addEventListener( "mouseout", this.hideTextTimeout, false );
        
        // text_div is not normally visible
        // but when it is, one should be able to mouseover and not lose the text
        this.note_area.addEventListener( "mouseover", this.showText, false );
        // see above comment on timeouts.
        this.note_area.addEventListener( "mouseout", this.hideTextTimeout, false );
        // sometimes when leaving a note, you also leave the photo img, too quickly for Mozilla to catch that event.
        // also, sometimes the notes hang over the edge
        this.inner_rect_div.addEventListener( "mouseout", timeout_hide_notes, false );
        this.note_area.addEventListener( "mouseout",  timeout_hide_notes, false );
        
        
        this.save = function() {
            args = {    'note_x'    : note.x,
                        'note_y'    : note.y,
                        'note_w'    : note.w,
                        'note_h'    : note.h,
                        'note_text' : note.text  };
                
            var api_call;
            if (note.id == null) {
                api_call = "flickr.photos.notes.add",
                args['photo_id'] = ps_photo_id;
            } else {
                api_call = "flickr.photos.notes.edit";
                args['note_id'] = note.id;
            }
            
            flickr_api_call( api_call, args, remake_notes );
            
        };

        this.save_new_text = function() {
            note.text = note.textarea.value;
            note.save();
        };

        this.del = function() {
            flickr_api_call( "flickr.photos.notes.delete", { 'note_id' : note.id }, remake_notes );
        };

        this.resizeBegin = function() { 
            note.text_div.style.visibility = 'hidden';

            /* stop listening for cursor changes any note elements */
            for (i=0; i<4; ++i) {
                note.handle[i].style.cursor = null; //removeAttribute('cursor');
            }
            note.inner_rect_div.style.cursor = null; //removeAttribute('cursor');
            
        };

        var handleNames = [ 'nw', 'ne', 'se', 'sw' ];
        this.setResizeCursors = function() {
            /* start listening for cursor changes any note elements */
            for (i=0; i<4; ++i) {
                nh = note.handle[i];
                curs = handleNames[i] + '-resize';
                nh.style.cursor = curs;
                nh.addEventListener( "mousedown", cursor_on(curs), false);
                nh.addEventListener( "mouseup", cursor_off, false );
            }
            note.inner_rect_div.style.cursor = 'move';
        }
        
        this.resizeEnd = function() {
            // store new dims in the object.
            note.x = parseInt(note.rect_div.style.left);
            note.y = parseInt(note.rect_div.style.top);
            note.w = parseInt(note.rect_div.style.width);
            note.h = parseInt(note.rect_div.style.height);

            // and move the note div back.
            note.position_text_div();
            note.text_div.style.visibility = 'visible';

            // begin listening for cursor changes again
            note.setResizeCursors();
        };


        this.stopListeners = function() {
            // this note becomes "modal"... 
            // remove all listeners. 
            for (var i in Notes) {
                n = Notes[i];
                n.note_area.removeEventListener( "mouseout", n.hideTextTimeout, false );
                n.note_area.removeEventListener( "mouseover", n.showText, false );
                n.note_area.removeEventListener("mouseout",  timeout_hide_notes, false ); 
                n.inner_rect_div.removeEventListener( "mouseout", n.hideTextTimeout, false );
                n.inner_rect_div.removeEventListener( "mouseout", timeout_hide_notes, false );
                n.inner_rect_div.removeEventListener( "mouseover", n.showText, false );
                n.inner_rect_div.removeEventListener( "mousedown", n.edit, false );
            }
            // mouseover / mouseout for photo_img.
            photo_img.removeEventListener("mouseover", reveal_notes, false );
            photo_img.removeEventListener("mouseout",  timeout_hide_notes, false );
        };

        this.makeEditable = function() {
            note.textarea = elm("textarea");
            note.textarea.style.width = '20em';
            note.text_div.style.width = '21em';
            note.textarea.style.height = '5em';
            // matching the style of the page.
            note.textarea.style.fontFamily = 'Arial, Helvetica, sans-serif';
            note.textarea.style.fontSize = '12px';
            note.textarea.appendChild(txt(note.text))

            // want the author to appear on a separate line,
            // if there is one.
            textarea_span = elm('span');
            textarea_span.appendChild( note.textarea );
            if (!note.author_owner) {
                textarea_span.appendChild(elm('br'));
            }
            
            // swap note text for textarea
            note.inner_text_td.replaceChild(textarea_span, note.inner_text_node);

           
            
            var button =  elm("span");
            button.href = '#';
            css( button, {
                'paddingLeft'   : '0.6em',
                'paddingRight'  : '0.6em',
                'paddingTop'    : '0.3em',
                'paddingBottom' : '0.3em'
            } );

            var make_button = function(text, onclick, className) {
                var b = button.cloneNode(false);
                b.onclick = onclick;
                b.className = className; 
                b.appendChild( txt( text ) );
                return b;
            }
            
            var save_button = make_button('SAVE', note.save_new_text, 'Butt');
            var cancel_button = make_button('CANCEL', remake_notes, 'DeleteButt');
            var delete_button = make_button('DELETE', note.del, 'DeleteButt');
           
            buttons_div = elm('div');
            css( buttons_div, {
                'position'     : 'relative',
                'marginTop'    : '0.75em',
                'marginBottom' : '0.5em'
            } );
            buttons_div.appendChild(save_button);
            buttons_div.appendChild(txt(' '));
            buttons_div.appendChild(cancel_button);
            buttons_div.appendChild(txt(' '));
            buttons_div.appendChild(delete_button);

            note.inner_text_td.appendChild(buttons_div);

        };

        
        this.makeResizeBox = function() {    
            // dashed line, black dashes on white.
            note.highlight_rect_div.style.visibility = 'hidden';
            note.rect_div.style.borderColor = '#404040';
            css( note.inner_rect_div, {
                'left'        : note.x + 'px',
                'top'         : note.y + 'px',
                'width'       : note.w + 'px',
                'height'      : note.h + 'px',
                'borderColor' : '#e0e0e0',
                'borderStyle' : 'dashed', // 'dotted'
                'cursor'      : 'move'
            } );
            
        };
        

        this.reposition = function() {
            note.handle[0].style.left = note.x;
            note.handle[0].style.top = note.y;
            note.handle[1].style.left = note.x2 - handle_size;
            note.handle[1].style.top =  note.y;
            note.handle[2].style.left = note.x2 - handle_size;
            note.handle[2].style.top = note.y2 - handle_size;
            note.handle[3].style.left = note.x;
            note.handle[3].style.top = note.y2 - handle_size;

            for (r in note.rects) {
                note.rects[r].style.left = note.x;
                note.rects[r].style.top = note.y;
                note.rects[r].style.width = note.w;
                note.rects[r].style.height = note.h;
            }
        };

        this.resize = function() {
            note.w = note.x2 - note.x;  
            note.h = note.y2 - note.y;
            note.reposition();        
        };

        this.move = function() {
            note.x2 = note.x + note.w;
            note.y2 = note.y + note.h;
            note.reposition();
        };
            
        function cursor_on(curs) {
            return function() { 
                document.body.style.cursor = curs; 
            }
        }

        function cursor_off() {                
            document.body.style.cursor = 'default';
        }

        this.makeResizeHandles = function() {
            note.handle = new Array();
            for (i=0; i<4; ++i) {
                var nh = note.handle[i] = handle_div.cloneNode(true);
                notes_span.appendChild(nh);
            }
            note.setResizeCursors();
           
            note.rects = [ note.inner_rect_div, note.rect_div ];
            
            note.resize(); 
            
            // the following is somewhat repetitive. maybe I don't understand javascript
            // scoping and closures, but I couldn't get Drag to work as methods of a Note.
            Drag.init(
                note.handle[0], 
                function() { return [
                    0, note.x2 - 2*handle_size - 1, 
                    0, note.y2 - 2*handle_size - 1 
                ]; },
                note.resizeBegin,
                function() { 
                    note.x = parseInt(note.handle[0].style.left);
                    note.y = parseInt(note.handle[0].style.top);
                    note.resize(); 
                },
                note.resizeEnd
            );

            Drag.init(
                note.handle[1], 
                function() { return [
                    note.x + handle_size + 1,  photo_img.width - handle_size,
                    0, note.y2 - 2*handle_size - 1 
                ] },
                note.resizeBegin,
                function() { 
                    note.x2 = parseInt(note.handle[1].style.left) + handle_size;
                    note.y = parseInt(note.handle[1].style.top);
                    note.resize(); 
                },
                note.resizeEnd
            );
            

            Drag.init(
                note.handle[2], 
                function() {  return [
                    note.x + handle_size + 1, photo_img.width - handle_size,
                    note.y + handle_size + 1, photo_img.height - handle_size
                ] },
                note.resizeBegin,
                function() { 
                    note.x2 = parseInt(note.handle[2].style.left) + handle_size;
                    note.y2 = parseInt(note.handle[2].style.top) + handle_size;
                    note.resize(); 
                },
                note.resizeEnd
            );

            Drag.init(
                note.handle[3], 
                function() { return [
                    0, note.x2 - 2*handle_size - 1, 
                    note.y + handle_size + 1, photo_img.height - handle_size
                ] },
                note.resizeBegin,
                function() { 
                    note.x  = parseInt(note.handle[3].style.left);
                    note.y2 = parseInt(note.handle[3].style.top) + handle_size;
                    note.resize(); 
                },
                note.resizeEnd
            );

        };

        this.makeDraggable = function() {
            
            Drag.init(
                note.inner_rect_div,
                function() { return [  
                    1, photo_img.width - note.w, 1, photo_img.height - note.h,
                ] },
                note.resizeBegin,
                function() {
                    note.x = parseInt(note.inner_rect_div.style.left);
                    note.y = parseInt(note.inner_rect_div.style.top);
                    note.move();
                },
                note.resizeEnd
            );
        }

        
        this.edit = function() {
            note.stopListeners();
            note.makeEditable();            
            note.makeResizeBox();
            note.makeResizeHandles();
            note.makeDraggable();
        }
        
        // you can edit the note if: 
        if ( (global_nsid == ps_photo_character_id)  // you own the photo
                ||
             (global_nsid == this.author)  //   you are the note author
        ) {
            this.inner_rect_div.addEventListener( "mousedown",this.edit, false );
        }

        
    }         
   
    function notes_init() {
        // using spans instead of divs so as not to trigger block element.
        // n.b. these spans are global to this GM extension.
        notes_span = elm('span');
        notes_span.id = 'notes';
        texts_span = elm('span');
        texts_span.id = 'texts';        
        texts_span.style.zIndex = 500; // bloody absolutely positioned next and prev links in right nav

        photo_div.insertBefore(notes_span,note_insert_point);
        photo_div.insertBefore(texts_span,note_insert_point);
       
        photo_img.addEventListener( "mouseover", reveal_notes, false );
        
        photo_img.addEventListener( "mouseout",  timeout_hide_notes, false );

        prep_resizable_notes();
    }
   
              
    function notes_retrieve(req, rsp) {
        
        notes_init();
        
        var collection = document.evaluate( "//note", rsp, null, XPathResult.ANY_TYPE, null );

        var node = collection.iterateNext();
        while (node) {
            n = new Object();
        
            n.id = node.getAttribute('id');
            n.author = node.getAttribute('author');
            n.authorname = node.getAttribute('authorname');
            n.x = parseInt(node.getAttribute('x'));
            n.y = parseInt(node.getAttribute('y'));
            n.w = parseInt(node.getAttribute('w'));
            n.h = parseInt(node.getAttribute('h'));
            n.text = '';
            nc = node.childNodes;
            for (var i in nc) {
                if (nc[i].nodeType == TEXT_NODE) {
                    n.text += nc[i].nodeValue;
                }
            }
            
            var note = new Note(n);
            
            node = collection.iterateNext();
        }

         
        flash_notes();
    }
    
    function make_notes() {
        flickr_api_call( "flickr.photos.getInfo", { 'photo_id':ps_photo_id }, notes_retrieve );
    }
    

    // if redrawing the notes, as in rotating, note editing.
    function remake_notes() {
        if (! Notes.length ) { return; }

        Notes = [];
        photo_div.removeChild( notes_span );
        photo_div.removeChild( texts_span );
        
        // and remake them    
        make_notes();
    }

    
    // Here's where it all begins.

    if ( xpath_single_node( document, "//span[@id='noteCount']" ) != null ) {
        make_notes();
    }
    
    function photo_add_note() {
        // init notes if there aren't any
        if (notes_span == null) {
            notes_init();
        }
        var n = new Note( {
            x: 10, y: 10, w: 32, h: 32,
            text: 'Add your note here.',
            author: global_nsid
        } );
        notes_span.style.visibility = 'visible';
        n.showText();
        n.edit();
    }    

    // ---------------------------------------------
    // TOOLBAR
    var toolbar = new Array();
    function toolbar_button( str, href, onclick ) {
        var b = elm('a');
        b.href = href;
        if (onclick != null) {
            b.onclick = onclick;
        }
        b.appendChild( txt(str) );
        toolbar.push(b);
        return b;
    }
    
    // the toolbar changes if the user owns the photo
    var is_owner = photo_hash[ps_photo_id].isOwner;
    var can_tag = (xpath_single_node(document,"//div[@id='tagadder']") != null);
    


    // ---------------------------------------------
    // sizes

    if (ps_candownload) {
        // swf_zoom() is defined in page, picks the best size (large or original)       
        // but if that ever stops working, just set .href to :
        // '/photo_zoom.gne?id=' + ps_photo_id + '&size=m';
        toolbar_button( 'Sizes', '#', swf_zoom );
    } 



    // ---------------------------------------------
    // send to group, add to set.

    if (is_owner) {
        toolbar_button(
            'Send to Group',
            '/photo_sendto_group.gne?id=' + ps_photo_id
        );
        toolbar_button(
            'Add to Set',
            '/photo_sendto_set.gne?id=' + ps_photo_id
        );
    }



    // --------------------------------------------
    // add note
    // appears to use the same perms as adding tags
    if (can_tag) {
        toolbar_button( 'Add Note', '#', photo_add_note );
    }
    

   

    // ---------------------------------------------
    // blog this    
    if (global_nsid) { // if logged in
        toolbar_button( 
            'Blog This', 
            '/blog.gne?photo=' + ps_photo_id
        );
    }
    
    
       
    // ---------------------------------------------
    // rotate 
    // this could also be done with the api now that we have that??
   
    function rotation_ok() {
        // If we make the browser forget the dims, 
        // we force a clean reflow when once the new src has loaded.
        photo_img.removeAttribute('height');
        photo_img.removeAttribute('width');

        // cheesy random argument added so it does not hit cache.  
        photo_img.src = orig_photo_img_src + '?.rand=' + Math.floor(Math.random()*1000)

        remake_notes();
    }

    function photo_rotate() {
        flickr_api_call( "flickr.photos.transform.rotate", { 'photo_id':ps_photo_id, 'degrees':90 }, rotation_ok );
    }

    if (is_owner) {
        toolbar_button('Rotate','#',photo_rotate);
    }


    // ---------------------------------------------
    // favorite
  
    var fav_div;
     
    function fave_init() {
        fave_div = elm('div');
        fave_div.id = 'fave_star';
        css( fave_div, {
            'cssFloat'   : 'right',
            'color'      : '#ff0084',
            'fontSize'   : '0.8em',
            'textAlign'  : 'center',
            'position'   : 'relative',
            'top'        : '2.5em',
            'visibility' : 'hidden'
        } );
         
        var fave_star = elm('span'); 
        fave_star.style.fontSize = '4em';
        fave_star.style.lineHeight = '0px';
        fave_star.appendChild( txt('*'));

        fave_div.appendChild(fave_star)
        fave_div.appendChild( elm('br') );
        
        var t_span = elm('span');
        t_span.appendChild(txt('FAVE'));
        t_span.style.lineHeight = '1em';
        
        fave_div.appendChild( t_span );
                
        h1  = swf_td.getElementsByTagName('h1').item(0);

        var h1_fave = elm('div')
        h1_fave.style.width = photo_img.width + 7; // to adjust for 7px margin on left.
        h1_fave.appendChild(fave_div);
        h1_fave.appendChild(h1);
            
        swf_td.insertBefore(h1_fave, photo_div); 
    }

    function photo_fave() {        
        flickr_api_call( "flickr.favorites.add", { 'photo_id':ps_photo_id }, draw_fave );
    }

    function photo_unfave() {        
        flickr_api_call( "flickr.favorites.remove", {'photo_id':ps_photo_id }, draw_unfave );
    }


    var fave_button;

    function draw_fave() {
        fave_div.style.visibility = 'visible';
        // change the text... 
        fave_button.replaceChild( 
            txt('Remove from Favorites'),
            fave_button.firstChild
        );
        fave_button.onclick = photo_unfave;
    }

    function draw_unfave() {
        fave_div.style.visibility = 'hidden';
        fave_button.replaceChild( 
            txt('Add to Favorites'),
            fave_button.firstChild
        );
        fave_button.onclick = photo_fave;
    }

 
    if (!is_owner && global_nsid) { // not owner, but logged in...
        fave_init();
        fave_button = toolbar_button(
            'Add to Favorites',
            '#',
            photo_fave
        );
        if (ps_isfav) {
            draw_fave();
        } else {
            draw_unfave();
        }
    }
    
    // -----------------------  
    
    function delete_ok() {
        // currently this appears just to redirect us to the home page. without any
        // special notification about the photo being deleted.
        // but this is how flickr does it. 
        document.location.href = '/photos/' + ps_nsid + '/?deleted=' + ps_photo_id
    }
    var delete_proc = make_proc('photo deletion', delete_ok)


    function photo_delete() {
       var confirm_delete = confirm("Are you sure you want to delete this photo? (This can not be undone.)")
       if (confirm_delete == false) return;

       var photo_url = '/photos/' + ps_nsid;
       var post_data = 'delete=' + ps_photo_id

       // oddly this POST appears to return the home page anyway. we bother to do
       // the second GET only to be exactly like the Flickr SWF.
       do_req('POST', delete_proc, photo_url, null, post_data)
    }


    if (is_owner) {
        toolbar_button('Delete', '#', photo_delete)
    }






    // ---------------------------------------------
    // toolbar!
    
    
    if (toolbar.length > 0) {
        var p = elm('p');
        photo_div.appendChild(p);
        p.style.color = '#666666';
        // p.appendChild( txt( 'This Photo: ' ));
    
        for (var i = 0; i < toolbar.length; ++i ) {
            
            p.appendChild(toolbar[i]);

            if (i+1 < toolbar.length) {
                var bullet = elm('span');
                // bullet.appendChild( txt( unescape('&bull;') ) );
                // how does one get an entityReference from HTML? unescape doesn't work.
                bullet.innerHTML = '&bull;';
                bullet.style.margin = '0em 0.3em 0em 0.3em';
                bullet.style.color = '#b0b0b0';
           
                p.appendChild( bullet );
            }
        }
    }

})();




