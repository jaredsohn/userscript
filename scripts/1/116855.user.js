// ==UserScript==
// @name           T4 Kolejka Budowy
// @namespace      http://tanatos.no-ip.info/
// @include        http://ts*.travian.*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
unsafeWindow.func_check_all = function(eventTarget)
{
    var f=eventTarget.form;
    var chk = eventTarget.checked;
    for (var i=0;i<f.elements.length;i++) {
      if (f.elements[i].type=='checkbox') {
        f.elements[i].checked=chk;
      }
    }
}
function escape_RegEx(text) {
  if (!arguments.callee.sRE) {
    var specials = [
      '/', '.', '*', '+', '?', '|',
      '(', ')', '[', ']', '{', '}', '\\'
    ];
    arguments.callee.sRE = new RegExp(
      '(\\' + specials.join('|\\') + ')', 'g'
    );
  }
  return text.replace(arguments.callee.sRE, '\\$1');
}
function uniqueArr(a) {
	function contains(a, e) {
	 for(j=0;j<a.length;j++)if(a[j]==e)return true;
	 return false;
	}
 temp = new Array();
 for(i=0;i<a.length;i++){
  if(!contains(temp, a[i])){
   temp.length+=1;
   temp[temp.length-1]=a[i];
  }
 }
 return temp;
}

function fetch_active_href()
{
	return $('#villageList a.active').attr('href');
}

var resActiveVilageHref;
function get_current_newdid()
{
	if (!resActiveVilageHref) resActiveVilageHref = fetch_active_href();
	return resActiveVilageHref.match(/\\?newdid=(\d+)/)[1];
}
function get_current_build_location()
{
	if (!resActiveVilageHref) resActiveVilageHref = fetch_active_href();
	return resActiveVilageHref.match(/&id=(\d+)/)[1];
}


$(document).ready(function() {  
	var href = window.location+"";
	
	var page = href.match(/\/([^\/]+)\.php/)[1];
	
	
	switch(page)
	{
	case 'dorf1':
		page_resources();
	break;
	
	case 'dorf2':
		display_autobuild();
		page_buildings();
		
	break;
	
	case 'a2b':
		if (href.search("a2b.php\\?z")!==-1) page_send_army();
	break;
	
	case 'berichte':
		page_reports();
	break;
	  
	case 'nachrichten':
		if (href.search("nachrichten.php\\?id")!==-1) page_messages_read();
	break;
	
	case 'build':
		if (href.search("gid=17")!==-1) 
		{
			page_build_send_res();
		}
		if (href.search("build.php\\?id=")!==-1) 
		{
			gid = $('#build').attr('class');
			if (gid == "gid0") { page_build_new(); break; }
			page_build_upg();
		}
	break;
	
	case 'spieler':
		if (href.search("s=1")!==-1)
		{
			page_profile_edit();
			break;
		}
		page_profile();
		
	break;
	
	default:
		
	}
	all_pages();
});


function page_profile()
{
}

function storage_get_villagescoords()
{
	if (!localStorage["villagesCoords"]) return false;
	var tmp = localStorage["villagesCoords"].split('|');
	var villagesCoords = [];
	for (i in tmp) tmp[i] = tmp[i].split('#');
	for (i in tmp) villagesCoords[tmp[i][0]] = tmp[i][1];

	return villagesCoords;
}

function storage_put_villagescoords(villagesCoords)
{
	var tmp = [];
	for (i in villagesCoords) {tmp.push(i+'#'+villagesCoords[i])};
	localStorage["villagesCoords"] = tmp.join('|');
}

function page_profile_edit()
{
	var newdid;
	var villagesCoords = [];
	$('#villages tbody tr').each(function(){
		var inputName = $('td:first input',this).attr('name');
		newdid = inputName.match(/dname\[(\d+)\]/)[1];
		
		var coordUrl = $('td:nth-child(4) a',this).attr('href');
		coords = coordUrl.match(/\-?\d+/g);
		villagesCoords["v"+newdid] = coords;
		});

		storage_put_villagescoords(villagesCoords);
		
}

