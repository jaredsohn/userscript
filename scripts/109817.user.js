// ==UserScript==
// @name           Virtonomica: Список выбора поставщиков
// @namespace      virtonomica
// @description    Список выбора поставщиков
// @include        http://virtonomic*.*/*/window/unit/supply/create/*/step2
// ==/UserScript==

var run = function() {
	function Calculate1(){
		//document.forms.form1[element].value = document.forms.form1[element].value.replace(",", ".");
		document.forms.form1.product1_quantity1.value = (document.forms.form1.need_quantity1.value * (document.forms.form1.need_quality1.value - document.forms.form1.product2_quality1.value) - document.forms.form1.exist_quantity1.value * (document.forms.form1.exist_quality1.value - document.forms.form1.product2_quality1.value))/(document.forms.form1.product1_quality1.value - document.forms.form1.product2_quality1.value);
		document.forms.form1.product2_quantity1.value = document.forms.form1.need_quantity1.value - document.forms.form1.exist_quantity1.value - document.forms.form1.product1_quantity1.value;
		document.forms.form1.need_price1.value = (document.forms.form1.product1_price1.value * document.forms.form1.product1_quantity1.value + document.forms.form1.product2_price1.value * document.forms.form1.product2_quantity1.value) / (document.forms.form1.need_quantity1.value - document.forms.form1.exist_quantity1.value);
		$('#cenacach').text((document.forms.form1.need_price1.value / document.forms.form1.need_quality1.value).toFixed(2));
		$('#cenacach1').text((document.forms.form1.product1_price1.value / document.forms.form1.product1_quality1.value).toFixed(2));
		$('#cenacach2').text((document.forms.form1.product2_price1.value / document.forms.form1.product2_quality1.value).toFixed(2));
		//$('#main_content1').append('<div>('+document.forms.form1.product1_price1.value+' * '+document.forms.form1.product1_quantity1.value+' + '+document.forms.form1.product2_price1.value+' * '+document.forms.form1.product2_quantity1.value+') / '+document.forms.form1.need_quantity1.value+'</div>')
	}
	function fillArray( id, cen, cach, summ, svob, max ) {
  		this.id = id;
   		this.cen = cen;
		this.cach = cach;
		this.summ = summ;
		this.svob = svob;
		this.max = max;
	}
	function fillArrayAr( low_id, hight_id, cen ) {
  		this.low_id = low_id;
   		this.hight_id = hight_id;
		this.cen = cen;
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
    var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window); 
    var txt = [];
    $ = win.$;
	i=0;
    $('#mainTable tr').each(function() {
        if ($(this).attr('id')[0] != 'r') { return; }

        var cels = $('td', this);
        var price = parseFloat($(cels[8]).text().replace(' ', ''));
        var qual = parseFloat($(cels[9]).text().replace(' ', ''));

        if (isNaN(price) || isNaN(qual)) { return; }

        var qp = (price / qual).toFixed(2);
		var svob = parseFloat($(cels[4]).text().replace(' ', ''));
		var max = parseFloat($('span',$(cels[3])).text().replace('Max: ', '').replace(' ', ''));
		if (isNaN(max)) max = 99999999999999999;
		i++;
        $(cels[9]).html('<span id="td_s'+i+'" style="color: #f00">'+qp+'</span> ' + qual);
		txt[i] = new fillArray( i, parseFloat($('#td_s'+i).text()), qual, price, svob, max );
    });
	total=i;
	function sort_table(type){
		for(i=0;i<=txt.length;i++){
			for(j = 1;j < txt.length - 1 - i;j++) {
				if(type=='asc'){
					if(txt[j]['cen'] > txt[j+1]['cen']){
						var tmp = txt[j];
						txt[j] = txt[j+1];
						txt[j+1] = tmp;
					}
				}
				if(type=='desc'){
					if(txt[j]['cen'] < txt[j+1]['cen']){
						var tmp = txt[j];
						txt[j] = txt[j+1];
						txt[j+1] = tmp;
					}
				}
			}
		}
		for(i=txt.length-1;i>1;i--){
			id_rod = $('#td_s'+txt[i]['id']).parent().parent().attr("id");
			id_rod1 = $('#td_s'+txt[i-1]['id']).parent().parent().attr("id");
			$('#'+id_rod).before($('#'+id_rod1));
		}
		return false;
	}
	function raschet(){
		var low = [];
		var hight = [];
		var nl=0, nh=0;
		for(i=1;i<txt.length;i++){
			if(txt[i]['cach']<document.forms.form1.need_quality1.value){
				nl++;
				low[nl] = new fillArray( txt[i]['id'], txt[i]['cen'], txt[i]['cach'], txt[i]['summ'], txt[i]['svob'], txt[i]['max'] );
			}
			if(txt[i]['cach']>document.forms.form1.need_quality1.value){
				nh++;
				hight[nh] = new fillArray( txt[i]['id'], txt[i]['cen'], txt[i]['cach'], txt[i]['summ'], txt[i]['svob'], txt[i]['max'] );
			}
		}
		if(nl==0 || nh==0){
			alert('Нет поставщиков с подходящим качеством.');
			return;
		}
		//================================================
		for(i=0;i<=low.length;i++){
			for(j = 1;j < low.length - 1 - i;j++) {
				if(low[j]['cen'] > low[j+1]['cen']){
					var tmp = low[j];
					low[j] = low[j+1];
					low[j+1] = tmp;
				}
			}
		}
		
		for(i=0;i<=hight.length;i++){
			for(j = 1;j < hight.length - 1 - i;j++) {
				if(hight[j]['cen'] > hight[j+1]['cen']){
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
				if($('#svo').attr('checked')){
					if(quantity1.toFixed(0)<low[i]['svob'] && quantity1.toFixed(0)<low[i]['max']){
						if(quantity2.toFixed(0)<hight[j]['svob'] && quantity2.toFixed(0)<hight[j]['max']){
							n++;
							var price1 = (low[i]['summ'] * quantity1 + hight[j]['summ'] * quantity2) / (document.forms.form1.need_quantity1.value - document.forms.form1.exist_quantity1.value);
							//alert(document.forms.form1.product1_quality1.value+' '+document.forms.form1.product1_price1.value+' '+document.forms.form1.product2_quality1.value+' '+document.forms.form1.product2_price1.value);
							ar[n] = new fillArrayAr( i, j, price1 );
						}
					}
				}else{
					n++;
					var price1 = (low[i]['summ'] * quantity1 + hight[j]['summ'] * quantity2) / (document.forms.form1.need_quantity1.value - document.forms.form1.exist_quantity1.value);
					//alert(document.forms.form1.product1_quality1.value+' '+document.forms.form1.product1_price1.value+' '+document.forms.form1.product2_quality1.value+' '+document.forms.form1.product2_price1.value);
					ar[n] = new fillArrayAr( i, j, price1 );
				}
				if(n>5000) j=hight.length;
			}
			if(n>5000) i=low.length;
		}
		for(i=0;i<=ar.length;i++){
			for(j = 1;j < ar.length - 1 - i;j++) {
				if(ar[j]['cen'] > ar[j+1]['cen']){
					var tmp = ar[j];
					ar[j] = ar[j+1];
					ar[j+1] = tmp;
				}
			}
		}
		var but_show_variant = $('<input type="button" value="Паказать" />').click(function() {
			var id = $('#my_select').val();
 			var low_id = low[ar[id]['low_id']]['id'];
			var hight_id = hight[ar[id]['hight_id']]['id'];
			for(i=1;i<txt.length;i++){
				id_rod = $('#td_s'+txt[i]['id']).parent().parent().attr("id");
				if(txt[i]['id']!=low_id && txt[i]['id']!=hight_id){
					$('#'+id_rod).hide();
				}else{
					if(txt[i]['id']==low_id){
						document.forms.form1.product1_quality1.value = txt[i]['cach'];
						document.forms.form1.product1_price1.value = txt[i]['summ'];
					}
					if(txt[i]['id']==hight_id){
						document.forms.form1.product2_quality1.value = txt[i]['cach'];
						document.forms.form1.product2_price1.value = txt[i]['summ'];
					}
					$('#'+id_rod).show();
				}
			}
			Calculate1();
		});
		var but_show_all = $('<input type="button" value="Паказать все" />').click(function() {
			for(i=1;i<txt.length;i++){
				id_rod = $('#td_s'+txt[i]['id']).parent().parent().attr("id");
				$('#'+id_rod).show();
			}
		});
		$('#form_s').remove();
		$('#main_content1').append('<div id="form_s">Варианты себестоимости: <select id="my_select" name="my_select"></select></div>');
		$('#form_s').append(but_show_variant).append(but_show_all);
		for(i=1;i<ar.length;i++){
			var low_id = low[ar[i]['low_id']]['id'];
			var hight_id = hight[ar[i]['hight_id']]['id'];
			id_rod = $('#td_s'+low_id).parent().parent().attr("id");
			id_rod1 = $('#td_s'+hight_id).parent().parent().attr("id");
			var summa = parseFloat(ar[i]['cen']);
			$('#my_select').append('<option value="'+i+'">'+summa.toFixed(4)+'</option>');
		}
	}
	
	$('#headerWithSeparator').after('<div id="main_content1" style="display:none; position:fixed; width:500px; background-color:#fff; border:solid 1px #000; z-index:100; margin-top:-25px;"></div>');
	
	var but_show = $('<input type="button" value="Форма смеси" style="z-index:99; position:fixed; margin-top:-25px;" />').click(function() { $('#main_content1').show(); });
	$('#headerWithSeparator').after(but_show);
	
	var but_ras = $('<input type="button" value="Расчет" />').click(function() { Calculate1(); });
	var but_hide = $('<input type="button" value="Закрыть" />').click(function() { $('#main_content1').hide();});
	var but_ras1 = $('<input type="button" value="Глобальнай расчет" />').click(function() { raschet(); });
	
	$('#main_content1').append('<form id="form1" name="form1" method="post"><table align="center" width="20%" border="0" class="grid"><tr class="odd" ></tr><tr class="odd" ><th >В наличии</th><th  >Необходимо</th><th  colspan=2 scope="col">Продукты</th></tr><tr align="center" class="even"><td></td><td></td><td>Продукт 1</td><td>Продукт 2</td></tr><tr align="right" class="odd"><td>Кол-во <input type=text name="exist_quantity1" maxlength=11 value="0" size=10 tabindex=1></td><td>Кол-во <input type=text name="need_quantity1" maxlength=11 value="0" size=10 tabindex=3></td><td>Кол-во <input style="background-color:#ddd;" readonly type=text name="product1_quantity1" maxlength=11 value="0" size=10></td><td>Кол-во <input style="background-color:#ddd;" readonly type=text name="product2_quantity1" maxlength=11 value="0" size=10></td></tr><tr align="right" class="even"><td>Качество <input type=text name="exist_quality1" maxlength=11 value="0" size=10 tabindex=2></td><td>Качество <input type=text name="need_quality1" maxlength=11 value="0" size=10 tabindex=4></td><td>Качество <input type=text name="product1_quality1" maxlength=11 value="0" size=10 tabindex=5></td><td>Качество <input type=text name="product2_quality1" maxlength=11 value="0" size=10 tabindex=7></td></tr><tr align="right" class="odd"><td></td><td ><div id="cenacach" style="color:#f00;"></div> Цена $<input style="background-color:#ddd;" readonly type=text name="need_price1" maxlength=11 value="0" size=10></td><td><div id="cenacach1" style="color:#f00;"></div> Цена $<input type=text name="product1_price1" maxlength=11 value="0" size=10 tabindex=6></td><td><div id="cenacach2" style="color:#f00;"></div> Цена $<input type=text name="product2_price1" maxlength=11 value="0" size=10 tabindex=8></td></tr></table></form>').append(but_ras).append(but_ras1).append(but_hide).append('<input type="checkbox" id="svo" />Считать с кол-вом остатков');
	
	var sort_but_asc = $('<img src="/img/asc.gif" alt="^" width="9" height="6" border="0" style="cursor:pointer" />').click(function() {
		sort_table('asc');
	});
	
	var sort_but_desc = $('<img src="/img/desc.gif" alt="v" width="9" height="6" border="0" style="cursor:pointer" />').click(function() {
		sort_table('desc');
	});

	$('#mainTable').prepend('<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td id="s1" style="background-color:#c20000; color:#fff;"></td><td></td><td></td></tr>');
	$('#s1').append('ед. кач. ').append(sort_but_asc).append(sort_but_desc);
}

// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);