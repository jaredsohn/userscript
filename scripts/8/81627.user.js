// ==UserScript==
// @name           让谷歌音乐歌手列表支持快捷键(chrome)
// @namespace      http://wagada.com
// @description    让谷歌音乐歌手列表支持快捷键(chrome)
// @include        http://www.google.cn/music/artistlibrary*
// ==/UserScript==
document.onkeydown = function(e){
    var k = e.keyCode;
    var v = '';
    switch (k) {
        case 65:
            v = 'A';
            break;
        case 66:
            v = 'B';
            break;
        case 67:
            v = 'C';
            break;
        case 68:
            v = 'D';
            break;
        case 69:
            v = 'E';
            break;
        case 70:
            v = 'F';
            break;
        case 71:
            v = 'G';
            break;
        case 72:
            v = 'H';
            break;
        case 73:
            v = 'I';
            break;
        case 74:
            v = 'J';
            break;
        case 75:
            v = 'K';
            break;
        case 76:
            v = 'L';
            break;
        case 77:
            v = 'M';
            break;
        case 78:
            v = 'N';
            break;
        case 79:
            v = 'O';
            break;
        case 80:
            v = 'P';
            break;
        case 81:
            v = 'Q';
            break;
        case 82:
            v = 'R';
            break;
        case 83:
            v = 'S';
            break;
        case 84:
            v = 'T';
            break;
        case 85:
            v = 'U';
            break;
        case 86:
            v = 'V';
            break;
        case 87:
            v = 'W';
            break;
        case 88:
            v = 'X';
            break;
        case 89:
            v = 'Y';
            break;
        case 90:
            v = 'Z';
            break;
        default :
            break;
    }
    if(v){
        location.href = "#"+v;
    }
}