// ==UserScript==
// @name           Travian Riepilogo Villaggi - Travian Villages Summary
// @namespace      travian_riepilogo_villaggi
// @include        http://s*.travian.*/dorf3.php*
// ==/UserScript==
// [VERSION]127[/VERSION]
/* [DETAILS]Now you can view the time remaining to a building![/DETAILS] */
var country=window.location.host.toLowerCase().split("travian.")[1];
var _cur_version=127;
var _value;
var _max_vill=0;
var _cur_vill=0;
var _percento_max=0;
var _percento_cur=0;
var _graficpack=detectGraficPack();
// IMMAGINI
var _images=new Array();
_images['ris1']=_graficpack+'img/un/r/1.gif';
_images['ris2']=_graficpack+'img/un/r/2.gif';
_images['ris3']=_graficpack+'img/un/r/3.gif';
_images['ris4']=_graficpack+'img/un/r/4.gif';
_images['att1']=_graficpack+'img/un/a/att1.gif';
_images['att2']=_graficpack+'img/un/a/att2.gif';
_images['def1']=_graficpack+'img/un/a/def1.gif';
_images['def2']=_graficpack+'img/un/a/def2.gif';
_images['loading']='data:image/gif;base64,R0lGODlhEAAQAPQAAP%2F%2F%2FwAAAPDw8IqKiuDg4EZGRnp6egAAAFhYWCQkJKysrL6%2BvhQUFJycnAQEBDY2NmhoaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH%2BGkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAAFdyAgAgIJIeWoAkRCCMdBkKtIHIngyMKsErPBYbADpkSCwhDmQCBethRB6Vj4kFCkQPG4IlWDgrNRIwnO4UKBXDufzQvDMaoSDBgFb886MiQadgNABAokfCwzBA8LCg0Egl8jAggGAA1kBIA1BAYzlyILczULC2UhACH5BAAKAAEALAAAAAAQABAAAAV2ICACAmlAZTmOREEIyUEQjLKKxPHADhEvqxlgcGgkGI1DYSVAIAWMx%2BlwSKkICJ0QsHi9RgKBwnVTiRQQgwF4I4UFDQQEwi6%2F3YSGWRRmjhEETAJfIgMFCnAKM0KDV4EEEAQLiF18TAYNXDaSe3x6mjidN1s3IQAh%2BQQACgACACwAAAAAEAAQAAAFeCAgAgLZDGU5jgRECEUiCI%2ByioSDwDJyLKsXoHFQxBSHAoAAFBhqtMJg8DgQBgfrEsJAEAg4YhZIEiwgKtHiMBgtpg3wbUZXGO7kOb1MUKRFMysCChAoggJCIg0GC2aNe4gqQldfL4l%2FAg1AXySJgn5LcoE3QXI3IQAh%2BQQACgADACwAAAAAEAAQAAAFdiAgAgLZNGU5joQhCEjxIssqEo8bC9BRjy9Ag7GILQ4QEoE0gBAEBcOpcBA0DoxSK%2Fe8LRIHn%2Bi1cK0IyKdg0VAoljYIg%2BGgnRrwVS%2F8IAkICyosBIQpBAMoKy9dImxPhS%2BGKkFrkX%2BTigtLlIyKXUF%2BNjagNiEAIfkEAAoABAAsAAAAABAAEAAABWwgIAICaRhlOY4EIgjH8R7LKhKHGwsMvb4AAy3WODBIBBKCsYA9TjuhDNDKEVSERezQEL0WrhXucRUQGuik7bFlngzqVW9LMl9XWvLdjFaJtDFqZ1cEZUB0dUgvL3dgP4WJZn4jkomWNpSTIyEAIfkEAAoABQAsAAAAABAAEAAABX4gIAICuSxlOY6CIgiD8RrEKgqGOwxwUrMlAoSwIzAGpJpgoSDAGifDY5kopBYDlEpAQBwevxfBtRIUGi8xwWkDNBCIwmC9Vq0aiQQDQuK%2BVgQPDXV9hCJjBwcFYU5pLwwHXQcMKSmNLQcIAExlbH8JBwttaX0ABAcNbWVbKyEAIfkEAAoABgAsAAAAABAAEAAABXkgIAICSRBlOY7CIghN8zbEKsKoIjdFzZaEgUBHKChMJtRwcWpAWoWnifm6ESAMhO8lQK0EEAV3rFopIBCEcGwDKAqPh4HUrY4ICHH1dSoTFgcHUiZjBhAJB2AHDykpKAwHAwdzf19KkASIPl9cDgcnDkdtNwiMJCshACH5BAAKAAcALAAAAAAQABAAAAV3ICACAkkQZTmOAiosiyAoxCq%2BKPxCNVsSMRgBsiClWrLTSWFoIQZHl6pleBh6suxKMIhlvzbAwkBWfFWrBQTxNLq2RG2yhSUkDs2b63AYDAoJXAcFRwADeAkJDX0AQCsEfAQMDAIPBz0rCgcxky0JRWE1AmwpKyEAIfkEAAoACAAsAAAAABAAEAAABXkgIAICKZzkqJ4nQZxLqZKv4NqNLKK2%2FQ4Ek4lFXChsg5ypJjs1II3gEDUSRInEGYAw6B6zM4JhrDAtEosVkLUtHA7RHaHAGJQEjsODcEg0FBAFVgkQJQ1pAwcDDw8KcFtSInwJAowCCA6RIwqZAgkPNgVpWndjdyohACH5BAAKAAkALAAAAAAQABAAAAV5ICACAimc5KieLEuUKvm2xAKLqDCfC2GaO9eL0LABWTiBYmA06W6kHgvCqEJiAIJiu3gcvgUsscHUERm%2BkaCxyxa%2BzRPk0SgJEgfIvbAdIAQLCAYlCj4DBw0IBQsMCjIqBAcPAooCBg9pKgsJLwUFOhCZKyQDA3YqIQAh%2BQQACgAKACwAAAAAEAAQAAAFdSAgAgIpnOSonmxbqiThCrJKEHFbo8JxDDOZYFFb%2BA41E4H4OhkOipXwBElYITDAckFEOBgMQ3arkMkUBdxIUGZpEb7kaQBRlASPg0FQQHAbEEMGDSVEAA1QBhAED1E0NgwFAooCDWljaQIQCE5qMHcNhCkjIQAh%2BQQACgALACwAAAAAEAAQAAAFeSAgAgIpnOSoLgxxvqgKLEcCC65KEAByKK8cSpA4DAiHQ%2FDkKhGKh4ZCtCyZGo6F6iYYPAqFgYy02xkSaLEMV34tELyRYNEsCQyHlvWkGCzsPgMCEAY7Cg04Uk48LAsDhRA8MVQPEF0GAgqYYwSRlycNcWskCkApIyEAOwAAAAAAAAAAAA%3D%3D';
_images['loading_bar']='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAPCAIAAABSnclZAAAAB3RJTUUH2AoHCDoPXtuGqgAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAARnQU1BAACxjwv8YQUAAAEdSURBVHjaZVBLSgVBDMyvfzODWy/jPb2B4EFEcOvGvRsFN8+FY/8SMw9B1CzShKpUqgtvHp4JkQgJGAUFcILpMMWpagR/CxF/BvoH/hplH92Fz2XUobPonGqmc0wDqftghm8Gk7CjNo+moCbvn/WwJuTWQkAnHNg8r6vK2+nDURZfl+DeQxhjuLr649u3d0+HakCRGIVyyq21PrW35iw5fVRHxeEEQYOba/UM196HiogbYonMJeKW/WvinrT6MWOQ5ARmKgmXwlsIHbV7GjYBaXbJMXKKsiZbkwu4eVUPl6Z3YVlLxhJly7gk23LuhoZqrADNb69lwRxwibBlu0i5eqw8bVeE0AZeP75QoRllz+E10D3BVdPLOmMf2PQLZtmdSOnXhpAAAAAASUVORK5CYII=';

