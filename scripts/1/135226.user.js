// ==UserScript==
// @name           Better Lounge
// @description    Improves usability in the Lounge at baseballthinkfactory.org
// @include        http://www.baseballthinkfactory.org/files/forums/viewthread/*
// @include        http://www.baseballthinkfactory.org/forums/viewthread/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(document).ready(main);

function main()
{
	createSettingsPage();
	cleanUpLinks();
	fixQuoteLinksJQ();
	collapsibleZiggies();
	collapseZiggies();
	buildFormattingButtons();
}

function buildFormattingButtons()
{
	$('td.tableCellTwo').eq(0).children('div.itempadbig').eq(0)  // this is the fast reply 'smileys' div
		.html(
			'<table border="0" cellspacing="0" cellpadding="0" id="loungeFormattingButtons"><tr><td class="htmlButtonOuterL"><div class="htmlButtonInner"><div class="htmlButtonOff" id="button_bold"><a title="Bold Text" name="button_bold">&lt;b&gt;</a></div></div></td><td class="htmlButtonOuter"><div class="htmlButtonInner"><div class="htmlButtonOff" id="button_italic"><a title="Italic Text" name="button_italic">&lt;i&gt;</a></div></div></td><td class="htmlButtonOuter"><div class="htmlButtonInner"><div class="htmlButtonOff" id="button_underline"><a title="Underline Text" name="button_underline">&lt;u&gt;</a></div></div></td><td class="htmlButtonOuter"><div class="htmlButtonInner"><div class="htmlButtonOff" id="button_strike"><a title="Strike text" name="button_strike">&lt;del&gt;</a></div></div></td><td class="htmlButtonOuter"><div class="htmlButtonInner"><div class="htmlButtonOff" id="button_quote"><a title="Quoted Text" name="button_quote">quote</a></div></div></td><td class="htmlButtonOuter"><div class="htmlButtonInner"><div class="htmlButtonOff" id="button_code"><a title="Code Example" name="button_code">code</a></div></div></td><td class="htmlButtonOuter"><div class="htmlButtonInner"><div class="htmlButtonOff" id="button_email"><a title="Email Link" name="button_email">&nbsp;@&nbsp;</a></div></div></td><td class="htmlButtonOuter"><div class="htmlButtonInner"><div class="htmlButtonOff" id="button_link"><a title="Web Link" name="button_web">&lt;a&gt;</a></div></div></td></tr></table>'
		);
	$('#loungeFormattingButtons a')
		.css(
			{
				'color': 'rgb(0, 0, 0)',
				'text-decoration': 'none',
				'white-space': 'nowrap',
				'background-color': 'transparent',
				'font-family': 'Verdana,Arial,Trebuchet MS,Tahoma,Sans-serif',
				'font-size': '11px',
				'font-weight': 'bold',
				'text-align': 'center',
				'cursor': 'pointer'
			}
		);
	$('#loungeFormattingButtons div.htmlButtonOff')
		.css(
			{
				'font-family': 'Verdana,Arial,Trebuchet MS,Tahoma,Sans-serif',
				'font-size': '11px',
				'font-weight': 'bold',
				'padding': '1px 2px 2px',
				'white-space': 'nowrap',
				'text-align': 'center',
				'color': 'rgb(56, 57, 75)'
			}
		);
	$('#loungeFormattingButtons div.htmlButtonInner')
		.css(
			{
				'background-color': 'transparent',
				'text-align': 'center',
				'padding': '0 3px',
				'border-width': '1px',
				'border-style': 'solid',
				'border-color': 'rgb(255, 255, 255) rgb(204, 204, 204) rgb(204, 204, 204) rgb(255, 255, 255)',
				'font-family': 'Verdana,Geneva,Tahoma,Trebuchet MS,Arial,Sans-serif',
				'font-size': '11px',
				'color': 'rgb(56, 57, 75)'
			}
		);
	$('#loungeFormattingButtons td.htmlButtonOuterL')
		.css(
			{
				'border-left': '1px solid rgb(51, 51, 51)',
				'background-color': 'rgb(246, 246, 246)',
				'padding': '0',
				'border-top': '1px solid rgb(51, 51, 51)',
				'border-right': '1px solid rgb(51, 51, 51)',
				'border-bottom': '1px solid rgb(51, 51, 51)',
				'font-family': 'Verdana,Geneva,Tahoma,Trebuchet MS,Arial,Sans-serif',
				'font-size': '11px',
				'color': 'rgb(56, 57, 75)'
			}
		);
	$('#button_bold').click(
		function()
		{
			wrapTags('[strong]','[/strong]');
		}
	);
	$('#button_italic').click(
		function()
		{
			wrapTags('[em]','[/em]');
		}
	);
	$('#button_underline').click(
		function()
		{
			wrapTags('[u]','[/u]');
		}
	);
	$('#button_strike').click(
		function()
		{
			wrapTags('[del]','[/del]');
		}
	);
	$('#button_quote').click(
		function()
		{
			wrapTags('[quote]','[/quote]');
		}
	);
	$('#button_code').click(
		function()
		{
			wrapTags('[code]','[/code]');
		}
	);
	$('#button_email').click(emailTag);
	$('#button_link').click(urlTag);
}

