// ==UserScript==
// @name           Virtonomics Salary Helper (Multi-Languages)
// @namespace      virtonomics
// @description	   Adds a few buttons to help adjust salaries in Virtonomics. Originally by edark, multi-language support and minor modification by Ixnad. 
// @version        0.1.1
// @include        http://virtonomics*.*/*/window/unit/employees/engage/*
// @include        http://*.virtonomic*.*/*/window/unit/employees/engage/*
// ==/UserScript==

var run = function () {
	// language specific
	var lang_tables = new Array();
	
	lang_tables['ru'] = {
		token_avg_salary: "Средняя зарплата",
		token_required: "требуется",
		reset: "RET",
		meet_requirement: "по квале"
	}
	lang_tables['cn'] = {
		token_avg_salary: "工资平均",
		token_required: "需要",
		reset: "重置",
		meet_requirement: "按需要"
	}
	lang_tables['en'] = {
		token_avg_salary: "Average city salary",
		token_required: "required",
		reset: "Reset",
		meet_requirement: "Meet Requirement"
	}
	lang_tables['fr'] = {
		token_avg_salary: "Salaire moyen",
		token_required: "il faut",
		reset: "Réinitialiser",
		meet_requirement: "Satisfaire à l'exigence"
	}
	lang_tables['es'] = {
		token_avg_salary: "Medio salario",
		token_required: "se exige",
		reset: "Reajustar",
		meet_requirement: "Satisfacer el Requisito"
	
	}
	lang_tables['de'] = {
		token_avg_salary: "Durchschnittliches Gehalt",
		token_required: "ist erforderlich",
		reset: "Reset",
		meet_requirement: "erfüllen die Anforderung"
	}
	
	// no need for unsafeWindow if we attch script directly
	//var win = (typeof (unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    //$ = win.$;
	
	// current language
	var lang;
	// jquery first match for the token test
	var first_match;
	
	// traverse the associative array and test the token from each element;
	for (var table in lang_tables) {
		// returned_object[0] has all the salary page text, so just need to check it instead
		// of all tds
		first_match = $('td:first:contains(' + lang_tables[table].token_avg_salary + ')');
 		if (first_match.length > 0) {
			// found our match
			lang = lang_tables[table];
			break;
		}
	}
	lang = lang_tables['en']

	// by default broswers insert tbody automatically if they find it missing, it appears in
	// the dom
	var container = $("table.list > tbody");
	var td = $("<td id='salary_buttons' colspan='2'>");
	// insert a new row containing the new cell at the begining of the container
	container.prepend($("<tr>").append(td));

	var old_salary = new Number($("#salary").val());
	var average_salary = /\d+\.?\d+/.exec(first_match.text());
	/(\d+\.?\d+)\D*(\d+\.?\d+)/.exec($("span:contains(" + lang.token_required + ")").text());
	var required_q = new Number(RegExp.$2);
	var token_q, salary;
	td.append($('<span>').text(lang.reset).click(function () {
		$("#salary").val(old_salary);
		appriseEmployeeLevel();
	}
	));
	td.append($('<span>').text("-5%").click(function () {
		$("#salary").val(Math.round($("#salary").val() * 95) / 100);
		appriseEmployeeLevel();
	}
	));
	td.append($('<span>').text("100%").click(function () {
		$("#salary").val(average_salary);
		appriseEmployeeLevel();
	}
	));
	td.append($('<span>').text("+5%").click(function () {
		$("#salary").val(Math.round($("#salary").val() * 105) / 100);
		appriseEmployeeLevel();
	}
	));
	td.append($('<span>').text(lang.meet_requirement).click(function () {
		count = 0;
		flag = true;
		token_q =  new Number($("#apprisedEmployeeLevel").text());
		salary =  new Number($("#salary").val());
		if (Math.abs(token_q - required_q) / (token_q - required_q) * Math.abs(salary - average_salary) / (salary - average_salary) > 0) $("#salary").val(salary + 10);
		//для случая когда зп больше средней
		else $("#salary").val(salary - 10);
		//для случая когда зп ниже средней
		appriseEmployeeLevel();
	}
	).ajaxSuccess(function () {
		if (count < 2 && flag) {
			var delta = (Number($("#apprisedEmployeeLevel").text()) - token_q) / (Number($("#salary").val()) - salary);
			var delta_salary = (required_q - (Number($("#apprisedEmployeeLevel").text()))) / delta;
			salary = Number($("#salary").val());
			token_q =  new Number($("#apprisedEmployeeLevel").text());
			$("#salary").val(Math.ceil(100 * (salary + delta_salary)) / 100);
			appriseEmployeeLevel();
			count++;
		}
		else flag = false;
	}
	));

  
	$("#salary_buttons > span").css({
		margin:'5px',
		padding:'3px',
		border:'1px solid #0184D0',
		WebkitBorderRadius: '3px',
		MozBorderRadius: '3px',
		BorderRadius: '3px',
		cursor:'pointer', 
	}).hover(function () {this.style.color = '#0184D0';},function () {this.style.color = 'black';});
}

// hack to make the original page's functions accessible
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);
