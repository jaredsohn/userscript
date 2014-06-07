// ==UserScript==
// @name           Build Helper
// @namespace      N/A
// @description    Build helper for KoC
// @include        *.http://apps.facebook.com/gloryofrome/*
// @include        *.http://apps.facebook.com/gloryofrome/?ref=bookmarks&count=0*
// Using part of KoC WideMap
// Version 1.1.8
// July 20, 2010
// Copyright (c) 2010, Lone Hood
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

//Remove right edge.
$('#mod_maparea div.maparea_rrail').remove();

//Fixed frame - no scroll.
$('#mainbody').css('position','fixed');

//Keep Facebook chat on top
$('#pagelet_presence').css('opacity', '1');

//Maximize usable area
$('#kochead').css('height','40px');
$('#kochead img.chrome_logo').css('height','46px');
$('#kochead img.chrome_logo').css('width','224px');
$('#maparea_rec').css('height','18px');
$('#kocmain div.friendlist_holder').css('top','1325px');

//Remove ads
$('#sidebar_ads').remove();
$('#canvas_nav_content').remove();

//Removes the block on the build helper, wide map and build queue.
$('#app_content_130402594779 .canvas_iframe_util').css('overflow','visible');
$('#app_content_130402594779 .canvas_iframe_util').css('width','1700px');
$('#content div').width($(window).width());
$('#content div div').width($(window).width());
$('#app_content_130402594779 div div div iframe').width($(window).width());

/////////////////////////////////////////////////////////////////////////
//Everything beneath this line until otherwise stated is not necessary.//
/////////////////////////////////////////////////////////////////////////
//Please keep this code if you wish to use the widemap feature.
//
//Black background and other unecessary display stuff.
document.body.style.background = "#000000";
$('#kocmain_bottom div.mod_directory div.directory_head a.button25').remove();
$('#kocmain_bottom div.mod_directory div.directory_head a.button25 span').remove();
$('#kocmain_bottom div.mod_directory div.directory_head a.button25:hover').remove();
$('#kocmain_bottom div.mod_directory div.directory_head a.button25').remove();
$('#kocmain .mod_directory .directory_tabs').css('backgroundColor','#000000');
$('#cityinfo_tabs').css('backgroundColor','#000000');
$('#kocmain .mod_directory .directory_head').css('backgroundColor','#000000');
$('#kocmain .mod_directory .directory_head').css('height','70px');
$('#kocmain .mod_cityinfo .cityinfo_head').css('backgroundColor','#000000');
$('#kocmain .mod_cityinfo .cityinfo_head').css('height','70px');
$('#kocmain_bottom .mod_comm .directory_head').css('backgroundColor','#000000');
$('#kocmain_bottom .mod_comm .comm_tabs').css('backgroundColor','#000000');
$('#kocmain_bottom .mod_comm .comm_tabs').css('width','353px');
$('#kocmain .mod_maparea .mod_citylist').css('height','0px');
$('#kocmain .mod_maparea .maparea_main').css('backgroundColor','#FFFFFF');

//Shade the 'Chat Rules'
$('#mod_comm_list2 div').css('backgroundColor','#988888');

//Color the background of lower selection tabs
$('#comm_tabs').css('width','350px');
$('#kocmain_bottom div.mod_directory div.directory_head').clone().prependTo('#kocmain_bottom div.mod_comm');
$('#kocmain_bottom div.mod_comm div.directory_head a').remove();


//Remove 'get gems' because you can find it with another button
$('#kochead div.get_gem_info div.gemgetmore').remove();


//Slide Troop movement timer down a bit
$('#mod_untqueue').css('bottom','-35px');
$('#mod_untqueue').css('left','0px');
$('#mod_untqueue').css('border','thin solid #A56631');


//Move building and training queue down a bit
$('#mod_queue').css('bottom','-120px');
$('#mod_queue').css('right','-271px');
$('#mod_queue').css('border','thin solid #A56631');
$('#maparea_city').css('height','465px');
$('#maparea_fields').css('height','465px');
$('#maparea_map').css('height','465px');
$('#mapwindow').css('height','465px');

//Maximize chat box
$('#kocmain_bottom').css('height','70px');
$('#kocmain div.mod_comm div.comm_body').css('margin-top','34px');
$('#kocmain').css('background-color', '#FAF6DC');
$('#kocmain_bottom div.mod_comm div.comm_global div.chatlist').css('height','587px');


//Move foreign Merlin box down
$('#kocmain .mod_comm .mod_comm_mmb').remove();


//Bring overview over
$('#mod_cityinfo div.cityinfo_head div.hd a.button14').css('left','-404px');
$('#mod_cityinfo div.cityinfo_head div.hd a.button14').css('top','-548px');
$('#mod_cityinfo div.cityinfo_head div.hd a.button14').css('font-size','14px');


//Maximize Alliance view
$('#directory_tabs_2_members').css('height','600px');


//Remove faulty alliance info
$('#directory_tabs_2_allianceInfo').remove();


//Fix the sliver between chat and alliance tabs
$('#kocmain_bottom div.mod_directory').css('left','360px');


//Increase city name font-size
$('#mod_cityinfo_cityname').css('font-size','20px');
$('#mod_cityinfo_cityname').css('padding-top','32px');
//$('#mod_cityinfo_cityname').css('text-align','left');


//Decrease cityinfo tab font size
$('#cityinfo_tabs a').css('font-size','9px');
$('#queue_head_building').css('font-size','9px');


//Maximize Knight view
$('#cityinfo_2').css('height','620px');

//More info at a glance
$('#cityinfo_1 div.upsell a.button20').remove();
$('#fbFanBox').remove();
$('#cityinfo1').css('backgroundColor','tan');
$('#cityinfo1').css('height','270px');

//Move Leaderboard button and make it a bit bigger
$('#kocmain_bottom div.mod_directory div.directory_head').append($('#kocmain div.panel_friendlist div.leader_board table tbody tr td a'));
$('#kocmain_bottom div.mod_directory div.directory_head a').addClass('button14');
$('#kocmain_bottom div.mod_directory div.directory_head a').css('left','-190px');
$('#kocmain_bottom div.mod_directory div.directory_head a').css('top','50px');
$('#kocmain_bottom div.mod_directory div.directory_head a').css('font-size','20px');

//Remove lower panel junk
$('#kocmain div.panel_friendlist').remove();
$('#kocmain').css('height','1265px');

