// ==UserScript==
// @name       Bangumi.tv Music Wiki Helper
// @version    0.6.1
// @author     Bonegumi
// @description  Bangumi.tv 音乐条目编辑辅助，虾米音乐曲目导出。
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require    http://malsup.github.io/jquery.blockUI.js
// @include    http://bgm.tv/subject/*/ep
// @include    http://bangumi.tv/subject/*/ep
// @include    http://chii.in/subject/*/ep
// @include    http://bgm.tv/subject/*/ep/*
// @include    http://bangumi.tv/subject/*/ep/*
// @include    http://chii.in/subject/*/ep/*
// @include    http://www.xiami.com/album/*
// ==/UserScript==

//章节多选增强
if ((location.pathname.search(/\/ep$/)!=-1)&&($('#navMenuNeue').find('a[href="/music"]').hasClass('focus'))){
    var style = '.select_btn {float: right; cursor: pointer; font-size: 12px; color: black; margin: 0 5px;}'
              + '.select_btn:hover {text-decoration: underline;}'
              + '.custom_select input {width: 15px;}'
              + '.check_switch {float: right; cursor: pointer; color: #444;}'
              + '.check_switch input {cursor: pointer;}'
              + 'div.songListClearup {margin-left: 85px;}'
              + 'div.songListClearup input {margin-left: 10px;}'
    $('head').append('<style>' + style + '</style>')
    
    $('#subject_inner_info').after('<div id="multi_check" class="menu_inner"><a href="javascript:void(0)" class="l">/ 选择增强功能开关</a><span class="check_switch"><input type="checkbox"/>保持开启</span></div>')
    $('#multi_check a').live('click',function(){$('.select_btn').toggle();$('.line_list .inputBtn[name="submit"]').css('position','static')})
    
    $('span.check_switch').live('click', function(){    //增强功能开关保持开启
        var flag = localStorage.getItem('check_switch') == "true" ? true : false ;
        localStorage.setItem('check_switch', !flag);
        $(this).children('input').attr('checked', !flag);
    })
    $(document).ready(function(){
        var flag = localStorage.getItem('check_switch') == "true" ? true : false ;
        $('.check_switch input').attr('checked', flag);
        if (flag === true) {$('#multi_check a').click()}
    })
    
    var checkBox = $('.checkbox').not('[name="chkall"]'),
        selectbtnHTML = '<span class="custom_select select_btn" style="display:none">⇣̲<input type="text"/></span>'
                      + '<span class="limit_select select_btn" style="display:none">⇣̲20</span>'
                      + '<span class="batch_select select_btn" style="display:none">↓20</span>';
    checkBox.after(selectbtnHTML);
    
    $('.batch_select').click(function(){    //无限制多选
        var thisBox = $(this).parent().children('.checkbox'), index = checkBox.index(thisBox);
        checkBox.each(function() {
             $(this).attr("checked", false);
         });
        checkBox.slice(index, index + 20).click()
        $('.line_list .inputBtn[name="submit"]').css({'position': 'fixed', 'top': '30%'})
    })
    
    var li_cat = $('li.cat').map(function(){return $('.line_list li').index($(this))}), licat = $.makeArray(li_cat);
    var liMap = li_cat.map(function(){
            var $t0 = $(this)[0], lindex = licat.indexOf($t0-0);
            var i = $t0 - lindex;
            return i;
        })
    $('.limit_select').click(function(){    //光碟内多选
        var thisBox = $(this).parent().children('.checkbox'), index = checkBox.index(thisBox);
        var limit; 
        liMap.each(function(){
            if (this > index) {
                limit = this - index > 20 ? index + 20 : this*1
                return false;
            } else {
                limit = index + 20;
            }
        })
        checkBox.each(function() {
             $(this).attr("checked", false);
         });
        checkBox.slice(index*1, limit*1).click()
        $('.line_list .inputBtn[name="submit"]').css({'position': 'fixed', 'top': '30%'})
    })
    
    $('.custom_select').click(function(){    //自定义多选
        var thisBox = $(this).parent().children('.checkbox'), index = checkBox.index(thisBox);
        var val = $(this).children('input').val()
        if (val <= 0 || isNaN(val)) {
            return false;
        }else{
            var range = parseInt(val > 20 ? 20 : val);
            checkBox.each(function() {
                $(this).attr("checked", false);
            });
            checkBox.slice(index*1, index*1 + range*1).click()
            $('.line_list .inputBtn[name="submit"]').css({'position': 'fixed', 'top': '30%'})
        }
    })
    $('.custom_select input').live('hover', function(){$(this).select()})
    
    var songlistclearupHTML = '<div class="songListClearup"><input type="checkbox" name="num" checked="true" class="share"/>清除行首编号'    //曲目列表整理
                            + '<input type="checkbox" name="tail" class="share"/>清除行尾时长'
                            + '<input type="checkbox" name="space" class="exclusive"/>清除前后空格<br>'
                            + '<input type="checkbox" name="CBS" class="exclusive"/>转换全角序号<input type="checkbox" name="CtoD" class="exclusive"/>半角转为全角<input type="checkbox" name="DtoC" class="exclusive"/>全角转为半角<br>'
                            + '<input type="checkbox" name="string" class="exclusive"/>清除字符<input type="text" name="string_text"/><input type="radio" name="str_pos" value="prev"/>前<input type="radio" name="str_pos" value="back"/>后<br>'
                            + '<input type="checkbox" name="regex" class="exclusive"/>正则替换&nbsp;&nbsp;&nbsp;/&nbsp;<input type="text" name="reg_text" style="margin:0;width:100px;"/>&nbsp;/,&nbsp;&nbsp;&quot;&nbsp;<input type="text" name="replace_text" style="margin:0;width:60px;"/>&nbsp;&quot;'
                            + '<input class="inputBtn songListClearup" value="曲目列表整理" type="submit"></div>'
    $('form[name="new_songlist"]').before(songlistclearupHTML)
    $('div.songListClearup input.share').live('click', function(){
    	var $T = $(this), share = $('div.songListClearup input.share');
        if ($T.attr('checked')) {$('div.songListClearup input').not($T).not(share).attr('checked', false)}
    })
    $('div.songListClearup input.exclusive').live('click', function(){
        var $T = $(this);
        if ($T.attr('checked')) {$('div.songListClearup input').not($T).attr('checked', false)}
    })
    $('div.songListClearup input[name="string"]').live('click', function(){
    	if ($(this).attr('checked')) {$(':radio[value="back"]').attr('checked', true)} else {$(':radio[name="str_pos"]').attr('checked', false)}
    })
    $(':radio[name="str_pos"]').live('click', function(){
        var $T = $(this);
    	if ($(this).attr('checked')) {$('div.songListClearup input').not($T).attr('checked', false); $('div.songListClearup input[name="string"]').attr('checked', true)}
    })
    function safeReg(str) {
        var result = "", alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < str.length; i++) {
            if (alpha.indexOf(str[i]) == -1) {result += "\\"+str[i];}
          	else {result += str[i];}
        }
        return result;
    };
    $('input.songListClearup').click(function(){
        var isNum = $('div.songListClearup input[name="num"]').attr('checked'), isTail = $('div.songListClearup input[name="tail"]').attr('checked'), isSpace = $('div.songListClearup input[name="space"]').attr('checked'),
            isCBS = $('div.songListClearup input[name="CBS"]').attr('checked'), isCtoD = $('div.songListClearup input[name="CtoD"]').attr('checked'), isDtoC = $('div.songListClearup input[name="DtoC"]').attr('checked'),
            isString = $('div.songListClearup input[name="string"]').attr('checked'), stringText = $('div.songListClearup input[name="string_text"]').val(), isPrev = $(':radio[value="prev"]').attr('checked'),
            isRegex = $('div.songListClearup input[name="regex"]').attr('checked'), regText = $('div.songListClearup input[name="reg_text"]').val(), replaceText = $('div.songListClearup input[name="replace_text"]').val(),
            regStr, sub, newText;
        if (isNum||isTail) {
            regStr = isNum ? isTail ? /^\d+(\.\s*|\s)(.*?)(\s+\d+:\d+)*$/gm : /^\d+(\.\s*|\s)(.*?)$/gm : isTail ? /^(.*?)(\s+\d+:\d+)*$/gm : /^(.*?)$/gm;
            sub = isNum ? '$2' : '$1';
        }else if (isSpace) {
            regStr = /^\s*(.*?)\s*$/gm;
            sub = '$1';
        }else if (isCBS) {
        	regStr = /^([\uff10-\uff19]+)\s|^([\uff10-\uff19]+)\uff0e/gm;
            sub = function($1) {return String.fromCharCode($1.charCodeAt(0) - 0xfee0)+' ';}
        }else if (isCtoD) {
        	regStr = /[\x20-\x7e]/g;
            sub = function($0) {return $0 == " " ? "\u3000" : String.fromCharCode($0.charCodeAt(0) + 0xfee0);}
        }else if (isDtoC) {
        	regStr = /[\uff01-\uff5e]|\u3000/g;
            sub = function($0) {return $0 == "　" ? " " : String.fromCharCode($0.charCodeAt(0) - 0xfee0);}
        }else if (isString) {
            stringText = safeReg(stringText.toString())
            regStr = isPrev ? new RegExp('^'+stringText+'(.*)$','gm') : new RegExp('^(.*)'+stringText+'$','gm');
            sub = '$1';
        }else if (isRegex) {
            regStr = new RegExp(regText.toString(), 'gm')
            sub = replaceText.toString()
        }else {
            alert('请先选择模式。');
            return false;
        }
        newText = $('textarea#songlist').val().replace(regStr, sub);
        $('textarea#songlist').val(newText);
    })
  
    //var listHeight = $('.line_list').height() + $('.line_list').offset().top;
    /*var inputBtn = $('.line_list .inputBtn[name="submit"]')
    inputBtn.css({'position': 'fixed', 'top': '30%'})
    $.event.add(window, "scroll", function() {
        var p = $(window).scrollTop();
        var s = inputBtn.offset().top;
        //inputBtn.css('position', (p + s <389) ? 'fixed' : 'static');
        inputBtn.css('top', (s < listHeight) ? '70%' : listHeight - p)
    })*/
}

