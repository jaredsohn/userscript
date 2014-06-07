// ==UserScript==
// @name             Rent-a-Master.Part1.Board [GW]
// @include			 http://www.ganjawars.ru/*
// @version          1.00
// @author           Bick
// ==/UserScript==

var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
root.Board={};

root.Board.Get=function()
{
	var d=localStorage.getItem('rAm_board_items');
	if (d)
		return JSON.parse(d);
	else
		return [];
}

root.Board.Remember=function()
{
	var tr=root.document.createElement('tr');
	var td1=root.document.createElement('td');
	td1.setAttribute('class',"wb");
	td1.setAttribute('style',"background:#d0eed0; text-align:right;");
	td1.innerHTML="Цена 2+ дня:";
	var td2=root.document.createElement('td');
	td2.setAttribute('class',"wb");
	td2.setAttribute('colspan',3);
	td2.innerHTML='<input type=text id="board.price" size=8 value=0> Гб';
	tr.appendChild(td1);
	tr.appendChild(td2);
	var td=root.document.getElementsByTagName('td');
	var parent=null;
	for (var i=0,l=td.length;i<l;i++)
		if (/Прочность/i.test(td[i].innerHTML))
			parent=td[i];
	parent.parentNode.parentNode.insertBefore(tr,parent.parentNode);
	root.document.forms[0].onsubmit=function()
	{
		var list=root.Board.Get();
		var item=/Предмет:<\/td><td colspan="3" class="wb"><a href="\/item\.php\?item_id=([^"]+)"><b>([^<]+)/i.exec(root.document.body.innerHTML);
		var action=/Действие:<\/td><td colspan="3" class="wb">([^<]+)/i.exec(root.document.body.innerHTML);
		var d=new Date();
		list.push({id:item[1],name:item[2],action:action[1],time:d.valueOf(),price:root.document.forms.gogogo.price.value,price2:root.document.getElementById('board.price').value,term:root.document.forms.gogogo.date_len.value,dur1:(root.document.forms.gogogo.durability1.value!=''?root.document.forms.gogogo.durability1.value:0),dur2:root.document.forms.gogogo.durability2.value,end:(d.valueOf()*1+86400000*root.document.forms.gogogo.date_len.value),link:location.href});
		localStorage.setItem('rAm_board_items',JSON.stringify(list));
		return true;
	}
}

root.Board.Show=function()
{
	var now=new Date();
	var list=root.Board.Get();
	var tmp=[];
	for (var i=0,l=list.length;i<l;i++)
		if (list[i].end>now.valueOf())
			tmp.push(list[i]);
	list=tmp;
	var tr=root.document.getElementsByTagName('td');
	for (var i=0,l=tr.length;i<l;i++)
		if (tr[i].getAttribute('colspan')==7)
			tr[i].setAttribute('colspan',10);
	var tr=root.document.getElementsByTagName('tr');
	var parent=null;
	for (var i=0,l=tr.length;i<l;i++)
		if (/<td class="wb" align="center">Isl<\/td>/i.test(tr[i].innerHTML))
			parent=tr[i];
	parent.innerHTML='<td class=wb align=center>Предмет</td> <td class=wb align=center>Действие</td> <td class=wb align=center>Цена</td>';
	parent.innerHTML+='<td class=wb align=center>Цена 2</td>';
	parent.innerHTML+=' <td class=wb align=center>Прочность</td> <td class=wb align=center>Mod</td> <td class=wb align=center>Isl</td> <td class=wb align=center>Удаление</td>';	
	parent.innerHTML+='<td class=wb align=center>Осталось</td><td class=wb align=center></td>';	
	for (var i=0,l=tr.length;i<l;i++)
		if (/удалить объявление/i.test(tr[i].innerHTML))
		{
			var it=tr[i];
			var name=it.childNodes[0].innerHTML;
			var action=it.childNodes[1].innerHTML;
			var price=/<b>([^\$]+)\$<\/b>/i.exec(it.childNodes[2].innerHTML);
			price=price[1].replace(/,/g,'');
			var dur1=/(\d+)\/(\d+)/i.exec(it.childNodes[4].innerHTML);
			var dur2=dur1[2];
			dur1=dur1[1];
			var id=/market-l\.php\?del=(\d+)/i.exec(it.childNodes[8].innerHTML);
			it.childNodes[8].innerHTML='[ <a href=/market-l.php?del='+id[1]+' style="color:#AA0000" onclick="Board.DelItem('+id[1]+');">удалить объявление</a> ]';
			for (var j=0,k=list.length;j<k;j++)
				if ((name.indexOf(list[j].name)>=0)&&(list[j].action==action)&&(list[j].price==price))
				{
					list[j].del=id[1];
					var td1=root.document.createElement('td');
					td1.className='wb';
					td1.innerHTML='<b>'+list[j].price2+'$</b>';
					it.insertBefore(td1,it.childNodes[4]);
					var delta=Math.round((list[j].end-now.valueOf())/1000);
					var days=Math.floor(delta/86400);
					delta=delta-days*86400;
					var hours=Math.floor(delta/3600);
					delta=delta-hours*3600;
					var minutes=Math.floor(delta/60);
					delta=delta-minutes*60;
					var td2=root.document.createElement('td');
					td2.className='wb';
					td2.innerHTML='<b>'+days+'д. '+hours+'ч. '+minutes+'м. '+delta+'с.</b>';
					it.appendChild(td2);
					var td3=root.document.createElement('td');
					td3.innerHTML='<span style="font-weight:bold;cursor:pointer" onclick="Board.ShowEdit('+j+');">[Изм.]</span> <span style="font-weight:bold;cursor:pointer" onclick="Board.ProLong('+j+');">[Прод.]</span>';
					td3.className='wb';
					it.appendChild(td3);
					var link=list[j].link.replace('market-p','market');
					it.childNodes[0].innerHTML='<a href="'+link+'&island=1" target=blank><b>'+name+'</b></a> <a href=http://www.ganjawars.ru/item.php?item_id='+list[j].id+' target=blank><b>[i]</b></a>';					
					break;
				}
		}
		localStorage.setItem('rAm_board_items',JSON.stringify(list));
}

