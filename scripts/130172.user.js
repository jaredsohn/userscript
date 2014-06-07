// ==UserScript==
// @name mk-salary-percent
// @namespace http://mk.pisem.net/greasemonkey/
// @description Shows current/city salary percentage with color: "green" for "optimal" (80%..81%), "red" for "dangerous" (<80%), "yellow" for "moderate" (81%..100%), "orange" for "excessive" (>100%).
// @include http://virtonomica.ru/*/main/unit/view/*
// @exclude http://virtonomica.ru/*/main/unit/view/*/supply
// @exclude http://virtonomica.ru/*/main/unit/view/*/trading_hall
// ==/UserScript==

/*
    [http://wiki.greasespot.net/DOMContentLoaded]

    The code in a Greasemonkey user script gets invoked when the DOMContentLoaded event fires which happens when the DOM (HTML content of the page) is loaded.

    Simple speaking Greasemonkey user script is executed _after_ any other (embedded or external) script referenced by the page.
*/

//GM_log("'mk-sale-percent' started");

var cells = document.getElementsByTagName('td');

for (var i = 0; i < cells.length; i++) {
    var cell = cells[i];
    if (cell.className != "title") {
	continue;
    }
    var cell_textContent = cell.textContent;
    if((cell_textContent != "Зарплата учёных") // laboratory/лаборатория
    && (cell_textContent != "Зарплата работников") // farm/ферма
    && (cell_textContent != "Зарплата рабочих") // factory/завод
    && (cell_textContent != "Зарплата одного сотрудника")) { // office/офис
	continue;
    }
    //GM_log("cell.innerHTML=" + cell.innerHTML);

    var salary_td = cell.nextElementSibling;
    //GM_log("salary_td.innerHTML=" + salary_td.innerHTML);
    var salary_td_textContent = salary_td.textContent;
    //GM_log("salary_td_textContent=" + salary_td_textContent);

    var salary = salary_td_textContent.replace(/\(.*/, '').replace(/[^.0-9]/g, '');
    var city_salary = salary_td_textContent.replace(/.*\(/, '').replace(/[^.0-9]/g, '');
    //GM_log("salary=" + salary + " city_salary=" + city_salary);

    var percent = salary * 100. / city_salary;
    percent = Math.round(percent * 100) / 100;

    var span = document.createElement('span');
    span.textContent = " " + percent + "%";
    salary_td.appendChild(span);

    if (percent < 80) {
	span.style.color = "red";
    } else if (percent < 81) {
	span.style.color = "green";
    } else if (percent > 100) {
	//span.style.color = "orange";
	span.style.color = "#FF00FF"; // Fuchsia

	//span.style.backgroundColor = "lightgray";
	//span.style.backgroundColor = "silver"; // "#C0C0C0"; // != "lightgray"
	//span.style.backgroundColor = "gray"; // "#808080";
	//span.style.backgroundColor = "black";
    } else {
	span.style.color = "yellow"; // "#FFFF00"; // almost invisible on white background
	// Note: yellow is almost invisible on white background

	//span.style.backgroundColor = "lightgray";
	//span.style.backgroundColor = "silver"; // "#C0C0C0"; // != "lightgray"
	//span.style.backgroundColor = "gray"; // "#808080";
	span.style.backgroundColor = "black";
    }

    break;
}

//GM_log("'mk-sale-percent' finished");
