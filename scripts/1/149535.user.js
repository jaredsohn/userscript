// ==UserScript==
// @name        Политический компас — фильтровать по вопросам
// @namespace   me
// @description Скрыть кандидатов в КС несогласных с вами по отдельным вопросам.
// @include     http://compass.cvk2012.org/candidates/?Compass*
// @version     1
// ==/UserScript==

GM_addStyle("#filterbar a { padding-left: 0.2em; padding-right: 0.2em; }");
GM_addStyle("#filterbar .active { background:red; color: white; }");

var questions =
    [ "Наиболее подходящий для России политический строй — парламентская республика.",
      "России нужны более высокие таможенные пошлины для защиты отечественного производителя в целом ряде отраслей экономики.",
      "Трудовая миграция иностранных граждан должна быть строго ограничена.",
      "Необходимо вынести большинство государственных учреждений из Москвы в другие крупные российские города.",
      "Оппозиционным политикам следует уделять основное внимание не массовым уличным мероприятиям, а участию в выборах на местном и региональном уровне.",
      "Бесплатная медицина и бесплатное образование относятся к числу важнейших, неприкосновенных социальных гарантий.",
      "Государства бывшего СССР относятся к сфере особых внешнеполитических интересов России.",
      "Необходимо существенно перераспределить бюджетные потоки в пользу регионов и муниципалитетов.",
      "Российская армия должна формироваться исключительно на контрактной основе.",
      "Плоская ставка подоходного налога должна сохраняться в течение длительного времени.",
      "Россия должна стремиться к тесной политической и экономической интеграции с Евросоюзом.",
      "Граждане должны иметь право свободно приобретать и владеть огнестрельным оружием.",
      "Единый государственный экзамен (ЕГЭ), при должном качестве администрирования, является оптимальной формой конкурсного отбора студентов вузов.",
      "В Конституции Российской Федерации должен быть закреплен особый статус русских как титульной нации.",
      "Партийные функционеры «Единой России» должны быть лишены права участия в выборах в постпутинской России.",
      "В системе местного самоуправления как можно большее количество должностей следует сделать выборными.",
      "Бюджетные дотации республикам Северного Кавказа важны для поддержания политической стабильности в этом регионе.",
      "Необходим пересмотр итогов приватизации.",
      "Государственные корпорации — это эффективный инструмент управления стратегическими отраслями национальной экономики.",
      "Существенная часть трудовой пенсии должна формироваться из накопительной части.",
      "Оскорбление религиозных чувств граждан должно быть уголовно наказуемым.",
      "Координационный совет российской оппозиции - это, прежде всего, альтернативный парламент.",
      "Уголовные дела должны рассматриваться исключительно коллегией присяжных.",
      "Роль государства в экономике должна быть сведена к минимуму.",
      "Координационный совет должен вести переговоры с властью и стремиться к достижению компромисса по широкому кругу вопросов." ]

unsafeWindow.toggleFilter = function(qindex) {

    var qlink = document.getElementById("q-filter-" + qindex);
    var nowactive = qlink.classList.toggle("active");

    var mydna = eval(document.getElementById("mycompass_data").innerHTML);
    var candidates = document.getElementsByClassName("candidates_item");

    for (var i=0; i < candidates.length; i++) {
        var c = candidates[i];
        var name = c.getElementsByClassName("title")[0].innerHTML.trim();
        var dna = eval(c.getElementsByClassName("candidate_compass_data")[0].innerHTML);
        var disagrees = dna[qindex]*mydna[qindex] < 0;
        if (nowactive && disagrees) {
            c.style.display = "none";
            // console.log(name + " disagrees on " + (qindex+1));
        } else {
            c.style.display = "block";
        }
    }
    return false;
}

function createFilterBar() {
    var candlist = document.getElementsByClassName("candidates_list_print")[0];
    var filterbar = document.createElement("div");
    filterbar.setAttribute("id","filterbar");
    candlist.parentNode.insertBefore(filterbar,candlist);
    filterbar.innerHTML = "Скрыть несогласных по вопросу ";

    for (var i=0; i<25; i++) {
        var lnk = document.createElement("a");
        lnk.setAttribute("href","#");
        lnk.setAttribute("title",questions[i])
        lnk.setAttribute("alt",questions[i])
        lnk.setAttribute("id", "q-filter-" + i);
        lnk.setAttribute("onclick", "return toggleFilter(" + i + ");");
        lnk.innerHTML = i+1;
        filterbar.appendChild(lnk)
    }
    return filterbar;
}

createFilterBar();
