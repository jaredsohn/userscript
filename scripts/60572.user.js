// ==UserScript==
// @name			 Trav-Summator (v 1.9a)
// @version 		 1.9a
// @date			 10-07-2009
// @author			 Anton Fedorov <datacompboy@a-koss.ru>
// @description 	 Calculate sum of farm, and state of incoming transfer
// @include 		 http://*.travian.*/*
// @exclude 		 http://*.travian.*/admin*
// ==/UserScript==
// (c) Anton Fedorov aka DataCompBoy, 2006-2009
// Clan S4 <KazakiYuV2>.

(function(){
  getElementsByClass = function (searchClass,node,tag) {
	  var classElements = new Array();
	  if ( node == null )
		  node = document;
	  if ( tag == null )
		  tag = '*';
	  var els = node.getElementsByTagName(tag);
	  var elsLen = els.length;
	  var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	  for (i = 0, j = 0; i < elsLen; i++) {
		  if ( pattern.test(els[i].className) ) {
			  classElements[j] = els[i];
			  j++;
		  }
	  }
	  return classElements;
  }

  var weights
  if (document.getElementById('sleft')) { // T3.5
	weights = [ 0,
		50, 20, 50, 0, 100, 70, 0, 0, 0, 1600,
		60, 40, 50, 0, 110, 80, 0, 0, 0, 1600,
		35, 45, 0, 75, 35, 65, 0, 0, 0, 1600
	  ];
  } else { // T3
	weights = [ 0,
		40, 20, 50, 0, 100, 70, 0, 0, 0, 1600,
		60, 40, 50, 0, 110, 80, 0, 0, 0, 1600,
		30, 45, 0, 75, 35, 65, 0, 0, 0, 1600
	  ];
  }

  function travtmfmt(hrs) {
	  var h = Math.floor(hrs);
	  var m = Math.floor((hrs-h)*60);
	  var s = Math.ceil(((hrs-h)*60-m)*60);
	  return h+":"+(m<10?"0":"")+m+":"+(s<10?"0":"")+s;
  }
  var travDate = new Date((new Date).toDateString()+" "+document.getElementById("tp1").innerHTML);
  function travtmenfmt(hrs) {
	  var date = new Date(travDate);
	  var futdate = new Date(travDate);
	  var expdate = futdate.getTime();
	  expdate += hrs*3600*1000; //expires in 1 hour(milliseconds)
	  futdate.setTime(expdate);
	  var ds = "";
	  if (futdate.getDate()!=date.getDate() && hrs > 24) {
		  ds += futdate.getYear() + "-";
		  var m = futdate.getMonth()+1;
		  ds += (m<10?"0":"")+m + "-";
		  var d = futdate.getDate();
		  ds += (d<10?"0":"")+d + " ";
	  }
	  var h=futdate.getHours();
	  var m=futdate.getMinutes();
	  var s=Math.max(0, futdate.getSeconds());
	  return ds+h+":"+(m<10?"0":"")+m+":"+(s<10?"0":"")+s;
  }
  function travtime(wait, space) {
	  var st = "";
	  if (wait<0) {
		wait = -wait;
		st = " style='color:red;'";
	  }
	  if(!space) space = " ";
	  if (wait!=null) {
		return " (<span id=timer" + (timer++) + st + ">" + travtmfmt(wait) + "</span>;" + space + travtmenfmt(wait) + ")";
	  } else {
		return "(-never-)";
	  }
  }

  //function Init() {
	var units = getElementsByClass("report_detail",document.body,"td");
	if (units&&units.length) units = units[0].getElementsByTagName("table");
	if (!units||!units.length) { units = document.getElementById('report_surround'); if (units) units = [ units ]; }
	if (!units) units = getElementsByClass("tbg",document.body,"table");
	var uncnt = new Array();
	var transfermax = 0;
	if (units.length)
	{
		for(var i=0; i<units.length; i++)
		{
			var ulist = units[i].innerHTML.match(/(?:img\/un\/u\/([0-9]+)\.gif|class="unit u([0-9]+)")/g);
			if (ulist && ulist.length>9)
			{
				var ucntlst = units[i].innerHTML.match(/<tr><t[dh]>[^0-9]+<\/t[dh]>((<td[^>]*>[0-9]+<\/td>){10,}).*?<\/tr>/ig);
				for(var l = 0; l<ucntlst.length; l++) {
				  var ucount = ucntlst[l].match(/<td[^>]*>([0-9]+)<\/td>/ig);
				  for(var j=0; j<10; j++) {
					  var unit = (ulist[j].match(/[0-9]+/)[0])*1;
					  var ucnt = (ucount[j].match(/[0-9]+/)[0])*1;
					  if (!l) {
						uncnt[j] = [unit, ucnt, weights[unit]*ucnt];
						transfermax += weights[unit]*ucnt;
					  } else {
						transfermax -= weights[unit]*ucnt;
					  }
				  }
				}
				break;
			}
		}
	}

	var menu = getElementsByClass("required",document.body,"td");
	if (!menu || !menu.length) { menu = getElementsByClass("goods",document.body,"tbody"); if (menu.length) menu = menu[0].rows; else menu = false; }
	if (!menu) menu = getElementsByClass("s7",document.body,"td");
	if (menu.length) {
	  for(var i=0; i<menu.length; i++) {
		var mm = getElementsByClass("res",menu[i],"div");
		if (!mm || !mm.length) mm = menu[i]; else mm = mm[0];
		var m = mm.innerHTML.match(/(?:class="r[1-5]"|img\/un\/r\/[1-5]\.gif[^>])*>[0-9]+/g);
		if (m && m.length==4) {
		  var sum = 0;
		  for(var j=0; j<m.length; j++) {
			var res = m[j].match(/>([0-9]+)/);
			sum += res[1]*1;
		  }
		  mm.innerHTML += "(итого: "+sum+" / "+transfermax+")";
		}
	  }
	}

	var timer=1; for(; document.getElementById("timer"+timer); timer++) ;

	var harv = new Array();
	var harvsum = 0;
	var harvsuminc = 0;
	var j=0;
	for (var i=4; i>=1; i--)
	{
		var hx = document.getElementById("l"+i);
		var h = hx.innerHTML.match(/([0-9]+)\/([0-9]+)/);
		harv[j++] = new Array(hx.getAttribute("title")*1, h[1]*1, h[2]*1, 0);
		harvsum += h[1]*1;
		harvsuminc += hx.getAttribute("title")*1;
	}

	menu = getElementsByClass("cbg1",document.body,"tr");
	if (!menu || !menu.length) {
		menu = getElementsByClass("traders",document.body,"table");
		if (menu.length) {
			var m = Array();
			for(var i=0; i<menu.length; i++) {
				var k = menu[i].getElementsByTagName("tr");
				for(var j=0; j<k.length; j++)
					m.push(k[j]);
			}
			menu = m;
		}
	}
	var lasttime = 0;
	var logdiv = null;
	var logres = "";
	if (menu.length) {
		var lastmax = -1;
		for(var i=0; i<menu.length; i++) {
			// incoming transfer?
			if (menu[i].innerHTML.match(/Транспортировка из|Транспортування з|transfer from/i)) {
				if (logdiv==null) {
					logdiv = document.createElement('span');
					if (menu[i].parentNode)
					{
						var qtbl = menu[i].parentNode.parentNode;
						qtbl.parentNode.insertBefore(logdiv, qtbl);
					} else {
						var qtbl = menu[i].parentElement.parentElement;
						qtbl.parentElement.insertBefore(logdiv, qtbl);
					}

				}

				var res = menu[i+1].childNodes[1].innerHTML.match(/.*?([0-9]+) [|].*?([0-9]+) [|].*?([0-9]+) [|][^>]*>.*?([0-9]+)/);
				if (!res) res = menu[i+2].childNodes[1].innerHTML.match(/.*?([0-9]+) [|].*?([0-9]+) [|].*?([0-9]+) [|][^>]*>.*?([0-9]+)/);
				if (!res) res = menu[i+2].childNodes[3].innerHTML.match(/.*?([0-9]+) [|].*?([0-9]+) [|].*?([0-9]+) [|][^>]*>.*?([0-9]+)/);
				var tbody = menu[i].parentNode ? menu[i].parentNode : menu[i].parentElement;
				if (tbody.rows.length<2) tbody = menu[i].parentNode ? menu[i].parentNode.parentNode : menu[i].parentElement.parentElement;
				var time = tbody.rows[1].childNodes[1].innerHTML.match(/\"timer[^>]*>([0-9]+):([0-9]+):([0-9]+)/);
				if (!time) time = tbody.rows[1].childNodes[3].innerHTML.match(/\"timer[^>]*>0?([0-9]+):0?([0-9]+):0?([0-9]+)/);
				var hours = parseInt(time[1])+parseInt(time[2])/60.0+parseInt(time[3])/3600.0;
				var tr = document.createElement('tr');
				var td = document.createElement('td');
				td.appendChild(document.createTextNode('Результат'));
				tr.appendChild(td);
				td = document.createElement('td');
				td.setAttribute("colspan", 2);
				var ih = "";
				var timespent = hours-lasttime;
				lasttime = hours;
				var ol = "";
				var ul = "";
				var sum = 0;
				for(var j=0; j<4; j++) {
					if (j) ih += ' | ';
					var rsr = '<img class="res" src="img/un/r/'+(j+1)+'.gif">';
					ih += rsr;
					var delta = parseInt( (harv[j][0]*timespent).toFixed(0) ); // Resources eaten/grows for that time
					var startsize = harv[j][1]; // Start size of resource
					var curdelta = harv[j][3]; // Current delta from start
					var capacity = harv[j][2]; // Capacity of storage
					var trans = parseInt(res[j+1]); // transported size
					/*if (j==0) {
					  ih+="["+
						  "<br>time = "+time.join("][")+
						  "<br>t1="+parseInt(time[1])+
						  "<br>t2="+parseInt(time[2])+
						  "<br>t3="+parseInt(time[3])+
						  "<br>hours = "+hours+
						  "<br>timespent = "+timespent+
						  "<br>startsize = "+startsize+
						  "<br>curdelta = "+curdelta+
						  "<br>capacity = "+capacity+
						  "<br>trans = "+trans+
						  "<br>delta = "+delta+
						  "]";
					}*/
					var fnt = 0; // number of <font> tag to close
					if (delta + startsize+curdelta < 0) { // Eaten more than we have at
						ih += '<font color="red">!'; fnt++;
						var undl = parseInt((delta + startsize+curdelta).toFixed(0));
						if (j==3) {
						  ul += "<br>"+rsr+": underload "+undl+" at "+travtime((lasttime-(undl/harv[j][0])))+" [free="+(capacity-lastmax)+"]";
						  lastmax = -1;
						}
						curdelta += 0 - (startsize+curdelta); // Save total diff of current operation
					} else
					if (delta + startsize+curdelta > capacity) { // Overload before transfer
						ih += '<font color="blue">!'; fnt++;
						if (j==3) ol += "<br>"+rsr+": overload "+parseInt((delta + startsize+curdelta - capacity).toFixed(0));
						curdelta += capacity - (startsize+curdelta); // Save total diff of current operation
					} else {
						curdelta += delta;
					}
					if (startsize+curdelta + trans > capacity) { // Overload after transfer
						ih += '<font color="blue">'; fnt++;
						if (j==3) {
						  ol += "<br>"+rsr+": transfer overload "+parseInt((trans + startsize+curdelta - capacity).toFixed(0))+" at "+travtime(lasttime);
						  lastmax = -2;
						}
						trans = capacity - (startsize+curdelta);
					}
					rsr = trans + startsize+curdelta;
					harv[j][3] = curdelta + trans;
					if (j==3 && (lastmax<0 || lastmax<rsr)) {
					  if (lastmax<-1) lastmax++;
					  else lastmax=rsr;
					}
					sum += rsr;
					ih += rsr;
					for (var q=0; q<fnt; q++) ih += '</font>';
				}
				ih += "(итого: "+sum+")"+'<font color="blue">'+ol+'</font>'+'<font color="red">'+ul+'</font>';
				logres += '<font color="blue">'+ol+'</font>'+'<font color="red">'+ul+'</font>';
				td.innerHTML = ih;
				tr.appendChild(td);
				tbody.appendChild(tr);
			}
		}
		if (logdiv!=null) {
			logdiv.innerHTML = logres;
		}
	}
  //}

  //var eventSource = (navigator.appName == 'Opera') ? document : window;
  //eventSource.addEventListener( 'load', init, false);

})();
