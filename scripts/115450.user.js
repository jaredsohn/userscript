// --------------------------------------------------------------------
//
// ==UserScript==
// @name          jjwxc-update-interval
// @namespace     http://abbypan.github.com/
// @description   绿晋江( http://www.jjwxc.net )作品中章节的更新间隔统计图
// @copyright     2009+, Abby Pan (http://abbypan.github.com/)
// @author        Abby Pan (abbypan@gmail.com)
// @version       0.5
// @homepage      http://abbypan.github.com/
// @include       http://www.jjwxc.net/onebook.php*
// @exclude       http://www.jjwxc.net/onebook.php*chapterid=*
// @grant         none
// ==/UserScript==
//
// --------------------------------------------------------------------

//找到图片插入点，就是搜索关键字的后面
var insert_path = "/html/body/table/tbody/tr/td/div[3]";

//进度
var process_path = "/html/body/table/tbody/tr/td[3]/div[2]/ul/li[4]";

//更新时间间隔
var update_time_path = "/html/body/table[2]/tbody/tr";

plot_update_time(insert_path, process_path,update_time_path);


function plot_update_time(insert_path, process_path){

	var link = document.evaluate(insert_path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	link=link.singleNodeValue;

	var update_time = extract_update_time(update_time_path);
	var result = calc_update_time_interval(update_time, process_path);

	//最长更新间隔
    var max_int = create_text_element('max_interval', '  最长更新间隔：'+result['max_interval']+'天');
ins_element_after_node(link, max_int);

	//最后一次更新距今
    var last_t = create_text_element('last_time_diff', '  最后一次更新距今：'+result['last_time_diff']+'天');
ins_element_after_node(link, last_t);


    var chap_id = 'chap_interval';
    var chap_text = '章节更新间隔';
	var chap_url = chap_interval_url(result);
	var chap_init_btn = create_chart_init_btn(chap_id, chap_text,  chap_url);
ins_element_after_node(link, chap_init_btn);
    var chap_btn = create_chart_btn(chap_id, chap_text);
ins_element_after_node(link, chap_btn);
    var chap_div = create_chart_div(chap_id, chap_url);
ins_element_after_node(link, chap_div);


    var stat_id = 'stat_interval';
    var stat_text = '统计更新间隔';
    var stat_url = stat_interval_url(result["type_stat"]);
    var stat_init_btn = create_chart_init_btn(stat_id, stat_text,  stat_url);
ins_element_after_node(link, stat_init_btn);
    var stat_btn = create_chart_btn(stat_id, stat_text);
ins_element_after_node(link, stat_btn);
    var stat_div = create_chart_div(stat_id, stat_url);
ins_element_after_node(link, stat_div);

    var update_p = create_text_element('update_interval', '  --- ');
	ins_element_after_node(link, update_p);
}

function ins_element_after_node(node, element){
	node.parentNode.insertBefore(element,node.nextSibling);
}

function create_text_element(id, text){
	var last_t_text = document.createTextNode(text);
	var last_t=document.createElement("p");
	last_t.setAttribute('id', id);
	last_t.appendChild(last_t_text);
	return last_t;
}

function create_chart_init_btn(id, text, img_url) {
	var	btn=document.createElement("input");
	btn.setAttribute('type','button');
	btn.setAttribute('id', id + '_init_btn');
	btn.setAttribute('value','查看 ' + text);

	var btn_func = 'javascript:{' +		
        'var div = document.getElementById("'+id+'"); '+

            'var chart =document.createElement("img");chart.setAttribute("style","max-width:750px"); ' + 
            'chart.setAttribute("id","'+ id +'_chart");chart.setAttribute("style","display:visable;"); '+
            'chart.setAttribute("src", "'+img_url+'" ); '+
            'div.appendChild(chart); chart.scrollIntoView(true);' +

            'var  chart_btn = document.getElementById("'+id+'_btn");' +
            'chart_btn.setAttribute("style","display:visable;");' +

            'this.parentNode.removeChild(this);};';
    btn.setAttribute('onclick',btn_func);

	var btn_p=document.createElement("p");
	btn_p.appendChild(btn);
	return btn_p;
}

function create_chart_btn(id, text) {
	var check_bar=document.createElement("input");
	check_bar.setAttribute('type','button');
	check_bar.setAttribute('style','display:none');
	check_bar.setAttribute('id',id+'_btn');
	check_bar.setAttribute('value','隐藏' + text);
	check_bar.setAttribute('onclick','javascript:{ var  bar = document.getElementById("' + id + '");'+
        'var style = bar.getAttribute("style");if(style.match(/none/)){ ' +
            'bar.setAttribute("style","display:block !important;"); '+
        'this.setAttribute("value","隐藏' + text + '");document.getElementById("update_interval").scrollIntoView(true);}'+
        'else{ bar.setAttribute("style","display:none !important;"); '+
            'this.setAttribute("value","显示'+ text+'");'+
        'document.getElementById("update_interval").scrollIntoView(true);} }');
	return check_bar;
}

function create_chart_div(id){
	var chap_stat =document.createElement("div");
	chap_stat.setAttribute('id',id);
	chap_stat.setAttribute("style","display:block !important;"); 
	return chap_stat;
}

function google_chart_url(r) {
    var x = [];
    for(var t in r){
        var c = t + '=' + r[t];
        x.push(c);
    }
    var res = 'http://chart.apis.google.com/chart?' + x.join('&');
    return res;
}

function stat_interval_url(r)
{
    var type = [ '日更', '周更', '半月更', '月更', 
        '季更', '半年更', '年更', '太阳黑子活动周期更'];
    var color = [];
    var cnt = [];
    var max_cnt = 0;
    for(var i in type){
        var t = type[i];
        var c = r[t] || 0;
        if(max_cnt < c) max_cnt=c;
        cnt.push(c);
        color.push(specify_type_color(t));
    }

    var res = {};
    res["cht"] = 'bvg';
    res["chs"]= '750x250';
	res["chxl"]='0:|' + encodeURI(type.join('|'));
    res["chd"] = 't:' + cnt.join(',');
    res["chco"] = color.join('|');
    res["chxt"] = 'x';

    var chds=max_cnt + 2;
    res["chds"]='0,' + chds;
    res["chtt"] = encodeURI("章节更新统计柱状图");
    res["chbh"]='r,.7';
    res["chm"]='N,FF0000,-1,,12';

    var bar_url = google_chart_url(res);
    return bar_url;
}

function chap_interval_url(r)
{
    var res = {};
	res["cht"] = 'bvg';
	res["chs"]= '750x300';
	res["chxl"]='0:|' + r['indexs'].join('|');
	res["chd"]='t:'+r['intervals'].join(',');
	res["chco"]=r['colors'].join('|');
    res["chxt"] = 'x';
	res["chds"]=parseInt(r['max_interval'])+3;
    res["chds"]='0,' + res["chds"];
	res["chtt"]=encodeURI("章节更新间隔柱状图");
    res["chbh"]='r,.7';
    res["chm"]='N,FF0000,-1,,12';

    var bar_url = google_chart_url(res);
	return bar_url;
}




function calc_update_time_interval(update_time, process_path){
	//计算更新间隔
	var max_interval=0;
	var intervals = [];
	var indexs = [];
	var types = [];
	var colors = [];
	var type_stat = {};

	var today = new Date();
	var last_time_diff = calc_date_interval(update_time[update_time.length-1], today);
	var temp = update_time.slice(0);
	var flag= get_process_flag(process_path);
	if(flag==1) temp.push(today);
	for (var i = 1; i < temp.length; i++) {
		var diff = calc_date_interval(temp[i-1], temp[i]);

		if(diff === null)  continue;
		if(diff > max_interval) max_interval =diff;

		indexs.push(i);
		intervals.push(diff);
		var type = check_update_type(diff);
		types.push(type);
		if(type_stat[type] == undefined){
			type_stat[type]=1;
		}else{
			type_stat[type]++;
		}
		var color = specify_type_color(type);
		colors.push(color);
	}

	return {
		'indexs' : indexs, 
			'intervals' : intervals, 
			'types' : types, 
			'colors' : colors, 
			'type_stat' : type_stat, 
			'max_interval' : max_interval,
			'last_time_diff' : last_time_diff
	};
}

function get_process_flag(process_path) {
	var li = document.evaluate(process_path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var flag=1; 
	if(li.snapshotLength > 0){
		var pro = li.snapshotItem(0);
		var process = pro.textContent||pro.innerText || "";
		if(process.match(/完成/))  flag = 0;
	}

	return flag;
}

function check_update_type(intervals) {
	if( intervals<0 ) return '错误';
	if( intervals<4 ) return '日更';
	if( intervals<8 ) return '周更';
	if( intervals<16 ) return '半月更';
	if( intervals<32 ) return '月更';
	if( intervals<94 ) return '季更';
	if( intervals<184 ) return '半年更';
	if( intervals<366 ) return '年更';
	if( intervals<732 ) return '太阳黑子活动周期更';
	return '冰川周期更';
}

function specify_type_color(type) {
	if(type == '错误') return 'ffffff';	
	if(type == '日更') return 'a3d900';
	if(type == '周更') return '48c0a3';
	if(type == '半月更') return '44cef6';
	if(type == '月更') return 'fff143';
	if(type == '季更') return 'f9906f';
	if(type == '半年更') return 'c89b40';
	if(type == '年更') return '60281e';
	if(type == '太阳黑子活动周期更') return '000000';
	return 'ff0ff0';
}

function extract_update_time(update_time_path){
	//取出更新时间序列，并排序
	var timeTrs = document.evaluate(update_time_path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var pattern = /(\d+-\d+-\d+)/;
	var chap_times = [];
	for (var i = 1; i < timeTrs.snapshotLength; i++) {
		var timeTr = timeTrs.snapshotItem(i);
		var timeTd = timeTr.lastChild.previousSibling;
		var ts = pattern.exec(timeTd.innerHTML);
		if(!ts) continue;
		var t = ts[0].replace(/-/g,'/');
		chap_times.push(t);
	}

	var chap_sorted = chap_times.sort();
	for (i = 0; i <chap_sorted.length; i++) {
		chap_sorted[i] = new Date(chap_sorted[i]);
	}

	return chap_sorted; 
}

function calc_date_interval(date_a, date_b){
	if(!date_a ||  !date_b) return null;
	var ms_a = date_a.getTime();
	var ms_b = date_b.getTime();
	var ms_diff = ms_b - ms_a;
	var interval =  Math.round((((ms_diff / 1000 ) / 60 ) / 60) / 24);
	return  interval;
}
