// ==UserScript==
// @name           Quest annotation (rus)(ver 0.0.3)
// @namespace      *quest.slb.com*
// @description    всплывающие подсказки для сайта quest.slb.com на русском
// @include        *quest.slb.com*
// @resource       info info.png
// @icon 		   http://quest.slb.com/quest/images/questlogo.ico
// @require		   http://code.jquery.com/jquery.min.js
// @require		   http://www.xiling.cn/syssource/mainpage/web/js/jquery.tipsy.js
// ==/UserScript==

//картинки
var picInfo = document.createElement('PicInfo');


//то что начинается с var - это привязка всплывающих подсказок к ссылкам на javascript

//здесь происходит создание CSS таблицы для всплывающих подсказок, CSS стиль в виде объекта-многогранной переменной или как его иногда называют - класса; содержит подтипы и подвиды
var tipsycss = ".tipsy { padding: 5px; font: italic 12px georgia; position: absolute; z-index: 100000; cursor: help; text-decoration: none; position: relative; }.tipsy-inner { padding: 5px 8px 4px 8px; background-color: black; color: white; max-width: 200px; text-align: center; }.tipsy-inner { border-radius: 3px; -moz-border-radius:3px; -webkit-border-radius:3px; }.tipsy-arrow { position: absolute; background: url('../images/tipsy.gif') no-repeat top left; width: 9px; height: 5px; }.tipsy-n .tipsy-arrow { top: 0; left: 50%; margin-left: -4px; }.tipsy-nw .tipsy-arrow { top: 0; left: 10px; }.tipsy-ne .tipsy-arrow { top: 0; right: 10px; }.tipsy-s .tipsy-arrow { bottom: 0; left: 50%; margin-left: -4px; background-position: bottom left; }.tipsy-sw .tipsy-arrow { bottom: 0; left: 10px; background-position: bottom left; }.tipsy-se .tipsy-arrow { bottom: 0; right: 10px; background-position: bottom left; }.tipsy-e .tipsy-arrow { top: 50%; margin-top: -4px; right: 0; width: 5px; height: 9px; background-position: top right; }.tipsy-w .tipsy-arrow { top: 50%; margin-top: -4px; left: 0; width: 5px; height: 9px; }"

//вводим содержимое переменной в качестве css стиля
GM_addStyle(tipsycss);

$("a:contains('Quality Loss')").attr("title", 
"<tr>dfdfsdfsdsd<td valign='middle'><img src='http://openiconlibrary.sourceforge.net/gallery2/open_icon_library-full/icons/png/128x128/emblems/emblem-notice.png' width='60' height='60' allign='right'></td><td valign='middle'>Ущерб качеству.</td></tr>").tipsy({gravity: 'w', fade: true, html: true, css: {width: 500}});

$("a:contains('Other')").attr("title", 
"<tr>dfdfsdfsdsd<td valign='middle'><img src='http://openiconlibrary.sourceforge.net/gallery2/open_icon_library-full/icons/png/128x128/emblems/emblem-interrobang.png' width='60' height='60' allign='right'></td><td valign='middle'>Другие ущербы.</td></tr>").tipsy({gravity: 'w', fade: true, html: true, css: {width: 500}});

$("a:contains('AT')").attr("title", 
"<tr>dfdfsdfsdsd<td valign='middle'><img src='http://openiconlibrary.sourceforge.net/gallery2/open_icon_library-full/icons/png/128x128/emblems/emblem-downloads.png' width='60' height='60' allign='right'></td><td valign='middle'>Прикреплённые документы.</td></tr>").tipsy({gravity: 'w', fade: true, html: true, css: {width: 500}});
//Minimum Data Gathering->Quality Loss->People
//всплывающая подсказка с картиками и таблицами
$("a:contains('People')").attr("title", 
"<tr>dfdfsdfsdsd<td valign='middle'><img src='http://icons.iconseeker.com/png/fullsize/people/people.png' width='60' height='60' allign='right'></td><td valign='middle'>Вся информация которую можно получить от людей через разговор с ними (это называется интервью).</td></tr>").tipsy({gravity: 'w', fade: true, html: true, css: {width: 1500}});
//работает "<img src='http://quest.slb.com/quest/images/Quest_Logo_Top_LOWSRC.jpg'>").tipsy({gravity: 'w', fade: true, html: true});
//$("a:contains('People')").tipsy();

$("a:contains('Other Relevant Interviews')").attr("title", 
"Другие интервью относящиеся к теме расследования").tipsy({gravity: 'w', fade: true, html: true}); 
//$("a:contains('Other Relevant Interviews')"), tipsy();
	//var t264E9 = document.querySelector("[href='javascript:OnLinkClick(264,\"E\",\"9\")']").setAttribute ('title', 'Другие интервью относящиеся к теме расследования');

