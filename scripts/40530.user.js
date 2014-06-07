// ==UserScript==

// @name         Twitter & Google Analytics Hack for Shorten URL's services

// @namespace      http://www.twitter.com/cllaudiu

// @description   The script ads Campaign Source, Campaign Medium and Campaign Name variables to your links for easy tracking in Google Analytics of the traffic they create.
// @include      http://www.bit.ly/*

// @include       http://tweetburner.com/*

// @include      http://www.tweetburner.com/*

// @include      http://is.gd/*

// @include      http://www.is.gd/*

// @include      http://tinyurl.com/

// ==/UserScript==



if (window.location.href.indexOf('tweetburner.com') != -1)

{

	var custom_build = function ()

	{

		

		var str=document.getElementById('link_url').value;

		var hasquerystring = false;

		

		if (str.indexOf("?") != -1) hasquerystring = true;

		

		if (document.getElementById('__source').value != "")

		{

			if (!hasquerystring) str+="?"; else str+="&";

			str+="utm_source="+document.getElementById('__source').value;

			hasquerystring = true;

		}

		if (document.getElementById('__medium').value != "")

		{

			if (!hasquerystring) str+="?"; else str+="&";

			str+="utm_medium="+document.getElementById('__medium').value;

			hasquerystring = true;

		}

		if (document.getElementById('__name').value != "")

		{

			if (!hasquerystring) str+="?"; else str+="&";

			str+="utm_campaign="+document.getElementById('__name').value;

			hasquerystring = true;

		}

		

		document.getElementById('link_url').value = str;

	};



	obj = document.getElementById('new_link');

	obj.innerHTML= '' 

		+ '<p>'

			+'<input class="twurlbox" id="link_url" name="link[url]" size="30" type="text" />'

		+ '</p>'

		+ '<p>'

			+'<b>Campaign Source:</b> <br /><input class="twurlbox" id="__source" name="ga1" size="30" type="text" />'

		+ '</p>'

		+ '<p>'

			+'<b>Campaign Medium:</b> <br /><input class="twurlbox" id="__medium" name="ga1" size="30" type="text" />'

		+ '</p>'

		+ '<p>'

			+'<b>Campaign Name:</b> <br /><input class="twurlbox" id="__name" name="ga1" size="30" type="text" />'

		+ '</p>'

		+ '<p>'

			+ '<input name="commit" type="submit" id="__commit" value="Shorten it!" />'

		+ '</p>' ;

		

	document.getElementById('__commit').addEventListener("click", custom_build, true);

}



if (window.location.href.indexOf('is.gd') != -1)

{

	

	var custom_build = function ()

	{

		

		var str=document.getElementById('URL').value;

		var hasquerystring = false;

		

		if (str.indexOf("?") != -1) hasquerystring = true;

		

		if (document.getElementById('__source').value != "")

		{

			if (!hasquerystring) str+="?"; else str+="&";

			str+="utm_source="+document.getElementById('__source').value;

			hasquerystring = true;

		}

		if (document.getElementById('__medium').value != "")

		{

			if (!hasquerystring) str+="?"; else str+="&";

			str+="utm_medium="+document.getElementById('__medium').value;

			hasquerystring = true;

		}

		if (document.getElementById('__name').value != "")

		{

			if (!hasquerystring) str+="?"; else str+="&";

			str+="utm_campaign="+document.getElementById('__name').value;

			hasquerystring = true;

		}

		

		document.getElementById('URL').value = str;

	};



	obj = document.forms[0];

	obj.innerHTML= '' 

		+ ''

			+'<b>URL</b><input id="URL" class="textbox" type="text" value="" name="URL" size="55" maxlength="2000"/>'

		+ '<br />'

		

			+'<b>Campaign Source:</b> <br /><input class="textbox" id="__source" name="ga1" size="30" type="text" />'

		+ '<br />'

			+'<b>Campaign Medium:</b> <br /><input class="textbox" id="__medium" name="ga1" size="30" type="text" />'

		+ '<br />'

			+'<b>Campaign Name:</b> <br /><input class="textbox" id="__name" name="ga1" size="30" type="text" />'

		+ '<br />'

			+ '<input class="button" type="submit" id="__commit" value="Compress That Address!"/>'

		;

		

	document.getElementById('__commit').addEventListener("click", custom_build, true);



}



if (window.location.href.indexOf('tinyurl.com') != -1)

