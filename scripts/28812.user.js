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
		langfile = ['Actual', 'Próximo', 'Necessário'];
		break;
	case '.lt':
		langfile = ['Dabar', 'Sekantis', 'Reikia'];
		break;
	case '.ae':
		langfile = ['حالياً', 'التالي', 'تحتاج'];
		break;
	case '.cn':
		langfile = ['目前', '升级', '尚须'];
		break;
	case '.com.br':
		langfile = ['Atual', 'Proximo', 'Necessario'];
		break;
	case '.de':
		langfile = ['Strom', 'Nächstes', 'Bedürfnis'];
		break;
	case '.bg':
		langfile = ['Настоящ', 'Следващ', 'Нужен'];
		break;
	case '.com.tr':
		langfile = ['Şimdiki', 'Sonraki', 'Gereken'];
		break;
	case '.fr':
		langfile = ['Courant', 'Suivant', 'Besoin'];
		break;
	case '.hu':
		langfile = ['Jelenlegi', 'Szintlépés', 'Kell még'];
		break;
	case '.nl':
		langfile = ['Huidig', 'Volgend', 'Nodig'];
		break;
	case '.no':
		langfile = ['Akkurat nå', 'Neste', 'Behøver'];
		break;
	case '.ro':
		langfile = ['Actual', 'Următor', 'Nevoie'];
		break;
	case '.ru':
		langfile = ['Сейчас', 'Следующий', 'Нужно'];
		break;
	case ".pl":
		langfile = ['Aktualne', 'Wymagane', 'Brakuje'];
		break;
	case '.se':
		langfile = ['Just nu', 'Nästa', 'Behöver'];
		break;
	case '.sk':
		langfile = ['Máš', 'Ďalší', 'Potrebuješ'];
		break;
	case ".hk":
	case '.tw':
		langfile = ['目前', '升級', '尚須'];
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