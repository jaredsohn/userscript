// ==UserScript==
// @name       ElasticSearch Admin Improvements
// @namespace  http://localhost/
// @version    0.1
// @description  Improve ES admin panel
// @include      http://*/_plugin/head/
// @copyright  2014+, Ruslan Zavacky
// @require http://code.jquery.com/jquery-latest.js
// @require http://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.10/require.min.js
// @require http://cdnjs.cloudflare.com/ajax/libs/ace/1.1.01/ace.js
// ==/UserScript==

var repeat = function(string,  num) {
	return new Array(num + 1).join(string);
};

var secondsToTime = function (seconds) {
    return seconds.replace(/(\d{2})/g, "$1:").slice(0, -1);
};

var init = function() {
	$('head').append('<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/jsoneditor/2.3.6/jsoneditor-min.css" type="text/css" />');
    $('.es-header-menu-item:contains("Any Request")').on('click', function() {
        $('.anyRequest-request').css('width', '600px');
        
        var container = $('textarea[name="body"]');
        
        container.css({
            "width": "100%",
            "box-sizing": "border-box"
        });
        
        var lastQuery = $('.anyRequest-history .booble:last').find('em').text();
        console.log(lastQuery);
        container.before('<div id="queryBody" style="height: 400px;"></div>');
        var editor = ace.edit("queryBody");
        editor.setValue(JSON.stringify(JSON.parse(lastQuery), null, "\t"));
    	editor.getSession().setMode("ace/mode/json");
        
        editor.getSession().on('change', function(){
            container.val(editor.getValue());
		});
        
    });
    
    $('.es-header-menu-item:contains("Structured Query")').on('click', function() {
        setTimeout(function() {
        	var options = $('.es-indexSelector-select select option');
            var indexes = [];
            var maxLength = 0;
            
            $.each(options, function(i, option) {
                var textMatches = $(option).text().match(/(.*?)\-(\d{4}\-\d{2}\-\d{2})\-(.*?)\s\((.*?) docs\)/i);
                var value = $(option).attr('value');
                
                if (!textMatches) {
                    console.log('missing', $(option).text());
                }
                
                if (!textMatches) {
                    indexes.push([value, $(option).text(), null, null, null]);
                    return;
                }
                
                if (textMatches[1].length > maxLength) {
                    maxLength = textMatches[1].length;
                }
                
                indexes.push([value, textMatches[1], textMatches[2], textMatches[3], textMatches[4]]);
            });
            
            indexes.sort(function(a, b) {
            	var nameA = a[1], nameB = b[1];
                var dateA = a[2], dateB = b[2];
                var secondsA = a[3], secondsB = b[3];
                
                if (nameA == nameB && dateA == dateB) {
                    return (secondsA < secondsB) ? -1 : (secondsA > secondsB) ? 1 : 0;
                } if (nameA == nameB) {
                    return (dateA < dateB) ? -1 : (dateA > dateB) ? 1 : 0;
                } else {
                    return nameA < nameB ? -1 : 1;
                }
            });
            
            var options = '';
            $.each(indexes, function(i, option) {
                var postfixLength = maxLength - option[1].length;
                
                if (option[3]) {
                    options += '<option value="' + option[0] + '">' + option[1] + ', ' + option[2] + ' ' + secondsToTime(option[3]) + '</option>';
                } else {
                    options += '<option value="' + option[0] + '">' + option[1] + '</option>';
                }
            	
            });
            
            $('.es-indexSelector-select select').html(options);
        }, 500);
    });    
};

$.when(
    $.getScript('http://cdnjs.cloudflare.com/ajax/libs/ace/1.1.01/mode-json.js'),
    $.getScript('http://cdnjs.cloudflare.com/ajax/libs/ace/1.1.01/worker-json.js')
).done(init);