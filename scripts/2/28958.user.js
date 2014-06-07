// ==UserScript==
// @name           imageLoader
// @namespace      http://d.hatena.ne.jp/tomo_snowbug/
// @description    this userscript replace anchor tag which link to image(ex. *.jpg) by img tag. additionally, preload original size image and adapt size. and make a slide show.
// @include        *
// @version        v0.3.3 (2008/6/21 @JST)
// ==/UserScript== 


window.ImageLoader = {
    
    /* enable confirm when close popup. */
    enable_confirm : false,
    _loader_entity: [], //{index,anchor,preloaded,base}
    _loaded_count: 0,
    _load_failures : [],//{index,url}
    _tempContainer: null,
    _mode: null,
    _mode_initialized: 0,
    _mode_slideShow: 1,
    
    init : function() {
        Logger.info("ImageLoader: start initializing. [" + window.location + "]");
        this._loadImageAnchors();
        this._preloadImages();
        this._mode = this._mode_initialized;
        window.top.addEventListener("keydown", ImageLoader.keybordNavigation, false);
        window.top.addEventListener("resize", ImageLoader.resizer, false);
        Logger.info("ImageLoader: finish initializing. [" + window.location + "]");
    },
    
    /* preload and replace images. */
    _loadImageAnchors: function(){
        var allAnchor = document.getElementsByTagName('a');
        for (var i = 0; i < allAnchor.length; i++) {
            if (this._isImageUrl(allAnchor[i].href)) {
                this._addLoadedEntity(allAnchor[i], null);
            }
        }
    },
    loadedEvent: function(loadedImage){
        ImageLoader._loadedEvent.call(ImageLoader,loadedImage);//rewrite this.
    },
    _loadedEvent: function(loadedImage){
        Logger.debug("loadedEvent index[" + loadedImage.getAttribute("index") + "] " +
        loadedImage.src);
        this._loaded_count++;
        this._replaceAnchor(this._getLoadedEntity(loadedImage.getAttribute("index")));
        this._showSplashOrInfo();
    },
    loadErrorEvent : function() {
        ImageLoader._loadErrorEvent.call(ImageLoader, arguments[0]);
    },
    _loadErrorEvent : function(source) {
        var index = source.getAttribute("index");
        this._load_failures.push({index: index, url: source.src});
        this._showSplashOrInfo();
    },
    _preloadImages: function(){
        if (this._tempContainer == null) {
            var div = document.createElement("div");
            div.setAttribute("style", "height:0px; overflow: scroll")
            document.body.appendChild(div);
            this._tempContainer = div;
        }
        for (var i = 0; i < this._loader_entity.length; i++) {
            var entity = this._loader_entity[i];
            var url = entity.anchor.href;
            Logger.debug(" preloadImage index[" + i + "] [" + url + "]");
            var imgTag = document.createElement("img");
            imgTag.src = url;
            this._setLoadedEntity(entity.index, entity.anchor, imgTag);
            this._tempContainer.appendChild(imgTag);
            imgTag.setAttribute("index", i);
            imgTag.addEventListener("load", function(){
                ImageLoader.loadedEvent(this);
            }, false);
            imgTag.addEventListener("error", function(){
                Logger.error("load img error [" + this.src + "]");
                ImageLoader.loadErrorEvent(this);
            }, false);
        }
    },
    _setLoadedEntity: function(key, anc, preload, base){
        if (key == null) {
            key = this._loader_entity.length;
        }
        this._loader_entity[key] = {
            index: key,
            anchor: anc,
            preloaded: preload,
            base: base,
        };
    },
    _addLoadedEntity: function(anc, preload, base){
        this._setLoadedEntity(null, anc, preload, base);
    },
    _getLoadedEntity: function(key){
        return this._loader_entity[key];
    },
    _getNextLoadedEntity: function(_index){
        var nextEntity;
        while (true) {
            nextEntity = this._getLoadedEntity(new Number(_index) + 1);
            if (!nextEntity) {
                return null;
            }
            var img = nextEntity.preloaded;
            if (img.getAttribute("origSize")) {
                break;
            }
            Logger.warn("_nextImage skip!! [" + nextEntity.index +
                " : " +nextEntity.anchor.href + "]");
            _index++;
        }
        return nextEntity;
    },
    _getPrevLoadedEntity: function(_index){
        var prevEntity;
        while (true) {
            prevEntity = this._getLoadedEntity(new Number(_index) - 1);
            if (!prevEntity) {
                return null;
            }
            var img = prevEntity.preloaded;
            if (img.getAttribute("origSize")) {
                break;
            }
            Logger.warn("_prevImage skip!!! [" + prevEntity.index +
                " : " +prevEntity.anchor.href + "]");
            _index--;
        }
        return prevEntity;
    },
    _replaceAnchor: function(entity){
        Logger.info("_replaceAnchor index[" + entity.index + "] url[" +
            entity.anchor.href + "]");
        var anchor = entity.anchor;
        var url = anchor.href;
        var image = entity.preloaded;
        var imgSize = this._culcurateElementSize(image);
        var origImgWidth = imgSize.width;
        var origImgHeight = imgSize.height;
        var imgWidth = origImgWidth;
        var imgHeight = origImgHeight;
        var parentWidth = this._culcurateParentElementSize(anchor).width;
        var imgTag = this._tempContainer.removeChild(image);//preloadした画像を取得
        var reductionRatio = 1;//画像の縮小率
        var browserWidth = window.top.innerWidth;
        Logger.debug("img[" + url + "]  width[" + imgWidth + 
            "]  height[" + imgHeight + "]");
        
        //親要素より10px小さく規制する。
        if (imgWidth > parentWidth - 10) {
            reductionRatio = (parentWidth - 10) / imgWidth;
        }
        //さらに規制後の画像幅がブラウザ表示幅より広かったら、ブラウザ表示幅で規制。
        //スクロールの幅を考慮して40px小さく規制
        if (imgWidth * reductionRatio > browserWidth - 40) {
            reductionRatio = (browserWidth - 40) / imgWidth;
            Logger.debug("browserWidth : " + browserWidth);
        }
        Logger.debug("reductionRatio [" + reductionRatio + "]");
        imgWidth = Math.ceil(imgWidth * reductionRatio);
        imgHeight = Math.ceil(imgHeight * reductionRatio);
        var imgTagStyle = "width:" + imgWidth + "px; height:" + imgHeight + "px;" +
        "border:2px solid green;";
        imgTag.setAttribute("origSize", origImgWidth + "," + origImgHeight);
        imgTag.setAttribute("adoptSize", imgWidth + "," + imgHeight);
        imgTagStyle += "cursor:-moz-zoom-in;";
        imgTag.title = "click to popup image in orignal size. and slide show.";
        imgTag.addEventListener("click", ImageLoader.popImage, false);
        this._addStyle(imgTag, imgTagStyle);
        var base = document.createElement("span");
        var messageBar = createMessageBar({
                width: imgWidth, height: imgHeight,
                origWidth: origImgWidth, origHeight: origImgHeight,
                ratio: reductionRatio, url: url, tag: imgTag,
            });
        base.appendChild(imgTag);
        base.appendChild(messageBar);
        var parent = anchor.parentNode;
        parent.insertBefore(base, anchor);
        anchor.style.display = "none";
        this._setLoadedEntity(entity.index, entity.anchor, entity.preloaded, base);
        
        function createMessageBar(img) {
            var base = document.createElement("div");	
            base.setAttribute("style","position:relative; top:" + ((img.height + 6) * -1) +
                "px; left:0; width:" + img.width + "px; height: 10px;" +
                "overflow: visible;");
            base.addEventListener("mouseover", function(){
                this.childNodes[0].style.display = "block";
            },false);
            base.addEventListener("mouseout", function(){
                this.childNodes[0].style.display = "none";
            },false);
            var front = document.createElement("span");
            front.setAttribute("style","background-color: green; color:white;" +
                "padding:2px; overflow:visible; display:none; width:" + img.width + 
                "px; font-size: 10px; vertical-align: middle");
            front.addEventListener("click", function(){
                ImageLoader._popImage(img.tag);
            }, false);
            var message = document.createElement("span");
            //application_add.png
            var _icon_window = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH9SURBVDjLpZM9aFRREIW/ue9FF2IULDQuaYIGtTBRWGFJAgqSUsEmjZVgo4mFWBiwVVjBHwjGwsbCShExIAghoEUMARGNGFJYhIC7isXGRbORvJ0Zi/dWY5fFCwOnuHz3nDsz4u78z5HTlx6NDB4v3KjWvd0dMMPNUFPcHHPDVTF3XBU1Y/uWZHVxsXzl6e3hibgwUBhvy7WH3bmWHm5fres4MBHXEw/16s+Wra8lHgBiV+f6mX0tA86VlkkBbgCsNxQH3Bw1MBwzR83Qhqflxro63Z0dqGkKIOuCBEHc8SC4OGJCCIJIQESRyIksEDfS+9bIAE1SAFwEBCIHEzBzIocgEbGAiqMhdWxqWQTL5kAE3P8BiYCrYwIuQBAii1JAM0JTpAxJxQaQxUJsxvTbSV7NP6e2ukLSSFjT/cBJ4kaS/HEggLsjIvgG0Is3T3hfnuLYwFG6dvbwcuEZcx+nKY7mbwbPskSAZC4k00GEIMLk64ccPtCHBqVvzxAqCcVD/QAjwcz+Rsg+M4gQbahv37/QJts4dfAiAJdP3Gfvrl6AXFxeWn58/k4ybKqYGqqKmaFJgplh7lRrKyxUZpmvzDA29IDS1Fly0VaAX7KZbSyO5q91de+42t87SE/nET59fcfshxk+L9VuyWbXuTiaLwEXgA7gB3Bv7m5l7Dd8kw6XoJxL0wAAAABJRU5ErkJggg==";
            //magnifier_zoom_in.png
            var _icon_zoomin = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI6SURBVDjLpZJbaJJxGMaHgdcFXURdBLtZrGitiFh0uhjRVRTVWI1as7mQakhjyyEkRAcaHSCrj0xrWGuuoVsr25qzfeYObh6yJJdzavoZs3Sy8PhJ8vR9EoHkotXFA/+b3+//vC9vEYCi/8mvh8H7nTM8kyF0LpoacCazLxzxbM/bb1S3OUo8GQtz/iggGfi1O0NaAzS8kQwCURqBORrTX9LQf5jHQ3KWlA1RnAUFeneGsATSoKIZOGdTsAWSMPuTsFNJeL7SEOoF4GtrUKuuShUUvJpKUd4wnYMtDDj5KQGTN4FRTyInOvH8MDonL6BKuRcFBey8fqYyC0/4Ehhn4JGZOBp1AtT1VkOkrYfMKIKgsxq7b+zErssV0TyBxjaf9UVomBh4jPnVyMCG6ThbGfKRVtwebsK1wdO4+JIPce8xbBGXI0+gMkWoqZ/137jjIBlY/zEGnqoO+2R7wGvfj/N9x3FAWonNojKUCUtTeQKlMUT02+fgCqVzs7OwzhnLyd4HU2xlCLsOYlPz+sI7uK8Pcu4O+EnNRAhWfwKOzym8Y2LyxCAf9GGHZDvKm9Zha2NptudcRUnBQ7rZ5+G0aVzEpS4nJelwZMXt9myL3Bpskyq9FmUzQuZu2B63QCXcEH50ak3Jb4KF0i+p5D5r3aYeJeoRNCgwfq8BCv7q8F8L2Dw9u5HbcWateuj6IXi0V0HUrsCiBGweNBRzZbxVasXJYkhrll1ZtIDNnaPLl9w6snRlwSX+a34AgPPwSZzC+6wAAAAASUVORK5CYII=";
            //delete.png
            var _icon_forbidden = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJdSURBVDjLpZP7S1NhGMf9W7YfogSJboSEUVCY8zJ31trcps6zTI9bLGJpjp1hmkGNxVz4Q6ildtXKXzJNbJRaRmrXoeWx8tJOTWptnrNryre5YCYuI3rh+8vL+/m8PA/PkwIg5X+y5mJWrxfOUBXm91QZM6UluUmthntHqplxUml2lciF6wrmdHriI0Wx3xw2hAediLwZRWRkCPzdDswaSvGqkGCfq8VEUsEyPF1O8Qu3O7A09RbRvjuIttsRbT6HHzebsDjcB4/JgFFlNv9MnkmsEszodIIY7Oaut2OJcSF68Qx8dgv8tmqEL1gQaaARtp5A+N4NzB0lMXxon/uxbI8gIYjB9HytGYuusfiPIQcN71kjgnW6VeFOkgh3XcHLvAwMSDPohOADdYQJdF1FtLMZPmslvhZJk2ahkgRvq4HHUoWHRDqTEDDl2mDkfheiDgt8pw340/EocuClCuFvboQzb0cwIZgki4KhzlaE6w0InipbVzBfqoK/qRH94i0rgokSFeO11iBkp8EdV8cfJo0yD75aE2ZNRvSJ0lZKcBXLaUYmQrCzDT6tDN5SyRqYlWeDLZAg0H4JQ+Jt6M3atNLE10VSwQsN4Z6r0CBwqzXesHmV+BeoyAUri8EyMfi2FowXS5dhd7doo2DVII0V5BAjigP89GEVAtda8b2ehodU4rNaAW+dGfzlFkyo89GTlcrHYCLpKD+V7yeeHNzLjkp24Uu1Ed6G8/F8qjqGRzlbl2H2dzjpMg1KdwsHxOlmJ7GTeZC/nesXbeZ6c9OYnuxUc3fmBuFft/Ff8xMd0s65SXIb/gAAAABJRU5ErkJggg==";
            message.style.width = img.width - 2 + "px";
            if (img.ratio == 1) {
                message.innerHTML = "size[" + img.origWidth + " x " + img.origHeight + "]. ";
            } else {
                var icon_zoom = document.createElement("img");
                icon_zoom.setAttribute("style","vertical-align:middle; border:0; cursor: -moz-zoom-in; margin:0px 3px;");
                icon_zoom.src = _icon_zoomin;
                icon_zoom.title = "click to popup image in orignal size. and slide show.";
                message.innerHTML += "original[" +
                origImgWidth + " x " + origImgHeight + "] now[" + Math.ceil(img.ratio * 1000) / 10 + "%]";
                message.appendChild(icon_zoom);
            }
            var newAnchor = document.createElement("a");
            newAnchor.href = img.url;
            newAnchor.setAttribute("target", "_blank");
            newAnchor.title = "click to open original image in new window.";
            newAnchor.addEventListener("click",function() {
                arguments[0].stopPropagation();
            },false);
            var icon_window = document.createElement("img");
            icon_window.src = _icon_window;
            icon_window.setAttribute("style", "vertical-align:middle; border:0; margin:0px 3px;");
            newAnchor.appendChild(icon_window);
            
            //cancel buttton
            var cancel = document.createElement("img");
            cancel.src = _icon_forbidden;
            cancel.title = "click to remove preloaded image by ImageLoader";
            cancel.setAttribute("style","cursor: pointer; vertical-align:middle; border:0; margin:0px 3px;");
            cancel.addEventListener("click",function(){
                arguments[0].stopPropagation();
                ImageLoader.cancel();
            },false);

            base.appendChild(front);
            front.appendChild(message);
            front.appendChild(newAnchor);
            front.appendChild(cancel);
            return base;			
        }
    },
    
    /* pop and slideshow.*/
    popImage: function(){
        ImageLoader._popImage.call(ImageLoader,this);//rewrite this.
    },
    _popImage: function(pop){
        this._closePopImage();
        this._mode = this._mode_slideShow;
        Logger.debug("popImageToTop index[" + pop.getAttribute("index") + "] " +
        pop.src);
        var nowWidth = pop.style.width.replace("px", "");
        var origWidth = pop.getAttribute("origSize").split(",")[0];
        var origHeight = pop.getAttribute("origSize").split(",")[1];
        var adoptWidth = pop.getAttribute("adoptSize").split(",")[0];
        var adoptHeight = pop.getAttribute("adoptSize").split(",")[1];
        var topDoc = window.top.document;
        var topBodyWidth = topDoc.body.scrollWidth || topDoc.documentElement.scrollWidth;
        var topBodyHeight = topDoc.body.scrollHeight || topDoc.documentElement.scrollHeight;
        var background = createBackground(topBodyWidth, topBodyHeight);
        var screen = createScreen(topBodyWidth, topBodyHeight);
        //TODO backgroundが中途半端な幅になる。
        background.appendChild(screen);
        var copyImg = topDoc.importNode(pop, true);
        var scrollY = topDoc.body.scrollTop || topDoc.documentElement.scrollTop;
        var scrollX = topDoc.body.scrollLeft || topDoc.documentElement.scrollLeft;
        var baseTop = scrollY;
        var baseLeft = scrollX;
        
        this._addStyle(copyImg,"width:" + origWidth + "px; height:" + origHeight +
            "px; border: 3px double gray;");
        
        copyImg = this._adaptElementInBrowser(copyImg);
        copyImg.removeEventListener("click", ImageLoader.popImage, false);
        var reductionRatio = copyImg.getAttribute("reductionRatio");
        if (reductionRatio != 1) {
            copyImg.addEventListener("click",ImageLoader.orignalSizeImage, false);
            copyImg.title = "click to original size.";
            this._addStyle(copyImg,"cursor: pointer;");
        } else {
            copyImg.title = " ";
            copyImg.addEventListener("click",function() {
                arguments[0].stopPropagation();
            }, false);
            this._addStyle(copyImg,"cursor: default;");
            
        }
        var imgBase = createImgBase();
        var toolbar = createToolbar();
        imgBase.appendChild(toolbar);
        imgBase.appendChild(copyImg);
        background.appendChild(imgBase);
        topDoc.body.appendChild(background);

        function createBackground() {
            var ret = createBase();
            ret.id = ImageLoader._background_id_;
            ret.addEventListener("click", function(){
                if (ImageLoader.enable_confirm && !confirm("close this?")) return;
                ImageLoader._closePopImage();
            }, false);
            ret.title = "click to close.";
            return ret;
        }
        function createScreen() {
            var ret = topDoc.createElement("div");
            ret.setAttribute("style", "background-color: black; opacity:0.7;" +
            "position: absolute; top: 0px; left: 0px;" +
            "width:" + topBodyWidth + "px;height:" + topBodyHeight + "px");
            return ret;
        }
        function createBase() {
            var base = topDoc.createElement("div");
            base.setAttribute("style", "position: absolute; top: 0px; left: 0px;" +
                "width:" + topBodyWidth + "px;height:" + topBodyHeight + "px; cursor: -moz-zoom-out;");
            return base;
        }
        function createImgBase() {
            var ibase = createBase();
            ibase.id = ImageLoader._imagebase_id_;
            ImageLoader._addStyle(ibase, "top:" + baseTop + "px;left:" + baseLeft + "px;" +
                "text-align: center;");
            return ibase;
        }
        function createToolbar() {
            var base = topDoc.createElement("div");
            base.setAttribute("style", "width:" + topBodyWidth + "px;height: auto; background-color: black;" 
                + "color: silver; font-size:14px; text-align: center; padding:3px 0px; margin:0px; cursor: default");
            base.addEventListener("click", function() {
                arguments[0].stopPropagation();
            },false);
            base.title = "| -> or 'j': next image | <- or 'k': prev image | 'm': resize image | 'ESC': close slide show |";
            //arrow_out.png
            var _icon_window = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHkSURBVDjL3ZNvT1JhGMafb3G+TQqKECNFRIEDcvgXmB5IPNJmTdbC1SQ0S1xzZKXyT41TdpCOMyYtiXS9aW2uD8EbPsHV87RRmyLrdc92vbt/1/U8930/ZLYxASbpSwgz9SCin2+CHtJJwYoLgbITvvcOeN7a4S6NgTB45+cmCucvu8JMFOZCZQHpr0tYO12Ga9cKwpJz5xvIfH+GR2dxRGp+uSOs8Jxv39GKV+/gYS2OlXoSfNECMnMSRKw+hdS3BLI/Mlho3MPUR88lE+++ozlfjWG1kYJUCcNRsMCWM4NM02vf/hTgwsf+1uLpfTw4mcOtQ0G9aCDINiWmRiAdiAz+HTC6Nfi3QKx6uckjT3Pi0K1c1QPnzojahtsi3Zr2L/rfDGin5fE3o+pVxeYXRmVw3dA0Pddzfwz8Co82LFVERMuTbEyXJjGUMaqBgoBQ0Qfjmq5lWO3n9E/76IK8s4PCYHCytoDZgwhsWXPzosGNdYPszY1jTonBnxVgSuuhe6KhyfRDJGsJ3P0gQSqLDG7RBeE6PeF6Wie7X/MI5N2YLonoX+oFce1ZsXicQOJoHs68FdbNznBbAytaREthSHIE2lQPCF8cgT0/jLHtIQbD8sqEbrBuWYM+mqx93ANN8hp+AQOPtI0tirA3AAAAAElFTkSuQmCC";
            //arrow_left.png
            var _icon_left = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADrSURBVDjLY/z//z8DJYCJgUIwyAwoPZHJBsS7STGABY1/9e+fvzKkGMAIiwWgzRfF2ST0/vz5w/Dw/UOGXz9/M/z6AcK/GH4CMZj+jmCD5C70X2VkgWo+KcYqrqfArcTw598fBhluOTD9++9fIP7N8PsfEP/9AxUD0b8ZVq9ci/AC0Nm//zD+Yfj19xdY0R+got9gxb8RNNQAkNyf/0CxX39QvZC5M+68MJuIAQczJ8PDlw8ZXr9/g9XZIK+BNP/5/Yfh/sJHjIzIKTF2VchNoEI5oAbHDWk7TpAcjUDNukDNB4nVjOKFEZwXAOOhu7x6WtPJAAAAAElFTkSuQmCC";
            //arrow_right.png
            var _icon_right = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADvSURBVDjLY/z//z8DJYCJgUIwxAwImOWx22uSExvZBvz68cvm5/dfV5HFGEGxUHoiExwVf//8Zfjz+w/D719/GH79/A3UAMK/GH4CMYiWFJJk+PXrN8PN27cunWq/oA/SwwIzyUrYluHvP6AB//7A8e+/f4H4N8Pvf0D8Fyb2h+HLl696WllqJ69Nu2XOArMZpBCuGajoN1jxbwT9FyH36/dvkCt/w10Acvb+h3uxOhvoZzCbi4OLQVJSiuH1q9cMt2/cvXB7zj0beBgQAwwKtS2AFuwH2vwIqFmd5Fi40H/1BFDzQaBrdTFiYYTnBQAI58A33Wys0AAAAABJRU5ErkJggg==";
            //zoom.png
            var _icon_zoom = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJGSURBVDjLjdJLSNRBHMDx78yqLZaKS75DPdgDDaFDbdJmde5QlhCJGxgpRJfqEEKnIsJLB7skQYQKZaSmdLaopPCgEvSCShCMzR5a7oq7/3l12RVtjfzBMA/4fWZ+MyOccwBM3g8HEbIdfCEhfAFnLVapOa28Uevpjrqz/WOsERJgsu9Uq5CZQzgqrJfo9BajNd5irEYn4p3OUiFExtCLmw2tawFi4l5zUMjMIau9u7K+qxeoAcoAA0wDb2OPwmfA16LiiaOHLj1edRLpkO3WmIis7+oBDgJbgQ2AH6gC6jY19N62RkcctKeVIJAhp9QgUA3kJXdONZVcq9JxPSgQoXRAyIDRth8oAXQyKdWnoCKrTD9CBv4GMqx1WGNZkeRWJKbG2hiD1Cb9FbTnzWFdY/LCdLKlgNQ84gyNKqHm0gDjqVHnxDHgA/B9RQkpaB6YklkZl62np9KBhOqwjpKFgeY2YAz4BESBWHI8Hhs6PVVSvc3v98ye4fP7T676B845nt040ip98qpWJmI9PWiU6bfWgXGN2YHcKwU7tsuc4kpUPMbU0+f8+vKt+Pitl7PLAMDI9cNBoB0hQwICzjqUp6MZvsy8yvp95BRuQUjJ75mPvH4wYo1NlJ64Mza7DPwrhi8cCOeXl/aUB4P4c/NJxKLMvpngycCrzxVFG2v/CwAMnguF80oLe8p27cQh+fnpPV/fTc95S6piXQDAw7a9YbWkezZXFbAwMx/xPFXb1D3+Y90AQF/L7kAsri9mZ4lrTd0TcYA/Kakr+x2JSPUAAAAASUVORK5CYII=";
            var size = topDoc.createElement("p");
            if (reductionRatio == 1) {
                size.innerHTML = (1 + new Number(pop.getAttribute("index"))) +
                     " / " + ImageLoader._loader_entity.length + "&nbsp;&nbsp;&nbsp;&nbsp;size[" +
                     origWidth + " x " + origHeight + "]&nbsp;&nbsp;&nbsp;&nbsp";
            } else {
                size.innerHTML = (1 + new Number(pop.getAttribute("index"))) +
                     " / " + ImageLoader._loader_entity.length + "&nbsp;&nbsp;&nbsp;&nbsp;original[" +
                     origWidth + " x " + origHeight + "] now[" + Math.ceil(reductionRatio * 1000) / 10 + "%]&nbsp;&nbsp;&nbsp;&nbsp";
            }
            size.setAttribute("style","padding:3px 0px 2px; margin:0px;");
            base.appendChild(size);
            
            var icon_left = topDoc.createElement("img");
            icon_left.src = _icon_left;
            icon_left.addEventListener("click",function(){
                ImageLoader.previousImage();
                arguments[0].stopPropagation();
            },false);
            icon_left.setAttribute("style", "vertical-align:middle; border:0; margin:0px 3px; cursor: pointer");
            icon_left.title = "click to show previous image.";
            size.appendChild(icon_left);
            
            var icon_right = topDoc.createElement("img");
            icon_right.src = _icon_right;
            icon_right.addEventListener("click",function(){
                ImageLoader.nextImage();
                arguments[0].stopPropagation();
            },false);
            icon_right.setAttribute("style", "vertical-align:middle; border:0; margin:0px 3px; cursor: pointer");
            icon_right.title = "click to show next image.";
            size.appendChild(icon_right);
            
            if (reductionRatio != 1) {
                var icon_zoom = topDoc.createElement("img");
                icon_zoom.src = _icon_zoom;
                icon_zoom.addEventListener("click",function(){
                    ImageLoader.orignalSizeImage();
                    arguments[0].stopPropagation();
                },false);
                icon_zoom.setAttribute("style", "vertical-align:middle; border:0; margin:0px 3px; cursor: pointer");
                icon_zoom.title = "click to original size.";                
                size.appendChild(icon_zoom);
            }
            
            var openWinAnchor = topDoc.createElement("a");
            openWinAnchor.href = pop.src;
            openWinAnchor.setAttribute("target", "_blank");
            openWinAnchor.title = "click to open original image in new window.";
            openWinAnchor.addEventListener("click",function() {
                arguments[0].stopPropagation();
            },false);
            var icon_window = topDoc.createElement("img");
            icon_window.src = _icon_window;
            icon_window.setAttribute("style", "vertical-align:middle; border:0; margin:0px 3px;");
            openWinAnchor.appendChild(icon_window);
            size.appendChild(openWinAnchor);
            return base;
        }
    },
    orignalSizeImage : function() {
        ImageLoader._orignalSizeImage.apply(ImageLoader,arguments);
    },
    _orignalSizeImage : function() {
        try {
            arguments[0].stopPropagation();
        } catch(ignore) {}
        img = this._getPopedImage();
        if (!img.getAttribute("origSize")) return;
        img.style.width = img.getAttribute("origSize").split(",")[0] + "px";
        img.style.height = img.getAttribute("origSize").split(",")[1] + "px";
        img.removeEventListener("click",ImageLoader.orignalSizeImage,false);
        img.addEventListener("click",function(){
            ImageLoader._popImage(this);
            arguments[0].stopPropagation();
        },false);
    },
    switchImageSize : function() {
        ImageLoader._switchImageSize.apply(ImageLoader,arguments);
    },
    _switchImageSize : function() {
        var img = this._getPopedImage();
        if (!img) return;
        var origWidth = img.getAttribute("origSize").split(",")[0];
        var nowWidth = this._culcurateElementSize(img).width;
        if (origWidth != nowWidth) {
            this._orignalSizeImage(arguments);
        } else {
            this._adaptElementInBrowser(img);
        }
    },
    _closePopImage : function() {
        this._removeFromTopBody(this._background_id_);
        this._mode = this._mode_initialized;
    },
    _background_id_ : "__background_id__",
    _imagebase_id_ : "__imagebase_id__",
    nextImage: function(){
        ImageLoader._nextImage.call(ImageLoader, ImageLoader._getPopedImage());
    },
    _nextImage: function(){
        var source = arguments[0];
        var nowIndex = source.getAttribute("index");
        var nextEntity = this._getNextLoadedEntity(nowIndex);
        if (!nextEntity) {
            if (this.enable_confirm && !confirm("this is last image. close this?")) return;
            ImageLoader._closePopImage();
            return;
        }
        Logger.debug("_nextImage [" + nextEntity.preloaded.getAttribute("index") + 
            " : " + nextEntity.preloaded.src + "]");
        this._popImage(nextEntity.preloaded);
    },
    previousImage: function(){
        ImageLoader._previousImage.call(ImageLoader,ImageLoader._getPopedImage());
    },
    _previousImage: function(){
        var source = arguments[0];
        var nowIndex = source.getAttribute("index");
        var prevEntity = this._getPrevLoadedEntity(nowIndex);
        if (!prevEntity) {
            if (this.enable_confirm && !confirm("this is first image. close this?")) return;
            ImageLoader._closePopImage();
            return;
        }
        Logger.debug("_prevImage [" + prevEntity.preloaded.getAttribute("index") + 
            " : " + prevEntity.preloaded.src + "]");
        this._popImage(prevEntity.preloaded);
    },
    keybordNavigation : function() {
        ImageLoader._keybordNavigation.apply(ImageLoader,arguments);
    },
    _keybordNavigation : function() {
        var ev = arguments[0];
        var keyc = ev.keyCode;
        var charc = ev.charCode;
        var key = keyc || charc;
        Logger.debug("keycode [" + keyc + "] charcode [" + charc + "] key [" + key + "]");
        var preventDefault = false;
        if (this._mode == this._mode_slideShow) {
            if (ev.altKey || ev.ctrlKey || ev.shiftKey) return;
            preventDefault = true;
            switch (key) {
                case 39: // ->
                case 74: //j
                    this.nextImage();
                    break;
                case 37: // <-
                case 75: //k
                    this.previousImage();
                    break;
                case 27: //ESC
                    this._closePopImage();
                    break;
                case 77: //m
                    this.switchImageSize();
                    break;
                default :
                    preventDefault = false;
            }
        }
        if (this._mode == this._mode_initialized) {
            if (ev.ctrlKey && key == 190) { //cntl + .
                var firstValidImg = this._getNextLoadedEntity(-1).preloaded;
                if (firstValidImg.getAttribute("origSize")) {
                    this._popImage(firstValidImg)
                }
            }
        }
        if (preventDefault) {
            ev.preventDefault();
            ev.stopPropagation();
        }
    },
    _getPopedImage : function() {
        var topDoc = window.top.document;
        var background = topDoc.getElementById(this._imagebase_id_);
        var nodes = background.childNodes;
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].tagName == "IMG") {
                return nodes[i];
            }
        }
        Logger.warn("_getPopedImage returns null!");
    },
    resizer : function() {
        ImageLoader._resizer.apply(ImageLoader,arguments);
    },
    _resizer : function() {
        if(this._mode == this._mode_slideShow) {
            this._popImage(this._getPopedImage());
        }
    },
        
    /* splash */
    _splashIsShown : false,
    _splashElement : null, //{base,p,indicator}
    _splashFadeoutTimer : null,
    _splashFadeoutInterval : 100, //in msec.
    _splashFadeoutAmount : 0.05,
    _showSplashOrInfo : function() {
        Logger.debug("show splash or info.");
        var count = this._loaded_count;
        var count_total = this._loader_entity.length;
        var topDoc = window.top.document;
        var browserWin = this._culcurateBrowserWindowSize();
        var loadingIndicator = "chrome://global/skin/icons/loading_16.png";
        if (!this._splashIsShown) {
            this._splashIsShown = true;
            this._splashElement = createSplash();
        }
        var base = this._splashElement.base;
        var indicator = this._splashElement.indicator;
        var msg = this._splashElement.p;
        var totalImages = this._loader_entity.length;
        var loadedImages = this._loaded_count;
        var failImages = this._load_failures.length;
        if (totalImages != (loadedImages + failImages)) {
            msg.innerHTML = "ImageLoader. loading.... " + count_total + " images.<br> now loaded " + count + "images.";
            return;
        }
        base.removeChild(indicator);
        if (failImages != 0) {
            msg.innerHTML = "ImageLoader. finish loading.<br> " + 
                "loaded: " + count_total + " images. <span style='color:red'>load failure: " +
                failImages + "images.</span>"
        } else {
            msg.innerHTML = "ImageLoader. finish loading.<br>loaded: " + count_total + " images."
        }
        this._splashFadeoutTimer = setTimeout(ImageLoader.fadeOutSplash, 5000);
        
        function createSplash() {
            var base = create("div","background-color:black; opacity:0.7; color: white; font-size:12px;" +
                "width:250px; height: 40px; padding: 3px 5px; border:3px double silver;" +
                "position:fixed; bottom:5px; right:5px; font-family: Tahoma;");
            topDoc.body.appendChild(base);
            var indicator = create("img","vertical-align:middle; border:0;padding: 10px 5px; float:left")
            indicator.src = loadingIndicator;
            var p = create("span","text-align: center; width:100%;height:30px;");
            base.appendChild(indicator);
            base.appendChild(p);
            return {
                base: base,
                p: p,
                indicator: indicator,
            };
        }
        function create(ele, style) {
            var ret = topDoc.createElement(ele);
            if (style) {
                ret.setAttribute("style",style);
            }
            return ret;
        }
    },
    fadeOutSplash : function() {
        ImageLoader._fadeOutSplash.apply(ImageLoader,arguments);
    },
    _fadeOutSplash : function() {
        var target = this._splashElement.base;
        var nowOpacity = target.style.opacity;
        if (nowOpacity == 0) {
            window.top.document.body.removeChild(target);
            return;
        }
        target.style.opacity = nowOpacity - this._splashFadeoutAmount;
        clearTimeout(this._splashFadeoutTimer);
        this._splashFadeoutTimer = setTimeout(function(){
            ImageLoader.fadeOutSplash()
        },this._splashFadeoutInterval);
    },

    /* Cancel */
    cancel : function()	{
        ImageLoader._cancel.apply(ImageLoader,arguments);
    },
    _cancel : function()	{
        Logger.info("cancel ImageLoader.");
        var entity = this._loader_entity;
        for (var i = 0; i < entity.length; i++) {
            //remove images.
            try {
                var parent = entity[i].base.parentNode;
                parent.removeChild(entity[i].base);
                //restore anchors.
                entity[i].anchor.style.display = "inline";
            } catch(ignore){}
        }
        this._loader_entity = null;
        this._mode = null;
        window.top.removeEventListener("keydown", ImageLoader.keybordNavigation, false);
        window.top.removeEventListener("resize", ImageLoader.resizer, false);
    },
        
    /* Utils */
    _culcurateParentElementSize: function(elem){
        return this._culcurateElementSize(elem.parentNode);
    },
    _culcurateElementSize: function(elem){
        var targetComputedStyle = document.defaultView.getComputedStyle(elem, '');
        var h = targetComputedStyle.height.replace("px", "");
        var w = targetComputedStyle.width.replace("px", "");
        return {width: w, height: h};
    },
    _culcurateBrowserWindowSize: function(elem){
        var topDoc = window.top.document;
        var browserWidth = window.top.innerWidth;
        var browserHeight = window.top.innerHeight;
        var scrollY = topDoc.body.scrollTop || topDoc.documentElement.scrollTop;
        var scrollX = topDoc.body.scrollLeft || topDoc.documentElement.scrollLeft;
        return {width : browserWidth, height : browserHeight, scrollY: scrollY, scrollX: scrollX};
    },
    _isImageUrl: function(urlStr){
        if (urlStr.match(/^http:\/\//) &&
        urlStr.match(/(\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$|\.tif$)/)) { return true; }
        return false;
    },
    _removeFromTopBody : function(id) {
        var removed = null;
        var topDoc = window.top.document;
        var remove = topDoc.getElementById(id);
        if (!remove) return removed;
        return topDoc.body.removeChild(remove);
    },
    _addStyle: function(ele, styleStr){
        var _nowStyles = [];
        if (ele.getAttribute("style")) {
            _nowStyles = ele.getAttribute("style").split(";");
        }
        var nowStyles = {};
        var _addingStyles = styleStr.split(";");
        var addingStyles = {};
        var t = this._trim;
        for (var i = 0; i < _nowStyles.length; i++) {
            if (_nowStyles[i] == "") continue;
            var tmpStyleKey = _nowStyles[i].split(":")[0].replace(/^\s+|\s+$/g, "");
            var tmpStyleVal = _nowStyles[i].split(":")[1].replace(/^\s+|\s+$/g, "");
            if (tmpStyleKey.length == 0) continue;
            nowStyles[tmpStyleKey] = tmpStyleVal;
        }
        for (var j = 0; j < _addingStyles.length; j++) {
            if (_addingStyles[j] == "") continue;
            var tmpStyleKey_ = _addingStyles[j].split(":")[0].replace(/^\s+|\s+$/g, "");
            var tmpStyleVal_ = _addingStyles[j].split(":")[1].replace(/^\s+|\s+$/g, "");
            if (tmpStyleKey_.length == 0) continue;
            addingStyles[tmpStyleKey_] = tmpStyleVal_;
            nowStyles[tmpStyleKey_] = tmpStyleVal_;
        }
        var modifiedStyelStr = "";
        for (var k in nowStyles) {
            modifiedStyelStr += k + ":" + nowStyles[k] + ";";
        }
        if (modifiedStyelStr.length == 0) return ele;
        ele.setAttribute("style", modifiedStyelStr);
    },
    _adaptElementInBrowser : function() {
        var ele = arguments[0];
        var w_offset = 40;//40 = スクロールバーを考慮。
        var h_offset = 80;//80 = スクロールバーとツールバー(40px）を考慮
        if (arguments[1]) w_offset = arguments[1];
        if (arguments[2]) h_offset = arguments[2];
        var origWidth = ele.getAttribute("origSize").split(",")[0];
        var origHeight = ele.getAttribute("origSize").split(",")[1];
        var reductionRatio_w = 1;//横方向の縮小率
        var reductionRatio_h = 1;//縦方向の縮小率
        var browserWidth = window.top.innerWidth;
        var browserHeight = window.top.innerHeight;
        Logger.debug("browser [" + browserWidth + "," + browserHeight + "]");
        if (origWidth > browserWidth - w_offset) {
            reductionRatio_w = (browserWidth - w_offset) / origWidth;
        }
        if (origHeight > browserHeight - h_offset) {
            reductionRatio_h = (browserHeight - h_offset) / origHeight;
        }
        Logger.debug("reductionRatio [" + reductionRatio_w + "," + reductionRatio_h + "]");
        var reductionRatio = 1;
        (reductionRatio_h > reductionRatio_w) ? reductionRatio = reductionRatio_w : reductionRatio = reductionRatio_h;
        adaptWidth = Math.ceil(origWidth * reductionRatio);
        adaptHeight = Math.ceil(origHeight * reductionRatio);
        ele.setAttribute("reductionRatio",reductionRatio);
        this._addStyle(ele, "width: "+ adaptWidth + "px; height:" + adaptHeight + "px");
        return ele;
    },
};

