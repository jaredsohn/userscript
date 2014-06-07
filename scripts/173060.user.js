// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://*/*
// ==/UserScript==

// ==UserScript==
// @name            FrozenFaceSmiley
// @version         3.3.2 修复 by 小绯
// @description     在百度贴吧中使用自定义表情
// @author          xStone(小脸原面板)+封印的喵(嵌入到表情)+小绯(组合修复)
// @license         CC-BY-3.0
// @include         http://tieba.baidu.com/*
// ==/UserScript==
//针对度娘升级做些更新
 $ = unsafeWindow.$;

	  
function smiley(){

    // 当前网页类型：1，通用表情页面；2，楼中楼表情页面；3, 表情设置页面
var thisPage = 1;
    /* if (location.href.search(/simplesmiley/i) != -1) {
        thisPage = 2;
    }   */
if(location.href.search(/tieba\.baidu\.com\/i\//i) != -1) {
        thisPage = 3;
    }
    
    // 贴吧自带表情
    var defaultSmileys = [
        /* {id: 0 , name: '常用'    , hidden: false},
        {id: 1 , name: '兔斯基'  , hidden: false},
        {id: 2 , name: '绿豆蛙'  , hidden: false},
        {id: 3 , name: 'BOBO'    , hidden: false},
        {id: 4 , name: '泡泡'    , hidden: false},
        {id: 5 , name: '气泡熊'  , hidden: false},
        {id: 6 , name: '阿狸'    , hidden: false},
        {id: 7 , name: '影子'    , hidden: false},
        {id: 8 , name: '冷兔'    , hidden: false},
        {id: 9 , name: '暴漫静态', hidden: false},
        {id: 10, name: '暴漫动态', hidden: false} */
		{id: 0 , name: '默认'    , hidden: false},
        {id: 1 , name: '颜表情'  , hidden: false},
        {id: 2 , name: '阿狸'  , hidden: false},
        {id: 3 , name: '罗布布'    , hidden: false},
		{id: 4 , name: '气泡熊'    , hidden: false},
        {id: 5 , name: '张小盒'    , hidden: false},
        {id: 6 , name: '兔斯基'  , hidden: false},
        {id: 7 , name: '暴漫静态'    , hidden: false},
        {id: 8 , name: '暴漫动态'    , hidden: false},
        {id: 9 , name: '波波'    , hidden: false},
        {id: 10, name: '影子', hidden: false},
        {id: 11, name: '冷兔', hidden: false}
    ];

    // 贴吧自带表情隐藏 ID 索引
    var defaultSmileyHiddenIDs = [];

    // 用户自定义表情
    var userDefinedSmileys = [];

    // 用户自定义表情 ID 索引
    var userDefinedSmileyIDs = [];

    // 默认打开表情 ID
    var defaultOpenSmileyID = 0;


    // 主函数执行入口
    setTimeout(function() {
        initDataBase();

        if (thisPage == 1 || thisPage == 2) {
            hideDefaultSmileys();
            addUserDefinedSmileys();
            switchToDefaultOpenSmiley()
        }
        if (thisPage == 3) {
            setUserDefinedSmileys();
        }
    }, 0);


    // 初始化数据库
    function initDataBase() {
        // 初始化贴吧自带表情隐藏 ID
        if (typeof GM_getValue('defaultSmileyHiddenIDs') === 'undefined') {
            GM_setValue('defaultSmileyHiddenIDs', JSON.stringify(defaultSmileyHiddenIDs));
        }
        defaultSmileyHiddenIDs = JSON.parse(GM_getValue('defaultSmileyHiddenIDs'));

        // 初始化贴吧自带表情
        for (var i = 0; i < defaultSmileys.length; ++i) {
            for (var j = 0; j < defaultSmileyHiddenIDs.length; ++j) {
                if (defaultSmileys[i].id == defaultSmileyHiddenIDs[j]) {
                    defaultSmileys[i].hidden = true;
                    break;
                }
            }
        }

        // 初始化用户自定义表情 ID 索引
        if (typeof GM_getValue('userDefinedSmileyIDs') === 'undefined') {
            GM_setValue('userDefinedSmileyIDs', JSON.stringify(userDefinedSmileyIDs));
        }
        userDefinedSmileyIDs = JSON.parse(GM_getValue('userDefinedSmileyIDs'));

        // 初始化用户自定义表情
        for (var i = 0; i < userDefinedSmileyIDs.length; ++i) {
            var indexName = 'userDefinedSmiley_' + userDefinedSmileyIDs[i];
            if (typeof GM_getValue(indexName) === 'undefined') {
                GM_setValue(indexName, JSON.stringify({
                    id        : userDefinedSmileyIDs[i],
                    name      : userDefinedSmileyIDs[i] + ' 号表情',
                    hidden    : false,
                    collection: []
                }));
            }
            userDefinedSmileys.push(JSON.parse(GM_getValue(indexName)));
        }

        // 初始化默认打开表情 ID
        if (typeof GM_getValue('defaultOpenSmileyID') === 'undefined') {
            GM_setValue('defaultOpenSmileyID', JSON.stringify(defaultOpenSmileyID));
        }
        defaultOpenSmileyID = JSON.parse(GM_getValue('defaultOpenSmileyID'));
    }


    // 隐藏贴吧自带表情
    function hideDefaultSmileys() {
        for (var i = 0; i < defaultSmileys.length; ++i) {
            if (defaultSmileys[i].hidden == true) {
                //document.getElementById('tab_' + defaultSmileys[i].id).setAttribute('style', 'display:none;');
				//document.getElementByTagName('tab_' + defaultSmileys[i].id).setAttribute('style', 'display:none;');
				//$('li[data-type="lt"]').style.display='none';
//$('li').style.display='none';
//jQuery("li").hide();
            }
        }
    }

    // 添加所有用户自定义表情
    function addUserDefinedSmileys() {
        for (var i = 0; i < userDefinedSmileys.length; ++i) {
            var smiley = userDefinedSmileys[i];
            if (smiley.hidden == false) {
                smiley.contentId = 'tab' + smiley.id;
                smiley.menuId    = 'tab_' + smiley.id;
                addUserDefinedSmiley(smiley);
            }
        }

        // 设置预览框大小
        //document.getElementById('faceReview').setAttribute('style', 'width:100px;height:100px;');

        // 添加垂直滑动条，当表情分组过多时
        //document.getElementById("tabMenu").setAttribute('style', 'overflow-x:hidden;overflow-y:auto;height:320px;');
    }
    // 添加用户自定义表情
    function addUserDefinedSmiley(smiley) {
        var tabContent = document.getElementById('tabContent');
        var tabMenu    = document.getElementById('tabMenu');
        if (!tabContent || !tabMenu) { return; }

        // 添加表情存储表格
        var content = document.createElement('div');
        content.setAttribute('id', smiley.contentId);
        content.setAttribute('style', 'display:none;');
        var text = '<table cellpadding="1" cellspacing="1" align="center" style="border-collapse:collapse;" border="1" bordercolor="#B8B3FF" width="100%" height="100%"><tbody>';
        var number = 0;
        var lines  = smiley.collection.length > 56 ? smiley.collection.length / 7 : 8;
        for (var i = 0; i < lines; ++i) {
            text  += '<tr>';
            for (var j = 0; j < 7; ++j) {
                var posFlag  = j > 3 ? 1 : 0;
                var imageSrc = smiley.collection[number++];
                if (imageSrc) {
                    text += '<td border="1" width="40px" height="35px" style="border-collapse:collapse;" align="center" bgcolor="#FFFFFF" onclick="FFS_insertSmiley(\'' + imageSrc + '\')" onmouseover="FFS_smileyOver(this,\'' + imageSrc + '\',\'' + posFlag + '\')" onmouseout="FFS_smileyOut(this)">';
                    text += '<img width="35px" height="35px" src="' + imageSrc + '">';
                    text += '</td>';
                } else {
                    text += '<td width="35px" height="35px" bgcolor="#FFFFFF"></td>';
                }
            }
            text += '</tr>';
        }
        text += '</tbody></table>';
        content.innerHTML = text;
        tabContent.appendChild(content);

        // 添加表情切换按钮
        var menu = document.createElement('div');
        menu.setAttribute('id', smiley.menuId);
        menu.setAttribute('class', 'menuDefault');
        menu.setAttribute('onclick', 'FFS_switchTab(\'' + smiley.contentId + '\',\'' + smiley.menuId + '\')');
        menu.innerHTML = '<u>' + smiley.name + '</u>';
        tabMenu.appendChild(menu);

        // 拖拽技术支持
        content.addEventListener('drop', function(event){ onDropImage(event, smiley); }, false);
        content.addEventListener('dragover', function(event){ event.preventDefault(); }, false);
        menu.addEventListener('drop', function(event){ onRemoveImage(event, smiley); }, false);
        menu.addEventListener('dragover', function(event){ event.preventDefault(); }, false);
    }
    // 当图片拖拽到表情存储表格时，添加表情
    function onDropImage(event, smiley) {
        event.preventDefault();

        var url    = event.dataTransfer.getData("url");
        var suffix = url.slice(-3).toLowerCase();
        if (suffix != 'jpg' && suffix != 'png' && suffix != 'gif') { return; }
        if (smiley.collection.indexOf(url) != -1) { return; }
        smiley.collection.push(url);
        GM_setValue('userDefinedSmiley_' + smiley.id, JSON.stringify(smiley));
        freshUserDefinedSmiley(smiley);
    }
    // 当图片拖拽到表情切换按钮时，删除表情
    function onRemoveImage(event, smiley) {
        event.preventDefault();

        var url = event.dataTransfer.getData("url");
        if (smiley.collection.indexOf(url) == -1) { return; }
        smiley.collection.splice(smiley.collection.indexOf(url), 1);
        GM_setValue('userDefinedSmiley_' + smiley.id, JSON.stringify(smiley));
        freshUserDefinedSmiley(smiley);
    }
    // 更新表情存储表格
    function freshUserDefinedSmiley(smiley) {
        var content = document.getElementById(smiley.contentId);
        var text    = '<table cellpadding="1" cellspacing="1" align="center" style="border-collapse:collapse;" border="1" bordercolor="#B8B3FF" width="100%" height="100%"><tbody>';
        var number = 0;
        var lines  = smiley.collection.length > 56 ? smiley.collection.length / 7 : 8;
        for (var i = 0; i < lines; ++i) {
            text  += '<tr>';
            for (var j = 0; j < 7; ++j) {
                var posFlag  = j > 3 ? 1 : 0;
                var imageSrc = smiley.collection[number++];
                if (imageSrc) {
                    text += '<td border="1" width="40px" height="35px" style="border-collapse:collapse;" align="center" bgcolor="#FFFFFF" onclick="FFS_insertSmiley(\'' + imageSrc + '\')" onmouseover="FFS_smileyOver(this,\'' + imageSrc + '\',\'' + posFlag + '\')" onmouseout="FFS_smileyOut(this)">';
                    text += '<img width="35px" height="35px" src="' + imageSrc + '">';
                    text += '</td>';
                } else {
                    text += '<td width="35px" height="35px" bgcolor="#FFFFFF"></td>';
                }
            }
            text += '</tr>';
        }
        text += '</tbody></table>';
        content.innerHTML = text;
    }
    unsafeWindow.FFS_switchTab = function(contentId, menuId) {
        var content = document.getElementById(contentId);
        var menu    = document.getElementById(menuId);
        if (!content && !menu) { return; }

        var tabContent = document.getElementById('tabContent');
        var tabMenu    = document.getElementById('tabMenu');
        if (!tabContent || !tabMenu) { return; }

        // 显示表情存储表格
        for (var i = 0; i < tabContent.children.length; ++i) {
            tabContent.children[i].setAttribute('style', 'display:none;');
        }
        content.setAttribute('style', 'display:block;');

        // 调整表情切换按钮
        for (var i = 0; i < tabMenu.children.length; ++i) {
            var item = tabMenu.children[i];
            if (!item.getAttribute('class').match('menuDefault disable')) {
                item.setAttribute('class', 'menuDefault');

                // 假定百度默认表情只使用 16 以下的编号
                var tabNumber = parseInt(item.getAttribute('id').match(/\d+/));
                if (tabNumber < 16) {
                    item.setAttribute('onclick', 'document.getElementById("' + contentId + '").setAttribute("style","display:none;");document.getElementById("' + menuId + '").setAttribute("class","menuDefault"); switchTab(' + tabNumber + ')');
                }
            }
        }
        menu.setAttribute('class', 'menuFocus');
    }
    unsafeWindow.FFS_insertSmiley = function(imageSrc) {
        var editorID = unsafeWindow.getSearchById('id');

        // 兼容不支持 wrappedJSObject 属性的浏览器
        var P = parent.wrappedJSObject;
        if (typeof P === 'undefined') {
            P = parent;
        }

        if (thisPage == 1) {
            var editor = P.TED.Editor.getInstanceById(editorID);
            editor.execCommand('insertimage', imageSrc);
            editor.overlay.close();
            return;
        }
        if (thisPage == 2) {
            var editor = P.TED.SimpleEditor.getInstanceById(editorID);
            editor.execCommand('insertsmiley', imageSrc);
            editor.editorPlugins.insertsmiley.closeOverlay();
            return;
        }
    }
    unsafeWindow.FFS_smileyOver = function(td, imageSrc, posFlag) {
        var faceReview    = document.getElementById('faceReview');
        var tabIconReview = document.getElementById('tabIconReview');
        if (!faceReview || !tabIconReview) { return; }

        td.style.backgroundColor = '#E8E8FD';
        var image = new Image;
        image.src = imageSrc;
        if (image.width < 100 && image.height < 100) {
            faceReview.setAttribute('src', 'http://static.tieba.baidu.com/tb/editor/images/default/0.gif');
            faceReview.setAttribute('style', 'width:100px;height:100px;background-image:url(' + imageSrc + ');');
        } else {
            faceReview.setAttribute('src', imageSrc);
            faceReview.setAttribute('style', 'width:100px;height:100px;');
        }
        if (posFlag == 1) {
            tabIconReview.setAttribute('class', 'show');
        }
        tabIconReview.setAttribute('style', 'display:block;');
    }
    unsafeWindow.FFS_smileyOut = function(td) {
        var faceReview    = document.getElementById('faceReview');
        var tabIconReview = document.getElementById('tabIconReview');
        if (!faceReview || !tabIconReview) { return; }

        td.style.backgroundColor = '#FFFFFF';
        faceReview.setAttribute('src', 'http://static.tieba.baidu.com/tb/editor/images/default/0.gif');
        faceReview.setAttribute('style', 'width:100px;height:100px;');
        tabIconReview.setAttribute('class', '');
        tabIconReview.setAttribute('style', 'display:none;');
    }
//--------------------------------------------------------------------------------------------
//以下设置页面函数，正常不用更换
//--------------------------------------------------------------------------------------------
    // 设置自定义表情
    function setUserDefinedSmileys() {
        // 获取 jQuery 对象
        $ = unsafeWindow.$;
        if (typeof $ === 'undefined') { return; }

        // 添加设置菜单按钮
        $('#aside_menu ul').append('<li id="ffs_aside_smiley_li"><a id="ffs_aside_smiley" href="#">我的表情</a></li>');

        // 载入设置
        $('#ffs_aside_smiley_li').click(function() {
            var sel = $('.sel');
            sel.removeClass('sel');
            sel.html('<a href="' + location.href + '" onclick="window.location.reload()">' + sel.html() + '</a>');
            $(this).addClass('sel');
            $(this).html('我的表情');
            $(document).attr('title', '我的表情_i贴吧');
            setTimeout(function() { loadSettingPage(); }, 0);
        });
    }
    // 载入设置页面
    function loadSettingPage() {
        var css  = '@namespace url(http://www.w3.org/1999/xhtml);';
            css += '#ffs_setting_note{background-color:#FEFFDB;border:1px solid #FFD99C;color:#6C6C6C;padding:4px 15px;width:220px;}';
            css += '#ffs_setting_title{margin-top:24px;margin-left:4px;font-size:14px;font-weight:bold;}';
            css += '#ffs_setting_toolbar{margin-top:12px;margin-left:4px;font-size:13px;font-weight:bold;}';
            css += '#ffs_setting_toolbar span{cursor:pointer;color:#669933;margin-right:12px;}';
            css += '#ffs_setting_table{margin-top:10px;}';
            css += '#ffs_setting_table table{border-collapse:collapse;border-color:#DADFE8;border-image:none;border-style:solid;border-width:0 1px 1px 0;width:100%;}';
            css += '#ffs_setting_table table th,#ffs_setting_table table td{border-collapse:collapse;border-color:#DADFE8;border-image:none;border-style:solid;border-width:1px 0 0 1px;text-align:center;vertical-align:middle;}';
            css += '#ffs_setting_table table th{font-size:14px;font-weight:bold;height:36px;}';
            css += '#ffs_setting_table table td{height:36px;}';
            css += '.ffss_name,.ffss_name_builtin{color:#222222;}';
            css += '.ffss_type,.ffss_type_builtin{color:#222222;}';
            css += '.ffss_status,.ffss_status_builtin{cursor:pointer;color:#FF8800;}';
            css += '.ffss_default_open_both{cursor:pointer;color:#666666;}';
            css += '.ffss_edit{cursor:pointer;color:#6688DD;}';
            css += '.ffss_delete{cursor:pointer;color:#F85A42;}';
        GM_addStyle(css);

        // 获取 jQuery 对象
        $ = unsafeWindow.$;

        // 获取页面框架对象
        var content = $('#content');

        // 移除原有页面框架
        content.empty();

        // 添加设置页面框架
        var text  = '<div id="ffs_setting_note">FrozenFaceSmiley Created by xStone</div>';
            text += '<div id="ffs_setting_title">管理我的表情</div>';
            text += '<div id="ffs_setting_toolbar">'
                     + '<span id="ffss_import">导入配置</span>'
                     + '<span id="ffss_export">导出配置</span>'
                     + '<span id="ffss_new">新建分组</span>'
                     + '</div>'
            text += '<div id="ffs_setting_table"><table><tbody>';
            text += '<tr><th style="width:200px;">名称</th>';
            text += '<th style="width:150px;">类型</th>';
            text += '<th style="width:150px;">状态</th>';
            text += '<th style="width:150px;">默认打开</th>';
            text += '<th style="width:150px;">编辑</th>';
            text += '<th style="width:150px;">删除</th></tr>';

        for (var i = 0; i < defaultSmileys.length; ++i) {
            var smiley = defaultSmileys[i];
            text += '<tr><td><span class="ffss_name_builtin">' + smiley.name + '</span></td>';
            text += '<td><span class="ffss_type_builtin">内置</span></td>';
            text += '<td><span class="ffss_status_builtin" smileyID="' + smiley.id  +'">'
                    + (smiley.hidden ? '隐藏' : '显示') + '</span></td>';
            text += '<td><span class="ffss_default_open_both" smileyID="' + smiley.id  +'">'
                    + (smiley.id == defaultOpenSmileyID ? '是' : '否') + '</span></td>';
            text += '<td><span class="ffss_edit_builtin">-</span></td>';
            text += '<td><span class="ffss_delete_builtin">-</span></td></tr>';
        }

        for (var i = 0; i < userDefinedSmileys.length; ++i) {
            var smiley = userDefinedSmileys[i];
            text += '<tr><td><span class="ffss_name">' + smiley.name + '</span></td>';
            text += '<td><span class="ffss_type">自定义</span></td>';
            text += '<td><span class="ffss_status" smileyID="' + smiley.id  +'">'
                    + (smiley.hidden ? '隐藏' : '显示') + '</span></td>';
            text += '<td><span class="ffss_default_open_both" smileyID="' + smiley.id  +'">'
                    + (smiley.id == defaultOpenSmileyID ? '是' : '否') + '</span></td>';
            text += '<td><span class="ffss_edit" smileyID="' + smiley.id + '">编辑</span></td>';
            text += '<td><span class="ffss_delete" smileyID="' + smiley.id + '"> 删除</span></td></tr>';
        }

        text += '</tbody></table><div>';
        content.append('<div id="ffs_setting">' + text + '</div>');

        // 导入配置
        $('#ffss_import').click(function() {
            openDialog('textinputbox',
                       '导入配置',
                       '',
                       function() {
                            try {
                                userDefinedSmileys = JSON.parse($('#ffss_dialog_textarea').attr('value'));
                            } catch(e) {
                                GM_log(e);
                                return;
                            }
                            setTimeout(function() {
                                // 清空原有配置信息
                                for (var i = 0; i < userDefinedSmileyIDs.length; ++i) {
                                    GM_deleteValue('userDefinedSmiley_' + userDefinedSmileyIDs[i]);
                                }
                                userDefinedSmileyIDs = [];

                                // 设置当前配置信息
                                for (var i = 0; i < userDefinedSmileys.length; ++i) {
                                    var smiley = userDefinedSmileys[i];
                                    userDefinedSmileyIDs.push(smiley.id);
                                    GM_setValue('userDefinedSmiley_' + smiley.id, JSON.stringify(smiley));
                                }
                                GM_setValue('userDefinedSmileyIDs', JSON.stringify(userDefinedSmileyIDs));
                                loadSettingPage();
                            }, 0);
                    });
        });

        // 导出配置
        $('#ffss_export').click(function() {
            openDialog('messagebox', '导出当前配置', JSON.stringify(userDefinedSmileys));
        });

        // 新建表情分组
        $('#ffss_new').click(function() {
            var smileyName = prompt('请输入表情分组名称');
            if (smileyName) {
                var smileyID = 128;
                if (userDefinedSmileyIDs.length != 0) {
                    smileyID = userDefinedSmileyIDs[userDefinedSmileyIDs.length - 1] + 2;
                }
                var smiley = {id: smileyID, name: smileyName, hidden: false, collection: []};

                userDefinedSmileyIDs.push(smileyID);
                userDefinedSmileys.push(smiley);
                setTimeout(function() {
                    GM_setValue('userDefinedSmileyIDs', JSON.stringify(userDefinedSmileyIDs));
                    GM_setValue('userDefinedSmiley_' + smileyID, JSON.stringify(smiley));
                    loadSettingPage();
                }, 0);
            }
        });

        // 显示/隐藏表情分组（内置表情）
        $('.ffss_status_builtin').click(function() {
            var smileyID = parseInt($(this).attr('smileyID'));
            var smiley;
            $.each(defaultSmileys, function(key, value) {
                if (value.id == smileyID) {
                    smiley = value;
                    return false;
                }
            });
            if (smiley.hidden) {
                defaultSmileyHiddenIDs = $.grep(defaultSmileyHiddenIDs, function(value) {
                    return value != smileyID;
                });
                smiley.hidden = false;
                $(this).html('显示');
            } else {
                defaultSmileyHiddenIDs.push(smileyID);
                smiley.hidden = true;
                $(this).html('隐藏');
            }
            setTimeout(function() {
                GM_setValue('defaultSmileyHiddenIDs', JSON.stringify(defaultSmileyHiddenIDs));
            }, 0);
        });

        // 显示/隐藏表情分组（自定义表情）
        $('.ffss_status').click(function() {
            var smileyID = parseInt($(this).attr('smileyID'));
            var smiley;
            $.each(userDefinedSmileys, function(key, value) {
                if (value.id == smileyID) {
                    smiley = value;
                    return false;
                }
            });
            if (smiley.hidden) {
                smiley.hidden = false;
                $(this).html('显示');
            } else {
                smiley.hidden = true;
                $(this).html('隐藏');
            }
            setTimeout(function() {
                GM_setValue('userDefinedSmiley_' + smileyID, JSON.stringify(smiley));
            }, 0);
        });

        // 设置默认打开表情
        $('.ffss_default_open_both').click(function() {
            var current = $('.ffss_default_open_both[smileyID="' + defaultOpenSmileyID + '"]')
            current.html('否')

            var smileyID = parseInt($(this).attr('smileyID'));
            $(this).html('是')
            setTimeout(function() {
                defaultOpenSmileyID = smileyID
                GM_setValue('defaultOpenSmileyID', JSON.stringify(defaultOpenSmileyID));
            }, 0);
        });

        // 编辑表情分组
        $('.ffss_edit').click(function() {
            var smileyID = parseInt($(this).attr('smileyID'));
            var smiley;
            $.each(userDefinedSmileys, function(key, value) {
                if (value.id == smileyID) {
                    smiley = value;
                    return false;
                }
            });

            openDialog('textinputbox',
                       '正在编辑表情分组:&nbsp;&nbsp;' + smiley.name,
                       smiley.collection.join('\n'),
                       function() {
                            var smileyCollection = $('#ffss_dialog_textarea').attr('value').split('\n');
                            smiley.collection = [];
                            $.each(smileyCollection, function(key, value) {
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
        });

        // 删除表情分组
        $('.ffss_delete').click(function() {
            var smileyID = parseInt($(this).attr('smileyID'));
            var index = userDefinedSmileyIDs.indexOf(smileyID);
            userDefinedSmileyIDs.splice(index, 1);
            userDefinedSmileys = $.grep(userDefinedSmileys, function(item) { return item.id != smileyID; });
            setTimeout(function() {
                GM_setValue('userDefinedSmileyIDs', JSON.stringify(userDefinedSmileyIDs));
                GM_deleteValue('userDefinedSmiley_' + smileyID);
                loadSettingPage();
            }, 0);
        });
    }
    function openDialog(type, title, showtext, okCallbck) {
        var css  = '@namespace url(http://www.w3.org/1999/xhtml);';
            css += '#ffss_dialog_mask{display:none;position:fixed;z-index:1200;top:0px;left:0px;width:100%;height:100%;opacity:0.5;background-color:#222222;}';
            css += '#ffss_dialog{display:none;position:fixed;z-index:1400;top:' + (window.innerHeight - 440) / 2 + 'px;left:' + (window.innerWidth - 660) / 2 + 'px;background-color:#DEDEDF;border:12px solid #FDFDFD;border-radius:6px;}';
            css += '#ffss_dialog_title{margin:6px 0px 6px 12px;}';
            css += '#ffss_dialog_textarea{width:640px;height:340px;background-color:#F7F7F7;border:2px solid #CFCFCF;border-radius:2px;margin:0px 12px 0px 12px;}';
            css += '#ffss_dialog_buttons{margin-right:10px;}';
            css += '#ffss_dialog_button_ok,#ffss_dialog_button_cancel{width:60px;height:25px;margin-top:5px;margin-bottom:5px;float:right;}';
        GM_addStyle(css);

        var mask  = $('<div id="ffss_dialog_mask"></div>');
        var text  = '<h3 id="ffss_dialog_title">' + title + '</h3>';
            text += '<textarea id="ffss_dialog_textarea"">' + showtext + '</textarea>';
            text += '<div id="ffss_dialog_buttons">'
                    + '<input id="ffss_dialog_button_ok" type="button" value="确定"></input>'
                    + '<input id="ffss_dialog_button_cancel" type="button" value="取消"></input>'
                    + '</div>';
        var dialog = $('<div id="ffss_dialog">' + text + '</div>');

        if (type == 'messagebox') {
            $('body').append(mask);
            $('body').append(dialog);
            $('#ffss_dialog_button_ok').remove();
            $('#ffss_dialog_button_cancel').attr('value', '关闭');
            $('#ffss_dialog_button_cancel').click(function() {
                dialog.remove();
                mask.remove();
            });
            mask.show();
            dialog.show();
        } else if (type == 'textinputbox') {
            $('body').append(mask);
            $('body').append(dialog);
            $('#ffss_dialog_button_ok').click(function() {
                okCallbck();
                dialog.remove();
                mask.remove();
            });
            $('#ffss_dialog_button_cancel').click(function() {
                dialog.remove();
                mask.remove();
            });
            mask.show();
            dialog.show();
        } else {
            GM_log("call openDialog error: undefined type!");
        }
    }


    // 切换到默认打开表情
    function switchToDefaultOpenSmiley() {
        // 假定百度默认表情只使用 16 以下的编号
        if (defaultOpenSmileyID < 16) {
            //unsafeWindow.switchTab(defaultOpenSmileyID);
            return;
        }

        var contentId = 'tab' + defaultOpenSmileyID;
        var menuId    = 'tab_' + defaultOpenSmileyID;
        unsafeWindow.FFS_switchTab(contentId, menuId)
    }

	
	}
	
	smiley();//小脸主函数执行
	
	
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//度娘更新，补上猫酱的部分代码
	
	

	//从配置中获取表情ID名称等
count=(JSON.parse(GM_getValue('userDefinedSmileyIDs'))).length;//确定循环的次数即表情共几组
//first=(JSON.parse(GM_getValue('userDefinedSmileyIDs')))[0];//第一个表情ID
//last=(JSON.parse(GM_getValue('userDefinedSmileyIDs')))[(count-1)];
//alert(last);
SmileyID=(JSON.parse(GM_getValue('userDefinedSmileyIDs')));//表情组ID
		//alert(indexName);
//GM_getValue('userDefinedSmiley_128')
//alert(GM_getValue('userDefinedSmiley_128'));
//SmileyID='128';
//var i='0';
var SmileyNames='';//表情组名
for (var i = 0; i <count; i++) {
//SmileyHidden=(JSON.parse(GM_getValue('userDefinedSmiley_'+SmileyID[i]))).hidden;
//alert(SmileyHidden);
SmileyName=(JSON.parse(GM_getValue('userDefinedSmiley_'+SmileyID[i]))).name;//表情组名
/* if(SmileyHidden='false'){
  //for (var i = 0; i <count; ++i) {
SmileyName=(JSON.parse(GM_getValue('userDefinedSmiley_'+SmileyID[i]))).name;//表情组名
SmileyName+=',';

   //Hidden=Hidden+SmileyName+',';

       //}
    }else{
	SmileyName='';
	} */
	SmileyNames=SmileyNames+SmileyName+',';//获取表情组名
	//SmileyNames=SmileyNames+SmileyName;//只获取非隐藏的表情组名
}
//alert(SmileyNames);

SmileyNames=SmileyNames.split(",");//转数组以供下面使用

//非隐藏表情组数量
//alert(SmileyNames[6]);
//unexpected character
//alert(SmileyName);
//alert(Tcount);
//--------------------------------------------------
var collections='';//表情地址
for (var i = 0; i <count; ++i) {
collection=(JSON.parse(GM_getValue('userDefinedSmiley_'+SmileyID[i]))).collection;//表情组名
collections=collections+collection+';';
}
collections=collections.split(";");//转数组以供下面使用
//alert(collections[18]);
//collection=(JSON.parse(GM_getValue(SmileyID))).collection;
		//alert(usual_collection);
//--------------------------------------------------	

//}
//getSmiley();//执行获取表情信息的函数
/* var Hidden='';//隐藏表情组
for (var i = 0; i <count; ++i) {
SmileyHidden=(JSON.parse(GM_getValue('userDefinedSmiley_'+SmileyID[i]))).hidden;
if(SmileyHidden=='false'){
   Hidden=Hidden+collections
   }
}
alert(SmileyHidden); */
hideList='';
for(var i=0;i<count;i++){
//添加非隐藏的表情组

SmileyHidden=(JSON.parse(GM_getValue('userDefinedSmiley_'+SmileyID[i]))).hidden;
//SmileyHidden=SmileyHidden.join('');
//alert(SmileyHidden.constructor);//汗死返回的居然是布尔型
if(SmileyHidden==true){
//hideID='#smilyTab'+SmileyID[i];//不转表情真实ID了
hideID='#smilyTab'+i;
hideList=hideList+hideID+',';
//alert(hideID);
//$(hideID).hide();
}	}
//alert(hideList.constructor);
var HideList=JSON.parse(GM_getValue('defaultSmileyHiddenIDs'));
//hideList=hideList.split(',');//转数组
num=HideList.length;
//alert(hideList[0]);
defaultHideList='';

for(var i = 0; i < num; i++){
List=HideList[i];
defaultHideList=defaultHideList+'li[data-index="'+List+'"]'+',';
}
//alert(defaultHideList.constructor);
hList=defaultHideList+hideList;
//alert(hideList.constructor);
//alert(hList);

GM_addStyle(hList+'llll{display:none!important;}');
//创建表情构造函数
/* function Face(tabName,srcArray,colCount)
{
	this.tabName=tabName;
	this.faceSrc=srcArray;
	this.colCount=colCount;
	this.rowCount=Math.round(srcArray.length/colCount)+1;
	this.faceWidth_Height=500/this.colCount-2;
}

 */

//循环获取需要的表情地址
Thecollections='';
for(i=0;i<count;i++){
//alert(collections[18]);
Thecollection=collections[i].split(',');
Thecollections=Thecollections+Thecollection+';';
}
Thecollections=Thecollections.split(";");//转数组以供下面使用
//alert(Thecollections[9]);




/* 
//按需增加横向表情栏长度	
var wide=700+count*60;
$('.s_tab_content').width(wide);
$('.s_next').click(function(){

 marLV();//执行计算横向表情栏marginLeft的值
$(".s_tab_content").css("margin-left",(mLvalue-513)+"px");//向右边滚动，即让marginLeft的值减少513px
//alert('ssss');
}); */


//创建一个转换，把小脸的数据交给猫酱的函数处理
frozenfaces='';
for(var i = 0; i < count; i++){
frozenface=GM_getValue('userDefinedSmiley_'+SmileyID[i]);
frozenface=frozenface.replace('name','tabName');
frozenface=frozenface.replace('collection','faceSrc');
frozenfaces=frozenfaces+frozenface+"　";
}
//alert(frozenfaces);



var _window = typeof unsafeWindow == 'undefined' ? window : unsafeWindow;
var $ = _window.$;

var faces = [];		//全部表情
var selector;		//判断选中的是回复框还是楼中楼
//读取表情列表
var splitor="　";	//GM变量分隔符
//var face=GM_getValue('FACES','{"tabName":"","faceSrc":[""],"colCount":"8","rowCount":1,"faceWidth_Height":60}');
//if(!face)
//faceInit='{"tabName":"","faceSrc":[""],"colCount":"8","rowCount":1,"faceWidth_Height":60}';
face=frozenfaces;
face = face.split(splitor);	//分割成数组
//alert(face.constructor);
for(var i=0;i<count;i++)
{
	faces.push(JSON.parse(face[i]));
}
//alert(face[1]);
//faces=frozenfaces;
var TabWidthOffset=0;
var tabWidthCount=faces.length+2;
var tabWidth = 513;
//创建表情构造函数
function Face(tabName,srcArray,colCount,position)
{
	this.tabName=tabName;
	this.faceSrc=srcArray;
	//this.colCount=colCount;
	//this.rowCount=Math.round(srcArray.length/colCount)+1;
	//this.faceWidth_Height=500/this.colCount-2;
	this.position=position||0;
}


//响应监听函数
var tbodyHtml=new Array();	//存储表情tbody内的html
var addFaces = function()
{
	//添加自定义标签页滚动事件
	//var s_n = document.querySelector(css+" .s_next");
	//var s_p = document.querySelector(css+" .s_prev");
	//s_n.addEventListener("click",nextTab,false);
	//s_p.addEventListener("click",nextTab,false);
	//selector.find('.s_next').click(nextTab());
	//selector.find('.s_prev').click(prevTab());
	if(faces.length==0)		//保证faces中至少有一个元素
		faces[0]=new Face("",[""],8);
	for (var index=0;index<count;index++)
	{
		var face = faces[index];
		selector.find('li.s_tab_btn[data-index="'+(face.position||0)+'"]').after('<li id="smilyTab'
			+index+'" class="s_tab_btn customSmily"><span class="s_tab_btnbg">'
			+SmileyNames[index]+'</span></li>');
			//var text='<li  id="smilyTab'
			//+index+'" class="s_tab_btn" data-index="'+SmileyID[index]+'" data-type="'+SmileyNames[index]+'"><span class="s_tab_btnbg customSmily" style="width:auto;">'+SmileyNames[index]+'</span></li>';
	//$('.s_tab_content').append(text); 
	//selector.find('li.s_tab_btn[data-index="0"]').before(text);
			
			
		tabOnClick(index);
	}
	//初始化默认表情组
	var tabNum = GM_getValue('tabNum','1');	//默认上次标签页
	if(faces.length>tabNum)
	{
		selector.find('.selected').removeClass('selected');
		refreshFaces(tabNum);
		selector.find("#smilyTab"+tabNum+" span").addClass('selected');
		}

}

//修改后更新表情框
var refreshFaces = function(index)
{
	tbodyHtml=fetchTbodyHtml();
	selector.find('TABLE.s_layer_table tbody').html(tbodyHtml[index]);
}


//标签点击事件(标签元素背景相关)
var m,n,s;	//事件
var tabOnClick = function(index)
{
	tbodyHtml=fetchTbodyHtml();		//点击标签时获取表情列表
	var cc=document.querySelector(css+' #smilyTab'+index)
	function clickIdTab()
	{
		GM_setValue('tabNum',index);		//记录下标以便下次打开默认为该组
		$(this).find('span').addClass("selected");
		selector.find('TABLE.s_layer_table tbody').html(tbodyHtml[index]);
		for(var m=0;m<faces.length;m++)
		{
			if(m!=index)
				selector.find('#smilyTab'+m+' span').removeClass('selected');
		}
	}
	cc.addEventListener("click",clickIdTab,false);
	var dd=document.querySelectorAll(css+' LI.s_tab_btn');
	[].forEach.call(dd,function(e)
	{
		function clickNormalTab()
			{
				if(!$(this).attr('id'))
				{
				    selector.find('.customSmily span').removeClass('selected');//移除选中状态
				    GM_setValue('tabNum',10000);
				}
			}
		e.addEventListener("click",clickNormalTab,false);
	});
	
}


//针对某些非百度内部和宽度大于100的表情,点击改变BDE_SMILY为BDE_IMAGE,否则会未知错误
unsafeWindow.onClickImg = function(src)
{
	 /*获取原始图片大小*/
    var theImage = new Image();
    theImage.src = src;
    var myReg = /imgsrc\.baidu\.com|static\.tieba\.baidu\.com/;
    var imageWidth = theImage.width;
    var imageHeight = theImage.height;
    if(!(myReg.test(src)&&imageWidth<300))
    {
		setTimeout(function()
			{
				var i=$('.tb-editor-editarea img[src="'+src+'"][class="BDE_Smiley"]')
				i.attr('class','BDE_Image');
				//i.attr('width',imageWidth);
				//i.attr('height',imageHeight);
			},40);
	}

}
//获取tbodyHtml(表情的HTML表示)
var fetchTbodyHtml = function()
{
	var tbody = new Array();
	for (var index=0;index<faces.length;index++)
	{
		var face = faces[index];
		tbody[index]='';
		//face.rowCount += 2;
		//var row=360/face.faceWidth_Height>face.rowCount?(360/face.faceWidth_Height):face.rowCount;
		Thecollectionsss=Thecollections[index].split(",");
		for(var i=0;i<Thecollectionsss.length / 10;i++)
		{
			tbody[index]+='<tr height="47px">';
			for(var j=0;j<10;j++)
			{
				var data_postflag = (j>=5)?1:0;	//控制悬浮预览图像的方位,1为右侧
				var currentFaceSrc = face.faceSrc[i*10+j];		//当前表情链接
				//face.faceSrc.sort(function(a,b)	//根据点击数排序
				//{
				//return a.replace(/.*(?=click[0-9]*)/,'')<b.replace(/.*(?=click[0-9]*)/,'');
				//});
				if(currentFaceSrc)
				{
					currentFaceSrc = currentFaceSrc.replace(/\s|click=[0-9]*/g,'');	//去链接空格
					tbody[index]+='<td class="j_smile" border="1" data-surl="'+currentFaceSrc
								+'" data-postflag="'+data_postflag+'" style="border-collapse:collapse;"';
					tbody[index]=tbody[index]+' align="center" 	bgcolor="#FFFFFF" height="47px"  width="47px">';
					tbody[index]+='<a class="img imgclasses" onclick="onClickImg(\''
						+currentFaceSrc+'\')"><img class="faceImg" src="'+currentFaceSrc+'" width="47px" height="47px"></img></a>';
					tbody[index]+='</td>';
				}
			}
			tbody[index]+='</tr>';
		}
	}
	return tbody;
}





//表情标签页滚动
var nextTab = function()
{
	if((-TabWidthOffset)<tabWidthCount*tabWidth)
		selector.find('.s_tab_content').attr('style','margin-left:'+(TabWidthOffset-=tabWidth)+'px;');
}
var prevtTab = function()
{
	if(-TabWidthOffset>0)
		selector.find('.s_tab_content').attr('style','margin-left:'+(TabWidthOffset+=tabWidth)+'px;');
}

///////////////////////////////////////////
////////自定义表情组位置/////////////////////
////////////////////////////////////////////
//表情组右移动
var tab_MoveRight = function(index)
{
	if($('smilyTab'+index).next().length!=0)
	{
		if($('smilyTab'+index).next().attr('id'))
		{
			var temp = faces[index];
			faces[index]=faces[index+1];
			faces[index+1]=temp;
		}
		else
		{

		}
	}
}
//表情组左移
var tab_MoveLeft = function()
{
	if(index<faces.length-1)
	{
		var temp = faces[index];
		faces[index]=faces[index+1];
		faces[index+1]=temp;
	}
}

//样式


 // 添加垂直滑动条，当表情过多时
      //$('.s_layer_content > div:nth-child(1) > div:nth-child(1)').css('style', 'overflow-x:hidden;overflow-y:auto;height:275px;');
	 var css='.s_layer_content > div:nth-child(1) > div:nth-child(1){height:275px!important;overflow-y:auto!important;overflow-x:auto!important;}';
	  GM_addStyle(css);
	  
var imgCss='IMG.faceImg\
{\
height:101% !important;\
padding:0px 2px 0px 2px !important;\
position:relative;\
bottom:-2px  !important;\
}\
#tabIconReview{\
left:0px!important;\
top:0px!important;\
margin-left:-100px!important;\
width:auto!important;\
height:auto!important;\
max-width:100px!important;\
max-height:100px!important;}\
#tabIconReview img{\
width:auto!important;\
height:auto!important;\
max-width:100px!important;\
max-height:100px!important;\
left:0px!important;\
top:0px!important;\
}';
GM_addStyle(imgCss);

//楼中楼警告
function lzlWaring(){
var notice='<span style="font-size:11px; color:red;">警告:楼中楼里面请务必使用度娘static.tieba.baidu.com里面的表情,</br>否则将触发中文验证码，如果你不清楚，那么在楼中楼只使用度娘自带的表情</br></span>';
$('.lzl_editor_container').prepend(notice);

}



//开始监听

//LZL表情按钮监听
var css;
//发帖框表情监听
function normal_Listener()
{
	var a=document.querySelector('.smiley');
	function m()
	{
		css = '.tb-editor-wrapper';
		if(document.querySelector('.tb-editor-wrapper .s_layer_table')
			&&(!document.querySelector('.tb-editor-wrapper #smilyTab0')))
		{
			selector=$(css).find('.layer_content');
			addFaces();
			//a.removeEventListener("click",m,false);
		}
		else
		{
			setTimeout(m,20);
		}
	}
	a.addEventListener("click",m,false);
}
//LZL表情监听
var LZL_Listener = function(s)
{	
	$(s).each(function()
	{
		$(this).click(function()
		{
			(function c1()
			{
				if(document.querySelector('.insertsmiley_holder'))
				{
					$('.insertsmiley_holder').click(function()
					{
						css='.insertsmiley_holder';
						(function c2()
						{
							if(document.querySelector('.insertsmiley_holder .s_layer_table')
								&&(!document.querySelector('.insertsmiley_holder #smilyTab0')))
							{
								selector=$(css).find('.layer_content');
								addFaces();
								lzlWaring();
							}
							else
								setTimeout(c2,60);
						})();
					});
				}
				else
					setTimeout(c1,60);
			})();
		});
	});
}

////开始监听
normal_Listener();
LZL_Listener('DIV.j_lzl_r.p_reply');
LZL_Listener('.j_lzl_p');
LZL_Listener('.lzl_s_r');
