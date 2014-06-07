// ==UserScript==
// @name           Gmail EML view
// @version        0.83b
// @auther         mailto:NazarenkoAl@gmail.com
// @description    Adds "View EML" link for .eml attachments in GMail
// @date           2013-02-19
// @license        GNU GPL v2.0
// @namespace      gev
// @include        http*://mail.google.com/*
// @icon           data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABx0lEQVRo3u2ZwY2EIBSGKYHtwOveLIEStoQpwRLowOveLGEa2MQSLMESPO11XUiemzdvngioDGYh+ZOJo/B9BiI+xTzP4soRRaAIFIEi8FoBrn1/vlcmKrNI4Wr2BBNtMprMmWYERsnBDxmD0wwPEheD/5NY4BvyxwTHclsDDbBh1obefXtCLTJtlo1IDIIYtcvJP19v0qQz6U0+UsPaMWFsyyCRRIuZqYBGHTQmM8otIfyNjN0gAR0rkESCgY8TgM66lBIr8B1ZB/4CKSV84KMEUkj4wkcLnCkRAr9L4AyJUPjdAkdKxMAfInCERCz8YQJ7JPbAHzWFKoCoQiXW4HGfpwqYAWqTCQae0H5pU8IBL0mf9SkCBH6JckwnDXe2gt/stLF9kONOidgHGQc/eKyJtXTk2sFXImYrwcLjLW6gRMdcJ30lQjdz3vBkro8M+LixwL0kQrbTwfCMvILUntdsSngJwMKLht+5N1qTqEIE1CvgNyRUiADuoE8JTyR6egM5AfyW34vMm2XEVRR74P5Ua8kXntaw7gKKRlzprs8sXM1WsbWWi6R1PuEyj3Z9F9AZTp8llu1xy10+MRWBIlAEisC/FvgF0bduEGSPIy0AAAAASUVORK5CYII=
// ==/UserScript==
// Icon by Neurovit (http://neurovit.deviantart.com/)
// TamperMonkey compatibility by Tim Berneman (tberneman@gmail.com)

