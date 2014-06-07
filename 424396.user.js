/// Reference jquery-1.7.0.js
// ==UserScript==
// @name       Workers
// @namespace  Workers
// @version    0.1
// @description  Set workers qualification
// @include      http://*virtonomic*.*/*/main/company/view/*/unit_list/employee/salary
// @include      http://*virtonomic*.*/*/main/company/view/*/unit_list/employee
// @copyright  2013+, Maxwell
// ==/UserScript==

function addJQuery(callback){
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js");
    script.addEventListener('load', function(){
        var script = document.createElement("script");
        script.textContent = "jQuery.noConflict();(" + callback.toString() + ")();";
        document.body.appendChild(script);
        
    }, false);
    document.body.appendChild(script);
}

function workers_main(){
    
    // "округляем" зарплату на 1 сотую вверху
    function getSalary(sal){
        return (Math.floor(sal * 100) + 1) / 100;
    }
    
    function calc_salary(needQuality, currentQuality, currentSalary, cityQuality, citySalary){
    
        var my_salary = parseFloat(currentSalary), k = my_salary / citySalary, k1 = k * k, base, val, limit;
        
        if (k < 1) {
            base = (currentQuality / k1);
            val = Math.sqrt(needQuality / base) * citySalary;
            // если зарплата превысила среднею
            limit = val / citySalary;
            if (limit > 1) {
                base = base / cityQuality;
                base = 2 * Math.pow(0.5, base);
                val = (Math.pow(2, needQuality / cityQuality) * base - 1) * citySalary;
            }
        }
        else {
            base = (k + 1) / Math.pow(2, currentQuality / cityQuality);
            val = (Math.pow(2, needQuality / cityQuality) * base - 1) * citySalary;
            // если зарплата стала меньше средней
            limit = val / citySalary;
            if (limit < 1) {
                base = cityQuality * Math.log(base / 2) / Math.log(0.5);
                val = Math.sqrt(needQuality / base) * citySalary;
            }
        }
        // блокировка от потери обученности
        limit = val / citySalary;
        if (limit <= 0.80) {
            val = Math.floor(0.80 * citySalary) + 1;
        }
        val = getSalary(val);
        return val;
    }
    
    function doWork(pair, key, enableButton)
    {        
        setTimeout(function(){
            $.get(pair.personUrl, function(data){
            
                var cityQuality = parseFloat(/(\d+\.\d+)/.exec($("table tr td div span:eq(1)", data).text())[1]);
                
                var salary = calc_salary(pair.needQual, pair.currentQual, pair.currentSalary, cityQuality, pair.citySalary);
                
                if (!pair.id){
					debugger;
                }
				
                $.post(pair.url + 'window/unit/employees/engage/' + pair.id, 'unitEmployeesData[quantity]=' + pair.currentCount + '&unitEmployeesData[salary]=' + salary);
                console.log('set salary [' + salary + '] for [' + pair.id + ']');
                if (enableButton) {
                    buttonEnabled($('#arrangeSalary')[0]);
                    setTimeout(function(){location.reload();}, 1000);
                }
            }, "html");
        }, 1000 * key);
    }
    
    var ids = [], i = 0, regex = /(http:\/\/\w+\.virtonomic\w\.\w{2,3}\/vera\/)main\/unit\/view\/(\d+)/;
    
    $('table.list tbody > tr').each(function(){
    
        var currentQual = parseFloat($('td:eq(8)', this).text());
        var needQual = parseFloat($('td:eq(9)', this).text());
        if (currentQual <= needQual) {
            $('td:eq(8)', this).css("background-color", "red");
            
            var url = regex.exec($('td:eq(2) a', this).attr('href'));
            ids[i] = {
                'url': url[1],
                'id': url[2],
                'currentCount': parseFloat($('td:eq(4) a', this).text()),
                'currentSalary': parseFloat(/(\d+\.\d+)\$/.exec($('td:eq(6)', this).text())[1]),
                'citySalary': parseFloat($('#base_salary_' + url[2], this).val()),
                'currentQual': currentQual,
                'needQual': needQual + 0.01,
                'personUrl': $('td:eq(4) a', this).attr('href')
            };
            i++;
        }
    });
    
    $('#mainContent form table[class!=list]:eq(0)').after('<fieldset style="margin: 5px 0; height: 65px;">\
			<legend>Выравнивание ЗП</legend>\
			<table cellspacing="5" style="margin-top: 5px;">\
				<tbody><tr>\
					<td>\
						<input id="arrangeSalary" type="button" value="Выровнять зарплату" class="button130">\
					</td>\
				</tr>\
			</tbody></table>\
		</fieldset>');
    
    function setSalary(obj){
        if (obj.currentTarget)
        	buttonDisabled(obj.currentTarget);
        for (var key in ids) {
            if (ids.hasOwnProperty(key)) {
                var pair = ids[key];
                console.log("pair: ["+JSON.stringify(pair)+"] key:["+key+"]");
                var enable = key == ids.length-1;
                doWork(pair,key,enable);
            }
        }
    }
    
    $("#arrangeSalary").click(setSalary);
    
    if (ids.length == 0)
        buttonDisabled($("#arrangeSalary")[0]);
}

addJQuery(workers_main);
