// ==UserScript==
// @name               The West - Motivación EUD por William Manney
// @source namespace   http://www.elultimoduelo.com
// @namespace          http://userscripts.org/scripts/show/101889
// @description        Ordena, clasifica y accede rapidamente a tus trabajos favoritos.
// @source author      JoeSmith
// @author             William Manney
// @website            http://www.elultimoduelo.com
// @include            http://*.the-west.*/game.php*
// @version            1.0

// ==/UserScript==

/*
    Modyfikowanie, przesyłanie lub inne publikowanie tego skryptu lub jego części wymaga pisemnej zgody autora. Wszelkie prawa autorskie należą do autora.*/

function getMoCheckVersion() {
    return "2.3";
}

function init() {

    /*Manuelle Ueberpruefung fuer z.B. Opera*/
    if(!window.location.href.match(/http:\/\/.+\.the-west\..*\/game\.php.*/i)) {
       return;
    }
    /*  Language Settings */
    var lang = window.location.href.substring(window.location.href.indexOf("//") + 2, window.location.href.indexOf("//") + 4);
    MoCheck.resourceBundle = MoCheck.getLanguage(lang);


    /*  Configuration Settings */
    MoCheck.cookieName = 'motScript';
    MoCheck.cookieSplitter = '/*.';
    MoCheck.oldCookieName = 'moScript';
  
    /* AjaxWindow.setJSHTML ueberschreiben, um Add-Buttons hinzu zu fuegen */
    AjaxWindow.setJSHTML_Motivation = AjaxWindow.setJSHTML;
    AjaxWindow.setJSHTML = function(div,content) {
       AjaxWindow.setJSHTML_Motivation(div,content);
       MoCheck.setAddButton(div);
    }
  
    /* Sichtbarkeit der einzelnen Spalten */
    MoCheck.ColumnVisibility = new Class({
       money:true,
       experience:true,
       luck:true,
       motivation:true,
       initialize:function(money,experience,luck,motivation){
           this.money = money;
           this.experience = experience;
           this.luck = luck;
           this.motivation = motivation;
       },
       show_money:function(){return this.money;},
       show_experience:function(){return this.experience;},
       show_luck:function(){return this.luck;},
       show_motivation:function(){return this.motivation;},
       toString2:function(){return '' + Number(this.money) + Number(this.experience) + Number(this.luck) + Number(this.motivation);},
       count:function(){return Number(this.money) + Number(this.experience) + Number(this.luck) + Number(this.motivation);}
    });

  
    /* Ein paar Vars initialisieren */
    this.listen = new Array();
    this.aktJobs = new Array();
    this.jobSortBy = 'motivation';
    this.jobSortType = 'desc';
    this.columnVisibility = new Object(); /* Sichtbarkeit der Listen: this.columnVisibility[Listenname] */
  
    /* Sollte vielleicht besser aus dem JS der JobDIVs gelesen werden, um aktuell zu bleiben... */
    JobCalculation.functionCalcLuck = "$workTime / (60*600) * 1.2 * $factor * $motivation";
    JobCalculation.functionCalcDollar = "$max_dollar = .9 * $dollar_exponent * 100 + 5; $moneyFactor = 1 + ($moneyBonus / 100); return $max_dollar * pow($job_points,.2) * $moneyFactor;";
    JobCalculation.functionCalcMaxDanger = "8 * pow($danger*100, 1.35) / ($jobPoints + 3)";
    JobCalculation.workSpeed = 1;
  
    this.getCookie();
  
    /* Arbeiten der aktuelle Liste laden */
    MoCheck.getAllJobInfoFromServer();
  
    this.addMotivationButton();
    WEvent.register('moCheckJobWindowLoaded', MoCheck.readJobInfo.store());
}


/*
* Schaltet den "Add"-Button einer Arbeit sichtbar oder unsichtbar
*/
function setAddButton(div) {
    if(div && div.id && div.id.search(/window_job/) != -1) {
       var splt = div.id.split("_");
       var x = splt[2];
       var y = splt[3];
       var btnId = 'btnAdd_' + x + "_" + y;
      
       var isNewJob = (MoCheck.getJobCoords().filter(function(job, index){
           return (job.pos.x == x) && (job.pos.y == y);
       })).length == 0;

       /* Button ggf. erst einfuegen */
       var btnAdd = $(btnId);
       if(btnAdd == null) {
           btnAdd = new Element('img',{
               title:'', 'id':btnId, src:'img.php?type=button&subtype=normal&value=plus',
               styles:{cursor:'pointer', 'margin-left':'20px', display:(isNewJob ? 'inline' : 'none')}
           });
           btnAdd.addMousePopup(new MousePopup(MoCheck.getString('btnAdd.popup'),100,{opacity:0.9}));
          
           btnAdd.addEvent('click',function(){
               $ES('.mousepopup').each(function(el){el.setStyle('visibility','hidden')});
               this.remove();
               MoCheck.addJob(x, y);
           });
          
           btnAdd.injectInside($ES('h2', div)[0]);
       } else {
           btnAdd.setStyle('display', isNewJob ? 'inline' : 'none');
       }
    }
}

/*
* @return Arbeiten von listenName (aktliste, falls null)
*/
function getJobCoords(listenName) {
    if(listenName == null) {
       listenName = this.aktListe;
    }
    /* Liste muss ggf. gespeichert werden */
    MoCheck.addListe(listenName);
    return this.jobCoords[listenName];
}

function setAktListe(listenName) {
    listenName = $defined(listenName) ? listenName : 'Lista por defecto';
    MoCheck.aktListe = listenName;
  
    /* Liste muss ggf. gespeichert werden */
    MoCheck.addListe(listenName);
  
    /* Add-Button der geoeffneten Fenster ueberpruefen */
    $each(AjaxWindow.windows, function(aktWindow, index) {
       if(aktWindow && aktWindow.id) {
           var contentDiv = $(aktWindow.id + '_content');
           MoCheck.setAddButton(contentDiv);
       }
    });
}

function addListe(listenName) {
    if(MoCheck.jobCoords[listenName] == null) {
       MoCheck.jobCoords[listenName] = new Array();
       MoCheck.listen.push(listenName);
    }
}

function deleteListe(name, newListe) {
    this.listen.splice(this.listen.indexOf(name), 1);
    this.jobCoords[name] = null;
    this.columnVisibility[name] = null;
  
    if(newListe != null) {
       this.setAktListe(newListe);
    } else {
       this.setAktListe(MoCheck.listen[0]);
    }
}

function sortArbeiten() {
    var that = this;
  
    /* Sortierungsindex auf job mappen */
    switch(this.jobSortBy) {
       case 'money':        sortBy = 'getMoneySortValue()';break;
       case 'experience':    sortBy = 'getExperienceSortValue()';break;
       case 'luck':        sortBy = 'getLuckSortValue()';break;
       case 'motivation':    sortBy = 'jobCalc.motivation';break;
       default:            sortBy = 'getExperienceSortValue()';
    }
  
    this.aktJobs.sort(function sortAsc(a, b){
       a = eval('a.' + sortBy);
       b = eval('b.' + sortBy);
       if(MoCheck.jobSortType == "asc") {
           return a > b ? 1 : a < b ? -1 : 0;
       } else {
           return a < b ? 1 : a > b ? -1 : 0;
       }
    });
}

function changeSortOrder(sortBy) {
    if(this.jobSortBy == sortBy) {
       this.jobSortType = this.jobSortType == 'asc' ? 'desc' : 'asc';
    } else {
       this.jobSortBy = sortBy;
       this.jobSortType = 'desc';
    }
    MoCheck.openMotivationWindow();
};

