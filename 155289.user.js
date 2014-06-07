// ==UserScript==
// @name           Virtonomica:Снабжение
// @namespace      virtonomica
// @version        1.2
// @include        http://*virtonomic*.*/*/main/unit/view/*/supply
// ==/UserScript==

var run = function() {
	var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window); 
	$ = win.$;
	var txt = [],
		scl = [],
		//prc = 0;
		i=0,
		closespan = '<span r="windkol" class="closeform" style="float:right;margin-right:10px;color:#f00;font-size:14pt;cursor:pointer;">&#215;</span>',
		p1 = -1,
		p2 = -1,
		form = false;
	scl[1467]=700000;scl[1483]=350000;scl[370078]=50000;scl[335181]=500000;scl[335176]=333333;scl[335174]=200000;scl[335177]=200000;scl[1465]=100000;scl[2540]=100000;scl[1524]=100000;scl[1460]=15000;scl[2546]=4000;scl[1526]=4000;scl[351577]=1429;scl[370076]=1000;scl[1462]=2500000;scl[1468]=2000000;scl[1466]=1000000;scl[1469]=1000000;scl[7089]=500000;scl[1464]=500000;scl[370070]=500000;scl[7088]=200000;scl[1461]=200000;scl[15336]=1000000;scl[359861]=500000;scl[359863]=500000;scl[359862]=500000;scl[359857]=500000;scl[359860]=500000;scl[359859]=500000;scl[359858]=500000;scl[359856]=100000;scl[15745]=10000000;scl[1493]=10000000;scl[1487]=5000000;scl[1491]=5000000;scl[15744]=2500000;scl[15742]=2500000;scl[1492]=2000000;scl[15743]=2000000;scl[1501]=1250000;scl[359847]=1000000;scl[335184]=1000000;scl[1488]=1000000;scl[15746]=1000000;scl[312797]=100000000;scl[312795]=10000000;scl[1482]=1000000;scl[1472]=1000000;scl[303309]=500000;scl[7090]=350000;scl[1479]=350000;scl[1484]=350000;scl[370073]=333333;scl[370071]=250000;scl[1480]=200000;scl[1463]=200000;scl[1474]=200000;scl[1478]=160000;scl[1481]=150000;scl[7091]=100000;scl[312796]=100000;scl[370077]=100000;scl[1471]=85000;scl[1476]=70000;scl[1477]=70000;scl[15339]=70000;scl[335183]=40000;scl[1475]=100000;scl[370077]=100000;scl[370072]=50000;scl[1525]=20000;scl[1485]=15000;scl[1473]=10000;scl[1529]=5000;scl[12097]=5000;scl[10717]=5000;scl[1518]=1500;scl[15338]=1500;scl[1509]=1000;scl[373198]=1000;scl[370079]=1000;scl[359855]=1000;scl[1528]=1000;scl[373197]=1000;scl[370081]=833;scl[1530]=800;scl[370080]=667;scl[131]=100;scl[132]=50;scl[130]=40;scl[133]=33;scl[335182]=10;scl[1500]=10000000;scl[1491]=5000000;scl[1506]=3500000;scl[15744]=2500000;scl[15742]=2500000;scl[1504]=2000000;scl[1498]=2000000;scl[15743]=2000000;scl[1492]=2000000;scl[1501]=1250000;scl[3865]=1200000;scl[15748]=1000000;scl[15747]=1000000;scl[1499]=1000000;scl[1503]=1000000;scl[15749]=1000000;scl[373201]=1000000;scl[15750]=1000000;scl[1507]=1000000;scl[15336]=1000000;scl[1497]=1000000;scl[1496]=1000000;scl[1502]=1000000;scl[1494]=700000;scl[1489]=700000;scl[335180]=500000;scl[335175]=500000;scl[1505]=500000;scl[3869]=500000;scl[335179]=500000;scl[335178]=333333;scl[1490]=125000;scl[1522]=10000000;scl[1511]=1500000;scl[13708]=1000000;scl[15336]=1000000;scl[1514]=1000000;scl[15335]=1000000;scl[3966]=1000000;scl[3866]=700000;scl[303308]=500000;scl[301319]=400000;scl[301318]=400000;scl[2540]=100000;scl[1524]=100000;scl[1521]=100000;scl[1513]=50000;scl[7092]=50000;scl[1520]=50000;scl[15334]=50000;scl[1519]=50000;scl[370078]=50000;scl[3870]=40000;scl[312799]=40000;scl[312798]=40000;scl[7094]=40000;scl[7093]=35000;scl[1517]=35000;scl[1523]=35000;scl[3838]=35000;scl[370075]=33333;scl[3965]=25000;scl[301320]=20000;scl[1516]=20000;scl[373202]=10000;scl[373200]=10000;scl[1510]=10000;scl[370074]=10000;scl[1512]=10000;scl[303310]=10000;scl[3867]=10000;scl[3868]=10000;scl[15337]=5000;scl[302897]=5000;scl[1515]=5000;scl[373199]=4000;scl[7095]=4000;scl[15338]=1500;scl[370076]=1000;
	function Calculate1(n){
		$('.divtemp').text('');
		var c = parseInt($('#sc').val()),
			c1 = parseInt($('#sc1').val()),
			x1 = 0,
			x2 = 0,
			k = parseFloat($('#sk').val()),
			k1 = parseFloat($('#sk1').val()),
			k2 = parseFloat($('#sk2').val()),
			k3 = parseFloat($('#sk3').val()),
			cn1 = 0,
			cn2 = parseFloat($('#scn2').val()),
			cn3 = parseFloat($('#scn3').val());
		x1 = Math.round(f1(c, c1, k, k1, k2, k3));
		x2 = Math.round(f1(c, c1, k, k1, k3, k2));
		cn1 = f3(c, c1, x1, x2, cn2, cn3).toFixed(2);
		
		if($('#svo').attr('checked')){
			if(x1 > txt[p1]['max']){
				x1 = txt[p1]['max'];
				c1 = Math.round(f2(c, x1, k, k1, k2, k3));
				x2 = Math.round(f1(c, c1, k, k1, k3, k2));
				cn1 = f3(c, c1, x1, x2, cn2, cn3).toFixed(2);
			}
			if(x2 > txt[p2]['max']){
				x2 = txt[p2]['max'];
				c1 = Math.round(f2(c, x2, k, k1, k3, k2));
				x1 = Math.round(f1(c, c1, k, k1, k2, k3));
				cn1 = f3(c, c1, x1, x2, cn2, cn3).toFixed(2);
			}
			$('#sc1').val(c1);
		}
		
		$('#sx1').val(x1);
		$('#sx2').val(x2);
		$('#scn1').val(cn1);
		
		$('#cenacach').text((cn1 / k1).toFixed(2));
		$('#cenacach1').text((cn2 / k2).toFixed(2));
		$('#cenacach2').text((cn3 / k3).toFixed(2));
		$('#divtemp'+p1).html('<a class="aadds" href="#">'+x1+'</a>');
		$('#divtemp'+p2).html('<a class="aadds" href="#">'+x2+'</a>');
		$('.aadds').click(function(){
			var col = $(this).text();
			$(this).parent().next().val(col);
			if(n == 0) updatetable(8);
			if(n == 1) updatetablepr(7);
			if(n == 2) updatetablesk(false);
			return false;
		})
	}
	function fillArray( summ, cach, max ) {
		this.summ = summ;
		this.cach = cach;
		this.max = max;
	}
	function add(id,prod,ar){
		if(prod==1){
			$('#sk2').val(ar[id]['cach']);
			$('#scn2').val(ar[id]['summ']);
			p1 = id;
		}
		if(prod==2){
			$('#sk3').val(ar[id]['cach']);
			$('#scn3').val(ar[id]['summ']);
			p2 = id;
		}
	}
	function print_r(arr, level) {  
		var print_red_text = "";  
		if(!level) level = 0;  
		var level_padding = "";  
		for(var j=0; j<level+1; j++) level_padding += "    ";  
		if(typeof(arr) == 'object') {  
			for(var item in arr) {  
				var value = arr[item];  
				if(typeof(value) == 'object') {  
					print_red_text += level_padding + "'" + item + "' :\n";  
					print_red_text += print_r(value,level+1);  
			}   
				else   
					print_red_text += level_padding + "'" + item + "' => \"" + value + "\"\n";  
			}  
		}   
	  
		else  print_red_text = "===>"+arr+"<===("+typeof(arr)+")";  
		return print_red_text;  
	} 
	function f1(c, c1, k, k1, k2, k3){
			x1 = (c1 * (k1 - k3) - c * (k - k3)) / (k2 - k3);
		return x1;
	}
	function f2(c, x1, k, k1, k2, k3){
			c1 = (x1 * (k2 - k3) + c * (k1 - k3)) / (k1 - k3);
		return c1;
	}
	function f3(c, c1, x1, x2, s1, s2){
			s = (s1 * x1 + s2 * x2) / (c1 - c);
		return s;
	}
	function addar(col, summ, cach, brend, max ) {
		this.col = col;
		this.summ = summ;
		this.cach = cach;
		this.brend = brend;
		this.max = max;
	}
	function nullpr(x){
		if(isNaN(x)) x = 0;
		return x;
	}
	
	
	
	var title=$('#unitImage img').attr('src');
	if(title.search('img/v2/units/shop')!=-1){
		form = true;
		function addtablemax(ar, table, t){
			var cf=0, kf=0, cnf=0, bf=0, b=false;
			for(i=0; i<ar.length; i++){
				if(ar[i]['col'] > ar[i]['max'])
					cf += parseInt(ar[i]['max']);
				else
					cf += parseInt(ar[i]['col']);
			}
			if(cf != 0){
				for(i=0; i<ar.length; i++){
					if(ar[i]['col'] > ar[i]['max']){
						kf += parseFloat(ar[i]['cach'] * ( ar[i]['max'] / cf ));
						cnf += parseFloat(ar[i]['summ'] * ( ar[i]['max'] / cf ));
						bf += parseFloat(ar[i]['brend'] * ( ar[i]['max'] / cf ));
						b = true;
					}else{
						kf += parseFloat(ar[i]['cach'] * ( ar[i]['col'] / cf ));
						cnf += parseFloat(ar[i]['summ'] * ( ar[i]['col'] / cf ));
						bf += parseFloat(ar[i]['brend'] * ( ar[i]['col'] / cf ));
					}
				}
				if(isNaN(kf) || cnf == 0){
					kf = '';
					cnf = '';
					bf = '';
				}
			}
			if(b){
				table.closest('td').css('background-color','#fee');
				var n = 0;
				$('tr', table).each( function() {
					var cels = $('td', this);
					if(n == 0)	$(cels[1]).append(cf.toFixed(0));
					if(n == 1)	$(cels[1]).append(kf.toFixed(2));
					if(n == 2 && t == 0)	$(cels[1]).append(bf.toFixed(2));
					if(n == 3 && t == 0)	$(cels[1]).append(cnf.toFixed(2));
					if(n == 2 && t == 1)	$(cels[1]).append(cnf.toFixed(2));
					n++;
				})
			}
		}
		function createtable(ar, i, t){
			if(ar.length>0){
				var cf=0, kf=0, cnf=0, bf=0;
				for(i=0; i<ar.length; i++){
					cf += parseInt(ar[i]['col']);
				}
				if(cf > 0){
					for(i=0; i<ar.length; i++){
						kf += parseFloat(ar[i]['cach'] * ( ar[i]['col'] / cf ));
						cnf += parseFloat(ar[i]['summ'] * ( ar[i]['col'] / cf ));
						bf += parseFloat(ar[i]['brend'] * ( ar[i]['col'] / cf ));
					}
					if(isNaN(kf)){
						kf = 0;
						cnf = 0;
						bf = 0;
					}
				}else{
					kf = 0;
					cnf = 0;
					bf = 0;
				}
				if(t == 0){
					var table = $('<table width="100%" style="margin-top:-17px" class="noborder"><tr><td class="zcol" align="right">'+cf.toFixed(0)+'</td><td align="right" style="color:#f00;"></td></tr><tr><td align="right">'+kf.toFixed(2)+'</td><td align="right" style="color:#f00;"></td></tr><tr><td align="right">'+bf.toFixed(2)+'</td><td align="right" style="color:#f00;"></td></tr><td align="right">'+cnf.toFixed(2)+'</td><td align="right" style="color:#f00;"></td></tr></table>');
				}
				if(t == 1) var table = $('<table cellpadding="0" cellspacing="0" width="100%" class="noborder"><tr><td align="right">'+cf.toFixed(0)+'</td><td align="right" style="color:#f00;"></td></tr><tr><td align="right">'+kf.toFixed(2)+'</td><td align="right" style="color:#f00;"></td></tr><td align="right">'+cnf.toFixed(2)+'</td><td align="right" style="color:#f00;"></td></tr></table>');
				$(cel).html('').append(table).css('background-color','#efe');
				addtablemax(ar, table, t);
				return 0;
			}
			return i;
		}
		function updatetable(n){
			var ar = [], i=0, j=0;
			$(".list tr").each( function() {
				if($(this).hasClass('sub_row') || $(this).hasClass('product_row')){
					var cels = $('td', this),
						c = 0,
						k = 0,
						cn = 0,
						br = 0,
						sv = 0,
						max = 0;
					var but_1 = $('<input type="button" rel="'+j+'" value="+" />').click(function() { add($(this).attr('rel'),1,txt) });
					var but_2 = $('<input type="button" rel="'+j+'" value="+" />').click(function() { add($(this).attr('rel'),2,txt) });
					if($(this).hasClass('sub_row')){
						
						c = parseInt($('input', cels[1]).val().replace(/ /g, ''));
						cn = parseFloat($(cels[6]).text().replace(/ /g, ''));
						k = parseFloat($(cels[8]).text().replace(/ /g, ''));
						br = parseFloat($(cels[10]).text().replace(/ /g, ''));
						sv = parseInt($(cels[17]).text().replace(/ /g, ''));
						max = parseInt($('span', cels[1]).text().replace('Max: ', '').replace(/ /g, ''));
						if(n==0){
							$(cels[0]).prepend('<br />').prepend(but_2).prepend(but_1);
							$(cels[1]).prepend('<div class="divtemp" id="divtemp'+j+'" style="color:green"></div>');
						}
						k = nullpr(k);
						br = nullpr(br);
					}
					if($(this).hasClass('product_row')){
						i = createtable(ar, i, 0);
						ar = [];
						cel = cels[14];
						c = parseInt($('input', cels[n+17]).val().replace(/ /g, ''));
						cn = parseFloat($(cels[n+22]).text().replace(/ /g, ''));
						k = parseFloat($(cels[n+24]).text().replace(/ /g, ''));
						br = parseFloat($(cels[n+26]).text().replace(/ /g, ''));
						sv = parseInt($(cels[n+33]).text().replace(/ /g, ''));
						max = parseInt($('span', cels[n+17]).text().replace('Max: ', '').replace(/ /g, ''));
						if(n==0){
							$(cels[16]).prepend('<br />').prepend(but_2).prepend(but_1);
							$(cels[17]).prepend('<div class="divtemp" id="divtemp'+j+'" style="color:green"></div>');
						}
						k = nullpr(k);
						br = nullpr(br);
					}
					if(isNaN(max)) max = sv;
					if(sv < max) max = sv;
					ar[i] = new addar(c, cn, k, br, max);
					i++;
					if(n == 0){
						$(this).attr('ids',j);
						txt[j] = new fillArray( cn, k, max );
						j++;
					}
				}
				
				if(!$(this).hasClass('sub_row') || !$(this).hasClass('product_row') && i > 0){
					createtable(ar, i, 0);
				}
			});
		}
		function statusz(x,help){
			var x1 = x;
			var color = '#86EF75';
			if(x > 100){
				x1 = 100;
				color = '#F47981';
			}
			var s = '<div title="'+help+'" style="margin-top:3px;border:solid 1px gray;height:15px;"><div style="background-color:'+color+';width:'+x1.toFixed(2)+'%;height:15px;"><span style="position:absolute;margin-left:10px;">'+x.toFixed(2)+'%</span></div></div>';
			return s;
		}
		function scladr(){
			var prc = 0;
			var prc1 = 0;
			var prc2 = 0;
			$(".list tr").each( function() {
				var cels = $('td', this);
				if($(this).hasClass('product_row')){
					var cel1 = cels[3];
					$('.scl',cel1).remove();
					$('.scl1',cel1).remove();
					$('.scl2',cel1).remove();
					$(cel1).append('<div class="scl"></div>').append('<div class="scl1"></div>').append('<div class="scl2"></div>');
					var col = parseInt($('table td:contains(Количество)',cel1).next().text().replace(/ /g,''));
					var index = parseInt($(cel1).closest('tr').attr('id').replace(/product_row_/g,'').replace(/-([0-9]+)/g,''));
					var scl1 = (col * 100 / scl[index]) * 1000 / $('.list .allsclad select').val();
					$('.scl',cel1).html(statusz(scl1,'В данный момент на складе.'));
					prc += scl1;
					
					var colprod = parseInt($('table td:contains(Продано)',cel1).next().text().replace(/ /g,''));
					var colzac = parseInt($('.zcol',$(cel1).next()).text().replace(/ /g,''));
					
					var scl2 = ((colzac + col) * 100 / scl[index]) * 1000 / $('.list .allsclad select').val();
					$('.scl1',cel1).html(statusz(scl2,'После закупки без продаж.'));
					prc1 += scl2;
					var scl3 = ((colzac + col - colprod) * 100 / scl[index]) * 1000 / $('.list .allsclad select').val();
					$('.scl2',cel1).html(statusz(scl3,'После закупки с такими же продажами.'));
					prc2 += scl3;
				}
			})
			if(prc > 0){
				$('.list .allsclad .cc').html(statusz(prc,'В данный момент на складе.')+statusz(prc1,'После закупки без продаж.')+statusz(prc2,'После закупки с такими же продажами.'));
			}
		}
		
		var i = 0;
		$(".list tr").each( function() {
			var cels = $('td', this);
			if(i == 0 && $(cels[0]).hasClass('title')){
				$(this).before('<tr><td></td><td class="allsclad"><label>Размер склада<select><option value="100">100</option><option value="500">500</option><option value="1000">1000</option></select></label> <a href="#">?</a></div><div class="cc"></div></td><td colspan="9"><div class="helpsn" style="display:none;">Расчет заполняемости склада идет только по товару находящимуся на данной страннице снабжения. (Если на складе присутствует товар по которому в данный момент нет поставщика, то данный товар не считается)</div></td></tr>');
				i++;
			}
		})
		
		$('.allsclad a').click(function(){
			if($('.helpsn').is(':visible'))
				$('.helpsn').hide();
			else
				$('.helpsn').show();
			return false;
		})
		
		$('input[name*=party_quantity]').keyup(function(){
			updatetable(8);
			scladr();
		})
		
		$('.list .allsclad select').change(function(){
			updatetable(8);
			scladr();
		})
		
		updatetable(0);
		scladr()
		
		var but_ras = $('<input type="button" value="Расчет" />').click(function() { Calculate1(0); });
	}

	if(title.search('img/v2/units/animalfarm')!=-1 || title.search('img/v2/units/workshop')!=-1){
		form = true;
		function newtype(id, title, subrow){
			this.id = id;
			this.title = title;
			this.subrow = subrow;
		}
		function addarr(item,n,id){
			var ar = [],c = 0,k = 0,cn = 0,br = 0,sv = 0,max = 0;
			$(item).each( function() {
				var cels = $('td', this);
					c = parseInt($('input', cels[18+n]).val().replace(/ /g, ''));
					k = parseFloat($(cels[28+n]).text().replace(/ /g, ''));
					cn = parseFloat($(cels[23+n]).text().replace(/ /g, ''));
					br = 0;
					sv = parseInt($(cels[36+n]).text().replace(/ /g, ''));
					max = parseInt($('span', cels[18+n]).text().replace('Max: ', '').replace(/ /g, ''));
					k = nullpr(k);
			})
			if(isNaN(max)) max = sv;
			if(sv < max) max = sv;
			ar = new addar(c, cn, k, br, max );
			return ar;
		}		
		var type=[], i=0, k=0;
		$('.list th:contains(Поставки)').before('<th rowspan="2">Заказ</th>');
		function updatetablepr(m){
			for(var item in gaMaterialProduct) {
				var t = $('#product_row_'+item+' th [rowspan=2] img').attr('alt'),
					subrow = gaMaterialProduct[item]['subRowCount'],
					ar = [],
					n = 0;
				type[i] = new newtype(item,t,subrow);
				i++;
				
				ar[n] = addarr('#product_row_'+item,m,k);
				n++;
				
				if(m == 0){
					var but_1 = $('<input type="button" rel="'+k+'" value="+" />').click(function() { add($(this).attr('rel'),1,txt) });
					var but_2 = $('<input type="button" rel="'+k+'" value="+" />').click(function() { add($(this).attr('rel'),2,txt) });
					$('#product_row_'+item+' #name_'+item+'_0').prepend('<br />').prepend(but_2).prepend(but_1);
					$('#product_row_'+item+' #name_'+item+'_0').next().prepend('<div class="divtemp" id="divtemp'+k+'" style="color:green"></div>');
				}
				
				txt[k] = addarr('#product_row_'+item,m,k);
				k++;
							
				for(j=1; j<subrow; j++){
					ar[n] = addarr('#product_sub_row_'+item+'_'+j,-17,k);
					n++;
					if(m == 0){
						but_1 = $('<input type="button" rel="'+k+'" value="+" />').click(function() { add($(this).attr('rel'),1,txt) });
						but_2 = $('<input type="button" rel="'+k+'" value="+" />').click(function() { add($(this).attr('rel'),2,txt) });
						$('#product_sub_row_'+item+'_'+j+' #name_'+item+'_'+j).prepend('<br />').prepend(but_2).prepend(but_1);
						$('#product_sub_row_'+item+'_'+j+' #name_'+item+'_'+j).next().prepend('<div class="divtemp" id="divtemp'+k+'" style="color:green"></div>');
					}
					txt[k] = addarr('#product_sub_row_'+item+'_'+j,-17,k);
					k++;
				}
				
				if( m>0 )
					$('#product_row_'+item+' #name_'+item+'_0').prev().remove();
				
				var cel = $('<td class="temp'+item+'" rowspan="'+subrow+'"></td>');
				$('#product_row_'+item+' #name_'+item+'_0').before(cel);
				
				if(ar.length>0){
					var cf=0, kf=0, cnf=0;
					for(j=0; j<ar.length; j++){
						cf += parseInt(ar[j]['col']);
					}
					if(cf > 0){
						for(j=0; j<ar.length; j++){
							kf += parseFloat(ar[j]['cach'] * ( ar[j]['col'] / cf ));
							cnf += parseFloat(ar[j]['summ'] * ( ar[j]['col'] / cf ));
						}
						if(isNaN(kf)){
							kf = 0;
							cnf = 0;
						}
					}else{
						kf = 0;
						cnf = 0;
					}
					var table = $('<table cellpadding="0" cellspacing="0" width="100%" class="noborder"><tr><td align="right">'+cf.toFixed(0)+'</td><td align="right" style="color:#f00;"></td></tr><tr><td align="right">'+kf.toFixed(2)+'</td><td align="right" style="color:#f00;"></td></tr><tr><td align="right">'+cnf.toFixed(2)+'</td><td align="right" style="color:#f00;"></td></tr></table>')
					$(cel).html('').append(table).css('background-color','#efe');
					addtablemax(ar, table, 1);
				}
				$('temp'+item).remove();
				$('#product_row_'+item+' #name_'+item+'_0').before(cel);
			}
		}
		updatetablepr(0);
		$('input[name*=supplyContractData]').keyup(function(){
			updatetablepr(7);
		})
		var but_ras = $('<input type="button" value="Расчет" />').click(function() { Calculate1(1); });
	}
	
	if(title.search('img/v2/units/warehouse')!=-1){
		function ssred(cel,ar,t){
			var cf=0, kf=0, cnf=0, b = false;
			for(i=0; i<ar.length; i++){
				if(ar[i]['col'] <= ar[i]['max'] || t)
					cf += parseInt(ar[i]['col']);
				else
					cf += parseInt(ar[i]['max']);
			}
			if(cf > 0){
				for(i=0; i<ar.length; i++){
					if(ar[i]['col'] <= ar[i]['max'] || t){
						kf += parseFloat(ar[i]['cach'] * ( ar[i]['col'] / cf ));
						cnf += parseFloat(ar[i]['summ'] * ( ar[i]['col'] / cf ));
					}else{
						kf += parseFloat(ar[i]['cach'] * ( ar[i]['max'] / cf ));
						cnf += parseFloat(ar[i]['summ'] * ( ar[i]['max'] / cf ));
						b = true;
					}
				}
				if(isNaN(kf)){
					kf = 0;
					cnf = 0;
				}
			}else{
				kf = 0;
				cnf = 0;
			}
			if(t){
				$('.cf',cel).text(cf.toFixed(0));
				$('.cnf',cel).text(cnf.toFixed(2));
				$('.kf',cel).text(kf.toFixed(2));
				$(cel).css('background-color','#efe');
				ssred(cel,ar,false);
			}
			if(b){
				$(cel).css('background-color','#fee');
				$('.cf',cel).append('<div style="color:#f00">'+cf.toFixed(0)+'</div>');
				$('.cnf',cel).append('<div style="color:#f00">'+cnf.toFixed(2)+'</div>');
				$('.kf',cel).append('<div style="color:#f00">'+kf.toFixed(2)+'</div>');
			}
		}
		function updatetablesk(t){
			var ar = [], cel, n=0;
			form = true;
			$('table.list tr').each( function() {
				var cels = $('td',this);
				if($(this).attr('class')=="p_title"){
					if(t){
						if($('.p_title_l div table',$(this)).html().length < 25){
							$(cels[1]).append('<strong style="display:block" class="cf"></strong>');
							$(cels[3]).append('<strong style="display:block" class="cnf"></strong>');
							$(cels[5]).append('<strong style="display:block" class="kf"></strong>');
						}else{
							$(cels[7]).append('<strong style="display:block" class="cf"></strong>');
							$(cels[9]).append('<strong style="display:block" class="cnf"></strong>');
							$(cels[11]).append('<strong style="display:block" class="kf"></strong>');
						}
					}
					if(i > 0){
						ssred(cel,ar,true);
					}
					cel = this;
					ar = [];
					i = 0;
				}
				if($(this).attr('class')=="odd" || $(this).attr('class')=="even"){
					var c = parseInt($('input[name*=supplyContractData]',cels[1]).val().replace(/ /g, '')),
						cn = parseFloat($(cels[3]).text().replace(/ /g, '')),
						k = parseFloat($(cels[5]).text().replace(/ /g, '')),
						max = parseInt($(cels[8]).text().replace(/ /g, ''));
						k = nullpr(k);
						ar[i] = new addar(c, cn, k, 0, max );
						i++;
						if(t){
							but_1 = $('<input type="button" rel="'+n+'" value="+" />').click(function() { add($(this).attr('rel'),1,txt) });
							but_2 = $('<input type="button" rel="'+n+'" value="+" />').click(function() { add($(this).attr('rel'),2,txt) });
							$(cels[0]).prepend('<br />').prepend(but_2).prepend(but_1);
							$(cels[1]).prepend('<div class="divtemp" id="divtemp'+n+'"></div>');
							
							txt[n] = new addar(c, cn, k, 0, max );
							n++;
						}
				}
				if($(this).attr('class')!="odd" && $(this).attr('class')!="even" && $(this).attr('class')!="p_title" && i>0){
					ssred(cel,ar,true);
				}
			});
		}
		updatetablesk(true);
		$('input[name*=supplyContractData]').keyup(function(){
			updatetablesk(false);
		})
		var but_ras = $('<input type="button" value="Расчет" />').click(function() { Calculate1(2); });
	}
	
	if(form){	
		$('#mainContent').after('<div id="mainformc" style="display:none; position:fixed; width:500px; background-color:#fff; border:solid 1px #000; z-index:1001; top:10px; left:10px;">'+closespan+'</div>')
		
		var but_show = $('<input type="button" value="Форма смеси" style="position:fixed; left:0px; top:0px;" />').click(function() { $('#mainformc').show(); });
		$('#mainContent').prepend(but_show);
		
		$('#mainformc').append('<table align="center" width="20%" border="0" class="grid"><tr class="odd" ><th></th><th >В наличии</th><th>Необходимо</th><th colspan=2 scope="col">Продукты</th></tr><tr align="right" class="odd">	<th>Количество</th><td><input type=text id="sc" maxlength=11 value="0" size=10 tabindex=1></td><td><input type=text id="sc1" maxlength=11 value="0" size=10 tabindex=3></td><td><input style="background-color:#ddd;" readonly type=text id="sx1" maxlength=11 value="0" size=10></td><td><input style="background-color:#ddd;" readonly type=text id="sx2" maxlength=11 value="0" size=10></td></tr><tr align="right" class="even"><th>Качество</th><td><input type=text id="sk" maxlength=11 value="0" size=10 tabindex=2></td><td><input type=text id="sk1" maxlength=11 value="0" size=10 tabindex=4></td><td><input type=text id="sk2" maxlength=11 value="0" size=10 tabindex=5></td><td><input type=text id="sk3" maxlength=11 value="0" size=10 tabindex=7></td></tr><tr align="right" class="odd"><th>Цена</th><td></td><td ><div id="cenacach" style="color:#f00;"></div><input style="background-color:#ddd;" readonly type=text id="scn1" maxlength=11 value="0" size=10></td><td><div id="cenacach1" style="color:#f00;"></div><input type=text id="scn2" maxlength=11 value="0" size=10 tabindex=6></td><td><div id="cenacach2" style="color:#f00;"></div><input type=text id="scn3" maxlength=11 value="0" size=10 tabindex=8></td></tr></table>')
			.append(but_ras)
			.append('<label><input type="checkbox" id="svo" />Считать с кол-вом остатков</label>');
			
		$('#mainformc .closeform').click(function(){$('#mainformc').hide()})
	}
}

// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);
