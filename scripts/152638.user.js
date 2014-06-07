// ==UserScript==
// @name           Travian4 Plus Tool Hacked
// @namespace      http://userscripts.org/scripts/show/63218
// @version        10.0.3.6
// @author         [script by ww_start_t], [css by Dream1]
// @license        Creative Commons
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/jquery-ui.min.js
// @description    Varios Tools For Travian v4
// @include        http://*t*.travian.*/*
// ==/UserScript==

/****************************************************

Original script not issued, this script is under update
This script is full compatible with other scripts.

*****************************************************/
function ID(id) { return document.getElementById(id) };
function exp(href) { return document.location.href.match(href) };
function xpath(path) { return document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); };
function CLASS(cn) { return document.getElementsByClassName(cn) };
function C(value) { return parseInt(value) };
function ReLoadTime(Time) { var p = Time.split(":"); return (p[0] * 86400) + (p[1] * 3600) + (p[2] * 60) + (p[3] * 1); };
function MakeNum(value) { return value.toString().replace(/\d(?=(\d{3})+(\D|$))/g, "$&,"); }
function Time(x, y) { return format(Math.abs(Math.round(x / y))); };
function Create(tagName) { return document.createElement(tagName) };
function TAG(tagName) { return document.getElementsByTagName(tagName) };
function GM_addStyle(css) {
    for (cx = 0; cx < css.split('}').length; cx++) { css = css.replace('}', '}\n'); };
    document.getElementsByName('T4PTH')[0].appendChild(document.createTextNode(css));
};

var RTL = document.defaultView.getComputedStyle(document.body, null).getPropertyValue('direction');

var About = {
    Version: { Now: '10.0.3.6', New: '10.0.3.7' },
    Script: { Page: 'http://userscripts.org/scripts/show/63218', Download: 'http://userscripts.org/scripts/source/63218.user.js' }
};

$('<span style="position: absolute; left: 10px; top: 30px; font-size: 10.5px"><u>Travian4 Plus Tool hacked</u> <b id="this.version">' + About.Version.Now + '</b></span>')
.appendTo($('#logoutContainer'));

var style = Create('style');
style.setAttribute('name', 'T4PTH');
style.setAttribute('type', 'text/css');
TAG('head')[0].appendChild(style);

var uSpeed = 'data:image/gif;base64,R0lGODlhGgAQAPcAAAAAAAICAgQEBAYGBgkJCQ0NDRAQEBISEhYWFhkZGR0dHR8fHyIiIiQkJCYmJigoKCsrKy4uLjMzMzU1NTc3Nzg4OD4+PkFBQUdHR0tLS01NTU9PT1JSUldXV1lZWV5eXmJiYmVlZWdnZ2hoaHFxcXNzc3R0dHd3d3l5eYGBgYKCgoSEhIaGhomJiYqKioyMjI2NjY+Pj5CQkJGRkZWVlZqampubm5ycnKGhoaampqioqKurq6+vr7Ozs7S0tLW1tbi4uLm5ub6+vr+/v8PDw8fHx8nJycrKyszMzM7Ozs/Pz9HR0dLS0tfX193d3d7e3uDg4OHh4eLi4uPj4+Tk5Ofn5+jo6Onp6erq6uzs7O/v7/Dw8PLy8vPz8/T09PX19fb29vj4+Pn5+fv7+/z8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAaABAAAAj/AP8J/FcFQwMcZwYqXMhw4AkAAApoGYhFCJGGGGFAhGCFyQ0QCgQMiPEE48IuKToQEWFAQAAKJSwI0ADE5EIzQSASaAHm3xUXABoMaYhCBpmBYiQkgFGgAIswAn0YAPCizMIIAEI4EcgDgI1/RS4AyLBEIBMMHo4qrOIBwIIjWhgw+CIwjIoCCXII9NKTIRkaBwpYAKBjIBgkGyCSmGLzn5IHACJ4+RdlhswADigIaFCk8ZQVSf5ZURBxxI8rXGg0nbGlsUAxLAQcqKHQSIQAGqS4FtgDsgjGAqmYAKCAx5jdUj4EhaJwxwEBJrjsNgNjQlmFTDgAqJBl9z/pDMOkBEDQJCAAOw==';
var imghero = "data:image/gif;base64,R0lGODlhEAAQANU/AM+qcPCrU/fDcOJXD/Xamt5UBPRtJtO5gq9ZAdywWa51F/mMKv/91ON6Gv/wtNyHJ7SEM/qXR//++v/99P73xqltKvjow/eENsZZB/11CPeVNuW3bOxsA/zXquLPpv/97NxhAf//3MacSv3x1MxMAf7z4v/np//23c+ZOvavY8deF9NTCePDg+nQif2+du2JOeHbs8uXY+/do+Tpwch5H+vr1NBuHdt4Ec2BMfzu1/v28dGBOdnAmuW8e/327P///yH5BAEAAD8ALAAAAAAQABAAAAamwJ9w+JtQGMQksSSjTJRJSSdB+ECXrkdgdBVOOhFOgyAhSiSMNMW1yIACjmNJUoOxBPhAG3QLbHoHHj8zGw8LGogNHCAgChAAFj8fDgENCxcXBgMFKxWQZZImKZmaKyQqADmgRQwmEQacGAg7XEkhBC8FJLIIOCdKDAI2GA8oCgg0kUQTDiIVMRY5BxAKPKuSLSI8OkI+BCIHVkMTMgQ+RCcEHk8/QQA7";
var imgatti = "data:image/gif;base64,R0lGODlhEAAQAOYAAJoxM5EqLocoK8BKTre6vsnKy6mqq/T58nu0X1qNQOTv3srivFN8OU1zNVuGPnGiUFqAQXqnXJG9c4yyc4Kla+rz5FqEPVF3N0xuNGqYSoKtZIWvaIClZoivbZnAfpq9gcfcuNnozsXatevv4vH06vj49KGhoJ2dnNjUwevj1uamSNKeUuKrW7+RT7SKTeizZLOMVKOCUamPaa2VcsashtnBnamXfMSxlsOJN7KEQ+fWv9HLw7Kro/Ls5qmop7KNeqRuX71vZrJVTqlSTbtMTOrq6unp6eXl5ePj4+Li4t3d3dra2tjY2NbW1tDQ0M7OzsrKysnJycjIyMbGxsXFxcPDw729vbu7u7m5ubi4uLa2trW1tbOzs66urqurq6mpqaWlpaOjo6KiopOTk////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGQALAAAAAAQABAAAAengFlWWmSFhlJXXIZkYFFFUYtNSklii2RdVUdPhV1JS16WhSZTSFBPVEhjoYZfS0xYRlsFq4ZhTU4ntIsEBig/QENBJZY1MDcpPkICAgBEI6EzLywxQQECAQM9ljw5LTo2CwkNCQgVizIrODuFFRkYDhoKiy4qNIsRDRYRILqFGvkZJIgwR2sDAwYWHnjoMEFeqA8NIFi4kGHDBA2rQnCgQILMgQOFAgEAOw==";
var imgattc = "data:image/gif;base64,R0lGODlhEAAQAPcAAAEBAxEYIyktMxIXHictNMnKy1x4kig8TVd4k0JYajFRaUlrhhklLVZnc0ZleElpfGB+j4eXoExTV0VldV15hxsjJ1R4iEdhbU1pdnCLmHCDjCs7Qp+ts0hfZ05ueU1nb0lhaVRud5Oip0pqc5qxuG58gE5VV2tydExnbmJ9hBEVFm+Ch7jEx7C4ulVkZ3+Tl3uFh7m+v77O0Wdtbougo5yqrIqcnrPDxYiQkY6YmbC7vK+6uyswMMvY2MDMzL/Ly3B3d2BmZj9DQz5CQi0wMM7a2s3Z2cPPz73IyLvGxrG8vJukpFNYWMTPz5CYmI6Wlo2VlX6FhX2EhGhublleXs7Z2Tw/Pzs+PikrK52kpJGXlx0eHr/Fxc7a2aawr6avrnN6eW1ycYKHhl9nZTw/PlxhXVNYU4mNiaGhoOamSNKeUr+RT7SKTeizZLOMVKmPaa2VcsashtnBncSxlsOJN7KEQ9HLw7KrowMCAerq6unp6eXl5ePj4+Li4t3d3dra2tjY2NbW1s7OzsrKysnJycjIyMbGxsXFxcPDw729vbu7u7m5ubi4uLa2trW1tbOzs66urqurq6mpqaWlpaOjo6KiopOTkwAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAJgALAAAAAAQABAAAAjfABklaoSpoMFCih4ZxDSJUB5CCwP56VNpISZIiPYIKgipz59IFguiMcRnkKBDfCyFNCjpD6BFehwVKBhBRkhKMVqcMFNmTIASJkJymSEAwIADChoQSGBQjps5O0JsYLDAAAISLDgshNPmUgUMDoqIOfPCSxaDd+qswWNhgoYuVHT8IAPmCKY3aujYUfGAQpMvQYoUyQEDCSY2aeJg8jDiRhEfVnAUyQAhjMUPKXpUgSJkiAQQF7TYNYiCRhEjW6Jg4uFiBZMlCzuIEGyloBMiWIBIWWijhuArBpNMeaIkIAA7";
var Send_attack = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2wcGETotXvSOywAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAACI0lEQVQokW3Lz0uTcQDH8c/3eR5jublfkZZrTNuWUTktDULE6FJ2KfKUB1uSByMaj0H3/oJ67BJEoOJBuoV16hBkOJY/xqPo09A9OpvP1G26Z9uzZ25j+3YMoje8jm+Eo4d0XkrRpKoHKKX4n6RaDMxLKRqOHlJGL9WwtqtD3M6PZ/IlP/4po5UfibG8sLarQy9VwTSZWZ6rFRBJ6IgktDcZ7e+U0cr+iKIJEaVAuGoBjWaWJ5RSrG4m/CtbKUGtWqwXm+tpZ6t5DAAVY3khohSIlc2pHedPjfm8jkkOAHze5qmceoQlWZnYrnMSQojQYGCgHJVQzSlodZt5n9cxBQAMAKTlRf9Vt03s9lh5LbWD1VgWxQqFoZxEt8fGX3PbxVR0wQ8A3La82THzfvqVz8m5rj8I8PJ+AXvpGMJyC9pd5+A9rePbzOvwarzy++GIbYUVxt8e2BrPinPB5VvHueRg2tiJuLwOk4GFWjEgu/alf11O79wbHB5uu3Q5xAHAGVPF1Ww3WCRpExfaZtF3tw8cy0JamIW0IcNhr7c0GSsuAOAS0o9A8OsnQYomSLFEVUIY9WQx3sJyddiIFWP7B2lL9ojYjJ8/TvTcPrayN7y20NKvfVKrUTx78XLUc6Vrci64fFOnDdk7A4OPe3t7fi6Ggvf3DjVSyyn9XJkxoVqtYejJKO9t75oCAKPp+QDHnYDT5RIBfB8aeWqd/vBOKDFG/AFEDxKNtU2dSAAAAABJRU5ErkJggg%3D%3D';
var Send_resource = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAMCAYAAAC5tzfZAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2wcGEgE3nWIm0AAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAABO0lEQVQokX2Qv0tCURTHP9efkFTLoyLQhtTASVpqFiJabGtrtf6AQKKtJaS9waHGBh3EhgYlAhch0DsVZBJmWEmkYA49sttg7+Uz6Tudc8/9cDgfoZTCyP7u9m/zk9brEy6hSCSzwnhzDAJrkXkLkE4VcAn+xDEMpFMFc+gP+LirPFi2ANiMQsoaR8eX+AM+mp0e9/UGuYsi5ZsO8VhUjYSKstqHy2W67Rc2N1ZZiSyzGJ5GV8ICikERAFe5QzU1G6DZqCBlDYDr27pFhm0UYCQcngMgFPRatpnQ+emBBTDqQfDPTZpm2v838VhU2QDOTvbU82PbMmw2Kpa+KKvoqm/evrTgVl+fOpl8iY9Om3FPj27nzfwsZc0063basYsheztb66r1rpv9xJiLUNDLjDZJJl9C8zhJJLPiG9UDhfU4C7tHAAAAAElFTkSuQmCC';
if (!ID('l1')) { XundefinedX(); };

function LanguagePack() {
    var lng = 'en';
    if (GM_getValue('MyLang')) { lng = GM_getValue('MyLang'); };
    return lng
};
function SubLanguage(sLang, oType) { /* 1=Arabic  2=SimpChinese 3=German 4=English 5=Spanish 6=French 7=Hungary 8=Deutch 9=TradChinese* */
    var subLang = [];                  /* [0]           [1]                [2]                   [3]               [4]          [5]                  [6]            [7]        [8]          [9]            [10]            [11]               [12]                [13]                   [14]                 [15]                 [16]              [17]           [18]       [19]   [20]    [21]  [22]    [23]     [24]          [25]                    [26]                     [27]                 [28]                           [29]                                        [30]                                    [31]                                    [32]            [33]       [34]      [35]      [36]       [37]          [38]*/
    if (sLang == 'ar') subLang['ar'] = ['иЇй?иЅиЙиЏиЇиЏиЇиЊ', 'иЏй?иЊиБ иЇй?й?й?иЇи­иИиЇиЊ', 'иЅиИй?иЇиБ й?иЇиІй?иЉ иЇй?й?иЈиЇй?й?', 'иЅиЎй?иЇиЁ й?иЇиІй?иЉ иЇй?й?иЈиЇй?й?', 'и­й?иИ', 'иЇиБиГиЇй? й?й?иЇиБиЏ иЇй?й?: ', 'иЇиБиГиЇй? й?й?иЇиЊ иЇй?й?: ', 'иЇй?иБй?иЇиЈиЗ', 'иЅиЖиЇй?иЉ', 'иЙй?й?иЇй? иЇй?иБиЇиЈиЗ:', 'иЃиГй? иЇй?иБиЇиЈиЗ:', 'и­иАй? иЇй?иБиЇиЈиЗ:', 'иЇй?иБй?иЇиЈиЗ иЇй?й?иГиЇиЙиЏй?', 'и­иГиЇиЈ иЊиЗй?й?иБ иЇй?й?й?иЇиБиЏ', 'й?и­иЇй?й? иЇй?й?иЙиБй?иЉ иЇй?й?иЗй?иБ', 'и­иГиЇиЈ иЇй?й?иГиЇй?иЉ', 'иЈи­иЋ иЙй? иЇй?й?иБй? иЇй?й?й?и­й?иЉ', 'иЈи­иЋ иЙй? иЇй?й?й?й?й?', 'й?иЕй? иЇй?й?иЗиБ', 'иЈиЏиЃ', 'иЇй?й?иГи­', 'й?й?', 'иЇй?й?', 'иЃй?иЊй?й?', 'иЊи­иЏй?иЋ', 'й?иЏй?й? иЃиЎиБ иЇиЕиЏиЇиБ', 'й?иЏ й?й?й?й? й?иЏй?й? й?иГиЎиЉ иЊиЌиБй?иЈй?иЉ!', 'й?й?иЌиЏ иЃиЕиЏиЇиБ иЌиЏй?иЏ!', 'й?й? иЊиБй?иЏ иЊиЋиЈй?иЊиЉ...и?', 'иЙиБиЖ иБй?иВ иЇиБиГиЇй? иБиГиЇй?иЉ иЈиЌиЇй?иЈ й?й? й?иЇиЙиЈ', 'иЇиИй?иЇиБ иЌиЏй?й? й?иЙй?й?й?иЇиЊ и­й?й? иЇй?й?иЌй?й? й?й? й?й?иЗиЉ иЇй?иЊиЌй?иЙ', 'иЙиБиЖ иБй?й?иВ иЇиБиГиЇй? й?й?иЇиЊ й? й?й?иЇиБиЏ иЈиЌиЇй?иЈ й?й? й?иБй? иЇй?й?иЇиЙиЈй?й?', 'й?й?иЉ иЇй?й?иЌй?й?', 'й?й?иЉ иЇй?иЏй?иЇиЙ', 'иЇй?иЎиГиЇиІиБ', 'й?иЙй?й?й?иЇиЊ', 'иЇй?й?иЇиІиЏиЉ', 'иЇй?иЎиГиЇиІиБ', 'иЌй?й?иЙ иЇй?й?иЇи­иЇиЊ', 'иЃиИй?иЇиБ иЊи­иЏй?иЏ иЇй?й?й? й?й?иБиГиЇиІй? й?иЇй?иЊй?иЇиБй?иБ', 'иЊи­иЏй?иЏ иЇй?й?й?'];
    if (sLang == 'cn') subLang['cn'] = ['шЎОчНЎ', 'шЎАфК?ц?Ќ', 'ц�ОчЄКхЛКч­?х??шЁЈ', 'щ??ш??хЛКч­?х??шЁЈ', 'фП?х­�', 'хА?шЕ?цК?х??щ??х?АяМ?', 'цДОх??щ�?х?АяМ?', 'щ?Оц?Ѕ', 'цЗЛх? ', 'щ?Оц?Ѕх?Ах??яМ?', 'щ?Оц?Ѕх??чЇАяМ?', 'х? щ?Єщ?Оц?ЅяМ?', 'хИЎх?Љщ?Оц?Ѕ', 'шЕ?цК?х??хБ?шЎЁчЎ?х?Ј', 'ц?ЉхБ?ц?�ц??цЈЁц??х?Ј', 'шЗ?чІЛшЎЁчЎ?х?Ј', 'х??ч?Ац?Ѕц?Ох?Ј', 'хЄЇшБЁц?Ѕц?Ох?Ј', 'х??хО?', 'хМ?хЇ?', 'ц?Ћц??', 'фЛ?', 'х?А', 'ч?Ох??цЏ?', 'ц?Дц?А', 'фН ч?Ўх??ц�Џц??ц?Ач??ц?ЌяМ?', 'фН х?ЏфЛЅщ??ц?ЉцЕ?шЏ?Betaч??ц?Ќ', 'ц??ц?Ач??ц?Ќх?Џч?Ј', 'фН ц�Џх?ІшІ?хЎ?шЃ?яМ?', 'ц?Ѕч??хЗВх??щ??фПЁц?Џх?Оц ?', 'ц�ОчЄКц?Лх?ЛфПЁц?ЏшЁЈ', 'ц�ОчЄКцДОх?Кч??х??щ�?/шЕ?цК?', 'ц?Лх?Лц?Й', 'щ�ВхОЁц?Й', 'ц??хЄБ', 'фПЁц?Џ', 'х?ЉцЖІ', 'ц??хЄБ', 'фЛЛфН?чЛПцДВ', 'ц�ОчЄКяМ?щ??ц?Љц??ц??ч??цЖ?ц?Џх??ц?Ѕх??', 'щ??ц?Љх?Јщ?Ј'];
    if (sLang == 'de') subLang['de'] = ['Einstellungen', 'Notebook', 'Zeigt eine Liste von GebУЄuden', 'Hide in der Liste der GebУЄude', 'sparen', 'Send Ressourcen: ', 'Send Armee: ', 'Links', 'Add', 'Link URL:', 'Link Name:', 'Delete Link:', 'Hilfe-Links', 'Rohstoffe - Ausbau-Rechner', 'Erweiterter Kampfsimulator', 'Wegerechner', 'Crop Finder', 'finden Elefanten', 'Radius', 'Start', 'Scan', 'von', 'zu', 'Prozent', "update", "Sie haben eine aktuelle Version!", "Sie kУЖnnen eine Beta-Version haben", "neue Version verfУМgbar", "willst du es .. installieren?", "View icon Nachricht senden", "Tabelle anzeigen zu Angriff info", "Symbole in Angriff zu senden / resource", "Angreifer", "Verteidiger", "Verluste", "Information", "Gewinn", "Verluste", 'jede Oase', 'zeigen, wУЄhlen Sie alle Meldungen und Berichte', 'Alle auswУЄhlen'];
    if (sLang == 'en') subLang['en'] = ['Setting', 'NoteBook', 'Show Buildings List', 'Hide Buildings List', 'Save', 'send resource to: ', 'send army to: ', 'Links', 'Add', 'Link URL:', 'Link Name:', 'Delete Link:', 'help links', 'resource development calculator', 'Extended Combat Simulator', 'distance calculator', 'Crop Finder', 'Elephant Finder', 'Radius', 'Start', 'Scan', 'From', 'To', 'Percent', "update", "You have a latest version!", "You may have a beta version", "new version available", "do you want to install it..?", 'View send message icon', 'Show table info about attack', 'Show send Army/Resource', 'Attacker', 'Defender', 'Losses', "information", "profit", "Losses", "Any oasis", 'Show select all the messages and reports', 'Select All'];
    if (sLang == 'es') subLang['es'] = ['ajustes', 'Cuaderno', 'Mostrar una lista de edificios', 'Ocultar la lista de los edificios', 'ahorrar', "Envoyer des ressources pour:", "Envoyer une armУЉe: ", 'Links', 'AУБadir', 'URL del enlace: ', ' Link Name:', 'Eliminar Link: ', 'Ayudar a los enlaces', 'resource development calculator', 'Simulador de combate avanzado', 'Calculadora del tiempo del recorrido', 'Crop Finder', 'Elephant Finder', 'radio', 'comienzo', 'escanear', 'de', 'a', 'por ciento', "actualizar", "Usted tiene una versiУГn mУЁs reciente", "Usted puede tener una versiУГn beta", "nueva versiУГn disponible", "ТПquieres instalarlo ..?", "Vista de icono enviar un mensaje", "mostrar la tabla de informaciУГn de ataque", "iconos de vista de enviar ataque / recurso", "Atacante", "defensor", "pУЉrdidas", "informaciУГn", "beneficio", "pУЉrdidas", 'cualquier oasis', 'Mostrar, seleccionar todos los mensajes e informes', 'seleccionar todo'];
    if (sLang == 'fa') subLang['fa'] = ['иЊй?иИл?й?иЇиЊ', 'иЏй?иЊиБк?й? л?иЇиЏиЏиЇиДиЊ', 'й?й?иЇл?иД й?л?иГиЊ иГиЇиЎиЊй?иЇй?й?иЇ', 'йОй?й?иЇй? кЉиБиЏй? й?л?иГиЊ иГиЇиЎиЊй?иЇй?й?иЇ', 'иАиЎл?иБй?', 'иЇиБиГиЇй? й?й?иЇиЈиЙ иЈй?: ', 'иЇиБиГиЇй? й?л?иБй? иЈй?: ', 'йОл?й?й?иЏй?иЇ', 'иЇиЖиЇй? кЉиБиЏй?', 'иЂиЏиБиГ й?л?й?кЉ :', 'й?иЇй? й?л?й?кЉ:', 'и­иАй? й?л?й?кЉ:', 'й?л?й?кЉй?иЇл? кЉй?кЉл?', 'й?и­иЇиГиЈй? кЏиБ иЊй?иГиЙй? й?й?иЇиЈиЙ ', 'иДиЈл?й? иГиЇиВ й?иЈиБиЏ иЊй?иГиЙй? л?иЇй?иЊй?', 'й?и­иЇиГиЈй? кЏиБ й?иГиЇй?иЊ', 'кЏй?иЏй? л?иЇиЈ', 'й?л?й? л?иЇиЈ', 'иДиЙиЇиЙ', 'иДиБй?иЙ', 'иЇиГкЉй? кЉй?', 'иЇиВ', 'иЈй?', 'иЏиБ иЕиЏ', "иЈй? иБй?иВ кЉиБиЏй?", "иДй?иЇ иЂиЎиБл?й? й?иГиЎй? иБиЇ иЏиБ иЏиГиЊ иЏиЇиБл?иЏ!", "й?й?кЉй? иЇиГиЊ иДй?иЇ й?иГиЎй? иЈиЊиЇ иБиЇ иЏиЇиДиЊй? иЈиЇиДл?иЏ", "й?иГиЎй? иЌиЏл?иЏ иЏиБ иЏиГиЊиБиГ иЇиГиЊ", "иЂл?иЇ иДй?иЇ й?л? иЎй?иЇй?л?иЏ й?иЕиЈ кЉй?л?иЏ иЇй?иБиЇ..?", 'й?й?иЇл?иД иЂл?кЉй?й? иЇиБиГиЇй? йОл?иЇй?', 'й?й?иЇл?иД иЌиЏй?й? иЇиЗй?иЇиЙиЇиЊ и­й?й?й?', 'й?й?иЇл?иД иЇиБиГиЇй? иЇиБиЊиД/й?й?иЇиЈиЙ', 'й?й?иЇиЌй?', 'й?иЏиЇй?иЙ', 'иЊй?й?иЇиЊ', "иЇиЗй?иЇиЙиЇиЊ", "йОиБй?й?иЇл?й?", "иЊй?й?иЇиЊ", "й?й?й? й?иЇи­й? й?иЇ", 'й?й?иЇл?иД иЈиЇй?иГ иЇй?иЊиЎиЇиЈ й?й?й? йОл?иЇй?й?иЇ й? кЏиВиЇиБиДиЇиЊ', 'иЇй?иЊиЎиЇиЈ й?й?й?'];
    if (sLang == 'fr') subLang['fr'] = ['ParamУЈtres', 'portable', 'Afficher une liste de bУЂtiments', 'Cacher la liste des bУЂtiments', 'Enregistrer', 'Envoyer des ressources pour: ', "De l'envoi d'une armУЉe pour: ", 'Liens', 'Ajouter', 'lien URL:', 'Nom du lien:', 'Supprimer le lien:', 'Aide liens', 'Calculateur dУЉveloppement de ressources', 'Simulateur de combat amУЉliorУЉ', 'distance calculator', 'Crop Finder', 'Elephant Finder', 'rayon', 'dУЉmarrage', 'scan', 'У  partir de', 'У ', 'pour cent', "update", "Vous avez une nouvelle version!", "Vous pouvez avoir une version bУЊta", "nouvelle version disponible", "voulez-vous de l'installer ..?", "Vue en icУДne envoyer un message", "show table sur Info attaque", "icУДnes envoyer attaque / ressource", "Attaquant", "dУЉfenseur", "Pertes", 'informations', 'les bУЉnУЉfices', 'pertes', 'toute oasis', 'Voir, sУЉlectionner tous les messages et les rapports', 'SУЉlectionner tout'];
    if (sLang == 'hu') subLang['hu'] = ['BeУЁllУ­tУЁsok', 'Jegyzetek', 'У?pУМletlista megjelenУ­tУЉse', 'У?pУМletlista elrejtУЉse', 'MentУЉs', 'nyersanyag kУМldУЉse ide: ', 'egysУЉgek kУМldУЉse ide: ', 'Linkek', 'HozzУЁadУЁs', 'Link URL:', 'Link NУЉv:', 'Link tУЖrlУЉse:', 'hasznos linkek', 'nyersanyag fejlХ?dУЉs kalkulУЁtor', 'BХ?vУ­tett harcszimulУЁtor', 'tУЁvolsУЁg kalkulУЁtor', 'BУКzakeresХ?', 'ElefУЁntkeresp', 'SugУЁr', 'Start', 'KeresУЉs', '-tУГl', '-ig', 'SzУЁzalУЉk', "frissУ­tУЉs", "A legУКjabb verziУГval rendelkezel!", "Lehet, hogy bУЉta verziУГval rendelkezel", "elУЉrhetХ? egy УКjabb frissУ­tУЉs", "telepУ­ted?", 'УМzenetkУМldУЉs ikon megjelenУ­tУЉse', 'TУЁmadУЁs tУЁblУЁzatba kiУ­ratУЁsa', 'EgysУЉg/nyersanyag kУМldУЉs megjelenУ­tУЉse', 'TУЁmadУГ', 'VУЉdХ?', 'VesztesУЉgek', "informУЁciУГ", "profit", "VesztesУЉgek", 'Minden oУЁzis', 'Tekintse meg, vУЁlassza az УЖsszes УМzenetek УЉs jelentУЉsek', 'Az УЖsszes kijelУЖlУЉse'];
    if (sLang == 'nl') subLang['nl'] = ['Instellingen', 'Kladblok', 'Laat gebouwen lijst zien', 'Verberg gebouwen lijst', 'Opslaan', 'stuur grondstoffen naar: ', 'stuur troepen naar: ', 'Links', 'Toevoegen', 'Link URL:', 'Link naam:', 'Verwijder link:', 'help links', 'grondstoffen voor ontwikkelingen calculator', 'Uitgebreide veldslagsimulator', 'afstand calculator', 'Graandorp zoeker', 'Olifant zoeker', 'Straal', 'Start', 'Scan', 'Van', 'Naar', 'Procent', "Update", "Je hebt de laatste versie!", "Je hebt misschien een bУЈta versie", "nieuwe versie beschikbaar", "wil je deze installeren?", 'Laat stuur bericht icoon zien', 'Laat informatie tabel over de aanval zien', 'Laat stuur leger/grondstoffen iconen zien', 'Aanvallen', 'Verdediger', 'Verliezen', "Informatie", "Opbrengst", "Verliezen", 'elke oase', 'Bekijk, selecteer alle berichten en rapporten', 'Alles selecteren'];
    if (sLang == 'ru') subLang['ru'] = ['а?аАб?б?б?аОаЙаКаИ', 'а?аЛаОаКаНаОб?', 'а?аОаКаАаЗаАб?б? б?аПаИб?аОаК аЗаДаАаНаИаЙ', 'аЁаПб?б?б?аАб?б? б?аПаИб?аОаК аЗаДаАаНаИаЙ', 'аЁаОб?б?аАаНаИб?б?', 'аОб?аОб?аЛаАб?б? б?аЕб?б?б?б?б? аВ: ', 'аНаАаПб?аАаВаИб?б? аВаОаЙб?аКаА аВ: ', 'аЁб?б?аЛаКаИ', 'а?аОаБаАаВаИб?б?', 'URL б?б?б?аЛаКаИ:', 'а?аАаЗаВаАаНаИаЕ б?б?б?аЛаКаИ:', 'аЃаДаАаЛаИб?б? б?б?б?аЛаКб?:', 'аПаОаЛаЕаЗаНб?аЕ б?б?б?аЛаКаИ', 'а?аАаЛб?аКб?аЛб?б?аОб? б?аАаЗаВаИб?аИб? б?аЕб?б?б?б?аОаВ', 'а аАб?б?аИб?аЕаНаНб?аЙ б?аИаМб?аЛб?б?аОб? б?б?аАаЖаЕаНаИаЙ', 'а?аАаЛб?аКб?аЛб?б?аОб? б?аАб?б?б?аОб?аНаИаЙ', 'а?аОаИб?аК аЗаЕб?аНаА', 'а?аОаИб?аК б?аЛаОаНаОаВ', 'а аАаДаИб?б?', 'аЁб?аАб?б?', 'аЁаКаАаНаИб?аОаВаАаНаИаЕ', 'а?б?', 'а?аОаМб?', 'а?б?аОб?аЕаНб?', "аОаБаНаОаВаЛаЕаНаИаЕ", "аЃ а?аАб? аПаОб?аЛаЕаДаНб?б? аВаЕб?б?аИб?!", "аЃ аВаАб? б?аЕб?б?аОаВаАб? аВаЕб?б?аИб?", "а?аОб?б?б?аПаНаА аНаОаВаАб? аВаЕб?б?аИб?", "аВб? б?аОб?аИб?аЕ б?б?б?аАаНаОаВаИб?б? аЕб? ?", 'а?аОаКаАаЗб?аВаАб?б? аИаКаОаНаКб? аОб?аПб?аАаВаКаИ б?аОаОаБб?аЕаНаИб?', 'а?аОаКаАаЗб?аВаАб?б? б?аАаБаЛаИб?б? аИаНб?аОб?аМаАб?аИаИ аОаБ аАб?аАаКаЕ', 'а?аОаКаАаЗб?аВаАб?б? аИаКаОаНаКб? аОб?аОб?аЛаАб?б? а аЕб?б?б?б?б?/а?аОаЙб?аКаА', 'а?аАаПаАаДаЕаНаИаЕ', 'а?аБаОб?аОаНаА', 'а?аОб?аЕб?аИ', "аИаНб?аОб?аМаАб?аИб?", "аБаОаНб?б?", "а?аОб?аЕб?аИ", "а?б?аБаОаЙ аОаАаЗаИб?", 'а?аОаКаАаЗаАб?б? аВб?аБаОб? аВб?аЕб? б?аОаОаБб?аЕаНаИаЙ аИ аОб?б?аЕб?аОаВ', 'а?б?аБб?аАб?б? аВб?б?'];
    if (sLang == 'tw') subLang['tw'] = ['шЈ­чНЎ', 'шЈ�фК?ц?Ќ', 'щЁЏчЄКхЛКчЏ?х??шЁЈ', 'щ?Бш??хЛКчЏ?х??шЁЈ', 'фП?х­�', 'хА?шГ?цК?ч?Мщ??х?АяМ?', 'цДОшЛ?щ??х?АяМ?', 'щ??ц?Ѕ', 'цЗЛх? ', 'щ??ц?Ѕх?Ах??яМ?', 'щ??ц?Ѕх??чЈБяМ?', 'х?Њщ?Єщ??ц?ЅяМ?', 'хЙЋх?Љщ??ц?Ѕ', 'шГ?цК?ч?МхБ?шЈ?чЎ?х?Ј', 'ц?ДхБ?ц?АщЌЅцЈЁц?Ќх?Ј', 'шЗ?щ?ЂшЈ?чЎ?х?Ј', 'шОВч?Ац?Ѕц?Ох?Ј', 'хЄЇх??ц?Ѕц?Ох?Ј', 'х??хО?', 'щ??хЇ?', 'ц??ц??', 'хО?', 'х?А', 'ч?Ох??цЏ?', 'ц?Дц?А', 'фН ч?Ўх??ц�Џц??ц?Ач??ц?ЌяМ?', 'фН х?ЏфЛЅщ?Иц??цИЌшЉІBetaч??ц?Ќ', 'ц??ц?Ач??ц?Ќх?Џч?Ј', 'фН ц�Џх?ІшІ?хЎ?шЃ?яМ?', 'ц?Ѕч??хЗВч?Мщ??фПЁц?Џх??цЈ?', 'щЁЏчЄКц?Лц??фПЁц?ЏшЁЈ', 'щЁЏчЄКцДОх?Кч??шЛ?щ??/шГ?цК?', 'ц?Лц??ц?Й', 'щ�ВхОЁц?Й', 'ц??хЄБ', 'фПЁц?Џ', 'х?ЉцНЄ', 'ц??хЄБ', 'фЛЛфН?чЖ цДВ', 'ц?Ѕч??яМ?щ?Иц??ч??ц??ц??щ?ЕфЛЖх??х Бх??', 'щ?Иц??х?Јщ?Ј'];
    return subLang[sLang][oType];
};
function NewMathPercent(x) {
    if (x.toString().match(/\d*.\d{4}/)) { return x.toString().match(/\d*.\d{4}/); } else
        if (x.toString().match(/\d*.\d{3}/)) { return x.toString().match(/\d*.\d{3}/); } else
            if (x.toString().match(/\d*.\d{2}/)) { return x.toString().match(/\d*.\d{2}/); } else
                if (x.toString().match(/\d*.\d{1}/)) { return x.toString().match(/\d*.\d{1}/); } else { return x; };
};
function New_Math(x) {
    if (x.toString().match(/\d*.\d{2}/)) { return x.toString().match(/\d*.\d{2}/); } else
        if (x.toString().match(/\d*.\d{1}/)) { return x.toString().match(/\d*.\d{1}/); } else { return x; };
};

