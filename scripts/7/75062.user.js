// ==UserScript==
// @name           Virtonomica: Установка уровня зарплат
// @namespace      virtonomica
// @version        1.0
// @description    Позволяет устанавливать уровень зарплаты в 100% от среднегородского или необходимый уровнь по квале
// @include        http://virtonomic*.*/*/window/unit/employees/engage/*
// ==/UserScript==

var run = function() {
  var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
  $ = win.$;
  
  var count = 0;
  var flag = false;
  var container = $("table.list > tbody");
  var td = $("<td id='salary_buttons' colspan='2'>");
  container.prepend($("<tr>").append(td));

  var old_salary = new Number($("#salary").val());
  var average_salary = /(\d+\.*\d+)/.exec($("td:contains(Средняя зарплата)").text())[1];
  /(\d+\.*\d+)\D*(\d+\.*\d+)/.exec($("span:contains(требуется)").text());
  var required_q = new Number(RegExp.$2);
  var current_q, salary;

  td.append($('<span>').text("RET").click(function (){
    $("#salary").val(old_salary);
    appriseEmployeeLevel();
  }));
  td.append($('<span>').text("-5%").click(function (){
    $("#salary").val(Math.round($("#salary").val() * 95)/100);
    appriseEmployeeLevel();
  }));
  td.append($('<span>').text("100%").click(function (){
    $("#salary").val(average_salary);
    appriseEmployeeLevel();
  }));
  td.append($('<span>').text("+5%").click(function (){
    $("#salary").val(Math.round($("#salary").val() * 105)/100);
    appriseEmployeeLevel();
  }));
  td.append($('<span>').text("по квале").click(function (){
    count = 0;
    flag = true;
    current_q  = new Number($("#apprisedEmployeeLevel").text());
    salary = new Number($("#salary").val());
    if(Math.abs(current_q - required_q)/(current_q - required_q)*Math.abs(salary - average_salary)/(salary - average_salary) > 0) $("#salary").val(salary + 10);//для случая когда зп больше средней
    else $("#salary").val(salary - 10);            //для случая когда зп ниже средней
    appriseEmployeeLevel();
  }).ajaxSuccess(function(){
      if(count < 2 && flag){
        var delta = (Number($("#apprisedEmployeeLevel").text()) - current_q)/(Number($("#salary").val()) - salary);
        var delta_salary = (required_q - (Number($("#apprisedEmployeeLevel").text())))/delta;
        salary = Number($("#salary").val());
        current_q = new Number($("#apprisedEmployeeLevel").text());
        $("#salary").val(Math.ceil(100*(salary + delta_salary))/100);
        appriseEmployeeLevel();
        count++;
      } else flag = false;
  }));

  $("#salary_buttons > span").css({margin:'5px', padding:'3px', border:'1px solid #2222ff', borderRadius:'3px', cursor:'pointer'}).hover(function () {this.style.color = 'red';},function () {this.style.color = 'black';});
}

// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);