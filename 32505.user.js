// ==UserScript==
// @name           SA Thumbnail Fix
// @namespace      something_awful
// @description    Improves handling of timg tags on Something Awful
// @include        http://forums.somethingawful.com/*
// ==/UserScript==

var max_img_width  = 170;
var max_img_height = 200;

GM_addStyle("img.timg"
    +"{"
        +"visibility:visible !important;"
        +"border:2px #0077AA solid !important;"
        +"max-height:200px;"
        +"max-width:170px;"
    +"}");
GM_addStyle("img.timg_big"
    +"{"
        +"border:2px #0077AA solid !important;"
        +"width:auto !important;"
        +"height:auto !important;"
    +"}");
GM_addStyle("span.timg_wrapper"
    +"{"
        +"position:relative;"
        +"white-space:nowrap;"
    +"}");
GM_addStyle("span.timg_sizer"
    +"{"
        +"visibility:hidden;"
        +"position:absolute;"

        +"background-color: #0077AA;"
        +"border:2px #0077AA solid;"
        +"color:white !important;"

        +"text-align:center;"
        +"cursor:pointer;"

        +"z-index:10;"
        +"left:0;"
        +"width:1em;"
        +"height:1em;"
    +"}");

var bigResize = GM_getValue("bigResize",false);
if(bigResize)
{
    GM_registerMenuCommand("Disable big resize",function() {
        bigResize = false;
        GM_setValue("bigResize",bigResize);
        window.location.reload();
    });
}
else
{
    GM_registerMenuCommand("Enable big resize",function() {
        bigResize = true;
        GM_setValue("bigResize",bigResize);
        window.location.reload();
    });
}

// Fallback for Firefox 2
if(document.getElementsByClassName)
{
    function getElementsByClassName(name,root)
    {
        if(!root) {
            root = document;
        }
        return Array.prototype.slice.call(root.getElementsByClassName(name));
    }
}
else
{
    function getElementsByClassName(name,root)
    {
        if(!root)
            root = document;
        var elts  = root.getElementsByTagName("*");
        var regex = new RegExp("\\b"+name+"\\b");
        var results = [];
        for(var i=0; i<elts.length; i++)
        {
            if(elts[i].className.match(regex))
                results.push(elts[i]);
        }
        return results;
    }
}

function init_image(img)
{
    if(img.naturalWidth  <= this.max_img_width && 
       img.naturalHeight <= this.max_img_height)
    {
        img.className = "img";
    }
    else
    {
        if     (img.width  > this.max_img_width ) img.width  = this.max_img_width;
        else if(img.height > this.max_img_height) img.height = this.max_img_height;

        var wrapper = document.createElement("span");
        var sizer   = document.createElement("span");
        wrapper.className = "timg_wrapper";
        sizer.className = "timg_sizer";
        sizer.innerHTML = "+";
        
        wrapper.appendChild(sizer);
        img.parentNode.insertBefore(wrapper,img);
        wrapper.appendChild(img);
        
        rehome_sizer(sizer,img);

        sizer.addEventListener("click",make_sizer(img,sizer),false);
        big_resize(img,make_sizer(img,sizer));
        
        // Prevent selecting the toggle under normal circumstances
        sizer.addEventListener("mousedown",function(e) {
            e.preventDefault();
        },false);

        wrapper.addEventListener("mouseover",function() {
            sizer.style.visibility="visible";
        },false);
         wrapper.addEventListener("mouseout",function() {
            sizer.style.visibility="";
        },false);
        
    }
}

function make_sizer(img,sizer)
{
    return function(e)
    {
        if(sizer.textContent == "+")
        {
            img.className = "timg_big";
            sizer.innerHTML = "-";
        }
        else
        {
            img.className = "timg";
            sizer.innerHTML = "+";
        }
        rehome_sizer(sizer,img);
        
        e.preventDefault();
    };
}

function big_resize(img,fcn)
{
    if(!bigResize)
        return;
    var node = img;
    while(node)
    {
        if(node.tagName == "A")
            return;
        node = node.parentNode;
    }

    img.addEventListener("click",fcn,false);
}

function rehome_sizer(sizer,img)
{
    sizer.style.top = img.offsetTop+"px";
}

function timg_onload()
{
    var posts = getElementsByClassName("postbody");
    for(var i=0; i<posts.length; i++)
    {
        var imgs = getElementsByClassName("timg",posts[i]);
        for(var j=0; j<imgs.length; j++)
            init_image(imgs[j]);
    }
}

window.addEventListener("load",timg_onload,false);