var AddUpdate = function () {
    function update() {
        GM_xmlhttpRequest({
            url: About.Script.Page,
            method: "GET",
            onload: function (data) {
                var GetVersion = C($(data.responseText).find('div[id="summary"] p').eq(1).html().split('<b>Version:</b>')[1].replace('.', '').replace('.', '').replace('.', ''));
                var VersionNow = C(About.Version.Now.replace('.', '').replace('.', '').replace('.', ''));
                if (GetVersion == VersionNow) { alert(SubLanguage(LanguagePack(), 25)); } else
                    if (GetVersion < VersionNow) { alert(SubLanguage(LanguagePack(), 26)); } else
                        if (GetVersion > VersionNow) {
                            var ask = window.confirm('' + SubLanguage(LanguagePack(), 27) + '\n' + SubLanguage(LanguagePack(), 28) + '');
                            if (ask) { location.href = About.Script.Download; };
                        };
            }
        });
    }
    var updateIcon = 'data:image/png;base64,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%3D';
    var img = Create('img');
    img.src = updateIcon;
    img.title = '' + SubLanguage(LanguagePack(), 24) + '\nTravian4 Plus Tool hacked';
    img.alt = '' + SubLanguage(LanguagePack(), 24) + '\nTravian4 Plus Tool hacked';
    img.addEventListener('click', update, true);
    img.setAttribute('style', 'cursor: pointer;');
    ID('t4tools').appendChild(img);
};
var trans = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2wMEBBIvqMNOnQAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAAAGklEQVQYlWN89unTfgYCgImQglFFDAwMDAwAndcDm9V2mYsAAAAASUVORK5CYII%3D';
var pos; if (RTL == 'rtl') { pos = 'right'; } else { pos = 'left'; };
var div = Create('div');
div.setAttribute('id', "t4tools");
GM_addStyle('#t4tools { background-color: rgba(255, 255, 255, 0.8); border-radius: 0px 0px 10px 10px; box-shadow: 0px 1px 2px 0px black; position: absolute; ' + (RTL == "ltr" ? "left" : "right") + ': 20px; top: 66px;} #t4tools img {padding: 5px;}');
ID('logo').parentNode.insertBefore(div, ID('logo'));
var bCost = [[0], //dummy
[//lumberCost gid = 1
[0, 0, 0, 0, 0, 0],
[40, 100, 50, 60, 1, 2],
[65, 165, 85, 100, 1, 3],
[110, 280, 140, 165, 2, 4],
[185, 465, 235, 280, 2, 5],
[310, 780, 390, 465, 2, 6],
[520, 1300, 650, 780, 3, 8],
[870, 2170, 1085, 1300, 4, 10],
[1450, 3625, 1810, 2175, 4, 12],
[2420, 6050, 3025, 3630, 5, 14],
[4040, 10105, 5050, 6060, 6, 16], //10
[6750, 16870, 8435, 10125, 7, 18],
[11270, 28175, 14090, 16905, 9, 20],
[18820, 47055, 23525, 28230, 11, 22],
[31430, 78580, 39290, 47150, 13, 24],
[52490, 131230, 65615, 78740, 15, 26],
[87660, 219155, 109575, 131490, 18, 29],
[146395, 365985, 182995, 219590, 22, 32],
[244480, 611195, 305600, 366715, 27, 35],
[408280, 1020695, 510350, 612420, 32, 38],
[681825, 1704565, 852280, 1022740, 38, 41], //20
[1138650, 2846620, 1423310, 1707970, 38, 44],
[1901540, 4753855, 2376925, 2852315, 38, 47],
[3175575, 7938935, 3969470, 4763360, 38, 50],
[5303210, 13258025, 6629015, 7954815, 38, 53],
[8856360, 22140900, 11070450, 13284540, 38, 56]//25
],
[//clayCost gid = 2
[0, 0, 0, 0, 0, 0],
[80, 40, 80, 50, 1, 2],
[135, 65, 135, 85, 1, 3],
[225, 110, 225, 140, 2, 4],
[375, 185, 375, 235, 2, 5],
[620, 310, 620, 390, 2, 6],
[1040, 520, 1040, 650, 3, 8],
[1735, 870, 1735, 1085, 4, 10],
[2900, 1450, 2900, 1810, 4, 12],
[4840, 2420, 4840, 3025, 5, 14],
[8080, 4040, 8080, 5050, 6, 16], //10
[13500, 6750, 13500, 8435, 7, 18],
[22540, 11270, 22540, 14090, 9, 20],
[37645, 18820, 37645, 23525, 11, 22],
[62865, 31430, 62865, 39290, 13, 24],
[104985, 52490, 104985, 65615, 15, 26],
[175320, 87660, 175320, 109575, 18, 29],
[292790, 146395, 292790, 182995, 22, 32],
[488955, 244480, 488955, 305600, 27, 35],
[816555, 408280, 816555, 510350, 32, 38],
[1363650, 681825, 1363650, 852280, 38, 41], //20
[2277295, 1138650, 2277295, 1423310, 38, 44],
[3803085, 1901540, 3803085, 2376925, 38, 47],
[6351150, 3175575, 6351150, 3969470, 38, 50],
[10606420, 5303210, 10606420, 6629015, 38, 53],
[17712720, 8856360, 17712720, 11070450, 38, 56]//25
],
[//ironCost gid = 3
[0, 0, 0, 0, 0, 0],
[100, 80, 30, 60, 1, 3],
[165, 135, 50, 100, 1, 5],
[280, 225, 85, 165, 2, 7],
[465, 375, 140, 280, 2, 9],
[780, 620, 235, 465, 2, 11],
[1300, 1040, 390, 780, 3, 13],
[2170, 1735, 650, 1300, 4, 15],
[3625, 2900, 1085, 2175, 4, 17],
[6050, 4840, 1815, 3630, 5, 19],
[10105, 8080, 3030, 6060, 6, 21], //10
[16870, 13500, 5060, 10125, 7, 24],
[28175, 22540, 8455, 16905, 9, 27],
[47055, 37645, 14115, 28230, 11, 30],
[78580, 62865, 23575, 47150, 13, 33],
[131230, 104985, 39370, 78740, 15, 36],
[219155, 175320, 65745, 131490, 18, 39],
[365985, 292790, 109795, 219590, 22, 42],
[611195, 488955, 183360, 366715, 27, 45],
[1020695, 816555, 306210, 612420, 32, 48],
[1704565, 1363650, 511370, 1022740, 38, 51], //20
[2846620, 2277295, 853985, 1707970, 38, 54],
[4753855, 3803085, 1426155, 2852315, 38, 57],
[7938935, 6351150, 2381680, 4763360, 38, 60],
[13258025, 10606420, 3977410, 7954815, 38, 63],
[22140900, 17712720, 6642270, 13284540, 38, 66]//25
],
[//cropCost gid = 4
[0, 0, 0, 0, 0, 0],
[70, 90, 70, 20, 1, 0],
[115, 150, 115, 35, 1, 0],
[195, 250, 195, 55, 2, 0],
[325, 420, 325, 95, 2, 0],
[545, 700, 545, 155, 2, 0],
[910, 1170, 910, 260, 3, 1],
[1520, 1950, 1520, 435, 4, 2],
[2535, 3260, 2535, 725, 4, 3],
[4235, 5445, 4235, 1210, 5, 4],
[7070, 9095, 7070, 2020, 6, 5], //10
[11810, 15185, 11810, 3375, 7, 6],
[19725, 25360, 19725, 5635, 9, 7],
[32940, 42350, 32940, 9410, 11, 8],
[55005, 70720, 55005, 15715, 13, 9],
[91860, 118105, 91860, 26245, 15, 10],
[153405, 197240, 153405, 43830, 18, 12],
[256190, 329385, 256190, 73195, 22, 14],
[427835, 550075, 427835, 122240, 27, 16],
[714485, 918625, 714485, 204140, 32, 18],
[1193195, 1534105, 1193195, 340915, 38, 20], //20
[1992635, 2561960, 1992635, 569325, 38, 22],
[3327700, 4278470, 3327700, 950770, 38, 24],
[5557255, 7145045, 5557255, 1587785, 38, 26],
[9280620, 11932225, 9280620, 2651605, 38, 28],
[15498630, 19926810, 15498630, 4428180, 38, 30]//25
],
[//sawmillCost gid = 5
[0, 0, 0, 0, 0, 0],
[520, 380, 290, 90, 1, 4],
[935, 685, 520, 160, 1, 6],
[1685, 1230, 940, 290, 2, 8],
[3035, 2215, 1690, 525, 2, 10],
[5460, 3990, 3045, 945, 2, 12]
],
[//brickyardCost gid = 6
[0, 0, 0, 0, 0, 0],
[440, 480, 320, 50, 1, 3],
[790, 865, 575, 90, 1, 5],
[1425, 1555, 1035, 160, 2, 7],
[2565, 2800, 1865, 290, 2, 9],
[4620, 5040, 3360, 525, 2, 11]
],
[//ironFoundryCost gid = 7
[0, 0, 0, 0, 0, 0],
[200, 450, 510, 120, 1, 6],
[360, 810, 920, 215, 1, 9],
[650, 1460, 1650, 390, 2, 12],
[1165, 2625, 2975, 700, 2, 15],
[2100, 4725, 5355, 1260, 2, 18]
],
[//grainMillCost gid = 8
[0, 0, 0, 0, 0, 0],
[500, 440, 380, 1240, 1, 3],
[900, 790, 685, 2230, 1, 5],
[1620, 1425, 1230, 4020, 2, 7],
[2915, 2565, 2215, 7230, 2, 9],
[5250, 4620, 3990, 13015, 2, 11]
],
[//bakeryCost gid = 9
[0, 0, 0, 0, 0, 0],
[1200, 1480, 870, 1600, 1, 4],
[2160, 2665, 1565, 2880, 1, 6],
[3890, 4795, 2820, 5185, 2, 8],
[7000, 8630, 5075, 9330, 2, 10],
[12595, 15535, 9135, 16795, 2, 12]
],
[//warehouseCost gid = 10
[0, 0, 0, 0, 0, 0],
[130, 160, 90, 40, 1, 1],
[165, 205, 115, 50, 1, 2],
[215, 260, 145, 65, 2, 3],
[275, 335, 190, 85, 2, 4],
[350, 430, 240, 105, 2, 5],
[445, 550, 310, 135, 3, 6],
[570, 705, 395, 175, 4, 7],
[730, 900, 505, 225, 4, 8],
[935, 1155, 650, 290, 5, 9],
[1200, 1475, 830, 370, 6, 10], //10
[1535, 1890, 1065, 470, 7, 12],
[1965, 2420, 1360, 605, 9, 14],
[2515, 3095, 1740, 775, 11, 16],
[3220, 3960, 2230, 990, 13, 18],
[4120, 5070, 2850, 1270, 15, 20],
[5275, 6490, 3650, 1625, 18, 22],
[6750, 8310, 4675, 2075, 22, 24],
[8640, 10635, 5980, 2660, 27, 26],
[11060, 13610, 7655, 3405, 32, 28],
[14155, 17420, 9800, 4355, 38, 30]//20
],
[//granaryCost gid = 11
[0, 0, 0, 0, 0, 0],
[80, 100, 70, 20, 1, 1],
[100, 130, 90, 25, 1, 2],
[130, 165, 115, 35, 2, 3],
[170, 210, 145, 40, 2, 4],
[215, 270, 190, 55, 2, 5],
[275, 345, 240, 70, 3, 6],
[350, 440, 310, 90, 4, 7],
[450, 565, 395, 115, 4, 8],
[575, 720, 505, 145, 5, 9],
[740, 920, 645, 185, 6, 10], //10
[945, 1180, 825, 235, 7, 12],
[1210, 1510, 1060, 300, 9, 14],
[1545, 1935, 1355, 385, 11, 16],
[1980, 2475, 1735, 495, 13, 18],
[2535, 3170, 2220, 635, 15, 20],
[3245, 4055, 2840, 810, 18, 22],
[4155, 5190, 3635, 1040, 22, 24],
[5315, 6645, 4650, 1330, 27, 26],
[6805, 8505, 5955, 1700, 32, 28],
[8710, 10890, 7620, 2180, 38, 30]//20
],
[//blacksmithCost gid = 12
[0, 0, 0, 0, 0, 0],
[170, 200, 380, 130, 2, 4],
[220, 255, 485, 165, 3, 6],
[280, 330, 625, 215, 3, 8],
[355, 420, 795, 275, 4, 10],
[455, 535, 1020, 350, 5, 12],
[585, 685, 1305, 445, 6, 15],
[750, 880, 1670, 570, 7, 18],
[955, 1125, 2140, 730, 9, 21],
[1225, 1440, 2740, 935, 10, 24],
[1570, 1845, 3505, 1200, 12, 27], //10
[2005, 2360, 4485, 1535, 15, 30],
[2570, 3020, 5740, 1965, 18, 33],
[3290, 3870, 7350, 2515, 21, 36],
[4210, 4950, 9410, 3220, 26, 39],
[5390, 6340, 12045, 4120, 31, 42],
[6895, 8115, 15415, 5275, 37, 46],
[8825, 10385, 19730, 6750, 44, 50],
[11300, 13290, 25255, 8640, 53, 54],
[14460, 17015, 32325, 11060, 64, 58],
[18510, 21780, 41380, 14155, 77, 62]//20
],
[//armouryCost gid = 13
[0, 0, 0, 0, 0, 0],
[180, 250, 500, 160, 2, 4],  //to lvl 1: 180 250 500 160 4 OK
[230, 320, 640, 205, 3, 6],  //to lvl 2: 230 320 640 205 2 OK
[295, 410, 820, 260, 3, 8],  //to lvl 3: 295 410 820 260 2 OK
[375, 525, 1050, 335, 4, 10], //to lvl 4: 375 525 1050 335 2 OK
[485, 670, 1340, 430, 5, 12], //to lvl 5: 485 670 1340 430 2 OK
[620, 860, 1720, 550, 6, 15], //to lvl 6: 620 860 1720 550 3 OK
[790, 1100, 2200, 705, 7, 18],   //to lvl 07: // 790 1100 2200 705 3
[1015, 1405, 2815, 900, 9, 21],  //to lvl 08: // 1015 1405 2815 900 3
[1295, 1800, 3605, 1155, 10, 24], //to lvl 09: 1295 1800 3605 1155 3 OK
[1660, 2305, 4610, 1475, 12, 27], //to lvl 10: // 1660 2305 4610 1475 3 OK
[2125, 2950, 5905, 1890, 15, 30], //to lvl 11: // 2125 2950 5905 1890 3 OK
[2720, 3780, 7555, 2420, 18, 33], //to lvl 12: // 2720 3780 7555 2420 3
[3480, 4835, 9670, 3095, 21, 36], //to lvl 13: // 3480 4835 9670 3095 3 OK
[4455, 6190, 12380, 3960, 26, 39], //to lvl 14: // 4455 6190 12380 3960 3 OK
[5705, 7925, 15845, 5070, 31, 42], //to lvl 15: // 5705 7925 15845 5070 3 OK
[7300, 10140, 20280, 6490, 37, 46], //to lvl 16: // 7300 10140 20280 6490 4 OK
[9345, 12980, 25960, 8310, 44, 50], //to lvl 17: // 9345 12980 25960 8310 4 OK
[11965, 16615, 33230, 10635, 53, 54], //to lvl 18: // 11965 16615 33230 10635 4 OK
[15315, 21270, 42535, 13610, 64, 58], //to lvl 19: //  15315 21270 42535 13610 OK
[19600, 27225, 54445, 17420, 77, 62]  //to lvl 20: //  19600 27225 54445 17420 4
],
[//tournamentSquareCost gid = 14
[0, 0, 0, 0, 0, 0],
[1750, 2250, 1530, 240, 1, 1],
[2240, 2880, 1960, 305, 1, 2],
[2865, 3685, 2505, 395, 2, 3],
[3670, 4720, 3210, 505, 2, 4],
[4700, 6040, 4105, 645, 2, 5],
[6015, 7730, 5255, 825, 3, 6],
[7695, 9895, 6730, 1055, 4, 7],
[9850, 12665, 8615, 1350, 4, 8],
[12610, 16215, 11025, 1730, 5, 9],
[16140, 20755, 14110, 2215, 6, 10], //10
[20660, 26565, 18065, 2835, 7, 12],
[26445, 34000, 23120, 3625, 9, 14],
[33850, 43520, 29595, 4640, 11, 16],
[43330, 55705, 37880, 5940, 13, 18],
[55460, 71305, 48490, 7605, 15, 20],
[70990, 91270, 62065, 9735, 18, 22],
[90865, 116825, 79440, 12460, 22, 24],
[116305, 149540, 101685, 15950, 27, 26],
[148875, 191410, 130160, 20415, 32, 28],
[190560, 245005, 166600, 26135, 38, 30]//20
],
[//mainBuildingCost gid = 15
[0, 0, 0, 0, 0, 0],
[70, 40, 60, 20, 2, 2],
[90, 50, 75, 25, 3, 3],
[115, 65, 100, 35, 3, 4],
[145, 85, 125, 40, 4, 5],
[190, 105, 160, 55, 5, 6],
[240, 135, 205, 70, 6, 8],
[310, 175, 265, 90, 7, 10],
[395, 225, 340, 115, 9, 12],
[505, 290, 430, 145, 10, 14],
[645, 370, 555, 185, 12, 16], //10
[825, 470, 710, 235, 15, 18],
[1060, 605, 905, 300, 18, 20],
[1355, 775, 1160, 385, 21, 22],
[1735, 990, 1485, 495, 26, 24],
[2220, 1270, 1900, 635, 31, 26],
[2840, 1625, 2435, 810, 37, 29],
[3635, 2075, 3115, 1040, 44, 32],
[4650, 2660, 3990, 1330, 53, 35],
[5955, 3405, 5105, 1700, 64, 38],
[7620, 4355, 6535, 2180, 77, 41]//20
],
[//rallyPointCost gid = 16
[0, 0, 0, 0, 0, 0],
[110, 160, 90, 70, 1, 1],
[140, 205, 115, 90, 1, 2],
[180, 260, 145, 115, 2, 3],
[230, 335, 190, 145, 2, 4],
[295, 430, 240, 190, 2, 5],
[380, 550, 310, 240, 3, 6],
[485, 705, 395, 310, 4, 7],
[620, 900, 505, 395, 4, 8],
[795, 1155, 650, 505, 5, 9],
[1015, 1475, 830, 645, 6, 10], //10
[1300, 1890, 1065, 825, 7, 12],
[1660, 2420, 1360, 1060, 9, 14],
[2130, 3095, 1740, 1355, 11, 16],
[2725, 3960, 2230, 1735, 13, 18],
[3485, 5070, 2850, 2220, 15, 20],
[4460, 6490, 3650, 2840, 18, 22],
[5710, 8310, 4675, 3635, 22, 24],
[7310, 10635, 5980, 4650, 27, 26],
[9360, 13610, 7655, 5955, 32, 28],
[11980, 17420, 9800, 7620, 38, 30]//20
],
[//marketplaceCost gid = 17
[0, 0, 0, 0, 0, 0],
[80, 70, 120, 70, 4, 4],
[100, 90, 155, 90, 4, 6],
[130, 115, 195, 115, 5, 8],
[170, 145, 250, 145, 6, 10],
[215, 190, 320, 190, 7, 12],
[275, 240, 410, 240, 9, 15],
[350, 310, 530, 310, 11, 18],
[450, 395, 675, 395, 13, 21],
[575, 505, 865, 505, 15, 24],
[740, 645, 1105, 645, 19, 27], //10
[945, 825, 1415, 825, 22, 30],
[1210, 1060, 1815, 1060, 27, 33],
[1545, 1355, 2320, 1355, 32, 38],
[1980, 1735, 2970, 1735, 39, 41],
[2535, 2220, 3805, 2220, 46, 44],
[3245, 2840, 4870, 2840, 55, 48],
[4155, 3635, 6230, 3635, 67, 52],
[5315, 4650, 7975, 4650, 80, 56],
[6805, 5955, 10210, 5955, 96, 60],
[8710, 7620, 13065, 7620, 115, 64]//20
],
[//embassyCost gid = 18
[0, 0, 0, 0, 0, 0],
[180, 130, 150, 80, 5, 3],
[230, 165, 190, 100, 6, 5],
[295, 215, 245, 130, 7, 7],
[375, 275, 315, 170, 8, 9],
[485, 350, 405, 215, 10, 11],
[620, 445, 515, 275, 12, 13],
[790, 570, 660, 350, 14, 15],
[1015, 730, 845, 450, 17, 17],
[1295, 935, 1080, 575, 21, 19],
[1660, 1200, 1385, 740, 25, 21], //10
[2125, 1535, 1770, 945, 30, 24],
[2720, 1965, 2265, 1210, 36, 27],
[3480, 2515, 2900, 1545, 43, 30],
[4455, 3220, 3715, 1980, 51, 33],
[5705, 4120, 4755, 2535, 62, 36],
[7300, 5275, 6085, 3245, 74, 39],
[9345, 6750, 7790, 4155, 89, 42],
[11965, 8640, 9970, 5315, 106, 45],
[15315, 11060, 12760, 6805, 128, 48],
[19600, 14155, 16335, 8710, 153, 51]//20
],
[//barracksCost gid = 19
[0, 0, 0, 0, 0, 0],
[210, 140, 260, 120, 1, 4],
[270, 180, 335, 155, 1, 6],
[345, 230, 425, 195, 2, 8],
[440, 295, 545, 250, 2, 10],
[565, 375, 700, 320, 2, 12],
[720, 480, 895, 410, 3, 15],
[925, 615, 1145, 530, 4, 18],
[1180, 790, 1465, 675, 4, 21],
[1515, 1010, 1875, 865, 5, 24],
[1935, 1290, 2400, 1105, 6, 27], //10
[2480, 1655, 3070, 1415, 7, 30],
[3175, 2115, 3930, 1815, 9, 33],
[4060, 2710, 5030, 2320, 11, 36],
[5200, 3465, 6435, 2970, 13, 39],
[6655, 4435, 8240, 3805, 15, 42],
[8520, 5680, 10545, 4870, 18, 46],
[10905, 7270, 13500, 6230, 22, 50],
[13955, 9305, 17280, 7975, 27, 54],
[17865, 11910, 22120, 10210, 32, 58],
[22865, 15245, 28310, 13065, 38, 62]//20
],
[//stableCost gid = 20
[0, 0, 0, 0, 0, 0],
[260, 140, 220, 100, 2, 5],
[335, 180, 280, 130, 3, 8],
[425, 230, 360, 165, 3, 11],
[545, 295, 460, 210, 4, 14],
[700, 375, 590, 270, 5, 17],
[895, 480, 755, 345, 6, 20],
[1145, 615, 970, 440, 7, 23],
[1465, 790, 1240, 565, 9, 26],
[1875, 1010, 1585, 720, 10, 29],
[2400, 1290, 2030, 920, 12, 32], //10
[3070, 1655, 2595, 1180, 15, 36],
[3930, 2115, 3325, 1510, 18, 40],
[5030, 2710, 4255, 1935, 21, 44],
[6435, 3465, 5445, 2475, 26, 48],
[8240, 4435, 6970, 3170, 31, 52],
[10545, 5680, 8925, 4055, 37, 56],
[13500, 7270, 11425, 5190, 44, 60],
[17280, 9305, 14620, 6645, 53, 64],
[22120, 11910, 18715, 8505, 64, 68],
[28310, 15245, 23955, 10890, 77, 72]//20
],
[//workshopCost gid = 21
[0, 0, 0, 0, 0, 0],
[460, 510, 600, 320, 4, 3],
[590, 655, 770, 410, 4, 5],
[755, 835, 985, 525, 5, 7],
[965, 1070, 1260, 670, 6, 9],
[1235, 1370, 1610, 860, 7, 11],
[1580, 1750, 2060, 1100, 9, 13],
[2025, 2245, 2640, 1405, 11, 15],
[2590, 2870, 3380, 1800, 13, 17],
[3315, 3675, 4325, 2305, 15, 19],
[4245, 4705, 5535, 2950, 19, 21], //10
[5430, 6020, 7085, 3780, 22, 24],
[6950, 7705, 9065, 4835, 27, 27],
[8900, 9865, 11605, 6190, 32, 30],
[11390, 12625, 14855, 7925, 39, 33],
[14580, 16165, 19015, 10140, 46, 36],
[18660, 20690, 24340, 12980, 55, 39],
[23885, 26480, 31155, 16615, 67, 42],
[30570, 33895, 39875, 21270, 80, 45],
[39130, 43385, 51040, 27225, 96, 48],
[50090, 55535, 65335, 34845, 115, 51]//20
],
[//academyCost gid = 22
[0, 0, 0, 0, 0, 0],
[220, 160, 90, 40, 5, 4],
[280, 205, 115, 50, 6, 6],
[360, 260, 145, 65, 7, 8],
[460, 335, 190, 85, 8, 10],
[590, 430, 240, 105, 10, 12],
[755, 550, 310, 135, 12, 15],
[970, 705, 395, 175, 14, 18],
[1240, 900, 505, 225, 17, 21],
[1585, 1155, 650, 290, 21, 24],
[2030, 1475, 830, 370, 25, 27], //10
[2595, 1890, 1065, 470, 30, 30],
[3325, 2420, 1360, 605, 36, 33],
[4255, 3095, 1740, 775, 43, 36],
[5445, 3960, 2230, 990, 51, 39],
[6970, 5070, 2850, 1270, 62, 42],
[8925, 6490, 3650, 1625, 74, 46],
[11425, 8310, 4675, 2075, 89, 50],
[14620, 10635, 5980, 2660, 106, 54],
[18715, 13610, 7655, 3405, 128, 58],
[23955, 17420, 9800, 4355, 153, 62]//20
],
[//crannyCost gid = 23
[0, 0, 0, 0, 0, 0],
[40, 50, 30, 10, 1, 0],
[50, 65, 40, 15, 1, 0],
[65, 80, 50, 15, 2, 0],
[85, 105, 65, 20, 2, 0],
[105, 135, 80, 25, 2, 0],
[135, 170, 105, 35, 3, 1],
[175, 220, 130, 45, 4, 2],
[225, 280, 170, 55, 4, 3],
[290, 360, 215, 70, 5, 4],
[370, 460, 275, 90, 6, 5]//10
],
[//townhallCost gid = 24
[0, 0, 0, 0, 0, 0],
[1250, 1110, 1260, 600, 6, 4],
[1600, 1420, 1615, 770, 7, 6],
[2050, 1820, 2065, 985, 9, 8],
[2620, 2330, 2640, 1260, 10, 10],
[3355, 2980, 3380, 1610, 12, 12],
[4295, 3815, 4330, 2060, 15, 15],
[5500, 4880, 5540, 2640, 18, 18],
[7035, 6250, 7095, 3380, 21, 21],
[9005, 8000, 9080, 4325, 26, 24],
[11530, 10240, 11620, 5535, 31, 27], //10
[14755, 13105, 14875, 7085, 37, 30],
[18890, 16775, 19040, 9065, 45, 33],
[24180, 21470, 24370, 11605, 53, 36],
[30950, 27480, 31195, 14855, 64, 39],
[39615, 35175, 39930, 19015, 77, 42],
[50705, 45025, 51110, 24340, 92, 46],
[64905, 57635, 65425, 31155, 111, 50],
[83075, 73770, 83740, 39875, 133, 54],
[106340, 94430, 107190, 51040, 160, 58],
[136115, 120870, 137200, 65335, 192, 62]//20
],
[//residenceCost gid = 25
[0, 0, 0, 0, 0, 0],
[580, 460, 350, 180, 2, 1],
[740, 590, 450, 230, 3, 2],
[950, 755, 575, 295, 3, 3],
[1215, 965, 735, 375, 4, 4],
[1555, 1235, 940, 485, 5, 5],
[1995, 1580, 1205, 620, 6, 6],
[2550, 2025, 1540, 790, 7, 7],
[3265, 2590, 1970, 1015, 9, 8],
[4180, 3315, 2520, 1295, 11, 9],
[5350, 4245, 3230, 1660, 12, 10], //10
[6845, 5430, 4130, 2125, 15, 12],
[8765, 6950, 5290, 2720, 18, 14],
[11220, 8900, 6770, 3480, 21, 16],
[14360, 11390, 8665, 4455, 26, 18],
[18380, 14580, 11090, 5705, 31, 20],
[23530, 18660, 14200, 7300, 37, 22],
[30115, 23885, 18175, 9345, 44, 24],
[38550, 30570, 23260, 11965, 53, 26],
[49340, 39130, 29775, 15315, 64, 28],
[63155, 50090, 38110, 19600, 77, 30]//20
],
[//palaceCost gid = 26
[0, 0, 0, 0, 0, 0],
[550, 800, 750, 250, 6, 1],
[705, 1025, 960, 320, 7, 2],
[900, 1310, 1230, 410, 9, 3],
[1155, 1680, 1575, 525, 10, 4],
[1475, 2145, 2015, 670, 12, 5],
[1890, 2750, 2575, 860, 15, 6],
[2420, 3520, 3300, 1100, 18, 7],
[3095, 4505, 4220, 1405, 21, 8],
[3965, 5765, 5405, 1800, 26, 9],
[5075, 7380, 6920, 2305, 31, 10], //10
[6495, 9445, 8855, 2950, 37, 12],
[8310, 12090, 11335, 3780, 45, 14],
[10640, 15475, 14505, 4835, 53, 16],
[13615, 19805, 18570, 6190, 64, 18],
[17430, 25355, 23770, 7925, 77, 20],
[22310, 32450, 30425, 10140, 92, 22],
[28560, 41540, 38940, 12980, 111, 24],
[36555, 53170, 49845, 16615, 133, 26],
[46790, 68055, 63805, 21270, 160, 28],
[59890, 87110, 81670, 27225, 192, 30]//20
],
[//treasuryCost gid = 27
[0, 0, 0, 0, 0, 0],
[2880, 2740, 2580, 990, 7, 4],
[3630, 3450, 3250, 1245, 9, 6],
[4570, 4350, 4095, 1570, 10, 8],
[5760, 5480, 5160, 1980, 12, 10],
[7260, 6905, 6505, 2495, 15, 12],
[9145, 8700, 8195, 3145, 18, 15],
[11525, 10965, 10325, 3960, 21, 18],
[14520, 13815, 13010, 4990, 26, 21],
[18295, 17405, 16390, 6290, 31, 24],
[23055, 21930, 20650, 7925, 37, 27], //10
[29045, 27635, 26020, 9985, 45, 30],
[36600, 34820, 32785, 12580, 53, 33],
[46115, 43875, 41310, 15850, 64, 36],
[58105, 55280, 52050, 19975, 77, 39],
[73210, 69655, 65585, 25165, 92, 42],
[92245, 87760, 82640, 31710, 111, 46],
[116230, 110580, 104125, 39955, 133, 50],
[146450, 139330, 131195, 50340, 160, 54],
[184530, 175560, 165305, 63430, 192, 58],
[232505, 221205, 208285, 79925, 230, 62]//20
],
[//tradeOfficeCost gid = 28
[0, 0, 0, 0, 0, 0],
[1400, 1330, 1200, 400, 4, 3],
[1790, 1700, 1535, 510, 4, 5],
[2295, 2180, 1965, 655, 5, 7],
[2935, 2790, 2515, 840, 6, 9],
[3760, 3570, 3220, 1075, 7, 11],
[4810, 4570, 4125, 1375, 9, 13],
[6155, 5850, 5280, 1760, 11, 15],
[7880, 7485, 6755, 2250, 13, 17],
[10090, 9585, 8645, 2880, 15, 19],
[12915, 12265, 11070, 3690, 19, 21], //10
[16530, 15700, 14165, 4720, 22, 24],
[21155, 20100, 18135, 6045, 27, 27],
[27080, 25725, 23210, 7735, 32, 30],
[34660, 32930, 29710, 9905, 39, 33],
[44370, 42150, 38030, 12675, 46, 36],
[56790, 53950, 48680, 16225, 55, 39],
[72690, 69060, 62310, 20770, 67, 42],
[93045, 88395, 79755, 26585, 80, 45],
[119100, 113145, 102085, 34030, 96, 48],
[152445, 144825, 130670, 43555, 115, 51]//20
],
[//greatBarrackCost gid = 29
[0, 0, 0, 0, 0, 0],
[630, 420, 780, 360, 1, 4],
[805, 540, 1000, 460, 1, 6],
[1030, 690, 1280, 590, 2, 8],
[1320, 880, 1635, 755, 2, 10],
[1690, 1125, 2095, 965, 2, 12],
[2165, 1445, 2680, 1235, 3, 15],
[2770, 1845, 3430, 1585, 4, 18],
[3545, 2365, 4390, 2025, 4, 21],
[4540, 3025, 5620, 2595, 5, 24],
[5810, 3875, 7195, 3320, 6, 27], //10
[7440, 4960, 9210, 4250, 7, 30],
[9520, 6345, 11785, 5440, 9, 33],
[12185, 8125, 15085, 6965, 11, 36],
[15600, 10400, 19310, 8915, 13, 39],
[19965, 13310, 24720, 11410, 15, 42],
[25555, 17035, 31640, 14605, 18, 46],
[32710, 21810, 40500, 18690, 22, 50],
[41870, 27915, 51840, 23925, 27, 54],
[53595, 35730, 66355, 30625, 32, 58],
[68600, 45735, 84935, 39200, 38, 62]//20
],
[//greatStableCost gid = 30
[0, 0, 0, 0, 0, 0],
[780, 420, 660, 300, 2, 5],
[1000, 540, 845, 385, 3, 8],
[1280, 690, 1080, 490, 3, 11],
[1635, 880, 1385, 630, 4, 14],
[2095, 1125, 1770, 805, 5, 17],
[2680, 1445, 2270, 1030, 6, 20],
[3430, 1845, 2905, 1320, 7, 23],
[4390, 2365, 3715, 1690, 9, 26],
[5620, 3025, 4755, 2160, 10, 29],
[7195, 3875, 6085, 2765, 12, 32], //10
[9210, 4960, 7790, 3540, 15, 36],
[11785, 6345, 9975, 4535, 18, 40],
[15085, 8125, 12765, 5805, 21, 44],
[19310, 10400, 16340, 7430, 26, 48],
[24720, 13310, 20915, 9505, 31, 52],
[31640, 17035, 26775, 12170, 37, 56],
[40500, 21810, 34270, 15575, 44, 60],
[51840, 27915, 43865, 19940, 53, 64],
[66355, 35730, 56145, 25520, 64, 68],
[84935, 45735, 71870, 32665, 77, 72]//20
],
[//citywallCost gid = 31
[0, 0, 0, 0, 0, 0],
[70, 90, 170, 70, 1, 0],
[90, 115, 220, 90, 1, 0],
[115, 145, 280, 115, 2, 0],
[145, 190, 355, 145, 2, 0],
[190, 240, 455, 190, 2, 0],
[240, 310, 585, 240, 3, 1],
[310, 395, 750, 310, 4, 2],
[395, 505, 955, 395, 4, 3],
[505, 650, 1225, 505, 5, 4],
[645, 830, 1570, 645, 6, 5], //10
[825, 1065, 2005, 825, 7, 6],
[1060, 1360, 2570, 1060, 9, 7],
[1355, 1740, 3290, 1355, 11, 8],
[1735, 2230, 4210, 1735, 13, 9],
[2220, 2850, 5390, 2220, 15, 10],
[2840, 3650, 6895, 2840, 18, 12],
[3635, 4675, 8825, 3635, 22, 14],
[4650, 5980, 11300, 4650, 27, 16],
[5955, 7655, 14460, 5955, 32, 18],
[7620, 9800, 18510, 7620, 38, 20]//20
],
[//earthwallCost gid = 32
[0, 0, 0, 0, 0, 0],
[120, 200, 0, 80, 1, 0],
[155, 255, 0, 100, 1, 0],
[195, 330, 0, 130, 2, 0],
[250, 420, 0, 170, 2, 0],
[320, 535, 0, 215, 2, 0],
[410, 685, 0, 275, 3, 1],
[530, 880, 0, 350, 4, 2],
[675, 1125, 0, 450, 4, 3],
[865, 1440, 0, 575, 5, 4],
[1105, 1845, 0, 740, 6, 5], //10
[1415, 2360, 0, 945, 7, 6],
[1815, 3020, 0, 1210, 9, 7],
[2320, 3870, 0, 1545, 11, 8],
[2970, 4950, 0, 1980, 13, 9],
[3805, 6340, 0, 2535, 15, 10],
[4870, 8115, 0, 3245, 18, 12],
[6230, 10385, 0, 4155, 22, 14],
[7975, 13290, 0, 5315, 27, 16],
[10210, 17015, 0, 6805, 32, 18],
[13065, 21780, 0, 8710, 38, 20]//20
],
[//palisadeCost gid = 33
[0, 0, 0, 0, 0, 0],
[160, 100, 80, 60, 1, 0],
[205, 130, 100, 75, 1, 0],
[260, 165, 130, 100, 2, 0],
[335, 210, 170, 125, 2, 0],
[430, 270, 215, 160, 2, 0],
[550, 345, 275, 205, 3, 1],
[705, 440, 350, 265, 4, 2],
[900, 565, 450, 340, 4, 3],
[1155, 720, 575, 430, 5, 4],
[1475, 920, 740, 555, 6, 5], //10
[1890, 1180, 945, 710, 7, 6],
[2420, 1510, 1210, 905, 9, 7],
[3095, 1935, 1545, 1160, 11, 8],
[3960, 2475, 1980, 1485, 13, 9],
[5070, 3170, 2535, 1900, 15, 10],
[6490, 4055, 3245, 2435, 18, 12],
[8310, 5190, 4155, 3115, 22, 14],
[10635, 6645, 5315, 3990, 27, 16],
[13610, 8505, 6805, 5105, 32, 18],
[17420, 10890, 8710, 6535, 38, 20]//20
],
[//stonemasonCost gid = 34
[0, 0, 0, 0, 0, 0],
[155, 130, 125, 70, 1, 2],
[200, 165, 160, 90, 1, 3],
[255, 215, 205, 115, 2, 4],
[325, 275, 260, 145, 2, 5],
[415, 350, 335, 190, 2, 6],
[535, 445, 430, 240, 3, 8],
[680, 570, 550, 310, 4, 10],
[875, 730, 705, 395, 4, 12],
[1115, 935, 900, 505, 5, 14],
[1430, 1200, 1155, 645, 6, 16], //10
[1830, 1535, 1475, 825, 7, 18],
[2340, 1965, 1890, 1060, 9, 20],
[3000, 2515, 2420, 1355, 11, 22],
[3840, 3220, 3095, 1735, 13, 24],
[4910, 4120, 3960, 2220, 15, 26],
[6290, 5275, 5070, 2840, 18, 29],
[8050, 6750, 6490, 3635, 22, 32],
[10300, 8640, 8310, 4650, 27, 35],
[13185, 11060, 10635, 5955, 32, 38],
[16880, 14155, 13610, 7620, 38, 41]//20
],
[//breweryCost gid = 35
[0, 0, 0, 0, 0, 0],
[1460, 930, 1250, 1740, 5, 6],
[2045, 1300, 1750, 2435, 6, 9],
[2860, 1825, 2450, 3410, 7, 12],
[4005, 2550, 3430, 4775, 8, 15],
[5610, 3575, 4800, 6685, 10, 18],
[7850, 5000, 6725, 9360, 12, 22],
[10995, 7000, 9410, 13100, 14, 26],
[15390, 9805, 13175, 18340, 17, 30],
[21545, 13725, 18445, 25680, 21, 34],
[30165, 19215, 25825, 35950, 25, 38]//10
],
[//trapperCost gid = 36
[0, 0, 0, 0, 0, 0],
[80, 120, 70, 90, 1, 4],    // To lvl 1: OK
[100, 155, 90, 115, 1, 6],  // To lvl 2: OK
[130, 195, 115, 145, 2, 8], // To lvl 3: OK
[170, 250, 145, 190, 2, 10], // To lvl 4: OK
[215, 320, 190, 240, 2, 12], // To lvl 5: OK
[275, 410, 240, 310, 3, 15], // To lvl 6: OK
[350, 530, 310, 395, 4, 18], // To lvl 7: OK
[450, 675, 395, 505, 4, 21], // To lvl 8: OK
[575, 865, 505, 650, 5, 24], // To lvl 9: OK
[740, 1105, 645, 830, 6, 27],    // To lvl 10: OK
[945, 1415, 825, 1065, 7, 30], // To lvl 11: OK
[1210, 1815, 1060, 1360, 9, 33], // To lvl 12: OK
[1545, 2320, 1355, 1740, 11, 36], // To lvl 13: OK
[1980, 2970, 1735, 2230, 13, 39], // To lvl 14: OK
[2535, 3805, 2220, 2850, 15, 42], // To lvl 15: OK
[3245, 4870, 2840, 3650, 18, 46], // To lvl 16: OK
[4155, 6230, 3635, 4675, 22, 50], // To lvl 17: OK
[5315, 7975, 4650, 5980, 27, 54], // To lvl 18: OK
[6805, 10210, 5955, 7655, 32, 58], // To lvl 19: OK
[8710, 13065, 7620, 9800, 38, 62] // To lvl 20: OK
],
[//herosMansionCost gid = 37
[0, 0, 0, 0, 0, 0],
[700, 670, 700, 240, 1, 2],
[930, 890, 930, 320, 1, 3],
[1240, 1185, 1240, 425, 2, 4],
[1645, 1575, 1645, 565, 2, 5],
[2190, 2095, 2190, 750, 2, 6],
[2915, 2790, 2915, 1000, 3, 8],
[3875, 3710, 3875, 1330, 4, 10],
[5155, 4930, 5155, 1765, 4, 12],
[6855, 6560, 6855, 2350, 5, 14],
[9115, 8725, 9115, 3125, 6, 16], //10
[12125, 11605, 12125, 4155, 7, 18],
[16125, 15435, 16125, 5530, 9, 20],
[21445, 20525, 21445, 7350, 11, 22],
[28520, 27300, 28520, 9780, 13, 24],
[37935, 36310, 37935, 13005, 15, 24],
[50450, 48290, 50450, 17300, 18, 27],
[67100, 64225, 67100, 23005, 22, 30],
[89245, 85420, 89245, 30600, 27, 33],
[118695, 113605, 118695, 40695, 32, 36],
[157865, 151095, 157865, 54125, 37, 39]//20
],
[//greatWarehouseCost gid = 38
[0, 0, 0, 0, 0, 0, 0],
[650, 800, 450, 200, 1, 1],
[830, 1025, 575, 255, 1, 2],
[1065, 1310, 735, 330, 2, 3],
[1365, 1680, 945, 420, 2, 4],
[1745, 2145, 1210, 535, 2, 5],
[2235, 2750, 1545, 685, 3, 6],
[2860, 3520, 1980, 880, 4, 7],
[3660, 4505, 2535, 1125, 4, 8],
[4685, 5765, 3245, 1440, 5, 9],
[5995, 7380, 4150, 1845, 6, 10], //10
[7675, 9445, 5315, 2360, 7, 12],
[9825, 12090, 6800, 3020, 9, 14],
[12575, 15475, 8705, 3870, 11, 16],
[16095, 19805, 11140, 4950, 13, 18],
[20600, 25355, 14260, 6340, 15, 20],
[26365, 32450, 18255, 8115, 18, 22],
[33750, 41540, 23365, 10385, 22, 24],
[43200, 53170, 29910, 13290, 27, 26],
[55295, 68055, 38280, 17015, 32, 28],
[70780, 87110, 49000, 21780, 38, 30]//20
],
[//greatGranaryCost gid = 39
[0, 0, 0, 0, 0, 0],
[400, 500, 350, 100, 1],
[510, 640, 450, 130, 1, 2],
[655, 820, 575, 165, 2, 3],
[840, 1050, 735, 210, 2, 4],
[1075, 1340, 940, 270, 2, 5],
[1375, 1720, 1205, 345, 3, 6],
[1760, 2200, 1540, 440, 4, 7],
[2250, 2815, 1970, 565, 4, 8],
[2880, 3605, 2520, 720, 5, 9],
[3690, 4610, 3230, 920, 6, 10], //10
[4720, 5905, 4130, 1180, 7, 12],
[6045, 7555, 5290, 1510, 9, 14],
[7735, 9670, 6770, 1935, 11, 16],
[9905, 12380, 8665, 2475, 13, 18],
[12675, 15845, 11090, 3170, 15, 20],
[16225, 20280, 14200, 4055, 18, 22],
[20770, 25960, 18175, 5190, 22, 24],
[26585, 33230, 23260, 6645, 27, 26],
[34030, 42535, 29775, 8505, 32, 28],
[43555, 54445, 38110, 10890, 38, 30]//20
],
[//WWCost gid = 40
[0, 0, 0, 0, 0, 0],
[66700, 69050, 72200, 13200, 0, 1],
[68535, 70950, 74185, 13565, 0, 2],
[70420, 72900, 76225, 13935, 0, 3],
[72355, 74905, 78320, 14320, 0, 4],
[74345, 76965, 80475, 14715, 0, 5],
[76390, 79080, 82690, 15120, 0, 6],
[78490, 81255, 84965, 15535, 0, 7],
[80650, 83490, 87300, 15960, 0, 8],
[82865, 85785, 89700, 16400, 0, 9],
[85145, 88145, 92165, 16850, 0, 10], //10
[87485, 90570, 94700, 17315, 0, 12],
[89895, 93060, 97305, 17790, 0, 14],
[92365, 95620, 99980, 18280, 0, 16],
[94905, 98250, 102730, 18780, 0, 18],
[97515, 100950, 105555, 19300, 0, 20],
[100195, 103725, 108460, 19830, 0, 22],
[102950, 106580, 111440, 20375, 0, 24],
[105785, 109510, 114505, 20935, 0, 26],
[108690, 112520, 117655, 21510, 0, 28],
[111680, 115615, 120890, 22100, 0, 30], //20
[114755, 118795, 124215, 22710, 0, 33],
[117910, 122060, 127630, 23335, 0, 36],
[121150, 125420, 131140, 23975, 0, 39],
[124480, 128870, 134745, 24635, 0, 42],
[127905, 132410, 138455, 25315, 0, 45],
[131425, 136055, 142260, 26010, 0, 48],
[135035, 139795, 146170, 26725, 0, 51],
[138750, 143640, 150190, 27460, 0, 54],
[142565, 147590, 154320, 28215, 0, 57],
[146485, 151650, 158565, 28990, 0, 60], //30
[150515, 155820, 162925, 29785, 0, 64],
[154655, 160105, 167405, 30605, 0, 68],
[158910, 164505, 172010, 31450, 0, 72],
[163275, 169030, 176740, 32315, 0, 76],
[167770, 173680, 181600, 33200, 0, 80],
[172380, 178455, 186595, 34115, 0, 84],
[177120, 183360, 191725, 35055, 0, 88],
[181995, 188405, 197000, 36015, 0, 92],
[186995, 193585, 202415, 37005, 0, 96],
[192140, 198910, 207985, 38025, 0, 100], //40
[197425, 204380, 213705, 39070, 0, 105],
[202855, 210000, 219580, 40145, 0, 110],
[208430, 215775, 225620, 41250, 0, 115],
[214165, 221710, 231825, 42385, 0, 120],
[220055, 227805, 238200, 43550, 0, 125],
[226105, 234070, 244750, 44745, 0, 130],
[232320, 240505, 251480, 45975, 0, 135],
[238710, 247120, 258395, 47240, 0, 140],
[245275, 253915, 265500, 48540, 0, 145],
[252020, 260900, 272800, 49875, 0, 150], //50
[258950, 268075, 280305, 51245, 0, 156],
[266070, 275445, 288010, 52655, 0, 162],
[273390, 283020, 295930, 54105, 0, 168],
[280905, 290805, 304070, 55590, 0, 174],
[288630, 298800, 312430, 57120, 0, 180],
[296570, 307020, 321025, 58690, 0, 186],
[304725, 315460, 329850, 60305, 0, 192],
[313105, 324135, 338925, 61965, 0, 198],
[321715, 333050, 348245, 63670, 0, 204],
[330565, 342210, 357820, 65420, 0, 210], //60
[339655, 351620, 367660, 67220, 0, 217],
[348995, 361290, 377770, 69065, 0, 224],
[358590, 371225, 388160, 70965, 0, 231],
[368450, 381435, 398835, 72915, 0, 238],
[378585, 391925, 409800, 74920, 0, 245],
[388995, 402700, 421070, 76985, 0, 252],
[399695, 413775, 432650, 79100, 0, 259],
[410685, 425155, 444550, 81275, 0, 266],
[421980, 436845, 456775, 83510, 0, 273],
[433585, 448860, 469335, 85805, 0, 280], //70
[445505, 461205, 482240, 88165, 0, 288],
[457760, 473885, 495505, 90590, 0, 296],
[470345, 486920, 509130, 93080, 0, 304],
[483280, 500310, 523130, 95640, 0, 312],
[496570, 514065, 537520, 98270, 0, 320],
[510225, 528205, 552300, 100975, 0, 328],
[524260, 542730, 567490, 103750, 0, 336],
[538675, 557655, 583095, 106605, 0, 344],
[553490, 572990, 599130, 109535, 0, 352],
[568710, 588745, 615605, 112550, 0, 360], //80
[584350, 604935, 632535, 115645, 0, 369],
[600420, 621575, 649930, 118825, 0, 378],
[616930, 638665, 667800, 122090, 0, 387],
[633895, 656230, 686165, 125450, 0, 396],
[651330, 674275, 705035, 128900, 0, 405],
[669240, 692820, 724425, 132445, 0, 414],
[687645, 711870, 744345, 136085, 0, 423],
[706555, 731445, 764815, 139830, 0, 432],
[725985, 751560, 785850, 143675, 0, 441],
[745950, 772230, 807460, 147625, 0, 450], //90
[766460, 793465, 829665, 151685, 0, 460],
[787540, 815285, 852480, 155855, 0, 470],
[809195, 837705, 875920, 160140, 0, 480],
[831450, 860745, 900010, 164545, 0, 490],
[854315, 884415, 924760, 169070, 0, 500],
[877810, 908735, 950190, 173720, 0, 510],
[901950, 933725, 976320, 178495, 0, 520],
[926750, 959405, 1000000, 183405, 0, 530],
[952235, 985785, 1000000, 188450, 0, 540],
[1000000, 1000000, 1000000, 193630, 0, 550]//100
],
[//horsedtCost gid = 41
[0, 0, 0, 0, 0, 0],
[780, 420, 660, 540, 4, 5],
[1000, 540, 845, 690, 4, 8],
[1280, 690, 1080, 885, 5, 11],
[1635, 880, 1385, 1130, 6, 14],
[2095, 1125, 1770, 1450, 7, 17],
[2680, 1445, 2270, 1855, 9, 20],
[3430, 1845, 2905, 2375, 11, 23],
[4390, 2365, 3715, 3040, 13, 26],
[5620, 3025, 4755, 3890, 15, 29],
[7195, 3875, 6085, 4980, 19, 31], //10
[9210, 4960, 7790, 6375, 22, 35],
[11785, 6345, 9975, 8160, 27, 39],
[15085, 8125, 12765, 10445, 32, 43],
[19310, 10400, 16340, 13370, 39, 47],
[24720, 13310, 20915, 17115, 46, 51],
[31640, 17035, 26775, 21905, 55, 55],
[40500, 21810, 34270, 28040, 67, 59],
[51840, 27915, 43865, 35890, 80, 63],
[66355, 35730, 56145, 45940, 96, 67],
[84935, 45735, 71870, 58800, 115, 71]//20
]
];
function xtr(type, value) {
    //0-att 1-def1 2-def2 3-lumber 4-clay 5-iron 6-crop 7-food 8-speed 9-load
    unit = [];
    unit[0] = [0, 0, 0, 0, 0, 0, 0, 0, 42, 0];   // hero
    unit[1] = [40, 35, 50, 120, 100, 180, 40, 1, 12, 40];    // Legionnaire
    unit[2] = [30, 65, 35, 100, 130, 160, 70, 1, 10, 20];    // Praetorian
    unit[3] = [70, 40, 25, 150, 160, 210, 80, 1, 14, 50];    // Imperian
    unit[4] = [0, 20, 10, 140, 160, 20, 40, 2, 32, 0];  // Equites Legati
    unit[5] = [120, 65, 50, 550, 440, 320, 100, 3, 28, 100];    // Equites Imperatoris
    unit[6] = [180, 80, 105, 550, 640, 800, 180, 4, 20, 70];    // Equites Caesaris
    unit[7] = [60, 30, 75, 900, 360, 500, 70, 3, 8, 0]; // Battering Ram
    unit[8] = [75, 60, 10, 950, 1350, 600, 90, 6, 6, 0];    // Fire catapult
    unit[9] = [50, 40, 30, 30750, 27200, 45000, 37500, 8, 4, 0];    // Senator
    unit[10] = [0, 80, 80, 5800, 5300, 7200, 5500, 1, 5, 1600]; // Settler
    unit[11] = [40, 20, 5, 95, 75, 40, 40, 1, 7, 60];   // Clubswinger
    unit[12] = [10, 35, 60, 145, 70, 85, 40, 1, 7, 40]; // Spearfighter
    unit[13] = [60, 30, 30, 130, 120, 170, 70, 1, 6, 50];   // Axefighter
    unit[14] = [0, 10, 5, 160, 100, 50, 50, 1, 9, 0];   // Scout
    unit[15] = [55, 100, 40, 370, 270, 290, 75, 2, 10, 110];    // Paladin
    unit[16] = [150, 50, 75, 450, 515, 480, 80, 3, 9, 80];  // Teuton Knight
    unit[17] = [65, 30, 80, 1000, 300, 350, 70, 3, 4, 0];   // Ram
    unit[18] = [50, 60, 10, 900, 1200, 600, 60, 6, 3, 0];   // Catapult
    unit[19] = [40, 60, 40, 35500, 26600, 25000, 27200, 4, 4, 0];   // Chief
    unit[20] = [10, 80, 80, 7200, 5500, 5800, 6500, 1, 5, 1600];    // Settler
    unit[21] = [15, 40, 50, 100, 130, 55, 30, 1, 7, 30];    // Phalanx
    unit[22] = [65, 35, 20, 140, 150, 185, 60, 1, 6, 45];   // Swordfighter
    unit[23] = [0, 20, 10, 170, 150, 20, 40, 2, 17, 0]; // Pathfinder
    unit[24] = [90, 25, 40, 350, 450, 230, 60, 2, 19, 75];  // Theutates Thunder
    unit[25] = [45, 115, 55, 360, 330, 280, 120, 2, 16, 35];    // Druidrider
    unit[26] = [140, 50, 165, 500, 620, 675, 170, 3, 13, 65];   // Haeduan
    unit[27] = [50, 30, 105, 950, 555, 330, 75, 3, 4, 0];   // Ram
    unit[28] = [70, 45, 10, 960, 1450, 630, 90, 6, 3, 0];   // Trebuchet
    unit[29] = [40, 50, 50, 30750, 45400, 31000, 37500, 4, 5, 0];   // Chieftain
    unit[30] = [0, 80, 80, 5500, 7000, 5300, 4900, 1, 5, 1600]; // Settler
    unit[31] = [10, 25, 10, 0, 0, 0, 0, 1, 20, 0];  // Rat
    unit[32] = [20, 35, 40, 0, 0, 0, 0, 1, 20, 0];  // Spider
    unit[33] = [60, 40, 60, 0, 0, 0, 0, 1, 20, 0];  // Serpent
    unit[34] = [80, 66, 50, 0, 0, 0, 0, 1, 20, 0];  // Bat
    unit[35] = [50, 70, 33, 0, 0, 0, 0, 2, 20, 0];  // Wild boar
    unit[36] = [100, 80, 70, 0, 0, 0, 0, 2, 20, 0]; // Wolf
    unit[37] = [250, 140, 200, 0, 0, 0, 0, 3, 20, 0];   // Bear
    unit[38] = [450, 380, 240, 0, 0, 0, 0, 3, 20, 0];   // Crocodile
    unit[39] = [200, 170, 250, 0, 0, 0, 0, 3, 20, 0];   // Tiger
    unit[40] = [600, 440, 520, 0, 0, 0, 0, 5, 20, 0];   // Elephant
    if (unit[type]) {
        return unit[type][value]
    } else {
        return unit[0][value];
    };
};
function TroopType(Num) {
    var unitType = [];
    unitType[1] = 'i';
    unitType[2] = 'i';
    unitType[3] = 'i';
    unitType[4] = 'c';
    unitType[5] = 'c';
    unitType[6] = 'c';
    unitType[7] = 'i';
    unitType[8] = 'i';
    unitType[9] = 'i';
    unitType[10] = 'i';
    unitType[11] = 'i';
    unitType[12] = 'i';
    unitType[13] = 'i';
    unitType[14] = 'i';
    unitType[15] = 'c';
    unitType[16] = 'c';
    unitType[17] = 'i';
    unitType[18] = 'i';
    unitType[19] = 'i';
    unitType[20] = 'i';
    unitType[21] = 'i';
    unitType[22] = 'i';
    unitType[23] = 'c';
    unitType[24] = 'c';
    unitType[25] = 'c';
    unitType[26] = 'c';
    unitType[27] = 'i';
    unitType[28] = 'i';
    unitType[29] = 'i';
    unitType[30] = 'i';
    unitType[31] = 'c';
    unitType[32] = 'c';
    unitType[33] = 'c';
    unitType[34] = 'c';
    unitType[35] = 'c';
    unitType[36] = 'c';
    unitType[37] = 'c';
    unitType[38] = 'c';
    unitType[39] = 'c';
    unitType[40] = 'c';
    if (unitType[Num]) {
        return unitType[Num];
    } else {
        return unitType[0];
    };
};
function hMove(access) {
    var uSpeed = "data:image/gif;base64,R0lGODlhGgAQAPcAAAAAAAICAgQEBAYGBgkJCQ0NDRAQEBISEhYWFhkZGR0dHR8fHyIiIiQkJCYmJigoKCsrKy4uLjMzMzU1NTc3Nzg4OD4+PkFBQUdHR0tLS01NTU9PT1JSUldXV1lZWV5eXmJiYmVlZWdnZ2hoaHFxcXNzc3R0dHd3d3l5eYGBgYKCgoSEhIaGhomJiYqKioyMjI2NjY+Pj5CQkJGRkZWVlZqampubm5ycnKGhoaampqioqKurq6+vr7Ozs7S0tLW1tbi4uLm5ub6+vr+/v8PDw8fHx8nJycrKyszMzM7Ozs/Pz9HR0dLS0tfX193d3d7e3uDg4OHh4eLi4uPj4+Tk5Ofn5+jo6Onp6erq6uzs7O/v7/Dw8PLy8vPz8/T09PX19fb29vj4+Pn5+fv7+/z8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAaABAAAAj/AP8J/FcFQwMcZwYqXMhw4AkAAApoGYhFCJGGGGFAhGCFyQ0QCgQMiPEE48IuKToQEWFAQAAKJSwI0ADE5EIzQSASaAHm3xUXABoMaYhCBpmBYiQkgFGgAIswAn0YAPCizMIIAEI4EcgDgI1/RS4AyLBEIBMMHo4qrOIBwIIjWhgw+CIwjIoCCXII9NKTIRkaBwpYAKBjIBgkGyCSmGLzn5IHACJ4+RdlhswADigIaFCk8ZQVSf5ZURBxxI8rXGg0nbGlsUAxLAQcqKHQSIQAGqS4FtgDsgjGAqmYAKCAx5jdUj4EhaJwxwEBJrjsNgNjQlmFTDgAqJBl9z/pDMOkBEDQJCAAOw==";

    var str = "<table cellspacing='0' style='width: auto;' class='t4Style'><thead><tr><td colspan='3'><img src='img/x.gif' class='unit u" + access + "'><span> " + CLASS('unit u' + access)[0].alt + "</span>:</td></thead>";
    str = str + "<tbody><tr><td><img src='img/x.gif' class='att_all'><span> " + xtr(access, 0) + "</span></td>";
    str = str + "<td><img src='img/x.gif' class='def_i'><span> " + xtr(access, 1) + "</span></td>";
    str = str + "<td><img src='img/x.gif' class='def_c'><span> " + xtr(access, 2) + "</span></td></tr>";

    str = str + "<tr><td><img src='img/x.gif' class='r5'><span> " + xtr(access, 7) + "</span></td>";
    str = str + "<td><img src='" + uSpeed + "' ><span> " + xtr(access, 8) + "</span></td>";
    str = str + "<td><img src='img/x.gif' class='carry'><span> " + xtr(access, 9) + "</span></td><tr>";

    str = str + "<tr><td colspan='3' style='border-top: 1px dotted;'>";
    str = str + "<img src='img/x.gif' class='r1' /><span> " + xtr(access, 3) + "</span>&nbsp;";
    str = str + "<img src='img/x.gif' class='r2' /><span> " + xtr(access, 4) + "</span>&nbsp;";
    str = str + "<img src='img/x.gif' class='r3' /><span> " + xtr(access, 5) + "</span>&nbsp;";
    str = str + "<img src='img/x.gif' class='r4' /><span> " + xtr(access, 6) + "</span></td></tr>";

    ID("T4_mHelp").innerHTML = str;
    GM_addStyle('.t4Style td {padding: 0px 2px 0px;}');
    ID("T4_mHelp").style.display = "block";
};
function pTime(sec, oType) {
    if (oType == 'sec') {
        var hh = sec.split(':')[0];
        var mm = sec.split(':')[1].split(':')[0];
        var ss = sec.split(':')[2];
        if (hh > 0) hh = C(hh * 3600); else { hh = 0; };
        if (mm > 0) mm = C(mm * 60); else { mm = 0; };
        if (ss > 0) ss = C(ss % 60); else { ss = 0; };
        return C(C(hh) + C(mm) + C(ss));

    } else if (oType == 'time') {

        var s = [];

        HH = Math.round(sec / 3600);
        MM = Math.floor(sec / 60) % 60;
        SS = Math.floor(sec) % 60;

        if (HH < 10) HH = '0' + HH;
        if (MM < 10) MM = '0' + MM;
        if (SS < 10) SS = '0' + SS;
        return ("" + HH + ":" + MM + ":" + SS);

    };
};

