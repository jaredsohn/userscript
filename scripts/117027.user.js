// ==UserScript==
// @name           IMDB UTE: IMDB Ultimate Thumbnail Expander
// @description    Expands thumbnail images in IMDB into larger floating preview images on mouse hover.
// @namespace      http://myxp.anandkumar.me
// @include        http://www.imdb.com/*
// @require        https://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config.js
// @require        http://userscripts.org/scripts/source/50018.user.js
// @downloadURL    http://userscripts.org/scripts/source/117027.user.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// @grant          GM_log
// @grant          GM_addStyle
// @version        1.2.5
// ==/UserScript==

/**
Change Log:
Date      Version    Notes
20131011  1.2.5      *Reposition loaded image on a timer.
20130827  1.2.4      *Revert 1.2.1 since script was corrected by author.
20130804  1.2.3      *Updated rules for video thumbnail images.
20130426  1.2.2      *Changed require URLs to https.
20130108  1.2.1      *Moved the "gm_config extras" script with corrections to anandkumar.me domain.
20120829  1.2.0      *Added @grant directives to comply with Greasemonkey 1.0.
                     *Removed dependence on custom updater since Greasemonkey now has an internal updater.
                     *Copied the floating image repositioning logic from my Flickr script.
                     *Moved all floating image related code to a single class. This is the first step towards unifying my other scripts that use the same logic.
20120606  1.1.0      *Fine-tuned the image positioning algorithm.
                     *Added "Ctrl" key override to persist preview image.
20120604  1.0.2      *Added support for a delay timer and a corresponding configuration item under settings.
                     *Added support for the setting the preview image to "Snap to Cursor".
20111112  1.0.1      *Added missing escaping to some reg-expressions.
20111103  1.0.0      *Official release of script.
 */
var DEBUG     = false;
var newWidth  = "200";
var newHeight = "200";
var GMImg_position   = "absolute";
var GMImg_marginleft = "0";
var GMImg_margintop  = "0";
var GMImg_left   = "";
var GMImg_top    = "";
var GMImg_right  = "";
var GMImg_bottom = "";
var prevTarget = null;
var floatimg;
var timerRunning = false, timerID = null;
var global_mouse_x=0, global_mouse_y=0;
var persistPreview = false;

//From Config//
var settings_max_width, settings_max_height, settings_auto_size, settings_snap_to_cursor;
var settings_expand_actorimgs,settings_expand_titleimgs,settings_expand_previewimgs;
var settings_x_factor,settings_y_factor;
var settings_timer_ms;

var xhrCnt = 0;
var debug_msg_div = "flute_debug_msg_div";

var fio;
/**
 **Config screen
*/
var lang = GM_config.gets('lang','en'); // get the language - or set it to 'en' if it was not yet stored
GM_config.init('Configuration for IMDB UTE',{
    timer_ms : { label: 'Preview Delay (milliseconds)', type: 'int', default: 0, min: 0, max: 10000 },
    max_width: { label: 'Max Display Width:',section:['Preview Image properties'], type: 'int', default: 640, min: 50, max: 5000 },
    max_height:{ label: 'Max Display Height:', type: 'int', default: 480, min: 50, max: 5000 },
    auto_size: { label: 'Enable Auto size:', type: 'checkbox', default: true },
    x_factor : { label: 'Auto-size Screen Width % :', type: 'int', default: 60, min: 1, max: 100 },
    y_factor : { label: 'Auto-size Screen Height %:', type: 'int', default: 60, min: 1, max: 100 },
    snap_to_cursor : { label: 'Snap to Cursor', type: 'checkbox', default: false }
    /*expand_actorimgs  : { label: 'Actor Images', section:['Control which images get expanded'], type: 'checkbox', default: true },
    expand_titleimgs  : { label: 'Title Images', type: 'checkbox', default: true },
    expand_previewimgs: { label: 'Preview Images', type: 'checkbox', default: true }*/
  },
  GM_config.eCSS,
  {
    open: function() {
      var idx=0;
      GM_config.addBorder(); // add a fancy border
      GM_config.resizeFrame('480px','360px'); // resize the config window
      GM_config.addTooltip(idx++,'Set the delay (in milliseconds) to wait before displaying the preview image.');
      GM_config.addTooltip(idx++,'The maximum Width, in pixels, of the displayed image. Use this if you want to retreive large images but want to constrain the displayed image size.');
      GM_config.addTooltip(idx++,'The maximum Height, in pixels, of the displayed image. Use this if you want to retreive large images but want to constrain the displayed image size.');
      GM_config.addTooltip(idx++,'When enabled, the maximum width and height of the displayed image is automatically constrained to two-thirds of the browser window size. Selecting this option will ignore the custom maximum size settings above.');
      GM_config.addTooltip(idx++,'If Auto-Size is enabled, this option specifies the screen Width % to use.');
      GM_config.addTooltip(idx++,'If Auto-Size is enabled, this option specifies the screen Height % to use.');
      GM_config.addTooltip(idx++,'Enable this option to make the preview image follow the mouse cursor.');
      // GM_config.sections2tabs(); // convert the sections to tabs
      GM_config.fadeOut(); //Fadeout the rest of the screen.
    },
    save: function() { 
        //Update the settings and close the dialog
        GetUserSettings();
        //GM_config.fadeIn();
        GM_config.close();
    },
    close: function() {
        GM_config.fadeIn();
        //GM_config.close();
    }
  }
);