//Make the map wider
$('#mapwindow').css('height','485px');
$('#mapwindow').width($(window).width());
$('#mapwindow').css('zIndex','10');
$('#kocmain_bottom').css('zIndex','20');

//Remove 'progress bar'
$('#progressBar').remove();

//Move 'fantasy football' ad down
$('#app_content_130402594779 div div div div').css('top', '1400px');
$('#content div.UIStandardFrame_Container').css('padding-top', '0px');

/////////////////////////////////////////////////////////////////
/////////////EVERYTHING BENEATH THIS MUST BE KEPT////////////////
/////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
// Add script to runtime
////////////////////////////////////////////////////////////////////////////////////
var a = '' + document.location
if(a.match('src/main_src.php') || a.match('debugger.html')){
	addScript(rerun);
	addScript(POCSER);
	addScript(dataHandler);
	addScript(pocData);
	addScript(pocFunctions);
	addScript(pocVariables);
	addScript(timer);
	addScript(dump);
	window.setTimeout('rerun();',4000);
}

////////////////////////////////////////////////////////////////////////////////////
// Runtime Start
////////////////////////////////////////////////////////////////////////////////////

function rerun(){
	//localStorage.clear();
	//initializations
	window.details = false;
	window.tabselected = 'log';
	window.mode = 0;
	window.pocbuildaction = false;
	window.isnotrunning = true;
	window.ispaused = true;
	window.handler = new dataHandler('pocsaves','pocdata');
	var data = handler.getObject('window.pocdata');
	if(data == null){
		alert('POC Helper data does not exist. Creating...');
		window.pocdata = new pocData();
		handler.saveObject(pocdata);
	}else{
		eval(data);
	}
	pocVariables();
	pocFunctions();
	//now remove it
	pocVariables = null;
	pocFunctions = null;
	
	//creategui
	pocgui.addtobody(pochtmls.mainbody);
	
	//dirty inserts ^_^
	document.getElementById('pocinfobox').innerHTML += '<div id="info_log"></div>';
	document.getElementById('pocinfobox').innerHTML += '<div id="info_build"></div>';	
	////////////////////////////////
	// MODS
	////////////////////////////////
	if (typeof (poch_mods) == "undefined"){
		poch_mods = new Array();
		poclog.add('No Mods');
	};
	for(var i=0;i<poch_mods.length;i++){
		var a = poch_mods[i];
		poclog.log('Initializing MOD: ' + a.name + ' v' + a.version);
		poclog.log('-> adding functions');
		a.functions();
		poclog.log('-> adding variables');
		a.variables();
		poclog.log('-> adding tabs');
		document.getElementById('koc_flags').innerHTML += '<a id="flag_'+ a.ident +
							'" onclick="pocgui.tabs.onlick(this)">'+ a.tab +'</a>';
		poclog.log('-> adding info box');
		document.getElementById('pocinfobox').innerHTML += '<div id="info_'+ a.ident + '"></div>';
		poclog.log('-> adding display box');
		pocgui.getdisplay[a.ident] = a.displaybox;
		pocrepaint();
		poclog.log('-> adding controls');
		var b = new a.controls();
		var c = new Array();
		for(var j=0;j<b.button.length;j++){
			var d = b.button[j];
			c.push('<a id="con_'+ d.name +'" class="button20" onclick="pocgui.control.onclick(this)"><span>'+ d.caption +'</span></a>')
			poccontrols[d.name] = d.command;
		}
		pochtmls.controls[a.ident] = c.join('');
		
		poclog.add('-> adding interval');
		pocinterval.push(a.timer);
	}
	
	////////////////////////////////
	// Timer
	////////////////////////////////
	poclog.clear();
	window.setInterval(timer,3000);
	poclog.add('Ready to work!');
}

function pocData(){
	this.log = new Array();
	this.build = new Array();
	this.attack = new Array();
	this.train = new Array();
}

function timer(){
	if(!ispaused && isnotrunning){
		isnotrunning = false;
		for(var i=0;i<seed['cities'].length;i++){
			for(var j=0; j < pocinterval.length;j++){
				pocinterval[j](i);
			}
		}
		isnotrunning = true;
	}
}

function dataHandler(savename,varname){
	this.savename = savename;
	this.varname = varname;
	
	this.saveObject = function(object){
		var serObject = serialize(object, this.varname)
		localStorage.setItem(this.savename, serObject);
	}
	this.getObject = function(varname){
		for (var i=0; i<localStorage.length; i++) {
			var key = localStorage.key(i);
			if(key==this.savename){
				var serObject = localStorage.getItem(this.savename);
				return serObject;
			}
		}
		return null;
	}
	function serialize(object,varname){
		var serializer = new POCSER();
		var objSerializer = new serializer.JSSerializer();
		objSerializer.Prefs.SmartIndent =	true;
		objSerializer.Prefs.ShowLineBreaks =true;
		objSerializer.Prefs.ShowTypes =		true;
		objSerializer.Types.UseNull =		true;
		objSerializer.Types.UseUndefined =	true;
		objSerializer.Types.UseArray =		true;
		objSerializer.Types.UseObject =		true;
		objSerializer.Types.UseBoolean =	true;
		objSerializer.Types.UseDate =		true;
		objSerializer.Types.UseError =		true;
		objSerializer.Types.UseFunction =	false;
		objSerializer.Types.UseNumber =		true;
		objSerializer.Types.UseRegExp =		true;
		objSerializer.Types.UseString =		true;
		objSerializer.Types.UseUserDefined =			true;
		objSerializer.Types.UseObjectsForUserDefined =	false;
		objSerializer.CheckInfiniteLoops =	true;
		objSerializer.MaxDepth =			'';
		objSerializer.Serialize(object);
		return objSerializer.GetJSString(varname);
	}
	
	this.eraseObject = function(){
		localStorage.clear();
	}
	
}

////////////////////////////////////////////////////////////////////////////////////
// POC Functions
////////////////////////////////////////////////////////////////////////////////////

