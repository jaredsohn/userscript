// ==UserScript==
// @name       MTurk Dashboard Goals
// @version    0.72b
// @description  Shows some goal information, progress, etc. on the dashboard
// @include      https://www.mturk.com/mturk/dashboard
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @copyright  2012+, Tjololo12
// ==/UserScript==
//

//GM_deleteValue('GOALS_goal_table');

var retryAttempts = '10';
var retryTime = '250';
var goalTableJson = [];
if (GM_getValue('GOALS_goal_table')){
    var goalStuff = GM_getValue('GOALS_goal_table');
    goalTableJson = JSON.parse(goalStuff);
    if (Object.keys(goalTableJson).length == 0){
        GM_deleteValue('GOALS_goal_table');
        goalTableJson = [];
    }
}
var numEntries = (GM_getValue('GOALS_goal_table') ? Object.keys(goalTableJson).length : 0);

var balance = 0;
var refresh = false;
if (!GM_getValue('GOALS_balance')){
    balance = get_balance();
    refresh = true;
    GM_setValue('GOALS_balance', balance);
    GM_setValue('GOALS_timestamp', new Date());
}
else{
    if (GM_getValue('GOALS_timestamp')){
        console.log(datediff("minutes", GM_getValue('GOALS_timestamp'), "")+" timestamp: "+GM_getValue('GOALS_timestamp'));
        if (datediff("minutes", GM_getValue('GOALS_timestamp'), "") > 1){
            balance = get_balance();
            refresh = true;
            GM_setValue('GOALS_balance', balance);
            GM_setValue('GOALS_timestamp', new Date());
        }
        else
            balance = GM_getValue('GOALS_balance');
    }
    else{
        balance = get_balance();
        refresh = true;
        GM_setValue('GOALS_balance', balance);
        GM_setValue('GOALS_timestamp', new Date());
    }
}

var cells= document.getElementsByClassName('metrics-table-first-value');
var contains = false;
var approvedHits = 0;
for (var i = 0, len = cells.length; i < len; ++i) {
    if(cells[i].innerHTML.indexOf("Today's Projected Earnings") != -1) {
        console.log("Pending earnings found: "+cells[i].parentNode.getElementsByTagName('td')[1].innerHTML.replace(/[^0-9\.]/g, ''));
        GM_setValue('GOALS_today_pending', cells[i].parentNode.getElementsByTagName('td')[1].innerHTML.replace(/[^0-9\.]/g, ''));
        contains = true;
        } 
    if(cells[i].innerHTML.indexOf("Approved HITs") != -1) {
        console.log("Approved HITs found: "+cells[i].parentNode.getElementsByTagName('td')[1].innerHTML.replace(/[^0-9\.]/g, ''));
        approvedHits = parseFloat(cells[i].parentNode.getElementsByTagName('td')[1].innerHTML.replace(/[^0-9\.]/g, ''));
        } 
} 
console.log("Data "+(refresh ? "" : "not ")+"refreshed");

//Compatibility for converting old entries
if (!GM_getValue('GOALS_converted')){
    for (var key in goalTableJson){
        //if (!goalTableJson[key]['start'])
            goalTableJson[key]['start'] = approvedHits - balance;
        console.log(goalTableJson[key]['start']);
    }
    var goalString = JSON.stringify(goalTableJson);
    GM_setValue('GOALS_goal_table', goalString);
    goalTableJson = GM_getValue('GOALS_goal_table');
    console.log("Data converted");
}

var TEMPLATE = "{name} | {amount} | {days} | {percent}";
if (GM_getValue('GOALS_export_template'))
    TEMPLATE = GM_getValue('GOALS_export_template');
var EDIT = false;

function fetchData() {
    var timer;

    if (typeof numCon === 'undefined') {
        var numCon = 0;
    } else if (numCon > retryAttempts) {
        throw new Error("Could not get data.");
    }


    GM_xmlhttpRequest({
        method: "GET",
        url: "https://www.mturk.com/mturk/youraccount",
        onload: function (response) {
            // Get balance
            var reBal = /(\$\d+,?.?\d+,?.?\d+,?.?\d?\d?)/;
            var balance = response.responseText.match(reBal);
            if (balance['0']) {
                GM_setValue('GOAL_AMZ_Balance', balance['0'].substr(1));
                return balance['0'].substr(1);
            }
            else {
                GM_setValue('GOAL_AMZ_Balance', 0);
                return 0;
            }
        }
        });
    numCon++;
}

/* ----------------------------------------------------------------------------------- */

function get_balance() {
    var retval = fetchData();
    if (GM_getValue('GOAL_AMZ_Balance'))
    {
       return GM_getValue('GOAL_AMZ_Balance');   
    }
    else
         return retval;
}

function saveOrder_func(){
    var goalTable = document.getElementById('goal_table');
    var rows = goalTable.rows;
    var goalJson = (goalTableJson ? goalTableJson : []);
    var newJson = [];
    for (var i=0; i<rows.length; i++) {
        if (goalJson[rows[i].id.replace(/[^0-9\.]/g, '')])
            newJson.push(goalJson[rows[i].id.replace(/[^0-9\.]/g, '')]);
    }
    goalTableJson = newJson;
    var goalString = JSON.stringify(newJson);
    //console.log(goalString);
    GM_setValue('GOALS_goal_table', goalString);
    document.getElementById('hide_button').click();
}

function addRow_func(){
    //console.log("addRow");
    //var new_row = document.createElement('tr');
    var checkbox = document.createElement('td');
    var goal_name = document.createElement('td');
    var type_name = document.createElement('td');
    var goal_amount = document.createElement('td');
    var date = document.createElement('td');
    var order = document.createElement('td');
    goalTable = document.getElementById('goal_table');
    var element1 = document.createElement("input");
    var element2 = document.createElement("input");
    var element3 = document.createElement("input");
    var element4 = document.createElement("input");
    var element5 = document.createElement("select");
    var element6 = document.createElement("select");
    var tempNum = numEntries;
    
    var nameId = "newName_"+tempNum;
    var amountId = "newAmount_"+tempNum;
    var dateId = "newDate_"+tempNum;
    var checkId = "radio_"+tempNum;
    var typeId = "type_"+tempNum;
    var typeCellId = "newType_"+tempNum;
    var orderId = "order_"+tempNum;
    var orderCellId = "newOrder_"+tempNum;
    goal_name.setAttribute('id', nameId);
    goal_amount.setAttribute('id', amountId);
    date.setAttribute('id', dateId);
    type_name.setAttribute('id', typeCellId);
    order.setAttribute('id', orderCellId);
    
    element1.type = "radio";
    element1.disabled = true;
    element1.setAttribute('id', checkId);
    checkbox.appendChild(element1);
    
    element2.type = "text";
    element2.value = "What is it?";
    element2.setAttribute('onFocus','if (this.value == \'What is it?\') this.value=\'\'');
    element2.id = "name_"+tempNum;
    goal_name.appendChild(element2);
    
    element3.type = "text";
    element3.value = "$x,xxx.xx";
    element3.setAttribute('onFocus', 'if (this.value == \'$x,xxx.xx\') this.value=\'\'');
    element3.id = "amount_"+tempNum;
    goal_amount.appendChild(element3);
    
    element4.type = "text";
    element4.value = "mm/dd/yyyy";
    element4.setAttribute('onFocus', 'if (this.value == \'mm/dd/yyyy\') this.value=\'\'');
    element4.id = "date_"+tempNum;
    date.appendChild(element4);
    
    element5.setAttribute('id', typeId);
    
    var option = document.createElement('option');
    option.value = 'normal';
    option.appendChild(document.createTextNode('Normal'));
    element5.appendChild(option);
          
    option = document.createElement('option');
    option.value = 'day';
    option.appendChild(document.createTextNode('Daily Goal'));
    element5.appendChild(option);
    type_name.appendChild(element5);
    
    for (var i = 0; i < numEntries + 1; i++){
        option = document.createElement('option');
        option.value = i;
        option.appendChild(document.createTextNode(i+1));
        if (i == numEntries)
            option.setAttribute("selected", "selected");
        element6.appendChild(option);
    }
    order.appendChild(element6);
    
    element6.setAttribute('id', orderId);
    
    if (!GM_getValue('GOALS_goal_table') && document.getElementById('noContentRow'))
        goalTable.deleteRow(1);
    
    var new_row = goalTable.insertRow(++numEntries);
    //goalTable.appendChild(new_row)
    new_row.setAttribute("NoDrag", 1);
    new_row.appendChild(goal_name);
    new_row.appendChild(type_name);
    new_row.appendChild(goal_amount);
    new_row.appendChild(date);
    new_row.appendChild(checkbox);
    new_row.appendChild(order);
}