function fTime(sec) {
    sec = sec.split(':');

    var hh = sec[0];
    var mm = sec[1];
    var ss = sec[2];

    var dx = parseInt((hh * 3600) + (mm * 60) + (ss % 60));

    d = Math.floor(dx / 86400);
    hh = Math.floor((dx % 86400) / 3600);
    mm = Math.floor(((dx % 86400) % 3600) / 60);
    ss = ((dx % 86400) % 3600) % 60;

    if (hh < 10) hh = '0' + hh;
    if (mm < 10) mm = '0' + mm;
    if (ss < 10) ss = '0' + ss;

    return (d + "d, " + hh + ":" + mm + ":" + ss);

};

function jsPatch(Element) {
    var ClickEvent = document.createEvent("MouseEvents");
    ClickEvent.initMouseEvent("click", true, true);
    Element.dispatchEvent(ClickEvent);
};
function FindNext(elem) {
    do {
        elem = elem.nextSibling;
    } while (elem && elem.nodeType != 1);
    return elem;
};
function FindBefore(elem) {
    do {
        elem = elem.previousSibling;
    } while (elem && elem.nodeType != 1);
    return elem;
};

function getAnimInfo(url, id) {
    ID('T4_mHelp').innerHTML = '<img src="data:image/gif;base64,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" />';
    var time = 1000;
    if (!(ID(id).innerHTML == '')) { time = 0; };
    ID('T4_mHelp').style.display = 'block';
    setTimeout(function () {
        if (xpath('//img[@class="on"]').snapshotItem(0)) {
            if (xpath('//img[@class="on"]').snapshotItem(0).getAttribute('class') == 'on') {
                if (ID(id).innerHTML == '') {
                    httpRequest(url, function (data) {
                        var xHTML = htmltocontext(data.responseText);
                        if (xHTML.getElementById('troop_info').getElementsByClassName('ico')[0]) {
                            var asNext = null;
                            var AnimX = '<table cellspacing="0"><tbody>';
                            var HTML = '<table cellspacing="0"><tbody>';
                            HTML = HTML + '' +
            '<tr><td><img src="img/x.gif" class="r5" /></td><td id="i1" colspan="2">0</td></tr>' +
            '<tr><td><img src="img/x.gif" class="def_i" /></td><td id="i2" colspan="2">0</td></tr>' +
            '<tr><td><img src="img/x.gif" class="def_c" /></td><td id="i3" colspan="2">0</td></tr>';
                            var GetAnimIMG = [];
                            var GetAnimNum = [];
                            var GetAnimNam = [];
                            var Info = new Array(0, 0, 0);
                            var GetLength = xHTML.getElementById('troop_info').getElementsByClassName('ico').length;
                            for (xx = 0; xx < GetLength; xx++) {
                                GetAnimIMG[xx] = xHTML.getElementById('troop_info').getElementsByClassName('ico')[xx].innerHTML;
                                GetAnimNum[xx] = xHTML.getElementById('troop_info').getElementsByClassName('val')[xx].innerHTML;
                                GetAnimNam[xx] = xHTML.getElementById('troop_info').getElementsByClassName('desc')[xx].innerHTML;
                                Info[0] = Info[0] + C(xtr(GetAnimIMG[xx].toString().split('unit u')[1].split('"')[0], 1) * GetAnimNum[xx]);
                                Info[1] = Info[1] + C(xtr(GetAnimIMG[xx].toString().split('unit u')[1].split('"')[0], 2) * GetAnimNum[xx]);
                                Info[2] = Info[2] + C(xtr(GetAnimIMG[xx].toString().split('unit u')[1].split('"')[0], 7) * GetAnimNum[xx]);
                                HTML = HTML + '<tr><td>' + GetAnimIMG[xx] + '</td><td>' + GetAnimNum[xx] + '</td><td>' + GetAnimNam[xx] + '</td></tr>';
                                AnimX = AnimX + '<tr><td>' + GetAnimIMG[xx] + '</td><td>' + GetAnimNum[xx] + '</td><td>' + GetAnimNam[xx] + '</td></tr>';
                            };
                            HTML = HTML + '</tbody></table>';
                            ID('T4_mHelp').innerHTML = HTML;
                            ID(id).innerHTML = '<table cellspacing="0"><tbody><tr><td><img src="img/x.gif" class="r5" />' + Info[2] + '</td><td><img src="img/x.gif" class="def_i" />' + Info[1] + '</td><td><img src="img/x.gif" class="def_c" />' + Info[0] + '</td><tr><tbody></table>';
                            ID('i3').innerHTML = Info[0];
                            ID('i2').innerHTML = Info[1];
                            ID('i1').innerHTML = Info[2];
                            asNext = FindNext(ID(id));
                            asNext.innerHTML = AnimX + '<table></table>';
                            ID('T4_mHelp').style.display = 'block';
                            return TAG('req')[0].parentNode.removeChild(TAG('req')[0]);
                        } else {
                            FindNext(ID(id)).innerHTML = xHTML.getElementById('troop_info').innerHTML;
                            ID(id).innerHTML = xHTML.getElementById('troop_info').innerHTML;
                            ID('T4_mHelp').innerHTML = '<table cellspacing="0">' + xHTML.getElementById('troop_info').innerHTML + '<table>';
                            return TAG('req')[0].parentNode.removeChild(TAG('req')[0]);
                        };
                    });
                } else {
                    var dHTML = FindNext(ID(id)).innerHTML;
                    ID('T4_mHelp').innerHTML = dHTML;
                };
            } else { ID('T4_mHelp').style.display = 'none'; }
        };
    }, time);
};

function htmltocontext(source) {
    if (TAG("req")[0]) TAG("req")[0].parentNode.removeChild(TAG("req")[0]);
    html = document.createElement('req');
    html.setAttribute('style', 'display: none;');
    html.innerHTML = source;
    if (TAG('req')[0]) { xli = TAG('req')[0]; xli.parentNode.removeChild(xli); };
    return document.body.parentNode.appendChild(html);
};

function httpRequest(url, onSuccess) {
    var aR = new XMLHttpRequest();
    aR.onreadystatechange = function () {
        if (aR.readyState == 4 && (aR.status == 200 || aR.status == 304)) {
            onSuccess(aR);
        } else if (aR.readyState == 4 && aR.status != 200) { };
    };
    aR.open("GET", url, true);
    aR.send(null);
};
function XMLGetR(num) {
    document.body.style.cursor = 'wait';
    var xmf = [];
    httpRequest(xpath('//table[@id = "overview"]/tbody/tr[' + num + ']/td[2]/div/a[contains(@href, "berichte.php?id=")]').snapshotItem(0).getAttribute('href'), function (ajax) {
        msg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH3AIHBRYAVGxqEQAAAAd0RVh0QXV0aG9yAKm'
+ 'uzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXI'
+ 'At8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAAByUlEQVQ4jaWTv4riUBTGfy52sTEaETEJOOWWERE'
+ 'R1MJ3mCfQwuex0CfwHRR2AoOFkHLBxkK08H9AtEhu7nWLHQNZZraZW51zP87H73zcm3o8HnznpAHG4/HAcZxXoPlx/w5MHMcZAnieNwASuud5k16vN0yNRqNfhmG0u90umUwGgNvtxuVy4Xg8AmAYBrq'
+ 'uJ/TpdMrxeHz7AbQty0LTNGazGZ7ncTgcME2TSqUCgGmaHA4HPM9jNpuhaRqWZQG001JKpJQopeh0OvFuSqlEbds2tm3H/XMuHUURQgiUUriuSzabJZvNYppmwmCz2eD7Pr7v02q1EEIQRRFpIQRCCKS'
+ 'UNJvNeEhKmahLpRKlUinun3NpIQRhGKKUYj6fxwTFYjFBsNvtYoJGo0EYhn8NwjAkCAKUUtTr9S8zKBQKFAqFuA+CgDAMkwSLxSImyOfzCYPT6RQT1Gq1JMHToFqtfkmg6zq6rsf9cy4O8X9P+jMtEaI'
+ 'QAtd1OZ/PAORyOcrlMi8vLwCsViu2221Cjw2iKGK/37NcLrnf7wBompbI4bn/v3oURaSllG/r9fo3MBmNRu8A/X6/eb1eX9fr9eCDePiZDvxMffc7/wE/BFaShkSgLAAAAABJRU5ErkJggg%3D%3D';
        if (CLASS('XML1')[0]) { xli = CLASS('XML1')[0]; xli.parentNode.removeChild(xli); };
        xmf[1] = htmltocontext(ajax.responseText);
        var table = Create('table');
        table.setAttribute('cellspacing', '1');
        table.setAttribute('class', 'XML1');
        table.setAttribute('style', 'margin: 10px 0px;');
        table.setAttribute('id', 'report_surround');
        table.innerHTML = xmf[1].getElementById('report_surround').innerHTML;
        ID('content').appendChild(table);
        xpath('//table[@id = "overview"]/tbody/tr[' + num + ']/td/input').snapshotItem(0).setAttribute('checked', 'checked');
        xpath('//table[@id = "overview"]/tbody/tr[' + num + ']/td[3]/a/img').snapshotItem(0).setAttribute('src', msg);
        document.body.style.cursor = 'default';
        return TAG('req')[0].parentNode.removeChild(TAG('req')[0]);
    });
};
function getXtime(xyA, xyB) {
    var race = ID('side_info').getElementsByClassName('sideInfoPlayer')[0].getElementsByTagName('img')[0];
    var getY = get_xy(xyB).toString().split(',')[0];
    var getX = get_xy(xyB).toString().split(',')[1];
    var HTML = '';
    if (race.className == 'nationBig nationBig1') {
        var HTML = '<table cellspacing="0" class="t4Style">'; HTML = HTML + '<thead><tr><th colspan="2"><' + New_Math(Distance(xyA, xyB)) + '></th><th style="font-weight: bold; direction: rtl;" colspan="2">(' + getX + ' | ' + getY + ')</th></tr></thead><tbody>';
        HTML = HTML + '<tr><td><img src="img/x.gif" class="unit u1" /></td><td>' + format(Math.round((Distance(xyA, xyB)) / (xtr((1), 8)) * 3600)) + '</td>';
        HTML = HTML + '<td><img src="img/x.gif" class="unit u2" /></td><td>' + format(Math.round((Distance(xyA, xyB)) / (xtr((2), 8)) * 3600)) + '</td></tr>';
        HTML = HTML + '<tr><td><img src="img/x.gif" class="unit u3" /></td><td>' + format(Math.round((Distance(xyA, xyB)) / (xtr((3), 8)) * 3600)) + '</td>';
        HTML = HTML + '<td><img src="img/x.gif" class="unit u4" /></td><td>' + format(Math.round((Distance(xyA, xyB)) / (xtr((4), 8)) * 3600)) + '</td></tr>';
        HTML = HTML + '<tr><td><img src="img/x.gif" class="unit u5" /></td><td>' + format(Math.round((Distance(xyA, xyB)) / (xtr((5), 8)) * 3600)) + '</td>';
        HTML = HTML + '<td><img src="img/x.gif" class="unit u6" /></td><td>' + format(Math.round((Distance(xyA, xyB)) / (xtr((6), 8)) * 3600)) + '</td></tr>';
        HTML = HTML + '<tr><td><img src="img/x.gif" class="unit u7" /></td><td>' + format(Math.round((Distance(xyA, xyB)) / (xtr((7), 8)) * 3600)) + '</td>';
        HTML = HTML + '<td><img src="img/x.gif" class="unit u8" /></td><td>' + format(Math.round((Distance(xyA, xyB)) / (xtr((8), 8)) * 3600)) + '</td></tr>';
        HTML = HTML + '<tr><td><img src="img/x.gif" class="unit u9" /></td><td>' + format(Math.round((Distance(xyA, xyB)) / (xtr((9), 8)) * 3600)) + '</td>';
        HTML = HTML + '<td><img src="img/x.gif" class="unit u10" /></td><td>' + format(Math.round((Distance(xyA, xyB)) / (xtr((10), 8)) * 3600)) + '</td></tr>';
        HTML = HTML + '</tbody></table>';
    };
    if (race.className == 'nationBig nationBig2') {
        var HTML = '<table cellspacing="0" class="t4Style">'; HTML = HTML + '<thead><tr><th colspan="2"><' + New_Math(Distance(xyA, xyB)) + '></th><th style="font-weight: bold; direction: rtl;" colspan="2">(' + getX + ' | ' + getY + ')</th></tr></thead><tbody>';
        HTML = HTML + '<tr><td><img src="img/x.gif" class="unit u11" /></td><td>' + format(Math.round((Distance(xyA, xyB)) / (xtr((11), 8)) * 3600)) + '</td>';
        HTML = HTML + '<td><img src="img/x.gif" class="unit u12" /></td><td>' + format(Math.round((Distance(xyA, xyB)) / (xtr((12), 8)) * 3600)) + '</td></tr>';
        HTML = HTML + '<tr><td><img src="img/x.gif" class="unit u13" /></td><td>' + format(Math.round((Distance(xyA, xyB)) / (xtr((13), 8)) * 3600)) + '</td>';
        HTML = HTML + '<td><img src="img/x.gif" class="unit u14" /></td><td>' + format(Math.round((Distance(xyA, xyB)) / (xtr((14), 8)) * 3600)) + '</td></tr>';
        HTML = HTML + '<tr><td><img src="img/x.gif" class="unit u15" /></td><td>' + format(Math.round((Distance(xyA, xyB)) / (xtr((15), 8)) * 3600)) + '</td>';
        HTML = HTML + '<td><img src="img/x.gif" class="unit u16" /></td><td>' + format(Math.round((Distance(xyA, xyB)) / (xtr((16), 8)) * 3600)) + '</td></tr>';
        HTML = HTML + '<tr><td><img src="img/x.gif" class="unit u17" /></td><td>' + format(Math.round((Distance(xyA, xyB)) / (xtr((17), 8)) * 3600)) + '</td>';
        HTML = HTML + '<td><img src="img/x.gif" class="unit u18" /></td><td>' + format(Math.round((Distance(xyA, xyB)) / (xtr((18), 8)) * 3600)) + '</td></tr>';
        HTML = HTML + '<tr><td><img src="img/x.gif" class="unit u19" /></td><td>' + format(Math.round((Distance(xyA, xyB)) / (xtr((19), 8)) * 3600)) + '</td>';
        HTML = HTML + '<td><img src="img/x.gif" class="unit u20" /></td><td>' + format(Math.round((Distance(xyA, xyB)) / (xtr((20), 8)) * 3600)) + '</td></tr>';
        HTML = HTML + '</tbody></table>';
    };
    if (race.className == 'nationBig nationBig3') {
        var HTML = '<table cellspacing="0" class="t4Style">'; HTML = HTML + '<thead><tr><th colspan="2"><' + New_Math(Distance(xyA, xyB)) + '></th><th style="font-weight: bold; direction: rtl;" colspan="2">(' + getX + ' | ' + getY + ')</th></tr></thead><tbody>';
        HTML = HTML + '<tr><td><img src="img/x.gif" class="unit u21" /></td><td>' + format(Math.round((Distance(xyA, xyB)) / (xtr((21), 8)) * 3600)) + '</td>';
        HTML = HTML + '<td><img src="img/x.gif" class="unit u22" /></td><td>' + format(Math.round((Distance(xyA, xyB)) / (xtr((22), 8)) * 3600)) + '</td></tr>';
        HTML = HTML + '<tr><td><img src="img/x.gif" class="unit u23" /></td><td>' + format(Math.round((Distance(xyA, xyB)) / (xtr((23), 8)) * 3600)) + '</td>';
        HTML = HTML + '<td><img src="img/x.gif" class="unit u24" /></td><td>' + format(Math.round((Distance(xyA, xyB)) / (xtr((24), 8)) * 3600)) + '</td></tr>';
        HTML = HTML + '<tr><td><img src="img/x.gif" class="unit u25" /></td><td>' + format(Math.round((Distance(xyA, xyB)) / (xtr((25), 8)) * 3600)) + '</td>';
        HTML = HTML + '<td><img src="img/x.gif" class="unit u26" /></td><td>' + format(Math.round((Distance(xyA, xyB)) / (xtr((26), 8)) * 3600)) + '</td></tr>';
        HTML = HTML + '<tr><td><img src="img/x.gif" class="unit u27" /></td><td>' + format(Math.round((Distance(xyA, xyB)) / (xtr((27), 8)) * 3600)) + '</td>';
        HTML = HTML + '<td><img src="img/x.gif" class="unit u28" /></td><td>' + format(Math.round((Distance(xyA, xyB)) / (xtr((28), 8)) * 3600)) + '</td></tr>';
        HTML = HTML + '<tr><td><img src="img/x.gif" class="unit u29" /></td><td>' + format(Math.round((Distance(xyA, xyB)) / (xtr((29), 8)) * 3600)) + '</td>';
        HTML = HTML + '<td><img src="img/x.gif" class="unit u30" /></td><td>' + format(Math.round((Distance(xyA, xyB)) / (xtr((30), 8)) * 3600)) + '</td></tr>';
        HTML = HTML + '</tbody></table>';
    };
    return HTML;
};

