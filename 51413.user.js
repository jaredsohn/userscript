// ==UserScript==
// @name           Travian: Hero Status
// @version        1.3.7
// @autor          MeXaon
// @email          svgmail@mail.ru
// @description    Hero Status v1.3.7
// @namespace      Travian
// @include        http://*.travian*
// @exclude        http://forum.travian*
// @exclude        http://www.travian*
// ==/UserScript==

var ScriptName='Travian: Hero Status';
var ScriptAutor='MeXaon';
var ScriptVersion='1.3.7';
var ScriptLink='http://userscripts.org/scripts/show/10862';

var lang=window.location.href.match(/travian\d*(\.[a-zA-Z\.]+)/).pop();
var langfile=new Array();

switch (lang) {
	case '.pt':
		langfile = ['Actual', 'PrÃ³ximo', 'NecessÃ¡rio'];
		break;
	case '.lt':
		langfile = ['Dabar', 'Sekantis', 'Reikia'];
		break;
	case '.ae':
		langfile = ['Ø­Ø§Ù„ÙŠØ§Ù‹', 'Ø§Ù„ØªØ§Ù„ÙŠ', 'ØªØ­ØªØ§Ø¬'];
		break;
	case '.cn':
		langfile = ['ç›®å‰', 'å‡çº§', 'å°šé¡»'];
		break;
	case '.com.br':
		langfile = ['Atual', 'Proximo', 'Necessario'];
		break;
	case '.de':
		langfile = ['Strom', 'NÃ¤chstes', 'BedÃ¼rfnis'];
		break;
	case '.bg':
		langfile = ['ÐÐ°ÑÑ‚Ð¾ÑÑ‰', 'Ð¡Ð»ÐµÐ´Ð²Ð°Ñ‰', 'ÐÑƒÐ¶ÐµÐ½'];
		break;
	case '.com.tr':
		langfile = ['Åžimdiki', 'Sonraki', 'Gereken'];
		break;
	case '.fr':
		langfile = ['Courant', 'Suivant', 'Besoin'];
		break;
	case '.hu':
		langfile = ['Jelenlegi', 'SzintlÃ©pÃ©s', 'Kell mÃ©g'];
		break;
	case '.nl':
		langfile = ['Huidig', 'Volgend', 'Nodig'];
		break;
	case '.no':
		langfile = ['Akkurat nÃ¥', 'Neste', 'BehÃ¸ver'];
		break;
	case '.ro':
		langfile = ['Actual', 'UrmÄƒtor', 'Nevoie'];
		break;
	case '.ru':
		langfile = ['Ð¡ÐµÐ¹Ñ‡Ð°Ñ', 'Ð¡Ð»ÐµÐ´ÑƒÑŽÑ‰Ð¸Ð¹', 'ÐÑƒÐ¶Ð½Ð¾'];
		break;
	case ".pl":
		langfile = ['Aktualne', 'Wymagane', 'Brakuje'];
		break;
	case '.se':
		langfile = ['Just nu', 'NÃ¤sta', 'BehÃ¶ver'];
		break;
	case '.sk':
		langfile = ['MÃ¡Å¡', 'ÄŽalÅ¡Ã­', 'PotrebujeÅ¡'];
		break;
	case ".hk":
	case '.tw':
		langfile = ['ç›®å‰', 'å‡ç´š', 'å°šé ˆ'];
		break;
	default:
		langfile = ['Current', 'Next', 'Need'];
	}

var XPFirst=XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList=XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
function find(xpath,xpres){
  var ret=document.evaluate(xpath,document,null,xpres,null);
  return  xpres==XPFirst ? ret.singleNodeValue : ret;
}

function main(){
	var ntable=-1;
	var taverna=find('//table[@class="tbg"]/tbody',XPList);
	for(var i=0;i<taverna.snapshotLength;i++){
		ttd=taverna.snapshotItem(i).getElementsByTagName("td");
		if(ttd[4]==undefined)return;
		if(ttd[4].textContent=='(+)'){
			ntable=i;
			i=1000;
		}
	}
	if(ntable!=-1){
		ttd=taverna.snapshotItem(ntable).getElementsByTagName("td");
		level=parseInt(ttd[0].textContent.match(/\s(\d+)\s\(/).pop());
		percent=parseInt(ttd[28].textContent.match(/(\d+)\%/).pop());
		an=100*(level);
		an1=100*(level+1)
		sn=0.5*an*(level+1);
		sn1=0.5*an1*(level+2);
		unitpercent=an1*percent/100;
		kills=sn+unitpercent;
		nextkills=sn1-kills;
		elem=document.createElement('div');
		elem.innerHTML=langfile[0]+'='+kills+'<br>'+langfile[1]+'='+sn1+'<br>'+langfile[2]+'='+nextkills;
		ttd[27].appendChild(elem);
	}
}

main();

GM_registerMenuCommand(ScriptName +' v' + ScriptVersion, function(){ alert('Your version ' + ScriptName + ' is v' + ScriptVersion)});