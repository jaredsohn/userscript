// vim: fdm=marker
// ==UserScript==
// @name           Douban Helper
// @namespace      http://leechael.org/plugins/douban-helper
// @include        http://www.douban.com/*
// @include        http://douban.com/*
// @exclude        http://9.douban.com/*
// ==/UserScript==

var bean = {};

// {{{ class: bean.config
/**
 * All your settings storage here. You can modify by you own to fit you
 * need. For example, enable or disable a feature specially.
 * 
 * All options limited to true or false except it had note its range.
 */

bean.config = {

    /**
     * Enable wrapper means:
     * - Enable all built-in features. (except you disable them in
     *   following settings.
     * - GreaseMonkey scripts for douban.com can be add a new feature
     *   quickly by bean.addWrapper().
     */
    enableWrapper   : true,

    /**
     * Hot keys is supports, but limited to shift + <key> (or using
     * ctrl instead of shift, you can set the option below).
     */
    enableHotKey    : true,

    /**
     * Console is the most important feature what Douban Helper had,
     * you can show or hide by click an switcher on toolbar, using
     * hot key like shift + ; or shift + / (vim-like) if you hadn't
     * disable hot key before.
     */
    enableConsole   : true,

    /**
     * Using graphic characters as console switcher.
     */
    useShortConsoleSwitcher : false,

    /**
     * If hot key shift + <key> has been defined as hot key for other 
     * applications, or it's a system shortcut already, try turn on
     * this options. If problem hasn't be solved after turn it on, what
     * you can do is just disable hot key.
     */
    useCtrlInsteadOfShift   : false,

    /**
     * When you hover on stick, sidebar will be auto show.
     */
    showSidebarAtHover      : false,

    /**
     * Auto expanding albums.
     */
    autoExpandAlbum         : false,

};

// }}}
// {{{ properties

bean.version = '0.3';
bean.debug   = false;

bean.bindedKey = {},

// }}}
// {{{ class: bean.utils

bean.utils = {
    // {{{ and (list, fn)

    and : function (list, fn)
    {
        var i = list.length, j = 0;
        while (j < i)
        {
            if (fn.call(null, list[j]) == false)
            {
                return false;
            }
            j++;
        }
        return true;
    },

    // }}}
    // {{{ filter (list, fn)
    /**
     * @param   Array | Object  list
     * @param   Function        fn
     * @return  Array
     */
    
    filter : function (list, fn)
    {
        var i = list.length, j = 0, rs = [];
        while (j < i)
        {
            if (fn.call(null, list[j]))
            {
                rs.push(list[j]);
            }
            j++;
        }
        return rs;
    },

    // }}}
    // {{{ existsElement (id)
    /**
     * @param   String  id
     * @return  Boolean | Object
     */

    existsElement : function (id)
    {
        return (document.getElementById(id) == null) ?
                false :
                document.getElementById(id);
    },

    // }}}
    // {{{ isChar (keyCode)

    isChar : function (keyCode)
    {
        var _tmp = String.fromCharCode(keyCode);
        if (/^[\w-]$/i.test(_tmp))
        {
            return _tmp;
        }
        return false;
    },

    // }}}
    // {{{ testScope (scope)

    testScope: function (scope)
    {
        if (typeof scope == 'function')
        {
            if (!scope.call(bean.url))
            {
                return false;
            }
        } else {
            if (typeof scope.test == 'function')
            {
                if (!bean.url.match(scope))
                {
                    return false;
                }
            } else {
                if (scope !== true)
                {
                    return false;
                }
            }
        }
        return true;
    },

    // }}}
}

// }}}
// {{{ class: bean.key

bean.key = {
    ESC             : 27,
    ENTER           : 13,
    SPACE           : 32,
    BACKSPACE       : 8,
    LEFT            : 37,
    UP              : 38,
    RIGHT           : 39,
    DOWN            : 40,
    SEMICOLON       : 59,
    SLASH           : 191,
    QUESTION_MARK   : 63,
    COLON           : 58,
    PERIOD          : 46,
    COMMA           : 44,
    QUOTATION_MARK  : 39,
}

// }}}
// {{{ class: bean.cmd

