// ==UserScript==
// @name           liveKusoKote2
// @namespace      hosamw
// @include        http://livetube.cc/*
// @include        http://*.livetube.cc/*
// ==/UserScript==

//	改変 hosamw
//  20120126_01

//	クソコテ支援
//	つくったひと　mry
//		a.k.a.観戦雑魚(kansenzako)
//	ver. 20091102_03


(function (){

	var stemp = localStorage.kuso;
	if(!!stemp) kusoData = JSON.parse(localStorage.kuso);
	else kusoData = {};

	function main(){

		//表示位置の準備
		var comForm = document.evaluate('//form[@id="comment_form"]',document.body,null,7,null).snapshotItem(0);
		if(!comForm) return false;


		var elm = document.evaluate('//form[@id="kusoForm"]',document.body,null,7,null).snapshotItem(0);
		var toolDisplay = 'block';
		var toolControl = '▲閉じる';
		if(!elm){
			elm = document.createElement('form');
			elm.setAttribute('id','kusoForm');
			comForm.parentNode.appendChild(elm);
			toolDisplay = 'none'
			toolControl = '▼開く';
		}

		var ids = '';
		for( var i in kusoData ) ids += '<option value="'+i+'">'+kusoData[i]['n']+'</option>';
		elm.innerHTML = '<div style="background-color:#333333;color:white">クソコテチェンジャー <span id="kusoOpen">'+toolControl+'</span></div>'+
					'<div id="kusoTool" style="display:'+toolDisplay+'">'+
					'クソコテを選んでください <select id="kusoSelect">'+
					'<option value="ログアウト">ログアウト</option>' + ids + '</select><br />' +
					'※名前欄が切り替わったらログイン完了<br />' +
					'※下のエリアに入力するとクソコテを記憶します<br />' +
					'※パス間違えて記憶した場合は再度入力しなおすと上書きされます<br />' +
					'※コテ入れて、パスワードを空欄にして記憶ボタン押すとそのコテがなかったことに<br />' +
					'コテ<input type="text" id="kusoId">　パス<input type="text" id="kusoPass">'+
					'<button type="button" id="kusoButton">記憶</button></div>';

		kusoChanger();
	}

	function kusoChanger(){
		var kusoSelector = document.evaluate('//select[@id="kusoSelect"]',document.body,null,7,null).snapshotItem(0);
		var kusoButton = document.evaluate('//button[@id="kusoButton"]',document.body,null,7,null).snapshotItem(0);
		var kusoOpen = document.evaluate('//span[@id="kusoOpen"]',document.body,null,7,null).snapshotItem(0);

		kusoSelector.addEventListener(
			'change',
			function(){

				var foo = kusoSelector.value;

				if(foo == 'ログアウト'){
					GM_xmlhttpRequest({
						method: 'GET',
						url: document.URL.match('http://[^/]+/')+'logoff',
						onload:function(){
							document.evaluate('//input[@name="name"]',document.body,null,7,null).snapshotItem(0).value = '';
						}
					});

					return false;
				}
				var id= kusoData[foo]['n'];
				var pass = kusoData[foo]['p'];

				GM_xmlhttpRequest({
					method: 'POST',
					url: document.URL.match('http://[^/]+/')+'login',
					data:'user='+encodeURI(id)+'&password='+pass,
					onload:function(response){
						var bar = response.responseText;
						bar.match("<h5><span id=\"u\">([^\<]+)</span></h5>");
						if( RegExp.$1 == id ){
							document.evaluate('//input[@name="name"]',document.body,null,7,null).snapshotItem(0).value = id;
						}else{
							alert(id+'でのログインに失敗しました\n現状のIDでのログインを続行します');
						}
					}
				});

			},false

		);

		kusoButton.addEventListener(
			'click',
			function(){
				var kusoId = document.evaluate('//input[@id="kusoId"]',document.body,null,7,null).snapshotItem(0).value;
				var kusoPass = document.evaluate('//input[@id="kusoPass"]',document.body,null,7,null).snapshotItem(0).value;

				if(kusoPass){
					kusoData[kusoId] ={'n':kusoId,'p':kusoPass};
					alert('ID='+kusoId+'\n pass='+kusoPass+ '\n上記内容で保存します');
					
				}else{
					delete kusoData[kusoId];
				}

				localStorage.kuso = JSON.stringify(kusoData);
				main();
			},false
		);

		kusoOpen.addEventListener(
			'click',
			function(){
				var kt = document.evaluate('//div[@id="kusoTool"]',document.body,null,7,null).snapshotItem(0);
				if( kt.style.display == 'none' ){
					kusoOpen.innerHTML = '▲閉じる';
					kt.style.display = 'block';
				}else{
					kusoOpen.innerHTML = '▼開く';
					kt.style.display = 'none';
				}
			},false
		);
	}



	main();

})();
