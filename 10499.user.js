// ==UserScript==
// @name           Chase Payment Totaler
// @namespace      http://www.bradkent.com/
// @description    Add up Sales
// @include        https://cards.chase.com/Account/AccountActivity.aspx*
// ==/UserScript==


(function() {
	var activityGrid = document.getElementById('ActivityGrid');
	var rows = activityGrid.rows;
	var purchases = 0;
	var payments = 0
	for ( i=1; i<rows.length; i+=2 )
	{
		var cells = rows[i].cells;
		var what = cells[2].textContent;
		var amt = getNumber(cells[5]);
		if ( what == 'Sale' || what == 'Return' )
			purchases += amt;
		else if ( what == 'Payment' )
			payments += amt;
	}
	debug('purchases = '+purchases);
	debug('payments = '+payments);
	var transTotal	= getNumber(purchases);
	var lastBal	= getNumber(document.getElementById('LastBal'));
	var outstanding = transTotal+lastBal+payments;
	var rowsParent = null;
	//
	if ( rows.length > 1 )
	{
	    var rows_find = new Array('TotalRow','LastBalRow');
	    for( i=0; i<rows_find.length; i++ )
	    {
		var row_id = rows_find[i];
		var existing_row = document.getElementById(row_id);
		if ( existing_row != null )
		{
			debug('found '+row_id);
			if ( rowsParent == null )
			{
				rowsParent = existing_row.parentNode
				var newTR = document.createElement('TR');
				var cell = newTR.insertCell(0);
				cell.setAttribute('align','right');
				cell.setAttribute('colspan',99);
				cell.innerHTML = '<TABLE cellpadding=0 cellspacing=0 border=0 class="bodyText" style="font-weight:bold;">'
					+ '<TR><TD>Purchases This Statement &nbsp;</TD><TD align="right">'+format_num(purchases)+'</TD></TR>'
					+ '<TR><TD>Payments</TD><TD align="right">'+format_num(payments)+'</TD></TR>'
					+ '<TR><TD style="border-bottom:#000 solid 1px;">Last Statement Balance</TD><TD style="border-bottom:#000 solid 1px;" align="right">'+format_num(lastBal)+'</TD></TR>'
					+ '<TR><TD>Outstanding Balance</TD><TD align="right">$'+format_num(outstanding)+'</TD></TR>'
					+ '</TABLE>';
				rowsParent.replaceChild(newTR, existing_row);
			}
			else
				rowsParent.removeChild(existing_row);
		}
	    }
	}
})();

function getNumber(num)
{
	if ( num == null )
		num = 0;
	else if ( typeof num == 'object' )
		num = num.textContent;
	if ( typeof num == 'string' )
		num = Number(num.replace(/[$,]/g,''));
	return num;
}

function format_num(num)
{
	var num = num.toString().replace(/[^\d\.-]/g,'');
	var positive = (num == Math.abs(num));
	num = Math.floor(Math.abs(num)*100+0.50000000001);
	var cents = num%100;
	if(cents<10)
		cents = "0" + cents;
	num = Math.floor(num/100).toString();
	for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
	       num = num.substring(0,num.length-(4*i+3))+","+num.substring(num.length-(4*i+3));
	num = ( ((positive)?'':'-') + num + '.' + cents);
	return num;
}

function debug(what)
{
	//GM_log(what);
}