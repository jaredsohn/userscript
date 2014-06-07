// ==UserScript==
// @name           Build Helper
// @namespace      Build Helper
// @description    Build helper for KoC
// @include        *.kingdomsofcamelot.com/*main_src.php*
// @include        *facebook.com/kingdomsofcamelot/*
// @include        */kingdomsofcamelot/?modal*
// @exclude        */kingdomsofcamelot/?page=*
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

//Remove faulty alliance info
$('#directory_tabs_2_allianceInfo').remove();



//Maximize Knight view
$('#cityinfo_2').css('height','620px');

//More info at a glance
$('#cityinfo_1 div.upsell a.button20').remove();
$('#fbFanBox').remove();
$('#cityinfo1').css('backgroundColor','tan');
$('#cityinfo1').css('height','270px');

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
				a.innerHTML = '<span>Build Mode</span>';
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
	window.pocimages.flag0 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAA6CAYAAADGFcvAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABQJJREFUeNrsmV9MW1Ucx3+3vS2U9vY/XQsMSGQz6kamGwaNbpoNxAeTSfawLDMQXxarb7qHPRg0PhidMzGZqHtYIM4/e3CQaJSx6GY0xggoJpC5mjlW/gTGgLGWQlspnt/pvd0pveW2cB8upif5ce750+/vc3/nl9PTgw42SdFtFlAe/5x8ZfeKliGPnx7gKKjVXZExKFjd8Napz8FkTAZ9MZaA1189AqG7t1Vxnp/+QDKiDrcvY8giuMDtFMBpNdL2XCgGdpcXeKNBFdB89ZMRtbsyBswo5LKCz2UG4EgyGxZAIPN0enWW0+b0gcdtA5/bAhzR56fD4Cj1ZdWnoC3nljMGnn/SCTciAswW2SnofEQHnw05oeunW6qAtjY5YTRmhfCSnYLOxnTQHXBCR89YVlC9QyjKGKh7wAvj/R7wektpe9JkpH1XBm+oAlpb44GArxR8Pg9tm8iSY58cyxRhRNBih2DMGLx/qwuW74xClJuj7X/nwrRPbu56yn3lDojNBGFhZZa2ozNh2pdFv5inKWq5N9j38xCt7aYDEE/oYTHOJUFBT/oS8PdgQBVQq7EBYkQ/EpP0edK3nNKve2JH2nQxovfCfXd+gdbxWAw+OnM2TTy0sJQa32iJRuX0oyn9VSlAI6pnI8rRbACoP/yhrANpfKOl/vDpNfVZJhBzFBxpoCrtPxssjnTQ5PZkNzOgPK8JUJYpBWoTtBdRmyAHWmLQHmiJQQbUor2lt8nlqLVEe0vPMjGgvAZB+UxQgY2oThugglxEzSY2otr4dcIypUCLDHomotoAZZk21Y+7AmgBtABaAN3wV5+BmqZBEfB821PU1IbVyTlbT6koLaGAD1U7qOEz9q33hRVB1xONB6vs8N07jRRQKviMfTi2nlWRBb0WGPmBdZAPLILgfJs58+IA+3AsV1gJkn1hiY2C7nns0Ad/DF79NV/YQ/uqoefdxjTI/oGhPjQWFufg3HwhkQnZJNAEseW9+1/o7P99+LdcYdHx+/5H0/oQ8OnG1vNoLCwWnJsNVg4SWZAJ2ZARz1KY8RY8AnZ+2h1oPPC4u6zMU46TPXYT7Nvlha9/GYVoPJESaWvZBSeO1KY5++bbKxefa/Z30dsZIk60hmt3bue2b6uukeY8U1cOVrMBfvxzcm3I5AufI49hYtNoejGqaBi6IuLg2lqwp16qg6MNNWmQH5/58otjL79xmTxGiM0TW8T+r7p6R5wO6509u3fslOY+ss1Fd4Pe/olcIKeITRCb4URAgZiXWJVYC5d7O44SB3WSwPDIHIxNR2hUpLIUjS12dF7oPn7iPczvEDG8PJXutt34nqh18u3X6ltbmg8WFxlN0mcv9o1T4CyQqIVhvynWIQTlxJO+IixbEPKYv639QvelICMcXAVaKWk1H2yo/KT9TT8LK5PfspCYTtJ5f0XMrbiYvAhuXJ0GCpCs8BJe2LFaV//6Z+n69WDg2aa9D/O83pAPJPJx7EVaLpGdmro9vr/pxfabwYnwGsKQTauqsszyfc9Z/5Yt7vJcISU4yBV2a4W3LAfIFSUtCXZ0bHIiF0g50LUc4BamF5czrCSstla224bVOasXHeJmuiBuG0EFSFW1eAXxENPGvdEk1rdEB0qQqmlxCucEaemkby+DGJmwuLkrQaqmxeXoQCcuWepsINb5/rNXTS1FR1rUKvwKLYAWQAugBdD/C+h/AgwAzuEgs6InYWgAAAAASUVORK5CYII=";
	window.pocimages.flag1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAA6CAYAAADGFcvAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA+5JREFUeNrs2stPE0EYAPBvH92+C31BiwSjhoOJaCKYqIkGosIfoCej0aMHb8bEiycPHowxGg4eIRJvJl48YIzGGBNUHmo0iBxUSBqBQgPbFlv6cGZ3tl3aLbTdod0mbDJsZmaZ/fWbr/sYYKFBNrZRoDz+ce96d9bIyJuDE4wEdfnaizqdLh/cuf8UrIIc9PVkBm7fuAjiWpjKySsbf0KOqNsXLOpyOL3g8zjB4xKkekRMQrM3ALxgogKtdHw5os3eog47HsjrgqDXDsCgZDbFwImOYzk609nkCUKLrwmCPgcwaHx+KQpuf7Dk+BI0dPdFUcf+gVNgXkmDLZ2W6ubVNKTf/oLQ6DsqUNf5ATCLKCBcFscBzGtZyI7NQ+jZaEkoZ3JYizr8XZ3g/tEK/la3VI8tRKS2+ffjVKCeg/vAPeUHX8Aj1UXritSmZcFGDLWYHLainuYD7bAshoHn41I9vBaX2rSOrWrqO4JozEXguJhUX1qNSW0lxrdgqEuw5z/Fl8mv0r7XKUAMXRQiaTlp1lkeONQ2PTNLBdpr5yCa5UFIyd/6OGMCBrUp4x85enhTppCI5qGiKH/C1EYChh4/2DR4IhrP9evdUsmtxy9IAYuco/Z8uHlW/oSPBq5pJzVL52a23fhqk5KjwKv0HGuMuypf8KXiZb0ayhgCqjZpQxnWyFCL4aZebcpBeZsBc9TWyBE12SzGy1FbQ0+9zayKqEEuTypTDspZ82FmDRJRtUk19RYDTr0W1CLkI2qQqVeb8lNvQCinCeV5FdQgOaoy5aCgjqIxArrZ1EgrJbvQXWju1qX9Xl3b26eGoQjaN3irrlh8bmzQhM78/P1aaXB3dtQNqyCxQdkUmwTtOXHh4dTn6bF6YrWQ2IRtCjSDSvr0mcvD45PfP9YDq4XEFmzCNmzE0AQqUbyq0nfuysj4xLdPtcRqIpEBW7CJ2BIciSoueAXVPPzk+Uz/2ZO+traWPfiXrN4mCBzvgrlXHyCTTNUG2X91hAAXUAmhssyRqd8gIcb3fqEW2G2QIip/UZkj2BiG4j80pGqJLRP5h+xxPaUsRNcMWw0S+9Qr5juOrRYpPZ8WjLVjWD1ILeiOYPUiS0GpYmkgt4JSwdJCbgfVhaWJLAdaFZYTTFSRlbxzMgToRCWAyl6yd755OXSpp/vQMeXAyOxc7jmBFrLSl+OyseqNBrLSdyYlBYpOiCHqpy7ayGpe7srG0kTqWRfZMg2kdy+KSL0LOKWwdtIfo4Us9/JUyaVLeRD/h8oieZ7UjcwvkumHiqSeIU/meAsTrG4kzbU7JQ2sBVO/TgNJe5GRIdOupFOaRJjKvyr9F2AApd5ZU48aotcAAAAASUVORK5CYII=";
	window.pocimages.kocbottom = "data:image/png;base64,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";
	
	window.pochtmls = new Object();
	window.pochtmls.controls = new Array();
	window.pochtmls.controls['log'] = '<a id="con_clearlog" class="button20" onclick="pocgui.control.onclick(this)"><span>Clear Log</span></a>';
	window.pochtmls.controls['build'] = '<a id="con_buildmode" class="button20" onclick="pocgui.control.onclick(this)"><span>Build Mode</span></a><a id="con_sortBT" class="button20" onclick="pocgui.control.onclick(this)"><span>SBT</span></a>';
	window.pochtmls.mainbody = '<table id="pochmain" style="position:fixed; top:64px; left:765px" cellspacing="0" border="0" width="450"><tr style="color:#FFFFFF; padding:0; background-image:url('+ pocimages.kochead + ')" height="93" width="450" border="0" id="koc_head"><td width="20px" ></td><td width="210" ><div style="position:relative; top:25px" id="pochHead"><div id="pochtitle" >'+ SCRIPT.name +'</div><div id="pochversion">version '+ SCRIPT.version + ' build ' + SCRIPT.build +'</div></div></td><td><div style=" position:relative; top:25px; margin-left:5px"><a class="button20" onclick="poctoggletimer()"><span style="text-align: center" id="timer_control">Start</span></a> <a class="button20" onclick="window.details = !window.details;pocupdatedisplay();"><span>Details</span></a></div></td></tr><tr height="50px" style="background-image:url('+ pocimages.koclower +')" bgcolor="#FFFFCC" id="koc_lower"><td colspan="2"><div id="koc_flags" style=" border:0; line-height:40px; left:10px"><a id="flag_log" class="sel" onclick="pocgui.tabs.onlick(this)">Log</a><a id="flag_build" class="" onclick="pocgui.tabs.onlick(this)">Build</a></div></td><td valign="top"><div style="position:relative; top:10px" id="koc_controls"><a class="button20" onclick="controlClick(this)"><span>clear log</span></a></div></td></tr><tr><td height="360px" style="background-image:url('+ pocimages.kocbody +')" bgcolor="#FFFFCC" valign="top" colspan="3" id="koc_debugmain"><div id="pocinfobox"></div></div><div id="debugmain" style=" position:relative; left:8px;width:431px;height:350px;overflow-x: hidden; overflow-y: scroll; border:1px solid #A56631"></div></td></tr><tr><td height="36px" style="background-image:url('+ pocimages.kocbottom +')" bgcolor="#FFFFCC" colspan="3" id="koc_bottom"></td></tr></table>';


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