//光碟编号+1增强 & 光碟编号重整理
if ((location.pathname.indexOf('edit_batch')!=-1)&&($('#navMenuNeue').find('a[href="/music"]').hasClass('focus'))){
    var style = 'input.songEdit  {float: right;}'
              + '.song_edit_batch input.inputBtn {margin: 0 20px 0 5px;}'
              + '.song_edit_batch .inputtext {width: 30px;}'
              + '.song_edit_batch {width: 500px;}'
    $('head').append('<style>' + style + '</style>')
    
    function discAdd (){
        var textArea = $('.column textarea'), discNum = parseInt($('#disc_num').val() > 0 ? $('#disc_num').val() : 0),
            startDisc = textArea.val().replace(/^(\d+)\|\d+\|.*/m, '$1').split('\n')[0], OldDiscNum = textArea.val().replace(/^(\d+)\|\d+\|.*?$/gm, '$1').split('\n').filter(function(n){return n!=""}), warningFlag,
            newText = textArea.val().replace(/^(\d+)(\|.*?)$/gm,function($0,$1,$2){return discNum+$2;});
        $(OldDiscNum).each(function(){if(this!=startDisc){warningFlag = true}})
        if (warningFlag){
            if (confirm('原有光盘编号不一致，你确定要批量修改？')){textArea.val(newText);}else{return false;};
        }else{
            textArea.val(newText);
        } 
    }
    function epClearup (){
        var textArea = $('.column textarea'),
            newEpNum = parseInt($('#start_ep').val() > 0 ? $('#start_ep').val() : 0),
            startEp = textArea.val().replace(/\d+\|(\d+)\|.*/m, '$1').split('\n')[0], startDisc = textArea.val().replace(/^(\d+)\|\d+\|.*/m, '$1').split('\n')[0],
            discNum = textArea.val().replace(/^(\d+)\|\d+\|.*?$/gm, '$1').split('\n').filter(function(n){return n!=""}), warningFlag,
            newText = textArea.val().replace(/^(\d+\|)(\d+)(\|.*?)$/gm,function($0,$1,$2,$3){var newEp = $2 - startEp + newEpNum;return $1+newEp+$3});
        $(discNum).each(function(){if(this!=startDisc){warningFlag = true}})
        if (warningFlag){
            alert('光盘编号不一致！');
            return false;
        }else{
            textArea.val(newText);
        }
    }
    var songeditbatchHTML = '<div class="song_edit_batch">光盘编号： <input class="inputtext" id="disc_num" type="text"/><input id="disc_change" class="inputBtn discEdit" value="确定" type="submit">'
                          + '起始曲目： <input class="inputtext" id="start_ep" type="text" value="1"/><input id="ep_clearup" class="inputBtn discEdit" value="确定" type="submit"></div>'
    $('.column form').before(songeditbatchHTML)
    $('#disc_change').click(function(){discAdd ()})
    $('#ep_clearup').click(function(){epClearup ()})
    $('#disc_num').live('hover', function(){$(this).select()})
}

