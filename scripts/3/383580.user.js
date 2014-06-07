// ==UserScript==
// @name       Zap google valentine doodle
// @namespace  http://userscripts.org/users/lorriman
// @version    0.2
// @description  Google valentine doodle making you sad? Zap it.
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require         http://userscripts.org/scripts/source/95009.user.js
// @include  https://www.google.*
// @include  http://www.google.*
// @match  https://www.google.*
// @match  http://www.google.*
// @copyright  2012+, Lorriman, MIT license
// ==/UserScript==
function debug(s)
{ console.debug(s); }

function type(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
} //endfunc

console.debug('loaded');

Config.prefix = document.domain;
    Config.footerHtml = '';
    Config.reloadOnSave = false;
    Config.scriptName = "Zap google valentine doodle";


Config.settings = {
       
        'Advanced' : {
            fields : {
                delay : {
                    type : 'text',
                    label : 'Delay in milliseconds',
                    text : 'Delay to wait till doodle is zappable',
                    value : 50,
                },
                
                
            }
        }
    };
    
GM_registerMenuCommand('Zap Google valentine doodle options', Config.show);

d=new Date();

if((d.getMonth()==1) && (d.getDate()==14)){
    debug('date found');
    
    function zap(){
        $('#dood').remove(); 
        $('#gbq1 a[title="Happy Valentine\'s Day! Create chocolate!"]').remove();
    };
    
    
    setInterval(zap,Config.get('delay'));
    
}