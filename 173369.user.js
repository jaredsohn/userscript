// ==UserScript==
// @name           SungreenAdditionalNaviMenu.user.js
// @description    Showing additional navi menus on Sungreen Blogger page.
// @version        0.20140105
// @match          http://sungreen-s.blogspot.jp/*
// ==/UserScript==

(function(){
	function func(){
		function setMenu(){
			var aaa=document.getElementById('PageList1').children[1].children[0];
			var bbb=aaa.children[1];
			var ccc=aaa.children[2];
			var ddd=document.createElement('ul');
			var eee=document.createElement('ul');
			var fff=['<li><a href="/p/blog-page_','.html#','</a></li>',27,21,'futsal">フットサル','minifutsal">ミニフットサル','bascket">3on3バスケット','tabletennis">卓球','billiards">ビリヤード','badminton">バドミントン','tennis">テニス','autotennis">オートテニス','shop">テニスバドミントンショップ','school">テニススクール','batting">バッティング','music">音楽スタジオ','multipurpose">多目的ルーム','point">ポイントカード','ose">OSEクラブ'];
			for(var i=5,ggg='';i<18;i++){
				ggg+=fff[0]+fff[3]+fff[1]+fff[i]+fff[2]
			}
			for(var i=18,hhh='';i<21;i++){
				hhh+=fff[0]+fff[4]+fff[1]+fff[i]+fff[2]
			}
			ddd.innerHTML=ggg;
			eee.innerHTML=hhh;
			bbb.appendChild(ddd);
			ccc.appendChild(eee);
			$(bbb).hover(
				function(){
					$(ddd).stop().slideDown(100)
				},function(){
					$(ddd).stop().slideUp(100)
				}
			);
			$(ccc).hover(
				function(){
					$(eee).stop().slideDown(100)
				},function(){
					$(eee).stop().slideUp(100)
				}
			)
		}
		function setCss(){
			var aaa=document.createElement('style');
			aaa.innerHTML=
				'#PageList1 ul{'+
					'overflow:visible'+
				'}'+
				'#PageList1 ul ul{'+
					'display:none;'+
					'position:absolute;'+
					'z-index:1;'+
					'top:32px;'+
					'left:30px'+
				'}'+
				'#PageList1 ul ul a{'+
					'width:140px;'+
					'border-radius:0'+
				'}'+
				'#PageList1 li{'+
					'position:relative'+
				'}';
			document.body.appendChild(aaa)
		}
		setTimeout(function(){setCss();setMenu()},100)
	}
	var aaa=document.createElement('script');
	aaa.textContent='('+func.toString()+')()';
	document.body.appendChild(aaa)
})();