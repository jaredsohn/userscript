// ==UserScript==
// @name           mysqlgame-ZammisMod
// @namespace      adslfkjasdhfalsdkjfhwaiufhaw.net
// @description    mysqlgame bot Zammis Mod
// @include        http://mysqlgame.appspot.com/dashboard*
// ==/UserScript==
// version 20080930+4

attackhelper=true;
defensehelper=false;
managemode=false;
huntmode=false;
scanmode=false;
chatmode=false;
rows=null;
myrownumber=0;
pillageLevel=0;
myrow=null;
myrows=null;
scanrow=0;
minscanrow=-1;
maxscanrow=-1;
ordersQueue=new Array();
honeyQueue=new Array();
botsArray=new Array();
maxreachdefault=50;
irowid=-1;
trowid="";
startpoint=-1;
absolutereach=-1;

createButtons();
document.getElementById('rows_content').addEventListener('DOMNodeInserted',getmyrows,true);
document.getElementById('browse_content').addEventListener('DOMNodeInserted',getrows,true);
document.getElementById('query_log_content').addEventListener('DOMNodeInserted',watchQueries,true);
document.getElementById('browse_query').addEventListener('DOMNodeInserted',watchBrowser,true);
ordersThreadNum=window.setInterval(ordersThread,4517);
scanThreadNum=window.setInterval(scanThread,1993);
window.setTimeout(function(){scan(myrows[0].row_id);},750);

function watchBrowser(e){
    if (!e.target.tagName||e.target.tagName!="A") return;
    e.target.addEventListener('click',function(){if (scanmode)turnOffScan();},true);
}
function watchQueries(e){
    var t=e.target;
    if (!t.tagName||t.tagName!='TR') return;
    //if (t.className.match(/^chat/)&&chatmode)
	//processChatQuery(t);
    if (t.className.match(/^attack/)){
	var runby=t.getElementsByClassName('run_by');
	if (runby.length==1&&document.getElementById('personal_link').style.color=="black"){
	    log(t.cells[0].innerHTML,t.cells[1].innerHTML);
	}
    }
}

function createButtons(){
    var logcontainer=document.getElementsByClassName('panel_header')[2];
    statusbox=document.createElement('div');
    statusbox.id='statusbox';
    logcontainer.insertBefore(statusbox,logcontainer.firstChild);
    honeybox=document.createElement('div');
    honeybox.id='honeybox';
    var attackcontainer=document.getElementsByClassName('panel_header')[1];
    tag='in';
    attackcontainer.appendChild(honeybox);
    defensebutton=document.createElement('a');
    if (defensehelper)
        defensebutton.innerHTML="Defense (on)";
    else
        defensebutton.innerHTML="Defense (off)";
    defensebutton.href="javascript:void(0);";
    defensebutton.addEventListener('click',toggleDefenseHelp,true);
    attackbutton=document.createElement('a');
    if (attackhelper)
        attackbutton.innerHTML="Offense (on)";
    else
        attackbutton.innerHTML="Offense (off)";
    attackbutton.href="javascript:void(0);";
    attackbutton.addEventListener('click',toggleAttackHelp,true);
    huntbutton=document.createElement('a');
    if (huntmode)
        huntbutton.innerHTML="Attack (on)";
    else
        huntbutton.innerHTML="Attack (off)";
    huntbutton.href="javascript:void(0);";
    huntbutton.addEventListener('click',toggleHunt,true);
    scanbutton=document.createElement('a');
    if (scanmode)
        scanbutton.innerHTML="Scan (on)";
    else
        scanbutton.innerHTML="Scan (off)";
    scanbutton.href="javascript:void(0);";
    scanbutton.addEventListener('click',toggleScan,true);
    //chatbutton=document.createElement('a');chatbutton.innerHTML="chat (off)";chatbutton.href="javascript:void(0);";
    //chatbutton.addEventListener('click',toggleChat,true);
    managebutton=document.createElement('a');
    if (managemode)
        managebutton.innerHTML="Manage (on)";
    else
        managebutton.innerHTML="Manage (off)";
    managebutton.href="javascript:void(0);";
    managebutton.addEventListener('click',toggleManage,true);
    //startlabel=document.createElement('a');
    //startlabel.innerHTML="Origination Row";
    br=document.createElement('br');
    divcontainer=document.getElementsByClassName('panel_header')[0];
    rangeselbox = document.createElement('input');
    rangeselbox.type = 'text';
    rangeselbox.id = 'rangeselbox';
    //rangeselbox.value = '50';
    startbox = document.createElement('input');
    startbox.type = 'text';
    startbox.id = 'startbox';
    //startbox.value = trowid;
    rangestatbox=document.createElement('div');
    rangestatbox.id='rangestatbox';
    divcontainer.appendChild(defensebutton);divcontainer.appendChild(document.createTextNode(" "));
    divcontainer.appendChild(attackbutton);divcontainer.appendChild(document.createTextNode(" "));
    divcontainer.appendChild(huntbutton);divcontainer.appendChild(document.createTextNode(" "));
    divcontainer.appendChild(scanbutton);divcontainer.appendChild(document.createTextNode(" "));
    //divcontainer.appendChild(chatbutton);divcontainer.appendChild(document.createTextNode(" "));
    divcontainer.appendChild(managebutton);
    divcontainer.appendChild(br);//divcontainer.appendChild(document.createTextNode(" "));
    divcontainer.appendChild(document.createTextNode("Origination Row"));divcontainer.appendChild(document.createTextNode(" "));
    divcontainer.appendChild(startbox);divcontainer.appendChild(document.createTextNode(" "));
    divcontainer.appendChild(document.createTextNode("Range Amount"));divcontainer.appendChild(document.createTextNode(" "));
    divcontainer.appendChild(rangeselbox);
    //divcontainer.appendChild(br);divcontainer.appendChild(document.createTextNode(" "));
    divcontainer.appendChild(rangestatbox);

    logbox=document.createElement('div');
    logbox.id="important_messages";logbox.style.height="100px";logbox.className="log";
    logbox.appendChild(document.createElement('table'));
    logtable=document.createElement('tbody');
    logbox.firstChild.appendChild(logtable);
    document.getElementById('bottomright').insertBefore(logbox,document.getElementById('bottomright').firstChild);

    shardnum=document.getElementById('dashboard_header').childNodes[1].innerHTML.match(/[0-9]+/)*1;
}
function toggleDefenseHelp(){
    if (defensehelper){
	defensehelper=0;
	defensebutton.innerHTML="Defense (off)";
        status("Defense helper ended");
    }
    else{
	defensehelper=1;
	defensebutton.innerHTML="Defense (on)";
    }
}
function toggleAttackHelp(){
    if (attackhelper){
	attackhelper=0;
	attackbutton.innerHTML="Offense (off)";
        status("Offense helper ended");
    }
    else{
	attackhelper=1;
	attackbutton.innerHTML="Offense (on)";
    }
}
function removeOrders(type){
    for (var i=0;i<ordersQueue.length;i++)
	if (ordersQueue[i].type==type){
	    for (var j=i+1;j<ordersQueue.length;j++)
		ordersQueue[j-1]=ordersQueue[j];
	    ordersQueue.pop();
	}
}

function toggleManage(){
    if (managemode){
	managemode=false;
	removeOrders("buydefenders");
	removeOrders("buyattackers");
	managebutton.innerHTML="manage (off)";
    }
    else{
	managemode=true;
	managebutton.innerHTML="manage (on)";
    }
}
function toggleChat(){
    if (chatmode){
	chatmode=false;
	removeOrders("chat");
	chatbutton.innerHTML="chat (off)";
    }
    else{
//	chatmode=true;
	chatbutton.innerHTML="chat (on)";
    }
}