bean.cmd = {
    // {{{ properties

    // messages.
    defConsoleShowMsg :     '显示控制台',
    defConsoleHideMsg :     '隐藏控制台',
    shortConsoleShowMsg :   '●',
    shortConsoleHideMsg :   '○',

    defCommandHelp : '查阅可用的命令列表请键入 <strong>:help</strong> 或 '
                    + '<strong>:h</strong>。',
    defSearchHelp :  '在豆瓣全站范围内搜索含关键字 <em>keywords</em> 的条目。',
    undefinedCmd : '该命令不存在，键入 <strong>:help</strong> 或 <strong>:h'
                    + '</strong> 可查看可用的命令列表。',
    avoidMode : '请以 <strong>:</strong> 切入命令模式或 <strong>?'
                       + '</strong> 切入查询模式。',

    // true for console is hidden, false for opened.
    isHidden : true,
    
    // turn to off when command complete.
    isAutoMatch : true,

    // console elements
    console : {},
    input : {},
    switcher : {},
    displayer : {},

    // command index
    commonCmdIdx : [],
    commonCmds   : {},
    searchCmdIdx : [],
    searchCmds   : {},

    // }}}
    // {{{ init ()

    init: function ()
    {
        $('body').append($(['<div id="dh_console">'
                         + '<div id="dh_console_bar"><span>X</span>'
                         + '</div>'
                         + '<textarea id="dh_console_input">'
                         + '</textarea>'
                         + '<div id="dh_console_display">'
                         + this.defCommandHelp + '</div>'
                         + '</div>'].join('')));
        this.console = $('#dh_console');
        this.input = $('#dh_console_input');
        this.displayer = $('#dh_console_display');

        var _swap = bean.config.useShortConsoleSwitcher
                    ? this.shortConsoleShowMsg
                    : this.defConsoleShowMsg;
        this.switcher = $('<a id="dh_console_switcher">' + _swap + '</a>')
        this.switcher.insertAfter('#status a:last');
        this.switcher.click(function ()
        {
            var cmd = bean.cmd;
            cmd.isHidden ? cmd.show() : cmd.hide();
            return false;
        });

        $('#dh_console_bar span').click(function ()
        {
            bean.cmd.hide();
        });

        this.setStyle();
        this.setDefaultCommand();
    },

    // }}}
    // {{{ show ()

    show : function ()
    {
        if (!this.isHidden)
        {
            return;
        }
        var _resizeEvent = this.updateSize;
        var _hideEvent   = this._hideByEsc;
        var _deamon      = this.deamon;

        this.isHidden = false;
        this.updateSize();
        this.console.css('visibility', 'visible')
                    .css('position', 'fixed')
                    .css('height', 'auto');
        window.addEventListener('resize', _resizeEvent, false);

        this.switcher.text(bean.config.useShortConsoleSwitcher
                            ? this.shortConsoleHideMsg
                            : this.defConsoleHideMsg);
        this.input.val('');
        this.input.focus();
        unsafeWindow.document
                    .getElementById('dh_console_input')
                    .addEventListener('keypress', _deamon, false);
        bean.utils
            .existsElement('dh_console')
            .addEventListener('keypress', _hideEvent, false);
        this.autoMatching = true;
    },

    // }}}
    // {{{ hide ()

    hide : function ()
    {
        if (this.isHidden)
        {
            return false;
        }
        var _hideEvent   = this._hideByEsc;
        var _deamon      = this.deamon;
        var _resizeEvent = this.updateSize;

        this.isHidden = true;
        this.console.css('visibility', 'hidden')
                    .css('position', 'static')
                    .css('height', '0');
        this.switcher.text(bean.config.useShortConsoleSwitcher
            ? this.shortConsoleShowMsg
            : this.defConsoleShowMsg);
        bean.utils
            .existsElement('dh_console')
            .removeEventListener('keypress', _hideEvent, true);
        this.input.blur();
        unsafeWindow.document
                    .getElementById('dh_console_input')
                    .removeEventListener('keypress', _deamon, false);
        window.removeEventListener('resize', _resizeEvent, false);
    },

    // }}}
    // {{{ _hideByEsc (e)

    _hideByEsc : function (e)
    {
        if (e.keyCode == bean.key.ESC)
        {
            bean.cmd.hide();
        }
    },

    // }}}
    // {{{ updateSize ()

    updateSize: function ()
    {
        this.console.css('left', (window.innerWidth - 500) / 2 + 'px');
    },

    // }}}
    // {{{ deamon (e)
    /**
     * deamon for user input.
     */

    deamon : function (e)
    {
        var cmd = bean.cmd, key = bean.key;
        if (e.keyCode == key.ENTER)
        {
            e.preventDefault();
            if (cmd.parse())
            {
                cmd.isAutoMatch = false;
                cmd.input.val('');
            }
        }
        if (e.keyCode == key.UP
            || e.keyCode == key.DOWN)
        {
            e.preventDefault();
        }

        /*
        if (e.keyCode == key.SPACE)
        {
        }
        */

        /**
         * Check the input and auto find out all commend may be fit
         * what user want. We call this feature suggesting.
         */
        if (!cmd.isAutoMatch && cmd.input.val().length < 1)
        {
            return;
        }
        cmd.displayer.css('overflow-y', 'hidden');
        
        var _c = bean.utils.isChar(e.which);
        if (e.which == key.BACKSPACE)
        {
            _c = cmd.input.val().slice(0, -1);
        } else {
            _c = cmd.input.val() + (_c !== false ? _c : '');
        }
        if (cmd.input.val().length < 1)
        {
            switch (e.which)
            {
                case key.QUESTION_MARK:
                    _c = '?';
                    break;

                case key.COLON:
                    _c = ':';
                    break;

                default:
                    return;
            }
        }
        if (_c !== false)
        {
            var _msg = cmd.guessCommand(_c);
            if (_msg !== false)
            {
                cmd.display(_msg);
            }
        }
    },

    // }}}
    // {{{ guessCommand (input)

    guessCommand : function (input)
    {
        var _m = input[0], _rest = input.substr(1), _len = _rest.length;
        var _suggestions, _commands, _args, _template;

        if (input.length <= 1)
        {
            /**
             * User has type in only one character, colon and question
             * with be show the relative help without suggestion.
             * Other character user types in and puts it at first, will
             * got a avoid mode message.
             */
            if (_m == '?')
            {
                return this.defSearchHelp;
            } else if (_m == ':' || input.length == 0) {
                return this.defCommandHelp;
            } else {
                return this.avoidMode;
            }
            return;
        } else if (_m == '?') {
            // Query Mode.
            if (input.length == 1)
            {
                return bean.cmd.defSearchHelp;
            }
            _suggestions = this.searchCmdIdx;
            _commands    = this.searchCmds;
            _template    = ' [keywords]';
        } else if (_m == ':') {
            // Command Mode.
            _suggestions = this.commonCmdIdx;
            _commands    = this.commonCmds;
            _template    = '';
        } else {
            /**
             * User has been type in something, and the first
             * character neither colon nor question mark. So 
             * he/her got the aoid mode message again.
             */
            return false;
        }

        // Do searching here.
        for (var i = 0; i < _len; ++i)
        {
            var _c = _rest[i];
            _suggestions = bean.utils.filter(_suggestions, function (val)
            {
                return (val[i] == _c) ? true : false;
            });
        }
        // If no command match, no suggestion will be display.
        if (_suggestions.length < 1)
        {
            return this.undefinedCmd;
        }

        // Take five suggestions fit input well, then list to user.
        _suggestions.sort();
        _suggestions = _suggestions.slice(0, 5);
        var _i = ['</dl>'];
        var _j = _suggestions.length - 1, _n, _tmp;
        while (_j > 0)
        {
            _n   = _suggestions[_j--];
            var _nameSwap = (_commands[_n].isShortcut)
                ? _commands[_n].shortcut
                : _commands[_n].name;
            _tmp = '<dt><strong>'
                    + _m
                    + _nameSwap
                    + '</strong>'
                    + _template
                    + '</dt><dd>'
                    + _commands[_n].description
                    + '</dd>';
            _i.push(_tmp);
        }
        _n   = _suggestions[0];
        _tmp = '<dt id="dh_suggest_fst"><strong>'
                + _m
                + _commands[_n].name
                + '</strong>'
                + _template
                + '</dt><dd>'
                + _commands[_n].description
                + '</dd>';
        _i.push(_tmp);
        _i.push('<dl>');
        _i.reverse();
        return _i.join('');
    },

    // }}}
    // {{{ parse ()

    parse : function ()
    {
        var input = this.input.val();
        var _t = (input.indexOf(' ') == -1)
                    ? input.length
                    : input.indexOf(' ');
        var _m = input[0], _cmd = $.trim(input.substr(1, _t));
        var _rest = input.substr(_t);
        var _fn;

        if (_m == ':')
        {
            if (typeof this.commonCmds[_cmd] == 'undefined')
            {
                this.display(this.undefinedCmd);
                return false;
            }
            _fn = this.commonCmds[_cmd];
        } else if (_m == '?') {
            if (typeof this.searchCmds[_cmd] == 'undefined')
            {
                _rest = encodeURIComponent($.trim(input.substr(1)));
                window.location = 'http://www.douban.com/subject_search?'
                                  + 'search_text='
                                  + _rest;
                return true;
            }
            _fn = this.searchCmds[_cmd];
        } else {
            this.display(this.avoidMode);
            return false;
        }
        _fn.execute.call(_fn, $.trim(_rest));
        if (_fn.hideConsoleAfterExecute === true)
        {
            this.hide();
        }
        return true;
    },

    // }}}
    // {{{ display (msg)

    display : function (msg)
    {
        this.displayer.html(msg);
    },

    // }}}
    // {{{ setStyle ()

    setStyle : function ()
    {
        var _style = [
            '#dh_console_switcher {',
                'cursor: pointer;',
            '}',
            '#dh_stick {',
                'width: 5px;',
                'float: left;',
                'cursor: pointer;',
                'background-color: #F9F9F9;',
                '-moz-border-radius: 4px',
            '}',
            '#dh_stick:hover {',
                'background-color: #DADADA;',
            '}',
            '#dh_console {',
                'width: 500px;',
                'height: 0;',
                'max-height: 320px;',
                'position: static;',
                'top: 26%;',
                'z-index: 99;',
                'visibility: hidden;',
                'text-align: center;',
                'color: #FFF;',
            '}',
            '#dh_help {',
                'height: 300px;',
                'position: fixed;',
                'left: 30%;',
                'z-index: 98;',
                'visibility: visible;',
                'overflow-y: scroll;',
                '-moz-border-radius-topleft: 5px;',
                '-moz-border-radius-topright: 5px;',
                'background-color: rgba(80, 80, 80, 0.75);',
                'text-align: left;',
            '}',
            '#dh_console_bar {',
                'margin: 0;',
                'padding: 7px 10px 0;',
                'text-align: right;',
                '-moz-border-radius-topleft: 5px;',
                '-moz-border-radius-topright: 5px;',
                'background-color: rgba(80, 80, 80, 0.75);',
            '}',
            '#dh_console_bar span {',
                'cursor: pointer;',
                'font-weight: bolder;',
            '}',
            '#dh_console_display {',
                'max-height: 280px;',
                'margin: 0;',
                'padding: 5px 10px 7px;',
                'text-align: left;',
                'font-size: 14px;',
                'line-height: 1.5em;',
                '-moz-border-radius-bottomleft: 5px;',
                '-moz-border-radius-bottomright: 5px;',
                'background-color: rgba(80, 80, 80, 0.75);',
            '}',
            '#dh_console_display dl {',
                'margin: 0;',
                'padding-top: 3px;',
                'padding-bottom: 7px;',
            '}',
            '#dh_console_display h4 {',
                'margin: 10px 0 3px;',
                'padding: 4px 20px;',
                'background: none;',
                'background-color: #A0A0A0;',
                'height: auto;',
                'font-weight: bold;',
                'line-height: 1.4em;',
                'font-size: 16px;',
            '}',
            '#dh_console_display dt {',
                'margin: 3px 10px 0;',
                'font-size: 16px',
            '}',
            '#dh_console_display dd {',
                'margin: 0 10px 0; ',
            '}',
            '#dh_console_display dt strong {',
                'color: #FF3',
            '}',
            '#dh_console_input {',
                'width: 480px;',
                'height: 1.4em;',
                'margin: 0;',
                'padding: 0 10px;',
                'line-height: 1.3em;',
                'font-family: monaco, verdana, sans-serif;',
                'background-color: #7F7F7F;',
                'color: #FFF;',
                'border: none;',
                'border-top: 1px solid #888;',
                'border-bottom: 1px solid #909090;',
            '}',
            '#dh_overlay {',
                'height: 100%;',
                'width: 100%;',
                'position: fixed;',
                'z-index: 30;',
                'top: 0;',
                'left: 0;',
                'background-color: rgba(180, 180, 180, 0.8);',
                'text-align: center;',
                'padding-top: 20px;',
            '}',
        ];
        $('head').append('<style>' + _style.join("\n") + '</style>');
    },

    // }}}
    // {{{ setDefaultCommand ()

    setDefaultCommand : function ()
    {
        var s = function (name, desc, path, param)
        {
            var cmd = {};
            cmd['scope']        = true;
            cmd['name']         = name;
            cmd['isSearchMode'] = true;
            cmd['description']  = '搜索关键字含有 [keywords] 的' + desc + '。';
            cmd['execute']      = function (keywords)
            {
                window.location = 'http://www.douban.com'
                        + path
                        + encodeURIComponent(keywords)
                        + param;
                return true;
            };
            bean.createCommand(cmd);
        }
        s('book', '书籍', '/subject_search?search_text=', '&cat=1001');
        s('movie', '电影/电视剧', '/subject_search?search_text=', '&cat=1002');
        s('music', '音乐专辑', '/subject_search?search_text=', '&cat=1003');
        s('blog', '网志博客', '/subject_search?search_text=', '&cat=1010');
        s('group', '小组', '/group/search?search_text=', '');
        s('topic', '主题', '/group/topic_search?q=', '');
        s('user', '用户', '/people_search?search_text=', '');
        s('event', '活动', '/event/search?loc=all&search_text=', '');

        var c = function (name, desc, path, shortcut)
        {
            var cmd = {};
            cmd['scope']        = true;
            cmd['name']         = name;
            cmd['description']  = desc;
            if (typeof shortcut != 'undefined')
            {
                cmd['shortcut'] = shortcut;
            }
            cmd['execute']      = function (keywords)
            {
                window.location = 'http://www.douban.com' + path;
                return true;
            };
            bean.createCommand(cmd);
        }
        c('logout', '退出登录。', '/logout' , 'q');
        c('settings', '转到个人设置界面。', '/settings/');
        c('diary', '转到日记撰写界面。', '/note/create');
        c('mail', '查看站内邮件。', '/doumail/');
        c('plaza', '转到广场列表。', '/plaza/all');
        c('book', '转到我的书。', '/book/mine');
        c('movie', '转到我的电影。', '/movie/mine');
        c('music', '转到我的音乐。', '/music/mine');
        c('group', '转到我的小组列表。', '/group/mine');

        bean.createCommand({
            scope: true,
            name : 'help',
            shortcut : 'h',
            description : '列出当前页面中所有可用的命令及说明。',
            hideConsoleAfterExecute : false,
            execute : function ()
            {
                var src = ['<dl>', '<h4>命令模式</h4>'], c;
                var cmd = bean.cmd;
                for (var i in cmd.commonCmds)
                {
                    c = cmd.commonCmds[i];
                    if (i == c.shortcut)
                    {
                        continue;
                    }
                    src.push('<dt><strong>:'
                             + c.name
                             + '</strong>'
                             + ((c.shortcut == '')
                                ? ''
                                : ', <strong>' + c.shortcut + '</strong>')
                             + '</dt><dd>'
                             + c.description
                             + '</dd>');
                }
                src.push('<h4>查询模式</h4>');
                for (var i in cmd.searchCmds)
                {
                    c = cmd.searchCmds[i];
                    if (i == c.shortcut)
                    {
                        continue;
                    }
                    src.push('<dt><strong>?'
                             + c.name
                             + '</strong>'
                             + ((c.shortcut == '')
                                ? ''
                                : ', <strong>' + c.shortcut + '</strong>')
                             + '</dt><dd>'
                             + c.description
                             + '</dd>');
                }
                src.push('</dl>');
                var _b = $('<div>' + src.join('') + '</div>');
                _b.css('overflow-y', 'scroll')
                  .css('margin', '0 4px 10px')
                  .css('height', '240px');
                bean.cmd.display(_b);
            },
        });
    },

    // }}}
}

