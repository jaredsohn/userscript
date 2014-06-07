// ==UserScript==
// @name           Travian: Info Building 2.1
// @Author         MeXaon, ChuckyBoy
// @email          svgmail@mail.ru; chuckyboy007@gmail.com
// @namespace      Travian
// @description    Info Building
// @include        http://*.travian.*/*
// @exclude        http://forum.travian.*/*
// ==/UserScript==

const _COOKIE='infobuilding';

var Types = new Array();
Types[0] = 'x0'; // _OTHER
Types[1] = 'x1'; // _BUILDING
Types[2] = 'x2'; //_BUILDING2
Types[3] = 'x3'; //_BUILDING3
Types[4] = 'x4'; //_UP_WEAPON
Types[5] = 'x5'; //_UP_ARMORY
Types[6] = 'x6'; //_UP_ACADEMY
Types[7] = 'x7'; //_CR_BARRACKS
Types[8] = 'x8'; //_CR_STABLE
Types[9] = 'x9'; //_CR_WORCKSHOP

var Links = new Array();
Links[1] = ''; // _BUILDING
Links[2] = ''; //_BUILDING2
Links[3] = ''; //_BUILDING3
Links[4] = '&gid=12'; //_UP_WEAPON
Links[5] = '&gid=13'; //_UP_ARMORY
Links[6] = '&gid=22'; //_UP_ACADEMY
Links[7] = '&gid=19'; //_CR_BARRACKS
Links[8] = '&gid=20'; //_CR_STABLE
Links[9] = '&gid=21'; //_CR_WORCKSHOP

var xmlcookie=document.createElement('tree');
var activetown='';
var hintdiv;
var hint_offset_x=0;
var hint_offset_y=0;
var hint_length=300;

var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;

function find(xpath,xpres){
  var ret = document.evaluate(xpath,document,null,xpres,null);
  return  xpres == XPFirst ? ret.singleNodeValue : ret;
}
function elem(tag,idt,idv,class,content){
	var ret=document.createElement(tag);
	if(content)ret.innerHTML=content;
	if(idt)ret.setAttribute(idt,idv);
	if(class)ret.className=class;
	return ret;
};

function parseIntTime(timePart) {
	if (timePart.substr(0,1)==0) {
		if (timePart.length >1) {
			return parseInt(timePart.substr(1,1));
		} else {
			return parseInt(timePart);
		}
	} else {
		if (timePart.length >1) {
			return parseInt(timePart.substr(0,2));
		} else {
			return parseInt(timePart);
		}
	}
}

function main(){
	if (!init())return;
	if (build=document.getElementById("lbau1")){
		//alert("lbau1");
		addinfo(Types[1]);
		if(build.childNodes[1].rows.length>2) {
			addinfo(Types[3]);
		} else if(build.childNodes[1].rows.length>1) {
			loadcookie();
			settree(activetown,Types[3],'id','');
			savecookie();
			addinfo(Types[2]);
		} else if (location.href.indexOf('dorf1.php') != -1){
			//alert("lbau1-else");
			loadcookie();
			settree(activetown,Types[2],'id','');
			settree(activetown,Types[3],'id','');
			savecookie();
		}
	}else if(build=document.getElementById("lbau2")){
		//alert("lbau2");
		addinfo(Types[1]);
		if(build.childNodes[1].rows.length>2) {
			addinfo(Types[3]);
		} else if(build.childNodes[1].rows.length>2) {
			loadcookie();
			settree(activetown,Types[3],'id','');
			savecookie();
			addinfo(Types[2]);
		} else if (location.href.indexOf('dorf2.php') != -1){
			//alert("lbau2-else");
			loadcookie();
			settree(activetown,Types[2],'id','');
			settree(activetown,Types[3],'id','');
			savecookie();
		}
	} else if (location.href.indexOf('dorf1.php') != -1 || location.href.indexOf('dorf2.php') != -1) {
		//alert("dorf1-2 else");
		loadcookie();
		settree(activetown,Types[1],'id','');
		settree(activetown,Types[2],'id','');
		settree(activetown,Types[3],'id','');
		savecookie();
	}
	
	if (location.href.indexOf('build.php') != -1){
		addinfo(Types[0]);
	};
	updatestatus();
	//alert(xmlcookie.innerHTML);
};