function pocFunctions(){
	window.pocinterval = new Array();
	window.poccontrols = new Array();
	
	window.alert = function(b){
		poclog.add('Alert: ' + b)
		//Modal.showModal(500,400,130,130,'alert','alert daw: ' + a);
		/*
		window.scroll(0,0);
		var a = new Array();
		a.push("<div id='modal_shop_buy_notenough'><div class='infobx'><div class='tp'>" + 
			   b + "</div>" + 
			   "<div class='clearfix btn'><br><a  class='button20' "+
			   "onclick='Modal.hideModal();return false;'><span>" + 
			   "Ok</span></a></div></div></div><br>");
		Modal.showModal(500, 400, 130, 10, 'Alert', a.join(""))
		*/
	};
	window.poclog = new Object();
	window.poclog.log = function(a){
		poclog.add(a);
		handler.saveObject(pocdata);
	};
	window.poclog.add = function(a){
		var added = false;
		var d = pocdata.log;
		var i = (d.length - 1);
		if(d.length > 0 ){
			if(d[i].data==a){
				if(pocdata.log[i].count){
					pocdata.log[i].count +=1;
				}else{
					pocdata.log[i].count = 2;
				}
				added = true;
			}
		}
		if(!added){
			var c = new Object();
			c.time = unixtime();
			c.data = a;
			pocdata.log.push(c);
		}
		//handler.saveObject(pocdata);
		pocupdatedisplay();
	};
	window.poclog.clear = function(){
		pocdata.log = new Array();
		handler.saveObject(pocdata);
		pocupdatedisplay();
	};
	window.poclog.display = function(a){
		var y = new Array();
		y.push('<table width="450" border="0"><tr><td width="20%">')
		y.push(pocdata.log[a].time);
		y.push('</td><td>');
		y.push(pocdata.log[a].data);
		if(pocdata.log[a].count){
			y.push(' (' + pocdata.log[a].count + ')');
		}
		y.push('</td></tr></table>');
		return y.join('');
	};
	window.poccontrols['clearlog'] = function(){poclog.clear();}
	
	window.pocbuild = new Object();
	window.pocbuild.add = function(c,a){
		var h=c.id.split("_")[1];
		var l = 0;
		for(var i=0;i<pocdata.build.length;i++){
			var m = pocdata.build[i].slot;
			var n = pocdata.build[i].city;
			if(m == h && n == currentcityid){
				l += 1;
			}
		}
		var o=seed.buildings["city"+currentcityid]["pos"+h];
		var B=o[0];
		var w=parseInt(o[1]) + l;
		if(w>9){alert('Due to building requirements (DI), buildings above level 9\nshould be manualy built.');return null;}
		var e=Math.pow(2,w);
		var d=seed.knights["city"+currentcityid];
		var p=0;
		if(d){
			d=d["knt"+seed.leaders["city"+currentcityid].politicsKnightId];
			if(d){
				p=parseInt(d.politics);
				if((parseInt(d.politicsBoostExpireUnixtime)-unixtime())>0){
					p=parseInt(p*1.25)
				}
			}
		}
		var a=buildingcost["bdg"+B][7]*e;
		if(parseInt(B)<6&&parseInt(B)>0&&e==1){
			a=15;
		}
		a=parseInt(a/(1+0.005*p+0.1*parseInt(seed.tech.tch16))); //build time calculation
		var q = new Object();
		q.status = 0;
		q.slot = h;
		q.city = currentcityid;
		q.type = B;
		q.timetobuild = a;
		q.level = w;
		pocdata.build.push(q);
		handler.saveObject(pocdata);
		pocupdatedisplay();
	};
	window.pocbuild.remove = function(h){
		if((typeof h) =='object' ){
			var a = h.id.split('_')[1]
		}else{
			var a = parseInt(h);
		}
		//'queuecancel_';
		
		pocdata.build.splice(a,1);
		pocupdatedisplay();
		handler.saveObject(pocdata);
	};
	window.pocbuild.movetolast = function(c){
		var q = pocdata.build[c];
		if(!q.count){
			q.count = 1;
		}else{
			q.count += 1;
		}
		pocdata.build.splice(c,1);
		if(q.count>5){
			return;
		}else{
			pocdata.build.push(q);
		}
		pocupdatedisplay();
		handler.saveObject(pocdata);
		return;
	};
	window.pocbuild.action = function(c){
		if(pocbuildaction){
			return;
		}
		pocbuildaction = true;
		var pocbuildindex = parseInt(c);
		var a = pocdata.build[c];
		cityid = a.city; 
		bdgid = a.type;
		curlvl = a.level;
		citpos = a.slot;
		gethelp = false;
	   var mult = Math.pow(2, curlvl);
	   var chk = checkreq("bdg", bdgid, curlvl)[3];
	   var invalid = false;
	   for(var i = 0; i < chk.length; i ++ ){
		   if(chk[i] == 0){
			 invalid = true;
			 break
		  }
	   }
	   if(seed.queue_con["city" + cityid].length > 0){
		  invalid = true
	   }
	   
	   if(invalid){
		  alert(g_js_strings.buildaction.cannotbuild);
		  pocbuild.movetolast(c);
		  pocbuildaction = true;
		  return false
	   }else{
		  var pollv = 0;
		  var knt = seed.knights["city" + cityid];
		  if(knt){
			 knt = knt["knt" + seed.leaders["city" + cityid].politicsKnightId];
			 if(knt){
				pollv = parseInt(knt.politics)
			 }
		  }
		  var time = buildingcost["bdg" + bdgid][7] * mult;
		  if(parseInt(bdgid) < 6 && parseInt(bdgid) > 0 && mult == 1){
			 time = 15
		  }
		  time = time / (1 + 0.005 * pollv + 0.1 * parseInt(seed.tech.tch16));
		  if(time % 1 > 0){
			 time = parseInt(time)
		  }
		  var params = Object.clone(g_ajaxparams);
		  params.cid = cityid;
		  params.bid = "";
		  params.pos = citpos;
		  params.lv = curlvl + 1;
		  if(params.lv > 1){
			 params.bid = seed.buildings["city" + cityid]["pos" + citpos][3]
		  }
		  params.type = bdgid;
		  new Ajax.Request(g_ajaxpath + "ajax/construct.php" + g_ajaxsuffix,{
			 method : "post", parameters : params, 
			 onSuccess : function(transport){
				var rslt = eval("(" + transport.responseText + ")");
				pocbuildaction = false;
				if(rslt.ok){
					pocbuild.remove(pocbuildindex);
					var y = new Array();
					var q = parseInt(a.level) + 1;
					y.push('Building <b>' + buildingcost['bdg' + a.type ][0] + ' lvl' + q + '</b> in');
					for(var i=0; i<seed['cities'].length;i++){
						if(seed['cities'][i][0] == params.cid){
								y.push('<b> '+seed['cities'][i][1]+'</b>');
						}
					}
					poclog.add(y.join(''));
				   seed.resources["city" + cityid].rec1[0] -= parseInt(buildingcost["bdg" + bdgid][1]) * mult * 3600;
				   seed.resources["city" + cityid].rec2[0] -= parseInt(buildingcost["bdg" + bdgid][2]) * mult * 3600;
				   seed.resources["city" + cityid].rec3[0] -= parseInt(buildingcost["bdg" + bdgid][3]) * mult * 3600;
				   seed.resources["city" + cityid].rec4[0] -= parseInt(buildingcost["bdg" + bdgid][4]) * mult * 3600;
				   seed.citystats["city" + cityid].gold[0] -= parseInt(buildingcost["bdg" + bdgid][5]) * mult;
				   seed.queue_con["city" + cityid].push([bdgid, curlvl + 1, parseInt(rslt.buildingId), unixtime(), unixtime() + time, 0, time, parseInt(citpos)]);
				   if(curlvl == 0){
					  seed.buildings["city" + cityid]["pos" + citpos] = [bdgid, 0, citpos, rslt.buildingId]
					}
				   var helpstr = "no";
				   if(gethelp){
					  build_gethelp(rslt.buildingId);
					  helpstr = "yes"
				   }
				   Modal.hideModalAll();
				   update_bdg();
				   queue_changetab_building();
				   if(parseInt(seed.tutorial.t1) == 7 && parseInt(bdgid) == 5){
					  tutorialAdvance(1, 8);
					  seed.tutorial.t1 = 8
				   }else{
					  if(parseInt(seed.tutorial.t1) == 15){
						 $("arrowtip").innerHTML = "<div class='arrowdown'></div>";
						 $("arrowtip").style.top = "370px";
						 $("arrowtip").style.left = "500px";
						 $("arrowtip").show()
					  }else{
						 if(parseInt(seed.tutorial.t1) == 21){
							seed.tutorial.t1 = 22;
							tutorialCheck(22)
						 }
					  }
				   }
				   if(rslt.updateSeed)
				   {
					  update_seed(rslt.updateSeed)
				   }
				}
				else
				{
				   alert(printLocalError(rslt.error_code, rslt.msg))
				   pocbuild.movetolast(c);
				}
			 }
			 , onFailure : function()
			 {
			 }
		  }
		  )
	   }
	};
	window.pocbuild.check = function(a){
		var ret = new Object();
		if(seed.queue_con["city"+a].length>0){
			ret.from = 'seed'
			ret.msg = 'Currently Building.'
			ret.data = seed.queue_con["city"+a]; 
			return ret;
		}else{
			for(var i=0;i<pocdata.build.length;i++){
				if(pocdata.build[i].city == a){
					ret.from = 'queue';
					ret.msg = 'Ready to Build.'
					ret.data = i;
					return ret;
				}
			}
			return null;
		}
	};
	window.pocbuild.display = function(a){
		var c = pocdata.build[a]
		var y = new Array();
		y.push('<table width="100%" border="0"><tr><td width="5%">');
		y.push(a);
		y.push('</td><td><table border="0"><tr><td>');
		y.push('');//image goes here
		y.push('</td><td width="100%">');
		for(var i=0;i<seed['cities'].length;i++){
			if(seed['cities'][i][0] == c.city){
				y.push('<b>['+seed['cities'][i][1]+']</b>');
			}
		}
		var level = (parseInt(c.level) + 1);
		y.push('  <span style="color: #060;"><b>'+ buildingcost['bdg' + c.type ][0] + ' lvl' + level );
		y.push('</b></span> (' + timestr(c.timetobuild) + ')<br />');
		if(window.details){
		var A = checkreq("bdg", c.type, (c.level+1));
		y.push('<table>')
		for(var i=0;i<A.length-2;i++){
			var B = A[i];
			y.push('<tr>')
			for(var j=0;j<B.length;j++){
				y.push('<td><span style="font-style: italic; color: ')
				if(A[3][j] == 0){
					y.push('#F00')
				}else{
					y.push('#000')
				}
				y.push('"> ' + A[i][j] + '</span></td>')
			}
			y.push('</tr>');
		}
		y.push('</table>');
		}
		y.push('</td></tr></table></td><td>')
		y.push('<a class="button20" id="queuecancel_' + a + '" onclick="pocbuild.remove(this);"><span>cancel</span></a>');
		y.push('</td></tr></table>');
		return y.join('');
	};
	window.pocbuild.show = function(a,b){
		var y = new Array();
		y.push('<b style="font-style:italic">');
		y.push(a[1]);
		y.push('<span style="color: #060">');
		y.push(buildingcost['bdg'+b[0]][0] + ' lvl' + b[1]);
		y.push('</span> <span style="color: #F00">');
		y.push(timestr(parseInt(b[4]) - parseInt(unixtime())));
		y.push('</span></b><br />');
		return y.join('');
	};
	window.pocbuild.sortbybuildtime = function(){
		pocdata.build.sort(pocsortBuild);
		pocupdatedisplay();
		handler.saveObject(pocdata);
	};
	window.pocbuild.interval = function(i){
		var a = seed['cities'][i];
		var c = pocbuild.check(a[0]);
		if(c!=null){
			switch(c.from){
				case 'queue':
					var ret = pocbuild.action(c.data);
					break;
				case 'seed':
					var d = c.data[0];
					var e = d[4];
					if((parseInt(e) - parseInt(unixtime()))<(-10)){
						seed.queue_con["city"+a[0]] = new Array();
						pocgui.info('build_'+a[0], '')
					}else{
						pocgui.info('build_'+a[0], pocbuild.show(a , c.data[0]))
					}
					break;
			}
		}else{
			//no build
		}
	};
	window.poccontrols['sortBT'] = function(){pocbuild.sortbybuildtime();}
	window.poccontrols['buildmode'] = function(a){
		if(window.mode == 1){
				a.innerHTML = '<span>BM</span>';
				window.mode = 0;
				window.buildslot = window.old_buildslot;
			}else{
				a.innerHTML = '<span>EXIT</span>';
				window.mode = 1;
				window.old_buildslot = window.buildslot;
				window.buildslot = pocbuild.add;
			}
		};
	window.pocinterval.push(pocbuild.interval);

	
	window.pocgui = new Object();
	window.pocgui.getdisplay = new Array();
	window.pocgui.getdisplay['log'] = function(){
		var ret = new Array();
		if(pocdata.log.length>0){
			for(i=0;i<pocdata.log.length;i++){
				ret.push(poclog.display(i));
			}
		}else{
			ret.push('<div align="center"> <b> No Log</b></div>');
		}
		return ret.join('');
	};
	window.pocgui.getdisplay['build'] = function(){
		var ret = new Array();
		var a = pocdata.build
		if(a.length>0){
			for(var i=(a.length-1);i>=0;i--){
				ret.push(pocbuild.display(i));
			}
		}else{
			ret.push('<div align="center"> <b> No Build</b></div>');
		}
		return ret.join('');
	}
	window.pocgui.addtobody = function (c){
		//var a = document.getElementsByTagName('body')[0];
		//a.innerHTML = a.innerHTML + c;
		//Thanks to niknah
		var a = document.getElementsByTagName('body')[0];
		var cspan=document.createElement('span');
		cspan.innerHTML=c;
		a.appendChild(cspan);
		pocrepaint();
	};
	window.pocgui.info = function (a,b){
		var c = document.getElementById(a);
		if(c!=null){
			c.innerHTML = b;
		}else{
			document.getElementById('info_'+a.split('_')[0]).innerHTML += '<div id="'+ a +'"></div>';
		}
	};	
	window.pocgui.clearinfo = function(){
		$('pocinfobox').innerHTML = '';
	};
	window.pocgui.tabs = new Object();
	window.pocgui.tabs.onlick = function(a){
		var b = document.getElementById('koc_debugmain');
		var c = b.getElementsByTagName('div');
		for(var i =0; i<c.length;i++){
			var d = c[i].id;
			if(d.match('info_')){
				c[i].style.visibility = 'hidden';
			}
		}
		var b = document.getElementById('koc_flags');
		var c = b.getElementsByTagName('a');
		for(var i=0;i<c.length;i++){
			var d = c.item(i);
			if(d.id==a.id){
				d.className = 'sel';
			}else{
				d.className = '';
			}
		}
		tabselected = a.id.split('_')[1];
		try{
			$('info_' + tabselected).style.visibility = 'visible';
		}catch(e){
			poclog.log('cannot find info box for' + tabselected );
		}
		pocrepaint();
		pocupdatedisplay();
	};
	window.pocgui.control = new Object();
	window.pocgui.control.onclick = function(a){
		var b = a.id.split('_')[1];
		poccontrols[b](a);
	};
	window.pocgui.createmenu = function(a){
		var y = new Array();
		y.push('<table width="150" border="0">');
		for(var i=0;i<a.length;i++){
			y.push('<tr><td width="20">' + '</td>');//image goes here
			y.push('<td>'+'</td>'); //command
			y.push('<td width="13">&gt;</td></tr>'); //submenu
		}
		y.push('</table>')
	}
	
	window.pocsortBuild = function(a, b){
		return (( parseInt(a.timetobuild) < parseInt(b.timetobuild)) ? -1 : (( parseInt(a.timetobuild) > parseInt(b.timetobuild) ) ? 1 : 0));
	};
	window.pocrepaint = function(){
		var a = document.getElementById('koc_flags');
		var c = document.getElementById('koc_controls');
			a.style.position = 'relative';
			a.style.top='0px';
			a.style.left='30px';
			var b = a.getElementsByTagName('a');
			for(var i = 0; i<b.length;i++){
				b.item(i).style.display = 'run-in';
				b.item(i).style.height='58px';
				b.item(i).style.width='42px';
				b.item(i).style.textAlign = 'center';
				b.item(i).style.color='#FFF';
				b.item(i).style.marginRight='4px';
				b.item(i).style.marginTop='0px';
				b.item(i).style.lineHeight = '40px';
				b.item(i).style.cssFloat = 'left';
				b.item(i).style.fontSize = '11px';
				b.item(i).style.cursor = 'pointer';
				if(b.item(i).className=='sel'){
					var d = b.item(i).id.split('_')[1];
					b.item(i).style.backgroundImage = 'url("'+pocimages.flag1+'")';
					c.innerHTML = pochtmls.controls[d];
				}else{
					b.item(i).style.backgroundImage = 'url("'+pocimages.flag0+'")';
				}
	
			}
	};
	window.pocupdatedisplay = function(){
		var debug = document.getElementById('debugmain');
		try{
		debug.innerHTML = pocgui.getdisplay[tabselected]();
		}catch(e){
			poclog.log('No display for ' + tabselected)
		}
		return;
	};
	window.pocaddtolist = function(a){
		debug = document.getElementById('debugmain');
		oldcontent = debug.innerHTML;
		var linetoadd = '<div>' + a + '</div><hr />';
		debug.innerHTML = linetoadd + oldcontent;
	};
	window.poctoggletimer = function(){
		ispaused = !(ispaused);
		if(ispaused){
			$('timer_control').innerHTML = 'Start';
		}else{
			$('timer_control').innerHTML = 'Pause';
		}
	};
}

