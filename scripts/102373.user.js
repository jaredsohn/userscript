// ==UserScript==
// @name           JavaScript in BrickLink Invoices
// @namespace      bricklink
// @description    Extends the macro syntax on BrickLink invoices and drive-thru by running blocks you mark as JavaScript - everything between [EVAL] and [/EVAL] gets run.  Adds JavaScript functions: money() that turns its parameter into a value with two digits after the decimal, nocomma() turns the passed string into a decimal e.g. $[EVAL]money(nocomma('<DISPGRANDTOTAL>')*1.1)[/EVAL]
// @icon           http://www.sculpturesupplies.com.au/GMBL.png
// @version 1.3
// @include        http://www.bricklink.com/orderInvoice.asp*
// @include        http://www.bricklink.com/orderDriveThru.asp?ID=*
// @include        http://www.bricklink.com//orderInvoice.asp*
// @include        http://www.bricklink.com//orderDriveThru.asp?ID=*
// @match          http://www.bricklink.com/orderInvoice.asp*
// @match          http://www.bricklink.com/orderDriveThru.asp?ID=*
// @match          http://www.bricklink.com//orderInvoice.asp*
// @match          http://www.bricklink.com//orderDriveThru.asp?ID=*
// ==/UserScript==

// Format floating point number as two-decimal money, no currency symbol
function money(amt) 
{
	var amtstr=''+Math.ceil(amt*100)/100;
	var i=amtstr.indexOf('\.');
	if (i==-1) result = amtstr + '.00'; else {
		amtstr = amtstr + '00';
		result = amtstr.substring(0,i+3);
	}
	return result;
}

// Strip thousands separator
function nocomma(amt) 
{
	return amt.replace(',','');
}

if ((document.URL.indexOf('bricklink.com/orderInvoice.asp')!=-1) ||
    (document.URL.indexOf('bricklink.com//orderInvoice.asp')!=-1))
  textareaname='Comments'; 
else
if ((document.URL.indexOf('bricklink.com/orderDriveThru.asp')!=-1) ||
    (document.URL.indexOf('bricklink.com//orderDriveThru.asp')!=-1)) 
  textareaname='mailTemplate'; 
else
{
	GM_log('Active against unexpected URL');
	return;
}

elms=document.getElementsByName(textareaname);
// this ought to be the TextArea, but check in case BL gets modified:
if (elms.length==1) {
	// locate our markup terms
	var reg1 = /\[EVAL\]([\S\s]*?)\[\/EVAL\]/
	var comments = elms[0].value;
	// repeatedly search for markup
	try {
		while (reg1.test(comments)) {
			var results=reg1.exec(comments);
			// evaluate
			var eval_result = eval(RegExp.$1);
			var found = '[EVAL]' + RegExp.$1 + '[/EVAL]';
			GM_log(found + " RESULT:" + eval_result);
			// subsitute computed value for the code
			comments = comments.replace(found, eval_result);
		}
	} catch (e) {
		GM_log('Problem:\n'+e.name+': '+e.message+'\n'+RegExp.$1);
		alert('Problem:\n'+e.name+': '+e.message+'\n'+RegExp.$1)
	}
	elms[0].value = comments;
}
else GM_log(elms.length +' elements named ' + textareaname);