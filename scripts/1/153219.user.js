// ==UserScript==
// @name           在线翻译 Online translate 
// @namespace      online translate by liangguohuan
// @author         liangguohuan
// @email          liangguohuan@gmail.com
// @description    在线快速翻译 translate online quickly ....
// @mod_date       2012-01-12
// @version        2.4
// @include        http://*
// @include        https://*
// @require        http://code.jquery.com/jquery-latest.js
// @resource icon  http://translate.google.cn/favicon.ico
// @resource extlink  http://ubuntuone.com/4Z98bz0c6spVD4yLtBRMKN
// @resource load  http://ubuntuone.com/6ztD7bMU7z4dOJKfHs8XtD
// @updateURL http://userscripts.org/scripts/source/119420.meta.js
// ==/UserScript==

/**
* 2012.11.30 update url to http://translate.google.co.jp;mod about:config javascript.options.xml.content = true
* 2012-01-12 bug fix: baiduEle is empty when baidu request first; editor normal, don't apply this ...
* 2012-01-11 new opt: remove single word, add query input when translatedivcontainer on dbclick ...; notice: if query input is exit, translatedivcontainer can not be hide when keypress 'G'; remove copyToClipboard listener ...
* 2012-01-11 new opt: add single word to show when request word is like end with 's', 'es', 'ed' ...
* 2012-01-08 bug fix: keypress 'G' for hiding translatedivcontainer, set default if keyForTransShow when trigger left click
* 2012-01-07 bug fix: set default when trigger mouse right click; selected text can be draged; optimize simpleDraggable plugin
* 2012-01-06 new opt: make it can be used in iframe, like gmail; additional setting keyForTransShow
* 2012-01-04 buf fix: when keypress 'y' will trigger copyToClipboard() even translatedivcontainer is display none in gmail
* 2012-01-03 buf fix: GM_openInTab for word link and some css change, make better for dbclick and three sequence click 
* 2012-01-03 new opt: if is a word, then request word info from baidu
* 2012-01-02 bug fix: fix translate button position right at the first time
* 2012-01-01 new opt: keypress 'y' for paste when translate text is show 
* 2011-12-31 bug fix: fix the setting bug occur from 2011-12-30
* 2011-12-30 bug fix: some website can't be bind for more times on the same event, and it will load twice occur the created elements twice.
* 2011-12-26 bug fix: $(window.parent.document) occur permission sometime,so instead of window.top
* 2011-12-20 bug fix: let the iframe and editor are normal when use then function 'append()'
* 2011-12-01 bug fix: translate button and conten position
*/
/**
* Like gTranslate, ImTranslator, Quick Translator plugs, they are can't work when my firefox update, so i handle it myself ...
* language default: from=>Auto, to=>Chinese, Set the right for myself
* Settings: GreaseMonkey => UserScript Command => 翻译 Settings
* Lanuage translate Swap Quickly: Ctrl + Alt + Shift + Z, require: the from must not be 'Auto'
* The plug-in colorpicker code is from baidumonkey ...
*/

/**
* Jquery ui can't work, so custom a simpleDraggable addition
*/
(function ($) {
	$.fn.simpleDraggable = function(options){
	    var defaults = {
			handle: null,
			notHandle: null,
        };
        var opts = $.extend(defaults, options);
        var self = $(this);
		var x,y,top,left,clix,cliy,pd,fx,fy;
		var bMouseIn = false;
		
		$(this).hover(
		    function() { bMouseIn = true; },
		    function() { bMouseIn = false; }
		);
		
		$(document).bind('mousedown', function(event){
		    if(!event) event = window.event;
		    if(!handleCheck(event)) return ;
		    if(!bMouseIn) return ;
	        pd = true;
            fx = event.clientX;
            fy = event.clientY;
            top = self.offset().top;
            left = self.offset().left;
		});
		
		$(document).bind('mousemove', function(event){
		    if(!event) event = window.event;
            clix = event.clientX;
            cliy = event.clientY;
            if(pd == true){
                self.css({'top':top+(cliy-fy),'left':left+(clix-fx)});
            }
		});
		
		$(document).bind('mouseup', function(){
		    pd = false;
		});
		
		function handleCheck(event) {
		    if (opts.handle) {
		        return _getHandle(event);
		    } else {
		        return _getNotHandle(event);
		    }
		}
		
		function _getHandle(event) {
		    var handle = false;
            if (opts.handle !== null) {
                $.each(self.find(opts.handle), function(){
                    if(event.target == this) {
                        handle = true;
                        return handle;
                    }
                });
            }	    
		    return handle;
	    }
	    
	    function _getNotHandle(event) {
		    var handle = true;
            if (opts.notHandle !== null) {
                $.each(self.find(opts.notHandle), function(){
                    if(event.target == this) {
                        handle = false;
                        return handle;
                    }
                });
            }	    
		    return handle;
	    }
	}
})(jQuery);