root.Board.ShowEdit=function(ind)
{
	var list=root.Board.Get();
	list=list[ind];
	var obj=root.document.getElementById('board.edit');
	if (!obj)
	{
		obj=root.document.createElement('table');
		obj.setAttribute('align','center');
		obj.setAttribute('style','border-collapse:collapse; width:400px');
		obj.setAttribute('id','board.edit');
		obj.innerHTML='<tr><td class=wb bgcolor=#d0eed0 colspan=2 align=center><b>Изменение объявления</b></td></tr>';
		obj.innerHTML+='<tr><td class=wb width=50% align=right><b>Цена:</b></td><td class=wb align=center><input type=text id="board.edit.price" style="width:95%" value="'+list.price+'"></td></tr>';
		obj.innerHTML+='<tr><td class=wb width=50% align=right><b>Цена 2:</b></td><td class=wb align=center><input type=text id="board.edit.price2" style="width:95%" value="'+list.price2+'"></td></tr>';
		obj.innerHTML+='<tr><td class=wb width=50% align=right><b>Срок размещения:</b></td><td class=wb align=center><select id="board.edit.term" style="width:95%"><option value=1>Один день</option><option value=2>Два дня</option><option value=3 selected>Три дня</option></select></td></tr>';
		obj.innerHTML+='<tr><td class=wb colspan=2 align=center><button onclick="Board.Save('+ind+');" id="board.edit.submit">Сохранить</button></td></tr>';
		root.document.body.appendChild(root.document.createElement('br'));
		root.document.body.appendChild(obj);
	}
}

root.Board.Save=function(ind)
{
	var list=root.Board.Get();
	list=list[ind];
	frame=root.document.createElement('iframe');
	frame.setAttribute('src','http://www.ganjawars.ru/market-l.php?del='+list.del);
	root.Board.action='del';
	root.Board.link=list;
	root.Board.ind=ind;
	frame.setAttribute('style','display:none;position:absolute;top:0;');
	root.document.body.appendChild(frame);
	frame.onload=function()
	{
		var body=frame.contentWindow.document;
		if (root.Board.action=='del')
		{
			root.Board.action='post';
			frame.contentWindow.location.href=root.Board.link.link;
		}
		else if (root.Board.action=='post')
		{
			root.Board.action='';
			body.forms.gogogo.price.value=root.document.getElementById('board.edit.price').value;
			body.getElementById('board.price').value=root.document.getElementById('board.edit.price2').value;
			body.forms.gogogo.durability1.value=root.Board.link.dur1;
			body.forms.gogogo.durability2.value=root.Board.link.dur2;
			body.forms.gogogo.date_len.value=root.document.getElementById('board.edit.term').value;;
			var list=root.Board.Get();
			var tmp=[];
			for (var i=0,l=list.length;i<l;i++)
				if (i!=root.Board.ind)
					tmp.push(list[i]);
			list=tmp;
			var item=/Предмет:<\/td><td colspan="3" class="wb"><a href="\/item\.php\?item_id=([^"]+)"><b>([^<]+)/i.exec(body.body.innerHTML);
			var action=/Действие:<\/td><td colspan="3" class="wb">([^<]+)/i.exec(body.body.innerHTML);
			var d=new Date();
			list.push({id:item[1],name:item[2],action:action[1],time:d.valueOf(),price:body.forms.gogogo.price.value,price2:body.getElementById('board.price').value,term:body.forms.gogogo.date_len.value,dur1:body.forms.gogogo.durability1.value,dur2:body.forms.gogogo.durability2.value,end:(d.valueOf()*1+86400000*body.forms.gogogo.date_len.value),link:root.Board.link.link});
			localStorage.setItem('rAm_board_items',JSON.stringify(list));
			body.forms.gogogo.submit();
		}
		else
		{
			location.href=location.href;
		}
	}
}

root.Board.ProLong=function(ind)
{
	root.Board.ShowEdit(ind);
	root.document.getElementById('board.edit.submit').click();
}

root.Board.DelItem=function(del)
{
	
	var list=root.Board.Get();
	var tmp=[];
	for (var i=0,l=list.length;i<l;i++)
		if (list[i].del!=del)
			tmp.push(list[i]);
	list=tmp;
	localStorage.setItem('rAm_board_items',JSON.stringify(list));
}


if (location.href.indexOf('market-p.php?stage=2')>0)
	root.Board.Remember();
if (location.href.indexOf('market-l.php')>0)
	root.Board.Show();