/**
* Alle Jobs der aktuellen Liste laden
*/
function getAllJobInfoFromServer() {
    MoCheck.aktJobs = new Array();
    if(MoCheck.getJobCoords().length > 0) {
       $each(MoCheck.getJobCoords(), function(jobCoords, index) {
           MoCheck.getJobInfoFromServer(jobCoords.pos.x, jobCoords.pos.y);
       });
    } else {
       /* MotivationWindow muss ggf. neu geladen werden, auch wenn die aktuelle Liste keine Jobs hat */
       MoCheck.reloadWindow();
    }
}

function getJobInfoFromServer(x, y) {
    new Ajax('game.php?window=job&x=' + x + '&y=' + y, {
       method:'post',
       data:{},
       onComplete:function(data) {
           data = Json.evaluate(data);
           if(data.page != undefined){
               WEvent.trigger('moCheckJobWindowLoaded', [data.page, data.js]);
           }
       }
    }).request();
}

/**
* Job-Informationen aus einem Job-Div auslesen
*/
function readJobInfo(page, js) {
    /* JS auslesen */   
    /*  Zeilenumbrueche entfernen, da diese beim str.match() Probleme verursachen koennen */
    js = js.replace(/\r/g, " ");
    js = js.replace(/\n/g, " ");

    eval(MoCheck.getJsParam('var calculationData', js));
  
    /* windowJob einmal auslesen, um an ID zu kommen */
    var task_skills = new Array();
    eval(MoCheck.getJsParam('var windowJob', js));
  
    /* Skills aus der Joblist auslesen und in task_skills eintragen */
    var str = "";
    var skillString = JobList[windowJob.jobCalc.jobId].formular.match(/\d \* skills\.[a-z_]+ /gi);
    for (i = 0; i < skillString.length; i++) {
       var elements = skillString[i].split(' ');
       var aktSkill = elements[2].split('.');
       var ev = 'for (i = 1; i <= ' + elements[0] + '; i++) {task_skills.push(\'' + aktSkill[1] + '\');}';
       str += ev;
      
    }
    eval(str);
    if(task_skills.length < 5) {
       alert("Fehler: es wurden weniger als 5 Skills ausgelesen: \n" + task_skills + "\nQuelle: " + JobList[windowJob.jobCalc.jobId].formular);
    }

    /* windowJob auslesen, diesmal mit gefuellten task_skills */
    eval(MoCheck.getJsParam('var windowJob', js));
    windowJob.name = JobList[windowJob.jobCalc.jobId].name;
  
    /* Aktuelle Dauer speichern (u.a. fuer Sortierung) */
    for(key in windowJob.jobCalc.calculations) { windowJob.aktDuration = key; }
  
    /* Zusaetzliche Methoden fuer die Sortierung */
    windowJob.getMoneySortValue = function() {
       var points = Math.max(1, Tasks.getJobPoints(this.jobCalc.jobId, this.jobCalc.task_skills) - this.jobCalc.malus);
       return this.jobCalc.calcMoney(this.aktDuration, points);
    };
    windowJob.getLuckSortValue = function() {
       var points = Math.max(1, Tasks.getJobPoints(this.jobCalc.jobId, this.jobCalc.task_skills) - this.jobCalc.malus);
       var luckval = this.jobCalc.calcLuckItemValue(points);
       var erg = (luckval[0] + luckval[1]) / 2;
       return erg;
    };
    windowJob.getExperienceSortValue = function() {
       return this.jobCalc.calculations[this.aktDuration].expCalc;
    };
  
      
    /* Temporaeren DIV erstellen */
    var divId = 'tmpJob_' + windowJob.pos.x + '_' + windowJob.pos.y;
    var window_div = new Element('div',{'id':divId, 'styles':{'display':'none'}});
    window_div.setHTML(page);
    window_div.injectInside('window_bar');
  
    /* Image auslesen */
    windowJob.image = $ES('h2', divId)[0].style.backgroundImage.match(/images\/jobs\/.*\.[a-z]{3}/i);
  
    /* Temporaeren DIV wieder loeschen */
    var trashvar = $(divId);
    trashvar.empty();
    trashvar.remove();
    Garbage.trash([trashvar]);
  
    /* Neuen windowJob speichern */
    MoCheck.aktJobs.push(windowJob);
  
    /* MotivationWindow ggf. neu laden */
    MoCheck.reloadWindow();
}

function reloadWindow() {
    if(AjaxWindow.windows['motivation'] && MoCheck.aktJobs.length == MoCheck.getJobCoords().length) {
       MoCheck.openMotivationWindow();
    }
}

function lo(obj) {
    var txt = "";
    for (a in obj) {
       txt += "\n" + a;
    }
    alert(txt);
}

/* Trigger zum automatischen Aktualisieren aktivieren */
function setTrigger() {
    $each(MoCheck.aktJobs, function(job, index) {
       var aktJobId = job.pos.x + '_' + job.pos.y;
              
       /* checks if the player can do the job and sets the way time*/
       var reload_task_points = Tasks.reload_task_points(job.jobCalc.task_skills, job.jobCalc.malus, 'job', job.window, job.jobCalc.jobId);
      
       reload_task_points();
       job.refresh_way_time();

       var eventname = 'windowJob_' + aktJobId;
       WEvent.register('jobCalcDuration_' + aktJobId, MoCheck.durationChanged.store(job), eventname);
       WEvent.register('character_speed_changed', job.refresh_way_time.store(job), eventname);
       WEvent.register('character_values_changed', reload_task_points.store(job), eventname);
       WEvent.register('character_values_changed', job.calcDuration.store(job), eventname);
       job.calcDuration();
    });
}

function durationChanged() {
    /* Duration speichern */
    var selectElements = $ES('.jobTime', this.window);
    this.aktDuration = selectElements[0].options[selectElements[0].selectedIndex].value;
  
    /* Aenderungen berechnen und anzeigen */
    this.calcDuration();
}

