// ==UserScript==
// @name           Edde's
// @description    add additional RT style to Netease
// @namespace      robaggio.net
// @version        1.0
// @date           2010-08-08
// @include        http://t.163.com/*
// ==/UserScript==
// Changes
// 1.0 2010-07-15 first edition.
// 1.1 2010-07-22 search back.
// 1.2 2010-07-31 for newb 2.0, quote retweet.
// 1.2.1 2010-08-01 quote retweet for microlife page.
// 1.2.2 2010-08-02 html decode & reply div css
// 2.0 2010-08-07 merge firefox script and chrome script, add deep retweet and vancl
// 2.1 2010-09-05 rounded corner icon & linked source
// 2.2 2010-09-06 checkbox for linked source
//version for auto update
var ffrb_version = "2.2";
isChrome = navigator.userAgent.indexOf("Chrome") > -1 ; 

// * Feature 1: css style
GM_addStyle("/*hometimeline top padding*/.status-update  {height:190px;   !important;} .timeLine{margin-top:5px !important;}/*reply bubble*/.status-communion-bd{ padding:5px !important;}.status-communion .fn-link {padding-top:2px !important;} /*retweet name*/.status-retwitter-list a,.status-retwitter-list a:visited,.status-retwitter-list-nopad a, .status-retwitter-list-nopad a:visited{color:red;}");
//rounded corner icon
GM_addStyle(".statuses .author{display:inline-block;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;border:solid 0px #999;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.5);-moz-box-shadow:0 1px 3px rgba(0,0,0,.5);}.statuses .author{margin-left:-58px;}.statuses .author img{opacity:0;}");

