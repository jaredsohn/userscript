// ==UserScript==
// @name           avgm
// @namespace      avgm.uc.js
// @description    A strengthen script for AcFun & Bilibili.
// @include        http://www.acfun.cn/*
// @include        http://www.bilibili.us/*
// @include        http://124.228.254.229/*
// @version        0.17 - Alpha 2
// ==/UserScript==
//插入jQuery
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js");
    script.addEventListener('load', function () {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    },
    false);
    document.body.appendChild(script);
};
//jQuery载入完成后开始运行代码
function main() {
    //代码开始
    //站点标识
    var siteLabel = '';
    //站点域名
    var siteDomain = '';
    //视频信息
    var videoTitle = '';
    //外链链接
    var transshipLink = '';

    //自动折叠播放器
    var autoMiniPlayer = 0;
    //自动关灯
    var autoLightOff = 0;

    //当前视频索引
    var videoPartIndex = '';
    //使用姆Q播放器
    var mukioPlayerEnable = 0;

    //关闭所有动画效果
    animateEffectEnable = 0;

    //导航。判断当前页面属于A或者属于B
    if (self.location.href.search(/bilibili\.us/) == -1) {
        //当前页面为AcFun
        siteLabel = 'acfun';
        //获取当前域名
        siteDomain = self.location.href.match(/http\:\/\/[^\/]+?\//).toString().replace(/http\:\/\//, '').replace(/\//g, '').toString().trim();
        //获取title信息
        videoTitle = $('title').text().replace(/\- AcFun\.cn/, '').trim();
        if (videoTitle.length > 25) {
            videoTitle = videoTitle.slice(0, 25) + '...';
        };
        //A站设置
        acfun();
    } else {
        //当前页面为Bilibili
        siteLabel = 'bili';
        //获取当前域名
        siteDomain = self.location.href.match(/http\:\/\/[^\/]+?\//).toString().replace(/http\:\/\//, '').replace(/\//g, '').toString().trim();
        //获取title信息
        videoTitle = $('title').text().replace(/_嗶哩嗶哩/, '').trim();
        if (videoTitle.length > 25) {
            videoTitle = videoTitle.slice(0, 25) + '...';
        };
        //B站设置
        bilibili();
    };

    //==============================================================================================================================================================================================
    //==============================================================================================================================================================================================
    //该函数用于执行A站操作
    function acfun() {
        //如果您不需要下列功能中的某项，请在相应函数前添加"//"标记以屏蔽该功能。
        //如果您希望重新开启某项功能，请删除其前方的"//"标记。
        //开启动画效果。可以关闭。(非Google Chrome的浏览器建议关闭）
        animateEffectEnable = 1;

        //写入样式。该函数必须被正确执行。
        mimikoStyle();

        //使用姆Q播放器。可以关闭。（建议关闭）
        //mukioPlayerEnable=1;
        //自动折叠播放器。可以关闭。
        autoMiniPlayer = 1;

        //播放器强化。不推荐关闭。
        acfunAdvPlayer();

        //多页链接展开。可以关闭。
        multipage();

        //插入额外链接和搜索栏。可以关闭。
        mimikoSearch();

        //更改简介中的链接。可以关闭。
        niconicoLink();

        //自动折叠播放器。可以关闭。
        autoMiniPlayer = 1;

        //自动关闭光源。可以关闭。
        autoLightOff = 1;

        //自动隐藏评论。可以关闭。
        autoHideReply();

        //计时器。可以关闭。
        tomoTimer();

        //启用Tomo。可以关闭
        callTomo();

        //启用高级外观。可以关闭
        advStyle();

        //动作绑定。该函数必须被正确执行。
        acfunObjActionBind();
    };
    //==============================================================================================================================================================================================
    //==============================================================================================================================================================================================
    //该函数用于执行B站操作
    function bilibili() {
        //如果您不需要下列功能中的某项，请在相应函数前添加"//"标记以屏蔽该功能。
        //如果您希望重新开启某项功能，请删除其前方的"//"标记。
        //写入样式。该函数必须被正确执行。
        mimikoStyle();

        //播放器强化。可以关闭。
        biliAdvPlayer();

        //播放器标题信息。可以关闭。
        biliMultipage();

        //计时器。可以关闭。
        //tomoTimer();
        //动作绑定。该函数必须被正确执行。
        biliObjActionBind();
    };
    //==============================================================================================================================================================================================
    //==============================================================================================================================================================================================
    //该函数用于执行A站播放器功能强化
    function acfunAdvPlayer() {
        //判断当前页面是否有播放器
        if ($('embed[src*="newflvplayer"]').length > 0) {
            //给播放器添加一个id
            $('embed[src*="newflvplayer"]').attr({
                'id': 'mimikoPlayer'
            });

            //获取相关链接
            var stageSrc = $('#mimikoPlayer').attr('src');
            var stageFlashvars = $('#mimikoPlayer').attr('flashvars');
            //对flashvars进行判别
            if (!stageFlashvars) {
                //如果该值不存在，为其赋一个空值
                stageFlashvars = '';
            };

            //链接打包
            if (stageSrc.search(/\?/) == -1 && stageFlashvars != '') {
                var stageUrl = 'http://' + siteDomain + stageSrc + '?' + stageFlashvars;
            } else {
                var stageUrl = 'http://' + siteDomain + stageSrc + '&' + stageFlashvars;
            };
            //外链地址打包
            transshipLink = stageUrl + "&logo=http://sisituan.com/yukidoll/avplayer/image/logo.png";

            //在body后添加幕布
            $('body').append('<span id="curtain"></span>');

            //使用姆Q播放器
            if (mukioPlayerEnable == 1) {
                stageSrc = stageSrc.replace(/.*\/newflvplayer\/player\.swf/, 'http://mukioplayer.appspot.com/mukioplayer.swf');
            };
            //增加logo
            $('#mimikoPlayer').attr({
                'src': stageUrl + "&logo=http://sisituan.com/yukidoll/avplayer/image/logo.png"
            })
            //用窗体包裹
            .wrap('<div id="mimikoWindow"></div>')
            //用自身限制区域包裹
            .wrap('<div id="mimikoPlayerArea"></div>');

            //居中
            $('#mimikoWindow').wrap('<center></center>');

            //添加标题
            $('#mimikoPlayerArea').before('<div id="title"><span id="lightSwitch" class="btn" title="点击这里关闭/打开光源">★</span> <span id="titleInfo" title="点击这里获取外链地址">' + videoTitle + '</span><a id="videoDownloader" class="btn" href="http://www.flvcd.com/parse.php?flag=&format=&kw=' + self.location.href + '" target="_blank" title="点击这里通过硕鼠下载视频">↙</a><span id="playerSizer" class="btn" title="点击这里增加/缩小播放器尺寸">→</span></div>');
        };
    };

    //该函数用于转换nico链接
    function niconicoLink() {
        //判断是否有简介
        if ($('span[style^="border-bottom"]').length > 0) {
            $('span[style^="border-bottom"]').html(
            $('span[style^="border-bottom"]').html()
            //去除碍事儿的分隔符
            .replace(/<wbr>|\<\/wbr>/g, '')
            //将链接转化为链接
            .replace(/(http\:\/\/\S+[^\u2E80-\u9FFF]\b)/g, '<a href="$1">$1</a>')
            //Nico已死，有事烧纸
            /*//将nico番号修正为预览窗口
		.replace( /(sm\d+|nm\d+)/g, '<div class="nicoWindow"><a class="nicoTab" target="_blank" href="http://www.nicovideo.jp/watch/\$1">\$1</a><iframe class="nicoStage" src="http://ext.nicovideo.jp/thumb/\$1" scrolling="no" frameborder="0"><a href="http://www.nicovideo.jp/watch/\$1"></a></iframe></div>' )*/
            //将nico番号修正为链接
            .replace(/(sm\d+|nm\d+)/g, '<a href="http://www.nicovideo.jp/watch/\$1">$1</a>'));
        };

        //评论中的链接
        if ($('#feedback').length > 0) {
            $('#feedback li p').each(function () {
                $(this).html(
                $(this).html()
                //去除碍事儿的分隔符
                .replace(/<wbr>|\<\/wbr>/g, '')
                //将链接转化为链接
                .replace(/(http\:\/\/\S+[^\u2E80-\u9FFF]\b)/g, '<a href="$1">$1</a>')
                //将nico番号修正为链接
                .replace(/(sm\d+|nm\d+)/g, '<a href="http://www.nicovideo.jp/watch/\$1">$1</a>'));
            })
        };
    };

    //该函数用于转换多页标签
    function multipage() {
        //判别是否是多P
        if ($('#dedepagetitles').length > 0) {
            //如果是，在其后追加内容
            $('#dedepagetitles').after('<br /><br />' + $('#dedepagetitles').html().replace(/\<option/g, '<a class="pageTitle"').replace(/\<\/option\>/g, '</a>').replace(/value/g, 'href').replace(/\s+\</g, '<').replace(/\>\s+/g, '>') + '<br /><br />').animate({
                opacity: 1
            },
            50, function () {
                //判断当前是否在第一P
                if ($('a.pageTitle[selected="selected"]').length > 0) {
                    //
                } else {
                    //当前处于第一P
                    $('a.pageTitle:first').attr({
                        'selected': 'selected'
                    });
                };
                //获取当前位置
                videoPartIndex = ' - (' + (parseInt(1 + $('a.pageTitle').index($('a.pageTitle[selected="selected"]')), 10)) + '/' + $('a.pageTitle').length + ')';
                //写入播放器标题
                $('#titleInfo').html(videoTitle + videoPartIndex);
                //删除原有下拉列表
                $('#dedepagetitles').remove();
            });
        };
    };

    //该函数用于添加搜索栏
    function mimikoSearch() {
        //查找wiki应插入的位置
        if ($('td[width="880"]').length > 0) {
            //额外链接
            var topExtraLink = "  <a href='http://acfunwiki.org/' target='_blank'>维基</a> | <a href='http://bilibili.us/' target='_blank'>隔壁</a> | <a href='http://sisituan.com/' target='_blank'>反馈</a><input id='mimikoSearch' type='text' value='AVGM'></input><span id='mimikoSearchButton'>Search!</span>";
            //判别是否在根目录下
            if (self.location.href.search('index.html') == -1) {
                topExtraLink = ' | ' + topExtraLink;
            };
            //追加额外链接
            $('td[width="880"]').append(topExtraLink);
        };
    };

    //该函数用来写入元素样式
    function mimikoStyle() {
        //写入css文件
        var mimikoInsertStyle = '<link rel="stylesheet" type="text/css" href="http://sisituan.com/yukidoll/avplayer/script/' + siteLabel + '' + 'style.css" />';
        $('head').append(mimikoInsertStyle);

        //开启/关闭动画效果
        if (animateEffectEnable != 1) {
            jQuery.fx.off = true;
        };
    };

    //该函数用来绑定A站元素动作
    function acfunObjActionBind() {
        //幕布
        if ($('#curtain').length > 0) {
            //为幕布写入样式
            curtainResize();
            //绑定动作
            $('#curtain').unbind().click(function () {
                $('#lightSwitch').click();
            })
            //幕布默认不开启
            .hide();
        };
        //如果窗体尺寸改变，重新绑定尺寸
        $(window).resize(function () {
            curtainResize();
        });

        //灯光开关
        if ($('#lightSwitch').length > 0) {
            $('#lightSwitch').unbind().toggle(function () { //关灯
                //自身改变
                $(this).text('●');
                //幕布显现
                $('#curtain').show().animate({
                    opacity: 0.95
                },
                500);
            },
            function () { //开灯
                //自身改变
                $(this).text('★');
                //幕布隐藏
                $('#curtain').animate({
                    opacity: 0
                },
                500, function () {
                    $('#curtain').hide();
                });
            });
        };

        //舞台尺寸
        if ($('#playerSizer').length > 0) {
            $('#playerSizer').unbind().toggle(function () { //展开
                //自身改变
                $(this).text('←');
                //尺寸改变
                $('#mimikoPlayerArea').css({
                    'width': 950
                });
                $('#mimikoWindow').css({

                    'width': 960
                });
            },
            function () { //收缩
                //自身改变
                $(this).text('→');
                //尺寸改变
                $('#mimikoPlayerArea').css({
                    'width': 537
                });
                $('#mimikoWindow').css({
                    'width': 547
                });
            });
        };

        //搜索栏
        if ($('#mimikoSearch').length > 0) {
            $('#mimikoSearch').unbind()
            //得到焦点时
            .focus(function () {
                //如果未输入文字，自动清空
                if ($(this).attr('value') == 'AVGM') {
                    $(this).attr({
                        'value': ''
                    })
                };
            })
            //失去焦点时
            .blur(function () {
                //如果未输入文字，自动还原
                if ($(this).attr('value').length == 0) {
                    $(this).attr({
                        'value': 'AVGM'
                    })
                };
            })
            //按下回车
            .keydown(function (mimikoSearchKeyDownEvent) {
                if (mimikoSearchKeyDownEvent.keyCode == 13) {
                    $('#mimikoSearchButton').click();
                };
            });

            //搜索栏按钮
            $('#mimikoSearchButton').unbind().hover(function () {
                $('#mimikoSearch').css({
                    background: '#000',
                    color: '#fff'
                });
                $(this).css({
                    background: '#fff',
                    color: '#000'
                });
            },
            function () {
                $('#mimikoSearch').css({
                    background: '#fff',
                    color: '#000'
                });
                $(this).css({
                    background: '#000',
                    color: '#fff'
                });
            }).click(function () {
                window.open('http://' + siteDomain + '/plus/search.php?kwtype=0&searchtype=titlekeyword&imageField.x=1&imageField.y=0&keyword=' + $('#mimikoSearch').val().replace(/\s+/g, '+'));
            });
        };

        //为评论添加一个id
        $('table[bgcolor="#c5cdbe"]').attr({
            'id': 'mimikoReply'
        });
        $('#mimikoReply').before('<img id="replyShower" class="btn" title="点此展开查看评论" src="http://bilibili.us/images/morecomm.gif" />').hide();
        //幕布尺寸改变
        curtainResize();
        //显示评论
        if ($('#replyShower').length > 0) {
            $('#replyShower').unbind().click(function () { //显示
                //自身改变
                $(this).remove();
                //评论隐藏
                $('#mimikoReply').show().animate({
                    opacity: 0
                },
                0).animate({
                    opacity: 1
                },
                500);
                //幕布尺寸改变
                curtainResize();
            });
        };

        //显示外链地址
        if ($('#titleInfo').length > 0) {
            $('#titleInfo').unbind().click(function () {
                $(this).html('<input id="transshipLink" readonly="readonly" value="' + transshipLink + '" />').attr({
                    'title': '复制这些信息即可外链此视频'
                }).animate({
                    opacity: 1
                },
                50, function () {
                    //
                    $('#transshipLink').unbind().blur(function () {
                        //
                        $('#titleInfo').html(videoTitle + videoPartIndex).attr({
                            'title': '点击这里获取外链地址'
                        })
                    }).focus().select();
                });
            });
        };

        //默认选项的操作
        //默认折叠播放器
        if (autoMiniPlayer != 1) {
            if ($('#playerSizer').length > 0) {
                $('#playerSizer').click();
            };
        };
        //默认关灯
        if (autoLightOff == 1) {
            if ($('#lightSwitch').length > 0) {
                $('#lightSwitch').click();
            };
        };
    };

    //该函数用于在页面植入一个计时器
    function tomoTimer() {
        //插入页面时钟
        $('body:first').append('<span id="tomoTimerCover" title="这里记录着您今日的在线时间"></span>').append('<iframe id="tomoTimer" src="http://sisituan.com/yukidoll/tomo/clock.html?reqsite=' + siteLabel + '"></iframe>');
    };

    //该函数用于执行B站播放器功能强化
    function biliAdvPlayer() {
        //判断当前页面是否有播放器
        if ($('embed[src*="PADplayer.swf"]').length > 0) {
            //给播放器添加一个id
            $('embed[src*="PADplayer.swf"]').attr({
                'id': 'mimikoPlayer'
            });

            //窗体操作
            $('#mimikoPlayer')
            //用窗体包裹
            .wrap('<div id="mimikoWindow"></div>')
            //用自身限制区域包裹
            .wrap('<div id="mimikoPlayerArea"></div>');

            //居中
            $('#mimikoWindow').wrap('<center></center>');

            //添加标题
            $('#mimikoPlayerArea').before('<div id="title"><span id="titleInfo" title="AVGM for Bilibili.us">' + videoTitle + '</span><a id="videoDownloader" class="btn" href="http://www.flvcd.com/parse.php?flag=&format=&kw=' + self.location.href + '" target="_blank" title="点击这里通过硕鼠下载视频">↙</a><span id="playerSizer" class="btn" title="点击这里增加/缩小播放器尺寸">→</span></div>');
        };
    };

    //该函数用来绑定B站元素动作
    function biliObjActionBind() {
        //舞台尺寸
        if ($('#playerSizer').length > 0) {
            $('#playerSizer').unbind().toggle(function () { //展开
                //自身改变
                $(this).text('←');
                //尺寸改变
                $('#mimikoPlayerArea').css({
                    'width': 950,
                    'height': 468
                });
                $('#mimikoWindow').css({
                    'width': 960,
                    'height': 498
                });
            },
            function () { //收缩
                //自身改变
                $(this).text('→');
                //尺寸改变
                $('#mimikoPlayerArea').css({
                    'width': 542,
                    'height': 442
                });
                $('#mimikoWindow').css({
                    'width': 552,
                    'height': 472
                });
            });
        };
    };

    //该函数用于获取B站多页标签
    function biliMultipage() {
        //判别是否是多P
        if ($('#alist').length > 0) {
            //如果是
            $('#alist').animate({
                opacity: 1
            },
            50, function () {
                //获取总P数
                videoPartIndex = ' - ' + ($('#alist span.curPage').html().toString());
                //写入播放器标题
                $('#titleInfo').html(videoTitle + videoPartIndex);
            });
        };
    };

    //该函数用于绑定幕布的尺寸
    function curtainResize() {
        if ($('#curtain').length > 0) {
            //为幕布写入样式
            $('#curtain').css({
                width: document.documentElement.scrollWidth,
                height: document.documentElement.scrollHeight
            });
        };
    };

    //该函数用于执行自动隐藏评论
    function autoHideReply() {
        //隐藏评论
        if ($('#replyToggler').length > 0) {
            $('#replyToggler').click();
        };
    };

    //该函数用于启用Tomo Project
    function callTomo() {
        //插入tomo，并为其绑定相关动作
        $('#tomoTimerCover').css({
            cursor: 'pointer'
        }).attr({
            'title': '点击这里显示/隐藏Tomo'
        }).after('<iframe id="tomo" src="http://sisituan.com/yukidoll/tomo/tomo.html?reqsite=' + siteLabel + '"></iframe>').toggle(function () {
            //
            $('#tomo').show();
            if ($('#replyShower').length > 0) {
                $('#replyShower').click();
            };
        },
        function () {
            //
            $('#tomo').hide();
        });

        //tomo默认隐藏
        $('#tomo').hide();
    };

    //该函数用于启动高级样式
    function advStyle() {
        //写入css文件
        var mimikoInsertStyle = '<link rel="stylesheet" type="text/css" href="http://sisituan.com/yukidoll/avplayer/script/' + siteLabel + 'adv' + 'style.css" />';
        $('head').append(mimikoInsertStyle);

        //背景颜色更改
        $('body').css({
            'background-color': 'rgb(' + parseInt(50 + 50 * Math.random(), 10) + '%,' + parseInt(50 + 50 * Math.random(), 10) + '%,' + parseInt(50 + 50 * Math.random(), 10) + '%)'
        });
    };

    //代码结束
};
//确认jquery载入完成
addJQuery(main);