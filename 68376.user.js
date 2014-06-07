// ==UserScript==
// @name           Wikipedia HTTPS
// @namespace      http://brunonar.googlepages.com
// @description    Secure Wikipedia
// @include        *.wikipedia.org*
// @include        *secure.wikimedia.org*
// Creative Commons
// ==/UserScript==

//====================
//section Secure, step 1
//====================
var login = document.getElementById('wpRemember');
var doc   = document.location.href;
var ip = document.getElementById('mw-anon-edit-warning');
//function lang() //Return Wiki's language.
//{
//	var lang = document.getElementsByTagName('html')
//	var a=0;
//	for (a=0;a<lang.length;a++)
//	{
//	if (lang[a].xmlns="http://www.w3.org/1999/xhtml")
//	{return: lang[a].lang}
//	}
//}
	var lang = document.getElementById('pt-login');
		if (lang = null)
		 {lang = lang.getElementsByTagName('a')[0]}
		 else
		 { lang = document.getElementsByTagName('html')[0];
		   lang = lang.lang;
		 }
		 
var islogin = document.getElementById('pt-userpage');
if (login != null){islogin = 'Doing login now'}
if (ip    != null){islogin = 'IP editing now'}
if (doc.search('https:')>-1 && islogin != null)
	{var login = GM_setValue('login',true)}
	else if (doc.search('https:')>-1)
	{var login = GM_setValue('login',false)}

if (login != null && doc.search('http:')>-1)
{
document.location.href=doc.replace('http://'+lang+'.wikipedia.org','https://secure.wikimedia.org/wikipedia/'+lang)
}
else
	{
	var href = document.getElementById('pt-login');
	if (href != null)
	{
	href = href.getElementsByTagName('a')[0];
	href.href='https://secure.wikimedia.org/wikipedia/'+lang+'/w/index.php?title=Special:UserLogin';
	}
	}
//====================
//section Secure, step 2
//====================
logout = document.getElementsByTagName('script')
var i=0;
for (i=0;i<logout.length;i++)
	{
	if (logout[i].innerHTML.search('Userlogout')>-1 && doc.search('https:')>-1)
	{
	GM_setValue('login',false);
	document.location.href=doc.replace('https://secure.wikimedia.org/wikipedia/'+lang,'http://'+lang+'.wikipedia.org')
	}
	}

//====================
//section IP_user, protect if you are a ip;
//====================
if (ip != null && doc.search('http:')>-1)
 {document.location.href=doc.replace('http://'+lang+'.wikipedia.org','https://secure.wikimedia.org/wikipedia/'+lang)}

ip_link = document.getElementById('ca-edit');
if (ip_link != null && doc.search('http:')>-1)
	{
	  edit_link = ip_link.getElementsByTagName('a')[0];
	  edit_link.href = edit_link.href.replace('http://'+lang+'.wikipedia.org','https://secure.wikimedia.org/wikipedia/'+lang);
	}
//====================	
//section CheckIfLogin, check if login on another page, if login then this page will do it too
//====================
var login = GM_getValue('login',null);
if (login != null && login==true && doc.search('http:')>-1)
	{document.location.href=doc.replace('http://'+lang+'.wikipedia.org','https://secure.wikimedia.org/wikipedia/'+lang);}
if (login != null && login==false && doc.search('https:')>-1)
	{document.location.href=doc.replace('https://secure.wikimedia.org/wikipedia/'+lang,'http://'+lang+'.wikipedia.org')}

//section Logo, put logo on footer
//====================

footer = document.getElementById('footer');
logowiki = document.getElementById("f-poweredbyico");
logo = document.createElement('div');
logo.id = 'greaselogo';
logo.href= 'http://www.userscripts.org';
img = document.createElement('img');
if (doc.search('https')>-1)
	{img.src = 'https://addons.mozilla.org/en-US/firefox/images/addon_icon/748/1265923302*'}
	else
	{img.src = 'https://addons.mozilla.org/img/amo2009/logo-mozilla.gif'};
//img.height="31"
//img.width="88"
logo.appendChild(img);
logo.innerHTML = '<a id="img_monkey" href="http://www.userscripts.org">'+logo.innerHTML+'</a>\n';
footer.insertBefore(logo,logowiki);
//====================
//section Logo, step 2, link on the monkey
//====================
var link_real = 'http://userscripts.org';
if (lang == 'en')
	{link_real = 'http://en.wikipedia.org/wiki/Greasemonkey'}
	else
if (lang == 'pt')
	{link_real = 'http://pt.wikipedia.org/wiki/Greasemonkey'}
	else
if (lang == 'es')
	{link_real = 'http://es.wikipedia.org/wiki/Greasemonkey'}
	else
	{
	 GM_xmlhttpRequest({
						method: 'GET',
						url: 'http://en.wikipedia.org/wiki/Greasemonkey',
						onload: function(source) {GM_setValue('langs',source.responseXML)}
					   });

	var seclang = document.createElement('div');
	seclang.id = 'seclang';
	var text = GM_getValue('langs','null');
	var index = text.indexOf('<div id="p-lang"',0);
	text=text.slice(index,text.indexOf('</div>',text.indexOf('</div>',index)+6)+6); //Plus six because I wanna trought "</div>"
	
	while (text.search('interwiki-')>-1)
	{text = text.replace('interwiki-','interwiki2-')}
	text = text.replace('p-lang','p-lang2');
	seclang.innerHTML=text;
	document.body.appendChild(seclang);
	secreal = document.getElementById('p-lang2');
	li = secreal.getElementsByClassName('interwiki2-'+lang)[0];
	if (li != null)
		{link_real = li.getElementsByTagName('a')[0].href;}
		secreal.innerHTML=''
	}
if (link_real != 'http://userscripts.org' && doc.search('https:')>-1)
	{link_real = link_real.replace('http://'+lang+'.wikipedia.org','https://secure.wikimedia.org/wikipedia/'+lang);}
monkey = document.getElementById('img_monkey');
monkey.href = link_real