/**
*　start
*/
var arrLanDefault = ['Auto', 'Chinese'];
var lanShortStr = 'auto,af,sq,ar,hy,az,eu,be,bn,bg,ca,zh-CN,hr,cs,da,nl,en,et,tl,fi,fr,gl,ka,de,el,gu,ht,iw,hi,hu,is,id,ga,it,ja,kn,ko,la,lv,lt,mk,ms,mt,no,fa,pl,pt,ro,ru,sr,sk,sl,es,sw,sv,ta,te,th,tr,uk,ur,vi,cy,yi';
var lanLongStr = 'Auto,Afrikaans,Albanian,Arabic,Armenian,Azerbaijani,Basque,Belarusian,Bengali,Bulgarian,Catalan,Chinese,Croatian,Czech,Danish,Dutch,English,Estonian,Filipino,Finnish,French,Galician,Georgian,German,Greek,Gujarati,HaitianCreole,Hebrew,Hindi,Hungarian,Icelandic,Indonesian,Irish,Italian,Japanese,Kannada,Korean,Latin,Latvian,Lithuanian,Macedonian,Malay,Maltese,Norwegian,Persian,Polish,Portuguese,Romanian,Russian,Serbian,Slovak,Slovenian,Spanish,Swahili,Swedish,Tamil,Telugu,Thai,Turkish,Ukrainian,Urdu,Vietnamese,Welsh,Yiddish';
var arrLanShort = lanShortStr.split(',');
var arrLanLong = lanLongStr.split(',');
var arrLanMap = [];
$.each(arrLanShort, function(i, val){
    var key = arrLanLong[i];
    arrLanMap[key] = val;
});
/**
* Settings show hidden
*/
var translatesettingskey = 'translatesettings2011';
GM_registerMenuCommand ('翻译 Settings' , translateSettingShow);

function translateSettingShow() {
    settingDataInit();
    $('#translateSettings').css({
        left: ($(document.body).width() - 600)/2 + 'px',
        top: ($(window).scrollTop() - 1000) + 'px',
    });
    $('#translateSettings').show();
    $('#translateSettings').stop();
    $('#translateSettings').animate(
        {
            top: ($(window).scrollTop() + 50) + 'px',
        },
        50
    );

}

function translateSettingHide() {
    $('#translateSettings').stop();
    $('#translateSettings').animate(
        {
            top: '-1000px',
        },
        300
    );
    //$('#translateSettings').hide();
}

/**
* setting recover
*/
function getSettingsByName(name) {
    var translatesettingsval = GM_getValue(translatesettingskey, '');
    var recoverStyle = '';
    var arrLanFromTo = arrLanDefault;
    var keyForTransShow = false;
    var arrTemp = [];
    if (translatesettingsval !== '') {
        arrTemp = translatesettingsval.split('@');
    }
    if (name == 'css') {
        if(arrTemp[0]) {
            recoverStyle = arrTemp[0];
        }
        return recoverStyle;
    } 
    else if (name == 'fromto'){
        if(arrTemp[1]) arrLanFromTo = arrTemp[1].split(':');
        return arrLanFromTo;
    }
    else if (name == 'keyForTransShow') {
        if(arrTemp[2] == 'true') keyForTransShow = true;
        return keyForTransShow;
    }
}

function settingDataInit() {
    recoverStyleTrigger();
    settingFromToInit();
    settingkeyForTransShowInit();
    settingSelCssInit();
}

function recoverStyleTrigger() {
    if (documentCheckEditable()) return ;
    var cssStr = getSettingsByName('css');
    cssStr = cssStr.replace(/;/, ' !important;');
    $('style#recoverStyle').remove();
    var css  = '#translatedivcontainer{ ' + cssStr + ' }';
    css += '.demoshow{ ' + cssStr + ' }';
    $('.demoshow').attr('style', '');
    //GM_addStyle(css);
    var style = document.createElement('style');
        style.type = 'text/css';
        style.id = 'recoverStyle'
        style.innerHTML = css;
    $('head:eq(0)').append(style);
}

function settingFromToTrigger() {
    var arrLanFromTo = getSettingsByName('fromto');
    var list = $('#translateSettings div.fromto').find('input.selcss');
    for(var i=0; i<list.length; i++) {
        $(list[i]).val(arrLanFromTo[i]);
    }
}

function settingFromToInit() {
     settingFromToTrigger();
}

function settingkeyForTransShowInit() {
    var keyForTransShow = getSettingsByName('keyForTransShow');
    document.getElementById('keyForTransShow').checked = keyForTransShow;
}

function settingSelCssInit() {
    var recoverStyle = getSettingsByName('css');
    if (recoverStyle !== '') {
        recoverStyle = recoverStyle.replace(/;$/, '');
        //console.log(recoverStyle);
        var arr = recoverStyle.split(';');
        $.each(arr, function(i, item){
            var arrin = item.split(':');
            var style = arrin[0].replace(/^ +/, '').replace(/ +$/, '');
            var value = arrin[1].replace(/^ +/, '').replace(/ +$/, '').replace(/;+$/, '');
            $.each($('#translateSettings td.styleTitle'), function(ii, itemtd){
                //console.log('sytle:' + style + ',text:' + $(itemtd).text() + ',text-shadow');
                if($(itemtd).text() == style && style == 'text-shadow') {
                    arrinin = value.split(' ');
                    $.each(arrinin, function(iii, itemSd){
                        $(itemtd).next('td:eq(0)').find('input:eq(' + iii + ')').val(itemSd);
                    });
                } else if($(itemtd).text() == style) {
                    $(itemtd).next('td:eq(0)').find('input:eq(0)').val(value);
                }
            });
        });
    }
}

function copyToClipboard(txt) {    
    try {    
        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");    
    } catch (e) {    
        alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");    
    }    
    var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);    
    if (!clip)    
        return;    
   
    var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);   
 
    if (!trans)    
        return;    
    trans.addDataFlavor('text/unicode');    
    var str = new Object();    
    var len = new Object();    
    var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);    
    var copytext = txt;    
    str.data = copytext;    
    trans.setTransferData("text/unicode",str,copytext.length*2);    
    var clipid = Components.interfaces.nsIClipboard;    
    if (!clip)  return false;    
    clip.setData(trans,null,clipid.kGlobalClipboard);    
}  

