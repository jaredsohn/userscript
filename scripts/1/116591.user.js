// ==UserScript==
// @name           FLUTE: FLickr Ultimate Thumbnail Expander
// @description    Expands any image in Flickr into larger floating preview images on mouse hover.
// @namespace      http://myxp.anandkumar.me
// @include        http://www.flickr.com/*
// @require        http://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js
// @require        http://userscripts.org/scripts/source/50018.user.js
// @downloadURL    http://userscripts.org/scripts/source/116591.user.js
// @version        1.4.1
// ==/UserScript==

/**
Change Log:
Date      Version    Notes
20130828  1.4.1      *Fixed some long-standing issues regarding unavailability of large/medium image sizes.
                     *Added timeout detection to the xmlhttp routine.
                     *In GetDisplayImageURL() trimmed-out url query params (like ?zz=1, etc.)
                     *Moved functions around and some minor cleanups.
20130827  1.4.0      *Fixed support for /photos/ (photostream) page.
                     *Revert 1.3.3 since script was corrected by author.
20130108  1.3.3      *Moved the "gm_config extras" script with corrections to anandkumar.me domain.
20120720  1.3.2      *Tweaked the preview image positioning algorithm.
20120716             *urlLookup: If the requested image size is not available, store the next best image's URL for quick lookup later on. This only persists for the current page load.
                     *Remove "spaceball" image protection elements from the DOM whenever we can.
                     *Removed the uso updater script dependence because Greasemonkey 0.9.18 and above already comes with an auto-updater.
20120606             *Fine-tuned the image positioning algorithm.
                     *Added "Ctrl" key override to persist preview image.
20120604             *Added support for a delay timer and a corresponding configuration item under settings.
                     *Added support for the setting the preview image to "Snap to Cursor".
20111217             *Fixed the unnecessary image requests issue from previous update. Minor bug fixes.
20111214             *Now if a large version of the image is not available, the script will try to load the next smaller size instead of displaying the generic "Image unavailable" image. I may need to revisit this code later to prevent possible unnecessary image requests.
20111110             *Added configuration options to let the users specify "Auto-Size" width and height percentages.
20111101             *Added configuration options to let the users choose which images to expand.

ToDo::
-Rewrite the entire code using class/json style.
 */
var DEBUG = false;
var newWidth;
var newHeight;
var GMImg_position;
var GMImg_marginleft;
var GMImg_margintop;
var GMImg_left;
var GMImg_top;
var GMImg_right;
var GMImg_bottom;
var prevTarget =null;
var floatimg;
var timerRunning = false, timerID = null;
var global_mouse_x, global_mouse_y;
var persistPreview = false;
var urlLookup;

//From Config//
var settings_zoom_size, settings_max_width, settings_max_height, settings_auto_size, settings_snap_to_cursor;
var settings_expand_tinyimgs,settings_expand_smallimgs,settings_expand_mediumimgs;
var settings_x_factor,settings_y_factor;
var settings_timer_ms;

var xhrCnt = 0;
var debug_msg_div;

/**
 * Config screen
 */