function addJobRow(job, index) {
    var aktJobId = job.pos.x + '_' + job.pos.y;
  
    var displayMoney = MoCheck.isColumnVisible('money') ? '' : 'display:none;';
    var displayExperience = MoCheck.isColumnVisible('experience') ? '' : 'display:none;';
    var displayLuck = MoCheck.isColumnVisible('luck') ? '' : 'display:none;';
    var displayMotivation = MoCheck.isColumnVisible('motivation') ? '' : 'display:none;';

    var result =  
           '<div id="moJob_' + aktJobId + '" style="text-align:center;border:1px solid black; margin:2px;">' +
           '    <div class="jobWrapper" style="height:40px;">' +
           '        <div id="moCheck.jobImage_' + aktJobId + '" style="position:relative; height:42px; width:50px; float:left;">'+
           '        </div>' +
           '        <div class="jobBar jobExperience" style="float:left;' + displayExperience + '">' +
           '            <span class="icon iconExperience"></span>' +
           '            <span class="valueStatic" style="cursor:default;"><span class="barValue">0</span></span>' +
           '        </div>' +
           '        <div class="jobBar jobMoney" style="float:left; height:42px;' + displayMoney + '">' +
           '            <span class="icon iconMoney"></span>' +
           '            <span class="valueStatic" style="cursor:default;"><span class="barValue">0</span></span>' +
           '        </div>' +

           '        <div class="jobBar jobLuck" style="float:left;' + displayLuck + '">' +
           '            <span class="icon iconLuck"></span>' +
           '            <span class="progress" style="display:none;"><span class="percent" style="width: 2%;"></span></span>' +
           '            <span class="value" style="cursor:default;"><span class="additional">$ </span><span class="barValue">0</span></span>' +
           '        </div>' +
           '        <div class="jobBar jobMotivation" style="float:left;' + displayMotivation + '">'+
           '            <span class="icon iconMotivation"></span>'+
           '            <span class="progress" style="display:none;"><span class="percent" style="width: ' + job.jobCalc.motivation + '%;"></span></span>' +
           '            <span class="value" style="cursor:default;"><span class="barValue">' + job.jobCalc.motivation*100 + '%</span></span>' +
           '        </div>' +
           '        <div class="progressBar" style="display:none; float:left; width:0px; left:20px;">' +
           '            <span class="laborValue" style="position:relative; left:0px; padding:0px;">0</span>' +
           '            <span class="laborPercent" style="display:none;"><span class="value">0 / 0</span><span class="fill" style="width:50%;"></span></span>' +
           '        </div>' +
           '        <div class="startWork task_control" style="margin:0 10px 0 0; padding:5px 0 0 0; width:100px; white-space:nowrap; float:right;">' +
           '            <select class=\'jobTime\' name=\'job_task_time\' style=\'vertical-align:top;\' onchange=\'WEvent.trigger(\"jobCalcDuration_' + aktJobId + '\", []);\'>' +
           '            </select>' +
           '            <span id="button_start_task_job_' + aktJobId + '">' +
           '                <a class="button_wrap button" href="#" >' +
           '                <span class="button_left"></span><span class="button_middle">' + MoCheck.getString("btnOk.label") + '</span><span class="button_right"></span>' +
           '                <span style="clear: both;"></span>' +
           '                </a>' +
           '                <span class="way_time" style="display:none;">00:00:00</span>' +
           '            </span>' +
           '        </div>' +
          
           /* Dummy-Daten, damit automatische Anpassungen der Punkte usw. funktionieren */
           '        <div id="moJob_' + aktJobId + '_title" class="window_borders" style="display:none;">' +
                       /* Skillbox */
           '            <div class="skill_box task_skill_0">0</div>' +
           '            <div class="skill_box task_skill_1">0</div>' +
           '            <div class="skill_box task_skill_2">0</div>' +
           '            <div class="skill_box task_skill_3">0</div>' +
           '            <div class="skill_box task_skill_4">0</div>' +
                       /* Danger */
           '            <div class="jobBar jobDanger">' +
           '                <span class="progress"><span class="percent" style="width: 2%;"></span></span>' +
           '                <span class="value">' +
           '                    <span class="additional"><img src="../images/job/redesign/heart.png" alt="" style="margin-top: -3px;" /></span>' +
           '                    <span class="barValue">4</span>' +
           '                </span>' +
           '            </div>' +
           '        </div>' +
           '    </div>' +
           '</div>';
    return result;
}

/* Liest paramName bis zum naechsten Semikolon */
function getJsParam(paramName, str) {
    var p = str.match(eval('/' + paramName + '.*/i'));
    return p[0].split(';')[0] + ';';
}

/**
* Motivations-Button zu Menu hinzufuegen
*/
function addMotivationButton() {
    var menuElem = new Element('div',{'id':'menu_item_trader', 'style':'text-align:center;'});
    menuElem.innerHTML = '<a href="#" onclick="MoCheck.openMotivationWindow();">' +
                         '  <span style="display:block; width:105px; font-weight:normal; color:#fff; margin-left:25px; padding-top:5px;"><b>Favoritos EUD</b></span>' +
                         '</a>';
    menuElem.injectAfter($('menu_forts'));
 
    var marginTop =  parseInt($('workbar_right').getStyle('margin-top')) + 27;
    $('workbar_right').setStyle('margin-top', marginTop + 'px');
}

