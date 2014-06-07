// ==UserScript==
// @name           MySpace Bulletins
// @namespace      MySpace Bulletins
// @include        http://home.myspace.com/*
// ==/UserScript==

var style = '.hau_eBuls { width: 100%; padding:0px; margin:0px;}'
		+ '.hau_eBuls td { border-bottom: 1px dotted !important; padding: 5px !important;}'
		+ '.hau_eBuls img {width: 45px; max-height: 80px; }'
		+ '.userinfo {width:45px !important;}'
		GM_addStyle(style.replace('}','}\n'))

GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://bulletins.myspace.com/index.cfm?fuseaction=bulletin&',
            headers: {'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.8) Gecko/20071008 Firefox/2.0.0.8'},
            onload: function(responseDetails) {
			html = responseDetails.responseText.replace(/\t|\r|\n|\s\s/g,'').match(/<table id = "bulletin_inbox".+?<\/table>/);			
			html = html[0].replace(/\/m_/g,'/s_').replace(/_m./g,'_s.').replace('200px','120px').replace(/<br \/><br \/>/g,'');
			html = html.replace(/<script type="text\/javascript">document\.write\(MySpace\.Util\.applyWBRToHTML\("/g,'');
			html = html.replace(/", \{frequency: 5\}\)\);<\/script>/g,'').replace('"bulletin_inbox"','"bulletin_inbox" class="hau_eBuls"');
			html = html.replace(/<\/tr>/g,'</tr>,,');
			arrHtml = html.split(',,');
			
			for (var i=0; i < arrHtml.length; i++){
				link = arrHtml[i].match(/<a.+?>/);
				name = arrHtml[i].match(/<br \/>.+?<\/a>/);
				arrHtml[i] = arrHtml[i].replace(name,'</a>').replace('class="date">','class="date">' + link + name + '<br/>').replace('<br />','');
				GM_log(arrHtml[i]);
			}
			document.getElementById('bulletins').childNodes[3].childNodes[1].innerHTML = arrHtml.join().replace(/>,/g,'>').replace(/<th/g,'<th align="left"');
            }
        });
	
var view_all = document.getElementById('bulletins').getElementsByTagName('a')
	view_all = view_all[(view_all.length-1)]
var view_mine = document.createElement('a')
	view_mine.setAttribute('href','http://bulletins.myspace.com/index.cfm?fuseaction=bulletin.ShowMyBulletins')
	view_mine.innerHTML = 'view mine'

	view_all.parentNode.insertBefore(view_mine, view_all)
	view_all.parentNode.insertBefore(document.createTextNode(' | '), view_all)
		
var view_all2 = document.createElement('a')
	view_all2.setAttribute('href', 'http://bulletins.myspace.com/index.cfm?fuseaction=bulletin')
	view_all2.innerHTML = 'view all'
	
	view_all.parentNode.insertBefore(view_all2, view_all)
	view_all.parentNode.insertBefore(document.createTextNode(' | '), view_all)