// ==UserScript==
// @name       Bangumi.tv TinyManager in Eye-click Style
// @version    0.0.1
// @author     Li Caomu a.k.a.Bonegumi
// @description  平铺模式时点格子全部变成点眼睛更新观看进度
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @include    http://bgm.tv/
// @include    http://bangumi.tv/
// @include    http://chii.in/
// ==/UserScript==

var style =
    ".tinyModeWrapper ul.prg_list li {margin-right: 0px !important;}"+

    ".tinyMode a.epBtnWatched, .tinyMode a.epBtnUnknown, .tinyMode a.epBtnAir, .tinyMode a.epBtnQueue, .tinyMode a.epBtnToday, .tinyMode a.epBtnDrop, .tinyMode a.epBtnNA {padding: 3px 5px !important; border-radius: 5px;}"+
    ".tinyMode a.epBtnWatched, .tinyMode a.epBtnToday, .tinyMode a.epBtnQueue {background: no-repeat url('/img/ico/ico_eye.png') 50% 100%;}"+
    ".tinyMode a.epBtnUnknown, .tinyMode a.epBtnAir, .tinyMode a.epBtnNA, .tinyMode a.epBtnDrop {background: no-repeat url('/img/ico/ico_eye.png') 50% -5%;}"+

    ".tinyMode a.epBtnWatched {text-shadow: 0 -1px 0 #4897FF, 1px 0 0 #4897FF, 0 1px 0 #4897FF, -1px 0 0 #4897FF;}"+
        ".tinyMode a.epBtnWatched:hover {background: #4897FF;}"+
	".tinyMode a.epBtnToday {text-shadow: 0 -1px 0 #C7E2BD, 1px 0 0 #C7E2BD, 0 1px 0 #C7E2BD, -1px 0 0 #C7E2BD;}"+
        ".tinyMode a.epBtnToday:hover {background: #C7E2BD;}"+
	".tinyMode a.epBtnUnknown, .tinyMode a.epBtnAir {text-shadow: 0 -1px 0 #DAEAFF, 1px 0 0 #DAEAFF, 0 1px 0 #DAEAFF, -1px 0 0 #DAEAFF;}"+
        ".tinyMode a.epBtnUnknown:hover, .tinyMode a.epBtnAir:hover {background: #DAEAFF;}"+
	".tinyMode a.epBtnNA {text-shadow: 0 -1px 0 #E0E0E0, 1px 0 0 #E0E0E0, 0 1px 0 #E0E0E0, -1px 0 0 #E0E0E0;}"+
        ".tinyMode a.epBtnNA:hover {background: #E0E0E0;}"+
    ".tinyMode a.epBtnQueue {text-shadow: 0 -1px 0 #FFADD1, 1px 0 0 #FFADD1, 0 1px 0 #FFADD1, -1px 0 0 #FFADD1;}"+
        ".tinyMode a.epBtnQueue:hover {background: #FFADD1;}"+
    ".tinyMode a.epBtnDrop {text-shadow: 0 -1px 0 #CCC, 1px 0 0 #CCC, 0 1px 0 #CCC, -1px 0 0 #CCC;}"+
        ".tinyMode a.epBtnDrop:hover {background: #CCC;}";

if ($('#switchTinyManager').attr('class').indexOf('focus')!=-1) {
	GM_addStyle(style);
	};