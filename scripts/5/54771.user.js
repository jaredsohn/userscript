// ==UserScript==
// @name           Nexus Overhaul
// @namespace      http://userscripts.org/users/99461
// @description    Changes to layout and features on Nexus pages
// @include        http://*fallout3nexus.com/*
// @include        http://*tesnexus.com/*
// @include        http://*dragonagenexus.com/*
// @include        http://*thenexusforums.com/*
// ==/UserScript==


function embedScript(str) {
	document.body.appendChild(document.createElement('script')).innerHTML=str.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

function embedFunction(s) {
	document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

function createElement(type, attributes){
	var node = document.createElement(type);
		for (var attr in attributes) if (attributes.hasOwnProperty(attr)){
		node.setAttribute(attr, attributes[attr]);
	}
	return node;
}

function next(elem) {
    do {
        elem = elem.nextSibling
    } while (elem && elem.nodeType != 1);
    return elem
}

function getFirstChild(e){
	var c = e.firstChild;
	if(c && c.nodeType != 1){ return c.nextSibling;}
	else{ return c;}
}

// this.getFirstChild = function() {
	// var c = this.firstChild;
    // do {
        // c = c.nextSibling;
    // } while (c && c.nodeType != 1);
    // return c;
// };


//embedFunction("function next(elem){do{elem=elem.nextSibling}while(elem&&elem.nodeType!=1);return elem}");
// function next(elem) {
    // do {
    	// elem = elem.nextSibling;
    // } while (elem && elem.nodeType != 1);
    // return elem;		
// }

//embedFunction("function vcardShow(e){var ev=document.createEvent('MouseEvents');ev.initEvent('click',true,true);var n=next(e);n.dispatchEvent(ev)}");
// function vcardShow(e){
	// var ev = document.createEvent('MouseEvents');
	// ev.initEvent('click', true, true);
	// var n = next(e);
	// n.dispatchEvent(ev);
// }
//embedFunction("function vcardHide(e){alert(this);var u=this.href.match(/=\d+/);document.getElementById('popup_'+u+'_user_popup').style.display='none'}");
//embedFunction("function vcardHide(e){var ev=document.createEvent('MouseEvents');ev.initEvent('click',true,true);document.body.dispatchEvent(ev)}");
// function vcardHide(e){
	// var ev = document.createEvent('MouseEvents');
	// ev.initEvent('click', true, true);
	// this.dispatchEvent(ev);
// }
	// var u = this.href.match(/=\d+/);
	// document.getElementById('popup_' + u + '_user_popup').style.display = 'none';
// }
document.createStyleSheet = function(sValue){ var o = this.createElement("style"); o.type = "text/css"; o.innerHTML = sValue; this.getElementsByTagName("head")[0].appendChild(o); };

function applyStyleSheet(){
	var cat_width = 190;
	var aCSS = [];
	//aCSS.push("body { font-family: 'Lucida Sans Unicode', Calibri; } ");
	aCSS.push(".right_side li { line-height : 14px; font-size: 0.9em; } ");
	aCSS.push("#top { height : auto; margin-bottom : 0px; }");
	//aCSS.push("div#top>div.content>a>img { height : 60px; }");
	aCSS.push(".title_img1 { height : 60px; }");
	aCSS.push("#topbar { height : 25px; }");
	aCSS.push("#topbar #icons { margin : 5px; }");
	aCSS.push(".url {padding : 5px 0; }");
	aCSS.push(".image_desc { font-size: 0.89em; height: 40px;}");
	aCSS.push(".cat_desc_block { font-size: 0.8em; height: 48px; display: none; }");
	if(document.baseURI.match(/.members.videos.php/)){aCSS.push(".cat_fname { height: 56px; }");}
	else{aCSS.push(".cat_fname { height: 26px; }");}
	aCSS.push(".cat_fname h2 { font : bold 1em Arial, Sans-Serif !important; letter-spacing: 0px; margin: 0 0 0 0; }");
	aCSS.push(".cat_fname>h2>a { white-space: nowrap; text-overflow: ellipsis; }");
	aCSS.push(".cat { width: " + cat_width + "px; min-height: 0px !important}");
	aCSS.push(".file_image { width: " + cat_width + "px; }");
	aCSS.push(".cat_heading { width: " + (cat_width - 5) + "px; margin: 5px 0 5px 0; }");
	aCSS.push(".cat_top { width: " + cat_width + "px; }");
	aCSS.push(".files_info_heading { width: " + (cat_width - 5) + "px; }");
	aCSS.push(".cat_att { height: 20px !important; clear: both;}");
	aCSS.push(".right_side .pad { padding : 0 0 5px 5px; }");
	aCSS.push(".right_side h3 { height : 20px; padding-top : 5px; margin: 0 0 2px 0; text-indent : 10px; }");
	//aCSS.push(".right_side  { width: 165px; }");
	aCSS.push(".nav_seperator { width: 80%; text-align: left;  padding-bottom: 4px;  margin-bottom: 4px; }");
	aCSS.push(".right_side ul { padding : 0px 0 5px 5px; }");
	//aCSS.push("#right { width: 360px; }");
	//aCSS.push("#left_side { margin-bottom : 10px; margin-right: 0px; margin-left: 10px; }");
	aCSS.push("div.content>form>select { width: 175px; }");
	aCSS.push("div.content>form>input { margin: 2px 0 2px 0; }");
	aCSS.push(".buttons { height: 20px; }");
	aCSS.push(".cats_cat { width: 250px; float: left; margin-right: 25px; margin-bottom: 0px; }");
	aCSS.push(".cats_cat>h3 { margin : 0 0 7px 0; font-size: 0.8em ; }");
	aCSS.push("h3 { margin : 0 0 9px; }");
	aCSS.push(".box img {vertical-align: top;}");
	aCSS.push(".files_info img {vertical-align: top;}");
	
	//Tracking Centre
	aCSS.push(".track { padding: 15px 10px 32px; width: 92%; }");
	aCSS.push("div.track>a>img.img_np { margin-left: 10px; }");
	aCSS.push(".track_log { height: auto; }");
	aCSS.push(".list_content { height: auto; }");
	
	//Top Lists
	//aCSS.push(".box { height: auto; background-color: #414141; border: 1px solid #313131; padding: 5px; overflow: auto; vertical-align: middle; }");
	
	//Profile Page
	aCSS.push(".profile_left { float: left; width: 115px; font-weight: bold; height: auto; margin-bottom: 0px; text-align: right; padding-right: 6px; }");
	aCSS.push(".actions { width: 165px !important;}");
	
	//aCSS.push("div.content>form { line-height: 200%; }");
	
	//New CSS
	aCSS.push(".vspacer1 {height: 12px;}");
	//FotM Page
	aCSS.push(".fotm_row {display: table-row; height: 36px;}");
	aCSS.push(".fotm_num {font-size: 32px; font-weight: bold; color: #D0EB55; padding: 0px 10px 0px 5px; margin-right: 15px; display: table-cell; vertical-align: middle;}");
	aCSS.push(".fotm_txt {display: table-cell; vertical-align: middle;}");
	aCSS.push(".fotm_txt>img {vertical-align: top;}");
	aCSS.push(".fotm_past_row {height: 14px; padding: 5px 0px; clear: left;}");
	aCSS.push(".fotm_past_name {float: left; padding-right: 15px; width: 40%;}");
	aCSS.push(".fotm_past_auth {float: left; padding-right: 15px; width: 23%;}");
	aCSS.push(".fotm_past_vote {float: left; padding-right: 5px;}");
	//Top Lists
	//aCCS.push(".toplist_header {float: left; padding-right: 15px;}");
	
	document.createStyleSheet(aCSS.join("\n"));
}

var baseDomain = document.baseURI.match(/http:\/\/[^\/]+.com\//);
//alert(baseDomain);

if(!(document.baseURI.match(/modules.members.images.php/)) && !(document.baseURI.match(/downloads\/file\/images.php/)) && !(document.baseURI.match(/thenexusforums.com/))){
	//resize title images
	var expr = "/html/body/div[2]/div/a/img";
	var result = document.evaluate(expr, document, null, 7, null);
	var e = result.snapshotItem(0);
	e.className = "title_img1";
}

// if(document.baseURI.match(/thenexusforums.com\/index.php/)){
	// var vcard = document.getElementsByClassName('author vcard');
	// for (var i = 0; i < vcard.length; i++){
		// //vcard[i].innerHTML = vcard[i].innerHTML.replace(/">/m, "\" onmouseover='vcardShow(this)' onmouseout='vcardHide(this)'>");
	// }
// }

//all thenexusforums.com pages
// if(document.baseURI.match(/thenexusforums.com/)){
	// var e = createElement('script', {type: 'text/javascript', src: 'http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js'});
	// document.getElementsByTagName('head')[0].appendChild(e);
	// embedFunction('$(document).ready(function(){$("#primary_nav").find("ul").clone().appendTo("#primary_nav")});');
// }

//thenexusforums.com Profile Pages
if(document.baseURI.match(/thenexusforums.com\/index.php\?showuser/)){
	var uid = document.baseURI.replace(/.*=(\d+)/, "$1");
	//personal_info clear general_box alt
	var expr = "//div[@class='personal_info clear general_box alt']/ul";
	var result = document.evaluate(expr, document, null, 7, null);
	var ul = result.snapshotItem(0);
	var li = createElement('li');
	var a = createElement('a', {href: 'http://www.fallout3nexus.com/modules/members/index.php?id=' + uid, title: 'Fallout 3 Nexus Profile'});
	var img = createElement('img', {src: 'http://www.fallout3nexus.com/images/global/icon.gif'});
	a.appendChild(img);
	a.innerHTML = a.innerHTML.replace(/(.+)/, "$1" + " Fallout 3 Nexus profile");
	li.appendChild(a);
	ul.appendChild(li);
	
	var li = createElement('li');
	var a = createElement('a', {href: 'http://www.tesnexus.com/modules/members/index.php?id=' + uid, title: 'TES Nexus Profile'});
	var img = createElement('img', {src: 'http://www.tesnexus.com/images/global/icon.gif'});
	a.appendChild(img);
	a.innerHTML = a.innerHTML.replace(/(.+)/, "$1" + " TES Nexus profile");
	li.appendChild(a);
	ul.appendChild(li);
	
	var li = createElement('li');
	var a = createElement('a', {href: 'http://www.dragonagenexus.com/modules/members/index.php?id=' + uid, title: 'Dragon Age Nexus Profile'});
	var img = createElement('img', {src: 'http://www.dragonagenexus.com/images/global/icon.gif'});
	a.appendChild(img);
	a.innerHTML = a.innerHTML.replace(/(.+)/, "$1" + " Dragon Age Nexus profile");
	li.appendChild(a);
	ul.appendChild(li);
}

//fallout3nexus.com, tesnexus.com, and dragonagenexus.com Profile Pages
if(document.baseURI.match(/.com\/modules\/members\/index.php\?id=/)){
	var uid = document.baseURI.replace(/.*=(\d+)/, "$1");
	//add user imageshare page link
	var box = document.getElementsByClassName('box');
	// var expr = "//div[@class='box'][2]";
	// var result = document.evaluate(expr, document, null, 7, null);
	// var div1 = result.snapshotItem(0);
	box[1].style.width = '162px';
	var div = createElement('div', {class: 'actions'});
	var a = createElement('a', {href: '/modules/members/images.php?id=' + uid + '&orderby=date&order=DESC'});
	var img = createElement('img', {src: '/images/icons/photo.png'});
	var t = document.createTextNode(" View user images");
	a.appendChild(img);
	a.appendChild(t);
	div.appendChild(a);
	box[1].appendChild(div);
	// var w = document.getElementById('left_side').style.width;
	// alert(document.getElementById('left_side').style.width);
	// box[0].style.width = (w - 162) + "px";
	//box[0].style.width = "600px";
	
//	div1.previousSibling.style.width = div1.parentNode.style.width;
}

//fallout3nexus.com and tesnexus.com single image pages
if(document.baseURI.match(/.com\/imageshare\/image.php\?id=/)){
	var expr = "//div[@class='files_info'][1]/a";
	var result = document.evaluate(expr, document, null, 7, null);
	var ulink = result.snapshotItem(0);
	var uid = ulink.href.replace(/.*=(\d+)/, "$1");
	//add user imageshare page link
	var expr = "//div[@class='files_info'][1]";
	var result = document.evaluate(expr, document, null, 7, null);
	var div = result.snapshotItem(0);
	var img = createElement('img', {src: '/images/icons/photo.png'});
	var a = createElement('a', {href: '/modules/members/images.php?id=' + uid + '&orderby=date&order=DESC'});
	var t = document.createTextNode(" View all user images");
	a.appendChild(img);
	a.appendChild(t);
	div.appendChild(createElement('br'));
	div.appendChild(createElement('br'));
	div.appendChild(a);
	
	var left_side = document.getElementById('left_side');
	var file_info_parent = div.parentNode;
	file_info_parent.style.width = '220px';
	var new_file_info_parent = createElement('div', {id: 'newdiv', style: 'float: left; width: 220px;'});
	file_info_parent.parentNode.insertBefore( new_file_info_parent, file_info_parent.nextSibling );
	var files_info = document.getElementsByClassName('files_info');
	new_file_info_parent.appendChild(files_info[1]);
	new_file_info_parent.appendChild(files_info[1]);
}

//fallout3nexus.com and tesnexus.com Image share pages
//add Description toggle
if(document.baseURI.match(/.com\/imageshare\//) && !(document.baseURI.match(/.com\/imageshare\/image.php/))){
	var expr = "/html/body/div[3]/div/div[2]/div";
	var result = document.evaluate(expr, document, null, 7, null);
	var div1 = result.snapshotItem(0);
	var img = createElement('img', {src: '/images/icons/page_white_text.png'});
	var span = createElement('span', {onclick: 'javascript: ToggleDesc()', style: 'cursor: pointer;', id: 'ToggleDesc', title: 'Show Descriptions'});
	var t = document.createTextNode(" Show Descriptions");
	span.appendChild(img);
	span.appendChild(t);
	div1.appendChild(createElement('br'));
	div1.appendChild(createElement('br'));
	div1.appendChild(span);

	var script = createElement('script', {type: 'text/javascript'});
	var s = 'function ToggleDesc(){';
	s = s + 'var imageDesc = document.getElementsByClassName("image_desc");';
	s = s + 'if(document.getElementById("ToggleDesc").title=="Show Descriptions"){';
	s = s + 'for (var i = 0; i < imageDesc.length; i++){';
	s = s + '$("div.image_desc").show("slow");';
	s = s + 'document.getElementById("ToggleDesc").title="Hide Descriptions";';
	s = s + 'document.getElementById("ToggleDesc").innerHTML = document.getElementById("ToggleDesc").innerHTML';
	s = s + '.replace(/Show/, "Hide");';
	s = s + '}	}else{';
	s = s + 'for (var i = 0; i < imageDesc.length; i++){';
	s = s + '$("div.image_desc").hide("slow");';
	s = s + 'document.getElementById("ToggleDesc").title="Show Descriptions";';
	s = s + 'document.getElementById("ToggleDesc").innerHTML = document.getElementById("ToggleDesc").innerHTML';
	s = s + '.replace(/Hide/, "Show");';
	s = s + '}	}}';
	script.innerHTML = s;
	document.getElementsByTagName("head")[0].appendChild(script);	
}


//fallout3nexus.com and tesnexus.com files listing pages
//add Description toggle
if(document.baseURI.match(/.com\/downloads\/latest.php/) || document.baseURI.match(/.com\/downloads\/cat.php/) || document.baseURI.match(/.com\/downloads\/search.php/)){
	var expr = "/html/body/div[3]/div/div[2]/div";
	var result = document.evaluate(expr, document, null, 7, null);
	var div1 = result.snapshotItem(0);
	var img = createElement('img', {src: '/images/icons/page_white_text.png'});
	var span = createElement('span', {onclick: 'javascript: ToggleDesc()', style: 'cursor: pointer;', id: 'ToggleDesc', title: 'Show Descriptions'});
	var t = document.createTextNode(" Show Descriptions");
	span.appendChild(img);
	span.appendChild(t);
	div1.appendChild(createElement('br'));
	div1.appendChild(createElement('br'));
	div1.appendChild(span);

	var script = createElement('script', {type: 'text/javascript'});
	var s = 'function ToggleDesc(){';
	s = s + 'var imageDesc = document.getElementsByClassName("cat_desc_block");';
	s = s + 'if(document.getElementById("ToggleDesc").title=="Show Descriptions"){';
	s = s + '$(".cat_desc_block").show("slow");';
	s = s + 'document.getElementById("ToggleDesc").title="Hide Descriptions";';
	s = s + 'document.getElementById("ToggleDesc").innerHTML = document.getElementById("ToggleDesc").innerHTML';
	s = s + '.replace(/Show/, "Hide");';
	s = s + '}else{';
	s = s + '$(".cat_desc_block").hide("slow");';
	s = s + 'document.getElementById("ToggleDesc").title="Show Descriptions";';
	s = s + 'document.getElementById("ToggleDesc").innerHTML = document.getElementById("ToggleDesc").innerHTML';
	s = s + '.replace(/Hide/, "Show");';
	s = s + '}}';
	script.innerHTML = s;
	document.getElementsByTagName("head")[0].appendChild(script);	
}
	
// Tracking Centre pages
if(document.baseURI.match(/.com\/members\/tracking\//)){
	var track_log = document.getElementsByClassName('track_log');
	for (var i = 0; i < track_log.length; i++){
		if(track_log[i].innerHTML.match(/New image:/)){
			for(var j in track_log[i].childNodes){
				if(track_log[i].childNodes[j].tagName == 'A' && track_log[i].childNodes[j].innerHTML == ''){
					track_log[i].childNodes[j].innerHTML = '(no name)';
				}
			}
		}else{
			track_log[i].innerHTML = track_log[i].innerHTML.replace(/Image verified: ''/, "Image verified: '(no name)'");
			track_log[i].innerHTML = track_log[i].innerHTML.replace(/(Image deleted:|Video added:|Video deleted:)  <i/, "$1 (no name) <i");
		}
		if(track_log[i].innerHTML.match(/.(New image|Attribute change|Video added):/)){
			track_log[i].innerHTML = track_log[i].innerHTML.replace(/^Video added:/, "Videos added:");
			track_log[i].innerHTML = track_log[i].innerHTML.replace(/(^\w+ \w+):/, "$1s:");
			track_log[i].innerHTML = track_log[i].innerHTML.replace(/(.)(New image|Attribute change|Video added):/g, "$1,");
		}
	}
	var track_image = document.getElementsByClassName('track_image');
	for (var i = 0; i < track_image.length; i++){
		if(!track_image[i].innerHTML.match(/<img/)){
			if(track_image[i].nextSibling.innerHTML.match(/^Video (added|deleted):/)){
				track_image[i].innerHTML = '<img src="/images/icons/small/webcam.png" alt="videos">';
			}else if(track_image[i].nextSibling.innerHTML.match(/^New readme/)){
				track_image[i].innerHTML = '<img src="/images/icons/small/page_white_magnify.png" alt="readme">';
			}
		}
	}
}

// http://www.fallout3nexus.com/members/tracking/do_removefile.php?no_endtracking_submit=End+tracking+on+selected+files&id=8112
// if(document.baseURI.match(/.com\/members\/tracking\/managefiles.php/)){
	// var s = '<form id="no_endtracking" method="get" action="do_removefile.php?">';
	// var b = '<input type="submit" value="End tracking on selected files" name="no_endtracking_submit">';
	// var left_side = document.getElementById('left_side');
	// left_side.innerHTML = left_side.innerHTML.replace(/tracking<\/h3>/, "tracking</h3>" + s + b) + '</form>';
	// var list_row = document.getElementsByClassName('list_row');
	// for (var i = 0; i < list_row.length; i++){
		// var fid = getFirstChild(getFirstChild(list_row[i])).href.replace(/.*=(\d+)/, "$1");
		// var chk = createElement('input', {type: 'checkbox', name: 'id', value: fid, style: 'float:left'});
		// list_row[i].appendChild(chk);
	// }
// }

// Top Lists
if(document.baseURI.match(/downloads\/top\//)){
	var content = document.getElementsByClassName('content');
	for (var i = 0; i < content.length; i++){
		content[i].innerHTML = content[i].innerHTML.replace(/(<\/div>\s+)<br.*><br.*>/gm, "$1");
	}
	var left_side = document.getElementById('left_side');

	
	var s = '<div id="toplist_drop"><span onClick="$(\'#toplist_sel\').slideToggle(\'fast\')">';
	s += '<img src="/images/icons/resultset_next.png" />';
	s += 'View another Top List</span><div id="toplist_sel"></div></div>';
	if(!document.baseURI.match(/downloads\/top\/alltime/)){
		left_side.innerHTML = left_side.innerHTML.replace(/(<h2>Top 25.*<\/h2>[^<]*<h3>.*)/, '<div class="toplist_header">$1</div> ' + s);
	}else if(!document.baseURI.match(/downloads\/top\/alltime.php\?adult/)){
		left_side.innerHTML = left_side.innerHTML.replace(/(<h2>Top 100[^\(]*<\/h2>[^<]*<h3>.*)/, '<div class="toplist_header">$1</div> ' + s);
	}else{
		left_side.innerHTML = left_side.innerHTML.replace(/(<h2>Top 100.*<\/h2>[^<]*<h3>.*)/, '<div class="toplist_header">$1</div> ' + s);
	}
	left_side.innerHTML = left_side.innerHTML.replace(/site<\/h3>([^<]*)(<br ?\/?>)+/m, 'site</h3><div id="rating_info">$1<br /><br /></div>');
	var s = '<img src="/images/icons/information.png" style="vertical-align:top; cursor:pointer" title="Rating system info" '
	s += 'onClick="$(\'#rating_info\').slideToggle(\'slow\')" />';
	left_side.innerHTML = left_side.innerHTML.replace(/site<\/h3>/m, 'site ' + s + '</h3>');
	
	var toplists = left_side.innerHTML;
	toplists = toplists.match(/<h2>Top Lists<\/h2>(([^<]*<a.*)+)/);
	document.getElementById('toplist_sel').innerHTML = toplists[1];
	var d = createElement('div', {style: 'clear:left'});
	if(document.baseURI.match(/downloads\/top\/(alltime|recent)/)){
		left_side.insertBefore(d, document.getElementById('toplist_drop').nextSibling);
	}else{
		left_side.insertBefore(d, next(document.getElementById('toplist_drop')));
	}
	left_side.innerHTML = left_side.innerHTML.replace(/<h2>Top Lists<\/h2>(([^<]*<a.*)+)[^<]*(<br ?\/?>)+/, '');

	var box = document.getElementsByClassName('box');
	for (var i = 0; i < box.length; i++){
		box[i].innerHTML = box[i].innerHTML.replace(/(<div style=")/, "$1" + "line-height: 40px; ");
		box[i].innerHTML = box[i].innerHTML.replace(/padding: 5px;/, "padding: 0px;");
	}
	var aCSS = [];
	aCSS.push(".toplist_header {float: left; padding-right: 12px;}");
	aCSS.push("#toplist_drop {float: left; padding-top: 6px; cursor: pointer;}");
	aCSS.push("#toplist_drop img {vertical-align: text-top;}");
	aCSS.push("#toplist_sel {display: none; padding: 0px 4px; margin-left: 14px; position: absolute; z-index: 100; background-color: #313131; border: 1px solid #616161;}");
	aCSS.push("#rating_info {display: none;}");
	document.createStyleSheet(aCSS.join("\n"));
}
// Files of the month
if(document.baseURI.match(/downloads\/filesofthemonth.php/)){
	var left_side = document.getElementById('left_side');
	left_side.innerHTML = left_side.innerHTML.replace(/(<br ?\/?>)<br ?\/?>/gm, '<div class="vspacer1"></div>'); 
	var box = left_side.getElementsByClassName('box');
	for(var i = 0; i < 5; i++){
		var fc = getFirstChild(box[i]);
		fc.className = 'fotm_num';
		fc.removeAttribute('style');
		var nc = next(fc);
		nc.className = 'fotm_txt';
		nc.removeAttribute('style');
		box[i].innerHTML = '<div class="fotm_row">' + box[i].innerHTML + '</div>';
	}
	for(var i = 0; i < box[5].childNodes.length; i++){
		if(box[5].childNodes[i].tagName == 'DIV'){
			box[5].childNodes[i].removeAttribute('style');
			box[5].childNodes[i].className = 'fotm_past_row';
			var k = 0;
			for(var j = 0; j < box[5].childNodes[i].childNodes.length; j++){
				if(box[5].childNodes[i].childNodes[j].tagName == 'DIV'){
					switch(++k){
						case 1:
							box[5].childNodes[i].childNodes[j].removeAttribute('style');
							box[5].childNodes[i].childNodes[j].className = 'fotm_past_name';
							break;
						case 2:
							box[5].childNodes[i].childNodes[j].removeAttribute('style');
							box[5].childNodes[i].childNodes[j].className = 'fotm_past_auth';
							break;
						case 3:
							box[5].childNodes[i].childNodes[j].removeAttribute('style');
							box[5].childNodes[i].childNodes[j].className = 'fotm_past_vote';
							break;
					}
				}
			}
		}
	}
}

if(document.baseURI.match(/tesnexus.com.downloads.categories.php/)){
	document.body.innerHTML = document.body.innerHTML.replace(/Mercantiles \(shops, stores, inns, taverns, etc\)/g, "Mercantiles (shops, inns, taverns, etc)");
	document.createStyleSheet(".cats_cat { width: 270px; float: left; margin-right: 15px; margin-bottom: 0px; }");
}

//make user image pages usable!
//if(document.baseURI.match(/modules.members.images.php/) || document.baseURI.match(/downloads\/file\/images.php/)){
if(document.baseURI.match(/modules.members.images.php/)){
	var uid = document.baseURI.match(/id=(\d+)/)[1];
	var left_side_innerHTML = document.body.innerHTML;
	var temp_body = document.createDocumentFragment();
	
	document.title = "Fallout 3 Nexus - Fallout 3 mods and community";
	// document.body.previousSibling.appendChild(styles);

	var e = createElement('link', {rel: 'stylesheet', type: 'text/css', href: '/includes/css/style.css', media: 'screen'});
	document.getElementsByTagName("head")[0].appendChild(e);
	
	var main = createElement('div', {id: 'main'});
	var right = createElement('div', {id: 'right'});
	var left_side = createElement('div', {id: 'left_side'});
	left_side.innerHTML = left_side_innerHTML;
	main.appendChild(right);
	main.appendChild(left_side);
	var content = createElement('div', {class: 'content'});
	content.appendChild(main);

	temp_body.appendChild(content);
	document.body.innerHTML = "";
	document.body.appendChild(temp_body);
	
	var left_side = document.getElementById('left_side');
	var heading = left_side.getElementsByClassName('files_info_heading')[0];
	var uname = left_side.getElementsByClassName('cat_att')[0].innerHTML.match(/>(.*)/)[1];
	heading.style.minWidth = '46%';
	heading.innerHTML = heading.innerHTML.replace(/Images/, 'Images uploaded by <a href="/modules/members/index.php?id='+uid+'">'+uname+'</a>');
	
	var cat_top = document.getElementsByClassName('cat_top');
	for (var i = 0; i < cat_top.length; i++){
		cat_top[i].innerHTML = cat_top[i].innerHTML.replace(/javascript:ajaxpage\('/gm, "");
		cat_top[i].innerHTML = cat_top[i].innerHTML.replace(/%27,%20%27mcontentarea%27%29;/gm, "");
		cat_top[i].innerHTML = cat_top[i].innerHTML.replace(/index/g, "images");
	}
	
	var cat = document.getElementsByClassName('cat');
	for (var i = 0; i < cat.length; i++){
		//cat[i].innerHTML = cat[i].innerHTML.replace(/height: 144px/gm, "height: 110px");
		cat[i].innerHTML = cat[i].innerHTML.replace(/(\w)<br>(\w)/gm, "$1 $2");
		//cat[i].innerHTML = cat[i].innerHTML.replace(/<br>/gm, " ");
	}
	
	//<a href="/imageshare/index.php?page=2&cats=&orderby=id&dir=DESC">2</a>
	//modules/members/images.php
}
applyStyleSheet();

//set options on upload new file and new image pages
// document.getElementsByName('allow_comments')[0].selectedIndex = 0;
// document.getElementsByName('allow_rating')[0].selectedIndex = 0;
// document.getElementsByName('allow_tagging')[0].selectedIndex = 0;
// document.getElementsByName('allow_images')[0].selectedIndex = 0;
// document.getElementsByName('allow_view')[0].selectedIndex = 1;
// document.getElementsByName('adult')[0].selectedIndex = 1;
// document.getElementsByName('agree')[0].checked = true;

if(document.baseURI.match(/news.index.php/) || document.baseURI.match(/http:\/\/fallout3nexus.com\/$/)){
	//alert("matched: " + document.baseURI);	
}else{

var cat = document.getElementsByClassName('cat');
var cat_att = document.getElementsByClassName('cat_att');
if(document.baseURI.match(/imageshare/)){
	//alert(document.baseURI);
	var imageDesc = document.getElementsByClassName('image_desc');
	for (var i = 0; i < cat.length; i++){
		var uid = cat_att[i*3].innerHTML.replace(/.*\?id=(\d+).+/, "$1");
		//alert(uid);
		var s = '<a href="/modules/members/images.php?id=' + uid + '&orderby=date&order=DESC" title="User images">';  
		s = s + '<img src="/images/icons/photo.png" /></a> ';
		if (imageDesc[i].innerHTML){
			var d = "image_desc" + i;
			s = s + '<img src="/images/icons/page_white_text.png" style="cursor: pointer" title="Show description" ';
			s = s + "onClick='javascript: ";
			s = s + 'if(document.getElementById("' + d + '").style.display=="block")';
			s = s + '{$("#' + d + '").hide("fast");}';
			s = s + 'else{$("#' + d + '").show("fast");}' + "' />";
		}
		s = '<div class="buttons" align="right">' + s + '</div>';
		var r = ' style="display: none;"';
		cat[i].innerHTML = cat[i].innerHTML.replace(/(<div class="image_desc")(>.*\n.*\n.*modules.members.*div>)/, "$1"+' id="'+d+'"'+r+"$2"+s);
		cat[i].innerHTML = cat[i].innerHTML.replace(/<br.?.?>/gm, " ");
		cat[i].childNodes[11].style.cssFloat = "left";
		cat[i].childNodes[14].style.clear = "both";
	}
}else if(document.baseURI.match(/downloads/)){
	document.createStyleSheet('div.cat_fname>h3 { float: left; }');
	document.createStyleSheet('.cat_desc_block { clear: both; }');
	document.createStyleSheet('div.cat_top>form>input { padding: 0 0 0 4px; }');
	var description = document.getElementsByClassName('cat_desc_block');
	for (var i = 0; i < description.length; i++){
		if (description[i].innerHTML){
			description[i].innerHTML = description[i].innerHTML.replace(/<br.?.?>/gm, " ");
		}
	}
	for (var i = 0; i < cat.length; i++){
		if (description[i].innerHTML){
			var d = "file_desc" + i;
			var s = '<div><img align="right" src="/images/icons/page_white_text.png" style="cursor: pointer" title="Show description" ';
			s = s + "onClick='javascript: ";
			s = s + 'if(document.getElementById("' + d + '").style.display=="block"){';
			s = s + '$("#' + d + '").hide("fast");';
			s = s + '$("#hr' + i + '").hide("fast");';
			s = s + '}else{';
			s = s + '$("#' + d + '").show("fast");';
			s = s + '$("#hr' + i + '").show("fast");';
			s = s + "}' /></div>";
			cat[i].innerHTML = cat[i].innerHTML.replace(/(<h3>.+<.h3>)/, "$1" + s);
			cat[i].innerHTML = cat[i].innerHTML.replace(/(<div class="cat_desc_block")/, "$1"+' id="'+d+'"');
			cat[i].childNodes[7].id = "hr" + i;
			cat[i].childNodes[7].style.display = "none";
			cat[i].childNodes[7].className += ' cat_desc_block';
		}
	}

}

var cat_fname = document.getElementsByClassName('cat_fname');
for (var i = 0; i < cat_fname.length; i++){
	var image_title = cat_fname[i].childNodes[1].firstChild.firstChild.data;
	cat_fname[i].childNodes[1].firstChild.title = image_title;
	image_title = image_title.replace(/(.{27}).*/, "$1" + "...");
	cat_fname[i].childNodes[1].firstChild.firstChild.data = image_title;
}

var cat_top = document.getElementsByClassName('cat_top');
for (var i = 0; i < cat_top.length; i++){
	if (cat_top[i].innerHTML.match(/images.icons.folder.png.*Categories/)){
		d = "categories" + i;
		cat_top[i].innerHTML = cat_top[i].innerHTML.replace(/(<form )/, "$1" + 'id="' + d + '" style="display: none" ');
		var s = ' style="cursor: pointer" title="Select Categories" ';
		s = s + "onClick='javascript: ";
		s = s + 'if(document.getElementById("' + d + '").style.display=="none")';
		s = s + '{$("#' + d + '").show("slow");}';
		s = s + 'else{$("#' + d + '").hide("slow");}' + "' ";
		cat_top[i].innerHTML = cat_top[i].innerHTML.replace(/(<div )/, "$1" + s);
	}
	if (cat_top[i].innerHTML.match(/images.icons.page_white_go.png.*Pages/)){
		cat_top[i].innerHTML = cat_top[i].innerHTML.replace(/(.div>)/, "$1" + '<div style="font-size: 0.96em" />');
		cat_top[i].innerHTML = cat_top[i].innerHTML + "</div>";
		cat_top[i].innerHTML = cat_top[i].innerHTML.replace(/&nbsp;/gm, "");
		cat_top[i].innerHTML = cat_top[i].innerHTML.replace(/Page /gm, "");
	}
}



var content = document.getElementsByClassName('content');
for (var i = 0; i < content.length; i++){
	if (content[i].innerHTML.match(/form.*.downloads.match.php/)){
		content[i].innerHTML = content[i].innerHTML.replace(/<br.*><br.*>/gm, "<br />");
		content[i].innerHTML = content[i].innerHTML.replace(/(<.form>.*\n.*\n.*)<br.*>/g, "$1");
	}
}


// imageshare and download pages
if(document.baseURI.match(/imageshare/) || document.baseURI.match(/downloads/)){
	// set Organize drop-down options
	var orderby = document.getElementsByName('orderby');
	var dir = document.getElementsByName('dir');
	for (var i = 0; i < orderby.length; i++){
		orderby[i].selectedIndex = 1;
		dir[i].selectedIndex = 1;
	}

	// get form and submit
	var expr = "/html/body/div[3]/div/div[2]/div[3]/form";
	var result = document.evaluate(expr, document, null, 7, null);
	//result.snapshotItem(0).submit();
}

// Add Image and Add File pages
if(document.baseURI.match(/imageshare.add.php/) || document.baseURI.match(/newfile.php/)){
	var expr = "/html/body/div[3]/div/div[2]/form/div[3]/input";
	var result = document.evaluate(expr, document, null, 7, null);
	result.snapshotItem(0).checked = true;
}


}
//applyStyleSheet();