{

	

	var custom_build = function ()

	{

		

		var str=document.getElementById('url').value;

		var hasquerystring = false;

		

		if (str.indexOf("?") != -1) hasquerystring = true;

		

		if (document.getElementById('__source').value != "")

		{

			if (!hasquerystring) str+="?"; else str+="&";

			str+="utm_source="+document.getElementById('__source').value;

			hasquerystring = true;

		}

		if (document.getElementById('__medium').value != "")

		{

			if (!hasquerystring) str+="?"; else str+="&";

			str+="utm_medium="+document.getElementById('__medium').value;

			hasquerystring = true;

		}

		if (document.getElementById('__name').value != "")

		{

			if (!hasquerystring) str+="?"; else str+="&";

			str+="utm_campaign="+document.getElementById('__name').value;

			hasquerystring = true;

		}

		

		document.getElementById('url').value = str;

	};



	obj = document.forms[1];

	obj.innerHTML= '' 

		+ '<table cellpadding="5" bgcolor="#e7e7f7" align="center"><tbody><tr><td><b>Enter a long URL to make tiny:</b><br/>'

			+'URL<br /><input type="text" size="30" name="url" id="url" />'

		+ '<br />'

		

			+'Campaign Source: <br /><input id="__source" name="ga1" size="30" type="text" />'

		+ '<br />'

			+'Campaign Medium: <br /><input id="__medium" name="ga2" size="30" type="text" />'

		+ '<br />'

			+'Campaign Name: <br /><input id="__name" name="ga3" size="30" type="text" />'

		+ '<br />'

			+ '<input type="submit" value="Make TinyURL!" id="__commit" name="submit"/>'

		+ '<hr>Custom alias (optional):<br /><tt>http://tinyurl.com/</tt><input type="text" name="alias" value="" size="12" maxlength="30"><br /><small>May contain letters, numbers, and dashes.</small></td></tr></table>'

		;

		

	document.getElementById('__commit').addEventListener("click", custom_build, true);



}

if (window.location.href.indexOf('bit.ly') != -1)

{

	var custom_build = function ()

	{

		

		var str=document.getElementById('url').value;

		var hasquerystring = false;

		

		if (str.indexOf("?") != -1) hasquerystring = true;

		

		if (document.getElementById('__source').value != "")

		{

			if (!hasquerystring) str+="?"; else str+="&";

			str+="utm_source="+document.getElementById('__source').value;

			hasquerystring = true;

		}

		if (document.getElementById('__medium').value != "")

		{

			if (!hasquerystring) str+="?"; else str+="&";

			str+="utm_medium="+document.getElementById('__medium').value;

			hasquerystring = true;

		}

		if (document.getElementById('__name').value != "")

		{

			if (!hasquerystring) str+="?"; else str+="&";

			str+="utm_campaign="+document.getElementById('__name').value;

			hasquerystring = true;

		}

		

		document.getElementById('url').value = str;

	};



	obj = document.getElementById('shorten-action');

	obj.innerHTML= '' 
	+ '<form id="shorten_form" action="/" method="GET" accept-charset="utf-8" onsubmit="return beforeCompress();" >'
			+'<textarea style="display:none;" id="s" name="s"></textarea>'
		        +'<input type="hidden" name="keyword" value="" id="keyword_hidden" />'
			+'<fieldset>'
		+'<table cellpadding="0" cellspacing="0">'
		+'<tr>	<td> <br /> <b>Your URL</b> <input type="text" id="url" name="url" tabindex="1" /> </td> <td>&nbsp;</td></tr>'

		+ '<tr>	<td>'

			+'<br /><b>Campaign Source:</b> <input style="background-color:#FEFFEC; border:0 none; font-size:18px; height:24px; margin:0; padding:2px; width:100%;" id="__source" name="ga1" size="30" type="text" tabindex="2" />'

		+ '</td> <td>&nbsp;</td></tr>'

		+ '<tr>	<td>'

			+'<br /><b>Campaign Medium:</b> <input style="background-color:#FEFFEC; border:0 none; font-size:18px; height:24px; margin:0; padding:2px; width:100%;" id="__medium" name="ga1" size="30" type="text" tabindex="3" />'

		+ '</td> <td>&nbsp;</td></tr>'

		+ '<tr>	<td>'

			+'<br /><b>Campaign Name:</b> <input style="background-color:#FEFFEC; border:0 none; font-size:18px; height:24px; margin:0; padding:2px; width:100%;" id="__name" name="ga1" size="30" type="text" tabindex="4" />'

		+ '</td> <td id="shorten-button"><br /><br /><input class="button" id="__commit" type="submit" value="Shorten" /></td></tr>'

		+ '</table></fieldset></form>';

		

	document.getElementById('__commit').addEventListener("click", custom_build, true);

}