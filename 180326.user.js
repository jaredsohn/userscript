// ==UserScript==
// @name           minicovid
// @include        http://www.nicovideo.jp/watch/*
// @run-at         document-start
// @description    minimize nicovideo 2013/12/02 18:14
// ==/UserScript==

var d=document;
d.documentElement.style.display='none';

var s_=function(){
	$('#siteHeader,.nicoruWrapper,#PAGEURGENT_sp,#videoHeaderMenu,#videoShareLinks,#pageFooter,#footer'
		+',#nicoIchiba,#leftPanel,#leftPanelAd,#ichibaPanel,#ichibaPanelAd,#textMarquee,#alertWindow'
		+',#videoInformationWrapper>.videoStartAdsOuter,#selectionFooter'
		+',#topVideoInfo>div>.hiddenInfo>.hiddenInfoTabHeader,#playerTabContainer>table'
		+',#playlist>.playlistInformation>.browserFullOption,#playlistMessageContainer,#feedbackLink'
		+',#outline>.outer>.main,#playerBottomAd,#videoReviewBottomAd,#tagEditContainer>form>.note'
		+',#videoMenuTopList>li *:not(.defmylistButton),#wallImageContainer,#videoExplorerBackContainer'
		+',#chipWallList,#appliPanel,#playerTabContainer>div:not(.playerTabContent)'
		+',#videoHeader>.shortVideoInfo>.readMore,#wallDataContainer,#videoHeader>.videoMenuToggle,#popupMarquee'
		+',#playerContainerSlideArea>div>.wallPalette,#playerTabContainer .nicommend,#selectionSideAd'
	).remove();
	// title
	if($('#videoHeader').hasClass('infoActive')){$('#videoHeaderDetail>div>h2').addClass('videoDetailOpenButton')}
	else{$('#videoHeaderDetail>div>h2').addClass('videoDetailCloseButton')}
	$('.videoDetailOpenButton,.videoDetailCloseButton').click(function(){
		$('#videoHeaderDetail>div>h2').toggleClass('videoDetailOpenButton videoDetailCloseButton');});
	// info
	$('#topVideoInfo>.videoDescription').attr('id','pTVIVD');
	$('#pTVIVD').html($('#pTVIVD').html().replace(/(?:<br>|[\s\u3000])+(<br>|$)/g,'$1'));
	$('#topVideoInfo>.videoMainInfoContainer').insertBefore('#pTVIVD');
	$('#videoHeader>.toggleDetailExpand').insertBefore('#videoTagContainer');
	$('#pTVIVD').before('<a class="toggleDesc">'
		+'&#9632;&#21205;&#30011;&#35500;&#26126;&#35443;&#32048;&#34920;&#31034;&#20999;&#26367;</a>');
	$('.toggleDesc').click(function(){$('#pTVIVD').toggleClass('desctail');});
	// list
	$('#playlist').insertBefore('#playerContainerWrapper');
	$('#playlist>.playlistInformation>.generationMessage').click(
		function(){$('#playlistContainer').toggleClass('open');});
	// player
	$('#playerTabContainer').removeClass();
	$('#playerContainer').removeClass('text_marquee');
	// explor
	$('#videoExplorerExpand').append('<a class="expandButton close">'
		+'\u52d5\u753b\u3092\u898b\u308b<span class="arrow"><span></a>');
	// redisplay
	var b=document.createElement('a');
	b.href='javascript:var n=document.getElementById("nicoplayerContainerInner");n.style.display="none";'
		+'setInterval(function(){n.style.display="";},500);';
	b.innerHTML='\u25a0';
	b.title='\u753b\u9762\u3092\u518d\u63cf\u753b\u3057\u3066\u518d\u751f\u5fa9\u5e30\u3092\u8a66\u307f\u307e\u3059'
		+'\n\u52d5\u753b\u304c\u524d\u5f8c\u3059\u308b\u53ef\u80fd\u6027\u304c\u3042\u308a\u307e\u3059'
		+'\n\u30ea\u30b9\u30c8\u306f\u4fdd\u6301\u3055\u308c\u307e\u3059';
	b.id='rdbtn';
	$('body').append(b);
}