function validate_date(input)
{
  var date = input.value;  

  if (!date || date == "mm/dd/yyyy")
      return true;
  if (date.match(/^[01]\d\/[0123]\d\/20\d\d$/) != null)
  {
    var d = date.split('\/');
    date = d[2] + '-' + d[0] + '-' + d[1];
    input.value = date;
  }

  if (date.match(/^$|^20\d\d\-[01]\d\-[0123]\d$/) != null)
  {
    input.style.backgroundColor = 'white';
    return true;
  }
  input.style.backgroundColor = 'pink';
  return false;
}

function validate_amount(input)
{
    var amount = input.value;
    
    if (amount.match(/^\$?(\d+,?)+(\.\d\d)?$/)){
        return true;
    }
    else
        return false;
}

function validate_type(input)
{
    var type = input.value;
    
    if (type == "day")
    {
        var cells= document.getElementsByClassName('metrics-table-first-value');
        var contains = false;
        for (var i = 0, len = cells.length; i < len; ++i) {
            if(cells[i].innerHTML.indexOf("Today's Projected Earnings") != -1) {
                console.log("Pending earnings found: "+cells[i].parentNode.getElementsByTagName('td')[1].innerHTML.replace(/[^0-9\.]/g, ''));
                GM_setValue('GOALS_today_pending', cells[i].parentNode.getElementsByTagName('td')[1].replace(/[^0-9\.]/g, ''));
                contains = true;
            }    
        } 
        if (!contains)
            alert("Daily goals require the installation of the \"Today's Projected Earnings\" script from userscripts.org.");
        return contains;
    }
    else
        return true;    
}

function save_values(){
//    try{
        var jsonObj = [];
        for (var i = (GM_getValue('GOALS_goal_table') ? Object.keys(goalTableJson).length : 0); i <= numEntries-1; i++)
        {
            var nameCellId = "newName_"+i;
            var amountCellId = "newAmount_"+i;
            var dateCellId = "newDate_"+i;
            var typeCellId = "newType_"+i;
            var orderCellId = "newOrder_"+i;
            
            var nameId = "name_"+i;
            var amountId = "amount_"+i;
            var dateId = "date_"+i;
            var checkId = "radio_"+i;
            var typeId = "type_"+i;
            var orderId = "order_"+i;
            
            var name = document.getElementById(nameId);
            var amount = document.getElementById(amountId);
            var date = document.getElementById(dateId);
            var type = document.getElementById(typeId);
            var order = document.getElementById(orderId);
            
            var nameVal = name.value;
            var amountVal = amount.value.replace("$","");
            amountVal = amountVal.replace(",","");
            var tempAmountVal = amount.value;
            var dateVal = date.value;
            var typeVal = type.options[type.selectedIndex].value;
            var orderVal = order.options[order.selectedIndex].value;
            
            if (typeVal == 'day')
            {
                var tempDate = new Date();
                var months = parseInt(tempDate.getMonth());
                var days = parseInt(tempDate.getDate());
                var years = parseInt(tempDate.getFullYear());
                months += 1;
                days += 1;
                if (months.length == 1)
                    months = "0"+months;
                if (days.length == 1)
                    days = "0"+days;
                var dateString = months + "/" + days + "/" + years;                
                console.log(dateString);
                dateVal = dateString;
            }
            
            if (!validate_date(date)){
                alert("Invalid date format! Please use mm/dd/yyyy or yyyy-mm-dd");
                return false;
            }
            if (!validate_amount(amount)){
                alert("Invalid amount format! Please use $x,xxx.xx or x,xxx.xx or xxxx.xx");
                return false;
            }
            if (!validate_type(typeVal)){
                return false;
            }
            
            var nameCell = document.getElementById(nameCellId);
            var amountCell = document.getElementById(amountCellId);
            var dateCell = document.getElementById(dateCellId);
            var typeCell = document.getElementById(typeCellId);
            var orderCell = document.getElementById(orderCellId);
            
            var startVal = approvedHits;
            
            jsonObj[i] = {'name':nameVal, 'amount':amountVal, 'date':(dateVal == "mm/dd/yyyy" ? null : dateVal), 'type':(typeVal == 'normal' ? null : typeVal), 'start':startVal};
            
            nameCell.removeChild(name);
            nameCell.textContent = nameVal;
        
            amountCell.removeChild(amount);
            amountCell.textContent = ""+parseFloat(tempAmountVal).formatMoney(2);
        
            dateCell.removeChild(date);
            dateCell.textContent = (dateVal != "mm/dd/yyyy" ? dateVal : "");
            
            typeCell.removeChild(type);
            typeCell.textContent = (typeVal == 'normal' ? "Normal" : typeVal);
            
            orderCell.removeChild(order);
            orderCell.textContent = orderVal;
            
            document.getElementById(checkId).disabled = false;
        }
        var goalJson = (goalTableJson ? goalTableJson : []);
        for (var key in jsonObj)
            goalJson.splice(parseInt(orderVal)-1, 0, jsonObj[key]);
        goalTableJson = goalJson;
        var goalString = JSON.stringify(goalJson);
        //console.log(goalString);
        GM_setValue('GOALS_goal_table', goalString);
        toggleGoalDiv();
        toggleGoalDiv();
        return true;
//    }
//    catch (err){
//        console.log(err);
//        return false;
//    }
}