function gTimeD(xyA, xyB) {
    ID("T4_mHelp").innerHTML = '' + getXtime(xyA, xyB) + '';
    ID("T4_mHelp").style.display = "block";

};
function XPS_Cul(num) {
    ID('x_1').innerHTML = 0;
    ID('x_2').innerHTML = 0;
    ID('x_3').innerHTML = 0;
    ID('x_4').innerHTML = 0;
    ID('x_5').innerHTML = 0;
    ID('x_6').innerHTML = 0;
    ID('x_7').innerHTML = '00:00:00';
    var getLength = CLASS('buildActionOverview trainUnits')[0].getElementsByTagName('div').length;
    var aRes = [], GM = [ID('l1').innerHTML.split('/')[0], ID('l2').innerHTML.split('/')[0], ID('l3').innerHTML.split('/')[0], ID('l4').innerHTML.split('/')[0], 0, 0, 0];
    aRes[0] = CLASS('buildActionOverview trainUnits')[0].getElementsByTagName('input')[num].value;
    aRes[1] = xpath('//div[@class="buildActionOverview trainUnits"]/div[' + (num + 1) + ']//span[@id="XP1_' + (num) + '"]').snapshotItem(0).innerHTML.split(/\D/)[0];
    aRes[2] = xpath('//div[@class="buildActionOverview trainUnits"]/div[' + (num + 1) + ']//span[@id="XP2_' + (num) + '"]').snapshotItem(0).innerHTML.split(/\D/)[0];
    aRes[3] = xpath('//div[@class="buildActionOverview trainUnits"]/div[' + (num + 1) + ']//span[@id="XP3_' + (num) + '"]').snapshotItem(0).innerHTML.split(/\D/)[0];
    aRes[4] = xpath('//div[@class="buildActionOverview trainUnits"]/div[' + (num + 1) + ']//span[@id="XP4_' + (num) + '"]').snapshotItem(0).innerHTML.split(/\D/)[0];
    aRes[5] = xpath('//div[@class="buildActionOverview trainUnits"]/div[' + (num + 1) + ']//span[@id="XP5_' + (num) + '"]').snapshotItem(0).innerHTML;
    aRes[6] = xpath('//div[@class="buildActionOverview trainUnits"]/div[' + (num + 1) + ']//span[@id="XP6_' + (num) + '"]').snapshotItem(0).innerHTML.split(/\D/)[0];
    xpath('//span[@id="A' + (num + 1) + '"]').snapshotItem(0).innerHTML = aRes[0];
    xpath('//span[@id="' + (num + 1) + 'R1"]').snapshotItem(0).innerHTML = aRes[1];
    xpath('//span[@id="' + (num + 1) + 'R2"]').snapshotItem(0).innerHTML = aRes[2];
    xpath('//span[@id="' + (num + 1) + 'R3"]').snapshotItem(0).innerHTML = aRes[3];
    xpath('//span[@id="' + (num + 1) + 'R4"]').snapshotItem(0).innerHTML = aRes[4];
    xpath('//span[@id="' + (num + 1) + 'R5"]').snapshotItem(0).innerHTML = aRes[6];
    xpath('//span[@id="' + (num + 1) + 'R6"]').snapshotItem(0).innerHTML = aRes[5];
    for (x = 0; x < ID('CxS').getElementsByTagName('tbody')[0].getElementsByTagName('tr').length; x++) {
        ID('x_1').innerHTML = C(C(ID('x_1').innerHTML) + C(xpath('//span[@id="A' + (x + 1) + '"]').snapshotItem(0).innerHTML));
        ID('x_2').innerHTML = C(C(ID('x_2').innerHTML) + C(xpath('//span[@id="' + (x + 1) + 'R1"]').snapshotItem(0).innerHTML)) + '<br><font id="l_2"></font>';
        ID('x_3').innerHTML = C(C(ID('x_3').innerHTML) + C(xpath('//span[@id="' + (x + 1) + 'R2"]').snapshotItem(0).innerHTML)) + '<br><font id="l_3"></font>';
        ID('x_4').innerHTML = C(C(ID('x_4').innerHTML) + C(xpath('//span[@id="' + (x + 1) + 'R3"]').snapshotItem(0).innerHTML)) + '<br><font id="l_4"></font>';
        ID('x_5').innerHTML = C(C(ID('x_5').innerHTML) + C(xpath('//span[@id="' + (x + 1) + 'R4"]').snapshotItem(0).innerHTML)) + '<br><font id="l_5"></font>';
        ID('x_6').innerHTML = C(C(ID('x_6').innerHTML) + C(xpath('//span[@id="' + (x + 1) + 'R5"]').snapshotItem(0).innerHTML));
        ID('x_7').innerHTML = C(C(pTime(ID('x_7').innerHTML.toString(), 'sec')) + C(pTime(xpath('//span[@id="' + (x + 1) + 'R6"]').snapshotItem(0).innerHTML, 'sec')));
        ID('x_7').innerHTML = pTime(C(ID('x_7').innerHTML), 'time');
        ID('l_2').innerHTML = '(<font color="' + ((C(C(GM[3]) - C(ID('x_2').innerHTML)) > 0) ? "green" : "red") + '">' + C(C(GM[0]) - C(ID('x_2').innerHTML)) + '</font>)';
        ID('l_3').innerHTML = '(<font color="' + ((C(C(GM[2]) - C(ID('x_3').innerHTML)) > 0) ? "green" : "red") + '">' + C(C(GM[1]) - C(ID('x_3').innerHTML)) + '</font>)';
        ID('l_4').innerHTML = '(<font color="' + ((C(C(GM[1]) - C(ID('x_4').innerHTML)) > 0) ? "green" : "red") + '">' + C(C(GM[2]) - C(ID('x_4').innerHTML)) + '</font>)';
        ID('l_5').innerHTML = '(<font color="' + ((C(C(GM[0]) - C(ID('x_5').innerHTML)) > 0) ? "green" : "red") + '">' + C(C(GM[3]) - C(ID('x_5').innerHTML)) + '</font>)';

    };
};
function tChange(num) {
    var v = CLASS('details')[num].getElementsByTagName('input')[0].value;
    var Me = CLASS('details')[num].getElementsByTagName('input')[0];
    if (Me.value.match(/[a-zA-Z]/)) { return false; };

    var r = [];
    var c = [];
    var d = [];
    var cx = [];
    for (i = 0; i < 5; i++) {
        d[i] = ID('l' + (i + 1)).innerHTML.split('/')[0];
        r[i] = CLASS('details')[num].getElementsByClassName('resources r' + (i + 1))[0].innerHTML.split('>')[1];
    };
    r[6] = CLASS('details')[num].getElementsByClassName('clocks')[0];
    r[9] = CLASS('details')[num].getElementsByClassName('furtherInfo')[0].innerHTML.match(/\d+/);
    if (r[6].getElementsByTagName('span')[0]) { r[6] = r[6].getElementsByTagName('span')[0].innerHTML } else { r[6] = r[6].innerHTML.split(/<img\b[^>]*>/)[1]; };
    if (v == '') { v = '0' };
    c[0] = C(r[0] * v);
    c[1] = C(r[1] * v);
    c[2] = C(r[2] * v);
    c[3] = C(r[3] * v);
    c[4] = C(C(pTime(r[6], 'sec')) * C(v));
    c[5] = pTime(c[4], 'time');
    c[6] = C(r[4] * v);
    c[9] = C(C(r[9]) + C(v));
    if (isNaN(c[9])) { c[9] = '0'; };
    for (i = 0; i < 4; i++) {
        d[i] = C(C(ID('l' + (i + 1)).innerHTML.split('/')[0]) - C(c[i]));

        if (d[i] > 0) { d[i] = '+' + d[i]; cx[i] = 'style="color: green;"'; } else { cx[i] = 'style="color: red;"'; };
    };
    if (ID('xPS[' + num + ']')) { ID('xPS[' + num + ']').parentNode.removeChild(ID('xPS[' + num + ']')); };
    CLASS('details')[num].getElementsByClassName('tit')[0].innerHTML += '<span id="xPS[' + num + ']"> + ' + v + ' = ' + c[9] + '</span>';
    ID('XP1_' + num).innerHTML = c[0] + '<br><span ' + cx[0] + '>' + d[0] + '';
    ID('XP2_' + num).innerHTML = c[1] + '<br><span ' + cx[1] + '>' + d[1] + '';
    ID('XP3_' + num).innerHTML = c[2] + '<br><span ' + cx[2] + '>' + d[2] + '';
    ID('XP4_' + num).innerHTML = c[3] + '<br><span ' + cx[3] + '>' + d[3] + '';
    ID('XP6_' + num).innerHTML = c[6];
    ID('XP5_' + num).innerHTML = c[5];
    setTimeout('tChange(' + num + '); XPS_Cul(' + num + ');', 1333);
};
function XMLGetM(num) {
    document.body.style.cursor = 'wait';
    var xmf = [];
    httpRequest(xpath('//table[@id = "overview"]/tbody/tr[' + num + ']/td[2]/div/a[contains(@href, "nachrichten.php?id=")]').snapshotItem(0).getAttribute('href'), function (ajax) {
        msg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH3AIHBRYAVGxqEQAAAAd0RVh0QXV0aG9yAKm'
+ 'uzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXI'
+ 'At8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAAByUlEQVQ4jaWTv4riUBTGfy52sTEaETEJOOWWERE'
+ 'R1MJ3mCfQwuex0CfwHRR2AoOFkHLBxkK08H9AtEhu7nWLHQNZZraZW51zP87H73zcm3o8HnznpAHG4/HAcZxXoPlx/w5MHMcZAnieNwASuud5k16vN0yNRqNfhmG0u90umUwGgNvtxuVy4Xg8AmAYBrq'
+ 'uJ/TpdMrxeHz7AbQty0LTNGazGZ7ncTgcME2TSqUCgGmaHA4HPM9jNpuhaRqWZQG001JKpJQopeh0OvFuSqlEbds2tm3H/XMuHUURQgiUUriuSzabJZvNYppmwmCz2eD7Pr7v02q1EEIQRRFpIQRCCKS'
+ 'UNJvNeEhKmahLpRKlUinun3NpIQRhGKKUYj6fxwTFYjFBsNvtYoJGo0EYhn8NwjAkCAKUUtTr9S8zKBQKFAqFuA+CgDAMkwSLxSImyOfzCYPT6RQT1Gq1JMHToFqtfkmg6zq6rsf9cy4O8X9P+jMtEaI'
+ 'QAtd1OZ/PAORyOcrlMi8vLwCsViu2221Cjw2iKGK/37NcLrnf7wBompbI4bn/v3oURaSllG/r9fo3MBmNRu8A/X6/eb1eX9fr9eCDePiZDvxMffc7/wE/BFaShkSgLAAAAABJRU5ErkJggg%3D%3D';
        xmf[2] = htmltocontext(ajax.responseText);
        if (ID('XML1')) { xli = ID('XML1'); xli.parentNode.removeChild(xli); };
        ID('content').innerHTML += '<div class="paper" id="XML1" style="margin: 10px 0px;">' + xmf[2].getElementsByClassName('paper')[0].innerHTML + '</div>';
        xpath('//table[@id = "overview"]/tbody/tr[' + num + ']/td/input').snapshotItem(0).setAttribute('checked', 'checked');
        xpath('/html/body//table[@id = "overview"]/tbody/tr[' + num + ']/td[3]/a/img').snapshotItem(0).setAttribute('src', msg);
        document.body.style.cursor = 'default';
        return TAG('req')[0].parentNode.removeChild(TAG('req')[0]);
    });
};
function sh() {
    if (ID('xblock')) return ID('xblock').parentNode.removeChild(ID('xblock'));
    if (!ID('xblock')) return NotePadPlus();
};
function GM_getValue(c_name) {
    if (window.localStorage) {
        return window.localStorage.getItem(c_name);
    } else {
        var i, x, y, ARRcookies = document.cookie.split(";");
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == c_name) {
                var getValue = unescape(y);
                if (getValue == null) { getValue = ''; };
                return getValue;
            }
        }
    };
};
function xyToId(x, y) {
    return (1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400)));
}
function get_xy(vid) {
    var arrXY = [];
    var ivid = C(vid);
    arrXY[0] = ((ivid - 1) % 801) - 400;
    arrXY[1] = 400 - Math.floor((ivid - 1) / 801);
    return arrXY;
};
function Distance(id1, id2) {
    var myXY = get_xy(id1);
    var dXY = get_xy(id2);
    dX = Math.min(Math.abs(dXY[0] - myXY[0]), Math.abs(801 - Math.abs(dXY[0] - myXY[0])));
    dY = Math.min(Math.abs(dXY[1] - myXY[1]), Math.abs(801 - Math.abs(dXY[1] - myXY[1])));
    return Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
};

function cMapChecker() {/*
    var y = CLASS('coordinateY')[0].innerHTML.replace('(', '').replace(')', '');
    var x = CLASS('coordinateX')[0].innerHTML.replace('(', '').replace(')', '');
    var href = 'http://' + location.hostname + '/position_details.php?x=' + x + '&y=' + y + '';
    GM_xmlhttpRequest({
        url: href,
        method: "GET",
        onload: function(data) {
            var Troop = '<table cellspacing="0">' + (data.responseText).getElementByID('troop_info').innerHTML + '</table>';
            var Type = '<table cellspacing="0">' + (data.responseText).getElementByID('distribution').innerHTML + '</table>';

        }
    });
    setTimeout(cMapChecker, 666);*/
};
function secExp(sec) {
    var now = new Date();
    var time = now.getTime();
    time += sec * 1000;
    now.setTime(time);
};
function Handle(responseDetails) {
    var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
    doc = document.implementation.createDocument('', '', dt);
    html = doc.createElement('html');
    html.innerHTML = responseDetails;
    doc.appendChild(html);
    return doc;
};
function MyVid() {
    var A = Create('div');
    A.setAttribute('id', 'xgy');
    A.setAttribute('style', 'display: none;');
    ID('stime').appendChild(A);
    httpRequest('http://' + location.hostname + '/statistiken.php?id=2', function (ajax) {
        var GM = htmltocontext(ajax.responseText);
        var XY = "/html/req//table[@id='villages']/tbody/tr[@class='hl']/td[2][@class='vil ']/a";
        var xy = xpath(XY).snapshotItem(0).getAttribute('href').split('=')[1];
        TAG('req')[0].parentNode.removeChild(TAG('req')[0]);
        ID('xgy').innerHTML = xy;
        ID('xgy').title = get_xy(xy)[0];
        ID('xgy').className = get_xy(xy)[1];
    });
};
function MyId() {
    return ID("xgy").innerHTML;
};

function showHelp_move(ev) {
    var x = ev.pageX;
    var y = ev.pageY;
    ID("T4_mHelp").style.top = (y + 20) + 'px';
    ID("T4_mHelp").style.left = (x - 230) + 'px';
};
function X_CE_Change(id) {
    if (id == 'Xcon') {
        ID('Xeon').style.display = 'none';
        ID('sO').checked = true;
        ID('sO').removeAttribute('disabled');
        ID('xAll').removeAttribute('disabled');
        ID('selectOT').removeAttribute('disabled');
        ID('xU39').disabled = 'disabled';
        ID('xU38').disabled = 'disabled';
        ID('xU39').checked = false;
        ID('xU38').checked = false;
        return ID('Xcon').style.display = 'block';
    } else {
        ID('Xcon').style.display = 'none';
        ID('sO').checked = false;
        ID('sO').disabled = 'disabled';
        ID('selectOT').disabled = 'disabled';
        ID('xAll').checked = false;
        ID('xAll').disabled = 'disabled';
        ID('xU39').removeAttribute('disabled');
        ID('xU38').removeAttribute('disabled');
        return ID('Xeon').style.display = 'block';
    };
};
function GM_setValue(c_name, value, exdays) {
    if (window.localStorage) {
        return window.localStorage.setItem(c_name, value);
    } else {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
        return document.cookie = c_name + "=" + c_value;
    };
};

function showInWindow(html) {
    $.window({
        title: "",
        content: html,
        checkBoundary: true,
        x: 80,
        y: 80
    });
};
function help_fun() {
    function resTitle(num) { return xpath("//ul[@id='res']/li[" + num + "][@class='r" + num + "']/p/img").snapshotItem(0).alt; };
    $('<div style="border: 1px solid; border-top: 0px solid;" id="Searcher">' +
    '<form>' +
    '<span><input type="radio" name="Search" checked="true" onclick="X_CE_Change(\'Xcon\');" />' + SubLanguage(LanguagePack(), 16) + '' +
    '<span>&nbsp;|&nbsp;' +
    '<span>' +
    '<input type="checkbox" name="selOne" id="sO" onclick="if(this.checked == true){ID(\'selectOT\').removeAttribute(\'disabled\'); ID(\'xAll\').checked = false;}else{ID(\'selectOT\').disabled = \'disabled\';};" /><img src="img/x.gif" class="r0"></span>&nbsp;' +
    '<select id="selectOT" disabled="disabled">' +
    '<option value="0">' + resTitle('4') + ' %50</option>' +
    '<option value="1">' + resTitle('4') + '+' + resTitle('3') + ' %25</option>' +
    '<option value="2">' + resTitle('4') + '+' + resTitle('2') + ' %25</option>' +
    '<option value="3">' + resTitle('4') + '+' + resTitle('1') + ' %25</option>' +
    '<option value="4">' + resTitle('4') + ' %25</option>' +
    '<option value="5">' + resTitle('3') + ' %25</option>' +
    '<option value="6">' + resTitle('2') + ' %25</option>' +
    '<option value="7">' + resTitle('1') + ' %25</option>' +
    '</select>' +
    '</span>' +
    '&nbsp;|&nbsp;' +
    '<span><input type="checkbox" checked="checked" name="selOne" id="xAll" onclick="ID(\'sO\').checked = false; ID(\'selectOT\').disabled = \'disabled\';" />' + SubLanguage(LanguagePack(), 38) + '</span>' +
    '</span><br><hr style="margin: 5px;">' +
    '<span><input type="radio" name="Search" onclick="X_CE_Change(\'Xeon\');" />' + SubLanguage(LanguagePack(), 17) + '' +
    ' + <input type="checkbox" id="xU39" disabled="disabled"><img class="unit u39" src="img/x.gif">' +
    ' + <input type="checkbox" id="xU38" disabled="disabled"><img class="unit u38" src="img/x.gif">' +
    '</form>' +
    '</div>').appendTo('#content');
};
function CCDC() {
    var s = '<div id="Xcon">';
    s += ID("mapCoordEnter").getElementsByClassName("xCoord")[0].getElementsByTagName("label")[0].innerHTML + ' <input type="text" id="crop_x" maxsize="4" size="4" value=""/>&nbsp;' +
    '' + ID("mapCoordEnter").getElementsByClassName("yCoord")[0].getElementsByTagName("label")[0].innerHTML + ' <input type="text" id="crop_y" maxsize="4" size="4" value=""/>' +
    '&nbsp;' + SubLanguage(LanguagePack(), 18) + ': <input type="text" id="rad" maxsize="4" size="4" value="3"/> <input type="button" id="cFinderX" Value="' + SubLanguage(LanguagePack(), 19) + '" /><br/>' +
    '<span id="scx" style="display: none;">' + SubLanguage(LanguagePack(), 20) + ' ' + SubLanguage(LanguagePack(), 21) + ' <span id="crop_done">0</span> ' + SubLanguage(LanguagePack(), 22) + ' <span id="crop_tot">0</span><span>&nbsp;|&nbsp;' + SubLanguage(LanguagePack(), 23) + ': <span id="percx">0%</span></span></span>' +
    '<table id="crop_fields" style="border: 0px solid; background-color: white; width: auto;"></table></div>';
    GM_addStyle('#crop_fields tbody tr td {padding: 2px 2px 2px;}');
    return s; //ID('xgy').getAttribute('title')
};

function cLang() {
    var LNG = ID('cLang').selectedIndex;
    var MyLNG = ID('cLang').options[LNG].value;
    GM_setValue('cLength', LNG);
    GM_setValue('MyLang', MyLNG);
    ID('t4_setting').parentNode.removeChild(ID('t4_setting'));
    return setting();
};
function OnChange() {
    ID('xtr[1]').innerHTML = 0;
    ID('xtrs[1]').innerHTML = 0;
    ID('xtr[2]').innerHTML = 0;
    ID('xtr[3]').innerHTML = 0;
    ID('xtr[4]').innerHTML = 0;
    ID('xtr[5]').innerHTML = 0;
    ID('xtr[6]').innerHTML = 0;
    ID('xtr[7]').innerHTML = 0;
    ID('xtr[8]').innerHTML = 0;
    ID('xtr[9]').innerHTML = 0;
    var getx = [];
    var gety = [];
    var gett = [];
    for (x = 0; x < 10; x++) {
        getx[x] = document.getElementsByName('t' + (x + 1))[0].parentNode.childNodes[0].className.split(' u')[1];
        if (
        document.getElementsByName('t' + (x + 1))[0].value == '' ||
        document.getElementsByName('t' + (x + 1))[0].value.match(/\D/)
        )
        { gett[x] = 0; } else { gett[x] = document.getElementsByName('t' + (x + 1))[0].value; };
        gety['attack'] = C(C(xtr(getx[x], 0)) * C(gett[x]));
        gety['attacks'] = C(C(xtr(getx[x], 0)) * C(gett[x]));
        gety['def_A'] = C(C(xtr(getx[x], 1)) * C(gett[x]));
        gety['def_B'] = C(C(xtr(getx[x], 2)) * C(gett[x]));
        gety['res1'] = C(C(xtr(getx[x], 3)) * C(gett[x]));
        gety['res2'] = C(C(xtr(getx[x], 4)) * C(gett[x]));
        gety['res3'] = C(C(xtr(getx[x], 5)) * C(gett[x]));
        gety['res4'] = C(C(xtr(getx[x], 6)) * C(gett[x]));
        gety['xcrop'] = C(C(xtr(getx[x], 7)) * C(gett[x]));
        gety['carry'] = C(C(xtr(getx[x], 9)) * C(gett[x]));
        if (TroopType(getx[x]).toString().match(/i/)) { ID('xtr[1]').innerHTML = C(C(ID('xtr[1]').innerHTML) + C(gety['attack'])); };
        if (TroopType(getx[x]).toString().match(/c/)) { ID('xtrs[1]').innerHTML = C(C(ID('xtrs[1]').innerHTML) + C(gety['attacks'])); };
        ID('xtr[2]').innerHTML = C(C(ID('xtr[2]').innerHTML) + C(gety['def_A']));
        ID('xtr[3]').innerHTML = C(C(ID('xtr[3]').innerHTML) + C(gety['def_B']));
        ID('xtr[4]').innerHTML = C(C(ID('xtr[4]').innerHTML) + C(gety['carry']));
        ID('xtr[5]').innerHTML = C(C(ID('xtr[5]').innerHTML) + C(gety['xcrop']));
        ID('xtr[6]').innerHTML = C(C(ID('xtr[6]').innerHTML) + C(gety['res1']));
        ID('xtr[7]').innerHTML = C(C(ID('xtr[7]').innerHTML) + C(gety['res2']));
        ID('xtr[8]').innerHTML = C(C(ID('xtr[8]').innerHTML) + C(gety['res3']));
        ID('xtr[9]').innerHTML = C(C(ID('xtr[9]').innerHTML) + C(gety['res4']));
    };
    setTimeout(OnChange, 250);
};

function format(maxtime) {
    var dys = Math.floor(maxtime / 86400)
    var hrs = Math.floor(maxtime / 3600) % 24;
    var min = Math.floor(maxtime / 60) % 60;
    var sec = maxtime % 60;
    var t = dys + ":";
    if (hrs < 10) { hrs = '0' + hrs; }
    t += hrs + ":";
    if (min < 10) { t += "0"; }
    t += min + ":";
    if (sec < 10) { t += "0"; }
    t += sec; return ((t.toString().match(/NaN/)) ? '0:00:00:00' : t);
};
function setting() {
    var Language_ = []; /*           [0]                                 [1]                                   [2]                                            [3]                          [4]                                            [5]                                    [6]             [7]                      [8]                               [9]                            [10]                        [11]           [12] */
    Language_['ar'] = ['иЙиБиЖ иЇй?й?й?иЇиБиЏ иЇй?й?иЗй?й?иЈиЉ й?й?иЈй?иЇиЁ', 'иЇиИй?иЇиБ иЌиЏй?й? иЇй?й?иЈиЇй?й? иЃиГй?й? иЇй?й?иБй?иЉ', 'иЃиИй?иЇиБ иБй?й?иВ иЇиБиГиЇй? й?й?иЇиЊ й? й?й?иЇиБиЏ й?й? й?иЇиІй?иЉ иЇй?й?иБй?', 'иЇиИй?иЇиБ иБй?иВ й?иЊи­ иЇй?иЊй?иЇиБй?иБ', 'иЇиИй?иЇиБ иБй?иВ й?иЊи­ иЇй?иБиГиЇиІй?', 'и­иГиЇиЈ иЙиЏиЏ иЇй?й?й?иЇиБиЏ й?иЇй?й?й?иЊ й?й? иЇй?иЋй?й?иЉ,иЇй?иЃиГиЗиЈй?,иЇй?й?иЕиЇй?иЙ иЇй?и­иБиЈй?иЉ', 'иЅиКй?иЇй?', 'иЅиИй?иЇиБ й?иЇиІй?иЉ иЇй?иБй?иЇиЈиЗ', 'иЅиИй?иЇиБ й?й?иЊ иЅй?иЊй?иЇиЁ иЇй?й?иЎиЇиВй?', 'иЅиИй?иЇиБ й?иЙиЏй? й?иГиЈиЉ иЇй?й?иЎиЇиВй?', 'иЅиИй?иЇиБ иЃй?иЊиЇиЌ иЇй?й?иБй?иЉ й?й?й? иГиЇиЙиЉ', 'иЇй?иБй?иЇиЈиЗ иЇй?й?и­й?й?иИиЉ', 'иЙиБиЖ']
    Language_['cn'] = ['ц�ОчЄКхЛКч­?ц??щ??шЕ?цК?', 'х?Јц??хК?фИ?ц?Йц�ОчЄКхЗВц??хЛКч­?ч?Љх??шЁЈ', 'х?Јц??хК?х??шЁЈфИ­ц�ОчЄКшЕ?цК?х??х?Ех??шА?щ??ч??хПЋц?Зх?Оц ?', 'х?Џч?ЈхПЋщ??ц??хМ?ц?Ѕх??х??ш?Н', 'х?Џч?ЈхПЋщ??ц??хМ?цЖ?ц?Џх??ш?Н', 'шЎЁчЎ?х?Еш?ЅяМ?щЉЌх?Љх??хЗЅх?Кц??щ??шЕ?цК?х??ц?Жщ?Д', 'х?Гщ?­', 'ц�ОчЄКш??х??щ?Оц?Ѕ', 'ц�ОчЄКшО?х?ЉшЕ?цК?ц?Жщ??', 'ц�ОчЄКфЛ?х?ЈшЕ?цК?ч?Ох??цЏ?', 'ц�ОчЄКц??хК?фКЇщ??', 'хЗВфП?х­�ч??щ?Оц?Ѕ', 'ц�ОчЄК'];
    Language_['de'] = ['view erforderlichen Ressourcen zu bauen ', ' zeigen eine Tabelle von GebУЄuden unterhalb des Dorfes ', ' Symbole einblenden, um Truppen und Ressourcen in die Liste der DУЖrfer zu senden ', ' zeigen den Code, um die Berichte zu УЖffnen ', 'Show-Symbol und УЖffnen Nachrichten', ' Berechnung der Anzahl der Ressourcen und Zeit in der Kaserne, Stall, Ordnance Factories ', ' Close ', 'show MenУМ-Links', 'zeigen Ressource Timer', 'zeigen Ressource Prozent', 'zeigen Dorf Produktion', 'gespeicherten Links', 'Anzeige']
    Language_['en'] = ['view resources needed to build', 'show a table of buildings below the village', 'Show icons to send troops and resources in the list of villages', ' show open reports icon', 'Show open messages icon', 'calculate the number of resources and time in the barracks, Stable, Ordnance Factories', 'Close', 'Show menu links', 'Show resource timer', 'Show resource percent', 'show village production', 'Saved Links', 'display']
    Language_['es'] = ['recursos de vista necesario para construir', 'mostrar una tabla de los edificios mУЁs abajo del pueblo', 'Mostrar iconos de enviar tropas y recursos en la lista de los pueblos', "Mostrar el icono de abrir mensajes", " mostrar el cУГdigo para abrir los informes ", " calcular el nУКmero de recursos y tiempo en los cuarteles, estable, Ordnance Factories ", ' Close', "mostrar el menУК de enlaces", "temporizador de recursos muestran", "mostrar por ciento de los recursos", "mostrar la producciУГn del pueblo", 'enlaces guardados', 'mostrar'];
    Language_['hu'] = ['УЉpУ­tУЉshez szУМksУЉges nyersanyagok megtekintУЉse', 'Legyen egy tУЁblУЁzat az УЉpУМletekrХ?l a falu alatt', 'EgysУЉg УЉs nyersanyagkУМldУЉs gomb megjelenУ­tУЉse a falulistУЁban', ' jelentУЉsmegnyitУЁs gomb megjelenУ­tУЉse', 'У?zenetmegnyitУЁs gomb megjelenУ­tУЉse', 'IdХ? УЉs nyersanyag kiszУЁmУ­tУЁsa a KaszУЁrnyУЁban, IstУЁllУГban УЉs MХБhelyben', 'BezУЁrУЁs', 'MenУМ linkek megjelenУ­tУЉse', 'Nyersanyag tУЁblУЁzat megjelenУ­tУЉse', 'Nyersanyag megjelenУ­tУЉse szУЁzalУЉkban', 'Falu termelУЉsУЉnek megjelenУ­tУЉse', 'menti kapcsolatok', 'kijelzХ?'];
    Language_['fa'] = ['й?й?иЇиЈиЙ й?й?иБиЏ й?л?иЇиВ иЈиБиЇл? иГиЇиЎиЊ иБиЇй?иДиЇй?иЏй? й?й?иЇл?л?иЏ', 'й?й?иЇл?иД л?кЉ иЌиЏй?й? иЇиВ иГиЇиЎиЊй?иЇй?й?иЇ иЏиБ иВл?иБ ', 'й?й?иЇл?иД иЂл?кЉй?й? иЇиБиГиЇй? й?й?иЇиЈиЙ й? иЇиБиГиЇй? й?л?иБй? иЏиБ й?л?иГиЊ иБй?иГиЊиЇй?иЇ', ' й?й?иЇл?иД иЂл?кЉй?й? иЈиЇиВ кЉиБиЏй? кЏиВиЇиБиД', 'й?й?иЇл?иД иЂл?кЉй?й? иЈиЇиВ кЉиБиЏй? УЗл?иЇй?', 'й?и­иЇиГиЈй? иЊиЙиЏиЇиЏ й?й?иЇиЈиЙ й? иВй?иЇй? иЏиБ иГиБиЈиЇиВиЎиЇй?й?, иЇиЕиЗиЈй?, кЉиЇиБкЏиЇй?', 'иЈиГиЊй?', 'й?й?иЇл?иД й?л?й?кЉ й?иЇл? й?й?й?', 'й?й?иЇл?иД иЊиЇл?й?иБ й?й?иЇиЈиЙ', 'й?й?иЇл?иД иЏиБиЕиЏ й?й?иЇиЈиЙ', 'й?й?иЇл?иД иЊй?й?л?иЏиЇиЊ иБй?иГиЊиЇй?иЇ', 'иАиЎл?иБй? й?л?й?кЉй?иЇ', 'й?й?иЇл?иД'];
    Language_['fr'] = ["ressources vue nУЉcessaire У  la construction", "montrer un tableau de bУЂtiments bas du village", "Afficher les icУДnes d'envoyer des troupes et des ressources dans la liste des villages", " Afficher le code pour ouvrir les rapports", "Afficher l'icУДne et les messages ouverts", "calculer le nombre de ressources et de temps dans les casernes, stable, Ordnance Factories", "Fermer", 'liens du menu Show', 'timer ressources montrent', 'pour cent des ressources montrent', 'la production du village montrent', 'liens enregistrУЉs', "d'affichage"];
    Language_['nl'] = ['Laat de benodigde grondstoffen voor constructie zien', 'Laat een gebouwentabel onder het dorp zien', 'Laat stuur troepen en grondstoffen iconen zien in de dorpslijst', 'Laat open rapport icoon zien', 'Laat open bericht icoon zien', 'Bereken de grondstoffen en tijd in de barakken, stallen en werkplaats', 'Sluiten', 'Laat links zien', 'Laat grondstoffen tijd zien', 'Laat grondstoffen percentage zien', 'Laat dorp productie zien', 'opgeslagen koppelingen', "tonen"];
    Language_['ru'] = ['аПб?аОб?аМаОб?б? аНаЕаОаБб?аОаДаИаМб?б? аДаЛб? б?б?б?аОаИб?аЕаЛб?б?б?аВаА б?аЕб?б?б?б?аОаВ', 'аПаОаКаАаЗаАб?б? б?аАаБаЛаИб?б? б?б?б?аОаИб?аЕаЛб?б?б?аВаА аВаНаИаЗб?', 'аПаОаКаАаЗаАб?б? аИаКаОаНаКаИ аОб?б?б?аЛаКаИ б?аЕб?б?б?б?аОаВ/аВаОаЙб?аК аВ б?аПаИб?аКаЕ аДаЕб?аЕаВаЕаНб?', ' аПаОаКаАаЗаАб?б? аИаКаОаНаКб? аОб?аКб?б?б?аИб? аОб?б?аЕб?аА', 'аПаОаКаАаЗаАб?б? аИаКаОаНаКб? аОб?аКб?б?б?аИб? б?аОаОаБб?аЕаНаИб?', 'аПаОаДб?б?аИб?б?аВаАб?б? аНаЕаОаБб?аОаДаИаМб?аЕ б?аЕб?б?б?б?б? аИ аВб?аЕаМб? аВ аКаАаЗаАб?аМаЕ, аКаОаНб?б?аНаЕ, аМаАб?б?аЕб?б?аКаОаЙ', 'а?аАаКб?б?б?б?', 'а?аОаКаАаЗб?аВаАб?б? аМаЕаНб? б?б?б?аЛаОаК', 'а?аОаКаАаЗб?аВаАб?б? б?аАаЙаМаЕб? б?аЕб?б?б?б?аОаВ', 'а?аОаКаАаЗб?аВаАб?б? аПб?аОб?аЕаНб? б?аЕб?б?б?б?аОаВ', 'а?аОаКаАаЗаАб?б? аПб?аОаИаЗаВаОаДб?б?аВаО аДаЕб?аЕаВаНаИ', 'аЁаОб?б?аАаНб?аНаНб?аЕ б?б?б?аЛаКаИ', 'аПаОаКаАаЗаАб?б?'];
    Language_['tw'] = ['щЁЏчЄКхЛКчЏ?ц??щ??шГ?цК?', 'х?Јц??ш??фИ?ц?ЙщЁЏчЄКхЗВц??хЛКчЏ?ч?Љх??шЁЈ', 'х?Јц??ш??х??шЁЈфИ­щЁЏчЄКшГ?цК?х??х?Ех??шЊПщ??ч??хПЋц?Зх??цЈ?', 'х??ч?ЈхПЋщ??ц??щ??х Бх??х??ш?Н', 'х??ч?ЈхПЋщ??ц??щ??цЖ?ц?Џх??ш?Н', 'шЈ?чЎ?х?Еч??яМ?щІЌхЛ?х??хЗЅх Дц??щ??шГ?цК?х??ц??щ??', 'щ??щ??', 'щЁЏчЄКш??х?Ўщ??ц?Ѕ', 'щЁЏчЄКшМ?х?ЉшГ?цК?ц??щ?�', 'щЁЏчЄКх??х?ВшГ?цК?ч?Ох??цЏ?', 'щЁЏчЄКц??ш??ч?Ђщ??', 'хЗВфП?х­�ч??щ??ц?Ѕ', 'щЁЏчЄК'];

    if (ID('t4_setting')) {
        return ID('t4_setting').parentNode.removeChild(ID('t4_setting'));
    } else {
        var pName = xpath('/html/body/div/div[2]/div[2]/div[3]/div[2]/a/span').snapshotItem(0).innerHTML;

        var xpi_A = GM_getValue('t4_setup_setting').split('|')[0];
        var xpi_B = xpath('/html/body/div/div[2]/div[2]/div[3]/div[2]/img').snapshotItem(0).getAttribute('alt');

        var ally;
        if (CLASS('sideInfoAlly')[0]) {
            ally_A = GM_getValue('t4_setup_setting').split('|')[1];
            ally_B = CLASS('sideInfoAlly')[0].getElementsByTagName('span')[0].innerHTML;
        } else { ally_B = ''; ally_A = ''; };
        var getLang = GM_getValue('MyLang');
        if (getLang == null) { getLang = 'en' };
        var xHo = 'onmouseover="FindNext(this).style.color=\'blue\';FindNext(this).style.textDecoration= \'underline\';" onmouseout="FindNext(this).style.color=\'\'; FindNext(this).style.textDecoration= \'none\';"';

        var SaveMySetting = "for(i = 0; i < 16; i++){ GM_setValue('setting['+(i+1)+']', ID('t4_set['+(i+1)+']').checked); }; location.reload();"; // change by Dream1 <--- thanks
        var Div = Create('div');
        Div.setAttribute('id', 't4_setting');
        Div.setAttribute('style', 'width: auto;');
        Div.innerHTML = '' +
        '<table class="t4_set" cellspacing="1">' +
        '<thead>' +
        '<tr><td colspan="2" style="background-color: #FFFFE0;">' + pName + '</td></tr>' +
        '<tr><td>' + xpi_A + '</td><td>' + xpi_B + '</td></tr>' +
        '<tr><td>' + ally_A + '</td><td>' + ally_B + '</td></tr>' +
        '<tr><td>Language:</td><td><select id="cLang" onchange="cLang();">' +
        '<option value="ar">иЇй?иЙиБиЈй?иЉ</option>' +
        '<option value="nl">Dutch</option>' +
        '<option value="de">German</option>' +
        '<option value="en">English</option>' +
        '<option value="fr">French</option>' +
        '<option value="hu">Hungary</option>' +
        '<option value="fa">Persian</option>' +
        '<option value="ru">Russian</option>' +
        '<option value="es">Spanish</option>' +
        '<option value="cn">Simplified Chinese</option>' +
        '<option value="tw">Traditional Chinese</option>' +
        '</select>&nbsp;&nbsp;&nbsp;<a target="_blank" href="http://userscripts.org/scripts/show/63218" style="border: 1px solid;">&nbsp;Add or Update Language&nbsp;</a></td></tr>' +
        '</thead>' +
        '<tbody>' + // 29 30 31
        '<tr><td colspan="2" style="background-color: #FFFFE0;"><center>Travian4 Plus Tool Hacked - Setting, ' + ID("this.version").innerHTML + '</center></td></tr>' +
        '<tr><td ' + xHo + '><input type="checkbox" id="t4_set[1]" checked="true" /></td><td>' + Language_[getLang][0] + '</td></tr>' +
        '<tr><td ' + xHo + '><input type="checkbox" id="t4_set[2]" checked="true" /></td><td>' + Language_[getLang][1] + '</td></tr>' +
        '<tr><td ' + xHo + '><input type="checkbox" id="t4_set[3]" checked="true" /></td><td>' + Language_[getLang][2] + '</td></tr>' +
        '<tr><td ' + xHo + '><input type="checkbox" id="t4_set[4]" checked="true" /></td><td>' + Language_[getLang][3] + '</td></tr>' +
        '<tr><td ' + xHo + '><input type="checkbox" id="t4_set[5]" checked="true" /></td><td>' + Language_[getLang][4] + '</td></tr>' +
        '<tr><td ' + xHo + '><input type="checkbox" id="t4_set[6]" checked="true" /></td><td>' + Language_[getLang][5] + '</td></tr>' +
        '<tr><td ' + xHo + '><input type="checkbox" id="t4_set[7]" checked="true" /></td><td>' + Language_[getLang][7] + '</td></tr>' +
        '<tr><td ' + xHo + '><input type="checkbox" id="t4_set[8]" checked="true" /></td><td>' + Language_[getLang][8] + '</td></tr>' +
        '<tr><td ' + xHo + '><input type="checkbox" id="t4_set[9]" checked="true" /></td><td>' + Language_[getLang][9] + '</td></tr>' +
        '<tr><td ' + xHo + '><input type="checkbox" id="t4_set[10]" checked="true" /></td><td>' + Language_[getLang][10] + '</td></tr>' +
        '<tr><td ' + xHo + '><input type="checkbox" id="t4_set[11]" checked="true" /></td><td>' + SubLanguage(LanguagePack(), 2) + '</td></tr>' +
        '<tr><td ' + xHo + '><input type="checkbox" id="t4_set[12]" checked="true" /></td><td>' + SubLanguage(LanguagePack(), 12) + '</td></tr>' +
        '<tr><td ' + xHo + '><input type="checkbox" id="t4_set[13]" checked="true" /></td><td>' + SubLanguage(LanguagePack(), 29) + '</td></tr>' +
        '<tr><td ' + xHo + '><input type="checkbox" id="t4_set[14]" checked="true" /></td><td>' + SubLanguage(LanguagePack(), 30) + '</td></tr>' +
        '<tr><td ' + xHo + '><input type="checkbox" id="t4_set[15]" checked="true" /></td><td>' + SubLanguage(LanguagePack(), 31) + '</td></tr>' +
		'<tr><td ' + xHo + '><input type="checkbox" id="t4_set[16]" checked="true" /></td><td>' + SubLanguage(LanguagePack(), 39) + '</td></tr>' + // add by Dream1 <--- thanks
        '<tr><td colspan="2" style="background-color: #FFFFE0;"><center>' + Language_[getLang][11] + ' - <input type="button" value="' + Language_[getLang][12] + '" id="MySavedLinks" /></center></td></tr>' +
        '<tr><td colspan="2"><center>' +
        '<input type="button" onclick="ID(&apos;t4_setting&apos;).parentNode.removeChild(ID(&apos;t4_setting&apos;));" value="' + Language_[getLang][6] + '" />' +
        '<input type="button" onclick="' + SaveMySetting + '" value="' + SubLanguage(LanguagePack(), 4) + '" />' +
        '</center></td></tr>' +
        '</tbody>' +
        '</table>';
        document.body.appendChild(Div);
        ID('MySavedLinks').addEventListener('click', function () {
            if (!ID('ThisMySavedLinks')) {
                var MyLinks = encode(GM_getValue("My_T4Links"));
                var div = Create('div');
                div.setAttribute('id', 'ThisMySavedLinks');
                div.setAttribute('style', 'position: absolute; top: 150px; left: 50px; z-index: 999999; border: 1px solid; background-color: white; text-align: center; box-shadow: 5px black;');
                div.innerHTML = '<div style="padding: 4px 5px;"><br />' +
            'Encrypted links<br>' +
            'You can copy and save it in notepad on your computer<br>' +
            '<textarea id="sLinks" rows="15" cols="100" style="font-size: 9px; text-align: left; direction: ltr;">' + MyLinks + '</textarea><br />' +
        '<input type="button" id="s1BTN" onclick="GM_setValue(\'My_T4Links\', decode(ID(\'sLinks\').value)); alert(\'Saved\');" value="' + SubLanguage(LanguagePack(), 4) + '" />' +
        '<input type="button" onclick="ID(\'ThisMySavedLinks\').parentNode.removeChild(ID(\'ThisMySavedLinks\'));" value="' + Language_[getLang][6] + '" />' +
        '</div>';
                document.body.appendChild(div);
                ID('sLinks').addEventListener('blur', function () { ID('sLinks').style.boxShadow = '0px 0px 2px 0px gold'; }, true);
                ID('sLinks').addEventListener('focus', function () { ID('sLinks').style.boxShadow = '0px 0px 2px 0px blue'; }, true);
                ID('sLinks').addEventListener('keypress', function () { ID('sLinks').style.boxShadow = '0px 0px 2px 0px red'; }, true);
                ID('s1BTN').addEventListener('click', function () { ID('sLinks').style.boxShadow = '0px 0px 2px 0px green'; }, true);
            };
        }, true);
        if (GM_getValue('MyLang')) { ID('cLang').getElementsByTagName('option')[GM_getValue('cLength')].selected = 'selected'; } else { ID('cLang').getElementsByTagName('option')[3].setAttribute('selected', 'selected'); };

        GM_addStyle('.t4_set {width: auto; border: 1px solid gray; position: absolute; top: 20px; left: 400px; z-index: 10000; box-shadow: 0px 0px 10px 3px black;}');
        function CheckIt(n) {
            if (GM_getValue('setting[' + n + ']')) {
                if (GM_getValue('setting[' + n + ']') == 'true') {
                    return ID('t4_set[' + n + ']').checked = GM_getValue('setting[' + n + ']');
                } else {
                    ID('t4_set[' + n + ']').removeAttribute('checked'); return GM_setValue('setting[' + n + ']', 'false');
                }
            } else { ID('t4_set[' + n + ']').setAttribute('checked', 'checked'); return GM_setValue('setting[' + n + ']', 'true'); };
        };
        CheckIt('1'); CheckIt('2'); CheckIt('3'); CheckIt('4'); CheckIt('5');
        CheckIt('6'); CheckIt('7'); CheckIt('8'); CheckIt('9'); CheckIt('10');
        CheckIt('11'); CheckIt('12'); CheckIt('13'); CheckIt('14'); CheckIt('15'); CheckIt('16'); // add by Dream1
    }
};

