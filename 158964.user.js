// ==UserScript==
// @name           Beta
// @namespace      www.baidu.com
// @version        1.0.0
// @description    个人自用
// @grant          GM_registerMenuCommand
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @run-at         document-end
// @include        *
// @match          *://*/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js
// @resource   logo    http://www.baidu.com/img/shouye_b5486898c692066bd2cbaeda86d74448.gif
// ==/UserScript==

//(function() {
alert('sds')
//-------------jQuary载入提示-----------------------
function jQueryLoadTip() {
    $('<div>jQuery is running!</div>').css({
        fontSize : '12px',
        textAlign : 'center',
        fontFamily : 'monaco',
        padding : '3px',
        background : 'rgb(210,230,200)',
        position : 'absolute',
        top : '0px',
        left : '0px',
        right : '0px',
        width : '100%',
        opacity : '0.0',
        zIndex : '100',
    }).prependTo('body').animate({
        opacity : 0.9
    }, 3000).fadeOut(2000, function() {
        $(this).remove();
    });
}

//----------------字体缩放--------------------
function fontResize(level) {
    try {
        var selector = '#content,#main,.post';
        $(selector).children('*').css('font-size', function(index, value) {
            console.log((parseInt(value) + level) + 'px');
            return (parseInt(value) + level) + 'px';
        });
        //console.log("%o", tem);

    } catch(e) {
        alert('error')
    }

}

//-----------------设置界面-------------------
function setUI() {
    //------引入jquery-ui.css------
    //$('head').append('<link rel="stylesheet" type="text/css" href="http://code.jquery.com/ui/1.10.0/themes/base/jquery-ui.css" />')
    //$('<link rel="stylesheet" type="text/css" href="https://github.com/gravityonmars/Selene/blob/master/css/ui-selene/jquery-ui-1.8.17.custom.css" />').prependTo('head');

    //-------add div----------
    $('head').append('');
    //add style
    //$('<div id="setUI_dlg" title="设置" class="setUI"></div>').prependTo('body');
    $('#setUI_dlg').dialog({
        resizable : false
    }, {
        modal : true
    }, {
        position : {
            my : "center bottom-20%",
        }
    }, {
        show : 2000
    }, {
        close : function(event, ui) {
            $('#setUI_dlg').remove();
        }
    });

    $('#setUI_save').button().click(function(event) {
        //event.preventDefault();
        saveConf();
    });
    $('#setUI_show').button().click(function(event) {
        alert(GM_getValue("temm"));
    });
}

//-----------------保存设置-------------------
function saveConf() {

    GM_setValue("temm", $('#setUI_text').val());
}

//-----------------调用主体-------------------
$(document).ready(function() {
    jQueryLoadTip();
    setUI();
    //fontResize(1);
    alert('sdasd')
    try {
        //GM_getResourceURL()
    } catch() {
    }
});

//})();
