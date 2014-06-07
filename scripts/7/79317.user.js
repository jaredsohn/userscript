// ==UserScript==
// @name           The West_-_Travaux
// @description    Montre les travaux que font les autres
// @namespace      http://ryuuku.olympe-network.com/
// @include        http://*.the-west.*
// @exclude        http://ryuuku.olympe-network.com/
// @version        1.27
// @author         Hack.Crows
// @copyright      Hack.Crows/ryuuku
// ==/UserScript==

// Modified by Hack.Crows


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
                  AjaxWindow.show('job', {'x':x, 'y':y});
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