// ==UserScript==
// @name Smart Resize Images
// @namespace http://userscripts.org/users/57630
// @version 1.2
// @description Resize large images for better viewability.
// @include *
// @exclude http://*.google.com*/*
// @require http://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js
// ==/UserScript==

// This script is released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Based on "Fit Images" by Thorsten Willert
// (http://userscripts.org/scripts/show/33528)


//====================DEFAULT SETTINGS====================
// Edit this block if you're not using Firefox with Greasemonkey

// Resize images after page loads
var _resize_after_load = true;
// Both sides of image will not be resized to samller than corresponding side of viewable area * (Resize Limit)
var _resize_limit = 0.5;    // default = 0.5
// Padding between image and border of viewable area
var _padding = 50;          // default = 50
// Add border to resized images
var _add_border = true;     // default = true
// Auto resize when browser resolution changes
var _auto_resize = true;    // default = true
// Click to open resized image in a new window
var _new_window = true;     // default = true

//====================DO NOT MODIFY ANYTHING BELOW====================

// constants
const script_name = 'Smart Resize Images';
const LANGUAGE_TEXT = {
    en: {
        resize_after_load_label: 'Resize images after page loads:',
        resize_limit_label: 'Image will not become samller than proportion of viewport:',
        padding_label: 'Padding between image and viewport (in pixels):',
        add_border_label: 'Add border to resized images:',
        auto_resize_label: 'Auto resize when browser resolution changes:',
        new_window_label: 'Click resized image to open original image in a new window:',
        toggle_resize_menu: 'Resize/Unresize images',
        settings: 'Settings'
    },
    zh_tw: {
        resize_after_load_label: '網頁載入後自動縮圖：',
        resize_limit_label: '圖片的兩邊不會小於可視範圍的對應邊乘上此倍率：',
        padding_label: '圖片和可視範圍之間的空白大小(像素)：',
        add_border_label: '將縮小的圖片加上邊框：',
        auto_resize_label: '瀏覽器解析度改變時自動重新縮圖：',
        new_window_label: '點選縮圖後在新視窗開啟原圖：',
        toggle_resize_menu: '縮圖/取消縮圖',
        settings: '選項'
    }
}

// load settings
var lang = getLang();
if( typeof GM_config != 'undefined' ){ //for Firefox with Greasemonkey
    GM_config.init(script_name, { //initialize GM_config
        'resize_after_load':{
            'label': getText('resize_after_load_label'),
            'type': 'checkbox',
            'default': _resize_after_load
        },
        'resize_limit':{
            'label': getText('resize_limit_label'),
            'type': 'float',
            'default': _resize_limit
        },
        'padding':{
            'label': getText('padding_label'),
            'type': 'float',
            'default': _padding
        },
        'add_border':{
            'label': getText('add_border_label'),
            'type': 'checkbox',
            'default': _add_border
        },
        'auto_resize':{
            'label': getText('auto_resize_label'),
            'type': 'checkbox',
            'default': _auto_resize
        },
        'new_window':{
            'label': getText('new_window_label'),
            'type': 'checkbox',
            'default': _new_window
        }
    });

    var resize_after_load = GM_config.get('resize_after_load');
    var resize_limit = GM_config.get('resize_limit');
    var padding = GM_config.get('padding');
    var add_border = GM_config.get('add_border');
    var auto_resize = GM_config.get('auto_resize');
    var new_window = GM_config.get('new_window');

    // create menu item
    GM_registerMenuCommand(
        script_name + ': ' + getText('toggle_resize_menu'),
        function(){ toggleResize(); }
    );
    GM_registerMenuCommand(
        script_name + ': ' + getText('settings') + '...',
        function(){ GM_config.open(); }
    );
}else{ //other browsers
    var resize_after_load = _resize_after_load;
    var resize_limit = _resize_limit;
    var padding = _padding
    var add_border = _add_border;
    var auto_resize = _auto_resize;
    var new_window = _new_window;
}
var LinkColor = window.getComputedStyle(document.getElementsByTagName('a')[0], null)['color'];
var BorderStyle = "border: 0.25em groove " + LinkColor + ";";
var resized = false;

