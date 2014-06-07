// ==UserScript==
// @name           Orkut : Starred Topics
// @namespace      http://gm.wesley.eti.br/orkut
// @description    Allows you to mark topics with a star
// @include        http://www.orkut.com.br/CommTopics.aspx?cmm=*
// @include        http://www.orkut.com.br/Community.aspx?cmm=*
// @require        http://www.wesley.eti.br/includes/js/php.js
// @require        http://www.wesley.eti.br/includes/js/php2js.js
// @require        http://gm.wesley.eti.br/gm_default.js
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @version        1.0.1
// @copyright      w35l3y 2008
// @license        GNU GPL
// @homepage       http://www.wesley.eti.br
// ==/UserScript==

/**************************************************************************

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

**************************************************************************/

checkForUpdate({
	'file':'http://userscripts.org/scripts/source/34566.user.js',
	'name':'Orkut : Starred Topics',
	'namespace':'http://gm.wesley.eti.br/orkut',
	'version':'1.0.1'
});

(function(){	// script scope
	var path = ( /\/Community\.aspx/i.test(location.href) ? "id('mbox')/table[3]/tbody/tr[2]/td[1]/form/table/tbody/tr/td[2]/a" : "id('mboxfull')/table/tbody/tr[2]/td[1]/form/table/tbody/tr/td[2]/a" );
	var topics = document.evaluate(path,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for ( var i = 0 , t = topics.snapshotLength ; i < t ; ++i )
	{
		AddStar(topics.snapshotItem(i));
	}
})();

function AddStar(l)
{
	var img = new Image();
	var cmm = l.href.match(/cmm=(\d+)/)[1];
	var tid = l.href.match(/tid=(\d+)/)[1];
	var topic = cmm+"+"+tid+"|";
	var stat = ( GM_getValue("starred","").indexOf(topic) == -1 ? "off" : "on" );	
	img.src = "http://mail.google.com/mail/images/star_"+stat+"_2.gif#topic"+topic;
	img.setAttribute('style','float:left;padding: 3px 10px 0px 0px;');
	img.addEventListener("click",function(e){
		var stat = this.src.match(/_on_/);
		var starred = GM_getValue("starred","");
		this.src = "http://mail.google.com/mail/images/star_"+(stat ? "off" : "on")+"_2.gif#topic"+topic;
		GM_setValue("starred",( stat ? starred.replace(topic,"") : topic + starred ));
	},true);

	l.parentNode.insertBefore(img,l);
}