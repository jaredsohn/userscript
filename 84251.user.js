// ==UserScript==
// @name          NIC.RU Domains Checker Tweak
// @namespace     https://www.nic.ru/cgi/na.cgi
// @description   Hiding some unnecessary functions in RuCenter domains checker
// @include       https://www.nic.ru/cgi/*
// ==/UserScript==

(function()
{

var jq = document.createElement('script');
jq.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(jq);

// Check if jQuery's loaded
function gm_wait()
{
	if (!unsafeWindow.jQuery){ window.setTimeout(gm_wait, 100); return; }
	
	$ = jQuery = unsafeWindow.jQuery;
	runScript();
}
gm_wait();

var loader_image = 'data:image/gif;base64,'
	+'R0lGODlhEAALAPQAAP///7+/v/X19fLy8vn5+cDAwL+/v8rKyt/f39bW1u3t7cfHx9HR0eHh4dfX'
	+'1+7u7sjIyL+/v9LS0vj4+PT09Pv7+8zMzPX19fv7++zs7Obm5vHx8fr6+gAAAAAAAAAAACH/C05F'
	+'VFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAA'
	+'EAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJ'
	+'CwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJ'
	+'CwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHT'
	+'uBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V5'
	+'5zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme'
	+'1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAA'
	+'ABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2'
	+'y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2'
	+'isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0'
	+'DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA';

function getFieldRexexp(field, is_global)
{
	var global_flag = (is_global) ? "g" : "";
	return new RegExp(field+":\\s+([\\w\\.\\-\" ]+)", "i"+global_flag)
}

function getFieldValue(field, text)
{
	var matched = text.match(getFieldRexexp(field));
	return (matched && matched.length) ? matched[1].replace(/^\s+|\s+$/, "") : null;
}


function getFieldMultiValue(field, text)
{
	var values = [];
	
	var matched = text.match(getFieldRexexp(field, true));
	if (matched)
	{
		matched.forEach(function(element)
		{
			var value = getFieldValue(field, element);
			if (value !== null)
			{
				values.push(value);
			}
		});
	}
	
	return values;
}



function insert_domain_info(domain, callback)
{
	if (domain.search(/^[\w\-]+\.(ru|su|com|net|org|info)$/) < 0){ return; }
	
	var iframe = document.createElement("iframe");
	iframe.src = 'https://www.nic.ru/whois/?domain='+domain;
	iframe.style.display = "none";
	
	document.body.appendChild(iframe);
	
	//console.log(domain);
	
	$(iframe).load(function()
	{
		var elements = this.contentWindow.document.getElementsByTagName("div");
		var info = null;
		
		for(var i=0; i<elements.length; i++)
		{
			var element = elements[i];
			
			if (element.getAttribute("id") == "whois")
			{
				var owner = getFieldValue("person", element.textContent) || getFieldValue("org", element.textContent) || "Unknown";
				
				info = {
					domain:      domain,
					owner:       owner,
					created:     getFieldValue("created", element.textContent),
					paidtill:    getFieldValue("paid-till", element.textContent),
					nameservers: getFieldMultiValue("nserver", element.textContent)
				}
				
				break;
			}
		}
		
		callback.call(null, info);
	});

}

function runScript()
{
	$("#new_search").css("display", "block").css("marginTop", "10px");
	$("#new_search_switcher").hide();
	$("#new_search h1").hide();
	$("#new_search tr td.check_all").hide();
	$("#new_search table.inp_dom_1").attr("width", "100%");
	$("table.tab_zone").hide();
	
	
	$("#short_list table.domain_list tr.domain_list_header td").each(function()
	{
		var td = $(this);
		if (td.text().search("Цена") < 0){ return; }
		
		td.html("<b>Владелец</b>");
	});
	
	$("#short_list table.domain_list tr").each(function()
	{
		var row = $(this);
		
		var price_cell = row.find("td.domprice").empty();
		
		var is_occupied = !row.find("input[name=new_domain]").length;
		
		if (is_occupied)
		{
			price_cell.html('<img src="'+loader_image+'" align="absmiddle" style="margin-right:3px;"> Загрузка...');
			
			var domain_name = "";
			$(this).find("td.dom_name span").each(function()
			{
				domain_name = this.textContent.replace(/\s/g, "");
				
				//$(this).wrap('<a href="http://'+domain_name+'" target="_blank"></a>');
				
				var alink = document.createElement("a");
				
				alink.setAttribute("href", 'http://'+domain_name);
				alink.setAttribute("target", "_blank");
				
				this.parentNode.appendChild(alink);
				alink.appendChild(this);
			});
			
			insert_domain_info(domain_name, function(info)
			{
				//console.log(info);
				var html = "<b>"+info.owner+"</b> ("+info.created+" / "+info.paidtill+")";
				
				if (info.nameservers.length)
				{
					html += '<div>nserver: '+info.nameservers.join(", ")+'</div>';
				}
				
				price_cell.empty().html(html);
				
			});
		}
		
	});
	
}



})();