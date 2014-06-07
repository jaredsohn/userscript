// ==UserScript==
// @name          	 Battles improver [GW]
// @namespace    	 Bick
// @description      Делает более удобным граф. расположение в бою
// @include     	 http://*.ganjawars.ru/*
// ==/UserScript==

//==Configurable parameters==
max_in_column=2;	//Максимальное количество игроков в высоту (при учёте что они стоят на одной дальности)
show_opacity=1;		//Выставлять прозрачность картинок бойцов в зависимости от их видимости
first_pattern="*{nick},";	//Шаблон для вставки ника бойца в поле ввода текста, если поле было пустым
pattern="{nick},";			//Тоже самое, только если поле не было пустым. {nick} - ник персонажа на котором кликнули
random_turns=true;			//Рандомные ходы включить? true - да, false - нет.
always_different=true;		//Никогда не стерлять в одну сторону с двумя стволами.
//==/Configurable parameters==

//==Objects==
function fighter(){
	this.nick="";
	this.id=0;
	this.distance=0;
	this.side=0;
	this.hp=0;
	this.hp_max=0;
	this.visibility=0;
	this.pic="";
	this.npc=false;
	this.power=0;
	this.exp=0;
	this.deaths=0;	
	this.lvl=0;
	this.x=0;
	this.y=0;
}

function cell(){
	this.distance=0;
	this.dc_red=false;
	this.dc_blue=false;
	this.from_dc=0;
}

function show(it){
	var s=it.nick+' ['+it.lvl+']\n';
	s+='side='+it.side+'\n';
	s+='distance='+it.distance+'\n';
	s+='HP: ['+it.hp+' / '+it.hp_max+']\n';
	s+='visibility='+it.visibility+'\n';
	s+='pic='+it.pic+'\n';
	s+='npc='+it.npc+'\n';
	s+='power='+it.power+'\n';
	s+='exp='+it.exp+'\n';
	s+='deaths='+it.deaths+'\n';
	s+='x='+it.x+'\n';
	s+='y='+it.y+'\n';
	s+='\n';
	s+=it.items;
	alert(s);
}

