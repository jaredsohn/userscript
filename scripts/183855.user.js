// ==UserScript==
// @name        Skelbiu.lt
// @namespace   /main-page
// @include     http://www.skelbiu.lt/*

// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require     http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min.js
// @require     http://cdnjs.cloudflare.com/ajax/libs/datatables/1.9.4/jquery.dataTables.min.js
// @require     http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.2/raphael-min.js
// @require     http://cdnjs.cloudflare.com/ajax/libs/morris.js/0.4.3/morris.min.js




// @version     1.13 
// ==/UserScript==

console.log('Init')
 
 (function (w, $, underScore, Raphael) {  
    // Now jQuery is set to '$', window is 'w', and underScore is 'underScore'  
    var LOG = function (msg) {  
        if ( w.console ) {  
            w.console.log(msg);  
        } else if ( typeof GM_log === "function" ) {  
            GM_log(msg);  
        } else if ( typeof console === "function" ) {  
            console(msg);  
        } else {  
            throw new Error(msg);  
        }  
    };  
    try {          
        console.log(Raphael());
         App(); 
        
    } catch (error) {  
        LOG(error);  
    }  
}((unsafeWindow||window), jQuery, (this._||_||unsafeWindow._), (this._||Raphael)));

 
   
function App(){

    var h1 = $('<h1/>').html('Skelbimu statistika')
    h1.insertBefore('#container')
    h1.insertBefore('#categoriesPathDiv')
    
  
    var elements = $('.categlist li, .categoriesList')
    var html='';
    var katKiekis = {};
    var skyrKiekis=[];
    var skyriai = [];
    var skyriai_2 = [];
    $.each(elements, function(i,eld) {
        el = $(eld)
        
        var kiekis = 
             el.find('.adnumber').text()
            .replace("(","")
            .replace(")","")
            .trim()+
            el.clone()
            .children()
            .remove()
            .end()
            .text()
            .replace("(","")
            .replace(")","")
            .trim();
        var kategorija = ($('.categoryListh1').length )?$('.categoryListh1'):el.closest('.categBlock').find('h2')    
        var skyrius  = $('<div>').append(el.find('a').clone()).html();
        
        
        
        html = html + '<tr><td>'  +            
             kategorija.text().trim() +
             '</td><td class="kiekis kiekis-'+kategorija.attr('id')+'">'+
             kategorija.attr('id')+
             '</td><td>'+
              skyrius+
            '</td><td>'+ kiekis +
        '</td></tr>'
        
        
        katKiekis[ kategorija.attr('id') ] = katKiekis[ kategorija.attr('id') ]||0 + kiekis*1;
        
        skyrKiekis[ i ] = {pav: i + ' '+ el.find('a').text(), kiekis:kiekis*1};
        skyriai_2.push( skyrius )
    })
 
    var chart = $('<div/>');
    chart.attr('id', 'skChart');
    chart.css({height:250, width:450, float:'left',margin:'0 0 50px 0' });
    chart.insertBefore('#container')
    chart.insertBefore('#categoriesPathDiv')
  
 
    
    Morris.Area({
        element: 'skChart',
        data: skyrKiekis,
        xkey: 'pav',
        ykeys: ['kiekis' ],
        labels: ['kiekis' ],
        pointSize: 2,
        hideHover: 'auto',
        ymax:25000
    });
 
  
    var lineJSON = []
    var i = 0;
    for(var k in katKiekis)
    {
        lineJSON.push ({kategorija: k,  val:katKiekis[k]*1} )
        i++ 
    }
    var chart2 = $('<div/>');
    chart2.attr('id', 'skChart2');
    chart2.css({height:250, width:450, float:'left' ,margin:'0 0 50px 0'});
    chart2.insertBefore('#container')
    chart2.insertBefore('#categoriesPathDiv')
    
    Morris.Bar({
    element: 'skChart2',
    data: lineJSON,
    xkey: 'kategorija',
    ykeys: ['val'],
    labels: ['Geekbench'],
    barRatio: 0.4,
    xLabelAngle: 35,
    hideHover: 'auto'
  });
  
   

 $('#infobar').remove();


    var table = $('<table/>').css({clear:'both',float:'left',padding:'10px',margin:'70px 0 50px 0',background:'#F7F6F5',border:'2px solid grey', width:'720px', textAlign:'left', fontSize:'14px'});
    table.insertBefore('#container')
    table.insertAfter('#categoriesPathDiv')
        
    var thead = '<thead><tr><th>KATEGORIJA</th><th>KIEKIS KATEGORIJOJE</th><th>SKYRIUS</th> <th>KIEKIS SKYRIUJ</th> </tr></thead>'
    table.html( thead + '<tbody>' + html +'</tbody>' );
    
    var keys = [];
    if(!$('#adsFoundArea').length )
    {    
        for(var k in katKiekis)
        {
            $('.kiekis-'+k).text(katKiekis[k]) 
        }
    }
    else
    {
         $('.kiekis').text($('#adsFoundArea').text().trim().replace('Rasta:','').trim().replace(' ','') ) 
    }

    
     
    table.find('th').css({borderBottom:'2px solid #dddddd',background:'f1f1f1',cursor:'pointer'})
    table.dataTable(
    {
        bPaginate:false, sDom:'t',
        "aaSorting": [[ 3, "desc" ]]
    }
    );

}

