// ==UserScript==
// @name       Facebook Delete All Messages
// @namespace  Facebook Delete All Messages
// @version    1.0
// @description  Adds a page action in Facebook Messages tab in order to delete them all
// @author  	Saman
// @match      http://*/*
// @copyright  Copyright (C) 2013  Saman
// ==/UserScript==

function getLocalizedText(lang) {
    if(lang.indexOf('English') > -1) {
        return 'Delete Conversation'
    } else if(lang.indexOf('Español') > -1) {
        return 'Eliminar conversación'
    } else if(lang.indexOf('Deutsch') > -1) {
        return 'Unterhaltung löschen'
    } else if(lang.indexOf('Français') > -1) {
        return 'Supprimer la conversation'
    } else if(lang.indexOf('Italiano') > -1) {
        return 'Elimina conversazione'
    } else if(lang.indexOf('Brasil') > -1) {
        return 'Excluir conversa'
    } else if(lang.indexOf('Portugal') > -1) {
        return 'Eliminar conversa'
    } else if(lang.indexOf('Türkçe') > -1) {
        return 'Konuşmayı Sil'
    } else if(lang.indexOf('Ελληνικά') > -1) {
        return 'Διαγραφή συζήτησης'
    } else if(lang.indexOf('Afrikaans') > -1) {
        return 'Skrap Gesprek'
    } else if(lang.indexOf('Azərbaycan') > -1) {
        return 'dili Söhbəti Sil'
    } else if(lang.indexOf('Indonesia') > -1) {
        return 'Hapus Percakapan'
    } else if(lang.indexOf('Melayu') > -1) {
        return 'Padam Perbualan'
    } else if(lang.indexOf('Català') > -1) {
        return 'Esborra la conversa'
    } else if(lang.indexOf('Čeština') > -1) {
        return 'Odstranit konverzaci'
    } else if(lang.indexOf('Cymraeg') > -1) {
        return 'Dileu\'r Sgwrs'
    } else if(lang.indexOf('Dansk') > -1) {
        return 'Slet samtale'
    } else if(lang.indexOf('Esperanto') > -1) {
        return 'Forigi konversacion'
    } else if(lang.indexOf('Filipino') > -1) {
        return 'Tanggalin ang Pag-uusap'
    } else if(lang.indexOf('Gaeilge') > -1) {
        return 'Scrios an Comhrá'
    } else if(lang.indexOf('Galego') > -1) {
        return 'Borrar a conversa'
    } else if(lang.indexOf('Kurdî') > -1) {
        return 'Axaftinê Jê Bibe'
    } else if(lang.indexOf('Lietuvių') > -1) {
        return 'Ištrinti pokalbį'
    } else if(lang.indexOf('Magyar') > -1) {
        return 'Beszélgetés törlése'
    } else if(lang.indexOf('Nederlands') > -1) {
        return 'Gesprek verwijderen'
    } else if(lang.indexOf('Norsk') > -1) {
        return 'Slett samtale '
    } else if(lang.indexOf('Polski') > -1) {
        return 'Usuń konwersację'
    } else if(lang.indexOf('Română') > -1) {
        return 'Şterge conversaţia'
    } else if(lang.indexOf('Shqip') > -1) {
        return 'Fshije bisedën'
    } else if(lang.indexOf('Slovenčina') > -1) {
        return 'Odstrániť konverzáciu'
    } else if(lang.indexOf('Slovenščina') > -1) {
        return 'Izbriši pogovor'
    } else if(lang.indexOf('Suomi') > -1) {
        return 'Poista viestiketju'
    } else if(lang.indexOf('Svenska') > -1) {
        return 'Ta bort konversation'
    } else if(lang.indexOf('Việt') > -1) {
        return 'Xóa cuộc trò chuyện'
    } else if(lang.indexOf('Беларуская') > -1) {
        return 'Выдаліць размову'
    } else if(lang.indexOf('Български') > -1) {
        return 'Изтриване на разговора'
    } else if(lang.indexOf('Русский') > -1) {
        return 'Удалить переписку'
    } else if(lang.indexOf('Српски') > -1) {
        return  'Избриши разговор'
    } else if(lang.indexOf('Українська') > -1) {
        return 'Видалити розмову'
    } else if(lang.indexOf('Հայերեն') > -1) {
        return 'Ջնջել խոսակցությունը'
    } else if(lang.indexOf('עברית‏') > -1) {
        return 'מחק/י שיחה'
    } else if(lang.indexOf('العربية‏') > -1) {
        return 'حذف المحادثة'
    } else if(lang.indexOf('فارسی‏') > -1) {
        return 'زدودن گفت‌وگو'
    } else if(lang.indexOf('हिन्दी') > -1) {
        return 'वार्तालाप हटाएँ'
    } else if(lang.indexOf('বাংলা') > -1) {
        return 'কথোপকথন বিলোপ করুন'
    } else if(lang.indexOf('ਪੰਜਾਬੀ') > -1) {
        return 'ਵਾਰਤਾਲਾਪ ਮਿਟਾਉ'
    } else if(lang.indexOf('தமிழ்') > -1) {
        return 'உரையாடலை நீக்கு'
    } else if(lang.indexOf('తెలుగు') > -1) {
        return 'సంభాషణను తొలగించండి'
    } else if(lang.indexOf('മലയാളം') > -1) {
        return 'സംഭാഷണം ഇല്ലാതാക്കുക'
    } else if(lang.indexOf('ภาษาไทย') > -1) {
        return 'ลบการสนทนา'
    } else if(lang.indexOf('ភាសាខ្មែរ') > -1) {
        return 'លុបចេញ ការសន្ទនា'
    } else if(lang.indexOf('한국어') > -1) {
        return '대화 삭제'
    } else if(lang.indexOf('中文') > -1) {
        return '删除对话'
    } else if(lang.indexOf('日本語') > -1) {
        return 'スレッドを削除'
    }
    return 'Delete Conversation'
}

function deleteAll() {
    if (confirm("Are you sure you wish to proceed?")) {
        var lang = document.getElementsByClassName('rhcFooterWrap')[0].getElementsByTagName('a')[0].innerHTML;

        var index = -1;
        var delText = getLocalizedText(lang);
        var buttons = document.getElementsByClassName('uiMenu uiSelectorMenu')[0].getElementsByTagName('a');
        for(var i=0;i<buttons.length;i++) {
            if(buttons[i].innerHTML.indexOf(delText) > -1) {
                index = i;
                break;
            }
        }

        if(index==-1) {
            alert('Problem detected! Please contact the developer (geopiskas@gmail.com) and provide the following information: ('+lang+' '+index+')'); 
            return;
        }

        var convList = document.getElementById('wmMasterViewThreadlist').getElementsByClassName('_k_');
        
        function deleteConv(){
            timer = setTimeout(deleteConv, 0);
            convList[0].click();
            document.getElementsByClassName('uiSelectorButton')[0].click();
            document.getElementsByClassName('uiMenu uiSelectorMenu')[0].getElementsByTagName('a')[index].click();
            document.getElementsByName('delete_conversation')[0].click();
            if(convList.length==0) {
                clearInterval(timer);
                alert('The listed conversations have been deleted!\nIf not, contact the developer (jahangiri.saman@gmail.com) and provide the following information: ('+lang+' '+index+')'); 
            }
        }

        if(convList.length==0) {
            alert('No conversation to delete! Your list is already empty.\nIn case it is not empty and this alert appeared, please contact the developer (jahangiri.saman@gmail.com) and provide the following information: ('+lang+' '+index+')'); 
        } else {
            timer = setTimeout(deleteConv, 0);
        }
    }
}

deleteAll();
