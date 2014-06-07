// ==UserScript==
// @name       Edit
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      https://www.immigration.govt.nz/WorkingHoliday/Wizard/*
// @copyright  2012+, You
// @include      https://www.immigration.govt.nz/WorkingHoliday/Wizard/*
// @require        http://code.jquery.com/jquery-1.9.1.min.js
// ==/UserScript==
var defaultCountry=188;
var P={
    Keywords:['gender','dateOfBithDatePicker_Day','dateOfBithDatePicker_Month','dateOfBithDatePicker_Year','Country','address$address1','address$city','address$province','address$postalCode','address$country'
             ,'phoneNumberMobile','representedByAgent','hasCreditCard','passportNumber','confirmPassportNumber','passportExpiryDateDatePicker_Day','passportExpiryDateDatePicker_Month','passportExpiryDateDatePicker_Year'
             ,'otherIdentification','otherIssueDateDatePicker_Day','otherIssueDateDatePicker_Month','otherIssueDateDatePicker_Year','otherExpiryDateDatePicker_Day','otherExpiryDateDatePicker_Month','otherExpiryDateDatePicker_Year'
             ,'medicalConditions','character','previousWhsPermitVisa','sufficientFundsHoliday','intendedTravelDateDatePicker_Day','intendedTravelDateDatePicker_Month','intendedTravelDateDatePicker_Year',
              'beenToNz','sufficientFundsOnwardTicket','readRequirements'],
    gender:'F',
    dateOfBithDatePicker_Day:10,
    dateOfBithDatePicker_Month:3,
    dateOfBithDatePicker_Year:1990,
    Country:defaultCountry,
    address$address1:'xxxxxxx',
    address$city:'Deyang',
    address$province:'Sichuan',
    address$postalCode:'618000',
    address$country:defaultCountry,
    phoneNumberMobile:'8618981011420',
    representedByAgent:'No',
    hasCreditCard:'Yes',
    passportNumber:'G000001',
    confirmPassportNumber:'G000001',
    passportExpiryDateDatePicker_Day:'4',
    passportExpiryDateDatePicker_Month:'12',
    passportExpiryDateDatePicker_Year:'2032',
    otherIdentification:3,
    otherIssueDateDatePicker_Day:'4',
    otherIssueDateDatePicker_Month:'12',
    otherIssueDateDatePicker_Year:'2000',
    otherExpiryDateDatePicker_Day:'4',
    otherExpiryDateDatePicker_Month:'12',
    otherExpiryDateDatePicker_Year:'2020',
    medicalConditions:'No',
    character:'No',
    previousWhsPermitVisa:'No',
    sufficientFundsHoliday:'Yes',
    intendedTravelDateDatePicker_Day:'1',
    intendedTravelDateDatePicker_Month:'9',
    intendedTravelDateDatePicker_Year:'2014',
    beenToNz:'No',
    sufficientFundsOnwardTicket:'Yes',
    readRequirements:'Yes'
};
var nextButton=$('[name*="nextImageButton"]');
var tabs=$('.tabcontainer');
$.each(P.Keywords,function(i,k)
    {
    	var elements=$('[name*="'+k+'"]');
    	if(elements.length>0)
        {
               if(k=='medicalConditions'||k=='character')
               {
                    elements=elements.filter('select');
                }
                elements.val(P[k]);
        }
    });

setTimeout (function(){
    	var tabCount=tabs.find('div').length;
    	var current=tabs.find('div.current');
    	var index=tabs.find('div').index(current);
    	if(index+1<tabCount)
            nextButton.trigger('click');
    	else
            alert('关闭脚本！！！检查表格，然后提交！！！');
    },100);