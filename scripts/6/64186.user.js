// ==UserScript==
// @name         @hideto's Twitter Design Mod
// @namespace    http://www.hide10.com
// @description  @hideto's Twitter Design Mod
// @version		1.1
// @include		http://twitter.com*
// @include		http://www.twitter.com*
// @include		https://twitter.com*
// @include		https://www.twitter.com*
// ==/UserScript==

GM_addStyle(<><![CDATA[
	textarea#status {		/* ツイート入力欄		*/
		height:4em;			/* default:2.5em;		*/
		width:95%;			/* default:515px		*/
	}
	#container {			/* content + side_base	*/
		width:95%;			/* default:763px;		*/
	}
	#currently {			/* 最新のツイート		*/
		display:none;		/* default:(not set)	*/
	}
	#content {				/* メインコンテンツ		*/
		width:100%;			/* default:564px;		*/
	}
	ol.statuses .thumb {	/* アイコン表示領域		*/
		height:34px;		/* default:50px;		*/
		width:34px;			/* default:50px;		*/
		margin:0;			/* default:0 10px 0 0;	*/
	}
	ol.statuses .thumb img {
		height:32px;		/* default:48px;		*/
		width:32px;			/* default:48px;		*/
	}
	ol.statuses .actions {
		line-height:1em;	/* default:1.25em;		*/
		right:0px;			/* default:10px;		*/
		top:0px;			/* default:8px;			*/
	}
	ol.statuses span.status-body {
							/* 個別ツイート本文		*/
		margin-left:40px;	/* default:56px			*/
		min-height:40px;	/* default:48px;		*/
		width:95%;			/* default:425px;		*/
	}
	ol.statuses li.status, ol.statuses li.direct_message {
		line-height:1.4;	/* default:16px;		*/
		padding:2px;		/* default:10px 0 8px;	*/
							/* default:(not set)	*/
		border-top:1px solid #CCC;
	}
	ol.statuses {
		font-size:15px;		/* default:14px;		*/
	}
	ol.statuses > li.last-on-page,
	ol.statuses > li.last-on-refresh	{
							/* default:1px solid #CCCCCC !important;		*/
		border-bottom:none;
	}
	.meta {
		display:inline;		/* default:block;		*/
		font-size:9px;		/* default:11px;		*/
	}
	#side_ad_base{
		display:none;		/* default:(not set)	*/
	}
	#trends{
		display:none;		/* default:(not set)	*/
	}
	#rssfeed{
		display:none;		/* default:(not set)	*/
	}
	a.tweet-url{
		font-size:11px;		/* default:14px;		*/
	}
	.status-body a.tweet-url.screen-name{
		position:absolute;	/* default:(not set)	*/
		left:0;				/* default:(not set)	*/
		top:34px;			/* default:(not set)	*/
		font-size:8px;		/* default:15px;		*/
		color:#999;			/* default:#088253		*/
		max-width:34px;		/* default:(not set)	*/
	}
	a.tweet-url.username{
		font-size:14px;		/* default:14px;		*/
	}

	body#profile #container ol.statuses .latest-status .entry-content {
		font-size:1em;
	}
	body#profile ol.statuses li.latest-status {
		border-top-width:0;
		line-height:1.5em;
		padding:0;
	}
]]></>);
