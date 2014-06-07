// ==UserScript==
// @name           Downloader for ReleaseTogether
// @namespace      --_--
// @description    Downloader for ReleaseTogether
// @include        http://www.releasetogether.com/telecourse-replays/*
// ==/UserScript==

function strrev(str) {
    var s = "";
    var i = str.length;
    while (i>0) {
        s += str.substring(i-1,i);
        i--;
    }
    return s;
}

var list_pages = new Array();
var list_pages_ids = new Array();
var list_pages_i = 0;

function process_page()
{
	var eles = document.getElementsByTagName("div");
	var j = 0;
	for(i=0;i<eles.length;i++)
	{
		ele = eles[i];
		if(ele.className != "post audio-post")
		{
			continue;
		}
		j++;
		/*
		if(j>1)
		{
			break; // for testing
		}
		*/
		as = ele.getElementsByTagName("a");
		if(as.length>0)
		{
			as = as[as.length-1];
			var id = as.href.substr(as.href.indexOf("accelerated-learning-call-")+"accelerated-learning-call-".length, as.href.length);
			id = id.substr(0, id.length-1);
			
			list_pages[list_pages.length] = as.href;
			list_pages_ids[list_pages_ids.length] = id;
			
			var div = document.createElement("a");
			div.id = "mp3_" + id;
			div.innerHTML = "* Loading Mp3...";
			div.href = "javascript:;";
			div.style.color = "#6E6E6E";
			ele.appendChild(div);
			
			//as.style.fontStyle = "strikethrough";
		}
	}
	
	process_list();
}

process_page();

function process_list()
{
	if(!list_pages[list_pages_i]) // if it's on the single audio page
	{
		var eles = document.getElementsByTagName("div");
		var found = false;
		for(i=0;i<eles.length;i++)
		{
			ele= eles[i];
			if(ele.id.substr(0,4)!="post")
			{
				continue;
			}
			var div = document.createElement("a");
			div.id = "mp3_single";
			div.innerHTML = "* Loading Mp3...";
			div.href = "javascript:;";
			div.style.color = "#6E6E6E";
			ele.appendChild(div);
			found = true;
			break;
		}
		
		if(found)
		{
			process_list_callback(document.body.innerHTML, false);
		}
		
		return;
	}
	
	l = list_pages[list_pages_i];
	id = list_pages_ids[list_pages_i];

	do_request(l,id,"process_list_callback");
}

function process_list_callback(text, id)
{
	/*
	// for reference
	<iframe width='538px' height='25px' src='http://www.audioacrobat.com/tplay/	Ba2854f4640b947c10c
	776639c3aa815bNQo8HSsUPDAgeEB9RGx0Y3tVVX4KNhFPPVsnXmxU'frameBorder='0'></iframe>
	*/
	if(id==false)
	{
		url = ele.getElementsByTagName("iframe")[0].src;
	} else {
		var url = "";
		var pattern = /\<iframe width=\'[0-9]+px\' height=\'[0-9]+px\' src=\'(http:\/\/www.audioacrobat.com\/tplay\/([a-z0-9\s]+))\'[\s]?frameBorder=\'[0-9]+\'\>\<\/iframe\>/ig;
		var result = pattern.exec(text);
		url = result[1];
	}	
	do_request(url, id, "process_list_xml_callback");
	
}

function process_list_xml_callback(text,id)
{
	var url_new = text.substr(text.indexOf("<source src=")+"<source src=".length+1, text.length);
	url_new = url_new.substr(0, url_new.indexOf(".mp3")+".mp3".length);
	
	var aid = "mp3_"+id;
	if(id==false)
	{
		aid = "mp3_single";
	}
	
	var a = document.getElementById(aid);
	a.style.color = "#B30048";
	a.href = url_new;
	a.innerHTML = "Download Mp3";
	
	
	list_pages_i++;
	if(id!=false)
	{
		process_list();
	}
}

function do_request(r_url, r_id, r_func)
{

	GM_xmlhttpRequest({
		method: 'GET',
		url: r_url,
		headers: {
		
		},
		onload: function(responseDetails)
		{
			var txt = responseDetails.responseText;
			if(r_func=="process_list_callback")
			{
				process_list_callback(txt, r_id);
			} else if(r_func == "process_list_xml_callback")
			{
				process_list_xml_callback(txt, r_id);
			}
		}
	});

}