//==/Objects==
dc_red="data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%19%00%00%00%19%08%03%00%00%00%F37uQ%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%60PLTE%E6%5D4%F8nE%E8_5%EFe%3C%F8oF%E6%5C3%F7nD%F1g%3E%F9pF%E9%607%FApG%EBa8%F6mC%F0g%3D%E7%5E4%EFf%3D%FAqG%FBqH%F7mD%EEe%3B%FBrI%F1h%3E%EAa7%E8%5E5%F3j%40%F4jA%EEd%3B%F2i%40%FCsI%E9_6%F5lC%EBb8l%D1%D9%40%00%00%01%9AIDATx%DAlRG%AE%25!%10%2B2%9D%C9%A9%80%BA%FF-%E7mG%FAk%DB%92%13%A4ZrM%EF%B9e%13q%60%DBG!%B1x%BB!esh%7B%B8U%B5%BE%B4%CCsA%D3%AB%AE%01q%93%BC%A6%9Ce%DA%1A%DD%264%E2%07%CC%93%A0%0F%C8%AE%5B%B8%02%CF%8E%EDvM*G%5Cg%06%ACM%F4%10%C7%F4%94%EAs%BC%DA%F8%15%3C%06%03%B9%8E~%9FS%B8%D1G)%F6%C3~%0D%E7%F6%19%80%D1%F7%B7%3D%C8D%B3n%07j%86W%E5vaV'%C9%D13%94%5D%D3%DA%3E%D5%3D%CB%5E%CFL%8A%FAQy%BFa%DD%B4%96%EB~%95%F6c%81%0A%AB%A1%7F%3EF%F0%B7%20%DB%03vI%C7%84%0F%EF%9B%95%1C%D5i%E7%E8x%FBV%80%F7%A7%A4%20%CA%A1%3E%9C%0FR8%C3%9D%97%85%0D%7Dq%A4Gr%17%E2%E1Q%3B%3FO%5C%B8%DF%0D%9C%2B%9Bz%E8Z%B5%3D%0C%B5%0F%C5%EB%80n%80))%10%A8n%A0%0C%FD5v%8E%F4%BCd%5B%86%CD%E4X%D1%D9%89)%ED%80mf%B8%08%17%E3%D0%D5%C8%ECg%9Fty%BBn%11_%E6%16%EF%81%C3(%3E%D6m%E5J%14%AB%7Bc%3C%05%EF%DE%18%84%DF%1A%1F6%F9l%EE%E2%C5%AE8v~%9A%8E%9D%80%DE0H%DCx%9B%DC7M%EF%F3%5E4Y%88%BF%15%20O%E1%0F%23%93%E4%02M%0BF-.%99%00%8B%8A%D9k%C19%AEa%8D%9E%23%CE%1A%10d%85%E1%9B%A6%F5%99%B6%B7%1A%BF%0Cc%5E%B3%AC%97%3D%BF%DE.AM%3A%E1%EF%FF%2F%F1O%80%01%00%0B%03%2B%EE%3D%E0%7CY%00%00%00%00IEND%AEB%60%82";
dc_green="data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%19%00%00%00%19%08%03%00%00%00%F37uQ%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%60PLTE%89%CB%3C%92%D4E%82%C55%80%C34%92%D5F%91%D4D%80%C23%93%D6F%8B%CD%3E%83%C67%90%D3C%94%D6G%85%C78%8A%CD%3D%81%C44%89%CC%3D%94%D7G%95%D7H%88%CB%3B%91%D3D%95%D8I%8B%CE%3E%84%C77%82%C45%8D%D0%40%8E%D0A%88%CA%3B%8C%CF%40%96%D9I%83%C56%8F%D2C%85%C88%BC%E0%DC%BE%00%00%01%9BIDATx%DAl%D2G%AAe1%10%03%D0r%F6%CD%CE%D9U%FB%DFe%BFi%C3%1F%0B%C1%01%09R-%B9%A6%F7B%D9%20%8C%D9%F0(%04%9B%B7%13R%B6%872%87%DBU%A9%5B%C9%BC%B6hj%D7%3D%20%20%C9%7B%C9U%96%A9%C1!M%0B%BF%60%5D%04%7D%88%EC%BA%11w%E4%D91l%F7%A2r%84%7De%98%B5A%8Fa%2CO%A9%3E%C7%AB%AC%DF%D1%CFh!%D7%D1%CFk%81%1B%7D%94b%BE%D9%EF%E1%1C%5E%11%18%7D%7F%F3%20%13%AD%8AN%E8%15_%9D%DB%3D%B3%BEH%8E%9E%A1%60M%1B%7D%AA%B8%0A%EEg%25M%FD%A8%BC%9F%B0O%DA%DBu%BFK%13%05%85%8E%BBM%FF%7C%8C%E0%EFB6%07%60I%C7%12%DF%3COVr%D0%97Y%A3%CF%D3%B7%02%BC%3F%25E(%87%FE%E6z%26%C5%2B%9Ey%1B%81%D07%9F%F4H%EEb8%FCT%CE%AFk%EE%89%2F%02%E7%DA%A4%1E%BB%D2%0D%87%A5%F6Mx%9D%A0S%C0%92%14I%E8nE%19%EAk%EC%1A%E9y%C9%B4%0C%C8%E4%D8%C1%995S%C28%DB%CA%E2%A6%B9%19%87%AEGf%3F%3E%A9%F2v%D5%C2%7C%99%DB%BCG%0E%A3%F8P%D1%C8%9D(T%F7%86p%FD%B8%DE%DA%09%BF5%BE%D9%E4%83%DC%85%9B%DDa%60~%9A%0A%9D%80%DE8%08%CEy%DA%DC%91%96%F7%197-%16%C3o%05%91%17%F8%C3%CA%249L%DB%A2%D5%9BK%06%60%A6f%E6%DE%E2%1A%F70V%AD%11V%8DS%C8%0A%C37E%FB%B3%0DQ%0F%81l%AC%7B%95%FD%B2%E7%07%B9%81%9At%E0%CF%FF%2F%F1O%80%01%00%08%AD%2B%EE%07%24%1BX%00%00%00%00IEND%AEB%60%82";
dc_blue="data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%19%00%00%00%19%08%03%00%00%00%F37uQ%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%60PLTE%92n%AB%82_%9B%80%5D%9A%89e%A2%92o%AC%91n%AA%80%5C%99%8Bg%A4%83%60%9D%93p%AC%90m%A9%85a%9E%94p%AD%8Ag%A3%81%5E%9A%89f%A3%94q%AD%95q%AE%88e%A1%91m%AA%95r%AF%8Bh%A4%84a%9D%82%5E%9B%8Dj%A6%88d%A1%8Ej%A7%8Ci%A6%96s%AF%83_%9C%8Fl%A9%85b%9E%894%B5%09%00%00%01%9CIDATx%DAl%92G%AE%251%0C%03%E5%DC%EE%E8%9Cd%5B%F7%BF%E5%BC%ED%00%7FM%10%20%AA%08%A9%96%5C%D3%7Bo%D9D%E8%D8%F6QH%2C%D6NH%D9%1C%CA%1EnU%A5.%25%F3%5C%BC%A9UW%87%B0I%5ES%CE2m%0Dn%13%1A%F1%0B%E6M0%3A%CFnX~E%96%1D%ECvM*GXw%06%ACM%8C%18%FA%F4%94%EAs%BC%CA%F8%15%3DF%03%B9%F6q%DES%B8%3Ez)%F6%C3qu%E7%F6%1D%01%E8%FB%7B%1Ed%A2Y%B7%E3z%C6W%E7va%D67%C9%3E2%94%5D%D3%DA%3E%D5%3D%CB%5E%CFL%9A%C6Q%D98a%9D%B4%96%1B~%95%C6%CB%E6%3A%AE%86%FE%F9%80%E0%EFB%B6%07%EC%92%8E%C9%3F%3CO(9%E8%DB%CE%3E%F0%F4%AD%00%1BOIQ%94C%7F8%1F%A4x%C73%2F%CB7%8C%C5%90%1E%C9%5C%0C%87G%E5%FC%BCq%E1~70%A6m%1Aq(%DDv7%D4%3E%14%AF%E3tr%98%92%22q%3D%0C%2F%5D%7D%0D%EE%9E%9E%97l%CB%B0A%F6%15%9C%9D%98%D2%8E%D8f%E6%17%E1%02%06C%F7%0C%BF%F9%A4%CA%3BT%0B%F8%82%5BlD%06%BD%F8P%B7%95%2BQ%A8%EE%0D%E1%16lxc%10~6%3El%F2%D9%CC%85%0B%AE%D0w~%9A%0A%83%80%DE%D8I%9Cx%9A%3C6M%EF%F3%5E4!%86%9F%05%9E%A7%F0%87%91I2%81%A6E%A3%17%93%20%C0%A2%06%7B-~%F7%AB%5B%A3f%0F%B3F%E4%B2B%F7M%D1%FAL%DB%5B%F7%1F%93%3E%AFY%D6%0B%CF%8F%DB%25%A8I'%FC%F9%FF%25%FE%090%00%15%5B%2B%EE%BB%40%F5%60%00%00%00%00IEND%AEB%60%82";

