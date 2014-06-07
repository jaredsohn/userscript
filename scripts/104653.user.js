// ==UserScript==
// @name SkriptPackBOTVAKF
// @namespace botva.ru/frOPERA/sbor/39
// @description game script
// @author Razorback (oleg) 
// @include *botva*
// @exclude file://*
// ==/UserScript==
/*
This code is licenced under the GPL
as is

меня зовут : Олег Владимирович  день варенья 15 декабря  19** года ))
ник в игре: Razorback  http://g1.botva.ru/player.php?id=419006
мой сайт :http://simart.info/viewtopic.php?f=13&t=23&p=1130#p1130
*/

//скриптпак для ботвы  от Razorback  
//использованы части скриптов от ВДЕ и других умельцев 
// скрипт тестировался на опере Версия:10.10   Opera/9.80 (Windows NT 5.1; U; ru) Presto/2.2.15 Version/10.10
// за другие браузеры я  ХЗ
try {
    var this2, param, item;
    var itms = new Array();
    var opera = (navigator.userAgent.toLowerCase().indexOf("opera") != -1);

    var aWindow = (typeof unsafeWindow != 'undefined') ? unsafeWindow : window;
    var greenDomains = new Array("g1.botva.ru", "g2.botva.ru", "g1.botva.mail.ru", "g2.botva.mail.ru", "g3.botva.ru", "g3.botva.mail.ru");
    var i, a = 0;
    c_domain = document.URL.substring(document.URL.indexOf("http:\/\/", 0) + 7, document.URL.indexOf("\/", 8));
    for (i = 0; i < greenDomains.length; i++)
    if (c_domain == greenDomains[i]) a++;
    if (a > 0) {

 //букмарклет для оперы выкл/вкл скрипт
 //<a href="javascript: if (localStorage.getItem('stopKF')) {	 if (localStorage.getItem('stopKF')==1) {	 localStorage.setItem('stopKF', 0);	 window.location.reload(); }else{	 localStorage.setItem('stopKF', 1);		 window.location.reload();	}  }else{  localStorage.setItem('stopKF', 0);}">переключить скрипт ботвы</a>
 
 
 
 
 
 if (localStorage.getItem('stopKF')) {
 
 
 if (localStorage.getItem('stopKF')==1) {
 
  }else{
 
 
        /////////////////////////////// БЛОК НАСТРОЕК  ///////////////////////////////////////////
        ////// пишем  1 чтобы включить функцию и 0 чтобы выключить
        var mtk = "#|-"
        options = new Array();
        //options[0]	= ["имя","зн по умолчанию", "тип","описание","отступ"];
        options[0] = ["USE_panelKK", 0, "checkbox", "использовать мохраненную панель кнопок", ""];
        options[1] = ["USE_panelSS", 0, "checkbox", "использовать мохраненную панель Сылок", ""];
        options[2] = ["USE_panel", 1, "checkbox", "панель ссылок", ""];
        options[3] = ["USE_text", 0, "checkbox", "панель1/панель2", mtk];
        options[4] = ["USE_left", 1, "checkbox", "панель слева/справа", mtk];
        options[5] = ["USE_posit", 0, "checkbox", "зафиксировать панель ссылок", mtk];
        options[6] = ["USE_NOTIFY", 1, "checkbox", "Звуковое уведомление таймеров", 0];
        options[7] = ["USE_alert", 1, "checkbox", "уведоблени о истечении таймеров всплівающим окном", mtk];
        options[8] = ["use_signalka", 0, "checkbox", "уведомлять о всех таймерах", ""];
        options[9] = ["USE_switchBid", 0, "checkbox", "вместо аукциона активировать продажу/ф-я от AllesNix", "!!##устарела неработает##"];
        options[10] = ["USE_switchBidKri", 0, "checkbox", "переключать на кри - Выставить на аукцион ", "!!##устарела неработает##"];
        options[11] = ["zv_hide", 0, "checkbox", "прятать зверя по клику на морде<", ""];
        options[12] = ["USE_Apanel", 1, "checkbox", "продвинутая панель кнопок", ""];
        options[13] = ["RP1", 1, "checkbox", "кнопки кузь/шахтеров", mtk];
        options[14] = ["USE_VISUAL_TRADE", 0, "checkbox", "инфо-аддон Сбытня", "++"];
        options[15] = ["id_vision", 0, "checkbox", "отобразить айди", mtk];
        options[16] = ["USE_zagovor", 1, "checkbox", "инфо-аддон ЗАГОВОРЫ +Заказник(ток для кузь)", ""];
        options[17] = ["", 0, "", "", ""];
        options[18] = ["USE_fon", 0, "checkbox", "Установить цвет фона", ""];
        options[19] = ["USE_fonImage", 0, "checkbox", "картинку для фона", ""];
        options[20] = ["USE_fish", 1, "checkbox", "кнопка причала под рібешкой", ""];
        options[21] = ["USE_zel", 0, "checkbox", "установить свою сумму зелени", "***прикол"];
        options[22] = ["USE_serv", 1, "checkbox", "расчет загрузки серва", ""];
        options[23] = ["USE_spisok", 0, "checkbox", "юзать бістріе списки", "!!##устарела неработает##"];
        options[24] = ["USE_CURRENCY_AUTO_SWITCHER", 0, "checkbox", "автоматический переключатель валют", ""];
        options[25] = ["CAS_CURRENCY_TYPE", 0, "checkbox", "ПВ кристаллы,/зелень.", mtk];
        options[26] = ["USE_INDEX_ADDON", 1, "checkbox", "СТАТИСТИКА+ КАЧ", ""];
        options[27] = ["USE_per_LVL", 0, "checkbox", "ПЕРЕКАЧ (если галка снята, то все персі считаются вашего лвла)", mtk];
        options[28] = ["USE_stat_sum", 1, "checkbox", "СТАТ суматор", ""];
        options[29] = ["USE_perec_perc", 1, "checkbox", "Преимущество %", ""];
        options[30] = ["set_chan", 0, "checkbox", " в логах шанс по старому", ""];
        options[31] = ["set_hpKV", 0, "checkbox", " инд. здоровья бегает за мышкой", "!!##устарела неработает##"];
        options[32] = ["set_sumka", 0, "checkbox", " аддон быстрые(масовые) продажи в сбытне", "!!##устарела неработает##"];
        options[33] = ["infoClear", 1, "checkbox", " аддон убирает ненужную инфу со страниц", ""];
        options[34] = ["infoDown", 0, "checkbox", " аддон убирает ненужную инфу со страниц и перенести вниз", mtk];
        options[35] = ["displayICO", 0, "checkbox", " отключить ф-ю скрытия кнопок none -скрывать", ""];
        options[36] = ["USE_logaddon", 1, "checkbox", " аддон логи боев<", ""];
        options[37] = ["USE_pochta", 1, "checkbox", " отображать награб в почте", mtk];

        options[38] = ["panel1T", "15px", "text", " тступить панель вниз   пикселей", ""];
        options[39] = ["panel1L", "8px", "text", "отступить панель  вправо/лево      пикселей;", ""];

        options[40] = ["min_zakaz3", '90000', "text", "подсвечивать если заказ на ковку с камнем больше", ""];
        options[41] = ["min_zakaz1", "250000", "text", " подсвечивать если заказ  на заговор больше  ", ""];
        options[42] = ["min_zakaz2", '40000', "text", " подсвечивать если заказ на ковку больше", ""];

        options[43] = ["you_totem", 1, "checkbox", "я юзаю тотемы", ""];

        options[44] = ["you_nick", 'Razorback', "text", " введите свой ник для правильной работі бістріх списков", "!!##устарела неработает##"];
        options[45] = ["kollogov", '100', "text", " кол логов которые помнить и отображать инфу в почте", " "];
        options[46] = ["set_fonImage", 'http://g1.botva.ru/images/items/Ticket_2s.jpg', "text", "фоновій рисунок", " "];
        options[47] = ["NTF_PATHTOSOUND", 'http://yakim.at.ua/alt.swf', "text", " <a title='поддерж  .формат .au .wav .aif .aiff .mid .midi .ra .ram .mpg .mpeg .mp2 .mp3 .swf' >звук работа</a> ", ""];
        options[48] = ["NTF_PATHTOSOUND2", 'http://brand.at.ua/botva/_hwm_sound_dzz.swf', "text", " <a title='поддерж  .формат .au .wav .aif .aiff .mid .midi .ra .ram .mpg .mpeg .mp2 .mp3 .swf' >звук имун </a>", ""];
        options[49] = ["NTF_PATHTOSOUND3", 'http://yakim.at.ua/alt.swf', "text", " <a title='поддерж  .формат .au .wav .aif .aiff .mid .midi .ra .ram .mpg .mpeg .mp2 .mp3 .swf' >звук атака </a>", ""];
        options[50] = ["fon_color", "SteelBlue", "text", " //цвет фона / названия цветов можно узнать здесь http://35rus.ru/htmlcolor.php", ""];
        options[51] = ["al1", "ану за работу", "text", " // текст уведомления работа", ""];
        options[52] = ["al2", "щас по самі помідори буде", "text", "  текст уведомления имуна", ""];
        options[53] = ["al3", "Че сидиш?, атакуй", "text", " текст уведомления атаки", ""];
        options[54] = ["summa_zel", "1.000.000.000", "text", " /сумма зелени", ""];
        options[55] = ["set_serv", 6000, "text", " /критическая маса людей для серва", ""];

        options[56] = ["", 0, "", " ", ""];

        options[57] = ["panel2T", '30px', "text", "отступить панель Кнопок вниз    пикселей", ""];
        options[58] = ["panel2L", '270px', "text", " отступить панель  кноп вправо/лево      пикселей;", ""];
        options[59] = ["NTF_PATHTOSOUND4", 'http://st.wapix.ru/new/59/64188.mp3', "text", "<a title='поддерж  .формат .au .wav .aif .aiff .mid .midi .ra .ram .mpg .mpeg .mp2 .mp3 .swf' >звук всех таймеров </a>", ""];
        options[60] = ["set_kravchuchka", 0, "checkbox", "кравчучка", ""];
        options[61] = ["set_klan", 1, "checkbox", "инфо в мастерской клана ", ""];
        options[62] = ["set_lavka", 1, "checkbox", "инфо в лавке ", ""];
        options[63] = ["otl", 0, "checkbox", "отладка", ""];
        options[64] = ["podz_polvl", 0, "checkbox", "выводить окно бродить по лвл в подземе !!требуется включить аддон подзем ", "*****бета"];
        options[71] = ["srusk", 0, "checkbox", " спускаться по лебедке иначе веревка ", ""];
        options[65] = ["podz_nap", 0, "checkbox", "выводить окно нападать на страхов!!требуется включить аддон подзем", ""];
        options[66] = ["set_rndmin", 1000, "text", " рандомный таймаут минимум 1000= 1 секунда", ""];
        options[67] = ["set_rndmax", 5000, "text", " рандомный таймаут  средний 1000= 1 секунда", ""];
        options[68] = ["set_rndmax2", 60000, "text", " рандомный  максимум2 1000= 1 секунда", ""];
        options[69] = ["podz_on", 0, "checkbox", "включить аддон подзем", "*"];
        options[70] = ["otpr", 1, "checkbox", "включить аддон отправленные письма", ""];
		options[72] = ["uron72", 1, "checkbox", "отображать урон в почте ", "v37"];
		options[73] = ["key131", 1, "checkbox", "поддерживать актуальность ключа на всех страницах", "v37"];
        options[74] = ["panda", 1, "checkbox", "автоматом открывать замки бесплатными отмычками", "v37"];
		options[75] = ["BBP", 1, "checkbox", "удобно открывать большие поляны", "v38"];
		options[76] = ["doz", 1, "checkbox", "ходить в дозор по 10 минут", "v39"];

		
		
		//РАСШИРЕННЫЕ НАСТРОЙКИ////////////////
        //==================продвинутая панель=============================
        var USE_leftA = 1; // 1 -панель слева 0 - разместить справа
        var USE_positA = 0; // зафиксировать панель 

        //========================инфо аддоны=========================================================
        var USE_TRADEUIHACK = 1; // хз че єто )


        ////////////////////////////////НАСТРОЙКА МЕНЮ///////////
        var out = "",
            out1 = "",
            out2 = "",
            out3 = "",
            out4 = "",
            Sout = "",
            knopka = "",
            knopka2 = "",
            knopka1 = "";


        if (localStorage.getItem(options[0][0])) {
            //ну есть и есть
        } else {
            localStorage.clear()
            alert("подготовка к первому пуску скрипта")
            for (i = 0; i < options.length; i++) {
                localStorage.setItem(options[i][0], options[i][1]);
            }
            alert("все готово")
        }
        load_cookie();
        loadSetupButton(0);


        var set_kParam = kParam(); // не менять
       
		

	   if (options[2][1] == 1) {

            if (options[3][1] == 1) {
                ////Сюда вставлять  свои ссылки
                // чтобы добавить пункт меню вставляем строку вида:
                // out1 += "тут пишем надпись или HTML код";   -  выведет тьекст
                // out1 += "<a href=http://g1.botva.ru/smith.php>КУЗНЯ</a>";  - выведет ссылку
                // out1 += "<a href=http://g1.botva.ru/smith.php>КУЗНЯ</a><BR>";  - выведет ссылку и перенесет с новой строки
                //out1 += "<a href=http://g1.botva.ru/smith.php><img src='http://brand.at.ua/botva/room_a.png' height='40'  title='устрашители' /></a>";  - віведет картинку со ссылкой
                //  out1 += "<font color='red'><b>Ссылки:</b></font><br>";   - пишет цветом  названия цветов можно узнать здесь http://35rus.ru/htmlcolor.php

                // Таблица делается так:
                //out1 += "<table>";     -- обьявляется начало
                //out1 += "<tr><td>Ячейка1 строка1 </td><td>ячейка2 строка1</td></tr>";  //- <tr> - начало строки, <td> -ячейки в строке(столбик) 
                //out1 += "<tr><td>Ячейка1 строка2</td><td>ячейка2 строка2</td></tr>";
                //out1 += "</table>";


                //вместо значения "к" подставлять set_kParam например: у вас ссыль блабла&k=654212 -пишем: блабла&k="+set_kParam

                /////////////////////ТЕКСТОВОЕ МЕНЮ (1)/////////////////////////
                out1 += "<table><tr><td>";
                out1 += "<b><a  title='радио'  href='http://botva-r.chatovod.ru/app94'>радио</a>/<a title='чат без модеров'  href='http://botva-r.chatovod.ru/widget/'>вольный чат</a></b><BR>";
                out1 += "<font color='red'><b>Ссылки:</b></font><br>";
                out1 += "Статы <a href=/training.php>голд</a>/<a class='icon fishes' title='тренировка за рыбки'  href=/training.php?a=harbour></a>*<a href=/house.php?info=cage><b>клетка</b></a><BR>";
                out1 += "<b class='icon ico_mail' ></b> <a  title='почта читать'  href=/post.php>читать</a>/<a href=/post.php?m=new>писать</a><BR>";
                out1 += "кузям <a href=/castle.php?a=hall&id=2>ОЗ</a>/<a href='/castle.php?a=election&id=2'  title='Голосуй за меня!!!----- Razorback ----'>выборы</a><BR>";
                out1 += "<a class='cmd_all cmd_mini_sl cmd_amini_sl' href=/clan.php><b class='icon ico_clanleave'></b> КЛАН</b></a><BR> <a href=/clan_embassy.php?m=wars>КВар</a>/<a href=/clan_mod.php?m=treasury>казна</a>/<a href=/clan_mod.php?m=hall>трубить сбор</a><BR>";
                out1 += "----------------<BR>";
                out1 += "</td></tr><tr><td>";
                out1 += "Лавка <a href=/shop.php?group=1>купить</a>/<a href=/shop.php?a=sell&group=2>продать</a><BR>";
                out1 += "<a href=/trade.php?m=now><b>Сбытня:</b></a>/<a href=/trade.php?m=old>завершенка</a><BR>";
                out1 += "<a href=/trade.php?m=add>Сумка</a>/<a href=/trade.php?m=my>лоты</a><BR>";

                out1 += "/<a href=/trade.php?m=now&filter=шот&order=buy&dir=asc>шот</a>/<a href=/trade.php?m=now&filter=кристах&order=buy&dir=asc>ХАП</a><BR>";
                out1 += "----------------<BR>";
                out1 += "</td></tr><tr><td>";
                out1 += "<a  class='cmd_all cmd_mini_sl cmd_amini_sl' href=/smith.php><b>Кузня:</b></a><BR>";
                out1 += "<a class='cmd_all cmd_mini_sl cmd_amini_sl' href=/smith.php?a=guild>Кузям</a>"
                out1 += "<a  class='cmd_all cmd_mini_sl cmd_amini_sl' href=/smith.php?a=master>Кузнечу</a><BR>";
                out1 += "<a class='cmd_all cmd_mini_sl cmd_amini_sl' href=/smith.php?a=own><b>Своя кузня:</b></a>"
                out1 += "<a class='cmd_all cmd_mini_sl cmd_amini_sl' href=/smith.php?a=train>Учеба</a><BR>";
                out1 += "<a class='cmd_all cmd_mini_sl cmd_amini_sl' href=/smith.php?a=orders>Заказы</a>"
                out1 += "<a class='cmd_all cmd_mini_sl cmd_amini_sl' href=/castle.php?a=price&id=2>Цены</a><BR>";
                out1 += "<a class='cmd_all cmd_mini_sl cmd_amini_sl' href=/smith.php?a=ownwork&type=1>иглы</a>"
                out1 += "<a class='cmd_all cmd_mini_sl cmd_amini_sl' href=/smith.php?a=ownwork&type=2 title='добывать черное золото'><b class='iconsp item_smith_2'></b></a><BR>";
                out1 += " <a class='cmd_all cmd_mini_sl cmd_amini_sl' href=/smith.php?a=owngame&start=1>чистка</a>"
                out1 += "<a class='cmd_all cmd_mini_sl cmd_amini_sl' href=/smith.php?a=owngame&start=2>плавка</a><BR>";
                out1 += " <a class='cmd_all cmd_mini_sl cmd_amini_sl' href=/smith.php?a=ownup>ковка</a><BR>"
                out1 += "<a class='cmd_all cmd_mini_sl cmd_amini_sl' href=/smith.php?a=ownshaman>шаманств</a>"
                out1 += "<a class='cmd_all cmd_mini_sl cmd_amini_sl' href=/smith.php?a=ownuniq&k=48903>Щеп</a><BR>";
                out1 += "----------------<BR>";
                out1 += "</td></tr><tr><td>";
                out1 += "<a href=/tavern.php>таверна</a>/<a href=/farm.php>ферма</a><BR>";
                out1 += "<a href=/house.php>хата</a>/<a href=/temple.php>святилище</a>/<a href=/well.php>ведьма</a><BR>";
                out1 += "<a href=/mine.php><b>ШАХТА</b></a><BR>";
                out1 += "<a href=/castle.php?a=room&id=11%22>комната устрашителя</a><BR>";
                out1 += "<a href=/dozor.php><b>БОДАЛКА</b></a>/<a href=/shtab.php>штаб</a>/<a href=/shtab.php?m=notes>списки</a><BR>";
                out1 += "<a href=/page.php?page=pandora>эфекты пандоры</a><BR>";
                out1 += "<a href=http://forum.theabyss.ru/index.php?showtopic=215431>ответы на вопросы</a><BR>";
                out1 += "<a href=http://forum.theabyss.ru/index.php?showtopic=254489&hl=%EA%EE%EB%E8%F7%E5%F1%F2%E2%EE+%F1%F2%F0%E0%F8%E8%EB%EE%EA>все о устрашителях</a><BR>";
                out1 += "<a href=http://simart.reformal.ru/>есть идеи?</a><BR>";
                out1 += "</td></tr></table>";
            } else {
                /////////////////////////// Меню 2//////////////////////////////
                ////////////////////// графические кнопки///////////////////////
                ////Сюда вставлять  свои ссылки АНАЛОГИЧНО КАК в меню 1
                // но вместо out1  тут пишем  out2 
                
                out2 += "<b>Ссылки:</b><br>";
                out2 += "<b><a  title='радио'  href='http://botva-r.chatovod.ru/app94'>радио</a>/<a title='чат без модеров'  href='http://botva-r.chatovod.ru/'>вольный чат</a></b><BR>";
                out2 += "<a href=\castle.php?a=room&id=11\x22><img src='http://brand.at.ua/botva/room_a.png' width='30' height='30'  title='устрашители' /></a>";
                out2 += "<a href=\x22house.php?info=cage\x22><img src='http://brand.at.ua/botva/b_cage_a.png' width='30' height='30'  title='клетка' /></a>";
                out2 += "<a href=\x22training.php\x22><b class='icon ico_dexterity' title='тренировка'  ></b></a>";
                out2 += "<a href=\x22clan_mod.php?m=hall\x22><img src='http://brand.at.ua/botva/b5_8_9_a.png'   width='30' height='30'  title='обьява клану' /></a>";
                out2 += "<a href=\x22clan_mod.php?m=treasury\x22><img src='http://brand.at.ua/botva/ico_gold1.png'  width='30' height='30' title='казна'  /></a><br>";
                out2 += "<a href=\x22clan_embassy.php?m=wars\x22>текущие войны</a>";
                out2 += "<a href=\x22shop.php\x22><img src='http://brand.at.ua/botva/b5_8_1_a.png'   title='лавка'  width='30' height='30'/></a>";
                out2 += "<a href=\x22trade.php?m=now\x22><img src='http://brand.at.ua/botva/b6_11_a.png'  width='30' height='30' title='сбытка' /></a><br>";
                out2 += "<a href=\x22trade.php?m=add\x22><img src='http://brand.at.ua/botva/Bag_3s.jpg'   title='сумка'  width='30' height='30'/></a>";
                out2 += "<a href=\x22trade.php?m=my\x22>Лоты</a>";
                out2 += "<a href=\smith.php?a=ownbag><img src='http://clip2net.com/clip/m27396/1296678046-clip-983b.jpg'   title='сундук кузнеца'  width='30' height='30'/></a>";

                out2 += "<a href=\x22smith.php\x22><img src='http://brand.at.ua/botva/b5_8_2_a.png'   title='кузница'  width='30' height='30'/></a>";
                out2 += "<a href=\x22smith.php?a=train\x22>Учиться</a>";
                out2 += "<a href=\x22smith.php?a=ownshaman\x22><img src='http://brand.at.ua/botva/SmithC_5s.png'   title='заговоры'  width='30' height='30'/></a><br><br>";
                out2 += "<a href=\x22smith.php?a=own\x22><img src='http://brand.at.ua/botva/h_sm_own.png'  title='своя кузня'   height='20'/></a>";
                out2 += "<a href=\x22smith.php?a=orders\x22><img src='http://brand.at.ua/botva/foreign2_a.png' width='30' height='30'/>Заказы</a>";
                out2 += "<br><a href=\x22castle.php?a=hall&id=2\x22><img src='http://brand.at.ua/botva/hall_a.png'  width='30' height='30'/>ОЗ</a>";
				out2 += "<a href=\x22clan_mod.php?m=bmarket\x22><img src='http://clip2net.com/clip/m27396/1296989626-clip-1kb.jpg'  width='30' height='30' title='клановый рынок'/></a>";
				out2 += "<a href=\x22harbour.php?a=market\x22><img src='http://clip2net.com/clip/m27396/1296989746-clip-2kb.jpg'  width='30' height='30' title='торговая площадка'/></a>";
				out2 += "<a href='shtab.php?m=notes' class='cmd_all cmd_mini_sl cmd_amini_sl'>СПИСКИ</a>"
                out2 += "<br><a href=\x22http://simart.info/viewtopic.php?f=13&t=23\x22>О скрипте..</a><br>";
                out2 += "<a href=\x22http://botva-first.ucoz.ru\x22>Сайт клана \x22Первые\x22</a><br>";
                out2 += "<a href=\x22http://nms.at.ua/botvaparser/miner_test_3.swf\x22>плавка</a><br>";
                out2 += "<a href=\x22http://rio.ucoz.ru/magic_stone.swf\x22>шаманство</a><br>";
                out2 += "<a href=http://simart.reformal.ru/>есть идеи?</a><BR>";
            }
        }

        ///////////////////ПРОДВИНУТОЕ МЕНЮ/////////////////////////
        //out2 += "<form method='POST' action='?a=buy&id=2&group=1&group2=0' class='inline'>";
        //out2 += "<input type='hidden' name='k' value='"+set_kParam+"'> <input type='hidden' name='cmd' value='buy'>";
        //out2 += "<input type='submit'  value='КУПИТЬ синьку'></form>";   
        if (options[12][1] == 1) {

            if (options[35][1] == 0) { /*не скрівать кнопки*/
                var displayICO = "none"
            } else {
                var displayICO = ""
            }



            //  тут кнопки продвинутой панели//////////////////////////////////////////////////////////
            // вместо значения к подставляем set_kParam,
            //покупки 
            //<div  style='position:absolute;top:370px;left:10px;cursor:move'></div>
            knopka1 += "<table><tr><td><a  title='раздел закупок - кнопки появляются когда соответствующего ресурса меньше 1' ><b>  покупки-></b></a></td>"
            // общие кнопки
            //зеленка
            knopka1 += "<td><form method='POST' NAME='zel2' action='/shop.php?a=buy&id=1&group=1&group2=0' class='inline'><input type='hidden' name='k' value='" + set_kParam + "'> <input type='hidden' name='cmd' value='buy'></form><b   onClick=' document.zel2.submit()' title='Купить зеленку' class='icon potion_1'  id='item_177' style='display:" + displayICO + ";cursor: pointer;'></b></td>";
            //синька
            knopka1 += "<td><form method='POST' NAME='sinka' action='/shop.php?a=buy&id=2&group=1&group2=0' class='inline'><input type='hidden' name='k' value='" + set_kParam + "'> <input type='hidden' name='cmd' value='buy'></form><b   onClick=' document.sinka.submit()' title='Купить Синьку' class='icon potion_2'  id='item_277' style='display:" + displayICO + ";cursor: pointer;'></b></td>";
            ///////////////////////////////////////купить КД/////////////////////////////////////////
            knopka1 += "<td><form method='POST' NAME='kd' action='/shop.php?a=buy&id=3&group=1&group2=0' class='inline'><input type='hidden' name='ptype' value='1' checked='true'><input type='hidden' name='k' value='" + set_kParam + "'> <input type='hidden' name='cmd' value='buy'></form><b   onClick=' document.kd.submit()' title='Купить КД' class='icon potion_3'  id='item_377' style='display:" + displayICO + ";cursor: pointer;' ></b></td>";
            //желтій дьявол
            knopka1 += "<td><form method='POST' NAME='gd132' action='/shop.php?a=buy&id=132&group=1&group2=0' class='inline'><input type='hidden' name='ptype' value='1' checked='true'><input type='hidden' name='k' value='" + set_kParam + "'> <input type='hidden' name='cmd' value='buy'></form><b id='item_13277' style='display:" + displayICO + ";cursor: pointer;' onClick=' document.gd132.submit()' title='Купить желтій дьявол' class='icon item_132'></b></td>";

            //бутылочка
            knopka1 += "<td><form method='POST' NAME='gd130' action='/shop.php?a=buy&id=130&group=1&group2=0' class='inline'><input type='hidden' name='ptype' value='1' checked='true'><input type='hidden' name='k' value='" + set_kParam + "'> <input type='hidden' name='cmd' value='buy'></form><b id='item_13077' style='display:" + displayICO + ";cursor: pointer;' onClick=' document.gd130.submit()' title='Купить бутылочку 1кри' class='icon item_130'></b></td>";

            //пузірек
            knopka1 += "<td><form method='POST' NAME='gd131' action='/shop.php?a=buy&id=131&group=1&group2=0' class='inline'><input type='hidden' name='ptype' value='1' checked='true'><input type='hidden' name='k' value='" + set_kParam + "'> <input type='hidden' name='cmd' value='buy'></form><b id='item_13177' style='display:" + displayICO + ";cursor: pointer;' onClick=' document.gd131.submit()' title='Купить пузырек 3 кри' class='icon item_131'></b></td>";

            //кораблик
            knopka1 += "<td><form method='POST' NAME='ico_harbour_233'  action='harbour.php?a=pier' style='padding:0;'><input type='hidden' name='k' value='" + set_kParam + "'>  <input type='hidden' name='ship' value='3'><input type='hidden' name='do_cmd' value='buy_ship'><input type='hidden' name='ptype' value='1' ></form><b  onClick=' document.ico_harbour_333.submit()' title='Купить кораблик 70кри' class='iconsp ico_harbour_3' id='harbour_377' style='display:" + displayICO + ";cursor: pointer;'></b></td>";

            //кирка
            knopka1 += "<td><form method='POST' NAME='item_mine_133' action='mine.php?a=shop&buy=0&k=" + set_kParam + "' class='inline'><input type='hidden' name='type' value='0' >  </form><b  onClick=' document.item_mine_133.submit()' title='Купить кирку голд' class='iconsp item_mine_1' id='item_mine_177' style='display:" + displayICO + ";cursor: pointer;'></b></td>";
            //очки
            knopka1 += "<td><form method='POST' NAME='item_mine_233' action='mine.php?a=shop&buy=1&k=" + set_kParam + "' class='inline'><input type='hidden' name='type' value='0' >  </form><b  onClick=' document.item_mine_233.submit()' title='Купить очки голд' class='iconsp item_mine_2' id='item_mine_277' style='display:" + displayICO + ";cursor: pointer;'></b></td>";
            //каска 
            knopka1 += "<td><form method='POST' NAME='item_mine_333' action='mine.php?a=shop&buy=2&k=" + set_kParam + "' class='inline'><input type='hidden' name='type' value='0' >  </form><b  onClick=' document.item_mine_333.submit()' title='Купить каску трудяги голд' class='iconsp item_mine_3' id='item_mine_377' style='display:" + displayICO + ";cursor: pointer;'></b></td>";

            if (options[13][1] == 0) { // если шахтер
                var displayICO2 = displayICO
            } else {
                var displayICO2 = 'none'
            }
            //кирка шахтера
            knopka1 += "<td><form method='POST' NAME='item_mine3_133' action='mine.php?a=shop&buy=3&k=" + set_kParam + "' class='inline'><input type='hidden' name='type' value='1' >  </form><b  onClick=' document.item_mine3_133.submit()' title='Купить кирку трудяги 10.000голд' class='iconsp item_mine_1' id='item_mine_1772' style='display:" + displayICO2 + ";cursor: pointer;'><font color='Snow'>Ш</font></b></td>";
            //очки шахтера
            knopka1 += "<td><form method='POST' NAME='item_mine_2332' action='mine.php?a=shop&buy=4&k=" + set_kParam + "' class='inline'><input type='hidden' name='type' value='1' >  </form><b  onClick=' document.item_mine_2332.submit()' title='Купить очки шахтера голд' class='iconsp item_mine_2' id='item_mine_2772' style='display:" + displayICO2 + ";cursor: pointer;'><font color='Snow'>Ш</font></b> </td>";
            //каска шахтера
            knopka1 += "<td><form method='POST' NAME='item_mine_3332' action='mine.php?a=shop&buy=5&k=" + set_kParam + "' class='inline'><input type='hidden' name='type' value='1' >  </form><b  onClick=' document.item_mine_3332.submit()' title='Купить каску трудяги голд' class='iconsp item_mine_3' id='item_mine_3772' style='display:" + displayICO2 + ";cursor: pointer;'><font color='Snow'>Ш</font></b></td>";



            ///// /////////////////////////работа//////////////////////////////////
            knopka1 += "<td><a  title='раздел работа, кнопки появляются когда соотв таймер работы =  00:00:00 и есть ресурсы' ><b>  работа->?</b></a></td>"
            //шахта
            knopka1 += "<td><a href='mine.php?a=open&m=work&k=" + set_kParam + "' title='работать в шахте' class='iconsp item_mine_1'></a></td>"
            //страх бодалка
            knopka1 += "<td><form method='post' NAME='strbodalka' action='dozor.php?a=monster'><input type='hidden'  value='auto'><input type='hidden' name='k' value='" + set_kParam + "'></form><b style='cursor: pointer' onClick=' document.strbodalka.submit()' title='мочить страхов в бодалке' class='icon medallions' ></b></td>"
            //дозор
            knopka1 += "<td><form NAME='dozor' action='dozor.php?' method='POST' ><input type='hidden' name='k' value='" + set_kParam + "'><input type='hidden' name='auto_watch' value='1'></form><b style='cursor: pointer' onClick=' document.dozor.submit()' title='дозор 10мин' class='icon ico_clanleave' ></b></td>";
            //подземка
            knopka1 += "<td><form method='POST' NAME='podzem'  action='monster.php?a=start&k=" + set_kParam + "'><input type='hidden' name='ptype' value='1' checked='true'> </form><b  onClick=' document.podzem.submit()' title='в подземку по лебедке за 1кри' class=' icon ico_dungeon' id='ico_dungeon77' style='display:" + displayICO + ";cursor: pointer;'>  </b></td>";

            //ферма
            knopka1 += "<td><a title='переход на ферму (без запуска)' id='ico_farm77' style='display:" + displayICO + "' class='icon ico_farm' href='/farm.php' ></a>";

            //
            ////////////////////////////фоновые работы//////////////////////////////
            knopka1 += "<td><a  title='тоже что и работа, ток здесь фоновые работы' ><b>фон->?</b></a></td>"


            //МБП
            knopka1 += "<td><a title='малая поляна' id='ico_ticket177' style='display:" + displayICO + "' class='icon ico_ticket1' href='mine.php?a=mine&m=start&t=1&k=" + set_kParam + "' ></a>";
			//ББП
            knopka1 += "<td><a title='Большая поляна' id='ico_ticket277' style='display:" + displayICO + "' class='icon ico_ticket2' href='mine.php?a=mine&m=start&t=2&k=" + set_kParam + "' ></a>";
            //акс  
            knopka1 += "<td><a title='Акс шифрус' id='ico_axe77' style='display:" + displayICO + "' class=' icon ico_axe' href='shop.php?a=info&id=245' ></a>";

            // пирашки
            knopka1 += "<td><form method='post' NAME='pirashki'  action='harbour.php?a=pier'><input type='hidden' name='do_cmd' value='send'><input type='hidden' name='k' value='" + set_kParam + "'></form><b  onClick=' document.pirashki.submit()' class='icon fishes' title='Добывать Пирашки' id='fishes77' style='display:" + displayICO + ";cursor: pointer;' > </b></td>"

            if (options[13][1] == 1) { // видно если стоит галка "кнопки кузь"
                var displayICO3 = displayICO
            } else {
                var displayICO3 = 'none'
            }
            //=================Добывать иглЫ=======
            knopka1 += "<td> <form method='POST' NAME='igli' action='smith.php?a=ownwork&type=1'><input type='hidden' name='k' value='" + set_kParam + "'><input type='hidden' name='hours' value='4'></form><b  id='item_smith_177' style='display:" + displayICO3 + ";cursor: pointer;'  onClick=' document.igli.submit()' title='добыть Капустные иглы' class='iconsp item_smith_1'></b></td>";
            //===================Плавить золото============================
            knopka1 += "<td><form method='POST' NAME='plavka' action='smith.php?a=ownwork&type=2'><input type='hidden' name='k' value='" + set_kParam + "'><input type='hidden' name='hours' type='hidden' value='4'><b id='item_smith_277' style='display:" + displayICO3 + " ;cursor: pointer;' onClick=' document.plavka.submit()' title='добыть Черное золото' class='iconsp item_smith_2'></b></form></td>";
            //================консервировать===============================style='cursor: pointer'
            knopka1 += "<td><form NAME='kons' method='post' action='smith.php?a=ownbag'>  <input type='hidden' name='convert' value='1'><input type='hidden' name='k' value='" + set_kParam + "'></form><b id='item_smith_577' style='display:" + displayICO3 + ";cursor: pointer;' onClick=' document.kons.submit()' title='Консервировать ЯС' class='iconsp item_smith_5'></b></td>";
            //===============================================
            //разное
            if (options[11][1] !== 1) {
                if (document.getElementById('pet')) {
                    knopka1 += "<td><form method='post' NAME='zverIN' action='house.php?info=cage'>  <input type='hidden' name='cmd' value='cage'>  <input type='hidden' name='k' value='" + set_kParam + "'></form><b id='item_smith_577' style='cursor: pointer;' onClick=' document.zverIN.submit()' title='посадить зверя в клетку' class='icon ico_online1'></b></td>";
                } else {
                    knopka1 += "<td><form method='post' NAME='zverOUT' action='house.php?info=cage'>  <input type='hidden' name='cmd' value='uncage'>  <input type='hidden' name='k' value='" + set_kParam + "'></form><b id='item_smith_577' style='cursor: pointer;' onClick=' document.zverOUT.submit()' title='достать зверя из клетки' class='icon ico_onlineW'></b></td>";
                }
            }
            //==============

            knopka1 += "</tr></table>";
            //////////////////////////////////	//єто не трогаем!!///////////////////////////////

            knopka += "<div   id='panel2'  onmousedown = 'initMove(this, event);'onmouseup = 'StopMove(this)' style=\x22position:";

            //загруз координат из памяти
            if (localStorage.getItem('panel2L') !== null) {

                var set_otstupA = localStorage.getItem('panel2L');
                set_otstup_vnizA = localStorage.getItem('panel2T');
            }

            if (USE_positA == 1) {
                knopka += "fixed;";
            } else {
                knopka += "absolute;";
            }
            knopka += "z-index: 2;";
            if (USE_leftA == 1) {
                knopka += "left:"
            } else {
                knopka += "right:"
            }
            knopka += set_otstupA
            knopka += "; top:";
            knopka += set_otstup_vnizA
            knopka += ";cursor:move;\x22  >";
            //============================

            knopka += "<div>";
            knopka2 += "</div></div>";
            //------------------------------



            var dgv4434 = document.createElement('DIV');
            dgv4434.id = "ntf_al_288";
            dgv4434 = document.body.appendChild(dgv4434);
            knopka += knopka1 + knopka2
            //==========
            knopka1 = null
            knopka2 = null

            if (options[0][1] == 1) {
                knopka = localStorage.getItem('knopka')
            }

            dgv4434.innerHTML += knopka
        }




        out += "<div id='panel1' onmousedown = 'initMove(this, event);'onmouseup = 'StopMove(this)'        style='position:";
        //загруз координат из памяти
        if (localStorage.getItem('panel1L') !== null) {

            options[39][1] = localStorage.getItem('panel1L');
            options[38][1] = localStorage.getItem('panel1T');
        }

        if (options[5][1] == 1) {
            out += "fixed;";
        } else {
            out += "absolute;";
        }
        out += "z-index: 2;";
        if (options[4][1] == 1) {
            out += "left:"
        } else {
            out += "right:"
        }
        out += options[39][1]
        out += "; top:";
        out += options[38][1]
        out += ";cursor:move;'\>";



        out += "<div id='dv317' class='inputGroup '><div class='grtop'></div><div  class='grbody'>"; //style='background-color:rgb(231,207,165) 
        //===========вставка==============================
        out3 += "</div><div class='bottom'></div></div></div>";

        // вібрать какие ссілки отображать   раскоментируй нужнй вариант




        if (options[2][1] == 1) {
            if (options[3][1] == 1) {
                out4 = out + out1 + out3 // Меню1              текстовіе ссілки
            } else {
                out4 = out + out2 + out3 // Меню2                 графические ссілки         
            }

            var dgv4433 = document.createElement('DIV');
            dgv4433.id = "ntf_al_" + i;
            dgv4433 = document.body.appendChild(dgv4433);

            //===========
            out = null
            out2 = null
            out3 = null

            if (options[1][1] == 1) {
                out4 = localStorage.getItem('out4')
            }

            dgv4433.innerHTML += out4

        }
        ////////////////////////////ДАЛЬШЕ НЕТРОГАТЬ///////////////////////////////   
        // експериментальній ф-ции
        //informers()

        if (options[62][1] == 1) {
            lavka()
        }

        if (options[61][1] == 1) {
            klan()
        }

        if (options[60][1] == 1) {
            kravchuchka()
        }


        pet()


        stabspisok()

        if (options[29][1] == 1) {
            perec_perc();
        }

        if (options[36][1] == 1) {


            if (options[37][1] == 1) {
                pochta()
            }

            fightlog()
        }


        if (options[69][1] == 1) {
            podzem()
        }


        if (options[10][1] == 1) {
            switchBidKri();
        }
        if (options[32][1] == 1) {
            sumka()
        }
        if (options[33][1] == 1) {
            infoUP()
        }
        /////////////////////////////////////////////////////////////////////////////////
        if (options[31][1] == 1) {
            b_healt();
        }
        if (options[9][1] == 1) {
            switchBid();

        }
        //============доп значки=============================================================
        var out_F = "";

        try {
            if (options[22][1] == 1) {

                //расщет загрузки сервера
                var ppp = document.getElementById("online")
                var D_aktiv = ppp.getElementsByTagName('b')[0].innerHTML
                var D_onl = ppp.getElementsByTagName('b')[1].innerHTML
                var D_itog = parseInt(D_onl / (D_aktiv / 100))
                out_F += "загруж.серва<br>" + D_itog + "% активн <br>";
                var D_itog = parseInt(D_onl / (6000 / 100))
                out_F += D_itog + "%_лаги";
                document.getElementById("crystal").innerHTML += out_F;
            }

            if (options[20][1] == 1) {
                var out_F = "";
                //var ribka = document.getElementById("fish").innerHTML; //  
                out_F += "<A href='harbour.php?a=pier'><b>причал<b><b class='iconsp ico_harbour_3'></b></A>";
                //out_F+="<A href='harbour.php?a=pier'><font  color='red' ><b>причал<b></font></A>"; width='30' height='30'
                document.getElementById("fish").innerHTML += out_F;
            }
            if (options[21][1] == 1) {
                out_F = "";
                //var ribka = document.getElementById("green").innerHTML; //имун             
               
                out_F += "<A href='kormushka.php'></A><P>зелень:</P><B>";
                out_F += options[54][1] + "</B>";
                document.getElementById("green").innerHTML = out_F;

            }
        } catch (e) {}
        out_F = null
        //=====================================================================
        //Задержка между запросами нового интерфейса сбытницы
        var CTUIH_DELAY = 1500;

        //Optimization: array of items for TradeHack and etc.
        var itms = new Array();
        var pitmtype = -1;
        var pitmreq, ctuih, purl, rlastk;
        var INDEX_PAGE = 4;
        var CHAR_PAGE = 5;

        if (options[16][1] == 1) {
            f_zagovor();
            zakaznik_upd();
        }

        if (document.URL.indexOf("/training.php?a=harbour") > 0) { // пирашки
            sr_stat();
        }
        if (options[26][1] == 1) {
            if (document.URL.indexOf("/index.php") > 0 || document.URL.indexOf("/player.php") > 0 || document.URL.indexOf("/shtab.php?m=notes") > 0)   {
                inlineWritePercentStatsValues();
            }



            // при поиске в бодалке==============================
            if (document.URL.indexOf("dozor.php") > 0) {
                if (document.URL.indexOf("dozor.php?a=monster") > 0) {
                    // если страх

                } else {
                    var xP = document.getElementsByClassName('skills h20 font_black')
                    for (i = 0; i < xP.length; i++) { // чтоб небіло ошибки когда обана никого нема
                        if (i == 0) {
                            var xP = document.getElementsByClassName('skills h20 font_black')[0]
                            var plvl = xP.rows[1].cells[2].innerHTML // лвл
                            var pSil = xP.rows[2].cells[3].innerHTML // сила
                            var pZas = xP.rows[3].cells[3].innerHTML // защита
                            var pLov = xP.rows[4].cells[3].innerHTML // ловка
                            var pMas = xP.rows[5].cells[3].innerHTML // маса
                            var pHar = xP.rows[6].cells[3].innerHTML // мастерство



                            //===================	
                            var prk = perecath(pSil, pZas, pLov, pMas, pHar, plvl)
                            var prk2 = perec = get_cookie('perec'); // свой перек

                            if (prk2 + 1 < prk) {
                                col = "red"
                            } else {
                                col = "Blue"
                                if (prk2 - 1 > prk) {
                                    col = "Green"
                                }
                            }

                            //======================	

                            plvl = xP.rows[1].cells[3].innerHTML = "<a href='/training.php?a=harbour'>Кач.<font color='" + col + "'><b>" + prk + "</b></font></a>";
                        }
                    }
                }
            }


            //=================================================			

        }
        if (options[14][1] == 1) {
            if (document.URL.indexOf("/trade.php") > 0) {
                if (document.URL.indexOf("/trade.php?m=add") > 0 || document.URL.indexOf("/trade.php?tobag=") > 0 || document.URL.indexOf("/trade.php?frombag=") > 0) {

                } else {
                    fixTradeLevels();
                }
            }
        } { //INTERSCRIPTSEXCHANGEBLOCK
            //All values in that block must be undefined.
            var FUSE_STATS_ACCUM = undefined; //
        }
        //----------------

        // названия цветов можно узнать здесь http://35rus.ru/htmlcolor.php
        if (options[18][1] == 1) {
            document.getElementById("bgmain3").style.backgroundColor = options[50][1];
        }
        if (options[19][1] == 1) {
            document.getElementById("bgmain2").style.background = "url('" + options[46][1] + "')";
        }
        if (options[24][1] == 1) {
            switchCurrency(options[25][1]);
        }
        //----------------
        var ntf_reprb;
        //if (USE_NOTIFY==1||use_signalka==1){
        ntf_reprb = setInterval(function () {
            ChengeImage();
        }, 2000);
        //}



    }
	
	}else{
	
	localStorage.setItem('stopKF','0')
	 window.location = window.location;
	
	}
	
	
	
	}

    /////////**********************************


    function ChengeImage() { // оповещение таймеров таймеры
 if (options[73][1] == 1) {
        replacekparam() //обновить К параметр
}

        if (options[12][1] == 1) {
            informers()
        }

        //==========================
        if (options[8][1] == 1) {
            signalka()
        }

        if (options[6][1] == 1) {
            var pos = document.getElementsByClassName('timer link')[0].innerText; // работа
            var pos2 = document.getElementsByClassName('timer')[1].innerText; //имун
            var pos3 = document.getElementsByClassName('timer attack')[0].innerText; //имун




            //==================              
            //********


            if ((pos3 == "00:00:01") || (pos3 == "00:00:02") || (pos3 == "00:00:03")) {

                var dgv4466 = document.createElement('DIV');
                dgv4466.id = "ntf_alm_" + i;
                dgv4466 = document.body.appendChild(dgv4466);
                dgv4466.innerHTML += pipip(options[49][1]);
                if (options[7][1] == 1) {
                    if (!opera) {
                        setTimeout("showMessage(options[53][1]);", 20);
                    } else {
                        alert(options[53][1]);
                    }
                }
            }
            if ((pos2 == "00:00:01") || (pos2 == "00:00:02") || (pos2 == "00:00:03")) {

                var dgv4466 = document.createElement('DIV');
                dgv4466.id = "ntf_alm_" + i;
                dgv4466 = document.body.appendChild(dgv4466);
                dgv4466.innerHTML += pipip(options[48][1])
                if (options[7][1] == 1) {

                    if (!opera) {
                        setTimeout("showMessage(options[52][1]);", 20);
                    } else {

                        alert(options[52][1]);
                    }
                }
            }
            if ((pos == "00:00:03") || (pos == "00:00:01") || (pos == "00:00:02")) {

                var dgv4466 = document.createElement('DIV');
                dgv4466.id = "ntf_alm_" + i;
                dgv4466 = document.body.appendChild(dgv4466);
                dgv4466.innerHTML += pipip(options[47][1])
                if (options[7][1] == 1) {


                    if (!opera) {
                        setTimeout("showMessage(options[51][1]);", 20);
                    } else {

                        alert(options[51][1]);
                    }
                }
            }

            return;
        }
    }
    //ф-ции быстрые списки

    function sp_set() {
        var sp_nick = getCookie("sp_nick")
        var sp1 = sp_nick.substr(0, 1);
        sp_nick = sp_nick.substr(1, sp_nick.length);
        document.getElementById("group").options[sp1 * 1].selected = true;
        document.getElementsByName("username")[0].value = sp_nick;
    }

    function setCookie(c_name, value) {
        localStorage.setItem(c_name, value);

    }

    function getCookie(name) {
        return localStorage.getItem('name');

    }
    ////перекл валют

    function switchCurrency(ctype) {
        var xd = document.getElementsByTagName("INPUT");
        var i;
        for (i = 0; i < xd.length; i++) {
            if (xd[i].type == "radio") {
                if (xd[i].name == "ptype" || xd[i].name == "ptype_1" || xd[i].name == "ptype_2") {
                    if (xd[i].value == ctype) {
                        xd[i].checked = true;
                    }
                }
            }
        }
    }
    // принудительное снятие галочки ставки

    function switchBid() {
        // 
        if (document.URL.indexOf("/trade.php?m=add2") > 0) {
            var xd = document.getElementsByName("trade");
            var xxd = document.getElementsByName("fast_trade");
            var xyd = document.getElementsByName("fast_type");
            var yxd = document.getElementsByName("fast_price");
            var i;
            for (i = 0; i < xd.length; i++) {
                xd[i].checked = false;
                xxd[i].checked = true;
                xyd[i].disabled = false;
                yxd[i].disabled = false;
            }
        }
    }
    // принудительное снятие галочки ставки

    function switchBidKri() { // переключить на кри в сбытке
        if (document.URL.indexOf("/trade.php?m=add2") > 0) {
            document.getElementById("bid_type").selectedIndex = 1;
            //updateBid();




        }
    }
    // аддон для перса

    function inlineWritePercentStatsValues() { // аддон инфо перса

        var totalgold, getgold, lostgold;
        var totalbat, winbat, losebat;
        var x = document.getElementsByClassName('stats nowrap font_black')[0]

        totalbat = parseInt(x.rows[3].cells[1].innerHTML);

        winbat = parseInt(x.rows[4].cells[1].innerHTML);

        losebat = totalbat - winbat;

        //правка 29
        getgold = parseInt(x.rows[5].cells[1].getElementsByClassName('price_num')[0].innerHTML.replace(/\./gi, ''));
        losegold = parseInt(x.rows[6].cells[1].getElementsByClassName('price_num')[0].innerHTML.replace(/\./gi, ''));
/*
	getgold = parseInt(x.rows[5].cells[1].innerHTML.replace(/\./gi,''));
losegold = parseInt(x.rows[6].cells[1].innerHTML.replace(/\./gi,''));

*/


        totalgold = getgold + losegold;


        x.rows[5].className = "";
        x.rows[6].className = "row_1";
        x.rows[7].className = "";


        getgold = razd_sum(getgold) + " <span class='IAD_INDEX'>(" + Math.floor((getgold * 100) / totalgold) + " %)</span>";
        losegold = razd_sum(losegold) + " <span class='IAD_INDEX'>(" + Math.ceil((losegold * 100) / totalgold) + " %)</span>";
        winbat = razd_sum(winbat) + " <span class='IAD_INDEX'>(" + Math.floor((winbat * 100) / totalbat) + " %)</span>";
        losebat = razd_sum(losebat) + " <span class='IAD_INDEX'>(" + Math.ceil((losebat * 100) / totalbat) + " %)</span>";

        totalbat = document.createElement('TR');

        totalgold = document.createElement("TD");
        totalgold.className = "left";
        totalgold.innerHTML = "Поражения";
        totalbat.appendChild(totalgold);
        totalgold = document.createElement("TD");
        totalgold.innerHTML = losebat;
        totalbat.appendChild(totalgold);
        totalbat.className = "row_1";
        g = x.rows[5];
        totalbat = g.parentNode.insertBefore(totalbat, g);
        //===============получаем статы перса
        if (document.URL.indexOf("/index.php") > 0) {


            var xP = document.getElementById('char_info')
            xP = xP.getElementsByClassName('skills h20 font_black')[0]

            var plvl = parseInt(xP.rows[0].cells[2].innerHTML) // лвл

            set_cookie("mlvl", plvl, 2012, 01, 15);
            var LVL = plvl
            var pSil = parseInt(xP.rows[1].cells[3].innerHTML) // сила
            var pZas = parseInt(xP.rows[2].cells[3].innerHTML) // защита
            var pLov = parseInt(xP.rows[3].cells[3].innerHTML) // ловка
            var pMas = parseInt(xP.rows[4].cells[3].innerHTML) // маса
            var pHar = parseInt(xP.rows[5].cells[3].innerHTML) // мастерство

           
            var pSil2 = parseInt(xP.rows[1].cells[4].innerHTML.replace(/\+/gi, '')); // сила шмот
            if (isNaN(pSil2)) {
                pSil2 = 0
            }
			var pZas2 = parseInt(xP.rows[2].cells[4].innerHTML.replace(/\+/gi, '')); // защита
            if (isNaN(pZas2)) {
                pZas2 = 0
            }
			var pLov2 = parseInt(xP.rows[3].cells[4].innerHTML.replace(/\+/gi, '')); // ловка
            if (isNaN(pLov2)) {
                pLov2 = 0
            }
			var pMas2 = parseInt(xP.rows[4].cells[4].innerHTML.replace(/\+/gi, '')); // маса
            if (isNaN(pMas2)) {
                pMas2 = 0
            }
            var pHar2 = parseInt(xP.rows[5].cells[4].innerHTML.replace(/\+/gi, '')); // мастерство
			if (isNaN(pHar2)) {
                pHar2 = 0
            }



            var pSil3 = pSil + pSil2
            var pZas3 = pZas + pZas2
            var pLov3 = pLov + pLov2
            var pMas3 = pMas + pMas2
            var pHar3 = pHar + pHar2

            if (options[43][1] == 1) {
                pZas3 += (pZas3 / 100) * 30
                pSil3 += (pSil3 / 100) * 30
            };

            //=================================
            //тотемы доработать
            //=========================================
            var bali_ras = bal_raz(pSil3, pZas3, pLov3, pMas3, pHar3); // общие балы расщепа

            set_cookie("bali_ras", bali_ras, 2012, 01, 15);

            var bali_ras_S = bal_raz(pSil2, pZas2, pLov2, pMas2, pHar2); //балы шмота
            set_cookie("bali_ras_S", bali_ras_S, 2012, 01, 15);



            if (options[28][1] == 1) {
                //вівод суммы
                xP.rows[1].cells[1].innerHTML = "<B>" + pSil3 + "</B>+30%Сила";
                xP.rows[2].cells[1].innerHTML = "<B>" + pZas3 + "</B>+30%Зщт";
                xP.rows[3].cells[1].innerHTML = "<B>" + pLov3 + " </B> Ловка";
                xP.rows[4].cells[1].innerHTML = "<B>" + pMas3 + "</B> Масса.";
                xP.rows[5].cells[1].innerHTML = "<B>" + pHar3 + "</B> Маст-во";
            }



            plvl = xP.rows[0].cells[3].innerHTML = "<a href='/training.php?a=harbour'>Кач.<b>" + perecath(pSil, pZas, pLov, pMas, pHar, LVL) + "</b></a>";
            var FUSE_STATS_ACCUM = stoim_stt(pSil, pZas, pLov, pMas, pHar);
           
            //==================
        } else { //||document.URL.indexOf("/player.php"
            //=======================

            var xP = document.getElementsByClassName('skills h20 font_black')[0]
            
			var plvl = xP.rows[1].cells[2].innerHTML // лвл
            var LVL = plvl
            var fg = parseInt(LVL > 14 ? (LVL / 5) + 1 : (LVL > 2 ? (LVL > 6 ? 3 : 2) : 1))
            var lfg = (fg - 1) * 5;
            lfg += "-" + (lfg + 4)
            xP.rows[1].cells[2].onmouseover = "doItem('138','body:|Фермерская группа- <b>" + fg + "(" + lfg + "лвл)</b> <br />  Покупка за голд ФГ -(фг+1)<br /><br />Продажа за голд (фг-1) -ФГ<br />Заказ ковки (фг-1)-(фг+1) <br />Своя Ковка <=фг+1 <br />|',event,this)";

            //"doItem('138','body:|Уровень "+LVL+"<br /> Фермерская группа "+fg+" <br /> Покупка за голд ФГ -(фг+1) <br />Продажа за голд (фг-1) -ФГ<br />Заказ ковки (фг-1)-(фг+1) <br />Своя Ковка <=фг+1 <br /> |',event,this)";

            xP.rows[1].cells[2].innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ФГ-" + fg
            xP.rows[1].cells[2].innerHTML += "  <a  onclick='krutoj()'title='покажет активирован у перса крутой или нет - нужно кликнуть' ><b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;КР?</b></a>"
            var pSil = xP.rows[2].cells[3].innerHTML // сила
            var pZas = xP.rows[3].cells[3].innerHTML // защита
            var pLov = xP.rows[4].cells[3].innerHTML // ловка
            var pMas = xP.rows[5].cells[3].innerHTML // маса
            var pHar = xP.rows[6].cells[3].innerHTML // мастерство


            //===================	
            var prk = perecath(pSil, pZas, pLov, pMas, pHar, plvl)
            var LVL = parseInt(plvl)

            var prk2 = perec = get_cookie('perec'); // свой перек

            if (prk2 + 1 < prk) {
                col = "red"
            } else {
                col = "Blue"
                if (prk2 - 1 > prk) {
                    col = "Green"
                }
            }

            //======================


            plvl = xP.rows[1].cells[3].innerHTML = "<a href='/training.php?a=harbour'>Кач.<font color='" + col + "'><b>" + prk + "</b></font></a>";


            var FUSE_STATS_ACCUM = stoim_stt(pSil, pZas, pLov, pMas, pHar)
        }


        var totalstats = document.createElement('TR');
        totalstats.className = "row_1";
        totalstats = g.parentNode.appendChild(totalstats);
        FUSE_STATS_ACCUM = razd_sum(FUSE_STATS_ACCUM)

        totalstats.innerHTML = "<td class='left'>Статы</td><td>" + FUSE_STATS_ACCUM + " <b class='icon money1' title='Золото'></b></td>"; /*======================================*/






        /*--------------------------------------*/

        var BBP = parseInt(((2 / 3) - (30 / (LVL + 50))) * 100)
        var kv = LVL * LVL * 100
        var bilet = document.createElement('TR');
        bilet.className = "";
        bilet.onmouseover = "doItem('138','body:|базовый шанс найти медальен <b>" + BBP + "</b>%<br /> шанс найти медаль с 1ищейкой <b>" + (BBP * 1.5) + "</b>%<br /><br />базовый шанс найти ,любой билет <b>" + BBP + "</b>%<br />базовый шанс найти ,большой билет <b>" + (BBP / 2) + "</b>%|',event,this)";
        bilet = g.parentNode.appendChild(bilet);


        bilet.innerHTML = "<td  class='left'>Шанс<b title='базовый шанс найти ББП' class='icon ico_ticket2'></b><b title='базовый шанс найти медальен (с ищейкой " + (BBP * 1.5) + "%)' class='icon medallions'></b></td><td>" + BBP + "%</td>";
        var kvar = document.createElement('TR');
        kvar.className = "row_1";
        kvar = g.parentNode.appendChild(kvar);


        kvar.innerHTML = "<td class='left'>Разграб<b title='максимально может украсть при разграбе замка' class='icon2 ico_clanwar'></b></td><td>" + razd_sum(parseInt(kv / 1000)) + "<b class='icon money2' title='кри'></b>" + razd_sum(kv) + "<b class='icon money1' title='золота'></b></td>";


        //========================
        x.rows[5].cells[1].innerHTML = losebat;
        x.rows[6].cells[1].innerHTML = getgold;
        x.rows[7].cells[1].innerHTML = losegold;
        x.rows[4].cells[1].innerHTML = winbat;
        return;
    }

    function pipip(url) {
        var muz
/*MIME-тип				File Extension
audio/basic				.au
audio/x-wav				.wav
audio/x-aiff			.aif .aiff
audio/x-midi			.mid .midi
audio/x-pr-realaudio	.ra .ram
audio/x-mpeg			.mpg .mpeg .mp2 .mp3
flash					swf*/

        var ext = url.substr(-3, 3)
       
        if (ext == "mp3" || ext == "mpg" || ext == "mpeg" || ext == "mp2") {
            muz = "<embed src='" + url + "' type='audio/x-mpeg' hidden='true' autostart='true' >"
        }
        if (ext == "ra" || ext == "ram") {
            muz = "<embed src='" + url + "' type='audio/x-pr-realaudio' hidden='true' autostart='true' >"
        }
        if (ext == "mid" || ext == "midi") {
            muz = "<embed src='" + url + "' type='audio/x-midi' hidden='true' autostart='true' >"
        }
        if (ext == "aif" || ext == "aiff") {
            muz = "<embed src='" + url + "' type='audio/x-aiff' hidden='true' autostart='true' >"
        }
        if (ext == "wav") {
            muz = "<embed src='" + url + "' type='audio/x-wav' hidden='true' autostart='true' >"
        }
        if (ext == "au") {
            muz = "<embed src='" + url + "' type='audio/basic' hidden='true' autostart='true' >"
        }
        if (ext == "swf") {
            muz = "<OBJECT classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'><PARAM name='movie' value='" + url + "'><PARAM name='quality' value='high'><EMBED src='" + url + "' style='display:block' TYPE='application/x-shockwave-flash'></EMBED></OBJECT>"
        }
        //http://st.wapix.ru/new/59/64188.mp3

        var dgv4466 = document.createElement('DIV');
        dgv4466.id = "ntf_alm_981";
        dgv4466 = document.body.appendChild(dgv4466);
        dgv4466.innerHTML += muz



    }
    //===========================================настройка скрипта

    function loadSetupButton(arg) { // кнопка настройка
        if (arg == 0) {
            //var xt = document.getElementsByClassName('png')[1].offsetLeft;
            var xt = document.createElement('DIV');
            var gmd = document.createElement('SPAN');
            gmd.style.position = "absolute";
            gmd.style.left = xt;
            gmd.style.top = '0px';
            gmd.style.fontWeight = 'bold';
            gmd.innerHTML = '[Настроить скрипт]';
            gmd.style.cursor = 'pointer';
            gmd.id = 'script_setup_button';
            document.body.appendChild(gmd);

            ///=========================================

            ///======================================
        }

        document.getElementById('script_setup_button').addEventListener('click', function (e) {
            try {
                var x_obj = document.getElementById('setup_window');
                x_obj.style.display = 'block';
                x_obj.style.position = 'absolute';
                x_obj.style.top = "30px";
                x_obj.style.left = window.scrollX + Math.floor((window.innerWidth - x_obj.offsetWidth) / 2) + "px";
                x_obj.style.zIndex = 99;
                var d_obj = document.getElementById('tone');
                d_obj.style.position = 'absolute';
                d_obj.style.width = document.width;
                d_obj.style.height = document.height;
                d_obj.style.top = '0px';
                d_obj.style.left = '0px';
                d_obj.style.zIndex = 98;
                d_obj.style.display = "block";
            } catch (err) {
                alert(err)
            }
        }, true)
        constructSetupWindow();
        return;
    }

    function constructSetupWindow() { // окно настроек
        try {
            var dwin = document.createElement('DIV');
            dwin.style.backgroundColor = "rgb(220,204,174)";
            dwin.style.padding = "1px";
            dwin.id = "setup_window";
            dwin.style.display = "none";
            dwin.style.width = "400px";
            document.body.appendChild(dwin);
            dwin = document.createElement("TABLE");
            dwin.style.border = "1px solid rgb(236,222,198)";
            dwin.borderCollapse = "collapse";
            document.getElementById('setup_window').appendChild(dwin);
            var b_tone = document.createElement('DIV');
            b_tone.style.opacity = "0.7";
            b_tone.style.backgroundColor = "black";
            b_tone.id = "tone";
            b_tone.style.display = "none";
            document.body.appendChild(b_tone);
            var out = "";

            out += "<tbody ><tr style='background-color:rgb(214,194,157)'><td style='text-align:left;width:100%;font-weight:bold'>Настройка скрипта от Razorback ||скрипт для Opera для других браузеров правильная работа всех ф-ций не гарантируется<span id='bb-help' style='padding-left:20px;cursor:pointer'>(?)</span></td><td style='text-align:right;width:30px;cursor:pointer' id='setup_close'>[Сохранить]</td></tr><td colspan=2><div ><table><tbody>";
            out += "<tr>";
            out += "<td>";

            //панель////////
            out += "<input type=button  value='сохранить текущую панель кнопок' onClick='save_panel(0)'  ><br>";
            out += "<input type=button  value='показать сохраненный код ПК' onClick='save_panel(1)'  >";
            out += "<input type=button  value='ввести свой код ПК' onClick='save_panel(2)'  ><br>";
            out += "<input type=button  value='сохранить текущую панель ССылок' onClick='save_panel(3)'  ><br>";
            out += "<input type=button  value='показать сохраненный код ПС' onClick='save_panel(4)'  >";
            out += "<input type=button  value='ввести свой код ПС' onClick='save_panel(5)'  ><br>";

            for (i = 0; i < options.length; i++) {
                //options[0]	= ["USE_panelKK","1", "checkbox","использовать мохраненную панель кнопок",""];
                //options[38]	= ["set_otstup_vniz","15px", "text","тступить панель вниз   пикселей",""];
                if (options[i][2] == 'checkbox') {
                    out += options[i][4] + "<input type='checkbox' name='" + options[i][0] + "' value='1'";
                    if (options[i][1] == 1) {
                        out += "checked=''";
                    }
                    out += ">" + options[i][3] + "</input><br>";
                }

                if (options[i][2] == 'td') {
                    out += "</td>";
                    out += "<td>";
                }

                if (options[i][2] == 'text') {
                    out += options[i][4] + "<input type='text' name='" + options[i][0] + "'";
                    //if (options[i][1]!==null){	
                    //	alert(options[i][3])
                    out += " value='" + options[i][1] + "'"; //}	
                    out += ">" + options[i][3] + "</input><br>";
                }

            }


            out += "</td>";
            out += "</tr>";

            out += "<tr></tr></tbody></table></td></tr></tbody></table></div></div>";
            //=============  


            //=========================

            dwin.innerHTML = out;
            out = null

            document.getElementById('setup_close').addEventListener('click', function (e) {
                try {

                    document.getElementById('setup_window').style.display = 'none';
                    document.getElementById('tone').style.display = 'none';



                    for (i = 0; i < options.length; i++) {
                        //options[0]	= ["USE_panelKK","1", "checkbox","использовать мохраненную панель кнопок",""];
                        if (options[i][2] == 'checkbox') {
                            if (document.getElementsByName(options[i][0])[0].checked == true) {
                                options[i][1] = 1
                            } else {
                                options[i][1] = 0
                            };

                        }

                        if (options[i][2] == 'text') {
                            options[i][1] = document.getElementsByName(options[i][0])[0].value
                        }
                    }




                    for (i = 0; i < options.length; i++) {
                        localStorage.setItem(options[i][0], options[i][1]);
                    }




                    //////*************************************************************************
                    window.location = window.location;

                } catch (err) {
                    alert(err)
                }
            }, true);
            return;
        } catch (err) {
            log(err)
        }
    }

    function set_cookie(name, value, exp_y, exp_m, exp_d, path, domain, secure) {
        localStorage.setItem(name, value);

    }

    function get_cookie(cookie_name) {
        var results = localStorage.getItem(cookie_name);

        return results;
    }

    function load_cookie() { //================загрузка настроек из кука


        for (i = 0; i < options.length; i++) {
            if (localStorage.getItem(options[i][0])) {
              
                options[i][1] = localStorage.getItem(options[i][0]);
            }
        }

        //=========================================================
    }

    function signalka() { // оповещение всех таймеров
        var posx = document.getElementsByClassName('js_timer');
        for (var i = 0; i < posx.length; i++) {
            var pos5 = posx[i].innerHTML; //значение

            if ((pos5 == "00:00:02") || (pos5 == "00:00:03") || (pos5 == "00:00:04") || (pos5 == "0:00:00:02") || (pos5 == "0:00:00:03") || (pos5 == "0:00:00:04")) {
                pipip(options[59][1]);
            }
        }
    }

    function fixTradeLevels() { // инфо аддон сбытня
        var re_R = "";


        var mdx1 = document.getElementsByClassName("trade center")[0];

        row0 = mdx1.rows[0];
        var td = row0.insertCell(1).innerHTML = "<th>атрибуты&#160;</th>";




        //var mdx2 = mdx1.getElementsByTagName("TD");
        var mdx2 = mdx1.rows;

        //td = mdx2.rows[i].insertCell(-1).innerHTML
        for (ii = 1; ii < mdx2.length; ii++) {




            td = mdx2[ii].insertCell(1)
            var mdx = mdx2[ii].cells[0].getElementsByTagName("IMG");
            for (i = 0; i < mdx.length; i++) {
                if (mdx[i].getAttribute('onmouseover') !== null) {
                    //	alert(mdx[i].getAttribute('onmouseover'))
                    var str = mdx[i].getAttribute('onmouseover')
                    var re = str.match(/level:\|(\d*)\|/); // level
                    //var re_chance =  str.match(/chance:\|(\d*.\d*)\|/); // level 
                    var re_chance = str.match(/chance:\|([^\|]*)\|/); // level

                    var re_zag1 = str.match(/class...icon.ico.magic(\d*)/); // level 
                    var re_zag = str.match(/Постоянный\sзаговор\s.*\s(\d*)\sуровня/); // level 

                    if (/Работа /.test(str)) {
                        var re_R = "<b title='расщеп мастера +0 (100%) ' class='icon icon ico_smithwork'></b>";
                    }
                    if (/Ручная работа/.test(str)) {
                        var re_R = "<b title='расщеп гранда +25 (125%) ' class='icon guild1'></b>";
                    }

                   
                    //=====================================
                    if (re !== null) {
                        var s_level = parseInt(re[1]) + 1
                       
                    }
                    if (re_chance !== null) {
                        var re_chance = re_chance[1]
                    }
                    if (re_zag !== null) {
                        var re_zag = re_zag[1]

                    }
                    if (re_zag !== null) {
                        var re_zag1 = re_zag1[1]

                    }
                } //====================================================
                if (s_level > 0) {
                    if (s_level == 26) {
                        mdx2[ii].cells[1].innerHTML += "<b title='макс уровень шмотки - с камнем дряхлых кузнецов' class='iconsp item_smrock'></b><br>"
                        s_level = 0
                    } else {

                        mdx2[ii].cells[1].innerHTML += "<b title='уровень ковки шмотки' class='iconsp item_smith_3'></b><b>" + s_level + "</b><br>"
                        s_level = 0
                    }
                } else {
                    mdx2[ii].cells[1].innerHTML += "<br>";
                }

                if (re_chance > 0) {
                    //mdx2[ii].innerHTML+="<b>("+re_chance+"%)</b> "
                    mdx2[ii].cells[1].innerHTML += "<b title='шанс срабатівания'>" + re_chance + "%</b><br>";
                    re_chance = 0
                } else {
                    mdx2[ii].cells[1].innerHTML += "<br>"
                }

                if (re_zag > 0) {
                    mdx2[ii].cells[1].innerHTML += "<b title='уровень заговора' class='icon ico_magic" + re_zag1 + "'></b><b>" + re_zag + "</b>";
                    re_zag = 0
                } else {
                    mdx2[ii].cells[1].innerHTML += ""
                }

                if (re_R !== null) {
                    mdx2[ii].cells[1].innerHTML += re_R + "";
                    //mdx2[ii].innerHTML+=re_R;
                    re_R = null;
                } else {
                    mdx2[ii].cells[1].innerHTML += ""
                }

                if (options[15][1] == 1) {
                    if (document.URL.indexOf("/trade.php?m=old") > 0) {} else {
                        var idstr = mdx2[ii].cells[5].innerHTML
                       
                        var idstr2 = idstr.match(/;id=(\d*)/); // айди
                        
                        if (idstr2 !== null) {
                            mdx2[ii].cells[5].innerHTML += "<font color='blue'><b>" + idstr2[1] + "</b></font>"
                        }
                    }
                }


                //var idstr=mdx2[ii].Cells[3].innerHTML
                //alert(idstr)
                //idstr =  idstr.match(/id=(\d*)/); // level
                //alert(idstr)
                //mdx2[ii].Cells(4).innerHTML+=idstr[1]
            } //========================================================





        }
    }

    function sr_stat() { //добавляет подробную статистику  в тренажерній зал с рібками
        // Для того чтобы фокс увидел массив, объявленный в контексте документа, необходимо перед названием массива дописать unsafeWindow (unsafeWindow.prices).
        var brouser = (navigator.userAgent.toLowerCase().indexOf("opera") != -1);
        if (!opera) {
            if (unsafeWindow) {
                prices = unsafeWindow.prices;
            } else if (prices == undefined) {
                prices = window.prices;
            }

        }
        //=========================================
        var min_p = prices['power'][3]
        var min_b = prices['block'][3]
        var min_d = prices['dexterity'][3]
        var min_e = prices['endurance'][3]
        var min_c = prices['charisma'][3]

        var mx_p = prices['power'][4]
        var mx_b = prices['block'][4]
        var mx_d = prices['dexterity'][4]
        var mx_e = prices['endurance'][4]
        var mx_c = prices['charisma'][4]

        //chtlyb
        var Pmx_p = prices['power'][1]
        var Pmx_b = prices['block'][1]
        var Pmx_d = prices['dexterity'][1]
        var Pmx_e = prices['endurance'][1]
        var Pmx_c = prices['charisma'][1]


        var min_b_ras = (min_p * 1.5) + (min_b * 0.5) + (min_d * 0.25) + (min_e * 0.25) + min_c;
        var mx_b_ras = (mx_p * 1.5) + (mx_b * 0.5) + (mx_d * 0.25) + (mx_e * 0.25) + mx_c;
        set_cookie("min_b_ras", min_b_ras, 2012, 01, 15);
        set_cookie("mx_b_ras", mx_b_ras, 2012, 01, 15);



        var perec = perecath(Pmx_p, Pmx_b, Pmx_d, Pmx_e, Pmx_c, 0)
        //alert("перекач"+perecath);
        set_cookie("perec", perec, 2012, 01, 15); // сохранили свой перекач
        //=========================================
        var stt_m = razd_sum(stoim_stt(Pmx_p, Pmx_b, Pmx_d, Pmx_e, Pmx_c));
        var stt_mx = razd_sum(stoim_stt(mx_p, mx_b, mx_d, mx_e, mx_c));


        var spj = document.getElementById('b_help_35')
        var p1ost = ""
        p1ost += "<p>	Ваш уровень перекачаности  - <b>" + perec + " </b></p>";
        p1ost += "<p>Стоимость ваших статов - " + stt_m + "<b class='icon money1' title='Золото'></b></p>";
        p1ost += "<p>Стоимость МАКСИМАЛЬНЫХ статов - " + stt_mx + "<b class='icon money1' title='Золото'></b></p>";
        p1ost += "<table class='default left default_nobold' style='margin:0 auto;'>";
        p1ost += "<tr class='row_4 font_black'><td>статы</td><td>Минимальные статы <br>на уровне</td><td>Максимальные статы<br> на уровне</td></tr>";
        p1ost += "<tr class='row_5 font_black'><td><b class='icon ico_power' title='Сила'></b> Сила</td><td>" + min_p + "</td><td>" + mx_p + "</td></tr>";
        p1ost += "<tr class='row_5 font_black'><td><b class='icon ico_block' title='Защита'></b> Защита</td><td>" + min_b + "</td><td>" + mx_b + "</td></tr>";
        p1ost += "<tr class='row_5 font_black'><td><b class='icon ico_dexterity' title='Ловкость'></b> Ловкость</td><td>" + min_d + "</td><td>" + mx_d + "</td></tr>";
        p1ost += "<tr class='row_5 font_black'><td><b class='icon ico_endurance' title='Масса'></b> Масса</td><td>" + min_e + "</td><td>" + mx_e + "</td></tr>";
        p1ost += "<tr class='row_5 font_black'><td><b class='icon ico_charisma' title='Мастерство'></b> Мастерство</td><td>" + min_c + "</td><td>" + mx_c + "</td></tr>";
        p1ost += "</table>";

        spj.innerHTML = p1ost + spj.innerHTML;
    }

    function stoim_stt(Pmx_p, Pmx_b, Pmx_d, Pmx_e, Pmx_c) { //расчет стоимости статов
        var acum = 0,
            cnt;
        for (cnt = 1; cnt <= (Pmx_p - 5); cnt++)
        acum += Math.pow(cnt, 2.6);
        acum = Math.floor(acum);
        for (cnt = 1; cnt <= (Pmx_b - 5); cnt++)
        acum += Math.pow(cnt, 2.35);
        acum = Math.floor(acum);
        for (cnt = 1; cnt <= (Pmx_d - 5); cnt++)
        acum += Math.pow(cnt, 2.3);
        acum = Math.floor(acum);
        for (cnt = 1; cnt <= (Pmx_e - 5); cnt++)
        acum += Math.pow(cnt, 2.45);
        acum = Math.floor(acum);
        for (cnt = 1; cnt <= (Pmx_c - 4); cnt++)
        acum += Math.pow(cnt, 2.5);
        acum = Math.floor(acum);
        return acum;
    }

    function razd_sum(s_value) { // раздел сумм по 3 цифры
        s_value = s_value.toString(10);
        for (var rmx = s_value.length - 3; rmx > 0; rmx -= 3) {
            s_value = s_value.substring(0, rmx) + "." + s_value.substring(rmx, s_value.length);
        }
        return s_value
    }


    ////========================================================================================

    function perecath(Pmx_p, Pmx_b, Pmx_d, Pmx_e, Pmx_c, lvl) { // считаем перекач

        var min_b_ras = get_cookie('min_b_ras');
        var mx_b_ras = get_cookie('mx_b_ras');
        Pmx_b_ras = bal_raz(Pmx_p, Pmx_b, Pmx_d, Pmx_e, Pmx_c)

        if (options[27][1] == 1) {

            var mLVL = get_cookie('mlvl');

            //а=макс,ст/мЛВЛ      б=мЛВЛ-рЛВЛ   макс=макс-(а*б)========
            var a = parseInt(min_b_ras / mLVL)
            var b = mLVL - lvl
            min_b_ras = min_b_ras - (a * (mLVL - lvl))
            mx_b_ras = mx_b_ras - ((mx_b_ras / mLVL) * (mLVL - lvl))
        } //==================================================


        var perecath = (Pmx_b_ras - min_b_ras) / ((mx_b_ras - min_b_ras) / 100)
        perecath = parseInt(perecath * 10) / 100
        return perecath;
        //
    } //=================================================================================			

    function perec_perc() { // аддон преимущество %

        if (document.URL.indexOf("fight_log.php") > 0) {
            var rt = 1
            var xP = document.getElementsByClassName('playerStats')
            for (i = 0; i < xP.length; i++) { // 


                //alert(xP[i].rows[1].cells[1].innerHTML)

                var pSil = parseInt(xP[i].rows[2].cells[2].innerHTML) // сила
                var pZas = parseInt(xP[i].rows[3].cells[2].innerHTML) // защита
                var pLov = parseInt(xP[i].rows[4].cells[2].innerHTML) // ловка
                var pMas = parseInt(xP[i].rows[5].cells[2].innerHTML) // маса
                var pHar = parseInt(xP[i].rows[6].cells[2].innerHTML) // мастерство
                //alert(pSil+"/"+pZas+"/"+pLov+"/"+pMas+"/"+pHar)
                var per = bal_raz(pSil, pZas, pLov, pMas, pHar);
                //================так нада )))======
                //alert(per)
                if (rt == 1) {
                    var rt1 = per
                    rt = 0
                } else {
                    rt = per
                }
                //================
                bali_ras = get_cookie('bali_ras'); //ваши балы

                //alert(per)
                per = (bali_ras - per) / (bali_ras / 100)
                per = parseInt(per) //коректировка

                //<font color='red'><b>Ссылки:</b></font>Green<br>
                var col;
                if (per < 0) {
                    col = "red"
                } else {
                    col = "Green"
                    if (per == 0) {
                        col = "Blue"
                    }
                }

                xP[i].rows[1].cells[1].innerHTML = "Преим. (<font color='" + col + "'><b>" + per + " %</b></font>) /Уровень"
            }
            //===============================================================================================
            //alert(rt+"/"+rt1);
            if (options[30][1] == 1) {
                var a = (rt1 + rt) / 100
                rt1 = parseInt(rt1 / a)
                rt = parseInt(rt / a)
                //alert(rt+"/"+rt1);
                xP[0].rows[1].cells[1].innerHTML = "Шанс. (<font color='" + col + "'><b>" + rt1 + " %</b></font>) /Уровень"
                //

                xP[1].rows[1].cells[1].innerHTML = "Шанс. (<font color='" + col + "'><b>" + rt + " %</b></font>) /Уровень"
            }
            //===============================================================================================
        }
        if (document.URL.indexOf("monster.php?a=walking") > 0 || document.URL.indexOf("dozor.php?a=monster") > 0 || document.URL.indexOf("monster.php?a=search") > 0 || document.URL.indexOf("monster.php?a=working&") > 0) { // поиск страхов



            var xP = document.getElementsByClassName('skills h20 font_black')
            for (i = 0; i < xP.length; i++) { // чтоб небіло ошибки когда обана никого нема
                if (i == 0) {
                    var xP = document.getElementsByClassName('skills h20 font_black')[0]
                    //alert(xP.rows[0].cells[0].innerHTML)

                    var plvl = xP.rows[0].cells[2].innerHTML // лвл
                    var pSil = xP.rows[1].cells[3].innerHTML // сила
                    var pZas = xP.rows[2].cells[3].innerHTML // защита
                    var pLov = xP.rows[3].cells[3].innerHTML // ловка
                    var pMas = xP.rows[4].cells[3].innerHTML // маса
                    var pHar = xP.rows[5].cells[3].innerHTML // мастерство
                    //get_cookie ( 'bali_ras_S' );//балы шмота
                    //new!!!!!!



                    //=====================

                    var prk = perecath(pSil, pZas, pLov, pMas, pHar - get_cookie('bali_ras_S'), 0)

                    var prk2 = perec = get_cookie('perec'); // свой перек

                    if (prk2 + 1 < prk) {
                        col = "red"
                    } else {
                        col = "Blue"
                        if (prk2 - 1 > prk) {
                            col = "Green"
                        }
                    }
                    //========================= 

                    plvl = xP.rows[0].cells[3].innerHTML = "<a href='/training.php?a=harbour'>Кач.<font color='" + col + "'></b></font>" + prk + "</b></a>"; //кач страхов - отнять % шмота

                    // ==================% преимущества в статах страха
                    var per = bal_raz(pSil, pZas, pLov, pMas, pHar);

                    bali_ras = get_cookie('bali_ras'); //ваши балы
                    per = (bali_ras - per) / (bali_ras / 100)

                    per = parseInt(per) //коректировка
                    var col;
                    if (per < 0) {
                        col = "red"
                    } else {
                        col = "Green"
                        if (per == 0) {
                            col = "Blue"
                        }
                    }

                    xP.rows[0].cells[2].innerHTML += " Ваше преим. (<font color='" + col + "'><b>" + per + " %</b></font>) "
                    //========================================
                }
            }
        }
    }

    function bal_raz(Pmx_p, Pmx_b, Pmx_d, Pmx_e, Pmx_c) { // балы расщепа
        var Pmx_b_ras = (parseInt(Pmx_p) * 1.5) + (parseInt(Pmx_b) * 0.5) + (parseInt(Pmx_d) * 0.25) + (parseInt(Pmx_e) * 0.25) + parseInt(Pmx_c); // расчитываемые статы
        return Pmx_b_ras;
    }
    //////////////////////////////////////////////////////////////////////////////////

    function f_zagovor() { // аддон заговоры//////////////////////////////////////////
        if (document.URL.indexOf("smith.php?a=ownshaman") > 0) {
            var shaman = document.getElementById('body');
            var shamanR = shaman.getElementsByClassName('default shaman_rocks')[0];
            var runes = new Array();
            var zagovor = new Array();
            var summa = 0
            for (var i = 0; i < 8; i++) {
                runes[i] = parseInt(shamanR.rows[1].cells[i].innerHTML)
                summa += runes[i]
            }
            var k = new Array();
            k[1] = [0, 6];
            k[2] = [0, 1];
            k[3] = [0, 2];
            k[4] = [0, 4];
            k[5] = [0, 5];
            k[6] = [6, 1];
            k[7] = [6, 2];
            k[8] = [6, 4];
            k[9] = [6, 5];
            k[10] = [2, 1];
            k[11] = [2, 4];
            k[12] = [2, 5];
            k[13] = [1, 4];
            k[14] = [1, 5];
            k[15] = [4, 5];
            k[16] = [0, 3];
            k[17] = [6, 3];
            k[18] = [1, 3];
            k[19] = [2, 3];
            k[20] = [4, 3];
            k[21] = [5, 3];
            k[22] = [0, 7];
            k[23] = [6, 7];
            k[24] = [1, 7];
            k[25] = [2, 7];
            var zag = "n"
            for (var i = 1; i < 26; i++) {
                if (runes[k[i][0]] < runes[k[i][1]]) {
                    zagovor[i] = runes[k[i][0]]
                } else {
                    zagovor[i] = runes[k[i][1]]
                }
                if (summa - (zagovor[i] * 2) < zagovor[i]) {
                    zagovor[i] = summa
                }
                zag += zagovor[i]
                if (zagovor[i] > 0) {
                    zagovor[i] = "<font color='red'>" + zagovor[i] + "</font>";
                }
                zagovor[i] = "<b>" + zagovor[i] + " </b>";

            }

            set_cookie("zagovor", zag, 2012, 01, 15);

            var shamanBox = shaman.getElementsByClassName('grbody')[0];

            var p1ost = shamanbox1(zagovor)

            shamanBox.innerHTML += p1ost;

        }
    }
    //=================================================

    function b_healt() { // здоровье в КВ
        var HP = document.getElementById('char');
        //alert(HP.innerHTML)
        HP = HP.getAttribute('onmouseover');
        var hp_lvl = HP.match(/now:\|(\d*)\|/); // ур здоровья
        var dgv8433 = document.createElement('DIV');
        dgv8433.id = "ntf_al_98";
        dgv8433 = document.body.appendChild(dgv8433);
        document.onmousemove = function (e) {
            var mCur = mousePageXY(e);
            // alert(mCur.x)
            var rer = "<div  id=\x22hpp54623\x22 style=\x22position:absolute;z-index:2;left:" + (20 + mCur.x) + "px;top:" + mCur.y + "px;\x22><font color='red'><b>" + hp_lvl[1] + "</b></font></div>";
            dgv8433.innerHTML = rer
            rer = null
        };
    }

    function mousePageXY(e) { // получить координаты мышки 
        var x = 0,
            y = 0;

        if (!e) e = window.event;

        if (e.pageX || e.pageY) {
            x = e.pageX;
            y = e.pageY;
        } else if (e.clientX || e.clientY) {
            x = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft;
            y = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop;
        }
        return {
            "x": x,
            "y": y
        };
    }

    function zakaznik_upd() { // аддон заказник (только для кузь)
        var zagovor = new Array();
        if (document.URL.indexOf("/smith.php?a=orders") > 0) {
            zag = get_cookie('zagovor');

            if (zag !== null) {
                for (var i = 1; i < 26; i++) {
                    zagovor[i] = parseInt(zag.substr(i, 1));
                    if (zagovor[i] > 0) {
                        zagovor[i] = "<font color='red'>" + zagovor[i] + "</font>";
                    }
                    zagovor[i] = "<b>" + zagovor[i] + " </b>";
                }

                var shamanBox = document.getElementById('b_help_23');
                var p1ost = shamanbox1(zagovor)
                shamanBox.innerHTML = p1ost + "<a  onclick='zakaznik_upd()'>Пересчитать заказы</a>";



            }
            //=============================================================================== 
            var zak = document.getElementById('orders');




            tabl1 = zak.getElementsByClassName('default center')[0]
            row0 = tabl1.rows[0];

            var td = row0.insertCell(-1).innerHTML = "<th width='70'>&#160;апов&#160;</th>";
            td = row0.insertCell(-1).innerHTML = "<th width='70'>&#160;&#160;&#160;Цена&#160;апа&#160;&#160;&#160;</th>";

            for (i = 1; i < tabl1.rows.length; i++) { // обход по строкам
                tabl1.rows[i].ClassName = "row_5 font_black";
                //////////////ячейка 0 class="row_5 font_black"
                mdx2 = tabl1.rows[i].cells[0]
                var mdx = mdx2.getElementsByTagName("IMG")[0];
                if (mdx.getAttribute('onmouseover') !== null) {
                    var str = mdx.getAttribute('onmouseover')
                    var ur_kov = str.match(/level:\|(\d*)\|/); // ур прокачки
                    var ur_zag = str.match(/Постоянный\sзаговор\s.*\s(\d*)\sуровня/); // ур заговора
                    if (ur_kov !== null) {
                        ur_kov = parseInt(ur_kov[1])
                    } else {
                        ur_kov = 0
                    } //ур ковки		
                    if (ur_zag !== null) {
                        ur_zag = parseInt(ur_zag[1])
                    } else {
                        ur_zag = 0
                    } //ур заговора
                }
                //===============ячейка 2=================================
                var ikon
                str = tabl1.rows[i].cells[2].innerHTML
                var ur_kov2 = str.match(/\+(\d*)\%/); // ур прокачки
                if (ur_kov2 !== null) {
                    var nada = (parseInt(ur_kov2[1]) - ur_kov) / 5
                    if (ur_kov2[1] == 25) {
                        ikon = "<b class='iconsp item_smrock'></b>"
                    } else {
                        ikon = "<b class='iconsp item_smith_3'></b>"
                    }
                } else {
                    var ur_zag2 = str.match(/\+(\d*)\s/); // ур заговора
                    if (ur_zag2 !== null) {
                        var nada = parseInt(ur_zag2[1]) - ur_zag
                        ikon = "<b class='iconsp sm_rock1'></b>"

                    }
                }
                //===================яччейка3====================================================
                str = tabl1.rows[i].cells[3].getElementsByClassName('price_num')[0]
                var str2 = tabl1.rows[i].cells[3].innerHTML


                var cena = str.innerHTML

                var cena2 = str2.match(/money(\d)/); // цена
                //  <span class="price_num">27000</span> <b class="icon money1" title="Золото"></b>	

                var money = cena2[1];
                // cena=parseInt(cena);
                //alert(cena)
                //=========================================================================		

                cena = parseInt(cena / nada);

                var colred = "";
                if (ikon == "<b class='iconsp item_smrock'></b>") {
                    if (cena > options[40][1]) {
                        colred = "color='red'";
                    }
                } //Камrazd_sum(

                if (ikon == "<b class='iconsp sm_rock1'></b>") { //
                    if (cena > options[41][1]) {
                        colred = "color='red'";
                    }
                } //Шам

                if (ikon == "<b class='iconsp item_smith_3'></b>") { //ковка
                    if (cena > options[42][1]) {
                        colred = "color='red'";
                    }
                } //	КУз	
                td = tabl1.rows[i].insertCell(-1).innerHTML = "<b>" + nada + " </b>" + ikon; // создать ячейку
                td = tabl1.rows[i].insertCell(-1).innerHTML = "<font " + colred + ">" + razd_sum(cena) + "</font><b class='icon money" + money + "' ></b>"; // создать ячейку

            } // обход по строкам // конец






        }
        //===============================





    }

    function kParam() { //определение числа к
        // определить число к
        try {
            var set_kParam = document.getElementsByTagName("script")[0].innerHTML.match(/var\sKEY=(\d*)/)[1];
        } catch (e) {}
		//alert(set_kParam === undefined)
		if(set_kParam === undefined){
		//alert(set_kParam)
		set_kParam=999999999
		}else{
        localStorage.setItem('kParam', set_kParam);
		
        //alert(set_kParam+"t*******************t")
        //alert(localStorage.getItem('kParam'))
      	}
		  return set_kParam
    }



    function shamanbox1(zagovor) { // shamanbox
        var p1ost = ""
        p1ost += "<table class='default left default_nobold' style='margin:0 auto;'>";
        p1ost += "<tr class='row_4 font_black'><td> <b>Возможные<br> заговоры</b></td><td><b>(кликабельно)</b></td><td></td><td></td><td><b>скрипт <br><a href='http://g1.botva.ru/player.php?id=419006'  title='кую, шаманю, щеплю'>(c)Razorback</a></b></td></tr>";
        p1ost += "<tr class='row_5 font_black'>";
        p1ost += "<td> " + zagovor[1] + " <a href='/smith.php?a=ownshaman&magic=101'  title='Характеристики зверушки становятся в 2 раза больше.'><b class='icon ico_magic101'></b>Озверин</a></td>";
        p1ost += "<td>" + zagovor[2] + "<a href='/smith.php?a=ownshaman&magic=102'  title='Блокирует возможность участия магических зверушек в бою.'><b class='icon ico_magic102'></b>Кышатсюда</a></td>";
        p1ost += "<td> " + zagovor[3] + " <a href='/smith.php?a=ownshaman&magic=103'  title='Весь урон, который вы наносите, переносится на зверушку противника.'><b class='icon ico_magic103'></b>Живодер</a></td>";
        p1ost += "<td> " + zagovor[4] + "  <a href='/smith.php?a=ownshaman&magic=104'  title='Урон, нанесенный одноручным оружием, уменьшается на 15%.'><b class='icon ico_magic104'></b>Мега-щит</a></td>";
        p1ost += "<td> " + zagovor[5] + " <a href='/smith.php?a=ownshaman&magic=105'  title='Урон, нанесенный двуручным оружием, уменьшается на 15%.'><b class='icon ico_magic105'></b>Чудо-щит</a></td>";
        p1ost += "</tr>";
        p1ost += "<tr class='row_5 font_black'>";
        p1ost += "<td><b>" + zagovor[6] + " </b><a href='/smith.php?a=ownshaman&magic=106'  title='В течение 30 минут напавший противник не может пользоваться бодалкой.'><b class='icon ico_magic106'></b>Оглушка</a></td>";
        p1ost += "<td><b>" + zagovor[7] + " </b><a href='/smith.php?a=ownshaman&magic=107'  title='Враг, на которого вы напали, не может напасть на вас в течение 6 часов.'><b class='icon ico_magic107'></b>Отвратка</a></td>";
        p1ost += "<td><b>" + zagovor[8] + " </b><a href='/smith.php?a=ownshaman&magic=108'  title='Шаманский заговор при наложении на вашу вещь блокирует заговор противника, наложенный на вещи противника того же типа (шлем, доспех, оружие).'><b class='icon ico_magic108'></b>Антизаговорка</a></td>";
        p1ost += "<td><b>" + zagovor[9] + " </b><a href='/smith.php?a=ownshaman&magic=109'  title='Заговор накладывается на хозяина зверушки. Регенерация любой его зверушки на 180 минут увеличивается в 5 раз, но начинает действовать в обратную сторону, отнимая жизненную силу текущей зверушки .Эффект работает только при нападении на вас.'><b class='icon ico_magic109'></b>М-Отравка</a></td>";
        p1ost += "<td>" + zagovor[10] + "<a href='/smith.php?a=ownshaman&magic=110'  title='В бою вы забираете бутылку «Красный диавол» из сумки противника, если она у него имеется. Даже в случае проигрыша.'><b class='icon ico_magic110'></b>Свистелка</a></td>";
        p1ost += "</tr>";
        p1ost += "<tr class='row_5 font_black'>";
        p1ost += "<td>" + zagovor[11] + "<a href='/smith.php?a=ownshaman&magic=111'  title='Антиобидчик При нападении на вас противника на 3 уровня больше отменяется действие его кулона. В случае победы вы забираете 100% его золота, не положенного в сейф.'><b class='icon ico_magic111'></b>Антиоб.</a></td>";
        p1ost += "<td><a href='/smith.php?a=ownshaman&magic=112'  title='Половину урона, нанесенного хозяину, зверушка принимает на себя и этот урон не учитывается при подведении итогов боя.'>" + zagovor[12] + "<b class='icon ico_magic112'></b>Преданность</a></td>";
        p1ost += "<td>" + zagovor[13] + "<a href='/smith.php?a=ownshaman&magic=113'  title='По окончанию похода в дозор вы восстанавливаете затраченное время.'><b class='icon ico_magic113'></b>О-Дозорный</a></td>";
        p1ost += "<td>" + zagovor[14] + "<a href='/smith.php?a=ownshaman&magic=114'  title='По окончанию работы на ферме вы получаете двойную зарплату с учетом работы кулонов.'><b class='icon ico_magic114'></b>Т-Фермер</a></td>";
        p1ost += "<td>" + zagovor[15] + "<a href='/smith.php?a=ownshaman&magic=115'  title='При работе в карьере время добычи кристалла увеличивается до 60 минут, при этом в случае удачной добычи вы получите от 3х до 9 кристаллов одновременно.'><b class='icon ico_magic115'></b>У-Шахтер</a></td>";
        p1ost += "</tr>";
        p1ost += "<tr class='row_5 font_black'>";
        p1ost += "<td>" + zagovor[16] + "<a href='/smith.php?a=ownshaman&magic=116'  title='Снижает урон лучников клана противника по вам на 20%.'><b class='icon ico_magic116'></b>Уклонение</a></td>";
        p1ost += "<td>" + zagovor[17] + "<a href='/smith.php?a=ownshaman&magic=117'  title='+10% параметра «сила», +10% параметра «мастерство». Во время действия заговора в случае проигрыша вы теряете всё золото вне сейфа.'><b class='icon ico_magic117'></b>Берсерк</a></td>";
        p1ost += "<td>" + zagovor[18] + "<a href='/smith.php?a=ownshaman&magic=118'  title='Возможность заразить противника болезнью золотая чума, при которой в течение 8 часов противник теряет 10% от количества золота вне своего сейфа, 5% с которых начисляется вам. <br>Эффект работает только при нападении на вас'><b class='icon ico_magic118'></b>Золотая Чума</a></td>";
        p1ost += "<td>" + zagovor[19] + "<a href='/smith.php?a=ownshaman&magic=119'  title='На малой поляне 1 спрятанный кристалл становятся очищенными.'><b class='icon ico_magic119'></b>Смесец</a></td>";
        p1ost += "<td>" + zagovor[20] + "<a href='/smith.php?a=ownshaman&magic=120'  title='На большой поляне 4 спрятанных кристалла становятся очищенными.'><b class='icon ico_magic120'></b>Большой смесец</a></td>";
        p1ost += "</tr>";
        p1ost += "<tr class='row_5 font_black'>";
        p1ost += "<td>" + zagovor[21] + "<a href='/smith.php?a=ownshaman&magic=121'  title='При нокауте во время штурма или защиты замка срабатывает эффект «Крыльчатка».'><b class='icon ico_magic121'></b>Нашатырь</a></td>";
        p1ost += "<td>" + zagovor[22] + "<a href='/smith.php?a=ownshaman&magic=122'  title='Напавший противник может пользоваться бодалкой только раз в 15 минут. Время действия эффекта равно времени действия заговора.'><b class='icon ico_magic122'></b>Антикрут</a></td>";
        p1ost += "<td>" + zagovor[23] + "<a href='/smith.php?a=ownshaman&magic=123'  title='Титан Позволяет надевать вещи +2 уровня.'><b class='icon ico_magic123'></b>Титан</a></td>";
        p1ost += "<td>" + zagovor[24] + "<a href='/smith.php?a=ownshaman&magic=124'  title='В случае, если у противника отрицательная боевая слава, а у вас положительная, берется разница между вашей и его боевой славой, и полученное число распределяется случайным образом между характеристиками вашего персонажа.'><b class='icon ico_magic124'></b>Чистое сердце</a></td>";
        p1ost += "<td>" + zagovor[25] + "<a href='/smith.php?a=ownshaman&magic=125'  title='Позволяет атаковать персонажей вне диапазона атаки. Деньги при этом с них не получаешь, как и кристаллы.'><b class='icon ico_magic125'></b>Месть</a></td>";
        p1ost += "</tr>";

        p1ost += "</table>";
        return p1ost;
    }

    //===================

    function getXmlHttp() { // надо под другие броузері доделать

        var xmlhttp;
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
                xmlhttp = false;
            }
        }
        if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
            xmlhttp = new XMLHttpRequest();
        }
        return xmlhttp;
    }

    function post(value, action, funk, tru) { // пост запрос

        //alert(value)
        mess() // подождите сообщение
        var xmlhttp = getXmlHttp()
        xmlhttp.open("POST", action, true);

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState != 4) return
            clearTimeout(timeout) // очистить таймаут при наступлении readyState 4
            if (xmlhttp.status == 200) {
                // Все ок
                if (xmlhttp.responseText.indexOf(tru) > 0) {
                    setTimeout(function () {
                        window.location.reload()
                    }, 800)

                    document.getElementById('mess').style.display = "none";
                    //alert(funk);

                } else {
                    setTimeout(function () {
                        window.location = window.location;
                    }, 800)

                    //alert(xmlhttp.responseText);
                }

            } else {
                handleError(xmlhttp.statusText) // вызвать обработчик ошибки с текстом ответа
            }
        }
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xmlhttp.send(value);

        // Таймаут 10 секунд
        var timeout = setTimeout(function () {
            xmlhttp.abort();
            handleError("Time over")
        }, 10000);

        function handleError(message) {
            // обработчик ошибки
            alert("Ошибка: " + message)


        }
    }

    function mess() { // Подождите

        if (!opera) {
            var dgv2057 = document.createElement('DIV'); //===================сообщение ожидание
            dgv2057.id = "mess";
            dgv2057.style.backgroundColor = "rgb(220,204,174)";
            dgv2057.style.width = "60px";
            dgv2057 = document.body.appendChild(dgv2057);

        } else {
            var dgv2057 = document.createElement('DIV'); //===================сообщение ожидание
            dgv2057.id = "mess";
            dgv2057.style.backgroundColor = "rgb(220,204,174)";
            dgv2057.style.width = "60px";
            dgv2057 = document.body.appendChild(dgv2057);

            document.onmousemove = function (e) {
                var mCur = mousePageXY(e);
                // alert(mCur.x)
                var rer = "<div  id=\x22hpp54623\x22 style=\x22position:absolute;backgroundColor = 'rgb(0,0,0)'; z-index:2;left:" + (20 + mCur.x) + "px;top:" + mCur.y + "px;\x22><font color='red'><b>Подождите...</b></font></div>";
                dgv2057.innerHTML = rer
                rer = null
            };
        }
    }

    function get(action, tru, funk, funk2) { // get запрос
        mess() // подождите сообщение
        var xmlhttp = getXmlHttp()
        xmlhttp.open('GET', action, true);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    //alert(xmlhttp.responseText);


                    if (xmlhttp.responseText.indexOf(tru) > 0) {
                        alert(funk);
                    } else {
                        alert(funk2);
                    }
                    document.getElementById('mess').style.display = "none";

                }
            }
        };
        xmlhttp.send(null);

    }


    function krutoj() { // проверка на крутого
        if (document.URL.indexOf("player.php?id=") > 0) {

            get(location + "&show=gifts", "Коллекция доступна только для крутых!", "Неа, не крутой -в смятку ;)", "Крутой!!!, как яйца ")

        }
    }

    function informers() { //таймеры  
        
		
		
		//*******************jобновление заказника в кузне
		  if (document.URL.indexOf("/smith.php?a=orders") > 0) {
		  //alert(document.getElementById('body').innerHTML)
		  if (document.getElementById('body').innerHTML.indexOf("апов") > 0) {	  
		  	
		  }else{	zakaznik_upd()  
		  }	  }
		
		
		
		
		//================скрывать значки продвинутой панели по таймеру

        //ресурсы
        var resurs481 = document.getElementsByClassName('resources')[0]
        resurs481 = resurs481.getElementsByTagName('li')
        for (i = 0; i < resurs481.length; i++) { //*********
            //var KOLres2020=resurs481[i].getElementsByTagName('span')[0].innerHTML // колич
            var bRES = resurs481[i].getElementsByTagName('b')[0].attributes[0].value // иконка
            var KOLres2020 = parseInt(resurs481[i].innerText)
            //alert(KOLres2020+"**-**"+bRES)

            if (bRES.indexOf("item_3") > 0 && KOLres2020 < 1) { // КД
                document.getElementById('item_377').style.display = "";
            }
            if (bRES.indexOf("item_13") <= 0 && bRES.indexOf("item_1") > 0 && KOLres2020 < 1) { // зеленка

                document.getElementById('item_177').style.display = "";
            }
            if (bRES.indexOf("item_132") > 0 && KOLres2020 < 1) { // ЖД

                document.getElementById('item_13277').style.display = "";
            }
            if (bRES.indexOf("item_130") > 0 && KOLres2020 < 1) { // бутілочка

                document.getElementById('item_13077').style.display = "";
            }
            if (bRES.indexOf("item_131") > 0 && KOLres2020 < 1) { // пузірь

                document.getElementById('item_13177').style.display = "";
            }

            if (bRES.indexOf("item_2") > 0 && KOLres2020 < 1) { // синька
                document.getElementById('item_277').style.display = "";
            }
            if (bRES.indexOf("ico_ticket1") > 0 && KOLres2020 > 0) { // мбп
                document.getElementById('ico_ticket177').style.display = "";
            }
			 if (bRES.indexOf("ico_ticket2") > 0 && KOLres2020 > 0) { // ББП
                document.getElementById('ico_ticket277').style.display = "";
				localStorage.setItem("bbp",1)
            }
            if (bRES.indexOf("harbour_3") > 0 && KOLres2020 < 1) { // кораблик
                document.getElementById('harbour_377').style.display = "";
            }
            if (bRES.indexOf("item_mine_1") > 0 && KOLres2020 < 1) { // кирка
                document.getElementById('item_mine_177').style.display = "";
                if (options[13][1] == 0) { // если шахтер
                    document.getElementById('item_mine_1772').style.display = "";
                }
            }

            if (bRES.indexOf("item_mine_2") > 0 && KOLres2020 < 1) { // очки
                if (options[13][1] == 0) { // если шахтер
                    document.getElementById('item_mine_2772').style.display = "";
                }
                document.getElementById('item_mine_277').style.display = "";
            }
            if (bRES.indexOf("item_mine_3") > 0 && KOLres2020 < 1) { // каска
                if (options[13][1] == 0) { // если шахтер
                    document.getElementById('item_mine_3772').style.display = "";
                }
                document.getElementById('item_mine_377').style.display = "";
            }
        } /////////////////////

        // счетчики
        var time481 = document.getElementsByClassName('counters')[0]
        time481 = time481.getElementsByTagName('li')
        for (i = 0; i < time481.length; i++) { //*********
            var span458 = time481[i].getElementsByTagName('span')[0].innerHTML // время
            var b458 = time481[i].getElementsByTagName('b')[0].attributes[0].value //иконка
            //alert(b458)  -- ссылка иконки
            if ((span458 == "00:00:00") || (span458 == "00:00:00:00")) {

                if (b458.indexOf("item_smith_5") > 0) { // консервация
                    document.getElementById('item_smith_577').style.display = "";
                }
                if (b458.indexOf("item_smith_2") > 0) { // плавка
                    document.getElementById('item_smith_277').style.display = "";
                }
                if (b458.indexOf("item_smith_1") > 0) { // иглы
                    document.getElementById('item_smith_177').style.display = "";
                }

                if (b458.indexOf("ico_dungeon") > 0) { // подземка
                    document.getElementById('ico_dungeon77').style.display = "";
                }

                if (b458.indexOf("harbour") > 0) { // пирашки
                    document.getElementById('fishes77').style.display = "";
                }

                if (b458.indexOf("ico_axe") > 0) { // акс
                    document.getElementById('ico_axe77').style.display = "";
                }

                if (b458.indexOf("ico_farm") > 0) { // ферма
                    document.getElementById('ico_farm77').style.display = "";
                }
            }
        } //***********
    }

    function pet() { //
        ////в клетку========================
        if (options[11][1] == 1) {
            // зверь в клетку//====================================
            if (document.getElementById('pet')) {
                document.getElementById('pet').addEventListener('click', function (e) {
                    e.preventDefault();
                    //пример пост запроса
                    //post(значение,ссылка,сообщение при успехе);
                    //post("cmd=cage&k="+ set_kParam,"house.php?info=cage","текст");
                    post("cmd=cage&k=" + set_kParam, "house.php?info=cage", "животное в клетке", "Ваша зверушка находится в");
                    //document.getElementById('pet').style.display = "none";
                }, false);
                //віпустить зверя//====================================

            } else {
                var rrr = document.getElementById('char')
                rrr.getElementsByTagName('b')[0].addEventListener('click', function (e) {
                    e.preventDefault();
                    post("cmd=uncage&k=" + set_kParam, "house.php?info=cage", "животное на воле", "Против зверушек");
                }, false);
            }
        }
    }

    function stabspisok() { //


        // ,бістріе списки
        if (options[23][1] == 1) {
            //////////////////////////////////////////

            var s_nick = "";




            if (!opera) {
                var but = '<br/><table><tr><td style="border:1px double #ad5b3f; background-color:#dfd0a8; color:#583d27; height:15px; ' + 'padding-top:1; margin:0 5 5 0; text-decoration: none; cursor:pointer" id="add_1">&nbsp;Список грабежа&nbsp;</td>' + '<td style="border:1px double #ad5b3f; background-color:#dfd0a8; color:#583d27; height:15px; ' + 'padding-top:1; margin:0 5 5 0; text-decoration: none; cursor:pointer" id="add_2">&nbsp;для кри&nbsp;</td>' + '<td style="border:1px double #ad5b3f; background-color:#dfd0a8; color:#583d27; height:15px; ' + 'padding-top:1; margin:0 5 5 0; text-decoration: none; cursor:pointer" id="add_3">&nbsp;Список славы&nbsp;</td>' + '<td style="border:1px double #ad5b3f; background-color:#dfd0a8; color:#583d27; height:15px; ' + 'padding-top:1; margin:0 5 5 0; text-decoration: none; cursor:pointer" id="add_4">&nbsp;Список мести&nbsp;</td>' + '<td style="border:1px double #ad5b3f; background-color:#dfd0a8; color:#583d27; height:15px; ' + 'padding-top:1; margin:0 5 5 0; text-decoration: none; cursor:pointer" id="add_5">&nbsp;Белый список&nbsp;</td></tr></table><br/>';
            } else {
                var but = '<br/><button style="border:1px double #ad5b3f; background-color:#dfd0a8; font:bolder 8pt; color:#583d27; height:15px; ' + 'padding-top:1; margin:0 5 5 0" onclick="javascript:sp_start(0)">Список грабежа</button>' + '<button style="border:1px double #ad5b3f; background-color:#dfd0a8; font:bolder 8pt; color:#583d27; height:15px; ' + 'padding-top:1; margin:0 5 5 0" onclick="javascript:sp_start(1)">для кри</button>' + '<button style="border:1px double #ad5b3f; background-color:#dfd0a8; font:bolder 8pt; color:#583d27; height:15px; ' + 'padding-top:1; margin:0 5 5 0" onclick="javascript:sp_start(2)">Список славы</button>' + '<button style="border:1px double #ad5b3f; background-color:#dfd0a8; font:bolder 8pt; color:#583d27; height:15px; ' + 'padding-top:1; margin:0 5 5 0" onclick="javascript:sp_start(3)">Список мести</button>' + '<button style="border:1px double #ad5b3f; background-color:#dfd0a8; font:bolder 8pt; color:#583d27; height:15px; ' + 'padding-top:1; margin:0 5 5 0" onclick="javascript:sp_start(4)">Белый список</button><br/>';
            }
            ///////////////////////////////////////////////



            //


            if (document.URL.indexOf("fight_log.php") > 0) {
                if (document.getElementsByClassName('profile')[0].innerHTML == options[44][1]) {
                    s_nick = document.getElementsByClassName('profile')[1].innerHTML
                } else {
                    s_nick = document.getElementsByClassName('profile')[0].innerHTML;
                }
                document.getElementsByClassName('grbody')[4].innerHTML = but + document.getElementsByClassName('grbody')[4].innerHTML
            }
            if (document.URL.indexOf("player.php?id=") > 0) {
                if (document.getElementsByClassName('blockTitle ')[0].innerHTML == options[44][1]) {
                    s_nick = "";
                } else {
                    s_nick = document.getElementsByClassName('blockTitle ')[0].innerHTML;
                }
                if (s_nick !== "") document.getElementsByClassName('grbody')[1].innerHTML = document.getElementsByClassName('grbody')[1].innerHTML + but;
            }
            if ((document.URL.indexOf("dozor.php") > 0) && (document.getElementsByClassName('attack')[0] !== undefined)) {

                if (document.getElementsByClassName('blockTitle2 ') > 0) {
                    if (document.getElementsByClassName('blockTitle2 ')[0].innerHTML == options[44][1]) {
                        s_nick = "";
                    } else {
                        s_nick = document.getElementsByClassName('blockTitle2 ')[0].innerHTML;
                    }
                    if (s_nick !== "") {
                        var ell = document.getElementsByClassName('text_main_5')[0];
                        ell.innerHTML = ell.innerHTML + but;
                    }
                }
            }


            if (document.URL.indexOf("shtab.php?m=notes") > 0) {
                setTimeout(sp_set, 800);
            }


            if (!opera) {
                document.getElementById('add_1').addEventListener('click', function (e) {
                    setCookie("sp_nick", "0" + s_nick);
                    window.location = "http://" + window.location.hostname + "/shtab.php?m=notes"
                }, true);
                document.getElementById('add_2').addEventListener('click', function (e) {
                    setCookie("sp_nick", "1" + s_nick);
                    window.location = "http://" + window.location.hostname + "/shtab.php?m=notes"
                }, true);
                document.getElementById('add_3').addEventListener('click', function (e) {
                    setCookie("sp_nick", "2" + s_nick);
                    window.location = "http://" + window.location.hostname + "/shtab.php?m=notes"
                }, true);
                document.getElementById('add_4').addEventListener('click', function (e) {
                    setCookie("sp_nick", "3" + s_nick);
                    window.location = "http://" + window.location.hostname + "/shtab.php?m=notes"
                }, true);
            } else {
                function sp_start(sp) {
                    setCookie("sp_nick", sp + s_nick);
                    window.location = "http://" + window.location.hostname + "/shtab.php?m=notes"
                }
            }

        }
        //--------------------
    }

    function sp_start(sp) {
        setCookie("sp_nick", sp + s_nick);
        window.location = "http://" + window.location.hostname + "/shtab.php?m=notes"
    }


    function sumka() { // аддон сумка
        var trade = 0
        var fast_trade = 0
        var bid_type = 0
        var bid_start = 0
        var bid_step = 0
        var fast_type = 0
        var fast_price = 0
        var incognito = 0


        if (document.URL.indexOf("/trade.php?m=add2") > 0) { // считіваем цену
            var btn2314 = (document.getElementById('trade_conf'))
            btn2314.addEventListener('click', function (e) {
                e.preventDefault();
                //pipip()
                //віставить аукцион
                var N_trade = "n"
                trade = document.getElementsByName('trade')[0].checked
                fast_trade = document.getElementsByName('fast_trade')[0].checked
                bid_type = document.getElementsByName('bid_type')[0].value
                bid_start = document.getElementsByName('bid_start')[0].value
                bid_step = document.getElementsByName('bid_step')[0].value
                fast_type = document.getElementsByName('fast_type')[0].value
                fast_price = document.getElementsByName('fast_price')[0].value
                incognito = document.getElementsByName('incognito')[0].checked
                N_trade += ";" + trade + ";" + fast_trade + ";" + bid_type + ";" + bid_start + ";" + bid_step + ";" + fast_type + ";" + fast_price + ";" + incognito
                //alert(N_trade)
                set_cookie("N_trade", N_trade, 2012, 01, 15);
                document.getElementsByTagName("form")[0].submit()

            }, false);
        }
        //================================================================================================		
        if (document.URL.indexOf("/trade.php?m=add") > 0 || document.URL.indexOf("trade.php?frombag=") > 0 || document.URL.indexOf("trade.php?tobag=") > 0) { //  сумка 


            var N_trade1 = get_cookie('N_trade');
            //alert(N_trade1)

            if (N_trade1 != null) {

                var arr = N_trade1.split(';');
                trade = arr[1]
                fast_trade = arr[2]
                bid_type = arr[3]
                bid_start = arr[4]
                bid_step = arr[5]
                fast_type = arr[6]
                fast_price = arr[7]
                incognito = arr[8]
                try {
                    var tab41 = document.getElementsByClassName('default padding5')[0]
                } catch (e) {

                }
                var statist = ""
                statist += "<tbody>"
                if (trade == 'true') {

                    statist += "<tr class='row_1'><th colspan='2'> Последняя продажа	</th></tr>";

                    statist += "<tr><td class='left'>ставка	<td>" + bid_start
                    if (bid_type == 1) {
                        statist += "<b class='icon money1' title='Золото'></b>"
                    } else {
                        statist += "<b class='icon money2' title='Кристаллы'></b>"
                    }

                }
                if (fast_trade == 'true') {
                    statist += "<tr><td class='left'>Сумма<td> " + fast_price
                    if (fast_type == 1) {
                        statist += "<b class='icon money1' title='Золото'></b>"
                    } else {
                        statist += "<b class='icon money2' title='Кристаллы'></b>"
                    }

                }
                statist += "<tr><td class='left'>Инкогнито<td>" + incognito
                statist += "</tbody>"

                tab41.innerHTML = statist + tab41.innerHTML

            }


            //===============================================================================	
            var sumka3 = document.getElementsByClassName('trade_items bags bag_3')[0]

            for (ki = 1; ki < 9; ki += 3) {
                for (i = 1; i < 5; i++) {
                    var imgS = sumka3.rows[ki].cells[i * 2 - 1]
                    var btnS = sumka3.rows[ki + 1].cells[i - 1]

                    if (btnS.getElementsByTagName('a')[0]) {
                        var btnS2 = btnS.getElementsByTagName('a')[0].attributes[0].value
                        imgS.innerHTML = "<a href='" + btnS2 + "'>" + imgS.innerHTML + "</a>" //ccылки на картинку

                        var param = ""

                        var idstr22 = btnS2.match(/frombag=(\d*)/); // айди
                        idstr22 = idstr22[1]

                        var trade1 = ""
                        var fast_trade1 = ""
                        var incognito1 = ""
                        if (trade == 'true') {
                            trade1 = "<input type='hidden' name='trade' value='1' checked='" + trade + "' ><input type='hidden' name='bid_type' value='" + bid_type + "'  ><input type='hidden' name='bid_start'  value='" + bid_start + "' ><input type='hidden' name='bid_step'  value='" + bid_step + "' disabled=''>"
                        }

                        if (fast_trade == "true") {
                            fast_trade1 = "<input type='hidden' name='fast_trade' value='1' checked='" + fast_trade + "'  ><input type='hidden' name='fast_type'  value='" + fast_type + "' ><input type='hidden' name='fast_price'  value='" + fast_price + "'    >"
                        }
                        if (incognito == "true") {
                            incognito1 = "<input type='hidden'  name='incognito' value='1' checked='" + incognito + "' >"

                        }

                        btnS.innerHTML = "<form method='POST' NAME='prodazha" + i + ki + "' action='trade.php?m=add3'><input type='hidden' name='k' value='" + set_kParam + "'><input type='hidden' name='id' value='" + idstr22 + "'>" + trade1 + fast_trade1 + incognito1 + "</form><b onClick='document.prodazha" + i + ki + ".submit()' title='продать по последней цене' class='cmd_all cmd_mini_sl cmd_amini_sl '>Б.ПРОД</b>"

                    }


                }
            }

            // ======== ф-ции вібросить шмотку

            var btn2276 = document.getElementsByClassName('inputGroup inputTitle inputSmallRight')[0]
            var btn2276 = btn2276.getElementsByClassName('title')[0]

            btn2276.innerHTML += "активировать<b class='cmd_all cmd_mini_sl cmd_amini_sl ' onClick='sumkaLAVKA(1)' >в лавку</b>";
            btn2276.innerHTML += "<b class='cmd_all cmd_mini_sl cmd_amini_sl ' onClick='sumkaLAVKA(2)' >выброс</b>";


        }

    } //=====================

    function sumkaLAVKA(per2287) { // аддон сумка
        //выброс шмоток

        var sumka0 = document.getElementsByClassName('trade_items bags bag_0')[0]

        for (kki = 2; kki < 9; kki += 3) {
            for (ii = 0; ii < 5; ii++) {

                var btnS0 = sumka0.rows[kki].cells[ii]

                if (btnS0.getElementsByTagName('a')[0]) {

                    var btnS20 = btnS0.getElementsByTagName('a')[0].attributes[0].value //[0]trade.php?tobag=3614150&k=39433
                    var idstr20 = btnS20.match(/tobag=(\d*)/); // айди
                    idstr20 = idstr20[1]

                    if (per2287 == 1) {
                        btnS0.innerHTML = "<b class='cmd_all cmd_mini_sl cmd_amini_sl ' onClick='valLAV(" + idstr20 + ")' >в лавку</b>";
                    } else {
                        btnS0.innerHTML = "<b class='cmd_all cmd_mini_sl cmd_amini_sl ' onClick='valLAV2(" + idstr20 + ")' >выброс</b>";

                    }
                }
            }
        }


    } //=====================================

    function valLAV2(idstr20, idGR20) { // аддон подзем
        post("cmd=remove&item=" + idstr20 + "&k=" + set_kParam, "shop.php?a=sell", "", "");
        sumkaLAVKA()



    }

    function valLAV(idstr20) { // аддон подзем
        post("cmd=sell&item=" + idstr20 + "&k=" + set_kParam, "shop.php?a=sell", "Попандопулус не успевает из-за тебя обслуживать других клиентов. Приходите завтра.", "Попандопулус не успевает из-за тебя обслуживать других клиентов. Приходите завтра.");
        sumkaLAVKA()
    }


    function podzem() { // аддон подзем
        if (document.URL.indexOf("/fight_log.php?log_id=") > 0) {
            var nazad = document.getElementById('body')
            if (nazad.getElementsByClassName('cmd_all cmd_row3 cmd_arow3 back')) {

                var btn_podzem = "<td><form method='post' NAME='polvl2392' action='monster.php?a=search'>  <input type='hidden' name='k' value='" + set_kParam + "'>  </form></td>"; //по уровню

                //=====================по лебедке===============
                btn_podzem += "<td><form method='POST' NAME='spuskLEB' action='monster.php?a=continue&k=" + set_kParam + "'>  <input type='hidden' name='room' value='2'>  <input type='hidden' name='ptype' value='1'  checked='true'></form></td>"; //по лебедке

                btn_podzem += "<td><form method='POST' NAME='spuskVER' action='monster.php?a=continue&k=" + set_kParam + "'>  <input type='hidden' name='room' value='3'>  <input type='hidden' name='mmtype' value='1'  checked='true'></form></td>"; //по веревке


                //nazad.innerHTML=btn_podzem+nazad.innerHTML

                var nazad1 = nazad.getElementsByClassName('cmd_all cmd_row3 cmd_arow3 back')[0]
                if (nazad1 !== undefined) {
                    nazad.innerHTML = btn_podzem + nazad.innerHTML
                    //******** нападение в подземе*********
                    if (options[64][1] == 1) {
alert("бродить по лвл?")//123
					setTimeout("document.polvl2392.submit()", randomNumber(options[66][1], options[67][1]));
                     
					 //бродить по лвл
                    }
                    //*************************

                    btn_podzem = null
                }
            }
        }

        //******** нападение в подземе*********
        if (options[65][1] == 1) {
            if (document.URL.indexOf("/monster.php?a=") > 0) {
                var nazad = document.getElementById('body')
                if (nazad.getElementsByClassName('cmd_all cmd_row3 cmd_arow3')) {
                    aa = document.getElementsByTagName("form")[0]
                    //alert(aa.innerHTML)
                    if (aa.innerHTML.indexOf("НАПАСТЬ") > 0) {
					alert("напасть?")//123
                        setTimeout("document.getElementsByTagName('form')[0].submit()", randomNumber(options[66][1], options[68][1]));
                        //напасть
                    } else {
                        aa = document.getElementsByTagName("form")[1]
                        //alert(aa.innerHTML)

                        if (aa.innerHTML.indexOf("ПО ЛЕБЕДКЕ") > 0) {


                            if (options[71][1] == 1) {
							alert("по лебедке?")//123
                                setTimeout("document.getElementsByTagName('form')[1].submit()", randomNumber(options[66][1], options[68][1]));
                                //по лебедке
                            } else {
							alert("по веревке?")//123
                                
                                setTimeout("document.getElementsByTagName('form')[0].submit()", randomNumber(options[66][1], options[68][1])); //по веревке
                            }


                        }


                    }
                }
            }
        }
        //*************

    }

    function randomNumber(m, n) //случайное число от М до Н
    {
        m = parseInt(m);
        n = parseInt(n);
        return Math.floor(Math.random() * (n - m + 1)) + m;
    }


    function infoUP() { // функция опускания ненужного вниз страницы



        var per2355 = document.getElementById('body')

        if (per2355.getElementsByClassName('up_avatar')[0]) {
            if (document.URL.indexOf("dozor.php") > 0 || document.URL.indexOf("mine.php") > 0 || document.URL.indexOf("harbour.php?a=trade") > 0 || document.URL.indexOf("/well.php") > 0 || document.URL.indexOf("temple.php") > 0 || document.URL.indexOf("/trade.php") > 0 || document.URL.indexOf("shop.php") > 0 || document.URL.indexOf("smith.php") > 0) {

                if (document.URL.indexOf("/dozor.php?") > 0) {
                    //ненада скрывать
                } else {
                    var per2356 = per2355.getElementsByClassName('up_avatar')[0]
                    per2356.style = 'display:none'
                    if (options[34][1] == 1) {
                        per2355.innerHTML += per2356.innerHTML
                    }
                }
            }
        }


        if (per2355.getElementsByClassName('inputGroup')[0]) {
            if (document.URL.indexOf("/shtab.php") > 0 || document.URL.indexOf("dozor.php?") > 0 || document.URL.indexOf("harbour.php") > 0 || document.URL.indexOf("mine.php?a=open") > 0 || document.URL.indexOf("farm.php") > 0 || document.URL.indexOf("village.php") > 0) {

                if (document.URL.indexOf("/harbour.php?a=coulonpack") > 0 || document.URL.indexOf("/dozor.php?") > 0 || document.URL.indexOf("/shtab.php") > 0) {
                    //ненада скрывать

                    //var per2357=per2355.getElementsByClassName('inputGroup')[0]
                    //per2357.innerHTML=per2355.getElementsByClassName('default skills h20 font_black')[0].innerHTML
                    if (per2355.getElementsByClassName('enemy_message')[0]) {
                        per2355.getElementsByClassName('enemy_message')[0].style = 'display:none'
                        per2355.getElementsByClassName('avatar ')[0].style = 'display:none'
                    }

                } else {
                    var per2357 = per2355.getElementsByClassName('inputGroup')[0]
                    per2357.style = 'display:none'
                    if (options[34][1] == 1) {
                        per2355.innerHTML += per2357.innerHTML



                    }
                }
            }
        }

        if (document.URL.indexOf("/mine.php?a=mine&m") > 0) {
            if (per2355.getElementsByClassName('inputGroup inputTitle')[0]) {


                var per2356 = per2355.getElementsByClassName('inputGroup inputTitle')[0]
                per2356.style = 'display:none'


            }
        }
    }


    function fightlog() { // аддон лог боя

        var p = new Array(4);
        if (document.URL.indexOf("fight_log") > 0) {
            
			var uron=document.getElementsByClassName("grbody")
			
				
			
			
			if 	(uron[4].innerHTML.indexOf("Осталось здоровья") > 0) {
			var uron1=uron[4].getElementsByClassName("font_large")[5].innerHTML
			var uron2=uron[4].getElementsByClassName("font_large")[2].innerHTML
			uron=uron1+" || "+uron2+"<b class='icon ico_block' title='урон защита||нападение'><b class='icon ico_power' ></b></b>"
		
			}else{
			if 	(uron[3].innerHTML.indexOf("Осталось здоровья") > 0) {
			uron=uron[3].getElementsByClassName("font_large")[5].innerHTML
			uron+="<b class='icon ico_block' title='урон защитника/нету зверя'><b class='icon ico_power' ></b></b>*"
			}else{
			if 	(uron[2].innerHTML.indexOf("Осталось здоровья") > 0) {
			uron=uron[2].getElementsByClassName("font_large")[5].innerHTML
			uron+="<b class='icon ico_block' title='урон защитника/без зверей'><b class='icon ico_power' ></b></b>**"
			
			}
				}	
			}
			
			
			
			
			//alert(uron)
			var stat = document.getElementsByClassName("default")
			var statR = stat[stat.length - 2] // результ боя
            statR = statR.rows[statR.rows.length - 1].cells[1]
            var statL = stat[stat.length - 1] // результ боя
            //alert(stat.innerHTML)

            if (statL.innerHTML.indexOf("ящик странной формы – Сундучок Пандоры") > 0) {
                statR.innerHTML += "<span class='font_large'> 1х<b title='медальен страшилок' class='iconsp item_pandora'></b></span>"

            }
            if (statL.innerHTML.indexOf("медальон в память об этой победе") > 0) {
                var medalek = 1
                if (statL.innerHTML.indexOf("Когда вы его взяли в руки, он развалился у вас на четыре ") > 0) {
                    medalek = 4
                }
                if (statL.innerHTML.indexOf("Когда вы взяли его в руки, он развалился у вас на два") > 0) {
                    medalek = 2
                }


                statR.innerHTML += "<span class='font_large'> " + medalek + "х<b title='медальен страшилок' class='icon medallions'></b></span>"

            }
		
			
            if (statL.innerHTML.indexOf("для послания") > 0) {

                statR.innerHTML += "<b class='icon ico_bday_letter' title='Кусок послания'></b>"
            }


            //var statL=document.getElementsByClassName('default h20')[0]
            for (var i = 0; i < statL.rows.length; i++) {
                //alert(statL.rows[i].innerHTML)
                var re = ''
                if (statL.rows[i].innerHTML !== "") {
                    re = statL.rows[i].innerHTML.match(/(?:<b><b>|<b>)(.*?)<\/b>/); // ник
                }
                var td = statL.rows[i].insertCell(-1)
                if (re !== null) {

                    if (re[1] == "Красный Червячелло") {
                        re[1] = "<b class='icon2 pet8' title='Красный червячелло'></b>"
                    }

                    if (p[1] == re[1] || p[1] == undefined) {
                        p[1] = re[1]
                        re[1] = "<div style='background-color:Wheat1;display:inline;'>" + re[1] + "</div>"
                    } else if (p[2] == re[1] || p[2] == undefined) {
                        p[2] = re[1]
                        re[1] = "<div style='background-color:Yellow;display:inline;'>" + re[1] + "</div>"
                    } else if (p[3] == re[1] || p[3] == undefined) {
                        p[3] = re[1]
                        re[1] = "<div style='background-color:SkyBlue1;display:inline;'>" + re[1] + "</div>"
                    } else {
                        p[4] = re[1]
                        re[1] = "<div style='background-color:Pink1;display:inline;'>" + re[1] + "</div>"
                    }

                    //<div style="background-color:red;display:inline;">вкецуе</div>
                    td.innerHTML = "<b>" + re[1] + "</b>"
                }

                re = statL.rows[i].innerText.match(/\((\d*)\)/); // урон
                td = statL.rows[i].insertCell(-1)

                if (re) {

                    if (re[1] == '0') {
                        re[1] = "<font color='blue'>" + re[1] + "</font>"
                    } else {
                        re[1] = "<font color='red'>" + re[1] + "</font>"
                    }
                    td.innerHTML = "<b>" + re[1] + "</b>";
                }
                if (statL.rows[i].innerText.indexOf("сработал Красный антимаг") > 0) {
                    td = statL.rows[i].cells[2].innerHTML += "<b  class='icon item_202'></b>"
                }
                if (statL.rows[i].innerText.indexOf("сработал \"Антимаг") > 0) {
                    td = statL.rows[i].cells[2].innerHTML += "<b class='icon item_108'></b>"
                }

				
						if (statL.rows[i].innerHTML.indexOf("icon2 relics") > -1) {
			
			var rel = statL.rows[i].innerText.match(/получил: (\d*)/)[1];
			
statR.innerHTML +=rel+ "<b class='icon2 relics' title='Релики'></b>"
//			<b>   получил: 1   <b class="icon2 relics" title="Релики"></b></b>

			}

				
                if (statL.rows[i].innerText.indexOf("Сработал заговор") == 0) {
                    var magik = ""
                    if (statL.rows[i].innerText.indexOf("Сработал заговор «Магическая отравка» ") == 0) {
                        magik = " <b title='<b>ОТРАВКА </b>Заговор накладывается на хозяина зверушки. Регенерация любой его зверушки на 180 минут увеличивается в 5 раз, но начинает действовать в обратную сторону, отнимая жизненную силу текущей зверушки .Эффект работает только при нападении на вас.' class='icon ico_magic109'></b>"
                        statL.rows[i].cells[2].innerHTML += magik

                    }
                    if (statL.rows[i].innerText.indexOf("Сработал заговор «Золотая Чума» ") == 0) {
                        magik = " <b class='icon ico_magic118' title='«Золотая Чума» -Возможность заразить противника болезнью золотая чума, при которой в течение 8 часов противник теряет 10% от количества золота вне своего сейфа, 5% с которых начисляется вам. <br>Эффект работает только при нападении на вас'></b>"
                        statL.rows[i].cells[2].innerHTML += magik
                    }

                    if (statL.rows[i].innerText.indexOf("Сработал заговор «Свистелка» ") > -1) {
                        magik = "<b class='icon potion_3' title='Сработал заговор «Свистелка» '></b>"
                        statL.rows[i].cells[2].innerHTML += magik
                    }


                    if (statL.rows[i].innerText.indexOf("Сработал заговор «Отвратка» ") > -1) {
                        magik = "<b class='icon ico_magic107' title='Сработал заговор Отвратка '></b>"
                        statL.rows[i].cells[2].innerHTML += magik
                    }


                    if (statL.rows[i].innerText.indexOf("Сработал заговор «Уклонение»") > -1) {
                        magik = "<b class='icon ico_magic116' title='Сработал заговор «Уклонение»'></b>"
                        statL.rows[i].cells[2].innerHTML += magik
                    }


                    if (statL.rows[i].innerText.indexOf("Сработал заговор «Живодер» ") > -1) {
                        magik = "<b class='icon ico_magic103' title='Сработал заговор «Живодер» '></b>"
                        statL.rows[i].cells[2].innerHTML += magik
                    }

                    if (statL.rows[i].innerText.indexOf("Сработал заговор «Оглушка» ") > -1) {
                        magik = "<b class='icon ico_magic106' title='Сработал заговор «Оглушка»  '></b>"
                        statL.rows[i].cells[2].innerHTML += magik
                    }
                    if (statL.rows[i].innerText.indexOf("Сработал заговор «Антикрут» ") > -1) {
                        magik = "<b class='icon ico_magic122' title='Сработал заговор «Антикрут» '></b>"
                        statL.rows[i].cells[2].innerHTML += magik
                    }


                    statR.innerHTML += magik




                }




                if (statL.rows[i].innerText.indexOf("сообщает, что жива, ведь игра-то добрая.") > 0) {

                    statL.rows[i].cells[2].innerHTML += "<b class='icon ico_online0' title='Полное отсутствие здоровья зверушки  вынудило её отправиться набираться сил в параллельные миры. Она шлет оттуда пламенный привет'></b>"
                    statR.innerHTML += " <b class='icon ico_online0' title='Полное отсутствие здоровья зверушки  вынудило её отправиться набираться сил в параллельные миры. Она шлет оттуда пламенный привет'></b>"
                }
				
				
				if (statL.rows[i].innerHTML.indexOf("Сработал бонус касты мирников. ") > 0) {

                    statL.rows[i].cells[2].innerHTML += "<b class='icon ico_online1' title='Сработал бонус касты мирников. Здоровье зверушки опустилось до 1%'></b>"
                    statR.innerHTML += " <b class='icon ico_online1' title='Сработал бонус касты мирников. Здоровье зверушки опустилось до 1%'></b>"
                }



                if (statL.rows[i].innerText.indexOf("на щит в кузнице, не учитывается в этом бою") > 0) {
                    td = statL.rows[i].cells[2].innerHTML += "<b class='icon ico_remove'></b><b class='icon ico_smithwork'></b><b class='icon ico_block'></b><br>___________"
                }
            }

            var url_fight = document.URL
			 if (options[72][1] == 0) {
uron=''
			 }			 

            var value_fight = statR.innerHTML+uron //+"."

            var value_fight1 = value_fight.replace(/получил/, '-')
            value_fight = value_fight.replace(/<span.*получил/, '&nbsp;&nbsp;&nbsp;')
            url_fight = url_fight.match(/log_id=\d*/); // урон


            if (value_fight == "") {
                value_fight += "<font color='blue'>[0]</font>"
            }
            //alert(value_fight)
            localStorage.setItem(url_fight, value_fight);
            try {
                document.getElementById("crumbs").innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + value_fight1
            } catch (e) {}

            //**********************************************
            var masURL = localStorage.getItem('masURL');
            //alert(masURL)
            if (masURL == null) {
                masURL = "";
                for (var i = 0; i < options[45][1]; i++) {
                    masURL += i + ";"
                }
                //alert(masURL)
            }

            var masURLarr = masURL.split(';');
            var item = localStorage.removeItem(masURLarr[options[45][1] - 1]);
            //alert(localStorage.getItem(masURLarr[options[45]]))

            for (var i = options[45][1] - 1; i > 0; i = i - 1) {

                masURLarr[i] = masURLarr[i - 1]
            }
            masURLarr[0] = url_fight

            masURL = "";
            for (var i = 0; i < options[45][1]; i++) {
                masURL += masURLarr[i] + ";"
            }
            localStorage.setItem('masURL', masURL);

            //var data = localStorage.getItem(userName);
            //localStorage.clear() 


        }


    }

    function pochta() { // локация почта
        if (document.URL.indexOf("/post.php") > 0) {
            var table2603 = document.getElementsByClassName("default post_table ")[0].rows

            for (var i = 0; i < table2603.length; i++) {
                //alert(table2603[i].cells[2].innerHTML)

                
				//http://g1.botva.ru/post.php?m=new&to_id=740105   ответить 
				//post.php?m=new&to_id
				//http://g1.botva.ru/player.php?id=740105  перс
				if (table2603[i].cells[2].innerHTML.indexOf("to_id") > 0) {
				
				var re2611 = table2603[i].cells[2].innerHTML.match(/to_id=(\d*)/); // айди перса
				//alert(re2611[1])
				table2603[i].cells[2].innerHTML=table2603[i].cells[2].innerHTML.replace(/Сообщение от/, "<a href='post.php?m=new&to_id="+re2611[1]+"' title='ответить' ><b class='icon ico_mail'></b></a><a href='player.php?id="+re2611[1]+"'  title='посмотреть перса'><b class='iconsp tag_char'></b></a>");
				
				
				
				
				}else{
				
				if (table2603[i].cells[2].innerHTML.indexOf("href=\"fight_log.php?log_id") > 0) {
                    var re2611 = table2603[i].cells[2].innerHTML.match(/log_id=\d*/); // айди лога
                    if (localStorage.getItem(re2611) == null) {
                        table2603[i].cells[2].innerHTML += "<font color='red'>[new]</font>"
                    } else {
                        table2603[i].cells[2].innerHTML += localStorage.getItem(re2611);
                    }

                    if (table2603[i].cells[2].innerHTML.indexOf("Вы атаковали") > 0) {
                        table2603[i].cells[2].innerHTML = table2603[i].cells[2].innerHTML.replace(/Вы атаковали/, "<b class='icon ico_power' title='Вы атаковали'></b>");
                    }
                    if (table2603[i].cells[2].innerHTML.indexOf("атаковал вас") > 0) {
                        table2603[i].cells[2].innerHTML = "<b class='icon ico_block' title='На вас напали'></b>" + table2603[i].cells[2].innerHTML.replace(/атаковал вас/, '');

                    }

                } //фор--
				}
            }
            //отправленные
            
            //document.getElementsByClassName("default post_table ")[0].outerHTML += "<a title='удалит все отправленные нафиг' onclick='clea2743()' >[чистка] </a><b>Отправленные:</b> <br>" + out
            document.getElementsByClassName("default post_table ")[0].outerHTML = "<a title='ваши  отправленные сообщения' onclick='outmess()' class='cmd_all cmd_row6 cmd_arow6'>ИСХОДЯЩИЕ</a>"+document.getElementsByClassName("default post_table ")[0].outerHTML 
	
            //**********************
        }
    }
