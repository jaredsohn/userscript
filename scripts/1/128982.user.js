// ==UserScript==
// @name douban_filter
// @namespace http://www.douban.com
// @include http://*.douban.com/*
// @include http://www.douban.com/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @version 2.0
// ==/UserScript==

(function () {

	var css = "
				/*首页广播*/
				.user-list img, .hd img{
					border-radius: 50%;
					display:block;
					padding: 2px;
					background: rgb(82, 146, 103);
				}
				.user-list img:hover, .hd img:hover{
					border-radius: 50%;
					-webkit-transition:All 0.3s ease;
					-webkit-transform: rotate(360deg);
				}
				/*个人页面左上*/
				#db-usr-profile img{
					border-radius: 50%;
					display:block;
					padding: 2px;
					background: rgb(82, 146, 103);
				}
				#db-usr-profile img:hover{
					display:block;
					-webkit-transition:All 0.4s ease;
					-webkit-transform: scale(1.2) translate(5px, 0px);
				}

				/*个人页面友邻列表*/
				.obu img{
					padding: 2px;
					background: rgb(82, 146, 103);
					border-radius: 50%;
					display:block;
					width:45px;
					height:45px;
					-webkit-transform: translate(15px, 0px);
				}

				/*个人页面留言板*/
				.mbt img{
					border-radius: 50%;
					display:block;
					padding: 2px;
					background: rgb(82, 146, 103);
				}
				.mbt img:hover{
					-webkit-transition:All 0.3s ease;
					-webkit-transform: rotate(360deg);
				}

				/*小组成员列表*/
				.member-list img{
					display:block;
					width:44px;
					height:44px;
					border-radius: 50%;
					padding: 2px;
					background: rgb(82, 146, 103);
					-webkit-transform: translate(14px, 0px);
				}

				/*小组 话题*/
				.user-face img{
					display:block;
					width:44px;
					height:44px;
					border-radius: 50%;
					padding: 2px;
					background: rgb(82, 146, 103);
				}
				.user-face img:hover{
					-webkit-transition:All 0.3s ease;
					-webkit-transform: rotate(360deg);
				}

				/*东西页面*/
				.item-notes img{
					display:block;
					border-radius: 50%;
					padding: 2px;
					background: rgb(82, 146, 103);
				}

				/*用过xxx的人*/
				.likers-list img{
					display:block;
					border-radius: 50%;
					padding: 2px;
					background: rgb(82, 146, 103);
				}
				.likers-list a:hover{
					background-color: transparent;
				}
				.likers-list img:hover{
					-webkit-transform: translate(1px, 0px);
				}
	";
	var node = document.createElement("style");
 	node.type = "text/css";
 	node.appendChild(document.createTextNode(css));
 	heads[0].appendChild(node); 
}())