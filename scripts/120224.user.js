// ==UserScript==
// @name           AutoGanjaFarm
// @namespace      ganjawars.ru
// @include        http://www.ganjawars.ru/ferma.php*
// @include        http://ganjawars.ru/ferma.php*
// @version        0.2 [beta]
// @author         Evgeniy [Dexif] Spitsyn (http://Spitsyn.net)
// @license        GPL v3
// ==/UserScript==

//TODO:Автопосадка
var a=document.getElementsByTagName("body")[0].innerHTML;
var t=10;

if(a.match(/уже пора/i)!=null||a.match(/Земля не обработана/i)!=null){
	searchUrl(document.links);
}else{
	if(a.match(/через ([0-9]*) мин/i)!=null){
		t=Math.floor(Math.random()*a.match(/через ([0-9]*) мин/i)[1]);
		i=self.setInterval("location.reload();",((Math.floor(Math.random()*t))*60000));
	}
}

function searchUrl(arr){
    for(var i=0;i<arr.length;i++){
        if((arr[i].href.indexOf("action=cultivate")>-1
			||arr[i].href.indexOf("action=extract")>-1
			||arr[i].href.indexOf("action=water")>-1
			||arr[i].innerHTML.indexOf("собрать")>-1
			||arr[i].innerHTML.indexOf("полить")>-1)&&arr[i].href.indexOf("#")==-1){
			window.location.assign(arr[i].href);
		}
    }
}