function pocVariables(){
	SCRIPT = {
		name:'Camelot Auto Helper',
		version: '0.4.5',
		build: '212',
		appname: 'kingdomsofcamelot',
		appID: 'app10979261223',
		userscriptUrl : 'http://userscripts.org/scripts/show/72778',
		url : 'http://userscripts.org/scripts/source/72778.user.js',
		metadata : 'http://userscripts.org/scripts/source/72778.meta.js',
		appNo: '10979261223',
	};
	window.pocimages = new Object();
	window.pocimages.kochead = "data:image/png;base64,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";
	window.pocimages.koclower = "data:image/png;base64,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" ;
	window.pocimages.flag0 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAA6CAYAAADGFcvAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABQJJREFUeNrsmV9MW1Ucx3+3vS2U9vY/XQsMSGQz6kamGwaNbpoNxAeTSfawLDMQXxarb7qHPRg0PhidMzGZqHtYIM4/e3CQaJSx6GY0xggoJpC5mjlW/gTGgLGWQlspnt/pvd0pveW2cB8upif5ce750+/vc3/nl9PTgw42SdFtFlAe/5x8ZfeKliGPnx7gKKjVXZExKFjd8Napz8FkTAZ9MZaA1189AqG7t1Vxnp/+QDKiDrcvY8giuMDtFMBpNdL2XCgGdpcXeKNBFdB89ZMRtbsyBswo5LKCz2UG4EgyGxZAIPN0enWW0+b0gcdtA5/bAhzR56fD4Cj1ZdWnoC3nljMGnn/SCTciAswW2SnofEQHnw05oeunW6qAtjY5YTRmhfCSnYLOxnTQHXBCR89YVlC9QyjKGKh7wAvj/R7wektpe9JkpH1XBm+oAlpb44GArxR8Pg9tm8iSY58cyxRhRNBih2DMGLx/qwuW74xClJuj7X/nwrRPbu56yn3lDojNBGFhZZa2ozNh2pdFv5inKWq5N9j38xCt7aYDEE/oYTHOJUFBT/oS8PdgQBVQq7EBYkQ/EpP0edK3nNKve2JH2nQxovfCfXd+gdbxWAw+OnM2TTy0sJQa32iJRuX0oyn9VSlAI6pnI8rRbACoP/yhrANpfKOl/vDpNfVZJhBzFBxpoCrtPxssjnTQ5PZkNzOgPK8JUJYpBWoTtBdRmyAHWmLQHmiJQQbUor2lt8nlqLVEe0vPMjGgvAZB+UxQgY2oThugglxEzSY2otr4dcIypUCLDHomotoAZZk21Y+7AmgBtABaAN3wV5+BmqZBEfB821PU1IbVyTlbT6koLaGAD1U7qOEz9q33hRVB1xONB6vs8N07jRRQKviMfTi2nlWRBb0WGPmBdZAPLILgfJs58+IA+3AsV1gJkn1hiY2C7nns0Ad/DF79NV/YQ/uqoefdxjTI/oGhPjQWFufg3HwhkQnZJNAEseW9+1/o7P99+LdcYdHx+/5H0/oQ8OnG1vNoLCwWnJsNVg4SWZAJ2ZARz1KY8RY8AnZ+2h1oPPC4u6zMU46TPXYT7Nvlha9/GYVoPJESaWvZBSeO1KY5++bbKxefa/Z30dsZIk60hmt3bue2b6uukeY8U1cOVrMBfvxzcm3I5AufI49hYtNoejGqaBi6IuLg2lqwp16qg6MNNWmQH5/58otjL79xmTxGiM0TW8T+r7p6R5wO6509u3fslOY+ss1Fd4Pe/olcIKeITRCb4URAgZiXWJVYC5d7O44SB3WSwPDIHIxNR2hUpLIUjS12dF7oPn7iPczvEDG8PJXutt34nqh18u3X6ltbmg8WFxlN0mcv9o1T4CyQqIVhvynWIQTlxJO+IixbEPKYv639QvelICMcXAVaKWk1H2yo/KT9TT8LK5PfspCYTtJ5f0XMrbiYvAhuXJ0GCpCs8BJe2LFaV//6Z+n69WDg2aa9D/O83pAPJPJx7EVaLpGdmro9vr/pxfabwYnwGsKQTauqsszyfc9Z/5Yt7vJcISU4yBV2a4W3LAfIFSUtCXZ0bHIiF0g50LUc4BamF5czrCSstla224bVOasXHeJmuiBuG0EFSFW1eAXxENPGvdEk1rdEB0qQqmlxCucEaemkby+DGJmwuLkrQaqmxeXoQCcuWepsINb5/rNXTS1FR1rUKvwKLYAWQAugBdD/C+h/AgwAzuEgs6InYWgAAAAASUVORK5CYII=";
	window.pocimages.flag1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAA6CAYAAADGFcvAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA+5JREFUeNrs2stPE0EYAPBvH92+C31BiwSjhoOJaCKYqIkGosIfoCej0aMHb8bEiycPHowxGg4eIRJvJl48YIzGGBNUHmo0iBxUSBqBQgPbFlv6cGZ3tl3aLbTdod0mbDJsZmaZ/fWbr/sYYKFBNrZRoDz+ce96d9bIyJuDE4wEdfnaizqdLh/cuf8UrIIc9PVkBm7fuAjiWpjKySsbf0KOqNsXLOpyOL3g8zjB4xKkekRMQrM3ALxgogKtdHw5os3eog47HsjrgqDXDsCgZDbFwImOYzk609nkCUKLrwmCPgcwaHx+KQpuf7Dk+BI0dPdFUcf+gVNgXkmDLZ2W6ubVNKTf/oLQ6DsqUNf5ATCLKCBcFscBzGtZyI7NQ+jZaEkoZ3JYizr8XZ3g/tEK/la3VI8tRKS2+ffjVKCeg/vAPeUHX8Aj1UXritSmZcFGDLWYHLainuYD7bAshoHn41I9vBaX2rSOrWrqO4JozEXguJhUX1qNSW0lxrdgqEuw5z/Fl8mv0r7XKUAMXRQiaTlp1lkeONQ2PTNLBdpr5yCa5UFIyd/6OGMCBrUp4x85enhTppCI5qGiKH/C1EYChh4/2DR4IhrP9evdUsmtxy9IAYuco/Z8uHlW/oSPBq5pJzVL52a23fhqk5KjwKv0HGuMuypf8KXiZb0ayhgCqjZpQxnWyFCL4aZebcpBeZsBc9TWyBE12SzGy1FbQ0+9zayKqEEuTypTDspZ82FmDRJRtUk19RYDTr0W1CLkI2qQqVeb8lNvQCinCeV5FdQgOaoy5aCgjqIxArrZ1EgrJbvQXWju1qX9Xl3b26eGoQjaN3irrlh8bmzQhM78/P1aaXB3dtQNqyCxQdkUmwTtOXHh4dTn6bF6YrWQ2IRtCjSDSvr0mcvD45PfP9YDq4XEFmzCNmzE0AQqUbyq0nfuysj4xLdPtcRqIpEBW7CJ2BIciSoueAXVPPzk+Uz/2ZO+traWPfiXrN4mCBzvgrlXHyCTTNUG2X91hAAXUAmhssyRqd8gIcb3fqEW2G2QIip/UZkj2BiG4j80pGqJLRP5h+xxPaUsRNcMWw0S+9Qr5juOrRYpPZ8WjLVjWD1ILeiOYPUiS0GpYmkgt4JSwdJCbgfVhaWJLAdaFZYTTFSRlbxzMgToRCWAyl6yd755OXSpp/vQMeXAyOxc7jmBFrLSl+OyseqNBrLSdyYlBYpOiCHqpy7ayGpe7srG0kTqWRfZMg2kdy+KSL0LOKWwdtIfo4Us9/JUyaVLeRD/h8oieZ7UjcwvkumHiqSeIU/meAsTrG4kzbU7JQ2sBVO/TgNJe5GRIdOupFOaRJjKvyr9F2AApd5ZU48aotcAAAAASUVORK5CYII=";
	window.pocimages.kocbody = "data:image/png;base64,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";
	window.pocimages.kocbottom = "data:image/png;base64,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";
	
	window.pochtmls = new Object();
	window.pochtmls.controls = new Array();
	window.pochtmls.controls['log'] = '<a id="con_clearlog" class="button20" onclick="pocgui.control.onclick(this)"><span>CL</span></a>';
	window.pochtmls.controls['build'] = '<a id="con_buildmode" class="button20" onclick="pocgui.control.onclick(this)"><span>BM</span></a><a id="con_sortBT" class="button20" onclick="pocgui.control.onclick(this)"><span>SBT</span></a>';
	window.pochtmls.mainbody = '<table id="pochmain" style="position:fixed; top:64px; left:765px" cellspacing="0" border="0" width="450"><tr style="color:#FFFFFF; padding:0; background-image:url('+ pocimages.kochead + ')" height="93" width="450" border="0" id="koc_head"><td width="20px" ></td><td width="210" ><div style="position:relative; top:25px" id="pochHead"><div id="pochtitle" >'+ SCRIPT.name +'</div><div id="pochversion">version '+ SCRIPT.version + ' build ' + SCRIPT.build +'</div></div></td><td><div style=" position:relative; top:25px; margin-left:95px"><a class="button20" onclick="poctoggletimer()"><span style="text-align: center" id="timer_control">Start</span></a><a class="button20" onclick="eval(prompt());"><span style="text-align: center" id="evaluate">?</span></a><a class="button20" onclick="window.details = !window.details;pocupdatedisplay();"><span>d</span></a></div></td></tr><tr height="50px" style="background-image:url('+ pocimages.koclower +')" bgcolor="#FFFFCC" id="koc_lower"><td colspan="2"><div id="koc_flags" style=" border:0; line-height:40px; left:10px"><a id="flag_log" class="sel" onclick="pocgui.tabs.onlick(this)">Log</a><a id="flag_build" class="" onclick="pocgui.tabs.onlick(this)">Build</a></div></td><td valign="top"><div style="position:relative; top:10px" id="koc_controls"><a class="button20" onclick="controlClick(this)"><span>clear log</span></a></div></td></tr><tr><td height="360px" style="background-image:url('+ pocimages.kocbody +')" bgcolor="#FFFFCC" valign="top" colspan="3" id="koc_debugmain"><div id="pocinfobox"></div></div><div id="debugmain" style=" position:relative; left:8px;width:431px;height:350px;overflow-x: hidden; overflow-y: scroll; border:1px solid #A56631"></div></td></tr><tr><td height="36px" style="background-image:url('+ pocimages.kocbottom +')" bgcolor="#FFFFCC" colspan="3" id="koc_bottom"></td></tr></table>';


}

