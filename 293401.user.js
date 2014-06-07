// ==UserScript==
// @name       OmegleAdditions
// @version    1.4
// @description  Omegle additional features
// @match      http://www.omegle.com/
// @copyright  2014+, TechnicalChaos
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @require    http://supportituk.co.uk/jscolor.js
// @require    http://supportituk.co.uk/jquery.cookie.js
// @require    http://supportituk.co.uk/OMMotd.js

// ==/UserScript==
var charArray = [":-)", ":-(", ":)", ":(", "(h)"];
var iconArray = ["☺", "☹", "☺", "☹", "❤"]

panelDiv = '<div id="OmegleControls" style="z-index:10000000; border-radius: 15px; opacity:0.5; padding:5px; color:white; font-weight:bold; position:fixed; height:325px; width:105px; right:0px; top:100px; background-image: linear-gradient(to top, #79CFA6 0%, #467C55 100%) ;">' + '<span class="sidebarA">Font Sizes</span><br />' + '<span class="sidebarA"><a href="#" class="fontLgBut">Up</a>&nbsp;<a href="#" class="fontSmBut">Down</a></span>' + '<br /><form>Colour:<br /><input style="display:inline-block; z-index:2000000000!important;"  class="YouColor color {pickerPosition:\'left\'}" ><br />Background: <input style="display:inline-block; z-index:2000000000!important;" class="BackColor color {pickerPosition:\'left\'}" >' + '<br />Intro:<textarea class="motdText" style="z-index:100000000; height:100px; width:100px;"></textarea>';

$("body").append(panelDiv);

if (!$.cookie("OABack"))
{
	fontColorYou = 000000;
	fontSizeCurrent = "1";
	fontColorBack = 'FFFFFF';
}
else
{
	var fontColorBack = $.cookie("OABack");
	var fontColorYou = $.cookie("OAYou");
	var fontSizeCurrent = $.cookie("OAFont");

	$(".YouColor").val(fontColorYou);
	$(".BackColor").val(fontColorBack);

}

fontSizeStranger = 1;
fontColorStranger = "000000";
sendNewVars = 0;


$('.BackColor').change(function()
{
	fontColorBack = $(this).val();
    if (useAdd == true){
        setParams(fontColorYou, fontSizeCurrent)}
});

$('.YouColor').change(function()
{
	fontColorYou = $(this).val();
	if (useAdd == true){
        setParams(fontColorYou, fontSizeCurrent)}
});

var newConnection = 1;
var useAdd = false;
var isAdd = false;
$('.fontLgBut').click(function()
{
	 Math.round((fontSizeCurrent +0.1) * 1000) / 1000;
	if (fontSizeCurrent >= 8)
	{
		fontSizeCurrent = 8;
	}
    if (useAdd == true){
        setParams(fontColorYou, fontSizeCurrent)}
});
$('.fontSmBut').click(function()
{
	fontSizeCurrent = Math.round((fontSizeCurrent -0.1) * 1000) / 1000;
	if (fontSizeCurrent <= 0.1)
	{
		fontSizeCurrent = 0.1;
	}
	if (useAdd == true){
        setParams(fontColorYou, fontSizeCurrent)}
});
setInterval(function()
{
	if ($(".disconnectbtn").html() == 'New<div class="btnkbshortcut">Esc</div>')
	{
		newConnection = 1;
	}
	else
	{
		if (newConnection == 1)
		{
			newConnection = 0;
			extraText = $('.motdText').val();
			setTimeout(function()
			{

				$(".chatmsg").val('SysMsg- Using .-.-.OmegleAdditions.-.-. Work in progress. Get it at http://supportituk.co.uk/projects/plugins/omegle .-.-.\r\n' +myMotd+'\r\n' + extraText + '\r\n');
				$(".sendbtn").click();

				setTimeout(function()
				{

					if ($('.strangermsg').length)
					{


						checkVar = $('.strangermsg').html();
						isAdd = checkVar.match(/.-.-./);
						if (isAdd == ".-.-.")
						{
							useAdd = true;
							sendNewVars = 1;

						}
						else
						{
							useAdd = false;

						}
					}
					else
					{
						useAdd = false;



					}


				}, 1000);

			}, 1500);




		}

	}


	$('.logbox').css('background-color', '#' + fontColorBack);
	$('.strangermsg').each(function()
	{
		fontSizeVar = fontSizeStranger;
		$(this).css('font-size', fontSizeVar + 'em');
		$(this).css('color', '#' + fontColorStranger);


		str = $(this).find('span:first').html();
		isSys = str.match(/SysMsg:/);
		if (isSys == "SysMsg:")
		{

			var sysparams = $(this).find('span:first').html().split('//');

			fontSizeStranger = sysparams[2];
			fontColorStranger = sysparams[1];

		}


		charDecode = $(this).html();
		for (var i = 0; i < charArray.length; i++)
		{
			charDecode = charDecode.replace(charArray[i], iconArray[i]);
		}

		$(this).html(charDecode);
	});

	$('.youmsg').each(function()
	{
		fontSizeVar = fontSizeCurrent;
		$(this).css('font-size', fontSizeVar + 'em');
		$(this).css('color', '#' + fontColorYou);

		charDecode = $(this).html();
		for (var i = 0; i < charArray.length; i++)
		{
			charDecode = charDecode.replace(charArray[i], iconArray[i]);
		}
		$(this).html(charDecode);

	});



}, 100);

function setParams(yourColor, yourSize)
{

	$(".chatmsg ").val('SysMsg: //' + yourColor + "//" + yourSize);
	$(".sendbtn").click();


}
setInterval(function()
{
	if (sendNewVars == 1)
	{
		sendNewVars = 0;
		setParams(fontColorYou, fontSizeCurrent);
	}
}, 1000);

setInterval(function()
{
	$.cookie("OABack", fontColorBack);
	$.cookie("OAYou", fontColorYou);
	$.cookie("OAFont", fontSizeCurrent);

}, 1000);