var lang = GM_config.gets('lang','en'); // get the language - or set it to 'en' if it was not yet stored
GM_config.init('Configuration for FLUTE',{
    zoom_size: { label: 'Fetch Image Size:', type: 'radio', options:['Medium','Large'], default: 'Medium' },
    timer_ms : { label: 'Preview Delay (milliseconds)', type: 'int', default: 0, min: 0, max: 10000 },
    max_width: { label: 'Max Display Width:' , type: 'int'       , default: 640, section:['Preview Image properties'], min: 50, max: 5000 },
    max_height:{ label: 'Max Display Height:', type: 'int'       , default: 480, min: 50, max: 5000 },
    auto_size: { label: 'Enable Auto size:'  , type: 'checkbox'  , default: true },
    x_factor : { label: 'Auto-size Screen Width % :', type: 'int', default: 60, min: 1, max: 100 },
    y_factor : { label: 'Auto-size Screen Height %:', type: 'int', default: 60, min: 1, max: 100 },
    snap_to_cursor   : { label: 'Snap to Cursor', type: 'checkbox', default: false },
    expand_tinyimgs  : { label: 'Tiny Images'   , type: 'checkbox', default: true, section:['Control which images get expanded'] },
    expand_smallimgs : { label: 'Small Images'  , type: 'checkbox', default: true },
    expand_mediumimgs: { label: 'Medium Images' , type: 'checkbox', default: true }
  },
  GM_config.eCSS,
  {
    open: function() {
      var idx=0;
      GM_config.addBorder(); // add a fancy border
      GM_config.resizeFrame('480px','360px'); // resize the config window
      GM_config.addTooltip(idx++,'Zoom Size refers to the size of the image to be retrieved from the server. Larger images take more time to load.');
      GM_config.addTooltip(idx++,'Set the delay (in milliseconds) to wait before displaying the preview image.');
      GM_config.addTooltip(idx++,'The maximum Width, in pixels, of the displayed image. Use this if you want to retreive large images but want to constrain the displayed image size.');
      GM_config.addTooltip(idx++,'The maximum Height, in pixels, of the displayed image. Use this if you want to retreive large images but want to constrain the displayed image size.');
      GM_config.addTooltip(idx++,'When enabled, the maximum width and height of the displayed image is automatically constrained to a % of the browser window size. Selecting this option will ignore the custom maximum size settings above.');
      GM_config.addTooltip(idx++,'If Auto-Size is enabled, this option specifies the screen Width % to use.');
      GM_config.addTooltip(idx++,'If Auto-Size is enabled, this option specifies the screen Height % to use.');
      GM_config.addTooltip(idx++,'Enable this option to make the preview image follow the mouse cursor.');
      GM_config.addTooltip(idx++,'Enable this option to expand Tiny images (Stats page).');
      GM_config.addTooltip(idx++,'Enable this option to expand Small images (photostreams).');
      GM_config.addTooltip(idx++,'Enable this option to expand Medium images (Group pools, user home pages, etc).');
      // GM_config.sections2tabs(); // convert the sections to tabs
      GM_config.fadeOut(); //Fadeout the rest of the screen.
    },
    save: function() {
        //Update the settings and close the dialog
        GetUserSettings();
        //GM_config.close();
        GM_config.fadeIn();
        GM_config.close();
    },
    close: function() {
        GM_config.fadeIn();
        GM_config.close();
    }
  }
);

/**
 * Main code starts here
 */
(function(){
    try{
        if (typeof unsafeWindow != 'object') {
          window.unsafeWindow = window;
        }
        //Add global event listeners:
        window.addEventListener('load'     ,function(event){FluteInit  ();},true);
        window.addEventListener('mousemove',function(event){DoMouseOver(event);},true);
        window.addEventListener('keydown'  ,function(event){DoKeyDown  (event);},true);
        window.addEventListener('keyup'    ,function(event){DoKeyUp    (event);},true);
    }
    catch(e){
        d(e.message);
    }
    GM_registerMenuCommand('FLUTE: Configuration',GM_config.open);
})();

/**
 * Get the user-settings for this script.
 */
function GetUserSettings(){
    settings_zoom_size  = GM_config.get('zoom_size');
    settings_max_width  = GM_config.get('max_width');
    settings_max_height = GM_config.get('max_height');
    settings_auto_size  = GM_config.get('auto_size');
    settings_x_factor   = GM_config.get('x_factor');
    settings_y_factor   = GM_config.get('y_factor');
    settings_snap_to_cursor    = GM_config.get('snap_to_cursor');
    settings_expand_tinyimgs   = GM_config.get('expand_tinyimgs');
    settings_expand_smallimgs  = GM_config.get('expand_smallimgs');
    settings_expand_mediumimgs = GM_config.get('expand_mediumimgs');
    settings_timer_ms          = GM_config.get('timer_ms');
    
    //Perform any validation and re-calculation of the retreived settings here.
    settings_x_factor = settings_x_factor/100;
    settings_y_factor = settings_y_factor/100;
}

