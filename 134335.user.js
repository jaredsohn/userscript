// ==UserScript==
// @name       emotions for douban group
// @namespace  http://saediy.sinaapp.com/
// @version    0.2
// @match      http://www.douban.com/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require    http://userscripts.org/scripts/source/134440.user.js
// @copyright  2012+, JerryWang
// @reason
// 1.some bug fixed.
// @end
// ==/UserScript==

// data from http://baike.baidu.com/view/56720.htm
$(function(){    
    script_updater.update({
        script_name:"Emotions For Douban Group",
        script_version:"0.2",
        script_id:"134335"
    });
    var emtions = {
        traditional:{
            data:[
                {key:':-)',value:'微笑'},
                {key:':-(',value:'难过'},
                {key:';-)',value:'使眼色'},
                {key:':-D',value:'开心'},
                {key:':-P',value:'吐舌头'},
                {key:':-O',value:'惊讶, 张大口'},
                {key:'8-)',value:'戴眼镜者的微笑'},
                {key:'xc==',value:'呕'},
                {key:'^-^',value:'微笑'}
            ],
            message:'传统风格'
        },
        cartoon:{
            data:[
                {key:'@_@',value:'疑惑、晕头转向'},
                {key:'o_O',value:'讶异'},
                {key:'XD',value:'(横向看) 现在多用于高兴地笑、张开嘴大笑'},
                {key:'T_T',value:'哭得很伤心'},
                {key:'-_-b',value:'流汗'},
                {key:'=_="',value:'无奈'},
                {key:'=3=',value:'亲吻、嘟嘴'},
                {key:'^o^/',value:'抱抱'},
                {key:'(^O^)/',value:'开心'},
                {key:'._/.#',value:'生气'},
                {key:'(=^_^=)',value:'喵猫'},
                {key:'(￣(工)￣)',value:'大狗熊'},
                {key:'orz',value:'败给你了'},
                {key:'<{=····· ',value:'乌鸦飞过，冷场'}
            ],
            message:'动漫风格'
        },
        south:{
            data:[
                {key:'<（￣︶￣）>',value:'满足且得意'},
                {key:'<（￣︶￣）/',value:'满足并且伸出手，表示赞同'},
                {key:'<（@￣︶￣@）>',value:'满足地脸红'},
                {key:'（#￣▽￣#）',value:'害羞'},
                {key:'\（￣︶￣）/',value:'抱抱'},
                {key:'b（￣▽￣）d"',value:'竖起双手拇指说好'},
                {key:'╰（￣▽￣）╭',value:'眉飞色舞'},
                {key:'（￣︶￣）↗',value:'出发吧'},
                {key:'○（*￣︶￣*）○',value:'吃饱睡好'},
                {key:'♀（￣▽￣）/',value:'优质女孩'},
                {key:'♂（￣▽￣）/',value:'优质男孩'},
                {key:'╮（╯◇╰）╭',value:'啾～啾～亲一个'},
                {key:'╭（′▽‵）╭（′▽‵）╭（′▽‵）╯',value:'GO!'},
                {key:'（￣▽￣）～■□～（￣▽￣）',value:'乾杯'},
                {key:'<（￣︶￣）><（￣︶￣）><（￣︶￣）>',value:'当我们同在一起'},
                {key:'（┬_┬）',value:'流泪'},
                {key:'（>﹏<）',value:'痛苦'},
                {key:'（┬_┬）↘',value:'跌倒'},
                {key:'〒▽〒',value:'真命苦'},
                {key:'～>_<～',value:'哭泣中．．．'},
                {key:'…（⊙_⊙；）…',value:'嘎？'},
                {key:'（￣∞￣）',value:'猪！'},
                {key:'（︶^︶）',value:'不满'},
                {key:'╰（‵□′）╯',value:'暴怒'},
                {key:'（︶^︶）=凸',value:' 比中指'}
            ],
            message:'东亚风格'
        },
        jp:{
            data:[
                {key:'˙ˍ˙',value:'小眼睛'},
                {key:'˙0˙',value:'小眼睛'},
                {key:'˙^˙',value:'小眼睛'},
                {key:'˙ε ˙',value:'小眼睛'},
                {key:'˙ 3˙',value:'小眼睛'},
                {key:'˙ω˙"',value:'小眼睛'},
                {key:'˙﹏˙',value:'小眼睛'},
                {key:'˙△˙',value:'小眼睛'},
                {key:'˙▽˙',value:'小眼睛'},
                {key:'⊙ˍ⊙',value:'大眼睛'},
                {key:'⊙0⊙',value:'大眼睛'},
                {key:'⊙^⊙',value:'大眼睛'},
                {key:'⊙ω⊙',value:'大眼睛'},
                {key:'⊙﹏⊙',value:'大眼睛'},
                {key:'⊙△⊙',value:'大眼睛'},
                {key:'⊙▽⊙',value:'大眼睛'},
                {key:'≧ˍ≦',value:'嬉皮眼'},
                {key:'≧0≦',value:'嬉皮眼'},
                {key:'≧^≦',value:'嬉皮眼'},
                {key:'≧ε≦',value:'嬉皮眼'},
                {key:'≧ 3≦',value:'嬉皮眼'},
                {key:'≧ω≦',value:'嬉皮眼'},
                {key:'≧﹏≦',value:'嬉皮眼'},
                {key:'≧△≦',value:'嬉皮眼'},
                {key:'≧▽≦',value:'嬉皮眼'}
            ],
            message:'日系风格'
        }
    };
    
    
    function deal_td(index,len,data){
        return index>=len ? "<td align='center'></td>" : "<td align='center'><a href='javascript:void(0);' title='"+data[index].value+"'>"+data[index].key+"</a></td>";
    }
    
    
    function change_tab(data){
        var len = data.length,index = 0,final_trs = "",
            tr_len = len % 4 === 0 ? len/4 : parseInt(len/4) +1;
        for(;index<tr_len;index++){
            final_trs+=("<tr><td align='center'><a href='javascript:void(0);' title='"+data[index*4].value+"'>"+data[index*4].key+"</a></td>");
            final_trs+=deal_td(index*4+1,len,data);
            final_trs+=deal_td(index*4+2,len,data);
            final_trs+=deal_td(index*4+3,len,data);
            final_trs+="</tr>";
        }
        return final_trs;
    }
    
    
    function showEmotion(){
        if(maindiv!==undefined && !maindiv.is(":visible")){maindiv.show();return;}
        maindiv = $("<div id='myEmotionsDiv'/>");
        var nav = $("<div class='nav'><span class='close'><a href='javascript:void(0);' title='关闭'>×</a></span></div>"),
            maintable = $("<table class='maintable' cellpadding='0' cellspacing='0'></table>"),
            left = 0,
            top = 0,temp="",
            first_emotion_data = emtions.traditional.data;
        
        $.each(emtions,function(){
            temp += ("<span class='tab'>"+this.message+"</span>");
        });
        nav.prepend(temp);
        //add default css for default tab
        nav.find("span.tab:eq(0)").addClass('current');
        $(document.body).append(maindiv.append(nav).append(maintable.append(change_tab(first_emotion_data))));
        //bind click event
        maintable.find("td a").click(function(){ele.val(ele.val()+$(this).text());});
        nav.find("span.close").click(function(){maindiv.hide();});
        nav.find("span.tab").click(function(){
            maintable.html('');
            var _this = this,data=first_emotion_data;
            $.each(emtions,function(){
                if(this.message === $(_this).text()){
                    data = this.data;
                    nav.find("span.tab.current").removeClass('current');
                    $(_this).addClass('current');
                    return false;
                }
            });
            maintable.html(change_tab(data));
            maintable.find("td a").click(function(){ele.val(ele.val()+$(this).text());});
        });
        maindiv.css('left',showEmotionBtn.offset().left+500+'px').css('top',showEmotionBtn.offset().top-150+'px');
        //for drag start
        maindiv.mousedown(function(){
            isdraged = true;
            offsetX = event.clientX;
            offsetY = event.clientY;
            $(this).css('cursor','move');
            left = $(this).offset().left;
            top = $(this).offset().top;
        }).mouseup(function(){isdraged=false;});
        
        $(document).mousemove(function(){
            if(!isdraged)return;
            var x = event.clientX-offsetX+left,y = event.clientY-offsetY+top;
            maindiv.css('cursor','move').css('left',x+'px').css('top',y+'px');
            left = $(this).offset().left;
            top = $(this).offset().top;
        });
        //for drag end
        
    }
    
    
    var ele = $("div.txd>form[name='comment_form']>textarea#last");
    if(ele.length>0){
        var form = $("div.txd>form[name='comment_form']"),
            showEmotionBtn = $("<input value='来点表情' type='button'/>").bind('click',showEmotion),
            isdraged = false,
            offsetX = 0,offsetY = 0,
            maindiv=undefined;
        
        (function(){
             GM_addStyle("#myEmotionsDiv {\
                width:500px;\
                border:1px solid #C1DAD7;\
                -moz-border-radius: 9px;\
                -webkit-border-radius: 9px;\
                border-radius: 9px;\
                padding-top:5px;\
                z-index:9999999;\
                position:absolute;\
            }\
            #myEmotionsDiv .nav {\
                position:relative   ;\
                border-bottom:1px solid #C1DAD7;\
                padding-left:10px;\
                cursor:move;\
            }\
            #myEmotionsDiv .nav .tab{\
                color:#0066B8;\
                width:50px;\
                padding-left:5px;\
                padding-right:5px;\
                margin:0px;\
                cursor:pointer;\
                -moz-border-radius: 5px;\
                -webkit-border-radius: 5px;\
                border-radius: 5px;\
            }\
            #myEmotionsDiv .nav .close{\
                position:absolute ;\
                right:5px;\
            }\
            #myEmotionsDiv .maintable{\
                width:490px;\
                margin-left:5px;\
                margin-top:5px;\
                margin-bottom:5px;\
                border-collapse:collapse;\
            }\
            #myEmotionsDiv .maintable tr{\
                font: bold 11px 'Trebuchet MS', Verdana, Arial, Helvetica, sans-serif;\
                color: #4f6b72;\
            }\
            #myEmotionsDiv .maintable tr td {\
                 width:95px;\
                 border: 1px solid #C1DAD7;\
                 background: #fff;\
                 font-size:11px;\
                 padding: 6px 6px 6px 12px;\
                 color: #4f6b72;\
            }\
            .current{background-color:#FFF0E2 !important}\
            #myEmotionsDiv a{text-decoration:none}"); 
        })();
        form.append(showEmotionBtn);
    }
    
});