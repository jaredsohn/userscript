// ==UserScript==
// @name PluginInitialized
// @author NLF
// @description 在插件初始化后,执行一些操作,比如禁止flash弹窗,允许flash全屏,给flash传参(Support Opera 10.1+ ,Fx3.6+(need GreaseMonkey or scriptish) , Chrome5.0+)
// @create 2011-8-4
// @lastmodified 2011-8-11
// @version 1.0.1.0
// @namespace  http://userscripts.org/users/NLF
// @download http://userscripts.org/scripts/show/109099
// @updateURL https://userscripts.org/scripts/source/109099.meta.js
// @include http*
// ==/UserScript==

//插件初始化事件测试。
(function(document,window){
	'use strict';

	var prefs={
		debug:false,//debug
	};

	//[
		//匹配flash地址,当embed元素,匹配 src属性;当object元素,匹配 name 为 'movie' 的param元素的 value值. 
		//传给flash的参数(flashvars) 比如: 'isAutoPlay=false&light=off',多个值用 & 号连接,
						//如果原来存在的值那么会更新.
						//比如原值是:'a=0&b=2',填在规则里面的值是 'a=1&c=3', 那么最后的值会变成：'a=1&b=2&c=3';
						//此项为: 'delete' 时,会删除原来的值;为: 'default' 时,不做更改.
		//允许全屏(allowfullscreen), 有两个值: 'false' , 'true'
		//flash访问网络限制(allownetworking), 有三个值：'all','internal','none'
		//允许flash访问页面脚本(allowScriptAccess),有三个值："always","sameDomain","never"
	//];

	//当值为 'default' 时不做修改。

	var list=[
		[/http:\/\/player\.youku\.com\//i,'isAutoPlay=false','true','all','default'],//youku外链。
		[/http:\/\/www\.tudou\.com\/v\//i,'autoPlay=false','true','all','default'],//土豆外链。
		[/http:\/\/player\.ku6\.com\//i,'autoPlay=false','true','all','default'],//ku6外链。
		[/http:\/\/you\.video\.sina\.com\.cn\//i,'default','true','all','default'],//sina外链。
		[/http:\/\/static\.video\.qq\.com\//i,'default','true','all','default'],//qq外链。
	];

	//.......

	//判断执行环境,opera,firefox(GM),firefox(scriptish),chrome;
	var envir=(function(ua){
		var envir={
			fxgm:false,
			fx3:false,
			fxstish:false,
			opera:false,
			chrome:false,
			unknown:false,
		};
		var toString=Object.prototype.toString;
		if(window.opera && toString.call(window.opera)=='[object Opera]'){
			envir.opera=true;
		}else if(typeof XPCNativeWrapper=='function'){
			if(typeof GM_notification!='undefined'){//scriptish的新api
				envir.fxstish=true;
			}else{
				envir.fxgm=true;
			};
			if(document.body && document.body!==document.body){
				envir.fx3=true;
			};
		}else if(typeof window.chrome=='object'){
			envir.chrome=true;
		}else{
			envir.unknown=true;
		};
		return envir;
	})(window.navigator.userAgent);

	//debug函数.
	var C=(function(envir,enabled){
		var nullFn=function(){};
		var C={
			log:nullFn,
			err:nullFn,
		};

		if(enabled){
			var _opera;
			if(envir.opera && (_opera=window.opera).version()<10.5){
				C.log=C.err=function(){
					_opera.postError.apply(_opera,arguments);
				};
			}else{//调用firebug的输出log,firefox自带的简直弱爆了.
				var G_window=typeof unsafeWindow=='undefined' ? window : unsafeWindow;
				C.log=function(){
					var _console=G_window.console;
					if(_console){
						_console.log.apply(_console,arguments);
					};
				};
				C.err=function(){
					var _console=G_window.console;
					if(_console){
						if(_console.error){
							_console.error.apply(_console,arguments);
						}else{
							_console.log.apply(_console,arguments);
						};
					};
				};
			};
		};

		return C;

	})(envir,prefs.debug)

	var done=[];//已处理的。

	function arrayIndexOf(array,elem){
		if(envir.fx3){//firefox3的gm环境下 array的indexOf不能正常工作.
			for(var i=0,ii=array.length;i<ii;i++){
				if(array[i]==elem)return i;
			};
			return -1;
		}else{
			return array.indexOf(elem);
		};
	};

	function reloadPlugin(elem){
		var nextSibling=elem.nextSibling;
		var parentNode=elem.parentNode;
		parentNode.removeChild(elem);
		if(nextSibling){
			parentNode.insertBefore(elem,nextSibling);
		}else{
			parentNode.appendChild(elem);
		};
	};

	function updateFVars(fVars,ofVars){
		if(fVars==='delete'){
			return '';
		};
		if(fVars==='default'){
			return ofVars;
		};

		if(ofVars===''){
			return fVars;
		};

		fVars=fVars.split('&');
		ofVars=ofVars.split('&');

		var ofVarsl=ofVars.length;

		var added;
		var index;
		var index2;

		for(var i=0,ii=fVars.length;i<ii;i++){
			if(fVars[i]==='')continue;
			added=false;
			index=fVars[i].indexOf('=');
			if(index==-1)continue;

			var fVName=fVars[i].slice(0,index);

			for(var j=0;j<ofVarsl;j++){//相同的替换掉.
				index2=ofVars[j].indexOf('=');
				if(index2==-1)index2=ofVars[j].length;
				if(ofVars[j].slice(0,index2)==fVName){
					ofVars[j]=fVars[i];
					added=true;
					break;
				};
			};

			if(!added){
				ofVars.push(fVars[i]);
			};
		};

		return ofVars.join('&');
	};

	function init(elem){
		if(arrayIndexOf(done,elem)!=-1)return;
		done.push(elem);

		switch(elem.nodeName){
			case 'OBJECT':{
				var params=elem.childNodes;

				var allowFullScreen,
						allowNetworking,
						allowScriptAccess,
				flashVars;

				var matched;
				var needReload;

				for(var i=params.length-1,param_i;i>=0;i--){
					param_i=params[i];
					if(param_i && param_i.nodeName!='PARAM')continue;

					if(allowFullScreen && allowNetworking && allowScriptAccess && flashVars && matched)break;

					var pName=param_i.name;

					if(/^movie$/i.test(pName)){
						matched=null;
						var pValue=param_i.value;
						for(var j=0,jj=list.length;j<jj;j++){
							if(list[j][0].test(pValue)){
								matched=list[j];
								break;
							};
						};
						if(matched===null)break;//没找到匹配的。
					}else if(/^allownetworking$/i.test(pName)){
						allowNetworking=param_i;
					}else if(/^allowfullscreen$/i.test(pName)){
						allowFullScreen=param_i;
					}else if(/^allowscriptaccess$/i.test(pName)){
						allowScriptAccess=param_i;
					}else if(/^flashvars$/i.test(pName)){
						flashVars=param_i;
					};

				};

				if(!matched)break;

				var setAttri=function(param,name,value,force){
					if(value==='default' && !force)return;
					var newParam;
					if(!param){
						newParam=true;
						param=document.createElement('param');
						param.name=name;
						param.value=value;
						if(elem.firstChild){
							elem.insertBefore(param,elem.firstChild);
						}else{
							elem.appendChild(param);
						};
					};
					if(newParam || param.value!==value){
						param.value=value;
						needReload=true;
					};
				};

				var ofVars=(flashVars && flashVars.value) || '';
				var ofVarsAft=updateFVars(matched[1],ofVars);
				if(ofVarsAft!=ofVars){
					setAttri(flashVars,'flashVars',ofVarsAft,true);
				};

				setAttri(allowFullScreen,'allowFullScreen',matched[2]);
				setAttri(allowNetworking,'allowNetworking',matched[3]);
				setAttri(allowScriptAccess,'allowScriptAccess',matched[4]);

				if(needReload){
					reloadPlugin(elem);
				};

			}break;

			case 'EMBED':{

				var needReload;

				var setAttri=function(name,value,force){
					if(value==='default' && !force)return;
					if(elem.getAttribute(name)!=value){
						elem.setAttribute(name,value);
						needReload=true;
					};
				};

				var src=elem.src;
				for(var i=0,ii=list.length,list_i;i<ii;i++){
					list_i=list[i];
					if(list_i[0].test(src)){
						var ofVars=elem.getAttribute('flashvars') || '';
						var ofVarsAft=updateFVars(list_i[1],ofVars);
						if(ofVarsAft!=ofVars){
							setAttri('flashvars',ofVarsAft,true);
						};
						setAttri('allowfullscreen',list_i[2]);
						setAttri('allownetworking',list_i[3]);
						setAttri('allowscriptaccess',list_i[4]);
						break;
					};
				};

				if(needReload){//重载。
					reloadPlugin(elem);
				};

			}break;
		};

	};

	if(envir.opera){
		window.opera.addEventListener('PluginInitialized',function(e){
			init(e.element);
		},false);
	}else{
		var embeds=document.evaluate('//embed|//object',document,null,7,null);
		for(var i=0,ii=embeds.snapshotLength;i<ii;i++){
			init(embeds.snapshotItem(i));
		};
		document.addEventListener('DOMNodeInserted',function(e){
			var target=e.target;
			if(target.nodeType!=1)return;//元素节点.
			var nodeName=target.nodeName;
			if(/OBJECT|EMBED/.test(nodeName)){
				C.log('DOMNodeInserted-plugin',target);
				init(target);
			};
			var embeds=document.evaluate('.//embed|.//object',target,null,7,null);
			for(var i=0,ii=embeds.snapshotLength;i<ii;i++){
				C.log('DOMNodeInserted-plugin',embeds.snapshotItem(i));
				init(embeds.snapshotItem(i));
			};
		},false);
	};


})(window.document,window);