// }}}
// {{{ function: bean.addWrapper(options)
/**
 * @param   regex | function    scope
 *          If it's a function, require return a boolean value.
 * @param   function            wrap
 * @param   boolean             hideSidebar
 * @param   function            showEvent
 *          Call when sidebar is show.
 * @param   function            hideEvent
 *          Call when sidebar is hide.
 *
 * // -- using following options to add as command.
 *
 * @param   string              name
 * @param   boolean             isSearchMode
 * @param   boolean             hideConsoleAfterExecute
 * @param   string              shortcut
 * @param   function            execute
 * @param   string              description
 * @param   function            preview
 *
 * @return  boolean
 *
 * @TODO auto hide sidebar has bug, so disable this feature here.
 */

bean.addWrapper = function (options)
{
    // bind options.
    options = $.extend({
        scope           :   '',
        //hideSidebar     :   false,
        showEvent       :   null,
        hideEvent       :   null,
        wrap            :   null,
    }, options);
    if (this.utils.testScope(options.scope) === false)
    {
        return false;
    }
    bean.createCommand(options);
    
    if (typeof options.wrap == 'function')
    {
        options.wrap.call(options);
    }

    if (bean.utils.existsElement('dh_stick') !== false)
    {
        return true;
    }
    
    /**
     * Base on Douban's default style, make out the sidebar hidden
     * switcher.
     */
    var _main, _side, _main_width, _side_width, _container, _container_width;
    var _stick = $('<div id="dh_stick"></div>');
    var _hidden = false;
    if (this.utils.existsElement('table'))
    {
        _main            = $('#table');
        _side            = $('#tabler');
        _container_width = 345;
    }
    else if (this.utils.existsElement('tablem'))
    {
        _main            = $('#tablem');
        _side            = $('#tablerm');
        _container_width = 270;
    } else {
        return false;
    }
    _container  = _main.children();
    _side_width = parseInt(_side.css('width'));
    _side.css('width', _side_width - 10 + 'px');
    _stick.insertAfter(_main);
    _stick.css('height', _side.css('height'));

    var _toggle = function ()
    {
        if (_hidden == true)
        {
            _hidden = false;
            _side.show();
            _side.css('width', _side_width - 10 + 'px');
            _main.css('margin-right', '-' + _side_width + 'px');
            _container.css('margin-right', _side_width + 10 + 'px');
            _updateStickHeight.call();
            if (typeof options.showEvent == 'function')
            {
                options.showEvent.call();
            }
        } else {
            _hidden = true;
            _side.hide();
            _side.css('width', '0');
            _main.css('margin-right', '-10px');
            _container.css('margin-right', '0');
            _updateStickHeight.call();
            if (typeof options.hideEvent == 'function')
            {
                options.hideEvent.call();
            }
        }
    }

    /*
    if (options.hideSidebar)
    {
        _toggle();
    }
    */
    _stick.click(_toggle);
    
    if (bean.config.showSidebarAtHover)
    {
        _stick.hover(function ()
        {
            if (_hidden == true)
            {
                _toggle();
            }
        }, function()
        {
        });
    }
    return true;
}

