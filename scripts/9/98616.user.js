// ==UserScript==
// @name           weheartit bookmarklet with shortcut key (shift + h)
// @namespace      weheartit
// @description    Use the WeHeartIt Bookmarklet without the bookmarklet but a short cut key instead (shift + h)
// @include        *
// ==/UserScript==

// HELPER FUNCTIONS
function findPosX(obj){
    var posLeft = 0;
    try{
        var imageBorderLeft = getComputedStyle(obj, '').getPropertyValue('border-left-width');
        var imagePaddingLeft = getComputedStyle(obj, '').getPropertyValue('padding-left');
    }
    catch(e){
        var imageBorderLeft = obj.currentStyle.borderLeftWidth;
        var imagePaddingLeft = obj.currentStyle.paddingLeft;
    }

    posLeft += parseFloat(imageBorderLeft);
    posLeft += parseFloat(imagePaddingLeft);
    if(obj.offsetParent){
        while(1){
            posLeft += obj.offsetLeft;
            if(!obj.offsetParent){
                break;
            }
            obj = obj.offsetParent;
        }
    }
    else if(obj.x){
        posLeft += obj.x;
    }
    return posLeft;
}

function findPosY(obj){
    var posTop  = 0;
    try{
        var imageBorderTop  = getComputedStyle(obj, '').getPropertyValue('border-top-width');
        var imagePaddingTop  = getComputedStyle(obj, '').getPropertyValue('padding-top');
    }
    catch(e){
        var imageBorderTop  = obj.currentStyle.borderTopWidth;
        var imagePaddingTop  = obj.currentStyle.paddingTop;
    }
    posTop  += parseFloat(imageBorderTop);
    posTop  += parseFloat(imagePaddingTop);
    if(obj.offsetParent){
        while(1){
            posTop  += obj.offsetTop;
            if(!obj.offsetParent){
                break;
            }
            obj = obj.offsetParent;
        }
    }
    else if(obj.y){
        posTop += obj.y;
    }
    return posTop;
}

// DETECT CHARSET OF THE PAGE
function getCharSet() {
   var docCharSet = document.characterSet;
   if (docCharSet === undefined) {
       docCharSet = document.charset;
   }
   return docCharSet;
}

// DISPLAY A WARNING WINDOW
function whiAlertWindow(thecontent){
    addCss();
    var whiWindow = document.createElement("div");
    whiWindow.setAttribute("id","whi-window");
    whiWindow.innerHTML = "<div class=\"whi-closewindow\" onclick=\"this.parentNode.style.display='none'\">close</div>";
    whiWindow.innerHTML += thecontent;

    document.body.appendChild(whiWindow);
}

// GET BASIC INFO
var pageTitle = document.title;
if(!pageTitle.length){ pageTitle = "Untitled"; }
var pageUrl = location.href;
var pageTags = "";
// var meta = document.getElementsByTagName("meta");
// for(m=0;m<meta.length;m++){ if(meta[m].name == "keywords"){ pageTags += meta[m].content; } }


// FINDING THE IMAGES
function findImages(){

    var foundImages = document.images;
    var invalidCount = 0;
    var validCount = 0;

    // loop images to validate
    for(i=0;i<foundImages.length;i++){
        var image = foundImages[i];
        if((image.width < 240)
        || (image.height < 200)
        || (image.src.match("spaceball|dot|clear|spacer|pixie|pixel|dont_steal|blank|empty"))
        || (image.name == "gmi-ResViewSizer_fullimg") // deviantart.com
        || (image.style.display == "none") // lookbook.nu
        ){
            // not valid, add one to the invalid count
            invalidCount++;
        }else{
            // it's a valid image, create the button
            validCount++;
            image.setAttribute("class","whi-valid");
            createButton(image);
        }
    }

    // warn invalid images
    if(invalidCount > 0){
        var whiAlert = document.getElementById('whi-alert');
        whiAlert.innerHTML = "images without a pink border can't be hearted.";
    }

    // warn no images found
    if(validCount == 0){
        whiAlertWindow("<strong>Sorry</strong> <span>We couldn't find any image that you can heart on this page.</span> <a href='http://help.weheartit.com/kb/bookmarklet-extensions-and-adding-images-to-the-site/invalid-images' target='_blank'>why is that?</a>");
    }

}

