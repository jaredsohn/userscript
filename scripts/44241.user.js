// ==UserScript==
// @name           Combine report S7
// @namespace      Combine report
// @include        http://goallineblitz.com/game/player.pl?*
// ==/UserScript==

/*
 * pabst was here 3/14/09
 */

function getElementsByClassName(classname, par){
    var a=[];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = par.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++){
        if(re.test(els[i].className)){
            a.push(els[i]);
        }
    }
    return a;
}

function parseStatsList(statslist, ret) {
    var els = statslist.getElementsByTagName("div");
    for (var i=0; i<els.length; i++) {
        if (els[i].className == 'stat_head_tall') {
            ret.push(els[i].innerHTML);
        }
        if (els[i].className == 'stat_value_tall' || els[i].className == 'stat_value_tall_boosted') {
            ret.push(parseFloat(els[i].textContent));
        }
    }
    return ret;
}

function getSA(document, treeID, index) {  // index = -1 : sum

    var sum=0;
    var skilltree = document.getElementById('skill_trees_content');
    var treeindex = getElementsByClassName('skill_level', skilltree);
    if (index==-1) {
        for (var i=treeID*5; i<(treeID+1)*5; i++)
            sum += parseInt(treeindex[i].innerHTML);
        return sum;
    }
    else return parseInt(treeindex[treeID*5 + index].innerHTML);
}

function addEntry(tr, data) {
    var colname = document.createElement("td");
    colname.setAttribute('align','center');
    colname.appendChild(document.createTextNode(data));
    tr.appendChild(colname);
}