(function(){
////////////////////////////////////////////////////////////////////////////////
// Gmail UI-related consts
var VIEW_EML_SIGNATURE = "&viewEML=1";
var TARGET_LOAD_DIV_CLASS = "nH";
var ATTACHMENT_TABLE_CLASS = "cf hr";
var VIEW_EML_LABEL = "View EML";
var IMG_LOADING_URI = "data:image/gif;base64,\
R0lGODlhDAAMAJECADMzM5mZmf///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgACACwAAAAADAAM\
AAACGpSPaQAq/FoICJ7pskU4qp4lmwB6WHlRoVMAACH5BAUKAAIALAIAAgAIAAgAAAIMlA9wqOsPowjh\
0VcAACH5BAUKAAIALAEABQAKAAIAAAIHTIQJYKlQAAAh+QQFCgACACwCAAIACAAIAAACC0yEacntDyMC\
wNECACH5BAUKAAIALAUAAQACAAoAAAIHjCOpm+BQAAAh+QQFCgACACwCAAIACAAIAAACDJQfcajrD6MA\
4NFXAAAh+QQFCgACACwBAAUACgACAAACBwSEGWGpUQAAIfkEBQoAAgAsAgACAAgACAAAAgsEhGnJ7Q8j\
CsHRAgA7";

////////////////////////////////////////////////////////////////////////////////
// Extending Gmail UI
function getElementsByClass(parent, tag_name, class_name)
{
	var allHTMLTags = parent.getElementsByTagName(tag_name);
	var res = [];
	for (i = 0; i < allHTMLTags.length; i++)
		if (allHTMLTags[i].className == class_name)
			res.push(allHTMLTags[i]);
	return res;
}

function get_download_link(attachment_table)
{
	var b = attachment_table.getElementsByTagName("a");
	if (b.length > 0)
	{
		var href = b[0].getAttribute("href");
		if (href !== undefined)
			return href.replace("inline", "safe");
	}
}

var num_eml_handled = 0;
function process_eml_attachment(attachment_table)
{
	function on_user_click(event, dl_url, href_id, img_id)
	{
		event.stopPropagation();
		event.preventDefault();

		var img_loading = document.getElementById(img_id);
		var view_href = document.getElementById(href_id);
		img_loading.setAttribute("style", "visibility: visible");
		view_href.setAttribute("style", "display:none");

		view_href.setAttribute("style", "display:none");
		// Added Nov 8, 2012 by Tim Berneman (tberneman@gmail.com)
		var loc = window.location;
		var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
		dl_url = loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length)) + dl_url;
		GM_xmlhttpRequest({
			method: 'GET',
			url: dl_url,
			headers:
			{
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml'
			},
			onload: function(resp_details)
			{
				if (resp_details.status == 200)
				{
					var view_window = window.open("", "_blank", "location=no,menubar=no,status=no,resizable=yes");
					view_window.document.write(VIEWER_TEMPLATE);
					var istr = new str_stream(resp_details.responseText);
					read_part(view_window, istr);
					view_window.setInterval("window.stop()", 1000);
				}
				img_loading.setAttribute("style", "visibility: hidden");
				view_href.setAttribute("style", "");
			}
		});
	}

	function do_add()
	{
		if (attachment_table.innerHTML.toString().indexOf("disp=safe") == -1)
			return false;
		var href = get_download_link(attachment_table);
		if (href === undefined || href.length === 0)
			return true;
		var links = attachment_table.getElementsByTagName("span");
		if (!attachment_table.hasAttribute("eml_view"))
		{
			num_eml_handled++;
			var img_loading_id = "eml_loading_" + num_eml_handled;
			var href_id = "eml_view_" + (num_eml_handled);

			var img_loading = document.createElement("img");
			img_loading.setAttribute("id", img_loading_id);
			img_loading.setAttribute("style", "visibility: hidden;");
			img_loading.setAttribute("src", IMG_LOADING_URI);

			var view_link = document.createElement("a");
			view_link.innerHTML = VIEW_EML_LABEL;
			view_link.setAttribute("id", href_id);
			view_link.setAttribute("href", "about:blank");
			view_link.setAttribute("target", "_blank");
			view_link.setAttribute("class", "e");
			view_link.addEventListener("click", function(evt){ on_user_click(evt, href, href_id, img_loading_id);}, true);

			links[1].appendChild(view_link);
			links[1].appendChild(img_loading);
			attachment_table.setAttribute("eml_view", "true");
		}
		return true;
	}
	if (do_add() !== true)
		attachment_table.addEventListener("DOMNodeInserted", do_add, false);
}

function process_attachment(attachment_table)
{
	var b = attachment_table.getElementsByTagName("b");
	if (b.length > 0)
	{
		var file_name = b[0].innerHTML.toString();
		if (file_name.length > 4 && file_name.toLowerCase().substr(file_name.length - 4, 4) == ".eml")
			process_eml_attachment(attachment_table);
	}
}

function process_view_table(msg_view_table)
{
	var attachments = getElementsByClass(msg_view_table, "table", ATTACHMENT_TABLE_CLASS);
	for (var i in attachments)
		process_attachment(attachments[i]);
}

function on_load_cb(event)
{
	if (event.target !== null && 
	  event.target !== undefined && 
	  event.target.tagName !== undefined &&
	  event.target.tagName.toLowerCase() == "div" &&
	  event.target.className == TARGET_LOAD_DIV_CLASS)
		process_view_table(document.body);
	
}
document.addEventListener("DOMNodeInserted", on_load_cb, false);

////////////////////////////////////////////////////////////////////////////////
// Generating HTML
var VIEWER_TEMPLATE = "<html>\
<head>\
  <meta content='text/html; charset=UFT-8' http-equiv='content-type'>\
  <script type='text/javascript'>\
    function resize_frame(id) {\
      var element = document.getElementById(id);\
      element.style.height = element.contentWindow.document.body.scrollHeight + 'px'; }\
  </script>\
</head>\
<body bgcolor='#f8f8f8'>\
<div style='width: 100%; margin: 0 auto; min-width: 600px; max-width: 1024px; background: #ffffff;' id='main_div'></div>\
</body></html>";
var HEADERS_TEMPLATE = 
"<html><head><meta content='text/html; charset={0}' http-equiv='content-type'></head>\
<body bgcolor='#ffffff'><table width='100%' border='0'>{1}</table></body></html>";

