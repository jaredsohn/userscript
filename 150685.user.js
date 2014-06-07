// ==UserScript==
// @name        RZD Ticket my cities list
// @description Allows set list of cities in form system of ticket purchase RZD (Russian Railroad)
// @namespace   http://ticket.rzd.ru
// @include     http://ticket.rzd.ru/pass/secure/ticket?STRUCTURE_ID=4
// @require     http://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js
// @require     http://userscripts.org/scripts/source/50018.user.js
// @version     1.01
// ==/UserScript==

var $ = unsafeWindow.$

var get_city_names = function(id) {
    var result = [];
    $("#"+id+"Input").siblings("span").each(function() {
        result.push($(this).text());
    });
    return (result.join(", ")).slice(0,-1);
}

var set_city_names = function(id, value) {
    var value = value.split(",");
    $("#"+id+"Input").siblings("span").each(function(i) {
        if (value[i]) $(this).html(value[i].trim());
    });
}

var refresh_city_names = function() {
    var from = GM_config.get('from');
    var where = GM_config.get('where');
    if (from) set_city_names('from', from);
    if (where) set_city_names('where', where);
}

lang_ru = {
    'ButtonSave':     'Сохранить',
    'ButtonSaveTip':  'Сохранить настройки и закрыть окно',
    'ButtonCancel':   'Отмена',
    'ButtonCancelTip':'Закрыть окно (отменить изменения)',
    'ResetLinkName':  'Сброс настроек',
    'ResetLinkTip':   'Сброс настроек на установки по умолчанию',
    'ConfirmOverwriteFromClipboard': 'Уверены что хотите заменить ваши настройки из буфера обмена?',
    'SettingsSaved':  'Настройки сохранены.',
    'SaveAborted':    'Отменено.',
    'PromptSettingsPaste': 'Пожалуйста вставте ваши настройки сюда:',
    'ConfirmOverwriteFromPaste': 'Уверены что хотите заменить ваши настройки введеными?',

    'From': 'Откуда:',
    'Where': 'Куда:',
    'Title': 'Настроить список городов',
};

// TODO: Delete this when author GM_config Extender fix bugs
GM_config.trans['ru'] = {}
GM_config.localizeButtons = function() {
  if ( cf=this.frame.contentWindow.document.getElementById(this.id + '_buttons_holder') ) {
    cf.childNodes[0].innerHTML = this.lang('ButtonSave');
    cf.childNodes[0].setAttribute('title',this.lang('ButtonSaveTip'));
    cf.childNodes[1].innerHTML = this.lang('ButtonCancel');
    cf.childNodes[1].setAttribute('title',this.lang('ButtonCancelTip'));
    cf.childNodes[2].childNodes[0].innerHTML = this.lang('ResetLinkName');
    cf.childNodes[2].childNodes[0].setAttribute('title',this.lang('ResetLinkTip'));
  }
}
// End delete

GM_config.setTranslations('ru', lang_ru);
GM_config.initLocalization('ru', true);


GM_config.init("Список городов", {
    'from': {
        'label': GM_config.lang('From'),
        'type': 'text',
        'size': 100,
        'default': get_city_names("from")
    },
    'where': {
        'label': GM_config.lang('Where'),
        'type': 'text',
        'size': 100,
        'default': get_city_names("where")
    },
}, {
    'open': function() {
                GM_config.localizeButtons();
                GM_config.fadeOut();
                GM_config.resizeFrame('890px', '220px');
            },
    'close': function() {
                GM_config.fadeIn();
                refresh_city_names();
            },
    'save': GM_config.close,
},
    "#GM_config .config_var { margin: 0 0 10px; }"
    + '\n' + "#GM_config .field_label { display: block; float: left; width: 50px; height: 25px; line-height: 25px; margin-left: 5px; text-align: right; }"
    + '\n' + "#GM_config .config_header { margin-bottom: 15px;}"
    + '\n' + "#GM_config .config_var input { width: 800px; height: 25px; border: 1px solid #666; }"
    + '\n' + "#GM_config_buttons_holder { margin-right: 25px;}"
);

refresh_city_names();

GM_registerMenuCommand(GM_config.lang('Title'), function() { GM_config.open(); });