// }}}
// {{{ function: bean.createCommand (options)
/**
 * @param   regex | function    scope
 *          If it's a function, require return a boolean value.
 * @param   string              name
 * @param   boolean             isSearchMode
 * @param   boolean             hideConsoleAfterExecute
 * @param   string              shortcut
 * @param   function            execute
 * @param   string              description
 * @param   function            preview
 *
 * @return  boolean
 */

bean.createCommand = function (options)
{
    if (!this.config.enableConsole)
    {
        return false;
    }
    options = $.extend({
            scope           : '',
            name            : '',
            isSearchMode    : false,
            hideConsoleAfterExecute : true,
            shortcut        : '',
            execute         : null,
            description     : '',
            preview         : null,
        }, options);
    if (options.name == ''
        || typeof options.execute != 'function'
        || options.description == '')
    {
        return false;
    }
    if (this.utils.testScope(options.scope) === false)
    {
        return false;
    }

    var cmd = this.cmd;
    if (!options.isSearchMode)
    {
       // :command
       if (typeof cmd.commonCmds[options.name] == 'undefined'
           || (options.shortcut != ''
               && typeof cmd.commonCmds[options.shortcut] == 'undefined'))
       {
           cmd.commonCmdIdx.push(options.name);
           cmd.commonCmds[options.name] = options;
           if (options.shortcut != '')
           {
               cmd.commonCmdIdx.push(options.shortcut);
               cmd.commonCmds[options.shortcut] = options;
               cmd.commonCmds[options.shortcut].isShortcut = true;
           }
       } else {
           return false;
       }
    } else {
        // ?command
        if (typeof cmd.searchCmds[options.name] == 'undefined'
            || (options.shortcut != ''
                && typeof cmd.searchCmds[options.shortcut] == 'undefined'))
        {
            cmd.searchCmdIdx.push(options.name);
            cmd.searchCmds[options.name] = options;
            if (options.shortcut != '')
            {
                cmd.searchCmdIdx.push(options.shortcut);
                cmd.searchCmds[options.shortcut] = options;
            }
        } else {
            return false;
        }
    }
    return true;
}

