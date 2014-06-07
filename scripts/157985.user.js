// ==UserScript==
// @name        Pimp VIC Trac!
// @namespace   PimpVICTrac
// @description And VIC Trac feels much better.
// @include     http://ispp.vic.lt/*
// @exclude     http://ispp.vic.lt/
// @version     0.12.2
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js
// @resource    DroidSansCSS http://fonts.googleapis.com/css?family=Droid+Sans
// @resource    jqUI_CSS  http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/base/jquery-ui.css
// @resource    IconSet1  http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/base/images/ui-icons_222222_256x240.png
// @resource    IconSet2  http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/base/images/ui-icons_454545_256x240.png
// @grant GM_addStyle
// @grant GM_getResourceURL
// @grant GM_getResourceText
// @grant GM_xmlhttpRequest
// ==/UserScript==


var DroidSansCSSText = GM_getResourceText("DroidSansCSS");
GM_addStyle(DroidSansCSSText);

$('#banner, #mainnav').wrapAll('<div class="header_wrapper" />');
$('#ticket table.properties').before('<div class="my-border"></div>');

GM_addStyle("body, th, td, h1, h2, h3, h4, h5 { font-family: 'Droid Sans', sans-serif; color: #5A5A5A; } body { margin: 20px; color: #333; margin: 0; background: none; } #main { padding: 10px 20px 20px; position: relative; }");
GM_addStyle("h1 { font-size: 22px; } #footer { display: none; } #help { font-size: 11px; } #description { font-size: 11px; color: #999; } #mainnav { border: none; background: #f0f0f0; padding: 5px 20px; margin: 10px 0 0; }");
GM_addStyle("table.listing thead th, table.listing tbody td, table.listing tbody th { line-height: 18px; padding: 5px 8px !important; }");
GM_addStyle("table.listing thead th { line-height: 20px; padding: 3px 8px !important; } table.listing thead th a { color: #5A5A5A; display: block; padding: 0; }");

GM_addStyle("#header h1 { margin: 0 0 3px 0; } .header_wrapper { background: -moz-linear-gradient(center top , #828282 0%, #777777 100%) repeat scroll 0 0 transparent; padding: 20px 0 0; }");
GM_addStyle("#banner { position: relative; } #search { position: absolute; right: 0; top: 0; }");
GM_addStyle("#ctxtnav { position: absolute; right: 20px; top: 16px; z-index: 2; }");

GM_addStyle(".header_wrapper { background: none; } #banner { margin: 0 20px; }");

GM_addStyle("#mainnav li { margin-left: 0; padding: 0; display: inline-block; }");
GM_addStyle("#mainnav ul li:first-child a { border-radius: 4px 0 0 4px; } #mainnav ul li:last-child a { border-radius: 0 4px 4px 0; }");

GM_addStyle("#mainnav *:link, #mainnav *:visited { line-height: 28px; font-size: 13px; color: #5A5A5A; background: linear-gradient(to bottom, #FCFCFC, #F0F0F0) repeat scroll 0 0 #FAFAFA; }");
GM_addStyle("#mainnav *:link, #mainnav *:visited { display: inline-block; box-shadow: 0 0 0 1px #FAFAFA inset; text-shadow: 0 1px 0 #F5F5F5; }");
GM_addStyle("#mainnav *:link, #mainnav *:visited, #mainnav .active *:link, #mainnav .active *:visited { border: 1px solid #D5D5D5; }");
GM_addStyle("#mainnav *:link:hover, #mainnav .active *:link:hover, #mainnav *:visited:hover, #mainnav .active *:visited:hover { border: 1px solid #D5D5D5; background: #fff; }");
GM_addStyle("#mainnav .active *:link, #mainnav .active *:visited { background: #fff; color: #333; box-shadow: 0 0 3px rgba(0, 0, 0, 0.1) inset; }");

GM_addStyle("#mainnav *:link, #mainnav *:visited, #mainnav .active *:link, #mainnav .active *:visited { border-right-width: 0; }");
GM_addStyle("#mainnav *:link:hover, #mainnav .active *:link:hover, #mainnav *:visited:hover, #mainnav .active *:visited:hover { border-right-width: 0; }");
GM_addStyle("#mainnav li:last-child *:link, #mainnav li:last-child *:visited, #mainnav .active:last-child *:link, #mainnav .active:last-child *:visited { border-right-width: 1px; }");