/**
* Oeffnet ein leeres AjaxWindow
* @windowName
* @group Vordefinierte Gruppe zum Minimieren, muss aus "AjaxWindow.possibleValues" sein
*/
function openMotivationWindow() {
    var windowName = 'motivation';
    var group = 'work';

    MoCheck.sortArbeiten();
    $ES('.mousepopup').each(function(el){el.setStyle('visibility','hidden')});

    var window_div = $('window_' + windowName);
    if(!window_div) {
       /* Neu erstellen */
       window_div = new Element('div',{'id':'window_' + windowName,'class':'window'});
       AjaxWindow.windows[windowName] = window_div;
       window_div.injectInside('windows');
       window_div.centerLeft();
    } else {
       window_div.empty();
    }
    AjaxWindow.bringToTop(window_div);
  
    /* Fuellen */
    var xhtml = '<div class="window_borders">';
    xhtml += '  <h2 id="window_' + windowName + '_title" class="window_title" style="background-image:url(img.php?type=window_title&value=work);"><span>' + windowName + '</span></h2>';
    xhtml += '  <a href="javascript:AjaxWindow.closeAll();" class="window_closeall"></a>';
    xhtml += '  <a href="javascript:AjaxWindow.toggleSize(\'' + windowName + '\', \'' + group + '\');" class="window_minimize"></a>';
    xhtml += '  <a href="javascript:AjaxWindow.close(\'' + windowName + '\');" class="window_close"></a>';
    xhtml += '  <div id="window_' + windowName + '_content" class="window_content">';
    xhtml += '    <div class="tab_container" style="margin-left:7px; width:100%; height:275px">';
    xhtml += '      <ul class="tabs">' +
            '        <li class="active" id="mojob.tab.1" onclick="MoCheck.showTab(this);">'+ MoCheck.getString("dialog.tab.work.titel") + '</li>' +
            '        <li id="mojob.tab.2" onclick="MoCheck.showTab(this);">' + MoCheck.getString("dialog.tab.about.titel") + '</li>' +
            '      </ul>';
    xhtml += '        <table class="shadow_table">';
    xhtml += '            <tr>';
    xhtml += '                <td class="edge_shadow_top_left"></td>';
    xhtml += '                <td class="border_shadow_top"></td>';
    xhtml += '                <td class="edge_shadow_top_right"></td>';
    xhtml += '            </tr>';
    xhtml += '            <tr>';
    xhtml += '                <td class="border_shadow_left"></td>';
    xhtml += '                <td class="shadow_content">';
    xhtml += '                    <div style="overflow:auto;width: 675px; height:300px; position: relative;">';
    xhtml += '                        <div id="mojob.tab.1.div">';
                                       if(MoCheck.aktJobs.length <= 0) {
                                           xhtml += '<div style="text-align:center;"><br />' +
                                                   '    <h2>' + MoCheck.getString("dialog.tab.work.nothingSelected.1") + '</h2><br />' +
                                                       MoCheck.getString("dialog.tab.work.nothingSelected.2") +
                                                   '</div>';
                                       } else {
                                           xhtml += '<div id="moCheck.sortBar" style="text-align:right;padding-right:2px;">&nbsp;</div>';
                                           $each(MoCheck.aktJobs, function(job, index) {
                                               xhtml += MoCheck.addJobRow(job, index);
                                           });
                                       }
    xhtml += '                        </div>';
    xhtml += '                        <div style="display:none;padding:5px;" id="mojob.tab.2.div">';
    xhtml += '                            <div style="text-align:center;height:230px;">';
    xhtml += '                                <h2>The West - Motivación EUD</h2>';
    xhtml += '                                <ul style="margin-top:10px;text-align:left;">' +
            '                                    <li>Este script ha sido rediseñado por William Manney</li>' +
            '                                    <li>William Manney es editor, MOD y GO en lo servidores hispanos de The West</li>' +
            '                                    <li><b>El Último Duelo</b> es web oficial de los servidores hispanos en The West y propiedad de William Manney</li>' +
            '                                </ul>';
    xhtml += '                            </div>';
    xhtml += '                            <div style="float:left;">';
    xhtml += '                                Visitanos en: <br />';
    xhtml += '                                <a href="http://www.elultimoduelo.com" target="_blank">www.elultimoduelo.com</a>';

    xhtml += '                            </div>';
    xhtml += '                            <div style="float:right;">';
    xhtml += '                                <a href="https://www.paypal.com/es/cgi-bin/webscr?cmd=_flow&SESSION=aZH2yElTXavcWWTOpVWRreyFpWK3CXcB_f1Y2U34oIbeFZ5rcZaXuI94CS0&dispatch=5885d80a13c0db1f8e263663d3faee8db2b24f7b84f1819390b7e2d9283d70f1" target="_blank">';
    xhtml += '                                    <img src="https://www.paypalobjects.com/es_ES/ES/i/btn/btn_donateCC_LG.gif" alt="Wesprzyj" />';
    xhtml += '                                </a>';   
    xhtml += '                            </div>';   
    xhtml += '                        </div>';
    xhtml += '                    </div>';
    xhtml += '                </td>';
    xhtml += '                <td class="border_shadow_right"></td>';
    xhtml += '            </tr>';
    xhtml += '            <tr>';
    xhtml += '                <td class="edge_shadow_bottom_left"></td>';
    xhtml += '                <td class="border_shadow_bottom"></td>';
    xhtml += '                <td class="edge_shadow_bottom_right"></td>';
    xhtml += '            </tr>';
    xhtml += '        </table>';
    xhtml += '      <span style="position:absolute; right:22px; top:19px;">' + MoCheck.getString('author') + '&nbsp;' + MoCheck.getAuthor() + '</span>';
    xhtml += '      <span id="moCheck.listen" style="position:absolute; right:22px;">&nbsp;</span>';
    xhtml += '        <div id="moCheck.visibleBar" style="text-align:left;padding-left:2px;">&nbsp;</div>';
    xhtml += '    </div>';
    xhtml += '  </div>';
    xhtml += '</div>';
    xhtml += '</div>';
    window_div.setHTML(xhtml);
  

    $ES('.window_closeall').each(function(el){el.addMousePopup(new MousePopup('<b>'+MoCheck.getString("dialog.closeAll.popup")+'<\/b>'));});
    $ES('.window_minimize').each(function(el){el.addMousePopup(new MousePopup('<b>'+MoCheck.getString("dialog.minimize.popup")+'<\/b>'));});
    $ES('.window_close').each(function(el){el.addMousePopup(new MousePopup('<b>'+MoCheck.getString("dialog.close.popup")+'<\/b>'));});
    var window_title_div = $('window_' + windowName + '_title');
    window_div.makeDraggable({handle:window_title_div});
    window_title_div.addEvent('dblclick',function(){
               window_div.centerLeft();
               window_div.setStyle('top',133);
           });
    window_div.addEvent('mousedown',AjaxWindow.bringToTop.bind(AjaxWindow,[window_div]));
    window_title_div.addEvent('mousedown',AjaxWindow.bringToTop.bind(AjaxWindow,[window_div]));
  

    var listDiv = $('moCheck.listen');

    /* Job-Select anzeigen */
    var onChangeTxt = 'onChange="MoCheck.doConfiguration(\'loadListe\')"';
    var moListen = '<select id="moWorkListen" size="1" style="width:200px" ' + onChangeTxt + '>';
    $each(MoCheck.listen, function(liste, index) {
       var isSelected = (liste == MoCheck.aktListe ? 'selected' : '');
       var isActual = liste + (liste == MoCheck.aktListe ? ' (' + MoCheck.getString("dialog.tab.configuration.actual") + ')' : '');
       moListen += '            <option value="' + liste + '" ' + isSelected + '>' + isActual + '</option>';
    });
    moListen += '</select>';
    listDiv.innerHTML = moListen;
  
    /* Conf-Buttons */
    var btnDelete = new Element('div',{styles:{'margin':'2px', 'float':'left', width:'25px', height:'25px', 'background':'url(images/forum/icons.png) 50px 0', cursor:'pointer'}});
    btnDelete.innerHTML = "&nbsp;";
    btnDelete.addMousePopup(new MousePopup(MoCheck.getString('dialog.tab.configuration.btnDelete.popup'),100,{opacity:0.9}));
    btnDelete.addEvent('click',function(){
       MoCheck.doConfiguration('deleteListe');
    });
    btnDelete.injectInside(listDiv);
  
    var btnRename = new Element('div',{styles:{'margin':'2px', 'float':'left', width:'25px', height:'25px', 'background':'url(images/forum/icons.png) 0 0', cursor:'pointer'}});
    btnRename.innerHTML = "&nbsp;";
    btnRename.addMousePopup(new MousePopup(MoCheck.getString('dialog.tab.configuration.btnRename.popup'),100,{opacity:0.9}));
    btnRename.addEvent('click',function(){
       MoCheck.doConfiguration('renameListe');
    });
    btnRename.injectInside(listDiv);
  
  
    var btnAdd = new Element('a',{'title':'', 'class':'button_wrap button', styles:{'float':'left'}, href:'#'});
    btnAdd.innerHTML =  '<span class="button_left"></span><span class="button_middle">+</span>' +
                       '<span class="button_right"></span>' +
                       '<span style="clear: both;"></span>';
    btnAdd.addMousePopup(new MousePopup(MoCheck.getString('dialog.tab.configuration.btnNew.popup'),100,{opacity:0.9}));
    btnAdd.addEvent('click',function(){
       MoCheck.doConfiguration('newListe');
    });
    btnAdd.injectInside(listDiv);
  
    if(MoCheck.aktJobs.length > 0) {
       $each(MoCheck.aktJobs, function(job, index) {
           var aktJobId = job.pos.x + '_' + job.pos.y;
          
           /* Kleine Anpassung, damit der Job auf das richtige DIV verweist */
           job.window = $('moJob_' + aktJobId);
          
           /* Images einfuegen */
           MoCheck.getJobImageDiv(job).injectInside($('moCheck.jobImage_' + aktJobId));
          
           /* Duration-Select fuellen */
           var selectElement = $ES('.jobTime', job.window)[0];
           for (dur in job.jobCalc.calculations) {
               var o = new Element('option', {'value':dur, 'selected':(dur == job.aktDuration ? true : false)});
              
               var h = Math.floor(dur / 3600);
               var txt;
               if(h > 0) {
                   txt = h + " " + MoCheck.getString("select.option.hours");
               } else {
                   txt = (dur / 60) + " " + MoCheck.getString("select.option.minutes");
               }
              
              o.innerHTML = txt;
               o.injectInside(selectElement);
           }
          
           /* Button aktivieren */
           job.button = new Button('ok', 'normal', 'button_start_task_job_' + aktJobId, job.start.bind(job));

       });
      
       /* Automatisches Aktualisieren aktivieren */
       MoCheck.setTrigger();
      
       /* Sortbar fuellen */
       MoCheck.addSortIcon('experience');
       MoCheck.addSortIcon('money');
       MoCheck.addSortIcon('luck');
       MoCheck.addSortIcon('motivation');
      
       /* Visiblebar fuellen */
       MoCheck.addVisibleIcon('experience');
       MoCheck.addVisibleIcon('money');
       MoCheck.addVisibleIcon('luck');
       MoCheck.addVisibleIcon('motivation');
    }
}