function deleteLinks(cid) {
    var ask = window.confirm(SubLanguage(LanguagePack(), 11) + ' ' + ID(cid).getElementsByTagName('a')[0].innerHTML);
    if (ask) {
        document.getElementById(cid).parentNode.removeChild(ID(cid));
        var links = ID('tbody_links').innerHTML;
        for (i = 0; i < ID('tbody_links').getElementsByTagName('tr').length; i++) {
            ID('tbody_links').getElementsByTagName('tr')[i].setAttribute('id', 'Link[' + i + ']');
            ID('tbody_links').getElementsByTagName('tr')[i].getElementsByTagName('img')[0].setAttribute('onclick', "deleteLinks('Link[" + i + "]');");
        };
        return GM_setValue('My_T4Links', links);
    };
};
function AddNewLink() {
    var links = '0';
    if (ID('tbody_links').getElementsByTagName('tr')[0]) { links = ID('tbody_links').getElementsByTagName('tr').length; };
    loc = window.location.href.split('/')[3];
    new_link = window.prompt('' + SubLanguage(LanguagePack(), 9) + '', loc); if (!new_link) { return }
    new_link_name = window.prompt('' + SubLanguage(LanguagePack(), 10) + '', ""); if (!new_link_name) { return; };
    newLinks = '<tr id="Link[' + links + ']"><td style="font-size: 11.5px;"><img src="img/x.gif" class="del" onclick="deleteLinks(&apos;Link[' + links + ']&apos;);" style="cursor: pointer;" /></td><td><a href="' + new_link + '" onmouseover="this.style.color = \'#99C01A\';" onmouseout="this.removeAttribute(\'style\');">' + new_link_name + '</a></td></tr>';
    if (ID('tbody_links').getElementsByTagName('tr')[0]) { ID('tbody_links').innerHTML += newLinks } else { ID('tbody_links').innerHTML = newLinks };
    GM_setValue('My_T4Links', ID('tbody_links').innerHTML);
};
function NotePadPlus() {
    var Div = Create('div');
    Div.id = 'xblock';
    var txtArea = Create('textarea');
    txtArea.id = 'notic';
    var P = Create('p');
    P.className = 'btn';
    var input = Create('input');
    input.type = 'button';
    input.value = SubLanguage(LanguagePack(), 4);
    input.setAttribute('onclick', "GM_setValue('note.txt', ID('notic').value); alert('Saved');");
    P.appendChild(input);
    txtArea.innerHTML = GM_getValue("note.txt");
    Div.appendChild(txtArea);
    Div.appendChild(P);
    document.body.appendChild(Div);
};
function CEDC() {
    var s = '<div id="Xeon" style="display: none;">';
    var xy = get_xy(MyId());
    s += document.getElementById("mapCoordEnter").getElementsByClassName("xCoord")[0].getElementsByTagName("label")[0].innerHTML + ' <input type="text" id="elep_x" maxsize="4" size="4" value="' + (ID('xgy').title) + '"/>&nbsp;' +
    document.getElementById("mapCoordEnter").getElementsByClassName("yCoord")[0].getElementsByTagName("label")[0].innerHTML + ' <input type="text" id="elep_y" maxsize="4" size="4" value="' + (ID('xgy').className) + '"/>&nbsp;' +
    '' + SubLanguage(LanguagePack(), 18) + ': <input type="text" id="rad_elep" maxsize="4" size="4" value="3"/> <input type="button" id="cElphantX" value="' + SubLanguage(LanguagePack(), 19) + '" /><br/>' +
    '<span id="sElphant" style="display: none;">' + SubLanguage(LanguagePack(), 20) + ' ' + SubLanguage(LanguagePack(), 21) + ' <span id="ele_done">0</span> ' + SubLanguage(LanguagePack(), 22) + ' <span id="ele_tot">0</span><span>&nbsp;|&nbsp;' + SubLanguage(LanguagePack(), 23) + ': <span id="percex">0%</span></span><br/>' +
    '<table id="elep_fields" style="border: 0px solid; background-color: white; width: auto;"></table><br></div>';
    GM_addStyle('#elep_fields tbody tr td {padding: 2px 2px 2px;}');
    return s;
};
function checkD(field) {
    var hh = ID('hh').value;
    var mm = ID('mm').value;
    var ss = ID('ss').value;
    if (hh > 0) hh = C(C(hh) * C(3600)); else { hh = 0; };
    if (mm > 0) mm = C(C(mm) * C(60)); else { mm = 0; };
    if (mm > 0) ss = C(C(ss) % 60); else { ss = 0; };
    var Time = C(C(hh) + C(mm) + C(ss));
    setTimeout(function () { field.value = field.value.replace(/\D/, ''); ID('farm_time').innerHTML = pTime(pTime(Time, 'sec'), 'time'); }, 50);
};
function start_farming() {

};
function send_farm_attack() {
    /* if (ID('raidList')) {
    $('' +
    '<div>Attack Every: ' +
    '<input type="text" value="2" id="hh" style="border: 1px solid #71D000; text-align: center;" size="1" maxlength="2" onkeypress="checkD(ID(\'hh\'));" />:' +
    '<input type="text" value="30" id="mm" style="border: 1px solid #71D000; text-align: center;" size="1" maxlength="2" onkeypress="checkD(ID(\'mm\'));" />:' +
    '<input type="text" value="0" id="ss" style="border: 1px solid #71D000; text-align: center;" size="1" maxlength="2" onkeypress="checkD(ID(\'ss\'));" />' +
    ' = <span id="farm_time">02:30:00</span><br><input type="button" value="start" onclick="start_farming();" />'+
    '</div><br />' +
    '').insertBefore(ID('raidList').getElementsByClassName('markAll')[0].parentNode);
    };*/
};
function Map_Check() {
    if (document.location.href.match(/karte.php/)) {
        if (xpath('//div[@id="mapContainer"]/div[2]/@unselectable').snapshotItem(0)) {
            xpath('//div[@id="mapContainer"]/div[2]').snapshotItem(0).setAttribute('onmousemove', 'Map_Coordx(0); ID(\'T4_mHelp\').style.display = \'block\';');
            xpath('//div[@id="mapContainer"]/div[2]').snapshotItem(0).setAttribute('onmouseout', 'setTimeout(function(){ID(\'T4_mHelp\').style.display = \'none\';}, 1000);');
            xpath('//div[@id="mapContainer"]').snapshotItem(0).setAttribute('onmouseout', 'setTimeout(function(){ID(\'T4_mHelp\').style.display = \'none\';}, 750);');
            xpath('//div[@id="content"]').snapshotItem(0).setAttribute('onmouseout', 'setTimeout(function(){ID(\'T4_mHelp\').style.display = \'none\';}, 500);');
        } else if (ID('mapContainer').getElementsByClassName('mapContainerData')[0]) {

            var i, length = xpath('//div[@id="mapContainer"]/div//div[contains(@class, "tile tile")]').snapshotLength, cl = [];
            for (i = 0; i < length; i++) {
                if (!xpath('//div[@id="mapContainer"]/div//div[contains(@class, "tile tile")]').snapshotItem(i).getAttribute('onclick')) {
                    xpath('//div[@id="mapContainer"]/div//div[contains(@class, "tile tile")]').snapshotItem(i).setAttribute('onmouseover', 'Map_Coordx(' + i + '); ID(\'T4_mHelp\').style.display = \'block\';');
                    xpath('//div[@id="mapContainer"]/div//div[contains(@class, "tile tile")]').snapshotItem(i).setAttribute('onmouseout', 'ID(\'T4_mHelp\').style.display = \'none\';');
                };
            }
        };
    };
    setTimeout(Map_Check, 500);
};
function Map_Coordx(access) {
    if (document.location.href.match(/karte.php/)) {
        function tID(x, y) {
            return (1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400)));
        };
        function trueNum(v) {
            if (v.toString().match(/\d+.\d/)) { return v.toString().match(/\d+.\d/); } else { return v; };
        };
        
        if (ID('mapContainer').getElementsByTagName('div')[1].getAttribute('unselectable')) {
            setTimeout(function () {
                x = xpath('//span[@class="coordinateX"]').snapshotItem(0).innerHTML.replace(')', '').replace('(', '');
                y = xpath('//span[@class="coordinateY"]').snapshotItem(0).innerHTML.replace(')', '').replace('(', '');
                gTimeD(ID('xgy').innerHTML, tID(x, y));
                ID('T4_mHelp').style.display = 'block';
            }, 500);
        }
        else
            if (ID('mapContainer').getElementsByClassName('mapContainerData')[0]) {
                var cl = [];
                cl['x'] = xpath('//div[@id="mapContainer"]/div//div[contains(@class, "tile tile")]').snapshotItem(access).className.split('x{')[1].split('}')[0];
                cl['y'] = xpath('//div[@id="mapContainer"]/div//div[contains(@class, "tile tile")]').snapshotItem(access).className.split('y{')[1].split('}')[0];
                gTimeD(ID('xgy').innerHTML, tID(cl['x'], cl['y']));
                ID('T4_mHelp').style.display = 'block';
                xpath('//div[@id="mapContainer"]/div//div[contains(@class, "tile tile")]').snapshotItem(access).style.textAlign = 'center';
                xpath('//div[@id="mapContainer"]/div//div[contains(@class, "tile tile")]').snapshotItem(access).innerHTML = '<span style="border: 1px solid; background-color: rgba(255, 255, 255, 0.4); font-size: 10.5px; cursor: default;">< ' + trueNum(Distance(ID('xgy').innerHTML, tID(cl['x'], cl['y']))) + ' ></span>';
            };
    };
};
function favThis() {
    var star = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH3AIKCCQGqs3Q2wAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAACjUlEQVQokX1TzWtUdxQ99/cx8968mcnXNPFzpCoo2mJCEwgigqBYoVAXkkXrshtdZOHOhStBxHWLC9E/wI1d1IBQWyitqCiBLLRUEk2axEQTJ+PMvHkz773fcSGaaCAH7uZwD+fCOVdIYi1YsUoEhkAqnXGKDaA+J0RgoginkhgnUbV2I7FZxwiyjVBGfMGA6uRrXdf3oJ0DQPifnrnO2ZGBsixmXa4cV90FUvaDkgHFoq4tasZDzfqsWLPO2VG6RCfdujsHLrSOxlF71Hr6N5AdAvSxqcrLizLXtc39YlCzHogiBD0ktpIYNBq98FagrYA1fRpMvkOoOxYnbHb8rxTBMC8d+hKRqczgct7nV2K5yXjosxkUbVZZoAnkDSzzmWhWeidvO/z7uIHMUXdz+Lj6WQpxy/x+l/mVCQ5toivuKGuUducQlH1ke2rI9HWjNUe8HFvGm/9ayB9R9w/9qK5Ymy4CgKQrxpuawcCT+zwVTfH7rdbt2l5W+GLAIIlKiCstdOyI0Xj7Ful2fb2rjxfh3Cx8pvKxJLHOLS1J/+QTnN23zf1QKBRk/i4RLdTB/GZs6W/B3/LmVdqhR7XhLeST9vuomiJIXLtUchMH+vHI64SEswFc3MBCjsnMq3mM34ow90/QK02OgrJztSQ+iaY4JEjiiFbgI5xuYU5cNRjUVzNthNMPw8NPx/Q3e1+Yg0On0zMZ2vOrOft0CHUMBd2eD/D0/2q986C69PUgbwKsHRhQN148557xP5JjlTEJvh1BASRXp66kOp278Pe1UvPBHXWOke5iE3mG8NiE+rBXf2mCZMlkPhWTePYod+LPX72f2NABSTCEZrgqXDuy9iVZsZI6KtOTbPiKH/AOLY1Ti+grqtUAAAAASUVORK5CYII%3D';
    var starx = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH3AILCgcau11I/gAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAACbElEQVQokX2TT0hUcRDHP799b3ff+nRd3Vo1QztIJgkaGUSHiqioLLASkwohkqAORt06CNFBoj/oIREvRceM6OLBisQOSUKpUZZppMWatYq7rv921femg5ia4RfmMsx3vsPMfJWIsBxWUDk0hW6BpWWKxRpw/JvQFHp0ktLZOCUMK+daZP0/7dzhCGVeB9u0DEZco6odHRsQfCvHXKU8Z2NqBl7TIiv2i2rLZiuCC8HJqHISUgYh5bGCSl+lbAkpykmqyw92H/tjk1QZiTRjk6xBmhUl68dXhjLzqdcJKQMbLw78lk2m2BS5dQIkgtMAGeEsNkeJkNzXgrv5AaSUU1NRREwPvuem30u+Mkg3kkjzePB6TBYW5QePjSv6kUDHbXjVDgmlNJVf5p4WkLhe30DicAs7NgvewgLYtBNSCsDMAk8OTPXAlzsQbAd/CW8qarnlMfgNoLW28jxjLy+/wXj/AIG5n6SacfBlw1Q/TPZDzinYeBDyyniWvoEWbCYwrov6+yQzKmFgkMKOVi7ty+d0YD3qUwNM9IH4YUsx+PIIzaZR5XLzlHUyu0COKAVouDGiISqdcWpj3RB8Ad1R5qe/oyeMwbZiyL1Au9PPeQLSu3AqnwgRZRNnPjaBUwGRLuhRjKcepyFhhumux+xuq2P7nk52nazjommra0t39olNWM2hoc18hrYPTGacoebQCZqAiSPHuP/uLbnNjRwYuot5pYYkRGQpRlHDnVQ/PMfMozquSpQUGSdRwhgyjmOxbrQXMz6IayVZhNdPONx4g0oZwxQRJIwm4SXi8lDLLWkFlZqzcBjZa1txEX8AvGoXJ4Yn4tIAAAAASUVORK5CYII%3D';
    if (exp(/karte.php/) && ID('tileDetails') && ID('tbody_links')) {
        if (ID('tileDetails').getElementsByTagName('h1')[0]) {
            var target = xpath('//div[@id="tileDetails"]/h1').snapshotItem(0);
            var img = Create('img');
            img.setAttribute('src', star);
            img.title = SubLanguage(LanguagePack(), 8);
            img.alt = SubLanguage(LanguagePack(), 8);
            img.id = 'favThis';
            img.setAttribute('style', 'cursor: pointer; margin: 0px 2px;');
            img.addEventListener('click', function () {
                var X = xpath('//div[@id="tileDetails"]/h1/span[1]/span[2]/span[@class="coordinateX"]').snapshotItem(0).innerHTML.replace(')', '').replace('(', '');
                var Y = xpath('//div[@id="tileDetails"]/h1/span[1]/span[2]/span[@class="coordinateY"]').snapshotItem(0).innerHTML.replace(')', '').replace('(', '');
                var makeHref = 'position_details.php?x=' + X + '&y=' + Y + '';

                var linkName = xpath('//div[@id="tileDetails"]/h1/span[1]/span[1]').snapshotItem(0).innerHTML;
                linkName = linkName + ' ' + xpath('//div[@id="tileDetails"]/h1/span[1]/span[2]/span[1]').snapshotItem(0).innerHTML.replace(')', '').replace('(', '');
                linkName = linkName + ' ' + xpath('//div[@id="tileDetails"]/h1/span[1]/span[2]/span[2]').snapshotItem(0).innerHTML;
                linkName = linkName + ' ' + xpath('//div[@id="tileDetails"]/h1/span[1]/span[2]/span[3]').snapshotItem(0).innerHTML.replace(')', '').replace('(', '');
                var links = '0';
                if (ID('tbody_links').getElementsByTagName('tr')[0]) { links = ID('tbody_links').getElementsByTagName('tr').length; };
                newLinks = '<tr id="Link[' + links + ']"><td>&nbsp;<img src="img/x.gif" class="del" onclick="deleteLinks(&apos;Link[' + links + ']&apos;);" style="cursor: pointer;" /></td><td style="font-size: 11.5px;"><a href="' + makeHref + '" onmouseover="this.style.color = \'#99C01A\';" onmouseout="this.removeAttribute(\'style\');">' + linkName + '</a></td></tr>';
                if (ID('tbody_links').getElementsByTagName('tr')[0]) { ID('tbody_links').innerHTML += newLinks } else { ID('tbody_links').innerHTML = newLinks };
                GM_setValue('My_T4Links', ID('tbody_links').innerHTML);
                return ID('favThis').setAttribute('src', starx);
            }, true);
            if (!ID('favThis')) { target.appendChild(img); };
        };
    }
    setTimeout(favThis, 250);
};

function allyInfo(href, id) {
    var t;
    if (ID(id).innerHTML == '?') {
        ID('T4_mHelp').innerHTML = '<img src="data:image/gif;base64,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" />';
        t = 500;
    } else { t = 0; };
    setTimeout(function () {
        if (ID(id).innerHTML == '?') {
            ID('T4_mHelp').style.display = 'block';
            httpRequest(href, function (ajax) {
                htmltocontext(ajax.responseText);
                var ally_A = xpath('/html/req//div[@id="details"]').snapshotItem(0).innerHTML;
                var ally_B = '';
                if (xpath('/html/req//div[@id="memberTitles"]').snapshotItem(0)) { ally_B = xpath('/html/req//div[@id="memberTitles"]').snapshotItem(0).innerHTML; };
                ID(id).innerHTML = ally_A + '<div style="float: left;">' + ally_B + '</div>';
                TAG('req')[0].parentNode.removeChild(TAG('req')[0]);
                return ID('T4_mHelp').innerHTML = ally_A + '<div style="float: left;">' + ally_B + '</div>';
            });
        } else {
            ID('T4_mHelp').style.display = 'block';
            return ID('T4_mHelp').innerHTML = ID(id).innerHTML;
        };
    }, t);
};
function userInfo(href, id) {
    var t;
    if (ID(id).innerHTML == '?') {
        ID('T4_mHelp').innerHTML = '<img src="data:image/gif;base64,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" />';
        t = 500;
    } else { t = 0; };
    setTimeout(function () {
        if (ID(id).innerHTML == '?') {
            ID('T4_mHelp').style.display = 'block';
            httpRequest(href, function (ajax) {
                htmltocontext(ajax.responseText);
                var user_A = '<table cellspacing="1">' + xpath('/html/req//table[@id="details"]').snapshotItem(0).innerHTML + '</table>';
                ID(id).innerHTML = user_A;
                TAG('req')[0].parentNode.removeChild(TAG('req')[0]);
                return ID('T4_mHelp').innerHTML = user_A;
            });
        } else {
            ID('T4_mHelp').style.display = 'block';
            return ID('T4_mHelp').innerHTML = ID(id).innerHTML;
        };
    }, t);
};
function accessToAlly() {
    var links = ID('content').getElementsByTagName('a').length;
    var xLink = ID('content').getElementsByTagName('a');
    for (j = 0; j < links; j++) {
        if (xLink[j].getAttribute('href').match(/allianz.php\b[^>]aid=\d+/) && !(xLink[j].getAttribute('onmouseover'))) {
            if (FindBefore(xLink[j])) { } else {
                var X = Create('li');
                X.style.display = 'none';
                X.id = 'ally' + j;
                X.innerHTML = '?';
                xLink[j].parentNode.appendChild(X);
            };
            xLink[j].setAttribute('onmouseover', "allyInfo(this.href, 'ally" + j + "');");
            xLink[j].setAttribute('onmouseout', "setTimeout(function(){ID('T4_mHelp').style.display = 'none';}, 500);");

        }
        if (ID('content').getElementsByTagName('a')[j].getAttribute('href').match(/uid=\d+/) && !(ID('content').getElementsByTagName('a')[j].getAttribute('onmouseover'))) {
            if (xpath('//div[@id="content"]/li[' + j + ']').snapshotItem(0)) { } else {
                var Xa = Create('li');
                Xa.style.display = 'none';
                Xa.id = 'uid' + j;
                Xa.innerHTML = '?';
                ID('content').getElementsByTagName('a')[j].parentNode.appendChild(Xa);
            };
            xLink[j].setAttribute('onmouseover', "userInfo(this.href, 'uid" + j + "');");
            xLink[j].setAttribute('onmouseout', "setTimeout(function(){ID('T4_mHelp').style.display = 'none';}, 500);");
        };
    };
    setTimeout(accessToAlly, 1000);
};
function encode(cookie_value) {
    var coded_string = ""
    for (var counter = 0; counter < cookie_value.length; counter++) {
        coded_string += cookie_value.charCodeAt(counter)
        if (counter < cookie_value.length - 1) {
            coded_string += "$"
        }
    }
    return coded_string;
};
function decode(coded_string) {
    var cookie_value = ""
    var code_array = coded_string.split("$")
    for (var counter = 0; counter < code_array.length; counter++) {
        cookie_value += String.fromCharCode(code_array[counter])
    }
    return cookie_value;
};

function AllyCalculation() { // <--- by Dream1
    if (exp(/allianz.php\b[^>]aid=\d+/) || exp(/allianz\b[^>]*php/)) {
        var membercell12 = xpath('//table[@id= "member"]/thead/tr').snapshotItem(0);
        var membercell121 = document.createElement('th');
        membercell121.innerHTML = "";
        membercell121.setAttribute("width", "6%");
        membercell12.insertBefore(membercell121, membercell12.firstChild);
        for (c = 0; c < xpath('//table[@class="transparent"]/tbody/tr[5]/td').snapshotItem(0).innerHTML; c++) {
            var membercell = xpath('//table[@id= "member"]/tbody/tr[' + (c + 1) + ']').snapshotItem(0);
            var membercell1 = document.createElement('td');
            membercell1.innerHTML = c + 1;
            membercell.insertBefore(membercell1, membercell.firstChild);

        };

    };
};
function SaveAsLink(id) {
    XLK = ID(id).parentNode.getElementsByTagName('a')[0];
    if (!XLK.href.match(/karte.php\b[^>]*=/)) { XLK = ID(id).parentNode.getElementsByTagName('a')[1] }
    if (!XLK.href.match(/karte.php\b[^>]*=/)) { XLK = ID(id).parentNode.getElementsByTagName('a')[2] }
    if (!XLK.href.match(/karte.php\b[^>]*=/)) { XLK = ID(id).parentNode.getElementsByTagName('a')[3] }
    if (!XLK.href.match(/karte.php\b[^>]*=/)) { XLK = ID(id).parentNode.getElementsByTagName('a')[4] }

    if (ID('tbody_links').getElementsByTagName('tr')[0]) { links = ID('tbody_links').getElementsByTagName('tr').length; } else { links = 0; };
    newLinks = '<tr id="Link[' + links + ']"><td>&nbsp;<img src="img/x.gif" class="del" onclick="deleteLinks(&apos;Link[' + links + ']&apos;);" style="cursor: pointer;" /></td><td style="font-size: 11.5px;"><a href="' + XLK.href + '" onmouseover="this.style.color = \'#99C01A\';" onmouseout="this.removeAttribute(\'style\');">' + XLK.innerHTML + '</a></td></tr>';
    if (ID('tbody_links').getElementsByTagName('tr')[0]) { ID('tbody_links').innerHTML += newLinks } else { ID('tbody_links').innerHTML = newLinks };
    GM_setValue('My_T4Links', ID('tbody_links').innerHTML);
};
var Script = Create('script');
Script.setAttribute('type', 'text/javascript');
Script.innerHTML = GM_setValue + GM_getValue + LanguagePack + SubLanguage + encode + decode + xpath + NewMathPercent + New_Math + Time + format + ReLoadTime + Create + ID + AddNewLink + deleteLinks + CLASS + TAG + C + MakeNum + jsPatch + httpRequest + htmltocontext + Handle + XMLGetM + XMLGetR + NotePadPlus + sh + GM_addStyle + pTime + XPS_Cul + tChange + cLang + setting + X_CE_Change + xtr + OnChange + TroopType + Distance + get_xy + FindNext + getAnimInfo + hMove + getXtime + gTimeD + send_farm_attack + checkD + allyInfo + userInfo + accessToAlly + favThis + AllyCalculation + Map_Check + Map_Coordx + SaveAsLink;
var target = TAG('head')[0].getElementsByTagName('script')[0];
target.parentNode.insertBefore(Script, target);

var ResSplit = ["'l1': ", "'l2': ", "'l3': ", "'l4': "];
var MyRes = [];
var pro = [];
var per = [];
var GM_Time = [];
var MyPer = [];

pro[0] = xpath("//div[@class='bodyWrapper']/script").snapshotItem(0).innerHTML.split(ResSplit[0])[1].split(',')[0] / 3600;
pro[1] = xpath("//div[@class='bodyWrapper']/script").snapshotItem(0).innerHTML.split(ResSplit[1])[1].split(',')[0] / 3600;
pro[2] = xpath("//div[@class='bodyWrapper']/script").snapshotItem(0).innerHTML.split(ResSplit[2])[1].split(',')[0] / 3600;
pro[3] = xpath("//div[@class='bodyWrapper']/script").snapshotItem(0).innerHTML.split(ResSplit[3])[1].split('}')[0] / 3600;

for (i = 0; i < 4; i++) {
    ID('res').getElementsByTagName('li')[i].innerHTML += '' +
    '<div class="res_State" id="resource_state[' + i + ']"></div>';
};
GM_addStyle('.res_State {position: absolute; z-index: 99; top: 23px; width: 107px; background-color: rgba(255, 255, 255, 0.8); border-radius: 0px 0px 7px 7px; text-align: center; box-shadow: 0px 1px 1px 0px black;}');

function ResourcePlusTimer() { for (i = 0; i < 4; i++) {MyRes[i] = C(ID('l' + (i + 1)).innerHTML.split('/')[0] - (pro[i] < 0 ? '0' : ID('l' + (i + 1)).innerHTML.split('/')[1]));  GM_Time[i] = Time(MyRes[i], pro[i]); ID('resource_state[' + i + ']').innerHTML += '<b id="xTimer[' + (i + 1) + ']" style="color: ' + ((pro[i] < 0) ? "red" : "black") + ';">' + GM_Time[i] + '</b><br>'; }; };
function ResourcePercent() { for (i = 0; i < 4; i++) { MyPer[i] = NewMathPercent(ID('l' + (i + 1)).innerHTML.split('/')[0] / ID('l' + (i + 1)).innerHTML.split('/')[1] * 100); ID('resource_state[' + i + ']').innerHTML += '<span id="xPer[' + (i + 1) + ']">' + MyPer[i] + '%</span><br>'; }; };
function ResourcePrud() { for (i = 0; i < 4; i++) { ID('resource_state[' + i + ']').innerHTML += '' + C(pro[i] * 3600) + ''; }; };

