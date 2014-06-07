// ==UserScript==
// @name           Viagra de Ernesto
// @namespace      byAzaret
// @description    Viagra de Ernesto
// @include        http://*.erepublik.com/*
// ==/UserScript==

// URL Setup
var currURL = location.href;
var arrURL = currURL.split('/');

//Donate page
if(arrURL[2]=="economy.erepublik.com"&&arrURL[5]=="donate")
{
	var available_items = document.getElementById('available_items').value;
	var own_items = ((document.getElementById("own").childNodes.length)-1)/2;
	var max = (available_items<10)?available_items:10;
	var i = 1;
	var p = 1;
	
	while(i<=max)
	{
		var type = document.getElementById("own").childNodes[(p*2)-1].childNodes[5].alt;
		if(type=="Food")
		{
		Nitem = document.createElement("li");
		Nitem.id = document.getElementById("own").childNodes[(p*2)-1].id;
		Nitem.innerHTML = document.getElementById("own").childNodes[(p*2)-1].innerHTML;
		document.getElementById("other").appendChild(Nitem);
		document.getElementById("own").childNodes[(p*2)-1].style.display = "none";
		i++;
		}
		p++;
		if(p>own_items) i=max+1;
	}
	
	var r = document.createElement("a");
		r.style.margin = "0px 10px";
		r.href = "#";
		r.className = "fluid_blue_light_big";
		r.id = "linkautodonate";
		r.innerHTML = "<span onClick=\"javascript:document.getElementById('other').innerHTML='';for(var i=1;i<="+own_items+";i++){document.getElementById('own').childNodes[(i*2)-1].style.display = '';}\">Annuler Auto-Drag Food</span>";
	document.getElementById('donationlink').parentNode.insertBefore(r,document.getElementById('donationlink'));
}

//Job Market
if(arrURL[2]=="economy.erepublik.com"&&arrURL[4]=="market"&&arrURL[5]=="job")
{
	var sholder    = document.getElementById('sholder');
	var job_market = document.getElementById('job_market');
	var BaseURL    = arrURL[0]+'/'+arrURL[1]+'/'+arrURL[2]+'/'+arrURL[3]+'/'+arrURL[4]+'/'+arrURL[5];
	var ord = new Array(27,50,33,32,76,69,9,42,23,64,14,78,63,34,55,70,39,11,12,44,13,48,49,56,54,58,10,45,71,72,66,26,31,73,37,57,75,77,67,35,53,52,1,41,65,68,36,61,51,47,15,38,30,59,43,40,29,74,24,28);
	var cnt = new Array(	'',				'Romania',		'',						'',				'',					'',			'',			'',				'',				'Brazil',
							'Italy',		'France',		'Germany',				'Hungary',		'China',			'Spain',	'',			'',				'',				'',
							'',				'',				'',						'Canada',		'USA',				'',			'Mexico',	'Argentina',	'Venezuela',	'United-Kingdom',
							'Switzerland',	'Netherlands',	'Belgium',				'Austria',		'Czech-Republic',	'Poland',	'Slovakia',	'Norway',		'Sweden',		'Finland',
							'Ukraine',		'Russia',		'Bulgaria',				'Turkey',		'Greece',			'Japan',	'',			'South-Korea',	'India',		'Indonesia',
							'Australia',	'South-Africa',	'Republic-of-Moldova',	'Portugal',		'Ireland',			'Denmark',	'Iran',		'Pakistan',		'Israel',		'Thailand',
							'',				'Slovenia',		'',						'Croatia',		'Chile',			'Serbia',	'Malaysia',	'Philippines',	'Singapore',	'Bosnia-Herzegovina',
							'Estonia',		'Latvia',		'Lithuania',			'North-Korea',	'Uruguay',			'Paraguay',	'Bolivia',	'Peru',			'Colombia'		);
	
	//Skill Menu
	var newmenu = document.createElement('div');
		newmenu.id = "filters_expanded";
		newmenu.className = "sholder";
		newmenu.style.padding = "0";
		newmenu.style.width = "691px";
		newmenu.innerHTML = '<div style="float:right;margin-right:8px;margin-top:4px;"><span style="float:left;padding-top:6px;">Actuel : </span><span class="skiller"><strong style="float:none;display:inline-block;margin:5px;">'+arrURL[8]+'</strong></span></div><h4 style="padding-bottom: 0px; padding-top: 8px;">Skills</h4>';
	
	var it1 = document.createElement('div');
		it1.className = "scrollable";
		it1.style.height = "27px";
		it1.style.marginTop = "2px";
		
		newmenu.appendChild(it1);
		
	var it2 = document.createElement('div');
		it2.className = "productlistings";
		it2.innerHTML = '';
		
		it1.appendChild(it2);
		
	var it3 = document.createElement('ul');
		it3.className = "items";
		it3.style.left = "0px";
		it3.innerHTML = '<li style="width:auto;height:40px;"><a class="industrySelect" href="'+BaseURL+'/'+arrURL[6]+'/'+arrURL[7]+'/0" style="height:auto;width:auto;padding-right:2px;"><span class="skiller"><strong style="float:none;display:block;margin:5px;">All</strong></span></a></li>';
		
		it2.appendChild(it3);
		
		for(i=1;i<13;i++)
		{
	var	it4 = document.createElement('li');
		it4.style.height = "auto";
		it4.style.width = "auto";
		it4.innerHTML = '<a class="industrySelect" href="'+BaseURL+'/'+arrURL[6]+'/'+arrURL[7]+'/'+i+'" style="height:auto;width:auto;padding-right:2px;"><span class="skiller"><strong style="float:none;display:block;margin:5px;">'+i+'</strong></span></a>';
		it3.appendChild(it4);
		}
	
	job_market.insertBefore(newmenu,sholder);
	
	//Countries Menu
	var newmenu = document.createElement('div');
		newmenu.id = "filters_expanded";
		newmenu.className = "sholder";
		newmenu.style.padding = "0";
		newmenu.style.width = "691px";
		newmenu.innerHTML = '<div style="float:right;margin-right:8px;margin-top:4px;"><span style="padding-top:6px;float:left;">Actuel :</span><img style="margin:0px;padding:4px;" src="http://www.erepublik.com/images/flags/M/'+cnt[arrURL[6]]+'.gif"/></div><h4 style="padding-bottom: 0px; padding-top: 8px;">Pays</h4>';

	var it1 = document.createElement('div');
		it1.className = "scrollable";
		it1.style.marginTop = "2px";
		
		newmenu.appendChild(it1);
		
	var it2 = document.createElement('div');
		it2.className = "productlistings";
		it2.innerHTML = '';
		
		it1.appendChild(it2);
				
	var it3 = document.createElement('ul');
		it3.className = "items";
		it3.style.left = "0px";
		it3.style.height = "84px";
		it3.style.width = "671px";
		
		it2.appendChild(it3);
	
		for(var i=0;i<60;i++)
		{
	var id  = ord[i];
	var	it4 = document.createElement('li');
		it4.style.height = "auto";
		it4.style.width = "auto";
		it4.style.display = "inline-block";
		it4.innerHTML = '<a class="industrySelect" href="'+BaseURL+'/'+id+'/'+arrURL[7]+'/'+arrURL[8]+'" style="height:auto;width:auto;padding-right:2px;" alt="'+cnt[id]+'" title="'+cnt[id]+'"><img style="margin:0px;padding:4px;" src="http://www.erepublik.com/images/flags/M/'+cnt[id]+'.gif"/></a>';
		it3.appendChild(it4);
		}
	job_market.insertBefore(newmenu,sholder);
	sholder.style.display = "none";
}