function showTab(obj) {
    var showTab1 = (obj.id == 'mojob.tab.1');
    $('mojob.tab.1.div').setStyle('display', showTab1 ? 'block' : 'none');
    $('mojob.tab.2.div').setStyle('display', showTab1 ? 'none' : 'block');
    if(showTab1) {
       $('mojob.tab.1').addClass('active');
       $('mojob.tab.2').removeClass('active');
    } else {
       $('mojob.tab.1').removeClass('active');
       $('mojob.tab.2').addClass('active');
    }
}

/*
* Erstellt das Div mit den Icons der Arbeit, dem Zentrieren- und Loeschen-Button
*/
function getJobImageDiv(aktArbeit) {
    var way_time = WMap.calcWayTime(Tasks.last_pos, aktArbeit.pos);
    var image_div = new Element('div',{styles:{position:'relative', height:'42px', width:'35px', margin:'2px', cursor:'pointer'}});
    var image = new Element('img',{title:'',src:aktArbeit.image,styles:{position:'absolute',left:0,top:0, height:'100%'}});
    image.addEvent('click',function(){
       AjaxWindow.show('job',{x:aktArbeit.pos.x,y:aktArbeit.pos.y},aktArbeit.pos.x+"_"+aktArbeit.pos.y);
    });
  
    /* Arbeitspunkte sind hier statisch: Sie werden bei Kleidungswechsel nicht aktualisiert */
    var points = Math.max(1, Tasks.getJobPoints(aktArbeit.jobCalc.jobId, aktArbeit.jobCalc.task_skills) - aktArbeit.jobCalc.malus);
    image.addMousePopup(new MousePopup(MoCheck.getString('jobImage.popup', [aktArbeit.name, points]),250,{opacity:0.9}));
    image.injectInside(image_div);
  
  
    var center = new Element('img',{title:'',src:'images/icons/walk_to.png',styles:{position:'absolute',top:'0px',left:'0px', width:'15px', cursor:'pointer'}});
    center.addMousePopup(new MousePopup(MoCheck.getString('btnCenter.popup', way_time.formatDuration()),100,{opacity:0.9}));
    center.addEvent('click',function(){
       WMap.scroll_map_to_pos(parseInt(aktArbeit.pos.x), parseInt(aktArbeit.pos.y));
    });
    center.injectInside(image_div);

    var btnDelete = new Element('img',{title:'',src:'images/icons/cancel_small.png',styles:{position:'absolute',top:'22px',left:'30px',cursor:'pointer', width:'18px'}});
    btnDelete.addMousePopup(new MousePopup(MoCheck.getString('btnDelete.popup'),100,{opacity:0.9}));
    btnDelete.addEvent('click',function(){
       MoCheck.deleteJob(aktArbeit.pos.x, aktArbeit.pos.y);
    });
    btnDelete.injectInside(image_div);
    return image_div;
}

function addSortIcon(str) {
    if(MoCheck.isColumnVisible(str)) {
       var icon = new Element('img',{
           title:'',
           src:'images/job/redesign/bar/icon/' + str + ".png",
           styles:{cursor:'pointer', width:'15px', opacity:(MoCheck.jobSortBy == str ? 1 : 0.4)}}
       );
       icon.addMousePopup(new MousePopup(MoCheck.getString('sortIcon.popup.' + str),100,{opacity:0.9}));
  
       icon.addEvent('click',function(){
           $ES('.mousepopup').each(function(el){el.setStyle('visibility','hidden')});
           MoCheck.changeSortOrder(str);
       });
      
       icon.addEvent('mouseover',function(){
           this.setStyle('opacity', 1);
       });
      
       icon.addEvent('mouseout',function(){
           this.setStyle('opacity', MoCheck.jobSortBy == str ? 1 : 0.4);
       });
  
       icon.injectInside($('moCheck.sortBar'));
    }
}

function addVisibleIcon(str) {
    var isVisible = MoCheck.isColumnVisible(str);
    var icon = new Element('img',{
       title:'',
       src:'images/job/redesign/bar/icon/' + str + ".png",
       styles:{cursor:'pointer', width:'15px', opacity:(isVisible ? 1 : 0.4)}}
    );
    icon.addMousePopup(new MousePopup(MoCheck.getString('visibleIcon.popup.' + str),100,{opacity:0.9}));

    icon.addEvent('click',function(){
       $ES('.mousepopup').each(function(el){el.setStyle('visibility','hidden')});
       MoCheck.changeColumnVisibility(str, !isVisible);
    });
  
    icon.addEvent('mouseover',function(){
       this.setStyle('opacity', 1);
    });
  
    icon.addEvent('mouseout',function(){
       this.setStyle('opacity', isVisible ? 1 : 0.4);
    });

    icon.injectInside($('moCheck.visibleBar'));
}

function doConfiguration(cmd) {
    var selectId = 'moWorkListen';
    var msg = '';
    var selectedListe = $(selectId).options[$(selectId).selectedIndex].value;
  
    switch(cmd) {
       case 'loadListe':
           MoCheck.setAktListe(selectedListe);
           msg = MoCheck.getString('message.listLoaded', selectedListe);
           break;
       case 'newListe':
           var newName = prompt(MoCheck.getString("message.newName"), '');
           if(newName == null || newName.length == 0) {
               return;
           }
           if($defined(this.jobCoords[newName])) {
               new HumanMessage(MoCheck.getString('message.error.nameAlreadyDefined', newName));
               return;
           }
           MoCheck.setAktListe(newName);
           msg = MoCheck.getString('message.listCreated', newName);
           break;
       case 'deleteListe':
           if(confirm(unescape(MoCheck.getString('message.deleteList', selectedListe)))) {
               MoCheck.deleteListe(selectedListe);
               msg = MoCheck.getString('message.listDeleted', selectedListe);
           }
           break;
       case 'renameListe':
           var newName = prompt(MoCheck.getString("message.newName"), selectedListe);
           if(newName == null || newName.length == 0) {
               return;
           }
           if($defined(this.jobCoords[newName])) {
               new HumanMessage(MoCheck.getString('message.error.nameAlreadyDefined', newName));
               return;
           }
           /* Neue Liste erstellen */
           MoCheck.addListe(newName);
          
           /* Neue Liste kopieren */
           this.jobCoords[newName] = this.jobCoords[selectedListe];
          
           /* Alte Liste loeschen */
           MoCheck.deleteListe(selectedListe, newName);

          
           msg = MoCheck.getString('message.listRenamed');
           break;
    }
  
    /* Jobs neu laden */
    MoCheck.getAllJobInfoFromServer();
  
    this.setCookie();
  
    /* Nachricht anzeigen */
    if(msg != '') {
       new HumanMessage(msg, {type:'success'});
    }
}

/**
* Eine Arbeit der Liste hinzufuegen
*/
function addJob(x, y) {
    /* Jobcoords in Array aufnehmen TODO das geht doch auch schoener... */
    var job = new Object();
    job.pos = new Object();
    job.pos.x = x;
    job.pos.y = y;
  
    MoCheck.getJobCoords().splice(0, 0, job);
  
    /* Arbeit in Cookie speichern */
    this.setCookie();
  
    /* Fenster schlieГџen, auslesen und neu oeffnen */
    MoCheck.getJobInfoFromServer(x, y);
  
    new HumanMessage(MoCheck.getString('message.addedWork'), {type:'success'});
}

