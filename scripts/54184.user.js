// ==UserScript==
// @name		TopHos_Extra
// @fullname      	TopHos Extra Real download size column
// @author        	usersXcript
// @version             v1.00
// @namespace           http://userscripts.org/scripts/show/54184
// @description		Show TopHos real download size column, like in ScT
// @include		http://www.tophos.org/browse.php
// ==/UserScript==


function main(){
	var t = document.evaluate('/html/body/table[3]/tbody/tr/td[2]/form/table[4]/tbody/tr/td[7]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	t = t.snapshotItem(0);
	var th = document.evaluate('//tr[@class="ttable"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	var dld = document.createElement('td');
	dld.setAttribute('class','colhead');
	dld.setAttribute('align','center');
	dld.innerHTML = 'DLD Size';
	t.parentNode.insertBefore(dld, t.previousSibling);
	
	var t = document.evaluate('//tr[@class="ttable"]/td[7]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var th = document.evaluate('//tr[@class="ttable"]/td[2]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var ths = document.evaluate('//tr[@class="ttable"]/td[6]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for(i = 0; i < t.snapshotLength; i++){	
		dld = document.createElement('td');
		dld.setAttribute('class','text3');
		dld.setAttribute('align','center');
		
		var t2 = t.snapshotItem(i); //Snatch's row, so we use insertAfter()
		var th2 = th.snapshotItem(i); //Name row, to check if it's a silver/gold upload
		var ths2 = ths.snapshotItem(i); //Size's row
		
		if(th2.innerHTML.match('pic/silver.gif')){
			var size = ths2.innerHTML;
			var is = "";
			if(size.match(/<br>GB/)) { is = '<br>GB'; size = size.replace(/<br>GB/, ''); }
			if(size.match(/<br>MB/)) { is = '<br>MB'; size = size.replace(/<br>MB/, ''); }
			if(size.match(/<br>KB/)) { is = '<br>KB'; size = size.replace(/<br>KB/, ''); }
			dld.innerHTML = (size / 2) + is;
			dld.style.backgroundColor = 'yellow';
		}else if(th2.innerHTML.match('pic/free.gif')){
			dld.innerHTML = "Free";
			dld.style.backgroundColor = 'green';
		}else{
			dld.innerHTML = ths2.innerHTML;
			dld.style.backgroundColor = 'red';
		}
		
		t2.parentNode.insertBefore(dld, t2.previousSibling);
	}
}
main();