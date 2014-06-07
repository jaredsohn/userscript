// ==UserScript==
// @name             Syndicate Wars: Statistics [GW]
// @namespace        http://gwscripts.net
// @include			 http://www.ganjawars.ru/syndicate.php*
// @version          1.10.040920090053
// @author           Bick
// ==/UserScript==


(function f123() {

	function quickSort(l,h) {
		var low = l;
	   	var high = h;
	   	var rt = eval( "dat[ " + Math.round( ( l + h ) / 2 ) + " ]" );
	   	var middle = new usrStat( rt.id, rt.nick, rt.cnt );
		do {
	    while( isLow( eval( "dat[ " + low + " ]" ), middle) )
	    low++;
	    while( isLow( middle, eval( "dat[ " + high + " ]" )) )
	    high--;
	    if( low <= high ) {
	    var temp = dat[ low ];
	    dat[ low++ ] = dat[ high ]
	    dat[ high-- ] = temp;
	    }
	   	} while( low <= high );
		if( l < high )
	    	quickSort( l, high);
	   	if( low < h )
	    	quickSort( low, h);
	}

	function isLow(low, high){
	 	if (low.cnt<high.cnt) {return true} else {
		return false;                             }
	}

	function ajax(url, method, onload) {
	    if (typeof GM_xmlhttpRequest != 'undefined'  && typeof document.all == 'undefined') {
	        GM_xmlhttpRequest({
	            method: method,
	            url: url,
	            onload: onload
	        });
	    } else if (typeof Ajax != 'undefined') {
	        new Ajax.Request(url, {
	            method: method,
	            onComplete: onload
	        });
	    } else if (root2.document.getElementById('fwprototype') == null) {
	        var script = root2.document.createElement('script');
	        script.id   = 'fwprototype';
	        script.type = 'text/javascript';
	        script.src = 'http://www.prototypejs.org/assets/2007/1/18/prototype.js';
	        root2.document.body.appendChild(script);
	        root2.setTimeout(function() { ajax(url, method, onload); }, 100);
	    } else {
	        root2.setTimeout(function() { ajax(url, method, onload); }, 100);
	    }

	//function stolen from Worm. thx
	}

	function btlStat(){
		this.cnt=0;
		this.win=0;
	}

	function usrStat(id,nick,cnt){
		this.id=id;
		this.nick=nick;
		this.cnt=cnt;
		this.win=0;
	}

	function strToTs(str){
		var rrr=/(\d+)\.(\d+)\.(\d+) (\d+):(\d+)/i.exec(str);
		if (rrr==null){
			return false;
		}
		var res=(rrr[1]*1+((20+rrr[3])*1-2009)*365)*24*60+rrr[4]*60+rrr[5]*1;
		for (var i=1;i<rrr[2]*1;i++){
			res+=month[i]*60*24;
		}
		return res;
	}

	function DrawResults(){
	   	s="<tr><td colspan=2 class=wb bgcolor=#d0eed0 align=center><b>Анализ активности и успешности синдиката. Результат</b></td></tr>";
        s+="<tr><td class=wb><nobr><b>Период анализа:</b></nobr></td><td class=wb><nobr>"+document.getElementById('instart').value+" - "+document.getElementById('inend').value+"</nobr></td></tr>";
        var total=defence.cnt+attack.cnt;
        s+="<tr><td class=wb><nobr><b>Количество боёв:</b></nobr></td><td class=wb><nobr>"+total+"</nobr></td></tr>";
        s+="<tr><td class=wb><nobr><b>Количество защит:</b></nobr></td><td class=wb><nobr>"+defence.cnt+" (из них выиграно "+defence.win+")</nobr></td></tr>";
        s+="<tr><td class=wb><nobr><b>Количество нападений:</b></nobr></td><td class=wb><nobr>"+attack.cnt+" (из них выиграно "+attack.win+")</nobr></td></tr>";
        s+="<tr><td class=wb bgcolor=#d0eed0 align=center><nobr><b>Нападающий</b></nobr></td><td class=wb bgcolor=#d0eed0 align=center><nobr><b>Нападений/Побед</b></nobr></td></tr>";
        dat=attackers;
   		quickSort( 0, dat.length - 1);
   		attackers=dat;
        for (var i=attackers.length-1;i>0;i--){
        	s+="<tr><td class=wb><nobr><a href=http://www.ganjawars.ru/info.php?id="+attackers[i].id+" target=blank><b>"+attackers[i].nick+"</b></a></nobr></td><td class=wb><nobr>"+attackers[i].cnt+" (из них выиграно "+attackers[i].win+")</nobr></td></tr>";
        }
        s+="<tr><td class=wb bgcolor=#d0eed0 align=center><nobr><b>Игрок</b></nobr></td><td class=wb bgcolor=#d0eed0 align=center><nobr><b>Принимал участие в * боях</b></nobr></td></tr>";
        dat=usrs;
   		quickSort( 0, dat.length - 1);
   		usrs=dat;
        for (var i=usrs.length-1;i>0;i--){
        	s+="<tr><td class=wb><nobr><a href=http://www.ganjawars.ru/info.php?id="+usrs[i].id+" target=blank><b>"+usrs[i].nick+"</b></a></nobr></td><td class=wb><nobr>"+usrs[i].cnt+"</nobr></td></tr>";
        }
        tbl.innerHTML=s;
	}

	function parseBattles(page){
		ajax('http://www.ganjawars.ru/syndicate.log.php?id='+syndid+'&warstats=1&page_id='+page,'GET',function (r){
			var found=false;
			var myregexp = /<font color=green>(\d+)\.(\d+)\.(\d+) (\d+):(\d+)<\/font>[^|]+\|([^|]+)\|\d+=\d+\|\d+=\d+\|([^|]+)\|([^x]+)x([^|]+)\|([^&]+)&nbsp/ig;
			match = myregexp.exec(r.responseText);
			while (match!=null){
				found=true;
				var s=match[1]+'.'+match[2]+'.'+match[3]+' '+match[4]+':'+match[5];
				var ts=strToTs(s);
				if (ts<st){					DrawResults();
					break;
				}
				if ((ts>=st)&&(ts<=fin)){					var win=false;
					var team=0;
					match[8]=' '+match[8];
					if (match[8].indexOf(syndid)>0){						team='left';
						attack.cnt++;
						if (match[6]==team) attack.win++;
			            var dat=/<(.+)vs/i.exec(match[10]);
			            dat=dat[1];
					} else {

						match[9]=' '+match[9];
					    if (match[9].indexOf(syndid)>0){

								team='right';
								defence.cnt++;
								if (match[6]==team) defence.win++;
					            var dat=/vs (.+)/i.exec(match[10]);
					            dat=dat[1];

					    }
					}

					var myregexp3 = /info\.php\?id=(\d+)[^>]+>([^<]+)/ig;
					m = myregexp3.exec(dat);
					var first=true;

					while (m!=null){
						if ((first)&&(team=='left')){
							first=!first;
							var fnd=false;
							for (var i=0;i<attackers.length;i++){
								if (attackers[i].id==m[1]){
									attackers[i].cnt++;
									if (match[6]=='left') attackers[i].win++;
									fnd=true;
									break;
								}
							}
							if (!fnd){
								attackers.push(new usrStat(m[1],m[2]));
								attackers[attackers.length-1].cnt=1;
								if (match[6]=='left') attackers[attackers.length-1].win=1;
							}
						}
						var fnd=false;
						for (var i=0;i<usrs.length;i++){
							if (usrs[i].id==m[1]){
								usrs[i].cnt++;
								fnd=true;
								break
							}
						}
						if (!fnd){
							usrs.push(new usrStat(m[1],m[2]));
							usrs[usrs.length-1].cnt=1;
						}
						m = myregexp3.exec(dat);
					}
				}
	         	match = myregexp.exec(r.responseText);
            }
            if ((match==null)&&(found)){
            	root2.setTimeout(function(){parseBattles(page+1);},1000);
            } else {
            	DrawResults();
            }
		});
	}


	function Analyze(){
		st=strToTs(document.getElementById('instart').value);
		fin=strToTs(document.getElementById('inend').value);
		if ((!st)||(!fin)){
			showFilter(last);
		}
		defence=new btlStat();
		attack=new btlStat();
		usrs=new Array();
		attackers=new Array();
		parseBattles(0);

	}


	function showFilter(last){
		tbl = document.getElementsByTagName('td');
	   	for (var i=0;i<=tbl.length;i++){
	   		if ((/^<b>.+<\/b>$/i.test(tbl[i].innerHTML))){
	   			tbl=tbl[i].parentNode.parentNode.parentNode;
				break;
	   		}
	   	}
	   	s="<tr><td colspan=2 class=wb bgcolor=#d0eed0 align=center><b>Анализ активности и успешности синдиката. Настройки</b></td></tr>";
	   	s+="<tr><td class=wb align=right>Начало периода:</td><td class=wb><input type=text id=instart value='"+last[1]+"."+last[2]+"."+last[3]+" "+last[4]+":"+last[5]+"'></td></tr>";
	   	s+="<tr><td class=wb align=right>Конец периода:</td><td class=wb><input type=text id=inend value='"+first[1]+"."+first[2]+"."+first[3]+" "+first[4]+":"+first[5]+"'></td></tr>";
	   	s+="<tr><td class=wb align=center colspan=2>Границы периода должны лежать в пределах <b>"+last[1]+"."+last[2]+"."+last[3]+" "+last[4]+":"+last[5]+" - "+first[1]+"."+first[2]+"."+first[3]+" "+first[4]+":"+first[5]+"</b><br>и должны быть указаны в таком-же формате</td></tr>";
	   	tbl.innerHTML=s;
	   	btncnt=root2.document.createElement('tr');
		btncnt.setAttribute('align', 'center');
		btncnt.innerHTML="<td colspan=2 class=wb align='center'><input type=button value='Анализировать'</td>";
		btncnt.onclick=function(){Analyze();};
        tbl.appendChild(btncnt);


	}


	function getFirst(last){
		ajax('http://www.ganjawars.ru/syndicate.log.php?id='+syndid+'&warstats=1&page_id=0','GET',function (r){
			var myregexp = /<font color=green>(\d+)\.(\d+)\.(\d+) (\d+):(\d+)<\/font><\/a>&nbsp;<\/nobr>&nbsp;&nbsp;<nobr>(<b>)?<a href=\/syndicate\.php/i;
			first = myregexp.exec(r.responseText);
			showFilter(last);
		});
	}

	function getLast(lastp){
		ajax('http://www.ganjawars.ru/syndicate.log.php?id='+syndid+'&warstats=1&page_id='+lastp,'GET',function (r){
			var myregexp = /<font color=green>(\d+)\.(\d+)\.(\d+) (\d+):(\d+)<\/font><\/a>&nbsp;<\/nobr>&nbsp;&nbsp;<nobr>(<b>)?<a href=\/syndicate\.php/ig;
			var match = myregexp.exec(r.responseText);
			var fl=false;
			while (match != null) {
				last=match;
				fl=true;
				match = myregexp.exec(r.responseText);
			}
			if (fl){
				getFirst(last);
			} else {
				if (lastp-1>=0){
					root2.setTimeout(function(){getLast(lastp-1);},900);
				}
			}
		});
	}

	function Start(){
     	syndid=/id=(\d+)/i.exec(root2.location.href);
    	syndid=syndid[1];
    	ajax('http://www.ganjawars.ru/syndicate.log.php?id='+syndid+'&warstats=1&page_id=100500','GET',function (r){
			var myregexp = /<a href=\/syndicate\.log\.php\?id=\d+&warstats=1&page_id=(\d+)>/ig;
			var match = myregexp.exec(r.responseText);
			while (match != null) {
				lastp=match[1];
				match = myregexp.exec(r.responseText);
			}
			getLast(lastp);
    	});
	}
    month=new Array();
    month[1]=31;month[2]=28;month[3]=31;month[4]=30;month[5]=31;month[6]=30;month[7]=31;month[8]=31;
    month[9]=30;month[10]=31;month[11]=30;month[12]=31;
	var root2 = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
    var a=document.getElementsByTagName('a');
    var btn=root2.document.createElement('div');
    btn.setAttribute('style', 'cursor:pointer');
    btn.innerHTML='&nbsp;» Анализ активности и успешности синдиката';
    btn.onclick=function(){
    	Start();
    }
    for (var i=0;i<a.length;i++){
    	if (a[i].innerHTML=='Протокол боёв'){
    		a[i].parentNode.appendChild(btn);
    		break;
    	}
    }

})();