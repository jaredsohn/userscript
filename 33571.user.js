// ==UserScript==
// @name         Google Time & Language Select
// @namespace    Yamamaya
// @description  You can select time option and language.
// @include      http://www.google.*/
// @include      http://www.google.*/#*
// @include      http://www.google.*/search*
// @include      http://www.google.*/webhp?*
// @version      1.1.1
// ==/UserScript==

(function(){
	var W = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow: window;
	var GOOGLE = W.google;
	var HL = (GOOGLE) && GOOGLE.kHL || (/\?hl=ja&?/.test(location.href)) && 'ja' || 'en';

	var FORM = document.getElementById('tsf') || document.getElementsByName('f')[0];
	var POINT = document.querySelectorAll('.lst-td[width="100%"]')[0];
		POINT = POINT && POINT.nextSibling || null;
	
	var GoogleSearch = {
		init: function(){
			var lsbb = document.querySelectorAll('div.ds > div.lsbb')[0];
			if(lsbb){
				lsbb.style.borderLeft = '1px solid #CCCCCC';
			}
			
			this.time();
			this.language();
		},
		time: function(){
			var times = (HL === 'ja') && {
				'期間指定なし'	: '',
				'最近の結果'		: 'rltm:1',
				'１０分以内'		: 'qdr:n10',
				'１時間以内'		: 'qdr:h',
				'２４時間以内'	: 'qdr:d',
				'１週間以内'		: 'qdr:w',
				'１か月以内'		: 'qdr:m',
				'２か月以内'		: 'qdr:m2',
				'３か月以内'		: 'qdr:m3',
				'６か月以内'		: 'qdr:m6',
				'１年以内'		: 'qdr:y'
			} || {
				'Anytime'			: '',
				'Recent results'	: 'rltm:1',
				'past 10 minutes'	: 'qdr:n10',
				'Past hour'     	: 'qdr:h',
				'Past 24 hours' 	: 'qdr:d',
				'Past week'     	: 'qdr:w',
				'Past month'    	: 'qdr:m',
				'Past 2 months' 	: 'qdr:m2',
				'Past 3 months' 	: 'qdr:m3',
				'Past 6 months' 	: 'qdr:m6',
				'Past year'     	: 'qdr:y' 
			};
			
			var select = document.createElement('select');
			select.setAttribute('type','SELECT');
			select.setAttribute('name','tbs');
			var options = '';
			for(var i in times){
				var time = times[i];
				options += '<option value="'+time+'">'+i+'</option>';
			};
			select.innerHTML = options;
			if(POINT){
				select.setAttribute('style','vertical-align: middle; margin-left: 5px; margin-right: 2px;');
				var td = document.createElement('td');
				td.appendChild(select);
				POINT.parentNode.insertBefore(td,POINT);
			}
			else{
				select.setAttribute('style','vertical-align: bottom; margin-right: 5px; margin-bottom: 10px;');
				var point = document.querySelectorAll('form span.ds')[0];
				point.parentNode.insertBefore(select,point);
			}			
		},
		language: function(){
			var langs = (HL === 'ja') && {
					'すべての言語'	: '',
					'英語'			: 'lang_en',
					'日本語'			: 'lang_ja',	
					'スペイン語'		: 'lang_es',
					'ポルトガル語'		: 'lang_pt',
					'フランス語'		: 'lang_fr',
					'イタリア語'		: 'lang_it',
					'ドイツ語'		: 'lang_de',
					'ロシア語'		: 'lang_ru',
					'中国語 簡体'	: 'lang_zh-CN',
					'中国語 繁体'	: 'lang_zh-TW',
					'韓国語'			: 'lang_ko'	,
					'アラビア語'		: 'lang_ar',
					'クロアチア語'		: 'lang_hr',
					'オランダ語'		: 'lang_nl',
					'スウェーデン語'	: 'lang_sv',
					'デンマーク語'		: 'lang_da'		
				} || {
					'Any language'			: '',
					'English'				: 'lang_en',
					'Spanish'				: 'lang_es',
					'Portuguese'			: 'lang_pt',
					'French'				: 'lang_fr',
					'Italian'				: 'lang_it',
					'German'				: 'lang_de',
					'Russian'				: 'lang_ru',
					'Chinese (Simplified)'	: 'lang_zh-CN',
					'Chinese (Traditional)'	: 'lang_zh-TW',
					'Korean'				: 'lang_ko',
					'Japanese'				: 'lang_ja',
					'Arabic'				: 'lang_ar',
					'Croatian'				: 'lang_hr',
					'Dutch'					: 'lang_nl',
					'Swedish'				: 'lang_sv',
					'Danish'				: 'lang_da'
				};
			
			var select = document.createElement('select');
			select.setAttribute('type','SELECT');
			select.setAttribute('name','lr');
			var options = '';
			for(var i in langs){
				var lang = langs[i];
				options += '<option value="'+lang+'">'+i+'</option>';
			};
			select.innerHTML = options;
			if(POINT){
				select.setAttribute('style','vertical-align: middle; margin-right: 5px; margin-left: 2px;');
				var td = document.createElement('td');
				td.appendChild(select);
				var point = POINT.nextSibling;
				POINT.parentNode.insertBefore(td,POINT);
			}
			else{
				select.setAttribute('style','vertical-align: bottom; margin-bottom: 10px;');
				var point = document.querySelectorAll('form span.ds')[0];
				point.parentNode.insertBefore(select,point);
			}	
			
			select.addEventListener('blur',function(evt){
				var target = evt.target;
				if(!target.value)
					return;
				var lrs = document.getElementsByName('lr');
				for(var i=0,l=lrs.length;i<l;i++){
					var lr = lrs[i];
					lr.removeAttribute('checked');
				};
				FORM.submit();
			},false);
		}
	};
	
	GoogleSearch.init();
})();