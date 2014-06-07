// ==UserScript==
// @name           TW - Notepad   GuardBabel
// @namespace      *
// @description    يقوم باضافة دفتر ملاحظات 
// @author         
// @include        http://*.tribalwars.ae*
// ==/UserScript==

// Modifikationen und Weiterverbreitung dieses Scripts benötigen die
// Zustimmung des Autors.
// -----------------------------------------------------------------------------

var localStore = false;

if(unsafeWindow.localStorage != null)
{
    localStore = true;
}

///////////////////////////////////////////////////////////////
// WENN SIE AUF JEDEN FALL COOKIES BENUTZEN WOLLEN, ENTFERNEN SIE DIE BEIDEN // VOR DER NÄCHSTEN ZEILE
//localStorage = false;
///////////////////////////////////////////////////////////////

(function()
{
    var data = '';
    
    if(localStore)
    { //Wenn localStorage unterstützt wird, es benutzen...
        data = unescape(unsafeWindow.localStorage.note_data);
    }
    else
    { //Sonst Cookies verwenden...
        data = GM_getValue('note_data','اكتب ملاحظاتك هنا  www.tw4me.com');
    }
    
    if(!data)
        data = 'اكتب ملاحظاتك هنا  www.tw4me.com';

    //Container für die Notizen erstellen
    var $ = unsafeWindow.$;
    
    var notiz = $('<div id="notiz"><br /></div>')
        .css({
            display:"none",
            position:"absolute",
            background:"url(graphic/background/content.jpg)",
            width:"500px",
            height:"400px",
            zIndex:"99",
            textAlign:"center",
            borderCollapse:"collapse",
            borderStyle:"solid",
            borderColor:"#994C00 #603000 #552A00 #804000",
            borderWidth:"2px"
        }).mouseover(function(){
            $(this).show();
        }).mouseout(function(){
            $(this).hide();
        }).append(
            $('<textarea id="note_text"></textarea>')
                .css({
                    width:"90%",
                    height:"88%",
                }).append(data)
        ).append(
            $('<input type="button" value="حفظ" id="save_note" />')
                .click(function(){
                    if(localStore)
                    { //Wenn localStorage unterstützt wird...
                        unsafeWindow.localStorage.note_data = escape($('#note_text').val());
                    }
                    else
                    { //Wenn nicht...
                        //Cookie setzen...
                        GM_setValue('note_data',$('#note_text').val());
                    }
                })
        ).appendTo($('body'));
        
    var menuTr = $('<td></td>').append(
        $('<a href="javascript:void(www.tw4me.com)">دفتر الملاحظات</a>')
            .mouseover(function(){
                notiz.show();
            })
            .mouseout(function(){
                notiz.hide();
            })
    ).appendTo($('#menu_row'));
    
    try{
    notiz.css({
        top:menuTr.offset().top+menuTr.height(),
        left:menuTr.offset().left-400
    });
    }catch(e){}
})();