function ReTime() {
    for (i = 0; i < 4; i++) {
        if (ID('xTimer[' + (i + 1) + ']')) {
            if (ID('xTimer[' + (i + 1) + ']').innerHTML.match(/0:00:00/)) { } else {
                ID('xTimer[' + (i + 1) + ']').innerHTML = format(ReLoadTime(ID('xTimer[' + (i + 1) + ']').innerHTML) - 1);
            }
        };
        if (ID('xPer[' + (i + 1) + ']')) {
            ID('xPer[' + (i + 1) + ']').innerHTML = NewMathPercent(ID('l' + (i + 1)).innerHTML.split('/')[0] / ID('l' + (i + 1)).innerHTML.split('/')[1] * 100) + '%';
        };
    };
    return setTimeout(ReTime, 1000);
};
function xToolTip(html) {
    ID('T4_mHelp').innerHTML = html;
    return ID('T4_mHelp').style.display = 'block';
};
function dorfA() {
    var cA = C(C(pro[0] * 3600) + C(pro[1] * 3600) + C(pro[2] * 3600) + C(pro[3] * 3600));
    ID('production').getElementsByTagName('th')[0].innerHTML += '(' + cA + '):';
    if (ID('troops').getElementsByTagName('tbody')[0]) {
        if (ID('troops').getElementsByTagName('tbody')[0].getElementsByTagName('td')[1]) {
            var cL;
            var nm = 0;
            cL = ID('troops').getElementsByTagName('tbody')[0].getElementsByTagName('tr').length;
            for (i = 0; i < cL; i++) {
                nm = C(C(nm) + C(ID('troops').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[1].innerHTML));
            };
            var th = ID('troops').getElementsByTagName('thead')[0].getElementsByTagName('th')[0];
            th.innerHTML = th.innerHTML.replace(':', ' (' + nm + '):');
        };
    };

};
function getMap(x, y) {
    var tserver = 'http://'
    tserver += window.location.hostname;
    tserver += '/ajax.php';
    $.getJSON(tserver, "cmd=mapPositionData&data[x]=" + x + "&data[y]=" + y + "&data[zoomLevel]=1&", function (data) {
        var tbl = '<td><a href="build.php?gid=17&x=' + x + '&y=' + y + '"><img src="' + Send_resource + '" /></a>&nbsp;<a href="a2b.php?x=' + x + '&y=' + y + '"><img src="' + Send_attack + '" /></a></td>';
        if (typeof data.data.tiles[49].c != 'undefined') {
            if (data.data.tiles[49].c.match("{k.f1}")) {
                $('<tr><td><img class="r4" src="img/x.gif" />9: </td><td><a href="position_details.php?x=' + x + '&y=' + y + '">' + data.data.tiles[49].t.split("<br")[0] + '</a></td>' + tbl + '<td>< ' + C(Distance(ID('xgy').innerHTML, xyToId(x, y))) + ' ></td></tr>').appendTo('#crop_fields');
            } else if (data.data.tiles[49].c.match("{k.f6}")) {
                $('<tr><td><img class="r4" src="img/x.gif" />15: </td><td><a href="position_details.php?x=' + x + '&y=' + y + '">' + data.data.tiles[49].t.split("<br")[0] + '</a></td>' + tbl + '<td>< ' + C(Distance(ID('xgy').innerHTML, xyToId(x, y))) + ' ></td></tr>').appendTo('#crop_fields');
            };
            var xs = ID('selectOT').selectedIndex;
            if (ID('sO').checked == true || ID('xAll').checked == true) {
                var xImg = '<td><img style="width: 15px;" onmouseout="this.className=\'un\'; return ID(\'T4_mHelp\').style.display = \'none\';" onmouseover="this.className=\'on\'; return getAnimInfo(&apos;position_details.php?x=' + x + '&y=' + y + '&apos;, &apos;' + xyToId(x, y) + '&apos;);" src="data:image/gif;base64,R0lGODlhEQASANUAAPaMMv759fR6EvefUvV8FfzavPvNpfR2C/mydPq+i/V+GveaS/7x5feVQ//9+vzfxf7v4vWBHvV+GPq6hPaROfipZPWFJf7y6P/7+P738PrDlf/+/P717f3q2fR4D/3kz/aTPvWDI/vFlvWAHfrCk/V7FPmraPaJLfvLovaHKfmvcPWCH/V9F/3gyP/9/Pisa////vinYfifVf3jzPV/G/706vvInvzWtfrAjvq3f/WEI/aPN/3dwvvTsPWCIP///yH5BAAAAAAALAAAAAARABIAAAbRwJ9wSCwahbXW7XE5DjO4hiWkAyU4xw9F4PEBUoLD7lHspEo0xIfRMWxDn6FjQWCpIAnU5vcICRoOQgUKESMzDwMHKD8uCywCN0IqAis0BT8ZIQaYIAoEJgEYAxI+NDIFCTGBEworCg0MoqSlCicQGSYsEaUUEBsxBD7CJS8BFR67PiwyWBolK8IRFjsjyT4CJHs1JzQ+EREkHS+zNBYMQzYl3zotPyIs3thFOQQSCgsTADQsJSouRj1A0DhwwIMCCgZgOMHwQMMEDTwCOJlYJAgAOw%3D%3D" /></td>';
                if (((xs == 3) || ID('xAll').checked == true) && data.data.tiles[49].c.match("{k.fo}") && (data.data.tiles[49].t.toString().match("{a.r4}") && data.data.tiles[49].t.toString().match("{a.r1}"))) {
                    $('<tr id="' + (x * xs + y) + '"><td><img src="img/x.gif" class="r4" /><img src="img/x.gif" class="r1" />' + data.data.tiles[49].t.match(/\d{2}%/) + ': </td><td><a href="position_details.php?x=' + x + '&y=' + y + '">' + data.data.tiles[49].t.split("<br")[0] + '</a></td>' + tbl + '<td>< ' + New_Math(Distance(ID('xgy').innerHTML, xyToId(x, y))) + ' ></td>' + xImg + '<td id="' + xyToId(x, y) + '" style="font-size: 11px;"></td><td style="display: none;"></td></tr>').appendTo('#crop_fields');
                } else if (((xs == 2) || ID('xAll').checked == true) && data.data.tiles[49].c.match("{k.fo}") && (data.data.tiles[49].t.toString().match("{a.r4}") && data.data.tiles[49].t.toString().match("{a.r2}"))) {
                    $('<tr id="' + (x * xs + y) + '"><td><img src="img/x.gif" class="r4" /><img src="img/x.gif" class="r2" />' + data.data.tiles[49].t.match(/\d{2}%/) + ': </td><td><a href="position_details.php?x=' + x + '&y=' + y + '">' + data.data.tiles[49].t.split("<br")[0] + '</a></td>' + tbl + '<td>< ' + New_Math(Distance(ID('xgy').innerHTML, xyToId(x, y))) + ' ></td>' + xImg + '<td id="' + xyToId(x, y) + '" style="font-size: 11px;"></td><td style="display: none;"></td></tr>').appendTo('#crop_fields');
                } else if (((xs == 1) || ID('xAll').checked == true) && data.data.tiles[49].c.match("{k.fo}") && (data.data.tiles[49].t.toString().match("{a.r4}") && data.data.tiles[49].t.toString().match("{a.r3}"))) {
                    $('<tr id="' + (x * xs + y) + '"><td><img src="img/x.gif" class="r4" /><img src="img/x.gif" class="r3" />' + data.data.tiles[49].t.match(/\d{2}%/) + ': </td><td><a href="position_details.php?x=' + x + '&y=' + y + '">' + data.data.tiles[49].t.split("<br")[0] + '</a></td>' + tbl + '<td>< ' + New_Math(Distance(ID('xgy').innerHTML, xyToId(x, y))) + ' ></td>' + xImg + '<td id="' + xyToId(x, y) + '" style="font-size: 11px;"></td><td style="display: none;"></td></tr>').appendTo('#crop_fields');
                } else if (((xs == 0) || ID('xAll').checked == true) && data.data.tiles[49].c.match("{k.fo}") && (data.data.tiles[49].t.toString().match("{a.r4}") && !(data.data.tiles[49].t.toString().match("{a.r3}")) && !(data.data.tiles[49].t.toString().match("{a.r2}")) && !(data.data.tiles[49].t.toString().match("{a.r1}")) && !(data.data.tiles[49].t.match(/25%/)))) {
                    $('<tr id="' + (x * xs + y) + '"><td><img src="img/x.gif" class="r4" />' + data.data.tiles[49].t.match(/\d{2}%/) + ': </td><td><a href="position_details.php?x=' + x + '&y=' + y + '">' + data.data.tiles[49].t.split("<br")[0] + '</a></td>' + tbl + '<td>< ' + New_Math(Distance(ID('xgy').innerHTML, xyToId(x, y))) + ' ></td>' + xImg + '<td id="' + xyToId(x, y) + '" style="font-size: 11px;"></td><td style="display: none;"></td></tr>').appendTo('#crop_fields');
                } else if (((xs == 4) || ID('xAll').checked == true) && data.data.tiles[49].c.match("{k.fo}") && (data.data.tiles[49].t.toString().match("{a.r4}") && !(data.data.tiles[49].t.toString().match("{a.r3}")) && !(data.data.tiles[49].t.toString().match("{a.r2}")) && !(data.data.tiles[49].t.toString().match("{a.r1}")) && !(data.data.tiles[49].t.match(/50%/)))) {
                    $('<tr id="' + (x * xs + y) + '"><td><img src="img/x.gif" class="r4" />' + data.data.tiles[49].t.match(/\d{2}%/) + ': </td><td><a href="position_details.php?x=' + x + '&y=' + y + '">' + data.data.tiles[49].t.split("<br")[0] + '</a></td>' + tbl + '<td>< ' + New_Math(Distance(ID('xgy').innerHTML, xyToId(x, y))) + ' ></td>' + xImg + '<td id="' + xyToId(x, y) + '" style="font-size: 11px;"></td><td style="display: none;"></td></tr>').appendTo('#crop_fields');
                } else if (((xs == 5) || ID('xAll').checked == true) && data.data.tiles[49].c.match("{k.fo}") && (data.data.tiles[49].t.toString().match("{a.r3}") && !(data.data.tiles[49].t.toString().match("{a.r4}")))) {
                    $('<tr id="' + (x * xs + y) + '"><td><img src="img/x.gif" class="r3" />' + data.data.tiles[49].t.match(/\d{2}%/) + ': </td><td><a href="position_details.php?x=' + x + '&y=' + y + '">' + data.data.tiles[49].t.split("<br")[0] + '</a></td>' + tbl + '<td>< ' + New_Math(Distance(ID('xgy').innerHTML, xyToId(x, y))) + ' ></td>' + xImg + '<td id="' + xyToId(x, y) + '" style="font-size: 11px;"></td><td style="display: none;"></td></tr>').appendTo('#crop_fields');
                } else if (((xs == 6) || ID('xAll').checked == true) && data.data.tiles[49].c.match("{k.fo}") && (data.data.tiles[49].t.toString().match("{a.r2}") && !(data.data.tiles[49].t.toString().match("{a.r4}")))) {
                    $('<tr id="' + (x * xs + y) + '"><td><img src="img/x.gif" class="r2" />' + data.data.tiles[49].t.match(/\d{2}%/) + ': </td><td><a href="position_details.php?x=' + x + '&y=' + y + '">' + data.data.tiles[49].t.split("<br")[0] + '</a></td>' + tbl + '<td>< ' + New_Math(Distance(ID('xgy').innerHTML, xyToId(x, y))) + ' ></td>' + xImg + '<td id="' + xyToId(x, y) + '" style="font-size: 11px;"></td><td style="display: none;"></td></tr>').appendTo('#crop_fields');
                } else if (((xs == 7) || ID('xAll').checked == true) && data.data.tiles[49].c.match("{k.fo}") && (data.data.tiles[49].t.toString().match("{a.r1}") && !(data.data.tiles[49].t.toString().match("{a.r4}")))) {
                    $('<tr id="' + (x * xs + y) + '"><td><img src="img/x.gif" class="r1" />' + data.data.tiles[49].t.match(/\d{2}%/) + ': </td><td><a href="position_details.php?x=' + x + '&y=' + y + '">' + data.data.tiles[49].t.split("<br")[0] + '</a></td>' + tbl + '<td>< ' + New_Math(Distance(ID('xgy').innerHTML, xyToId(x, y))) + ' ></td>' + xImg + '<td id="' + xyToId(x, y) + '" style="font-size: 11px;"></td><td style="display: none;"></td></tr>').appendTo('#crop_fields');
                };
            };
        };
        $('#crop_done').html(parseInt($('#crop_done').html()) + 1);
        $('#percx').html(Math.round($('#crop_done').html() / $('#crop_tot').html() * 100) + '%')
    });
};
function getElephant(x, y) {
	
    var tserver = 'http://'
    tserver += window.location.hostname;
    var server_link = tserver;
    tserver += '/ajax.php';
	
	var d = $.manageAjax.create('cache', {queue: true, cacheResponse: true, preventDoubleRequests: false});
	
    d.add({
        url: tserver,
        data: "cmd=viewTileDetails&x=" + x + "&y=" + y,
        dataType: "html",
		async: false,
        success: function (data) {
            var obj = jQuery.parseJSON(data);
            data = obj.data.html;
            if (data.split('u40')[1] || (ID('xU39').checked == true && data.split('u39')[1]) || (ID('xU38').checked == true && data.split('u38')[1])) {
                var tr = [];
                var html;
                var num = [];
                html = '';
                if (data.split('u40')[1]) {
                    tr[1] = $(data).find('img[class="unit u40"]').parent().parent();
                    num[1] = parseInt($('.val', tr[1]).html());
                    html = html + '<td><img src="img/x.gif" class="unit u40" />' + num[1] + '</td>';
                } else { html = html + '<td>&nbsp;</td>'; }
                if (data.split('u39')[1] && ID('xU39').checked == true) {
                    tr[2] = $(data).find('img[class="unit u39"]').parent().parent();
                    num[2] = C($('.val', tr[2]).html());
                    html = html + '<td><img src="img/x.gif" class="unit u39" />' + num[2] + '</td>';
                } else { html = html + '<td>&nbsp;</td>'; }
                if (data.split('u38')[1] && ID('xU38').checked == true) {
                    tr[3] = $(data).find('img[class="unit u38"]').parent().parent();
                    num[3] = parseInt($('.val', tr[3]).html());
                    html = html + '<td><img src="img/x.gif" class="unit u38" />' + num[3] + '</td>';
                } else { html = html + '<td>&nbsp;</td>'; }

                $('<tr>' + html + '<td><a href="' + server_link + '/position_details.php?x=' + x + '&y=' + y + '">(' + x + '|' + y + ')</a></td><td>< ' + C(Distance(ID('xgy').innerHTML, xyToId(x, y))) + ' ></td></tr>').appendTo('#elep_fields');

            }
            $('#ele_done').html(parseInt($('#ele_done').html()) + 1);
            $('#percex').html(Math.round($('#ele_done').html() / $('#ele_tot').html() * 100) + '%')
        }
    });
};
function QuickSend() {
    var img = {
        attack: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2wcGETotXvSOywAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAACI0lEQVQokW3Lz0uTcQDH8c/3eR5jublfkZZrTNuWUTktDULE6FJ2KfKUB1uSByMaj0H3/oJ67BJEoOJBuoV16hBkOJY/xqPo09A9OpvP1G26Z9uzZ25j+3YMoje8jm+Eo4d0XkrRpKoHKKX4n6RaDMxLKRqOHlJGL9WwtqtD3M6PZ/IlP/4po5UfibG8sLarQy9VwTSZWZ6rFRBJ6IgktDcZ7e+U0cr+iKIJEaVAuGoBjWaWJ5RSrG4m/CtbKUGtWqwXm+tpZ6t5DAAVY3khohSIlc2pHedPjfm8jkkOAHze5qmceoQlWZnYrnMSQojQYGCgHJVQzSlodZt5n9cxBQAMAKTlRf9Vt03s9lh5LbWD1VgWxQqFoZxEt8fGX3PbxVR0wQ8A3La82THzfvqVz8m5rj8I8PJ+AXvpGMJyC9pd5+A9rePbzOvwarzy++GIbYUVxt8e2BrPinPB5VvHueRg2tiJuLwOk4GFWjEgu/alf11O79wbHB5uu3Q5xAHAGVPF1Ww3WCRpExfaZtF3tw8cy0JamIW0IcNhr7c0GSsuAOAS0o9A8OsnQYomSLFEVUIY9WQx3sJyddiIFWP7B2lL9ojYjJ8/TvTcPrayN7y20NKvfVKrUTx78XLUc6Vrci64fFOnDdk7A4OPe3t7fi6Ggvf3DjVSyyn9XJkxoVqtYejJKO9t75oCAKPp+QDHnYDT5RIBfB8aeWqd/vBOKDFG/AFEDxKNtU2dSAAAAABJRU5ErkJggg%3D%3D',
        sendRes: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAMCAYAAAC5tzfZAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2wcGEgE3nWIm0AAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAABO0lEQVQokX2Qv0tCURTHP9efkFTLoyLQhtTASVpqFiJabGtrtf6AQKKtJaS9waHGBh3EhgYlAhch0DsVZBJmWEmkYA49sttg7+Uz6Tudc8/9cDgfoZTCyP7u9m/zk9brEy6hSCSzwnhzDAJrkXkLkE4VcAn+xDEMpFMFc+gP+LirPFi2ANiMQsoaR8eX+AM+mp0e9/UGuYsi5ZsO8VhUjYSKstqHy2W67Rc2N1ZZiSyzGJ5GV8ICikERAFe5QzU1G6DZqCBlDYDr27pFhm0UYCQcngMgFPRatpnQ+emBBTDqQfDPTZpm2v838VhU2QDOTvbU82PbMmw2Kpa+KKvoqm/evrTgVl+fOpl8iY9Om3FPj27nzfwsZc0063basYsheztb66r1rpv9xJiLUNDLjDZJJl9C8zhJJLPiG9UDhfU4C7tHAAAAAElFTkSuQmCC'
    };
    var IMG_A = [], IMG_B = [], Aa = [], Bb = [];

    function checkXY(XY) { if (/-\d+/.test(XY)) { return XY.toString().match(/-\d+/); } else { return XY.toString().match(/\d+/); }; };
    httpRequest('http://' + window.location.hostname + '/nachrichten.php?t=6', function (ajax) {
        htmltocontext(ajax.responseText);
        for (i = 0; i < xpath("/html/req/div[@id='wrapper']/div[@class='bodyWrapper']/div[@id='mid']/div[@id='side_info']/div[@id='villageList']/div[2][@class='list']/ul/li").snapshotLength; i++) {

            xpath("/html/req/div[@id='wrapper']/div[2][@class='bodyWrapper']/div[@id='mid']/div[@id='side_info']/div[@id='villageList' and @class='listing']/div[2][@class='list']/ul/li[" + (i + 1) + "]").snapshotItem(0).setAttribute("onmouseover", "this.getElementsByTagName('a')[0].style.backgroundColor = 'white';");
            xpath("/html/req/div[@id='wrapper']/div[2][@class='bodyWrapper']/div[@id='mid']/div[@id='side_info']/div[@id='villageList' and @class='listing']/div[2][@class='list']/ul/li[" + (i + 1) + "]").snapshotItem(0).setAttribute("onmouseout", "this.getElementsByTagName('a')[0].style.backgroundColor = '';");

            var topA = '1';
            var topB = '1';
            if (i > 0) { topA = C(C(1) + C(C(18) * C(i))); topA = C(C(1) + C(C(18) * C(i))); };
            if (RTL == 'rtl') { dir = 'left'; } else if (RTL == 'ltr') { dir = 'right'; };
            var xStyleA = 'position: absolute; ' + dir + ': 137px; top: ' + topA + 'px; width: auto; cursor: pointer;';
            var xStyleB = 'position: absolute; ' + dir + ': 152px; top: ' + topB + 'px; width: auto; cursor: pointer;';

            var get_xy = xpath("/html/req//div[@id='villageList']/div[2][@class='list']/ul/li[" + (i + 1) + "]/a[1]").snapshotItem(0).title;

            var cDiv = Create('div');
            cDiv.innerHTML = get_xy;
            cDiv.setAttribute('id', 'MyXY');
            document.body.appendChild(cDiv);

            var g_name = xpath("/html/req//div[@id='villageList']/div[2][@class='list']/ul/li[" + (i + 1) + "]/a[1]").snapshotItem(0).innerHTML;
            var Y = ID('MyXY').getElementsByClassName('coordinateY')[0].innerHTML.replace(')', '').replace('(', '');
            var X = ID('MyXY').getElementsByClassName('coordinateX')[0].innerHTML.replace(')', '').replace('(', '');

            var onclick_a = "location.href = 'a2b.php?z=" + xyToId(X, Y) + "';";
            var onclick_b = "location.href = 'build.php?gid=17&z=" + xyToId(X, Y) + "';";

            IMG_A[i] = Create('img');
            IMG_A[i].setAttribute('id', 'QS(r' + i + ')');
            IMG_A[i].setAttribute('alt', '' + SubLanguage(LanguagePack(), 5) + g_name + '');
            IMG_A[i].setAttribute('src', '' + img.sendRes + '');
            IMG_A[i].setAttribute('title', '' + SubLanguage(LanguagePack(), 5) + g_name + '');
            IMG_A[i].setAttribute('style', '' + xStyleB + '');
            IMG_A[i].setAttribute('onclick', '' + onclick_b + '');

            IMG_B[i] = Create('img');
            IMG_B[i].setAttribute('id', 'QS(a' + i + ')');
            IMG_B[i].setAttribute('alt', '' + SubLanguage(LanguagePack(), 6) + g_name + '');
            IMG_B[i].setAttribute('src', '' + img.attack + '');
            IMG_B[i].setAttribute('title', '' + SubLanguage(LanguagePack(), 6) + g_name + '');
            IMG_B[i].setAttribute('style', '' + xStyleA + '');
            IMG_B[i].setAttribute('onclick', '' + onclick_a + '');

            var send_res = IMG_A[i];
            var send_arm = IMG_B[i];
            xpath('//div[@id="villageList"]/div[2]/ul/li[' + (i + 1) + ']').snapshotItem(0).appendChild(send_res);
            xpath('//div[@id="villageList"]/div[2]/ul/li[' + (i + 1) + ']').snapshotItem(0).appendChild(send_arm);
            ID('QS(r' + i + ')').style.top = ID('QS(a' + i + ')').style.top;
            ID('MyXY').parentNode.removeChild(ID('MyXY'));

        };
        return TAG('req')[0].parentNode.removeChild(TAG('req')[0]);
    });
};

function setup() {
    var pos; if (RTL == 'rtl') { pos = 'right'; } else { pos = 'left'; };
    var Setting = 'data:image/png;base64,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';
    var sIMG = Create('img');
    sIMG.src = Setting;
    sIMG.id = 'setup';
    sIMG.title = SubLanguage(LanguagePack(), '0');
    sIMG.alt = SubLanguage(LanguagePack(), '0');
    sIMG.setAttribute('style', 'cursor: pointer;');
    sIMG.setAttribute('onclick', 'setting();');
    ID('t4tools').appendChild(sIMG);
};

NoteIMG = {
    nIMG: 'data:image/png;base64,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',
    Line: "data:image/gif;base64,R0lGODlhFwAQAIABAODg4AAAACH5BAEAAAEALAAAAAAXABAAQAIVjI+py+0Po5y02ouz3rxjAIbiSIIFADs%3D",
    Note: "data:image/gif;base64,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"
};
GM_addStyle(
"div#xblock { background-color: transparent; z-index: 99000; background-image: url(" + NoteIMG.Note + "); height: 355px; margin: 0 auto; position: relative; width: 290px; position: absolute; top: 120px; " + (RTL == 'rtl' ? "right" : "left") + ": 82px;}" +
"div#xblock textarea { background-image: url(" + NoteIMG.Line + "); background-repeat: repeat; font-size: 13px; border: medium none; height: 256px; line-height: 16px; padding: 0; position: absolute; right: 12px; top: 40px; width: 265px;}" +
"div#xblock p.btn { position: relative; top: 305px; text-align: center; margin: 14px 0; padding: 0;}"
);
var pos;
if (RTL == 'rtl') { pos = 'right' } else { pos = 'left' }
var cIMG = Create('img');
cIMG.setAttribute('src', NoteIMG.nIMG);
cIMG.setAttribute('alt', SubLanguage(LanguagePack(), '1'));
cIMG.setAttribute('title', SubLanguage(LanguagePack(), '1'));
cIMG.setAttribute('onclick', 'sh();');
cIMG.setAttribute('style', 'cursor: pointer;');
ID('t4tools').appendChild(cIMG);
function SearchCropFields() {
    $("#crop_fields").empty();
    $("#scx").attr('style', '');
    var originalX = parseInt($("#crop_x").val());
    var originalY = parseInt($("#crop_y").val());
    var radius = parseInt($("#rad").val());
    var minX = (originalX - radius);
    var maxX = originalX + radius;
    var minY = (originalY - radius);
    var maxY = originalY + radius;
    $("#crop_tot").html((2 * radius + 1) * (2 * radius + 1));
    $("#crop_done").html(0);
    y = minY;
    while (y <= maxY) {
        x = minX;
        while (x <= maxX) {
            getMap(x, y);
            x++;
        }
        y++;
    }
};

send_farm_attack();
function mFullView() {/*
    var imgA = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAnCAMAAABKdvqKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAABo0ByQtFCk9CyY6FTI9Hx9FBSNCBiRBCiVMBClEDitLCSxFEitAGipIEi9MGC1SDjVKGjVeCjdYGDZJJD1TKDhlCjZgEEFdHU1PLERWKENXNVVIJl1QKVpaN0VqHFFvHVd8HkVkJEtlM010JVFnN1V5KltzPl99M21HKGNYLGxZPHVdKmhmOGF/P3hiK3lkM05ZRlZUQ1BlQlxqSV1kVVp0RF9zS2RhSGRiU2Z4SWV6UHZsR3pzTHt3Vnx8Z1eKH0+AIVqIKlqBNF2SJ2eLOWGTLGOUMmiVNmuTPmqaOW6hOXOnO3izNmWDQ2mBTmiJRmyEVm+cSHuCWHGTTHaaS3qbTHeSW3aJZHmFYXiNYnqNanuFcX6QZHekQ4RZK4VqNYNwPIV4SYV6VoK2PYiCV4iTXZSFVYmKa42PcIWVaIeddI2VcYybdIybfJWNZJSTa5iaeIavW4O7QoajZ4uheJagbpWleJqzfqKZeKGsfIbFPobRO4vIRY3UQZbUToiLh5Odg5WcjJmdgp6fipWXk5agiZWqgpyhh56nj56thpuri52zjqOnh6OukaKonKKziqS8gqW2kKSwnKa8kqyxk6y2nam7lK27nbCvj7aulLa6l6q0oq+1rK+/orO8orW7qbq9ori/qry+s7u9uKzDlKzBmrbEnK3AobnHpbzDtr7DvLzLsb3UqcPEn8TIqcTLtMHLu8vOscPUrMTUtMfVusbZssrSssnUvMvbtM3avNHKo9fYrtPaus7jv9jkv/Drtvz4ucPGwcbJwcnPwsvOyszSw83Qy87cxNHVwtLWztLcw9TazNjexNjczNXW0tXZ0trb1drb2M3iw9jlyNbh0dfr0t3h2d3q093w1ejoyeDh0OHj2eHs0+fu3OLw0+Xx2uny1Ojx3P34wvr53AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADlQ5SkAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xTuc4+QAABEdJREFUOE+NlP9fE3Ucx8+iogIVh0hLtxpzmF8CF9lO8VZDmMhGGRkWMhdrsahwFy4qGkWkFnmAmc08E9FgnUY3BAU2FpvUHG4q6scci4vZ+j8+fY4N2MN4PPL9wz3uy/Pz/vJ63+OFwXsM7B45+H/gWT5R0AfnBa9dRx/3xUp9BuEkPPrh0Lxg22kIb+RBeOn3Ud/64KTvzIEdh7j5Stfuh7A35ayvrTfyXSobafJ1F79/IRH8ka91EcLS7N8CtYubpio67uQlV3DPnThRWmhPAEeVPLjvcq80o4PbvuQZf9brkfTkpT+n7bq1XbY3ATyed+PiqdufK3GF6DH82YyFFonwq+QHU/Hkx90vqlZh0Hf6GgPh+KXrmzJPjikVSoodjnpokpCnLElJffThRxaIk47+VCbEztRkZ8l+ILOEwsXLXsNNx/6JovB4o1GSwAULFj50/7K6pLbIYD5m2SGT6pIksifTMjJwkxcR0Sh/8XqHzQrBIpWg6NOXy78NEFjhVk2RWLJULEjNwMkwj02T6IQnTOLqRuvWLdqGV9sN2Da1RleiEoi1KiXhiuWKs9Gom2i0NtTVvVlUXFmFqZ8v0WlUArXVKqdjheNJ0YOXljd80tioKSpvJ7FiXZFULBFkipWEJxGc7sCrtFobrdJSBrixArWmUCYTqDQ4NVM1oTiltGpKXqjg0N9Tn/3AffL0Qq0ORx3OpvTE69MKrVqr2ggQ6GSI9YclKrVU7p5rcPbOI9I+oVp1EK0WC0VM8ne2abaoRbwkM+rEqqMXItnyTRYwhUCOqzYAsU6jlvPruCs8Hjmp990J8T1OhKqrBpZn6mSox/+GC/8+58qpiTBAPdrWrbOYn5YskjTPTj13wKx4O4f+YpdjDGL+ATvbz6xUNCcZwvHOEhITIlMuDUhqEmIH7CAcAgaDPU1KxQWMT4QkOoavIVa3+DuPBCG2t/xrWwSBNULBxsQueQlcxLsr3rPfdJ7rvAqxrlcKXroAAkNHVmxIN8d1jv0VXg+pqF1N/hr6spNFU9+q1xX2+bm/mKeYNaK3EInWE9vQsFlkatljYx00G+ANwN/FhAAA5t3te4y5ZfTsJJSR0FsYN0XSvoDjNm8AAEwB4CQNlnoqP19oJF3RcNhFldUcMuoV7TQ1yIWAf9pSQk6Gam6q7aSOU7kmcneZQoTCmGPuoz6iKbo/AtBeYt5zvrWZbGUDU4BdS5iI+jcMtuqWj/XGHjc30UszHFp0HBzvaKU6zgcHnfbczT2sXV81NGT/YK2hiwGc/ZeOiZhbTRtA8OT+yrJaBoz0jUwAe9XmHnCTYfsATV1hB4KTCSC8fHjnyqyd/eCPEDfSTZj6wd9oPpZ20X/O+mzcUkYPVhZssA2BQV4pFIHA8LDbkejGM94z7vimprvPCQASA5xjOll2Ltlcj7GT44EAr0TQMcbSg3dh81szhFcTi8bu/wUUhzueP53uUwAAAABJRU5ErkJggg==';
    var imgB = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAnCAMAAABKdvqKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAABULBykVDC4lCEwiBkMsFks2G1cnDVQuEk09J1U+K2MsBno+Ck1PLFpaN0NoHVhjHVFzKG9OEXRGCnNCG3lXCnJSG29MKGddNn5IKHlVJnJaOmR9KXltP3txN1ZTQVBRXFVMclFaZF1eeVtgWlpjfWRba2ViSGRjU250Snx4THx4WWdofn59aFVcmVtkiVlho2Nqjmx1g2p0mHN6nmBqrVuHLWiVNHKqN2iCSG2TRHqDVXOaR3mcUX+AaHuBfX+cYX63QX7EOX+Ih3iBlnuGxoM+CohGFIdcBphLD5FaA59XGIBPKYBUOpdZK5NcNoxhCY9qH5hlB5plF4RtN5FmKJplNphzOqVOCqlRC6ZYG7lYC7hbFaNcKKJnBKx2CalkJadoNaN4ObJlKbRpNbNyO4l7Q4h3U5RrQZh1SJV5Wod4aa9sQKx2TL14Q7h9UMRYCcdiFd1mDdhnEsp5O+RlCsF7RpaGPISpOIqES4yKW4iTXZGDSpWKVJKUXoeJaYuTaYuZdZiGbZWWZ5uad4KoWYK/RYinaJWlepi3dq+HR6uBWLyASLiDVbmXRKeOZ6iPcKOZaqOXdryTaqmneYXHRIzTR5DXTc6dOcmCTMeHVNeJTdiMV9uSW8iUaMOadduVZMehSteoSdOkUeiWWfCVVuaYYeOsXOe4TO+1U/G5V+OhcoCKlZmahoiSvJmlipqol52xh5iloqacgKWnhKismaS3iae1lLWrhraulLa0irm5laiuoKyttai0pau3sLa5pLi9tK2zyKvDjrPDm7jRmbjJpr3FtrrQorzHxcSrl8y2lti8pOargemxh+u5lcbFp8XMt8HTp8nYttHKo9LOtdrbrtXVu9TlvPLGqfDSvPDrtvz4ucPKzczYw83R2NTZxdjc1tfmyd3q0t7w1uDfzejnyeLr1eLyyuLx1/34wvr53Orr5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJ7PC0EAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xTuc4+QAABHdJREFUOE+FlI9fE2Ucx68faGVOJ1kZ2fqlO1sght6dDrGygsxwzoDyJxiNgCx+JAZiiJsKxqgZmIwNJx1XmQTWYMJyLsNBYXVjs1Eb63gON7b6H67nbmMs6/Xq+3rd3XPPvZ/P98fz3BfhoubsaVAfLnqiRkffCNyYmYx7IsKYdY07HGMjDguk1RcHR697PJ6baB4EtMPlAiwbmpoC42P9hw+qdbwNupmbFHlqeirEAkdfPQPv/Q3vV6tqDx3StdDXYyjCsX4wHQIMbdaptikVdDAIXEMtalVNdW0tRK0zqggHAAiZ71ds26Tcrdy9NfnK+Y19ll5Lj6amWqWqVg+6opoIC4LTzqUnFEoeVCqTvlqd9vCjy9I2WCyamoyGIdc4wwoo4rcPT0ibP8/KUkBMuSffbAd258TzK23A73IygLF09wnekSupax7Z+8W5vVmboOYeZVZ3BioVzUcfX9Vrs122/VB6bxI6IICXlpfe92nnudMKpWLx4sRkaYaZ9oS9Vo1MkpKSuuaxRVuXr1o9wYPXjG3ZBxLOfpaz6NY5SWjdwJ/hsC/s9YXDGhlq670zcenXK9Oem4Tgb4YlmXkJZzubEm55AK3zQYIn4eXzqFFNndQVZM6n/QHBHw0vb86943Rnc8JtqCbAYwIJV3gDGrTkiJ3963LKJQhebCKNb7yZ19w0J1nm5rUEzcjDIyON+04Gv03ZMMkhZyiSNBmrCnLvklgjjqMgfPFZJSRVAmypT37HIR0kb0aSSpZ540FB1VdKaukgWPZUA4fktgkk2Y6a/+E28mLO0IVCQX/9eheypcAAgywszEdhhDFJb9S/VVps9YDQhfVjyDt6kqx6tXx/pcQzG2Bs5BVRen2R1fH0EPIlSVKFO3e8mCjiSxLLOFJPX1gEP1MljsYR5BeYdcHc2+dlSqLu4nW9Xgl1oNg0am+8ivxugmvatmy+m4/xX87daG7rewtl645eRbifSKjZZcyeq4llPcurpfipVgLH079HuJ8pQzskTW8VBSKS8bqy4mPHMAyS/RCM1BveYCHjzAdjHkBVBNH6DIGv40EjX28Kkivc8RwUdstMDz37SStBYDx47UyHCSbU3lZVpY5P3OfzaqSmvPTWUwSG8TF6aNo9CnccHgzRQUjC7Yns0K9qkZE0iHECE2N81hwLWOZj6Ny066VMuTXm3SzXw01rWoiLFywQH3fxYJC18yfj3bKyF3LnyzXucCDgNstJUvt2m/4VHBNDa+SE3sM6i7TajtcrK7fPu8cgl4qg1RgpyqSvynmQICCKWQSQAxznZ6z5+yvKXsvcZRKqAK0Lxl2MEzyZPhwBoQU8BRUVFeVl25foig0R0KDV7itZATkCP87EQGDNK9+xMz8nWzPyDUV1kSa99qOWPqenHsNx/KgD/lwRQZYFIzRNwwYIQN8HBlL/Ic2wLJxuwHDxWsjNgJMMG5hphaz1ZFE34PjexLIX5GuldfD/j7kW5qPqsREssd/S0zMs9J7Z2f8aAdbl5/X+F5xd/DckPzbTuvnomAAAAABJRU5ErkJggg==';
    var imgC = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAnCAMAAABKdvqKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAC5KFzVMGDlXGENbHE1PLERfI1tXOlpeNUVmH0pnKE1lM051JFdtOlJ4Kld3MlZ6MlxzPV58OmtkOFZTQVtgWmNgSGNhUmxsWWZ3R2p3UnZ6Unx4WWRpb2txbWxwdX9+ZH58bHV5fHp+gV6ELWCLMmiZLmWTMWyTPGydNGuZOnWnOWSDQWSATGiGSmyKTW+HU2+KUm+aQHCNT3uCV3GXTnWcTHmWWnmAaXyWZXehSH2Bg4B0TIiTXYuLb4iYbIWTfIuecYueepWSaZSdbZ2bcpybfoWkXImlaI2oc5GhfJGucJOrepird5i1eKGrfqPDfIyNjoWLkYmNkY2ThoyQlo+UmpSbjZ2fgpeck5qdnpuepJ6eq5argZuhi5ynl5yomp22g6CeoqCmh6Sphairgamrk6G0hqCyi6K9hKS7iqm3lraulLO0lLO2mrC7lbi1nb69k6CipKKmq6WspaWpraqtrq22oKywq6u8pa2wsrG2prK7o7a/rLm7p7u9q7W6tLW6vLa2wLS6wrm+xby/yKjGh63HkrLNjrfDn7HMk7TNnLvNm7nWmrbMprjEoLnCrbvPpbrDsr3Eu7PSoLzUor3cor3aqL/Xs77gpMXNm8HbncHJpcDLrcLLs8TKvMLco8PTs8XRusTZssvWtsvUusjbs8vZu9HKo9rbrtXTvtLbtdLfvcLhncLgpMvhtc/gv9LjvPHrs/Drv//xtv35tfz4u8XHxsDEyMTJysjLyMbM1MnN0szVws/dxczR1c/V3NLXxNDVy9LexNPZy9ncz9HU1tLV29Tb0tPZ3tHU4dXa4djc4tvd69TixNrly9rozOLiwe/nxuLs1P31wP/2yP76w/v5yPr53OPl4+Hl6unt4+rs6u/v8Ory4/H06/L08gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKBcQJYAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xTuc4+QAABAZJREFUOE+NlP9fE3UcxzHRrZMm2NpJLeOLFSpB2XIBRSmNDl2L0LKyb7NZsdMSjEr7JpGfzcnH/NKdzZV9+CKOjDMHXJmUGiZhNBDvS9oq/pP1vtsYNvjBz+Nxt8c+99zr/Xq/Prt3Rvz/a2LjU7G0rcTXjLTdocaCxusCm34oLLgucMPIjoILE7Hz0+C00rHGqwNNdzz3c4I7pl1bzs3gMVZYcfpsy9OLjr67D57+tK49/t1njq0zgE3bbq8bGjq9dlHFOnh6cO36+OBuz5bp4MSG4ea6luHhlmdeeP5oPL6zpa6iva1TM5AWz5UdV39fn09bDHPoW16Ot709cuqVe1YdmSHHC815ljzPl91qpMFhNUcP7jxQsqRk9Yud0xR/pCs3/ykrkhSRJNlhpS93rbjrzuwHvOng33RlX5+kKIooSZIodVfRg6vvK1laNA2kq8cBkzRUEUUlMl5Nx9vbXI/vT1PMt4Y1SAIUPkBV/cY6dUBTJ3PF3CCKmpp+SSJo9jWYEycEnafAgXxrr9g/icmqpi2KeU6u6yT7bPXHKTBWuNCjiv0Jg4mbCDdPnpvrWPVm5Ucp8PttC8OSDuos5KNLNlhqnHs8r742pfjOGfNxNammM7Iqq4oaMTBl9Y+wL304qRhrPGOQ+8UkqjetquBRNaxh3E/cms9Ogu9v/MTcKyo6mNBVNReRXrPdVsMsLlqZBI88+F4zDR6TDjUswYdpxNiZ5eXOBDj46KenRs5WQ61Ujpo28FUWl99bb1/h1cG/fNt3XfxjxNqraono4ciyJq7K1twFSFv7Afx34oMA+e3iAOv1yAAmNaGRiCpvpqlZuQi5EAbw1+1c8JBv7xc4lBtOWoNwFLFflMPWHCqLcqFaxAG4j8UCL/A8xrgqkigtKbIKZx1xWCiTiZrFoNpWAL/CAoHF+TAxPhxRQQoWdKV2VxnnUTdmU3OLkcsH4DEeCwLieZ6EyP22BlWW4UhkRd1ko3JmF2XNnZfrQijQlhGPkh5C6nlewCQwf+kcmyMsj4+HN9lw2U0UY7evAQxh3JERH+0KhQjBLhQQuNK7ly2xWQxGo9GGCXYHEPYHMEI9mBuEHKMEihLeFxAEp2lZeSlPnAwnkKBAtAYxrkF4T6ce+NgJATYFsFBGZea49957Q6bbT0gwCO7BETrE7j6f+j8KUBnzn6Obn3TbM+ebFizHQogIIAB5IPaaV+Ey7PXA7x96rDibMmXNXswAFQT32PsGq02s1DvzT/QEwQK+zcaUUlSWqRiByxCPA6+z7IFf0mbPSYKxq96HfVR5LYNDHDQSeIvd+vUMY4+0+v2Y49wQHE9Ia+hw57nJ2Zs2cY+Tw+Tb0bGxjo7o6OilS9cM6P8AlcpIworLO5cAAAAASUVORK5CYII=';
    var imgD = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAnCAMAAABKdvqKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAE1PLFVMKlpaN39aFGVdOHJZNGpjLXJqNVZTQVtgWmBZRWNgSGphTm9sR2RiU250Snh6Rnx4WX59Z3F+gHF8iX2AVniCi3iCk4V7OoZ9Q4V4Yo2BPpSFP4uFRoaHVouTWpaKR5KJV5mVWIiKaY2JcoiRY4STfYaYcoiadp+PeJWSaZmVZJuWbZ2aYpydap2ceJikapumcZqrf6KTS6SXVKOgXqmiXLWmWqakaaOqaq2jYa+tb6akd6eqea6sdKqtfLiuZb2yabW0c7e2eb20c7m1er25f8G1ZMKyasW4b8y+bcK8csS+e8q+c8zAb8XBe8rEfdXGbNXJdNTKe9nHetjJdNnLfN7Se+LVeuTZeuvcfPDdfe/iffPjffXoffnof4OHiYyRgYqSn4yckJWcjJWlg5Kjjp+rhpysiZ6ulp6xiaaohaGzhKO2iqW5iquxjqq5hqm7jKK3kaaynKS4kqm8k6q9mraulLS6hLG9jbi3g7q7grm5jrC9kbC9m769k6Sqsqu6oKzBk6/EnbfCkLLDm7TKlrTJnLrJmrzVn7PEoLbKorjHpLrEqrnMo7zMq77Ft77NsLzSo7zQqcHBgcPGi8LIis/LgcfNns3UndbHidXUi93ThN3Rid7ak97bmsLKpMjMt8TTrMHZpcjXtdHKo9jarNPYuc7hvOLWguTZhOvcguzci+rbl/HegvDei+7hhe7gi+7jkPPjg/Pki/bqhPbpifjlhfjljPvshfvri/Pkk/Tlm/TplPTomvnmlPjnnPnrkfnqnfzxi/zwkvbnoPDrtvz4ucTFycTKxMfKzs7JwsvVws7cw9TbxtXU19TY2M3hwdPjxNrlxNvizNvqy9vj0tzq097q2Ozox+Hm2uHs1OPt2+Px2f34wvr53AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB+2p9wAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xTuc4+QAABDNJREFUOE91lI1fE3Ucx8+W6YI6HTULaHAbUobh1F3NqBQztDKKWMk4WI9W1AClACujGYRDlqOGPRGUEYPgYEI3Hu53x8M52GXFSknmGq3/5Prdw2CQfV+vu9c9vO/z/f4+39/3EEGK30/dVuH0uN1tn7hcNVXVLlfT2x9VVDa89dr3v83LBAKPP34+teXuxjZny8fvHnjowLlHn9q7o8HpPuPxeE5v23bP7rrW5s/+EsFLr9yx5XWnu/ucxWItJQjCZqOsh08+8l5DveeMu7nWWdPYWN26iAi/vnT7q/WumoOWch+kCIIap2DYbGT/MwX7qrrboXBTdZ0bEe696eX5Ky3f0lDHDwmCAoAGYAye6dmBLz4/7oRkdaML+SXtxlvfbNv3QClNPUtRo9yhwouTDMNOsQwAozQY/ubB0+0/eJwe5NKH+luytiatx8gACADAdQ3NTc1NTbIdHUPsBFQF3P76nh97epCr0bP5pf1562/YWAzEYFmWYfzDnfj+oZ8Y3zh84ivqDYejyLWrJ8fAGF2St+FOagKMU0dT0CTVOvRmy+CFwQskBclZcHghvIREQ3upYZKgKEshSVFpSSn2832xoMOoUQ+QPrL8BbgwruRrqDgfKrCVW80lZJmPItCtJ/6JwQjG+JhRg5LEkWGYm6YHvvobeaengB61PtFPlpURaBbPi5x44vneHNSa95zoFQ2+u4J8GjoIF0tRL9oI9GhE4kQSfhGMGNGSUWmF4Es3shh6P3ARusb4UzTeuJyi2qcR/RGTFzUjS6EdAQ56wg6qHXJiRRTe8A41AH7oJthTiyxFj3HAz86wKZpgIiiJ8ymwPwAEBjJakXDYDm+mmU7ULr5RSozXYE9joN4IJoJL9k5oFZhCvXFO8kf+wpFcAgLFJmxXNyJEzz42OQ3ogLpvpcDlq6DKHxjAdbq6Bbhxw6ldM1BftSIIC5D95GOq0cdTTZsrLkujkGFgOECr4yYmCAcjajwdy62TZ+aafWMRB4BY43+Se1Fct/mN+HCF9AUQ9BmVhIl0TrIhs3V5Chfv0wVgAzQRpbIEUqPPbloZV6FNL/UJGpkQPLToBJol68lzLYS2S53fJPU6oYVeTYZL4WTwz1wJHMlRfJbN5oPG5No4p4BGChZJj6gyIclLAcneHFXVMieD0YcHaZrzD7Ks1rGc267NPr7CKaD9SRpMT3Ls3Nw6rdEbi0S8di2WWZnAyaBw/hDcQAAwzExXhzZZBUOry65J5BRwAafE2QDcJDPCcVYzjt2fUb2Kk8HFy3gx/NkQftigAHjebDLl7qpsvw4oCB/o8idmrQQA5BGzCcfxzErPak5JLfRo081PF1ryzSYMw3HDzjV5452BBh1LxdJ1ELoL12XuXL2MhBaKlwY9ZoJimC6jZU3SNaBg3643GPbsrr8upmyK/3m36vG/k4AtntEwBKYAAAAASUVORK5CYII=';

    
*/
};
function SearchElephants() {
    $("#elep_fields").empty();
    $("#sElphant").attr('style', '');
    var originalX = parseInt($("#elep_x").val());
    var originalY = parseInt($("#elep_y").val());
    var radius = parseInt($("#rad_elep").val());
    var minX = (originalX - radius);
    var maxX = originalX + radius;
    var minY = (originalY - radius);
    var maxY = originalY + radius;
    $("#ele_tot").html((2 * radius + 1) * (2 * radius + 1));
    $("#ele_done").html(0);
    y = minY;
	
	
	
    while (y <= maxY) {
        x = minX;
        while (x <= maxX) {
            getElephant(x, y, maxX * maxY);
            x++;
        }
        y++;
    }
};
function Resource_Needed() {
    if (ID('contract')) {
        if (ID('contract').innerHTML.match(/resources r/) && CLASS('showCosts')[0]) {
            for (i = 0; i < xpath("//div[@id='contract']").snapshotLength; i++) {
                var res = [];
                var Total = [];
                var Timer = [];
                var Color = [];
                var sTime = [];
                var xxs = [];
                var NPC;
                var NPC_Timer;
                var NPC_Time;
                var table = Create('table');
                table.setAttribute('cellspacing', '0');
                table.setAttribute('style', 'width: auto;');
                var tb = Create('tbody');
                var tf = Create('tfoot')

                for (c = 0; c < 4; c++) {
                    if (xpath("//div[@id='contract']").snapshotLength >= 2) { res[c] = xpath("//div[@id='contract']/div[2]/div[1]/span[" + (c + 1) + "]").snapshotItem(i).innerHTML.split(">")[1]; } else {
                        res[c] = xpath("//div[@id='contract']/div[2]/div[1]/span[" + (c + 1) + "]").snapshotItem(0).innerHTML.split(">")[1];
                    };
                    var SaveRes = [];
                    Total[c] = C(ID('l' + (c + 1)).innerHTML.split('/')[0] - res[c]);
                    if (Total[c] < 0) {
                        Timer[c] = Time(Total[c], pro[c]); Color[c] = 'style="color: red; font-size: 12px;"';
                        SaveRes[c] = Total[c];
                    } else {
                        Total[c] = '+' + Total[c]; Timer[c] = ''; Color[c] = 'style="color: green; font-size: 11px;"';
                        SaveRes[c] = '0';
                    };

                    if (Timer[c] == '') { xxs[c] = ''; } else { xxs[c] = ''; };
                    tb.innerHTML += '<tr><td><img src="img/x.gif" class="r' + (c + 1) + '" /></td><td ' + Color[c] + '>' + Total[c] + '</td><td class="xT4_Time" style="font-size: 11px;">' + Timer[c] + '</td><td style="font-size: 11px;">' + xxs[c] + '</td></tr><tr>';
                };
                table.appendChild(tb);
                var npc = C(C(Total[0]) + C(Total[1]) + C(Total[2]) + C(Total[3]));
                if (npc > 0) { npc = '+' + npc; Color[5] = 'color: green;'; } else { Color[5] = 'color: red;'; };
                tf.innerHTML = '<tr><td colspan="4"><hr style="margin: 1px 0;"></td></tr><tr><td style="text-align:center;"><img class="npc" src="img/x.gif" /></td><td colspan="4" style="font-size: 11px;">(( <span style="' + Color[5] + '">' + npc + '</span> ))</td></tr>';

                table.appendChild(tf);
                xpath("//div[@id='contract']").snapshotItem(i).appendChild(table);
            };
        };
        function RTM() {
            for (i = 0; i < CLASS('xT4_Time').length; i++) {
                if (CLASS('xT4_Time')[i].innerHTML == '' || CLASS('xT4_Time')[i].innerHTML.match(/0:00:00/)) { } else {
                    CLASS('xT4_Time')[i].innerHTML = format(ReLoadTime(CLASS('xT4_Time')[i].innerHTML) - 1);
                };
            };
            return setTimeout(RTM, 1000);
        };
        RTM();
    };
};
/*function VillageOverView(){
var src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAuJJREFUeNqkU8lPE1EY/6ad6dAOSwttLcUolIrAASPVWEncIulBjVESl+jZg4l/ggdvnkz06EU8FA9iNMaIYvRgmhASUw2NQJQuLBZZOixtp515s/k9iojRxIOT/ObNm2/9fQtjmib8z8PS14n+pft4hP4ijyNuIzhEEYOJhq4TTdNAU9VfDnRdj4Fphi5F/CFFqWTEsgw8eTcP54837hbXiSebk8nsQlkydJhA8fefESz0hd6i6HV4YGg2ziAlqaCCIutAI6nEYATO6gv6HLvPHPZ02lgzgsECvzlQFcUPhtZzOuwN5ZYkqKoCIIqKxgQG32YKo+OL1VJZCa6KcmvkgHs/A/pF0zCcSGczA0L6mr18ML9SwtRNePRyKm5D1pqiACrF57Lrb17FZsqySgLikhTc5ea70OaIjnXYqAFRlJ6GaraeRk1kxBTeRx8+m6jkiE4sFuYjMvMlpnLdHf7ane4aVkGdYyh9UaEgy21WC+PQTANSmeU1XdNuYPS7iHi5WITC6hrNciidWeZRpwl1A2hzELGVgVTWjLyqmRvfRgmpcFwU+xFFCrTFMSmfj1pZVpA0s5YDg+oJW20ksvxhuSDX6gzLe9yCkp3LncLIQxzPw+Z8UIR9vjqnKBtgBbWENl+3d+H97DdxUgQu7WppwlqRozg03TJmgjI42dcTwjPs7mxtRR2Yy4oreB+hsooDQmLTX2YSVU4hmbUK6UBv2F6zwxXBWoQwVUiVGNh3oTeULFvAEOyQHJ9Oos1TOo0bDpDnmlwsPY4PDn9y1NlT83xd0jwULjZePleDxYN1Kw9jBSu46h0wFn0eJ5JEo88XX9+q1KAwcAUs3va0svds+fODUqezLSBAS7NN8ftMOkwGDoXdYsKCAdBx/Wooca+fmk1qixNRhm4jwzD0B62qh7G7GsDTLkC1n2NI3gBv1zVo2NP2x5qJU5PGyJ2b2x3YEA6EHcH8Y4vpxmm0fD8EGADFhK0+biwMlwAAAABJRU5ErkJggg%3D%3D';
var img = Create('img');
img.src = src;
img.style.cursor = 'pointer';
img.style.float = 'right';
$(img).bind('click', function(){
var getTR = ID('overview').getElementsByTagName('tbody')[0].getElementsByTagName('tr').length;
var getLinks;
for(c=0;c<getTR;c++){
getLinks = ID('overview').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[c].getElementsByTagName('a')[0].getAttribute('href');
GM_xmlhttpRequest({
url: getLinks,
method: 'GET',
onload: function(data){
var A = $(data);
if(A.find('#movements tbody')){
;//att
ID('overview').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[c].getElementsByClassName('att')[0].innerHTML = A.toString().getElementById('movements').getElementsByTagName('tbody')[0].getElementsByTagName('td')[0].innerHTML;
}
}});
};
});
ID('overview').getElementsByTagName('td')[0].appendChild(img);
};*/
function ViewMessege() {
    if (exp(/nachrichten\b[^>]*php/)) {
        IMG_open = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFPBSgJRFD3WLALbjDomiBYWVESLmIqMkSyiTVCbFn1BLfydXNQPFLRuE5IIUhBMrSQhkjAEzanZ5EIdtXffzDgOZBuF49z7zjuHM/fN8/R6PYzyE04vVHqmZFk+Zk/FWs8zXDGkrT7F4OJVVeW8wP6ykiQlD+aB0KTJVn+gvH1DKdRxRv2SBMz63Hy5LCn1ev1ojPXJaDSKoBe4zqjIqCVUPnXEI8BuzBRQTWvE0R7aSxrSCp1OBwSjO47Dbbn/bkYXrnp5WgQIVm/rBMMw0G63ucFNToUoihyLEdFl8PKhQ9dN7G/JpoZpBSo4uhPYSzgJ2gMJqJ4LM8Ow2O9tHTdotVowOsDdvZNgJjSQgHHvVSfBzqbMNdyAilazyV0TG8MThIMih92ThrQ8QZMSsMWHRyfBVMA9g5rmJIivy1zjJLAM1laHn4LfJ3LYva3rD7H7zxf9F+caIuEy94rKV4OTYb8XC+wYV2IB3j+XNBTZMQ7yfQM6y1qthmJRR6Nhbih6vXhic7gNmAaapvF3H+RpTqT1yCfnWbZWsC5P3kqoWJcnZfXpIfySZ9Tr/CvAAFL4JRqBf1s8AAAAAElFTkSuQmCC';
        if (xpath('//table[@id="overview"]/tbody//td[@class="noData"]').snapshotItem(0)) { } else {
            if (xpath('//table[@id="overview"]/thead/tr/th').snapshotItem(0)) {
                xpath('//table[@id="overview"]/thead/tr/th').snapshotItem(0).setAttribute('colspan', '3');
                for (c = 0; c < xpath('//table[@id="overview"]/tbody/tr').snapshotLength; c++) {
                    var Target = xpath('//table[@id="overview"]/tbody/tr[' + (c + 1) + ']/td[3]').snapshotItem(0);
                    var td = Create('td');
                    td.setAttribute('class', 'sel');
                    var a = Create('a');
                    a.setAttribute('href', 'javascript:void(0)');
                    var image = Create('img');
                    image.setAttribute('src', IMG_open);
                    image.setAttribute('onclick', 'XMLGetM(' + (c + 1) + '); return false;');
                    a.appendChild(image);
                    td.appendChild(a);
                    Target.parentNode.insertBefore(td, Target);
                };
            };
        };
    };
};
function ViewRep() {
    if (exp(/berichte\b[^>]*php/)) {
        IMG_open = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFPBSgJRFD3WLALbjDomiBYWVESLmIqMkSyiTVCbFn1BLfydXNQPFLRuE5IIUhBMrSQhkjAEzanZ5EIdtXffzDgOZBuF49z7zjuHM/fN8/R6PYzyE04vVHqmZFk+Zk/FWs8zXDGkrT7F4OJVVeW8wP6ykiQlD+aB0KTJVn+gvH1DKdRxRv2SBMz63Hy5LCn1ev1ojPXJaDSKoBe4zqjIqCVUPnXEI8BuzBRQTWvE0R7aSxrSCp1OBwSjO47Dbbn/bkYXrnp5WgQIVm/rBMMw0G63ucFNToUoihyLEdFl8PKhQ9dN7G/JpoZpBSo4uhPYSzgJ2gMJqJ4LM8Ow2O9tHTdotVowOsDdvZNgJjSQgHHvVSfBzqbMNdyAilazyV0TG8MThIMih92ThrQ8QZMSsMWHRyfBVMA9g5rmJIivy1zjJLAM1laHn4LfJ3LYva3rD7H7zxf9F+caIuEy94rKV4OTYb8XC+wYV2IB3j+XNBTZMQ7yfQM6y1qthmJRR6Nhbih6vXhic7gNmAaapvF3H+RpTqT1yCfnWbZWsC5P3kqoWJcnZfXpIfySZ9Tr/CvAAFL4JRqBf1s8AAAAAElFTkSuQmCC';

        if (xpath('//table[@id="overview"]/tbody//td[@class="noData"]').snapshotItem(0)) { } else {
            if (xpath('//table[@id="overview"]/thead/tr/th').snapshotItem(0)) {
                xpath('//table[@id="overview"]/thead/tr/th').snapshotItem(0).setAttribute('colspan', '3');
                for (c = 0; c < xpath('//table[@id="overview"]/tbody/tr').snapshotLength; c++) {
                    var Target = xpath('//table[@id="overview"]/tbody/tr[' + (c + 1) + ']/td[3]').snapshotItem(0);
                    var td = Create('td');
                    td.setAttribute('class', 'sel');
                    var a = Create('a');
                    a.setAttribute('href', 'javascript:void(0)');
                    var image = Create('img');
                    image.setAttribute('src', IMG_open);
                    image.setAttribute('onclick', 'XMLGetR(' + (c + 1) + '); return false;');
                    a.appendChild(image);
                    td.appendChild(a);
                    Target.parentNode.insertBefore(td, Target);
                };
            };
        };
    };
};
function Show_Help_Links() { // иЇй?иБй?иЇиЈиЗ иЇй?й?иГиЇиЙиЏиЉ
    GM_addStyle('#hlink { background-color:rgba(255,255,255,0.9);border-radius:5px 5px 5px 5px;padding:5px;margin:4px auto;width:100%;box-shadow:0 0 2px #222; }' +
	'#hlink h1 {font-size:12px;color:#333;text-align:center;}' +
	'#hlink span.edit {float:right;cursor:pointer;}' +
	'#hlink ul {margin:0;padding:0;}' +
	'#hlink li {list-style:none;padding-left:5px;} #hlink li a {color:#555;}' +
	'#hlink input {font-size:9px;} #hlink input.name {width:30px;}');
    $('' +
'<div id="hlink"><h1>' + SubLanguage(LanguagePack(), 12) + '</b>:</h1><ul>' +
'<li><a href="http://travian.kirilloid.ru/villages_res.php" onmouseover="this.style.color = \'blue\';" onmouseout="this.removeAttribute(\'style\');" target="_blank">' + SubLanguage(LanguagePack(), 13) + '</a></li>' +
'<li><a href="http://travian.kirilloid.ru/warsim2.php" onmouseover="this.style.color = \'blue\';" onmouseout="this.removeAttribute(\'style\');" target="_blank">' + SubLanguage(LanguagePack(), 14) + '</a></li>' +
'<li><a href="http://travian.kirilloid.ru/distance.php" onmouseover="this.style.color = \'blue\';" onmouseout="this.removeAttribute(\'style\');" target="_blank">' + SubLanguage(LanguagePack(), 15) + '</a></li>' +
'<li><a href="http://www.traviantoolbox.com/" onmouseover="this.style.color = \'blue\';" onmouseout="this.removeAttribute(\'style\');" target="_blank">Travian Toolbox</a></li>' +
'<li><a href="http://travmap.shishnet.org" onmouseover="this.style.color = \'blue\';" onmouseout="this.removeAttribute(\'style\');" target="_blank">TravMap</a></li>' +
'<li><a href="http://travian-live.com/" onmouseover="this.style.color = \'blue\';" onmouseout="this.removeAttribute(\'style\');" target="_blank">Travian-Live</a></li>' +
'</ul></div>').appendTo($('#side_info'));
};
function AttackInfo() {
    for (i = 0; i < 10; i++) {
        document.getElementsByName('t' + (i + 1))[0].setAttribute('onfocus', 'return OnChange();');
        document.getElementsByName('t' + (i + 1))[0].setAttribute('onblur', 'return OnChange();');
        FindNext(document.getElementsByName('t' + (i + 1))[0]).setAttribute('onmouseup', 'return OnChange();');
    };

    GM_addStyle('#TrXw td{padding: 1px 2px 1px;} #TrXw {box-shadow: 0px 0px 5px 0px blue;}');
    var HTML = '<table cellspacing="1" bgcolor="silver" style="width: auto;" id="TrXw">' +
'<tbody>' +
'<tr>' +
'<td colspan="2"><img src="' + imgatti + '">У?<span id="xtr[1]">0</span></td>' +
'<td colspan="2"><img src="' + imgattc + '">У?<span id="xtrs[1]">0</span></td></tr>' +
'<tr><td colspan="2"><img src="img/x.gif" class="def_i">У?<span id="xtr[2]">0</span></td>' +
'<td colspan="2"><img src="img/x.gif" class="def_c">У?<span id="xtr[3]">0</span></td></tr>' +
'<tr><td colspan="2"><img class="carry full" src="img/x.gif">У?<span id="xtr[4]">0</span></td>' +
'<td colspan="2"><img class="r5" src="img/x.gif">У?<span id="xtr[5]">0</span></td></tr><tr>' +
'<td><img class="r1" src="img/x.gif">У?<span id="xtr[6]">0</span></td>' +
'<td><img class="r2" src="img/x.gif">У?<span id="xtr[7]">0</span></td>' +
'<td><img class="r3" src="img/x.gif">У?<span id="xtr[8]">0</span></td>' +
'<td><img class="r4" src="img/x.gif">У?<span id="xtr[9]">0</span></td>' +
'</tr>' +
'</tbody></table><br>';
    $(HTML).insertBefore($('.destination'));
    
};
function BuildingView() {
    if (exp(/dorf2\b[^>]*php/) && ID('village_map')) {
        var IMG = function (cName) { return '<img src="img/x.gif" alt="' + CLASS('r' + cName)[0].getAttribute("alt") + '" title="' + CLASS('r' + cName)[0].getAttribute("title") + '" class="r' + cName + '" />'; };
        var PN = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2wgdChYDrijjdAAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAACU0lEQVQ4jZ2SsU8TARTGf3ft9XrXEgoBi6IWBasxRCcTFWKCMQwmGkcTHfwD/BccTBiYSGR2McbowoKbkYWBGAOBhGpIBKGlyF1p6bX0ene9a88BKGIZjN/08vLe73358gRfG/f5Ty3MTRE8LApmEoCwEABAz5WZ+bpDXWzw6G4/bWERgIAiAzA01A+wDwA4c64LJRSiZjnUXRE9V2Y4qTDxZol0psirl6OEFBmrViNQPzItHhbp1QJW2SXc3olu1PG0Mk9G+nl2q5eZ+Szvp1PsGjax7ihypLl25ODj53VU+ScBSUXTitxLSGyvFejpbqPhVJidzdAIhnn84BJWvsTFvp7jgKWVIooqYVUNMls5rrafB2B500CUo+imxeKiRn6rhFmxeTt85TgAwKq6JOIKiXiC17ObZNIGyxkTOejx96GWDBRVIhFXANguugDcud3H5PMbPBzsoVBy6FQFng6dYiB2BGg68C2Ts70x1rImWnaXd2Oj3Lw/CHsWI990ym4A3TARk1GuX4i2Ai53RGkTRAzbpSsWAqBmRankHbIl6yCPCrm8w6Nr3a2A0zEFPFgr2EQkgReTX+j78J0Ns0YqaxBXJNqDAoWqy/yPUiugKgqs5vfwBDBdn5Vdm1TRxvEgEgAJAftg1hVPyOBTaps9T0SVZIqWA4AcBFkQ8RqQrXgExf0P/GXWWgG65TLYESaiSHTGO9jcsUmly9j1AILoHh/+Q82eKskYdgNwGRsZIJmIMDW3zsT0BhDCxUev1HH8BlSrTYDga+P+wtzUCex/02+Ma/vfRtDi1QAAAABJRU5ErkJggg==';
        var Div = Create('div');
        Div.align = 'center';
        var Table = Create('table');
        Table.setAttribute('style', 'border-collapse: collapse; width: auto; background-color: transparent; z-index: 10000;box-shadow: 0px 0px 10px 3px black;');
        Table.cellSpacing = '4';
        var Tbody = Create('tbody');
        Tbody.innerHTML = '<tr id="bList[1]"></tr><tr id="bList[2]"></tr><tr id="bList[3]"></tr><tr id="bList[4]"></tr><tr id="bList[5]"></tr><tr id="bList[6]"></tr><tr id="bList[7]"></tr>';
        GM_addStyle('.bList {border: 1px solid black; width: auto; box-shadow: 0px 0px 5px 0px black;}');
        Table.appendChild(Tbody);
        Div.appendChild(Table);
        ID('mid').appendChild(Div);
        for (i = 0; i < xpath('//div[@id="village_map"]/img[contains(@class, "building g")]').snapshotLength; i++) {
            var TypeName = xpath('//div[@id="village_map"]/img[contains(@class, "building g")]').snapshotItem(i).className.match(/\d+/g);
            var ImageClass = xpath('//div[@id="village_map"]/img[contains(@class, "building g")]').snapshotItem(i).className;
            var Level = xpath('//div[@id="village_map"]/img[contains(@class, "building g")]').snapshotItem(i).getAttribute('alt').match(/\d+/g);
            var Name = xpath('//div[@id="village_map"]/img[contains(@class, "building g")]').snapshotItem(i).getAttribute('alt');

            var Color = [];
            var TypeU;
            var CountTime = [];
            var img = [];
            var available = '';
            if (bCost[TypeName]) {
                if (bCost[TypeName][C(Level) + 1]) {
                    var wood = C(C(ID('l1').innerHTML) - C(bCost[TypeName][C(Level) + 1][0]));
                    var clay = C(C(ID('l2').innerHTML) - C(bCost[TypeName][C(Level) + 1][1]));
                    var iron = C(C(ID('l3').innerHTML) - C(bCost[TypeName][C(Level) + 1][2]));
                    var crop = C(C(ID('l4').innerHTML) - C(bCost[TypeName][C(Level) + 1][3]));

                    var NPC = C(C(crop) + C(iron) + C(clay) + C(wood));
                    var NPC_href = '<a href="build.php?gid=17&t=3&r1=' +
            C(bCost[TypeName][C(Level) + 1][0]) + '&r2=' +
            C(bCost[TypeName][C(Level) + 1][1]) + '&r3=' +
            C(bCost[TypeName][C(Level) + 1][2]) + '&r4=' +
            C(bCost[TypeName][C(Level) + 1][3]) + '"><img src="img/x.gif" class="npc" /></a>';

                    if (NPC > 0) { Color[5] = 'travian_NPC'; } else { Color[5] = 'red'; };

                    for (b = 0; b < 4; b++) { img[(b + 1)] = IMG('' + (b + 1) + ''); Color[(b + 1)] = 'darkgreen'; };
                    if (wood < 0) { Color[1] = 'gray'; CountTime[1] = '<font style="font-size: 11px" class="xbTime">' + Time(wood, pro[0]) + '</font><br>'; } else { wood = '+' + wood + '<br>'; CountTime[1] = ''; };
                    if (clay < 0) { Color[2] = 'gray'; CountTime[2] = '<font style="font-size: 11px" class="xbTime">' + Time(clay, pro[1]) + '</font><br>'; } else { clay = '+' + clay + '<br>'; CountTime[2] = ''; };
                    if (iron < 0) { Color[3] = 'gray'; CountTime[3] = '<font style="font-size: 11px" class="xbTime">' + Time(iron, pro[2]) + '</font><br>'; } else { iron = '+' + iron + '<br>'; CountTime[3] = ''; };
                    if (crop < 0) { Color[4] = 'gray'; CountTime[4] = '<font style="font-size: 11px" class="xbTime">' + Time(crop, pro[3]) + '</font><br>'; } else { crop = '+' + crop + '<br>'; CountTime[4] = ''; };


                    var xCrop = C(C(bCost[TypeName][Level][5])) + ' -->' + C(C(bCost[TypeName][C(Level) + 1][5])) + ' =[+' + C(C(bCost[TypeName][C(Level) + 1][5]) - C(bCost[TypeName][Level][5])) + ']';
                    var pnx = C(C(bCost[TypeName][Level][4])) + ' -->' + C(C(bCost[TypeName][C(Level) + 1][4]))
                    var X = '' +
            '<td class="bList"><center><a href="build.php?gid=' + TypeName + '">' + Name + '</a></center><br>' +
            '<a href="build.php?gid=' + TypeName + '"><img src="img/x.gif" class="' + ImageClass + '" title="' + Name + '" style="float: left;" /></a>' +
            '<span style="float: left;">' +
            '' + img[1] + ' <font color="' + Color[1] + '" style="font-size: 11.5px">' + wood + '</font> ' + CountTime[1] + ' ' +
            '' + img[2] + ' <font color="' + Color[2] + '" style="font-size: 11.5px">' + clay + '</font> ' + CountTime[2] + ' ' +
            '' + img[3] + ' <font color="' + Color[3] + '" style="font-size: 11.5px">' + iron + '</font> ' + CountTime[3] + ' ' +
            '' + img[4] + ' <font color="' + Color[4] + '" style="font-size: 11.5px">' + crop + '</font> ' + CountTime[4] + ' ' +
            '' + available +
            '<hr style="margin: 5px;">' +
            '' + NPC_href + '--><font color="' + Color[5] + '" style="font-size: 11.5px">' + NPC + '</font><br>' +
            '' + IMG('5') + ' <font style="font-size: 11px" color="red">' + xCrop + '</font><br>' +
            '<img src="' + PN + '" /> <font style="font-size: 11px" color="blue">' + pnx + '</font>' +
            '</span>' +
            '</td>';
                } else {
                    var X = '';
                };
                if (!ID('bList[1]').childNodes[2]) {
                    ID('bList[1]').innerHTML += X;
                } else if (!ID('bList[2]').childNodes[2]) {
                    ID('bList[2]').innerHTML += X;
                } else if (!ID('bList[3]').childNodes[2]) {
                    ID('bList[3]').innerHTML += X;
                } else if (!ID('bList[4]').childNodes[2]) {
                    ID('bList[4]').innerHTML += X;
                } else if (!ID('bList[5]').childNodes[2]) {
                    ID('bList[5]').innerHTML += X;
                }
            };
        };
    };
};
function ViewCropFind() { $('#Searcher').append(CCDC()); setTimeout(function () { ID('crop_x').value = ID('xgy').getAttribute('title'); ID('crop_y').value = ID('xgy').getAttribute('class'); }, 500); ID('cFinderX').addEventListener('click', SearchCropFields, true); };
function ViewElphFind() { $('#Searcher').append(CEDC()); setTimeout(function () { ID('elep_x').value = ID('xgy').getAttribute('title'); ID('elep_y').value = ID('xgy').getAttribute('class'); }, 500); ID('cElphantX').addEventListener('click', SearchElephants, true); };

