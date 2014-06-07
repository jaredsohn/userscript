// ==UserScript==
// @name           Travian: Hero Status v1.0 NL
// @Author         MeXaon - Translated by Nash
// @email         wojo156@gmail.com
// @namespace      Travian
// @include        http://*.travian.*/*
// ==/UserScript==


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
		elem.innerHTML='<span style="color:green">'+kills+'</span><br>Punten voor volgend lvl: '+sn1+'<br>Nog nodig: <span style="color:red">'+nextkills+'</span>';
		ttd[27].appendChild(elem);
	}
}

main();