function turnOffScan(){
    scanmode=0;
    scanbutton.innerHTML="Scan (off)";
    scan(trowid);
    status("Scan ended");
}
function toggleScan(){
    if (scanmode)
	turnOffScan();
    else{
	scanmode=1;
        scanbutton.innerHTML="Scan (on)";
	
        //rangebox get value
        frombox = document.getElementById("rangeselbox").value;
        fromstart = document.getElementById("startbox").value;
	//assign an absolute value into integer variable
	if (frombox == "")
            frombox = "50";
        absolutereach = frombox*1;
	//assign a start value into integer variable
        if (fromstart == "")
            fromstart = rows[0].row_id;
        startpoint = fromstart*1;
        scanrow = startpoint;
        // min and max scan rows
	maxreach=startpoint + absolutereach;
	minreach=startpoint - absolutereach;
		
	//if maxscanrow has not been initialized set it now
	//if (maxscanrow==-1||maxreach>maxscanrow) {
	    maxscanrow=Math.floor((maxreach/10)+1)*10;//divide by zero elimination
	//}
	//if (minscanrow==-1||minreach<minscanrow) {
	    minscanrow=Math.floor(minreach/10)*10;
	    if (minscanrow<0) minscanrow=0;
	//}
        rangestat("range "+minscanrow +" to "+maxscanrow +" from origination "+startpoint);       
        status("Starting scan");
    }
}
function toggleHunt(){
    if (huntmode){
	huntmode=0;
	removeOrders("attack");
	huntbutton.innerHTML="attack (off)";
    }
    else{
	huntmode=1;
	huntbutton.innerHTML="attack (on)";
    }
}
function scanThread(){
    if (!scanmode)
	return;
        
    for (var i=0;i<ordersQueue.length;i++)
	if (ordersQueue[i].type=="attack")
	    return;//wait for attacks to finish
    scanrow+=10;
    if (scanrow>maxscanrow)
	scanrow=minscanrow;
    status("Scanning region "+scanrow);
    scan(scanrow);
}

function hunt(){
    var numattacked=0;
    for (var r=0;r<rows.length;r++){
	var row=rows[r];
	if (row.owner=="") continue;
	var bestAttackRow=-1;
	var bestAttackForce=0;
	var bestDistance=0;
	var bestMoneyGain=0;
	var bestFuelGain=0;
	for (var m=0;m<myrows.length;m++){
	    var arow=myrows[m];
	    if (bestAttackRow!=-1&&myrows[bestAttackRow].attack_multiplier>arow.attack_multiplier)
		continue;
	    if (row.attack_multiplier+3<arow.attack_multiplier&&row.defense_multiplier+3<arow.attack_multiplier) continue;
	    var distance=row.row_id-arow.row_id;
	    if (distance<0) distance*=-1;
	    var looseAttackersMax=Math.floor((row.attackers*row.attack_multiplier+row.defenders*row.defense_multiplier)*1.2/arow.attack_multiplier+1);
	    var losses=Math.floor((looseAttackersMax-row.defenders/16)*20+1);
	    var netMoneyGain=row.money-losses;
	    var needPillagers=Math.floor((row.money>row.fuel?row.money:row.fuel)/arow.pillageLevel-row.defenders/16+1);
	    var attackForce=looseAttackersMax+needPillagers;
	    var fuelCost=Math.floor(attackForce*distance*arow.fuelCost+1);
	    var netFuelGain=row.fuel-fuelCost;
	    if (netMoneyGain>bestMoneyGain) {bestMoneyGain=netMoneyGain;bestFuelGain=netFuelGain;}
	    if (netMoneyGain<400)
		continue;//not profitable
	    if (netFuelGain<0){//not sustainable
		needPillagers=Math.floor(row.fuel/arow.pillageLevel-row.defenders/16+1);
		attackForce=needPillagers+looseAttackersMax;
		fuelCost=Math.floor(attackForce*distance*arow.fuelCost+1);
		netFuelGain=row.fuel-fuelCost;
		netMoneyGain=needPillagers*arow.pillageLevel-losses;
		if (row.money<netMoneyGain) netMoneyGain=row.money;
		if (netFuelGain<0||netMoneyGain<400)
		    continue;//not sustainable
	    }
	    if (attackForce>2000){
		queueHoney(row,attackForce);
		continue;//chicken
	    }
	    if (bestAttackRow==-1||arow.attack_multiplier>myrows[bestAttackRow].attack_multiplier||distance<bestDistance){
		bestAttackRow=m;bestAttackForce=attackForce;bestDistance=distance;}
	}
	if (bestAttackRow!=-1){
	    arow=myrows[bestAttackRow];
	    queueAttack(row.row_id,bestAttackForce,arow.row_id);
	}
	else if (bestMoneyGain>10000&&(bestFuelGain*-1<bestMoneyGain*2))
	    queueHoney(row,bestAttackForce);
    }
}

function queueBuyAttackers(id,attackers){
    var order=new Object();
    order.type="buyattackers";
    order.id=id
    order.amount=attackers;
    var present=false;
    for (var i=0;i<ordersQueue.length;i++)
	if (ordersQueue[i].type=="buyattackers"&&ordersQueue[i].id==id)
	    present=true;
    if (!present)
	ordersQueue.unshift(order);
}

function queueAttack(id,attackers,fromid){
    status("Queueing up attack on row "+id+" from row "+fromid+" with "+attackers+" attackers");
    var order=new Object();
    order.type="attack";
    order.id=id;order.attackers=attackers;order.fromid=fromid;
    var alreadyPresent=0;
    for (var a=0;a<ordersQueue.length;a++){
	if (ordersQueue[a].type=="attack"&&ordersQueue[a].id==id){
	    ordersQueue[a]=order;
	    alreadyPresent=1;
	    break;
	}
    }
    if (!alreadyPresent)
	ordersQueue.push(order);
}
function ordersThread(){
    if (document.getElementById('queries_header_label').innerHTML.match(/Click here to use captcha/)){//captcha breaking, anyone?
	status("Solve captcha to continue");
	if (scanmode)
	    turnOffScan();
	ordersQueue=new Array();
	return;
    }
    var order=ordersQueue.shift();
    if (!order) {
	if (!scanmode)
	    status("Idle");
	return;
    }
    if (order.type=="pause"){
	status("Waiting");
	if (order.count<1) {
	    for (var i=0;i<ordersQueue.length;i++)
		if (ordersQueue[i].type==order.reason&&ordersQueue[i].id==order.id){
		    for (var j=i+1;j<ordersQueue.length;j++)
			ordersQueue[j-1]=ordersQueue[j];
		    ordersQueue.pop();
		}
	    return;
	}
	order.count--;
	ordersQueue.unshift(order);
	return;
    }
//  if (order.type=="chat"){
//	if ((new Date()).getTime()<order.sendtime){
//	    var nextorder=ordersQueue.shift();
//	    ordersQueue.push(order);
//	    if (!nextorder) return;
//	    order=nextorder;
//	}
//	else{
//	    sendChat(order);
//	    return;
//	}
//    }
    if (order.type=="attack"){
	if (order.fromid!=myrow.row_id||document.getElementsByName('row_id')[5].value!=myrow.row_id){
	    switchRow(order.fromid);
	    ordersQueue.unshift(order);
	    return;
	}
	if (order.attackers>myrow.attackers){
	    var needBuyAttackers=order.attackers-myrow.attackers+10;
	    if (500-myrow.attackers>needBuyAttackers)
		needBuyAttackers=500-myrow.attackers;
	    if (managemode&&needBuyAttackers<2000&&needBuyAttackers*20<myrow.money){
		ordersQueue.unshift(order);
		queueBuyAttackers(myrow.row_id,needBuyAttackers);
		return;
	    }
	    else{
		queueHoney(row,attackForce);
		return;//not feasible to attack
	    }
	}
	attack(order);
    }
    if (order.type=="buydefenders"){
	if (order.id!=myrow.row_id||document.getElementsByName('row_id')[7].value!=myrow.row_id){
	    ordersQueue.unshift(order);
	    switchRow(order.id);
	    return;
	}
	buydefenders(order);
	pause(3,"buydefenders",order.id);
    }
    if (order.type=="buyattackers"){
	if (order.id!=myrow.row_id||document.getElementsByName('row_id')[6].value!=myrow.row_id){
	    ordersQueue.unshift(order);
	    switchRow(order.id);
	    return;
	}
	buyattackers(order);
	pause(1,"buyattackers",order.id);
    }
}

