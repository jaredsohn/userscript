// ==UserScript==
// @name        Zap member posts from dpreview article comments
// @namespace   http://userscripts.org/users/lorriman
// @include     http://www.dpreview.com/*
// exclude     http://www.dpreview.com/forums/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require         http://userscripts.org/scripts/source/95009.user.js
// @version     1.3
// @grant GM_addStyle
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_registerMenuCommand
// ==/UserScript==

try {
    
    text_width = 300;
    text_height = 100;
    
    Config.prefix = document.domain+'test';
    Config.footerHtml = '';
    Config.reloadOnSave = false;
    Config.scriptName = "Remove member posts from dpreview article comments";
    fields={};
    for(i=0;i<30;i++){
        fields['member'+((i+1).toString())]= {
                    type : 'text',
                    label : (i+1).toString(),
                    width : text_width,
                    text : 'member link or username',
                    value : ' '                  
                };
    }
    
    Config.settings = {
        'Members' : {
            'fields' : fields
        },
        'Advanced' : {
            fields : {
                delay : {
                    type : 'text',
                    label : 'Delay in milliseconds',
                    text : 'slower connections may need higher value',
                    value : 2000,
                }
            }
        }
    };
    
    GM_registerMenuCommand('Dpreview member zapper options', Config.show);
    
    membersToAssasinate=[];
    for(i=0;i<30;i++){
        
		membersToAssasinate.push(Config.get('member'+(i+1).toString()));
                             }
    
    function isNumber(n) {
        return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
    }
    
    function newPageTrigger() {
        delay = Config.get('delay');
        if (!isNumber(delay)) {
            delay = 2000;
        };

        $("a[data-page-index]").click(function () {
            setTimeout(zap, delay);
            
        });
        
        $("span[data-page-index]").click(function () {
            setTimeout(zap, delay);
            
        });
    }
    
    function zap() {
        
        for (i = 0; i < membersToAssasinate.length; i++) {
            $('a.profileLink:contains("' + $.trim(membersToAssasinate[i]) + '")').each(function (i, el) {
                el.parentNode.parentNode.parentNode.parentNode.parentNode.setAttribute('style', 'display:none');
            });
            
            $("a[href='" + $.trim(membersToAssasinate[i]) + "']").each(function (i, el) {
                el.parentNode.parentNode.parentNode.setAttribute('style', 'display:none');
            });
             $("a[href='" + $.trim(membersToAssasinate[i]) + "'][profileLink]").each(function (i, el) {
                el.parentNode.parentNode.parentNode.parentNode.parentNode.setAttribute('style', 'display:none');
            });
        }
        
        newPageTrigger();
        
    }
    
    zap();
    
} catch (err) {
    if (console) {
        console.debug('Remove member posts from dpreview userscript Error: ' + err.message);
    }
}