/**
* Eine Arbeit aus der Liste entfernen
*/
function deleteJob(x, y) {
    $each(MoCheck.aktJobs, function(windowJob, index) {
       if(x == windowJob.pos.x && y == windowJob.pos.y) {
           if(confirm(unescape(MoCheck.getString('message.deleteFromList', windowJob.name)))) {
               /* Arbeit aus beiden Arrays entfernen */
               MoCheck.aktJobs.splice(index, 1);
               $each(MoCheck.getJobCoords(), function(jobCoords, coordIndex) {
                   if(x == jobCoords.pos.x && y == jobCoords.pos.y) {
                       MoCheck.getJobCoords().splice(coordIndex, 1);
                   }
               });
               /* Arbeit aus Cookie loeschen */
               MoCheck.setCookie();
              
               /* Fenster neu laden */
               MoCheck.openMotivationWindow();
              
               /* Add-Button einfuegen */
               MoCheck.setAddButton($('window_job_' + windowJob.pos.x + '_' + windowJob.pos.y + '_content'));
           }
       }
    });
}

/*
* Arbeiten werden aus Platzgruenden etwas komprimiert gespeichert:
* version/aktListe/liste1*x.y*x.y*x.y/liste2*x.y*x.y   usw.
*/
function getCookie() {
    var cookieVersion = "0";
    var data = "{}";
  
    if (document.cookie.indexOf(MoCheck.cookieName) != -1)  {
       var cookieContent = (document.cookie + ";").match(eval('/' + MoCheck.cookieName + '=.*?;/gi'));
       data = cookieContent[0].substring(MoCheck.cookieName.length + 1, cookieContent[0].length-1);
      
       data = unescape(data);
      
       var cookieElements = data.split(MoCheck.cookieSplitter[0]);
       cookieVersion = cookieElements[0];
       var aktListe = cookieElements[1];
      
       /* Arbeiten importieren */
       var arbeiten = '';
       var columnVisibility = '';
       for(var i=2; i < cookieElements.length; i++) {
           /* Aktuelle Liste in Json-Format bringen */
           var listElements = cookieElements[i].split(MoCheck.cookieSplitter[1]);
           var listenName = listElements[0];
          
           /* Sichtbare Spalten (Ab Version 1.1.3) */
           var coordsStartIndex = 1;
           var cols = "1111";
           if(this.isMinVersion(cookieVersion, "1.1.3")) {
               cols = listElements[1];
               coordsStartIndex = 2;
           }
           columnVisibility += (columnVisibility == '' ? '' : ',') + '"' + listenName + '":' + '"' + cols + '"';
          
           /* Coords der Arbeiten */
           var coordList = '';
           for(var j = coordsStartIndex; j < listElements.length; j++) {
               /* Aktuelle Arbeit in Json-Format bringen */
               var coords = listElements[j].split(MoCheck.cookieSplitter[2]);
               var aktArbeit = '{"pos":{"x":"' + coords[0] + '","y":"' + coords[1]+'"}}';
               coordList += (coordList == '' ? '' : ',') + aktArbeit;
           }
           coordList = '"' + listenName + '": [' + coordList + ']';
           arbeiten += (arbeiten == '' ? '' : ',') + coordList;
       }
       data = '{"aktListe":"' + aktListe + '", "arbeiten":{' + arbeiten + '}, "columnVisibility": {' + columnVisibility + '}}';
    }
  
    /****** Daten in MoCheck laden ******/
    data = Json.evaluate(data);
  
    /* Liefert zu einem Listennamen die Koordinaten der darin gespeicherten Arbeiten */
    this.jobCoords = $defined(data.arbeiten) ? data.arbeiten : new Object();

    /****** Verwendete (nicht leere) Listen ermitteln ******/
    this.listen = new Array();
    for (liste in this.jobCoords) {
       if(this.jobCoords[liste].length > 0) {
           this.listen.push(liste);
       }
    }
    MoCheck.setAktListe(data.aktListe);

    /****** Sichtbarkeiten ******/
    this.columnVisibility = new Object();
    if($defined(data.columnVisibility)) {
       $each(data.columnVisibility, function(colStr, liste) {
           var columnVisibility = new MoCheck.ColumnVisibility(Boolean(Number(colStr[0])), Boolean(Number(colStr[1])), Boolean(Number(colStr[2])), Boolean(Number(colStr[3])));
           MoCheck.setColumnVisibility(columnVisibility, liste);
       });
    }

    /****** ggf. Cookie direkt in neuer Version speichern ******/
    if(!this.isMinVersion(cookieVersion, this.getMoCheckVersion())) {
       this.setCookie();
    }
    /* ggf. Arbeiten aus aelterer Version loeschen */
    if (document.cookie.indexOf(MoCheck.oldCookieName) != -1)  {
       document.cookie = MoCheck.oldCookieName + "=; expires=0";
    }
}

function setCookie() {
    /* Arbeiten exportieren */
    var exportArbeiten = '';

    for (liste in this.jobCoords) {
       /* Leere Listen werden nicht gespeichert */
       if(this.jobCoords[liste] != null && this.jobCoords[liste].length > 0) {
           var aktListe = '';
           var arbeiten = this.jobCoords[liste];
          
           $each(arbeiten, function(arbeit, index) {
               var aktArbeit = arbeit.pos.x + MoCheck.cookieSplitter[2] + arbeit.pos.y;
               aktListe += (aktListe == '' ? '' : MoCheck.cookieSplitter[1]) + aktArbeit;
           });
          
           exportArbeiten +=  MoCheck.cookieSplitter[0] + liste + MoCheck.cookieSplitter[1] + this.getColumnVisibility(liste).toString2() + MoCheck.cookieSplitter[1] + aktListe;
       }
    }
    var data = MoCheck.getMoCheckVersion() + MoCheck.cookieSplitter[0] + MoCheck.aktListe + exportArbeiten;
    data = escape(data);
    var expires = new Date();
    expires.setTime(expires.getTime() + (1000 * 60 * 60 * 24 * 365));/* 1 Jahr */

    document.cookie = MoCheck.cookieName + "=" + data + "; expires=" + expires.toGMTString();
}

function getString(key, param) {
    var str = $defined(MoCheck.resourceBundle[key]) ? MoCheck.resourceBundle[key] : key;
  
    if($defined(param)) {
       if (!(param instanceof Array)) { param = new Array(param); }
       for(var i=0; i<param.length; i++) {
           str = str.replace('%'+(i+1), param[i]);
       }
    }
    return str;
};

/********************************
** Sichtbarkeit der Spalten *****
********************************/

/**
* Setzt die sichtbaren Spalten einer uebergebenen Liste
* Falls listenName leer: Sichtbare Spalten der aktuellen Liste
* @columnVisibility als Object, z.B. {'column1':Bool, 'column2':Bool, 'column3':Bool};
*/
function setColumnVisibility(columnVisibility, listenName) {
    listenName = $defined(listenName) ? listenName : this.aktListe;
    this.columnVisibility[listenName] = columnVisibility;
}

/*
* Liefert die sichtbaren Spalten einer uebergebenen Liste
* Falls listenName leer: Sichtbare Spalten der aktuellen Liste
*/
function getColumnVisibility(listenName) {
    listenName = $defined(listenName) ? listenName : this.aktListe;
    var result = $defined(this.columnVisibility[listenName]) ? this.columnVisibility[listenName] : new MoCheck.ColumnVisibility(true, true, true, true);
    return result;
}

function isColumnVisible(column) {
    return eval('this.getColumnVisibility().show_' + column + '()');
}