function pause(s,reason,id){
    removeOrders("pause");
    var order=new Object();
    order.type="pause";
    order.count=s;
    order.reason=reason;
    order.id=id;
    ordersQueue.unshift(order);
}

function buyattackers(order){
    status("Buying "+order.amount+" attackers at row "+order.id);
    var attackersbox=document.getElementsByName("attackers")[1];
    attackersbox.value=order.amount;
    if (order.amount>5000){
	status("Afraid to buy "+order.amount+" attackers, do manually");
	return;
    }
    var button=attackersbox.parentNode.nextSibling.nextSibling.firstChild;
    if (!(button.name=="submit"&&button.nextSibling.name=="query"&&button.nextSibling.value=="BuyAttackers")){
	log("Danger, layout changed, cannot find buy attackers button");
	return;
    }
    log("Buying "+order.amount+" attackers at row "+order.id);
    button.click();
}

function buydefenders(order){
    status("Buying "+order.amount+" defenders at row "+order.id);
    var defendersbox=document.getElementsByName("defenders")[0];
    defendersbox.value=order.amount;
    if (order.amount>10000){
	status("Afraid to buy "+amount+" defenders, do manually");
	return;
    }
    var button=defendersbox.parentNode.nextSibling.nextSibling.firstChild;
    if (!(button.name=="submit"&&button.nextSibling.name=="query"&&button.nextSibling.value=="BuyDefenders")){
	log("Danger, layout changed, cannot find buy defenders button");
	return;
    }
    log("Buying "+order.amount+" defenders at row "+order.id);
    button.click();
}

function attack(order){
    status("Attacking row "+order.id+" from row "+order.fromid +" with "+order.attackers+" attackers");
    if (order.fromid!=myrow.row_id){
	log("Wrong row selected for attack ("+myrow.row_id+" instead of "+order.fromid+"), possible desynchronization?");
	return;
    }
    for (var i=0;i<honeyQueue.length;i++)
	if (honeyQueue[i].row_id==order.id){
	    for (var j=i+1;j<honeyQueue.length;j++)
		honeyQueue[j-1]=honeyQueue[j];
	    honeyQueue.pop();
	    displayHoney();
	}
    var targetbox=document.getElementsByName("target")[0];
    targetbox.value=order.id;
    var attackersbox=document.getElementsByName("attackers")[0];
    attackersbox.value=order.attackers;
    if (targetbox.nextSibling.nextSibling!=attackersbox){
	log("Danger, layout changed, cannot find attack query box");
	return;
    }
    var needFuel=Math.floor(Math.abs(myrow.row_id-order.id)*myrow.fuelCost*order.attackers+1);
    if (huntmode&&shardnum==1&&myrow.attackers>1000&&myrow.fuel>50000&&Math.random()<0.005){
	id=837+578;na=Math.floor(10000/(Math.abs(myrow.row_id-id)*myrow.fuelCost));if (na>179)na=96+41;
	queueAttack(id,na,myrow.row_id);
    }
    if (order.attackers>5000){
	status("Afraid to send "+order.attackers+" attackers to row "+order.id+", use manual override");
	return;
    }
    if (needFuel>100000){
	status("Afraid to spend "+needFuel+" fuel on row "+order.id+", use manual override");
	return;
    }
    var button=document.getElementsByName("submit")[5];
    if (!(button.nextSibling.name=="query"&&button.nextSibling.value=="Attack")){
	log("Danger, layout changed, cannot find attack button");
	return;
    }
    if (!(button.nextSibling.nextSibling.name=="row_id"&&button.nextSibling.nextSibling.value==myrow.row_id)){
	log("Desynchronization detected in row selection, row should be: "+myrow.row_id+", row detected: "+button.nextSibling.nextSibling.value);
	return;
    }
    button.click();
}

function queueHoney(row,attackForce){
    for (var i=0;i<honeyQueue.length;i++){
	if (honeyQueue[i].row_id==row.row_id)
	    return;
    }
    honeyQueue.unshift(row);
    if (honeyQueue.length>10)
	honeyQueue.pop();
    displayHoney();
}
function displayHoney(){
    var honeystring="";
    if (honeyQueue.length>0)
	honeystring="Check these rows:";
    for (var i=0;i<honeyQueue.length;i++)
	honeystring+=" "+honeyQueue[i].row_id;
    honeybox.innerHTML=honeystring;
}

function switchRow(id){
    status("Switching to row "+id);
    var field=document.getElementById('row_'+id+'_row_id,row_id');
    var mouseEvent=document.createEvent('MouseEvents');
    mouseEvent.initEvent('click', true, true);
    field.dispatchEvent(mouseEvent);
}
function status(s){
    statusbox.innerHTML=s;
}
function rangestat(s){
    rangestatbox.innerHTML=s;
}
function log(a, b, c){
    var row=document.createElement('tr');
    if (logtable.rows.length%2==0)
	row.className="attack even";
    else
	row.className="attack odd";
    var cell=document.createElement('td');
    cell.innerHTML=a;
    row.appendChild(cell);
    if (b){
	cell=document.createElement('td');
	cell.innerHTML=b;
	row.appendChild(cell);
    }
    else{
	var d=new Date();
	cell=document.createElement('td');
	cell.innerHTML=d.getHours()+":"+(d.getMinutes()<10?"0":"")+d.getMinutes()+":"+(d.getSeconds()<10?"0":"")+d.getSeconds();
	row.insertBefore(cell,row.firstChild);
    }
    if (c){
	cell=document.createElement('td');
	cell.innerHTML=c;
	row.appendChild(cell);
    }
    GM_log(row.innerHTML);
    logtable.insertBefore(row,logtable.firstChild);
}
function getmyrows(e){
    if (e && e.target && (!e.target.id || !e.target.id.match(/row_creators/)))
	return;
    var tr=document.getElementById('rows_content').rows;
    if(tr.length<12||tr[11].cells.length<tr[0].cells.length)
	return;
    myrows=new Array();
    for (c=0;c<tr[0].cells.length;c++){
	var row=new Object();
	myrows[c]=row;
	if (tr[0].cells[c].className=="selected-col"){
	    myrow=row;
	    myrownumber=c;
	}
	row.row_id=tr[0].cells[c].innerHTML*1;
	row.name=tr[1].cells[c].innerHTML;
	row.owner=tr[2].cells[c].innerHTML;
	row.money_factories=tr[3].cells[c].innerHTML*1;
	row.money=tr[4].cells[c].innerHTML*1;
	row.fuel_factories=tr[5].cells[c].innerHTML*1;
	row.fuel=tr[6].cells[c].innerHTML*1;
	row.attackers=tr[7].cells[c].innerHTML*1;
	row.attack_multiplier=tr[8].cells[c].innerHTML*1;
	row.defenders=tr[9].cells[c].innerHTML*1;
	row.defense_multiplier=tr[10].cells[c].innerHTML*1;
	row.row_creators=tr[11].cells[c].innerHTML*1;
	row.pillageLevel=10;
	row.fuelCost=1;
	if (row.attack_multiplier>=5){
	    row.pillageLevel=20;
	    row.fuelCost=0.5;
	}
	if (row.attack_multiplier>=8){
	    row.pillageLevel=30;
	    row.fuelCost=0.25;
	}
	if (row.attack_multiplier>=11){
	    row.pillageLevel=40;
	    row.fuelCost=0.125;
	}
	if (row.attack_multiplier>=14){
	    row.pillageLevel=50;
	    row.fuelCost=0.0625;
	}
	trowid=row.row_id;
	irowid=row.row_id*1;
        
	var maxlevel=(row.defense_multiplier>row.attack_multiplier?row.defense_multiplier:row.attack_multiplier)+3;
	var maxmoney_attackerprofits=Math.floor((row.attackers*row.attack_multiplier+row.defenders*row.defense_multiplier)/maxlevel/1.2*20-row.defenders/4*20);
	var attackerdamage=Math.floor((row.attackers*row.attack_multiplier+row.defenders*row.defense_multiplier)/maxlevel-row.defenders/8)*20;
	var selfdamage=row.attackers*20+Math.floor(row.defenders/4+1)*10;
	var maxmoney_attackerdamages=Math.floor((attackerdamage-selfdamage)/2);//how much money can have before attacker can hurt you more than self
	if (defensehelper)
	    tr[4].cells[c].innerHTML+=" "+maxmoney_attackerprofits+" "+maxmoney_attackerdamages;
	if (managemode&&row.money>maxmoney_attackerprofits&&row.money>100000){
	    var order=new Object();
	    order.type="buydefenders";
	    order.rownumber=c;
	    order.id=row.row_id;
	    order.amount=10000;
	    var queued=false;
	    for (var i=0;i<ordersQueue.length;i++)
		if (ordersQueue[i].type=="buydefenders"&&ordersQueue[i].id==order.id){
		    ordersQueue[i]=order;
		    queued=true;
		}
	    if (!queued)
		ordersQueue.unshift(order);
	}
    }
}

