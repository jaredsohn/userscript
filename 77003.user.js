// ==UserScript==
// @name        Bangumi posts hightlighter
// @namespace   Bangumi
// @author      zolunx10@hotmail.com
// @description     highlight latest posts on bangumi.tv/group, also provide keyboard shotcut P/N to scan up/down these posts
// @include http://bangumi.tv/group/topic/*
// @include http://bangumi.tv/rakuen/topic/*
// @include http://bgm.tv/group/topic/*
// @include http://bgm.tv/rakuen/topic/*
// @include http://chii.in/group/topic/*
// @include http://chii.in/rakuen/topic/*
// ==/UserScript==
// version 1.2 - add support to chii.in
// version 1.1 - fix browser detect, add support to bgm.tv
// version 1.0 - 2010-05-18

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
}
var runUserScript =function(func){
    if (Browser.opera){
        addLoadEvent(func);
    } else{
        func();
    }
}


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
var BGMPosts =function(initSize, cycMinutes){
    cycMinutes =cycMinutes ||30;
    this.initSize =initSize ||5;
    this.cycMS =cycMinutes *60 *1000;
    this.currentId =0;
    this.items =this.loadItems();
    this.sortLatest();
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

runUserScript(function(){
    var posts =new BGMPosts(5, 30);   //高亮显示30分钟内新回复，至少5条
    posts.highlight();
    posts.enableJump();         //开启在高亮回复间跳转功能，使用p/n键向上/向下跳动
});