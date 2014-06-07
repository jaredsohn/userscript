// ==UserScript==
// @name           varmsex.dk
// @description    Improve the compatible use for Chrome and added new user experiences.
// @author         Diblo Dk
// @include        http://www.varmsex.dk*
// @include        http://varmsex.dk*
// @include        http://*.varmsex.dk*
// @include        https://varmsex.dk*
// @include        https://*.varmsex.dk*
// @homepage       http://userscripts.org/scripts/show/175057
// @updateURL      https://userscripts.org/scripts/source/175057.meta.js
// @downloadURL    https://userscripts.org/scripts/source/175057.user.js
// @version        1.1.004
// @copyright      2013, Diblo Dk
// ==/UserScript==

function trim(str)
{
    var startpatt = /^\s/, endpatt = /\s$/;
    
    while(str.search(startpatt) == 0)
    {
        str = str.substring(1, str.length);
    }
    
    while(str.search(endpatt) == str.length-1)
    {
        str = str.substring(0, str.length-1);   
    }
    
    return str;
}


/***********************************************************************************/
var tmp, reg, uID, count, profiles, half, total, store1 = '', store2 = '', i, tmp2, script, innerScript = '';

tmp = document.getElementById("showbtn");
if ( tmp !== null )
{
    tmp = tmp.getElementsByTagName("table")[0];
    if ( tmp !== 'undefined' )
    {
        tmp.style.cssFloat="none";
    }
}

tmp = document.getElementById("videos2");
if ( tmp !== null )
{
    tmp.style.zIndex="12";
}

tmp = document.getElementById("bigimagecnt");
if ( tmp !== null )
{
    if ( tmp.getElementsByTagName("img").length > 0 )
    {
        reg = /id=([0-9]+)/g;
        uID = location.search;
        uID = reg.exec(uID);
        
        if ( uID !== null )
        {
            tmp.setAttribute("onclick","opengallery('"+uID[1]+"')");
        }
    }
}

tmp = document.getElementById("slider");
if ( tmp !== null )
{
    count = tmp.getElementsByTagName("img").length;
    if ( count > 0 && count < 6 )
    {
        reg = /id=([0-9]+)/g;
        uID = location.search;
        uID = reg.exec(uID);
        
        if ( uID !== null )
        {
            tmp.innerHTML = tmp.innerHTML+'<div onclick="opengallery(\''+uID[1]+'\');" class="awhite" style="font-weight:bold;">Vis alle</div>';
        }
    }
}

tmp = document.getElementById("hidelogon");
if ( tmp !== null && trim(tmp.innerHTML) == 'Skjul logon meddelelser' )
{
    innerScript += 'noLogonMsg();';
}

tmp = document.getElementById("body");
if ( tmp !== null )
{
    tmp.innerHTML = tmp.innerHTML+'<div align="center"><a href="/?show=payments" target="_self">Se din betalingsoversigt</a></div><br/>';
}