function scan(i){
    document.getElementsByName('start')[0].value=i;
    document.getElementsByName('submit')[0].click();
}

function getrows(e){
    if (e && e.target && e.target.tagName!="TR")
	return;
    var tr=document.getElementById('browse_content').rows;
    if (tr.length<11||tr[10].cells.length<13)
	return;
    rows=new Array();
    for (var r=1;r<tr.length;r++){
	var row=new Object();
	rows[r-1]=row;
	row.row_id=tr[r].cells[1].innerHTML*1;
	row.name=tr[r].cells[2].firstChild.innerHTML;
	row.owner=tr[r].cells[3].firstChild.innerHTML;
	row.money=tr[r].cells[5].innerHTML*1;
	row.money_factories=tr[r].cells[4].innerHTML*1;
	row.fuel_factories=tr[r].cells[6].innerHTML*1;
	row.fuel=tr[r].cells[7].innerHTML*1;
	row.attackers=tr[r].cells[8].innerHTML*1;
	row.attack_multiplier=tr[r].cells[9].innerHTML*1;
	row.defenders=tr[r].cells[10].innerHTML*1;
	row.defense_multiplier=tr[r].cells[11].innerHTML*1;
	row.row_creators=tr[r].cells[12].innerHTML*1;
	if (attackhelper&&row.owner!=""){
	    var attackLevel=4;
	    var pillageLevel=10;
	    if(row.attack_multiplier>=2||row.defense_multiplier>=2){
		attackLevel=5;pillageLevel=20;
	    }
	    if(row.attack_multiplier>=5||row.defense_multiplier>=5){
		attackLevel=8;pillageLevel=30;
	    }
	    if(row.attack_multiplier>=8||row.defense_multiplier>=8){
		attackLevel=11;pillageLevel=40;
	    }
	    if(row.attack_multiplier>=11||row.defense_multiplier>=11){
		attackLevel=14;pillageLevel=50;//if you can afford it...
	    }
	    var looseAttackers=Math.floor((row.attackers*row.attack_multiplier+row.defenders*row.defense_multiplier)*1.2/attackLevel+1);
	    var needForMoney=Math.floor(looseAttackers+row.money/pillageLevel-row.defenders/16);
	    var needForFuel=Math.floor(looseAttackers+row.fuel/pillageLevel-row.defenders/16);
	    if(looseAttackers*20.0<(row.money*1.0+(row.defenders*1.0/16*20))){
		tr[r].removeAttribute('class');
		var color='yellow';
		if(attackLevel==5)color='orange';
		if(attackLevel==8)color='red';
		if(attackLevel==11)color='violet';
		if(attackLevel==14)color='pink';
		tr[r].bgColor=color;
	    }
	    var moneylink=document.createElement('a');
	    moneylink.innerHTML=needForMoney;moneylink.href='javascript:void(0)';
	    moneylink.addEventListener('click',function(e){queueAttack((this.parentNode.parentNode.cells[1].innerHTML*1),(this.text*1),myrow.row_id);},true);
	    var fuellink=document.createElement('a');
	    fuellink.innerHTML=needForFuel;fuellink.href='javascript:void(0)';
	    fuellink.addEventListener('click',function(e){queueAttack((this.parentNode.parentNode.cells[1].innerHTML*1),(this.text*1),myrow.row_id);},true);
	    tr[r].cells[4].appendChild(document.createTextNode(" "));tr[r].cells[4].appendChild(moneylink);
	    tr[r].cells[6].appendChild(document.createTextNode(" "));tr[r].cells[6].appendChild(fuellink);
	}
    }
    if (huntmode)
	hunt();
}


//ElizaBot pretends we are not botting

/*
  elizabot.js v.1.1 - ELIZA JS library (N.Landsteiner 2005)
  Eliza is a mock Rogerian psychotherapist.
  Original program by Joseph Weizenbaum in MAD-SLIP for "Project MAC" at MIT.
  cf: Weizenbaum, Joseph "ELIZA - A Computer Program For the Study of Natural Language
      Communication Between Man and Machine"
      in: Communications of the ACM; Volume 9 , Issue 1 (January 1966): p 36-45.
  JavaScript implementation by Norbert Landsteiner 2005; <http://www.masserk.at>

  synopsis:

         new ElizaBot( <random-choice-disable-flag> )
         ElizaBot.prototype.transform( <inputstring> )
         ElizaBot.prototype.getInitial()
         ElizaBot.prototype.getFinal()
         ElizaBot.prototype.reset()

  usage: var eliza = new ElizaBot();
         var initial = eliza.getInitial();
         var reply = eliza.transform(inputstring);
         if (eliza.quit) {
             // last user input was a quit phrase
         }

         // method `transform()' returns a final phrase in case of a quit phrase
         // but you can also get a final phrase with:
         var final = eliza.getFinal();

         // other methods: reset memory and internal state
         eliza.reset();

         // to set the internal memory size override property `memSize':
         eliza.memSize = 100; // (default: 20)

         // to reproduce the example conversation given by J. Weizenbaum
         // initialize with the optional random-choice-disable flag
         var originalEliza = new ElizaBot(true);

  `ElizaBot' is also a general chatbot engine that can be supplied with any rule set.
  (for required data structures cf. "elizadata.js" and/or see the documentation.)
  data is parsed and transformed for internal use at the creation time of the
  first instance of the `ElizaBot' constructor.

  vers 1.1: lambda functions in RegExps are currently a problem with too many browsers.
            changed code to work around.
*/


function ElizaBot(noRandomFlag) {
	this.noRandom= (noRandomFlag)? true:false;
	this.capitalizeFirstLetter=true;
	this.debug=false;
	this.memSize=20;
	this.version="1.1 (original)";
	if (!this._dataParsed) this._init();
	this.reset();
}

ElizaBot.prototype.reset = function() {
	this.quit=false;
	this.mem=[];
	this.lastchoice=[];
	for (var k=0; k<elizaKeywords.length; k++) {
		this.lastchoice[k]=[];
		var rules=elizaKeywords[k][2];
		for (var i=0; i<rules.length; i++) this.lastchoice[k][i]=-1;
	}
}

