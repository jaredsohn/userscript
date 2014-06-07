// ==UserScript==
// @name 		data2csv
// @author 		soldatovsh@ya.ru
// @version 	0.81
// @description -
// @require  	http://underscorejs.org/underscore.js
// @include 	http://*.auto*.*/*
// @include 	http://*.miraduem*.*/*
// @include 	http://miraduem*.*/*
// @include 	http://*.avito*.*/*
// @include 	http://*.autoexpres*.*/*
// @exclude 	*.css
// @exclude 	*.js
// ==/UserScript==
//
(function(console){
    console.save = function(data, filename){
        if(!data) {
            console.error('Console.save: No data')
            return;
        }

        if(!filename) filename = 'console.json'

        if(typeof data === "object"){
            data = JSON.stringify(data, undefined, 4)
        }

        var blob = new Blob([data], {type: 'text/json'}),
            e    = document.createEvent('MouseEvents'),
            a    = document.createElement('a')

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }
})(console)

function trace(){
    if (typeof(console) != 'undefined') {
        var args = trace.arguments
        for (var i = 0; i < args.length; i++){
            if(i==0 && args[i] == 'clear'){
                if(typeof(console.clear) == 'function') console.clear();
                continue;
            }
            console.info(args[i]);
        }
    }
}

var host = window.location.hostname;



var ROW = [
    -1      //  0   // `add_time` bigint(20) NOT NULL DEFAULT '-1' COMMENT 'Время добавления записи',
    ,0.00   //  1+  // `price` decimal(12,2) NOT NULL DEFAULT '0.00' COMMENT 'Заявленная стоимость авто',
    ,''     //  2   // `reg_mark` varchar(50) NOT NULL DEFAULT '' COMMENT 'Государственный регистрационный номер авто',
    ,''     //  3+  // `brand` varchar(50) NOT NULL DEFAULT '' COMMENT 'Марка по ПТС',
    ,''     //  4+  // `model` varchar(50) NOT NULL DEFAULT '' COMMENT 'Модуль по ПТС',
    ,''     //  5+  // `car_year` varchar(4) NOT NULL DEFAULT '' COMMENT 'Год выпуска по ПТС',
    ,''     //  6   // `car_type` varchar(100) NOT NULL DEFAULT '' COMMENT 'Тип авто (легковое, коммерческое и т.п.)',
    ,''     //  7   // `car_condition` varchar(100) NOT NULL DEFAULT '' COMMENT 'Состояние авто (новое, подержанное и т.п.)',
    ,''     //  8   // `car_production` varchar(100) NOT NULL DEFAULT '' COMMENT 'Производитель (иномарка, отечественное) - возможно будет конкретная страна',
    ,''     //  9+  // `color` varchar(50) NOT NULL DEFAULT '' COMMENT 'Цвет по ПТС',
    ,''     //  10  // `engine` varchar(50) NOT NULL DEFAULT '' COMMENT 'Номер двигателя',
    ,''     //  11  // `car_body` varchar(50) NOT NULL DEFAULT '' COMMENT 'Номер кузова',
    ,''     //  12  // `chassis` varchar(50) NOT NULL DEFAULT '' COMMENT 'Номер шасси',
    ,''     //  13+ // `vin` varchar(50) NOT NULL DEFAULT '' COMMENT 'VIN номер',
    ,''     //  14  // `pts_series` varchar(50) NOT NULL DEFAULT '' COMMENT 'Серия ПТС',
    ,''     //  15  // `pts_number` varchar(50) NOT NULL DEFAULT '' COMMENT 'Номер ПТС',
    ,-1     //  16  // `issue_date` bigint(20) NOT NULL DEFAULT '-1' COMMENT 'Дата выдачи ПТС',
    ,''     //  17  // `issue_place` varchar(150) NOT NULL DEFAULT '' COMMENT 'Место выдачи ПТС',
    ,''     //  18+ // `v_engine` varchar(10) NOT NULL DEFAULT '' COMMENT 'Объем двигателя',
    ,0      //  19+ // `kilometrage` int(11) NOT NULL DEFAULT '0' COMMENT 'Пробег',
    ,''     //  20  // `regdoc_series` varchar(50) NOT NULL DEFAULT '',
    ,''     //  21  // `regdoc_number` varchar(50) NOT NULL DEFAULT '',
    ,-1     //  22  // `regdoc_date` bigint(20) NOT NULL DEFAULT '-1',
    ,''     //  23  // `regdoc_issue_place` varchar(255) NOT NULL DEFAULT '',
    ,''     //  24+ // `gearbox` varchar(100) NOT NULL DEFAULT '',
    ,''     //  25+ // `comment` text NOT NULL,
    ,''     //  26+ // `out_id` varchar(100) NOT NULL DEFAULT '',
    ,''     //  27+ // `out_type` varchar(100) NOT NULL DEFAULT '',
    ,-1     //  28+ //  'owner'
];


