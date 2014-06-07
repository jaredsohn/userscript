// ==UserScript==
// @name           The West ru5 ATCity
// @namespace      www.the-west.ru
// @description    Converts duel reports to text format so you can paste them on the forums. Open a duel report and click the new "Convert" button.
// @description    Localization fo Ru5: Darlock
// @include        http://ru5.the-west.*/game.php*
// @include        http://ru6.the-west.*/game.php*
// ==/UserScript==
// 
(function(){
	var doc = document;
	var console = unsafeWindow.console;
	function $(id) { return(doc.getElementById(id)); }
	
	function debug(str){var debug=prompt('Debug', str); }
	
	function xp1(x, p) {
		var r = doc.evaluate(x, p, null, 9, null).singleNodeValue;
		return(r);
	}
	function xp(x, p) {
		var r = doc.evaluate(x, p, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var len = r.snapshotLength;
		var ar = new Array(len);
		for(var i=0; i<len; i++) {
			ar[i] = r.snapshotItem(i).textContent;
		}
		return(ar);
	}

	function __tf(template, name) {
		for(var elName in template)
		{
			if (template.hasOwnProperty(elName))
			{
				var p = template[elName];
				if (elName == name)
					return(p);
				if (p.children)
				{
					var q = __tf(p.children, name);
					if (q)
						return(q);
				}
			}
		}
		return(null);
	}
	function dc(template, parent)
	{
		// { thead: { el:null, attrs:{}, children: {} } }
		for(var elName in template)
		{
			if (template.hasOwnProperty(elName))
			{
				var p = template[elName];
				p.el = doc.createElement(p.tag);
				if (parent)
					parent.appendChild(p.el);
				
				if (p.attrs)
				{
					for(var atName in p.attrs)
					{
						if (p.attrs.hasOwnProperty(atName))
						{
							var atValue = p.attrs[atName];
							if (atName == "text")
								p.el.textContent = atValue;
							else if (atName == "html")
								p.el.innerHTML = atValue;
							else
								p.el.setAttribute(atName, atValue);
						}
					}
				}
				
				if (p.children)
				{
					dc(p.children, p.el);
				}
			}
		}
		template.find = function(name) {
			return(__tf(template, name));
		};
		return(template);
	}
	function trim(str) {
		s = str.replace(/^(\s)*/, '');
		s = s.replace(/(\s)*$/, '');
		return s;
	}
	function whiteSpaceRemove(str) {
		s = str.replace(/\s+/g,' ');
		s = s.replace(/^(\s)*/, '');
		s = s.replace(/(\s)*$/, '');
		return s;
	}
	function antirtrim(str,num) {
		for (istr = str.length; istr<num; istr++)
			str = str + ' ';
		return str;
	}

	function convertTitle(title, player1, player2){
		var p1 = player1.split("\n");
		var p2 = player2.split("\n");
		var ar = new Array(3);
		p1_name = trim(p1[1]);
		p2_name = trim(p2[1]);
		var p1_level = parseInt(p1[2],10);
		p2_level = parseInt(p2[2],10);
		var p1_dlevel = parseInt(p1[3],10);
		var p2_dlevel = parseInt(p2[3],10);
		title = title.replace(p1_name,'[player]'+p1_name+'[/player] ('+p1_level+'/'+p1_dlevel+')');
		ar[1] = title.replace(p2_name,'[player]'+p2_name+'[/player] ('+p2_level+'/'+p2_dlevel+')');
		ar[2] = p1_name;
		ar[3] = p2_name;
		return (ar);
	}

	function convertHits(hits1, hits2) {
		var hits = antirtrim(p1_name,30)+p2_name+'\n';		
		reg = new RegExp(".* - (.*) очк");
		HitsCnt1 = 0;
		HitsCnt2 = 0;		
		for (i=0; i<hits1.length;i++) 
		{
			// считаем попадения по себе			
			if (hits1[i].indexOf('Мимо') == -1)
			{
				hits1[i] = whiteSpaceRemove(hits1[i]).split(reg)[1]; // получаем урон
				if (i != hits1.length-1) {HitsCnt1+=1;} // если не сумма попадений - инкремент счётчика попадений
			}
			else {hits1[i] = 0;}
			
			// считаем попадение по врагу
			if (hits2[i].indexOf('Мимо') == -1)
			{
				hits2[i] = whiteSpaceRemove(hits2[i]).split(reg)[1]; // получаем урон
				if (i != hits2.length-1) {HitsCnt2+=1;} // если не сумма попадений - инкремент счётчика попадений
			}
			else {hits2[i] = 0;}
			
			if (i == 3 || i == hits1.length-2) {hits += '\n';}						
			} // for			
			
			// суммарный урон по себе
			
			hits = '[b][color=red]'+hits1[8]+'('+HitsCnt1+')[/color][/b] / '+'[b][color=blue]'+hits2[8]+'('+HitsCnt2+')[/color][/b]'
	return hits+'\n';
	}
	function convertFlashHits(hits) {
		hits_pom = hits.split('|');
		var hits1_dmg = new Array();
		var hits1_int = new Array();
		var hits1 = new Array();
		var hits2 = new Array();
		var hits2_dmg = new Array();
		var hits2_int = new Array();
		for (i=0; i<8; i++) {
			hits2_dmg[i] = hits_pom[i];
		}
		for (i=8; i<16; i++) {
			hits1_dmg[i-8] = hits_pom[i];
		}
		for (i=16; i<24; i++) {
			hits1_int[i-16] = hits_pom[i];
		}
		for (i=24; i<32; i++) {
			hits2_int[i-24] = hits_pom[i];
		}
		n = 8;
		hits = '';
		HitsCnt1 = 0;
		HitsCnt2 = 0;
		hits1[8] = 0;
		hits2[8] = 0;
		for (i = 0; i<n; i++) {
			if (hits1_dmg[i] < 0 || hits2_dmg[i]<0) {n=i;}
			hits1_dmg[i] = Math.abs(hits1_dmg[i]);
			switch (hits1_int[i]) {
				case '1': {hits1[i] = 'Голова - '+hits1_dmg[i]; break;}
				case '2': {hits1[i] = 'Левое плечо - '+hits1_dmg[i]; break;}
				case '3': {hits1[i] = 'Правое плечо - '+hits1_dmg[i]; break;}
				case '4': {hits1[i] = 'Левая рука - '+hits1_dmg[i]; break;}
				case '5': {hits1[i] = 'Правая рука - '+hits1_dmg[i]; break;}
				default:  {hits1[i] = 'Мимо';}
			}
			if (hits1_dmg[i] == 0) {hits1[i] = 'Мимо';}
			hits1[8] += hits1_dmg[i];
			// считаем кол-во попадений
			if (hits1_dmg[i] > 0)
			  HitsCnt1 += 1;
			hits2_dmg[i] = Math.abs(hits2_dmg[i]);
			switch (hits2_int[i]) {
				case '1': {hits2[i] = 'Голова - '+hits2_dmg[i]; break;}
				case '2': {hits2[i] = 'Левое плечо - '+hits2_dmg[i]; break;}
				case '3': {hits2[i] = 'Правое плечо - '+hits2_dmg[i]; break;}
				case '4': {hits2[i] = 'Левая рука - '+hits2_dmg[i]; break;}
				case '5': {hits2[i] = 'Правая рука - '+hits2_dmg[i]; break;}
				default:  {hits2[i] = 'Мимо'; break;}
			}
			if (hits2_dmg[i] == 0) {hits2[i] = 'Мимо';}
			hits2[8] +=hits2_dmg[i];
			if (hits2_dmg[i] > 0)
			  HitsCnt2 += 1;
			hits += antirtrim(hits1[i],30)+hits2[i]+'\n';
			if (i == 3) {hits += '\n';}
		}
		//if (hits1[8] != 0) {hits1[8] = 'Суммарный урон - '+hits1[8];} else {hits1[8] = 'Всё мимо';}
		//if (hits2[8] != 0) {hits2[8] = 'Суммарный урон - '+hits2[8];} else {hits2[8] = 'Всё мимо';}
		//hits += '\n'+antirtrim(hits1[8],30)+hits2[8]+'\n\n';
		hits = '[b][color=red]'+hits1[8]+'('+HitsCnt1+')[/color][/b] / '+'[b][color=blue]'+hits2[8]+'('+HitsCnt2+')[/color][/b]'
		return hits;
	}
	
	function convertDuelReport(div) {		
		var x = {};
		x.title = xp1('./table/tbody/tr[2]/td[2]/div/table/tbody/tr', div);
		x.p1 = xp1('./table/tbody/tr[2]/td[2]/div/div/table[1]/tbody/tr/td[1]', div);
		x.loc = xp1('./table/tbody/tr[2]/td[2]/div/div/table[1]/tbody/tr/td[3]', div);
		x.p2 = xp1('./table/tbody/tr[2]/td[2]/div/div/table[1]/tbody/tr/td[5]', div);
		
		//var time = whiteSpaceRemove(trim(x.title.textContent).substring(trim(x.title.textContent).indexOf('Удалить'), trim(x.title.textContent).indexOf('\n')));
		//debug(time);
		var title = new Array(3);		
		// возвращает строку игроков с уровнем и разрядами и их имена = str, p1_name, p2_name
		tmpTitle = trim(x.title.textContent).substring(trim(x.title.textContent).indexOf('«')+1, trim(x.title.textContent).indexOf('Удалить'));
		title = convertTitle(whiteSpaceRemove(tmpTitle), x.p1.textContent, x.p2.textContent);
		PlayerName = title[2];
		EnemyName = title[3];		
		// сегодня конвертим в дату
	  var d=new Date();
	  //var debug=prompt(time, '');
		title[1] = title[1].replace('сегодня',d.getDate()+'.'+(d.getMonth()+1)+'.'+d.getFullYear());
						
		if (div.innerHTML.indexOf('<span style="font-size: 12px; font-weight: bold;">') != -1) {
			x.hitsBody = xp1('./table/tbody/tr[2]/td[2]/div/div/table[2]/tbody', div);
			x.p1hits = xp('./tr/td[1]', x.hitsBody);
			x.p2hits = xp('./tr/td[3]', x.hitsBody);
			x.outcome = xp1('./table/tbody/tr[2]/td[2]/div/div/h4', div);
			
			var hits = convertHits(x.p1hits,x.p2hits);
			var outcome = whiteSpaceRemove(x.outcome.textContent).replace(/\. /g,'.\n');
			} else {
				var x = document.getElementsByName('movie')[0].attributes; 
				var y = x.getNamedItem("value"); 
				var hits = y.value;
				hits = convertFlashHits(hits.substring(hits.indexOf('=')+1,hits.indexOf('&')));
				var outcome = y.value;
				outcome = whiteSpaceRemove(outcome.substring(outcome.lastIndexOf('=')+1)).replace(/\. /g,'.\n');
				}
		ttt = outcome.indexOf('не заработал');
		if (ttt===-1)
			ttt = outcome.indexOf(', и') + 2;
		out2 = outcome.substring(0,ttt);
		out3 = outcome.substring(ttt);
		outcome = out2+'\n'+out3;
		var aim=new Array();dodge=new Array();var duel = unsafeWindow.Duel.getInstance();
		for (ii=1;ii<5;++ii){
			if (duel&&duel.dodge) {dodge[ii]=duel.dodge[ii]};
			if(duel&&duel.aim){aim[ii]=duel.aim[ii]}
		};
		out_duel='';
		if (aim[1]&&dodge[1]){
			out_duel = '\n\nПрицелы:\n';
			for (ii=1;ii<5;++ii){
				out_duel+=ii+'/'+(ii+4)+'     ';
				ta='';
				switch (aim[ii]){
				case 'rightarm':
					ta='Правая рука';
					break;
				case 'rightshoulder':
					ta='Правое плечо';
					break;
				case 'head':
					ta='Голова';
					break;
				case 'leftshoulder':
					ta='Левое плечо';
					break;
				case 'leftarm':
					ta='Левая рука';
					break;
				default:
					ta = 'Неопределено';
				}
				out_duel+=ta+'\n';
			}
			out_duel += '\nУвороты:\n';
			for (ii=1;ii<5;++ii){
				out_duel+=ii+'/'+(ii+4)+'     ';
				ta='';
				switch (dodge[ii]){
				case 'left':
					ta='Влево';
					break;
				case 'right':
					ta='Вправо';
					break;
				case 'duck':
					ta='Приседание';
					break;
				case 'aim':
					ta='Стойка';
					break;
				default:
					ta = 'Неопределено';
				}
				out_duel+=ta+'\n';
			}
		}		
		// check for 48h
		if (outcome.indexOf('лишился сознания') > 0)
		  knockout =' [b]=48h[/b]';
		else
		  knockout ='';
		  
		// check win or loose  
		if ((outcome.indexOf('победил игрока ' + PlayerName) > 0) || (outcome.indexOf(EnemyName + ' одержал победу') > 0))
		  {
		 	minus = '-';
		  title[1] = title[1].replace('Дуэль: ', '[b][color=red]Дуэль:[/color][/b] ');
		  }
		else
		  {
		  minus = '';  
		  title[1] = title[1].replace('Дуэль: ', '[b][color=green]Дуэль:[/color][/b] ');
		  }
				  
		//getting monay  
		if (outcome.indexOf('поделиться ') > 0)
		  {
		  	outcome = minus+outcome.substring(outcome.lastIndexOf('поделиться ') + 11, outcome.lastIndexOf(' $.'));
		  	// add green color
		  	if (outcome>50){outcome='[color=green]'+outcome+'[/color]';}		  	
		  	// add bold font
		  	outcome='[b]'+outcome+'[/b]';
		  }
		else
		  {outcome = minus+'0';}
		code = title[1]+' '+'Урон: '+hits+' '+outcome+'$'+knockout;
    var name=prompt('Dual text', code);
		//div.innerHTML = '<textarea style="width:100%;height:100%;">' + code + '</textarea>';
		//div.childNodes[0].select();
	}
	
	function hookReport(div) {
		var titleRow = xp1('./table/tbody/tr[2]/td[2]/div/table/tbody/tr', div);
		if (!titleRow) return;

		if (!titleRow.textContent.match(/Дуэль:/))
			return;
		var t = dc({
			"th": { 
				tag: "th", 
				children: {
					"btn": {
						tag: "button",
						attrs: {
							text: " ",
							title: "Конвертировать в текстовый формат",
							style: "background-image: url('data:image/png;base64,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'); background-position: -1px 0px 0px 0px; border: none; width: 65px; height: 25px; cursor: pointer;"
						}
					}
				}
			}
		});
		titleRow.appendChild(t["th"].el);
		t.find("btn").el.addEventListener("click", function() { convertDuelReport(div); }, false);
	}
	
	//
	// Start up
	//
	var loc = doc.location;
	var o_show = unsafeWindow.AjaxWindow.setJSHTML;
	var f = function(div, content) {
		if (!div) return;
		var ret = o_show(div, content);
		hookReport(div);
		return(ret);
	};
	for(var o in o_show) {
		f[o] = o_show[o];
	}
	unsafeWindow.AjaxWindow.setJSHTML = f;
	
})();