// LINGUE
switch(country){
	default:
		L = new Array();
		L['village'] = 'Village';
		L['rank']='Rank';
		L['troops']='Troops';
		L['building']='Build';
		L['in_building']='in building';
		L['none']='<span class="c">None</span>';
		L['n/d']='<span class="c">N/D</span>';
		L['loading']='Loading...';
		L['legend_1']='The Warehouse  is going to be full.';
		L['legend_2']='The Warehouse  is full.';
		L['new_version']='A new version of this script is available!';
		L['status']='Status';
		L['att1']='Incoming attacks';
		L['att2']='Outgoing attacks';
		L['def1']='Incoming reinforcements';
		L['def2']='Sent reinforcements'; 
	break;
	case 'it':
		L = new Array();
		L['village'] = 'Villaggio';
		L['rank']='Rank';
		L['troops']='Truppe';
		L['building']='Cost.';
		L['in_building']='in cost...';
		L['none']='<span class="c">Nessuno</span>';
		L['n/d']='<span class="c">N/D</span>';
		L['loading']='Caricamento...';
		L['legend_1']='Il magazzino/granaio &egrave; quasi pieno.';
		L['legend_2']='Il magazzino/granaio &egrave; pieno.';
		L['new_version']='Una nuova versione di questo script &egrave; disponibile!';
		L['status']='Stato';
		L['att1']=' Attacchi in arrivo.';
		L['att2']=' Attacchi in viaggio.';
		L['def1']=' Difese in arrivo.';
		L['def2']=' Difese in viaggio.';
	break;
	case 'fr':
		L=new Array();
		L['village'] = 'Village';
		L['rank'] = "Classement";
		L['troops'] =' troupes';
		L['building'] = "Construct.";
		L['in_building'] = 'en constr. ...';
		L['none']='<span class="c"> Aucun </span>';
		L['n/d']='<span class="c"> N / A </span>';
		L['loading'] = 'Chargement ...';
		L['legend_1'] = "L'entrepôt / grange est presque plein ".
		L['legend_2'] = "L'entrepôt / grange est pleine. ";
		L['new_version'] = 'Une nouvelle version de ce script est disponible!';
		L['status'] ='Situation';
		L['att1'] = 'attaques';
		L['att2'] = 'attaques';
		L['DEF1'] = 'défenses';
		L['def2'] = 'défenses'; 
	break;
		case 'sk': // by chrono-t
		L = new Array();
		L['village'] = 'Dedina';
		L['rank'] = 'Rank';
		L['troops'] = 'Jednotky';
		L['building'] = 'Stavba';
		L['in_building'] = 'vo výstavbe';
		L['none'] = '<span class="c">Žiadne</span>';
		L['n/d'] = '<span class="c">Nedostupné</span>';
		L['loading'] = 'Načítavam...';
		L['legend_1'] = 'Sklad alebo sýpka je takmer plná.';
		L['legend_2'] = 'Sklad alebo sýpka je plná.';
		L['new_version'] = 'Je dostupná nová verzia tohoto skriptu.';
		L['status'] = 'Stav';
		L['att1'] = ' Prichádzajúce útoky';
		L['att2'] = ' Vyslané útoky';
		L['def1'] = ' Prichádzajúca podpora';
		L['def2'] = ' Vyslaná podpora';
	break;
	//Hungarian translation by nabu - huntoxic@gmail.com
	case 'hu':
		L = new Array();
		L['village'] = 'Falu';
		L['rank']='Rang';
		L['troops']='Csapatok';
		L['building']='Építés';
		L['in_building']='épp épül';
		L['none']='Semmi';
		L['n/d']='n/a';
		L['loading']='Betöltés...';
		L['legend_1']='A raktár nemsokára betelik!.';
		L['legend_2']='A raktár betelt';
		L['new_version']='Új verzió elérhető!';
		L['status']='Állapot';
		L['att1']='Bejövő támadások';
		L['att2']='Kimenő támadások';
		L['def1']='Bejövő támogatások';
		L['def2']='Kiküldött támogatások';
	break;
	//German translation by nabu - huntoxic@gmail.com
	case 'de':
		L = new Array();
		L['village'] = 'Dorf';
		L['rank']='Rang';
		L['troops']='Truppen';
		L['building']='Bauen';
		L['in_building']=' wird jetzt gebaut';
		L['none']='Nichts';
		L['n/d']='n/a';
		L['loading']='Lade...';
		L['legend_1']='Der Rohstofflager wird bald voll!.';
		L['legend_2']='Der Rohstofflager ist voll';
		L['new_version']='Aine neue Version kann man herunterladen!';
		L['status']='Status';
		L['att1']='Einkommende Angriffe';
		L['att2']='Ausgehende Angriffe';
		L['def1']='Einkommende Unterstützungen';
		L['def2']='Ausgehende Unterstützungen';
	break;
	case 'ir':
		L = new Array();
		L['village'] = 'دهکده';
		L['rank']='رتبه';
		L['troops']='لشکریان';
		L['building']='ساخت';
		L['in_building']='در دست ساخت';
		L['none']='هیچ';
		L['n/d']='خالی';
		L['loading']='بارگزاری...';
		L['legend_1']='انباردر حال پر شدن است.';
		L['legend_2']='انبار پر شده است.';
		L['new_version']='نسخه جدید سکریپت در دسترس می باشد!';
		L['status']='وضعیت';
		L['att1']='حملات در جریان به سوی شما';
		L['att2']='حملات در حال انجام';
		L['def1']='نیرو های پشتیبانی در حال آمدن';
		L['def2']='نیرو های پشتیبانی در حال ارسال';
	break;
  	//Poland translation by Klusek - smoofster@gmail.com
	case 'pl':
		L = new Array();
		L['village'] = 'Osady';
		L['rank']='Rank';
		L['troops']='Jednostki';
		L['building']='Budowa';
		L['in_building']=' W budowie';
		L['none']='None';
		L['n/d']='N/D';
		L['loading']='Wczytywanie...';
		L['legend_1']='Magazyn bedzie pełny.';
		L['legend_2']='Magazyn jest pełny.';
		L['new_version']='Nowa wersja skryptu jest dostępna!';
		L['status']='Status';
		L['att1']=' Wracające ataki';
		L['att2']=' Wysłane Ataki';
		L['def1']=' Wracające posiłki';
		L['def2']=' Wysłane posiłki';
	break;
	case 'bg': // by Mitko
		L = new Array();
		L['village'] = 'Град';
		L['rank']='Ранк';
		L['troops']='Войници';
		L['building']='Сгради';
		L['in_building']='в строеж';
		L['none']='Няма';
		L['n/d']='N/D';
		L['loading']='Зареждане...';
		L['legend_1']='Склада скоро ще е пълен.';
		L['legend_2']='Склада е пълен.';
		L['new_version']='Нова версия!';
		L['status']='Статус';
		L['att1']='Атака';
		L['att2']='Атака';
		L['def1']='Подкрепление';
		L['def2']='Подкрепление';
	break;
	case 'nl':
		L = new Array();
		L['village'] = 'Dorp';
		L['rank']='Rang';
		L['troops']='Troepen';
		L['building']='Bouwen';
		L['in_building']='wordt gebouwd';
		L['none']='Niks';
		L['n/d']='N/A';
		L['loading']='Laden...';
		L['legend_1']='Het pakhuis is binnenkort vol!';
		L['legend_2']='Het pakhuis is vol!';
		L['new_version']='Een nieuwe versie is hier te downloaden';
		L['status']='Status';
		L['att1']='Binnenkomende aanvallen';
		L['att2']='Uitgaande aanvallen';
		L['def1']='Binnenkomende versterkingen';
		L['def2']='Uitgaande versterkingen'; 
	break;
	case 'pt':
		L = new Array();
		L['village'] = 'Aldeia';
		L['rank']='Rank';
		L['troops']='Tropas';
		L['building']='Construir';
		L['in_building']='em construção';
		L['none']='Nenhuma';
		L['n/d']='N/D';
		L['loading']='Carregando...';
		L['legend_1']='O armazém vai estar cheio.';
		L['legend_2']='O armazém está cheio.';
		L['new_version']='Uma nova versão desse script está disponível!';
		L['status']='Status';
		L['att1']='Ataques recebidos';
		L['att2']='Ataques efetuados';
		L['def1']='Reforços recebidos';
		L['def2']='Reforços enviados';
	break;
	case 'br':
		L = new Array();
		L['village'] = 'Aldeia';
		L['rank']='Rank';
		L['troops']='Tropas';
		L['building']='Construir';
		L['in_building']='em construção';
		L['none']='Nenhuma';
		L['n/d']='N/D';
		L['loading']='Carregando...';
		L['legend_1']='O armazém vai estar cheio.';
		L['legend_2']='O armazém está cheio.';
		L['new_version']='Uma nova versão desse script está disponível!';
		L['status']='Status';
		L['att1']='Ataques recebidos';
		L['att2']='Ataques efetuados';
		L['def1']='Reforços recebidos';
		L['def2']='Reforços enviados';
	break;
	case 'tw':
		L = new Array();
		L['village'] = '村莊';
		L['rank']='名次';
		L['troops']='軍隊';
		L['building']='建築';
		L['in_building']='升級中';
		L['none']='None';
		L['n/d']='N/D';
		L['loading']='載入中...';
		L['legend_1']='倉庫將滿.';
		L['legend_2']='倉庫已滿.';
		L['new_version']='有新版可更新!';
		L['status']='狀態';
		L['att1']='敵軍來襲';
		L['att2']='出兵攻擊';
		L['def1']='增援軍隊中';
		L['def2']='援軍抵達中';
	break;
}

