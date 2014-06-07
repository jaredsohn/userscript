//
// ==UserScript==
// @name          Dirty Posts Threshold 1.2
// @namespace     http://dirty.ru/
// @description   Modifies default posts treshold
// @include       http://www.dirty.ru/*
// @include       http://dirty.ru/*
// ==/UserScript==

var _dpt = {
    posts : [],
    settings : {},
    curr_select_numb : 0,
    set_save : function (){
        var params = '';
        var not_first = '';
        for (i in _dpt.settings) {
            params = params + not_first+i+":"+_dpt.settings[i];
            not_first = ',';
        }
        document.cookie = "posts_thresh.settings="+escape('{'+params+'}')+"; domain=.dirty.ru; path=/; expires=Thu, 20-Apr-2023 00:34:13 GMT";
    },
    
    set_get : function (){
        if(document.cookie.indexOf('posts_thresh.settings=')>-1){
            var param = unescape(document.cookie.split('posts_thresh.settings=')[1].split(";")[0]);
            eval("_dpt.settings="+unescape(param));
        } else {
            _dpt.settings.threshold = 100;
            // 1 - votes, 2 - percents
            _dpt.settings.thresh_comm_count = 0;
            _dpt.settings.thresh_step = 100;
            _dpt.settings.opt_count = 4;
            // what types to show
            _dpt.settings.show_posts = 1;
            _dpt.settings.show_video = 1;
            _dpt.settings.show_photo = 1;
            _dpt.settings.show_audio = 1;
        }
    },
    
    toggle_div  : function(name,param){
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
    
    getIntFromPrompt : function(msg, curr_val, allow_0) {
       var result = prompt(msg, curr_val)
       if (result==null) {
            return false;
       }

       if (!result) {
            alert('Имело смысл что-нибудь ввести!');
            return false;
       }
    
       result = parseInt(result);
       if (isNaN(result)) {
            alert('Невнятное число!');
            return false;
       }
       return result;
    },
    
    onChangeThreshold : function() {
        var new_sel = document.getElementById('thres_select_'+_dpt.curr_select_numb);
    
        if (new_sel.value == 'set_step') {
            var result = _dpt.getIntFromPrompt("Новое значение шага:", _dpt.settings.thresh_step)
            if (result) {
                _dpt.settings.thresh_step = result;
            }
            new_sel.options[0].selected = true;
            _dpt.replaceSelect();        
        } else if (new_sel.value == 'set_comm_tresh') {
            var result = _dpt.getIntFromPrompt("Минимальное количество комментариев\n(ноль для выключения этой опции):", _dpt.settings.thresh_comm_count)
            if (result!==false) {
                if (result<0) {
                    result = 0;
                }
                _dpt.settings.thresh_comm_count = result;
            }
            new_sel.options[0].selected = true;
            _dpt.replaceSelect();        
        } else if (new_sel.value == 'set_opt_count') {
            var result = _dpt.getIntFromPrompt("Количество опций:", _dpt.settings.opt_count)
            if (result!==false) {
                if (result<=0) {
                    result = 1;
                }
                _dpt.settings.opt_count = result;
            }
            new_sel.options[0].selected = true;
            _dpt.replaceSelect();
        } else {
            _dpt.settings.threshold = new_sel.value;
        }
        _dpt.set_save();
        _dpt.refreshPosts();
    },

    onSortChks : function (check) {
        if (navigator.appName != "Opera") {
            check = this;
        }

        eval("_dpt.settings."+check.id+" = (check.checked?1:0);");
        _dpt.set_save();
        _dpt.refreshPosts();
    },

    addSortChks : function () {
        div_to_insert = _dpt.getElementsByClassAndTag('threshold_other_inner', 'div');
        div_to_insert = div_to_insert[0];
        var chcks = ['show_posts', 'show_photo', 'show_video'];
        var names = ['П', 'K', 'В'];

        for (var i=0; i<chcks.length; i++) {
            eval("var "+chcks[i]+" = document.createElement(\"input\");")
            eval(chcks[i]+".type='checkbox';");
            eval(chcks[i]+".id='"+chcks[i]+"';");
            if (navigator.appName == "Opera") {
                eval(chcks[i]+".onclick=function(){_dpt.onSortChks(this);};");
            } else {
                eval(chcks[i]+".addEventListener('click', _dpt.onSortChks, false);");
            }

            eval(chcks[i]+".checked=(_dpt.settings."+chcks[i]+" == 1);");

            eval("var "+chcks[i]+"_link = document.createElement(\"a\");")
            eval(chcks[i]+"_link.innerHTML ='"+names[i]+"';")
            eval("div_to_insert.appendChild("+chcks[i]+");");
            eval("div_to_insert.appendChild("+chcks[i]+"_link);");
        }
    },
    
    replaceSelect : function () {
        var thresh_suffix = " голосов";
        var all_posts_title = "Все посты";
        if (_dpt.settings.thresh_comm_count>0) {
            thresh_suffix += " и "+_dpt.settings.thresh_comm_count+" комментариев";
            all_posts_title += ", у которых >"+_dpt.settings.thresh_comm_count+" комментариев"; 
        }
        
        if (_dpt.curr_select_numb==0) {
            curr_select_node_id = 'posts-threshold'
        } else {
            curr_select_node_id = 'div_select_'+_dpt.curr_select_numb;
        }
        _dpt.curr_select_numb++;    
        var curr_sel_node = document.getElementById(curr_select_node_id);
        var new_sel = document.createElement("SELECT");
    
        if (navigator.appName == "Opera") {
            new_sel.className = "hidden";
            new_sel.onchange = function(){_dpt.onChangeThreshold()};
        } else {
            new_sel.addEventListener('change', _dpt.onChangeThreshold, false);
        }
        new_sel.length = 4+_dpt.settings.opt_count;
        new_sel.name='thres_select_'+_dpt.curr_select_numb;
        new_sel.id='thres_select_'+_dpt.curr_select_numb;
        new_sel.options[0].text = all_posts_title;
        new_sel.options[0].value = "-1000";
        var selected = false;
        for (var i=1; i<=_dpt.settings.opt_count; i++) {
            new_sel.options[i].text = "Больше "+(_dpt.settings.thresh_step*i)+thresh_suffix;
            new_sel.options[i].value = _dpt.settings.thresh_step*i;
    
            if (_dpt.settings.threshold == _dpt.settings.thresh_step*i) {
                new_sel.options[i].selected = true;
                selected = true;
            }
        }
        
        if (!selected) {
            new_sel.options[0].selected = true;
        }
        new_sel.options[_dpt.settings.opt_count+1].text = 'Число комментариев...';
        new_sel.options[_dpt.settings.opt_count+1].value = 'set_comm_tresh';
        new_sel.options[_dpt.settings.opt_count+2].text = "Сменить шаг...";
        new_sel.options[_dpt.settings.opt_count+2].value = "set_step";
        new_sel.options[_dpt.settings.opt_count+3].text = "Число опций...";
        new_sel.options[_dpt.settings.opt_count+3].value = "set_opt_count";
        
        var new_div = document.createElement("FORM");
        new_div.name='div_select_'+_dpt.curr_select_numb;
        new_div.id='div_select_'+_dpt.curr_select_numb;
        new_div.appendChild(new_sel);

        curr_sel_node.parentNode.replaceChild(new_div, curr_sel_node);
        if (navigator.appName == "Opera") {
            new futuSelect('thres_select_'+_dpt.curr_select_numb);
        }
    },
    
    refreshPosts : function() {
        for (var i=0; i<_dpt.posts.length; i++) {
            // pre-filtering by type
            if ( (_dpt.posts[i].is_post && _dpt.settings.show_posts=='0')
                || (_dpt.posts[i].is_video && _dpt.settings.show_video=='0')
                || (_dpt.posts[i].is_img && _dpt.settings.show_photo=='0')
                )
            {
                _dpt.toggle_div(_dpt.posts[i].id, 2);
                continue;
            }

            if (_dpt.posts[i].vote < _dpt.settings.threshold) {
                _dpt.toggle_div(_dpt.posts[i].id, 2);
            } else if (_dpt.settings.thresh_comm_count>0 && _dpt.posts[i].comm_count<_dpt.settings.thresh_comm_count) {
                _dpt.toggle_div(_dpt.posts[i].id, 2);
            } else {
                _dpt.toggle_div(_dpt.posts[i].id, 1);
            }
        }
    },
    
    checkMainPage : function () {
        if (document.getElementById("posts-threshold")) {
            return true;
        } else {
            return false;
        }
    },
    
    initPostsArray : function () {
        var status_div = null;
        var post_links = null;
        var posts_usual = _dpt.getElementsByClassAndTag('post ord', 'div');
        var posts_golden = _dpt.getElementsByClassAndTag('post golden ord', 'div');
        _dpt.posts = posts_usual.concat(posts_golden);
        for (var i=0; i<_dpt.posts.length;i++) {
            var vote_arr = _dpt.getElementsByClassAndTag('vote_result', 'strong', _dpt.posts[i]);
            if (vote_arr && vote_arr.length==1) {
                _dpt.posts[i].vote = parseInt(vote_arr[0].innerHTML);
            } else {
                _dpt.posts[i].vote = 0;
            }

            // comments count
            status_div = _dpt.getElementsByClassAndTag('dd', 'div', _dpt.posts[i]);
            post_links = status_div[0].getElementsByTagName('a');
            _dpt.posts[i].comm_count = parseInt(post_links[2].innerHTML);
            if (isNaN(_dpt.posts[i].comm_count)) {
                _dpt.posts[i].comm_count = 0;
            }

            _dpt.posts[i].is_img = false;
            _dpt.posts[i].is_video = false;
            _dpt.posts[i].is_post = true;
            // is image
            var images = _dpt.posts[i].getElementsByTagName('img');
            if (images && images.length>0) {
                _dpt.posts[i].is_img = true;
                _dpt.posts[i].is_post = false;
            }

            // is video
            var videos = _dpt.getElementsByClassAndTag('post_video', 'div', _dpt.posts[i]);
            if (videos && videos.length>0) {
                _dpt.posts[i].is_video = true;
                _dpt.posts[i].is_post = false;
            }

            // is audio - not yet implemented
        }
    },

    workPlease : function () {
        if (_dpt.checkMainPage()) {
            _dpt.set_get();
            _dpt.replaceSelect();
            _dpt.initPostsArray();
            _dpt.addSortChks();
            _dpt.onChangeThreshold();
        }
    }
}

_dpt.workPlease();