// ==UserScript==
// @name       Bangumi.tv Book-Series Wiki Helper
// @version    0.6.5.4
// @author     Bonegumi
// @description  Bangumi.tv 书籍条目单行本排序辅助
// @require    http://upcdn.b0.upaiyun.com/libs/jquery/jquery-1.8.2.min.js
// @grant      GM_addStyle
// @include    http://bgm.tv/subject/*
// @include    http://bangumi.tv/subject/*
// @include    http://chii.in/subject/*
// @include    http://bgm.tv/subject/*/add_related/subject/book
// @include    http://bangumi.tv/subject/*/add_related/subject/book
// @include    http://chii.in/subject/*/add_related/subject/book
// @include    http://bgm.tv/book/browser/series*
// @include    http://bangumi.tv/book/browser/series*
// @include    http://chii.in/book/browser/series*
// ==/UserScript==
if(location.href.indexOf('add_related/subject/book')!=-1){
    function autoItemSort(mode,item,type,param){
        var itemTitle = item.parent().next('.title').children('a'), itemSort = item.next('.item_sort'),
            seekRecord = itemTitle.children('b'), titleText = seekRecord.length ? seekRecord.text() : itemTitle.text(),    
            forceOrder = mode ? !!itemType[type](titleText,param) : itemType[type](titleText,param)&&itemSort.val()==0
        //itemTitle.text(itemTitle.text().replace(subjectTitle,''))
        //itemTitle.text(itemTitle.text().match(/\(\d+\)|（\d+）/)[0].match(/\d+/)[0])      
        if (forceOrder){
            var result = itemType[type](titleText,param);
            //console.log(result);
            itemTitle[0].innerHTML = itemTitle.text();
            if(type=='CtoD'||type=='DtoC'){
                //itemTitle[0].innerHTML = itemTitle[0].innerHTML.replace(titleText,'<b style="color:red;">'+result+'</b>');
                itemTitle.html(itemTitle.text().replace(titleText,'<b style="color:red;">'+result+'</b>'))
            }else if (type=='CtoNum'||type=='DaijiToNum'||type=='RtoA'){
                //itemTitle[0].innerHTML = itemTitle[0].innerHTML.replace(result[0],'<b style="color:red;">'+result[1]+'</b>');
                itemTitle.html(itemTitle.text().replace(result[0],'<b style="color:red;">'+result[1]+'</b>'))
            }else {
                //itemTitle[0].innerHTML = itemTitle[0].innerHTML.replace(result,'<b style="color:red;">'+result+'</b>');
                itemTitle.html(itemTitle.text().replace(result,'<b style="color:red;">'+result+'</b>'))
                if (!isNaN(result)){
                    itemSort.val(result*1);
                }
            }
        }else{
            return false;
        }  
    }
    
    var subjectTitle = $('h1 a').text(), selectItem = $('.tip.rr select'),
        itemType = {
            'replaceTitle': function (t){
                if(t.indexOf(subjectTitle)!=-1){return t.replace(subjectTitle,'');}
                else if(t.indexOf(subjectTitle.replace(/\s/g,''))!=-1){return t.replace(subjectTitle.replace(/\s/g,''),'');}
                else if(t.replace(/\s/g,'').indexOf(subjectTitle)!=-1){return t.replace(/\s/g,'').replace(subjectTitle,'');}
                else if(convertChar['ToCDB'](t).indexOf(convertChar['ToCDB'](subjectTitle))!=-1){
                    var s=convertChar['ToCDB'](t).indexOf(convertChar['ToCDB'](subjectTitle)),
                        l=convertChar['ToCDB'](subjectTitle).length;
                    return t.substr(s,l);
                }else{return false;}
            },
            'delTail': function (t){
                if(!t.match(/\(\d+\)$|（\d+）$/)){
                    return t.replace(/\s*\(.*?\)$|\s*（.*?）$/m,function($0){
                        if($0.match(/^\s*\(\d+\)\s*|^\s*（\d+）\s*/)){
                            return $0.match(/^\s*\(\d+\)|^\s*（\d+）/)[0]
                        }else{return ''}
                    })
                }else{return false;}
            },
            'matchNum': function (t){
                if(t.match(/\(\d+\)|（\d+）/)){return t.match(/\(\d+\)|（\d+）/)[0].match(/\d+/)[0]}else{return false;}
            },
            'numTail': function (t){
                if(t.match(/\d+$/m)){return t.match(/\d+$/m)[0];}else{return false;}
            },
            'findNum': function (t){
                if(t.match(/\d+\s|\s\d+|\d+$|\.\d+|^\d+|\d+/m)){return t.match(/\d+\s|\s\d+|\d+$|\.\d+|^\d+|\d+/m)[0].replace(/\./,'')}else{return false;}
            },
            'CtoNum': function (t){
            	if(t.match(/[零一二三四五六七八九十百]+/)){return [t.match(/[零一二三四五六七八九十百]+/)[0],numTool.CtoNum(t.match(/[零一二三四五六七八九十百]+/)[0])]}else{return false;}
            },
            'DaijiToNum': function (t){
            	if(t.match(/[零壱弐参肆伍陸漆捌玖拾佰]+/)){return [t.match(/[零壱弐参肆伍陸漆捌玖拾佰]+/)[0],numTool.DaijiToNum(t.match(/[零壱弐参肆伍陸漆捌玖拾佰]+/)[0])]}else{return false;}
            },
            'RtoA': function (t){
            	if(t.match(/[IVXLCDM]+/)){return [t.match(/[IVXLCDM]+/)[0],numTool.RtoA(t.match(/[IVXLCDM]+/)[0])]}else{return false;}
            },
            'CtoD': function (t){
                return convertChar['ToDBC'](t)
            },
            'DtoC': function (t){
                return convertChar['ToCDB'](t)
            },
            'delStr': function (t,p){
                return t.replace(p,'')
            },
            'regStr': function (t,p){
            	var reg_str = new RegExp(p[0].toString(),'gm'), replace_str = p[1].toString();
                return t.replace(reg_str,replace_str)
            }
        },
        convertChar = {
            'ToDBC': function(str){
                var tmp = ""; 
                for(var i=0;i<str.length;i++) { 
                    if(str.charCodeAt(i)==32) { 
                        tmp += String.fromCharCode(12288); 
                    } else if(str.charCodeAt(i)<127) { 
                        tmp += String.fromCharCode(str.charCodeAt(i) + 65248); 
                    } else {
                        tmp += String.fromCharCode(str.charCodeAt(i));
                    }
                } 
                return tmp; 
            },
            'ToCDB': function(str) {
                var tmp = ""; 
                for(var i=0;i<str.length;i++) { 
                    if(str.charCodeAt(i)==12288){
                        tmp += String.fromCharCode(32); 
                    } else if(str.charCodeAt(i)>65248&&str.charCodeAt(i)<65375) { 
                        tmp += String.fromCharCode(str.charCodeAt(i)-65248); 
                    } else { 
                        tmp += String.fromCharCode(str.charCodeAt(i)); 
                    } 
                } 
                return tmp 
            }
        },
        numTool = {
            'CtoNum': function (str){
                var units = '个十百', chars = '零一二三四五六七八九', num = 0, strs = str;
                function recursion(strs){
                    if (strs[0]=='十'){
                        var temp = chars.indexOf(strs[1])!=-1?chars.indexOf(strs[1]):0
                        num = num + 10 + temp;
                    }else if (units.indexOf(strs[1])!=-1) {
                        var digit = chars.indexOf(strs[0]), unit = units.indexOf(strs[1]);
                        var temp = digit * Math.pow(10,unit);
                        num = num + temp
                        strs = strs.slice(2)
                        recursion(strs)
                    }else if(strs.slice(-1)&&chars.indexOf(strs.slice(-1))!=-1) {
                        var temp = chars.indexOf(strs.slice(-1))*1;
                        num = num + temp
                    }else{num = num}
                }
                recursion(str)
                return num
            },
            'DaijiToNum': function (str){
                var units = '个拾佰', chars = '零壱弐参肆伍陸漆捌玖', num = 0, strs = str;
                function recursion(strs){
                    if (strs[0]=='拾'){
                        var temp = chars.indexOf(strs[1])!=-1?chars.indexOf(strs[1]):0
                        num = num + 10 + temp;
                    }else if (units.indexOf(strs[1])!=-1) {
                        var digit = chars.indexOf(strs[0]), unit = units.indexOf(strs[1]);
                        var temp = digit * Math.pow(10,unit);
                        num = num + temp
                        strs = strs.slice(2)
                        recursion(strs)
                    }else if(strs.slice(-1)&&chars.indexOf(strs.slice(-1))!=-1) {
                        var temp = chars.indexOf(strs.slice(-1))*1;
                        num = num + temp
                    }else{num = num}
                }
                recursion(str)
                return num
            },
            'RtoA':function(s){
                var c, c1, v, v1, arabic = 0, s = s.toLowerCase();
                for(i=0; i<s.length; i++){
                    c = s.charAt(i), v = numTool.getValue(c);
                    if (v == -1){return -1;}
                    if (i+1 < s.length){
                        c1 = s.charAt(i+1);
                    } else {c1 = '!';}
                    v1 = numTool.getValue(c1);
                    if (v1>v){
                        arabic += v1-v;
                        i++;
                    } else {arabic += v;}
                }
                if (arabic < 40000){return (arabic);} else {return (-1);}
            },
            'getValue':function (c){
                var result = -1;
                switch (c){
                    case  'm':{
                        result = 1000;
                    } break;
                    case 'd':{
                        result = 500;
                    } break;
                    case 'c':{
                        result = 100;
                    } break;
                    case 'l':{
                        result = 50;
                    } break;
                    case 'x':{
                        result = 10;
                    } break;
                    case 'v':{
                        result = 5;
                    } break;
                    case 'i':{
                        result = 1;
                    } break;
                }
                return result;
            }
        }
    
    function itemSortType(mode,type){
        var del_string = type === 'delStr' ? $('#orderAuto').find(':text[name=del_string]').val() : undefined,
            reg_string = type === 'regStr' ? [$('#orderAuto').find(':text[name=reg_string]').val(),$('#orderAuto').find(':text[name=replace_para]').val()] : undefined;
        selectItem.each(function(){
            var selectType = $(this).val();
            if(selectType==1003){
                type === 'delStr' ? autoItemSort(mode,$(this),type,del_string) : type === 'regStr' ? autoItemSort(mode,$(this),type,reg_string) : autoItemSort(mode,$(this),type)
            }else{
                $(this).parents('li[item_id]').css({'opacity':'0.6','background-color':'#fff'})
            }
        })
    }
    
    var orderAutoHTML = $('<div id="orderAuto">').css({'width':'100px','background-color':'#F0F0F0','position':'absolute','left':'10px','padding':'5px 0'}),
        typeBtnHTML = '<input name="forceMode" type="checkbox" style="margin-left: 18px;"/>强制查找'
    				+ '<a id="clearResult" class="chiiBtn clearBtn" href="javascript:;" style="text-align: center;width: 80px;padding: 0px;margin: 0 9px 5px;">清空结果</a></br>'
                    + '<a id="autoMode" class="chiiBtn autoBtn" href="javascript:;">'
                    + '<span style="color: white;background: #F09199;padding: 0 5px;border-radius: 5px;font-weight: normal;text-shadow: none;">ᴀ</span>自动模式</a><br/>'
                    + '<a id="replaceTitle" class="chiiBtn typeBtn" href="javascript:;">替换主标题</a>'
                    + '<a id="delTail" class="chiiBtn typeBtn" href="javascript:;">删除括号尾缀</a>'
                    + '<a id="matchNum" class="chiiBtn typeBtn" href="javascript:;">括号数字替换</a>'
                    + '<a id="numTail" class="chiiBtn typeBtn" href="javascript:;">末尾数字替换</a>'
                    + '<a id="findNum" class="chiiBtn typeBtn" href="javascript:;">数字替换</a>'
                    + '<a id="CtoNum" class="chiiBtn typeBtn" href="javascript:;">汉字数字转换</a>'
                    + '<a id="DaijiToNum" class="chiiBtn typeBtn" href="javascript:;">日语大字转换</a>'
                    + '<a id="RtoA" class="chiiBtn typeBtn" href="javascript:;">罗马数字转换</a>'
                    + '<a id="CtoD" class="chiiBtn typeBtn" href="javascript:;">半角转全角</a>'
                    + '<a id="DtoC" class="chiiBtn typeBtn" href="javascript:;">全角转半角</a>'
                    + '<input name="del_string" type="text" style="width:80px;margin:7px 9px 0;position: relative;bottom: -3px;"/><a id="delStr" class="chiiBtn typeBtn" href="javascript:;">清除字符</a>'
                    + '<input name="reg_string" type="text" style="width:80px;margin:7px 9px 0;position: relative;bottom: -3px;"/><input name="replace_para" type="text" style="width:80px;margin:0 9px 0;position: relative;bottom: -3px;"/>'
                    + '<a id="regStr" class="chiiBtn typeBtn" href="javascript:;">正则替换</a>'
    orderAutoHTML.html(typeBtnHTML)
    $('#crtRelateSubjects').before(orderAutoHTML)
    $('#orderAuto .typeBtn').css({'text-align':'center','width':'80px','padding':'0','margin':'5px 9px 0'})
    $('#orderAuto .autoBtn').css({'text-align':'center','width':'80px','padding':'0','margin':'5px 9px','font-weight':'bold','color':'#000'})
    //$('#replaceTitle').live('click',function(){itemSortType('replaceTitle')})
    
    $('#modifyOrder').after('<div class="rr" style="padding-right:15px;"><input name="force_sort" type="checkbox"/>开启排序框</div>')
    localStorage.getItem('force_sort')==='true'?$(':checkbox[name="force_sort"]').attr('checked',true):$(':checkbox[name="force_sort"]').attr('checked',false)
    localStorage.getItem('force_sort')==='true'?$('.item_sort').css('display','initial'):$('.item_sort').removeAttr('style')
    $(':checkbox[name="force_sort"]').live('click',function(){
    	var flag = localStorage.getItem('force_sort')==='true'?true:false;
        $(this).attr('checked',!flag)
        !flag?$('.item_sort').css('display','initial'):$('.item_sort').removeAttr('style')
        localStorage.setItem('force_sort',!flag)
    })
    
    $('#crtRelateSubjects :text.item_sort').each(function(){
    	$(this).attr('old_order',$(this).val())
    })
    
    $('#orderAuto .typeBtn').each(function(){
        var t = $(this), tid = t.attr('id')
        $(this).live('click',function(){
            $('.item_sort').css('display','initial');
            var mode = $('#orderAuto :checkbox[name="forceMode"]').attr('checked')
            itemSortType(mode,tid)
        })
    })
    $('#orderAuto .clearBtn').live('click',function(){
    	$('#crtRelateSubjects li .title a').each(function(){$(this).text($(this).text())})
        $('#crtRelateSubjects :text.item_sort').each(function(){
            $(this).val($(this).attr('old_order'))
        })
        $('#crtRelateSubjects li').removeAttr('style')
    })
    $('#orderAuto .autoBtn').live('click',function(){
        $('.item_sort').css('display','initial');
        var mode = $('#orderAuto :checkbox[name="forceMode"]').attr('checked');
        /*for (p in itemType){
            var litemode = (p!='CtoD'&&p!='DtoC'&&p!='delStr'&&p!='regStr');
            if(mode){
                if(litemode){itemSortType(mode,p)}
            }else{
                itemSortType(mode,p)
            }
            //console.log(p)
        }*/
        itemSortType(mode,'replaceTitle')
        itemSortType(mode,'delTail')
        itemSortType(mode,'matchNum')
        itemSortType(mode,'numTail')
        itemSortType(mode,'findNum')
    })

}
if(($('#navMenuNeue').children('li:eq(1)').children('a').hasClass('focus'))&&(location.href.indexOf('add_related/subject/book')==-1)){
    var seriesURL;
    if($('.sep .sub').text()=='系列'){seriesURL = $('.sep .sub').next().attr('href')}else{seriesURL = location.pathname}
    $('.modifyTool p:eq(1)')
    .append(' / <a href="'+seriesURL+'/add_related/subject/book'+'" class="l">单行本</a>')
}
if(location.href.indexOf('book/browser/series')!=-1){
	$('h3').each(function(){
    	var href = $(this).children('a').attr('href');
        $(this).after('<div class="modifyTool"><span class="tip_i"><p style="width:80px;background:#FFFFA0;"><span class="tip">关联：</span><a href="'+href+'/add_related/subject/book" class="l">单行本</a></p></span></div>')
    })
}