$("a:contains('Interview: SLB Site/Process Owner or Responsible Party')").attr("title", 
"Люди которые руководили тем процессом при котором что-то произошло").tipsy({gravity: 'w', fade: true, html: true}); 
	//var t18E9 = document.querySelector("[href='javascript:OnLinkClick(18,\"E\",\"9\")']").setAttribute ('title', 'надо дозаполнить');
	$("b:contains('Interview: SLB Site/Process Owner or Responsible Party')").attr("title", 
	"Люди которые руководили тем процессом при котором что-то произошло").tipsy({gravity: 'w', fade: true, html: true});
	
	
	
$("a:contains('Interview: Witness(es) (Customer/Client Representative, Colleagues, Supervisor, Process/Product Designers, etc.)')").attr("title", 
"Свидетели (заказчик/представитель клиента, коллеги, руководитель, разработчик процесса или продукта)").tipsy({gravity: 'w', fade: true, html: true}); 
	//var t22E9 = document.querySelector("[href='javascript:OnLinkClick(22,\"E\",\"9\")']").setAttribute ('title', 'Свидетели (заказчик/представитель клиента, коллеги, руководитель, разработчик процесса или продукта)');

$("a:contains('Eyewitness')").attr("title", 
"Очевидцы, кто своими глазами видел, но по структуре происходящего связи с происшествием не имеет").tipsy({gravity: 'w', fade: true, html: true}); 
	//var t17E9 = document.querySelector("[href='javascript:OnLinkClick(17,\"E\",\"9\")']").setAttribute ('title', 'Очевидцы, кто своими глазами видел, но по структуре происходящего связи с происшествием не имеет');

//Minimum Data Gathering->Quality Loss->Position
$("a:contains('Position')").attr("title", 
"Вся информация о том кто где стоял в каких позициях. Часто важно в какой позиции, например: согнув спину или присев на корточки, человек делал то или иное действие.").tipsy({gravity: 'w', fade: true, html: true});

$("a:contains('Position of Other Operations Taking Place in Proximity of Quality Event')").attr("title", 
'Position of Other Operations Taking Place in Proximity of Quality Event').tipsy({gravity: 'w', fade: true, html: true}); 
	//var t212E9 = document.querySelector("[href='javascript:OnLinkClick(212,\"E\",\"9\")']").setAttribute ('title', 'Position of Other Operations Taking Place in Proximity of Quality Event');

$("a:contains('Position of Quality non-conformity or Substandard Acts/Conditions')").attr("title", 
'Position of Quality non-conformity or Substandard Acts/Conditions').tipsy({gravity: 'w', fade: true, html: true}); 
	//var t210E9 = document.querySelector("[href='javascript:OnLinkClick(210,\"E\",\"9\")']").setAttribute ('title', 'Position of Quality non-conformity or Substandard Acts/Conditions');

$("a:contains('Position of all Personnel Involved in the Event')").attr("title", 
'Position of all Personnel Involved in the Event').tipsy({gravity: 'w', fade: true, html: true}); 
	//var t211E9 = document.querySelector("[href='javascript:OnLinkClick(211,\"E\",\"9\")']").setAttribute ('title', 'Position of all Personnel Involved in the Event');

$("a:contains('Position/Layout of the site where the Quality Event has taken place')").attr("title", 
'Position/Layout of the site where the Quality Event has taken place').tipsy({gravity: 'w', fade: true, html: true}); 
	//var t19E9 = document.querySelector("[href='javascript:OnLinkClick(19,\"E\",\"9\")']").setAttribute ('title', 'Position/Layout of the site where the Quality Event has taken place');

$("a:contains('Other relevant Position')").attr("title", 
'Другие положения людей/объектов относяящиеся к теме расследования').tipsy({gravity: 'w', fade: true, html: true}); 
	//var t265E9 = document.querySelector("[href='javascript:OnLinkClick(265,\"E\",\"9\")']").setAttribute ('title', 'Other relevant Position');

//Minimum Data Gathering->Quality Loss->Parts
$("a:contains('Parts')").attr("title", 
'Состояние, статус, годность, допуски к работе физических частей (запчастей, инструментов, огнетушителей - например) принимающих участие и относящихся к теме расследования').tipsy({gravity: 'w', fade: true, html: true}); 