function addinfo(t){
	var tt=new Date();
	loadcookie();
	switch(t){
		case Types[1]: {
			buildname=build.childNodes[1].rows[0].cells[1].textContent;
			time=build.childNodes[1].rows[0].cells[2].textContent.split(':');
			tt.setSeconds(tt.getSeconds() + parseIntTime(time[2]));
			tt.setMinutes(tt.getMinutes() + parseIntTime(time[1]));
			tt.setHours(tt.getHours() + parseIntTime(time[0]));
			settree(activetown,Types[1],'id',buildname);
			settree(activetown,Types[1],'time',tt);
			settree(activetown,Types[0], 'act1', build.firstChild.textContent);
			break;
		}
		case Types[2]: {
			buildname=build.childNodes[1].rows[1].cells[1].textContent;
			time=build.childNodes[1].rows[1].cells[2].textContent.split(':');
			tt.setSeconds(tt.getSeconds() + parseIntTime(time[2]));
			tt.setMinutes(tt.getMinutes() + parseIntTime(time[1]));
			tt.setHours(tt.getHours() + parseIntTime(time[0]));
			settree(activetown,Types[2],'id',buildname);
			settree(activetown,Types[2],'time',tt);
			settree(activetown,Types[0], 'act1', build.firstChild.textContent);
			break;
		}
		case Types[3]: {
			buildname=build.childNodes[1].rows[2].cells[1].textContent;
			time=build.childNodes[1].rows[2].cells[2].textContent.split(':');
			tt.setSeconds (tt.getSeconds() + parseIntTime(time[2]));
			tt.setMinutes (tt.getMinutes() + parseIntTime(time[1]));
			tt.setHours (tt.getHours() + parseIntTime(time[0]));
			settree (activetown,Types[3], 'id', buildname);
			settree (activetown,Types[3], 'time', tt);
			settree(activetown,Types[0], 'act1', build.firstChild.textContent);
			break;
		}
		case Types[0]: {
			var a = find("//table[@class='tbg']//tr[@class='cbg1']", XPFirst);
			
			//alert(a.childNodes.length);
			// FIXME: Apanyo para Firefox. FF mete varios nodos extras entre las columnas
	        if (a == null || (a.childNodes.length != 2 && a.childNodes.length != 4 && a.childNodes.length != 5)) return;

			buildname=a.parentNode.rows[0].cells[0].textContent;
			aTimer = document.getElementById("timer1");
			pheader = document.getElementsByTagName("h1");
			treeName = '';
			
			// weapon
			f = find("//a[contains(@href, 'gid=12')]", XPFirst);
			if (f) {
				tempBuildname = 'RESEARCH';
				treeName = Types[4];
			}
			
			// armory
			if (!f) {
				f = find("//a[contains(@href, 'gid=13')]", XPFirst);
				if (f) {
					tempBuildname = 'RESEARCH';
					treeName = Types[5];
				}
			}
			
			// academy
			if (!f) {
				f = find("//a[contains(@href, 'gid=22')]", XPFirst);
				if (f) {
					tempBuildname = 'RESEARCH';
					treeName = Types[6];
				}
			}
			
			// barack
			if (!f) {
				f = find("//a[contains(@href, 'gid=19')]", XPFirst);
				if (f) {
					tempBuildname = 'PRODUCT';
					treeName = Types[7];
				}
			}
			
			//stable
			if (!f) {
				f = find("//a[contains(@href, 'gid=20')]", XPFirst);
				if (f) {
					tempBuildname = 'PRODUCT';
					treeName = Types[8];
				}
			}
			
			// workshop
			if (!f) {
				f = find("//a[contains(@href, 'gid=21')]", XPFirst);
				if (f) {
					tempBuildname = 'PRODUCT';
					treeName = Types[9];
				}
			}
			
			if (!f) { tempBuildname = ''; }
			
			if (treeName != '') {
				if (!aTimer){
					settree(activetown,treeName,'id','');
					tempBuildname = '';
				}
			}
			
			switch (tempBuildname) {
				case 'RESEARCH': {
					var pname = aTimer.parentNode.parentNode.childNodes[3].textContent;
					var time = aTimer.parentNode.parentNode.childNodes[5].textContent.split(':');
					
					tt.setSeconds(tt.getSeconds() + parseIntTime(time[2]));
					tt.setMinutes(tt.getMinutes() + parseIntTime(time[1]));
					tt.setHours(tt.getHours() + parseIntTime(time[0]));
					
					settree(activetown,treeName,'id', a.parentNode.parentNode.rows[0].cells[0].textContent + ': ' + pname);
					settree(activetown,treeName,'time',tt);
					settree(activetown,Types[0],'act2', aTimer.parentNode.parentNode.parentNode.rows[0].cells[0].textContent);
					break;
				}
				case 'PRODUCT': {
					var troopCount = 0;
					var troopName = '';
					for (i=1; i<aTimer.parentNode.parentNode.parentNode.rows.length-1; i++) {
						pname = aTimer.parentNode.parentNode.parentNode.rows[i];
						
						troopCount += parseInt(pname.cells[1].textContent);
						if (troopName.indexOf(pname.cells[2].textContent) == -1) {
							if (troopName == '') {
								troopName = pname.cells[2].textContent;
							} else {
								troopName += ', ' + pname.cells[2].textContent;
							}
						}
						
						if (i == aTimer.parentNode.parentNode.parentNode.rows.length-2) {
							time=pname.cells[3].textContent.split(':');
							tt.setSeconds(tt.getSeconds() + parseIntTime(time[2]));
							tt.setMinutes(tt.getMinutes() + parseIntTime(time[1]));
							tt.setHours(tt.getHours() + parseIntTime(time[0]));
						}
					}
					
					settree(activetown,treeName,'id',pheader[0].textContent + ': ' + troopCount + ' ' + troopName);
					settree(activetown,treeName,'time',tt);
					settree(activetown,Types[0],'act3', aTimer.parentNode.parentNode.parentNode.rows[0].cells[0].textContent);
					break;
				}
			}
			break;
		}
		default: {
			break;
		}
	}
	//alert('savecookie');
	savecookie();
}

