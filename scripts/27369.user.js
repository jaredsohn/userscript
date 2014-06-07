// ==UserScript==
// @name           imageLoader
// @namespace      http://d.hatena.ne.jp/tomo_snowbug/
// @description    preload images from anchor which link to image file. also make a slide show and display thumbnail screen.
// @include        *
// @version        v0.4.2 (2009/06/27)
// ==/UserScript== 


/*
 * @credits
 *   + famfamfam silk icons by Mark James
 *     http://www.famfamfam.com/lab/icons/silk/
 *   + fine ideas
 *     by matrixik, simon!
 *   + script wrote by tomo_snowbug
 *     http://d.hatena.ne.jp/tomo_snowbug/
 */


window.ImageLoader = {
    
    _load_images: [], //{index,anchor,preloaded,base}
    
    //loadするためのテンポラリなdiv。window.selfに置かれる
	//_load_imagesのAnchorから、imgタグを生成して、このコンテナ内でロードさせる
    _tempContainer: null,

    _loaded_count: 0,
    _load_failures: [],//{index,url}
    _filterd_by_size_images: [], //{index,url}

	/* ------------------------------------------------------------------
	 *  initialize imageLoader.
	 * ------------------------------------------------------------------ */    
    init: function() {
		ImageLoader._init.apply(ImageLoader, arguments);
	},
    _init: function() {
        Logger.info("ImageLoader: start initializing. [" + window.location + "]");
		_addStyles();
		if (!this.checkConfigInitialized()) {
			this.showConfigPanel();
			return;
		}
		var enableAutoLoading = GM_getValue(this._configKey_autoloading);
		Logger.info("ImageLoader: autoloading:" + enableAutoLoading);
        _registerUserscriptCommands();
		this._addKeybordEventListers();
		
		//Aタグをすべて抽出して、_load_imagesに格納する。実際に画像を読み込むことはしない
		this._extractImageAnchors();
		
        this._setModeInitialized();
        Logger.info("ImageLoader: finish initializing. [" + window.location + "]");
		if (enableAutoLoading == false) return;
		
        Logger.info("ImageLoader: start AutoLoading. [" + window.location + "]");
		
		//_load_imagesに格納されたAnchorを基にしてtempContainer上で画像を読み込む
		this._preloadImages();
		this._setModePreloaded();
		return;

		function _registerUserscriptCommands() {
			GM_registerMenuCommand("ImageLoader - slide show", ImageLoader.startSlideShowFromFirst);
			GM_registerMenuCommand("ImageLoader - thumbnails", ImageLoader.showThumbnail);
			GM_registerMenuCommand("ImageLoader - (re)loadImages", ImageLoader.loadImages);
			GM_registerMenuCommand("ImageLoader - config", ImageLoader.showConfigPanel);
		}
		//define ui styles..
		function _addStyles() {
			var css = 
				<style>
				<![CDATA[
				/* popup UI */
				div#__background_id__ {
					font-family: Tahoma, sans-serif !important;
					position: absolute !important;
					top: 0px;
					left: 0px;
					cursor: -moz-zoom-out !important;
					z-index: 99999999 !important;
				}
				div#__background_screen_ {
					background-color: black !important;
					opacity: 0.7  !important;
				}
				div#__imagebase_id__ {
					position: absolute  !important;
					top: 0px;
					left: 0px;
					cursor: -moz-zoom-out  !important;
					text-align: center  !important;
				}
				div#__toolbar_id__ {
					margin: 0px  !important;
					padding: 3px 0px !important;
					width: 100%  !important;
					height: auto;
					background-color: black  !important;
					color: silver !important;
					font-size: 14px !important;
					text-align: center !important;
					cursor: default !important;
				}
				div#__toolbar_id__ p {
					margin: 0px  !important;
					padding: 3px 0px 2px !important;
				}
				div#__toolbar_id__ img {
					border: 0pt none;
					margin: 0px 3px;
					vertical-align: middle;
					cursor: pointer;
				}
				/* /popup UI */
				
				/* config panel */
				div#__config_panel_id__ {
					border: 3px double silver;
					padding: 5px;
					position: fixed;
					right: 10px;
					bottom: 10px;
					width: 270px;
					background-color: black;
					color: white;
					opacity: 0.8;
					font-size: 12px;
					font-family: Tahoma, sans-serif !important;
					z-index: 99999999 !important;
				}
				div#__config_panel_id__ label {
					padding: 0px 5px;
				}
				div#__config_panel_id__ input[type = "checkbox"] {
					vertical-align: middle;
				}
				div#__config_panel_id__ div.checkboxContainer {
					text-align: left;
				}
				div#__config_panel_id__ div.textinputContainer {
					padding: 2px 0px;
				}
				div#__config_panel_id__ div.textinputContainer input{
					vertical-align: middle;
					padding: 0px 3px;
				}
				input#__filter_image_size,
				input#__config_thumbnail_width,
				input#__config_thumbnail_height {
					width: 40px;
				}
				/* /config panel */

				/* splash */
				div#__imageloader_loading_ {
					border: 3px double silver;
					padding: 3px 5px;
					background-color: black;
					color: white;
					font-size: 12px;
					width: 250px;
					height: 40px;
					position: fixed;
					bottom: 5px;
					right: 5px;
					font-family: Tahoma;
				}
				div#__imageloader_loading_ img#__imageloader_indicator_ {
					border: 0pt none;
					padding: 10px 5px;
					vertical-align: middle;
					float: left;
				}
				div#__imageloader_loading_ span#__imageloder_loading_info_ {
					text-align: center;
					width: 100%;
					height: 30px;
				}
				/* /splash */
				
				/* thumbnail */
				#__thumbnail_base_ {
					font-family: Tahoma, sans-serif !important;
					color: silver !important;
					cursor: -moz-zoom-out !important;
					z-index: 99999999 !important;
				}
				#__thumbnail_background_screen_ {
					background-color: black;
					opacity: 0.7;
					position: absolute;
					top: 0px;
					left: 0px;
				}
				#__thumbnail_contents_ {
					position: absolute;
					top: 0px;
					left: 0px;
					text-align: center;
					color: white;
				}
				#__thumbnail_contents_ table {
					margin: auto !important;
					width: auto !important;
					border-spacing: 0 !important;
					border-collapse: collapse !important;
					border: 1px solid silver !important;
					background-color: transparent !important;
					cursor: default !important;
				}
				#__thumbnail_contents_ td {
					padding: 1px !important;
					border: 0 none !important;
					background-color: transparent !important;
				}
				#__thumbnail_contents_ td div {
					border: 1px solid silver !important;
				}
				#__thumbnail_contents_ td p {
					color: silver !important;
				}
				#__thumbnail_toolbar_ {
					width: 100%  !important;
					height: auto;
					margin: 0px !important;
					padding: 3px 0px !important;
					background-color: black  !important;
					color: silver !important;
					font-size: 14px !important;
					text-align: center !important;
					cursor: default !important;
				}
				#__thumbnail_toolbar_ img {
					border: 0pt none;
					margin: 0px 3px;
					vertical-align: middle;
					cursor: pointer;
				}
				#__thumbnail_info_ {
					margin: 0;
					padding: 0;
				}
				#__thumbnail_ div {
					overflow:hidden;
					text-align: center;
				}
				#__thumbnail_serial_ {
					position: absolute;
					z-index: 99999999 !important;
					background-color: black;
					opacity: 0.5;
					color: silver;										
				}
				#__thumbnail_ img {
					
				}
				/* /thumbnail */

				/* info */
				#__imageloader_info_base_ {
					position: absolute;
					font-family: Tahoma;
					color: white;
					font-size: 20px;
					background-color: black;
					padding: 5px 10px;
					border: 2px solid silver !important;
					z-index: 99999999 !important;
				}
				#__imageloader_info_ {
					text-align: center;
				}
				/* /info */
				
				]]>
				</style>
			var head = document.getElementsByTagName("head")[0];
			head.innerHTML = head.innerHTML + css.toSource();
		}
    },
	_addKeybordEventListers: function () {
		Logger.debug("enter _addKeyboardEventListeners.");
		try {
	        window.removeEventListener("keydown", ImageLoader.keybordNavigation, false);
	        window.removeEventListener("resize", ImageLoader.resizer, false);
		} catch(ignore){}
        window.addEventListener("keydown", ImageLoader.keybordNavigation, false);
        window.addEventListener("resize", ImageLoader.resizer, false);
	},
	/* ------------------------------------------------------------------
	 *  load config
	 * ------------------------------------------------------------------ */
	_configKey_enable_duplicateFilter: "__enable_dup_filter",
	_configKey_autoloading: "__enable_autoloading",
	_configKey_enableFilterImageSize: "__enable_filter_image_size",
	_configKey_filterImageSize: "__filter_image_size",
	_configKey_thumbnail_width: "__config_thumbnail_width",
	_configKey_thumbnail_height: "__config_thumbnail_height",
	_configKey_disable_keybordShortcut: "__config_disable_keybordShortcut",

	checkConfigInitialized: function() {
		return ImageLoader._checkConfigInitialized.apply(ImageLoader, arguments);
	},
	_checkConfigInitialized: function() {
		Logger.debug("enter _checkConfigInitialized()");
		if (GM_getValue(this._configKey_autoloading) === undefined ||
			GM_getValue(this._configKey_enable_duplicateFilter) === undefined ||
			GM_getValue(this._configKey_enableFilterImageSize) === undefined ||
			GM_getValue(this._configKey_filterImageSize) === undefined ||
			GM_getValue(this._configKey_thumbnail_width) === undefined ||
			GM_getValue(this._configKey_thumbnail_height) === undefined ||
			GM_getValue(this._configKey_disable_keybordShortcut) === undefined) {
				
			//set default values.
			GM_setValue(this._configKey_autoloading, true);
			GM_setValue(this._configKey_enable_duplicateFilter, true);
			GM_setValue(this._configKey_enableFilterImageSize, true);
			GM_setValue(this._configKey_filterImageSize, 100);
			GM_setValue(this._configKey_thumbnail_width, 170);
			GM_setValue(this._configKey_thumbnail_height, 170);
			GM_setValue(this._configKey_disable_keybordShortcut, false);

			Logger.debug(this._configKey_autoloading 
				+ "=" + GM_getValue(this._configKey_autoloading)
				+ ", " + this._configKey_enable_duplicateFilter
				+ "=" + GM_getValue(this._configKey_enable_duplicateFilter)
				+ ", " + this._configKey_enableFilterImageSize
				+ "=" + GM_getValue(this._configKey_enableFilterImageSize)
				+ ", " + this._configKey_filterImageSize
				+ "=" + GM_getValue(this._configKey_filterImageSize)
				+ ", " + this._configKey_thumbnail_width
				+ "=" + GM_getValue(this._configKey_thumbnail_width)
				+ ", " + this._configKey_thumbnail_height
				+ "=" + GM_getValue(this._configKey_thumbnail_height)
				+ ", " + this._configKey_disable_keybordShortcut
				+ "=" + GM_getValue(this._configKey_disable_keybordShortcut)
				)
			return false;
		}
		return true;
	},
	configPanel: null,
	_configPanel_id: "__config_panel_id__",
	showConfigPanel: function() {
		ImageLoader._showConfigPanel.apply(ImageLoader, arguments);
	},
	_showConfigPanel: function() {
		
		Logger.debug("showConfigPanel.");
		if (this.configPanel != null) return;
		this._setModeDisableKeybordNavigation();
		
		var configPanel = 
			<div id="__config_panel_id__">
				<p>ImageLoader config</p>
				<div class="checkboxContainer">
					<input type="checkbox" id="__config_disable_keybordShortcut" />
					<label for="__config_disable_keybordShortcut">
						disable keybord shortcut.</label>
				</div>
				<div class="checkboxContainer">
					<input type="checkbox" id="__enable_autoloading" />
					<label for="__enable_autoloading">enable auto loading.</label>
				</div>
				<div class="checkboxContainer">
					<input type="checkbox" id="__enable_dup_filter" />
					<label for="__enable_dup_filter">enable filter duplicate image.</label>
				</div>
				<div class="checkboxContainer">
					<input type="checkbox" id="__enable_filter_image_size" />
					<label for="__enable_filter_image_size">enable filter image by size.</label>
				</div>
				<div class="textinputContainer">
					<label for="__filter_image_size" > filter image width less or equal(px)</label>
					<input type="text" id="__filter_image_size"/>
				</div>
				<hr/>
				<div class="textinputContainer">
					<label for="__config_thumbnail_width" >thumbnail width(px)</label>
					<input type="text" id="__config_thumbnail_width"/>
				</div>
				<div class="textinputContainer">
					<label for="__config_thumbnail_height" >thumbnail height(px)</label>
					<input type="text" id="__config_thumbnail_height"/>
				</div>
				<div style="text-align: center; padding-top: 10px;">
					<input id="__imageloader_config_button" type="button" value=" OK "/>
				</div>
			</div>
		$appendE4X(document.body, configPanel);
		this.configPanel = $(this._configPanel_id);
		
		setInitialValue(this._configKey_disable_keybordShortcut);
		setInitialValue(this._configKey_autoloading);
		setInitialValue(this._configKey_enable_duplicateFilter);
		setInitialValue(this._configKey_enableFilterImageSize);
		setInitialValue(this._configKey_filterImageSize);
		setInitialValue(this._configKey_thumbnail_width);
		setInitialValue(this._configKey_thumbnail_height);

		$("__imageloader_config_button").addEventListener("click", function() {
			setValue(ImageLoader._configKey_disable_keybordShortcut);
			setValue(ImageLoader._configKey_autoloading);
			setValue(ImageLoader._configKey_enable_duplicateFilter);
			setValue(ImageLoader._configKey_enableFilterImageSize);
			setValue(ImageLoader._configKey_filterImageSize);
			setValue(ImageLoader._configKey_thumbnail_width);
			setValue(ImageLoader._configKey_thumbnail_height);
			$remove(ImageLoader.configPanel);
			ImageLoader.configPanel = null;
			if (ImageLoader._mode == null) ImageLoader.init();
			ImageLoader.setModeEableKeybordNavigation();

			function setValue(id) {
				var target = $(id);
				if (!target) return;
				if (target.type == "checkbox") {
					Logger.debug("set  id[" + id + "] value [" + target.checked + "]");
					GM_setValue(id, target.checked);
				} else if (target.type == "text") {
					Logger.debug("set id[" + id + "] value [" + target.value + "]");
					GM_setValue(id, target.value);
				}
			}
		}, false);
		return;

		function setInitialValue(id) {
			var target = $(id);
			if (!target) return;
			if (target.type == "checkbox") {
				var checked = GM_getValue(id);
				if (checked === true) {
					target.checked = true;
				}
				Logger.debug("setInitialValue  id[" + id + "] value [" 
					+ target.checked + "]");
				return;
			}
			if (target.type == "text") {
				var value = GM_getValue(id);
				if (value) {
					target.value = value;
				}
				Logger.debug("setInitialValue id[" + id + "] value [" 
					+ target.value + "]");
				return;
			}			
		}
	},
	
	/* ------------------------------------------------------------------
	 *  mode
	 * ------------------------------------------------------------------ */
    _mode: null,
    _mode_initialized: 0,
    _mode_preloaded: 1,
    _mode_slideShow: 2,
    _mode_slideShow_expandImage: 3,
	_mode_thumbnail: 4,
	_setModeInitialized: function() {
		this._mode = this._mode_initialized;
	},
	_isModeInitialized: function() {
		return this._mode == this._mode_initialized;
	},
	_setModePreloaded: function() {
		this._mode = this._mode_preloaded;
	},
	_isModePreloaded: function() {
		return this._mode == this._mode_preloaded;
	},
	_setModeSlideShow: function() {
		this._mode = this._mode_slideShow;
	},
	_isModeSlideShow: function() {
		return this._mode == this._mode_slideShow;
	},
	_setModeSlideShowExpandImage: function() {
		this._mode = this._mode_slideShow_expandImage;
	},
	_isModeSlideShowExpandImage: function() {
		return this._mode == this._mode_slideShow_expandImage;
	},
	_setModeThumbnail: function() {
		this._mode = this._mode_thumbnail;
	},
	_isModeThumbnail: function() {
		return this._mode == this._mode_thumbnail;
	},
	_setModeDisableKeybordNavigation: function() {
		//add 1000 to mode.
		this._mode += 1000;
	},
	setModeEableKeybordNavigation: function() {
		ImageLoader._setModeEableKeybordNavigation.apply(ImageLoader, arguments);
	},
	_setModeEableKeybordNavigation: function() {
		this._mode -= 1000;
	},
	_isModeDisableKeybordNavigation: function() {
		return this._mode >= 1000;
	},


	/* ------------------------------------------------------------------
	 *  preload and replace images
	 * ------------------------------------------------------------------ */
    _extractImageAnchors: function(){
        var allAnchor = document.getElementsByTagName('a');
		if (GM_getValue(this._configKey_enable_duplicateFilter)) {
			allAnchor = _uniqueAnchor(allAnchor);//filter duplicate urls.
		}
		
		var counter = 0;
        for (var i = 0; i < allAnchor.length; i++) {
            if (this._isImageUrl(allAnchor[i].href)) {
				//IndexはDOM上の出現順によるカウントを使う。よって、Loadエラーなどで歯抜けになることもある
                this._setImage(counter, allAnchor[i], null, null);
				counter++;
            }
        }
		return;
		
	    function _uniqueAnchor(anchors){
			var urls = {};
			var ret = [];
			for (var i = 0; i < anchors.length; i++) {
				var url = anchors[i].href;
				if (url && urls[url] === undefined) {
					ret.push(anchors[i]);
					urls[url] = null;
				} else {
					Logger.info("filterd image [" + url + "]");
				}
			}
			return ret;
	    }
    },
	
	loadImages: function() {
		ImageLoader._loadImages.apply(ImageLoader, arguments);
	},
	_loadImages: function() {
		if (this._mode != this._mode_initialized) {
			//clear for reload images.
			Logger.info("reload images.")
			this._cancel();
			this._addKeybordEventListers();
			this._extractImageAnchors();
		    this._setModeInitialized();
		}
		this._preloadImages();
	},
	//_load_images のAnchorが指し示す画像をtemp_container上で読み込む
    _preloadImages: function(){
		Logger.debug("enter _preloadImages()" + this._load_images);
        if (this._tempContainer == null) {
            var div = document.createElement("div");
            div.setAttribute("style", "height:0px; overflow: scroll");
            document.body.appendChild(div);
            this._tempContainer = div;
        }
        for (var i = 0; i < this._load_images.length; i++) {
            var entity = this._load_images[i];
            var url = entity.anchor.href;
			this._preloadImage(entity);
	        Logger.debug(" preloadImages count[" + i + "] [" + url + "]");
        }
		this._setModePreloaded();		
    },
	preloadImage: function(entity) {
		ImageLoader._preloadImage.apply(ImageLoader, arguments);	
	},
	_preloadImage: function(entity){
		Logger.debug("preload image [" + entity.anchor.href);
        var imgTag = document.createElement("img");
		var i = entity.index;
        var url = entity.anchor.href;
        imgTag.src = url;
        this._setImage(entity.index, entity.anchor, imgTag, null);
        this._tempContainer.appendChild(imgTag);
        imgTag.setAttribute("index", i);
        imgTag.addEventListener("load", function(){
            ImageLoader.loadedEvent(this);
        }, false);
        imgTag.addEventListener("error", function(){
            Logger.error("load img error [" + this.src + "]");
            ImageLoader.loadErrorEvent(this);
        }, false);		
	},	
	/**
	 * imgタグがonloadした際の処理
	 * @param {Object} loadedImage
	 */
    loadedEvent: function(loadedImage){
        ImageLoader._loadedEvent.call(ImageLoader,loadedImage);//rewrite this.
    },
    _loadedEvent: function(loadedImage){
		Logger.debug("enter _loadedEvent():" + loadedImage.src);
		//filter image by width.
		if (GM_getValue(this._configKey_enableFilterImageSize)) {
			var width = this._culcurateElementSize(loadedImage).width;
			var filterdSize = parseInt(GM_getValue(this._configKey_filterImageSize))
			if (!isNaN(filterdSize) && width < filterdSize) {
				Logger.info("filtered by width[" + width + "] [" + loadedImage.src + "]");
				this._filterd_by_size_images.push({index: loadedImage.index, url: loadedImage.src});
				this._showSplashOrInfo();
				return;
			}
		}
		this._loaded_count++;
        Logger.debug("loadedEvent index[" 
			+ loadedImage.getAttribute("index") + "] " + loadedImage.src);
        this._replaceAnchor(this._getLoadedImage(loadedImage.getAttribute("index")));

        this._showSplashOrInfo();
    },
    loadErrorEvent: function() {
        ImageLoader._loadErrorEvent.call(ImageLoader, arguments[0]);
    },
    _loadErrorEvent: function(source) {
        var index = source.getAttribute("index");
        this._load_failures.push({index: index, url: source.src});
        this._showSplashOrInfo();
    },
    _setImage: function(key, anc, preload, base){
		//Logger.debug("enter _setImage() " + key + "," + anc + "," + preload + "," + base );
        if (key == null || key == undefined) {
			Logger.warn("key is null or undefined... abort to set image.");
			return;
        }
        this._load_images[key] = {
            index: key,
            anchor: anc,
            preloaded: preload,
            base: base,
        };
    },
    _getLoadedImage: function(key){
        return this._load_images[key];
    },
    _getNextLoadedImage: function(_index){
        var nextEntity;
        while (true) {
            nextEntity = this._getLoadedImage(new Number(_index) + 1);
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
    _getPrevLoadedImage: function(_index){
        var prevEntity;
        while (true) {
            prevEntity = this._getLoadedImage(new Number(_index) - 1);
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
	
	//aタグをリンク先の画像をセットしたimgタグに置き換える
    _replaceAnchor: function(entity){
		Logger.debug("enter _replaceAnchor()" + entity);
        Logger.info("_replaceAnchor index[" + entity.index + "] url[" +
            entity.anchor.href + "]");
        var anchor = entity.anchor;
        var url = anchor.href;
        var image = entity.preloaded;
        var imgSize = this._culcurateElementSize(image);
        var parentSize = this._culcurateParentElementSize(anchor);
        var imgTag = this._tempContainer.removeChild(image);//preloadした画像を取得
        var reductionRatio = 1;//画像の縮小率
        var browserWSize = this._culcurateBrowserWindowSize();
		
        Logger.debug("index[" + entity.index + "] img[" + url 
			+ "]  width[" + imgSize.width + "]  height[" + imgSize.height + "]");

        //親要素より10px小さく規制する。
		var defaultMargin = 10;
		//幅から算出した縮小率
        if (imgSize.width > parentSize.width - defaultMargin) {
            reductionRatio = (parentSize.width - defaultMargin) / imgSize.width;
        }
		//縦から算出した縮小率が小さければ上書き
	    if (imgSize.height > parentSize.height - defaultMargin) {
	        var tempRatio = (parentSize.height - defaultMargin) / imgSize.height;
			if (tempRatio < reductionRatio) {
				reductionRatio = tempRatio;
			}
	    }
        //さらに規制後の画像幅がブラウザ表示幅より広かったら、ブラウザ表示幅で規制。
        //スクロールの幅を考慮して40px小さく規制
        if (imgSize.width * reductionRatio > browserWSize.width - 40) {
            reductionRatio = (browserWSize.width - 40) / imgSize.width;
            Logger.debug("browserWidth : " + browserWSize.width);
        }
        Logger.debug("reductionRatio [" + reductionRatio + "]");
        adaptW = Math.ceil(imgSize.width * reductionRatio);
        adaptH = Math.ceil(imgSize.height * reductionRatio);
        var imgTagStyle = "width:" + adaptW + "px; height:" 
			+ adaptH + "px;" + "border:2px solid green;";
        imgTag.setAttribute("origSize", imgSize.width + "," + imgSize.height);
        imgTag.setAttribute("adaptSize", adaptW + "," + adaptH );
        imgTagStyle += "cursor:-moz-zoom-in;";
        imgTag.title = "click to popup image in orignal size. and slide show.";
        imgTag.addEventListener("click", ImageLoader.popImage, false);
        this._addStyle(imgTag, imgTagStyle);		
        var base = document.createElement("span");
        var messageBar = createMessageBar({
                width: adaptW, height: adaptH,
                origWidth: imgSize.width, origHeight: imgSize.height,
                ratio: reductionRatio, url: url, tag: imgTag,
            });
        base.appendChild(imgTag);
        base.appendChild(messageBar);
        var parent = anchor.parentNode;
        parent.insertBefore(base, anchor);
        anchor.style.display = "none";
        this._setImage(entity.index, entity.anchor, entity.preloaded, base);
        
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
            message.style.width = img.width - 2 + "px";
            if (img.ratio == 1) {
                message.innerHTML = "size[" + img.origWidth + " x " + img.origHeight + "]. ";
            } else {
                var icon_zoom = document.createElement("img");
                icon_zoom.setAttribute("style","vertical-align:middle; border:0; cursor: -moz-zoom-in; margin:0px 3px;");
                icon_zoom.src = _icon_zoomin_base64;
                icon_zoom.title = "click to popup image in orignal size. and slide show.";
                message.innerHTML += "original[" +
                imgSize.width + " x " + imgSize.height + "] now[" + Math.ceil(img.ratio * 1000) / 10 + "%]";
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
            icon_window.src = _icon_window_base64;
            icon_window.setAttribute("style", "vertical-align:middle; border:0; margin:0px 3px;");
            newAnchor.appendChild(icon_window);
            
            //cancel buttton
            var cancel = document.createElement("img");
            cancel.src = _icon_forbidden_base64;
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
	startSlideShowFromFirst: function() {
		ImageLoader._startSlideShowFromFirst.apply(ImageLoader, arguments);
	},
	_startSlideShowFromFirst: function() {
		if (this._isModeInitialized()) {
			var load = confirm("ImageLoader: \n you must load images first. load now?");
			if (load) {
				this._preloadImages();
			}
			return;
		}
		if (this._isModeThumbnail()) {
			this._hideThumbnail();			
		}
        var firstValidImg = this._getNextLoadedImage(-1).preloaded;
        if (firstValidImg.getAttribute("origSize")) {
            this._popImage(firstValidImg)
        }
	},
    popImage: function(){
        ImageLoader._popImage.call(ImageLoader,this);//rewrite this.
    },
    _popImage: function(pop){
		this._setModeSlideShow();
        Logger.debug("popImageToTop index[" 
				+ pop.getAttribute("index") + "] " + pop.src);
        var nowWidth = pop.style.width.replace("px", "");
        var doc = window.document;
        
		//画像のサイズ調整やクリックイベント付与など
        var copyImg = doc.importNode(pop, true);
		copyImg.id = this._popedImage_id_;
        this._addStyle(copyImg, "border: 3px double gray;");
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
		
		//スライドショーのUIを表示
		if ($(this._background_id_)) {
			//すでに前のスライドショーUIが表示されていた場合は、
			//imgタグだけを差し替えのために削除
			this._refleshPopImage();
		} else {
			//新規にスライドショーのUIを作成
			createPopupScreen();
		}
		
		//スライドショーのUIにポップアップさせるimgタグを表示
		//set image.
		var imageTarget = $("__imagebase_id__");
		$append(imageTarget, copyImg);

		//表示したスライドショーUIの位置を制御
		var base = $("__background_id__");
		this._fitToBrowserWindow(base);
		
		//表示したスライドショーUIのサイズを制御
		var backgroundScreen = $("__background_screen_");
		this._fitSizeToScreenDimension(backgroundScreen);
		var imagebase = $("__imagebase_id__");
		this._fitSizeToScreenDimension(imagebase);

		//set toolbar text;
		var toolbarContents = $("__toolbar_content__");
        var origWidth = pop.getAttribute("origSize").split(",")[0];
        var origHeight = pop.getAttribute("origSize").split(",")[1];
		if (reductionRatio == 1) {
            toolbarContents.innerHTML = (1 + new Number(pop.getAttribute("index"))) 
				+ " / " + ImageLoader._load_images.length 
				+ "&nbsp;&nbsp;&nbsp;&nbsp;size[" + origWidth + " x " 
				+ origHeight + "]&nbsp;&nbsp;&nbsp;&nbsp";
        } else {
            toolbarContents.innerHTML = (1 + new Number(pop.getAttribute("index")))
                 + " / " + ImageLoader._load_images.length 
				 + "&nbsp;&nbsp;&nbsp;&nbsp;original[" + origWidth + " x " 
				 + origHeight + "] now[" + Math.ceil(reductionRatio * 1000) / 10 
				 + "%]&nbsp;&nbsp;&nbsp;&nbsp";
        }
		
		//anchor href
		$("__original_link__").addEventListener("click",function() {
            arguments[0].stopPropagation();
        },false);
		
		//背景をクリックするとスライドショー終了
		$("__imagebase_id__").addEventListener("click", function() {
			ImageLoader.closePopImage();
            arguments[0].stopPropagation();
		}, false);

		return;
		
		function createPopupScreen() {
			Logger.debug(" *** enter createPopupScreen()");
			var base = 
			<div id="__background_id__" title="click to close.">
				<div id="__background_screen_"> </div>
				<div id="__imagebase_id__">
					<div id="__toolbar_id__" title="| -> or 'j': next image | <- or 'k': prev image | 'm': resize image | 'ESC': close slide show |">
						<span id="__toolbar_content__">    
						</span>
						<img id="__icon_left__" title="click to show previous image." />
						<img id="__icon_right__" title="click to show next image."/>
						<img id="__icon_zoom__" title="click to original size."/>
						<a id="__original_link__" href="#" target="_blank" title="click to open original image in new window.">
						<img id="__icon_arrow_out__"  />
						</a>
						<img id="__icon_close__" title="click to close slide show."/>
						<img id="__icon_thumbnail__" title="click to show thumbnail"/>
					</div>
				</div>
			</div>
			var test = $appendE4X(document.body, base);
			
			//set icons.
			var icon_left = $("__icon_left__");
			icon_left.src = icon_arrow_left_base64;
			icon_left.addEventListener("click", function(){
                ImageLoader.previousImage();
                arguments[0].stopPropagation();
            }, false);
			var icon_right = $("__icon_right__");
			icon_right.src = icon_arrow_right_base64;
			icon_right.addEventListener("click", function(){
                ImageLoader.nextImage();
                arguments[0].stopPropagation();
            }, false);
			//虫眼鏡icon
            var icon_zoom = $("__icon_zoom__");
			icon_zoom.src = icon_zoom_base64;
			icon_zoom.addEventListener("click", function(){
                ImageLoader.orignalSizeImage();
                arguments[0].stopPropagation();
            }, false);
			//矢印が四方に向いているicon
			var icon_arrow_out = $("__icon_arrow_out__");
			icon_arrow_out.src = icon_arrow_out_base64;
			//バッテンicon
			var icon_close = $("__icon_close__");
			icon_close.src = icon_cross_base64;
			icon_close.addEventListener("click", function() {
				ImageLoader.closePopImage();
                arguments[0].stopPropagation();
            }, false);
			//サムネール移行用icon
			var icon_show_thumbnail = $("__icon_thumbnail__");
			icon_show_thumbnail.src = icon_pictures_base64;
			icon_show_thumbnail.addEventListener("click", function() {
				ImageLoader.switchToThumbnail();
                arguments[0].stopPropagation();
			}, false);
		}
    },
    orignalSizeImage: function() {
        ImageLoader._orignalSizeImage.apply(ImageLoader,arguments);
    },
    _orignalSizeImage: function() {
        try {
            arguments[0].stopPropagation();
        } catch(ignore) {}
        var img = this._getPopedImage();
        if (!img.getAttribute("origSize")) return;
		var imgWidth = img.getAttribute("origSize").split(",")[0];
        img.style.width = imgWidth + "px";
        img.style.height = img.getAttribute("origSize").split(",")[1] + "px";
		var imgBaseWidth = $("__imagebase_id__").style.width;
		if (imgBaseWidth < imgWidth) {
			imgBaseWidth = imgWidth + "px";
		}
        img.removeEventListener("click",ImageLoader.orignalSizeImage,false);
        img.addEventListener("click",function(){
            ImageLoader._popImage(this);
            arguments[0].stopPropagation();
        },false);
    },
    switchImageSize: function() {
        ImageLoader._switchImageSize.apply(ImageLoader,arguments);
    },
    _switchImageSize: function() {
        var img = this._getPopedImage();
        if (!img) return;
        var origWidth = img.getAttribute("origSize").split(",")[0];
        var nowWidth = this._culcurateElementSize(img).width;
        if (origWidth != nowWidth) {
            this._orignalSizeImage(arguments);
			this._mode = this._mode_slideShow_expandImage;
        } else {
            this._popImage(img);
			this._mode = this._mode_slideShow;
        }
    },
    closePopImage: function() {
        ImageLoader._closePopImage.apply(ImageLoader, arguments);
    },
    _closePopImage: function() {
        $remove($(this._background_id_));
        this._mode = this._mode_preloaded;
    },
	_refleshPopImage:function() {
		//img削除
		var img = $(this._popedImage_id_);
		img.parentNode.removeChild(img);
	},
    _background_id_: "__background_id__",
    _imagebase_id_: "__imagebase_id__",
	_popedImage_id_: "__poped_image_id__",
    nextImage: function(){
        ImageLoader._nextImage.call(ImageLoader, ImageLoader._getPopedImage());
    },
    _nextImage: function(){
        var source = arguments[0];
        var nowIndex = source.getAttribute("index");
        var nextEntity = this._getNextLoadedImage(nowIndex);
        if (!nextEntity) {
			this._info("this is last image.");
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
        var prevEntity = this._getPrevLoadedImage(nowIndex);
        if (!prevEntity) {
			this._info("this is first image.");
            return;
        }
        Logger.debug("_prevImage [" + prevEntity.preloaded.getAttribute("index") + 
            " : " + prevEntity.preloaded.src + "]");
        this._popImage(prevEntity.preloaded);
    },
	switchToThumbnail: function() {
		ImageLoader._switchToThumbnail.apply(ImageLoader, arguments);
	},
	_switchToThumbnail: function() {
		Logger.debug("enter switchToThumbnail()");
		//slideshowのimgを取得
		var img = this._getPopedImage();
		//index取得
		var index = img.getAttribute("index");
		this.closePopImage();
		this._showThumbnail(index);
	},
	
    keybordNavigation: function() {
        ImageLoader._keybordNavigation.apply(ImageLoader,arguments);
    },
    _keybordNavigation: function() {
		if (GM_getValue(this._configKey_disable_keybordShortcut) ||
			this._isModeDisableKeybordNavigation()) {
			return;
		}
		Logger.debug("enter _keyboardNavigation()");
        var ev = arguments[0];
        var keyc = ev.keyCode;
        var charc = ev.charCode;
        var key = keyc || charc;
//        Logger.debug("keycode [" + keyc + "] charcode [" + charc + "] key [" + key + "]");
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
				case 13: //ENTER
					this._switchToThumbnail();
					break;

                default :
                    preventDefault = false;
            }
        } else if (this._mode == this._mode_slideShow_expandImage) {
            if (ev.altKey || ev.ctrlKey || ev.shiftKey) return;
            preventDefault = true;
            switch (key) {
                case 39: // ->
                case 37: // <-
                	//allow key is defalut action.
                    preventDefault = false;
                    break;
                case 72: //h
                	this.Scroller.left();
					break;
                case 75: //k
                	this.Scroller.up();
					break;
                case 74: //j
                	this.Scroller.down();
					break;
                case 76: //l
                	this.Scroller.right();
					break;
                case 27: //ESC
                    this._closePopImage();
                    break;
                case 77: //m
                    this.switchImageSize();
                    break;
				case 13: //ENTER
					this._switchToThumbnail();
					break;
                default :
                    preventDefault = false;
            }
			
		} else if ( this._mode == this._mode_initialized ||
					this._mode == this._mode_preloaded	) {
            if (ev.ctrlKey && key == 190) { //cntl + .
            	this.startSlideShowFromFirst();
            } else if (ev.ctrlKey && key == 188) { //cntl + ,
            	this.showThumbnail();
            }
        } else if (this._mode == this._mode_thumbnail) {
            if (ev.altKey || ev.ctrlKey || ev.shiftKey) return;
            preventDefault = true;
            switch (key) {
                case 74: //j
                case 40: // arrow down
                	this._thumbnail_nextRowItem();
                    break;
                case 75: //k
                case 38: // arrow up
                	this._thumbnail_prevRowItem();
                    break;
                case 72: //h
                case 37: // <-
                	this._thumbnail_prevItem();
					break;
                case 39: // ->
                case 76: //l
                	this._thumbnail_nextItem();
					break;
                case 80: //p
                	this._thumbnail_prevPage();
					break;
                case 78: //n
                	this._thumbnail_nextPage();
					break;
                case 82: //r
                	this._thumbnail_reload();
					break;
                case 27: //ESC
                    this._hideThumbnail();
                    break;
				case 13: //ENTER
					this._thumbnail_startSlideShow();
					break;
                default :
                    preventDefault = false;
            }
			
		}
		
        if (preventDefault) {
            ev.preventDefault();
            ev.stopPropagation();
        }
    },
    _getPopedImage: function() {
        var doc = window.document;
        var background = $top(this._imagebase_id_);
        var nodes = background.childNodes;
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].tagName == "IMG") {
                return nodes[i];
            }
        }
        Logger.warn("_getPopedImage returns null!");
    },
    resizer: function() {
        ImageLoader._resizer.apply(ImageLoader,arguments);
    },
    _resizer: function() {
        if(this._isModeSlideShow()) {
            this._popImage(this._getPopedImage());
        }
		if (this._isModeThumbnail()) {
			this._thumbnail_reload();
		}
    },
        
    /* splash */
    _splashIsShown: false,
    _splashElement: null, //{base,p,indicator}
    _splashFadeoutTimer: null,
    _splashFadeoutInterval: 100, //in msec.
    _splashFadeoutAmount: 0.05,
    _showSplashOrInfo: function() {
        Logger.debug("show splash or info.");
        var count = this._loaded_count;
        var count_total = this._load_images.length;
        var doc = window.document;
        var browserWin = this._culcurateBrowserWindowSize();
        var loadingIndicator = "chrome://global/skin/icons/loading_16.png";
        if (!this._splashIsShown) {
            this._splashIsShown = true;
			var splashUI = 
				<div id="__imageloader_loading_" style="opacity: 0.7">
					<img id="__imageloader_indicator_" height="16" width="16" src="chrome://global/skin/icons/loading_16.png"/>
					<span id="__imageloder_loading_info_">ImageLoader. loading.... 8 images.<br/> now loaded 2images.</span>
				</div>
			$appendE4X(document.body, splashUI);
        }
        var base = $("__imageloader_loading_");
        var indicator = $("__imageloader_indicator_");
        var msg = $("__imageloder_loading_info_");

        var totalImages = this._load_images.length;
        var loadedImages = this._loaded_count;
        var failImages = this._load_failures.length;
		var filterdImages = this._filterd_by_size_images.length;
        if (totalImages != (loadedImages + failImages + filterdImages)) {
            msg.innerHTML = "ImageLoader. loading.... " + count_total + " images.<br> now loaded " + count + "images.";
            return;
        }
        base.removeChild(indicator);
        if (failImages != 0) {
            msg.innerHTML = "ImageLoader. finish loading.<br> " + 
                "loaded: " + count_total + " images. filterd: " + filterdImages
				 +" images.<br> <span style='color:red'>load failure: " +
                failImages + "images.</span>"
        } else {
            msg.innerHTML = "ImageLoader. finish loading.<br>loaded: " + count_total + " images."
        }
        this._splashFadeoutTimer = setTimeout(ImageLoader.fadeOutSplash, 5000);
    },
    fadeOutSplash: function() {
        ImageLoader._fadeOutSplash.apply(ImageLoader,arguments);
    },
    _fadeOutSplash: function() {
        var target = $("__imageloader_loading_");
        var nowOpacity = target.style.opacity;
        if (nowOpacity == 0) {
            window.document.body.removeChild(target);
			this._splashIsShown = false;
            return;
        }
        target.style.opacity = nowOpacity - this._splashFadeoutAmount;
        clearTimeout(this._splashFadeoutTimer);
        this._splashFadeoutTimer = setTimeout(function(){
            ImageLoader.fadeOutSplash()
        },this._splashFadeoutInterval);
    },

    /* Cancel */
    cancel: function()	{
        ImageLoader._cancel.apply(ImageLoader,arguments);
    },
    _cancel: function() {
        Logger.info("cancel ImageLoader.");
        var entity = this._load_images;
        for (var i = 0; i < entity.length; i++) {
            //remove images.
            try {
                var parent = entity[i].base.parentNode;
                parent.removeChild(entity[i].base);
                //restore anchors.
                entity[i].anchor.style.display = "inline";
            } catch(ignore){}
        }
        this._load_images = [];
		this._load_failures = [];
		this._loaded_count = 0;
		this._filterd_by_size_images = [];
        this._mode = null;
		this._tempContainer = null;
        window.removeEventListener("keydown", ImageLoader.keybordNavigation, false);
        window.removeEventListener("resize", ImageLoader.resizer, false);
    },

	/* thumbnail */
	Thumb : {
		index: 0,//サムネールで選択中IMGのindex：全イメージで通し番号
		col: 6,
		row: 3,			
		image_height: 200,
		image_width: 200,
		items: null,
		borderStyle: "2px solid yellow",
	},
	showThumbnail: function() {
		ImageLoader._showThumbnail.apply(ImageLoader,arguments);
	},
	_showThumbnail: function(cursorIndex) {
		if (this._isModeInitialized()) {
			var load = confirm("ImageLoader: \n you must load images first. load now?");
			if (load) {
				this._preloadImages();
			}
			return;
		}
		if (this._isModeSlideShow()) {
			this.closePopImage();
		}
		if (this._isModeThumbnail()) {
			//すでにサムネールモードだったら、createThumbnail()を呼ぶべき
			return;
		}
		//init thumbnail size.
		this.Thumb.image_width = GM_getValue(this._configKey_thumbnail_width)
		if (isNaN(new Number(this.Thumb.image_width))) {
			this.Thumb.image_width = 150;
		}
		this.Thumb.image_height = GM_getValue(this._configKey_thumbnail_height)
		if (isNaN(new Number(this.Thumb.image_height))) {
			this.Thumb.image_height = 150;
		}

		this._setModeThumbnail();
		//cursorIndexは0から始める。
		//第一引数はカーソル位置（インデックス）
		Logger.debug("enter _showThumnail() index:" + cursorIndex);
		this.Thumb.index = cursorIndex;
		if (!cursorIndex) {
			this.Thumb.index = 0;//デフォルト位置は、0

		}
		//UIの表示
		this._showThumbnailUi();
		//カーソル位置に応じて、ページを変えてサムネール表示
		this._createThumbnails();
	},
	_showThumbnailUi: function() {
		Logger.debug("enter _showThumbnailUi()");
		var ui = 
		<div id="__thumbnail_base_">
			<div id="__thumbnail_background_screen_">
			</div>
			<div id="__thumbnail_contents_">
				<div id="__thumbnail_toolbar_">
					<span id="__thumbnail_info_"><![CDATA[]]></span>
					<img id="__thumbnail_icon_prevPage" title="show previous page"/>
					<img id="__thumbnail_icon_left" title="move selection to the left"/>
					<img id="__thumbnail_icon_up"  title="move selection to up"/>
					<img id="__thumbnail_icon_down"  title="move selection to down"/>
					<img id="__thumbnail_icon_right"  title="move selection to the right"/>
					<img id="__thumbnail_icon_nextPage" title="show next page"/>
					<img id="__thumbnail_icon_reflesh"  title="reload thumbnails"/>
					<img id="__thumbnail_icon_close"  title="close thumbnails"/>
					<img id="__thumbnail_icon_show_slideshow"  title="start slide show"/>
				</div>
				<table>
					<tbody id="__thumbnail_">
					</tbody>
				</table>
			</div>
		</div>
		$appendE4X(document.body, ui);
		
		$("__thumbnail_base_").addEventListener("click", function() {
			ImageLoader._hideThumbnail();
		}, false);
		$("__thumbnail_toolbar_").addEventListener("click", function() {
			arguments[0].stopPropagation();
		}, false);
		$("__thumbnail_").addEventListener("click", function() {
			arguments[0].stopPropagation();
		}, false);

		
		var icon_prevPage = $("__thumbnail_icon_prevPage");
		icon_prevPage.src = icon_arrow_turn_left_base64;
		icon_prevPage.addEventListener("click", function() {
			ImageLoader.thumbnail_prevPage();
		}, false);
		var icon_left = $("__thumbnail_icon_left");
		icon_left.src = icon_arrow_left_base64;
		icon_left.addEventListener("click", function() {
			ImageLoader.thumbnail_prevItem();
		}, false);
		var icon_up = $("__thumbnail_icon_up");
		icon_up.src = icon_arrow_up_base64;
		icon_up.addEventListener("click", function() {
			ImageLoader.thumbnail_prevRowItem();
		}, false);
		var icon_down = $("__thumbnail_icon_down");
		icon_down.src = icon_arrow_down_base64;
		icon_down.addEventListener("click", function() {
			ImageLoader.thumbnail_nextRowItem();
		}, false);
		var icon_right = $("__thumbnail_icon_right");
		icon_right.src = icon_arrow_right_base64;
		icon_right.addEventListener("click", function() {
			ImageLoader.thumbnail_nextItem();
		}, false);
		var icon_nextPage = $("__thumbnail_icon_nextPage");
		icon_nextPage.src = icon_arrow_turn_right_base64;
		icon_nextPage.addEventListener("click", function() {
			ImageLoader.thumbnail_nextPage();
		}, false);
		var icon_reflesh = $("__thumbnail_icon_reflesh");
		icon_reflesh.src = icon_arrow_refresh_base64;
		icon_reflesh.addEventListener("click", function() {
			ImageLoader.thumbnail_reload();
		}, false);
		var icon_close = $("__thumbnail_icon_close");
		icon_close.src = icon_cross_base64;
		icon_close.addEventListener("click", function() {
			ImageLoader._hideThumbnail();
		}, false);
		var icon_show_slideShow = $("__thumbnail_icon_show_slideshow");
		icon_show_slideShow.src = icon_picture_base64;
		icon_show_slideShow.addEventListener("click", function() {
			ImageLoader.thumbnail_startSlideShow();
		}, false);
		
		this._fitToBrowserWindow($("__thumbnail_base_"));
		this._fitSizeToBody($("__thumbnail_background_screen_"));
		this._fitSizeToBody($("__thumbnail_contents_"));
	},
	
	//tableにimageを入れていく
	_createThumbnails: function() {
		//colとrowの個数を決める
		var winSize = this._culcurateBrowserWindowSize();
		var img_w = new Number(this.Thumb.image_width);
		var img_h = new Number(this.Thumb.image_height);
		this.Thumb.col = Math.floor((winSize.width) / (img_w + 10));
		this.Thumb.row = Math.floor((winSize.height) / (img_h + 10));
		if (this.Thumb.col < 1) {
			this.Thumb.col = 1;
		}
		if (this.Thumb.row < 1) {
			this.Thumb.row = 1;
		}
		Logger.debug("win_w:" + winSize.width +", col:" + this.Thumb.col 
				+ "win_h:" + winSize.height + ", row:" + this.Thumb.row);

		var cursorIndex = this.Thumb.index;//全イメージで通し番号のindex。0から始める。
		var pageItems = this.Thumb.col * this.Thumb.row;
		var imageTotal = this._load_images.length;
		var nowPage = this._thumbnail_getNowPage(cursorIndex);
		//ページ中のカーソル位置を割り出す
		var innerPageIndex = cursorIndex
					 % (this.Thumb.col * this.Thumb.row);
		
		var lastPage = Math.ceil(imageTotal / pageItems);
		Logger.info("enter _createThumbnails() now page: " + nowPage + ", cursorIndex: " + cursorIndex);
		
		//info
		this._updateThumbnailInfo(cursorIndex);
		
		//ページの先頭に来る通しのindexを取得
		var nowIndex = (nowPage - 1) * pageItems;
		var tempImages = [];

		//trを作っていく
		var flagment = document.createDocumentFragment();
		for (var i = 0; i < this.Thumb.row; i++) {
			var tr = $create("tr");
			$append(flagment, tr);
			tr.id = "__row:" + (i + 1);
			for (var j = 0; j < this.Thumb.col; j++,nowIndex++) {
				var td = $create("td");
				$append(tr, td);
				if (!this._load_images[nowIndex]) {
					//読み込む画像が無い場合はdivを付与しない→枠が表示されない
					continue;
				}				
				var div = $create("div");
				div.style.height = this.Thumb.image_height + "px";
				div.style.width = this.Thumb.image_width + "px";

				$append(td, div);
				var serial = $create("span");
				serial.innerHTML = nowIndex + 1;
				serial.id = "__thumbnail_serial_";
				var img = this._load_images[nowIndex].preloaded;
				if (img && img.getAttribute("origSize")) {
					var tempImage = document.importNode(img, false);
					tempImage.style.border = "0px";
					tempImage.title = "";
					tempImage.addEventListener("click", function() {
						ImageLoader.thumbnail_startSlideShow(this);
					}, false);
					$append(div, serial);
					$append(div, tempImage);
					tempImages.push(tempImage);
				} else {
					//画像ロード前かダウンロード時に異常が発生
					var ngMsg = $create("p");
					ngMsg.innerHTML = "loading or ERROR";
					ngMsg.setAttribute("index", nowIndex);
					$append(div, ngMsg);
					tempImages.push(ngMsg);
				}
			}
		}
		$append($("__thumbnail_"), flagment);
		//サムネールを適度に縮小して表示する
		tempImages.forEach(function(img) {
			this._fitSizeToThumbnail(img);
		},this);
		this.Thumb.items = tempImages;
		tempImages[innerPageIndex].style.border = this.Thumb.borderStyle;
	},
	_updateThumbnailInfo: function(index) {
		var imageTotal = this._load_images.length;
		var pageItems = this.Thumb.col * this.Thumb.row;
		var nowPage = this._thumbnail_getNowPage(index);
		var lastPage = Math.ceil(imageTotal / pageItems);
		var infoStr = "" + (new Number(index) + 1) 
			+ "/" + imageTotal;
		var isLoadError = true;
		//オリジナルサイズを表示する
		var item = this._load_images[index];
		if (item && item.preloaded && item.preloaded.getAttribute("origSize")) {
			var h = item.preloaded.getAttribute("origSize").split(",")[0];
			var w = item.preloaded.getAttribute("origSize").split(",")[1];
			infoStr += " original[" + h + " x " + w + "] ";
			isLoadError = false;
		}
		//page表示
		infoStr += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
		infoStr += "page[" + nowPage + "/" + lastPage + "]";
		$("__thumbnail_info_").innerHTML = infoStr;
		
		var slideShowIcon = 
			$("__thumbnail_icon_show_slideshow");
		(isLoadError) ? 
			slideShowIcon.style.display = "none" :
			slideShowIcon.style.display = "inline";
	},
	hideThumbnail: function() {
		ImageLoader._hideThumbnail.apply(ImageLoader, arguments);
	},
	_hideThumbnail: function() {
		$remove($("__thumbnail_base_"));
		this._setModePreloaded();
	},
	thumbnail_nextPage: function(_oldIndex) {
		ImageLoader._thumbnail_nextPage.apply(ImageLoader, arguments);
	},
	_thumbnail_nextPage: function(_oldIndex) {
		var nowPage = this._thumbnail_getNowPage(this.Thumb.index);
		var nextIndex = (nowPage) * (this.Thumb.col * this.Thumb.row);
		if (_oldIndex) {
			nextIndex = _oldIndex;
		}
		Logger.debug("enter _thumbnail_nextPage() :nextIndex[" + nextIndex);
		if (nextIndex >= this._load_images.length) {
			this._info("this is last page.");
			return;
		}
		$removeChildren($("__thumbnail_"));
		this.Thumb.index = nextIndex;
		this._createThumbnails();
	},
	thumbnail_prevPage: function(_oldIndex) {
		ImageLoader._thumbnail_prevPage.apply(ImageLoader, arguments);
	},
	_thumbnail_prevPage: function(_oldIndex) {
		var nowPage = this._thumbnail_getNowPage(this.Thumb.index);
		var items = this.Thumb.col * this.Thumb.row;
		var prevIndex = (nowPage - 2) * items;//前のページの一番先頭のindexを指定する
		if (_oldIndex) {
			prevIndex = _oldIndex;
		}
		Logger.debug("enter _thumbnail_prevPage() :prevIndex[" + prevIndex);
		if (prevIndex < 0) {
			this._info("this is first page.");
			return;
		}
		$removeChildren($("__thumbnail_"));
		this.Thumb.index = prevIndex;
		this._createThumbnails();
	},
	_thumbnail_getNowPage: function(index) {
		var pageItems = this.Thumb.col * this.Thumb.row;
		var nowPage = Math.floor(index / pageItems) + 1;
		Logger.debug("_thumbnail_getNowPage(" + index + ") = " 
			+ nowPage + " / " + pageItems);
		return nowPage;
	},
	thumbnail_nextItem: function(_oldIndex) {
		ImageLoader._thumbnail_nextItem.apply(ImageLoader, arguments);
	},
	_thumbnail_nextItem: function() {
		var images = this.Thumb.items;
		var innerIndex = this._thumbnail_getSelected_inner_index();
		var selectedImage = images[innerIndex];
		var nextImage = images[++innerIndex];
		if (!nextImage) {
			//次のページへ
			this._thumbnail_nextPage(this._thumbnail_getSelected_index() + 1);
			return;
		}
		selectedImage.style.border = "0px";
		nextImage.style.border = this.Thumb.borderStyle;
		this._updateThumbnailInfo(new Number(nextImage.getAttribute("index")));
	},
	thumbnail_prevItem: function(_oldIndex) {
		ImageLoader._thumbnail_prevItem.apply(ImageLoader, arguments);
	},
	_thumbnail_prevItem: function() {
		var images = this.Thumb.items;
		var index = this._thumbnail_getSelected_inner_index();
		var selectedImage = images[index];
		var prevImage = images[--index];
		if (!prevImage) {
			//次のページへ
			this._thumbnail_prevPage(this._thumbnail_getSelected_index() - 1);
			return;
		}
		selectedImage.style.border = "0px";
		prevImage.style.border = this.Thumb.borderStyle;
		this._updateThumbnailInfo(new Number(prevImage.getAttribute("index")));
	},
	thumbnail_nextRowItem: function(_oldIndex) {
		ImageLoader._thumbnail_nextRowItem.apply(ImageLoader, arguments);
	},
	_thumbnail_nextRowItem: function() {
		var images = this.Thumb.items;
		var index = this._thumbnail_getSelected_inner_index();
		var selectedImage = images[index];
		var nextIndex = index + this.Thumb.col;
		var nextImage = images[nextIndex];
		if (!nextImage) {
			//次のページへ
			var nextPageIndex = this._thumbnail_getSelected_index() + this.Thumb.col;
			this._thumbnail_nextPage(nextPageIndex);
			return;
		}
		selectedImage.style.border = "0px";
		nextImage.style.border = this.Thumb.borderStyle;
		var index = nextImage.getAttribute("index");
		this._updateThumbnailInfo(new Number(index));
	},
	thumbnail_prevRowItem: function(_oldIndex) {
		ImageLoader._thumbnail_prevRowItem.apply(ImageLoader, arguments);
	},
	_thumbnail_prevRowItem: function() {
		var images = this.Thumb.items;
		var index = this._thumbnail_getSelected_inner_index();
		var selectedImage = images[index];
		var prevInnerIndex = index - this.Thumb.col;
		var prevImage = images[prevInnerIndex];
		if (!prevImage) {
			//前のページへ
			var prevPageIndex = this._thumbnail_getSelected_index() - this.Thumb.col;
			this._thumbnail_prevPage(prevPageIndex);
			return;
		}
		selectedImage.style.border = "0px";
		prevImage.style.border = this.Thumb.borderStyle;
		var index = prevImage.getAttribute("index");
		this._updateThumbnailInfo(new Number(index));
	},
	/**
	 * サムネール内のインデックスを得る
	 */
	_thumbnail_getSelected_inner_index: function() {
		var selected = null;
		var images = this.Thumb.items;
		var borderStyle = this.Thumb.borderStyle;
		images.forEach(function(img, idx) {
			if (selected) return;//はじめの一件のみを選択する。
			if (img.style.border == borderStyle) {
				selected = idx;
			}
		});
		return selected;
	},
	/**
	 * 通しのインデックスを得る
	 */
	_thumbnail_getSelected_index: function() {
		var selected = null;
		var images = this.Thumb.items;
		var borderStyle = this.Thumb.borderStyle;
		images.forEach(function(img, idx) {
			if (selected) return;//はじめの一件のみを選択する。
			if (img.style.border == borderStyle) {
				selected = new Number(img.getAttribute("index"));
			}
		});
		return selected;
	},
	_thumbnail_getSelected_image: function() {
		var index = this._thumbnail_getSelected_inner_index();
		return this.Thumb.items[index];
	},

	thumbnail_startSlideShow: function() {
		ImageLoader._thumbnail_startSlideShow.apply(ImageLoader, arguments);
	},
	_thumbnail_startSlideShow: function(image) {
		if (!image) {
			image = this._thumbnail_getSelected_image();
		}
		if (!image.getAttribute("origSize")) {
			return;
		}
		this._hideThumbnail();
		this._popImage(image);
	},
	thumbnail_reload: function(_oldIndex) {
		ImageLoader._thumbnail_reload.apply(ImageLoader, arguments);
	},
	_thumbnail_reload: function() {
		var img = this._thumbnail_getSelected_image();
		var serial = new Number(img.getAttribute("index"));
		this._hideThumbnail();
		this._showThumbnail(serial);
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
    _culcurateBrowserWindowSize: function(){
        var doc = window.document;
        var browserWidth = window.innerWidth;
        var browserHeight = window.innerHeight;
        var scrollY = doc.body.scrollTop 
			|| doc.documentElement.scrollTop;
        var scrollX = doc.body.scrollLeft 
			|| doc.documentElement.scrollLeft;
        return {width: browserWidth, height: browserHeight,
				scrollY: scrollY, scrollX: scrollX};
    },
	_culcurateScreenDimension: function() {
		var _h = 0;
		var _w = 0;
        var doc = window.document;
        var topBodyWidth = doc.body.scrollWidth 
			|| doc.documentElement.scrollWidth;
        var topBodyHeight = doc.body.scrollHeight 
			|| doc.documentElement.scrollHeight;
		var browserSize = ImageLoader._culcurateBrowserWindowSize();
		(browserSize.width > topBodyWidth) ? 
				_w = browserSize.width : _w = topBodyWidth; 
		(browserSize.height > topBodyHeight) ?
				_h = browserSize.height : _h = topBodyHeight; 			
		return {height: _h, width: _w};
	},
    _isImageUrl: function(urlStr){
        if ((urlStr.match(/^http:\/\//) || urlStr.match(/^file:\/\//)) &&
        urlStr.match(/(\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$|\.tif$)/i)) { return true; }
        return false;
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
	_fitToBrowserWindow: function(elem) {
		var doc = window.document;
		var size = this._culcurateBrowserWindowSize(elem);
		var baseTop = doc.body.scrollTop 
						|| doc.documentElement.scrollTop;
        var baseLeft = doc.body.scrollLeft 
						|| doc.documentElement.scrollLeft;
		
		elem.style.position = "absolute";
		elem.style.height = size.height + "px";
		elem.style.width = size.width + "px";
		elem.style.top = baseTop + "px";
		elem.style.left = baseLeft + "px";
		return elem;
	},
	_fitSizeToBody: function(ele,win) {
		var doc = window.document;
		if (win) {
			doc = win.document;
		}
		var size = this._culcurateElementSize(doc.body);
		ele.style.height = size.height + "px";
		ele.style.width = size.width + "px";
		return ele;
	},
	_fitSizeToThumbnail: function(ele) {
		//引数Elementのもともとのサイズ
		var origSizeAttr = ele.getAttribute("origSize");
		if (!origSizeAttr) {
			return ele;
		}
		origSize = {
			width: origSizeAttr.split(",")[0],
			height: origSizeAttr.split(",")[1]
		}
	    var reductionRatio = 1;//画像の縮小率
	    var margin = 10 //親要素よりこれだけ小さく規制する
		var parentSize = this._culcurateParentElementSize(ele);
		//幅から算出した縮小率
	    if (origSize.width > parentSize.width - margin) {
	        reductionRatio = (parentSize.width - 10) / origSize.width;
	    }
		//縦から算出した縮小率が小さければ上書き
	    if (origSize.height > parentSize.height - margin) {
	        var tempRatio = (parentSize.height - 10) / origSize.height;
			if (tempRatio < reductionRatio) {
				reductionRatio = tempRatio;
			}
	    }
		//実際に縮小する
	    reductionW = Math.ceil(origSize.width * reductionRatio);
	    reductionH = Math.ceil(origSize.height * reductionRatio);
		ele.style.width = reductionW + "px";
		ele.style.height = reductionH + "px";
		return ele;
	},
	/**
	 * bodyかブラウザウィンドウサイズのどちらか大きいほうに合わせて要素を拡大
	 */
	_fitSizeToScreenDimension: function(ele) {
		var size = this._culcurateScreenDimension();
		ele.style.height = size.height + "px";
		ele.style.width = size.width + "px";
		return ele;
	},
    _adaptElementInBrowser: function() {
        var ele = arguments[0];
        var w_offset = 40;//40 = スクロールバーを考慮。
        var h_offset = 80;//80 = スクロールバーとツールバー(40px）を考慮
        if (arguments[1]) w_offset = arguments[1];
        if (arguments[2]) h_offset = arguments[2];
        var origWidth = ele.getAttribute("origSize").split(",")[0];
        var origHeight = ele.getAttribute("origSize").split(",")[1];
        var reductionRatio_w = 1;//横方向の縮小率
        var reductionRatio_h = 1;//縦方向の縮小率
        var browserWidth = window.innerWidth;
        var browserHeight = window.innerHeight;
        Logger.debug("browser [" + browserWidth + "," + browserHeight + "]");
        if (origWidth > browserWidth - w_offset) {
            reductionRatio_w = (browserWidth - w_offset) / origWidth;
        }
        if (origHeight > browserHeight - h_offset) {
            reductionRatio_h = (browserHeight - h_offset) / origHeight;
        }
        Logger.debug("reductionRatio [" + reductionRatio_w + ","
			 + reductionRatio_h + "]");
        var reductionRatio = 1;
        (reductionRatio_h > reductionRatio_w) ? 
			reductionRatio = reductionRatio_w : reductionRatio = reductionRatio_h;
        adaptWidth = Math.ceil(origWidth * reductionRatio);
        adaptHeight = Math.ceil(origHeight * reductionRatio);
        ele.setAttribute("reductionRatio",reductionRatio);
        this._addStyle(ele, "width: "+ adaptWidth + "px; height:" + adaptHeight + "px");
        return ele;
    },
    _centeringInBrowserWindow: function(ele) {
		if (!ele) {
			return;
		}
		var browserWin = this._culcurateBrowserWindowSize();
		var eleSize = this._culcurateElementSize(ele);
		if (!eleSize.height || !eleSize.width) {
			return;
		}
		//10%上に位置させる
		var top = (browserWin.height - eleSize.height) * 0.4 + browserWin.scrollY;
		var left = (browserWin.width - eleSize.width) * 0.5 + browserWin.scrollX;
		ele.style.border = "0px";
		ele.style.position = "absolute";
		ele.style.top = top + "px";
		ele.style.left = left + "px";
	},
	_info_fadeout_timer: null,
    _info: function(msg) {
		this._close_info();
		var infoUi = <div id="__imageloader_info_base_" style="opacity: 0.7;">
			<img id="__imageloader_info_icon_"/>
			<span id="__imageloader_info_"><![CDATA[]]></span>
		</div>
		$appendE4X(document.documentElement, infoUi);
		var info = $("__imageloader_info_");
		info.innerHTML = msg;
		var icon = $("__imageloader_info_icon_");
		icon.src = icon_infomation_base64;
		this._centeringInBrowserWindow($("__imageloader_info_base_"))
		this._info_fadeout_timer = setTimeout(ImageLoader.fadeout_info, 1000);
	},
	fadeout_info: function() {
		ImageLoader._fadeout_info.apply(ImageLoader, arguments);
	},
	_fadeout_info: function() {
		var target = $("__imageloader_info_base_");
		var nowOpacity = target.style.opacity;
		if (nowOpacity == 0) {
			this._close_info();
			return;
		}
		target.style.opacity = new Number(nowOpacity) - 0.1;
		this._info_fadeout_timer = setTimeout(ImageLoader.fadeout_info, 100);		
	},
	_close_info: function() {
		clearTimeout(this._info_fadeout_timer);
		$remove($("__imageloader_info_base_"));
	},

	Scroller: {
		_amount: 50,
		up: function() {
			ImageLoader.Scroller._up.apply(ImageLoader.Scroller,arguments);
		},
		down: function() {
			ImageLoader.Scroller._down.apply(ImageLoader.Scroller,arguments);
		},
		right: function() {
			ImageLoader.Scroller._right.apply(ImageLoader.Scroller,arguments);
		},
		left: function() {
			ImageLoader.Scroller._left.apply(ImageLoader.Scroller,arguments);
		},
		_up: function() {
			var doc = window.document;
			var nowTop = window.scrollY;
			var toolbarTop = $top(ImageLoader._imagebase_id_).style.top.replace("px", "");
			Logger.debug("now:" + nowTop + " toolbar:" + toolbarTop);
			var amount = ImageLoader.Scroller._amount;
			if ((nowTop - amount) < toolbarTop) {
				amount = nowTop - toolbarTop;
			}
			window.scrollBy(0, -1 * amount);
		},
		_down: function() {
			window.scrollBy(0, ImageLoader.Scroller._amount);
		},
		_right: function() {
			window.scrollBy(ImageLoader.Scroller._amount, 0);			
		},
		_left: function() {
			window.scrollBy(-1 * ImageLoader.Scroller._amount, 0);			
		},
	},
};

window.Logger = {
    loglevel: 1, //0=debug, 1=info, 2=warn, 3=error
    debug: function(str){
        if (this.loglevel < 1) this._log("DEBUG", "  " + str);
    },
    info: function(str){
        if (this.loglevel < 2) this._log("INFO ", str);
    },
    warn: function(str){
        if (this.loglevel < 3) this._log("WARN ", str);
    },
    error: function(str){
        if (this.loglevel < 4) this._log("ERROR", str);
    },
    inspect: function(obj){
        if (this.loglevel > 0) return;
        var ret = "{";
        for (var i in obj) {
            ret += i + ":" + obj[i] + ",";
        }
        ret = ret.replace(/\,$/, "");
        ret += "}";
        this._log(this._logFormat("INSPE", ret));
    },
	_log: function(level, str) {
		var formattedMsg = this._logFormat(level, str);
		console.log(formattedMsg);
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

//support AutoPagerize
function addingFromAutoPager(elements) {
	elements.forEach(function(ele){
		Logger.debug("AutoPager ele:" + ele);
		var atag = ele.getElementsByTagName("a");
		for (var i = 0; i < atag.length; i++) {
			if (!ImageLoader._isImageUrl(atag[i].href)) {
				continue;
			}
			Logger.debug("autoPager anchor: " + atag[i].href)
			//{index,anchor,preloaded,base}
			ImageLoader.preloadImage({
				index: ImageLoader._load_images.length,
				anchor: atag[i],
				preloaded: null,
				base: null,
			});	
		}
	});
}

(function(){
    ImageLoader.init();
	if (window.AutoPagerize) {
		window.AutoPagerize.addFilter(addingFromAutoPager);  
	} else {
		window.addEventListener('GM_AutoPagerizeLoaded', addingFromAutoPager, false);
	}
})();

//shortcuts..
function $(id) {
	return document.getElementById(id);
}
function $top(id) {
	return window.top.document.getElementById(id);
}
function $create(ele,win) {
	var doc = document;
	if (win) {
		doc = win.document;
	}
	return doc.createElement(ele);
}
function $remove(ele) {
	if (!ele) {
		return;
	}
	var parent = ele.parentNode;
	return parent.removeChild(ele);
}
function $removeChildren(ele) {
	children = ele.childNodes;
	for (var i = children.length - 1; i >= 0; i--) {
		ele.removeChild(children[i]);
	}
}
function $append(parent,child) {
	if (!(child instanceof Array)) {
		parent.appendChild(child);
		return parent;
	}
	for (var i = 0; i < child.length; i++) {
		parent.appendChild(child[i]);
	}
	return parent;
}
function $appendE4X(parent, e4x) {
	if (!e4x.toSource) {
		return null;
	}
	var temp = $create("div");
	temp.innerHTML = e4x.toSource();

	parent = $append(parent, temp.childNodes[0]);
	return parent;
}

/* ========
 *  icon data
 */
//-----------共通使用アイコン
var icon_arrow_left_base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADrSURBVDjLY/z//z8DJYCJgUIwyAwoPZHJBsS7STGABY1/9e+fvzKkGMAIiwWgzRfF2ST0/vz5w/Dw/UOGXz9/M/z6AcK/GH4CMZj+jmCD5C70X2VkgWo+KcYqrqfArcTw598fBhluOTD9++9fIP7N8PsfEP/9AxUD0b8ZVq9ci/AC0Nm//zD+Yfj19xdY0R+got9gxb8RNNQAkNyf/0CxX39QvZC5M+68MJuIAQczJ8PDlw8ZXr9/g9XZIK+BNP/5/Yfh/sJHjIzIKTF2VchNoEI5oAbHDWk7TpAcjUDNukDNB4nVjOKFEZwXAOOhu7x6WtPJAAAAAElFTkSuQmCC";
var icon_arrow_right_base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADvSURBVDjLY/z//z8DJYCJgUIwxAwImOWx22uSExvZBvz68cvm5/dfV5HFGEGxUHoiExwVf//8Zfjz+w/D719/GH79/A3UAMK/GH4CMYiWFJJk+PXrN8PN27cunWq/oA/SwwIzyUrYluHvP6AB//7A8e+/f4H4N8Pvf0D8Fyb2h+HLl696WllqJ69Nu2XOArMZpBCuGajoN1jxbwT9FyH36/dvkCt/w10Acvb+h3uxOhvoZzCbi4OLQVJSiuH1q9cMt2/cvXB7zj0beBgQAwwKtS2AFuwH2vwIqFmd5Fi40H/1BFDzQaBrdTFiYYTnBQAI58A33Wys0AAAAABJRU5ErkJggg==";
//バッテンマーク
var icon_cross_base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg==";
var icon_infomation_base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKcSURBVDjLpZPLa9RXHMU/d0ysZEwmMQqZiTaP0agoaKGJUiwIxU0hUjtUQaIuXHSVbRVc+R8ICj5WvrCldJquhVqalIbOohuZxjDVxDSP0RgzyST9zdzvvffrQkh8tBs9yy9fPhw45xhV5X1U8+Yhc3U0LcEdVxdOVq20OA0ooQjhpnfhzuDZTx6++m9edfDFlZGMtXKxI6HJnrZGGtauAWAhcgwVnnB/enkGo/25859l3wIcvpzP2EhuHNpWF9/dWs/UnKW4EOGDkqhbQyqxjsKzMgM/P1ymhlO5C4ezK4DeS/c7RdzQoa3x1PaWenJjJZwT9rQ1gSp/js1jYoZdyfX8M1/mp7uFaTR8mrt29FEMQILr62jQ1I5kA8OF59jIItVA78dJertTiBNs1ZKfLNG+MUHX1oaURtIHEAOw3p/Y197MWHEJEUGCxwfHj8MTZIcnsGKxzrIURYzPLnJgbxvG2hMrKdjItjbV11CYKeG8R7ygIdB3sBMFhkem0RAAQ3Fuka7UZtRHrasOqhYNilOwrkrwnhCU/ON5/q04vHV48ThxOCuoAbxnBQB+am65QnO8FqMxNCjBe14mpHhxBBGCWBLxD3iyWMaYMLUKsO7WYH6Stk1xCAGccmR/Ozs/bKJuXS39R/YgIjgROloSDA39Deit1SZWotsjD8pfp5ONqZ6uTfyWn+T7X0f59t5fqDhUA4ry0fYtjJcWeZQvTBu4/VqRuk9/l9Fy5cbnX+6Od26s58HjWWaflwkusKGxjm1bmhkvLXHvh1+WMbWncgPfZN+qcvex6xnUXkzvSiYP7EvTvH4toDxdqDD4+ygT+cKMMbH+3MCZ7H9uAaDnqytpVX8cDScJlRY0YIwpAjcNcuePgXP/P6Z30QuoP4J7WbYhuQAAAABJRU5ErkJggg==";

//-----------インライン表示ツールバー用アイコン
//windowにプラスマーク。インライン表示のイメージについている application_add.png
var _icon_window_base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH9SURBVDjLpZM9aFRREIW/ue9FF2IULDQuaYIGtTBRWGFJAgqSUsEmjZVgo4mFWBiwVVjBHwjGwsbCShExIAghoEUMARGNGFJYhIC7isXGRbORvJ0Zi/dWY5fFCwOnuHz3nDsz4u78z5HTlx6NDB4v3KjWvd0dMMPNUFPcHHPDVTF3XBU1Y/uWZHVxsXzl6e3hibgwUBhvy7WH3bmWHm5fres4MBHXEw/16s+Wra8lHgBiV+f6mX0tA86VlkkBbgCsNxQH3Bw1MBwzR83Qhqflxro63Z0dqGkKIOuCBEHc8SC4OGJCCIJIQESRyIksEDfS+9bIAE1SAFwEBCIHEzBzIocgEbGAiqMhdWxqWQTL5kAE3P8BiYCrYwIuQBAii1JAM0JTpAxJxQaQxUJsxvTbSV7NP6e2ukLSSFjT/cBJ4kaS/HEggLsjIvgG0Is3T3hfnuLYwFG6dvbwcuEZcx+nKY7mbwbPskSAZC4k00GEIMLk64ccPtCHBqVvzxAqCcVD/QAjwcz+Rsg+M4gQbahv37/QJts4dfAiAJdP3Gfvrl6AXFxeWn58/k4ybKqYGqqKmaFJgplh7lRrKyxUZpmvzDA29IDS1Fly0VaAX7KZbSyO5q91de+42t87SE/nET59fcfshxk+L9VuyWbXuTiaLwEXgA7gB3Bv7m5l7Dd8kw6XoJxL0wAAAABJRU5ErkJggg==";
//虫眼鏡アイコン。インライン表示にイメージについている magnifier_zoom_in.png
var _icon_zoomin_base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI6SURBVDjLpZJbaJJxGMaHgdcFXURdBLtZrGitiFh0uhjRVRTVWI1as7mQakhjyyEkRAcaHSCrj0xrWGuuoVsr25qzfeYObh6yJJdzavoZs3Sy8PhJ8vR9EoHkotXFA/+b3+//vC9vEYCi/8mvh8H7nTM8kyF0LpoacCazLxzxbM/bb1S3OUo8GQtz/iggGfi1O0NaAzS8kQwCURqBORrTX9LQf5jHQ3KWlA1RnAUFeneGsATSoKIZOGdTsAWSMPuTsFNJeL7SEOoF4GtrUKuuShUUvJpKUd4wnYMtDDj5KQGTN4FRTyInOvH8MDonL6BKuRcFBey8fqYyC0/4Ehhn4JGZOBp1AtT1VkOkrYfMKIKgsxq7b+zErssV0TyBxjaf9UVomBh4jPnVyMCG6ThbGfKRVtwebsK1wdO4+JIPce8xbBGXI0+gMkWoqZ/137jjIBlY/zEGnqoO+2R7wGvfj/N9x3FAWonNojKUCUtTeQKlMUT02+fgCqVzs7OwzhnLyd4HU2xlCLsOYlPz+sI7uK8Pcu4O+EnNRAhWfwKOzym8Y2LyxCAf9GGHZDvKm9Zha2NptudcRUnBQ7rZ5+G0aVzEpS4nJelwZMXt9myL3Bpskyq9FmUzQuZu2B63QCXcEH50ak3Jb4KF0i+p5D5r3aYeJeoRNCgwfq8BCv7q8F8L2Dw9u5HbcWateuj6IXi0V0HUrsCiBGweNBRzZbxVasXJYkhrll1ZtIDNnaPLl9w6snRlwSX+a34AgPPwSZzC+6wAAAAASUVORK5CYII=";
//進入禁止アイコン delete.png
var _icon_forbidden_base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJdSURBVDjLpZP7S1NhGMf9W7YfogSJboSEUVCY8zJ31trcps6zTI9bLGJpjp1hmkGNxVz4Q6ildtXKXzJNbJRaRmrXoeWx8tJOTWptnrNryre5YCYuI3rh+8vL+/m8PA/PkwIg5X+y5mJWrxfOUBXm91QZM6UluUmthntHqplxUml2lciF6wrmdHriI0Wx3xw2hAediLwZRWRkCPzdDswaSvGqkGCfq8VEUsEyPF1O8Qu3O7A09RbRvjuIttsRbT6HHzebsDjcB4/JgFFlNv9MnkmsEszodIIY7Oaut2OJcSF68Qx8dgv8tmqEL1gQaaARtp5A+N4NzB0lMXxon/uxbI8gIYjB9HytGYuusfiPIQcN71kjgnW6VeFOkgh3XcHLvAwMSDPohOADdYQJdF1FtLMZPmslvhZJk2ahkgRvq4HHUoWHRDqTEDDl2mDkfheiDgt8pw340/EocuClCuFvboQzb0cwIZgki4KhzlaE6w0InipbVzBfqoK/qRH94i0rgokSFeO11iBkp8EdV8cfJo0yD75aE2ZNRvSJ0lZKcBXLaUYmQrCzDT6tDN5SyRqYlWeDLZAg0H4JQ+Jt6M3atNLE10VSwQsN4Z6r0CBwqzXesHmV+BeoyAUri8EyMfi2FowXS5dhd7doo2DVII0V5BAjigP89GEVAtda8b2ehodU4rNaAW+dGfzlFkyo89GTlcrHYCLpKD+V7yeeHNzLjkp24Uu1Ed6G8/F8qjqGRzlbl2H2dzjpMg1KdwsHxOlmJ7GTeZC/nesXbeZ6c9OYnuxUc3fmBuFft/Ff8xMd0s65SXIb/gAAAABJRU5ErkJggg==";

//-----------スライドショー時のツールバー用アイコン
var icon_zoom_base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJGSURBVDjLjdJLSNRBHMDx78yqLZaKS75DPdgDDaFDbdJmde5QlhCJGxgpRJfqEEKnIsJLB7skQYQKZaSmdLaopPCgEvSCShCMzR5a7oq7/3l12RVtjfzBMA/4fWZ+MyOccwBM3g8HEbIdfCEhfAFnLVapOa28Uevpjrqz/WOsERJgsu9Uq5CZQzgqrJfo9BajNd5irEYn4p3OUiFExtCLmw2tawFi4l5zUMjMIau9u7K+qxeoAcoAA0wDb2OPwmfA16LiiaOHLj1edRLpkO3WmIis7+oBDgJbgQ2AH6gC6jY19N62RkcctKeVIJAhp9QgUA3kJXdONZVcq9JxPSgQoXRAyIDRth8oAXQyKdWnoCKrTD9CBv4GMqx1WGNZkeRWJKbG2hiD1Cb9FbTnzWFdY/LCdLKlgNQ84gyNKqHm0gDjqVHnxDHgA/B9RQkpaB6YklkZl62np9KBhOqwjpKFgeY2YAz4BESBWHI8Hhs6PVVSvc3v98ye4fP7T676B845nt040ip98qpWJmI9PWiU6bfWgXGN2YHcKwU7tsuc4kpUPMbU0+f8+vKt+Pitl7PLAMDI9cNBoB0hQwICzjqUp6MZvsy8yvp95BRuQUjJ75mPvH4wYo1NlJ64Mza7DPwrhi8cCOeXl/aUB4P4c/NJxKLMvpngycCrzxVFG2v/CwAMnguF80oLe8p27cQh+fnpPV/fTc95S6piXQDAw7a9YbWkezZXFbAwMx/xPFXb1D3+Y90AQF/L7kAsri9mZ4lrTd0TcYA/Kakr+x2JSPUAAAAASUVORK5CYII=";
//矢印が四方に向いているicon
var icon_arrow_out_base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHkSURBVDjL3ZNvT1JhGMafb3G+TQqKECNFRIEDcvgXmB5IPNJmTdbC1SQ0S1xzZKXyT41TdpCOMyYtiXS9aW2uD8EbPsHV87RRmyLrdc92vbt/1/U8930/ZLYxASbpSwgz9SCin2+CHtJJwYoLgbITvvcOeN7a4S6NgTB45+cmCucvu8JMFOZCZQHpr0tYO12Ga9cKwpJz5xvIfH+GR2dxRGp+uSOs8Jxv39GKV+/gYS2OlXoSfNECMnMSRKw+hdS3BLI/Mlho3MPUR88lE+++ozlfjWG1kYJUCcNRsMCWM4NM02vf/hTgwsf+1uLpfTw4mcOtQ0G9aCDINiWmRiAdiAz+HTC6Nfi3QKx6uckjT3Pi0K1c1QPnzojahtsi3Zr2L/rfDGin5fE3o+pVxeYXRmVw3dA0Pddzfwz8Co82LFVERMuTbEyXJjGUMaqBgoBQ0Qfjmq5lWO3n9E/76IK8s4PCYHCytoDZgwhsWXPzosGNdYPszY1jTonBnxVgSuuhe6KhyfRDJGsJ3P0gQSqLDG7RBeE6PeF6Wie7X/MI5N2YLonoX+oFce1ZsXicQOJoHs68FdbNznBbAytaREthSHIE2lQPCF8cgT0/jLHtIQbD8sqEbrBuWYM+mqx93ANN8hp+AQOPtI0tirA3AAAAAElFTkSuQmCC";

//スライドショー用 サムネール移行アイコン
var icon_pictures_base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJSSURBVDjLpZM9aBRhEIaf2c3dJZvNxT+I0cJK0SJGwcKfwvIQFUsRG9HSKkGLKGhjKZGICViJ5RkQtLSQGOxsElEIFsKJCsZ4t7ls9u/b/cZCLxqTzoGBgRmeeV+YEVXlf6IL4MaDFyNVzzvVirUsIojgqyXsDIlY0iR+Pj5aG98UUPW9U1fO7N/qeb781fM7RZgaJqfnzgKbA5Yjyp7ny5OXC4Pfm1+2tDN1FLBFt1txeotyycUYsWNTswtpEtfHR2u31wFE6M2BlTDberF2oMvzqihKYS0uvlsuuSRp7hZodXJ67jywHqDKqip+Kyqku8fn6cxHd6m57ASxICKoreCI4DrOzszIwNjUbJAm8aPx0dpIV4ekCkWhbmZdgnbuXD59CM/r+9eyABKmpn9yeu4S8Bsg9FoLIIUjPW4QKp7Xx8LXNq8b1+mvLhFlhk+L2zm+6w5H9+9GxJU1C6giKFnxgzwPKaySA7m1+P4iPaVtWFJsucG3VoRVi4hW1wAO9psW2U6vvMPtLlVxHAdVWIkyWklCoauEJqUZJbRIQQVV2muAKEpeTNTnDxorQ2lqKGz8C5BYGl/3YivvCE1E0NrDvoHKxju4d612H+Dm1KvhSpfdDZVBayGIC4YHxjjcGOH9h08EJ++SmxwFROSPhU5EUfJsoj5/BJVzgvL281WMMbzJMrLBEtm78xhjuHDiDWsvpKob8sbkTGOpGehymGgQJhqEsbZW/uRis623Hr5uqep6BX8pqU/U549ZnCHHEQT6FZbpbBXLahg/BpD/feefqppLG2N7xVoAAAAASUVORK5CYII=";

//thumbnail用矢印アイコン
var icon_arrow_down_base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAENSURBVDjLpZM/SwNREMTnxBRpFYmctaKCfwrBSCrRLuL3iEW6+EEUG8XvIVjYWNgJdhFjIXamv3s7u/ssrtO7hFy2fcOPmd03SYwR88xi1cPgpRdjjDB1mBquju+TMt1CFcDd0V7q4GilAwpnd2A0qCvcHRSdHUBqAYgOyaUGIBQAc4fkNSJIIGgGj4ZQx4EEAY3waPUiSC5FhLoOQkbQCJvioPQfnN2ctpuNJugKNUWYsMR/gO71yYPk8tRaboGmoCvS1RQ7/c1sq7f+OBUQcjkPGb9+xmOoF6ckCQb9pmj3rz6pKtPB5e5rmq7tmxk+hqO34e1or0yXTGrj9sXGs1Ib73efh1WaZN46/wI8JLfHaN24FwAAAABJRU5ErkJggg==";
//thumbnail用矢印アイコン
var icon_arrow_up_base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEGSURBVDjLpZM/LwRRFMXPspmEaGc1shHRaiXsJ5GIRixbCr6SikxIlqgJM5UohIiGdofovHf/PZVmYwZvTntPfjnn3txWCAFNNFE33L/ZKXYv+1dRgL3r7bu0PbucJp3e4GLjtsrXGq9wkA8SU7tPk87i/MwCzAyP5QNeytcnJl46XMuoNoGKDoVlTkQhJpAgmJqcBjnqkqPTXxN8qz9cD6vdHtQMxXOBt49y5XjzLB/3tau6kWewKiwoRu8jZFvn+U++GgCBlWFBQY4qr1ANcAQxgQaFjwH4TwYrQ5skYBOYKbzjiASOwCrNd2BBwZ4jAcowGJgkAuAZ2dEJhAUqij//wn/1BesSumImTttSAAAAAElFTkSuQmCC";
//thumbnail用スライドショー移行アイコン
var icon_picture_base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHwSURBVDjLpZM9a1RBFIafM/fevfcmC7uQjWEjUZKAYBHEVEb/gIWFjVVSWEj6gI0/wt8gprPQykIsTP5BQLAIhBVBzRf52Gw22bk7c8YiZslugggZppuZ55z3nfdICIHrrBhg+ePaa1WZPyk0s+6KWwM1khiyhDcvns4uxQAaZOHJo4nRLMtEJPpnxY6Cd10+fNl4DpwBTqymaZrJ8uoBHfZoyTqTYzvkSRMXlP2jnG8bFYbCXWJGePlsEq8iPQmFA2MijEBhtpis7ZCWftC0LZx3xGnK1ESd741hqqUaqgMeAChgjGDDLqXkgMPTJtZ3KJzDhTZpmtK2OSO5IRB6xvQDRAhOsb5Lx1lOu5ZCHV4B6RLUExvh4s+ZntHhDJAxSqs9TCDBqsc6j0iJdqtMuTROFBkIcllCCGcSytFNfm1tU8k2GRo2pOI43h9ie6tOvTJFbORyDsJFQHKD8fw+P9dWqJZ/I96TdEa5Nb1AOavjVfti0dfB+t4iXhWvyh27y9zEbRRobG7z6fgVeqSoKvB5oIMQEODx7FLvIJo55KS9R7b5ldrDReajpC+Z5z7GAHJFXn1exedVbG36ijwOmJgl0kS7lXtjD0DkLyqc70uPnSuIIwk9QCmWd+9XGnOFDzP/M5xxBInhLYBcd5z/AAZv2pOvFcS/AAAAAElFTkSuQmCC";
//arrow_turn_left.png
var icon_arrow_turn_left_base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGWSURBVDjLpZG9S5thFMXPG2NUxE8oxFAtKFnyLwiCHaxOnToodmoVh0qJFBVcRXQLuOhWLLQoWtsIfkCzmNLioA52EYz64mBKFAJKCXnuuU8HWykaS3i92z3Dj/O717HW4j7juxm8+TZQMvS1f9QzgNRZUnuKBTj/KkSTfbGG8tBrVYWbdUEqKMzQcFuEGzRc+tD76aQgILrZNx6sCI01V7XAcQBahaoiJzlkf2WRzv5E6jT1mUamlvvXv99SIDVAEgqFKEESYgU+x4fyQBnCwTAiDyNPjZGRzlh7Y0GFgbXn08HKhlck4Z65ECFC1SE0PXiEUn8AqsRe6gcO3IPol+Fk7NYRZ7reDbrn7tvjjLs392zRed+97Bymj2KJncTJZe4SF/kL1FbXwhh5cucXxMhLMTL/d//4YjVq8rK0f7wPv68UdTX1kLx0FlT43zyebLUdbR2gKuKrcWxN7DoA4C/23yYvMBSoVYjhdV40QIxAlLCWECNeAAT1TwPx2ICWoCroTYFXCqqglwYUIr6wAlKh1Ov8N9v2/gMRLRuAAAAAAElFTkSuQmCC";
//arrow_turn_right.png
var icon_arrow_turn_right_base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAF7SURBVDjLpZI/S5thFMVPXt9aakBjIYJvyFycnZw7KDhkcCi41BK30tpkqA5d/QClLv0IKuIQB/8Mje5dVLCCxhQtkg+QFnLPuU8HqYY0Q4h3fLjnx+9ynlQIAY+ZqNfFxcr8ypvtVwN9A2icp/Fr53uq84SlajEv+ZyoacknRWVlwvhwDk6h1qh93lzY+dAV8L5anHL6cpLOFTJPR5F+kkYcxfDgoAt04rR+gtqvq9XK24NPABDfh78V85KWX2QmCmPpMfyx34iiCHRCLngIkAtGwoyD/3L3AFFzyVBSyA5lQRdMwtntOX426qAJyfMEpHB1U1vbLVU//gcgNT08mEHTmqCEox+H1zRubbyulABg9svLY5q+75Wr77q2IOPMyLMRDKRiXDYu0B4GADOum3Gxs4UHAxMoQsFRb9SxubBTal/cLx+udqu3DUAwEJKDLfb8E+M2RRgFQTDrA8CW7gxc/RnQCBPhoU8DaxF0wh9jsH+0d9cGewf8BRKi/IUanjYRAAAAAElFTkSuQmCC";
//arrow_refresh.png
var icon_arrow_refresh_base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI/SURBVDjLjZPbS9NhHMYH+zNidtCSQrqwQtY5y2QtT2QGrTZf13TkoYFlzsWa/tzcoR3cSc2xYUlGJfzAaIRltY0N12H5I+jaOxG8De+evhtdOP1hu3hv3sPzPO/z4SsBIPnfuvG8cbBlWiEVO5OUItA0VS8oxi9EdhXo+6yV3V3UGHRvVXHNfNv6zRfNuBZVoiFcB/3LdnQ8U+Gk+bhPVKB3qUOuf6/muaQR/qwDkZ9BRFdCmMr5EPz6BN7lMYylLGgNNaKqt3K0SKDnQ7us690t3rNsxeyvaUz+8OJpzo/QNzd8WTtcaQ7WlBmPvxhx1V2Pg7oDziIBimwwf3qAGWESkVwQ7owNujk1ztvk+cg4NnAUTT4FrrjqUKHdF9jxBfXr1rgjaSk4OlMcLrnOrJ7latxbL1V2lgvlbG9MtMTrMw1r1PImtfyn1n5q47TlBLf90n5NmalMtUdKZoyQMkLKlIGLjMyYhFpmlz3nGEVmFJlRZNaf7pIaEndM24XIjCOzjX9mm2S2JsqdkMYIqbB1j5C6yWzVk7YRFTsGFu7l+4nveExIA9aMCcOJh6DIoMigyOh+o4UryRWQOtIjaJtoziM1FD0mpE4uZcTc72gBaUyYKEI6khgqINXO3saR7kM8IZUVCRDS0Ucf+xFbCReQhr97MZ51wpWxYnhpCD3zOrT4lTisr+AJqVx0Fiiyr4/vhP4VyyMFIUWNqRrV96vWKXKckBoIqWzXYcoPDrUslDJoopuEVEpIB0sR+AuErIiZ6OqMKAAAAABJRU5ErkJggg==";
