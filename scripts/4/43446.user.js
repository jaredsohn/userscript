// ==UserScript==
// @name           Scholarships.com - 'No, thank you.'
// @namespace      http://www.tamsanh.com/gm/
// @description    This'll hit the 'No, thank you' radio button for you.
// @include        http://www.scholarships.com/Rotator.aspx*
// ==/UserScript==

var i,ii;

for (i=0; i<document.forms.length;i++)
{
	for (ii=0; ii<document.forms[i].length;ii++)
	{
		if (document.forms[i][ii].type=="radio")
		{
			if (document.forms[i][ii].value=="N"||document.forms[i][ii].value==0)
			{
				document.forms[i][ii].checked=true;
			}
		}
	}
	for (ii=0; ii<document.forms[i].length;ii++)
	{

		if (document.forms[i][ii].type=="submit")
		{
			document.forms[i].submit();
		}
	}
}