/**
 * Handle all the initializations here.
 */
function FluteInit(){
    //Initialize the global variables:
    newWidth         = "200";
    newHeight        = "200";
    GMImg_position   = "absolute";
    GMImg_marginleft = "0";
    GMImg_margintop  = "0";
    GMImg_left       = "";
    GMImg_top        = "";
    GMImg_right      = "";
    GMImg_bottom     = "";
    global_mouse_x   = 0;
    global_mouse_y   = 0;
    urlLookup        = new Array();
    
    debug_msg_div = "flute_debug_msg_div";
    
    //Get the user's settings
    GetUserSettings();
    //Create and attach the floating image.
    var newimg;
    var newlink;
    var settingsimg

    newimg = document.createElement('IMG');
    newimg.className = 'GM_thumbnail shadow';
    newimg.id  = "floatimg";
    newimg.src = "";
    newimg.alt = "Loading...";
    floatimg = document.getElementById('floatimg');
    
    newlink = document.createElement('A');
    newlink.id="floatimglink";
    newlink.href="";
    newlink.appendChild(newimg);
    document.body.appendChild(newlink);
    
    //Create the settings icon
    settingsimg = document.createElement('IMG');
    settingsimg.className="shadow";
    settingsimg.id="flute_settings_icon";
    settingsimg.alt="FLUTE settings";
    settingsimg.src="data:image/png;base64,"+ "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";
    settingsimg.width  = "32";
    settingsimg.height = "32";
    settingsimg.loaded = "false";
    settingsimg.addEventListener('click', function(){GM_config.open();}, true);
    document.body.appendChild(settingsimg);
    
    var debugmsg = document.createElement('div');
    debugmsg.id=debug_msg_div;
    document.body.appendChild(debugmsg);
    
    //Set default CSS values.
    newHeight = "640";
    newWidth  = "480";
    GMImg_left = "1";
    GMImg_top  = "1";
    GMImg_position  = "fixed";
    //Add-in the script's custom CSS to the page.
    AddScriptCSS();
    //Try to clean-up the DOM of image protections (for initially-loaded images).
    RemoveImageProtections();
    RepositionTimer();
}


/**
 * Handles the global mouseover event.
 * The main entry function from where everything is kicked-off.
 */
function DoMouseOver(e){
    //Get the event variable.
    if (!e) var e = window.event;
    var tg = (window.event) ? e.srcElement : e.target;
    //Extract the mouse co-ordinates
    GetCoordinate(e);
    //If the mouse is over the floatimg, either accidentally or deliberately, ignore it.
    if(tg.id == 'floatimg') return;
    //If this mouseover event is for the same element as before, exit.
    //We are only interested when the mouse enters/leaves an element.
    if(prevTarget !=null && tg == prevTarget) {
      //If the preview image must be repositioned upon mouse move, do it here:
      if(settings_snap_to_cursor){
          RepositionPreviewImage();
      }
      //Try to clean-up the DOM of image protections (for ajax-loaded images).
      RemoveImageProtections();
      return;
    }
    //Store the current target to compare against in the next mouse over event.
    prevTarget = tg;
    
    //If the mouse is over any "other" element, hide the floating image.
    ImgDoMouseOut();
    //If the target does not have a valid image, url, exit.
    var src = GetDisplayImageURL(tg);
    if(src == "") {
        //d("GetDisplayImageURL("+tg.id+") says this is not a valid image. Exiting.");
        return;
     }
    
    //Check if the current page is a photostream.
    if(src.match(/\_([s|t|m|n])\.jpg$/)!=null){
        //If the current element is a "small"/"thumbnail"/"medium" image, then get the resized URL and show the floating image.
        var matches;
        matches = src.match(/\_([s|t|m|n])\.jpg$/);
        if((matches == null || matches.length<2)){
            //If no valid matches, exit.
            return;
        }
        
        //Check if the current imgage should be expanded. Else, exit.
        if(matches[1]=='s' && settings_expand_smallimgs==false){
            return;
        }
        if(!settings_expand_tinyimgs && matches[1]=='t'){
          return;
        }
        if(!settings_expand_mediumimgs && matches[1]=='m'){
          return;
        }
    }
    else if(src.match(/\d+\_[a-z0-9]+.jpg$/) != null){
    }
    else{
        return;
    }
    
    //Once all the validations are passed, kick-start the image preview process.
    StartImagePreviewTimer(tg,src,e);
}