function xbt() {
    if (CLASS('xbTime')[0]) {
        for (i = 0; i < CLASS('xbTime').length; i++) {
            if (CLASS('xbTime')[i].innerHTML == '' || CLASS('xbTime')[i].innerHTML.match(/0:00:00/)) {
            } else {
                CLASS('xbTime')[i].innerHTML = format(ReLoadTime(CLASS('xbTime')[i].innerHTML) - 1);
            };
        };
        return setTimeout(xbt, 1000);
    }
}
function ReportX() {
    if (CLASS('report_content')[0] && ID('attacker') && ID('report_surround')) {
        var attacker = xpath('//table[@id="attacker"]/tbody[1]/tr[1]/td').snapshotLength;
        var pos;
        if (RTL == 'ltr') { pos = 'style="text-align: left;"'; } else { pos = 'style="text-align: right; font-size: 11px;"'; };
        var Munit = [];
        var Nunit = [];
        var Dunit = [];
        var Xunit = [];
        var Def_A = [];
        var Def_B = [];
        var Def_C = [];
        var Def_D = [];

        $('<tr>' +
        '<th>' +
        '' + SubLanguage(LanguagePack(), 32) + ':<br>' +
        '<hr style="margin: 0px 0px;" /><br>' +
        '' + SubLanguage(LanguagePack(), 34) + ':' + /*
        '<hr style="margin: 0px 0px;" /><br>' +
        '' + SubLanguage(LanguagePack(), 35) + ':' +*/
        '</th>' +
            '<td colspan="11" ' + pos + '>' +
            '<img src="' + Send_attack + '" />(<span id="AttX">0</span>)&nbsp;|&nbsp;&nbsp;' +
            '<img src="' + imgatti + '" /><span id="iAttX">0</span>&nbsp;&nbsp;|&nbsp;&nbsp;' +
            '<img src="' + imgattc + '" /><span id="cAttX">0</span><br><hr style="margin: 0px 0px;" /><br>' +
            '<img src="' + Send_resource + '" />(<span id="aRes">0</span>) | ' +
            '<img src="img/x.gif" class="r1" /><span id="aRes[0]">0</span> | ' +
            '<img src="img/x.gif" class="r2" /><span id="aRes[1]">0</span> | ' +
            '<img src="img/x.gif" class="r3" /><span id="aRes[2]">0</span> | ' +
            '<img src="img/x.gif" class="r4" /><span id="aRes[3]">0</span> | ' +
            '<img src="img/x.gif" class="r5" /><span id="aRes[4]">0</span>' + /*
            '<br><hr style="margin: 0px 0px;" /><br>' +
            '<span>' + SubLanguage(LanguagePack(), 36) + '(<span id="aInfosA">0</span>%</span>) | ' +
            '<span>' + SubLanguage(LanguagePack(), 37) + '(<span id="aInfosB">0</span>%</span>)' +*/
            '</td></tr>').appendTo(xpath('//td[@class="report_content"]/table[@id="attacker"]/tbody[@class="units last"]').snapshotItem(0));

        $('<tr>' +
        '<th>' +
        '' + SubLanguage(LanguagePack(), 33) + ':<br>' +
        '<hr style="margin: 0px 0px;" /><br>' +
        '' + SubLanguage(LanguagePack(), 34) + ':' + /*
        '<hr style="margin: 0px 0px;" /><br>' +
        '' + SubLanguage(LanguagePack(), 35) + ':' +*/
        '</th>' +
            '<td colspan="11" ' + pos + '>' +
            '<img src="img/x.gif" class="def_all" />(<span id="DefX">0</span>)&nbsp;|&nbsp;&nbsp;' +
            '<img src="img/x.gif" class="def_i" /><span id="iDefX">0</span>&nbsp;&nbsp;|&nbsp;&nbsp;' +
            '<img src="img/x.gif" class="def_c" /><span id="cDefX">0</span><br><hr style="margin: 0px 0px;" /><br>' +
            '<img src="' + Send_resource + '" />(<span id="bRes">0</span>) | ' +
            '<img src="img/x.gif" class="r1" /><span id="bRes[0]">0</span> | ' +
            '<img src="img/x.gif" class="r2" /><span id="bRes[1]">0</span> | ' +
            '<img src="img/x.gif" class="r3" /><span id="bRes[2]">0</span> | ' +
            '<img src="img/x.gif" class="r4" /><span id="bRes[3]">0</span> | ' +
            '<img src="img/x.gif" class="r5" /><span id="bRes[4]">0</span>' + /*
            '<br><hr style="margin: 0px 0px;" /><br>' +
            '<span>' + SubLanguage(LanguagePack(), 36) + '(<span id="bInfosA">0</span>%</span>) | ' +
            '<span>' + SubLanguage(LanguagePack(), 37) + '(<span id="bInfosB">0</span>%</span>)' +*/
            '</td></tr>').appendTo(xpath('//td[@class="report_content"]/table[2]/tbody[@class="units last"]').snapshotItem(0));
        if (ID('attacker').getElementsByClassName('goods')[0] && ID('attacker').getElementsByClassName('goods')[0].getElementsByClassName('carry')[0]) {
            var cr = [];
            cr[0] = ID('attacker').getElementsByClassName('goods')[0].getElementsByClassName('carry')[0].innerHTML.split(/<img\b[^>]*>/)[1].split('/')[0];
            cr[1] = ID('attacker').getElementsByClassName('goods')[0].getElementsByClassName('carry')[0].innerHTML.split(/<img\b[^>]*>/)[1].split('/')[1];
            ID('attacker').getElementsByClassName('goods')[0].getElementsByClassName('carry')[0].innerHTML += '&nbsp;(%' + Math.round(cr[0] / cr[1] * 100) + ')';
        };
        for (i = 0; i < attacker; i++) {
            // attacker
            Munit[i] = xpath('//table[@id="attacker"]/tbody[1]/tr[1]/td[' + (i + 1) + ']/img').snapshotItem(0).className.split(' u')[1];
            Nunit[i] = xpath('//table[@id="attacker"]/tbody[2]/tr[1]/td[' + (i + 1) + ']').snapshotItem(0).innerHTML;
            if (xpath('//table[@id="attacker"]/tbody[3][contains(@class, "units")]').snapshotItem(0)) {
                Dunit[i] = xpath('//table[@id="attacker"]/tbody[3]/tr[1]/td[' + (i + 1) + ']').snapshotItem(0).innerHTML;
            } else { Dunit[i] = 0; };
            Xunit['att'] = C(C(xtr(Munit[i], 0)) * C(Nunit[i]));
            Xunit['aRes[0]'] = C(C(xtr(Munit[i], 3)) * C(Dunit[i]));
            Xunit['aRes[1]'] = C(C(xtr(Munit[i], 4)) * C(Dunit[i]));
            Xunit['aRes[2]'] = C(C(xtr(Munit[i], 5)) * C(Dunit[i]));
            Xunit['aRes[3]'] = C(C(xtr(Munit[i], 6)) * C(Dunit[i]));
            Xunit['aRes[4]'] = C(C(xtr(Munit[i], 7)) * C(Dunit[i]));
            ID('AttX').innerHTML = C(C(ID('AttX').innerHTML) + C(Xunit['att']))
            ID('aRes').innerHTML = C(C(Xunit['aRes[0]']) + C(Xunit['aRes[1]']) + C(Xunit['aRes[2]']) + C(Xunit['aRes[3]']) + C(ID('aRes').innerHTML));
            if (TroopType(Munit[i])) {
                if (TroopType(Munit[i]).toString().match(/i/)) { ID('iAttX').innerHTML = C(C(ID('iAttX').innerHTML) + C(Xunit['att'])); };
                if (TroopType(Munit[i]).toString().match(/c/)) { ID('cAttX').innerHTML = C(C(ID('cAttX').innerHTML) + C(Xunit['att'])); };
            };
            for (x = 0; x < 5; x++) { ID('aRes[' + (x + 0) + ']').innerHTML = C(C(ID('aRes[' + (x + 0) + ']').innerHTML) + C(Xunit['aRes[' + (x + 0) + ']'])); };
            // defender
            if (xpath('//td[@class="report_content"]/table[2]/tbody[1]/tr/td/img').snapshotItem(0) && xpath('//td[@class="report_content"]/table[2]/tbody[2]/tr/td').snapshotItem(0)) {
                Def_A[i] = xpath('//td[@class="report_content"]/table[2]/tbody[1]/tr/td/img').snapshotItem(0).className.split(' u')[1];
                if (xpath('//td[@class="report_content"]/table[2]/tbody[2]/tr/td[' + (i + 1) + ']').snapshotItem(0)) {
                    Def_B[i] = xpath('//td[@class="report_content"]/table[2]/tbody[2]/tr/td[' + (i + 1) + ']').snapshotItem(0).innerHTML;
                };
                if (xpath('//td[@class="report_content"]/table[2]/tbody[2]/tr/td').snapshotItem(i)) {
                    Def_B[i] = xpath('//td[@class="report_content"]/table[2]/tbody[2]/tr/td').snapshotItem(i).innerHTML.match(/\d/);
                } else { Def_B[i] = 0; };
                if (xpath('//td[@class="report_content"]/table[2]/tbody[3][@class="units last"]/tr/td').snapshotItem(i)) {
                    Def_C[i] = xpath('//td[@class="report_content"]/table[2]/tbody[3][@class="units last"]/tr/td').snapshotItem(i).innerHTML;
                } else { Def_C[i] = 0; };
                Def_D['def'] = C(C(xtr(Def_A[i], 0)) * C(Def_B[i]));
                Def_D['bRes[0]'] = C(C(xtr(Def_A[i], 3)) * C(Def_C[i]));
                Def_D['bRes[1]'] = C(C(xtr(Def_A[i], 4)) * C(Def_C[i]));
                Def_D['bRes[2]'] = C(C(xtr(Def_A[i], 5)) * C(Def_C[i]));
                Def_D['bRes[3]'] = C(C(xtr(Def_A[i], 6)) * C(Def_C[i]));
                Def_D['bRes[4]'] = C(C(xtr(Def_A[i], 7)) * C(Def_C[i]));
                ID('DefX').innerHTML = C(C(ID('DefX').innerHTML) + C(Def_D['def']));
                ID('bRes').innerHTML = C(C(Def_D['bRes[0]']) + C(Def_D['bRes[1]']) + C(Def_D['bRes[2]']) + C(Def_D['bRes[3]']) + C(ID('bRes').innerHTML));
                if (TroopType(Munit[i])) {
                    if (TroopType(Munit[i]).toString().match(/i/)) { ID('iDefX').innerHTML = C(C(ID('iDefX').innerHTML) + C(Def_D['def'])); };
                    if (TroopType(Munit[i]).toString().match(/c/)) { ID('cDefX').innerHTML = C(C(ID('cDefX').innerHTML) + C(Def_D['def'])); };
                };
                for (x = 0; x < 5; x++) { ID('bRes[' + (x + 0) + ']').innerHTML = C(C(ID('bRes[' + (x + 0) + ']').innerHTML) + C(Def_D['bRes[' + (x + 0) + ']'])); };
            };
        };
    };
};
function qSendIcons() {
    var links = xpath('//div[@id="content"]//a[contains(@href, "karte.php?d=")]').snapshotLength;
    var rlink = [];
    var alink = [];
    var flink = [];
    var xLink = [];
    var IMG_A = [];
    var IMG_B = [];
    var IMG_G = [];
    var star = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH3AIKCCQGqs3Q2wAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAACjUlEQVQokX1TzWtUdxQ99/cx8968mcnXNPFzpCoo2mJCEwgigqBYoVAXkkXrshtdZOHOhStBxHWLC9E/wI1d1IBQWyitqCiBLLRUEk2axEQTJ+PMvHkz773fcSGaaCAH7uZwD+fCOVdIYi1YsUoEhkAqnXGKDaA+J0RgoginkhgnUbV2I7FZxwiyjVBGfMGA6uRrXdf3oJ0DQPifnrnO2ZGBsixmXa4cV90FUvaDkgHFoq4tasZDzfqsWLPO2VG6RCfdujsHLrSOxlF71Hr6N5AdAvSxqcrLizLXtc39YlCzHogiBD0ktpIYNBq98FagrYA1fRpMvkOoOxYnbHb8rxTBMC8d+hKRqczgct7nV2K5yXjosxkUbVZZoAnkDSzzmWhWeidvO/z7uIHMUXdz+Lj6WQpxy/x+l/mVCQ5toivuKGuUducQlH1ke2rI9HWjNUe8HFvGm/9ayB9R9w/9qK5Ymy4CgKQrxpuawcCT+zwVTfH7rdbt2l5W+GLAIIlKiCstdOyI0Xj7Ful2fb2rjxfh3Cx8pvKxJLHOLS1J/+QTnN23zf1QKBRk/i4RLdTB/GZs6W/B3/LmVdqhR7XhLeST9vuomiJIXLtUchMH+vHI64SEswFc3MBCjsnMq3mM34ow90/QK02OgrJztSQ+iaY4JEjiiFbgI5xuYU5cNRjUVzNthNMPw8NPx/Q3e1+Yg0On0zMZ2vOrOft0CHUMBd2eD/D0/2q986C69PUgbwKsHRhQN148557xP5JjlTEJvh1BASRXp66kOp278Pe1UvPBHXWOke5iE3mG8NiE+rBXf2mCZMlkPhWTePYod+LPX72f2NABSTCEZrgqXDuy9iVZsZI6KtOTbPiKH/AOLY1Ti+grqtUAAAAASUVORK5CYII%3D';
    var XLK = [];
    var GML = [];
    for (j = 0; j < links; j++) {
        xLink[j] = xpath('//div[@id="content"]//a[contains(@href, "karte.php?d=")]').snapshotItem(j);

        alink[j] = Create('a');
        alink[j].setAttribute('href', 'a2b.php?z=' + xLink[j].href.split('=')[1]);
        IMG_A[j] = Create('img');
        IMG_A[j].setAttribute('src', Send_attack);
        IMG_A[j].setAttribute('alt', '' + SubLanguage(LanguagePack(), 6) + ' ' + xLink[j].innerHTML + '');
        IMG_A[j].setAttribute('title', '' + SubLanguage(LanguagePack(), 6) + ' ' + xLink[j].innerHTML + '');

        rlink[j] = Create('a');
        rlink[j].setAttribute('href', 'build.php?z=' + xLink[j].href.split('=')[1] + '&gid=17');
        IMG_B[j] = Create('img');
        IMG_B[j].setAttribute('src', Send_resource);
        IMG_B[j].setAttribute('alt', '' + SubLanguage(LanguagePack(), 5) + ' ' + xLink[j].innerHTML + '');
        IMG_B[j].setAttribute('title', '' + SubLanguage(LanguagePack(), 5) + ' ' + xLink[j].innerHTML + '');

        xLink[j].parentNode.appendChild(document.createTextNode(' '));
        rlink[j].appendChild(IMG_B[j]);
        xLink[j].parentNode.appendChild(rlink[j]);
        xLink[j].parentNode.appendChild(document.createTextNode(' '));
        alink[j].appendChild(IMG_A[j]);
        
        xLink[j].parentNode.appendChild(alink[j]);
        $('<li id="xx' + j + '" style="display: none;">' + j + '</li>').appendTo($(xLink[j]).parent());
        if (ID('tbody_links')) {
            
            flink[j] = Create('a');
            flink[j].setAttribute('href', 'javascript:void(0)');
            IMG_G[j] = Create('img');
            IMG_G[j].setAttribute('src', star);
            IMG_G[j].setAttribute('alt', '' + SubLanguage(LanguagePack(), 8) + ': ' + xLink[j].innerHTML + '');
            IMG_G[j].setAttribute('title', '' + SubLanguage(LanguagePack(), 8) + ': ' + xLink[j].innerHTML + '');
            IMG_G[j].setAttribute('id', 'quickSave[' + j + ']');
            IMG_G[j].setAttribute('onclick', "SaveAsLink('xx" + j + "');");
            IMG_G[j].addEventListener('click', function () {
                var starx = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH3AILCgcau11I/gAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAACbElEQVQokX2TT0hUcRDHP799b3ff+nRd3Vo1QztIJgkaGUSHiqioLLASkwohkqAORt06CNFBoj/oIREvRceM6OLBisQOSUKpUZZppMWatYq7rv921femg5ia4RfmMsx3vsPMfJWIsBxWUDk0hW6BpWWKxRpw/JvQFHp0ktLZOCUMK+daZP0/7dzhCGVeB9u0DEZco6odHRsQfCvHXKU8Z2NqBl7TIiv2i2rLZiuCC8HJqHISUgYh5bGCSl+lbAkpykmqyw92H/tjk1QZiTRjk6xBmhUl68dXhjLzqdcJKQMbLw78lk2m2BS5dQIkgtMAGeEsNkeJkNzXgrv5AaSUU1NRREwPvuem30u+Mkg3kkjzePB6TBYW5QePjSv6kUDHbXjVDgmlNJVf5p4WkLhe30DicAs7NgvewgLYtBNSCsDMAk8OTPXAlzsQbAd/CW8qarnlMfgNoLW28jxjLy+/wXj/AIG5n6SacfBlw1Q/TPZDzinYeBDyyniWvoEWbCYwrov6+yQzKmFgkMKOVi7ty+d0YD3qUwNM9IH4YUsx+PIIzaZR5XLzlHUyu0COKAVouDGiISqdcWpj3RB8Ad1R5qe/oyeMwbZiyL1Au9PPeQLSu3AqnwgRZRNnPjaBUwGRLuhRjKcepyFhhumux+xuq2P7nk52nazjommra0t39olNWM2hoc18hrYPTGacoebQCZqAiSPHuP/uLbnNjRwYuot5pYYkRGQpRlHDnVQ/PMfMozquSpQUGSdRwhgyjmOxbrQXMz6IayVZhNdPONx4g0oZwxQRJIwm4SXi8lDLLWkFlZqzcBjZa1txEX8AvGoXJ4Yn4tIAAAAASUVORK5CYII%3D';
                this.setAttribute('src', starx);
            }, true);
            xLink[j].parentNode.appendChild(document.createTextNode(' '));
            flink[j].appendChild(IMG_G[j]);
            xLink[j].parentNode.appendChild(flink[j]);
        };
    };
};
function showTHelp() {
    var links = ID('content').getElementsByTagName('a').length;
    var xLink = ID('content').getElementsByTagName('a');
    for (j = 0; j < links; j++) {
        if (xLink[j].href.match("karte.php\[^>]d=")) {
            xLink[j].setAttribute('onmouseover', "gTimeD(ID('xgy').innerHTML, this.href.split('d=')[1]);");
            xLink[j].setAttribute('onmouseout', "ID('T4_mHelp').style.display = 'none';");
        } else if (xLink[j].href.match("position_details.php\[^>]x=")) {
            xLink['x'] = xLink[j].href.split("position_details.php?x=")[1].split('&y')[0]
            xLink['y'] = xLink[j].href.split("&y=")[1];
            xLink['id'] = xyToId(xLink['x'], xLink['y']);
            xLink[j].setAttribute('onmouseover', "gTimeD(ID('xgy').innerHTML, " + xLink['id'] + ");");
            xLink[j].setAttribute('onmouseout', "ID('T4_mHelp').style.display = 'none';");
        } else if (xLink[j].href.match("karte.php\[^>]x=")) {
            xLink['x'] = xLink[j].href.split("karte.php?x=")[1].split('&y')[0]
            xLink['y'] = xLink[j].href.split("&y=")[1];
            xLink['id'] = xyToId(xLink['x'], xLink['y']);
            xLink[j].setAttribute('onmouseover', "gTimeD(ID('xgy').innerHTML, " + xLink['id'] + ");");
            xLink[j].setAttribute('onmouseout', "ID('T4_mHelp').style.display = 'none';");
        };
    };
    setTimeout(showTHelp, 1000);
};
function qSendMsg() {
    var send_image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAYAAAB24g05AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2wsIFjoO3PNzDgAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAABRklEQVQokY2RO0sDURBGz727N2vvnxBS2Nj56AVfiIra2FspKVIaEYvFWkFQECslhW8NsRDF0iaF4J/Q2mzunbFxY1R8fNUwcM4MM0bUa6U6gaoC4MUhIviW5+U1EEJARGiFmBACqkq1VMcQGQC7Ux+hMn2MtRYAS5PIZACoKqqKF9euq6U627Vh8tiuRNi9HmVl6qjdzLfJN+qENy/GcM59CFwcSAqBvZsJVmdOAFifv2Bj4RQRaQsPl2tsXY6TOKEQ+w+BNU3iyOOiFvu3k6zNnpGlRbK0yN5iDVXlYOmK7dowkc34GnNw368+ODBdzA+ek6VFbG830nimUH78BrTB9yPGQQoYA3MdcJ4sLf4oABQgNsYwO1D/BnfWv8WIej17GGK07+6TRBrP/xN0vgygmfZofoOk/GT+EtivjaT8ZP47HeANRVCkIU1WB7kAAAAASUVORK5CYII%3D';
    var links = xpath('//div[@id="content"]//a[contains(@href, "spieler.php?uid=")]').snapshotLength;
    for (j = 0; j < links; j++) {
        xLink = xpath('//div[@id="content"]//a[contains(@href, "spieler.php?uid=")]').snapshotItem(j);
        rlink = Create('a');
        rlink.href = 'nachrichten.php?t=1&id=' + xLink.href.split('=')[1];
        rlink.innerHTML = '<img src="' + send_image + '" alt="+MSG" />&nbsp;';
        xLink.parentNode.insertBefore(rlink, xLink);
    };
};
function mPlace() {
    if (CLASS('building big white g17')[0] && ID('send_select') && ID('contract') && ID('enterVillageName')) {
        var stone = [];
        var aXA = ID('send_select').getElementsByTagName('tr')[0];
        HTML = '' +
       '<td style="text-align: center;"><a href="javascript:void(0)" id="x[1]x" style="border: 1px; solid gray;" onmouseover="this.style.color = \'blue\';" onmouseout="this.style.color = \'\';">[m%r]</a></td>' +
       '<td style="text-align: center;"><a href="javascript:void(0)" id="x[2]x" style="border: 1px; solid gray;" onmouseover="this.style.color = \'blue\';" onmouseout="this.style.color = \'\';">[h=m]</a></td>' +
       '<td style="text-align: center;"><a href="javascript:void(0)" id="x[3]x" style="border: 1px; solid gray;" onmouseover="this.style.color = \'blue\';" onmouseout="this.style.color = \'\';">[del]</a></td>' +
       '<td style="text-align: center;"><a href="javascript:void(0)" id="x[4]x" style="border: 1px; solid gray;" onmouseover="this.style.color = \'blue\';" onmouseout="this.style.color = \'\';">[=]</a></td>' +
       '';
        var A = Create('tr');
        A.innerHTML = HTML;
        aXA.parentNode.insertBefore(A, aXA);
        var getMax = xpath('//table[@id="send_select"]/tbody/tr[2]/td[4]/a').snapshotItem(0).innerHTML;
        var getMer = xpath('//div[@id="build"]/div[5]/div[10]').snapshotItem(0).innerHTML.split("/")[0].split(' ')[1];
        ID('x[1]x').addEventListener('click', function () { stone[0] = C(C(pro[0] * 3600 / 2) + C(pro[1] * 3600 / 2) + C(pro[2] * 3600 / 2) + C(pro[3] * 3600 / 2) / getMer); for (i = 0; i < 4; i++) { ID('r' + (i + 1)).value = stone[0]; }; }, false);
        ID('x[2]x').addEventListener('click', function () { for (i = 0; i < 4; i++) { ID('r' + (i + 1)).value = Math.round(C(pro[i] * 3600) / C(getMer) * (getMer / 2)); } }, false);
        ID('x[3]x').addEventListener('click', function () { for (i = 0; i < 4; i++) { ID('r' + (i + 1)).value = '0'; } }, false);
        ID('x[4]x').addEventListener('click', function () { for (i = 0; i < 4; i++) { ID('r' + (i + 1)).value = C(C(getMax) * C(getMer) / 4); } }, false);
        GM_addStyle('#TBL_INF {width: auto; border: 1px solid gray;}');
        var tbl = Create('table');
        tbl.id = 'TBL_INF';
        GM_addStyle('#TBL_INF tbody tr td {padding: 2px 2px 2px;}');
        tbl.setAttribute('cellspacing', '1');
        tbl.bgcolor = 'silver';
        tbl.innerHTML = '<tbody><tr><td>' + xpath('//div[@id="build"]/div[5]/div[10]').snapshotItem(0).innerHTML.split(' ')[0] + ':<span id="xMR"></span></td><td><img class="carry" src="img/x.gif">(<span id="TBL_RES">0</span>) -<font id="TBL_RES2">0</font> </td></tr><tr><td> <img src="img/x.gif" class="clock"> (<span id="TBL_TIME">0:00:00:00</span>) </td><td>&lt; <span id="TBL_DIST">0</span> &gt;</td></tr></tbody>';
        var TRG = ID('build').getElementsByTagName('form')[0].getElementsByTagName('button')[0];
        TRG.parentNode.insertBefore(tbl, TRG);
        TRG.parentNode.insertBefore(Create('br'), TRG);

        function send_INFO() {
            var merchants = new Array(16/*Romans*/, 12/*Tuetons*/, 24/*Gauls*/);
            function CHK(v) { return (v.toString() == ('NaN' || NaN) ? 0 : v.toString()); };
            var get_Tribe = xpath('//div[@id="side_info"]//img[contains(@class, "nationBig nationBig")]').snapshotItem(0).className.match(/\d/);
            get_Tribe = C(C(get_Tribe) - 1);
            getMax = xpath('//table[@id="send_select"]/tbody/tr[2]/td[4]/a').snapshotItem(0).innerHTML;
            getMer = xpath('//div[@id="build"]/div[5]/div[10]').snapshotItem(0).innerHTML.split("/")[0].split(' ')[1];
            var xrs = [ID('r1').value, ID('r2').value, ID('r3').value, ID('r4').value];
            var res = 0;
            var time = 0;
            var dist = 0;
            res = C(C(xrs[0] == '' ? 0 : xrs[0]) + C(xrs[1] == '' ? 0 : xrs[1]) + C(xrs[2] == '' ? 0 : xrs[2]) + C(xrs[3] == '' ? 0 : xrs[3]));
            var GET_X = (ID('xCoordInput').value == ('' || ID('xCoordInput').value.match(/\D/)) ? 0 : ID('xCoordInput').value);
            var GET_Y = (ID('yCoordInput').value == ('' || ID('yCoordInput').value.match(/\D/)) ? 0 : ID('yCoordInput').value);
            var GET_Time = format(Math.round((Distance(ID('xgy').innerHTML, xyToId(GET_X, GET_Y))) / (merchants[get_Tribe]) * 3600));

            ID('TBL_RES').innerHTML = res;
            var setMer = '( ' + C(getMer) + ' / <span>' + C(getMer - Math.ceil(res / getMax)) + '</span> ) --><font>' + Math.ceil(res / getMax) + '</font>';
            ID('xMR').innerHTML = setMer;
            if (ID('xMR').getElementsByTagName('font')[0].innerHTML.match(/\d+/) > getMer) { ID('xMR').getElementsByTagName('font')[0].color = 'red'; } else
                if (ID('xMR').getElementsByTagName('font')[0].innerHTML == getMer) { ID('xMR').getElementsByTagName('font')[0].color = 'blue'; } else { ID('xMR').getElementsByTagName('font')[0].color = 'green'; };
            ID('TBL_RES2').innerHTML = C(C(ID('xMR').getElementsByTagName('font')[0].innerHTML * getMax) - C(ID('TBL_RES').innerHTML));
            ID('TBL_TIME').innerHTML = GET_Time;
            ID('TBL_DIST').innerHTML = New_Math(Distance(ID('xgy').innerHTML, xyToId(GET_X, GET_Y)).toString() == ('NaN' || NaN) ? 0 : Distance(ID('xgy').innerHTML, xyToId(GET_X, GET_Y)));
            return setTimeout(send_INFO, 100);
        };
        send_INFO();
    };
};

