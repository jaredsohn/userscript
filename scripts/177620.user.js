// ==UserScript==
// @name       wm
// @description  javascript library
// @namespace  https://www.battlenet.com.cn/
// @include        *
// @copyright  2013+, MZach
// @version    0.3
// ==/UserScript==
var qqimg= 'http://wpa.qq.com/imgd?IDKEY=9232f210af7df653247bcaaf5a411f3db820b0b641d9160d&pic=41';
var qq = '<a target="_blank" href="http://sighttp.qq.com/authd?IDKEY=9232f210af7df653247bcaaf5a411f3db820b0b641d9160d"><img border="0" id="qq-img" alt="点击这里给我发消息" title="点击这里给我发消息"/></a>';

var em='<li class="service-cell service-support"><a href="###" onclick="$(\'#assistant-menu\').toggle()" class="service-link service-link-dropdown" tabindex="50" accesskey="4" id="assistant-link" style="cursor: pointer;" rel="javascript">拍卖助手</a><div class="support-menu" id="assistant-menu" style="display:none;"><div class="support-primary"><ul class="support-nav">'+

'<li><a href="###" onmouseover="Tooltip.show(this, \'This is the tooltip text!\');"  class="support-category"><strong class="support-caption">物品设置</strong>需要购买的物品设置。</a></li>'+

'<li><a href="###" id="my-soldSearch" class="support-category"><strong class="support-caption">售出查询</strong>查询售出物品列表。</a></li>'+
'<li><a href="###" id="my-endSearch" class="support-category"><strong class="support-caption">结束查询</strong>查询结束物品列表。</a></li>'+
'<li><a href="###" class="support-category"><strong class="support-caption">关于助手</strong><div>version:内测版（20130910）</div>Powered by <a href="mailto:zachary.woo@163.com">Zachary</a>'+qq+'</a></li>'+

'</ul><span class="clear"><!-- --></span></div><div class="support-secondary"></div></div></li>';
$('#service .service-explore').before(em);
$('#qq-img').attr('src',qqimg);

var logH='<div class="auction-house overview"><h3 class="subheader">工作日志</h3><div id="log-content" style="overflow-y: scroll; height:200px"></div></div>';
$('.auction-house').prepend(logH);

/*收取金币功能菜单*/
$('#money').append("<a href='###' id='my-claimMoney'><img data-tooltip='点击收取金币' src='data:image/png;base64,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'/></a>");

//隐藏无用部分
$('.mobile-authenticator,.navigation').hide();