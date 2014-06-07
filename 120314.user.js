// ==UserScript==
// @name           	More custom plurk emotes
// @author         	frank38
// @version        	0.3
// @namespace      	
// @description	   	display more plurk custom emotes at one time
// @include		   	*plurk.com/*

// ==/UserScript==
var E_ME = function() {
	var w = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow : window;
	init();
	
	function $(A) {
		return document.getElementById(A);
	};
	
	function setContent() {
		w.GB_showCenter(("More custom emotes" ),"",600,650);
		//div.iframe_holder
		
		var iframeHolder = document.getElementsByClassName('iframe_holder')[0];
		
		var div = document.createElement('div'); //main div
		var navDiv = document.createElement('div');
		div.id = 'pane_emote';
		div.className = 'plurkaction pane';
		div.setAttribute('style', 'padding: 10px 0pt 10px 0px;  background:#DDD; color:#000;');
		
		var select = document.createElement('select');
		select.id = 'e_prpage';
		for(i=10;i<=100;i+=10) {
			var op = document.createElement('option');
			op.value = i;
			op.appendChild(document.createTextNode(i));
			select.appendChild(op);
		}
		
		for(i=200;i<=1000;i+=100) {
			var op = document.createElement('option');
			op.value = i;
			op.appendChild(document.createTextNode(i));
			select.appendChild(op);
		}
		
		var curPage = document.createElement('input');
		curPage.id = 'e_current_page';
		curPage.size = '2';
		curPage.type = 'textbox';
		curPage.setAttribute('value','0');
		
		//button
		var btnPrev = document.createElement('input');
		btnPrev.id = 'e_query_prev';
		btnPrev.type = 'button';
		btnPrev.style.cursor = 'pointer';
		btnPrev.value = '\uff1c';
		btnPrev.className = 'orange-but';
		btnPrev.style.marginLeft = '3px';
		
		var btnNext = document.createElement('input');
		btnNext.id = 'e_query_next';
		btnNext.type = 'button';
		btnNext.style.cursor = 'pointer';
		btnNext.value = '\uff1e';
		btnNext.className = 'orange-but';
		btnNext.style.marginLeft = '3px';
		
		var result = document.createElement('ul');
		result.id = 'e_results';
		result.style.maxWidth = '600px';
		
		navDiv.innerHTML += 'Pics per page : ';
		navDiv.appendChild(select);
		navDiv.innerHTML += ' Current Page : ';
		navDiv.appendChild(curPage);

		//add.
		addDiv = document.createElement('div');
		
		addIcon = document.createElement('img');
		addIcon.style.paddingTop = '3px';
		addIcon.src = '';
		
		controlSpan = document.createElement('span');
		controlSpan.style.paddingLeft = '10px';
		controlSpan.style.cssFloat = 'right';
		
		addMsg = document.createElement('span');
		addMsg.id = 'e_msg';
		addMsg.style.paddingTop = '10px';
		addMsg.style.cssFloat = 'right';
		addMsg.style.clear = 'right';
		
		
		
		addKeyWord = document.createElement('input');
		addKeyWord.size = '10';
		addBtn = document.createElement('input');

		addBtn.className = 'orange-but';
		addBtn.value = 'Add';
		addBtn.type = 'button';
		addBtn.style.marginLeft = '3px';
		addDiv.id = 'e_add';
		
		addIconSpan = document.createElement('span');
		addIconSpan.style.height = '50px';
		addIconSpan.style.width = '50px';
		addIconSpan.style.cssFloat = 'left';
		addIconSpan.innerHTML += 'Icon : <br>';
		addIconSpan.appendChild(addIcon);
		addDiv.appendChild(addIconSpan);
		
		
		
		controlSpan.innerHTML += ' Keyword : ';
		controlSpan.appendChild(addKeyWord);
		controlSpan.appendChild(addBtn);
		controlSpan.appendChild(btnPrev);
		controlSpan.appendChild(btnNext);
		addDiv.appendChild(controlSpan);
		addDiv.appendChild(addMsg);
		
		navDiv.style.cssFloat = 'right';
		navDiv.style.padding = '10px 10pt 10px 10px';
		addDiv.style.cssFloat = 'left';
		addDiv.style.padding = '10px 10pt 10px 10px';
		result.style.clear = 'both';
		result.style.padding = '10px 20pt 10px 20px';
		//main
		div.appendChild(navDiv);
		div.appendChild(addDiv);
		div.appendChild(result);
		
		
		iframeHolder.innerHTML = '';
		iframeHolder.appendChild(div);

		btnPrev.addEventListener('click', function (){getContent('p');}, false);
		btnNext.addEventListener('click', function (){getContent('n');}, false);
		addBtn.addEventListener('click', function (){addEmote();}, false);
	};
	
	function getContent(f) {
		if(!$('pane_emote'))
			return;
		Str = 'http://www.plurk.com/EmoticonDiscovery/getHot';
		token = $('login_link').href.match(/token=(.+)/)[1];
		page = parseInt($('e_current_page').value);
		pr = $('e_prpage').value;
		if(page.toString().match(/[^0-9]/)) {
			alert('number only');
			return;
		}
		
		if(parseInt(pr) >= 100)
			if(!confirm('Get ' + pr + ' emotes at one time? Are you sure?'))
				return;
		if(f == 'n') {
			page += 1;
		} else if (f == 'p' && page != 1){
			page -= 1;
		}
		$('e_current_page').value = page.toString();
		Str = Str + '?form_token=' + token + '&page=' + page + '&pr_page=' + pr;
		$('e_results').innerHTML = '';
		getData(Str, token);
	}
	
	function addEmote() {
		keyword = $('e_add').getElementsByTagName('input')[0].value;
		img = $('e_add').getElementsByTagName('img')[0].src;
		hash = $('e_add').getElementsByTagName('img')[0].getAttribute('hash');
		token = $('e_add').getAttribute('token');
		url = 'http://www.plurk.com/EmoticonDiscovery/addEmoticon';
		url += '?form_token=' + token + '&hash_id=' + hash + '&keyword=' + keyword + '&url=' + img;
		var req = new XMLHttpRequest();
		req.open('POST', url, false);
		req.send(null);
		if(req.status == 200){
			msgSpan = $('e_msg');
			msgSpan.innerHTML = 'Done!';
			msgSpan.style.color = '#FF0000';
			window.setTimeout(function() {
				msgSpan.innerHTML = '';
			}, 2000);
		} else {
			msgSpan = $('e_msg');
			msgSpan.innerHTML = req.responseText;
			msgSpan.style.color = '#FF0000';
			window.setTimeout(function() {
				msgSpan.innerHTML = '';
			}, 5000);
		}
		
	}
	
	function getData(url, token) {
		var req = new XMLHttpRequest();
		req.open('GET', url, false);
		req.send(null);
		if(req.status == 200){
			obj = JSON.parse(req.responseText);
				html = '';
				for(var i in obj) {
					url = obj[i].url;
					hash = obj[i].hash_id;
					added = obj[i].added;
					if(!added) {
						var li = document.createElement('li');
						li.setAttribute('style','float:left; padding:2px; padding-bottom:8px; width:48px; height:48px;');
						if(i%10 == 0)
							li.setAttribute('style','float:left; padding:2px; padding-bottom:8px; width:48px; height:48px; clear:left;');
						var img = document.createElement('img');
						img.src = url;
						li.style.cursor = 'pointer';
						li.addEventListener('click', function (){
							$('e_add').setAttribute('token', token);
							$('e_add').getElementsByTagName('img')[0].src = this.childNodes[0].src;
							$('e_add').getElementsByTagName('img')[0].setAttribute('hash',hash);
						});
						/*
						li.addEventListener('mouseover', function (){
							this.style.border = '1px';
							//this.style.borderColor = '#DDFFDD';
							this.style.borderStyle = 'solid';
						});
						li.addEventListener('mouseout', function (){
							this.style.border = '0px';
							//this.style.borderColor = '#DDFFDD';
							this.style.borderStyle = 'solid';
						});
						*/
						li.appendChild(img);
						$('e_results').appendChild(li);
					}
				}
				var p = document.createElement('p');
				p.setAttribute('style','clear:both;');
				$('e_results').appendChild(p);
		} else {
			msgSpan = $('e_msg');
			msgSpan.innerHTML = 'Sorry, get some error...';
			msgSpan.style.color = '#FF0000';
			window.setTimeout(function() {
				msgSpan.innerHTML = '';
			}, 3000);
		}
	};
	
	function init() {
		tp = $('top_bar');
		if(!tp)
			return;
		td = tp.getElementsByClassName('content')[0];
		
		aItem = document.createElement('a');
		aItem.className = 'item';
		
		aSpan = document.createElement('span');
		aSpan.innerHTML = '<img src="http://static.plurk.com/static/icons/emoticon_mini_off.png"/>Emotes';
		aSpan.title = 'More custom emotes';
		aSpan.addEventListener('click', function (){setContent();}, false);
		
		aItem.appendChild(aSpan);
		
		td.appendChild(aItem);
	};
}
document.body.appendChild(document.createElement('script')).innerHTML = '(' + E_ME + ') ()';
