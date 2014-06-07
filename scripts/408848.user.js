// ==UserScript==
// @name JAVBLOG.ORG Script
// @namespace ...
// @description Reorganise the JAVBLOG.ORG website. Search torrents in NYAA and BITSNOOP. Inspired by hobby.
// @include http://javblog.org*
// @include http://javarchive.com*
// @include http://www.imagebam.com/image/*
// @include http://*imagebam.com/download/*
// @include http://*.imageporter.com/*.jpg*
// @include http://sukebei.nyaa.eu/?page=torrentinfo*
// @include http://www.avfantasy.com/product_lists.aspx?product_id=*
// @include http://www.avfantasy.com/subdept_products.aspx?*
// @include http://www.dmm.co.jp*
// @include http://www.hotavxxx.com/html*
// @include http://*imgchili.com/*.jp*g*
// @include http://*imagetwist.com/*.jpg*
// @include http://t66y.com*
// @include http://bfxzw.com*
// @include http://www.rmdown.com*

// @version 0.0.1
// @updateURL 
// @copyright Bluer
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.microsoft.com/ajax/jquery/jquery-1.4.2.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    //debugger;
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// 执行函数的入口
function main() {
	// 取文件名不带后缀
	function GetFileNameNoExt(filepath) {
		if (filepath != "") {
			var names = filepath.split("\\");
			var pos = names[names.length - 1].lastIndexOf(".");
			return names[names.length - 1].substring(0, pos);
		}
	}
	
	function urlfilename(a) {
		var n1 = a.lastIndexOf('/') + 1;
		var n2 = a.lastIndexOf('.');
		a = a.substring(n1, n2);
		return a;
	}
	
	function urljpgid(a) {
		var n1 = a.lastIndexOf('/');
		var n2 = a.lastIndexOf('/')-9;
		a = a.substring(n1, n2);
		return a;
	}
	
	// 获取全域名
	function getHostName(url) {
		// scheme : // [username [: password] @] hostame [: port] [/ [path] [?
		// query] [# fragment]]*/
		var e = new RegExp('^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)'), matches = e
				.exec(url);
	
		return matches ? matches[1] : url;
	}
	
	// 获取后缀域名
	function getLastName(webName) {
		var array = webName.split(".");
		if(array.length === 3)
		{
			var a = webName.indexOf('.');
			var lastName = webName.substring(a + 1, webName.length);
			return lastName;
		}
		else if(array.length === 2)
		{
			return webName;
		}
	}
	
	// 获取AV片编码   num:拼接个数
	function getAVCode(url,num) {
		var array = url.split('/');
		var s = array[array.length-2];
		var code_array = s.split('-');
		if(num === 2){
			return code_array[0]+'-'+code_array[1];
		}
		else if(num === 3){
			return code_array[0]+'-'+code_array[1]+'-'+code_array[2];
		}
		else{
			return code_array[0]+'-'+code_array[1];
		}
	}
	
	function getAVCodeToSearch(url,num) {
        var midPatt = /[a-z]+-[0-9]+/i;
        var keyword = "";
        if ( midPatt.test(url) ) {
            // Matches the movie ID like IPTD-001
            var matches = midPatt.exec(url);
            keyword = matches[0];
        } else {
            var segs = url.split('/');
            keyword = segs[segs.length - 2];
        }// if
        console.debug("Key word: " + keyword);
        return keyword.replace(/-/g, " "); // Get rid of the "-" to fit search engines
	}
	
	function showImg(i){
		url = i.src;
		width = i.width;
		height = i.height;
		var imgid = Math.random(),
		frameid = 'frameimg' + imgid;
		window['img'+imgid] = '<img id="img" src=\''+url+'?hobby\' />' +
				'<script>window.onload = function() {' +
				' parent.document.getElementById(\''+frameid+'\').height = document.getElementById(\'img\').height+\'px\'; ' +
				' parent.document.getElementById(\''+frameid+'\').width = document.getElementById(\'img\').width+\'px\'; ' +
				'}<'+'/script>';
		img_r = '<iframe id="'+frameid+'" src="javascript:parent[\'img'+imgid+'\'];" frameBorder="0" height="' +height+ '" scrolling="no" width="'+width+'"></iframe>';
		$(i).replaceWith(img_r);
	}
	
	function showImg2(i){
		url = i.src;
		width = 1280;
		height = 2691;
		var imgid = Math.random(),
		frameid = 'frameimg' + imgid;
		window['img'+imgid] = '<img id="img" src=\''+url+'?hobby\' />' +
				'<script>window.onload = function() {' +
				' parent.document.getElementById(\''+frameid+'\').height = document.getElementById(\'img\').height+\'px\'; ' +
				' parent.document.getElementById(\''+frameid+'\').width = document.getElementById(\'img\').width+\'px\'; ' +
				'}<'+'/script>';
		img_r = '<iframe id="'+frameid+'" src="javascript:parent[\'img'+imgid+'\'];" width="'+width+'" height="' +height+ '" frameBorder="0" scrolling="no" border="0" marginwidth="0" marginheight="0"></iframe>';
		$(i).replaceWith(img_r);
	}
	
	function add_search_link(Element,av_code,av_code_s){
		var search = document.createElement('a');
	    search.href = 'http://sukebei.nyaa.eu/?page=search&cats=0_0&filter=0&term=' + av_code_s;
	    search.target = '_blank';
	    $(search).css('color','red');

	    search.appendChild(document.createTextNode(decodeURIComponent(av_code) + ' in nyaa Torrent')); 
	    Element.appendChild(search);
	    
	    Element.innerHTML = Element.innerHTML + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	    
	    var search = document.createElement('a');
	    search.href = 'http://bitsnoop.com/search/all/' + av_code_s;
		search.target = '_blank';
		$(search).css('color','red');
		search.appendChild(document.createTextNode(decodeURIComponent(av_code) + ' in bitsnoop Torrent')); 
		Element.appendChild(search);
		
		Element.innerHTML = Element.innerHTML + '<br>';
	    
	    var search = document.createElement('a');
	    search.href = 'http://www.dmm.co.jp/search/=/searchstr=' + av_code_s + '/';
	    search.target = '_blank';
	    $(search).css('color','red');
	    search.appendChild(document.createTextNode(decodeURIComponent(av_code) + ' in dmm.co.jp')); 
	    Element.appendChild(search);
		
		Element.innerHTML = Element.innerHTML + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
		
		var search = document.createElement('a');
	    search.href = 'http://www.baidu.com/s?wd=' + av_code;
	    search.target = '_blank';
	    $(search).css('color','red');
	    search.appendChild(document.createTextNode(decodeURIComponent(av_code) + ' in baidu.com')); 
	    Element.appendChild(search);
	    
	    Element.innerHTML = Element.innerHTML + '<br>';
	    
	    var search = document.createElement('a');
	    search.href = 'http://www.google.co.jp/search?hl=ja&q=' + av_code;
	    search.target = '_blank';
	    $(search).css('color','red');
	    search.appendChild(document.createTextNode(decodeURIComponent(av_code) + ' in google.jp')); 
	    Element.appendChild(search);
	    
	    return Element;
	}
	
	function getCookie(name) {
		var start = document.cookie.indexOf(name + "=");
		var len = start + name.length + 1;
		if ((!start) && (name != document.cookie.substring(0, name.length))) {
			return null;
		}
		if (start == -1)
			return null;
		var end = document.cookie.indexOf(';', len);
		if (end == -1)
			end = document.cookie.length;
		return unescape(document.cookie.substring(len, end));
	} 
	
	function setCookie(name, value, expires_days, domain, path, secure) {
		var today = new Date();
		today.setTime(today.getTime());
		var expires;
		if (expires_days) {
			expires = expires_days * 1000 * 60 * 60 * 24;
		}
		var expires_date = new Date(today.getTime() + (expires));
		document.cookie = name + '='
				+ escape(value)
				+ ((expires) ? ';expires=' + expires_date.toGMTString() : '')
				+ // expires.toGMTString()
				((path) ? ';path=' + path : '')
				+ ((domain) ? ';domain=' + domain : '')
				+ ((secure) ? ';secure' : '');
	}
	
	function deleteCookie(name, domain, path) {
		if (getCookie(name))
			document.cookie = name + '=' + ((path) ? ';path=' + path : '')
					+ ((domain) ? ';domain=' + domain : '')
					+ ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
	} 
	
	function addSearchAvLink(imgObj,av_code,av_name){
		
		var div = document.createElement('div');
		div.id = "hobbyp0";
		av_code_s = av_code.replace('-',' ');
		div = add_search_link(div,av_code,av_code_s);
		
		div.innerHTML = div.innerHTML + '<br>';
		var p = document.createElement('p');
		$(p).css('color','blue');
		$(p).text("文件名 : " + decodeURIComponent(av_name));
		div.appendChild(p);
		
		$(div).css("font-size","12px");
		$(div).css("font-family","Verdana,Arial,Helvetica,sans-serif");
		
		document.body.appendChild(div);
		if(getUrl().indexOf('http://www.imagebam.com/image/') > -1 ){
			$("#hobbyp0").insertBefore("#banner_top");
		}
		else
		{
			$(imgObj).insertAfter("#hobbyp0");
		}
		$(document).attr("title",decodeURIComponent(av_name));
	}
	
	function getUrl(){
		var url = location.href;
		var n = url.lastIndexOf('/') + 1;
		url = url.substring(0, n);
		return url;
	}
    
	//debugger;
    var detlPgPatt = new RegExp("http://javblog.org/[0-9]{4}/[0-9]{2}/[0-9]{2}/.*[-].*", "i");
    var currUrl = location.href;
	if ( detlPgPatt.test(location.href) ) {
		// In the detail page. Reorganise it.
		$($(".all").get(0)).css('width','100%');
		//DIV移到最左边
		$($(".menu1").get(0)).css('float','left');
		//sidebarDIV插到contentDIV的前面
		//$(".sidebar").insertBefore("div[class='content']");
		$("div[class='content']").insertAfter(".sidebar");
		//正文宽度减去sidebarDIV的宽度
		var Width = document.documentElement.clientWidth - 223;
		//重置contentDIV的宽度
		$($(".content").get(0)).css('width','100%');
		//调整contentDIV内的内容顺序
		$(".box1")[0].id = 'hobby0';
		$($(".box1")[6]).insertAfter("#hobby0");
		$($(".box2")[0]).insertAfter("#hobby0");
		var $a_uncensored = $($("a[href='http://javblog.org/about/']")[0]);
		var $a_censored = $($("a[href='http://javblog.org/jav-blog/']")[0]);
		$a_uncensored.text("| 无码片");
		$a_uncensored.attr("href","http://javblog.org/category/jav-uncensored/");
		$a_censored.text("| 有码片");
		$a_censored.attr("href","http://javblog.org/category/jav-censored/");
		
		var $search_div = $(document.createElement("div"));
		$search_div.attr("class","menu2");
		$search_div.css('float','right');
		$search_div.append($("#searchform"));
		$($(".menu1")[0]).append($search_div);
		$($(".sidebar").get(0)).remove();		
		$($("input[id='s']")[0]).css('vertical-align','top');
			
		array_1 = $("a[rel='bookmark']"); //片数
		array_2 = $(".posttext");  //
		for (var index = 0; index < array_1.length; index++) {//
			//TODO:foreach:1
			var a1 = array_1[index];
			var a2 = array_2[index];
			var av_code = getAVCode(a1.href,2);
			if(av_code === 's-cute' || av_code === 'tokyo-hot'){
				var av_code = getAVCode(a1.href,3);
				var av_code_s = getAVCodeToSearch(a1.href,3);
			}
			else{
				var av_code_s = getAVCodeToSearch(a1.href,2);
			}
			
			var $hobbyimgF = $(a2.firstElementChild.firstElementChild);
			$hobbyimgF.attr("id","hobbyimgF"+index);
			$hobbyimgF.attr("width","800");
			
			a2.firstElementChild.id = 'hobbyp0'+index;
			a2.firstElementChild.avcd = av_code;
			a2.firstElementChild.av_name = $(a1).text();
			
			var p = document.createElement('p');
			p.id = "hobbyp1"+index;
			
			p = add_search_link(p,av_code,av_code_s);
		    a2.appendChild(p);
		    
		    $("#hobbyp1"+index).insertAfter("#hobbyp0"+index);
		    var $p_text = $($("#hobbyp1"+index).next()[0]);
		    $($p_text).insertAfter("#hobbyimgF"+index);
		    //debugger;
		}
		
		var img_array = $("a[rel='nofollow'] img");
		for (var index = 0; index < img_array.length; index++) {//
			//TODO:foreach:2
			var img = img_array[index];
			var div_posttext = $(img).parents(".posttext")[0];
			var av_cd = div_posttext.firstElementChild.avcd;
			var av_name = div_posttext.firstElementChild.av_name;

			if (img.className !== 'fade') {
				var web_name = getHostName(img.src);
				var lastName = getLastName(web_name);
				if (lastName === 'imagebam.com') {
					//TODO:javblog:imagebam.com
					var jpg_name = urlfilename(img.src);
					var jpg_id = jpg_name.substring(jpg_name.length-9,jpg_name.length);
					var url = 'http://www.imagebam.com/image/' + jpg_name  + "??$@" + av_cd + "?$@" + av_name;
					img.parentElement.href = url;
					img.parentElement.id = "href"+ jpg_id;
					
					var $iframe = $(document.createElement("IFRAME"));  
					$iframe.attr("id","iframe"+jpg_id);
					$iframe.attr("frameborder", 1);  
					//$iframe.attr("scrolling", undefined === scrolling ? "no" : scrolling);  
					$iframe.attr("width", "910");  
					$iframe.attr("height", "220");
					$iframe.attr("src", 'http://www.imagebam.com/image/' + jpg_name);
					
					$(img.parentElement).append($iframe);

					var $br = $(document.createElement('br'));
					$(img.parentElement).append($br);
					$(img).css("vertical-align","top");
				}
				else if(lastName === 'imageporter.com'){
					img.parentElement.href = img.src.replace('_t','') + '??$@' + av_cd + "?$@" + av_name;
				}
				else if(lastName === 'imgchili.com'){
					img.parentElement.href = "http://imgchili.com/theme/images/hotlink.png?" + img.src.replace('/t','/i');
				}
				else if(lastName === 'imagetwist.com'){
					var img_url = img.src.replace('/th','/i');
					img.parentElement.href = 'http://imagetwist.com/error.jpg?' + img_url + "?$@" + av_cd + "?$@" + av_name;
					var jpg_id = urlfilename(img_url);
					//img.parentElement.id = "href"+ jpg_id;
					var $iframe = $(document.createElement("IFRAME"));
					$iframe.attr("id","iframe"+jpg_id);
					$iframe.attr("width", "910");  
					$iframe.attr("height", "220");
					$iframe.attr("src", 'http://javblog.org/wp-content/themes/dum-dum/images/search-button.jpg?' + img.src.replace('/th','/i') + "##@");
					$(img.parentElement).append($iframe);

					var $br = $(document.createElement('br'));
					$(img.parentElement).append($br);
					$(img).css("vertical-align","top");
				}
				img.parentElement.target = '_blank';
			}
		}
	}

	else if(getLastName(location.hostname) === 'imageporter.com'){
		var img = document.body.getElementsByTagName("img")[0];
		var img_url = location.search.substring(1,location.search.length);
		addSearchAvLink(img,img_url.split("?$@")[1],img_url.split("?$@")[2]);
		showImg2(img);
	}
	
	else if(location.hostname === 'imagetwist.com'){
		var img = document.body.getElementsByTagName("img")[0];
		var img_url = location.search.substring(1,location.search.length);
		img.src = img_url;
		if(location.href.indexOf('##@') <= -1){
			addSearchAvLink(img,img_url.split("?$@")[1],img_url.split("?$@")[2]);
		}
		showImg2(img);
	}
	
	else if(location.hostname === 'imgchili.com'){
		var img = document.body.getElementsByTagName("img")[0];
		var img_url = location.search.substring(1,location.search.length);
		img.src = img_url;
		showImg2(img);
		scaleonload();
	}
	
	else if(location.href.indexOf('javblog.org/wp-content/themes/dum-dum/images/search-button.jpg?') > -1){
		//TODO:search-button.jpg
		var img = document.body.getElementsByTagName("img")[0];
		var url = location.search.substring(1,location.search.length);
		img.src = url;
		var jpg_id;
		
		if(url.indexOf('imagebam.com') > -1){
			jpg_id = urljpgid(url);
		}
		else{
			jpg_id = urlfilename(url);
		}
		
		width = 1280;
		height = 2691;
		var imgid = Math.random(),
		frameid = 'frameimg' + imgid;
		window['img'+imgid] = '<img id="img" src=\''+url+'?hobby\' />' +
				'<script>window.onload = function() {' +
				' parent.document.getElementById(\''+frameid+'\').height = document.getElementById(\'img\').height+\'px\'; ' +
				' parent.document.getElementById(\''+frameid+'\').width = document.getElementById(\'img\').width+\'px\'; ' +
				' parent.parent.document.getElementById(\'iframe'+jpg_id+'\').height = document.getElementById(\'img\').height+\'px\'; ' +
				' parent.parent.document.getElementById(\'iframe'+jpg_id+'\').width = document.getElementById(\'img\').width+\'px\'; ' +
				'}<'+'/script>';
		img_r = '<iframe id="'+frameid+'" src="javascript:parent[\'img'+imgid+'\'];" width="'+width+'" height="' +height+ '" frameBorder="0" scrolling="no" border="0" marginwidth="0" marginheight="0"></iframe>';
		$(img).replaceWith(img_r);
	}
	else if(location.href.indexOf('www.imagebam.com/image/') > -1){
		//TODO:imagebam.com/image/
		if(location.href.indexOf('??$@') > -1){//独立页签打开的情况
			var b_array = $("img[onclick='scale(this);']");
			
			var img = document.body.getElementsByTagName("img")[0];
			var img_url = location.search.substring(1,location.search.length);
			addSearchAvLink(img,img_url.split("?$@")[1],img_url.split("?$@")[2]);
			scaleonload();
		}
		else
		{//iframe打开情况
			var jpg_id = location.pathname.substring(location.pathname.length-9,location.pathname.length);
			var $jpg_id = $("#i"+jpg_id);
			var img_src = $jpg_id.attr("src");
			var img_pEle = $jpg_id[0].parentElement;
			//$jpg_id.remove();
			$jpg_id.attr("src","");
			
			var $iframe = $(document.createElement("IFRAME"));  
			$iframe.attr("width", "0");  
			$iframe.attr("height", "0");
			$iframe.attr("src", "http://javblog.org/xmlrpc.php?"+img_src.replace(/\./g,"%%"));
			
			$(img_pEle).append($iframe);
			scaleonload();
		}
		

	}
	else if(location.href.indexOf('javblog.org/xmlrpc.php') > -1){
		//TODO:javblog.org/jav-blog
		var jpg_id = urljpgid(location.search);
		var av_cd =$('#href'+jpg_id, window.parent.parent.document).get(0).parentElement.avcd;
		var av_name = $('#href'+jpg_id, window.parent.parent.document).get(0).parentElement.av_name;
		var href = location.search.substring(1,location.search.length).replace(/\%\%/g,".");
		$('#href'+jpg_id, window.parent.parent.document).attr("href","http://imagetwist.com/error.jpg?" + href + '??$@' + av_cd + "?$@" + av_name);
		
		var $hobbyimgN = $($('#href'+jpg_id, window.parent.parent.document).get(0).firstElementChild);
		
		//$hobbyimgN.src = href;
		$iframe = $('#iframe'+jpg_id, window.parent.parent.document);
		$iframe.attr("src", "");//释放资源
		$iframe.attr("src", "http://javblog.org/wp-content/themes/dum-dum/images/search-button.jpg?" + href);
		
	}
	
	else if (location.hostname === "javarchive.com"){
		var img_array = $(".post-content p a img");
		for (var index = 0; index < img_array.length; index++) {
			var img = img_array[index];
			img.src = img.src.replace('_thumb.png','.jpg');
			img.parentElement.href = img.src;
			img.parentElement.target = '_blank';
		}
	}
	
	else if(location.hostname === "sukebei.nyaa.eu"){
		var b_array = $("img[alt='Image']");
		//debugger;
		for (var index = 0; index < b_array.length; index++) {
			var a = b_array[index];
			var lastName = getLastName(getHostName(a.src));
			//a.parentElement.href = '#';
			if (lastName === 'imagetwist.com') {//防盗链，显示异常
					a.parentElement.target = '_blank';
					a.src = a.src.replace('th','i');
					showImg(a);
			}
			else if(lastName === 'imageporter.com' || lastName === 'imagekitty.com'|| lastName === 'imagecherry.com'){
				a.src = a.src.replace('_t','');
				showImg(a);
			}
			else if(lastName === 'imgchili.com'){
				if(a.src.indexOf("pl.jpg") > 0){
					a.src = a.src.replace('/t','/i');
					showImg(a);
				}
				else{//防盗链，显示异常
					a.parentElement.target = '_blank';
					//a.parentElement.href = "http://imgchili.com/theme/images/hotlink.png?" + a.src.replace('/t','/i');
				}
			}
			else if(lastName === 'imgrill.com' || lastName === 'imgonion.com'){
				a.src = a.src.replace('/small','/big');
				showImg(a);
			}
		}
	}
	
	else if(location.hostname === "www.avfantasy.com"){
		(function ($) {
	  		//debugger;
			var div = $(".TabbedPanelsContentGroup div")[0];
			var src = $("div[class='list-cover'] img")[0].src;
			var fileName = urlfilename(src);
			var av_code = fileName.replace('DVD1','');
			
			var a = document.createElement('a');
		    a.href = '#title';
		    var img = document.createElement('img');
		    img.src = 'http://imgs02.avfantasy.com/new/screen_shot/' + fileName + '.jpg';
		    img.border = '0';
		    a.appendChild(img);
		    
		    $(div).prepend(a);
		    
		    var a_array = $(".list-cover a");
		    for (var index = 0; index < a_array.length; index++) {
		    	var a1 = a_array[index];
		    	a1.target = '_blank';
		    }
		})(jQuery);
	}

	else if(location.hostname === "www.hotavxxx.com"){
		var img_array = $("img[src*='imgchili.com']");
		for (var index = 0; index < img_array.length; index++) {
			var img = img_array[index];
			img.parentElement.href = "http://imgchili.com/theme/images/hotlink.png?" + img.src.replace('/t','/i');
		}
	}
	
	else if(location.hostname === "t66y.com"){
		var img_array = $("img[align='absmiddle']");
		for (var index = 0; index < img_array.length; index++) {
			var img = img_array[index];
			var a = img.parentElement;
			a.href = a.href.replace('http://www.viidii.com/?','').replace(new RegExp('______',"gm"),'.');
		}
		var img_array = $("img[align='top']");
		for (var index = 0; index < img_array.length; index++) {
			var img = img_array[index];
			var a = img.parentElement;
			a.href = a.href.replace('http://www.viidii.com/?','').replace(new RegExp('______',"gm"),'.');
		}
	}
	
	else if(location.hostname === "bfxzw.com"){
		$("#immeI").remove();
		$("form").removeAttr("onsubmit");
	}
	
	else if(location.hostname === "www.rmdown.com"){
		$($("input[type='submit']")[0]).removeAttr("onclick");
	}
	
	else if(location.hostname === "www.dmm.co.jp"){				
		//debugger;
		if($("li[class='first'] a")[0]){
			$("li[class='first'] a")[0].href = "http://www.dmm.co.jp/top/";
		}
		$("#welcome").remove();
	}	
}

// load jQuery and execute the main function
addJQuery(main);