// ==UserScript==
// @id             2.0chan.hk-link fixer@scriptish
// @name           2.0chan link fixer
// @version        1.0
// @namespace      
// @author         
// @description    replaces .ru with .hk in 2.0chan links
// @include        *0chan.hk*
// @run-at         document-end
// @require        http://code.jquery.com/jquery-1.8.3.min.js
// ==/UserScript==
function FixMe() 
{
	function FixImg() 
	{
		this.src = this.src.replace(/0chan\.ru/, '0chan.hk');
    }
    function FixA() 
	{
        var re = new RegExp('http://([a-z0-9_]{2,8})\.2\.0chan\.ru');
        this.href = 'http://0chan.hk/_' + re.exec(this.href)[1] + '/';
    }
    if (/2\.0chan\.hk/.test(document.location.href)) 
	{
        $('title')[0].innerHTML = $('title')[0].innerHTML.replace(/2\.0chan\.ru/, '2.0chan.hk');
        $('link')[0].href = $('link')[0].href.replace(/0chan\.ru/, '0chan.hk');
        $('img').each(FixImg);
        $('div.content>a').each(FixA);
    }
}
$(FixMe);