/**
* save,setting btn listen
*/
function settingElementsListener() {
    $('.selcss').bind('change', function(){
        //console.log($(this).parents('td:eq(0)').prev().eq(0).text());
        var style = $(this).parents('td:eq(0)').prev().eq(0).text();
        var value = $(this).val();
        if (style == 'text-shadow') {
            value = '';
            $.each($(this).parent().find('.selcss'), function(i, item){
                if($(this).val() == '') {
                    value = '#000000 0px 0px 0px';
                    return;
                }
                value += $(this).val() + ' ';
            });
            value = value.replace(/ $/, '');
        }
        //console.log(style + ':' + value);
        $('.demoshow').css(style, value);
    });
    $('#translateSettings .lanSwapBtn:eq(0)').bind('click', function(){
        var val1 = $(this).prevAll('input:eq(0)').val();
        var val2 = $(this).nextAll('input:eq(0)').val();
        if (val1 == 'Auto') return;
        $(this).prevAll('input:eq(0)').val(val2);
        $(this).nextAll('input:eq(0)').val(val1);
        settingsSave();
    });
    $('#settingSave').bind('click', function(){
        settingsSave();
        translateSettingHide();
    });
    $('#settingCancel').bind('click', function(){
        translateSettingHide();
        $('#translateSettings table').find('input.selcss').val('');
    });
    $('#settingDefault').bind('click', function(){
        GM_setValue(translatesettingskey, '');
        $('#translateSettings table:eq(0)').find('input.selcss[value!=""]').val('');
        $.each($('#translateSettings div.fromto').find('input.selcss'), function(i, item){
            $(this).val(arrLanDefault[i]);
        });
        translateSettingHide();
    });
    
    function settingsSave() {
        try{
            /* css handle */
            var str = '';
            var strShadow = '';
            $.each($('#translateSettings table:eq(0)').find('input.selcss[value!=""]'), function(){
                var style = $(this).parents('td:eq(0)').prev().eq(0).text();
                // handle the text-shadow
                if (style == 'text-shadow') {
                    strShadow += $(this).val() + ' ';
                } else {
                    var value = $(this).val();
                    str += style + ':' + value + ';';
                }
            });
            if (strShadow !== '')
                str += 'text-shadow:' + strShadow;

            /* from to handle */
            var strFromTo = '';
            var bSaveFromTo = true;
            $.each($('#translateSettings div.fromto').find('input.selcss'), function(){
                if($(this).val() == '') bSaveFromTo = false;
                strFromTo += $(this).val() + ':';
            });
            strFromTo = strFromTo.replace(/:$/, '');
            if(strFromTo !== '') {
                str += '@' + strFromTo;
            }
            
            /* select text ,then keypress 'G' for translate show */
            str += '@' + document.getElementById('keyForTransShow').checked;
            
            GM_setValue(translatesettingskey, str);
        }catch(e){}
    }
}

/**
* Select Elements Modify
*/
function selectElementsModify() {
    /**
    *　Attrs:
    *   class: selcss, must the value 'selcss'
    *   csstype: the arr cssType'attr, or custom another name not in the arr cssType, but must be with attr data set...
    *   data: when wnat to use custom data, then set like data='1,2,3,4,...'
    *   lineShow: the most line show
    */
    var cssType = {
        fontSize:'10px,11px,12px,13px,14px,15px,16px,17px,18px,19px,20px',
        fontWeight:'normal,bold,bolder,lighter',
        lineHeight:'14px,15px,16px,17px,18px,19px,20px,21px,22px,23px,24px,25px,26px,27px,28px',
        radius:'1px,2px,3px,4px,5px,6px,7px,8px,9px,10px',
        opacity:'0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1',
        border:'1px,2px,3px,4px,5px,6px,7px,8px,9px,10px',
        padding:'1px,2px,3px,4px,5px,6px,7px,8px,9px,10px',
        margin:'0px,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px',
        minWidth:'50px,60px,70px,80px,90px,100px',
        maxWidth:'400px,500px,600px,700px,800px,900px,1000px',
        clear:'left,right,both',
        color:'',
    };
    $.each($('input.selcss'), function(i, item){
        //if it has be inited, then do nothing
        if ($(item).children().size() > 0) {
            return ;
        }
        var type = $(item).attr('csstype');
        if($(item).hasClass('readonly')) {
            $(item).bind('focus', function(){
                $(this).trigger('blur');
            });
        }
        if (type == 'color') {
            var span = $('<span class="online_trans_pref_css_span">▼</span>').bind('click',
                function(){
                    allSelectPopuDivHidden();
                    addColorPicker(this);
                    var colorpicker = $(this).find('div:eq(0)');
                    $(colorpicker).css({
                        position:'absolute',
                        left:$(item).position().left + 'px',
                        top:($(item).position().top + $(item).outerHeight()) + 'px',
                        margin:'0px',
                        display:'block',
                    });
                }
            );
            $(span).insertAfter(item);
        } else {
            var span = $('<span class="online_trans_pref_css_span">▼</span>').bind('click',
                function(){
                    if ($(select).css('display') !== 'none') {
                        $(this).next('div.selectcss:eq(0)').hide();
                    } else {
                        allSelectPopuDivHidden();
                        if($(item).val() !== '') {
                            //$(select).removeClass();
                            $.each($(select).find('span'), function(i, option){
                                if ($(option).text() == $(item).val()) {
                                    $(option).addClass('selected');
                                }
                            });
                        }

                        var minHeight = parseInt($(this).next('div.selectcss:eq(0)').css('min-height'));
                        var maxHeight = minHeight*10;
                        if ($(item).attr('lineShow') !== '' && $(item).attr('lineShow') !== undefined) {
                            maxHeight = minHeight * $(item).attr('lineShow');
                        }
                        $(this).next('div.selectcss:eq(0)').css('max-height', maxHeight + 'px');
                        //console.log(maxHeight);
                        $(this).next('div.selectcss:eq(0)').css({
                            left:$(item).position().left + 'px',
                            top:($(item).position().top + $(item).outerHeight()) + 'px',
                            width:($(item).outerWidth() + $(this).outerWidth()) + 'px',
                            display:'block',
                        });
                    }
                }
            );

            var select = $('<div class="selectcss"></div>');
            $(span).insertAfter(item);
            $(select).insertAfter(span);

            try{
                var dataStr = '';

                if ($(item).attr('data') == '' || $(item).attr('data') == undefined) {
                    eval('dataStr = cssType.' + type);
                } else {
                    dataStr = $(item).attr('data');
                }
                var arrData = dataStr.split(',');
            } catch(e) {
                var arrData = ['error'];
            }

            $.each(arrData, function(i, val) {
                var option = $('<span>' + val + '</span>').bind('click', function(){
                    try{
                        $(item).val($(this).text());
                        $(select).find('span').removeClass();
                        $(this).addClass('selected');
                        $(select).hide();
                        //notice the input has change
                        $(item).change();
                    } catch(e){}
                });
                $(option).hover(
                    function(){
                        if ($(this).hasClass('selected')) return false;
                        $(this).removeClass('out');
                        $(this).addClass('over');
                    },
                    function(){
                        if ($(this).hasClass('selected')) return false;
                        $(this).removeClass('over');
                        $(this).addClass('out');
                    }
                );
                $(select).append(option);
            });
       }
    });
    
    function allSelectPopuDivHidden() {
        try{
            $('.selectcss,#colorpicker').hide();
        }catch(e){}
    }

}


