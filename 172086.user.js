// ==UserScript==
// @name        Scientists AutoSelector
// @namespace   http://www.war-facts.com/message.php?player=12152
// @include     http://www.war-facts.com/science.php*
// @version     1.2
// ==/UserScript==

window.loadScientistsAutoSelector = function () {

    var AllArray = [];
    var GetDataRun = false;
    var Buttons = [];
    var Team = [];

    function SciCheck() {
        if (GetDataRun)
            return;

        GetDataRun = true;
        var base = document.getElementById("scitable");

        var childs = base.childNodes[3].childNodes;
        //console.log(base.innerHTML);
        var page = base.innerHTML;
        page = page.substring(page.indexOf('<tbody>') + 7, page.indexOf('</tbody>'));
        //console.log(page);
        var sciNum = 0;
        while (page.indexOf('<tr id=') > -1) {

            var thisRow = page.substring(page.indexOf('<tr id=') + 20, page.indexOf('</tr>'));
            //console.log("ROW: " + thisRow);
            var rowChild = childs[0];

            for (var i = 0; i < childs.length; i++) {
                if (childs[i].innerHTML != null)
                    if (childs[i].innerHTML.indexOf(thisRow) != -1)
                    {
                        rowChild = childs[i];
                        //console.log(sciNum+": "+i);
                    }
            }

            xpr = document.evaluate('//input[@value=" -> "]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

            Buttons[sciNum] = xpr.snapshotItem(sciNum);



            //console.log(button.toString());
            //button.click(); //works adding

            AllArray[sciNum] = {};
            AllArray[sciNum].Stats = [];
            AllArray[sciNum].ButtonC = Buttons[sciNum];

            var counter = 0;
            while (thisRow.indexOf("<td") > -1) {
                var startOfCell = thisRow.indexOf('<td');
                var endOfCell = thisRow.indexOf('>', startOfCell);
                var thisCell = thisRow.substring(endOfCell + 1, thisRow.indexOf('</td>'));
                //<td style="text-align: center;" class="strong">
                //console.log("CELL "+counter+": " + thisCell);
                

                if ((counter >= 2) && (counter <= 12)) //11 stats
                {
                    AllArray[sciNum].Stats[counter - 2] = parseInt(thisCell);

                }

                if (counter == 13) { //comment
                    AllArray[sciNum].Comment = thisCell;
                    var butonnode = document.createElement('input');
                    butonnode.setAttribute('type', 'button');
                    butonnode.setAttribute('class', 'small');
                    butonnode.setAttribute('value', '->>');
                    butonnode.onclick = (function () {
                        var currentI = thisCell;
                        return function () {
                            AllWithComment(currentI + '');
                        }
                    })();
                    AllArray[sciNum].ButtonC.parentNode.insertBefore(butonnode, AllArray[sciNum].ButtonC.parentNode.firstChild);

                }


                counter++;
                thisRow = thisRow.substring(thisRow.indexOf('</td>') + 5);
            }

            sciNum++;
            page = page.substring(page.indexOf('</tr>') + 5);
        }

        //console.log(AllArray);
        //AllArray[0].ButtonC.click();
    }

    function AllWithComment(s) {
        for (var i=0; i<AllArray.length; i++)
        {
            if (AllArray[i].Comment == s)
                AllArray[i].ButtonC.click();
        }
    }

    function TestTeam() {

        /*
        Team = AllArray;
        console.log(Team);
        console.log(refreshGraph());

        Team = [];
        Team[0] = AllArray[0];
        console.log(Team);
        console.log(refreshGraph());
        */

        //MinDifference = how thrill should the auto be
        var MinDifference = 1.0;
        
        //MaxTeam = how big is the max team size
        var MaxTeam = 27;

        //TopIndexes
        var topIndexes = [];



        for (var i = 0; i < MaxTeam; i++)
            topIndexes[i] = -1;

        Team = [];

        var totalSci = 0;
        var lastPoints = 0;
        var topScore = 0;

        while (true)
        {

            var tempPoints = 0;
            var tempIndex = 0;

            if (Team.length >= MaxTeam)
                break;

            for (var i = 0; i < AllArray.length; i++) {

                var Include = true;
                for (var k=0; k<MaxTeam; k++)
                {
                    if (i == topIndexes[k])
                        Include = false;
                }

                if (!Include)
                    continue;

                Team.push(AllArray[i]);
                //console.log("="+ Team.length);
                var thisPoints = refreshGraph();
                if (thisPoints > tempPoints)
                {
                    tempPoints = thisPoints;
                    tempIndex = i;
                }
                Team.pop();
                //console.log("-" + Team.length);


            }


            if ((tempPoints- lastPoints) < MinDifference)
                break;

            Team.push(AllArray[tempIndex]);
            topIndexes[totalSci] = tempIndex;
            totalSci++;
            topScore = tempPoints;

            lastPoints = topScore;

        }
        
        //console.log(Team);

        for (var i=0; i<Team.length; i++)
        {
            Team[i].ButtonC.click();
        }
    }

    //from graph
    var skills = new Array();
    for (i = 1; i < 12; i++) {
        skills[i] = new Array();
    }

    function insertSort(a, b, value) {
        if (a < 1) {
            skills[b][a] = value;
        }
        else {
            var v = a - 1
            while (v != -1 && skills[b][v] < value) {
                skills[b][v + 1] = skills[b][v];
                v = v - 1;
            }
            skills[b][v + 1] = value;

        }
    }

    function refreshGraph() {
        var TeamSize = 0;
        skills = new Array();
        for (i = 1; i < 12; i++) {
            skills[i] = new Array();
        }

        for (var i = 0; i < Team.length; i++) {
            TeamSize = TeamSize + 1;
            for (var j = 2; j < 13; j++) {

                var ValToAdd = 0;

                if ((document.getElementById('chkING').checked) && (j == 2))
                    ValToAdd = Team[i].Stats[j - 2];

                if ((document.getElementById('chkAGR').checked) && (j == 3))
                    ValToAdd = Team[i].Stats[j - 2];

                if ((document.getElementById('chkMIN').checked) && (j == 4))
                    ValToAdd = Team[i].Stats[j - 2];

                if ((document.getElementById('chkPRC').checked) && (j == 5))
                    ValToAdd = Team[i].Stats[j - 2];

                if ((document.getElementById('chkPRD').checked) && (j == 6))
                    ValToAdd = Team[i].Stats[j - 2];

                if ((document.getElementById('chkPHY').checked) && (j == 7))
                    ValToAdd = Team[i].Stats[j - 2];

                if ((document.getElementById('chkCHE').checked) && (j == 8))
                    ValToAdd = Team[i].Stats[j - 2];

                if ((document.getElementById('chkMED').checked) && (j == 9))
                    ValToAdd = Team[i].Stats[j - 2];

                if ((document.getElementById('chkWEA').checked) && (j == 10))
                    ValToAdd = Team[i].Stats[j - 2];

                if ((document.getElementById('chkDRI').checked) && (j == 11))
                    ValToAdd = Team[i].Stats[j - 2];

                if ((document.getElementById('chkCON').checked) && (j == 12))
                    ValToAdd = Team[i].Stats[j - 2];

                insertSort(TeamSize - 1, j - 1, ValToAdd);

            }
        }

        var total = 0;
        var highest = 0;
        var allTotal = 0;
        for (i = 1; i < 12; i++) {
            total = 0;
            highest = 0;
            for (j = 0; j < TeamSize; j++) {
                total = total + skills[i][j] / Math.pow(2, j)
                if (skills[i][j] > highest) { highest = skills[i][j] }
            }
            total = Math.round(total * 10) / 10
            allTotal += total;
        }

        return allTotal;
    }
    SciCheck();

    var tableStart = document.getElementById("scitable");

    var rownode = document.createElement('tr');
    
    var cell1 = document.createElement('td');
    cell1.setAttribute('class', 'head');
    cell1.innerHTML = "include stats";
    rownode.appendChild(cell1);

    var cell2 = document.createElement('td');
    cell2.setAttribute('class', 'head');
    rownode.appendChild(cell2);

    var cell3 = document.createElement('td');
    cell3.setAttribute('class', 'head');
    cell3.innerHTML = '<input id="chkING" type="checkbox" value="1" checked>';
    rownode.appendChild(cell3);

    var cell4 = document.createElement('td');
    cell4.setAttribute('class', 'head');
    cell4.innerHTML = '<input id="chkAGR" type="checkbox" value="1" checked>';
    rownode.appendChild(cell4);

    var cell5 = document.createElement('td');
    cell5.setAttribute('class', 'head');
    cell5.innerHTML = '<input id="chkMIN" type="checkbox" value="1" checked>';
    rownode.appendChild(cell5);

    var cell6 = document.createElement('td');
    cell6.setAttribute('class', 'head');
    cell6.innerHTML = '<input id="chkPRC" type="checkbox" value="1" checked>';
    rownode.appendChild(cell6);

    var cell7 = document.createElement('td');
    cell7.setAttribute('class', 'head');
    cell7.innerHTML = '<input id="chkPRD" type="checkbox" value="1" checked>';
    rownode.appendChild(cell7);

    var cell8 = document.createElement('td');
    cell8.setAttribute('class', 'head');
    cell8.innerHTML = '<input id="chkPHY" type="checkbox" value="1" checked>';
    rownode.appendChild(cell8);

    var cell9 = document.createElement('td');
    cell9.setAttribute('class', 'head');
    cell9.innerHTML = '<input id="chkCHE" type="checkbox" value="1" checked>';
    rownode.appendChild(cell9);

    var cell10 = document.createElement('td');
    cell10.setAttribute('class', 'head');
    cell10.innerHTML = '<input id="chkMED" type="checkbox" value="1" checked>';
    rownode.appendChild(cell10);

    var cell11 = document.createElement('td');
    cell11.setAttribute('class', 'head');
    cell11.innerHTML = '<input id="chkWEA" type="checkbox" value="1" checked>';
    rownode.appendChild(cell11);

    var cell12 = document.createElement('td');
    cell12.setAttribute('class', 'head');
    cell12.innerHTML = '<input id="chkDRI" type="checkbox" value="1" checked>';
    rownode.appendChild(cell12);

    var cell13 = document.createElement('td');
    cell13.setAttribute('class', 'head');
    cell13.innerHTML = '<input id="chkCON" type="checkbox" value="1" checked>';
    rownode.appendChild(cell13);

    var cell14 = document.createElement('td');
    cell14.setAttribute('class', 'head');

    var butonnode = document.createElement('input');
    butonnode.setAttribute('type', 'button');
    butonnode.setAttribute('name', 'FindTop');
    butonnode.setAttribute('value', 'Find Top');
    butonnode.onclick = TestTeam;
    cell14.appendChild(butonnode);

    rownode.appendChild(cell14);

    tableStart.insertBefore(rownode, tableStart.firstChild);

    var rf = document.getElementById('location');
    var numrf = rf.options.length;
    var rfval = rf.options[numrf - 1].value;
    rf.value = rfval;
    rf.onchange();
}

window.addEventListener('load', window.loadScientistsAutoSelector, false);