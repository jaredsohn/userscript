// ==UserScript==
// @name             Syndicate Online Analyzer [GW]
// @namespace        http://gwscripts.net
// @include			 http://www.ganjawars.ru/syndicate.php*page=online
// @version          2.20.040120102210
// @author           Bick
// ==/UserScript==


(function f123() {
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


	function Pers(nick,id,lvl){
		this.nick=nick;
		this.id=id;
		this.sign=0;
		this.lvl=lvl;
		this.rank=0;
		this.hp='';
		this.osnova=0;
		this.island='';
		this.imennih=0;
		this.imennoe='';
		this.items='';

	}

	function GetInfo(lst,num){
    	ajax('http://www.ganjawars.ru/info.php?id='+lst[num].id,'GET',function(req){
    		btn.innerHTML=' [ '+Math.round(100*(num+1)/lst.length)+'% ]';
    		//osnova. to be or not to be;
			if (/<\/b> #\d+ <a/i.test(req.responseText)){
				var info=/<\/b> #(\d+) <a/i.exec(req.responseText);
				if ((info[1]==syndid)||(info[1]==souzid)){
					//osnova=OK.
                	lst[num].osnova=info[1];
                	if (/(\d+)\.gif width=20/i.test(req.responseText)){
                		//sign=OK.
                		var info=//(\d+)\.gif width=20/i.exec(req.responseText);
                		lst[num].sign=info[1];
                	}
				}
			}
			if (lst[num].osnova>0){
				//if not osnova then bye
				var info=/color=#99000><b>(\d+)/i.exec(req.responseText);
				lst[num].lvl=info[1];
				if (lst[num].lvl>9){
					var info=/\n\[(-?\d+) \/ (\d+)\]/i.exec(req.responseText);
					if (info[1]<0){
                      	lst[num].hp='<strike>[ <font color=#990000>'+info[1]+'</font> / '+info[2]+' ]</strike>';
					} else
					if (info[1]/info[2]<0.8){
						lst[num].hp='[ <font color=#990000>'+info[1]+'</font> / '+info[2]+' ]';
					} else {
						lst[num].hp='[ <font color=#009900>'+info[1]+'</font> / '+info[2]+' ]';
					}
					var info=/img\/rank(\d)/i.exec(req.responseText);
					if (info[1]) lst[num].rank=info[1];
					var s=false;
					var info=/Район:<\/b>[^>]+>\[(.)\]/i.exec(req.responseText);
					if (info){
						lst[num].island=info[1];
					} else {
						lst[num].island='O';
					}
ne_imennoe=' saw_airsoft,treugolka,bronik3c,pb_marker,rogatka,9may,salo,potato2,6y_mazda,6y_2106,6y_bmw,6y_audi,l96,149s,cz527,m40,police,mauser,remington700,psg,ssg,m76,svd,om50,ssg2000,b94,ssg3000,falcon,f2,m24,savage10fp,steyr_iws,savage100fp,tikka,cz700,eaglegold,eagle,ttgun,rbcat,pistol,schmeisser,ak_74,m16,l1a1,aks,hk53,sg541,xm8,steyr,trw,sig,stg44,m14,sar,cz_sa,g3,fara83,g3aa,arx160,sr88,fnfal,m82,fs2000,fnscar,bofors,m17s,hk417,uzi,calico,lf57,ump,gg95,m4,mas38,kashtan,suomi,ingram,colt,walther,fmk3,vihr,saf,mpi81,agram,bizon,kedr,colt636,fn_min,lewis,type95,fnmag,bren,l86,m16a2,mg3,type62,ar70,p41,saw,zb53,nsv,type67,galil,sig710,m60,vickers,vz59,mg36,m61,aat,xm312,hunter,remington,sgun2,m37,toz,jackhammer,spas12,striker,saiga,rmb93,neostead,xm26,hawk,benelli,rpg,glauncher,grg,paw20,rpgu,grom2,ags30,gm94,gl06,gmg,anm14,m34ph,rgd5,grenade_f1,rgd2,lightst,lights,rkg3,mdn,rgd2m,rgo,rgn,emp_ir,fg3l,emp_s,m67,m3,hg78,hg84,fg6,narmour,bronik1,bronik2,bronik3,bronik4,bronik5,bronik6,carmour,sarmour7,armour_alpha,tset,tbelt,saperka,saperka2,nhelmet,helmet1,helmet2,helmet3,helmet4,dhelmet,thelmet,m1helmet,pasfgt,defender,kboots,hshields,armyboots,lowshield1,heavyboots,boots,nboots,shboots,nmask,mask1,mask2,maskp,backpack,glasses1,svision,irt7,bigbackpack,ivision,nokia3310,erict29,sme45,nokia8910,st300,px11,nokia7200,nokia6110,n82,gps,bike,motobike,celica,kamaz,lexus,boat1,yacht1,boat2,parom,buket1,buket2,buket3,buket4,buket5,buket6,buket7,buket8,buket9,buket10,buket11,buket12,buket13,buket14,buket15,buket16,buket17,buket18,buket19,buket20,buket21,buket22,buket23,buket24,buket25,buket26,buket27,buket28,buket29,buket30,buket31,buket32,buket33,buket34,buket35,buket36,buket37,buket38,buket39,buket40,buket41,abvgd,toy1,toy2,toy3,toy4,toy5,toy6,toy7,toy8,toy9,toy10,toy11,vepr,mossberg,mag7,usas12,an94,f2000,fnfnc,hk_416,groza,ka90,taiga,xcr,tkb517,ak103,g36,g41,ameli,hk21,rpk74,pkm,m16lmg,aa52,mg43,pssg,spitfire,pkms,minigun762,mg50,barret,bfg,tactical600,pgm,m89sr,m107,vssk,rt20,barret_xm500,m85,steyr_ste,mp5,berettam12,scorpion,stkinetics,p90,90m1,mp7,kriss2,lwhelmet,bronik4c,cboots,bronik5c,empires,bronik6c,sas_helmet,shields_la,chelmet,hboots,armour_p300,spectra,blackcell,dboots,armour_patrol,delta5,helmetmk6,lowshieldc,nokia9500,maskl,ilight,n81,deye,n95,nighthawk,saperka3,slr,apache,mi8,lightss,lightsm,rgd2s,grenade_dg1,fg5,molotov,hellsbreath,napalm,chip_armour1,chip_armour2,chipset_bonus1,chipset_bonus2,chipset_bonus3,chipset_bonus4,chip_saper,bronic3c,champ,ny_sanki,bullet,flask,compass,cards,ganjacola,fan,cigar,clocks,lighter,salat1,salat2,salat3,salat4,tigertoy1,tigertoy2,tigetroy3,tigertoy4';
					var myregexp = /<a href=\/item\.php\?item_id=([^&>]+)><img/ig;
					var match = myregexp.exec(req.responseText);
					while (match != null) {
						if(ne_imennoe.indexOf(match[1])>0){
//							alert(match[1]);
						} else {
//							alert('yes');
							lst[num].imennih++;
							lst[num].imennoe+='<a style="text-decoration:non" href=/item.php?item_id='+match[1]+' target=blank><img src=http://images.ganjawars.ru/img/items/'+match[1]+'_s.jpg border=0></a>&nbsp;';
						}
						lst[num].items+='<a href=http://www.ganjawars.ru/item.php?item_id='+match[1]+' target=blank><img src=http://images.ganjawars.ru/img/items/'+match[1]+'_s.jpg border=0></a> ';
						var match = myregexp.exec(req.responseText);
					}

					for (var i=0;i<main.length;i++){
						if (main[i].id==lst[num].id) s=true;
					}
					if (!s)	main.push(lst[num]);
				}
			}
    		num++;
    		if (num<lst.length){
    			root2.setTimeout(function(){GetInfo(lst,num);},900);
    		} else {
    			RetResults(main);
    		}
    	});
	}

	function quickSort(l,h) {
		var low = l;
	   	var high = h;
	   	var rt = eval( "main[ " + Math.round( ( l + h ) / 2 ) + " ]" );
	   	var middle = new Pers( rt.nick, rt.id, rt.lvl );
		do {
	    while( isLow( eval( "main[ " + low + " ]" ), middle) )
	    low++;
	    while( isLow( middle, eval( "main[ " + high + " ]" )) )
	    high--;
	    if( low <= high ) {
	    var temp = main[ low ];
	    main[ low++ ] = main[ high ]
	    main[ high-- ] = temp;
	    }
	   	} while( low <= high );
		if( l < high )
	    	quickSort( l, high);
	   	if( low < h )
	    	quickSort( low, h);
	}

	function isLow(low, high){
	 	if (low.lvl<high.lvl) {return true} else {
		return false;                             }
	}

	function RetResults(main){
		quickSort( 0, main.length - 1);
		if (souzid==0){
        	var sss="<tr><td colspan=8 class=wb bgcolor=#d0eed0 align=center><b>Результаты анализа для <img src=http://images.ganjawars.ru/img/synds/"+syndid+".gif width=20 height=14 border=0> #"+syndid+". "+main.length+" онлайн</b></td></tr>";
		} else {
	       	var sss="<tr><td colspan=8 class=wb bgcolor=#d0eed0 align=center><b>Результаты анализа для <img src=http://images.ganjawars.ru/img/synds/"+syndid+".gif width=20 height=14 border=0> #"+syndid+" и союза <img src=http://images.ganjawars.ru/img/synds/"+souzid+".gif width=20 height=14 border=0> #"+souzid+". "+main.length+" онлайн</b></td></tr>";
		}
        var es=false;
        var col=false;
        for (var i=main.length-1;i>=0;i--){
        	if ((main[i].lvl<25)&&(!es)){
        		sss+="<tr><td colspan=8 class=wb bgcolor=#d0eed0 align=center><b>Бойцы за ЭС</b></td></tr>";
        		es=true;
        	}
        	if (col) {
        		var add="";
        	} else {
        		var add="style='background-color:#ffffff'";
        	}
        	col=!col;
			if (main[i].sign==0){
				sss+="<tr "+add+"><td width=1% class=wb>"+main[i].osnova;
			} else {
				sss+="<tr "+add+"><td width=1% class=wb align=center><img src=http://images.ganjawars.ru/img/synds/"+main[i].sign+".gif width=20 height=14 border=0>";
			}
			sss+='</td><td width=1% class=wb><nobr>&nbsp;<a href=http://www.ganjawars.ru/info.php?id='+main[i].id+' target=blank><b>'+main[i].nick+'</b></a>&nbsp;</nobr></td>';
			sss+='<td width=1% class=wb><nobr>&nbsp;[ <b>'+main[i].lvl+'</b> ]&nbsp;</nobr></td>';
			if (main[i].rank!='0'){
				sss+='<td width=1% class=wb><nobr>&nbsp;<img src=http://images.ganjawars.ru/img/rank'+main[i].rank+'.gif>&nbsp;</nobr></td>';
			} else {
				sss+='<td width=1% class=wb></td>';
			}
			sss+='<td class=wb width=1%><nobr>&nbsp;HP: '+main[i].hp+'&nbsp;</nobr></td>';
			sss+='<td class=wb width=1%><nobr>&nbsp;[ '+main[i].island+' ]&nbsp;</nobr></td>';
			sss+='<td class=wb width=1%><nobr>&nbsp;<span style=\"cursor:pointer\" onclick=\"var t=document.getElementById(\'items'+main[i].id+'\'); if (t.style[\'display\']==\'none\'){t.style[\'display\']=\'\';} else {t.style[\'display\']=\'none\';}\"><img src=http://images.ganjawars.ru/i/hi.gif border=0></span>&nbsp</nobr></td>';
			if (main[i].imennih>0){
				sss+='<td class=wb><nobr>&nbsp;<span style=\"cursor:pointer;color:#900000\" onclick=\"document.getElementById(\'imen'+main[i].id+'\').style[\'display\']=\'\';\"><b>Именных: '+main[i].imennih+'</b></span>&nbsp;</nobr></td></tr>';
				sss+="<tr style=\"display:none\" id='imen"+main[i].id+"'><td colspan=7 class=wb align=center>"+main[i].imennoe+"</td><td class=wb align=center><span style=\"cursor:pointer;color:#900000\" onclick=\"document.getElementById('imen"+main[i].id+"').style[\'display\']=\'none\';\"><b>Спрятать</b></span></td></tr>";

			} else {
				sss+='<td class=wb><nobr>&nbsp;</nobr></td></tr>';
			}
			sss+="<tr style=\"display:none\" id='items"+main[i].id+"'><td colspan=8 class=wb align=center>"+main[i].items+"</td></tr>";
        }
		tbl.innerHTML=sss;
			if (visitors_log_off==0){
				ajax('http://www.ganjawars.ru/info.edit.php','GET',function(req2){
					var lopata=/<input type=hidden name=lopata value=\"([^\"]+)\">/i.exec(req2.responseText);
	            	if (typeof GM_xmlhttpRequest != 'undefined'  && typeof document.all == 'undefined') {
	            		GM_xmlhttpRequest({method:'POST',url:'http://www.ganjawars.ru/info.edit.php',headers:{'Content-type':'application/x-www-form-urlencoded'},data:encodeURI('save=1&save_main=1&lopata='+lopata+'&visitors_log_off=0'),onload: function(xhr){}});
	            	} else {
	            		new Ajax.Request("http://www.ganjawars.ru/info.edit.php",{parameters: $H({save: '1', save_main: '1', lopata:lopata,visitors_log_off:0}).toQueryString(), method: 'post'})
	            	}
                });
            }
	}


	var root2 = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
	//var tbl = document.getElementsByTagName('table');

    //tbl=tbl[tbl.length-1].childNodes[1];
    var btn=root2.document.createElement('span');
    btn.setAttribute('style', 'cursor:pointer');
    btn.innerHTML=' [ >> ]';
    btn.onclick=function(){
    	btn.innerHTML=' [ 0% ]';
		ajax('http://www.ganjawars.ru/info.edit.php','GET',function(req2){
/*			var lopata=/<input type=hidden name=lopata value=\"([^\"]+)\">/i.exec(req2.responseText);
			visitors_log_off=1;
			if (/name=visitors_log_off value=1 checked>/i.test(req2.responseText)){
				visitors_log_off=1;
			} else {
            	if (typeof GM_xmlhttpRequest != 'undefined'  && typeof document.all == 'undefined') {
            		GM_xmlhttpRequest({method:'POST',url:'http://www.ganjawars.ru/info.edit.php',headers:{'Content-type':'application/x-www-form-urlencoded'},data:encodeURI('save=1&save_main=1&lopata='+lopata+'&visitors_log_off=1'),onload: function(xhr){}});
            	} else {
            		new Ajax.Request("http://www.ganjawars.ru/info.edit.php",{parameters: $H({save: '1', save_main: '1', lopata:lopata,visitors_log_off:1}).toQueryString(), method: 'post'})
            	}
            }
*/
	            root2.setTimeout(function(){
		    	btn.innerHTML=' [ 0% ]';
		    	var progress=0;
		    	lst=new Array();
		    	main=new Array();
		    	//get SyndId
		    	syndid=/id=(\d+)/i.exec(root2.location.href);
		    	syndid=syndid[1];
			    	ajax('http://www.ganjawars.ru/syndicate.php?id='+syndid+'&page=online','GET',function (req2){
								var myregexp = /info\.php\?id=(\d+)><b>([^<]+)<\/b><\/a><\/nobr><\/td>/ig;
								var match = myregexp.exec(req2.responseText);
								while (match != null) {
									lst.push(new Pers(match[2],match[1]));
									match = myregexp.exec(req2.responseText);
								}
					});
				//get politics page
				ajax('http://www.ganjawars.ru/syndicate.php?id='+syndid+'&page=politics','GET',function (req){
					//souz?
					if (/<\/b> <a href=\/syndicate\.php\?id=\d+>#/i.test(req.responseText)){
						//yaya
						souzid=/<\/b> <a href=\/syndicate\.php\?id=(\d+)>#/i.exec(req.responseText);
						souzid=souzid[1];
						//get souz online
						ajax('http://www.ganjawars.ru/syndicate.php?id='+souzid+'&page=online','GET',function (req2){
							var myregexp = /info\.php\?id=(\d+)><b>([^<]+)<\/b><\/a><\/nobr><\/td>/ig;
							var match = myregexp.exec(req2.responseText);
							while (match != null) {
								var fnd=false;
								for (var i=0;i<lst.length;i++){
									if (lst[i].id==match[1]) {fnd=true;break;}
								}
								if (!fnd){
									lst.push(new Pers(match[2],match[1]));
								}
								match = myregexp.exec(req2.responseText);
							}
							if (lst.length>0){
								GetInfo(lst,0);
							}
						});
					} else {
						//working with people
						souzid=0;
						if (lst.length>0){
							GetInfo(lst,0);
						}
					}
				});
			},1000);
		});
    }
   	tbl = document.getElementsByTagName('td');
   	for (var i=0;i<=tbl.length;i++){
   		if (/<b>\d+ бойцов онлайн/i.test(tbl[i].innerHTML)){
   			tbl[i].appendChild(btn);
   			tbl=tbl[i].parentNode.parentNode.parentNode;
   		}
   	}

})();