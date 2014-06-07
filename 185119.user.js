// ==UserScript==
// @name            [Btc-e.com] Trade history
// @namespace       http://btc-e.com/ Btc-e summary of Trade history [btc-e]
// @include         https://btc-e.com/profile
// @author			Panzer
// @version			0.9.4
// @homepage		http://userscripts.org/scripts/show/185119
// @copyright		2013+, Panzer (If you found it useful, donate a little bit BTC: 1NP3jM4rKhibCWC88osAWpAFhXY7m7W8wS , LTC: Lfux4w6LC1coTsuahfG7cpe925jfsPEejW or pm BTC-E Code on btc-e.com)
// ==/UserScript==
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

function main(){    
    $(document).ready(function(){  
        function exportTableToCSV($table, filename) {
            var $rows = $table.find('tr:has(td)'),
                $headers = $table.find('tr:has(th)'),
                // Temporary delimiter characters unlikely to be typed by keyboard
                // This is to avoid accidentally splitting the actual contents
                tmpColDelim = String.fromCharCode(11), // vertical tab character
                tmpRowDelim = String.fromCharCode(0), // null character
                // actual delimiter characters for CSV format
                colDelim = '","',
                rowDelim = '"\r\n"',
                // Grab text from table into CSV formatted string
                header_data='"' + 
                $headers.map(function (i, row) {
                    var $row = $(row),
                        $cols = $row.find('th');
                    return $cols.map(function (j, col) {
                        var $col = $(col),
                            text = $col.text();
                        return text.replace('"', '""'); // escape double quotes
                    }).get().join(tmpColDelim);
                }).get().join(tmpRowDelim).split(tmpRowDelim).join(rowDelim).split(tmpColDelim).join(colDelim)+'"',
                rows_data = '"'+                
                $rows.map(function (i, row) {
                    var $row = $(row),
                        $cols = $row.find('td');
                    return $cols.map(function (j, col) {
                        var $col = $(col),
                            text = $col.text();
                        return text.replace('"', '""'); // escape double quotes
                    }).get().join(tmpColDelim);
                }).get().join(tmpRowDelim).split(tmpRowDelim).join(rowDelim).split(tmpColDelim).join(colDelim) + '"',
                csv = header_data+"\r\n"+rows_data,
                csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);
            $(this)
                .attr({
                'download': filename,
                    'href': csvData,
                    'target': '_blank'
            });
        }
        $(".export").on('click', function (event) {
            exportTableToCSV.apply(this, [$('#orders-self-sum>table'), 'export.csv']);
        });
        $(".export_trans").on('click', function (event) {
            exportTableToCSV.apply(this, [$('#trade_list_con > table'), 'export_trans.csv']);
        });
        
        function addACol() {
            var currentNumberOfTDsInARow = $('#trade_list_con > table tr:first td').length,
            newColNum = currentNumberOfTDsInARow,
            rows = $('#trade_list_con > table tbody tr');
            for (var i = 0; i < rows.length; i++) {
                var lastTD = $(rows[i]).find('td:last').before("<td>0.00</td>");
                $(rows[i]).find('td:last').after(lastTD);
            }
        }
        var div = "<a href=\"#\" class=\"export\">Export into Excel</a><div id=\"orders-self-sum\"><table id=\"table-orders-self-sum\" class=\"table\"  style=\"width:100%;\"><tbody><tr><th style=\"width:30px\"></th>"+
            "<th>BTC</th><th>/USD</th><th>LTC</th><th>/USD</th><th>LTC</th><th>/RUR</th><th>BTC</th><th>/RUR</th><th>USD</th><th>/RUR</th><th>NMC</th><th>/USD</th><th>PPC</th><th>/USD</th></tr>"+
            "<tr id=\"tr_buy\" class=\"order\"><td><b style=\"color:green;font-size:xx-small\">Buy</b></td>"+
            "<td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td></tr>"+
            "<tr id=\"tr_sell\" class=\"order\"><td><b style=\"color:red;font-size:xx-small\">Sell</b></td>"+
            "<td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td></tr>"+
            "<tr id=\"tr_sum\" class=\"order\"><td><b style=\"color:blue;font-size:xx-small\">Sum</b></td>"+
            "<td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td></tr>"+
            "</tbody></div>",
            pagination = $('.pagenav'),
            table = $('#trade_list_con > table > tbody'),
			btc_usd_sell = 0,ltc_usd_sell = 0, ltc_rur_sell = 0,btc_rur_sell = 0,usd_rur_sell = 0,nmc_usd_sell = 0,ppc_usd_sell = 0,btc_usd_buy = 0,ltc_usd_buy = 0, ltc_rur_buy = 0,btc_rur_buy = 0,usd_rur_buy = 0,nmc_usd_buy = 0,ppc_usd_buy = 0,btc_usd_vol_sell = 0,ltc_usd_vol_sell = 0, ltc_rur_vol_sell = 0,btc_rur_vol_sell = 0,usd_rur_vol_sell = 0,nmc_usd_vol_sell = 0,ppc_usd_vol_sell = 0,btc_usd_vol_buy = 0,ltc_usd_vol_buy = 0, ltc_rur_vol_buy = 0,btc_rur_vol_buy = 0,usd_rur_vol_buy = 0,nmc_usd_vol_buy = 0,ppc_usd_vol_buy = 0;
        if($("#orders-self-sum").length == 0){ 
            $('#trade_list_con').parent().children('h3').after(div);
            $("#orders-self-sum > table").after("<a href=\"#\" class=\"export_trans\">Export into Excel</a>");
        }
        if ($('th#coms').length == 0){
            $("#trade_list_con > table tr:first th:last").before("<th id=coms>Coms</th>");
            addACol();
        }
        table.find('tr').each(function (i, el) {
            var $tds = $(this).find('td'),
                coms = 0,
                pair = $tds.eq(0).text(),
                direction = $tds.eq(1).text();
				if ($('th#coms').length == 1){
                    if (direction == 'sell'){
                        coms = parseFloat($tds.eq(4).text())*0.002;}
                    else{
                        coms = parseFloat($tds.eq(2).text())*0.002;}
                    $tds.eq(5).text(coms.toFixed(5));
                }
                switch (pair) {
                    case 'BTC/USD':
                        if (direction == 'sell'){     
                            btc_usd_vol_sell+=parseFloat($tds.eq(2).text());
                            btc_usd_sell+=parseFloat($tds.eq(4).text());
                        }else{
                            btc_usd_vol_buy+=parseFloat($tds.eq(2).text());
                            btc_usd_buy+=parseFloat($tds.eq(4).text());
                        }
                        break;
                    case 'LTC/USD':
                        if (direction == 'sell'){
                            ltc_usd_vol_sell+=parseFloat($tds.eq(2).text());
                            ltc_usd_sell+=parseFloat($tds.eq(4).text());
                        }else{
                            ltc_usd_vol_buy+=parseFloat($tds.eq(2).text());
                            ltc_usd_buy+=parseFloat($tds.eq(4).text());
                        }
                        break;
                    case 'LTC/RUR':
                        if (direction == 'sell'){
                            ltc_rur_vol_sell+=parseFloat($tds.eq(2).text());
                            ltc_rur_sell+=parseFloat($tds.eq(4).text());
                        }else{
                            ltc_rur_vol_buy+=parseFloat($tds.eq(2).text());
                            ltc_rur_buy+=parseFloat($tds.eq(4).text());
                        }
                        break;
                    case 'BTC/RUR':
                        if (direction == 'sell'){
                            btc_rur_vol_sell+=parseFloat($tds.eq(2).text());
                            btc_rur_sell+=parseFloat($tds.eq(4).text());
                        }else{
                            btc_rur_vol_buy+=parseFloat($tds.eq(2).text());
                            btc_rur_buy+=parseFloat($tds.eq(4).text());
                        }
                        break;
                     case 'USD/RUR':
                        if (direction == 'sell'){
                            usd_rur_vol_sell+=parseFloat($tds.eq(2).text());
                            usd_rur_sell+=parseFloat($tds.eq(4).text());
                        }else{
                            usd_rur_vol_buy+=parseFloat($tds.eq(2).text());
                            usd_rur_buy+=parseFloat($tds.eq(4).text());
                        }
                        break;
                     case 'NMC/USD':
                        if (direction == 'sell'){
                            nmc_usd_vol_sell+=parseFloat($tds.eq(2).text());
                            nmc_usd_sell+=parseFloat($tds.eq(4).text());
                        }else{
                            nmc_usd_vol_buy+=parseFloat($tds.eq(2).text());
                            nmc_usd_buy+=parseFloat($tds.eq(4).text());
                        }
                        break;
                     case 'PPC/USD':
                        if (direction == 'sell'){
                            ppc_usd_vol_sell+=parseFloat($tds.eq(2).text());
                            ppc_usd_sell+=parseFloat($tds.eq(4).text());
                        }else{
                            ppc_usd_vol_buy+=parseFloat($tds.eq(2).text());
                            ppc_usd_buy+=parseFloat($tds.eq(4).text());
                        }
                        break;
                }
        });  
        pagination.find('b').each(function(index, item){
                var ii = 1, td = $('#table-orders-self-sum > tbody:last tr#tr_sum');                                                            
            if (!isNaN(item.innerText)){
                ii = item.innerText;
                var sss = '<tr id=\"tr_'+ii+'\" class=\"order\"><td >'+ii+'</td>'+
                    '<td id=\"btc_usd_vol\">'+(btc_usd_vol_sell-(btc_usd_vol_buy*0.998)).toFixed(2)+'</td>'+
                    '<td id=\"btc_usd\">'+(btc_usd_sell*0.998-btc_usd_buy).toFixed(2)+'</td>'+
                    '<td id=\"ltc_usd_vol\">'+(ltc_usd_vol_sell-ltc_usd_vol_buy*0.998).toFixed(2)+'</td>'+
                    '<td id=\"ltc_usd\">'+(ltc_usd_sell*0.998-ltc_usd_buy).toFixed(2)+'</td>'+
                    '<td id=\"ltc_rur_vol\">'+(ltc_rur_vol_sell-ltc_rur_vol_buy*0.998).toFixed(2)+'</td>'+
                    '<td id=\"ltc_rur\">'+(ltc_rur_sell*0.998-ltc_rur_buy).toFixed(2)+'</td>'+
                    '<td id=\"btc_rur_vol\">'+(btc_rur_vol_sell-btc_rur_vol_buy*0.998).toFixed(2)+'</td>'+
                    '<td id=\"btc_rur\">'+(btc_rur_sell*0.998-btc_rur_buy).toFixed(2)+'</td>'+
                    '<td id=\"usd_rur_vol\">'+(usd_rur_vol_sell-usd_rur_vol_buy*0.995).toFixed(2)+'</td>'+
                    '<td id=\"usd_rur\">'+(usd_rur_sell*0.995-usd_rur_buy).toFixed(2)+'</td>'+
                    '<td id=\"nmc_usd_vol\">'+(nmc_usd_vol_sell-nmc_usd_vol_buy*0.998).toFixed(2)+'</td>'+
                    '<td id=\"nmc_usd\">'+(nmc_usd_sell*0.998-nmc_usd_buy).toFixed(2)+'</td>'+
                    '<td id=\"ppc_usd_vol\">'+(ppc_usd_vol_sell-ppc_usd_vol_buy*0.998).toFixed(2)+'</td>'+
                    '<td id=\"ppc_usd\">'+(ppc_usd_sell*0.998-ppc_usd_buy).toFixed(2)+'</td>'+
                    '</tr>',
                    td1 = $('#table-orders-self-sum > tbody:last > tr#tr_'+ii);
                if (td1.length == 0){                        
                    if(td.length==0)
                    {
                        $('#table-orders-self-sum > tbody:last').append(sss);
                    }else{
                        $('#table-orders-self-sum tr:last').prev().prev().before(sss);                            
                    }
                
                var $tdbuy = $('#table-orders-self-sum > tbody:last tr#tr_buy').find('td'),
                    $tdsell= $('#table-orders-self-sum > tbody:last tr#tr_sell').find('td'),
                    $tdsum = $('#table-orders-self-sum > tbody:last tr#tr_sum').find('td');
                $tdsell.eq(1).text((btc_usd_vol_sell+parseFloat($tdsell.eq(1).text())).toFixed(2));
                $tdsell.eq(2).text((btc_usd_sell*0.998+parseFloat($tdsell.eq(2).text())).toFixed(2));
                $tdsell.eq(3).text((ltc_usd_vol_sell+parseFloat($tdsell.eq(3).text())).toFixed(2));
                $tdsell.eq(4).text((ltc_usd_sell*0.998+parseFloat($tdsell.eq(4).text())).toFixed(2));
                $tdsell.eq(5).text((ltc_rur_vol_sell+parseFloat($tdsell.eq(5).text())).toFixed(2));
                $tdsell.eq(6).text((ltc_rur_sell*0.998+parseFloat($tdsell.eq(6).text())).toFixed(2));
                $tdsell.eq(7).text((btc_rur_vol_sell+parseFloat($tdsell.eq(7).text())).toFixed(2));
                $tdsell.eq(8).text((btc_rur_sell*0.995+parseFloat($tdsell.eq(8).text())).toFixed(2));
                $tdsell.eq(9).text((usd_rur_vol_sell+parseFloat($tdsell.eq(9).text())).toFixed(2));
                $tdsell.eq(10).text((usd_rur_sell*0.998+parseFloat($tdsell.eq(10).text())).toFixed(2));
                $tdsell.eq(11).text((nmc_usd_vol_sell+parseFloat($tdsell.eq(11).text())).toFixed(2));
                $tdsell.eq(12).text((nmc_usd_sell*0.998+parseFloat($tdsell.eq(12).text())).toFixed(2));
                $tdsell.eq(13).text((ppc_usd_vol_sell+parseFloat($tdsell.eq(13).text())).toFixed(2));
                $tdsell.eq(14).text((ppc_usd_sell*0.998+parseFloat($tdsell.eq(14).text())).toFixed(2));
                
                $tdbuy.eq(1).text((btc_usd_vol_buy*0.998+parseFloat($tdbuy.eq(1).text())).toFixed(2));
                $tdbuy.eq(2).text((btc_usd_buy+parseFloat($tdbuy.eq(2).text())).toFixed(2));
                $tdbuy.eq(3).text((ltc_usd_vol_buy*0.998+parseFloat($tdbuy.eq(3).text())).toFixed(2));
                $tdbuy.eq(4).text((ltc_usd_buy+parseFloat($tdbuy.eq(4).text())).toFixed(2));
                $tdbuy.eq(5).text((ltc_rur_vol_buy*0.998+parseFloat($tdbuy.eq(5).text())).toFixed(2));
                $tdbuy.eq(6).text((ltc_rur_buy+parseFloat($tdbuy.eq(6).text())).toFixed(2));
                $tdbuy.eq(7).text((btc_rur_vol_buy*0.998+parseFloat($tdbuy.eq(7).text())).toFixed(2));
                $tdbuy.eq(8).text((btc_rur_buy+parseFloat($tdbuy.eq(8).text())).toFixed(2));
                $tdbuy.eq(9).text((usd_rur_vol_buy*0.995+parseFloat($tdbuy.eq(9).text())).toFixed(2));
                $tdbuy.eq(10).text((usd_rur_buy+parseFloat($tdbuy.eq(10).text())).toFixed(2));
                $tdbuy.eq(11).text((nmc_usd_vol_buy*0.998+parseFloat($tdbuy.eq(11).text())).toFixed(2));
                $tdbuy.eq(12).text((nmc_usd_buy+parseFloat($tdbuy.eq(12).text())).toFixed(2));
                $tdbuy.eq(13).text((ppc_usd_vol_buy*0.998+parseFloat($tdbuy.eq(13).text())).toFixed(2));
                $tdbuy.eq(14).text((ppc_usd_buy+parseFloat($tdbuy.eq(14).text())).toFixed(2));
                $tdsum.eq(1).text((parseFloat($tdsell.eq(1).text())-parseFloat($tdbuy.eq(1).text())).toFixed(2));
                $tdsum.eq(2).text((parseFloat($tdsell.eq(2).text())-parseFloat($tdbuy.eq(2).text())).toFixed(2));
                $tdsum.eq(3).text((parseFloat($tdsell.eq(3).text())-parseFloat($tdbuy.eq(3).text())).toFixed(2)); 
                $tdsum.eq(4).text((parseFloat($tdsell.eq(4).text())-parseFloat($tdbuy.eq(4).text())).toFixed(2)); 
                $tdsum.eq(5).text((parseFloat($tdsell.eq(5).text())-parseFloat($tdbuy.eq(5).text())).toFixed(2));
                $tdsum.eq(6).text((parseFloat($tdsell.eq(6).text())-parseFloat($tdbuy.eq(6).text())).toFixed(2));
                $tdsum.eq(7).text((parseFloat($tdsell.eq(7).text())-parseFloat($tdbuy.eq(7).text())).toFixed(2));
                $tdsum.eq(8).text((parseFloat($tdsell.eq(8).text())-parseFloat($tdbuy.eq(8).text())).toFixed(2));
                $tdsum.eq(9).text((parseFloat($tdsell.eq(9).text())-parseFloat($tdbuy.eq(9).text())).toFixed(2));
                $tdsum.eq(10).text((parseFloat($tdsell.eq(10).text())-parseFloat($tdbuy.eq(10).text())).toFixed(2));
                $tdsum.eq(11).text((parseFloat($tdsell.eq(11).text())-parseFloat($tdbuy.eq(11).text())).toFixed(2));
                $tdsum.eq(12).text((parseFloat($tdsell.eq(12).text())-parseFloat($tdbuy.eq(12).text())).toFixed(2));
                $tdsum.eq(13).text((parseFloat($tdsell.eq(13).text())-parseFloat($tdbuy.eq(13).text())).toFixed(2));
                $tdsum.eq(14).text((parseFloat($tdsell.eq(14).text())-parseFloat($tdbuy.eq(14).text())).toFixed(2));
                }    
                }
            });
		setTimeout(main, 3 * 1000);	
    });
}
addJQuery(main);