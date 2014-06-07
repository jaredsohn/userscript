// ==UserScript==
// @name           ASFSLinker
// @namespace      ASFSL
// @include        http://anisearch.de/*page=anime*id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @version         1.1.2
// ==/UserScript==

function supports_html5_storage() {
	try {
		return 'localStorage' in window && window['localStorage'] !== null;
	} catch (e) {
		return false;
	}
}
function createbox(fsitems)
{
	var boxhead="<div class=\"abstand5\">&nbsp;</div>"+
	"<table border=\"0\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" class=\"boxcontent\"><tbody><tr><td class=\"boxheader\">Fansubs</td></tr>";
	var boxend="</tbody></table>";
	var colorpart="";
	var boxcontent="";
	$.each(fsitems, function(i, val)
	{
		switch(val.status)
		{
			case "komplett": colorpart="color:#004000;"; break;
			case "laufend": colorpart="color:#285177;"; break;
			case "geplant": colorpart="color:#87CEFA;"; break;
			case "lizenziert": colorpart="color:#C00000;"; break;
			default: colorpart=""; break;
		}
		boxcontent+="<tr><td style=\"padding:3px;\"><a style=\"color:#000\" href=\"http://fan-sub.de/fansub.rhtml?id="+val.fsid+"\">"+val.grptag+" <span style=\""+colorpart+" font-weight:bold;\">"+val.status+"</span> ("+val.availeps+")</a></td></tr>";
		colorpart="";
	});
	$(".boxcontent:first").after(boxhead+boxcontent+boxend);
}
function getlocal(id)
{
	return eval("(" + localStorage.getItem(id) + ")");
}

var exp = /id=([0-9]*)/;
var datastore = new Object();

exp.exec(window.location.href);
id=RegExp.$1;
if(id!="")
{
	if($(".atitle1:contains('Erhältlich') ~td:contains('Deutsch')").html()) var ohh=':)';
	else
	{
		if(supports_html5_storage)
			datastore=getlocal(id);
		var currts = Math.round(new Date().getTime() / 1000);
		if(datastore!=null && (datastore.noupdate==true||datastore.nextupdate>currts))
		{
			createbox(datastore.fs);
		}
		else
		{
			GM_xmlhttpRequest(
			{
				method: 'GET',
				url: 'http://www.fan-sub.de/asfslinker.rb?id='+id,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) GM ASFSLinker',
				},
				onerror: function(responseDetails)
				{
					if(supports_html5_storage)
					{
						datastore=getlocal(id);
						if(datastore!=null)
							createbox(datastore.fs);
					}
				},
				onload: function(responseDetails)
				{
					datastore=eval("(" + responseDetails.responseText + ")");
					if(supports_html5_storage)
						localStorage.setItem(id, responseDetails.responseText);
					createbox(datastore.fs);
				}
			});
		}
	}
}