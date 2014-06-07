// ==UserScript==
// @name            الى العربيه (Travian translated) مترجم ترافيان
// @AHMEDOSAMA1.5@HOTMAIL.COM      translated
// @description    من اللغة الروسية - العربية
// @version 3.5.1
// @include        http://*.travian.ru/*
// ==/UserScript==

//Styles
var cssStyle = "";
cssStyle += "body{font-family:tahoma;}";
cssStyle += "h1{font-family:arial;font-size:190%;}";
cssStyle += ".p1 label{float:right;}";
cssStyle += "#ltbw0{right:284px;}";
GM_addStyle(cssStyle);

var loc=window.location.href; // the current page href
var keys, str;
var lang_from = new Array();
var lang_hu = new Array();
var lang = loc.match(/travian(\.[a-zA-Z]{2,3})+/ );

//alert('fos');

if(!lang) {
  lang = loc.match(/travian3(\.[a-zA-Z]{2,3})+/ ).pop();
} else {
  lang=loc.match(/travian(\.[a-zA-Z]{2,3})+/ ).pop();
}

switch(lang){
case '.ru':
//*/
lang_from[0]   = 'Карта деревни';
lang_from[1]   = 'Статистика';
lang_from[2]   = 'Древесина';
lang_from[3]   = 'Глина';
lang_from[4]   = 'Железо';
lang_from[5]   = 'Зерно';
lang_from[6]   = 'в час';
lang_from[8]   = 'Обзор';
lang_from[9]   = 'Эта встроенная в игру справка позволит получить требуемую информацию в любой момент.';
lang_from[10]   = 'Воины';
lang_from[11]   = 'Постройки';
lang_from[12]   = 'Армия';
lang_from[13]   = 'Инфраструктура';
lang_from[14]   = 'Инструкция';
lang_from[15]   = 'Встроенная в игру справка располагает небольшим количеством информации.';
lang_from[16]   = 'Более подробную информацию по игре можно найти в инструкции.';
lang_from[17]   = 'Войска';
lang_from[18]   = 'Легионер';
lang_from[19]   = 'Преторианец';
lang_from[20]   = 'Империанец';
lang_from[21]   = 'Конный разведчик';
lang_from[22]   = 'Конница императора';
lang_from[23]   = 'Конница Цезаря';
lang_from[24]   = 'Таран';
lang_from[25]   = 'Огненная катапульта';
lang_from[26]   = 'Сенатор';
lang_from[27]   = 'Поселенец';
lang_from[28]   = 'Дубинщик';
lang_from[29]   = 'Копьеносец';
lang_from[30]   = 'Топорщик';
lang_from[31]   = 'Паладин';
lang_from[32]   = 'Тевтонская конница';
lang_from[33]   = 'Стенобитное орудие';
lang_from[34]   = 'Катапульта';
lang_from[35]   = 'Скаут';
lang_from[36]   = 'ов';
lang_from[37]   = 'Римляне';
lang_from[38]   = 'Германцы';
lang_from[39]   = 'Галлы';
lang_from[40]   = 'Сырье';
lang_from[41]   = 'Травиан FAQ';
lang_from[42]   = 'Очень обширная документация по игре';
lang_from[43]   = 'Профиль';
lang_from[44]   = 'игрока';
lang_from[45]   = 'Настройки';
lang_from[46]   = 'Учетная запись';
lang_from[47]   = 'Производство';
lang_from[48]   = 'Казарма';
lang_from[49]   = 'Урень';
lang_from[50]   = 'Народ';
lang_from[51]   = 'Альянс';
lang_from[52]   = 'Игрок';
lang_from[53]   = 'Население';
lang_from[54]   = 'Нет информации';
lang_from[55]   = 'Центрирать карту';
lang_from[56]   = 'Отправить торгцев';
lang_from[57]   = 'Столица';
lang_from[58]   = 'Скорость';
lang_from[59]   = 'Грузоподъемность';
lang_from[60]   = 'Содержание';
lang_from[61]   = 'Время обучения';
lang_from[62]   = 'полей/час';
lang_from[63]   = 'Требания';
lang_from[64]   = 'Вождь';
lang_from[65]   = 'Граф. пакеты';
lang_from[66]   = 'Данные';
lang_from[67]   = 'Описание';
lang_from[68]   = 'Ранг';
lang_from[69]   = 'Изменить данные';
lang_from[70]   = 'Имя';
lang_from[71]   = 'Координаты';
lang_from[72]   = 'Деревни';
lang_from[73]   = 'Главное здание';
lang_from[74]   = 'Природа';
lang_from[75]   = 'Обычный';
lang_from[76]   = 'Набег';
lang_from[77]   = 'Нападение';
lang_from[78]   = 'Оборона';
lang_from[79]   = 'Тип атаки';
lang_from[80]   = 'Симулятор сражения';
lang_from[81]   = 'Альянсы';
lang_from[82]   = 'Игроки';
lang_from[83]   = 'Время создания страницы';
lang_from[84]   = 'Время сервера';
lang_from[85]   = 'нет';
lang_from[86]   = 'Главная';
lang_from[87]   = 'Нападений';
lang_from[88]   = 'ч';
lang_from[89]   = 'Подкреп';
lang_from[90]   = 'Плюс';
lang_from[91]   = 'Травиан';


break;
}
lang_hu[0]   = 'خريطة القرية';
lang_hu[1]   = 'احصائيات';
lang_hu[2]   = 'خشب';
lang_hu[3]   = 'طين';
lang_hu[4]   = 'حديد';
lang_hu[5]   = 'قمح';
lang_hu[6]   = 'في الساعة';
lang_hu[7]   = 'لا يوجد';
lang_hu[8]   = 'نظرة عامة ';
lang_hu[9]   = 'الدليل السريع يساعدك في إيجاد معلومات مهمة في أي وقت. ';
lang_hu[10]  = 'الوحدات';
lang_hu[11]  = 'المباني ';
lang_hu[12]  = 'الجيش';
lang_hu[13]  = 'البنية التحتية';
lang_hu[14]  = 'التعليمات والأسئلة الشائعة ';
lang_hu[15]  = 'الدليل السريع لا يشمل سوى معلومات مختصرة';
lang_hu[16]  = 'ستجد معلومات أكثر عن اللعبة في صفحة الأسئلة الشائعة';
lang_hu[17]  = 'القوات';
lang_hu[18]  = 'جندي أول';
lang_hu[19]  = 'حراس الأمبراطور';
lang_hu[20]  = 'جندي مهاجم';
lang_hu[21]  = 'فرقة تجسس';
lang_hu[22]  = 'سلاح الفرسان';
lang_hu[23]  = 'فرسان قيصر';
lang_hu[24]  = 'كبش';
lang_hu[25]  = 'المقلاع الناري';
lang_hu[26]  = 'حكيم';
lang_hu[27]  = 'مستوطن';
lang_hu[28]  = 'مقاتل بهراوة';
lang_hu[29]  = 'مقاتل برمح';
lang_hu[30]  = 'مقاتل بفأس';
lang_hu[31]  = 'مقاتل القيصر';
lang_hu[32]  = 'فرسان الجرمان';
lang_hu[33]  = 'محطمة الابواب';
lang_hu[34]  = 'المقلاع';
lang_hu[35]  = 'الكشاف';
lang_hu[36]   = '';
lang_hu[37]   = 'الرومان';
lang_hu[38]   = 'الجرمان';
lang_hu[39]   = 'الإغريق';
lang_hu[40]   = 'الموارد';
lang_hu[41]   = 'تعليمات ترافيان';
lang_hu[42]   = 'وثائق مفصلة للغاية للعبة ترافيان';
lang_hu[43]   = 'بطاقة العضوية';
lang_hu[44]   = '';
lang_hu[45]   = 'إعداد';
lang_hu[46]   = 'التحكم في العضوية';
lang_hu[47]   = 'الإنتاج';
lang_hu[48]   = 'الثكنة';
lang_hu[49]   = 'مستوى';
lang_hu[50]   = 'القبيلة';
lang_hu[51]   = 'التحالف';
lang_hu[52]   = 'اللاعب';
lang_hu[53]   = 'السكان';
lang_hu[54]   = 'لا يوجد معلومات';
lang_hu[55]   = 'مركز الخريطة';
lang_hu[56]   = 'إرسال تجار';
lang_hu[57]   = 'عاصمة';
lang_hu[58]   = 'السرعة';
lang_hu[59]   = 'الحمولة';
lang_hu[60]   = 'الصيانة';
lang_hu[61]   = 'مدة التدريب';
lang_hu[62]   = 'الميادين \ ساعة';
lang_hu[63]   = 'الشروط';
lang_hu[64]   = 'الزعيم';
lang_hu[65]   = 'مجموعة الغرافيك';
lang_hu[66]   = 'التفاصيل';
lang_hu[67]   = 'الوصف';
lang_hu[68]   = 'الرتبة';
lang_hu[69]   = 'تعديل معلوماتك الشخصية';
lang_hu[70]   = 'الإسم';
lang_hu[71]   = 'إحداثيات';
lang_hu[72]   = 'القرى';
lang_hu[73]   = 'المبنى الرئيسي';
lang_hu[74]   = 'وحوش';
lang_hu[75]   = 'هجوم كامل';
lang_hu[76]   = 'هجوم للنهب';
lang_hu[77]   = 'مهاجم';
lang_hu[78]   = 'مدافع';
lang_hu[79]   = 'نوع المعركة';
lang_hu[80]   = 'محاكي المعركة';
lang_hu[81]   = 'التحالفات';
lang_hu[82]   = 'اللاعبون';
lang_hu[83]   = 'الحساب يتم في';
lang_hu[84]   = 'وقت الخادم';
lang_hu[85]   = 'لا شيء';
lang_hu[86]   = 'الرئيسية';
lang_hu[87]   = 'الهجمات';
lang_hu[88]   = 'ساعة';
lang_hu[89]   = 'تعزيز';
lang_hu[90]   = 'بلاس';
lang_hu[91]   = 'ترافيان';

