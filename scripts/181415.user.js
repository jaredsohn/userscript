// ==UserScript==
// @id             tabun.everypony.ru-ttg@scriptish
// @name           TabunTopicGraph
// @version        0.3
// @namespace      
// @author         Zayka
// @description    Графики для топиков на Табуне.
// @include        http://tabun.everypony.ru/blog/*
// @require        http://code.jquery.com/jquery-1.7.2.min.js
// @require        http://code.highcharts.com/highcharts.js
// @updateURL	   http://userscripts.org/scripts/source/181415.user.js
// @run-at         document-end
// ==/UserScript==

function MyLittleCallback(msg)
{
$('#TestChart').highcharts({
	 chart: {
        type: 'spline',
		backgroundColor:'rgba(255, 255, 255, 0.0)',
		zoomType: 'x'
			},
			
     plotOptions: {
			spline: {
				lineWidth: 2,       
				marker: {
					enabled: false 
					},
				color: '#5FA459',
				negativeColor:'#DA4242',
				},							
    },		
    xAxis: {
        type: 'datetime',
      //  title: {text:"222333"}
    },
	yAxis: {
		title: {enabled:false}
	},
	series: [{data:msg, name:'Рейтинг топика'}],
	
	title: {text:""},
	
	legend: {enabled:false}
    });
	
	$('.zGraph').hide();
	$(".topic-info-vote").after( "<button class=\"button button-primary graphbutton\" onclick=\"$('.zGraph').toggle();\">График</button>" );
}

$(".topic-header").append( "<div class=\"zGraph\" id=\"TestChart\"></div>" );
pattern = /http[\w\W\s\S]+?([\d]+)[\.]/g;
var topicN=pattern.exec(document.URL);
$.ajax({
	type:"GET",
	dataType: "json",
	data:"id="+topicN[1],
	url:"http://tabunstats.tk/graph/", //
	success: function (msg){MyLittleCallback(msg)},
	error: function (jqXHR, textStatus, errorThrown ) 
	{
		console.log("jqXHR:"+jqXHR);
		console.log("textStatus:"+textStatus);
		console.log("errorThrown:"+errorThrown);
	}
});