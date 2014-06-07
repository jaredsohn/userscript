// ==UserScript==
// @name textarea_backup
// @author NLF
// @description  备份你的textarea数据到localStorage(Support Opera 10.5+ ,Fx3.6+ , Chrome5.0+)
// @create 2010-4-9
// @lastmodified 2010-11-7
// @version 2.1.0.0
// @include http*
// ==/UserScript==

(function(){
	function init(){
		var localStorage=window.localStorage;
		if(!localStorage)return;

		//我下面的是设置.
		var prefs={
			interval:5000,										//当聚焦到文本编辑区时,每隔多少毫秒备份一次数据.
			delonsubmit:false,									//当提交后,删除数据.注:提交失败,也会被删除.-_-!!
			shelfLife:2,									//每隔 shelfLife 天检查一次,如果数据保存超过 shelfLife 天,则删除.
		};
		//我上面的是设置.


		var JSONParse=JSON.parse || function(json){return eval('('+json+')')};

		//遍历,去除过期没用的数据.
		var oneDay=86400000;//一天这么多毫秒.
		var curTime=new Date().getTime();
		//alert(typeof curTime);
		var preCheckTime=Number(localStorage.getItem('textarea_backup_removeExpired') || 0);
		//alert(preCheckTime);
		var shelfLife=prefs.shelfLife;
		if(((curTime-preCheckTime)/oneDay)>=shelfLife){
			localStorage.setItem('textarea_backup_removeExpired',curTime.toString());
			var lname,
				ldata,
				ldtimes,
				llength;
			try{
				llength=localStorage.length-1;//firefox 3.6居然,会抛出错误..-_-!!.何等威武.
			}catch(e){
				llength=100;
			};
			for(;llength>=0;llength--){
				try{
					lname=localStorage.key(llength);//firefox 3.6当 i大于实际的长度时,居然又抛出错误,抛你妹啊
				}catch(e){
					continue
				};
				if(!lname)continue;
				//alert(lname);
				if(/^TABU.+/i.test(lname)){
					try{
						ldata=JSONParse(localStorage.getItem(lname));
					}catch(e){
						localStorage.removeItem(lname);
						continue;
					};
					ldtimes=ldata.timeStamp || 0;
					//alert(ldtimes);
					if(((curTime-ldtimes)/oneDay)>=shelfLife){
						localStorage.removeItem(lname);
					};
				};
			};
		};

		var url=location.href.replace(/#.*$/i,'');
		var key='TABU'+url;
		//alert(key);
		var preData=localStorage.getItem(key);
		if(preData){
			try{
				preData=JSONParse(preData);
			}catch(e){
				//alert('错误');
			};
		};
		if(!preData)preData={};

		//alert(preData);

		function copyObj(obj){
			var newObj={};
			for(var i in obj){
				if(obj.hasOwnProperty(i)){
					//alert(i);
					newObj[i]=obj[i];
				};
			};
			return newObj;
		};

		var curData=copyObj(preData);
		//curData={}

		function AreaObject(ta,id,isTA){
			this.self=ta;
			this.preData=preData[id]? decodeURIComponent(preData[id]) : '';
			this.id=id;
			this.isTA=isTA;
		};

		var gStyle;

		AreaObject.prototype={
			init:function(){
				var selfObj=this;
				if(selfObj.preData){//如果存在备份数据.
					//alert(this.preData);
					var div=document.createElement('div');
					if(!gStyle){
						var style=document.createElement('style');
						gStyle=style;
						style.type='text/css';
						style.textContent='\
							.textarea_backup_div,\
							.textarea_backup_div2{\
								position:absolute!important;\
								color:black!important;\
								background-color:white!important;\
								border:1px solid black!important;\
								font-size:12px!important;\
								cursor:pointer!important;\
							}\
							.textarea_backup_div{\
								z-index:9999!important;\
								opacity:0.3!important;\
								padding:3px!important;\
								width:auto!important;\
								height:auto!important;\
								border-radius:5px!important;\
								-moz-border-radius:5px!important;\
								-o-transition:opacity ease-in-out 0.2s;\
								-moz-transition:opacity ease-in-out 0.2s;\
								-webkit-transition:opacity ease-in-out 0.2s;\
							}\
							.textarea_backup_div2{\
								padding:0!important;\
								margin:0!important;\
								border-radius:10px!important;\
								-moz-border-radius:10px!important;\
								width:10px!important;\
								height:10px!important;\
								line-height:10px!important;\
								text-align:center!important;\
								display:none!important;\
							}\
							.textarea_backup_div:hover{\
								opacity:0.8!important;\
							}\
							.textarea_backup_div:hover .textarea_backup_div2{\
								display:block!important;\
							}\
						';
						document.getElementsByTagName('head')[0].appendChild(style);
					};
					div.textContent='恢复';
					div.title='恢复上一次的数据';
					div.className='textarea_backup_div';
					div.setAttribute('contenteditable','false');
					div.addEventListener('click',function(){
						selfObj.restore();
						selfObj.backup();
					},false);
					var div2=document.createElement('div');
					div2.title='关闭按钮';
					div2.textContent='x';
					div2.className='textarea_backup_div2';
					div2.style.cssText='\
						top:-6px;\
						right:-6px;\
					';
					div2.addEventListener('click',function(e){
						e.stopPropagation();
						this.parentNode.style.setProperty('display','none','important');
					},false);
					div.appendChild(div2);
					document.body.appendChild(div);
					this.div=div;
					window.addEventListener('resize',function(){
						selfObj.setDivPosition();
					},false);
				};
				var intervalx;
				this.self.addEventListener('blur',function(){
					selfObj.backup();
					window.clearInterval(intervalx);
				},false);
				this.self.addEventListener('focus',function(){
					selfObj.backup();
					selfObj.setDivPosition();
					intervalx=window.setInterval(function(){
						selfObj.backup();
					},prefs.interval);
				},false);
			},
			setDivPosition:function(){
				var div=this.div;
				if(!div || div.style.display=='none')return;
				var CR=this.self.getBoundingClientRect();
				var ta_top=CR.top+window.scrollY;
				var ta_left=CR.right+window.scrollX;
				div.style.top=ta_top-10+'px';
				div.style.left=ta_left-10+'px';
 			},
			backup:function(){
				var value=this.isTA? this.self.value : this.self.innerHTML;
				//if(!value)return;
				curData[this.id]=encodeURIComponent(value);
				curData.timeStamp=curTime;
				//alert(curData);
				var str=this.toString(curData);
				//alert(str);
				localStorage.setItem(key,str);
			},
			restore:function(){
				var oValue=this.isTA? this.self.value : this.self.innerHTML;
				//alert(oValue);
				if(!oValue){
					if(this.isTA){
						this.self.value=this.preData;
					}else{
						this.self.innerHTML=this.preData;
					};
				}else{
					if(this.isTA){
						this.self.value+='\n'+this.preData;
					}else{
						this.self.innerHTML+=(/<br[^>]*>$/i.test(oValue)? '' : '<br />')+this.preData;
					};
				};
			},
			toString:function(y){
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
							return '"'+x.replace(/\\/g,'\\\\').replace(/"/g,'\\"')+'"';
						}break;
						case 'function':{
							var fnstr=x.toString();
							if(fnstr.search(/\[native\s+code\]/i)==-1){
								return fnstr;
							}else{
								var fnName=fnstr.match(/function\s+(.+)\(/i);
								return  fnName? fnName[1] : Str(undefined);
							};
						}break;
						case 'object':{
							if(x===null){
								return Str(x);
							};
							//alert(x.constructor);
							switch(x.constructor){
								case Object:{
									var i,
												rStr='';
									for(i in x){
										//alert(i);
										if(!x.hasOwnProperty(i)){//去掉原型链上的属性.
											//alert(i);
											continue;
										};
										rStr+=toStr(i)+':'+toStr(x[i])+',';
									};
									return ('{'+rStr.replace(/,$/i,'')+'}');
								}break;
								case Array:{
									var i,
												rStr='';
									for(i in x){
										//alert(i);
										if(!x.hasOwnProperty(i)){//去掉原型链上的属性.
											//alert(i);
											continue;
										};
										rStr+=toStr(x[i])+',';
									};
									return '['+rStr.replace(/,$/i,'')+']';
								}break;
								case RegExp:{
									return Str(x);
								}break;
								case Function:{
									return x.toString();
								}break;
								case String:{
									return toStr(x.valueOf());
								}break;
								case Number:{
									return Str(x.valueOf());
								}break;
								case Boolean:{
									return Str(x.valueOf());
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
				return toStr(y);
			},
		};

	
		function removeData(){
			//alert('remove');
			localStorage.removeItem(key);
		};

		document.addEventListener('focus',function(e){
			var target=e.target;
			//alert(target.hasAttribute('contenteditable'));
			var nodeName=target.nodeName.toLowerCase();
			if(((nodeName=='textarea' && !target.readOnly) || (target.hasAttribute('contenteditable') && target.getAttribute('contenteditable')=='true')) && !target.hasAttribute('xbackuping')){
				target.setAttribute('xbackuping','true');
				if(nodeName=='body')return;
				var id=target.id || target.name;
				if(!id)return;//没有id和name的不监视.
				var isTextArea=(nodeName=='textarea');
				//alert(isTextArea);
				if(prefs.delonsubmit && target.form)target.form.addEventListener('submit',removeData,false);
				var taObject=new AreaObject(target,id,isTextArea);
				taObject.init();
			};
		},true);
	};

	if(window.opera){
		//alert(window);//没有src的iframe不会加载iframe
		document.addEventListener('DOMContentLoaded',init,false);
	}else{
		init();
	}
})();