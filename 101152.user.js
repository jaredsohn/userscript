// ==UserScript==
// @name           Speak Asia Automation - Binary Income Display in Rs
// @namespace      net.rajeshsoni
// @include        http*://*.speakasiaonline.com/panelist/my*ree.aspx*
// ==/UserScript==

// Rajesh Soni (rajeshgsoni@gmail.com)
// http://rajeshsoni.net

	if(document.location.href.toLowerCase().match('mytree.aspx'))
	{
		var paid;
		var unpaid_left;
		var unpaid_right;
		var unpaid;

		paid = (document.getElementById('ctl00_ContentPlaceHolder1_lblLeftPaidPV').innerText * 2.5 * 2);
		unpaid_left = (document.getElementById('ctl00_ContentPlaceHolder1_lblLeftUnPaidPV').innerText * 2.5 * 2);
		unpaid_right = (document.getElementById('ctl00_ContentPlaceHolder1_lblRightUnPaidPV').innerText * 2.5 * 2);
		unpaid = Math.min( unpaid_left, unpaid_right );

		document.title = 'Rs ' + paid + '- ' + document.title;
		document.getElementById('ctl00_ContentPlaceHolder1_lblMsg').innerHTML='<h1>' + 'Binary Income Paid: Rs. ' + paid + ', Unpaid: Rs. ' + unpaid + '</h1>';
	}