var HDRS_TO_DISPLAY = [
  ["From", "From:", "emails"],
  ["To", "To:", "emails"],
  ["Cc", "Copy:", "emails"],
  /*["Bcc", "Hidden copy:", emails],*/
  ["Date", "Sent:", "date"],
  ["Subject", "Subject:", null]];
var HDRS_ROW_TEMPLATE = "<tr><td width='auto' align='right' valign='top'><a style='color:#808080;'>{0}</a></td><td width='100%'>{1}</td></tr>";
var ICO_EXTENSONS = {
	"archive": "/7z/deb/gz/pkg/rar/rpm/zip/zipx/",
	"text"   : "/txt/c/py/cpp/h/htm/html/pl/class/bat/ini/cfg/log/",
	"doc"    : "/doc/docx/odt/",
	"spdsht" : "/xls/xlsx/ods/",
	"image"  : "/bmp/gif/jpg/png/psd/ai/jpeg/",
	"pdf"    : "/pdf/",
	"audio"  : "/mp3/wav/wma/ac3/aac/mid/",
	"video"  : "/flv/avi/mp4/",
	"email"  : "/msg/eml/"
	};
var EXT_ICONS = {
	""       : "http://mail.google.com/mail/images/generic.gif",
	"archive": "http://mail.google.com/mail/images/zip.gif",
	"text"   : "http://mail.google.com/mail/images/txt.gif",
	"doc"    : "http://mail.google.com/mail/images/doc.gif",
	"spdsht" : "http://mail.google.com/mail/images/xls.gif",
	"image"  : "data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACLUlEQVQ4y6WTTUiUURSGnxmcysiF4qqd\
SGCrwEWLNkK7wopM+hEitcJhmgiywBatclFQ5mJEhGooZhcYGAQtq12LIAkZJJ1mTKRxnKZm5vvu/9di\
/A2shXdz7+Ke577vec8NBUHATlYdwPjLj1soxlikMkilEULjS4UvFEJopNJIZTDG8ipxJVS3VnS16/C2\
rygDQgf4CjwZUJVwIXoPgPD/JP5Kp8lF21mKt1NMz1CV8CWdxa1a/ydAGVh+2EPb8H0OXDqKHOmkIsAY\
jXNsAIyx28q2LkDNvmX60zTaBXgyQCuJc8FGE6Uy23p2AymmRzrRLuBH7xQhBVoJ7FaAXi+ey+WZSE0B\
cL77DLv2H0QMz+HJgJCqgbUSGLsJIEQNkFsqMpGaIt7fTdUzxAdvc7HvGqnn4wD09A1S39iKUXKrAl8q\
cktFEslJbkXP4lyEZWmJxW/yIjnG4PUYkUgdxzramHhTQGuJtZtS8IUikZxkKHaOffV7+FlVzGRKhMJ7\
OXGqlyfJZ+TzBUafvmbgeDNGq3UL4TULD+70E47sZrEg+ZxeoVSWZBaKVHxDS9sRHifGyGQyxIYecfdG\
13oK4bUmliqK7GKZmfkiyyWBkgLhV8gXVjDa0dJ6iHcf3vMtm6Xj5OW/UzCslCSz89/5ulBGSYEUVTyv\
gl8t41V+Y7WkoaGJXDYDgHPNGwBjLKejo7ggwDlwrjZAxtZ2a2tn55qwrrF2Z3WUQzv9zn8Amz1x/K6j\
FTEAAAAASUVORK5CYII=",
	"audio"  : "http://mail.google.com/mail/images/sound.gif",
	"video"  : "http://mail.google.com/mail/images/generic.gif",
	"email"  : "http://mail.google.com/mail/images/txt.gif",
	"pdf"    : "http://mail.google.com/mail/images/pdf.gif"
};

