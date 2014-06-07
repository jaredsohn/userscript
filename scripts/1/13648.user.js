// eBay New Community Custom Buttons user script
// version 0.1.4
// 2008-05-14
// Copyright 2006-2008, thorbenhauer
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// -----------------------------------------------------------------------------
//
// Icon: Humility Icon Set
// by Andrew Fitzsimon and Chad 'gonZo' Rodrigue
// http://art.gnome.org/themes/icon/1136
// Released under the GPL license
//
// -----------------------------------------------------------------------------
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// -----------------------------------------------------------------------------
//
// ==UserScript==
// @name          eBay New Community Custom Buttons
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/13648
// @include       http://community.ebay.de/forum/ebay/post!reply.jspa?*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
(function () {

var anchor = document.evaluate("//div[@id = 'editor-panel-wrapper']", document,
    null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
anchor.addEventListener('DOMNodeInserted',
    function (event) {
        if (event.target.id == "mce_editor_0") {
            location.href = 'javascript:(' + encodeURI(uneval(function() {
                setTimeout("setEditorMode('text');",500);
                })) + ')();';
        }
        if (event.target.id == "wysiwyg-panel") {
            window.setTimeout(tweak, 500);
        }
    }, false);
   
function tweak() {

// Constants
const PNGS = new Array(
'data:image/png;base64,' +
'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBI' +
'WXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QgZDCUqqRSUvQAAAyVJREFUOMtlkm1Mm2UUhq/nfV/e' +
'lo+CH2RkkG6rm8RlEUetjg8FExYtnUwjM1n0j4k6zRRM9Mf8iEv84S+TJUTNMBhdhqgxMVuWOdwY' +
'GxAUOyMxRiAssgoMcAVGaekH7dsef0hx6J1cT/Kc8+Q+T05uJSIopfKbmpper6urc7tcrrt0XTf4' +
'j8LhcHR4eHi8ra3tZRGJ3tqzd3V19cu6MpJOW/9iWZKx0uvdzs6Tg4ApIogIeL2PvSsiEotFJBJZ' +
'lkj4VkIbWImGRUSk0l35TtbAqKmucqcSMRKxOAKwdipNQ2kGGgYoDRAySQsrJ4m7cvfO7PcNM8c0' +
'o7Eoq8nEPxWl0JQBCmav9rIUHCGTXkUpwSwoZvu9T2Dm5JrrBrqumavxGMlUCqUUmm4SCk0yO9pN' +
'7b4WbPnNG5a5eL0PT/mNzdm7JpKxJ60UiXiMRDLF0sIMI/2f4ak/yMzkGLNTYwwNnCNx83cCV6+Q' +
'NnZQWdf60On2ez4B0K4FAkGRNJlMGkGnr7MVd62PdOhXbI4yAteXqKnfx+luP67yB3n+0Cu4PV72' +
'Nne8eOaEp8EYHPzxsmnoT8V0k4nRYX/GWt2jxyaIRFJYzocpLSmmrMyJ54EaFoKz+Lx7sSwoKN6l' +
'AtPxt/Xg/PxvTmfZAUtyfjn+ZvOAp2JTffm2QkgHOX8lTEVlFYcPtzJw8SsmAmF8vsfxNj7JD70f' +
'YteuGYaIJO6r2PXFW0fff6TAQaEVDxK/+QcZJXhum6LjWB823eKZRo3zQz183n6OTXdEee5AERf6' +
'jSK1FmVjT3Vtx6ue4eNJLddftzsfI8/E4TCx5dlRthwMux1bng0cuaDrRJeX+a4/9JMBICKWUuqU' +
'f4ix9paCOa1w++aTPXN8e2mWg74tOBwKmz3BfGiF8T+XmZ6JcuS1+5mcvuEnG0kRAdD2e2jp+bja' +
'GjnzrKzFcgNFd+ZLY8PdculU02hqbr+2wSBLcxUffHPMF73w5UsCyCGQj0BeAHm0YYd0f/30+M9n' +
'XdtEBLU2+X86cXRr6V/Rkk9LyrbsXF6xShdDseRW5+1Ti6GF74+81/tG9t3f7h26+REWMWIAAAAA' +
'SUVORK5CYII=',

'data:image/png;base64,' +
'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBI' +
'WXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QgXEjEyYrEi9wAAAiJJREFUOMudkr1PU1EYxn/n3ksv' +
'1FuJLV+C4AchGI1lQCcIDiaG6MLE6uDirMAmfiwlxsF/gJHov2B0MiSaQEKaGLBBSmgUbVKk4IVb' +
'Ws55HaCFAmHwWc4Z3vM7z3OeozzPG+nv748BiAgiovb3lVUpZeXz66WZmdkp4CuHNTg4mJBTVRTR' +
'vqz9WtYvXzx/D8QPn3cABRB/+I7NoEBJC5aCSNil1q1hq1Ak7+8yNnTFejr+7O52ULAnJiaeAMky' +
'AIDs2l/GH/TS1RqlNmRhRGCfXigZLjaHAUgkEncaYtE3I6Njj4G5CiB+tZVA28ws/cGIIEjFptbC' +
'Utbly1yKdDrN7RvXBnp6eoaTyeQBoCHqMZvO7+U5IhFhYXUbURYbQSePuputaDQaqorQGPUwWnDs' +
'kxAHcreE1kvt2LatAZxyXWG3hqBoE7JDoBRGdjFSwoiGQ3GwDOCglJIqBw21HoWwTyr3FnQdHZFe' +
'zp+7juucYdfsoKWECJzd2gFqqmoEYPL7MDe7LhBra2G9uMan31Ok5r8RU53cahuiMXKZHe2Tya8C' +
'r44DupvaGWi+j9YaZVkMNN3DxA0/gxVS2QXmtz8TclwiLfV79R6NsLKR4UPmI0ZMpX+lLGxl4zh1' +
'NNV3YERYXk9z4k/8kctgi0JxeguLucWTHeSyOfxNH6VOAQgEG0EZUP0GMin8j5TneaN9fX2Nx+86' +
'Mrhvuazp6emc7/uv/wGevf+VIy0RVgAAAABJRU5ErkJggg==',

'data:image/png;base64,' +
'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADOUlEQVQ4y22TzWtcZRjFf+9735l7' +
'52Zm7nxkynQSQz6apmqUEqyp1SQYXXTRLoRKq4iCy/oHiBv3LnUhLgzF6kZDXSiIcVEIQhFNbZqm' +
'tAlpmqRtOjM2k8xX5n7NvS5iSxQfOPAcOOdZnIcj+M8cmTjXERK+ZSUTLw72dh9PWUlz/X7xj/mb' +
'K5cfXP/ly9BthPv1Yj8Zmjg7mbGSF86ceq1ndGSYmGGQtkw8z8d2Wkz/OMunU5fO1Zdmvn3s0R4v' +
'g2NvfpzLpqfef/uN1OGBPrrynViJDsyYgWkYGLrO0eEBjj47dGapJMfKa/MXnxw4PH52NNkR+2Zy' +
'4mXZXShQyOcI0JBKoUlFqdoik4wjpUa+M41hRvvv1lRxa23xqnz69XelHtGm05mcyGayxJMJ8p0W' +
'Tx1IUazU2ShVMaMKCAlCQSKZ4PQrLzDY1/uFMqyolioMnoybsfP5rgIDfb2cPPEcuh5BCDiQjpO1' +
'YtSaDo1dB8fzWV4vErdM4jGd2yWnpiJKvaTHTIQWIWUlUWovFiHEPykLDmYTLK4WMfUI15Y2WViG' +
'qAjJpFInFDCqaQohNMqVKkEY4no+hh5Bk/LJh4b786zcf8TDv+r4foud7S10Qx9RAugp5LCDgOW1' +
'h3xyYQalFGMjhxgfObTnDkOkEMwv3QNc2kGA57cRQiARYu6ZgS4818P1PFq2jef73LyziZISTQo0' +
'TXJ7rcSN5Q0cx8V1HOxWC9f15qTvh78t3FrFdlo4joNt27Rsm0azhaZJlNzDRnGLV48dwfU8bMfB' +
'cWw8z55TbSF/vrWyfsfKdA40G3WEEARBQNHz2Cxv03Mwy9JakbnFFUw9im3b7O42adRroW07X2vb' +
'6zeCXN/zf0aVei8eN6Wu6yhNQ0pBpdqk3Q64+MOvbJZ2qFRruK5LbXuL3Xr1g6s/TV3WAMp3FzZS' +
'3UOiI6aPJ0xDRCOKaCRCpdpgceUeftsnGpEQtPHsXSo7W9NXvv/8w391oby6MBvL9V+RIpxMxM1k' +
'NCLRJGgCBG1oe9Sqldajcun87HefffS/bQToPXZKT1rpd3K57PF4hzmiIsrwXOdaZbvxe73ZuHR9' +
'5qsH+/V/AyFIUFKVf8baAAAAAElFTkSuQmCC',

'data:image/png;base64,' +
'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBI' +
'WXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QcWDioBW4ci2wAAAW1JREFUOMvFk7uKIkEUhr8q69KC' +
'mqkgKhgIE+w7+EC+ho/gGwi+hdnGBhM6qYIoeIm6XeuywXTXtrPZbLA/HKjzU/+pcyv4R4jdbve+' +
'2WzeYozETwDEEELlxxDCJ1mey7thNpv9ZLlc/orfxGKxuCvnHAD9fp8YI8YYsizDWvtiX7nVaoVz' +
'Lsjn8xkAhsMhp9OJw+Hwpz4hktXhvQfAOYeqnPv9jhCCGCPT6TSJQgicz2eu1yt5npPnOUVRsF6v' +
'8d6jnHMRoNFoEGNkPB5jreXxeHA8HrndbunFr/DehxTgcrkwGo3Y7/eUkyDLMpRSKKVSSXXEGGUK' +
'0G63kVLS6/XodrsAdDqd15kLgZQSa22iUg+azSZFUdBqtV4E9XM1IWNMlYFQzrkAoLVGa51EdbEx' +
'BmstxphkJWTKQEr5V5O01klsrUVrnQLVMwBgu91+6yuowWDwPp/Pf1SdLxdHiLKG2jIlruInk8kH' +
'/x2/AVt+9U9omNQ7AAAAAElFTkSuQmCC',

'data:image/gif;base64,' +
'R0lGODlhEAAQAIABAAAAAP///yH5BAEAAAEALAAAAAAQABAAAAIgjI+py60AI2zR1HXvm0F3CYZI' +
'xm2AVSbkaYLOC8dyUwAAOw==',

'data:image/png;base64,' +
'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBI' +
'WXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QgZECorTLfi8AAAApdJREFUOMuNkUtrE2EUhp9vZlJ7' +
'ySSW2KaW3qJVY7Veq1G8gDcoiuLCha7c+Qf8AZX+A6EBL4jdFAQXYlGouBQqLgRRULG3FHtNY9JM' +
'Mmkyme8bFyFgVNAXzubAeXne94h4PL5qmqYEUEohpRRKKVzX1aSUSCmFlFI4TkkrlZzVoaGhPn7V' +
'6Ojokvef2rAt78b1689+vTc8zwPAPzhCLBqmIxwg0LiJgL+BOp9OvuBg2UUEcO/2We6OjFzVdH18' +
'bGzsCoDmeZ4AuHx8G1dP72R/71Yce41k4hMiN0vAW6HOzRDtDgHQEgox+uj+5eHh4akaAjSDL4l1' +
'3r6Z4MzRKBcHjxA0GzAbfGSyWZ68es+Fm+NI5RFqUuxpI1QlACBTkLyeeE5bOEwk0s18uszHxSKT' +
'U3k2NQS5dv4wvd1haDvI03t38Pv9qobgx+oKVjZDT2eMk/simMEgaAbTK3l8TT5mEmnODXTzfnwR' +
'AF3XvaqBAMilFwiE2jl1sIfOjhaKDjiuYld7Ex9mMkx8TNOs5bHSy1WD2i+Y9YKs8vHw5Tfezkku' +
'xbro72lG1zT6uoKkcpLFTA5dqBoCrfrPE7G91AtJWTp8SqSZWsoSaKyjsd7H44mveFJSLhUIbWmp' +
'dK5VTjWllABIuiGs9SQbdoFyMc/n2TRmow+7WEbXBeVCjlxqgY7t0Qq6YXi1EQIm/UeOszY/TWew' +
'leVUivHJOV68S5C1LNzMd3bs7sNvmjUERjVCnU9j78AxEs2b8VIJettbmZ6ZxXTXWE8nieyO0rWt' +
'F8suVQ0qBEpVSim5CrHh0NqxA9G5i3XLYvbbAs3hHtoO9YNS5AolNkrlvxM8uHWAPxXjXzIcxzHi' +
'8XhSCMHfBvh95wHYtm0A/AQ1oU963Gm+PQAAAABJRU5ErkJggg==',

'data:image/png;base64,' +
'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBI' +
'WXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QcVDxM5bnbSJgAAAupJREFUOMuVkm1IU3EYxc//3uts' +
'Xp3pZpYlGelSo5pSZuoCpZRKM40ilIQgikilsBfrSwUR9EIEgREikUFFH4QQAt9KKC1UnMzXrTmd' +
'685dp25im5vb7r9PSfQle74ezo/DeQ6hlOJ/Ln+vOjYrQ/NKtobPGhvWH2D+x1y8Jy46U5PaczD/' +
'yMEp4xDnXlq2cKs156ZGhWflaIcOHC7e8Ln9PcbMltedgzPTq0qQtjlMlq3V9h4qPrmhr6sDA4Oj' +
'c0az4wYA/BNw6Wgym71vd3tB4Ylk/bePsEyYIYjzdTY3FVcFED3sg6LSMq1hoBuWCRNMVnFQ8ntu' +
'/dYZACDlJFy1U9WgSFY8I4VE/luMlLMPi0qOV9vMwzCbRmAWHDa7OKPtMi6uvI6or6tlZZll3vSE' +
'dMIwDN51v/M3NjWGvylrjO7o/GDyOgV+U3gAswuenyaLNfLT4Jz0Z0IuhA2JaDW2tugculivz4sp' +
'wSrIFWF+nX5g5Obt+3ykIgwVpQUS6xZjJtPrua2a3KcRa5XxU+Nj+nnrUC2hlIIQwgLgAYQA4E4e' +
'K2l++PjJnqgYJa7U1CAlQaW51RYyujEubqjuSmESyzEYMNrR0PSlify9xI62ln09ff1dVVXVpOba' +
'Vbp9R1JK9YXLBgDgMiuvhvFyDSVsFA0EA7Gc78UKoPKImjT32p7sz8s/8/JtU8TFqiqamZeTslh6' +
'6juAxPjUlONrE+IzyJLbYNPp2vQuz9d7lHoIpRS15dqoyUWZMTcnQ2U0jMBinUbh6bNbghXn7RLw' +
'fL1WW0FCQ4FgEIRhwDAMhPb2HxKl+eTOuQK2a3haTE3cqLQLNiz5fPAuB8ArI9KyP+jWRQMtAQB/' +
'Vk8AsACcwF12yu6qj5EHNbPzTpk/SGgQxDEhOEe/9I3X9QOzaoCTAL8EeFlAWgbsS4BBBFodwKOV' +
'DnZti1eyhPI6gyACoAqFgqpUKrhcLs7tdvN+v18hSRIPwAdgAYCTUrr8CwHTTD4ryu3dAAAAAElF' +
'TkSuQmCC',

'data:image/png;base64,' +
'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBI' +
'WXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QcbDjAIYBy4eQAAAwNJREFUOMtd079LOwcYx/H3/cpd' +
'LuYuMUYRFVoQUfyBJZUuukggIh3M4OBQpEP/gi6Cg0vAf6CbtZLFzVm/ku/gVrrYKkGEJKUxGk3U' +
'S0yil0vu/E5K/X6WBx6e57U8PAJfZWlp6Y/h4eGf/997fX0ll8v9cnJy8vvX88LCwoJvdHT0t4GB' +
'gfWpqSllb29PuLq6QhCE96Fut0sikWBxcZGzszMvm83+02g0fjw+Pr6Rw+Hw52QyOT8/P48gCKiq' +
'Si6XQxTFd8BxHOLxOGNjY8TjcfHo6Oi7dDr9FzAsG4bxfT6fJ5PJIIoifr+fUCiEYRjouk673abV' +
'anF4eMj+/j6VSoXV1VUURYkAyLIst9bW1rRIJMLDwwPX19eUy2UqlQqe56GqKrquMzg4iOu6iKKI' +
'4zh0Op0sgLCysvKDJEl/uq6LJEnouo4kSSiKgqZp2LZNo9Gg1Wrx8vLC9PQ0p6enr3d3d99eXFz8' +
'JwD+jY2N+vb2tgLQ6XSo1+tUq1Usy+L5+fm99vT0MDs7SzKZbJ+fnxuAIwIvlmXVms0mzWaT29tb' +
'SqUSl5eXhMNhHMdBFEU0TePp6YlarYZt203AARABNE27tyyLbDZLsVjk/v6edDpNIBBgZ2cHx3FQ' +
'VZVUKkUsFqO/v7/ydiERwOfzVSzLwjRNbNsmGAzieR6iKOJ5HrquUygUiEajAAwNDRU/AKqq3pbL' +
'ZQKBAPV6HV3X6evro91uE4lE6O3tpVgsMjIyQiaTIRaLDX8AFEUp3dzcEI1GUVUVn8+HaZo4jkMo' +
'FMLv96NpGsvLyzw+PnJwcPD3B0AUxatqtYqmaQQCAQBM06TdbhMKhRAEAdM0mZubw7Is1tfXzQ+A' +
'67r/2rYNwMzMDD6fj/HxcQRBYGJiAkmSiMfjTE5OUiqVKBQKv74/E8DW1tZgp9P5JMvydCKRIBgM' +
'Yts2hmFQr9exLItarUahUCCfz1/v7u5+A3Tfgbdsbm6uOI7zU7fbHXFdd9DzPEOSJEuW5TtZlq+B' +
'E0VR9lKp1NPbzhdYqktu7T8f5QAAAABJRU5ErkJggg=='
);

const CLOSEGIF =
'data:image/gif;base64,' +
'R0lGODlhEAAQAOYBAAAAAP///xkfGAccAkHmGUbnHy1nHxo7EoPvaVttVzniDzjgDjngDjjdDjjZ' +
'DiOICSB9CDnWDznSDwspAzvkETK2Dj7lFD7lFULmGUbnHiiCEhxXDUvoJFDoKlXpMFXpMVrqN1vq' +
'Nz+hJh1JEmDqPmXrRE6wNhUsD2zQU4nwcEd4O3KnZLD1n4m4fScvJZmslAsnAx1lCAsmAzrMETrI' +
'ETe8EDvEEjvBEjCbDxM5Bi2KDw8uBT20FT2xFSJkDCQqIjuYFhQcEQwfBBQzBxQaEe/v79/f38/P' +
'z7+/v6+vr5+fn4+Pj39/f3BwcGBgYFBQUEBAQDAwMCAgIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5' +
'BAEAAAEALAAAAAAQABAAAAeFgAGCg4SFhoeIg0tSSomCRVAJL0yOSAIrLC2UiEsnKAgpKk2HRU4b' +
'HiAkJSYGBy5OSINREAoUFgQZHB0fISIjT0UBSjAVEhEODQu1FxgFGk6CSEE4NzY0MVITD8gMA4NG' +
'UT49PDlHRkwyNTMwhKVDQEKDSjs6T4ZJP1CEUERHjv8AAwoKBAA7';

const TITLES = new Array(
    'Click for emoticons',
    'Click for img tag',
    'Click for a tag',
    'Click for fixed width font',
    'Click for strike',
    'Decode selection',
    'Color selection',
    'Clear all'
);
const ALTS = new Array(
    'Click for emoticons',
    'Click for img tag',
    'Click for a tag',
    'Click for fixed width font',
    'Click for strike',
    'Decode selection',
    'Color selection',
    'Clear all'
);
const FUNC = new Array(
    showEmoticons,
    postImgTag,
    postATag,
    postFWFTag,
    postStrikeTag,
    decodeHTML,
    showColors,
    clearAll
);

// Custom Buttons
var tarea = document.getElementById("textEditor");
var textPanel = document.getElementById("text-panel-links");
var emoticonsDiv = initEmoticons();
var elem;
for (var i = 0; i < PNGS.length; i++) {
    if (i != 4) { // No Strike
        elem = createImg(PNGS[i], TITLES[i], ALTS[i], FUNC[i]);
        textPanel.appendChild(elem);
    }
}
textPanel.appendChild(emoticonsDiv);
var img = document.evaluate("//img[@title='Color selection']", document, null, 
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
var imgParent = img.parentNode;
var box = document.createElement("div");
box.style.display = "inline";
imgParent.replaceChild(box, img);
box.appendChild(img);
var colorDiv = initColors();
box.appendChild(colorDiv);

elem = document.evaluate("//img[@id='jive-img-quote']", document, null, 
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).parentNode;
elem.addEventListener("click",
    function(event) {
	    tarea.value = tarea.value.replace(/\{quote:title=/g,
	        "<span class=\"jive-quote-header\">");
	    tarea.value = tarea.value.replace(/\}\{quote\}/g,
	        "</span>");
    }, false
);

// Accesskey
tarea.setAttribute("accesskey", "i");
var form = document.evaluate("//form[@name='postform']", document, null, 
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
var newLabel = document.createElement("label");
newLabel.setAttribute("for", "textEditor");
newLabel.setAttribute("accesskey", "i");
form.appendChild(newLabel);

// Ctrl Enter Submits
var input = document.evaluate("//input[@id='postButton']", document, null, 
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);   
tarea.addEventListener("keydown",
    function(event) {
	    if (event.keyCode == 13 && event.ctrlKey) {
	        input.click();
	    }
    }, false
);

// Functions
function postFWFTag(event) {
    postTag('<span style="font:medium monospace;">', '</span>');
}

function postStrikeTag(event) {
    postTag('<span style="text-decoration:line-through">', '</span>');
    //postTag('<span class="line-through">', '</span>');
}

function postImgTag(event) {
    postTag('<img src="', '" alt="" />');
}

function postATag(event) {
    postTag('<a href="', '"></a>');
}

function postColorTag(event) {
    colorDiv.style.display = "none";
    postTag('<span style="color:' +
        event.target.style.background.replace(/\s/g, "") + ' !important">',
        '</span>');
}

function decodeHTML(event) {
    var strings = getStrings();
    strings[1] = strings[1].replace(/</g, "&lt;");
    strings[1] = strings[1].replace(/>/g, "&gt;");
    // strings[1] = strings[1].replace(/\"/g, "&quot;");
    //strings[1] = strings[1].replace(/\(/g, "&#x0028;");
    //strings[1] = strings[1].replace(/\)/g, "&#x0029;");
    tarea.value = strings[0] + strings[1] + strings[2];
    tarea.focus();
}

function clearAll(event) {
    tarea.value = "";
    tarea.focus();
}

function getStrings() {
    var selLength = tarea.textLength;
    var selStart = tarea.selectionStart;
    var selEnd = tarea.selectionEnd;
    if (selEnd == 1 || selEnd == 2) {
      selEnd = selLength;
    }
    var strings = new Array(3);
    strings[0] = tarea.value.substring(0, selStart);
    strings[1] = tarea.value.substring(selStart, selEnd)
    strings[2] = tarea.value.substring(selEnd, selLength);
    return strings;
}

function postTag(startTag, endTag) {
    var strings = getStrings();
    tarea.value = strings[0] + startTag + strings[1] + endTag + strings[2];
    tarea.focus();
}

function initColors() {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.innerHTML = "div#colorDiv {z-index:10; position:absolute; " +
        "display: inline;} " +
        "div.wrapper {width: 88px; clear: both;}" +
        "div.color {float: left; border: 1px solid #808080; height: 9px; " +
        "overflow: hidden; width: 9px; cursor: pointer;}";
    head.appendChild(style);
    var div = document.createElement("div");
    div.id = "colorDiv";
    div.style.display = "none";
    div.innerHTML =
        '<div class="wrapper">' +
        '<div class="color" style="background-color: #000000;"></div>' +
        '<div class="color" style="background-color: #993300;"></div>' +
        '<div class="color" style="background-color: #333300;"></div>' +
        '<div class="color" style="background-color: #003300;"></div>' +
        '<div class="color" style="background-color: #003366;"></div>' +
        '<div class="color" style="background-color: #000080;"></div>' +
        '<div class="color" style="background-color: #333399;"></div>' +
        '<div class="color" style="background-color: #333333;"></div>' +
        '</div><div class="wrapper">' +
        '<div class="color" style="background-color: #800000;"></div>' +
        '<div class="color" style="background-color: #FF6600;"></div>' +
        '<div class="color" style="background-color: #808000;"></div>' +
        '<div class="color" style="background-color: #008000;"></div>' +
        '<div class="color" style="background-color: #008080;"></div>' +
        '<div class="color" style="background-color: #0000FF;"></div>' +
        '<div class="color" style="background-color: #666699;"></div>' +
        '<div class="color" style="background-color: #808080;"></div>' +
        '</div><div class="wrapper">' +
        '<div class="color" style="background-color: #FF0000;"></div>' +
        '<div class="color" style="background-color: #FF9900;"></div>' +
        '<div class="color" style="background-color: #99CC00;"></div>' +
        '<div class="color" style="background-color: #339966;"></div>' +
        '<div class="color" style="background-color: #33CCCC;"></div>' +
        '<div class="color" style="background-color: #3366FF;"></div>' +
        '<div class="color" style="background-color: #800080;"></div>' +
        '<div class="color" style="background-color: #999999;"></div>' +
        '</div><div class="wrapper">' +
        '<div class="color" style="background-color: #FF00FF;"></div>' +
        '<div class="color" style="background-color: #FFCC00;"></div>' +
        '<div class="color" style="background-color: #FFFF00;"></div>' +
        '<div class="color" style="background-color: #00FF00;"></div>' +
        '<div class="color" style="background-color: #00FFFF;"></div>' +
        '<div class="color" style="background-color: #00CCFF;"></div>' +
        '<div class="color" style="background-color: #993366;"></div>' +
        '<div class="color" style="background-color: #C0C0C0;"></div>' +
        '</div><div class="wrapper">' +
        '<div class="color" style="background-color: #FF99CC;"></div>' +
        '<div class="color" style="background-color: #FFCC99;"></div>' +
        '<div class="color" style="background-color: #FFFF99;"></div>' +
        '<div class="color" style="background-color: #CCFFCC;"></div>' +
        '<div class="color" style="background-color: #CCFFFF;"></div>' +
        '<div class="color" style="background-color: #99CCFF;"></div>' +
        '<div class="color" style="background-color: #CC99FF;"></div>' +
        '<div class="color" style="background-color: #FFFFFF;"></div>' +
        '</div>';
    var divs = document.evaluate(".//div[@class='color']", div, null, 
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < divs.snapshotLength; i++) {
        divs.snapshotItem(i).addEventListener('click', postColorTag, false);
    }
    return div;
}   

function initEmoticons() {
    var iconDiv = document.createElement("div");
    iconDiv.style.display = "none";
    iconDiv.appendChild(createImg("/forum/static/gfx/forum/emoticons/happy.gif",
        "happy", ":-)", postEmoticons));
    iconDiv.appendChild(createImg("/forum/static/gfx/forum/emoticons/sad.gif",
        "sad", ":-(", postEmoticons));
    iconDiv.appendChild(createImg("/forum/static/gfx/forum/emoticons/grin.gif",
        "grin", ":D", postEmoticons));
    iconDiv.appendChild(createImg("/forum/static/gfx/forum/emoticons/love.gif",
        "love", ":x", postEmoticons));
    iconDiv.appendChild(createImg("/forum/static/gfx/forum/emoticons/cool.gif",
        "cool", "B-)", postEmoticons));
    iconDiv.appendChild(createImg("/forum/static/gfx/forum/emoticons/devil.gif",
        "devil", "]:)", postEmoticons));
    iconDiv.appendChild(createImg("/forum/static/gfx/forum/emoticons/silly.gif",
        "silly", ":p", postEmoticons));
    iconDiv.appendChild(createImg("/forum/static/gfx/forum/emoticons/angry.gif",
        "angry", "X-(", postEmoticons));
    iconDiv.appendChild(createImg("/forum/static/gfx/forum/emoticons/laugh.gif",
        "laugh", ":^0", postEmoticons));
    iconDiv.appendChild(createImg("/forum/static/gfx/forum/emoticons/wink.gif",
        "wink", ";-)", postEmoticons));
    iconDiv.appendChild(createImg("/forum/static/gfx/forum/emoticons/blush.gif",
        "blush", ":8}", postEmoticons));
    iconDiv.appendChild(createImg("/forum/static/gfx/forum/emoticons/cry.gif",
        "cry", ":_|", postEmoticons));
    iconDiv.appendChild(createImg("/forum/static/gfx/forum/emoticons/confused.gif",
        "confused", "?:|", postEmoticons));
    iconDiv.appendChild(createImg("/forum/static/gfx/forum/emoticons/shocked.gif",
        "shocked", ":0", postEmoticons));
    iconDiv.appendChild(createImg("/forum/static/gfx/forum/emoticons/plain.gif",
        "plain", ":|", postEmoticons));
    iconDiv.appendChild(createImg("/forum/static/gfx/forum/emoticons/mischief.gif",
        "mischief", ";\\", postEmoticons));
    iconDiv.appendChild(createImg("/forum/static/gfx/forum/emoticons/info.gif",
        "info", " (i) ", postEmoticons));
    iconDiv.appendChild(createImg("/forum/static/gfx/forum/emoticons/alert.gif",
        "alert", " (!) ", postEmoticons));
    iconDiv.appendChild(createImg("/forum/static/gfx/forum/emoticons/plus.gif",
        "plus", " (+) ", postEmoticons));
    iconDiv.appendChild(createImg("/forum/static/gfx/forum/emoticons/minus.gif",
        "minus", " (-) ", postEmoticons));
    iconDiv.appendChild(createImg(CLOSEGIF, "close", "close",
        closeEmoticons));
    return iconDiv;
}

function createImg(URL, title, alt, func) {
    var img =  document.createElement("img");
    img.src = URL;
    img.title = title;
    img.alt = alt;
    img.setAttribute("style", "border: 0px; cursor: pointer; " +
        "margin: 0px 5px 3px;" );
    img.addEventListener('click', func, false);
    return img;
}

function postEmoticons(event) {
    var strings = getStrings();
    tarea.value = strings[0] + event.target.alt + strings[2];
    emoticonsDiv.style.display = "none";
    tarea.focus();
}

function closeEmoticons(event) {
    emoticonsDiv.style.display = "none";
    tarea.focus();
}

function showEmoticons(event) {
    emoticonsDiv.style.display = "";
    tarea.focus();
}

function showColors(event) {
    if (colorDiv.style.display == "") {
        colorDiv.style.display = "none";
    } else {
        colorDiv.style.display = "";
    }
    tarea.focus();
}

}

})();