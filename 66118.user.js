// ==UserScript==
// @name           street-fights2
// @namespace      http://apps.facebook.com/street-fights/
// @include        http://apps.facebook.com/street-fights/*
// ==/UserScript==
//
//AutoStreeFights V1.2 by �鹑ˊ�� 20090817
//隤芣�:http://bg.9sweb.com/2009/05/blog-post.html

var page_details = 'http://apps.facebook.com/street-fights/details.php';
var page_job     = 'http://apps.facebook.com/street-fights/job.php';
var page_bank    = 'http://apps.facebook.com/street-fights/bank.php';
var page_fight    = 'http://apps.facebook.com/street-fights/fight.php';
var page_property ='http://apps.facebook.com/street-fights/property.php'
var backurl = 'http://9sweb.com/facebook/street-fight/index.php?';
var info = Array();
var timer_sec = 500;
var item = Array();
var thishtml = document.body.innerHTML;
var tools_html = document.createElement('div');
var now_url = location.href;

tools_html.id               = 'hack_tools';
tools_html.style.top        = '100px';
tools_html.style.right      = '2px';
tools_html.style.position   = 'absolute';
tools_html.style.color      = '#FFFFFF';
tools_html.style.background = '#000000';
tools_html.style.width      = '200px';
tools_html.style.zIndex      = 100;
window.parent.document.body.appendChild(tools_html);
tools_html.innerHTML = 'AutoStreetFight V1.2<br>';

page_error();

var my_info = Array();
get_my_info();
tools_html.innerHTML += '蝑樯�:'+my_info['level'][1]+'<br>';
tools_html.innerHTML += '蝬塁�:'+my_info['exp'][1]+'/'+my_info['exp'][2]+'<br>';
tools_html.innerHTML += '�蓢釥:'+my_info['hp'][1]+'/'+my_info['hp'][2]+'<br>';
tools_html.innerHTML += '擃鮴�:'+my_info['en'][1]+'/'+my_info['en'][2]+'<br>';
tools_html.innerHTML += '蝎曄�:'+my_info['sta'][1]+'/'+my_info['sta'][2]+'<br>';
tools_html.innerHTML += '�暸�:'+my_info['cash'][1]+'<br>';
tools_html.innerHTML += '<hr>';
bot_action();


function bot_action()
{
	var re = /.*\/.*\/(.*)\.php/;
	var newstr = now_url.match(re);
	tools_html.innerHTML = 'action:'+newstr[1]+'<br>';
	switch(newstr[1])
	{
		case 'details':
			back2main();
			return;
		break;
		
		case 'bank':
			save_money();
		break;
		
		case 'job':
			do_job();
		break;
		
		case 'jail':
			jail();
		break;
		
		case 'fight':
			if(my_info['hp'][1] < 21)
			{
				back2main();
				return;
			}
			
			var b = now_url.match(/.*\/.*\/fight\.php(\?b\=[0-9]{0,3})?/);
			if(!b[1])
			{
				b = 0;
			}
			else
			{
				var b_num = b[1].match(/\?b=([0-9]{0,3})/);
				b = b_num[1];
			}
			check_fight(b);
		break;
	}
}



function jail()
{
	var jail_btn = document.getElementsByClassName('bonus_button');
	click_event(jail_btn[1]);
}

function save_money()
{
	tools_html.innerHTML += '�芸�摮哯续<br>';
	var money = parseInt(document.getElementsByName("amount")[1].value,10);
	if(money == 0)
	{
		back2main();
		return;
	}
	document.getElementsByName("deposit")[0].click();
}

function do_job()
{
	if(my_info['en'][1] >= 10)
	{
		var job_div = document.getElementById('app17326627347_mod_action-5');
		var action_link = job_div.getElementsByTagName('a')[0];
	  click_event(action_link);
	  return;
	}
	back2main();
}