// CREATING BUTTON OVER IMAGE
function createButton(image){

    var hover = document.createElement("div");

    hover.setAttribute("class","whi-hover");
    hover.style.width = (image.width - 16) + "px";
    hover.style.height = (image.height - 16) + "px";
    hover.style.top = (findPosY(image)) + "px";
    hover.style.left = (findPosX(image)) + "px";

    var hoverHTML = "";
    hoverHTML += "<form action='http://weheartit.com/create_entry/' method='get' target='_blank' onsubmit='hearted(this)'>";
    hoverHTML += "<input type='hidden' value='" + image.src + "' name='media' />";
    hoverHTML += "<input type='hidden' value='" + getCharSet() + "' name='encoding' />";
    // hoverHTML += "<div class='whi-tags'><span>title:</span><input type='text' value='"+ pageTitle +"' name='title' /></div>";
    hoverHTML += "<div class='whi-title'>"+ pageTitle +" <input type='hidden' value='" + pageTitle.replace(/'/g, "&#39;") + "' name='title' /></div>";
    hoverHTML += "<div class='whi-source'>"+ pageUrl +" <input type='hidden' value='" + pageUrl + "' name='via' /></div>";
    hoverHTML += "<div class='whi-tags'><span>tags:</span><input type='text' value='" + pageTags + "' placeholder='separate with comma' name='tags' /></div>";
    hoverHTML += "<div class='whi-submit'>";
    // hoverHTML += "<div class='whi-unsafe'><label><input type='checkbox' value='yes' name='unsafe' /> is it unsafe?</label></div>";
    hoverHTML += "<input type='submit' value='save it on my heart' class='whi-btn' /></div>";
    hoverHTML += "</form>"

    hover.innerHTML = hoverHTML;

    var whiContents = document.getElementById('whi-contents');
    whiContents.appendChild(hover);
}

function hearted(theform){
    theform.setAttribute("class","whi-hearted");
}

// CREATING THE TOP BAR
function createBar(){

    var whiContents = document.createElement("div");
    whiContents.setAttribute("id","whi-contents");
    document.body.appendChild(whiContents);

    var whiCover = document.createElement("div");
    whiCover.setAttribute("id","whi-cover");
    whiContents.appendChild(whiCover);

    var whiBar = document.createElement("div");
    whiBar.setAttribute("id","whi-bar");

    whiBarHTML  = "<div class='whi-text'>add tags to the images you want, and save them on your heart. <span id='whi-alert'></span></div>";
    whiBarHTML += "<input type='button' value='close' onclick=\"var whiContents = document.getElementById('whi-contents');document.body.removeChild(whiContents);var whiCss = document.getElementById('whi-css');document.getElementsByTagName('head')[0].removeChild(whiCss);\" class='whi-close' />";
    whiBarHTML += "<div class='whi-help'><a href='http://help.weheartit.com/' target='_blank'>help</a><ul><li><a href='http://help.weheartit.com/kb/bookmarklet-extensions-and-adding-images-to-the-site/the-bookmarklet' target='_blank'>using the bookmarklet</a></li><li><a href='http://help.weheartit.com/discussions/problems-with-the-bookmarklet-or-browser-extensions' target='_blank'>report a bug</a></li><li><a href='http://help.weheartit.com/discussion/new' target='_blank'>send us a message</a></li></ul></div>";

    whiBar.innerHTML = whiBarHTML;
    whiContents.appendChild(whiBar);
}

// STYLE IT ALL
function addCss(){
    var whiCss = document.createElement("link");
    whiCss.rel = "stylesheet";
    whiCss.type = "text/css";
    whiCss.href = "http://weheartit.com/stylesheets/bookmarklet.css";
    whiCss.setAttribute("id","whi-css");
    document.getElementsByTagName("head")[0].appendChild(whiCss);
}

// REMOVE EVERYTHING
function whiClear(){
    // var whiScript = document.getElementById('whi');
    // document.body.removeChild(whiScript);

    var whiContents = document.getElementById('whi-contents');
    document.body.removeChild(whiContents);

    var whiCss = document.getElementById('whi-css');
    document.getElementsByTagName("head")[0].removeChild(whiCss);
}

// MAKE IT HAPPEN
function makeItHappen(){
    if(pageUrl.match("weheartit.com")){
        whiAlertWindow("<strong>Hey!</strong> <span>You're trying to use the bookmarklet on weheartit.com, but on our site you can just click on the heart button over the image.</span> <a href='http://help.weheartit.com/kb/bookmarklet-extensions-and-adding-images-to-the-site/hearting-un-hearting-images' target='_blank'>need some help with that?</a>");
    }
    else if(pageUrl.match("tumblr.com/dashboard|google.com/reader")){
        whiAlertWindow("<strong>Hey!</strong> <span>You're trying to get images from a page that only you have access to. Please open the permalink on another window and heart from there.</span> <a href='http://help.weheartit.com/kb/bookmarklet-extensions-and-adding-images-to-the-site/hearting-from-private-pages' target='_blank'>need some help with that?</a>");
    }
    else if(pageUrl.match("vimeo.com|youtube.com")){
        alert("We're still updating our bookmarklet \nYou'll be able to bookmark videos later.");
    }
    else if(!document.getElementById('whi-bar') && !pageUrl.match(".jpg|.png|.gif")){
        addCss();
        createBar();
        findImages();
    }
    else if(document.getElementById('whi-bar') && !pageUrl.match(".jpg|.png|.gif")){
        whiClear();
        addCss();
        createBar();
        findImages();
    }
    else if(pageUrl.match(".jpg|.png|.gif")){
        alert("You can only heart images from websites, \nnot the image directly on the browser. \n\nPlease go back to the site and heart from there.");
        window.open("http://help.weheartit.com/kb/bookmarklet-extensions-and-adding-images-to-the-site/hearting-images-directly","whiwindow");
    }
}


window.addEventListener ("keydown", function(event){
        if(event.shiftKey && event.keyCode == 72){
            makeItHappen();
        }
        
    }, false);