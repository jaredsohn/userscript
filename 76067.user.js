// ==UserScript==
// @name Juick Voting
// @namespace jv
// @include http://juick.com/*
// @description Basic voting support for Juick
// @version 0.83.4
// ==/UserScript==

(function(){
    var showCommentsCommand = true;
    
    var show_this_cmd = 'show this';
    var show_all_cmd = 'show all';

    function run() {
        var msg = document.getElementsByClassName('msg')[0];
        if (!msg)
            return false;
        var vtag_regex = /\*voting|\*опрос|\*голосование/i;
        var linktags = msg.getElementsByTagName('a');

        for (var i=0; i<linktags.length; i++) {
            var tag = linktags[i].innerHTML;
            // если это пост с голосованием, поехали
            if (tag.match(vtag_regex)) {
                var rlist = [];
                var msg_body = msg.getElementsByClassName('msgtxt')[0].innerHTML;
                var vregex = /(\d|[a-z]|[а-я]+)\)(.+?)(<br>|$)/gi;
                var result;
                while (result = vregex.exec(msg_body)){
                    rlist.push({id:result[1], text:result[2], count: 0, users:[], replies:[]});
                }
                variants = countVotes(rlist);
                drawGraph(variants);
                return true;
            }  
        }
        return false;
    }

    function countVotes(variants) {
        var voted = [];
        var vote = /^\s*(([\da-zа-я]){1,2})\s*[\)\!—\.\,]/i; //в начале строки
        var vote1 = /^\s*(\d+)/i; //цифра в начале
        var vote2 = /^([\da-zа-я]{1,2})$/i; //единственный ответ
        var vote3 = /\s+([\da-zа-я]{1,2})[\)\.\,]+\s+/ig; //в строке
        var replies = document.getElementById('replies').getElementsByTagName('li');
        for (var i=0; i<replies.length; i++) {
            var user = replies[i].getElementsByTagName('big')[0].getElementsByTagName('a')[0].innerHTML;
            if (voted.indexOf(user) == -1) {
                var reply = replies[i].getElementsByTagName('div')[0].getElementsByClassName('msgtxt')[0].innerHTML;
                var reply_id = replies[i].id;
                if (reply.match(/^<a/i))
                    continue;
                var onevote = vote.exec(reply) || vote1.exec(reply) || vote2.exec(reply);
                var multivote = [];
                while (mvote = vote3.exec(reply))
                    multivote.push(mvote);
                if (multivote.length < 1)
                    multivote = [onevote];
                while(thisvote = multivote.shift()) {
                    if (thisvote) {
                        //console.log(thisvote);
                        for (var j=0; j<variants.length; j++) {
                            var thisvar = new RegExp(variants[j].id, 'i');
                            if (thisvote[1].toLowerCase() == variants[j].id.toLowerCase()) {
                                ++variants[j].count;
                                voted.push(user);
                                variants[j].users.push(user);
                                variants[j].replies.push(reply_id);
                                break;
                            }
                        }
                    }
                }
            } else
                continue;
        }
        return variants;
    }

    function displayComments(control, all){
        var replies = document.getElementById('replies').getElementsByTagName('li');
        var controls =  document.getElementsByClassName('showCommentsControl');
        var list;
        try { list = control.wrappedJSObject.list }
        catch (e) { list = control.list }
        
        // в списке контролов заменяем "показать все" на "показать эти"
        for (var i=0; i<controls.length; i++){
            if (controls[i].innerHTML == show_all_cmd ){
                var node = controls[i].wrappedJSObject || controls[i];
                node.innerHTML = show_this_cmd;
                node.onclick = function() { displayComments(this, false) };
            }
        }
        // показывает те что надо сообщения
        for (var i=0; i<replies.length;i++) {
            var reply = replies[i];
            if (!all) {
                if (list.indexOf(reply.id) == -1)
                    reply.style.display = 'none';
                else
                    reply.style.display = '';
            } else 
                reply.style.display = '';
        }
        control = control.wrappedJSObject || control;
        control.innerHTML = all ? show_this_cmd : show_all_cmd;
        control.onclick = function() { displayComments(this, all ? false : true) };
    }
    function drawBar(div, variant, sum, max){
        var num = variant.count;
        var t = '<b>' + variant.id + ')</b>' + variant.text;
        var wnum = Math.round(95 * num/sum) + 2;
        var dt = document.createElement('dt');
        dt.className = 'bar';
        dt.style.width = '' + wnum + '%';
        dt.innerHTML = num;
        dt.title = variant.users;
        div.appendChild(dt);

        var dd = document.createElement('dd');
        dd.innerHTML = t;
        if (showCommentsCommand) {
            if (num > 0) {
                show = document.createElement('small');
                show.onclick = 'alert("ok");';
                show.style.cursor = 'pointer';
                show.className = 'showCommentsControl';
                show.innerHTML = show_this_cmd;
                show = show.wrappedJSObject || show;
                show.list = variant.replies;
                //console.log('added list:'+show.list);
                show.onclick = function(){ displayComments(this, false) };
                dd.appendChild(show);
            }
        }
        div.appendChild(dd);
    }
    function renderCss(context, cssTemplate){
        /* Заменяем вхождения переменных в шаблоне css 
         * на значения этих переменных из объекта context */
        for ( key in context ){
            var rKey = '$' + key;
            cssTemplate = cssTemplate.replace(rKey, context[key]);
        }
        return cssTemplate;
    }

    function drawGraph(variants){
        var msg = document.getElementsByClassName('msg')[0];
        var style = document.createElement('style');
        // заливка баров как цвет h2
        var msg = document.getElementsByClassName('msg')[0];
        var tag = msg.getElementsByTagName('a')[0];
        var bg = getComputedStyle(tag, '').color;
        {
            //console.log('bg="'+bg+'"');
            //меняем цвет бара в стиле default
            if (bg == 'rgb(180, 115, 41)')
                bg = '#6b8b4c';
        }
        // цвет текста на барах как фон content
        var tag = document.getElementById('content');
        var fg = getComputedStyle(tag, '').getPropertyValue('background-color');
        // обводка как border-top у content
        var border = getComputedStyle(tag, '').getPropertyValue('border-top-color');
        {//
            //console.log('border='+border);
            if (border == "rgb(0, 0, 0)")
                border == "rgb(170, 170, 124)";
        }
        var context = {
            border: border,
            bg: bg,
            fg: fg,
        };
        var cssTemplate = "\
        .graph {\
            margin-top: .5em;\
            position: relative;\
            width: 80%;\
            border: solid $border 1px;\
        }\
        .graph .bar {\
            display: block;\
            margin: 2px; padding: 2px;\
            position: relative;\
            background: $bg; color: $fg;\
            font-weight: bold;\
        }\
        .graph dd {\
            position:relative;\
            top: -5px;\
        }";
        style.innerHTML = renderCss(context, cssTemplate);
        document.getElementsByTagName('head')[0].appendChild(style);
        var div = document.createElement('div');
        div.className = 'graph';
        msg.appendChild(div);
        var numbers = [];
        for(var i=0; i<variants.length; i++)
            numbers.push(variants[i].count);
        // получаем значения максимума и суммы здесь, чтобы не повторять дальше
        var max = Math.max.apply({}, numbers);
        function sum (numbers) {
            var res = 0;
            for (var i=0; i<numbers.length; i++)
                res = res + numbers[i];
            return res;
        }
        var sum = sum(numbers);
        // пока не закончатся варианты, рисуем каждому бар
        while(v = variants.shift())
            drawBar(div, v, sum, max);
    }
    window.addEventListener("load", function() {
            run();
            }, false);
})();
