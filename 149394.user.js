// ==UserScript==
// @name		VK download video
// @description		test
// @include		http://vk.com/*
// @include		http://*.vk.com/*
// @version		1.0
// @date		01-01-2012
// ==/UserScript==

    var d = document;

    function getUrl(mov) {
	var s = d.body.innerHTML;

	if (s.indexOf('\\"uid\\"') != -1)
	{
		var uid = s.substr(s.indexOf('\\"uid\\"')+10);
		uid = uid.substr(0,uid.indexOf('\\'));

		var host = s.substr(s.indexOf('\\"host\\"')+11);
		host = host.substr(0,host.indexOf('\\"'));

		var vtag = s.substr(s.indexOf('\\"vtag\\"')+11);
		vtag = vtag.substr(0,vtag.indexOf('\\"'));

		var vkid = s.substr(s.indexOf('\\"vkid\\"')+11);
		vkid = vkid.substr(0,vkid.indexOf('\\"'));

		var no_flv = s.substr(s.indexOf('\\"no_flv\\"')+11);
		no_flv = no_flv.substr(0,no_flv.indexOf(','));
	}
	else if (s.indexOf('uid=') != -1 )
	{
		var uid = s.substr(s.indexOf('uid=')+4);
		uid = uid.substr(0,uid.indexOf('&'));
		var host = s.substr(s.indexOf('host=')+5);
		if (host.indexOf('host=') > 0)
			host = host.substr(host.indexOf('host=')+5);
		host = host.substr(0,host.indexOf('&'));

		var vtag = s.substr(s.indexOf('vtag=')+5);
		if (vtag.indexOf('vtag=') > 0)
			vtag = vtag.substr(vtag.indexOf('vtag=')+5);
		if ((vtag.indexOf('"') != -1 && vtag.indexOf('"') < vtag.indexOf('&')) || vtag.indexOf('&') == -1)
			vtag = vtag.substr(0,vtag.indexOf('"'));
		else
			vtag = vtag.substr(0,vtag.indexOf('&'));

		var vkid = s.substr(s.indexOf('vkid=')+5);
		vkid = vkid.substr(0,vkid.indexOf('&'));
		var no_flv = s.substr(s.indexOf('no_flv=')+7);
		no_flv = no_flv.substr(0,no_flv.indexOf('&'));
	}
	else
	{
		var uid = s.substr(s.indexOf('"uid"')+7);
//alert(s.indexOf('youtube.com'));
		uid = uid.substr(0,uid.indexOf('"'));

		var host = s.substr(s.indexOf('"host"')+8);
		host = host.substr(0,host.indexOf('"'));

		var vtag = s.substr(s.indexOf('"vtag"')+8);
		vtag = vtag.substr(0,vtag.indexOf('"'));

		var vkid = s.substr(s.indexOf('"vkid"')+8);
		vkid = vkid.substr(0,vkid.indexOf('"'));

		var no_flv = s.substr(s.indexOf('"no_flv"')+9);
		no_flv = no_flv.substr(0,no_flv.indexOf(','));
	}

	var res;
	if (no_flv == '1') 
		res=240;
	else
		res=360;

	host = host.replace(/\\/gi,"");
	host = host.replace(/%3a/gi,":");
	host = host.replace(/%2f/gi,"/");

	var link;
	if (uid == '0')
	{
	        link = "http://" + host + "/assets/videos/";
	        link += vtag;
	        link += vkid;
	        link += ".vk.flv";
	}
	else
	{
		link = (host.substr(0, 4) == "http") ? host : 'http://cs' + host + '.vkontakte.ru/';
		if (mov)
			link = link + 'u' + uid + '/video/' + vtag + '.'+res+'.mov';
		else
			link = link + 'u' + uid + '/video/' + vtag + '.flv';
	}

	link = link.replace(/%3a/gi,":");
	link = link.replace(/%2f/gi,"/");
	link = link.replace(/\\/gi,"");

        return link;
    }

