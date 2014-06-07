// ==UserScript==
// @name        CSDN自动评论
// @author      o丨Reborn <sbwtws@gmail.com>
// @namespace   http://sbwtw.cn/
// @description 自动评论,返还下载积分
// @require     http://code.jquery.com/jquery-1.9.0.min.js
// @include     http://*.csdn.net*
// @updateURL   https://userscripts.org/scripts/source/157486.meta.js
// @downloadURL https://userscripts.org/scripts/source/157486.user.js
// @icon        http://tb.himg.baidu.com/sys/portrait/item/d92f6fd8ad5265626f726ee90f
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_listValues
// @version     13-01-25.1  Alpha
// ==/UserScript==

//      此为第一个版本,bug一定很多,请大家反馈bug到sbwtws@gmail.com

//13-01-25.1    CSDN自动评论

// 预定义的评论内容,可按照格式自行添加,注意最后一行后面没有逗号
var contentPL=new Array(
"很全面,很好用,谢谢分享.",
"挺不错的资料，谢谢分享.",
"很全,什么都有了,感谢.",
"比相关书籍介绍的详细,顶一个.",
"还行,适合于初级入门的学习.",
"很好的资料,很齐全,谢谢.",
"还可以,就是感觉有点乱.",
"感謝LZ收集,用起來挺方便.",
"感觉还行,只是感觉用着不是特别顺手.",
"很有学习价值的文档,感谢.",
"内容很丰富,最可贵的是资源不需要很多积分.",
"这个真的非常好,借鉴意义蛮大.",
"有不少例子可以参考,目前正需要.",
"下载后不能正常使用.",
"例子简单实用,但如果再全面些就更好了."
);

// 若没有设置最后的评论时间,设置为now
if(!GM_getValue("lastPL")){GM_setValue("lastPL",(new Date()).getTime().toString());}

// css
var  csdnHelperCss=document.createElement('style');
csdnHelperCss.type='text/css';
$(csdnHelperCss).html('\
.popWindow{position:fixed;z-index:10;top:10px;left:10px;}\
.popWindow>span{display:block;text-align:left;color:cyan;text-shadow:0 0 2px white;background-color:#555;\
                box-shadow:-1px -1px 4px gray;margin:5px 0 0 0;padding:00 6px 0 6px;cursor:pointer;}\
');
$('body').prepend(csdnHelperCss);

// 创建消息窗口
$('body').prepend('<div class="popWindow"></div>');

// 我的下载记录页面元素创建
if(/http:\/\/download.csdn.net\/my\/downloads.*/.test(location.href)){
    // 创建元素
    $(".recom_plese").parent().prepend("<input type='button' value='加入评论队列' />");
    // 为每个span绑定事件到check
    $('input[value="加入评论队列"]').click(function(){
        var reg=/\/([_a-zA-Z0-9]+)\/([0-9]+)#/;
        var src=$(this).siblings().first().attr('href').match(reg);
        // 65s后评论
        addQueue(src[1],src[2],(new Date()).getTime()+65000);
        $(this).remove();
    });
    //addQueue();
}

// 添加评论队列
function addQueue(owner,sourceID,stamp){
    // 测试重复
    for each(var index in GM_listValues()){
        if(GM_getValue(index)==(owner+','+sourceID)){
            popWindow('重复的任务!请检查任务队列');
            return;
        }
    }
    GM_setValue(stamp,owner+','+sourceID);
    popWindow('已添加到任务队列,['+owner+','+sourceID+']');
}

// 显示消息
function popWindow(str){
    $('.popWindow').prepend('<span>'+str+'</span>');
    // 绑定移除事件
    setTimeout(function(){
        $('.popWindow>span').last().remove();
    },6000);
}

// 查询有没有可以评论的资源
var time=(new Date()).getTime();
for each(var stamp in GM_listValues()){
    if(stamp=='lastPL'){continue;}
    if(time>stamp && (time-GM_getValue("lastPL"))>65000){
        // 发送评论
        var res=GM_getValue(stamp).split(',');
        var owner=res[0];
        var sourceID=res[1];
        post(owner,sourceID,stamp);
    }
}

// 发送评论
function post(owner,sourceID,stamp){
    $.ajax({
        type:"get",
        url:"http://download.csdn.net/index.php/comment/post_comment",
        headers:{
            "Referer":"http://download.csdn.net/detail/"+owner+"/"+sourceID,
            "Content-type":"application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With":"XMLHttpRequest"
        },
        data:{
            "content":contentPL[Math.round(Math.random()*(contentPL.length-1))],
            "jsonpcallback":"jsonp"+(new Date()).getTime(),
            "rating":"5",
            "sourceid":sourceID,
            "t":(new Date()).getTime()-40000
        },
        success:function(res){
            if(res.indexOf('"succ":1')!=-1){
                popWindow('任务成功!已评论['+owner+','+sourceID+']');
                GM_deleteValue('lastPL');
                GM_deleteValue(stamp);
                GM_setValue('lastPL',(new Date()).getTime());
            }
        }
    });
}
//GM_deleteValue('lastPL');
//GM_setValue((new Date()).getTime()-3600000,'mengsui123,3134201');
