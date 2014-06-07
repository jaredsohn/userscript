// ==UserScript==
// @name           GLB Print Friendly Mod (mrmaomao edit)
// @namespace      GLB
// @description    Mod to Print Friendly via request
// @include        http://goallineblitz.com/game/player.pl?player_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.7/jquery-ui.min.js
// ==/UserScript==
// 
// 
// 

function getElementsByClassName(classname, par){
    
    var a=[];  
   var re = new RegExp('\\b' + classname + '\\b'); 
   var els = par.getElementsByTagName("*");
   for(var m=0,j=els.length; m<j; m++){      
      if(re.test(els[m].className)){
         a.push(els[m]);
      }
   }
   return a;
};
function getElementsByClassNameMulti(classname, classname1, par){
    
    var a=[];  
   var re = new RegExp('\\b' + classname + '\\b'); 
   var re1 = new RegExp('\\b' + classname1 + '\\b'); 
   var els = par.getElementsByTagName("*");
   for(var m=0,j=els.length; m<j; m++){      
      if(re.test(els[m].className) || re1.test(els[m].className)){
         a.push(els[m]);
      }
   }
   return a;
};
function getElementsByClassNameWC(classname, par){
    
    var a=[];  
   var re = new RegExp(classname); 
   var els = par.getElementsByTagName("*");
   for(var m=0,j=els.length; m<j; m++){      
      if(re.test(els[m].className)){
         a.push(els[m]);
      }
   }
   return a;
};

var playerinfo = new Array();
// name (big_head subhead_head)

var nameclass = getElementsByClassName('big_head subhead_head', document);

if (nameclass[0].innerHTML.indexOf('<li style="font-weight:700;">') != -1) {
    playerinfo[0] = nameclass[0].innerHTML.substring(nameclass[0].innerHTML.indexOf(':5px;">')+7,nameclass[0].innerHTML.indexOf('</span>'));
}else{
    playerinfo[0] = nameclass[0].innerHTML;
}