window.Logger = {
    loglevel: 1, //0=debug, 1=info, 2=warn, 3=error
    debug: function(str){
        if (this.loglevel < 1) console.log(this._logFormat("DEBUG", str));
    },
    info: function(str){
        if (this.loglevel < 2) console.log(this._logFormat("INFO ", str));
    },
    warn: function(str){
        if (this.loglevel < 3) console.log(this._logFormat("WARN ", str));
    },
    error: function(str){
        if (this.loglevel < 4) console.log(this._logFormat("ERROR", str));
    },
    inspect: function(obj){
        if (this.loglevel > 0) return;
        var ret = "{";
        for (var i in obj) {
            ret += i + ":" + obj[i] + ",";
        }
        ret = ret.replace(/\,$/, "");
        ret += "}";
        console.log(this._logFormat("INSPE", ret));
    },
    _logFormat: function(level, str){
        var now = new Date();
        var h = this._heading;
        var formattedDate = "[" + now.getFullYear() + "/" + h(now.getMonth() + 1, 2) +
        "/" +
        h(now.getDate(), 2) +
        " " +
        h(now.getHours(), 2) +
        ":" +
        h(now.getMinutes(), 2) +
        ":" +
        h(now.getSeconds(), 2) +
        "." +
        h(now.getMilliseconds(), 3) +
        "]";
        return formattedDate + " " + level + " " + str;
    },
    _heading: function(str, length){
        var heading = "";
        var amount = length - new String(str).length;
        for (var i = 0; i < amount; i++) {
            heading += " ";
        }
        return heading + str;
    },
};
(function(){
    ImageLoader.init();
})();
