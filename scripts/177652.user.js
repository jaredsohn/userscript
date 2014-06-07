// ==UserScript==
// @name           mine travian
// @namespace      http://tanatos.no-ip.info/
// @include        http://t*.travian.*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

//building IDs
//


/*SOME COMMON FUCS*/
var runtimeCache = {};
function cache_get(index)
{
	return runtimeCache[index];
}
function cache(index,value)
{
	if (value)
	{
		runtimeCache[index] = value;
	}
	return runtimeCache[index];
}

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

function getURLParameters()
{
	if(cache_get("urlParameters")) 
	{
		return cache_get("urlParameters");
	}
	
	var url = window.location.toString();
	url.match(/\?(.+)$/);
	var params = RegExp.$1;
  var params = params.split("&");
  var queryStringList = {};
 
	for(var i=0;i<params.length;i++)
	{
	    var tmp = params[i].split("=");
	    queryStringList[tmp[0]] = unescape(tmp[1]);
	}

	cache("urlParameters",queryStringList);
	return queryStringList;
}

/////////////////////////////

/*COMMON INFO GETTERS*/
function fetch_active_href()
{
	//alert($('#villageList li.active').attr('title'));
	return $('#sidebarBoxVillagelist a.active').attr('href');
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
/////////////////////////////


/*PAGE HANDLER*/
$(document).ready(function() {  
	var href = window.location.toString();

	var page = href.match(/\/([^\/]+)\.php/)[1];
	
	if (!check_login()) return false;
	
	switch(page)
	{
	case '/dorf1':
		page_resources();
	break;
	
	case '/dorf2':
		display_autobuild();
		page_buildings();
		
	break;
	
	case 'a2b':
		if (href.search("a2b.php")!==-1) page_send_army();
	break;
	
	case 'berichte':
		page_reports();
	break;
	  
	case 'nachrichten':
		if (href.search("nachrichten.php\\?id")!==-1) page_messages_read();
	break;
	
	case 'build':
		urlParameters = getURLParameters();

		if (urlParameters['gid']=='17') 
		{
			page_build_send_res();
		}
		if (urlParameters['id']) 
		{
			gid = $('#build').attr('class');
			//id = href.match(/id=(\d+)/)[1];
			if (gid == "gid0") { page_build_new(); break; }
			page_build_upg();
		}
		if (urlParameters['tt']==99) 
		{
			bounty = 0;
			$('#raidList table.list td.lastRaid img:nth-child(2)').each(function(){
				alt = $(this).attr('alt');
				bounty += parseInt(alt.match(/(\d+)/)[1]);
				});
			$('#raidList table.list').append('<tr><td></td><td></td><td></td><td></td><td></td><td>Total: '+bounty+'</td><td></td></tr>');
		}
		
	break;
	
	case 'spieler':
		if (href.search("s=2")!==-1)
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


/////////////////////////////
function page_profile()
{
	//Logged player profile page (only he has menu in profile page)
	//if ($('#content :nth-child(2)').attr('class') == 'contentNavi subNavi')
	//{
	//	
	//}
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

/////////////////////////////
unsafeWindow.func_mark_all_read = function()
{
	$('#overview td.sub').each(function (i){
		
		html = $('div:first',this).html();
		if (html.search(/\(([^\d]+)\)/)!==-1)
		{
			href = $('div:first a:last',this).attr('href');
			$.get(href);
		}

	});
}

function page_reports()
{
	$('#overview td.sub').each(function (i){
		
		txt = $('div:first img',this).attr('alt');
		txt = '<span style="float:right;margin-right:10px;">'+txt+'</span> &nbsp;';
		$('div:first',this).append(txt);

	});
	
	html = "<input onclick='func_check_all(this)' type='checkbox' class='check' style='float:left;margin-left:4px;'>";
	$('#overview th:first').prepend(html);
	
	html = '<br><br><a href="#" onclick="func_mark_all_read(); return false;">Mark all as read</a>';
	
	$(html).insertAfter('#del');
	
	css = 'div.paginator { font-size: large ! important; }';
	css += 'div.paginator a { display:inline-block;border:1px solid gray; padding:3px; }';
	addGlobalStyle(css);
}
/////////////////////////////
unsafeWindow.func_autobuild_clear_all = function()
{
	localStorage["autobuild_list"]='';
	window.location.href='/dorf1.php';
}
unsafeWindow.func_autobuild_del = function(index)
{
	if (!localStorage["autobuild_list"]) return false;
	var newdid = get_current_newdid();
	var list = localStorage["autobuild_list"].split('|');
	list.splice(index,1);
	localStorage["autobuild_list"] = list.join('|');
	window.location.href='/dorf1.php?newdid='+newdid;
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
	window.location.href='/dorf1.php?newdid='+newdid;
}
unsafeWindow.func_build_next = function()
{
	build_next();
	//setTimeout("window.location.href='/dorf1.php'",1000);
}

unsafeWindow.build_index = function(index)
{
	if (!localStorage["autobuild_list"]) return false;
	var list = localStorage["autobuild_list"].split('|');
		building = list[index].split(',');
		if (building)
		{
			//alert(building);
			$.get('build.php?newdid='+building[0]+'&id='+building[1], function(data) {
  			//window.location.href = '/dorf1.php?a=3&amp;c=5bbc57';
  			
  			if (!check_login_ajax(data)) return false;
  			/*class="build" onclick="window.location.href = '/dorf2.php?a=23&amp;id=32&amp;c=d6e37b'; return false;"*/
  			//<div id="build" class="gid0">
  			
  			//check if it is new building
  			if (data.match(/<div id="build" class="gid0">/))
  			{
  				var regex = new RegExp('class="green new" onclick="window.location.href = \'/dorf2.php\\?a='+building[2]+'&amp;id='+building[1]+'&amp;c=(.*)\';',"");
  				session = data.match(regex);
  				//session = data.match(/class="build" onclick="window.location.href = '(.*)';/);
  				if (session) build_href = "/dorf2.php?a="+building[2]+"&id="+building[1]+"&c="+session[1];
  			}
  			else // else upgrading
  			{
 	 				build_href = data.match(/class="green build" onclick="window.location.href = '(.*)';/);
 	 				if (build_href) build_href = build_href[1];
 	 		}	

			if (build_href)
			{	
				url= build_href.replace(/\&amp;/g,'&');
				$.get(url, function() {
					list.splice(index,1);
					localStorage["autobuild_list"] = list.join('|');
					//window.location.href='/dorf1.php';
				});
				//
			}
			});
		}
}
function build_next()
{
	//window.location.href = '/dorf1.php?a=14&amp;c=5bbc57';
	if (!localStorage["autobuild_list"]) return false;
	var list = localStorage["autobuild_list"].split('|');
	var listIndexesTryingToBuild = [];
	var listNewdids = []; // cities which have autobuild list
	var tmpnewdid;
	$(list).each(function (i){
		
		tmpnewdid = this.substr(0,this.indexOf(","));
		if ($.inArray(tmpnewdid,listNewdids) != -1) return 1;
		listNewdids.push(tmpnewdid);
		listIndexesTryingToBuild.push(i);
	});
	//alert(listIndexesTryingToBuild);
	//first = list.shift();
	//if (!first) return false;
	//if (first)
	
	$(listIndexesTryingToBuild).each(function (i)
	{
		if (i==0) unsafeWindow.build_index(this);
		else {
			var randomnumber=Math.floor(Math.random()*Math.random()*10001)+3000;
			setTimeout("build_index("+this+")",randomnumber);
		}
	});

	/*if (id<19) isResourceField = true;
		else isResourceField = false;*/
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
	if (!localStorage["autobuild_list"]) return false;
	html = "Auto-build queue: <br>";
	newdid = get_current_newdid();
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
	html += "<a href='javascript:if (confirm(\"are you sure?\"))func_autobuild_clear()'>Clear</a> | ";
	html += "<a href='javascript:if (confirm(\"are you sure?\"))func_autobuild_clear_all()'>Clear all villages</a> | ";
	html += "<a href='javascript:func_build_next()'>Build Next</a>";
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
				
				var imgPos = $('#village_map img:nth-child('+(building[1]-17)+')');
				if($(imgPos).attr('class')=='building iso')
				{
					$(imgPos).attr('class','building g'+building[2]+'b');
				}
				
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
	//if (!localStorage["currentProduction"]) localStorage["currentProduction"] = [];
	var tmp = [];
	/*$("#production td.num").each(function(i){
		tmp[i] = (parseInt($(this).html()));
	});
	localStorage["currentProduction"] = tmp.join(',');*/
	
	var positions = [];
	positions[0] = 	"left: 179px; top:78px;";
	positions[1] = 	"left: 269px; top:79px;";
	positions[2] = 	"left: 337px; top:91px;";
	positions[3] = 	"left: 121px; top:117px;";
	positions[4] = 	"left: 234px; top:130px;";
	positions[5] = 	"left: 291px; top:137px;";
	positions[6] = 	"left: 376px; top:135px;";
	positions[7] = 	"left: 61px; top:168px;";
	positions[8] = 	"left: 142px; top:169px;";
	positions[9] = 	"left: 332px; top:169px;";
	positions[10] = "left: 419px; top:169px;";
	positions[11] = "left: 69px; top:229px;";
	positions[12] = "left: 142px; top:219px;";
	positions[13] = "left: 278px; top:255px;";
	positions[14] = "left: 400px; top:224px;";
	positions[15] = "left: 173px; top:309px;";
	positions[16] = "left: 264px; top:314px;";
	positions[17] = "left: 354px; top:291px;";

	page_resources_fix_empty(positions);
	
	
	if (localStorage["autobuild_list"])
	{
		var list = localStorage["autobuild_list"].split('|');
		newdid = get_current_newdid();
		
		//var upgradinglist = [];
		//for(i=1;i<=18;i++) upgradinglist[i] = 0;
		
		$(list).each(function(i)
		{
			building = this.split(',');
			if (building[0]==newdid && building[1]<19)
			{
				//upgradinglist[building[1]]++;
				//div = $('#village_map div.level:nth-child('+building[1]+')');
				$('#res'+building[1]).append('<span style="color:red;">+</span>');
			}
		});
		/*for(i=1;i<=18;i++) if (upgradinglist[i]>0)
		{
			currentLevel = parseInt($('#res'+i).html());
			$('#res'+i).append(' <span style="color:red;">'+(currentLevel+upgradinglist[i])+'</span>');
		}*/
	}
	
	display_autobuild();
	
	var html;
	html = "Tools: <br>";
	html += "<a href='#' onclick='func_autobuild_add_res(); return false;'>Resources auto-build</a>";
	html = display_common('whitebox-small-start')+html+display_common('whitebox-end');
	$('#map_details').append(html);
}

///////////////
//javascript:func_repeat_attack()
unsafeWindow.func_pausecomp = function(millis)
{
var date = new Date();
var curDate = null;

do { curDate = new Date(); }
while(curDate-date < millis);
} 
unsafeWindow.func_send_all = function()
{
	var attacks = [];
	//////////////L  P   I    EL II   IC R   C  S  St H  Attack Type(c)
	attacks.push([0 ,0  ,600 ,0 ,280 ,0 ,15 ,5 ,0 ,0 ,1 ,3						 ]);
	attacks.push([0 ,0  ,10  ,0 ,0   ,0 ,0  ,5 ,0 ,0 ,0 ,3						 ]);
	attacks.push([0 ,0  ,10  ,0 ,0   ,0 ,0  ,5 ,0 ,0 ,0 ,3						 ]);
	attacks.push([0 ,0  ,10  ,0 ,0   ,0 ,0  ,5 ,0 ,0 ,0 ,3						 ]);
	attacks.push([0 ,0  ,10  ,0 ,0   ,0 ,0  ,5 ,0 ,0 ,0 ,3						 ]);
	attacks.push([0 ,0  ,10  ,0 ,0   ,0 ,0  ,5 ,0 ,0 ,0 ,3						 ]);
	attacks.push([0 ,0  ,10  ,0 ,0   ,0 ,0  ,5 ,0 ,0 ,0 ,3						 ]);
	attacks.push([0 ,0  ,10  ,0 ,0   ,0 ,0  ,5 ,0 ,0 ,0 ,3						 ]);

	for (i in attacks)
	{
		
		unsafeWindow.func_send_attack(attacks[i]);
		if (i==0) unsafeWindow.func_pausecomp(500);
	}
}
unsafeWindow.func_send_attack = function(arr)
{
	var frm = $('#content form');
	//var fieldNames = ["b","c","dname","s1","t1","t10","t11","t2","t3","t4","t5","t6","t7","t8","t9","timestamp","timestamp_checksum","x","y"];
	timestampField = $("input:[name='timestamp']",frm).val();
	var fields = [];
	$("input",frm).each(function(){
			if ($(this).attr('name')=='c') return;
			//alert($(this).attr("name"));
			//alert($(this).val());
			//return false;
				fields[$(this).attr("name")] = $(this).val();
			});
	fields["c"] = $('input:radio[name=c]:checked',frm).val();
	fields["s1"] = "ok";
	if (arr)
	{
		for (i=1;i<=11;i++) fields['t'+i] = arr[i-1];
		fields['c'] = arr[11];
	}

			
	if (fields["x"]=="" || fields["y"]=="")
	{
		alert("Enter x,y");
		return;
	}
	
	str = [];
	for (i in fields)
	{
		str.push(i+"="+fields[i]);
	}
	str = str.join('&');

	$.post('a2b.php', str , function(data){
			str = [];
			a = data.match(/name="a"\r\n\tvalue="(\d+)"/m)[1];
			kid = data.match(/name="kid"\r\n\tvalue="(\d+)"/m)[1];
			id = data.match(/name="id"\r\n\tvalue="(\d+)"/m)[1];
			fields["a"] = a;
			fields["kid"] = kid;
			fields["id"] = id;
			
			str.push("a="+a);
			str.push("kid="+kid);
			str.push("id="+id);
			fieldNames = ["c","s1","timestamp","timestamp_checksum"];
			for (i in fieldNames)
			{
				str.push(fieldNames[i]+"="+fields[fieldNames[i]]);
			}
			fieldNames = ["t1","t10","t11","t2","t3","t4","t5","t6","t7","t8","t9"];
			for (i in fieldNames)
			{
				val = fields[fieldNames[i]]=="" ? 0 : fields[fieldNames[i]];
				str.push(fieldNames[i]+"="+val);
			}
			if (fields["c"]==3 && parseInt(fields["t8"])>1)
			{
				str.push("kata=99");
			}
			
			str = str.join('&');
			$.post('a2b.php', str);
		})
}
unsafeWindow.func_repeat_attack = function()
{
	//var str = $('#content form').serialize();
	var arrs = [];
	for (i=0;i<5;i++)
	{
		$.ajax({
		  url: "a2b.php",
		  async: false,
		  cache: false,
		  success: function(data){
		  	//alert(data);
				timestamp = data.match(/name="timestamp"\r\n\tvalue="(\d+)"/m)[1];
				timestamp_checksum = data.match(/name="timestamp_checksum"\r\n\tvalue="([\da-fA-F]+)"/m)[1];
				arrs[i] = [timestamp,timestamp_checksum];
				
		  }
		});
		unsafeWindow.func_pausecomp(2000);
	}
	for (i=0;i<5;i++)
	{
		timestampField = $("#content form input:[name='timestamp']");
		timestampField.val(arrs[i][0]);
		timestampChecksumField = $("#content form input:[name='timestamp_checksum']");
		timestampChecksumField.val(arrs[i][1]);
		$.post("a2b.php", $('#content form').serialize());
		unsafeWindow.func_pausecomp(2000);
	}
	
	/*for (i=0;i<5;i++)
	{
		$.post("a2b.php", str);
	}*/
}
function page_send_army()
{
	if ($('#enterVillageName').length > 0)
	{
		var boxes = $("#content form input:radio");
		$(boxes[2]).attr('checked',true);
		var t1 = $("#content form input:[name='t1']");
		$(t1).val(5);
		
		var html = "<a href='#' onclick='func_send_attack()'>repeat attack</a>";
		$('#content').append(html);
	}  else {

	}
	//[name="newsletter"]
}

///////////////
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

////////////////////////////////////
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
	$('#contract').append('<br><br><a href="javascript:func_autobuild_add('+newdid+','+id+','+gid+',\''+name+'\')"> + Add to build list</a></div>');
}
function page_build_new()
{
	//temp = $('#villageList a.active').attr('href');
	//id = temp.match(/&id=(\d+)/)[1];
	//newdid = temp.match(/\\?newdid=(\d+)/)[1];
	newdid = get_current_newdid();
	id = get_current_build_location();
	$('#build .build_desc').each(function() {
		name = $(this).prev().html();
		name = name.replace("'","\\'");
		temp = $('img',this).attr('class');
		gid = temp.match(/g(\d+)$/)[1];
		$(this).append('<br><br><a href="javascript:func_autobuild_add('+newdid+','+id+','+gid+',\''+name+'\')"> + Add to build list</a></div>');
		});
}
unsafeWindow.func_autobuild_add = function(newdid,id,gid,name)
{
	if(localStorage["autobuild_list"])
		localStorage["autobuild_list"] += '|'+newdid+','+id+','+gid+','+name;
	else  localStorage["autobuild_list"] = newdid+','+id+','+gid+','+name;
 	if (id>=19)
 		window.location.href='/dorf2.php';
 	else window.location.href='/dorf1.php';

}
unsafeWindow.func_autobuild_add_res = function()
{
	newdid = get_current_newdid();
	for (i=1;i<=18;i++) {
		if (g_buildingLevels[i]) lvl = g_buildingLevels[i]+1;
			else lvl = 1;
		if (lvl>10) continue;
		name = $('#rx :nth-child('+i+')').attr('alt');
		arr = name.split(' ');
		arr.splice(arr.length-2,2);
		name  = arr.join(' ') + " " + lvl;
		unsafeWindow.func_autobuild_add(newdid,i,0,name)
	}
	/*$('#rx').children().each(function(){
		
		});*/
	//alert(g_buildingLevels);
	//alert($('#rx area:nth-child(1)').getTitle());
	//unsafeWindow.Travian.Tip.show("test");
}
///////////////

function display_coords_actions(x,y)
{
		code = " (";
		
		code += "<a class='custom' href='build.php?tt=2&id=39&x="+x+"&y="+y+"'><img src='img/x.gif' class='att_all'></a> &nbsp;";
		code += "<a class='custom' href='karte.php?x="+x+"&y="+y+"'><img src='img/x.gif' class='adventureDifficulty1'></a> &nbsp;";
		code += "<a class='custom' href='build.php?gid=17&t=5&x="+x+"&y="+y+"'><img src='img/x.gif' class='rAll'></a>";
		//resAll-ltr
		//code += "<a target='_blank' class='custom' href='a2b.php?x="+x+"&y="+y+"'><img class='att_all' src='img/x.gif'></a> &nbsp;";
		//code += "<a target='_blank' class='custom' href='karte.php?x="+x+"&y="+y+"'><img class='adventureDifficulty3' src='http://ts5.travian.bg/img/x.gif'></a> &nbsp;";
		//code += "<a target='_blank' class='custom' href='build.php?gid=17&x="+x+"&y="+y+"'><img class='iReport iReport14' src='http://ts5.travian.bg/img/x.gif'></a>";
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
		//http://ts5.travian.bg/build.php?gid=17&x=127&y=-53
		var regex = new RegExp(escape_RegEx(res[i]),"g");
		content = content.replace(regex,code);
		//http://ts5.travian.bg/a2b.php?x=126&y=-53
		//alert(coords);
		$('#message').html(content);
	});
}
function check_login_ajax(data)
{
	if (data.search('id="login_form"')!==-1)
	{
		window.location.href='/dorf1.php';
		return false;
	}
	return true;
}

function check_login()
{
	//relogin
	if(document.getElementById('login_form'))
	{
		document.getElementsByTagName('form')[0].submit();
		return false;
	}
	return true;
}

function all_pages()
{
	

		//alert(localStorage["currentProduction"]);
		var tmp;
		//var currentProduction = localStorage["currentProduction"].split(',');
		
		var j=0;

		for (i in unsafeWindow.resources.production)
		{
			if (j==4) continue;
			j++;
			tmp = $('#'+i).html().replace(",","");
			//tmp = tmp.split('/');
			
			resourceCurrent = parseInt(tmp);
			if (j<=3)
				resourceMax = parseInt($('#stockBarWarehouse').html().replace(",",""));
			else 
				resourceMax = parseInt($('#stockBarGranary').html().replace(",",""));

			resourceLeftToFill = resourceMax - resourceCurrent;
			if (unsafeWindow.resources.production[i]>0) timeLeft = resourceLeftToFill / unsafeWindow.resources.production[i];
				else timeLeft = resourceCurrent / unsafeWindow.resources.production[i]
			if (timeLeft)
			{
				if (timeLeft<9) color = 'red';
				else color = 'green';
				timeLeft = timeLeft.toFixed(2);
				var html = "<span style='color:"+color+";font-size:9px;background-color:white;border:1px solid black;'>("+timeLeft+")</span>";
				//$('#res li.r'+j+' p').append(html);
				$('#stockBarResource'+j).append(html);
			}
		}

	
	villagesCoords = storage_get_villagescoords();
	if (villagesCoords)
	{
		$('#sidebarBoxVillagelist ul li').each(function(){
			resVilageHref=$(':first',this).attr('href');
			newdid = resVilageHref.match(/\\?newdid=(\d+)/)[1];
			if (villagesCoords["v"+newdid])
			{
				coords = villagesCoords["v"+newdid].split(',');
				$('a div.name',this).append(display_coords_actions(coords[0],coords[1]));
			}
		})
		css = "#sidebarBoxVillagelist ul li a.custom {width:auto !important;display:inline;margin-left:0px;padding:0px;}";     
		css += "#sidebarBoxVillagelist ul li a.custom img {position:static;width:16px;height:16px;}";     
		//css += "#side_info .listing ul img {height:12px;}";
		//css += "#side_info .listing ul li {height:auto;line-height:16px;}";
		addGlobalStyle(css);
	}	
			
	//var content = $('#content').html();
	//alert(content.search(/<a href="karte.php\\?d=(\d+)/g));
	//content.replace('|<a href="karte.php?d=(\d+)">(.+)</a>|g', "$2, $1");
	//$('#content').html(content);
	//<a href="karte.php?d=364985">пїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅ пїЅпїЅ Ploner</a>
	
}

///INTERVAL
unsafeWindow.func_process_autobuild = function()
{
	if (localStorage["autobuild_list"])
	{
		build_next();
	} 
}
//build_next();
var interval = setInterval('func_process_autobuild()',60000);

///////////////
