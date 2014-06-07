// ==UserScript==
// @name        offLine LDAP reduction
// @namespace   https://gateway.slb.com/,DanaInfo=directory.slb.com+query.cgi?query=*
// @namespace   http://directory.slb.com/query.cgi?alias=*
// @require     http://jquery.com/src/jquery-latest.js
// @version     0.0.1
// ==/UserScript==
// (0.0.x - изменения в процессе разработки; 0.x.0 - бета версии; х.0.0 - релизы)
// offline версия подразумевает что мы уже находимся на полной версии страницы
// поэтому просто будем встраивать то что надо прямо в неё
// выним всю инфу в переменные, захайдим к едреням TheContent (тоесть всю ту муть голубую что ниже шапки) и затем слепим свою визитку
// далее планируется вылеплять всю цепочку менеджеров выше и выделять их цветом, группами и прочим чтобы было понятно кто где находится и чем занят.

//Прочие примечания:
//обект может не выводить свой тескт через text так как сам содержит вложенных потомков и нам надо выводить текст из них
//
//$('meta').attr('content','text/html; charset=utf-8');
//Позаботимся о правильлном отображении charset
//alert ("do - "+$('meta'));
//$('meta').removeAttr('content').attr('content','text/html; charset=utf-8');
//alert ("posle - "+$('meta'));
$(function(){
$('h2').remove();
$('#NewHeader').remove();
$('#banner').remove();
var summary = $('.summary').remove();
var footer = $('#footer').remove();

var _preferredName = $("th:contains('Preferred name')+td").clone();
var _commonName = $("th:contains('Common (full) Name(s)')+td").clone();
//alert (_commonName.html());
var _givenName = $("th:contains('Given (preferred) name')+td").clone();
var _legalName = $("th:contains('Legal/Passport first name')+td").clone();
var _surname = $("th:contains('Surname (family name)')+td").clone();
var _phone = $("th:contains('Telephone number')+td").clone();
var _mobile = $("th:contains('Mobile phone number')+td").clone();
var _emailEx = $("th:contains('Email address')+td").clone();
var _emailSLB = $("th:contains('Alternate SLB.COM email address')+td").clone();
var _localTime = $("th:contains('Local time')+td").clone();
var _room = $("th:contains('Office room number')+td").clone();
var _street = $("th:contains('Street address')+td").clone();
var _city = $("th:contains('City')+td").clone();
var _stateOrProvince = $("th:contains('State or Province')+td").clone();
var _postCode = $("th:contains('Post Code')+td").clone();
var _assignedCountry = $("th:contains('Assigned Country')+td").clone();
var _postalAddress = $("th:contains('Postal address')+td").clone();
var _costCodeOrAccountingUnit = $("th:contains('Cost code or Accounting unit (from HRIS)')+td").clone();
var _organisation = $("th:contains('Organisation')+td").clone();
var _organisationalUnit = $("th:contains('Organisational Unit')+td").clone();
var _department = $("th:contains('Department')+td").clone();
var _directManager = $("th:contains('Direct Manager')+td").clone();
var _functionalManager = $("th:contains('Functional Manager(s)')+td").clone();
var _jobCategory = $("th:contains('Job Category')+td").clone();
var _jobTitle = $("th:contains('Job title')+td").clone();
var _languages = $("th:contains('Languages')+td").clone();
var _expertise = $("th:contains('Expertise')+td").clone();
var _calendarSchedule = $("th:contains('Calendar schedule')+td").clone();
var _healthSafetyAndEnvironment = $("th:contains('Health, safety and environment')+td").clone();
var _emergencyContacts = $("th:contains('Emergency Contacts')+td").clone();
var _emergencyContactsStatus = $("th:contains('Emergency Contacts Status')+td").clone();
var _directorySubscriptions = $("th:contains('Directory subscriptions')+td").clone();
var _homePage = $("th:contains('Home page (URL)')+td").clone();
var _project = $("th:contains('Project')+td").clone();
var _workstationName = $("th:contains('Workstation name')+td").clone();
var _familyDetails = $("th:contains('Family details')+td").clone();
var _photograph = $("th:contains('Photograph')+td").addClass('photograph');
//alert("_photograph.html(): " + _photograph.html()); //проверяем что находится у объекта в качестве кода - цель понять какая картинка или картинка какого формата присутсвует
var _photograph_href = $(".photograph a").attr('href');
//alert("_photograph_href: " + _photograph_href); //в переменную заносится полный путь до большой картинки
var _photograph_img = $(".photograph img").addClass('avatar'); 
_photograph_img.removeAttr('src').attr('src',_photograph_href);//после этих манипуляций картнка должна содержать полный путь к большой картинке аватара, надо ещё добавить фотки из CNP чтоб сделать слайд шоу в превью автатара
//alert("_photograph_img.attr('src'): " + _photograph_img.attr('src'));
var _EDMworkstation = $("th:contains('EDM workstation')+td").clone();
var _EDMpolicy = $("th:contains('EDM policy')+td").clone();
var _ITSupportSite = $("th:contains('IT Support Site')+td").clone();
var _employeeType = $("th:contains('Employee type')+td").clone();
var _alias = $("th:contains('Alias (Unique username for email to @slb.com)')+td").clone();
var _UID = $("th:contains('UID (unique id)')+td").clone();
var _directory = $("th:contains('Directory id')+td").clone();
var _activeDirectory = $("th:contains('DN for ActiveDirectory (W2K)')+td").clone();
var _userPrincipalName = $("th:contains('User principal name in AD')+td").clone();
var _kerberosPrincipalName = $("th:contains('Kerberos Principal Name')+td").clone();
var _GIN = $("th:contains('Employee GIN number')+td").clone();
var _access = $("th:contains('Access card number')+td").clone();
var _assignedCountry = $("th:contains('Assigned Country (HRIS)')+td").clone();
var _businessArea = $("th:contains('Business Area (from HRIS)')+td").clone();
var _organisationalUnitHRIS = $("th:contains('Organisational Unit (from HRIS)')+td").clone();
var _jobCodeHRIS = $("th:contains('Job Code (from HRIS)')+td").clone();
var _jobGrouping = $("th:contains('Job Grouping (from HRIS)')+td").clone();
var _SETC = $("th:contains('Schlumberger Eureka Technical Career (SETC)')+td").clone();
var _legalEntityHRIS = $("th:contains('Legal entity (from HRIS)')+td").clone();
var _networkAccessRights = $("th:contains('Network Access rights')+td").clone();
var _personWhoLastUpdateTheRecord = $("th:contains('Person who last update the record (distinguished name)')+td").clone();
var _dateOfLastWEBUpdate = $("th:contains('Date of last WEB update')+td").clone();
var _objectClass = $("th:contains('Object Class')+td").clone();
var _securityStatus = $("th:contains('Security Status')+td").clone();
var _vCard = $("a:contains('Download results as a vCard')").remove();
var _updatebox = $('.updatebox').remove();

//сожрём шапку
var _ldapLogo = $('img[alt = "Globe image"]').remove(); //берём логотип LDAP
$('div[id = "banner"]').remove(); //остатки удаляем
var _mainMenu = $('div[id = "NewHeader"]').remove(); //вырежем меню
$('div#ds10').remove(); //убрать запчасти gateway
//$('')

//распотрошит код common
var _reg = /<br>/gi;
xoi = _commonName.html().replace(_reg,'<<br>>').split('<br>');
for(i=0;i<xoi.length;i++){
	regV = /[^<>]+(?=[<])/g;
	xoi[i] = xoi[i].match(regV);
	//alert(xoi[i])
};
//document.write(xoi);
//var _theContent = $('.thecontent').remove(); //убрали контент совсем

//теперь всё готово чтобы начать насыщать страницу
//подготовим формы
//начнём с общего задника, введём div на всю ширину+высоту и спозиционируем его
//$('<div id="background1" >тест</div>').;
$('body').prepend('<div id="background1" >background1</div>');
$('#background1').css('position','absolute').css('top','0px').css('left','0px').css('height','100%').css('width','100%');
$('#background1').css('background','rgba(192,192,192,1)');
//ф-ия
/*
function center (parent, child){
        //alert ('left: '+($(parent).width() - $(child).outerWidth())/2);
        $(parent).append($(child).remove());
	$(child).css({
		position:'relative',
		left: ($(parent).width() - $(child).outerWidth())/2,
		top: ($(parent).height() - $(child).outerHeight())/2
		});
};
*/
//Функция выдирает элемет откуда бы он ни был и центрирует его внутри другого элеменета, формулами можно добиться положения элемента
function center (parent, child, position, gap){
        $(parent).append($(child).remove());
	$(child).css({
		position:'relative',
		left: (($(parent).width() - $(child).outerWidth())/2)-($(child).outerWidth()+gap)*position,
		top: (($(parent).height() - $(child).outerHeight())/2)
		});
};


//теперь создадим основную рабочую область
$('#background1').after('<div id="workarea"></div>');
$('#workarea').css('position','absolute').css('top','5%').css('left','5%').css('top','10%').css('bottom','5%').css('width','90%');
$('#workarea').css('border','2px dashed rgba(0,0,0,0.5)').css('border-radius','15px').css('background','rgba(255,255,255,0.5)');//.css('text-align','center');

//теперь основное окно с визиткой
$('#workarea').after('<div id="vcardtable" ><div id="vacdrow"><div id="avatar"></div><div id="commoninfo"></div></div></div>');
$('#vcardtable').css('border','2px solid rgba(50,50,50,1)').css('border-radius','10px').width('450px').height('220px');
$(function() { center('#workarea','#vcardtable',0,10); });
$(window).resize(function() { center('#workarea','#vcardtable',0,10); });

//Засунем аватар, _photograph_img
$('#avatar').append(_photograph_img).css('float','left');
$('#avatar>img').css('height','200').css('float','none').css('width','200').css('border-radius','10px 0 50px 0').css('border','1px solid rgba(100,100,100,1)');

//Сделаем подпись под картинкой
$('#avatar').append('<div id="gin">GIN: '+_GIN.text()+'</div>');
$('#gin').css('text-align','center');

//ИФО
$('#commoninfo').append('<div id="FIO">'+_preferredName.text()+'</div>');


//Другие имена

//Профессия
$('#commoninfo').append('<div id="jobTitle">'+_jobTitle.text()+'</div>');

//Подразделение
//alert (_organisationalUnit.get(0).innerHTML.replace(/(\n(\r)?)/g, '')+"[");
$('#commoninfo').append('<div id="organization"><span id="organisationalUnit">'+_organisationalUnit.get(0).innerHTML.replace(/(\n(\r)?)/g, '')+'</span><span class="space">, </span><span id="department">'+_department.text()+'</span></div>');
/* с этими параметрами надо разобраться 
$('#commoninfo').append('&'+_costCodeOrAccountingUnit.text());
    $('#commoninfo').append('&'+_organisation.text());
        $('#commoninfo').append('&'+_department.text());
*/

//Телефоны
//Рабочий
$('#commoninfo').append('<table><th id="wPhone"><td width="35px">W: </td><td>'+_phone.text()+'</td></th></table>');
//Мобильный
$('#commoninfo').append('<table><th id="mPhone"><td width="35px">M: </td><td>'+_mobile.text()+'</td></th></table>');

//Рабочий адрес
//переделываем сокращение страны в страну
var _country = _assignedCountry.text().replace(/(\n(\r)?)/g, '');
switch(_country) {
  case "RU": 
    var _country2="Russia";
    break;
  default: 
    var _country2=_country;
}
//$('#commoninfo').append('<div id="adress"><span id="assignedCountry">'+_country2+'</span><span class="space">, </span><span id = "city">'+_city.text()+'</span></div>');

$('#commoninfo').append('<div id="postal">'+_postalAddress.text()+'</div>');

//$('div.thecontent').before(xoi[0]); //тестовая надпись вверху
});
/* var ramkaKartochki = '<th id="mestoPodKarty"><td id="osnovnaya"><div id="ramka" float:right ><a> - это тест</a></div></td id="osnovnaya"><td id="bilo"></td></th>';
$("#mestoPodKarty").append(legalName).css('border','2px solid #cc0000').css('border-radius','10px'); */
//var theContent = $("div.TheContent").remove();
//$("form[action$=,DanaInfo=directory.slb.com+query.cgi]").css('border','2px solid #cc0000').css('border-radius','10px');