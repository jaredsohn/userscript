// Learn script
// version 1.0.2
// 2010-06-25
// Copyright (c) 2010, Piotr Plewa
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Blue Magpie2
// @namespace     
// @description   Learn to fly with a Blue Magpie!
// @include       *
// ==/UserScript==

(function(){

if (window.top != window.self)  //don't run on frames or iframes
    return;

/*
// firebug debug extenssion
var bm_log = function(e){ alert(e) };
if(unsafeWindow.console) bm_log = unsafeWindow.console.log;

//local.setValue('bbb', 'bbb');

var local = {
    options: {
        prefix: '_BMP_STORAGE_'  
    },
    getValue: function(name) {
        return localStorage.getItem(local.options.prefix + name);
    },
    setValue: function(name, value) {
        localStorage.setItem(local.options.prefix + name, value);
    },
    deleteValue: function(name){
        localStorage.removeItem(local.options.prefix + name);
    }, 
    listValues: function() {
        var values = [];
        for (var i = 0; i < (localStorage.length); i++) {
            var key = localStorage.key(i);
            if (key.indexOf(local.options.prefix) == 0) {
                key = key.substring(local.options.prefix.length);
                values.push(key);
            }
        }
        return values;
    }
}
if(GM_getValue == undefined){
    GM_listValues = local.listValues;
    GM_getValue = local.getValue;
    GM_setValue = local.setValue;
    GM_deleteValue = local.deleteValue;
}
*/

var magpie = {
    storage: {
        labels: '',
        runs: 0,
        edit: '',
        toggle: undefined,
		bar: undefined,
        controls: { prev: undefined, next: undefined },
        buttons: { add: new Array(), save: new Array(), speak: new Array(), more: new Array(), del: new Array() },
        translate: undefined,
        tabs: undefined,
        tab: undefined,
        content: undefined,
        scrollbar: undefined,
        hide: true
    },
    langs: {
//        af: 'Afrikaans',
//        sq: 'Albanian',
//        ar: 'Arabic',
//        hy: 'Armenian ALPHA',
//        az: 'Azerbaijani ALPHA',
//        eu: 'Basque ALPHA',
        be: 'Belarusian',
        bg: 'Bulgarian',
//        ca: 'Catalan',
//        'zh-CN': 'Chinese',
        hr: 'Croatian',
        cs: 'Czech',
        da: 'Danish',
        nl: 'Dutch',
        en: 'English',
        et: 'Estonian',
//        tl: 'Filipino',
        fi: 'Finnish',
        fr: 'French',
//        gl: 'Galician',
//        ka: 'Georgian ALPHA',
        de: 'German',
        el: 'Greek',
//        ht: 'Haitian Creole ALPHA',
        iw: 'Hebrew',
//        hi: 'Hindi',
        hu: 'Hungarian',
        is: 'Icelandic',
        id: 'Indonesian',
        ga: 'Irish',
        it: 'Italian',
//        ja: 'Japanese',
        ko: 'Korean',
        lv: 'Latvian',
        lt: 'Lithuanian',
//        mk: 'Macedonian',
//        ms: 'Malay',
        mt: 'Maltese',
        no: 'Norwegian',
//        fa: 'Persian',
        pl: 'Polish',
        pt: 'Portuguese',
        ro: 'Romanian',
        ru: 'Russian',
        sr: 'Serbian',
        sk: 'Slovak',
        sl: 'Slovenian',
        es: 'Spanish',
//        sw: 'Swahili',
        sv: 'Swedish',
//        th: 'Thai',
        tr: 'Turkish',
        uk: 'Ukrainian'
//        ur: 'Urdu ALPHA',
//        vi: 'Vietnamese',
//        cy: 'Welsh',
//        yi: 'Yiddish'
    },
    css: (
    /* reset: */
'#_bmp-bar-wrapper, #_bmp-bar-wrapper ul, #_bmp-bar-wrapper li, #_bmp-bar-wrapper strong, #_bmp-bar-wrapper button, #_bmp-bar-wrapper span, #_bmp-bar-wrapper select, #_bmp-bar-wrapper div{ background: transparent; margin: 0 0; padding: 0 0; border: 0; }' +
    /* global: */
'#_bmp-bar-wrapper { height: 70px; width: 100%; position: fixed; left: 0;bottom: 0; overflow: hidden; text-align: left; z-index: 9998 !important; font-family: Calibri, Arial, Verdana, sans-serif; opacity: 1; } #_bmp-bar-wrapper:hover, #_bmp-bar-wrapper.active{ opacity: 1; }' +
'#_bmp-bar-wrapper li, #_bmp-bar-wrapper ul, #_bmp-bar-wrapper button{ list-style: none; border: 0; background: none; margin: 0; padding: 0; }' +
'#_bmp-toggle{ width: 20px; height: 10px; background: #333; border: 1px #000 solid; position: fixed; bottom: 50px; right: 0; z-index: 9999 !important; text-align: center; color: #fff; line-height: 9px; font-size: 14px; font-family: arial, sans-serif; font-weight: bold; cursor: pointer; opacity: 0.4; border-radius: 5px 0 0 0; -moz-border-radius: 5px 0 0 0; -webkit-border-radius: 5px 0 0 0; }' +
'#_bmp-toggle:hover{ opacity: 1; } #_bmp-toggle._bmp-hide{ bottom: 0; } #_bmp-bar-wrapper ._bmp-over{ background: #e61; }' +
'#_bmp-bar-wrapper._bmp-hide, #_bmp-bar-content._bmp-hide #_bmp-tab-add{ display: none; }' +
'#_bmp-tabs, #_bmp-bar-content ._bmp-tr-wrapper, #_bmp-bar-content ._bmp-translation, #_bmp-tr-add{ float: left; color: #fff; }' +
'#_bmp-drop-area_0, #_bmp-drop-area_1, #_bmp-drop-area_2, #_bmp-drop-area_3, #_bmp-drop-area_4{ position: fixed; width: 50px; height: 25px; -moz-border-radius: 5px; border: 1px #666 solid; text-align: center; line-height: 25px; background: #000; color: #fff; opacity: 0.8; margin: -80px 0 0 50px; z-index: 9999 !important; } ' +
'#_bmp-drop-area_1{ margin: -10px 0 0 50px; } #_bmp-drop-area_2 { margin: -80px 0 0 -50px; } #_bmp-drop-area_3 { margin: -10px 0 0 -50px; }' + 
'#_bmp-drop-area_0._bmp-drag-over, #_bmp-drop-area_1._bmp-drag-over, #_bmp-drop-area_2._bmp-drag-over, #_bmp-drop-area_3._bmp-drag-over, #_bmp-bar-content._bmp-drag-over{ background: #222; text-decoration: underline; } ' +
    /* global end; */
    /* controls: */
'#_bmp-bar-wrapper ._bmp-controls{ background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAmCAMAAAD3EJukAAABfVBMVEVZWVlcXFwybrBPT09pq/VKSkpepfVfX19UVFReXl53s/ZJSUl6tfZ6tPZHR0dLS0tQnfRImfNEREQtY59vrvZFl/NDk+xdXV1RUVE6f8w4e8Uzb7Izb7NxsPY9hdU+iNpZovQ7gM81dbyFu/dFlvJnqvUxa6xfpvV0sfZoq/U6fst1svYrXpg2dr6HvPdaWlpgYGBWVlYuZaI8PDw/id1JmfNip/VAjeMtY6BRnvQ/it4vZqRkqfV7tfYnVYknVYhqrPVvr/YvaKcwaalcpPQrX5hAjOI7gdBElfBdpPU7gtEuZKF2svZDkutYWFg1c7php/VBj+crXpczcLR/t/dTn/QtYp0oVotKmvNGl/MqXZaBuPdYovQ4e8Y0crcsYZw8g9NtrfZbo/Q/Pz9XofRurvZVVVU2dr84esRwr/ZFRUVXV1dNTU1MTExhYWEwaqt8tvc3eMBDQ0MybrFhpvVCkelcpPVysPYybK6KvfdbW1tsrfV0svZsrfY0cbZX/nEwAAAB20lEQVR4XmXSU7PtUAwH8KwS27ZtHNu2bfvS+Oy32e1qH05m+vKbzj9pE3jVqynKYvOVFlAlq7erxHCgKvEZXjIcqD7Wf9YfDQeqR5l65shw0NVmtdnUhzpouvzA9RZ6uYdl3aGjxb8F5/zXeWfh4o/mgDrBTbsS4Vo44fr2u9hxkFv20vBxdjHiqXoii9lpbgIdCJtMDvhTTPXq01WVmcseD5fsLRkajn1fX/nzmTt4G3SfRef8A8kkSwAss/F7xqMmimqX/mi5z7fvaKgcSudRm52Zlpj7+KwFAPh0fkmfFr0/nw6p3Hj+96ap7u0fNR6ASB9fNKXO1J4bIP96AlTTX8oSATFAAiKC4U8SBPS33zGRSjSbhnyRiDrJhYKTmC2/c2pL4LnKB3Sq1mKOBwDL5XjFiq5rZfzSguy6zsUUdFQllrt24Vc6ulec6zfoqDfrzpVuRwMIGw4N9gjeETfLuke8Qs9gKMwS3E70Ln4gxLa7urZjwkH8LoprwMCp03PfgldRvAu+89MpbKNtfmgr5d8RhB1/amsIld5JmzlJbGwkTpg2qnlVu5ORtbXI5K6m5g0ebs7MbB6ax0Z9b2xsT1dk6vbRUTuqztRbwWALVWfqMiEyqsnv6z9Bgcg8YV7sKQAAAABJRU5ErkJggg==) -9999px no-repeat; width: 22px; height: 19px; cursor: pointer; position: absolute; left: 0; z-index: 2; }' +
'#_bmp-bar-wrapper #_bmp-c-prev{ background-position: 0 0; top: 0; }' +
'#_bmp-bar-wrapper #_bmp-c-prev:active{ top: -1px; }' +
'#_bmp-bar-wrapper #_bmp-c-prev._bmp-disabled:active{ top: 0; } ' + 
'#_bmp-bar-wrapper #_bmp-c-next{ background-position: 0 -19px; bottom: 0; }' +
'#_bmp-bar-wrapper #_bmp-c-next:active{ bottom: -1px; }' +
'#_bmp-bar-wrapper #_bmp-c-next._bmp-disabled:active{ bottom: 0; }' +
'#_bmp-bar-wrapper ._bmp-disabled{ opacity: 0.5 } ' +
'#_bmp-bar-wrapper ._bmp-controls::-moz-focus-inner{ border: 0; }' +
    /* controls end; */
    /* buttons: */
'#_bmp-bar-wrapper ._bmp-btn ._bmp-b-icon, #_bmp-tabs li._bmp-new ._bmp-icon{ background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAABsCAMAAABQOBLUAAAArlBMVEX////w8vkAAADw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vnw8vmMP+88AAAAOXRSTlMAAAAR7nczmcyqZlUJRGnb87oD/ITdUUvYSEIb7QwiGMn5J4g/Wgai9q670mwPNoE5w3vAq+p4lk5ecK5dAAABQ0lEQVR4Xt3Q124DIRCG0Qzd2117Se+9/+//YgEpa1gsrZwrJ/nuOBIwcLBr5ANRQICTkABYCQmOyBOAiNBCcHlqOyu+sXWuePr4jb8oZTS5tOE1kYa0InFCGyKDnHJ0KCAuhBoaHhLlgFDUIC4w5A3iRqS4bpBGShI6IAlJzuWGEne92w1VE3EnDungD5ablEmhGPPEtF13BA/JrhU3hockkVheBZRAWk2ZJyU0S60GxDhjq5xZ+jcBoAYQOaJ2Qt1Pib7Pohbyc+0z8m3R/RYlhzGd9rsRZSUmIWUZDVCdBXR8c3tXHc3IU+8J5TOKxhDnF7jsRnP1rqp5RLRMqEG+fX6qr40KAP2XaUQOp/HGcVX2IqIHPMY0xiimAjNP866VdbnINjRaQOvXN7xTTesJXBgEc2UfUEotmw/6bHvjrn0B8GsuvnBIZxIAAAAASUVORK5CYII=) -9999px no-repeat; display: block; width: 18px; height: 18px; cursor: pointer; position: relative; left: -3px; }' +
'#_bmp-bar-wrapper ._bmp-btn{ width: 19px; height: 19px; margin: 2px; cursor: pointer; border: 1px #000 solid; float: left; line-height: 1px; border-radius: 3px; -moz-border-radius: 3px; -webkit-border-radius: 3px; }' +
'#_bmp-bar-wrapper ._bmp-btn:active{ margin: 3px 1px 1px 3px; }' +
'#_bmp-bar-wrapper ._bmp-btn::-moz-focus-inner{ border: 0; }' +
    /* add: */
'#_bmp-bar-wrapper ._bmp-b-add{ border-color: #233F61; background-image: -moz-linear-gradient(100% 100% 90deg, #233F61, #2D67AD); background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#233F61), to(#2D67AD)); }' +
'#_bmp-bar-wrapper ._bmp-b-add:hover, #_bmp-bar-wrapper ._bmp-b-add:active{ background-image: -moz-linear-gradient(100% 100% 90deg, #2D67AD, #233F61); background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#2D67AD), to(#233F61)); }' +
'#_bmp-bar-wrapper ._bmp-b-add ._bmp-b-icon{ background-position: 0 -55px; }' +
    /* delete: */
'#_bmp-bar-wrapper ._bmp-b-del{ border-color: #233F61; background-image: -moz-linear-gradient(100% 100% 90deg, #610301, #AD0602); background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#610301), to(#AD0602)); }' +
'#_bmp-bar-wrapper ._bmp-b-del:hover, #_bmp-bar-wrapper ._bmp-b-del:active{ background-image: -moz-linear-gradient(100% 100% 90deg, #AD0602, #610301); background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#AD0602), to(#610301)); }' +
'#_bmp-bar-wrapper ._bmp-b-del ._bmp-b-icon{ background-position: 0 -18px; }' +
    /* save: */
'#_bmp-bar-wrapper ._bmp-b-save{ display: none; border-color: #333; background-image: -moz-linear-gradient(100% 100% 90deg, #829427, #9AAD36); background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#829427), to(#9AAD36)); }' +
'#_bmp-bar-wrapper #_bmp-tab-add ._bmp-b-save{ display: block; }' +
'#_bmp-bar-wrapper ._bmp-b-save:hover, #_bmp-bar-wrapper ._bmp-b-save:active{ background-image: -moz-linear-gradient(100% 100% 90deg, #9AAD36, #829427); background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#9AAD36), to(#829427)); }' +
'#_bmp-bar-wrapper ._bmp-b-save ._bmp-b-icon{ background-position: 0 -72px; }' +
    /* speak: */
'#_bmp-bar-wrapper ._bmp-b-speak{ display: none; border-color: #233F61; background-image: -moz-linear-gradient(100% 100% 90deg, #7A6C41, #AD995C); background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#7A6C41), to(#AD995C)); }' +
'#_bmp-bar-wrapper ._bmp-b-speak:hover, #_bmp-bar-wrapper ._bmp-b-speak:active{ background-image: -moz-linear-gradient(100% 100% 90deg, #AD995C, #7A6C41); background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#AD995C), to(#7A6C41)); }' +
'#_bmp-bar-wrapper ._bmp-b-speak ._bmp-b-icon{ background-position: 0 0; }' +
    /* swap: */
'#_bmp-bar-wrapper ._bmp-b-swap{ border-color: #233F61; background-image: -moz-linear-gradient(100% 100% 90deg, #233F61, #2D67AD); background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#233F61), to(#2D67AD)); }' +
'#_bmp-bar-wrapper ._bmp-b-swap:hover, #_bmp-bar-wrapper ._bmp-b-swap:active{ background-image: -moz-linear-gradient(100% 100% 90deg, #2D67AD, #233F61); background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#2D67AD), to(#233F61)); }' +
'#_bmp-bar-wrapper ._bmp-b-swap ._bmp-b-icon{ background-position: 0 -90px; }' +
    /* more: */
'#_bmp-bar-wrapper ._bmp-b-more{ border-color: #233F61; background-image: -moz-linear-gradient(100% 100% 90deg, #7A7365, #ACA18D); background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#7A7365), to(#ACA18D)); }' +
'#_bmp-bar-wrapper ._bmp-b-more:hover, #_bmp-bar-wrapper ._bmp-b-more:active{ background-image: -moz-linear-gradient(100% 100% 90deg, #ACA18D, #7A7365); background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#ACA18D), to(#7A7365)); }' +
'#_bmp-bar-wrapper ._bmp-b-more ._bmp-b-icon{ background-position: 0 -37px; }' +
'#_bmp-bar-content ._bmp-tr-wrapper ._bmp-b-add, #_bmp-bar-content ._bmp-tr-wrapper ._bmp-b-speak, #_bmp-bar-content ._bmp-tr-wrapper ._bmp-b-save{  position: relative; top: 8px; }' +
'#_bmp-bar-content ._bmp-tr-wrapper ._bmp-b-more{ float: right; position: relative; top: 8px; left: 5px; }' +
'#_bmp-bar-content li ._bmp-b-del{ position: absolute; top: 9px; right: 10px; }' +
'#_bmp-tab-add ._bmp-btn{ position: relative; top: 8px; }' +
    /* buttons end; */
    /* tabs: */
'#_bmp-tabs li{ float: left; margin-right: 1px; font-size: 10px; height: 19px; line-height: 19px; position: relative; min-width: 79px; cursor: pointer; color: #000; text-transform: uppercase; text-shadow: 1px 1px 1px #999; border-radius: 7px 7px 0 0; -moz-border-radius: 7px 7px 0 0; -webkit-border-radius: 7px 7px 0 0; background: #c0c0c0; background-image: -moz-linear-gradient(100% 100% 90deg, #c0c0c0, #dadada); background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#c0c0c0), to(#dadada)); }' +
'#_bmp-tabs li b{ padding: 0 0 0 10px; }' +
'#_bmp-tabs li._bmp-new, #_bmp-tabs li._bmp-donate{ width: 19px; min-width: 0; margin-top: 2px; height: 17px; }' +
'#_bmp-tabs li._bmp-new ._bmp-icon{ background-position: 0 -54px; left: 1px; } #_bmp-tabs li._bmp-donate{ margin-left: 2px; }' +
'#_bmp-tabs li._bmp-donate span{ color: #f33; font-size: 15px; display: block; left: 3px; position: relative; }' +
'#_bmp-tabs li._bmp-active, #_bmp-tabs li:hover, #_bmp-tabs li:active{ background: #616161; background-image: -moz-linear-gradient(100% 100% 90deg, #616161, #707070); background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#616161), to(#707070)); color: #fff; text-shadow: 1px 1px 1px #000; }' +
'#_bmp-tabs li ._bmp-close{ top: -3px; right: 2px; width: 9px; left: auto; position: absolute; background-position: 0 0; font-size: 10px; font-family: arial, sans-serif; text-transform: lowercase; color: #f66; font-weight: bold; }' +
'#_bmp-tabs li ._bmp-close:hover, #_bmp-tabs li ._bmp-close:active{ color: #000; }' +
    /* tabs end; */
    /* content end; */
'#_bmp-bar-wrapper #_bmp-bar-content{ clear: both; height: 38px; background: #616161; overflow: hidden; position: relative; }' +
'#_bmp-bar-wrapper #_bmp-bar-wrapper ul{ position: relative; top: 0; }' + 
'#_bmp-bar-wrapper #_bmp-tab-add-sel{ width: 100px; float: left; margin-right: 7px; }' +
'#_bmp-bar-wrapper #_bmp-tab-add-sel select{ font-family: Calibri, Arial, Verdana, sans-serif; font-size: 10px; float: left; width: 100px; margin: 1px; background: #fff; border: 1px inset #999; height: 17px; }' +
'#_bmp-bar-wrapper #_bmp-bar-content, #_bmp-bar-content li{ position: relative; width: 100%; height: 38px; line-height: 38px; }' +
'#_bmp-bar-wrapper #_bmp-bar-content ._bmp-tr-wrapper{ margin-left: 25px; font-size: 16px; line-height: 37px; }' +
'#_bmp-bar-wrapper #_bmp-bar-content ._bmp-translation{ margin-left: 10px; word-wrap: break-word; height: 37px; }' +
'#_bmp-bar-wrapper #_bmp-bar-content ._bmp-translation strong, #_bmp-bar-content ._bmp-translation span{float: left; }' +
'#_bmp-bar-wrapper #_bmp-bar-content ._bmp-translation strong{ color: #FFA05E; } #_bmp-bar-content ._bmp-translation strong[title], #_bmp-bar-content ._bmp-translation span[title]{ cursor: help; } ' +
'#_bmp-bar-wrapper #_bmp-bar-content ._bmp-translation span:before{ content: " — "; padding-left: 5px; }' +
'#_bmp-bar-wrapper #_bmp-tr-list input[type="text"]{ border: 1px inset #999; float: left; margin: 9px 5px 0; font-family: Calibri, Arial, Verdana, sans-serif; font-size: 12px; width: 150px; padding: 3px 4px; }' +
    /* content end; */
    /* scrollbar: */
'#_bmp-bar-wrapper #_bmp-bar-scrollbar{ background: #393939; height: 13px; clear: both; }' +
'#_bmp-bar-wrapper #_bmp-bar-scrollbar ul{ padding: 2px 0 0; }' +
'#_bmp-bar-wrapper #_bmp-bar-scrollbar li{ float: left; width: 5px; height: 5px; background: #fff; margin: 2px; cursor: pointer; border-radius: 5px; -moz-border-radius: 5px; -webkit-border-radius: 5px; }' +
'#_bmp-bar-wrapper #_bmp-bar-scrollbar li._bmp-active, #_bmp-bar-scrollbar li:active, #_bmp-bar-scrollbar li:hover{ background: #111; -moz-box-shadow: 0 0 5px #fff; }'
    /* scrollbar end; */
    ),
    createMarkup: function(){
        var _styles = document.createElement('style');
        _styles.type = 'text/css';
        _styles.innerHTML = magpie.css;
        var _head = document.getElementsByTagName('head')[0] || document.body;

        // wrapper
        magpie.storage.bar = document.createElement('div');
        magpie.storage.bar.id = '_bmp-bar-wrapper';

        // toggle button
        magpie.storage.toggle = document.createElement('div');
        magpie.storage.toggle.id = '_bmp-toggle';
        magpie.storage.toggle.innerHTML = '+';
        magpie.storage.bar.className = '_bmp-hide'
        magpie.storage.toggle.className = '_bmp-hide';
        magpie.storage.toggle.addEventListener('click', magpie.toggle, true);
		// toggle shortcut (ctrl + Q)
		var _isCtrl = false;
        document.addEventListener('keyup', function(e){
			if(e.which == 17)
				_isCtrl = false;
		}, true);
        document.addEventListener('keydown', function(e){
			if(e.which == 17) _isCtrl = true;
			if(e.which == 81 && _isCtrl){
				magpie.toggle();
			}
		}, true);

        // structure
        magpie.storage.tabs = document.createElement('ul');
        magpie.storage.tabs.id = '_bmp-tabs';
        magpie.storage.tab = document.createElement('div');
        magpie.storage.tab.id = '_bmp-tab';
        magpie.storage.content = document.createElement('div');
        magpie.storage.content.id = '_bmp-bar-content';
        magpie.storage.scrollbar = document.createElement('div');
        magpie.storage.scrollbar.id = '_bmp-bar-scrollbar';


        // append markup
        _head.appendChild(_styles);
        magpie.storage.bar.appendChild(magpie.storage.tabs);
        magpie.storage.bar.appendChild(magpie.storage.content);
        magpie.storage.bar.appendChild(magpie.storage.scrollbar);
        document.body.appendChild(magpie.storage.bar);
        document.body.appendChild(magpie.storage.toggle);

        //
        magpie.refreshTabs();

        // add tab
        var _tabAddWrap = document.createElement('div'), _tabAddSel = document.createElement('div');
        var _langSel = [document.createElement('select'), document.createElement('select')];
        var _tabAddBtn = [document.createElement('button'), document.createElement('button')];
        _tabAddWrap.id = '_bmp-tab-add';
        _tabAddSel.id = '_bmp-tab-add-sel';
        _tabAddBtn[0].className = '_bmp-btn _bmp-b-swap';
        _tabAddBtn[1].className = '_bmp-btn _bmp-b-save';
        _tabAddBtn[0].innerHTML = '<span class="_bmp-b-icon"></span>';
        _tabAddBtn[1].innerHTML = '<span class="_bmp-b-icon"></span>';

        for(i in magpie.langs) {
            var _option = document.createElement('option');
            _option.value = i;
            _option.innerHTML = magpie.langs[i];
            _langSel[0].appendChild(_option);
        }
        _langSel[1] = _langSel[0].cloneNode(true);

        //
        _tabAddSel.appendChild(_langSel[0]);
        _tabAddSel.appendChild(_langSel[1]);
        _tabAddWrap.appendChild(_tabAddSel);
        _tabAddWrap.appendChild(_tabAddBtn[0]);
        _tabAddWrap.appendChild(_tabAddBtn[1]);
        magpie.storage.content.appendChild(magpie.storage.tab);
        magpie.storage.content.appendChild(_tabAddWrap);

        // swap selects
        _tabAddBtn[0].addEventListener('click', function(e){
            _tabAddSel.innerHTML = '';
            var _temp = _langSel[0];
            _langSel[0] = _langSel[1];
            _langSel[1] = _temp;
            _tabAddSel.appendChild(_langSel[0]);
            _tabAddSel.appendChild(_langSel[1]);
        }, true);

        // add tab
        _tabAddBtn[1].addEventListener('click', function(e){
            var _label = _langSel[0].value + '-' + _langSel[1].value;
            if((magpie.storage.labels == undefined || magpie.storage.labels.indexOf(_label) < 0) && magpie.storage.labels.split('|').length < 5){
                magpie.setLabels(magpie.formatData(_label));
                magpie.refreshTabs();
            }
        }, true);
    },
    setLabels: function(data){
        magpie.storage.labels = data;
        //GM_setValue('GM_bmp_labels', magpie.storage.labels);
    },
    formatData: function(label){
        magpie.storage.labels += '|' + label;
        return magpie.storage.labels;
    },
	toggle: function(){
        if(magpie.storage.bar.className == '_bmp-hide'){
            magpie.storage.bar.className = '';
            magpie.storage.toggle.className = '';
            magpie.storage.toggle.innerHTML = '&ndash;';
        }else{
            magpie.storage.bar.className = '_bmp-hide';
            magpie.storage.toggle.className = '_bmp-hide';
            magpie.storage.toggle.innerHTML = '+';
        }
    },
    refreshTabs: function(show){
        magpie.storage.tabs.innerHTML = '';
        show = (typeof show == 'string' ? show : '');
        // read data
        if(magpie.storage.labels != undefined){
            var _tabs = magpie.storage.labels.split('|'); // [active tab|(tab-labels...)]
            //magpie.storage.tabs.count = _tabs.shift();
            magpie.storage.tabs.active = _tabs.shift();
            [].forEach.call(_tabs, function (tab, i) {
                var _li = document.createElement('li'), _label = document.createElement('b'), _close = document.createElement('span');
                _li.id = '_bmp-li-' + tab;
                if(_li.id == show){
                    _li.className = '_bmp-active';
                    magpie.storage.content.className = '_bmp-hide';
                }

                //if(i == magpie.storage.tabs.active)
                    //_li.className = _bmp-active;
                _label.innerHTML = tab;
                _close.className = '_bmp-close';
                _close.innerHTML = 'x';
                _li.addEventListener('click', magpie.displayTab, true);
                _close.addEventListener('click', magpie.closeTab, true);

                _li.appendChild(_label);
                _li.appendChild(_close);
                magpie.storage.tabs.appendChild(_li);
            });
        }
        var _addTab = document.createElement('li');
        if(show == '') {
            _addTab.className = '_bmp-new _bmp-active';
            magpie.storage.tab.innerHTML = '';
            magpie.storage.scrollbar.innerHTML = '';
            magpie.storage.content.className = '';
            //document.removeEventListener('dragstart', magpie.drag, true);
        }else
            _addTab.className = '_bmp-new';

        _addTab.innerHTML = '<span class="_bmp-icon"></span>';
        _addTab.addEventListener('click', magpie.refreshTabs, true);
        magpie.storage.tabs.appendChild(_addTab);
		
		var _donateTab = document.createElement('li');
		_donateTab.className = '_bmp-donate';
        _donateTab.innerHTML = '<span>&#10084;</span>';
        _donateTab.addEventListener('click', function(e){
			GM_openInTab('http://slicetoxhtml.com/bluemagpie/#donate');
			//magpie.removeNode(_donateTab.hide);
		}, true);
        magpie.storage.tabs.appendChild(_donateTab);
	},
    removeNode: function(element){ // todo: extend prototype;
        if (typeof element == 'string')
            element = document.getElementById(element);
        if(element) element.parentNode.removeChild(element);
    },
    closeTab: function(e){
        var _label = '|' + this.previousSibling.innerHTML;
        if(magpie.storage.labels.indexOf(_label) < 0)
            return;

        // del node
        this.parentNode.style.display = 'none';
        // remove label
        magpie.storage.labels = magpie.storage.labels.replace(_label, '');
        // delete data
        GM_deleteValue('GM_bmp_tab_' + _label.substr(1));

        magpie.refreshTabs();
    },
    displayTab: function(e){
        var _self = this;
        if(typeof e == 'string'){
            _self = document.getElementById(e);
        }else{
            if (e != undefined){
                e.preventDefault();
                if(this.className == '_bmp-active')
                    return;
            }
            else
                _self = magpie.storage.tabs.getElementsByClassName('_bmp-active')[0];
        }
        
        magpie.refreshTabs(_self.id);
        magpie.storage.tab.className = _self.id;

        var _data = GM_getValue('GM_bmp_tab_' + _self.id.replace('_bmp-li-', ''));
        var _split = (_data ? _data.split('|') : ['', '']);
        _split.shift();

        magpie.storage.tab.innerHTML = '';
        magpie.storage.scrollbar.innerHTML = '';
        // controls up & down
        var _cId = {prev: '_bmp-c-prev', next: '_bmp-c-next'};
        for(c in magpie.storage.controls){
            magpie.storage.controls[c] = document.createElement('button');
            magpie.storage.controls[c].id = _cId[c];
            magpie.storage.controls[c].className = '_bmp-controls' + (c == 'prev' || _split.length <= 1 ? ' _bmp-disabled' : '');
            magpie.storage.controls[c].addEventListener('click', magpie.moveToItem, true);
            magpie.storage.tab.appendChild(magpie.storage.controls[c]);
        }

        var _scroll = document.createElement('ul');
        magpie.storage.list = document.createElement('ul');
        magpie.storage.list.id = '_bmp-tr-list';
        [].forEach.call(_split, function (item, i) {
            var _btnClass = {add: '_bmp-b-add', save: '_bmp-b-save', speak: '_bmp-b-speak', more: '_bmp-b-more', del: '_bmp-b-del'};
            for(b in magpie.storage.buttons){
                magpie.storage.buttons[b][i] = document.createElement('button');
                magpie.storage.buttons[b][i].className = '_bmp-btn ' + _btnClass[b];
                magpie.storage.buttons[b][i].innerHTML = '<span class="_bmp-b-icon"></span>';
                magpie.storage.buttons[b][i].innerHTML = '<span class="_bmp-b-icon"></span>';
            }

            magpie.storage.buttons.add[i].addEventListener('click', magpie.newItem, true);
            //magpie.storage.buttons.save[i].addEventListener('click', magpie.newItem, true);
            magpie.storage.buttons.speak[i].addEventListener('click', function(e){}, true);
            magpie.storage.buttons.more[i].addEventListener('click', magpie.showMore, true);
            magpie.storage.buttons.del[i].addEventListener('click', magpie.delItem, true);

            var _li = document.createElement('li'), _sli = document.createElement('li'), _wrapper = document.createElement('div'), _translation = document.createElement('div');
            var _tr = item.split(' - '), _tmpOr, _tmpTr = '<span></span>';

            _wrapper.className = '_bmp-tr-wrapper';
            _translation.className = '_bmp-translation';
		    //_translation.innerHTML = '<strong>' + _tr[0] + '</strong><span>' + _tr[1] + '</span>';
			// ?resizable
			_tmpOr = '<strong' + (_tr[0].length > 50 ? ' title="' + _tr[0] + '"' : '') + '>' + (_tr[0].length < 50 ? _tr[0] : (_tr[0].substr(0, 50) + '...'))  + '</strong>';
			if(_tr.length == 2)
				_tmpTr = '<span' + (_tr[1].length > 50 ? ' title="' + _tr[1] + '"' : '') + '>' + (_tr[1].length < 50 ? _tr[1] : (_tr[1].substr(0, 50) + '...')) + '</span>';
            _translation.innerHTML = _tmpOr + _tmpTr;

            _wrapper.appendChild(magpie.storage.buttons.add[i]);
            _wrapper.appendChild(magpie.storage.buttons.save[i]);
            _wrapper.appendChild(magpie.storage.buttons.speak[i]);
            _wrapper.appendChild(_translation);
            _wrapper.appendChild(magpie.storage.buttons.more[i]);
            _li.appendChild(_wrapper);
            _li.appendChild(magpie.storage.buttons.del[i]);
            magpie.storage.list.appendChild(_li);

            if(i == 0) _sli.className = '_bmp-active';
            _sli.id = '_bmp_s_' + i;
            _sli.addEventListener('click', magpie.moveToItem, true);
            _scroll.appendChild(_sli);

            if(_split.length == 1 && _split[0] == '') magpie.newItem();
        });
        magpie.storage.tab.appendChild(magpie.storage.list);
        magpie.storage.scrollbar.appendChild(_scroll);
    },
    showMore: function(e){
		var _el = this.previousSibling.firstChild;
        var _string = _el.value || (_el.hasAttribute('title') ? _el.getAttribute('title') : _el.innerHTML);
        var _langs = magpie.storage.tab.className.replace('_bmp-li-', '').split('-');

        GM_openInTab('http://translate.google.com/#' + _langs[0] + '|' + _langs[1] + '|' + _string + '');
    },
    newItem: function(input){
        magpie.storage.translate = document.createElement('span');

        var _inpField = document.createElement('input');
        var _act = magpie.storage.scrollbar.getElementsByClassName('_bmp-active')[0] || {id: '0'};
        _act = _act.id.replace('_bmp_s_', '');
        _inpField.type = 'text';
        _inpField.value = (typeof input == 'string') ? input : 'type sth...';

        magpie.storage.hide = true;
        for(i in magpie.storage.buttons)
            magpie.storage.buttons[i][_act].style.visibility = 'hidden';

        magpie.storage.buttons.add[_act].style.display = 'none';
        magpie.storage.buttons.save[_act].style.display = 'block';

        var _translation = magpie.storage.buttons.speak[_act].nextSibling;
        magpie.storage.edit = (_translation.firstChild.innerHTML != '' ? _translation.innerHTML : '');
        _translation.innerHTML = '';
        _translation.appendChild(_inpField);
        _translation.appendChild(magpie.storage.translate);
        _inpField.select();

        magpie.storage.buttons.del[_act].removeEventListener('click', magpie.delItem, true);
        magpie.storage.buttons.del[_act].addEventListener('click', (magpie.storage.edit == '' ? function(){
            _inpField.value = '';
            magpie.storage.translate.innerHTML = '&nbsp;';
            magpie.storage.hide = true;
                for(i in magpie.storage.buttons)
                    magpie.storage.buttons[i][_act].style.visibility = 'hidden';
        } : magpie.removeFields), true);

        _inpField.addEventListener('click', function(){
            if(this.value == 'type sth...')
                this.value = ''
        }, true);

        [].forEach.call(['keyup', 'change', 'select'], function (event, status) {
            //if(_value == 'type sth...')
             //   _inpField.removeEventListener(event, magpie.translate, true);
            //else
            _inpField.addEventListener(event, magpie.translate, true);
        });
        
        if(typeof input == 'string'){
            _inpField.select();
        }
        
        magpie.storage.buttons.save[_act].addEventListener('click', magpie.saveItem, true);
    },
    saveItem: function(){
        var _item = magpie.storage.tabs.getElementsByClassName('_bmp-active')[0];
        var _tab = 'GM_bmp_tab_' + _item.id.replace('_bmp-li-', '');
        var _data = GM_getValue(_tab) || '';
        var _inpField = magpie.storage.translate.previousSibling;
		magpie.storage.edit = '';

        _data = '|' + _inpField.value + ' - ' + magpie.storage.translate.innerHTML + _data;
        GM_setValue(_tab, _data);
  
        //bm_log(_act);
        magpie.displayTab();
    },
    removeFields: function(){
        if(magpie.storage.edit != ''){
            var _act = magpie.storage.scrollbar.getElementsByClassName('_bmp-active')[0] || {id: '0'};
            _act = _act.id.replace('_bmp_s_', '');
            var _translation = magpie.storage.buttons.speak[_act].nextSibling;
            _translation.innerHTML = magpie.storage.edit;
            magpie.storage.edit = '';
            magpie.storage.buttons.del[_act].addEventListener('click', magpie.delItem, true);

            magpie.storage.buttons.add[_act].className = '_bmp-btn _bmp-b-add';
            //magpie.storage.buttons.add[_act].removeEventListener('click', magpie.newItem, true);
            //magpie.storage.buttons.add[_act].addEventListener('click', magpie.newItem, true);
            for(i in magpie.storage.buttons)
                magpie.storage.buttons[i][_act].style.visibility = 'visible';
                
            magpie.storage.buttons.add[_act].style.display = 'block';
            magpie.storage.buttons.save[_act].style.display = 'none';
            magpie.storage.buttons.save[_act].removeEventListener('click', magpie.saveItem, true);
        }
    },
    delItem: function(e){
        var _trWrapper = this.previousSibling.getElementsByClassName('_bmp-translation')[0];
        var _label = '|' + _trWrapper.firstChild.innerHTML + ' - ' + _trWrapper.lastChild.innerHTML;
        var _tab = 'GM_bmp_tab_' + magpie.storage.tab.className.replace('_bmp-li-', '');
        var _data = GM_getValue(_tab);

        if(_data.indexOf(_label) < 0)
            return;

        magpie.removeNode(this.parentNode);
        _data = _data.replace(_label, '');
        if(_data == '')
            GM_deleteValue(_tab);
        else
            GM_setValue(_tab, _data);

        magpie.displayTab();
    },
    /* moving translation items  */
    moveToItem: function(e){
        if(this.className == '_bmp-controls _bmp-disabled')
            return;

        magpie.removeFields();
        var _pos = magpie.storage.list.style.top.replace('px', '') || 0;
        var _act = magpie.storage.scrollbar.getElementsByClassName('_bmp-active')[0];

        switch(this.id){
            case '_bmp-c-prev':
                if(_act.previousSibling != null){
                    magpie.storage.list.style.top = (parseInt(_pos) + 38) + 'px';
                    _act.className = '';
                    _act.previousSibling.className = '_bmp-active';
                    _act = _act.previousSibling;
                }
                break;
            case '_bmp-c-next':
                if(_act.nextSibling != null){
                    magpie.storage.list.style.top = (parseInt(_pos) - 38) + 'px';
                    _act.className = '';
                    _act.nextSibling.className = '_bmp-active';
                    _act = _act.nextSibling;
                }
                break;
            default:
                if(this.className != '_bmp-active'){
                    var _tid = parseInt(this.id.replace('_bmp_s_', ''));
                    magpie.storage.list.style.top = (_tid == 0) ? 0 : (-38 * _tid) + 'px';
                    _act.className = '';
                    this.className = '_bmp-active';
                    _act = this;
                }
                break;
        }

        magpie.storage.controls.prev.className = (_act.previousSibling == null) ? '_bmp-controls _bmp-disabled' : '_bmp-controls';
        magpie.storage.controls.next.className = (_act.nextSibling == null) ? '_bmp-controls _bmp-disabled' : '_bmp-controls';
    },
    drag: function(e){
        if(magpie.storage.toggle.className == '_bmp-hide')
            return;

        var _labels = magpie.storage.labels.split('|');
        _labels.shift();
        var _dropAreas = [];
        [].forEach.call(_labels, function (label, i) {
            //magpie.removeNode('_bmp-drop-area_' + i);
            _dropAreas[i] = document.createElement('div');
            _dropAreas[i].id = '_bmp-drop-area_' + i;
            _dropAreas[i].className = '_bmp-drop-area';
            _dropAreas[i].style.top = e.clientY + 'px';
            _dropAreas[i].style.left = e.clientX + 'px';
            _dropAreas[i].innerHTML = label;
            _dropAreas[i].addEventListener('drop', magpie.drop, true);
            _dropAreas[i].addEventListener('dragleave', function(){ this.className = '_bmp-drop-area'; }, false);
            _dropAreas[i].addEventListener('dragover', function(e){
            if (e.preventDefault) e.preventDefault();
                this.className = '_bmp-drop-area _bmp-drag-over';
            }, true);
            document.body.appendChild(_dropAreas[i]);
        });

        var _testTab = magpie.storage.tabs.getElementsByClassName('_bmp-active')[0].className.indexOf('_bmp-new');
        [].forEach.call(['drop', 'dragleave', 'dragover'], function (event, status) {
            if(_testTab == -1)
                 magpie.storage.content.addEventListener(event, magpie.draggable, true);
            else
                 magpie.storage.content.removeEventListener(event, magpie.draggable, true);
        });

    },
    draggable: function(e){
        if (e.preventDefault) e.preventDefault();
        switch(e.type){
            case 'dragover':
                if(this.className != '_bmp-drag-over')
                    this.className = '_bmp-drag-over'; 
                break;
            case 'dragleave':
                this.className = '';
                break;
            case 'drop':
                magpie.drop(e);
                break;
            default:
                break;
        }
    },
    drop: function(e){
        if (e.preventDefault) e.preventDefault();
        var _txt = '';
        if(e.dataTransfer.getData('text/x-moz-url-desc') != '')
            _txt= e.dataTransfer.getData('text/x-moz-url-desc');
        else
            _txt = e.dataTransfer.getData('text/plain');

        if(e.target.className == '_bmp-drop-area')
            magpie.displayTab('_bmp-li-' + e.target.innerHTML);

        magpie.newItem(_txt);
        //bm_log(_txt);
    },
    translate: function(e){
        var _value = e.target.value;
        var _act = magpie.storage.scrollbar.getElementsByClassName('_bmp-active')[0] || {id: '0'};
        _act = _act.id.replace('_bmp_s_', '');

        if(_value.length > 1){
            var _langs = magpie.storage.tab.className.replace('_bmp-li-', '').split('-'); // escape()

            GM_xmlhttpRequest({
                method: 'GET',
                url: 'http://translate.google.com/translate_a/t?client=t&text=' + _value + '&hl=en&sl=' + _langs[0] + '&tl=' + _langs[1] + '&otf=2&pc=0',
                onload: function(response){
					//response.responseText.replace(/\\x([0-9a-f]{2})/gi, function($0, $1){
						//return String.fromCharCode(parseInt($1, 16));
					//});
                    //var _resp = JSON.parse(response.responseText);
					var resp = response.responseText.substr(4);
                    magpie.storage.translate.innerHTML = resp.substr(0, resp.indexOf('"')); // <p></p> ?
                },
                onerror: function(){ }
            });
    
            if(magpie.storage.hide){
                magpie.storage.hide = false;
                for(i in magpie.storage.buttons)
                    magpie.storage.buttons[i][_act].style.visibility = 'visible';
            }
        }else{
            magpie.storage.translate.innerHTML = '&nbsp;';
            magpie.storage.hide = true;
            for(i in magpie.storage.buttons)
                magpie.storage.buttons[i][_act].style.visibility = 'hidden';
        }
    },
    blue: function(){
        [].forEach.call(GM_listValues(), function (value, i) {
            if(value.indexOf('GM_bmp_tab_') == 0)
                magpie.storage.labels += '|' + value.replace('GM_bmp_tab_', '');
                document.addEventListener('dragend', function(e){ magpie.removeNode('_bmp-drop-area_' + i); }, true);
        });
        //bm_log(magpie.storage.labels);

        magpie.storage.runs += 1;
        magpie.createMarkup();
        document.addEventListener('dragstart', magpie.drag, true);
    }
}
magpie.blue();
})();