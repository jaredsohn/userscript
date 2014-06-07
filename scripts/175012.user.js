// ==UserScript==
// @name       淘宝充值平台用户脚本
// @namespace  http://use.i.E.your.homepage/
// @version    0.1.9
// @description  提供淘宝充值平台批量改名的功能
// @match      http://*.taobao.com/*
// @match      http://*.tmall.com/*
// @copyright  2012+, ScriptJava
// @require    http://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==

(function($) {
    var updateUrl = 'http://chongzhi.taobao.com/item.do?method=edit',
        domain = 'http://chongzhi.taobao.com';
    var reg = /name="itemId" value="(\d)*"|name="tbcpCrumbs" value="(.*)"|name="title".*?value="(.*)"|name="tbPrice".*?"(.+?)"|name="detail".*?>(.*)<|name="quantity".*?"(.*?)"|name="promoted".*?checked="(checked)"/gi,
        reg2 = /name="(.*?)".*?(>|value="|checked=")(.*?)("|<)/gi,
        regResult = '.*?class="main">(.*?)<.*|class="H">(.*?)<.*'; //提取提交返回后的结果

    var cityList = '全国|北京|上海|天津|重庆|河北|山西|辽宁|吉林|黑龙江|江苏|浙江|安徽|福建|江西|山东|河南|湖北|湖南|广东|海南|四川|贵州|云南|陕西|甘肃|青海|新疆|西藏|内蒙古|宁夏|广西';

    var resultMap = {
        "宝贝修改成功": {
            "callback": function(item) {
                item.itemHost.find('.item-name a').text(function() {
                    return $(this).next().val();
                }).show().next().hide()
                    .siblings('.x-tip').removeClass('x-tip-error').addClass('x-tip-success').text('修改成功！')
                    .parent().removeClass('x-editing x-error');
                item = null;
            }
        },
        "请不要频繁操作，请稍后再试": {
            "msg": '请修改提交延迟时间，不能小于1秒钟',
            "callback": function() {}
        },
        "平台二次验证失败": {
            "msg": '平台二次验证失败',
            "callback": function(item) {
                alert("平台二次验证失败");
                item = null;
            }
        },
        "宝贝标题最多不能超过60个字节（30个汉字）": {
            "msg": "宝贝标题最多不能超过60个字节（30个汉字）",
            "callback": function(item) {
                item.itemHost.find('.x-editing').addClass('x-error')
                    .find('input').prop('disabled', false).focus()
                    .siblings('.x-tip').removeClass('x-tip-success').addClass('x-tip-error').text('宝贝标题过长');
                item = null;
            }
        }
    };

    var styles = [
        '.x-show { display: block; }',
        '.x-hide { display: none; }',
        '.x-edit-icon { position: absolute; right: 2px; top: 2px; height: 22px; width: 22px; cursor: pointer; background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABHNCSVQICAgIfAhkiAAABABJREFUOI2dlFlMXFUYgL9zZ+AyDM4CHXYciZFiTU2qNGnTFzQNboFSow9iNKam9anEJo3aWptA09hSbGqiPDSUmrQkUBtTHhrUtmnSQJMi1oSlKgZZhmHKNgPMvt3rQ5lhGAYe/JM/596Tk+//7vnvOYK1Ifgf0XNot9kwl3834vNFZbP50xc6Ou7FQS0tLa9WVb1Wr6IiACEECLFaKfF55R1AifiQhmue8/can6fLI2Y9noBGVV/Xxtbl5uYW6bOy9qmqiiQJJElCCLGaMfgKUAgBqoL/r0bCko/63gjlTi/VLleGLyOjSUqUkCSBRiPFoVJCCunJvCREfAyMXSDd/QtHW2RGbAp9lgVFe0CJTEd8d7VrwRJPjJNsU5gH7J3olq5y8koWv49E0GscXDiMmqXX/ri/PXRmjbEQYq1tzDJmujIXdvYgz7fQ2m3i5v0oamieb+uj6DPTfnvny/CJZS8BKdk4Dk/ejpUCEc8IWsd5fn2Yw8UbbiIhN2cO+igrK+dK//6uEZu6DIQ3N07cW0lCCc0h7OcYsplpvGgnFAzw2bsudu0oYMbQiGx4Ngh4geg6sEjRLCEERP1EJ89jX8jgaPMoXp+fj/bOU1NpYCL9OGl6K9nZ2X4gAJASHIfHvgCFkO07vH6FI01/Mzu/yJsVTg7WaBhVD6PqtmEymcjPzw8CakpwzFbERwjZf0CJeDlydojR8Vl2bXXzeV2Y0cj7eDQVmEwmLBYLOp1OjfdrI+NYkaDjOlLYwbFv/uDh4BRbi/2cOuDBHq7CHqrEZDJRVFSETqdLRCWBk+Ch2W40/mFOt/Rxp3eMguwwzYcWWeJlBhffwGg0YrVaMRqNSNIaFGsOSOL9EFgeQzvfyfedNq7/PIMhM0rzJ06ErpR749Xk5huwWq3k5OSgKAqKohBV1NTgGFQIgc/j55+xQtpu9JOuVfn6YxcFedl0DFRjzDFSUlKCxWLB7XYTjUbRaLWqc3EplNo4Zg0szT4iM1Pmw+o8nn5qhJfKZdoevIVsyKO4uJi8vHwcDgcu1yKyLLPkXu4+farh5obGAM7ZSTyuYTzOP9m5TYc2bQ8PXBVU7NlNYWEhsiwz7XCQpddTWvoMtinb/XNNZz+YnJhY2tT4p65uHvX3UFdbwZayvWwp3oHRaCItLY1gMIhtaoqFBScvbt/O4NDAQOul1rdv37rt3LB5ACoqjx87qK07zs7KV9BotPG/RFEUwuEw7mU32WYzg0ODfe3tV2svX7o8k8xZBxYIvjrZEIetK6yqIITq8brvtLW1vXet89r8ukWJ4PHx8bnJyclbsNrARHDM2OMPMDHt+LfhxLEvhgaHFlNBY9saC4mkA7NJKCu5YfwHVmeRj2HWk9UAAAAASUVORK5CYII=) 0 0 no-repeat; }',
        '.x-editing .x-edit-icon { display: none; }',
        '.x-name-text { display: none; width: 98%; }',
        '.x-icon { height: 16px; width: 16px; }',
        '.x-loading-icon { display: none; width: 16px; height: 16px; position: absolute; top: 3px; right: 5px; background: url(data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==) }',
        '.x-ajax-data .x-loading-icon { display: block; }',
        '.x-tip { display: none; position: absolute; bottom: -21px; right: 0; border: 1px solid #ccc; padding: 1px 3px; }',
        '.x-tip-error { display: block; border-color: #FF8080; background: #fff2f2; }',
        '.x-error input { border-color: #FF8080; }',
        '.x-tip-success { display: block; border-color: #41bf04; background-color: #ecffe3; }',
        '.x-input-bat { width: 50%; margin-left: 5px; margin-right: 5px; }',
        '.x-edit-cancel { margin-left: 5px !important; }',
        '.x-copy-btn { position: absolute; top: 12px; right: 30px; padding: 0px 8px; border: 1px solid #ccc; z-index: 100; }',
        '.mallSearch-input .x-copy-btn { right: 110px; top: 7px; }',
        '.x-copy-con { position: absolute; top: 3px; right: 10px; font-size: 12px; height: 22px; line-height: 24px; }',
        '.x-copy-con span { display: inline-block; color: green; }',
        '.x-copy-con a { display: inline-block; padding: 0 10px; background: #82b4d8; color: #fff!important; }'
    ].join('');

    GM_addStyle(styles);

    var checkbox = $('.stock-table input:checkbox');
    checkbox.on('change', function() {
        setTimeout(function() {
            var hasChecked = false; //默认没有选上的
            checkbox.each(function(index) {
                if ($(this).prop('checked')) { //如果有选中的
                    hasChecked = true;
                    return false;
                }
            });

            $('.stock-table .x-input-bat').prop('disabled', !hasChecked);
        }, 100);
    });

    var stockTable = $('.stock-table');

    $('.item-name div').css({
        position: 'relative'
    }).append($([
        '<input type="text" name="item_name" class="x-name-text" />',
        '<span class="x-edit-icon x-hide"></span>',
        '<span class="x-loading-icon"></span>',
        '<span class="x-tip"></span>'
    ].join(''))).hover(function() {
        $(this).children('.x-edit-icon').removeClass('x-hide').addClass('x-show');
    }, function() {
        $(this).children('.x-edit-icon').removeClass('x-show').addClass('x-hide');
    }).parents('.stock-table').find('thead tr a:last').hide()
        .parent().append($([
            '<input disabled placeholder="格式：{city}移动话费{price}元充值 话费充值{price}元" type="text" class="x-input-bat"/>',
            '<a class="w4d x-edit-bat">批量改名</a>',
            '<a class="x-edit-cancel">取消</a>'
        ].join('')))
        .children('.x-edit-bat').on('click', function(e) {
            e.preventDefault();
            var $this = $(this),
                input = $this.siblings('.x-input-bat');

            if (!input.prop('disabled') && input.val().length > 0) {
                checkbox.each(function(index) {
                    var item = $(this).parents('td').siblings('.item-name').children('div');

                    if ($(this).prop('checked') && item.hasClass('x-editing') && !item.hasClass('x-ajax-data')) {
                        stockTable.trigger('custom.submit', [$(this).parents('tr'), item.find('.x-name-text')]);
                    }
                });
            }

        }).siblings('.x-edit-cancel').on('click', function() {
            console.log('cancel');
        }).siblings('.x-input-bat').keyup(function(e) {
            var tpl = $(this).val(); //名称模板

            checkbox.each(function(index) {
                var $this = $(this),
                    item,
                    input,
                    oldTitle,
                    match,
                    map,
                    title;


                if ($this.prop('checked')) { //进入编辑模式
                    item = $this.parents('tr').find('.item-name div'),
                    input = item.children('input'),
                    oldTitle = item.children('a').text(),
                    match = oldTitle.match(new RegExp(cityList)),
                    map = {
                        city: match && match[0],
                        price: item.parents('.item-name').siblings('.price').children('em').text().replace(/\s*(\d+)元\s*/gi, '$1')
                    },
                    title = tpl.replace(/\{(city|price)\}/gi, function(match, p, offset, str) {
                        return map[p];
                    });
                    if (!item.hasClass('x-editing')) {
                        input.val('').show()
                            .siblings('a').hide()
                            .siblings('.x-tip').removeClass('x-tip-success x-tip-error')
                            .parent().addClass('x-editing');
                    }

                    input.val(title);
                }
            });
        });

    stockTable.on('click', '.x-edit-icon', function(e) {
        var $this = $(this);
        $this.prev('input').val(function() {
            return $(this).prev('a').text();
        }).show().prev().hide()
            .siblings('.x-tip').removeClass('x-tip-success x-tip-error')
            .parent().addClass('x-editing');
    }).on('keydown', '.x-name-text', function(e) {
        if (e.keyCode == 13) {
            //enter
            $(this).parents('.stock-table').trigger('custom.submit', [$(this).parents('tr'), $(this)]);
        } else if (e.keyCode == 27) {
            //esc
            $(this).hide().prev().show().parent().removeClass('x-editing');
        }
    }).on('custom.submit', function(e, tr, input) {
        var url = domain + $(tr).find('td:last-child a').attr('href'),
            title = input.val();

        if (title.length == 0) return;

        input.prop('disabled', true).parent().addClass('x-ajax-data');

        //请求宝贝编辑页面，得到tbPrice，tbcpCrumbs，quantity，detail
        getItemInfo({
            url: url,
            success: function(item) {
                item.title = getGBK(title);
                item.detail = getGBK(htmlDecode(item.detail).replace(/#/gi, '$')).replace(/\$/gi, '#');

                //延迟一段时间进行操作，一般1s左右
                setTimeout(function() {
                    updateItemInfo({
                        itemInfo: item,
                        itemHost: $(tr)
                    });
                }, 1000);
            }
        });
    });

    //得到商品的现有信息

    function getItemInfo(opt) {
        $.ajax({
            type: 'GET',
            url: opt.url,
            success: function(html) {
                var results = html.match(reg),
                    objStr = '',
                    objStrArr = [];

                $.each(results, function(i, result) {
                    objStrArr.push(result.replace(reg2, "\"$1\": \"$3\""));
                });

                objStr = '{' + objStrArr.join(',') + '}';
                result = $.parseJSON(objStr);
                (result.promoted == "checked") && (result.promoted = 1);
                opt.success && opt.success(result);
            },
            dataType: 'html'
        });
    }

    //更新商品信息

    function updateItemInfo(item) {
        var dataArr = [];
        for(var key in item.itemInfo) {
            dataArr.push(key + '=' + item.itemInfo[key]);
        }

        GM_xmlhttpRequest({
            method: 'POST',
            url: updateUrl,
            data: dataArr.join('&'),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            onload: function(response) {
                console.log(response.responseText);
                var r = new RegExp(regResult, 'gim').exec(response.responseText);
                var resultStr = r[1] || r[2];

                item.itemHost.find('.x-editing').removeClass('x-ajax-data').find('input').prop('disabled', false);
                if (resultMap[resultStr]) {
                    resultMap[resultStr].callback && resultMap[resultStr].callback(item);
                } else {
                    alert('修改出错，错误类型未知！');
                }
            }
        });
    }

    //淘宝搜索关键词复制
    var searchBox = $('input[name=q]');
    if (searchBox.length) {
        var copyBtn = $('<a href="#" class="x-copy-btn">复制</a>');
        copyBtn.appendTo(searchBox.parent());
        
    	searchBox.on('keydown', function (e) {
        	var sug = $('.search-popupmenu, .ks-suggest-container');
            if (sug.length && sug.css('visibility') !== 'hidden') {
            	copyBtn.show();
            } else {
            	//copyBtn.hide();
            }
        });
        
        copyBtn.on('click', function (e) {
        	e.preventDefault();
            var text = [];
            $('.search-menuitem .item-text, .ks-suggest-content .ks-suggest-key:last-child').each(function () {
            	text.push($(this).text());
            });
            if (text.length) {
            	GM_setClipboard(text.join('\n'));
           	}
        });
    }
    
    function htmlDecode(html) {
        var div = document.createElement('div');
        div.innerHTML = html;
        return div.innerText || div.textContent;
    }


    function getGBK(str) {
        var iframe = document.createElement("iframe");
        iframe.src = "about:blank";
        iframe.setAttribute("style", "display:none;visibility:hidden;");
        document.body.appendChild(iframe);
        var d = iframe.contentWindow.document;
        d.charset = d.characterSet = "GBK";

        d.write("<body><a href='?" + str + "'>X</a></body>");
        d.close();
        var url = d.body.firstChild.href;

        return url.substr(url.indexOf('?') + 1);
    }
    
    //提取数据指数中的数据
    (function () {
    	var mod = $('.mod');
        mod.find('.title').css('position', 'relative')
        	.append('<div class="x-copy-con"><span style="display: none;"></span><a href="#" title="复制列表" class="x-copy" style="">复制</a><div>')
        	.on('click', 'a', function (e) {
                e.preventDefault();
                var $this = $(this);
                copyList($this.parents('.title').siblings('ol'));
                
                $this.prev().text('复制成功！').fadeIn(function () {
                    $(this).delay(1500).fadeOut();
                });
            });
        
        var copyList = function (list) {
        	var val = [];
            list.children().each(function (i, v) {
                var $this = $(this);
            	val.push($this.find('.key a').text().trim() + '\t' + $this.children('.rise').text().trim());
            });
            
            GM_setClipboard(val.join('\n'));
        };
    })();

})(jQuery);