// ==UserScript==
// @name           virtonomica:Salary Expert (edited by Zemchik)
// @namespace      virtonomica
// @description    оригинальный скрипт http://userscripts.org/scripts/show/75899
// @description    Облегчение установки зарплат на странице управления персоналом
// @description    - установка зарплаты по требуемой квалификации, с ограничением // @description    не ниже 80% средне городской (1:1) и без ограничения (1:1*)
// @description    - установка зарплаты по среднегородской 100%
// @description    - увеличение/уменьшение зарплаты на 1%
// @version        1.1
// @include        http://virtonomica.ru/*/main/company/view/*/unit_list/employee
// @include        http://igra.aup.ru/*/main/company/view/*/unit_list/employee
// @include        http://virtonomica.by/*/main/company/view/*/unit_list/employee
// @include        http://virt.everego.com/*/main/company/view/*/unit_list/employee
// ==/UserScript==

var run = function() {

  // "округляем" зарплату на 1 сотую вверху
  function getSalary( sal) {
    return (Math.floor(sal *100) +1)/100;
  }

  var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
  $ = win.$;
  
  function setSalary(url, objSalary, objLevel, action){

    objSalary.empty().append($('<img>').attr({'src': 'http://s3.devels.info/load.gif', 'height': 16, 'width': 16}).css('padding-right', '20px'));
  
    $.get(url, function my(data){
      var quantity = $("#quantity", data).val();
      var S = new Number($("#salary", data).val());
      var Savg = /([\D]+)([\d\s]+\.*\d*)/.exec($("table.list td:contains(Средняя зарплата)", data).text())[2].replace(" ", "");
      var Q = $("#apprisedEmployeeLevel", data).text();
      /(\d+\.*\d+)\D*(\d+\.*\d+)/.exec($("span:contains(требуется)", data).text() );
      var Qavg = new Number(RegExp.$1);
      var Qreq = new Number(RegExp.$2);
      var Sreq = S;
      
      switch (action) {
      case "1:1" : {
        var k = S/Savg;
        var k1 = k*k;
        if(k <= 1){
          b = (Q/k1);
          Sreq = Math.sqrt(Qreq/b)*Savg;
          // если зарплата превысила среднею
          if( Sreq/Savg > 1){
            b = b / Qavg;
            b = 2 * Math.pow(0.5, b);
            Sreq = (Math.pow(2, Qreq/Qavg)*b - 1)*Savg;
          }
        } else {
          b = (k+1)/Math.pow(2, Q/Qavg);
          Sreq = (Math.pow(2, Qreq/Qavg)*b - 1)*Savg;
          // если зарплата стала меньше средней;
          if(Sreq/Savg < 1){
            b = Qavg * Math.log(b/2)/Math.log(0.5);
            Sreq = Math.sqrt(Qreq/b)*Savg;
          }
        }
        
        // блокировка от потери обученности
        if (Sreq/Savg <= 0.80){
          Sreq = Math.floor(0.80 * Savg) + 1;
        }
        break;
      }
      case "1:1%" : {
        var k = S/Savg;
        var k1 = k*k;
        if(k <= 1){
          b = (Q/k1);
          Sreq = Math.sqrt(Qreq/b)*Savg;
          // если зарплата превысила среднею
          if( Sreq/Savg > 1){
            b = b / Qavg;
            b = 2 * Math.pow(0.5, b);
            Sreq = (Math.pow(2, Qreq/Qavg)*b - 1)*Savg;
          }
        } else {
          b = (k+1)/Math.pow(2, Q/Qavg);
          Sreq = (Math.pow(2, Qreq/Qavg)*b - 1)*Savg;
          // если зарплата стала меньше средней;
          if(Sreq/Savg < 1){
            b = Qavg * Math.log(b/2)/Math.log(0.5);
            Sreq = Math.sqrt(Qreq/b)*Savg;
          }
        }
        break;
      }
      case "100%" : {
        Sreq = Savg;
        break;
      }
      case "+1%" : {
        Sreq = S * 1.01;
        break;
      }
      case "-1%" : {
        Sreq = S / 1.01;
        break;
      }
      }//end switch
      
    //получаем новое значение квалификации
    /(.*)window(.*)engage(.*)/.exec(url);//url калькулятора
    var calcUrl = RegExp.$1 + "ajax/unit/employees/calc_new_lvl" + RegExp.$3;
    $.ajax({url : calcUrl, data:{employees:quantity, salary:Sreq},type:'get',dataType:'json',success:function(data){
      objLevel[0].childNodes.item(2).nodeValue = data["employees_level"];//заменяем значение квалы на странице
    }});
    
    //отправляем форму на сервер
    $.ajax({url : url, type : "post", data : {'unitEmployeesData[quantity]' : quantity, 'unitEmployeesData[salary]' : getSalary(Sreq)}, success : function(){//заменяем абсолютную и относительную ЗП на странице
      objSalary.empty().append($("<span>").text(getSalary(Sreq) + "$"));
      objSalary.append($("<br>"));
      objSalary.append($("<span>").text(Math.floor(Sreq/Savg*10000) / 100 + " %").css({'color':'rgb(111,165,55)','fontWeight':'bold','fontSize':'9px'}));
    }});
  });
  }
  
  $("table.list tr[class]:has(:checkbox)").each(function(){
    var url = $("td a:contains('Сотрудники')", this).attr('href');
    var objSalary = $("td:eq(6)", this);
    var objLevel = $("td:eq(8)", this);
//    $("span", objSalary).click(function(){setSalary(url, objSalary, objLevel)}).css({cursor: 'pointer'});
    var container = $("td > div:contains('Сотрудники')", this);
    container.append($("<br><br><span>").text("100%").click(function(){
      setSalary(url, objSalary, objLevel, "100%");
    }));
    container.append($("<span>").text("-1%").click(function(){
      setSalary(url, objSalary, objLevel, "-1%");
    }));
	container.append($("<span>").text("1 : 1").click(function(){
      setSalary(url, objSalary, objLevel, "1:1");
    }));
	container.append($("<span>").text("1 : 1*").click(function(){
      setSalary(url, objSalary, objLevel, "1:1%");
    }));
    container.append($("<span>").text("+1%").click(function(){
      setSalary(url, objSalary, objLevel, "+1%");
    }));
    $("span",container).css({fontSize:'75%',margin:'3px', padding:'2px', border:'1px solid #2222ff', borderRadius:'3px', cursor:'pointer'}).hover(function () {this.style.color = 'red';},function () {this.style.color = 'black';});
  });
}


// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);