tmp = document.getElementById("random");
if ( tmp !== null )
{
    profiles = tmp.getElementsByTagName("a");
	reg = /^alert2.*$/;
	if ( reg.test(profiles[0].getAttribute('oncontextmenu')) === false )
	{
		total = profiles.length;
		for (i = 0; i < total; i++)
		{
			if ( (i%2) == 0 )
			{
				store1 += '<span onclick="vsfix(0);'+profiles[i].getAttribute('oncontextmenu')+'" oncontextmenu="return false" style="cursor:pointer">';
				store1 += '<img src="'+profiles[i].getElementsByTagName("img")[0].getAttribute('src')+'" style="width:75px;height:100px;border-radius:8px;margin:5px"/>';
				store1 += '</span>';
			}
			else
			{
				store2 += '<span onclick="vsfix(0);'+profiles[i].getAttribute('oncontextmenu')+'" oncontextmenu="return false" style="cursor:pointer">';
				store2 += '<img src="'+profiles[i].getElementsByTagName("img")[0].getAttribute('src')+'" style="width:75px;height:100px;border-radius:8px;margin:5px"/>';
				store2 += '</span>';
			}
		}
		tmp.setAttribute("oncontextmenu",'vsfix(1)');
		
		tmp = document.getElementById("gallery");
		tmp.setAttribute('oncontextmenu', 'vsfix(2);'+tmp.getAttribute('oncontextmenu'));
		tmp.style.position="";
		tmp.style.zIndex="";
		tmp.parentNode.innerHTML = '<div id="random2" style="width:170px;position:absolute;top:24px;left:0px;z-index:12010;display:none;background:#000000"><div style="width:85px;float:left">'+store1+'</div><div style="width:85px;float:right">'+store2+'</div></div>'+tmp.parentNode.innerHTML;

		innerScript += "\
function vsfix2()\
{\
	var owner, reset, close;\
\
	owner = document.getElementById('imageOwnerLink');\
	reset = document.getElementById('gallery').children[0].children[0];\
	close = document.getElementById('gallery').children[1];\
	if ( owner !== null && reset !== null && close !== null )\
	{\
		owner.innerHTML = owner.innerHTML+' - <a href=\"'+owner.getElementsByTagName('a')[0].getAttribute('href')+'\" onmouseover=\"'+owner.getElementsByTagName('a')[0].getAttribute('onmouseover')+'\" onmouseout=\"'+owner.getElementsByTagName('a')[0].getAttribute('onmouseout')+'\" class=\"galinfo\" target=\"_blank\">Åben i et nyt vindue</a>';\
\
		owner.setAttribute('class', '');\
		reset.setAttribute('onclick', 'vsfix(2);'+reset.getAttribute('onclick'));\
		close.setAttribute('onclick', 'vsfix(2);'+close.getAttribute('onclick'));\
		return;\
	}\
	setTimeout(function(){vsfix2();},100);\
}\
function vsfix(perform)\
{\
	var tmp, tmp2;\
\
	tmp = document.getElementById('random2');\
	if ( tmp !== null )\
	{\
		if ( perform === 1 )\
		{\
			setTimeout(function(){vsfix(0);},500);\
			return;\
		}\
		if ( perform === 2 )\
		{\
			tmp.style.display = 'none';\
			return;\
		}\
		tmp.style.display = 'block';\
		setTimeout(function(){vsfix2();},150);\
	}\
}\
";
	}
}

tmp = document.getElementById("searchwindow");
if ( tmp !== null )
{
    if ( tmp.style.height != '625px' )
    {
        tmp2 = document.getElementsByTagName("script");
        total = tmp2.length;
        for (i = 0; i < total; i++)
        {
            if ( tmp2[i].innerHTML == '$(function(){showSearchFields()});' )
            {
                innerScript += 'showSearchFields();';
            }
        }
    }
}

tmp = document.getElementById("news");
if ( tmp !== null )
{
    innerScript += "\
function vsnewsfix(perform)\
{\
	if ( perform === 3 )\
	{\
		document.getElementById('maincontent').style.height = 'auto';\
		return;\
	}\
\
	var tmp, tmp2, total, i, reg;\
\
	tmp = document.getElementById('news').getElementsByTagName('img');\
	if ( tmp.length > 1 || (tmp.length == 1 && tmp[0].getAttribute('src') != '/_png/site/lazyloadbar1.gif') )\
	{\
		tmp = document.getElementsByTagName('klaphat');\
		total = tmp.length;\
		for (i = 0; i < total; i++)\
		{\
			tmp[i].children[0].setAttribute('onmouseover', '');\
			tmp[i].children[0].setAttribute('onmouseout', '');\
\
			tmp[i].children[1].setAttribute('style', '');\
\
			reg = /^ - (.*)$/;\
			tmp2 = tmp[i].childNodes[2];\
			tmp2.nodeValue = reg.exec(tmp2.nodeValue)[1];\
\
			tmp[i].removeChild(tmp[i].children[(tmp[i].children.length-1)]);\
		}\
\
		if ( perform === 2 )\
		{\
			setTimeout(function(){vsnewsfix(3);},450);\
		}\
		else\
		{\
			document.getElementById('maincontent').style.height = 'auto';\
		}\
\
		document.getElementById('news').style.height = 'auto';\
\
		tmp = document.getElementById('newscontainer');\
		tmp.style.height = 'auto';\
		if ( perform === 1 )\
		{\
			tmp.removeChild(tmp.children[1]);\
		}\
\
		if ( perform === 1 )\
		{\
			tmp = document.getElementById('showmorebut');\
			tmp = tmp.getElementsByTagName('a')[0];\
			tmp.setAttribute('onclick', tmp.getAttribute('onclick')+'vsnewsfix(2);');\
		}\
\
		return;\
	}\
\
	setTimeout(function(){vsnewsfix(perform);},150);\
}\
vsnewsfix(1);\
";
}

if ( innerScript !== '' )
{
    script = document.createElement("script");
    script.type = 'text/javascript';
    script.innerHTML = innerScript;
    document.getElementsByTagName("head")[0].appendChild(script);
}
