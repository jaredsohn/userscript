// ==UserScript==
// @name       淘金币
// @namespace  http://userscripts.org/users/541262
// @author     zhoujc
// @version    0.1
// @downloadURL https://userscripts.org/scripts/source/350403.user.js
// @updateURL   https://userscripts.org/scripts/source/350403.meta.js
// @description  快速显示淘金币数据
// @match      http://item.taobao.com/item.htm*
// @require    http://code.jquery.com/jquery-latest.js
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @copyright  2013+, zhoujc
// ==/UserScript==


function getQueryStringRegExp(url, name)
{
    var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");  
    if (reg.test(url))
        return unescape(RegExp.$2.replace(/\+/g, " "));
    return "";
};

shareItem();
shareShop();

function shareItem() {
    var timestamp = Date.parse(new Date());
    var apiurl = 'http://t.taobao.com/cooperate/preload.htm?type=item&itemid=' + g_config.itemId + '&client_id=2&t=' + timestamp;
    GM_log(apiurl);
    
    GM_xmlhttpRequest({
        method: "GET",
        url: apiurl,
        onload: function(xhr) {
            var result = unescape(xhr.responseText);
            var ret = result.match(/&#37329;&#24065;&#65306;(\d+)/g);
            if (ret!==null){
                if ($('div.tb-item-title').html() === undefined)
                	$('div.tb-detail-hd').before('<p style="color:red">分享宝贝得淘' + ret + '</p>');
                else
                	$('div.tb-item-title').before('<p style="color:red">分享宝贝得淘' + ret + '</p>');
            }
            else{
                if ($('div.tb-item-title').html() === undefined)
                	$('div.tb-detail-hd').before('<p>分享宝贝无淘金币:(</p>');
                else
                	$('div.tb-item-title').before('<p>分享宝贝无淘金币:(</p>');
            }
        }
    })
}

function shareShop(){
    var shareshopurl = $('a.tb-shared.share-jianghu').attr('href');
    var shopid = g_config.shopId;
    var timestamp = Date.parse(new Date());
    var apiurl = 'http://t.taobao.com/cooperate/preload.htm?type=shop&client_id=13&shopid=' + shopid + '&t=' + timestamp;
    GM_log(apiurl);
    
    GM_xmlhttpRequest({
        method: "GET",
        url: apiurl,
        onload: function(xhr) {
            var result = unescape(xhr.responseText);
            var ret = result.match(/&#37329;&#24065;&#65306;(\d+)/g);
            if (ret!==null){
                if ($('div.tb-item-title').html() === undefined)
                	$('div.tb-detail-hd').before('<p style="color:blue"><a href ="http://share.jianghu.taobao.com/share/addShare.htm?id='+shopid+'&type=10" target="_blank">分享店铺得淘' + ret + '</a></p>');
                else
                	$('div.tb-item-title').before('<p style="color:blue"><a href ="http://share.jianghu.taobao.com/share/addShare.htm?id='+shopid+'&type=10" target="_blank">分享店铺得淘' + ret + '</a></p>');
            }
            else{
                if ($('div.tb-item-title').html() === undefined)
	                $('div.tb-detail-hd').before('<p>分享店铺无淘金币:(</p>');
                else
    	            $('div.tb-item-title').before('<p>分享店铺无淘金币:(</p>');
            }
        }
    })
}


if ($('div.tb-item-title').html() === undefined)
	$('div.tb-detail-hd').before('http://item.taobao.com/item.htm?id='+g_config.itemId);
else
    $('div.tb-item-title').before('http://item.taobao.com/item.htm?id='+g_config.itemId);