function get_icon_src(filename)
{
	var iext = filename.lastIndexOf(".");
	var ext = ((iext != -1) ? filename.substr(iext + 1) : "///").toLowerCase();
	for (var i in ICO_EXTENSONS)
		if (ICO_EXTENSONS[i].indexOf("/" + ext + "/") != -1)
			return EXT_ICONS[i];
	return EXT_ICONS[""];
}

function append_div_section(view_window, target_html_code)
{
	var main_div = view_window.document.getElementById("main_div");
	var new_div = view_window.document.createElement("div");
	new_div.setAttribute("style", "margin: 0 10px;");
	new_div.innerHTML = target_html_code;
	main_div.appendChild(new_div);
}

function display_headers(view_window, headers)
{
	function prepare_emails(value)
	{
		var ret = [];
		var addresses = value.split(",");
		for (var i in addresses)
		{
			var addr = addresses[i].replace(/'/g, "");
			var haddr = addr.replace(/&/g, "&amp;").replace(/=/g, "&eq;").replace(/</g, "&lt;").replace(/</g, "&gt;");
			var link = "<a href='https://mail.google.com/mail?view=cm&tf=0&to=" + encodeURIComponent(addr) + "' target='_blank'>" + haddr + "</a>";
			ret.push(link);
		}
		return ret;
	}
	function format_header_value(value, format)
	{
		if (format == "date")
			return (new Date(value)).toLocaleString();
		else
		if (format == "emails")
			return prepare_emails(value).join(", ");
		else
			return value;
	}

	var headers_rows = "";
	for (var i in HDRS_TO_DISPLAY)
	{
		if (headers[HDRS_TO_DISPLAY[i][0]] !== undefined)
			headers_rows += HDRS_ROW_TEMPLATE.replace("{0}", HDRS_TO_DISPLAY[i][1]).replace("{1}", format_header_value(headers[HDRS_TO_DISPLAY[i][0]], HDRS_TO_DISPLAY[i][2]));
		if (headers["Subject"] !== undefined && view_window.document.title == "")
			view_window.document.title = headers["Subject"];
	}

	if (headers_rows.length > 0)
	{
		var headers_table = HEADERS_TEMPLATE.replace("{0}", headers["_charset_"]).replace("{1}", headers_rows);
		append_div_section(view_window, headers_table);
	}
}

function display_body(view_window, body)
{
	append_div_section(view_window, body);
}

function display_attachment(view_window, b64body, headers)
{
	var filename = headers["Content-Disposition"]["filename"];
	var ifx = "<img src='" + get_icon_src(filename) + "'></img><a href='data:application/octet-stream;base64," + b64body + "' download='" + filename + "'>" + filename + "</a>";
	append_div_section(view_window, ifx);
}
  
////////////////////////////////////////////////////////////////////////////////
// Parsing EML
function str_stream(str)
{
	var pp = 0, start = 0;

	this.push = function()
	{	pp = start;	}
	this.pop = function()
	{	start = pp;	}
	this.next = function()
	{
		if (start == -1)
			return null;
		var ret = "";
		var pos = str.indexOf("\n", start);
		if (pos == -1)
		{
			ret = str.substr(start);
			start = -1;
		} else
		{
			ret = str.substr(start, pos - start);
			start = pos + 1;
		}
		return trim_spaces(ret.replace(/^\r/, "").replace(/\r$/, ""));
	}
}

function trim_spaces(str)
{
	return str.replace(/^\s+/, "").replace(/\s+$/, "");
}

function unquot(str)
{
	return str.replace(/^"/, "").replace(/"$/, "");
}

function is_boundary(str, boundary)
{
	return str == ("--" + boundary);
}

function is_end_boundary(str, boundary)
{
	return str == ("--" + boundary + "--");
}

function is_multipart(headers)
{
	return (headers["Content-Type"][""].toLowerCase().indexOf("multipart/") == 0);
}

function is_text_body(headers)
{
	return (headers["Content-Type"][""].toLowerCase().indexOf("text/") == 0);
}

function qp_decode(body)
{
	var ret = "";
	var i = 0, slen = body.length;
	for (;;)
	{
		var pos = body.indexOf("=", i);
		if (pos == -1 || pos == slen - 1)
		{
			ret += body.substr(i);
			break;
		}
		ret += body.substr(i, pos - i);
		var c1 = body.charAt(pos + 1);
		if (c1 == "\n" || c1 == "\r")
			i = pos + 2;
		else
		{
			ret += String.fromCharCode(parseInt(c1 + body.charAt(pos + 2), 16));
			i = pos + 3;
		}
	}
	return ret;
}

var B64_KEY_TABLE = [
	0,   0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
	0,   0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
	0,   0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 62,  0,  0,  0, 63,
	52, 53, 54, 55, 56, 57, 58, 59, 60, 61,  0,  0,  0, 64,  0,  0,
	0,   0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
	15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,  0,  0,  0,  0,  0,
	0,  26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
	41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51];
function b64_decode(body)
{
	var ret = "";
	var c1, c2, c3;
	var e1, e2, e3, e4;
	var i = 0;
	body = body.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	while (i < body.length)
	{
		e1 = B64_KEY_TABLE[body.charCodeAt(i++)];
		e2 = B64_KEY_TABLE[body.charCodeAt(i++)];
		e3 = B64_KEY_TABLE[body.charCodeAt(i++)];
		e4 = B64_KEY_TABLE[body.charCodeAt(i++)];
		c1 = (e1 << 2) | (e2 >> 4);
		c2 = ((e2 & 15) << 4) | (e3 >> 2);
		c3 = ((e3 & 3) << 6) | e4;
		ret += String.fromCharCode(c1);
		if (e3 != 64)
			ret += String.fromCharCode(c2);
		if (e4 != 64)
			ret += String.fromCharCode(c3);
	}
	return ret;
}

function b64_encode(body)
{
	var b64_alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var ret = "";
	var i = 0;
	while (i < body.length)
	{
		var chr1 = body.charCodeAt(i++);
		var chr2 = body.charCodeAt(i++);
		var chr3 = body.charCodeAt(i++);
		var enc1 = (chr1 & 255) >> 2;
		var enc2 = ((chr1 & 3) << 4) | ((chr2 & 255) >> 4);
		var enc3 = ((chr2 & 15) << 2) | ((chr3 & 255) >> 6);
		var enc4 = chr3 & 63;
		if (isNaN(chr2))
			enc3 = enc4 = 64;
		else
		if (isNaN(chr3))
			enc4 = 64;
		ret += b64_alphabet.charAt(enc1) + b64_alphabet.charAt(enc2) + b64_alphabet.charAt(enc3) + b64_alphabet.charAt(enc4);
	}
	return ret;
}

function decode_body(body, headers)
{
	var encoding = trim_spaces(headers["Content-Transfer-Encoding"]).toLowerCase();
	if (encoding == "7bit" || encoding == "8bit")
		return body;
	else
	if (encoding == "quoted-printable")
		return qp_decode(body);
	else
	if (encoding == "base64")
		return b64_decode(body);
	else // "binary" or not defined
		return body;
}

function encode_attachment(body, headers)
{
	var encoding = trim_spaces(headers["Content-Transfer-Encoding"]).toLowerCase();
	if (encoding == "7bit" || encoding == "8bit")
		return b64_encode(body.replace(/&lt;/gmi, "<").replace(/&gt;/gmi, ">").replace(/&amp;/gmi, "&"));
	else
	if (encoding == "base64")
		return body;
	else
		return body;
}

function unescape_body(body, headers)
{
	var ct = headers["Content-Type"][""].toLowerCase();
	if (ct == "text/html")
		return body.replace(/&lt;/gmi, "<").replace(/&gt;/gmi, ">").replace(/&amp;/gmi, "&");
	else
	if (ct == "text/plain")
		return "<pre>" + body.replace(/</gm, "&lt;").replace(/>/gm, "&gt;").replace(/&/gm, "&amp;") + "<pre>";
	else
	  return body;
}

function parse_complex_param(value)
{
	var res = {};
	var params = value.split(";");
	for (var i in params)
	{
		var ieq = params[i].indexOf("=");
		if (ieq == -1)
		{
			var nam = "";
			var val = params[i];
		} else
		{
			var nam = params[i].substr(0, ieq);
			var val = params[i].substr(ieq + 1);
		}
		res[trim_spaces(nam)] = unquot(trim_spaces(val));
	} 
	return res;
}

function add_header(headers, current_header)
{
	var enc_word_re = "=\\?([^?]+)\\?([q|Q|b|B])\\?([^?]+)\\?=";

	var pos = current_header.indexOf(":");
	if (pos != -1)
	{
		var name = trim_spaces(current_header.substr(0, pos));
		var value = trim_spaces(current_header.substr(pos + 1));

		// Process encoded-word
		var all_ews = value.match(new RegExp(enc_word_re, "mg"));
		for (var i in all_ews)
		{
			var parsed_ew = all_ews[i].match(new RegExp(enc_word_re, "m"));
			headers["_charset_"] = parsed_ew[1];
			var decoded = (parsed_ew[2].toLowerCase() == "b") ? b64_decode(parsed_ew[3]) : qp_decode(parsed_ew[3]);
			value = value.replace(new RegExp(enc_word_re), decoded);
		}

		if (name == "Content-Type" || name == "Content-Disposition")
			headers[name] = parse_complex_param(value);
		else
		if (headers[name] == undefined)
			headers[name] = value;
		else
			headers[name] += ", " + value;
	}
}

function read_headers(istr)
{
	var headers = {
	  "Content-Type": {"": ""},
	  "_charset_":"UTF-8"
	};
	var hdr_val_re = /^[a-z][a-z0-9\-\_]+:[.]{0,}/i;

	var current_header = "";
	for (;;)
	{
		var line = istr.next();

		// End of message
		if (line == null)
			break;

		// End of headers
		if (line.length == 0)
		{
			current_header += line;
			break;
		}

		if (hdr_val_re.test(line) && current_header.length != 0)
		{
			add_header(headers, current_header);
			current_header = line;
		} else
			current_header += line;
	}
	if (current_header.length != 0)
		add_header(headers, current_header);

	return headers;
}

function read_part(view_window, istr, parent_boundary, required_alt_type)
{
	function read_multipart(boundary, required_alt_type)
	{
		var found = false;
		for (;;)
		{
			var ret = read_part(view_window, istr, boundary, required_alt_type);
			found |= ret.found;
			if (ret.finished == true)
				return {finished:true, found:found};
		}
	}
	var part_finished = true;
	var req_type_found = false;

	var headers = read_headers(istr);
	var this_boundary = (is_multipart(headers) && headers["Content-Type"]["boundary"] != null) ? headers["Content-Type"]["boundary"] : parent_boundary;

	// Process as single part
	var body= "";
	for (;;)
	{
		var line = istr.next();
		if ((line == null) || (this_boundary != null && is_end_boundary(line, this_boundary)))
		{
			part_finished = true;
			break;
		}
		else
		if (this_boundary != null && is_boundary(line, this_boundary))
		{
			part_finished = false;
			break;
		}
		else
			body += line + "\n";
	}

	// Display part
	display_headers(view_window, headers);
	if (!is_multipart(headers))
	{
		if (is_text_body(headers) && (required_alt_type == null || headers["Content-Type"][""].toLowerCase() == required_alt_type))
		{
			display_body(view_window, unescape_body(decode_body(body, headers), headers));
			req_type_found = true;
		} else
		if (headers["Content-Disposition"] != null && headers["Content-Disposition"][""].toLowerCase() == "attachment")
		{
			display_attachment(view_window, encode_attachment(body, headers), headers);
		}
	} else
	{
		// Process as multipart
		if (headers["Content-Type"][""].toLowerCase() == "multipart/alternative")
		{
			istr.push();
			var ret = read_multipart(this_boundary, "text/html");
			if (ret.found == false)
			{
				istr.pop();
				var ret = read_multipart(this_boundary, "text/plain");
			}
		} else
			var ret = read_multipart(this_boundary, null);
		req_type_found = ret.found;
	}

	return {finished:part_finished, found:req_type_found};
}
})();