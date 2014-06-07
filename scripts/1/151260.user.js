// ==UserScript==
// @name           تحديد الاقرب والحجوزات ببروفايل اللاعب
// @namespace      اهداء الى قبيلة العناكب عالم 16
// @description    السكربت مفيد ويعمل في بروفايل اللاعب
// @autor          ابراهيم [وحش الكهوف]
// @include        http://*.tribalwars.ae/game.php?*screen=info_village*
// @version        3.2.0.036
// @grant          none
// ==/UserScript==

/* 
	name	: وحش الكهوف
	skype	: maystrokhalid
	Purpose	: لإدارة المطالبات من لاعب الشاشة الشخصي.
	Credit	: 

	Todo	:
		Resolve 100 Claim limitation
			* Set the Claims Per Page to the maximum (100)
			* Determine number of Claim Pages
			* Fetch the Claim Detail from each Page
			* Process the Claims 

	Notes	:
	

	######################
	Client Launcher (live):
	######################
	
javascript:(window.main||self).$.getScript('http://dl.dropbox.com/u/25377948/twscripts/player_claim_manager.js',function(){var script=new PlayerClaimManager();script.execute();});void(0);

____________________________________________________________

Copyright (C) 2011 Dale McKay, all rights reserved
version 1.0, 4 July 2011

This software is provided 'as-is', without any express or implied warranty. In no event will the author be held liable for any damages arising from the use of this software.

Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions:
The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use this software in a product, an acknowledgment in the product documentation would be appreciated but is not required.
Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software.
This notice may not be removed or altered from any source distribution.
____________________________________________________________
*/

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Class: PlayerClaimManager
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
function PlayerClaimManager(){
	var win=(window.main||self),$=win.$;
	var url;
	var currentSortID='sort_ASC_0';

	var script={
		name:'Player Claim Manager',
		version:1.04,
		minGameVersion:7.00,
		author:{
			name:'dalesmckay',
			email:'dalesmckay@gmail.com'
		},
		credit:'',
		debugEnabled:false,
		runOnce:true
	};


	// ........................................................................
	function fnDebug(msg){$('body').append('<span>'+msg+'</span><br/>');}
	// ........................................................................
//	function fnFetchAllVillages(playerID){
//		$.get(
//			win.game_data.link_base_pure.replace(/screen\=w*/i,'screen=info_player&ajax=fetch_villages&player_id='+playerID),
//			function(data){
//				$('#villages_list tbody').html(JSON.parse(data).villages);
//			}
//		);	
//	} // fnFetchAllVillages
	// ........................................................................
	function fnExtractClaims(srcHTML){
		var csrf=srcHTML.match(/\"csrf\"\:\"(\w+)\"/i);
		csrf=csrf?csrf[1]:null;
		
		var $src=$(srcHTML);
		
		var claims={
			csrf:csrf,
			claimsPerPage:parseInt($src.find('#reservation_page_size').val(),10)
		};
		
		$src.find('tr[id^="reservation_"]').each(function(i,e){
			var $e=$(e);
			
			var coord=$e.find('td:eq(1)').html().match(/\d+\|\d+/g);
			coord=coord[coord.length-1];
			
			var claimerID=($e.find('td:eq(4) a').attr('href')||'').match(/id\=(\d+)/i);
			claimerID=claimerID?claimerID[1]:null;
			
			var claimDetail={
				claimID:e.id.match(/reservation\_(\d+)/i)[1],
				coord:coord,
				points:$e.find('td:eq(2)').text().match(/\d+/),
				victim:$.trim($e.find('td:eq(3)').text()),
				claimerID:claimerID,
				claimedBy:$.trim($e.find('td:eq(4)').text()),
				expires:$.trim($e.find('td:eq(5)').text()),
				canDelete:!!($e.find('td:eq(6)').html().match(/action\=delete\_reservations/i))
			};
			
			claims[claimDetail.coord]=claimDetail;
		});
	
		return claims;
	} // fnExtractClaims
	// ........................................................................
	function fnAddClaim($row,csrf,coord){
		$.post(
			url+'ally&mode=reservations&action=new_reservations&h='+csrf+'&group_id=all&filter=',
			{
				'x[]':coord.split('|')[0],
				'y[]':coord.split('|')[1],
				'comment[]':''
			},
			function(data){
				var claims=fnExtractClaims(data);
				if(claims&&claims[coord]){
					fnRefreshVillage($row,csrf,claims[coord]);
				}
				else{
					alert('تم الحجز - '+coord+'\n\n'+($(data).find('td#error').text()||'unKnown reason'));
				}
			}
		);
	} // fnAddClaim
	// ........................................................................
	function fnDeleteClaim($row,csrf,claimID){
		$.get(
			url+'ally&action=delete_reservations&h='+csrf+'&id='+claimID,
			function(data){
				var hasError=false;
				var claims=fnExtractClaims(data);

				$.each(claims,function(i,e){
					if(e.claimID==claimID){
						alert('تم الحجز - '+e.coord);
						hasError=true;
						return true;
					}
				});

				if(!hasError){
					fnRefreshVillage($row,csrf,null);
				}
			}
		);
	} // fnDeleteClaim
	// ........................................................................
	function fnRefreshVillage($row,csrf,claimDetail){
		var coord=$row.find('td:eq(1)').text().match(/\d+\|\d+/g);
		coord=coord[coord.length-1];
		
		var villageID=$row.find('td:eq(0) a').attr('href').match(/id\=(\d+)/i)[1];
		
		var claimedBy=claimDetail?claimDetail.claimedBy:'';
		var expires=claimDetail?claimDetail.expires:'';
		var claimerID=claimDetail?claimDetail.claimerID:'';
		var claimID=claimDetail?claimDetail.claimID:'';

		var canDelete=(claimerID==win.game_data.player.id)||(claimDetail&&claimDetail.canDelete);

		var rallyPoint='<a href="'+(url+'place&target='+villageID)+'" target="_blank"><img src="graphic/buildings/place.png" alt="نقطة التجمع" title="نقطة التجمع"/></a>';		
		var centreMap='<a href="'+(url+'map&x='+coord.replace('|','&y='))+'" target="_blank"><img src="/graphic/map_center.png" alt="اضهار القرية ع الخريطة" title="اضهار القرية ع الخريطة"/></a>';

		var claimAction='';
		if(canDelete){
			claimAction='<span id="dsmAction"><img src="/graphic/delete.png" alt="Delete Claim" title="Delete Claim"/></span>';
		}
		else if(!claimID){
			claimAction='<span id="dsmAction"><img src="/graphic/map/reserved_player.png" alt="حجز القرية" title="حجز القرية"/></span>';
		}

		$row[0].cells[$row[0].cells.length-3].innerHTML='<a href="'+(url+'info_player&id='+claimerID)+'" target="_blank">'+claimedBy+'</a>';
		$row[0].cells[$row[0].cells.length-2].innerHTML=expires;
		$row[0].cells[$row[0].cells.length-1].innerHTML=rallyPoint+centreMap+claimAction;

		if(canDelete){
			$row.find('#dsmAction img').click(function(){fnDeleteClaim($row,csrf,claimID);});
		}
		else if(!claimID){
			$row.find('#dsmAction img').click(function(){fnAddClaim($row,csrf,coord);});
		}
	} // fnRefreshVillage
	// ........................................................................
	function fnSortVillages(id){
		currentSortID=id;
		
		$('img[id^="sort_"]').css({border:'none'});
		$('#'+id).css({border:'1px solid green'});
		
		var sortDetail=id.match(/sort\_(\w+)\_(\d+)/i);
		var direction=sortDetail[1];
		var column=parseInt(sortDetail[2],10);
		var table=$('table.vis:has(a[href*="screen=info_village"])')[0];
	
		var rows=[];

		// Extract the Rows.
		$(table).find('tr:gt(0)').each(function(i,e){
			if(!e.innerHTML.match(/player.getallvillages/i)){
				var sortableValue=null;
			
				switch(column){
					case 0:
					case 1:
					case 4:
					case 5:sortableValue=$(e.cells[column]).text();break;
					case 2:sortableValue=parseInt($(e.cells[column]).text().replace(/\./g,''),10);break;
					case 3:sortableValue=parseFloat($(e.cells[column]).text()||'0.00');break;
					default:break;
				}
			
				rows[i]=[sortableValue,e];
			}
		});

		// Sort the Table.
		rows=rows.sort(function(a,b){
			switch(column){
				case 0:	
				case 1: 
				case 4:
				case 5:return (direction=='ASC')?a[0].localeCompare(b[0]):b[0].localeCompare(a[0]);
				case 2:
				case 3:return (direction=='ASC')?(a[0]-b[0]):(b[0]-a[0]);
				default: alert('Unsupported Column: '+column);return 0;
			}
		});
				
		// Refresh the Table Content.
		$.each(rows,function(i,e){
			e[1].className="nowrap row_"+((i % 2)?"b":"a");
			table.appendChild(e[1]);
		});
	} // fnSortVillages
	// ........................................................................
	function fnFields(from,to){
		var source=((from instanceof Array)?from:from.split('|')).map(function(e){return parseInt(e||'0',10);});
		var target=((to instanceof Array)?to:to.split('|')).map(function(e){return parseInt(e||'0',10);});
		return Math.sqrt(Math.pow(target[0]-source[0],2)+Math.pow(target[1]-source[1],2));
	} // fnFields
	// ........................................................................
	function fnHandleClaims(claims){
		var $table=$('table.vis:has(a[href*="screen=info_village"])');

		// Inject some additional header columns.
		var headerRow=$table.find('tr:eq(0)')[0];
		$(headerRow).addClass('nowrap');
		headerRow.innerHTML+='<th id="dsmPlayerClaims">مسافة</th><th>حجز القرية</th><th>انتهاء مخطط حجز القرية</th><th>اعمال اخرى</th>';

		// Add Sorting to the Table (ignore the Action column).		
		for(var cellID=0;cellID<(headerRow.cells.length-1);cellID++){
			headerRow.cells[cellID].innerHTML+='\
				<img id="sort_ASC_'+cellID+'" src="/graphic/oben.png" alt="فرز بترتيب تصاعدي" title="فرز بترتيب تصاعدي"/>\
				<img id="sort_DES_'+cellID+'" src="/graphic/unten.png" alt="الفرز في ترتيب تنازلي" title="الفرز في ترتيب تنازلي"/>\
			';
			
			$(headerRow.cells[cellID]).find('img:eq(0)').click(function(){fnSortVillages(this.id);});
			$(headerRow.cells[cellID]).find('img:eq(1)').click(function(){fnSortVillages(this.id);});
		}

		// Inject additional content columns.
		$table.find('tr:gt(0)').each(function(i,e){
			if(e.innerHTML.match(/player.getallvillages/i)){
				$cell=$(e).find('td:eq(0)');
				$cell.attr('colspan',parseInt($cell.attr('colspan')||'1',10)+4);
			}
			else{
				e.className="nowrap row_"+((i % 2)?"b":"a");
				e.innerHTML+='<td class="nowrap"></td><td class="nowrap"></td><td class="nowrap"></td><td class="nowrap"></td>';
		
				var coord=$(e).find('td:eq(1)').text().match(/\d+\|\d+/g);
				coord=coord[coord.length-1];

				fnRefreshVillage($(e),claims.csrf,claims[coord]);
			}
		});
		
		// Inject Proxy Sort Controls.
		$('\
			<td>\
				<span style="font-weight:bold;">حساب المسافة بالنسبة للقرية (xxx|yyy): </span>\
				<input id="dsmCoord" value="'+(win.game_data.village.coord)+'" class="text-input" size="7" onFocus="this.select()"/>\
				<input id="dsmRefresh" type="button" value="تحديث"/>\
			</td>\
		').insertBefore($table);
		$('#dsmRefresh').click(function(){
			srcCoord=$.trim($('#dsmCoord').val()).match(/\d+\|\d+/);
			
			if(srcCoord){
				$table.find('tr:gt(0)').each(function(i,e){
					if(!e.innerHTML.match(/player.getallvillages/i)){
						var coord=$(e).find('td:eq(1)').text().match(/\d+\|\d+/g);
						coord=coord[coord.length-1];
	
						var distance=fnFields(srcCoord[0],coord);
						e.cells[3].innerHTML=distance.toFixed(2);
					}
				});
			
				fnSortVillages(currentSortID);
			}
			else{
				$table.find('tr:gt(0) td:nth-child(4)').html('');
			}
		});
		$('#dsmRefresh').click();
	} // fnHandleClaims
	// ........................................................................




	return{
		execute:function(){
			if($('#dsmPlayerClaims').length>0){
				return;
			}
			
			url=win.location.href;
			if(url.match(/screen\=info_player/i)){
				url=win.game_data.link_base_pure.replace(/screen\=\w*/i,'screen=');

				var page=1;
				var player=$.trim($('table.vis:has([href*="screen=mail"]) tr th:eq(0)').text());

				$.post(
					url+'ally&mode=reservations&page='+page+'&group_id=all',
					{
						reservation_search:1,
						search_for:player,
						search_by:'p.name'
					},
					function(data){
						var claims=fnExtractClaims(data);

/*			
						alert(claims.claimsPerPage);

						if(claims.claimsPerPage<1000){
							alert('Need to increase claimsPerPage from '+claims.claimsPerPage+' to 1000');
						}
*/

						fnHandleClaims(claims);
					}
				);
			}
			else{
				alert('السكربت يشتغل في بروفايل اللاعب فقط');
			}
		}
	};
} // PlayerClaimManager::constructor
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