GM_addStyle(":link, *:visited, dt em, .milestone .info h2 em { color: #0088CC; border-bottom-width: 0; } :link:hover, *:visited:hover { color: #005580; }");
/*GM_addStyle("table.progress td.closed { background: # }");*/
GM_addStyle("input[type=button], input[type=submit], input[type=reset] { background: none; background-color: #F5F5F5; background-image: linear-gradient(to bottom, #FFFFFF, #E6E6E6); background-repeat: repeat-x; }");
GM_addStyle("input[type=button], input[type=submit], input[type=reset] { border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) #A2A2A2; border-image: none; border-radius: 4px; border-style: solid; border-width: 1px; }");
GM_addStyle("input[type=button], input[type=submit], input[type=reset] { box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2) inset, 0 1px 2px rgba(0, 0, 0, 0.05); color: #333333; cursor: pointer; }");
GM_addStyle("input[type=button], input[type=submit], input[type=reset] { text-align: center; text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75); vertical-align: middle; }");
GM_addStyle("input[type=button]:hover, input[type=submit]:hover, input[type=reset]:hover { background-position: 0 -15px; background-color: #E6E6E6; color: #333333; transition: background-position 0.1s linear 0s; }");

// single ticket
GM_addStyle("#ticket { background-color: #F5F5F5; border: 1px solid #E3E3E3; border-radius: 4px; box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05) inset; margin-bottom: 20px; min-height: 20px; padding: 19px;");
GM_addStyle("#ticket table.properties { border-top-width: 0; } #ticket .description h3 { border-bottom-color: #E1E1E8; } .my-border { padding-top: 3px; border-bottom: 1px solid #E1E1E8; clear: both; }");
GM_addStyle("#content.ticket { min-width: 740px; max-width: 1200px; width: 75%; } #ticket table.properties { width: 700px; } #ticket .date { color: #999; } .description { line-height: 20px; }");
GM_addStyle("#ticket table.properties td, #ticket table.properties th { font-size: inherit; } #ticket table.properties th, #ticket .description h3 { color: #999; }");
GM_addStyle("#attachments { border: 1px solid #E1E1E8; border-radius: 4px; background-color: #F7F7F9; margin-bottom: 20px; padding: 5px 19px 9px; }");
GM_addStyle("#changelog { border: 1px solid #E1E1E8; border-radius: 4px; } #changelog .printableform { margin-bottom: 20px; }");
GM_addStyle("#attachments .attachments { margin-left: 0; } #attachments dt { list-style: none; line-height: 22px; margin-bottom: 2px; } #attachments dt a:first-child { vertical-align: top; margin-right: 2px; }");
GM_addStyle("#attachments dt a:first-child img { display: inline-block; vertical-align: middle; }");
GM_addStyle("#action { line-height: 2.4em; padding-bottom: 1em; } #action > div:hover { background-color: #EEE; cursor: pointer; }");

GM_addStyle(".dialogItem { padding: 10px; }");

// -----------------------------------------------------
// For the Tickets
// -----------------------------------------------------

var changes = {
    fontSize: 13,
    verticalAlign: 'middle'
};
 var items= ['table.listing tbody', 'table.listing th', 'table.listing td'];
for(var i = 0, len = items.length; i < len; i++){
    $(items[i]).css(changes);
}

// sutraukiami fieldset'ai
$("fieldset#properties legend").siblings().wrapAll('<div class="fieldset_wrappa"/>');
$("fieldset#properties .fieldset_wrappa").toggle();

$("fieldset legend").css("cursor","pointer");
$("fieldset legend").click(function() {
  if ($(this).parent().children(".fieldset_wrappa").length == 0) {
  	$(this).siblings().wrapAll('<div class="fieldset_wrappa"/>');
  }
  $(this).parent().children(".fieldset_wrappa").toggle();
});

// mygelis 'atsakyti' rodomas tik uzejus
GM_addStyle("#changelog h3 { margin-top: 0; } #changelog .changes { margin-bottom: 0; } #changelog .printableform { margin-bottom: 0; padding-bottom: 30px; }");

$(".inlinebuttons input[type=submit]").hide();
 $(".printableform").hover(function () {
  $(this).find(".inlinebuttons input[type=submit]").stop().fadeIn(200);
 }, function () {
  $(this).find(".inlinebuttons input[type=submit]").stop().fadeOut(100);
 });

