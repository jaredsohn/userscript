// ==UserScript==
// @name          next_page
// @description   单击鼠标翻页,页面左侧单击向前翻页,右侧向后,默认进入001页,遇到首尾页自动循环
// @include       http://www.csszengarden.com/*
// @version       0.3
// ==/UserScript==

"use strict";
//"use asm";

//TODO: 首页向后进入001,向前进入220
//TODO: 获得鼠标初始位置，以决定正确的图标(如果用户鼠标不移动)
//TODO: 经过超链接时，不显示画廊
//TODO: 拖放画廊，以防阻挡页面操作
/*
TODO: 考虑不同分辨率 和 窗口不是最大化的情况
目前在2K及以上的屏幕上无法使用
*/
//TODO: 画廊增加动态效果
//TODO: 在画廊增加段选择器

//TODO: 多语言网站的路径
//TODO: 双击改变两次页面进入幻灯片模式
//TODO: 触摸屏支持

//TODO: 改变浏览器默认光标，以代替目前的div-img

//003 010 011 012 浮动center
//101 中心偏右
//110 右侧太窄，大部分空白

//window document location event? 都是全局变量

//捕捉错误,聊胜于无
try{

(function () {
var arrow_left = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA41JREFUeNrsmttOE0EYx2dbCkVpd0HkKFBQUOOFPICgF3IQNeHCGzVqVyImesMj+BJ6p101GvWq9cBBBBF8ALkwKniBiICgdHcbwnnXb4AQiHbbCbuzddh/spkWtp3+fzPzzXwzi5AjR44cOXLkyNEOFWdHpUfex45C0bz+NvzxmG9wxwA4NBALQaXBzX/TEZI+1/hE5gFU9at/md8MYajWLzIL4ECfGkJxzG9S9dcTfqrDwUWjkvK3akjTURAulOBqpt0D0qyuoKxXDelgXk/RWcBSACU9CrS8HiQYj2FmABR1g3kNBQk+Iv2o46lPh5YEwYLXStxoH8/8RD3PxjSY16UkE+23mJ9qsMe86QD2dMrELf+rUbDNvKkAsjvIzc+cste8aQD4dpm42ytN9ps3BUDWyyhxy8fOZKeE+W0D2PWC3Pzs2dQxvy0A3udRw26f6YG44HUjj9taA7DKHIEldBvkEBFqADwR45ZPB9OC10W1JXEeMV7HRywH4A7P4M2MD4ZxwcMhl4vuVgPuCXKTUG75UhiWtwkztrllfS3Dp6sAlVxA1xMbW1xM1dzPjGRI13HGdsvwnqXl1T5JWSN0AJzLHUTPpiXDhQ8e/gtLlOczro3uOuDplPHqD/eCuYXVoGF5y2PzrRURugCwnvwkWwLrSELn89lYCG3o8SRxHoAuFIjsAMB6NEEO4WKhyA4ArIfj5BAuFYnsAMB6MEYO4fI+kR0AWPe/k0O4UiKyAwArNEoOQSxl7Gzw3jdyCFfLGDsbvDtCCqEatQQYOhtsCYiQqEsoiUPB9Yv62aD1uxbXykVIjKTV5CiZizkAWK0VyUIIswkA6/r+RMNBgnvYOBs01J3hfwVGCd2oZP8RmQ3dHtrykBS6WWXbQ1I7XtR7wOGBGA9FCVScsbZFgBag+P6pxqcwD+BgfywbitI4/x79UuuLMgug8p0qQFGc4Lah4eN+qpuJaTQqqehT/TDT5cPLZaP7YDhkQsEWgECv6tM0tDeR+XW5aQ8BSwGU9ii7NV3PSdI81jwzAIrfKJnQ7QUC8ytjJ/k5JgAUditeMO8nMK9BNKY+A1gyC+R1KenwpVkEH9E5DqmT9fzKfw8gt1P2cGuRPGnz8AtmpxsEDdkk0wDkdMg4gmcQVc6h+d+N9pk3DQDfLuPHIdIIK16KNgm2n6NvG4DvlYy/hHRfQVNPC04m5siR/fojwABrHHXX1TCaxAAAAABJRU5ErkJggg==)";

var _gallery={
    //控制淡入淡出
    outer:undefined,
    init:function( max_page, empty_pages ){
        var i, pic_num, pics = [], inner;

        this.outer = document.createElement( "div" );
        this.outer.id = "my_scrollpane";
        var left_px=parseInt( ( screen.width - 800 ) / 2, 10 ) + "px"
        var style_node=document.createElement("style");
        /*
        必须将 div 的样式与 :hover 用同样方法插入
        以防CSS优先级规则将 :hover 覆盖
        */
        var style_text = document.createTextNode("#my_scrollpane{ opacity:0; transition: all 1s ease; left:"+left_px+"; top:450px; width:800px; height:150px; position:fixed; z-index:999; background-color:black; overflow-x:scroll; } #my_scrollpane:hover{opacity:1;}");
        style_node.appendChild(style_text);
        document.head.appendChild(style_node);
        

        inner = document.createElement("div");
        inner.id = "_gallery";
        inner.style.cssText = "width:39000px; height:105px;";

        for( i = 0; i < max_page; i++ ){
            //skip empty page
            if( empty_pages.indexOf( i + 1 ) > -1 ){
                continue;
            }
            pic_num = ( "00" + ( i + 1 ) ).substr(-3);
            pics[i] = document.createElement("img");
            pics[i].className = "my_preview";
            pics[i].style.cssText="cursor:pointer; float:left; margin:0.5em; display:inline-block; width:160px; height:104px; top:0px;";
            pics[i].title=pic_num;
            pics[i].style.left=i*160+"px";
            pics[i].src = "http://www.mezzoblue.com/zengarden/screenshots/"+pic_num+".jpg";
            inner.appendChild(pics[i]);
        }
        

        this.outer.appendChild(inner);
        document.body.appendChild( this.outer );
        //初始状态下 画廊显示1秒以邀请用户 然后淡出
        //必须清除刚加上的CSS规则 否则会覆盖淡入淡出规则
        document.querySelector('#my_scrollpane').style.opacity=1;
        setTimeout("document.querySelector('#my_scrollpane').style.opacity=0;document.querySelector('#my_scrollpane').style.cssText=''", 1000);
    },
};

var core = {
    min_page: 1,
    max_page: 220,
    empty_pages: [108, 129, 183],
    my_arrow: undefined,

    init: function ( ) {
        //初始化箭头图标64x64
        this.my_arrow = document.createElement("div");
        this.my_arrow.style.cssText = "width:64px; height:64px; position:fixed; z-index:999; display:block;";
        this.my_arrow.style.backgroundImage = arrow_left;
        document.body.appendChild(this.my_arrow);

        //初始化画廊
        _gallery.init( this.max_page, this.empty_pages);
    },

    change_arrow: function ( x, y ){
        //根据给定坐标改变指示器
        //x y 偏移1个像素，以防干扰系统鼠标
        this.my_arrow.style.left = x + 1 + "px";
        this.my_arrow.style.top = y + 1 + "px";
        this.my_arrow.style.transform = (x * 2 > screen.width) ? "rotate(180deg)" : "rotate(0deg)";
    },

    direct_page: function( page_str ){
        var new_url = "?cssfile=/" + page_str + "/" + page_str + ".css";
        //使用相对路径
        location.assign( new_url );
    },

    page_turn: function ( x ){
        var page_delta, page_num, page_str, new_url;

        if ( location.pathname === "/" ) {
            new_url = "?cssfile=/001/001.css";
        } else {
            //解析路径名中的数字
            //在屏幕左边点鼠标向前翻页,右边向后翻页
            page_delta = (x * 2 > screen.width) ? 1 : -1;
            page_num = parseInt(/\d+/.exec( location.pathname )[0], 10) + page_delta;

            //--处理特殊的页号
            //遇首页、尾页,循环显示
            if ( page_num < this.min_page ) {
                page_num = this.max_page;
            }
            if ( page_num > this.max_page ) {
                page_num = this.min_page;
            }            
            
            // 跳过空白页(向前或向后)
            if( this.empty_pages.indexOf( page_num ) > -1 ) {
                page_num += page_delta;
            }

            //变为3位整数字符串
            page_str = ( "000" + page_num ).substr( -3 );

            new_url = "?cssfile=/" + page_str + "/" + page_str + ".css";
        }
        
        //使用相对路径
        location.assign( new_url );
    }
};

//程序入口
window.addEventListener("load", function(){
    core.init();

    window.addEventListener("mousemove", function( evt ){
        core.change_arrow( evt.clientX,  evt.clientY );
    });

    window.addEventListener("click", function ( evt ) {
        //TODO: 记住鼠标位置
        //仅检测鼠标左键，防止干扰右键的功能菜单
        //还有个stopImmediatePropagation()
        if(evt.button!==0){
            evt.stopPropagation();
            return;
        }

        //在画廊的图片上单击出鼠标,按 title 直接跳转
        if(evt.target.parentNode.id === "_gallery"){
            core.direct_page( evt.target.title );
        }else{
            //在页面上单击鼠标
            core.page_turn( evt.clientX );
        }
    });
});

})();

}catch(e){alert(e);}