/**
 * Starts the preview image display timer.
 */
function StartImagePreviewTimer(tg, src, evt){
    //First, stop the global timer, if it's running.
    if(timerRunning){
       StopImagePreviewTimer();
    }
    timerRunning = true;
    timerID = setTimeout(function(){ShowImagePreview(tg, src);}, settings_timer_ms);
}

/**
 * Stops the active global timer.
 */
function StopImagePreviewTimer(){
    timerRunning = false;
    if(timerID!=null)
        clearTimeout(timerID);
}

function RepositionTimer(){
    if(floatimg != null && floatimg.style.display != 'none'){
        RepositionPreviewImage();
    }
    setTimeout(function(){RepositionTimer();}, 100);
}

/**
 * The main function to call to begin the process of popping-up the preview image.
 * Accepts an event object's target (usually, an image node).
 */
function ShowImagePreview(tg, src){
    StopImagePreviewTimer();
    
    //floatimg = document.getElementById('floatimg');
    
    //Invalidate current and older XHRs.
    xhrCnt++;
    //Get the expanded image url.
    floatimg.loaded = false;
    GetPreviewURL(floatimg, src, settings_zoom_size);
    if(floatimg.src == ''){
        return;
    }
    floatimg.loaded = true;
    //If the image is surrounded by an anchor tag, copy its href to the floatimg's parent anchor tag.
    //This helps if the user wants to click the image but the floating image gets "in the way".
    if(tg.parentNode && tg.parentNode.href){
        document.getElementById('floatimglink').href = tg.parentNode.href;
    }
    
    //Now to position and show the floating image.
    RepositionPreviewImage();
  
    //Finally, show the image.
    floatimg.style.display = 'block';
}

/**
 * This function resizes and positions the floating preview image node.
 * The function assumes that the image is already loaded or is already loading.
 * This function will not run if the user is currently pressing the ctrl-key down.
 */
