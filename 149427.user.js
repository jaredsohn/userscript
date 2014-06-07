// ==UserScript==
// @name        Zastępstwa 2
// @namespace   Arrvi
// @include     http://www.lo50.edu.pl/plan2/
// @include     http://www.lo50.edu.pl/plan2/index*
// @version     1.02
// @grant		none
// ==/UserScript==

//////
// USTAWIENIA

var PLAN = {
	pn: '-----MT102PP110PL207-----GW111ENEN1',
	wt: 'FZPRFPL207PL207WS107PP110WF---MT206MT206',
	sr: 'MT102MT102----------IN202IN202',
	cz: '-----FZPRFIN202WF---FZPRFWK---ENEN1RU209RU209',
	pt: '-----PP110WF---ENEN1MT103MT103PL207WS107'
};

var KLASA = '3F';


with ( unsafeWindow ) {


	var $mainfs, $mainfrs, $subfs, $sfr, days;
	
	onload = function () {

		$mainfs = document.getElementsByTagName('frameset')[0];
		$mainfrs = document.getElementsByTagName('frame');
		$subfs = document.createElement('frameset');
		$sfr = document.createElement('frame');
		$sfr.name = "summary";

		$subfs.appendChild( $mainfrs[0] );
		$subfs.appendChild( $mainfrs[0] );
		$subfs.cols='150,*';
		$mainfs.appendChild( $subfs );
		$mainfs.appendChild( $sfr );
		$mainfs.cols='';
		$mainfs.rows='*,300';
		
		summary.document.open();
		summary.document.write('<!DOCTYPE html>\n<html><body></body></html>');
		summary.document.close();

		contents.addEventListener('load',function (){ 
			collectLinks();
			collectData(createDocument);
		});

		function collectLinks(){
			var $links=contents.document.getElementsByTagName('a'), tmp;
			days = [];
			for ( var i=0; i<$links.length; i++ )
			{
				tmp = $links[i].textContent.split('-');
				days[days.length] = {
					date : new Date( tmp[0], tmp[1]-1, tmp[2] ),
					link : $links[i].href
				}
			}
		}

		function collectData(callback){
			
			var day=0;
			
			KLASA = new RegExp( ['(', KLASA, ')'].join(''), 'i' );
			
			summary.document.body.innerHTML = "<style>body {font: 12px Verdana,sans-serif;margin:0;padding:0}</style>";
			summary.document.body.innerHTML += '<h1>Loading...</h1>';
			
			var timer = setInterval(checkNdo, 100);
			
			function checkNdo(){
				if ( main.document.readyState == 'complete' )
				{
					clearInterval(timer);
					console.log('triggered', day);
					loadNext();
				}
			}
			
			// loadNext();
			
			console.log(days);
			
			function getData() {
				summary.document.body.innerHTML += [
					'<p>Loading day ', days[day].date.getDate(), '-',
					days[day].date.getMonth(), '-',
					days[day].date.getFullYear(), '</p>'
				].join('');
				
				var doc = main.document;
				
				var t=doc.getElementsByTagName('table')[1];
				t=t.children[0];
				
				var td,tr,r,found=false;
				
				console.log('extracting', day);
				
				for ( r=0; r<t.children.length; r++)
				{
					tr=t.children[r];
					td=tr.children[0];
					
					if ( KLASA.test(td.innerHTML) )
					{
						found=true;
						break;
					}
					if (td.rowSpan)
						r+=parseInt(td.rowSpan)-1;
				}
	
				var data=[], ls, nth, th;
				if(found)
				for ( var dr=0; dr<parseInt(td.rowSpan); dr++ )
				{
					if ( dr==0 )
					{
						ls = t.children[r].children[1];
						nth = t.children[r].children[2];
						th = t.children[r].children[4];
					}
					else
					{
						ls = t.children[r+dr].children[0];
						nth = t.children[r+dr].children[1];
						th = t.children[r+dr].children[3];
					}
	
					var id = parseInt(ls.textContent);
	
					if ( !data[id] ) data[id]=[];
	
					data[id][data[id].length] = {
						N : nth.textContent,
						T : th.textContent
					}
				}
				
				console.log('extracted', day, data);
				
				days[day].data = data;
	
				loadNext(++day);
			}
	
			function loadNext() {
				if ( !days[day] ) 
				{
					console.log('no data at', day, ' - leaving');
					summary.document.body.innerHTML += '<p>Completed</p>';
					setTimeout(callback, 200);
					return;
				}
				
				
				if ( main.location.href == days[day].link )
				{
					getData();
				}
				else
				{
					console.log('changing link', main.location.href,days[day].link, main.loaded );
					main.location.href = days[day].link;
					timer = setInterval(checkNdo, 100);
				}
			}
		}
	
		function createTable( src )
		{
			var shrt = {
				PL : "Polski",
				EN : "Angielski",
				RU : "Ruski",
				MT : "Matematyka",
				FZ : "Fizyka",
				IN : "Infa",
	
				WF : "WF",
	
				GW : "Godzina wychowawcza",
				PP : "PP",
				WS : "WOS",
				WK : "WOK"
			}
	
			var data = [], i=0;
	
	
			for ( var wd in src )
			{
				data[i] = [];
				for ( var l=0; l<src[wd].length/5; l++ )
				{
					data[i][l] = {
						L:src[wd].substr(l*5,2),
						R:src[wd].substr(l*5+2,3)
					};
	
					if ( typeof shrt[data[i][l].L] != undefined )
						data[i][l].L = shrt[data[i][l].L];
				}
				i++;
			}
	
			var $t, $r, $c, dow=(new Date()).getDay()-1;
	
			var thisWeek = [], tdt;
			for ( var i=0; i<7; i++ )
			{
				tdt=new Date();
				tdt.setDate(tdt.getDate()+i-dow);
				thisWeek[i]=tdt;
			}
	
			$t = document.createElement('table');
			$t.className="plan";
			$t.innerHTML = '<tr><th>Poniedziałek</th><th>Wtorek</th><th>Środa</th><th>Czwartek</th><th>Piątek</th></tr>';
			var zast=[];
			for (var i in days)
			{
				for ( var w in thisWeek )
				{
					if ( days[i].date.getDate() == thisWeek[w].getDate() )
					{
						zast[w] = days[i].data;
					}
				}
			}
	
			var cont = true;
			for ( var l=0; cont; l++ )
			{
				for ( var wd in data )
				{
					if ( typeof data[wd][l] != 'undefined' )
					{
						cont=true;
						break;
					}
					else
						cont=false;
				}
				if ( !cont ) break;
	
				$r = document.createElement('tr');
				for ( var wd in data )
				{
					wd = parseInt(wd);
					$d = document.createElement('td');
					if ( data[wd][l] && data[wd][l].L != '--' )
						$d.innerHTML = [data[wd][l].L, ' <span class="room">', data[wd][l].R, '</span>'].join('');
					
					if ( zast[wd] && zast[wd][l+1] )
					{
						if ( zast[wd][l+1][0].T == 'Odwołane' )
						{
							$d.innerHTML += '<br /><span class="zast">Odwołane</span>';
							$d.className = "canceled";
						}
						else
						{
							for ( var z in zast[wd][l+1] )
							{
								$d.innerHTML += [
									'<br /><span class="zast">', 
									zast[wd][l+1][z].N, ' &rarr; ', 
									zast[wd][l+1][z].T, '</span>'
								].join('');
							}
							$d.className = "changed";
						}
					}
	
					$r.appendChild($d);
				}
	
				$t.appendChild($r);
	
			}
			
			summary.document.body.innerHTML = '';
			
			summary.document.body.appendChild($t);
			console.log('table created');
		}
	
		function createDocument() {
			var style='<style>* {margin:0;padding:0} \
			.changed { background: #ff0; } \
			.canceled { \
			background: #fff url(\'http://imageshack.us/a/img213/1527/stripeb1bfd34745880bdfa.png\') repeat;\
			color: #999; \
			}\
			table.plan {\
			border-collapse: collapse;\
			dispaly: block;\
			margin: 0 auto;\
			font: 14px Ubuntu, Verdana, sans-serif;\
			}\
			table.plan td {\
			width: 20%;\
			height: 2em;\
			border: 1px solid #999;\
			text-align: center;\
			}\
			table.plan .room {\
			display: block;\
			float: right;\
			color: #999;\
			font-size: 60%;\
			}\
			table.plan .zast {\
			color: #999;\
			font-size: 70%;\
			}\
			table.plan .canceled .zast {\
				font-weight: bold;\
				color: #696;\
			}\
		</style>';
			summary.document.head.innerHTML += style;
			createTable(PLAN);
		};
	
	}

}