//虾米导出
if (location.host.indexOf('xiami')!=-1){
    function selectNode (node) {
        var selection, range, doc, win;
        if ((doc = node.ownerDocument) && (win = doc.defaultView) && typeof
        win.getSelection != 'undefined' && typeof doc.createRange != 'undefined'
        && (selection = window.getSelection()) && typeof
        selection.removeAllRanges != 'undefined') {
        range = doc.createRange();
        range.selectNode(node);
        selection.removeAllRanges();
        selection.addRange(range);
        } else if (document.body && typeof document.body.createTextRange !=
        'undefined' && (range = document.body.createTextRange())) {
        range.moveToElementText(node);
        range.select();
        }
    }
    //$.getScript('http://malsup.github.io/jquery.blockUI.js');
    var style = '.export_btn {float: left; cursor: pointer; font-size: 12px; font-weight: bold; color: white; background: #36C; line-height: 25px; width: 80px; text-align: center; margin: 0 5px;}'
              + '#export_helper+.cd_info {height: 23px;}'
              + '#export_helper+.cd_info .cd_pay {margin-top: -7px;}'
              + '.export_content {text-align: left; font-size: 15px; font-family: courier new,courier,monospace; overflow: scroll; width:520px; height:285px;}'
              + '.block_header {background: #F5F5F5; width: 100%; padding: 1px 0;}'
              + '.block_btn {margin: 0 3px; float: left; cursor: pointer;}'
    $('head').append('<style>' + style + '</style>')
    var listTable = $('.track_list'), tableLen = $('.track_list tr').length;
    function exportList(start, end, isSongID){ 
        var songList = $('.track_list tr').slice(start,end).map(function(){
            var $T = $(this), did = listTable.index($T.parents('.track_list')) + 1;
            function gC(c){
                return $T.find('.'+c).text().replace(/^\s*(.*?)\s*$/m, '$1');
            };
            var str=isSongID ? did + '|' + gC('trackid') + '|' + gC('song_name a:not([class])') + '|' + gC('song_name a[class="show_zhcn"]') + '|' : gC('song_name a');
            return str;
        }).get().join('\n');
        return songList;
    }
    $('#track').prepend('<div id="export_helper" class="clearfix"><div id="all_export" class="export_btn">全部导出</div><div id="export_name" class="export_btn">导出曲目</div></div>')
    //$('.trackname').after('<div id="export_name" class="export_btn">导出曲目</div>')
    $('.closeBtn').live('click',function(){$.unblockUI();})
    $('.allSelect').live('click',function(){selectNode($('.export_content')[0])})
    $('.blockOverlay').live('click',function(){$.unblockUI();})
    $('#all_export').click(function(){
        var htmlStr = $('<div class="exporter"></div>')
                    .append('<div class="block_header clearfix"><span class="block_btn closeBtn">关闭</span><span class="block_btn allSelect">全选</span></div>')
                    .append('<pre class="export_content"></pre>')
          htmlStr.children('.export_content').html(exportList(0,tableLen,true))
        $.blockUI({message:htmlStr,css:{width:"520px",height:"300px",cursor:"default"}})
    })
    $('#export_name').click(function(){
        var htmlStr = $('<div class="exporter"></div>')
                    .append('<div class="block_header clearfix"><span class="block_btn closeBtn">关闭</span><span class="block_btn allSelect">全选</span></div>')
                    .append('<pre class="export_content"></pre>')
        var start = $(this).next()
          htmlStr.children('.export_content').html(exportList(0,tableLen,false))
        $.blockUI({message:htmlStr,css:{width:"520px",height:"300px",cursor:"default"}})
    })
    /*$('#export_name').click(function(){
        var htmlStr = $('<div class="exporter"></div>')
                    .append('<div class="block_header clearfix"><span class="block_btn closeBtn">关闭</span><span class="block_btn allSelect">全选</span></div>')
                    .append('<pre class="export_content"></pre>')
        var start = $(this).next()
          htmlStr.children('.export_content').html(exportList(0,tableLen,false))
        $.blockUI({message:htmlStr,css:{width:"520px",height:"300px",cursor:"default"}})
    })*/
}