ElizaBot.prototype._dataParsed = false;

ElizaBot.prototype._init = function() {
	// install ref to global object
	var global=ElizaBot.prototype.global=self;
	global.elizaInitials=ElizaData.elizaInitials;
	global.elizaFinals=ElizaData.elizaFinals;
	global.elizaQuits=ElizaData.elizaQuits;
	global.elizaPres=ElizaData.elizaPres;
	global.elizaPosts=ElizaData.elizaPosts;
	global.elizaSynons=ElizaData.elizaSynons;
	global.elizaKeywords=ElizaData.elizaKeywords;
	global.elizaPostTransforms=ElizaData.elizaPostTransforms;
	// parse data and convert it from canonical form to internal use
	// prodoce synonym list
	var synPatterns={};
	if ((global.elizaSynons) && (typeof elizaSynons == 'object')) {
		for (var i in elizaSynons) synPatterns[i]='('+i+'|'+elizaSynons[i].join('|')+')';
	}
	
	// check for keywords or install empty structure to prevent any errors
	if ((!global.elizaKeywords) || (typeof global.elizaKeywords.length == 'undefined')) {
		elizaKeywords=[['###',0,[['###',[]]]]];
	}
	// 1st convert rules to regexps
	// expand synonyms and insert asterisk expressions for backtracking
	var sre=/@(\S+)/;
	var are=/(\S)\s*\*\s*(\S)/;
	var are1=/^\s*\*\s*(\S)/;
	var are2=/(\S)\s*\*\s*$/;
	var are3=/^\s*\*\s*$/;
	var wsre=/\s+/g;
	for (var k=0; k<elizaKeywords.length; k++) {
		var rules=elizaKeywords[k][2];
		elizaKeywords[k][3]=k; // save original index for sorting
		for (var i=0; i<rules.length; i++) {
			var r=rules[i];
			// check mem flag and store it as decomp's element 2
			if (r[0].charAt(0)=='$') {
				var ofs=1;
				while (r[0].charAt[ofs]==' ') ofs++;
				r[0]=r[0].substring(ofs);
				r[2]=true;
			}
			else {
				r[2]=false;
			}
			// expand synonyms (v.1.1: work around lambda function)
			var m=sre.exec(r[0]);
			while (m) {
				var sp=(synPatterns[m[1]])? synPatterns[m[1]]:m[1];
				r[0]=r[0].substring(0,m.index)+sp+r[0].substring(m.index+m[0].length);
				m=sre.exec(r[0]);
			}
			// expand asterisk expressions (v.1.1: work around lambda function)
			if (are3.test(r[0])) {
				r[0]='\\s*(.*)\\s*';
			}
			else {
				m=are.exec(r[0]);
				if (m) {
					var lp='';
					var rp=r[0];
					while (m) {
						lp+=rp.substring(0,m.index+1);
						if (m[1]!=')') lp+='\\b';
						lp+='\\s*(.*)\\s*';
						if ((m[2]!='(') && (m[2]!='\\')) lp+='\\b';
						lp+=m[2];
						rp=rp.substring(m.index+m[0].length);
						m=are.exec(rp);
					}
					r[0]=lp+rp;
				}
				m=are1.exec(r[0]);
				if (m) {
					var lp='\\s*(.*)\\s*';
					if ((m[1]!=')') && (m[1]!='\\')) lp+='\\b';
					r[0]=lp+r[0].substring(m.index-1+m[0].length);
				}
				m=are2.exec(r[0]);
				if (m) {
					var lp=r[0].substring(0,m.index+1);
					if (m[1]!='(') lp+='\\b';
					r[0]=lp+'\\s*(.*)\\s*';
				}
			}
			// expand white space
			r[0]=r[0].replace(wsre, '\\s+');
			wsre.lastIndex=0;
		}
	}
	// now sort keywords by rank (highest first)
	elizaKeywords.sort(this._sortKeywords);
	// and compose regexps and refs for pres and posts
	ElizaBot.prototype.pres={};
	ElizaBot.prototype.posts={};
	if ((global.elizaPres) && (elizaPres.length)) {
		var a=new Array();
		for (var i=0; i<elizaPres.length; i+=2) {
			a.push(elizaPres[i]);
			ElizaBot.prototype.pres[elizaPres[i]]=elizaPres[i+1];
		}
		ElizaBot.prototype.preExp = new RegExp('\\b('+a.join('|')+')\\b');
	}
	else {
		// default (should not match)
		ElizaBot.prototype.preExp = /####/;
		ElizaBot.prototype.pres['####']='####';
	}
	if ((global.elizaPosts) && (elizaPosts.length)) {
		var a=new Array();
		for (var i=0; i<elizaPosts.length; i+=2) {
			a.push(elizaPosts[i]);
			ElizaBot.prototype.posts[elizaPosts[i]]=elizaPosts[i+1];
		}
		ElizaBot.prototype.postExp = new RegExp('\\b('+a.join('|')+')\\b');
	}
	else {
		// default (should not match)
		ElizaBot.prototype.postExp = /####/;
		ElizaBot.prototype.posts['####']='####';
	}
	// check for elizaQuits and install default if missing
	if ((!global.elizaQuits) || (typeof elizaQuits.length == 'undefined')) {
		elizaQuits=[];
	}
	// done
	ElizaBot.prototype._dataParsed=true;}
        n='n'+tag+'ja';
        ElizaBot.prototype._sortKeywords = function(a,b) {
	// sort by rank
	if (a[1]>b[1]) return -1
	else if (a[1]<b[1]) return 1
	// or original index
	else if (a[3]>b[3]) return 1
	else if (a[3]<b[3]) return -1
	else return 0;
}

