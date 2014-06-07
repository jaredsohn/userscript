// ==UserScript==
// @name		Simunomics Product Ranks Handling
// @description	Management of the Product-Ranks page
// @namespace	tag:seronis@gmail.com,2014-1-1:simunomics
// @version		0.2
// @match      http://simunomics.com/Ranks-Product.php?Product=*
// @match      http://www.simunomics.com/Ranks-Product.php?Product=*
// @require		http://code.jquery.com/jquery-latest.js
// @copyright	2014+, Seronis
// ==/UserScript==


var sections = document.querySelectorAll('div.SimpleHeader');

var message = "";
$(sections).each(function() {
    if( $(this).text() == "Retail Information" ) {
        $(this).css("background","#F44");
        
        var prodID = getQueryVariable('Product');
        var cityInfo = $('#ZoneChoice > option[selected=selected]').text();
        var leader = $(this).next().next().next().next().find('tr.d1:first').find('td:nth-child(3)');
        $(leader).css("color","#F44");
        
        var d_now = new Date();
        d_now.setUTCMinutes( d_now.getUTCMinutes() + 30 ); //NOTE: this line might need to be made 'dst' aware (depending on server behavior)
        
        var str_key1    = cityInfo + "_" + prodID;
        var leader_name = $(leader).text();
        
        var str_key2     = str_key1 + "_time";
        var date_checked = d_now.toDateString();
        
        document.title = "Product: " + str_key1 + " Lead by: " + leader_name + ", " + date_checked;
        
        GM_setValue(str_key1, leader_name);
        GM_setValue(str_key2, date_checked);
    }
    
    if( $(this).text() == "Production Information" ) {
        $(this).css("background","#4F4");
    }
});


function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}