function wrapTags(prefix,suffix)
{
	var textBox = $('.textarea').get(0);
	
	if('selectionStart' in textBox)
	{		
		$('.textarea').val(
			$('.textarea').val().substring(0,textBox.selectionStart)
			+prefix
			+$('.textarea').val().substring(textBox.selectionStart,textBox.selectionEnd)
			+suffix
			+$('.textarea').val().substring(textBox.selectionEnd)
		);
	}

}

function urlTag()
{
	var url = prompt("Enter the hyperlink URL","http://");
	
	if(!url || url == "http://" || url == null)
	{
		return;
	}
	
	var textBox = $('.textarea').get(0);
	var selection = "";
	
	if('selectionStart' in textBox)
	{
		selection = $('.textarea').val().substring(textBox.selectionStart,textBox.selectionEnd);
	}
	
	var title = prompt("Enter the title of the link",selection);
	
	if(!title || title == null)
	{
		return;
	}
	
	if('selectionStart' in textBox)
	{
		$('.textarea').val(
			$('.textarea').val().substring(0,textBox.selectionStart)
			+'[url='+url+']'
			+title
			+'[/url]'
			+$('.textarea').val().substring(textBox.selectionEnd)
		);
	}
}

function emailTag()
{
	var email = prompt("Enter the email address","");
	
	if(!email || email == null)
	{
		return;
	}
	
	var textBox = $('.textarea').get(0);
	var selection = "";
	
	if('selectionStart' in textBox)
	{
		selection = $('.textarea').val().substring(textBox.selectionStart,textBox.selectionEnd);
	}
	
	var title = prompt("Enter the link title (or leave the field empty to use the email address as the title.)",selection);
	
	if(title == "")
	{
		title = email;
	}
	
	if(!title || title == null)
	{
		return;
	}
	
	if('selectionStart' in textBox)
	{
		$('.textarea').val(
			$('.textarea').val().substring(0,textBox.selectionStart)
			+'[email='+email+']'
			+title
			+'[/email]'
			+$('.textarea').val().substring(textBox.selectionEnd)
		);
	}
}

