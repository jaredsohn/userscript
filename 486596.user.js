// ==UserScript==
// @name       Tieba AutoReply
// @author	【贴吧】@背叛丿拂晓
// @icon	http://b.hiphotos.bdimg.com/album/s%3D1100%3Bq%3D90/sign=098fd2aa0bf79052eb1f433f3cc3ecbb/7e3e6709c93d70cf12ec0bb4fadcd100baa12b70.jpg
// @version	3.5
// @description	自动回复[定时回复][刷帖]
// @include	http://tieba.baidu.com/*
// @exclude	http://tieba.baidu.com/tb/*
// @homepage	http://userscripts.org/scripts/show/486596
// @updateURL	
// ==/UserScript==
var autoFlag = false;
var $red_btn;
var $logBox;
var autoNum = 0;
var autoHeight = 200;
var autoTime = 5;
var autoTimer = null;
$(function()
{
    $(document).delegate('#ueditor_replace','click',function(){
        $red_btn = $('.edui-btn.edui-btn-red');
    	if(!document.getElementById('autoSwitch'))
            main();
    });
});
function main(){
    //
    buildLog();
    buildBtn();
    buildTimeTxt();
    buildSwitchEvent();
}
function buildLog()
{
    $logBox = $('<textarea id="textarea" rows="10" cols="85" style="display:none;background:#fff" readonly="readonly"></textarea>');
    $logBox//设置定位属性以及具体为位置
        .css('position','fixed ')
        .css('top','50%')
        .css('left',0)
    $('body').append($logBox);
}
function buildBtn(){
    $red_btn.after('<div class="edui-btn edui-btn-red" id="auto" cursor:pointer"><input id="autoSwitch" style="margin-top:5px; z-index:10" title="是否开启自动回复？" type="checkbox"></div>');
}
function buildTimeTxt(){
    var $btnTime = $red_btn.parent().find('.edui-btn.edui-btn-voice.edui-last-btn').html('<input id="txtTime" type="text" style="width:30px" />[<font color="red">输入秒数</font>]');
    $btnTime.unbind('click');
    $btnTime.bind('click',function(){
        $('#txtTime').focus();
    });
    $('#txtTime').change(function(){
    	autoTime = validateNum($(this).val());
    });
    function validateNum(value){
        if(!isNaN(value)){
        	return value;
        }else{
        	return 5;
        }
    }
}
function buildSwitchEvent(){
    $('#auto').toggle(function(){
        autoFlag = true;
        $logBox.css('display','block');
        $('#txtTime').blur();
        $('#txtTime').val(autoTime);
        setTimeout(function(){
        	$('#autoSwitch').prop('checked','checked');
        },5);
        autoFlag = true;
        startAuto($('#ueditor_replace').html());
    },function(){
        setTimeout(function(){
        	$('#autoSwitch').prop('checked','');
        },5);
        autoFlag = false;
        clearInterval(autoTimer);
    });
    function startAuto(contentText)
    {
        autoTimer = setInterval(function()
        {
            
            var ranContent = contentText+"<br>";
            for(var i=0; i<25; i++)
            {
                ranContent += randomReply();
            }
            $.ajax({
                type : 'post',
                url : 'http://tieba.baidu.com/f/commit/post/add',
                async: false,
                data: {
                    kw: PageData.forum.name,
                    ie: "utf-8",
                    rich_text: 1,
                    floor_num: 1,
                    fid: PageData.forum.id,
                    tid: PageData.thread.id,
                    content: ranContent,
                    anonymous: 0,
                    tbs: PageData.tbs
                },
                success :function(obj){
                    console.info(obj);
                    if(obj.err_code==0){
                        var re = /<[^<>]+>|&nbsp;/g;
                        $logBox.html(function(index,value)
                       {
                           return value+getTimes()+ranContent.replace(re,'')+"\n";
                       })
                    }else{
                        $logBox.html(function(index,value){
                            return value +getTimes()+'回帖失败!'+"\n";
                        });
                    }
                    document.getElementById('textarea').scrollTop = document.getElementById('textarea').scrollHeight;
                },
                dataType : 'json'
            });		
        },autoTime*1000);
        function getTimes()
        {
            autoNum++;
            var now = new Date();
            var hour=now.getHours();     
            var minute=now.getMinutes();     
            var second=now.getSeconds();
            hour = hour<10?"0"+hour:hour;
            minute = minute<10?"0"+minute:minute;
            second = second<10?"0"+second:second;
            return hour+":"+minute+" "+second+"秒[第"+autoNum+"帖]:";
        }
        function randomReply(){
            eval( "var word=" +  '"\\u' + (Math.round(Math.random() * 20901) + 19968).toString(16)+'"') 
            return word; 
        }
    }
}