function page_reports()
{
	$('#overview td.sub div').each(function (i){
		
		txt = $('img',this).attr('alt');
		txt = '<span style="float:right;margin-right:10px;">'+txt+'</span> &nbsp;';
		$(this).append(txt);

	});
	
	html = "<input onclick='func_check_all(this)' type='checkbox' class='check' style='float:left;margin-left:4px;'>";
	$('#overview th:first').prepend(html);
	
	css = 'div.paginator { font-size: large ! important; }';
	css += 'div.paginator a { display:inline-block;border:1px solid gray; padding:3px; }';
	addGlobalStyle(css);
}
unsafeWindow.func_autobuild_clear_all = function()
{
	localStorage["autobuild_list"]='';
	window.location.href='dorf1.php';
}
unsafeWindow.func_autobuild_del = function(index)
{
	if (!localStorage["autobuild_list"]) return false;
	var newdid = get_current_newdid();
	var list = localStorage["autobuild_list"].split('|');
	list.splice(index,1);
	localStorage["autobuild_list"] = list.join('|');
	window.location.href='dorf1.php?newdid='+newdid;
}
unsafeWindow.func_autobuild_clear = function()
{
	if (!localStorage["autobuild_list"]) return false;
	var list = localStorage["autobuild_list"].split('|');
	var resultList = [];
	var newdid = get_current_newdid();
	for (i in list)
	{
		building = list[i].split(',');
		if (building[0]!=newdid)
		{
			resultList.push(list[i]);
		}
	}
	localStorage["autobuild_list"] = resultList.join('|');
	window.location.href='dorf1.php?newdid='+newdid;
}
unsafeWindow.func_build_next = function()
{
	build_next();
}

