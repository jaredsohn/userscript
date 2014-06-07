// ==UserScript==
// @name           Virtonomica: Смеситель двух и более товаров
// @namespace      virtonomica
// @description    Список поставщиков
// @include        http://virtonomic*.*/*/window/unit/supply/create/*/step2
// @include        http://virtonomic*.*/*/window/unit/equipment/*
// @version        1.1
// ==/UserScript==

var run = function() {
	function Calculate1(){
		//document.forms.form1[element].value = document.forms.form1[element].value.replace(",", ".");
		var quan1 = (document.forms.form1.need_quantity1.value * (document.forms.form1.need_quality1.value - document.forms.form1.product2_quality1.value) - document.forms.form1.exist_quantity1.value * (document.forms.form1.exist_quality1.value - document.forms.form1.product2_quality1.value))/(document.forms.form1.product1_quality1.value - document.forms.form1.product2_quality1.value),
			quan2 = document.forms.form1.need_quantity1.value - document.forms.form1.exist_quantity1.value - quan1;
		
		quan1 = Math.round(quan1);
		quan2 = Math.round(quan2);
		
		document.forms.form1.product1_quantity1.value = quan1;
		document.forms.form1.product2_quantity1.value = quan2;
		document.forms.form1.need_price1.value = (document.forms.form1.product1_price1.value * document.forms.form1.product1_quantity1.value + document.forms.form1.product2_price1.value * document.forms.form1.product2_quantity1.value) / (document.forms.form1.need_quantity1.value - document.forms.form1.exist_quantity1.value);
		$('#cenacach').text((document.forms.form1.need_price1.value / document.forms.form1.need_quality1.value).toFixed(2));
		$('#cenacach1').text((document.forms.form1.product1_price1.value / document.forms.form1.product1_quality1.value).toFixed(2));
		$('#cenacach2').text((document.forms.form1.product2_price1.value / document.forms.form1.product2_quality1.value).toFixed(2));
		//$('#main_content1').append('<div>('+document.forms.form1.product1_price1.value+' * '+document.forms.form1.product1_quantity1.value+' + '+document.forms.form1.product2_price1.value+' * '+document.forms.form1.product2_quantity1.value+') / '+document.forms.form1.need_quantity1.value+'</div>')
	}
	function fillArray( id, cen, cach, brend, summ, svob, max, name, ch ) {
  		this.id = id;
  		this.cen = cen;
		this.cach = cach;
		this.brend = brend;
		this.summ = summ;
		this.svob = svob;
		this.max = max;
		this.name = name;
		this.ch = ch;
	}
	function fillArrayAr1( low_id, hight_id, cen ) {
  		this.low_id = low_id;
   		this.hight_id = hight_id;
		this.cen = cen;
	}
	function fillArrayAr( id, col, cach, brend, summ ) {
  		this.id = id;
   		this.col = col;
		this.cach = cach;
		this.brend = brend;
		this.summ = summ;
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
    function echoresult(ar){
		var cf=0, kf=0, cnf=0, bf=0, i;
		for(i=0; i<ar.length; i++){
			cf += parseInt(ar[i]['col']);
		}
		for(i=0; i<ar.length; i++){
			kf += parseFloat(ar[i]['cach'] * ( ar[i]['col'] / cf ));
			cnf += parseFloat(ar[i]['summ'] * ( ar[i]['col'] / cf ));
			bf += parseFloat(ar[i]['brend'] * ( ar[i]['col'] / cf ));
		}
		var str = '<tr class="odd resulttr"><th></th><th></th><th></th><th colspan="4">Итого</th></tr><tr class="resulttr" style="font-weight:bold"><td></td><td></td><td></td><td align="center">'+cf.toFixed(0)+'</td><td align="center">'+kf.toFixed(2)+'</td><td align="center">'+cnf.toFixed(2)+'</td><td align="center">'+bf.toFixed(2)+'</td></tr><tr class="resulttr"><td></td><td></td><td></td><td colspan="4">Общая сумма: '+(cf.toFixed(0)*cnf).toFixed(2)+'</td></tr>';
		return str;
	}
	function raschet(){
		var low = [];
		var hight = [];
		var nl=0, nh=0;
		for(i=0;i<txt.length;i++){
			if(txt[i]['ch'] == 1){
				if(txt[i]['cach'] <= document.forms.form1.need_quality1.value){
					nl++;
					low[nl] = txt[i];
				}
				if(txt[i]['cach'] > document.forms.form1.need_quality1.value){
					nh++;
					hight[nh] = txt[i];
				}
			}
		}
		if(nl==0 || nh==0){
			alert('Нет поставщиков с подходящим качеством.');
			return;
		}
		//================================================
		for(i=0;i<=low.length;i++){
			for(j = 1;j < low.length - 1 - i;j++) {
				if(parseFloat(low[j]['cen']) > parseFloat(low[j+1]['cen'])){
					var tmp = low[j];
					low[j] = low[j+1];
					low[j+1] = tmp;
				}
			}
		}
		
		for(i=0;i<=hight.length;i++){
			for(j = 1;j < hight.length - 1 - i;j++) {
				if(parseFloat(hight[j]['cen']) > parseFloat(hight[j+1]['cen'])){
					var tmp = hight[j];
					hight[j] = hight[j+1];
					hight[j+1] = tmp;
				}
			}
		}
				
		var ar = [];
		var n = 0;
		
		for(i=1;i<low.length;i++){
			for(j=1;j<hight.length;j++){
				
				var quantity1 = (document.forms.form1.need_quantity1.value * (document.forms.form1.need_quality1.value - hight[j]['cach']) - document.forms.form1.exist_quantity1.value * (document.forms.form1.exist_quality1.value - hight[j]['cach']))/(low[i]['cach'] - hight[j]['cach']);
				var quantity2 = document.forms.form1.need_quantity1.value - document.forms.form1.exist_quantity1.value - quantity1;
				
				if(quantity1 > 0 && quantity2 > 0){
					if($('#svo').attr('checked')){
						if(quantity1.toFixed(0)<low[i]['svob'] && quantity1.toFixed(0)<low[i]['max']){
							if(quantity2.toFixed(0)<hight[j]['svob'] && quantity2.toFixed(0)<hight[j]['max']){
								n++;
								var price1 = (low[i]['summ'] * quantity1 + hight[j]['summ'] * quantity2) / (document.forms.form1.need_quantity1.value - document.forms.form1.exist_quantity1.value);								
								ar[n] = new fillArrayAr1( i, j, price1 );
							}
						}
					}else{
						n++;
						var price1 = (low[i]['summ'] * quantity1 + hight[j]['summ'] * quantity2) / (document.forms.form1.need_quantity1.value - document.forms.form1.exist_quantity1.value);
						ar[n] = new fillArrayAr1( i, j, price1 );
					}
				}
				
				if(n>2500) j=hight.length;
			}
			if(n>2500) i=low.length;
		}
		for(i=0;i<=ar.length;i++){
			for(j = 1;j < ar.length - 1 - i;j++) {
				if(parseFloat(ar[j]['cen']) > parseFloat(ar[j+1]['cen'])){
					var tmp = ar[j];
					ar[j] = ar[j+1];
					ar[j+1] = tmp;
				}
			}
		}
		var but_show_variant = $('<input type="button" value="Отобразить" />').click(function() {
			var id = $('#my_select').val();
 			var low_id = low[ar[id]['low_id']]['id'];
			var hight_id = hight[ar[id]['hight_id']]['id'];
			
			$('.ordered').hide();
			$('.idstr').parent().parent().hide();
			
			$('#td_s'+low_id).parent().parent().show();
			$('#td_s'+hight_id).parent().parent().show();
			
			document.forms.form1.product1_quality1.value = txt[low_id]['cach'];
			document.forms.form1.product1_price1.value = txt[low_id]['summ'];
			
			document.forms.form1.product2_quality1.value = txt[hight_id]['cach'];
			document.forms.form1.product2_price1.value = txt[hight_id]['summ'];
			
			Calculate1();
			$('.divtemp').remove();
			$('#1tdch'+low_id).prepend('<div class="divtemp" ids="'+low_id+'" style="float:left;font-size:14pt;color:#060;">'+document.forms.form1.product1_quantity1.value+' <a class="avtostos" href="#" title="Добавить в смеситель">+</a></div>');
			$('#1tdch'+hight_id).prepend('<div class="divtemp" ids="'+hight_id+'" style="float:left;font-size:14pt;color:#060;">'+document.forms.form1.product2_quantity1.value+' <a class="avtostos" href="#" title="Добавить в смеситель">+</a></div>');
			$('.avtostos').click(function(){
				var ids = $(this).closest('.divtemp').attr('ids'),
					b = false,
					bthis = $(this).closest('td').prev().children('.badds'),
					athis = $(this);
					
				for(i=0; i<txt1.length; i++){
					if(txt1[i]['id'] == ids){
						var c = parseInt(txt1[i]['col']);
						 c += parseInt($(this).closest('.divtemp').text());
						$('.tridsc[ids='+i+'] .ccc').val(c);
						b = true;
					}
					//$('#rass').trigger('click');
				}
				if(!b){
					var id = ids,
						c = parseInt(athis.closest('.divtemp').text());
					$('#mainformc1 table').append('<tr class="tridsc" id="trids'+id+'" ids="'+index+'"><td>'+closespan+'</td><td>'+txt[id]['name']+'</td><td class="maxtd">'+txt[id]['max']+'</td><td><input class="ccc" type="text" size="10" /></td><td align="center"><span class="kkk"></span></td><td align="center"><span class="cncncn"></span></td><td align="center"><span class="br"></span></td></tr>');
					$('#trids'+id+' .closeform').click(function(){
						var t = $('#trids'+id).attr('ids');
						$('#trids'+id).remove();
						$('.divtemp'+id).closest('tr').attr('style','');
						$('.divtemp'+id).prev().addClass('badds').show();
						$('.divtemp'+id).remove();
						var tem = [];
						if(t < index){
							for(i=0; i<txt1.length-1; i++){
								if(t>i)
									tem[i] = txt1[i];
								else
									tem[i] = txt1[i+1];
							}
						}
						if(t == index){
							for(i=0; i<index-1; i++){
								tem[i] = txt1[i];
							}
						}
						index--;
						if(index <= 0) $('#rass').hide();
						txt1 = [];
						txt1 = tem;
						$('.resulttr').remove();
						if(index > 0){
							$('#mainformc1 table').append(echoresult(txt1));
						}
						
						//alert(txt1.length);
						//alert(print_r(txt1));
					})
					bthis.closest('td').append('<div class="divtemp'+id+'" style="font-size:14pt;color:#060;">'+c+'<br></div>');
				
					if(c > txt[id]['max']){
						$('.divtemp'+id).append('<span style="color:red;font-size:10pt;">Max: '+txt[id]['max']+'</span>')
						bthis.closest('tr').attr('style','background-color:#FDD');
						$('#trids'+id+' .ccc').attr('style','background-color:#F99');
					}else{
						bthis.closest('tr').attr('style','background-color:#FFD');
						$('#trids'+id+' .ccc').attr('style','background-color:#FFF');
					}
					
					k = txt[id]['cach'];
					cn = txt[id]['summ'];
					$('#trids'+id+' .ccc').val(c);
					$('#trids'+id+' .kkk').text(k);
					$('#trids'+id+' .cncncn').text(cn);
					$('#trids'+id+' .br').text(txt[id]['brend']);
					txt1[index] = new fillArrayAr( id, c, k, txt[id]['brend'], cn);
					bthis.removeClass('badds').hide();
					$('.badds').show();
					$('#windkol').remove();
					index++;
					$('#rass').show();
				}
				//athis.remove();
				$('.resulttr').remove();
				$('#rass').trigger('click');
				
				//$('.ordered').hide();
				$('.idstr').closest('tr').hide();
				
				$('#td_s'+low_id).parent().parent().show();
				$('#td_s'+hight_id).parent().parent().show();
				//$('#mainformc1 table').append(echoresult(txt1));
				return false;
			})
		});
		var but_show_all = $('<input type="button" value="Отобразить все" />').click(function() {
			$('.ordered').show();
			$('.idstr').parent().parent().show();
		});
		$('#form_s').remove();
		$('#mainformc').append('<div id="form_s"><label>Варианты себестоимости: <select id="my_select" name="my_select"></select></label></div>');
		$('#form_s').append(but_show_variant).append(but_show_all);
		for(i=1;i<ar.length;i++){
			var low_id = low[ar[i]['low_id']]['id'];
			var hight_id = hight[ar[i]['hight_id']]['id'];
			id_rod = $('#1td_s'+low_id).parent().parent().attr("id");
			id_rod1 = $('#1td_s'+hight_id).parent().parent().attr("id");
			var summa = parseFloat(ar[i]['cen']);
			$('#my_select').append('<option value="'+i+'">'+summa.toFixed(4)+'</option>');
		}
	}
	//цена качество бренд наименование свободно макс
	function txtar(cels,cn1,k1,br1,name1,sv1,max1){
		var	cn = parseFloat($(cels[cn1]).text().replace(/ /g, '')),
			k = parseFloat($(cels[k1]).text().replace(/ /g, '')),
			br = parseFloat($(cels[br1]).text().replace(/ /g, '')),
			name = $(cels[name1]).html(),
			sv = parseFloat($(cels[sv1]).text().replace(/ /g, '')),
			max = parseFloat($('span',$(cels[max1])).text().replace('Max: ', '').replace(/ /g, ''));
			if(isNaN(br) || !(br >= 0)) br = 0;
			if (isNaN(cn) || isNaN(k)){
				$(cels[0]).closest('tr').append('<td align="center"></td>');
				return;
			}else
				$(cels[0]).closest('tr')
					.append('<td id="tdch'+i+'" align="center"><input class="badds" ids="'+i+'" type="button" value="+" /></td>')
					.append('<td id="1tdch'+i+'" align="center"><input checked class="chsel" ids="'+i+'" type="checkbox" /></td>');
			
			var qp = (cn / k).toFixed(2);
			if (isNaN(max)) max = sv;
			$(cels[k1]).html('<span class="idstr" id="td_s'+i+'" style="color:#f00;float:left; margin-left:5px;">'+qp+'</span> ' + k);
			txt[i] = new fillArray( i, qp, k, br, cn, sv, max, name, 1);
			i++;
	}	
    var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window); 
    var txt = [], txt1 = [], index = 0, b = false;
		closespan = '<span r="windkol" class="closeform" style="float:right;margin-right:10px;color:#f00;font-size:14pt;cursor:pointer;">&#215;</span>';
    $ = win.$;
    i = 0;
 
    if($('.local_header td h2').text().search('Выбор поставщика')!=-1){
		$('#mainTable tr').each(function() {
			var cels = $('td', this);
			txtar(cels,8,9,10,1,4,3);
			
			/*var price = parseFloat($(cels[8]).text().replace(/ /g, ''));
			var qual = parseFloat($(cels[9]).text().replace(/ /g, ''));
			var brend = parseFloat($(cels[10]).text().replace(/ /g, ''));
			if(isNaN(brend) || !(brend >= 0)) brend = 0;
			if (isNaN(price) || isNaN(qual)){
				$(this).append('<td align="center"></td>');
				return;
			}else
				$(this)
					.append('<td id="tdch'+i+'" align="center"><input class="badds" ids="'+i+'" type="button" value="+" /></td>')
					.append('<td id="1tdch'+i+'" align="center"><input checked class="chsel" ids="'+i+'" type="checkbox" /></td>');
			var name = $(cels[1]).html();
			var qp = (price / qual).toFixed(2);
			var svob = parseFloat($(cels[4]).text().replace(/ /g, ''));
			var max = parseFloat($('span',$(cels[3])).text().replace('Max: ', '').replace(/ /g, ''));
			if (isNaN(max)) max = svob;
			$(cels[9]).html('<span class="idstr" id="td_s'+i+'" style="color:#f00;float:left; margin-left:5px;">'+qp+'</span> ' + qual);
			txt[i] = new fillArray( i, qp, qual, brend, price, svob, max, name, 1);
			i++;*/
		})
		b = true;
	}

	if($('.header_all_self .header h3').text().search('Поставщики оборудования')!=-1 || $('.header_all_self .header h3').text().search('Поставщики животных')!=-1){
		$('#mainTable tr').each(function() {
			var cels = $('td', this);
			txtar(cels,6,7,-1,1,2,-1);
		})
		b = true;
	}
	
	if(b){
		i = 0;
		$('.main_table tr').each(function() {
			if(i == 0)
				$(this)
					.append('<th rowspan="2">Смеситель</th>')
					.append('<th rowspan="2"><label>Использовать<br /><input checked id="selall" type="checkbox" /></label></th>');
			i++;
		})
		
		$('.chsel').click(function(){
			if($(this).prop("checked"))
				txt[$(this).attr('ids')]['ch'] = 1;
			else
				txt[$(this).attr('ids')]['ch'] = 0;
		})
		
		$('#selall').click(function(){
			$('.chsel').attr('checked', this.checked);
			var ch;
			if($(this).prop("checked"))
				ch = 1;
			else
				ch = 0;
			for(i=0; i<txt.length; i++){
				txt[i]['ch'] = ch;
			}
		})
		
		var menu = $('<div style="margin-top:-30px;padding:0px;position:fixed;z-index:1000;background-color:#53970D;"></div>');
		var but_show = $('<input type="button" value="Автосмесь" />').click(function() { $('#mainformc').show(); });
		var but_show1 = $('<input type="button" value="Форма смеси" />').click(function() { $('#mainformc1').show(); });
		$('body').prepend(menu);
		menu.append(but_show).append(but_show1);
		
		$('#headerWithSeparator')
			.after('<div id="mainformc" style="display:none; position:fixed; width:500px; background-color:#fff; border:solid 1px #000; z-index:1001; top:10px; left:10px;">'+closespan+'</div>')
			.after('<div id="mainformc1" style="overflow:auto;display:none;position:fixed;width:550px;max-height:95%;background-color:#fff;border:solid 1px #000;z-index:1002;top:10px;left:10px;"></div>');
		
		var but_ras = $('<input type="button" value="Расчет" />').click(function() { Calculate1(); });
		var but_ras1 = $('<input type="button" value="Полный расчет" />').click(function() { raschet(); });
		$('#mainformc').append('<form id="form1" name="form1" method="post"><table align="center" width="20%" border="0" class="grid"><tr class="odd" ><th></th><th >В наличии</th><th>Необходимо</th><th colspan=2 scope="col">Продукты</th></tr><tr align="right" class="odd"><th>Количество</th><td><input type=text name="exist_quantity1" maxlength=11 value="0" size=10 tabindex=1></td><td><input type=text name="need_quantity1" maxlength=11 value="0" size=10 tabindex=3></td><td><input style="background-color:#ddd;" readonly type=text name="product1_quantity1" maxlength=11 value="0" size=10></td><td><input style="background-color:#ddd;" readonly type=text name="product2_quantity1" maxlength=11 value="0" size=10></td></tr><tr align="right" class="even"><th>Качество</th><td><input type=text name="exist_quality1" maxlength=11 value="0" size=10 tabindex=2></td><td><input type=text name="need_quality1" maxlength=11 value="0" size=10 tabindex=4></td><td><input type=text name="product1_quality1" maxlength=11 value="0" size=10 tabindex=5></td><td><input type=text name="product2_quality1" maxlength=11 value="0" size=10 tabindex=7></td></tr><tr align="right" class="odd"><th>Цена</th><td></td><td ><div id="cenacach" style="color:#f00;"></div><input style="background-color:#ddd;" readonly type=text name="need_price1" maxlength=11 value="0" size=10></td><td><div id="cenacach1" style="color:#f00;"></div><input type=text name="product1_price1" maxlength=11 value="0" size=10 tabindex=6></td><td><div id="cenacach2" style="color:#f00;"></div><input type=text name="product2_price1" maxlength=11 value="0" size=10 tabindex=8></td></tr></table></form>')
			.append(but_ras)
			.append(but_ras1)
			.append('<label><input type="checkbox" id="svo" />Считать с кол-вом остатков</label>');
		
		$('#mainformc1').append(closespan).append('<table class="grid" align="center" width="100%"><tr class="odd"><th></th><th width="40%">Поставщик</th><th>Max</th><th>Количество</th><th>Качество</th><th>Цена</th><th>Бренд</th></tr></table>').append('<input id="rass" type="button" value="Пересчитать" style="display:none" />');
		$('#mainformc .closeform').click(function(){$('#mainformc').hide()})
		$('#mainformc1 .closeform').click(function(){$('#mainformc1').hide()})
		$('#rass').click(function(){
			for(i=0; i<txt1.length; i++){
				txt1[i]['col'] = $('.tridsc[ids='+i+'] .ccc').val();
				$('.divtemp'+txt1[i]['id']).text(txt1[i]['col']);
				if(txt1[i]['col'] > txt[txt1[i]['id']]['max']){
					$('.divtemp'+txt1[i]['id']).append('<br><span style="color:red;font-size:10pt;">Max: '+txt[txt1[i]['id']]['max']+'</span>')
					$('.divtemp'+txt1[i]['id']).closest('tr').attr('style','background-color:#FDD');
					$('#trids'+txt1[i]['id']+' .ccc').attr('style','background-color:#F99');
				}else{
					$('.divtemp'+txt1[i]['id']).closest('tr').attr('style','background-color:#FFD');
					$('#trids'+txt1[i]['id']+' .ccc').attr('style','background-color:#FFF');
				}
			}
			
			$('.resulttr').remove();
			$('#mainformc1 table').append(echoresult(txt1));
		});
		$('.badds').click(function(){
			var id = $(this).attr('ids'),
				bthis = $(this);
			$('.badds').hide();
			$('#headerWithSeparator').after('<div id="windkol" style="position:fixed;width:300px;height:25px;top:50%;left:50%;margin-top:-20px;margin-left:-100px;z-index:5001;background-color:#fff;border:solid 1px #000;padding:10px;">'+closespan+'<label>Количество: <input type="text" size="10" /></label><input type="button" value="OK" /></div>')
			$('#windkol input[type=text]').focus();
			$('#windkol .closeform').click(function(){$('.badds').show();$('#windkol').remove()})
			$('#windkol input[type=button]').click(function(){
				var c = parseFloat($('#windkol input[type=text]').val().replace(/ /g, ''));
				if(c > 0){
					$('#mainformc1 table').append('<tr class="tridsc" id="trids'+id+'" ids="'+index+'"><td>'+closespan+'</td><td>'+txt[id]['name']+'</td><td class="maxtd">'+txt[id]['max']+'</td><td><input class="ccc" type="text" size="10" /></td><td align="center"><span class="kkk"></span></td><td align="center"><span class="cncncn"></span></td><td align="center"><span class="br"></span></td></tr>');
					$('#trids'+id+' .closeform').click(function(){
						var t = $('#trids'+id).attr('ids');
						$('#trids'+id).remove();
						$('.divtemp'+id).closest('tr').attr('style','');
						$('.divtemp'+id).prev().addClass('badds').show();
						$('.divtemp'+id).remove();
						var tem = [];
						if(t < index){
							for(i=0; i<txt1.length-1; i++){
								if(t>i)
									tem[i] = txt1[i];
								else
									tem[i] = txt1[i+1];
							}
						}
						if(t == index){
							for(i=0; i<index-1; i++){
								tem[i] = txt1[i];
							}
						}
						index--;
						if(index <= 0) $('#rass').hide();
						txt1 = [];
						txt1 = tem;
						$('.resulttr').remove();
						if(index > 0){
							$('#mainformc1 table').append(echoresult(txt1));
						}
						
						//alert(txt1.length);
						//alert(print_r(txt1));
					})
					
					bthis.closest('td').append('<div class="divtemp'+id+'" style="font-size:14pt;color:#060;">'+c+'<br></div>');
					
					if(c > txt[id]['max']){
						$('.divtemp'+id).append('<span style="color:red;font-size:10pt;">Max: '+txt[id]['max']+'</span>')
						bthis.closest('tr').attr('style','background-color:#FDD');
						$('#trids'+id+' .ccc').attr('style','background-color:#F99');
					}else{
						bthis.closest('tr').attr('style','background-color:#FFD');
						$('#trids'+id+' .ccc').attr('style','background-color:#FFF');
					}
					
					k = txt[id]['cach'];
					cn = txt[id]['summ'];
					$('#trids'+id+' .ccc').val(c);
					$('#trids'+id+' .kkk').text(k);
					$('#trids'+id+' .cncncn').text(cn);
					$('#trids'+id+' .br').text(txt[id]['brend']);
					txt1[index] = new fillArrayAr( id, c, k, txt[id]['brend'], cn);
					bthis.removeClass('badds').hide();
					$('.badds').show();
					$('#windkol').remove();
					index++;
					$('#rass').show();
					
					$('.resulttr').remove();
					$('#mainformc1 table').append(echoresult(txt1));
				}else{
					alert('Поле количество доложно быть больше 0.');
				}
			})
			
		})
	}
}

var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);
