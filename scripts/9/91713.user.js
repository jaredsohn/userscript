// ==UserScript==
// @name           The West - Arata munca
// @namespace      http://userscripts.org/users/120392
// @description    Cu ajutorul acestui script veti vedea la ce munca lucreaza un jucator chiar daca dvs. inca nu aveti punctele necesare pentru a vedea munca.
// @author         JoeSmith
// @include        http://*.the-west.*/game.php*
// ==/UserScript==

/*
  Eine Veraenderung, Weitergabe oder sonstige Veroeffentlichung dieses Scripts oder Teilen davon bedarf einer schriftlichen Genehmigung des Autors. 
  Das Copyright liegt beim Autor.
*/

function init() {
  AjaxWindow.setJSHTML_getJob = AjaxWindow.setJSHTML;
  AjaxWindow.setJSHTML = function(div,content) {
    AjaxWindow.setJSHTML_getJob(div,content);
    if(div && div.id) {
      if(div.id.search(/players/) != -1) {
        var splt = div.id.split("_");
        var x = splt[2];
        var y = splt[3];
        
        new Ajax('game.php?window=job&x='+x+'&y='+y,{
          method:'post',
          data:{},
          onComplete:function(data) {
            data=Json.evaluate(data);
            if(data.page!=undefined){
              var page=data.page;
              
              /* Temporaeren DIV erstellen */
              var divId = 'myJob_' + x + "_" + y;
              var window_div = new Element('div',{'id':divId, styles:{display:'none'}});
              window_div.setHTML(data.page);
              window_div.injectInside('window_bar');
              
              /* Informationen auslesen & Button anzeigen */
              if($ES('h2', divId).length > 0) {
                jobName = $ES('h2', divId)[0].innerHTML;
                jobImage = $ES('h2', divId)[0].style.backgroundImage.match(/images\/jobs\/.*\.[a-z]{3}/i);
                
                var btnJob = new Element('img',{id:'aaa', title:'', src:jobImage, styles:{cursor:'pointer', position:'absolute', right:70, top:0, width:30, 'z-index':1000}});
                btnJob.addMousePopup(new MousePopup(jobName,100,{opacity:0.9}));
                
                btnJob.addEvent('click',function(){
                  AjaxWindow.show('job',{x:x,y:y},x+"_"+y);
                });
                btnJob.injectBefore($ES('h2', div)[0]);
              }
              /* Temporaeren DIV wieder loeschen */
              var trashvar = $(divId);
              trashvar.empty();
              trashvar.remove();
              Garbage.trash([trashvar]);
            }
          }
        }).request();
      }
    }
  };
}

var showJob_script = document.createElement('script');
showJob_script.type='text/javascript';
showJob_script.text =  'if(window.ShowJob == undefined) {\n';
showJob_script.text += '  window.ShowJob = new Object();\n';
showJob_script.text += '  ShowJob.ausbau = new Object();\n';
showJob_script.text += '  ShowJob.init = ' + init.toString() + '\n';
showJob_script.text += '  ShowJob.init();\n';
showJob_script.text += '}';
document.body.appendChild(showJob_script);


/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_117', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_117', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=117&version=1.1';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();