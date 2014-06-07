// ==UserScript==
// @name       qzone filter Userscript
// @namespace  http://cnblogs.com/twoer
// @version    0.2
// @description  QQ 空间过滤器
// @include      http://user.qzone.qq.com/*
// @require  https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @copyright  2012+, You
// ==/UserScript==


// ==UserScript==
// @name       qzone filter Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  QQ 空间过滤器
// @include      http://user.qzone.qq.com/*
// @require  https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @copyright  2012+, You
// ==/UserScript==


function withjQuery(fn)
{
    if(typeof(jQuery) == 'undefined')
    {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
        var execfn = document.createElement('script');
        execfn.type = 'text/javascript';
        execfn.textContent = 'jQuery.noConflict();(' + fn.toString() + ')(jQuery);';
        script.addEventListener('load', function() 
        {
            document.head.appendChild(execfn);
        });
        document.head.appendChild(script);
    }
    else
    {
        fn(jQuery);
    }
}
withjQuery(function($)
{
    var me = qzoneFilter = 
    {
        init : function()
        {
            me.$ofeeds = $('.friend_original_feed_v3');
            me.$ifeeds = $('.ifeeds_body');
            me.$sidebar = $('.col_main_sidebar');
            me.$colMenu = $('.col_menu');
            me.$colMain = $('.col_main');
            me.$style = null;
            me.showMode = null;
            
            me.fn = 
                {
                    'birthday' : me.removeBirthday,
                    'vote' : me.removeVote,
                    'app' : me.removeApp,
                    'checkinCons' : me.removeCheckinCons,
                    'originalFeed' : me.removeOriginalFeed,
                    'userHat' : me.removeUserHat,
                    'guessLike' : me.removeGuessLike,
                    'firendPlay' : me.removeFirendPlay,
                    'paipai' : me.removePaipai,
                    'checkinUp' : me.removeCheckinUp,
                    'checkin' : me.removeCheckin,
                    'checkinDown' : me.removeCheckinDown,
                    'yellowDiamondMsg' : me.removeYellowDiamondMsg,
                    'sayBoxUp' : me.removeSayBoxUp,
                    'myApp' : me.removeMyApp,
                    'hotTopic' : me.removeHotTopic,
                    'appMission' : me.removeAppMission,
                    'headBanner' : me.removeHeadBanner,
                    'topRightAD' : me.removeTopRightAD,
                    'guanxi' : me.removeGuanxi
                };
            
            me.insertStyle();
            me.createSetting();
            me.attachEvent();
            //me.detectShowMode();
            
            var setting = localStorage.getItem('qzoneFilter');
            if(setting)
            {
                me.setting = JSON.parse(setting);
            }
            
            var i = 0 ;
            while(i  < 5)
            {
                var time = i * 1500;
                if(time == 0)
                {
                    me.remove();
                }
                else
                {
                    (function(time)
                    {
                        setTimeout(me.remove,time);
                    })(time);
                }
                i++;
            }
        },
        remove : function()
        {   
            if(!me.setting)
            {
                return;
            }
            
            me.$ifeeds = $('.ifeeds_body');
            
            //用户
            $.each(me.setting.users,function()
            {
                var $user = me.$ifeeds.find('.f_single.imgBlock.bor2').has('div.f_item[id^=feed_' + this + ']');
                $user.remove();
                
            });
            
            //类别
            var isExist = true;
            do
            {
                isExist = false;
                
                for(var i in me.setting.feedCate)
                {
                    if(me.setting.feedCate[i])
                    {
                        isExist =  (me.fn[i]());
                    }
                }
            }
            while(isExist)
            
            //模块
            for(var i in me.setting.modeCate)
            {
                if(me.setting.modeCate[i])
                {
                    me.fn[i]();
                }
            }
            
        },
        removeBirthday : function()
        {
            var isExist = false;
            var $feedItem = me.$ifeeds.find('.f_single.imgBlock.bor2 .f_item').has('a.qz_hot_keyword:contains("生日礼物")');
            $.each($feedItem,function()
            {
                var $result = $(this).find('div.f_quote,div.f_ct');
                $result.remove();
                isExist = !!$result.size();
            });
            return isExist ;
        },
        removeApp : function()
        {
            var isExist = false;
            var $feedItem = me.$ifeeds.find('.f_single.imgBlock.bor2 .f_item').has('div.f_ct_appfeed');
            $.each($feedItem,function()
            {
                var $result = $(this).find('div.f_ct_appfeed');
                $result.remove();
                isExist = !!$result.size();
            });
            return isExist ;
        },
        removeVote : function()
        {
            var isExist = false;
            var $feedItem = me.$ifeeds.find('.f_single.imgBlock.bor2 .f_item').has('div.qz_vote');
            $.each($feedItem,function()
            {
                var $result = $(this).find('div.qz_vote');
                $result.remove();
                isExist = !!$result.size();
            });       
            
            return isExist ;
        },
        removeCheckinCons : function()
        {
            var isExist = false;
            var $feedItem = me.$ifeeds.find('.f_single.imgBlock.bor2 .f_item').has('span.c_tx3');
            $.each($feedItem,function()
            {
                var $this = $(this);
                var feedInfo = $this.find('div.f_info').html();
                if(feedInfo.match(/<span class=["']c_tx3['"]>签到：<\/span>/))
                {
                    var $result = $this.find('div.f_ct_imgtxt');
                    $result.remove();
                    isExist = !!$result.size();;
                }
            });
            
            return isExist ;
        },
        removeOriginalFeed : function()
        {
            me.$ofeeds.remove();
        },
        removeUserHat : function()
        {
            var $result = me.$ifeeds.find('.info_user_hat.f_user_hat');
            $result.remove();
        },
        removeGuessLike : function()
        {
            var $result = me.$colMenu.find('.play_mode_box.sns_mode');
            $result.remove();
        },
        removeFirendPlay : function()
        {
            var $result = me.$colMenu.find('.may_like_box.sns_mode');
            $result.remove();
        },
        removePaipai : function()
        {
            var $result = me.$colMenu.find('#gdtpaipai');
            $result.remove();
        },
        removeCheckinUp : function()
        {
            var $result = me.$sidebar.find('.collet_box.fn_olympic_goldenboard');
            $result.remove();
        },
        removeCheckin : function()
        {
            var $result = me.$sidebar.find('.collet_box.fn_checkin');
            $result.remove();
        },
        removeCheckinDown : function()
        {
            var $result = me.$sidebar.find('.collet_box.fn_gdtads');
            $result.remove();
        },
        removeYellowDiamondMsg : function()
        {
            //右边 好友访问记录
            //var $result = me.$sidebar.find('.fn_accessLog_tips');
            //$result.remove();
            me.$style.append('.fn_accessLog_tips{display:none;}.collet_box.fn_profile{visibility:visible!important}');
            
            //左边 用户头像
            //me.$colMenu.find('collet_box fn_profile')
            $result = me.$colMenu.find('.btn_openvip,.fn_openvip');
            $result.remove();
        },
        removeSayBoxUp : function()
        {
            var $result = me.$colMain.find('#ofp_tips,.fn_hotbar');
            $result.remove();
            
        },
        removeMyApp : function()
        {
            $result = me.$colMenu.find('#QM_My_App_Container');
            $result.remove()
        },
        removeHotTopic : function()
        {
            var $result = me.$sidebar.find('.collet_box.fn_hotTopic');
            $result.remove();
        },
        removeAppMission : function()
        {
            var $result = me.$sidebar.find('.collet_box.icenter_mode.mod_app_mission,.collet_box.fn_fnrecm');
            $result.remove();
        },
        removeHeadBanner : function()
        {
            var $result = $('.lay_headContainer,.lay_shop_item');
            $result.remove();
        },
        removeTopRightAD : function()
        {
            var $result = $('.gb_ad_tearing_angle ');
            $result.remove();
        },
        removeGuanxi : function()
        {
            var $result = me.$sidebar.find('.collet_box.fn_mayKnow.fn_guanxiquan');
            $result.remove();
        },
        detectShowMode : function()
        {
            var dateSize = me.$ifeeds.find('.f_single.imgBlock.bor2').size();
            var userSize = me.$ifeeds.find('.f_single.imgBlock.bor2 .f_item').size();
            
            if(dateSize == userSize)
            {
                me.showMode = 'date';
            }
            else
            {
                me.showMode = 'user';
            }
        },
        attachEvent : function()
        {
            $(document).scroll(function()
            {
                me.onLoadding();
            });
        },
        onLoadding : function()
        {
            me.remove();
        },
        insertStyle : function()
        {
            var _style = '.qzone-filter-setting-icon{position:fixed;z-index:99998;top:50px;left:18px;width:40px;height:40px;border:solid 1px #E4E4E4;border-radius:2px;background: url(data:image/gif;base64,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) center center no-repeat;}.qzone-filter-setting-icon:hover{border:solid 1px #F3F3F3;border-radius:2px;}.qzone-filter-setting-dialog{display:none;position:fixed;top:50px;left:18px;z-index:99999;border:solid 1px #DADADA;border-radius:5px;box-shadow:0px 0px 6px #DADADA;font-size:12px;color:#666666;background:#fff;}.qzone-filter-setting-dialog .dialog-hd{position:relative;line-height:30px;background:#F3F3F3;color:#4D4D4D;font-weight:700;text-indent:10px;border-bottom:solid 1px #DADADA;}.qzone-filter-setting-dialog .dialog-cnt{padding:15px 5px;}.qzone-filter-setting-dialog a{text-decoration:none;}.qzone-filter-setting-dialog .dialog-close{position:absolute;top:3px;right:3px;width:30px;height:28px;background:url(http://jubao.qq.com/html/images/bg.png) no-repeat -27px -7px;}.qzone-filter-setting-dialog .dialog-close:hover{background-position:-48px -7px;}.qzone-filter-setting-dialog .form-input td{padding:2px 0px;height:28px;}.qzone-filter-setting-dialog .form-input .label{padding-top:3px;width:80px;text-align:right;vertical-align:top;}.qzone-filter-setting-dialog .form-input .input{width:350px;}.qzone-filter-setting-dialog .form-input p{padding:0px;margin:0px;line-height:26px;text-indent:3px;color:#f00;font-size:11px;}.qzone-filter-setting-dialog label{padding-bottom:5px;margin-right:8px;display:inline-block;word-break:break-all;}.qzone-filter-setting-dialog .form-input input[type=checkbox],.qzone-filter-setting-dialog .form-input input[type=radio]{margin-right:5px;vertical-align:-3px;}.qzone-filter-setting-dialog .form-input .textarea{padding:3px;width:330px;height:100px;line-height:20px;color:#333;border:solid 1px #D9D9D9;border-radius:3px;}.qzone-filter-setting-dialog .form-input .button-confrim{width:51px;height:24px;margin-right:6px;border:0px;cursor:pointer;background:url(http://jubao.qq.com/html/images/bg.png) no-repeat -301px -6px;}.qzone-filter-setting-dialog .form-input .button-cancel{width:51px;height:24px;margin-right:6px;border:0px;cursor:pointer;background:url(http://jubao.qq.com/html/images/bg.png) no-repeat -80px -6px;}.qzone-filter-setting-dialog .qzone-filter-help{position:absolute;bottom:25px;left:10px;}';

            var $style = $('<style id="qzoneFilter" type="text/css"></style>');
            $style.append(_style);
            $('head').append($style);
            
            me.$style = $style;
        },
        createSetting : function()
        {
            var $settingIcon = $('<a href="javascript:;" class="qzone-filter-setting-icon" title="QQ 空间过滤器设置"></a>');

            var $qzMask = $('.qz_mask');
            var $settingDialog = $('<div class="qzone-filter-setting-dialog"><div class="dialog-inner"><div class="dialog-hd">QQ空间过滤器设置<a href="javascript:;"class="dialog-close"></a></div><div class="dialog-cnt"><table class="form-input ml-20"><tr><td class="label">QQ号码：</td><td class="input"><textarea class="textarea"name=""id="usersQQ"cols="30"rows="10"></textarea><p>请输入需要过滤的QQ号码，请用回车符号分隔。</p></td></tr><tr><td class="label">信息类型：</td><td class="input"><label for="feedCate1"><input name="feedCate"id="feedCate1"type="checkbox"data-key="birthday">生日信息</label><label for="feedCate2"><input name="feedCate"id="feedCate2"type="checkbox"data-key="vote">投票信息</label><label for="feedCate3"><input name="feedCate"id="feedCate3"type="checkbox"data-key="app">应用信息</label><label for="feedCate4"><input name="feedCate"id="feedCate4"type="checkbox"data-key="checkinCons">签到信息中星座运势</label><p>请选择需要过滤的信息类型？</p></td></tr><tr><td class="label">模块：</td><td class="input"><label for="modeCate14"><input name="modeCate"id="modeCate14"type="checkbox"data-key="headBanner">头部banner</label><label for="modeCate13"><input name="modeCate"id="modeCate13"type="checkbox"data-key="sayBoxUp">说说框上方广告</label><label for="modeCate1"><input name="modeCate"id="modeCate1"type="checkbox"data-key="originalFeed">原创信息</label><label for="modeCate2"><input name="modeCate"id="modeCate2"type="checkbox"data-key="userHat">头像装饰</label><label for="modeCate3"><input name="modeCate"id="modeCate3"type="checkbox"data-key="guessLike">猜你感兴趣</label><label for="modeCate4"><input name="modeCate"id="modeCate4"type="checkbox"data-key="firendPlay">好友最近在玩</label><label for="modeCate5"><input name="modeCate"id="modeCate5"type="checkbox"data-key="paipai">拍拍广告</label><label for="modeCate12"><input name="modeCate"id="modeCate12"type="checkbox"data-key="myApp">最近使用</label><label for="modeCate6"><input name="modeCate"id="modeCate6"type="checkbox"data-key="checkinUp">签到上方广告</label><label for="modeCate7"><input name="modeCate"id="modeCate7"type="checkbox"data-key="checkin">签到</label><label for="modeCate8"><input name="modeCate"id="modeCate8"type="checkbox"data-key="checkinDown">签到下方广告</label><label for="modeCate9"><input name="modeCate"id="modeCate9"type="checkbox"data-key="hotTopic">热门话题</label><label for="modeCate10"><input name="modeCate"id="modeCate10"type="checkbox"data-key="appMission">功能推荐</label><label for="modeCate15"><input name="modeCate"id="modeCate15"type="checkbox"data-key="guanxi">关系圈</label><label for="modeCate16"><input name="modeCate"id="modeCate16"type="checkbox"data-key="topRightAD">右上角广告</label><label for="modeCate11"><input name="modeCate"id="modeCate11"type="checkbox"data-key="yellowDiamondMsg">黄钻提醒</label><p>请选择需要屏蔽的模块？</p></td></tr><tr><td class="label"colspan="2"><button class="button-confrim"title="保存后，需刷新页面后生效。"></button><button class="button-cancel"></button></td></tr></table><div class="qzone-filter-help"><a target="_blank"href="http://cnblogs.com/twoer">作者?</a></div></div></div></div>');

            $settingIcon.click(function()
            {
                $settingDialog.show();

                me.loaddingSetting();
            })

            $settingDialog.delegate('.button-cancel,.dialog-close','click',function()
            {
                $(this).parents('.qzone-filter-setting-dialog').hide();
            });

            $settingDialog.delegate('.button-confrim','click',function()
            {
                me.saveSetting();
            });

            $('body').append($settingIcon).append($settingDialog);
        },
        saveSetting : function()
        {
            var $dialog = $('.qzone-filter-setting-dialog');
            var setting = {};
            setting.users = [];
            setting.feedCate = {};
            setting.modeCate = {};


            $.each($('#usersQQ').val().split('\n'), function()
            {
                if(this.length > 0)
                {
                    setting.users.push(this);
                }
            });
            
            $dialog.find(':checkbox[name=feedCate]').each(function()
            {
                var key = $(this).attr('data-key');
                if(this.checked)
                {
                    setting.feedCate[key] = true;
                }
                else
                {
                    setting.feedCate[key] = false;
                }
            });

            $dialog.find(':checkbox[name=modeCate]').each(function()
            {
                var key = $(this).attr('data-key');
                if(this.checked)
                {
                    setting.modeCate[key] = true;
                }
                else
                {
                    setting.modeCate[key] = false;
                }
            });

            localStorage.setItem('qzoneFilter',JSON.stringify(setting));

            $('.qzone-filter-setting-dialog').find(':input').val('');
            $('.qzone-filter-setting-dialog').hide();
        },
        loaddingSetting : function()
        {
            var $dialog = $('.qzone-filter-setting-dialog');
            var setting = localStorage.getItem('qzoneFilter');
            if(setting)
            {
                setting = JSON.parse(setting);
            }

            $dialog.find(':checkbox[name=feedCate]').each(function()
            {
                var key = $(this).attr('data-key');
                var checked = setting.feedCate[key];
                if(checked)
                {
                    this.checked = true;
                }
                else
                {
                    this.checked = false;
                }
            });

            $dialog.find(':checkbox[name=modeCate]').each(function()
            {
                var key = $(this).attr('data-key');
                var checked = setting.modeCate[key];
                if(checked)
                {
                    this.checked = true;
                }
                else
                {
                    this.checked = false;
                }
            });

            var usersQQ = '';
            $.each(setting.users, function()
            {
                usersQQ += this + '\n';
            });

            if(usersQQ.length > 0)
            {
                usersQQ.substring(0,usersQQ.length - 2);
                $('#usersQQ').val(usersQQ);
            }
        }
    };
    
    me.init();
    
});