// INIZIA
function wordwrap( str, int_width, str_break, cut ) {
    var m = ((arguments.length >= 2) ? arguments[1] : 75   );
    var b = ((arguments.length >= 3) ? arguments[2] : "\n" );
    var c = ((arguments.length >= 4) ? arguments[3] : false);

    var i, j, l, s, r;

    str += '';

    if (m < 1) {
        return str;
    }

    for (i = -1, l = (r = str.split("\n")).length; ++i < l; r[i] += s) {
        for(s = r[i], r[i] = ""; s.length > m; r[i] += s.slice(0, j) + ((s = s.slice(j)).length ? b : "")){
            j = c == 2 || (j = s.slice(0, m + 1).match(/\S*(\s)?$/))[1] ? m : j.input.length - j[0].length || c == 1 && m || j.input.length + (j = s.slice(m).match(/^\S*/)).input.length;
        }
    }

    return r.join("\n");
}

function reversed(string){
	var s=string.split('');
	s=s.reverse();
	s=s.join('');
	return s;
}

function percentualedi(a,b){
	var p=a/b;
	p=p*100;
	return Math.floor(p);
}

function xpath(query, object) {
	if(!object) var object = document;
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function getActiveVillage() {
	var oActiveLink = xpath("//td[@class='dot hl']");
	if(oActiveLink.snapshotLength > 0) {
		var sHref = oActiveLink.snapshotItem(0).parentNode.getElementsByTagName('A')[0].href;
		var aMatch = sHref.match(/newdid=([0-9]*)/i);
		if(!aMatch) {
			return false;
		} else {
			return aMatch[1];
		}
	} else {
	    return false;
	}
}


function AJAX_GET(url, recall){
GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: recall
});	
}