function addCss(cssCode) {
     var styleElement = root.document.createElement("style");
    styleElement.type = "text/css";
    if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText = cssCode;        
    } else {        
        styleElement.appendChild(document.createTextNode(cssCode));        
    }
    root.document.getElementsByTagName("head")[0].appendChild(styleElement);
}

function getPos(elem)
{  
    var w = elem.offsetWidth;
    var h = elem.offsetHeight;
    var l = 0;
    var t = 0;
    while (elem)
    {
        l += elem.offsetLeft;
        t += elem.offsetTop;
        elem = elem.offsetParent;
    }
	var x=new Array();
	x.push(l);
	x.push(t);
	x.push(w);
	x.push(h);
	return x;
}

function getWarlogBfTable(){
	var spans=root.document.getElementsByTagName('span');
	for (var i=0,l=spans.length;i<l;i++)
		if (spans[i].className=="txt"){
			spans=spans[i];
			break;
		}
	if (spans!=null){
		while (spans.tagName!="TABLE")
			spans=spans.parentNode;
		spans=spans.previousSibling;
		while (spans.tagName!="TABLE")
			spans=spans.previousSibling;
		return spans
	} else
		return null;	
}

function getNonJSBfTable(){
	var tbl=root.document.getElementsByTagName('table');
	return tbl[tbl.length-3];
}

