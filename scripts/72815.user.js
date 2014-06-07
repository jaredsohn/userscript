// ==UserScript==
// @name 		Clonist
// @version 	2.0
// @description Clone and clone

// @include 	http://*.travian*.*/*.php*
// @exclude 	http://*.travian*.*/hilfe.php*
// @exclude 	http://*.travian*.*/index.php*
// @exclude 	http://*.travian*.*/anleitung.php*
// @exclude 	http://*.travian*.*/impressum.php*
// @exclude 	http://*.travian*.*/gutscheine.php*
// @exclude 	http://*.travian*.*/spielregeln.php*
// @exclude 	http://*.travian*.*/links.php*
// @exclude 	http://*.travian*.*/geschichte.php*
// @exclude 	http://*.travian*.*/tutorial.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/ajax.php*
// @exclude 	http://*.travian*.*/ad/*
// @exclude 	http://*.travian*.*/chat/*
// @exclude 	http://forum.travian*.*
// @exclude 	http://board.travian*.*
// @exclude 	http://shop.travian*.*
// @exclude 	http://*.travian*.*/support.php*
// @exclude  	http://help.travian*.*/*log
// @exclude 	*.css
// @exclude 	*.js
// ==/UserScript==

function clonist(e) {
	
	var crtPage = location.href;
	location.href.search(/http:\/\/(.*)\//);
	var server = RegExp.$1;
	var speed = server.indexOf('speed')!=-1;
	var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
	var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
	var XPIterate = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;

	function find(xpath, xpres, startnode){
		if (!startnode) {startnode = document;}
		var ret = document.evaluate(xpath, startnode, null, xpres, null);
		return  xpres == XPFirst ? ret.singleNodeValue : ret;
	}
	
	function parseURL(URL) {
		var urlParts = URL.split('?', 2);
		if (urlParts.length == 1) urlParts[1] = '';
		var parts = {path: urlParts[0], query: urlParts[1]};
		return parts;
	}

	function getQueryParameters(URL, param) {
		var urlParts = parseURL(URL).query.split('&');
		for (var i = 0; i < urlParts.length; i++) {
			var ki = urlParts[i].split('=');
			if (ki[0] == param) return decodeURIComponent(ki[1]);
		}
	}

	function addQueryParameter(URL, param, value) {
		var add_pair = param + '=' + encodeURIComponent(value);
		var added = false;
		var urlParts = parseURL(URL);
		var pairs = urlParts.query.split('&');
		for (var i = 0; i < pairs.length; i++) {
			var ki = pairs[i].split('=');
			if (ki[0] == param) {
				pairs[i] = add_pair;
				added = true;
				break;
			}
		}
		if (!added) pairs.push(add_pair);
		return urlParts.path + '?' + pairs.join('&');
	}
	
	function getTimeFromLink(a){
		var d = a.textContent.split('/');
		var h = a.title.split(':');
		var dh = d.join(0) + h.join(0);
		return (dh);
	}	
	
	function nav_to(url){ window.location = url; }			
	function buildingFinish(){ nav_to('dorf2.php?buildingFinish=1'); }
	
	function build_up(gid, is_new){
		if (is_new){
			build_gid(gid).call();
		} else {
			try {
				//upgrade
				links = $id('contract').getElementsByTagName('a');
				for(var i=0; i<links.length; i++) { if (links[i].className == 'build' && links[i].href.indexOf('dorf2.php?a=')!=-1){ j = i; break;} }
				nav_to(links[j].href);
			} catch (e) {
				GM_log(e);
			}			
		}
	}
	
	function build_gid(gid){
		return function(){
			var ct=document.getElementById('content');if(ct&&ct.className=='build'){links=ct.getElementsByTagName("a");if(links&&links.length){for(var i=0;i<links.length;i++){if(links[i].href.indexOf("dorf2.php?a=" + gid)!=-1){window.location=links[i].href;break;}}}}
		};
	}
	
	function setVar(key, value){
		GM_setValue(server+'.'+key, value);
	}
	function getVar(key, value){
		return GM_getValue(server+'.'+key, value);
	}
	
	function sendTargets(){
		var inputstring = prompt("Targets( x y [@x1 y1[@x2 y2 ...]] )", getVar('Targets', '') );
		if (inputstring != null) {
			var xys = inputstring.split('@');
			var valid = true;
			for(var i=0; i<xys.length; i++) {
				xx = xys[i].split(' ')[0];
				yy = xys[i].split(' ')[1];
				if (!isNaN(xx) && !isNaN(yy)){
					xx = parseInt(xx);
					yy = parseInt(yy);
					if (xx>400||xx<-400||yy>400||yy<-400){ valid = false; break; }
				} else { valid = false; break; }
			}
			if (valid){
				setVar('Targets', inputstring);
			} else {
				alert('Invalid coordinates');
			}		
		}
	}
	
	function set_sendRatio(){
		var inputstring = prompt("Send Ratio:", getVar('sendRatio', '') );
		if (inputstring != null) {
			var rs = inputstring.split(' ');
			rat = Array(0, 0, 0 ,0);
			var valid = true;
			for(var i=0; i<rs.length; i++) {
				if (!isNaN(rs[i])) rat[i] = parseInt(rs[i]);
			}
			total = rat[1] + rat[2] + rat[3] + rat[0];
			
			if (total > 0){
				setVar('sendRatio', rat.join(' '));
			} else {
				alert('Invalid values');
			}		
		}
	}
	function set_npcRatio(){
		var inputstring = prompt("Npc Ratio:", getVar('npcRatio', '') );
		if (inputstring != null) {
			var rs = inputstring.split(' ');
			rat = Array(0, 0, 0 ,0);
			var valid = true;
			for(var i=0; i<rs.length; i++) {
				if (!isNaN(rs[i])) rat[i] = parseInt(rs[i]);
			}
			total = rat[1] + rat[2] + rat[3] + rat[0];
			
			if (total > 0){
				setVar('npcRatio', rat.join(' '));
			} else {
				alert('Invalid values');
			}		
		}
	}
	function toggleList(){ if (getVar('allowShowList', 'F') == 'T'){ setVar('allowShowList', 'F'); } else { setVar('allowShowList', 'T'); }}
	
	GM_registerMenuCommand('send Targets', sendTargets);	
	GM_registerMenuCommand('send Ratio', set_sendRatio);
	GM_registerMenuCommand('npc  Ratio', set_npcRatio);
	GM_registerMenuCommand('List Account', toggleList);
			
	function basename(path) {return path.replace(/.*\//, "");};
	function page(){return basename(crtPage).split('.php')[0];}
	function $id(x){ return document.getElementById(x); }
	function $name(x){ return document.getElementsByName(x); }
	function $tag(x){ return document.getElementsByTagName(x); }
	function $ipn(x){
		inp = find("//form//input[@name='" + x + "']", XPFirst);
		if (inp) return inp; else return false;
	}
	function $(xpath){
		xpath = xpath.replace(new RegExp('/((^|\|)\s*)([^/|\s]+)/g'),'$2.//$3').replace(/\.([\w-]+)(?!([^\]]*]))/g, '[@class="$1" or @class$=" $1" or @class^="$1 " or @class~=" $1 "]').replace(/#([\w-]+)/g, '[@id="$1"]').replace(/\/\[/g,'/*[');	
		str = '(@\\w+|"[^"]*"|\'[^\']*\')';
		xpath = xpath.replace(new RegExp(str+'\\s*~=\\s*'+str,'g'), 'contains($1,$2)').replace(new RegExp(str+'\\s*\\^=\\s*'+str,'g'), 'starts-with($1,$2)').replace(new RegExp(str+'\\s*\\$=\\s*'+str,'g'), 'substring($1,string-length($1)-string-length($2)+1)=$2');
		return xpath;
	};
	function $$(xpath, root) { 
		xpath = xpath.replace(new RegExp('/((^|\|)\s*)([^/|\s]+)/g'),'$2.//$3').replace(/\.([\w-]+)(?!([^\]]*]))/g, '[@class="$1" or @class$=" $1" or @class^="$1 " or @class~=" $1 "]').replace(/#([\w-]+)/g, '[@id="$1"]').replace(/\/\[/g,'/*[');	
		str = '(@\\w+|"[^"]*"|\'[^\']*\')';
		xpath = xpath.replace(new RegExp(str+'\\s*~=\\s*'+str,'g'), 'contains($1,$2)').replace(new RegExp(str+'\\s*\\^=\\s*'+str,'g'), 'starts-with($1,$2)').replace(new RegExp(str+'\\s*\\$=\\s*'+str,'g'), 'substring($1,string-length($1)-string-length($2)+1)=$2');
		var got = document.evaluate(xpath, root||document, null, 5, null), result=[];
		while (next = got.iterateNext())
			result.push(next);
		return result;
	}
	
	function resources(){
		var res = Array(0, 0 ,0, 0, 0, 0, 0); // total, wood, clay, iron, crop, wh max, gr max
		ww = $id('l4').innerHTML;
		wood = parseInt( ww.split('/')[0] );
		whmx = parseInt( ww.split('/')[1] );
		clay = parseInt( $id('l3').innerHTML.split('/')[0] );
		iron = parseInt( $id('l2').innerHTML.split('/')[0] );
		cc = $id('l1').innerHTML;
		crop = parseInt( cc.split('/')[0] );
		grmx = parseInt( cc.split('/')[1] );
		
		res[0] = wood + clay + iron + crop;
		res[1] = wood;
		res[2] = clay;
		res[3] = iron;
		res[4] = crop;
		res[5] = whmx;
		res[6] = grmx;
		return res;
	}
	function getSendTargets(){
		var rets = Array();
		tgs = getVar('Targets', '');
		if (tgs!=''){			
			tgs = tgs.split('@');
			for(var i=0; i<tgs.length; i++) {
				xy = new Object();
				xy.x = tgs[i].split(' ')[0];
				xy.y = tgs[i].split(' ')[1];
				rets.push(xy);
			}
		}
		return rets;
	}
	function countTargets(){
		tgs = getVar('Targets', '');
		return tgs.split('@').length;
	}
	// only for Targets[0] (1st) 
	function getSendRatio(){
		var rat = Array(4, 1, 1, 1, 1);
		ratio = getVar('sendRatio', '');
		if (ratio!=''){			
			ratios = ratio.split(' ');
			rat[1] = parseInt(ratios[0]);
			rat[2] = parseInt(ratios[1]);
			rat[3] = parseInt(ratios[2]);
			rat[4] = parseInt(ratios[3]);
			rat[0] = rat[1] + rat[2] + rat[3] + rat[4];
		}
		return rat;
	}
	
	function getNpcRatio(){
		var rat = Array(1, 1, 1, 1);
		ratio = getVar('npcRatio', '');
		if (ratio!=''){
			ratios = ratio.split(' ');
			rat[1] = parseInt(ratios[0]);
			rat[2] = parseInt(ratios[1]);
			rat[3] = parseInt(ratios[2]);
			rat[4] = parseInt(ratios[3]);
			rat[0] = rat[1] + rat[2] + rat[3] + rat[4];
		}
		return rat;
	}
	
	function saveAccount(s){
		cR = getVar('accList', '');
		if (cR==''){
			setVar('accList', '@'+s);
		} else {
			if ( cR.indexOf('@'+s) == -1 ) setVar('accList', cR+'@'+s);
		}
	}
	function removeAcc(s){
		cR = getVar('accList', '');
		if (cR!=''){ if (cR.indexOf('@'+s) != -1) setVar('accList', cR.replace('@'+s,'')); }
	}
	
	var DELAY = 2500;
	var en = Array( "Main Building" , "Warehouse" , "Granary" , "Marketplace" );
	var vi = Array("Nhà Chính", "Nhà Kho", "Kho Lúa", "Chợ");
	var gg = Array(15, 10, 11, 17);
	var job = getVar('job', 'nop');
	var handler = null;
	var qTime = 1;
	var qhandler = null;
	var loginhandler = null;
	
	function perform(){
		if (handler) clearTimeout(handler);
		var current_page = page();
		GM_log('perform Page: ' + current_page );
		
		switch (current_page){
			case 'anmelden':
				anmelden();
				//var test = $$('.text');
				//alert(test);
				break;
			case 'activate':
				activate();
				break;
			case 'login':
				login();
				if ( crtPage.indexOf('?')==-1 ) showListAcc();
				break;
			case 'dorf1':
				if (!isDorf1()){ GM_log('invalid dorf1.php'); return false; }
				quest();
				break;
			case 'plus':
				plus(); 
				break;
			case 'build':
				build(); 
				break;
			case 'dorf2':
				dorf2(); 
				break;				
			case 'spieler':
				spieler();
				break;
			case 'logout':
				logout(); 
				break;
			case 'statistiken':
				statistiken();
			default:
				GM_log('Have no action on page ' + current_page);			
		}
		if (current_page!='spieler'){if(getVar('submit_del','N')=='Y') setVar('submit_del', 'N');}		
		//if (current_page!='anmelden' && current_page!='dorf1') handler = setTimeout(perform, DELAY);
	}
	
	perform();
	
	
	/**** PAGES FUNCTION ****/	
	function anmelden(){
		var vids = $name('vid');
		var kids = $name('kid');
		var agb = $ipn('agb');
		var email = $ipn('email');
		var aname = $ipn('name');
		var pw = $ipn('pw');		
		
		if (agb) agb.checked = true;
		
		gmRace = GM_getValue(server+'.Race', 'G');
		var ii = gmRace=='R'?1:(gmRace=='T'?2:(gmRace=='G'?3:false));
		if (ii) for(var i=0; i<vids.length; i++) { if(vids[i].value==ii)vids[i].checked=true; }
		
		gmQuad = GM_getValue(server+'.Quad', 'NE');
		var jj = gmQuad=='NW'?1:(gmQuad=='NE'?2:(gmQuad=='SW'?3:(gmQuad=='SE'?4:0)));
		if (jj) for(var i=0; i<kids.length; i++) { if(kids[i].value==jj)kids[i].checked=true; }
		
		if (email) email.addEventListener('change', function(){
			reg_name = this.value.split('_')[0];
			aname.value = reg_name;
			pw.value = reg_name.substr(0,3) + '1';
		}, false);
		
		if (vids.length == 3)
		for(var i=0; i<vids.length; i++) {
			vids[i].addEventListener('click', function(){
				switch (parseInt(this.value)) {
					case 1: //R
						setVar('Race', 'R');
						break;
					case 2: //T
						setVar('Race', 'T');
						break;
					case 3: //G
						setVar('Race', 'G');
						break;
					default:
						GM_log('Out of races values: ' + this.value);
						break;
				}

			}, false);
		}
		
		if (kids.length == 5)
		for(var i=0; i<kids.length; i++) {
			kids[i].addEventListener('click', function(){
				switch (parseInt(this.value)) {
					case 1: //NW
						setVar('Quad', 'NW');
						break;
					case 2: //NE
						setVar('Quad', 'NE');
						break;
					case 3: //SW
						setVar('Quad', 'SW');
						break;
					case 4: //SE
						setVar('Quad', 'SE');
						break;
					case 0: //RANDOM
						setVar('Quad', 'RD');
						break;
					default:
						GM_log('Out of quads values: ' + this.value);
						break;
				}

			}, false);
		}
		
		setVar('allowShowList', 'F');
		
		//alert( document.cookie );
	}
	
	function activate(){
		links = $id('content').getElementsByTagName('a');
		var j = -1;
		for(var i=0; i<links.length; i++) {
			if (links[i].href.indexOf('login.php?name=')!=-1){
				j = i;
				break;
			}
		}
		if (j!=-1){
			saveAccount(links[j].href.split('name=')[1]);
			nav_to(links[j].href); 
		} else {
			GM_log('Link not found.');
		}
	}
	
	function login(){
		loginName = getQueryParameters(crtPage, 'name');
		if ( typeof(loginName) != 'undefined' ){
			setVar('TargetIndex', '0');
			setVar('allowNPC', 'F');
			setVar('logonName', loginName);
			pazz = loginName.substr(0,3) + '1';
			$ipn('password').value = pazz;			
			document.forms[0].submit();
		} else if (crtPage.split('?')[1] == 'del_cookie'){
			if ( getVar('allowShowList', 'F') == 'T' ) { showListAcc(); return false; } else nav_to('anmelden.php');
		} else {
			GM_log('Invalid login.php page: ' + crtPage);
		}
	}
	
	function spieler(){
		var del_table = $id('del_acc');
		if (!del_table){ if (getVar('DelAccount', 'F')=='T') nav_to('spieler.php?s=3');}
		else {
			var is_found = false;
			for(var i=0; i<del_table.rows.length; i++) {
				for(var j=0; j<del_table.rows[i].cells.length; j++) {
					if (del_table.rows[i].cells[j].className == 'count') { is_found = true; break; }
				}
				if (is_found) break;
			}
			if(is_found){
				// just deleting.
				nav_to('logout.php');
			} else {
				// fill form & submit
				delete_checkbox = $ipn('del');
				if (delete_checkbox && setVar('submit_del', 'N')!='Y'){
					delete_checkbox.checked = true;
					var logonName = GM_getValue(server+'.logonName', '');
					if (logonName!=''){
						pazz = logonName.substr(0, 3) + '1';
						$ipn('del_pw').value = pazz;
						setVar('submit_del', 'Y');			
						document.forms[0].submit();	
					}					
				} else {
					window.scroll(0, 500);
					$ipn('del_pw').focus();
				}
			}
		}
	}
	
	function logout(){
		if (true) {
			setVar('submit_del', 'N');
			setVar('logonName', '');
			setVar('job', '');
			setVar('Quest', '0');
			setVar('TargetIndex', '0');
			nav_to('login.php?del_cookie');
		}			
	}
	function incTargetIndex(){
		TGLength = countTargets();
		index = parseInt( getVar('TargetIndex', '0') );
		index = index + 1;
		if (index < TGLength){
			setVar('TargetIndex', index);
			return true;
		} else {
			return false;
		}
		
	}
	function build(){
		//if ($id('build').className=='gid17' && $id('target_validate')){ document.forms[0].submit(); return false; }
		GM_log('page build: job = ' + job);
		switch (job) {
			case 'build_phase':
				if (getVar('Quest', '0')=='3') setVar('Quest', '0')
				crtPage.search(/\?id=(\d+)/);
				var id = parseInt(RegExp.$1);				
				var new_building = $id('build').className == 'gid0';				
				switch ( id ) {
					case 19:						
						build_up(10, new_building);
						break;
					case 20:
						build_up(11, new_building)
						break;
					case 21:
						build_up(17, new_building);
						break;
					case 26:
						build_up(15, new_building);
						break;
					default:
						GM_log('Param Id: ' + id);
						break;
				}
				break;
			case 'npc':
				try {
					// get current resource					
					var res = resources();
					//GM_log(server + ":" + res);
					var m2 = document.getElementsByName('m2[]');
					var r = getNpcRatio();
					if (r[0]==0) { return false; }
					
					ww = Math.floor(r[1]/r[0]*res[0]);
					cc = Math.floor(r[2]/r[0]*res[0]);
					ii = Math.floor(r[3]/r[0]*res[0]);
					cr = res[0]-(ww+cc+ii);
					
					
					// portionOut 2
					ww = ww>res[5] ? res[5]:ww;
					cc = cc>res[5] ? res[5]:cc;
					ii = ii>res[5] ? res[5]:ii;
					cr = cr>res[6] ? res[6]:cr;
					
					var more = res[0] - (ww+cc+ii+cr);
					
					if (more>0){ ww=(ww+more)>res[5]?res[5]:(ww+more); }
					more = res[0] - (ww+cc+ii+cr);
					if (more>0){ cc=(cc+more)>res[5]?res[5]:(cc+more); }
					more = res[0] - (ww+cc+ii+cr);
					if (more>0){ ii=(ii+more)>res[5]?res[5]:(ii+more); }
					more = res[0] - (ww+cc+ii+cr);
					if (more>0){ cr=(cr+more)>res[6]?res[6]:(cr+more); }
					
					m2[0].value = ww;
					m2[1].value = cc;
					m2[2].value = ii;
					m2[3].value = cr;
					
					GM_log('Total: ' + (ww+cc+ii+cr));
					//unsafeWindow.portionOut();
					setVar('job', 'justnpc');	
					document.forms[0].submit();		
				} catch (e) {
					GM_log(e);
				}
				break;
			case 'push':
				try {
					GM_log('Send to target ' + getVar('TargetIndex') );
					// if validate page, submit
					if ($id('send_validate') && $id('target_validate')){ incTargetIndex(); document.forms[0].submit(); return false; }
					
					// if error
					var error = find("//p[@class='error']", XPFirst);
					if (error && error.firstChild.nodeName == 'A'){
						// same ip or sent
						if ( incTargetIndex() ){
							next_target = true;
						} else {							
							return false;
						}
					}
					else if (error){ return false; }
					
					// check mers
					var mers = $id('target_select').rows[0].cells[0].innerHTML;
					nbMcs = mers.split('/')[0].split(' ');
					nbMmx = parseInt(mers.split('/')[1]);
					nbMcs = parseInt(nbMcs[nbMcs.length-1]);
					if (nbMcs == 0){ nav_to('spieler.php?s=3'); return false; }
					try{
						tdmax = find("//table[@id='send_select']//td[@class='max']", XPFirst);
						textmax = tdmax.getElementsByTagName('a')[0].innerHTML;
						var mmax = parseInt(textmax.replace(/\(|\)/g, '')); 
					}catch(e){}
					var maxres = speed ? 1512 : 504;
					if (maxres>nbMcs*mmax){ maxres = nbMcs*mmax; }
					
					// get current resource
					var res = resources();
					
					// fill 4 kind of res
					if (maxres >= res[0]){
						$ipn('r1').value = res[1];
						$ipn('r2').value = res[2];
						$ipn('r3').value = res[3];
						$ipn('r4').value = res[4];
					} else {
						// send ratio
						r = getSendRatio();
						if (r[0]==0) return false;
						ww = Math.floor(r[1]/r[0]*maxres);
						cc = Math.floor(r[2]/r[0]*maxres);
						ii = Math.floor(r[3]/r[0]*maxres);
						cr = Math.floor(r[4]/r[0]*maxres);
						
						// if > resources
						ww = ww > res[1] ? res[1] : ww;
						cc = cc > res[2] ? res[2] : cc;
						ii = ii > res[3] ? res[3] : ii;
						cr = cr > res[4] ? res[4] : cr;
						
						more = maxres - (ww+cc+ii+cr);
						if (more>0) { ww = (ww+more)>res[1] ? res[1] : (ww+more); }
						
						more = maxres - (ww+cc+ii+cr);
						if (more>0) { cc = (cc+more)>res[2] ? res[2] : (cc+more); }
						
						more = maxres - (ww+cc+ii+cr);
						if (more>0) { ii = (ii+more)>res[3] ? res[3] : (ii+more); }
						
						more = maxres - (ww+cc+ii+cr);
						if (more>0) { cr = (cr+more)>res[4] ? res[4] : (cr+more); }
						
						$ipn('r1').value = ww;
						$ipn('r2').value = cc;
						$ipn('r3').value = ii;
						$ipn('r4').value = cr;
						
					}
					
					var crx = $ipn('x').value;
					var cry = $ipn('y').value;
					//GM_log('[X = ' + isNaN(crx) + ', Y = ' + isNaN(cry) + ']');
					if (isNaN(crx) || isNaN(cry) || crx=='' || cry=='' || next_target){
						GM_log('Use predefined targets');
						var Targets = getSendTargets();
						var Index   = getVar('TargetIndex', '0');
						Index = parseInt(Index);
						if (Targets.length <= Index) { GM_log('All targets checked'); return false; }
						$ipn('x').value = Targets[Index].x;
						$ipn('y').value = Targets[Index].y;						
						next_target = false;				
//						if (nbMmx==nbMcs){
//							// mer 2/2							
//							if (Targets.length<1){ return false; }
//							GM_log(nbMcs +'/'+nbMmx + 'mers, send to (' + Targets[0].x + '|' + Targets[0].y + ')');
//							$ipn('x').value = Targets[0].x;
//							$ipn('y').value = Targets[0].y;	
//						} else {							
//							if (Targets.length<2){ return false; }
//							GM_log(nbMcs +'/'+nbMmx + 'mers, send to (' + Targets[1].x + '|' + Targets[1].y + ')');
//							$ipn('x').value = Targets[1].x;
//							$ipn('y').value = Targets[1].y;						
//						}					
					}
					document.forms[0].submit();					
				} catch (e) {
					GM_log(e);				
				}
				break;
			case 'justnpc':
				setVar('job', 'push');
				nav_to('build.php?gid=17');
				break;		
			default:
				GM_log('Current Job: ' + job);
				break;
		}
	}
	function isDorf1(){
		is_dorf1 = false;
		try {
			is_village1 = $id('content').className == 'village1';
			is_village_map = $id('village_map').className == 'f3'; // new village 4446
			is_dorf1 = is_village1 && is_village_map;
		} catch (e) {
			GM_log(e);
		}
		return is_dorf1;		
	}
	function quest(){
		// check quest
		GM_log(">> Quest " + qTime++);		
		if (qhandler) clearTimeout(qhandler);
		if (qTime==5 && find("//div[@id='side_navi']/p[@class='deltimer']", XPFirst) ){
			unsafeWindow.qst_handle();
			qTime++;
		} else if (qTime > 10){ return false; }
		var qst_accpt = $id('qst_accpt'); // 3 link	
		if (qst_accpt && parseInt(getVar('Quest', '0'))<3){
			links = qst_accpt.getElementsByTagName('a');
			nb_link = links.length;
			
			if (nb_link == 3){
				setVar('Quest', '1');
				nav_to(links[2].href);
			} else if (nb_link == 2){
				setVar('allowNPC', 'T');
				setVar('Quest', '2');				
				nav_to(links[1].href);
			} else if (nb_link == 0){
				setVar('Quest', '3');
				try{						
					document.getElementById('qst_val').value=1337;
					unsafeWindow.qst_enter();					
				}catch(e){}
			} else {
				GM_log('Invalid quest step');
			}				
		} else {		
			quest_step = getVar('Quest', '0');
			if (quest_step == '3'){
				if (speed || getVar('allowNPC', 'F')!='T'){
					setVar('job', 'build_phase');
					nav_to('dorf2.php');
				} else {
					setVar('job', 'crop_active');
					nav_to('plus.php?id=3');
				}
			}
		}		
		qhandler = setTimeout(quest, 1000);
	}
	
	function plus(){
		GM_log('page plus: job = ' + job);
		quest_step = getVar('Quest', '0');
		if (quest_step=='3' && job=='crop_active' && $id('logo').firstChild.className=='logo_plus'){
			//active crop
			var acts = Array('a0', 'a1', 'a2', 'a3', 'a4');
			var href = Array('a0', 'a1', 'a2', 'a3', 'a4');
			alinks = find("//td[@class='act']//a", XPList);
			for(var i=0; i<alinks.snapshotLength; i++) {				
				tmpi = alinks.snapshotItem(i);
				try { var aid = parseInt(tmpi.href.split('a=')[1].split('&')[0]); } catch (e) { var aid = -1; }				
				if (aid>=0 && aid<5){ acts[aid] = tmpi.innerHTML; href[aid]=tmpi.href; }				
			}
			if (acts[4] != acts[0]){
				if (href[4].indexOf('.php')!=-1) nav_to(href[4]);
				else return false;
			} else {
				setVar('job', 'build_phase');
				nav_to('dorf2.php');	
				//nav_to('build.php?id=26');
			}
		}
	}
	
	function dorf2(){		
		// check building [main, GR, WH, MP]
		var mb = 0;
		var wh = 0;
		var gr = 0;
		var mp = 0;		
		// checking
		try {
			mb_Div = find("//div[@id='village_map']//img[starts-with(@class, 'building') and contains(@class, 'g15')]", XPFirst);
			mb_pos = mb_Div.className.split(' ')[1];
			mb_level = find("//div[@id='levels']/div[contains(@class, '" + mb_pos + "')]", XPFirst).innerHTML;
			mb = parseInt(mb_level);
		} catch (e) {}
		try {
			wh_Div = find("//div[@id='village_map']//img[starts-with(@class, 'building') and contains(@class, 'g10')]", XPFirst);
			wh_pos = wh_Div.className.split(' ')[1];
			wh_level = find("//div[@id='levels']/div[contains(@class, '" + wh_pos + "')]", XPFirst).innerHTML;
			wh = parseInt(wh_level);
		} catch (e) {}
		try {
			gr_Div = find("//div[@id='village_map']//img[starts-with(@class, 'building') and contains(@class, 'g11')]", XPFirst);
			gr_pos = gr_Div.className.split(' ')[1];
			gr_level = find("//div[@id='levels']/div[contains(@class, '" + gr_pos + "')]", XPFirst).innerHTML;
			gr = parseInt(gr_level);
		} catch (e) {}
		try {
			mp_Div = find("//div[@id='village_map']//img[starts-with(@class, 'building') and contains(@class, 'g17')]", XPFirst);
			mp_pos = mp_Div.className.split(' ')[1];
			mp_level = find("//div[@id='levels']/div[contains(@class, '" + mp_pos + "')]", XPFirst).innerHTML;
			mp = parseInt(mp_level);
		} catch (e) {}
		
		//alert(mb + " - " + wh + " - " + gr + " - " + mp);
		
		// check building_contract
		var bc = $id('building_contract');
		if (bc){
			var nbb = bc.rows.length-1;
			if (nbb==1){
				var bn = bc.rows[1].cells[1].innerHTML.split(' (')[0];
				if (bn==vi[0] || bn==en[0]) mb++;
				if (bn==vi[1] || bn==en[1]) wh++;
				if (bn==vi[2] || bn==en[2]) gr++;
				if (bn==vi[3] || bn==en[3]) mp++;
				
			} else if(nbb==2){
				var bn1 = bc.rows[1].cells[1].innerHTML.split(' (')[0];
				var bn2 = bc.rows[2].cells[1].innerHTML.split(' (')[0];
				
				if (bn1==vi[0] || bn1==en[0]) mb++;
				if (bn1==vi[1] || bn1==en[1]) wh++;
				if (bn1==vi[2] || bn1==en[2]) gr++;
				if (bn1==vi[3] || bn1==en[3]) mp++;
				
				if (bn2==vi[0] || bn2==en[0]) mb++;
				if (bn2==vi[1] || bn2==en[1]) wh++;
				if (bn2==vi[2] || bn2==en[2]) gr++;
				if (bn2==vi[3] || bn2==en[3]) mp++;
			}
		} else {
			var nbb = 0;
		}		
		// GM_log( 'building: ' + nbb + "\n" + 'job: ' + job + "\n" + 'Main lv ' + mb + "\n" + 'WH   lv ' + wh + "\n" + 'GR   lv ' + gr + "\n"	+ 'MP   lv ' + mp);
		var mpx = speed ? 1 : 2;
		if (speed){
			res = resources();
			if (res[0] > 1512){ mpx = 2; }
		}
		
		var incLv = (3-mb) + (1-wh) + (1-gr) + (mpx-mp);
		if (incLv<0) incLv = 0;				
		if ((nbb==2 && incLv>=0)||(nbb==1 && incLv==0)){
			buildingFinish(); // use gold.
		} else if (nbb==0 && incLv==0){
			var npc_ratio = getVar('npcRatio', '');
			var allowUseGold = getVar('allowNPC', 'F')=='T';		
			if (npc_ratio != '' && allowUseGold){
				// goto npc page
				setVar('job', 'npc');
				nav_to('build.php?gid=17&t=3');
			} else {
				// goto marketplace
				setVar('job', 'push');
				nav_to('build.php?gid=17');
			}
		} else {
			// nbb = 0 or 1, incLv > 0				
			if (mb<3) nav_to('build.php?id=26');
			else if (wh<1) nav_to('build.php?id=19');
			else if (gr<1) nav_to('build.php?id=20');
			else if (mp<mpx) nav_to('build.php?id=21');				
		}				
	}
	
	function statistiken(){
		GM_log('>> statistiken');
		var table = $id('player');
		if (table)
		for(var i=0; i<table.rows.length; i++) {
			r = table.rows[i];
			pla = r.cells[1] ? r.cells[1].firstChild.innerHTML : false;
			if (pla){
				if ( getVar('accList', '@').indexOf('@'+pla)!=-1 ){ r.cells[1].style.backgroundColor='#9ff'; } 
				a = document.createElement('a');
				a.href = 'login.php?name='+pla;
				a.target ='_blank';
				//a.style.cssFloat = 'right';
				a.innerHTML = '<img src="img/x.gif" class="external" title="Login"/>';
				r.cells[1].appendChild(a);
			}
				//alert(pla);				
		}
		window.scroll(0, 208);
	}
	
	function allowShow(T){ setVar('allowShowList', T); };	
	function showListAcc(){
		if ( getVar('allowShowList')!='T' ){ return false; };
		var alist = getVar('accList', '@');
		if (alist != '@'){
			Acc = alist.split('@');
			$id('side_info').innerHTML = '';
			var tablelist = document.createElement('table');			
			tablelist.className = 'list';
			// head
			TD = tablelist.appendChild( document.createElement('td') );
			
			a = TD.appendChild( document.createElement('a') );
			a.innerHTML = "Exports";
			a.href = "javascript: return false;";
			a.addEventListener('click', function(){ var inputstring = prompt("Clone list:", getVar('accList', '') );  }, false);
			
			TD.appendChild( document.createTextNode(' | ') );
			a = TD.appendChild( document.createElement('a') );
			a.href = "javascript: return false;";
			a.innerHTML = "AutoLogin: " + getVar('autologin', 'OFF');
			a.addEventListener('click', function(){
				off = getVar('autologin', 'OFF') == 'OFF';
				if (off){
					setVar('autologin', 'ON');
					this.innerHTML = "AutoLogin: ON";
					loginhandler = setTimeout(checklogin, 3000);
				} else {
					setVar('autologin', 'OFF');
					this.innerHTML = "AutoLogin: OFF";
					if (loginhandler) clearTimeout(loginhandler);
				}
			}, false);
			TD.setAttribute('colspan', '3');// = '3';
			var pp = Acc.length > 99 ? 3 : (Acc.length > 9 ? 2 : 2);
			var count = 1;
			for(var i=0; i<Acc.length; i++) {
				if (Acc[i] && Acc[i]!=''){			
					TR = tablelist.appendChild( document.createElement('tr') );
					
					TD = TR.appendChild( document.createElement('td') );
					TD.innerHTML = pad(count++, pp);
					TD.className = 'dot';
					
					TD = TR.appendChild( document.createElement('td') );
					TD.className = 'link';
					
					A = TD.appendChild( document.createElement('a') );
					A.innerHTML = Acc[i];
					A.href = '/login.php?name=' + Acc[i];
					if (Acc[i] == getVar('LastLog', '')){ A.style.color = '#f00'; }
					A.addEventListener('click', function(){
						setVar('LastLog', this.innerHTML);
					}, false);
					
					TD = TR.appendChild( document.createElement('td') );
					B = TD.appendChild( document.createElement('a') );
					B.innerHTML = '<img alt="DeL" title="Xóa" class="del" src="img/x.gif">';
					B.href = 'javascript: return false;';			
					B.addEventListener('click', function(){
						var aname = this.parentNode.parentNode.cells[1].firstChild.innerHTML;
						if(aname){
							accList = getVar('accList', '@');
							if (accList!='@'){
								setVar('accList', accList.replace('@'+aname, ''));
								showListAcc();
							}
						}
						return false;
					}, false);
				}
			}
			$id('side_info').appendChild(tablelist);
			
			if ( getVar('autologin', 'OFF') == 'ON' ) { loginhandler= setTimeout(checklogin, 2000); }
			
			
		}
	}
	function pad(n, p){ if (p==3){ if (n<10) return '00'+n; else if(n<100) return '0'+n; else return n; } else { if (n<10) return '0'+n; else return n; }}
	function checklogin(){
		GM_log('>> Check Login');
		lastacc = getVar('LastLog', 'NULL');
		if (lastacc != 'NULL'){
			listacc = getVar('accList', '@');
			if (listacc != '@'){
				if ( listacc.indexOf('@'+lastacc+'@')!=-1 ){
					nextacc = listacc.split('@'+lastacc+'@')[1].split('@')[0];
					if (nextacc){
						setVar('LastLog', nextacc);						
						nav_to('login.php?name='+nextacc);
					}
				} else if (listacc.indexOf('@'+lastacc)!=-1){					
					if (loginhandler) clearTimeout(loginhandler);
					return false;
				} else {
					//alert('first'); return false;
					firstacc = listacc.split('@')[1];
					setVar('LastLog', firstacc);	
					nav_to('login.php?name='+firstacc);
				}
			}			
		} else {
			listacc = getVar('accList', '@');
			if (listacc != '@'){
				//alert('first0'); return false;
				firstacc = listacc.split('@')[1];
				setVar('LastLog', firstacc);	
				nav_to('login.php?name='+firstacc);
			}			
		}		
	}
	
};

if (window.addEventListener) {
	window.addEventListener('load', clonist, false);
} else {
	window.attachEvent('onload', clonist);
}