function _img(id,title){
	if(typeof(title)=='undefined'){
		return '<img src="'+_images[id]+'" border="0" alt="" />';
	}else{
		return '<img src="'+_images[id]+'" title="'+title+'" border="0" alt="" />';
	}
}

function GetVillages(){
	var villages=xpath("/html/body/div[3]/div[3]/table/tbody/tr/td[@class='link']/a");
	var ret=[];
	for(i=0;i<villages.snapshotLength;i++){
		var n=ret.length;
		ret[n]=[villages.snapshotItem(i).innerHTML,villages.snapshotItem(i).href.split('newdid=')[1]];
	}
	return ret;
}

function GetResources(text,t){
		var cont=text.split('<td id="l'+(5-t)+'" title="')[1];
		cont=cont.split('/')[0];
		cont=cont.split('>')[1];
		return cont;
}

function GetCapacita(text,t){
		var cont=text.split('<td id="l'+(5-t)+'" title="')[1];
		cont=cont.split('/')[1];
		cont=cont.split('<')[0];
		return cont;
}

function GetTroops(text){
	var cont=text.split('<img class="unit ');
	var ret=new Array();
	for(i=1;i<cont.length;i++){
		var n=0;
		n=cont[i].split('class="num">')[1];
		n=n.split('</td>')[0];
		var num=ret.length;
		ret[num]=new Array();
		ret[num]['type']=cont[i].split(".")[0];
		ret[num]['nume']=n;
	}
	return ret;
}

