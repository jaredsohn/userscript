// ==UserScript==
// @name         The West Petee's utilities
// @version      0.7x
// @description  The West Petee's utilities - bank fee calculator
// @date         2010-09-01
// @author       Petee
// @namespace    http://userscripts.org/scripts/show/96584
// @updateURL    http://userscripts.org/scripts/source/96584.user.js
// @website      http://tw-db.info/
// @include	http://*.the-west.*/game.php*
// ==/UserScript==

TWPU_inject = function(){
	if(document.getElementById('TWPU_js') || document.getElementById('TWPU_js_v041') || document.getElementById('pbf_js'))
		{ alert(TWPU.tr('script_already_loaded') || "The West Petee's utilities - Script already loaded, you'll probably have to uninstall the older version!"); return; }
	var twpujs = document.createElement('script');
	twpujs.setAttribute('type', 'text/javascript');
	twpujs.setAttribute('language', 'javascript'); 
	twpujs.setAttribute('id', 'TWPU_js');
	twpujs.innerHTML = "("+(function(){

/* injected script starts */
/**************************/

		if(typeof TWPU=="undefined") TWPU = {};
		TWPU.namev = "The West Petee's utilities v0.7x";
		TWPU.link = "http://userscripts.org/scripts/show/96584";
		TWPU.reqGroup = 50; TWPU.reqCrashTime = 30000;
		TWPU.intervalSafeMode = 1000;

		/* begin - default (English) texts */
		TWPU.lang_pack_default = {
			'error_already_loaded':		"Script already loaded, you'll probably have to uninstall the older version!",
			'error_atypical_function':	"Script could not modify a function, because it's atypical",
			'error_not_that_many':		"There are not that many items!",
			'error_code_load_failed':	"The script was not able to load it's code :-(... Please, report this game world and your browser version to Petee on .net forums or at userscripts.org.",
			'made_by':			"Made by",
			'translator_text':		"Translator",
			'repeat_sale':			"Repeat this sale",
			'repeat_sale_extra':		"Repeat this same auction the specified number of times.",
			'repeat_bid':			"Repeat this bid",
			'disable_grouping':		"Click to disable the grouping feature",
			'reload':			"Reload the data",
			'max_price':			"Instant buy",
			'count':			"Count",
			'walkthere':			"Walk there",
			'centermap':			"Center map",
			'lang':				"English",
			'translator_name':		"Petee" // yes, put your own nick here
		};
		/* end - default (English) texts */
		
		TWPU.tr = function(text_id) { return ( TWPU.lang_pack ?
				TWPU.lang_pack[text_id] || TWPU.lang_pack_default[text_id] :
				TWPU.lang_pack_default[text_id] ); }
		
		
		// footer
		jQuery("#main_footnotes").prepend("<"+"div id='TWPU_footer'>");
		jQuery("#TWPU_footer").css({'position':'absolute','top':'15px','right':'3px','font-size':'10px','color':'#666'}).html(
			 "<"+"a href='"+TWPU.link+"' target='_blank' style='color:#aaa;text-decoration:underline'>"
			 +TWPU.namev
			+"<"+"/a> - "
			+TWPU.tr("made_by")+" Petee (<"+"a href='http://tw-db.info/' style='color:#aaa;text-decoration:underline'>www.tw-db.info<"+"/a>), "
			+TWPU.tr('lang')+", "
			+TWPU.tr('translator_text')+": "+TWPU.tr('translator_name')
		);
		TWPU.namev += " - ";
		
		//my own css rules
		jQuery("head").append("<"+"style type='text/css'>"
			+"td.market_distance div.TWPU_ico { display:none; cursor:pointer } "
			+"td.market_distance:hover div.TWPU_ico { display:block } "
			+"div.TWPU_map { height:49px; width:181px; position:relative; border:3px inset #CCC; float:right; background-image: "+jQuery('#minimap_micro').css('background-image')+" } "
			+"div.TWPU_map div { width:4px; height:4px; border:1px solid white; border-radius:3px; position:absolute; cursor:pointer; } "
			+"div.TWPU_map span { display:block; position:absolute; z-index:10; width:6px; height:6px; background:url(images/main/dots.png) 0px 0px } "
			+" <"+"/style>");
		
		
		
		TWPU.TransferFeesCalc = function(F){ var S, D, C;
			if(F) { S = TWPU.TvalF; D = TWPU.TvalN; C = 1*0.95; }
			else  { S = TWPU.TvalN; D = TWPU.TvalF; C = 1/0.95; }
			D.value = Math.round(S.value*C);
			TWPU.TvalD.innerHTML = '- $'+ (TWPU.TvalF.value - TWPU.TvalN.value);
		}

		TWPU.BankInject = function(townid){
			function FeesCalc(){
				if(!depinp.value) { pbfinfo.innerHTML = ''; return; }
				if(depinp.value < 0 || isNaN(depinp.value)) { pbfinfo.innerHTML = '?!'; return; }
				pbfinfo.innerHTML = '- $' + Math.ceil(depinp.value - depinp.value / fees);
			}
			var cont = document.getElementById('window_building_bank_'+townid+'_content');
			var efees = cont.getElementsByTagName('span')[1];
			var fees = 1 + 0.01 * Number(efees.innerHTML.split(':')[1].replace(/[^\d]+/g, ''));
			var depinp = document.getElementById('bank_'+townid+'_deposit_payin');
			var pbfinfo = document.createElement('span');
			pbfinfo.setAttribute('style', 'font-size:80%; color:darkred');
			pbfinfo.innerHTML = "";
			depinp.parentNode.appendChild(pbfinfo);
			depinp.addEventListener('blur', FeesCalc, false);
			depinp.addEventListener('keyup', FeesCalc, false);
			depinp.nextSibling.nextSibling.addEventListener('click', FeesCalc, false);
		}

		TWPU.TransferInject = function(td){
			td.innerHTML = 
			  ' <'+'input type="text" value="" onkeyup="TWPU.TransferFeesCalc(true)"  onblur="TWPU.TransferFeesCalc(true)"  size="5" name="amount" class="input_layout" /\> $'+
			  ' <'+'span style="font-size:8px;">'+TWPU.tr('made_by')+' Petee (<'+'a href="http://tw-db.info/">TW-DB.info<'+'/a>)<'+'/span><'+'br />'+
			  ' <'+'b>-5% (<'+'span style="color:darkred;font-weight:bold;">- $0<'+'/span>) =<'+'/b>'+
			  ' <'+'input type="text" value="" onkeyup="TWPU.TransferFeesCalc(false)" onblur="TWPU.TransferFeesCalc(false)" size="5" name="amount" class="input_layout" /> $';
			TWPU.TvalF = td.getElementsByTagName('input')[0]; TWPU.TvalN = td.getElementsByTagName('input')[1]; TWPU.TvalD = td.getElementsByTagName('span')[1];
		}

		
		
		var AWS = "" + AjaxWindow.show;
		if(AWS.charAt(AWS.length-1) != "}") {alert(TWPU.namev+TWPU.tr('error_atypical_function')+': AjaxWindow.show'); return;}
		AWS  = AWS.substr(0,AWS.length-1);
		AWS += "if(name == 'building_bank'){";
		AWS += "var bwnd = document.getElementById('window_building_bank_'+appendName);";
		AWS += "bwnd.addEventListener('load', function(){";
		AWS += "if(!document.getElementById('bank_'+appendName+'_balance'))return;";
		AWS += "bwnd.removeEventListener('load', arguments.callee, true);"
		AWS += "TWPU.BankInject(appendName);"
		AWS += "}, true); }";
		AWS += "}";
		AjaxWindow.show = eval("("+AWS+")");

		var sDB = "" + switchDisplayBlocks;
		if(sDB.charAt(sDB.length-1) != "}") {alert(TWPU.namev+TWPU.tr('error_atypical_function')+': switchDisplayBlocks'); return;}
		sDB  = sDB.substr(0,sDB.length-1);
		sDB += " if(arguments[0].replace(/[0-9]/g,'') == 'bank__transfer')";
		sDB += "  TWPU.TransferInject(document.getElementById(arguments[0]).getElementsByTagName('table')[1].rows[2].cells[1]);"
		sDB += "}";
		switchDisplayBlocks = eval("("+sDB+")");
		
		return;
		
		var TC = Market.prototype.prepareTraderControl.toString(); var R = {tc: 0};
		TC = TC.replace(/n *> *1 *&& *false *\? *['"]\x3Ctr>\x3Ctd>['"] *\+ *['"][^"]+:['"] *\+/, //1
			function(){R.tc++;
			  return "n > 1 ? '<"+"tr><"+"td>'+TWPU.tr('repeat_sale')+' (*) : '+";
			});
		TC = TC.replace(/id=['"]market_n['"] *value=[(?:\\")'"]{2} *\+ *n *\+ *[(?:\\")'"]{2}/, //1
			function(str){R.tc++;
			  return str.replace(/\+ *n *\+/,'+1+');
			});
		TC = TC.replace(/"\x3C\/table>\x3Cbr \/>\x3C\/div>"/, //1
			function(){R.tc++;
			  return '"<'+'/table>"'
					+'+ ( n > 1 ? "* - <'+'span style=\'font-size:8px\'>"+'
					  +'TWPU.tr("repeat_sale_extra")'
					 +'+"<'+'/span>" : "")'
					'+"<'+'br /><'+'/div>"';
			});
		TC = TC.replace(/Ajax.remoteCall\(/, //1
			function(){R.tc++;
			  return "that.repeatMarketRequest( "
					 +"nsell, null, null, ";
			});
		TC = TC.replace(/itemcount: *nsell/i, //1
			function(){R.tc++;
			  return "itemcount:1";
			});


		var MB = Market.prototype.bid.toString(); R.mb = 0;
		MB = MB.replace(/value *= *["'\"]{2} *\+[^\n]*\+ *["'\"]{2} *\/><\/div>/, //1
			function(){R.mb++;
			  return "value='\"+( offerdata.auction_price ? (Math.max(offerdata.auction_price-1,offerdata.current_bid||0)+1) : offerdata.max_price)+\"' />\""
					+"+( this_oa.length > 1 ? "
					 +"\"<"+"br />\"+TWPU.tr(\"repeat_bid\")+\": "
					 +"<"+"input type='text' id='market_offer_repeat' class='input_layout' style='text-align: center;' size='3' value='1' />\""
					+" : '' )+\"<"+"/div>";
			});
		MB = MB.replace(/offerdata.market_offer_id}/g, function(){R.mb++; //2
			  return "this_oa[0]}";
			});
		MB = MB.replace(/var *func/, //1
			function(){R.mb++;
			  return "var this_oa = this.PUs.oa[offerdata.market_offer_id];"
					+"var that = this;"
					+"var func";
			});
		MB = MB.replace(/Ajax.remoteCall\(/g, //2
			function(){R.mb++; 
			  return "var c = jQuery('#market_offer_repeat');"
					+"c = ( c && c.length ? parseInt(c.val(),10) || 1 : 1 );"
					+"if(c > this_oa.length) { alert( TWPU.namev+TWPU.tr('error_not_that_many') ); return }"
					+"that.repeatMarketRequest("
					 +"c, this_oa, null, ";
			});
		MB = MB.replace(/if *\( *resp.error *\)/g, //2
			function(){R.mb++; 
			  return "that.refreshTabPU();"
					+"if (resp.error)";
			});
		MB = MB.replace(/, *offerdata.max_price *\) *\+ *["'\"]< ?br *\/>["'\"]/, //1
			function(){R.mb++; 
			  return ',"<'+'a style=\'cursor:pointer;text-decoration:underline\' onclick=\'jQuery(\\"#market_offer_money\\").val(jQuery(this).html())\'>"+offerdata.max_price+"<'+'/a>")+"<'+'br />"';
			});
		MB = MB.replace(/offerdata\.auction_end_date/, //1
			function(){R.mb++; 
			  return 'offerdata.auction_end_date.replace(/:(\\d\\d)/, ":$1<'+'small>:"+(offerdata.auction_end_time%60 + 100).toFixed(2).toString().substr(1)+"<'+'/small>")';
			});

					
		var MF = Market.prototype.fetch.toString(); R.mf = 0;
		MF = MF.replace(/Ajax.remoteCall *\(/, //1
			function(){R.mf++; 
			  return "that.repeatMarketRequest( "
					 +"this_oa.length, this_oa, PU, ";
			});
		MF = MF.replace(/[^\(\[_]offer_id/g, //2
			function(str){R.mf++;
			  return str.charAt(0)+"this_oa[0]";
			}); // premium function will apply to the first in the array (i=0)
		MF = MF.replace(/that *= *this;/, //1
			function(){R.mf++;
			  return "that = this;"
					+"var PU = 'PU'+'sob'.charAt(Math.floor(offer_id/1E6));"
					+"var this_oa = that[PU].oa[offer_id];";
			});
		
		
		//var UU = Market.prototype.updateUi.toString(); *** R + 2 **
		//UU = UU.replace(/Tab\(0\)/g,	function(){ R++; return "Tab()"; });
			

		
		if(( R.sum = R.tc+R.mb+R.mf )==16 /*(1.32)*/ || R.sum==19 /*(1.33)*/) {
			Market.prototype.prepareTraderControl = eval("("+TC+")");
			Market.prototype.bid = eval("("+MB+")");
			Market.prototype.fetch = eval("("+MF+")");
			//Market.prototype.updateUi = eval("("+UU+")");
		}
		else {
			alert(TWPU.namev+TWPU.tr('error_code_load_failed')+"\nERROR CODE: #"+R.tc+"|"+R.mb+"|"+R.mf);
			return;
		}

		
		
		Market.prototype.setIsHomeTown = function(isHome) {
			// as this function is run on every Market window reload, I use it to initialize my features
			var $ = jQuery;	var that = this;
			var m = $('h2','#market_'+this.townId+'_trader_inv_div'); // market header
			var map = []; for(var i=0;i<3;) map[i++] = $('<'+'div class="TWPU_map"><'+'/div>');
			$("#market_"+this.townId+"_offers_tab").dblclick(function () { that.updateOfferTab(); });
			$("#market_"+this.townId+"_bids_tab").dblclick(function () { that.updateBidTab(); });
			$("#market_"+this.townId+"_offerstab h3").append(map[1]); $("#market_"+this.townId+"_bidstab h3").append(map[2]);
			var td = $('td.txright','#market_'+this.townId+'_offer_table'); // td with sort select
			$('select:first',td)/*.append("<"+"option value='ndistance'>- "+$('select:first input:eq(2)',td).html()+"<"+"/option>")*/
								.append("<"+"option value='max_price'>"+TWPU.tr('max_price')+"<"+"/option>")
								.append("<"+"option value='count'>"+TWPU.tr('count')+"<"+"/option>");
			m.html(
				 "<"+"span style='float:left;margin-left:20px;margin-top:5px;font-size:10px'>"
				 +'<'+'img alt="D" title="'+TWPU.tr('disable_grouping')+'" width="15" height="15" '
					+'src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAB3RJTUUH2wgGEQgL49nIlgAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAACKUExURVACAZoDApwRDKUaE60iGVsRDLcJBsESDccZEtAkG9QuKuI7LuZNQL8QC6YSDeyhnfz5+fTRz9iZl8xlYfPKyagFA+GYl8NCQcdTULQTE9OAf9cAAMgFBNUfH9xERO1ycudbW/CurvPk5NNWVucAANx6evNzc+liYvMAAOc4OO3a2uYrK2AOCkwAACJL1DgAAACdSURBVHjaNcvtFoIgFERRlCKEyMm8ll0yLTL7ev/XS8zOvz1rjXhvajVFY8lHOA5hmAqBmSaH4fF8hZ8Vx6FHGzm7ufW4d9e/G+RntB2us7clj+bu4lkJ8ic0bMsTW1hPgsjAjE/2BnsikVCNo4sdUVM6WlXYa60PqBRtRKJctkWxK1BqpaJX2uQA8ky72Zmxa5v9LJI0lXIRk1Iuv9xbEVHwY/BMAAAAAElFTkSuQmCC" />'
				// +'<'+'img alt="D" title="'+TWPU.tr('safe_mode')+'" width="15" height="15" '
				//	+'src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAB3RJTUUH2wgGEQgL49nIlgAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAACKUExURVACAZoDApwRDKUaE60iGVsRDLcJBsESDccZEtAkG9QuKuI7LuZNQL8QC6YSDeyhnfz5+fTRz9iZl8xlYfPKyagFA+GYl8NCQcdTULQTE9OAf9cAAMgFBNUfH9xERO1ycudbW/CurvPk5NNWVucAANx6evNzc+liYvMAAOc4OO3a2uYrK2AOCkwAACJL1DgAAACdSURBVHjaNcvtFoIgFERRlCKEyMm8ll0yLTL7ev/XS8zOvz1rjXhvajVFY8lHOA5hmAqBmSaH4fF8hZ8Vx6FHGzm7ufW4d9e/G+RntB2us7clj+bu4lkJ8ic0bMsTW1hPgsjAjE/2BnsikVCNo4sdUVM6WlXYa60PqBRtRKJctkWxK1BqpaJX2uQA8ky72Zmxa5v9LJI0lXIRk1Iuv9xbEVHwY/BMAAAAAElFTkSuQmCC" />'
				 +'<'+'img src="/images/main/refresh.png" title="'+TWPU.tr('reload')+'" width="15" height="15">'
				 +' <'+'span id="PU_'+this.townId+'_progress"><'+'/span>'
				+"<"+"/span>"
				+m.html()
				+"<"+"span style='float:right;margin-right:20px;margin-top:5px;font-size:10px'>"
				 +td.html().split('<'+'br')[0]
				+"<"+"/span>"
			);
			td.html(td.html().substr(td.html().indexOf('<'+'br'))).prepend(map[0]);
			
			// control handlers
			$('img', m).css('cursor','pointer').each(function(i){
				$(this).click( function(){ $(this).fadeTo(400, that.setPUSetting('i'+i, this)); } )
			});
			$('select',m).css('font-size','10px').each(function(i){
				$(this).change( function(){ that.setPUSetting('s'+i, this); } )
			});
			
			this.PUset = {
				groupingFilter: { 
					auction_price:true, current_bid:true, item_id:true, market_town_id:true, max_price:true, sell_rights:true, seller_player_id:true, market_offer_id:false
				},
				sort: 'price'
			};
			
			this.isHome = isHome;
			return this;
		};
		
		
		
		Market.prototype.setPUSetting = function(id, e) {
			var x = this.PUset; var out;
			function disableGF(p){ return (x.groupingFilter[p] ^= true) ? 0.4 : 1; }
			switch(id){
					case 'i0': // disable grouping by forcing same market_offer_id (never gonna happen)
					out = disableGF('market_offer_id');
			 break; case 'i1': // reload current window
					out = 1; this.refreshTabPU(true);
			 break; case 's0': // set sorting
					this.PUset.sort = jQuery(e).val();
			}
			if(id != 'i1') this.refreshTabPU(false);
			return out || true;
		};
		
		
		
		Market.prototype.repeatMarketRequest = function(n, oa, PU, market, action, R, handler){
			var i = 0, j = 0; var nextPause = TWPU.reqGroup;
			var progress_bar = jQuery('#PU_'+this.townId+'_progress');
			if(PU) var c = this[PU].c;
			
			function RoundFinished(resp){
				progress_bar.html('');
				if(j < n){ // I just wanted to wait
					nextPause += TWPU.reqGroup;
					RoundStart();
				} else 		 // I've come to the end of the queue
					handler(resp);	
			}
			
			function RoundStart(){
				for( ; i < n && i < nextPause; i++){
					if(oa) { // prepare the next id and remove it from cache
						var id = R.market_offer_id = oa[i];
						if(PU) jQuery.each(c.slice(0), 
							function(mi, it) { if(it.market_offer_id == id) c.splice(mi,1) }
						);
					}
					SendSingle(R);
				}
			}
			function SendSingle(R){
				var req = jQuery.extend({},R);
				(function thisRequest(){
					function checkSuccess(resp){
						if(resp) { progress_bar.html('('+(++j)+'/'+n+')'); if(j == n || j == nextPause) RoundFinished(resp); }
						else { if(!TWPU.reqTimer) { TWPU.reqTimer = Math.floor(TWPU.reqPauseTime/1000); TWPU.reqInterval = setInterval(WaitTimer, 1000); }
							   setTimeout(thisRequest, TWPU.reqPauseTime);
					}	}
					jQuery.post('game.php?window='+(market ? market : "building_market")+'&action='+action+'&h='+h, req,
						checkSuccess, 'json');
				})();
			}
			function WaitTimer(){ if(--TWPU.reqTimer) progress_bar.html('('+j+'/'+n+') '+'(!'+TWPU.reqTimer+'!)'); else clearInterval(TWPU.reqInterval); }
			
			RoundStart();
		};
		
		Market.prototype.format.sale_location = (Market.prototype.format.market_distance.toString().match(/s\(['"].+: \%1/) || ["s('Sale location: %1 "])[0].substr(3);
		Market.prototype.format.market_distance = function (row) {
			var x = row.market_town_x;
			var y = row.market_town_y;
			return "<"+"a onclick='AjaxWindow.show(\"town\", {x: "+x+", y: "+y+"}, "+x+"+ \"_\" + "+y+")' title='"
				+s(Market.prototype.format.sale_location, ("<"+"b>"+row.market_town_name+"<"+"/b>").escapeHTML())
				+"' onmouseover='$()'>"+WMap.calcWayTime(pos,{x:x,y:y}).formatDuration()+"<"+"/a><"+"div class='TWPU_ico'>"
				+"<"+"img src='/images/icons/walk_to.png' title='"+TWPU.tr('walkthere')+"' "+
					"onclick='jQuery.extend(new Fingerboard("+row.market_town_id+", "+x+", "+y+", \"town\"), {button:{activate:function(){}}}).start()'>"
				+"<"+"img src='/images/icons/center.png'  title='"+TWPU.tr('centermap')+"' "+
					"onclick='WMap.scroll_map_to_pos("+x+","+y+");'><"+"/div>";
		};
		
		Market.prototype.PU_map = function(PU, o){
			var $=jQuery, tab = $('#market_'+this.townId+"_"+ (PU=="PUs" ? "search" : (PU=="PUo" ? "offerstab" : "bidstab")));
			var that = this, town = {}, map = tab.find('div.TWPU_map')
					.html('<'+'span style="right:'+Math.floor(pos.x*.181-3)+'px;top:'+Math.floor(pos.y*.049-3)+'px"><'+'/span>');
			var colors = "081272|04819E|D69D00|875422|E667AF|FF2300|1DB473|537A05|3A0470|000000".split('|'), ci = 0;
			function tx(ob){ var ti = ob.market_town_id;
				if(!town[ti]){
					var px = Math.floor(ob.market_town_x*.181-3), py = Math.floor(ob.market_town_y*.049-3);
					town[ti] = {c:colors[ci], e:$('<'+'div style="background-color:#'+colors[ci++]+';right:'+px+'px;top:'+py+'px"><'+'/div>').appendTo(map)};
				} return town[ti];
			}
			tab.find('table.market_table > tbody > tr').each(function(i,e){
				if(!o[i]) return $(e).find("td.market_distance").css('background-color','') && true;
				var m = tx(o[i]), s = $(e).find('td.market_distance');
				$(e).find("td.market_distance").css('background-color','#'+m.c).hover(
					function(){ m.e.css({'z-index':'20',"background-color":"#FFFFFF"}) },
					function(){ m.e.css({'z-index': '0',"background-color": "#"+m.c }) }
				  ).find('a').css('color','white');
				m.e.hover(function(){ s.css("background-color","#FFF").find('a').css('color','#000') }, function(){ s.css("background-color","#"+m.c).find('a').css('color','#FFF') })
					.click(function(){ s.find('.TWPU_ico img:last').click() });
			});
		};
		
		
		Market.prototype.search = function(page){
			if(this['PUs'] && this['PUs'].r.item_id != this.selectedItem.item_id) page = undefined;
			this.getPUData( 'search', 'updateSearchTabUi',
				{ town_id:this.townId, item_id:this.selectedItem.item_id, sort:'price', page:0 },
				page, 'PUs', 0 );
		};
		
		Market.prototype.updateSearchTabUi = function(result, page){
			var resulttable = $('market_'+this.townId+'_result'); if (!resulttable) return; 
			$('market_'+this.townId+'_resultbox').style.display = "block";
			jQuery('#PU_'+this.townId+'_progress').html('');
			this.fillItemTable(resulttable,result,page,'search');
		};
		
		Market.prototype.updateInfoTab = function(func,page,call){
			var that = this; var PU = "PU"+func.charAt(6); var POA = (func.charAt(6)=="o" ? 1E6 : 2E6);
			this.getPUData( func, call,
				{ page:0 },
				page, "PU"+func.charAt(6), POA );
		};
		
		
		
		TWPU.expression = { // sort comparing functions
			price:		function(a,b){ return (a.current_bid || a.max_price) - (b.current_bid || b.max_price); },
			distance:	function(a,b){ return WMap.calcWayTime(pos,{x:a.market_town_x,y:a.market_town_y}) - WMap.calcWayTime(pos,{x:b.market_town_x,y:b.market_town_y}); },
			time:		function(a,b){ return a.auction_ends_in - b.auction_ends_in; },
			/*ntime:		function(a,b){ return b.auction_ends_in - a.auction_ends_in; },*/
			max_price:	function(a,b){ return (a.max_price || (a.current_bid + 1E9)) - (b.max_price || (b.current_bid + 1E9)); },
			count:		function(a,b){ return b.real_count - a.real_count; }
		};
		
		
		
		Market.prototype.refreshTabPU = function(reload){
			var call, PU;
			switch(this.activepage){
					case 'search':	PU = "PUs"; call = this.search;
			 break; case 'offer':	PU = "PUo"; call = this.updateOfferTab;
			 break; case 'bid':		PU = "PUb"; call = this.updateBidTab;
			 break; };
			call.call(this,(reload ? undefined : (this[PU] ? this[PU].p : undefined)));
		}
		
		
		
		Market.prototype.getPUData = function(func, call, request, page, PU, POA) {
			var that = this; var y;
			
			if( (y = this[PU]) && page != undefined ){
				// if there is a cached result and I just fliped a page, output it
				y.p = page; y.o = []; y.oa = []; // store the page and clean up
				var j = -1; // function below compares the whole object of enabled properties using AND logic;
				function AndComp(a){ for(var pr in a) if(a[pr]) if(y.c[i][pr] != y.o[j][pr]) return false; return true; }
				
				y.c.sort(function(a,b){
					return (a.auction_ends_in > 0 ? 0 : 1) - (b.auction_ends_in > 0 ? 0 : 1)
						|| a.market_town_id - b.market_town_id
						|| a.item_id - b.item_id
						|| a.current_bid - b.current_bid
						|| a.auction_ends_in - b.auction_ends_in;
				});
				for(var i=0; i < y.c.length; i++)
					if(j >= 0 && AndComp(this.PUset.groupingFilter) && ((y.c[i].auction_ends_in > 0) == (y.o[j].auction_ends_in > 0)) )
					{ 		  // same - add the real id to the array and increase the count
						y.oa[j + POA].push(y.c[i].market_offer_id);
						y.o[j].item_count = '<'+'b><'+'u>'+(y.o[j].real_count += y.c[i].item_count)+'<'+'/u><'+'/b>';
					} else	{ // different - a new object, a new internal id, a new array of real ids
						y.o[++j] = jQuery.extend( {}, y.c[i], {market_offer_id: j + POA, real_count: y.c[i].item_count} );
						y.oa[j + POA] = [y.c[i].market_offer_id];
					}
				y.o.sort( function(a,b){
					return TWPU.expression[that.PUset.sort](a,b) || TWPU.expression['distance'](a,b) || TWPU.expression['time'](a,b);
				});
				jQuery('#PU_'+that.townId+'_progress').html('');
				this[call]({search_result: y.o.slice(page*10,page*10+11), item_info: y.I},page);
				this.PU_map(PU, y.o.slice(page*10,page*10+11));
			}
			
			else { // no cached result -> get it and then recursively output
				y = this[PU] = {
					c:[], // unmodified results cache
					o: [], // modified results (grouped and assigned a new id)
					oa: [], // array of new ids with the real ids of grouped offers
					p: (page?page:0), // undefined page means I'm getting the results from server
					I: {}, // array with accumulated item info
					r: request // the current request (options on the Search tab, otherwise a dummy variable containing just the page number)
				};
				function PU_getPage(resp){
					if(resp.error) return new HumanMessage(resp.msg);
					var x = resp.msg.search_result;
					jQuery.extend(y.I, resp.msg.item_info);
					for(var i=0;i < x.length && i < 10;i++) y.c.push(x[i]);
					jQuery('#PU_'+that.townId+'_progress').html('('+(y.r.page+1)*10+')');
					// if there is a next result, continue, else print it out recursively
					if(x[10]) Ajax.remoteCallMode('building_market', func, (y.r.page++,y.r), PU_getPage);
					else that.getPUData(func, call, request, 0, PU, POA);
				};
				Ajax.remoteCallMode('building_market', func, y.r, PU_getPage);
			 }
		};

		
/**************************/
/*  injected script ends  */

	}).toString()+")();";
	document.getElementsByTagName('head')[0].appendChild(twpujs);
};

if (location.href.indexOf(".the-west.") != -1 && location.href.indexOf("game.php") != -1)
setTimeout(TWPU_inject, 500, false); //just to ensure that a lang_pack is already loaded