// ==UserScript==
// @name DartIT tracker-tweaker
// @description индивидуальные настройки для support.dartit.ru;
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant unsafeWindow
// @updateURL http://userscripts.org/scripts/source/180468.user.js
// @downloadURL http://userscripts.org/scripts/source/180468.user.js
// @author mann
// @license MIT
// @version 0.7.2.1
// @include https://support.dartit.ru*
// ==/UserScript==
console.log('alert!');
// [1] Оборачиваем скрипт в замыкание, для кроссбраузерности (opera, ie)
(function (window, undefined) {  // [2] нормализуем window
    var w;
    if (typeof unsafeWindow != undefined) {
        w = unsafeWindow
    } else {
        w = window;
    }
    //------------------------------------------
    (function(a){if(typeof define==="function"&&define.amd){if(typeof jQuery!=="undefined"){define(["jquery"],a)}else{define([],a)}}else{if(typeof jQuery!=="undefined"){a(jQuery)}else{a()}}})(function(b,e){var q={a:"href",img:"src",form:"action",base:"href",script:"src",iframe:"src",link:"href"},t=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","fragment"],p={anchor:"fragment"},a={strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/},l=Object.prototype.toString,s=/^[0-9]+$/;function o(u,x){var z=decodeURI(u),w=a[x||false?"strict":"loose"].exec(z),y={attr:{},param:{},seg:{}},v=14;while(v--){y.attr[t[v]]=w[v]||""}y.param.query=f(y.attr.query);y.param.fragment=f(y.attr.fragment);y.seg.path=y.attr.path.replace(/^\/+|\/+$/g,"").split("/");y.seg.fragment=y.attr.fragment.replace(/^\/+|\/+$/g,"").split("/");y.attr.base=y.attr.host?(y.attr.protocol?y.attr.protocol+"://"+y.attr.host:y.attr.host)+(y.attr.port?":"+y.attr.port:""):"";return y}function m(v){var u=v.tagName;if(typeof u!=="undefined"){return q[u.toLowerCase()]}return u}function c(x,w){if(x[w].length==0){return x[w]={}}var v={};for(var u in x[w]){v[u]=x[w][u]}x[w]=v;return v}function k(y,w,v,z){var u=y.shift();if(!u){if(g(w[v])){w[v].push(z)}else{if("object"==typeof w[v]){w[v]=z}else{if("undefined"==typeof w[v]){w[v]=z}else{w[v]=[w[v],z]}}}}else{var x=w[v]=w[v]||[];if("]"==u){if(g(x)){if(""!=z){x.push(z)}}else{if("object"==typeof x){x[j(x).length]=z}else{x=w[v]=[w[v],z]}}}else{if(~u.indexOf("]")){u=u.substr(0,u.length-1);if(!s.test(u)&&g(x)){x=c(w,v)}k(y,x,u,z)}else{if(!s.test(u)&&g(x)){x=c(w,v)}k(y,x,u,z)}}}}function d(y,x,B){if(~x.indexOf("]")){var A=x.split("["),u=A.length,z=u-1;k(A,y,"base",B)}else{if(!s.test(x)&&g(y.base)){var w={};for(var v in y.base){w[v]=y.base[v]}y.base=w}i(y.base,x,B)}return y}function f(u){return h(String(u).split(/&|;/),function(v,A){try{A=decodeURIComponent(A.replace(/\+/g," "))}catch(x){}var B=A.indexOf("="),z=n(A),w=A.substr(0,z||B),y=A.substr(z||B,A.length),y=y.substr(y.indexOf("=")+1,y.length);if(""==w){w=A,y=""}return d(v,w,y)},{base:{}}).base}function i(x,w,y){var u=x[w];if(e===u){x[w]=y}else{if(g(u)){u.push(y)}else{x[w]=[u,y]}}}function n(x){var u=x.length,w,y;for(var v=0;v<u;++v){y=x[v];if("]"==y){w=false}if("["==y){w=true}if("="==y&&!w){return v}}}function h(y,v){var w=0,u=y.length>>0,x=arguments[2];while(w<u){if(w in y){x=v.call(e,x,y[w],w,y)}++w}return x}function g(u){return Object.prototype.toString.call(u)==="[object Array]"}function j(v){var u=[];for(prop in v){if(v.hasOwnProperty(prop)){u.push(prop)}}return u}function r(u,v){if(arguments.length===1&&u===true){v=true;u=e}v=v||false;u=u||window.location.toString();return{data:o(u,v),attr:function(w){w=p[w]||w;return typeof w!=="undefined"?this.data.attr[w]:this.data.attr},param:function(w){return typeof w!=="undefined"?this.data.param.query[w]:this.data.param.query},fparam:function(w){return typeof w!=="undefined"?this.data.param.fragment[w]:this.data.param.fragment},segment:function(w){if(typeof w==="undefined"){return this.data.seg.path}else{w=w<0?this.data.seg.path.length+w:w-1;return this.data.seg.path[w]}},fsegment:function(w){if(typeof w==="undefined"){return this.data.seg.fragment}else{w=w<0?this.data.seg.fragment.length+w:w-1;return this.data.seg.fragment[w]}}}}if(typeof b!=="undefined"){b.fn.url=function(v){var u="";if(this.length){u=b(this).attr(m(this[0]))||""}return r(u,v)};b.url=r}else{window.purl=r}});
    //--------------------------------------------
    // [3] не запускаем скрипт во фреймах
    // без этого условия скрипт будет запускаться несколько раз на странице с фреймами
    if (w.self != w.top) {
        return;
    }
    this.$ = this.jQuery = jQuery.noConflict(true);
    // [4] дополнительная проверка наряду с @include
    if (/https:\/\/support.dartit.ru/.test(w.location.href)) {

        $(document).ready(function($) {
            //localStorage.clear();
            //добавим новые стили
            $('head').append('<style type="text/css">.onoff-opt{margin: 0 6px 0 10px} .none{display: none} .none.view{display: block} .ch_addr{margin: 10px 10px 10px 0; vertical-align: top} .totop > input {margin: 10px 0 0} .label_head{display: block; margin: 0 0 20px} .clearfix:before, .clearfix:after { content:""; display:table; } .clearfix:after { clear:both; } .alist{float: right} .alist p{margin: 0 0 10px; line-height: 1; text-align: right}</style>');

            function find(arr, val) {
                return arr.indexOf(val);
            }

            function addToList(name, data) {
                var t = localStorage.getItem(name);
                if (t !== null) {
                    var a = JSON.parse(t);
                    a.push(data);
                    localStorage.setItem(name, JSON.stringify(a));
                } else {
                    var r = [data];
                    localStorage.setItem(name, JSON.stringify(r));
                }
            }

            function removeFromList(name, data) {
                var t = localStorage.getItem(name);
                var a = JSON.parse(t);
                var f = find(a, data);
                console.log('f: ' + f);
                if (f >= 0) {
                    a.splice(f, 1);
                    localStorage.setItem(name, JSON.stringify(a));
                }
            }

            function showList(name) {
                var t = localStorage.getItem(name);
                var a = JSON.parse(t);
                return a;
            }

            function showSettings() {
                var settings_form = $('<form id="setd"><input id="wrightdef" type="button" value="Сохранить" /></form>');
                $('form[name="theForm"]').before(settings_form);

                //выбор из списка проектов
                var prj_str, oval, otxt, setch;
                prj_str = '';
                var prj_list = localStorage.getItem('prj_filter');
                var prj_filters = JSON.parse(prj_list);
                $('#project_id option').each(function() {
                    oval = $(this).attr('value');
                    otxt = $(this).text();
                    var g = parseInt(oval);
                    setch = '';
                    for (var k in prj_filters) {
                        var j = parseInt(prj_filters[k]);
                        if (j === g) {
                            setch = 'checked=""';
                            break;
                        }
                    }
                    prj_str += '<li><label><input ' + setch + ' class="onoff-opt" type="checkbox" name="p' + oval + '" value="' + oval + '">' + otxt + '</label></li>';
                });
                $('<fieldset><legend>Избранные проекты</legend><ul id="ch-prj">' + prj_str + '</ul></fieldset>').prependTo($('#setd'));

                //выбор из списка исполнителей
                //internal_worker
                var wrk_str, wval, wtxt, wsetch;
                wrk_str = '';
                var wrk_list = localStorage.getItem('wrk_filter');
                var wrk_filters = JSON.parse(wrk_list);

                $('#internal_worker option').each(function() {
                    wval = $(this).attr('value');
                    wtxt = $(this).text();
                    wsetch = '';
                    for (var z in wrk_filters) {
                        if (wrk_filters[z] === wval) {
                            wsetch = 'checked=""';
                            break;
                        }
                    }
                    wrk_str += '<li><label><input ' + wsetch + ' class="onoff-opt" type="checkbox" name="p' + wval + '" value="' + wval + '">' + wtxt + '</label></li>';
                });
                $('<fieldset><legend>Избранные исполнители</legend><ul id="ch-wrk">' + wrk_str + '</ul></fieldset>').prependTo($('#setd'));

                //создание списка доп.адрестов для рассылки
                var lei = $('<fieldset id="add_email_box"><legend>Список адресов</legend><label for="list_email_item">email</label><br /><input id="list_email_item" name="list_email_item" type="text" value="" /></fieldset>');
                var aei = $('<input id="add_email_item" name="add_email_item" type="button" value="В список" />');
                var rei = $('<input id="remove_email_item" name="remove_email_item" type="button" value="Убрать" />');
                lei.prependTo($('#setd'));
                aei.appendTo($('#add_email_box'));
                rei.appendTo($('#add_email_box'));
                var elist = showList('addrlist');
                if (elist !== null && elist.length > 0) {
                    var e_list = '';
                    for (var i = 0; i < elist.length; i++) {
                        e_list += '<li>' + elist[i] + '</li>';
                    }
                    var sel = $('<ul>' + e_list + '</ul>');
                    sel.prependTo($('#add_email_box'));
                }
                $('#add_email_item').click(function() {
                    var addr = $('#list_email_item').val();
                    if (addr !== '') {
                        addToList('addrlist', addr);
                    }
                    $('#list_email_item').val('');
                    var newemail = '<li>' + addr + '</li>';
                    $(newemail).appendTo($('#add_email_box ul'));
                });
                $('#remove_email_item').click(function() {
                    var addr = $('#list_email_item').val();
                    $('#add_email_box li:contains("' + addr + '")').remove();
                    if (addr !== '') {
                        removeFromList('addrlist', addr);
                    }
                    $('#list_email_item').val('');
                });
                $('#add_email_box li').click(function() {
                    var delemail = $(this).text();
                    $('#list_email_item').val('').val(delemail);
                });

                //------
                $('#wrightdef').click(function() {
                    var prj_opt = {};
                    var opt_name, opt_val;
                    localStorage.removeItem('prj_filter');
                    $('#ch-prj input:checked').each(function() {
                        opt_name = $(this).attr('name');
                        opt_val = $(this).attr('value');
                        prj_opt[opt_name] = opt_val;
                    });
                    localStorage.setItem('prj_filter', JSON.stringify(prj_opt));

                    localStorage.removeItem('wrk_filter');
                    var wrk_opt = {};
                    var wrk_name, wrk_val;
                    $('#ch-wrk input:checked').each(function() {
                        wrk_name = $(this).attr('name');
                        wrk_val = $(this).attr('value');
                        wrk_opt[wrk_name] = wrk_val;
                    });
                    localStorage.setItem('wrk_filter', JSON.stringify(wrk_opt));
                });

            }

            function eliminateDuplicates(arr) {
                var i,
                len = arr.length,
                out = [],
                obj = {};

                for (i = 1; i < len; i++) {
                    obj[arr[i]] = 0;
                }
                for (i in obj) {
                    out.push(i);
                }
                return out;
            }

            //-------------------------------------------------------------------------------------------------------------
            var ca = $.url().param('a');
            switch (ca) {
                case 'new':
                    $('form[name="theForm"]').before('<label class="label_head" for="sset"><input id="sset" class="onoff-opt" type="checkbox" name="sset" value="1" />Показать/скрыть настройки user.js</label><br />');
                    $('#sset').click(function() {
                        if ($(this).prop('checked')) {
                            showSettings();
                        } else {
                            $('#setd').remove();
                        }
                    });
                    newTask();
                    task();
                    break;
                case 't_list':
                    setPeriodYr();
                    break;
                    /*case 'red':
                     task();
                     break;*/
                default :
                    task();
                    taskTime();
                    break;
            }

            function task() {
                //add_email
                var elist = showList('addrlist');
                if (elist !== null && elist.length > 0) {
                    var e_list = '';
                    for (var i = 0; i < elist.length; i++) {
                        e_list += '<option value="' + elist[i] + '">' + elist[i] + '</option>';
                    }
                    var sel = $('<select id="ch_addr" class="ch_addr" multiple="multiple">' + e_list + '</select>');
                    $('#add_email').before(sel);
                    $('#add_email').parent('td').addClass('totop');
                }
                var nem, oem, sem, aem, tem;
                $('#ch_addr').change(function() {
                    nem = $(this).val();
                    oem = $('#add_email').val();
                    if (nem) {
                        if (oem === '') {
                            sem = nem;
                        } else {
                            aem = oem.split(';');
                            for (var i = 0; i < aem.length; i++) {
                                tem = aem[i];
                                for (var c = 0; c < nem.length; c++) {
                                    if (tem === nem[c]) {
                                        nem.splice(c, 1);
                                        break;
                                    }
                                }
                            }
                            var lastch = oem.substring(oem.length - 1);
                            if (lastch === ';') {
                                oem = oem.substring(0, oem.length - 1);
                            }
                            sem = oem + ';' + nem;
                        }
                        if (nem.length > 0) {
                            //$('#add_email').val('');
                            $('#add_email').val(sem);
                        }
                    }
                });
                $('#add_email').change(function() {
                    console.log($(this).val());
                });

                var wrk_list = localStorage.getItem('wrk_filter');
                if (wrk_list !== null) {
                    $('<label><input class="onoff-opt" type="checkbox" id="wfilter" name="wfilter" value="1"> Не использовать фильтр</label>').insertAfter($('#internal_worker'));

                    var wrk_filters = JSON.parse(wrk_list);

                    // Добавляем в список избранных исполнителей людей из колонки «Автор» и «Исполнитель»
                    var wrk = getUserList(4);
                    wrk.concat(getUserList(7));
                    $('#internal_worker option').each(function() {
                        var val = $(this).attr('value');
                        var nm = $(this).text();
                        for (var i = 0; i < wrk.length; i++) {
                            if (nm === wrk[i]) {
                                wrk_filters["p" + val] = val;
                            }
                        }
                    });
                    // console.log(wrk_filters); // Выводим id исполнителей и авторов

                    $('#internal_worker option').each(function() {
                        $(this).addClass('none');
                        for (var k in wrk_filters) {
                            var g = $(this).attr('value');
                            var j = wrk_filters[k];
                            if (j === g) {
                                $(this).addClass('view filter');
                            }
                        }
                    });

                    $('#wfilter').click(function() {
                        if ($(this).prop('checked')) {
                            $('#internal_worker option').removeClass('none');
                        } else {
                            $('#internal_worker option').addClass('none');
                        }
                    });
                }
            }

            // unsafeWindow.checkDigits = function (el) {} // Переопределение встроенной на странице функции checkDigits

            // Функция для вычисления времени из простой строковой формулы в поле ввода с простейшей проверкой
            unsafeWindow.calcTime = function(el) {
                var cur_value = this.value;
                try {
                    cur_value = eval(cur_value);
                } catch (e) {
                    // console.log("Ошибка вычисления");
                    alert("Ошибка вычисления затраченного времени. Используйте числа и знаки «+», «-», «*», «/» и скобки");
                    cur_value = null;
                } finally {
                    if ((cur_value !== null) & (!isNaN(cur_value))) {
                        cur_value = Math.round(cur_value);
                        if (cur_value <= 0) {
                            alert("Отрицательное или нулевое значение времени");
                            cur_value = null;
                        }
                    }
                    this.value = cur_value;
                    // console.log("finally = " + cur_value);
                }
            };

            console.log('alert5');
            var timeElapsedField = document.getElementById('spended_time');
            if(timeElapsedField){
                timeElapsedField.onkeyup = null; // Удаление обработчика нажатия клавиш для поля 'spended_time'
                timeElapsedField.onchange = unsafeWindow.calcTime; // Добавление события для вычисления затраченного времени для поля 'spended_time'
            }

            function getUserList(column) {
                var col = column || 4;
                if (!$('#taskTbl').length) {
                    $('form[name="theForm"] > table:first').attr('id', 'taskTbl');
                }
                var trnum = $('#taskTbl tr').length;
                var wrk = [];
                for (var i = 1; i < trnum; i++) {
                    wrk[i] = $('#taskTbl tr').eq(i).children('td').eq(col).text();
                }

                return wrk;
            }
            console.log('alert4');
            function taskTime() {
                var wrk = getUserList(4);
                var trnum = $('#taskTbl tr').length;
                var ewrk = eliminateDuplicates(wrk);
                var t, ntime, name, tsum;
                var alist = {};
                for (var s = 0; s < ewrk.length; s++) {
                    tsum = 0;
                    for (var i = 1; i < trnum; i++) {
                        t = $('#taskTbl tr').eq(i).children('td').eq(10).text();
                        t = t.split('/');
                        ntime = parseInt(t[0]);
                        name = $('#taskTbl tr').eq(i).children('td').eq(4).text();
                        if (ewrk[s] === name) {
                            tsum += ntime;
                            alist[name] = tsum;
                        }
                    }
                }
                $('div.input_box').eq(0).addClass('clearfix');
                $('<div id="alist" class="alist"></div>').prependTo($('div.input_box').eq(0));
                for (var k in alist) {
                    $('<p>' + k + ' : ' + alist[k] + '</p>').appendTo('#alist');
                }
                defaultWorker();
            }

            $('#internal_worker').keypress(function() { //отображать в списке найденные строки даже если они скрыты фильтром
                $(this).find('option:selected').removeClass('none');
            });
            console.log('alert3');
            function defaultWorker() { //по умолчанию в списке Исполнитель выбирается последний Автор из списка каметнов
                var worker = $('#taskTbl tr:last td').eq(4).text();
                $('#internal_worker option:contains("' + worker + '")').prop('selected', true);
                var val = $('#internal_worker option:contains("' + worker + '")').attr('value');
                $('#new_user').val(val);
            }
            console.log('alert2');
            function newTask() {
                //подставляем имя пользователя
                var unamestr = $('td.u_name').find('a[href*="user_info"]').text();
                var unamearr = unamestr.split(' ');
                var uname = unamearr[0];//первой идет фамилия
                $('#req_fio').val(uname).trigger('keyup');
                $('#rq_list1').find('tr:first').trigger('click');

                var prj_list = localStorage.getItem('prj_filter');
                if (prj_list !== null) {
                    $('<label><input class="onoff-opt" type="checkbox" id="pfilter" name="pfilter" value="1"> Не использовать фильтр</label>').insertAfter($('#project_id'));

                    var prj_filters = JSON.parse(prj_list);
                    $('#project_id option').each(function() {
                        $(this).addClass('none');
                        for (var k in prj_filters) {
                            var g = parseInt($(this).attr('value'));
                            var j = parseInt(prj_filters[k]);
                            if (j === g) {
                                $(this).addClass('view filter');
                            }
                        }
                    });

                    $('#pfilter').click(function() {
                        if ($(this).prop('checked')) {
                            //$('#project_id option[class*="filter"]').toggleClass('view');
                            $('#project_id option').removeClass('none');
                        } else {
                            //$('#project_id option[class*="filter"]').toggleClass('view');
                            $('#project_id option').addClass('none');
                        }
                    });
                }
                //console.log(JSON.parse(tt));


                //ставим тип задания по умолчанию - Задание
                $('#problem_type option[value="5"]').prop('selected', true);
            }
            console.log('alert1');
            //перечень задачь, период поумолчания с начала года до текущего дня
            function setPeriodYr() {
                function formatDate(date) {
                    var dd = date.getDate();
                    if (dd < 10) {
                        dd = '0' + dd;
                    }
                    var mm = date.getMonth() + 1;
                    if (mm < 10) {
                        mm = '0' + mm;
                    }
                    var yy = date.getFullYear();
                    return dd + '.' + mm + '.' + yy;
                }
                var today = new Date();
                var now = formatDate(today);
                today.setMonth(today.getMonth() - 12);
                var yr_start = formatDate(today);
                var dfrom = $('#dateFrom').val();
                var dto = $('#dateTo').val();
                if (dfrom !== yr_start && dto === now) {
                    $('#dateFrom').val(yr_start);
                    $('#dateTo').val(now);
                    $('input[value="Поиск"]').trigger('click');
                }
            }
        });
//        $(window).load(function(){
//
//        });

    }
})(window);