function GetCostruzioni(text){
	var c=text.split('<img src="img/x.gif" class="del" title="');
	c=c.length-1;
	return c;
}

function GetCostruzioniTime(text){
	var c=text.split('<img src="img/x.gif" class="del" title="');
	if(c.length>1){
		return c[1].split('</span>')[0].split('<span')[1].split('>')[1];
	}else{
		return '';
	}
}

function GetArrivRinf(text){
	var c=text.split('<img src="img/x.gif" class="def1"');
	var n=0;
	for(i=1;i<c.length;i++){
		var ca=c[i].split('<div class="mov"><span class="d1">')[1];
		ca=ca.split('&nbsp;')[0];
		n+=parseInt(ca);
	}
	return n;
}

function GetAndanRinf(text){
	var c=text.split('<img src="img/x.gif" class="def2"');
	var n=0;
	for(i=1;i<c.length;i++){
		var ca=c[i].split('<div class="mov"><span class="d2">')[1];
		ca=ca.split('&nbsp;')[0];
		n+=parseInt(ca);
	}
	return n;
}

function GetArrivAttac(text){
	var c=text.split('<img src="img/x.gif" class="att1"');
		var n=0;
	for(i=1;i<c.length;i++){
		var ca=c[i].split('<div class="mov"><span class="a1">')[1];
		ca=ca.split('&nbsp;')[0];
		n+=parseInt(ca);
	}
	return n;
}