function RepositionPreviewImage(){
    //floatimg = document.getElementById('floatimg');
    
    if(persistPreview==false && floatimg.loaded == true){
        var pageWidth  = PageWidth();
        var pageHeight = PageHeight();
        var maxWidth, maxHeight;
        var mouseX, mouseY;
        var cursorPadding;
        mouseX = global_mouse_x;
        mouseY = global_mouse_y;
        cursorPadding = 20;
        
        //Now to compute the display size of the floating image.
        if(settings_auto_size){
            maxWidth  = Math.floor(Math.max(100,pageWidth  * settings_x_factor));
            maxHeight = Math.floor(Math.max(100,pageHeight * settings_y_factor));
        }
        else{
            maxWidth  = Math.floor(Math.max(settings_max_width ,1));
            maxHeight = Math.floor(Math.max(settings_max_height,1));
        }
        //We only set the maximum size for the image. This way, the image will keep its aspect ratio.
        floatimg.style.maxWidth  = maxWidth+"px";
        floatimg.style.maxHeight = maxHeight+"px";
        
        //Reset the IMG position based on mouse position.
        if(settings_snap_to_cursor){
            var imgWidth=0, imgHeight=0, availableWidth=0, availableHeight=0;
            var displaySide = {horizontal: "right", vertical: "bottom"};
            var newTop = 0;
            
            //Find out the maximum available size in the x and y axes.
            availableWidth  = Math.max(pageWidth  - (int(mouseX) + int(cursorPadding) ), (mouseX - cursorPadding) );
            availableHeight = Math.max(pageHeight - (int(mouseY) + int(cursorPadding) ), (mouseY - cursorPadding) );
            
            //Resize the image container if the available area is not enough.
            floatimg.style.maxWidth  = Math.min(availableWidth , maxWidth )+"px";
            
            //Do this after manipulating the image's max size. Width and Height are only available after.
            imgWidth  = floatimg.width;
            imgHeight = floatimg.height;
            
            //Choose which side of the cursor the image should be displayed.
            if( (int(imgWidth)+int(cursorPadding)) > (pageWidth-mouseX) ){
                displaySide.horizontal = "left";
            }
            /*if( (int(imgHeight)+int(cursorPadding)) > (pageHeight-mouseY) ){
                displaySide.vertical = "top";
            }*/
            
            //Now to position the image.
            //First, decide on the horizontal position for the image.
            if(displaySide.horizontal == "left"){
                floatimg.style.right = int(mouseX) - int(cursorPadding) +"px";
                floatimg.style.left  = int(mouseX) - int(cursorPadding) - int(floatimg.width) +"px";
            }
            else if(displaySide.horizontal == "right"){
                floatimg.style.left  = int(mouseX) + int(cursorPadding) +"px";
                floatimg.style.right = int(mouseX) + int(cursorPadding) + int(floatimg.width) +"px";
            }
            
            //Next, decide on the vertical position for the image.
            /*
             *Here's my logic with this one (after MANY trial-and-error!):
             * By default, we want the image to appear below the mouse cursor. So, we set the preview's top to the mouseY, plus some padding.
             * Next, we check if, given this new top position, the image will go further than the page's height.
             * If so, we pull up the image's top by the amount that it exceeds the page's height.
             * This will make the preview image's bottom exactly align with the page's bottom automatically.
             */
            newTop = int(mouseY) + int(cursorPadding);
            if(newTop + imgHeight > pageHeight){
                newTop = newTop - (newTop+imgHeight - pageHeight);
            }
            floatimg.style.top = int(newTop) +"px";
            
        }
        else{
            //If the image is set not to follow the cursor, choose which corner of the screen to position the image in.
            //First, decide on the horizontal corner for the image.
            if(mouseX < pageWidth/2){
                floatimg.style.left = "auto";
                floatimg.style.right= "1px";
            }
            else{
                floatimg.style.right  = "auto";
                floatimg.style.left   = "1px";
            }
            //Next, decide on the vertical corner for the image.
            if(mouseY < pageHeight/2){
                floatimg.style.top    = "auto";
                floatimg.style.bottom = "1px";
            }
            else{
                floatimg.style.top    = "1px";
                floatimg.style.bottom = "auto";
            }
        }
    }
}


/**
 * Hide the floating image once the mouse cursor leaves an element.
 * This function is not event-driven by the browser but is called when
 * "DoMouseOver()" detects a change of target.
 */
function ImgDoMouseOut(){
    if(persistPreview==false){
        //Stop any timers:
        StopImagePreviewTimer();
        
        floatimg = document.getElementById('floatimg');
        //If the floating image is not yet created, exit.
        if(floatimg==null) return;
        floatimg.src = "";
        floatimg.loaded = false;
        floatimg.style.display='none';
        //Clear the floating link too.
        document.getElementById('floatimglink').href = "";
    }
}

/**
 * Event handler that captures control key presses.
 */
function DoKeyDown(e){
    if (e.ctrlKey){
        persistPreview = true;
    }
}

/**
 * Event handler that cleans-up actions done during the keydown actions.
 */
function DoKeyUp(e){
    if (e.keyCode == 17){
        persistPreview = false;
    }
}


/**
 * Add CSS for our custom elements.
 */