function getColor(ev){
    var x = ev.layerX - 10, y= ev.layerY - 10;
    var Rmx = 0, Gmx = 0, Bmx = 0;
    if (y <= 32) {
        Rmx = 255;
        Gmx = (y / 32) * 255;
        Bmx = 0;
    }
    else
        if (y <= 64) {
            y = y - 32;
            Rmx = 255 - (y / 32) * 255;
            Gmx = 255;
            Bmx = 0;
        }
        else
            if (y <= 96) {
                y = y - 64;
                Rmx = 0;
                Gmx = 255;
                Bmx = (y / 32) * 255;
            }
            else
                if (y <= 128) {
                    y = y - 96;
                    Rmx = 0;
                    Gmx = 255 - (y / 32) * 255;
                    Bmx = 255;
                }
                else
                    if (y <= 160) {
                        y = y - 128;
                        Rmx = (y / 32) * 255;
                        Gmx = 0;
                        Bmx = 255;
                    }
                    else {
                        y = y - 160;
                        Rmx = 255;
                        Gmx = 0;
                        Bmx = 255 - (y / 32) * 255;
                    };
    var r, g, b;
    if (x <= 50) {
        r = Math.abs(Math.floor(Rmx * x / 50));
        g = Math.abs(Math.floor(Gmx * x / 50));
        b = Math.abs(Math.floor(Bmx * x / 50));
    }
    else {
        x -= 50;
        r = Math.abs(Math.floor(Rmx + (x / 50) * (255 - Rmx)));
        g = Math.abs(Math.floor(Gmx + (x / 50) * (255 - Gmx)));
        b = Math.abs(Math.floor(Bmx + (x / 50) * (255 - Bmx)));
    };
    r = r>255?255:r;
    g = g>255?255:g;
    b = b>255?255:b;
    var c = "#";
    c += Math.floor(r / 16).toString(16);
    c += (r % 16).toString(16);
    c += Math.floor(g / 16).toString(16);
    c += (g % 16).toString(16);
    c += Math.floor(b / 16).toString(16);
    c += (b % 16).toString(16);
    return c.toUpperCase();
};

function addColorPicker(target){
    var cp = document.getElementById("colorpicker");
    if (cp) {
        cp.parentNode.removeChild(cp);
	    return;
    }
    cp = document.createElement("div");
    cp.id = "colorpicker";
    cp.style.display = 'none';
    cp.style.zIndex = 10001;
    var input;
    input = target.previousSibling;
    var pre = document.createElement("span");
    var img = document.createElement("img");
    with (img) {
        src = "data:image/png;base64,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";
        addEventListener("mousemove", function(ev){
            var c = getColor(ev);
            pre.style.width = '24px';
            pre.style.height = '24px';
            pre.style.display = 'inline-block';
            pre.style.background = c;
        }, false);
        addEventListener("click", function(ev){
            try{
                var c = getColor(ev);
                input.value = c;
                img.blur();
                //notice the input has change
                $(input).change();
            }catch(e){}
        }, false);
        addEventListener("mouseout", function(ev){
            cp.parentNode.removeChild(cp);
        }, false);
    }
    cp.appendChild(img);
    cp.appendChild(pre);
    target.appendChild(cp);
    return false;
};