// }}}
// {{{ function: bean.addHotKey (key, fn, looseInTextBox)
/**
 *
 */

bean.addHotKey = function (key, fn, looseInTextBox)
{
    if (!bean.config.enableHotKey
        || typeof bean.bindedKey[key] != 'undefined')
    {
        return false;
    }
    bean.bindedKey[key] = fn;
    $(window).keydown(function (e)
    {
        var _tn = e.target.tagName.toLowerCase();
        if ((typeof looseInTextBox == 'undefined'
             || looseInTextBox == true)
            && (_tn == 'input' || _tn == 'textarea'))
        {
            return;
        }
        var _soc = bean.config.useCtrlInsteadOfShift ? e.ctrlKey : e.shiftKey;
        if (_soc)
        {
            for (i in bean.bindedKey)
            {
                if (e.which == i)
                {
                    bean.bindedKey[i].call();
                }
            }
        }
    });
}

// }}}
// {{{ function: bean.init ()
/**
 *
 */

bean.init = function ()
{
    /**
     * Bind jQuery to window.$
     */
    if (typeof unsafeWindow.jQuery == 'undefined')
    {
       window.setTimeout(function ()
       {
           bean.init();
       }, 100);
       return;
    } else {
       window.$ = unsafeWindow.jQuery;
    }

    /**
     * When debug is on, bind firebug console to
     * window.console, otherwise, make a mock object.
     */
    this.console = (this.debug &&
                    typeof unsafeWindow.console != 'undefined') ?
                        unsafeWindow.console :
                        {};
         
    /**
     * Bind to current window, so we can using this
     * in Firebug.
     */
    if (typeof unsafeWindow.bean == 'undefined')
    {
        unsafeWindow.bean = bean;
    }

    /**
     * Sets up url arguments. Public access.
     */
    this.url = {
        path    :   '',
        args    :   {},
        match   :   function ()
        {
            return (arguments.length < 1) ?
                    false :
                    (bean.utils.and(arguments, function (regex)
                    {
                        return regex.test(bean.url.path) ?
                            true :
                            false;
                    }));
        },
        is9dot  :   function ()
        {
            return (window.location.host.substr(0,2) == '9.');
        },
    };
    this.url.path = window.location.pathname.substr(1);
    if (window.location.search != '')
    {
        $.each(window.location.search.substr(1).split('&'), function ()
        {
            var swap = this.split('=');
            bean.url.args[swap[0]] = swap[1];
        });
    }

    // Init console.
    if (this.config.enableConsole)
    {
        this.cmd.init();
        var _showEvent = function ()
        {
            bean.cmd.show();
        }
        if (this.config.enableHotKey)
        {
            this.addHotKey(bean.key.SEMICOLON, _showEvent);
            this.addHotKey(bean.key.SLASH, _showEvent);
        }
    }
}