////////////////////////////////////////////////////////////////////////////////////
// Object Serializer - JSSerializer
////////////////////////////////////////////////////////////////////////////////////
function POCSER(){this.JSSerializer=function(){this.Data=null;this.Serialize=mtdSerialize;this.HasData=function(){return this.Data?true:false};this.MaxDepth=null;this.CheckInfiniteLoops=true;var theSerializer=this;var currDepth=0;function mtdSerialize(obj){if(IsSerializable('SrliZe',obj)){this.Data=new SerialData('SrliZe',obj,null);SerializeAll(obj,this.Data);return true;}else{return false;}}function SerializeAll(obj,objParent){currDepth++;if((theSerializer.MaxDepth==null)||(theSerializer.MaxDepth=='')||(theSerializer.MaxDepth<0)||(currDepth<=theSerializer.MaxDepth)){var i;var objSerial;var blnDidForIn=false;try{for(i in obj){SerializeItem(i,obj,objParent);blnDidForIn=true;}}catch(e){}if(!blnDidForIn){if(obj){if(obj.length&&(GetExactType(obj)=='Object')){for(var i=0;i<obj.length;i++){SerializeItem(i,obj,objParent);}}}}}currDepth--;}function SerializeItem(i,obj,objParent){if(IsSerializable(i,obj[i])){objSerial=new SerialData(i,obj[i],objParent);objParent.Kids[objParent.Kids.length]=objSerial;if(theSerializer.CheckInfiniteLoops){objSerial.RealObject=obj[i];objSerial.Link=findSerialLink(objSerial);}if((IsContainerType(obj[i]))&&(objSerial.Link==null)){SerializeAll(obj[i],objSerial)}}}function findSerialLink(objSerial){var obj=objSerial;blnDidCheck=false;try{while((obj.Parent!=null)&&(obj.Parent.RealObject!=objSerial.RealObject)){blnDidCheck=true;obj=obj.Parent;}}catch(e){return null;}if(blnDidCheck){return obj.Parent;}else{return null;}}function GetExactType(obj){try{if(obj.constructor){var strType;strType=obj.constructor.toString().match(/function (\w*)/)[1];if(strType.replace(' ','')=='')strType='n/a';if(theSerializer.Types.UseObjectsForUserDefined&&!(strType in oc(['Array','Boolean','Date','Enumerator','Error','Function','Number','RegExp','String','VBArray']))){strType='Object';}return strType;}else{return'n/a';}}catch(e){return'n/a';}}function oc(a){var o={};for(var i=0;i<a.length;i++){o[a[i]]='';}return o;}function IsContainerType(obj){try{return(GetExactType(obj)!='Boolean'&&GetExactType(obj)!='Date'&&GetExactType(obj)!='Enumerator'&&GetExactType(obj)!='Function'&&GetExactType(obj)!='Number'&&GetExactType(obj)!='RegExp'&&GetExactType(obj)!='String'&&GetExactType(obj)!='VBArray'&&GetExactType(obj)!=null&&GetExactType(obj)!==undefined)}catch(e){return false;}}function IsSerializable(strName,obj){try{switch(GetExactType(obj)){case'n/a':if(obj==undefined){return theSerializer.Types.UseUndefined;}else{return theSerializer.Types.UseNull;}break;case'Array':return theSerializer.Types.UseArray;break;case'Object':return theSerializer.Types.UseObject;break;case'Boolean':return theSerializer.Types.UseBoolean;break;case'Date':return theSerializer.Types.UseDate;break;case'Enumerator':return false;break;case'Error':return theSerializer.Types.UseError;break;case'Function':if(strName=='constructor'){return false;}else{return theSerializer.Types.UseFunction;}break;case'Number':return theSerializer.Types.UseNumber;break;case'RegExp':return theSerializer.Types.UseRegExp;break;case'String':return theSerializer.Types.UseString;break;case'VBArray':return false;break;default:return theSerializer.Types.UseUserDefined;break;}}catch(e){return false;}}function SerialData(strName,obj,objParent){this.Name=strName;if(obj!=null){try{if(obj.toString){this.Value=obj.toString();}}catch(e){}}else{this.Value=obj;}this.RealObject=null;this.Type=typeof(obj);this.ExactType=GetExactType(obj);this.IsContainer=IsContainerType(obj);this.Parent=objParent;this.Kids=new Array;this.Link=null;}};this.JSSerializer.prototype.Prefs=new SerialPrefs();function SerialPrefs(){this.ShowLineBreaks=false;this.SmartIndent=false;this.ShowTypes=false;}this.JSSerializer.prototype.Types=new SerialTypes();function SerialTypes(){this.UseNull=true;this.UseUndefined=true;this.UseArray=true;this.UseObject=true;this.UseBoolean=true;this.UseDate=true;this.UseError=true;this.UseFunction=true;this.UseNumber=true;this.UseRegExp=true;this.UseString=true;this.UseUserDefined=true;this.UseObjectsForUserDefined=false;}this.JSSerializer.prototype.GetJSString=mtdGetJSString;function mtdGetJSString(strRoot){var theSerializer=this;var JSStringRoot=strRoot;var arr=new Array;arr[arr.length]=GetJSStringItem(this.Data);arr[arr.length]=GetJSStringAll(this.Data);return arr.join('');function GetJSStringAll(obj){var arr=new Array;if(obj){for(var i=0;i<obj.Kids.length;i++){arr[arr.length]=GetJSStringItem(obj.Kids[i]);arr[arr.length]=GetJSStringAll(obj.Kids[i])}}return arr.join('');}function GetJSStringItem(obj){var arr=new Array;function QuoteString(str){str=str.replace(/(["'\\])/g,'\\$1');str=str.replace(/\x0D/g,"\\r");str=str.replace(/\x0A/g,"\\n");return str;}if(obj){arr[arr.length]=ItemPath(obj);if(obj.Link!=null){arr[arr.length]=' = '+ItemPath(obj.Link)+';';}else{switch(obj.ExactType){case'n/a':if(obj.Value===undefined){arr[arr.length]=' = undefined;';}else{if(obj.Value===null){arr[arr.length]=' = null;';}else{arr[arr.length]=' = new Object;';}}break;case'Array':arr[arr.length]=' = new Array;';break;case'Object':arr[arr.length]=' = new Object;';break;case'Boolean':if(obj.Type=='boolean')arr[arr.length]=' = '+obj.Value+';';else arr[arr.length]=' = new Boolean('+obj.Value+');';break;case'Date':arr[arr.length]=' = new Date(\''+obj.Value+'\');';break;case'Enumerator':break;case'Error':arr[arr.length]=' = new Error;';break;case'Function':arr[arr.length]=' = '+obj.Value+';';break;case'Number':if(obj.Type=='number')arr[arr.length]=' = '+obj.Value+';';else arr[arr.length]=' = new Number('+obj.Value+');';break;case'RegExp':arr[arr.length]=' = new RegExp('+obj.Value+');';break;case'String':if(obj.Type=='string')arr[arr.length]=' = \''+QuoteString(obj.Value)+'\';';else arr[arr.length]=' = new String(\''+QuoteString(obj.Value)+'\');';break;case'VBArray':break;default:arr[arr.length]=' = new '+obj.ExactType+';';break;}}if(theSerializer.Prefs.ShowLineBreaks){arr[arr.length]='\n';}}return arr.join('');function ItemPath(obj){var str=RenderItemName(obj);while(obj.Parent!=null){str=RenderItemName(obj.Parent)+str;obj=obj.Parent;}return str;function RenderItemName(obj){if(obj.Parent==null){if(JSStringRoot){return JSStringRoot;}else{return obj.Name;}}else{if(isNaN(obj.Name)){switch(obj.Parent.ExactType){case'Array':return'['+obj.Name+']';break;default:return'.'+obj.Name;break;}}else{return'['+obj.Name+']';}}}}}}}

////////////////////////////////////////////////////////////////////////////////////
// Misc Functions
////////////////////////////////////////////////////////////////////////////////////
function addScript(script){
	var a = document.createElement('script');
	a.innerHTML = script;
	document.getElementsByTagName('head')[0].appendChild(a);
	return;
}
function dump(object){
	var serializer = new POCSER();
	var objSerializer = new serializer.JSSerializer();
	objSerializer.Prefs.SmartIndent =	true;
	objSerializer.Prefs.ShowLineBreaks =true;
	objSerializer.Prefs.ShowTypes =		true;
	objSerializer.Types.UseNull =		true;
	objSerializer.Types.UseUndefined =	true;
	objSerializer.Types.UseArray =		true;
	objSerializer.Types.UseObject =		true;
	objSerializer.Types.UseBoolean =	true;
	objSerializer.Types.UseDate =		true;
	objSerializer.Types.UseError =		true;
	objSerializer.Types.UseFunction =	false;
	objSerializer.Types.UseNumber =		true;
	objSerializer.Types.UseRegExp =		true;
	objSerializer.Types.UseString =		true;
	objSerializer.Types.UseUserDefined =			true;
	objSerializer.Types.UseObjectsForUserDefined =	false;
	objSerializer.CheckInfiniteLoops =	true;
	objSerializer.MaxDepth =			'';
	objSerializer.Serialize(object);
	return objSerializer.GetJSString('dumped');
}