window.addEventListener("DOMNodeInserted", autoResize, false);
if( auto_resize ) window.addEventListener("resize", autoResize, false);
if( resize_after_load ) window.addEventListener("load", resizeImages, false);

//====================FUNCTIONS====================
function unresize() {
    if( resized==false ) return;
    
    var Images = document.getElementsByTagName('img');
    var ImgTitle;
    var RegEx = /Original Resolution - (\d+)x(\d+)px/;
    var i;

    for(i in Images){
        ImgTitle = Images[i].title;

        if ( ImgTitle && ImgTitle.indexOf("Original Resolution - ") != -1 ){
            RegEx.exec(ImgTitle);
            Images[i].setAttribute('width', RegExp.$1);
            Images[i].setAttribute('height', RegExp.$2);
            Images[i].title = ImgTitle.substr(0,ImgTitle.indexOf(" / Original") );
            if ( add_border ) Images[i].setAttribute('style', "" );
        }
    }
    
    resized = false;
}

function resizeImage(Image) {
    var InnerWidth = window.innerWidth;
    var InnerHeight = window.innerHeight;
    var ImgHeight, ImgWidth, ImgTitle;
    var ratio, needResizing;

    ImgHeight = Image.height;
    ImgWidth = Image.width;
    ImgTitle = Image.title;

    if ( Image.hasAttribute && Image.hasAttribute("usemap") ) return; //usemap: images that contain clickable areas
    //calculate ratio if need resizing
    ratio = 1;
    if( ImgWidth <= InnerWidth && ImgHeight <= InnerHeight ){
        //image smaller than viewport; don't resize
    }else if( ImgWidth/InnerWidth > ImgHeight/InnerHeight ){ //image is wider than viewport in ratio
        if( (ImgHeight/InnerHeight) / (ImgWidth/InnerWidth) > resize_limit ){
            ratio = (InnerWidth-padding) / ImgWidth;
        }else{
            ratio =  (InnerHeight*resize_limit) / ImgHeight;
        }
    }else{ // image is narrower than viewport in ratio
        if( (ImgWidth/InnerWidth) / (ImgHeight/InnerHeight) > resize_limit ){
            ratio = (InnerHeight-padding) / ImgHeight;
        }else{
            ratio = (InnerWidth*resize_limit) / ImgWidth;
        }
    }

    //resize if needed
    if( ratio < 1 ){
        if ( ImgTitle != "") ImgTitle += " / ";

        Image.setAttribute('title', ImgTitle + "Original Resolution - " + ImgWidth + "x" + ImgHeight + "px");
        Image.setAttribute('width', ImgWidth * ratio);
        Image.setAttribute('height', ImgHeight * ratio);

        if ( add_border ) Image.setAttribute('style',BorderStyle);

        if ( new_window ){
            Image.addEventListener("click",function(){window.open(this.getAttribute('src'),'newwin');},false);
            Image.style.cursor = 'pointer';
        }
    }
}

function resizeImages() {
    if( resized==true ) unresize();
    
    var i;
    var Images = document.getElementsByTagName('img');

    for(i in Images){
        resizeImage(Images[i]);
    }
    
    resized = true;
}

function autoResize() {
    if( resized==true ) resizeImages();
}

function toggleResize() {
    if( resized==true ) unresize();
    else resizeImages();
}

function getLang(){
    var lang = 'en';
    if ( navigator && navigator.language ){
        lang = navigator.language.toLowerCase().replace('-', '_');
        if( !LANGUAGE_TEXT[lang] ){
            if( lang.indexOf('zh_')==0 ) lang = 'zh_tw';
            else lang = 'en';
        }
    }
    return lang;
}

function getText(key){
    var data = LANGUAGE_TEXT[lang];
    var text = data[key];
    if( !text ) { data=LANGUAGE_TEXT['en']; text=data[key]; }
    if( !text ) { text = key; }
    return text;
}
