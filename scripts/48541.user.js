// ==UserScript==
// @name           My Episodes Newzbin Search
// @namespace      http://userscripts.org/users/seaofquiddity
// @description    Puts a link to the newzbin search for that episode on myepisode.com, newzbin searches work best with your "Season & Episode numbering Format" in the My Episodes control panel set to "%01sx%02s".
// @include        http://www.myepisodes.com/views.php*
// ==/UserScript==

// Modified from Myepisodes NZB Search by ReV_ http://userscripts.org/scripts/show/29729

//Insert new table column for links
var h = document.evaluate("//th[@title='Aquired']", document, null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
var newHeader = document.createElement('th');
newHeader.innerHTML = 'Newzbin';
h.parentNode.insertBefore(newHeader, h);

//Add link for each episode
var allEpisodes, thisEpisode;
allEpisodes = document.evaluate("//td[@class='showname']", document, null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allEpisodes.snapshotLength; i++) {
    thisEpisode = allEpisodes.snapshotItem(i);	
	
//Retrieve show name and episode number	
	var showName = thisEpisode.firstChild.innerHTML;
	var epNb = document.evaluate(".//td[@class='longnumber']", thisEpisode.parentNode, null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML;
				
	//Change episode number format from 12x34 to s12e34
	//var tempArray = epNb.split("x");
	//epNb = "s" + tempArray[0] + "e" +tempArray[1];
	
  http://v3.newzbin.com/search/query/?q=TEST&area=c.8&fpn=p&searchaction=Go&category=8&areadone=c.8
	//Insert Newzleech link in the appropriate column
	var link = 'http://v3.newzbin.com/search/query/?q='
				+ showName + ' ' + epNb + '&area=c.8&fpn=p&searchaction=Go&category=8&areadone=c.8';
	var newElement = document.createElement('td');
	newElement.innerHTML = '<td><a href ="' + link + '" target="_blank"><center><img src="data:;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAADTq2YA2bFsAPrlyAD/7dkA/uzXAP7s2QD/6ccs+d2ju8CeY8LYql4z5bZmAO68aQD9yXEA/c91AP3VeAD913oA06tmANmxbAD65cgA/+3ZAP7s1x7+7dyT/uGm+vbRgvfHoWT12Ktd/+S0ZJ/uvWoY/MlxAP3PdQD91XgA/dd6ANOrZgDZsWwA+ubJAP/t2QD+7Neq/u3c///gqP/vx3bfvZZR2tuwaebnvHTu7rtk9vvIcHT9z3UH/dV4AP3XegDUrGgL2K9pRfPbuKD/7tsk/uzXAP7t2lX+3KHg9s2C8ceiY/LUqF6p89izAfXSm5z4xW///s503P3VeEn913oL06xpktSrZP/r0Kjq/+/d8f7t2YT958sA+Mt+l/PJgfPGoWTizqJW9eO+gmD54sMA9cyKJvbDbcX9z3X//dN3kM2nZp7OpmL/68+p5P/u3Lb+7Nfa/+7bdPTQlaPitmvqto9N2M+nY/rWqmH/4bZu1ei5ay/Nolg7+sdw///Mc57HomKex6Be/+nOquD/7dv//+rWv//x4T3v0Z+j2K1i666IR+LPrHKq2bN2KNaoWs/hsmT/37Fjyu++av/1wm2bwJxfoMCaW//nzKhf/+3bLv7p1a744MWE37p91M6lYeGif0TZuZJP4cadVyXInlgAyZ9XuuCyZP/ismD/5rVimrmXXJ64lFf/5s+vwPHYuifPrHOLzKZn/86pa+nhv4S40LF7rreVXuK6klD/wplVjcGXUrnbs3H/7s6e/+W9fpezkVmds5FX/8yugP/Cn2b9wJ1g/82mZtHrxX/V/9yO/P/djvrrxoHTv5lXuLiSUe/BmVP/0q1v///v4f//7NyKrYxWna+OV/+zkVn/0bSK7+XDkOL2yoD//tKE//jbrsb/6My6/92e+PfLf/nSqmjRtpBPwcKgaO//8OD//+7eiqOEUJWkhE7twKFv9vTdxNbt0awF9NCWfvjOiPTxxn/18dKo/PjgyJrrwn4s5b16xMqlZe+7m2fh9N3H///r2oOTeEwYl31RXbKTX+bFo2n/w59hpcqocA744MRu+tmo/+zCevvgunntx6JjWfHXtmjy2Lr/upxt45mAVmmdh2UUkHdOAJN7UgCqjV0PuZlje8ela/TIo2T517eH2ffhytT64sjJ3Ll//8+rbP/JqXj/7da8c822lQSMc0kAgm1HAJF4TgCUe1IAqo1dALaXYwC8m2YUwaBphcOgZvTHpGz5zq9/9cOia/+9nWa3tZRdLsmsgADQt5YAjnVLAIdyTACReE4AlHtSAKqNXQC3mGMAvZxmALycZgC4mGQXspNfja2PW9ixk2BUtpdjALaWYADMsIUA0LeWAI51SwCHckwA/D////AP///wA///CAD//wQQ//8AAP//AAD//wAQ//8AAP//AAD//wAA//8AAP//AAD//8AD///wD////D///w==" border="0" width="16px" height="16px"></center></a></td>';
	var afterElement = document.evaluate(".//td[@class='status']", thisEpisode.parentNode, null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);		
    afterElement.parentNode.insertBefore(newElement, afterElement);
}