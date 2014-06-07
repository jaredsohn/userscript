// ==UserScript==
// @name		Product Stat Export
// @description	Export the table data from product stats page
// @namespace	tag:seronis@gmail.com,2014-1-1:simunomics
// @version		1.4
// @match		http://simunomics.com/Ranks-FullProducts.php
// @match		http://www.simunomics.com/Ranks-FullProducts.php
// @require		http://code.jquery.com/jquery-latest.js
// @copyright	2014+, Seronis
// ==/UserScript==

var cityInfo = $('#ZoneChoice > option[selected=selected]').text();
document.title = cityInfo;

var prodInfo = $('#MainDisplay > table');
$(prodInfo).css('color','#800').css('margin-top','20px').css('margin-bottom','20px');

$(prodInfo).find('a').each( function() {
    var fixed = $('<td></td>').append($(this).text()).insertBefore($(this).parent());
    $(this).parent().remove();
});


$(prodInfo).on('click','tr:nth-child(n+3)', function(){
    $(this).remove();
    fix_bg(prodInfo);
    table2csv(prodInfo);
    return false;
});
$(prodInfo).on('click','tr:nth-child(2) > td', function() {
    var npos = $(this).index() + 1;
    $(prodInfo).find('td:nth-child(' + npos + ')').remove();
    table2csv(prodInfo);
    return false;
});

function fix_bg(ptable) {
    var pOdds = $(ptable).find('tr:nth-child(n+3):nth-child(2n+1)');
    var pEven = $(ptable).find('tr:nth-child(n+3):nth-child(2n+0)');
    
    $(pOdds).addClass('d1');
    $(pEven).addClass('d0');
    $(pOdds).removeClass('d0');
    $(pEven).removeClass('d1');
}

table2csv(prodInfo);

function table2csv(ptable) {
    var strCSV = "";
    var nrows = $(ptable).find('tr').length;
//  var prows = $(ptable).find('tr:nth-child(n+2)');
    
    for(nrow = 2; nrow <= nrows; nrow++) {
        var row = $(ptable).find('tr:nth-child(' + nrow + ')');
        var cols = $(row).find('td');
        var strRow = "";
        
        for( ncol = 1; ncol <= cols.length; ncol++ )
        {
            var strTemp = $(row).find('td:nth-child('+ncol+')').text();
            strRow += strTemp.replace(/,/g,'').replace('β ','') + ',';
        }
        strCSV += strRow + '\n';
    }
    
    if($('.csv-data').length) $('.csv-data').remove();
    $(prodInfo).parent().append('<div class="csv-data"><textarea class="form" name="csv">' + strCSV + '</textarea></div>');
    $('.csv-data').on('click',function(){download_csv(strCSV)});
    $('.csv-data').attr('align','center');
    $('.csv-data textarea').width($(prodInfo).width());
    $('.csv-data textarea').height($(prodInfo).height()/2);
}

function download_csv(data) {
    var pom = document.createElement('a');
    var d = new Date();
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    pom.setAttribute('download', cityInfo + '-' + d.getFullYear() + ('0'+(d.getUTCMonth()+1)).slice(-2) + ('0'+d.getUTCDate()).slice(-2) + '.csv');
    pom.click();
}