(function() {

    var config = {
        "www.autoexpres.ru": {
            method: "parseAutoexpres"
            ,fnc: function(td){
                var row = _.extend([],ROW);
                price = _f.getNumber(td[2].textContent);   // цена
                if(price<250000){
                    price = price + 3800;
                }else if(price>=250000 && price <500000){
                    price = price + 4100;
                }else{
                    price = price + 4300;
                }
                row[1] = parseInt(price*100)/100;

                row[3] = _f.get(td[0].textContent);   // марка
                row[5] = _f.getNumber(td[1].textContent);   // год выпуска
                row[9] = (td[6].textContent);   // цвет
                row[18] = _f.getNumber(td[4].textContent);   // Объем двигателя
                row[19] = _f.getNumber(td[7].textContent);   // Пробег

                row[27] = 'avrora';
                row[28] = 683;

                row.unshift(MD5("www.autoexpres.ru"+'|'+row[3]+'|'+row[5]+'|'+row[19])
                    ,_f.getAttr(td[0].querySelector("a"),'href'));
                return row;
            }
        }
        ,
        "www.avito.ru": {
            "audi-warshavka":{
                method: "parseAvito"
                ,fnc: function(n){
                    var row = _.extend([],ROW);

                    var price = _f.getNumber(n.querySelector(".description .about span").textContent);   // цена
                    var title = _f.get(n.querySelector(".description .title a").textContent).split(',');

                    row[1] = parseInt(price*0.06*100)/100;
                    if(title.length>1){
                        row[3] = title[0];   // марка
                        row[5] = _f.getNumber(title[1]);   // год выпуска
                    }else{
                        row[3] = title[0];   // марка
                    }

                    row.unshift(MD5("www.avito.ru"+'|'+row[3]+'|'+row[5])
                        ,_f.getAttr(n.querySelector(".description .title a"),'href'));
                    return row;
                }
            }
        }
        ,"cars.auto.ru" : {
            "5917" : {
                method: "parseTable"
                ,fnc: function(td){
                    var row = _.extend([],ROW);
                    price = _f.getNumber(td[1].textContent);   // цена
                    row[1] = parseInt(price*1.03*100)/100;

                    row[3] = _f.get(td[0].textContent);   // марка
                    row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                    row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                    row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                    row[19] = _f.getNumber(td[5].textContent);   // Пробег

                    row.unshift(MD5(["cars.auto.ru","5917",row[3],row[5],row[19]].join(','))
                        ,_f.getAttr(td[0].querySelector("a"),'href'));
                    return row;
                }
            }
            ,"3201" : {
                method: "parseTable"
                ,fnc: function(td){
                    var row = _.extend([],ROW);
                    price = _f.getNumber(td[1].textContent);   // цена
                    row[1] = parseInt(Math.max(price*1.15,price+35000)*100)/100;

                    row[3] = _f.get(td[0].textContent);   // марка
                    row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                    row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                    row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                    row[19] = _f.getNumber(td[5].textContent);   // Пробег

                    row.unshift(MD5(["cars.auto.ru","3201",row[3],row[5],row[19]].join(','))
                        ,_f.getAttr(td[1].querySelector("a"),'href'));
                    return row;
                }
            }
            ,"1235" : {
                method: "parseTable"
                ,fnc: function(td){
                    var row = _.extend([],ROW);
                    price = _f.getNumber(td[1].textContent);   // цена
                    row[1] = parseInt(price*1.06*100)/100;

                    row[3] = _f.get(td[0].textContent);   // марка
                    row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                    row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                    row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                    row[19] = _f.getNumber(td[5].textContent);   // Пробег

                    row.unshift(MD5(["cars.auto.ru","1235",row[3],row[5],row[19]].join(','))
                        ,_f.getAttr(td[0].querySelector("a"),'href'));
                    return row;
                }
            }
            // Пеликан центр Алтуфьево
            ,"11848" : {
                method: "parseTable"
                ,fnc: function(td){
                    var row = _.extend([],ROW);
                    price = _f.getNumber(td[1].textContent);   // цена
                    row[1] = parseInt(price*100)/100;

                    row[3] = 'Skoda';   // модель
                    row[4] = _f.get(td[0].textContent);   // модель
                    row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                    row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                    row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                    row[19] = _f.getNumber(td[5].textContent);   // Пробег
                    row[28] = 279;   // owner

                    row.unshift(MD5(["cars.auto.ru","11848",row[3],row[5],row[19]].join(','))
                        ,_f.getAttr(td[0].querySelector("a"),'href'));
                    return row;
                }
            }
            // ПЕЛИКАН-АВТО
            ,"1872" : {
                method: "parseTable"
                ,fnc: function(td){
                    var row = _.extend([],ROW);
                    price = _f.getNumber(td[1].textContent);   // цена
                    row[1] = parseInt(price*100)/100;

                    row[3] = 'Skoda';   // модель
                    row[4] = _f.get(td[0].textContent);   // модель
                    row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                    row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                    row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                    row[19] = _f.getNumber(td[5].textContent);   // Пробег
                    row[28] = 279;   // owner

                    row.unshift(MD5(["cars.auto.ru","1872",row[3],row[5],row[19]].join(','))
                        ,_f.getAttr(td[0].querySelector("a"),'href'));
                    return row;
                }
            }
            // Major Auto
            ,"3734" : {
                method: "parseTable"
                ,fnc: function(td){
                    var row = _.extend([],ROW);
                    price = _f.getNumber(td[1].textContent);   // цена
                    row[1] = parseInt(price*100)/100;

                    row[3] = _f.get(td[0].textContent);   // марка
                    row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                    row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                    row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                    row[19] = _f.getNumber(td[5].textContent);   // Пробег

                    row.unshift(MD5(["cars.auto.ru","3734",row[3],row[5],row[19]].join(','))
                        ,_f.getAttr(td[0].querySelector("a"),'href'));
                    return row;
                }
            }
            ,"10828" : {
                method: "parseTable"
                ,fnc: function(td){
                    var row = _.extend([],ROW);
                    price = _f.getNumber(td[1].textContent);   // цена
                    row[1] = parseInt(price*100)/100;

                    row[3] = _f.get(td[0].textContent);   // марка
                    row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                    row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                    row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                    row[19] = _f.getNumber(td[5].textContent);   // Пробег
                    row[27] = 'fresh';   //
                    row[28] = 100;   // owner

                    row.unshift(MD5(["cars.auto.ru","10828",row[3],row[5],row[19]].join(','))
                        ,_f.getAttr(td[0].querySelector("a"),'href'));
                    return row;
                }
            }
            // Ауди Центр Сити
            ,"2482" : {
                method: "parseTable"
                ,fnc: function(td){
                    var row = _.extend([],ROW);
                    price = _f.getNumber(td[1].textContent);   // цена
                    row[1] = parseInt(price*100)/100;

                    row[3] = _f.get(td[0].textContent);   // марка
                    row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                    row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                    row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                    row[19] = _f.getNumber(td[5].textContent);   // Пробег

                    row.unshift(MD5(["cars.auto.ru","2482",row[3],row[5],row[19]].join(','))
                        ,_f.getAttr(td[0].querySelector("a"),'href'));
                    return row;
                }
            }
            // Major Expert Дмитровка
            ,"8968" : {
                method: "parseTable"
                ,fnc: function(td){
                    var row = _.extend([],ROW);
                    price = _f.getNumber(td[1].textContent);   // цена
                    row[1] = parseInt(price*100)/100;

                    row[3] = _f.get(td[0].textContent);   // марка
                    row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                    row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                    row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                    row[19] = _f.getNumber(td[5].textContent);   // Пробег

                    row.unshift(MD5(["cars.auto.ru","8968",row[3],row[5],row[19]].join(','))
                        ,_f.getAttr(td[0].querySelector("a"),'href'));
                    return row;
                }
            }
            // Тойота Центр Шереметьево
            ,"1727" : {
                method: "parseTable"
                ,fnc: function(td){
                    var row = _.extend([],ROW);
                    price = _f.getNumber(td[1].textContent);   // цена
                    row[1] = parseInt(price*100)/100;

                    row[3] = _f.get(td[0].textContent);   // марка
                    row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                    row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                    row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                    row[19] = _f.getNumber(td[5].textContent);   // Пробег

                    row.unshift(MD5(["cars.auto.ru","1727",row[3],row[5],row[19]].join(','))
                        ,_f.getAttr(td[0].querySelector("a"),'href'));
                    return row;
                }
            }
            // Авто-Авангард
            ,"3092" : {
                method: "parseTable"
                ,fnc: function(td){
                    var row = _.extend([],ROW);
                    price = _f.getNumber(td[1].textContent);   // цена
                    row[1] = parseInt(price*100)/100;

                    row[3] = _f.get(td[0].textContent);   // марка
                    row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                    row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                    row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                    row[19] = _f.getNumber(td[5].textContent);   // Пробег

                    row.unshift(MD5(["cars.auto.ru","3092",row[3],row[5],row[19]].join(','))
                        ,_f.getAttr(td[0].querySelector("a"),'href'));
                    return row;
                }
            }
            // Ауди Центр ЮГ
            ,"1193" : {
                method: "parseTable"
                ,fnc: function(td){
                    var row = _.extend([],ROW);
                    price = _f.getNumber(td[1].textContent);   // цена
                    row[1] = parseInt(price*100)/100;

                    row[3] = _f.get(td[0].textContent);   // марка
                    row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                    row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                    row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                    row[19] = _f.getNumber(td[5].textContent);   // Пробег

                    row.unshift(MD5(["cars.auto.ru","1193",row[3],row[5],row[19]].join(','))
                        ,_f.getAttr(td[0].querySelector("a"),'href'));
                    return row;
                }
            }
            // MAJOR - EXPERT
            ,"1217" : {
                method: "parseTable"
                ,fnc: function(td){
                    var row = _.extend([],ROW);
                    price = _f.getNumber(td[1].textContent);   // цена
                    row[1] = parseInt(price*100)/100;

                    row[3] = _f.get(td[0].textContent);   // марка
                    row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                    row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                    row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                    row[19] = _f.getNumber(td[5].textContent);   // Пробег

                    row.unshift(MD5(["cars.auto.ru","1217",row[3],row[5],row[19]].join(','))
                        ,_f.getAttr(td[0].querySelector("a"),'href'));
                    return row;
                }
            }
            // MAJOR USED CARS МКАД 4
            ,"2960" : {
                method: "parseTable"
                ,fnc: function(td){
                    var row = _.extend([],ROW);
                    price = _f.getNumber(td[1].textContent);   // цена
                    row[1] = parseInt(price*100)/100;

                    row[3] = _f.get(td[0].textContent);   // марка
                    row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                    row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                    row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                    row[19] = _f.getNumber(td[5].textContent);   // Пробег

                    row.unshift(MD5(["cars.auto.ru","2960",row[3],row[5],row[19]].join(','))
                        ,_f.getAttr(td[0].querySelector("a"),'href'));
                    return row;
                }
            }
            // Major Волоколамка
            ,"3415" : {
                method: "parseTable"
                ,fnc: function(td){
                    var row = _.extend([],ROW);
                    price = _f.getNumber(td[1].textContent);   // цена
                    row[1] = parseInt(price*100)/100;

                    row[3] = _f.get(td[0].textContent);   // марка
                    row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                    row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                    row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                    row[19] = _f.getNumber(td[5].textContent);   // Пробег

                    row.unshift(MD5(["cars.auto.ru","3415",row[3],row[5],row[19]].join(','))
                        ,_f.getAttr(td[0].querySelector("a"),'href'));
                    return row;
                }
            }
            // АВТО-СТАРТ
            ,"1273" : {
                method : 'array'
                ,cars : {
                    method: "parseTable"
                    ,fnc: function(td){
                        var row = _.extend([],ROW);
                        price = _f.getNumber(td[1].textContent);   // цена
                        if(price<250000){
                            price = price + 3800;
                        }else if(price>=250000 && price <500000){
                            price = price + 4100;
                        }else{
                            price = price + 4300;
                        }
                        row[1] = parseInt(price*100)/100;

                        row[3] = _f.get(td[0].textContent);   // марка
                        row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                        row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                        row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                        row[19] = _f.getNumber(td[5].textContent);   // Пробег
                        row[27] = 'avrora';
                        row[28] = 683;

                        row.unshift(MD5(["cars.auto.ru","1273",row[3],row[5],row[19]].join(','))
                            ,_f.getAttr(td[0].querySelector("a"),'href'));
                        return row;
                    }
                }
                ,light_trucks:{
                    method: "parseTable"
                    ,fnc: function(td){
                        var row = _.extend([],ROW);

                        price = _f.getNumber(td[3].textContent);   // цена
                        if(price<250000){
                            price = price + 3800;
                        }else if(price>=250000 && price <500000){
                            price = price + 4100;
                        }else{
                            price = price + 4300;
                        }
                        row[1] = parseInt(price*100)/100;

                        row[3] = _f.get(td[0].textContent);   // марка
                        row[5] = _f.getNumber(td[1].textContent);   // год выпуска
                        row[5] = _f.getAttr(td[7].querySelector("div"),'title');   // цвет
                        row[18] = _f.getNumber(td[5].textContent);   // Объем двигателя
                        row[19] = _f.getNumber(td[2].textContent);   // Пробег
                        row[27] = 'avrora';
                        row[28] = 683;

                        row.unshift(MD5(["cars.auto.ru","1273",row[3],row[5],row[19]].join(','))
                            ,_f.getAttr(td[0].querySelector("a"),'href'));
                        return row;
                    }
                }
            }
            // Major CITY(авто Рига)
            ,"2513" : {
                method : 'array'
                ,cars : {
                    method: "parseTable"
                    ,fnc: function(td){
                        var row = _.extend([],ROW);
                        price = _f.getNumber(td[1].textContent);   // цена
                        row[1] = parseInt(price*100)/100;

                        row[3] = _f.get(td[0].textContent);   // марка
                        row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                        row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                        row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                        row[19] = _f.getNumber(td[5].textContent);   // Пробег

                        row.unshift(MD5(["cars.auto.ru","2513",row[3],row[5],row[19]].join(','))
                            ,_f.getAttr(td[0].querySelector("a"),'href'));
                        return row;
                    }
                }
                ,light_trucks:{
                    method: "parseTable"
                    ,fnc: function(td){
                        var row = _.extend([],ROW);
                        price = _f.getNumber(td[3].textContent);   // цена
                        row[1] = parseInt(price*100)/100;

                        row[3] = _f.get(td[0].textContent);   // марка
                        row[5] = _f.getNumber(td[1].textContent);   // год выпуска
                        row[5] = _f.getAttr(td[7].querySelector("div"),'title');   // цвет
                        row[18] = _f.getNumber(td[5].textContent);   // Объем двигателя
                        row[19] = _f.getNumber(td[2].textContent);   // Пробег

                        row.unshift(MD5(["cars.auto.ru","2513",row[3],row[5],row[19]].join(','))
                            ,_f.getAttr(td[0].querySelector("a"),'href'));
                        return row;
                    }
                }
            }
            // Тойота Центр Сокольники
            ,"2605" : {
                method : 'array'
                ,cars : {
                    method: "parseTable"
                    ,fnc: function(td){
                        var row = _.extend([],ROW);
                        price = _f.getNumber(td[1].textContent);   // цена
                        row[1] = parseInt(price*100)/100;

                        row[3] = _f.get(td[0].textContent);   // марка
                        row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                        row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                        row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                        row[19] = _f.getNumber(td[5].textContent);   // Пробег

                        row.unshift(MD5(["cars.auto.ru","2605",row[3],row[5],row[19]].join(','))
                            ,_f.getAttr(td[0].querySelector("a"),'href'));
                        return row;
                    }
                }
                ,light_trucks:{
                    method: "parseTable"
                    ,fnc: function(td){
                        var row = _.extend([],ROW);
                        price = _f.getNumber(td[3].textContent);   // цена
                        row[1] = parseInt(price*100)/100;

                        row[3] = _f.get(td[0].textContent);   // марка
                        row[5] = _f.getNumber(td[1].textContent);   // год выпуска
                        row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                        row[18] = _f.getNumber(td[5].textContent);   // Объем двигателя
                        row[19] = _f.getNumber(td[2].textContent);   // Пробег

                        row.unshift(MD5(["cars.auto.ru","2605",row[3],row[5],row[19]].join(','))
                            ,_f.getAttr(td[0].querySelector("a"),'href'));
                        return row;
                    }
                }
            }
            // Major Expert Капотня
            ,"1484" : {
                method : 'array'
                ,cars : {
                    method: "parseTable"
                    ,fnc: function(td){
                        var row = _.extend([],ROW);
                        price = _f.getNumber(td[1].textContent);   // цена
                        row[1] = parseInt(price*100)/100;

                        row[3] = _f.get(td[0].textContent);   // марка
                        row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                        row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                        row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                        row[19] = _f.getNumber(td[5].textContent);   // Пробег

                        row.unshift(MD5(["cars.auto.ru","1484",row[3],row[5],row[19]].join(','))
                            ,_f.getAttr(td[0].querySelector("a"),'href'));
                        return row;
                    }
                }
                ,light_trucks:{
                    method: "parseTable"
                    ,fnc: function(td){
                        var row = _.extend([],ROW);
                        price = _f.getNumber(td[3].textContent);   // цена
                        row[1] = parseInt(price*100)/100;

                        row[3] = _f.get(td[0].textContent);   // марка
                        row[5] = _f.getNumber(td[1].textContent);   // год выпуска
                        row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                        row[18] = _f.getNumber(td[5].textContent);   // Объем двигателя
                        row[19] = _f.getNumber(td[2].textContent);   // Пробег

                        row.unshift(MD5(["cars.auto.ru","1484",row[3],row[5],row[19]].join(','))
                            ,_f.getAttr(td[0].querySelector("a"),'href'));
                        return row;
                    }
                }
            }
            // Автофорум
            ,"1077" : {
                method : 'array'
                ,cars : {
                    method: "parseTable"
                    ,fnc: function(td){
                        var row = _.extend([],ROW);
                        price = _f.getNumber(td[1].textContent);   // цена
                        row[1] = parseInt(price*100)/100;

                        row[3] = _f.get(td[0].textContent);   // марка
                        row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                        row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                        row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                        row[19] = _f.getNumber(td[5].textContent);   // Пробег

                        row.unshift(MD5(["cars.auto.ru","1077",row[3],row[5],row[19]].join(','))
                            ,_f.getAttr(td[0].querySelector("a"),'href'));
                        return row;
                    }
                }
                ,vip:{
                    method: "parseTable"
                    ,fnc: function(td){
                        var row = _.extend([],ROW);
                        price = _f.getNumber(td[3].textContent);   // цена
                        row[1] = parseInt(price*100)/100;

                        row[3] = _f.get(td[1].textContent);   // марка
                        row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                        row[5] = _f.getAttr(td[10].querySelector("div"),'title');   // цвет
                        row[18] = _f.getNumber(td[7].textContent);   // Объем двигателя
                        row[19] = _f.getNumber(td[4].textContent);   // Пробег

                        row.unshift(MD5(["cars.auto.ru","1077",row[3],row[5],row[19]].join(','))
                            ,_f.getAttr(td[1].querySelector("a"),'href'));
                        return row;
                    }
                }
            }
            // Ауди Центр Восток
            ,"12148" : {
                method : 'array'
                ,cars : {
                    method: "parseTable"
                    ,fnc: function(td){
                        var row = _.extend([],ROW);
                        price = _f.getNumber(td[1].textContent);   // цена
                        row[1] = parseInt(price*1.03*100)/100;

                        row[3] = _f.get(td[0].textContent);   // марка
                        row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                        row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                        row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                        row[19] = _f.getNumber(td[5].textContent);   // Пробег

                        row.unshift(MD5(["cars.auto.ru","12148",row[3],row[5],row[19]].join(','))
                            ,_f.getAttr(td[0].querySelector("a"),'href'));
                        return row;
                    }
                }
            }
            //
            ,"6780" : {
                method : 'array'
                ,cars : {
                    method: "parseTable"
                    ,fnc: function(td){
                        var row = _.extend([],ROW);
                        price = _f.getNumber(td[1].textContent);   // цена
                        row[1] = parseInt(price*100)/100+50000;

                        row[3] = _f.get(td[0].textContent);   // марка
                        row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                        row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                        row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                        row[19] = _f.getNumber(td[5].textContent);   // Пробег

                        row.unshift(MD5(["cars.auto.ru","6780",row[3],row[5],row[19]].join(','))
                            ,_f.getAttr(td[0].querySelector("a"),'href'));
                        return row;
                    }
                }
                ,light_trucks:{
                    method: "parseTable"
                    ,fnc: function(td){
                        var row = _.extend([],ROW);
                        price = _f.getNumber(td[3].textContent);   // цена
                        row[1] = parseInt(price*100)/100+50000;

                        row[3] = _f.get(td[0].textContent);   // марка
                        row[5] = _f.getNumber(td[1].textContent);   // год выпуска
                        row[5] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                        row[18] = _f.getNumber(td[5].textContent);   // Объем двигателя
                        row[19] = _f.getNumber(td[2].textContent);   // Пробег

                        row.unshift(MD5(["cars.auto.ru","6780",row[3],row[5],row[19]].join(','))
                            ,_f.getAttr(td[0].querySelector("a"),'href'));
                        return row;
                    }
                }
            }
            //ГАЛФ-трейд
            ,"7623" : {
                method : 'array'
                ,cars : {
                    method: "parseTable"
                    ,fnc: function(td){
                        var row = _.extend([],ROW);
                        price = _f.getNumber(td[1].textContent);   // цена
                        row[1] = parseInt(price*1.06*100)/100;

                        row[3] = _f.get(td[0].textContent);   // марка
                        row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                        row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                        row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                        row[19] = _f.getNumber(td[5].textContent);   // Пробег

                        row.unshift(MD5(["cars.auto.ru","7623",row[3],row[5],row[19]].join(','))
                            ,_f.getAttr(td[0].querySelector("a"),'href'));
                        return row;
                    }
                }
                ,light_trucks:{
                    method: "array"
                    ,new: {
                        method: "parseTable"
                        ,fnc: function(td){
                            var row = _.extend([],ROW);
                            price = _f.getNumber(td[3].textContent);   // цена
                            row[1] = parseInt(price*1.06*100)/100;

                            row[3] = _f.get(td[0].textContent);   // марка
                            row[5] = _f.getNumber(td[3].textContent);   // год выпуска
                            row[5] = _f.getAttr(td[6].querySelector("div"),'title');   // цвет
                            row[18] = _f.getNumber(td[4].textContent);   // Объем двигателя

                            row.unshift(MD5(["cars.auto.ru","7623",row[3],row[5],row[19]].join(','))
                                ,_f.getAttr(td[0].querySelector("a"),'href'));
                            return row;
                        }
                    }
                    ,used: {
                        method: "parseTable"
                        ,fnc: function(td){
                            var row = _.extend([],ROW);
                            price = _f.getNumber(td[3].textContent);   // цена
                            row[1] = parseInt(price*1.06*100)/100;

                            row[3] = _f.get(td[0].textContent);   // марка
                            row[5] = _f.getNumber(td[1].textContent);   // год выпуска
                            row[5] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                            row[18] = _f.getNumber(td[5].textContent);   // Объем двигателя
                            row[19] = _f.getNumber(td[2].textContent);   // Пробег

                            row.unshift(MD5(["cars.auto.ru","7623",row[3],row[5],row[19]].join(','))
                                ,_f.getAttr(td[0].querySelector("a"),'href'));
                            return row;
                        }
                    }
                }
                ,trucks:{
                    method: "array"
                    ,new: {
                        method: "parseTable"
                        ,fnc: function(td){
                            var row = _.extend([],ROW);
                            price = _f.getNumber(td[1].textContent);   // цена
                            row[1] = parseInt(price*1.06*100)/100;

                            row[3] = _f.get(td[0].textContent);   // марка
                            row[5] = _f.getNumber(td[3].textContent);   // год выпуска
                            row[5] = _f.getAttr(td[7].querySelector("div"),'title');   // цвет
                            row[18] = _f.getNumber(td[4].textContent);   // Объем двигателя

                            row.unshift(MD5(["cars.auto.ru","7623",row[3],row[5],row[19]].join(','))
                                ,_f.getAttr(td[0].querySelector("a"),'href'));
                            return row;
                        }
                    }
                    ,used: {
                        method: "parseTable"
                        ,fnc: function(td){
                            var row = _.extend([],ROW);
                            price = _f.getNumber(td[4].textContent);   // цена
                            row[1] = parseInt(price*1.06*100)/100;

                            row[3] = _f.get(td[1].textContent);   // марка
                            row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                            row[5] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                            row[18] = _f.getNumber(td[6].textContent);   // Объем двигателя
                            row[19] = _f.getNumber(td[3].textContent);   // Пробег

                            row.unshift(MD5(["cars.auto.ru","7623",row[3],row[5],row[19]].join(','))
                                ,_f.getAttr(td[1].querySelector("a"),'href'));
                            return row;
                        }
                    }
                }
                ,bus:{
                    method: "array"
                    ,new: {
                        method: "parseTable"
                        ,fnc: function(td){
                            var row = _.extend([],ROW);
                            price = _f.getNumber(td[1].textContent);   // цена
                            row[1] = parseInt(price*1.06*100)/100;

                            row[3] = _f.get(td[0].textContent);   // марка
                            row[5] = _f.getNumber(td[3].textContent);   // год выпуска
                            row[5] = _f.getAttr(td[6].querySelector("div"),'title');   // цвет
                            row[18] = _f.getNumber(td[4].textContent);   // Объем двигателя

                            row.unshift(MD5(["cars.auto.ru","7623",row[3],row[5],row[19]].join(','))
                                ,_f.getAttr(td[0].querySelector("a"),'href'));
                            return row;
                        }
                    }

                }
            }
            // BAVARIA AUTO
            ,"1104" : {
                method : 'array'
                ,cars : {
                    method : 'array'
                    ,used : {
                        method: "parseTable"
                        ,fnc: function(td){
                            var row = _.extend([],ROW);
                            price = _f.getNumber(td[1].textContent);   // цена
                            row[1] = parseInt(price*100)/100;

                            row[3] = _f.get(td[0].textContent);   // марка
                            row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                            row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                            row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                            row[19] = _f.getNumber(td[5].textContent);   // Пробег
                            row[28] = 796;

                            row.unshift(MD5(["cars.auto.ru","1104",row[3],row[5],row[19]].join(','))
                                ,_f.getAttr(td[0].querySelector("a"),'href'));
                            return row;
                        }
                    }
                    ,new: {
                        method: "parseTable"
                        ,fnc: function(td){
                            var row = _.extend([],ROW);
                            price = _f.getNumber(td[3].textContent);   // цена
                            row[1] = parseInt(price*100)/100;

                            row[3] = _f.get(td[1].textContent);   // марка
                            row[5] = _f.getNumber(td[5].textContent);   // год выпуска
                            row[9] = _f.getAttr(td[9].querySelector("div"),'title');   // цвет
                            row[18] = _f.getNumber(td[6].textContent);   // Объем двигателя
                            row[28] = 796;

                            row.unshift(MD5(["cars.auto.ru","1104",row[3],row[5],row[19]].join(','))
                                ,_f.getAttr(td[1].querySelector("a"),'href'));
                            return row;
                        }
                    }
                }
                ,light_trucks:{
                    method: "parseTable"
                    ,fnc: function(td){
                        var row = _.extend([],ROW);
                        price = _f.getNumber(td[3].textContent);   // цена
                        row[1] = parseInt(price*100)/100;

                        row[3] = _f.get(td[0].textContent);   // марка
                        row[5] = _f.getNumber(td[1].textContent);   // год выпуска
                        row[5] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                        row[18] = _f.getNumber(td[5].textContent);   // Объем двигателя
                        row[19] = _f.getNumber(td[2].textContent);   // Пробег
                        row[28] = 796;

                        row.unshift(MD5(["cars.auto.ru","1104",row[3],row[5],row[19]].join(','))
                            ,_f.getAttr(td[0].querySelector("a"),'href'));
                        return row;
                    }
                }
            }
        }


        ,"trucks.auto.ru":{
            // AUTOMAXIMUS
            "4506" : {
                method : 'array'
                ,cars : {
                    method: "parseTable"
                    ,fnc: function(td){
                        var row = _.extend([],ROW);
                        price = _f.getNumber(td[1].textContent);   // цена
                        row[1] = parseInt(price*100)/100;

                        row[3] = _f.get(td[0].textContent);   // марка
                        row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                        row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                        row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                        row[19] = _f.getNumber(td[5].textContent);   // Пробег

                        row.unshift(MD5(["trucks.auto.ru","4506",row[3],row[5],row[19]].join(','))
                            ,_f.getAttr(td[0].querySelector("a"),'href'));
                        return row;
                    }
                }
                ,trucks : {
                    method: "parseTable"
                    ,fnc: function(td){
                        var row = _.extend([],ROW);
                        price = _f.getNumber(td[1].textContent);   // цена
                        row[1] = parseInt(price*100)/100;

                        row[3] = _f.get(td[0].textContent);   // марка
                        row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                        row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                        row[19] = _f.getNumber(td[3].textContent);   // Пробег

                        row.unshift(MD5(["trucks.auto.ru","4506",row[3],row[5],row[19]].join(','))
                            ,_f.getAttr(td[0].querySelector("a"),'href'));
                        return row;
                    }
                }
                ,artic : {
                    method: "parseTable"
                    ,fnc: function(td){
                        var row = _.extend([],ROW);
                        price = _f.getNumber(td[3].textContent);   // цена
                        row[1] = parseInt(price*100)/100;

                        row[3] = _f.get(td[1].textContent);   // марка
                        row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                        row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                        row[19] = _f.getNumber(td[4].textContent);   // Пробег

                        row.unshift(MD5(["trucks.auto.ru","4506",row[3],row[5],row[19]].join(','))
                            ,_f.getAttr(td[1].querySelector("a"),'href'));
                        return row;
                    }
                }
                ,agricultural: {
                    method: "parseTable"
                    ,fnc: function(td){
                        var row = _.extend([],ROW);
                        price = _f.getNumber(td[3].textContent);   // цена
                        row[1] = parseInt(price*100)/100;

                        row[3] = _f.get(td[1].textContent);   // марка
                        row[5] = _f.getNumber(td[0].textContent);   // год выпуска
                        row[18] = _f.getNumber(td[6].textContent);   // Объем двигателя

                        row.unshift(MD5(["trucks.auto.ru","4506",row[3],row[5],row[19]].join(','))
                            ,_f.getAttr(td[1].querySelector("a"),'href'));
                        return row;
                    }
                }
                ,light_trucks : {
                    method: "array"
                    , "used" : {
                        method: "parseTable"
                        ,fnc: function(td){
                            var row = _.extend([],ROW);
                            price = _f.getNumber(td[3].textContent);   // цена
                            row[1] = parseInt(price*100)/100;

                            row[3] = _f.get(td[0].textContent);   // марка
                            row[5] = _f.getNumber(td[1].textContent);   // год выпуска
                            row[5] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                            row[18] = _f.getNumber(td[5].textContent);   // Объем двигателя
                            row[19] = _f.getNumber(td[2].textContent);   // Пробег

                            row.unshift(MD5(["trucks.auto.ru","4506",row[3],row[5],row[19]].join(','))
                                ,_f.getAttr(td[0].querySelector("a"),'href'));
                            return row;
                        }
                    }
                    ,"new" :{
                        method: "parseTable"
                        ,fnc: function(td){
                            var row = _.extend([],ROW);
                            price = _f.getNumber(td[1].textContent);   // цена
                            row[1] = parseInt(price*100)/100;

                            row[3] = _f.get(td[0].textContent);   // марка
                            row[5] = _f.getNumber(td[3].textContent);   // год выпуска
                            row[5] = _f.getAttr(td[6].querySelector("div"),'title');   // цвет*/

                            row.unshift(MD5(["trucks.auto.ru","4506",row[3],row[5],row[19]].join(','))
                                ,_f.getAttr(td[0].querySelector("a"),'href'));
                            return row;
                        }
                    }
                }
                ,dredge : {
                    method : 'array'
                    ,"used" :{
                        method: "parseTable"
                        ,fnc: function(td){
                            var row = _.extend([],ROW);
                            price = _f.getNumber(td[3].textContent);   // цена
                            row[1] = parseInt(price*100)/100;

                            row[3] = _f.get(td[1].textContent);   // марка
                            row[5] = _f.getNumber(td[0].textContent);   // год выпуска
                            row[19] = _f.getNumber(td[5].textContent);   // Пробег

                            row.unshift(MD5(["trucks.auto.ru","4506",row[3],row[5],row[19]].join(','))
                                ,_f.getAttr(td[1].querySelector("a"),'href'));
                            return row;
                        }
                    }

                }
            }
            // FRESH КомТранс
            ,"11172" : {
                method : 'array'
                ,cars : {
                    method: "parseTable"
                    ,fnc: function(td){
                        var row = _.extend([],ROW);
                        price = _f.getNumber(td[1].textContent);   // цена
                        row[1] = parseInt(price*100)/100;

                        row[3] = _f.get(td[0].textContent);   // марка
                        row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                        row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                        row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                        row[19] = _f.getNumber(td[5].textContent);   // Пробег
                        row[27] = 'fresh';
                        row[28] = 100;

                        row.unshift(MD5(["trucks.auto.ru","11172",row[3],row[5],row[19]].join(','))
                            ,_f.getAttr(td[0].querySelector("a"),'href'));
                        return row;
                    }
                }
                ,light_trucks : {
                    method: "array"
                    , "used" : {
                        method: "parseTable"
                        ,fnc: function(td){
                            var row = _.extend([],ROW);
                            price = _f.getNumber(td[3].textContent);   // цена
                            row[1] = parseInt(price*100)/100;

                            row[3] = _f.get(td[0].textContent);   // марка
                            row[5] = _f.getNumber(td[1].textContent);   // год выпуска
                            row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                            row[18] = _f.getNumber(td[5].textContent);   // Объем двигателя
                            row[19] = _f.getNumber(td[2].textContent);   // Пробег
                            row[27] = 'fresh';
                            row[28] = 100;

                            row.unshift(MD5(["trucks.auto.ru","11172",row[3],row[5],row[19]].join(','))
                                ,_f.getAttr(td[0].querySelector("a"),'href'));
                            return row;
                        }
                    }
                }
                ,trucks : {
                    method: "parseTable"
                    ,fnc: function(td){
                        var row = _.extend([],ROW);
                        price = _f.getNumber(td[1].textContent);   // цена
                        row[1] = parseInt(price*100)/100;

                        row[3] = _f.get(td[0].textContent);   // марка
                        row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                        row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                        row[19] = _f.getNumber(td[3].textContent);   // Пробег
                        row[27] = 'fresh';
                        row[28] = 100;

                        row.unshift(MD5(["trucks.auto.ru","11172",row[3],row[5],row[19]].join(','))
                            ,_f.getAttr(td[0].querySelector("a"),'href'));
                        return row;
                    }
                }

            }
        }


        ,"all.auto.ru":{
            // Первая автомобильная компания
            "6409" : {
                method : 'array'
                ,cars : {
                    method: "parseTable"
                    ,fnc: function(td){
                        var row = _.extend([],ROW);
                        price = _f.getNumber(td[1].textContent);   // цена
                        row[1] = parseInt(price*1.12*100)/100;

                        row[3] = _f.get(td[0].textContent);   // марка
                        row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                        row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                        row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                        row[19] = _f.getNumber(td[5].textContent);   // Пробег

                        row.unshift(MD5(["all.auto.ru","6409",row[3],row[5],row[19]].join(','))
                            ,_f.getAttr(td[0].querySelector("a"),'href'));
                        return row;
                    }
                }
            }
            //  КАРВИЛЬ/ООО "Карвилле"
            ,"10580" : {
                method : 'array'
                ,cars : {
                    method: "parseTable"
                    ,fnc: function(td){
                        var row = _.extend([],ROW);
                        price = _f.getNumber(td[1].textContent);   // цена
                        row[1] = parseInt(price*1.12*100)/100;

                        row[3] = _f.get(td[0].textContent);   // марка
                        row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                        row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                        row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                        row[19] = _f.getNumber(td[5].textContent);   // Пробег
                        row[28] = 403;

                        row.unshift(MD5(["all.auto.ru","10580",row[3],row[5],row[19]].join(','))
                            ,_f.getAttr(td[0].querySelector("a"),'href'));
                        return row;
                    }
                }
            }
            //  Carville Южный порт
            ,"10614" : {
                method : 'array'
                ,cars : {
                    method: "parseTable"
                    ,fnc: function(td){
                        var row = _.extend([],ROW);
                        price = _f.getNumber(td[1].textContent);   // цена
                        row[1] = parseInt(price*1.12*100)/100;

                        row[3] = _f.get(td[0].textContent);   // марка
                        row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                        row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                        row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                        row[19] = _f.getNumber(td[5].textContent);   // Пробег
                        row[28] = 403;


                        row.unshift(MD5(["all.auto.ru","10614",row[3],row[5],row[19]].join(','))
                            ,_f.getAttr(td[0].querySelector("a"),'href'));
                        return row;
                    }
                }
            }
            // Car-ville
            ,"10740" : {
                method : 'array'
                ,cars : {
                    method: "parseTable"
                    ,fnc: function(td){
                        var row = _.extend([],ROW);
                        price = _f.getNumber(td[1].textContent);   // цена
                        row[1] = parseInt(price*1.12*100)/100;

                        row[3] = _f.get(td[0].textContent);   // марка
                        row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                        row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                        row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                        row[19] = _f.getNumber(td[5].textContent);   // Пробег
                        row[28] = 403

                        row.unshift(MD5(["all.auto.ru","10740",row[3],row[5],row[19]].join(','))
                            ,_f.getAttr(td[0].querySelector("a"),'href'));
                        return row;
                    }
                }
            }
            // Авторубль
            ,"10348" : {
                method : 'array'
                ,cars : {
                    method: "parseTable"
                    ,fnc: function(td){
                        var row = _.extend([],ROW);
                        price = _f.getNumber(td[1].textContent);   // цена
                        row[1] = parseInt(price*1.12*100)/100;

                        row[3] = _f.get(td[0].textContent);   // марка
                        row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                        row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                        row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                        row[19] = _f.getNumber(td[5].textContent);   // Пробег
                        row[28] = 0

                        row.unshift(MD5(["all.auto.ru","10348",row[3],row[5],row[19]].join(','))
                            ,_f.getAttr(td[0].querySelector("a"),'href'));
                        return row;
                    }
                }
            }
            // МОСАВТОТРЕЙД
            ,"1448" : {
                method : 'array'
                ,cars : {
                    method: "parseTable"
                    ,fnc: function(td){
                        var row = _.extend([],ROW);
                        price = _f.getNumber(td[1].textContent);   // цена
                        row[1] = parseInt(price*1.12*100)/100;

                        row[3] = _f.get(td[0].textContent);   // марка
                        row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                        row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                        row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                        row[19] = _f.getNumber(td[5].textContent);   // Пробег

                        row.unshift(MD5(["all.auto.ru","1448",row[3],row[5],row[19]].join(','))
                            ,_f.getAttr(td[0].querySelector("a"),'href'));
                        return row;
                    }
                }
            }
            // АвтоСпецЦентр Каширка 39
            ,"1349" : {
                method : 'array'
                ,cars : {
                    method: "parseTable"
                    ,fnc: function(td){
                        var row = _.extend([],ROW);
                        price = _f.getNumber(td[1].textContent);   // цена
                        row[1] = parseInt(price*1.06*100)/100;

                        row[3] = _f.get(td[0].textContent);   // марка
                        row[5] = _f.getNumber(td[2].textContent);   // год выпуска
                        row[9] = _f.getAttr(td[8].querySelector("div"),'title');   // цвет
                        row[18] = _f.getNumber(td[3].textContent);   // Объем двигателя
                        row[19] = _f.getNumber(td[5].textContent);   // Пробег

                        row.unshift(MD5(["all.auto.ru","1349",row[3],row[5],row[19]].join(','))
                            ,_f.getAttr(td[0].querySelector("a"),'href'));
                        return row;
                    }
                }
            }
        }
    };


    /**
     *
     *  MD5 (Message-Digest Algorithm)
     *  http://www.webtoolkit.info/
     *
     **/

    var MD5 = function (string) {

        function RotateLeft(lValue, iShiftBits) {
            return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
        }

        function AddUnsigned(lX,lY) {
            var lX4,lY4,lX8,lY8,lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
            if (lX4 & lY4) {
                return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            }
            if (lX4 | lY4) {
                if (lResult & 0x40000000) {
                    return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                } else {
                    return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                }
            } else {
                return (lResult ^ lX8 ^ lY8);
            }
        }

        function F(x,y,z) { return (x & y) | ((~x) & z); }
        function G(x,y,z) { return (x & z) | (y & (~z)); }
        function H(x,y,z) { return (x ^ y ^ z); }
        function I(x,y,z) { return (y ^ (x | (~z))); }

        function FF(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        function GG(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        function HH(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        function II(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        function ConvertToWordArray(string) {
            var lWordCount;
            var lMessageLength = string.length;
            var lNumberOfWords_temp1=lMessageLength + 8;
            var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
            var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
            var lWordArray=Array(lNumberOfWords-1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while ( lByteCount < lMessageLength ) {
                lWordCount = (lByteCount-(lByteCount % 4))/4;
                lBytePosition = (lByteCount % 4)*8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
                lByteCount++;
            }
            lWordCount = (lByteCount-(lByteCount % 4))/4;
            lBytePosition = (lByteCount % 4)*8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
            lWordArray[lNumberOfWords-2] = lMessageLength<<3;
            lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
            return lWordArray;
        };

        function WordToHex(lValue) {
            var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
            for (lCount = 0;lCount<=3;lCount++) {
                lByte = (lValue>>>(lCount*8)) & 255;
                WordToHexValue_temp = "0" + lByte.toString(16);
                WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
            }
            return WordToHexValue;
        };

        function Utf8Encode(string) {
            string = string.replace(/\r\n/g,"\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }

            return utftext;
        };

        var x=Array();
        var k,AA,BB,CC,DD,a,b,c,d;
        var S11=7, S12=12, S13=17, S14=22;
        var S21=5, S22=9 , S23=14, S24=20;
        var S31=4, S32=11, S33=16, S34=23;
        var S41=6, S42=10, S43=15, S44=21;

        string = Utf8Encode(string);

        x = ConvertToWordArray(string);

        a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

        for (k=0;k<x.length;k+=16) {
            AA=a; BB=b; CC=c; DD=d;
            a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
            d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
            c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
            b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
            a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
            d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
            c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
            b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
            a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
            d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
            c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
            b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
            a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
            d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
            c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
            b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
            a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
            d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
            c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
            b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
            a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
            d=GG(d,a,b,c,x[k+10],S22,0x2441453);
            c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
            b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
            a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
            d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
            c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
            b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
            a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
            d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
            c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
            b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
            a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
            d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
            c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
            b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
            a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
            d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
            c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
            b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
            a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
            d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
            c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
            b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
            a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
            d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
            c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
            b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
            a=II(a,b,c,d,x[k+0], S41,0xF4292244);
            d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
            c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
            b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
            a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
            d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
            c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
            b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
            a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
            d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
            c=II(c,d,a,b,x[k+6], S43,0xA3014314);
            b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
            a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
            d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
            c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
            b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
            a=AddUnsigned(a,AA);
            b=AddUnsigned(b,BB);
            c=AddUnsigned(c,CC);
            d=AddUnsigned(d,DD);
        }

        var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

        return temp.toLowerCase();
    }


    function parseURL(url) {
        var a =  document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':',''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function(){
                var ret = {},
                    seg = a.search.replace(/^\?/,'').split('&'),
                    len = seg.length, i = 0, s;
                for (;i<len;i++) {
                    if (!seg[i]) { continue; }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
            hash: a.hash.replace('#',''),
            path: a.pathname.replace(/^([^\/])/,'/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
            segments: a.pathname.replace(/^\//,'').split('/')
        };
    }

    function saveCSV(result){
         trace(result[0]);

         var header = [
             'hash'
             ,'href'
             ,'add_time'
             ,'price'
             ,'reg_mark'
             ,'brand'
             ,'model'
             ,'car_year'
             ,'car_type'
             ,'car_condition'
             ,'car_production'
             ,'color'
             ,'engine'
             ,'car_body'
             ,'chassis'
             ,'vin'
             ,'pts_series'
             ,'pts_number'
             ,'issue_date'
             ,'issue_place'
             ,'v_engine'
             ,'kilometrage'
             ,'regdoc_series'
             ,'regdoc_number'
             ,'regdoc_date'
             ,'regdoc_issue_place'
             ,'gearbox'
             ,'comment'
             ,'out_id'
             ,'out_type'
             ,'owner'
         ];
         result.unshift(header.join(','));

         var csvContent = "";
         result.forEach(function(dataString, index){
            csvContent += index < result.length ? dataString+ "\n" : dataString;
         });
        console.save(csvContent, new Date().getTime()+'.csv');
    }


    var format = _f = {
        getNumber : function(str){
            return str.replace(/\D+/gi,"")*1;
        }
        ,get : function(str){
            return str.replace(/\n/gi,"").replace(/,/gi," ");
        }
        ,getAttr : function(el,attr){
            return el.getAttribute(attr);
        }

        ,parseTable : function(fnc){
            var table = document.querySelector(".list");
            var rows = table.querySelectorAll("tr:not(.header)");

            var btn = document.createElement("BUTTON");
            var t = document.createTextNode("2 CSV");
            btn.appendChild(t);
            btn.style.cssText = "padding: 10px; font-size:10px; font-weight:bold; margin:10px; min-width: 100px; border: 2px solid red; background: yellow ";
            btn.addEventListener( 'click', function(){
                var output = [];
                _.each(rows,function(n,i){
                    var td = n.querySelectorAll("td");
                    output[i] = fnc(td).join(",");
                });
                saveCSV(output);
                return false
            });


            table.parentNode.insertBefore(btn,table);
            return [];
        }
        ,parseAvito : function(fnc){
            var table = document.querySelector(".b-catalog-table .g_eof");
            var rows = table.querySelectorAll(".item");

            var btn = document.createElement("BUTTON");
            var t = document.createTextNode("2 CSV");
            btn.appendChild(t);
            btn.style.cssText = "padding: 10px; font-size:10px; font-weight:bold; margin:10px; min-width: 100px; border: 2px solid red; background: yellow";
            btn.addEventListener( 'click', function(){
                var output = [];
                _.each(rows,function(n,i){
                    output[i] = fnc(n).join(",");
                });
                saveCSV(output);
                return false
            });


            table.parentNode.insertBefore(btn,table);
            return [];
        }
        ,parseAutoexpres : function(fnc){
            var table = document.querySelector("#ch_list");
            var rows = table.querySelectorAll("tr.tr1");

            var btn = document.createElement("BUTTON");
            var t = document.createTextNode("2 CSV");
            btn.appendChild(t);
            btn.style.cssText = "padding: 10px; font-size:10px; font-weight:bold; margin:10px; min-width: 100px; border: 2px solid red; background: yellow";
            btn.addEventListener( 'click', function(){
                var output = [];
                _.each(rows,function(n,i){
                    var td = n.querySelectorAll("td");
                    output[i] = fnc(td).join(",");
                });
                saveCSV(output);
                return false
            });


            table.parentNode.insertBefore(btn,table);
            return [];
        }
    }



    function init(){
        var url = parseURL(document.location);
        trace('host: ' + url.host);
        trace(document.title)


        switch (url.host){
            case "www.avito.ru":
                var partner = url.segments[0];
                var res = config["www.avito.ru"][partner];
                var result = _f[res.method].apply(this,[res.fnc]);
                break;



            case "www.autoexpres.ru":
                var partner = url.segments[0];
                var res = config["www.autoexpres.ru"];
                var result = _f[res.method].apply(this,[res.fnc]);
                break;



            case "cars.auto.ru":

                var filter = [
                    'Легковые автомобили'
                    ,'Легкие коммерческие'
                    ,'Бронеавтомобили'
                    ,'Грузовики'
                    ,'Автобусы'
                ]
                if(!_.contains(filter,document.title)) return;

                var url = parseURL(document.location);
                var clientId = url.segments[2];

                var res = _.find(config["cars.auto.ru"], function(n,i){
                    return i == clientId;
                });
                if(res){
                    if(res.method == 'array'){
                        var cat = url.segments[3];
                        if(res[cat].method == 'array'){
                            var type = url.segments[4];
                            var result = _f[res[cat][type].method].apply(this,[res[cat][type].fnc]);
                        }else{
                            var result = _f[res[cat].method].apply(this,[res[cat].fnc]);
                        }
                    }else{
                        var result = _f[res.method].apply(this,[res.fnc]);
                    }
                };
                break;



            case "all.auto.ru":
                var filter = [
                    'Легковые автомобили'
                ]
                if(!_.contains(filter,document.title)) return;

                var url = parseURL(document.location);
                var clientId = url.segments[2];

                var res = _.find(config["all.auto.ru"], function(n,i){
                    return i == clientId;
                });

                if(res){
                    if(res.method == 'array'){
                        var cat = url.segments[3];
                        var result = _f[res[cat].method].apply(this,[res[cat].fnc]);
                    }else{
                        var result = _f[res.method].apply(this,[res.fnc]);
                    }
                };
                break;



            case "trucks.auto.ru":
                var filter = [
                    'Легковые автомобили'
                    ,'Легкие коммерческие'
                    ,'Экскаваторы'
                    ,'Седельные тягачи'
                    ,'Грузовики'
                    ,'Сельскохозяйственная'
                ]
                if(!_.contains(filter,document.title)) return;

                var url = parseURL(document.location);
                var clientId = url.segments[2];

                var res = _.find(config["trucks.auto.ru"], function(n,i){
                    return i == clientId;
                });

                if(res){
                    if(res.method == 'array'){
                        var cat = url.segments[3];
                        if(res[cat].method == 'array'){
                            var type = url.segments[4];
                            var result = _f[res[cat][type].method].apply(this,[res[cat][type].fnc]);
                        }else{
                            var result = _f[res[cat].method].apply(this,[res[cat].fnc]);
                        }

                    }else{
                        var result = _f[res.method].apply(this,[res.fnc]);
                    }
                };
                break;
        }
    }

    init();

})()