function createElement() {
    var css = <><![CDATA[
        .defaultStyle {
            font-size:14px;
            line-height:18px;
            -moz-border-radius: 5px;
            opacity:1;
            border:1px solid #888;
            padding:4px;
            min-width:50px;
            max-width:800px;
            color:#000;
            background-color:#FBEBC1;
            text-align:left;
        }
        .translatedivbutton {
            z-index:10000 !important;
            position:absolute !important;
            font-size:12px !important;
            color:#000 !important;
            opacity:1;
            /*padding:3px 5px;
            background:#ccc;
            -moz-border-radius: 50px;*/
            display:none;
        }
        #translatedivcontainer {
            position:absolute !important;
	        z-index:10000 !important;
	        -moz-user-select: none !important;
            display:none;
        }
        #translatedivcontainer p {
            margin:0px !important; padding:0px !important;
        }
        .translatedivbutton img {
            border:1px #ccc solid;
            padding:3px;
            -moz-border-radius: 5px;
        }
        #dict-content-head { 
            padding-bottom:5px !important;
            margin:0px !important;
        }
        #dict-content-head .dict-word {
            font-size: 20px !important;
        }
        #dict-content-head .dict-pron {
            color: green !important;
            font-family: "Lucida Sans Unicode" !important;
            padding-left: 8px !important;
        }
        #dict-content-head .dict-type {
            color: #000000 !important;
            font-family: arial,"宋体" !important;
        }
        #dict-content-main {
            line-height:22px !important;
        }
        #dict-content-main h3 {
            font-size:18px !important;
            font-weight:normal !important;
            color:#666666 !important;
            padding:10px 0px !important;
            margin:0px !important;
            background:none;
            border:0px;
        }
        #dict-content-main a { 
            float:right !important; 
            margin-top:5px !important; 
            color:#0000CC;
        }
        /**********************************************************************************************/
        /********************************* settings ***************************************************/
        /**********************************************************************************************/
        #translateSettings {
            position:absolute !important;
            -moz-user-select: none !important;
            text-align:left !important;
            top:100px;
            left:100px;
            width:620px !important;
            padding:5px 10px !important;
            border:1px #979797 solid !important;
            -moz-border-radius: 5px !important;
            font-size:18px !important;
            z-index:10000 !important;
            background:#fff !important;
            color:#000;
            display:none;
        }
        #translateSettings fieldset {
            padding:5px !important;
            margin:5px 0px !important;
            border:1px #999 solid !important;
            -moz-border-radius-topleft: 5px !important;
            -moz-border-radius-topright: 5px !important;
        }
        #translateSettings h3 {
            color:#fff !important;
            padding:0px !important;
            margin:5px 0px !important;
            padding:5px 0px !important;
            text-align:center !important;
            background:#000 !important;
            /*-moz-border-radius: 5px!important;*/
            -moz-border-radius-topleft: 5px !important;
            -moz-border-radius-topright: 5px !important;
        }
        #translateSettings span.lanSwapBtn {
            padding:0px 8px !important;
            cursor:pointer !important;
        }
        #translateSettings table {
            margin:0px !important;
        }
        #translateSettings table td{
            padding:5px !important; 
            font-size:14px !important;
        }
        #demoshowContainer {
            /*margin-top:15px !important;*/
        }
        .demoshow {
            margin:10px 0px 10px 130px !important;
            width:auto !important;
            float:left !important;
        }
        #translateSettingsSaveDiv {
            padding:10px 0px !important;
            border:0px #000 solid !important;
            marginTop:20px !important;
        }
        #translateSettingsSaveDiv input {
            font-size:14px !important;
            line-height:22px !important;
            padding:3px 5px !important;
        }
        /**********************************************************************************************/
        /********************************* select css *************************************************/
        /**********************************************************************************************/
        .selcss { 
            -moz-box-sizing:border-box !important;
            padding:0px !important; 
            font-size:12px !important; 
            line-height:22px !important; 
            height:22px !important; 
        }
        .selectcss { 
            position:absolute !important; 
            z-index:10000 !important; 
            background:#fff !important;
            border:1px #000 solid !important; 
            min-height:18px !important; 
            overflow:auto !important; 
            display:none; 
        }
        .selectcss span{ 
            display:block !important; 
            font-size:12px !important; 
            line-height:18px !important; 
            text-indent: 5px !important; 
        }
        .selectcss span.selected{ 
            background:#8888FF !important; 
            color:#fff !important; 
        }
        .selectcss span.over{ 
            background:#3333FF !important; 
            color:#fff !important; 
        }
        .selectcss span.out{ 
            background:#fff !important; 
            color:#000 !important; 
        }
        .online_trans_pref_css_span {
            background-color: #FFFFFF !important;
            border: 1px solid #999999 !important;
            border-radius: 0 5px 5px 0 !important;
            color: #000000 !important;
            display: inline-block !important;
            font-size: 12px !important;
            line-height:12px !important;
            margin-right: 0.5em !important;
            padding: 1px !important;
            cursor:pointer !important;
        }
        #colorpicker img { float:left !important; }
    ]]></>;

    var settingsDiv = <><![CDATA[
    <div id="translateSettings" style="display:none">
    <h3>翻译设置 Settings</h3>
    <fieldset>
     <legend>Language Select</legend>
     <div class="fromto" style="font-size:14px;">
        from:&nbsp;&nbsp;<input type="text" value="English" class="selcss" csstype="custom" data='Auto,Afrikaans,Albanian,Arabic,Armenian,Azerbaijani,Basque,Belarusian,Bengali,Bulgarian,Catalan,Chinese,Croatian,Czech,Danish,Dutch,English,Estonian,Filipino,Finnish,French,Galician,Georgian,German,Greek,Gujarati,HaitianCreole,Hebrew,Hindi,Hungarian,Icelandic,Indonesian,Irish,Italian,Japanese,Kannada,Korean,Latin,Latvian,Lithuanian,Macedonian,Malay,Maltese,Norwegian,Persian,Polish,Portuguese,Romanian,Russian,Serbian,Slovak,Slovenian,Spanish,Swahili,Swedish,Tamil,Telugu,Thai,Turkish,Ukrainian,Urdu,Vietnamese,Welsh,Yiddish' size="12" lineShow="20" />
          <span class="lanSwapBtn" title="互换(swap)"><=></span>
          to:&nbsp;&nbsp;<input type="text" value="Chinese" class="selcss" csstype="custom" data='Afrikaans,Albanian,Arabic,Armenian,Azerbaijani,Basque,Belarusian,Bengali,Bulgarian,Catalan,Chinese,Croatian,Czech,Danish,Dutch,English,Estonian,Filipino,Finnish,French,Galician,Georgian,German,Greek,Gujarati,HaitianCreole,Hebrew,Hindi,Hungarian,Icelandic,Indonesian,Irish,Italian,Japanese,Kannada,Korean,Latin,Latvian,Lithuanian,Macedonian,Malay,Maltese,Norwegian,Persian,Polish,Portuguese,Romanian,Russian,Serbian,Slovak,Slovenian,Spanish,Swahili,Swedish,Tamil,Telugu,Thai,Turkish,Ukrainian,Urdu,Vietnamese,Welsh,Yiddish' size="12" lineShow="20" />
     </div>
    </fieldset>
    <fieldset>
     <legend>CSS 样式</legend>
     <table border="0" cellspacing="0" cellpadding="0">
         <tr>
            <td class="styleTitle">font-size</td>
            <td><input type="text" class="selcss" csstype="fontSize" size="8" /></td>
            <td class="styleTitle">line-height</td>
            <td><input type="text" class="selcss" csstype="lineHeight" size="8" /></td>
         </tr>
         <tr>
            <td class="styleTitle">-moz-border-radius</td>
            <td><input type="text" class="selcss" csstype="radius" size="8" /></td>
            <td class="styleTitle">opacity</td>
            <td><input type="text" class="selcss" csstype="opacity" size="8" /></td>
         </tr>
         <tr>
            <td class="styleTitle">border-width</td>
            <td><input type="text" class="selcss" csstype="border" size="8" /></td>
            <td class="styleTitle">border-color</td>
            <td><input type="text" class="selcss" csstype="color" size="8" /></td>
         </tr>
         <tr>
            <td class="styleTitle">min-width</td>
            <td><input type="text" class="selcss" csstype="minWidth" size="8" /></td>
            <td class="styleTitle">max-width</td>
            <td><input type="text" class="selcss" csstype="maxWidth" size="8" /></td>
         </tr>
         <tr>
            <td class="styleTitle">color</td>
            <td><input type="text" class="selcss" csstype="color" size="8" /></td>
            <td class="styleTitle">background-color</td>
            <td><input type="text" class="selcss" csstype="color" size="8" /></td>
         </tr>
         <tr>
            <td class="styleTitle">padding</td>
            <td><input type="text" class="selcss" csstype="padding" size="8" /></td>
            <td>font-weight</td>
            <td><input type="text" class="selcss" csstype="fontWeight" size="8" /></td>
         </tr>
         <tr>
            <td class="styleTitle">text-shadow</td>
            <td colSpan="3">
                <input type="text" class="selcss" csstype="color" size="8" /><input type="text" class="selcss" csstype="margin" size="8" /><input type="text" class="selcss" csstype="margin" size="8" /><input type="text" class="selcss" csstype="margin" size="8" />
            </td>
         </tr>
     </table>
     <div style="clear:both"></div>
     <div id="demoshowContainer">
         <div class="demoshow defaultStyle">我们都是这样走过来的,find what you love to do!</div>
     </div>
    </fieldset>
    <fieldset>
     <legend>Additional setting</legend>
     <div class="addition" style="font-size:14px;">
        选择文本后，按下'G'键才触发翻译：<input id="keyForTransShow" type="checkbox" value="" />
     </div>
    </fieldset>
    <div style="clear:both"></div>
    <div id="translateSettingsSaveDiv" align="center">
        <input type="button" id="settingSave" value="save" />
        <input type="button" id="settingCancel" value="cancel" />
        <input type="button" id="settingDefault" value="default" />
    </div>
</div>
    ]]></>;
    
    GM_addStyle(css.toString());
    $(document.body).append(settingsDiv.toString());
    $(document.body).append('<div class="translatedivbutton"><img src="' + GM_getResourceURL('icon') + '" /></div>');
    $(document.body).append('<div id="translatedivcontainer" class="defaultStyle"></div>');
    $('#translatedivcontainer').simpleDraggable();
    $('#translateSettings').simpleDraggable({notHandle:'.selectcss,input,#colorpicker'});
}

