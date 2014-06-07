// ==UserScript==
// @name           MonkeyBean
// @namespace      sunnylost
// @version        1.0
// @include        http://*.douban.*/*
// @include        http://douban.fm/*
// @require http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @require http://code.jquery.com/jquery-1.7.2.min.js
/* @reason
 @end*/
// ==/UserScript==

typeof Updater != 'undefined' && new Updater({
    name: "MonkeyBean",
    id: "124760",
    version:"1.0"
}).check();

/**
 * 说明：
 *      monkey-action：用于触发事件
 *      monkey-data：用于保存信息
 *      monkey-sign：标记的元素
 */
(function(window, $, undefined) {
    if(window !== window.top) return false;  //防止在iframe中执行

    $ = $ || window.$;

    var startTime = new Date();

    /*-------------------Begin--------------------*/
    /**
     * 静态变量
     */
    var MonkeyBeanConst = {
        PAGE_ITEM_COUNTS : 100,   //每页显示条目

        API_COUNT : 'MonkeyBean.API.count',
        API_LAST_REQUEST_TIME : 'MonkeyBean.API.lastTime',
        API_INTERVAL : 60000, //请求api的间隔
        API_LIMIT : 10,       //在以上间隔内，最多请求次数，默认10次
        API : {                //豆瓣API
            'PEOPLE' : 'http://api.douban.com/people/{1}'  //用户信息
        },

        DATA_SPLITER : '[-]',  //monkey-data中的分隔符

        DOUBAN_MAINPAGE : 'http://www.douban.com/',  //豆瓣主页

        MODULE_NAME_PREFIX : 'MonkeyBean.Module.',

        HIGHLIGHT_COLOR : '#46A36A' , //高亮用户发言的颜色
        BLANK_STR : '',                  //空字符串

        SEARCH_INPUT : {    //搜索框选项
            'www' : {
                'placeholder' : '成员、小组、音乐人、主办方',
                'url' : 'http://www.douban.com/search',
                'cat' : ''
            },
            'movie' : {
                'placeholder' : '电影、影人、影院、电视剧',
                'url' : 'http://movie.douban.com/subject_search',
                'cat' : '1002'
            },
            'book' : {
                'placeholder' : '书名、作者、ISBN',
                'url' : 'http://book.douban.com/subject_search',
                'cat' : '1001'
            },
            'music' : {
                'placeholder' : '唱片名、表演者、条码、ISRC',
                'url' : 'http://music.douban.com/subject_search',
                'cat' : '1003'
            },
            'location' : {
                'placeholder' : '活动名称、地点、介绍',
                'url' : 'http://www.douban.com/event/search',
                'cat' : ''
            }
        },

        USER_NAME : 'monkey.username',
        USER_LOCATION : 'monkey.location'
    };

    var hasOwn = Object.prototype.hasOwnProperty,

        mine = /\/mine/,
        people = /\/people\/(.*)\//,
        //快捷键对应的code
        keyCode = {
            'enter' : 13
        };



    //-------------------------猴子工具箱----------------------------------
    var monkeyToolBox = {
        cookie : {
            get : function(name) {
                var start,
                    end,
                    len = document.cookie.length;
                if(len > 0) {
                    start = document.cookie.indexOf(name + '=');
                    if(start != -1) {
                        start = start + name.length + 1;
                        end = document.cookie.indexOf(';', start);
                        if(end == -1) end = len;
                        return decodeURI(document.cookie.substring(start, end).replace(/"/g, ''));
                    }
                }
                return '';
            }
        },
        //地址查询字符串搜索
        locationQuery : function() {
            if(location.search.length < 0) return {};

            var queryarr = location.search.substring(1).split('&'),
                len = queryarr.length,
                item,
                result = {};
            while(len) {
                item = queryarr[--len].split('=');
                result[decodeURIComponent(item[0])] = decodeURIComponent(item[1]);
            }
            return result;
        },

        //让光标定位到文本框末尾，非浏览器兼容的代码
        focusToTheEnd : function(el) {
            var len = el.value.length;
            el.setSelectionRange(len, len);
            el.focus();
        },
        //jQuery 1.7的方法
        isNumeric: function( obj ) {
            return !isNaN( parseFloat(obj) ) && isFinite( obj );
        },

        //增加快捷键
        addHotKey : function(elem, key, fn) {
            elem.addEventListener('keydown', function(e) {
                fn();
            });
        }
    };

    //shortcuts
    var cookie = monkeyToolBox.cookie,
        query = monkeyToolBox.locationQuery(),
        isNumeric = monkeyToolBox.isNumeric,
        focusToTheEnd = monkeyToolBox.focusToTheEnd;

    var MonkeyBean = {
        author : 'sunnylost',
        updateTime : '20120310',
        password : 'Ooo! Ooo! Aaa! Aaa! :(|)',

        path : location.hostname + location.pathname,

        //开启debug模式
        debugMode : false,

        log : function(msg) {
            MonkeyBean.debugMode && typeof console !== 'undefined' && console.log(msg);
        },

        GUID : 0,

        CommentId : function() {
            return 'Monkey-Comment-' + (this.GUID++);
        },

        //TODO,使用豆瓣API有限制，每个IP每分钟10次，如果加上key的话是每分钟40次，如果超过限制会被封IP，因此要记录调用API次数及其间隔。
        useAPI : function() {
        },

        getUserInfo : function(nickName) {

        },

        get : function(key, defaultVal) {
            return GM_getValue(key, defaultVal);
        },

        set : function(key, value) {
            GM_setValue(key, value);
        },

        del : function(key) {
            GM_deletetValue(key);
        },
        //MonkeyBean初始化方法
        init : function() {
            var that = this;
            //this.trigger('load');
            this.MonkeyModuleManager.turnOn();
            //注册全局click事件
            $(document.body).delegate('[monkey-action]', 'click', function(e) {
                var actionContext = this,
                    actionType = this.getAttribute('monkey-action'),
                    actionName = this.getAttribute('monkey-action-name');
                //console.log(actionType + '-' + actionName);
                that.trigger(actionType, [actionName, actionContext, e]);
            })

            //loading动画
            this.bind('loadingStart', function() {
                $('.Monkey-Loading-stop').removeClass('Monkey-Loading-stop').addClass('Monkey-Loading');
            })

            this.bind('loadingStop', function() {
                $('.Monkey-Loading').removeClass('Monkey-Loading').addClass('Monkey-Loading-stop');
            })
        },

        //是否登录
        isLogin : function() {
            return (typeof this.login !== 'undefined' && this.login) || (this.login = !!this.getCk());
        },
        //TODO:获取用户ID，有问题
        userId : function() {
            var str = cookie.get('dbcl2');
            return str && str.split(':')[0];
        },

        getCk : function(flag) {
            return !flag ? (this.ck || (this.ck = cookie.get('ck'))) : cookie.get('ck');
        },
        //Mr.TM Tripple M;
        MonkeyModuleManager : (function() {
            var moduleTree = {},  //模块树，所有模块都生长在树上。
                get,              //根据名字获得对应模块
                turnOn,
                register;

            get = function(moduleName) {
                return moduleTree[moduleName];
            };

            register = function(moduleName, module) {
                moduleTree[moduleName] = module;
            };

            turnOn = function() {
                var m, tmpModule;
                for(m in moduleTree) {
                    if(hasOwn.call(moduleTree, m)) {
                        tmpModule = moduleTree[m];
                        log(tmpModule.name + ' 加载~');
                        tmpModule.fit() && tmpModule.load();
                    }
                }
            };

            return {
                get : get,
                register : register,
                turnOn : turnOn
            }
        })()
    };
    /**
        TODO:需要重写

     * 页面类型：
           www : 我的豆瓣
           book : 读书
           movie : 电影
           music : 音乐
           location : 同城
           9 : 9点
           fm : FM
           alpha : 阿尔法城

           group : 小组
                topic : 话题
                category : 分类
           discussion : 讨论
           list : 包括豆列、搜索列表
           update : 友邻广播
           photo : 相册
      
     */
    MonkeyBean.page = (function() {
        var type = '',
            turnType = '', //翻页类型
            path = MonkeyBean.path,
            hostname = location.hostname,
            normalType = /(www|book|movie|music|9)\.douban\.com\/.*/,
            list = /(book|movie|music)\.douban\.com\/(doulist\/\d+)|(subject_search)|(review\/best\/)/,
            group = /www\.douban\.com\/group\/?/,
            topic = /group\/topic\/\d+/,
            discussion = /((group\/[^\/]+)|(subject\/\d+))\/discussion/,
            category = /group\/category\/\d+\//,
            update = /www\.douban\.com\/update\//,
            photo = /www\.douban\.com\/photos\/album\/\d+/;

        if(hostname == 'douban.fm') {
            type = 'fm';
        } else if(hostname == 'alphatown.com') {
            type = 'alpha';
        } else {
            if(list.test(path)) {
                turnType = 'list';
            }
            type = path.replace(normalType, '$1');
            if(group.test(path)) {
                (topic.test(path) && (turnType = 'topic')) || 
                (discussion.test(path) && (turnType = 'discussion')) ||
                (category.test(path) && (turnType = 'category'));
            } else if(update.test(path)) {
                turnType = 'update';
            } else if(photo.test(path)) {
                turnType = 'photo';
            } else if(discussion.test(path)) {
                turnType = 'discussion';
            } else if(type.indexOf('douban.com') != -1) {
                type = 'location';
            }
        }
       
        return {
            'type' : type,
            'turnType' : turnType
        };
    })();
    var log = MonkeyBean.log;
    MonkeyBean.TM = MonkeyBean.MonkeyModuleManager;

    var cusEvents = {
        subscribers : {
        },

        bind : function(type, fn, context) {
            type = type || 'any';
            fn = $.isFunction(fn) ? fn : context[fn];

            if(typeof this.subscribers[type] === 'undefined') {
                this.subscribers[type] = [];
            }
            this.subscribers[type].push({
                fn : fn,
                context : context || this
            })
        },

        unbind : function(type, fn, context) {
            this.visitSubscribers('unbind', type, fn, context);
        },

        trigger : function(type, publication) {
            this.visitSubscribers('trigger', type, publication);
            return this;
        },

        visitSubscribers : function(action, type, arg, context) {
            var pubtype = type || 'any',
                subscribers = this.subscribers[pubtype],
                i = 0,
                max = subscribers ? subscribers.length : 0;

            for(; i < max; i += 1) {
                if(action === 'trigger') {
                    subscribers[i].fn.apply(subscribers[i].context, arg);
                } else {
                    if(subscribers[i].fn === arg && subscribers[i].context === context) {
                        subscribers.splice(i, 1);
                    }
                }
            }
        }
    };

    var MonkeyModule = function(name, method) {
        if(this.constructor != MonkeyModule) {
            return new MonkeyModule(name, method);
        }
        //this.guid = guid++;
        this.name = name;
        $.extend(this, method);
        //this.on = MonkeyBean.get(moduleNamePrefix + name);  //是否启动
        this.on = true;
        this.init();
    };

    MonkeyModule.prototype = {
        constructor : MonkeyModule,

        init : function() {
            MonkeyBean.TM.register(this.name, this);
        },

        get : function(name) {
            return this.attr[name];
        },

        set : function(key, value) {
            this.attr = this.attr || {};
            var attrs, attr;
            if($.isPlainObject(key) || key == null) {
                attrs = key;
            } else {
                attrs = {};
                attrs[key] = value;
            }
            for(attr in attrs) {
                //log(attr + '---------' + attrs[attr]);
                this.attr[attr] = attrs[attr]
            }
            this.trigger('change');  //属性更改会触发change事件
        },

        load : function() {
            //log(this.name + ' 准备加载！');
        },
        //检测是否适用于当前页面
        fit : function() {
            //如果不提供filter，默认全局开启。
            return this.filter ? !$.isArray(this.filter) && (this.filter.test(MonkeyBean.path)) : true;
        },

        //TODO:一个简单的模板方法
        template : function(key, value) {
        },

        toString : function() {
            return 'This module\'s name is:' + this.name;
        }
    };

    $.extend(MonkeyBean, cusEvents);
    $.extend(MonkeyModule.prototype, cusEvents);



    var userName = MonkeyBean.get(MonkeyBeanConst.USER_NAME),

        userLocation = MonkeyBean.get(MonkeyBeanConst.USER_LOCATION);

    //log(userName);
    //log(userLocation);

    //GM_deleteValue(cName);
    log('username=' + userName);
    //获得用户ID与地址
    (function () {
        if (!userName) {
            GM_xmlhttpRequest({
                method:'GET',
                url:'http://www.douban.com/mine',
                onload:function (resp) {
                    //没有cookie~会自动跳转到登录页面
                    if (location.href.indexOf('www.douban.com/accounts/login') != -1) return;
                    //响应头部信息中，包含了最终的url，其中就有用户名
                    var arr = resp.finalUrl.split('/');
                    userName = arr[arr.length - 2];
                    MonkeyBean.set(MonkeyBeanConst.USER_NAME, userName);
                    log('2222' + MonkeyBeanConst.USER_NAME + '=' + MonkeyBean.get(MonkeyBeanConst.USER_NAME, ''));
                }
            })
        }

        if (!userLocation) {
            GM_xmlhttpRequest({
                method:'GET',
                url:'http://www.douban.com/location',
                onload:function (resp) {
                    if (location.href.indexOf('www.douban.com/accounts/login') != -1) return;
                    //响应头部信息中，包含了最终的url，其中就有地址
                    var arr = trim(resp.finalUrl).split('.');
                    userLocation = arr[0].slice(7);
                    MonkeyBean.set(MonkeyBeanConst.USER_LOCATION, userLocation);
                }
            })
        }
    })()

    MonkeyBean.UI = {
        css : {
            'button' : '.Monkey-Button {\
                          color : #4F946E;\
                          background-color: #F2F8F2;\
                          border: 1px solid #E3F1ED;\
                          padding : 0 8px;\
                          border-radius : 3px 3px 3px;\
                          cursor : pointer;\
                      }\
                      .Monkey-Button a {\
                          color : #4F946E;\
                          background-color: #F2F8F2;\
                      }\
                      .Monkey-Button:hover, .Monkey-Button:hover a {\
                        background-color: #0C7823;\
                        border-color: #C4E2D8;\
                        color: #FFFFFF;\
                      }',
            //只是向下的箭头
            'arrow' : ' .Monkey-Pointer {\
                            position : absolute;\
                            height : 0;\
                            left : 50px;\
                        }\
                        .Monkey-Pointer-Border {\
                            border: 9px solid;\
                        }\
                        .Monkey-a {\
                            border-color: #BBBBBB transparent transparent;\
                        }\
                        .Monkey-b {\
                            border-color: #FFFFFF transparent transparent;\
                            top: -20px;\
                            position : relative;\
                        }',

            //loading样式来源于http://www.alessioatzeni.com/blog/css3-loading-animation-loop/
            'loading' : '.Monkey-Loading {\
                            background-color: rgba(0,0,0,0);\
                            border:5px solid rgba(255,255,255,0.9);\
                            opacity:.9;\
                            border-left:5px solid rgba(0,0,0,0);\
                            border-right:5px solid rgba(0,0,0,0);\
                            border-radius:50px;\
                            box-shadow: 0 0 15px #fff;\
                            width:10px;\
                            height:10px;\
                            margin:0 auto;\
                            position:relative;\
                            -moz-animation:spinoffPulse 1s infinite linear;\
                            -webkit-animation:spinoffPulse 1s infinite linear;\
                        }\
                        @-moz-keyframes spinoffPulse {\
                            0% { -moz-transform:rotate(0deg); }\
                            100% { -moz-transform:rotate(360deg);  }\
                        }\
                        @-webkit-keyframes spinoffPulse {\
                            0% { -webkit-transform:rotate(0deg); }\
                            100% { -webkit-transform:rotate(360deg); }\
                        }\
                        .Monkey-Loading-stop {\
                            display : none;\
                            -moz-animation-play-state : paused;\
                        }'

        },

        html : {
            'arrow' : '<div class="Monkey-Pointer">\
                        <div class="Monkey-a Monkey-Pointer-Border"></div>\
                        <div class="Monkey-b Monkey-Pointer-Border"></div>\
                    </div>'
        }
    };


    /*********************************UI begin**************************************************************/
    /**
     * 提示便签
     * TODO : 默认3秒的延迟消失，这里的时间应该可以配置
     * updateTime : 2012-3-13
     */
    MonkeyModule('tip', {
        css : '#MonkeyUI-tip {\
                    background-color: #F9EDBE;\
                    border: 1px solid #F0C36D;\
                    -webkit-border-radius: 2px;\
                    -webkit-box-shadow: 0 2px 4px rgba(0,0,0,0.2);\
                    border-radius: 2px;\
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);\
                    font-size: 13px;\
                    line-height: 18px;\
                    padding: 16px;\
                    position: absolute;\
                    vertical-align: middle;\
                    width: 160px;\
                    z-index: 6000;\
                    border-image: initial;\
                    display:none;\
                }\
                #MonkeyUI-tip .Monkey-Pointer {\
                    top : 95px;\
                }\
                #MonkeyUI-tip .Monkey-a {\
                    border-color : #F0C36D transparent transparent;\
                }\
                #MonkeyUI-tip .Monkey-b {\
                    border-color : #F9EDBE transparent transparent;\
                }',

        html : '<div id="MonkeyUI-tip">\
                    <p name="MonkeyUI-tip-content"></p>\
                    <a href="javascript:void(0)" style="position:relative;left:45%;" monkey-action="TipClose" >关闭</a>\
                    ' + MonkeyBean.UI.html.arrow + 
                '</div>',

        load : function() {
            var that = this;
            this.render();
            MonkeyBean.bind('TipClose', function() {
                that.hide();
            })
        },

        render : function() { 
            this.el = $(this.html);
            this.content = this.el.find('p[name=MonkeyUI-tip-content]');
            document.body.appendChild(this.el[0]);
            GM_addStyle(this.css);
            GM_addStyle(MonkeyBean.UI.css.arrow);
        },

        show : function(msg, pos) {
            var that = this;
            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(function() {
                that.hide();
            }, 3000);
            this.content.html(msg);
            this.el.css({
                'left' : pos.left + 'px',
                'top' : pos.top + 'px'
            })
            this.el.fadeIn();
        },

        hide : function() {
            clearTimeout(this.timeoutId);
            this.el.fadeOut();
        }

    });

    /**
     * 回复框
     * updateTime : 2012-2-19
     */
    MonkeyModule('reply', {
        css : '#Monkey-ReplyForm{\
                -moz-border-bottom-colors: none;\
                -moz-border-image: none;\
                -moz-border-left-colors: none;\
                -moz-border-right-colors: none;\
                -moz-border-top-colors: none;\
                background-color: #FFFFFF;\
                border-color: #ACACAC #ACACAC #999999;\
                border-style: solid;\
                border-width: 1px;\
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);\
                color: #000000;\
                outline: 0 none;\
                z-index: 1101;\
                display : none;\
                height : 320px;\
                width : 350px;\
                position: fixed;\
                left : 60%;\
                top : 20%;\
            }\
            #Monkey-ReplyToolbox {\
                position : absolute;\
                margin-left : 15px;\
                text-align : center;\
                padding-bottom : 2px;\
                left : 60px;\
                bottom : 2px;\
                height : 25px;\
            }\
            #Monkey-ReplyText {\
                position : absolute;\
                top : 2px;\
                height : 85%;\
                width : 99%;\
                padding : 2px 3px 0 3px;\
            }\
            #Monkey-ReplyText textarea {\
                font-size: 12px;\
                width : 96%;\
                height : 100%;\
                padding : 2px;\
                margin : 3px;\
            }\
            .Monkey-FormButton {\
                background-color: #3FA156;\
                border: 1px solid #528641;\
                border-radius: 3px 3px 3px 3px;\
                color: #FFFFFF;\
                cursor: pointer;\
                height: 25px;\
                padding: 5px 10px 6px;\
            }\
            .Monkey-FormButton:hover {\
                background-color: #4FCA6C;\
                border-color: #6AAD54;\
            }\
            .Monkey-FormButton-flat {\
                border-color: #BBBBBB #BBBBBB #999999;\
                border-radius: 3px 3px 3px 3px;\
                border-style: solid;\
                border-width: 1px;\
                color: #444444;\
                display: inline-block;\
                overflow: hidden;\
                vertical-align: middle;\
            }\
            .Monkey-FormButton-flat input {\
                background-image: -moz-linear-gradient(-90deg, #FCFCFC 0pt, #E9E9E9 100%);\
                border: 0 none;\
                border-radius: 2px 2px 2px 2px;\
                color: #333333;\
                cursor: pointer;\
                font-size: 12px;\
                height: 25px;\
                margin: 0 !important;\
                padding: 0 14px;\
            }\
            .Monkey-FormButton-flat:hover {\
                border-color: #999999 #999999 #666666;\
                color: #333333;\
            }',

        html : '<div id="Monkey-ReplyForm">\
                    <form name="comment_form" method="post" action="add_comment">\
                        <div style="display: none;">\
                            <input name="ck" value="' + MonkeyBean.getCk() + '" type="hidden">\
                        </div>\
                        <div id="Monkey-ReplyText">\
                            <textarea id="re_text" name="rv_comment" rows="10" cols="40">\
                            </textarea>\
                        </div>\
                        <div id="Monkey-ReplyToolbox">\
                            <input value="加上去" type="submit" monkey-action="submit" class="Monkey-FormButton">\
                            <span class="Monkey-FormButton-flat">\
                                <input value="清空" type="button" monkey-action="reset" class="Monkey-FormButton-flat">\
                            </span>\
                            <span class="Monkey-FormButton-flat">\
                                <input value="取消" type="button" monkey-action="cancel" class="Monkey-FormButton-flat">\
                            </span>\
                        </div>\
                    </form>\
                </div>',

        load : function() {
            log('loading reply');
            this.render();
        },

        render : function() {
            var that = this;
            GM_addStyle(this.css);
            this.form = $(this.html);
            this.form.appendTo(document.body);
            this.text = $('#Monkey-ReplyForm #re_text');
            this.text.val('');  //默认光标会出现在textare的第一行正中间，手动清除一下
            this.form.delegate('input[monkey-action]', 'click', function() {
                that[this.getAttribute('monkey-action')]();
            });
        },

        show : function() {
            this.form.show();
            focusToTheEnd(this.text[0]);
        },

        submit : function() {
            log('submit');
        },
        //清除回复框中的内容
        reset : function() {
            this.text.val('');
            this.text.focus();
        },
        //隐藏回复框
        cancel : function() {
            this.reset();
            this.form.hide();
        },
        //向文本框中输入内容，如果文本框中有内容，则增加一个换行，再添加新内容
        setContent : function(content) {
            this.show();  //如果不显示，那么执行focusToTheEnd会报错
            var oldContent = this.text.val();
            this.text.val(($.trim(oldContent) == '' ? '' : oldContent + '\n') + content);
            focusToTheEnd(this.text[0]);
        }
    });
    /*********************************UI end**************************************************************/

    /*********************************Common Function****************************************************************/
    /**
     * 通用留言工具函数
     * updateTime : 2012-2-21
     */
    var monkeyCommentToolbox = {
        //快捷回复
        reply : function(data, el) {
            var form = MonkeyBean.TM.get('reply');
            form.show();
            form.setContent('@' + data.split(MonkeyBeanConst.DATA_SPLITER)[1] + '\n');
        },
        //引用用户发言
        quote : function(data) {
            var commentId = data.split(MonkeyBeanConst.DATA_SPLITER)[2],
                comment = null,
                quoteHeader = '',
                quoteContent = '',
                spliter = '-------------------------------------------------------------------\n';
            log('-----=====' + commentId);
            comment = $('#' + commentId);
            quoteHeader = comment.find('h4').text().replace(/\s+/g, ' ') + '\n';
            quoteContent = comment.find('.reply-doc p').text() + '\n';
            log(quoteHeader);
            log(quoteContent);
            MonkeyBean.TM.get('reply').setContent(spliter + quoteHeader + quoteContent + spliter);
        },
        //只看该用户发言
        only : function(data) {
            var items = this.cache || (this.cache = $('[monkey-sign]')),
                len = items.length,
                i = 0,
                tmp = null;
            while(len--) {
                tmp = items.eq(len);
                tmp.attr('monkey-sign') != data.split(MonkeyBeanConst.DATA_SPLITER)[0] && tmp.hide();
            }
        },
        //高亮该用户所有发言
        highlight : function(data) {
            var items = $('[monkey-sign=' + data.split(MonkeyBeanConst.DATA_SPLITER)[0] + ']'),
                len = items.length,
                tmpColor = '';
            tmpColor = (this.clicked = !this.clicked) ? MonkeyBeanConst.HIGHLIGHT_COLOR : MonkeyBeanConst.BLANK_STR;
            while(len--) {
                items.eq(len).css('backgroundColor', tmpColor);
            }
        },
        //忽略该用户所有发言
        ignore : function(data) {
            var items = $('[monkey-sign=' + data.split(MonkeyBeanConst.DATA_SPLITER)[0] + ']'),
                len = items.length;
            while(len--) {
                items.eq(len).hide();
            }
        },
        //还原为原始状态
        reset : function(data) {
            var items = this.cache || $('[monkey-sign]'),
                len = items.length,
                tmp = null;
            this.clicked = false;  //"高亮"里需要这个参数
            while(len--) {
                tmp = items.eq(len);
                tmp.show();
                tmp.css('backgroundColor', MonkeyBeanConst.BLANK_STR);
            }
        }
    };

    /*********************************Module begin**************************************************************/
    /**
     * 天气模块
     * updateTime : 2012-3-10
     */
    MonkeyModule('MonkeyWeather', {
        attr : {
            url : 'http://www.google.com/ig/api?weather={1}&hl=zh-cn'
        },

        filter : /www.douban.com\/(mine|(people\/.+\/)$)/,

        css : '.Monkey-Weather{position:relative;top:10px;}',

        html : '<div class="Monkey-Weather">\
                    <div style="float:left;margin-right:10px;">\
                        <img height="40" width="40" alt="{1}" src="http://g0.gstatic.com{2}">\
                        <br>\
                    </div>\
                    <span><strong>{3}</strong></span>\
                    <span>{4}℃</span>\
                    <div style="float:">当前：&nbsp;{1}\
                    </div>\
                </div>',

        el : $('#profile'),

        load : function() {
            this.fetch();
        },

        fetch : function() {
            var place = $('.user-info > a'),
                a,
                that = this;
            if(!place || !$.trim(place.text())) return;
            a = place.attr('href').match(/http:\/\/(.*)\.douban\.com/);
            place = place.text();

            GM_xmlhttpRequest({
                method : 'GET',
                url : this.get('url').replace('{1}', RegExp.$1),
                headers :  {
                    Accept: 'text/xml'
                },
                onload : function(resp) {
                    var xml = $(resp.responseText);
                    
                    that.set({
                        condition : xml.find('condition').attr('data'),
                        icon : xml.find('icon').attr('data'),
                        temp : xml.find('temp_c').attr('data'),
                        place : place
                    });
                    that.render();
                }
            });
        },

        render : function() {
            if(!this.el) return;
            GM_addStyle(this.css);
            var container = $(this.html.replace(/\{1\}/g, this.get('condition'))
                .replace('{2}', this.get('icon'))
                .replace('{3}', this.get('place'))
                .replace('{4}', this.get('temp')));
            container.insertBefore(this.el);
        }
    });

    /**
     * 留言板，增加回复功能
     * 适用页面：个人主页与留言板页
     * updateTime : 2012-2-19
     */
        //TODO:未完成
    MonkeyModule('MonkeyMessageBoard', {
        //TODO：<span class="gact">
        html:{
            'doumail' : '&nbsp; &nbsp; <a href="/doumail/write?to={1}">回豆邮</a>',
            'reply' : '&nbsp; &nbsp; <a href="JavaScript:void(0);" monkey-data="{1}' + MonkeyBeanConst.DATA_SPLITER + '{2}" title="回复到对方留言板">回复</a>',
            'form' : '<form style="margin-bottom:12px" id="fboard" method="post" name="bpform">\
                         <div style="display:none;"><input type="hidden" value="' + MonkeyBean.getCk() + '" name="ck"></div>\
                         <textarea style="width:97%;height:50px;margin-bottom:5px" name="bp_text"></textarea>\
                         <input type="submit" value=" 留言 " name="bp_submit">\
                         <a href="javascript:void(0);" id="monkey_resetBtn" style="float:right;display:none;">点击恢复原状</a>\
                     </form>'
        },

        filter : /www.douban.com\/(people\/.+\/)(board)$/,

        el : $('ul.mbt'),

        load : function () {
            return true;
            this.render();
        },

        render : function () {
            this.form = $(this.html['form']);
            this.form.insertBefore(this.el);
            this.resetBtn = $('#monkey_resetBtn');
            this.resetBtn.bind('click', $.proxy(this.reset, this));
            this.bind('reply', this.reply, this);

            if (!this.el || (this.el = this.el.find('li.mbtrdot')).length < 1) return;
            var len = this.el.length,
                i = 0,
                that = this,
                id,
                nickName,
                tmp;
            for (; i < len; i++) {
                tmp = this.el[i];
                var tempVar = tmp.getElementsByTagName('a')[0];
                nickName = tempVar.innerHTML;
                tempVar.href.match(people);
                id = RegExp.$1;
                if (id != 'sunnylost') {
                    tmp = tmp.getElementsByTagName('span');
                    if (tmp.length == 1) {
                        tmp[0].parentNode.innerHTML += '<br/><br/><span class="gact">' + (this.html['doumail'] + this.html['reply']).replace(/\{1\}/g, id).replace('{2}', nickName) + '</span>';
                    } else if (tmp.length == 2) {
                        tmp[1].innerHTML += this.html['reply'].replace(/\{1\}/g, id).replace('{2}', nickName);
                    }

                }
            }
            this.el.delegate('a[monkey-data]', 'click', function () {
                that.trigger('reply', $(this).attr('monkey-data'));
            });
        },

        //TODO:点击回复按钮时，应该可以回复到对方留言板
        reply : function (userMsg) {
            var tmpArr = userMsg.split(MonkeyBeanConst.DATA_SPLITER);
            this.form.find('[type="submit"]').val('回复到的' + tmpArr[1] + '的留言板');
            this.form.attr('action', 'http://www.douban.com/people/' + tmpArr[0] + '/board');
            this.resetBtn.css('display', 'block');
        },

        reset : function () {
            this.form.find('[type="submit"]').val('回复');
            this.form.attr('action', '');
            this.resetBtn.css('display', 'none');
        }
    });

    
    var unreadDouMail = $('.top-nav-info em').html();  //未读豆邮
    unreadDouMail = unreadDouMail == null ? '' : unreadDouMail;
    /**
     * 猴子导航栏——用于显示顶部导航栏的二级菜单
     * updateTime : 2012-4-24
     */
    MonkeyModule('MonkeyNavigator', {
        css : '.Monkey-Nav-top {\
                clear: both;\
                color: #D4D4D4;\
                height: 30px;\
                margin-bottom: 20px;\
                width: 100%;\
            }\
            .Monkey-Nav-top a:link, .Monkey-Nav-top a:visited, .Monkey-Nav-top a:hover, .Monkey-Nav-top a:active {\
                color: #566D5E;\
            }\
            .Monkey-Nav-top a:hover {\
                color : #566D5E;\
                background-color : #fff;\
            }\
            .Monkey-Nav-top em {\
                color: #1398B0;\
            }\
            .Monkey-Nav-bd {\
                position : fixed;\
                left : {left}px;\
                height : 35px;\
                width : 950px;\
                z-index : 1000;\
                padding-top : 7px;\
                margin-top : -4px;\
                background-color : #E9F4E9;\
                border-radius : 3px;\
            }\
            .Monkey-Nav{\
                display:block;\
                font-size: 12px;\
                margin-left : 15px;\
            }\
            .Monkey-Nav ul, .Monkey-Nav li {\
                text-align : center;\
                margin : 0;\
                padding : 0;\
            }\
            .Monkey-Nav ul li ul li {\
                text-align : center;\
                width : 60px;\
            }\
            .Monkey-Nav:after .Monkey-Nav li ul:after{\
                clear: both;\
                content: " ";\
                display: block;\
                height: 0;\
            }\
            .Monkey-Nav ul li{\
                float : left;\
                height : 26px;\
                line-height : 26px;\
                width : 60px;\
                position : relative;\
                padding : 0;\
            }\
            .Monkey-Nav ul li ul {\
                position : absolute;\
                top : 26px;\
                width : 60px;\
                background-color : #E9F4E9;\
                z-index : 100;\
                display : none;\
            }\
            .Monkey-Nav ul li:hover ul {\
                display : block;\
            }\
            .Monkey-Nav ul li ul a:hover {\
                background-color : #0C7823;\
                padding : 0 5px;\
                color : #fff;\
            }\
            .Monkey-Nav li ul li {\
                float: none;\
                height: 26px;\
                line-height: 26px;\
                padding : 0;\
            }\
            .Monkey-Setting {\
                float : right;\
                padding-left : 20px;\
                margin : 0;\
            }\
            .Monkey-Setting ul li, .Monkey-Setting ul li ul, .Monkey-Setting ul li ul li {\
                width : 80px;\
            }\
            .Monkey-Nav-Search {\
                background: url("/pics/nav/ui_ns_sbg4.png") no-repeat scroll 0 0 transparent;\
                float: right;\
                height: 30px;\
                padding-left: 5px;\
            }\
            .Monkey-Nav-Search form {\
                background: url("/pics/nav/ui_ns_sbg4.png") no-repeat scroll 100% 0 transparent;\
                height: 30px;\
                padding: 0 1px 0 0;\
                width : 260px;\
            }\
            .Monkey-Nav-Search inp {\
                width : 300px;\
                padding-top : 5px;\
            }\
            .Monkey-Nav-Search input {\
                background: none repeat scroll 0 0 #FFFFFF;\
                border: 1px solid #A6D098;\
                float: left;\
                height: 26px;\
                line-height: 26px;\
                padding: 0 2px;\
                width: 300px;\
            }\
            .Monkey-Nav-Search input.text {\
                border: 1px solid #DCDCDC;\
                border-radius: 5px;\
                height: 1em;\
                line-height: 1;\
                padding: 8px 6px;\
                width: 260px;\
            }\
            .Monkey-Nav-Search .bn-srh {\
                background: url("/pics/nav/ui_ns_sbg4.png") no-repeat scroll -191px -100px transparent;\
                border: 0 none;\
                cursor: pointer;\
                height: 23px;\
                margin-left: -28px;\
                overflow: hidden;\
                text-indent: -100px;\
                width: 23px;\
            }\
            .Monkey-ext-btn {\
                color : #0C7823;\
                background-color : #E9F4E9;\
                cursor : pointer;\
                border-radius : 3px;\
                position : relative;\
                width : 275px;\
                top : -3px;\
                display : none;\
                float : left;\
            }\
            .Monkey-ext-btn div {\
                float : left;\
                padding : 5px 15px;\
                margin : 0 0 2px;\
                background-color : #E9F4E9;\
            }\
            .Monkey-ext-btn div:hover {\
                background-color : #fff;\
                border-bottom:1px solid #dcdcdc;\
                border-left:1px solid #dcdcdc;\
                border-right:1px solid #dcdcdc;\
            }\
            .Monkey-Nav-Search:hover .Monkey-ext-btn {\
                display : block;\
            }',

        html:'<div class="Monkey-Nav-top">\
                   <div class="Monkey-Nav-bd">\
                       <div class="Monkey-Nav Monkey-Setting">\
                            <ul>\
                                <li>\
                                    <a href="http://www.douban.com/accounts/" target="_blank">我的帐号<em>' + unreadDouMail + '</em></a>\
                                    <ul>\
                                        <li><a href="http://www.douban.com/doumail/">豆邮<em>' + unreadDouMail + '</em></a></li>\
                                        <!--li><a href="javascript:void(0);" monkey-action="MonkeyConfig.config" title="MonkeyBean插件设置">MonkeyBean</a></li-->\
                                        <li><a href="http://www.douban.com/accounts/logout?ck=' + MonkeyBean.getCk() + '">退出</a></li>\
                                    </ul>\
                                </li>\
                            </ul>\
                       </div>\
                       <div class="Monkey-Nav-Search">\
                               <form action="/search" method="get" name="ssform" id="Monkey-Search-Form">\
                                   <div class="inp">\
                                       <span>\
                                            <input type="text" value="" class="text" maxlength="60" size="22" placeholder="" title="" name="search_text" style="color: rgb(212, 212, 212);">\
                                        </span>\
                                       <span>\
                                            <input type="submit" value="搜索" class="bn-srh"/>\
                                            <div title="双击：立即搜索；单击：选择搜索范围" class="Monkey-ext-btn">\
                                                    <div monkey-data="www" monkey-action="search">社区</div>\
                                                    <div monkey-data="book" monkey-action="search">读书</div>\
                                                    <div monkey-data="movie" monkey-action="search">电影</div>\
                                                    <div monkey-data="music" monkey-action="search">音乐</div>\
                                                    <div monkey-data="location" monkey-action="search">同城</div>\
                                                    <input type="hidden" value="" name="cat">\
                                                    <input type="hidden" value="' + (userLocation || 'location') + '" name="loc">\
                                            </div>\
                                       </span>\
                                   </div>\
                               </form>\
                           </div>\
                       <div class="Monkey-Nav" style="float:left;">\
                            <ul>\
                                <li name="Monkey-Nav-mine">\
                                    <a href="http://www.douban.com/mine">我的豆瓣</a>\
                                    <ul>\
                                        <li><a href="http://www.douban.com/people/' + userName + '/notes">日记</a></li>\
                                        <li><a href="http://www.douban.com/people/' + userName + '/photos">相册</a></li>\
                                        <li><a href="http://www.douban.com/mine/discussions">讨论</a></li>\
                                        <li><a href="http://www.douban.com/people/' + userName + '/recs">推荐</a></li>\
                                        <li><a href="http://www.douban.com/people/' + userName + '/favorites">喜欢</a></li>\
                                        <li><a href="http://www.douban.com/people/' + userName + '/miniblogs">广播</a></li>\
                                        <li><a href="http://www.douban.com/people/' + userName + '/offers">二手</a></li>\
                                        <li><a href="http://www.douban.com/mine/doulists">豆列</a></li>\
                                        <li><a href="http://www.douban.com/people/' + userName + '/board">留言板</a></li>\
                                        <li><a href="http://www.douban.com/settings/">设置</a></li>\
                                    </ul>\
                                </li>\
                                <li name="Monkey-Nav-www">\
                                    <a href="http://www.douban.com/">豆瓣社区</a>\
                                    <ul>\
                                        <li><a href="http://www.douban.com/">豆瓣猜</a></li>\
                                        <li><a href="http://www.douban.com/update/">友邻广播</a></li>\
                                        <li><a href="http://www.douban.com/mine/">我的豆瓣</a></li>\
                                        <li><a href="http://www.douban.com/group/">我的小组</a></li>\
                                        <li><a href="http://www.douban.com/site/">我的小站</a></li>\
                                    </ul>\
                                </li>\
                                <li name="Monkey-Nav-book">\
                                    <a href="http://book.douban.com/">豆瓣读书</a>\
                                    <ul>\
                                        <li><a href="http://book.douban.com/mine">我读</a></li>\
                                        <li><a href="http://book.douban.com/updates">动态</a></li>\
                                        <li><a href="http://book.douban.com/recommended">豆瓣猜</a></li>\
                                        <li><a href="http://book.douban.com/chart">排行榜</a></li>\
                                        <li><a href="http://book.douban.com/tag/">分类浏览</a></li>\
                                        <li><a href="http://book.douban.com/review/best/">书评</a></li>\
                                        <li><a href="http://read.douban.com/">阅读</a><img src="http://img3.douban.com/pics/new_menu.gif" style="top: 4px; position: absolute;"></li>\
                                        <li><a href="http://book.douban.com/cart">购书单</a></li>\
                                    </ul>\
                                </li>\
                                <li name="Monkey-Nav-movie">\
                                    <a href="http://movie.douban.com/">豆瓣电影</a>\
                                    <ul>\
                                        <li><a href="http://movie.douban.com/mine">我看</a></li>\
                                        <li><a style="color:#FF9933;" href="http://movie.douban.com/nowplaying/' + (userLocation || 'location') + '/">影讯</a></li>\
                                        <li><a href="http://movie.douban.com/celebrities/">影人</a></li>\
                                        <li><a href="http://movie.douban.com/tv/">电视剧</a></li>\
                                        <li><a href="http://movie.douban.com/chart/">排行榜</a></li>\
                                        <li><a href="http://movie.douban.com/tag/">分类</a></li>\
                                        <li><a href="http://movie.douban.com/review/best/">影评</a></li>\
                                    </ul>\
                                </li>\
                                <li name="Monkey-Nav-music">\
                                    <a href="http://music.douban.com/">豆瓣音乐</a>\
                                    <ul>\
                                        <li><a href="http://music.douban.com/artists/">音乐人</a></li>\
                                        <li><a href="http://music.douban.com/chart">排行榜</a></li>\
                                        <li><a href="http://music.douban.com/tag/">分类浏览</a></li>\
                                        <li><a href="http://music.douban.com/mine">我的音乐</a></li>\
                                        <li><a target="blank" href="http://douban.fm/">豆瓣FM</a></li>\
                                    </ul>\
                                </li>\
                                <li name="Monkey-Nav-location">\
                                    <a href="http://www.douban.com/location/">豆瓣同城</a>\
                                    <ul>\
                                        <li><a href="http://www.douban.com/events">同城活动</a></li>\
                                        <li><a href="http://' + userLocation + '.douban.com/hosts">主办方</a></li>\
                                        <li><a href="http://www.douban.com/location/mine">我的同城</a></li>\
                                    </ul>\
                                </li>\
                                <li name="Monkey-Nav-fm">\
                                    <a target="_blank" href="http://douban.fm/">豆瓣FM</a>\
                                    <ul>\
                                        <li><a href="http://douban.fm/mine" target="_blank">我的电台</a></li>\
                                        <li><a href="http://douban.fm/app" target="_blank">应用下载</a></li>\
                                    </ul>\
                                </li>\
                                <li name="Monkey-Nav-9">\
                                    <a target="_blank" href="http://9.douban.com">九点</a>\
                                    <ul>\
                                        <li><a href="http://9.douban.com/channel/culture">文化</a></li>\
                                        <li><a href="http://9.douban.com/channel/life">生活</a></li>\
                                        <li><a href="http://9.douban.com/channel/fun">趣味</a></li>\
                                        <li><a href="http://9.douban.com/channel/technology">科技</a></li>\
                                        <li><a href="http://9.douban.com/reader/">我的订阅</a></li>\
                                    </ul>\
                                </li>\
                                <li name="Monkey-Nav-alphatown">\
                                    <a target="_blank" href="http://alphatown.com/">阿尔法城</a>\
                                </li>\
                            </ul>\
                       </div>\
                    </div>\
                </div>',

        el : $('div.top-nav'),

        fit : function() {
            var type = MonkeyBean.page.type;
            return type != 'fm' && type != '9' && type != 'alpha';
        },

        load : function() {
            //在未登录的状态下，首页不显示导航栏
            if(window.location.href == MonkeyBeanConst.DOUBAN_MAINPAGE && !MonkeyBean.isLogin()) return false;

            var that = this,
                pageType = MonkeyBean.page.type;


            this.render(pageType);
            this.form = $('#Monkey-Search-Form');
            this.input = this.form.find('[name="search_text"]');
            this.cat = this.form.find('[name="cat"]');
            this.navBd = $('.Monkey-Nav-bd'); //用于设置导航栏位置

            this.input.val(query['search_text'] || '');  //设置搜索框的默认值

            pageType == 'movie' && this.suggest();  //影视搜索提示

            this.form.delegate('[monkey-action]', 'click', function(e) {
                var target = e.target,
                     type = target.getAttribute('monkey-data'),
                     data = MonkeyBeanConst.SEARCH_INPUT[type];
                that.search(data);
                if(that.lastClick) {
                    that.lastClick.style.cssText = '';
                }
                target.style.cssText = 'background-color : #fff;\
                                border-bottom:1px solid #dcdcdc;\
                                border-left:1px solid #dcdcdc;\
                                border-right:1px solid #dcdcdc;';
                that.lastClick = target;
            });
            this.form.delegate('[monkey-action]', 'dblclick', function(e) {
                var type = e.target.getAttribute('monkey-data'),
                     data = MonkeyBeanConst.SEARCH_INPUT[type];
                that.search(data);
                that.form[0].submit();
            });

            this.search(MonkeyBeanConst.SEARCH_INPUT[pageType]);

            $(window).resize(function() {
                that.navBd.css('left',that.navWidth());
            })
        },

        render : function(type) {
            GM_addStyle(this.css.replace('{left}', this.navWidth()));
            console.log($('.top-nav-info em').html());
            this.el.replaceWith(this.html);
            $('[name=Monkey-Nav-' + type + ']').addClass('on');
            $('.nav-srh').hide();//隐藏原始的搜索栏
        },

        search : function(data) {
            this.form.attr('action', data.url);
            this.cat.val(data.cat);
            this.input.attr('placeholder', data.placeholder);
        },

        //影视搜索的提示功能，iSuggest为豆瓣写的jQuery插件
        //TODO 切换到其他类型时，该功能依然有效。
        suggest : function() {
            this.input.iSuggest({
                api: '/j/subject_suggest',
                tmplId: 'suggResult',
                item_act: function(item){
                    window.location = item.data("link");
                }
            });
        },

        //根据窗口大小来改变导航栏左边的距离
        navWidth : function() {
            //TODO 频繁访问offsetWidth，是否会有问题？
            var bodyWidth = document.body.offsetWidth; //body宽度，用于计算导航栏的位置
            return (bodyWidth / 2 - 475); //导航栏宽度为950
        }
    });


    /**
     * 楼主工具条——依赖于下面的回复增强模块
     * updateTime：2012-2-27
     */
    MonkeyModule('MonkeyPosterToolbar', {
        html : '<div style="margin-bottom:10px;font-size: 14px;">\
                    <span monkey-data="{1}">\
                        <span monkey-action="MonkeyComment" monkey-action-name="reply" rel="nofollow" title="回复楼主发言" class="Monkey-Button">回复</span>\
                        <span monkey-action="MonkeyComment" monkey-action-name="only" rel="nofollow" title="只看楼主的发言" class="Monkey-Button">只看</span>\
                        <span monkey-action="MonkeyComment" monkey-action-name="highlight" rel="nofollow" title="高亮楼主的所有发言" class="Monkey-Button">高亮</span>\
                        <span monkey-action="MonkeyComment" monkey-action-name="ignore" rel="nofollow" title="忽略楼主的所有发言" class="Monkey-Button">忽略</span>\
                        <span monkey-action="MonkeyComment" monkey-action-name="reset" rel="nofollow" title="还原到原始状态" class="Monkey-Button">还原</span>\
                    </span>\
                </div>',

        fit : function() {
            return false;
        },

        els : [
            [$('div.topic-doc a')[0], $('div.topic-opt')],   //第一个包含了楼主的ID，第二个是插入工具条的位置
            [$('span.pl2 a')[0], $('div.review-panel')],
            [$('span.pl2 a')[0], $('div.review-stat')]
        ],

        load : function(index) {
            this.el = this.els[index];

            if(index === undefined ||  typeof this.el === 'undefined' || typeof this.el[0] === 'undefined') return false;

            var posterId = this.el[0].href.replace('http://www.douban.com/people/', '').split('/')[0],
                posterNickName = this.el[0].textContent;
            this.set({
                'posterId' : posterId,
                'posterNickName' : posterNickName
            });
            this.render();
        },

        render : function() {
            GM_addStyle(MonkeyBean.UI.css.button);
            this.el[1] && (this.el[1].prepend(this.html.replace('{1}', this.get('posterId') + MonkeyBeanConst.DATA_SPLITER + this.get('posterNickName'))));
        }
    });

    /**
     * 猴子回复增强模块，适用于小组回复，书籍影视评论等，功能包括楼层数显示。
     * 我忍不住要吐槽啦！为啥豆瓣很多页面功能类似，html结构全完全不同！搞啥啊……
     * TODO:等待重构——2012-3-12

        bug：
            翻页后功能失效
     * updateTime : 2012-3-12
     */
    MonkeyModule('MonkeyComment', {
        //第一个为小组讨论，第二个为影评书评乐评，第三个为论坛
        filter : [
            /www.douban.com\/group\/topic\/\d+/,
            /(book|movie|music).douban.com\/review\/\d+/,
            /(book|movie|music).douban.com\/subject\/\d+\/discussion\/\d+/,
            /www.douban.com\/note\/\d+/
        ],

        els : {
            //回复区域，判断楼层数，放置楼层数的位置，放置工具栏的位置
            '0' : $('.topic-reply'),  //小组
            '1' : $('#comments'),                //电影 书籍 音乐
            //楼主信息：#db-usr-profile .info a，xxx的主页，或者从头像的alt里获取，楼主工具在sns-bar上面添加  #comments 为整个留言区域，每一条留言是div.comment-item，留言人的信息：div.author a，楼层数就在author这里加。其余功能在div.group_banned处追加
            '2' : $('#comments'),                                          //论坛
            '3' : $('#comments')                                           //日志
        },

        attr : {
            'commentItem' : 'li',
            'floor' : 'h4',
            'commentTool' : 'div.operation_div'
        },

        fit : function() {
            var len = this.filter.length,
                i = 0;
            for(; i<len; i++) {
                if(this.filter[i].test(MonkeyBean.path)) {
                    this.el = this.els[i];
                    if(!this.el) return false;
                    this.set('index', i);
                    if(i == 1) {
                        this.refactor();
                    } else if(i == 2) {  //论坛
                        this.set({
                            'commentItem' : 'table.wr',
                            'commentTool' : 'td:eq(1)'
                        });
                    }
                    return true;
                }
            }
            return false;
        },

        css : '.Monkey-floor{ float:right; margin-right:5px;font-size:12px;}',

        html : '<span name="monkey-commenttool" monkey-data="{1}" style="float:right;">\
                    <span>|</span>\
                    <a href="javascript:void(0);" monkey-action="MonkeyComment" monkey-action-name="reply" rel="nofollow" title="回复该用户发言" style="display: inline;margin-left:0;">回</a>\
                    <a href="javascript:void(0);" monkey-action="MonkeyComment" monkey-action-name="quote" rel="nofollow" title="引用该用户发言" style="display: inline;margin-left:0;">引</a>\
                    <a href="javascript:void(0);" monkey-action="MonkeyComment" monkey-action-name="only" rel="nofollow" title="只看该用户的发言" style="display: inline;margin-left:0;">只</a>\
                    <a href="javascript:void(0);" monkey-action="MonkeyComment" monkey-action-name="highlight" rel="nofollow" title="高亮该用户的所有发言" style="display: inline;margin-left:0;">亮</a>\
                    <a href="javascript:void(0);" monkey-action="MonkeyComment" monkey-action-name="ignore" rel="nofollow" title="忽略该用户的所有发言" style="display: inline;margin-left:0;">略</a>\
                    <a href="javascript:void(0);" monkey-action="MonkeyComment" monkey-action-name="reset" rel="nofollow" title="还原到原始状态" style="display: inline;margin-left:0;">原</a>\
                </span>',

        prepare : function() {
            //小组的回复区域：class为topic-reply的UL，影视书籍的回复：ID为comments的DIV
            //分页栏：class为paginator的DIV，当前页码：class为thispage的span
            var currentPage = $('.paginator .thispage'),
                items,
                len = 0,
                start = 0;

            items = this.el.find(this.get('commentItem'));
            len = items.length;
            if(len < 1) return;

            //楼层数。一般来说，多页的链接后面都有一个start参数，表示这页的楼层是从多少开始的。但这个参数并不可靠，考虑分析class为paginator的DIV，里面的a标签更可靠些。
            start = +(query['start']) || (currentPage.length != 0 && !isNaN(+(currentPage.text())) && MonkeyBeanConst.PAGE_ITEM_COUNTS * (+(currentPage.text()) - 1)) || 0;
            this.set({
                'start' : start,
                'items' : items,
                'length' : len
            });
        },

        /**
         * 重构页面，影评与书评的留言结构很怪异……
         */
        refactor : function() {
            //return false;
            var comments = this.el.detach(),
                oldContent = comments.html();
            comments.html(oldContent.replace(/(<span class="wrap">)/, '<li class="clearfix"><div class="reply-doc">$1')
                                    .replace(/(<h2>你的回应.*\s*<\/h2>\s*<div class="txd">)/, '</p><div class="operation_div" style="display:none;"></div><br></div></li>$1')
                                    .replace(/<\/h3><\/span>/g, '</h4></span><p>')
                                    .replace(/<h3>/g, '<h4>')
                                    .replace(/(<span class="wrap">)/g, '</p><div class="operation_div" style="display:none;"></div><br></div></li>' +
                                    '<li class="clearfix"><div class="reply-doc">$1'));

            $('.piir').append(comments);
            //将第一个元素替换为换行
            comments.find('li').first().replaceWith('<br>');
            comments.delegate('li', 'mouseover', function() {
                var toolbar = this.querySelector('div.operation_div');
                toolbar && (toolbar.style.display = 'block');
            });
            comments.delegate('li', 'mouseout', function() {
                var toolbar = this.querySelector('div.operation_div');
                toolbar && (toolbar.style.display = 'none');
            });
        },

        load : function() {
            //这里注册的事件同样适用于楼主工具条。
            var that = this;
            MonkeyBean.bind('MonkeyComment', function(actionName, context) {
                monkeyCommentToolbox[actionName] && monkeyCommentToolbox[actionName](context.parentNode.getAttribute('monkey-data'), context);
            });

            this.prepare();
            this.render();

            MonkeyBean.TM.get('MonkeyPosterToolbar').load(this.get('index'));
            MonkeyBean.bind('loadPage', function() {
                that.prepare();
                that.render();
            });
        },

        render : function() {
            var tmp1 = null
                tmp2 = null,
                userId = '',
                nickName = '',
                items = this.get('items'),
                start = this.get('start'),
                len = this.get('length'),
                i = start,
                itemId = '';

            GM_addStyle(this.css);
            for(; i<len; i++) {
                tmp1 = items.eq(i);

                tmp1.find(this.get('floor'))
                    .append('<span class="Monkey-floor">' + (i + 1) + '楼</span>');
                tmp2 = tmp1.find('a img').length > 0 ? tmp1.find('a')[1] : tmp1.find('a')[0];

                userId = tmp2.href.replace('http://www.douban.com/people/', '').split('/')[0];
                nickName = tmp2.innerHTML;

                tmp1.attr('monkey-sign', userId);

                (itemId = tmp1.attr('id')) === '' && (tmp1.attr('id', itemId = MonkeyBean.CommentId()));
                //log('-----' + itemId + '----' + tmp.attr('id'));
                //monke-data中保存的数据：用户ID，用户昵称，该条留言的ID
                //log(this.el[3]);
                tmp2 = tmp1.find(this.get('commentTool'));
                tmp2.append(this.html.replace('{1}', userId + MonkeyBeanConst.DATA_SPLITER + nickName + MonkeyBeanConst.DATA_SPLITER + itemId));
                //tmp2.parent().hover(function() {
                tmp1.hover(function() {
                    //$(this).find('[name=monkey-commenttool]').css('visibility', 'visible');
                    $(this).find('div.operation_div').css('display', 'block');
                }, function() {
                    $(this).find('div.operation_div').css('display', 'none');
                    //$(this).find('[name=monkey-commenttool]').css('visibility', 'hidden');
                });
            }
        }
    });

    /**
     * 猴子相册——增强豆瓣相册浏览
     * updateTime : 2012-3-13
     */
    MonkeyModule('MonkeyPic', {
        fit : function() {
            //翻页类型是photo就认为是相册页面
            return MonkeyBean.page.turnType == 'photo';
        },

        load : function() {
            //大图http://img3.douban.com/view/photo/photo/public/p1450859575.jpg
            //小图http://img3.douban.com/view/photo/thumb/public/p1450859575.jpg
        }
    });

    /**
     * 猴子工具条——包括电梯、分页导航栏等等
     * 整个豆瓣页面仅仅占据全部页面的中间部分，所以悬浮工具条放在右边是比较不错的。
     * updateTime : 2012-2-29
     */
    MonkeyModule('MonkeyToolbar', {
        css : '#Monkey-Toolbar {\
                top: 32px;\
                box-shadow: 0 0 6px #808080;\
                right: -1px;\
                position: fixed;\
                z-index: 90;\
             }\
             .Monkey-Toolbar-Text {\
                 background-color: #F5F5F5;\
                 background-image: -moz-linear-gradient(center top , #F5F5F5, #F1F1F1);\
                 border: 1px solid rgba(0, 0, 0, 0.1);\
                 color: #444444;\
                 border-radius: 2px 2px 2px 2px;\
                 cursor: default;\
                 font-size: 11px;\
                 font-weight: bold;\
                 height: 27px;\
                 line-height: 27px;\
                 margin-right: 16px;\
                 min-width: 54px;\
                 outline: 0 none;\
                 padding: 0 8px;\
                 text-align: center;\
             }',

        html : '<div id="Monkey-Toolbar">\
                </div>',

        fit : function() {
            return false;
        },

        load : function() {
            this.render();
        },

        render : function() {
            GM_addStyle(this.css);
            var el = $(this.html);
            $(document.body).append(el);
        }
    });

    /**
     * MonkeyBean配置模块
     */
    MonkeyModule('MonkeyConfig', {
        html : '<div id="Monkey-Config">\
                    <div class="title">\
                        <span class="Monkey-Button" monkey-action="closeConfig" style="float:right;">取消</span>\
                        <span class="Monkey-Button" monkey-action="saveConfig" style="float:right;">确定</span>\
                    </div>\
                    <ul class="Monkey-Config-Nav">\
                        <li monkey-action="changeConfigPanel" monkey-data="other">其他配置</li>\
                        <li monkey-action="changeConfigPanel" monkey-data="about">关于脚本</li>\
                    </ul>\
                    <div class="Monkey-Config-Content">\
                        <div monkey-data="other" style="display:block;">\
                            <input id="toggleGroupDescription" type="checkbox" /><label for="toggleGroupDescription">自动隐藏小组介绍</label>\
                            <input id="showFloor" type="checkbox" /><label for="showFloor">显示楼层数</label>\
                        </div>\
                        <div monkey-data="about" style="overflow:auto;height:200px;">\
                            <p>该脚本旨在为豆瓣增加各种各样的功能，Make your douban different!</p>\
                            <p>至于怎么different……完全看我的心情吧！</p>\
                            <dl>\
                                <dt>Q:为什么会写这个脚本？</dt>\
                                <dd>A:不知道……</dd>\
                            </dl>\
                        </div>\
                    </div>\
                </div>',

        css : '#Monkey-Config {\
                    width : 400px;\
                    position : fixed;\
                    left : 30%;\
                    top : 30%;\
                    font-size : 12px;\
                    background: none repeat scroll 0 0 #F6F6F6;\
                    border: 1px solid #EAEAEA;\
                    border-radius: 4px 4px 4px 4px;\
                }\
                #Monkey-Config .title {\
                    background-color: #E9F4E9;\
                    border: 1px solid #EAEAEA;\
                    border-radius: 3px 3px 3px 3px;\
                    color: #566D5E;\
                    left: 0;\
                    padding: 2px;\
                    position: absolute;\
                    top: -24px;\
                }\
                .Monkey-Config-Nav {\
                    list-style : none;\
                    background-color : #fff;\
                    margin : 2px;\
                    float : left;\
                    padding : 2px;\
                    text-align : center;\
                }\
                .Monkey-Config-Nav li {\
                    border-bottom : 1px solid #e4e4e4;\
                    background-color : #F2F8F2;\
                    line-height : 30px;\
                    cursor : pointer;\
                    padding : 2px 10px;\
                }\
                .Monkey-Config-Nav li:hover {\
                    background-color : #0C7823;\
                    color : #fff;\
                }\
                .Monkey-Config-Content {\
                    border : 1px solid #e4e4e4;\
                    background-color : #fff;\
                    overflow : hidden;\
                    margin : 4px;\
                    padding : 2px;\
                }\
                .Monkey-Config-Content div {\
                    display : none;\
                }\
                #Monkey-Config label {\
                    cursor : pointer;\
                }\
                #Monkey-Config label:hover {\
                    background-color : #0C7823;\
                    color : #fff;\
                }',

        load : function() {
            var that = this;
            MonkeyBean.bind('MonkeyConfig.config', function() {
                if(!that.isInit) {
                    that.render();
                    that.oldContent = that.content.find(':first-child');
                    that.el.find('.Monkey-Config-Nav li').bind('mouseover', function() {
                        var elem = $(this);
                        if(elem.attr('monkey-action') == 'changeConfigPanel') {
                            that.oldContent && that.oldContent.hide();
                            that.oldContent = that.content.find('[monkey-data=' + elem.attr('monkey-data') + ']');
                            that.oldContent.show();
                        }
                    });
                }
            });
            MonkeyBean.bind('closeConfig', function() {
                that.el.hide();
            });
            MonkeyBean.bind('saveConfig', function() {
                that.el.hide();
            });
        },

        render : function() {
            this.el = $(this.html);
            this.content = this.el.find('.Monkey-Config-Content');
            GM_addStyle(this.css);
            $(document.body).append(this.el);
            this.isInit = true;
        }
    });

    /**
     * 猴子翻页——通用的翻页工具
     bug：list翻页后有些功能失效
     * updateTime : 2012-3-18
     */
    MonkeyModule('MonkeyPageLoader', {
        css : '#Monkey-PageLoader {\
                    text-align : center;\
                    margin-top : -15px;\
               }\
               #Monkey-PageLoader span{\
                    border-radius : 5px;\
                margin-top : 2px;\
                color : #fff;\
                line-height : 20px;\
                width : 60%;\
                cursor : pointer;\
                display : inline-block;\
                background-color : #83BF73;\
             }\
             #Monkey-PageLoader span:hover {\
                background-color : #55BF73;\
             }',

        html : '<div id="Monkey-PageLoader">\
                    <span monkey-action="MonkeyPageLoader" monkey-action-name="loadPage">加载下一页</span>\
                    <div class="Monkey-Loading-stop" style="left:50px;top:-20px;"></div>\
                </div>',

        fit : function() {
            return false;  //暂时屏蔽翻页功能
            this.paginator = $('div.paginator');
            this.current = this.paginator.find('.thispage'); 
            this.next = this.current.next(); 
            return this.paginator.length > 0 && this.current.length > 0;
        },

        load : function() {
            this.render();
            MonkeyBean.bind('MonkeyPageLoader', this.loadPage.bind(this));
            this.currentNum = +this.current.text();  //当前页码
            this.isWorked = false;  //该功能是否运行过
            //最大的页码
            ((this.maxNum = +this.paginator.find('> a').last().text()) > +this.currentNum || (this.maxNum = this.currentNum));
        },
        //翻页策略
        loadPolitic : function() {
            var politics = {
                //列表：豆列、书籍影音搜索结果
                'list' : {
                    'content' : 'div.article',  //需要获取的内容
                    'filter' : 'script, div.filters, div.paginator, div.col2_doc, span.pl, div.rec-sec',  //需要过滤的无用内容
                    'method' : 'content.insertBefore(that.paginator)',  //使用eval运行这段代码将content加入到dom中，其中content变量名是固定的
                    'finish' : function(root) {
                        //重新绑定事件，以下代码来源于http://img3.douban.com/js/packed_douban504578906.js，略有修改
                        var re = /a_(\w+)/;
                        var fns = {};
                        $(".j", root).each(function (i) {
                            var m = re.exec(this.className);
                            if (m) {
                                var actionName = m[1],
                                    f = fns[actionName];
                                if (!f) {
                                    f = eval("unsafeWindow.Douban.init_" + actionName);
                                    fns[actionName] = f;
                                }
                                //简单判断元素是否绑定过事件，很不严谨，但在豆列页面是有效的。
                                f && f(this);                
                            }
                        }) 
                    }
                },
                //小组讨论列表
                'discussion' : {
                    'content' : 'table.olt tbody tr:gt(0)',  //第一个tr是表格的表头
                    'method' : 'content.appendTo($("table.olt tbody"))'
                },

                //小组话题
                'topic' : {
                    'content' : 'ul.topic-reply li',
                    'method' : '$("ul.topic-reply").append(content)'
                },

                //小组分类
                'category' : {
                    'content' : 'div.indent div.indent',
                    'filter' : 'div.paginator',
                    'method' : 'content.children().insertBefore(that.parent)'
                },

                //友邻广播
                'update' : {
                    'content' : 'div.stream-items',
                    'method' : '$("div.stream-items").append(content.children())',
                    'finish' : function(root) {
                        //TODO 尚未完成

                        //重新绑定事件，以下代码来源于http://img3.douban.com/js/packed_statuses3217430347.js
                        var a = $(".stream-items");
                        log(a);
                        a.find(".mod").each(function (c, e) {
                            var d = $(this),
                                f = d.attr("data-status-id");
                            var b = new Status($(this), f);
                            b.init()
                        });
                        a.find(".btn[data-action-type=expend-all]").click(function (b) {
                            b.preventDefault();
                            $(this).parent().prevAll(".status-item").show().end().remove()
                        });
                        a.delegate(".video-overlay", "click", function (b) {
                            $(this).next(".video-object").show();
                            $(b.target).hide().prev().hide()
                        }).delegate(".video-object .back", "click", function (b) {
                            b.preventDefault();
                            $(this).parent().hide().prevAll().show()
                        }).delegate(".bd blockquote a, .comments-items a:not(.btn)", "click", function (h) {
                            var f = $(h.target).parents(".status-item");
                            var b = f.attr("data-sid");
                            var g = f.attr("data-action");
                            var d = f.attr("data-target-type");
                            var c = f.attr("data-object-kind");
                            moreurl(this, {
                                from: "nmbp-" + b,
                                action: g,
                                target_type: d,
                                object_kind: c
                            })
                        })
                    }
                },

                //相册
                'photo' : {
                    'content' : 'div.photolst',
                    'method' : '$("div.photolst").append(content.children())'
                }
            };

            return politics[MonkeyBean.page.turnType];
        },

        render : function() {
            GM_addStyle(this.css);
            GM_addStyle(MonkeyBean.UI.css.loading);
            this.el = $(this.html);
            this.btn = this.el.find('span');
            this.el.insertAfter(this.paginator);
        },
        //是否为第一页
        isFirstPage : function() {
            return this.currentNum == 1;
        },
        //是否为最后一页
        isLastPage : function() {
            return this.currentNum == this.maxNum;
        },

        loadPage : function() {
            var that = this,
                url = that.next.attr('href'),
                politic = this.loadPolitic();

            //最后一页或没有翻页策略时返回
            if(this.isLastPage() || typeof politic === 'undefined' || this.isLoading) return false;

            MonkeyBean.trigger('loadingStart');  //显示loading效果
            this.isLoading = true;

            $.ajax({
                url : url,
                success : function(resp) {
                    var tmpDiv = $('<div></div>'),
                        paginator,
                        content;
                    tmpDiv.html(resp);
                    content = tmpDiv.find(politic.content);
                    paginator = tmpDiv.find('div.paginator');
                    typeof politic.filter !== 'undefined' && content.find(politic.filter).replaceWith('');//过滤不必要的内容
                    eval(politic.method);
                    typeof politic.finish == 'function' && politic.finish(document);
                    tmpDiv = null;

                    //更新导航栏
                    that.paginator.html(paginator.html());
                    that.current = that.paginator.find('.thispage');   
                    that.currentNum = +that.current.text();
                    that.next = that.current.next(); 

                    that.isLastPage() && that.btn.text('已经是最后一页啦！');

                    MonkeyBean.trigger('loadPage').//触发loadPage事件
                               trigger('loadingStop');  //停止loading效果

                    that.isWorked = true;  //已经运行过翻页
                    that.preLink = url;
                    that.isLoading = false;
                },
                error : function() {
                    //显示错误提示
                    var pos = that.el.position();
                    MonkeyBean.TM.get('tip').show('出错啦！', {
                        'left' : pos.left + 200,
                        'top' : pos.top - 120
                    });
                    MonkeyBean.trigger('loadingStop');  //停止loading效果
                    that.isLoading = false;
                }
            });
        }
    });

    /**
     * 猴子箱——在个人链接上出现一个层，包含对该用户的快捷操作，例如用户的电影、读书、音乐等，还包括加关注和拉入黑名单等等。
     * 样式借鉴了知乎：www.zhihu.com
     * updateTime : 2012-3-17
     */
    MonkeyModule('MonkeyBox', {
        css : '#MonkeyBox {\
                  position : absolute;\
                  border-radius : 5px;\
            }\
            #MonkeyBox .xtb {\
                border: 1px solid #BBBBBB;\
            }\
            #xcd {\
                background: none repeat scroll 0 0 #FFFFFF;\
                width: 280px;\
            }\
            .xd {\
                border-radius : 5px;\
            }\
            .xye {\
                background: none repeat scroll 0 0 white;\
                border: 3px solid #F4F4F4;\
                padding: 10px;\
            }\
            .xsb {\
                line-height: 18px;\
                margin: 0 0 0 4px;\
            }\
            .xbd {\
                border-top: 1px solid #E9E9E9;\
                margin: 5px 0 0;\
                padding: 10px 0 0;\
            }\
            .xuv {\
                color: #999999 !important;\
                font-size: 12px;\
            }\
            .xjw {\
                border-radius: 3px 3px 3px 3px;\
                display: block;\
                font-size: 12px;\
                font-weight: normal;\
                line-height: 18px;\
                padding: 1px;\
                text-align: center;\
                text-decoration: none !important;\
                width: 52px;\
            }\
            .xiw {\
                background: -moz-linear-gradient(center top , #ADDA4D, #86B846) repeat scroll 0 0 transparent;\
                border: 1px solid #6D8F29;\
                box-shadow: 0 1px 0 rgba(255, 255, 255, 0.5) inset, 0 1px 0 rgba(0, 0, 0, 0.15);\
                color: #3E5E00 !important;\
                text-shadow: 0 1px 0 rgba(255, 255, 255, 0.3);\
            }\
            .xwv {\
                float: right;\
            }\
            .Monkey-Pointer {\
                position : absolute;\
                height : 0;\
                left : 50px;\
            }\
            .Monkey-Pointer-Border {\
                border: 9px solid;\
            }\
            .Monkey-a {\
                border-color: #BBBBBB transparent transparent;\
            }\
            .Monkey-b {\
                border-color: #FFFFFF transparent transparent;\
                top: -20px;\
                position : relative;\
            }',

        html : '<div id="MonkeyBox" style="left: 290px; top: 150.5px; display: none;z-index:10000;">\
                    <div class="xd xtb" id="xcd">\
                        <div class="xd xye">\
                            <div class="xsb">\
                            </div>\
                            <div class="xbd">\
                            </div>\
                        </div>\
                    </div>\
                    <div class="Monkey-Pointer">\
                        <div class="Monkey-a Monkey-Pointer-Border"></div>\
                        <div class="Monkey-b Monkey-Pointer-Border"></div>\
                    </div>\
                </div>',

        fit : function() {
            return true;
        },

        load : function() {
            var that = this;
            this.set({'text': '<h1>{name}</h1>\
                            <br>\
                            <span class="Monkey-Button"><a href="{prefix}notes">日记</a></span>\
                            <span class="Monkey-Button"><a href="{prefix}photos">相册</a></span>\
                            <span class="Monkey-Button"><a href="{prefix}favorites">喜欢</a></span>\
                            <span class="Monkey-Button"><a href="{prefix}miniblogs">广播</a></span>\
                            <span class="Monkey-Button"><a href="{prefix}doulists">豆列</a></span>',
                        'tool' : '<a class="xwv xuv" href="http://www.douban.com/doumail/write?to={nickname}">豆邮</a>\
                                   <a class="xjw xiw" data-focustype="people" name="focus" href="javascript:;">关注</a>'
            });
            this.people = /^http:\/\/(www|movie)\.douban\.com\/people\/([^/]+)\/$/;
            this.render();
            $(document).delegate('a', 'mouseenter', function(e) {
                var _this = this;
                clearTimeout(that.ID);
                that.ID = setTimeout(function() {
                    var a = $(_this);
                    if(that.people.test(_this.href) && a.find('img').length == 0) {
                        that.nickname = RegExp.$1;
                        that.url = _this.href;
                        that.show($(_this).offset(), _this.innerHTML);
                    }
                }, 500);

            });
            $(document).delegate('a', 'mouseleave', function(e) {
                if(that.people.test(this.href) && this.getElementsByTagName('img').length == 0) {
                    var flag = $.contains(that.box[0], e.relatedTarget);
                    clearTimeout(that.ID);
                    !flag && that.hide();
                }
            })
        },

        render : function() {
            var that = this;
            GM_addStyle(this.css);
            GM_addStyle(MonkeyBean.UI.css.button);
            this.box = $(this.html);
            this.text = this.box.find('.xsb');
            this.tool = this.box.find('.xbd');
            document.body.appendChild(this.box[0]);

            this.box.hover(function() {
                clearTimeout(that.ID);
                that.isShown = true;
            }, function() {
                that.hide();
            })
        },

        show : function(position, text) {
            var that = this;
            clearTimeout(this.ID);
            this.ID = setTimeout(function() {
                that.box.show();
                that.box.css({
                    'left' : position.left - 40 + 'px',
                    'top' : position.top - 160 + 'px'
                });
                that.text.html(that.get('text').replace('{name}', text).replace(/\{prefix\}/g, that.url));
                that.tool.html(that.get('tool').replace('{nickname}', that.nickname));
                that.isShown = true;
            }, 500);
        },

        hide : function() {
            if(!this.isShown) return;
            var that = this;
            clearTimeout(this.ID);
            this.ID = setTimeout(function() {
                that.box.fadeOut();
                that.isShown = false;
            }, 500);
        }
    });

    /**
     * 猴子小组模块——包括隐藏小组介绍、加入小组时的分类选择、小组分类
     * updateTime : 2012-2-27
     */
    MonkeyModule('MonkeyGroup', {
        css : {
            'sort' : '#Monkey-Group-Btn span {\
                        margin-right : 4px;\
                    }\
                    .Monkey-Group {\
                        border-radius : 5px;\
                    }\
                    .Monkey-Group .title{\
                        background-color : #e2e2e2;\
                        height : 20px;\
                        line-height : 20px;\
                        width : 100%;\
                        display: inline-block;\
                        vertical-align: middle;\
                    }\
                    .Monkey-Group .dissolve {\
                        float : right;\
                        border-radius : 15px;\
                        margin-right : 10px;\
                        cursor : pointer;\
                    }\
                    .Monkey-Group .dissolve:hover {\
                        background-color : #FF7676\
                    }'
        },

        html : {
            'toggle' : '<span class="Monkey-Button" monkey-action="MonkeyGroup.toggleGroupDescription" style="float:right;">\
                            显示小组介绍\
                         </span>',

            'sort' : '<div id="Monkey-Group-Btn">\
                            <span class="Monkey-Button" monkey-action="save" style="float:right;display:none;">\
                                保存分类\
                            </span>\
                            <span class="Monkey-Button" monkey-action="cancel" style="float:right;display:none;" title="放弃本次操作">\
                                放弃\
                            </span>\
                            <span class="Monkey-Button" monkey-action="modify" style="float:right;">\
                                修改分类\
                            </span>\
                            <span class="Monkey-Button" monkey-action="add" style="float:right;">\
                                添加分类\
                            </span>\
                       </div>',

            'groupArea' : '<div class="Monkey-GroupArea"></div>',

            'group' : ' <div class="Monkey-Group">\
                                <div class="title">\
                                    <span monkey-action="title">标题(双击修改)</span>\
                                    <input type="text" style="display:none;"/>\
                                    <span title="解散分组" class="dissolve" monkey-action="dissolve">x</span>\
                                </div>\
                                <div>拖拽小组图标到此区域</div>\
                        </div>'
        },

        fit : function() {
            var path = MonkeyBean.path,
                type = /www\.douban\.com\/group\/([^/]+)\/?$/,
                result = '';

            //小组分类
            if(path == 'www.douban.com/group/mine') {
                this.set('type', 'sort');
                return true;
            }
            //隐藏小组介绍信息
            if(type.test(path)) {
                this.set('type', 'toggle');
                return true;
            }
            return false;
        },

        load : function() {
            var type = this.get('type'),
                that = this;
            this.render(type);

            //初始化事件
            MonkeyBean.bind('MonkeyGroup.toggleGroupDescription', this.toggleGroupDescription, this);


            this.el.delegate('span[monkey-action]', 'click', function() {
                that[this.getAttribute('monkey-action')]();
            })
            //开始拖拽
            this.bind('begin', this.begin, this);
            //结束拖拽
            this.bind('end', this.end, this);
        },

        render : function(type) {
            var that = this;
            GM_addStyle(MonkeyBean.UI.css.button);

            if(type == 'toggle') {
                var el = $(this.html.toggle);
                $('div.article').prepend(el);
                this.description = $('div.article').find('div.bd');
                this.el = el;
                this.el.clicked = false;
                this.description.hide();
            } else {
                GM_addStyle(this.css.sort);

                var tmp = $('#content .article h2');
                this.el = $(this.html.sort);
                this.el.insertBefore(tmp);
                this.groupArea = $(this.html.groupArea); //用于放置分组区域
                this.groupArea.insertAfter(tmp);
                this.ungrouptArea = $('#content div.obssin dl'); //未分组区域
                this.group = $(this.html.group)[0]; //每一个分组，
            }

        },
        /**
         * 显示/隐藏小组介绍
         */
        toggleGroupDescription : function(e) {
            var flag = (this.el.clicked = !this.el.clicked);
            if(flag) {
                this.el.html('隐藏小组介绍');
                this.description.show();
            } else {
                this.el.html('显示小组介绍');
                this.description.hide();
            }
            return true;
        },

        begin : function() {
            this.isBegin = true;
            this.toggleSaveBtn(true);
            //使未分组区域中的每个dl可以拖拽
            this.ungrouptArea.attr('draggable', true);
            this.ungrouptArea.css('cursor', 'move');
            this.ungrouptArea.each(function() {
                this.ondragstart = function(e) {
                    e.dataTransfer.effectAllowed = 'copy'; // only dropEffect='copy' will be dropable
                    e.dataTransfer.setData('Text', this.id); // required otherwise doesn't work
                }
            })
        },

        end : function() {
            this.isBegin = false;
            this.toggleSaveBtn(false);
            this.ungrouptArea.attr('draggable', false);
            this.ungrouptArea.css('cursor', '');
            this.ungrouptArea.attr('ondragstart', null);
        },
        /**
         * 增加小组分类
         */
        add : function() {
            !this.isBegin && this.trigger('begin');
            var group = this.group.cloneNode(true);
            this.groupArea.append(group);
            return true;
        },

        /**
         * 修改小组分类
         */
        modify : function() {
            !this.isBegin && this.trigger('begin');
            return true;
        },
        /**
         * 放弃本次操作
         */
        cancel : function() {
            if(confirm('你确定放弃本次操作吗？')) {
                this.trigger('end', false);
            }
            return true;
        },

        /**
         * 保存小组分类
         */
        save : function() {
            this.trigger('end', false);
            return true;
        },
        /**
         * 修改分组标题
         */
        title : function() {

        },
        //显示/隐藏 保存按钮
        toggleSaveBtn : function(flag) {
            this.el.find('[monkey-action=cancel]')[flag ? 'show' : 'hide']();
            this.el.find('[monkey-action=save]')[flag ? 'show' : 'hide']();
        }
    });

    /**
     * 猴子邮件——在当前页面发送豆邮——有必要吗？不知道……
     */
    MonkeyModule('MonkeyMail', {
        //http://www.douban.com/doumail/write
        //ck    9P95
        //m_subject   
        //m_submit    好了，寄出去
        //m_text  
        //to  36785654
    });

    /**
     * 猴子搜索——多个网站的快捷搜索方式
     * updateTime : 2012-4-3
     */
    MonkeyModule('MonkeySearch', {
        css : '#MonkeySearch {\
                    position: relative;\
                }\
                #MonkeySearch span{\
                    display: inline-block;\
                    margin-bottom: 10px;\
               }\
               #MonkeySearchList {\
                    list-style: none;\
                    width: 180px;\
                    display: none;\
                    position: absolute;\
                    top: 22px;\
                    overflow: hidden;\
                    background-color: #fff;\
                    border-radius: 5px;\
                    border: 1px solid #CCCCCC;\
               }\
               #MonkeySearchList li {\
                    padding: 4px;\
                    border-radius: 5px;\
                    float: left;\
                    width: 50px;\
               }',

        html : '<div id="MonkeySearch">\
                    <span id="MonkeySearchBtn" class="Monkey-Button">\
                        网站搜索\
                    </span>\
                </div>',

        fit : function() {
            var type = MonkeyBean.page.type;
            return (type == 'book' || type == 'movie' || type == 'music') && MonkeyBean.path.indexOf('subject') != -1;
        },

        load : function() {
            var that = this;
            this.keyword = $('span[property=v:itemreviewed]').html();
            this.template = '<ul id="MonkeySearchList">\
                                <li><a href="http://www.google.com.hk/search?&q={word}">Google</a></li>\
                                <li><a href="http://www.baidu.com/s?ie=utf-8&wd={word}">百度一下</a></li>\
                                <li><a href="http://www.verycd.com/search/folders/{word}">VeryCD</a></li>\
                                <li><a href="http://zh.wikipedia.org/w/index.php?search={word}">维基百科</a></li>\
                                <li><a href="http://books.google.com/books?q={word}">谷歌书籍</a></li>\
                                <li><a href="http://shooter.cn/search/{word}">射手字幕</a></li>\
                                <li><a href="http://wenku.baidu.com/search?word={word}">百度文库</a></li>\
                                <li><a href="http://so.tudou.com/psearch/{word}">土豆豆单</a></li>\
                                <li><a href="http://www.douban.com/group/search?q={word}">百度文库</a></li>\
                                <li><a href="http://www.douban.com/group/search?q={word}">土豆豆单</a></li>\
                                <li><a href="http://so.tudou.com/isearch/{word}">土豆视频</a></li>\
                                <li><a href="http://so.youku.com/v?keyword={word}">优酷视频</a></li>\
                                <li><a href="http://so.youku.com/search_playlist/q_{word}">优酷列表</a></li>\
                                <li><a href="http://www.google.com.hk/search?&q=ed2k+{word}">ED2K</a></li>\
                                <li><a href="http://so.youku.com/v?keyword={word}">优酷视频</a></li>\
                            </ul>';
            this.render();
            $('#MonkeySearchBtn').hover(function() {
                clearTimeout(that.ID);
                !that.isShow && that.show();
            }, function() {
                that.ID = setTimeout(function(e) {
                    var flag = $.contains(that.el[0], e.relatedTarget);
                    clearTimeout(that.ID);
                    !flag && that.hide();
                }, 100);
            })
            this.list = $('#MonkeySearchList');
            this.list.hover(function() {
                clearTimeout(that.ID);
                that.isShown = true;
            }, function() {
                that.hide();
            })
        },

        render : function() {
            GM_addStyle(this.css);
            this.el = $(this.html);
            $('.aside').prepend(this.el);
            //var list = MonkeyBean.get('MonkeySearchList');
            this.el.append(this.template.replace(/\{word\}/g, this.keyword));
        },

        show : function() {
            var that = this;
            clearTimeout(this.ID);
            this.ID = setTimeout(function() {
                that.list.fadeIn();
                that.isShown = true;
            }, 100);
        },

        hide : function() {
            if(!this.isShown) return;
            var that = this;
            clearTimeout(this.ID);
            this.ID = setTimeout(function() {
                that.list.fadeOut();
                that.isShown = false;
            }, 100);
        }

    });

    //猴子爱问——代码来自于另外一个脚本：爱问共享资料豆瓣插件+，代码风格不统一，暂时不改了
    MonkeyModule('MonkeyIAsk', {
        'fit' : function() {
            var type = MonkeyBean.page.type;
            return (type == 'book' || type == 'movie' || type == 'music') && MonkeyBean.path.indexOf('subject') != -1;
        },

        load : function() {
            this.isakFunction();
        },

        isakFunction : function() {

            var title = $('html head title').text(),
                styleContent = '.douban_iask_format{overflow:hidden; font-size:12px; margin:-10px 0 2px;} ' +
                               '.douban_iask_format li{ float:left; margin:0 2px 0; padding:0 3px 0; border-radius:4px; border:1px solid #ccc; cursor:pointer;}' +
                               '.douban_iask_format li.check {background-color:#a8c598;}',
                keyword1 = title.replace( '(豆瓣)', '' ).trim(),
                keyword2 = encodeURIComponent( keyword1 ),
                formatLabel = '<ul class="douban_iask_format"><li class="check">全部</li><li>TXT</li><li>DOC</li><li>PDF</li><li>PPT</li><li>CHM</li><li>RAR</li><li>EXE</li></ul>',
                format = '',
                html_title = '<div class="da3" style="margin-bottom:0;padding-bottom:10px;overflow: hidden;"><dl><dt style="display:inline;"><img src="http://iask.com/favicon.ico" width="15px;" height="15px;" style="margin-bottom:-2px;" /> <b><a href="http://ishare.iask.sina.com.cn/?from=douban" target="_blank">爱问共享资料</a>推荐：</b></dt><a href="http://ishare.iask.sina.com.cn/upload/?from=douban" target="_blank">我要分享资料</a><dd>最大的中文在线资料分享站，数百万资料免费下载</dd></dl>' + formatLabel + '</div>',
                html_body_start = '<div class="indent" id="db-doulist-section" style="padding-left:5px;border:1px #F4F4EC solid;"><ul class="bs" style="clear:left;">',
                html_body_no = '<li>没有找到相关资料，<a href="http://ishare.iask.sina.com.cn/upload/?from=douban" title="资料上传" target="_blank"><b>立即上传</b></a>即可与豆友们分享！</li>',
                html_body_end = '</ul>',
                html_body_endmore = '<div style="text-align:right; padding:5px 10px 5px 0px;"><a href="http://api.iask.sina.com.cn/api/search2.php?key=' + keyword2 + '&from=douban&format=" target="_blank">更多&hellip;</a></div>',
                html_body_endend = '</div>',
                length = 30,
                unitname = new Array('Y','Z','E','P','T','G','M','K'),
                unitsize = new Array(1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024,1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024,1024 * 1024 * 1024 * 1024 * 1024 * 1024,1024 * 1024 * 1024 * 1024 * 1024,1024 * 1024 * 1024 * 1024,1024 * 1024 * 1024,1024 * 1024,1024);
            var iask = {
                format : '',
                url : 'http://api.iask.sina.com.cn/api/isharesearch.php?key=' + keyword2 + '&datatype=json&start=0&num=5&keycharset=utf8&format=',

                init : function() {
                    var that = this;
                    that.addStyle(styleContent);
                    $.ajax({
                        type : 'GET',
                        dataType : 'script',
                        url : that.url,
                        success : function() {
                            var result = unsafeWindow.iaskSearchResult;
                            if( result.sp.m > 0 ) {
                                var result = that.generate(result);
                                $(html_title + html_body_start + result + html_body_end + html_body_endmore + html_body_endend ).insertAfter($('#MonkeySearch'));
                                //$( '.aside' ).prepend( html_title + html_body_start + result + html_body_end + html_body_endmore + html_body_endend );
                                that.bindListener();
                                that.content = $('#db-doulist-section ul')[0];
                                that.contentP = that.content.parentNode;
                                that.checked = $('.douban_iask_format .check')[0];
                            } else {
                                $(html_title + html_body_start + html_body_no + html_body_end + html_body_endend).insertAfter($('#MonkeySearch'));
                                //$( '.aside' ).prepend( html_title + html_body_start + html_body_no + html_body_end + html_body_endend );
                            }
                        }
                    });
                },

                addStyle : function(style) {
                    var s = document.createElement('style');
                    s.type = 'text/css';
                    s.innerHTML = style;
                    document.getElementsByTagName('head')[0].appendChild(s);
                },

                bindListener : function() {
                    var that = this;
                    //绑定事件
                    $('.douban_iask_format').delegate('li', 'click', function(e) {
                        var tar = e.target;
                        that.format = tar.innerHTML == '全部' ? '' : tar.innerHTML;
                        if(that.checked != tar) {
                            that.checked.className = '';
                            that.checked = tar;
                            tar.className = 'check';
                        }
                        that.getContent(that.url + that.format);
                    });
                },

                generate : function(iaskSearchResult) {
                    var title,title2, image, filesize, url, unit, html_body_yes='';
                    var regex = /([A-Z\u0391-\uffe5])/g,
                        searchResult = iaskSearchResult.sp.result;

                    for( var resultIndex = 0,resultTotal = searchResult.length; resultIndex < resultTotal; resultIndex++) {
                         var result = searchResult[resultIndex];
                            title = result.title;
                            title2 = title.replace( regex, "$1*" );
                            ellipsis = title2.length > length ? '..' : '' ;
                            title2 = title2.substr( 0, length ).replace( /\*/g, '' ) + ellipsis;
                            image = result.format;
                            filesize = result.filesize;
                            if( filesize < 1024 ) filesize = filesize+'B';
                            for( var i=0; i<unitname.length; i++ ){
                                if( filesize > unitsize[i] || filesize==unitsize[i] ){
                                    filesize = Math.round( filesize / unitsize[i] * 10 ) / 10 + unitname[i];
                                }
                            }
                            url = result.url;
                            html_body_yes += '<li><img src="http://www.sinaimg.cn/pfp/ask/images/'
                                             + image + '.gif" style="margin-bottom:-2px;" /> <a href="' + url + '?from=douban" title="' + title + '" target="_blank">'
                                             + title2 + '</a><span class="pl">(大小:' + filesize + ' 积分:' + result.price + ')</span></li>';
                    }
                    return html_body_yes;
                },

                getContent : function(url) {
                    var that = this;
                    $.ajax({
                        type : 'GET',
                        dataType : 'script',
                        url : url,
                        success : function() {
                            if( iaskSearchResult.sp.m > 0 ) {
                                var result = that.generate(iaskSearchResult);
                                that.contentP.style.display = 'block';
                                that.content.innerHTML = '';
                                that.content.innerHTML = result;
                            } else {
                                that.content.innerHTML = html_body_no;
                            }
                        }
                    });
                }
            };
            iask.init();
        }
    });

    /**
     * 猴子底部工具栏——提供回到顶部、回到底部等功能
     * updateTime : 2012-3-13
     */
    MonkeyModule('MonkeyBottomToolbar', {
        css : '#MonkeyBottomToolbar {\
                    position : fixed;\
                    bottom : -1px;\
                    right : 50px;\
                    height : 25px;\
                    width : 100%;\
               }\
               #MonkeyBottomToolbar .Monkey-Button {\
                    display : inline-block;\
                    width : 40px;\
                    height : 25px;\
                    line-height : 25px;\
                    text-align : center;\
                    float : right;\
               }',

        html : '<div id="MonkeyBottomToolbar">\
                    <!--span class="Monkey-Button">广播</span-->\
                    <span class="Monkey-Button" monkey-action="GoDown" title="回到底部">向下</span>\
                    <span class="Monkey-Button" monkey-action="GoUp" title="回到顶部">向上</span>\
                </div>',

        fit : function() {
            return MonkeyBean.page.type != 'fm';
        },

        load : function() {
            var that = this;
            this.render();

            MonkeyBean.bind('GoUp', function() {
                unsafeWindow.scrollTo(0, 0);
            })
            MonkeyBean.bind('GoDown', function() {
                unsafeWindow.scrollTo(0, document.documentElement.scrollHeight);
            })
        },

        render : function() {
            GM_addStyle(this.css);
            GM_addStyle(MonkeyBean.UI.css.button);
            this.el = $(this.html);
            $(document.body).append(this.el);
        }
    });

    /**
     *  猴子FM，豆瓣FM的下载、播放列表功能
     *  updateTime : 2012-3-13
     */
    MonkeyModule('MonkeyFM', {
        css : '',

        html : '<div>\
                </div>',

        fit : function() {
            return MonkeyBean.page.type == 'fm'
        },

        load : function() {
            var that = this,
                fm_js = /http:\/\/\w+\.douban\.com\/js\/radio\/packed_fm_player\d+\.js/;

            $(document.head).on('DOMNodeInserted', function(e) {
                if(fm_js.test(e.target.src)) {                  //判断js是否加载
                    setTimeout(function() {
                        eval('\
                            unsafeWindow._extStatusHandler = unsafeWindow.extStatusHandler;\
                            log(unsafeWindow.extStatusHandler);\
                            unsafeWindow.extStatusHandler = function(o) {\
                                unsafeWindow._extStatusHandler(o);\
                                that.fm(o);\
                        }')
                    }, 1000)
                }
            })
        },

        fm : function(o) {
            o = eval('(' + o + ')');
            console.dir(o);
            log('--------------------------------------------');
        }
    });

    /**
     * 猴子杂货铺——这些功能不知道怎么分类，暂时扔在这里
     * updateTime : 2012-3-18
     */
    MonkeyModule('MonkeyGroceries', {
        load : function() {
            log('aaa');
            var discussion = /subject\/\d+\/discussion\/\d+/;
            log('------' + MonkeyBean.page.turnType);
            //为电影、书籍的讨论页面增加回到电影/书籍的链接
            if(MonkeyBean.page.turnType == 'discussion') {
                if(discussion.test(MonkeyBean.path)) {
                    var el = $('div.aside p.pl2'),
                        a = el.find('a'),
                        str = el.html();
                    el.html(str + '</br></br>&gt; <a href="' + a.attr('href').replace('discussion/', '') + '">去' + a.text().match(/去(.*)的论坛/)[1] + '的页面</a>')
                }
            }
        }
    });

    /*********************************Module end**************************************************************/

    log('test debug Mode');

    MonkeyBean.init();

    log(((new Date()) - startTime)/1000 + '秒');
})(window, unsafeWindow.$)