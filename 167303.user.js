// ==UserScript==
// @name           SungreenFutsalReservationTable.user.js
// @description    Showing a table of Futsal reservation on Sungreen Blogger page.
// @version        0.20140105
// @match          http://sungreen-s.blogspot.jp/p/blog-page.html
// ==/UserScript==

(function(){
	function func(){
		function setMarkAdditional(){
			TSAdditional('');
			TSReduced('')
		}
		var holiday='1/1';
		var yy=(new Date).getYear();
		var mm=(new Date).getMonth();
		var ww=(new Date).getDay();
		var dd=(new Date).getDate();
		var hh=(new Date).getHours();
		var nn=(new Date).getMinutes();
		function date(n){
			var aaa=0;
			var bbb=dd+n;
			if(n<0){
				if(mm===2){
					if(yy%4===0){
						if(bbb<1)aaa=29
					}else{
						if(bbb<1)aaa=28
					}
				}else if(mm===4||mm===6||mm===9||mm===11){
					if(bbb<1)aaa=30
				}else{
					if(bbb<1)aaa=31
				}
			}else{
				if(mm===1){
					if(yy%4===0){
						if(bbb>29)aaa=-29
					}else{
						if(bbb>28)aaa=-28
					}
				}else if(mm===3||mm===5||mm===8||mm===10){
					if(bbb>30)aaa=-30
				}else{
					if(bbb>31)aaa=-31
				}
			}
			return aaa+bbb
		}
		function mark(n,o){return'<span style="background:#'+n+'">'+o+'</span>'}
		function markY(){return mark('06c','OK')}
		function markN(){return mark('c33','×')}
		function markQ(){return mark('444','？')}
		function markSth(n,o){
			n=n.split(',');
			for(var i=0,len=n.length;i<len;i++){
				if(n[i]===2424)n[i]=240;
				if(n[i].slice(-2)===24)n[i]=n[i].replace(24,0);
				var aaa=[];
				for(var j=0;j<8;j++){
					aaa[j]=[17,19,20,22,0];
					for(var k=0;k<5;k++){
						aaa[j][k]=date(j)+''+aaa[j][k]
					}
				}
				aaa=String(aaa).split(',');
				var bbb=0;
				for(j=0;j<40;j++){
					if(aaa[j]===n[i]){
						bbb=1;
						break
					}
				}
				if(bbb)document.getElementById('s'+n[i]).innerHTML=o
			}
		}
		function TSAdditional(n){markSth(n,markN())}
		function TSReduced(n){markSth(n,'')}
		function setMark(){
			var aaa=document.getElementById('post-body-2453413321194872416');
			var postText=aaa.textContent;
			if(!postText)postText=aaa.innerText;
			postText=postText.replace(/ |\u0028|\u0029||\u00a0|\u3000|\uff08|\uff09/g,'').replace(/日|月|火|水|木|金|土/g,':').replace(/正/g,'/').split('/');
			postText[1]=postText[1].split(':');
			var bbb;
			if(mm===2){if(yy%4===0)bbb=29;else bbb=28}
			else if(mm===4||mm===6||mm===9||mm===11)bbb=30;
			else bbb=31;
			postText[1][1]<10
				?postText[1][0]<2?postText[1][0]=bbb:postText[1][0]-=1
				:postText[1][0]-=0;
			function setQ(n){
				var aaa=[17,19,20,22,0];
				for(var i=0;i<5;i++){
					var bbb=document.getElementById('s'+date(n)+aaa[i]);
					if(bbb.childNodes[0])bbb.innerHTML=markQ()
				}
			}
			if(postText[1][0]!==dd){
				setQ(7);
				if(postText[1][0]!==date(-1)){
					setQ(6);
					if(postText[1][0]!==date(-2)){
						setQ(5);
						if(postText[1][0]!==date(-3)){
							setQ(4);
							if(postText[1][0]!==date(-4)){
								setQ(3);
								if(postText[1][0]!==date(-5)){
									setQ(2);
									if(postText[1][0]!==date(-6)){
										setQ(1);
										if(postText[1][0]!==date(-7))setQ(0)
									}
								}
							}
						}
					}
				}
			}
			aaa=['7:2','9:0','0:4','2:2','0:0','4:0'];
			bbb=[17,19,20,22,0,0];
			for(var i=2;i<42;i++){
				for(var j=0;j<8;j++){
					if(postText[i]){
						if(postText[i].indexOf(date(j))===0){
							if(date(j)>3||isNaN(postText[i].charAt(1))){
								for(var k=0;k<6;k++){
									if(postText[i].indexOf(aaa[k]+'0\uff5e')>-1)markSth(date(j)+''+bbb[k],markY())
								}
							}
						}
					}
				}
			}
			if((hh>16&&nn>20)||hh>17)TSReduced(dd+'17');
			if(hh>18)TSReduced(dd+'19');
			if((hh>19&&nn>40)||hh>20)TSReduced(dd+'20');
			if((hh>21&&nn>20)||hh>22)TSReduced(dd+'22');
			if(hh<10)document.getElementById('tbl130507').lastChild.lastChild.style.display='none'
		}
		function td17(n,o){
			var aaa;
			ww+n===0||ww+n===7?aaa=markN():aaa='';
			return'<td id="s'+date(n)+o+'">'+aaa
		}
		function td20(n,o){
			var aaa;
			ww+n===0||ww+n===6||ww+n===7||ww+n===13?aaa=markN():aaa='';
			return'<td id="s'+date(n)+o+'">'+aaa
		}
		function td22(n,o){return'<td id="s'+date(n)+o+'">'+markN()}
		function thDate(n){
			var aaa=0;
			var bbb=0;
			if(mm===1){
				if(yy%4===0){
					if(dd+n>29){
						aaa=1;
						bbb=-29
					}
				}else{
					if(dd+n>28){
						aaa=1;
						bbb=-28
					}
				}
			}else if(mm===3||mm===5||mm===8||mm===10){
				if(dd+n>30){
					aaa=1;
					bbb=-30
				}
			}else{
				if(dd+n>31){
					mm===11?aaa=-11:aaa=1;
					bbb=-31
				}
			}
			aaa+=mm+1;
			bbb+=dd+n;
			var ccc=aaa+'/'+bbb;
			var ddd=holiday.split(',');
			var eee;
			for(var i=0,len=ddd.length;i<len;i++){
				if(ddd[i]===ccc){
					eee=1;
					break
				}
			}
			if(eee)ccc='c33';
			else if(ww+n===0||ww+n===7)ccc='c33';
			else if(ww+n===6||ww+n===13)ccc='06c';
			else ccc='444';
			if(aaa<10)aaa='&nbsp;'+aaa;
			if(bbb<10)bbb='&nbsp;'+bbb;
			n===0||bbb===' '+1?ddd=aaa+'.'+bbb:ddd='&nbsp; &nbsp;'+bbb;
			eee=['日月火水木金土'];
			eee=(eee+eee).split('');
			return'<th style="color:#'+ccc+'">'+ddd+' '+eee[ww+n]
		}
		function setTable(){
			var aaa=document.createElement('div');
			aaa.innerHTML=
/*				'<style>'+
					'#post-body-2453413321194872416{'+
						'font-family:"MS Gothic",monospace'+
					'}'+
					'#tbl130507{'+
						'float:left;'+
						'margin:0 40px 20px 0;'+
						'color:#444;'+
						'line-height:1;'+
						'text-align:center;'+
						'border-collapse:collapse;'+
						'cursor:default'+
					'}'+
					'#tbl130507 thead{'+
						'border-bottom:1px solid #999'+
					'}'+
					'#tbl130507 th,'+
					'#tbl130507 td{'+
						'padding:4px 10px;'+
						'font-weight:normal'+
					'}'+
					'#tbl130507 tbody tr:nth-child(odd){'+
						'background:#ddd'+
					'}'+
					'#tbl130507+div{'+
						'padding:20px 0;'+
						'color:#444;'+
						'font:13px/1.7 arial;'+
						'cursor:default'+
					'}'+
					'#tbl130507 span,'+
					'#tbl130507+div span{'+
						'padding:0 1px;'+
						'color:#fff;'+
						'font-size:10px;'+
						'font-family:"MS Gothic",monospace'+
					'}'+
					'@media screen and (max-width:480px){'+
						'#tbl130507{'+
							'width:100%'+
						'}'+
						'#tbl130507 th,'+
						'#tbl130507 td{'+
							'padding:4px 0;'+
							'font-size:8px'+
						'}'+
					'}'+
				'</style>'+
*/				'<table id="tbl130507">'+
					'<thead>'+
						'<tr><th>17:20-<th>19:00-<th>20:40-<th>22:20-<th>24:00-'+
					'<tbody>'+
						'<tr>'+td17(0,17)+td17(0,19)+td20(0,20)+td22(0,22)+td22(0,0)+thDate(0)+
						'<tr>'+td17(1,17)+td17(1,19)+td20(1,20)+td22(1,22)+td22(1,0)+thDate(1)+
						'<tr>'+td17(2,17)+td17(2,19)+td20(2,20)+td22(2,22)+td22(2,0)+thDate(2)+
						'<tr>'+td17(3,17)+td17(3,19)+td20(3,20)+td22(3,22)+td22(3,0)+thDate(3)+
						'<tr>'+td17(4,17)+td17(4,19)+td20(4,20)+td22(4,22)+td22(4,0)+thDate(4)+
						'<tr>'+td17(5,17)+td17(5,19)+td20(5,20)+td22(5,22)+td22(5,0)+thDate(5)+
						'<tr>'+td17(6,17)+td17(6,19)+td20(6,20)+td22(6,22)+td22(6,0)+thDate(6)+
						'<tr>'+td17(7,17)+td17(7,19)+td20(7,20)+td22(7,22)+td22(7,0)+thDate(7)+
				'</table>'+
				'<div>'+markY()+' 空きあり<br>'+markN()+' 空きなし<br>'+markQ()+' 更新待ち</div>'+
				'<div class="clear"></div>';
			var bbb=document.getElementById('post-body-2453413321194872416');
			bbb.insertBefore(aaa,bbb.firstChild)
		}
		setTimeout(function(){setTable();setMarkAdditional();setMark()},100)
	}
	var aaa=document.createElement('script');
	aaa.textContent='('+func.toString()+')()';
	document.body.appendChild(aaa)
})();