function GetAndanAttac(text){
	var c=text.split('<img src="img/x.gif" class="att2"');
	var n=0;
	for(i=1;i<c.length;i++){
		var ca=c[i].split('<div class="mov"><span class="a2">')[1];
		ca=ca.split('&nbsp;')[0];
		n+=parseInt(ca);
	}
	return n;
}

function AddTable(){
	var table=xpath("//*[@id='overview']").snapshotItem(0);
	
	table.innerHTML='';
	var table_html='';
	
	_vill=GetVillages();
	
	table_html+='<tr class="rbg"><td>'+L['village']+'</td><td>'+L['building']+'</td><td>'+_img('ris1')+'</td><td>'+_img('ris2')+'</td><td>'+_img('ris3')+'</td><td>'+_img('ris4')+'</td><td>'+L['troops']+'</td><td>'+L['status']+'</td></tr>';
	for(i=0;i<_vill.length;i++){
		if(getActiveVillage()==_vill[i][1]){
			var class=' ou';
		}else{
			var class='';
		}
		table_html+='<tr><td class="s7'+class+'"><a href="dorf1.php?newdid='+_vill[i][1]+'">'+_vill[i][0]+'</a></td><td class="'+class+'" id="SOMMARIO_'+_vill[i][1]+'_VILL_COSTRUZIONI">'+L['n/d']+'</td><td class="'+class+'" id="SOMMARIO_'+_vill[i][1]+'_RIS_LEGNO" align="right"><span class="c">'+L['n/d']+'</span></td><td class="'+class+'" id="SOMMARIO_'+_vill[i][1]+'_RIS_ARGILLA" align="right"><span class="c">'+L['n/d']+'</span></td><td class="'+class+'" id="SOMMARIO_'+_vill[i][1]+'_RIS_FERRO" align="right"><span class="c">'+L['n/d']+'</span></td><td class="'+class+'" id="SOMMARIO_'+_vill[i][1]+'_RIS_GRANO" align="right"><span class="c">'+L['n/d']+'</span></td><td id="SOMMARIO_'+_vill[i][1]+'_TROOPS" class="'+class+'">'+L['n/d']+'</td><td id="SOMMARIO_'+_vill[i][1]+'_STATUS" class="'+class+'">'+L['n/d']+'</td></tr>';
	}
		
	// LEGEND
	table_html+='<tr><td colspan="8" class="s7"><span style="color:#E0B700;font-weight:bold;">&bull; '+L['legend_1']+'</span></td></tr>';
	table_html+='<tr><td colspan="8" class="s7"><span style="color:#FF0000;font-weight:bold;">&bull; '+L['legend_2']+'</span></td></tr>';

	table.innerHTML=table_html;
	
	
	document.body.innerHTML+='<div id="SOMMARIO_CARICAMENTO" style="height:100%;width:100%;position:fixed;top:0px;left:0px;background-color:#FFFFFF;opacity:0.85;z-index:100000;"><div style="position:absolute;top:45%;left:40%;opacity:1;"><b>'+L['loading']+'</b><div align="left" style="opacity:1;width:200px;border:1px solid #000000;height:14px;"><div align="center" id="SOMMARIO_PERCENTO" style="background-color:#000000;opacity:1;height:14px;background-image:url('+_images['loading_bar']+'); background-repeat:repeat-x; font-weight:bold;color:#FFFFFF;width:0px;">1%</div></div></div></div>';
}