unsafeWindow.build_index = function(index)
{
	if (!localStorage["autobuild_list"]) return false;
	var list = localStorage["autobuild_list"].split('|');
		building = list[index].split(',');
		if (building)
		{
			$.get('build.php?newdid='+building[0]+'&id='+building[1], function(data) {
  			
  			if (!check_login_ajax(data)) return false;

  			if (data.match(/<div id="build" class="gid0">/))
  			{
  				var regex = new RegExp('class="build" onclick="window.location.href = \'dorf2.php\\?a='+building[2]+'&amp;id='+building[1]+'&amp;c=(.*)\';',"");
  				session = data.match(regex);
  				if (session) build_href = "dorf2.php?a="+building[2]+"&id="+building[1]+"&c="+session[1];
  			}
  			else 
  			{
 	 				build_href = data.match(/class="build" onclick="window.location.href = '(.*)';/);
 	 				if (build_href) build_href = build_href[1];
 	 			}	

 	 			if (build_href)
 	 			{	
 	 				url= build_href.replace(/\&amp;/g,'&');
 	 				$.get(url, function() {
 	 					list.splice(index,1);
 	 					localStorage["autobuild_list"] = list.join('|');
 	 				});
 	 			}
			});
		}
}
function build_next()
{
	if (!localStorage["autobuild_list"]) return false;
	var list = localStorage["autobuild_list"].split('|');
	var listIndexesTryingToBuild = [];
	var listNewdids = []; 
	var tmpnewdid;
	$(list).each(function (i){
		
		tmpnewdid = this.substr(0,this.indexOf(","));
		if ($.inArray(tmpnewdid,listNewdids) != -1) return 1;
		listNewdids.push(tmpnewdid);
		listIndexesTryingToBuild.push(i);
	});
	
	$(listIndexesTryingToBuild).each(function (i)
	{
		if (i==0) unsafeWindow.build_index(this);
		else {
			var randomnumber=Math.floor(Math.random()*Math.random()*10001)+3000;
			setTimeout("build_index("+this+")",randomnumber);
		}
	});

}

function display_common(code)
{
	switch(code)
	{
		case 'whitebox-start':
			return "<div class='boxes buildingList'><div class='boxes-tl'></div><div class='boxes-tr'></div><div class='boxes-tc'></div><div class='boxes-ml'></div><div class='boxes-mr'></div><div class='boxes-mc'></div><div class='boxes-bl'></div><div class='boxes-br'></div><div class='boxes-bc'></div><div class='boxes-contents'>";
		break;
		
		case 'whitebox-small-start':
			return "<div class='boxes villageList units'><div class='boxes-tl'></div><div class='boxes-tr'></div><div class='boxes-tc'></div><div class='boxes-ml'></div><div class='boxes-mr'></div><div class='boxes-mc'></div><div class='boxes-bl'></div><div class='boxes-br'></div><div class='boxes-bc'></div><div class='boxes-contents'>";
		break;
		
		case 'whitebox-end':
			return "</div></div>";
		break;
	}
}
function display_autobuild()
{
	html = "<b><center>Budowy w kolejce:</center></b>";
	newdid = get_current_newdid();
	if (localStorage["autobuild_list"])
	{
	buildings = localStorage["autobuild_list"].split('|');
	$(buildings).each(function(i){
		if (this!='')
		{
			building = this.split(',');
			if (building[0]==newdid)
			{
				html+= '<a href="#" onclick="func_autobuild_del('+i+')" style="margin-right:15px;margin-left:5px;"><img alt="cancel" class="del" src="img/x.gif"></a>' + building[3]
				+" <span style='font-size:9px;color:gray'>(site: "+building[1]+")</span>"+"<br>";
			}
		}
	});
	}
	html += "<a href='javascript:if (confirm(\"jesteś pewny?\"))func_autobuild_clear()'>Wyczyść</a> | ";
	html += "<a href='javascript:if (confirm(\"jesteś pewny?\"))func_autobuild_clear_all()'>Wyczyść wszystkie wioski</a> | ";
	html += "<a href='javascript:func_build_next()'>Buduj następny</a>";
	//
	$('#content').append(display_common('whitebox-start')+html+display_common('whitebox-end'));
}

function page_buildings()
{
	if (localStorage["autobuild_list"])
	{
		list = localStorage["autobuild_list"].split('|');
		newdid = get_current_newdid();
		$(list).each(function(i)
		{
			building = this.split(',');
			
			if (building[0]==newdid && building[1]>=19)
			{
				div = $('#levels div.aid'+building[1]);
				$(div).append('<span style="color:red;">+</span>');
			}
			
			var imgPos = $('#village_map img:nth-child('+(building[1]-17)+')');
			if($(imgPos).attr('class')=='building iso')
			{
				$(imgPos).attr('class','building g'+building[2]+'b');
			}
		});
	}
}

var g_buildingLevels = [];
function page_resources_fix_empty(positions)
{
	var map = $('#village_map');
	var divs = $('#village_map div.level');

	if(divs)
	{
		var j = 0;
		$(divs).each(function(i){
			if ($(this).attr("style")==positions[j])
			{
				$(map).append('<div id="res'+(j+1)+'" style="'+positions[j]+'" class="level">'+$(this).html()+'</div>');
				g_buildingLevels[j+1] = parseInt($(this).html());
			}
			else
			{
				while ($(this).attr("style")!=positions[j] && (j < 19))
				{
					$(map).append('<div id="res'+(j+1)+'" style="'+positions[j]+'" class="level">0</div>');
					g_buildingLevels[j+1] = 0;
					j++; 
				}
				$(map).append('<div id="res'+(j+1)+'" style="'+positions[j]+'" class="level">'+$(this).html()+'</div>');
			}
			j++; 
			
			$(this).remove();
		})
		if (j<=17)
			while (j<=17) { 
				$(map).append('<div id="res'+(j+1)+'" style="'+positions[j]+'" class="level">0</div>'); 
				g_buildingLevels[j+1] = 0;
				j++;
			}
	}
}

function page_resources()
{
	var tmp = [];
	
	var positions = [];
	positions[0] = "left:179px;top:79px;";
	positions[1] = "left:269px;top:80px;";
	positions[2] = "left:337px;top:92px;";
	positions[3] = "left:121px;top:118px;";
	positions[4] = "left:234px;top:131px;";
	positions[5] = "left:291px;top:138px;";
	positions[6] = "left:376px;top:136px;";
	positions[7] = "left:61px;top:169px;";
	positions[8] = "left:142px;top:170px;";
	positions[9] = "left:332px;top:170px;";
	positions[10] = "left:419px;top:170px;";
	positions[11] = "left:69px;top:230px;";
	positions[12] = "left:142px;top:220px;";
	positions[13] = "left:278px;top:256px;";
	positions[14] = "left:400px;top:225px;";
	positions[15] = "left:173px;top:310px;";
	positions[16] = "left:264px;top:315px;";
	positions[17] = "left:354px;top:292px;";

	page_resources_fix_empty(positions);
	
	
	if (localStorage["autobuild_list"])
	{
		var list = localStorage["autobuild_list"].split('|');
		newdid = get_current_newdid();
		
		
		$(list).each(function(i)
		{
			building = this.split(',');
			if (building[0]==newdid && building[1]<19)
			{
				$('#res'+building[1]).append('<span style="color:red;">+</span>');
			}
		});
	}
	
	display_autobuild();
	
	var html;
	html = "";
	html += "<a href='#' onclick='func_autobuild_add_res(); return false;'><b><center>Rozbuduj wszystko + 1 lvl</center></b></a>";
	html = display_common('whitebox-small-start')+html+display_common('whitebox-end');
	$('#map_details').append(html);
}

function page_send_army()
{
	
	var boxes = $("#content form input:radio");
	$(boxes[2]).attr('checked',true);
	var t1 = $("#content form input:[name='t1']");
	$(t1).val(5);
}

function page_build_send_res()
{
	code = "<div><a href='#' onclick='func_sendres_onehour(); return false;'>1 hour</a></div><br style='clear:both'>";
	$('#send_select').parent().prepend(code);
}
unsafeWindow.func_sendres_onehour = function(eventTarget, eventArgument)
{
	if (localStorage["currentProduction"])
	{
		currentProduction = localStorage["currentProduction"].split(',');
		for (i=1;i<=4;i++)
		{
			$('#r'+i).val(unsafeWindow.resources.production["l"+i]);
		}
	}
}

function get_max_building_level_by_id(id,currentLevel)
{
	if (localStorage["autobuild_list"])
	{
		list = localStorage["autobuild_list"].split('|');
		newdid = get_current_newdid();
		var lvl = currentLevel;
		$(list).each(function(i)
		{
			building = this.split(',');
			
			if (building[0]==newdid && building[1]==id)
			{
				lvl++;
			}
		});
		return lvl;
	} else return currentLevel;
}
function page_build_upg()
{
	newdid = get_current_newdid();
	id = get_current_build_location();

	gid = 0;
	lvl = $('#content h1.titleInHeader span.level').text().split(' ')[1];
	lvl = parseInt(lvl)+1;
	name = $('#build .build_desc img').attr('alt');
	name = name.replace("'","\'") + ' ' + get_max_building_level_by_id(id,lvl);
	$('#contract').append('<br><br><a href="javascript:func_autobuild_add('+newdid+','+id+','+gid+',\''+name+'\')"><b> + Dodaj do kolejki budowy</b></a></div>');
}
function page_build_new()
{
	newdid = get_current_newdid();
	id = get_current_build_location();
	$('#build .build_desc').each(function() {
		name = $(this).prev().html();
		name = name.replace("'","\\'");
		temp = $('img',this).attr('class');
		gid = temp.match(/g(\d+)$/)[1];
		$(this).append('<br><br><a href="javascript:func_autobuild_add('+newdid+','+id+','+gid+',\''+name+'\')"><b> + Dodaj do kolejki budowy</b></a></div>');
		});
}
unsafeWindow.func_autobuild_add = function(newdid,id,gid,name)
{
	if(localStorage["autobuild_list"])
		localStorage["autobuild_list"] += '|'+newdid+','+id+','+gid+','+name;
	else  localStorage["autobuild_list"] = newdid+','+id+','+gid+','+name;
 	if (id>=19)
 		window.location.href='dorf2.php';
 	else window.location.href='dorf1.php';

}
unsafeWindow.func_autobuild_add_res = function()
{
	newdid = get_current_newdid();
	for (i=1;i<=18;i++) {
		if (g_buildingLevels[i]) lvl = g_buildingLevels[i]+1;
			else lvl = 1;
		name = $('#rx :nth-child('+i+')').attr('alt');
		arr = name.split(' ');
		arr.splice(arr.length-2,2);
		name  = arr.join(' ') + " " + lvl;
		unsafeWindow.func_autobuild_add(newdid,i,0,name)
	}
}

function display_coords_actions(x,y)
{
		code = " (";
		
		code += "<a class='custom' href='a2b.php?x="+x+"&y="+y+"'><img height='12' src='gpack/travian_Travian_4.0_Grisu/img/a/att_all.gif'></a> &nbsp;";
		code += "<a class='custom' href='karte.php?x="+x+"&y="+y+"'><img height='12' src='gpack/travian_Travian_4.0_Grisu/img/hero/danger.gif'></a> &nbsp;";
		code += "<a class='custom' href='build.php?gid=17&x="+x+"&y="+y+"'><img src='gpack/travian_Travian_4.0_Grisu/img/a/resAll-ltr.gif'></a>";
		code += ") ";
		return code;
}

function page_messages_read()
{
	var content = $('#message').html();
	var res = content.match(/\(?\s?\-?\d+\s?[\||\\|\/]\s?\-?\d+\s?\)?/g);
	res = uniqueArr(res);
	$(res).each(function(i){
		coords = res[i].match(/\-?\d+/g);
		x = coords[0];
		y = coords[1];
		code = res[i]+display_coords_actions(x,y);
		var regex = new RegExp(escape_RegEx(res[i]),"g");
		content = content.replace(regex,code);
		$('#message').html(content);
	});
}
function check_login_ajax(data)
{
	if (data.search('id="login_form"')!==-1)
	{
		window.location.href='dorf1.php';
		return false;
	}
	return true;
}

function check_login()
{
	if(document.getElementById('login_form'))
	{
		document.getElementsByTagName('form')[0].submit();
		return false;
	}
	return true;
}

function all_pages()
{
	
	if (localStorage["currentProduction"])
	{
		var tmp;
		
		var j=0;
		for (i in unsafeWindow.resources.production)
		{
			j++;
			tmp = $('#'+i).html();
			tmp = tmp.split('/');
			
			resourceCurrent = parseInt(tmp[0]);
			resourceMax = parseInt(tmp[1]);

			resourceLeftToFill = resourceMax - resourceCurrent;
			timeLeft = resourceLeftToFill / unsafeWindow.resources.production[i];
			if (timeLeft)
			{
				if (timeLeft<9) color = 'red';
				else color = 'green';
				timeLeft = timeLeft.toFixed(2);
				var html = "<span style='color:"+color+";font-size:9px;position:absolute;top:1px;left:20px;'>("+timeLeft+")</span>";
				$('#res li.r'+j+' p').append(html);
			}
		}
	}
	
	villagesCoords = storage_get_villagescoords();
	if (villagesCoords)
	{

		$('#villageList li.entry').each(function(){
			resVilageHref=$(':first',this).attr('href');
			newdid = resVilageHref.match(/\\?newdid=(\d+)/)[1];
			if (villagesCoords["v"+newdid])
			{
				coords = villagesCoords["v"+newdid].split(',');
				$(this).append(display_coords_actions(coords[0],coords[1]));
			}
		})
		css = "#side_info .listing ul a {width:auto !important;display:inline;margin-left:0px;}";     
		css += "#side_info .listing ul img {height:12px;}";
		css += "#side_info .listing ul li {height:auto;}";
		addGlobalStyle(css);
	}	
			
	
}

///INTERVAL
unsafeWindow.func_process_autobuild = function()
{
	if (localStorage["autobuild_list"])
	{
		build_next();
	} 
}
var interval = setInterval('func_process_autobuild()',60000);