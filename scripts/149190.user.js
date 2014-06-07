// ==UserScript==
// @name           百度贴吧自动签到机
// @namespace      https://plus.google.com/u/0/105378903141101735508
// @version        1.1
// @description    自动获取用户加入的贴吧列表，并逐一签到。
// @include        http://tieba.baidu.com/i/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @copyright      2012+, 叶虫
/* StartHistory
v1.1 去掉循环检测，增加延时执行功能。
EndHistory */
// ==/UserScript==


(function($){
    
    $(function(){
        // 判断当前页面是否是自己的i贴吧
        if($('#newTopPanel').length == 1){
            init();
        }
    });
    
    // 默认用户设置
    var default_check = false;
    var default_delay = 0;
    
    // 用于禁止重复点击签到按钮
    var working = false;

    function sign(){
        var list = $('#always_go_list>ul>li>a.j_ba_link');
        var total = list.length;
        var count = 0;
        var success = 0;
        var faild = 0;
        
        list.each(function(i, n){
            var name = n.innerText;
            if(/\.\.\.$/.test(name)) name = n.title;
            
            // 从对应的贴吧网页获取tbs
            $.get(n.href, function(doc){
                var res = /PageData\.tbs = "([a-z0-9]+)";/.exec(doc);
                if(res == null || res.length != 2){
                    log(name + "吧签到失败！----未能在网页上找到tbs定义。");
                    return;
                }
                
                var params = {
                    kw: name,
                    tbs: res[1],
                    ie : "utf-8"
                };
                
                // 发送签到请求
                $.post("/sign/add", params, function(res){
                    eval('var v = ' + res);
                    if(v){
                        if(v.no == 0) {
                            success++;
                            log(params.kw + "吧签到成功！----今天第" + v.data.uinfo.user_sign_rank + "个签到，已连续签到" + v.data.uinfo.cont_sign_num + "次。");
                        }else{
                            faild++;
                            log(params.kw + "吧签到失败！----错误编号：" + v.no + "，错误信息：" + v.error)
                        }
                    }else{
                        faild++;
                        log(params.kw + "吧签到失败！----未知错误。")
                    }
                    count++;
                    if(count == total){
                        log("----结束签到。----共" + total + "个贴吧，成功签到" + success + "个贴吧。");
                        working = false;
                    }
                });
            });
        });
    }
    
    // 脚本初始化
    function init(){
        var wapper = $('<div id="auto_sign_wapper" style="position:fixed; right:10px; top:20px; width:400px; z-index: 1000;"></div>');
        var title = $('<div id="auto_sign_title" style="width:100%; height:20px; color:#379C94;"></div>');
        var btn_sign = $('<div id="auto_sign_btn_sign" style="cursor:pointer; float:right; margin-right:10px;" title="点击这里自动在所有贴吧签到">签到</div>');
        var btn_show = $('<div id="auto_sign_btn_show" style="cursor:pointer; float:right; margin-right:10px;" title="切换签到反馈信息的显示和隐藏">日志</div>');
        var btn_opt = $('<div id="auto_sign_btn_opt" style="cursor:pointer; float:right;" title="脚本的相关选项">设置</div>');
        var board = $('<div id="auto_sign_board" style="width:100%; height:280px; overflow-y:scroll; background-color:#9BB5B6; display:none;"><pre id="auto_sign_pre" style="padding:5px;"></pre></div>');
        var opt = $('<div id="auto_sign_opt" style="width:120px; z-index:1001; right:0; float:right; padding:5px; text-align:center; background-color:#9BB5B6; display:none;"></div>');
        var opt_check = $('<label title="勾选此项后，只要网页开着，即可在12点自动签到。"><input type="checkbox" id="auto_sign_opt_check"></input> 晚上12点自动签到</label>');
        var opt_delay = $('<label title="设置本地时间与百度服务器时间的偏差，取值正负3600秒之间。">时间偏移量 <input type="text" id="auto_sign_opt_delay" style="width:25px; height:14px; padding:0; vertical-align:middle;"></input> 秒</label>');
        var opt_save = $('<label><input type="button" id="auto_sign_opt_save" value="保存设置" style="height:20px;"></input></label>');
        title.append(btn_opt).append(btn_show).append(btn_sign).add(board).appendTo(wapper);
        opt.append(opt_check).append(opt_delay).append(opt_save).appendTo(wapper);
        wapper.appendTo(document.body);
        
        // 签到按钮
        btn_sign.click(function(e){
            if(working) return;
            working = true;
            $('#auto_sign_board').show();
            log("----开始签到。----当前时间：" + new Date());
            sign();
        });
        
        btn_show.click(function(e){
            opt.hide()
            board.toggle();
        });
        
        btn_opt.click(function(e){
            board.hide();
            opt.toggle();
        });
        
        //保存设置
        $('#auto_sign_opt_save').click(function(e){
            var check = $('#auto_sign_opt_check').attr("checked") == "checked";
            var delay = parseInt($('#auto_sign_opt_delay').val(), 10);
            if(isNaN(delay)){
                alert("间隔时间只能是数字");
                return;
            }
            
            try {
                localStorage["auto_sign_check"] = check;
            } catch (err) {
            }
        
            try {
                localStorage["auto_sign_delay"] = delay;
            } catch (err) {
            }
            
            alert("保存完毕。");
            window.location.reload();
        });
        
        getOptions();
        setDelay();
    }
    
    // 从本地存储获取设置项
    function getOptions(){
        var check;
        var delay;
        
        try {
            check = localStorage["auto_sign_check"];
        } catch (err) {
        }
        
        try {
            delay = localStorage["auto_sign_delay"];
        } catch (err) {
        }

        if(check == null){
            check = default_check;
        }
        
        if(delay == null){
            delay = default_delay;
        }
        
        if(check == "true"){
            $('#auto_sign_opt_check').attr("checked", "checked");
        }else{
            $('#auto_sign_opt_check').removeAttr("checked");
        }
        $('#auto_sign_opt_delay').val(delay);
    }
    
    // 设置延时执行时间
    function setDelay(){
        var check = $('#auto_sign_opt_check').attr("checked") == "checked";
        var delay = parseInt($('#auto_sign_opt_delay').val(), 10);
        var d = new Date();
        d.setMinutes(0);
        d.setSeconds(delay);
        d.setMilliseconds(0);
        d.setHours(delay > 0 ? 24 : 23);
        var next_night = d.getTime() < new Date().getTime() ? d.getTime() + 24*60*60*1000 : d.getTime();
        
        if(check){
            var now = new Date().getTime();
            var interval = next_night - now;
            if(interval > 0){
                log("将于" + Math.ceil(interval/1000) + "秒后开始签到");
                window.setTimeout(function(){
                    $('#auto_sign_btn_sign').click();
                }, interval);
            }else{
                $('#auto_sign_btn_sign').click();
            }
        }
    }
    
    // 日志
    function log(s){
        $('#auto_sign_pre').append(s + "\n");
        var board = document.getElementById('auto_sign_board');
        board.scrollTop = board.scrollHeight - board.offsetHeight + 20;
    }

})(jQuery)