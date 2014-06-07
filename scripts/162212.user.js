// ==UserScript==
// @name       [btc-e.com] Dynamic price chart
// @namespace  http://btc-e.com/
// @version    0.6.3
// @description  enter something useful
// @match      https://btc-e.com/*
// @copyright  2013+, Xum (donate if you found it useful 1Fm4mHV77gpZLZ4AH46PpVjZQSLwz6ghH4)
// ==/UserScript==


function dyncharts_update() {
    pair = $("li.pairs-selected").text().toLowerCase().replace('/','_').replace(/[^a-z_]/g, '');
    $.ajax({
        dataType: "json",
        url: '/api/2/'+pair+'/trades?'+Math.random(),
        success: function(data) {
            dyncharts_drawchart(data);
        },
        error: null,
        beforeSend: null
    });
    setTimeout(dyncharts_update, 5 * 1000);
}

function dyncharts_drawchart(data) {
    var buy_volume  = 0;
    var sell_volume = 0;
    for (var j = 0; j < data.length; j++) {
        ( data[j].trade_type == 'ask' ) ? sell_volume += data[j].amount : buy_volume += data[j].amount; 
    }
    var chartdata = new google.visualization.DataTable();
    chartdata.addColumn('string', 'Time');
    chartdata.addColumn('number', 'Price');
    chartdata.addColumn('number', 'Buy Volume (' + buy_volume.toFixed(2) + ')');
    chartdata.addColumn('number', 'Sell Volume (' + sell_volume.toFixed(2) + ')');
    chartdata.addRows(data.length);
    
    for (var i = data.length - 1 ; i >= 0; i--) {
        var time = new Date(data[i].date*1000).toLocaleTimeString();
        
        chartdata.setValue(data.length - i - 1, 0, time );
        chartdata.setValue(data.length - i - 1, 1, data[i].price);
        
        var ask_bid = data[i].trade_type == 'ask' ? 3 : 2;
        chartdata.setValue(data.length - i - 1, ask_bid, data[i].amount);
        chartdata.setValue(data.length - i - 1, (5 - ask_bid), null);
    }
    
    var range = chartdata.getColumnRange(1);
    var rw = range.max - range.min;
    
    if (!chart) {
        var cb_css = { position:'absolute', width:'11px', height:'11px', lineHeight: '11px', 
                      marginTop:'22px',
                      textAlign:'center', verticalAlign:'middle', 
                      zIndex:'1000', right:'2px',
                      border:'1px #999 solid' };
        var close_button = $('<a href="#">×</a>').css( cb_css ).click(function(){
            $(this).next().fadeOut(1000).hide();
            $(this).hide();
        });
        
        $('#chart_div').parent().css('position', 'relative');//required for proper positioning of close buttons
        
        $('#chart_div').after( $('<div id="orderschart">') );
        chart = new google.visualization.ComboChart(document.getElementById('orderschart'));
        
        $('#chart_div').before(close_button);
        $('#orderschart').before(close_button.clone( true ));
    }
    chart.draw(chartdata, {width: '100%', height: 240, 
                           title: $('#trade_history h3').text().replace(/:$/, ''), 
                           chartArea:{
                               left: 65,
                               top: 50,
                               width: 535,
                           },
                           bar: {groupWidth: '100%'}, isStacked: true,
                           series: {0 : {type: "line" }, 
                                    1 : {type: "bars", targetAxisIndex: 1, color: "#9f9" }, 
                                    2 : {type: "bars", targetAxisIndex: 1, color: "#f99" } 
                                   },
                           vAxes: [ { viewWindowMode: 'explicit'
                                     ,viewWindow: { min: range.min - 0.1 * rw, max: range.max + 0.1 * rw }
                                     ,gridlines: { count: 7, color: '#aaf' }
                                    }
                                   ,{ gridlines: { count: 3, color: '#000'} }
                                  ]
                          }
              );    
}

var chart = null;
var google = unsafeWindow.google;
var $ = unsafeWindow.$;

google.setOnLoadCallback(dyncharts_update);