var t_=' '
	+'*{border:0!important;box-shadow:none!important}'
	+'*:not(:hover){text-decoration:none!important}'
	// display
	+'#videoHeader>.shortVideoInfo,#outline,#pTVIVD:not(.desctail) br,#selectionSideAd,iframe'
	+'	,.nicoru-button,#videoHeaderTagList>.moreTagsExist,#videoHeaderTagList>.videoHeaderTag .dic>a>.disable'
	+'	,#videoExplorer .uadTagRelatedContainer,#videoExplorer .header,#videoExplorer .relatedTagLabel'
	+'	,#videoExplorer .channelGuideVideo,body:not(.videoExplorer) #videoExplorerExpand>.close'
	+'	,body.videoExplorer #videoExplorerExpand>.open{display:none!important}'
	+'body.size_normal #playerTabWrapper,body.content-fix>#content>#playlist,#playlist>#playlistContainer:not(.open)'
	+'	{height:0!important;overflow:hidden!important}'
	+'#topVideoInfo>.videoMainInfoContainer,#topVideoInfo>.videoMainInfoContainer>.hiddenInfo>div'
	+'	,#topVideoInfo>.videoMainInfoContainer>.hiddenInfo>div>.extraVideoInfo>.supplementary'
	+'	,body:not(.channel) #topVideoInfo>.userProfile,body.channel #topVideoInfo>.ch_prof'
	+'	,#playerTabContainer>.playerTabContent>.playerTabContentItem,#commentToolTip,#videoMenuTopList>li'
	+'	,body.size_small.no_setting_panel.videoExplorer #videoExplorerExpand'
	+'	,#videoExplorer .playTime,#videoExplorer .nextPlayButton{display:block!important}'
	// squeeze
	+'body,#videoTagContainer{min-width:0!important}'
	+'#videoHeaderDetail>.videoDetailExpand,#pTVIVD{min-height:0!important}'
	+'body>#content,#videoExplorer>div>.videoExplorerContentWrapper,#bottomContentTabContainer{padding-top:0}'
	+'#videoHeaderDetail,#videoHeaderDetail *,#videoHeader:not(.infoActive)>#videoTagContainer'
	+'	,#videoTagContainer>.tagInner,#videoHeaderTagList,#videoHeaderTagList>.toggleTagEdit'
	+'	,#topVideoInfo>.videoMainInfoContainer>.hiddenInfo *,#videoMenuWrapper,#videoMenuWrapper *'
	+'	,#pTVIVD,#playerContainerWrapper,#topVideoInfo,#topVideoInfo>.videoMainInfoContainer'
	+'	,#videoExplorer .videoExplorerContent,#videoExplorer .videoExplorerContent>div>div,#videoExplorer .container'
	+'	{padding:0!important;margin:0!important}'
	+'#videoTagContainer,#videoTagContainer>.tagInner,#videoHeaderTagList,#videoHeaderTagList>.toggleTagEdit'
	+'	,#videoHeaderDetail,#videoHeaderDetail>.videoDetailExpand>h2,#playerAlignmentArea'
	+'	,#topVideoInfo>.userProfile>.profile,#videoExplorer .videoExplorerContent'
	+'	{width:auto!important;height:auto!important}'
	+'#videoHeaderDetail>.videoDetailExpand>h2,#playlist>.playlistInformation>.generationMessage'
	+'	,#topVideoInfo>.toggleDesc{cursor:pointer}'
	// title
	+'#videoHeader{padding:0 20px!important;width:auto!important}'
	+'#videoHeaderDetail,#videoHeaderDetail *{font-size:1rem!important;line-height:1.2rem!important}'
	+'#breadcrumb,#breadcrumb>*{font-size:.8rem!important;line-height:1rem!important}'
	+'#videoHeaderDetail *{height:auto!important}'
	// info
	+'#topVideoInfo{margin-bottom:0!important;line-height:12px}'
	+'#nicoplayerContainerInner{top:0}'
	+'#commentDefault{bottom:8px!important}'
	+'#pTVIVD{width:77%!important}'
	+'#pTVIVD:not(.desctail),#pTVIVD:not(.desctail) *{font:10px/10px ""!important;white-space:normal}'
	+'#topVideoInfo>.videoMainInfoContainer{width:55%}'
	+'#topVideoInfo>.videoMainInfoContainer>.parentVideoInfo{zoom:.5;right:23%}'
	+'#topVideoInfo>.userProfile,#topVideoInfo>.ch_prof,#topVideoInfo>.videoMainInfoContainer>.hiddenInfo'
	+'	,#topVideoInfo>.videoMainInfoContainer>.parentVideoInfo{position:absolute;width:22%}'
	+'#topVideoInfo>div:not(.videoMainInfoContainer),#topVideoInfo>.videoMainInfoContainer>.hiddenInfo'
	+'	,#topVideoInfo>.videoMainInfoContainer>div>.videoInformation{right:0;zoom:.8}'
	+'#videoHeaderDetail>div>h2{min-width:8em}'
	+'#videoHeader>.toggleDetailExpand{float:left;margin:0}'
	// defmylist
	+'#videoMenuWrapper,#videoMenuTopList,#videoMenuTopList>li,#videoMenuTopList>li>a{width:5em!important}'
	+'#videoMenuWrapper{overflow:visible;position:fixed;right:0;top:0}'
	+'#videoMenuTopList>li>a{background:#f4f4f4;font-size:10px;display:inline-block!important;color:#888}'
	+'#videoMenuTopList>li>a:hover{font-weight:bold}'
	+'#videoMenuTopList>li>a:active{color:#444}'
	+'#videoMenuTopList>.videoMenuList>a>.popMsg{right:100px!important;font-size:.5rem!important}'
	// list
	+'#playlist{position:relative!important;top:auto!important;right:auto!important;left:auto!important;'
	+'		height:auto!important;z-index:auto!important}'
	// tag
	+'#videoHeader.infoActive>#videoTagContainer{padding:0!important;margin:0 23% 0 0!important}'
	+'#videoTagContainer *{line-height:12px;font-size:10px}'
	+'#videoTagContainer>.tagInner{overflow:auto!important}'
	+'#videoHeaderTagList{padding-left:6em!important}'
	+'body.content-fix #videoTagContainer{background:#f8f8f8}'
	+'#videoHeaderTagList>.toggleTagEdit{background:transparent!important}'
	+'#videoHeaderTagList>li>.toggleTagEditInner{font-size:0}'
	+'#videoHeaderTagList>li>.toggleTagEditInner>span{font-size:.8rem;float:left}'
	+'#videoHeaderTagList>.videoHeaderTag>div'
	+'	{padding:0!important;zoom:.75;position:relative!important;left:0!important}'
	+'#videoHeaderTagList>.videoHeaderTag{padding:0!important;margin:0 .5ex 0 0!important}'
	+'#videoHeaderTagList>.videoHeaderTag>.tagControlContainer{display:inline!important;float:left;margin-right:-4px}'
	+'#videoHeaderTagList>.isCategory>a{color:#D33!important;font-weight:900}'
	// player
	+'body.size_normal #playerContainer{zoom:1.11}'
	+'#playerNicoplayer{float:left}'
	+'#playerTabWrapper{position:relative;float:right;height:100%!important}'
	+'#playerTabContainer{bottom:0!important}'
	+'#playerTabContainer>.playerTabContent{top:0;bottom:0!important;padding:0}'
	+'#playerTabContainer>.playerTabContent>.playerTabContentItem.comment{height:66%!important}'
	+'#playerTabContainer>.playerTabContent>.playerTabContentItem.ng{height:33%!important}'
	+'#commentToolTip>.message{white-space:normal!important}'
	+'#commentDefault>.commentTableContainer{width:100%!important}'
	// explor
	+'#videoExplorerExpand{position:fixed;top:0;right:5em;height:20px;z-index:1000000}'
	+'#videoExplorerExpand>.expandButton{line-height:1rem}'
	+'#videoExplorerExpand>.close>.arrow{background-position-y:0}'
	+'#videoExplorer .searchButton{width:40px;height:40px;float:left;'
	+'		background-size:contain;background-image:url("//res.nimg.jp/img/watch_zero/icon_search.png")}'
	+'#videoExplorer .relatedTagHeader{float:right}'
	+'#videoExplorer .tagRelatedNicopedia{position:fixed;left:0;bottom:0;margin:0;width:300px;'
	+'		font:.8rem/1rem "";color:inherit!important;background:#eee}'
	+'#videoExplorer .tagRelatedNicopedia>div{margin:1ex!important}'
	+'#videoExplorer .contentItemList>.item{margin:0 0 1ex 1ex!important}'
	+'#videoExplorer .createdTime'
	+'	{position:absolute;z-index:11;background:#000;color:#FFF!important;font-size:0;opacity:.8}'
	+'#videoExplorer .createdTime .value{font-size:12px!important;margin:0}'
	+'#videoExplorer .playTime{left:0;right:auto;bottom:0;padding:0!important;}'
	+'#videoExplorer .playingIcon{right:0;top:0;margin:0;left:auto;zoom:.8;opacity:.8}'
	+'#videoExplorer .balloon{top:0!important;left:0!important;margin-top:-33px!important}'
	// redisplay
	+'#rdbtn{position:absolute;top:0;left:0;z-index:1;text-decoration:none!important}'
+' ';

var s=d.createElement('script');s.type='text/javascript';s.textContent='('+s_.toString()+')();';
var t=d.createElement('style');t.type='text/css';t.innerText=t_;
window.onload=function(){d.body.appendChild(s);d.head.appendChild(t);d.documentElement.style.display='';}

// end
