// ==UserScript==
// @name           Konkuri - Lista de Próximos Jogos
// @namespace      konkuri
// @description    Mostra os próximos jogos, ordenados por data, na página Calendário e resultados do Konkuri. Funciona somente no Konkuri em Português, mas você pode adaptá-lo facilmente ao seu idioma alterando os valores dos meses no código. Works only in Portuguese versions of konkuri, but you can easily adapt to your language by changing the months on the code.
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// @include        http://www.konkuri.com/tournaments/*/matches
// ==/UserScript==

jQuery.fn.sortElements = (function(){
    
    var sort = [].sort;
    
    return function(comparator, getSortable) {
        
        getSortable = getSortable || function(){return this;};
        
        var placements = this.map(function(){
            
            var sortElement = getSortable.call(this),
                parentNode = sortElement.parentNode,
                
                // Since the element itself will change position, we have
                // to have some way of storing it's original position in
                // the DOM. The easiest way is to have a 'flag' node:
                nextSibling = parentNode.insertBefore(
                    document.createTextNode(''),
                    sortElement.nextSibling
                );
            
            return function() {
                
                if (parentNode === this) {
                    throw new Error(
                        "You can't sort elements if any one is a descendant of another."
                    );
                }
                
                // Insert before flag:
                parentNode.insertBefore(this, nextSibling);
                // Remove flag:
                parentNode.removeChild(nextSibling);
                
            };
            
        });
       
        return sort.call(this, comparator).each(function(i){
            placements[i].call(getSortable.call(this));
        });
        
    };
    
})();

var months = new Array();

months['jan'] = '01';
months['ene'] = '01';
months['gen'] = '01';

months['feb'] = '02';
months['fev'] = '02';

months['mar'] = '03';

months['apr'] = '04';
months['abr'] = '04';
months['avr'] = '04';

months['may'] = '05';
months['mai'] = '05';
months['mag'] = '05';

months['jun'] = '06';
months['giu'] = '06';

months['jul'] = '07';
months['lug'] = '07';
months['jui'] = '07';

months['aug'] = '08';
months['ago'] = '08';
months['aou'] = '08';

months['sep'] = '09';
months['set'] = '09';	

months['oct'] = '10';
months['out'] = '10';
months['ott'] = '10';

months['nov'] = '11';

months['dec'] = '12';
months['dez'] = '12';	
months['dic'] = '12';


$.strPad = function(i,l,s) {
	var o = i.toString();
	if (!s) { s = '0'; }
	while (o.length < l) {
		o = s + o;
	}
	return o;
};

$('.fixtures').before('<table id="jogos"><tr><th>Competidores</th><th></th><th id="data_jogo">Data</th><th>Turno</th></tr></table>');

$('tr.match_holder:has(td.date)').each(function(index) {
    	if ($(this).find('td.date').text() != ''){
		
		var ele = $(this).clone();

		$(ele).find('td.res').remove();
		var data = $(ele).find('td.date').html();

		data = data.split(',');
		var hora = data[1];

		data = data[0].split(' ');
		var dia = data[0];
		var mes = data[1];

		mes = (months[mes]) ? months[mes] : mes;

		var d = new Date();

		var ano = (d.getMonth() > 8 && parseInt(mes) < 8) ? d.getFullYear() + 1 : d.getFullYear();
		
		$(ele).find('td.date').html(ano+'-'+mes+'-'+$.strPad(dia, 2));

		$(ele).append('<td>'+$(this).parents('div.span6').find('div.table-round-header h5').text()+'</td>');

		$('#jogos').append('<tr class="jogos">'+$(ele).html()+'</tr>');
	}
});

$('#jogos td.date').sortElements(function(a, b){

	if( $.text([a]) == $.text([b]) )
		return 0;

	return $.text([a]) > $.text([b]) ? 1 : -1;

}, function(){

	// parentNode is the element we want to move
	return this.parentNode; 
});

$('#jogos td.date').each(function(index) {
	var data = $(this).text().split('-');

	var d = new Date();
	d.setUTCFullYear(data[0]);
	d.setUTCMonth(parseInt(data[1]) - 1);
	d.setUTCDate(data[2]);

	$(this).html(d.toLocaleDateString());
});