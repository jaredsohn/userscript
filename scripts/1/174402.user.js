// ==UserScript==
// @author      Alexander Eckert aka phreazer
// @homepage    http://movedesign.de
// @name        Geizhals.at Statistics
// @namespace   aionsoft.geizhals
// @description Statistics for geizhals.at overview pages
// @include     http://geizhals.de/*
// @include     http://geizhals.at/*
// @version     1.0.2
// @require     http://code.jquery.com/jquery-2.0.3.min.js
// @require     http://omnipotent.net/jquery.sparkline/2.1.2/jquery.sparkline.min.js
// ==/UserScript==

function Statistics (values) {
    var self = this;
    
    calcStatistics(values);
    
    function calcStatistics(values) {
        var sortedValues = values.sort(function (a,b){
            return a - b;
        });
    
        self.n = values.length;
        self.min = sortedValues[0];
        self.max = sortedValues[sortedValues.length - 1];
        self.range = Math.abs(self.max - self.min);
        self.mean = mean(self.n);
        self.variance = variance(self.mean);
        self.sd = sd(self.variance);
        self.q25 = quantile(0.25);
        self.median = quantile(0.5);
        self.q75 = quantile(0.75);
        self.mode = mode();
        
        function mean() {
            var n = values.length;
            for(var s = 0, l = n; l--; s += values[l]);
            return s / n;
        }
        
        function variance(mean) {
            var n = values.length;
            for(var s = 0, l = n; l--; s += Math.pow(values[l] - mean, 2));
            return s / n;
        }
        
        function sd(variance) {
            return Math.sqrt(variance);
        }
        
        function quantile(p) {
            var n = values.length;
            var quantilePos = p * n;
            
            if (isInt(quantilePos)) {
                return (values[quantilePos - 1] + values[quantilePos])/ 2;
            } else {
                return values[Math.ceil(quantilePos - 1)];
            }
            
            function isInt(value){ 
              if((parseFloat(value) == parseInt(value)) && !isNaN(value)){
                  return true;
              } else { 
                  return false;
              } 
            }
        }
        
        function mode() {
            var n = values.length;
            if(n == 0)
            	return null;
            var modeMap = {};
            var modeVal = values[0], maxCount = 1;
            for(var i = 0; i < n; i++)
            {
            	var currentVal = values[i];
            	if(modeMap[currentVal] == null)
            		modeMap[currentVal] = 1;
            	else
            		modeMap[currentVal]++;	
            	if(modeMap[currentVal] > maxCount)
            	{
            		modeVal = currentVal;
            		maxCount = modeMap[currentVal];
            	}
            }
            return modeVal;
        }
        
    }
}

function GHStats() {

    var items = [];

    $("table#content_table tr:not([id])").each(function() {
      $this = $(this)
    
      var item = {
        'product' : $this.find("a.ty").text().trim(),
        'price' : parseFloat($this.find("td:nth-child(7) span.notrans").text().trim().replace(",", "."))
      }
    
      items.push(item);
    });
    
    var prices = [];
    for (var i=0; i<items.length; i++) {
      prices.push(items[i].price);
    }
    
    var title = $("h1.gh_listtitle").text();
    var contentTable = $('div#gh_content_table_container');

    if (contentTable) {
        var stats = new Statistics(prices);
        printStatsToConsole(stats);
        printStatsToTable(stats);
        printCharts(stats);
    }

    function printCharts(stats) {
    
        function printHistogram() {
            function classWidthScott() {
                return (3.49 * stats.sd) /  Math.pow(stats.n, 1.0/3.0);
            }
        
            var sortedValues = prices.sort(function (a,b){
                return a - b;
            });
            
            var classWidth = classWidthScott();
            
            var classesCount = Math.ceil(stats.max / classWidth);
            
            
            var offset = new Object();
            var offsetUpperBound = 0;
            var histogramValues = [];
            for (var c=0; c < classesCount; c++) {
                histogramValues[c] = 0;
                offset[c] =  offsetUpperBound.toFixed(3) + " - " + (classWidth + offsetUpperBound).toFixed(3) + ":";
                offsetUpperBound += classWidth;
            }
            
            for (var i=0, s=0; i < sortedValues.length; i++) {
                histogramValues[Math.ceil(sortedValues[i] / classWidth) - 1]++;
            }
                
            $("#histogram").sparkline(histogramValues, {
                type: 'bar',
                tooltipFormat: '{{offset:offset}} {{value}}',
                tooltipValueLookups: {
                    'offset': offset
                },
                height: '50',
                barWidth: 6,
                zeroAxis: false});
        }
        
        function printBoxPlot() {
            $("#boxplot").sparkline(prices, {
            type: 'box',
            width: '100',
            raw: false});
        }
        
        printHistogram();
        printBoxPlot();
    }

    function printStatsToConsole(stats) {
        var output = title + '\n\n';
        $.each(stats, function(key, element) {
            output += key  + '\t' +  element + '\n';
        });
        console.log(output);
    }

    function printStatsToTable(stats) {
    
        var contentTable = $('div#gh_content_table_container');
        var prevContentTable = contentTable.prev();
        
        if (prevContentTable) {
            if (prevContentTable.attr('id') == 'ghStats') {
              prevContentTable.innerHTML = '';
            } 
    
            var htmlTable = '<div class="filterbox gh_gradient0" id="ghStats"><table class="gh_fbn"><colgroup><col style="text-align:right"><col style="text-align:left"><col span="2"></colgroup><tbody>';
            htmlTable += '<tr><th class="tdr">Price statistics:</th><th class="tdl"></th><th>Histogram and Boxplot:</th><th>Data export:</th></tr>';
    		var row = 0;
    		$.each(stats, function(key, element) {
                if (row == 0)
                    htmlTable += '<tr><td class="tdr">' + key + ':</td><td class="tdl">' + element + '</td><td style="vertical-align:middle" rowspan="11"><div id="histogram"></div><div id="boxplot"></div></td><td style="vertical-align:middle" rowspan="11"><a href="#" class="export">Export data as csv</a></td></tr>';
                else
                    htmlTable += '<tr><td class="tdr">' + key + ':</td><td class="tdl">' + element + '</td></tr>';
            row++;
            });
            htmlTable += '</tbody></table></div>';
            prevContentTable.append(htmlTable);
        }
    }
    
    function exportToCSV(items, filename) {
    
        var colDelim = '","',
            rowDelim = '"\r\n',
            csv = '';
           
            csv += '"' + "Product" + colDelim + "Price" + rowDelim;
        for (var i=0; i < items.length; i++) {
            csv += '"' + items[i].product + colDelim + items[i].price + rowDelim;
        }
            
        var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);
    
        $(this)
            .attr({
            'download': filename,
                'href': csvData,
                'target': '_blank'
        });
    }

    $(".export").on('click', function (event) {
        // CSV
        exportToCSV.apply(this, [items, 'export.csv']);
    });
}


$(document).ready(function() {
    var ghStats = new GHStats();
});