function changeColumnVisibility(str, isVisible) {
    var cols2 = MoCheck.getColumnVisibility();
    eval('cols2.' + str + '=' + isVisible + ';');
    this.setColumnVisibility(cols2);
    MoCheck.setCookie();
    MoCheck.openMotivationWindow();
}

/********************************
** Sonstiges ********************
********************************/

function getAuthor() {
    var hrefStr = '';
    switch(window.location.hostname.substr(0,window.location.hostname.search(/\./))) {
       case 'de1':
       case 'de7':
       case 'de9':
           hrefStr = 'javascript:AjaxWindow.show(\'profile\',{char_id:416225},\'416225\');';
           break;
       default:
           hrefStr = 'http://userscripts.org/users/321009';
    }
    return '<a href=\"' + hrefStr + '\">William Manney</a>';
}

function isMinVersion(a, b) {
    var result = true;
    a = a.replace(/\./g, "");
    b = b.replace(/\./g, "");
    for (var i = 1; i <= Math.max(a.length, b.length); i++) {
       var z1 = parseInt(a.length >= i ? a[i-1] : "0");
       var z2 = parseInt(b.length >= i ? b[i-1] : "0");
       if(z1 > z2) {
           break;
       }
       if(z1 < z2) {
           result = false;
           break;
       }
    }
    return result;
}

function getLanguage(lang) {
    res = new Array();
    res['en'] = {
       'dialog.closeAll.popup':'Close All',
       'dialog.minimize.popup':'Minimize',
       'dialog.close.popup':'Close',

       'dialog.tab.work.titel':'Job',
       'dialog.tab.about.titel':'About',
       'dialog.tab.work.nothingSelected.1':'There is no selected work!',
       'dialog.tab.work.nothingSelected.2':'You need to open a job and add it.',
       'dialog.tab.work.tableHeader.work':'Work',
       'dialog.tab.work.tableHeader.points':'Labor Points',
       'dialog.tab.work.tableHeader.money':'Wages',
       'dialog.tab.work.tableHeader.experience':'Experience',
       'dialog.tab.work.tableHeader.luck':'Luck',
       'dialog.tab.work.tableHeader.motivation':'Motivation',
      
       'dialog.tab.configuration.actual':'actual',
       'dialog.tab.configuration.btnDelete.popup':'Delete list',
       'dialog.tab.configuration.btnRename.popup':'Rename list',
       'dialog.tab.configuration.btnNew.popup':'Create new List',
  
       'select.option.minutes':'m',
       'select.option.hours':'h',
      
       'btnOk.label':'Ok',
       'btnAdd.popup':'Add Job',
       'btnCenter.popup':'<b>Transit time:</b> %1h',
       'btnDelete.popup':'Delete job from the list',
      
       'sortIcon.popup.money':'Sort by <b>wages</b>',
       'sortIcon.popup.luck':'Sort by <b>luck</b>',
       'sortIcon.popup.experience':'Sort by <b>experience</b>',
       'sortIcon.popup.motivation':'Sort by <b>motivation</b>',
      
       'visibleIcon.popup.money':'Show /don\'t show <b>wages</b>',
       'visibleIcon.popup.luck':'Show /don\'t show <b>luck</b>',
       'visibleIcon.popup.experience':'Show /don\'t show <b>experience</b>',
       'visibleIcon.popup.motivation':'Show /don\'t show <b>motivation</b>',
      
       'jobImage.popup':'Job: <b>%1</b><br />Labor points: <b>%2</b>',
  
       'message.error.unableToDeleteCurrentList':'Unable to delete current list.',
       'message.deleteList':'Delete List %1?',
       'message.newName':'New name:',
       'message.addedWork':'Added job.',
       'message.deleteFromList':'Delete %1 from list?',
       'message.listLoaded':'Loaded %1.',
       'message.listDeleted':'Deleted %1.',
       'message.listRenamed':'Renamed list.',
       'message.listCreated':'Created list.',
       'message.error.nameAlreadyDefined': 'Name %1 already in use.',
      
       'author':'Author:'
    };
    res['de'] = {
       'dialog.closeAll.popup':'Alle Fenster schlie&szlig;en',
       'dialog.minimize.popup':'Fenster minimieren',
       'dialog.close.popup':'Fenster schlie&szlig;en',

       'dialog.tab.work.titel':'Arbeiten',
       'dialog.tab.about.titel':'&Uuml;ber',
       'dialog.tab.work.nothingSelected.1':'Es wurden noch keine Arbeiten ausgew&auml;hlt!',
       'dialog.tab.work.nothingSelected.2':'Hierf&uuml;r musst du eine Arbeit &ouml;ffnen und diese hinzuf&uuml;gen.',
       'dialog.tab.work.tableHeader.work':'Arbeit',
       'dialog.tab.work.tableHeader.points':'Arbeitspunkte',
       'dialog.tab.work.tableHeader.money':'Lohn',
       'dialog.tab.work.tableHeader.experience':'Erfahrung',
       'dialog.tab.work.tableHeader.luck':'Gl&uuml;ck',
       'dialog.tab.work.tableHeader.motivation':'Motivation',
      
       'dialog.tab.configuration.actual':'aktuell',
       'dialog.tab.configuration.btnDelete.popup':'Liste l&ouml;schen',
       'dialog.tab.configuration.btnRename.popup':'Liste umbenennen',
       'dialog.tab.configuration.btnNew.popup':'Neue Liste erstellen',
  
       'select.option.minutes':'m',
       'select.option.hours':'h',
      
       'btnOk.label':'Ok',
       'btnAdd.popup':'Zum Motivations-Check hinzuf&uuml;gen',
       'btnCenter.popup':'<b>Wegzeit:</b> %1h',
       'btnDelete.popup':'Arbeit aus dieser Liste l&ouml;schen',
      
       'sortIcon.popup.money':'Nach <b>Lohn</b> sortieren',
       'sortIcon.popup.luck':'Nach <b>Gl&uuml;ck</b> sortieren',
       'sortIcon.popup.experience':'Nach <b>Erfahrung</b> sortieren',
       'sortIcon.popup.motivation':'Nach <b>Motivation</b> sortieren',
      
       'visibleIcon.popup.money':'<b>Lohn</b> ein-/ausblenden',
       'visibleIcon.popup.luck':'<b>Gl&uuml;ck</b> ein-/ausblenden',
       'visibleIcon.popup.experience':'<b>Erfahrung</b> ein-/ausblenden',
       'visibleIcon.popup.motivation':'<b>Motivation</b> ein-/ausblenden',
      
       'jobImage.popup':'Arbeit: <b>%1</b><br />Arbeitspunkte: <b>%2</b>',
  
       'message.error.unableToDeleteCurrentList':'Die aktuelle Liste kann nicht gel&ouml;scht werden.',
       'message.deleteList':'Liste %1 l%F6schen?',
       'message.newName':'Neuer Name der Liste:',
       'message.addedWork':'Arbeit hinzugef&uuml;gt.',
       'message.deleteFromList':'%1 aus dieser Liste l%F6schen?',
       'message.listLoaded':'%1 wurde geladen.',
       'message.listDeleted':'%1 wurde gel&ouml;scht.',
       'message.listRenamed':'Liste wurde umbenannt.',
       'message.listCreated':'Liste wurde erstellt.',
       'message.error.nameAlreadyDefined': 'Der Name %1 wird bereits verwendet.',
      
       'author':'Autor:'
    };
    res['ru'] = {
       'dialog.closeAll.popup':'Закрыть все окна',
       'dialog.minimize.popup':'Свернуть окно',
       'dialog.close.popup':'Закрыть окно',

       'dialog.tab.work.titel':'Работы',
       'dialog.tab.about.titel':'О скрипте',
       'dialog.tab.work.nothingSelected.1':'Не выбрана ни одна работа!',
       'dialog.tab.work.nothingSelected.2':'Вам нужно открыть работу и добавить её.',
       'dialog.tab.work.tableHeader.work':'Work',
       'dialog.tab.work.tableHeader.points':'Очки труда',
       'dialog.tab.work.tableHeader.money':'Заработок',
       'dialog.tab.work.tableHeader.experience':'Опыт',
       'dialog.tab.work.tableHeader.luck':'Удача',
       'dialog.tab.work.tableHeader.motivation':'Мотивация',
      
       'dialog.tab.configuration.actual':'текущий',
       'dialog.tab.configuration.btnDelete.popup':'Удалить список',
       'dialog.tab.configuration.btnRename.popup':'Переименовать список',
       'dialog.tab.configuration.btnNew.popup':'Создать список',
  
       'select.option.minutes':'м',
       'select.option.hours':'ч',
      
       'btnOk.label':'Ok',
       'btnAdd.popup':'Добавить работу',
       'btnCenter.popup':'<b>Расстояние:</b> %1',
       'btnDelete.popup':'Удалить работу из списка',
      
       'sortIcon.popup.money':'Сортировать по <b>заработку</b>',
       'sortIcon.popup.luck':'Сортировать по <b>удаче</b>',
       'sortIcon.popup.experience':'Сортировать по <b>опыту</b>',
       'sortIcon.popup.motivation':'Сортировать по <b>мотивации</b>',
      
       'visibleIcon.popup.money':'Показать /скрыть <b>заработок</b>',
       'visibleIcon.popup.luck':'Показать /скрыть <b>удачу</b>',
       'visibleIcon.popup.experience':'Показать /скрыть <b>опыт</b>',
       'visibleIcon.popup.motivation':'Показать /скрыть <b>мотивацию</b>',
      
       'jobImage.popup':'Работа: <b>%1</b><br />Очки труда: <b>%2</b>',
  
       'message.error.unableToDeleteCurrentList':'Не удаеться удалить текущий список.',
       'message.deleteList':'Удалить список %1?',
       'message.newName':'Новое имя:',
       'message.addedWork':'Работа добавлена.',
       'message.deleteFromList':'Удалить %1 из списка?',
       'message.listLoaded':'Загружен %1.',
       'message.listDeleted':'Удален %1.',
       'message.listRenamed':'Список переименован.',
       'message.listCreated':'Список создан.',
       'message.error.nameAlreadyDefined': 'Имя %1 уже используеться.',
      
       'author':'Переводчик: <b>Enfo</b>. Автор:'
    };   
res['es'] = {
       'dialog.closeAll.popup':'Cerrar todas las ventanas',
       'dialog.minimize.popup':'Minimizar',
       'dialog.close.popup':'Cerrar ventana',

       'dialog.tab.work.titel':'Trabajos',
       'dialog.tab.about.titel':'Sobre el script',
       'dialog.tab.work.nothingSelected.1':'¡No has seleccionado ningún trabajo!',
       'dialog.tab.work.nothingSelected.2':'Debes abrir el trabajo y agregarlo',
       'dialog.tab.work.tableHeader.work':'Trabajo',
       'dialog.tab.work.tableHeader.points':'Puntos de trabajo',
       'dialog.tab.work.tableHeader.money':'Sueldo',
       'dialog.tab.work.tableHeader.experience':'Puntos de experiencia',
       'dialog.tab.work.tableHeader.luck':'Suerte',
       'dialog.tab.work.tableHeader.motivation':'Motivación',
      
       'dialog.tab.configuration.actual':'actual',
       'dialog.tab.configuration.btnDelete.popup':'Borrar lista',
       'dialog.tab.configuration.btnRename.popup':'Renombrar lista',
       'dialog.tab.configuration.btnNew.popup':'Crear una lista nueva',
  
       'select.option.minutes':'min',
       'select.option.hours':'h',
      
       'btnOk.label':'Ok',
       'btnAdd.popup':'Añadir un trabajo',
       'btnCenter.popup':'<b>Tiempo de viaje:</b> %1h',
       'btnDelete.popup':'Eliminar de la lista de trabajo',
      
       'sortIcon.popup.money':'Ordenar por <b>sueldo</b>',
       'sortIcon.popup.luck':'Ordenar por <b>suerte</b>',
       'sortIcon.popup.experience':'Ordenar por <b>puntos de experiencia</b>',
       'sortIcon.popup.motivation':'Ordenar por <b>motivación</b>',
      
       'visibleIcon.popup.money':'Mostrar / No mostrar <b>sueldo</b>',
       'visibleIcon.popup.luck':'Mostrar / No mostrar <b>suerte</b>',
       'visibleIcon.popup.experience':'Mostrar / No mostrar <b>puntos de experiencia</b>',
       'visibleIcon.popup.motivation':'Mostrar / No mostrar <b>motivación</b>',
      
       'jobImage.popup':'Trabajo: <b>%1</b><br />Puntos de trabajo: <b>%2</b>',
  
       'message.error.unableToDeleteCurrentList':'No se puede eliminar la lista actual.',
       'message.deleteList':'¿Deseas borrar %1?',
       'message.newName':'Nombre de la nueva lista:',
       'message.addedWork':'Trabajo añadido.',
       'message.deleteFromList':'¿Borrar %1 de la lista?',
       'message.listLoaded':'%1 cargado.',
       'message.listDeleted':'%1 borrado.',
       'message.listRenamed':'Nombre de la lista modificado.',
       'message.listCreated':'Lista Creada.',
       'message.error.nameAlreadyDefined': 'El nombre %1 ya está en uso.',
      
       'author':'Autor Original: <b>JoeSmith</b>. Esta versión:'
    };   

    return (res[lang] != null ? res[lang] : res['es']);
}