function elementBindEvent() {
    $('#translatedivcontainer').hover(
        function(){
            bContainerShow = true;
        },
        function(){
            bContainerShow = false;
        }
    );
    
    $('#translatedivcontainer').bind('dblclick', function(){
        if ($(this).find('input.q').size() == 0) {
            var input = '<input class="q" type="text" style="display:block; width:150px; margin:3px 0; background:transparent; border:0px; border-bottom:1px #ccc dashed" />';
            $(this).prepend(input);
            var text = $.trim(getSelectedText());
            if (/^[a-zA-Z]+$/.test(text) == false) text = ''; // filter long text
            $('#translatedivcontainer').find('input.q').trigger('focus').val(text);
        }
    });
}

function getTranslateText() {
    bMouseupAttact = false;
    var arrLanFromTo = getSettingsByName('fromto');
    var text = arguments.length > 0 ? arguments[0] : getSelectedText();
    if (text == '') {
        translatedivbuttonhide();
        return;
    }
    getVoiceFromBaidu(arrLanFromTo, text);
    text = encodeURIComponent(text);
    var len = text.length;
    var method = len > 1500 ? 'POST' : 'GET';
    var url = 'http://translate.google.co.jp/translate_a/t';
    var data = 'client=t&text=' + text + '&hl=en&sl=' + arrLanMap[arrLanFromTo[0]] + '&tl=' + arrLanMap[arrLanFromTo[1]];
    if (method == 'GET'){
        url += '?' + data;
        data = null;
    } 
    var option = {
        method: method,
        url: url,
        data:data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        onload: function(data){
	        eval('var arr=' + data.responseText);
	        var str = '';
	        $.each(arr[0], function(i, item){
	            str += item[0];
	        });
	        str = str.replace(/\n/g, '<br />');
	        str = str.replace(/<br \/>$/, '');
	        $('#translatedivcontainer').html(str);
	        translatedivbuttonhide();
	        if (getSelectedText() !== '') translatedivcontainershow(); // if is input query trigger
	        addVoiceToTranslateDiv();
        },
        onerror: function(response) {
            console.log(response.responseText);
        }
    }
    GM_xmlhttpRequest(option);
}