function dump(arr,level)
{
	var dumped_text = "";
	if (!level)
		level = 0;

	//The padding given at the beginning of the line.
	var level_padding = "";
	var value;
	for( var j=0; j<level+1; j++)
		level_padding += "    ";

	var nl = '<br>';

	if(typeof(arr) == 'object')
	{ //Array/Hashes/Objects
		for (var it in arr)
		{
			if (!it)
				continue;

			value = arr[it];

			if (typeof value == 'object' )
			{
				dumped_text += level_padding + it + " ..."+nl;
				if (typeof arr != 'object')
					dumped_text += dump(value,level+1);
			}
			else
			{
				if (typeof value == "function")
					continue;

					dumped_text += level_padding + it + " => " + value + nl;
			}
		}
	}
	else
	{ //Stings/Chars/Numbers etc.
		dumped_text = arr+" ("+typeof(arr)+")";
	}
	return dumped_text;
}



    function getPlace() {
        return d.getElementById("video_player");
    }

    function getName() {
        var header = d.getElementById("header");
        var h1 = header.getElementsByTagName("h1")[0];
        var text = h1.innerHTML;
        var lastIndexOfHref = text.lastIndexOf("</a>");
        if(lastIndexOfHref == -1){
            lastIndexOfHref = text.lastIndexOf("</A>");
        }
        text = text.substr(lastIndexOfHref + 6, text.length);
        if (text.length > 64) {
            text = text.substr(0, 32);
        }
        return text;
    }

    function init() {
	var flashobj = getPlace();
	if (!flashobj)
	{
		alert('Кликните на видео файл и запустите скрипт еще раз');
		return;
	}
        var div = addDiv(flashobj);
        div.style.position = "relative";
        div.style.height = "4em";
        div.style.margin = "4px";
        div.style.padding = "4px";
        div.style.background = "#C0C0C0";
        div.style.border = "solid 1px #bcf";
        div.style.fontSize = "small";
        createCloser(div);

        var url = addLink(div, getUrl(true), "Скачать .mov", '0');
        url.style.fontWeight = "bold";
	url.style.zIndex = 2000;

	var url2 = addLink(div, getUrl(false), "Скачать .flv", '20');
	url2.style.fontWeight = "bold";
	url2.style.zIndex = 2000;

	var container = document.getElementById('videoViewsCountContainer');
	if (!container)
		container = document.getElementById('box_progress0');
	if (!container)
		container = document.getElementById('mv_hide_info');
	container.parentNode.appendChild(url);
	container.parentNode.appendChild(url2);

	alert('Нажмите на кнопку =СКАЧАТЬ=');
    }

    function createCloser(parent)
    {
        var div = addDiv(parent);
        div.style.position = "absolute";
        div.style.top = "-0.3em";
        div.style.right = "0";
        div.style.cursor = "pointer";
        div.style.fontWeight = "bold";
        div.style.fontSize = "medium";

        var close = addDiv(div);
        close.appendChild(d.createTextNode("Close"));
        div.onclick = function(event) {
            parent.parentNode.removeChild(parent);
        };
    }

    function addDiv(parent) {
        var div = d.createElement("div");
        parent.appendChild(div);
        return div;
    }

    function addLink(parent, url, text,top) {
        var div = d.createElement("div");
        parent.appendChild(div);
        var a = d.createElement("a");
	div.style.width = "200px";
	div.style.paddingTop = "20px";
	div.style.paddingBottom = "20px";
	div.style.textAlign = 'center';
	div.style.border = '2px solid rgb(0,0,0)';
	div.style.backgroundColor = 'white';
	div.style.zIndex = 2000;
        div.style.position = "relative";
	div.style.top = top+"px";
        div.appendChild(a);
        a.href = url;
        a.style.position = "relative";
	a.style.zIndex = 2000;
        if (text)
            a.appendChild(d.createTextNode(text));
        else
            a.appendChild(d.createTextNode(url));
        return div;
    }

    function addText(parent, text) {
        var label = addDiv(parent);
        label.appendChild(d.createTextNode(text));
        return label;
    }

    init();

