// ==UserScript==
// @name            贴吧看图模式
// @description    修改帖子内连续看图模式
// @author          陌百百<feng_zilong@163.com>
// @include         http://tieba.baidu.com/p/*
// @version         0.1
// ==/UserScript==

//定义全局变量
var $ = unsafeWindow.$;
var bwrap,i,n,sImg,bImgId,bImg,bHeight,bWidth;
var t=0,l,cliHeight=document.documentElement.clientHeight,cliWidth=document.documentElement.clientWidth;
var l1,l1_1,l2,tip=0;
/********************初始化节点********************/
//初始化节点
function init(){
    //创建节点
    bwrap=document.createElement("div");
    bwrap.className+="slide_wraper";
    bwrap.id="slide_wrap_1";
    bwrap.style.cssText="position:absolute;opacity:0;z-index:99999";
    document.body.appendChild(bwrap);
    //在img外面加一层a，用来绑定事件
    $(".BDE_Image").each(function () {
		$(this).wrap(function () {
			return ('<a class="img_wrap"></a>');
		});
    });
    //去除连续看图
    $(".BDE_Image").each(function () {
		$(this).parent().html($(this).parent().html());
	});
    
}
init();
/*****************单击显示大图*******************/
//获取大图width和height并创建&插入img节点
function createImg(){
    var op=0;
    
    /*在插入节点前先移除bwrap的子节点，避免在div里同时出现多张图片
    此处要判断bwrap是否有子节点,可用hasChildNodes()方法或childNodes.length属性
    也可以直接for循环,for(i=0;i<bwrap.childNodes.length;i++),若有子节点则遍历移除子节点，若没有，循环体不会被执行
    不判断是否有子节点直接执行移除会出错*/
    if(bwrap.childNodes.length)
    {
        bwrap.removeChild(bwrap.firstChild);
    }
    
    //处理用户未主动关闭图片，直接点下一张图片时border的残留问题
    bwrap.style.opacity="0";
    bwrap.style.height="0";
    bwrap.style.width="0";
    bwrap.style.border="none";
    
    
    //获得大图ID
    sImg=this.childNodes[0];
    bImgId=sImg.src.split("/")[6];
    
    
    /*定义回调函数，在缓存中找到图片或图片加载完成后，由得到的宽高设置样式
    在回调函数中定义样式，是为了防止在未得到bHeight和bWidth值的情况下直接加载出原尺寸的图片
    这样可以等待图片加载完成后再执行下面的代码*/
    function gethw(){
        bHeight=this.height;
        bWidth=this.width;
        //如果图片过大，则缩小显示(不影响长图)
        if(bImg.width>720)
        {
            bHeight=bHeight*(720/bWidth);
            bWidth=720;
            bImg.setAttribute("width","720px");
            bImg.setAttribute("height","auto");
        }
        //根据图片宽高实现居中
        bwrap.style.height=bHeight+"px";
        bwrap.style.width=bWidth+"px";
        t=document.body.scrollTop+(cliHeight-bHeight)/2-12;
        l=(cliWidth-bWidth)/2;
        l1=parseFloat(document.body.scrollTop+(cliHeight-bHeight)/2-12);
        l1_1=parseFloat(document.body.scrollTop);
        l2=l;
        bwrap.style.top=t+"px";
        bwrap.style.left=l+"px";
        //定义border及box-shadow样式
        bwrap.style.cssText+="border:solid rgba(255,255,255,.6) 8px;-webkit-box-shadow:0 0 5px rgba(0,0,0,.5)";
        //处理长图
        if(bHeight>cliHeight)
        {
            bwrap.style.top=document.body.scrollTop+"px";
        }
        bwrap.appendChild(bImg);
        //淡入
        function changeop(){
            op+=0.05;
            bwrap.style.opacity=op;
            if(op<1)
            {
                //若op<1，继续调用自身
                setTimeout(arguments.callee,50);
            }
        }
        changeop();
    }
    
    
    
    //预加载图片
    function loadImg(bImgId,gethw){
        bImg=new Image();
        bImg.src="http://imgsrc.baidu.com/forum/pic/item/"+bImgId;
        //若在缓存中已存在，则从缓存中获取图片的宽高
        if(bImg.complete)
        {
            //若在缓存中，直接指定回调函数的this引用
            gethw.call(bImg);
            //浏览器从缓存中加载图片，不再执行下面的语句
            return;
        }
        //加载完成时修改回调函数的this引用
        bImg.onload=function(){
            gethw.call(bImg);
        };
    }
    //定义loadImg函数中的参数，回调函数指定为gethw
    loadImg(bImgId,gethw);
}



//绑定单击事件
n=document.querySelectorAll(".img_wrap");
for(i=0;i<n.length;i++)
{
    n[i].onclick=createImg;
}



/****************单击关闭&拖拽图片*****************/
//定义mousedown事件
function handleImg(e){
    var lastModify1,lastModify2,mouse_x,mouse_y;
    /*mousedown时初始化tip为0，表示当前mousemove可触发图层移动
    当mouseup时tip设置为1，无法继续再触发图层的移动*/
    tip=0;
    //记录mousedown事件发生时的鼠标坐标
    mouse_x=e.pageX;
    mouse_y=e.pageY;
    //记录上次移动后图层的位置信息
    lastModify1=parseFloat(bwrap.style.top);
    lastModify2=parseFloat(bwrap.style.left);
    //在mousedown事件里为body绑定mousemove事件（方便通过event.pageX记录鼠标的位置信息）
    function dragImg(e){
        //若tip==0，则触发移动
        if(tip==0)
        {
            //计算bwrap时需考虑是否为长图，如果是长图，初始top值和非长图不同，这里用l1_1记录长图的top值，以区分长图和非长图
            bwrap.style.top=(bHeight>cliHeight)?((e.pageY-mouse_y+l1_1)+"px"):((e.pageY-mouse_y+l1)+"px");
            bwrap.style.left=(e.pageX-mouse_x+l2)+"px";
        }
    }
    document.body.onmousemove=dragImg;
    
    //mouseup时记录当前图层位置信息，作为下次移动的基准
    function clo(){
        l1=parseFloat(bwrap.style.top);
        l1_1=parseFloat(bwrap.style.top);
        l2=parseFloat(bwrap.style.left);
        tip=1;
        /*若移动前后位置信息未改变，则单击消失
        用event.button屏蔽右键关闭图片，仅检测到左键时能关闭图片*/
        if((lastModify1/lastModify2==l1/l2||lastModify1/lastModify2==l1_1/l2)&&event.button==0)
        {
            bwrap.style.opacity="0";
            bwrap.style.height="0";
            bwrap.style.width="0";
            bwrap.style.border="none";
            bwrap.removeChild(bwrap.firstChild);
        }
    }
    document.body.onmouseup=clo;
    //mousedown触发时阻止浏览器执行拖拽图片的默认行为
    return false;
}
//绑定mousedown事件
document.getElementById("slide_wrap_1").onmousedown=handleImg;