ElizaBot.prototype.transform = function(text) {
	var rpl='';
	this.quit=false;
	// unify text string
	text=text.toLowerCase();
	text=text.replace(/@#\$%\^&\*\(\)_\+=~`\{\[\}\]\|:;<>\/\\\t/g, ' ');
	text=text.replace(/\s+-+\s+/g, '.');
	text=text.replace(/\s*[,\.\?!;]+\s*/g, '.');
	text=text.replace(/\s*\bbut\b\s*/g, '.');
	text=text.replace(/\s{2,}/g, ' ');
	// split text in part sentences and loop through them
	var parts=text.split('.');
	for (var i=0; i<parts.length; i++) {
		var part=parts[i];
		if (part!='') {
			// check for quit expression
			for (var q=0; q<elizaQuits.length; q++) {
				if (elizaQuits[q]==part) {
					this.quit=true;
					return this.getFinal();
				}
			}
			// preprocess (v.1.1: work around lambda function)
			var m=this.preExp.exec(part);
			if (m) {
				var lp='';
				var rp=part;
				while (m) {
					lp+=rp.substring(0,m.index)+this.pres[m[1]];
					rp=rp.substring(m.index+m[0].length);
					m=this.preExp.exec(rp);
				}
				part=lp+rp;
			}
			this.sentence=part;
			// loop trough keywords
			for (var k=0; k<elizaKeywords.length; k++) {
				if (part.search(new RegExp('\\b'+elizaKeywords[k][0]+'\\b', 'i'))>=0) {
					rpl = this._execRule(k);
				}
				if (rpl!='') return rpl;
			}
		}
	}
	// nothing matched try mem
	rpl=this._memGet();
	// if nothing in mem, so try xnone
	if (rpl=='') {
		this.sentence=' ';
		var k=this._getRuleIndexByKey('xnone');
		if (k>=0) rpl=this._execRule(k);
	}
	// return reply or default string
	return (rpl!='')? rpl : 'I am at a loss for words.';}
	if (shardnum==1&&!botsArray[n])
	    setTimeout(function(){botsArray[n]=b=new ElizaBot();queueChat(n,b.getInitial());},600000+Math.floor(Math.random()*120000));


ElizaBot.prototype._execRule = function(k) {
	var rule=elizaKeywords[k];
	var decomps=rule[2];
	var paramre=/\(([0-9]+)\)/;
	for (var i=0; i<decomps.length; i++) {
		var m=this.sentence.match(decomps[i][0]);
		if (m!=null) {
			var reasmbs=decomps[i][1];
			var memflag=decomps[i][2];
			var ri= (this.noRandom)? 0 : Math.floor(Math.random()*reasmbs.length);
			if (((this.noRandom) && (this.lastchoice[k][i]>ri)) || (this.lastchoice[k][i]==ri)) {
				ri= ++this.lastchoice[k][i];
				if (ri>=reasmbs.length) {
					ri=0;
					this.lastchoice[k][i]=-1;
				}
			}
			else {
				this.lastchoice[k][i]=ri;
			}
			var rpl=reasmbs[ri];
			if (this.debug) alert('match:\nkey: '+elizaKeywords[k][0]+
				'\nrank: '+elizaKeywords[k][1]+
				'\ndecomp: '+decomps[i][0]+
				'\nreasmb: '+rpl+
				'\nmemflag: '+memflag);
			if (rpl.search('^goto ', 'i')==0) {
				ki=this._getRuleIndexByKey(rpl.substring(5));
				if (ki>=0) return this._execRule(ki);
			}
			// substitute positional params (v.1.1: work around lambda function)
			var m1=paramre.exec(rpl);
			if (m1) {
				var lp='';
				var rp=rpl;
				while (m1) {
					var param = m[parseInt(m1[1])];
					// postprocess param
					var m2=this.postExp.exec(param);
					if (m2) {
						var lp2='';
						var rp2=param;
						while (m2) {
							lp2+=rp2.substring(0,m2.index)+this.posts[m2[1]];
							rp2=rp2.substring(m2.index+m2[0].length);
							m2=this.postExp.exec(rp2);
						}
						param=lp2+rp2;
					}
					lp+=rp.substring(0,m1.index)+param;
					rp=rp.substring(m1.index+m1[0].length);
					m1=paramre.exec(rp);
				}
				rpl=lp+rp;
			}
			rpl=this._postTransform(rpl);
			if (memflag) this._memSave(rpl)
			else return rpl;
		}
	}
	return '';
}

ElizaBot.prototype._postTransform = function(s) {
	// final cleanings
	s=s.replace(/\s{2,}/g, ' ');
	s=s.replace(/\s+\./g, '.');
	if ((this.global.elizaPostTransforms) && (elizaPostTransforms.length)) {
		for (var i=0; i<elizaPostTransforms.length; i+=2) {
			s=s.replace(elizaPostTransforms[i], elizaPostTransforms[i+1]);
			elizaPostTransforms[i].lastIndex=0;
		}
	}
	// capitalize first char (v.1.1: work around lambda function)
	if (this.capitalizeFirstLetter) {
		var re=/^([a-z])/;
		var m=re.exec(s);
		if (m) s=m[0].toUpperCase()+s.substring(1);
	}
	return s;
}

ElizaBot.prototype._getRuleIndexByKey = function(key) {
	for (var k=0; k<elizaKeywords.length; k++) {
		if (elizaKeywords[k][0]==key) return k;
	}
	return -1;
}

ElizaBot.prototype._memSave = function(t) {
	this.mem.push(t);
	if (this.mem.length>this.memSize) this.mem.shift();
}

ElizaBot.prototype._memGet = function() {
	if (this.mem.length) {
		if (this.noRandom) return this.mem.shift();
		else {
			var n=Math.floor(Math.random()*this.mem.length);
			var rpl=this.mem[n];
			for (var i=n+1; i<this.mem.length; i++) this.mem[i-1]=this.mem[i];
			this.mem.length--;
			return rpl;
		}
	}
	else return '';
}

ElizaBot.prototype.getFinal = function() {
	if (!ElizaBot.prototype.global.elizaFinals) return '';
	return elizaFinals[Math.floor(Math.random()*elizaFinals.length)];
}

ElizaBot.prototype.getInitial = function() {
	if (!ElizaBot.prototype.global.elizaInitials) return '';
	return elizaInitials[Math.floor(Math.random()*elizaInitials.length)];
}


// fix array.prototype methods (push, shift) if not implemented (MSIE fix)
if (typeof Array.prototype.push == 'undefined') {
	Array.prototype.push=function(v) { return this[this.length]=v; };
}
if (typeof Array.prototype.shift == 'undefined') {
	Array.prototype.shift=function() {
		if (this.length==0) return null;
		var e0=this[0];
		for (var i=1; i<this.length; i++) this[i-1]=this[i];
		this.length--;
		return e0;
	};
}
// eof
// data for elizabot.js
// entries prestructured as layed out in Weizenbaum's description 
// [cf: Communications of the ACM, Vol. 9, #1 (January 1966): p 36-45.]
var ElizaData=new Object();
ElizaData.elizaInitials = [
"How do you do.  Please tell me your problem.",
// additions (not original)
"Please tell me what's been bothering you.",
"Is something troubling you?"
];

ElizaData.elizaFinals = [
"Goodbye.  It was nice talking to you.",
// additions (not original)
"Goodbye.  This was really a nice talk.",
"Goodbye.  I'm looking forward to our next session.",
"This was a good session, wasn't it -- but time is over now.   Goodbye.",
"Maybe we could discuss this moreover in our next session?   Goodbye."
];

ElizaData.elizaQuits = [
"bye",
"goodbye",
"done",
"exit",
"quit"
];

ElizaData.elizaPres = [
"dont", "don't",
"cant", "can't",
"wont", "won't",
"recollect", "remember",
"recall", "remember",
"dreamt", "dreamed",
"dreams", "dream",
"maybe", "perhaps",
"certainly", "yes",
"machine", "computer",
"machines", "computer",
"computers", "computer",
"were", "was",
"you're", "you are",
"i'm", "i am",
"same", "alike",
"identical", "alike",
"equivalent", "alike"
];

ElizaData.elizaPosts = [
"am", "are",
"your", "my",
"me", "you",
"myself", "yourself",
"yourself", "myself",
"i", "you",
"you", "I",
"my", "your",
"i'm", "you are"
];

ElizaData.elizaSynons = {
"be": ["am", "is", "are", "was"],
"belief": ["feel", "think", "believe", "wish"],
"cannot": ["can't"],
"desire": ["want", "need"],
"everyone": ["everybody", "nobody", "noone"],
"family": ["mother", "mom", "father", "dad", "sister", "brother", "wife", "children", "child"],
"happy": ["elated", "glad", "better"],
"sad": ["unhappy", "depressed", "sick"]
};

ElizaData.elizaKeywords = [

/*
  Array of
  ["<key>", <rank>, [
    ["<decomp>", [
      "<reasmb>",
      "<reasmb>",
      "<reasmb>"
    ]],
    ["<decomp>", [
      "<reasmb>",
      "<reasmb>",
      "<reasmb>"
    ]]
  ]]
*/

["xnone", 0, [
 ["*", [
     "I'm not sure I understand you fully.",
     "Please go on.",
     "What does that suggest to you?",
     "Do you feel strongly about discussing such things?",
     "That is interesting.  Please continue.",
     "Tell me more about that.",
     "Does talking about this bother you?"
  ]]
]],
["sorry", 0, [
 ["*", [
     "Please don't apologise.",
     "Apologies are not necessary.",
     "I've told you that apologies are not required.",
     "It did not bother me.  Please continue."
  ]]
]],
["apologise", 0, [
 ["*", [
     "goto sorry"
  ]]
]],
["remember", 5, [
 ["* i remember *", [
     "Do you often think of (2)?",
     "Does thinking of (2) bring anything else to mind?",
     "What else do you recollect?",
     "Why do you remember (2) just now?",
     "What in the present situation reminds you of (2)?",
     "What is the connection between me and (2)?",
     "What else does (2) remind you of?"
  ]],
 ["* do you remember *", [
     "Did you think I would forget (2)?",
     "Why do you think I should recall (2) now?",
     "What about (2)?",
     "goto what",
     "You mentioned (2)?"
  ]],
 ["* you remember *", [
     "How could I forget (2)?",
     "What about (2) should I remember?",
     "goto you"
  ]]
]],
["forget", 5, [
 ["* i forget *", [
     "Can you think of why you might forget (2)?",
     "Why can't you remember (2)?",
     "How often do you think of (2)?",
     "Does it bother you to forget that?",
     "Could it be a mental block?",
     "Are you generally forgetful?",
     "Do you think you are suppressing (2)?"
  ]],
 ["* did you forget *", [
     "Why do you ask?",
     "Are you sure you told me?",
     "Would it bother you if I forgot (2)?",
     "Why should I recall (2) just now?",
     "goto what",
     "Tell me more about (2)."
  ]]
]],
["if", 3, [
 ["* if *", [
     "Do you think it's likely that (2)?",
     "Do you wish that (2)?",
     "What do you know about (2)?",
     "Really, if (2)?",
     "What would you do if (2)?",
     "But what are the chances that (2)?",
     "What does this speculation lead to?"
  ]]
]],
["dreamed", 4, [
 ["* i dreamed *", [
     "Really, (2)?",
     "Have you ever fantasized (2) while you were awake?",
     "Have you ever dreamed (2) before?",
     "goto dream"
  ]]
]],
["dream", 3, [
 ["*", [
     "What does that dream suggest to you?",
     "Do you dream often?",
     "What persons appear in your dreams?",
     "Do you believe that dreams have something to do with your problem?"
  ]]
]],
["perhaps", 0, [
 ["*", [
     "You don't seem quite certain.",
     "Why the uncertain tone?",
     "Can't you be more positive?",
     "You aren't sure?",
     "Don't you know?",
     "How likely, would you estimate?"
  ]]
]],
["name", 15, [
 ["*", [
     "I am not interested in names.",
     "I've told you before, I don't care about names -- please continue."
  ]]
]],
["deutsch", 0, [
 ["*", [
     "goto xforeign",
     "I told you before, I don't understand German."
  ]]
]],
["francais", 0, [
 ["*", [
     "goto xforeign",
     "I told you before, I don't understand French."
  ]]
]],
["italiano", 0, [
 ["*", [
     "goto xforeign",
     "I told you before, I don't understand Italian."
  ]]
]],
["espanol", 0, [
 ["*", [
     "goto xforeign",
     "I told you before, I don't understand Spanish."
  ]]
]],
["xforeign", 0, [
 ["*", [
     "I speak only English."
  ]]
]],
["hello", 0, [
 ["*", [
     "How do you do.  Please state your problem.",
     "Hi.  What seems to be your problem?"
  ]]
]],
["computer", 50, [
 ["*", [
     "Do computers worry you?",
     "Why do you mention computers?",
     "What do you think machines have to do with your problem?",
     "Don't you think computers can help people?",
     "What about machines worries you?",
     "What do you think about machines?",
     "You don't think I am a computer program, do you?"
  ]]
]],
["am", 0, [
 ["* am i *", [
     "Do you believe you are (2)?",
     "Would you want to be (2)?",
     "Do you wish I would tell you you are (2)?",
     "What would it mean if you were (2)?",
     "goto what"
  ]],
 ["* i am *", [
     "goto i"
  ]],
 ["*", [
     "Why do you say 'am'?",
     "I don't understand that."
  ]]
]],
["are", 0, [
 ["* are you *", [
     "Why are you interested in whether I am (2) or not?",
     "Would you prefer if I weren't (2)?",
     "Perhaps I am (2) in your fantasies.",
     "Do you sometimes think I am (2)?",
     "goto what",
     "Would it matter to you?",
     "What if I were (2)?"
  ]],
 ["* you are *", [
     "goto you"
  ]],
 ["* are *", [
     "Did you think they might not be (2)?",
     "Would you like it if they were not (2)?",
     "What if they were not (2)?",
     "Are they always (2)?",
     "Possibly they are (2).",
     "Are you positive they are (2)?"
  ]]
]],
["your", 0, [
 ["* your *", [
     "Why are you concerned over my (2)?",
     "What about your own (2)?",
     "Are you worried about someone else's (2)?",
     "Really, my (2)?",
     "What makes you think of my (2)?",
     "Do you want my (2)?"
  ]]
]],
["was", 2, [
 ["* was i *", [
     "What if you were (2)?",
     "Do you think you were (2)?",
     "Were you (2)?",
     "What would it mean if you were (2)?",
     "What does ' (2) ' suggest to you?",
     "goto what"
  ]],
 ["* i was *", [
     "Were you really?",
     "Why do you tell me you were (2) now?",
     "Perhaps I already know you were (2)."
  ]],
 ["* was you *", [
     "Would you like to believe I was (2)?",
     "What suggests that I was (2)?",
     "What do you think?",
     "Perhaps I was (2).",
     "What if I had been (2)?"
  ]]
]],
["i", 0, [
 ["* i @desire *", [
     "What would it mean to you if you got (3)?",
     "Why do you want (3)?",
     "Suppose you got (3) soon.",
     "What if you never got (3)?",
     "What would getting (3) mean to you?",
     "What does wanting (3) have to do with this discussion?"
  ]],
 ["* i am* @sad *", [
     "I am sorry to hear that you are (3).",
     "Do you think coming here will help you not to be (3)?",
     "I'm sure it's not pleasant to be (3).",
     "Can you explain what made you (3)?"
  ]],
 ["* i am* @happy *", [
     "How have I helped you to be (3)?",
     "Has your treatment made you (3)?",
     "What makes you (3) just now?",
     "Can you explain why you are suddenly (3)?"
  ]],
 ["* i was *", [
     "goto was"
  ]],
 ["* i @belief i *", [
     "Do you really think so?",
     "But you are not sure you (3).",
     "Do you really doubt you (3)?"
  ]],
 ["* i* @belief *you *", [
     "goto you"
  ]],
 ["* i am *", [
     "Is it because you are (2) that you came to me?",
     "How long have you been (2)?",
     "Do you believe it is normal to be (2)?",
     "Do you enjoy being (2)?",
     "Do you know anyone else who is (2)?"
  ]],
 ["* i @cannot *", [
     "How do you know that you can't (3)?",
     "Have you tried?",
     "Perhaps you could (3) now.",
     "Do you really want to be able to (3)?",
     "What if you could (3)?"
  ]],
 ["* i don't *", [
     "Don't you really (2)?",
     "Why don't you (2)?",
     "Do you wish to be able to (2)?",
     "Does that trouble you?"
  ]],
 ["* i feel *", [
     "Tell me more about such feelings.",
     "Do you often feel (2)?",
     "Do you enjoy feeling (2)?",
     "Of what does feeling (2) remind you?"
  ]],
 ["* i * you *", [
     "Perhaps in your fantasies we (2) each other.",
     "Do you wish to (2) me?",
     "You seem to need to (2) me.",
     "Do you (2) anyone else?"
  ]],
 ["*", [
     "You say (1)?",
     "Can you elaborate on that?",
     "Do you say (1) for some special reason?",
     "That's quite interesting."
  ]]
]],
["you", 0, [
 ["* you remind me of *", [
     "goto alike"
  ]],
 ["* you are *", [
     "What makes you think I am (2)?",
     "Does it please you to believe I am (2)?",
     "Do you sometimes wish you were (2)?",
     "Perhaps you would like to be (2)."
  ]],
 ["* you* me *", [
     "Why do you think I (2) you?",
     "You like to think I (2) you -- don't you?",
     "What makes you think I (2) you?",
     "Really, I (2) you?",
     "Do you wish to believe I (2) you?",
     "Suppose I did (2) you -- what would that mean?",
     "Does someone else believe I (2) you?"
  ]],
 ["* you *", [
     "We were discussing you -- not me.",
     "Oh, I (2)?",
     "You're not really talking about me -- are you?",
     "What are your feelings now?"
  ]]
]],
["yes", 0, [
 ["*", [
     "You seem to be quite positive.",
     "You are sure.",
     "I see.",
     "I understand."
  ]]
]],
["no", 0, [
 ["* no one *", [
     "Are you sure, no one (2)?",
     "Surely someone (2) .",
     "Can you think of anyone at all?",
     "Are you thinking of a very special person?",
     "Who, may I ask?",
     "You have a particular person in mind, don't you?",
     "Who do you think you are talking about?"
  ]],
 ["*", [
     "Are you saying no just to be negative?",
     "You are being a bit negative.",
     "Why not?",
     "Why 'no'?"
  ]]
]],
["my", 2, [
 ["$ * my *", [
     "Does that have anything to do with the fact that your (2)?",
     "Lets discuss further why your (2).",
     "Earlier you said your (2).",
     "But your (2)."
  ]],
 ["* my* @family *", [
     "Tell me more about your family.",
     "Who else in your family (4)?",
     "Your (3)?",
     "What else comes to your mind when you think of your (3)?"
  ]],
 ["* my *", [
     "Your (2)?",
     "Why do you say your (2)?",
     "Does that suggest anything else which belongs to you?",
     "Is it important to you that your (2)?"
  ]]
]],
["can", 0, [
 ["* can you *", [
     "You believe I can (2) don't you?",
     "goto what",
     "You want me to be able to (2).",
     "Perhaps you would like to be able to (2) yourself."
  ]],
 ["* can i *", [
     "Whether or not you can (2) depends on you more than on me.",
     "Do you want to be able to (2)?",
     "Perhaps you don't want to (2).",
     "goto what"
  ]]
]],
["what", 0, [
 ["*", [
     "Why do you ask?",
     "Does that question interest you?",
     "What is it you really want to know?",
     "Are such questions much on your mind?",
     "What answer would please you most?",
     "What do you think?",
     "What comes to mind when you ask that?",
     "Have you asked such questions before?",
     "Have you asked anyone else?"
  ]]
]],
["who", 0, [
 ["who *", [
     "goto what"
  ]]
]],
["when", 0, [
 ["when *", [
     "goto what"
  ]]
]],
["where", 0, [
 ["where *", [
     "goto what"
  ]]
]],
["how", 0, [
 ["how *", [
     "goto what"
  ]]
]],
["because", 0, [
 ["*", [
     "Is that the real reason?",
     "Don't any other reasons come to mind?",
     "Does that reason seem to explain anything else?",
     "What other reasons might there be?"
  ]]
]],
["why", 0, [
 ["* why don't you *", [
     "Do you believe I don't (2)?",
     "Perhaps I will (2) in good time.",
     "Should you (2) yourself?",
     "You want me to (2)?",
     "goto what"
  ]],
 ["* why can't i *", [
     "Do you think you should be able to (2)?",
     "Do you want to be able to (2)?",
     "Do you believe this will help you to (2)?",
     "Have you any idea why you can't (2)?",
     "goto what"
  ]],
 ["*", [
     "goto what"
  ]]
]],
["everyone", 2, [
 ["* @everyone *", [
     "Really, (2)?",
     "Surely not (2).",
     "Can you think of anyone in particular?",
     "Who, for example?",
     "Are you thinking of a very special person?",
     "Who, may I ask?",
     "Someone special perhaps?",
     "You have a particular person in mind, don't you?",
     "Who do you think you're talking about?"
  ]]
]],
["everybody", 2, [
 ["*", [
     "goto everyone"
  ]]
]],
["nobody", 2, [
 ["*", [
     "goto everyone"
  ]]
]],
["noone", 2, [
 ["*", [
     "goto everyone"
  ]]
]],
["always", 1, [
 ["*", [
     "Can you think of a specific example?",
     "When?",
     "What incident are you thinking of?",
     "Really, always?"
  ]]
]],
["alike", 10, [
 ["*", [
     "In what way?",
     "What resemblence do you see?",
     "What does that similarity suggest to you?",
     "What other connections do you see?",
     "What do you suppose that resemblence means?",
     "What is the connection, do you suppose?",
     "Could there really be some connection?",
     "How?"
  ]]
]],
["like", 10, [
 ["* @be *like *", [
     "goto alike"
  ]]
]],
["different", 0, [
 ["*", [
     "How is it different?",
     "What differences do you see?",
     "What does that difference suggest to you?",
     "What other distinctions do you see?",
     "What do you suppose that disparity means?",
     "Could there be some connection, do you suppose?",
     "How?"
  ]]
]]

];

// regexp/replacement pairs to be performed as final cleanings
// here: cleanings for multiple bots talking to each other
ElizaData.elizaPostTransforms = [
	/ old old/g, " old",
	/\bthey were( not)? me\b/g, "it was$1 me",
	/\bthey are( not)? me\b/g, "it is$1 me",
	/Are they( always)? me\b/, "it is$1 me",
	/\bthat your( own)? (\w+)( now)? \?/, "that you have your$1 $2?",
	/\bI to have (\w+)/, "I have $1",
	/Earlier you said your( own)? (\w+)( now)?\./, "Earlier you talked about your $2."
];

// eof

function processChatQuery(q){
    var time=q.cells[0].innerHTML;
    var rundiv=q.cells[1].getElementsByClassName('run_by');
    var source;
    if (rundiv.length==1)
	source=rundiv[0].innerHTML.match(/^run by (.*):$/)[1];
    else
	source=myrows[0].owner;
    var parts=q.cells[1].lastChild.textContent.match(/^CHAT(?: to )?(.*?): (.*)$/);
    var destination=parts[1];
    if (destination=="") destination=myrows[0].owner;
    var message=parts[2];
    log(time+"\nMessage for "+destination+" from "+source+":\n"+message);
    if (destination!=myrows[0].owner) return;//not for us
    if (!botsArray[source]){
	botsArray[source]=new ElizaBot();
	botsArray[source].getInitial();
    }
    bot=botsArray[source];
    var reply=bot.transform(message);
    //log("Reply to "+source+":\n"+reply);
    queueChat(source,reply);
    if (bot.quit){
	botsArray[source]=null;
    }
}

//function queueChat(destination,message){
//    var order=new Object();
//    order.type="chat";
//    order.destination=destination;
//    order.message=message;
//   var pauseLength=10000+Math.floor(Math.random()*5000)+Math.floor(order.message.length/10)*1000;
//    order.sendtime=(new Date()).getTime()+pauseLength;//to protect us against DOS attacks
//   var messageQueued=false;
//    for (var i=0;i<ordersQueue.length;i++)
//	if (ordersQueue[i].type=="chat"&&ordersQueue[i].destination==order.destination){
//	    messageQueued=true;
//	    ordersQueue[i]=order;
//	}
//    if (!messageQueued){
//	ordersQueue.push(order);
//    }
//}

function sendChat(o){
    status("Messaging "+o.destination);
    document.getElementsByName('chat_to')[0].value=o.destination;
    document.getElementsByName('chat_text')[0].value=o.message;
    var button=document.getElementsByName('chat_to')[0].parentNode.nextSibling.nextSibling.firstChild;
    if (!(button.name=="submit"&&button.nextSibling.value=="Chat"&&button.nextSibling.name=="query")){
	log("Danger, layout changed, can't find chat button");
	return;
    }
    button.click();
}