function AnimatedBar(elem,to){
	var n=0;
	for(i=parseInt(elem.style.width);i<to;i++){
		n++;
		setTimeout("document.getElementById('SOMMARIO_PERCENTO').style.width='"+i+"px';",n*1);
	}
}

function AddPercentuale(){
	_percento_cur++;
	//document.getElementById('SOMMARIO_PERCENTO').style.width=percentualedi(_percento_cur,_percento_max)*2+'px';
	AnimatedBar(document.getElementById('SOMMARIO_PERCENTO'),percentualedi(_percento_cur,_percento_max)*2);
	document.getElementById('SOMMARIO_PERCENTO').innerHTML=percentualedi(_percento_cur,_percento_max)+'%';
	if(_percento_cur>=_percento_max){
		setTimeout(function(){document.getElementById('SOMMARIO_CARICAMENTO').style.display='none';},300);
	}
}

function Numero(num){
	return reversed(wordwrap(reversed(num),3,"'",true));
}

function GetColoredText(ris,cap){
	if(percentualedi(ris,cap)<90){
		var txt=Numero(ris)+'<br/><span class="c">'+Numero(cap)+'</span>';
	}else{
		if(cap-5<ris){
			var txt='<span style="color:#FF0000;font-weight:bold;">'+Numero(ris)+'</span><br/><span class="c">'+Numero(cap)+'</span>';
		}else{
			var txt='<span style="color:#E0B700;font-weight:bold;">'+Numero(ris)+'</span><br/><span class="c">'+Numero(cap)+'</span>';
		}
	}	
	return txt;
}

function GetStatusText(att1,att2,def1,def2){
	var text='';
	if(att1>0){
		text+=_img('att1',att1+L['att1'])+" ";
	}
	if(att2>0){
		text+=_img('att2',att2+L['att2'])+" ";
	}
	if(def1>0){
		text+=_img('def1',def1+L['def1'])+" ";
	}
	if(def2>0){
		text+=_img('def2',def2+L['def2'])+" ";
	}
	return text;
}

