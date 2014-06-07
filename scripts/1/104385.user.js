// ==UserScript==
// @name           Qensio - Pre-Input
// @namespace      colinfrei.com
// @description    Input some basic data on Qensio Form
// @include        http://qensio-panel.biz/participant/MailReceivePendingForm.aspx?m_id=*
// ==/UserScript==

var d = new Date();
var day = d.getDate();
var month = d.getMonth() + 1;
var year = d.getFullYear();

// Check select for Ankunftsdatum
document.getElementById('ctl00_ID_PLACEHOLDER_MAINCONTENT_IDUC_FORM_POST_RECEPTION_IDR_RECEPTDATE_1').checked = true;

// Change the date for Ankunftsdatum
document.getElementById('ctl00_ID_PLACEHOLDER_MAINCONTENT_IDUC_FORM_POST_RECEPTION_IDUC_RECEPTDATE_IDD_DAY').options[day].selected = true;
document.getElementById('ctl00_ID_PLACEHOLDER_MAINCONTENT_IDUC_FORM_POST_RECEPTION_IDUC_RECEPTDATE_IDD_MONTH').options[month].selected = true
var date_year_options = document.getElementById('ctl00_ID_PLACEHOLDER_MAINCONTENT_IDUC_FORM_POST_RECEPTION_IDUC_RECEPTDATE_IDD_YEAR').options;

for (var i in date_year_options)
{
	if (date_year_options[i].value == year)
	{
		date_year_options[i].selected = true;
		break;
	}
}

// Select 'Poststempel nicht vorhanden'
document.getElementById('ctl00_ID_PLACEHOLDER_MAINCONTENT_IDUC_FORM_POST_RECEPTION_IDR_POSTSTAMP_DATE_0').checked = true;

// Select 'Lieferzustand einwandfrei'
document.getElementById('ctl00_ID_PLACEHOLDER_MAINCONTENT_IDUC_FORM_POST_RECEPTION_IDR_POSTDAMAGE_0').checked = true;

// Select 'Brief war korrekt addressiert'
document.getElementById('ctl00_ID_PLACEHOLDER_MAINCONTENT_IDUC_FORM_POST_RECEPTION_IDR_ADDRESS_CORRECT_0').checked = true;