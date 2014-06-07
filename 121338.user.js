// ==UserScript==
// @name       Fleet strength calculator by Kazz
// @namespace  http://oooo.tak.nie/
// @version    1.2
// @description  fleet strength calculator for OGAME (ships: PL / EN)
// @include    http://*.ogame.*/game/index.php?page=fleet1*
// @include    http://*.ogame.*/game/index.php?page=research*
// @copyright  2011+, Kazz
// ==/UserScript==
function fleetcalc()
{

var win = ((typeof unsafeWindow) != "undefined") ? unsafeWindow : window;    
    
var statki = new Array();
statki[0] = new Array(0,"LM / LF",50,5,204);
statki[1] = new Array(1,"CM / HF",150,15,205);
statki[2] = new Array(2,"KR / CR",400,40,206);
statki[3] = new Array(3,"OW / BS",1000,100,207);
statki[4] = new Array(4,"PANC / BC",700,70,215);
statki[5] = new Array(5,"BOMB.",1000,100,211);
statki[6] = new Array(6,"NISZ./DEST.",2000,200,213);
statki[7] = new Array(7,"MT / SC",5,0.5,202);                      
statki[8] = new Array(8,"DT / LC",5,0.5,203);
statki[9] = new Array(9,"SK / CS",50,5,208);
statki[10] = new Array(10,"REC.",1,0.1,209);
//statki[11] = new Array(11,"ss",0.01,0.001,210);
//statki[12] = new Array(12,"sol",1,0.1,0);
//statki[13] = new Array(13,"gs",200000,20000,214);


function countAttackAll()
{
     var tech = document.getElementById('attacktech').value;
     if(isNaN(tech)) tech = 0;
     var sumaataku = 0;
     var statkiall = statki;
     for(x in statkiall)   
     { 
       var ile = document.getElementById('statek'+statkiall[x][4]).value;
       if(isNaN(ile)) ile = 0;
       var atak = statkiall[x][2];
       var dodatek = statkiall[x][3]*tech;
       var atak_statku = ile*(atak+dodatek);
       sumaataku += atak_statku;
     }
    document.getElementById('isumattack').innerHTML = sumaataku;
    return;
} 
    
function newTable()
{
    table = document.createElement("TABLE");
    return table;
}
function newTD(type,intext,tdname,twidth,tborder)
{
    if(type == 0)
    {
        td = document.createElement("TD");
    }else{
        td = document.createElement("TH");
    }
    td.id = tdname;
    td.name = tdname;
    td.innerHTML = intext; 
    td.width = twidth+'px';
    if(tborder == 1)
    {
        td.style.border='1px solid gray';
    }
    return td;
}

function newTR()
{
    tr = document.createElement("TR");
    return tr;
}

function newDiv(dname)
{
    div = document.createElement("DIV");
    div.id = dname;
    div.name = dname;
    return div;
}

function clearALLFSC()
{
    for(var x in statki)
    {
       ffield = document.getElementById('statek'+statki[x][4]);
       ffield.value = 0;
        
    }
    document.getElementById('isumattack').innerHTML='0';
}

function selALLFSC()
{
    for(x in statki)
    {
         if(statki[x][4] != 0)
        {
        button = document.getElementById('button'+statki[x][4]).getElementsByClassName('textlabel');
        ffield = document.getElementById('statek'+statki[x][4]);
        ffield.value = button[0].nextSibling.nodeValue;
        }   
    }
    countAttackAll();
}

function select_num_ship(statek,pos)
{
        if(statek.substring(0,5)=='ship_')
        {
            if(pos == 'clear')
            {
                document.getElementById('statek'+statek.substr(5,3)).value = 0;
            }else{
                if(document.getElementById('statek'+statek.substr(5,3)) != null)
                document.getElementById('statek'+statek.substr(5,3)).value = document.getElementById(statek).value;
            }
        }
}

var unsafe = win;
unsafe.old_clearInput = unsafe.clearInput;
unsafe.clearInput = function(id){ select_num_ship(id,'clear'); countAttackAll(); unsafe.old_clearInput(id); unsafe.checkShips('shipsChosen'); };
unsafe.old_checkIntInput = unsafe.checkIntInput;
unsafe.checkIntInput = function(id,num1,num2){ unsafe.old_checkIntInput(id, num1, num2); select_num_ship(id,'num'); countAttackAll();};
     

divt = document.getElementById('allornone').appendChild(newDiv('testowy_div'));
divt.style.width='627px';
divt.style.border='3px double black';
divt.style.backgroundColor='#13181D';
divt.style.paddingLeft = '3px';
divt.style.paddingRight = '3px';
tt = divt.appendChild(newTable());
tt.style.paddingLeft = '3px';
tt.style.paddingRight = '3px';
row1 = tt.appendChild(newTR());
row2 = tt.appendChild(newTR());
row3 = tt.appendChild(newTR());
row4 = tt.appendChild(newTR());
var i = 0;
for (x in statki)
{
    if(i < 7)
    {
      row1.appendChild(newTD(1,statki[x][1],statki[x][1]+'_th',50,1));
      row2.appendChild(newTD(2,'<input id="statek'+statki[x][4]+'" type="text" size=9 value=0 style="text-align:right;">',statki[x][1],50,1));
    }else{
      row3.appendChild(newTD(1,statki[x][1],statki[x][1]+'_th',50,1));
      row4.appendChild(newTD(2,'<input id="statek'+statki[x][4]+'" type="text" size=9 value=0 style="text-align:right;">',statki[x][1],50,1)); 
    }
        ffield = document.getElementById('statek'+statki[x][4]);
        ffield.onclick = function(){this.value='';countAttackAll()};
        ffield.onblur = function(){if(this.value=='') this.value=0; countAttackAll()};
        ffield.onkeyup = function(){countAttackAll()};
        if(statki[x][4] != 0)
        {
        button = document.getElementById('button'+statki[x][4]).getElementsByClassName('textlabel');
        ffield.value = button[0].nextSibling.nodeValue;
        }
  i++;
}
    row3.appendChild(newTD(1,'','nulltd1',50,0));
    row3.appendChild(newTD(1,'','nulltd2',50,0));
    rescol = row3.appendChild(newTD(1,'<div id="fleetboxselector"  style="padding-left: 10px;" ><span class="send_all"><a id="btselallfsc" class="tipsStandard" title="|Wybierz wszystkie statki"></a></span><span class="send_none"><a id="btclearfsc" class="tipsStandard" title="|Resetuj wybór"></a></span></div>','clearALLFSC',50,0));
document.getElementById("btclearfsc").onclick = function(){clearALLFSC()};
document.getElementById("btselallfsc").onclick = function(){selALLFSC()};
rescol.colSpan = "1";
rescol.rowSpan = "2";
document.getElementById("fleetboxselector").style.textAlign="right";

finalrow = tt.appendChild(newTR());
    var attackskilli = '';
    var match = /^http:\/\/(uni[0-9a-zA-Z]*).ogame/i.exec(location.href);
    var attackskill = (isNaN(GM_getValue(match[1]+'_attackFSC')) ? '':GM_getValue(match[1]+'_attackFSC'));
    if(attackskill == '') {attackskill = 0; attackskilli = '(Go to RESEARCH page for lvl) ';}
techfield = finalrow.appendChild(newTD(1,attackskilli+'Attack Tech. :<input id="attacktech" type="text" size=3 value='+attackskill+' style="text-align:right;" >','tech_attack',100,1));
//techfield.onclick = function(){attacktech.value=''};
techfield.onkeyup  = function(){countAttackAll()};
sumattack = finalrow.appendChild(newTD(1,'Calculated strength: <span id="isumattack" style="text-align:right;"> 0 </span>','sumattack',100,1));
techfield.colSpan="4";
techfield.style.textAlign="right";
sumattack.colSpan="3";
sumattack.style.textAlign="right";

countAttackAll();
};
function setattackskill()
{
 var match = /^http:\/\/(uni[0-9a-zA-Z]*).ogame/i.exec(location.href);
 var attackskill = document.getElementById("details109").getElementsByClassName('textlabel');
 GM_setValue(match[1]+'_attackFSC', attackskill[0].nextSibling.nodeValue);
};
if((location.href).match('fleet1')=='fleet1') fleetcalc();
if((location.href).match('research')=='research') setattackskill();
// END