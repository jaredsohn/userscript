// ==UserScript==
// @name textareaAutoHeight
// @author NLF
// @description  自适应文本编辑区高度(support opera 10.1+,firefox 3.5+,chrome 5+)
// @create 2010-11-4
// @lastmodified 2010-11-7
// @version plus 1.1.1
// @include http*
// ==/UserScript==

(function(window,document){
	//我是设置.
	var prefs={
		transition:true,										//是否启用过渡.只在opera 10.5+上有效.
				timingFn:'ease-in-out',					//动画方式
				duration:200,										//持续时间.单位:毫秒
		maxHeight:555,											//允许的最大高度.
		monitoringInterval:1666,							//当聚焦到编辑区的时候,每隔多少毫秒调整一次监视一次高度.
	};


	function AreaObject(ta,paddingTAB,defaultHeight){
		this.self=ta;
		this.paddingTAB=paddingTAB;
		this.defaultHeight=defaultHeight;
	};

	var isChrome=(window.chrome || window.navigator.userAgent.search(/applewebkit/i)!=-1);

	AreaObject.prototype={
		init:function(){
			var self=this;
			var ta=self.self;
			ta.addEventListener('blur',function(){
				self.textAreaBlur();
			},false);
			ta.addEventListener('focus',function(){
				self.textAreaFocus();
			},false);
			ta.addEventListener('keyup',function(){
				self.autoHeight();
			},false);
		},
		autoHeight:function(){
			//alert(this.value);
			var ta=this.self;

			var scrollHeight=ta.scrollHeight,
				curHeight=ta.clientHeight-this.paddingTAB;
			//alert(curHeight);

			if(!window.opera){
				ta.style.setProperty('height','0','important');
				if(isChrome){
					scrollHeight=ta.scrollHeight-this.paddingTAB;
				}else{
					scrollHeight=ta.scrollHeight
					curHeight=curHeight+this.paddingTAB;
				};
				ta.style.setProperty('height',curHeight+'px','important');
			};

			//alert(this.defaultHeight);
			//alert(scrollHeight==curHeight);
			if(scrollHeight>=curHeight){
				if(curHeight<prefs.maxHeight){
					if(scrollHeight>=prefs.maxHeight){
						ta.style.setProperty('overflow-y','auto','important')
					}else{
						ta.style.setProperty('overflow-y','hidden','important')
					};
					ta.style.setProperty('height',Math.min(scrollHeight,prefs.maxHeight)+'px','important');
				}else{
					ta.style.setProperty('overflow-y','auto','important')
				};
			}else{
				if(curHeight>this.defaultHeight){
					ta.style.setProperty('height',Math.max(this.defaultHeight,scrollHeight)+'px','important');
				};
			};
		},
		textAreaFocus:function(){
			//alert('focus');
			var self=this;
			self.fbInterval=window.setInterval(function(){
				self.autoHeight();
			},monitoringInterval);
		},
		textAreaBlur:function(){
			//alert('blur')
			window.clearInterval(this.fbInterval);
		},
	};


	var styleText='';
	if(prefs.transition && window.opera && window.opera.version()>=10.5){
		var timingFn=(prefs.timingFn.indexOf(',')==-1)? prefs.timingFn : 'cubic-bezier('+prefs.timingFn+')';
		var duration=prefs.duration/1000+'s';
		styleText=';-o-transition:height '+duration+' '+timingFn+';';
		//alert(styleText);
	};

	var monitoringInterval=prefs.monitoringInterval;
	var getComputedStyle=window.getComputedStyle;

	document.addEventListener('focus',function(e){
		var target=e.target;
		if(target.nodeName.toLowerCase()=='textarea' && !target.hasAttribute('autoheight')){
			target.setAttribute('autoheight','true');
			var computedStyle=getComputedStyle(target,'');
			var defaultHeight=parseInt(computedStyle.height,10);
			var paddingTop=parseInt(computedStyle.paddingTop,10);
			var paddingBottom=parseInt(computedStyle.paddingBottom,10);
			//alert(paddingTop);
			//alert(paddingBottom);
			target.style.setProperty('height',defaultHeight+'px','important');
			if(styleText){
				target.style.cssText+=styleText;
			};
			var taObject=new AreaObject(target,paddingTop+paddingBottom,defaultHeight);
			taObject.autoHeight();
			taObject.init();
		};
	},true);
})(window,document);