$("a:contains('Condition of Emergency/Contingency Equipment (Shut Down Devices, Safety Valves,etc.)')").attr("title", 
'Например: На локациях находится Locaul tegaut - средсва контроля энергии. ОТ локации к локации разные бумаги. Фактическое наличие каких то средств для контроля аварийных ситуаций').tipsy({gravity: 'w', fade: true, html: true}); 
	//var t218E9 = document.querySelector("[href='javascript:OnLinkClick(218,\"E\",\"9\")']").setAttribute ('title', 'Condition of Emergency/Contingency Equipment (Shut Down Devices, Safety Valves,etc.)');

$("a:contains('Condition/Status/List of Products or Materials involved')").attr("title", 
'Те матераллы и комплектующие ктороые были использованны в даном прцессе').tipsy({gravity: 'w', fade: true, html: true}); 
	//var t213E9 = document.querySelector("[href='javascript:OnLinkClick(213,\"E\",\"9\")']").setAttribute ('title', 'Condition/Status/List of Products or Materials involved');

$("a:contains('Process Monitoring Devices (Gauges, Indicators, Displays, etc.)')").attr("title", 
'Оборудование необходимое для контроля процесса - расходомер, манометр Process Monitoring Devices (Gauges, Indicators, Displays, etc.)').tipsy({gravity: 'w', fade: true, html: true}); 
	//var t219E9 = document.querySelector("[href='javascript:OnLinkClick(219,\"E\",\"9\")']").setAttribute ('title', 'Process Monitoring Devices (Gauges, Indicators, Displays, etc.)');

$("a:contains('Condition/Status/List of Labels, Information, Warning Signs or MSDS')").attr("title", 
'Лейблы которые Condition/Status/List of Labels, Information, Warning Signs or MSDS').tipsy({gravity: 'w', fade: true, html: true}); 
	//var t217E9 = document.querySelector("[href='javascript:OnLinkClick(217,\"E\",\"9\")']").setAttribute ('title', 'Condition/Status/List of Labels, Information, Warning Signs or MSDS');

$("a:contains('Condition/Status/List of Equipment Involved')").attr("title", 
'Condition/Status/List of Equipment Involved').tipsy({gravity: 'w', fade: true, html: true}); 
	//var t214E9 = document.querySelector("[href='javascript:OnLinkClick(214,\"E\",\"9\")']").setAttribute ('title', 'Condition/Status/List of Equipment Involved');

$("a:contains('Other Relevant Parts')").attr("title", 
'Other Relevant Parts').tipsy({gravity: 'w', fade: true, html: true}); 
	//var t266E9 = document.querySelector("[href='javascript:OnLinkClick(266,\"E\",\"9\")']").setAttribute ('title', 'Other Relevant Parts');

//Minimum Data Gathering->Quality Loss->Paper
$("a:contains('Paper')").attr("title", 
'Бумажные документы относящиеся к процессу расследования. Например акты, технические условия, ГОСТы, внутренние документы компаний').tipsy({gravity: 'w', fade: true, html: true});

$("a:contains('Client Related: Contracts, Work Orders, Job/Process Design/Specifications, Sub-Contractors, Correspondence, Invoices')").attr("title", 
'Client Related: Contracts, Work Orders, Job/Process Design/Specifications, Sub-Contractors, Correspondence, Invoices').tipsy({gravity: 'w', fade: true, html: true});
	//var t232E9 = document.querySelector("[href='javascript:OnLinkClick(232,\"E\",\"9\")']").setAttribute ('title', 'Client Related: Contracts, Work Orders, Job/Process Design/Specifications, Sub-Contractors, Correspondence, Invoices');

$("a:contains('Operation Related: Procedures, Standards, Work Instructions, Policies, Work Schedule, Meetings Minutes')").attr("title", 
'Та документация которая относится к процессу - техпроцесс, руководство по эксплуатации.').tipsy({gravity: 'w', fade: true, html: true});
	//var t229E9 = document.querySelector("[href='javascript:OnLinkClick(229,\"E\",\"9\")']").setAttribute ('title', 'Operation Related: Procedures, Standards, Work Instructions, Policies, Work Schedule, Meetings Minutes');

$("a:contains('Other Relevant Documentation')").attr("title", 
'Other Relevant Documentation').tipsy({gravity: 'w', fade: true, html: true});
	//var t267E9 = document.querySelector("[href='javascript:OnLinkClick(267,\"E\",\"9\")']").setAttribute ('title', 'Other Relevant Documentation');

$("a:contains('Invoices for costs related to the event')").attr("title", 
'Invoices for costs related to the event').tipsy({gravity: 'w', fade: true, html: true});
	//var t230E9 = document.querySelector("[href='javascript:OnLinkClick(230,\"E\",\"9\")']").setAttribute ('title', 'Invoices for costs related to the event');

