// ==UserScript==
// @name textarea_backup
// @author NLF
// @description  备份你的textarea数据到localStorage(Support Opera 10.5+ ,Fx 4.0+ , Chrome 5.0+)
// @create 2010-4-9
// @lastmodified 2011-8-13
// @version 2.6.0.2
// @namespace  http://userscripts.org/users/NLF
// @download  http://bbs.operachina.com/viewtopic.php?f=41&t=72862
// @download  http://userscripts.org/scripts/show/89905
// @updateURL https://userscripts.org/scripts/source/89905.meta.js
// @include http*
// ==/UserScript==

(function(window,document){
	'use strict';

	if(!window.localStorage)return;

	//一些设置.
	var prefs={
		forceLocalStorage:false,						//强制使用localStorage,否则的话,opera和firefox会使用全局储存空间(更方便管理.);
		backupInterval:3000,								//当聚焦到文本编辑区时,每隔多少毫秒备份一次数据.
		delOnSubmit:false,									//当提交后,删除数据.注:提交失败,也会被删除.
		shelfLife:2,												//每隔 shelfLife 天检查一次,如果数据保存超过 shelfLife 天,则删除.
		debug:false,												//debug.
	};

	//判断执行环境,opera,firefox(GM),firefox(scriptish),chrome;
	var envir=(function(ua){
		var envir={
			fx:false,
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
			envir.fx=true;
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

	function init(){
		var localStorage=window.localStorage;

		if(!prefs.forceLocalStorage){
			if(scriptStorage){
				localStorage=scriptStorage;
			}else if(envir.fx){
				localStorage={
					setItem:function(key,value){
						GM_setValue(key,value);
					},
					getItem:function(key){
						return GM_getValue(key);
					},
					removeItem:function(key){
						GM_deleteValue(key);
					},
					key:function(index){
						var list=GM_listValues();
						return list[index];
					},
					_getLength:function(){
						return GM_listValues().length;
					},
				};
				Object.defineProperties(localStorage,{
					length:{
						get:function(){
							return this._getLength();
						},
					},
				});
			};
		};

		var JSONParse=(JSON && JSON.parse) || function(json){
			return eval('('+json+')')
		};

		JSONParse=(function(JSONParse){
			return function(json){
				try{
					return JSONParse(json);
				}catch(e){
				};
			};
		})(JSONParse);

		//遍历,去除过期没用的数据.
		var oneDay=24 * 60 * 60 * 1000;//一天的毫秒数.
		var curTime=new Date().getTime();
		var preCheckTime=localStorage.getItem('textarea_backup_removeExpired') || 0;

		if(((curTime-preCheckTime)/oneDay)>=prefs.shelfLife){

			var lname;
			var ldata;

			for(var i=0,ii=localStorage.length;i<ii;i++){
				lname=localStorage.key(i);
				if(!lname || !/^TABU/i.test(lname))continue;
				ldata=JSONParse(localStorage.getItem(lname));
				if(!ldata || (((curTime-(ldata.timeStamp || 0))/oneDay)>=prefs.shelfLife)){
					localStorage.removeItem(lname);
				};
			};

			localStorage.setItem('textarea_backup_removeExpired',curTime.toString());
		};


		//取出当前页面的数据.
		var url=location.href.replace(/#.*$/i,'');
		var key='TABU'+url;
		var preData=localStorage.getItem(key);
		if(preData){
			preData=JSONParse(preData);
		};
		if(!preData)preData={};
		C.log('当前页面保存的数据:',preData);


		function copyObj(obj){
			var newObj={};
			for(var i in obj){
				if(obj.hasOwnProperty(i)){
					newObj[i]=obj[i];
				};
			};
			return newObj;
		};

		var curData=copyObj(preData);

		function Backup(target,id,isTA){
			this.target=target;
			this.preData=preData[id]? decodeURIComponent(preData[id]) : '';
			this.id=id;
			this.isTA=isTA;
			this.init();
		};

		Backup.prototype={
			addStyle:function(){
				if(Backup.style)return;
				var style=document.createElement('style');
				Backup.style=style;
				style.textContent='\
					.tbackup_button_container,\
					.tbackup_button_close{\
						display:block;\
						position:absolute;\
						color:black;\
						background-color:white;\
						border:1px solid black;\
						font-size:12px;\
						cursor:pointer;\
					}\
					.tbackup_button_container{\
						z-index:999999;\
						opacity:0.3;\
						padding:3px;\
						width:auto;\
						height:auto;\
						-moz-border-radius:5px;\
						border-radius:5px;\
						-o-transition:opacity ease-in-out 0.2s;\
						-moz-transition:opacity ease-in-out 0.2s;\
						-webkit-transition:opacity ease-in-out 0.2s;\
						transition:opacity ease-in-out 0.2s;\
					}\
					.tbackup_button_close{\
						padding:2px;\
						margin:0;\
						-moz-border-radius:50px;\
						border-radius:50px;\
						width:auto;\
						height:auto;\
						line-height:10px;\
						text-align:center;\
						display:none;\
						top:-6px;\
						right:-6px;\
					}\
					.tbackup_button_container:hover{\
						opacity:0.8;\
					}\
					.tbackup_button_container:hover .tbackup_button_close{\
						display:block;\
					}\
					.tbackup_button_close:hover{\
						color:red;\
					}\
				';
				document.documentElement.appendChild(style);
			},
			init:function(){

				var self=this;

				if(this.preData){//如果存在备份数据.
					this.addStyle();

					var container=document.createElement('span');
					this.container=container;
					container.textContent='恢复';
					container.title='恢复上一次的数据';
					container.className='tbackup_button_container';

					container.addEventListener('click',function(){
						self.restore();
					},false);

					var close=document.createElement('span');
					close.title='关闭按钮';
					close.textContent='X';
					close.className='tbackup_button_close';

					close.addEventListener('click',function(e){
						e.stopPropagation();
						self.removeButton();
					},false);

					container.appendChild(close);
					document.documentElement.appendChild(container);

					var resizeHandler=function(){
						self.setPosition();
					};

					this.removeResizeListener=function(){
						window.removeEventListener('resize',resizeHandler,false);
					};

					window.addEventListener('resize',resizeHandler,false);

					this.setPosition();
				};

				this.setInterval();

				this.target.addEventListener('blur',function(){
					self.save();
					clearInterval(self.interval);
					self.interval=null;
				},false);

				this.target.addEventListener('focus',function(e){
					self.setPosition();
					self.setInterval();
				},false);

				if(prefs.delOnSubmit && this.target.form){
					this.target.form.addEventListener('submit',function(){
						delete curData[self.id];
						localStorage.setItem(key,self.toString());
					},false);
				};

			},
			setInterval:function(){
				if(this.interval)return;
				var self=this;
				this.interval=setInterval(function(){
					self.save();
				},prefs.backupInterval);
			},
			removeButton:function(){
				this.container.parentNode.removeChild(this.container);
				this.container=null;
				this.removeResizeListener();
			},
			setPosition:function(){
				var container=this.container;
				if(!container)return;
				var CR=this.target.getBoundingClientRect();
				if(CR.top==0 && CR.right==0){//目标元素被删除了,不在文档里面 或者 被隐藏了.
					container.style.display='none';
					return;
				}else{
					container.style.display='block';
				};
				var ta_top=CR.top + window.scrollY;
				var ta_left=CR.right + window.scrollX;
				container.style.top=ta_top-10+'px';
				container.style.left=ta_left-10+'px';
			},
			save:function(){
				var value=this.isTA? this.target.value : this.target.innerHTML;
				value=encodeURIComponent(value);
				if(!value || value==curData[this.id]){//没有数据 或者 和上次保存的一样.
					return;
				};
				curData[this.id]=value;
				curData.timeStamp=new Date().getTime();
				var str=this.toString();
				localStorage.setItem(key,str);
				C.log('数据保存了:',str);
			},
			restore:function(){
				var target=this.target;
				var oValue=this.isTA? target.value : target.innerHTML;
				if(!oValue){
					if(this.isTA){
						target.value=this.preData;
					}else{
						target.innerHTML=this.preData;
					};
				}else{
					if(this.isTA){
						target.value+='\n'+this.preData;
					}else{
						target.innerHTML+=(/<br[^>]*>$/i.test(oValue)? '' : '<br />')+this.preData;
					};
				};
			},
			toString:function(){
				function toStr(x){
					//alert(typeof x);
					switch(typeof x){
						case 'undefined':{
							return Str(x);
						}break;
						case 'boolean':{
							return Str(x);
						}break;
						case 'number':{
							return Str(x);
						}break;
						case 'string':{
							return ('"'+
								(x.replace(/(?:\r\n|\n|\r|\t|\\|")/g,function(a){
									var ret; 
									switch(a){//转成字面量
										case '\r\n':{
											ret='\\r\\n'
										}break;
										case '\n':{
											ret='\\n';
										}break;
										case '\r':{
											ret='\\r'
										}break;
										case '\t':{
											ret='\\t'
										}break;
										case '\\':{
											ret='\\\\'
										}break;
										case '"':{
											ret='\\"'
										}break;
										default:{
										}break; 
									};
									return ret;
								}))+'"');
						}break;
						case 'function':{
							var fnStr=Str(x);
							return fnStr.indexOf('native code')==-1? fnStr : 'function(){}';
						}break;
						case 'object':{//注,object的除了单纯{},其他的对象的属性会造成丢失..
							if(x===null){
								return Str(x);
							};
							//alert(x.constructor);
							switch(x.constructor){
								case Object:{
									var i;
									var tempArray=[];
									for(i in x){
										//alert(i);
										if(x.hasOwnProperty(i)){//去掉原型链上的属性.
											tempArray.push(toStr(i)+':'+toStr(x[i]));
										};
									};
									return ('{' + tempArray.join(',') + '}');
								}break;
								case Array:{
									var i;
									var tempArray=[];
									for(i in x){
										//alert(i);
										if(x.hasOwnProperty(i)){//去掉原型链上的属性.
											tempArray.push(toStr(x[i]));
										};
									};
									return ('[' + tempArray.join(',') + ']');
								}break;
								case String:{
									return toStr(Str(x));
								}break;
								case RegExp:{
									return Str(x);
								}break;
								case Number:{
									return Str(x);
								}break;
								case Boolean:{
									return Str(x);
								}break;
								default:{
									//alert(x.constructor);//漏了什么类型么?
								}break;
							};
						}break;
						default:break;
					};
				};
				var Str=String;
				return toStr(curData);
			},
		};


		var done=[];//监视中的textarea;

		function activeElem(target){
			var nodeName=target.nodeName;
			if(((nodeName=='TEXTAREA' && !target.readOnly) || target.isContentEditable) && done.indexOf(target)==-1){
				done.push(target);
				var id=target.id || target.name;
				if(!id){
					return;//没有id和name的不监视.
				};
				new Backup(target,id,nodeName=='TEXTAREA');
			};
		};

		C.log('activeElement',document.activeElement);
		activeElem(document.activeElement);//处理在添加focus事件之前,已经focused的对象.

		document.addEventListener('focus',function(e){
			activeElem(e.target);
		},true);

	};



	if(envir.fx3)return;//fx3 gm的bug太多..在此js里面会遇到localStorage.length抛出错误的情况...,所以直接屏蔽掉.

	var scriptStorage;
	if(envir.opera){
		try{
			scriptStorage=window.opera.scriptStorage;
		}catch(e){
		};
		document.addEventListener('DOMContentLoaded',init,false);
	}else{
		init();
	};

})(window,window.document);
