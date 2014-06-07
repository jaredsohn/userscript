﻿/*
	Программный продукт предоставляется по принипу "как есть", 
	автор не несёт никакой ответственности за последствия 
	использования данного программного продукта, в том числе 
	неполучение прибыли или иных доходов от его использования, 
	или использование его в противозаконных целях.
	Программный продукт полностью бесплатен, поддержки не предлагается.
*/
//
// ==UserScript==
// @author				alexg
// @name 				OldStyle Silver for NNTT.ORG 
// @version				1.0
// @include 			http://nntt.org/*
// @include 			http://www.nntt.org/*
// ==/UserScript==
//
@charset "utf-8";

/*
  Видоизменённый стиль nnttSilver для NNTT.ORG
  alexg, 2012
  v 1.0

  Элементы этого файла переопределяют значения соответствующих
  свойств для элементов интерфейса. Здесь указываются лишь те
  значения параметров стиля,  которые необходимо изменить в стиле
  сайта по умолчанию. Остальные параметры стиля браузер берёт из
  стиля, установленного в "Личном разделе" форума.

  Важно!
  Чтобы браузер использовал значения из этого файла, а не применял
  значения стиля по-умолчанию, параметры в этом файле должны
  оканчиваться на !important. Если вы захотите внести в файл
  какое-нибудь изменение, не забудьте про это. Так же не забудьте
  про точку с запятой в конце каждого параметра.

  Пожалуйста помните, что некоторые стили из этого файла определяют
  парметры нескольких (разных) элементов интерфейса. Здесь в
  комментариях указаны лишь основные элементы, на которые влияют
  изменения. Будьте внимательны.
 */

/* Вспомогательные элементы */
table {
    border-collapse: collapse !important;
}

/* Убираем картинки в плашках форумов на главной */
.forum_list .category {
    background-image: none !important;
    background-color: #749AAB !important;
}

/*
  Убираем рамки вокруг содержимого страницы
  .pagecontent {
  background: none !important;
  border: none !important;
  }
 */

/* Улучшаем цитирование */
.blockquote {
    margin: 5px 2px !important;
    border: none !important;
    background: none !important;
    padding: 0 !important;
}
.quote_author {
    font-size: 0.85em !important;
    font-style: normal !important;
    font-weight: bold !important;
    padding: 0 5px !important;
}
.quote_text {
    border: 1px solid #C3CBD1 !important;
    background: #F5F5F5 !important;
    padding: 5px 15px !important;
    font-size: 1.0em !important;
}

/* Улучшаем спойлеры */
.spoiler-head {
    font-weight: normal !important;
}
.spoiler-wrap {
    border-width: 1px !important;
    margin: 5px 2px !important;
    padding: 0 !important;
}
.spoiler-body {
    padding: 10px 15px !important;
}
.spoiler-foot {
/* Исправляем баг футера (нет отрисовки нижней границы) */
    border-top: 1px solid #C3CBD1 !important;
    font-weight: normal !important;
    margin: 0 -15px -10px -15px !important;
}

/* Улучшаем сегмент "Код" */
.codecontent {
    border-width: 1px !important;
    margin: 5px 2px !important;
    padding: 5px 10px !important;
    color: #28903b !important;
}

/* Улучшаем списки */
.postbody li, ol, ul {
    margin: 0px 0px 0px 10px !important;
}

/* Убираем рамочки вокруг номеров страниц тем */
ul.mini_pagination li {
    border: none !important;
    background: none !important;
}

/* Убираем рамочки вокруг номеров страниц тем внизу и вверху страницы */
ul.pagination li {
    border: none !important;
    background: none !important;
}

/* Уберём смещение активной цифры вниз */
ul.pagination li.active {
    margin: 0 !important;
}

/* Вернём сетку таблицам в "Моих сообщениях" */
.bb {
    border: 1px solid #C3CBD1 !important;
}

/* Вернём сетку таблицам в "Личном кабинете" */
.bl, .br {
    border: 1px solid #C3CBD1 !important;
}

/* Вернём сетку таблицам в "Поиске" */
.p4 {
    border: 1px solid #C3CBD1 !important;
}

/* Убираем промежуток между постами */
.spacer {
    display: none;
}

/* Убираем баг с отступами в подписи */
.signature * {
    margin: 0 !important;
    padding: 0 !important;
}

/* Поправим стиль привлекающей внимание полоски при получении ЛС */
.newpm2 {
    border: 1px solid #B16623 !important;
    background-color: #FDDBB5 !important;
}

/*
  Стиль основных фонов на страницах тем
  .c4 {
  background-color: #fbfbfb !important;
  }
  .c2 {
  background-color: #f0f0f0 !important;
  }
 */

/* Цвет фона в заголовках таблиц */
.table_title {
    background-color: #749AAB !important;
}

/* Шрифты для основного контента страниц форума (писанина, проще сказать) */
.postbody {
    font-family: "Verdana", "Arial", sans-serif !important;
}

/* end of file */