/**
 **Main code starts here
*/
(function(){
    try{
        if (typeof unsafeWindow != 'object') {
          window.unsafeWindow = window;
        }
        window.addEventListener('load'     ,function(event){Init  ();},true);
        window.addEventListener('mousemove',function(event){DoMouseOver(event);},true);
        window.addEventListener('keydown'  ,function(event){DoKeyDown  (event);},true);
        window.addEventListener('keyup'    ,function(event){DoKeyUp    (event);},true);
    }
    catch(e){
        GM_log(e.message);
    }
    GM_registerMenuCommand('imute: Configuration',GM_config.open);
})();

/**
 * Get the user-settings for this script.
 */
function GetUserSettings(){
    //Correct any incorrect settings
    
    //Read the settings into local variables.
    settings_max_width  = GM_config.get('max_width');
    settings_max_height = GM_config.get('max_height');
    settings_auto_size  = GM_config.get('auto_size');
    settings_x_factor   = GM_config.get('x_factor');
    settings_y_factor   = GM_config.get('y_factor');
    settings_snap_to_cursor = GM_config.get('snap_to_cursor');
    settings_timer_ms       = GM_config.get('timer_ms');
    //settings_expand_actorimgs  = GM_config.get('expand_actorimgs');
    //settings_expand_titleimgs  = GM_config.get('expand_titleimgs');
    //settings_expand_previewimgs = GM_config.get('expand_previewimgs');
    
    //Perform any validation and re-calculation of the retreived settings here.
    settings_x_factor = settings_x_factor/100;
    settings_y_factor = settings_y_factor/100;
}

/**
 * Handle all the initializations here.
 */
function Init(){
    var isInIFrame = (window.location != window.parent.location) ? true : false;
    if(isInIFrame) return;
    //Get the user's settings
    GetUserSettings();
    //Create and attach the floating image.
    var newlink;
    var settingsimg

    fio = new FloatImg();
    
    //Create the settings icon
    settingsimg = document.createElement('IMG');
    settingsimg.className="shadow";
    settingsimg.id="imute_settings_icon";
    settingsimg.alt="imute settings";
    settingsimg.src="data:image/png;base64,"+ "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";
    settingsimg.width  = "32";
    settingsimg.height = "32";
    settingsimg.loaded = "false";
    settingsimg.addEventListener('click', function(){GM_config.open();}, true);
    document.body.appendChild(settingsimg);
    
    var debugmsg = document.createElement('div');
    debugmsg.id  = debug_msg_div;
    document.body.appendChild(debugmsg);
    
    //Set defaults.
    GMImg_left = "1";
    GMImg_top  = "1";
    GMImg_position  = "fixed";
    AddScriptCSS();
    
    RepositionTimer();
}

/**
 * Handles the global mouseover event.
 * The main entry function from where everything is kicked-off.
 */
