// ==UserScript==
// @name             DiagramMe [GW]
// @namespace        Diagram
// @description      Диаграммы на странице персонажа
// @include          http://*.ganjawars.ru/me/*
// @include          http://ganjawars.ru/me/*
// @version          1.0
// @author           VSOP_juDGe
// ==/UserScript==

(function() {

	// Настройки >>
	var SHOW_PROGRESS = 1;
	var SHOW_DIAGRAM = 1;
	
	var PROGRESS_COLOR = '33aa33';
	var PROGRESS_BCOLOR = 'd0eed0';
	
	var DIAGRAM_COLOR = '3366AA';
	// << Настройки 

	
	var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

	// if (root.location.href.indexOf('ganjawars.ru/me') == -1)
		// return;
	
	var u = new Array(
		0,4,8,13,23,36,56,84,123,176,248,
		344,471,637,852,1128,1480,1926,
		2489,3193,4070,5500,7140,9270,
		12050,15600,20000,26300,34200,45000,58000);

	var expB = new Array(
		0,5,15,37,76,143,249,412,655,1077,
		1505,2199,3149,4433,6146,8407,
		11362,15192,20113,26394,34353,
		44377,56931,72568,91947,115853,
		145214,181127,224882,277996,342247,
		419713,512821,624395,757716,916591,
		1105426,1329313,1594124,1906627,
		2274598,2723523,3293658,4046236,
		5077268,6541333,8693509,11964817,17100771,25421016,39315825);
  
	var expE = new Array(
		0,1250,3864,9241,19060,35658,62224,103032,163721,
		251646,366282,549727,787291,1108199,1536424,
		2101672,2840541,3797878,5028368,6598393,8588189,11300248,15066998);

	var expP = new Array(
		0,20,62,148,305,571,996,1649,2620,4026,6021,
		8796,12597,17731,24583,33627,45449,60766,
		80454,105574,137411,183214,247587);

	var reg1 = /\([0-9]*\.?[0-9]+\)/;
	var reg2 = /[0-9]*\.?[0-9]+/;
	var reg3 = /\>[0-9]+?\/?[0-9]*\</;
	
	function getProgressHTML(value, percent)
	{
		return '<img title = "' + value + 
		'" style="" src="http://chart.apis.google.com/chart?cht=bhs&amp;chd=t:' + percent.toFixed(2) + 
		'|100&amp;chs=70x7&amp;chbh=7,0,0&amp;chco=' + PROGRESS_COLOR + ',' + PROGRESS_BCOLOR + '&amp;chf=bg,s,f0fff0&amp;" id="img_container"/>';
	}
	
	var table = null;

	var t = root.document.getElementsByTagName('table');
	for (var i = 0, l = t.length; i < l; i++) 
	{
		if (t[i].width == '730') 
		{
			table = t[i];
			break;
		}

	}
	r = table.tBodies[0].rows[2].cells[0];
	var t = r.getElementsByTagName('table');
	
	tMain = t[1];
	tSkill = t[2];
	tt = t[0];

	//Main exp
	if(SHOW_PROGRESS)
	{
		var a = table.tBodies[0].rows[1].cells[0].getElementsByTagName('nobr');
		  for (i = 0, l = a.length; i < l; i++) 
		  {
				p = reg1.exec(a[i].innerHTML);
				p = reg2.exec(p);
				
				for(j = 0, jl = expB.length; j < jl; j++)
				{
					if(p<expB[j])
						break;
				}
				len = expB[j] - expB[j-1];
				z = (p - expB[j-1]) / len * 100;
				a[i].innerHTML = a[i].innerHTML.replace(reg1, getProgressHTML(p, z) + ' <font style="font-size: 8px; color: rgb(128, 153, 128);">+' + (expB[j] - p) + '</font>');
			}

			
	
	
	
		var a = tMain.getElementsByTagName("nobr");
		var str = "";
		var nums = new Array();
		var maxn = 0;
		var iter = 0;
	  for (i = 0, l = a.length; i < l; i++) {
			p = reg1.exec(a[i].innerHTML);
			p = reg2.exec(p);

			if(p == null)
				continue;
			
			zzz = reg3.exec(a[i].innerHTML);
			zzz = zzz.toString();
			indent = (zzz.length < 4) ? '&nbsp&nbsp' : '';
				
			if(iter == 0)
			{
				for(j = 0, jl = expB.length; j < jl; j++)
				{
					if(p<expB[j])
						break;
				}
				len = expB[j] - expB[j-1];
				z = (p - expB[j-1]) / len * 100;
				a[i].innerHTML = a[i].innerHTML.replace(reg1, indent + getProgressHTML(p, z));
			}
			
			if(iter == 1)
			{
				for(j = 0, jl = expE.length; j < jl; j++)
				{
					if(p<expE[j])
						break;
				}
				len = expE[j] - expE[j-1];
				z = (p - expE[j-1]) / len * 100;
				a[i].innerHTML = a[i].innerHTML.replace(reg1, indent + getProgressHTML(p, z));
			}
			
			if(iter == 2)
			{
				for(j = 0, jl = expP.length; j < jl; j++)
				{
					if(p<expP[j])
						break;
				}
				len = expP[j] - expP[j-1];
				z = (p - expP[j-1]) / len * 100;
				a[i].innerHTML = a[i].innerHTML.replace(reg1, indent + getProgressHTML(p, z));
			}

			iter = iter + 1;
	  }
	}
		
	//Skills
	var a = tSkill.getElementsByTagName("nobr");
	var str = "";
	var nums = new Array();
	var sum = 0;
  for (i = 0, l = a.length; i < l; i++) 
	{
		p = reg1.exec(a[i].innerHTML);
		p = reg2.exec(p);
		
		if(p == null)
			continue;
		p = new Number(p);
		nums.push(p);
		sum = sum + p;
		
		for(j = 0, jl = u.length; j < jl; j++)
		{
			if(p<u[j])
				break;
		}
		len = u[j] - u[j-1];
		z = (p - u[j-1]) / len * 100;
		if(SHOW_PROGRESS)
		{
			//alert(z);
			zzz = reg3.exec(a[i].innerHTML);
			if(zzz != null)
				zzz = zzz.toString();
			else
				zzz = "zzzz";
			
			a[i].innerHTML = a[i].innerHTML.replace(reg1, ((zzz.length < 4) ? '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' : ((zzz.length < 6) ? '&nbsp&nbsp&nbsp&nbsp':'')) + getProgressHTML(p, z));
		}
	}
	
	if(SHOW_DIAGRAM)
	{
		newrow = tt.insertRow(2);
		newtd = newrow.insertCell(0);
		newtd.colSpan = 2;
		newtd.align = "center";
	
		title = "";
		for (i = 0, l = nums.length; i < l; i++) {
			nums[i] = nums[i] / sum * 100;
			str = str + nums[i].toFixed(2) + ",";        
		}
		str = str.substr(0, str.length-1);
		newtd.innerHTML = '<img style="" src="http://chart.apis.google.com/chart?cht=p3&amp;chd=t:' +
			str + '&amp;chl=Pist ' + Math.round(nums[0]) + '%|Gren ' + Math.round(nums[1]) + '%|Avt ' + 
			Math.round(nums[2]) + '%|Pul ' + Math.round(nums[3]) + '%|Drob ' + Math.round(nums[4]) + 
			'%|Snip ' + Math.round(nums[5]) + '%&amp;chs=400x160&amp;chco=' + DIAGRAM_COLOR + '&amp;chf=bg,s,f0fff0&amp;" id="img_container"/>';
	}	

})();