window.setTimeout( function() {

    var player_name = document.getElementsByClassName('large_title_bar')[0];
    var pos = "", strength=0, speed, agility, jumping;
    var stamina, vision, confidence, blocking, tackling, throwing, catching, carrying, kicking, punting;
    var arr = new Array(0), height, weight, contract;

    var BMI, BMI_category, wonderlic, dash, vertical_jump, press, broad_jump, cone, shuttle;
    var block_shed, pass_block, ball_carrying, pass_catching, pass_accuracy, scrambling, run_stuffer, pass_rushing;
    var run_pursuit, pass_coverage, distance, accuracy, hotdog, limbo, swimsuit, wrestling, chick;
    var ptr1 = player_name.firstChild.textContent;
    var pos = document.getElementsByClassName("position")[0].textContent;

    var player_stats = document.getElementById('player_stats');
    if (player_stats == null) return;

    var stats_list = document.getElementsByClassName('player_stats_table');
    for (var i=0; i<stats_list.length; i++) {
        arr = parseStatsList(stats_list[i], arr);
    }
    
    var vitals = getElementsByClassName('vital_data', document);
    for (var i=0; i<vitals.length; i++) {
        if (vitals[i].innerHTML.indexOf('in.') >= 0) {
            ptr1 = vitals[i].innerHTML.indexOf('in.');
            height = vitals[i].innerHTML.substring(0, ptr1);
        }
        if (vitals[i].innerHTML.indexOf('lbs') >= 0) {
            ptr1 = vitals[i].innerHTML.indexOf('lbs');
            weight = vitals[i].innerHTML.substring(0, ptr1);
        }
        if (vitals[i].innerHTML.indexOf('/yr') >= 0) {
            ptr1 = vitals[i].innerHTML.indexOf('/yr');
            contract = vitals[i].innerHTML.substring(1, ptr1);
            while ((ptr1 = contract.indexOf(',')) >= 0) {
                var len = contract.length;
                contract = contract.substring(0, ptr1) + contract.substring(ptr1+1, len);
            }
            contract = parseInt(contract);
        }
    }
     
    for (var i=0; i<arr.length; i+=2)
        if (arr[i].indexOf("Strength") >= 0) strength=arr[i+1];
        else if (arr[i].indexOf("Speed") >= 0) speed=arr[i+1];
        else if (arr[i].indexOf("Agility") >= 0) agility=arr[i+1];
        else if (arr[i].indexOf("Jumping") >= 0) jumping=arr[i+1];
        else if (arr[i].indexOf("Stamina") >= 0) stamina=arr[i+1];
        else if (arr[i].indexOf("Vision") >= 0) vision=arr[i+1];
        else if (arr[i].indexOf("Confidence") >= 0) confidence=arr[i+1];
        else if (arr[i].indexOf("Blocking") >= 0) blocking=arr[i+1];
        else if (arr[i].indexOf("Tackling") >= 0) tackling=arr[i+1];
        else if (arr[i].indexOf("Throwing") >= 0) throwing=arr[i+1];
        else if (arr[i].indexOf("Catching") >= 0) catching=arr[i+1];
        else if (arr[i].indexOf("Carrying") >= 0) carrying=arr[i+1];
        else if (arr[i].indexOf("Kicking") >= 0) kicking=arr[i+1];
        else if (arr[i].indexOf("Punting") >= 0) punting=arr[i+1];

    BMI = Math.round(parseFloat(weight*703/(height*height))*10)/10;
    if (BMI <= 18.5) BMI_category = "Underweight";
    else if (BMI <= 24.9) BMI_category = "Normal";
    else if (BMI <= 29.9) BMI_category = "Overweight";
    else BMI_category = "Obese";
    wonderlic = parseInt(.15 * confidence + .3 * vision);
    dash = Math.round(parseFloat(6-0.005*agility-0.015*speed)*100)/100;
    vertical_jump = parseInt(.1*agility + .7*jumping);
    press = parseInt(.4*strength + .2*stamina);
    broad_jump = Math.round(parseFloat(3+.01*strength + .1*jumping)*100)/100;
    cone = Math.round(parseFloat(8 - .006*speed - .013*agility)*100)/100;
    shuttle = Math.round(parseFloat(13.5 - .015*speed - .015*agility - 0.01*stamina)*100)/100;
    hotdog = parseInt(.3*stamina + .1*speed + .08*weight);
    limbo = Math.round(parseFloat(height - height*agility*.01)*100)/100;
    swimsuit = Math.round(parseFloat(10 - .5*(BMI-20) + .02*confidence)*10)/10;
    if (swimsuit>10) swimsuit=10;
    if (swimsuit<0) swimsuit=0;
    wrestling = Math.round(parseFloat(strength + tackling + catching + agility)*100)/100;
    chick = Math.round(parseFloat(confidence + contract/6000 + swimsuit*3)*100)/100;

    var t = document.createElement("table");
    t.setAttribute("border","1");
    t.setAttribute("cellspacing","0");
    t.setAttribute('style','width: 100%');
    t.setAttribute('id', 'combine_report');
    var tr = document.createElement("tr");
    tr.setAttribute('class','nonalternating_color combine_report');
    var td = document.createElement("td");
    td.setAttribute('align','center');
    td.setAttribute('colspan', 10);
    td.appendChild(document.createTextNode("Combine Report"));
    tr.appendChild(td);
    t.appendChild(tr);

    var list1 = ["Body Mass Index", "Wonderlic test", "40-yard dash", "Vertical Jump", "Bench Press", "Broad Jump", "3-Cone Drill", "60-yard Shuttle"];
    var tr2 = document.createElement("tr");
    tr2.setAttribute('class','nonalternating_color2 scout_report');
    for (var x=0; x<list1.length; x++) {
        var colname = document.createElement("td");
        colname.setAttribute('align','center');
        colname.appendChild(document.createTextNode(list1[x]));
        tr2.appendChild(colname);
    }
    t.appendChild(tr2);

    var tr3 = document.createElement("tr");
    tr3.setAttribute('class','alternating_color1');
    t.appendChild(tr3);
    addEntry(tr3, BMI + " ("+BMI_category+ ")");
    addEntry(tr3, wonderlic);
    addEntry(tr3, dash + " sec");
    addEntry(tr3, vertical_jump + " inches");
    addEntry(tr3, press + " reps");
    addEntry(tr3, broad_jump + " ft");
    addEntry(tr3, cone + " sec");
    addEntry(tr3, shuttle + " sec");

    var t2 = document.createElement("table");
    t2.setAttribute("border","1");
    t2.setAttribute("cellspacing","0");
    t2.setAttribute('style','width: 100%');
    t2.setAttribute('id', 'combine_report');
    var tr4 = document.createElement("tr");
    tr4.setAttribute('class','nonalternating_color combine_report');
    var td2 = document.createElement("td");
    td2.setAttribute('align','center');
    td2.setAttribute('colspan', 5);
    td2.appendChild(document.createTextNode("Confidential Combine Report"));
    tr4.appendChild(td2);
    t2.appendChild(tr4);

    var tr5 = document.createElement("tr");
    tr5.setAttribute('class','nonalternating_color2 scout_report');
    t2.appendChild(tr5);
    addEntry(tr5, "Hot Dog Eating Competition");
    addEntry(tr5, "Limbo Competition");
    addEntry(tr5, "Steer Wrestling");
    addEntry(tr5, "Swimsuit Competition");
    addEntry(tr5, "Chick Magnet");

    var tr6 = document.createElement("tr");
    tr6.setAttribute('class','alternating_color1');
    t2.appendChild(tr6);
    addEntry(tr6, hotdog + " dogs in 12 min");
    addEntry(tr6, limbo + " inches");
    addEntry(tr6, wrestling);
    addEntry(tr6, swimsuit + " / 10");
    addEntry(tr6, chick);
    
    if (pos.indexOf('OT')>=0 || pos.indexOf('G')>=0 || (pos.indexOf('C')>=0 && pos.indexOf('CB')<0)) {
        block_shed = Math.round(parseFloat(blocking + strength + vision + stamina + 2 * getSA(document, 1, -1))*100)/100;
        pass_block = Math.round(parseFloat(blocking + agility + vision + speed + 2 * getSA(document, 0, -1))*100)/100;

        addEntry(tr2, "Block Shed");
        addEntry(tr2, "Pass Block");
        addEntry(tr3, block_shed);
        addEntry(tr3, pass_block);
    }
    else if (pos.indexOf('WR')>=0 || pos.indexOf('HB')>=0) {
        ball_carrying = Math.round(parseFloat(carrying + strength + vision + agility + speed + 2 * getSA(document, 0, -1) + getSA(document, 1, -1))*100)/100;
        pass_catching = Math.round(parseFloat(catching + jumping + vision)*100)/100;

        addEntry(tr2, "Ball Carrying");
        addEntry(tr2, "Pass Catching");
        addEntry(tr3, ball_carrying);
        addEntry(tr3, pass_catching);
    }
    else if (pos.indexOf('TE')>=0) {
        block_shed = Math.round(parseFloat(blocking + strength + vision + stamina + 2 * getSA(document, 0, -1))*100)/100;
        pass_catching = Math.round(parseFloat(catching + jumping + vision + 2 * getSA(document, 1, -1))*100)/100;

        addEntry(tr2, "Block Shed");
        addEntry(tr2, "Pass Catching");
        addEntry(tr3, block_shed);
        addEntry(tr3, pass_catching);
    }
    else if (pos.indexOf('FB')>=0) {
        block_shed = Math.round(parseFloat(blocking + strength + vision + stamina + 2 * getSA(document, 0, -1))*100)/100;
        ball_carrying = Math.round(parseFloat(carrying + strength + vision + agility + speed + 2 * getSA(document, 0, -1) + getSA(document, 1, -1))*100)/100;
        addEntry(tr2, "Block Shed");
        addEntry(tr2, "Ball Carrying");
        addEntry(tr3, block_shed);
        addEntry(tr3, ball_carrying);
    }
    else if (pos.indexOf('QB')>=0) {
        pass_accuracy = Math.round(parseFloat(throwing + vision + confidence + 2 * getSA(document, 0, -1))*100)/100;
        scrambling = Math.round(parseFloat(speed + agility + vision + carrying + 2 * getSA(document, 1, -1))*100)/100;

        addEntry(tr2, "Pass Accuracy");
        addEntry(tr2, "Scrambling");
        addEntry(tr3, pass_accuracy);
        addEntry(tr3, scrambling);
    }
    else if (pos.indexOf('NT')>=0 || pos.indexOf('DT')>=0) {
        run_stuffer = Math.round(parseFloat(strength + agility + tackling + vision + 2 * getSA(document, 1, -1))*100)/100;
        pass_rushing = Math.round(parseFloat(agility + speed + strength + 2 * getSA(document, 0, -1))*100)/100;

        addEntry(tr2, "Run Stuffer");
        addEntry(tr2, "Pass Rushing");
        addEntry(tr3, run_stuffer);
        addEntry(tr3, pass_rushing);
    }
    else if (pos.indexOf('DE')>=0) {
        run_stuffer = Math.round(parseFloat(strength + agility + tackling + vision + 2 * getSA(document, 0, -1))*100)/100;
        pass_rushing = Math.round(parseFloat(agility + speed + strength + 2 * getSA(document, 1, -1))*100)/100;

        addEntry(tr2, "Run Stuffer");
        addEntry(tr2, "Pass Rushing");
        addEntry(tr3, run_stuffer);
        addEntry(tr3, pass_rushing);
    }
    else if (pos.indexOf('LB')>=0) {
        run_pursuit = Math.round(parseFloat(vision + agility + speed + strength + tackling + 2 * getSA(document, 0 , -1))*100)/100;
        pass_coverage = Math.round(parseFloat(agility + speed + strength + getSA(document, 1, -1))*100)/100;

        addEntry(tr2, "Run Pursuit");
        addEntry(tr2, "Pass Coverage");
        addEntry(tr3, run_pursuit);
        addEntry(tr3, pass_coverage);
    }
    else if (pos.indexOf('CB') >= 0) {
        run_pursuit = Math.round(parseFloat(vision + agility + speed + strength + tackling + 2 * getSA(document, 1 , -1))*100)/100;
        pass_coverage = Math.round(parseFloat(agility + speed + strength + getSA(document, 0, -1))*100)/100;

        addEntry(tr2, "Run Pursuit");
        addEntry(tr2, "Pass Coverage");
        addEntry(tr3, run_pursuit);
        addEntry(tr3, pass_coverage);
    }
    else if (pos.indexOf('SS')>=0 || pos.indexOf('FS')>=0) {
        run_pursuit = Math.round(parseFloat(vision + agility + speed + strength + tackling + 2 * getSA(document, 1 , -1))*100)/100;
        pass_coverage = Math.round(parseFloat(agility + speed + strength + getSA(document, 0, -1))*100)/100;

        addEntry(tr2, "Run Pursuit");
        addEntry(tr2, "Pass Coverage");
        addEntry(tr3, run_pursuit);
        addEntry(tr3, pass_coverage);
    }
    else if (pos.indexOf('K')>=0 || pos.indexOf('P')>=0) {
        distance = Math.round(parseFloat(strength + kicking + punting + 2 * (getSA(document, 0 , 0) + getSA(document, 0, 1) + getSA(document, 0, 2)))*100)/100;
        accuracy = Math.round(parseFloat(vision + confidence + kicking + punting + 2 * (getSA(document, 0, 0) + getSA(document, 0, 1) + getSA(document, 0, 2)))*100)/100;

        addEntry(tr2, "Distance");
        addEntry(tr2, "Accuracy");
        addEntry(tr3, distance);
        addEntry(tr3, accuracy);
    }

    var footer = document.getElementById('footer');
    if (footer) footer.parentNode.insertBefore(t, footer);
    if (footer) footer.parentNode.insertBefore(t2, footer);

}
, 100);