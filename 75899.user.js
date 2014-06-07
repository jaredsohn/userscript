// ==UserScript==
// @name           virtonomica:Salary & Education
// @namespace      virtonomica
// @description    Облегчение установку зарплат на странице управления персоналом
// @description    Облегчение установку обучения
// @description    - установка зарплаты по требуемой квалификации 1:1
// @description    - установка зарплаты по среднегородской 100%
// @description    - увеличение зарплаты на 1%
// @version        1.3
// @include        http://virtonomic*.*/*/main/company/view/*/unit_list/employee
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
  
    $.get(url, function(data){
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
      case "100%" : {
        Sreq = Savg;
        break;
      }
      case "+1%" : {
        Sreq = S * 1.01;
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
  }//end function setSalary
  
  function setEducation(url, objLevel, srcElement){
    $.get(url, function(data){
      var quantity = $("#unitEmployeesData_employees", data).val();
      var time = $("#unitEmployeesData_timeCount", data).val();
      
      if(quantity != undefined && time != undefined){
        $.ajax({url : url, type : "post", data : {'unitEmployeesData[employees]' : quantity, 'unitEmployeesData[time_count]' : 4}, success : function(){
          objLevel.append($("<br>"));
          objLevel.append($("<img>"));
          objLevel.append($("<img>"));
          objLevel.append($("<img>"));
          objLevel.append($("<img>"));
          $("img", objLevel).attr({src:'/img/page_ico.gif', title:'Оставшиеся недели обучения', alt:'Оставшиеся недели обучения'});
          srcElement.style.border = "1px solid red";
          srcElement.title = "Отменить обучение";
        }});
      } else {
        if($("img", objLevel).length == 4){
          $.get(url + "/cancel", function(){
            srcElement.style.border = "0px";
            srcElement.title = "Обучить весь персонал 4 недели";
            for(var i = objLevel[0].childNodes.length - 1; i > 2;i--){//удаляем лишиние элементы
              var o = objLevel[0].childNodes.item(i);
              objLevel[0].removeChild(o);
            }
          });
        }
      }//end else
    });//end get
  }//end function setEducation
  
  $("table.list tr[class]:has(:checkbox)").each(function(){
    var url = $("td a:contains('Сотрудники')", this).attr('href');
    var objSalary = $("td:eq(6)", this);
    var objLevel = $("td:eq(8)", this);
    var container = $("td > div:contains('Сотрудники')", this);
    container.empty().append($("<span>").text("100%").attr({title:'Среднегородская зарплата'}).click(function(){
      setSalary(url, objSalary, objLevel, "100%");
    }));
    container.append($("<span>").text("1 : 1").attr({title:'Согласно требуемой квалификации'}).click(function(){
      setSalary(url, objSalary, objLevel, "1:1");
    }));
    container.append($("<span>").text("+1%").attr({title:'+1% от текущей зарплаты'}).click(function(){
      setSalary(url, objSalary, objLevel, "+1%");
    }));
    
    var length = $("img", objLevel).length;
    if( length == 0 || length == 4){
      container.prepend($("<img>").attr({src: "/img/reward/16/diploma.gif", title:'Обучить весь персонал 4 недели'}).css({position:'relative', top:'5px',margin:'0px', paddingLeft:'2px', paddingRight:'2px', cursor:'pointer', border:'0px', borderRadius:'3px'}).click(function(e){
        if (window.event) e = window.event;
        var srcEl = e.srcElement? e.srcElement : e.target;
        /(.*)window(.*)engage(.*)/.exec(url);//url обучения
        urlEducation = RegExp.$1 + "window/unit/employees/education" + RegExp.$3;
        setEducation(urlEducation, objLevel, srcEl);
      }));
    }
    if(length == 4) $("img", container).css({border:'1px solid red'}).attr({title:'Отменить обучение'});

    $("span",container).css({fontSize:'75%',margin:'3px', padding:'2px', border:'1px solid #2222ff', borderRadius:'3px', cursor:'pointer'}).hover(function () {this.style.color = 'red';},function () {this.style.color = 'black';});
  });
}


// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);