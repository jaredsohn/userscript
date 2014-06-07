// ==UserScript==
// @name       WorkingHoliday Auto_Submit
// @namespace  http://use.i.E.your.homepage/
// @version    1.0_Beta
// @description  香炉小姐版权所有，伪版必究
// @match      https://www.immigration.govt.nz/WorkingHoliday/Application/Submit*
// @match      https://www.immigration.govt.nz/workingholiday/Application/Submit*
// @match      https://www.immigration.govt.nz/WORKINGHOLIDAY/Application/Submit*
// @copyright  香炉小姐
// ==/UserScript==

var box_1 = document.getElementById('ctl00_ContentPlaceHolder1_falseStatementCheckBox');
var box_2 = document.getElementById('ctl00_ContentPlaceHolder1_notesCheckBox');
var box_3 = document.getElementById('ctl00_ContentPlaceHolder1_circumstancesCheckBox');
var box_4 = document.getElementById('ctl00_ContentPlaceHolder1_warrantsCheckBox');
var box_5 = document.getElementById('ctl00_ContentPlaceHolder1_informationCheckBox');
var box_6 = document.getElementById('ctl00_ContentPlaceHolder1_healthCheckBox');
var box_7 = document.getElementById('ctl00_ContentPlaceHolder1_adviceCheckBox');
var box_8 = document.getElementById('ctl00_ContentPlaceHolder1_registrationCheckBox');
var box_9 = document.getElementById('ctl00_ContentPlaceHolder1_entitlementCheckbox');
var box_10 = document.getElementById('ctl00_ContentPlaceHolder1_permitExpiryCheckBox');
var box_11 = document.getElementById('ctl00_ContentPlaceHolder1_medicalInsuranceCheckBox');
var submit_btn = document.getElementById('ctl00_ContentPlaceHolder1_submitImageButton');

box_1.checked = true;
box_2.checked = true;
box_3.checked = true;
box_4.checked = true;
box_5.checked = true;
box_6.checked = true;
box_7.checked = true;
box_8.checked = true;
box_9.checked = true;
box_10.checked = true;
box_11.checked = true;

submit_btn.click();