function settree(town,com,idname,idvalue){
	var tnode=null;
	var cnode;
	n=xmlcookie.getElementsByTagName('town');
	for(var i=0;i<n.length;i++){
		if(n[i].id==town){
			tnode=n[i];
			break;
		};
	};
	if(tnode==null){
		tnode=elem('town','id',town,'','');
		xmlcookie.appendChild(tnode);
	};
	cnode=tnode.getElementsByTagName(com);
	if(cnode.length==0){
		cnode=elem(com,idname,idvalue);
		tnode.appendChild(cnode);
		cnode.setAttribute(idname,idvalue);
	}else{
		cnode[0].setAttribute(idname,idvalue);
	};
};

function gettree(town,com,idname){
	var tnode=null;
	var cnode;
	n=xmlcookie.getElementsByTagName('town');
	for(var i=0;i<n.length;i++){
		if(n[i].id==town){
			tnode=n[i];
			break;
		};
	};
	if(tnode==null)return false;
	cnode=tnode.getElementsByTagName(com);
	if(cnode.length==0){
		return false;
	}else{
		return cnode[0].getAttribute(idname);
	};
}
function updatestatus(){
	var sw=document.getElementById('statuswork');
	sw.textContent=' Work';
	loadcookie();
	var listtown=xmlcookie.getElementsByTagName('town');
	for(var i=0;i<listtown.length;i++){
		var nametown=listtown[i].id;
		var stown=document.getElementById(nametown);
		if(stown){
			var n = new Array();
			for (j=1;j<10;j++) {
				n[j]=gettree(nametown,Types[j],'id');
			}
			
			var t = new Array();
			for (j=1;j<10;j++) {
				t[j]=gettree(nametown,Types[j],'time');
			}
			
			var linkPoz = 0;
			var itime=0;
			var clmain = 'c3 f10 b';
			var curtime=new Date();
			
			for(var j=1;j<9;j++){
				if (n[j] && n[j]!='') {
					curtime = new Date(t[j]);
					if(!istime(curtime)) {
						clmain = 'c2 f10 b';
						linkPoz = j;
					}
					
					if (itime==0) {
						var time=new Date(t[j]);
						var mtime=new Date(t[j]);
						itime=1;
					} else {
						time=new Date(t[j]);
						mtime=new Date(mintime(mtime, time));
					}
				}
			}
			
			if (itime==1) {
				stown.className=clmain;
				
				// invalid date like 00:00:0?
				try {
					stown.textContent=mtime.toLocaleTimeString().match(/(\d+:\d+)/).pop()+' ';
				} catch (e) {
					stown.textContent = "00:00:0?"
					settree(nametown,Types[j],'time','');
				}
				
				var newdID = stown.parentNode.lastChild.search;
				poz = newdID.indexOf('&');
				if (poz != -1) {
					newdID = newdID.substr(0, poz);
				}
				
				if (linkPoz == 0)	
					stown.parentNode.firstChild.innerHTML = '•';
				else {
					if (linkPoz > 3) {
						linkOut = 'build.php' + newdID + Links[linkPoz] ;
					} else {
						linkOut = 'dorf2.php' + newdID;
					}
					if (stown.parentNode.firstChild.innerHTML.indexOf('href') == -1) {
						stown.parentNode.firstChild.innerHTML += '<a href="'+ linkOut + '"><b>•</b></a>';
					}
				}
			}else{
				stown.className='c2 f10 b';
				if(activetown==nametown){
					stown.textContent='--:--:-- ';
					for (j=1;j<10;j++) {
						if(t[j]==mtime){
							settree(nametown,Types[j],'time','');
							break;
						}
					}
				};
			};
		};
	};
	savecookie();
	sw.textContent='';
};