function SBT() {
    function re(r) { return C(ID('l' + r).innerHTML.split('/')[0]); };
    var cl = 'building big white g';
    if (CLASS(cl + '19')[0] || CLASS(cl + '20')[0] || CLASS(cl + '21')[0]) {
        if (CLASS('details')[0] && CLASS('tit')[0] && CLASS('details')[0]) {
            GM_addStyle('#CxS td{padding: 1px; font-size: 12.5px;}');
            var HTML = '<div class="action" id="CxS"><table cellspacing="0"><tbody>';
            var xHTML = [];
            for (i = 0; i < CLASS('tit').length; i++) {
                var r = [];
                r[0] = CLASS('buildActionOverview trainUnits')[0].getElementsByClassName('resources r1')[i].innerHTML.split('>')[1];
                r[1] = CLASS('buildActionOverview trainUnits')[0].getElementsByClassName('resources r2')[i].innerHTML.split('>')[1];
                r[2] = CLASS('buildActionOverview trainUnits')[0].getElementsByClassName('resources r3')[i].innerHTML.split('>')[1];
                r[3] = CLASS('buildActionOverview trainUnits')[0].getElementsByClassName('resources r4')[i].innerHTML.split('>')[1];

                rv = C(C(re('1')) + C(re('2')) + C(re('3')) + C(re('4')));
                rb = C(C(r[0]) + C(r[1]) + C(r[2]) + C(r[3]));
                r[5] = C(rv / rb);
                var DV = Create('div');
                DV.innerHTML = '<span><img src="img/x.gif" class="npc" />: (' + CLASS('tit')[i].getElementsByTagName('a')[0].innerHTML + r[5] + ')</span>';
                CLASS('buildActionOverview trainUnits')[0].getElementsByClassName('details')[i].appendChild(DV);
                var dvx = Create('table');
                dvx.cellSpacing = '0';
                dvx.style.width = 'auto';
                dvx.innerHTML = '' +
'<tr><td><img src="img/x.gif" class="r1" />&nbsp;<span id="XP1_' + i + '">0</span></td>' +
'<td><img src="img/x.gif" class="r2" />&nbsp;<span id="XP2_' + i + '">0</span></td>' +
'<td><img src="img/x.gif" class="r3" />&nbsp;<span id="XP3_' + i + '">0</span></td>' +
'<td><img src="img/x.gif" class="r4" />&nbsp;<span id="XP4_' + i + '">0</span></td></tr><tr>' +
'<td colspan="2" style="text-align: center;"><img src="img/x.gif" class="r5" />&nbsp;<span id="XP6_' + i + '">0</span></td>' +
'<td colspan="2" style="text-align: center;"><img src="img/x.gif" class="clock" />&nbsp;<span id="XP5_' + i + '">00:00:00</span></td>' +
'</tr>';
                HTML = HTML + '' +
                '<tr>' +
                '<td>' + CLASS('tit')[i].getElementsByTagName('a')[0].innerHTML + '<span id="A' + (i + 1) + '">0</span></td>' +
                '<td><img class="r1" src="img/x.gif"><span id="' + (i + 1) + 'R1">0</span></td>' +
                '<td><img class="r2" src="img/x.gif"><span id="' + (i + 1) + 'R2">0</span></td>' +
                '<td><img class="r3" src="img/x.gif"><span id="' + (i + 1) + 'R3">0</span></td>' +
                '<td><img class="r4" src="img/x.gif"><span id="' + (i + 1) + 'R4">0</span></td>' +
                '<td><img class="r5" src="img/x.gif"><span id="' + (i + 1) + 'R5">0</span></td>' +
                '<td><img class="clock" src="img/x.gif"><span id="' + (i + 1) + 'R6">00:00:00</span></td>' +
                '</tr>';
                CLASS('buildActionOverview trainUnits')[0].getElementsByClassName('details')[i].appendChild(dvx);
                var me = CLASS('buildActionOverview trainUnits')[0].getElementsByTagName('input')[i];
                var ge = CLASS('buildActionOverview trainUnits')[0].getElementsByTagName('input')[i].nextElementSibling.nextElementSibling;
                me.setAttribute('onkeyup', "tChange('" + i + "')");
                me.setAttribute('onclick', "tChange('" + i + "')");
                me.setAttribute('onblur', "tChange('" + i + "')");
                ge.setAttribute('onmouseup', "tChange('" + i + "')");
                ge.setAttribute('onmouseover', "tChange('" + i + "')");
            };
            $(CLASS('buildActionOverview trainUnits')[0]).append(HTML + '</tbody><tfoot><tr><td style="border-top: 1px solid gray;" colspan="7"></td></tr>' +
            '<tr>' +
            '<td>&nbsp;&nbsp;&nbsp;<span id="x_1">0</span></td>' +
            '<td><img class="r1" src="img/x.gif"><span id="x_2">0</span></td>' +
            '<td><img class="r2" src="img/x.gif"><span id="x_3">0</span></td>' +
            '<td><img class="r3" src="img/x.gif"><span id="x_4">0</span></td>' +
            '<td><img class="r4" src="img/x.gif"><span id="x_5">0</span></td>' +
            '<td><img class="r5" src="img/x.gif"><span id="x_6">0</span></td>' +
            '<td><img class="clock" src="img/x.gif"><span id="x_7">00:00:00</span></td>' +
            '</tr></tfoot></table></div>');
        };
    };
};
function Village_Count() {
    var Target = ID('villageList').getElementsByTagName('div')[0].getElementsByTagName('a')[0];
    var Count = ID('villageList').getElementsByTagName('div')[1].getElementsByTagName('li').length;
    Target.appendChild(document.createTextNode('(' + Count + '):'));
};
function xSmith() {
    var A = [];
    var B = [];
    var R = [ID('l1').innerHTML.split('/')[0], ID('l2').innerHTML.split('/')[0], ID('l3').innerHTML.split('/')[0], ID('l4').innerHTML.split('/')[0]];
    var X = [];
    var G = [];
    for (i = 0; i < CLASS('build_details researches')[0].getElementsByClassName('research').length; i++) {
        A[i] = CLASS('build_details researches')[0].getElementsByClassName('research')[i];
        B['r1' + i] = A[i].getElementsByClassName('resources r1')[0];
        B['r2' + i] = A[i].getElementsByClassName('resources r2')[0];
        B['r3' + i] = A[i].getElementsByClassName('resources r3')[0];
        B['r4' + i] = A[i].getElementsByClassName('resources r4')[0];
        X['r1x' + i] = C(C(R[0]) - C(B['r1' + i].innerHTML.split('>')[1]));
        X['r2x' + i] = C(C(R[1]) - C(B['r2' + i].innerHTML.split('>')[1]));
        X['r3x' + i] = C(C(R[2]) - C(B['r3' + i].innerHTML.split('>')[1]));
        X['r4x' + i] = C(C(R[3]) - C(B['r4' + i].innerHTML.split('>')[1]));
        G['r1A' + i] = Create('div'); G['r1A' + i].setAttribute('style', 'font-size: 11px;'); G['r1A' + i].innerHTML = '(<font color="' + ((X['r1x' + i] > 0) ? 'green' : 'red') + '">' + X['r1x' + i] + '</font>)'; B['r1' + i].appendChild(G['r1A' + i]);
        G['r2A' + i] = Create('div'); G['r2A' + i].setAttribute('style', 'font-size: 11px;'); G['r2A' + i].innerHTML = '(<font color="' + ((X['r2x' + i] > 0) ? 'green' : 'red') + '">' + X['r2x' + i] + '</font>)'; B['r2' + i].appendChild(G['r2A' + i]);
        G['r3A' + i] = Create('div'); G['r3A' + i].setAttribute('style', 'font-size: 11px;'); G['r3A' + i].innerHTML = '(<font color="' + ((X['r3x' + i] > 0) ? 'green' : 'red') + '">' + X['r3x' + i] + '</font>)'; B['r3' + i].appendChild(G['r3A' + i]);
        G['r4A' + i] = Create('div'); G['r4A' + i].setAttribute('style', 'font-size: 11px;'); G['r4A' + i].innerHTML = '(<font color="' + ((X['r4x' + i] > 0) ? 'green' : 'red') + '">' + X['r4x' + i] + '</font>)'; B['r4' + i].appendChild(G['r4A' + i]);
    };
};
function BuildList() {
    function gd(gid) { return 'window.location.href=&apos;build.php?gid=' + gid + '&apos;'; };

    var img = [
'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAACXZwQWcAAAABAAAAAQDHlV/tAAAADUlEQVQI12P4//9/PQAJewN9F4hVxQAAAC56VFh0Y3JlYXRlLWRhdGUAAHjaMzIwNNQ1sNQ1MA0xsLAyMbAyNdU1MLcyMAAAQeMFGW65r+EAAAAuelRYdG1vZGlmeS1kYXRlAAB42jMyMDTUNbDUNTANMbCwMjGwMjXVNTC3MjAAAEHjBRkMgVgeAAAAAElFTkSuQmCC',
'http://ts6.travian.com.eg/gpack/travian_Travian_4.0_41/lang/eg/../../lowRes/img/g/g16-rtl.png',
'http://ts6.travian.com.eg/gpack/travian_Travian_4.0_41/lang/eg/../../lowRes/img/g/g17-rtl.png',
'http://ts6.travian.com.eg/gpack/travian_Travian_4.0_41/lang/eg/../../lowRes/img/g/g18-rtl.png',
'http://ts6.travian.com.eg/gpack/travian_Travian_4.0_41/lang/eg/../../lowRes/img/g/g19-rtl.png',
'http://ts6.travian.com.eg/gpack/travian_Travian_4.0_41/lang/eg/../../lowRes/img/g/g20-rtl.png',
'http://ts6.travian.com.eg/gpack/travian_Travian_4.0_41/lang/eg/../../lowRes/img/g/g21-rtl.png',
];

    var Div = Create('div');
    Div.id = "gList";
    Div.className = 'mbList';
    Div.innerHTML = '' +
'<img src="' + img[1] + '" onclick="' + gd(16) + '" /><br><img src="' + img[2] + '" onclick="' + gd(17) + '" /><br><img src="' + img[3] + '" onclick="' + gd(18) + '" />' +
'<br><img src="' + img[4] + '" onclick="' + gd(19) + '" /><br><img src="' + img[5] + '" onclick="' + gd(20) + '" /><br><img src="' + img[6] + '" onclick="' + gd(21) + '" />';

    if (RTL == 'rtl') { Div.style.right = '0px'; } else { Div.style.left = '0px'; };
    GM_addStyle('.mbList { background-color: rgba(255, 255, 255, 0.7); border-radius: 0px 0px 5px 5px; box-shadow: ' + (RTL == "ltr" ? "2" : "-2") + 'px 2px 5px 0px black; position: absolute; top: 67px; width: auto; }\n.mbList img {width: 80px; height: 80px; cursor: pointer; border-radius: 5px 5px 5px 5px;}');
    document.body.appendChild(Div);
    for (i = 0; i < 6; i++) {
        aIMG = CLASS('mbList')[0].getElementsByTagName('img')[i];
        aIMG.setAttribute('onmouseover', "this.style.backgroundColor = 'white'");
        aIMG.setAttribute('onmouseout', "this.style.backgroundColor = ''");
    };
};
var cssString = "#T4_mHelp{" +
					"position:absolute;" +
					"padding: 4px;" +
					"z-index: 120000;" +
					"border: solid 1px #00C000;" +
					"background-color: white;" +
					"opacity: 0.9;" +
					"box-shadow: 0 0 10px 3px black;" +
					"border-radius: 5px;" +
					"}";
GM_addStyle(cssString);
var div = document.createElement("div");
div.id = "T4_mHelp";
div.setAttribute("style", cssString.split('{')[1].split('}')[0] + 'display: none;');
document.body.appendChild(div);

function gMouseOver() {
    var imgList = xpath("//img[contains(@class, 'unit u')][ not(@class='unit uhero')]");
    document.addEventListener('mousemove', showHelp_move, false);
    for (var i = 0; i < imgList.snapshotLength; i++) {
        imgList.snapshotItem(i).setAttribute('onmouseover', "hMove(this.className.split(' u')[1]);");
        imgList.snapshotItem(i).setAttribute('onmouseout', 'ID("T4_mHelp").style.display = "none";');
    };
    setTimeout(gMouseOver, 2000);
};

// start by Dream1
function Select() {
    if (exp(/berichte\b[^>]*php/) || exp(/nachrichten\b[^>]*php/)) {
        if (TAG('form')[0] && TAG('form')[0].getElementsByClassName('paginator')[0]) {
            var selectd = document.getElementsByTagName('form')[0].getElementsByClassName('paginator')[0];
            var selectdd = document.createElement('div');
            selectdd.innerHTML = '<input class="check" type="checkbox" id="sAll" name="sAll" onclick="$(this).up(\'form\').getElements(\'input[type=checkbox]\').each(function(element){element.checked=this.checked;},this);"/>';
            selectdd.id = 'markAll';
            var selectd2 = document.createElement('span');
            selectd2.innerHTML = '<label for="sAll"> ' + SubLanguage(LanguagePack(), 40) + '</label>';
            selectd.parentNode.insertBefore(selectdd, selectd);
            selectdd.appendChild(selectd2);
        }
    }
};
// end by Dream1

function MyLinks() {
    GM_addStyle('#dreambox h1 {font-size:12px;color:#333;text-align:center;}' +
	'#dreambox {width: 105%;}' +
	'#dreambox span.edit {float:right;cursor:pointer;}' +
	'#dreambox li {list-style:none;padding-left:5px;} #dreambox li a {color:#555;}' +
    '#llist thead tr td {background-color: transparent; border-bottom: 1px solid; padding: 0px;}' +
    '#llist tbody tr td {background-color: transparent; padding: 0px 2px;}' +
    ''
    );
    var urlBase = location.href.split('/')[1];
    var target = ID("side_info");
    target.appendChild(Create('br'));
    var div = Create('div');
    div.id = "dreambox";
    var tbl = Create("table");

    var tblHead = Create("thead");
    var tblBody = Create("tbody");
    tblBody.id = 'tbody_links';
    if (GM_getValue('My_T4Links')) { links = GM_getValue('My_T4Links'); } else { GM_setValue('My_T4Links', ''); links = GM_getValue('My_T4Links'); };
    tblBody.innerHTML = links;
    var row = Create("tr");
    var cell = Create("td");
    cell.setAttribute('colspan', '2');
    cell.innerHTML = '<h1><b>' + SubLanguage(LanguagePack(), 7) + '</b>(<a href="javascript:void(0)" onclick="AddNewLink();" style="color: red;"><i>' + SubLanguage(LanguagePack(), 8) + '</i></a>):</h1>';
    row.appendChild(cell);
    tblHead.appendChild(row);
    tbl.appendChild(tblHead);
    tbl.appendChild(tblBody);
    div.appendChild(tbl);
    target.appendChild(div);
    GM_addStyle('#llist { background-color: rgba(255,255,255,0.9); border-radius: 5px 5px 5px 5px; padding: 5px; margin:4px auto; width: 100%; box-shadow:0 0 2px #222; } #llist tbody tr td {background-color: transparent;}')
    tbl.setAttribute("cellspacing", "0");
    tbl.setAttribute("cellpadding", "1");
    tbl.setAttribute("id", "llist");
};
if (!GM_getValue('t4_setup_setting') && (!exp(/spieler.php/))) {
    window.location.href = location.protocol + '//' + location.hostname + '/spieler.php';
};
if (exp(/spieler.php/) && (!GM_getValue('t4_setup_setting'))) {
    var race = xpath('//table[@id="details"]/tbody/tr[2]/th').snapshotItem(0).innerHTML;
    var Aly = xpath('//table[@id="details"]/tbody/tr[3]/th').snapshotItem(0).innerHTML;
    GM_setValue('t4_setup_setting', race + '|' + Aly);
    setting();
};

ReTime();
setup();
gMouseOver();
showTHelp();
mFullView();
MyVid();
favThis();
AllyCalculation(); // <--- by Dream1
window.addEventListener('load', Map_Check, true);
window.addEventListener('load', accessToAlly, true);
if (ID('send_select')) { mPlace(); };
if (ID('mapContainer') && exp(/karte.php/)) { window.addEventListener('load', function () { setTimeout(function () { help_fun(); ViewCropFind(); ViewElphFind(); cMapChecker(); }, 750); }, true); };
if (ID('side_info')) { Village_Count(); };
if (ID('mtop')) { AddUpdate(); };
if (CLASS('building big white g13')[0] && CLASS('build_details researches')[0]) { xSmith(); };
if (exp(/berichte.php\b[^>]id=\d/)) { ReportX(); };
if (exp(/dorf1/) && ID('production') && ID('troops')) { dorfA(); }
if (GM_getValue('setting[1]') == 'true') { Resource_Needed(); };
if (GM_getValue('setting[2]') == 'true') { BuildingView(); xbt(); };
//if (GM_getValue('setting[3]') == 'true') { QuickSend(); };
if (GM_getValue('setting[4]') == 'true') { ViewRep(); };
if (GM_getValue('setting[5]') == 'true') { ViewMessege(); };
if (GM_getValue('setting[6]') == 'true') { SBT(); };
if (GM_getValue('setting[7]') == 'true') { MyLinks(); };
if (GM_getValue('setting[8]') == 'true') { ResourcePlusTimer(); };
if (GM_getValue('setting[9]') == 'true') { ResourcePercent(); };
if (GM_getValue('setting[10]') == 'true') { ResourcePrud(); };
if (GM_getValue('setting[11]') == 'true') { BuildList(); };
if (GM_getValue('setting[12]') == 'true') { Show_Help_Links(); };
if (GM_getValue('setting[13]') == 'true') { qSendMsg(); };
if (GM_getValue('setting[14]') == 'true' && ID('btn_ok') && ID('troops') && exp(/a2b.php/)) { AttackInfo(); };
if (GM_getValue('setting[15]') == 'true') { qSendIcons(); };
if (GM_getValue('setting[16]') == 'true') { Select(); }; // add by Dream1

if (GM_getValue('setting[3]') == 'true') { QuickSend(); };

/**!
 * project-site: http://plugins.jquery.com/project/AjaxManager
 * repository: http://github.com/aFarkas/Ajaxmanager
 * @author Alexander Farkas
 * @version 3.12
 * Copyright 2010, Alexander Farkas
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */

(function($){
	"use strict";
	var managed = {},
		cache   = {}
	;
	$.manageAjax = (function(){
		function create(name, opts){
			managed[name] = new $.manageAjax._manager(name, opts);
			return managed[name];
		}
		
		function destroy(name){
			if(managed[name]){
				managed[name].clear(true);
				delete managed[name];
			}
		}

		
		var publicFns = {
			create: create,
			destroy: destroy
		};
		
		return publicFns;
	})();
	
	$.manageAjax._manager = function(name, opts){
		this.requests = {};
		this.inProgress = 0;
		this.name = name;
		this.qName = name;
		
		this.opts = $.extend({}, $.manageAjax.defaults, opts);
		if(opts && opts.queue && opts.queue !== true && typeof opts.queue === 'string' && opts.queue !== 'clear'){
			this.qName = opts.queue;
		}
	};
	
	$.manageAjax._manager.prototype = {
		add: function(url, o){
			if(typeof url == 'object'){
				o = url;
			} else if(typeof url == 'string'){
				o = $.extend(o || {}, {url: url});
			}
			o = $.extend({}, this.opts, o);
			
			var origCom		= o.complete || $.noop,
				origSuc		= o.success || $.noop,
				beforeSend	= o.beforeSend || $.noop,
				origError 	= o.error || $.noop,
				strData 	= (typeof o.data == 'string') ? o.data : $.param(o.data || {}),
				xhrID 		= o.type + o.url + strData,
				that 		= this,
				ajaxFn 		= this._createAjax(xhrID, o, origSuc, origCom)
			;
			if(o.preventDoubleRequests && o.queueDuplicateRequests){
				if(o.preventDoubleRequests){
					o.queueDuplicateRequests = false;
				}
				setTimeout(function(){
					throw("preventDoubleRequests and queueDuplicateRequests can't be both true");
				}, 0);
			}
			if(this.requests[xhrID] && o.preventDoubleRequests){
				return;
			}
			ajaxFn.xhrID = xhrID;
			o.xhrID = xhrID;
			
			o.beforeSend = function(xhr, opts){
				var ret = beforeSend.call(this, xhr, opts);
				if(ret === false){
					that._removeXHR(xhrID);
				}
				xhr = null;
				return ret;
			};
			o.complete = function(xhr, status){
				that._complete.call(that, this, origCom, xhr, status, xhrID, o);
				xhr = null;
			};
			
			o.success = function(data, status, xhr){
				that._success.call(that, this, origSuc, data, status, xhr, o);
				xhr = null;
			};
						
			//always add some error callback
			o.error =  function(ahr, status, errorStr){
				var httpStatus 	= '',
					content 	= ''
				;
				if(status !== 'timeout' && ahr){
					httpStatus = ahr.status;
					content = ahr.responseXML || ahr.responseText;
				}
				if(origError) {
					origError.call(this, ahr, status, errorStr, o);
				} else {
					setTimeout(function(){
						throw status + '| status: ' + httpStatus + ' | URL: ' + o.url + ' | data: '+ strData + ' | thrown: '+ errorStr + ' | response: '+ content;
					}, 0);
				}
				ahr = null;
			};
			
			if(o.queue === 'clear'){
				$(document).clearQueue(this.qName);
			}
			
			if(o.queue || (o.queueDuplicateRequests && this.requests[xhrID])){
				$.queue(document, this.qName, ajaxFn);
				if(this.inProgress < o.maxRequests && (!this.requests[xhrID] || !o.queueDuplicateRequests)){
					$.dequeue(document, this.qName);
				}
				return xhrID;
			}
			return ajaxFn();
		},
		_createAjax: function(id, o, origSuc, origCom){
			var that = this;
			return function(){
				if(o.beforeCreate.call(o.context || that, id, o) === false){return;}
				that.inProgress++;
				if(that.inProgress === 1){
					$.event.trigger(that.name +'AjaxStart');
				}
				if(o.cacheResponse && cache[id]){
					if(!cache[id].cacheTTL || cache[id].cacheTTL < 0 || ((new Date().getTime() - cache[id].timestamp) < cache[id].cacheTTL)){
                        that.requests[id] = {};
                        setTimeout(function(){
							that._success.call(that, o.context || o, origSuc, cache[id]._successData, 'success', cache[id], o);
                        	that._complete.call(that, o.context || o, origCom, cache[id], 'success', id, o);
                        }, 0);
                    } else {
						 delete cache[id];
					}
				} 
				if(!o.cacheResponse || !cache[id]) {
					if (o.async) {
						that.requests[id] = $.ajax(o);
					} else {
						$.ajax(o);
					}
				}
				return id;
			};
		},
		_removeXHR: function(xhrID){
			if(this.opts.queue || this.opts.queueDuplicateRequests){
				$.dequeue(document, this.qName);
			}
			this.inProgress--;
			this.requests[xhrID] = null;
			delete this.requests[xhrID];
		},
		clearCache: function () {
            cache = {};
        },
		_isAbort: function(xhr, status, o){
			if(!o.abortIsNoSuccess || (!xhr && !status)){
				return false;
			}
			var ret = !!(  ( !xhr || xhr.readyState === 0 || this.lastAbort === o.xhrID ) );
			xhr = null;
			return ret;
		},
		_complete: function(context, origFn, xhr, status, xhrID, o){
			if(this._isAbort(xhr, status, o)){
				status = 'abort';
				o.abort.call(context, xhr, status, o);
			}
			origFn.call(context, xhr, status, o);
			
			$.event.trigger(this.name +'AjaxComplete', [xhr, status, o]);
			
			if(o.domCompleteTrigger){
				$(o.domCompleteTrigger)
					.trigger(this.name +'DOMComplete', [xhr, status, o])
					.trigger('DOMComplete', [xhr, status, o])
				;
			}
			
			this._removeXHR(xhrID);
			if(!this.inProgress){
				$.event.trigger(this.name +'AjaxStop');
			}
			xhr = null;
		},
		_success: function(context, origFn, data, status, xhr, o){
			var that = this;
			if(this._isAbort(xhr, status, o)){
				xhr = null;
				return;
			}
			if(o.abortOld){
				$.each(this.requests, function(name){
					if(name === o.xhrID){
						return false;
					}
					that.abort(name);
				});
			}
			if(o.cacheResponse && !cache[o.xhrID]){
				if(!xhr){
					xhr = {};
				}
				cache[o.xhrID] = {
					status: xhr.status,
					statusText: xhr.statusText,
					responseText: xhr.responseText,
					responseXML: xhr.responseXML,
					_successData: data,
					cacheTTL: o.cacheTTL, 
					timestamp: new Date().getTime()
				};
				if('getAllResponseHeaders' in xhr){
					var responseHeaders = xhr.getAllResponseHeaders();
					var parsedHeaders;
					var parseHeaders = function(){
						if(parsedHeaders){return;}
						parsedHeaders = {};
						$.each(responseHeaders.split("\n"), function(i, headerLine){
							var delimiter = headerLine.indexOf(":");
		                    parsedHeaders[headerLine.substr(0, delimiter)] = headerLine.substr(delimiter + 2);
						});
					};
					$.extend(cache[o.xhrID], {
						getAllResponseHeaders: function() {return responseHeaders;},
						getResponseHeader: function(name) {
							parseHeaders();
							return (name in parsedHeaders) ? parsedHeaders[name] : null;
						}
					});
				}
			}
			origFn.call(context, data, status, xhr, o);
			$.event.trigger(this.name +'AjaxSuccess', [xhr, o, data]);
			if(o.domSuccessTrigger){
				$(o.domSuccessTrigger)
					.trigger(this.name +'DOMSuccess', [data, o])
					.trigger('DOMSuccess', [data, o])
				;
			}
			xhr = null;
		},
		getData: function(id){
			if( id ){
				var ret = this.requests[id];
				if(!ret && this.opts.queue) {
					ret = $.grep($(document).queue(this.qName), function(fn, i){
						return (fn.xhrID === id);
					})[0];
				}
				return ret;
			}
			return {
				requests: this.requests,
				queue: (this.opts.queue) ? $(document).queue(this.qName) : [],
				inProgress: this.inProgress
			};
		},
		abort: function(id){
			var xhr;
			if(id){
				xhr = this.getData(id);
				
				if(xhr && xhr.abort){
					this.lastAbort = id;
					xhr.abort();
					this.lastAbort = false;
				} else {
					$(document).queue(
						this.qName, $.grep($(document).queue(this.qName), function(fn, i){
							return (fn !== xhr);
						})
					);

				}
				xhr = null;
				return;
			}
			
			var that 	= this,
				ids 	= []
			;
			$.each(this.requests, function(id){
				ids.push(id);
			});
			$.each(ids, function(i, id){
				that.abort(id);
			});
		},
		clear: function(shouldAbort){
			$(document).clearQueue(this.qName); 
			if(shouldAbort){
				this.abort();
			}
		}
	};
	$.manageAjax._manager.prototype.getXHR = $.manageAjax._manager.prototype.getData;
	$.manageAjax.defaults = {
		beforeCreate: $.noop,
		abort: $.noop,
		abortIsNoSuccess: true,
		maxRequests: 1,
		cacheResponse: false,
		async: true,
		domCompleteTrigger: false,
		domSuccessTrigger: false,
		preventDoubleRequests: true,
		queueDuplicateRequests: false,
		cacheTTL: -1,
		queue: false // true, false, clear
	};
	
	$.each($.manageAjax._manager.prototype, function(n, fn){
		if(n.indexOf('_') === 0 || !$.isFunction(fn)){return;}
		$.manageAjax[n] =  function(name, o){
			if(!managed[name]){
				if(n === 'add'){
					$.manageAjax.create(name, o);
				} else {
					return;
				}
			}
			var args = Array.prototype.slice.call(arguments, 1);
			managed[name][n].apply(managed[name], args);
		};
	});
	
})(jQuery);