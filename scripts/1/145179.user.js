// ==UserScript==
// @id             4CPZ
// @name           4Chan Photo Zoomer
// @version        1.1
// @namespace      heartripperdesign@gmail.com
// @author         Heartripper
// @description    
// @include        *boards.4chan.org*
// @run-at         document-end
// @require  http://userscripts.org/scripts/source/44063.user.js
// ==/UserScript==

const LOADING_IMAGE = "http://imgf.tw/484743309.gif";

function log(msg){
	var console = (unsafeWindow && unsafeWindow.console) ? unsafeWindow.console : window.console;
	var prefixedMsg = "[4CPZ] " + msg;
	if(console.log && typeof console.log == "function"){
		console.log(prefixedMsg);
	}else {
		alert(prefixedMsg);
	}
}

function Zoomer(){
    //Create HTML Elements
    var container = (new Element("div", {
        id: "ZoomerContainer",
        styles: {
            position: "fixed",
            opacity: "0",
            boxShadow: "0 0 10px rgba(0,0,0,.3)"
        },
        tween: {
            duration: 100,
            transition: 'linear',
            link: 'cancel'  
        }
    })).inject(document.body);
    
    var img = (new Element("img", {
        styles: {
            display: "block"
        }
    })).inject(container);
    
    var loadingImg = (new Element("div", {
        styles: {
            padding: "10px",
            background: "white",
            display: "block"
        }
    })).grab(new Element("img", {
        src: LOADING_IMAGE,
        styles: {
            display: "block"
        }
    })).inject(container);

    //Adds methods to container object;
    var addendum = {
        getImg: function(){
            return img;
        },
        getContainer: function(){
            return container;
        },
        showLoading: function(){
            img.style.display = 'none';
            loadingImg.style.display = 'block';
        },
        showImg: function(){
            img.style.display = 'block';
            loadingImg.style.display = 'none';
        }
    }
            
    for(k in addendum){
        if(addendum.hasOwnProperty(k)){
            this.container[k] = addendum[k];
        }
    }
}

Zoomer.prototype = {
    container: {
        show: function(){
            this.getContainer().tween("opacity", 0, 1);
        },
        
        hide: function(){
            this.getContainer().tween("opacity", 1, 0);
        },
        
        adjustImgSize: function(){
            var img = this.getImg(),
                container = this.getContainer(),
                iHeight = img.naturalHeight,
                iWidth = img.naturalWidth,
                aHeight = window.innerHeight,
                aWidth = window.innerWidth / 2;
                
            var scaleX = aWidth / iWidth,
                scaleY = aHeight / iHeight,
                scaleFactor = scaleX < 1 || scaleY < 1 ?
                    Math.min(scaleX, scaleY) : 1;
                
            img.width = iWidth * scaleFactor;
            img.height = iHeight * scaleFactor;
        },
        
        center: function(){
            var container = this.getContainer(),
                iHeight = container.offsetHeight,
                iWidth = container.offsetWidth,
                aHeight = window.innerHeight,
                aWidth = window.innerWidth / 2;                
            
            var top = (aHeight - iHeight) / 2,
                right = (aWidth - iWidth) / 2;
                
            container.style.top = top + 'px';
            container.style.right = right + 'px';
        }
    },
    
    addRule: function(selector, elParser){
        var elems = $$(selector);
        
        if(!elParser || typeof elParser != "function"){
            console.log("imgParser is null or not a function.");
        }
        
        var el, href, img;
        
        for(var i = 0; i < elems.length; i++){
            el = elems[i];
            href = elParser.call(window, el);
            
            el.addEventListener("mouseover", this.zoom.bind(this, href), false);
            el.addEventListener("mouseout", this.hide.bind(this), false);
        }
    },
    
    zoom: function(href){
        //If clearListener is a function there is a pending image load listener we have to clear
        var clearListener = this.clearListener;
        
        if(clearListener && typeof clearListener == "function"){
            clearListener.call(this);
        }
        
        var container = this.container;
        
        //Show loading gif
        container.showLoading();
        container.center();
        container.show();
        
        //Show zoomed image
        var imgContainer = this.container.getImg();
        imgContainer.src = href;
        
        //Listener to show image when it's loaded
        var listener = (function(){
            this.clearListener = null;
            container.adjustImgSize();
            container.showImg();
            container.center();
        }).bind(this);
        
        this.clearListener = (function(){
            imgContainer.removeEventListener("load", listener, false);
        }).bind(this);
        
        imgContainer.addEventListener("load", listener, false);
    },
    
    hide: function(){
        var clearListener = this.clearListener;
        if(clearListener && typeof clearListener == "function"){
            clearListener.call(this);
        }
        this.container.hide();
    },
    
    clearListener: null
}

//Set up zoomer
if(!MooTools){
	log("Fatal Error - MooTools wasn't loaded.");
}

var z = new Zoomer();

z.addRule('a.fileThumb', function(el){
    return el.getAttribute('href');
});