// }}}
bean.init();
// {{{ wrapper: album expander

bean.addWrapper({
    // {{{ bind to command 'toggle'

    name : 'toggle',
    execute: function ()
    {
        this._toggle();
    },
    description: '切换相册图片的显示方式：大图/缩略图。',

    // }}}
    // {{{ _toggle ()

    _toggle : function ()
    {
        var button  = $('#dh_expander');
        var _isExpanded = true, _css = {}, _cssDiv = {};
        var _replace = function (isExpended)
        {
            return isExpended ?
                function (src)
                {
                    return src.replace(/photo\/photo/, 'photo/thumb');
                } :
                function (src)
                {
                    return src.replace(/thumb/, 'photo');
                };
        }
        if (button.attr('href') == '#expand')
        {
           button.text('收缩为小图')
                      .attr('href', '#unexpand');
           _css = {'float':'none',
                   'width':'auto',
                   'clear':'both',
                   'padding-top':'8px'
                  };
           _cssDiv = {'width':'100%',
                      'padding-bottom' : '7px',
                      'border-bottom':'1px solid #DDD'
                     };
           var _r = _replace(false);
        } else if (button.attr('href') == '#unexpand') {
           button.text('展开为大图')
                      .attr('href', '#expand');
            _css = {'float':'left',
                    'width':'163px',
                    'clear':'none',
                    'padding-top':'0'
                   };
            _cssDiv = {'width':'auto',
                       'padding-bottom' : 'auto',
                       'border-bottom':'none'
                      };
            var _r = _replace(true);
        }
        $('.photo_wrap').each(function ()
        {
            var _img = $(this).find('img');
            _img.attr('src', _r(_img.attr('src')));
            $(this).css(_css);
            $(this).find('div.pl').css(_cssDiv);
        });
        $('.photo_wrap div:last').css('border-bottom', 'none');
        $('.photo_wrap div.pl:last').css('border-bottom', 'none');
    },

    // }}}
    // {{{ scope ()
    
    scope : function ()
    {
        return (this.match(/^photos\/album\/\w+/i)
                || this.match(/^event\/album\/\w+/i));
    },

    // }}}
    // {{{ wrap ()

    wrap: function ()
    {
        $('#in_tablem .photitle').append(
            $(document.createTextNode(' > ')),
            $('<a id="dh_expander" href="#expand">展开为大图</a>'));
        var _toggle = this._toggle;
        $('#dh_expander').click(function ()
        {
            _toggle();
        });
        if (bean.config.autoExpandAlbum)
        {
            _toggle();
        }
    },

    // }}}
});

