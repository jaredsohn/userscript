// ==UserScript==
// @name           Scroll To Top
// @namespace      sunnylost
// @version        v1.3.2
// @include        http://*
// @include        https://*
// ==/UserScript==
(function(global) {
    if(global !== window) return;
    
    function _(id) {
        return document.getElementById(id);
    }
	
    function bind(context, name) {
        return function() {
            return context[name].apply(context, arguments);
        }
    }
	
    global.addEventListener('scroll', scrollHandler, false);
	
    function scrollHandler() {
        !scroll.isScrolling && ((scroll.getScrollY() > 0) ? scroll.showBtn() : scroll.hideBtn());
    }

    var scroll = {
        __scrollY : 0,
        isScrolling : false,  //is scrolling
        imgBtn : null,
        isBtnShow : false,
        pageHeight : 0,
        speed : 0.75,
        init : function() {
            var document = global.document,
                 div = document.createElement('div'),
                 css;
            css = '#__scrollToTop{font:12px/1em Arial,Helvetica,sans-serif;margin:0;padding:0;position:fixed;display:none;left:92%;top:80%;text-align:center;z-index:999999; width:74px;height:50px;' +
                                    'cursor:pointer;opacity:0.5;padding:2px;}' +
                  '#__scrollToTop:hover{opacity:1;}' +
                  '#__scrollToTop span.__scroll__arrow{ position:relative;top:20px;background:none repeat scroll 0 0 #eee;border-style:solid; border-width:1px;' +
                                                             'border-color:#ccc #ccc #aaa; border-radius:5px;color:#333;font-size:36px;padding:5px 8px 2px;}' +
                  ' #__scroll__scroll{height:50px;width:50px;float:left;z-index:100001;position:absolute;} ' +
                  '#__scroll__util{font:12px/1em  Arial,Helvetica,sans-serif;text-align:center;height:44px;width:20px;float:right;position:absolute;left:54px;z-index:100000; ' +
                                     'border-style:solid; border-width:1px;border-color:#ccc #ccc #aaa; border-radius:2px;top:5px;display:none;}' +
                  '#__scroll__util span{display:block;height:18px;padding-top:4px;text-align:center;text-shadow:2px 2px 2px #888;font-size:16px;} ' +
                  '#__scroll__util span:hover{background-color: #fc9822;}';

            GM_addStyle(css);
			
            div.id = '__scrollToTop';
            div.title = 'Back To Top';
            div.innerHTML = '<div id="__scroll__scroll">' +
                                                       '<span class="__scroll__arrow">▲</span>' +
                                                 '</div>' +
                                                 '<div id="__scroll__util">' +
                                                     '<span name="__hide" title="Hide the Button">x</span>' +
                                                     '<span name="__bottom" title="Scroll to the bottom">▼</span>' +
                                                 '</div>';
            document.body.appendChild(div);
            div.addEventListener('mousedown', bind(this, 'control'),false);
            div.addEventListener('mouseover', bind(this, 'showUtil'),false);
            div.addEventListener('mouseout', bind(this, 'hideUtil'),false);
            
            this.util = _('__scroll__util');
            this.pageUtil = _('__scroll__page');
            this.pageHeight = document.body.scrollHeight;
            return this.imgBtn = div;		

        },
        getImgBtn : function() {
            return this.imgBtn || this.init();
        },
        show : function(elem) {
            elem.style.display = 'block';
        },
        hide : function(elem) {
            elem.style.display = 'none';
        },
        showBtn : function() {
            if(this.isBtnShow) return;
            this.isBtnShow = true;
            this.show(this.getImgBtn());
        },
        hideBtn : function() {
            if(!this.isBtnShow) return;
            this.isBtnShow = false;
            this.hide(this.getImgBtn());
        },
        getScrollY : function() {
            //this piece of code is from John Resig's book 'Pro JavaScript Techniques'
            var de = document.documentElement;
            return this.__scrollY = (self.pageYOffset ||
                    ( de && de.scrollTop ) ||
                    document.body.scrollTop);
		},
        closeBtn : function(event) {
            event.preventDefault();
            event.stopPropagation();
            this.hideBtn();
            window.removeEventListener('scroll', scrollHandler, false);
        },
        showUtil : function() {        
            this.show(this.util);
        },
        hideUtil : function() {
            this.hide(this.util);
        },
        scroll : function() {
            if(!this.isScrolling) {
               this.isScrolling = true;
            }
            var isStop = false,
                 scrollY = this.__scrollY;
            if(this.direction === 'top') {
                 isStop = scrollY > 0;
                 this.__scrollY = Math.floor(scrollY * this.speed);
            } else {
                  isStop = scrollY < this.pageHeight;
                  this.__scrollY += Math.ceil((this.pageHeight - scrollY) * (1 - this.speed)) + 10;
            }
            this.isScrolling = isStop;
            window.scrollTo(0, this.__scrollY); 
            isStop ? setTimeout(bind(scroll, 'scroll'), 20) : (this.direction === 'top' && this.hideBtn());
        },
        control : function(e) {
            var t = e.target, name = t.getAttribute('name');
            switch(name) {
                case '__bottom':
                    this.scrollToBottom();
                    break;
                case '__hide' :
                    this.closeBtn(e);
                    break;
                default :
                    this.scrollToTop();
                    break;
            }
        },
        scrollToTop : function() {
            this.direction = 'top';
            this.scroll();
        },
        scrollToBottom : function() {
            this.direction = 'bottom';
            var bodyHeight = global.document.body.scrollHeight,
                documentElementHeight = global.document.documentElement.scrollHeight;
            this.pageHeight = Math.max(bodyHeight, documentElementHeight);
            this.scroll();
         }
	};

    //Autoscroll
    (function() {
        var isAutoScroll = false;

        var autoScroll = {
            __autoScrollID : 0,

            isAutoScroll : false,

            defaultSpeed : 1,

            currentSpeed : 1,

            intervalTime : 100,

            reset : function() {
                this.isAutoScroll && (this.currentSpeed = this.defaultSpeed);
            },

            startOrStop : function() {
                var that = this;
                if(that.isAutoScroll) {
                    that.isAutoScroll = false;
                    clearInterval(that.__autoScrollID);
                } else {
                    that.isAutoScroll = true;
                    that.__autoScrollID = setInterval(function() {
                        global.scrollBy(0, that.currentSpeed);
                    }, that.intervalTime);
                }
            },

            fast : function() {
                this.isAutoScroll && this.currentSpeed <= 10 && this.currentSpeed++;
            },

            slow : function() {
                this.isAutoScroll && this.currentSpeed > 1 && this.currentSpeed--;
            },

            keyControl : function(e) {
                if(e.target != global.document.body && e.target != global.document.documentElement) return false;  // only when the cursor focus on the page rather than the input area can trigger this event.
                var charCode = e.charCode,
                    key = this.keyMap[charCode];
                key && this[key]();
            },

            keyMap : {
              '100' : 'slow',        // press 'd', slow the speed of the scroll
              '102' : 'fast',        // press 'f', speed scroll
              '114' : 'reset',       // press 'r', reset the autoscroll's speed
              '115' : 'startOrStop'  //when you click 's' at the first time, the autoscroll is begin, and then you click again, it will stop.
           }
        };
        global.addEventListener('keypress', bind(autoScroll, 'keyControl'), false);
    }())
}(window.top))