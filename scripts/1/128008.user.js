// ==UserScript==
// @name       Flower Password
// @namespace  http://flowerpassword.com/
// @version    0.4.2
// @description  花密 Flower Password --- 可记忆的密码管理方案
// @include    http://*
// @include    https://*
// @require    http://flowerpassword.com/static/js/jquery.js
// @require    http://flowerpassword.com/static/js/md5.js
// @author     徐小花, Johnny Jian
// ==/UserScript==

function countCode(password, key){
    if(password && key){
        var md5one = $.md5(password,key);
        var md5two = $.md5(md5one,'snow');
        var md5three = $.md5(md5one,'kise');
        //计算大小写
        var rule = md5three.split("");
        var source = md5two.split("");
        for(var i=0;i<=31;i++){ 
            if(isNaN(source[i])){
                var str ="sunlovesnow1990090127xykab";
                if(str.search(rule[i]) > -1){
                    source[i] = source[i].toUpperCase();
                }
            }
        }
        var code32 = source.join("");
        var code1 = code32.slice(0,1);
        if(isNaN(code1)){
            var code16 = code32.slice(0,16);
        }else{
            var code16 = "K" + code32.slice(1,16);
        }
        return [code16, code32];
    }
}

$(function() {
    var currentField = null;
    function setupInputListeners() {
        function insideBox(e) {
            return e.parents('#flower-password-input').size() > 0;
        };
        $(document).on('focus', 'input:password', function() {
            if (insideBox($(this))) {
                return;
            }
            lazyInject();
            if (currentField && currentField.get(0) != this) {
                $('#flower-password-password, #flower-password-key').val('');
            }
            currentField = $(this);
            var offset = currentField.offset();
            var height = currentField.outerHeight();
            $('#flower-password-input').css({left: offset.left + "px", top: offset.top + height + "px"}).show();
        });
        $(document).on('focus', 'input:not(:password)', function() {
            if (insideBox($(this))) {
                return;
            }
            $('#flower-password-input').hide();
        });
    }

    function isInjected() {
        return $('#flower-password-input').size() > 0;
    }

    function lazyInject() {
        if (isInjected()) {
            return;
        }

        GM_addStyle(
            '#flower-password-input,#flower-password-input span,#flower-password-input h1,#flower-password-input label,#flower-password-input input,#flower-password-input p,#flower-password-input a{border:0;font:inherit;font-size:100%;color:#000;background:#FFF;text-align:left;vertical-align:baseline;line-height:1;box-sizing:content-box!important;margin:0;padding:0;}#flower-password-input{border:2px solid #168BC3!important;font:normal 14px/1.5 Tahoma, Helvetica, Arial, \\5b8b\\4f53!important;width:250px;z-index:999999;position:absolute;padding:10px!important;}#flower-password-input h1{font-size:21px!important;font-weight:700!important;color:#168BC3!important;margin:0 0 5px!important;}#flower-password-input input[type=text],#flower-password-input input[type=password]{border:1px solid #999!important;border-radius:3px;font-size:14px!important;display:inline;height:18px;width:160px;margin:5px 10px!important;padding:5px!important;}#flower-password-input input[type=checkbox]{border:1px solid #999!important;border-radius:3px;vertical-align:middle!important;display:inline-block;width:13px;height:13px;cursor:pointer;-webkit-appearance:none;margin:10px!important;}#flower-password-input input[type=checkbox]:checked::after{display:block;position:relative;top:-3px;left:-5px;}#flower-password-input label{vertical-align:middle!important;display:inline;float:none;}#flower-password-input p{font-size:12px!important;color:#999!important;line-height:1.5!important;}#flower-password-close{border:2px solid #168BC3!important;font-weight:700!important;color:#FFF!important;background:#168BC3!important;display:block;width:16px;height:16px;overflow:hidden;position:absolute;top:-2px;right:-2px;cursor:pointer;}#flower-password-close::before{text-align:center!important;line-height:16px!important;content:"\\D7";display:block;width:16px;height:16px;position:relative;top:-1px;}#flower-password-input a{color:#168BC3!important;text-decoration:none;cursor:pointer;}#flower-password-input a:hover{color:#FF881C!important;text-decoration:none;cursor:pointer;}#flower-password-toolbar{display:block;text-align:right!important;}#flower-password-toolbar a{font-size:12px!important;margin-left:10px!important;display:inline;}#flower-password-input a img{vertical-align:middle!important;}#flower-password-hint{margin-top:10px!important;}'
        );
        $('body').append(
            '<div id="flower-password-input" style="display: none;">' +
                '<span id="flower-password-close" title="关闭">关闭</span>' +
                '<h1>花密 Flower Password</h1>' +
                '<label for="flower-password-password">记忆密码</label><input id="flower-password-password" name="flower-password-password" type="password" value="" maxlength="20" />' +
                '<br>' +
                '<label for="flower-password-key">区分代号</label><input id="flower-password-key" name="flower-password-key" type="text" value="" maxlength="20" />' +
        	    '<p id="flower-password-hint">· 记忆密码：可选择一个简单易记的密码，用于生成其他高强度密码。<br>· 区分代号：用于区别不同用途密码的简短代号，如淘宝账号可用“taobao”或“tb”等。<br>· 按Enter键或Esc键关闭本窗口。<br>· 花密官网地址：<a href="http://flowerpassword.com/" target="_blank">http://flowerpassword.com/</a></p>' +
        	'</div>'
        );

        var onChange = function() {
    	    var password = $("#flower-password-password").val();
    	    var key = $("#flower-password-key").val();
            var result = countCode(password, key);
            if (result) {
                currentField.val(result[0]);
            }
        };
        $('#flower-password-password, #flower-password-key').change(onChange).keyup(onChange).keyup(function(e) {
            if (e.which == 13 || e.which == 27) {
                currentField.focus();
                $('#flower-password-input').hide();
            }
        });
        $('#flower-password-close').click(function() {
            $('#flower-password-input').hide();
        });
    }

    setupInputListeners();
});