function istime(time){
	var curtime=new Date();
	var btime=new Date(time);
	if(btime>curtime)return true;
	return false;
}
function mintime(a,b){
	if(!a)return b;
	if(!b)return a;
	var a=new Date(a);
	var b=new Date(b);
	if(a.getTime()==0 && b.getTime()!=0)return b;
	if(b.getTime()==0 && a.getTime()!=0)return a;
	if(a.getTime()>b.getTime())return b;else return a;
}

function getElementsByClassName(oElm, strTagName, strClassName){ // searches the oElm for strTagName objects with strClassName class
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
     
    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement;
    for(var i=0; i<arrElements.length; i++){
        oElement = arrElements[i];      
        if(oRegExp.test(oElement.className)){
       arrReturnElements.push(oElement);
        }   
    }
    return (arrReturnElements)
}

function savecookie(){
	if (typeof GM_setValue == "undefined"){
		var date = new Date();
		date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
		document.cookie = _COOKIE + "=" + escape(xmlcookie.innerHTML) + expires + "; path=/";
	}else GM_setValue(_COOKIE, escape(xmlcookie.innerHTML));
}

function loadcookie(){
	if (typeof GM_getValue == 'undefined'){
		var ca = document.cookie.split(';');
		var nameEQ = _COOKIE + "=";
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length); // Elimina espacios
			if (c.indexOf(nameEQ) == 0) {
				xmlcookie.innerHTML=unescape(c.substring(nameEQ.length, c.length));
				break;
			}
		}
	}else xmlcookie.innerHTML=unescape(GM_getValue(_COOKIE, null));
}

function hint_on(z){
	if(z.target.textContent=='--:--:-- ')return;
	hint_text=genhint(z.target.id,z);
	hintdiv.innerHTML=hint_text;
	hintdiv.style.display='';
	var x=680-hint_length;
	var y=130+window.pageYOffset;
	hintdiv.style.top=y+hint_offset_y+'px';
	hintdiv.style.left=x+hint_offset_x+'px';
}
function hint_off(){
	hintdiv.style.display='none';
}