function main(isChrome){
	if(isChrome){
		unsafeWindow = window;
	}
	
	// * Feature 2: quote retweet
	var area = unsafeWindow.$('#sendinfo_text');
	unsafeWindow.quote_retweet = function(id){
		var status = unsafeWindow.Status.data[id];
		var rttext = status._text;
		var temp = document.createElement("div");
		temp.innerHTML = rttext;
		rttext = temp.textContent;
		if(status._quoterShowName){
			temp.innerHTML = status._quoterText;
			rttext = rttext.replace(/@.*?[，\s]/,'');
			rttext = " 转@" + status._user.name + " " + rttext+ " 转@" + status._quoterShowName + " " + temp.textContent;
		}else{
			rttext = " 转@" + status._user.name + " " + rttext;
		}
		temp = null;
		if(area){
			area.value = rttext;
			unsafeWindow.$.one('.status-update').scrollIntoView();
			area.focus();
			area.selectionStart =0;
			area.selectionEnd = 0; 

		}else{
			//GM_setValue("quote_retweet_text",encodeURIComponent (unsafeWindow.Status.data[id]._text));
			unsafeWindow.$.cookie.set("quote_retweet_text", encodeURIComponent (rttext), 5, null, "/");
			window.location.href = "/home";
		}
		return false;
	}

	//if it is a refresh action
		var quote_retweet_text = unsafeWindow.$.cookie.get("quote_retweet_text")//GM_getValue("quote_retweet_text",'');
		if(quote_retweet_text!='' && area)
		{
			area.value = decodeURIComponent (quote_retweet_text);
			area.focus();
			area.selectionStart =0;
			area.selectionEnd = 0; 
			//GM_setValue("quote_retweet_text",'');
			unsafeWindow.$.cookie.del("quote_retweet_text");
		}

//2.1.2 2010-08-19 15:25
	unsafeWindow.templates["status"] = "<# if( status._id && status._id != null && status._user != null) { #>\r\n\t\t\t<# if (status._truncated) { #>\r\n\t\t\t\t<# if(listPage._action == \"favorites\" && listPage._isOwnPage) { #>\r\n\t\t\t\t   <li id=\"<#=status._id#>\" class=\"warning\">                  \r\n\t\t\t\t   \t  <div class=\"status clearfix\">                                \r\n\t\t\t\t   \t      <p class=\"message\"><# if (listPage._pageType == \"search\" ) { #><#=status._htmlText#><# } else { #><#=status._htmlTextNoLink#><# } #>\t</p><p class=\"fn-link clearfix\"><span class=\"fr option\"><a class=\"aLink hidden\" id=\"<#=status._id#>_addfav\" onclick=\"Status.data['<#=status._id#>'].addfav(this);\" href=\"javascript:void(0)\">\u6536\u85cf</a><a class=\"aLink\" id=\"<#=status._id#>_cancelfav\" onclick=\"Status.data['<#=status._id#>'].cancelfav(this);\" href=\"javascript:void(0)\">\u4e0d\u518d\u63d0\u793a</a></span></p>  \r\n\t\t\t\t   \t  </div>   \r\n\t\t\t\t   </li>\r\n\t\t\t\t<# } else if(listPage._pageType == \"communion\" || (listPage._pageType == \"home\" && (status._id == \"3169172771916520466\" || status._id == \"-403116110339849794\"))) { #>\r\n\t\t\t\t   <li id=\"<#=status._id#>\">                  \r\n\t\t\t\t   \t  <div class=\"status clearfix\">                                \r\n\t\t\t\t   \t       <!--newb--><span class=\"author\" style=\"background: url(\'http://oimage<#=status._omageNum#>.ydstatic.com/image?w=48&h=48&url=<#if(status._user.profile_image_url != \"\" && status._user.profile_image_url != \"http://img1.cache.netease.com/t/img/default48.png\" && status._user.profile_image_url != \"http://img1.cache.netease.com/t/img/default80.png\") {#><#=encodeURIComponent(status._user.profile_image_url)#><# } else {#>http://mimg.126.net/p/butter/1008031648/img/face_big.gif<# } #>\') no-repeat scroll left top transparent;width:48px;height:48px\" ><a href=\"/<#=status._user.screen_name#>\"><img height=\"48\" width=\"48\" alt=\"<#=status._user.name#>\" title=\"<#=status._user.name#>\" class=\"thumb\" src=\"http://oimage<#=status._omageNum#>.ydstatic.com/image?w=48&h=48&url=<#if(status._user.profile_image_url != \"\" && status._user.profile_image_url != \"http://img1.cache.netease.com/t/img/default48.png\" && status._user.profile_image_url != \"http://img1.cache.netease.com/t/img/default80.png\") {#><#=encodeURIComponent(status._user.profile_image_url)#><# } else {#>http://mimg.126.net/p/butter/1008031648/img/face_big.gif<# } #>\"/></a></span><p class=\"message\"><span class=\"entry\"><a href=\"/<#=status._user.screen_name#>\"><#=status._user.name#></a><# if(status._isActive) {#><a href=\"http://t.163.com/shuangxi_wedding/status/-3832473099249763353\" title=\"\u6211\u5728\u53c2\u52a0\u53cc\u559c\u6d3b\u52a8\uff0c\u70b9\u51fb\u56fe\u6807\u67e5\u770b\u6d3b\u52a8\u8be6\u60c5\" target=\"_blank\" class=\"happiness\">\u53cc\u559c</a><# } #>\uff1a</span><#=status._htmlTextNoLink#></p> \r\n\t\t\t\t   \t  </div>   \r\n\t\t\t\t   </li>\r\n\t\t\t\t<# }  #>\r\n\t\t\t<# } else { #>\r\n\t\t\t\t\t <li id=\"<#=status._id#>\" <# if(config.isSendStatus) {#>style=\"height:0px;overflow:hidden;\"<#} #><# if( listPage._isNewMess) { #> class=\"hidden\" <# } #> <# if( $.browser.msie && $.browser.version < 7 ){ #>onmouseover=\"Status.data['<#=status._id#>'].mouseover();\" onmouseout=\"Status.data['<#=status._id#>'].mouseout();\"<# } #>>\r\n\t\t\t\t\t\t    <# if (listPage._photo) { #>\r\n\t\t\t\t\t\t        <div class=\"status clearfix\">\r\n\t\t\t\t\t\t\t\t       <!--newb--><span class=\"author\" style=\"background: url(\'http://oimage<#=status._omageNum#>.ydstatic.com/image?w=48&h=48&url=<#if(status._user.profile_image_url != \"\" && status._user.profile_image_url != \"http://img1.cache.netease.com/t/img/default48.png\" && status._user.profile_image_url != \"http://img1.cache.netease.com/t/img/default80.png\") {#><#=encodeURIComponent(status._user.profile_image_url)#><# } else {#>http://mimg.126.net/p/butter/1008031648/img/face_big.gif<# } #>\') no-repeat scroll left top transparent;width:48px;height:48px\">\r\n\t\t\t\t\t\t\t\t           <a href=\"/<#=status._user.screen_name#>\"><img height=\"48\" width=\"48\" alt=\"<#=status._user.name#>\" title=\"<#=status._user.name#>\" class=\"thumb\" src=\"http://oimage<#=status._omageNum#>.ydstatic.com/image?w=48&h=48&url=<#if(status._user.profile_image_url != \"\" && status._user.profile_image_url != \"http://img1.cache.netease.com/t/img/default48.png\" && status._user.profile_image_url != \"http://img1.cache.netease.com/t/img/default80.png\") {#><#=encodeURIComponent(status._user.profile_image_url)#><# } else {#>http://mimg.126.net/p/butter/1008031648/img/face_big.gif<# } #>\"/></a>\r\n\t\t\t\t\t\t\t\t       </span>\r\n\t\t\t\t\t\t\t\t       <p class=\"message\"><span <# if (listPage._pageType == \"home\" && listPage._action == \"home\" && status._user.id != userInfo._id && !status._user.following) { #>class=\"entry status-communion-icon0\" title=\"\u4f60\u5173\u6ce8\u7684\u4eba\u8f6c\u53d1\u4e86\u6b64\u5fae\u535a\"<# } else if((status._orgCreateTime.getTime() != status._maxId && status._user.id != userInfo._id && listPage._pageType == \"mine\") || (listPage._pageType == \"home\" && listPage._action == \"mine\"&& status._user.id != userInfo._id )){ #>class=\"entry status-communion-icon0\" title=\"<#=listPage._username#>\u5173\u6ce8\u7684\u4eba\u8f6c\u53d1\u4e86\u6b64\u5fae\u535a\"<# } else { #>class=\"entry\"<# }#>><a href=\"/<#=status._user.screen_name#>\"><#=status._user.name#></a><# if(status._isActive) {#><a href=\"http://t.163.com/shuangxi_wedding/status/-3832473099249763353\" title=\"\u6211\u5728\u53c2\u52a0\u53cc\u559c\u6d3b\u52a8\uff0c\u70b9\u51fb\u56fe\u6807\u67e5\u770b\u6d3b\u52a8\u8be6\u60c5\" target=\"_blank\" class=\"happiness\">\u53cc\u559c</a><# } #>\uff1a</span><# if (listPage._pageType == \"search\" ) { #><#=status._htmlText#><# } else { #><#=status._htmlTextNoLink#><# } #></p>   \r\n\t\t\t\t\t\t    <# } else { #> \r\n\t\t\t\t\t\t      \t<div class=\"status no-thumb clearfix\"> \r\n\t\t\t\t\t\t      \t<p class=\"message\"><# if(status._user.id != listPage._id) {#><span class=\"entry <# if (status._orgCreateTime.getTime() != status._maxId && status._user.id != listPage._id ) { #>status-communion-icon0<# } #>\" title=\"<#=listPage._username#>\u8f6c\u53d1\u4e86\u6b64\u5fae\u535a\"><a href=\"/<#=status._user.screen_name#>\"><#=status._user.name#></a><# if(status._isActive) {#><a href=\"http://t.163.com/shuangxi_wedding/status/-3832473099249763353\" title=\"\u6211\u5728\u53c2\u52a0\u53cc\u559c\u6d3b\u52a8\uff0c\u70b9\u51fb\u56fe\u6807\u67e5\u770b\u6d3b\u52a8\u8be6\u60c5\" target=\"_blank\" class=\"happiness\">\u53cc\u559c</a><# } #>\uff1a</span><# } #><# if (listPage._pageType == \"search\" ) { #><#=status._htmlText#><# } else { #><#=status._htmlTextNoLink#><# } #></p>\r\n\t\t\t\t\t\t     <# } #>\r\n\t\t\t\t\t\t     <# if (status._uploadImg && listPage._pageType != \"onelist\" ) { #>\r\n\t\t\t\t\t\t\t\t    <div class=\"status-sPhoto\" id=\"<#=status._imgName#>sDiv\">\r\n\t\t\t\t\t\t           <img src=\"<#=status._uploadImgSmall#>\" onerror=\"listPage.loadError(this,'<#=status._id#>')\" onload=\"listPage.loadSmallImg(this)\" onclick=\"listPage.showBigImg(this, '<#=status._uploadImg#>', '<#=status._id#>','Img')\" class=\"status-sPhoto-img hidden\" />\r\n\t\t\t\t\t\t           <span class=\"loading hidden\" id=\"<#=status._imgName#>Loading\"></span>\r\n\t\t\t\t\t\t\t\t\t  </div>\r\n\t\t\t\t\t\t     <# } #>\r\n\t\t\t\t\t\t     <# if (status._uploadImg && listPage._pageType == \"onelist\" ) { #> \r\n\t\t\t\t\t\t        <div class=\"status-bPhoto clearfix hidden\" id=\"<#=status._imgName#>div\"> \r\n\t\t\t\t\t\t\t\t      <div class=\"status-bPhoto-control clearfix\">\r\n\t\t\t\t\t\t            \t<a title=\"\u5411\u5de6\u8f6c\xb0\" href=\"javascript:void(0)\" class=\"i2\" onclick=\"listPage.goAround('<#=status._imgShortName#>','<#=status._id#>', -1)\"><span class=\"i\">\u5411\u5de6\u8f6c</span></a> \r\n\t\t\t\t\t\t            \t<a title=\"\u5411\u53f3\u8f6c\" href=\"javascript:void(0)\" class=\"i3\" onclick=\"listPage.goAround('<#=status._imgShortName#>','<#=status._id#>', 1)\"><span class=\"i\">\u5411\u53f3\u8f6c</span></a>\r\n\t\t\t\t\t\t            \t<a title=\"\u67e5\u770b\u539f\u56fe\" href=\"<#=status._uploadImg#>\" class=\"i4\" target=\"_blank\"><span class=\"i\">\u67e5\u770b\u539f\u56fe</span></a>\r\n\t\t\t\t\t\t            </div>\r\n\t\t\t\t\t\t            <div class=\"status-bPhoto-content clearfix\">\r\n\t\t\t\t\t\t            \t<img  alt=\"<#=status._uploadImg#>\" src=\"<#=status._uploadImgBig#>\" id=\"<#=status._imgName#>\" onerror=\"listPage.loadError($('#<#=status._imgName#>div'),'<#=status._id#>')\" onload=\"listPage.hiddenLoadingImg('<#=status._imgShortName#>','<#=status._id#>')\"/>\r\n\t\t\t\t\t\t            </div>\r\n\t\t\t\t\t\t        </div>\r\n\t\t\t\t\t\t     <# } #>\r\n\t\t\t\t\t\t     <# if (status._quoterId && status._quoterText && listPage._pageType != \"communion\") { #>\r\n\t\t\t\t\t\t\t      \t <div class=\"<# if (listPage._photo) { #>status-communion<# } else { #>status-communion status-communion-w530<# } #>\" >\r\n    \t                \t  <span class=\"status-communion-angle status-communion-tleft\"></span>\r\n    \t                \t  <span class=\"status-communion-angle status-communion-tright\"></span>\r\n                          <div class=\"status-communion-bd\">\r\n                              <p class=\"message\"><a class=\"entry\" href=\"http://t.163.com/n/<#=status._encodeQuoterShowName#>\"><#=status._quoterShowName#></a><# if(status._isQuoteActive) {#><a href=\"http://t.163.com/shuangxi_wedding/status/-3832473099249763353\" title=\"\u6211\u5728\u53c2\u52a0\u53cc\u559c\u6d3b\u52a8\uff0c\u70b9\u51fb\u56fe\u6807\u67e5\u770b\u6d3b\u52a8\u8be6\u60c5\" target=\"_blank\" class=\"happiness\">\u53cc\u559c</a><# } #>\uff1a<#=status._htmlQuoterText#></p>\r\n                              <# if (status._uploadQuoterImg) { #>\r\n\t\t\t\t\t\t\t            \t    <div class=\"status-communion-photo\" id=\"<#=status._imgQuoterName#>_<#=status._id#>sDiv\">\r\n\t\t\t\t\t\t                       <img src=\"<#=status._uploadQuoterImgSmall#>\" onerror=\"listPage.loadError(this,'<#=status._quoterId#>')\" onload=\"listPage.loadSmallImg(this)\" onclick=\"listPage.showBigImg(this, '<#=status._uploadQuoterImg#>', '<#=status._quoterId#>_<#=status._id#>', 'QuoteImg')\" class=\"status-sPhoto status-sPhoto-img hidden\" />\r\n\t\t\t\t\t\t                       <span class=\"loading hidden\" id=\"<#=status._imgQuoterName#>_<#=status._id#>Loading\"></span>\r\n\t\t\t\t\t\t\t            \t\t  </div>\r\n\t\t\t\t\t\t                 <# } #>\r\n\t\t\t\t\t\t                 <div class=\"fn-link\">                        \r\n\t\t\t\t\t\t                     <a class=\"time\" href=\"/<#=status._quoterScreenName#>/status/<#=status._quoterId#>\"><#=status._quoterTime#></a> \u6765\u81ea<#=status._quoterSource#> <#if(status._quoterRetweetCount > 0){#><a href=\"/<#=status._quoterScreenName#>/status/<#=status._quoterId#>\">\u539f\u6587\u8f6c\u53d1<#=status._quoterRetweetCount#>\u6b21</a><# } #>           \r\n\t\t\t\t\t\t                 </div>\r\n                          </div>\r\n                          <span class=\"status-communion-angle status-communion-bleft\"></span>\r\n    \t                    <span class=\"status-communion-angle status-communion-bright\"></span>\r\n    \t                </div>\r\n\t\t\t\t\t\t\t    <# } #>\r\n\t\t\t\t\t\t        <div class=\"fn-link clearfix\" id=\"<#=status._id#>_fnLink\">\r\n\t\t\t\t\t\t           <span class=\"fl\"><a href=\"/<#=status._user.screen_name#>/status/<#=status._id#>\" class=\"time\"><# if( listPage._pageType == \"onelist\" ) { #><#=status._detailTime#><# }  else { #><#=status._createTime#><# } #></a> \u6765\u81ea<#=status._source#><# if (status._quoterId && status._quoterId != status._rootReplyId && listPage._pageType != \"communion\") { #><a title=\"\u67e5\u770b\u6574\u4e2a\u5bf9\u8bdd\" href=\"/related/<#=status._id#>\" class=\"status-communion-icon1\" target=\"_blank\">\u67e5\u770b\u5bf9\u8bdd</a> <# } #></span> \r\n\t\t\t\t\t\t        <# if (listPage._pageType != \"parkPage\" ) { #> \r\n\t\t\t\t\t\t           <span class=\"fr option\"><!--newb--><a href=\"#\" class=\"aLink\" title=\"一 一+ 经典转发又回来啦\" onclick=\"return quote_retweet('<#=status._id#>')\" >引用转发</a>|<a onclick=\"Status.data['<#=status._id#>'].quote(this);\" href=\"javascript:void(0)\" class=\"aLink\" title=\"\u8bc4\u8bba\u8fd9\u6761\u5fae\u535a\">\u8bc4\u8bba</a>|<# if (userInfo._id != status._user.id) { #><# if( status._is_retweet) { #><span class=\"aLink\">\u5df2\u8f6c\u53d1(<a class=\"note\" id=\"<#=status._id#>_retweetCount\" title=\"\u6709<#=status._retweetCount#>\u4eba\u8f6c\u53d1\" href=\"/<#=status._user.screen_name#>/status/<#=status._id#>\"><#=status._retweetCount#></a>),<a href=\"javascript:void(0)\" onclick=\"Status.data['<#=status._id#>'].retwitter(this,false);\" title=\"\u64a4\u9500\u8f6c\u53d1\">\u64a4\u9500</a></span>|<# } else { #><span class=\"aLink\"><a href=\"javascript:void(0)\" onclick=\"Status.data['<#=status._id#>'].retwitter(this,true);\" title=\"\u8f6c\u53d1\u8fd9\u6761\u5fae\u535a\">\u8f6c\u53d1</a><# if(parseInt(status._retweetCount) > 0) {#>(<a class=\"note\" id=\"<#=status._id#>_retweetCount\" title=\"\u6709<#=status._retweetCount#>\u4eba\u8f6c\u53d1\" href=\"/<#=status._user.screen_name#>/status/<#=status._id#>\"><#=status._retweetCount#></a>)<# } #></span>|<# } #><# } else { #><span class=\"aLink\" title=\"\u4e0d\u80fd\u8f6c\u53d1\u81ea\u5df1\u7684\u5fae\u535a\">\u8f6c\u53d1<# if(parseInt(status._retweetCount) > 0) {#>(<a class=\"note\" title=\"\u6709<#=status._retweetCount#>\u4eba\u8f6c\u53d1\" href=\"/<#=status._user.screen_name#>/status/<#=status._id#>\"><#=status._retweetCount#></a>)<# } #></span>|<# } #><# if (status._fav) { #><# if (userInfo._id == status._user.id && !status._truncated && listPage._pageType != \"communion\") { #><span class=\"aLink\"><a onclick=\"Status.data['<#=status._id#>'].deleteStatus(this);\" href=\"javascript:void(0)\" class=\"aLink\" title=\"\u5220\u9664\u8fd9\u6761\u5fae\u535a\">\u5220\u9664</a></span>|<# } #><a id=\"<#=status._id#>_addfav\"  onclick=\"Status.data['<#=status._id#>'].addfav(this);\" href=\"javascript:void(0)\" class=\"aLink hidden\" title=\"\u6536\u85cf\u8fd9\u6761\u5fae\u535a\">\u6536\u85cf</a><a id=\"<#=status._id#>_cancelfav\" onclick=\"Status.data['<#=status._id#>'].cancelfav(this);\" href=\"javascript:void(0)\" class=\"aLink\" title=\"\u53d6\u6d88\u6536\u85cf\">\u53d6\u6d88\u6536\u85cf</a><# } else { #><# if (userInfo._id == status._user.id && !status._truncated) { #><span class=\"aLink\"><a onclick=\"Status.data['<#=status._id#>'].deleteStatus(this);\" href=\"javascript:void(0)\" class=\"aLink\" title=\"\u5220\u9664\u8fd9\u6761\u5fae\u535a\">\u5220\u9664</a></span>|<# } #><a id=\"<#=status._id#>_addfav\" onclick=\"Status.data['<#=status._id#>'].addfav(this);\" href=\"javascript:void(0)\" class=\"aLink\" title=\"\u6536\u85cf\u8fd9\u6761\u5fae\u535a\">\u6536\u85cf</a><a id=\"<#=status._id#>_cancelfav\" onclick=\"Status.data['<#=status._id#>'].cancelfav(this);\" href=\"javascript:void(0)\" class=\"aLink hidden\" title=\"\u53d6\u6d88\u6536\u85cf\">\u53d6\u6d88\u6536\u85cf</a><# } #></span>\r\n\t\t\t\t\t\t        <# } else {#><span class=\"fr option\"><a href=\"#\" class=\"aLink\" title=\"一 一+ 经典转发又回来啦\" onclick=\"return quote_retweet('<#=status._id#>')\" >引用转发</a>|<a onclick=\"Status.data['<#=status._id#>'].quote(this);\" href=\"javascript:void(0)\" class=\"aLink\" title=\"\u8bc4\u8bba\u8fd9\u6761\u5fae\u535a\">\u8bc4\u8bba</a>|<# if (userInfo._id != status._user.id) { #><# if( status._is_retweet) { #><span class=\"aLink\">\u5df2\u8f6c\u53d1(<a class=\"note\" id=\"<#=status._id#>_retweetCount\" title=\"\u6709<#=status._retweetCount#>\u4eba\u8f6c\u53d1\" href=\"/<#=status._user.screen_name#>/status/<#=status._id#>\"><#=status._retweetCount#></a>),<a href=\"javascript:void(0)\" onclick=\"Status.data['<#=status._id#>'].retwitter(this,false);\" title=\"\u64a4\u9500\u8f6c\u53d1\">\u64a4\u9500</a></span>|<# } else { #><span class=\"aLink\"><a href=\"javascript:void(0)\" onclick=\"Status.data['<#=status._id#>'].retwitter(this,true);\" title=\"\u8f6c\u53d1\u8fd9\u6761\u5fae\u535a\">\u8f6c\u53d1</a><# if(parseInt(status._retweetCount) > 0) {#>(<a class=\"note\" id=\"<#=status._id#>_retweetCount\" title=\"\u6709<#=status._retweetCount#>\u4eba\u8f6c\u53d1\" href=\"/<#=status._user.screen_name#>/status/<#=status._id#>\"><#=status._retweetCount#></a>)<# } #></span>|<# } #><# } else { #><span class=\"aLink\" title=\"\u4e0d\u80fd\u8f6c\u53d1\u81ea\u5df1\u7684\u5fae\u535a\">\u8f6c\u53d1<# if(parseInt(status._retweetCount) > 0) {#>(<a class=\"note\" title=\"\u6709<#=status._retweetCount#>\u4eba\u8f6c\u53d1\" href=\"/<#=status._user.screen_name#>/status/<#=status._id#>\"><#=status._retweetCount#></a>)<# } #></span>|<# } #><# if (status._fav) { #><a id=\"<#=status._id#>_addfav\"  onclick=\"Status.data['<#=status._id#>'].addfav(this);\" href=\"javascript:void(0)\" class=\"aLink hidden\" title=\"\u6536\u85cf\u8fd9\u6761\u5fae\u535a\">\u6536\u85cf</a><a id=\"<#=status._id#>_cancelfav\" onclick=\"Status.data['<#=status._id#>'].cancelfav(this);\" href=\"javascript:void(0)\" class=\"aLink\" title=\"\u53d6\u6d88\u6536\u85cf\">\u53d6\u6d88\u6536\u85cf</a><# } else { #><a id=\"<#=status._id#>_addfav\" onclick=\"Status.data['<#=status._id#>'].addfav(this);\" href=\"javascript:void(0)\" class=\"aLink\" title=\"\u6536\u85cf\u8fd9\u6761\u5fae\u535a\">\u6536\u85cf</a><a id=\"<#=status._id#>_cancelfav\" onclick=\"Status.data['<#=status._id#>'].cancelfav(this);\" href=\"javascript:void(0)\" class=\"aLink hidden\" title=\"\u53d6\u6d88\u6536\u85cf\">\u53d6\u6d88\u6536\u85cf</a><# } #></span>\r\n\t\t\t\t\t\t        <# } #>\r\n\t\t\t\t\t\t       </div>\r\n\t\t\t\t\t\t     </div>\r\n\t\t\t\t\t\t   <# if (listPage._pageType == \"onelist\"){ #>\r\n   \t\t\t       \t   <div class=\"fn-link status-retwitter-list<# if(status._topRetweetUsers == \"\") { #> hidden <# } #>\" id=\"<#=status._id#>_retwitterList\" >\u7531 <span id=\"<#=status._id#>_retwitter\"><#=status._topRetweetUsers#></span> <# if (parseInt(status._retweetCount) > parseInt(status._realLen)) { #>\u7b49<# } #> \u8f6c\u53d1 <a class=\"entry <# if(parseInt(status._retweetCount) < (config.showRetwitterNum + 1) ) {#>hidden<# } #>\" id=\"<#=status._id#>_more\"<# if (listPage._pageType == \"onelist\") { #>href=\"javascript:void(0)\"  onclick=\"Status.data['<#=status._id#>'].getMoreRetwitter()\"<# } else {#>href=\"/<#=status._user.screen_name#>/status/<#=status._id#>\" <# } #>>\u66f4\u591a&gt;&gt;</a></div>\r\n   \t\t\t       <# } else  if (listPage._pageType == \"home\" && listPage._action == \"rt\"){ #>\r\n   \t\t\t       \t   <div class=\"fn-link status-retwitter-list<# if(status._retweetUsers == \"\") { #> hidden <# } #>\" id=\"<#=status._id#>_retwitterList\" >\u7531 <span id=\"<#=status._id#>_retwitter\"><#=status._retweetUsers#></span> <# if ((!status._is_retweet && parseInt(status._retweetCount) > parseInt(status._realLen)) || (status._is_retweet && parseInt(status._retweetCount) > parseInt(status._realLen) + 1)) { #>\u7b49<# } #> \u8f6c\u53d1 <a class=\"entry <# if(parseInt(status._retweetCount) < (config.showRetwitterNum + 1) ) {#>hidden<# } #>\" id=\"<#=status._id#>_more\"<# if (listPage._pageType == \"onelist\") { #>href=\"javascript:void(0)\"  onclick=\"Status.data['<#=status._id#>'].getMoreRetwitter()\"<# } else {#>href=\"/<#=status._user.screen_name#>/status/<#=status._id#>\" <# } #>>\u66f4\u591a&gt;&gt;</a></div>\r\n   \t\t\t       \t<# } else if(listPage._pageType == \"mine\" ){ #>\r\n   \t\t\t       \t     <div class=\"status-retwitter-list-nopad fn-link<# if(status._user.screen_name == listPage._screenName && !status._is_retweet) { #> hidden <# } #>\" id=\"<#=status._id#>_retwitterList\" >\u7531 <span id=\"<#=status._id#>_retwitter\"><# if( status._is_retweet && userInfo._userName != listPage._username ) { #><a href=\"http://t.163.com/n/<#=userInfo._userName#>\" class=\"entry\"><#=userInfo._userName#></a><# } #><# if(status._user.screen_name != listPage._screenName && status._is_retweet && userInfo._userName != listPage._username) { #>\u3001<# } #><# if( status._user.screen_name != listPage._screenName) { #><a href=\"http://t.163.com/<#=listPage._screenName#>\" class=\"entry\"><#=listPage._username#></a><# } #></span> <span>\u8f6c\u53d1</span></div>\r\n   \t\t\t       \t<# } else  if (listPage._pageType == \"communion\"){ #><div class=\"status fn-link<# if(!status._is_retweet) { #> hidden <# } #>\" id=\"<#=status._id#>_retwitterList\" >\u7531 <span id=\"<#=status._id#>_retwitter\"><a href=\"http://t.163.com/n/<#=userInfo._userName#>\" class=\"entry\"><#=userInfo._userName#></a></span> \u8f6c\u53d1<a class=\"entry <# if(parseInt(status._retweetFollowedCount) == parseInt(status._realLen)) { #>hidden<# } #>\" href=\"/<#=status._user.screen_name#>/status/<#=status._id#>\" id=\"<#=status._id#>_more\">\u66f4\u591a&gt;&gt;</a></div>\r\n   \t\t\t        <# } else { #>\r\n\t\t\t\t\t\t       <div class=\"status fn-link <# if(listPage._pageType != \"mine\") { #>status-retwitter-list<# } #><# if(status._retweetUsers == \"\") { #> hidden <# } #>\" id=\"<#=status._id#>_retwitterList\" >\u7531 <span id=\"<#=status._id#>_retwitter\"><#=status._retweetUsers#></span> <# if((!status._is_retweet && parseInt(status._retweetCount) > parseInt(status._realLen)) || (status._is_retweet && parseInt(status._retweetCount) > parseInt(status._realLen) + 1)) { #>\u7b49<# } #>\u8f6c\u53d1 <a class=\"entry <# if((parseInt(status._retweetFollowedCount) == parseInt(status._realLen)) || (listPage._action == \"rt\" && parseInt(status._realLen) == status._retweetCount)) { #>hidden<# } #>\" href=\"/<#=status._user.screen_name#>/status/<#=status._id#>\" id=\"<#=status._id#>_more\">\u66f4\u591a&gt;&gt;</a></div>\r\n   \t\t\t        <# } #>\r\n\t\t\t</li>\r\n\t <# } #>\r\n <# } #>";

	unsafeWindow.templates["retwitterList"] = "<# if( status._id && status._id != null && status._user != null) { #>\r\n\t\t\t<li id=\"<#=status._id#>\" <# if( $.browser.msie && $.browser.version < 7 ){ #>onmouseover=\"Status.data['<#=status._id#>'].mouseover();\" onmouseout=\"Status.data['<#=status._id#>'].mouseout();\"<# } #>>\r\n\t\t\t     <div class=\"status clearfix\">\r\n\t\t\t        <div class=\"transmit\">\r\n                  <span class=\"note\">\u65b0\u589e\u8f6c\u53d1</span>\r\n                  <span class=\"num\"><#=_cn#></span>\r\n              </div>\r\n\t\t\t\t\t    <p class=\"message\">\r\n\t\t\t\t          <span class=\"entry\">\r\n\t\t\t\t          <a href=\"/<#=status._user.screen_name#>\"><#=status._user.name#></a>\uff1a</span> \r\n\t\t\t\t   \t      <#=status._htmlTextNoLink#>\r\n\t\t\t\t      </p>   \r\n\t\t\t     <# if (status._uploadImg) { #>\r\n\t\t\t\t\t\t  <div class=\"status-sPhoto\" id=\"<#=status._imgName#>sDiv\">\r\n\t\t\t\t\t\t     <img src=\"<#=status._uploadImgSmall#>\" onerror=\"listPage.loadError(this,'<#=status._id#>')\" onload=\"listPage.loadSmallImg(this)\" onclick=\"listPage.showBigImg(this, '<#=status._uploadImg#>', '<#=status._id#>','Img')\" class=\"status-sPhoto-img hidden\" />\r\n\t\t\t\t\t\t     <span class=\"loading hidden\" id=\"<#=status._imgName#>Loading\"></span>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t     <# } #>\r\n\t\t\t     <# if (status._quoterId && status._quoterText && listPage._pageType != \"communion\") { #>\r\n\t\t\t\t      \t <div class=\"status-communion\" >\r\n    \t           \t  <span class=\"status-communion-angle status-communion-tleft\"></span>\r\n    \t           \t  <span class=\"status-communion-angle status-communion-tright\"></span>\r\n                     <div class=\"status-communion-bd\">\r\n                         <p class=\"message\">\r\n                              <a class=\"entry\" href=\"http://t.163.com/n/<#=status._encodeQuoterShowName#>\"><#=status._quoterShowName#></a>\uff1a\r\n                              <#=status._htmlQuoterText#>\r\n                         </p>\r\n                         <# if (status._uploadQuoterImg) { #>\r\n\t\t\t\t            \t\t  <div class=\"status-communion-photo\" id=\"<#=status._imgQuoterName#>_<#=status._id#>sDiv\">\r\n\t\t\t\t\t\t                 <img src=\"<#=status._uploadQuoterImgSmall#>\" onerror=\"listPage.loadError(this,'<#=status._quoterId#>')\" onload=\"listPage.loadSmallImg(this)\" onclick=\"listPage.showBigImg(this, '<#=status._uploadQuoterImg#>', '<#=status._quoterId#>_<#=status._id#>', 'QuoteImg')\" class=\"status-sPhoto hidden\" />\r\n\t\t\t\t\t\t                 <span class=\"loading hidden\" id=\"<#=status._imgQuoterName#>_<#=status._id#>Loading\"></span>\r\n\t\t\t\t\t\t\t            </div>\r\n\t\t\t                 <# } #>\r\n\t\t\t                 <div class=\"fn-link\">                        \r\n\t\t\t                     <a class=\"time\" href=\"/<#=status._quoterScreenName#>/status/<#=status._quoterId#>\"><#=status._quoterTime#></a>\u6765\u81ea<#=status._quoterSource#>              \r\n\t\t\t                 </div>\r\n                     </div>\r\n                     <span class=\"status-communion-angle status-communion-bleft\"></span>\r\n    \t               <span class=\"status-communion-angle status-communion-bright\"></span>\r\n    \t           </div>\r\n\t\t\t\t    <# } #>\r\n\t\t\t        <div class=\"fn-link clearfix\" id=\"<#=status._id#>_fnLink\">\r\n\t\t\t           <span class=\"fl\">\r\n\t\t\t                <a href=\"/<#=status._user.screen_name#>/status/<#=status._id#>\" class=\"time\"><#=status._createTime#></a> \r\n\t\t\t                   \u6765\u81ea<#=status._source#>\r\n\t\t\t                 <# if (status._quoterId && status._quoterId != status._rootReplyId && listPage._pageType != \"communion\") { #>\r\n\t\t\t                 \t   <a title=\"\u67e5\u770b\u5fae\u535a\u4e0a\u4e0b\u6587\" href=\"/related/<#=status._id#>\" class=\"status-communion-icon1\">\u76f8\u5173\u5fae\u535a\u8bc4\u8bba</a> \r\n\t\t\t                 <# } #>\r\n\t\t\t           </span> \r\n\t\t\t   \t        <span class=\"fr option\">\r\n\t\t\t   \t           <a href=\"#\" class=\"aLink\" title=\"一 一+ 经典转发又回来啦\" onclick=\"return quote_retweet('<#=status._id#>')\" >引用转发</a>|<a onclick=\"Status.data['<#=status._id#>'].quote(this);\" href=\"javascript:void(0)\" class=\"aLink\" title=\"\u8bc4\u8bba\u8fd9\u6761\u5fae\u535a\">\u8bc4\u8bba</a>|\r\n\t\t\t              <# if (userInfo._id != status._user.id) { #>\r\n\t\t\t\t\t\t             <# if( status._is_retweet) { #>\r\n\t\t\t\t\t\t                  <span class=\"aLink\">\u5df2\u8f6c\u53d1(<a class=\"note\" id=\"<#=status._id#>_retweetCount\" title=\"\u6709<#=status._retweetCount#>\u4eba\u8f6c\u53d1\" href=\"/<#=status._user.screen_name#>/status/<#=status._id#>\"><#=status._retweetCount#></a>),<a href=\"javascript:void(0)\" onclick=\"Status.data['<#=status._id#>'].retwitter(this,false);\" title=\"\u64a4\u9500\u8f6c\u53d1\">\u64a4\u9500</a></span>|\r\n\t\t\t\t\t\t             <# } else { #>\r\n\t\t\t\t\t\t                  <span class=\"aLink\"><a href=\"javascript:void(0)\" onclick=\"Status.data['<#=status._id#>'].retwitter(this,true);\" title=\"\u8f6c\u53d1\u8fd9\u6761\u5fae\u535a\">\u8f6c\u53d1</a>\r\n\t\t\t\t\t\t                  <# if(parseInt(status._retweetCount) > 0) {#>\r\n\t\t\t\t\t\t                      (<a class=\"note\" id=\"<#=status._id#>_retweetCount\" title=\"\u6709<#=status._retweetCount#>\u4eba\u8f6c\u53d1\" href=\"/<#=status._user.screen_name#>/status/<#=status._id#>\"><#=status._retweetCount#></a>)\r\n\t\t\t\t\t\t                  <# } #></span>|\r\n\t\t\t\t\t\t              <# } #>\r\n\t\t\t\t\t\t         <# } else { #>\r\n\t\t\t\t\t\t                 <span class=\"aLink\" title=\"\u4e0d\u80fd\u8f6c\u53d1\u81ea\u5df1\u7684\u5fae\u535a\">\u8f6c\u53d1<# if(parseInt(status._retweetCount) > 0) {#>(<a class=\"note\" title=\"\u6709<#=status._retweetCount#>\u4eba\u8f6c\u53d1\" href=\"/<#=status._user.screen_name#>/status/<#=status._id#>\"><#=status._retweetCount#></a>)<# } #></span>|\r\n\t\t\t\t\t\t        <# } #>\r\n\t\t\t           \t  <# if (status._fav) { #>\r\n\t\t\t           \t  \t  <a id=\"<#=status._id#>_addfav\"  onclick=\"Status.data['<#=status._id#>'].addfav(this);\" href=\"javascript:void(0)\" class=\"aLink hidden\" title=\"\u6536\u85cf\u8fd9\u6761\u5fae\u535a\">\u6536\u85cf</a>\r\n\t\t\t           \t  \t  <a id=\"<#=status._id#>_cancelfav\" onclick=\"Status.data['<#=status._id#>'].cancelfav(this);\" href=\"javascript:void(0)\" class=\"aLink\" title=\"\u53d6\u6d88\u6536\u85cf\">\u53d6\u6d88\u6536\u85cf</a>\r\n\t\t\t           \t  <# } else { #>\r\n\t\t\t           \t  \t  <a id=\"<#=status._id#>_addfav\" onclick=\"Status.data['<#=status._id#>'].addfav(this);\" href=\"javascript:void(0)\" class=\"aLink\" title=\"\u6536\u85cf\u8fd9\u6761\u5fae\u535a\">\u6536\u85cf</a>\r\n\t\t\t           \t  \t  <a id=\"<#=status._id#>_cancelfav\" onclick=\"Status.data['<#=status._id#>'].cancelfav(this);\" href=\"javascript:void(0)\" class=\"aLink hidden\" title=\"\u53d6\u6d88\u6536\u85cf\">\u53d6\u6d88\u6536\u85cf</a>\r\n\t\t\t           \t   <# } #>\r\n\t\t\t   \t        </span>\r\n\t\t\t       </div>\r\n\t\t\t     </div>\r\n\t\t\t     <div class=\"status fn-link status-retwitter-list <# if(!status._is_retweet) { #> hidden <# } #>\" id=\"<#=status._id#>_retwitterList\" >\r\n\t\t\t           \u7531 <span id=\"<#=status._id#>_retwitter\"><a class=\"entry\" href=\"http://t.163.com/n/<#=userInfo._userName#>\"><#=userInfo._userName#></a></span> \u8f6c\u53d1\r\n   \t\t    </div>\r\n\t\t\t</li>\r\n <# } #>";
	
		unsafeWindow.templates["message"] = "<li id=\"<#=message._messageId#>\" <# if( $.browser.msie && $.browser.version < 7 ){ #>onmouseover=\"Message.data['<#=message._messageId#>'].mouseover();\" onmouseout=\"Message.data['<#=message._messageId#>'].mouseout();\"<# } #>>\r\n<# if( listPage._index == 0) { #>\r\n      <div class=\"status clearfix\">\r\n        <!--newb--><span class=\"author\" style=\"background: url(\'http://oimage<#=message._omageNum#>.ydstatic.com/image?w=48&h=48&url=<#if(message._sender.profile_image_url != \"\" && message._sender.profile_image_url != \"http://img1.cache.netease.com/t/img/default48.png\" && message._sender.profile_image_url != \"http://img1.cache.netease.com/t/img/default80.png\") {#><#=encodeURIComponent(message._sender.profile_image_url)#><# } else {#>http://mimg.126.net/p/butter/1008031648/img/face_big.gif<# } #>\') no-repeat scroll left top transparent;width:48px;height:48px\">\r\n\t\t\t\t \t    <a href=\"/<#=message._sender.screen_name#>\">\r\n\t\t\t\t \t    \t <img height=\"48\" width=\"48\" alt=\"name\" class=\"thumb\" src=\"http://oimage<#=message._omageNum#>.ydstatic.com/image?w=48&h=48&url=<#if(message._sender.profile_image_url != \"\" && message._sender.profile_image_url != \"http://img1.cache.netease.com/t/img/default48.png\" && message._sender.profile_image_url != \"http://img1.cache.netease.com/t/img/default80.png\") {#><#=encodeURIComponent(message._sender.profile_image_url)#><# } else {#>http://mimg.126.net/p/butter/1008031648/img/face_big.gif<# } #>\" title=\"<#=message._sender.name#>\" alt=\"<#=message._sender.name#>\" /> \r\n\t\t\t\t \t   </a>\r\n\t\t\t\t </span>\r\n<# } else { #>\r\n      <div class=\"status no-thumb clearfix\">\r\n<# } #>\r\n\t\t     <p class=\"message\">\r\n\t\t     \t   <span class=\"entry\">\r\n\t\t     \t   <# if( listPage._index == 0) { #><a href=\"/<#=message._sender.screen_name#>\"><#=message._sender.name#></a>\uff1a<# } else { #><span class=\"cGray\">\u53d1\u7ed9 </span><a href=\"/<#=message._receiver.screen_name#>\"><#=message._receiver.name#></a>\uff1a<# } #></span><#=message._messageText#>\r\n\t\t     </p>\r\n\t\t     <p class=\"fn-link\">\r\n\t\t         <span class=\"fl\"><#=message._createTime#></span>\r\n\t\t     \t   <span class=\"fr option\"><# if( message._followed_by) { #><a href=\"javascript:void(0)\" onclick=\"Message.data['<#=message._messageId#>'].reply()\"><# if( listPage._index == 0 ) { #>\u56de\u4fe1<# } else { #>\u518d\u53d1\u4e00\u5c01<# } #></a> | <# } #><a href=\"javascript:void(0)\" onclick=\"Message.data['<#=message._messageId#>'].deleteMessage()\">\u5220\u9664</a></span>\r\n\t\t     </p>\r\n\t\t  </div>\r\n\t\t</li>";
	// * Feature 3: report spam
	if(unsafeWindow.listPage._pageType=='mine'){
		//we are in some one's page
		var report_link = document.createElement('a');
		report_link.setAttribute('href', 'javascript:void(0)');
		report_link.setAttribute('class','option-quote-link');
		report_link.innerHTML = '举报';
		report_link.addEventListener("click",function(e){
					var report_text = "爱微博，爱网易，爱亚运，也爱@微博小易，我痛恨spammer，鄙视虚假中奖消息，我是@"+unsafeWindow.userInfo._userName + " 我要举报@" + unsafeWindow.listPage._username;
					unsafeWindow.$.cookie.set("quote_retweet_text", encodeURIComponent (report_text), 5, null, "/");
					window.location.href = "/home";
		      	},true);
	
		unsafeWindow.$("#focus").appendChild(report_link);
	}
	
	// * Feature 4: link source
	// checkbox
	var link_span = unsafeWindow.$(".status-update .ft")[0].appendChild(document.createElement("span"));
	link_span.setAttribute('class','fr fn-link');
	var check_box = link_span.appendChild(document.createElement("input"));
	var use_custom_link = unsafeWindow.$.cookie.get("use_cutom_link");
	check_box.setAttribute('type','checkbox');
	check_box.setAttribute('id','nx_checkbox');
	if(use_custom_link&&use_custom_link=='true')
		check_box.checked=true;
	check_box.addEventListener('click',function(e){
		unsafeWindow.$.cookie.set("use_cutom_link", check_box.checked?"true":"false", "1y", null, "/");
	  },false);
	

	var check_label = link_span.appendChild(document.createElement("label"));
	check_label.setAttribute('for','nx_checkbox');
	check_label.innerHTML='"Edde"作为来源';
	check_label.setAttribute('style','padding:5px;');
	
	
	//hask $.ajax.send

	var original_send = unsafeWindow.$.ajax.send;
	unsafeWindow.$.ajax.send = function(url, method, data, options, xhr) {
		if(method=='POST'&&url=='/statuses/update.do'){
			url='statuses/update.json';
			var use_custom_link = unsafeWindow.$.cookie.get("use_cutom_link");
			if(use_custom_link&&use_custom_link=='true'){
				data["source"] = '<a href="http://userscripts.org/scripts/show/81556">EDDE</a>';
			}else{
				data["source"] = '网易微博';
			}
		}
		original_send(url,method,data,options,xhr);
	}
	//hack status
	var original_buildFloors = unsafeWindow.Status.buildFloors;
	unsafeWindow.Status.buildFloors = function (D, C) {
		if(D.length==1){
			B = D[0];
			if((!B["timeline"])&&B["cursor_id"]){
				B["timeline"] = {"id" : B["id"],"time":B["cursor_id"].split(":")[1],"cursor":B["cursor_id"]};
				B["replyCreatedAt"] = B["created_at"];
				B["replySource"] = "<a href=\"http://userscripts.org/scripts/show/81556\">EDDE</a>";
			}
		}
	    return original_buildFloors(D,C);
	};
}