$("a:contains('Equipment Related: Manufacturers Specifications, Technical References, Certifications, Conformity Test')").attr("title", 
'Equipment Related: Manufacturers Specifications, Technical References, Certifications, Conformity Test').tipsy({gravity: 'w', fade: true, html: true});
	//var t233E9 = document.querySelector("[href='javascript:OnLinkClick(233,\"E\",\"9\")']").setAttribute ('title', 'Equipment Related: Manufacturers Specifications, Technical References, Certifications, Conformity Test');

$("a:contains('Maintenance Related: Repair, Maintenance Schedule, maintenance Logs')").attr("title", 
'Maintenance Related: Repair, Maintenance Schedule, maintenance Logs').tipsy({gravity: 'w', fade: true, html: true});
	//var t224E9 = document.querySelector("[href='javascript:OnLinkClick(224,\"E\",\"9\")']").setAttribute ('title', 'Maintenance Related: Repair, Maintenance Schedule, maintenance Logs');

$("a:contains('Post Event Analysis Results (X-Rays, Stress Tests, etc.)')").attr("title", 
'Post Event Analysis Results (X-Rays, Stress Tests, etc.)').tipsy({gravity: 'w', fade: true, html: true});
	//var t234E9 = document.querySelector("[href='javascript:OnLinkClick(234,\"E\",\"9\")']").setAttribute ('title', 'Post Event Analysis Results (X-Rays, Stress Tests, etc.)');

$("a:contains('Operator Related: Job Description of Users/Operators, Workload, Training')").attr("title", 
'Operator Related: Job Description of Users/Operators, Workload, Training').tipsy({gravity: 'w', fade: true, html: true});
	//var t228E9 = document.querySelector("[href='javascript:OnLinkClick(228,\"E\",\"9\")']").setAttribute ('title', 'Operator Related: Job Description of Users/Operators, Workload, Training');

$("a:contains('Data Related: from job/process monitoring devices, input data to design/prepare job/process')").attr("title", 
'Data Related: from job/process monitoring devices, input data to design/prepare job/process,').tipsy({gravity: 'w', fade: true, html: true});
	//var t223E9 = document.querySelector("[href='javascript:OnLinkClick(223,\"E\",\"9\")']").setAttribute ('title', 'Data Related: from job/process monitoring devices, input data to design/prepare job/process,');

$("a:contains('Q-HARC Records associated with the activity or hazard related to the event')").attr("title", 
'Q-HARC Records associated with the activity or hazard related to the event').tipsy({gravity: 'w', fade: true, html: true});
	//var t226E9 = document.querySelector("[href='javascript:OnLinkClick(226,\"E\",\"9\")']").setAttribute ('title', 'Q-HARC Records associated with the activity or hazard related to the event');

$("a:contains('Work Permits/Authorizations')").attr("title", 
'Work Permits/Authorizations').tipsy({gravity: 'w', fade: true, html: true});
	//var t220E9 = document.querySelector("[href='javascript:OnLinkClick(220,\"E\",\"9\")']").setAttribute ('title', 'Work Permits/Authorizations');

//Upload rules
$("td:contains('File Upload')").attr("title", 
'Не более 2 MB (2097152 bytes)\r\nПримечание: Если файл на диске занимает 1.9MB при пересылке он может стать более 2MB. Размер файла при пересылке меняется').tipsy({gravity: 'w', fade: true, html: true});

//Description
//$("td:contains('Description')").attr("title", 
//'Описания вложения');

//input
$("input:contains('chkDesc')").attr("title", 
'Описания вложения22222').tipsy({gravity: 'w', fade: true, html: true});

//индикатор того что скрипт загрузился до конца
var allImgs,thisImg;
 allImgs = document.evaluate(‘//img[@src]’,
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  
for (var i=0;i<allImgs.snapshotLength;i++) {
     var thisImg = allImgs.snapshotItem(i);
     var src = thisImg.src;
     var srcMatch = src.match(‘images/Quest_Logo_Top_LOWSRC.jpg’);
     if (srcMatch != null) {
         thisImg.src = ‘http://openiconlibrary.sourceforge.net/gallery2/open_icon_library-full/icons/png/256x256/emotes/face-monkey-2.png’;
     }
 }

//$("img:contains('Quest_Logo_Top_LOWSRC.jpg')").attr("src", 'http://openiconlibrary.sourceforge.net/gallery2/open_icon_library-full/icons/png/256x256/emotes/face-monkey-2.png');
//document.getElementByTagName("Quest_Logo_Top_LOWSRC.jpg").src == "http://openiconlibrary.sourceforge.net/gallery2/open_icon_library-full/icons/png/256x256/emotes/face-monkey-2.png"