function genhint(town,z){
	
	var time=new Date();

	var gtOk = new Array();
	var gt = new Array();
	var gtOut='<table bgcolor=#7d99ff cellpadding="2" width="'+hint_length+'">'
	gtOk[1] = 0;
	gt[1] =			'<tr bgColor="#cbe7f9" color="#400000">'+
							'<td colspan="2"><b>'+gettree(town,Types[0],'act1')+'</b></td>'+
						'</tr>';
	gtOk[2] = 0;
	gt[2] = 			'<tr bgColor="#cbe7f9" color="#400000">'+
							'<td colspan="2"><b>'+gettree(town,Types[0],'act2')+'</b></td>'+
						'</tr>';
	gtOk[3] = 0;
	gt[3] = 			'<tr bgColor="#cbe7f9" color="#400000">'+
							'<td colspan="2"><b>'+gettree(town,Types[0],'act3')+'</b></td>'+
						'</tr>';
	clmain = 'c3 f10 b';
	linkPoz = 0;
	
	for (var i=1; i<10; i++) {
		switch (i) {
			case 1: {}
			case 2: {}
			case 3: {
				gtPoz = 1;
				break;
			}
			case 4: {}
			case 5: {}
			case 6: {
				gtPoz = 2;
				break;
			}
			case 7: {}
			case 8: {}
			case 9: {
				gtPoz = 3;
				break;
			}
		}
		name = gettree(town,Types[i],'id');
		if(name){
			time = new Date(gettree(town,Types[i],'time'));
			if(!istime(time)) {
				cl='c2 f10 b';
				clmain='c2 f10 b';
				linkPoz = i;
			} else cl='c3 f10 b';
			
			if (gtOk[gtPoz] == 0) {
				gtOk[gtPoz] = 1;
				gtOut += gt[gtPoz];
			}
			gtOut+=		'<tr bgColor=#f1f3fd>'+
								'<td>'+name+'</td>'+
								'<td class="'+cl+'" width="50" align="center">'+time.toLocaleTimeString()+'</td>'+
							'</tr>';
		}
	}
	
	gtOut+=	'</table>';
	z.target.className=clmain;

	//var currTown = document.getElementById(town);
	var currTown = z.target;
	var newdID = currTown.parentNode.lastChild.search;
	poz = newdID.indexOf('&');
	if (poz != -1) {
		newdID = newdID.substr(0, poz);
	}
	
	if (linkPoz == 0)	
		currTown.parentNode.firstChild.innerHTML = '•';
	else {
		if (linkPoz > 3) {
			linkOut = 'build.php' + newdID + Links[linkPoz] ;
		} else {
			linkOut = 'dorf2.php' + newdID;
		}
		if (currTown.parentNode.firstChild.innerHTML.indexOf('href') == -1) {
			currTown.parentNode.firstChild.innerHTML += '<a href="'+ linkOut + '"><b>•</b></a>';
		}
	}
	
	return gtOut;
}

function init(){
	var z=find('//a[@class="active_vl"]',XPList);
	if(z.snapshotLength==0)return false;
	activetown=z.snapshotItem(0).textContent;
	var tl=document.getElementById('lright1');
	var refr=elem('a','href','#','',' Refresh');
	refr.addEventListener('click',updatestatus,false);
	tl.insertBefore(refr,tl.childNodes[1]);
	var statusrefr=elem('span','id','statuswork','c2 b','');
	tl.insertBefore(statusrefr,tl.childNodes[2]);
	var tdtown=tl.getElementsByTagName('td');
	for(var i=0;i<tdtown.length;i++){
		if(tdtown[i].className=='nbr'){
			var town=tdtown[i].childNodes[2].textContent;
			insnode=elem('span','id',town,'c2 b','--:--:-- ');
			insnode.setAttribute('width','200');
			nextNode=tdtown[i].childNodes[2];
			tdtown[i].insertBefore(insnode,nextNode);
			insnode.addEventListener('mouseover',hint_on,false);
			insnode.addEventListener('mouseout',hint_off,false);
		};
	};
	hintdiv=document.createElement('div');
	hintdiv.setAttribute("id","hintinfo");
	hintdiv.setAttribute("style","position:absolute;z-index:200;display:none;top:0px;left:0px");
	document.body.appendChild(hintdiv);
	return true;
};

main();

///////// 
