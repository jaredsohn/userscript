// ==UserScript==
// @name           erepublik company helper
// @namespace      http://itriton.ir
// @description    helps general manager a little
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// @include        http://economy.erepublik.com/*/company/employees/*
// ==/UserScript==
start();

function start(){
		// summing production and adding a row to the table
		$('#employee_list table').append('<tr><td colspan="2" style="text-shadow:#0CF;text-align:center;font-weight:bold;">Total Work</td>' + 
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpWork">' + JquerySum(0) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpWork">' + JquerySum(1) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpWork">' + JquerySum(2) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpWork">' + JquerySum(3) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpWork">' + JquerySum(4) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpWork">' + JquerySum(5) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpWork">' + JquerySum(6) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpWorkTotal">' + '0' + '</td>' +
			'</tr>');
		// updating total production column 
		var totalwork=0;
		$('.ScorpWork:lt(7)').each(
			function()
			{ 
				totalwork+=parseInt($(this).text());
			}
			);
		$('#employee_list table .ScorpWorkTotal').text(totalwork);
		$('#employee_list table').append('<tr><td colspan="2" style="text-shadow:#0CF;text-align:center;font-weight:bold;">Total Salary</td>' + 
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpSalary">' + JquerySumSalary(0) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpSalary">' + JquerySumSalary(1) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpSalary">' + JquerySumSalary(2) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpSalary">' + JquerySumSalary(3) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpSalary">' + JquerySumSalary(4) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpSalary">' + JquerySumSalary(5) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpSalary">' + JquerySumSalary(6) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpSalaryTotal">' + totalsalary + '</td>' +
			'</tr>');
		var totalsalary=0.00;
		$('.ScorpSalary:lt(7)').each(
			function()
			{ 
				totalsalary+=parseFloat($(this).text());
			}
			);
		$('#employee_list table .ScorpSalaryTotal').text(totalsalary.toFixed(2));
		$('#employee_list table').append('<tr><td colspan="2" style="text-shadow:#0CF;text-align:center;font-weight:bold;">Total Products</td>' + 
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpUnits">' + JquerySumUnits(0) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpUnits">' + JquerySumUnits(1) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpUnits">' + JquerySumUnits(2) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpUnits">' + JquerySumUnits(3) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpUnits">' + JquerySumUnits(4) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpUnits">' + JquerySumUnits(5) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpUnits">' + JquerySumUnits(6) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpUnitsTotal">' + '' + '</td>' +
			'</tr>');
		var totalunits=0.00;
		$('.ScorpUnits:lt(7)').each(
			function()
			{ 
				totalunits+=parseFloat($(this).text());
			}
			);
		$('#employee_list table .ScorpUnitsTotal').text(totalunits.toFixed(2));
		var RawMaterialFee=parseFloat(GM_getValue("RawMaterial", "0.14")).toFixed(2);
		$('#employee_list table').append('<tr><td colspan="2" style="text-shadow:#0CF;text-align:center;font-weight:bold;">Raw Material Price</td>' + 
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpRawMaterial">' + (parseFloat($('.ScorpWork:eq(0)').text())*RawMaterialFee).toFixed(2) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpRawMaterial">' + (parseFloat($('.ScorpWork:eq(1)').text())*RawMaterialFee).toFixed(2) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpRawMaterial">' + (parseFloat($('.ScorpWork:eq(2)').text())*RawMaterialFee).toFixed(2) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpRawMaterial">' + (parseFloat($('.ScorpWork:eq(3)').text())*RawMaterialFee).toFixed(2) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpRawMaterial">' + (parseFloat($('.ScorpWork:eq(4)').text())*RawMaterialFee).toFixed(2) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpRawMaterial">' + (parseFloat($('.ScorpWork:eq(5)').text())*RawMaterialFee).toFixed(2) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpRawMaterial">' + (parseFloat($('.ScorpWork:eq(6)').text())*RawMaterialFee).toFixed(2) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpRawMaterialTotal">' + '' + '</td>' +
			'</tr>');
		var totalmaterialfee=0.00;
		$('.ScorpRawMaterial:lt(7)').each(
			function()
			{ 
				totalunits+=parseFloat($(this).text());
			}
			);
		$('.ScorpRawMaterialTotal').text(totalunits.toFixed(2));

		//adding total cost row 		
		$('#employee_list table').append('<tr><td colspan="2" style="text-shadow:#0CF;text-align:center;font-weight:bold;">Total Cost</td>' + 
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpCost">' + (parseFloat($('.ScorpRawMaterial:eq(0)').text())+parseFloat($('.ScorpSalary:eq(0)').text())).toFixed(2) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpCost">' + (parseFloat($('.ScorpRawMaterial:eq(1)').text())+parseFloat($('.ScorpSalary:eq(1)').text())).toFixed(2) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpCost">' + (parseFloat($('.ScorpRawMaterial:eq(2)').text())+parseFloat($('.ScorpSalary:eq(2)').text())).toFixed(2) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpCost">' + (parseFloat($('.ScorpRawMaterial:eq(3)').text())+parseFloat($('.ScorpSalary:eq(3)').text())).toFixed(2) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpCost">' + (parseFloat($('.ScorpRawMaterial:eq(4)').text())+parseFloat($('.ScorpSalary:eq(4)').text())).toFixed(2) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpCost">' + (parseFloat($('.ScorpRawMaterial:eq(5)').text())+parseFloat($('.ScorpSalary:eq(5)').text())).toFixed(2) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpCost">' + (parseFloat($('.ScorpRawMaterial:eq(6)').text())+parseFloat($('.ScorpSalary:eq(6)').text())).toFixed(2) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpCostTotal">' + '' + '</td>' +
			'</tr>');
		var totalcost=0.00;
		$('.ScorpCost:lt(7)').each(
			function()
			{ 
				totalcost+=parseFloat($(this).text());
			}
			);
		$('.ScorpCostTotal').text(totalcost.toFixed(2));
		
		//add cost per product row
		$('#employee_list table').append('<tr><td colspan="2" style="text-shadow:#0CF;text-align:center;font-weight:bold;">Cost Per Unit</td>' + 
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpUnitFee">' + (parseFloat($('.ScorpCost:eq(0)').text()) / parseFloat($('.ScorpUnits:eq(0)').text())).toFixed(2) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpUnitFee">' + (parseFloat($('.ScorpCost:eq(1)').text()) / parseFloat($('.ScorpUnits:eq(1)').text())).toFixed(2) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpUnitFee">' + (parseFloat($('.ScorpCost:eq(2)').text()) / parseFloat($('.ScorpUnits:eq(2)').text())).toFixed(2) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpUnitFee">' + (parseFloat($('.ScorpCost:eq(3)').text()) / parseFloat($('.ScorpUnits:eq(3)').text())).toFixed(2) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpUnitFee">' + (parseFloat($('.ScorpCost:eq(4)').text()) / parseFloat($('.ScorpUnits:eq(4)').text())).toFixed(2) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpUnitFee">' + (parseFloat($('.ScorpCost:eq(5)').text()) / parseFloat($('.ScorpUnits:eq(5)').text())).toFixed(2) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpUnitFee">' + (parseFloat($('.ScorpCost:eq(6)').text()) / parseFloat($('.ScorpUnits:eq(6)').text())).toFixed(2) + '</td>' +
			'<td style="text-shadow:#0CF;text-align:center;font-weight:bold;" class="ScorpUnitFeeAvg">' + '' + '</td>' +
			'</tr>');
		var totalUnitFee=0.00;
		var cnt=0;
		$('.ScorpUnitFee:lt(7)').each(
			function()
			{ 
				if (!isNaN($(this).text()) >0 ) 
				{
					cnt++;
					totalUnitFee+=parseFloat($(this).text());
				}
			}
			);
		$('.ScorpUnitFeeAvg').text((totalUnitFee/cnt).toFixed(2));
		
		// colorizing table rows
		$('.ScorpWork').css('background-color','#66CCFF');
		$('.ScorpWorkTotal').css('background-color','#66CCFF');
		$('.ScorpSalary').css('background-color','#FFCC66');
		$('.ScorpSalaryTotal').css('background-color','#FFCC66');
		$('.ScorpUnits').css('background-color','#66CCFF');
		$('.ScorpUnitsTotal').css('background-color','#66CCFF');
		$('.ScorpRawMaterial').css('background-color','#FFCC66');
		$('.ScorpRawMaterialTotal').css('background-color','#FFCC66');
		$('.ScorpCost').css('background-color','#66CCFF');
		$('.ScorpCostTotal').css('background-color','#66CCFF');
		$('.ScorpUnitFee').css('background-color','#FFCC66');
		$('.ScorpUnitFeeAvg').css('background-color','#FFCC66');
		
		
		//addind a form to save raw material fee 
		var scorpform='<div>Raw Material Fee : <input type="text" value="' + 
			RawMaterialFee + '" maxlength="5" class="scorpRawMaterialFee" />' +
			'<input id="ScorpSave" type="button" value="Save" /></div>';
		$(scorpform).insertAfter('#employee_list table');
		$('#ScorpSave').click(
			function ()
			{
				GM_setValue("RawMaterial", $('.scorpRawMaterialFee').val());
			}
			);
		//$(tmp).insertAfter('#employee_list');
		//alert(tmp.length); 
		//alert(tmpobj);
		//console.log(tmp);
		//alert(tmpobj.units);
}
		
	function JquerySum(columnIndex ) { 
		var sum= 0; 
		cols=$('#employee_list table tbody tr:eq(0) td.el_day').length;
		rows=$('#employee_list > table > tbody').children().length;
		var i =0 ;
		for ( i =0 ; i <= rows;i++)
		{
			var j = $('#employee_list table tbody tr:eq(' + i + ') td.el_day:eq(' + columnIndex + ') strong').text();
			if(j=="") j='0';
			sum+=isNaN(j) ? 0 : parseInt(j);
		}
		return sum;
	}
	function JquerySumSalary(columnIndex ) { 
		var sum= 0; 
		cols=$('#employee_list table tbody tr:eq(0) td.el_day').length;
		rows=$('#employee_list > table > tbody').children().length;
		var i =0 ;
		for ( i =0 ; i <= rows;i++)
		{
			var j = $('#employee_list table tbody tr:eq(' + i + ') td.el_day:eq(' + columnIndex + ') strong').text();
			if(j=="") j='0';
			else j = $('#employee_list table tbody tr:eq(' + i + ') td.el_salary .sallary_field').val();
			sum+=isNaN(j) ? 0 : parseFloat(j);
		}
		return sum.toFixed(2);
	}	
	function JquerySumUnits(columnIndex ) { 
		var sum= 0; 
		cols=$('#employee_list table tbody tr:eq(0) td.el_day').length;
		rows=$('#employee_list > table > tbody').children().length;
		var i =0 ;
		for ( i =0 ; i <= rows;i++)
		{
			var units='0';
			var j = $('#employee_list table tbody tr:eq(' + i + ') td.el_day:eq(' + columnIndex + ') script').text();
			if (j!="")
			{ 
				j=j.substring(j.indexOf('=')+1);
				j=j.substring(0,j.length-1);
				var result = JSON.parse(j);
				//console.log(result.units);
				var units = result.units;
			}
			//if(units=="") units='0';
			//else j = $('#employee_list table tbody tr:eq(' + i + ') td.el_salary .sallary_field').val();
			sum+=parseFloat(units);
		}
		return sum.toFixed(2);
	}	