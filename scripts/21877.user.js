// ==UserScript==
// @name           barre progression bâtiments (pour commandant)
// @namespace      barreprogressionbatiment
// @include        http://uni*.ogame.fr/game/index.php?page=b_building&*
// ==/UserScript==

(function(){
    if (!document.getElementById('bxx')) return;

	var intervalTime = 0.1; // seconds
	
	function progress() {
		try {
			pro = new String((totalTime-time)*100/totalTime)
			pro = pro.replace(/(\d+\.[\d]{0,2})\d+/,'$1');
			divIn.innerHTML = '&nbsp;'+pro+'%';
			divIn.style.cssText = 'width:'+pro+'%; height:13px;\
                             font-size:10px; font-weight:700;\
			    			 line-height:13px;\
			   				  -moz-border-radius:15px;\
			   				  text-align:center; color:#000;\
                             background-color:rgb('+(100-pro)+'%,'+pro+'%,20%);';
			time -= intervalTime;
			if (time < 0)
				window.clearInterval(intervalID);
		} catch(e) {
			alert('productionPercent:'+e+'\n'+(e.stack||''));
		}
	}

    var m, td, td2, pro, divOut, divIn, time = 0, totalTime = 0;
    var reTimeLeftBuilding = /pp="(\d+)"/;
    var reBuilding = /1.: ([éàè\w\s]+) niveau/;

    var scripts = document.getElementsByTagName('script');
    for(var i=scripts.length-1;i>=0;i--){
      m = scripts[i].innerHTML.match(reTimeLeftBuilding);
      if(m){ time = m[0].replace(reTimeLeftBuilding,'$1'); break; }
    }

    td = document.getElementById('bxx').parentNode.previousSibling;

    m = td.innerHTML.match(reBuilding);
    if (m) m = m[0].replace(reBuilding,'$1');

	scripts = document.getElementsByTagName('td');
	for(var i=scripts.length-1;i>=0;i--){
		if (scripts[i].innerHTML.match(m)) {
			td2 =scripts[i];
			break;
		}
	}
    
    m = td2.innerHTML.split(/<br>/i);
    for (var i=m.length-2;i>=0;i--)
      if(m[i].indexOf(':')!=-1){
        totalTime = m[i].split(':')[1];
        break;
      }
    m = totalTime.match(/(\d+)/g);
         if(m.length==4) totalTime=(m[0]*24*3600)+(m[1]*3600)+(m[2]*60)+(m[3]*1);
    else if(m.length==3) totalTime=(m[0]*3600)+(m[1]*60)+(m[2]*1);
    else if(m.length==2) totalTime=(m[0]*60)+(m[1]*1);
    else if(m.length==1) totalTime=(m[0]*1);
    if (totalTime<time){ // missing seconds in total time
           if(m.length==3) totalTime=(m[0]*24*3600)+(m[1]*3600)+(m[2]*60);
      else if(m.length==2) totalTime=(m[0]*3600)+(m[1]*60);
      else if(m.length==1) totalTime=(m[0]*60);
    }
   // totalTime=500000;

    if(td && totalTime && time) {
		divTop = document.createElement('div');
		divIn = document.createElement('div');
		divTop.appendChild(divIn);
		td.appendChild(divTop);
		divTop.style.cssText = 'width:99%; height:13px;\
                              border:1px #0c0 solid;\
                              -moz-border-radius:15px;\
			      			background-color:transparent;';
		progress();
		var intervalID = window.setInterval(progress, intervalTime * 1000);
    }
})();