function makePrint(){
    // level 
    playerinfo[1] = $('td[class="current_stats_value"]:first').text();
    // position 
    playerinfo[2] = $('div[class*="position"]:first').text();
    // height 
    playerinfo[3] = $('td[class="vital_data"]:first').text();
    // weight
    playerinfo[4] = $('td[class="vital_data"]:eq(1)').text();

    if (document.body.innerHTML.indexOf('Money:')!=-1) {
        // money 

        var moneyclass = $('td[class="player_money"]:first').text();
        moneysplit = moneyclass.split('$');
        playerinfo[5] = '$' + moneysplit[1].substring(0,moneysplit[1].indexOf(' '));
        // salary (class="player_money" substring end
        playerinfo[6] = '$' + moneysplit[2].substring(0,moneysplit[2].indexOf(' '));

        // skill points (class="player_points_value" td split [1]
        var spendpoints = $('tr[class="player_points_value"]:first').html();
        var spendsplit = spendpoints.split('<td>');
        // training points
        playerinfo[7] = spendsplit[2].substring(0,spendsplit[2].indexOf('</td>'));
        // bonus points
        playerinfo[8] = spendsplit[3].substring(0,spendsplit[3].indexOf('</td>'));
        // shopping tokens
        playerinfo[9] = spendsplit[4].substring(0,spendsplit[4].indexOf('</td>'));

        playerinfo[10] = spendsplit[5].substring(0,spendsplit[5].indexOf('</td>'));
        // xp (class="player_level_progress" substring
        if (document.body.innerHTML.indexOf('Next Level:')>-1) {
            var xpclass = $('td[class="player_level_progress"]').html();
            var spansplit = xpclass.split('</span>');
    
            playerinfo[11] = spansplit[1].substring(0, spansplit[1].indexOf('/'));
            
        }else{
            playerinfo[11] = "N/A";
        }
        // vet points 
        if (document.body.innerHTML.indexOf('Vet Pts:') > -1) {
            playerinfo[12] = $('a[href*="/game/vet_skills.pl?player_id="]').text();
        }else{
            playerinfo[12] = 0;
        }
    }else{
        playerinfo[5] = -1;
        playerinfo[6] = -1;
        playerinfo[7] = -1;
        playerinfo[8] = -1;
        playerinfo[9] = -1;
        playerinfo[10] = -1;
        playerinfo[11] = -1;
        playerinfo[12] = -1;
    }
    
    var skills = $('div[class*="stat_value_tall"]:eq(0)').text();
    // strength (class="stat_value_tall***_boosted" [0]
    playerinfo[13] = $('div[class*="stat_value_tall"]:eq(0)').text();
    // blocking (class="stat_value_tall***_boosted" [1]
    playerinfo[14] = $('div[class*="stat_value_tall"]:eq(1)').text();
    // speed (class="stat_value_tall***_boosted" [2]
    playerinfo[15] = $('div[class*="stat_value_tall"]:eq(2)').text();
    // tackling (class="stat_value_tall***_boosted" [3]
    playerinfo[16] = $('div[class*="stat_value_tall"]:eq(3)').text();
    // agility (class="stat_value_tall***_boosted" [4]
    playerinfo[17] = $('div[class*="stat_value_tall"]:eq(4)').text();
    // throwing (class="stat_value_tall***_boosted" [5]
    playerinfo[18] = $('div[class*="stat_value_tall"]:eq(5)').text();
    // jumping (class="stat_value_tall***_boosted" [6]
    playerinfo[19] = $('div[class*="stat_value_tall"]:eq(6)').text();
    // catching (class="stat_value_tall***_boosted" [7]
    playerinfo[20] = $('div[class*="stat_value_tall"]:eq(7)').text();
    // stamina (class="stat_value_tall***_boosted" [8]
    playerinfo[21] = $('div[class*="stat_value_tall"]:eq(8)').text();
    // carrying (class="stat_value_tall***_boosted" [9]
    playerinfo[22] = $('div[class*="stat_value_tall"]:eq(9)').text();
    // vision (class="stat_value_tall***_boosted" [10]
    playerinfo[23] = $('div[class*="stat_value_tall"]:eq(10)').text();
    // kicking (class="stat_value_tall***_boosted" [11]
    playerinfo[24] = $('div[class*="stat_value_tall"]:eq(11)').text();
    // confidence (class="stat_value_tall***_boosted" [12]
    playerinfo[25] = $('div[class*="stat_value_tall"]:eq(12)').text();
    // punting (class="stat_value_tall***_boosted" [13]
    playerinfo[26] = $('div[class*="stat_value_tall"]:eq(13)').text();


    // sa  (<div id="skill_trees_content">    class="skill_button" onmouseover substring <span class=\'skill_name\'>   div class="skill_level boosted_skill_level"
    var fullskilltrees = document.getElementById('skill_trees_content')

    var satree = getElementsByClassName('skill_button', fullskilltrees);
    var insertnum = 27;
    var skillname = '';
    var skillvalue = 0;

    var skillheadlist = getElementsByClassName('subhead', fullskilltrees);
    var skillheads = new Array;
    var tempskillhold = '';

    for (var skillloop = 0; skillloop<skillheadlist.length;skillloop++) {
        skillheads[skillloop] = new Array;
        skillheads[skillloop][0] = skillheadlist[skillloop].innerHTML.substring(skillheadlist[skillloop].innerHTML.indexOf('">') + 2, skillheadlist[skillloop].innerHTML.indexOf('</span'));
        tempskillhold = fullskilltrees.innerHTML.substring(fullskilltrees.innerHTML.indexOf(skillheadlist[skillloop].innerHTML), fullskilltrees.innerHTML.indexOf('<div style="clear: both;', fullskilltrees.innerHTML.indexOf(skillheadlist[skillloop].innerHTML)));
        tempskillcount = tempskillhold.split('<div class="skill_button"');
        if (skillloop>0) {
            skillheads[skillloop][1] = skillheads[skillloop-1][1] + tempskillcount.length -1;
        }else{
            skillheads[skillloop][1] = tempskillcount.length -1;
        }

    }
    for (var q=0;q<satree.length;q++) {
        skillnamehold = satree[q].getAttribute("onmouseover");
        skillname = skillnamehold.substring(skillnamehold.indexOf("'>", skillnamehold.indexOf('span class='))+2,skillnamehold.indexOf('</span'));
        skillvalue = getElementsByClassNameMulti('skill_level', 'skill_level boosted_skill_level', satree[q]);
        playerinfo[insertnum] = skillname.substring(0, 5) + ':' + skillvalue[0].innerHTML;
        insertnum++;
    }
    var vastart = insertnum;
    // va  (<div id="vet_skills_content">   class="skill_button" <span class=\'skill_name\' substring> <div class="skill_level"

    if (document.body.innerHTML.indexOf('vet_skills_content')!= -1) {
    
        var vatree = getElementsByClassName('skill_button', document.getElementById('vet_skills_content'));
        var vaskillname = '';
        var vaskillvalue = 0;
        for (var q=0;q<vatree.length;q++) {
            vaskillnamehold = vatree[q].getAttribute("onmouseover");
            vaskillname = vaskillnamehold.substring(vaskillnamehold.indexOf("'>", vaskillnamehold.indexOf('span class='))+2,vaskillnamehold.indexOf('</span'));
            vaskillvalue = getElementsByClassNameMulti('skill_level', 'skill_level boosted_skill_level', vatree[q]);
            playerinfo[insertnum] = vaskillname.substring(0, 5) + ':' + vaskillvalue[0].innerHTML;
            insertnum++;
        }
    }

    var newwindow ='';
    var dochtml = '<h3>'+playerinfo[0]+ ' (Lv: ' + playerinfo[1] + ' ' + playerinfo[2] +' ';
    dochtml+= playerinfo[3] + ' ' + playerinfo[4] + ')</h3>';
    if(playerinfo[8] != -1){
        dochtml+= '<i><u>Experience, Skill and Cash</u></i><br>';
        dochtml+= 'Cash:' + playerinfo[5] + ', ' + playerinfo[6] + '/day<br>';
        dochtml+= 'TP:' + playerinfo[8] + ', BT:' + playerinfo[9] + ', ST:' + playerinfo[10] + ', XP: ' + playerinfo[11] + '<br>';
        dochtml+= '<br>';
        dochtml+= '<i><u>Attributes</u></i>(' + playerinfo[7] +' SP)<br>';
    }else{
        dochtml+= '<i><u>Attributes</u></i><br>';
    }

    dochtml+= '<i>Physical</i> ..... <i>Football</i><br>';
    dochtml+= 'Str:' + playerinfo[13] + '.....Blk ' + playerinfo[14]+'<br>';
    dochtml+= 'Spd:' + playerinfo[15] + '.....Tkl ' + playerinfo[16]+'<br>';
    dochtml+= 'Agi:' + playerinfo[17] + '.....Thr ' + playerinfo[18]+'<br>';
    dochtml+= 'Jmp:' + playerinfo[19] + '.....Cat ' + playerinfo[20]+'<br>';
    dochtml+= 'Stm:' + playerinfo[21] + '.....Car ' + playerinfo[22]+'<br>';
    dochtml+= 'Vis:' + playerinfo[23] + '.....Kic ' + playerinfo[24]+'<br>';
    dochtml+= 'Con:' + playerinfo[25] + '.....Pun ' + playerinfo[26]+'<br><br>';
    dochtml+= '<i><u>Special Abilities</u></i><br>';
    dochtml+= '<i>' + skillheads[0][0] + '</i> ';
    var skillcount = 0;
    for (var ts=27;ts < vastart;ts++) {
        if (ts-27 == skillheads[skillcount][1]) {
            skillcount++;
            dochtml = dochtml.substring(0, dochtml.length -1);
            dochtml+= '<br><i>' + skillheads[skillcount][0] + '</i> ';
        }
        dochtml+= ' '+playerinfo[ts] + ',';
    }
    dochtml = dochtml.substring(0, dochtml.length-1);
    if(document.body.innerHTML.indexOf('vet_skills_content')!= -1) {
        if(playerinfo[8] != -1) {
            dochtml+= '<br><br><i><u>Veterans Abilities</u></i> (' + + playerinfo[12] +' VP)<br>';
        }else{
        
            dochtml+= '<br><br><i><u>Veterans Abilities</u></i><br>';
        }
        for(var valooping = vastart;valooping<playerinfo.length;valooping++) {
            dochtml+= ' '+playerinfo[valooping]+',';
        }
        dochtml = dochtml.substring(0, dochtml.length -1);
    }
    newwindow=window.open('',"Sort Favorites", "width=600,height=640,scrollbars=yes,resizable=yes,toolbar=no,location=no,menubar=no");
    if (!newwindow.opener) newwindow.opener = self;
    newwindow.document.writeln(dochtml);

}


var linkitems = $('a[href*="&print=1"]');

linkitems.attr("href","");
linkitems.attr("target", "_self");
linkitems.bind('click', makePrint, false);