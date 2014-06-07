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
							'Всички': '',
							'Английски': 'lang_en',
							'Немски': 'lang_de',
							'Български': 'lang_bg',
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
						a.textContent = 'Език';
				}
				point.appendChild(a);

				
			
				var a2 = document.createElement('a');
				with(a2.style){
					margin = '0px 0px';
				};
				var ylink = document.getElementsByName('q')[0].value;
				a2.href = 'http://www.youtube.com/results?search_query=' + ylink + '&page={startPage?}&utm_source=opensearch';
				a2.id = 'youtube';
				a2.textContent = 'YouTube';
				point.appendChild(a2);
				
			
				
				var a3 = document.createElement('a');
				with(a3.style){
					margin = '0px 10px';
				};
				a3.href = 'http://en.wikipedia.org/w/index.php?title=Special:Search&search=' + ylink;
				a3.id = 'wiki en';
				a3.textContent = 'Wikipedia: en';
				point.appendChild(a3);
				
				var a4 = document.createElement('a');
				with(a4.style){
					margin = '0px -6px';
				};
				a4.href = 'http://de.wikipedia.org/w/index.php?title=Special:Search&search=' + ylink;
				a4.id = 'wiki de';
				a4.textContent = 'de';
				point.appendChild(a4);
				
				
				var a5 = document.createElement('a');
				with(a5.style){
					margin = '0px 8px';
				};
				a5.href = 'http://bg.wikipedia.org/w/index.php?title=Special:Search&search=' + ylink;
				a5.id = 'wiki bg';
				a5.textContent = 'bg';
				point.appendChild(a5);
				
				var a6 = document.createElement('a');
				with(a6.style){
					margin = '0px 8px';
				};
				a6.href = 'http://images.google.com/images?hl=bg&q=' + ylink;
				a6.id = 'imgs';
				a6.textContent = 'Images';
				point.appendChild(a6);
				

				
				var t = a.offsetTop + 5;
				var l = a.offsetLeft;
				var ul = document.createElement('ul');
				ul.id = 'language_select_ul';
				with(ul.style){
					padding = '5px';
					backgroundColor = '#3274F9';
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
						margin = '3px 0px';
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