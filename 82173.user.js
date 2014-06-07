// ==UserScript==
// @name          4chan Dark Upgrade
// @description   4chan custom layout
// @author        ahoka
// @version       2.1
// @homepage      http://userscripts.org/scripts/show/82173
// @include       http://boards.4chan.org/*
// @include       https://boards.4chan.org/*
// ==/UserScript==
(function(){
    var __hasProp = Object.prototype.hasOwnProperty;
    var config = {
        'Show Background': false,
        'Show Logo': true,
        'Auto noko': true,
        'Pages in nav': true,
        'Custom nav links': true,
        'Main Width %': 60,
        'Alignment': "Center",
        '_4chlinks': "<a href=\"http://boards.4chan.org/a/\">anime &amp; manga</a>&nbsp;-&nbsp;\n<a href=\"http://boards.4chan.org/c/\">anime/cute</a>&nbsp;-&nbsp;\n<a href=\"http://boards.4chan.org/g/\">technology</a>&nbsp;-&nbsp;\n<a href=\"http://boards.4chan.org/v/\">video games</a>&nbsp;-&nbsp;\n<a href=\"http://boards.4chan.org/jp/\">japan</a>"
    };
    var alignments = new Array("Left", "Center", "Right");
    var getValue = function(name) {
        return GM_getValue(name, config[name]);
    };
    var $ = function(selector, root) {
        root = root || document.body;
        return root.querySelector(selector);
    };
    $$ = function(selector, root) {
        var _a, _b, _c, _d, node, result;
        root = root || document.body;
        result = root.querySelectorAll(selector);
        _a = []; _c = result;
        for(_b = 0, _d = _c.length; _b < _d; _b++){
            node = _c[_b];
            _a.push(node);
        }
        return _a;
    };
    inBefore = function(root, el) {
        return root.parentNode.insertBefore(el, root);
    };
    var tag = function(el) {
        return document.createElement(el);
    };
    var remove = function(el) {
        return el.parentNode.removeChild(el);
    };
    if(typeof GM_deleteValue === 'undefined'){
        this.GM_setValue = function(name, value){
            value = (typeof value)[0] + value;
            return localStorage.setItem(name, value);
        };
        this.GM_getValue = function(name, defaultValue){
            var type, value;
            if(!(value = localStorage.getItem(name)) || value === 'undefined'){
                return defaultValue;
            }
            type = value[0];
            value = value.substring(1);
            if(type === 'b'){
                return value === 'true';
            }else if(type === 'n'){
                return Number(value);
            }else{
                return value;
            }
        };
    }
    var options = function(){
        var _c, _d, checked, div, hiddenNum, option;
        if((div = $('#themeoptions')))
            return remove(div);
        else
        {
            div = tag('div');
            div.id = 'themeoptions';
            div.className = 'reply';
            var html = '<div class="move" style="text-align:center">Theme Options</div><div>';
            _d = config;
            for (option in _d)
            {
                if (!__hasProp.call(_d, option)) continue;
                _c = _d[option];
                checked = getValue(option) ? "checked" : "";
                
                if (option == 'Main Width %')
                    html += '<label>' + option + '<input type="text" name="width" style="width:30px!important" value="' + getValue("Main Width %") + '" /></label>';
                else if (option == 'Alignment')
                {
                    html += '<label>' + option + '<select name="Alignment">';
                    for (var i = 0; i < alignments.length; i++)
                        html += '<option value="' + alignments[i] + '"' + (alignments[i] == getValue(option) ? ' selected="selected"' : '') +'>' + alignments[i] + '</option>';
                    html += '</select></label>';
                }
                else if (option != '_4chlinks')
                    html += "<label>" + option + "<input " + checked + " name=\"" + option + "\" type=\"checkbox\"></label>";
                else
                    html += "<textarea style=\"height:90px;width:360px;\" name=\"_4chlinks\">" + getValue('_4chlinks') + "</textarea>";
                
                html += "<br>";
            }
            html += '<div style="float:right;"><a name="save">save</a> <a name="cancel">cancel</a></div></div>';
            div.innerHTML = html;
            $('a[name="save"]', div).addEventListener('click', optionsSave, true);
            $('a[name="cancel"]',div).addEventListener('click', close, true);
            return document.body.appendChild(div);
        }
    };
    var defaultLinks = function() {
        var __4chlinks = $('textarea[name="_4chlinks"]');
        __4chlinks.value = config[_4chlinks];
    };
    var optionsSave = function() {
        var _4chlinks, _c, _d, _e, div, input, inputs;
        div = this.parentNode.parentNode;
        inputs = $$('input, select', div);
        _d = inputs;
        for (_c = 0, _e = _d.length; _c < _e; _c++)
        {
            input = _d[_c];
            if (input.name == "width")
                GM_setValue("Main Width %", parseInt(input.value));
            else if (input.name == "Alignment")
                GM_setValue("Alignment", input.value);
            else
                GM_setValue(input.name, input.checked);
        }
        _4chlinks = $('textarea[name="_4chlinks"]');
        GM_setValue(_4chlinks.name, _4chlinks.value);
        return location.reload(true);
    };
    var close = function() {
        var div;
        div = this.parentNode.parentNode.parentNode;
        return remove(div);
    };
    
    var css = "@font-face{font-family: 'AnonymousPro';font-style: normal;font-weight: normal;src: local('AnonymousPro'), url('http://themes.googleusercontent.com/static/fonts/anonymouspro/v1/Zhfjj_gat3waL4JSju74E1tUcs43uvLUMv3hfHgzs3w.woff') format('woff');}\
    *{font-family:arial,sans-serif;font-size:12px!important;}img{border:0!important;}*:focus{outline:1px solid #B1BCCC;}\
    input,textarea,select{font:11px 'Anonymous Pro',arial,sans-serif!important;}div.thread{clear:left;margin:3px 0 0;}\
    body{color:#fff!important;background:url(http://img85.imageshack.us/img85/4162/4chbg.gif) fixed #242424;margin:0 auto!important;}\
    form[name=delform],.postarea,table[align=right]{background:rgba(0,0,0,0.2);padding:1px 3px;border-radius:5px;-webkit-border-radius:5px;-moz-border-radius:5px;width:" + getValue("Main Width %") + "%!important;min-width:800px;max-width:1240px;" +
    (getValue("Alignment") == "Left" ? "margin:4px;" : (getValue("Alignment") == "Center" ? "margin:0 auto;" : "float:right;margin:4px;")) + "-webkit-box-shadow:rgba(0,0,0,0.45) 0px 0px 5px;-moz-box-shadow:rgba(0,0,0,0.45) 0px 0px 5px;box-shadow:rgba(0,0,0,0.45) 0px 0px 5px;}\
    #navtopr > a{padding:0 2px;}span.plus{color:#fff!important;}form[name=delform] table{border-spacing:0;margin:3px 0;position:relative;}.reply,.deletebuttons{border:1px solid #444!important;background:url(http://img84.imageshack.us/img84/1012/4ch.gif) #333!important;\
    position:relative;border-radius:5px;-webkit-border-radius:5px;-moz-border-radius:5px;color:#fff!important;border-bottom:1px solid #222!important;}.replyhider{position:absolute;right:2px;z-index:999;}\
    #header{left:0!important;height:18px!important;width:100%!important;padding:0!important;position:fixed!important;top:auto!important;bottom:0!important;z-index:999!important;\
    border-top:1px solid #434343!important;background:url(http://img84.imageshack.us/img84/1012/4ch.gif) #434343!important;text-align:center;\
    -webkit-box-shadow:rgba(0,0,0,0.45) 0px 0px 5px;-moz-box-shadow:rgba(0,0,0,0.45) 0px 0px 5px;box-shadow:rgba(0,0,0,0.45) 0px 0px 5px;}#thread_filter input{height:22px;margin:2px 1px;padding:1px 4px;}\
    a.linkmail[href=\"mailto:sage\"],a.linkmail[href=\"mailto:sage\"]:hover{color:#ff0000!important;font-weight:700!important;}#thread_filter.reply > div:first-child{padding:2px 5px!important;} \
    .omittedposts{margin-left:4px!important;color:#888!important;font-weight:700!important;text-decoration:none!important;}.filesize{margin-left:4px!important;}.replytitle {color:#999!important;}\
    .deletebuttons{padding:0 5px;text-align:right!important;color:#ccc!important;height:60px;}table {color:#ff0000 !important;}.filetitle {color:#aaa!important;} .commentpostername a.linkmail[href=\"mailto:sage\"]:after{content:\" (SAGE)\";}\
    #recaptcha_logo" + (!getValue("Show Logo") ? ",.logo" : "") + ",#recaptcha_tagline,td[align=right],td.rules,　img + br,　iframe,hr,#BF_WIDGET,.bf,.yui-g,#filter-button,\
    #option-button,#hd,#ft,td small,#footer,.rules,center font small,span[style=\"left: 5px; position: absolute;\"],form[name=delform]>br,div.thread>br{display:none!important;}\
    a:not(:link){text-decoration:none!important;font-weight:bold!important;}#themeoptions > div:not(.move){padding:5px;}#themeoptions input[type=text]{height:auto;margin:2px;padding:1px!important;}\
    #themeoptions{position:fixed;top:0;right:0;border:1px solid;text-align:right;min-width:140px;padding-bottom:5px;}#options label,#options a,#themeoptions label,#themeoptions a{cursor: pointer;}\
    table[align=right]{margin:15px 0 25px!important;line-height:22px;padding:3px!important;width:auto!important;}table,td{border:none!important;color:#ccc!important;}\
    .replymode {background-color:transparent!important;color:#fff!important;}th{background-color:#000!important;opacity:0!important;} tr{background-color:transparent!important;color:#fff!important;}\
    tr[height=\"73\"]{height:auto!important;}#recaptcha_image{margin-right:2px!important;}#recaptcha_table tr td{padding:0!important;}.recaptcha_input_area{padding:3px 0 0!important;}.recaptcha_image_cell{padding-right:2px!important;}div{color:#ccc!important;}\
    .commentpostername,.postername,.commentpostername a,.postername a{color:#fff!important}.commentpostername a,.postername a{font-weight:700!important;}.postertrip{color:#a7dce7!important;}a.linkmail,a.linkmail:hover{text-decoration:none!important;}\
    div.postblock{color:#fff!important;padding:0 3px!important;text-align:center!important;background-color:rgba(25,25,25,0.45)!important;border:0!important;border-bottom:1px solid #434343!important;border-top-left-radius:5px;border-top-right-radius:5px;-webkit-border-top-left-radius:5px;-webkit-border-top-right-radius:5px;-moz-border-radius-topleft:5px;-moz-border-radius-topright:5px;}\
    div.move{color:#fff!important;padding:0 3px!important;background-color:rgba(25,25,25,0.45)!important;border:0!important;border-bottom:1px solid #434343!important;border-top-left-radius:5px;border-top-right-radius:5px;-webkit-border-top-left-radius:5px;-webkit-border-top-right-radius:5px;-moz-border-radius-topleft:5px;-moz-border-radius-topright:5px;}\
    .postarea table{border-spacing:0!important;}.postarea>form{margin:4px 0;}.postarea{margin-bottom:10px!important;}.replyhl{background:none;-webkit-box-shadow:#994343 0 0 5px;border-radius:5px;-webkit-border-radius:5px;-moz-border-radius:5px;}\
    a{text-decoration:underline!important;color:#ddd!important;font-weight:normal!important;text-shadow:#000 0 1px;}a:hover{text-decoration:underline!important;color:#eee!important;}\
    td.replyhl a:hover,td.reply a:hover{color:#fff!important;}td.reply,td.replyhl{padding:2px;width:100%;}.img[md5]{height:auto!important;width:auto!important;}blockquote{margin-right:3px!important;}\
    td.reply img,td.replyhl img{-webkit-box-shadow:none!important;-moz-box-shadow:none!important;box-shadow:none!important;}#navtopr,#navbotr,.deletebuttons br{float:none!important;display:inline!important;}\
    div.reply{background:url(http://img714.imageshack.us/img714/3969/4ch2.gif) #333!important;margin:0!important;z-index:1000!important;}img.thumb,img[src*=/thumb/] {border:0!important;}\
    .hidethread,.unhidethread,.watchthread,.expandthread,.quickreply,.hidewatchedthreads,.refreshwatchedthreads,.restorewatchedthreads,.restorewatchedthreadsimg,img[src^=\"chrome://4chan/skin/buttons/\"],img[alt=\"Locked\"],img[alt=\"closed\"]{background-image:url('http://img175.imageshack.us/img175/1497/yunoiconsbf0.png')!important;}\
    img[src^=\"chrome://4chan/skin/buttons/\"],img[alt=\"Locked\"],img[alt=\"closed\"]{height:0!important;margin:0 1px!important;padding-top:16px!important;margin-right:-3px!important;width:16px!important;background-color:transparent!important;margin-left:4px!important;}\
    [src$=\"post_expand_plus.png\"] {background-position:-48px 0!important;}[src$=\"arrow_up.png\"] {background-position:-64px 0!important;}[src$=\"quote.png\"]{background-position:-80px 0!important}[src$=\"stop.png\"]{background-position:-96px 0!important}[src$=\"arrow_right.png\"]{background-position:-112px 0!important}\
    [src$=\"post_expand_minus.png\"]{margin-left:3px!important;background-position:-32px -16px!important}[src$=\"arrow_down.png\"]{background-position:-64px -16px!important}[src$=\"arrow_down2.png\"] {background-position:-80px -16px!important;}[src$=\"empty.png\"]{background-position:-96px -16px!important}\
    .inputtext{margin:0;padding:1px 4px;}td.postblock{background:none!important;text-align:right;padding:0 5px;vertical-align:top;}input[type=password]{height:24px;}input[type=file]{width:100%;}\
    input[type=button],input[type=submit]{height:24px;color:#000!important;cursor:pointer;margin:0 1px!important;}input[type=text]{height:24px;width:248px!important;}input[name=\"interval\"]{width:50px!important;}input[type=\"checkbox\"]{position:relative;top:2px!important;margin:2px!important;}\
    input:not([type=file]),textarea{border:1px solid #0f0f0f!important;background:rgba(120,120,120,0.3)!important;-webkit-box-shadow:inset #111 0 0 5px;-moz-box-shadow:inset #111 0 0 5px;box-shadow:inset #111 0 0 5px;}\
    input:not([type=file]):hover,textarea:hover{border:1px solid #333;background:rgba(120,120,120,0.5)!important;-webkit-box-shadow:inset #111 0 0 3px;-moz-box-shadow:inset #111 0 0 3px;box-shadow:inset #111 0 0 3px;}\
    select{background:#444;border:1px solid #0f0f0f;}select:hover{background:#666;}textarea{color:#fff;min-width:302px!important;margin:0!important;}input[type=password]{margin:0px!important;}\
    .unkfunc{font-weight:bold!important;color:#568821!important;} .unkfunc a, .unkfunc a:hover{font-weight:bold!important;text-shadow:none!important;text-decoration:none!important;color:#888!important;}\
    #pages{color:#666!important;}#pages span{color:#999!important;}#pages b{color:#fff!important;}#pages a{font-weight:bold!important;text-decoration:none!important;}#pages a:hover{color:#ccc!important;text-decoration:underline!important;}input[name=Interval]{width:82px!important;margin-right:2px;}\
    #navi{padding:1px 0;color:#999!important;text-shadow:0px 1px 1px #111;}#navi a{text-shadow:0px 1px 1px #111;text-decoration:none!important;font-weight:bold!important;color:#999!important;} #navi a:hover{color:#ccc!important;text-decoration:underline!important;}\
    .navi-left{padding-left:320px!important;text-align:left!important;}#imgControls{float:right;height:0;}td.doubledash{padding:0;text-indent:-9999px;}.recaptchatable #recaptcha_image{border:1px solid #000!important;}\
    #updater input:not([type=checkbox]){margin:1px!important;}.logo{position:absolute;" + (getValue("Alignment") == "Right" ? "left" : "right") + ":5px;top:25px;width:auto;}\
    .logo img{margin:0!important;-moz-opacity:0.6;-khtml-opacity:0.6;opacity:0.6;-webkit-box-shadow:rgba(0,0,0,0.8) 0px 0px 5px;-moz-box-shadow:rgba(0,0,0,0.8) 0px 0px 5px;box-shadow:rgba(0,0,0,0.8) 0px 0px 5px;border-radius:5px;-webkit-border-radius:5px;-moz-border-radius:5px;}\
    .logo span,.logo font[size=\"1\"]{color:#fff;text-shadow:#000 0 -1px 1px;display:block;font-size:18px!important;text-align:center;margin-top:-30px;position:relative;background:rgba(0, 0, 0, 0.6);font-family:Verdana,sans-serif!important;padding:4px;}\
    .logo span{border-radius:0 0 5px 5px;-webkit-border-radius:0 0 5px 5px;-moz-border-radius:0 0 5px 5px;}\
    .logo font[size=\"1\"]{display:inline-block!important;font-size:12px!important;margin-top:-115px!important;float:right;border-radius:0 5px 0 5px;-webkit-border-radius:0 5px 0 5px;-moz-border-radius:0 5px 0 5px;}\
    div.autohide > a[title=\"Auto-hide dialog box\"]{color:#fff!important;text-decoration:underline!important;}\
    input,select{color:#fff!important;-webkit-transition:all 100ms ease-in-out;-moz-transition:all 100ms ease-in-out;-o-transition:all 100ms ease-in-out}";
    
    if(getValue('Custom nav links')){
        var pages = '';
        if(getValue('Pages in nav')){
            css += ".pages{display:none!important;}";
            var omg = document.getElementsByTagName('td');
            for(i = 0; i < omg.length; i++){
                if(omg[i].innerHTML == 'Previous' || omg[i].innerHTML == '<input type="submit" value="Previous" accesskey="z">'){
                    var pages = omg[i+1].innerHTML;
                }
            }
            var pages = pages.replace(/\] \[/g,'<span> | </span>');
            var pages = pages.replace(/\[/g,'');
            var pages = pages.replace(/\] /g,'');
            if(pages == '' || pages.substring(0,3) == '<b>'){
                var before = '';
            }else if(pages.substring(0,3) != '<b>'){
                var thispage = pages.search('<b>');
                var thispage = pages.substring(thispage+3,thispage+5);
                var before = parseInt(thispage)-1;
                var before = '<a href="'+before+'"><font style="font-family:Tahoma, Arial, Helvetica, sans-serif!important;">&#171;</font></a> ';
            }
            if(pages == '' || pages.substring(pages.length-4,pages.length) == '</b>'){
                var next = '';
            }else if(pages.substring(pages.length-4,pages.length) != '</b>'){
                var thispage = pages.search('<b>');
                var thispage = pages.substring(thispage+3,thispage+5);
                var next = parseInt(thispage)+1;
                var next = ' <a href="'+next+'"><font style="font-family:Tahoma, Arial, Helvetica, sans-serif!important;">&#187;</font></a>';
            }
            var pages = before+pages+next;
        }else
            css += ".pages{background:transparent;color:#fff!important;}";
            
        var _4chlinks = getValue('_4chlinks');
        var navi = document.getElementById('header');
        navi.innerHTML = '<div style="position:relative;width:100%;"><div id="pages" style="position:absolute;left:5px;">'+pages+'</div>\
        <div style="position:absolute;right:5px;"><span id="navtopr"><a></a></span> / <a name="4chdarkop" class="pointer">Theme</a></div></div>\
        <div id="navi">'+_4chlinks+'</div>';
        $('a[name="4chdarkop"]').addEventListener('click', options, true);
    }else{
        css += "#navtop,#navtopr{float:none!important;display:inline!important;}.pages{background:transparent;color:#fff!important;}";
        var text, a;
        text = $('#navtopr a').nextSibling;
        a = tag('a');
        a.textContent = 'Theme';
        a.setAttribute('class','pointer');
        a.addEventListener('click', options, true);
        inBefore(text, document.createTextNode('/'));
        inBefore(text, a);
    }
    
    var captchaInput = document.getElementById('recaptcha_response_field');
    captchaInput.setAttribute('style','height:24px!important;padding:1px 4px!important;margin-top:2px;width:302px!important;');
    
       
    if(typeof GM_addStyle != "undefined")
        GM_addStyle(css);
    else if(typeof PRO_addStyle != "undefined")
        PRO_addStyle(css);
    else if(typeof addStyle != "undefined")
        addStyle(css);
    else
    {
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0)
        {
            var node = document.createElement("style");
            node.type = "text/css";
            node.appendChild(document.createTextNode(css));
            heads[0].appendChild(node); 
        }
    }
    
    if(getValue('Auto noko'))
        document.getElementsByName("email", "input")[0].value = "noko";
    
    if(getValue('Show Background'))
    {
        var bkground = document.createElement('div');
            bkground.setAttribute('style','position:fixed;bottom:0;left:0;z-index:-1;background:url(http://img231.imageshack.us/img231/5108/4chthbg.png) center bottom no-repeat;width:100%;height:100%;');
        document.body.appendChild(bkground);
    }
})();