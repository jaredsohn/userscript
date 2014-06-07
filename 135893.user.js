// ==UserScript==
// @name Home Money
// @namespace homeMoney
// @author Evgeny Ukhanov
// @version 1.0
// @description HomeMoney Extended Functionality
// @include  https://homemoney.ua/app/*
// @require  https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

(function () {
	var budget = [];
	budget['name'] = [];
	budget['collect'] = [];
	budget['plan'] = [];
	// NO-AJAX request
	$.ajax({
		url : 'https://homemoney.ua/app/Budget.aspx', 
		async : false,
		success : function(data) 
		{
			$_col = 0;
			$( data ).find('.bm').find('tr').each(function(i){
				// Выбираем только первый проход
				if( $_col > 1 )
					exit;
				// Только Доходы
				if( $(this).attr('class') == 'item title' )
				{
					$_col++;
				}
				if( $(this).attr('class') == 'item'  && $(this).attr('id') != 'ctl00_ctl00_Main_Main_BudgetManager1_AddNewBudget_ButtonPanel' )
				{
					var $__html0 = $(this).find('td')[0];
					var $__html1 = $(this).find('td')[4];
					var $__html2 = $(this).find('td')[1];
					budget['name'].push( $( $__html0 ).find('span').text() );
					budget['collect'].push( $( $__html1 ).find('a').text() );
					budget['plan'].push( $( $__html2 ).find('span').text() );				
				}
				
			});
		}
	});
$content = 
'<div class="box"> '+
'	<div id="hide_show_ins"  class="box-title"> '+
'		<a href="#" class="hide-show"></a> '+
'		<h2>Выполнение бюджета доходов</h2> '+
'	</div> '+
'</div> '+
'<div id="buget_ins" class="box"> '+
'<div style="" class="box-content" id="budgetcontrol_ins">'+
'	<div id="ctl00_ctl00_Main_Main_upBudgetChart">	'+
'		<div id="ctl00_ctl00_Main_Main_pnlBudget"> '+
'<div class="budgetcontrol"> '+
'	<div style="display: none;"> '+
'		<span id="ctl00_ctl00_Main_Main_ControlView_lbSelectedDate"></span></div> '+
'	<div style="position: relative;"> '+
'		<div style="position: relative;"> '+
'			<div> '+
'			<table border="0" cellspacing="0" cellpadding="5" style="width:600px;border-collapse:collapse;" id="ctl00_ctl00_Main_Main_ControlView_gv"> '+
'				<tbody><tr style="font-weight:normal;height:25px;"> '+
'					<th style="font-weight:normal;" scope="col"> '+
'							<div style="left: 363px;" class="timeTrack"> '+
'							</div> '+
'							<table cellspacing="0" cellpadding="0"> '+
'								<tbody><tr class="h"> '+
'									<td class="caption"> '+
'										Категория '+
'									</td> '+
'									<td class="budget"> '+
'										Бюджет '+
'									</td> '+
'									<td class="mark0"> '+
'										0 '+
'									</td> '+
'									<td class="mark100"> '+
'										100% '+
'									</td> '+
'									<td class="left"> '+
'										Осталось '+
'									</td> '+
'								</tr> '+
'							</tbody></table> '+
'						</th> '+
'				</tr>';


var $_sumTotal = 0;
var $_sumCollect = 0;
var $_sumHoTo = 0;

for( $i=0; $i<budget['name'].length; $i++ )
{	
	// Приводим к числу Общую сумму
	var $_res = budget['plan'][$i].split(' ');
	var $_str = '';
	var $_currency = $_res[ $_res.length-1 ];
	for( $j=0; $j < $_res.length-1; $j++ )
	{
		$_str+= $_res[$j];
	}
	var $_plan = parseFloat( $_str.replace(/\r|\n|\t|\s|\r\n/g, "") );
	
	// Приводим к числу Текущую сумму
	var $_res = budget['collect'][$i].split(' ');
	var $_str = '';
	for( $j=0; $j < $_res.length-1; $j++ )
	{
		$_str+= $_res[$j];
	}
	// Высчитываем %
	var $_collect = parseFloat( $_str.replace(/\r|\n|\t|\s|\r\n/g, "") );
	
	var $_toInt = 2*Math.round( 10000*( $_plan - $_collect ) / $_plan )/100
	var $_fromInt = 200 - $_toInt;
	var $_hoto = $_plan - $_collect;
	
	if( $_hoto > 1000 )
	{
		$__str = '';		
		for( $x=0; $x<$_hoto.toString().length; $x++ )
		{
			if( $x == $_hoto.toString().length-3 )
				$__str+= '&nbsp';
			$__str+= $_hoto.toString()[$x];
		}
		$_hoto = $__str;
	}
	var $_hoto = $_hoto+' '+$_currency;

$content+= 
'<tr style="height:25px;"><td>'+
'	<table cellspacing="0" cellpadding="0"><tbody><tr class="item"><tr class="item">'+
'		<td class="caption"><div>'+ budget['name'][$i] +'</div></td>'+
'		<td class="budget">'+ budget['plan'][$i] +'</td> '+
'		<td class="bar"> '+
'			<div align="right" style="padding-right:2px;line-height:1.2em;font-size:0.8em;font-weight:bold;position:relative;float:left;background:transparent url(/images/bar_green.png) repeat-x scroll 0% 100%;overflow:hiden;width:'+ $_fromInt +'px;height:16px;">'+ $_collect +'</div> '+
 '			<div align="left" style="padding-left:2px;line-height:1.2em;font-size:0.8em;font-weight:bold;position:relative;float:left;background:transparent url(/images/bar_grey.png) repeat-x scroll 0% 100%;;overflow:hiden;width:'+ $_toInt +'px;height:16px;"></div> '+
  '			<div align="right" style="line-height:1em;float:left;width:100px;height:16px;"><span style="">'+$_hoto+'</span></div> '+
'		</td> '+
'	</tr></tbody></table>'+
'</td></tr>';
}

$content+= 
'<!-- <tr style="font-weight:bold;height:25px;"> '+
'					<td> '+
'							<table cellspacing="0" cellpadding="0"> '+
'								<tbody><tr class="f"> '+
'									<td class="caption"> '+
'										Всего '+
'									</td> '+
'									<td class="budget"> '+
'										2&nbsp;900 '+
'									</td> '+
'									<td class="bar"> '+
'										<div align="right" style="padding-right:2px;line-height:1.2em;font-size:0.8em;font-weight:bold;position:relative;float:left;background:transparent url(/images/bar_orange.png) repeat-x scroll 0% 100%;overflow:hiden;width:80px;height:16px;"><a>1&nbsp;153</a></div> '+
'                                 <div align="left" style="padding-left:2px;line-height:1.2em;font-size:0.8em;font-weight:bold;position:relative;float:left;background:transparent url(/images/bar_grey.png) repeat-x scroll 0% 100%;;overflow:hiden;width:120px;height:16px;"></div> '+
'                                 <div align="right" style="line-height:1em;float:left;width:100px;height:16px;"><span style="">1&nbsp;747</span></div> '+
'									</td> '+
'								</tr> '+
'							</tbody></table> '+
'						</td> '+
'				</tr> -->'+
'			</tbody></table> '+
'		</div> '+
'		</div> '+
'	</div> '+
'</div> '+
'		</div> '+
'	</div> '+
'</div>'+
'</div>';
	$_addElement = $('.box')[3];
	$( $_addElement ).append( $content );
	$( '#hide_show_ins').click( function(){
		if( $('#budgetcontrol_ins').css('display') != 'none' )	
			$('#budgetcontrol_ins').hide();
		else
			$('#budgetcontrol_ins').show();
	});
} () )