if(isChrome){
	var script = document.createElement('script');
	script.appendChild(document.createTextNode('('+ main +')(true);'));
	(document.body || document.head || document.documentElement).appendChild(script);
}else{
	main(false);
	//helper method to auto update
	function autoUpdateFromUserscriptsDotOrg(SCRIPT) {

	  // Update code from Junk Blocker: http://loonyone.livejournal.com/
	  // usage example
	  // autoUpdateFromUserscriptsDotOrg({
	  //   url: 'http://userscripts.org/scripts/source/688.user.js',
	  //   version: "1.2",
	  // });

	  try {
	    if (!GM_getValue) return; // Older version of Greasemonkey. Can't run.

	    // avoid a flood of dialogs e.g. when opening a browser with multiple tabs set to homepage
	    // and a script with * includes or opening a tabgrop
	    var DoS_PREVENTION_TIME = 2 * 60 * 1000;
	    var isSomeoneChecking = GM_getValue('CHECKING', null);
	    var now = new Date().getTime();
	    GM_setValue('CHECKING', now.toString());

	    if (!SCRIPT.forceUpdate && isSomeoneChecking && (now - isSomeoneChecking) < DoS_PREVENTION_TIME) return;

	    // check daily
	    var ONE_DAY = 24 * 60 * 60 * 1000;
	    //var ONE_WEEK = 7 * ONE_DAY;
	    //var TWO_WEEKS = 2 * ONE_WEEK;
	    var lastChecked = GM_getValue('LAST_CHECKED', null);
	    if (!SCRIPT.forceUpdate && lastChecked && (now - lastChecked) < ONE_DAY) return;

	    GM_xmlhttpRequest({
	      method: 'GET',
	  	  url: SCRIPT.url + '?source', // don't increase the 'installed' count just for update checks
	  	  onload: function(result) {
	    	  if (!result.responseText.match(/@version\s+([\d.]+)/)) return;     // did not find a suitable version header

	    	  var theOtherVersion = parseFloat(RegExp.$1);
	    	  if (theOtherVersion <= parseFloat(SCRIPT.version))       
	        {
	          // no updates or older version on userscripts.orge site
	          if(SCRIPT.forceUpdate)
	          {
	            alert("Your installed version " + SCRIPT.version + " is the newest version.")
	          }
	          return;
	        }
	        //find the name of the script
	        result.responseText.match(/@name\s+(.+)/);
	        var scriptName = RegExp.$1;

	    	  if (window.confirm('A new version ' + theOtherVersion + ' of greasemonkey script "' + scriptName + '" is available.\nYour installed version is ' + SCRIPT.version + ' .\n\nUpdate now?\n')) {
	    	    GM_openInTab(SCRIPT.url);   // better than location.replace as doing so might lose unsaved data
	    	  }
	  	 }
	    });
	    GM_setValue('LAST_CHECKED', now.toString());
	  } catch (ex) {
	  }
	}

	function update(forceUpdate)
	{
	  autoUpdateFromUserscriptsDotOrg({
	    url: 'http://userscripts.org/scripts/source/81556.user.js',
	    version: ffrb_version,
	    forceUpdate: forceUpdate
	  });
	}

	update(false);

	GM_registerMenuCommand('Update from userscript.org',function(){update(true)});
	
}