function getJSBfTable(){
	var div=mbf1.getElementsByTagName('div');
	div=div[0];
	var table=div.getElementsByTagName('table');
	table=table[table.length-1];
	return table;
}

function parseBfData(bf){
	var tds=bf.getElementsByTagName('td');
//	alert(tds.length);
	var regex=/icons\/([^\.]+)\.gif["']? width=["']?20["']? height=["']?25["']? title=["']?([^\[]+)\[(\d+)\/(\d+)/ig;
	var fighters=new Array();
	for (var i=0,l=tds.length;i<l;i++){
		if (/title/i.test(tds[i].innerHTML)){
			//Fighter found
			var data=regex.exec(tds[i].innerHTML);
			while (data){
				var it=new fighter();
				it.distance=i;
				it.hp=data[3];
				it.hp_max=data[4];
				it.nick=data[2];
				it.nick=it.nick.substring(0,it.nick.length-1);
				it.pic=/[^_]+_(.+)/i.exec(data[1]);
				it.pic=it.pic[1];
				fighters.push(it);
				data=regex.exec(tds[i].innerHTML);
			}
		}	
	}
	return fighters;
}

function getWarlogSides(){
	var a=root.document.getElementsByTagName('a');
	for (var i=0,l=a.length;i<l;i++){
		if ((a[i].getAttribute('id')!=null)&&(a[i].getAttribute('id').indexOf('userheader')==0)){
			a=a[i];
			break;
		}
	}
	while (a.tagName!="TD")
		a=a.parentNode;
	var side=new Array();
	side[0]=a;
	side[1]=a.nextSibling.nextSibling;
	return side;
}

function getNonJSSides(){
	var a=root.document.getElementsByTagName('a');
	for (var i=0,l=a.length;i<l;i++){
		if ((a[i].getAttribute('id')!=null)&&(a[i].getAttribute('id').indexOf('userheader')==0)){
			a=a[i];
			break;
		}
	}
	while (a.tagName!="TD")
		a=a.parentNode;

	var side=new Array();
	side[0]=a;
	side[1]=a.nextSibling.nextSibling.nextSibling.nextSibling;
	return side;
}

function getJSSides(){
	var side=new Array();
	side[0]=frames.bsrc.document.getElementById('listleft');
	side[1]=frames.bsrc.document.getElementById('listright');
	if (side[0])
		return side;
	else
		return null;
}

function parseSideData(table,side,fighters){
	var div=table.getElementsByTagName('div');
	var regex_nick=/<b>([^<]+)<\/b>/i;
	var regex_id=/=(\d+)/i;
	var regex_stats=/мощность: (\d+)<br> - урон: (\d+) \(<b>(\d+)<\/b>\)<br> - видимость: (\d+)/i;
	var regex_lvl=/<b>([^<]+)<\/b><\/a>\[(\d+)\]/ig;
	var regex_items=/<li><a href=["']?http:\/\/www\.ganjawars\.ru\/item\.php\?item_id=([^"'\s]+)["']? style=["']?font-size:8pt;text-decoration:none;['"]?>([^<]+)<\/a>/ig; //'"
	var level=regex_lvl.exec(table.innerHTML);
	for (var i=0,l=div.length;i<l;i++){
		if (div[i].previousSibling.previousSibling.tagName=='B'){
			//NPC
			var nick=div[i].previousSibling.previousSibling.innerHTML;
			var id=0;
			var npc=true;
			var lvl="?";
			var items="&bull;&nbsp;Неизвестное оружие";
		} else {
			//Player
			var nick=regex_nick.exec(div[i].previousSibling.previousSibling.innerHTML);
			nick=nick[1];
			var id=regex_id.exec(div[i].previousSibling.previousSibling.getAttribute('href'));
			id=id[1];
			var npc=false;
			while ((level)&&(level[1]!=nick))
				level=regex_lvl.exec(table.innerHTML);				
			if (level)
				var lvl=level[2];
			else
				var lvl="?";
			var items="";
			var it=regex_items.exec(div[i].innerHTML);
			while (it){
				if (items!="")
					items+='<br>';
				items+='&bull;&nbsp;<a href=http://www.ganjawars.ru/item.php?item_id='+it[1]+' style="font-size:11px;text-decoration:none;">'+it[2]+'</a>';
				it=regex_items.exec(div[i].innerHTML);
			}
		}
		var data=regex_stats.exec(div[i].innerHTML);
		var j=findFighter(fighters,nick);
		//alert(fighters.length);
		fighters[j].id=id;
		fighters[j].npc=npc;
		fighters[j].power=data[1];
		fighters[j].exp=data[2];
		fighters[j].deaths=data[3];
		fighters[j].visibility=data[4];
		fighters[j].lvl=lvl;
		fighters[j].side=side;
		fighters[j].items=items;		
	}
	return fighters;
}

function createRuler(fighters){	
	var max=fighters[fighters.length-1].distance+1;
	var dc_blue=0;
	var dc_red=0;
	for (var i=1,l=fighters.length;i<l;i++){
		if (fighters[i-1].side!=fighters[i].side){
			var delta=fighters[i].distance-fighters[i-1].distance-1;
			if (delta%2==0){
				//even. 2*DC
				dc_red=fighters[i-1].distance+delta/2;
				dc_blue=fighters[i].distance-delta/2;
			} else {
				dc_red=fighters[i-1].distance+Math.floor(delta/2)+1;
				dc_blue=dc_red;
			}
			break;
		}
	}
	var tbl=root.document.createElement('table');
	tbl.setAttribute('class','table');	
	tbl.setAttribute('align','center');	
	tbl.setAttribute('id','bicksdc');
	var s1='<tr>';
	var s2='<tr>';
	var x=0;
	for (var i=0;i<max;i++){
		s1+='<td width=21 class="cell"';
		s2+='<td class="cell" onmousemove="highlightDC('+i+');" onmouseout="remHighlightDC();" id="distance'+i+'"';
		var num;
		var c=new cell();
		if (i==dc_red){
			c.dc_red=true;
			if (i==dc_blue){
				s1+=' id="dc"';
				//s2+=' id="dc"';
				c.dc_blue=true;
			}
			else {
				s1+=' id="dc_red"';
				//s2+=' id="dc_red"';
			}
		} else
			if (i==dc_blue){
				s1+=' id="dc_blue"';
				//s2+=' id="dc_blue"';
				c.dc_blue=true;
			}
		s1+='>';		
		if (dc_red>=i)
			num=dc_red-i;
		else 
			num=i-dc_blue;
		c.distance=i;
		c.from_dc=num;			
		cells.push(c);
		s2+='>'+num+'</td>';
		var nicks=':';
		var cnt=0;
		var x=0;
		var y=0;
		for (var j=0,l=fighters.length;j<l;j++){
			if (fighters[j].distance==i){
				cnt++;
				fighters[j].x=x;
				fighters[j].y=y;
				y++;
				if (y==max_in_column){
					y=0;
					x++;
				}			
			} else
			if (fighters[j].distance>i)
				break;			
		}
		var set=0;
		x=0;
		y=0;
		for (var y=0;y<max_in_column;y++){
			s1+='<nobr>';
			for (var x=0;x<(Math.floor(cnt/max_in_column)+1);x++){
				for (var j=0,l=fighters.length;j<l;j++)
					if (fighters[j].distance==i){
						if ((fighters[j].x==x)&&(fighters[j].y==y)){
							var vis=1;
							if (show_opacity==1){
								vis=fighters[j].visibility/100
								if (vis<=0.3)
									vis='0.3';
							}
							s1+='<img src=http://images.ganjawars.ru/i/icons/'+(fighters[j].side==0?'left':'right')+'_'+fighters[j].pic+'.gif width=20 height=25 onmouseover="showHint(this,fighters['+j+']);" onmouseout="hideHint();" onclick="addtoText(fighters['+j+']);" style="opacity:'+vis+'">';
						}
					}
			}
			s1+='</nobr>';
		}
		
		s1+='</td>';
		s2+='</td>';
	}
	s1+='</tr>';
	s2+='</tr>';
	tbl.innerHTML=s1+s2;
	return tbl;
}


function rnd(){
	var rand=Math.floor(Math.random()*100);
	rand=rand%3;
	rand++;
	return rand;
}
function randomTurns(){
	if (!random_turns)
		return;
	var left=rnd();
	var right=rnd();
	if (always_different)
		while(left==right)
			right=rnd();
	var def=rnd();
	el=document.getElementById("rightattack"+right);
	if (el){
		el.setAttribute('checked',"checked");
		rightattackcheck();
	}
	el=document.getElementById("leftattack"+left);
	if (el){
		el.setAttribute('checked',"checked");
		leftattackcheck();
	}
	el=document.getElementById("defence"+def);
	if (el){
		el.setAttribute('checked',"checked");
		defencecheck();
	}
	frames.bsrc.document.getElementById("bf1");
}

function showHint(obj,it){
	var pos=getPos(obj);
	var div=root.document.createElement('div');	
	div.setAttribute('style','left:'+(pos[0]+20)+';top:'+(pos[1]-50)+'px;');
	div.setAttribute('class','hint');
	div.setAttribute('id','hint');
	div.innerHTML='<a href="http://www.ganjawars.ru/info.php?id='+it.id+'" style="font-size:11px;font-weight:bold;">'+it.nick+'</a>['+it.lvl+']<br>';
	div.innerHTML+='- HP: '+it.hp+'/'+it.hp_max+'<br>';
	div.innerHTML+='- мощность: '+it.power+'<br>';
	div.innerHTML+='- урон: '+it.exp+' (<b>'+it.deaths+'</b>)<br>';
	div.innerHTML+='- видимость: '+it.visibility+'%<br>';
	div.innerHTML+=it.items;
	root.document.body.appendChild(div);
}



function hideHint(){
	root.document.body.removeChild(root.document.getElementById('hint'));	
}

function highlightDC(num){	
	for (var i=0,l=cells.length;i<l;i++){
		var d=root.document.getElementById('distance'+cells[i].distance);
		if (d){
			if (cells[i].from_dc==cells[num].from_dc)
				d.setAttribute('class','cell_dc');
			else 
				d.setAttribute('class','cell');
		}
	}
}

function remHighlightDC(){
	for (var i=0,l=cells.length;i<l;i++){
		var d=root.document.getElementById('distance'+cells[i].distance);
		if (d){
			d.setAttribute('class','cell');
		}
	}
}

function addtoText(it){
	if (root.location.href.indexOf('b0/btl.php')>0){
		id='oldm';				
	} else
	if (root.location.href.indexOf('warlog.php')>0){
		id='msg';				
	}
	var inps=root.document.getElementsByTagName('input');
	for (var i=0,l=inps.length;i<l;i++){
		if (inps[i].getAttribute('name')==id){
			inps=inps[i];
			break;
		}
	}
	var txt=inps.value;
	if (txt.length==0){
		var tmp=first_pattern.replace(/{nick}/ig,it.nick);	
	} else 
		var tmp=pattern.replace(/{nick}/ig,it.nick);	
	txt+=tmp;
	inps.setAttribute('value',txt);
}


function findFighter(fighters,nick){
	for (var i=0,l=fighters.length;i<l;i++){
		if (fighters[i].nick==nick)
			return i;
	}
	return null;
}

(function() {
	root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;  	
	addCss('.cell {background: url(http://images.ganjawars.ru/q/w.gif); border:1px #111 dotted;text-align:center;font-weight:bold;}');
	addCss(".cell_dc {background: url(\""+dc_green+"\"); border:1px #111 dotted;text-align:center;font-weight:bold;}");
	addCss('.info {background-color:#d0eed0; }');
	addCss('.table {border-collapse:collapse;border:1px #000 dotted;}');	
	addCss("#dc_red {background:url(\""+dc_red+"\")");
	addCss("#dc_blue {background:url(\""+dc_blue+"\")");
	addCss("#dc {background:url(\""+dc_green+"\")");
	addCss('#space {width:20px;}');		
	addCss('.hint {position:absolute;float:left;background-color:#fff;border:1px #009900 dashed;font-size:11px;padding:3px;}');		
	
	if (root.location.href.indexOf('b0/btl.php')>0){
		//if JS version of battle
		up=updatebf+' ';
		up=up.replace(/\n/ig,' ');
		up=/function updatebf\(\) {(.*?)}/i.exec(up);
		mbf1='';
		mbf2='';
		sides='';
		fighters=new Array();
		fighters2=new Array();
		cells=new Array();
		tbl='';
		updatebf=function(){
			eval(up[1]);
			mbf1=frames.bsrc.document.getElementById("bf1");
			mbf2=frames.bsrc.document.getElementById("bf2");
			mbf2.innerHTML+=bf3;
		}
//		make=makebf+' ';
//		make=make.replace(/\n/ig,' ');
//		make=/function makebf\(\) {(.*?)}/i.exec(make);
		makebf=function(){
			var cell=root.document.getElementById("bf");
			if (cell.hasChildNodes()){
			    while (cell.childNodes.length>= 1){
			        cell.removeChild(cell.firstChild);       
    			} 
			}
			var table=getJSBfTable();			
			if (waitforturn==1) {
				cell.appendChild(mbf2);
				cell.appendChild(tbl);
			} else {
				//fighters=new Array();
				fighters2=parseBfData(table);
				if (fighters2.length>0){
					fighters=fighters2;
					var sides=getJSSides();
					fighters=parseSideData(sides[0],0,fighters);
					fighters=parseSideData(sides[1],1,fighters);
					cells=new Array();
					
					tbl=createRuler(fighters);
					cell.appendChild(mbf1);
					table.parentNode.insertBefore(tbl,table);
					table.parentNode.removeChild(table);
					randomTurns();
				} else {
					root.location.reload();
					//frames.bsrc.window.location.href='btk.php?bid=1099098809&turn='+turn+'&lines='+LinesCounter+'&btime='+BattleTime+'&ctime='+ChatTime;
				}
			}
		}
		updatebf();
		makebf();
	} else
	if (root.location.href.indexOf('b0/b.php')>0){
		//if nonJS version of battle
		var table=getNonJSBfTable();
		fighters=parseBfData(table);
		var sides=getNonJSSides();
		fighters=parseSideData(sides[0],0,fighters);
		fighters=parseSideData(sides[1],1,fighters);
		cells=new Array();
		var tbl=createRuler(fighters);
		table.parentNode.insertBefore(tbl,table);
		table.parentNode.removeChild(table);
		randomTurns();
	} else	
	if (root.location.href.indexOf('warlog.php')>0){
		//if Watching for the battle
		var table=getWarlogBfTable();
		fighters=parseBfData(table);
		var sides=getWarlogSides();
		fighters=parseSideData(sides[0],0,fighters);
		fighters=parseSideData(sides[1],1,fighters);
		cells=new Array();
		var tbl=createRuler(fighters);
		table.parentNode.insertBefore(tbl,table);
		table.parentNode.removeChild(table);
			}
})();