function outmess() {
	var out = localStorage.getItem('otprav')
	          document.getElementsByClassName("default post_table ")[0].outerHTML = "<a title='удалит все отправленные нафиг' onclick='clea2743()' class='cmd_all cmd_row6 cmd_arow6'>ОЧИСТИТЬ </a><b>Отправленные:</b> <br><table class='default post_table '>  <tbody>" + out+"</tbody></table>"
			  
	}
	
    function clea2743() {
        localStorage.setItem('otprav', '')
        alert("Отправленные почищены")
    }
    ////====================сохранение панели

    function save_panel(flag) {

        if (flag == 1) { // код продвинутой панели
            var kod = localStorage.getItem('knopka')
            if (kod == 'null') {
                kod = 'нет сохраненной панели'
            }
            alert(kod)
        }

        if (flag == 0) { // сохран кнопки
            localStorage.setItem('knopka', knopka); //сохр пр панель
            alert("готово")
        }
        if (flag == 2) { // свой код ПК
            knopka = window.prompt("введите свой код продвинутой панели", "скопируйте сюда свой код продвинутой панели"); // окно ввода кода
            localStorage.setItem('knopka', knopka); //сохр пр панель
        }

        if (flag == 4) { // код продвинутой панели
            var kod = localStorage.getItem('out4')
            if (kod == 'null') {
                kod = 'нет сохраненной панели'
            }
            alert(kod)
        }

        if (flag == 3) { // сохран кнопки
            localStorage.setItem('out4', out4); //сохр пр панель
            alert("готово")
        }
        if (flag == 5) { // свой код ПК
            out4 = window.prompt("введите свой код  панели ССылок", "скопируйте сюда свой код  панели"); // окно ввода кода
            localStorage.setItem('out4', out4); //сохр пр панель
        }


    }


    function kravchuchka() { // аддон кравчучка

        if (document.URL.indexOf("/index.php") > 0) {

            var item2810 = document.getElementById("weapons")

            localStorage.setItem('item', item2810.innerHTML);
        }
        var item2810 = localStorage.getItem('item')
        item2810 = item2810.replace(/\?deactivate/gi, 'index.php?deactivate');
        item2810 = item2810.replace(/\?activate/gi, 'index.php?activate');
        item2810 = item2810.replace(/k=\d*/gi, 'k=' + set_kParam);


        item2810 = "<div style='position:absolute;z-index:2;right:0px;top:0px;'> <div id='krav' style='width:200px;height:340px;background-color:rgb(231,207,165)'  > " + item2810 + "</div> </div>"


        var dgv2824 = document.createElement('DIV');
        dgv2824.id = "ntf_al_2824";
        dgv2824.style.display = "none";
        dgv2824 = document.body.appendChild(dgv2824);
        dgv2824.innerHTML += item2810


        document.getElementById("online").innerHTML = "<a  OnMouseOver='blokDisp(1)'>[Кравчучка]</a>" + document.getElementById("online").innerHTML;
    }

    function blokDisp(a) {
        if (a == 1) {
            document.getElementById('ntf_al_2824').style.display = ''
            ident = window.setTimeout("document.getElementById('ntf_al_2824').style.display = 'none'", 4000);
        }
    }


    ////=================
    // Объявим глобальные переменные
    // Переменная состояния, по умолчанию ничего не двигается = false
    var moveState = false;
    // Переменные координат мыши в начале перемещения, пока неизвестны
    var x0, y0;
    // Начальные координаты элемента, пока неизвестны
    var divX0, divY0;


    //document.write( "<div style='position:absolute; top:0; left:0; background-color:black; width:50px; height:50px;'       onmousedown = 'initMove(this, event);'onmouseup = 'moveState = false;'         onmousemove = 'moveHandler(this, event);'     ></div>");

    // Объявим функцию для определения координат мыши

    function defPosition(event) {
        var x = y = 0;
        if (document.attachEvent != null) { // Internet Explorer & Opera
            x = window.event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
            y = window.event.clientY + document.documentElement.scrollTop + document.body.scrollTop;
        }
        if (!document.attachEvent && document.addEventListener) { // Gecko
            x = event.clientX + window.scrollX;
            y = event.clientY + window.scrollY;
        }
        return {
            x: x,
            y: y
        };
    }

    // Функция инициализации движения
    // Записываем всё параметры начального состояния

    function initMove(div, event) {

        this2 = div
        var event = event || window.event;
        x0 = defPosition(event).x;
        y0 = defPosition(event).y;
        divX0 = parseInt(div.style.left);
        divY0 = parseInt(div.style.top);
        moveState = true;
    }

    function StopMove(div) {

        localStorage.setItem(div.id + 'L', div.style.left);

        localStorage.setItem(div.id + 'T', div.style.top);
        moveState = false;
    }
    //onmousedown = 'initMove(this, event);'onmouseup = 'moveState = false;'         onmousemove = 'moveHandler(this, event);' 
    document.onmouseup = function () {
        moveState = false;
    }
    document.onmousemove = function () {
        moveHandler(this2, event);
    }

    // Функция обработки движения:

    function moveHandler(div, event) {

        var event = event || window.event;
        if (moveState) {
            div.style.left = divX0 + defPosition(event).x - x0;
            div.style.top = divY0 + defPosition(event).y - y0;
        }
    }

    function KV() {





        if (document.URL.indexOf("/shtab.php") > 0) {

            var shtab = document.getElementsByClassName('shtab default center default_nobold')

            for (var i = 0; i < shtab.length; i++) {
                shtab[i] /*<b class="icon2 ico_clanwar" title=""></b>*/


            }


        }

    }

    function roundPlus(x) { //x - число, n - количество знаков  
        if (isNaN(x) || isNaN(1)) return false;
        var m = Math.pow(10, 1);
        return Math.round(x * m) / m;
    }

    function klan() {
        var m

        if (document.URL.indexOf("/clan_mod.php?m=training") > 0) {


            var kaz = new Array(); // казарма мест / стоимость
            kaz[0] = ['(1)', '0'];
            kaz[1] = ['(3)', '3'];
            kaz[2] = ['(6)', '296'];
            kaz[3] = ['(9)', '4130'];
            kaz[4] = ['(12)', '16520'];
            kaz[5] = ['(15)', '66080'];
            kaz[6] = ['(18)', '264320'];
            kaz[7] = ['(21)', '1057280'];
            kaz[8] = ['(24)', '2114560'];
            kaz[9] = ['(27)', '4229120'];
            kaz[10] = ['(30)', '6343680'];
            kaz[11] = ['(33)', '9515520'];
            kaz[12] = ['(36)', '14273280'];
            kaz[13] = ['(39)', '21409920'];
            kaz[14] = ['(42)', '32114880'];
            kaz[15] = ['(45)', '48172320'];
            kaz[16] = ['(48)', '72258480'];
            kaz[17] = ['(0)', '0'];
            //kaz[17]	= ['(мест)', 'стоимость' ];



            var s = document.getElementsByClassName('default list_menu')[0]
            s.innerHTML += "<th><font color='green'>Примечание:</font></th><th></th><th><font color='green'><b>*В военное время стоимость построек увеличивается на 30%</b></font></th><br>"

            //alert(s.rows[0].cells[1].innerHTML)
            //===========казармы===========
            var lvl = s.rows[0].cells[1].innerHTML.match(/(\d*)\s\/\s\d*/); // лвл постройки казарма 6 / 16
            //td = mdx2.rows[i].insertCell(-1).innerHTML

            lvl = parseInt(lvl[1])
            s.rows[0].cells[2].innerHTML = "<th class='padding5_0'><b>ур." + roundPlus(lvl / 0.16) + "%</b><br>мест:" + kaz[lvl][0] + "<br>" + razd_sum(kaz[lvl][1]) + "<b class='icon money1' title='" + kaz + "'></b><br><font color='green'><b>" + razd_sum((kaz[(lvl)][1] * 1.3)) + "</b></font></th>"
            s.rows[0].cells[2].innerHTML += "<th class='left padding5_0'><b>Следующий уровень: " + (lvl + 1) + "</b><br> Вместимость казарм:" + kaz[(lvl + 1)][0] + "  воинов <br>Цена покупки:" + razd_sum(kaz[(lvl + 1)][1]) + "<b class='icon money1' title='Прежде, чем принять в клан новых воинов, надо обеспечить их помещением для сна и тренировок.'></b><br><font color='green'><b>" + razd_sum((kaz[(lvl + 1)][1] * 1.3)) + "</b></font></th>"
            //============================
            //===========сторожка===========
            var lvl = s.rows[8].cells[1].innerHTML.match(/(\d*)\s\/\s\d*/); // лвл постройки казарма 6 / 16
            lvl = parseInt(lvl[1])
            s.rows[8].cells[2].innerHTML = "<th class='padding5_0'><b>ур." + roundPlus(lvl / 0.15) + "%</b><br>мест:" + kaz[lvl][0] + "<br>" + razd_sum(kaz[lvl][1]) + "<b class='icon money1' title='" + kaz + "'></b><br><font color='green'><b>" + razd_sum((kaz[(lvl)][1] * 1.3)) + "</b></font></th>"
            s.rows[8].cells[2].innerHTML += "<th class='left padding5_0'><b>Следующий уровень: " + (lvl + 1) + "</b><br>  на стражу:" + kaz[(lvl + 1)][0] + "  воинов <br>Цена покупки:" + razd_sum(kaz[(lvl + 1)][1]) + "<b class='icon money1' title='Враг никогда не застанет замок врасплох, пока доблестные клановые воины несут стражу. Если ваш клан в состоянии войны, несение караульной службы просто необходимо для выживания.'></b><br><font color='green'><b>" + razd_sum(kaz[(lvl + 1)][1] * 1.3) + "</b></font></th>"
            //============================
            var bash = new Array(); // башни
            bash[0] = ['1', '10', '0'];
            bash[1] = ['1-2', '15', '5000'];
            bash[2] = ['1-3', '20', '10000'];
            bash[3] = ['1-4', '25', '30000'];
            bash[4] = ['1-5', '30', '120000'];
            bash[5] = ['1-10', '30', '250000'];
            bash[6] = ['1-11', '35', '500000'];
            bash[7] = ['1-12', '40', '750000'];
            bash[8] = ['1-13', '45', '1000000'];
            bash[9] = ['1-14', '50', '2000000'];
            bash[10] = ['1-15', '55', '5000000'];
            bash[11] = ['5-15', '55', '10000000'];
            bash[12] = ['5-20', '60', '25000000'];
            bash[13] = ['10-20', '65', '50000000'];
            bash[14] = ['10-25', '70', '100000000'];
            bash[15] = ['15-30', '75', '250000000'];
            bash[16] = ['15-40', '80', '750000000'];
            bash[17] = ['0', '0', '0'];
            //bash[17]	= ['урон', 'меткость','стоимость' ];
            //===========вышки===========
            lvl = s.rows[1].cells[1].innerHTML.match(/(\d*)\s\/\s\d*/); // лвл постройки казарма 6 / 16
            lvl = parseInt(lvl[1])

            s.rows[1].cells[2].innerHTML = "<th><b>ур." + roundPlus(lvl / 0.16) + "%</b><br>урон:" + bash[lvl][0] + "% меткость:" + bash[lvl][1] + "%<br>" + razd_sum(bash[lvl][2]) + "<b class='icon money1' title='" + bash + "'></b><br><font color='green'><b>" + razd_sum(bash[(lvl)][2] * 1.3) + "</b></font></th>"
            s.rows[1].cells[2].innerHTML += "<th class='left padding5_0'><b>Следующий уровень: " + (lvl + 1) + "</b><br> урон:" + bash[(lvl + 1)][0] + "% Меткость:" + bash[(lvl + 1)][1] + "%<br>Цена: " + razd_sum(bash[(lvl + 1)][2]) + "<b class='icon money1' title='Лучники тем чаще ведут стрельбу, чем безопаснее при этой стрельбе они себя ощущают. Улучшая башни, вы заботитесь не только о своих воинах, но и о повышении своей безопасности.'></b><br><font color='green'><b>" + razd_sum(bash[(lvl + 1)][2] * 1.3) + "</b></font></th>"
            //============================
            var bash1 = new Array(); // котлы/арсенал/врата
            bash1[0] = ['20', '0'];
            bash1[1] = ['40', '200000'];
            bash1[2] = ['60', '300000'];
            bash1[3] = ['80', '600000'];
            bash1[4] = ['100', '1000000'];
            bash1[5] = ['120', '1500000'];
            bash1[6] = ['140', '3000000'];
            bash1[7] = ['160', '6000000'];
            bash1[8] = ['180', '10000000'];
            bash1[9] = ['0', '0'];
            //bash1[9]	= ['время мин.', 'цена' ];

            //===========котлы===========
            lvl = s.rows[2].cells[1].innerHTML.match(/(\d*)\s\/\s\d*/); // лвл постройки казарма 6 / 16
            lvl = parseInt(lvl[1])

            s.rows[2].cells[2].innerHTML = "<th><b>ур." + roundPlus(lvl / 0.08) + "%</b><br>ров:" + bash1[lvl][0] + "мин.(<font color='red'>" + (bash1[(lvl)][0] / 2) + "</font>)<br>" + razd_sum(bash1[lvl][1]) + "<b class='icon money1' title='" + bash1 + "'></b><br><font color='green'><b>" + razd_sum(bash1[lvl][1] * 1.3) + "</b></font></th>"
            s.rows[2].cells[2].innerHTML += "<th class='left padding5_0'><b>Следующий уровень: " + (lvl + 1) + "</b><br> ров:" + bash1[(lvl + 1)][0] + "мин.(<font color='red'>" + (bash1[(lvl + 1)][0] / 2) + "</font>)<br>Цена покупки: " + razd_sum(bash1[(lvl + 1)][1]) + "<b class='icon money1' title='Чем лучше смоляные котлы, тем дольше в осаде держится эффект от рва. Для того, чтобы уменьшить действие смоляных котлов, штурмующим необходимо покупать пушку.'></b><br><font color='green'><b>" + razd_sum(bash1[(lvl + 1)][1] * 1.3) + "</b></font></th><br><font color='red'><b>Пушка врага</b> – уменьшает время в 2 раза.</font>"
            //============================
            //===========арсенал===========
            lvl = s.rows[3].cells[1].innerHTML.match(/(\d*)\s\/\s\d*/); // лвл постройки казарма 6 / 16
            lvl = parseInt(lvl[1])

            s.rows[3].cells[2].innerHTML = "<th class='padding5_0'><b>ур." + roundPlus(lvl / 0.08) + "%</b><br>башни:" + bash1[lvl][0] + "мин.(<font color='red'>" + (bash1[(lvl)][0] / 2) + "</font>)<br>" + razd_sum(bash1[lvl][1]) + "<b class='icon money1' title='" + bash1 + "'></b><br><font color='green'><b>" + razd_sum(bash1[(lvl)][1] * 1.3) + "</b></font></th>"
            s.rows[3].cells[2].innerHTML += "<th class='left padding5_0'><b>Следующий уровень: " + (lvl + 1) + "</b><br> башни:" + bash1[(lvl + 1)][0] + "мин.(<font color='red'>" + (bash1[(lvl + 1)][0] / 2) + "</font>)<br>Цена покупки: " + razd_sum(bash1[(lvl + 1)][1]) + "<b class='icon money1' title='Чем крепче здание арсенала, тем дольше в осаде держится эффект от лучников. Для того, чтобы уменьшить действие башен, штурмующим необходимо покупать катапульту.'></b><br><font color='green'><b>" + razd_sum(bash1[(lvl + 1)][1] * 1.3) + "</b></font></th><br><font color='red'><b>Катапульта врага</b>– уменьшает время в 2 раза</font>"
            //============================
            //===========врата===========
            lvl = s.rows[7].cells[1].innerHTML.match(/(\d*)\s\/\s\d*/); // лвл постройки казарма 6 / 16
            lvl = parseInt(lvl[1])

            s.rows[7].cells[2].innerHTML = "<th class='padding5_0'><b>ур." + roundPlus(lvl / 0.08) + "%</b><br>стены:" + bash1[lvl][0] + "мин(<font color='red'>" + (bash1[(lvl)][0] / 2) + "</font>).<br>" + razd_sum(bash1[lvl][1]) + "<b class='icon money1' title='" + bash1 + "'></b><br><font color='green'><b>" + razd_sum(bash1[(lvl)][1] * 1.3) + "</b></font></th>"
            s.rows[7].cells[2].innerHTML += "<th class='left padding5_0'><b>Следующий уровень: " + (lvl + 1) + "</b><br> стены:" + bash1[(lvl + 1)][0] + "мин.(<font color='red'>" + (bash1[(lvl + 1)][0] / 2) + "</font>)<br>Цена покупки: " + razd_sum(bash1[(lvl + 1)][1]) + "<b class='icon money1' title='Чем крепче ворота, тем дольше в осаде держится эффект от стен замка. Для того, чтобы уменьшить действие ворот, штурмующим необходимо покупать таран.'></b><br><font color='green'><b>" + razd_sum(bash1[(lvl + 1)][1] * 1.3) + "</b></font></th><br><font color='red'><b>Таран врага</b> – уменьшает время в 2 раза.</font>"
            //============================
            var bash2 = new Array(); // ров/стены
            bash2[0] = ['1/10', '+3', '0', 1];
            bash2[1] = ['1/90', '+6', '250000', 1];
            bash2[2] = ['2/20', '+12', '500000', 1];
            bash2[3] = ['2/90', '+24', '1000000', 1];
            bash2[4] = ['3/25', '+36', '2500000', 1];
            bash2[5] = ['3/90', '+5%', '5000000', 1];
            bash2[6] = ['4/25', '+10%', '2000', 2]; //кри
            bash2[7] = ['4/90', '+20%', '4000', 2];
            bash2[8] = ['5/10', '+10%общ.', '8000', 2];
            bash2[9] = ['5/50', '+20%общ.', '16000', 2];
            bash2[10] = ['6/0', '+30%общ.', '32000', 2];

            //===========ров===========
            lvl = s.rows[4].cells[1].innerHTML.match(/(\d*)\s\/\s\d*/); // лвл постройки казарма 6 / 16
            lvl = parseInt(lvl[1])

            s.rows[4].cells[2].innerHTML = "<th class='padding5_0'><b>ур." + roundPlus(lvl / 0.1) + "%</b><br>выстрелов:" + bash2[lvl][0] + "%.<br>" + razd_sum(bash2[lvl][2]) + "<b class='icon money" + bash2[lvl][3] + "' title='" + bash2 + "'></b><br><font color='green'><b>" + razd_sum(bash2[(lvl)][2] * 1.3) + "</b></font></th>"
            s.rows[4].cells[2].innerHTML += "<th class='left padding5_0'><b>Следующий уровень: " + (lvl + 1) + "</b><br> выстрел:" + bash2[(lvl + 1)][0] + "%<br>Цена покупки: " + razd_sum(bash2[(lvl + 1)][2]) + "<b class='icon money" + bash2[lvl + 1][3] + "' title='Безопасность замка тем выше, чем труднее его штурмовать. С каждым строительством дополнительных препятствий врагу будет труднее атаковать ваш замок.'></b><br><font color='green'><b>" + razd_sum(bash2[(lvl + 1)][2] * 1.3) + "</b></font></th>"
            //============================
            //===========ров===========
            lvl = s.rows[5].cells[1].innerHTML.match(/(\d*)\s\/\s\d*/); // лвл постройки казарма 6 / 16
            lvl = parseInt(lvl[1])

            s.rows[5].cells[2].innerHTML = "<th class='padding5_0'><b>ур." + roundPlus(lvl / 0.1) + "%</b><br>защита:" + bash2[lvl][1] + ".<br>" + razd_sum(bash2[lvl][2]) + "<b class='icon money" + bash2[lvl][3] + "' title='" + bash2 + "'></b><br><font color='green'><b>" + razd_sum(bash2[(lvl)][2] * 1.3) + "</b></font></th>"
            s.rows[5].cells[2].innerHTML += "<th class='left padding5_0'><b>Следующий уровень: " + (lvl + 1) + "</b><br> защита:" + bash2[(lvl + 1)][1] + "<br>Цена покупки: " + razd_sum(bash2[(lvl + 1)][2]) + "<b class='icon money" + bash2[lvl + 1][3] + "' title='Улучшая защиту замка в виде возведения стен, вы обеспечиваете большую защиту воинам при нападении на них армии врага. При этом вы также повышаете защиту против диверсантов.'></b><br><font color='green'><b>" + razd_sum(bash2[(lvl + 1)][2] * 1.3) + "</b></font></th>"
            //============================
            var bash3 = new Array(); // ров/стены
            bash3[0] = ['28дн./5', '0', 1];
            bash3[1] = ['21дн./5', '200000', 1];
            bash3[2] = ['14дн./5', '400000', 1];
            bash3[3] = ['10дн./5', '800000', 1];
            bash3[4] = ['7дн./6', '1000000', 1];
            bash3[5] = ['3дн./7', '5000', 2]; //кри
            bash3[6] = ['1дн./8', '10000', 2];
            bash3[7] = ['12ч./9', '25000', 2];
            bash3[8] = ['6ч./10', '50000', 2];


            //===========ров===========
            lvl = s.rows[6].cells[1].innerHTML.match(/(\d*)\s\/\s\d*/); // лвл постройки казарма 6 / 16
            lvl = parseInt(lvl[1])

            s.rows[6].onmouseover = "doItem('138','body:|посольство обеспечивает клан баллами дипломатии. Для того, чтобы заключить союз, объявить войну или совершить любое другое дипломатическое действие – необходимо потратить 1 балл дипломатии.|',event,this)";

            s.rows[6].cells[2].innerHTML = "<th class='padding5_0'><b>ур." + roundPlus(lvl / 0.08) + "%</b><br>" + bash3[lvl][0] + "балов.<br>" + razd_sum(bash3[lvl][1]) + "<b class='icon money" + bash3[lvl][2] + "' title='" + bash3 + "'></b><br><font color='green'><b>" + razd_sum(bash3[(lvl)][1] * 1.3) + "</b></font></th>"
            s.rows[6].cells[2].innerHTML += "<th class='left padding5_0'><b>Следующий уровень: " + (lvl + 1) + "</b><br> " + bash3[(lvl + 1)][0] + "балов<br>Цена покупки: " + razd_sum(bash3[(lvl + 1)][1]) + "<b class='icon money" + bash3[lvl + 1][2] + "' title='посольство обеспечивает клан баллами дипломатии. Для того, чтобы заключить союз, объявить войну или совершить любое другое дипломатическое действие – необходимо потратить 1 балл дипломатии.'></b><br><font color='green'><b>" + razd_sum(bash3[(lvl + 1)][1] * 1.3) + "</b></font></th>"
            //============================
        }
    }



    function lavka() {


        if (document.URL.indexOf("shop.php?group=2") > 0 || document.URL.indexOf("shop.php?group=3") > 0 || document.URL.indexOf("shop.php?group=4") > 0 || document.URL.indexOf("shop.php?group=5") > 0) {


            var s = document.getElementsByClassName('default shop')[0]
            for (var i = 1; i < s.rows.length; i += 5) {

                var str = s.rows[i].cells[0].innerHTML //1.6
                var re = str.match(/doItem\('(\d*)/); // level
                var pop = popups['item_' + re[1]]
                var lvl = pop[2].match(/уровень.\s(\d*)/)[1]; // level
                var sila = parseInt(/Сила/.test(pop[2]) ? pop[2].match(/Сила\s.(\d*)/)[1] : 0); // level
                var lovka = parseInt(/Ловкость\s.\d*\\/.test(pop[2]) ? pop[2].match(/Ловкость\s(.\d*)/)[1] : 0); // level

                var masa = parseInt(/Масса/.test(pop[2]) ? pop[2].match(/Масса\s.(\d*)/)[1] : 0); // level
                var master = parseInt(/nМастерство/.test(pop[2]) ? pop[2].match(/Мастерство\s.(\d*)/)[1] : 0); // level
                var zasch = parseInt(/Защита\s\+\d*\\/.test(pop[2]) ? pop[2].match(/Защита\s.(\d*)/)[1] : 0); // level
                var ball = (sila * 1.5) + (lovka * 0.25) + (masa * 0.25) + master + (zasch * 0.5)
                var out = ''
                out += " <b>Характеристики:</b><br>"
                out += " <b class='icon ico_level' title='Минимальный уровень'></b>=>" + lvl + "<font color='blue'><br>"
                out += (sila == 0 ? '' : " <b class='icon ico_power' title='Сила'></b>" + sila)
                out += (zasch == 0 ? '' : " <b class='icon ico_block' title='Защита'></b>" + zasch)
                out += (lovka == 0 ? '' : " <b class='icon ico_dexterity' title='Ловкость'></b>" + lovka)
                out += (masa == 0 ? '' : " <b class='icon ico_endurance' title='Масса'></b>" + masa)
                out += (master == 0 ? '' : " <b class='icon ico_charisma' title='Мастерство'></b>" + master) + "</font>"
                out += " <br>Балов расщепа= <font color='red'>" + ball + "</font>"
                out += (document.URL.indexOf("shop.php?group=5") > 0 ? " <br><b><a href='http://g1.botva.ru/player.php?id=419006' title'всегда вам откует кузнец Razorback -клик откроет мою страницу' >Ковка: </a></b>Сила=(шмот+статы)+25% " : '')
                out += (document.URL.indexOf("shop.php?group=2") > 0 ? " <br><b><a href='http://g1.botva.ru/player.php?id=419006' title'всегда вам откует кузнец Razorback -клик откроет мою страницу' >Ковка: </a></b>Ловкость=(шмот+статы)+25% " : '')
                out += (document.URL.indexOf("shop.php?group=3") > 0 ? " <br><b><a href='http://g1.botva.ru/player.php?id=419006' title'всегда вам откует кузнец Razorback -клик откроет мою страницу' >Ковка: </a></b>Защита=(шмот+статы)+25% " : '')
                out += (document.URL.indexOf("shop.php?group=4") > 0 ? " <br><b><a href='http://g1.botva.ru/player.php?id=419006' title'всегда вам откует кузнец Razorback -клик откроет мою страницу' >Ковка: </a></b>Мастерство=(шмот+статы)+25% " : '')

                s.rows[i].cells[1].innerHTML = out

            }

            //Бацвглаз,items/Weap_21s.jpg,Сила +30\nЛовкость +28\nМасса +16\nМастерство +18\n[L]Ловкость +{l1}%[/L]\n<b>Требования для покупки:</b>\nМинимальный уровень: 36\n<b>Цена: </b> 29.400 [GOLD]\n<b>Цена продажи: </b> 7.350 [GOLD]


        }
    }

    var s = document.getElementsByClassName('default list_menu')[0]



} catch (e) {
    if (options[63][1] == 1) {
        alert(e)
    }
}


//---------------------------- прятать индикаторы в сбытке
/*
 var art=document.getElementsByClassName('magic')//level//itemimg_info_sells 
 for (var i=0;i<art.length;i++){
 art[i].innerHTML=""
 }
 art=document.getElementsByClassName('level')
 for (var i=0;i<art.length;i++){
 art[i].innerHTML=""
 }
 art=document.getElementsByClassName('itemimg_info_sells')
 for (var i=0;i<art.length;i++){
 art[i].innerHTML=""
 }
*/
//----------------------------------------------------------


/*-----Убивалка  полоски премия рунета
document.getElementById('premia').style.display="none" // скрыть полоску премия рунета
document.getElementById('premia3').style.display="none" 
//-------------------------------------
*/

function cleanpanda() {
    //alert("обнуляем")
    for (i = 0; i < 10; i++) {
        localStorage.setItem("p" + i, 0);
    }
    localStorage.setItem("pp", 0);

}


if (options[74][1] == 1) {
panda()
}


function panda() {


    if (document.URL.indexOf("index.php?pandora") > 0) {
        if (document.getElementById('body').innerHTML.indexOf("молодец какой! Правильно угадал") > 0) {
            cleanpanda()
        }
        var pp = localStorage.getItem("pp")
        if (pp == "01111111111") { //очистка счетчиков
            cleanpanda()
        }

        var rnkey = randomNumber(0, 9) // рандомное ч от 0 до 9
        //alert("сгенерировали число"+rnkey)
        var flag3139 = localStorage.getItem("p" + rnkey)
        //alert("проверяем 1-было 0-нет:"+flag3139)

        if (flag3139 == 1) {
            //если число было 
            //alert("типа было")
            panda()
        } else {

            //если небіло то подставляем
            //alert("типа НЕбыло")
            //alert("p"+rnkey)
            localStorage.setItem("p" + rnkey, 1);

            schet = localStorage.getItem("pp") + 1
            localStorage.setItem("pp", schet);
            //document.getElementById('unlock').value=rnkey

            if (document.getElementById('body').innerHTML.indexOf("У вас осталось бесплатных отмычек:") > 0) {
               
                //alert("У вас осталось бесплатных отмычек:")
                var qw = "<form method='POST' name='panda11'>"
                qw += " <input type='hidden' name='cmd' value='do_free'>"
                qw += "<input type='hidden' name='k' value=" + set_kParam + ">"
                qw += "<input type='text' value=" + rnkey + " name='unlock' ></form>"
                document.getElementById('body').innerHTML += qw
				alert("использовать бесплатную отмычку?")//123
                setTimeout("document.panda11.submit()", randomNumber(500, 2000));
            } else {
                //alert("У вас нет бесплатных отмычек:")
                cleanpanda()
            }





        }

    }
}
pismo3168()

function pismo3168() {
    if (document.URL.indexOf("school.php?m=bday&part=101&special=1") > 0) {
        var obj = document.getElementsByClassName("grbody")[1];
        var count = obj.innerHTML.match(/_(?=[^_])/g).length;
        //var count2 = obj.innerHTML.match(/<\/b>.*?<b>/g).length; // от жирного до жирного 85
        var count3 = obj.innerHTML.match(/_.*?<b>/g).length; // от жирного до жирного осталось
        var bbcount3 = 100 - parseInt(count3 / (78 / 100))
        var bbcount = 100 - parseInt(count / (545 / 100))
        obj.getElementsByClassName("nopad")[0].innerHTML += " <br>Осталось собрать " + count3 + "<b class='icon ico_bday_letter' title='Кусок послания'></b>  из 78. пройдено " + bbcount3 + "%"

    }


}


if (options[70][1] == 1) {
    otpravlennie()
}

function otpravlennie() {
    if (document.URL.indexOf("post.php?m=new") > 0) {
/*
<input type="submit" class="cmd_all cmd_row4 cmd_arow4 " value="ОТПРАВИТЬ">

*/
        var sendpost = document.getElementById('body').getElementsByClassName('cmd_all cmd_row4 cmd_arow4 ')[0]
        sendpost.innerHTML = "<input type='button' onClick='submit22()' class='cmd_all cmd_row4 cmd_arow4 ' value='ОТПРАВИТЬ+исх'>" //заменяем кнопку

    }
    //http://g1.botva.ru/post.php?m=new
}

function submit22() {

    var frm1 = document.getElementById('body').getElementsByTagName('form')[0]
    to = frm1.getElementsByTagName('input')[2].value
    tema = frm1.getElementsByTagName('input')[3].value
    text3211 = frm1.getElementsByTagName('textarea')[0].value
    data = Date()
	  current_date = new Date();
  data= current_date.getDate() + "." + (current_date.getMonth()+1) + ".11 "+ current_date.getHours() +   ":" + current_date.getMinutes() 
	
    //var otprav = data + " Кому:<font color='blue'>" + to + "</font> Тема:<b>" + tema + "</b><br>" + text3211 + "<br>***<br>"

var r="row_1"	
if (localStorage.getItem('row')==1	){
var r="row_2"	
localStorage.setItem('row',2)
}else{
localStorage.setItem('row',1)
}

	var otprav="<tr class='"+r+"'> <td class='c1'>*</td>  <td class='c2'>"+data+"</td><td> <b class='icon ico_mail'></b><b>"+to+"</b>   :    <br>    <b></b>    <br>    "+text3211+"  </td></tr>"
	
	
	
	
	//alert(otprav)
    //сохраняем письмо
    old = localStorage.getItem('otprav');
    otprav += old
    localStorage.setItem('otprav', otprav);
    frm1.submit() //отправляем письмо


}

function replacekparam() {
/*
//<![CDATA[
$(document).ready(function(){
    $('.topmenu ul li').hover(
        function() {
            
            $(this).find('ul:first').stop(true, true);
            $(this).find('ul:first').slideDown();
        },
        function() {            
            $(this).find('ul:first').slideUp('fast'); 
        }
    );    
    $('.topmenu li:has(ul)').find('a:first').append('<img border="0" align="right" src="images/arrow-small.gif" alt="" />');//Картинка стрелочка
});
//]]>
*/
    var kParamnew = localStorage.getItem('kParam');
	//alert(kParamnew)
    var kParamold = set_kParam
    if (kParamold !== kParamnew) {
        //alert("разное")
        
		if(kParamnew === undefined){
		//несрослось
		}else{
		document.body.innerHTML = document.body.innerHTML.replace(new RegExp(kParamold, 'ig'), kParamnew);
        set_kParam = kParamnew
		}
    }

}


 birzha()
function birzha(){
if (document.URL.indexOf("/harbour.php?a=market") > 0) {

var lot3479 = document.getElementById('body').getElementsByClassName('default bmarket_clan_buy_table')[0]



for (i = 0; i < lot3479.rows.length; i++) { // чтоб небіло ошибки когда обана никого нема

  var lotname = lot3479.rows[i].cells[0].innerHTML // назва лота
  var lot3486 = parseInt(lot3479.rows[i].cells[1].innerHTML.match(/(\d*)<b/)[1]) // значение лота
  
//      1852<b class="iconsp item_pandora" title="Сундучок Пандоры"></b>(/уровень.\s(\d*)/)[1]
	if (localStorage.getItem(lotname)){
	//alert(localStorage.getItem(lotname)+"***"+lot3486)
	
	
		if(localStorage.getItem(lotname)>lot3486){
		var zn='-'
		var razn=localStorage.getItem(lotname)-lot3486
		}else{
	if(localStorage.getItem(lotname)<lot3486){
		var zn='+'
		var razn=lot3486-localStorage.getItem(lotname)
		}else{
		var zn=localStorage.getItem("zn"+lotname)
		var razn=localStorage.getItem("razn"+lotname)
		//zn='+'
			}}
			
			
			}
			
			if (zn=='+'){
			var zn11="<font color='red'><b>["+zn+"]"+razn+"</b></font>"
			}else{
			var zn11="<font color='blue'><b>["+zn+"]"+razn+"</b></font>"
			}
				lot3479.rows[i].cells[1].innerHTML+=zn11
			localStorage.setItem("zn"+lotname, zn)
			localStorage.setItem("razn"+lotname, razn)
localStorage.setItem(lotname, lot3486)
 // alert(lot3486)                  

}

var bb
//ББП  1, 3,5,6
bb='<table><body><tr><td>'
bb+="<form method='post' action=''>";bb+="<input type='hidden' name='k' value='"+KEY+"'>";bb+="<input type='hidden' name='do_cmd' value='buy'>"
bb+="<input type='hidden' name='type' value='50101'>";bb+="<input type='hidden' value='1' name='amount'>"
bb+="<b class='icon ico_ticket2'></b><input type='submit' class='cmd_all cmd_mini_sl cmd_amini_sl' value='1'>"
bb+='</td><td>'
bb+="<form method='post' action=''>";bb+="<input type='hidden' name='k' value='"+KEY+"'>";bb+="<input type='hidden' name='do_cmd' value='buy'>"
bb+="<input type='hidden' name='type' value='50101'>";bb+="<input type='hidden' value='3' name='amount'>"
bb+="<input type='submit' class='cmd_all cmd_mini_sl cmd_amini_sl' value='3'>"
bb+='</td><td>'
bb+="<form method='post' action=''>";bb+="<input type='hidden' name='k' value='"+KEY+"'>";bb+="<input type='hidden' name='do_cmd' value='buy'>"
bb+="<input type='hidden' name='type' value='50101'>";bb+="<input type='hidden' value='4' name='amount'>"
bb+="<input type='submit' class='cmd_all cmd_mini_sl cmd_amini_sl' value='4'>"
bb+='</td><td>'
bb+="<form method='post' action=''>";bb+="<input type='hidden' name='k' value='"+KEY+"'>";bb+="<input type='hidden' name='do_cmd' value='buy'>"
bb+="<input type='hidden' name='type' value='50101'>";bb+="<input type='hidden' value='5' name='amount'>"
bb+="<input type='submit' class='cmd_all cmd_mini_sl cmd_amini_sl' value='5'>"
bb+='</td><td>'
bb+="<form method='post' action=''>";bb+="<input type='hidden' name='k' value='"+KEY+"'>";bb+="<input type='hidden' name='do_cmd' value='buy'>"
bb+="<input type='hidden' name='type' value='50101'>";bb+="<input type='hidden' value='6' name='amount'>"
bb+="</b><input type='submit' class='cmd_all cmd_mini_sl cmd_amini_sl' value='6'>"
bb+='</td><td>'
bb+="<a href='/smith.php?a=ownshaman&magic=120'  title='На большой поляне 4 спрятанных кристалла становятся очищенными.'><b class='icon ico_magic120'></b></a>"
bb+='</td></tr>'
//РП  1, 3,5,6
bb+='<tr><td>'
bb+="<form method='post' action=''>";bb+="<input type='hidden' name='k' value='"+KEY+"'>";bb+="<input type='hidden' name='do_cmd' value='buy'>"
bb+="<input type='hidden' name='type' value='50100'>";bb+="<input type='hidden' value='1' name='amount'>"
bb+="<b class='icon ico_ticket1'></b><input type='submit' class='cmd_all cmd_mini_sl cmd_amini_sl' value='1'>"
bb+='</td><td>'
bb+="<form method='post' action=''>";bb+="<input type='hidden' name='k' value='"+KEY+"'>";bb+="<input type='hidden' name='do_cmd' value='buy'>"
bb+="<input type='hidden' name='type' value='50100'>";bb+="<input type='hidden' value='3' name='amount'>"
bb+="<input type='submit' class='cmd_all cmd_mini_sl cmd_amini_sl' value='3'>"
bb+='</td><td>'
bb+="<form method='post' action=''>";bb+="<input type='hidden' name='k' value='"+KEY+"'>";bb+="<input type='hidden' name='do_cmd' value='buy'>"
bb+="<input type='hidden' name='type' value='50100'>";bb+="<input type='hidden' value='4' name='amount'>"
bb+="<input type='submit' class='cmd_all cmd_mini_sl cmd_amini_sl' value='4'>"
bb+='</td><td>'
bb+="<form method='post' action=''>";bb+="<input type='hidden' name='k' value='"+KEY+"'>";bb+="<input type='hidden' name='do_cmd' value='buy'>"
bb+="<input type='hidden' name='type' value='50100'>";bb+="<input type='hidden' value='5' name='amount'>"
bb+="<input type='submit' class='cmd_all cmd_mini_sl cmd_amini_sl' value='5'>"
bb+='</td><td>'
bb+="<form method='post' action=''>";bb+="<input type='hidden' name='k' value='"+KEY+"'>";bb+="<input type='hidden' name='do_cmd' value='buy'>"
bb+="<input type='hidden' name='type' value='50100'>";bb+="<input type='hidden' value='6' name='amount'>"
bb+="</b><input type='submit' class='cmd_all cmd_mini_sl cmd_amini_sl' value='6'>"
bb+='</td><td>'
bb+="<a href='/smith.php?a=ownshaman&magic=119'  title='На малой поляне 1 спрятанный кристалл становятся очищенными.'><b class='icon ico_magic119'></b></a>";
bb+='</td></tr>'
//РП  1, 3,5,6
bb+='<tr><td>'
bb+="<form method='post' action=''>";bb+="<input type='hidden' name='k' value='"+KEY+"'>";bb+="<input type='hidden' name='do_cmd' value='buy'>"
bb+="<input type='hidden' name='type' value='50103'>";bb+="<input type='hidden' value='1' name='amount'>"
bb+="<b class='icon ico_trade1'></b><input type='submit' class='cmd_all cmd_mini_sl cmd_amini_sl' value='1'>"
bb+='</td><td>'
bb+="<form method='post' action=''>";bb+="<input type='hidden' name='k' value='"+KEY+"'>";bb+="<input type='hidden' name='do_cmd' value='buy'>"
bb+="<input type='hidden' name='type' value='50103'>";bb+="<input type='hidden' value='3' name='amount'>"
bb+="<input type='submit' class='cmd_all cmd_mini_sl cmd_amini_sl' value='3'>"
bb+='</td><td>'
bb+="<form method='post' action=''>";bb+="<input type='hidden' name='k' value='"+KEY+"'>";bb+="<input type='hidden' name='do_cmd' value='buy'>"
bb+="<input type='hidden' name='type' value='50103'>";bb+="<input type='hidden' value='4' name='amount'>"
bb+="<input type='submit' class='cmd_all cmd_mini_sl cmd_amini_sl' value='4'>"
bb+='</td><td>'
bb+="<form method='post' action=''>";bb+="<input type='hidden' name='k' value='"+KEY+"'>";bb+="<input type='hidden' name='do_cmd' value='buy'>"
bb+="<input type='hidden' name='type' value='50103'>";bb+="<input type='hidden' value='5' name='amount'>"
bb+="<input type='submit' class='cmd_all cmd_mini_sl cmd_amini_sl' value='5'>"
bb+='</td><td>'
bb+="<form method='post' action=''>";bb+="<input type='hidden' name='k' value='"+KEY+"'>";bb+="<input type='hidden' name='do_cmd' value='buy'>"
bb+="<input type='hidden' name='type' value='50103'>";bb+="<input type='hidden' value='6' name='amount'>"
bb+="</b><input type='submit' class='cmd_all cmd_mini_sl cmd_amini_sl' value='6'>"
bb+='</td></tr></body></table>'
document.getElementById('body').getElementsByClassName('grbody')[0].innerHTML=bb+document.getElementById('body').getElementsByClassName('grbody')[0].innerHTML



/*<select id="want_to_buy" name="type">
  <option value="50103" id="op_0">Ртутный порошок</option>
  <option value="50020" id="op_2">Кристалл</option>
  <option value="50010" id="op_3">Раб людишко</option>
  <option value="50100" id="op_4">Билет на маленькую поляну</option>
  <option value="50101" id="op_5">Билет на большую поляну</option>
  <option value="50104" id="op_6">Сундучок Пандоры</option>
</select>*/

}}

 if (options[75][1] == 1) {
polyana()
}
function polyana(){ //нажимает кнопку "вслепую" через рандомную паузу 
if (document.URL.indexOf("/mine.php?a=mine&m=start&t=") > 0 ||document.URL.indexOf("/mine.php?a=mine&m=restart") > 0) {
if (document.getElementById('body').innerHTML.indexOf("Попыток осталось:") > 0) {

setTimeout('openBBP()', randomNumber(options[66][1], options[67][1])); //ВСЛЕПУЮ
 } 
}else{
					
					
if (document.URL.indexOf("/mine.php?a=mine&m=random") > 0) {					
setTimeout('restartBBP()', randomNumber(options[66][1], options[67][1])); //ВСЛЕПУЮ таймаут минимальный-средний

}


}				
					
}

function openBBP(){
alert("вслепую?")//123
window.location = "http://" + window.location.hostname + "/mine.php?a=mine&m=random&k="+KEY
}
function restartBBP(){

//if (localStorage.getItem("bbp")==1){
alert("открыть поляну?")//123
localStorage.setItem("bbp",0)
window.location = "http://" + window.location.hostname + "/mine.php?a=mine&m=restart&k="+KEY


//}

}
if (options[76][1] == 1) {
		dozor10min()
}
function dozor10min(){

if (document.URL.indexOf("/dozor.php?&r2") > 0) {					

if (document.getElementById('body').innerHTML.indexOf("осталоcь времени: 0") > 0) {					
//alert("нет минут дозора")
}else{

document.getElementById('body').innerHTML+="<form action='?' method='POST' name='doz10'> <input type='hidden' name='k' value='"+KEY+"'> <input type='hidden' name='auto_watch' value='1'>    </form>"
document.doz10.submit()

}




}

}
