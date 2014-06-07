// ==UserScript==
// @name           Pathtraq chart
// @author         rikuo
// @namespace      http://d.hatena.ne.jp/rikuo/
// @description    show Pathtraq chart
// @include        http://*
// ==/UserScript==
//
// cf. http://pathtraq.com/
// cf. http://pathtraq.com/developer/
//

var u = self.location.href;

if (u != top.location.href)return;

var enURL = encodeURIComponent(u);
var _doc = document;
var df = document.createDocumentFragment();

GM_addStyle(<><![CDATA[
	div#Pathtraq_chart_content{
		z-index: 250;
		position: fixed;
		bottom: 71px;
		right: 0;
		overflow: auto;
		opacity: 0.85;
		min-Height: 20px;
		min-Width: 20px;
		max-Height: 400px;
		padding: 2px;
		-moz-border-radius: 8px 0 0 8px;
		font-size: 11px;
		text-align: left;
		padding: 0;
		margin: 0;
		line-height: 15px;
		background-color: #10b8c8;
		border: none;
	}
	#Pathtraq_chart{
		border: none !important;
		display: none;
		margin : 7px 4px 4px 4px;
	}
]]></>);


function show_Pathtraq_chart() {
	var Pathtraq_chart_elem = e('Pathtraq_chart');
	Pathtraq_chart_elem.style.display = 'block';
}

function hide_Pathtraq_chart() {
	var Pathtraq_chart_elem = e('Pathtraq_chart');
	Pathtraq_chart_elem.style.display = 'none';
}

function get_Pathtraq_chart() {
	var url = 'http://api.pathtraq.com/page_chart?url='
		+ enURL + '&callback=get_Pathtraq_chart_json_callback&scale=1m';

	GM_xmlhttpRequest({
		method : 'GET',
		url : url,
		onload : function (req) {
			eval(req.responseText);
		},
	});
}

function get_Pathtraq_chart_json_callback(item){

	if(!item || !item.plots)return;

	var plots = item.plots;

	var max = Math.round(Math.max.apply(null,plots) * 1.1) + 1;

	if(max == 1 || plots.join('').match(/0{29}1/) )return;

	var square = c('div');
	square.id = 'Pathtraq_chart_content';
	square.addEventListener('mouseover', show_Pathtraq_chart, false);
	square.addEventListener('mouseout', hide_Pathtraq_chart, false);
	df.appendChild(square);

	var GCHART_HEIGHT = 100;
	var GCHART_WIDTH = 600;
	var mark = [];
	var dates = [];
	var current_month = 0;

	var gchart_unit_value = (GCHART_HEIGHT / max );
	for( var i=0, pl=plots.length ; i < pl ; i ++){
		plots[i] = Math.round(plots[i] * gchart_unit_value);
		mark.push('x,ffffff,0,'+i+',5')
		var current_date = new Date(item.start);
		current_date.setDate(current_date.getDate() + i);
		if(current_month != current_date.getMonth()){
			current_month = current_date.getMonth();
			dates.push((current_date.getMonth()+1) + '/' + current_date.getDate());
		}else{
			dates.push(current_date.getDate());
		}
	}

	var chart_link = c('a');
	chart_link.href = 'http://pathtraq.com/page?url=' + enURL + '&scale=1m';
	chart_link.title = 'クリックで詳細情報ページへ';

	df.firstChild.appendChild(chart_link);

	var grid = Math.round(max/2);
	var grid_line = grid + '|' + Math.round(max);
	var grid_position = Math.round(grid * gchart_unit_value);

	var chart = c('img');
	chart.id = 'Pathtraq_chart';
	chart.src = 'http://chart.apis.google.com/chart?chs='
		+GCHART_WIDTH
		+'x'
		+GCHART_HEIGHT
		+'&chd=t:'
		+plots.join(',')
		+'&chco=ffffff&cht=lc&chxt=x,y&chxl=0:|'
		+dates.join('|')
		+'|1:|' + '0|' + grid_line + '&chxp=1,0,' + grid_position + ',100'
		+'&chm=' + mark.join('|')
		+'&chg=0,50&chf=bg,s,10b8c8&chxs=0,ffffff,11|1,ffffff,12&chm=V,98e0e8,0,0,1|h,98e0e8,0,0,1'
		+'|h,68ccd8,0,0.' + grid_position + ',1,-1';
	chart.width = GCHART_WIDTH;
	chart.height = GCHART_HEIGHT;

	df.firstChild.firstChild.appendChild(chart);
	_doc.body.appendChild(df);
}

function c(tag_name) {
	return _doc.createElement(tag_name);
}

function e(id) {
	return _doc.getElementById(id);
}

get_Pathtraq_chart();