//lang_


var textnodes = document.evaluate(
    "//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

var titlenodes = document.evaluate(
    "//area[@href]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);


for (var i = 0; i < textnodes.snapshotLength; i++) {
    node = textnodes.snapshotItem(i);
    str = node.data;
    for (keys in lang_from) {
			  if (str == lang_from[keys]){
          str = str.replace(lang_from[keys],lang_hu[keys]);
        }
    }
    node.data = str;
}

for (var i = 0; i < textnodes.snapshotLength; i++) {
    node = textnodes.snapshotItem(i);
    str = node.data;
    for (keys in lang_from) {
          str = str.replace(lang_from[keys],lang_hu[keys]);
    }
    node.data = str;
}


for (var i = 0; i < titlenodes.snapshotLength; i++) {
    node = titlenodes.snapshotItem(i);
    str = node.getAttribute("title");
    //alert(str);
    for (keys in lang_from) {
        if (str == lang_from[keys]){
          str = str.replace(lang_from[keys],lang_hu[keys]);
        }
    }
    node.setAttribute("title",str);
}

for (var i = 0; i < titlenodes.snapshotLength; i++) {
    node = titlenodes.snapshotItem(i);
    str = node.getAttribute("title");
    //alert(str);
    for (keys in lang_from) {
          str = str.replace(lang_from[keys],lang_hu[keys]);
    }
    node.setAttribute("title",str);
}
