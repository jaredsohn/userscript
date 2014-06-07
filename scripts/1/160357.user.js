// ==UserScript==
// @name             Enemy Objects Scanner [GW]
// @include			 http://www.ganjawars.ru/syndicate.php*
// @version          0.91.260820090021
// @author           Bick
// ==/UserScript==



(function() {
//=====================================
//Переменные менять тут
timeout=6000;
//timeout=1000 - запросы с периодичностью в 1 секунду.
//Если вы часто будете ставить сканирование большого количества обьектов
//и паралельно будете играть в ganjawars - ставьте таймаут в районе 1500-2000
//Если будете запускать на небольшое количество обьектов и при этом
//не будете паралельно играть - ставьте таймаут в районе 1000-1200.
//В любом случае таймаут меньше 900 НЕ РЕКОМЕНДУЕТСЯ
//=====================================
//фигня там выше написана, НЕ ДЕЛАЙТЕ ТАЙМАУТ МЕНЬШЕ 6000, сервер не оценит ваших благих намерений


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
	    } else if (root.document.getElementById('fwprototype') == null) {
	        var script = root.document.createElement('script');
	        script.id   = 'fwprototype';
	        script.type = 'text/javascript';
	        script.src = 'http://www.prototypejs.org/assets/2007/1/18/prototype.js';
	        root.document.body.appendChild(script);
	        root.setTimeout(function() { ajax(url, method, onload); }, 100);
	    } else {
	        root.setTimeout(function() { ajax(url, method, onload); }, 100);
	    }

	//function stolen from Worm. thx
	}
		function quickSort(l,h) {
		var low = l;
	   	var high = h;
	   	var rt = eval( "list[ " + Math.round( ( l + h ) / 2 ) + " ]" );
	   	var middle = new Obj( rt.id, rt.name, rt.ts );
		do {
	    while( isLow( eval( "list[ " + low + " ]" ), middle) )
	    low++;
	    while( isLow( middle, eval( "list[ " + high + " ]" )) )
	    high--;
	    if( low <= high ) {
	    var temp = list[ low ];
	    list[ low++ ] = list[ high ]
	    list[ high-- ] = temp;
	    }
	   	} while( low <= high );
		if( l < high )
	    	quickSort( l, high);
	   	if( low < h )
	    	quickSort( low, h);
	}

	function isLow(low, high){
	 	if (low.ts<high.ts) {return true} else {
		return false;                             }
	}


	function Synd(id,name){
		this.id=id;
		this.name=name;
		this.need=true;
		this.looked=false;
	}
	function Obj(id,name,ts){
		this.synd='';
		this.id=id;
		this.name=name;
		this.owner='';
		this.ownerid=0;
		this.time='';
		this.ts=ts;
		this.sect=''
		this.sx=0;
		this.sy=0;
		this.island='';
	}

	function retResults(){
		quickSort( 0, list.length - 1);
		document.getElementById('resprog').innerHTML='0';
		s="<tr><td colspan=6 class=wb bgcolor=#d0eed0 align=center><b>Результаты сканирования</b></td></tr>";
		var col=false;
		for (var i=0;i<list.length;i++){
			if (col) {
        		var add="";
        	} else {
        		var add="style='background-color:#ffffff'";
        	}
        	col=!col;
			s+="<tr "+add+"><td class=wb width=1%><a href=http://www.ganjawars.ru/syndicate.php?id="+list[i].synd+"&page=online target=blank><img src=http://images.ganjawars.ru/img/synds/"+list[i].synd+".gif></a></td>";
			s+="<td class=wb width=1%><a href=http://www.ganjawars.ru/syndicate.php?id="+list[i].synd+"&page=online target=blank><b>#"+list[i].synd+"</b></a></td>";
            s+="<td class=wb width=50%><nobr><a href=http://www.ganjawars.ru/object.php?id="+list[i].id+"&attack=1 target=blank>"+list[i].name+"</a></nobr></td>";
            s+="<td class=wb width=18%><nobr><a href=http://www.ganjawars.ru/map.php?sx="+list[i].sx+"&sy="+list[i].sy+" target=blank>["+list[i].island+"] "+list[i].sect+"</a> <a href=http://www.ganjawars.ru/map.move.php?gps=1&sxy="+list[i].sx+'x'+list[i].sy+" target=blank>[GO]</a></nobr></td>";

            s+="<td class=wb width=18%><nobr><a href=http://www.ganjawars.ru/info.php?id="+list[i].ownerid+" target=blank><b>"+list[i].owner+"</b></a></nobr></td>";
            s+="<td class=wb width=15%><nobr><b>"+list[i].time+"</b></nobr></td></tr>";
			document.getElementById('resprog').innerHTML=Math.round((i+1)*one*100)/100;
		}
        tbl.innerHTML=s;


	}

	function GetTimes(num){
		ajax('http://www.ganjawars.ru/objectworkers.php?id='+list[num].id,'GET',function (r){
			if (/после (\d+)\.(\d+)\.(\d+) (\d+):(\d+)./i.test(r.responseText)){
				var ti=/после (\d+)\.(\d+)\.(\d+) (\d+):(\d+)./i.exec(r.responseText);
				list[num].time=ti[1]+'.'+ti[2]+'.'+ti[3]+' '+ti[4]+':'+ti[5];
				list[num].ts=ti[1]*24*60+ti[2]*30*24*60+ti[4]*60+ti[5]*1;
			} else {
				list[num].time='неизвестно';
				list[num].ts=0;
			}
			document.getElementById('whenprog').innerHTML=Math.round((num+1)*one*100)/100;
			num++;
	        if (num<list.length){
					root.setTimeout(function(){GetTimes(num);},timeout);
			} else {
					retResults();
			}
		});


	}

	function GetList(num){
		for (i=0;i<cnt;i++){
			if ((synds[i].need)&&(!synds[i].looked)){
				synds[i].looked=true;
				break;
			}
		}
		ajax('http://www.ganjawars.ru/syndicate.php?id='+synds[i].id+'&page=control','GET',function (r){
			var myregexp = /<tr bgcolor=#f0fff0>\n<td class=wb><nobr>&nbsp;<a href=\/object\.php\?id=(\d+)>([^<]+)<\/a><\/nobr><\/td>\n<td class=wb><nobr>&nbsp;<a href=\/map\.php\?sx=(\d+)&sy=(\d+)>\[(.)\] ([^<]+)<\/a><\/nobr><\/td>\n<td class=wb><nobr>&nbsp;<a href=\/info\.php\?id=(\d+)><b>([^<]+)/ig;
			var match = myregexp.exec(r.responseText);
			while (match != null) {
				if (((scanZ)&&(match[5]=='Z'))||((scanG)&&(match[5]=='G'))){
					//owrs;
					list.push(new Obj(match[1],match[2],0));
					list[list.length-1].sx=match[3];list[list.length-1].sy=match[4];
					list[list.length-1].island=match[5];
					list[list.length-1].sect=match[6];
					list[list.length-1].owner=match[8];
					list[list.length-1].ownerid=match[7];
					list[list.length-1].synd=synds[i].id;
				}

				match = myregexp.exec(r.responseText);
			}

	        document.getElementById('getprog').innerHTML=Math.round((num+1)*one*10)/10;
			num++;
			if (num<cnt2){
				root.setTimeout(function(){GetList(num);},timeout);
			} else {
				one=100/list.length;
				GetTimes(0);
			}
		});



	}

	function Continue(){
		cnt2=cnt;
		for (var i=0;i<cnt;i++){
			if (!document.getElementById('check'+i).checked) {
				synds[i].need=false;
				cnt2--;
			}
		}
		scanZ=document.getElementById('scanZ').checked;
		scanG=document.getElementById('scanG').checked;
		s="<tr><td colspan=2 class=wb bgcolor=#d0eed0 align=center><b>Сканирование запущено. Ждите.</b></td></tr>";
		s+="<tr id=gettr><td width=50% class=wb align=right>Получение списка недвижимости:</td><td class=wb align=left><span id=getprog>0</span>% завершено</td></tr>";
		s+="<tr id=whentr><td width=50% class=wb align=right>Узнаем время нападения:</td><td class=wb align=left><span id=whenprog>0</span>% завершено</td></tr>";
		s+="<tr restr><td width=50% class=wb align=right>Формируем результаты:</td><td class=wb align=left><span id=resprog>0</span>% завершено</td></tr>";
        tbl.innerHTML=s;
        one=100/cnt2;
        list=new Array();
        GetList(0);
	}

	function Start(){
	   	tbl = document.getElementsByTagName('td');
	   	for (var i=0;i<=tbl.length;i++){
	   		if ((/^<b>.+<\/b>$/i.test(tbl[i].innerHTML))){
	   			tbl=tbl[i].parentNode.parentNode.parentNode;
				break;
	   		}
	   	}

		s="<tr><td colspan=3 class=wb bgcolor=#d0eed0 align=center><b>Опции сканирования недвижимости</b></td></tr>";
        s+="<tr><td colspan=3 align=center><table width=100%><tr><td align=center><input type=checkbox id='scanG' checked>Сканировать на [G]</td><td align=center><input type=checkbox id='scanZ' checked>Сканировать на [Z]</td></tr></table></td></tr>";
    	syndid=/id=(\d+)/i.exec(root.location.href);
    	syndid=syndid[1];
    	synds=new Array();
    	ajax('http://www.ganjawars.ru/syndicate.php?id='+syndid+'&page=politics','GET',function (r){
			var myregexp = /<li><a href=\/syndicate\.php\?id=(\d+)><b>#\d+<\/b> ([^<]+)</ig;
			var match = myregexp.exec(r.responseText);
			cnt=0;
			while (match != null) {
				synds.push(new Synd(match[1],match[2]));
				s+="<tr><td class=wb width='1px'><input type=checkbox id=check"+cnt+" checked>&nbsp;</td>";
				s+='<td width=1% class=wb><a href=http://www.ganjawars.ru/syndicate.php?id='+match[1]+'page=online><b>#'+match[1]+'</b></a></td>';
				s+='<td class=wb width=100%><a href=http://www.ganjawars.ru/syndicate.php?id='+match[1]+'page=online><b><img src=http://images.ganjawars.ru/img/synds/'+match[1]+'.gif width=20 height=14 border=0> '+match[2]+'</b></a></td>';
				cnt++;
				match = myregexp.exec(r.responseText);
			}

    		s+="<tr><td colspan=3 align=center><table width=100%><tr><td align=center><span onclick=\"for (var j=0;j<"+cnt+";j++){document.getElementById('check'+j).checked=false;}\" style=\"cursor:pointer\"><b>Снять все</b></span></td><td align=center><span onclick=\"for (var j=0;j<"+cnt+";j++){document.getElementById('check'+j).checked=true;}\" style=\"cursor:pointer\"><b>Отметить все</b></span></td></tr></table></td></tr>";
    		tbl.innerHTML=s;
			btncnt=root.document.createElement('tr');
			btncnt.setAttribute('align', 'center');
			btncnt.innerHTML="<td colspan=3 class=wb align='center'><input type=button value='Начать сканирование'</td>";
			btncnt.onclick=function(){Continue();};
            tbl.appendChild(btncnt);

    	});


	}

	var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

	tbl1 = document.getElementsByTagName('center');
	btn=root.document.createElement('span');
	btn.setAttribute('style', 'cursor:pointer');
	btn.innerHTML='&nbsp;|&nbsp;<u>Список для нападений</u>';
	btn.onclick=function(){Start()};
	tbl1[tbl1.length-1].appendChild(btn);



})();