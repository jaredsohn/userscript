// ==UserScript==
// @name           The West - Quest Helper - [Multilingual]
// @description    Script for The-West: Adds pop ups work in their Adventures
// @namespace      http://www.puli.sk
// @icon           http://img854.imageshack.us/img854/4797/iconcwalter.jpg
// @license        GNU Lesser General Public License (LGPL)
// @copyright      2009, Puli
// @author         Puli
// @release        CWalter
// @include        http://*.the-west.*/game.php*
// @version        2.0.0.1
//
// @history        2.0.0.1|16/08/2001 Added Brazilian/Portuguese translations, thanks to CWalter.
// ==/UserScript==

var labor_points_text={
                 en:'Labor points',
		 br:'Pontos de Trabalho', /*CWalter*/
		 pt:'Pontos de Trabalho', /*CWalter*/
		 cz:'Pracovní body',
		 sk:'Pracovné body',
		 pl:'Punkty Pracy',
		 hu:'Munkapont',
		 se:'Arbetspoäng',
		 de:'Arbeits Punkte',
		 nl:'Arbeidspunten'
};
var difficulty_text={
                 en:'Difficulty',
		 br:'Dificuldade', /*CWalter*/
		 pt:'Dificuldade', /*CWalter*/
		 cz:'Obtížnost',
		 sk:'Obtiažnosť',
		 pl:'Trudność',
		 hu:'Nehézség',
		 se:'Svårighet',
		 de:'Schwerigkeit',
		 nl:'Moeilijkheid',
};

var gCount=0;
var gLang='en';


function getJobId(text){
  foundId = -1;
  foundL  = 0;
  for (id in unsafeWindow.JobList) {
    aJob = unsafeWindow.JobList[id]; 
    if (foundL < aJob.name.length && aJob.name==text.substring(0,aJob.name.length)) {
      foundId = id;
      foundL  = aJob.name.length;
    }

    for (t=0;t<aJob.yields.length;t++)
      if (aJob.yields[t]!==null && aJob.yields[t].name.length > foundL && aJob.yields[t].name == text.substring(0,aJob.yields[t].name.length)) {
        foundId = id;
        foundL  = aJob.yields[t].name.length;
      }
  }
  return foundId;
}

function findTopPos(obj){
  var top = 0;
  if (obj.offsetParent)
    top += findTopPos(obj.offsetParent);
  top += obj.offsetTop;
  return top;
}

function escapeText(text) {
  return text.replace("'","\\'");
}

function searchForQuestRequirements() {
  if (window.document.getElementById('questFoot')){
    var qReqsTags = unsafeWindow.document.getElementsByTagName('DIV');
    try {
      for (i in qReqsTags) {
        if (qReqsTags[i].id=='questRequirements') {
          if (qReqsTags[i].previousSibling!==null && qReqsTags[i].previousSibling.tagName=='SCRIPT')
            continue;
          req=qReqsTags[i].firstChild;
          while(req.nextSibling && req.nextSibling.tagName=='DIV'){
            req=req.nextSibling;
            job_id=getJobId(req.innerHTML);
            
            if (job_id == -1) {
              req=req.nextSibling;
              continue;
            }
            
            var selectedJob=unsafeWindow.JobList[job_id];
            if (job_id!=-1) {
              req.style.cursor="pointer";
              req.setAttribute("job_id", job_id);
              req.addEventListener('click',
                function(){
                  var job_id = this.getAttribute("job_id");
                  var mj = document.getElementById('minimap_job_id');
                  var options = mj.options;for (i in options){
                    if (options[i].value==job_id) {
                      mj.selectedIndex=i;
                      var minimap = document.getElementById('minimap_container');                      
                      var icon = document.getElementById('footer_minimap_icon');                      
                      if (!minimap.style.display)
                        unsafeWindow.WMinimap.update();
                      else
                        unsafeWindow.WMinimap.toggle(arguments[0] || unsafeWindow.event);
                      minimap.style.top=(findTopPos(icon)-minimap.offsetHeight)+'px';
                      break;
                    }
                  }
                },false);
            }
            var jobImg='<div style="padding: 2px;"<img src="images/jobs/mini/'+selectedJob.shortName+'.png" alt=""></div>';
            var jobName='<div style="font-weight: bold;">'+escapeText(selectedJob.name)+'</div>';
            var jobPoints=(selectedJob.calcJobPoints(unsafeWindow.Character.bonus_skills)+unsafeWindow.WearSet.getWorkPointAddition(job_id)-selectedJob.malus);
            var playerJobInfo='<div style="padding: 1px; font-size: 10px;">'+labor_points_text[gLang]+': %1'.replace('%1','<strong'+(jobPoints<=0?' style="color:#A00"':'')+'>'+jobPoints+'</strong>')+'<br />'+difficulty_text[gLang]+': %1'.replace('%1','<strong>'+selectedJob.malus+'</strong>')+'</div>';
            var jobYields='<div>';
            for (t=0;t<selectedJob.yields.length;t++) {
              if (selectedJob.yields[t]!==null){
                jobYields+='<div class="popup_yield">';
                jobYields+='<div class="popup_yield_divider"></div>';
                jobYields+='<div class="popup_yield_image"><img src="images/items/yield/mini/'+selectedJob.yields[t].short+'.png" /></div>';
                jobYields+=escapeText(selectedJob.yields[t].name);
               jobYields+='</div>';
             }
            }
            jobYields+='</div>';
       
            var jobPopup='<div style="text-align:center">'+jobImg+'<div class="popup_yield_divider"></div><div style="padding: 4px; text-align: center;">'+jobName+playerJobInfo+'<div style="font-size: 9px;">'+jobYields+'</div></div></div>';
            var popupScript="ar = new Array();ar.opacity=0.9;newPopup=new MousePopup('"+jobPopup+"',250,ar);$('customPopupId_"+gCount+"').addMousePopup(newPopup);";
            req.setAttribute("id","customPopupId_"+gCount);
            gCount++;
            var insertBeforeElement = qReqsTags[i];
            var newScriptElement = document.createElement('script');
            newScriptElement.setAttribute('type', 'text/javascript');
            newScriptElement.innerHTML = popupScript;
            insertBeforeElement.parentNode.insertBefore(newScriptElement, insertBeforeElement);
            req=req.nextSibling;
          }
        }
      }
    } catch(e) {}
  }
  setTimeout(function(){searchForQuestRequirements()},1000);
}

lang = window.location.href.substring(window.location.href.indexOf("//")+2,window.location.href.indexOf("//")+4);
if (labor_points_text[lang]) gLang=lang;
setTimeout(function(){searchForQuestRequirements()},1000);