function AddScriptCSS(){
    //Common style
    var GM_style = 
      "img.GM_thumbnail { display:none; "+
        "height:auto !important;"+
        "max-height:" + newHeight + "px ; "+
        "max-width:"  + newWidth  + "px ; "+
        "width:auto !important; "+
        "position:   " + GMImg_position   + "   ; " +
        "margin-left:" + GMImg_marginleft + "px ; " +
        "margin-top:"  + GMImg_margintop  + "px ; " +
        "z-index:9999;"+
        "background-color:transparent !important;"+
        (GMImg_left  ==""?"":"left:"  +GMImg_left  + "px ; ") +
        (GMImg_top   ==""?"":"top:"   +GMImg_top   + "px ; ") +
        (GMImg_bottom==""?"":"bottom:"+GMImg_bottom+ "px ; ") +
        (GMImg_right ==""?"":"right:" +GMImg_right + "px ; ") +
        "} ";
    GM_style += 
        ".shadow {"+
            "-moz-box-shadow: 3px 3px 4px #000;"+
            "-webkit-box-shadow: 3px 3px 4px #000;"+
            "box-shadow: 3px 3px 4px #000;"+
        "}";
    GM_style += 
        "img#flute_settings_icon{ \
            position:fixed;\
            right:0px;\
            bottom:0px;\
            opacity:0.75;\
            z-index:99999999;\
        }";
    GM_style +=
        "#"+debug_msg_div+"{ \
            position:fixed;\
            left:0px;\
            top:0px;\
            background-color:white;\
            width:100%;\
            z-index:99999;\
            display:none;\
            max-height:200px;\
            overflow:scroll;\
        }";
    GM_addStyle(GM_style);
}


/**
 * Constructs the url for larger images from the base image url.
 */
function GetPreviewURL(floatimg, url, zoom_size){
    var replaceString = "";
    var zoomurl  = "";
    var nextzoom = "";
    //First, check if there's a URL lookup set for this URL:
    zoomurl = GetLookupURL(url);
    
    //Otherwise, 
    //1. Get the appropriate url replacement string to get the desired zoom level,
    //2. Check if the current image can further be reduced in size if the requested size cannot be found.
    if(zoomurl == ""){
        if(zoom_size == 'Large'){
          replaceString = "b";
          nextzoom = 'Medium';
        }
        else if(zoom_size == 'Medium'){
          replaceString = "z";
          nextzoom = 'Preview';
        }
        else if(zoom_size == 'Preview'){
          replaceString = "m";
          nextzoom = '';
        }
        else{
            replaceString = "m";
            nextzoom = '';
        }
        
        if(replaceString != ""){
            //First, remove any url query parameters.
            //url = url.replace(/(\?.*)$/,"");
            if(url.match(/\_([s|t|m|b|z|n])\.jpg$/)!= null){
                zoomurl = url.replace(/\_([s|t|m|b|z|n])\.jpg$/,"_"+replaceString+".jpg");
            }
            else{
                zoomurl = url.replace(/\.jpg$/,"_"+replaceString+".jpg");
            }
        }
    }
    
    if(zoomurl != ""){
        //Initiate the asynchronous check for the image size availability.
        ShowFloatimg("", false, "Loading...");
        CheckImage(floatimg, zoomurl, nextzoom, url);
    }
    return zoomurl;
}


/**
**Download the image and check if the given image is available at the preferred zoom level.
**If not, get a lower zoom level image URL.
**/
function CheckImage(floatimg, url, nextzoom, origURL) {
    var cur_xhr = xhrCnt;

    GM_xmlhttpRequest({
        method: 'HEAD',
        url: url,
        timeout: 1000,
        onload: function(response) {
            if(cur_xhr < xhrCnt){
                //If there's another newer xhr in progress, then discard this session.
                d("There is another XHR in progress ("+xhrCnt+"). Aborting current XHR ("+cur_xhr+")...");
                return;
            }
            try {
                d("Final URL: " +response.finalUrl + ", response status: "+response.status);
                if(response.finalUrl.match(/photo_unavailable/) || response.status == 503){
                    var msg = "Last zoom size does not exist for this image. Trying next size ("+nextzoom+")...";
                    d(msg,true);
                    ShowFloatimg("", false, msg);
                    var newUrl = GetPreviewURL(floatimg,url,nextzoom);
                }
                else if(response.status == 200){
                    ShowFloatimg(url, true, "");
                    RepositionPreviewImage();
                    /*Store this URL as the replacement URL for the next mouseover on the parent image.*/
                    SetLookupURL(origURL, url);
                }
            } catch(ex) {
                d("CheckImage(): "+ex);
            }
        },
        ontimeout: function(response){
            ShowFloatimg(url, true, "");
        }
    });
}


