// ==UserScript==
// @name           UR_autobuy
// @description    It's a minimal Urban-Rivals market bot. It adds buttons under the market page of a char that lets you set your preferences (Level range, max price, exp). It can be runned only with one perso.
// @namespace      http://userscripts.org/users/249211
// @include        http://www.urban-rivals.com/market/?*id_perso=*
// @versione       1.0
// ==/UserScript==

var Bot_on = 0;
var COSTO_MAX = 50;
var MIN_LVL = 0;
var MAX_LVL = 5;
var NO_EXP = 0;

if(GM_getValue("Bot_on"))
{
  Bot_on=1;
  GM_deleteValue("Bot_on");
}
else
{
  GM_deleteValue("COSTO_MAX");
  GM_deleteValue("MIN_LVL");
  GM_deleteValue("MAX_LVL");
  GM_deleteValue("NO_EXP");
}
//________________________________//
//                               //
//      FUNZIONI VARIE          //
//_____________________________//

function appendOption(elSel,num)
{
  var elOptNew = document.createElement('option');
  elOptNew.text = num + '';
  elOptNew.value = num + '';
  elSel.add(elOptNew, null);
}

function start_bot()
{
  location.replace(location.href);
  GM_setValue("Bot_on",1);
}

function set_botval()
{
  COSTO_MAX = GM_getValue("COSTO_MAX",50);
  MIN_LVL = GM_getValue("MIN_LVL",0);
  MAX_LVL = GM_getValue("MAX_LVL",5);
  NO_EXP = GM_getValue("NO_EXP",0);
}

function buy_valid()
{
  var array=document.evaluate("//div[contains(@id,'card')]",document,null,6,null);
  var array_cost=document.evaluate("//div[contains(@id,'card')]/span[@class='boldText']",document,null,6,null);
  var array_iNum=document.evaluate("//div[contains(@id,'card')]/i",document,null,6,null);
  var array_stars=document.evaluate("//div[contains(@id,'card')]/img[contains(@src,'http://s.ccdn.ur-img.com/img/v2/card/small/star_')]",document,null,6,null);
  var CARD_LVL=(array_stars.snapshotLength/(array.snapshotLength-1));
  if(MIN_LVL==0)MIN_LVL=1;
  if(MAX_LVL>CARD_LVL)MAX_LVL=CARD_LVL;
  if(MIN_LVL>CARD_LVL)MIN_LVL=CARD_LVL;
  if(MIN_LVL>MAX_LVL)MIN_LVL=MAX_LVL;
  var flag=0;
  for (i=0; i<array.snapshotLength && flag==0; i++)//array.snapshotLength
  {
    if(array_stars.snapshotItem(CARD_LVL*i+MIN_LVL-1).src=="http://s.ccdn.ur-img.com/img/v2/card/small/star_on.png" && (MAX_LVL==CARD_LVL || array_stars.snapshotItem(CARD_LVL*i+MAX_LVL).src=="http://s.ccdn.ur-img.com/img/v2/card/small/star_off.png") && (NO_EXP==0 || array.snapshotItem(i+1).textContent.search(" 0 xp")!=-1) && parseInt(array_cost.snapshotItem(i).textContent.replace(/ /g,""))<=COSTO_MAX)
    {
      unsafeWindow.buyCardForReal(array.snapshotItem(i+1).id.replace(/card/g,''));
    }
    if(parseInt(array_cost.snapshotItem(i).textContent.replace(/ /g,""))>COSTO_MAX)flag=1;
  }
}

//__________END FV_________//

//_______________________________________________________________//
//                                                              //
//////////////        GENERA PULSANTI          //////////////////
//____________________________________________________________//

main = document.evaluate('//div[contains(@class,"smallText")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

var table = document.createElement("div");
table.innerHTML += "  <hr>";

//////  Crea Pulsante  //////
//________________________//

var button = document.createElement("input");
button.type = "button";
if(Bot_on==1)button.value= "Stop BOT";
else button.value = "Start BOT";
button.id = "BT_START_BOT";
table.appendChild(button);

table.innerHTML += "  <br> Seleziona il livello minimo: ";

//////  Crea Select  //////
//______________________//

var elSelmin = document.createElement("select");
elSelmin.id = "SL_MIN_BOT"
table.appendChild(elSelmin);

appendOption(elSelmin,' - ');
for(i=1;i<=5;++i) appendOption(elSelmin,i);

table.innerHTML += " Seleziona il livello massimo: ";

var elSelmax = document.createElement("select");
elSelmax.id = "SL_MAX_BOT"
table.appendChild(elSelmax);

appendOption(elSelmax,' - ');
for(i=1;i<=5;++i) appendOption(elSelmax,i);

table.innerHTML += "  <br>";

//////  Crea Checkbox  //////
//________________________//

var checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.id = "CB_EXP_BOT"
checkbox.value = "1";
checkbox.checked="";
table.appendChild(checkbox);

table.innerHTML += " 0 xp <br> Prezzo Massimo: ";

//////  Crea Textbox  //////
//_______________________//

var text = document.createElement("input");
text.type = "text";
text.id = "TX_PRZ_BOT";
if(Bot_on==1)text.value=GM_getValue("COSTO_MAX");
else text.value = "";
if(text.value=="undefined")text.value = "";
table.appendChild(text);

//____________________//

main.appendChild(table);


bot_bt = document.getElementById("BT_START_BOT");
if(Bot_on==1)
{
  bot_bt.addEventListener("click",function()
  {
    Bot_on=0;
    GM_deleteValue("Bot_on");
    bot_bt.value="Start BOT";
    bot_bt.addEventListener("click",start_bot,true);
  },true);
}
else bot_bt.addEventListener("click",start_bot,true);
bot_tx = document.getElementById("TX_PRZ_BOT");
bot_tx.addEventListener("change",function(){GM_setValue("COSTO_MAX",parseInt(bot_tx.value.match(/\d+\.?\d*/g)))},true);
bot_sln = document.getElementById("SL_MIN_BOT");
if(Bot_on==1)bot_sln.value=GM_getValue("MIN_LVL");
bot_sln.addEventListener("change",function(){GM_setValue("MIN_LVL",parseInt(bot_sln.value.match(/\d+\.?\d*/g)))},true);
bot_slx = document.getElementById("SL_MAX_BOT");
if(Bot_on==1)bot_slx.value=GM_getValue("MAX_LVL");
bot_slx.addEventListener("change",function(){GM_setValue("MAX_LVL",parseInt(bot_slx.value.match(/\d+\.?\d*/g)))},true);
bot_cb = document.getElementById("CB_EXP_BOT");
val=0;
if(Bot_on==1)val=GM_getValue("NO_EXP",0);
bot_cb.defaultChecked=val;
bot_cb.addEventListener("change",function(){val=!val;GM_setValue("NO_EXP",val)},true);

if(Bot_on==1)window.setTimeout(function(){
  if(Bot_on==1)
  {
    set_botval();
    buy_valid();
    start_bot();
  }
},5000);