function DoMouseOver(e){
    //If the floating image is not yet initialized, exit.
    if(fio==null) return;
    //Get the event variable.
    if (!e) var e = window.event;
    var tg = (window.event) ? e.srcElement : e.target;
    //Extract the mouse co-ordinates
    GetCoordinate(e);
    //If the mouse is over the floatimg, either accidentally or deliberately, ignore it.
    if(tg.id == fio.getId()) return;
    //If the preview image must be repositioned upon mouse move, do it here:
    if(settings_snap_to_cursor){
        if(persistPreview==false){
            fio.reposition();
        }
        else{
            return;
        }
    }
    //If this mouseover event is for the same element as before, exit.
    //We are only interested when the mouse enters/leaves an element.
    if(prevTarget !=null && tg == prevTarget) {
        return;
    }
    //Store the current target to compare against in the next mouse over event.
    prevTarget = tg;
    
    //If the mouse is over any "other" element, hide the floating image.
    ImgDoMouseOut();
    //If the target does not have a valid image, url, exit.
    var img_src = GetDisplayImageURL(tg);
    if(img_src == "") return;

    //If the current image does not meet criteria, exit.
    if(!canBeExpanded(img_src) || img_src.match(/\/nopicture|nophoto\//)){
        return;
    }
    /**END of validations**/
    
    //Once all the validations are passed, kick-start the image preview process.
    fio.srcElem = tg;
    StartImagePreviewTimer(tg);
}


/**
 * Starts the preview image display timer.
 */
function StartImagePreviewTimer(tg){
    //First, stop the global timer, if it's running.
    if(timerRunning){
       StopImagePreviewTimer();
    }
    timerRunning = true;
    timerID = setTimeout(function(){ShowImagePreview(tg);}, settings_timer_ms);
    timerID = setTimeout(function(){ShowImagePreview(tg);}, settings_timer_ms);
}

/**
 * Stops the active global timer.
 */
function StopImagePreviewTimer(){
    timerRunning = false;
    if(timerID!=null)
        clearTimeout(timerID);
}

/**
 * Before the new image loads, the image size is not known. This results in the image not positioned correctly until the user moves the mouse.
 * So, keep repositioning the image on a timer.
 */
function RepositionTimer(){
    if(fio != null && fio.isLoaded()){
        fio.reposition();
    }
    setTimeout(function(){RepositionTimer();}, 100);
}

/**
 * The main function to call to begin the process of popping-up the preview image.
 * Accepts an event object's target (usually, an image node).
 */
function ShowImagePreview(tg){
    StopImagePreviewTimer();
    
    //Invalidate current and older XHRs.
    xhrCnt++;
    //Get the expanded image url.
    var zoomedUrl = GetPreviewURL(tg, 1000, settings_max_width, settings_max_height);
    
    //message("zoomedUrl="+zoomedUrl,false,true);
    if(zoomedUrl != ""){
        //Assign the unchecked image URL so that the image displays immediately.
        fio.setUrl(zoomedUrl);
        if(persistPreview==false){
            //Do not reposition if the user is currently pressing the ctrl-key down.
            fio.reposition();
        }
    }
    else{
        fio.clear();
        return;
    }
    
    //If the image is surrounded by an anchor tag, copy its href to the floatimg's parent anchor tag.
    //This helps if the user wants to click the image but the floating image gets "in the way".
    if(tg.parentNode && tg.parentNode.href){
        fio.setLinkUrl(tg.parentNode.href);
    }
    else if(tg.href){
        fio.setLinkUrl(tg.href);
    }
    
    //Finally, show the image.
    fio.show();
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
        
        //If the floating image is not yet created, exit.
        if(fio==null) return;
        fio.clear();
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
        "img#imute_settings_icon{ "+
            "position:fixed;"+
            "right:0px;"+
            "bottom:0px;"+
            "opacity:0.75"+
        "}";
    GM_style +=
        "#"+debug_msg_div+"{ "+
            "position:fixed;"+
            "left:0px;"+
            "top:0px;"+
            "background-color:white;"+
            "width:100%;"+
            "z-index:99999;"+
        "}";
    GM_addStyle(GM_style);
}


/**
 * Checks if the image can be expanded or not.
 */
function canBeExpanded(img_url){
    var bRet = false;
    if(img_url.match(/\_CR(\d+),(\d+),(\d+),(\d+)/)){ //For imdb hosted images.
        bRet = true;
    }
    else if(img_url.match(/\_SX\d+/) || img_url.match(/\_SY\d+/)){
        bRet = true;
    }
    else if(img_url.match(/\_AA\d+\_/)){ //For amazon hosted images for imdb.
        bRet = true;
    }
    else if (img_url.match(/\_SS\d+/)){
        bRet = true;
    }
    else if(img_url.match(/fbcdn-profile(.*)_q.jpg$/)){
        //Expand facebook profile images
        bRet = true
    }
    //message(img_url+".match(/fbcdn-profile(.*)_q.jpg$/) = "+img_url.match(/fbcdn-profile(.*)_q.jpg$/),true,true);
    return bRet;
}


/**
 * Given a target element, this function returns the image url associated with the element.
 * Note: The image url returned is not validated.
 */
 function GetDisplayImageURL(elem){
    var url = "";
    if (elem.nodeName == 'IMG'){
        url = elem.src;
    }
    else if (elem.nodeName == 'LI' || elem.nodeName == 'DIV'){
        if(elem.style!= null && elem.style.backgroundImage!= null) {
            try{
                url = elem.style.backgroundImage.match(/\"(.*)\"/)[1];
            }catch(e){
                d(e);
                return "";
            }
        }
    }
    return url;
 }
 

/**
* Custom zooming function for imdb after MANY trial and error!
**/
function GetPreviewURL(tg,newSize,imgWidth,imgHeight){
  var zoomedUrl;
  var url = GetDisplayImageURL(tg);
  //message("url="+url,true,true);
  if(url == "") return;
  
  //Try to expand facebook profile pictures.
  if(url.match(/fbcdn-profile(.*)_q.jpg$/)){
        zoomedUrl = url.replace(/_q.jpg$/,"_b.jpg");
        message("zoomedurl="+zoomedUrl,true,true);
        return zoomedUrl;
  }
  
  var urlSX = url.match(/\_SX\d+/)==null?"":url.match(/\_SX(\d+)/)[1];
  var urlSY = url.match(/\_SY\d+/)==null?"":url.match(/\_SY(\d+)/)[1];
  var urlSS = url.match(/\_SS\d+/)==null?"":url.match(/\_SS(\d+)/)[1];;
  //var imgType = url.split('.').pop();
  var urlC1 = "", urlC2 = "", urlC3 = "", urlC4 = "";
  var urlRatio, imgRatio;
  var newX, newY, newWidth, newHeight;
  var cropArr = url.match(/\_CR(\d+),(\d+),(\d+),(\d+)/);
  if (cropArr != null){
    urlC1 = cropArr[1];
    urlC2 = cropArr[2];
    urlC3 = cropArr[3];
    urlC4 = cropArr[4];
    newX = urlC1;
    newY = urlC2;
    /*urlRatio  = 1.00;
    newWidth  = urlC3;
    newHeight = urlC4;
    if (urlC1 != ""){
      urlRatio = newWidth/newHeight;
    }*/
  }
  else if(urlSX !="" || urlSY != ""){
    //No CR found. Using SX, SY
    /*newWidth  = parseInt(urlSX==""?newSize:urlSX);
    newHeight = parseInt(urlSY==""?newSize:urlSY);
    urlRatio  = newWidth / newHeight;*/
  }
  
  imgWidth  = parseInt(imgWidth);
  imgHeight = parseInt(imgHeight);
  imgRatio  = imgWidth / imgHeight;
  
  //Actual Zooming takes place here
  if (imgRatio < 1.0){
    newHeight  = newSize;
    newWidth = Math.round(newSize * imgRatio);
  }
  else if (imgRatio > 1.0){
    newWidth  = newSize;
    newHeight = Math.round(newSize / imgRatio);
  }
  else{
    newWidth  = newSize;
    newHeight = newSize;
  }
  
  if(urlC1 != "" && urlC1 != "0") {
    newX = parseInt(urlC1) + parseInt(newWidth);
  }
  if(urlC2 != "" && urlC2 != "0") {
    newY = 0 + parseInt(urlC2) + parseInt(newHeight);
  }

  /*
  GM_log("urlC1 = "+urlC1+", urlC2 = "+urlC2+", urlC3 = "+urlC3+", urlC4 = "+urlC4);
  GM_log( "urlRatio="+urlRatio+" , newWidth="+newWidth+" newHeight="+newHeight );
  */
  zoomedUrl = url;
  /*If we have both the CR and SS, just change the SS to preserve correct cropping.*/
  if(zoomedUrl.match(/\_CR\d+/) != null && zoomedUrl.match(/\_SS\d+_/) != null){
    zoomedUrl = zoomedUrl.replace(/\_SS\d+\_/, "_SS"+newSize+"_");
  }
  else{
    //zoomedUrl = zoomedUrl.replace(/_CR\d+,\d+,\d+,\d+_/, "_CR" + newX + "," + newY + "," + newWidth + "," + newHeight + "_");
    zoomedUrl = zoomedUrl.replace(/\_CR\d+,\d+,\d+,\d+\_/g, "_CR" + newX + "," + newY + ",0,0" + "_");
    zoomedUrl = zoomedUrl.replace(/\_SS\d+\_/, "");
  }
  /*Always replace SX and SY, if present.*/
  zoomedUrl = zoomedUrl.replace(/\_SY\d+\_/, "_SY"+newHeight+"_");
  zoomedUrl = zoomedUrl.replace(/\_SX\d+\_/, "_SX"+newWidth+"_");
  /*Prevent too large an image from being used by Squaring it.*/
  if(zoomedUrl.match(/\_CR\d+/) != null){
    if(urlC3 < newWidth || urlC4 < newHeight){
      zoomedUrl = zoomedUrl.replace(/\_SS\d+\_/, "");
    }
    else{
      zoomedUrl = zoomedUrl.replace(/\_SS\d+\_/, "_SS"+newSize+"_");
    }
  }
  if(url.match(/\_AA\d+\_/)){ //For amazon hosted images for imdb.
    zoomedUrl = zoomedUrl.replace(/\_AA(\d+)\_/, "_");
  }
  
  /*Erase any Border Overlays in the URL to get a clean image*/
  zoomedUrl = zoomedUrl.replace(/\_BO.+\_/, "");
  zoomedUrl = zoomedUrl.replace(/_PIimdb\-blackband\-.+\_/,"");
  
  /*Zero-out the SP param (needs more research)*/
  zoomedUrl = zoomedUrl.replace(/_SP\d+,\d+/,"_SP0,0");
  
  return zoomedUrl;
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
 * Custom debug output function for writing to Error Console.
 */
function d(msg,force){
    if(force==null) force=false;
    
    if(DEBUG==true || force==true){
        GM_log(msg);
    }
}

/**
 * Custom debug output function that displays log output on the webpage.
 */
function message(msg,clearPrevious,force){
    if(force==null) force=false;
    if(clearPrevious==null) clearPrevious=true;
    
    if(DEBUG == true || force == true){
        var msgdiv = document.getElementById(debug_msg_div);
        if(clearPrevious){
            msgdiv.innerHTML = msg;
        }
        else{
            msgdiv.innerHTML += "<br />"+msg;
        }
    }
}

/**
 * Common class representing the floating preview image container.
 */
function FloatImg(img){
    var element; //The image element represented by this class;
    var link_element; //The (optional) anchor element.
    var link_url; //The url to navigate to when the image is clicked.
    var srcElem; //From which element was the image url captured.
    var loaded;
    var id;
    var width, height; //Image dimensions.
    /*var url; //The image url.
    var top, bottom, left, right; //Image style co-ordinates.
    var maxWidth, maxHeight; //Image style dimentions.*/
    var thisObj = this;
    
    this.getImageElement = GetImageElement;
    this.setLinkElement  = SetLinkElement;
    this.getId       = GetId;
    this.setUrl      = LoadImg;
    this.clear       = Clear;
    this.show        = Show;
    this.reposition  = RepositionPreviewImage;
    this.setSrc      = SetSrc;
    this.setLinkUrl  = SetLinkUrl;
    this.setTop      = SetTop;
    this.getTop      = GetTop;
    this.setBottom   = SetBottom;
    this.getBottom   = GetBottom;
    this.setLeft     = SetLeft;
    this.getLeft     = GetLeft;
    this.setRight    = SetRight;
    this.getRight    = GetRight;
    this.setWidth    = SetWidth;
    this.getWidth    = GetWidth;
    this.setHeight   = SetHeight;
    this.getHeight   = GetHeight;
    this.setMaxWidth = SetMaxWidth;
    this.getMaxWidth = GetMaxWidth;
    this.setMaxHeight= SetMaxHeight;
    this.getMaxHeight= GetMaxHeight;
    this.isLoaded    = GetLoaded;
    this.setLoaded   = SetLoaded;

    //Perform object initialization.
    //"img" is the floating image element.
    if(img){
        try{
            this.element = img;
            this.id      = img.id;
            this.Clear();
        }
        catch(e){
            d(e.message);
        }
    }
    else{
        //Try to create a floating image.
        this.element = document.createElement('IMG');
        this.element.className = 'GM_thumbnail shadow';
        this.element.id  = "floatimg";
        this.element.src = "";
        this.element.alt = "Loading...";
        
        //Now create the surrounding link element.
        this.link_element = document.createElement('A');
        this.link_element.id="floatimglink";
        this.link_element.href="";
        this.link_element.appendChild(this.element);
        document.body.appendChild(this.link_element);
    }

    /**
     * Function to initiate loading of an image into the floating image container.
     * @param callback A function to call once the image has been loaded into cache. If given, then the image is displayed only once the image has been downloaded.
     */
    function LoadImg(url,callback) {
        if(callback){
            var img  = new Image();
            var that = this;
            img.onload = function(){
                /*message("New height="+this.height,true,false);
                message("New width="+this.width,true,true);*/
                that.height = this.height;
                that.width  = this.width;
                if(callback){
                    that.setSrc(url);
                    that.setLoaded(true);
                    callback();
                }
                return true;
            };
            img.onerror = function(){
                d('Image '+url+' could not be loaded...');
            };
            
            img.src = url;
            this.setLoaded(false);
        }
        else{
            this.clear(true);
            this.element.src = url;
            this.setLoaded(true);
        }
    }
    
    /**
     * Clears the image url and link, and hides the image element.
     */
    function Clear(onlyImg){
        //Clear the image.
        this.setLoaded(false);
        this.element.src = "";
        this.element.style.display='none';
        
        if(onlyImg==null || onlyImg == false){
            //Clear the link.
            this.link_url = "";
        }
    }
    
    function Show(){
        this.element.style.display = 'block';
    }
    
    /**
     * This function resizes and positions the floating preview image node.
     * The function assumes that the image is already loaded or is already loading.
     * TODO::Declare local variables for the "settings_*" variables inside the class.
     */
    function RepositionPreviewImage(){
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
        this.setMaxWidth (maxWidth);
        this.setMaxHeight(maxHeight);
        
        //Reset the IMG position based on mouse position.
        if(settings_snap_to_cursor){
            var imgWidth=0, imgHeight=0, availableWidth=0, availableHeight=0;
            var displaySide = {horizontal: "right", vertical: "bottom"};
            var newTop = 0;
            
            //Find out the maximum available size in the x and y axes.
            availableWidth  = Math.max(pageWidth  - (int(mouseX) + int(cursorPadding) ), (mouseX - cursorPadding) );
            availableHeight = Math.max(pageHeight - (int(mouseY) + int(cursorPadding) ), (mouseY - cursorPadding) );
            
            //Resize the image container if the available area is not enough.
            this.setMaxWidth( Math.min(availableWidth,maxWidth) );
            //fio.setMaxHeight( Math.min(availableHeight,maxHeight) );
            
            //Do this after manipulating the image's max size. Width and Height are only available after.
            imgWidth  = this.getWidth();
            imgHeight = this.getHeight();
            
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
                this.setRight( int(mouseX) - int(cursorPadding) );
                this.setLeft( int(mouseX) - int(cursorPadding) - int(imgWidth) );
            }
            else if(displaySide.horizontal == "right"){
                this.setLeft( int(mouseX) +int(cursorPadding) );
                this.setRight( int(mouseX) + int(cursorPadding) + int(imgWidth) );
            }
            
            //Next, decide on the vertical position for the image.
            /*
             *Here's my logic with this one (after MANY trial-and-error!):
             * By default, we want the image to appear below the mouse cursor. So, we set the preview's top to the mouseY, plus some padding.
             * Next, we check if, given this new top position, the image will go further than the page's height.
             * If so, we pull up the image's top by the amount that it exceeds the page's height.
             * This will make the preview image's bottom exactly align with the page's bottom automatically.
             * TODO::Check if, after correcting the image's bottom, the image's top goes above the screen. If so, shrink the image by the overflowing amount.
             */
            newTop = int(mouseY) + int(cursorPadding);
            if(newTop + imgHeight > pageHeight){
                newTop = newTop - (newTop+imgHeight - pageHeight);
            }
            this.setTop( int(newTop) );
            
        }
        else{
            //If the image is set not to follow the cursor, choose which corner of the screen to position the image in.
            //First, decide on the horizontal corner for the image.
            if(mouseX < pageWidth/2){
                this.setLeft(); //Set to "auto"
                this.setRight(1);
            }
            else{
                this.setRight(); //Set to "auto"
                this.setLeft(1);
            }
            //Next, decide on the vertical corner for the image.
            if(mouseY < pageHeight/2){
                this.setTop(); //Set to "auto"
                this.setBottom(1);
            }
            else{
                this.setTop(1);
                this.setBottom(); //Set to "auto"
            }
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
     * Returns the integer representation of a string.
     */
    function int(str){
      return parseInt(str);
    }

    
    function SetSrc(src){
        this.element.src = src;
    }
    
    function GetId(){
        return this.id;
    }
    
    function SetLinkElement(elem){
        this.link_element = elem;
    }
    
    function SetLinkUrl(url){
        this.link_element.href = url;
    }
    
    function GetLinkUrl(){
        return this.link_element.href;
    }
    
    function GetImageElement(){
        return this.element;
    }
    
    function GetHeight(){
        return this.element.height;
    }
    
    function SetHeight(height){
        this.element.height = height;
    }
    
    function GetWidth(){
        return this.element.width;
    }
    
    function SetWidth(width){
        this.element.width = width;
    }
    
    function GetMaxWidth(){
        return this.element.style.maxWidth;
    }
    
    function SetMaxHeight(height){
        this.element.style.maxHeight = height+"px";
    }
    
    function GetMaxHeight(){
        return this.element.style.maxHeight;
    }
    
    function SetMaxWidth(width){
        this.element.style.maxWidth = width+"px";
    }
    
    function GetMaxWidth(){
        return this.element.style.maxWidth;
    }
    
    function GetTop(){
        return this.element.style.top;
    }
    
    function SetTop(top){
        if(top){
            this.element.style.top = top+"px";
        }
        else{
            this.element.style.top = "auto";
        }
    }
    
    function GetBottom(){
        return this.element.style.bottom;
    }
    
    function SetBottom(bottom){
        if(bottom){
            this.element.style.bottom = bottom+"px";
        }
        else{
            this.element.style.bottom = "auto";
        }
    }
    
    function GetLeft(){
        return this.element.style.left;
    }
    
    function SetLeft(left){
        if(left){
            this.element.style.left = left+"px";
        }
        else{
            this.element.style.left = "auto";
        }
    }
    
    function GetRight(){
        return this.element.style.right;
    }
    
    function SetRight(right){
        if(right){
            this.element.style.right = right+"px";
        }
        else{
            this.element.style.right = "auto";
        }
    }
    
    function GetLoaded(){
        return this.loaded;
    }
    
    function SetLoaded(loaded){
        this.loaded = loaded;
    }
}
