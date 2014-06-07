// ==UserScript==
// @name            FrozenFaceSmiley
// @version         4.2b
// @description     Custom smiley on Baidu Tieba
// @author          xStone
// @license         CC-BY-3.0
// @grant           GM_addStyle
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_deleteValue
// @grant           GM_log
// @include         http://tieba.baidu.com/*
// @updateURL       https://userscripts.org/scripts/source/129929.meta.js
// @downloadURL     https://userscripts.org/scripts/source/129929.user.js
// ==/UserScript==


(function(){


    // 获取 jQuery 对象
    $ = unsafeWindow.$;


    // 表情数据
    // 其中，表情格式（必选项）如下：
    //  {
    //      id: 0,          // 类型：Integer，含义：表情ID，必须唯一，并且假定128以下为贴吧自带表情
    //      name: '',       // 类型：String， 含义：表情名称
    //      collection: []  // 类型：Array，  含义：表情URI地址
    //  }
    FFS_SmileyData = {
        baiduSmileys: [{
                id: 4,
                name: '泡泡',
                collection: [],
                number: 50,
                prefix: 'face/i_f',
                suffix: 'png'
            }, {
                id: 6,
                name: '颜文字',
                collection: ["^_^", "(-__-)b", "\u2299\ufe4f\u2299\u2016", "\u2299\u25bd\u2299", " \u2267\u03b5 \u2266", "\u2533\uff3f\u2533", "(\u256c\u25bc\u76bf\u25bc\uff09", "\\(&quot;\u2594\u25a1\u2594)/", "\u2196(\uffe3\u25bd\uffe3&quot;) ", "(\u3065\uffe33\uffe3)\u3065 ", "(*\uffe3\u25bd\uffe3)y ", "o(\u2267\u53e3\u2266)o ", "(\uffe3\u03b5\uffe3*)", "/(\u3112o\u3112)/~~ ", "(\uFFE3\u03B5\uFFE3*)", "&lt;(\uffe3\ufe36\uffe3)&gt; ", "o(\u2267v\u2266)o", "\u256e(\u256f3\u2570)\u256d ", " \uff61\u25d5\u203f\u25d5\uff61", " \u7f52\u03c9\u7f52", "(\u25d5\u03c9\uff1c)\u2606 ", "(\u273f\u272a\u203f\u272a\uff61)\uff89 ", "\uff08\u25d5(\uff6a)\u25d5\uff09", "(\u25cf&#039;\u25e1&#039;\u25cf)\uff89\u2665", "\u03a3(\u3063 \u00b0\u0414 \u00b0;)\u3063", "\u311f( \u2594, \u2594 )\u310f", "\u51f8(\u8279\u76bf\u8279 ) ", "m(_ _)m", "(\u2299x\u2299;)", "( =\u2229\u03c9\u2229= )", " \u256e(\u256f\u25bd\u2570)\u256d", "(\u22673\u2266)/ ", "(\uFF20_\uFF20;)?", " o(*\uffe3\u25bd\uffe3*)\u30d6", "(o\u309c\u25bd\u309c)o\u2606", "&quot;o((&gt;\u03c9&lt; ))o&quot;"],
                type: 'text'
            }, {
                id: 8,
                name: '阿狸',
                collection: [],
                number: 70,
                prefix: 'ali/ali_0',
                suffix: 'gif'
            }, {
                id: 12,
                name: '罗罗布',
                collection: [],
                number: 60,
                prefix: 'luoluobu/llb_0',
                suffix: 'gif'
            }, {
                id: 16,
                name: '气泡熊',
                collection: [],
                number: 62,
                prefix: 'qpx_n/b',
                suffix: 'gif'
            }, {
                id: 20,
                name: '小幺鸡',
                collection: [],
                number: 50,
                prefix: 'xyj/xyj_0',
                suffix: 'gif'
            }, {
                id: 24,
                name: '冷兔',
                collection: [],
                number: 50,
                prefix: 'lt/ltn_0',
                suffix: 'gif'
            }, {
                id: 28,
                name: '张小盒',
                collection: [],
                number: 50,
                prefix: 'pczxh/zxh_0',
                suffix: 'gif'
            }, {
                id: 32,
                name: '兔斯基',
                collection: [],
                number: 40,
                prefix: 'tsj/t_00',
                suffix: 'gif'
            }, {
                id: 36,
                name: '冷先森',
                collection: [],
                number: 31,
                prefix: 'lxs/lxs_0',
                suffix: 'gif'
            }, {
                id: 40,
                name: '暴漫静态',
                collection: [],
                number: 55,
                prefix: 'baodong/b_00',
                suffix: 'gif'
            }, {
                id: 44,
                name: '暴漫动态',
                collection: [],
                number: 33,
                prefix: 'baodong_d/bd_00',
                suffix: 'gif'
            }, {
                id: 48,
                name: '波波',
                collection: [],
                number: 53,
                prefix: 'bobo/B_00',
                suffix: 'gif'
            }, {
                id: 52,
                name: '影子',
                collection: [],
                number: 46,
                prefix: 'shadow/yz_0',
                suffix: 'gif'
            }, {
                id: 56,
                name: '绿豆蛙',
                collection: [],
                number: 53,
                prefix: 'ldw/w_00',
                suffix: 'gif'
        }],
        baiduSmileyHiddenIDs: [],
        userDefinedSmileys: [],
        userDefinedSmileyIDs: [],

        init: function() {
            if (!this._inited) {
                this._initBaiduSmileys();
                this._initUserDefinedSmileys();
                this._inited = true;
            }
        },
        _initBaiduSmileys: function() {
            if (typeof GM_getValue('baiduSmileyHiddenIDs') === 'undefined') {
                GM_setValue('baiduSmileyHiddenIDs', JSON.stringify(this.baiduSmileyHiddenIDs));
            }
            this.baiduSmileyHiddenIDs = JSON.parse(GM_getValue('baiduSmileyHiddenIDs'));

            var path = 'http://static.tieba.baidu.com/tb/editor/images/';
            for (var i = 0; i < this.baiduSmileys.length; ++i) {
                var s = this.baiduSmileys[i];
                var n = s.number;
                if (s.type == 'text') { n = 0; }
                for (var j = 1; j <= n; ++j) {
                    s.collection.push(path + s.prefix + (j<10?'0':'') + j + '.' + s.suffix);
                }
                s.hidden = (this.baiduSmileyHiddenIDs.indexOf(s.id) != -1);
            }
        },
        _initUserDefinedSmileys: function() {
            if (typeof GM_getValue('userDefinedSmileyIDs') === 'undefined') {
                GM_setValue('userDefinedSmileyIDs', JSON.stringify(this.userDefinedSmileyIDs));
            }
            this.userDefinedSmileyIDs = JSON.parse(GM_getValue('userDefinedSmileyIDs'));
            for (var i = 0; i < this.userDefinedSmileyIDs.length; ++i) {
                var indexName = 'userDefinedSmiley_' + this.userDefinedSmileyIDs[i]
                this.userDefinedSmileys.push(JSON.parse(GM_getValue(indexName)));
            }
        }
    };
    FFS_SmileyData.init();


    // 表情设置
    FFS_SmileySetting = {
        init: function() {
            // 添加菜单按钮
            $('#aside_menu ul').append('<li id="ffs_aside_smiley_li"><a id="ffs_aside_smiley" href="#">我的表情</a></li>');

            // 载入页面
            $('#ffs_aside_smiley_li').one('click', function() {
                var sel = $('.sel');
                sel.removeClass('sel');
                sel.html('<a href="' + location.href + '" onclick="window.location.reload()">' + sel.html() + '</a>');
                $(this).addClass('sel');
                $(this).html('我的表情');
                $(document).attr('title', '我的表情_i贴吧');
                setTimeout(function() { FFS_SmileySetting._loadSettingPage(); }, 0);
            });
        },
        _loadSettingPage: function() {
            var css = '@namespace url(http://www.w3.org/1999/xhtml);'
                    + '#ffs_setting_note{background-color:#FEFFDB;border:1px solid #FFD99C;color:#6C6C6C;padding:4px 15px;width:220px;}'
                    + '#ffs_setting_title{margin-top:24px;margin-left:4px;font-size:14px;font-weight:bold;}'
                    + '#ffs_setting_toolbar{margin-top:12px;margin-left:4px;font-size:13px;font-weight:bold;}'
                    + '#ffs_setting_toolbar span{cursor:pointer;color:#669933;margin-right:12px;}'
                    + '#ffs_setting_table{margin-top:10px;}'
                    + '#ffs_setting_table table{border-collapse:collapse;border-color:#DADFE8;border-image:none;border-style:solid;border-width:0 1px 1px 0;width:100%;}'
                    + '#ffs_setting_table table th,#ffs_setting_table table td{border-collapse:collapse;border-color:#DADFE8;border-image:none;border-style:solid;border-width:1px 0 0 1px;text-align:center;vertical-align:middle;}'
                    + '#ffs_setting_table table th{font-size:14px;font-weight:bold;height:36px;}'
                    + '#ffs_setting_table table td{height:36px;}'
                    + '.ffs_smiley_name{color:#222222;}'
                    + '.ffs_smiley_status{cursor:pointer;color:#FF7E00;}'
                    + '.ffs_smiley_edit{cursor:pointer;color:#6688DD;}'
                    + '.ffs_smiley_delete{cursor:pointer;color:#F85A42;}';
            GM_addStyle(css);

            // 设置页面
            var text = '<div id="ffs_setting_note">FrozenFaceSmiley Created by xStone</div>'
                     + '<div id="ffs_setting_title">管理我的表情</div>'
                     + '<div id="ffs_setting_toolbar">'
                        + '<span id="ffs_smiley_import">导入配置</span>'
                        + '<span id="ffs_smiley_export">导出配置</span>'
                        + '<span id="ffs_smiley_new">新建分组</span>'
                     + '</div>'
                     + '<div id="ffs_setting_table"><table><tbody>'
                        + '<tr>'
                            +   '<th style="width:150px;">名称</th>'
                            +   '<th style="width:150px;">状态</th>'
                            +   '<th style="width:150px;">编辑</th>'
                            +   '<th style="width:150px;">删除</th>'
                        + '</tr>';
            $.each(FFS_SmileyData.baiduSmileys, function(key, value) {
                  text += '<tr>'
                            + '<td><span class="ffs_smiley_name">' + value.name + '</span></td>'
                            + '<td><span class="ffs_smiley_status" smileyID="' + value.id + '">' + (value.hidden?'隐藏':'显示') + '</span></td>'
                            + '<td><span class="ffs_smiley_edit_disable" smileyID="' + value.id + '">-</span></td>'
                            + '<td><span class="ffs_smiley_delete_disable" smileyID="' + value.id + '">-</span></td>'
                        + '</tr>';
            })
            $.each(FFS_SmileyData.userDefinedSmileys, function(key, value) {
                  text += '<tr>'
                            + '<td><span class="ffs_smiley_name">' + value.name + '</span></td>'
                            + '<td><span class="ffs_smiley_status" smileyID="' + value.id + '">' + (value.hidden?'隐藏':'显示') + '</span></td>'
                            + '<td><span class="ffs_smiley_edit" smileyID="' + value.id + '">编辑</span></td>'
                            + '<td><span class="ffs_smiley_delete" smileyID="' + value.id + '">删除</span></td>'
                        + '</tr>';
            })
            text += '</tbody></table></div>';
            $('#content').empty().append('<div id="ffs_setting">' + text + '</div>');

            // 绑定事件
            var t = this;
            if (t._initedEvent) { return; }
            t._initedEvent = true;
            $('#content').delegate('#ffs_smiley_import', 'click', function() {
                t._importSmileys();
            }).delegate('#ffs_smiley_export', 'click', function() {
                t._exportSmileys();
            }).delegate('#ffs_smiley_new', 'click', function() {
                t._newSmiley();
            }).delegate('.ffs_smiley_status', 'click', function() {
                t._statusSmiley(parseInt($(this).attr('smileyID')));
            }).delegate('.ffs_smiley_edit', 'click', function() {
                t._editSmiley(parseInt($(this).attr('smileyID')));
            }).delegate('.ffs_smiley_delete', 'click', function() {
                t._deleteSmiley(parseInt($(this).attr('smileyID')));
            });
        },
        _importSmileys: function() {
            this._openDialog('textinputbox', '导入配置', '', function() {
                FFS_SmileyData.userDefinedSmileys = JSON.parse($('#ffs_setting_dialog_textarea').attr('value'));
                setTimeout(function() {
                    for (var i = 0; i < FFS_SmileyData.userDefinedSmileyIDs.length; ++i) {
                        GM_deleteValue('userDefinedSmiley_' + FFS_SmileyData.userDefinedSmileyIDs[i]);
                    }
                    FFS_SmileyData.userDefinedSmileyIDs = [];

                    for (var i = 0; i < FFS_SmileyData.userDefinedSmileys.length; ++i) {
                        var smiley = FFS_SmileyData.userDefinedSmileys[i];
                        FFS_SmileyData.userDefinedSmileyIDs.push(smiley.id);
                        GM_setValue('userDefinedSmiley_' + smiley.id, JSON.stringify(smiley));
                    }
                    GM_setValue('userDefinedSmileyIDs', JSON.stringify(FFS_SmileyData.userDefinedSmileyIDs));
                    FFS_SmileySetting._loadSettingPage();
                }, 0);
            });
        },
        _exportSmileys: function() {
            this._openDialog('messagebox', '导出当前配置', JSON.stringify(FFS_SmileyData.userDefinedSmileys));
        },
        _newSmiley: function() {
            var smileyName = prompt('请输入表情分组名称');
            if (smileyName) {
                var smileyID = 128;
                if (FFS_SmileyData.userDefinedSmileyIDs.length != 0) {
                    smileyID = FFS_SmileyData.userDefinedSmileyIDs[FFS_SmileyData.userDefinedSmileyIDs.length - 1] + 2;
                }
                var smiley = {id: smileyID, name: smileyName, collection: [], hidden: false};

                FFS_SmileyData.userDefinedSmileyIDs.push(smileyID);
                FFS_SmileyData.userDefinedSmileys.push(smiley);
                setTimeout(function() {
                    GM_setValue('userDefinedSmileyIDs', JSON.stringify(FFS_SmileyData.userDefinedSmileyIDs));
                    GM_setValue('userDefinedSmiley_' + smileyID, JSON.stringify(smiley));
                    FFS_SmileySetting._loadSettingPage();
                }, 0);
            }
        },
        _statusSmiley: function(smileyID) {
            var smileys = FFS_SmileyData.baiduSmileys.concat(FFS_SmileyData.userDefinedSmileys);
            var smiley  = {};
            $.each(smileys, function(key, value) {
                smiley = value;
                return smiley.id != smileyID;
            });
            smiley.hidden = !smiley.hidden;
            if (smileyID < 128) {
                var index = FFS_SmileyData.baiduSmileyHiddenIDs.indexOf(smileyID);
                if (index != -1) {
                    FFS_SmileyData.baiduSmileyHiddenIDs.splice(index, 1);
                } else {
                    FFS_SmileyData.baiduSmileyHiddenIDs.push(smileyID);
                }
                setTimeout(function() {
                    GM_setValue('baiduSmileyHiddenIDs', JSON.stringify(FFS_SmileyData.baiduSmileyHiddenIDs));
                    FFS_SmileySetting._loadSettingPage();
                }, 0);
            } else {
                setTimeout(function() {
                    GM_setValue('userDefinedSmiley_' + smileyID, JSON.stringify(smiley));
                    FFS_SmileySetting._loadSettingPage();
                }, 0);
            }
        },
        _editSmiley: function(smileyID) {
            var smiley = {};
            $.each(FFS_SmileyData.userDefinedSmileys, function(key, value) {
                smiley = value;
                return smiley.id != smileyID;
            });
            this._openDialog('textinputbox', '正在编辑表情分组:&nbsp;&nbsp;' + smiley.name, smiley.collection.join('\n'), function() {
                smiley.collection = [];
                $.each($('#ffs_setting_dialog_textarea').attr('value').split('\n'), function(key, value) {
                    value  = $.trim(value);
                    suffix = value.slice(-3).toLowerCase();
                    if (suffix == 'jpg' || suffix == 'png' || suffix == 'gif') {
                        smiley.collection.push(value);
                    }
                });
                setTimeout(function() {
                    GM_setValue('userDefinedSmiley_' + smileyID, JSON.stringify(smiley));
                }, 0);
            });
        },
        _deleteSmiley: function(smileyID) {
            var index = FFS_SmileyData.userDefinedSmileyIDs.indexOf(smileyID);
            FFS_SmileyData.userDefinedSmileyIDs.splice(index, 1);
            FFS_SmileyData.userDefinedSmileys = $.grep(FFS_SmileyData.userDefinedSmileys, function(item) { return item.id != smileyID; });
            setTimeout(function() {
                GM_setValue('userDefinedSmileyIDs', JSON.stringify(FFS_SmileyData.userDefinedSmileyIDs));
                GM_deleteValue('userDefinedSmiley_' + smileyID);
                FFS_SmileySetting._loadSettingPage();
            }, 0);
        },
        _openDialog: function(type, title, showtext, okCallback) {
            var css  = '@namespace url(http://www.w3.org/1999/xhtml);'
                     + '#ffs_setting_dialog_mask{display:none;position:fixed;z-index:1200;top:0px;left:0px;width:100%;height:100%;opacity:0.5;background-color:#222222;}'
                     + '#ffs_setting_dialog{display:none;position:fixed;z-index:1400;top:' + (window.innerHeight - 440) / 2 + 'px;left:' + (window.innerWidth - 660) / 2 + 'px;background-color:#DEDEDF;border:12px solid #FDFDFD;border-radius:6px;}'
                     + '#ffs_setting_dialog_title{margin:6px 0px 6px 12px;}'
                     + '#ffs_setting_dialog_textarea{width:640px;height:340px;background-color:#F7F7F7;border:2px solid #CFCFCF;border-radius:2px;margin:0px 12px 0px 12px;}'
                     + '#ffs_setting_dialog_buttons{margin-right:10px;}'
                     + '#ffs_setting_dialog_button_ok,#ffs_setting_dialog_button_cancel{width:60px;height:25px;margin-top:5px;margin-bottom:5px;float:right;}';
            GM_addStyle(css);

            var mask  = $('<div id="ffs_setting_dialog_mask"></div>');
            var text  = '<h3 id="ffs_setting_dialog_title">' + title + '</h3>'
                      + '<textarea id="ffs_setting_dialog_textarea"">' + showtext + '</textarea>'
                      + '<div id="ffs_setting_dialog_buttons">'
                        + '<input id="ffs_setting_dialog_button_ok" type="button" value="确定"></input>'
                        + '<input id="ffs_setting_dialog_button_cancel" type="button" value="取消"></input>'
                      + '</div>';
            var dialog = $('<div id="ffs_setting_dialog">' + text + '</div>');

            if (type == 'messagebox') {
                $('body').append(mask).append(dialog);
                $('#ffs_setting_dialog_button_ok').remove();
                $('#ffs_setting_dialog_button_cancel').attr('value', '关闭').click(function() {
                    dialog.remove();
                    mask.remove();
                });
                mask.show();
                dialog.show();
            } else if (type == 'textinputbox') {
                $('body').append(mask).append(dialog);
                $('#ffs_setting_dialog_button_ok').click(function() {
                    okCallback();
                    dialog.remove();
                    mask.remove();
                });
                $('#ffs_setting_dialog_button_cancel').click(function() {
                    dialog.remove();
                    mask.remove();
                });
                mask.show();
                dialog.show();
            } else {
                GM_log('=> call openDialog error: undefined type!');
            }
        }
    };


    // 表情编辑框
    FFS_SmileyEditor = {
        _create: function(container, layer_content, arrow, editor, usePerfectScrollbar) {
            var css  = '@namespace url(http://www.w3.org/1999/xhtml);'
                     + '.ffs_s_layer_tab{background-color:#F7F7F7;border-top:1px solid #E3E3E3;color:#666666;height:31px;position:relative;}'
                     + '.ffs_s_layer_tab .ffs_s_prev{background:url("http://tb2.bdstatic.com/tb/static-common/editor_img/layer/prev_b3ded00d.gif") no-repeat scroll left top transparent;cursor:pointer;height:11px;left:10px;position:absolute;top:10px;width:7px;}'
                     + '.ffs_s_layer_tab .ffs_s_next{background:url("http://tb2.bdstatic.com/tb/static-common/editor_img/layer/next_a7655d1d.gif") no-repeat scroll left top transparent;cursor:pointer;height:11px;right:10px;position:absolute;top:10px;width:7px;}'
                     + '.ffs_s_layer_tab .ffs_s_tab_con_wrapper{height:30px;left:24px;overflow:hidden;position:absolute;top:0;}'
                     + '.ffs_s_layer_tab .ffs_s_tab_content{padding-top:5px;position:relative;}'
                     + '.ffs_s_layer_tab .ffs_s_tab_btn{border-top:0 none;cursor:pointer;float:left;height:21px;line-height:21px;margin:0px 5px 10px 0px;padding:0;}'
                     + '.ffs_s_layer_tab .ffs_s_tab_btnbg{display:block;padding:0px 10px 0px 10px;}'
                     + '.ffs_s_layer_tab .ffs_s_hover{background:url("http://tb2.bdstatic.com/tb/static-common/editor_img/layer/hover_left_2e5a5e3e.png") no-repeat scroll left top transparent}'
                     + '.ffs_s_layer_tab .ffs_selected{background:url("http://tb2.bdstatic.com/tb/static-common/editor_img/layer/selected_left_29ec3a63.png") no-repeat scroll left top transparent;color:#FFFFFF;}'
                     + '.ffs_s_layer_content{height:276px;padding:5px 3px 0 5px;}'
                     + '.ffs_s_layer_content .ffs_s_layer_table{border:0 none;}'
                     + '.ffs_s_layer_content .ffs_s_layer_table td{border-color:#E3E3E3;vertical-align:middle;}'
                     + '.ffs_tabIconReview{background:none repeat scroll 0 0 #FFFFFF;border:1px solid #888888;border-radius:55px 55px 55px 55px;position:absolute;top:-80px;left:500px;height:110px;width:110px;}';
            GM_addStyle(css);

            var t = this;
            t.tb_layer_wrapper    = container;
            t.layer_content       = layer_content;
            t.arrow               = arrow;
            t.editor              = editor;
            t.usePerfectScrollbar = usePerfectScrollbar;

            t.layer_content.html(['<div class="ffs_s_layer_content"></div>',
                                  '<div class="ffs_s_layer_tab"></div>',
                                  '<div class="ffs_tabIconReview""></div>'
                            ].join(""));
            t.s_layer_tab     = t.layer_content.find('.ffs_s_layer_tab');
            t.s_layer_content = t.layer_content.find('.ffs_s_layer_content');
            t.tabIconReview   = t.layer_content.find('.ffs_tabIconReview');

            t.currentID = 4;
            t._genericTab();
            t._switchTab(t.currentID);
            t._smileyEventInit();
        },
        _genericTab: function() {
            var t       = this;
            var smileys = FFS_SmileyData.baiduSmileys.concat(FFS_SmileyData.userDefinedSmileys);

            for (var i = 0; i < smileys.length; ++i) {  // 常用表情支持
                var s = smileys[i];
                if (s.name == '常用') {
                    t.currentID = s.id;
                    smileys.splice(i, 1);
                    smileys.unshift(s);
                    break;
                }
            }

            var text = '<div class="ffs_s_prev"></div>'
                     + '<div class="ffs_s_tab_con_wrapper"><ul class="ffs_s_tab_content" style="marginLeft:0px">';
            for (var i = 0; i < smileys.length; ++i) {
                var s = smileys[i];
                if (s.hidden) { continue; }
                text += '<li class="ffs_s_tab_btn' + (s.id==t.currentID?' ffs_selected':'') + '" data-index="' + s.id + '">'
                        + '<span class="ffs_s_tab_btnbg">' + s.name + '</span>'
                      + '</li>';
            }
            text += '</ul></div><div class="ffs_s_next"></div>';
            t.s_layer_tab.html(text);
            t._tabEventInit();
        },
        _tabEventInit: function() {
            var t = this;
            t.s_layer_tab.delegate('.ffs_s_prev', 'click', function() {
                t._prevTab();
            }).delegate('.ffs_s_next', 'click', function() {
                t._nextTab();
            }).delegate('.ffs_s_tab_btn', 'click', function() {
                t._switchTab($(this).data('index'));
            }).delegate('.ffs_s_tab_btn', 'mouseenter', function() {
                $(this).addClass('ffs_s_hover')
            }).delegate('.ffs_s_tab_btn', 'mouseleave', function() {
                $(this).removeClass('ffs_s_hover')
            })
        },
        _prevTab: function() {
            var c  = this.s_layer_tab.find('.ffs_s_tab_content');
            var ml = parseInt(c.css('marginLeft').slice(0, -2)) + 440;

            if (ml > 0) { return; }
            c.animate({ marginLeft: ml }, 500, 'linear');
        },
        _nextTab: function() {
            var c  = this.s_layer_tab.find('.ffs_s_tab_content');
            var ml = parseInt(c.css('marginLeft').slice(0, -2)) - 440;

            c.animate({ marginLeft: ml }, 500, 'linear');
        },
        _switchTab: function(tabIndex) {
            var currTab = this.s_layer_tab.find('li[data-index="' + this.currentID + '"]');
            var nextTab = this.s_layer_tab.find('li[data-index="' + tabIndex + '"]');

            currTab.removeClass('ffs_selected');
            nextTab.addClass('ffs_selected');
            this.currentID = tabIndex;
            this._genericSmiley(tabIndex);
        },
        _genericSmiley: function(smileyID) {
            var smileys = FFS_SmileyData.baiduSmileys.concat(FFS_SmileyData.userDefinedSmileys);
            var smiley  = $.grep(smileys, function(item) { return item.id == smileyID; })[0];

            var smileyType   = smiley.type || 'image';
            var smileyNumber = smiley.collection.length;

            var smileyColumn = 10;
            var smileyRow    = (smileyNumber>50)?Math.ceil(smileyNumber/smileyColumn):5;
            if (smileyType == 'text') {
                smileyColumn = 6;
                smileyRow    = (smileyNumber>36)?Math.ceil(smileyNumber/smileyColumn):6;
            }

            var image  = new Image();
            var number = 0;
            var text   = '<table class="ffs_s_layer_table" cellpadding="1" cellspacing="1" align="center" style="border-collapse:collapse;" border="1" bordercolor="#e3e3e3">';
            for (var i = 0; i < smileyRow; ++i) {
                text += '<tr>';
                for(var j = 0; j < smileyColumn; ++j) {
                    var imageSrc = smiley.collection[number++];
                    if (smileyType == 'text') {
                        if (imageSrc) {
                            text += '<td class="ffs_j_smile_text" border="1" width="90px" height="45px" style="border-collapse:collapse;cursor:pointer" align="center" bgcolor="#FFFFFF" data-smileyid="' + smileyID + '" data-surl="' + imageSrc + '">';
                            text += '<a href="javascript:void(0)" style="display:block;color:#000;font-size:14px;text-decoration:none;">' + imageSrc + '</a>';
                            text += '</td>';
                        } else {
                            text += '<td width="90px" height="45px" bgcolor="#FFFFFF"></td>';
                        }
                    } else if (smileyType == 'image') {
                        if (imageSrc) {
                            image.src = imageSrc;
                            text += '<td class="ffs_j_smile" border="1" width="54px" height="54px" style="border-collapse:collapse;cursor:pointer" align="center" bgcolor="#FFFFFF" data-smileyid="' + smileyID + '" data-surl="' + image.src + '">';
                            if (image.width < 42 && image.height < 42) {
                                text += '<img width="' + image. width + 'px" height="' + image.height + 'px" src="' + image.src + '">';
                            } else {
                                text += '<img width="42px" height="42px" src="' + image.src + '">';
                            }
                            text += '</td>';
                        } else {
                            text += '<td width="54px" height="54px" bgcolor="#FFFFFF"></td>';
                        }
                    } else {
                        GM_log('=> undefined smiley type');
                    }
                }
                text += '</tr>';
            }
            text += '</table>';

            if (this.usePerfectScrollbar) {
                this.s_layer_content.html('<div class="ffs_content_scrollPanel"><div style="float:left">' + text + '</div></div>');
                var scrollPanel = this.s_layer_content.find('.ffs_content_scrollPanel');
                scrollPanel.css({position:'relative', width: '540px', height: '280px', overflow: 'hidden'});
                scrollPanel.perfectScrollbar({wheelSpeed: '36'});
            } else {
                this.s_layer_content.html('<div style="width:540px;height:280px;overflow:auto;">' + text + '</div>');
            }
        },
        _smileyEventInit: function() {
            var t = this;
            t.s_layer_content.delegate('.ffs_j_smile_text', 'click', function() {
                t._insertText($(this).data('surl'));
            }).delegate('.ffs_j_smile', 'click', function() {
                var image = new Image;
                image.src = $(this).data('surl');
                t._insertImage($(this).data('smileyid'), image);
            }).delegate('.ffs_j_smile', 'mouseenter', function() {
                var image = new Image;
                image.src = $(this).data('surl');
                t._smileyOver($(this), image);
            }).delegate('.ffs_j_smile', 'mouseleave', function() {
                t._smileyOut($(this));
            });
        },
        _insertText: function(text) {
            if (!this.editor) {
                unsafeWindow.LzlEditor._s_p._se.execCommand('inserthtml', text);
                unsafeWindow.LzlEditor._s_p._se.editorPlugins.insertsmiley.closeOverlay();
            } else {
                this.editor.execCommand('inserthtml', text);
                unsafeWindow.rich_postor._editor.overlay.close();
            }
        },
        _insertImage: function(tabIndex, image) {
            if (!this.editor) {
                unsafeWindow.LzlEditor._s_p._se.execCommand('insertsmiley', image.src);
                unsafeWindow.LzlEditor._s_p._se.editorPlugins.insertsmiley.closeOverlay();
            } else {
                if (tabIndex < 128) {
                    this.editor.execCommand('insertsmiley', image.src);
                } else {
                    this.editor.execCommand('insertimage', image.src);
                }
                unsafeWindow.rich_postor._editor.overlay.close();
            }
        },
        _smileyOver: function(s, image) {
            s.attr('bgcolor', '#E8E8FD');
            if (image.width < 100 && image.height < 100) {
                this.tabIconReview.html('<div style="position:relative;top:' + (110-image.height)/2 + 'px;left:' + (110-image.width)/2 + 'px;"><img src="' + image.src + '" width="' + image.width + 'px" height="' + image.height + 'px" style="border-radius:50px;-webkit-border-radius:50px;-moz-border-radius:50px;"></img></div>');
            } else {
                this.tabIconReview.html('<div style="position:relative;top:5px;left:5px;"><img src="' + image.src + '" width="100px" height="100px" style="border-radius:50px;-webkit-border-radius:50px;-moz-border-radius:50px;"></img></div>');
            }
            this.tabIconReview.css({display: 'block'});
        },
        _smileyOut: function(s) {
            s.attr('bgcolor', '#FFFFFF');
            this.tabIconReview.empty().css({display: 'none'});
        },
        _show: function() {
            this.tb_layer_wrapper.css({display: 'block'});
            this.tabIconReview.css({display: 'none'});
        },
        _hide: function() {
            this.tb_layer_wrapper.css({display: 'none'});
        },
        _toggle: function() {
            if (this.tb_layer_wrapper.css('display') == 'block') {
                this._hide();
            } else {
                this._show();
            }
        }
    };
    // 主表情编辑框
    FFS_MainSmileyEditor = Object.create(FFS_SmileyEditor);
    FFS_MainSmileyEditor.init = function(usePerfectScrollbar) {
        var t = this;
        t.toolbarSmiley = $('.tb-editor-wrapper .tb-editor-toolbar .smiley');
        t.toolbarSmiley.removeAttr('data-cmd');

        var container = $('.tb-editor-wrapper .tb_layer_wrapper');
        var content   = container.find('.layer_content');
        var arrow     = container.find('.arrow');
        var editor    = unsafeWindow.rich_postor._editor;
        var moveToPosition = function() {
            container.css({
                top: '-314px', left: '0px', width: '552px', height: '314px'
            });
            content.css({
                width: '550px', height: '312px'
            });
            arrow.addClass('down').css({
                left: '263px', bottom: '-7px'
            });
        }
        t._create(container, content, arrow, editor, usePerfectScrollbar);
        moveToPosition();

        t.toolbarSmiley.click(function() {
            var needCreateUI  = false;
            var needForceOpen = false;
            t.toolbarSmiley.parent().find('span').each(function() {
                if ($(this).hasClass('open')) {
                    $(this).removeClass('open')
                    needCreateUI  = true;
                    needForceOpen = true;
                }
                if ($(this).hasClass('close')) {
                    $(this).removeClass('close')
                    needCreateUI = true;
                }
            });
            if (needCreateUI)  { t._create(container, content, arrow, editor, usePerfectScrollbar); moveToPosition(); }
            if (needForceOpen) { t._show(); } else { t._toggle(); }
        });
    }
    // 楼中楼表情编辑框
    FFS_LZLSmileyEditor = Object.create(FFS_SmileyEditor);
    FFS_LZLSmileyEditor.init = function(usePerfectScrollbar) {
        $('.lzl_editor_container').each(function() {
            $(this)[0].addEventListener('DOMNodeInserted', function(event) {
                if (event.target.className == 'tb_layer_wrapper') {
                    var t = FFS_LZLSmileyEditor;

                    var container = $(event.target).html('<span class="arrow arrow_up" style="left:472px;bottom:-7px;top:-7px;"></span><div class="layer_content" style="width:550px;height:312px;"></div>');
                    var content   = container.find('.layer_content');
                    var arrow     = container.find('.arrow');
                    var editor    = null;
                    t._create(container, content, arrow, editor, usePerfectScrollbar);
                }
            });
        })
    }


    if (location.href.search(/tieba\.baidu\.com\/i\//i) != -1) {
        FFS_SmileySetting.init();
        return;
    }
    var css  = '@namespace url(http://www.w3.org/1999/xhtml);'
             + '.ps-container .ps-scrollbar-x{position:absolute;bottom:3px;height:8px;background-color:#6193CF;border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;opacity:0;filter:alpha(opacity=0);-webkit-transition:opacity.2s linear;-moz-transition:opacity .2s linear;transition:opacity .2s linear}'
             + '.ps-container:hover .ps-scrollbar-x{opacity:.6;filter:alpha(opacity=60)}'
             + '.ps-container .ps-scrollbar-x:hover{opacity:.9;filter:alpha(opacity=90);cursor:default}'
             + '.ps-container .ps-scrollbar-x.in-scrolling{opacity:.9;filter:alpha(opacity=90)}'
             + '.ps-container .ps-scrollbar-y{position:absolute;right:0px;width:8px;background-color:#6193CF;border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;opacity:0;filter:alpha(opacity=0);-webkit-transition:opacity.2s linear;-moz-transition:opacity .2s linear;transition:opacity .2s linear}'
             + '.ps-container:hover .ps-scrollbar-y{opacity:.6;filter:alpha(opacity=60)}'
             + '.ps-container .ps-scrollbar-y:hover{opacity:.9;filter:alpha(opacity=90);cursor:default}'
             + '.ps-container .ps-scrollbar-y.in-scrolling{opacity:.9;filter:alpha(opacity=90)}';
    GM_addStyle(css);
    $.ajax({
        url: 'https://raw.github.com/noraesae/perfect-scrollbar/master/min/perfect-scrollbar.min.js',
        timeout: 4000,
        dataType: 'script',
        success: function() {
            GM_log('=> load perfectScrollbar success ...');
            var usePerfectScrollbar = true;
            FFS_MainSmileyEditor.init(usePerfectScrollbar);
            FFS_LZLSmileyEditor.init(usePerfectScrollbar);
        },
        error: function() {
            GM_log('=> load perfectScrollbar error ...');
            var usePerfectScrollbar = false;
            FFS_MainSmileyEditor.init(usePerfectScrollbar);
            FFS_LZLSmileyEditor.init(usePerfectScrollbar);
        }
    });


})();
