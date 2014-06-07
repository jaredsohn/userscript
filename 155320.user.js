// ==UserScript==
// @name        Battle Status
// @namespace   bigcat_bs
// @description battle status
// @include     http://www.erepublik.com/*/military/battlefield/*
// @include     http://www.erepublik.com/*/military/campaigns
// @version     1.2.5
// @author      bigcat.chen 
// ==/UserScript==
//---------------------------------------------------------------------------
// reference http://userscripts.org/scripts/show/155320
(function(){
var country = {
	1: 'Romania',
	9: 'Brazil',
	10: 'Italy',
	11: 'France',
	12: 'Germany',
	13: 'Hungary',
	14: 'China',
	15: 'Spain',
	23: 'Canada',
	24: 'USA',
	26: 'Mexico',
	27: 'Argentina',
	28: 'Venezuela',
	29: 'United Kingdom',
	30: 'Switzerland',
	31: 'Netherlands',
	32: 'Belgium',
	33: 'Austria',
	34: 'Czech Republic',
	35: 'Poland',
	36: 'Slovakia',
	37: 'Norway',
	38: 'Sweden',
	39: 'Finland',
	40: 'Ukraine',
	41: 'Russia',
	42: 'Bulgaria',
	43: 'Turkey',
	44: 'Greece',
	45: 'Japan',
	47: 'South Korea',
	48: 'India',
	49: 'Indonesia',
	50: 'Australia',
	51: 'South Africa',
	52: 'Republic of Moldova',
	53: 'Portugal',
	54: 'Ireland',
	55: 'Denmark',
	56: 'Iran',
	57: 'Pakistan',
	58: 'Israel',
	59: 'Thailand',
	61: 'Slovenia',
	63: 'Croatia',
	64: 'Chile',
	65: 'Serbia',
	66: 'Malaysia',
	67: 'Philippines',
	68: 'Singapore',
	69: 'Bosnia and Herzegovina',
	70: 'Estonia',
	71: 'Latvia',
	72: 'Lithuania',
	73: 'North Korea',
	74: 'Uruguay',
	75: 'Paraguay',
	76: 'Bolivia',
	77: 'Peru',
	78: 'Colombia',
	79: 'Republic of Macedonia (FYROM)',
	80: 'Montenegro',
	81: 'Republic of China (Taiwan)',
	82: 'Cyprus',
	83: 'Belarus',
	84: 'New Zealand',
	164: 'Saudi Arabia',
	165: 'Egypt',
	166: 'United Arab Emirates',
	167: 'Albania'
};
function getDivision(num){
	var level = parseInt(num);
	if(level<25){return 1;}
	if(level<30){return 2;}
	if(level<37){return 3;}
	return 4;
}
var leftcode = null;
var rightcode = null;
function _initDivision(){
	$j("#pvp").append('<span id="jbl_division_wrap"></span>');

	var div = getDivision($j(".user_level").find("b").html());
	var str = '<select id="jbl_division" style="position:absolute;top:250px; left:10px; opacity:0.7">';
	for(var i=1; i<5; i++){
		var sed = '';
		if(i==div){
			sed = ' selected="selected"';
		}
		str += '<option value="'+i+'"'+sed+'>D'+i+'</option>';
	}
	$j('#jbl_division_wrap').html(str+'</select>');
	
}
var JBLSTYLE = 'position:absolute; background:#fff; border:1px solid #f60; line-height:22px; padding:5px; color:#f00; opacity:0.7; z-index:100;';



/**
*battle module
**/
var BS = {data:{},log:{attackers:[],defenders:[]},logids:[],atotal:0,dtotal:0};
function init(){
	$j("#pvp").append('<div id="jbl_cu" style="'+JBLSTYLE+' top:300px; left:10px;"></div>');
	$j("#pvp").append('<div id="jbl_other" style="'+JBLSTYLE+' top:300px; right:10px;"></div>');
	$j("#pvp").append('<div id="jbl_status" style="'+JBLSTYLE+' top:150px; left:350px; padding:0 2px; font-weight:bold;"></div>');
	$j("#pvp").append('<a id="jbl_reloadstatus" style="'+JBLSTYLE+' top:270px; left:10px; padding:0 2px; cursor:pointer; href="javascript:;" onclick="battleStats.getBattleStats();">Refresh</a>');
	$j("#pvp").append('<div id="jbl_left_logs" style="'+JBLSTYLE+' top:20px; left:0px; padding:0 2px;"></div><div id="jbl_right_logs" style="'+JBLSTYLE+' top:20px; right:0px; padding:0 2px;"></div>');
	

	_initDivision();
	$j('#jbl_division').bind("change",function(e){
		render();
	});

	$j('#change_weapon').css("z-index","99999");
	
	var left = $j('#pvp_header').find("div.left_side").find("h3")[0];
	left = left.innerHTML;
	left = $j.trim(left.replace("Resistance Force of ",""));
	$j("#jbl_cu").html(left);
	var right = $j('#pvp_header').find("div.right_side").find("h3")[0];
	right = right.innerHTML;
	right = $j.trim(right.replace("Resistance Force of ",""));
	$j("#jbl_other").html(right);
	for(var k in country){
		if(country[k]==left){
			leftcode = k;
		}	
		if(country[k]==right){
			rightcode = k;
		}	
	}
	
	var scriptNode = document.createElement("script");
	scriptNode.textContent = 'function globalTick(){return true;}';
	document.head.appendChild(scriptNode);

	
	var cu = location.host+location.pathname;
	BS.cu = cu.replace("battlefield","battle-stats");
	$j("#pvp").ajaxSuccess(function (e, xhr, settings) {
		getStatus(e, xhr, settings);
	});
	
}
function getStatus(e, xhr, settings){
	if (settings.url.indexOf('battle-stats') == -1) {
		return;
	}
	try{
		BS.data = JSON.parse(xhr.responseText);
	}catch(e){
		BS.data = {};
	}
	if(!BS.data.stats){
		$j("#jbl_status").html("LOAD FALSE!");
		return;
	}
	render();
	
}
function render(){
	

	var d = $j("#jbl_division").val();
	var list = BS.data.stats.current,detail={},fighter = BS.data.fightersData;
	for(var k in list){
		detail = list[k];
	}


	var str = '<table><tr><td align="right">name&nbsp;&nbsp;</td><td>kills&nbsp;&nbsp;</td><td>damage</td></tr>';
	
	if(detail[d]){
		if(detail[d][leftcode]){
			var leftlist = detail[d][leftcode];
			var count =0;
			for(var i=0; i<leftlist.length; i++){
				str += '<tr><td align="right"><a href="http://'+location.host+'/en/citizen/profile/'+leftlist[i].citizen_id+'" target="_blank" style="color:#f00; text-decoration: underline">'+fighter[leftlist[i].citizen_id].name+'</a>&nbsp;&nbsp;</td><td>'+leftlist[i].kills+'&nbsp;&nbsp;</td><td>'+leftlist[i].damage+'</td></tr>';
				count += parseInt(leftlist[i].damage);
			}
			count = count/1000000;
			count = count.toFixed(4);
			str += '</table><div>Total:'+count+'M</div>';
			$j("#jbl_cu").html(str);
		}else{
			$j("#jbl_cu").html('D'+d+'nobody inf!');
		}
	}else{
		$j("#jbl_cu").html('D'+d+'nobody inf!');
	}
	
	str = '<table><tr><td align="right">name&nbsp;&nbsp;</td><td>kills&nbsp;&nbsp;</td><td>damage</td></tr>';
	if(detail[d]){
		if(detail[d][rightcode]){
			var rightlist = detail[d][rightcode];
			var count =0;
			for(var i=0; i<rightlist.length; i++){
				str += '<tr><td align="right"><a href="http://'+location.host+'/en/citizen/profile/'+rightlist[i].citizen_id+'" target="_blank" style="color:#f00; text-decoration: underline">'+fighter[rightlist[i].citizen_id].name+'</a>&nbsp;&nbsp;</td><td>'+rightlist[i].kills+'&nbsp;&nbsp;</td><td>'+rightlist[i].damage+'</td></tr>';
				count += parseInt(rightlist[i].damage);
			}
			count = count/1000000;
			count = count.toFixed(4);
			str += '</table><div>Total:'+count+'M</div>';
			$j("#jbl_other").html(str);
		}else{
			$j("#jbl_other").html('D'+d+'nobody inf!');
		}
	}else{
		$j("#jbl_other").html('D'+d+'nobody inf!');
	}
	
	var division = BS.data.division;
	str = division[leftcode][d].domination+'&nbsp;:&nbsp;'+division[rightcode][d].domination;
	$j("#jbl_status").html(str);

	
	renderTotal();


}
function renderTotal(){

	var attlog = BS.data.logs.attackers;
	var aadd = 0,dadd=0;
	for(var i=0; i<attlog.length; i++){
		if(BS.logids[attlog[i].id]){
			continue;
		}
		BS.logids[attlog[i].id] = true;
		BS.log.attackers.push(attlog[i]);
		BS.atotal += parseInt(attlog[i].damage)/1000000;
		aadd += parseInt(attlog[i].damage)/1000000;
	}
	var defenlog = BS.data.logs.defenders;
	for(var i=0; i<defenlog.length; i++){
		if(BS.logids[defenlog[i].id]){
			continue;
		}
		BS.logids[defenlog[i].id] = true;
		BS.log.defenders.push(defenlog[i]);
		BS.dtotal += parseInt(defenlog[i].damage)/1000000;
		dadd += parseInt(defenlog[i].damage)/1000000;
	}


	
	var leftt=0,rightt=0;
	var difadd = 0;
	var cs = $j('#right_attackers')[0].parentNode.className;
	if(cs.indexOf('left')!=-1){
		leftt = BS.atotal;
		rightt = BS.dtotal;
		difadd = aadd-dadd;
	}else{
		leftt = BS.dtotal;
		rightt = BS.atotal;
		difadd = dadd-aadd;
	}
	if(difadd<0){
		difadd = difadd*-1;
	}
	leftt = parseFloat(leftt).toFixed(4);
	rightt =parseFloat(rightt).toFixed(4);
	var div = getDivision($j(".user_level").find("b").html());
	var ld = BS.data.division.domination[div];
	ld = parseFloat(ld).toFixed(2);
	var rd = 100-ld;
	if(SERVER_DATA.mustInvert){
		rd = ld;
		ld = 100-rd;
	}
	var fix = leftt-rightt;
	fix = fix.toFixed(4);
	

	if(!BS.lastDomination){
		BS.lastDomination = ld;
		$j('#jbl_left_logs').html(ld+"%<br/>"+'logtatol:'+leftt+'M<br/>logdiff:'+fix+'M');
		$j('#jbl_right_logs').html(getFixedStr(rd)+"%<br/>"+'logtatol:'+rightt+'M');
	}else{
		var difld = ld - BS.lastDomination;
		BS.lastDomination = ld;
		var diflog = difld;
		if(difld<0){
			difld = difld*-1;
		}
		if(difadd!=0){
			var total = difadd/(difld*0.01);
			var toleftt = total*(ld*0.01);
			var torightt = total*(rd*0.01);
			var tofix = toleftt-torightt;
			$j('#jbl_left_logs').html(ld+'%[<em style="color:#39f; font-weight:bold;">'+getFixedStr(diflog)+'</em>]<br/>'+'tatol:<em style="color:#39f;">'+getFixedStr(toleftt)+'</em>M<br/>diff:<em style="color:#39f;">'+getFixedStr(tofix)+'</em>M<br/>logtotal:'+leftt+'M<br/>logdiff:'+fix+'M');
			$j('#jbl_right_logs').html(getFixedStr(rd)+'%<br/>'+'tatol:<em style="color:#39f;">'+getFixedStr(torightt)+'</em>M<br/>logtotal:'+rightt+'M');
		}
	}
}
function getFixedStr(str){
	str = str.toString();
	str = str.split('.');
	if(str[1]){
		var s = str[1].toString();
		if(s.length>4){
			s = s.substring(0,4);
		}
		return str[0]+'.'+s;
	}else{
		return str[0];
	}
}
/**
*Camaps module
*/
var CAMP = {}
function initCamaps(){
	var str = '<div style="'+JBLSTYLE+' position:fixed; top:200px; left:40%;">change division<span id="jbl_division_wrap"></span><a style="color:#369" href="javascript:;" id="jbl_reloadstatus">&nbsp;&nbsp;Refresh</a>(1w=10000)</div>';
	$j("#battle_listing").append(str);
	_initDivision();
	$j('#jbl_division').css("position","static").bind("change",function(e){
		renderAllCamaps();
	});
	$j('#jbl_reloadstatus').bind("click",function(e){
		loadCamaps();
	});
	var lis = $j("#battle_listing").find('li');
	lis.css({"position":"relative","overflow":"hidden"});
	lis.each(function(index,el){
		var id = $j(this).attr("id");
		if(id){
			id = id.split('-');
			id = id[1];
			$j(this).append('<div id="jbl_camaps_'+id+'" style="'+JBLSTYLE+' border:0; right:100px; top:0; line-height:18px; padding:2px 5px;"></div>');
		}else{
			console.log($j(this).html());
		}
	});
	$j("#battle_listing").find('.tank_img').css({"padding-left":"25px","width":"110px","color":"#f60"});
	loadCamaps();
	return false;
}
function loadCamaps(){
	var lis = $j("#battle_listing").find('li');
	lis.each(function(index,el){
		var id = $j(this).attr("id");
		id = id.split('-');
		id = id[1];
		getCamapDetail(id);
	});
}
function getCamapDetail(id){
	$j.ajax({
            type: 'GET',
            url:  'http://'+location.host+'/en/military/battle-stats/'+id,
            success: function(data, textStatus, xhr) {
			   CAMP[id] = data;
               renderCamap(id);
            },
            dataType:'json' 
        });
}
function renderCamap(id){
	var data = CAMP[id];
	var lcode = 0,rcode=0;
	var nod = $j('#battle-'+id);
	var leftc = nod.find('strong')[0].innerHTML;
	var rightc = nod.find('strong')[1].innerHTML;
	for(var k in country){
		if(country[k]==leftc){
			lcode = k;
		}	
		if(country[k]==rightc){
			rcode = k;
		}	
	}
	var division = $j('#jbl_division').val();

	var leftpoint = null,rightpoint=null;
	if(data["division"][lcode]){
		leftpoint = '['+data["division"][lcode].total+']'+'<span style="color:#3c88b3">'+data["division"][lcode][division].domination+'</span>';
	}
	if(data["division"][rcode]){
		rightpoint = '<span style="color:#3c88b3">'+data["division"][rcode][division].domination+'</span>'+'['+data["division"][rcode].total+']';
	}
	var str = leftpoint+' : '+rightpoint;
	nod.find('.tank_img').html(str);

	var status = {};
	for(k in data["stats"]["current"]){
		status = data["stats"]["current"][k];
	}
	var leftstr = "",rightstr = "";
	var fighter = data.fightersData;
	if(status[division]){
		if(status[division][lcode]){
			var leftlist = status[division][lcode];
			leftstr = '<a style="float:none;background:none; margin:0;" href="http://'+location.host+'/en/citizen/profile/'+leftlist[0].citizen_id+'" target="_blank" style="color:#f00; text-decoration: underline">'+fighter[leftlist[0].citizen_id].name+'</a><br/>'+(leftlist[0].damage/10000).toFixed(2)+'w';
		}else{
			leftstr = 'none!';
		}
	}else{
		leftstr = 'none!';
	}
	if(status[division]){
		if(status[division][rcode]){
			var leftlist = status[division][rcode];
			rightstr = '<a style="float:none;background:none; margin:0;" href="http://'+location.host+'/en/citizen/profile/'+leftlist[0].citizen_id+'" target="_blank" style="color:#f00; text-decoration: underline">'+fighter[leftlist[0].citizen_id].name+'</a><br/>'+(leftlist[0].damage/10000).toFixed(2)+'w';
		}else{
			rightstr = 'none!';
		}
	}else{
		rightstr = 'none!';
	}
	var str = '<span style="float:left; height:34px; overflow:hidden;">'+leftstr+'</span><span style="float:left"> &nbsp;VS&nbsp; </span><span style="float:left; height:34px; overflow:hidden;">'+rightstr+'</span>';
	$j('#jbl_camaps_'+id).html(str);

}
function renderAllCamaps(){
	for(var k in CAMP){
		renderCamap(k);
	}
}
/**
*wait api
*/
var SERVER_DATA = {};
function wait() {
	if (!unsafeWindow.jQuery) {
		window.setTimeout(wait, 100);
	} else {
		$j = unsafeWindow.jQuery;
		SERVER_DATA = unsafeWindow.SERVER_DATA;
		var u = location.href;
		if(u.indexOf("campaigns")!=-1){
			$j(document).ready(function () { initCamaps(); });
		}else{
			$j(document).ready(function () { init(); });
		}
	}
}
wait();

})();