function detectGraficPack(){
	return '';
}

function AppendValue(ris,t){
	document.getElementById('SOMMARIO_'+_value+'_'+t).innerHTML=ris;
}

function InsertFirstValues(){
		_vill=GetVillages();
		_max_vill=_vill.length;
		_value=_vill[_cur_vill][1];
		AJAX_GET('http://'+window.location.host+'/dorf1.php?newdid='+_vill[_cur_vill][1],function(req){
							//alert(req.responseText.substr(2000,req.responseText.length));
							var ris=GetResources(req.responseText,1);
							var cap=GetCapacita(req.responseText,1);
							var txt=GetColoredText(ris,cap);
							AppendValue(txt,'RIS_LEGNO');
							AddPercentuale();
							var ris=GetResources(req.responseText,2);
							var cap=GetCapacita(req.responseText,2);
							var txt=GetColoredText(ris,cap);
							AppendValue(txt,'RIS_ARGILLA');
							AddPercentuale();
							var ris=GetResources(req.responseText,3);
							var cap=GetCapacita(req.responseText,3);
							var txt=GetColoredText(ris,cap);
							AppendValue(txt,'RIS_FERRO');
							AddPercentuale();
							var ris=GetResources(req.responseText,4);
							var cap=GetCapacita(req.responseText,4);
							var txt=GetColoredText(ris,cap);
							AppendValue(txt,'RIS_GRANO');
							AddPercentuale();
							var cost=GetCostruzioni(req.responseText);
							if(cost==0){
								cost=L['none'];
							}else{
								cost+=' '+L['in_building']+' <span class="c">('+GetCostruzioniTime(req.responseText)+')</span>';
							}
							AppendValue(cost,'VILL_COSTRUZIONI');
							AddPercentuale();
							var att1=GetArrivAttac(req.responseText);
							var att2=GetAndanAttac(req.responseText);
							var def1=GetArrivRinf(req.responseText);
							var def2=GetAndanRinf(req.responseText);
							var texto=GetStatusText(att1,att2,def1,def2);
							AppendValue(texto,"STATUS");
							AddPercentuale();
							
							// Truppe
							var troops=GetTroops(req.responseText);
							if(troops.length>0){
								var texto='<table border="0" cellpadding="0" cellspacing="0">';
								//alert(troops.length);
									for(i=0;i<troops.length;i++){
										texto+='<tr><td><img src="img/x.gif" class="unit '+troops[i]['type']+'" border="0" alt=""/></td><td>'+troops[i]['nume']+'</td></tr>';
									}
								texto+='</table>';
							}else{
								texto=L['none'];
							}
							AppendValue(texto,'TROOPS');
							AddPercentuale();
							
							
							if(_cur_vill<(_max_vill-1)){
							setTimeout(function(){_cur_vill++;InsertFirstValues();},Math.floor(Math.random()*100));
							}
							if(_cur_vill==(_max_vill-1)){
								setTimeout(function(){_cur_vill=0;AJAX_GET('http://'+window.location.host+'/dorf3.php?newdid='+getActiveVillage(),function(){});},Math.floor(Math.random()*200));
							}
																					   });
}

function GetLastVersion(){
	AJAX_GET('http://userscripts.org/scripts/source/45312.user.js',function(req){
		var v=req.responseText.split('[VERSION]')[1];
		v=v.split('[/VERSION]')[0];
		if(parseInt(v)>_cur_version){
			var det=req.responseText.split('[DETAILS]')[1];
			det=det.split('[/DETAILS]')[0];
			document.getElementById('textmenu').innerHTML+='<br/><span class="c5 f10">'+L['new_version']+' <a href="http://userscripts.org/scripts/source/45312.user.js">Download!</a></span><br/><span class="c">In the new version aviable: '+det+'</span>';
		}
																			});
}

function RunAll(){
	_vill=GetVillages();
	_percento_max=_vill.length*7;
	_percento_cur=0;
	InsertFirstValues();
}

AddTable();
RunAll();
GetLastVersion();