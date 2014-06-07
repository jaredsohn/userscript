// ==UserScript==
// @name           GW HP Checker
// @namespace      http://ie7pro.com/
// @description    Check HP Status
// @include        http://www.ganjawars.ru/*
// @exclude        http://www.ganjawars.ru/sms*
// @exclude        http://www.ganjawars.ru/market-l.php*
// @author         FelikZ
// ==/UserScript==

(function() {


var IE = navigator.userAgent.indexOf("MSIE") >= 0;

//==Settings
var hp_display = 1; //0 - display HP[xx/xx], 1 - display [xx%]
//==/Settings

var hp_cur = 0;
var hp_max = 0;
var old_title = document.title;
function Callback()
{
	stop = false;
	var cn = document.getElementById("hpheader");
	var tt = document.getElementsByTagName("script");
	cn_text = cn.innerHTML;
	
	if(cn)
	{
		ind = 0;
		for(i=0; i<cn_text.length; i++)
		{
			if(cn_text[i] == '>')
			{
				cn_text = cn_text.substring(i+1,cn_text.length);
				break;
			}
		}
		
		if(IE)
		{
			var ind1 = cn_text.search('>');
			var ind2 = cn_text.search('</');
			if(ind1 != -1 && ind2 != -1)
			{
				//alert(cn_text.substring(ind1+1,ind2));
				cn_text = cn_text.substring(ind1+1,ind2);
			}
		}
		
		hp_cur = parseInt(cn_text,10);
	}
	for(i=0; i<tt.length; i++)
	{
		str = "hp_max=";
		str_len = str.length;
		index = tt.item(i).innerHTML.search(str);
		if(index == -1)
			continue;
		hp_max = parseInt(tt.item(i).innerHTML.substring(index+str_len,index+str_len+3));
		break;
	}
	
	left_border = "[";
	right_border = "]";
	if(hp_cur>=hp_max*0.8)
	{
		left_border = ">";
		right_border = "<";
	}
	var new_title = "";
	switch(hp_display)
	{
		case 0:
			new_title = "HP "+left_border+hp_cur+"/"+hp_max+right_border;
			if(hp_cur == hp_max)
				stop = true;
			break;
		case 1:
			new_title = "HP "+left_border+parseInt((hp_cur/hp_max)*100)+"%"+right_border;
			if(((hp_cur/hp_max)*100) == 100)
				stop = true;
			break;
	}
	
	document.title = new_title + " | " + old_title;
	if(stop)
		return;
	setTimeout(Callback,1000);
}

Callback();
})();