function createSettingsPage()
{	
	$('#footer').append('<div id="loungePrefs"></div>');
	$('#loungePrefs').append('<div id="loungePrefsToggleDiv"><a id="loungePrefsToggle"></a></div><div id="loungePrefsContainer"><div id="loungePrefsHeader"></div><div id="loungePrefsBody"></div></div>');
	
	// initially show the toggle div, not the body div
	$('#loungePrefsToggleDiv').show();
	$('#loungePrefsContainer').hide();
	
	// build the container
	$('#loungePrefsContainer')
		.css(
			{
				'text-align': 'center',
				'margin': '0 auto',
				'width': '450px'
			}
		);
	
	
	// build content for the header
	$('#loungePrefsHeader')
		.css(
			{
				'border': '1px solid rgb(167, 169, 199)'
			}
		)
		.addClass('tableRowHeading')
		.append('<b>Lounge Preferences</b>');
		
	// build content for the body
	$('#loungePrefsBody')
		.css(
			{
				'border': '1px solid rgb(167, 169, 199)',
				'border-top': 'none',
				'text-align': 'center'
			}
		)
		.addClass('tableCellOne')
		.append('<table align="center"><tr><td class="settingsLabel">Ziggurat level to auto-collapse:</td><td width="50px"><input type="text" id="autoCollapseLevel" style="width:100%;"/></td></tr><tr><td class="settingsLabel">Refresh page after saving?</td><td><input type="checkbox" id="refreshAfterSave" style="width:100%;"/></td></tr></table>')
		.append('<table align="center"><tr><td><div class="button150"><div id="loungePrefsSave" class="buttonLarge" onmouseover="navHover(this);" onmouseout="navReset(this);">Save</div></div></td><td><div class="button150"><div id="loungePrefsCancel" class="buttonLarge" onmouseover="navHover(this);" onmouseout="navReset(this);">Cancel</div></div></td></tr></table>');
	$('.settingsLabel').css(
		{
			'text-align': 'left',
			'padding-left': '6px'
		}
		);
	$('.loungePrefsButtonTable').css('margin','0 auto');
	
	// configure link click event
	$('#loungePrefsToggle').text('Edit Lounge Preferences')
		.attr('href','#')
		.attr('title','Click to edit your Lounge preferences')
		.click(
			function(e)
			{
				e.preventDefault();
				$('#autoCollapseLevel').val(GM_getValue("autoCollapseLevel"),"");
				if(GM_getValue("refreshAfterSave",false))
				{
					$('#refreshAfterSave').attr('checked',true); 
				}
				$('#loungePrefsToggleDiv').hide();
				$('#loungePrefsContainer').show();	
				scrollTo(0,99999999999);
			}
		);
	
	// configure save button click event
	$('#loungePrefsSave').click(
		function(e)
		{
			e.preventDefault();
			var autoCollapseLevel = parseInt($('#autoCollapseLevel').val(),10);
			if(isFinite(autoCollapseLevel))
			{
				GM_setValue("autoCollapseLevel",autoCollapseLevel);
			}
			else
			{
				GM_setValue("autoCollapseLevel",0);
			}
			if($('#refreshAfterSave').attr('checked'))
			{
				GM_setValue("refreshAfterSave",true);
				location.reload();
			}
			else
			{
				GM_setValue("refreshAfterSave",false);
			}
			$('#loungePrefsToggleDiv').show();
			$('#loungePrefsContainer').hide();
		}
	);
	
	// configure cancel button click event
	$('#loungePrefsCancel').click(
		function(e)
		{
			e.preventDefault();
			$('#loungePrefsToggleDiv').show();
			$('#loungePrefsContainer').hide();
		}
	);
}

function collapsibleZiggies()
{	
	var count=0;
	$('div.quote_author').each(
		function()
		{
			count++;
			var id = "ziggy"+count;
			$(this).html('<span id="'+id+'">[-]</span> '+$(this).html());
			$('#'+id).click(
				function()
				{
					if($(this).text() == "[-]")
					{
						$(this).parent().nextAll().hide();
						$(this).text("[+]");
					}
					else
					{
						$(this).parent().nextAll().show();
						$(this).text("[-]");
					}
				}
			).css('cursor','pointer');
		}
	);
}

function collapseZiggies()
{	
	var levelToCollapse = GM_getValue("autoCollapseLevel",0);
	if (levelToCollapse == 0)
	{
		return;
	}
	
	$('.post').each(
		function()
		{
			var blockquote = $(this);
			for(var i = levelToCollapse; i>0; i--)
			{
				blockquote = blockquote.children('blockquote').eq(0);
			}
			var quoteline = blockquote.children('div.quote_author').eq(0);
			quoteline.nextAll().hide();
			quoteline.children('span').eq(0).text("[+]");
		}
	);
}

function cleanUpLinks()
{
	$('a[href^="http://www.baseballthinkfactory.org/?URL="]').each(
		function()
		{
			$(this).attr('href',decodeURIComponent($(this).attr('href').substring(41)));
		}
	);
}

function fixQuoteLinksJQ()
{

	$('a[href^="http://www.baseballthinkfactory.org/forums/quotereply"]').each(
		function()
		{
			var post = $(this).parents('tbody').eq(1)
				.children('tr').eq(1)
				.children('td').eq(1)
				.children('.post').eq(0);
			var date = $(this).parents('tr').eq(0)
				.children('td').eq(0)
				.text().replace("Posted: ","");
			date = convertDate(date);
			var author = $(this).parents('tbody').eq(1)
				.children('tr').eq(1)
				.children('td').eq(0)
				.children('div').eq(0)
				.children('a').eq(0)
				.text();
			var postText = '[quote author="'+author+'" date="'+date+'"]'+cleanupJQ(post)+'[/quote]';
			$(this).click(
				function(e)
				{
					e.preventDefault();
					$('.textarea').val(postText);
					$('#fastreply').css('display',"block");  // need to do it this way instead of using .show() so the toggle button still works
					scrollTo(0,99999999999);
				}
			);
		}
	);
	
	return true;
}

