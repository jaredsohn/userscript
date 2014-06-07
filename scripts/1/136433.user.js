// ==UserScript==
// @name           Facebook Arkadas Silici
// @description    Kapalı hesaplari temizler.
// @author         Bugra AYAN
// @include        http://*.facebook.*
// @include        https://*.facebook.*
// @version        1.0
// ==/UserScript==

(function(){
	if(window.location.href.indexOf('friends') < 0){
		if(confirm('Dogru sayfada degilsiniz. Sizi aktarmami ister misiniz?')){
			window.location.replace('//www.facebook.com/friends/edit/');
		}
		else{
			return;
		}
	}
	Element.prototype.prependChild = function(child) { this.insertBefore(child, this.firstChild); };
	var tag = 'disremove';
	var funs = ['Taraniyor.','Takip edin, haberdar olun. twitter.com/bugraayan', 'Abone olun, haberdar olun. fb.com/bugraayan'];
	var len = funs.length;
	var type = 'auto';
	var called = false;
	var ids = [];
	var tds = [];
	var names = {};
	window[tag+'_close'] = false;
	var ui = ''+
		'<div id="'+tag+'_main">'+
			'Ne yapalim: '+
			'<select id="'+tag+'_type">'+
				'<option value="auto">Otomatik Sil</option>'+
				'<option value="sort">Kimmis bunlar ,listele!</option>'+
				'<option value="ids">Id\lerini listele</option>'+
			'</select>'+
			'<a href="javascript:void(0);" class="uiButton" id="'+tag+'_start">Haydi bismillah..</a>'+
		'</div>';	
	function status(t){
		$i(tag+'_status').innerHTML = t;
	}
	function log(l){
		$i(tag+'_log').prependChild(l);
	}
	function $i(i){
		return document.getElementById(i);
	}
	function $c(c){
		return document.getElementsByClassName(c);
	}
	function getDocHeight(){
			var D = document;
		return Math.max(
			Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
			Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
			Math.max(D.body.clientHeight, D.documentElement.clientHeight)
		);
	}
	function scrollCheck(){
		if(document.getElementsByClassName('morePager').length > 0){
			var random = Math.floor((Math.random() * len));
			status(funs[random]);
			scrollTo(0,getDocHeight());
			setTimeout(scrollCheck,1500);
		}
		else{
			status('Gathering up inactives!');
			window[tag+'_close'] = false;
			gatherInactives();
		}
	}
	function gatherInactives(){
		if(!called){
			called = true;
			var ina = $c('uiImageBlockSmallContent');
			for(var i = 0,l = ina.length;i<l;i++){
				var a = ina[i].firstChild;
				var m;
				if(m = /inactive\/dialog\?id=([0-9]+)/.exec(a.innerHTML)){
					ids.push(m[1]);
					names[m[1]] = a.firstChild.innerHTML;
					tds.push(ina[i].parentNode.parentNode)
				}
				
			}
			switch (type){
				case 'auto':
					autoRemove();
					break;
				case 'sort':
					sortThem();
					break;
				case 'ids':
					listIDS();
					break;
				default: 
					listIDS();
			}
		}
	}
	function autoRemove(){
		if(!$i(tag+'_log')){
			$c('fbProfileBrowserListContainer')[0].innerHTML = '<div id="'+tag+'_log" style="text-align:center;"></div>';
		}
		if(ids.length > 0){
			var id = ids.shift();
			status('Su arkadasi sil '+names[id]+', Remaining: '+ids.length);
			removefriend(id);
		}
		else{
			status('Tamamdir!');
		}
	}
	function removefriend(id){
			var link = '//www.facebook.com/ajax/profile/removefriend.php?__a=1';
			var fbdtsg = document.getElementsByName('fb_dtsg')[0].value;
			var user = /"profile_owner":"([0-9]+)"/.exec(document.getElementById('pagelet_timeline_main_column').getAttribute("data-gt"))[1];
			var params = '__user='+user+'&fb_dtsg='+fbdtsg+'&norefresh=false&uid='+id;
			var req = new XMLHttpRequest();
			req.onreadystatechange = function(){
				if(req.readyState == 4){
					if(/has been removed from your friends/.test(req.responseText)) {
						var sp = document.createElement('span');
						sp.innerHTML = names[id]+' isimli arkadasi sildim. <br/>';
						log(sp);
						status('Siradakini silmek icin ugrasiyorum.');
						setTimeout(autoRemove,2000);
					}
					else{
						status('Sanki hata oldu '+names[id]+',isimli arkadaşta. Siradakini deniyorum..');
						var sp = document.createElement('span');
						sp.innerHTML = 'Bu arkadasi silerken sanki hata oldu.. '+names[id]+'<br/>';
						log(sp);
						setTimeout(autoRemove,2000);
					}
				}
			}
			req.open("POST", link, true);
			req.send(params); 
	}		
	function sortThem(){
		$c('fbProfileBrowserListContainer')[0].innerHTML = '<div class="profileBrowserGrid"><table id="'+tag+'_table" class="uiGrid mtl uiGridFixed" cellspacing="0" cellpadding="0"><tbody></tbody></div>';
		var t = $i(tag+'_table');
		var tl = tds.length;
		for(var i=0,len=Math.floor(tds.length/3);i<len;i++){
			var tr = document.createElement('tr');
			var a = (i*3);
			var b = (i*3)+1;
			var c = (i*3)+2;
			tr.appendChild(tds[a]);
			tr.appendChild(tds[b]);
			tr.appendChild(tds[c]);
			t.appendChild(tr);
		}
		var rem = tl%3;
		var tr = document.createElement('tr');
		for(var i=1;i<=rem;i++){
			tr.appendChild(tds[tl-i]);
		}
		t.appendChild(tr);
		status('Tamamdir!');
	}
	function listIDS(){
		$c('fbProfileBrowserListContainer')[0].innerHTML = '<textarea id="'+tag+'_ids" cols="200" rows="200"></textarea>';
		$i(tag+'_ids').value = ids.join('\n');
		status('Tamamdir!');
	}
	function createControl(){
		if (!$i(tag+'_con')) {
				var main = document.createElement('div');
					main.id = tag+'_con';
					main.setAttribute('style','position:relative;padding:10px;float:left;border:solid 1px black;width:350px;');
				var b = $c('stickyHeaderWrap')[0];
				b.insertBefore(main, b.lastChild);
		}
		$i(tag+'_con').innerHTML = ui;
		$i(tag+'_start').onclick=function(e){
			type = $i(tag+'_type').value;
			$i(tag+'_main').innerHTML = '<div style="text-align:center;">Not: <span id="'+tag+'_status">Kontrol ediliyor.....</span></div>';
			window[tag+'_close'] = true;
			scrollCheck();
		}	
	}
	createControl();
	window.onbeforeunload = function(){
		if(window[tag+'_close']){
			return 'Ben bu temizleme isini bitirmedim emin misin kapatmaya?';
		}
	}
	
})();
