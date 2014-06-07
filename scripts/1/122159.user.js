// ==UserScript==
// @id             tieba.baidu.com-709c0fe7-e313-44bd-9dbd-752bbd80259d@patwonder@163.com
// @name           百度贴吧图片缩放增强脚本
// @version        0.60
// @namespace      patwonder@163.com
// @author         patwonder
// @description    增强百度贴吧图片缩放，看大图无需开新标签页。 
// @include        http://tieba.baidu.com/club/*/p/*
// @include        http://tieba.baidu.com/f?kz=*
// @include        http://tieba.baidu.com/p/*
// @include        http://tieba.baidu.com/f?*ct=*z=*
// @include        http://tieba.baidu.com.cn/f?kz=*
// @include        http://tieba.baidu.com.cn/p/*
// @include        http://tieba.baidu.com.cn/f?*ct=*z=*
// @include        http://post.baidu.com/f?kz=*
// @include        http://post.baidu.com/p/*
// @include        http://post.baidu.com/f?*ct=*z=*
// @include        http://post.baidu.com.cn/f?kz=*
// @include        http://post.baidu.com.cn/p/*
// @include        http://post.baidu.com.cn/f?*ct=*z=*
// @run-at         document-end
// @grant          none
// ==/UserScript==

(function(d, w) {
var B_WIDESCREEN_ENABLED = /*typeof(GM_getValue) === 'function' ? GM_getValue('btise.wideScreenEnabled', true) :*/ undefined;
var B_FLOORNUM_ENABLED = /*typeof(GM_getValue) === 'function' ? GM_getValue('btise.floorNumEnabled', true) :*/ undefined;
if (B_WIDESCREEN_ENABLED !== true && B_WIDESCREEN_ENABLED !== false) {
    B_WIDESCREEN_ENABLED = true;
    B_FLOORNUM_ENABLED = true;
}
var B_SWITCH_ENABLED = true;

var btise = { wideScreenEnabled : true, floorNumEnabled : true };
var localStorage = w.localStorage;
if (localStorage) {
  localStorage = localStorage.wrappedJSObject || localStorage;
  if (typeof(localStorage.btise) == 'string') {
    try {
      btise = JSON.parse(localStorage.btise);
    } catch (ex) { }
  }

  // Assign default configs
  if (typeof(btise.wideScreenEnabled) == 'undefined' && typeof(btise.floorNumEnabled) == 'undefined') {
    btise.wideScreenEnabled = B_WIDESCREEN_ENABLED;
    btise.floorNumEnabled = B_FLOORNUM_ENABLED;
  }
  if (typeof(localStorage.btise) != 'string')
    localStorage.btise = JSON.stringify(btise);
} else {
  B_SWITCH_ENABLED = false;
}

B_WIDESCREEN_ENABLED = !!btise.wideScreenEnabled;
B_FLOORNUM_ENABLED = !!btise.floorNumEnabled;
 
var STR_SCRIPT_NAME = '百度贴吧图片缩放增强脚本';

var common = {
    matchesSelector: function(element, selector) {
        if (element.mozMatchesSelector) {
            return element.mozMatchesSelector(selector);
        } else if (element.webkitMatchesSelector) {
            return element.webkitMatchesSelector(selector);
        } else if (element.matchesSelector) {
            return element.matchesSelector(selector);
        } else {
            try {
                var elems = element.parentElement ? element.parentElement.querySelectorAll(selector) : [];
                for (var i = 0, l = elems.length; i < l; i++) {
                    if (elems[i] === element) return true;
                }
            } catch (ex) { }
            return false;
        }
    },
    // re-entrance guard for image wrapping, avoid re-entering the DOM mutation event handlers
    wrapping: false
};

(function() {
    var IMG_RETRIEVING_SIZE = '正在获取原始大小……';
    var IMG_ORG_SIZE_DESC = '原图：';
    var IMG_CUR_PERCENT = "比例：";
    var IMG_MAG_DESC = '点击放大，按住Shift全部放大';
    var IMG_MIN_DESC = '点击缩小，按住Shift全部缩小';
    var SIGN_SELECTOR = 'div.d_sign_split + img';
    var IMG_INSIDE_EDITOR_SELECTOR = '#editor img, #tb_rich_poster img';
    var IMG_SELECTOR = 'img.BDE_Image, div.p_content img.BDE_Smiley, img.d_content_img, ' + SIGN_SELECTOR;
    var REG_SIGN = /w%3D580.*\/sign=.*?(?=\/)/;
    var images = [];
    
    var matchesSelector = common.matchesSelector;
    
    var prefilterImages = function() {
        var imageNodes = d.querySelectorAll(IMG_SELECTOR);
        for (var i = 0; i < imageNodes.length; i++) {
            var image = imageNodes[i];
            if (shouldAdd(image))
                prefilterImage(image);
        }
    }
    
    var prefilterImage = function(image) {
        // Check whether we should reload with original src
        if (REG_SIGN.test(image.src)) {
            var newimg = d.createElement('img');
            newimg.src = image.src.replace(REG_SIGN, "pic/item");
            newimg.className = image.className;
            if (image.parentElement) {
                common.wrapping = true;
                image.parentElement.insertBefore(newimg, image);
                image.parentElement.removeChild(image);
                common.wrapping = false;
                return newimg;
            }
        }
        // Check for passively loaded images
        if (image.hasAttribute("data-passive")) {
            var passiveSrc = image.getAttribute("data-passive");
            image.setAttribute("data-passive", passiveSrc.replace(REG_SIGN, "pic/item"));
        } else if (image.hasAttribute("data-tb-lazyload")) {
            var passiveSrc = image.getAttribute("data-tb-lazyload");
            image.setAttribute("data-tb-lazyload", passiveSrc.replace(REG_SIGN, "pic/item"));
        }
        return image;
    }
    
    var obtainImages = function() {
        var imageNodes = d.querySelectorAll(IMG_SELECTOR);
        for (var i = 0; i < imageNodes.length; i++) {
            var image = imageNodes[i];
            if (shouldAdd(image))
                images.push(image);
        }
    };
    var shouldAdd = function(image) {
        // don't process images inside the editor
        if (matchesSelector(image, IMG_INSIDE_EDITOR_SELECTOR))
            return false;
        return true;
    };
    var addImages = function(new_images) {
        for (var i = 0; i < new_images.length; i++) {
            var image = new_images[i];
            if (!shouldAdd(image)) continue;
            image = prefilterImage(image);
            
            images.push(image);
            initImage(image);
            adjustScaling(image);
        }
    };
    var removeImages = function(del_images) {
        for (var i = 0; i < del_images.length; i++) {
            var image = del_images[i];
            for (var j = 0; j < images.length; j++) {
                if (images[j] == image) {
                    images.splice(j, 1);
                    break;
                }
            }
        }
    };
    w.addEventListener('DOMNodeInserted', function(event) {
        if (common.wrapping) return;
        if (matchesSelector(event.target, IMG_SELECTOR)) {
            addImages([event.target]);
        } else if (event.target.querySelectorAll) {
            var new_images = event.target.querySelectorAll(IMG_SELECTOR);
            if (new_images.length != 0) {
                addImages(new_images);
            }
        }
    }, false);
    w.addEventListener('DOMNodeRemoved', function(event) {
        if (common.wrapping) return;
        if (matchesSelector(event.target, IMG_SELECTOR)) {
            removeImages([event.target]);
        } else if (event.target.querySelectorAll) {
            var del_images = event.target.querySelectorAll(IMG_SELECTOR);
            if (del_images.length != 0) {
                removeImages(del_images);
            }
        }
    }, false);
    // Stops everything from bubbling up and doing anything else
    var stopListener = function(e) {
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      else if (e.stopPropagation) e.stopPropagation();
      
      if (e.preventDefault) e.preventDefault();
      
      return false;
    };
    // Image click handler that handles image size switching
    var listener = function(e) {
        // Only handle left clicks
        if (e.button != 0) return;
        
        var image = (e && e.target) || (w.event && w.event.srcElement);
        // We are expecting clicks on detected images
        if (!image || image.localName != 'img' || image.getAttribute('data-detected') != 'true' || !shouldAdd(image))
          return;
        
        if (image && image.getAttribute('data-disabled') != 'true') {
            if (image.getAttribute('data-fullsized') == 'true') {
                image.setAttribute('data-fullsized', 'false');
                setTitle(image);
                if (e.shiftKey) {
                    var isSign = matchesSelector(image, SIGN_SELECTOR);
                    for (var i = 0; i < images.length; i++) {
                        var img = images[i];
                        // separate scale all images for sign and non-sign images
                        if (isSign != matchesSelector(img, SIGN_SELECTOR))
                            continue;
                        if (img.getAttribute('data-fullsized') == 'true') {
                            img.setAttribute('data-fullsized', 'false');
                            setTitle(img);
                        }
                    }
                }
            } else {
                image.setAttribute('data-fullsized', 'true');
                setTitle(image);
                if (e.shiftKey) {
                    var isSign = matchesSelector(image, SIGN_SELECTOR);
                    for (var i = 0; i < images.length; i++) {
                        var img = images[i];
                        // separate scale all images for sign and non-sign images
                        if (isSign != matchesSelector(img, SIGN_SELECTOR))
                            continue;
                        if (img.getAttribute('data-fullsized') != 'true') {
                            img.setAttribute('data-fullsized', 'true');
                            setTitle(img);
                        }
                    }
                }
            }
            if (e.shiftKey) image.scrollIntoView();
        }
        return stopListener(e);
    };
    
    var isDisplayingFullsize = function(image, callback) {
        if (image.hasAttribute('data-owidth')) {
            var owidth = image.getAttribute('data-owidth');
            callback(image.parentElement.offsetWidth >= owidth);
            return;
        }
        
        var newImg = new Image();

        newImg.onload = function() {
            var owidth = newImg.width;
            image.setAttribute('data-owidth', owidth);
            image.setAttribute('data-oheight', newImg.height);
            // image may have detached from the document, thus visiting "parentElement" may fail
            if (image.parentElement && image.parentElement.offsetWidth)
              callback(image.parentElement.offsetWidth >= owidth);
        };
        
        var passiveSrc = image.getAttribute('data-passive') || image.getAttribute('data-tb-lazyload');
        newImg.src = (passiveSrc != "loaded" && passiveSrc) || image.src;
    };

    var adjustScaling = function(image) {
        isDisplayingFullsize(image, function(isFullsize) {
            if (isFullsize) {
                if (image.getAttribute('data-disabled') != 'true') {
                    image.setAttribute('data-disabled', 'true');
                }
            } else {
                if (image.getAttribute('data-disabled') == 'true') {
                    image.removeAttribute('data-disabled');
                }
            }
            setTitle(image);
        });
    };

    var initImage = function(image) {
        image.removeAttribute('width');
        image.removeAttribute('height');
        image.setAttribute('data-detected', 'true');
        setTitle(image);
        image.onclick = undefined;
        
        image.addEventListener("load", function() {
            var passiveSrc = image.getAttribute('data-passive') || image.getAttribute('data-tb-lazyload');
            if (passiveSrc && passiveSrc != "loaded")
              return;
            var width = image.naturalWidth;
            var height = image.naturalHeight;
            image.setAttribute('data-owidth', width);
            image.setAttribute('data-oheight', height);
            adjustScaling(image);
        }, false);
        
        if (matchesSelector(image, SIGN_SELECTOR)) {
            // wrap sign images into a fixed size container
            common.wrapping = true;
            try {
                var divWrapper = d.createElement('div');
                divWrapper.className = 'd_sign_wrapper';
                image.parentElement.insertBefore(divWrapper, image.previousSibling);
                divWrapper.appendChild(image.previousSibling);
                divWrapper.appendChild(image);
            } finally {
                common.wrapping = false;
            }
        }
    };

    var setTitle = function(image) {
        var title_a = [];
        if (image.getAttribute('data-disabled') != 'true') {
            var isFullsized = image.getAttribute('data-fullsized') == 'true';
            if (image.hasAttribute('data-owidth')) {
                var owidth = image.getAttribute('data-owidth')
                title_a = [IMG_ORG_SIZE_DESC, owidth, '*', image.getAttribute('data-oheight'), '  ',
                IMG_CUR_PERCENT, isFullsized ? 100 : Math.floor(100 * image.parentElement.offsetWidth / owidth), '%\n'];
            } else {
                title_a = [IMG_RETRIEVING_SIZE, '\n'];
            }
            title_a.push(isFullsized ? IMG_MIN_DESC : IMG_MAG_DESC);
        }
        image.setAttribute('title', title_a.join(''));
    };

    var doImageOpAll = function(op) {
        for (var i = 0; i < images.length; i++) {
            op(images[i]);
        }
    };
    
    var adjustScalingAll = function() { doImageOpAll(adjustScaling); };
    var initImageAll = function() { doImageOpAll(initImage); };

    prefilterImages();
    obtainImages();
    initImageAll();
    w.addEventListener('resize', adjustScalingAll, false);

    var loadListener = function() {
        for (var i = 0; i < images.length; i++) {
            var image = images[i];
            adjustScaling(image);
            image.onclick = undefined;
        }
    };
    w.addEventListener('DOMContentLoaded', loadListener, false);
    w.addEventListener('load', loadListener, false);
    w.addEventListener('click', listener, true);
    
		var rightPanelWidth = (function(rightSection) {
        return rightSection ? rightSection.offsetWidth : 0;
    })(d.querySelector('div.right_section'));
    
    var style = d.createElement('style');
    style.setAttribute('type','text/css');
    
    var aInnerHTML = ['img[data-detected=true] { max-width: 100% !important; margin-top: 0 !important; width: auto !important; height: auto !important; cursor: url("data:image/gif;base64,R0lGODlhIAAgAKEAAP///wAAAP///////yH5BAEAAAIALAAAAAAgACAAAAJMlBUZx+2PApggwesk3Qt7XYGdB4EhR5aToqzpo7GJ+zbmTI31IYp7tkH9bDfFMGOM6I4wC/OSfDaXUl71is1qt9yu9wsOi8fkstlQAAA7") 6 6, pointer !important; }\n',
                      'img[data-detected=true][data-fullsized=true]:not([data-disabled=true]) { max-width: none !important; cursor: url("data:image/gif;base64,R0lGODlhIAAgAKEAAP///wAAAP///////yH5BAEAAAIALAAAAAAgACAAAAJLlBUZx+2PApggwesk3Qt7vU2dB4GhSJaikqBptrLuy5jnSB82hefGPvPpTCxhRvGzGDHI5aXpfECjjR71is1qt9yu9wsOi8fk8rgAADs=") 6 6, pointer !important; z-index: 9999999; position: relative; }\n',
                      'img[data-detected=true][data-disabled=true]  { cursor: default !important; }\n',
                      'div.replace_div { width: auto !important; height: auto !important; overflow: visible !important; position: static !important; border: none !important; }\n',
                      'div.replace_tip { display: none !important; }\n',
                      'div.d_sign_wrapper { max-width: 568px; margin: 0 5px; }\n',
                      'div.d_sign_split, div.d_sign_split + img { margin-left: 0 !important; margin-right: 0 !important; }\n',
                      '#pic_to_album_tip { display: none !important; }\n',
                      'div.d_post_content_main, div.d_post_content { overflow: visible !important; }\n',
                      'div.j_lzl_container img.BDE_Smiley { max-width: 30px !important; max-height: 30px !important; }\n',
                      'ul.nav_right a { height: 36px; float: right; color: #5C6573; margin: 5px 5px; padding: 10px 5px; }'];
    if (B_WIDESCREEN_ENABLED) {
        aInnerHTML = aInnerHTML.concat(['\n',
            '#container, div.content, #tb_nav, div.p_thread, #pb_content, div.left_section, #j_core_title_wrap, div.l_post, div.d_post_content_main, div.core_reply_wrapper, div.pb_footer, div.d_sign_split, blockquote.d_quote, blockquote.d_quote fieldset, .d_quote .quote_content, div.core { width: auto !important; }\n',
            'div.pb_content { background: none !important; }\n',
            'div.d_post_content_main { padding: 15px 10px 5px !important; }\n',
            'div.p_content { padding: 0 !important; }\n',
            'div.left_section {\n',
            '    -moz-box-sizing: border-box;\n',
            '    -webkit-box-sizing: border-box;\n',
            '    box-sizing: border-box;\n',
            '    width: -moz-calc(100% - ', rightPanelWidth, 'px) !important;\n',
            '    width: -webkit-calc(100% - ', rightPanelWidth, 'px) !important;\n',
            '    width: calc(100% - ', rightPanelWidth, 'px) !important;\n',
            '    border-right: 1px solid #E5E5E5;\n',
            '}\n',
            'div.l_post {\n',
            '    background-color: white;\n',
            '    background-image:    -moz-linear-gradient(left, #F7F7F7, #F7F7F7 130px, white 130px, white);\n',
            '    background-image: -webkit-linear-gradient(left, #F7F7F7, #F7F7F7 130px, white 130px, white);\n',
            '    background-image:     -ms-linear-gradient(left, #F7F7F7, #F7F7F7 130px, white 130px, white);\n',
            '    background-image:      -o-linear-gradient(left, #F7F7F7, #F7F7F7 130px, white 130px, white);\n',
            '    background-image:         linear-gradient(to right, #F7F7F7, #F7F7F7 130px, white 130px, white);\n',
            '}\n',
            'div.core_reply_tail, div.core_reply_wrapper { margin-right: 0px !important; }\n',
            'div.core_reply, div.d_content { margin-left: 0px !important; max-width: 568px; margin-right: auto !important; }\n',
            '#tb_rich_poster { margin-left: 0px !important; }\n',
            '#tb_rich_poster_container { margin-left: 10px !important; }\n',
            'div.d_main_section, div.d_post_content_main, div.d_content, div.core_reply, h1.core_title_txt { float: none !important; }\n',
            'div.d_post_content_main { margin-left: 130px !important; }\n',
            'div.right_section { margin-left: 0 !important; }\n',
            'h1.core_title_txt { display: inline; }\n',
            '.card_top_theme2 { margin-right: 0 !important; }'
        ])
    }
    style.innerHTML = aInnerHTML.join('');
    d.querySelector('head').appendChild(style);

    adjustScalingAll();
    w.setTimeout(adjustScalingAll, 1000);
})();

(function() {
    if (!B_FLOORNUM_ENABLED) return;
    
    var POST_SELECTOR = 'div.l_post';
    var LZL_POST_SELECTOR = 'span.lzl_time';
    
    var pint = function(str) {
        var num = parseInt(str, 10);
        return (isNaN(num) || !isFinite(num)) ? 0 : num;
    };
    
    var getPostTimeSummary = function(postTimeString) {
        // calculate diff between post time and now
        var postTimeMillis = 0;
        if (postTimeString) {
            var match = /^\s*([0-9]{2,4})[\/-]([0-9]{1,2})[\/-]([0-9]{1,2})[ tT\,]*([0-9]{1,2})\:([0-9]{1,2})(?:\:([0-9]{1,2}))?\s*$/.exec(postTimeString);
            if (match) {
                postTimeMillis = new Date(pint(match[1]), pint(match[2]) - 1, pint(match[3]), pint(match[4]), pint(match[5]), pint(match[6])).getTime();
            }
        }
        var postTimeSummary = '';
        if (postTimeMillis) {
            //alert(postTimeMillis + " ~ " + Date.now());
            var mins = Math.floor((Date.now() - postTimeMillis) / 60000);
            if (mins < 1)
                postTimeSummary = '刚刚';
            else if (mins < 60)
                postTimeSummary = mins + '分钟前';
            else {
                var hours = Math.floor(mins / 60);
                if (hours < 24)
                    postTimeSummary = hours + '小时前';
                else {
                    var days = Math.floor(hours / 24);
                    if (days < 31)
                        postTimeSummary = days + '天前';
                    else {
                        var months = Math.floor(days / 30.436875);
                        if (months < 12)
                            postTimeSummary = months + '个月前';
                        else {
                            var years = Math.floor(months / 12);
                            months -= years * 12;
                            postTimeSummary = years + '年' + ((months > 0 && years < 3) ? months + '个月' : '') + '前';
                        }
                    }
                }
            }
            postTimeSummary += ' ';
        }
        return postTimeSummary;
    };

    var style = d.createElement('style');
    style.setAttribute('type','text/css');
    style.innerHTML = ['div.d_floor { font-family: sans-serif; font-size: 16px; float: right; margin: 5px; color: #261CDC; }\n',
                       'span.s_lzl_time_summary { color: rgb(153, 153, 153); }\n',
                       'div.louzhubiaoshi { right: auto !important; left: 0px; top: 0px !important; transform: rotate(-90deg); -moz-transform: rotate(-90deg); -webkit-transform: rotate(-90deg); }\n',
                       'div.louzhubiaoshi_wrap { position: static !important; }\n',
                       'div.l_post { position: relative; }'
                      ].join('');
    d.querySelector('head').appendChild(style);
    
    var updatePost = function(post) {
        var field = JSON.parse(post.getAttribute('data-field'));
        var floorNum = field && (field.content && (field.content.floor || field.content.post_no));
        if (floorNum && !isNaN(parseFloat(floorNum)) && isFinite(floorNum)) {
            var div = post.querySelector('div.d_floor') || d.createElement('div');
            div.className = 'd_floor';
            div.innerHTML = getPostTimeSummary(field.content.date) + '#' + floorNum;
            common.wrapping = true;
            post.insertBefore(div, post.querySelector('*'));
            common.wrapping = false;
        }
    };
    var updateLzlPost = function(lzlpost) {
        var postTimeSummary = getPostTimeSummary(lzlpost.innerHTML);
        var span = lzlpost.parentElement.querySelector('span.s_lzl_time_summary') || d.createElement('span');
        span.className = 's_lzl_time_summary';
        span.innerHTML = postTimeSummary;
        common.wrapping = true;
        lzlpost.parentElement.insertBefore(span, lzlpost);
        common.wrapping = false;
    };
    var updateFloorNumField = function() {
        var posts = d.querySelectorAll(POST_SELECTOR);
        for (var i = 0; i < posts.length; i++)
            updatePost(posts[i]);
        
        var lzlposts = d.querySelectorAll(LZL_POST_SELECTOR);
        for (var i = 0; i < lzlposts.length; i++)
            updateLzlPost(lzlposts[i]);
    };
    
    updateFloorNumField();
    setInterval(updateFloorNumField, 30000);
    
    // update time summary when elements are dynamically inserted
    var matchesSelector = common.matchesSelector;
    w.addEventListener('DOMNodeInserted', function(event) {
        if (common.wrapping) return;
        if (matchesSelector(event.target, LZL_POST_SELECTOR)) {
            updateLzlPost(event.target);
        } else {
            if (matchesSelector(event.target, POST_SELECTOR)) {
                updatePost(event.target);
            }
            if (event.target.querySelectorAll) {
                var posts = event.target.querySelectorAll(POST_SELECTOR);
                for (var i = 0; i < posts.length; i++)
                    updatePost(posts[i]);
                
                var lzlposts = event.target.querySelectorAll(LZL_POST_SELECTOR);
                for (var i = 0; i < lzlposts.length; i++)
                    updateLzlPost(lzlposts[i]);
            }
        }
    }, false);
    
})();

(function() {
    if (!B_SWITCH_ENABLED) return;
    
    var prefs = [
        { name: '宽屏样式', id: 'wsenable', prefName: 'wideScreenEnabled', value: B_WIDESCREEN_ENABLED },
        { name: '楼层计数', id: 'fnenable', prefName: 'floorNumEnabled', value: B_FLOORNUM_ENABLED }
    ];
    var elemNavRight = d.querySelector('ul.nav_right');
    if (!elemNavRight) {
        var navbar = document.querySelector("#tb_nav");
        if (navbar) {
            elemNavRight = d.createElement("ul");
            elemNavRight.className = "nav_right";
            navbar.appendChild(elemNavRight);
        }
    }
    if (elemNavRight) {
        prefs.forEach(function(pref) {
            var strEnableDisable = pref.value ? '禁用' : '启用';
            var strText = strEnableDisable + pref.name;
            var liPrefItem = d.createElement('li');
            var aPrefItem = d.createElement('a');
            aPrefItem.setAttribute('id', pref.id);
            aPrefItem.setAttribute('title', strText + '\n(' + STR_SCRIPT_NAME + ')');
            aPrefItem.setAttribute('href', '#');
            aPrefItem.innerHTML = strText;
            aPrefItem.addEventListener('click', function() {
                btise[pref.prefName] = !pref.value;
                localStorage.btise = JSON.stringify(btise);
                w.location.reload();
                return false;
            });
            liPrefItem.appendChild(aPrefItem);
            elemNavRight.appendChild(liPrefItem);
        });
    }
})();

})(document, typeof(unsafeWindow) !== "undefined" ? unsafeWindow : window);