// 为了让请求同步进行，额外添加函数addVoiceToTranslateDiv()做特别处理，翻译完成和百度请求完成都触发一次addVoiceToTranslateDiv()
function getVoiceFromBaidu(arrLanFromTo, text) {
    text = $.trim(text);
    if (/^[a-zA-Z]+$/.test(text) && arrLanMap[arrLanFromTo[0]] == 'en' && arrLanMap[arrLanFromTo[1]] == 'zh-CN') {
        var option = {
            method: 'GET',
            url: 'http://fanyi.baidu.com/transcontent?ie=utf-8&source=txt&query=' + encodeURIComponent(text) + '&from=en&to=zh',
            onload: function(data){
                ele = $.parseJSON(data.responseText).result;
                //if (ele == null) addSingleWords(text);
                $(window).data('baiduEle', ele);
	            addVoiceToTranslateDiv();
            },
            onerror: function(response) {
                console.log(response.responseText);
            }
        }
        GM_xmlhttpRequest(option);
    }
}

function addSingleWords(text) {
    if ($('#translatedivcontainer').find('.singleWord').size() == 0) {
        var arrCharEnd  = ['s', 'es', 'ed', 'ing'];
        $.each(arrCharEnd, function(i, item) {
            var reg = new RegExp(item + '$', 'i');
            if (reg.test(text)) {
                var textNew = text.replace(reg, '');
                var ele = $('<span class="singleWord" style="padding-top:3px; 0px; display:block; cursor:pointer; text-decoration:underline">' + textNew + '</span>').bind('click', {text:textNew}, function(event){
                    $(this).append('<img style="margin-left:5px;" src="' + GM_getResourceURL('load') + '" />');
                    translatedivcontainerhide();
                    getTranslateText(event.data.text);
                });
                $('#translatedivcontainer').append(ele);
            }
        });
    }
}

function addVoiceToTranslateDiv() {
    var ele = $(window).data('baiduEle');
    if (ele == null) return ;
    if ($('#translatedivcontainer').css('display') !== 'none' && $('#translatedivcontainer').find('#dict-content-head').size() == 0) {
        var voice = $(ele).find('#dict-content-head');
        if (voice.size() > 0) {
            var detail = $(ele).find('#dict-content-main');
            $('#translatedivcontainer').prepend(voice);
            //添加详细解释
            /*var spanInfo = $('<span style="padding:0px 5px; cursor:pointer"><img src="' + GM_getResourceURL('extlink') + '" border="0" /></span>').toggle(
                function(){
                    $('#dict-content-main').show();
                },
                function(){
                    $('#dict-content-main').hide();
                }
            );
            $('#translatedivcontainer').append(spanInfo);*/
            $('#translatedivcontainer').append(detail);
            $('#dict-content-main').find('h4').remove(); //删除重复显示的单词
            //由于只是监听 click 事件，iframe下点击不会返回 false，所以做个间接替换
            $.each($('#dict-content-main').find('a'), function(){
                $(this).attr('link', $(this).attr('href'));
                $(this).attr('href', 'javascript:void(0);');
                $(this).attr('target', '_self');
                $(this).attr('style', 'margin-left:5px;');
                $(this).bind('click', function(){
                    GM_openInTab($(this).attr('link'));
                    return false;
                });
            });
            if (getSelectedText() !== '') translatedivcontainershow(); //由于显示层插入新内容，所以重置一次位置 // if is input query trigger
        }
        $(window).data('baiduEle', '');  //清空预存变量
    }
}

function translatedivcontainershow() {
    //iframe and top document style recover
    recoverStyleTrigger();
    
    $('#translatedivcontainer').show();
    var wc = $('#translatedivcontainer').outerWidth() < 800 ? 'auto' : 800 + 'px';
    var lc = eex < esx ? eex : esx;
    var tc = eey > esy ? eey : esy;
    var ah = selTextHeight > 14 ? selTextHeight : 14;
    if (tc + $('#translatedivcontainer').outerHeight() > $(window).scrollTop() + $(window).height() ) {
        tc -= (tc + $('#translatedivcontainer').outerHeight() - $(window).scrollTop() - $(window).height() + ah + 10 );
    } else {
        tc += ah;
    }
    
    $('#translatedivcontainer').css({
        left: lc + 'px',
        top: tc + 'px',
        width: wc,
    });
    bMouseupAttact = false;
}

function translatedivcontainerhide() {
    if (bContainerShow)  return ;
    $('#translatedivcontainer').hide();
    $('#translatedivcontainer').css({width:'auto'});
    bMouseupAttact = true;
}