// ikoneles tik reportuose!
var task = '<img src="http://ispp.vic.lt/icons/page_white_text.png" alt="Task" title="Task" />';
var defect = '<img src="http://ispp.vic.lt/icons/bug.png" alt="Bug" title="Defect / Bug" />';
var enhancement = '<img src="http://ispp.vic.lt/icons/star.png" alt="Enhancement" title="Enhancement / New Feature" />';
var install = '<img src="http://ispp.vic.lt/icons/install.png" alt="Install" title="Install" />';

var types = {
	'task': ['užduotis', 'task'],
	'defect': ['trūkumas', 'defect', 'gedimas (bug)'],
	'enhancement': ['patobulinimas', 'enhancement', 'atnaujinimas'],
  'install': ['diegimas']
};

$('table .type').css({
  textAlign: 'center'
}).each(function(){
	// Go through and replace the text with an icon

	var $this = $(this);
	var content = $this.text();
	var replaced = false;
	
	for(var key in types)
	{
		var obj = types[key];
		for(var value in obj)
		{
			if(content.indexOf(obj[value]) != -1)
			{
				content = content.replace(obj[value], eval(key));
				replaced = true;
				break;
			}
		}
		if(replaced)
			break;
	}

	if(content && content.length > 0){
		$this.html(content);
	}
});


// rodome tik paskutiniu 10 komentaru
GM_addStyle("#changelog .printableform { display: none; } #changelog .printableform:nth-last-child(-n+10) { display: block; } #showallcomments { color: #B94A48; }");
var pakeitimuSk = $('#changelog .printableform').length;
if ( pakeitimuSk > 10 ) {
  $('#changelog').prev('h2').empty().append('Paskutiniai 10 iš ' + pakeitimuSk + ' pakeitimų (<a href="#" id="showallcomments">rodyti visus</a>)');
  $('#showallcomments').click(function(){
    $('#changelog .printableform').show();

    

    $('body').scrollTop( $('#changelog .printableform').get($('#changelog .printableform').length - 11).offsetTop );

    return false;
  })
}

/*var tmpl = 
'<div style="position: fixed; bottom: 0; right: 0;"> \
	<input type="text" placeholder="Darbuotojas" size="9" class="darbuotojasTag" /> \
	<input type="button" class="darbuotojasSearch" value="Ieškoti" /> \
</div> \
';
$('body').append($(tmpl));
$('.darbuotojasSearch').bind('click', function() { showDarbuotojasInfo($('.darbuotojasTag').val()) })
*/
// autocomplete
var iconSet1    = GM_getResourceURL ("IconSet1");
var iconSet2    = GM_getResourceURL ("IconSet2");
var jqUI_CssSrc = GM_getResourceText ("jqUI_CSS");
jqUI_CssSrc     = jqUI_CssSrc.replace (/url\(images\/ui\-bg_.*00\.png\)/g, "");
jqUI_CssSrc     = jqUI_CssSrc.replace (/images\/ui-icons_222222_256x240\.png/g, iconSet1);
jqUI_CssSrc     = jqUI_CssSrc.replace (/images\/ui-icons_454545_256x240\.png/g, iconSet2);

GM_addStyle (jqUI_CssSrc);

GM_xmlhttpRequest({
  method: "GET",
  url: "http://isdev.vic.lt/Dev4/Kvis/Public/Workers.ashx",
  onload: function(response) {
   var darbuotojai = $.parseJSON(response.responseText);
   $("#action input, .darbuotojasTag, input#field-owner").each(function () {
    $(this).autocomplete({
     minLength: 2,
     source: function(request, response) {
        var results = $.ui.autocomplete.filter(darbuotojai, request.term);
        response(results.slice(0, 10));
     },
	 position: {  collision: $(this).hasClass('darbuotojasTag') ? "flip flip" : "none" },
	 appendTo: $(this).parent()
    }).data("autocomplete")._renderItem = function(ul, item) {
     var listItem = $("<li></li>")
      .data("item.autocomplete", item)
  	  .append('<a><div style="min-width: 32px; min-height: 32px; display: inline-block;"><img width="32" class="myNewImage" style="display: inline-block; padding: 0 5px 0 0; vertical-align: middle;" src="http://ispp.vic.lt/darbuotojai/' + item.value + '.jpg" title="' + item.value + '"></div>' + '<span style="display: inline; padding-right: 4px;">' + item.label + '</span></span></a>')
      .appendTo(ul);
      if (item.working == false) {
        listItem.find("a").css("color", "#B94A48");
      }
     return listItem;
    };
   });
  }
});

