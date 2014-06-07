// ==UserScript==
// @name        Userscripts.org simple unescaped code tags checker
// @namespace   rAthur's space
// @description A simple and light script that automaticaly scan your messages on Userscipts.org to look for unescaped tags in <code> and <pre> blocks before sendinf them, warns you if it founds some, and proposes you to escape them for you. 
// @include     http*://*userscripts.org/forums*
// @include     http*://*userscripts.org/topics*
// @include     http*://*userscripts.org/reviews*
// @include     http*://*userscripts.org/scripts/edit*
// @include     http*://*userscripts.org/scripts/issues*
// @require     http://rathur.fr/Greasemonkey/USo/Simple_code_tags_escaper/jquery-1.9.1.min.js
// @version     1.3
// @grant       GM_xmlhttpRequest
// ==/UserScript==

/** Declare the version, this is usefull tu detect if update is available **/
scriptVersion = 1.3;

/** Main escape function **/
strEscape = function(str)
{
	return str.replace(/<(code|pre)>((?:.|\s)*?)<\/\1>/gmi,
		function(str, tag, raw)
		{
			return '<'+tag+'>'+raw.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g, '&#39;')+'</'+tag+'>';
		});
}

/** Function to check if a textarea contains unescaped tags **/
checkTextarea = function(obj)
{
	var str = obj.val();
	var newstr = strEscape(str);
	if (str!=newstr)
		return true
	return false;
}

/** Function to escape the tags in a textarea **/
escapeTextarea = function(obj)
{
	var str = obj.val();
	var newstr = strEscape(str);
	obj.val(newstr);
}

/** Add the alert box to the page **/
$('body').append('<div id="alertBox" style="display: none; position: fixed; z-index: 1000000; left: 50%; top: 50%; margin-left: -250px; margin-top: -200px; width: 500px; background: #eee; border-radius: 5px; border: 1px solid #666; box-shadow: 0px 0px 500px rgba(255,0,0,0.5); text-align: center;"><h3>Warning</h3><div style="padding: 0 10px 10px 10px;"><p>Unescaped tags have been found in your message.</p><p>What do you want to do ?</p><input type="button" value="Cancel" id="cancelPost" style="width: 100%;" /><input type="button" value="Post it anyway" id="postItAnyway" style="width: 100%; margin-top: 5px;" /><input type="button" value="Automaticaly escape tags and post it" id="escapeAndPost" style="width: 100%; margin-top: 5px;" /></div></div>');

/** Vars **/
var noAlert = false;
var submitedButton;

/** Bind submit buttons **/
$('*')
	.on('click', 'input[type="submit"]', function()
	{
		$('#alertBox').hide();
		if (noAlert==false)
		{
			var showAlert = false;
			$('textarea').each(function()
			{
				if (checkTextarea($(this)))
					showAlert = true;
			});
			if (showAlert==true)
			{
				noAlert = true;
				submitedButton = $(this);
				$('#alertBox').show();
				return false;
			}
		}
		return true;
	});

/** Cancel and quit the alert box **/
$('#cancelPost').click(function()
{
	$('#alertBox').hide();
	noAlert = false;
});

/** Post without escaping **/
$('#postItAnyway').click(function()
{
	submitedButton.trigger('click');
	noAlert = false;
	$('#alertBox').hide();
});

/** Escape and post **/
$('#escapeAndPost').click(function()
{
	$('textarea').each(function()
	{
		escapeTextarea($(this));
	});
	submitedButton.trigger('click');
	noAlert = false;
	$('#alertBox').hide();
});

/** Check for updates **/
checkLogFile = function()
{
	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: 'http://rathur.fr/Greasemonkey/USo/Simple_code_tags_escaper/_log.js?timestamp='+new Date().getTime(),
		onload: function(data)
		{
			if (data.responseText)
				eval(data.responseText);
		}
	});
}
checkLogFile();