function updateDate(key)
{
    var tempDate = new Date();
    var months = parseInt(tempDate.getMonth());
    var days = parseInt(tempDate.getDate());
    var years = parseInt(tempDate.getFullYear());
    var numDays = new Date(years, months, 0).getDate();
    months = (months + 1 > 12 ? 1 : (days + 1 > numDays ? months + 2 : months + 1));
    days = (days + 1 > numDays ? 1 : days + 1);
    if (months.length == 1)
        months = "0"+months;
    if (days.length == 1)
        days = "0"+days;
    var dateString = months + "/" + days + "/" + years;                
    console.log(dateString);
    var goalDate = goalTableJson[key]['date'];
    if (goalDate != dateString){
        goalTableJson[key]['date'] = dateString;
        var goalString = JSON.stringify(goalTableJson);
        GM_setValue('GOALS_goal_table', goalString);
    }
}

Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-$" : "$", 
    i = parseFloat(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.split('.')[0].length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c && i%1 == 0 ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

function datediff(interval,date1,laterDate) {
    var second=1000, minute=second*60, hour=minute*60, day=hour*24, week=day*7;
    date1 = new Date(date1);
    var date2 = (laterDate ? new Date(date2) : new Date());
    var timediff = date2 - date1;
    if (isNaN(timediff)) return "";
    switch (interval) {
        case "years": return date2.getFullYear() - date1.getFullYear();
        case "months": return (
            ( date2.getFullYear() * 12 + date2.getMonth() )
            -
            ( date1.getFullYear() * 12 + date1.getMonth() )
        );
        case "weeks"  : return Math.floor(timediff / week);
        case "days"   : return Math.floor(timediff / day); 
        case "hours"  : return Math.floor(timediff / hour); 
        case "minutes": return Math.floor(timediff / minute);
        case "seconds": return Math.floor(timediff / second);
        case "all": 
            var retVal = {};
            retVal["years"] = date2.getFullYear() - date1.getFullYear();
            retVal["months"] = ( date2.getFullYear() * 12 + date2.getMonth() )-( date1.getFullYear() * 12 + date1.getMonth() )
            retVal["weeks"] = Math.floor(timediff/week);
            retVal["days"] = Math.floor(timediff/day);
            retVal["hours"] = Math.floor(timediff/hour);
            retVal["minutes"] = Math.floor(timediff/minute);
            retVal["seconds"] = Math.floor(timediff/second);
            return retVal;
        case "cmp":
            return date1 <= date2;
        default: return undefined;
    }
}

function AddAfter(rowId){
    var target = document.getElementById(rowId);
    var newElement = document.createElement('tr');
    target.parentNode.insertBefore(newElement, target.nextSibling );
    return newElement;
}

function deleteGoal(key){
    var rowKey = "row_"+key+"_goalTable";
    //console.log(rowKey);
    var target = document.getElementById(rowKey); 
    //target.parentNode.remove(target);
    target.remove();
    var newJson = [];
    for (var oldKey in goalTableJson){
        if (oldKey == key)
            console.log("found old key, removing");
        else
            newJson.push(goalTableJson[oldKey]);
    }
    //console.log(newJson);
    //goalTableJson.splice(key,1);
    numEntries--;
    GM_setValue('GOALS_goal_table', JSON.stringify(newJson));
    goalTableJson = newJson;
}

function showInfo(key){
    //console.log(goalTableJson[key]);
    var itemButton = document.getElementById("button_"+key);
    var item = goalTableJson[key];
    var infoDiv = document.createElement('div');
    var timeInfo = (item['date'] ? datediff("all", item['date'], "") : "");
    var rowKey = "row_"+key;
    var divRow = AddAfter(rowKey);
    rowKey += "_info";
    var divCell = document.createElement('td');
    var amountInt = parseFloat(item['amount']);
    var amountStart = parseFloat(item['start']);
    var diff = approvedHits - amountStart;
    var pendingSum = GM_getValue('GOALS_today_pending');
    
    divCell.style.cellPadding = '10px';
    divCell.setAttribute('align', 'center');
    divCell.setAttribute('id', rowKey);
    divCell.addEventListener("click", function() { var target = document.getElementById(rowKey); target.parentNode.remove(target);}, false);
    
    divRow.appendChild(divCell);
    divCell.setAttribute('colspan', '5');
    divCell.appendChild(infoDiv);
    
    infoDiv.style.width = "90%";
    infoDiv.style.backgroundColor = "#E9D99D";
    infoDiv.setAttribute('align', 'left');
    
    var progress = ((item['type'] == 'day' ? pendingSum : diff) / amountInt);
    progress = progress * 100;
    var progFull = Math.round(progress*100)/100;
    var complete = (progFull > 100 ? "Complete :D" : 100-progFull+"%");
    
    var difference = amountInt - (item['type'] == 'day' ? pendingSum : balance);
    
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = mm+'/'+dd+'/'+yyyy;
    var todaysDate = today;    
    
    var infoText = "As of today, "+todaysDate+", your goal of "+amountInt.formatMoney(2)+(progFull > 100 ? " has " : " has not ")+"been reached";

    if (progFull < 100){
        if (!datediff("cmp", item['date'], ""))
        {
            infoText += ". You are "+complete+" away from your goal, and need to make an additional "+difference.formatMoney(2)+" to reach it.";
            if (timeInfo){                
                var perHour = (timeInfo["hours"]*-1 > 0 ? difference / timeInfo["hours"] * -1 : 0);
                var perMinute = (timeInfo["minutes"]*-1 > 0 ? difference / timeInfo["minutes"] * -1 : 0);
                var perDay = (timeInfo["days"]*-1 > 0 ? difference / timeInfo["days"] * -1 : 0);
                var perMonth = (timeInfo["months"]*-1 > 0 ? difference / timeInfo["months"] * -1 : 0);
                var perWeek = (timeInfo["weeks"]*-1 > 0 ? difference / timeInfo["weeks"] * -1 : 0);
   
                infoText += " This means you need to make:";
            
                var list = document.createElement('ul');
                var monthElement = document.createElement('li');
                var weekElement = document.createElement('li');
                var dayElement = document.createElement('li');
                var hourElement = document.createElement('li');
                var minuteElement = document.createElement('li');
            
                monthElement.innerHTML = "$" + perMonth.toFixed(4) + " per month";
                weekElement.innerHTML = "$" + perWeek.toFixed(4) + " per week";
                dayElement.innerHTML = "$" + perDay.toFixed(4) + " per day";
                hourElement.innerHTML = "$" + perHour.toFixed(4) + " per hour";
                minuteElement.innerHTML = "$" + perMinute.toFixed(4) + " per minute";

                if (!perMonth == 0 && item['type'] != 'day')
                    list.appendChild(monthElement);
                if (!perWeek == 0 && item['type'] != 'day')
                    list.appendChild(weekElement);
                if (!perDay == 0 && item['type'] != 'day')
                    list.appendChild(dayElement);
                if (!perHour == 0)
                    list.appendChild(hourElement);
                if (!perMinute == 0)
                    list.appendChild(minuteElement);
                else{
                    var tempElement = document.createElement('li');
                    tempElement.innerHTML = "You have less than a minute to make "+difference.formatMoney(2)+"! Can you make it?!";
                    list.appendChild(tempElement);
                }
    
                infoDiv.textContent = infoText;
                infoDiv.appendChild(list);
            }
        }
        else{
            infoText += "...unfortunately, the deadline has passed. You were "+difference.formatMoney(2)+" away from meeting your goal :(";
            infoDiv.textContent = infoText;            
        }
        if (!timeInfo)
            infoDiv.textContent = infoText;
    }
    else{
        infoText += ", congratulations! Your goal of "+item['name']+" is within reach, all you need to do is withdraw the money. Visit your account information screen to do so!";
        infoDiv.textContent = infoText;
    }
}

function toggleGoalDiv(){
    var target = document.getElementById('goal_div');
    if (!target){
        //console.log("created div");
        showAddGoalTable();
    }
    else
        target.remove();
}

function toggleExportDiv(){
    var target = document.getElementById('export_div');
    if (!target){
        //console.log("created div");
        showExportDiv();
    }
    else
        target.remove();
}

var goalTableJson = "";
if (GM_getValue('GOALS_goal_table')){
    var goalStuff = GM_getValue('GOALS_goal_table');
    goalTableJson = JSON.parse(goalStuff);
}
var numEntries = (GM_getValue('GOALS_goal_table') ? Object.keys(goalTableJson).length : 0);


function apply_template()
{
    var txt = TEMPLATE;
      
    var outString = "";    
  
    var vars = ['name', 'amount', 'days', 'percent', 'type'];
    
    var pendingSum = GM_getValue('GOALS_today_pending');
    
    for (var key in goalTableJson){  
        var tempTemp = txt;        
        for (var i=0; i<vars.length; i++)
        {
            t = new RegExp('\{' + vars[i] + '\}', 'g');
            if (vars[i] == 'name')
                tempTemp = tempTemp.replace(t, goalTableJson[key][vars[i]]);
            else if (vars[i] == 'amount')
                tempTemp = tempTemp.replace(t, parseFloat(goalTableJson[key][vars[i]]).formatMoney(2));
            else if (vars[i] == 'percent'){
                var progress = ((goalTableJson[key]['type'] == 'day' ? pendingSum : balance) / amountInt);
                progress = progress * 100;
                var progFull = Math.round(progress*100)/100;
                tempTemp = tempTemp.replace(t, (progFull >= 100 ? "Complete :D" : progFull+"%"));
            }
            else if (vars[i] == 'days'){
                var amountInt = parseFloat(goalTableJson[key]['amount']);
                var progress = ((goalTableJson[key]['type'] == 'day' ? pendingSum : balance) / amountInt);
                progress = progress * 100;
                var progFull = Math.round(progress*100)/100;
                console.log(progFull);
                var daysDiff = (progFull >= 100 ? "Complete :D" : (goalTableJson[key]['type'] == 'day' ? "Daily Goal" : (goalTableJson[key]['date'] ? datediff("days", goalTableJson[key]['date'], "") * -1 : "No end date given")));
                tempTemp = tempTemp.replace(t, daysDiff);
            }
            else if (vars[i] == 'type')
            {
                var replaceString = (goalTableJson[key]['type'] ? (goalTableJson[key]['type'] == 'day' ? "Daily Goal" : "Normal Goal") : (goalTableJson[key]['date'] ? "Deadline" : "No Deadline"));
                tempTemp = tempTemp.replace(t, replaceString);
            }
        }
        outString += tempTemp + "\n";
    }
    return outString;
}

function showAddGoalTable(){
    var goal_div = document.createElement('div');
    var goalTable = document.createElement('table');
    var header_row = document.createElement('tr');
    var typeCell = document.createElement('td');
    var checkbox = document.createElement('td');
    var goal_name = document.createElement('td');
    var goal_amount = document.createElement('td');
    var date = document.createElement('td');
    var order = document.createElement('td');
    var radioNames = [];
    
    goal_div.style.position = 'fixed';
    goal_div.style.left = '20%';
    goal_div.style.right = '20%';
    goal_div.style.top = '300px';
    goal_div.style.padding = '5px';
    goal_div.style.border = '2px solid black';
    goal_div.style.backgroundColor = 'white';
    goal_div.setAttribute('id', 'goal_div');
    
    goalTable.style.margin = '0 auto 0 auto';
    goalTable.style.width = '90%';
    goalTable.setAttribute('id', 'goal_table');
    
    checkbox.textContent = 'Delete?';
    typeCell.textContent = 'Type';
    goal_name.textContent = 'Goal Name';
    goal_amount.textContent = 'Goal Amount';
    date.textContent = 'Date (optional)';
    order.textContent = 'Goal fill order';
    
    goalTable.appendChild(header_row);
    header_row.style.backgroundColor = '#7fb4cf';//'#7fb4cf';
    header_row.appendChild(goal_name);
    header_row.appendChild(typeCell);
    header_row.appendChild(goal_amount);
    header_row.appendChild(date);
    header_row.appendChild(checkbox);
    header_row.appendChild(order);
    header_row.setAttribute("NoDrag", 1);

    if (!goalTableJson || goalTableJson.length == 0){
        var contentRow1 = document.createElement('tr');
        var noContent = document.createElement('td');
        noContent.textContent = 'Uh-oh, it looks like you haven\'t set any goals. Click the \'Add goal\' button below to add one!';
        noContent.setAttribute('colspan', '5');
        contentRow1.setAttribute('id', 'noContentRow');
        goalTable.appendChild(contentRow1);
        contentRow1.appendChild(noContent);
    }
    else{
        var goalString = goalTableJson;
        for (var key in goalString){
            var new_row = document.createElement('tr');
            var checkbox = document.createElement('td');
            var type = document.createElement('td');
            var goal_name = document.createElement('td');
            var goal_amount = document.createElement('td');
            var date = document.createElement('td');
            var order = document.createElement('td');
            
            order.textContent = parseInt(key)+1;
            
            var rowKey = "row_"+key+"_goalTable";
            new_row.setAttribute('id', rowKey);
                    
            var element1 = document.createElement("input");
            element1.type = "radio";
            element1.id = key ;
            checkbox.appendChild(element1);            
            
            id = "radio_"+key;
            radioNames.push(id);
            element1.setAttribute('id', id);
                
            goal_name.textContent = goalString[key]['name'];
            type.textContent = (goalString[key]['type'] ? goalString[key]['type'] : (goalString[key]['date'] ? "Deadline" : "Normal"));
            goal_amount.textContent = parseFloat(goalString[key]['amount']).formatMoney(2);
            date.textContent = goalString[key]['date'];
 
            goalTable.appendChild(new_row);
            new_row.appendChild(goal_name);
            new_row.appendChild(type);
            new_row.appendChild(goal_amount);
            new_row.appendChild(date);
            new_row.appendChild(checkbox);
            new_row.appendChild(order);
        }      
    }

    var new_row = document.createElement('tr');
    var b1 = document.createElement('td');
    var b2 = document.createElement('td');
    var b3 = document.createElement('td');
    var b4 = document.createElement('td');
    var b5 = document.createElement('td');
    var add_row = document.createElement('button');
    var delete_all = document.createElement('button');
    var save_button = document.createElement('button');
    var hide_button = document.createElement('button');
    var reorder_button = document.createElement('button');
    
    add_row.textContent = ' Add goal ';
    add_row.setAttribute('id', 'add_goal');
    add_row.style.height = '18px';
    add_row.style.width = '100px';
    add_row.style.fontSize = '10px';
    add_row.style.paddingLeft = '3px';
    add_row.style.paddingRight = '3px';
    add_row.style.backgroundColor = 'white';
    add_row.style.marginLeft = '5px';
    add_row.title = 'Add a new goal';
    b1.appendChild(add_row);
    b1.setAttribute('aligh','left');
    
    delete_all.textContent = ' Delete ';
    delete_all.setAttribute('id', 'delete_all');
    delete_all.style.height = '18px';
    delete_all.style.width = '100px';
    delete_all.style.fontSize = '10px';
    delete_all.style.paddingLeft = '3px';
    delete_all.style.paddingRight = '3px';
    delete_all.style.backgroundColor = 'white';
    delete_all.style.marginLeft = '5px';
    delete_all.title = 'Delete all goals from storage';
    b2.appendChild(delete_all);
    b2.setAttribute('align','center');
    
    save_button.textContent = 'Save';
    save_button.setAttribute('id', 'save_button');
    save_button.style.height = '18px';
    save_button.style.width = '100px';
    save_button.style.fontSize = '10px';
    save_button.style.paddingLeft = '3px';
    save_button.style.paddingRight = '3px';
    save_button.style.backgroundColor = 'white';
    save_button.style.marginLeft = '5px';
    save_button.title = 'Save goals in storage';
    b3.appendChild(save_button);
    b3.setAttribute('align','center');
    
    hide_button.textContent = 'Cancel';
    hide_button.setAttribute('id', 'hide_button');
    hide_button.style.height = '18px';
    hide_button.style.width = '100px';
    hide_button.style.fontSize = '10px';
    hide_button.style.paddingLeft = '3px';
    hide_button.style.paddingRight = '3px';
    hide_button.style.backgroundColor = 'white';
    hide_button.style.marginLeft = '5px';
    hide_button.title = 'Hide div';
    b4.appendChild(hide_button);
    b4.setAttribute('align','center');  
    
    reorder_button.textContent = 'Reorder';
    reorder_button.setAttribute('id', 'reorder_button');
    reorder_button.style.height = '18px';
    reorder_button.style.width = '100px';
    reorder_button.style.fontSize = '10px';
    reorder_button.style.paddingLeft = '3px';
    reorder_button.style.paddingRight = '3px';
    reorder_button.style.backgroundColor = 'white';
    reorder_button.style.marginLeft = '5px';
    reorder_button.title = 'Reorder Goals';
    b5.appendChild(reorder_button);
    b5.setAttribute('align','right');  
    
    new_row.setAttribute("NoDrag", 1);
    new_row.appendChild(b1);
    new_row.appendChild(b2);
    new_row.appendChild(b3);
    new_row.appendChild(b4);
    new_row.appendChild(b5);
    goalTable.appendChild(new_row);
    
    delete_all.addEventListener("click", function() {if (confirm("Are you sure you want to delete all goals forever?")) GM_deleteValue('GOALS_goal_table'); goalTableJson = []; toggleGoalDiv(); toggleGoalDiv();}, false);
    add_row.addEventListener("click", function() {addRow_func();}, false);
    save_button.addEventListener("click", function() {if (save_values()) alert("Values successfully saved!"); else alert("Some error occurred :(");}, false);
    hide_button.addEventListener("click", function() {numEntries = (GM_getValue('GOALS_goal_table') ? Object.keys(goalTableJson).length : 0); toggleGoalDiv(); addGoalInformation();}, false);
    reorder_button.addEventListener("click", function() {saveOrder_func();}, false);
    
    goal_div.appendChild(goalTable);
    document.body.insertBefore(goal_div,document.getElementsByClassName('footer_separator')[0]);
    goal_div.style.display = 'block';    
    for (var i = 0; i < radioNames.length; i++) {
    (function (i) { 
        document.getElementById(radioNames[i]).addEventListener("click", function() {if (confirm("Are you sure you want to delete that goal?")) deleteGoal(i);}, false);
        })(i);
    }
    var goalTable = document.getElementById('goal_table');
    console.log(goalTable);
    var tableDnD = new TableDnD();
    tableDnD.init(goalTable);
}

function edit_func()
{
    var textarea = document.getElementById('export_text_area');
    if (EDIT == true)
    {
        EDIT = false;
        TEMPLATE = textarea.value;
        GM_setValue('GOALS_export_template', TEMPLATE);
        document.getElementById('edit_button').textContent = 'Edit Template';
        textarea.value = apply_template();
        textarea.readOnly = true;
      }
      else
      {
        EDIT = true;
        document.getElementById('edit_button').textContent = 'Show Changes';
        textarea.textContent = TEMPLATE;
        textarea.readOnly = false;
      }  
}

function showExportDiv(){
    var exportDiv = document.createElement('div');
    var textarea = document.createElement('textarea'); 

    exportDiv.style.position = 'fixed';
    exportDiv.style.width = '500px';
    exportDiv.style.height = '235px';
    exportDiv.style.left = '50%';
    exportDiv.style.right = '50%';
    exportDiv.style.margin = '-250px 0px 0px -250px';
    exportDiv.style.top = '300px';
    exportDiv.style.padding = '5px';
    exportDiv.style.border = '2px';
    exportDiv.style.backgroundColor = 'black';
    exportDiv.style.color = 'white';
    exportDiv.style.zIndex = '100';
    exportDiv.setAttribute('id', 'export_div');

    textarea.style.padding = '2px';
    textarea.style.width = '500px';
    textarea.style.height = '200px';
    textarea.title = 'Template accepts {name}, {amount}, {days}, {type}, and {percent}';
    textarea.setAttribute('id', 'export_text_area');
    textarea.textContent = apply_template();

    exportDiv.textContent = 'Press Ctrl+C to copy to clipboard. Click exit to close.';
    exportDiv.style.fontSize = '12px';
    exportDiv.appendChild(textarea);
    var edit_button = document.createElement('button');
    var hideButton = document.createElement('button');

    edit_button.textContent = 'Edit Template';
    edit_button.setAttribute('id', 'edit_button');
    edit_button.style.height = '18px';
    edit_button.style.width = '100px';
    edit_button.style.fontSize = '10px';
    edit_button.style.paddingLeft = '3px';
    edit_button.style.paddingRight = '3px';
    edit_button.style.backgroundColor = 'white';
    
    hideButton.textContent = 'Exit';
    hideButton.setAttribute('id', 'hide_export_button');
    hideButton.style.height = '18px';
    hideButton.style.width = '100px';
    hideButton.style.fontSize = '10px';
    hideButton.style.paddingLeft = '3px';
    hideButton.style.paddingRight = '3px';
    hideButton.style.backgroundColor = 'white';
    
    exportDiv.appendChild(edit_button);
    exportDiv.appendChild(hideButton);
    hideButton.addEventListener("click", function() {toggleExportDiv();}, false);
    edit_button.addEventListener("click", function() {edit_func();}, false);
    document.body.insertBefore(exportDiv,document.getElementsByClassName('footer_separator')[0]);
    textarea.focus();
    textarea.select();
    textarea.readOnly = true;
}

function refresh_func(){
    console.log("Debug refresh started...");
    balance = get_balance();
    GM_setValue('GOALS_balance', balance);
    console.log("Balance: "+balance);
    goalTableJson = JSON.parse(GM_getValue('GOALS_goal_table'));
    console.log("JSON:");
    console.log(""+JSON.stringify(goalTableJson));
    console.log("Debug refresh ended. Please reload.");
    addGoalInformation();
}

if (window.location.href == "https://www.mturk.com/mturk/dashboard") {
    addGoalInformation();
}

function addGoalInformation(){
    if (!document.getElementById('primary_goal_table')){
        var footer = document.getElementsByClassName('footer_separator')[0];
        if (footer == null)
          return;
        
        var extra_table = document.createElement('table');
        extra_table.width = '700';
        extra_table.style.boder = '1px solid black';
        extra_table.align = 'center';
        extra_table.cellSpacing = '0px';
        extra_table.cellPadding = '0px';
        extra_table.setAttribute('id', 'primary_goal_table');
        
        var row1 = document.createElement('tr');
        var row2 = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var content_td = document.createElement('td');
        
        var whatsthis = document.createElement('a');
        
        var goals_button = document.createElement('button');
        var export_button = document.createElement('button');
        var force_refresh_button = document.createElement('button');
        //export_button.addEventListener("click", export_func(), false);
      
        row1.style.height = '25px';
        row1.setAttribute('id', 'goals_header_row');
        td1.setAttribute('class', 'white_text_14_bold');
        td1.style.backgroundColor = '#7fb4cf';//'#7fb4cf';
        td1.style.paddingLeft = '10px';
        td1.innerHTML = '	Goals ';
        content_td.setAttribute('class', 'container-content');
        content_td.setAttribute('colspan', '2');
        
        whatsthis.href = 'javascript:alert(\'Allows you to define custom goals, based on the information that you give it. For more information, click the goal name. Click the info pane to close.\')';
        whatsthis.setAttribute('class', 'whatis');
        whatsthis.textContent = '(What\'s this?)';
        goals_button.setAttribute('class', 'goals_button');
        goals_button.textContent = 'Define Goals';
        export_button.setAttribute('class', 'export_button');
        export_button.textContent = 'Export Data';
        force_refresh_button.setAttribute('class', 'refresh_button');
        force_refresh_button.textContent = "Refresh";
        
        td2.setAttribute('class', 'white_text_14_bold');
        td2.style.backgroundColor = '#7fb4cf';//'#7fb4cf';
        td2.style.paddingLeft = '10px';
        td2.setAttribute('align', 'right');
        goals_button.addEventListener("click", function() { toggleGoalDiv(); }, false);
        export_button.addEventListener("click", function() { toggleExportDiv(); }, false);
        force_refresh_button.addEventListener("click", function() { console.log("Refresh button clicked."); refresh_func(); }, false);
        td2.appendChild(force_refresh_button);
        td2.appendChild(goals_button);
        td2.appendChild(export_button);
        
        extra_table.appendChild(row1);
        row1.appendChild(td1);
        td1.appendChild(whatsthis);
        row1.appendChild(td2);
        extra_table.appendChild(row2);
        row2.appendChild(content_td);
        footer.parentNode.insertBefore(extra_table, footer);  
       
        var my_bar = document.createElement('div');
        
        my_bar.setAttribute('id', 'my_bar');
      
        content_td.appendChild(my_bar);
      
        my_bar.style.textAlign = "float";
        
        var contentTable = document.createElement('table');
        contentTable.setAttribute('id', 'goals_content_table');
        contentTable.setAttribute('width','100%');
        
        if (!GM_getValue('GOALS_goal_table')){
            var contentRow1 = document.createElement('tr');
            var noContent = document.createElement('td');
            noContent.textContent = 'Uh-oh, it looks like you haven\'t set any goals. Click the \'goals\' button above to define some!';
            contentTable.appendChild(contentRow1);
            contentRow1.appendChild(noContent);
            my_bar.appendChild(contentTable);
        }
        
        else
        {
            var goalString = GM_getValue('GOALS_goal_table');
            var goalJson = JSON.parse(goalString);
            ////console.log("JSON parsed successfully "+goalJson);
            
            var headerRow = document.createElement('tr');
            var goalTypeCell = document.createElement('td');
            var goalNameCell = document.createElement('td');
            var goalAmountCell = document.createElement('td');
            var timeLeftCell = document.createElement('td');
            var progressBarCell = document.createElement('td');
            
            goalTypeCell.textContent = "Type";
            goalNameCell.textContent = "Goal";
            goalAmountCell.textContent = "Amount";
            timeLeftCell.textContent = "Days Remaining";
            progressBarCell.textContent = "Percent complete";
            
            headerRow.style.backgroundColor = '#7fb4cf';//'#7fb4cf';
            
            contentTable.appendChild(headerRow);
            headerRow.appendChild(goalNameCell);
            headerRow.appendChild(goalTypeCell);
            headerRow.appendChild(goalAmountCell);
            headerRow.appendChild(timeLeftCell);
            headerRow.appendChild(progressBarCell);
            
            var buttonNames = [];
            var goalBalanceRemaining = 0;
            for (var key in goalJson){
                var new_row = document.createElement('tr');
                var goal_type = document.createElement('td');
                var goal_name = document.createElement('td');
                var goal_amount = document.createElement('td');
                var time_remaining = document.createElement('td');
                var progCell = document.createElement('td');
                var progBar = document.createElement('div');
    			var progLabel = document.createElement('div');         
                var amountInt = parseFloat(goalJson[key]['amount']);
                var amountStart = parseFloat(goalJson[key]['start']);
                var nameLink = document.createElement('button');
                var pendingSum = GM_getValue('GOALS_today_pending');
            
                var rowKey = "row_"+key;
                new_row.setAttribute('id', rowKey);
                
                goal_type.textContent = (goalJson[key]['type'] == 'normal' || !goalJson[key]['type'] ? (goalJson[key]['date'] ? "Deadline" : "No Deadline") : "Daily Goal");
                
                if (goalJson[key]['type'] == 'day'){
                    updateDate(key);
                }
                
                nameLink.textContent = goalJson[key]['name'];            
                nameLink.style.background = 'none';
                nameLink.style.border = 'none';
                nameLink.style.margin = '0';
                nameLink.style.padding = '0';
                var id = "button_"+key;
                buttonNames.push(id);
                nameLink.setAttribute('id', id);
                
                //goal_name.textContent = goalJson[key]['name'];
                goal_name.appendChild(nameLink);
                goal_amount.textContent = amountInt.formatMoney(2);
                        
                var now = new Date();
                daysDiff = (goalJson[key]['date'] ? datediff("days", goalJson[key]['date'], "") * -1 : null);
                //daysDiff *= -1;
                
                var balanceThisGoal = approvedHits - amountStart - goalBalanceRemaining;
                
                if (balanceThisGoal < 0){
                    goalBalanceRemaining = balanceThisGoal * -1;
                    var progress = 0;
                    console.log("balance this goal: "+balanceThisGoal);
                    var progFull = Math.round(progress*100)/100;
                    progress = (progFull >= 100 ? "100" : progFull);
                    progFull = (progFull > 100 ? "Complete :D" : progFull+"%");
                    time_remaining.textContent = "Previous goals incomplete";
                }
                else {
                    goalBalanceRemaining = balanceThisGoal;
                    var progress = ((goalJson[key]['type'] == 'day' ? pendingSum : balanceThisGoal) / amountInt);
                    progress = progress * 100;
                    var progFull = Math.round(progress*100)/100;
                    progress = (progFull >= 100 ? "100" : progFull);
                    progFull = (progFull > 100 ? "Complete :D" : progFull+"%");
                    time_remaining.textContent = (daysDiff ? (daysDiff > 0 ? daysDiff : (progress < 100 ? "Date passed :(" : "Complete :D")) : (progress < 100 ? "No date given" : "Complete :D"));
                }
          
                progBar.style.color = 'white';
                progBar.style.backgroundColor = '#7fb4cf';
                progBar.style.position = "relative";
                progBar.innerHTML = '&nbsp;';
                progBar.setAttribute = ('align', 'left');
                progBar.style.width = progress + "%";
            
                progLabel.textContent = progFull;
                progLabel.style.textAlign = 'center';
                progLabel.style.color = 'white';
                progLabel.style.position = "absolute";
                progLabel.style.top = "5%";
                progLabel.style.left = "40%";            
                progLabel.style.zIndex = '1';
            
                progCell.appendChild(progBar);
                progCell.appendChild(progLabel);
                progCell.style.display = "block";
                progCell.style.position = "relative";
                progCell.style.backgroundColor = 'gray';
 
                contentTable.appendChild(new_row);
                new_row.appendChild(goal_name);
                new_row.appendChild(goal_type);
                new_row.appendChild(goal_amount);
                new_row.appendChild(time_remaining);
                new_row.appendChild(progCell);
        }
        my_bar.appendChild(contentTable);
        for (var i = 0; i < buttonNames.length; i++) {
            (function (i) { 
                document.getElementById(buttonNames[i]).addEventListener("click", function() {if (!document.getElementById("row_"+i+"_info")) showInfo(i);}, false);
            })(i);
        }
        }
    }
    else
    {
        var target = document.getElementById('goals_content_table');
        var contentTable2 = target.parentNode.replaceChild(document.createElement('table'), target);
        for(var i = contentTable2.rows.length - 1; i > -1; i--)
        {
            contentTable2.deleteRow(i);
        }
        if (!GM_getValue('GOALS_goal_table')){
            var contentRow1 = document.createElement('tr');
            var noContent = document.createElement('td');
            noContent.textContent = 'Uh-oh, it looks like you haven\'t set any goals. Click the \'goals\' button above to define some!';
            contentTable2.appendChild(contentRow1);
            contentRow1.appendChild(noContent);
            document.getElementById('my_bar').appendChild(contentTable2);
        }
        else{
            var goalString = GM_getValue('GOALS_goal_table');
            var goalJson = JSON.parse(goalString);
            var headerRow = document.createElement('tr');
            var goalTypeCell = document.createElement('td');
            var goalNameCell = document.createElement('td');
            var goalAmountCell = document.createElement('td');
            var timeLeftCell = document.createElement('td');
            var progressBarCell = document.createElement('td');
                
            goalTypeCell.textContent = "Type";
            goalNameCell.textContent = "Goal";
            goalAmountCell.textContent = "Amount";
            timeLeftCell.textContent = "Days Remaining";
            progressBarCell.textContent = "Percent complete";
            
            headerRow.style.backgroundColor = '#7fb4cf';//'#7fb4cf';
                
            contentTable2.appendChild(headerRow);
            headerRow.appendChild(goalNameCell);
            headerRow.appendChild(goalTypeCell);
            headerRow.appendChild(goalAmountCell);
            headerRow.appendChild(timeLeftCell);
            headerRow.appendChild(progressBarCell);
                
            var buttonNames = [];
            var goalBalanceRemaining = 0;
            for (var key in goalJson){
                var new_row = document.createElement('tr');
                var goal_type = document.createElement('td');
                var goal_name = document.createElement('td');
                var goal_amount = document.createElement('td');
                var time_remaining = document.createElement('td');
                var progCell = document.createElement('td');
                var progBar = document.createElement('div');
        	    var progLabel = document.createElement('div');         
                var amountInt = parseFloat(goalJson[key]['amount']);
                var amountStart = parseFloat(goalJson[key]['start']);
                var nameLink = document.createElement('button');
                var pendingSum = GM_getValue('GOALS_today_pending');
                
                var rowKey = "row_"+key;
                new_row.setAttribute('id', rowKey);
                
                goal_type.textContent = (goalJson[key]['type'] == 'normal' || !goalJson[key]['type'] ? (goalJson[key]['date'] ? "Deadline" : "No Deadline") : "Daily Goal");
                
                if (goalJson[key]['type'] == 'day'){
                    updateDate(key);
                }
                    
                nameLink.textContent = goalJson[key]['name'];            
                nameLink.style.background = 'none';
                nameLink.style.border = 'none';
                nameLink.style.margin = '0';
                nameLink.style.padding = '0';
                var id = "button_"+key;
                buttonNames.push(id);
                nameLink.setAttribute('id', id);
                    
                //goal_name.textContent = goalJson[key]['name'];
                goal_name.appendChild(nameLink);
                goal_amount.textContent = amountInt.formatMoney(2);
                            
                var now = new Date();
                daysDiff = (goalJson[key]['date'] ? datediff("days", goalJson[key]['date'], "") * -1 : null);
                //daysDiff *= -1;
                            
                var balanceThisGoal = approvedHits - amountStart - goalBalanceRemaining;
                
				console.log("Info: "+balanceThisGoal + " " + amountInt + " " + approvedHits + " " + (approvedHits - amountStart));
                if (balanceThisGoal < 0){
                    goalBalanceRemaining = balanceThisGoal * -1;
                    var progress = 0;
                    console.log("balance this goal: "+balanceThisGoal);
                    var progFull = Math.round(progress*100)/100;
                    progress = (progFull >= 100 ? "100" : progFull);
                    progFull = (progFull > 100 ? "Complete :D" : progFull+"%");
                    time_remaining.textContent = "Previous goals incomplete";
                }
                else {
                    goalBalanceRemaining = balanceThisGoal;
					console.log("balance this goal: "+balanceThisGoal);
                    var progress = ((goalJson[key]['type'] == 'day' ? pendingSum : balanceThisGoal) / amountInt);
                    progress = progress * 100;
                    var progFull = Math.round(progress*100)/100;
                    progress = (progFull >= 100 ? "100" : progFull);
                    progFull = (progFull > 100 ? "Complete :D" : progFull+"%");
                    time_remaining.textContent = (daysDiff ? (daysDiff > 0 ? daysDiff : (progress < 100 ? "Date passed :(" : "Complete :D")) : (progress < 100 ? "No date given" : "Complete :D"));
                }
              
                progBar.style.color = 'white';
                progBar.style.backgroundColor = '#7fb4cf';
                progBar.style.position = "relative";
                progBar.innerHTML = '&nbsp;';
                progBar.setAttribute = ('align', 'left');
                progBar.style.width = progress + "%";
                
                progLabel.textContent = progFull;
                progLabel.style.textAlign = 'center';
                progLabel.style.color = 'white';
                progLabel.style.position = "absolute";
                progLabel.style.top = "5%";
                progLabel.style.left = "40%";            
                progLabel.style.zIndex = '1';
                
                progCell.appendChild(progBar);
                progCell.appendChild(progLabel);
                progCell.style.display = "block";
                progCell.style.position = "relative";
                progCell.style.backgroundColor = 'gray';
     
                contentTable2.appendChild(new_row);
                new_row.appendChild(goal_name);
                new_row.appendChild(goal_type);
                new_row.appendChild(goal_amount);
                new_row.appendChild(time_remaining);
                new_row.appendChild(progCell);
            }
            document.getElementById('my_bar').appendChild(contentTable2);
            for (var i = 0; i < buttonNames.length; i++) {
                (function (i) { 
                    document.getElementById(buttonNames[i]).addEventListener("click", function() {if (!document.getElementById("row_"+i+"_info")) showInfo(i);}, false);
                })(i);
            }
        }
    }
 
}








// ===================================================================
// Author: Denis Howlett <feedback@isocra.com>
// WWW: http://www.isocra.com/
//
// NOTICE: You may use this code for any purpose, commercial or
// private, without any further permission from the author. You may
// remove this notice from your final code if you wish, however we
// would appreciate it if at least the web site address is kept.
//
// You may *NOT* re-distribute this code in any way except through its
// use. That means, you can include it in your product, or your web
// site, or any other form where the code is actually being used. You
// may not put the plain javascript up on your site for download or
// include it in your javascript libraries for download.
// If you wish to share this code with others, please just point them
// to the URL instead.
//
// Please DO NOT link directly to this .js files from your site. Copy
// the files to your server and use them there. Thank you.
// ===================================================================

/** Keep hold of the current table being dragged */
var currenttable = null;

/** Capture the onmousemove so that we can see if a row from the current
 *  table if any is being dragged.
 * @param ev the event (for Firefox and Safari, otherwise we use window.event for IE)
 */
document.onmousemove = function(ev){
    if (currenttable && currenttable.dragObject) {
        ev   = ev || window.event;
        var mousePos = currenttable.mouseCoords(ev);
        var y = mousePos.y - currenttable.mouseOffset.y;
        if (y != currenttable.oldY) {
            // work out if we're going up or down...
            var movingDown = y > currenttable.oldY;
            // update the old value
            currenttable.oldY = y;
            // update the style to show we're dragging
            currenttable.dragObject.style.backgroundColor = "#eee";
            // If we're over a row then move the dragged row to there so that the user sees the
            // effect dynamically
            var currentRow = currenttable.findDropTargetRow(y);
            if (currentRow) {
                if (movingDown && currenttable.dragObject != currentRow) {
                    currenttable.dragObject.parentNode.insertBefore(currenttable.dragObject, currentRow.nextSibling);
                } else if (! movingDown && currenttable.dragObject != currentRow) {
                    currenttable.dragObject.parentNode.insertBefore(currenttable.dragObject, currentRow);
                }
            }
        }

        return false;
    }
}

// Similarly for the mouseup
document.onmouseup   = function(ev){
    if (currenttable && currenttable.dragObject) {
        var droppedRow = currenttable.dragObject;
        // If we have a dragObject, then we need to release it,
        // The row will already have been moved to the right place so we just reset stuff
        droppedRow.style.backgroundColor = 'transparent';
        currenttable.dragObject   = null;
        // And then call the onDrop method in case anyone wants to do any post processing
        currenttable.onDrop(currenttable.table, droppedRow);
        currenttable = null; // let go of the table too
    }
}


/** get the source element from an event in a way that works for IE and Firefox and Safari
 * @param evt the source event for Firefox (but not IE--IE uses window.event) */
function getEventSource(evt) {
    if (window.event) {
        evt = window.event; // For IE
        return evt.srcElement;
    } else {
        return evt.target; // For Firefox
    }
}

/**
 * Encapsulate table Drag and Drop in a class. We'll have this as a Singleton
 * so we don't get scoping problems.
 */
function TableDnD() {
    /** Keep hold of the current drag object if any */
    this.dragObject = null;
    /** The current mouse offset */
    this.mouseOffset = null;
    /** The current table */
    this.table = null;
    /** Remember the old value of Y so that we don't do too much processing */
    this.oldY = 0;

    /** Initialise the drag and drop by capturing mouse move events */
    this.init = function(table) {
        this.table = table;
        var rows = table.rows; //getElementsByTagName("tr")
        for (var i=0; i<rows.length; i++) {
			// John Tarr: added to ignore rows that I've added the NoDnD attribute to (Category and Header rows)
			var nodrag = rows[i].getAttribute("NoDrag");
			if (nodrag == null || nodrag == "undefined") { //There is no NoDnD attribute on rows I want to drag
				this.makeDraggable(rows[i]);
			}
        }
    }

    /** This function is called when you drop a row, so redefine it in your code
        to do whatever you want, for example use Ajax to update the server */
    this.onDrop = function(table, droppedRow) {
        var rows = this.table.rows;
        var debugStr = "rows now: ";
        for (var i=0; i<rows.length; i++) {
            debugStr += rows[i].id+" ";
        }
        console.log('row['+droppedRow.id+'] dropped<br>'+debugStr);
    }

	/** Get the position of an element by going up the DOM tree and adding up all the offsets */
    this.getPosition = function(e){
        var left = 0;
        var top  = 0;
		/** Safari fix -- thanks to Luis Chato for this! */
		if (e.offsetHeight == 0) {
			/** Safari 2 doesn't correctly grab the offsetTop of a table row
			    this is detailed here:
			    http://jacob.peargrove.com/blog/2006/technical/table-row-offsettop-bug-in-safari/
			    the solution is likewise noted there, grab the offset of a table cell in the row - the firstChild.
			    note that firefox will return a text node as a first child, so designing a more thorough
			    solution may need to take that into account, for now this seems to work in firefox, safari, ie */
			e = e.firstChild; // a table cell
		}

        while (e.offsetParent){
            left += e.offsetLeft;
            top  += e.offsetTop;
            e     = e.offsetParent;
        }

        left += e.offsetLeft;
        top  += e.offsetTop;

        return {x:left, y:top};
    }

	/** Get the mouse coordinates from the event (allowing for browser differences) */
    this.mouseCoords = function(ev){
        if(ev.pageX || ev.pageY){
            return {x:ev.pageX, y:ev.pageY};
        }
        return {
            x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
            y:ev.clientY + document.body.scrollTop  - document.body.clientTop
        };
    }

	/** Given a target element and a mouse event, get the mouse offset from that element.
		To do this we need the element's position and the mouse position */
    this.getMouseOffset = function(target, ev){
        ev = ev || window.event;

        var docPos    = this.getPosition(target);
        var mousePos  = this.mouseCoords(ev);
        return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
    }

	/** Take an item and add an onmousedown method so that we can make it draggable */
    this.makeDraggable = function(item) {
        if(!item) return;
        var self = this; // Keep the context of the TableDnd inside the function
        item.onmousedown = function(ev) {
            // Need to check to see if we are an input or not, if we are an input, then
            // return true to allow normal processing
            var target = getEventSource(ev);
            if (target.tagName == 'INPUT' || target.tagName == 'SELECT') return true;
            currenttable = self;
            self.dragObject  = this;
            self.mouseOffset = self.getMouseOffset(this, ev);
            return false;
        }
        item.style.cursor = "move";
    }

    /** We're only worried about the y position really, because we can only move rows up and down */
    this.findDropTargetRow = function(y) {
        var rows = this.table.rows;
		for (var i=0; i<rows.length; i++) {
			var row = rows[i];
			// John Tarr added to ignore rows that I've added the NoDnD attribute to (Header rows)
			var nodrop = row.getAttribute("NoDrop");
			if (nodrop == null || nodrop == "undefined") {  //There is no NoDnD attribute on rows I want to drag
				var rowY    = this.getPosition(row).y;
				var rowHeight = parseInt(row.offsetHeight)/2;
				if (row.offsetHeight == 0) {
					rowY = this.getPosition(row.firstChild).y;
					rowHeight = parseInt(row.firstChild.offsetHeight)/2;
				}
				// Because we always have to insert before, we need to offset the height a bit
				if ((y > rowY - rowHeight) && (y < (rowY + rowHeight))) {
					// that's the row we're over
					return row;
				}
			}
		}
		return null;
	}
}