var moFunctions = ['init', 'addMotivationButton', 'openMotivationWindow', 'getJsParam', 'setTrigger', 'lo', 'addSortIcon', 'addVisibleIcon', 'getJobImageDiv',
                   'getCookie', 'setCookie', 'addJobRow', 'getLanguage', 'durationChanged',
                   'getJobCoords', 'reloadWindow', 'setAddButton',
                   'setAktListe', 'showTab',
                   'setColumnVisibility', 'getColumnVisibility', 'isColumnVisible', 'changeColumnVisibility',
                   'addListe', 'deleteListe',
                   'getMoCheckVersion', 'isMinVersion',
                   'getString', 'getJobInfoFromServer', 'getAllJobInfoFromServer', 'readJobInfo',
                   'sortArbeiten', 'changeSortOrder',
                   'doConfiguration',
                   'addJob', 'deleteJob', 'getAuthor'];

var moCheck_script = document.createElement('script');
moCheck_script.type='text/javascript';
moCheck_script.text =  'if(window.MoCheck == undefined) {\n';
moCheck_script.text += '  window.MoCheck = new Object();\n';

for (var i = 0; i< moFunctions.length; i++) {
    var moFunction = moFunctions[i];
    moCheck_script.text += '  MoCheck.' + moFunction + ' = ' + eval(moFunction.toString()) + '\n';
};
moCheck_script.text += '  MoCheck.init();\n';
moCheck_script.text += '}';
document.body.appendChild(moCheck_script);