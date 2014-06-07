// ==UserScript==
// @name         QQZoneCleaner
// @description  清爽的qq空间
// @namespace    http://weibo.com/qiangtoutou
// @include      http://*.qzone.qq.com/*
// @updateURL    https://userscripts.org/scripts/source/153004.meta.js
// @downloadURL  https://userscripts.org/scripts/source/153004.user.js
// @grant        unsafeWindow
// @version      2013-12-06 09:18:26
// ==/UserScript==

(function(w){ 
    //默认的需要删除的class数组，可自行添加，删除
    var classArr = ['fn_gdtads', 'fn_paipai', 'fn_mayKnow', 'fn_openvip','fn_guanxiquan','fn_fnrecm','fn_birthdayGuy'],
    idArr = ['div_corner_ad_container','QM_My_App_Container','idQbossHotbar'],
    filterStr={
		content:['收藏音乐','我的空间积分','转载','QQ超市','QQ农场','和QQ好友一起玩游戏','设置背景音乐','添加了应用',
			'我要把所有的动物','我和好友们都在玩','赶紧送礼物祝他生日快乐吧','赶紧送礼物祝她生日快乐吧','发起的投票','让自己的空间与众不同','我刚刚在QQ空间领到预约码',
		'#玩得酷，靠得住#火箭加速冲，直达广寒宫'],
		name:['官方Qzone','QQ空间']
	};

	//v8使用模块加载系统，只能这样加一个检测方法了
    //超时检测，在规定时间内轮循f，直到为真则执行cb
    var check=function(f,cb){
        var now=new Date,
        timeout=8000;
        var fun= function(){
            var ret=f();
            if(!ret){
                if(new Date-now<timeout){
                    setTimeout(fun,500);
                }
            }else{
                cb();
            }
        }
        fun();
    }
    //v8版
    classArr=classArr.concat(['mod-side-nav-recently-used','icenter-right-ad']);
    idArr=idArr.concat(['QM_Container_100002','QM_Container_100003','QM_Container_333']);

    //class选择器
    var _class = function (name) {
        var arr= document.getElementsByClassName(name);
        return Array.prototype.slice.call(arr);
    }
    //id选择器
    var _id = function (id) {
        return document.getElementById(id);
    }
    var QQZoneCleaner = {
        //删除指定元素
        remove : function (elem) {
            elem && elem.parentNode && elem.parentNode.removeChild(elem);
        },
        hide : function (elem) {
            elem && (elem.style.display='none');
        },
        _getArr:function(){
            var i,j,el,arr,cls;
            arr=[];
            //id
            for (var j = idArr.length; j--; ) {
                el = _id(idArr[j]);
                arr.push(el);
            }
            //class
            for (var i = classArr.length; i--; ) {
                cls=classArr[i];
                el=_class(cls);
                arr=arr.concat(el);
            }
            //过滤消息内容
            arr=arr.concat(this._fromContent());
            //过滤用户
            arr=arr.concat(this._fromName());
            return arr;
        },
        //内容
        _fromContent:function(){
            var arr=_class('f_info');
			//v8
			arr=arr.concat(_class('f-info'));
			arr=arr.concat(_class('qz_summary'));
            arr=this._filter(arr,'content'); 
            return arr;
        },
        //用户名
        _fromName:function(){
            var arr=_class('f_nick');
			//v8
			arr=arr.concat(_class('f-nick'));
            arr=this._filter(arr,'name'); 
            return arr;
        },
        //文本
        _text:function(obj){
            var t='';
            var arr=obj.childNodes;
            for(var i=0,len=arr.length;i<len;i++){
                t+=arr[i].textContent;
            }
            t=t.replace(/\s/g,'');
            return t;
        },
        _filter:function(arr,type){
            var html,item,i,j,retArr=[],
			filter=filterStr[type];
            for(i=arr.length;i--;){
                item=arr[i];
                html=this._text(item);
                for(j=filter.length;j--;){
                    if(html.indexOf(filter[j])!=-1){
                        var p=item.parentElement.parentElement.parentElement;
                        retArr.push(p);break;
                    }
                }
            }
            return retArr;
        },
        //执行删除操作
        doRemove : function () {
            var arrs = this._getArr();
            //还是隐藏吧
            for (var j = 0, len = arrs.length; j < len; j++)
                this.hide(arrs[j]);
        }
    };

    QQZoneCleaner.doRemove();

    check(function(){
        return w.QZONE.qzEvent;
    },
    function(){
        w.QZONE.qzEvent.addEventListener('QZ_SCROLL',function(){
            QQZoneCleaner.doRemove();
        });
    });
})(unsafeWindow);
