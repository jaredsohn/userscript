// ==UserScript==
// @name        WeiboCleaner
// @description  清爽的新浪微博
// @namespace   http://weibo.com/qiangtoutou
// @include     http://weibo.com/*
// @updateURL    https://userscripts.org/scripts/source/153140.meta.js
// @downloadURL  https://userscripts.org/scripts/source/153140.user.js
// @version     20130731
// @grant       none
// ==/UserScript==

 /**
 *@fileoverview 针对升级了的微博最新版有效，下面是各模块的id,
 *最近使用：pl_leftnav_app,
 *回顾我的点滴：pl_rightmod_yunying,
 *热门话题：trustPagelet_zt_hottopicv5,
 *会员专区：trustPagelet_recom_memberv5,
 *微群微刊应用：trustPagelet_recom_allinonev5,
 *公告栏：pl_rightmod_noticeboard,
 */
(function(){
 /**
 *@class 
 *@name WeiboCleaner
 */
var WeiboCleaner = /**@lends WeiboCleaner*/{
	/**
	*默认的需要删除的模块id数组，可自行添加，删除
	*/
	idArr : ['pl_leftnav_app',
	'pl_rightmod_yunying', 
	'trustPagelet_recom_interestv5',
	'trustPagelet_recom_memberv5',
	'trustPagelet_recom_allinonev5',
	'pl_rightmod_noticeboard',
	],
	
	/**
	*数组的回调函数处理器，由开发人员自己扩展
	*/
	arrHandler : function (callback) {
		var obj = callback(this.idArr);
		if (Object.prototype.toString.call(obj)=='[object Array]') {
			this.idArr = obj;
		}
		return this;
	},
	
	/**
	*删除指定元素
	*/
	remove : function (elem) {
		elem && elem.parentNode.removeChild(elem);
	},
	/**
	*隐藏指定元素
	*/
	hide : function (elem) {
	    elem && (elem.style.display="none")
	},
	/**
	*id选择器
	*/
	_id : function (name) {
		return document.getElementById(name);
	},
	
	/**
	*获得id之外的元素
	*24时热博
	*微博推广
	*/
	_getOthers : function () {
		var i,
		byId=this._id,
		bc=document.getElementsByClassName.bind(document),
		other = [],
		WB_feed,
		WB_right_module=bc('WB_right_module'),
		homeFeed = byId("pl_content_homeFeed"),
		publisherTop = byId("pl_content_publisherTop");
		
		var _24hour=WB_feeds=[];
		/**24时热博*/
		_24hour=publisherTop.innerHTML && publisherTop.firstElementChild.firstElementChild.lastElementChild;
		other.push(_24hour);
		
		/**微博推广*/
		WB_feeds = homeFeed.innerHTML && homeFeed.children[1].children;
		for (i = WB_feeds.length; i--; ) {
			WB_feed = WB_feeds[i],
			feedtype = WB_feed.getAttribute('feedtype');
			if (feedtype == "ad") {
				other.push(WB_feed);
			};
		};

		/** 可能感兴趣的人 */
		for(i=WB_right_module.length;i--;){
				stop=true;
				var m=WB_right_module[i];
				var html=m.innerHTML;
				if(html.indexOf('可能感兴趣的人')!=-1
								||html.indexOf('微吧推荐')!=-1
				  ){
						other.push(m);
				}
		}
		
		return other;
	},
	/**
	*取得所有待删除的元素
	*/
	_getAllElements : function () {
		var elems = [],
		idArr = this.idArr;
		for (var i = idArr.length; i--; ) {
			var elem=this._id(idArr[i]);
			elem && elems.push(elem);
		}
		return elems.concat(this._getOthers());
	},
	/**
	*执行操作
	*/
	action : function (actionType) {
		var es=this._getAllElements(),
			act=this[actionType];
		for (var i = 0, l = es.length; i < l; i++) {		
				act(es[i]);
		}
	}
};

/**
*执行操作！！！
*@param {String} action 可以取remove和hide;
*/
var t=0,stop=false;
var fun=function(){
		console.log(t);
		setTimeout(function(){
  			WeiboCleaner.action("remove");
				t+=100;
				if(t<5000 && !stop)fun();
		},100);
}
fun();
})();