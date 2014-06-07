// ==UserScript==
// @name           TravianProgram - Travian4 Plus Eklentisi
// @namespace      http://userscripts.org/scripts/show/131961
// @version        0.0.0.1
// @icon		 http://dl.dropbox.com/u/24398904/travian.jpg
// @copyright      Travianprogram.blogspot.com
// @require        http://dl.dropbox.com/u/24398904/jquery.min.js
// @require        http://dl.dropbox.com/u/24398904/jquery-ui.min.js
// @description    TravianProgram T4 plus eklentisi ile altin harcamadan tum plus ozelliklere ucretsiz sahip olabilirsiniz, eklenti turkcedir.
// @include        http://*t*.travian.*/*
// ==/UserScript==

/****************************************************

Original script not issued, this script is under update
This script is full compatible with other scripts.

*****************************************************/
(function () {

    function allInOneOpera() {
        notRunYet = false;
        function ID(id) { return document.getElementById(id) };
        function exp(href) { return document.location.href.match(href) };
        function xpath(path) { return document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); };
        function CLASS(str, m) { return (typeof m == 'undefined' ? document : m).getElementsByClassName(str); };
        function C(value) { return parseInt(value) };
        function ReLoadTime(Time) { var p = Time.split(":"); return (p[0] * 86400) + (p[1] * 3600) + (p[2] * 60) + (p[3] * 1); };
        function ReLoadTimeUp(Time) { var p = Time.split(":"); return (p[0] * 3600) + (p[1] * 60) + (p[2] * 1); };
        function MakeNum(value) { return value.toString().replace(/\d(?=(\d{3})+(\D|$))/g, "$&,"); }
        function Time(x, y) { return format(Math.abs(Math.round(x / y))); };
        function Create(tagName, attr, ihtml, append, appendTo) { var a = document.createElement(tagName); if (attr && attr != null) { for (var i in attr) if (attr.hasOwnProperty(i)) { a.setAttribute(i, attr[i]); }; }; if (ihtml && !ihtml == null) { a.innerHTML = ihtml; }; if (append && !append == null) { for (i = 0; i < append.length; i++) { a.appendChild(append[i]); }; }; if (appendTo && !appendTo == null) { return appendTo.appendChild(a); } else { return a; } };
        function appThis(element, Append) { if (Append && Append != null) { for (x = 0; x < Append.length; x++) { element.appendChild(Append[x]); }; }; };
        function cData(data) { return document.createTextNode(data); };
        function TAG(str, m) { return (typeof m == 'undefined' ? document : m).getElementsByTagName(str); };

        TAG('head')[0].appendChild(Create('style', { id: 'T4PTH', type: 'text/css' }));
        function GM_addStyle(css) {
            for (cx = 0; cx < css.split('}').length; cx++) { css = css.replace('}', '}\n'); };
            appThis(ID('T4PTH'), [cData(css)]);
        };
        var RTL = document.defaultView.getComputedStyle(document.body, null).getPropertyValue('direction');
        var dragObj = new Object(), x, y, elem, par;
        dragObj.zIndex = 10000;

        var About = {
            Version: { Now: '0.0.0.1', New: '0.0.0.2' },
            Script: { Page: 'http://userscripts.org/scripts/show/131961', Download: 'http://userscripts.org/scripts/show/131961.user.js' }
        };

        $('<span style="position: absolute; left: 10px; top: 30px; font-size: 10.5px; z-index: 10000;"><u>TravianProgram T4+</u> <b id="this.version">' + About.Version.Now + '</b></span>')
.appendTo($('#logoutContainer'));

        var uSpeed = 'data:image/gif;base64,R0lGODlhGgAQAPcAAAAAAAICAgQEBAYGBgkJCQ0NDRAQEBISEhYWFhkZGR0dHR8fHyIiIiQkJCYmJigoKCsrKy4uLjMzMzU1NTc3Nzg4OD4+PkFBQUdHR0tLS01NTU9PT1JSUldXV1lZWV5eXmJiYmVlZWdnZ2hoaHFxcXNzc3R0dHd3d3l5eYGBgYKCgoSEhIaGhomJiYqKioyMjI2NjY+Pj5CQkJGRkZWVlZqampubm5ycnKGhoaampqioqKurq6+vr7Ozs7S0tLW1tbi4uLm5ub6+vr+/v8PDw8fHx8nJycrKyszMzM7Ozs/Pz9HR0dLS0tfX193d3d7e3uDg4OHh4eLi4uPj4+Tk5Ofn5+jo6Onp6erq6uzs7O/v7/Dw8PLy8vPz8/T09PX19fb29vj4+Pn5+fv7+/z8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAaABAAAAj/AP8J/FcFQwMcZwYqXMhw4AkAAApoGYhFCJGGGGFAhGCFyQ0QCgQMiPEE48IuKToQEWFAQAAKJSwI0ADE5EIzQSASaAHm3xUXABoMaYhCBpmBYiQkgFGgAIswAn0YAPCizMIIAEI4EcgDgI1/RS4AyLBEIBMMHo4qrOIBwIIjWhgw+CIwjIoCCXII9NKTIRkaBwpYAKBjIBgkGyCSmGLzn5IHACJ4+RdlhswADigIaFCk8ZQVSf5ZURBxxI8rXGg0nbGlsUAxLAQcqKHQSIQAGqS4FtgDsgjGAqmYAKCAx5jdUj4EhaJwxwEBJrjsNgNjQlmFTDgAqJBl9z/pDMOkBEDQJCAAOw==';
        var imghero = "data:image/gif;base64,R0lGODlhEAAQANU/AM+qcPCrU/fDcOJXD/Xamt5UBPRtJtO5gq9ZAdywWa51F/mMKv/91ON6Gv/wtNyHJ7SEM/qXR//++v/99P73xqltKvjow/eENsZZB/11CPeVNuW3bOxsA/zXquLPpv/97NxhAf//3MacSv3x1MxMAf7z4v/np//23c+ZOvavY8deF9NTCePDg+nQif2+du2JOeHbs8uXY+/do+Tpwch5H+vr1NBuHdt4Ec2BMfzu1/v28dGBOdnAmuW8e/327P///yH5BAEAAD8ALAAAAAAQABAAAAamwJ9w+JtQGMQksSSjTJRJSSdB+ECXrkdgdBVOOhFOgyAhSiSMNMW1yIACjmNJUoOxBPhAG3QLbHoHHj8zGw8LGogNHCAgChAAFj8fDgENCxcXBgMFKxWQZZImKZmaKyQqADmgRQwmEQacGAg7XEkhBC8FJLIIOCdKDAI2GA8oCgg0kUQTDiIVMRY5BxAKPKuSLSI8OkI+BCIHVkMTMgQ+RCcEHk8/QQA7";
        var imgatti = "data:image/gif;base64,R0lGODlhEAAQAOYAAJoxM5EqLocoK8BKTre6vsnKy6mqq/T58nu0X1qNQOTv3srivFN8OU1zNVuGPnGiUFqAQXqnXJG9c4yyc4Kla+rz5FqEPVF3N0xuNGqYSoKtZIWvaIClZoivbZnAfpq9gcfcuNnozsXatevv4vH06vj49KGhoJ2dnNjUwevj1uamSNKeUuKrW7+RT7SKTeizZLOMVKOCUamPaa2VcsashtnBnamXfMSxlsOJN7KEQ+fWv9HLw7Kro/Ls5qmop7KNeqRuX71vZrJVTqlSTbtMTOrq6unp6eXl5ePj4+Li4t3d3dra2tjY2NbW1tDQ0M7OzsrKysnJycjIyMbGxsXFxcPDw729vbu7u7m5ubi4uLa2trW1tbOzs66urqurq6mpqaWlpaOjo6KiopOTk////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGQALAAAAAAQABAAAAengFlWWmSFhlJXXIZkYFFFUYtNSklii2RdVUdPhV1JS16WhSZTSFBPVEhjoYZfS0xYRlsFq4ZhTU4ntIsEBig/QENBJZY1MDcpPkICAgBEI6EzLywxQQECAQM9ljw5LTo2CwkNCQgVizIrODuFFRkYDhoKiy4qNIsRDRYRILqFGvkZJIgwR2sDAwYWHnjoMEFeqA8NIFi4kGHDBA2rQnCgQILMgQOFAgEAOw==";
        var imgattc = "data:image/gif;base64,R0lGODlhEAAQAPcAAAEBAxEYIyktMxIXHictNMnKy1x4kig8TVd4k0JYajFRaUlrhhklLVZnc0ZleElpfGB+j4eXoExTV0VldV15hxsjJ1R4iEdhbU1pdnCLmHCDjCs7Qp+ts0hfZ05ueU1nb0lhaVRud5Oip0pqc5qxuG58gE5VV2tydExnbmJ9hBEVFm+Ch7jEx7C4ulVkZ3+Tl3uFh7m+v77O0Wdtbougo5yqrIqcnrPDxYiQkY6YmbC7vK+6uyswMMvY2MDMzL/Ly3B3d2BmZj9DQz5CQi0wMM7a2s3Z2cPPz73IyLvGxrG8vJukpFNYWMTPz5CYmI6Wlo2VlX6FhX2EhGhublleXs7Z2Tw/Pzs+PikrK52kpJGXlx0eHr/Fxc7a2aawr6avrnN6eW1ycYKHhl9nZTw/PlxhXVNYU4mNiaGhoOamSNKeUr+RT7SKTeizZLOMVKmPaa2VcsashtnBncSxlsOJN7KEQ9HLw7KrowMCAerq6unp6eXl5ePj4+Li4t3d3dra2tjY2NbW1s7OzsrKysnJycjIyMbGxsXFxcPDw729vbu7u7m5ubi4uLa2trW1tbOzs66urqurq6mpqaWlpaOjo6KiopOTkwAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAJgALAAAAAAQABAAAAjfABklaoSpoMFCih4ZxDSJUB5CCwP56VNpISZIiPYIKgipz59IFguiMcRnkKBDfCyFNCjpD6BFehwVKBhBRkhKMVqcMFNmTIASJkJymSEAwIADChoQSGBQjps5O0JsYLDAAAISLDgshNPmUgUMDoqIOfPCSxaDd+qswWNhgoYuVHT8IAPmCKY3aujYUfGAQpMvQYoUyQEDCSY2aeJg8jDiRhEfVnAUyQAhjMUPKXpUgSJkiAQQF7TYNYiCRhEjW6Jg4uFiBZMlCzuIEGyloBMiWIBIWWijhuArBpNMeaIkIAA7";
        var Send_attack = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2wcGETotXvSOywAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAACI0lEQVQokW3Lz0uTcQDH8c/3eR5jublfkZZrTNuWUTktDULE6FJ2KfKUB1uSByMaj0H3/oJ67BJEoOJBuoV16hBkOJY/xqPo09A9OpvP1G26Z9uzZ25j+3YMoje8jm+Eo4d0XkrRpKoHKKX4n6RaDMxLKRqOHlJGL9WwtqtD3M6PZ/IlP/4po5UfibG8sLarQy9VwTSZWZ6rFRBJ6IgktDcZ7e+U0cr+iKIJEaVAuGoBjWaWJ5RSrG4m/CtbKUGtWqwXm+tpZ6t5DAAVY3khohSIlc2pHedPjfm8jkkOAHze5qmceoQlWZnYrnMSQojQYGCgHJVQzSlodZt5n9cxBQAMAKTlRf9Vt03s9lh5LbWD1VgWxQqFoZxEt8fGX3PbxVR0wQ8A3La82THzfvqVz8m5rj8I8PJ+AXvpGMJyC9pd5+A9rePbzOvwarzy++GIbYUVxt8e2BrPinPB5VvHueRg2tiJuLwOk4GFWjEgu/alf11O79wbHB5uu3Q5xAHAGVPF1Ww3WCRpExfaZtF3tw8cy0JamIW0IcNhr7c0GSsuAOAS0o9A8OsnQYomSLFEVUIY9WQx3sJyddiIFWP7B2lL9ojYjJ8/TvTcPrayN7y20NKvfVKrUTx78XLUc6Vrci64fFOnDdk7A4OPe3t7fi6Ggvf3DjVSyyn9XJkxoVqtYejJKO9t75oCAKPp+QDHnYDT5RIBfB8aeWqd/vBOKDFG/AFEDxKNtU2dSAAAAABJRU5ErkJggg%3D%3D';
        var Send_resource = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAMCAYAAAC5tzfZAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2wcGEgE3nWIm0AAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAABO0lEQVQokX2Qv0tCURTHP9efkFTLoyLQhtTASVpqFiJabGtrtf6AQKKtJaS9waHGBh3EhgYlAhch0DsVZBJmWEmkYA49sttg7+Uz6Tudc8/9cDgfoZTCyP7u9m/zk9brEy6hSCSzwnhzDAJrkXkLkE4VcAn+xDEMpFMFc+gP+LirPFi2ANiMQsoaR8eX+AM+mp0e9/UGuYsi5ZsO8VhUjYSKstqHy2W67Rc2N1ZZiSyzGJ5GV8ICikERAFe5QzU1G6DZqCBlDYDr27pFhm0UYCQcngMgFPRatpnQ+emBBTDqQfDPTZpm2v838VhU2QDOTvbU82PbMmw2Kpa+KKvoqm/evrTgVl+fOpl8iY9Om3FPj27nzfwsZc0063basYsheztb66r1rpv9xJiLUNDLjDZJJl9C8zhJJLPiG9UDhfU4C7tHAAAAAElFTkSuQmCC';
        var IMG_open = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFPBSgJRFD3WLALbjDomiBYWVESLmIqMkSyiTVCbFn1BLfydXNQPFLRuE5IIUhBMrSQhkjAEzanZ5EIdtXffzDgOZBuF49z7zjuHM/fN8/R6PYzyE04vVHqmZFk+Zk/FWs8zXDGkrT7F4OJVVeW8wP6ykiQlD+aB0KTJVn+gvH1DKdRxRv2SBMz63Hy5LCn1ev1ojPXJaDSKoBe4zqjIqCVUPnXEI8BuzBRQTWvE0R7aSxrSCp1OBwSjO47Dbbn/bkYXrnp5WgQIVm/rBMMw0G63ucFNToUoihyLEdFl8PKhQ9dN7G/JpoZpBSo4uhPYSzgJ2gMJqJ4LM8Ow2O9tHTdotVowOsDdvZNgJjSQgHHvVSfBzqbMNdyAilazyV0TG8MThIMih92ThrQ8QZMSsMWHRyfBVMA9g5rmJIivy1zjJLAM1laHn4LfJ3LYva3rD7H7zxf9F+caIuEy94rKV4OTYb8XC+wYV2IB3j+XNBTZMQ7yfQM6y1qthmJRR6Nhbih6vXhic7gNmAaapvF3H+RpTqT1yCfnWbZWsC5P3kqoWJcnZfXpIfySZ9Tr/CvAAFL4JRqBf1s8AAAAAElFTkSuQmCC';
        if (!ID('l1')) { XundefinedX(); };


        function LanguagePack() {
            var lng = 'en';
            if (GM_getValue('MyLang')) { lng = GM_getValue('MyLang'); };
            return lng
        };
        function SubLanguage(sLang, oType) {
            /* thanks to:
            1=Arabic by ww_start_t
            2=Bulgarian by Userbg
            3=SimpChinese by Chen Chen
            4=German by Oski1983
            5=English by ww_start_t
            6=Spanish by msdn_bg
            7=Persian by ilqar
            8=French by armanda
            9=Hungary by Mauro van der Gun‏
            10=Italian by Incub0
            11=Deutch by Richárd Kővári‏
            12=Russian by Serj_LV
            13=Slovak by Zapo
            14=TradChinese by Chen Chen */
            var subLang = [], LNG;             /* [0]             [1]                    [2]                      [3]               [4]          [5]                      [6]             [7]        [8]          [9]              [10]             [11]               [12]                   [13]                     [14]                    [15]                 [16]                    [17]           [18]       [19]    [20]    [21]   [22]    [23]       [24]          [25]                      [26]                       [27]                    [28]                           [29]                                            [30]                                                       [31]                            [32]            [33]         [34]         [35]       [36]       [37]             [38]	                            [39]	               [40]	         [41]          	[42]	       [43]	       [44]           [45]	             [46]                     [47]                    [48]                          [49]                                        [50]                                                [51]                                  [52]              [53]                          [54] */
            if (sLang == 'ar') subLang['ar'] = ['الإعدادات', 'دفتر الملاحظات', 'إظهار قائمة المباني', 'إخفاء قائمة المباني', 'حفظ', 'ارسال موارد الى: ', 'ارسال قوات الى: ', 'الروابط', 'إضافة', 'عنوان الرابط:', 'أسم الرابط:', 'حذف الرابط:', 'الروابط المساعده', 'حساب تطوير الموارد', 'محاكي المعركة المطور', 'حساب المسافة', 'بحث عن القرى القمحية', 'بحث عن الفيله', 'نصف القطر', 'بدأ', 'المسح', 'من', 'الى', 'أكتمل', 'تحديث', 'لديك أخر اصدار', 'قد يكون لديك نسخة تجريبية!', 'يوجد أصدار جديد!', 'هل تريد تثبيتة...؟', 'عرض رمز ارسال رسالة بجانب كل لاعب', 'اظهار جدول معلومات حول الهجوم في نقطة التجمع', 'عرض رموز ارسال قوات و موارد بجانب كل قرى اللاعبين', 'قوة الهجوم', 'قوة الدفاع', 'الخسائر', 'معلومات', 'الفائدة', 'الخسائر', 'جميع الواحات', 'أظهار تحديد الكل للرسائل والتقارير', 'تحديد الكل', 'العاصمة', 'مجموع الموارد', 'المجموع', 'السرعة', 'تصوير التقرير', 'الرابط يظهر هنا', 'عرض مستويات المباني', 'عرض خصائص السوق', 'اظهار وقت وصول التجار في السوق', 'عرض معلومات اللاعب والتحالف عند مرور الماوس عليه', 'اظهار معلومات القوات عند مرور الماوس عليه', 'عرض شريط الموارد', 'شريط الموارد', 'أظهار جدول ترقية حقول الموارد'];
            if (sLang == 'bg') subLang['bg'] = ['Настройки', 'Тефтерче', 'Покажи лист със сгради', 'Скрий лист със сгради', 'Запази', 'Изпрати ресурс до: ', 'Изпрати армия до: ', 'Връзки', 'Добави', 'Адрес на връзка:', 'Име на връзка:', 'Изтрий връзка:', 'Полезни връзки', 'Ресурсен калкулатор', 'Разширен симулатор битки', 'Калкулатор за разстояния', 'Търсачка ресурсни полета', 'Търсачка на слонове', 'Радиус', 'Старт', 'Сканирай', 'От', 'До', 'Процента', "Обнови", "Имате най-новата версия!", "Може би имате бета версия", "Има нова версия", "Исате ли да я инсталирате..?", 'Виж икона изпрати съобщения', 'Покажи информация за атаката', 'Покажи изпрати Армия/Ресурс', 'Атакуващ', 'Защитник', 'Загуби', "Информация", "Печалба", "Загуби", "Всеки оазис", 'Покажи маркирай всички съобщения бутона', 'Избери всички', 'Столица', 'Общо ресурс', 'Общо', 'Скорост', 'Хвани Доклада', 'Докладвай връзка...', 'Покажи нивото в центъра', 'Виж информация в пазара', 'Виж разстояние и време на търговците в пазара', 'Пояснения за Играч/Клан', 'Пояснения за войската', 'Покажи ресурсния бар', 'Ресурс бар', 'Покажи Таблица с ресурсни полета'];
            if (sLang == 'cn') subLang['cn'] = ['设置', '记事本', '显示建筑列表', '隐藏建筑列表', '保存', '将资源发送到：', '派军队到：', '链接', '添加', '链接地址：', '链接名称：', '删除链接：', '帮助链接', '资源发展计算器', '扩展战斗模拟器', '距离计算器', '农田查找器', '大象查找器', '半径', '开始', '扫描', '从', '到', '百分比', '更新', '你目前是最新版本！', '你可以选择测试Beta版本', '有新版本可用', '你是否要安装？', '查看已发送信息图标', '显示攻击信息表', '显示派出的军队/资源', '攻击方', '防御方', '损失', '信息', '利润', '损失', '任何绿洲', '显示选择所有的消息和报告的选项', '全选', '首都', '共有资源', '总计', '服务器速度', '截取报告', '报告链接…', '显示中心数目', '显示市场的信息', '在市场内显示距离和事件', '为正在行军的玩家和联盟的部队显示辅助提示', '显示军队辅助提示', '显示资源统计柱状图', '资源统计柱状图', '显示资源田升级表'];
            if (sLang == 'de') subLang['de'] = ['Einstellungen', 'Notizblock', 'Zeige Gebäudeliste', 'Verstecke Gebäudeliste', 'Speichern', 'sende Rohstoffe zu: ', 'sende Truppen zu: ', 'Links', 'Hinzufügen', 'Link URL:', 'Link Name:', 'Link löschen:', 'Hilfelinks', 'Rohstoff Ausbildungsrechner', 'Erweiterter Kampsimulator', 'Entfernungsrechner', 'Getreidefinder', 'Elefantenfinder', 'Radius', 'Start', 'Scan', 'Von', 'Zu', 'Prozent', "update", "Sie haben die aktuelle Version!", "You may have a Beta Version", "Neue Version verfügbar", "wollen sie diese installieren..?", 'Zeige Nachrichten Icon', 'Zeige Infotabelle über Angriffe', 'Zeige Rohstoffe/Truppen senden', 'Angreifer', 'Verteidiger', 'Verluste', "Information", "Gewinn", "Verlust", "Jede Oase", 'Zeige alle Nachriten/Berichte auswählen', 'Alle auswählen', 'Hauptdorf', 'Total Rohstoffe', 'Total', 'Geschwindigkeit', 'Bereichte erfassen', 'Berichtelink...', 'Zeige Nummer Zentriert', 'Zeige Marktplatzinformationen', 'Zeige Entfernung und Zeit der Händler im Marktplatz', 'Zeige Tooltip für Spieler/Alianz', 'Zeite Truppentooltip', 'Zeige Rohstoffleiste', 'Rohstoffleiste', 'Zeige Upgradetabelle für Rohstofffelder'];
            if (sLang == 'en') subLang['en'] = ['Ayarlar', 'Not Defteri', 'Binalarin Listesini Goster', 'Binalarin Listesini Gizle', 'Kaydet', 'hammadde gonder: ', 'asker gonder: ', 'Linkler', 'Ekle', 'Link URL:', 'Link Ismi:', 'Linki sil:', 'Yardimci Adresler', 'Kaynak Gelisim Hesaplayicisi', 'Genisletilmis Savas Similatoru', 'Uzaklik Hesaplayici', 'Tarla Bulucu', 'Fil Bulucu', 'Yaricap', 'Basla', 'Tara', 'buradan', 'buraya', 'Yuzde', "guncelle", "Son Versiyona Sahipsin!", "Deneme versiyona sahip olabilirsin", "Yeni versiyon var", "onu kurmak istermisin..?", "Gonderilmis mesaj resmini goster", "Saldiri raporunu goster", "Goster gonder Asker/Hammadde", "Saldiran", "Savunan", "Zararlar", "Bilgi", "kar", "Zararlar", "Herhangi bir vaha", "Secilmis tum mesaj ve raporlari goster", "Hepsini sec", "Baskent", "Toplam hammadde", "Toplam", "Server hizi", 'Capture Report', 'Rapor linki...', 'Merkez numaralari goster', 'Pazar bilgilerini goruntule', 'ulasim mesafesini ve pazarcilarin ulasim suresini goster', "Oyuncu / birlik icin ipuclarini goster", 'Askerler icin ipuclarini goster', 'Hammadde cubugunu goster', 'Hammadde cubugu', 'Kaynak alanlari gelisim tablosunu goster'];
            if (sLang == 'es') subLang['es'] = ['ajustes', 'Cuaderno', 'Mostrar una lista de edificios', 'Ocultar la lista de los edificios', 'ahorrar', "Envoyer des ressources pour:", "Envoyer une armée: ", 'Links', 'Añadir', 'URL del enlace: ', ' Link Name:', 'Eliminar Link: ', 'Ayudar a los enlaces', 'resource development calculator', 'Simulador de combate avanzado', 'Calculadora del tiempo del recorrido', 'Crop Finder', 'Elephant Finder', 'radio', 'comienzo', 'escanear', 'de', 'a', 'por ciento', "actualizar", "Usted tiene una versión más reciente", "Usted puede tener una versión beta", "nueva versión disponible", "¿quieres instalarlo ..?", "Vista de icono enviar un mensaje", "mostrar la tabla de información de ataque", "iconos de vista de enviar ataque / recurso", "Atacante", "defensor", "pérdidas", "información", "beneficio", "pérdidas", 'cualquier oasis', 'Mostrar, seleccionar todos los mensajes e informes', 'seleccionar todo', 'El Capital', 'de los recursos Total', 'Total', 'Speed', 'Capture Report', 'Enlace Informe ... '];
            if (sLang == 'fa') subLang['fa'] = ['تنظیمات', 'دفترچه یادداشت', 'نمایش لیست ساختمانها', 'پنهان کردن لیست ساختمانها', 'ذخیره', 'ارسال منابع به: ', 'ارسال نیرو به: ', 'پیوندها', 'اضاف کردن', 'آدرس لینک :', 'نام لینک:', 'حذف لینک:', 'لینکهای کمکی', 'محاسبه گر توسعه منابع ', 'شبیه ساز نبرد توسعه یافته', 'محاسبه گر مسافت', 'گندم یاب', 'فیل یاب', 'شعاع', 'شروع', 'اسکن کن', 'از', 'به', 'در صد', "به روز کردن", "شما آخرین نسخه را در دست دارید!", "ممکن است شما نسخه بتا را داشته باشید", "نسخه جدید در دسترس است", "آیا شما می خواهید نصب کنید انرا..?", 'نمایش آیکون ارسال پیام', 'نمایش جدول اطلاعات حمله', 'نمایش ارسال ارتش/منابع', 'مهاجم', 'مدافع', 'تلفات', "اطلاعات", "پروفایل", "تلفات", "همه واحه ها", 'نمایش باكس انتخاب همه پیامها و گزارشات', 'انتخاب همه', 'سرمایه', 'منابع مجموع', 'مجموع', 'سرعت', 'ضبط گزارش', 'گزارش لینک ...'];
            if (sLang == 'fr') subLang['fr'] = ['Paramètres', 'portable', 'Afficher une liste de bâtiments', 'Cacher la liste des bâtiments', 'Enregistrer', 'Envoyer des ressources pour: ', "De l'envoi d'une armée pour: ", 'Liens', 'Ajouter', 'lien URL:', 'Nom du lien:', 'Supprimer le lien:', 'Aide liens', 'Calculateur développement de ressources', 'Simulateur de combat amélioré', 'distance calculator', 'Crop Finder', 'Elephant Finder', 'rayon', 'démarrage', 'scan', 'à partir de', 'à', 'pour cent', "update", "Vous avez une nouvelle version!", "Vous pouvez avoir une version bêta", "nouvelle version disponible", "voulez-vous de l'installer ..?", "Vue en icône envoyer un message", "show table sur Info attaque", "icônes envoyer attaque / ressource", "Attaquant", "défenseur", "Pertes", 'informations', 'les bénéfices', 'pertes', 'toute oasis', 'Voir, sélectionner tous les messages et les rapports', 'Sélectionner tout', 'capital', 'total des ressources', 'total', 'vitesse', 'Capturez rapport', 'Rapporter un lien ...'];
            if (sLang == 'hk') subLang['hk'] = ['設定', '筆記本', '顯示建築單', '隱藏建築單', '儲存', '送資源： ', '指派軍隊： ', '相關連結', '添加', '連結網址：', '連結名稱：', '刪除連接：', '幫助連結', '資源建設計算器', '進階戰鬥模擬器', '距離計算器', '搜索神田', '搜索大象', '範圍', '開始', '掃描', '從', '到', '百分比', "更新", "最新版本！", "測試版本", "要安裝嗎?", '發送訊息圖示', '顯示攻擊訊息', '顯示輸送軍隊/資源', '攻擊', '防禦', '損失', "訊息", "收穫", "損失", "隨意綠洲", '顯示訊息和報告(選擇)', '全選', '資金', '資源總計', '總計', '速度', '捕獲報告', '報告連結...', '顯示等級數字', '市場訊息', '市場商人距離和時間', '顯示玩家/聯盟圖示', '軍隊圖示', '顯示資源欄', '資源欄', '顯示資源建設升級'];
            if (sLang == 'hu') subLang['hu'] = ['Beállítások', 'Jegyzetek', 'Épületlista megjelenítése', 'Épületlista elrejtése', 'Mentés', 'nyersanyag küldése ide: ', 'egységek küldése ide: ', 'Linkek', 'Hozzáadás', 'Link URL:', 'Link Név:', 'Link törlése:', 'hasznos linkek', 'nyersanyag fejlődés kalkulátor', 'Bővített harcszimulátor', 'távolság kalkulátor', 'Búzakereső', 'Elefántkeresp', 'Sugár', 'Start', 'Keresés', '-tól', '-ig', 'Százalék', "frissítés", "A legújabb verzióval rendelkezel!", "Lehet, hogy béta verzióval rendelkezel", "elérhető egy újabb frissítés", "telepíted?", 'üzenetküldés ikon megjelenítése', 'Támadás táblázatba kiíratása', 'Egység/nyersanyag küldés megjelenítése', 'Támadó', 'Védő', 'Veszteségek', "információ", "profit", "Veszteségek", 'Minden oázis', 'Tekintse meg, válassza az összes üzenetek és jelentések', 'Az összes kijelölése', 'tőke', 'Összes Erőforrás', 'teljes', 'sebesség', 'Capture jelentés', 'Jelentés Link ...'];
            if (sLang == 'it') subLang['it'] = ['Impostazioni', 'Not Defteri', 'Lista Mostra Buildings', 'Nascondi List Buildings', 'Salva', 'inviare risorsa:', 'inviare truppe a:', 'Link', 'Aggiungi', 'URL del link : ', ' Nome del link: ', ' Cancella link: ', ' help links ', ' calcolatore sviluppo delle risorse ', ' Estesa simulatore di combattimento ', ' calcolatore della distanza ', ' Crop Finder ', ' Elephant Finder ', ' Radius ', 'Start', 'Scan', 'Da', 'To', 'percentuale', "update", "Hai una versione più recente!", "Si può avere una versione beta", "nuova versione", "vuoi installarlo ..? ", 'Guarda inviare icona del messaggio', 'info tavolo Mostra informazioni attacco', 'Mostra inviare Esercito / Resource', 'Attaccante', 'Defender', 'perdite', " informazione ", "profitto", "perdite", "Ogni oasi", 'Mostra selezionare tutti i messaggi e le relazioni', 'Seleziona tutto', 'Capitale', 'Risorse totali', 'Totali', 'Velocità??', 'Capture report', 'Link Rapporto ...', 'numero del centro Show', 'informazioni di mercato View', 'Vedi la distanza e il tempo per i commercianti in piazza del mercato', 'Mostra suggerimenti per il giocatore / alleanza', 'Visualizza le truppe ', ' Mostra la barra delle risorse ', ' barra Risorse ', ' Mostra i campi di risorse aggiornare la tabella '];
            if (sLang == 'nl') subLang['nl'] = ['Instellingen', 'Kladblok', 'Laat gebouwen lijst zien', 'Verberg gebouwen lijst', 'Opslaan', 'stuur grondstoffen naar: ', 'stuur troepen naar: ', 'Links', 'Toevoegen', 'Link URL:', 'Link naam:', 'Verwijder link:', 'help links', 'grondstoffen voor ontwikkelingen calculator', 'Uitgebreide veldslagsimulator', 'afstand calculator', 'Graandorp zoeker', 'Olifant zoeker', 'Straal', 'Start', 'Scan', 'Van', 'Naar', 'Procent', "Update", "Je hebt de laatste versie!", "Je hebt misschien een bèta versie", "nieuwe versie beschikbaar", "wil je deze installeren?", 'Laat stuur bericht icoon zien', 'Laat informatie tabel over de aanval zien', 'Laat stuur leger/grondstoffen iconen zien', 'Aanvallen', 'Verdediger', 'Verliezen', "Informatie", "Opbrengst", "Verliezen", 'elke oase', 'Bekijk, selecteer alle berichten en rapporten', 'Alles selecteren', 'hoofdstad', 'Totaal Resource', 'totaal', 'snelheid', 'Capture Report', 'Meld Link ...'];
            if (sLang == 'ru') subLang['ru'] = ['Настройки', 'Блокнот', 'Показать список зданий', 'Спрятать список зданий', 'Сохранить', 'отослать ресурсы в: ', 'направить войска в: ', 'Ссылки', 'Добавить', 'URL ссылки:', 'Название ссылки:', 'Удалить ссылку:', 'Полезные ссылки', 'Калькулятор развития ресурсов', 'Расширенный симулятор сражений', 'Калькулятор расстояний', 'Поиск зерна', 'Поиск слонов', 'Радиус', 'Старт', 'Сканирование', 'сейчас', 'будет', 'Процент', 'обновление', 'У Вас последняя версия!', 'У вас тестовая версия', 'Доступна новая версия', 'вы хотите установить её ?', 'Показывать иконку отправки сообщения', 'Показывать таблицу информации об атаке', 'Показывать иконку отослать Ресурсы/Войска', 'Нападение', 'Оборона', 'Потери', 'информация', 'бонус', 'Потери', 'Любой оазис', 'Показать выбор всех сообщений и отчетов', 'Выбрать всё', 'Столица', 'Всего ресурсов', 'Всего', 'скорость', 'Опубликовать отчет', 'Ссылка на отчет…', 'Показывать уровни полей/зданий', 'Дополнительные функции на рынке', 'Показывать расстояние и время движения на рынке', 'Показывать подсказки по игроку/альянсу', 'Показывать подсказки по войскам', 'Показывать таблицу ресурсов', 'Таблица ресурсов', 'Показывать таблицу улучшения полей'];
            if (sLang == 'sk') subLang['sk'] = ['Nastavenie', 'Poznámky', 'Zobraziť zoznam prác', 'Skryť zoznam prác', 'Uložiť', 'poslať suroviny do: ', 'poslať armádu do: ', 'Odkaz', 'Pridať', 'Odkaz URL:', 'Názov odkazu:', 'Zmazať odkaz:', 'Helpodkazy', 'Kalkulačka rozvoju surovín', 'Rozšírený bojový simulátor', 'Kalkulačka vzdialeností', 'Vyhľadávač Crop', 'Vyhľadávač Slonov', 'Rádius', 'Štart', 'Scan', 'Z', 'Do', 'Percent', "obnoviť", "Máte poslednú verziu!", "Je možné mať betaverziu", "nová verzia dostupná", "chcete to nainštalovať..?", 'Zobraziť ikonu poslať správu', 'Zobraziť tabuľku informácií oútoku', 'Zobraziť poslať armádu/suroviny', 'Útočník', 'Obranca', 'Straty', "informácie", "zisk", "Straty", "Každé oázy", 'Zobraziť vyberte všetky správy a hlásenia', 'Vybrať všetko', 'Hlavná dedina', 'Všetky suroviny', 'Total', 'Rýchlosť', 'Zachytiť Hlásenie', 'Odkaz Hlásenia...', 'Zobraziť center číslo', 'Zobraziť informácie obchodníka', 'Zobraziť vzdialenosť ačas pre obchodníkov na trhu', 'Zobraziť popisky pre hráčov/aliancie ', 'Zobraziť vojsk tipy', 'Zobraziť tabuľku surovín', 'Tabuľka surovín', 'Zobraziť tabuľku pre upgrade surovinových polí'];
            if (sLang == 'th') subLang['th'] = ['ตั้งค่า', 'สมุดบันทึก', 'แสดงรายการสิ่งก่อสร้าง', 'ซ่อนรายการสิ่งก่อสร้าง', 'Save', 'ส่งทรัพยากรถึง: ', 'ส่งกองทัพถึง: ', 'Links', 'เพิ่ม', 'Link URL:', 'Link Name:', 'Delete Link:', 'help links', 'resource development calculator', 'Extended Combat Simulator', 'distance calculator', 'Crop Finder', 'Elephant Finder', 'รัศมี', 'เริ่ม', 'ค้นหา', 'จาก', 'ถึง', 'เปอร์เซ็นต์', "update", "เป็นเวอร์ชั่นล่าสุดแล้ว!", "เป็นเวอร์ชั่นทดสอบ", "มีเวอร์ชั่นที่ใหม่กว่านี้", "ต้องการติดตั้งทันที..?", 'แสดง icon ส่งจดหมาย', 'แสดงตารางข้อมูลการโจมตี', 'แสดงการส่งกองทัพ/ทรัพยากร', 'ผู้โจมตี', 'ผู้ป้องกัน', 'พ่ายแพ้', "ข้อมูล", "กำไร", "พ่ายแพ้", "โอเอซิสอื่น", 'แสดง เลือกทั้งหมด ในหน้ารายงานและจดหมาย', 'เลือกทั้งหมด', 'เมืองหลวง', 'ทรัพยากรทั้งหมด', 'ทั้งหมด', 'Speed', 'Capture Report', 'Report Link...', 'แสดงระดับสิ่งก่อสร้าง', 'แสดงข้อมูลตลาดสินค้า', 'แสดงระยะทางและเวลาขนส่งในตลาดสินค้า', 'แสดง tooltips สำหรับผู้เล่น/พันธมิตร', 'แสดง tooltips ของทหาร', 'แสดงแถบ Resource bar', 'Resource bar', 'แสดงตารางอัพเกรดทุ่งทรัพยากร'];
            if (sLang == 'tw') subLang['tw'] = ['設置', '記事本', '顯示建築列表', '隱藏建築列表', '保存', '將資源發送到：', '派軍隊到：', '鏈接', '添加', '鏈接地址：', '鏈接名稱：', '刪除鏈接：', '幫助鏈接', '資源發展計算器', '擴展戰鬥模擬器', '距離計算器', '農田查找器', '大象查找器', '半徑', '開始', '掃描', '從', '到', '百分比', '更新', '你目前是最新版本！ ', '你可以選擇測試Beta版本', '有新版本可用', '你是否要安裝？ ', '查看已發送信息圖標', '顯示攻擊信息表', '顯示派出的軍隊/資源', '攻擊方', '防禦方', '損失', '信息', '利潤', '損失', '任何綠洲', '顯示選擇所有的消息和報告的選項', '全選', '首都', '共有資源', '總計', '伺服器速度', '截取報告', '報告鏈接…', '顯示中心數目', '顯示市場的信息', '在市場內顯示距離和事件', '為正在行軍的玩家和聯盟的部隊顯示輔助提示', '顯示軍隊輔助提示', '顯示資源統計柱狀圖', '資源統計柱狀圖', '顯示資源田升級表'];
            LNG = '' + subLang[sLang][oType] + ''.toString();
            if (LNG == ('undefined' || null || '' || 'null' || 'NaN')) { LNG = SubLanguage('en', oType); } else { LNG = subLang[sLang][oType]; };
            return LNG;
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
                        var vers = $(data.responseText).find('div[id="summary"] p').eq(1).html().split('<b>Version:</b>')[1];
                        var GetVersion = C(vers.replace('.', '').replace('.', '').replace('.', ''));
                        var VersionNow = C(About.Version.Now.replace('.', '').replace('.', '').replace('.', ''));
                        if (GetVersion == VersionNow) { alert(SubLanguage(LanguagePack(), 25)); } else
                            if (GetVersion < VersionNow) { alert(SubLanguage(LanguagePack(), 26)); } else
                                if (GetVersion > VersionNow) {
                                    var ask = window.confirm('' + SubLanguage(LanguagePack(), 27) + '\n' + SubLanguage(LanguagePack(), 28) + '\n -- (' + About.Version.Now + ') --> ' + vers + ' ?');
                                    if (ask) { location.href = About.Script.Download; };
                                };
                    }
                });
            }
            var updateIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2wsIDQYVNRaPjAAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAAGSklEQVRYhcWXe4hcVx3HP+e+5rEzmZ3ZTTabbLMktk1iSEvS0NYqGtEoxUawtP4dUEGiUEVRqPUBaloo/cM/BPEfpYIoobamtVqRtsYsknSTNI8mTdhkd7Obx24yOzs7O497zz3n5x8z0SSd2U6lkB8c7oN77vdzf49zf0eJCLfTnNuqDnjv94BSyi08tW9PiPs9Y4X/x18KcByF7ygSnqO9cPHxSz9/7GURsYhIxwF4uR+89NIT+07Kh2GVUMujzx+S/I//KrlHdi8XEZYSV4Xdv9z+xd8e/FDERUTWP/u6zNe1vHL6ivQ9+eI+wFsqBH6cWfGdr96/BoDYWuwH9L9qDc91OHKxzIpMwGytwZpCCoLk54HUUgDJ0E1+dufGlcQiaHOLuuoSQjUT7Y1z15gqN/jK3mN4jsJznQBILAUQ7Lh7eRLguZEFxorxex64s+Dx2KYkxkLSV2QDhe/eTOYowIV/jF3l0u/3fG3i+OsTgAAlIG4LoJRSuV3PbLvu8vV9DmdmDPdtW04YNm96nuLto1fRm9MsaEE3DDYWhpY5FNLuf98lLZ5KZPCy+ckITgIW0ECt0zrginL7PnNnPwCfHE5wz4DLwYOXUSJUKzFhwxCbmNgIdQNauaiUz9HLEdNlTWwFbQXXaUqMTpWojbxwCpgVkVkRKYlI1BGA3PIHCukAgJlFzamZOuvvKnBttkYyKURhjNaa8mLIxEyV2WrMTFkTZBLsH69RbhisCI5SXFpo4Nn4ChC33P+/EHUA8CTRs+2+VTlqsWX/2CJu4LIwV8PzhEOHpgh8iCPNuoLPupzD2GSJqzXN9LU6FS0cv1jDWMF3FeOlGo6YCmBEpDsAIyqX7wmIYsPxqQqpwCEKNeMT1/hIwWVk5Dw6ijBWWNsXsGFFwNmpMlcXNKHAkckKxgquUoxOz6MWZt8EzK1CHUNg/eRHh5YlqUSGiZkKFkUsluLVMl//1AA7N+dYm3eJRYhF2Drcw+R0ifkwphIJ70yV0a2PHZ2exxVbaoXg5i/tBJANfACi2OBiMGKJRZrnVti+oZftG3p59pXzbL4jy47N/VSqDUqh4BtLpdrAtMpovFTHzo4f7ApAKaXyu57esnUoB4C2wrr+AG00sbj05VMceLfIg3cXADh1ocSpCyVOTJYI0gHFhiXpaAYyLimvWY6jU/OEf3rucDuAdiHwVO/AQ4XWImlE2DSUQTXqeCmf3lX9HDlX5PR0GSOCjiKGHryHY+eLmKE1FPGZL5ZZP5jGUxDGFtdRAGHXAFYobF2dQ1vBWGHTmhxZ22CwkMRNJehZewdHL1Z558I8URRxrqZIPnQ/Y3UH25NCF4t8bGMf6YTH+FwNN6qeoU0FdASgJ7+jP50gMgZjhHTC4xMb+0lcmWbVMo9UT4Jg9SA624vRmrIbcKziki+kCP/5JusHUuQzCbKBx2tnZ3HFLtCmAjp7AJXbsjrHXF2jW1k+UEhz73CWdPEyhXqJrIRoBVprbOCTygRcsR7qkS8wcvIirx6aBJoJqGrltzsBtKsC17r+YF86oBEbrBVEQb1WpbFQJFUvU68oRFyqWFYFC0y9+ALZ1uR66zjy76NMbullfK6KzE2P0ib+7wFQSqn8l749HAkM5ZK8dWkeEBCF5/pksjl8P+DGxuybX36gdSWINNdZQZFLJ8jlcvzt7Al6Yn2tKwBAWUhe/6E6Cny/WUoJP0mmJwnkb5nRZDQiRLEltoIVYTCTJJ3twXMcSnufGaVTCJRSweDPXgtr2pB+6i+EVtCxQX33z2Clu8ZDKYLA5V/f+DiRaTYvuaTP+FwVT0kIRB0BgHRDm2j+Jw8HXUh1tEd/9xanZxYZzqcwVuhL++w9fhmnWhoB4nYleB3AY7E48vzhqU/v3LSSemyxH6D5UwoC12HXtjX84sB5fvS5u+hLB3iOw94Tl7DvjvyGpgfamgeEi3/46Q+fLKw4kEy4bB7IYgW63QEoFI6CTSszPH7vIOVazODyFE+8fJLjZ8b2L7z6qwNAYymAur54dqJ6+O/f363tntiKa4GudyCq1f0qcG5MmMtn/jj/6289TbP30x2niwhKqRQwCKwEUl1KL2URMAdcAcoi0rYEbwRwgERL/H23a12YpbkmNUSkbfbfBHA77bbvjv8D4g7BB/8NFSYAAAAASUVORK5CYII%3D';
            var img = Create('img');
            img.src = updateIcon;
            $(img).hover(function () { displayMSG('<font style="text-shadow: 2px 2px 3px white; font-weight: bold;">' + SubLanguage(LanguagePack(), 24) + ' TravianProgram - Travian4 Plus Eklentisi</font>'); }, function () { sHide(); });
            img.addEventListener('click', update, true);
            img.setAttribute('style', 'cursor: pointer;');
            ID('t4tools').appendChild(img);
        };
        var trans = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2wMEBBIvqMNOnQAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAAAGklEQVQYlWN89unTfgYCgImQglFFDAwMDAwAndcDm9V2mYsAAAAASUVORK5CYII%3D';
        var pos; if (RTL == 'rtl') { pos = 'right'; } else { pos = 'left'; };
        var div = Create('div');
        div.setAttribute('id', "t4tools");
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

        function VillageMap() {
            var z = getPosition('TBL_D1_RES', '600px_150px');
            x = z.split('_')[1];
            y = z.split('_')[0];
            var Div = Create('div', { style: 'position: absolute; top: ' + y + '; left: ' + x + ';', id: 'TBL_D1_RES' });
            Div.align = 'center';
            var drgDIV = Create('div', { class: 'RES_drag' });
            drgDIV.innerHTML = '&nbsp;';
            MakeDrag(drgDIV, Div);
            var TBL = Create('table', { cellspacing: '2', class: 'front_res_table' });
            var TR = Create('tr');
            var TD = Create('td', { style: 'background-color:transparent;' });
            var border = ['border-top: 1px solid black;', 'border-left: 1px solid black;', 'border-right: 1px solid black;']
            for (i = 0; i < 4; i++) {
                var Table = Create('table', { cellspacing: '2' });
                Table.innerHTML = '<thead><tr><td class="res_header" style="' + border[0] + (i == 0 ? border[1] : '') + (i == 3 ? border[2] : '') + '"><img src="img/x.gif" class="r' + (i + 1) + '" /></td></tr></thead><tbody id="t4p_' + (i + 1) + '"></tbody>';
                TD.appendChild(Table);
            };

            TBL.appendChild(TD);
            TBL.appendChild(TR);
            Div.appendChild(drgDIV);
            Div.appendChild(TBL);
            document.body.appendChild(Div);
            fieldsOfVillage = {
                'f1': [3, 3, 0, 3, 3, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //9 crop
                'f2': [2, 3, 0, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //3-4-5-6
                'f3': [0, 3, 0, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //4-4-4-6
                'f4': [0, 3, 0, 1, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //4-5-3-6
                'f5': [0, 3, 0, 2, 0, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //5-3-4-6
                'f6': [3, 3, 0, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3], //15 crop
                'f7': [0, 3, 3, 0, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //4-4-3-7
                'f8': [2, 3, 3, 0, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //3-4-4-7
                'f9': [2, 3, 3, 0, 0, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //4-3-4-7
                'f10': [2, 3, 0, 1, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //3-5-4-6
                'f11': [2, 0, 0, 2, 0, 3, 3, 2, 2, 1, 1, 2, 0, 3, 3, 1, 3, 3], //4-3-5-6
                'f12': [0, 3, 0, 0, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1]  //5-4-3-6
            };
            var imgc = [];
            imgc['1'] = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABkCAYAAADOtM0JAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhDQTg5QzY5QjBFOTExRTA4RkFEQUUwNkI3RUU3RTM4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhDQTg5QzZBQjBFOTExRTA4RkFEQUUwNkI3RUU3RTM4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OENBODlDNjdCMEU5MTFFMDhGQURBRTA2QjdFRTdFMzgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OENBODlDNjhCMEU5MTFFMDhGQURBRTA2QjdFRTdFMzgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5cQGkwAAAx90lEQVR42uy9eZxcZ3nn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%3D';
            imgc['2'] = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABkCAYAAADOtM0JAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdDMDY3NDg1QjBFOTExRTBBMEUzRjk5RUZFOUQ5OTQyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdDMDY3NDg2QjBFOTExRTBBMEUzRjk5RUZFOUQ5OTQyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0MwNjc0ODNCMEU5MTFFMEEwRTNGOTlFRkU5RDk5NDIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N0MwNjc0ODRCMEU5MTFFMEEwRTNGOTlFRkU5RDk5NDIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5R4djlAAAfm0lEQVR42ux7CZBlZ3nd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';
            imgc['3'] = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABkCAYAAADOtM0JAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVBMURBMjdCQjBFOTExRTA5MEIwRDQ1RDUwREE0NkYwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVBMURBMjdDQjBFOTExRTA5MEIwRDQ1RDUwREE0NkYwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NUExREEyNzlCMEU5MTFFMDkwQjBENDVENTBEQTQ2RjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NUExREEyN0FCMEU5MTFFMDkwQjBENDVENTBEQTQ2RjAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7cnmTYAAAsu0lEQVR42ux9B3Rc5Z3v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';
            imgc['4'] = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABkCAYAAADOtM0JAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkEyMEY3ODREQjBFOTExRTBCMjJDODkxNUEwQ0VCRDdCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkEyMEY3ODRFQjBFOTExRTBCMjJDODkxNUEwQ0VCRDdCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTIwRjc4NEJCMEU5MTFFMEIyMkM4OTE1QTBDRUJEN0IiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTIwRjc4NENCMEU5MTFFMEIyMkM4OTE1QTBDRUJEN0IiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz69btSyAAAcNUlEQVR42uxceXAb13n/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';
            var gid, TypeName, ImageClass, Level, Name, typeOfVillage = ID('village_map').getAttribute('class');
            for (i = 0; i < 18; i++) {
                gid = fieldsOfVillage[typeOfVillage][i] + 1;
                TypeName = gid;
                ImageClass = '';
                Level = ID('rx').getElementsByTagName('area')[i].alt.match(/\d+/);
                Name = xpath('//map[@id="rx"]/area').snapshotItem(i).getAttribute('alt');

                var Color = [];
                var TypeU;
                var CountTime = [];
                var img = [];
                var available = '';
                if (bCost[TypeName][Level]) {
                    if (bCost[TypeName][C(Level) + 1]) {
                        var wood = C(C(ID('l1').innerHTML) - C(bCost[TypeName][C(Level) + 1][0]));
                        var clay = C(C(ID('l2').innerHTML) - C(bCost[TypeName][C(Level) + 1][1]));
                        var iron = C(C(ID('l3').innerHTML) - C(bCost[TypeName][C(Level) + 1][2]));
                        var crop = C(C(ID('l4').innerHTML) - C(bCost[TypeName][C(Level) + 1][3]));

                        var NPC = C(C(crop) + C(iron) + C(clay) + C(wood));
                        var NPC_href = '<a href="build.php?t=3&gid=17&r1=' +
            C(bCost[TypeName][C(Level) + 1][0]) + '&r2=' +
            C(bCost[TypeName][C(Level) + 1][1]) + '&r3=' +
            C(bCost[TypeName][C(Level) + 1][2]) + '&r4=' +
            C(bCost[TypeName][C(Level) + 1][3]) + '"><img src="img/x.gif" class="npc" /></a>';

                        if (NPC > 0) { Color[5] = 'travian_NPC'; } else { Color[5] = 'red'; };

                        for (b = 0; b < 4; b++) { img[(b + 1)] = '<img src="img/x.gif" class="r' + (b + 1) + '" />'; Color[(b + 1)] = 'darkgreen'; };
                        if (wood < 0) { Color[1] = 'gray'; CountTime[1] = '<font style="font-size: 11px" class="xbTime">' + Time(wood, pro[0]) + '</font><br>'; } else { wood = '+' + wood + '<br>'; CountTime[1] = ''; };
                        if (clay < 0) { Color[2] = 'gray'; CountTime[2] = '<font style="font-size: 11px" class="xbTime">' + Time(clay, pro[1]) + '</font><br>'; } else { clay = '+' + clay + '<br>'; CountTime[2] = ''; };
                        if (iron < 0) { Color[3] = 'gray'; CountTime[3] = '<font style="font-size: 11px" class="xbTime">' + Time(iron, pro[2]) + '</font><br>'; } else { iron = '+' + iron + '<br>'; CountTime[3] = ''; };
                        if (crop < 0) { Color[4] = 'gray'; CountTime[4] = '<font style="font-size: 11px" class="xbTime">' + Time(crop, pro[3]) + '</font><br>'; } else { crop = '+' + crop + '<br>'; CountTime[4] = ''; };

                        var xCrop = C(C(bCost[TypeName][Level][5])) + ' -->' + C(C(bCost[TypeName][C(Level) + 1][5])) + ' =[+' + C(C(bCost[TypeName][C(Level) + 1][5]) - C(bCost[TypeName][Level][5])) + ']';
                        var pnx = C(C(bCost[TypeName][Level][4])) + ' -->' + C(C(bCost[TypeName][C(Level) + 1][4]))
                        var X = '<tr>' +
            '<td class="bList" id="T4x_B' + TypeName + '' + Level + '"><center><a href="build.php?gid=' + TypeName + '">' + Name + '</a></center><br>' +
            '<a href="build.php?gid=' + TypeName + '"><img src="' + imgc[TypeName] + '" title="' + Name + '" style="float: ' + (RTL == "rtl" ? "left" : "right") + ';" /></a>' +
            '<span style="float: left;">' +
            '' + img[1] + ' <font color="' + Color[1] + '" style="font-size: 11.5px">' + wood + '</font> ' + CountTime[1] + ' ' +
            '' + img[2] + ' <font color="' + Color[2] + '" style="font-size: 11.5px">' + clay + '</font> ' + CountTime[2] + ' ' +
            '' + img[3] + ' <font color="' + Color[3] + '" style="font-size: 11.5px">' + iron + '</font> ' + CountTime[3] + ' ' +
            '' + img[4] + ' <font color="' + Color[4] + '" style="font-size: 11.5px">' + crop + '</font> ' + CountTime[4] + ' ' +
            '' + available +
            '<hr style="margin: 5px;">' +
            '' + NPC_href + '--><font color="' + Color[5] + '" style="font-size: 11.5px">' + NPC + '</font><br>' +
            '<img src="img/x.gif" class="r5" /> <font style="font-size: 11px" color="red">' + xCrop + '</font><br>' +
            '<img alt="itemCategory itemCategory_artWork" class="itemCategory itemCategory_artWork" src="img/x.gif"> <font style="font-size: 11px" color="blue">' + pnx + '</font>' +
            '</span>' +
            '</td></tr>';
                    } else {
                        var X = '';
                    };
                    if (!ID('T4x_B' + TypeName + '' + Level + '')) {
                        ID('t4p_' + TypeName + '').innerHTML += X;
                    };
                }
            }
        };
        //Dream1
        function $xf(xpath, xpt, startnode, aDoc) {
            var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
            var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
            var XPIterate = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
            var XPResult = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
            if (!aDoc) aDoc = document;
            if (!startnode) startnode = document;
            var xpres = XPFirst;
            switch (xpt) {
                case 'i': xpres = XPIterator; break;
                case 'l': xpres = XPList; break;
                case 'r': xpres = XPResult; break;
            };
            var ret = aDoc.evaluate(xpath, startnode, null, xpres, null);
            return (xpres == XPFirst ? ret.singleNodeValue : ret);
        };
        function $at(aElem, att) { if (att !== undefined) { for (var xi = 0; xi < att.length; xi++) { aElem.setAttribute(att[xi][0], att[xi][1]); if (att[xi][0].toUpperCase() == 'TITLE') aElem.setAttribute('alt', att[xi][1]); }; }; }; //Acr111-addAttributes
        function $a(iHTML, att) { return $ee('A', iHTML, att); }
        function $ee(nElem, oElem, att) { var Elem = document.createElement(nElem); if (oElem !== undefined) if (typeof (oElem) == 'object') Elem.appendChild(oElem); else Elem.innerHTML = oElem; $at(Elem, att); return Elem; };
        var khtmlFL = /khtml/i.test(navigator.appVersion);
        function centerNumber() {
            //return;
            var dorf = 0;

            fieldsOfVillage = {
                'f1': [3, 3, 0, 3, 3, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //9 crop
                'f2': [2, 3, 0, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //3-4-5-6
                'f3': [0, 3, 0, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //4-4-4-6
                'f4': [0, 3, 0, 1, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //4-5-3-6
                'f5': [0, 3, 0, 2, 0, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //5-3-4-6
                'f6': [3, 3, 0, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3], //15 crop
                'f7': [0, 3, 3, 0, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //4-4-3-7
                'f8': [2, 3, 3, 0, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //3-4-4-7
                'f9': [2, 3, 3, 0, 0, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //4-3-4-7
                'f10': [2, 3, 0, 1, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //3-5-4-6
                'f11': [2, 0, 0, 2, 0, 3, 3, 2, 2, 1, 1, 2, 0, 3, 3, 1, 3, 3], //4-3-5-6
                'f12': [0, 3, 0, 0, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1]  //5-4-3-6
            };
            //		'f99':	'Natarian village',
            // ›› Main.
            function TM_ShowMainBuildingNumbers() {
                var gid;
                var imgId, countArray, dx, dy, checkWW;
                var top = 0;
                var left = 0;
                var mapOffset = 1;
                // ›› Map1 holds building names, level and building spot IDs in area elements (2 are duplicate walls to be ignored).
                var map1Element;
                // active buildings
                var bldText = $xf('//script[contains(text(),"bld=")]');
                var bldArr = new Array(41);
                if (bldText) {
                    eval(bldText.innerHTML);
                    for (var i = 0; i < bld.length; i++) bldArr[bld[i]['aid']] = bld[i]['stufe'];
                }
                var mapInfo = ID('clickareas') || ID('map2');
                if (mapInfo) {
                    map1Element = mapInfo;
                    countArray = 22;
                    top = 12;
                    left = -45;
                    dtop = 10;
                    dleft = 50;
                    dorf = 2;
                    mapOffset = 19;
                }
                var mapInfo = ID('rx');
                if (mapInfo) {
                    map1Element = mapInfo;
                    countArray = 18;
                    dtop = 56;
                    top = 25;
                    left = 0;
                    left = 190;
                    dleft = 0;
                    dorf = 1;
                }
                if (!(map1Element)) return;
                var areaElements = TAG('area', map1Element);
                var container = ID('village_map');
                var imageElements = TAG('img', container);
                var BuildingLevel, smallDIV, coords;
                var BuildingURL = new Array(21);

                for (var i = 0; i < countArray; i++) {
                    BuildingLevel = /\d+/.exec(areaElements[i].alt);
                    if (!BuildingLevel) BuildingLevel = /\d+/.exec(areaElements[i].title);
                    if (!BuildingLevel) continue;

                    BuildingURL = areaElements[i].href;
                    coords = areaElements[i].coords.split(',');

                    if (dorf == 2) {
                        imgId = i;

                        switch (imgId) {
                            case 21:
                                gid = parseInt(/\d+/.exec(imageElements[imgId].getAttribute('class'))[0]);
                                break;
                            case 22:
                                gid = 0;
                                break;
                            case 8:
                                if (checkWW != null) {
                                    gid = 40;
                                } else {
                                    gid = parseInt(/\d+/.exec(imageElements[imgId].getAttribute('class'))[0]);
                                }
                                break;
                            default:
                                gid = parseInt(/\d+/.exec(imageElements[imgId].getAttribute('class'))[0]);
                        }
                        smallDIV = addDiv('TMbuildingtag' + i, 'TMbuildingtags', BuildingLevel[0], 'village_map', BuildingURL);
                        smallDIV.style.left = parseInt(coords[0]) + left - (RTL == 'ltr' ? -67 : 0) + 'px';
                    }
                    if (dorf == 1) {
                        var typeOfVillage = ID('village_map').getAttribute('class');
                        gid = fieldsOfVillage[typeOfVillage][i] + 1;
                        smallDIV = addDiv('TMbuildingtag' + i, 'TMbuildingtags', BuildingLevel[0], 'rx', BuildingURL);
                        smallDIV.style.left = parseInt(coords[0]) + left - (RTL == 'ltr' ? 200 : 0) + 'px';


                    }

                    smallDIV.style.top = parseInt(coords[1]) + top + 'px';
                    smallDIV.style.visibility = "visible";
                    if (bldArr[i + mapOffset]) {
                        if (khtmlFL) {
                            var y = 0;
                            setInterval(function (x) {
                                return function () {
                                    if (y > 0) { x.style.color = 'white'; y = 0; } else { x.style.color = 'black'; y = 1; }
                                }
                            } (smallDIV), 1000);
                        } else smallDIV.style.textDecoration = 'blink';
                        BuildingLevel[0] = bldArr[i + mapOffset];
                    }
                    try {
                        var resneed = bCost[gid][parseInt(BuildingLevel[0]) + 1];

                    } catch (err) {
                        //			alert( gid +' /// '+ BuildingLevel +' /// '+ getMaxLevel(gid));
                        continue;
                    }

                    //	color
                    if ((GM_getValue("setting2[2]") == ('null' || null)) || !GM_getValue("setting2[2]")) {
                        GM_setValue('setting2[2]', '#A0F0A0');
                    }
                    if ((GM_getValue("setting2[3]") == ('null' || null)) || !GM_getValue("setting2[3]")) {
                        GM_setValue('setting2[3]', '#FFB8F0');
                    }
                    if ((GM_getValue("setting2[1]") == ('null' || null)) || !GM_getValue("setting2[1]")) {
                        GM_setValue('setting2[1]', '#F8FFC8');
                    }
                    if ((GM_getValue("setting2[4]") == ('null' || null)) || !GM_getValue("setting2[4]")) {
                        GM_setValue('setting2[4]', '#FFC84B');
                    }
                    if ((GM_getValue("setting2[5]") == ('null' || null)) || !GM_getValue("setting2[5]")) {
                        GM_setValue('setting2[5]', '#FF8888');
                    }

                    var rWood = document.getElementById('l1').firstChild.nodeValue.split('/');
                    var rClay = document.getElementById('l2').firstChild.nodeValue.split('/');
                    var rIron = document.getElementById('l3').firstChild.nodeValue.split('/');
                    var rCrop = document.getElementById('l4').firstChild.nodeValue.split('/');
                    var reswood = parseInt(rWood[0]);
                    var resclay = parseInt(rClay[0]);
                    var resiron = parseInt(rIron[0]);
                    var rescrop = parseInt(rCrop[0]);
                    var capWood = parseInt(rWood[1]);
                    var capCrop = parseInt(rCrop[1]);

                    if (parseInt(BuildingLevel[0]) == getMaxLevel(gid)) {
                        smallDIV.style.backgroundColor = GM_getValue('setting2[2]');
                    } else if (resneed[0] > capWood || resneed[1] > capWood || resneed[2] > capWood || resneed[3] > capCrop) {
                        smallDIV.style.backgroundColor = GM_getValue('setting2[3]');
                    } else if ((reswood + resclay + resiron + rescrop) >= (resneed[0] + resneed[1] + resneed[2] + resneed[3])) {
                        if (reswood >= resneed[0] && resclay >= resneed[1] && resiron >= resneed[2] && rescrop >= resneed[3]) {
                            smallDIV.style.backgroundColor = GM_getValue('setting2[1]');
                        } else {
                            smallDIV.style.backgroundColor = GM_getValue('setting2[4]');
                        }
                    } else if (parseInt(resneed[0]) > reswood ||
			parseInt(resneed[1]) > resclay ||
			parseInt(resneed[2]) > resiron ||
			parseInt(resneed[3]) > rescrop) {
                        smallDIV.style.backgroundColor = GM_getValue('setting2[5]');
                    }
                }
            }

            // ›› Adds a generic div.
            function addDiv(id, style, html, parent, url) {
                var div = $ee('div', html, [['id', id], ['class', style]]);
                var a = $a(div, [['href', url], ['class', 'tm_uplevel']]);
                ID(parent).appendChild(a);
                return div;
            }
            function getMaxLevel(gid) {
                var m1 = xpath('//div[@id="villageList"]/div[2]/ul/li[@class="entry active"]/a').snapshotItem(0).innerHTML;
                var maxLevel;
                switch (gid) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        if (GM_getValue("mainVillage") == m1) {
                            maxLevel = 25;
                        } else {
                            maxLevel = 10;
                        };
                        break;
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                        maxLevel = 5;
                        break;
                    case 23:
                        maxLevel = 10;
                        break;
                    case 40:
                        maxLevel = 100;
                        break;
                    default:
                        maxLevel = 20;
                }
                return (maxLevel)
            }

            TM_ShowMainBuildingNumbers();
        }
        //------Dream1


        function xtr(type, value) {
            //0-att 1-def1 2-def2 3-lumber 4-clay 5-iron 6-crop 7-food 8-speed 9-load
            unit = [];
            unit[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];   // hero
            unit[1] = [40, 35, 50, 120, 100, 180, 40, 1, 6, 40];    // Legionnaire
            unit[2] = [30, 65, 35, 100, 130, 160, 70, 1, 5, 20];    // Praetorian
            unit[3] = [70, 40, 25, 150, 160, 210, 80, 1, 7, 50];    // Imperian
            unit[4] = [0, 20, 10, 140, 160, 20, 40, 2, 16, 0];  // Equites Legati
            unit[5] = [120, 65, 50, 550, 440, 320, 100, 3, 14, 100];    // Equites Imperatoris
            unit[6] = [180, 80, 105, 550, 640, 800, 180, 4, 10, 70];    // Equites Caesaris
            unit[7] = [60, 30, 75, 900, 360, 500, 70, 3, 4, 0]; // Battering Ram
            unit[8] = [75, 60, 10, 950, 1350, 600, 90, 6, 3, 0];    // Fire catapult
            unit[9] = [50, 40, 30, 30750, 27200, 45000, 37500, 4, 4, 0];    // Senator
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

            var str = "<table cellspacing='0' style='width: auto;' class='xt4Style'><thead><tr><td colspan='3'><img src='img/x.gif' class='unit u" + access + "'><span> " + CLASS('unit u' + access)[0].alt + "</span>:</td></thead>";
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
            $("#T4_mHelp").fadeIn(333);
        };
        function pTime(sec, oType, tr) {
            if (oType == 'sec') {
                if (!tr) {
                    var dd = sec.split(':')[0];
                    var hh = sec.split(':')[1].split(':')[0];
                    var mm = sec.split(':')[2].split(':')[0];
                    var ss = sec.split(':')[3];
                    if (!dd == ('0' || '00' || 0 || 00)) { if (dd > 0) dd = C(dd * 86400); else { dd = 0; }; } else { dd = 0; };
                    if (!hh == ('0' || '00' || 0 || 00)) { if (hh > 0) hh = C(hh * 3600); else { hh = 0; }; } else { hh = 0; };
                    if (!mm == ('0' || '00' || 0 || 00)) { if (mm > 0) mm = C(mm * 60); else { mm = 0; }; } else { mm = 0; };
                    if (!ss == ('0' || '00' || 0 || 00)) { if (ss > 0) ss = C(ss % 60); else { ss = 0; }; } else { ss = 0; };
                    return C(C(dd) + C(hh) + C(mm) + C(ss));
                } else {
                    var hh = sec.split(':')[0];
                    var mm = sec.split(':')[1].split(':')[0];
                    var ss = sec.split(':')[2];
                    if (!hh == ('0' || '00' || 0 || 00)) { if (hh > 0) hh = C(hh * 3600); else { hh = 0; }; } else { hh = 0; };
                    if (!mm == ('0' || '00' || 0 || 00)) { if (mm > 0) mm = C(mm * 60); else { mm = 0; }; } else { mm = 0; };
                    if (!ss == ('0' || '00' || 0 || 00)) { if (ss > 0) ss = C(ss % 60); else { ss = 0; }; } else { ss = 0; };
                    return C(C(hh) + C(mm) + C(ss));
                }
            } else if (oType == 'time') {
                if (!tr) {
                    var DD, HH, MM, SS;
                    DD = Math.round(sec / 86400);
                    HH = Math.round(sec / 3600);
                    MM = Math.floor(sec / 60) % 60;
                    SS = Math.floor(sec) % 60;
                    if (HH < 10) HH = '0' + HH;
                    if (MM < 10) MM = '0' + MM;
                    if (SS < 10) SS = '0' + SS;
                    return ("" + DD + ":" + HH + ":" + MM + ":" + SS);
                } else {
                    var HH, MM, SS;
                    HH = Math.round(sec / 3600);
                    MM = Math.floor(sec / 60) % 60;
                    SS = Math.floor(sec) % 60;
                    if (HH < 10) HH = '0' + HH;
                    if (MM < 10) MM = '0' + MM;
                    if (SS < 10) SS = '0' + SS;
                    return ("" + HH + ":" + MM + ":" + SS);
                };

            };
        };
        function cultureCalc() {
            var blevel = CLASS('level', TAG('h1', ID('content'))[0]);
            if (blevel.length == 0 || !CLASS('r5')[1] || exp(/build.php\?\b[^>]*s=1/)) return;
            blevel = parseInt(blevel[0].textContent.match(/\d+/)[0]);
            var bid = parseInt(ID('build').getAttribute('class').match(/\d+/)[0]);
            var getA = C(bCost[bid][blevel + 1][5] - bCost[bid][blevel][5]);
            var getB = C(bCost[bid][blevel + 1][4] - bCost[bid][blevel][4]);
            var tA = CLASS('r5')[1].alt;
            var contr = ID('contract');
            var tbl = Create('table', { style: 'width: auto;', cellspacing: '0', class: 'tblInfo' });
            tbl.innerHTML = '<tbody>' +
        '<tr><td><img src="img/x.gif" class="r5" /></td><td>' + SubLanguage(LanguagePack(), 21) + '</td><td>' + bCost[bid][blevel][5] + '</td><td>' + SubLanguage(LanguagePack(), 22) + '</td><td>' + bCost[bid][blevel + 1][5] + '</td><td>' + (getA == 0 ? '' : ' = +' + getA) + '</td><td> | </td>' +
        '<td><img src="img/x.gif" class="itemCategory itemCategory_artWork" /></td><td>' + SubLanguage(LanguagePack(), 21) + '</td><td>' + bCost[bid][blevel][4] + '</td><td>' + SubLanguage(LanguagePack(), 22) + '</td><td>' + bCost[bid][blevel + 1][4] + '</td><td>' + (getB == 0 ? '' : ' = +' + getB) + '</td></tr>' +
        '</tbody>';
            var cl = CLASS('clear', contr);
            $(tbl).insertBefore('div.contractLink');
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

            return (d + ":" + hh + ":" + mm + ":" + ss);

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
            ID('T4_mHelp').style.display = 'block';
            if (ID(id).innerHTML == '') {
                $.get(url, function (data) {
                    var xHTML = $(data);
                    if (xHTML.find('#troop_info .ico:eq(0)').html()) {
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
                        var GetLength = xHTML.find('#troop_info .ico').length;
                        for (xx = 0; xx < GetLength; xx++) {
                            GetAnimIMG[xx] = xHTML.find('#troop_info .ico:eq(' + xx + ')').html();
                            GetAnimNum[xx] = xHTML.find('#troop_info .val:eq(' + xx + ')').html();
                            GetAnimNam[xx] = xHTML.find('#troop_info .desc:eq(' + xx + ')').html();
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
                    } else {
                        FindNext(ID(id)).innerHTML = xHTML.find('#troop_info').html();
                        ID(id).innerHTML = xHTML.find('#troop_info').html();
                        ID('T4_mHelp').innerHTML = '<table cellspacing="0">' + xHTML.find('#troop_info').html() + '<table>';
                    };
                });
            } else {
                var dHTML = FindNext(ID(id)).innerHTML;
                ID('T4_mHelp').innerHTML = dHTML;
            };
        };

        function htmltocontext(source) {
            if (TAG("req")[0]) TAG("req")[0].parentNode.removeChild(TAG("req")[0]);
            html = document.createElement('req');
            html.setAttribute('style', 'display: none;');
            html.innerHTML = source;
            if (TAG('req')[0]) { xli = TAG('req')[0]; xli.parentNode.removeChild(xli); };
            return document.body.parentNode.appendChild(html);
        };
        function ResColor() {
            if (xpath('//table[@id="production"]').snapshotItem(0)) {
                var k = [], t = [], i, mx, mn;
                for (i = 0; i < 4; i++) { k[i] = xpath('//table[@id="production"]/tbody/tr[' + (i + 1) + ']/td[3]').snapshotItem(0); t[i] = k[i].textContent; };
                mn = Math.min(t[0], t[1], t[2], t[3]);
                mx = Math.max(t[0], t[1], t[2], t[3]);
                for (i = 0; i < 4; i++) {
                    if (t[i] == mn) { k[i].style.color = 'red'; };
                    if (t[i] == mx) { k[i].style.color = 'green'; };
                };
            };
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
            var sSpeed = C(GM_getValue('MySpeed'));

            function uxSpeed(numA, numB) {
                var aA = format(Math.round(((Distance(xyA, xyB)) / (xtr((numA), 8)) * 3600) / 2)); var aC = bEndTime(formatUp(Math.round(((Distance(xyA, xyB)) / (xtr((numA), 8)) * 3600) / 2)));
                var aB = format(Math.round(((Distance(xyA, xyB)) / (xtr((numB), 8)) * 3600) / 2)); var aD = bEndTime(formatUp(Math.round(((Distance(xyA, xyB)) / (xtr((numB), 8)) * 3600) / 2)));

                var bA = format(Math.round(((Distance(xyA, xyB)) / (xtr((numA), 8)) * 3600) / sSpeed)); var bC = bEndTime(formatUp(Math.round(((Distance(xyA, xyB)) / (xtr((numA), 8)) * 3600) / sSpeed)));
                var bB = format(Math.round(((Distance(xyA, xyB)) / (xtr((numB), 8)) * 3600) / sSpeed)); var bD = bEndTime(formatUp(Math.round(((Distance(xyA, xyB)) / (xtr((numB), 8)) * 3600) / sSpeed)));


                if ((sSpeed == (1 || '1' || null || 'undefined' || NaN || 'NaN' || 'isNaN')) || isNaN(sSpeed)) {
                    return '<td><img src="img/x.gif" class="unit u' + numA + '" /></td><td>' + aA + '<div style="font-size:10px; text-align: center;">(<span class="endtime">' + aC + '</span>)</div></td>' +
               '<td><img src="img/x.gif" class="unit u' + numB + '" /></td><td>' + aB + '<div style="font-size:10px; text-align: center;">(<span class="endtime">' + aD + '</span>)</div></td>';
                } else if (sSpeed == ('2' || 2 || '3' || 3)) {
                    return '<td><img src="img/x.gif" class="unit u' + numA + '" /></td><td>' + bA + '<div style="font-size:10px; text-align: center;">(<span class="endtime">' + bC + '</span>)</div></td>' +
               '<td><img src="img/x.gif" class="unit u' + numB + '" /></td><td>' + bB + '<div style="font-size:10px; text-align: center;">(<span class="endtime">' + bD + '</span>)</div></td>';
                } else {
                    return '<td><img src="img/x.gif" class="unit u' + numA + '" /></td><td>' + bA + '<div style="font-size:10px; text-align: center;">(<span class="endtime">' + bC + '</span>)</div></td>' +
               '<td><img src="img/x.gif" class="unit u' + numB + '" /></td><td>' + bB + '<div style="font-size:10px; text-align: center;">(<span class="endtime">' + bD + '</span>)</div></td>';
                };
            };
            if (race.className == 'nationBig nationBig1') {
                var HTML = '<table cellspacing="0" class="t4Style">'; HTML = HTML + '<thead><tr><th colspan="2">< ' + New_Math(Distance(xyA, xyB)) + ' ></th><th style="font-weight: bold; direction: ltr;" colspan="2">(<span><span>' + getY + '</span><span>|</span><span>' + getX + '</span></span>)</th></tr></thead><tbody>';
                HTML = HTML + '<tr>' + uxSpeed(1, 2) + '</tr>';
                HTML = HTML + '<tr>' + uxSpeed(3, 4) + '</tr>';
                HTML = HTML + '<tr>' + uxSpeed(5, 6) + '</tr>';
                HTML = HTML + '<tr>' + uxSpeed(7, 8) + '</tr>';
                HTML = HTML + '<tr>' + uxSpeed(9, 10) + '</tr>';
                HTML = HTML + '</tbody></table>';
            };
            if (race.className == 'nationBig nationBig2') {
                var HTML = '<table cellspacing="0" class="t4Style">'; HTML = HTML + '<thead><tr><th colspan="2">< ' + New_Math(Distance(xyA, xyB)) + ' ></th><th style="font-weight: bold; direction: ltr;" colspan="2">(<span><span>' + getY + '</span><span>|</span><span>' + getX + '</span></span>)</th></tr></thead><tbody>';
                HTML = HTML + '<tr>' + uxSpeed(11, 12) + '</tr>';
                HTML = HTML + '<tr>' + uxSpeed(13, 14) + '</tr>';
                HTML = HTML + '<tr>' + uxSpeed(15, 16) + '</tr>';
                HTML = HTML + '<tr>' + uxSpeed(17, 18) + '</tr>';
                HTML = HTML + '<tr>' + uxSpeed(19, 20) + '</tr>';
                HTML = HTML + '</tbody></table>';
            };
            if (race.className == 'nationBig nationBig3') {
                var HTML = '<table cellspacing="0" class="t4Style">'; HTML = HTML + '<thead><tr><th colspan="2">< ' + New_Math(Distance(xyA, xyB)) + ' ></th><th style="font-weight: bold; direction: ltr;" colspan="2">(<span><span>' + getY + '</span><span>|</span><span>' + getX + '</span></span>)</th></tr></thead><tbody>';
                HTML = HTML + '<tr>' + uxSpeed(21, 22) + '</tr>';
                HTML = HTML + '<tr>' + uxSpeed(23, 24) + '</tr>';
                HTML = HTML + '<tr>' + uxSpeed(25, 26) + '</tr>';
                HTML = HTML + '<tr>' + uxSpeed(27, 28) + '</tr>';
                HTML = HTML + '<tr>' + uxSpeed(29, 30) + '</tr>';
                HTML = HTML + '</tbody></table>';
            };
            return HTML;
        };

        function gTimeD(xyA, xyB, type) {
            if (!type) {
                ID("T4_mHelp").innerHTML = getXtime(xyA, xyB);
                ID("T4_mHelp").style.display = "block";
            } else if (type) {
                if (ID('TrDis')) { $('#TrDis').html($('' + getXtime(xyA, xyB) + '')); } else {
                    $('<div id="TrDis">' + getXtime(xyA, xyB) + '</div>').insertAfter($('#btn_ok'));
                }
            };
        };
        function XPS_Cul(num) {
            num = C(num);
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
                ID('x_7').innerHTML = C(C(pTime(ID('x_7').innerHTML, 'sec', 'tr')) + C(pTime(xpath('//span[@id="' + (x + 1) + 'R6"]').snapshotItem(0).innerHTML, 'sec', 'tr')));
                ID('x_7').innerHTML = pTime(C(ID('x_7').innerHTML), 'time', 'tr');
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
            if (r[6].getElementsByTagName('span')[0]) { r[6] = r[6].getElementsByTagName('span')[0].innerHTML; } else { r[6] = r[6].innerHTML.split(/<img\b[^>]*>/)[1]; };
            if (v == '') { v = '0' };
            c[0] = C(r[0] * v);
            c[1] = C(r[1] * v);
            c[2] = C(r[2] * v);
            c[3] = C(r[3] * v);
            c[4] = C(C(pTime(r[6], 'sec', 'tr')) * C(v));
            c[5] = pTime(c[4], 'time', 'tr');
            c[6] = C(r[4] * v);
            c[9] = C(C(r[9]) + C(v));
            if (isNaN(c[9])) { c[9] = '0'; };
            for (i = 0; i < 4; i++) {
                d[i] = C(C(ID('l' + (i + 1)).innerHTML.split('/')[0]) - C(c[i]));

                if (d[i] > 0) { d[i] = '+' + d[i]; cx[i] = 'style="color: green;"'; } else { cx[i] = 'style="color: red;"'; };
            };
            if (ID('xPS[' + num + ']')) { ID('xPS[' + num + ']').parentNode.removeChild(ID('xPS[' + num + ']')); };
            dx = CLASS('details')[num].getElementsByClassName('tit')[0];
            dx.innerHTML = dx.innerHTML.replace('' + dx.getElementsByTagName('span')[0].innerHTML.split(/\d+/)[1], '');
            dx.innerHTML += '<span id="xPS[' + num + ']"> + ' + v + ' = ' + c[9] + ')</span>';
            ID('XP1_' + num).innerHTML = c[0] + '<br><span ' + cx[0] + '>' + d[0] + '';
            ID('XP2_' + num).innerHTML = c[1] + '<br><span ' + cx[1] + '>' + d[1] + '';
            ID('XP3_' + num).innerHTML = c[2] + '<br><span ' + cx[2] + '>' + d[2] + '';
            ID('XP4_' + num).innerHTML = c[3] + '<br><span ' + cx[3] + '>' + d[3] + '';
            ID('XP6_' + num).innerHTML = c[6];
            ID('XP5_' + num).innerHTML = c[5];
            XPS_Cul('' + num + '');
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
            if (!ID('xblock')) return NotePadPlus();
        };
        function GM_getValue(c_name, def) {
            if (window.localStorage) {
                var e = window.localStorage.getItem(c_name);
                if (e == null) { return def; } else { return e; };
            } else {
                var i, x, y, ARRcookies = document.cookie.split(";");
                for (i = 0; i < ARRcookies.length; i++) {
                    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
                    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                    x = x.replace(/^\s+|\s+$/g, "");
                    if (x == c_name) {
                        var getValue = unescape(y);
                        if (getValue == 'null') { getValue = def; };
                        return getValue;
                    };
                }
            };
        };
        function rmv(element) {
            return element.parentNode.removeChild(element);
        };

        function DIR() {
            return RTL;
        };
        function svnIMG(num) { /*1+2 = Close Image || 3 = small note icon || 4 = Window Header*/
            if (num == 1) return 'data:image/png;base64,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%3D';
            if (num == 2) return 'data:image/png;base64,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';
            if (num == 3) return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH3AMTBCgkynMW8gAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAADkUlEQVQ4ja2UTWhcVRTH/+d9zyQzybxMbNKQNLFpQktK1dYM6ULaBrsoVIsgKogLURAF3VQXggs34s5FKdRVK+hGhSBIKUpBELRaURChWKg2lcSk8/3m3ffuu+9+uIgpVhJR8MCBC3/Oj9/hXi4ZY/B/lbNdsGd2ZgpkDTieuXXtx59b/wZG25mdff/8BVLmBE9T5ft2S+lspd3u3Ih7ye/dTmel2Wosr/628uvXX1y58Y+wIydPHb/w7rmLq/WG3Wi2EHGOZrNlom4bge/JNI3Tgu9nLFpfv3L54tuXLn3zwZZrOr7vXP72+zcHw5BKlQruVRqpVIhzSfU4xc3bdbcTRW6zE4Eq49Xdk9deAbA17InnX3hm99TUeIsLOETQMOBKIZUKOQh+qQzHCVAoDmLK1fSdZcp3RP4KKlWHBz756upziZS50obquQQMABj0hATLcwilIaRCnueYHurHD5Ye2BL25Munn5Wej1u9JCq5DikDtHiGVCoYAyS5RC/LIZTCzqIHUgqupe+YWZuH0Zm9E/OPPHZsjfGonmR6lXHUUw6pDZiQWGMpGmkGJiSSTGB2qAzOUxitg8C1vLvMFl86/fRqnMWuLayS54z2ew6kNtDGQGkDnkswIZHlCiOBhUHfw+2UwxhNnmuVADQtAJg8fOQApvZOLHfj3nKX9VpJFnRSgS4XaCUZGowjyTZAuZTYF5YBrREzBik4PJcGAMCxXc8++Na5U9cbbRE4Nrm2hX6rUlFKQ2sN9aeZ1AaAwYhvYdB3Aa0Qsxi5SOE51gZs/PijD684xVHTibRNZHzH9qb7g6Ek4zAGICIYYwACbAJmdlQhlUaBCL2YQfIYxcApA4Aze/Lxp3oDw9UoSbKEc1G0MNpNuQUYEBFo86aIMN7n456CD6UUGOfIpQQko76iv2H25esvvjZ234OHq/sPHhidnds/PDaxzyGCEBmEEFBKwmgNm4C58SqUUsi1RtaLIPMMvmMQBF4IAE7SaqwDWAKwVOzrK5w9/97V8q7pcC33rZtMoJ5tDIeQ2FkqQkgFm4B2t4s07phCsUCBzyeJyLnr0SaMpQDmKmG4q1arHa0tLBw78cChozS8Y6zPc0lKCW0AzwKa7TZWVuu/fLh0/Q2W5J8bY+S2X9BmEZE1MjIyU1tYWJyv1RbvPzT/UFgZDN85c+azTz/+6FUWxz+ZTYgx5j81iNxwaGgPAOvv2R8pNBR0ptIBpgAAAABJRU5ErkJggg%3D%3D';
            if (num == 4) return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAWCAYAAAABxvaqAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH3AMTBQ0lVEWctAAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAAATklEQVQImU3HOxJAUBAF0Z5r4zZnCV4pmVAJPJnfzIgUSddpunHIZlrmlohMRSY6r0C3B3JPdJyOPBKt247AkGTIzJCMV9J/v/SlQK01H7dDJd+mEupkAAAAAElFTkSuQmCC';
        };
        function getXQR(href) {
            if (ID('sMR')) {
                $('#sMR').stop().animate({ "opacity": "0" }, "slow");
            };
            $.get(href, function (ajax) {
                var XmR = $(ajax);
                var admin = '';
                $('#sMR').html('');

                function rDV(html) { for (i = 0; i < html.toString().split(/<div\b[^>]*>/).length; i++) { html = html.toString().replace('<div>', ''); html = html.toString().replace('<div>', ''); html = html.toString().replace('<div>', ''); html = html.toString().replace('<div>', ''); html = html.toString().replace('</div>', ''); }; return html; };
                if (href.toString().match(/nach/)) {
                    XmR = XmR.find('div#content form').html();
                } else if (href.toString().match(/berich/)) {
                    XmR = $('<table cellspacing="1">' + rDV(XmR.find('div#content form table').html()) + '</table>');
                } else {
                    XmR = $('<table cellspacing="1">' + rDV(XmR.find('div#content table').html()) + '</table>');
                };
                $(XmR).appendTo(ID('sMR'));

                ID('sMR').getElementsByTagName('table')[0].style.border = '1px solid black';
                var get_Admin = $(ajax).find('div#content div.paginator');
                if (get_Admin.html()) { get_Admin = get_Admin.html(); } else { get_Admin = ''; };
                admin = '<div class="paginator" id="_page" align="center" style="float: ' + (DIR() == "rtl" ? "left" : "right") + ';">' + get_Admin + '</div>';
                if (href.toString().match(/nach/)) {
                    for (i = 0; i < 10; i++) {
                        if ($('#sMR .paginator')) { $('#sMR .paginator').remove(); };
                        if ($('#sMR #markAll')) { $('#sMR #markAll').remove(); };
                        if ($('#sMR .administration')) { $('#sMR .administration').remove(); };
                    };
                };

                $('<tfoot><tr><td colspan="5" id="_admin" style="text-align: center; color: red;"></td></tr></tfoot>').appendTo($('div#sMR table'));
                $(admin).appendTo($('#_admin'));
                $('<div id="DRGB" style="padding: 0px 0px 3px; width: 100%; height: 22px; float: ' + (RTL == "rtl" ? "left" : "right") + ';"><img style="cursor: pointer;" id="btn_cls" src="' + svnIMG(1) + '" /></div>').insertBefore($('#sMR table'));
                $('#btn_cls').bind('mouseover', function () { this.src = svnIMG(2); });
                $('#btn_cls').bind('mouseout', function () { this.src = svnIMG(1); });
                $('#btn_cls').bind('click', function () { $('#sMR').stop().animate({ "opacity": "0" }, "slow"); setTimeout(function () { rmv(ID('sMR')) }, 1000); });

                if (ID('_page').getElementsByTagName('a')) {
                    for (i = 0; i < ID('_page').getElementsByTagName('a').length; i++) {
                        ID('_page').getElementsByTagName('a')[i].addEventListener('click', function () { return getXQR(this.getAttribute('value')); }, true);
                        ID('_page').getElementsByTagName('a')[i].setAttribute('value', ID('_page').getElementsByTagName('a')[i].href);
                        ID('_page').getElementsByTagName('a')[i].setAttribute('href', 'javascript:void(0)');
                    };
                };

                for (i = 0; i < ID('sMR').getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('img').length; i++) {
                    $('#sMR table tbody img').eq(i).bind('mouseover', function () { displayMSG('<b style="padding: 4px;">' + this.alt + '</b>'); });
                    $('#sMR table tbody img').eq(i).bind('mouseout', function () { ID('T4_mHelp').style.display = 'none'; });
                };

                for (i = 0; i < ID('sMR').getElementsByClassName('clear').length; i++) { $('#sMR table .clear').remove(); };
                $('#sMR table thead').remove();

                if ($('div#sMR table !div[style*="float"]').html()) { $('div#sMR table !div[style*="float"]').remove(); };
                $('#sMR').stop().animate({ "opacity": "1" }, "slow");
                MakeDrag(ID('DRGB'), ID('sMR'));
            })
        };

        function getQuick_RM() {
            function create_acc() {
                if (!ID('sMR')) {
                    var x, y, z;
                    z = getPosition('sMR', '175px_500px').split('_'), x = z[1], y = z[0];
                    appThis(document.body, [Create('div', { style: 'opacity: 0; top: ' + y + '; left: ' + x + '; position: absolute;', id: 'sMR' })]);
                };
            };
            var xR = 'data:image/png;base64,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%3D%3D';
            var xM = 'data:image/png;base64,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%3D%3D';
            var xA = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH3AMUAgYAZC2/BAAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAANlElEQVRYhaWYeYxd1X3HP+fc++7bZ968N/uMZ7E9w9h4wTsYsFkCAZMSA8EpWAFMClEgpSVtIG2JakVKaIgEagOEsEShUglLGyNcMAYSMMEbxtjGGx6PZ/Fsb5b33sy8edtdzukfA2ZpFTnqT7rS1ZXu+X70++n8zvd3hNaaPyM2ZIssz04kfyCmD+MUenCLUwjlAAItTfyhKkLhCorB1cTilT8P+tgPvHC2AuIsgFodeDw13HeVPfo6wfxbBP02plWGNCN4shKkNbOYyiPccXQphW2PUPCqKJV9k2D9jSTi5iYJv/l/Abnw1tT44OXZ3mdIiA8xwnUYoXlgVYGQCGmA8j77QUq0Aq08hLJx8j3I6aMU7Skyob8i1rKeeNS8GfjtnwvUWijx0Fjfzm/Esg8RiMxBRM9Fy3KE8BB4SKmRAvj00QoUoMDxNFqDxkRrDU6S0vg+0oUYwbn3k6hv3eaDdWcLtCabc3fkup8g4u7EqlgJgUaE8DCkh5SgFExkXbJ5k1TGwVMaNBiGoLrCIhryKI9+BucpAQrsyUPk0x9RrP0n6mavfdnv47o/CaTgknzOeXui8zFi8hC+qkuQRgiBjWmAbXt09Ws+HpCkMgqEBDRSCjSSUskhNZXFl89QX22yZGk985p9aM/B8QTgwyt0UUruIFt5Pw0dV77sN78I9QWggk2m+8jLsSaex6pdhzR8GFIhhUfPkGbvEcgWJD4TDAmgAY3nQTY7ycneAaY+eoXFTpr2FTEG9TmIc65h/ZoQFRGF4woUPnTpNLnBV8nV/Jim+ZduMz9XPvnpi6PYPnb6g1gTz+GvvhRpWDMwUrH3sOLN96HoSAIW+MxPYcB2FcnRFMPJIZZ1hFh76VJ2ZIo89UYfHbUnOb7vQ156VzAwCqbhInEwAs0E4ysw+x9gfLj3auCmL2RIQcPISG5A9t5JWbwds6wDAxdpKHYetDnWZ+L3SQzjs9QqpSmVHIaGRxkf6eG+by/FcwvEamYxkspy36a/4eKKAH2N5zN31VUEAlEuW+LSXKMo2BKt/NijWxjLJWi86AnKgogzGXIcBnLJVwhaYEbbZ3aRCYe74FjvF2GU0niepli0OdXdTSE7zD0b5xGMxaicuwAzFqd9yUKu+PpatoyASrQRDPgJ+iV/OGAxntFIpcCzseLnE3F2k+regoLbPwXyj6cKRAv/RTC+FGFIpPQYGXfYfQQs64swICgWS5zs6SFk2dx+XRuJWU34Y4mZLa4V08kh0m6CYmwhfstPsVjEUw4+U7HnZBSkQoocwkigg4twep4kV+QZANNV/CI7tJ1Gn42yapGuC0Jz4ITGZ4J5pkwzvWVicpKunj7OmRVh3Zo6KhubkYEg2lMIQ5JNp0j39bDhqgWcv6SNziFFIZvkVE+JgD+Izx+lMhxiRVsI25OU1S0jdfgJxk8fItq++C/NXJ47AvZejLLZCGEhdIHUhKJ/zMA/cyLgeaC1JpVO09vTx2Xn17B8QTVl1TUIy49WCq0hO5Yi3d+L0mAGLBYuamDligB2yaZ3YIrk6DAHj/ey72CE+S1tSAFSFZAyTP/Rl2luX7xMdPZM6kRyPeGaa8Gqwi9t3v7IoHdYYBr6k1LB8EiS5FCS669oor21nGBFJUYgAHomc6mBJJnkAD5LEiqvIhSOIKSB1hpDCqQhMA2JlAa2ozDtXjI9b1CcyOA5JdJZWPztDzGLuSksYaONGBIPVwkyWYEUGq01tu3QNzBEYTrNpg0LqY0bhKvrQIgzMOmhMVLDAwSCFuWV1fisMIiZ7i2EQGnwHIXjKMAF4WM6q5hO9qNlEImgzMwwmkwj3UInwoiAlAgB2QJMTUsQgkKhSNepbkw9xb13LKG+0pyBQYCeKWN6KMV4fy/BcIhn99VhBeIMDY1RLBbwPJfJyUmmcoIbHwmx6ekqHMowDIOA30YYINCIQBUPH97I6PAA0vDG8DRoJUArbBtKjiKXL9B5qpfGGj93b1xMIBghWFmHnmkXaKUY6zvN+GAPkYogiZo63vhggife8VNdU43rCApFj4KOcd+Lfo4l89TVxHn07UqmSiGKhSLCn0D4K9gy/i2OpJrwJXdjegqQFgqTmTNSM50rMTTUzUUrKrlk5TnkJgaJVdbMdFJmMjPW001mdIxIRRnllfWASTJVYtu+PG8fClF0A2RLLpaQ9E+UmJ62eX77ETZctZDN26rIZtcRCV2DIWHVeW1EP3qVQHkeEyQajUShvSz5osfO94/R4OskkmvnmZ9t44Zbb0AICQYoVzPW10d+eoqyeDnRRB1gzKwhoHNwEssMgNBo18H1NFlbIAClNb976yiVFWHmza3Bam2mc8xPz/aDaKWxCwrT5wNySfJ9TyNRWOM2t/uOUd8R49Tu4xzaneb9Qx/z8FP/QllVNSPdXRQmJwlEQ0QTdQhhgBBIKdFaoJQiPTqA5xZYv9pkTmOAf30pB5FGZKGff7wpQincwIPPdWINRtHxZmZNFihXmqKswsw486nHREgfWoARlQRiQQpTLvOWxpm7sI6fP3GEybFJpifzuMUsoWiUcKJqBgaJpxyGTp2iUJRc1Liff75nipKvmbse6qQ1XsONF3hs3zPCPyzfzabVC/A3+Gmtrebe1wxK0sBTCs/zUIn5SF8gjDYjeE6JUslBWoJQIoQ9WWLscBIr4LJpVTn9p5OETIeyWIxIZRVCmJ/0KI+ju97jtYcfpFDMcOvaFN/9SQ9PvnCCJ78fYP1Kh93HFIuDH/C1NSFO7j/KyXdfZ+NFk8yuD+HzPJRW2NqjtqYaWVEeJp2vAu0gECitKWtNIKTANCWFvnGynsvVt/6Enz6+FW0EiccqCFomls/A81zS4yc4b3kZInuKod37uWNVEb9wefTFDF+9cy8NkUkeeeAChk+lGe2bIFLZgChNUDXayYaG00R0kZJToq42jpiatvU7//0Uyyt+g6ctPGHgKdi5pZeoO4nPp/n1fj/H7CYiwSA+leXuO6+kmC9xbkcLhs/i+GnNlcth5V09tMk9/PI7gtYV5+AE53LwpE1ztSBq92JP9HN89yAdl1/AnsFWtry/hL+/zsdNjyexc+Mcf/H7D5nRsO8xf82qu6cm/oNgQIE2CVqC8iXn8tjvSgymi9TXVrFh+XmEgn76+od45oWDHDt6gmuuWs0tt97K8lWzODQwjGF00z3i8u77aRrby8kP9FObymOnoHNwivZVjSxY04QUWS5e2MSaC01+8Eg/npbYhUmAUyawr7W5gb7kKjqsXbiGxs7brGgp8sONrewbWYgViFIeDWMYklAoQk1VJd/9zu2sWL6ITGaKd/7wRwYGh3GLWZxAB2/s3cplF05wcP8oq69o4We/7ubQoTQbu3KsvbiGRLNk+7Z/59+2hThdXEb9wg5Of/AxwH9K4NlZ9dUUAmuYLICensazFdNZlxr/CItbFdHyWoQwSaXShEJ+rr/uGs5bPJ8jR7rYuvV1JsYHuHD1MqoDWcrKIhxINXCwq8gPnx2ip3uKa69sYI++gbvevJgXtw1xaH+Bb71yG/tLN5NobiLd18mschsgbWzevBnTFL2+YMX6ro9PUGn0YHsBtDYRXo4yhsl6IYYmDJYvW8jCc9uYzhV4553ddHadIBGPc8VXL6e1qYH6mmo6+1KkCwZxxrji2gt48+QcFiUmKcaXkDE62HpAsu7SHPds+Aq/3/EhdbOb6d3zGju2PH5/rLxs55mpw3HRe/btZ2rvfcytyuB6M/7fEC5KKdy6mxBNf0FXZy+HD3+E9hwWzGth0XlLEVrzy189w9FjXfhirRhVi9jzxm9ZGDtOMdjMWCZAW9VpPvSuZ2g4zcqGXqbdFny18ympEuvmhSce+NvbFlRUVAx+fgxakyu6O/bt2Er41I+IRiVK+vFcjVt00Hhoq47OfBMZPZuOBatoaJ7NyeOdPPr0M4StMJdevJzyimr2Hu6nb7TEe+/tIuv4IFiD8JeBL4Jp1WKVRohHJ4jX17K6QY3/9Ed/3RINh3L/ay4Dzk9PFXe/t/0l5Klf0FI1jadDCGNm8sQQCE/jahMVmUO2GOSVtz+mdU4tjbNq8SsbnU+TCEyztaudAyOVfLDrj6QLAqwwhhEC4dFYmyDSdg5fW1TJj7/3zVWGlO9/YQz6UryayuTW7d31DoUTT9EeOY7wV6CFH40CLRF4oIoo20HhwxAOWmmKRYXyFEIYM7aibykfjcbZ+e5b5KZzKGnROqeN+PwVrG2P8tDf3fJ1KeUrnxc3Nm/e/GWg50JB6+PahqZvjOs5nBzSmBOHsXQOw7TQCFxX4boS2zNRLtiugetIwAemD6SJ1g7nJlIUdDm2fxZjyT4sv0m4bRHXrZjlPnjvLeullFu/LG5++cMn8UI0HBhYe9EF7/W1tLDr9+fSdfoVWvzHCFkay5IoGTrjGiWgjRnjhlafWBmbfDbDsrIShbbLOHYwjDAtvveVtvTNN1w9Twgx+n8Jn82F1XtF272wu3eAQweOMDX4AcbUhzSJowSkjWGaOK7GAdAC5dlk8nHGzRYi9RdQPns1SxbPo76mCssn7wSe+lNiZwMEUA9c7ip+NZXNBZNjGUZGUiSTSRDOmSsi21aEI1Hq62qoqUmQiJVTFgmUgNuA589G6H8AxQ+FgCDNay4AAAAASUVORK5CYII%3D';
            var R = Create('img');
            R.setAttribute('src', xR);
            R.setAttribute('style', 'cursor: pointer; position: relative; width: 32px; height: 32px;');
            $(R).bind('click', function () { create_acc(); return getXQR('berichte.php'); });
            $('#t4tools').append($('<hr style="margin: 0px;">'));
            $('#t4tools').append(R);

            var M = Create('img');
            M.setAttribute('src', xM);
            M.setAttribute('style', 'cursor: pointer; z-index: 10000; width: 32px; height: 32px;');
            $(M).bind('click', function () { create_acc(); return getXQR('nachrichten.php'); });
            $('#t4tools').append(M);
            if (xpath('//div[@class="sideInfoAlly"]').snapshotItem(0)) {
                var A = Create('img');
                A.setAttribute('src', xA);
                A.setAttribute('style', 'cursor: pointer; z-index: 10000; width: 32px; height: 32px;');
                $(A).bind('click', function () { if (CLASS('sideInfoAlly')[0]) { create_acc(); return getXQR('allianz.php?s=3'); } });
                $('#t4tools').append(A);
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
            appThis(ID('stime'), [Create('div', { id: 'xgy', style: 'display: none;' })]);
            if (!GM_getValue('T4_MyVID' + $('li[class="entry active"] a.active').attr('href').split('id=')[1])) {
                $.get('http://' + location.hostname + '/statistiken.php?id=2', function (ajax) {
                    var GM = $(ajax);
                    var xy = GM.find('table#villages tbody tr.hl td.vil a:eq(0)').attr('href').split('=')[1];
                    ID('xgy').innerHTML = xy;
                    ID('xgy').setAttribute('value', get_xy(xy)[0]);
                    ID('xgy').setAttribute('class', get_xy(xy)[1]);
                    GM_setValue('T4_MyVID' + $('li[class="entry active"] a.active').attr('href').split('id=')[1], xy);
                });
            } else {
                var xy = GM_getValue('T4_MyVID' + $('li[class="entry active"] a.active').attr('href').split('id=')[1]);
                ID('xgy').innerHTML = xy;
                ID('xgy').setAttribute('value', get_xy(xy)[0]);
                ID('xgy').setAttribute('class', get_xy(xy)[1]);
            };
        };
        function MyId() {
            return ID("xgy").innerHTML;
        };

        function showHelp_move(ev) {
            var x = ev.pageX;
            var y = ev.pageY;
            var tX = ID("T4_mHelp").style.left;
            var tY = ID("T4_mHelp").style.top;
            if (tX > C(window.innerWidth + window.scrollX)) x = x / 2;
            if (tY > C(window.innerHeight + window.scrollY)) y = y / 2;
            var v = 18/*height*/, t = -2/*width*/;
            if (ID("T4_mHelp").getElementsByClassName('ACS')[0]) { v = 45; };
            if (ID("T4_mHelp").getElementsByClassName('t4Style')[0]) { t = (RTL == 'rtl' ? 250 : 230); v = 16; };
            ID("T4_mHelp").style.zIndex = '10500';
            ID("T4_mHelp").style.top = (y + v) + 'px';
            ID("T4_mHelp").style.left = (t == 12 ? (x + 12) : (x - t)) + 'px';
        };
        function sHide() {
            ID('T4_mHelp').style.display = 'none';
        };
        function building_increase() {
            if (xpath('//table[@id="build_value"]/tbody/tr[2]').snapshotItem(0)) {
                var incA, incB, cA, cB;
                incA = xpath('//table[@id="build_value"]/tbody/tr[1]/td').snapshotItem(0).innerHTML.match(/\d+/);
                incB = xpath('//table[@id="build_value"]/tbody/tr[2]/td').snapshotItem(0).innerHTML.match(/\d+/);

                cA = C(incB - incA);
                cB = (C(incA / incB * 100) - 100).toString().replace('-', '');

                return $('#build_value tbody').append($('<tr><th></th><td>(+' + cA + ' | +%' + cB + ')</td></tr>'));
            };
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

        function PHP_Village_Access() {
            var vAccessA = [], vAccessB = [];
            var sAll = '';
            for (a = 0; a < $('div#villageList ul li').length; a++) {
                vAccessA[a] = eval(GM_getValue('accessA' + a + '_id' + $('div#villageList ul:eq(0) li:eq(' + a + ') a:eq(0)').eq(0).attr('href').split('id=')[1], '[]'));
                vAccessB[a] = eval(GM_getValue('accessB' + a + '_id' + $('div#villageList ul:eq(0) li:eq(' + a + ') a:eq(0)').eq(0).attr('href').split('id=')[1], '[]'));
                var acc = [], vAcc = [], rid = '';
                vAcc[0] = [];
                vAcc[1] = [];

                if ($('div#villageList ul li a').eq(a).attr('href').split('id=')[1] == $('div#villageList ul li a.active').eq(0).attr('href').split('id=')[1]) {
                    if (ID('movements') && exp(/dorf1/)) {
                        if (ID('movements').getElementsByTagName('img')[0]) {
                            mov = '';
                            for (x = 0; x < ID('movements').getElementsByTagName('img').length; x++) {
                                mov = mov + '<span onmouseover="displayMSG(\'' + $('#movements div.mov span').eq(x).html() + '\');" onmouseout="sHide();">' + ID('movements').getElementsByTagName('img')[x].parentNode.innerHTML + '</span>';
                            };
                            vAcc[0].push(mov);
                            GM_setValue('accessA' + a + '_id' + $('div#villageList a[class="active"]').attr('href').split('id=')[1], uneval(vAcc[0]));
                        };
                    };
                    if (!ID('movements') && exp(/dorf1/)) {
                        GM_setValue('accessA' + a + '_id' + $('div#villageList a[class="active"]').attr('href').split('id=')[1], '[]');
                    };
                    if (ID('building_contract') && exp(/dorf1/)) {
                        ag = $('#building_contract tbody tr:eq(0) td.buildingTime').html();
                        ax = '<img class="gebIcon" src="img/x.gif" onmouseover="displayMSG(\'<center>' + $('#building_contract tbody tr:eq(0) td:eq(1)').text() + '<br>' + ag.split(/<\/span>/)[1].split(ag.split(/span>/)[1].split(' ')[1])[1] + '</center>\')" onmouseout="sHide();" />';
                        vAcc[1].push(ax);
                        GM_setValue('accessB' + a + '_id' + $('div#villageList a[class="active"]').attr('href').split('id=')[1], uneval(vAcc[1]));
                    };
                    if (!ID('building_contract') && (exp(/dorf1/) || exp(/dorf2/))) {
                        GM_setValue('accessB' + a + '_id' + $('div#villageList a[class="active"]').attr('href').split('id=')[1], '[]');
                    };
                };
                if (vAccessA[a][0]) { vAcc[0] = vAccessA[a][0]; } else { vAcc[0] = '<font color="silver">-</font>'; };
                if (vAccessB[a][0]) { vAcc[1] = vAccessB[a][0]; } else { vAcc[1] = '<font color="silver">-</font>'; }; ;
                td_ = '<td style="padding:3px; text-align:center;">';
                rid = '<tr>' + td_ + $('div#villageList ul li a').eq(a).html() + '</td>' + td_ + '' + vAcc[0] + '</td>' + td_ + '' + vAcc[1] + '</td></tr>';
                sAll = sAll + rid;
            };
            var xhtml = '<div id="vlls_state" style="position:absolute;"><table cellspacing="0" style="position: absolute; top: 200px; left: ' + (RTL == "rtl" ? "-150" : "200") + 'px;z-index:10000; background-color: white;width:160px;"><thead><tr><td colspan="4">' + $("div#villageList div:eq(0) a:eq(0)").html() + '</td></tr></thead><tbody>' + sAll + '</tbody></table>';
            $(xhtml).appendTo($('#side_info'));
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
        function cSpeed() {
            var Spd = ID('cSpeed').selectedIndex;
            var MySpd = ID('cSpeed').options[Spd].value;
            GM_setValue('cSpeed', Spd);
            return GM_setValue('MySpeed', MySpd);
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

        function formatUp(maxtime) {
            var hrs = Math.floor(maxtime / 3600) % 24;
            var min = Math.floor(maxtime / 60) % 60;
            var sec = maxtime % 60;
            if (hrs < 10) { hrs = '0' + hrs; }
            t = hrs + ":";
            if (min < 10) { t += "0"; }
            t += min + ":";
            if (sec < 10) { t += "0"; }
            t += sec; return ((t.toString().match(/NaN/)) ? '00:00:00' : t);
        };

        function setting() {
            function getLanguage(lng, lType) {
                var Language_ = []; /*           [0]                                    [1]                                   [2]                                             [3]                     [4]                                            [5]                                     [6]             [7]                      [8]                               [9]                            [10]                        [11]           [12]					[13] 							[14]					[15]				[16]							[17]														[18]*/
                Language_['ar'] = ['عرض الموارد المطلوبة للبناء', 'اظهار جدول المباني أسفل القرية', 'أظهار رموز ارسال قوات و موارد في قائمة القرى', 'اظهار رمز فتح التقارير', 'اظهار رمز فتح الرسائل', 'حساب عدد الموارد والوقت في الثكنة,الأسطبل,المصانع الحربية', 'إغلاق', 'إظهار قائمة الروابط', 'إظهار وقت إمتلاء المخازن', 'إظهار معدل نسبة المخازن', 'إظهار أنتاج القرية لكل ساعة', 'الروابط المحفوظة', 'عرض', 'الالوان لمستويات الحقول والمباني', 'لون التطوير متاح', 'لون الحد الأقصى', 'لون التطوير غير ممكن', 'لون التطوير عن طريق NPC', 'لون التطوير غير ممكن :<br>(يحتاج الى تطوير مخزن الحبوب او المخزن)']
                Language_['bg'] = ['Виж ресурсите необходими за построяването', 'Покажи таблица със сградите под града', 'Покажи иконки за изпращане на ресурс и войска в листа с градовете', ' Покажи иконка отвори доклади', 'Покажи иконка отвори съобщения', 'Изчисли броя на ресурсите и времето в Казармата, Работилницата и Конюшнията', 'Затвори', 'Покажи меню връзки', 'Покажи ресурсен таймер', 'Покажи процент ресурси', 'Покажи продукцията на час', 'Запазени връзки', 'Покажи', 'Цветове', 'Цвят ъпгрейд', 'Цвят на макс ниво', 'Цвят ъпгрейд невъзможно (няма достатъчно ресурси)', 'Цвят ъпгрейд невъзможно (не достатъчно капацитет на хамбар/склад)', 'Цвят ъпгрейд чрез NPC(изкуствено)'];
                Language_['cn'] = ['显示建筑所需资源', '在村庄下方显示已有建筑物列表', '在村庄列表中显示资源和兵力调配的快捷图标', '启用快速打开报告功能', '启用快速打开消息功能', '计算兵营,马厩和工场所需资源和时间', '关闭', '显示菜单链接', '显示辅助资源倒计时', '显示仓储资源百分比', '显示村庄产量', '已保存的链接', '显示', '颜色', '颜色：可升级', '颜色：满级', '颜色：无法升级（没有足够资源）', '颜色：无法升级（仓库/粮仓大小不足）', '颜色：可通过和NPC兑换资源升级'];
                Language_['de'] = ['Zeige zum Bau benötigte Rohstoffe', 'Zeige Gebäudetabelle unterhalb des Dorfes', 'Zeige icons zum sende von Rohstoffen und Truppen in der Liste der Dörfer', ' zeige "Bericht öffnen"-Icon', 'Zeige "Nachricht öffen"-Icon', 'Berechne benotigte Rohstoffe und Zeit in der Kaserne, Stall, Werkstatt', 'Schließen', 'Zeige Menulinks', 'Zeige Rohstofftimer', 'Zeige Rohstoffe in Prozent', 'Zeige Dorfporduktion', 'Gespeicherte Links', 'Zeige', 'Farben', 'Farbe für Ausbau möglich', 'Farbe für höchstes Level', 'Farbe für Ausbau nicht möglcih (zu wenig Rohstoffe)', 'Farbe für Ausbau nicht möglich (nicht genug Kapazität im Rohstofflager/Kornspeicher)', 'Farbe für Ausbau über NPC-Handel'];
                Language_['en'] = ['insaa etmek icin gerekli kaynaklari goruntule', 'Bina gelisim tablosunu goster', 'Hizli Hammadde ve asker gonderme resimlerini goster', ' Raporlari acma resmini goster', 'Mesajlari acma resmini goster', 'Kisla, agir ve tamirhanede yetisen askerlerin suresini ve nekadar kaynak gerektigini hesapla', 'Kapat', 'Menu linklerini goster', 'Kaynak zamanlarini goster', 'Kaynak yuzdelerini goster', 'Koy uretimini goster', 'Kayitli linkler', 'goster', 'Renkler', 'Yukseltilebilir seviyelerin rengi', 'En fazla seviye rengi', 'Hammadde olmadigi icin yukseltilemeyen seviyelerin rengi', 'Depo ve tahil ambari yetersizligi yuzunden gelistirilmesi mumkun olmayan seviyelerin rengi', 'NPC ile gelistirilebilen seviyeler'];
                Language_['es'] = ['recursos de vista necesario para construir', 'mostrar una tabla de los edificios más abajo del pueblo', 'Mostrar iconos de enviar tropas y recursos en la lista de los pueblos', "Mostrar el icono de abrir mensajes", " mostrar el código para abrir los informes ", " calcular el número de recursos y tiempo en los cuarteles, estable, Ordnance Factories ", ' Close', "mostrar el menú de enlaces", "temporizador de recursos muestran", "mostrar por ciento de los recursos", "mostrar la producción del pueblo", 'enlaces guardados', 'mostrar', "Color: actualización disponible ',' color: el nivel máximo", "Color: actualizar no es posible (no hay suficientes recursos)", "Color: actualización no es posible (no la suficiente capacidad de los graneros o almacenes)", "Color: actualización a través de NPC"];
                Language_['hk'] = ['顯示建設需求資源', '顯示建築名單', '顯示村莊輸送部隊和資源', '開啟訊息圖示', '兵營.馬廄.車廠顯示時間資源計算', '關閉', '羊單連結', '爆倉時間', '資源百分比', '村莊產量', '連結儲存', '開啟顯示', '顏色', '可升級顏色', '升級完成顏色', '不可升級(資源不足)', '不可升級(倉庫米倉等級不足)', '電腦商人交易升級'];
                Language_['hu'] = ['építéshez szükséges nyersanyagok megtekintése', 'Legyen egy táblázat az épületekről a falu alatt', 'Egység és nyersanyagküldés gomb megjelenítése a falulistában', ' jelentésmegnyitás gomb megjelenítése', 'Üzenetmegnyitás gomb megjelenítése', 'Idő és nyersanyag kiszámítása a Kaszárnyában, Istállóban és Műhelyben', 'Bezárás', 'Menü linkek megjelenítése', 'Nyersanyag táblázat megjelenítése', 'Nyersanyag megjelenítése százalékban', 'Falu termelésének megjelenítése', 'menti kapcsolatok', 'kijelző', 'Szín', "Szín: frissítés elérhető", "Szín: max szint", "Szín: frissítés nem lehetséges (nincs elég szabad erőforrás) ", " Szín: frissítés nem lehetséges (nincs elég kapacitása magtár / raktár) ", " Szín: frissítés keresztül NPC "];
                Language_['it'] = ['visualizza le risorse necessarie per costruire', 'visualizzare una tabella di edifici al di sotto del villaggio', 'Mostra icone di inviare truppe e risorse nella lista dei villaggi', 'Mostra icona aperto report', "Mostra aperta l'icona dei messaggi", 'calcolare il numero di risorse e di tempo in caserma, stabili, Ordina i Villaggi', ' Chiudi ', ' Mostra i link del menu ', ' timer risorsa Show ', ' centro delle risorse Show ', ' la produzione villaggio show ', ' Salvato Links ', 'display', 'Colori', 'aggiornamento Colore disponibile', 'Colore max livello', 'Colore aggiornare non è possibile (non abbastanza risorse)', 'Il colore non aggiornare possibile (e non sufficiente capacità di granai / magazzini)', 'Colore, aggiornarlo via NPC '];
                Language_['fa'] = ['منابع مورد نیاز برای ساخت رامشاهده نمایید', 'نمایش یک جدول از ساختمانها در زیر ', 'نمایش آیکون ارسال منابع و ارسال نیرو در لیست روستاها', ' نمایش آیکون باز کردن گزارش', 'نمایش آیکون باز کردن ÷یام', 'محاسبه تعداد منابع و زمان در سربازخانه, اصطبل, کارگاه', 'بستن', 'نمایش لینک های منو', 'نمایش تایمر منابع', 'نمایش درصد منابع', 'نمایش تولیدات روستاها', 'ذخیره لینکها', 'نمایش', 'رنگ', 'رنگ: ارتقاء در دسترس ', ' رنگ: سطح حداکثر ', ' رنگ: ارتقاء امکان پذیر نیست (کافی نیست منابع) ', ' رنگ: ارتقاء امکان پذیر نیست (کافی نیست دانه ها / انبارها ظرفیت) ', ' رنگ: ارتقاء از طریق NPC'];
                Language_['fr'] = ["ressources vue nécessaire à la construction", "montrer un tableau de bâtiments bas du village", "Afficher les icônes d'envoyer des troupes et des ressources dans la liste des villages", " Afficher le code pour ouvrir les rapports", "Afficher l'icône et les messages ouverts", "calculer le nombre de ressources et de temps dans les casernes, stable, Ordnance Factories", "Fermer", 'liens du menu Show', 'timer ressources montrent', 'pour cent des ressources montrent', 'la production du village montrent', 'liens enregistrés', "d'affichage", 'Couleur', 'Couleur: mise à jour disponible', 'Couleur: niveau max', "Couleur: mise à niveau n'est pas possible (pas assez de ressources)", "Couleur: mise à niveau n'est pas possible (pas assez de capacité des greniers et entrepôts) ", ' Couleur: mise à jour via NPC'];
                Language_['nl'] = ['Laat de benodigde grondstoffen voor constructie zien', 'Laat een gebouwentabel onder het dorp zien', 'Laat stuur troepen en grondstoffen iconen zien in de dorpslijst', 'Laat open rapport icoon zien', 'Laat open bericht icoon zien', 'Bereken de grondstoffen en tijd in de barakken, stallen en werkplaats', 'Sluiten', 'Laat links zien', 'Laat grondstoffen tijd zien', 'Laat grondstoffen percentage zien', 'Laat dorp productie zien', 'opgeslagen koppelingen', "tonen", 'Kleur', 'Kleur: upgrade beschikbaar', 'Kleur: max level', 'Kleur: upgraden niet mogelijk is (onvoldoende middelen)', 'Kleur: upgrade niet mogelijk is (te weinig capaciteit van graanschuren / magazijnen)', 'Kleur: upgrade via NPC '];
                Language_['ru'] = ['просмотр необходимых для строительства ресурсов', 'показать таблицу строительства внизу', 'показать иконки отсылки ресурсов/войск в списке деревень', ' показать иконку открытия отчета', 'показать иконку открытия сообщения', 'подсчитывать необходимые ресурсы и время в казарме, конюшне, мастерской', 'Закрыть', 'Показывать меню ссылок', 'Показывать таймер ресурсов', 'Показывать процены ресурсов', 'Показать производство деревни', 'Сохранённые ссылки', 'показать', 'Цвет', "Цвет: обновление доступно", "Цвет: максимальный уровень", "Цвет: обновление невозможно (не хватает ресурсов)", "Цвет: обновление невозможно (не хватает мощности зернохранилищ / складов)", "Цвет: обновление через NPC "];
                Language_['sk'] = ['Zobraziť potrebné suroviny na stavanie', 'Zobraziť tabuľku budov pod dedinou', 'Zobraziť ikonyposlať vojakov a suroviny v zozname dedín', ' Zobraziť ikonu otvoriť hlásenie', 'Zobraziť ikonu otvoriť správu', 'Vyrátaťpočet surovín a času v Kasárňach, Stajniach, Tovární arzenálu', 'Zatvoriť', 'Zobraziť ponuky odkazov', 'Zobraziť surovinyčasovač', 'Zobraziť suroviny v percentách', 'Ukázať produkciu dediny', 'Uložené Odkazy', 'Zobrazenie', 'Farby', 'Farba aktualizácia k dispozícii', 'Farba max úroveň', 'Farba aktualizácie nie jemožné (nedostatok surovín)', 'Farba aktualizácie nie je možné (nestačí kapacita sýpok/skladov)', 'Farba aktualizovať cezNPC'];
                Language_['th'] = ['แสดงทรัพยากรที่ต้องการในการสร้าง', 'แสดงตารางสิ่งก่อสร้างด้านล่างหมู่บ้าน', 'แสดง icon ส่งทหารและทรัพยากรในรายการของหมู่บ้าน', 'แสดง icon เปิดรายงาน', 'แสดง icon เปิดจดหมาย', 'คำนวณปริมาณทรัพยากรและเวลาใน ค่ายทหาร, โรงม้า, ห้องเครื่อง', 'ปิด', 'แสดง menu links', 'แสดงเวลาที่ทรัพยากรจะเต็ม', 'แสดงทรัพยากรเป็นเปอร์เซ็นต์', 'แสดงการผลิตของหมู่บ้าน', 'บันทึก Links', 'แสดง', 'การแสดงสี', 'สีของ "สามารถอัพเกรดได้"', 'สีของ "ระดับสูงสุดแล้ว"', 'สีของ "สามารถอัพเกรดได้(ทรัพยากรไม่เพียงพอ)"', 'สีของ "สามารถอัพเกรดได้(โกดัง/ยุ้งฉางจุไม่พอ)"', 'สีของ "อัพเกรดได้เมื่อแลกเปลี่ยนกับ NPC"'];
                Language_['tw'] = ['顯示建築所需資源', '在村莊下方顯示已有建築物列表', '在村莊列表中顯示資源和兵力調配的快捷圖標', '啟用快速打開報告功能', '啟用快速打開消息功能', '計算兵營,馬厩和工場所需資源和時間', '關閉', '顯示菜單鏈接', '顯示輔助資源倒計時', '顯示倉儲資源百分比', '顯示村莊產量', '已保存的鏈接', '顯示', '顏色', '顏色：可升級', '顏色：滿級', '顏色：無法升級（沒有足夠資源）', '顏色：無法升級（倉庫/糧倉大小不足）', '顏色：可通過和NPC兌換資源升級'];
                if (Language_[lng][lType]) { return Language_[lng][lType]; } else { return Language_['en'][lType]; };
            };
            var RTL = document.defaultView.getComputedStyle(document.body, null).getPropertyValue('direction');

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
                var getSpeed = GM_getValue('MySpeed');
                if (getSpeed == null || undefined || 'undefined' || '' || isNaN(getSpeed) || 'NaN' || 'null') { getSpeed = '1'; GM_setValue('MySpeed', '1'); };
                var clrs = ['#F8FFC8', '#A0F0A0', '#FFB8F0', '#FFC84B', '#FF8888'];
                for (c = 0; c < 5; c++) { if ((GM_getValue("setting2[" + (c + 1) + "]") == ('null' || null)) || !GM_getValue("setting2[" + (c + 1) + "]")) { GM_setValue('setting2[' + (c + 1) + ']', clrs[c]); }; };

                var xHo = 'onmouseover="FindBefore(this).style.color=\'darkred\';FindBefore(this).style.fontStyle=\'italic\';" onmouseout="FindBefore(this).removeAttribute(\'style\');"';
                var SaveMySetting = "for(i = 0; i < 23; i++){ GM_setValue('setting['+(i+1)+']', ID('t4_set['+(i+1)+']').checked); }; location.reload();"; // change by Dream1 <--- thanks
                var SaveMySetting2 = "for(i = 0; i < 5; i++){ GM_setValue('setting2['+(i+1)+']', ID('t4_set2['+(i+1)+']').value); }; location.reload();"; // add by Dream1
                var Div = Create('div');
                Div.setAttribute('id', 't4_setting');
                Div.setAttribute('style', 'width: auto; z-index: 10900;');
                Div.innerHTML = '' +
        '<table class="t4_set" cellspacing="1">' +
        '<thead>' +
        '<tr><td colspan="2" style="background-color: #FFFFE0;">' + pName + '</td></tr>' +
        '<tr><td>' + xpi_A + '</td><td>' + xpi_B + '</td></tr>' +
        '<tr><td>' + ally_A + '</td><td>' + ally_B + '</td></tr>' +
		'<tr><td>' + SubLanguage(LanguagePack(), 41) + ':</td><td>' + GM_getValue("mainVillage") + '</td></tr>' +
        '<tr><td style="direction: ltr;" colspan="3">Dil: <select style="direction:ltr;" id="cLang" onchange="cLang();">' +
        '<option value="ar">العربية (ar)</option>' +
        '<option value="bg">български (bg)</option>' +
        '<option value="cn">中文（简体）(cn)</option>' +
        '<option value="de">Deutsch (de)</option>' +
        '<option value="en">Turkce (TR)</option>' +
        '<option value="es">español (es)</option>' +
        '<option value="fa">فارسی (fa)</option>' +
        '<option value="fr">français (fr)</option>' +
        '<option value="hk">中国香港 (hk)</option>' +
        '<option value="hu">Magyarország (hu)</option>' +
        '<option value="it">italiano (it)</option>' +
        '<option value="nl">Nederlands (nl)</option>' +
        '<option value="ru">русский (ru)</option>' +
        '<option value="sk">slovenských (sk)</option>' +
        '<option value="th">ภาษาไทย (th)</option>' +
        '<option value="tw">中國傳統 (tw)</option>' +
        '</select>&nbsp;&nbsp;&nbsp;<a target="_blank" href="http://userscripts.org/scripts/show/131961" style="border: 1px solid;">&nbsp;Ekle yada Dil secimini guncelle&nbsp;</a></td></tr>' +
        '<tr><td colspan="2">' + SubLanguage(LanguagePack(), 44) + ':&nbsp;&nbsp;' +
        '<select id="cSpeed" onchange="cSpeed();">' +
        '<option value="1">Normal</option>' +
        '<option value="2">tx2</option>' +
        '<option value="5">tx3</option>' +
        '<option value="10">tx5</option>' +
        '<select>' +
        '</td></tr>' +
        '</thead>' +
        '<tbody style="direction: ltr;">' + // 29 30 31
        '<tr><td colspan="2" style="background-color: #FFFFE0;"><center>TravianProgram - Travian4 Plus Eklentisi - Ayarlar, ' + ID("this.version").innerHTML + '</center></td></tr>' +
        '<tr><td>' + getLanguage(getLang, 0) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[1]" checked="true" /></td></tr>' + // عرض الموارد المطلوبة
        '<tr><td>' + getLanguage(getLang, 5) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[6]" checked="true" /></td></tr>' + // حساب عدد الموارد والوقت في الثكنة,الأسطبل,المصانع الحربية
        '<tr><td colspan="2" style="background-color: #FFFFE0;"></td></tr>' + // فاصل
        '<tr><td>' + getLanguage(getLang, 8) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[8]" checked="true" /></td></tr>' + // إظهار وقت إمتلاء المخازن
        '<tr><td>' + getLanguage(getLang, 9) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[9]" checked="true" /></td></tr>' + // إظهار معدل نسبة المخازن
        '<tr><td>' + getLanguage(getLang, 10) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[10]" checked="true" /></td></tr>' + // إظهار أنتاج القرية لكل ساعة
        '<tr><td>' + SubLanguage(LanguagePack(), 52) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[22]" checked="true" /></td></tr>' + // عرض شريط الموارد
        '<tr><td colspan="2" style="background-color: #FFFFE0;"></td></tr>' + // فاصل
        '<tr><td>' + getLanguage(getLang, 1) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[2]" checked="true" /></td></tr>' + // اظهار جدول المباني أسفل القرية
		'<tr><td>' + SubLanguage(LanguagePack(), 54) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[23]" checked="true" /></td></tr>' + // أظهار جدول ترقية الحقول
		'<tr><td>' + SubLanguage(LanguagePack(), 47) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[17]" checked="true" /></td></tr>' + // عرض مستويات المباني
        '<tr><td>' + SubLanguage(LanguagePack(), 2) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[11]" checked="true" /></td></tr>' + // إظهار قائمة المباني
        '<tr><td colspan="2" style="background-color: #FFFFE0;"></td></tr>' + // فاصل
        '<tr><td>' + getLanguage(getLang, 2) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[3]" checked="true" /></td></tr>' + // أظهار رموز ارسال قوات و موارد في قائمة القرى
        '<tr><td>' + SubLanguage(LanguagePack(), 31) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[15]" checked="true" /></td></tr>' + // عرض رموز ارسال قوات و موارد بجانب كل قرى اللاعبين
		'<tr><td>' + SubLanguage(LanguagePack(), 50) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[20]" checked="true" /></td></tr>' + // عرض معلومات اللاعب والتحالف عند مرور الماوس عليه
        '<tr><td>' + SubLanguage(LanguagePack(), 29) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[13]" checked="true" /></td></tr>' + // عرض رمز ارسال رسالة بجانب كل لاعب
        '<tr><td colspan="2" style="background-color: #FFFFE0;"></td></tr>' + // فاصل
        '<tr><td>' + getLanguage(getLang, 7) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[7]" checked="true" /></td></tr>' + // إظهار قائمة الروابط
        '<tr><td>' + SubLanguage(LanguagePack(), 12) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[12]" checked="true" /></td></tr>' + // الروابط المساعده
        '<tr><td colspan="2" style="background-color: #FFFFE0;"></td></tr>' + // فاصل
        '<tr><td>' + getLanguage(getLang, 3) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[4]" checked="true" /></td></tr>' + // اظهار رمز فتح التقارير
        '<tr><td>' + getLanguage(getLang, 4) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[5]" checked="true" /></td></tr>' + // اظهار رمز فتح الرسائل
		'<tr><td>' + SubLanguage(LanguagePack(), 39) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[16]" checked="true" /></td></tr>' + // أظهار تحديد الكل للرسائل والتقارير // add by Dream1 <--- thanks
        '<tr><td colspan="2" style="background-color: #FFFFE0;"></td></tr>' + // فاصل
		'<tr><td>' + SubLanguage(LanguagePack(), 49) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[19]" checked="true" /></td></tr>' + // اظهار وقت وصول التجار في السوق
		'<tr><td>' + SubLanguage(LanguagePack(), 48) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[18]" checked="true" /></td></tr>' + // عرض خصائص السوق
        '<tr><td colspan="2" style="background-color: #FFFFE0;"></td></tr>' + // فاصل
        '<tr><td>' + SubLanguage(LanguagePack(), 30) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[14]" checked="true" /></td></tr>' + // اظهار جدول معلومات حول الهجوم في نقطة التجمع
		'<tr><td>' + SubLanguage(LanguagePack(), 51) + '</td><td ' + xHo + '><input type="checkbox" id="t4_set[21]" checked="true" /></td></tr>' + // اظهار معلومات القوات عند مرور الماوس عليه
		'<tr><td colspan="2" style="background-color: #FFFFE0;"><center>' + getLanguage(getLang, 13) + '</center></td></tr>' + // الالوان لمستويات الحقول والمباني // add by Dream1 
		'<tr><td>' + getLanguage(getLang, 14) + ' :</td><td style="background:FFFFFF;"><input size="7" type="text" STYLE="background: #FFFFE0; border: 1px solid #CCCCCC;" id="t4_set2[1]" style="width:70px;" value="' + GM_getValue("setting2[1]") + '" /></td></tr>' + // add by Dream1
		'<tr><td>' + getLanguage(getLang, 15) + ' :</td><td style="background:FFFFFF;"><input size="7" type="text" STYLE="background: #FFFFE0; border: 1px solid #CCCCCC;" id="t4_set2[2]" style="width:60px;" value="' + GM_getValue("setting2[2]") + '" /></td></tr>' + // add by Dream1 
		'<tr><td>' + getLanguage(getLang, 16) + ' :</td><td style="background:FFFFFF;"><input size="7" type="text" STYLE="background: #FFFFE0; border: 1px solid #CCCCCC;" id="t4_set2[3]" style="width:70px;" value="' + GM_getValue("setting2[3]") + '" /></td></tr>' + // add by Dream1 
		'<tr><td>' + getLanguage(getLang, 17) + ' :</td><td style="background:FFFFFF;"><input size="7" type="text" STYLE="background: #FFFFE0; border: 1px solid #CCCCCC;" id="t4_set2[4]" style="width:70px;" value="' + GM_getValue("setting2[4]") + '" /></td></tr>' + // add by Dream1 
		'<tr><td>' + getLanguage(getLang, 18) + '</td><td style="background:FFFFFF;"><input size="7" type="text" STYLE="background: #FFFFE0; border: 1px solid #CCCCCC;" id="t4_set2[5]" style="width:70px;" value="' + GM_getValue("setting2[5]") + '" /></td></tr>' + // add by Dream1 
        '<tr><td colspan="2" style="background-color: #FFFFE0;"><center>' + getLanguage(getLang, 11) + ' - <input type="button" value="' + getLanguage(getLang, 12) + '" id="MySavedLinks" /></center></td></tr>' +
        '<tr><td colspan="2"><center>' +
        '<input type="button" onclick="ID(&apos;t4_setting&apos;).parentNode.removeChild(ID(&apos;t4_setting&apos;));" value="' + getLanguage(getLang, 6) + '" />' +
        '<input type="button" onclick="' + SaveMySetting + SaveMySetting2 + '" value="' + SubLanguage(LanguagePack(), 4) + '" />' +
        '</center></td></tr>' +
        '</tbody>' +
        '</table>';
                document.body.appendChild(Div);
                ID('MySavedLinks').addEventListener('click', function () {
                    if (!ID('ThisMySavedLinks')) {
                        var MyLinks = encode(GM_getValue("My_T4Links"));
                        var div = Create('div');
                        div.setAttribute('id', 'ThisMySavedLinks');
                        div.setAttribute('style', 'position: absolute; top: 150px; left: 50px; z-index: 10250; border: 1px solid; background-color: white; text-align: center; box-shadow: 5px black;');
                        div.innerHTML = '<div style="padding: 4px 5px;"><br />' +
            'Encrypted links<br>' +
            'You can copy and save it in notepad on your computer<br>' +
            '<textarea id="sLinks" rows="15" cols="100" style="font-size: 9px; text-align: left; direction: ltr;">' + MyLinks + '</textarea><br />' +
        '<input type="button" id="s1BTN" onclick="GM_setValue(\'My_T4Links\', decode(ID(\'sLinks\').value)); alert(\'Saved\');" value="' + SubLanguage(LanguagePack(), 4) + '" />' +
        '<input type="button" onclick="ID(\'ThisMySavedLinks\').parentNode.removeChild(ID(\'ThisMySavedLinks\'));" value="' + getLanguage(getLang, 6) + '" />' +
        '</div>';
                        document.body.appendChild(div);
                        ID('sLinks').addEventListener('blur', function () { ID('sLinks').style.boxShadow = '0px 0px 2px 0px gold'; }, true);
                        ID('sLinks').addEventListener('focus', function () { ID('sLinks').style.boxShadow = '0px 0px 2px 0px blue'; }, true);
                        ID('sLinks').addEventListener('keypress', function () { ID('sLinks').style.boxShadow = '0px 0px 2px 0px red'; }, true);
                        ID('s1BTN').addEventListener('click', function () { ID('sLinks').style.boxShadow = '0px 0px 2px 0px green'; }, true);
                    };
                }, true);
                if (GM_getValue('MyLang')) { ID('cLang').getElementsByTagName('option')[GM_getValue('cLength')].selected = 'selected'; } else { ID('cLang').getElementsByTagName('option')[4].setAttribute('selected', 'selected'); };
                if (GM_getValue('MySpeed')) { ID('cSpeed').getElementsByTagName('option')[(GM_getValue('cSpeed') ? GM_getValue('cSpeed') : 0)].selected = 'selected'; } else { ID('cSpeed').getElementsByTagName('option')[0].setAttribute('selected', 'selected'); };

                function CheckIt(n) {
                    if (GM_getValue('setting[' + n + ']')) {
                        if (GM_getValue('setting[' + n + ']') == 'true') {
                            return ID('t4_set[' + n + ']').checked = GM_getValue('setting[' + n + ']');
                        } else {
                            ID('t4_set[' + n + ']').removeAttribute('checked'); return GM_setValue('setting[' + n + ']', 'false');
                        }
                    } else { ID('t4_set[' + n + ']').setAttribute('checked', 'checked'); return GM_setValue('setting[' + n + ']', 'true'); };
                };
                for (i = 0; i < 23; i++) {
                    CheckIt('' + (i + 1) + '');
                };
            }
        };

        function deleteLinks(cid) {
            var ask = window.confirm(SubLanguage(LanguagePack(), 11) + ' ' + ID(cid).getElementsByTagName('a')[0].innerHTML);
            if (ask) {
                document.getElementById(cid).parentNode.removeChild(ID(cid));
                var ulinks = [];
                var links = ID('tbody_links').innerHTML;
                for (i = 0; i < ID('tbody_links').getElementsByTagName('tr').length; i++) {
                    ID('tbody_links').getElementsByTagName('tr')[i].setAttribute('id', 'Link[' + i + ']');
                    ID('tbody_links').getElementsByTagName('tr')[i].getElementsByTagName('img')[0].setAttribute('id', "delete_Link[" + i + "]');");
                    ulinks.push(ID('tbody_links').getElementsByTagName('tr')[i].getElementsByTagName('td')[1].innerHTML);
                };
                GM_setValue('My_T4Links', uneval(ulinks));
            };
        };
        function AddNewLink() {
            var links = '0';
            if (ID('tbody_links').getElementsByTagName('tr')[0]) { links = ID('tbody_links').getElementsByTagName('tr').length; };
            loc = window.location.href.split('/')[3];
            new_link = window.prompt('' + SubLanguage(LanguagePack(), 9) + '', loc); if (!new_link) { return }
            new_link_name = window.prompt('' + SubLanguage(LanguagePack(), 10) + '', ""); if (!new_link_name) { return; };
            newLinks = '<tr id="Link[' + links + ']"><td width="10%"><img src="img/x.gif" class="del" id="delete_Link[' + links + ']" style="cursor: pointer;" /></td><td style="font-size: 11.5px; color: black;"><a href="' + new_link + '">' + new_link_name + '</a></td></tr>';
            if (ID('tbody_links').getElementsByTagName('tr')[0]) { ID('tbody_links').innerHTML += newLinks } else { ID('tbody_links').innerHTML = newLinks };
            var ulinks = [];
            if (ID('tbody_links').getElementsByTagName('tr')[0]) {
                for (i = 0; i < ID('tbody_links').getElementsByTagName('tr').length; i++) {
                    ulinks.push(ID('tbody_links').getElementsByTagName('tr')[i].getElementsByTagName('td')[1].innerHTML);
                };
            } else { links = ''; };
            GM_setValue('My_T4Links', uneval(ulinks));
        };

        function NotePadPlus() {
            var RTL = document.defaultView.getComputedStyle(document.body, null).getPropertyValue('direction');
            var x, y, z = getPosition('xblock', '120px_82px').split('_');
            x = z[1], y = z[0];
            var Div = Create('div', { style: 'position: absolute; z-index: 10000; left: ' + x + '; top: ' + y + ';' });
            Div.id = 'xblock';
            var DivB = Create('div');
            var DivC = Create('div', { style: 'height: 25px;', class: 'hm_move' });

            var DivD = Create('div', { style: 'background-color: white; border-bottom: 1px solid black; border-left: 1px solid black; border-right: 1px solid black; padding: 3px;' });
            var sIMG = Create('img', { src: svnIMG(1), style: 'float: ' + (RTL == "rtl" ? "left" : "right") + '; cursor: pointer;' });
            var sIMG_B = Create('img', { src: svnIMG(3), style: 'float: ' + (RTL == "rtl" ? "right" : "left") + '; width: 15px; padding: 4px;' });
            var text = Create('font', { style: 'float: ' + (RTL == "rtl" ? "right" : "left") + '; font-size: 10px; font-weight: bold; text-shadow: 0px 0px 5px white; padding: 3px; cursor: default;' });
            text.appendChild(document.createTextNode(ID('t4tools').firstChild.alt));
            var select_size = Create('select');
            select_size.innerHTML = '<option value="13" style="font-size: 12.5px;">Normal</option><option value="20" style="font-size: 16px;">very large</option><option value="17" style="font-size: 15px;">large</option><option value="14" style="font-size: 13px;">medium</option><option value="13" style="font-size: 11px;">small</option>';
            var select_shadow = Create('select');
            select_shadow.innerHTML = '<option value="null">No Shadow</option><option value="blue" style="text-shadow: 0px 0px 2px blue;">blue</option><option value="red" style="text-shadow: 0px 0px 2px red;">red</option><option value="black" style="text-shadow: 0px 0px 2px black;">black</option><option value="yellow" style="text-shadow: 0px 0px 2px yellow;">yellow</option>';
            var select_float = Create('select');
            select_float.innerHTML = '<option value="left">left</option><option value="center">center</option><option value="right">right</option>';
            var select_type = Create('span');
            select_type.innerHTML = '<b style="border: 1px solid black; cursor: pointer;" value="bold">&nbsp;B&nbsp;</b>&nbsp;<i style="border: 1px solid black; cursor: pointer;" value="italic">&nbsp;I &nbsp;</i>';
            var select_color = Create('select');
            select_color.innerHTML = '' +
    '<option value="black" style="color: black;">black</option>' +
    '<option value="red" style="color: red;">red</option>' +
    '<option value="blue" style="color: blue;">blue</option>' +
    '<option value="orange" style="color: orange;">orange</option>' +
    '<option value="yellow" style="color: yellow;">yellow</option>' +
    '<option value="green" style="color: green;">green</option>' +
    '<option value="darkred" style="color: darkred;">darkred</option>' +
    '<option value="darkblue" style="color: darkblue;">darkblue</option>' +
    '';
            select_size.setAttribute('style', 'height: 22px; width: 100px; width: 90px;');
            select_color.setAttribute('style', 'height: 22px; width: 100px; width: 70px;');
            select_float.setAttribute('style', 'height: 22px; width: 100px; width: 70px;');
            select_type.setAttribute('style', 'float: ' + (RTL == "rtl" ? "left" : "right") + '; direction: ltr; margin-top: -19px;');
            select_shadow.setAttribute('style', 'height: 22px; width: 100px; width: 70px;');
            select_size.setAttribute('id', 'sel_size');
            select_color.setAttribute('id', 'sel_color');
            select_float.setAttribute('id', 'sel_float');
            select_type.setAttribute('id', 'sel_type');
            select_shadow.setAttribute('id', 'sel_shadow');
            select_size.setAttribute('onchange', 'NoteText(\'size\', \'sel_size\');');
            select_color.setAttribute('onchange', 'NoteText(\'color\', \'sel_color\');');
            select_float.setAttribute('onchange', 'NoteText(\'float\', \'sel_float\');');
            select_shadow.setAttribute('onchange', 'NoteText(\'shadow\', \'sel_shadow\');');
            var Type = ['Text Color:', 'Text Size:', 'Text Shadow:', 'Text Float:', 'Text Type:'], FNT = [];
            var Object = [select_color, select_size, select_shadow, select_float, select_type], SPN = [];
            var BR = ['x', 'x', 'x', 'br', 'x'];
            var txtArea = Create('textarea');
            txtArea.id = 'notic';
            txtArea.style.width = '300px';
            var P = Create('div');
            P.className = 'btn';
            P.setAttribute('style', 'direction: ltr;');
            var input = Create('input');
            input.type = 'button';
            input.value = SubLanguage(LanguagePack(), 4);
            input.setAttribute('onclick', "GM_setValue('note.txt', ID('notic').value); GM_setValue('NoteText_style', ID('notic').getAttribute('style')); alert('Saved');");
            P.appendChild(input);
            for (i = 0; i < Type.length; i++) {
                SPN[i] = Create('span');
                /*  FNT[i] = Create('font');
                FNT[i].innerHTML = Type[i];
                FNT[i].setAttribute('style', 'float: left;');
                */
                (BR[i] !== 'x' ? DivD.appendChild(Create(BR[i])) : null);
                //   SPN[i].appendChild(FNT[i]);
                SPN[i].appendChild(Object[i]);
                DivD.appendChild(SPN[i])
            };
            txtArea.innerHTML = GM_getValue("note.txt");
            DivB.appendChild(txtArea);
            DivB.appendChild(DivD);
            DivB.appendChild(P);
            DivC.appendChild(sIMG);
            DivC.appendChild(sIMG_B);
            DivC.appendChild(text);
            Div.appendChild(DivC);
            Div.appendChild(DivB);
            document.body.appendChild(Div);
            MakeDrag(CLASS('hm_move')[0], ID('xblock'));
        };
        function CEDC() {
            var s = '<div id="Xeon" style="display: none;">';
            var xy = get_xy(MyId());
            s += document.getElementById("mapCoordEnter").getElementsByClassName("xCoord")[0].getElementsByTagName("label")[0].innerHTML + ' <input type="text" id="elep_x" maxsize="4" size="4" value="' + (ID('xgy').value) + '"/>&nbsp;' +
    document.getElementById("mapCoordEnter").getElementsByClassName("yCoord")[0].getElementsByTagName("label")[0].innerHTML + ' <input type="text" id="elep_y" maxsize="4" size="4" value="' + (ID('xgy').className) + '"/>&nbsp;' +
    '' + SubLanguage(LanguagePack(), 18) + ': <input type="text" id="rad_elep" maxsize="4" size="4" value="3"/> <input type="button" id="cElphantX" value="' + SubLanguage(LanguagePack(), 19) + '" /><br/>' +
    '<span id="sElphant" style="display: none;">' + SubLanguage(LanguagePack(), 20) + ' ' + SubLanguage(LanguagePack(), 21) + ' <span id="ele_done">0</span> ' + SubLanguage(LanguagePack(), 22) + ' <span id="ele_tot">0</span><span>&nbsp;|&nbsp;' + SubLanguage(LanguagePack(), 23) + ': <span id="percex">0%</span></span><br/>' +
    '<table id="elep_fields" style="border: 0px solid; background-color: white; width: auto;"></table><br></div>';
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
        function Map_Check() {
            if (document.location.href.match(/karte.php/)) {
                if (xpath('//div[@id="mapContainer"]/div[2]/@unselectable').snapshotItem(0)) {
                    //xpath('//div[@id="mapContainer"]/div[2]').snapshotItem(0).setAttribute('onmousemove', 'Map_Coordx(0); ID(\'T4_mHelp\').style.display = \'block\';');
                    //xpath('//div[@id="mapContainer"]/div[2]').snapshotItem(0).setAttribute('onmouseout', 'setTimeout(function(){sHide();}, 1000); setTimeout(function(){sHide();}, 750);');
                    //xpath('//div[@id="mapContainer"]').snapshotItem(0).setAttribute('onmouseout', 'setTimeout(function(){sHide();}, 500); setTimeout(function(){sHide();}, 250);');
                    $(xpath('//div[@id="mapContainer"]/div[2]').snapshotItem(0)).bind('mousemove', function () { Map_Coordx(0); ID('T4_mHelp').style.display = 'block'; });
                    $(xpath('//div[@id="mapContainer"]/div[2]').snapshotItem(0)).bind('mouseout', function () { setTimeout(function () { sHide(); }, 1000); setTimeout(function () { sHide(); }, 750); });
                } else if (ID('mapContainer').getElementsByClassName('mapContainerData')[0]) {

                    var i, length = xpath('//div[@id="mapContainer"]/div//div[contains(@class, "tile tile")]').snapshotLength, cl = [];
                    for (i = 0; i < length; i++) {
                        if (!xpath('//div[@id="mapContainer"]/div//div[contains(@class, "tile tile")]').snapshotItem(i).getAttribute('onclick')) {
                            //xpath('//div[@id="mapContainer"]/div//div[contains(@class, "tile tile")]').snapshotItem(i).setAttribute('onmouseover', 'Map_Coordx(' + i + '); ID(\'T4_mHelp\').style.display = \'block\';');
                            //xpath('//div[@id="mapContainer"]/div//div[contains(@class, "tile tile")]').snapshotItem(i).setAttribute('onmouseout', 'sHide();');
                            $(xpath('//div[@id="mapContainer"]/div//div[contains(@class, "tile tile")]').snapshotItem(i)).bind('mousemove', function () { Map_Coordx(0); ID('T4_mHelp').style.display = 'block'; });
                            $(xpath('//div[@id="mapContainer"]/div//div[contains(@class, "tile tile")]').snapshotItem(i)).bind('mouseout', function () { setTimeout(function () { sHide(); }, 1000); setTimeout(function () { sHide(); }, 750); });
                        };
                    }
                };
            };
        };
        function getHeroHealth() {
            if (exp('hero_adventure.php') && CLASS('headerAdventures')[0]) {
                $.get('hero_inventory.php', function (ajax) {
                    e = $(ajax);
                    ex = e.find('div[class="attribute health tooltip"]').text();
                    CLASS('headerAdventures')[0].appendChild(document.createTextNode(' || ' + ex));
                });
            };
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
                    return setTimeout(function () {
                        x = xpath('//div[@class="tip"]//span[@class="coordinateX"]').snapshotItem(0).innerHTML.replace(')', '').replace('(', '');
                        y = xpath('//div[@class="tip"]//span[@class="coordinateY"]').snapshotItem(0).innerHTML.replace(')', '').replace('(', '');
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
                        newLinks = '<tr id="Link[' + links + ']"><td width="10%">&nbsp;<img src="img/x.gif" class="del" id="delete_Link[' + links + ']" style="cursor: pointer;" /></td><td style="font-size: 11.5px; color: black;"><a href="' + makeHref + '">' + linkName + '</a></td></tr>';
                        if (ID('tbody_links').getElementsByTagName('tr')[0]) { ID('tbody_links').innerHTML += newLinks } else { ID('tbody_links').innerHTML = newLinks };
                        var ulinks = [];
                        for (i = 0; i < ID('tbody_links').getElementsByTagName('tr').length; i++) {
                            ulinks.push(ID('tbody_links').getElementsByTagName('tr')[i].getElementsByTagName('td')[1].innerHTML);
                        };
                        GM_setValue('My_T4Links', uneval(ulinks));
                        return ID('favThis').setAttribute('src', starx);
                    }, true);
                    if (!ID('favThis')) { target.appendChild(img); };
                };
            }
            setTimeout(favThis, 250);
        };

        function allyInfo(href, id) {
            ID('T4_mHelp').innerHTML = '<img style="background-color: white;" src="data:image/gif;base64,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" />';
            ID('T4_mHelp').style.display = 'block';
            if ($('li#' + id).html() == '?') {
                $.get(href, function (ajax) {
                    e = $(ajax);
                    var ally_A = e.find('div#details').html();
                    var ally_B = '';
                    if (e.find('div#memberTitles').html()) { ally_B = e.find('div#memberTitles').html(); };
                    ID(id).innerHTML = '<div style="float: right;">' + ally_A + '</div><div style="float: left;">' + ally_B + '</div>';
                    return ID('T4_mHelp').innerHTML = '<div style="float: right; background-color: white; padding: 2px;">' + ally_A + '</div><div style="float: left; background-color: white; padding: 2px;">' + ally_B + '</div>';
                });
            } else {
                ID('T4_mHelp').style.display = 'block';
                return ID('T4_mHelp').innerHTML = ID(id).innerHTML;
            }
        };
        function userInfo(href, id) {
            ID('T4_mHelp').innerHTML = '<img style="background-color: white;" src="data:image/gif;base64,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" />';
            ID('T4_mHelp').style.display = 'block';
            if ($('li#' + id).html() == '?') {
                $.get(href, function (ajax) {
                    e = $(ajax);
                    var Deta = e.find('table#details');
                    if (!Deta.html()) { Deta = '<b>???</b>'; } else { Deta = Deta.html(); };
                    var user_A = '<table cellspacing="1">' + Deta + '</table>';
                    $('li#' + id).html(user_A);
                    return ID('T4_mHelp').innerHTML = user_A;
                });
            } else {
                ID('T4_mHelp').style.display = 'block';
                return ID('T4_mHelp').innerHTML = $('li#' + id).html();
            };
        };
        function accessToAlly() {
            var links = document.links.length;
            var xLink = document.links;
            for (j = 0; j < links; j++) {
                if (xLink[j].getAttribute('href')) {
                    if (xLink[j].getAttribute('href').match(/allianz.php\b[^>]aid=\d+/) && !(xLink[j].getAttribute('value'))) {
                        if (FindBefore(xLink[j])) { } else {
                            var X = Create('li');
                            X.style.display = 'none';
                            X.id = 'ally' + j;
                            X.innerHTML = '?';
                            xLink[j].parentNode.appendChild(X);
                        };
                        $(xLink[j]).attr('value', 'ally' + j + '');
                        $(xLink[j]).bind('mouseover', function () { allyInfo($(this).attr('href'), $(this).attr('value')); });
                        $(xLink[j]).bind('mouseout', function () { sHide(); });
                    }
                }
                if (document.links[j].getAttribute('href') && !(document.links[j].getAttribute('value'))) {
                    if (document.links[j].getAttribute('href').match(/uid=\d+/) && !(document.links[j].getAttribute('value'))) {
                        if (xpath('//div[@id="content"]/li[' + j + ']').snapshotItem(0)) { } else {
                            var Xa = Create('li');
                            Xa.style.display = 'none';
                            Xa.id = 'uid' + j;
                            Xa.innerHTML = '?';
                            xLink[j].parentNode.appendChild(Xa);
                        };
                        $(xLink[j]).attr('value', 'uid' + j + '');
                        $(xLink[j]).bind('mouseover', function () { userInfo($(this).attr('href'), $(this).attr('value')); });
                        $(xLink[j]).bind('mouseout', function () { sHide(); });
                    };
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
            if (exp(/allianz.php\b[^>]s=\d+/)) { }
            else if ((exp(/allianz.php\b[^>]aid=\d+/) || exp(/allianz\b[^>]*php/)) && xpath('//table[@id= "member"]/thead/tr').snapshotItem(0)) {
                totalBullets = [[0, ""], [0, ""], [0, ""], [0, ""], [0, ""]]; //blue, green, yellow, red, grey
                var membercell12 = xpath('//table[@id= "member"]/thead/tr').snapshotItem(0);
                var membercell121 = document.createElement('th');
                membercell121.innerHTML = "";
                membercell121.setAttribute("width", "6%");
                membercell12.insertBefore(membercell121, membercell12.firstChild);
                for (c = 0; c < xpath('//table[@id= "member"]/tbody/tr').snapshotLength; c++) {
                    var membercell = xpath('//table[@id= "member"]/tbody/tr[' + (c + 1) + ']').snapshotItem(0);
                    var membercell1 = document.createElement('td');
                    membercell1.innerHTML = c + 1;
                    membercell.insertBefore(membercell1, membercell.firstChild);
                    var specificname = xpath('//div[@class= "sideInfoPlayer"]/a/span').snapshotItem(0).innerHTML;
                    var specificname1 = xpath('//table[@id= "member"]/tbody/tr[' + (c + 1) + ']/td[2]/a').snapshotItem(0).innerHTML;
                    if (specificname == specificname1) {
                        var specificname2 = xpath('//table[@id= "member"]/tbody/tr[' + (c + 1) + ']').snapshotItem(0);
                        specificname2.setAttribute("class", "hl");
                    };
                    for (j = 0; j < 5; j++) {
                        var mmm = xpath('//table[@id= "member"]/tbody/tr[' + (c + 1) + ']/td[2]/img[@class="online online' + (j + 1) + '"]').snapshotLength;
                        if (xpath('//table[@id= "member"]/tbody/tr[' + (c + 1) + ']/td[2]/img[@class="online online' + (j + 1) + '"]').snapshotItem(0)) {
                            var mmm1 = xpath('//table[@id= "member"]/tbody/tr[' + (c + 1) + ']/td[2]/img').snapshotItem(0).getAttribute('alt');
                            totalBullets[j][1] = mmm1;
                        }
                        totalBullets[j][0] = C(C(totalBullets[j]) + C(mmm));
                    };
                };
                if (xpath('//table[@id= "member"]/tbody/tr/td[2]/img').snapshotItem(0)) {
                    var tabletr = xpath('//table[@id= "member"]').snapshotItem(0);
                    var tabletr1 = document.createElement('tr');
                    var tabletd = document.createElement('td');
                    tabletd.setAttribute("colspan", "4");
                    tabletd.setAttribute("style", "border:0px none white; background-color:#EFEFEF; padding:2px; text-align:center;");
                    cBiHTML = "";
                    addSpacer = " | ";
                    for (j = 0; j < 5; j++) { if (totalBullets[j][0] > 0) cBiHTML += "<img class='online" + (j + 1) + "' title='" + totalBullets[j][1] + "' src='img/x.gif'> = &nbsp;" + totalBullets[j][0] + addSpacer + " "; };
                    tabletd.innerHTML = cBiHTML.substring(0, cBiHTML.length - 3);
                    tabletr1.appendChild(tabletd);
                    tabletr.appendChild(tabletr1);
                };
            };
        };

        function calcuationttroop() {
            if (xpath('//table[@class= "under_progress"]').snapshotItem(0)) {
                var troopv = 0;
                totaltroops = [[0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""]];
                for (c = 0; c < xpath('//table[@class= "under_progress"]/tbody/tr').snapshotLength - 1; c++) {
                    for (j = 0; j < 30; j++) {
                        if (xpath('//table[@class= "under_progress"]/tbody/tr[' + (c + 1) + ']/td[1]/img[@class="unit u' + (j + 1) + '"]').snapshotItem(0)) {
                            var getalt = xpath('//table[@class= "under_progress"]/tbody/tr[' + (c + 1) + ']/td[1]/img').snapshotItem(0).getAttribute('alt');
                            totaltroops[j][1] = getalt;
                            var troopcalcuationt = xpath('//table[@class= "under_progress"]/tbody/tr[' + (c + 1) + ']/td[1]').snapshotItem(0).textContent.split(" ");
                            totaltroops[j][0] += C(C(troopv) + C(troopcalcuationt));
                        }
                    };
                };
                if (xpath('//table[@class= "under_progress"]/tbody/tr[@class="next"]').snapshotItem(0)) {
                    var tablebo = xpath('//table[@class= "under_progress"]/tbody').snapshotItem(0);
                    var tablebotr = document.createElement('tr');
                    var tablebotd = document.createElement('td');
                    tablebotd.setAttribute("colspan", "4");
                    tablebotd.setAttribute("style", "border:0px none white; background-color:#EFEFEF; padding:2px; text-align:center;");
                    cBiHTMLtroops = "";
                    addSpacer = " | ";
                    for (j = 0; j < 30; j++) { if (totaltroops[j][0] > 0) cBiHTMLtroops += "<img class='unit u" + (j + 1) + "' title='" + totaltroops[j][1] + "' src='img/x.gif'> = &nbsp;" + totaltroops[j][0] + addSpacer + " "; };
                    tablebotd.innerHTML = cBiHTMLtroops.substring(0, cBiHTMLtroops.length - 3);
                    tablebotr.appendChild(tablebotd);
                    tablebo.appendChild(tablebotr);
                };
            };
        };

        function resbar() {
            if (xpath('//div[@id="side_info"]').snapshotItem(0)) {
                function getSimpleWidth(val) {
                    if (val.toString().match(/\d+.\d/)) { return val.toString().split('.')[0] } else { return val };
                };
                var progressImgs = new Array();
                progressImgs[0] = "data:image/png;base64,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%3D";
                progressImgs[1] = "data:image/png;base64,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";
                progressImgs[2] = "data:image/png;base64,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%3D%3D";

                var bar = [];
                var width = [];
                for (var e = 0; e < 4; e++) {
                    bar[e] = ID('l' + (e + 1) + '').innerHTML.split('/')[0] / ID('l' + (e + 1) + '').innerHTML.split('/')[1] * 100;
                    width[e] = getSimpleWidth(bar[e]);
                    GM_addStyle(".ressbar" + e + " {border:1px solid #EBDDE2; border-radius: 4px 4px 4px 4px; width: 100px; background: url(" + progressImgs[0] + ") no-repeat 0 -40px; !important}" +
				".ressbar-completed" + e + " {border-radius: 4px 4px 4px 4px; width: " + width[e] + "px; height: 20px;margin-left: 0px;background: url(" + progressImgs[0] + ") no-repeat 1px 0; !important}" +
				".ressbar-completed" + e + " div {border-radius: 4px 4px 4px 4px; width: " + width[e] + "px; float: " + pos + "; height: 20px;margin-right: -1px;background: url(" + progressImgs[0] + ") no-repeat 100% 0;display: inline; /* IE 6 double float bug */ !important}" +
				"#td2res" + e + " {width:100px; text-align:center; color:green; padding: 2px;}" +
				'#tableres thead tr td {background-color: transparent; border-bottom: 1px solid; padding: 0px;}' +
				'#tableres tbody tr td {background-color: transparent; padding: 0px 2px;}');
                    if (width[e] >= 75) {
                        GM_addStyle(".ressbar" + e + " {border:1px solid #EBDDE2; border-radius: 4px 4px 4px 4px; width: 100px; background: url(" + progressImgs[1] + ") no-repeat 0 -40px; !important}" +
						".ressbar-completed" + e + " {border-radius: 4px 4px 4px 4px; height: 20px;margin-left: 0px;background: url(" + progressImgs[1] + ") no-repeat 1px 0; !important}" +
						".ressbar-completed" + e + " div {border-radius: 4px 4px 4px 4px; float: " + pos + "; height: 20px;margin-right: -1px;background: url(" + progressImgs[1] + ") no-repeat 100% 0;display: inline; /* IE 6 double float bug */ !important}" +
						"#td2res" + e + " {width:100px; text-align:center; color:orange; padding: 2px;}");
                    }
                    if (width[e] >= 100) {
                        GM_addStyle(".ressbar" + e + " {border:1px solid #EBDDE2; border-radius: 4px 4px 4px 4px; width: 100px; background: url(" + progressImgs[2] + ") no-repeat 0 -40px; !important}" +
						".ressbar-completed" + e + " {border-radius: 4px 4px 4px 4px; height: 20px; margin-left: 0px; background: url(" + progressImgs[2] + ") no-repeat 1px 0; !important}" +
						".ressbar-completed" + e + " div {border-radius: 4px 4px 4px 4px; float: " + pos + "; height: 20px; margin-right: -1px;background: url(" + progressImgs[2] + ") no-repeat 100% 0;display: inline; /* IE 6 double float bug */ !important}" +
						"#td2res" + e + " {width:100px; text-align:center; text-decoration: blink; color:red;}");
                    }
                    if (width[e] == 0) {
                        GM_addStyle("#td2res" + e + " {color:black; padding: 2px;}");
                    }
                }
                var target = document.body;
                var GY = getPosition('T4_RES_BAR', '200px_400px').toString().split('_')[0];
                var GX = getPosition('T4_RES_BAR', '200px_400px').toString().split('_')[1];

                var dv = Create('div', { id: 'T4_RES_BAR', style: 'position: absolute; top:' + GY + '; left:' + GX + '; z-index: 10000; width: 200px;' });
                var table = Create('table', { id: 'tableres', cellspacing: '0' });
                var thead = Create('thead');
                var tbody = Create('tbody');
                var tr1 = Create('tr');
                MakeDrag(tr1, dv);
                tr1.innerHTML = '<td colspan="3"><h1>' + SubLanguage(LanguagePack(), 53) + '</h1></td>';
                for (var j = 0; j < 4; j++) {
                    var tr = Create('tr');
                    var td = Create('td', { style: 'padding: 2px;' });
                    var td2 = Create('td', { id: "td2res" + j });
                    td2.innerHTML = Math.round(width[j]) + '%';
                    tr.innerHTML += '<td style="text-align:center;" width="100px">' + C(pro[j] * 3600) + '</td>';
                    var div = Create('div', { class: "ressbar" + j });
                    var div2 = Create('div', { class: "ressbar-completed" + j, style: "width:" + width[j] + "px;" });
                    div2.innerHTML = "<div><img class='r" + (j + 1) + "' style='margin-top:3px;' src='img/x.gif'></div>";
                    div.appendChild(div2);
                    td.appendChild(div);
                    tr.appendChild(td);
                    tr.appendChild(td2);
                    tbody.appendChild(tr);
                }
                thead.appendChild(tr1);
                table.appendChild(thead);
                table.appendChild(tbody);
                dv.appendChild(table);
                target.appendChild(dv);
            };

            function ReLoadResourceBar() {
                var Width = '', TrueWidth = '', i;
                for (i = 0; i < 4; i++) {
                    Width = ID('l' + (i + 1) + '').innerHTML.split('/')[0] / ID('l' + (i + 1) + '').innerHTML.split('/')[1] * 100;
                    TrueWidth = getSimpleWidth(Width);
                    CLASS("ressbar-completed" + i)[0].style.width = (Width > 0 ? (Width == 100 ? 101 : Width) : Width) + 'px';
                    CLASS("ressbar-completed" + i)[0].getElementsByTagName('div')[0].style.width = Width + 'px';
                    ID('td2res' + i).innerHTML = TrueWidth + '%';
                };
                return setTimeout(ReLoadResourceBar, 1000);
            };
            ReLoadResourceBar();
        };

        function Resmarketall() {
            if (xpath('//table[@class="traders"]/tbody[2]').snapshotItem(0)) {
                if (xpath('//table[@id="target_validate"]').snapshotItem(0)) { } else {
                    ID('logoutContainer').innerHTML += '' +
		'<span style="display:none;">' +
		'<ul id="res1">0</ul>' +
		'<ul id="res2">0</ul>' +
		'<ul id="res3">0</ul>' +
		'<ul id="res4">0</ul>' +
		'<ul id="tdttotal">0</ul>' +
		'</span>';
                    var Resource = [];
                    for (c = 0; c < xpath('//table[@class="traders"]/tbody[2]').snapshotLength; c++) {
                        var tdRes = document.getElementsByClassName('traders')[c].getElementsByTagName('tbody')[0].getElementsByClassName('in')[0].textContent.split(" ")[0];
                        Resource[0] = document.getElementsByClassName('traders')[c].getElementsByTagName('tbody')[1].getElementsByTagName('span')[0].textContent.split(" ")[1];
                        Resource[1] = document.getElementsByClassName('traders')[c].getElementsByTagName('tbody')[1].getElementsByTagName('span')[0].textContent.split(" ")[2];
                        Resource[2] = document.getElementsByClassName('traders')[c].getElementsByTagName('tbody')[1].getElementsByTagName('span')[0].textContent.split(" ")[3];
                        Resource[3] = document.getElementsByClassName('traders')[c].getElementsByTagName('tbody')[1].getElementsByTagName('span')[0].textContent.split(" ")[4];
                        ID('res1').innerHTML = C(C(ID('res1').innerHTML) + C(Resource[0]));
                        ID('res2').innerHTML = C(C(ID('res2').innerHTML) + C(Resource[1]));
                        ID('res3').innerHTML = C(C(ID('res3').innerHTML) + C(Resource[2]));
                        ID('res4').innerHTML = C(C(ID('res4').innerHTML) + C(Resource[3]));
                    };
                    ID('tdttotal').innerHTML = C(C(ID('tdttotal').innerHTML) + C(ID('res1').innerHTML) + C(ID('res2').innerHTML) + C(ID('res3').innerHTML) + C(ID('res4').innerHTML));
                    if (ID('restable')) { ID('restable').parentNode.removeChild(ID('restable')); };
                    var res1 = xpath('//div[@id= "content"]/div[@class= "gid17"]/script').snapshotItem(0);
                    var p = document.createElement('p');
                    var tableres = document.createElement('table');
                    tableres.setAttribute("id", "restable");
                    tableres.innerHTML = '<tbody id="restable"><tr class= "trimn"><td colspan="6" class="tdtotal">' + SubLanguage(LanguagePack(), 42) + '</td></tr>' +
			'<tr class= "trimn"><td class="tdimg"><img src="img/x.gif" class="clock" /></td><td class="tdimg"><img src="img/x.gif" class="r1" /></td><td class="tdimg"><img src="img/x.gif" class="r2" /></td><td class="tdimg"><img src="img/x.gif" class="r3" /></td><td class="tdimg"><img src="img/x.gif" class="r4" /></td><td id="tdttotal">' + SubLanguage(LanguagePack(), 43) + '</td></tr>' +
			'<tr class= "trimn"><td id="timeres">0:' + tdRes + '</td><td id="res1">' + ID('res1').innerHTML + '</td><td id="res2">' + ID('res2').innerHTML + '</td><td id="res3">' + ID('res3').innerHTML + '</td><td id="res4">' + ID('res4').innerHTML + '</td><td id="tdttotal">' + ID('tdttotal').innerHTML + '</td></tr></tbody>';
                    res1.parentNode.insertBefore(tableres, res1);
                    tableres.parentNode.insertBefore(p, tableres);
                    function ResTime() {
                        ID('timeres').innerHTML = format(ReLoadTime(ID('timeres').innerHTML) - 1);
                        setTimeout(ResTime, 1000);
                    };
                    ResTime();
                };
            };
        };
        function bEndTime(time) {
            ex = time;
            timer = C(ReLoadTimeUp(time) + ReLoadTimeUp(ID('tp1').innerHTML));
            hh = Math.floor(C(timer / 3600)) % 24;
            mm = Math.floor(C(timer / 60)) % 60;
            ss = Math.floor(timer) % 60;
            if (hh < 10) { hh = '0' + hh; };
            if (mm < 10) { mm = '0' + mm; };
            if (ss < 10) { ss = '0' + ss; };
            timer = hh + ':' + mm + ':' + ss;
            return timer;

        };

        function TimeUp() {
            if (CLASS('endtime')[0]) {
                for (i = 0; i < CLASS('endtime').length; i++) {
                    var e = CLASS('endtime')[i].innerHTML;
                    CLASS('endtime')[i].innerHTML = formatUp(C(ReLoadTimeUp(e)) + 1);
                };
            };
            setTimeout(TimeUp, 1000);
        };
        function building_end_time() {
            setTimeout(function () {
                for (i = 0; i < CLASS('clocks').length; i++) {
                    var getTime = CLASS('clocks')[i].textContent.match(/\d+:\d{2}:\d{2}/), html = [], timer = [], ctimer;
                    timer = getTime;
                    ctimer = bEndTime('' + timer + '');
                    html = ' <span style="color: blue;">(<span class="endtime">' + ctimer + '</span>)</span>';
                    $('span.clocks').eq(i).html($('span.clocks').eq(i).html() + html);
                };
            }, 500);
        };
        function MakeDrag(element, pr) {
            //for drag effect
            function dragStart(e) {
                par = pr;
                dragObj.zIndex++;
                dragObj.elNode = par;
                if (e.target.nodeType == 3) dragObj.elNode = par;
                dragObj.cursorStartX = e.clientX + window.scrollX;
                dragObj.cursorStartY = e.clientY + window.scrollY;
                dragObj.elStartLeft = parseInt(par.style.left, 10);
                dragObj.elStartTop = parseInt(par.style.top, 10);
                par.style.zIndex = dragObj.zIndex;
                document.addEventListener('mousemove', dragGo, true);
                document.addEventListener('mouseup', dragStop, true);
                e.preventDefault();
            }

            function dragGo(e) {
                e.preventDefault();
                par = pr;
                x = e.clientX + window.scrollX;
                y = e.clientY + window.scrollY;
                if (!par.style.position) { par.style.position = 'absolute'; };
                par.style.left = (dragObj.elStartLeft + x - dragObj.cursorStartX) + "px";
                par.style.top = (dragObj.elStartTop + y - dragObj.cursorStartY) + "px";
            };

            function dragStop(e) {
                document.removeEventListener('mousemove', dragGo, true);
                document.removeEventListener('mouseup', dragStop, true);
                return GM_setValue(par.id, par.style.top + '_' + par.style.left);
            }

            function makeDraggable(el) {
                el.style.cursor = 'move';
                el.addEventListener('mousedown', function (e) { dragStart(e); }, false);
            }
            return makeDraggable(element);
        };
        function getPosition(key, defaultValue) {
            if (GM_getValue(key) && GM_getValue(key).split('_')[0]) {
                return GM_getValue(key);
            } else {
                GM_setValue(key, defaultValue);
                return defaultValue.toString();
            };
        };

        function SaveAsLink(cID) {
            XLK = $('a#' + cID);
            if (ID('tbody_links').getElementsByTagName('tr')[0]) { links = ID('tbody_links').getElementsByTagName('tr').length; } else { links = 0; };
            newLinks = '<tr id="Link[' + links + ']"><td width="10%">&nbsp;<img src="img/x.gif" class="del" id="delete_Link[' + links + ']" style="cursor: pointer;" /></td><td style="font-size: 11.5px; color: black;"><a href="' + XLK.attr("href") + '">' + XLK.html() + '</a></td></tr>';
            if (ID('tbody_links').getElementsByTagName('tr')[0]) { ID('tbody_links').innerHTML += newLinks } else { ID('tbody_links').innerHTML = newLinks };
            var ulinks = [];
            for (i = 0; i < ID('tbody_links').getElementsByTagName('tr').length; i++) {
                ulinks.push(ID('tbody_links').getElementsByTagName('tr')[i].getElementsByTagName('td')[1].innerHTML);
            };
            GM_setValue('My_T4Links', uneval(ulinks));
        };
        function displayMSG(content) { ID('T4_mHelp').innerHTML = content; return ID('T4_mHelp').style.display = 'block'; };
        function NoteText(type, id) {
            var Sel = ID(id).selectedIndex;
            var Val = ID(id).options[Sel].value;
            if (type == 'size') { ID('notic').style.fontSize = Val + 'px'; GM_setValue('sel_si', Sel); }
            if (type == 'color') { ID('notic').style.color = Val; GM_setValue('sel_co', Sel); }
            if (type == 'float') { ID('notic').style.textAlign = Val; GM_setValue('sel_te', Sel); }
            if (type == 'type') { if (Sel == '2' || 2) { ID('notic').style.fontWeight = Val; } else { ID('notic').style.fontStyle = Val; }; GM_setValue('sel_te', Sel); };
            if (type == 'shadow') { if (Val == 'null') { ID('notic').style.textShadow = ''; GM_setValue('sel_sh', Sel); } else { ID('notic').style.textShadow = '0px 0px 2px ' + Val + ''; GM_setValue('sel_sh', Sel); } };
        };
        var Script = Create('script', { type: 'text/javascript' });
        Script.innerHTML = GM_setValue + GM_getValue + LanguagePack + SubLanguage + DIR + displayMSG + cSpeed + encode + decode + xpath + NewMathPercent + New_Math + Time + format + ReLoadTime + cData + Create + ID + AddNewLink + deleteLinks + CLASS + TAG + C + rmv + MakeNum + jsPatch + httpRequest + FindBefore + FindNext + htmltocontext + Handle + XMLGetM + XMLGetR + NotePadPlus + sh + getXQR + GM_addStyle + pTime + XPS_Cul + tChange + cLang + setting + X_CE_Change + xtr + OnChange + TroopType + Distance + get_xy + FindNext + hMove + getXtime + gTimeD + checkD + favThis + AllyCalculation + Map_Check + Map_Coordx + SaveAsLink + AttackDist + sHide + svnIMG + NoteText + MakeDrag + getPosition;
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

        function ResourcePlusTimer() { for (i = 0; i < 4; i++) { MyRes[i] = C(ID('l' + (i + 1)).innerHTML.split('/')[0] - (pro[i] < 0 ? '0' : ID('l' + (i + 1)).innerHTML.split('/')[1])); GM_Time[i] = Time(MyRes[i], pro[i]); ID('resource_state[' + i + ']').innerHTML += '<b id="xTimer[' + (i + 1) + ']" style="color: ' + ((pro[i] < 0) ? "red" : "black") + ';">' + GM_Time[i] + '</b><br>'; }; };
        function ResourcePercent() { for (i = 0; i < 4; i++) { MyPer[i] = NewMathPercent(ID('l' + (i + 1)).innerHTML.split('/')[0] / ID('l' + (i + 1)).innerHTML.split('/')[1] * 100); ID('resource_state[' + i + ']').innerHTML += '<span id="xPer[' + (i + 1) + ']">%' + MyPer[i] + '</span><br>'; }; };
        function ResourcePrud() { for (i = 0; i < 4; i++) { ID('resource_state[' + i + ']').innerHTML += '' + C(pro[i] * 3600) + ''; }; };

        function ReTime() {
            for (i = 0; i < 4; i++) {
                if (ID('xTimer[' + (i + 1) + ']')) {
                    if (ID('xTimer[' + (i + 1) + ']').innerHTML.match(/0:00:00/)) { } else {
                        ID('xTimer[' + (i + 1) + ']').innerHTML = format(ReLoadTime(ID('xTimer[' + (i + 1) + ']').innerHTML) - 1);
                    }
                };
                if (ID('xPer[' + (i + 1) + ']')) {
                    ID('xPer[' + (i + 1) + ']').innerHTML = '%' + NewMathPercent(ID('l' + (i + 1)).innerHTML.split('/')[0] / ID('l' + (i + 1)).innerHTML.split('/')[1] * 100) + '';
                };
            };
            return setTimeout(ReTime, 1000);
        };
        function timem() {
            if (xpath('//table[@class="traders"]').snapshotItem(0)) {
                var m = xpath('//table[@class="traders"]/tbody').snapshotItem(0);
                var m1 = Create('tr');
                var m0 = Create('th');
                m0.innerHTML = 'Total';
                var m2 = Create('td');
                var m23 = xpath('//table[@class="traders"]/tbody/tr[2]//span').snapshotItem(0).textContent.split(" ")[4];
                var m22 = pTime(xpath('//table[@class="traders"]/tbody//span[@id="timer1"]').snapshotItem(0).innerHTML, 'sec', 'tr');
                var m24 = m22 * pro[3];
                m2.innerHTML = C(C(m24) + C(m23) + C(document.getElementById('l4').firstChild.nodeValue.split('/')[0]));
                m1.appendChild(m0);
                m1.appendChild(m2);
                m.appendChild(m1);
            };
        };

        function dorfA() {
            var cA = C(C(pro[0] * 3600) + C(pro[1] * 3600) + C(pro[2] * 3600) + C(pro[3] * 3600));
            ID('production').getElementsByTagName('th')[0].innerHTML += '(' + cA + '):';
            if (ID('troops').getElementsByTagName('tbody')[0]) {
                if (ID('troops').getElementsByTagName('tbody')[0].getElementsByTagName('td')[1] && ID('troops').getElementsByTagName('thead')[0]) {
                    var cL;
                    var nm = 0;
                    cL = ID('troops').getElementsByTagName('tbody')[0].getElementsByTagName('tr').length;
                    for (i = 0; i < cL; i++) {
                        nm = C(C(nm) + C(ID('troops').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[1].innerHTML));
                    };
                    var th = ID('troops').getElementsByTagName('thead')[0].getElementsByTagName('th')[0];
                    th.innerHTML = th.innerHTML.replace(':', ' (' + nm + '):');
                };
                if (ID('movements')) {
                    if (ID('movements').getElementsByTagName('tbody')[0] && ID('movements').getElementsByTagName('tr')[0]) {
                        if (ID('movements').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0]) {
                            /*var rows = ID('movements').getElementsByTagName('tr').length, i, Exl = [];
                            var Mov = ID('movements').getElementsByTagName('tr')[0].getElementsByTagName('th')[0];
                            ID('movements').getElementsByTagName('tr')[0].getElementsByTagName('th')[0].innerHTML = ID('movements').getElementsByTagName('tr')[0].getElementsByTagName('th')[0].innerHTML.replace(':', '');
                            ID('movements').getElementsByTagName('tr')[0].getElementsByTagName('th')[0].innerHTML = ID('movements').getElementsByTagName('tr')[0].getElementsByTagName('th')[0].innerHTML + '(<span id="Exl">0</span>):';
                            for (i = 1; i < rows; i++) {
                            Exl[i] = ID('movements').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[1].getElementsByTagName('div')[0].getElementsByTagName('span')[0].innerHTML.replace(/\D/, '');
                            ID('Exl').innerHTML = C(C(ID('Exl').innerHTML) + C(Exl[i]));
                            };*/
                            function rTimeX() {
                                if (CLASS('atk_cd')[0]) {
                                    for (i = 0; i < CLASS('atk_cd').length; i++) {
                                        CLASS('atk_cd')[i].innerHTML = format(ReLoadTime(CLASS('atk_cd')[i].innerHTML) - 1);
                                    };
                                };
                                return setTimeout(rTimeX, 1000);
                            };
                            var imgs = [];
                            imgs['att1'] = xpath('//table[@id="movements"]//img[contains(@class, "att1")]').snapshotItem(0);
                            imgs['att2'] = xpath('//table[@id="movements"]//img[contains(@class, "att2")]').snapshotItem(0);
                            imgs['def1'] = xpath('//table[@id="movements"]//img[contains(@class, "def1")]').snapshotItem(0);
                            $(imgs['att1']).bind('mouseover', function () {
                                $('#T4_mHelp').html('<b>...</b>');
                                ID('T4_mHelp').style.display = 'block';
                                if (ID('movements').getElementsByTagName('li')[0]) {
                                    $('#T4_mHelp').html($('#movements li').html());
                                } else {
                                    $.get('build.php?gid=16&tt=1#at', function (data) {
                                        var A = $(data);
                                        var hGET = [], HTML = '<table cellspacing="1" class="ACS"><tbody>';
                                        hGET['A'] = A.find('table.inAttack');
                                        hGET['B'] = A.find('table.inRaid');
                                        if (hGET['A'].eq(0).html()) {
                                            for (i = 0; i < hGET['A'].length; i++) {
                                                hGET[2] = A.find('table.inAttack').eq(i).find('thead:eq(0)').find('tr:eq(0)').html();
                                                hGET[3] = A.find('table.inAttack').eq(i).find('.infos:eq(0)').find('tr:eq(0)').find('th:eq(0)').html();
                                                hGET[4] = A.find('table.inAttack').eq(i).find('.infos:eq(0)').find('tr:eq(0)').find('td:eq(0)').find('span').html();
                                                HTML = HTML + '<tr>' + hGET[2] + '<td>' + hGET[3] + ': <span class="atk_cd">0:' + hGET[4] + '</span></td></tr>';
                                            };
                                        };
                                        if (hGET['B'].eq(0).html()) {
                                            for (i = 0; i < hGET['B'].length; i++) {
                                                hGET[2] = A.find('table.inRaid').eq(i).find('thead:eq(0)').find('tr:eq(0)').html();
                                                hGET[3] = A.find('table.inRaid').eq(i).find('.infos:eq(0)').find('tr:eq(0)').find('th:eq(0)').html();
                                                hGET[4] = A.find('table.inRaid').eq(i).find('.infos:eq(0)').find('tr:eq(0)').find('td:eq(0)').find('span').html();
                                                HTML = HTML + '<tr>' + hGET[2] + '<td>' + hGET[3] + ': <span class="atk_cd">0:' + hGET[4] + '</span></td></tr>';
                                            };
                                        };
                                        $('#movements').append($('<li style="display: none;">' + HTML + '</li>'));
                                        $('#T4_mHelp').html(HTML + '</tbody></table>');
                                    });
                                };
                            });
                            $(imgs['att2']).bind('mouseover', function () {
                                $('#T4_mHelp').html('<b>...</b>');
                                ID('T4_mHelp').style.display = 'block';
                                if (ID('movements').getElementsByTagName('lw')[0]) {
                                    $('#T4_mHelp').html($('#movements lw').html());
                                } else {
                                    $.get('build.php?gid=16&tt=1#at', function (data) {
                                        var A = $(data);
                                        var hGET = [], HTML = '<table cellspacing="1" class="ACS"><tbody>';
                                        hGET['A'] = A.find('table.outAttack');
                                        hGET['B'] = A.find('table.outRaid');
                                        if (hGET['A'].eq(0).html()) {
                                            for (i = 0; i < hGET['A'].length; i++) {
                                                hGET[2] = A.find('table.outAttack').eq(i).find('thead:eq(0)').find('tr:eq(0)').html();
                                                hGET[3] = A.find('table.outAttack').eq(i).find('.infos:eq(0)').find('tr:eq(0)').find('th:eq(0)').html();
                                                hGET[4] = A.find('table.outAttack').eq(i).find('.infos:eq(0)').find('tr:eq(0)').find('td:eq(0)').find('span').html();
                                                HTML = HTML + '<tr>' + hGET[2] + '<td>' + hGET[3] + ': <span class="atk_cd">0:' + hGET[4] + '</span></td></tr>';
                                            };
                                        };
                                        if (hGET['B'].eq(0).html()) {
                                            for (i = 0; i < hGET['B'].length; i++) {
                                                hGET[2] = A.find('table.outRaid').eq(i).find('thead:eq(0)').find('tr:eq(0)').html();
                                                hGET[3] = A.find('table.outRaid').eq(i).find('.infos:eq(0)').find('tr:eq(0)').find('th:eq(0)').html();
                                                hGET[4] = A.find('table.outRaid').eq(i).find('.infos:eq(0)').find('tr:eq(0)').find('td:eq(0)').find('span').html();
                                                HTML = HTML + '<tr>' + hGET[2] + '<td>' + hGET[3] + ': <span class="atk_cd">0:' + hGET[4] + '</span></td></tr>';
                                            };
                                        };
                                        $('#movements').append($('<lw style="display: none;">' + HTML + '</lw>'));
                                        $('#T4_mHelp').html(HTML + '</tbody></table>');
                                    });
                                };
                            });
                            $(imgs['def1']).bind('mouseover', function () {
                                $('#T4_mHelp').html('<b>...</b>');
                                ID('T4_mHelp').style.display = 'block';
                                if (ID('movements').getElementsByTagName('xl')[0]) {
                                    $('#T4_mHelp').html($('#movements xl').html());
                                } else {
                                    $.get('build.php?gid=16&tt=1#at', function (data) {
                                        var A = $(data);
                                        var hGET = [], HTML = '<table cellspacing="1" class="ACS"><tbody>';
                                        hGET['A'] = A.find('table.inReturn');
                                        hGET['B'] = A.find('table.inSupply');
                                        if (hGET['A'].eq(0).html()) {
                                            for (i = 0; i < hGET['A'].length; i++) {
                                                hGET[2] = A.find('table.inReturn').eq(i).find('thead:eq(0)').find('tr:eq(0)').html();
                                                hGET[4] = A.find('table.inReturn').eq(i).find('span[id*="timer"]').html();
                                                HTML = HTML + '<tr>' + hGET[2] + '<td><span class="atk_cd">0:' + hGET[4] + '</span></td></tr>';
                                            };
                                        };
                                        if (hGET['B'].eq(0).html()) {
                                            for (i = 0; i < hGET['B'].length; i++) {
                                                hGET[2] = A.find('table.inSupply').eq(i).find('thead:eq(0)').find('tr:eq(0)').html();
                                                hGET[4] = A.find('table.inSupply').eq(i).find('span[id*="timer"]').html();
                                                HTML = HTML + '<tr>' + hGET[2] + '<td><span class="atk_cd">0:' + hGET[4] + '</span></td></tr>';
                                            };
                                        };
                                        $('#movements').append($('<xl style="display: none;">' + HTML + '</xl>'));
                                        $('#T4_mHelp').html(HTML + '</tbody></table>');
                                    });
                                };
                            });
                            rTimeX();
                            $(imgs['att1']).bind('mouseout', function () { ID('T4_mHelp').style.display = 'none'; });
                            $(imgs['att2']).bind('mouseout', function () { ID('T4_mHelp').style.display = 'none'; });
                            $(imgs['def1']).bind('mouseout', function () { ID('T4_mHelp').style.display = 'none'; });
                        }
                    }
                }
            };
            var space3 = Create('p');
            ID('map_details').insertBefore(space3, ID('map_details').firstChild);
        };
        // Dream1
        function space() {
            var space = Create('p');
            ID('contentOuterContainer').insertBefore(space, ID('contentOuterContainer').firstChild);
            var space2 = Create('p');
            ID('contentOuterContainer').insertBefore(space2, ID('contentOuterContainer').firstChild);
        };
        // end Dream1

        function getMap(x, y) {
            var tserver = 'http://'
            tserver += window.location.hostname;
            tserver += '/ajax.php';
            $.getJSON(tserver, "cmd=mapPositionData&data[x]=" + x + "&data[y]=" + y + "&data[zoomLevel]=1&", function (data) {
                var tbl = '<td><a href="build.php?t=5&gid=17&x=' + x + '&y=' + y + '"><img src="' + Send_resource + '" /></a>&nbsp;<a href="build.php?id=39&tt=2&x=' + x + '&y=' + y + '"><img src="' + Send_attack + '" /></a></td>';
                if (typeof data.data.tiles[49].c != 'undefined') {
                    if (data.data.tiles[49].c.match("{k.f1}")) {
                        $('<tr><td><img class="r4" src="img/x.gif" />9: </td><td><a href="position_details.php?x=' + x + '&y=' + y + '">' + data.data.tiles[49].t.split("<br")[0] + '</a></td>' + tbl + '<td>< ' + C(Distance(ID('xgy').innerHTML, xyToId(x, y))) + ' ></td></tr>').appendTo('#crop_fields');
                    } else if (data.data.tiles[49].c.match("{k.f6}")) {
                        $('<tr><td><img class="r4" src="img/x.gif" />15: </td><td><a href="position_details.php?x=' + x + '&y=' + y + '">' + data.data.tiles[49].t.split("<br")[0] + '</a></td>' + tbl + '<td>< ' + C(Distance(ID('xgy').innerHTML, xyToId(x, y))) + ' ></td></tr>').appendTo('#crop_fields');
                    };
                    var xs = ID('selectOT').selectedIndex;
                    if (ID('sO').checked == true || ID('xAll').checked == true) {
                        var xImg = '<td><img style="width: 15px;" id="1' + x + '_' + y + '1" onmouseout="return sHide();" src="data:image/gif;base64,R0lGODlhEQASANUAAPaMMv759fR6EvefUvV8FfzavPvNpfR2C/mydPq+i/V+GveaS/7x5feVQ//9+vzfxf7v4vWBHvV+GPq6hPaROfipZPWFJf7y6P/7+P738PrDlf/+/P717f3q2fR4D/3kz/aTPvWDI/vFlvWAHfrCk/V7FPmraPaJLfvLovaHKfmvcPWCH/V9F/3gyP/9/Pisa////vinYfifVf3jzPV/G/706vvInvzWtfrAjvq3f/WEI/aPN/3dwvvTsPWCIP///yH5BAAAAAAALAAAAAARABIAAAbRwJ9wSCwahbXW7XE5DjO4hiWkAyU4xw9F4PEBUoLD7lHspEo0xIfRMWxDn6FjQWCpIAnU5vcICRoOQgUKESMzDwMHKD8uCywCN0IqAis0BT8ZIQaYIAoEJgEYAxI+NDIFCTGBEworCg0MoqSlCicQGSYsEaUUEBsxBD7CJS8BFR67PiwyWBolK8IRFjsjyT4CJHs1JzQ+EREkHS+zNBYMQzYl3zotPyIs3thFOQQSCgsTADQsJSouRj1A0DhwwIMCCgZgOMHwQMMEDTwCOJlYJAgAOw%3D%3D" /></td>';
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
                        $('#1' + x + '_' + y + '1').bind('mouseover', function () { return getAnimInfo('position_details.php?x=' + x + '&y=' + y + '', '' + xyToId(x, y) + ''); });
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
            var img = {
                attack: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2wcGETotXvSOywAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAACI0lEQVQokW3Lz0uTcQDH8c/3eR5jublfkZZrTNuWUTktDULE6FJ2KfKUB1uSByMaj0H3/oJ67BJEoOJBuoV16hBkOJY/xqPo09A9OpvP1G26Z9uzZ25j+3YMoje8jm+Eo4d0XkrRpKoHKKX4n6RaDMxLKRqOHlJGL9WwtqtD3M6PZ/IlP/4po5UfibG8sLarQy9VwTSZWZ6rFRBJ6IgktDcZ7e+U0cr+iKIJEaVAuGoBjWaWJ5RSrG4m/CtbKUGtWqwXm+tpZ6t5DAAVY3khohSIlc2pHedPjfm8jkkOAHze5qmceoQlWZnYrnMSQojQYGCgHJVQzSlodZt5n9cxBQAMAKTlRf9Vt03s9lh5LbWD1VgWxQqFoZxEt8fGX3PbxVR0wQ8A3La82THzfvqVz8m5rj8I8PJ+AXvpGMJyC9pd5+A9rePbzOvwarzy++GIbYUVxt8e2BrPinPB5VvHueRg2tiJuLwOk4GFWjEgu/alf11O79wbHB5uu3Q5xAHAGVPF1Ww3WCRpExfaZtF3tw8cy0JamIW0IcNhr7c0GSsuAOAS0o9A8OsnQYomSLFEVUIY9WQx3sJyddiIFWP7B2lL9ojYjJ8/TvTcPrayN7y20NKvfVKrUTx78XLUc6Vrci64fFOnDdk7A4OPe3t7fi6Ggvf3DjVSyyn9XJkxoVqtYejJKO9t75oCAKPp+QDHnYDT5RIBfB8aeWqd/vBOKDFG/AFEDxKNtU2dSAAAAABJRU5ErkJggg%3D%3D',
                sendRes: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAMCAYAAAC5tzfZAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2wcGEgE3nWIm0AAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAABO0lEQVQokX2Qv0tCURTHP9efkFTLoyLQhtTASVpqFiJabGtrtf6AQKKtJaS9waHGBh3EhgYlAhch0DsVZBJmWEmkYA49sttg7+Uz6Tudc8/9cDgfoZTCyP7u9m/zk9brEy6hSCSzwnhzDAJrkXkLkE4VcAn+xDEMpFMFc+gP+LirPFi2ANiMQsoaR8eX+AM+mp0e9/UGuYsi5ZsO8VhUjYSKstqHy2W67Rc2N1ZZiSyzGJ5GV8ICikERAFe5QzU1G6DZqCBlDYDr27pFhm0UYCQcngMgFPRatpnQ+emBBTDqQfDPTZpm2v838VhU2QDOTvbU82PbMmw2Kpa+KKvoqm/evrTgVl+fOpl8iY9Om3FPj27nzfwsZc0063basYsheztb66r1rpv9xJiLUNDLjDZJJl9C8zhJJLPiG9UDhfU4C7tHAAAAAElFTkSuQmCC'
            };
            $.ajax({
                url: tserver,
                data: "cmd=viewTileDetails&x=" + x + "&y=" + y,
                dataType: "html",
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

                        $('<tr>' + html + '<td><a href="' + server_link + '/position_details.php?x=' + x + '&y=' + y + '">(' + x + '|' + y + ')</a></td><td>< ' + C(Distance(ID('xgy').innerHTML, xyToId(x, y))) + ' ></td><td><a href="build.php?t=5&gid=17&x=' + x + '&y=' + y + '"><img src="' + img.sendRes + '" /></a>&nbsp;<a href="build.php?id=39&tt=2&x=' + x + '&y=' + y + '"><img src="' + img.attack + '" /></a></td></tr>').appendTo('#elep_fields');

                    }
                    $('#ele_done').html(parseInt($('#ele_done').html()) + 1);
                    $('#percex').html(Math.round($('#ele_done').html() / $('#ele_tot').html() * 100) + '%')
                }
            });
        };
        function vACC_INFO() {
            for (i = 0; i < GM_getValue('t4v_length'); i++) {
                var vID = eval(GM_getValue('t4v_links'))[i]
                $('#villageList div:eq(1) ul li').eq(i).attr('value', vID);
                $('#villageList div:eq(1) ul li').hover(function () { gTimeD($('#xgy').html(), this.value); }, function () { sHide(); });
            };
        };
        function QuickSend() {
            var img = {
                attack: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2wcGETotXvSOywAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAACI0lEQVQokW3Lz0uTcQDH8c/3eR5jublfkZZrTNuWUTktDULE6FJ2KfKUB1uSByMaj0H3/oJ67BJEoOJBuoV16hBkOJY/xqPo09A9OpvP1G26Z9uzZ25j+3YMoje8jm+Eo4d0XkrRpKoHKKX4n6RaDMxLKRqOHlJGL9WwtqtD3M6PZ/IlP/4po5UfibG8sLarQy9VwTSZWZ6rFRBJ6IgktDcZ7e+U0cr+iKIJEaVAuGoBjWaWJ5RSrG4m/CtbKUGtWqwXm+tpZ6t5DAAVY3khohSIlc2pHedPjfm8jkkOAHze5qmceoQlWZnYrnMSQojQYGCgHJVQzSlodZt5n9cxBQAMAKTlRf9Vt03s9lh5LbWD1VgWxQqFoZxEt8fGX3PbxVR0wQ8A3La82THzfvqVz8m5rj8I8PJ+AXvpGMJyC9pd5+A9rePbzOvwarzy++GIbYUVxt8e2BrPinPB5VvHueRg2tiJuLwOk4GFWjEgu/alf11O79wbHB5uu3Q5xAHAGVPF1Ww3WCRpExfaZtF3tw8cy0JamIW0IcNhr7c0GSsuAOAS0o9A8OsnQYomSLFEVUIY9WQx3sJyddiIFWP7B2lL9ojYjJ8/TvTcPrayN7y20NKvfVKrUTx78XLUc6Vrci64fFOnDdk7A4OPe3t7fi6Ggvf3DjVSyyn9XJkxoVqtYejJKO9t75oCAKPp+QDHnYDT5RIBfB8aeWqd/vBOKDFG/AFEDxKNtU2dSAAAAABJRU5ErkJggg%3D%3D',
                sendRes: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAMCAYAAAC5tzfZAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2wcGEgE3nWIm0AAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAABO0lEQVQokX2Qv0tCURTHP9efkFTLoyLQhtTASVpqFiJabGtrtf6AQKKtJaS9waHGBh3EhgYlAhch0DsVZBJmWEmkYA49sttg7+Uz6Tudc8/9cDgfoZTCyP7u9m/zk9brEy6hSCSzwnhzDAJrkXkLkE4VcAn+xDEMpFMFc+gP+LirPFi2ANiMQsoaR8eX+AM+mp0e9/UGuYsi5ZsO8VhUjYSKstqHy2W67Rc2N1ZZiSyzGJ5GV8ICikERAFe5QzU1G6DZqCBlDYDr27pFhm0UYCQcngMgFPRatpnQ+emBBTDqQfDPTZpm2v838VhU2QDOTvbU82PbMmw2Kpa+KKvoqm/evrTgVl+fOpl8iY9Om3FPj27nzfwsZc0063basYsheztb66r1rpv9xJiLUNDLjDZJJl9C8zhJJLPiG9UDhfU4C7tHAAAAAElFTkSuQmCC'
            };
            var IMG_A = [], IMG_B = [], Aa = [], Bb = [], g_name = [], X = [], Y = [], _name = [], nlength = [], vlength = [], name = [];
            function vACC_SND() {
                //alert(GM_getValue('t4v_length'));
                for (i = 0; i < GM_getValue('t4v_length'); i++) {
                    var topA = '17';
                    var topB = '17';
                    if (i > 0) { topA = C(C(C(16) + C(i))); topA = C(C(C(16) + C(i))); };
                    var xStyleA = 'position: absolute; ' + dir + ': 24px; top: ' + topA + 'px; width: auto; cursor: pointer;';
                    var xStyleB = 'position: absolute; ' + dir + ': 9px; top: ' + topB + 'px; width: auto; cursor: pointer;';
                    var onclick_a = "location.href = 'build.php?id=39&tt=2&z=" + eval(GM_getValue('t4v_links'))[i] + "';";
                    var onclick_b = "location.href = 'build.php?t=5&gid=17&z=" + eval(GM_getValue('t4v_links'))[i] + "';";
                    var father = Create('span', { style: 'float: ' + dir + '; margin-top: -15.5px; position: absolute;' });

                    IMG_A[i] = Create('img', { id: 'QS(r' + i + ')', src: img.sendRes, style: xStyleB, onclick: onclick_b });
                    IMG_B[i] = Create('img', { id: 'QS(a' + i + ')', src: img.attack, style: xStyleA, onclick: onclick_a });

                    var send_res = IMG_A[i];
                    var send_arm = IMG_B[i];
                    father.appendChild(send_res);
                    father.appendChild(send_arm);
                    $(father).insertBefore($('#villageList div:eq(1) ul li').eq(i));
                    //xpath('//div[@id="villageList"]/div[2]/ul/li[' + (i + 1) + ']').snapshotItem(0).insertBefore(father, xpath('//div[@id="villageList"]/div[2]/ul/li[' + (i + 1) + ']').snapshotItem(0).firstChild);
                    ID('QS(r' + i + ')').style.top = ID('QS(a' + i + ')').style.top;
                };
            };
            function checkXY(XY) { if (/-\d+/.test(XY)) { return XY.toString().match(/-\d+/); } else { return XY.toString().match(/\d+/); }; };
            if (RTL == 'rtl') { dir = 'right'; } else if (RTL == 'ltr') { dir = 'left'; };
            if (!GM_getValue('t4v_length') && !GM_getValue('t4v_links') && !GM_getValue('t4v_names')) {
                $.get('http://' + window.location.hostname + '/nachrichten.php?t=6', function (ajax) {
                    var GM = $(ajax);
                    GM_setValue('t4v_length', GM.find('div#villageList div.list ul li').length);
                    for (i = 0; i < GM.find('div#villageList div.list ul li').length; i++) {

                        var topA = '17';
                        var topB = '17';
                        if (i > 0) { topA = C(C(C(16) + C(i))); topA = C(C(C(16) + C(i))); };
                        var xStyleA = 'position: absolute; ' + dir + ': 24px; top: ' + topA + 'px; width: auto; cursor: pointer;';
                        var xStyleB = 'position: absolute; ' + dir + ': 9px; top: ' + topB + 'px; width: auto; cursor: pointer;';
                        var get_xy = GM.find('div#villageList div.list ul li:eq(' + i + ') a:eq(0)').attr('title');

                        var cDiv = Create('div', { id: 'MyXY', style: 'display: none;' });
                        cDiv.innerHTML = get_xy;
                        $(cDiv).appendTo('#stime');

                        g_name = GM.find('div#villageList div.list ul li:eq(' + i + ') a:eq(0)').html();
                        Y[i] = ID('MyXY').getElementsByClassName('coordinateY')[0].innerHTML.replace(')', '').replace('(', '');
                        X[i] = ID('MyXY').getElementsByClassName('coordinateX')[0].innerHTML.replace(')', '').replace('(', '');

                        var onclick_a = "location.href = 'build.php?id=39&tt=2&z=" + xyToId(X[i], Y[i]) + "';";
                        var onclick_b = "location.href = 'build.php?t=5&gid=17&z=" + xyToId(X[i], Y[i]) + "';";
                        var father = Create('span', { style: 'float: ' + dir + '; margin-top: -15.5px; position: absolute;' });

                        nlength.push(GM.find('div#villageList div.list ul li:eq(' + i + ') a:eq(0)').html());
                        vlength.push(xyToId(X[i], Y[i]));
                        IMG_A[i] = Create('img', { id: 'QS(r' + i + ')', src: img.sendRes, style: xStyleB, onclick: onclick_b });
                        IMG_B[i] = Create('img', { id: 'QS(a' + i + ')', src: img.attack, style: xStyleA, onclick: onclick_a });

                        var send_res = IMG_A[i];
                        var send_arm = IMG_B[i];
                        father.appendChild(send_res);
                        father.appendChild(send_arm);
                        $(father).insertBefore($('#villageList div:eq(1) ul li').eq(i));
                        //xpath('//div[@id="villageList"]/div[2]/ul/li[' + (i + 1) + ']').snapshotItem(0).insertBefore(father, xpath('//div[@id="villageList"]/div[2]/ul/li[' + (i + 1) + ']').snapshotItem(0).firstChild);
                        ID('QS(r' + i + ')').style.top = ID('QS(a' + i + ')').style.top;
                        ID('MyXY').parentNode.removeChild(ID('MyXY'));
                    };
                    GM_setValue('t4v_links', uneval(vlength));
                    GM_setValue('t4v_names', uneval(nlength));
                });
            } else {
                vACC_SND();
            };
            $('#side_info .listing ul li').hover(function () { $(this).find('a').stop().animate({ 'font-size': '15px' }, "fast"); }, function () { $(this).find('a').stop().animate({ 'font-size': '13px' }, "fast"); });
        };
        function silver_info() {
            $('div#plusLink div#gs p.silver').hover(function () {
                if (!$(this).find('div#auction').html()) {
                    displayMSG('<b>...</b>');
                    $.get('hero_auction.php?action=accounting', function (travian) {
                        var html = '<div id="auction">' + $(travian).find('div#auction').html() + '</div>';
                        displayMSG(html);
                        $('div#plusLink div#gs p.silver').append('<span style="display: none;">' + html + '</span>');
                    });
                } else { displayMSG($(this).find('div#auction').html()); };
            }, function () { sHide(); });
        };
        function setup() {
            var pos; if (RTL == 'rtl') { pos = 'right'; } else { pos = 'left'; };
            var Setting = 'data:image/png;base64,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';
            var sIMG = Create('img', { src: Setting, id: 'setup', style: 'cursor:pointer;' });
            $(sIMG).bind('click', setting);
            $(sIMG).hover(function () { displayMSG('<font style="text-shadow: 2px 2px 3px white; font-weight: bold;">' + SubLanguage(LanguagePack(), '0') + '</font>'); }, function () { sHide(); });
            ID('t4tools').appendChild(sIMG);
        };

        NoteIMG = {
            nIMG: 'data:image/png;base64,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',
            Line: "data:image/gif;base64,R0lGODlhFwAQAIABAODg4AAAACH5BAEAAAEALAAAAAAXABAAQAIVjI+py+0Po5y02ouz3rxjAIbiSIIFADs%3D",
            Note: "data:image/gif;base64,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"
        };
        function NTPD() {
            function select() {
                function Test(v) { if (v == (null || '' || 'NaN') || isNaN(v)) { return 0; } else { return v } };
                var A = Test(GM_getValue('sel_co'));
                var B = Test(GM_getValue('sel_sh'));
                var C = Test(GM_getValue('sel_si'));
                var D = Test(GM_getValue('sel_te'));
                var E = Test(GM_getValue('sel_ty'));
                var AA = ID('sel_type').getElementsByTagName('b')[0];
                var BB = ID('sel_type').getElementsByTagName('i')[0];
                ID('sel_color').getElementsByTagName('option')[A].selected = 'selected';
                ID('sel_shadow').getElementsByTagName('option')[B].selected = 'selected';
                ID('sel_size').getElementsByTagName('option')[C].selected = 'selected';
                ID('sel_float').getElementsByTagName('option')[D].selected = 'selected';
                if (E == 'A') { AA.style.border = '1px solid red'; ID('notic').style.fontWeight = 'bold'; };
                if (E == 'B') { BB.style.border = '1px solid red'; ID('notic').style.fontStyle = 'italic'; }
                if (E == 'C') { AA.style.border = '1px solid red'; BB.style.border = '1px solid red'; }
                $('#sel_type b').bind('click', function () {
                    var AA = ID('sel_type').getElementsByTagName('b')[0];
                    var BB = ID('sel_type').getElementsByTagName('i')[0];
                    if (AA.getAttribute('style').toString().match('red')) { AA.style.border = '1px solid black'; ID('notic').style.fontWeight = ''; } else { AA.style.border = '1px solid red'; ID('notic').style.fontWeight = 'bold'; };
                    if (AA.style.border.toString().match('red') && BB.style.border.toString().match('red')) {
                        GM_setValue('sel_ty', 'C');
                    } else if (AA.style.border.toString().match('red') && !BB.style.border.toString().match('red')) {
                        GM_setValue('sel_ty', 'A');
                    } else if (!AA.style.border.toString().match('red') && BB.style.border.toString().match('red')) {
                        GM_setValue('sel_ty', 'B');
                    } else {
                        GM_setValue('sel_ty', 'null');
                    }
                });
                $('#sel_type i').bind('click', function () {
                    var AA = ID('sel_type').getElementsByTagName('b')[0];
                    var BB = ID('sel_type').getElementsByTagName('i')[0];
                    if (BB.getAttribute('style').toString().match('red')) { BB.style.border = '1px solid black'; ID('notic').style.fontStyle = ''; } else { BB.style.border = '1px solid red'; ID('notic').style.fontStyle = 'italic'; };
                    if (AA.style.border.toString().match('red') && BB.style.border.toString().match('red')) {
                        GM_setValue('sel_ty', 'C');
                    } else if (AA.style.border.toString().match('red') && !BB.style.border.toString().match('red')) {
                        GM_setValue('sel_ty', 'A');
                    } else if (!AA.style.border.toString().match('red') && BB.style.border.toString().match('red')) {
                        GM_setValue('sel_ty', 'B');
                    } else {
                        GM_setValue('sel_ty', 'null');
                    }
                });
            };
            if (GM_getValue('NoteText_style') && !(GM_getValue('NoteText_style') == null)) {
                ID('notic').setAttribute('style', GM_getValue('NoteText_style'));
            };
            if (ID('xblock').getAttribute('value') == '0' || !ID('xblock').getAttribute('value')) {
                ID('xblock').setAttribute('value', '1');
                $('div#xblock').fadeIn('slow');
                $('div#xblock div:eq(0) img:eq(0)').hover(function () { this.src = svnIMG(2); }, function () { this.src = svnIMG(1); });
                $('div#xblock div:eq(0) img:eq(0)').bind('click', function () { ID('xblock').setAttribute('value', '0'); $('div#xblock').fadeOut('slow'); });
                select();
            } else {
                ID('xblock').setAttribute('value', '0');
                $('div#xblock').fadeOut('slow');
            };
        };
        var pos;
        if (RTL == 'rtl') { pos = 'right' } else { pos = 'left' }
        var cIMG = Create('img', { src: NoteIMG.nIMG, alt: SubLanguage(LanguagePack(), '1') });
        $(cIMG).bind('click', function () { sh(); NTPD(); });
        $(cIMG).hover(function () { displayMSG('<font style="text-shadow: 2px 2px 3px white; font-weight: bold;">' + SubLanguage(LanguagePack(), '1') + '</font>'); }, function () { sHide(); });
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

        function mFullView() {/*

    
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
                        var table = Create('table', { cellspacing: '0', style: 'width:auto;' });
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
                        if (CLASS('xT4_Time')[i].innerHTML == '' || CLASS('xT4_Time')[i].innerHTML.match(/0:00:00:00/)) { } else {
                            CLASS('xT4_Time')[i].innerHTML = format(ReLoadTime(CLASS('xT4_Time')[i].innerHTML) - 1);
                            $(CLASS('xT4_Time')[i]).effect("highlight", {}, 999);
                        };
                    };
                    return setTimeout(RTM, 1000);
                };
                RTM();
            };
        };
        function VillageOverView() {
            function rTimeX() { if (CLASS('tr_Time1')[0]) { for (i = 0; i < CLASS('tr_Time1').length; i++) { if (CLASS('tr_Time1')[i].innerHTML == '0:00:00:00') { } else { CLASS('tr_Time1')[i].innerHTML = format(ReLoadTime(CLASS('tr_Time1')[i].innerHTML) - 1); } }; }; return setTimeout(rTimeX, 1000); };
            function RC(v) { return v.replace(',', '').replace(',', ''); };
            var bIMG = 'data:image/gif;base64,R0lGODlhCgAQALMIACQQB3d0lM+EGH8zDtXT5MC/0kxMV4+Mr////wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAgALAAAAAAKABAAAAQxEMmJxKDTAlzHxhrXGSJSBKR4ptSBHEbREkY9F/B97OlB4LucD8iT/II5CdI2qTEpEQA7';
            var refr = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAuJJREFUeNqkU8lPE1EY/6ad6dAOSwttLcUolIrAASPVWEncIulBjVESl+jZg4l/ggdvnkz06EU8FA9iNMaIYvRgmhASUw2NQJQuLBZZOixtp515s/k9iojRxIOT/ObNm2/9fQtjmib8z8PS14n+pft4hP4ijyNuIzhEEYOJhq4TTdNAU9VfDnRdj4Fphi5F/CFFqWTEsgw8eTcP54837hbXiSebk8nsQlkydJhA8fefESz0hd6i6HV4YGg2ziAlqaCCIutAI6nEYATO6gv6HLvPHPZ02lgzgsECvzlQFcUPhtZzOuwN5ZYkqKoCIIqKxgQG32YKo+OL1VJZCa6KcmvkgHs/A/pF0zCcSGczA0L6mr18ML9SwtRNePRyKm5D1pqiACrF57Lrb17FZsqySgLikhTc5ea70OaIjnXYqAFRlJ6GaraeRk1kxBTeRx8+m6jkiE4sFuYjMvMlpnLdHf7ane4aVkGdYyh9UaEgy21WC+PQTANSmeU1XdNuYPS7iHi5WITC6hrNciidWeZRpwl1A2hzELGVgVTWjLyqmRvfRgmpcFwU+xFFCrTFMSmfj1pZVpA0s5YDg+oJW20ksvxhuSDX6gzLe9yCkp3LncLIQxzPw+Z8UIR9vjqnKBtgBbWENl+3d+H97DdxUgQu7WppwlqRozg03TJmgjI42dcTwjPs7mxtRR2Yy4oreB+hsooDQmLTX2YSVU4hmbUK6UBv2F6zwxXBWoQwVUiVGNh3oTeULFvAEOyQHJ9Oos1TOo0bDpDnmlwsPY4PDn9y1NlT83xd0jwULjZePleDxYN1Kw9jBSu46h0wFn0eJ5JEo88XX9+q1KAwcAUs3va0svds+fODUqezLSBAS7NN8ftMOkwGDoXdYsKCAdBx/Wooca+fmk1qixNRhm4jwzD0B62qh7G7GsDTLkC1n2NI3gBv1zVo2NP2x5qJU5PGyJ2b2x3YEA6EHcH8Y4vpxmm0fD8EGADFhK0+biwMlwAAAABJRU5ErkJggg%3D%3D';
            refIMG = '<img src="' + refr + '" style="cursor: pointer; padding-left: 2px; padding-right: 2px;" id="refr" />';

            var vgs = $('#overview td:eq(0)').html(), mer = $('#overview td:eq(1)').html(), build = $('#overview td:eq(2)').html(), trps = $('#overview td:eq(3)').html();

            var HTML_RES_A = '<table cellspacing="0" style="width: 95%; display: none;" id="acc_r1"><thead><tr><td>' + vgs + '</td><td><img src="img/x.gif" class="r1" /></td><td><img src="img/x.gif" class="r2" /></td><td><img src="img/x.gif" class="r3" /></td><td><img src="img/x.gif" class="r4" /></td><td></td><td><img src="img/x.gif" class="r0" /></td><td></td><td><img src="img/x.gif" class="r5" /></td></tr></thead><tbody id="view_a"></tbody><tfoot><tr><td colspan="9"></td></tr><td>' + $("#content div.container:eq(1) span.tabItem").html() + ':</td><td id="cr1">0</td><td id="cr2">0</td><td id="cr3">0</td><td id="cr4">0</td><td></td><td id="cr5">0</td><td></td><td id="cr6">0</td></tfoot></table>';
            var HTML_RES_B = '<table cellspacing="0" style="width: 95%; display: none;" id="acc_r2"><thead><tr><td>' + vgs + '</td><td><img src="img/x.gif" class="r1" /></td><td><img src="img/x.gif" class="r2" /></td><td><img src="img/x.gif" class="r3" /></td><td><img src="img/x.gif" class="clock" /></td><td><img src="img/x.gif" class="r4" /></td><td><img src="img/x.gif" class="clock" /></td></tr></thead><tbody id="view_b"></tbody></table>';
            var HTML_INFO = '<table cellspacing="0" style="width: 95%; display: none;" id="acc_r3"><thead><tr><td>' + vgs + '</td><td>' + mer + '</td><td>' + build + '</td><td>' + trps + '</td></tr></thead><tbody id="view_c"></tbody></table>';

            $('<br><div align="center" style="border: 1px solid silver; border-radius: 5px;"><div>' + refIMG + ' | <a href="javascript:void(0)" id="view_r0" style="color: blue; text-decoration: underline;">' + $("#content div.container:eq(0)").text() + '</a> | <a href="javascript:void(0)" id="view_rA">' + $("#content div.container:eq(1)").text() + '</a> | <a href="javascript:void(0)" id="view_rB">' + $("#content div.container:eq(2)").text() + '</a></div><br>' + HTML_INFO + HTML_RES_A + HTML_RES_B + '<br></div>').appendTo($('#content'));
            var getTR = ID('overview').getElementsByTagName('tbody')[0].getElementsByTagName('tr').length;
            $('img#refr').bind('click', function () { ID('refr').style.display = 'none'; NewView(getTR, 'each'); });
            var getLinks;
            $('<b style="color: red; cursor: pointer; text-shadow: 0px 0px 2px red; float: left;" id="sVilg">(--)</b>').appendTo('#content table#overview thead td:eq(0)');
            $('#sVilg').bind('click', function () {
                if (this.style.color == 'red')
                { this.style.textShadow = '0px 0px 2px blue'; ID('overview').getElementsByTagName('tbody')[0].style.display = 'none'; this.style.color = 'blue'; $(this).html('(++)'); } else
                { this.style.textShadow = '0px 0px 2px red'; ID('overview').getElementsByTagName('tbody')[0].removeAttribute('style'); this.style.color = 'red'; $(this).html('(--)'); };
            });
            var get_Resource = [], less_R = [], prod_A = [], res_l = [], perc = [], timA = [], timB = [], vName = '', cALL = 0, num = 0, troops = [], time = [], text = [], img = [], xHTML = [], bd, bd_h, bd_t, trp = [], xtrp = [], tp = [], nx = 0;
            function NewView(x, type) {
                for (var num = 0; num < x; num++) {
                    if (num == 0) {
                        for (i = 0; i < 5; i++) { ID('cr' + (i + 1)).innerHTML = 0; };
                        ID('cr6').innerHTML = 0;
                    };
                    if (type) { ID('refr').style.display = 'none'; };
                    getLinks = $('table#overview tbody tr:eq(' + num + ') a:eq(0)').attr('href');
                    $.get(getLinks, function (data) {
                        for (i = 0; i < 5; i++) {
                            get_Resource[i] = C($(data).find('#l' + (i + 1)).html().split('/')[0]);
                            if (i !== 4) {
                                perc[i] = Math.round($(data).find('#l' + (i + 1)).html().split('/')[0] / $(data).find('#l' + (i + 1)).html().split('/')[1] * 100);
                                if (perc[i] >= 90) { perc[i] = '<font color="red" class="pr_red">' + perc[i] + '%</font>'; };
                                if ((perc[i] >= 80) && (perc[i] <= 89)) { perc[i] = '<font color="orange" class="pr_orange">' + perc[i] + '%</font>'; };
                                if ((perc[i] >= 70) && (perc[i] <= 79)) { perc[i] = '<font color="green">' + perc[i] + '%</font>'; }
                                else if (perc[i] <= 69) { perc[i] = perc[i] + '%'; };
                                less_R[i] = C(C($(data).find('#l' + (i + 1)).html().split('/')[0]) - C($(data).find('#l' + (i + 1)).html().split('/')[1]));
                                prod_A[i] = $(data).find('table#production tbody tr:eq(' + i + ') td:eq(2)').html();
                            };
                            if (i == 4) {
                                ID('cr6').innerHTML = C(C(ID('cr6').innerHTML) + get_Resource[4]);
                            } else { ID('cr' + (i + 1)).innerHTML = MakeNum(C(C(ID('cr' + (i + 1)).innerHTML.replace(',', '').replace(',', '')) + get_Resource[i])); };
                        };

                        function getLess(rA, rB, rC, pA, pB, pC) {
                            var xx, yy, zz, tt, re;
                            xx = pTime('' + Time(rA, (pA / 3600)) + '', 'sec');
                            yy = pTime('' + Time(rB, (pB / 3600)) + '', 'sec');
                            zz = pTime('' + Time(rC, (pC / 3600)) + '', 'sec');
                            if (xx < (yy && zz)) { re = pTime('' + xx + '', 'time') };
                            if (yy < (xx && zz)) { re = pTime('' + yy + '', 'time') };
                            if (zz < (yy && xx)) { re = pTime('' + zz + '', 'time') };
                            return re;
                        };
                        timA[0] = getLess(less_R[0], less_R[1], less_R[2], prod_A[0], prod_A[1], prod_A[2]);
                        timB[0] = Time(less_R[3], pro[3]);
                        if ($(data).find('#movements img').parent().html()) {
                            troops, text = [], time = [], xHTML, accTR = '', img = [];
                            accTR = '<span id="t4_TBL" style="cursor: default;" onmouseover="displayMSG(FindNext(this).innerHTML); this.firstChild.title = null;" onmouseout="sHide();">';
                            xHTML = '<span style="display: none;" class="t4_TBL"><table cellspacing="1" class="acc_tbl">';
                            for (g = 0; g < $(data).find('#movements tbody img').length; g++) {
                                accTR = accTR + '' + $(data).find('#movements tbody img:eq(' + g + ')').parent().html() + '&nbsp;';
                                img[g] = $(data).find('#movements tbody img:eq(' + g + ')').parent().html();
                                text[g] = $(data).find('#movements tbody tr:eq(' + (g + 1) + ') div.mov').html();
                                time[g] = $(data).find('#movements tbody tr:eq(' + (g + 1) + ') span[id*="timer"]').html();
                                xHTML = xHTML + '<tr><td>' + img[g] + '</td><td>' + text[g] + '</td><td class="tr_Time1">0:' + time[g] + '</td></tr>';
                            };
                            troops = accTR + '</span>';
                            xHTML = xHTML + '</table></span>';
                        } else { troops = '<font color="gray">-</font>'; xHTML = ''; time = ''; text = ''; };
                        if ($(data).find('#troops img').parent().html()) {
                            xtrp = '', tp = '', trp = '';
                            tp = '<font color="blue" style="text-decoration: underline; cursor: default;" onmouseover="displayMSG(this.getElementsByTagName(\'span\')[0].innerHTML); this.firstChild.title = null;" onmouseout="sHide();">' + $(data).find('#troops thead tr th').html().replace(':', '') + '</span>';
                            xtrp = '<span style="display: none;"><table cellspacing="1" class="acc_tbl"><tbody>';
                            for (x = 0; x < $(data).find('#troops img').length; x++) {
                                trp = trp + '<tr><td>' + $(data).find('#troops img:eq(' + x + ')').parent().html() + '</td><td>' + $(data).find('#troops img:eq(' + x + ')').parent().parent().next().html() + '</td><td>' + $(data).find('#troops img:eq(' + x + ')').parent().parent().next().next().html() + '</td></tr>';
                            };
                            xtrp = xtrp + trp + '</tbody></table></span>';
                        } else { tp = '<font color="gray">-</font>'; xtrp = ''; };
                        if ($(data).find('#building_contract img') && $(data).find('#building_contract thead tr th').html()) {
                            bd = '<span onmouseover="displayMSG(FindNext(this).innerHTML);" onmouseout="sHide();" style="cursor: default;"><img src="' + bIMG + '" />';
                            bd_h = '<span style="display: none;"><table cellspacing="1" class="acc_tbl"><thead><tr><td colspan="3">' + $(data).find('#building_contract thead tr th').html().split(":")[0] + ':</td></tr></thead><tbody>';
                            for (x = 0; x < $(data).find('#building_contract tbody tr').length; x++) {
                                if (!x == 0) { bd = bd + '&nbsp;<img src="' + bIMG + '" />'; };
                                bd_h = bd_h + '<tr><td>' + $(data).find('#building_contract tbody tr:eq(' + x + ') td:eq(1)').html() + '</td><td><span class="tr_Time1">0:' + $(data).find('#building_contract tbody tr:eq(' + x + ') td:eq(2) span').html() + '</span></td></tr>';
                            };
                            bd = bd + '</span>';
                            bd_h = bd_h + '</tbody></table></span>';
                        } else { bd = '<font color="gray">-</font>', bd_h = ''; };
                        cALL = C(get_Resource[0] + get_Resource[1] + get_Resource[2] + get_Resource[3]);
                        ID('cr5').innerHTML = MakeNum(C(C(ID('cr5').innerHTML.replace(',', '').replace(',', '')) + cALL));
                        vName = $(data).find('#villageList .list ul .active').html();
                        vHref = $(vName).attr('href');
                        vName = $(data).find('#villageList .list ul .active').removeAttr('title').attr('href', 'dorf1.php' + vHref).html();
                        /*if (type == 'each') {
                        $('#view_a tr:eq(' + num + ')').html('<td>' + vName + '</td><td>' + MakeNum(get_Resource[0]) + '</td><td>' + MakeNum(get_Resource[1]) + '</td><td>' + MakeNum(get_Resource[2]) + '</td><td>' + MakeNum(get_Resource[3]) + '</td><td></td><td>' + MakeNum(cALL) + '</td><td></td><td>' + MakeNum(get_Resource[4]) + '</td>');
                        $('#view_b tr:eq(' + num + ')').html('<td>' + vName + '</td><td>' + perc[0] + '</td><td>' + perc[1] + '</td><td>' + perc[2] + '</td><td class="tr_Time1">' + timA[0] + '</td><td>' + perc[3] + '</td><td class="tr_Time1">' + timB[0] + '</td>');
                        $('#view_c tr:eq(' + num + ')').html('<td>' + vName + '</td><td class="acc_x">' + troops + '' + xHTML + '</td><td>' + bd + '' + bd_h + '</td><td>' + tp + '' + xtrp + '</td>');
                        } else {*/
                        if (type == 'each') {
                            if (ID('MXL_a' + num + '')) { ID('MXL_a' + num + '').parentNode.removeChild(ID('MXL_a' + num + '')); };
                            if (ID('MXL_b' + num + '')) { ID('MXL_b' + num + '').parentNode.removeChild(ID('MXL_b' + num + '')); };
                            if (ID('MXL_c' + num + '')) { ID('MXL_c' + num + '').parentNode.removeChild(ID('MXL_c' + num + '')); };
                        };
                        $('<tr id="MXL_a' + num + '"><td>' + vName + '</td><td>' + MakeNum(get_Resource[0]) + '</td><td>' + MakeNum(get_Resource[1]) + '</td><td>' + MakeNum(get_Resource[2]) + '</td><td>' + MakeNum(get_Resource[3]) + '</td><td></td><td>' + MakeNum(cALL) + '</td><td></td><td>' + MakeNum(get_Resource[4]) + '</td></tr>').appendTo('#view_a');
                        $('<tr id="MXL_b' + num + '"><td>' + vName + '</td><td>' + perc[0] + '</td><td>' + perc[1] + '</td><td>' + perc[2] + '</td><td class="tr_Time1">' + timA[0] + '</td><td>' + perc[3] + '</td><td class="tr_Time1">' + timB[0] + '</td></tr>').appendTo('#view_b');
                        $('<tr id="MXL_c' + num + '"><td>' + vName + '</td><td class="acc_x">' + troops + '' + xHTML + '</td><td>' + bd + '' + bd_h + '</td><td>' + tp + '' + xtrp + '</td><tr>').appendTo('#view_c');
                        //};
                        function acc() {
                            $(".pr_red").animate({ 'color': 'red' }, 'slow', function () { $(".pr_red").animate({ 'color': 'black' }, 'fast'); });
                            $(".pr_orange").animate({ 'color': 'orange' }, 'slow', function () { $(".pr_orange").animate({ 'color': 'black' }, 'fast'); });
                            return setTimeout(acc, 2000);
                        };
                        acc();
                        function sh_refr() {
                            ID('refr').style.display = null;
                        };
                        setTimeout(sh_refr, 2000);
                    });
                };
            };
            NewView(getTR);
            setTimeout(function () { ID('acc_r3').style.display = 'block'; }, 1000);
            $('#view_rA').bind('click', function () { $('#view_rA').attr('style', 'color: blue; text-decoration: underline;'); $('#view_r0').removeAttr('style'); $('#view_rB').removeAttr('style'); ID('acc_r1').style.display = 'block'; ID('acc_r2').style.display = 'none'; ID('acc_r3').style.display = 'none'; });
            $('#view_rB').bind('click', function () { $('#view_rB').attr('style', 'color: blue; text-decoration: underline;'); $('#view_rA').removeAttr('style'); $('#view_r0').removeAttr('style'); ID('acc_r2').style.display = 'block'; ID('acc_r1').style.display = 'none'; ID('acc_r3').style.display = 'none'; });
            $('#view_r0').bind('click', function () { $('#view_r0').attr('style', 'color: blue; text-decoration: underline;'); $('#view_rA').removeAttr('style'); $('#view_rB').removeAttr('style'); ID('acc_r3').style.display = 'block'; ID('acc_r2').style.display = 'none'; ID('acc_r1').style.display = 'none'; });
            rTimeX();
            /*var src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAuJJREFUeNqkU8lPE1EY/6ad6dAOSwttLcUolIrAASPVWEncIulBjVESl+jZg4l/ggdvnkz06EU8FA9iNMaIYvRgmhASUw2NQJQuLBZZOixtp515s/k9iojRxIOT/ObNm2/9fQtjmib8z8PS14n+pft4hP4ijyNuIzhEEYOJhq4TTdNAU9VfDnRdj4Fphi5F/CFFqWTEsgw8eTcP54837hbXiSebk8nsQlkydJhA8fefESz0hd6i6HV4YGg2ziAlqaCCIutAI6nEYATO6gv6HLvPHPZ02lgzgsECvzlQFcUPhtZzOuwN5ZYkqKoCIIqKxgQG32YKo+OL1VJZCa6KcmvkgHs/A/pF0zCcSGczA0L6mr18ML9SwtRNePRyKm5D1pqiACrF57Lrb17FZsqySgLikhTc5ea70OaIjnXYqAFRlJ6GaraeRk1kxBTeRx8+m6jkiE4sFuYjMvMlpnLdHf7ane4aVkGdYyh9UaEgy21WC+PQTANSmeU1XdNuYPS7iHi5WITC6hrNciidWeZRpwl1A2hzELGVgVTWjLyqmRvfRgmpcFwU+xFFCrTFMSmfj1pZVpA0s5YDg+oJW20ksvxhuSDX6gzLe9yCkp3LncLIQxzPw+Z8UIR9vjqnKBtgBbWENl+3d+H97DdxUgQu7WppwlqRozg03TJmgjI42dcTwjPs7mxtRR2Yy4oreB+hsooDQmLTX2YSVU4hmbUK6UBv2F6zwxXBWoQwVUiVGNh3oTeULFvAEOyQHJ9Oos1TOo0bDpDnmlwsPY4PDn9y1NlT83xd0jwULjZePleDxYN1Kw9jBSu46h0wFn0eJ5JEo88XX9+q1KAwcAUs3va0svds+fODUqezLSBAS7NN8ftMOkwGDoXdYsKCAdBx/Wooca+fmk1qixNRhm4jwzD0B62qh7G7GsDTLkC1n2NI3gBv1zVo2NP2x5qJU5PGyJ2b2x3YEA6EHcH8Y4vpxmm0fD8EGADFhK0+biwMlwAAAABJRU5ErkJggg%3D%3D';
            var img = Create('img');
            img.src = src;
            ID('overview').getElementsByTagName('td')[0].appendChild(img);*/
        };
        function ViewMessege() {
            if (exp(/nachrichten\b[^>]*php/)) {
                IMG_open = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFPBSgJRFD3WLALbjDomiBYWVESLmIqMkSyiTVCbFn1BLfydXNQPFLRuE5IIUhBMrSQhkjAEzanZ5EIdtXffzDgOZBuF49z7zjuHM/fN8/R6PYzyE04vVHqmZFk+Zk/FWs8zXDGkrT7F4OJVVeW8wP6ykiQlD+aB0KTJVn+gvH1DKdRxRv2SBMz63Hy5LCn1ev1ojPXJaDSKoBe4zqjIqCVUPnXEI8BuzBRQTWvE0R7aSxrSCp1OBwSjO47Dbbn/bkYXrnp5WgQIVm/rBMMw0G63ucFNToUoihyLEdFl8PKhQ9dN7G/JpoZpBSo4uhPYSzgJ2gMJqJ4LM8Ow2O9tHTdotVowOsDdvZNgJjSQgHHvVSfBzqbMNdyAilazyV0TG8MThIMih92ThrQ8QZMSsMWHRyfBVMA9g5rmJIivy1zjJLAM1laHn4LfJ3LYva3rD7H7zxf9F+caIuEy94rKV4OTYb8XC+wYV2IB3j+XNBTZMQ7yfQM6y1qthmJRR6Nhbih6vXhic7gNmAaapvF3H+RpTqT1yCfnWbZWsC5P3kqoWJcnZfXpIfySZ9Tr/CvAAFL4JRqBf1s8AAAAAElFTkSuQmCC';
                if (xpath('//table[@id="overview"]/tbody//td[@class="noData"]').snapshotItem(0)) { } else {
                    if (xpath('//table[@id="overview"]/thead/tr/th').snapshotItem(0)) {
                        xpath('//table[@id="overview"]/thead/tr/th').snapshotItem(0).setAttribute('colspan', '3');
                        for (c = 0; c < xpath('//table[@id="overview"]/tbody/tr').snapshotLength; c++) {
                            var Target = xpath('//table[@id="overview"]/tbody/tr[' + (c + 1) + ']/td[3]').snapshotItem(0);
                            var td = Create('td', { class: 'sel' });
                            var a = Create('a', { href: 'javascript:void(0)' });
                            var image = Create('img', { src: IMG_open, onclick: 'XMLGetM(' + (c + 1) + '); return false;' });
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

                if (xpath('//table[@id="overview"]/tbody//td[@class="noData"]').snapshotItem(0) || exp(/berichte.php\b[^>]?t=5/)) { } else {
                    if (xpath('//table[@id="overview"]/thead/tr/th').snapshotItem(0)) {
                        xpath('//table[@id="overview"]/thead/tr/th').snapshotItem(0).setAttribute('colspan', '3');
                        for (c = 0; c < xpath('//table[@id="overview"]/tbody/tr').snapshotLength; c++) {
                            var Target = xpath('//table[@id="overview"]/tbody/tr[' + (c + 1) + ']/td[3]').snapshotItem(0);
                            var td = Create('td', { class: 'sel' });
                            var a = Create('a', { href: 'javascript:void(0)' });
                            var image = Create('img', { src: IMG_open, onclick: 'XMLGetR(' + (c + 1) + '); return false;' });
                            a.appendChild(image);
                            td.appendChild(a);
                            Target.parentNode.insertBefore(td, Target);
                        };
                    };
                };
            };
        };
        function Show_Help_Links() { // الروابط المساعدة
            var x = getPosition('hlink', '300px_300px').split('_')[1];
            var y = getPosition('hlink', '300px_300px').split('_')[0];
            $('' +
'<div id="hlink" style="position: absolute; left: ' + x + '; top: ' + y + '; z-index:10000; width:auto;"><h1>' + SubLanguage(LanguagePack(), 12) + '</b>:</h1><ul>' +
'<li><a href="http://travianprogram.blogspot.com" target="_blank">Travian Program ve Taktikleri</a></li>' +
'<li><a href="http://travian.kirilloid.ru/villages_res.php" target="_blank">' + SubLanguage(LanguagePack(), 13) + '</a></li>' +
'<li><a href="http://travian.kirilloid.ru/warsim2.php" target="_blank">' + SubLanguage(LanguagePack(), 14) + '</a></li>' +
'<li><a href="http://travian.kirilloid.ru/distance.php" target="_blank">' + SubLanguage(LanguagePack(), 15) + '</a></li>' +
'<li><a href="http://www.traviantoolbox.com/" target="_blank">Travian Toolbox</a></li>' +
'<li><a href="http://travmap.shishnet.org" target="_blank">TravMap</a></li>' +
'<li><a href="http://travian-live.com/" target="_blank">Travian-Live</a></li>' +
'</ul></div>').appendTo(document.body);
            MakeDrag(ID('hlink').getElementsByTagName('h1')[0], ID('hlink'));
            $('#hlink a').hover(function () { $(this).stop().animate({ "color": "red" }, "medium"); }, function () { $(this).stop().animate({ "color": "#555555" }, "medium"); });
        };
        $(ID('xCoordInput')).bind('keyup', AttackDist);
        $(ID('yCoordInput')).bind('keyup', AttackDist);
        function AttackDist() {
            var x, y, aID, bID;
            x = ID('xCoordInput').value;
            y = ID('yCoordInput').value;
            aID = MyId();
            bID = xyToId(x, y);
            if (y.match(/\d+/) && x.match(/\d+/)) { gTimeD(aID, bID, 'Dist'); };
        };
        function AttackInfo() {
            for (i = 0; i < 10; i++) {
                $(document.getElementsByName('t' + (i + 1))[0]).bind('change', OnChange);
                $(document.getElementsByName('t' + (i + 1))[0]).bind('keyup', OnChange);
                $(FindNext(document.getElementsByName('t' + (i + 1))[0])).bind('mouseup', function () { setTimeout(OnChange, 250) });
            };

            var HTML = '<table style="width: auto;" cellspacing="1"><tbody><tr><td>' +
    '<table cellspacing="1" bgcolor="silver" style="width: auto;" id="TrXw">' +
'<tbody>' +
'<tr>' +
'<td colspan="2"><img src="' + imgatti + '">×<span id="xtr[1]">0</span></td>' +
'<td colspan="2"><img src="' + imgattc + '">×<span id="xtrs[1]">0</span></td></tr>' +
'<tr><td colspan="2"><img src="img/x.gif" class="def_i">×<span id="xtr[2]">0</span></td>' +
'<td colspan="2"><img src="img/x.gif" class="def_c">×<span id="xtr[3]">0</span></td></tr>' +
'<tr><td colspan="2"><img class="carry full" src="img/x.gif">×<span id="xtr[4]">0</span></td>' +
'<td colspan="2"><img class="r5" src="img/x.gif">×<span id="xtr[5]">0</span></td></tr></tbody></table>' +
'</td><td><table cellspacing="1" bgcolor="silver" style="width: auto;" id="TrXs"><tbody><tr>' +
'<td><img class="r1" src="img/x.gif">×<span id="xtr[6]">0</span></td></tr><tr>' +
'<td><img class="r2" src="img/x.gif">×<span id="xtr[7]">0</span></td></tr><tr>' +
'<td><img class="r3" src="img/x.gif">×<span id="xtr[8]">0</span></td></tr><tr>' +
'<td><img class="r4" src="img/x.gif">×<span id="xtr[9]">0</span></td>' +
'</tr>' +
'</tbody></table></td></tr></tbody></table><br>';
            $(HTML).insertBefore($('.destination'));

        };
        function BuildingView() {
            if (exp(/dorf2\b[^>]*php/) && ID('village_map')) {
                var IMG = function (cName) { return '<img src="img/x.gif" alt="' + CLASS('r' + cName)[0].getAttribute("alt") + '" title="' + CLASS('r' + cName)[0].getAttribute("title") + '" class="r' + cName + '" />'; };
                var PN = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2wgdChYDrijjdAAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAACU0lEQVQ4jZ2SsU8TARTGf3ft9XrXEgoBi6IWBasxRCcTFWKCMQwmGkcTHfwD/BccTBiYSGR2McbowoKbkYWBGAOBhGpIBKGlyF1p6bX0ene9a88BKGIZjN/08vLe73358gRfG/f5Ty3MTRE8LApmEoCwEABAz5WZ+bpDXWzw6G4/bWERgIAiAzA01A+wDwA4c64LJRSiZjnUXRE9V2Y4qTDxZol0psirl6OEFBmrViNQPzItHhbp1QJW2SXc3olu1PG0Mk9G+nl2q5eZ+Szvp1PsGjax7ihypLl25ODj53VU+ScBSUXTitxLSGyvFejpbqPhVJidzdAIhnn84BJWvsTFvp7jgKWVIooqYVUNMls5rrafB2B500CUo+imxeKiRn6rhFmxeTt85TgAwKq6JOIKiXiC17ObZNIGyxkTOejx96GWDBRVIhFXANguugDcud3H5PMbPBzsoVBy6FQFng6dYiB2BGg68C2Ts70x1rImWnaXd2Oj3Lw/CHsWI990ym4A3TARk1GuX4i2Ai53RGkTRAzbpSsWAqBmRankHbIl6yCPCrm8w6Nr3a2A0zEFPFgr2EQkgReTX+j78J0Ns0YqaxBXJNqDAoWqy/yPUiugKgqs5vfwBDBdn5Vdm1TRxvEgEgAJAftg1hVPyOBTaps9T0SVZIqWA4AcBFkQ8RqQrXgExf0P/GXWWgG65TLYESaiSHTGO9jcsUmly9j1AILoHh/+Q82eKskYdgNwGRsZIJmIMDW3zsT0BhDCxUev1HH8BlSrTYDga+P+wtzUCex/02+Ma/vfRtDi1QAAAABJRU5ErkJggg==';
                var Div = Create('div');
                Div.align = 'center';
                var Table = Create('table', { cellspacing: '4', style: 'border-collapse: collapse; width: auto; background-color: transparent; z-index: 10000;box-shadow: 0px 0px 10px 3px black;' });
                var Tbody = Create('tbody');
                Tbody.innerHTML = '<tr id="bList[1]"></tr><tr id="bList[2]"></tr><tr id="bList[3]"></tr><tr id="bList[4]"></tr><tr id="bList[5]"></tr><tr id="bList[6]"></tr><tr id="bList[7]"></tr>';
                Table.appendChild(Tbody);
                Div.appendChild(Table);
                ID('mid').appendChild(Div);
                for (i = 0; i < xpath('//div[@id="village_map"]/img[contains(@class, "building g")]').snapshotLength; i++) {
                    var TypeName = xpath('//div[@id="village_map"]/img[contains(@class, "building g")]').snapshotItem(i).className.match(/\d+/g);
                    var ImageClass = xpath('//div[@id="village_map"]/img[contains(@class, "building g")]').snapshotItem(i).className;
                    var Level = xpath('//div[@id="village_map"]/img[contains(@class, "building g")]').snapshotItem(i).getAttribute('alt').split('</span>')[0].split('>')[1].match(/\d+/g);
                    var Name = xpath('//div[@id="village_map"]/img[contains(@class, "building g")]').snapshotItem(i).getAttribute('alt').split('</span>')[0].replace(/<span\b[^>]*>/, '');

                    var Color = [];
                    var TypeU;
                    var CountTime = [];
                    var img = [];
                    var available = '';
                    if (bCost[TypeName]) {
                        if (bCost[TypeName][Level]) {
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
        };
        function ViewCropFind() { $('#Searcher').append(CCDC()); setTimeout(function () { ID('crop_x').value = ID('xgy').getAttribute('value'); ID('crop_y').value = ID('xgy').getAttribute('class'); }, 500); ID('cFinderX').addEventListener('click', SearchCropFields, true); };
        function ViewElphFind() { $('#Searcher').append(CEDC()); setTimeout(function () { ID('elep_x').value = ID('xgy').getAttribute('value'); ID('elep_y').value = ID('xgy').getAttribute('class'); }, 500); ID('cElphantX').addEventListener('click', SearchElephants, true); };

        function xbt() {
            if (CLASS('xbTime')[0]) {
                for (i = 0; i < CLASS('xbTime').length; i++) {
                    if (CLASS('xbTime')[i].innerHTML == '' || CLASS('xbTime')[i].innerHTML == ('0:00:00:00' || '00:00:00' || '0:00:00')) {
                    } else {
                        CLASS('xbTime')[i].innerHTML = format(ReLoadTime(CLASS('xbTime')[i].innerHTML) - 1);
                    };
                };
            };
            return setTimeout(xbt, 1000);
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
                            if (xpath('//td[@class="report_content"]/table[2]/tbody[2]/tr/td[' + (i + 1) + ']').snapshotItem(0).innerHTML.match(/\d/)) {
                                Def_B[i] = xpath('//td[@class="report_content"]/table[2]/tbody[2]/tr/td[' + (i + 1) + ']').snapshotItem(0).innerHTML;
                            } else { Def_B[i] = 0; };
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
            var links = xpath('//a[contains(@href, "karte.php?d=")]').snapshotLength;
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
            var spn = [];
            for (j = 0; j < links; j++) {
                xLink[j] = xpath('//a[contains(@href, "karte.php?d=")]').snapshotItem(j);
                if (xLink[j].parentNode.parentNode.parentNode.id != "tbody_links") {
                    spn[j] = Create('span');
                    alink[j] = Create('a', { href: 'build.php?id=39&tt=2&z=' + xLink[j].href.split('=')[1] });
                    IMG_A[j] = Create('img', { src: Send_attack, onmouseover: "displayMSG('<b>" + SubLanguage(LanguagePack(), 6) + " " + xLink[j].innerHTML + "</b>');", onmouseout: 'sHide();' });

                    rlink[j] = Create('a', { href: 'build.php?t=5&z=' + xLink[j].href.split('=')[1] + '&gid=17' });
                    IMG_B[j] = Create('img', { src: Send_resource, onmouseover: "displayMSG('<b>" + SubLanguage(LanguagePack(), 5) + " " + xLink[j].innerHTML + "</b>');", onmouseout: 'sHide();' });

                    appThis(rlink[j], [IMG_B[j]]);
                    appThis(alink[j], [IMG_A[j]]);
                    appThis(spn[j], [cData(' '), rlink[j], cData(' '), alink[j]]);
                    if (ID('tbody_links') && xLink[j].parentNode.parentNode.parentNode.id != "tbody_links") {
                        $(xLink[j]).attr('id', 'xx' + j + '');
                        flink[j] = Create('a');
                        flink[j].setAttribute('href', 'javascript:void(0)');
                        IMG_G[j] = Create('img', { style: 'margin-bottom: -2px;', class: "xx" + j + "", id: 'quickSave[' + j + ']', src: star, onmouseover: "displayMSG('<b>" + SubLanguage(LanguagePack(), 8) + " " + xLink[j].innerHTML + "</b>');", onmouseout: 'sHide();' });
                        $(IMG_G[j]).bind('click', function () {
                            SaveAsLink('' + this.className + '');
                            var starx = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH3AILCgcau11I/gAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAACbElEQVQokX2TT0hUcRDHP799b3ff+nRd3Vo1QztIJgkaGUSHiqioLLASkwohkqAORt06CNFBoj/oIREvRceM6OLBisQOSUKpUZZppMWatYq7rv921femg5ia4RfmMsx3vsPMfJWIsBxWUDk0hW6BpWWKxRpw/JvQFHp0ktLZOCUMK+daZP0/7dzhCGVeB9u0DEZco6odHRsQfCvHXKU8Z2NqBl7TIiv2i2rLZiuCC8HJqHISUgYh5bGCSl+lbAkpykmqyw92H/tjk1QZiTRjk6xBmhUl68dXhjLzqdcJKQMbLw78lk2m2BS5dQIkgtMAGeEsNkeJkNzXgrv5AaSUU1NRREwPvuem30u+Mkg3kkjzePB6TBYW5QePjSv6kUDHbXjVDgmlNJVf5p4WkLhe30DicAs7NgvewgLYtBNSCsDMAk8OTPXAlzsQbAd/CW8qarnlMfgNoLW28jxjLy+/wXj/AIG5n6SacfBlw1Q/TPZDzinYeBDyyniWvoEWbCYwrov6+yQzKmFgkMKOVi7ty+d0YD3qUwNM9IH4YUsx+PIIzaZR5XLzlHUyu0COKAVouDGiISqdcWpj3RB8Ad1R5qe/oyeMwbZiyL1Au9PPeQLSu3AqnwgRZRNnPjaBUwGRLuhRjKcepyFhhumux+xuq2P7nk52nazjommra0t39olNWM2hoc18hrYPTGacoebQCZqAiSPHuP/uLbnNjRwYuot5pYYkRGQpRlHDnVQ/PMfMozquSpQUGSdRwhgyjmOxbrQXMz6IayVZhNdPONx4g0oZwxQRJIwm4SXi8lDLLWkFlZqzcBjZa1txEX8AvGoXJ4Yn4tIAAAAASUVORK5CYII%3D';
                            this.setAttribute('src', starx);
                        });
                        appThis(flink[j], [IMG_G[j]]);
                        appThis(spn[j], [cData('  '), flink[j]]);
                    };
                    appThis(xLink[j].parentNode, [spn[j]]);
                };
            };
        };
        function showTHelp() {
            var links = document.links.length;
            var xLink = document.links;
            for (j = 0; j < links; j++) {
                if (xLink[j].href.match("karte.php\[^>]d=")) {
                    $(xLink[j]).hover(function () { gTimeD(ID('xgy').innerHTML, this.href.split('d=')[1]); }, function () { sHide(); });
                } else if (xLink[j].href.match("position_details.php\[^>]x=")) {
                    xLink['x'] = xLink[j].href.split("position_details.php?x=")[1].split('&y')[0]
                    xLink['y'] = xLink[j].href.split("&y=")[1];
                    xLink['id'] = xyToId(xLink['x'], xLink['y']);
                    $(xLink[j]).hover(function () { gTimeD(ID('xgy').innerHTML, xLink['id']); }, function () { sHide(); });
                } else if (xLink[j].href.match("karte.php\[^>]x=")) {
                    xLink['x'] = xLink[j].href.split("karte.php?x=")[1].split('&y')[0]
                    xLink['y'] = xLink[j].href.split("&y=")[1];
                    xLink['id'] = xyToId(xLink['x'], xLink['y']);
                    $(xLink[j]).hover(function () { gTimeD(ID('xgy').innerHTML, xLink['id']); }, function () { sHide(); });
                };
            };
            setTimeout(showTHelp, 1000);
        };
        function makeWindow(title, html, position) {
            if (!ID('w7Window')) {
                $(
        '<div id="w7Window" style="position: absolute; top: ' + position[0] + '; left: ' + position[1] + '; z-index: 10000;">' +
        '<div style="text-align: ' + (RTL == "rtl" ? "right" : "left") + ';padding: 0px 0px 3px; width: 100%; height: 22px; cursor: move;" id="T4_dWindow">' +
        '<span style="float: ' + (RTL == "rtl" ? "right" : "left") + '; width: 15px; padding: 4px;font-size: 10px; font-weight: bold; text-shadow: 0px 0px 5px white; padding: 3px; cursor: default;">' + title + '</span>' +
        '<img src="' + svnIMG(1) + '" style="float: ' + (RTL == "rtl" ? "left" : "right") + ';" /></div><div id="t4_w7w" style="border: 1px solid;">' + html + '</div>' +
        '</div>').appendTo($(document.body));
                MakeDrag(ID('T4_dWindow'), ID('w7Window'));
                $('div#w7Window div#T4_dWindow img').css('cursor', 'pointer');
                $('div#w7Window div#T4_dWindow img').bind('click', function () { $('div#w7Window').remove(); });
                $('div#w7Window div#T4_dWindow img').hover(function () { this.src = svnIMG(2); }, function () { this.src = svnIMG(1) });
            } else {
                $('#t4_w7w').html(html);
            };
        };
        function qRep() {
            if (!exp(/berichte\.php/)) {
                var xLink = document.links;
                var x, y, z;
                if (GM_getValue('w7Window')) {
                    z = getPosition('w7Window', '155px_455px');
                    x = z.split('_')[0];
                    y = z.split('_')[1];
                } else { x = '155px'; y = '455px'; };
                for (i = 0; i < document.links.length; i++) {
                    if (xLink[i].href.match(/berichte\.php\?\b[^>]*/) && !xLink[i].getAttribute('value')) {
                        $('<img src="' + IMG_open + '" style="cursor:pointer;float: ' + (RTL == "rtl" ? "right" : "left") + ';" name="' + xLink[i].href + '" id="open_r' + i + '" />').insertBefore($(xLink[i]));
                        $('img#open_r' + i + '').bind('click', function () {
                            $.get(this.name, function (e) {
                                makeWindow($('img#open_r' + i + '').attr('name'), '<table id="report_surround" cellspacing="1" cellpadding="1">' + $(e).find('#report_surround').html() + '</table>', [x, y]);
                            })
                        });
                        $(xLink[i]).attr('value', '0');
                    };
                };
            };
            setTimeout(qRep, 1000);
        };
        function qSendMsg() {
            var send_image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAYAAAB24g05AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2wsIFjoO3PNzDgAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAABRklEQVQokY2RO0sDURBGz727N2vvnxBS2Nj56AVfiIra2FspKVIaEYvFWkFQECslhW8NsRDF0iaF4J/Q2mzunbFxY1R8fNUwcM4MM0bUa6U6gaoC4MUhIviW5+U1EEJARGiFmBACqkq1VMcQGQC7Ux+hMn2MtRYAS5PIZACoKqqKF9euq6U627Vh8tiuRNi9HmVl6qjdzLfJN+qENy/GcM59CFwcSAqBvZsJVmdOAFifv2Bj4RQRaQsPl2tsXY6TOKEQ+w+BNU3iyOOiFvu3k6zNnpGlRbK0yN5iDVXlYOmK7dowkc34GnNw368+ODBdzA+ek6VFbG830nimUH78BrTB9yPGQQoYA3MdcJ4sLf4oABQgNsYwO1D/BnfWv8WIej17GGK07+6TRBrP/xN0vgygmfZofoOk/GT+EtivjaT8ZP47HeANRVCkIU1WB7kAAAAASUVORK5CYII%3D';
            var links = xpath('//div[@id="content"]//a[contains(@href, "spieler.php?uid=")]').snapshotLength;
            for (j = 0; j < links; j++) {
                xLink = xpath('//div[@id="content"]//a[contains(@href, "spieler.php?uid=")]').snapshotItem(j);
                if (xLink.href.split('=')[1] !== $('div.sideInfoPlayer a').attr('href').split('=')[1]) {
                    rlink = Create('a');
                    rlink.href = 'nachrichten.php?t=1&id=' + xLink.href.split('=')[1];
                    rlink.innerHTML = '<img src="' + send_image + '" alt="+MSG" />&nbsp;';
                    xLink.parentNode.insertBefore(rlink, xLink);
                };
            };
        };
        function mPlace() {
            if (ID('send_select')) {
                var stone = [];
                var getres = new Array();
                var aQcarry = [100, 250, 500, 1000];
                var bAdjMc = true;
                var strMaxC = xpath("//form//p/b | //div[@class='carry']//b").snapshotItem(0);
                var maxC;
                if (strMaxC) {
                    maxC = C(strMaxC.textContent);
                    for (var i = 0; i < aQcarry.length; i++) {
                        if (maxC == aQcarry[i]) {
                            bAdjMc = false; break;
                        };
                    };
                };
                if (bAdjMc) aQcarry = [100, 500, 1000, maxC];
                var resTb = ID('send_select');
                var getMax = xpath("//form//p/b | //div[@class='carry']//b").snapshotItem(0).textContent;
                var getMer = xpath('//div[@id="build"]//span[@id="merchantsAvailable"]').snapshotItem(0).textContent;
                var total = C(getMax) * C(getMer);
                if (resTb.rows.length > 4) { resTb.rows[4].style.display = "none"; }
                if (resTb.rows.length > 5) { resTb.rows[5].style.display = "none"; }
                var send_imgdel1 = 'data:image/gif;base64,R0lGODlhEAAQAPcAAAAAAJoIBZQ2LZ8xKZw+NqMDAa0NCaEVDqkfGbwFArsKB7oPCrIVC7IUDbgSDrcYEqslGq8iHb8kFrgkHKYvJKc1LLU+Lb4/MLBFM5hKQZVWT55gWaRMQqpZSaNjWrpgUqxyZqlyaqV9d8IHBcwEA80GBM8KBcMVDc8bD8YbEdQOD9MSCdURD9YREdUSEdYYEtQeFNkWE9oYEtgeFdkfFtwcFMElGtAjFd0gFt4jF90mFd4rHcIyIOAjF+ElGOEnGeIoGeIpGuIrG+AtG+MvG+QpGuQrGuUsGuYvGuYuG+MwHOcwGuc0HugxHOgyHek1Huo2H+w5H+Q1Iuk7I+w4IO46Ie89IfA/IshHKc9LK8JJOsVNO8tONsxIMdJCKeBHJelFJO1BI+9FJO5JMfBAIvFBI/FCI/NEJPFFJvRHJfdNJ/hNKPpSKfpTK8JcTclcRsxcSM1pVsN9dtB+cK6Jg7aQiM+ZktSViNWjmcOrp8S2s8W9u8i4tNanodqxqNqxqtqxrOC+udPFw9nS0NjT0t/c2+TKxebQyujSzuPd2+Pe3enV0O3e2+vj4ezl4+ro5+7o5+zr6+/t7fHk4fDs6/bt6vTt7PXu7fPy8fXy8fX19Pf29/n08vr29fr6+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAjcAP8JHEjw3585dw4J9AMnDh5OBPucmNImyyVLXcagEfNmksBAC1asYYMFEiULUq6UMcNlEaIHJs6o+VJHIB8KOqpYueJlAokoacCA2DRwEAEUUKhUWYKETJgOkgo+2sBAyZOkVTAoKigwk4AAQ5o4YfKBq0A5BQwEMXIkCRE3lQraSTACR48bKYAUEaKF0UBACkjIqAHDg4YGOXz8uCDQkI0SLGK84CAJk4gDM3BIaNRpyw4WLVxUSDRQTwYIIf454kFDhYoIggpqKiTQE50BDhDkMVsw0h5CvAcGBAA7';
                var send_imgdel = 'data:image/gif;base64,R0lGODlhLQAUAPcAAAAAAHHQAJoIBZQ2LZ8xKZw+NqMDAa0NCaEVDqkfGbwFArsKB7oPCrIVC7IUDbgSDrcYEqslGq8iHb8kFrgkHKYvJKc1LLU+Lb4/MLBFM5hKQZVWT55gWaRMQqpZSaNjWrpgUqxyZqlyaqV9d8IHBcwEA80GBM8KBcMVDc8bD8YbEdQOD9MSCdURD9YREdUSEdYYEtQeFNkWE9oYEtgeFdkfFtwcFMElGtAjFd0gFt4jF90mFd4rHcIyIOAjF+ElGOEnGeIoGeIpGuIrG+AtG+MvG+QpGuQrGuUsGuYvGuYuG+MwHOcwGuc0HugxHOgyHek1Huo2H+w5H+Q1Iuk7I+w4IO46Ie89IfA/IshHKc9LK8JJOsVNO8tONsxIMdJCKeBHJelFJO1BI+9FJO5JMfBAIvFBI/FCI/NEJPFFJvRHJfdNJ/hNKPpSKfpTK8JcTclcRsxcSM1pVsN9dtB+cK6Jg7aQiM+ZktSViNWjmcOrp8S2s8i4tNanodqxqNqxqtqxrOC+ucrKyszMzM/Pz9PFw9LS0tnS0NjY2Nra2tzc3OTKxebQyujSzuPd2+Pe3enV0ODg4OLi4uTk5OXm5Obm5ufn5+ro5+jo6Onp6evr6+zs7O7t7e7v7e/v7/Hk4fHx8fPy8fPz8/T09PX19fb29vf29/n08vj4+Pn5+fr6+vz8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAtABQAAAj/AP8J/BegoMGDCBMqXBhg4MCCriJKnEixosWLrgo+xMhx4h86eBh1jMiqIcGRrvzEkZPn1MQ+KKi40YLSVMMArXLq3LnTC5k0Y+B8yhmIAQs2bbLwXNqKVSlOBZuymkq16tQLU7CYOdMFUiMIJ9CsAWPHqtmppCwVZLWqrdu3bvlU2GHlCpYvFEpIURMmhCm4gNuOmlSwrarDiBMjPlQgRZQqVpgkKSPGAyfFmBGDklRQVSpUoEOLFn2JQ4MlUB5byfBotGvRniIV/Gyqtu3buE0NEEDEyZMmIHILtx27IKpSpJIrX858joEDQo4gUVLkDfPryzfJDmBqlKjv4MOH2r+jgEQOHzhUBDEyZIv49+A1KSpIShSo+/jz4we0oMQMGzF8sIEDOvwABAb6JXhfJokUNAoonkQo4YQRLnKDCS3IAEMHnIQyAgI05DABhSRGiAkiBYHSySYstugii1zw0IILL1jgSIt7aBCBCC/2uIkmkxhSECeaZGLkkUga2UMNK6wgQSFJRimlkZMgIiRBmFRCSSVcdullHQQ8kIAeXnaJZJldUhJJIoSYFEAkisQp55x01mnnnVYOMohJBAVgCCF6Biqonn8OauihegoiiEYO9cnQo5Ai5FBAADs=';
                var send_imgpro = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAntJREFUSEuVlU1ME1EQx1dOHD169OjRo0eP3rTGLV5Mjdui3lCaQEy01bAtfiDRlIgEwbYkxBAwVVGCgZqI8WsNcjBNlYMJoYRaWNq1ZVtWVv6bvGa7fbv7mOSlzb7Z/29m3szbA5yLtQnR43DZbeGMXztr2eXeYa9VUz/F4zdVN92G/ZO+0MGuWyNjiYm5yvLvnIyluxjxm3z1Yfua+HSa9905xAQ9I0ROTL5YyGvav5obxGn/9ZxUuHClP+AI7RZHn6ys5l2zYQ2kIJe2eu6Pp6jQQOeDc+t5eZNVjNWvXFH/Xu4aCDdAUe+Xs1/W7ERyuZwuSZKezWapLtjDsrOPUmbjdLt4pA4N3x2b0TSNemapVEoXBMEQFEVRDwaDTboej0dHUE52e2Bi0QD6fKFWdJadM8TMZhUnwbiVeGZeUtH9HObMqe2tQGRJyheLxXQsFgPDmGneHz1fLJUVpwwJQFEUnQSAZ7Ty2umo1Zrq9Uc69oCRS3udVHaKEsJYKB8axwzGe25NA58dTdvhBbGbw6Dvd/aQJcBoFPxPp9N6MpmsZ08Lfm1d3vK2i6c4jMT8+++OGZoFkCnEYcjY3J14TvasUDDq113f4FSG5eDJiBBfa0OR0aFpDSXe/KnPIe/vOfpt6VfBCQoxKwDZmLvUmjHRw5Hh6Bpum6uh4XuVbZXarTgvwGjlAhAgLFTAavgI3OhNTDXdp7gA+oeeL1WrNdtLgKXsZh/A4s/eZoyBpxmgndcfP8z8XJH3K271RxmRmS3MHIDX33vs0ej06sLnHwramRW+sVkqfl3MFkfGZ4tNZ8byNW67GD2M2eED0TDL8gbEsw1fBQrkP6+jTExmIuLUAAAAAElFTkSuQmCC';
                var send_imgequ = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAflJREFUSEtjZCAAwpPbHUBK/jExgGlcgOkfwwGQHMefHycWLmz8QchcFHn/+HqB8qZ5Sxat3vvtzoNn70H4PwEAU7d2y9HvVa0LtobGd0kQZWlIcpvH2k1HXv358/cXIUvwyW/be+ZNUmF/Kl5LK1rnz3389BVB3xDrkDfvP31o6Vu+EaulqcUTY1++ev+OWMOIVff1248vmeVTG1AsBYX35l2nnhNrCKnqjp+5/jYorVUDbmlD95Idf/78oSjOCDmic+rq82AL4+PrOUApi5AGSuV37DvzA5T6GUD5jJhkP2XKlP9nzpzBijdu3Pj/5s2beN0EsgOcp0NT2hM+fvr6mZAPAgMD/9vY2ODEIMfgAz9+/voRltJWALSwLQOYkr4SsvDzZ4JuwmvE7z9/focmt1YwgDI6MXmP0iB9/vL9h7C01gAGUJbYd/gCQR9SGqQgO+DFXe+MdddpHaSzFm1/Dc+HoSktBmcv3n5DyFJy5UFRBoo6lNKmqH5Oz7fvPyhLGVhcBKoE6joWrcMoT0EFQP+s9Rd//vxFtUIAZNnClbuvgzM8NgCytLh25qTrtx5TXGOAghHkM5yWITsgLKXDYvr8rU+PnLz6GZSciY27t+8+fTx9/ubHect3fcSIM2Jq4/D0dgVQ3glNbW8gBoeltkag1ApYLAEAIKtp4+xd+jMAAAAASUVORK5CYII=';
                var send_imghour = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAA8FJREFUSEudlUtsG2UQx01PPXLkyJEjR46coPQCQjjlgoJIUtITLRWkQoIEVCflWYFUAVEfJKpUoZICgUBUlAqJIkobmkdBVuq68Wu9tnfX6/V6n971n5kPOfL60USMtLI8+3l+8/jP54diu9ihkZkn+UhrX0x8DrJ9rdiv/G5/4N6Ym3vX3S1u5P2zw5MPT7x3/uL85RX7Xqao84NdrH1u4cffnbcSXy3Fhz94ZE/QF0amDywsXq8EQeh3Mnzfh240IFd05IsaspKKgqyhrNbQsBy0WmEkpZ9WVtVXjp0eeyD0ROLCubxEETssDANUdR3ZfAkFqYJyWYWqaNAUFUpFRVGuIEPvJPq0bTsCVfV67eQnl77vCx07/ulL5Ype7fxFMwgooILtrARN0+HZFkLXRmA16DHFZ+jY5Lchl1SktyXqghmBWrbbODJxZioC5X7/cPWm3Hmy1QIUzaDsZXiOg3q9TnAZDaOGgMBNhhLMNk2Uya8pClRKKp2lM9TiTvtjNak9fzjx2A506sOLy0EQRGbmek1kCxXU9BpavicC5wsScvkCfAK2PBeuZWErlcbt9Q1oqgoaJM1XodmqCDnjDnv/zOU1ARwentzPyuoWoWE6YjauWUeTAFyN2yDRyGWRhGs7oqJCsQSTkmmLpkotvU9V+n4zEnL52qrL6o/xnvWTvW5YAugxkNonoK6DkKrNFSvYTKZQNxs9y1IzLaQzNIYuIDPETsdHZ1426qSALmvYHrZzJZqZge8WvgE1A/dTdxE2faFGnapkXzabjfyypFSRKZRBaxXxu57vDo1OHyXg9DgpyeoGBmEIqVTFa0ePIXnnjgi+nb6HkJTLs2LrBtqOR6Ipgtahp3JSfDM+kjgR40Xv3r32advxhXBk2r3/gmcigdi3uLiI8fFxPHPwIJaWVyhJDZxst8llvTZ0OPFcjFfi2m/rPRXuQF1f3CgcfH3zb9iOC78ZUMsC4XvjzQlKSMPsuTk89fSBnla24zBj57r7+IsryZ6UOhycMQe/dXtTyD5HN05OUoTvxs01VOh629pKie+DbHb+Z2VnD+OjJx//ayNFizTY+gmk08fiGQTkkfHoIrfN65NnP6J29ai1ncL/BfKfwDun5q/03Kd8AZye/XbD8/zIJcCg7qe9CrtVyLC5r39JioXvZww9/vaXnyXv5vUHtXcv77iNXNlAWGcCQ6Onnvj8wpJ0/c9/TJbzXgB8RqvWjVtrW8b5S1eNnpn1LbHLeejVmUd5d+JjM1N7eYbGEi9G/hX6QP4F7nAoMfND3esAAAAASUVORK5CYII=';
                var send_imgall = 'data:;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKvSURBVHjaYmQgAMKT2x1A9D8mBgd86pj+MRwA0Rx/fpxYuLDxBy51jNgE/ePrBTSU5adoa8oHWZlq/gSJKctLCuCz8O7D5x9A9MUr9znOXry97/atV8mrF5a9IOQhhpDkNo+1m468+vPn76//FIBte8+8SSrsT8VrWUXr/LmPn756/59K4M37Tx9a+pZvxGpZavHE2Jev3r/7T2Xw9duPL5nlUxtQLAuN75LYvOvU8/80AsfPXH8blNaqAU5cIEJbR2qBp5ORML7gPnDgAENjYyOKmKOjI1gchEFsXMDCWEPIXF9tOdjC+Ph6Dl1NRXtmZmZWfBZOnDiRoaGhgeHChQsM5AB9TUVNUOpn+sHCYaGvo/gDn+IPHz6AfdHf38+wcOFCsixUUZL6zsHCYcD0j5FBQVSInwWf4g0bNjAEBASAMYhNDpCRFOH8z/jfABiH/zlYWJiZ8CneuHEjg7+/P4OCggKDgIAAWcHKzMzEDEw/HEz//zM8ePf+0y98wQnyFSgOQQkDxCcnWN+8/fyVkZnhBgvjH5YLt+89Y5OREsUbnPn5+XAHFBYWguOTFHD91kPW/z9ZTzCByrvzV+89whec8fHxDA4ODmAMspycYL1z//k3eNkamtJiACxw32DLtPv378cQu3//PhifP3/+//v378EYxMYFQMUlqIxGcUFR/Zyeb99/fKZ2KQOqBOo6Fq2DV2MwxtsHj2tmLt5+79ev3z8YqAT+/v33e+nafXcvXr+bBE+tMMbFiwf/SAhpLDh+8a6wnIy4uogwHwcllj159vpD/4z1uw4cv+i3cWHjB7yKw1I6LKbP3/r0yMmrn5+/fP+B2OB7++7Tx9Pnb36ct3zXR4w4w1fjw5sX6e0K////M/j/n8mAGF8xMvy78YeR4cK6WdU3cKkBCDAAO5kcKaybJQ4AAAAASUVORK5CYII=';
                function m100() { for (i = 0; i < 4; i++) { if (C(getMer) == 0) { } else { getres[i] = document.getElementById('l' + (i + 1)).firstChild.nodeValue.split('/')[0]; ID('r' + (i + 1)).value = C(getres[i]); } } }
                function clearTransport() { for (var i = 0; i < 4; i++) { ID('r' + (i + 1)).value = ''; }; };
                function createEventmarketSend(i, q) {
                    return function () {
                        var aI = document.getElementsByTagName('INPUT')[i + 2];
                        var aV = aI.value;
                        var aS = (aV != '' ? parseInt(aV) : 0);
                        aS += q;
                        if (aS > document.getElementById('l' + (i + 1)).firstChild.nodeValue.split('/')[0]) aS = document.getElementById('l' + (i + 1)).firstChild.nodeValue.split('/')[0];
                        if (aS > total) aS = total;
                        aI.value = aS;
                    };
                };
                function createEventmarketSendAll(q) {
                    return function () {
                        var arrInp = document.getElementsByTagName('INPUT');
                        for (var i = 0; i < 4; i++) {
                            var aI = arrInp[i + 2];
                            var aV = aI.value;
                            var aS = (aV != '' ? parseInt(aV) : 0);
                            aS += q;
                            if (aS > document.getElementById('l' + (i + 1)).firstChild.nodeValue.split('/')[0]) aS = document.getElementById('l' + (i + 1)).firstChild.nodeValue.split('/')[0];
                            if (aS > total) aS = total;
                            aI.value = aS;
                        };
                    };
                };

                var A = Create('tr');

                var aCell = Create('td');
                aCell.setAttribute('style', 'text-align:center;');
                aCell.setAttribute('colspan', '2');
                aCell.innerHTML = '<img src="img/x.gif" class="r1"><img src="img/x.gif" class="r2"><img src="img/x.gif" class="r3"><img src="img/x.gif" class="r4">';
                A.appendChild(aCell);

                var aCell = Create('td');
                aCell.setAttribute('style', 'text-align:center; vertical-align:middle;');
                var clAllImg = Create('img');
                clAllImg.setAttribute('src', send_imgdel);
                var clAllLink = Create('a');
                clAllLink.setAttribute('href', 'javascript:void(0)');
                clAllLink.addEventListener("click", clearTransport, false);
                clAllLink.appendChild(clAllImg);
                aCell.appendChild(clAllLink);
                A.appendChild(aCell);

                var emptyCell = Create('td');
                A.appendChild(emptyCell);
                //add the quantities links for all res
                for (var i = 0; i < 4; i++) {
                    var uCellA1 = Create('td');
                    uCellA1.setAttribute('style', 'text-align:center;');
                    var useThemLinkA1 = Create('a');
                    useThemLinkA1.setAttribute('style', 'font-size:13px; white-space:nowrap;');
                    useThemLinkA1.setAttribute('href', 'javascript:void(0)');
                    useThemLinkA1.innerHTML = aQcarry[i];
                    useThemLinkA1.addEventListener('click', createEventmarketSendAll(aQcarry[i]), false);
                    uCellA1.appendChild(useThemLinkA1);
                    A.appendChild(uCellA1);
                };

                //add the real ALL resources link (don't know if it really makes sense)
                var uCellA1 = Create('td');
                uCellA1.setAttribute('style', 'text-align:center;');
                var useThemLinkA1 = Create('a');
                useThemLinkA1.setAttribute('href', 'javascript:void(0)')
                useThemLinkA1.addEventListener('click', m100, false);
                var allimg = Create('img');
                allimg.setAttribute('src', send_imgall);
                useThemLinkA1.appendChild(allimg);
                uCellA1.appendChild(useThemLinkA1);
                A.appendChild(uCellA1);

                resTb.appendChild(A);
                for (i = 0; i < 4; i++) { // Add more options such as delete and all.. effect 4 Rows
                    function clearTransportRes(i) { return function () { ID('r' + (i + 1)).value = ''; }; };

                    var aRow = resTb.rows[i];
                    aRow.cells[3].style.display = "none";
                    //clear single resource
                    var s = Create('td');
                    s.setAttribute('style', 'text-align:center; vertical-align:middle;');
                    var delLink = Create('a');
                    delLink.setAttribute('href', 'javascript:void(0)');
                    delLink.addEventListener('click', clearTransportRes(i), false);
                    delimg = Create('img');
                    delimg.setAttribute('src', send_imgdel1);
                    delLink.appendChild(delimg);
                    s.appendChild(delLink);
                    aRow.appendChild(s);

                    //For each new quantity and resource create a new link with the associated request			
                    for (j = 0; j < aQcarry.length; j++) {
                        var s1 = Create('td');
                        s1.setAttribute('style', 'text-align:center; vertical-align:middle;');
                        var xLink = Create('a');
                        xLink.setAttribute('style', 'font-size:13px; white-space:nowrap;');
                        xLink.setAttribute('href', 'javascript:void(0)');
                        xLink.innerHTML = aQcarry[j];
                        xLink.addEventListener('click', createEventmarketSend(i, aQcarry[j]), false);
                        s1.appendChild(xLink);
                        aRow.appendChild(s1);
                    };

                    //add the ALL option to the list of links
                    var xLink = Create('a');
                    xLink.setAttribute('onclick', 'upd_res(' + (i + 1) + ',1); return false;');
                    xLink.setAttribute('href', 'javascript:void(0)');
                    allimg = Create('img');
                    allimg.setAttribute('src', send_imgall);
                    var aCell = Create('td');
                    aCell.setAttribute('style', 'text-align:center; vertical-align:middle;');
                    xLink.appendChild(allimg);
                    aCell.appendChild(xLink);
                    aRow.appendChild(aCell);


                }
                var addoption = xpath('//div[@class="boxes-contents cf"]').snapshotItem(0);
                addoption.innerHTML += ' ' +
       	'<a href="javascript:void(0)" id="x[3]x"><img src="' + send_imgequ + '"></a>' +
       	'<a href="javascript:void(0)" id="x[1]x"><img src="' + send_imgpro + '"></a>' +
       	'<a href="javascript:void(0)" id="x[2]x"><img src="' + send_imghour + '"></a>' +
       	'';
                ID('x[1]x').addEventListener('click', function () { if (C(getMer) == 0) { } else { for (i = 0; i < 4; i++) { ID('r' + (i + 1)).value = Math.ceil(ID('l' + (i + 1)).innerHTML.split('/')[0] / getMax * (getMer * 3)); }; } }, false);
                ID('x[2]x').addEventListener('click', function () { if (C(getMer) == 0) { } else { for (i = 0; i < 4; i++) { ID('r' + (i + 1)).value = Math.max(0, C(pro[i] * 3600)); } } }, false);
                ID('x[3]x').addEventListener('click', function () { if (C(getMer) == 0) { } else { for (i = 0; i < 4; i++) { ID('r' + (i + 1)).value = C(C(total) / 4); } } }, false);
            };
        };
        function ressell() {
            if (xpath('//table[@id="sell"]').snapshotItem(0)) {
                httpRequest('build.php?gid=17&t=5', function (ajax) {
                    var A = htmltocontext(ajax.responseText);
                    var q = C(A.getElementsByClassName('carry')[0].getElementsByTagName('b')[0].textContent);
                    var mer = xpath('//div[@id="build"]//span[@id="merchantsAvailable"]').snapshotItem(0).textContent;
                    var total = C(q) * C(mer);
                    function add1(q) {
                        return function () {
                            var aI = xpath('//table[@id="sell"]/tbody/tr[1]/td[1]/input').snapshotItem(0);
                            var aV = aI.value;
                            var aS = (aV != '' ? parseInt(aV) : 0);
                            aS += q;
                            if (aS > total) aS = total;
                            aI.value = aS;
                        };
                    };
                    function add2(q) {
                        return function () {
                            var aI = xpath('//table[@id="sell"]/tbody/tr[2]/td[1]/input').snapshotItem(0);
                            var aV = aI.value;
                            var aS = (aV != '' ? parseInt(aV) : 0);
                            aS += q;
                            if (aS > total) aS = total;
                            aI.value = aS;
                        };
                    };
                    var addser = xpath('//table[@id="sell"]/tbody/tr[1]/td[2]').snapshotItem(0);
                    addser.innerHTML += '<a id="add">&nbsp;&nbsp;&nbsp;+</a>';
                    ID('add').addEventListener('click', add1(q), false);
                    var addser2 = xpath('//table[@id="sell"]/tbody/tr[2]/td[2]').snapshotItem(0);
                    addser2.innerHTML += '<a id="add2">&nbsp;&nbsp;&nbsp;+</a>';
                    ID('add2').addEventListener('click', add2(q), false);
                });
            }
        };
        function send_INFO() {
            var tbl = Create('table');
            tbl.id = 'TBL_INF';
            tbl.setAttribute('cellspacing', '1');
            tbl.bgcolor = 'silver';
            var fix1 = xpath('//div[@id="build"]//span[@id="merchantsAvailable"]').snapshotItem(0).textContent;
            tbl.innerHTML = '<tbody><tr><td>' + fix1 + ':<span id="xMR"></span></td><td><img class="carry" src="img/x.gif">(<span id="TBL_RES">0</span>) -<font id="TBL_RES2">0</font> </td></tr><tr><td> <img src="img/x.gif" class="clock"> (<span id="TBL_TIME">0:00:00:00</span>) </td><td>&lt; <span id="TBL_DIST">0</span> &gt;</td></tr></tbody>';
            $(tbl).insertAfter('form div.destination');
            function accXTBL() {
                var speed = GM_getValue('MySpeed');
                var merchants
                if (speed == ('2' || 2)) { merchants = new Array(32, 24, 48); } else
                    if (speed == ('3' || 3)) { merchants = new Array(48, 36, 72); } else
                        if (speed == ('5' || 5)) { merchants = new Array(64, 48, 96); } else { merchants = new Array(16, 12, 24); };
                function CHK(v) { return (v.toString() == ('NaN' || NaN) ? 0 : v.toString()); };
                var get_Tribe = xpath('//div[@id="side_info"]//img[contains(@class, "nationBig nationBig")]').snapshotItem(0).className.match(/\d/);
                get_Tribe = C(C(get_Tribe) - 1);
                var getMax = xpath("//form//p/b | //div[@class='carry']//b").snapshotItem(0).textContent;
                getMer = xpath('//div[@id="build"]//span[@id="merchantsAvailable"]').snapshotItem(0).textContent;
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
            };
            for (i = 0; i < 4; i++) {
                $('#r' + (i + 1)).bind('keyup', accXTBL);
                $('#r' + (i + 1)).bind('change', accXTBL);
            };
            $('#yCoordInput').bind('keyup', accXTBL);
            $('#xCoordInput').bind('keyup', accXTBL);
            $('body').bind('click', accXTBL);
            accXTBL();
        };

        function SBT() {
            function re(r) { return C(ID('l' + r).innerHTML.split('/')[0]); };
            var cl = 'big white g';
            if (CLASS(cl + '19')[0] || CLASS(cl + '20')[0] || CLASS(cl + '21')[0]) {
                if (CLASS('details')[0] && CLASS('tit')[0] && CLASS('details')[0]) {
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
                        ge.setAttribute('onmousemove', "tChange('" + i + "')");
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
        function dLinks() {
            for (i = 0; i < $('tbody#tbody_links img').length; i++) {
                if (!$('tbody#tbody_links img:eq(' + (i) + ')').attr('value')) {
                    $('tbody#tbody_links img:eq(' + (i) + ')').bind('click', function () { return deleteLinks('Link[' + this.getAttribute('id').match(/\d+/) + ']'); });
                    $('tbody#tbody_links img:eq(' + (i) + ')').attr('value', i);
                };
            };
            return setTimeout(dLinks, 2000);
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
'data:image/png;base64,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%3D%3D',
'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAB4AAAAeAAVRcFbAAAAXVBMVEUAAAABAQABAAABAQABAQEBAQEBAQEEBAMQDAUwKRs+MkdvZGBPP0xTPh5aRy94TheCZS2Kf2+hfDuufBu8jzeSibGzq6LNx7POoDfaz77ds13qzsv73VT86HX///9G15FAAAAAFXRSTlMBAQMFERs8hOD4/Pz+/v7+/v7+/v7FZXiNAAAAAWJLR0QecgogKwAAC+RJREFUaN7tmglX47gSheksthZrtbxEtv//33z3Sk4IPdOQBnpm3jlRAw3EyaequrXI5OXluZ7ruZ7ruZ7ruZ7ruZ7ruZ7ruZ7ruf4/1+F4PB7+HfDpLHx0zT9OPpqtLPNPg8Fd1xXkLL75lYV679HzSu5a2HP7reDG3v0w6J8elevr2rb4baE+6PNL+2ryafjZfLe9IW+x/TZHd6prz/tPatB2ePP4fA+usfZtcz6fT18laz0MV1g7DEN44+x2/XkVia95jV/UWquV0jurAVd3b8Bp/nvy9mWpVXDVDGzXali6u1wC9+/Q+MRXL86f5p5k11ktbQ3wMPBzuJki+jT3v7B57rdNfhqsuk5FpVtbuUpZzSVEU7l9Anr+Cb2t3jtnpFs3+WmuBlqrFynI1cZz9S5Gxyi4Husv4C0ax0e8ketmPxfeToHbwrqzoo+1i3OM0aeYPKRWuAX8Br0Z/o4PGbP5z1QUoeFbzYC2XRgKGPaGbXPRoyWYvr8jv6ps83Mqv029TOlTpazthpI8TQcoM8ml2V+g1tRruXuaq4KvZs/7XkB3Zm0+qelSIkWHisUMJipmcHs/qKO8ga9Ws4xtvm7ECT/3Zo6fTeOSvx0U1nUol/znNaUNiYsiol1h6RrpTfYFKwQ2ZPz6lbYROhbsYRneLiWkdM7dPN4XcnTrbICV2oHv0lfAEtruhr8sdRBRwOy3YBjqwTVSw+IY+/MXqqZiVr1hMuJDdzhHr4SjvB1dTmdnl6Bm7MZZl6K1X5iIhO9tSeNBL6VTAYvyLQd9PHvTWXgVYLqcFns4uJfS9E5H1K9PjIG7i1o3523rFLoDtI0N+E5hHygtSh3bZFHKrRTEIp4ACw+hCel6oxn9OaXkf6tNqeXIDHbzuIwryQgzaX20UtP1VnXNMRplwVYUkygmSz+vvUCJ8bqH0yPAKDft7wQWWNODuxSyVhq2KuttBzCzC4PJMVqArYHDVcmfdZXoGz7SyxAXWghqXYE/PBYcZIPKDOKVDG/jQ1urZESTYhkXLRoBuRL+th3IcDU6SGS8k0Y76VPOW06oKaWQHB44czSdAxLhXZerzWhTs5cKYPYsuF0a4xWwpnzCFcJJI71DsUaf1jDdRbbmTIEzLfXH4NbkbQfy/2Xa6G2VI8FppvXKOOOsLK42FmioDHKGtYmr16Vce5RYpwPbGXL7Y7C0udhKcrEZtm8qZFjcKb+pgpWNd7YskMuXCIPZl6rFKTmJmSAlPeBibOnjQIsoMTBnAkHOS/0mz9kr21l6s3dkQ0MVuuMJJpYNWaNNOQk7kVBD70Xv/Idg4dpWxG0dd1MrmWCtQwjW9RGu9i7ogEu0u5F9BRc5G1/AONbJOMFi1LIPs6p5Obam3d6SwxTnWQ/jMAagoNl4QSj4wKvJxWJiZ9Yy+EPuxS/NzrzIj0cwiNM0tgJHklFGJI0dx3HCp3YppwkPwuSg6fCqsQJGOs8QdO4pg6tYz60zH1p8kCt8JtpcyUjFzY8hTpdxInUcArRawMFyK+GqMYoLtRrmGtOvGdEVrbkFVgT50c2FjuXdt7KYSpOzATkUKsyFNxHuBC+UGC8RVbGivbGcuJhoLCPz6kTvTy/7Oep9Vx+Op9aiVmZtJNI/j4vmmOyiDQN8rTUqILkAT9MyAnxJmRkUPWNsOZSgUUqMt36OjsNP27viZPmuqo/nprWwZERNEHj9sEgOV3ABFa1jXcyYMGHp8RLm60pRAmyMmzePnEOrcP2W0Tbr5KXeAx9ODcCG8yTqkN0CJIMeQzM8Zi1oKl6X1xP1FdINHD3AjC9KNILtYDXmEePW/IJfv6j2fYMbg2SJo5al8PIsUizGPBFQO3JFe356Smsf9IBF/mCbJcDIHqoLz6bjM04Xyb0LPgCMmmr1AFNr6ZXOJAw2QGmAlYGg51QOFPDtGMfEn4u5OGBIclHRcIyJxEXuxfe0Or7o9j1lNY1kRkLVJFvONNKh0XiU3IDu30kJdGHT4ogI80eoHEcbSzAbBp4MaRkDq+tWaLX8Nfh4OhOM86DDs4yXpbZH7DjlaNCNO3S/HQ3Y7PHquayZ+7ClPRp2aMfDHZ08Y/7yZTqJUfz4tbQKGIZRXlZFB0mj7EZyLccATjqdkpb5RFP5Ba2+xDyyM6KUs23QZ9g5xGhM2qDMhG/Fj1+SK5jPZEJ11nlWe+gnwhqAZanLaFAojdXUDKsTxxsYjSqDnNOazblYHfsVnRENjk5y8R0wRY00VjBvTBiloCwL5WTsvryk7ojGpGN2f7MRoEoxxLFnu0KuB6qyOB3bxhbxaOHOAP+SDDBkbejqrNl6+ZoYPDpWj8JGDDliGVgfZ+MxtCPFZtjco6byoqHsMJpidUxMLDjaYPvvgWly0+Lkg7bDkM3Uq5Oa5TIUcwISvLYEGB2xJ/QGujqGcRrGKZTKOmhUMepZWqBdwpyP/bfvgEuUQTYo0JhgJUuV1RX6Ct9jbVCiOXXBLpSxhS1zulzGBH0Mdg7a1mEsReQWkt4174EPZ4ZZabZfnBGAHcZ9AT2UKA6hq0aX6syRx5cLLuRewpr5g098AVNWhDyTPP14D1xyucWkMV7QBgfUiMtU106vdkO61qLZWwY08KILrwN3GV3mtDA4ityWIoqsM+3pA3DJ5hZdh2uq2MttgT/saORLGqYB7l3oZT5YLlmGPvP/6MrQoFHHkHPNx9zaGkkGsRr7Cr4sZTtjoIBLFJYpKBXur1lCP+KyHCL3OaKiRD3KAv5o5vrRtCBPN/fdvSheRwdsCHT6cwkoiaiHSd9f5HEMuYwXny6TTxPEjue1Px4A09cBnb6C3xgj3bpSU1Ax0QNPajyn9Hq5Q7u8YGcLyjxmkAnfL/oR8OGHLj0A083bEC+DXMsdUsIHBW/3txtr5t4xvs8IwYzJH7U6Y4+6lY94mkenjW02Dpeq1x2sXkErhjmXbrdrV3cfkwnTPqY9VCzMAi5r2xwOH3NfTq3GqIGmg/TTrAo3sLm7eTj3+z21epNe3PlmyZPkaI2uNYPsTXM+PHBGPZwblGkf2e441NWCVF5Qp9c/BcwYK3YwvvFyKalesiCnS5BlJplTRn+M4nw6vjwCbi3kQ6M5X6AE3rS1O7eAk7t+m2apx5JoBR4jUr2ziQMaehvJzSPglxOySbQC+Qc0V9pNpqh5H6/i+j3gDhOpLTLEaWqqxRXl0rKzUaMYwEB+CMxG0QjtrU1lrsFHmKqvheAtRHzgHJbKvdNeCb24bQhIIG2v5w1MqR1dzVkfTSo+8icpVOtKtpr1uPgLEicax4rBiHIbEaMn76j1xi5+WRwG+2XEUCks6wr6kze640TkcZxwyYkH/uh6PJ52NPojPDaXUTol1kXtl9HzTF7uYknnOpQlRMJNC6o3NGw86yhGL8x+GtM0AoyWbB8SF89tIF/REs0gcqhjJ9B+xCkZ81gQSGM0MdRQ5rwZORgK2JYYX2kx+xoc4WdOfN4+puo6YF/RLeaneYPKeGS5aJej1miOODZJTfeGkTJwKOGYlIyGmwPv6spoW/ROOBpTL7kP/nn7cPM3nC1EzEgK9OZJlyMUwDOGnpz1bPWUN8in9HzYFucQhBR4Cqqk5mxmRAPuYwa/RbcN00vuYMzVNuoh52hnHF1TLMM8xlJMs2OQPSNMT7kWzrLeyvb8W9xdZbdQd+W2S+DgYRXH8+wt0jdgA9Adxl/OvwjHCAkussyqrW6E5F84f5d71XdxeBg5ol/nS1vOFkDyo9wnxTHA9XCIMyIoKgMjv8UTgT39/tsX+J6Ha2oJypujXb3PAtmYNJe5NmXPOseJWLRNc0sGLyv2U2+bONRQ1xdDqNt6gCpwt98aiLJYiCOLKCae9/icP4+9C3VzXcjW3eEoxinOqUiJBuI4eC6wU4V/EXvT9/mVLmqiABvN7ly2lYbQE6/G9aevYm+hrvArmmM11CxeXXsu8kXDr5d/01tiyqsdT7d6xqj6KGscd3/cyZf4b3wnTlXaLeBS1Bzd/XH6o+/6ORxec3vP0cPujj/+ZqNXrZ1+vyR9A/pP+/Y9rf0rb+R6ruf6L6//AWnxafwV09vTAAAAJXRFWHRjcmVhdGUtZGF0ZQAyMDExLTA5LTE0VDExOjI5OjU1KzAyOjAw1495YwAAACV0RVh0bW9kaWZ5LWRhdGUAMjAxMS0wOS0xNFQxMToyOTo1NSswMjowMIg+D1cAAAAASUVORK5CYII%3D',
'data:image/png;base64,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%3D%3D',
'data:image/png;base64,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%3D%3D',
'data:image/png;base64,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%3D%3D',
'data:image/png;base64,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',
];

            var Div = Create('div', { align: 'auto', id: 'gList', class: 'mbList' });
            Div.innerHTML = '' +
'<img src="' + img[1] + '" onclick="' + gd(16) + '" /><br><img src="' + img[2] + '" onclick="' + gd(17) + '" /><br><img src="' + img[3] + '" onclick="' + gd(18) + '" />' +
'<br><img src="' + img[4] + '" onclick="' + gd(19) + '" /><br><img src="' + img[5] + '" onclick="' + gd(20) + '" /><br><img src="' + img[6] + '" onclick="' + gd(21) + '" />';

            if (RTL == 'rtl') { Div.style.right = '0px'; } else { Div.style.left = '0px'; };
            Div.style.width = '80px';
            Div.style.height = '490px';
            Div.style.zIndex = '10000';
            document.body.appendChild(Div);
            for (i = 0; i < 6; i++) {
                aIMG = CLASS('mbList')[0].getElementsByTagName('img')[i];
                aIMG.style.opacity = '1';
                aIMG.style.float = (RTL == "rtl" ? 'right' : 'left');
                $(aIMG).hover(
        function () { $(this).stop().animate({ "opacity": "0.75", 'width': '100px', 'height': '100px' }, "fast"); },
        function () { $(this).stop().animate({ "opacity": "1", 'width': '80px', 'height': '80px' }, "medium"); }
        );

            };
        };
        var cssString = "#T4_mHelp{" +
					"position:absolute;" +
					"padding: 4px;" +
					"border: solid 1px #00C000;" +
					"background-color: rgba(200, 200, 200, 0.7);" +
					"box-shadow: 0px 0px 2px 1px black;" +
					"border-radius: 5px;" +
					"}";
        var div = document.createElement("div");
        div.id = "T4_mHelp";
        div.setAttribute("style", cssString.split('{')[1].split('}')[0] + 'display: none;');
        document.body.appendChild(div);

        function gMouseOver() {
            var imgList = xpath("//img[contains(@class, 'unit u')][ not(@class='unit uhero')]");
            for (var i = 0; i < imgList.snapshotLength; i++) {
                if (!imgList.snapshotItem(i).getAttribute('value')) {
                    //imgList.snapshotItem(i).setAttribute('onmouseover', "hMove(this.className.split(' u')[1]);");
                    //imgList.snapshotItem(i).setAttribute('onmouseout', 'sHide();');
                    $(imgList.snapshotItem(i)).hover(function () { hMove(this.className.split(' u')[1]); }, function () { $('#T4_mHelp').fadeOut(333); });
                    imgList.snapshotItem(i).setAttribute('value', "0");
                };
            };
            setTimeout(gMouseOver, 4000);
        };
        // Dream1
        function post_rep(data) {
            GM_xmlhttpRequest({
                method: "POST",
                url: "http://travian-reports.net/convert",
                headers: { 'Content-type': 'application/x-www-form-urlencoded' },
                data: encodeURI(data),
                onload: function (msg) {
                    $("#rep_link").val($(msg.responseText).find("#link").val());
                }
            });
        }

        function save_battle_report(rep) {
            var adat = 'report=' + rep + '&step1=Save report&design=1';
            post_rep(adat);
        }
        if (document.location.href.split('/')[3].split('?id=')[1] && xpath("//td[@class='report_content']/table[2]/tbody[@class='units']").snapshotItem(0) && ID('attacker')) {
            $("#report_surround").before('<button id="sub_report" name="sub_report" value="' + SubLanguage(LanguagePack(), 45) + '" type="submit"><div class="button-container"><div class="button-position"><div class="btl"><div class="btr"><div class="btc"></div></div></div><div class="bml"><div class="bmr"><div class="bmc"></div></div></div><div class="bbl"><div class="bbr"><div class="bbc"></div></div></div></div><div class="button-contents">' + SubLanguage(LanguagePack(), 45) + '</div></div></button></br><input type="text" id="rep_link" value="' + SubLanguage(LanguagePack(), 46) + '" style="width:100%; margin-top:5px; margin-bottom:5px;"/>');
            $("#rep_link").bind('focus', function () { this.select(); });
            $("#sub_report").bind('click', function () {
                var re = $('#report_surround').clone(true);
                $('#report_surround td').prepend('	');
                $('#report_surround tr').prepend('\n');
                $('#report_surround div').append('\n').prepend('	');
                $('#report_surround img').each(function (i, el) {
                    $(this).parent().prepend($(this).attr('alt'));
                    $(this).remove();
                });
                $('#report_surround tbody:eq(0) tr:eq(0) td:eq(0) table:eq(0) tbody:eq(2) tr:eq(1)').remove();
                $('#report_surround tbody:eq(0) tr:eq(0) td:eq(0) table:eq(1) tbody:eq(2) tr:eq(1)').remove();
                var text = $('#report_surround').text();
                save_battle_report(text);
                $('#report_surround').html(re.html());
            });
        }
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
            var urlBase = location.href.split('/')[1];
            var target = ID("side_info");
            var uxLinks = [];
            var x = getPosition('dreambox', '100px_200px').split('_')[1];
            var y = getPosition('dreambox', '100px_200px').split('_')[0];
            var div = Create('div', { style: 'position: absolute; top: ' + y + '; left: ' + x + '; width: 200px; z-index: 10000;' });
            div.id = "dreambox";
            var tbl = Create("table", { cellspacing: '0', cellpadding: '1', id: 'llist' });

            var tblHead = Create("thead");
            var tblBody = Create("tbody");
            tblBody.id = 'tbody_links';
            if (GM_getValue('My_T4Links')) { links = eval(GM_getValue('My_T4Links')); } else { GM_setValue('My_T4Links', '[]'); links = eval(GM_getValue('My_T4Links')); };
            tblBody.innerHTML = '';
            if (links[0]) {
                for (c = 0; c < links.length; c++) {
                    uxLinks[c] = links[c];
                    tblBody.innerHTML += '<tr id="Link[' + c + ']"><td width="10%">&nbsp;<img style="cursor: pointer;" id="delete_Link[' + c + ']" class="del" src="img/x.gif"></td><td style="font-size: 11.5px; color: black;">' + uxLinks[c] + '</td></tr>';
                };
            } else { uxLinks = ''; };
            var row = Create("tr");
            MakeDrag(row, div);
            var cell = Create("td", { colspan: '2' });
            cell.innerHTML = '<h1><b>' + SubLanguage(LanguagePack(), 7) + '</b>(<a href="javascript:void(0)" id="T4_AddNewLink" style="color: red;"><i>' + SubLanguage(LanguagePack(), 8) + '</i></a>):</h1>';
            row.appendChild(cell);
            tblHead.appendChild(row);
            tbl.appendChild(tblHead);
            tbl.appendChild(tblBody);
            div.appendChild(tbl);
            document.body.appendChild(div);
            $('a#T4_AddNewLink').bind('click', AddNewLink);
            $('#tbody_links a').hover(function () { $(this).stop().animate({ "color": "blue", "font-size": "14px" }, "fast"); }, function () { $(this).stop().animate({ "color": "black", "font-size": "11.5px" }, "fast") });
        };
        if (!GM_getValue('t4_setup_setting') && (!exp(/spieler.php/))) {
            window.location.href = location.protocol + '//' + location.hostname + '/spieler.php';
        };
        if (exp(/spieler.php/) && (!GM_getValue('t4_setup_setting'))) {
            var race = xpath('//table[@id="details"]/tbody/tr[2]/th').snapshotItem(0).innerHTML;
            var Aly = xpath('//table[@id="details"]/tbody/tr[3]/th').snapshotItem(0).innerHTML;
            GM_setValue('t4_setup_setting', race + '|' + Aly);
            GM_setValue('mainVillage', FindBefore(CLASS('mainVillage')[0]).innerHTML);
            setting();
        };
        var host = location.href.split(location.hostname + '/')[1];
        if (xpath('//span[@class="mainVillage"]').snapshotItem(0) && window.location.href.split('=')[1] == $('#side_info .sideInfoPlayer a').attr('href').split('=')[1]) { GM_setValue('mainVillage', FindBefore(CLASS('mainVillage')[0]).innerHTML); };

        cssString += '.TMbuildingtags{' +
		'background-image:none !important;' +
		'background-color:white;' +
		'border:thin solid #000000 !important;' +
		'-moz-border-radius: 2em !important;' +
		'border-radius: 2em !important;' +
		'padding-top: 3px !important;' +
		'font-family: Arial,Helvetica,Verdana,sans-serif !important;' +
		'font-size:9pt !important;' +
		'font-weight:bold !important;' +
		'text-align:center !important;' +
		'position:absolute !important;' +
		'line-height:15px !important;' +
		'width:21px !important;' +
		'height:19px !important;' +
		'cursor:pointer !important;' +
		'visibility:hidden;' +
		'z-index:100 !important;}' +
		'A.tm_uplevel:link,A.tm_uplevel:visited{color:black;};';
        cssString += 'table.t4_set td {text-align: center; padding: 2px;} table.t4_set {border-radius: 5px 5px 5px 5px;} .t4_set {width: auto; border: 1px solid gray; position: absolute; top: 20px; left: 400px; z-index: 10000; box-shadow: 0px 0px 2px 1px black;}' +
'#t4tools { background-color: rgba(255, 255, 255, 0.8); border-radius: 0px 0px 10px 10px; box-shadow: 0px 1px 2px 0px black; position: absolute; ' + (RTL == "ltr" ? "left" : "right") + ': -50px; top: 66px; z-index: 10000;} #t4tools img {padding: 5px;}' +
'.bList {width: auto;border:1px solid black;}' +
'div#TBL_D1_RES {z-index: 10000; background-color:rgba(205, 205, 205, 0.75); padding-left:4px; padding-right:4px; padding-bottom:4px; border: 1px solid black; border-radius: 5px 5px 5px 5px; box-shadow: 0px 0px 5px 0px black;}' +
'table.front_res_table {width:auto;background-color:transparent;}' +
'td.res_header {text-align:center;width:auto;background-color:white;}' +
'table.front_res_table td table {width: auto; z-index: 10000;float:left;background-color:transparent; border-collapse: collapse;}' +
'div.RES_drag {height: 25px;}' +
'#T4_mHelp .xt4Style td {padding: 0px 2px 0px;}' +
'.tblInfo td {padding: 2px; text-align: ' + (RTL == "rtl" ? "right" : "left") + ';}' +
'#TrDis table {width: auto; border-collapse: collapse;} #TrDis table td {padding: 0px 2px; border: 1px solid silver;} #TrDis table th {padding: 4px 4px 4px; border: 1px solid silver;}' +
'#sMR td.sub span.reportInfo {float: ' + (DIR() == "rtl" ? "left" : "right") + '} a.reportInfoIcon {float: ' + (DIR() == "rtl" ? "left" : "right") + '}' +
'#sMR {background-color: rgba(205, 205, 205, 0.75); box-shadow: 0px 0px 5px 0px black; border: 1px solid black;left: 500px;position: absolute;top: 175px;z-index: 10000; border-radius: 5px; padding-left: 6px; padding-right: 6px; padding-bottom: 6px;}' +
'#_page {background-color: white; text-align: center;}' +
'#btn_cls {float: ' + (RTL == "rtl" ? "left" : "right") + ';}' +
'div#vlls_state {z-index:10000;border:1px solid;border-radius:5px;box-shadow:0px 0px 3px 1px black;}' +
'#crop_fields tbody tr td {padding: 2px 2px 2px;}' +
'#elep_fields tbody tr td {padding: 2px 2px 2px;}' +
'#tableres h1 {font-size:12px;color:#333;text-align:center;} #tableres { background-color:rgba(255,255,255,0.9);border-radius:5px 5px 5px 5px;padding:5px;margin:4px auto;width:100%;box-shadow:0 0 2px #222; }' +
'#timeres, #tdttotal {font-size:10pt; font-weight:bold; border-collapse:collapse; border:1px solid silver; padding:2px; text-align:center; width:16.66%;}' +
'.tdtotal {font-size:10pt; font-weight:bold; background-color:#FFF6B5; border-collapse:collapse; border:1px solid silver; padding:2px; text-align:center;}' +
'.trimn {border-collapse:collapse; border:1px solid silver; text-align:center;}' +
'#restable {line-height:16px; border-collapse:collapse; width:100%; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color:"white"; padding:2px; margin:1px;}' +
'#res1, #res2, #res3, #res4, .tdimg {font-size:10pt; border-collapse:collapse; border:1px solid silver; padding:2px; text-align:center; width:16.66%;}' +
'.res_State {position: absolute; z-index: 99; top: 23px; width: 107px; background-color: rgba(255, 255, 255, 0.8); border-radius: 0px 0px 7px 7px; text-align: center; box-shadow: 0px 1px 1px 0px black;}' +
'.ACS td {padding: 3px; font-size: 12px;}' +
'#content h1 {top: 20px} div#w7Window {background-color: rgba(205, 205, 205, 0.75);border: 1px solid black;border-radius: 5px 5px 5px 5px;box-shadow: 0 0 10px black;padding-bottom: 6px;padding-left: 6px;padding-right: 6px;}' +
"div#xblock {display: none; padding-right: 6px; padding-left: 6px; padding-bottom: 6px; border: 1px solid black; border-radius: 5px 5px 5px 5px; z-index: 10000; background-color: rgba(205, 205, 205, 0.75); position: relative; box-shadow: 0px 0px 10px black;}" +
"div#xblock textarea { background-image: url(" + NoteIMG.Line + "); background-repeat: repeat; border: 1px solid black; height: 256px; width: 265px;}" +
"div#xblock div.btn { background-color: white;border-bottom: 1px solid;border-left: 1px solid;border-right: 1px solid;text-align: center;}" +
'table.acc_tbl td{padding: 1.5px;} #acc_r1 td, #acc_r2 td, #acc_r3 td {padding: 3.5px; background-color: white; border: 1px solid silver; text-align: center;} #acc_r1, #acc_r2, #acc_r3 {background-color: transparent; width: auto; border-collapse: collapse;}' +
'#hlink { background-color:rgba(255,255,255,0.9);border-radius:5px 5px 5px 5px;padding:5px;margin:4px auto;width:100%;box-shadow:0 0 2px #222; }' +
'#hlink h1 {font-size:12px;color:#333;text-align:center; border-bottom: 1px solid black;height:25px;}' +
'#hlink span.edit {float:right;cursor:pointer;}' +
'#hlink ul {margin:0;padding:0;}' +
'#hlink li {list-style:none;padding-left:5px;} #hlink li a {color:#555;}' +
'#hlink input {font-size:9px;} #hlink input.name {width:30px;}' +
'#TrXw td{padding: 1px 2px 1px;} #TrXs td{padding: 1px 2px 1px;}' +
'.bList {border: 1px solid black; width: auto; box-shadow: 0px 0px 5px 0px black;}' +
'#TBL_INF {width: auto; border: 1px solid gray; float:' + (RTL == "ltr" ? "left" : "right") + '; margin:' + (RTL == "ltr" ? "170px -300px 0" : "0") + '0;}' +
'div#build.gid17 .destination {float:' + (RTL == "ltr" ? "right" : "left") + '; width:224px; margin:' + (RTL == "ltr" ? "0" : "-170px 0 0") + ';}' +
'#TBL_INF tbody tr td {padding: 2px 2px 2px;}' +
'#CxS td{padding: 1px; font-size: 12.5px;}' +
'.mbList { background-color: rgba(255, 255, 255, 0.7); border-radius: 0px 0px 5px 5px; box-shadow: ' + (RTL == "ltr" ? "2" : "-2") + 'px 2px 5px 0px black; position: absolute; top: 67px; width: auto; }\n.mbList img {width: 80px; height: 80px; cursor: pointer; border-radius: 5px 5px 5px 5px;}';

        cssString += '#dreambox h1 {font-size:12px;color:#333;text-align:center;}' +
'#dreambox {width: 105%;}' +
'#dreambox span.edit {float:right;cursor:pointer;}' +
'#dreambox li {list-style:none;padding-left:5px;} #dreambox li a {color:#555;}' +
'#llist thead tr td {background-color: transparent; border-bottom: 1px solid; padding: 0px; width: 190px;}' +
'#llist tbody tr td {background-color: transparent; padding: 0px 2px;}' +
'#llist tbody tr td a {color: black; font-size: 11.5px;} #llist { background-color: rgba(255,255,255,0.9); border-radius: 5px 5px 5px 5px; padding: 5px; margin:4px auto; width: 100%; box-shadow:0 0 2px #222; } #llist tbody tr td {background-color: transparent;}' +
'table#report_surround thead th, table#report_surround thead td{text-align:right;} table#report_surround thead td.sent{width:25%;font-weight:bold;} table#report_surround td.report_content{padding:15px 28px 0;} table#report_surround td.report_content table{margin-bottom:20px;}' +
'table#report_surround td.report_content table thead td{text-align:center;} table#report_surround td.report_content table .units th{text-align:center;width:17%;} table#report_surround td.report_content table.support .s7{padding:0;} table#report_surround td.report_content img.bigArrow{background:url(../../img/report/bigArrow-rtl.png);' +
'width:42px;height:25px;}.ie6  table#report_surround td.report_content img.bigArrow{background:url(../../img/report/bigArrow-rtl.gif);} table#report_surround td.report_content .boxes.trade, table#report_surround td.report_content .boxes.support{height:65px;width:187px;margin-bottom:5px;}' +
'table#report_surround td.report_content table.support .s7 .boxes{width:216px;} table#report_surround td.report_content .trade .boxes-contents, table#report_surround td.report_content .support .boxes-contents{padding:4px;height:100%;} table#report_surround td.report_content .boxes .headline{margin-bottom:5px;}' +
'td.report_content table .units th, td.report_content table .units td{border-top:1px solid #ccc;border-right:1px solid #ccc;} td.report_content table tbody.last th, td.report_content table tbody.last td{border-bottom:1px solid #ccc;} td.report_content table td.last, td.report_content table tbody.last th.last{border-left:1px solid #ccc;}' +
'table#report_surround td.report_content table .units td{width:7.2%;text-align:center;padding-right:2px;padding-left:2px;} table#report_surround td.report_content table tbody.infos td div{margin-top:6px;margin-bottom:6px;line-height:16px;} table#report_surround td.report_content table tbody.infos td img{float:right;margin-left:10px;}' +
'table#report_surround td.report_content table tbody.infos td img.clock{margin-left:10px;} td.report_content div.role{color:#fff;padding:2px;line-height:20px;} td.report_content td.role{padding:0;vertical-align:top;} td.report_content table#attacker tbody.goods div.res{float:right;width:100%;}' +
'td.report_content table#attacker tbody.goods div.carry{float:right;width:100%;margin-top:10px;} td.report_content table#attacker tbody.goods div.cranny{float:left;margin-right:20px;} td.report_content table#attacker tbody.goods div.cranny img{float:right;}' +
'table#report_surround td.report_content tbody.infos td{text-align:right;} .none2{color:#C0C0C0;font-weight:bold;} .none{text-align:center;} table#report_surround .header{margin:5px 0;float:right;} .theader th{background:#efefef;} #subject .text, #subject .text table.coordinates td{font-weight:bold;}' +
'table#report_surround .rArea{float:right;margin-left:25px;} table#report_surround .rArea img, table#report_surround .carry{margin-left:10px;}';
        GM_addStyle(cssString);

        $(document).bind('mousemove', showHelp_move);
        $(window).bind('mouseout', function () { sHide(); });
        $(document).bind('mouseout', function () { sHide(); });
        space();
        ReTime();
        setup();
        showTHelp();
        mFullView();
        ResColor();
        MyVid();
        favThis();
        ressell();
        AllyCalculation(); // <--- by Dream1
        setTimeout(getQuick_RM, 250);
        Resmarketall(); // <--- by Dream1
        window.addEventListener('load', Map_Check, true);
        xbt();
        getHeroHealth();
        calcuationttroop();
        timem();
        qRep();
        TimeUp();
        vACC_INFO();
        silver_info();
        //PHP_Village_Access();
        if (/build/.test(window.location.href)) { cultureCalc(); };
        if (ID('mapContainer') && exp(/karte.php/)) { setTimeout(function () { help_fun(); ViewCropFind(); ViewElphFind(); cMapChecker(); }, 1000); };
        if (ID('side_info')) { Village_Count(); };
        if (ID('mtop')) { AddUpdate(); };
        if (CLASS('building big white g13')[0] && CLASS('build_details researches')[0]) { xSmith(); };
        if (exp(/berichte.php\b[^>]id=\d/)) { ReportX(); };
        if (exp(/dorf1/) && ID('production') && ID('troops')) { dorfA(); };
        if (exp(/tt\=2/) && ID('btn_ok')) { setTimeout(function () { AttackDist(); }, 1000); };
        if (ID('build_value')) { building_increase(); };
        if (CLASS('clock')[0] && CLASS('clock')[0].parentNode.className == 'clocks') { building_end_time(); }
        if (GM_getValue('setting[1]') == 'true') { Resource_Needed(); };
        if (GM_getValue('setting[2]') == 'true') { BuildingView(); };
        if (GM_getValue('setting[3]') == 'true') { QuickSend(); };
        if (GM_getValue('setting[4]') == 'true') { ViewRep(); };
        if (GM_getValue('setting[5]') == 'true') { ViewMessege(); };
        if (GM_getValue('setting[6]') == 'true') { SBT(); };
        if (GM_getValue('setting[7]') == 'true') { MyLinks(); dLinks(); };
        if (GM_getValue('setting[8]') == 'true') { ResourcePlusTimer(); };
        if (GM_getValue('setting[9]') == 'true') { ResourcePercent(); };
        if (GM_getValue('setting[10]') == 'true') { ResourcePrud(); };
        if (GM_getValue('setting[11]') == 'true') { BuildList(); };
        if (GM_getValue('setting[12]') == 'true') { Show_Help_Links(); };
        if (GM_getValue('setting[13]') == 'true') { qSendMsg(); };
        if (GM_getValue('setting[14]') == 'true' && ID('btn_ok') && ID('troops') && exp(/tt=2/)) { AttackInfo(); };
        if (GM_getValue('setting[15]') == 'true') { qSendIcons(); };
        if (GM_getValue('setting[16]') == 'true') { Select(); }; // add by Dream1
        if (GM_getValue('setting[17]') == 'true') { centerNumber(); };
        if (GM_getValue('setting[18]') == 'true') { if (ID('send_select')) { mPlace(); }; };
        if (GM_getValue('setting[19]') == 'true') { if (ID('send_select')) { send_INFO(); }; };
        if (GM_getValue('setting[20]') == 'true') { accessToAlly(); };
        if (GM_getValue('setting[21]') == 'true') { gMouseOver(); };
        if (GM_getValue('setting[22]') == 'true') { resbar(); };
        if (GM_getValue('setting[23]') == 'true') { if (exp(/dorf1/) && ID('production') && ID('troops')) { VillageMap(); } };
        if (host == 'dorf3.php' || host == 'dorf3.php?s=0' || location.href.match(/dorf3.php\b[^>]newdid=\d+/) && ID('overview')) { VillageOverView(); };
    }

    function backupStart() {
        if (notRunYet) {
            var l4 = document.getElementById('l4');
            if (l4) allInOneOpera();
            else setTimeout(backupStart, 500);
        }
    }

    var notRunYet = true;
    if (/khtml/i.test(navigator.appVersion)) allInOneOpera();
    else if (window.addEventListener) window.addEventListener("load", function () { if (notRunYet) allInOneOpera(); }, false);
    setTimeout(backupStart, 500);

})();