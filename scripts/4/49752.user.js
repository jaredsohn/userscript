// ==UserScript==
// @name              Userscripts.org + Wescript info
// @namespace         Yamamaya
// @include           http://userscripts.org/scripts/*
// @version           0.0.1
// ==/UserScript==

(function(){
	var INFO = eval(GM_getValue('userscript')) || {};
	var ID = location.href.split('/')[5];
	var POINT = document.getElementById('heading'); 
	var CACHE_EXPIRE = 1 * 60 * 60 * 1000;
	
	var userScript = {
		init: function(){
			var div = document.createElement('div');
			div.style.margin = '0px 0px 0px 80px';
			div.innerHTML = 'Loading....';
			POINT.appendChild(div);		
			
			(INFO.hasOwnProperty(ID) && (INFO[ID].expire > new Date())) ?
				this.cache(div): this.request(div);
				
			GM_registerMenuCommand('Userscripts.org + Wescript info  -  clear cache',clearValue);
		},
		request: function(div){
			var scriptUrl = 'http://'+location.hostname+'/scripts/source/'+ID+'.user.js';
			var url = 'http://wescript.net/scripts/?url=' + scriptUrl;
			
			GM_xmlhttpRequest({
				method: 'GET',
				url: url,
				onload: function(req){
					if(req.status === 200 || req.status === 201){
						var json = eval('('+req.responseText+')');
						userScript.createElement(json,div);
						userScript.setValue(json);
					}
					else
					if(req.status === 404){
						div.innerHTML = '<a href="http://wescript.net/" target="_blank" style="margin-left:20px;">'
									  + 'Wescript'
									  + '</a>'
									  + ' — '
									  + '<span style="color:#FFFFFF; background-color:#FF8800; padding:0px 5px;">0 user</span>';
					}
					else{
						(INFO.hasOwnProperty(ID)) ?
							userScript.cache(div): div.innerHTML = 'Error';					
					}
				},
				onerror: function(){
				
				}
			});		
		},
		cache: function(div){
			var json = INFO[ID].json;
			this.createElement(json,div);
		},
		createElement: function(json,div){
			var resourceUrl = json['resouce_url'];
			var usersCount = json['users_count'];
			var usersText = (Number(usersCount) < 2) && 'user' || 'users';
			div.innerHTML = '<a href="http://wescript.net/" target="_blank" style="margin-left:20px;">'
			              + 'Wescript'
						  + '</a>'
						  + ' — '
						  + '<a href="'+resourceUrl+'" target="_blank" style="padding: 0px 5px; color:#FFFFFF; background-color:#FF8800; text-decoration:none;">'
						  +  usersCount + ' '+ usersText
						  + '</a>';	
		},
		setValue: function(json){
			INFO[ID] = INFO[ID] || (INFO[ID] = {});
			INFO[ID].json = json;
			INFO[ID].expire = new Date(new Date().getTime() + CACHE_EXPIRE);	
			setValue();
		}
	};

	userScript.init();

	function setValue(){
		GM_setValue('userscript',INFO.toSource());
	};
	
	function clearValue(){
		GM_setValue('userscript','');
	};
})();