/* VARTOTOJŲ MINIATŪROS (VALIO) */
//pakeiciamas owner changes
$('.changes').each(function () {
  var ownerListItem = $(this).find('li strong:contains("owner")').parent();
  var owner = ownerListItem.find('em:eq(1)');
  ownerListItem.html("<strong>owner</strong>: " + '<span class="ownerChange">' + owner.html() + '</span>');   
});
$('.change h3').each(replacePatternsWithImg);

//.properties, .changes, .change, 
$('.ownerChange, .owner, tr td[headers="h_reporter"], tr td[headers="h_owner"], tr td[headers="h_cc"]').each(replaceTextWithImg);

function replaceTextWithImg() {
  var $this = $(this);
  var userid = $this.text().trim();
  if (userid.length > 0) {
    $this.html('<img class="myNewImage" src="http://ispp.vic.lt/darbuotojai/' + userid.toLowerCase() + '.jpg" title="' + userid + '">');
  }
}

function replacePatternsWithImg() {
  var $this = $(this);
  var patterns = ["Pakeitė", "prieš"];
  var children = $this.clone().children();
  var userid = children.remove().end().text().trim();

  for(var i = 0; i < patterns.length; i++)
  {
    userid = userid.replace(patterns[i], "");
  }
  userid = userid.trim();
  $this.html($this.html().replace(userid, '<img style="margin-bottom:2px;" class="myNewImage" src="http://ispp.vic.lt/darbuotojai/' + userid.toLowerCase() + '.jpg" title="' + userid + '">'));
}


$(".myNewImage").css ({
    width:      "32px",
    height:     "32px",
  	verticalAlign: "middle",
  	paddingRight: "5px",
  	cursor: "pointer"
});

$("table.listing tbody td, table.listing tbody th").css(
{
  verticalAlign: "middle",
});

/* ATTACHMENTAI */
$('#attachments .attachments dt').each(function(index, obj){
	var $this = $(this);
	var linkas = $this.find('a').first().attr('href');
	var naujas_linkas = linkas.replace('attachment/ticket', 'raw-attachment/ticket');
	var link_obj = $('<a/>').attr('href', naujas_linkas).html('<img src="http://ispp.vic.lt/icons/download.gif"/>');
	$this.prepend(link_obj);
});

/* SINGLE TICKET SELECT ACTION */
$("fieldset#action > div").on("click", function() {
	var $this = $(this);
	$("fieldset#action > div").find("input[type=text], select").attr("disabled", "disabled");
	$this.find("input[type=radio]").first().prop("checked", true);
	$this.find("input[type=text], select").first().removeAttr("disabled");
	setTimeout(function(){
		$this.find("input[type=text]").first().focus().select();
	}, 1);
});

/* VARTOTOJAS INFORMACIJA */

$('img.myNewImage').bind('click', showDarbuotojasInfo);

if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

function showDarbuotojasInfo(name) {
	var $this = $(this);
	var username = typeof name == "string" ? name : $this.attr('title');
	GM_xmlhttpRequest({
	  method: "GET",
	  url: "http://isdev.vic.lt/Dev4/Kvis/Public/Workers.ashx?username=" + username,
	  onload: function(response) {
		if(response.responseText.length == 0)
		{
			alert('Darbuotojų duomenų bazėje asmuo nerastas.');
			return;
		}
		var darbuotojas = $.parseJSON(response.responseText);
		var template = 
			'<div> \
				<table> \
					<tbody> \
						<tr> \
							<td colspan="4" style="text-align: center;" id="nuotrauka"> \
								<img width="500" height="600" src="{0}"> \
							</td> \
						</tr> \
						<tr> \
							<td width="64" id="grafikas"> \
								<img src="{1}"> \
							</td> \
							<td class="dialogItem" id="username">{2}</td> \
							<td id="email"><a href="mailto:{3}">{3}</a></td> \
							<td class="dialogItem" id="trumpasTelefonas">{4}</td> \
						</tr> \
					</tbody> \
				</table> \
			</div>';
		var containerWrap = $(template.format(darbuotojas.imgLink, darbuotojas.grafikasImgLink, darbuotojas.username, darbuotojas.email, darbuotojas.trumpasTelefonas)).dialog(
		{
			autoOpen: true,
			modal: true,
			resizable: false,
			draggable: false,
			title: darbuotojas.name + " " + darbuotojas.surname + ", " + darbuotojas.pareigos,
			width:'auto'
		});
	  },
	  onerror: function () {
	    alert('Darbuotojų duomenų bazėje asmuo nerastas.');
	  }
	});
}