function cleanupJQ(element)
{
	var cleanText = "";
	var prefix = "";
	var suffix = "";
	var suppressTraversing = false;
	
	if (element.nodeType == 3)
	{
		cleanText = element.text();
	}
	
	switch (element.get(0).tagName)
	{
		case "STRONG":
			prefix = "[strong]";
			suffix = "[/strong]";
			break;
		case "B":
			prefix = "[b]";
			suffix = "[/b]";
			break;
		case "EM":
			prefix = "[em]";
			suffix = "[/em]";
			break;
		case "I":
			prefix = "[i]";
			suffix = "[/i]";
			break;
		case "U":
			prefix = "[u]";
			suffix = "[/u]";
			break;
		case "DEL":
			prefix = "[del]";
			suffix = "[/del]";
			break;
		case "CODE":
			prefix = "[code]";
			suffix = "[/code]";
			break;
		case "A":
			if (element.attr('href').substring(0,7) == "mailto:")
			{
				// email link
				prefix = "[email="+element.attr('href').substring(7)+"]";
				suffix = "[/email]";
			}
			else
			{
				// web link
				prefix = "[url="+element.attr('href')+"]";
				suffix = "[/url]";
			}
			break;
		case "BLOCKQUOTE":
			if(element.children('div').size() == 0)
			{
				// not quoting anybody
				prefix = "[quote]";
			}
			else
			{
				// quoting somebody, we'll figure out who it is and the timestamp later.
				prefix = "[quote ";
			}
			suffix = "[/quote]";
			break;
		case "SPAN":
			if(element.parents('code').size() > 0)
			{
				break;
			}
if(element.css('font-size') != "")
			{
				switch (element.css('font-size'))
				{
					case "9px":  // small
						prefix = "[size=1]";
						break;
					case "14px":  // medium
						prefix = "[size=3]";
						break;
					case "16px":  // large
						prefix = "[size=4]";
						break;
					case "18px":  // very large
						prefix = "[size=5]";
						break;
					case "20px":  // largest
						prefix = "[size=6]";
						break;
				}
				suffix = "[/size]";
			}
			if(element.css('color') != "")
			{
				prefix = "[color="+element.css('color')+"]";
				suffix = "[/color]";
			}
			
			break;
		case "DIV":
			if (element.hasClass('quote_author'))
			{
				var pieces = element.html().split(" - ");
				var author = pieces[0];
				for (var i = 1; i < pieces.length - 1; i++)
				{
					author = author + " - " + pieces[i];
				}
				prefix = 'author="'+author+'" date="'+""+convertDate(pieces[pieces.length - 1])+'"]';
				suppressTraversing = true;
			}
			break;
	}
	
	if(!suppressTraversing)
	{
		element.contents().each(
			function()
			{
				if(this.nodeType == 3)
				{
					cleanText = cleanText + this.nodeValue;
				}
				else
				{
					cleanText = cleanText + cleanupJQ($(this));
				}
			}
		);
	}
	
	return prefix + cleanText + suffix;
}

function convertDate(timeString)
{
	var d1 = new Date(Date.parse(timeString));
		
	var day    = d1.getDate();
	var month  = d1.getMonth();
	var year   = d1.getFullYear();
	var hour   = d1.getHours();
	var minute = d1.getMinutes();
	
	// constants
	var utc_offset_in_hours;
	var today = new Date();
	if (isDST(today))
	{
		utc_offset_in_hours = 4;  // EDT is UTC-04
	}
	else
	{
		utc_offset_in_hours = 5;  // EST is UTC-05
	}
	var seconds_per_minute = 60;
	var minutes_per_hour = 60;
	var milliseconds_per_second = 1000;
	
	var utc_offset_in_ms = utc_offset_in_hours*milliseconds_per_second*seconds_per_minute*minutes_per_hour;
	
	return (Date.UTC(year,month,day,hour,minute) + utc_offset_in_ms)/milliseconds_per_second;  // EE expects seconds, not milliseconds
}

// function adapted from http://blog.kaosweaver.com/index.php?entry=entry080107-115220
function isDST(d) {
   var dY=d.getFullYear();
   var d1=new Date(dY,0,1,0,0,0,0); 
   var d2=new Date(dY,6,1,0,0,0,0);
   var d1a=new Date((d1.toUTCString()).replace(" GMT",""));
   var d2a=new Date((d2.toUTCString()).replace(" GMT",""));
   var o1=(d1-d1a)/3600000;
   var o2=(d2-d2a)/3600000;
   var rV=0;
   if (o1!=o2) {
   		d.setHours(0);d.setMinutes(0);d.setSeconds(0);d.setMilliseconds(0);
		var da=new Date((d.toUTCString()).replace(" GMT",""));
		o3=(d-da)/3600000;		
		rV=(o3==o1)?0:1;
   }
	return rV;	
}