// ==UserScript==
// @name       more_fund_detail
// @icon       https://www.zlfund.cn/favicon.ico
// @updateURL  http://userscripts.org/scripts/source/176364.user.js
// @namespace  http://use.i.E.your.homepage/
// @version    0.4.1
// @description  show more fund details page
// @run-at      document-end
// @noframes    false
// @include     /https://(\w+\.)?zlfund\.cn\/(trade|fund)\//
// @include     /http://(\w+\.)?jjmmw\.com\/fund\//
// @include     /.*funds?.*/
// @copyright  2013, wonderbeyond
// @require http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// ==/UserScript==

GM_addStyle('\
.alternative-links {\
	position: absolute;\
	z-index: 200;\
	width: 80px;\
	margin: 3px !important;\
	padding: 0 !important;\
	background: rgba(149, 228, 170, 0.85);\
	border: 1px solid rgba(182, 212, 191, 0.47);\
	border-radius: 5px;\
}\
.alternative-links li.panel-title { \
	float: none !important;\
	margin: 0!important; padding: 0!important; \
	color:#DB1616;font-weight:bold;text-align:center;text-indent:0;border-bottom:1px solid #ccc; \
} \
.alternative-links li.link-item { \
	display: block; \
	clear: both; \
	width: 100%; \
	margin: 0!important; padding: 3px 0!important; \
	line-height: 16px!important; \
	text-indent: 0!important; \
	text-align: center!important; \
	border-bottom: 1px dashed #CDC; \
} \
.alternative-links li.link-item a { \
	color: rgb(238, 30, 205); \
	font-weight: normal; \
	display: inline-block; \
	height: 100%; \
} \
');

(function(){
    var alternativeLinks = {
        '基金买卖网': 'http://www.jjmmw.com/fund/{fundcode}/',
        '众禄基金网': 'https://zlfund.cn/fund/{fundcode}/',
        '和讯基金': 'http://jingzhi.funds.hexun.com/{fundcode}.shtml',
        '天天基金':	'http://fund.eastmoney.com/{fundcode}.html',
        '金融界': 'http://fund.jrj.com.cn/archives,{fundcode}.shtml',
        '新浪财经': 'http://finance.sina.com.cn/fund/quotes/{fundcode}/bc.shtml',
    };
    $(document).on('mouseover', 'p,td,span,a,h1,h2,h3,h4', function(e) {
        var $this = $(this);

        if( $this.parents('.alternative-links').length || $this.is('.alternative-links') ) {
            return true;
        }

        if($this.hasClass('alternativeLinksPanelGenerated')){
            return true;
        } else {
            $this.addClass('alternativeLinksPanelGenerated');
        }
        

        var text_sample = this.href || $this.text();
        var fundcode = text_sample.match(/\d{6}/);

        var title = fundcode;
        if(this.href && $this.text() != fundcode) {
            title += $this.text();
        }
        
        if(!fundcode) {
            return true;
        }

        // 初始化提示层
        $('.alternative-links').hide(); //隐藏其它提示层
        var $wrapper = $('<ul class="alternative-links"><li class="panel-title">' +fundcode+ '</li></ul>')
        .css({
            top: $this.offset().top + $this.height() - 8,
            left: $this.offset().left + $this.width() - 20,
        }).appendTo($('body'));
        
        // 生成链接
        for(var i in alternativeLinks){
            var l = alternativeLinks[i].replace('{fundcode}', fundcode);
            
            var $li = $('<li class="link-item">').appendTo($wrapper);
            
            $('<a target="_blank">').text(i).attr('href', l).css({}).appendTo($li);                
        }
        
        // 展示&隐藏
        [ $this, $wrapper ].forEach(function($E){
            $E.hover(function(){
                $('.alternative-links').hide();
                $wrapper.show();
            }, function(){
                if($E === $wrapper){
                    $wrapper.hide();
                }
            });
        });

        return false;
    });
}())
