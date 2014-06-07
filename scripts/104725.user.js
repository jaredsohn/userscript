// ==UserScript==
// @name           Virtonomica: расчет цены за ед. кач. + сортировка
// @namespace      virtonomica
// @description    Цена за единицу качества + сортировка
// @include        http://virtonomic*.*/*/window/unit/supply/create/*/step2
// ==/UserScript==

var run = function() {
	function fillArray( id, cen ) {
  		this.id = id;
   		this.cen = cen;
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
	i++;
        $(cels[9]).html('<span id="td_s'+i+'" style="color: #f00">'+qp+'</span> ' + qual);
		txt[i] = new fillArray( i, parseFloat($('#td_s'+i).text()) );
    });
	total=i;
	function sort_table(type){
		for(i=0;i<=total;i++){
			for(j = 1;j < total - i;j++) {
				if(type=='asc'){
					if(txt[j]['cen'] > txt[j+1]['cen']){
						var tmp = txt[j]['cen'];
						txt[j]['cen'] = txt[j+1]['cen'];
						txt[j+1]['cen'] = tmp;
						tmp = txt[j]['id'];
						txt[j]['id'] = txt[j+1]['id'];
						txt[j+1]['id'] = tmp;
					}
				}
				if(type=='desc'){
					if(txt[j]['cen'] < txt[j+1]['cen']){
						var tmp = txt[j]['cen'];
						txt[j]['cen'] = txt[j+1]['cen'];
						txt[j+1]['cen'] = tmp;
						tmp = txt[j]['id'];
						txt[j]['id'] = txt[j+1]['id'];
						txt[j+1]['id'] = tmp;
					}
				}
			}
		}
		for(i=total;i>1;i--){
			id_rod = $('#td_s'+txt[i]['id']).parent().parent().attr("id");
			id_rod1 = $('#td_s'+txt[i-1]['id']).parent().parent().attr("id");
			$('#'+id_rod).before($('#'+id_rod1));
		}
		return false;
	}
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