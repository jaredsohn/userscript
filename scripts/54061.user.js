// ==UserScript==
// @name           iWord
// @namespace      http://userscripts.org/users/99002
// @description    Quest for explaining of mouseover word.
// @editor         keefo
// @version        0.1.6.20090722
// @include        *
// ==/UserScript==

var version="0.1.6.20090722";

(function(){

const DICT_SITE = "Dict"                //默认字典
const DELAY = 500;                      //取词延迟时间[ms] (默认:500ms)
const BACKGROUND_COLOR = "cornsilk";    //背景色 (默认背景色：cornsilk)
const FONT_COLOR = "black";             //文字颜色(默认字体颜色：black)
const FONT_SIZE = "10pt";               //字体大小 (默认字体大小：10pt)
const TRANS = "0.92";                   //透明度 (默认透明度：0.92)

var Conf = {
    site: DICT_SITE,
    delay: DELAY,
    enabled: true,
    settimeout: false,
    regex1: /[a-zA-Z]/,            //MouseoverWord mouseoffset使用
    regex2: /[^a-zA-Z]/,        //MouseoverWord onmousetext使用
    regex3: /^[a-zA-Z]{3,}$/    //MouseMove事件 targetword使用
};

function $(id) {
    return document.getElementById(id);
}

//你可以添加其他翻译网站。
var SITE = {
    Dict: {
        name: "Dict.cn字典",
        site_url: "http://dict.cn/",
        url: function(word){ return "http://dict.cn/mini.php?q=" + word; },
        method: "GET",
        encode: "gb2312",
        formatResult: function(originalhtml){
            var formathtml = "";
            if(/<body .*?>\s+((?:.|\s)*?)<\/body>/.test(originalhtml)){
                formathtml = RegExp.$1;
				var tempstr = formathtml.substring(0,6);
                if(tempstr=="</div>"){
                    formathtml="<div>"+formathtml.substring(6);
                }
                formathtml = formathtml.replace(/\n/g, "");
                formathtml = formathtml.replace(/<table .*?>/g, "");
				formathtml = formathtml.replace(/<span .*?>/g, "<span>");
				formathtml = formathtml.replace(/<div .*?>/g, "<div>");
                formathtml = formathtml.replace(/<\/table>/g, "");
                formathtml = formathtml.replace(/<tbody>/g, "");
                formathtml = formathtml.replace(/<\/tbody>/g, "");
                formathtml = formathtml.replace(/<tr.*?>/g, "");
                formathtml = formathtml.replace(/<\/tr>/g, "");
                formathtml = formathtml.replace(/<td.*?>/g, "");
                formathtml = formathtml.replace(/<\/td>/g, "");
                formathtml = formathtml.replace(/<small>/g, "");
                formathtml = formathtml.replace(/<\/small>/g, "");
                formathtml = formathtml.replace(/<!--.*?-->/g, "");
                formathtml = formathtml.replace(/<a .*?>.*?<\/a>/g, "");
                formathtml = formathtml.replace(/<br>/g, "<br>\n");
                formathtml = formathtml.replace(/<br\/>/g, "<br>\n");
                var word = formathtml.replace(/\s|\n/g, '');
                if(!word) formathtml = word;
                formathtml+="</div>";
            }
            return formathtml;
        }
    },
    
    Baidu: {
        name: "Baidu字典",
        site_url: "http://dict.baidu.com/",
        url: function(word){ return "http://dict.baidu.com/s?word="+word+"&tn=simple"; },
        method: "GET",
        encode: "gb2312",
        formatResult: function(originalhtml){
            var formathtml = "";
            formathtml = originalhtml;
            formathtml = formathtml.replace(/\n/g, "");
            formathtml = formathtml.replace(/<table .*?>/g, "");
            formathtml = formathtml.replace(/<\/table>/g, "");
            formathtml = formathtml.replace(/<tbody>/g, "");
            formathtml = formathtml.replace(/<\/tbody>/g, "");
            formathtml = formathtml.replace(/<tr.*?>/g, "");
            formathtml = formathtml.replace(/<\/tr>/g, "");
            formathtml = formathtml.replace(/<td.*?>/g, "");
            formathtml = formathtml.replace(/<\/td>/g, "");
            formathtml = formathtml.replace(/<small>/g, "");
            formathtml = formathtml.replace(/<\/small>/g, "");
            formathtml = formathtml.replace(/<!--.*?-->/g, "");
            formathtml = formathtml.replace(/<a .*?>.*?<\/a>/g, "");
            formathtml = formathtml.replace(/<br>/g, "<br>\n");
            formathtml = formathtml.replace(/<br\/>/g, "<br>\n");
            var word = formathtml.replace(/\s|\n/g, '');
            if(!word) formathtml = word;
            return formathtml;
        }
    }
}

var Util = {
    //Triming left and right space
    Trim: function(str) {
        return str.replace( /^\s*/, "" ).replace( /\s*$/, "" );
    },

    //Triming right space
    Rtrim: function(str) {
        return str.replace( /\s*$/, "" );
    },

    //Triming left space
    Ltrim: function(str) {
        return str.replace( /^\s*/, "" );
    },

    //no operation
    NoOperation: function() {
    }
};
function removeElement(e)
{
    e&&e.parentNode.removeChild(e);
    return true;
}



//检查更新
function checkUpdate() {
    var today=new Date();
    var last=GM_getValue("iWord_lastUpdate","");
    //一天检查一次
    if(last=="" || (today-last)/3600000/24>1) {
        var pageLink=GM_getValue("iWord_pageLink","http://userscripts.org/scripts/show/54061");
        var scriptLink=GM_getValue("iWord_scriptLink","http://userscripts.org/scripts/source/54061.user.js");
        GM_xmlhttpRequest({
            method: 'GET',
            url: pageLink,
            onload: function(res) {
                var nv,cv,i;
                var udiv;
                if(res.status!=200) {
                    return;
                }
				
                if(nv=/<b>Version:<\/b>.*\n *([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)/.exec(res.responseText)) {
                    cv=version.split(".");
                    for(i=0;i<4;i++) {
                        if(nv[i+1]>cv[i]) {
                            udiv=document.createElement("div");
                            udiv.id="iWord_updateNotify";
                            udiv.style.bottom="0px";
                            udiv.style.position="fixed";
                            udiv.style.zIndex=100000;
                            udiv.style.backgroundColor="rgb(246, 246, 246)";
                            udiv.innerHTML='<div><font color=crimson>iWord已有新版本：'+nv[1]+'.'+nv[2]+'.'+nv[3]+'.'+nv[4]+'</font> <a id="iWord_update" style="cursor:pointer;" href="'+scriptLink+'" target="_blank">安装</a> <a id="iWord_toSee" style="cursor:pointer;">去看看</a> <a id="iWord_updateLater" style="cursor:pointer;">以后再说</a></div>';
							document.body.appendChild(udiv);
							$("iWord_update").addEventListener("click",function(){
									removeElement($("iWord_updateNotify"));
									GM_setValue("iWord_lastUpdate",today.toString());
							},false);
                            $("iWord_toSee").addEventListener("click",function(){
                                    removeElement($("iWord_updateNotify"));
                                    window.open(pageLink);
                            },false);
                            $("iWord_updateLater").addEventListener("click",function(){
                                    removeElement($("iWord_updateNotify"));
                                    GM_setValue("iWord_lastUpdate",today.toString());
                            },false);
                            return;
                        }
                    }

                }
				if(Form.current_mode != 0) {
					window.alert("The current version is up to date!");
				}	
            }
        });
    }
}


function MouseoverWord(event){
    var onmousenode, onmousetext, mouseoffset, startoffset, endoffset, i;
    var word = "";
    onmousenode = event.rangeParent;
    if(onmousenode.nodeType == 3 && onmousenode.parentNode == document.elementFromPoint(event.clientX, event.clientY)){
        onmousetext = onmousenode.nodeValue;
        mouseoffset = event.rangeOffset;
        if(mouseoffset < onmousetext.length && Conf.regex1.test(onmousetext[mouseoffset])){
            for(startoffset=mouseoffset; startoffset>0; startoffset--){
                if(Conf.regex2.test(onmousetext[startoffset - 1])) break;
            }
            for(endoffset=mouseoffset; endoffset<onmousetext.length-1; endoffset++){
                if(Conf.regex2.test(onmousetext[endoffset + 1])) break;
            }
            if(Extention.include_apostrophe == true) {
                if(onmousetext[endoffset] == "'") {
                    endoffset--;
                }
                if(onmousetext[startoffset] == "'") {
                    startoffset++;
                }
            }
            for(i=startoffset; i<=endoffset; i++) word += onmousetext[i];
        }
    }
    return word;
}

function PopupMainDiv(popuphtml, basispositionx, basispositiony){
    var popup = document.createElement("div");
    popup.id = "keefoiworddiv";
    var horizontalspace = 20;
    var verticalspace = 15;
    with(popup.style) {
        position = "absolute";
        left = basispositionx + horizontalspace + "px";
        top = basispositiony + verticalspace + "px";
        zIndex = "100000000";
        backgroundColor = BACKGROUND_COLOR;
        border = "1px solid #000";
        width = "320px";
        fontSize = FONT_SIZE;
        color = FONT_COLOR;
        textAlign = "left";
        lineHeight = "120%";
        paddingLeft = "20px";
        paddingRight = "20px";
        opacity = TRANS;
    }
    popup.innerHTML = popuphtml;
    popup = document.body.appendChild(popup);
    if(popup.offsetLeft + popup.offsetWidth - window.scrollX > window.innerWidth) popup.style.left = basispositionx - horizontalspace - popup.offsetWidth + "px";
    if(popup.offsetTop + popup.offsetHeight - window.scrollY > window.innerHeight) popup.style.top = basispositiony - verticalspace - popup.offsetHeight + "px";
    return popup;
}

//清除弹出，取消加工或翻译
function deletePopup(){
    clearTimeout(popupTimerID);
    var popupnode = null;
    do {
        popupnode = document.getElementById("keefoiworddiv");
        if(popupnode != null) {
            document.body.removeChild(popupnode);
        }
    } while(popupnode);
    window.removeEventListener("keydown", Quest.Check_Event, false);
    Quest.working = false;
}


//Drag and Drop object
var DnD = {
    startX:0,            //Starting mouse X position
    startY:0,            //Starting mouse Y position
    offsetLeft:0,        //Starting drag_obj left position
    offsetTop:0,        //Starting drag_obj top position
    click_obj: null,    //trigger object
    drag_obj: null,        //drag object
    callback: [],        //callback functions
    status: 0,            //drag status

    initialize: function(click_obj, drag_obj) {
        if( typeof click_obj == 'object') {
            this.click_obj = click_obj;
        } else if( typeof click_obj == 'string') {
            this.click_obj = $(click_obj);
        } else {
            return false;
        }
        if( typeof drag_obj == 'object') {
            this.drag_obj = drag_obj;
        } else if( typeof drag_obj == 'string') {
            this.drag_obj = $(drag_obj);
        } else {
            return false;
        }
        this.click_obj.addEventListener('mousedown', 
            function(e){
                DnD.start(e);
            }, 
            true);
        DnD.status = 0;
        document.addEventListener("mousemove", DnD.dragging, true);
        document.addEventListener("mouseup", DnD.stop, true);
    },

//Set a callback function.
//The callback function is called with click_obj and drag_obj parameter before the function phase finished.
    setCallback: function(stat, callback) {
        if( typeof callback == 'function') {
            var phase = ['start','dragging','stop'].indexOf(stat);
            if(phase >= 0) {
                this.callback[phase] = callback;
            }
        }
    },

//Drag start
    start: function(e) {
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.offsetLeft  = DnD.drag_obj.offsetLeft;
        this.offsetTop   = DnD.drag_obj.offsetTop;
        e.preventDefault();
        if(DnD.callback[0]) {
            DnD.callback[0](DnD.click_obj, DnD.drag_obj);
        }
        DnD.status = 1;
    },

//Dragging
    dragging: function(e) {
        if(DnD.status != 1) {
            return;
        }
        e.preventDefault();
        var x = DnD.offsetLeft + e.clientX - DnD.startX;
        var y = DnD.offsetTop + e.clientY - DnD.startY;
        DnD.drag_obj.style.left = x + "px";
        DnD.drag_obj.style.top = y + "px";
        if(DnD.callback[1]) {
            DnD.callback[1](DnD.click_obj, DnD.drag_obj);
        }
    },

//Drag stop
    stop: function(e) {
        if(DnD.status != 1) {
            return;
        }
        DnD.status = 0;
        if(DnD.callback[2]) {
            DnD.callback[2](DnD.click_obj, DnD.drag_obj);
        }
    },

    finalize: function() {
        document.removeEventListener("mousemove", DnD.dragging, true);
        document.removeEventListener("mouseup", DnD.stop, true);
        this.status = 0;
        this.click_obj = null;
        this.drag_obj = null;
        for(var i = 0; i < this.callback.length; i++) this.callback[i] = null;
    }
};

//表格处理
var    suffix = "_for_iWordByKeefo";
var Form = {
//properties
    project_url: 'http://www.beyondcow.com/blog/iWord/',
    margin_x: 20,    //20 pixel
    margin_y: 20,    //20 pixel
    x: 0,
    y: 0,
    current_mode: 0,
    default_popup_style: <><![CDATA[
        z-index: 2147483646;
        background-color: cornsilk;
        border: 1px solid black;
        width: auto;
        font-size: 10pt;
        color: black;
        text-align: left;
        line-height: 140%;
        padding-left: 10px;
        padding-right: 10px;
        opacity: 0.92;
        overflow: auto;
        padding: 0 0 4px 3px;
        min-width: 300px;
        max-width: 300px;
    ]]></>+"",

    site: DICT_SITE,
    dictionary_sites: [],
    settimeout: false,
    checkupdate: true,
    include_apostrophe: false,
    delay: DELAY,
    popup_style: '',

    exit_cb: null,

//IDs
    div_id: "gm_div" + suffix,
    title_id: "gm_title" + suffix,
    command_id: "gm_command" + suffix,
    reset_id: "gm_reset_button" + suffix,
    save_id: "gm_save_button" + suffix,
    quit_id: "gm_quit_button" + suffix,
    update_id: "gm_update_button" + suffix,
    help_id: "gm_help_button" + suffix,
    visit_id: "gm_visit_button" + suffix,
    default_id: "gm_default_button" + suffix,
    setting_div_id: "gm_setting_div" + suffix,
    dictionary_sites_id: "gm_dictionary_sites" + suffix,
    dictionary_name_id: "gm_dictionary_name" + suffix,
    settimeout_id: "gm_settimeout" + suffix,
    checkupdate_id: "gm_checkupdate" + suffix,
    extend_mode_id: "gm_extend_mode" + suffix,
    include_apostrophe_id: "gm_include_apostrophe" + suffix,
    delay_id: "gm_delay" + suffix,
    customize_checkbox_id: "gm_customize_checkbox" + suffix,
    textarea_id: "gm_textarea" + suffix,

//Classes
    label_class: "gm_label" + suffix,
    textbox_class: "gm_textbox" + suffix,
    button_class: "gm_button" + suffix,
    radio_label_class: "gm_radio_label" + suffix,
    radio_button_class: "gm_radio_button" + suffix,
    check_box_class: "gm_check_box" + suffix,
    select_list_class: "gm_select_list" + suffix,
    option_list_class: "gm_option_list" + suffix,
    vertical_line_class: "gm_vertical_line" + suffix,

//Styles
    div_style_close: 'display:none;',
    div_style_open: 'display:block;',
    span_style_close: 'display:none;',
    span_style_open: 'display:inline;',

    style: <><![CDATA[
    #$div_id { width:500px;z-index:2147483645;border: 1px ridge gray;position:fixed;background-color:#eaeaea;font-weight: normal;font-size:9pt;text-align:left;color:#000000;cursor:default; }
    #$div_id div{}
    #$div_id input{margin:0;padding:0;}
    #$div_id table{border:0; width:100%;}
    #$div_id table th{background-color:#eaeaea;background-image: none; color:#000; text-align:right;border:0px;}
    #$div_id table td{background-color:#eaeaea;background-image: none; color:#000; text-align:left;border:0px;}
    
    #$title_id { height:22px; font-size:12px; font-weight:bold;text-align:center;padding-top:6px;color:#FFFFFF; background-color: #122d71; cursor:move; margin-bottom: 5px;}
    #$div_id #$command_id { height:32px; font-weight: bold;text-align:center;color:#FFFFFF; margin: 0;}
    #$reset_id { }
    #$save_id { }
    #$quit_id { }
    #$update_id { }
    #$help_id { }
    #$visit_id { }
    .$button_class { color:buttontext;background-color:buttonface;height:24px;border:2px outset buttonface;margin:1px 4px 4px 15px; }
    .$button_class:hover { color:buttontext;height:24px;border:2px outset buttonface;margin:1px 4px 4px 15px; cursor:pointer; }
    .$label_class { font-size:9pt;vertical-align:middle;height:36px;margin: 4px; }
    .$textbox_class {font-size:9pt;vertical-align:middle;height:18px; }
    .$radio_label_class { color: #000000; background-color:#eaeaea; font-size:12px; }
    .$radio_button_class { margin-top:10px;vertical-align:bottom;background-color:#eaeaea; }
    .$check_box_class { height:16px;width:16px;margin:4px 0px 0px 10px;vertical-align:middle; }
    .$vertical_line_class { height:16px;width:1px;margin:0px 4px 0px 4px;vertical-align:middle; border-left:1px solid black;}
    #$setting_div_id { margin-top: 3px;}
    #$dictionary_sites_id { }
    #$dictionary_name_id { }
    #$settimeout_id { margin-left:2px; }
    #$checkupdate_id { margin-left:2px; }
    #$extend_mode_id { margin-left:2px; }
    #$include_apostrophe_id { margin-left:2px; }
    #$delay_id { padding-left:4px; width:38px; }
    #$default_id {color:buttontext; cursor:auto; }
    #$textarea_id { width:95%;height:160px;color:#000000;background-color:#FFFFFF;border:1px inset; margin:0;font-size: 12px; }
    #$div_id hr { margin: 2px; border-color: #888888; } 
    ]]></>+"",

//Form HTML
    html: <><![CDATA[
    <div id="$div_id" style="display: none;">
    <div id="$title_id">iWord</div>
    
    <div id="$command_id">
    <input id="$reset_id" type="button" class="$button_class" value="重置" />
    <input id="$save_id" type="button" class="$button_class" value="保存" />
    <input id="$quit_id" type="button" class="$button_class" value="关闭" />
    <input id="$update_id" type="button" class="$button_class" value="更新" />
    <input id="$help_id" type="button" class="$button_class" title="进入主页" value="帮助" />
    <input id="$visit_id" type="button" class="$button_class" value="词典网站" />
    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank" style="display:inline;margin:0;">
     <input type="hidden" name="cmd" value="_s-xclick">
     <input type="hidden" name="hosted_button_id" value="6982573">
     <input type="image" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" style="margin:0;vertical-align:middle;" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
     <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1"> 
    </form>

    </div>
    <table id="$setting_div_id">
    <tr><th width="80"><span class="$label_class">选择词典:</span></th><td><select id="$dictionary_sites_id">
    </select> <span class="$label_class" id="$dictionary_name_id"></span></td></tr>
    <tr><th><span class="$label_class">setTimeout:</span></th><td><input type="checkbox" class="$check_box_class" id="$settimeout_id" ></input>  <span class="$label_class">取词延迟时间</span><input type="text" class="$textbox_class" id="$delay_id" style="width:30px;height:20px;" size="2" /><span class="$label_class">毫秒</span></td></tr>
    <tr><th><span class="$label_class">省略号:</span></th><td><input type="checkbox" class="$check_box_class" id="$include_apostrophe_id" ></input><span class="$label_class">视为单词</span></td></tr>
    <tr><th><span class="$label_class">脚本自动更新:</span></th><td><input type="checkbox" class="$check_box_class" id="$checkupdate_id" /></td></tr>
    <tr><th><span class="$label_class">弹出窗口CSS:</span></th><td><input type="checkbox" class="$check_box_class" id="$customize_checkbox_id" /><span class="$label_class">编辑</span>
    <input id="$default_id" type="button" class="$button_class" value="还原到默认的CSS" /></td></tr>
    <tr><td colspan="2"><textarea id="$textarea_id" style="display:none;"></textarea></td></tr>
    </table>
    
    ]]></>+"",

//functions
    replace: function(word) {
        word = word.replace(/\$div_id/g,this.div_id);
        word = word.replace(/\$title_id/g,this.title_id);
        word = word.replace(/\$command_id/g,this.command_id);
        word = word.replace(/\$reset_id/g,this.reset_id);
        word = word.replace(/\$save_id/g,this.save_id);
        word = word.replace(/\$quit_id/g,this.quit_id);
        word = word.replace(/\$update_id/g,this.update_id);
        word = word.replace(/\$help_id/g,this.help_id);
        word = word.replace(/\$visit_id/g,this.visit_id);
        word = word.replace(/\$default_id/g,this.default_id);
        word = word.replace(/\$setting_div_id/g,this.setting_div_id);
        word = word.replace(/\$settimeout_id/g,this.settimeout_id);
        word = word.replace(/\$checkupdate_id/g,this.checkupdate_id);
        word = word.replace(/\$include_apostrophe_id/g,this.include_apostrophe_id);
        word = word.replace(/\$dictionary_sites_id/g,this.dictionary_sites_id);
        word = word.replace(/\$dictionary_name_id/g,this.dictionary_name_id);
        word = word.replace(/\$delay_id/g,this.delay_id);
        word = word.replace(/\$customize_checkbox_id/g,this.customize_checkbox_id);
        word = word.replace(/\$textarea_id/g,this.textarea_id);
        word = word.replace(/\$label_class/g,this.label_class);
        word = word.replace(/\$textbox_class/g,this.textbox_class);
        word = word.replace(/\$button_class/g,this.button_class);
        word = word.replace(/\$radio_button_class/g,this.radio_button_class);
        word = word.replace(/\$radio_label_class/g,this.radio_label_class);
        word = word.replace(/\$check_box_class/g,this.check_box_class);
        word = word.replace(/\$vertical_line_class/g,this.vertical_line_class);
        return word;
    },

    initialize: function(exit_cb) {
        this.default_popup_style = this.default_popup_style.replace(/\t|^\n/g,"");
        this.html = this.replace(this.html);
        this.style = this.replace(this.style);
        this.exit_cb = exit_cb;
        var keys;
        this.dictionary_sites = new Array(0);
        for (keys in SITE) {
            this.dictionary_sites.push(keys);
        }
    },

    addForm: function() {
        //create a new box for adding form
        var    div = document.createElement('div');
        div.innerHTML = this.html;
        var    style = document.createElement('style');
        style.innerHTML = this.style;

        //append above code in original page
        var body = document.getElementsByTagName("body");
        body[0].appendChild(style);
        body[0].appendChild(div);
        $(Form.reset_id).addEventListener("click",Form.Reset,true);
        $(Form.quit_id).addEventListener("click",Form.Quit,true);
        $(Form.update_id).addEventListener("click",Form.Update,true);
        $(Form.help_id).addEventListener("click", function(e){ Form.Help(e); },true);
        $(Form.save_id).addEventListener("click",Form.Save,true);
        $(Form.visit_id).addEventListener("click",Visit_Site,true);
        
        $(Form.default_id).addEventListener("click",Set_Default_CSS,true);
        $(Form.customize_checkbox_id).addEventListener("click",Customize,true);
        $(Form.dictionary_sites_id).addEventListener("change",Dictionary_Selected,true);
        $(Form.dictionary_sites_id).addEventListener("keyup",Dictionary_Selected,true);
        
        var parent = $(this.dictionary_sites_id);
        for(var i = 0; i < this.dictionary_sites.length; i++) {
            var node = document.createElement('option');
            node.innerHTML = this.dictionary_sites[i];
            parent.appendChild(node);
        }

        window.addEventListener(
            "resize",
            function() {
            Form.adjust_Form_Position();
            },
            false);

    },

    outputValues: function() {
    },

    setDefaultValue: function() {
    },

//配置变量取值
    getValue: function() {
        this.site = GM_getValue("site", this.site);
        if(SITE[this.site] == undefined) {
            this.site = DICT_SITE;
            GM_deleteValue("site");
        }
        
        this.settimeout = GM_getValue("settimeout", this.settimeout);
        this.checkupdate = GM_getValue("checkupdate", this.checkupdate);
        this.include_apostrophe = GM_getValue("include_apostrophe", this.include_apostrophe);
        this.delay = GM_getValue("delay", this.delay);
        this.popup_style = GM_getValue("popup_style", this.default_popup_style);
        this.outputValues();
    },

//配置变量保存
    setValue: function() {
        GM_setValue("site", this.site);
        GM_setValue("settimeout", this.settimeout);
        GM_setValue("checkupdate", this.checkupdate);
        GM_setValue("iWord_lastUpdate","");
        
        GM_setValue("include_apostrophe", this.include_apostrophe);
        
        GM_setValue("delay", this.delay);
		if(this.popup_style=="")
			this.popup_style=Form.default_popup_style;
        GM_setValue("popup_style", this.popup_style);
        this.outputValues();
    },

    getFormValue: function() {
        var parent = $(this.dictionary_sites_id);
        var nodes = GetOptionList(this.dictionary_sites_id);
        for(var i = 0; i < nodes.length; i++) {
            if(nodes[i].selected == true) {
                this.site = nodes[i].value;
                break;
            }
        }
        
        this.settimeout = $(this.settimeout_id).checked;
        this.checkupdate = $(this.checkupdate_id).checked;
        this.include_apostrophe = $(this.include_apostrophe_id).checked;
        this.delay = parseInt($(this.delay_id).value?$(this.delay_id).value:0);
        this.popup_style = $(this.textarea_id).value;
    },

    setFormValue: function() {
        var parent = $(this.dictionary_sites_id);
        var nodes = GetOptionList(this.dictionary_sites_id);
        for(var i = 0; i < nodes.length; i++) {
            if(this.site == nodes[i].value) {
                nodes[i].selected = true;
                break;
            }
        }
        Dictionary_Selected();
        $(this.settimeout_id).checked = this.settimeout;
        $(this.checkupdate_id).checked = this.checkupdate;
        $(this.include_apostrophe_id).checked = this.include_apostrophe;
        $(this.delay_id).value = this.delay;
		if(this.popup_style=="")
			this.popup_style=Form.default_popup_style;
        $(this.textarea_id).value=this.popup_style;
    },

    checkFormValue: function() {
        return true;
    },

    //Open form box
    openForm: function() {
        var div = $(Form.div_id);
        var x = this.x;
        var y = this.y;
        div.setAttribute("style",Form.div_style_open+"top:"+y+"px;left:"+x+"px;");
        this.current_mode = 1;
        $(Form.title_id).innerHTML="iWord ("+version+")";
        DnD.initialize(Form.title_id, div);
        DnD.setCallback('stop', Form.adjustPosition);
        this.adjust_Form_Position();
    },

    //Close form box
    closeForm: function(){
        var div = $(Form.div_id);
        div.setAttribute("style",this.div_style_close);
        this.current_mode = 0;
        DnD.finalize();
    },

    //form opened?
    isFormOpened: function() {
        var div = $(Form.div_id);
        var style = div.style.display;
        if(style == 'none') {
            return false;
        } else {
            return true;
        }
    },

//Check current mode
    checkCurrentMode: function(mode,false_msg) {
//modify current mode,sometimes current mode is broken
        if(Form.isFormOpened() == true) {
            Form.current_mode = 1;
        } else {
            Form.current_mode = 0;
        }
        if(Form.current_mode == mode) {
            return true;
        } else {
            if(false_msg) {
                if(Form.current_mode == 0) {
                    window.alert("Form is not opened");
                } else {
                    window.alert("Form is already opened");
                }
            }
            return false;
        }
    },

//callback function for drop
    adjustPosition: function(click_obj, drag_obj) {
        var    div = drag_obj;
        var    div_x = div.offsetLeft;
        var    div_y = div.offsetTop;
        var    win_height = window.innerHeight;
        var    win_width = window.innerWidth;
        var    div_height = div.offsetHeight;
        var    div_width = div.offsetWidth;
        var    margin_x = Form.margin_x;
        var    margin_y = Form.margin_y;
        var    adjust = 0;

        if(div_x + div_width + margin_x > win_width) {
            div_x = win_width - div_width - margin_x;
            adjust++;
        }
        if(div_x < margin_x) {
            div_x = margin_x;
            adjust++;
        }
        if(div_y + div_height + margin_y > win_height) {
            div_y = win_height - div_height - margin_y;
            adjust++;
        }
        if(div_y < margin_y) {
            div_y = margin_y;
            adjust++;
        }
        if(adjust) {
            div.style.left = div_x +"px";
            div.style.top = div_y +"px";
        }
        Form.x = div_x;
        Form.y = div_y;
        return;
    },

//Adjust Form Position
    adjust_Form_Position: function(){
        Form.moveForm(0, 0);
    },

//Move Form
    moveForm: function(dx, dy){
        var    win_height = window.innerHeight;
        var    win_width = window.innerWidth;
        var    x = this.x;
        var    y = this.y;
        var    div = $(Form.div_id);
        var    div_height = div.offsetHeight;
        var    div_width = div.offsetWidth;
        var    margin_x = this.margin_x;
        var    margin_y = this.margin_y;

        x += dx;
        if(x + div_width + margin_x > win_width) {
            x = win_width - div_width - margin_x;
        }
        if(x < margin_x) {
            x = margin_x;
        }
        y += dy;
        if(y + div_height + margin_y > win_height) {
            y = win_height - div_height - margin_y;
        }
        if(y < margin_y) {
            y = margin_y;
        }
        this.x = x;
        this.y = y;
        div.style.left = x +"px";
        div.style.top = y +"px";
    },

//Reset Form
    Reset: function(){
        Form.getValue();
        Form.setFormValue();
//        Clear_List_Box();
    },

//Help
    Help: function(e){
        window.open(Form.project_url);
    },

//Quit Form
    Quit: function(){
        Form.closeForm();
        if(Form.exit_cb) Form.exit_cb(false);
    },

//Quit Form
    Update: function(){
        GM_setValue("iWord_lastUpdate","");
        checkUpdate();
    },

//Save Form
    Save: function(){
        ret = Form.checkFormValue();
        if(ret) {
            Form.getFormValue();
            Form.setValue();
            Form.closeForm();
            if(Form.exit_cb) Form.exit_cb(true);
        }
    }

};

//扩展功能
var    Extention = {
    include_apostrophe: false,
    popup_style: '',
    disabled_site_match: false,

    NoOperation: function(){},

    initialize: function() {
        Form.getValue();
        Form.addForm();
        this.getValue(true);
        GM_registerMenuCommand( "iWord Config", Extention.Configure);
    },

//Configure
    Configure: function(){
        if(!Form.checkCurrentMode(0, true)) return;
        Form.getValue();
        Form.setFormValue();
        Form.openForm();
    },

    getValue: function(flag) {
        if(flag == false) return;
        Conf.site = Form.site;
        Conf.enabled = Form.enabled;
        Conf.settimeout = Form.settimeout;
        Conf.delay = Form.delay;
        Extention.include_apostrophe = Form.include_apostrophe;
        Extention.popup_style = Form.popup_style;
        if(Extention.include_apostrophe == true) {
            Conf.regex1 = /[a-zA-Z']/;
            Conf.regex2 = /[^a-zA-Z']/;
            Conf.regex3 = /^[a-zA-Z']{3,}$/;
        } else {
            Conf.regex1 = /[a-zA-Z]/;
            Conf.regex2 = /[^a-zA-Z]/;
            Conf.regex3 = /^[a-zA-Z]{3,}$/;
        }
    }

};

function FormatWord(word){
    var fixword = word.toLowerCase();
    return fixword;
}

//字典查询控制
var Quest = {
    originalword: '',
    targetword: '',
    X: 0,
    Y: 0,
    done: [],
    working: false,
    reQuest: function() {
        this.working = true;
        this.done = new Array(0);
        this.Get_Result();
    },
    execute: function(word, x, y) {
        if(this.working == true) return;
        this.working = true;
        this.originalword = word;
        this.targetword = word;
        this.X = x;
        this.Y = y;
        this.done = new Array(0);
        this.Get_Result();
    },
    Check_Event: function(event) {
        if(event.shiftKey && !event.ctrlKey) {
            //Shift键
            Quest.reQuest();
        } else {
            deletePopup();
        }
    },
    Get_Result: function(response) {
        if( typeof response == 'object') {
            var result = SITE[Conf.site].formatResult(response.responseText);
            if(result != ""){
                var work = Quest.targetword;
                result = work + "<br />" + result;
                deletePopup();
                Quest.done.push(Quest.targetword);
                makePopup2(result, Quest.X, Quest.Y);
                return;
            }
        }
        
        var    word=FormatWord(Quest.originalword);
        
        if(word) {
            Quest.targetword = word;
            if(SITE[Conf.site].method.toUpperCase() == "POST") {
                GM_xmlhttpRequest({
                    method: "POST",
                    url: SITE[Conf.site].url(Quest.targetword),
                    headers: SITE[Conf.site].headers,
                    overrideMimeType: "text/html; charset=" + SITE[Conf.site].encode,
                    data: SITE[Conf.site].data(Quest.targetword),
                    onload: Quest.Get_Result
                });
            } else {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: SITE[Conf.site].url(Quest.targetword),
                    overrideMimeType: "text/html; charset=" + SITE[Conf.site].encode,
                    onload: Quest.Get_Result
                });
            }
        } else {
            Quest.working = false;
        }
    }
};

//选定词典处理
function Dictionary_Selected() {
    var selnode = $(Form.dictionary_sites_id);
    var nodes = GetOptionList(Form.dictionary_sites_id);
    Form.site = nodes[selnode.selectedIndex].value;
    if(!SITE[Form.site].site_url) {
        $(Form.visit_id).style.display = 'none';
    } else {
        $(Form.visit_id).style.display = '';
    }
    
    $(Form.dictionary_name_id).textContent = SITE[Form.site].name;
}

//OPTION获取列表标记节点
function GetOptionList(sel) {
    var query = '//select[@id="'+sel+'"]/option';
    return xpath(query);
}

//Visit按钮处理
function Visit_Site() {
    if(SITE[Form.site].site_url != undefined) {
        window.open(SITE[Form.site].site_url);
    }
}

//定制弹出控制文本
function Customize() {
    var    customize_node = $(Form.customize_checkbox_id);
    var    textarea_node = $(Form.textarea_id);

    if(customize_node.checked == true) {
        textarea_node.setAttribute('style',Form.div_style_open);
        Form.adjust_Form_Position();
    } else {
        textarea_node.setAttribute('style',Form.div_style_close);
    }
}

function Set_Default_CSS() {
    $(Form.textarea_id).value = Form.default_popup_style;
}

function xpath(query, doc) {
    var results = document.evaluate(query, doc?doc:document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var nodes = new Array();
    for(var i=0; i<results.snapshotLength; i++){
        nodes.push(results.snapshotItem(i));
    }
    return nodes;
}


function makePopup2(popuphtml, basispositionx, basispositiony){
    var popup = document.createElement("div");
    popup.id = "keefoiworddiv";
    var horizontalspace = 20;
    var verticalspace = 15;
    var margin = 20;

    basispositionx = basispositionx - window.scrollX;
    basispositiony = basispositiony - window.scrollY;
    popup.setAttribute('style', Extention.popup_style);
    with(popup.style) {
        position = "fixed";
        left = basispositionx + horizontalspace + "px";
        top = basispositiony + verticalspace + "px";
    }
    popup.innerHTML = popuphtml;
    popup = document.body.appendChild(popup);
    if(popup.offsetLeft + popup.offsetWidth + margin > window.innerWidth) popup.style.left = basispositionx - popup.offsetWidth - margin + "px";
    if(popup.offsetTop + popup.offsetHeight + margin > window.innerHeight) popup.style.top = basispositiony - popup.offsetHeight - margin + "px";

    if(parseInt(popup.style.top) < margin) {
        popup.style.top = margin + "px";
    }
    if(popup.offsetTop + popup.offsetHeight + margin*2 > window.innerHeight) {
        popup.style.height = (window.innerHeight - margin*2) + "px";
        popup.style.left = (basispositionx - popup.offsetWidth + horizontalspace) + "px";
    }
    if(parseInt(popup.style.left) < margin) {
        popup.style.left = margin + "px";
    }
    window.addEventListener("keydown", Quest.Check_Event, false);
    popup.focus();
    return popup;
}


//伪计时器
var    PseudoTimer = {
    start: [],
    targetword: [],
    pageX: [],
    pageY: [],
    count: 0,

    javascript_enabled: false,
    initialize: function() {
        this.checkSetTimeout();
    },

    checkSetTimeout: function() {
        window.setTimeout(function(){ PseudoTimer.javascript_enabled = true; }, 10);
    },

    setTimer: function(targetword,pageX,pageY) {
        popupTimerID = window.setTimeout(function(){
            Lookup_Dictionary(targetword,pageX,pageY);
        }, Conf.delay);
        
        if(PseudoTimer.javascript_enabled == false) {
            if(Conf.settimeout == true) {
                var now = (new Date()).getTime();
                var tid = popupTimerID.toString();
                PseudoTimer.start[tid] = now;
                PseudoTimer.targetword[tid] = targetword;
                PseudoTimer.pageX[tid] = pageX;
                PseudoTimer.pageY[tid] = pageY;
                PseudoTimer.count++;
            } else {
                Lookup_Dictionary(targetword,pageX,pageY);
            }
        }
    },

    checkTimer: function() {
        if(PseudoTimer.javascript_enabled == true) {
            return;
        }
         if(Conf.settimeout == false) {
            return;
        }
        if(PseudoTimer.count > 0) {
            var now = (new Date()).getTime();
            for(var tid in PseudoTimer.start) {
                if(PseudoTimer.start[tid]+Conf.delay <= now) {
                    Lookup_Dictionary(PseudoTimer.targetword[tid],
                        PseudoTimer.pageX[tid],
                        PseudoTimer.pageY[tid]);
                    PseudoTimer.clearTimeout(tid);
                }
            }
        }
    },

//清除伪计时器
    clearTimeout: function(tid) {
        delete PseudoTimer.start[tid];
        delete PseudoTimer.targetword[tid];
        delete PseudoTimer.pageX[tid];
        delete PseudoTimer.pageY[tid];
        PseudoTimer.count--;
    }
};


//查阅字典呼叫处理
function Lookup_Dictionary(targetword,pageX,pageY) {
    Quest.execute(targetword,pageX,pageY);
}

//检查是否鼠标光标的行动
function isMouseOverPopup(e) {
    var popup = document.getElementById("keefoiworddiv");
    if(!popup) return false;
    var x = popup.offsetLeft;
    var y = popup.offsetTop;
    var pageX = e.pageX - window.scrollX;
    var pageY = e.pageY - window.scrollY;
    if(pageX >= x && pageX <= x+popup.offsetWidth &&
       pageY >= y && pageY <= y+popup.offsetHeight) {
        return true;
    }
    return false;
}


Form.initialize(Extention.getValue);

Extention.initialize();

PseudoTimer.initialize();
Form.checkupdate && checkUpdate();
 
var popupTimerID;
var previousword;
var previousexecdate = new Date;

window.addEventListener("mousemove", function(event){
    if((new Date) - previousexecdate < 50) return;

    PseudoTimer.checkTimer();
    if(isMouseOverPopup(event)) return;
    var targetword = MouseoverWord(event);
    
    if(previousword != targetword){
        deletePopup();
        previousword = targetword;
        if(Extention.disabled_site_match == true &&
           !event.shiftKey && !event.ctrlKey) {
            return;
        }
        
        if(targetword && Conf.regex3.test(targetword)){
            PseudoTimer.setTimer(targetword,event.pageX,event.pageY);
        }
    }
    previousexecdate = new Date;
}, false);

window.addEventListener("click", deletePopup, false);

})();

