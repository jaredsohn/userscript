// ==UserScript==
// @name           BB/HTML Code Inventory List Generator
// @description    Generates a bbcode of list your inventory excluding frozen, soulbound, equiped items. This make it easer to sell a ton of stuff in the Gaia Exchange. Also generates HTML code for http://www.tektek.org/gaia/worth.php (excludes frozen and soulbound items)
// @include        http://www.gaiaonline.com/inventory/view/*
// @include        http://www.gaiaonline.com/inventory/
// @include        http://www.gaiaonline.com/inventory
// @include        http://gaiaonline.com/inventory/view/*
// @include        http://gaiaonline.com/inventory/
// @include        http://gaiaonline.com/inventory
// ==/UserScript==
function getId(id){
	return document.getElementById(id);
}
function genBbList(){
	var ele=getId('all').parentNode.getElementsByClassName('item-list');
	for (var i=0;i<ele.length;i++){
		if (ele[i].getAttribute('class')=='item-list'){
			var img=ele[i].getElementsByTagName('li');
			break;
		}
	}
	var text='';
	var text2='';
	var quantity='';
	var arr=new Array;
	for (var i=0;i<img.length;i++){
		var t=img[i].getElementsByTagName('img')[0];
		if(t.parentNode.getElementsByClassName('soulbound').length==1 || t.parentNode.getElementsByClassName('frozen').length==1 || t.className=='equipped'){
			continue;
		}
		if(t.parentNode.getElementsByClassName('quantity').length==1){
			quantity='|quantity='+img[i].parentNode.getElementsByClassName('quantity')[0].textContent+'| ';
		}
		else{
			quantity='';
		}
		arr[arr.length]=t.title+' '+quantity+'[url=http://www.gaiaonline.com/marketplace/itemdetail/'+t.id.slice(t.id.indexOf('.')+1,t.id.lastIndexOf('.'))+'][imgleft]'+t.src+'[/imgleft][/url]\n\n\n';
	}
	arr=arr.sort();
	var conCount=0;
	for(var i=0;i<arr.length;i++){
		if(!arr[i]){
			conCount++;
			continue;
		}
		if(text.length+(i*3-conCount)<48800){
			text+=arr[i];
		}
		else{
			text2+=arr[i];
		}
	}
	var box=getId('genlist');
	box.value=text;
	if (text2!=''){
		var tall=getId('all').parentNode.offsetHeight/2-14+'px';
		var box2=getId('genlist2');
		getId('genlist2').style.display='block';
		getId('GM_Note').style.display='block';
		box2.value=text2;
		box2.style.height=tall;
	}
	else{
		var tall=getId('all').parentNode.offsetHeight-9+'px';
		getId('genlist2').style.display='none';
		getId('GM_Note').style.display='none';
	}
	box.style.height=tall;
	text=null;
	text2=null;
}
function genHtmList(){
	var ele=getId('all').parentNode.getElementsByClassName('item-list');
	for (var i=0;i<ele.length;i++){
		if (ele[i].getAttribute('class')=='item-list'){
			var img=ele[i].getElementsByTagName('li');
			break;
		}
	}
	var text='';
	for (var i=0;i<img.length;i++){
		var t=img[i].getElementsByTagName('img')[0];
		if(t.parentNode.getElementsByClassName('soulbound').length==1 || t.parentNode.getElementsByClassName('frozen').length==1){
			continue;
		}
		/*var s=t.parentNode.getElementsByTagName('span');
		for(var x=0;x<s.length;x++){
			if(s[x].className='quantity stacked'){
				s='<span class="quantity stacked">'+s[x].textContent+'</span>';
				break;
			}
		}
		text+='<img width="30" height="30" alt="'+t.alt+'" title="'+t.title+'" src="'+t.src+'" id="'+t.id+'" rel="'+t.rel+'"/>'+s+''+'\n';*/
		text+='<li>'+t.parentNode.innerHTML+'</li>';
		s='';
	}
	var box=getId('genlist');
	box.value=text;
	box.style.height=getId('all').parentNode.offsetHeight-9+'px';
	getId('genlist2').style.display='none';
	getId('GM_Note').style.display='none';
	text=null;
}
getId('right').innerHTML='<center><span style="font-size: 11px;">Code for posting your invintory<br/><a style="float: left;" id="GM_Reload_Blnk" title="Good for selling a stuff in the Exchange." onclick="return false;" href="#">BB Code</a><a id="GM_Reload_Hlnk" title="Good for http://www.tektek.org/gaia/worth.php" onclick="return false;" href="#" style="float: right;">HTML Code</a><-Refresh-></span></center><textarea id="genlist" wrap="off" onclick="this.focus();this.select();"></textarea><br/><span id="GM_Note" style="font-size:12px;text-align:center;">Part 2 (will not fit in 1 post)</span><textarea id="genlist2" wrap="off" onclick="this.focus();this.select();"></textarea>';
getId('GM_Reload_Blnk').addEventListener("click", genBbList, false);
getId('GM_Reload_Hlnk').addEventListener("click", genHtmList, false);
//getId('items_tabview').addEventListener('DOMSubtreeModified',genBbList,false);
genBbList();