// }}}
// {{{ wrapper: subject photo box

bean.addWrapper({
    scope : /^subject\/\d+\/$/i,
    wrap : function ()
    {
        $('#mainpic a:first').click(function ()
        {
            var src = $(this).attr('href');
            var p = $('<div id="dh_overlay"><img src="' + src + '" /></div>');
            $('body').append(p);
            p.click(function ()
            {
                p.remove();
            });
            return false;
        });
    },
});

// }}}
// {{{ wrapper: news feed photo expander

bean.addWrapper({
    scope : /^contacts\/$/i,
    wrap : function ()
    {
        $('.album_photo').each(function ()
        {
            var _item = $(this);
            _item.click(function ()
            {
                var img = _item.find('img');
                var src = img.attr('src');
                if (src.indexOf('icon') !== -1)
                {
                    src = src.replace('photo/icon', 'photo/photo');
                } else {
                    src = src.replace('photo/photo', 'photo/icon');
                }
                img.attr('src', src);
                unsafeWindow.console.debug('been here');
                return false;
            });
        });
    },
});

// }}}
//{{{ wrapper: page turner

bean.addWrapper({
    scope : function ()
    {
        if (this.match(/^contacts\/$/i))
        {
            this._step = 20;
            return true;
        }
        if (this.match(/^group\/topic\/\d+\/$/i))
        {
            this._step = 100;
            return true;
        }
        if (this.match(/^group\/\w+\/discussion$/i))
        {
            this._step = 25;
            return true;
        }
        if (this.match(/^people\/\w+\/(notes|event)$/i))
        {
            this._step = 10;
            return true;
        }
        if (this.match(/^(movie|book|music)\/mine$/i)
            || this.match(/^(movie|book|music)\/list\/\w+\/(collect|wish|do)$/i))
        {
            this._step = 15;
            return true;
        }
        if (this.match(/^photos\/album\/\d+\/$/i))
        {
            this._step = 18;
            return true;
        }
        return false;
    },
    wrap : function ()
    {
        var url = bean.url;
        var _step = url._step;
        var redrect = function (param)
        {
            var _path = '';
            for (i in url.args)
            {
                if (i == 'start')
                {
                    continue;
                }
                _path += i + '=' + url.args[i] + '&';
            }
            window.location = '/' + url.path + '?' + _path + 'start=' + param;
        }

        if ($('.next a').length == 1)
        {
            bean.addHotKey(bean.key.RIGHT, function ()
            {
                var _tmp = (typeof url.args['start'] == 'undefined')
                            ? _step
                            : parseInt(url.args['start']) + _step;
                redrect(_tmp);
            });
        }
        if ($('.prev a').length == 1)
        {
            bean.addHotKey(bean.key.LEFT, function ()
            {
                var _tmp = (typeof url.args['start'] == 'undefined')
                            ? _step
                            : parseInt(url.args['start']) - _step;
                redrect(_tmp);
            });
        }
    },
});

