// ==UserScript==
// @name Bar de progression construction (sans commandant)
// @include http://*/game/index.php?page=b_building&*
// @include http://*/game/index.php?page=buildings&session=*&mode=Forschung
// ==/UserScript==

(function(){
    if (!document.getElementById('bxx')) return;

	var intervalTime = 1; // seconds
	
	function progress() {
		try {
			pro = new String((totalTime-time)*100/totalTime)
			pro = pro.replace(/(\d+\.[\d]{0,2})\d+/,'$1');
			divIn.innerHTML = '&nbsp;'+pro+'%';
			divIn.style.cssText = 'width:'+pro+'%; height:13px;\
				font-size:8px; font-weight:700;\
				text-align:center; color:#000;\
				background-color:#dfd;';
			time -= intervalTime;
			if (time < 0)
				window.clearInterval(intervalID);
		} catch(e) {
			alert('productionPercent:'+e+'\n'+(e.stack||''));
		}
	}

    var m, td, pro, divOut, divIn, time = 0, totalTime = 0;
    var reTimeLeftBuilding = /pp='(\d+)';/;
    var reTimeLeftResearch = /ss=(\d+);/;

    var scripts = document.getElementsByTagName('script');
    for(var i=scripts.length-1;i>=0;i--){
      m = scripts[i].innerHTML.match(reTimeLeftBuilding);
      if(m){ time = m[0].replace(reTimeLeftBuilding,'$1'); break; }
      m = scripts[i].innerHTML.match(reTimeLeftResearch);
      if(m){ time = m[0].replace(reTimeLeftResearch,'$1'); break; }
    }

    td = document.getElementById('bxx').parentNode.previousSibling;
    m = td.innerHTML.split(/<br>/i);
    for (var i=m.length-1;i>=0;i--)
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

    if(td && totalTime && time) {
		divTop = document.createElement('div');
		divIn = document.createElement('div');
		divTop.appendChild(divIn);
		td.appendChild(divTop);
		divTop.style.cssText = 'width:99%; height:13px;\
                              border:1px #0c0 solid;\
                              background-color:#000;';
		progress();
		var intervalID = window.setInterval(progress, intervalTime * 1000);
    }
})();