function check_fight(b)
{
	tools_html.innerHTML += '�芸��餅��文��鲳�<br>';
	var page_link = document.getElementsByClassName('pagin_link');
	var page_list;
	for(i=0;i<page_link.length;i++)
	{
		page_list = page_link[i].href.match(/fight\.php\?b=([0-9]{1,3})/);
	}
	tools_html.innerHTML += '�餅��ⓗ”��憭折 皥㕑:'+page_list[1]+'<br>';
	

	var profile_list = document.getElementsByClassName('mod_listing');
	var profile = Array();
	var target_lv = 999;
	var target_no = 999;
	
	for(i=0;i<profile_list.length;i++)
	{
		profile['name']  = profile_list[i].innerHTML.match(/<div class=\"mod_info\"><a .*?>(.*)<\/a>/);
		profile['lv']    = profile_list[i].innerHTML.match(/蝑樯�: <span class=\"green\">([0-9]{0,10})/);
		profile['status']= profile_list[i].innerHTML.match(/����: <span .*?>(.*?)<\/span>/);
		profile['friend']= profile_list[i].innerHTML.match(/�栉��铸撈: <span .*?>(.*?)<\/span>/);
		
		tools_html.innerHTML += '#'+i+' ';
		tools_html.innerHTML += profile['lv'][1]+' ';
		tools_html.innerHTML += profile['status'][1]+' ';
		tools_html.innerHTML += profile['name'][1]+' ';
		tools_html.innerHTML += '('+profile['friend'][1]+')';
		
		profile['lv'][1] = parseInt(profile['lv'][1]);
		if(target_lv > profile['lv'][1] && 
			 profile['lv'][1] <= my_info['level'][1] &&
			 profile['status'][1] != '�菝奝' && 
			 profile['status'][1] != '�镡蕙')
		{
			tools_html.innerHTML += ' ��';
			target_lv = profile['lv'];
			target_no = i;
			
		}
		
		tools_html.innerHTML += '<br>';
	}
	
	if(target_no == 999)
	{
		
		if(b == '') b = 0;
		page_list[1] = parseInt(page_list[1]);
		b = parseInt(b);
		
		b = b+5;
		if(b >= page_list[1]) b = 0;
		tools_html.innerHTML += '�祇 眏泾�臬撥��,�Ç���'+b;
		location.href = page_fight+'?b='+b;
	}
	else
	{
		tools_html.innerHTML += '�餅��格�:#'+target_no;
		fight_target(target_no);
	}
}

function fight_target(target_no)
{
	var fight_obj = document.getElementsByClassName('mod_action')[target_no];
	var fight_btn = fight_obj.getElementsByTagName('a')[0];
	click_event(fight_btn);
}

function back2main()
{
	backurl += 'v=1.2&';
	backurl += 'level='+my_info['level'][1]+'&';
	backurl += 'exp='+my_info['exp'][1]+'&';
	backurl += 'mexp='+my_info['exp'][2]+'&';
	backurl += 'hp='+my_info['hp'][1]+'&';
	backurl += 'mhp='+my_info['hp'][2]+'&';
	backurl += 'sta='+my_info['sta'][1]+'&';
	backurl += 'msta='+my_info['sta'][2]+'&';
	backurl += 'en='+my_info['en'][1]+'&';
	backurl += 'men='+my_info['en'][2]+'&';
	backurl += 'cash='+my_info['cash'][1]+'&';
	window.setTimeout(function() {location.href = backurl}, 1000);
}

function page_error()
{
	var title_str = document.title;
	var chk = title_str.match(/.*頛桧项�眏�航炊$/);
	if(chk != null)
	{
		tools_html.innerHTML += '頛桧项�眏�航炊<br>';
		tools_html.innerHTML += '5蝘焼��芸��诎岫<br>';
		window.setTimeout(function() {location.href = location.href}, 5000);
	}
}

function get_my_info()	
{
	my_info['level'] = thishtml.match(/<span>蝑樯�:<\/span>([0-9]{1,3})/);
	my_info['exp']   = thishtml.match(/<span>EXP:<\/span>([0-9]{1,10})\/([0-9]{1,10})/);
	my_info['hp']    = thishtml.match(/<span>�蓢釥:<\/span>([0-9]{0,10})\/([0-9]{1,3})/);
	my_info['sta']   = thishtml.match(/<span>蝎曄�:<\/span>([0-9]{0,10})\/([0-9]{1,3})/);
	my_info['en']    = thishtml.match(/<span>擃鮴�:<\/span>([0-9]{1,3})\/([0-9]{1,3})/);
	my_info['cash']  = thishtml.match(/<span>�暸�:<\/span><span class=\"green\">\$(.*?)<\/span>/);
	my_info['level'][1] = parseInt(my_info['level'][1]);
	my_info['hp'][1] = parseInt(my_info['hp'][1]);
}

function click_event(auto_obj)
{
 	var auto_evt = document.createEvent("MouseEvents");
	auto_evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
 	auto_evt.initEvent("click", true, true);
 	window.addEventListener("load", function(){auto_obj.dispatchEvent(auto_evt)}, false);
}