// ==UserScript==
// @name        OC Site Css
// @namespace   Offensive Combat
// @description Adds all the css used for forum enhancer
// @include     http://forums.offensivecombat.com/*
// @version     1
// ==/UserScript==

(function () {
    $(document).ready(function(){
        style = '<style type="text/css">'
   +    '.Unread { background: none repeat scroll 0% 0% rgb(223,208,120);}' 
   +    '.DataTable .BlockColumn { width: 20%;}'
   +    '.MessageList.Discussion .ItemDiscussion,.BestOfData .DataList .Item:first-child,form.Activity,.PanelInfo li,#Panel .FilterMenu li,'
   +    '.PanelInfo li:first-child,#Panel .FilterMenu li:first-child,.ChildCategories,.DataTable td,.DataList .Item:first-child,.DataList .Item {'
   +    'border-color: rgb(255,255,255);}'
   +    '.Unread .Wrap .hasNew { display: inline-block; margin-left: 10px;'
   +    'background: none repeat scroll 0% 0% rgb(64, 128, 185);'
   +    'font-weight: normal;'
   +    'color: rgb(255, 255, 255);'
   +    'text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.5);}'
   +    '.Wrap .hasNew {'
   +    'display: none;}'
   +    '.hasNew {'
   +    'border-radius: 2px 2px 2px 2px;'
   +    'background: none repeat scroll 0% 0% rgb(255, 255, 0);'
   +    'color: rgb(0, 0, 0);'
   +    'font-size: 9px;'
   +    'font-weight: bold;'
   +    'padding: 3px;'
   +    'line-height: 1;'
   +    'white-space: nowrap;}'
   +    '#menuGm {'
   +    'position: fixed;'
   +    'width: 45px;'
   +    'max-height: 240px;'
   +    'top: 20px;'
   +    'right: 0px;'
   +    'z-index: 999;'
   +    'background: transparent url("http://i.imgur.com/dAqFbAR.png") no-repeat bottom;'
   +    'padding-bottom: 3px;'
   +    'text-decoration: none;'
   +    '}'
   +    '#menuGm span {'
   +    'background: transparent url("http://i.imgur.com/QSfNRl6.png") no-repeat;'
   +    'display: block;'
   +    'height: 100%;'
   +    '}'
   +    '#menuGm span img {'
   +    'height: 25px;'
   +    'width: 25px;'
   +    'margin: 9px 10px 0 10px;'
   +    '}'
   +    '.AuthorInfo .Social {'
   +    'display: block;'
   +    '}'
   +    '.AuthorInfo .Social li {'
   +    'display: inline;'
   +    'list-style-type: none;'
   +    'padding-right: 5px;'
   +    '}'
   +    '.hidden { display: none !important; }'
   +    '</style>' 
        $('head').append(style);
    });
})();