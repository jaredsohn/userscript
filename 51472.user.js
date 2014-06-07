// ==UserScript==
// @name         Google Search Language Select Plus
// @namespace    metacme
// @description  You can select language options.
// @include      http://www.google.*/
// @include      http://www.google.*/search*
// @include      http://www.google.*/webhp?*
// @version      0.1
// ==/UserScript==

(function(){
	evalInPage(function(){
		var GOOGLE = google;
		var LANGUAGE = GOOGLE.kHL;

		var googleSearch = {
			init: function(){
				this.createLanguageSelect();
				this.launguageSelectToggle();
				this.formSubmit();
			},
			createLanguageSelect: function(){
				switch(LANGUAGE){
					case 'zh-CN':
						var language = {
							'任何语言': '',
							'英文': 'lang_en',
							'中文': 'lang_zh-CN|lang_zh-TW',
							'简体中文': 'lang_zh-CN',
							'繁体中文': 'lang_zh-TW',
							'日文': 'lang_ja',
							'韩文': 'lang_ko',
							'俄文': 'lang_ru',
							'法文': 'lang_fr',
							'德文': 'lang_de',
							'意大利文': 'lang_it',
							'西班牙文': 'lang_es',
							'葡萄牙文': 'lang_pt'
						};
						break;
					case 'ja':
						var language = {
							'すべての言語': '',
							'英語': 'lang_en',
							'中国語': 'lang_zh-CN|lang_zh-TW',
							'中国語 簡体': 'lang_zh-CN',
							'中国語 繁体': 'lang_zh-TW',
							'日本語': 'lang_ja',
							'韓国語': 'lang_ko',
							'ロシア語': 'lang_ru',
							'フランス語': 'lang_fr',
							'ドイツ語': 'lang_de',
							'イタリア語': 'lang_it',
							'スペイン語': 'lang_es',
							'ポルトガル語': 'lang_pt'
						};
						break;
					default:
						var language = {
							'Any Language': '',
							'English': 'lang_en',
							'Chinese': 'lang_zh-CN|lang_zh-TW',
							'Chinese (Simplified)': 'lang_zh-CN',
							'Chinese (Traditional)': 'lang_zh-TW',
							'Japanese': 'lang_ja',
							'Korean': 'lang_ko',
							'Russian': 'lang_ru',
							'French': 'lang_fr',
							'German': 'lang_de',
							'Italian': 'lang_it',
							'Spanish': 'lang_es',
							'Portuguese': 'lang_pt'
						};
				}

				var point = document.getElementById('prs');
				var a = document.createElement('a');
				with(a.style){
					margin = '0px 20px';
				};
				a.href = '#';
				a.id = 'language_select_toggle';
				switch(LANGUAGE){
					case 'zh-CN':
						a.textContent = '语言选项';
						break;
					case 'ja':
						a.textContent = '言語オプション';
						break;
					default:
						a.textContent = 'Language Options';
				}
				point.appendChild(a);

				var t = a.offsetTop + 5;
				var l = a.offsetLeft;
				var ul = document.createElement('ul');
				ul.id = 'language_select_ul';
				with(ul.style){
					padding = '10px';
					backgroundColor = '#3274D0';
					position = 'absolute';
					top = t + 'px';
					left = l + 'px';
					zIndex = '9999999';
					visibility = 'hidden';
					MozBorderRadius = '0.4em';
					MozOpacity = '0.85';
				};
				for(var i in language){
					var li = document.createElement('li');
					with(li.style){
						listStyle = 'none';
						margin = '5px 0px';
					};
					li.innerHTML = '<input type="radio" value="'+language[i]+'" name="lr"/><label for="lr" style="color: #FFFFFF !important;">'+i+'</label>';
					ul.appendChild(li);
				};
				point = document.getElementsByName('btnG')[0];
				point.parentNode.appendChild(ul);
			},
			launguageSelectToggle: function(){
				var ul = document.getElementById('language_select_ul');
				var uStyle = ul.style;
				document.addEventListener('click',function(e){
					var target = e.target;
					if(e.button !== 0)
						return;
					if(target.parentNode.id === 'language_select_ul' || target.parentNode.parentNode.id === 'language_select_ul')
						return;
					if(target.id === 'language_select_toggle'){
						(uStyle.visibility === 'hidden') ?
							uStyle.visibility = 'visible': uStyle.visibility = 'hidden';
						e.preventDefault();
					}
					else{
						uStyle.visibility = 'hidden';
					}
				},false);
			},
			formSubmit: function(target){
				var form = document.forms[0];
				document.addEventListener('click',function(e){
					if(e.button !== 0) return;
					var target = e.target;
					if(target.id === 'all' || target.id === 'il' || target.name === 'lr' && (target.nodeName.toLowerCase() === 'input')){
						form.submit();
					}
				},false);
			}
		};

		googleSearch.init();
	});

	function evalInPage(f){
		location.href = 'javascript:void('+f+')()';
	};
})();