function translatedivbuttonshow() {
    $('.translatedivbutton').html('<img src="' + GM_getResourceURL('icon') + '" />');
    $('.translatedivbutton').show();
    var oH = $('.translatedivbutton').outerHeight();
    //console.log(oH);
    oH = oH < 24 ? 24 : oH;
    var lb = eex;
    var tb = eey - oH - 12;
    if (tb < $(window).scrollTop()) {
        tb = eey + oH;
    }
    $('.translatedivbutton').css({
        left: lb + 'px',
        top: tb + 'px',
    });
    bButtonShow = false;
}

function translatedivbuttonhide() {
    $('.translatedivbutton').css({opacity:1});
    $('.translatedivbutton').hide();
    bButtonShow = true;
}

function clearTimerButton() {
    clearTimeout(timerButton);
    timerButton = null;
}

/**
* main code
*/
var bMouseupAttact = true; // let the translate div can be selected and don't trigger listener of the document mouseup event
var esx = ''; // record the event x when start select text
var esy = ''; // record the event y when start select text
var eex = ''; // record the event x when end select text
var eey = ''; // record the event y when end select text
var selTextHeight = '';  // the document select text
var bContainerShow = false; // make sure the translate div is showing ...
var bButtonShow = true; // make sure the translate button is showing ...
var timerButton = null; // translatedivbutton animate timer record
var selTextMouseDown = '';  // record window.getSelection() when mousedown
var selTextMouseUp = '';    // record window.getSelection() when mouseup

cellectionInit();

function cellectionInit() {
    if($('.translatedivbutton').size() < 1 && !documentCheckEditable()) {
        createElement();
        elementBindEvent();
        settingDataInit();
        selectElementsModify();
        settingElementsListener();
    }
}

function documentCheckEditable() {
    return (document.designMode == 'on' || document.body.contentEditable == 'true') ? true : false;
}

function getSelectedText() {
    return window.getSelection().toString();
}

function emptySelectedText() {
    if (!bContainerShow && !getSettingsByName('keyForTransShow')) {
        document.getSelection().removeAllRanges();
    }
}

$(document).bind('mousedown', function(event){
    if (event.button == 2) return ;
    selTextMouseDown = getSelectedText();
    
    if (bMouseupAttact) {
    esx = event.clientX + $(window).scrollLeft();
    esy = event.clientY + $(window).scrollTop();
    }
    
    //emptySelectedText();
    translatedivbuttonhide();
    translatedivcontainerhide();
});

$(document).bind('mouseup', function(event){
    selTextMouseUp = getSelectedText();
    if (selTextMouseDown == selTextMouseUp) return ;  //
    
    if (bMouseupAttact) {
    eex = event.clientX + $(window).scrollLeft();
    eey = event.clientY + $(window).scrollTop();
    }
    selTextHeight = parseInt($(event.target).css('line-height'));
    cellectionInit();  // 
    if (getSettingsByName('keyForTransShow')) return ;
    mouseupTrigger();
});

function mouseupTrigger() {
    clearTimerButton();
        
    if (!bMouseupAttact) return false;    
    
    if (getSelectedText() !== '') {
        $('.translatedivbutton').css({
            width:'auto',
        });
        $('#translatedivcontainerhide').css({
            display:'none',
        });
        translatedivbuttonshow();
        $('.translatedivbutton').stop();
        $('.translatedivbutton').animate( {opacity:1}, 800);
        timerButton = setTimeout(translatedivbuttonhide, 1800);
        $('.translatedivbutton').hover(
            function(){
                clearTimeout(timerButton); timerButton = null;
                $('.translatedivbutton').stop();
                $('.translatedivbutton').css('opacity', 1);
                $('.translatedivbutton img').attr('src', GM_getResourceURL('load'));
                if (bMouseupAttact)
                    getTranslateText();
            },
            function(){
                if (!bMouseupAttact) return;
                clearTimerButton();
                $('.translatedivbutton').stop();
                timerButton = setTimeout(translatedivbuttonhide, 800);
            }
        );
    }
}

/**
* keyboard listen
* Ctrl + Alt + Shift + Z
*/
$(document).bind('keypress', function(e)
{
    if (e.ctrlKey && e.altKey && e.shiftKey && (e.which == 90 || e.which == 122)) {
        $('#translateSettings .lanSwapBtn:eq(0)').trigger('click');
    }
    // y key occur copy event
    else if ((e.which == 89 || e.which == 121) && $('#translatedivcontainer').size() > 0 && $('#translatedivcontainer').css('display') !== 'none') {
        //copyToClipboard($('#translatedivcontainer').text());
    }
    // esc key press
    else if (e.keyCode == 27) {
        $('#translatedivcontainer').trigger('mouseout');
        $(document).trigger('mousedown');
    }
    // g key press
    else if ((e.which == 71 || e.which == 103) && $('#translatedivcontainer').css('display') !== 'none' && $('#translatedivcontainer').find('input.q').size() == 0) {
        $('#translatedivcontainer').trigger('mouseout');
        $(document).trigger('mousedown');
    }
    // g key press
    else if ((e.which == 71 || e.which == 103) && getSelectedText() !== '') {
        mouseupTrigger();
        $('.translatedivbutton').trigger('mouseover');
    }
    // enter key press
    else if (e.which == 13 && $('#translatedivcontainer').css('display') !== 'none' && $('#translatedivcontainer').find('input.q').size() > 0) {
        $('#translatedivcontainer').css('width', 'auto');
        var text = $('#translatedivcontainer').find('input.q').val();
        getTranslateText(text);
    }
});
