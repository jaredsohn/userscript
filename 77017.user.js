// ==UserScript==
// @name        Bangumi debug version
// @namespace   Bangumi
// @author      zolunx10@hotmail.com
// @description  Debug version
// @include http://bangumi.tv/group/topic/*
// @version     1.5
// ==/UserScript==

var assert =function(){
    var cmd =document.createElement("textarea");
    cmd.value ="-------------------debug log-------------\n";
    cmd.cols =80;   cmd.rows =20;
    document.body.appendChild(cmd);
    return function(cond, msg, msgout){
        if (!cond){
            cmd.value +=msg +"\n";
        } else if(msgout){
            cmd.value +=msgout +"\n";
        }
    }
}();
if (typeof(addEvent) =='undefined'){
    function addEvent( obj, type, fn ) {
	    if (obj.addEventListener) {
		    obj.addEventListener( type, fn, false );
	    } else if (obj.attachEvent) { //ie
		    obj["e"+type+fn] = fn;
		    obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
		    obj.attachEvent( "on"+type, obj[type+fn] );
	    } else {
            obj["on"+type] = obj["e"+type+fn];
	    }
    }
}
assert(addEvent, "addEvent初始化错误");
if (typeof(addLoadEvent) =='undefined'){
    function addLoadEvent(func) {
	    var oldonload = window.onload;
	    if (typeof window.onload != 'function') {
		    window.onload = func;
	    } else {
		    window.onload = function() {
			    oldonload();
			    func();
		    }
	    }
    }
}
assert(addLoadEvent, "addLoadEvent初始化错误");
assert(false, "计算Browser...");
if (typeof(Browser) =='undefined'){
    var userAgent =navigator.userAgent.toLowerCase();
    var Browser = {
	    version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1],
	    msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
	    firefox: /firefox/.test( userAgent ),
        chrome: /chrome/.test( userAgent ) && /mozilla/.test(userAgent),
	    opera: /opera/.test( userAgent ),
	    safari: /webkit/.test( userAgent ) &&!(/chrome/.test(userAgent))
    }
    assert(false, "..." + function(){
        var res ="";
        for (var i in Browser){
            if (Browser[i])
                res +="[" +i+"]";
        }
        return res;
    }());
    assert(false, "..." +Browser.version);
}
assert(false, "准备runUserScript...");
var runUserScript =function(func){
    if (Browser.opera){
        addLoadEvent(func);
    } else{
        func();
    }
}

assert(false, "准备BGMPost...");
var BGMPost =function(o){
    this.dom =o;
    var d=null;
    if (o){
        var small =o.getElementsByClassName("re_info")[0].innerHTML;
        var pattern =/\d{4,}-\d{1,2}-\d{1,2}\s+\d{1,2}:\d{1,2}/;
        d =small.match(pattern)[0];
        d =d.replace(/-/g,"/");
    }
    this.time =new Date(d);
};
BGMPost.prototype ={
    constructor :BGMPost,
    highlight :function(){
        assert(false, "..." +this.dom);
        this.dom.style.backgroundColor="#CFE8FE";
        this.dom.style.borderLeft ="4px solid #FD99A2";
    }
};
BGMPost.compareTime =function(x, y){
    if (x.time <y.time){
        return -1;
    } else if(x.time >y.time){
        return 1;
    } else{
        return 0;
    }
};
assert(false, "准备BGMPosts...");
var BGMPosts =function(initSize, cycMinutes){
    cycMinutes =cycMinutes ||30;
    this.initSize =initSize ||5;
    this.cycMS =cycMinutes *60 *1000;
    this.currentId =0;
    assert(false, "准备loadItems()");
    this.items =this.loadItems();
    assert(false, "初始列表长度 =" +this.items.length);
    this.sortLatest();
    assert(false, "更新时间后列表长度 =" +this.items.length);
};
BGMPosts.prototype ={
    constructor: BGMPosts,
    loadItems :function(){
        var arr =document.getElementsByTagName("div");
        var res =new Array();
        for(var i=arr.length -1; i>=0; i--){
            if (arr[i].id.indexOf("post_")>=0)
                res.push(new BGMPost(arr[i]));
        }
        return res;
    },
    sortLatest :function(){
        if (this.items.length <=0)
            return 0;
        var res =this.items.sort(BGMPost.compareTime);
        this.items =new Array();
        var len =res.length;
        var i =0;
        while (i <len && i<this.initSize){
            i++;
            this.items.push(res[len -i]);
        }
        var lastTime =res[len -i].time;
        while (i <len){
            i++;
            if (lastTime -res[len -i].time >this.cycMS){
                break;
            } else{
                this.items.push(res[len -i]);
            }
        }
        return this.items.length;
    },
    highlight :function(){
        for (var len =this.items.length, i=0; i<len; i++){
            this.items[i].highlight();
        }
    },
    enableJump :function(){
        if (this.items.length <=0)
            return false;
        var that =this;
        var jump =function(e){
            var keyCode =e.which;
            if (!keyCode) keyCode =e.keyCode;
            var key =String.fromCharCode(keyCode).toLowerCase();
            if (key.indexOf('p') >=0){
                that.currentId++;
            } else if (key.indexOf('n') >=0){
                that.currentId--;
            } else {
                return true;
            }
            
            if (that.currentId >= that.items.length){
                that.currentId =0;
            } else if (that.currentId <0){
                that.currentId =that.items.length-1;
            }
            window.scrollTo(document.documentElement.scrollLeft,
                            that.items[that.currentId].dom.offsetTop);
            return true;
        }
        var o =document.getElementById("comment_list");
        o.tabIndex ="0";  //enable div's keypress event in FF
        addEvent(o, "keypress", jump);
        o.focus();
        window.scrollTo(document.documentElement.scrollLeft,
                        that.items[that.currentId].dom.offsetTop);
    }
};
assert(false, "准备BGMPost...");
assert(false, "函数定义终了，开始运行...");
runUserScript(function(){
    var list =document.getElementById("comment_list");
    assert(list, "document.getElementById()未能获取元素", "list获取成功");
    var posts =new BGMPosts(5, 30);   //高亮显示30分钟内新回复，至少5条
    assert(false, "posts获取成功。");
    assert(false, "准备高亮hightlight()……");
    posts.highlight();
    assert(false, "准备enableJump()……");
    posts.enableJump();         //开启在高亮回复间跳转功能，使用p/n键向上/向下跳动
    assert(false, "所有处理成功结束~");
});