/**
 * 
 */
 function GetDisplayImageURL(elem){
    var url = "";
    //If not image, exit.
    if (elem.nodeName == 'IMG'){
        url = elem.src;
    }
    else if(elem.nodeName == 'DIV'){
        //Check if the div has a nested img tag that we can use.
        var child;
        for (var i = 0; i < elem.childNodes.length; i++) {
            child = elem.childNodes[i];
            if (child.nodeName == "IMG" && child.className == "pc_img") {
              url = child.src;
              break;
            }
        }
    }
    
    //First, remove any url query parameters.
    url = url.replace(/(\?.*)$/,"");
    return url;
 }


/**
 * Returns the replacement URL for a given URL, if any is set.
 */
function GetLookupURL(url){
    var retURL = "";
    for(var key in urlLookup){
        if(key == url){
            retURL = urlLookup[key];
        }
    }
    return retURL;
}

/**
 * Sets the replacement URL for a given URL, over-writting one if any was already set.
 */
function SetLookupURL(url,newURL){
    var prevURL = "";
    for(var key in urlLookup){
        if(key == url){
            prevURL = urlLookup[key];
        }
    }
    //Do the actual 'setting' here:
    urlLookup[url] = newURL;
    return prevURL;
}

/**
 * 
 */
function ShowFloatimg(src, loaded, alt){
    floatimg.src = src;
    floatimg.loaded = loaded;
    floatimg.alt = alt;
    floatimg.style.display = 'block';
}

/**
 * 
 */
function HideFloatimg(){
    floatimg.style.display = 'none';
    floatimg.src = "";
    floatimg.loaded = false;
    floatimg.alt = "";
}

/**
 * Try to remove those image protection attempts that impede this script's functionalities.
 */
function RemoveImageProtections(){
    /* Remove the "spaceball" image protections*/
    var divs = document.getElementsByClassName('spaceball');
    for(var idx = 0; idx < divs.length; idx++){
        divs[idx].parentNode.removeChild(divs[idx]);
    }
    divs = document.getElementsByClassName('play');
    for(var idx = 0; idx < divs.length; idx++){
        divs[idx].parentNode.removeChild(divs[idx]);
    }
}

/**
 * Returns the page width in pixels
 */
function PageWidth() {
    return window.innerWidth != null? window.innerWidth: document.body != null? document.body.clientWidth:null;
}

/**
 * Returns the page height in pixels
 */
function PageHeight() {
    return window.innerHeight != null? window.innerHeight: document.body != null? document.body.clientHeight:null;
}

/**
 * Helper function that parses and stores the mouse positon from an event object.
 */
function GetCoordinate(e){
    global_mouse_x = e.clientX + document.body.scrollLeft;
    global_mouse_y = e.clientY + document.body.scrollTop;
    return true
}

/**
 * Returns the integer representation of a string.
 */
function int(str){
  return parseInt(str);
}

/**
 * Custom debug output function for writing to Error Console.
 */
function d(msg,force){
    if(force==null) force=false;
    
    if(DEBUG==true || force==true){
        GM_log(msg);
        console.log(msg);
    }
}

/**
 * Custom debug output function that displays log output on the webpage.
 */
function message(msg,clearPrevious,force){
    if(force==null) force=false;
    if(clearPrevious==null) clearPrevious=true;
    
    if(DEBUG == true || force == true){
        console.log(msg);
        var msgdiv = document.getElementById(debug_msg_div);
        if(clearPrevious){
            msgdiv.innerHTML = msg;
        }
        else{
            msgdiv.innerHTML = msg+"<br />"+msgdiv.innerHTML;
        }
        msgdiv.style.display="block";
    }
}