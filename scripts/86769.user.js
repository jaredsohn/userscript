// ==UserScript==
// @name	Ikariam Mensaje global
// @namespace	Camiloasc1MensajeGlobal
// @author	Camiloasc1
// @homepage	http://userscripts.org/scripts/show/86769
// @version	0.1b
// @history	0.2b Correcciones menores
// @history	0.1b Lanzamiento Inicial
// @description	Agrega un link para enviar un mensaje global a la alianza facilmente desde cualquier vista.
// @include	http://*.ikariam.*/*
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require	http://userscripts.org/scripts/source/57377.user.js
// @require	http://userscripts.org/scripts/source/57756.user.js
// @require	http://userscripts.org/scripts/source/62718.user.js
// @require	http://userscripts.org/scripts/source/72585.user.js
// ==/UserScript==

if(!aMessage)
{
    var aMessage;
}

aMessage = {
    curVer : '0.1b',
    usoNum : 86769,
    aml : '',
    allyPage : '/index.php?view=diplomacyAdvisorAlly',
    language : '',
    autoLang : '',
    world : '',
    domain : IkaTools.getDomain(),
    checkUpdate : function()
    {
        ScriptUpdater.check(this.usoNum, this.curVer)
    },
    forceUpdate : function()
    {
        ScriptUpdater.forceNotice(this.usoNum, this.curVer);
    },
    run : function(debug)
    {
        if(debug === true)
        {
            unsafeWindow.aMessage = this;
            unsafeWindow.aMessage.init();
        } else {
            this.init();
        }
    },
    init : function()
    {
        this.autoLang = this.domain.split('.')[1];
        this.world = this.domain.split('.')[0];
        this.language = this.loadLang(this.autoLang);
        this.addCSS();
        this.addLink();
        this.aml = GM.value.get(this.world+'|link', false);
        
        if(this.aml === false || this.aml == 'false' || this.aml == '')
        {
            this.aml = this.getMsgLink();
            
            if(this.aml === false)
            {
                $('#AM span').html('<span id="ex">!!</span> ' + this.language.link);
                this.setLink(this.allyPage);
            } else {
                alert(this.language.title + ":\n\t" + this.language.confirm);
                this.saveLink();
            }
        } else {
            $('#AM span').text(this.language.link);
            this.setLink(this.aml);
        }

        if(IkaTools.getView() == 'sendIKMessage')
        {
            this.actualizarCreditos();
        }

        this.checkUpdate();
    },
    actualizarCreditos : function()
    {
        var lineaNueva = '<div id="update_l">Ikariam ' + this.language.title + '</div>';
            lineaNueva += '<div id="update_r">v' + this.curVer + '</div>';
        //var updateCheckButton = $('<a id="updateCheck">'+updateLine+'</a>');
        var updateCheckButton = $('<span id="updateCheck">' + lineaNueva + '</span>');

        $('#notice').after(updateCheckButton);

//        $('#updateCheck').bind('click', function(){
//            aMessage.forceUpdate();
//        });
    },
    getMsgLink : function()
    {
        var check = $('#allyinfo a[href*="msgType=51"]').length;
        if(check === 0)
        {
            return false;
        } else {
            var link = '/index.php' + $('#allyinfo a[href*="msgType=51"]').attr('href');
            return link;
        }
    },
    setLink : function(link)
    {
        $('#AM').attr('href', link);
        $('#AM').attr('title', this.language.title);
    },
    saveLink : function()
    {
        GM.value.set(this.world +'|link', this.aml);
    },
    addLink : function()
    {
        var link = '<li><a id="AM" title="' + this.language.link + '" href="">' +
            '<span class="textLabel">' + this.language.link + '</span></li>';
        var jLink = $(link);
        
        $('#GF_toolbar ul').prepend(jLink);
    },
    addCSS : function()
    {
        GM.css(
            '#AM {color:white;font:bold 11px Arial,Helvetica,sans-serif;}' +
            '#AM:hover {text-decoration:underline;cursor:pointer;}' +
            '#ex {font-size:12px;font-weight:bold;color:yellow;}' +
            //'#updateCheck {color:blue;cursor:pointer}' +
            '#notice {margin-bottom:0px}' +
            '#update_l {float:left;height:12px;margin-left:10px;}' +
            '#update_r {float:right;height:12px;margin-right:10px;}'
        );
    },
    loadLang : function(idioma)
    {
        var lang = {
            name : '',
            link : '',
            title : '',
            confirm : ''
        };

        switch(idioma)
        {
            case 'en':
                lang.name = 'English';
                lang.link = 'Alliance Message',
                lang.title = 'Alliance Message Script',
                lang.confirm = 'Circular Message Link was saved!';
            break;

            case 'pe':
            case 'ar':
            case 'es':
            case 'cl':
            case 'co':
            case 've':
            case 'mx':
                lang.name = 'Espa&ntilde;ol';
                lang.link = 'Mensaje Global',
                lang.title = 'Script de Mensaje Global',
                lang.confirm = '¡Se ha almacenado el enlace del mensaje circular!'
            break;
        }

    return lang;
    }
};

(function()
{
    aMessage.run();
})();