//
// ==UserScript==
// @name          Dirty Comments Threshold 1.2
// @namespace     http://dirty.ru/
// @description   Modifies default comments rating treshold
// @include       http://www.dirty.ru/comments/*
// @include       http://dirty.ru/comments/*
// @include       http://dirty.ru/my/inbox/*
// ==/UserScript==

var _dct = {
    comments : {},
    settings : {},
    curr_select_numb : 0,
    comm_order : 1, // 1 for tree, 2 for linear
    tree_order : [],
    list_order : [],
    isPostPage : false,
    isInboxPage : false,

    set_save : function (){
        var params = '';
        var not_first = '';
        for (i in _dct.settings) {
            params = params + not_first+i+":"+_dct.settings[i];
            not_first = ',';
        }
        document.cookie = "comm_thresh.settings="+escape('{'+params+'}')+"; domain=.dirty.ru; path=/; expires=Thu, 20-Apr-2023 00:34:13 GMT";
    },

    set_get : function (){
        if(document.cookie.indexOf('comm_thresh.settings=')>-1){
            var param = unescape(document.cookie.split('comm_thresh.settings=')[1].split(";")[0]);
            eval("_dct.settings="+unescape(param));

        } else {
            _dct.settings.threshold = 20;
            // 1 - by votes, 2 - by percents
            _dct.settings.thresh_type = 1;
            _dct.settings.thresh_step = 10;
            _dct.settings.opt_count = 4;
            _dct.settings.picts_always = 0;
        }
    },

    toggle_div : function (name,param){
        if(param) document.getElementById(name).style.display = (param==1)?'block':'none';
        else document.getElementById(name).style.display = (document.getElementById(name).style.display=='none')?'block':'none';
    },

    getElementsByClassAndTag : function(name, tag, obj) {
        var obj = obj||document;
        var result = [];
        var allElements = obj.getElementsByTagName(tag);
        for(var i=0; i<allElements.length; i++){
            if(allElements[i].className && allElements[i].className==name){
                result[result.length] = allElements[i];
            }
        }
        return result;
    },

    getPositiveAverage : function () {
        var sum = 0;
        for (var i=1; i<_dct.comments.length; i++) {
            if (_dct.comments[i].vote>0) {
                sum += _dct.comments[i].vote;
            }
        }
        return sum/_dct.comments.length;
    },

    getIntFromPrompt : function (msg, curr_val) {
       var result = prompt(msg, curr_val)
       if (result==null) {
            return false;
       }

       if (!result) {
            alert('Имело смысл что-нибудь ввести!');
            return false;
       }

       result = parseInt(result);
       if (!result) {
            alert('Невнятное число!');
            return false;
       }
       return result;
    },

    onChangeThreshold : function () {
        var new_sel = document.getElementById('thres_select_'+_dct.curr_select_numb);

        if (new_sel.value == 'set_step') {
            var result = _dct.getIntFromPrompt("Новое значение шага:", _dct.settings.thresh_step)
            if (result) {
                _dct.settings.thresh_step = result;
            }
            new_sel.options[0].selected = true;
            _dct.replaceSelect();
        } else if (new_sel.value == 'set_type') {
            _dct.settings.thresh_type = (_dct.settings.thresh_type==1) ? 2:1;
            _dct.replaceSelect();
        } else if (new_sel.value == 'set_opt_count') {
            var result = _dct.getIntFromPrompt("Количество опций:", _dct.settings.opt_count)
            if (result) {
                if (result<=0) {
                    result = 1;
                }
                _dct.settings.opt_count = result;
            }
            new_sel.options[0].selected = true;
            _dct.replaceSelect();
        } else if (new_sel.value == 'set_pict_filter') {
            _dct.settings.picts_always = (_dct.settings.picts_always==0) ? 1:0;
            _dct.replaceSelect();
        }else {
            _dct.settings.threshold = new_sel.value;
        }
        _dct.set_save();
        _dct.refreshComments();
    },

    replaceSelect : function () {
        var toggle_type_to = "В процентах от среднего!";
        var picts_filtering = "Фильтровать картинки!";
        var thresh_suffix = " голосов";
        if (_dct.settings.thresh_type==2) {
            toggle_type_to = "В голосах!";
            thresh_suffix = "%";
        }

        if (_dct.settings.picts_always==0) {
            picts_filtering = "Показать картинки!";
        }

        if (_dct.curr_select_numb==0) {
            curr_select_node_name = 'comments-threshold'
        } else {
            curr_select_node_name = 'div_select_'+_dct.curr_select_numb;
        }
        _dct.curr_select_numb++;

        var curr_sel_node = document.getElementById(curr_select_node_name);
        var new_sel = document.createElement("SELECT");

        if (navigator.appName == "Opera") {
            new_sel.className = "hidden";
            new_sel.onchange = function(){_dct.onChangeThreshold()};
        } else {
            new_sel.addEventListener('change', _dct.onChangeThreshold, false);
        }

        new_sel.length = 5+_dct.settings.opt_count;
        new_sel.name='thres_select_'+_dct.curr_select_numb;
        new_sel.id='thres_select_'+_dct.curr_select_numb;
        new_sel.options[0].text = "Все";
        new_sel.options[0].value = "-1000";

        var selected = false;
        for (var i=1; i<=_dct.settings.opt_count; i++) {
            new_sel.options[i].text = "Больше "+(_dct.settings.thresh_step*i)+thresh_suffix;
            new_sel.options[i].value = _dct.settings.thresh_step*i;

            if (_dct.settings.threshold == _dct.settings.thresh_step*i) {
                new_sel.options[i].selected = true;
                selected = true;
            }
        }
        if (!selected) {
            new_sel.options[0].selected = true;
        }
        new_sel.options[_dct.settings.opt_count+1].text = toggle_type_to;
        new_sel.options[_dct.settings.opt_count+1].value = 'set_type';
        new_sel.options[_dct.settings.opt_count+2].text = "Сменить шаг...";
        new_sel.options[_dct.settings.opt_count+2].value = "set_step";
        new_sel.options[_dct.settings.opt_count+3].text = "Число опций...";
        new_sel.options[_dct.settings.opt_count+3].value = "set_opt_count";
        new_sel.options[_dct.settings.opt_count+4].text = picts_filtering;
        new_sel.options[_dct.settings.opt_count+4].value = "set_pict_filter";

        var new_div = document.createElement("FORM");
        new_div.name='div_select_'+_dct.curr_select_numb;
        new_div.id='div_select_'+_dct.curr_select_numb;
        new_div.appendChild(new_sel);
        curr_sel_node.parentNode.replaceChild(new_div, curr_sel_node);

        if (navigator.appName == "Opera") {
            new futuSelect('thres_select_'+_dct.curr_select_numb);
        }
    },

    replaceParentLinks : function() {
        var allLinks=document.getElementsByTagName('a');
        for (var i=0; i<allLinks.length; i++) {
            if (allLinks[i].className=='c_parent') {
                var oncl = allLinks[i].getAttribute("onclick");
                if (!oncl) {
                    continue;
                }
                var s = oncl.indexOf("'");
                var e = oncl.indexOf(';');
                var params = oncl.substring(s,e-1).split(',');
                eval("allLinks[i].addEventListener('click', function(event){_dct.toggle_div("+params[0]+",1);}, false);");
            }
        }
    },

    refreshComments : function () {
        var curr_threshold = _dct.settings.threshold;
        if (_dct.settings.thresh_type==2) {
            var average = _dct.getPositiveAverage();
            curr_threshold = average*_dct.settings.threshold/100;
        }

        for (var i=0; i<_dct.comments.length; i++) {
            if (_dct.comments[i].vote >= curr_threshold || (_dct.comments[i].has_img && _dct.settings.picts_always==1) ) {
                _dct.toggle_div(_dct.comments[i].parent_id, 1);
            } else {
                _dct.toggle_div(_dct.comments[i].parent_id, 22);
            }
        }
    },
    initCommentsArray : function () {
        _dct.comments = _dct.getElementsByClassAndTag('comment_inner', 'div');
        for (var i=0; i<_dct.comments.length;i++) {
            _dct.comments[i].parent_id = _dct.comments[i].parentNode.id
            var vote_arr = _dct.getElementsByClassAndTag('vote_result', 'strong', _dct.comments[i]);
            if (vote_arr && vote_arr.length==1) {
                _dct.comments[i].vote = parseInt(vote_arr[0].innerHTML);
            } else {
                _dct.comments[i].vote = 0;
            }

            var images = _dct.comments[i].getElementsByTagName('img');
            if (images && images.length>0) {
                _dct.comments[i].has_img = true;
            } else {
                _dct.comments[i].has_img = false;
            }
        }
    },

    compareNumbers : function(a,b) {
        return a - b;
    },

    doOrder : function(order) {
        var last_comment;
        var prev_comment
        var big_parent = document.getElementById("js-commentsHolder");
        for (var i=order.length; i>0; i--) {
            last_comment = document.getElementById(order[i]);
            prev_comment = document.getElementById(order[i-1]);
            big_parent.insertBefore(prev_comment, last_comment);
        }
    },

    toggleCommentsOrder : function() {
        if (_dct.tree_order.length==0) {
            for (var i=0; i<_dct.comments.length;i++) {
                _dct.tree_order.push(_dct.comments[i].parent_id);
                _dct.list_order.push(_dct.comments[i].parent_id);
            }
            _dct.list_order.sort(_dct.compareNumbers);
        }

        var tree_link = document.getElementById("tree_link");
        if (_dct.comm_order==1) {
            _dct.comm_order=2;
            _dct.doOrder(_dct.list_order);
            tree_link.innerHTML = "деревом!";
        } else {
            _dct.comm_order=1;
            _dct.doOrder(_dct.tree_order);
            tree_link.innerHTML = "списком!";
        }
    },

    addTreeLinearLink : function() {
        var div_to_insert;
        if (_dct.isPostPage) {
            div_to_insert = _dct.getElementsByClassAndTag("comments_header_controls_inner","div");
        } else {
            div_to_insert = _dct.getElementsByClassAndTag("inbox_header", "div");
        }
        div_to_insert = div_to_insert[0];
        //<A HREF="javascript:top.frames[0].toggleNode('<?php print(("".($app_id * 10)."_".$function_id));?>')" ID="fun_<?=$function_id?>1"><?php print($function_name);?></A>
        var tree_link = document.createElement("a");
        tree_link.id = "tree_link";
        tree_link.href = "javascript:void(0);";
        //tree_link.href = "javascript:_dct.toggleCommentsOrder();";

        tree_link.innerHTML = "списком!";
        tree_link.className = "dashed comments_header_refresh_comments";

        if (navigator.appName == "Opera") {
            tree_link.onclick = function(){_dct.toggleCommentsOrder()};
        } else {
            tree_link.addEventListener('click', _dct.toggleCommentsOrder, false);
        }
        var space_link = document.createElement("a");
        div_to_insert.appendChild(space_link);
        space_link.innerHTML = "&nbsp;&nbsp;";
        div_to_insert.appendChild(tree_link);
    },

    isPostCommentsPage : function () {
        if (document.getElementById("comments-threshold")) {
            return true;
        } else {
            return false;
        }
    },

    isInboxCommentsPage : function () {
        if (document.getElementById("js-inbox_people_list")) {
            return true;
        } else {
            return false;
        }
    },

    workPlease : function () {
        _dct.isPostPage = _dct.isPostCommentsPage();
        if (!_dct.isPostPage) {
            _dct.isInboxPage = _dct.isInboxCommentsPage();
        }
        _dct.set_get();

        if (_dct.isPostPage || _dct.isInboxPage) {
            _dct.initCommentsArray();
            _dct.addTreeLinearLink();
        }
        if (_dct.isPostPage) {
            _dct.replaceSelect();
            _dct.replaceParentLinks();
            _dct.onChangeThreshold();
        }
    }
}

_dct.workPlease();