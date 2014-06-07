// ==UserScript==
// @name           twt147
// @namespace      http://userscripts.org/users/113314
// @include        http*://twitter.com*
// @include        http*://www.twitter.com*
// @include        http*://identi.ca*
// ==/UserScript==

//-moz-border-radius:5px;-webkit-border-radius:5px;

var Vento = 1==0;
var eDev = 1==0;


//**********************************
function tstsj() {
	//return;
	//alert(1);
	
	//variaveis 
	var nrTw,urTw,idCa;
	var vUrl = new Array(),urlCrun=false;
	var _debJ = 0;

	//jQuery
	if(typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(tstsj,500);
		return;
	}
	$ = unsafeWindow.jQuery;
	jQuery = $;
	
	//lert($(document.body).click);
	idCa = (''+window.location).indexOf('://identi.ca')!=-1;
	//debJ(idCa);
	//identi.ca
	if (idCa) {
		$('#notice_data-text').width(500);
		$('#site_nav_global_primary').css({position:'fixed',right:'10px',background: '#fff',padding:'0 7px 3px 0'
			,'border':'2px red solid','-moz-border-radius':'5px','-webkit-border-radius':'5px'
		});
		//alert($('#site_nav_global_primary')[0]);
		$('#site_notice').css({position:'fixed',right:'-170px',bottom:'10px',background: '#fff',padding:'0 0 7px 7px'});
		$('#form_notice').css({padding:'7px'}).width(600);
		$('#core').css({margin:'50px 200px','font-size':'110%'});
		//return;
	}
	
	
	GM_addStyle(
		'li .repassa {visibility:hidden;color:#a3C3C3;padding:0 4px;border:0px solid;cursor:pointer;text-align:right;}'
		+'li:hover .repassa {visibility:visible;font-weight:bold;acolor:#000;}'
		+'.fechaSt {text-align:center;cursor:pointer;aborder:4px outset blue;padding:7px;background-color:#aaa;}'
		+'DIV.debJ {text-align:left;height:350px;border:4px groove #C080FF;padding:7px;'
			+'overflow:scroll;position:fixed;left:-380px;width:390px;background-color:#FFFFFF;top:260px;}'
		+'DIV.debJ:hover {left:3px;}'
		+'SPAN.hora {font-weight:bold;color:#000;}'
		+'.par {background-color:#eef;}'
	);	
	
	//status?
	var Stat = divStatus();
	if (Stat) {
		window.Stat = Stat;
	}
	
	//agenda verificacao tweets
	window.setInterval(procTw,1000);
	debJ('ttttt');
	
	if (false) {
		//document.addEventListener('click',clicou);
		try {
			var docCAnt = document.onclick;
		} catch (e) {
			objA(document);
			alert('d='+document+' '+e);
		}
		document.addEventListener('click',clicou);
		/*objA(docCAnt);
		document.onclick = clicou;
		*/
	} else if (false) {
		//var docCAnt = $(document).click();
		//alert(docCAnt);
		//abandonado versao 2 === 
		$(document).click(clicou);
	}

	//auto update...
	me_name = $.trim($('#me_name').text());
	lastid = getLastId();
	//abandonado versao 2 === loopUpdate();


	//*********************************
	//funcoes
	//*********************************
	//on click no documento
	function clicou(ev1) {
		if (ev1.which!=1) { //botao normal
			return;
		}
		var to = ev1.target,t=to,ot=$(t); //targetEvent(ev1)
		while ( !idCa && t.parentNode && t.className=='' ) {
			t = t.parentNode;
			ot=$(t);
		}
		//lert(t+' '+ot);
		if (ot.hasClass('repassa')) {
			repassa(ev1);
			return false;
		} else if (ot.hasClass('fechaSt')) {
			fechaStatus();
		} else if (ot.hasClass('screen-name') || ot.hasClass('username') || ot.hasClass('hashtag') ) {
			//var o = window.open(t.href,'pessoa_'+ot.text());
			//$(o).focus();
			//ev1.stopPropagation();
			//return false;
		} else if (ot.hasClass('reply')) {
			Stat.mouseover();
			
		} else if (idCa && ot.hasClass('entry-content')) {
			//atalho identi.ca , novo janela
			var hr = (to.href+'');
			if (hr.indexOf('://')!=-1) {
				var o = window.open(hr,'_blank');
				$(o).focus();
				ev1.stopPropagation();
				return false;
			} else {
				debJ('endereco invalido... '+hr);
			}
		} else if (idCa) {
			//abas identi.ca 
			var hr = (to.href+'');
			if (hr.indexOf('://')!=-1) {
				window.location = hr;
				return false;
			}
		} else if (ot.hasClass('web')) {
		} else if (ot.hasClass('status-btn')) {
		} else if (ot.hasClass('published')) {
		} else if (ot.hasClass('fav-action')) {
		} else if (ot.hasClass('top-navigation')) {
			/*var hr = (to.href+'');
			if (hr.indexOf('home')==-1 && hr.indexOf('logout')==-1) {
				var o = window.open(hr,'_blank');
				$(o).focus();
				ev1.stopPropagation();
				return false;
			}
			*/
		} else {
			/*var a = $(to).parents('a');
			if (a.size()>0 && a[0].href ) {
				var o = window.open(a[0].href,'_blank');
				$(o).focus();
				ev1.stopPropagation();
				return false;
			}
			*/
			debJ('ch ant click='+t.className);
		}
		return false;
		//return docCAnt?docCAnt(ev1):false;
	}
	//*********************************
	var statW;
	function divStatus() {
		//div situacao, flutua-esconde
		if (idCa) {
			var st = $('#form_notice');
		} else {
			var st = $('#status_update_box');
		}
		if(st.size()<1) {
			return false;
		}
		var w = st.width(),h = st.height();
		var s = {
			position:'fixed'
			,background: '#fff'
			,border:'4px solid red','-moz-border-radius':'10px','-webkit-border-radius':'10px'
			,width:w+'px'
			,left:'-'+((''+window.location).indexOf('?status=')==-1?w-10:0)+'px'
			,top:'60px'
			,'z-index':'2000'
		};
		st.css(s);
		st.mouseover(function() {
			$(this).css({left:'0px'});
		});
		//add botao fecha update-submit
		var nb = document.createElement('div');
		nb.className = 'fechaSt';
		nb.innerHTML = 'f e c h a r';
		$(nb).click(clicou);
		st[0].appendChild(nb);
		statW = w;
		//$(nb).click(function() {
		//	st.css({left:'-'+(w-10)+'px'});
		//});


		//aumenta tamanho do textarea
		$(idCa?'#notice_data-text':'#status').height(100);
		
		//keyup
		urlCurta();
		
		//divSide
		divSide();
		
		return st;
	}
	//*********************************
	function fechaStatus() {
		Stat.css({left:'-'+(statW-10)+'px'});
	}
	//*********************************
	function divSide() {
		var st = $(idCa?'#aside_primary':'#side');
		if(st.size()<1) {
			return false;
		}
		var w = (idCa?320:st.width())+27,h = st.height();
		
		if (!idCa) {
			//elimina o td...
			var td = st.parents('td');
			if (td.size()>0) {
				td.width(0);
				var t = td.parents('table');
				t.css({'font-size':'110%',margin:'0 auto'});
				t.width(620);//t.css('margin:0 auto');
				td[0].id = '';
				td[0].removeChild(st[0]);
			}
			var dv = document.createElement('div');
			dv.id = 'side_base';
			document.body.appendChild(dv);
			dv.appendChild(st[0]);
			st = $(dv);
			//ver(td);
			//td[0].id = 'side_base';
		} else {
			//st.width(0);
		}
		
		var w = (idCa?320:st.width()),h = st.height();
		var s = {
			position:'fixed'
			,border:'1px solid blue'
			//,background: corSL//'#fff'
			,overflow:'auto'
			,height:'500px'
			,width:(w+0)+'px'
			,right:'-'+(w-10)+'px'
			,top:'60px'
			,'z-index':'100'
			,'padding-right':'5px'
		};
		st.css(s);
		st.mouseover(function() {
			$(this).css({right:'1px'});
		});
		st.mouseout(function() {
			$(this).css({right:'-'+(w-10)+'px'});
		});
		
		//menu sup
		var st = $('.top-navigation');
		if(st.size()>0) {
			//debJ('topnav='+st.size());
			//var w = st.width(),h = st.height();
			var s = {
				position:'fixed'
				,border:'1px solid blue'
				,width:st.width()+'px'
				,right:'10px'
				,'z-index':'100'
			};
			st.css(s);
		}
		
		//header
		var st = $('#header');
		if(st.size()>0) {
			var s = {
				position:'fixed'
				,left:'10px'
				,'z-index':'100'
			};
			st.css(s);
		}
		
	}
	//*********************************
	function urlCurta() {
		$status = $(idCa?'#notice_data-text':'#status,#direct_messages #text');
		debJ('st='+$status);
		// http://userscripts.org/scripts/show/40617
		$status.keyup(function(e){
			if (urlCrun) return;
			urlCrun=true;
			try {
				$status = $(idCa?'#notice_data-text':'#status,#direct_messages #text');
				var orig_update = $status.val();
				if( $status.length != 1 || orig_update.length < 140 ) {
					urlCrun = false;
					return;
				}
				orig_update = troca(troca(troca(troca(troca(orig_update,'\r',' '),'\n',' '),'\t',' '),'  ',' '),'  ',' ');
				$status.val(orig_update);
				debJ('xv='+orig_update);
						
				var urlRegExp = new RegExp(/https?:\/\/[^ ]*|ftp:\/\/[^ ]*/gim);
							
				var urlMatches = (' '+orig_update+' ').match(urlRegExp);
				debJ('encurta nUrl='+(urlMatches?urlMatches.length:'null'));
				if( !urlMatches ) {
					urlCrun = false;
					return; 
				}
				for (var i=0; i < urlMatches.length; i++) {        	        	
					var url = $.trim(urlMatches[i]);
					debJ(i+' encurta ?='+url);
					//continue;
					var domain = url.replace(/https?:\/\//i,'');
					var url_parts = domain.split('/');
					domain = url_parts.length > 1 ? url_parts[0] : domain;
					
					debJ('urc0='+url+' v='+vUrl[url]);
					if (typeof(vUrl[url])=='string') {
						$status.val($status.val().replace(url,vUrl[url],'gi'));
						continue;
					}
					debJ('urc='+url);
					if( url.length < 20 || vUrl[url] ) continue;
					vUrl[url] = true;
					debJ('getting short url for '+url);
					if (Vento) {
						vento(url,$status);
					} else {
						ur1(url,$status);
					}
				}
			} catch (e) {
				debJ('erro '+e);
			}
			urlCrun=false;
		});
	}
	//*********************************
	function vento(uro,$status){
		var ur = 'http://ven.to/?ajax=1&url='
			+encodeURIComponent(uro)
			+'&api=&user=0&senha='
		;
		//ebJ('vento='+ur);
		setTimeout(function(){GM_xmlhttpRequest({
			method:'GET',
			url: ur,  
			onload: function(resp) {
				//debJ('vento resp='+resp.status+' '+resp.responseText);
				if( resp.status != 200 ) {
					return false;
				}
				var d = document.createElement('div');
				d.innerHTML = resp.responseText;
				var resposta = new Array(
					1*$(d).find('sucesso').text()
					,$(d).find('resposta').text()
				);
				//debJ('vento resp1='+resposta[0]+' 1='+resposta[1]);
				if(resposta[0] == 1){
					var r = resposta[1];
					vUrl[uro] = uro;
					if( r.length < uro.length ) {
						vUrl[uro] = r;
						$status.val($status.val().replace(uro,r,'gi'));
					}
				} else {
					debJ('vento erro: '+resp.responseText);
				}
			}
			})
		},0);
	}
	//*********************************
	function ur1(url,$status) {
		var u = 'http://ur1.ca/';
		var d = 'longurl=' + encodeURIComponent(url);
		setTimeout(function(){GM_xmlhttpRequest({
			method:'POST',
			url: u,  
			data: d,
			headers:{'Content-type':'application/x-www-form-urlencoded'},
			onload: function(resp) {
				if( resp.status != 200 ) return false;
				var d = document.createElement('div');
				d.innerHTML = resp.responseText;
				var r = $(d).find('p.success a').text();
				debJ('vai subst url '+url+' por '+r);
				if( r ) {
					if( r.length < url.length ) {
						vUrl[url] = r;
						$status.val($status.val().replace(url,r,'gi'));
					}
				} else {
					debJ(resp.responseText);
				}
			}
		});
		},0);
	}
	//*********************************
	function procTw() {		
		var uf;
		var v = $(idCa?'#notices_primary li':'#timeline li');
		//debJ('tam not='+v.size());
		if (nrTw==v.size() && urTw==''+window.location ) {
			return;
		}
		if (v.size()<1) {
			debJ('nao encontrou tw');
		}
		nrTw = v.size();
		urTw = ''+window.location;
		
		//mouseover / elimina fotos duplas / add hora
		//  e par ou impar
		for (var i=0;i<v.size();i++) {
			var o = v.get(i);
			o.className = o.className+(i%2==0?' par':'');
			if (!o.feito) {
				o.feito = true;
				var o = $(v.get(i));
				//debJ('over setou='+i);
				o.mouseover(tOver);
				//foto dupla
				//var f = o.find('.photo:first').get(0);
				var f = o.find('img:first').get(0);
				if (!f || f==null) {
				} else if (uf==f.src) {
					f.parentNode.removeChild(f);
				} else {
					uf = f.src;
				}
				//data e hora
				var f = $(o.find('.timestamp:first').get(0));
				var t = f.attr('data');
				if (t) {
					t = t.substring(t.indexOf('\'')+1);
					t = t.substring(0,t.indexOf('\''));
					var t1 = ''+(new Date(t));
					var p1 = t1.indexOf(':');
					t1 = t1.substring(p1-2,p1+3);
					f[0].innerHTML = '<span class="hora">'+t1+'</span> - '+f[0].innerHTML;
				}
			}
		}
	}
	//*********************************
	function tOver($tweet) {
		//novo ou antigo
		//debJ('over...'+$tweet);
		var eso = '.actions-hover:first .repassa:first';
		var esn = '.actions-hover:first li:first';
		if ($($tweet.currentTarget).find(esn).length==0) {
			eso = '.actions:first .repassa:first';
			esn = '.actions:first .reply:first';
		}
		if (idCa) {
			eso = '.repassa:first';
			esn = '.notice_reply:first';
		} 
		//ja feito?
		$reply_btn = $($tweet.currentTarget).find(eso);
		if( $reply_btn.length != 0 ) return;
		//procura bot reply
		$reply_btn = $($tweet.currentTarget).find(esn);
		if( $reply_btn.length != 1 ) return;
		//novo
		$retweet_btn = $(document.createElement('span')).addClass('repassa');
		$retweet_btn.click(clicou);
		$retweet_btn.attr('title','Repassar').text(idCa?' rt ':'| RT');
		$reply_btn.after($retweet_btn);
	}
	//*********************************
	//get status textarea
	function getStatus() {
		//return ($('#status')[0]);
		return $(idCa?'#notice_data-text':'#status')[0];
	}
	//*********************************
	//ativa repasse
	function repassa($aa) {
		var a = $($aa.target).parents('li');
		var content = a.find('.entry-content:first,.msgtxt:first').text();
		var u = (idCa?a.find('.nickname:first').text():a.find('.screen-name:first').text());
		//var ta = stat();//($('#status')[0]);
		var ta = getStatus();
		if (ta) {
			//return;
			ta.value = 'RT @'+u+' '+content;
			$aa.stopPropagation();
			Stat.mouseover();
		} else {
			//tw de um usuario
			u = $('div.screen-name').text();
			window.open(
				'http://twitter.com?status='+encodeURIComponent('RT @'+u+' '+content)
				,'twt147'
				,'width=700,height=400,resizable=yes,scrollbars=yes,status=1'
			);
		}
	}
		
	//*********************************
	//procura tela status em openner
	function stat() {
		var d = window;
		while (d) {
			var ta = $(d.document,'#status');
			if (ta.size()>0) {
				return new Array(d,ta.get(0));
			}
			d = d.opener;
			debJ('mais='+d.location);
		}
		return false;
	}
	//*********************************
	// from http://userscripts.org/scripts/review/43246
	var interid,is_updating=false,waitForUpload=3,lastid,unread=0;
	//*********************************
	function loopUpdate() {
		 interid = setTimeout(update, 120000);//1000 * 60 * waitForUpload);
	}
	//*********************************
	//baixa
	function update()	{
		if(is_updating) return;
		is_updating = true;
		var url = '';
		//setCookie('ts_auto', getAutoUpdate(), 60 * 60 * 24 * 15);
		debJ('dbid='+document.body.id);
		switch(''+document.body.id) {
			case 'home':
				url = 'friends_timeline';
				break;
			case 'replies':
				url = 'replies';
				break;
			default:
				url = '';
			return;
		}
		//debJ('url='+url);
		if(url == '') return;
		url = '/statuses/' + url + '.json';
		debJ('url='+url+' '+lastid);
		getAjaxData(url + '?since_id=' + lastid, 
			function(data) {
				$('#timeline').prepend(data);
				lastid = getLastId();
				is_updating = false;
				interid = setTimeout(update, 120000);
			}
		);
	}
	//*********************************
	function getLastId() {
		 return getStatusId(0);
	}
	//*********************************
	function getStatusId(index) {
		 return $('#timeline > li[id!=ts_ltv]')[index].id.replace('status_', '');
	}	
	//*********************************
	function getAjaxData(dataurl, callback)	{
		 $.ajax({
			  'url' : dataurl,
			  'dataType': 'json',
			  'error': function(){setTimeout(update, 120000);is_updating = false;$('#loader').hide();},
			  'success': function(data)  {
					//lert(typeof(data)+' '+data);
					var ids = [];
					$('#loader').hide();
					for(var i=0, l=data.length, item='', list=''; i<l; i++)
					{
						 var reto = '';
						 ids.push(data[i].id);
						 lock = data[i].user.protected ? loc.replace(/\{rname\}/g, data[i].user.name) : '';
						 if(data[i].in_reply_to_status_id)  {
							  reto =  rto.replace(/\{replyto\}/g, data[i].in_reply_to_screen_name);
							  reto = reto.replace(/\{statusid\}/g, data[i].in_reply_to_status_id);
						 }
						 unread++;
						 item = tmp;
						 item = item.replace(/\{mine\}/g, me_name == data[i].user.screen_name ? 'mine' : '');
						 item = item.replace(/\{tome\}/g, me_name == data[i].in_reply_to_screen_name ? 'tome' : '');
						 item = item.replace(/\{text\}/g, textHandler(data[i].text));
						 item = item.replace(/\{profile_image_url\}/g, data[i].user.profile_image_url);
						 item = item.replace(/\{source\}/g, data[i].source);
						 item = item.replace(/\{created_at\}/g, getTime(data[i].created_at));
						 item = item.replace(/\{created_at1\}/g, data[i].created_at);
						 item = item.replace(/\{action\}/g, me_name == data[i].user.screen_name ? del : rep);
						 item = item.replace(/\{lock\}/g, lock);
						 item = item.replace(/\{replyto\}/g, reto);
						 item = item.replace(/\{id\}/g, data[i].id);
						 item = item.replace(/\{screen_name\}/g, data[i].user.screen_name);
						 list += item;
					}
					//ids.length > 0 && $('#status_' + ids.join(',#status_')).remove();
					debJ('res ajax='+ids.length);
					callback(list);
					//checkUnread();
					//is_updating = false;
			  },
		 });
	}
	function getTime(time)	{
		var m = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
		var d = new Date(time.replace('+', 'GMT+'));
		return d.getHours() + ':' + d.getMinutes()+ ' ' + d.getDate() + ' ' + m[d.getMonth()]  + ' ' + d.getFullYear();
	}
	var me_name = '?';
	var edt = '<a class="ts_edt" title="edit" href="javascript:void 0;">&nbsp;&nbsp;</a>';
	var ret = '<a class="ts_ret" title="retweet" href="javascript:void 0;">&nbsp;&nbsp;</a>';
	var loc = '<span class="lock-icon" title="{rname}&rsquo;s tweets are protected."/>';
	var del = '<a title="delete this update" class="del">&nbsp;&nbsp;</a>';
	var rep = '<a title="reply to {screen_name}" href="/home?status=@{screen_name}%20&amp;in_reply_to_status_id={id}&amp;in_reply_to={screen_name}" class="reply">&nbsp;&nbsp;</a>';
	var rto = '<a class="ts_inreply" href="/{replyto}/status/{statusid}">in reply to {replyto}</a>'
	var tmp = '<li id="status_{id}" class="unread hentry status u-{screen_name} {tome} {mine}">' + 
		'<span class="thumb vcard author"><a class="url" href="/{screen_name}">' + 
		'<img width="48" height="48" src="{profile_image_url}" class="photo fn" alt="{screen_name}"/>' + 
		'</a></span><span class="status-body"><strong>' + 
		'<a title="{screen_name}" class="tweet-url screen-name" href="/{screen_name}">' + 
		'{screen_name}</a></strong> {lock}<span class="entry-content">{text}</span>' + 
		'<span class="meta entry-meta"><a rel="bookmark" class="entry-date" href="/{screen_name}/status/{id}">' + 
		'<span class="published timestamp" data="{time:\'{created_at1}\'}">{created_at}</span></a> <span>from {source}</span> {replyto}</span></span>' + 
		'<span class="actions"><div>' + 
		'<a title="favorite this update" id="status_star_{id}" class="fav-action non-fav">&nbsp;&nbsp;</a>' + 
		'{action}</div></span></li>'
	;
	function textHandler(text) {
		var reg_url = /((?:http|https|ftp|telnet|file)\:\/\/[^\s]+)/ig;
		var reg_rpl = /@([a-z0-9_]+)/ig;
		var reg_tag = /#([^\s]+)/ig;
		text = text.replace(reg_url, '<a href="$1" target="_blank">$1</a>');
		text = text.replace(reg_rpl, '@<a href="/$1">$1</a>');
		text = text.replace(reg_tag, '<a href="/search?q=%23$1">#$1</a>');
		return text;
	}
	//*********************************
	// end from http://userscripts.org/scripts/review/43246



	//*********************************
	function ver($ob) {
		var t = '';
		for (xx in $ob) {
			try {
				var o = $ob[xx];
				var ot = ''+o;
				ot = (ot.length>10?ot.substring(0,10):ot);
				var tp=typeof(o);
				t += xx+' '+tp
					+(tp=='object'&&o!=null?' '+(o.tagName):'')
					+' '+ot+' | '
				;
			} catch (e) {
				t += 'erro '+e;
			}
		}
		alert(t);
	}
	
	//*********************************
	//*********************************
	function debJ(str) {
		if (!eDev) return;
		var jan = $('#debJ')[0];
		if (!jan) {
			var jan = document.createElement("div");
			jan.className = 'debJ';
			jan.id = 'debJ';
			jan.innerHTML = '';
			document.body.appendChild(jan);
		}
		jan.innerHTML = ((''+str).indexOf('<')==-1?'<p>'+(_debJ++)+' '+str+'</p>':str) 
			+'<hr>'+ jan.innerHTML
		;
	}
	//**********************
	function troca(g,a,b) {
		return g.replace(a,b,'g');
	}
	//*********************************
	function targetEvent(ev) {
		var v = Array('target','srcElement','originalTarget','currentTarget',
		'explicitOriginalTarget','relatedTarget');
		//localiza obj destino
		for (var i=0;i<v.length;i++) {
			try {
				var o = ev[v[i]];
				if (o!=null) {
					return o;
				}
			} catch (e) {
			}
		}
		return null;
	}
	//**************************//
	function objA(o,filtro) {
		var r = '';
		var i=0,tp=new Array(),z;
		for(var prop in o) {
			try {
				z = o[prop];
			} catch (e) {
				z = '?erro:'+e;
			}
			var t = typeof(z);
			if (!tp[t]) tp[t] = 0;
			tp[t]++;
			if (!filtro || t==filtro) {
				r += ''+t.substring(0,2)+': '
				+prop+' = '+z+'\n';
			}
			i++;
			if (i>200) break;
		}
		alert(r);
	}

}


setTimeout(tstsj,500);

/*
^1[2-8].

	meta	mnem
	------------------------------
	.	ponto
	[]	lista
	[^]	lista negada
	?	opcional
	*	asterisco
	+	mais
	{}	chaves
	^	circunflexo
	$	cifr
	\b	borda
	\	escape
	|	ou
	()	grupo
	\1	retrovisor
*/