// }}}
// {{{ wrapper: better note browsing

bean.addWrapper({
    hideSidebar : true,
    scope:  function ()
    {
        return (this.match(/^mine\/notes$/i) ||
                this.match(/^people\/[^\/]+\/notes$/i) ||
                this.match(/^note\/\d+\/$/i));
    },
    wrap: function ()
    {
        _title_s = {
            'font-size' : '18px',
        };
        _body_s = {
            'line-height' : '1.6em',
            'font-size' : '14px',
        };

        $('.note-header h3').css(_title_s);
        $('pre.note').css(_body_s);
    },
});

// }}}
// {{{ wrapper: better review browsing

bean.addWrapper({
    scope: /^review\/\d+\/$/i,
    wrap: function ()
    {
        $('.piir').css('font-size', '14px');
        $('.piir').css('line-height', '1.6em');
    },
});

// }}}

/**
 * I don't think this is necessary.
 * Maybe change it later on,
 * one day I get energy to continue work on this script again.
 *
// {{{ wrapper: better group browsing

bean.addWrapper({
    scope : /^group\/[\w+_\-]+\/$/i,
    hideSidebar : true,
});

bean.addWrapper({
    scope : /^group\/topic\/\d+\/$/i,
    hideSidebar : true,
    hideEvent : function ()
    {
        var _rs = [];
        $('.wr').slice(1).each(function ()
        {
            // eg: ["2008-08-28", "17:42:41", "Leechael\n", "", "", "", "", "(肇庆)"]
            var _t1 = $(this).find('h4').text().split(' ');
            // img element, it's parent node is an anchor.
            var _t2 = $(this).find('.pil');
            var _i = {
                loc : _t1.pop().slice(1, -1),
                time : _t1.slice(0, 2).join(' '),
                nick : $.trim(_t1.slice(2).join(' ')),
                reply: $.trim($(this).find('.wrc').html()),
                src : _t2.attr('src'),
                uri : _t2.parent().attr('href'),
            };
            _rs.push(_i);
        });
    }
});

// }}}
*/
