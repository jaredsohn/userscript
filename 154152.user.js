// ==UserScript==
// @name        Yaplakal без проплаченых тем
// @namespace   dev/null
// @author      Poxer
// @include     http://www.yaplakal.com/
// @include     http://www.yaplakal.com/st*
// @grant       none
// @version     0.1.0 - 2012-12-12
// ==/UserScript==

//на каждую тему, приходится три элемента:
//TR где className = 'newshead' (заголовок темы, здесь находится элемент с оценкой темы)
//TR где className = 'postcolor news-content' (внутренняя часть темы, здесь ничего интересного для исследования)
//TR где className = 'holder newsbottom' (информация:ник топикстартера, имя раздела, и т.п.)
//и так далее по порядку.

//////////////здесь можно редактировать списки//////////////////
//рекламирующие пользователи
var array_advert_users = ["shkura", "labean", "labean9", "labeanno", "leBouton", "ShOleg", "Administration", "Shum", "ostolop"];
// рекламные разделы
var array_advert_sections = ["ЯП-Обзор"];
//значение, ниже которого считаем, что пост с плохой оценкой
var normal_rating_minvalue = 30;
////////////////////////////////////////////////////////////////

//статистические переменные, для проверки эффективности.
var total_count = 0;
var total_hide_count = 0;
var hide_by_user_count = 0;
var hide_by_section_count = 0;
var hide_by_norating_count = 0;
var hide_by_badrating_count = 0;

//сравнивает с рекламными никами
function isAdvertUser(_name) {
    for (var i = 0; i < array_advert_users.length; i++) {
        if (array_advert_users[i] == _name) return true;
    }
    return false;
}
//сравнивает с рекламными разделами
function isAdvertSection(_name) {
    for (var i = 0; i < array_advert_sections.length; i++) {
        if (array_advert_sections[i] == _name) return true;
    }
    return false;
}
//скрывает элемент
function hideElem(elem)
{
    if (elem != null) elem.style.display = 'none';
}
//скрывает элементы от начально индекса first до конечного индекса last
function hideElems(node_list, first, last) {
    for (var i = first; i <= last; i++) {
        hideElem(node_list[i]);
    }
}
//если тема не скрыта, добавляем к общему счетчику
function incToTotalHideCount(_node) {
    if (_node != null)
        if (_node.style.display != 'none')
            total_hide_count++;
}

//инициализация
var node_list_TR = document.getElementsByClassName('lenta')[0].children[0].children;
var cur_TR;
var cur_node;
var node_list_rating;
var is_bad_or_no_rating = false;
var last_topic_index = 0;

for (var i = 0; i < node_list_TR.length; i++) {
    cur_TR = node_list_TR[i];
    cur_node = cur_TR.children[0];
    //фильтруем по плохим рейтингам или их отсутствии
    if (cur_node.className == 'newshead') {
        last_topic_index = i;
        node_list_rating = cur_node.getElementsByClassName('rating-short-value');
        //если рейтинг отсутствует
        if (node_list_rating.length == 0) {
            //помечаем что рейтинг неподходящий
            is_bad_or_no_rating = true;
            hide_by_norating_count++;
        }
        else {
            //если рейтинг плохой
            if (parseInt(node_list_rating[0].children[0].text) < normal_rating_minvalue) {
                //помечаем что рейтинг неподходящий
                is_bad_or_no_rating = true;
                hide_by_badrating_count++;
            }
        }
    }
    //фильтр по топикстартеру или по разделу
    if (cur_node.className == 'holder newsbottom') {
        total_count++;
        //фильтруем по имени ника
        if (isAdvertUser(cur_node.getElementsByClassName('icon-user')[0].children[0].text)) {
            incToTotalHideCount(cur_TR);
            hideElems(node_list_TR, last_topic_index, i);
            hide_by_user_count++;
        }
        //фильтруем по разделу 
        if (isAdvertSection(cur_node.getElementsByClassName('icon-forum')[0].children[0].text)) {
            incToTotalHideCount(cur_TR);
            hideElems(node_list_TR, last_topic_index, i);
            hide_by_section_count++;
        }
        //если была пометка, что тема с плохим или отсутствующим рейтингом
        if (is_bad_or_no_rating) {
            hideElems(node_list_TR, last_topic_index, i);
            is_bad_or_no_rating = false;
        }
    }
}

//Для проверки эффективности работы скрипта - убрать комментирование

//alert(
//'Всего тем на странице: ' + total_count.toString() + '\n' +
//'Всего удалено ' + total_hide_count.toString() + ' (' + (total_hide_count * 100/total_count).toString() + '%)\n' +
//'По топикстартеру: ' + hide_by_user_count.toString() + '\n' +
//'По разделу: ' + hide_by_section_count.toString() + '\n' +
//'С плохим рейтингом: ' + hide_by_badrating_count.toString() + '\n' +
//'Без рейтинга: ' + hide_by_norating_count.toString() + '\n'
//    );

