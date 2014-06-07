// ==UserScript==
// @author         Nimesin
// @name           Mercenary medal stats
// @namespace      erepublik@nimesin.com
// @description    Mercenary Status on erepublik pages
// @version        1.2.3
// @include        http://www.erepublik.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// ==/UserScript==

orders='<br>';
merc=new Array();
indx=0;
mercIndx=0;
  var citName=	$('.user_info a').html();
  var citLink=	'http://www.erepublik.com'+$('.user_info a').attr('href');

var url=citLink;

$.get(url, function(data) {
	$(data).find('.country_list li').each(function(ind) {
		var str=$(this).html();
		var indStr='';
		if (str.indexOf("<em>0/25")<0) 
		{
			mercIndx++;
			merc[mercIndx]=str;
			if (str.indexOf("<em>25/25")<0)
			{
				indStr='&nbsp;&nbsp;: ';
				orders+=' '+indStr+': '+ str+'<br>';
			}
			else
				{
					indx++;
					
					if (indx<10)
						{
							indStr='0'+indx;
						}
					else
						{
							indStr=indx;
						}
    			orders+=' '+indStr+': '+ str+'<br>';
				}
		}

  });
  var title='Merc medal stats';//battleTitle(document.URL, merc);
  var ordr=battleTitle(document.URL, merc);
  if (ordr=='')
  {
	addDiv('.logout',title,orders) ;
  }
  else
  {
	addDiv('.logout',title,ordr) ;
  }
});

function battleTitle(str, merc)
{
	var ret='';
	var temp;
	var tempStr='';
	if (str.indexOf('battlefield')<0)
	{
		ret='';
	}
	else
	{
		//var temp=$('#pvp_header div div').text();
		temp=$('#pvp_header div a img').attr('src');
		temp=temp.replace('http://www.erepublik.com/images/flags_png/L/','/images/flags_png/S/');
		for (x in merc)
		{
			
			if (merc[x].indexOf(temp)<0)
			{
				
			}
			else
			{
				tempStr=merc[x];
			}
			
			//tempStr+=merc[x]+'; ';
		}
		//tempStr=merc;
		ret=tempStr;//'battlefield';
	}

	//ret=str;
	return ret;
}

function addDiv(toSelector,caption,str)
{
	var div='<div class="box">';// style="width: 130px;">
	div+='<div class="item elem" style="background-color: #E9F5FA; width: 130px; padding: 1px 7px 5px 7px ">';
	div+='<p style="color: #90BCC9; width: 120px; font-weight: bold; font-size: 11px">'+caption+': </p>';
	div+='<div class="holder" style="background-color: #FFFFFF; width: 120px; color: #B5D6E1">'+str+'</div>';
	div+='</div></div>';

	$(toSelector).after(div);
}