// ==UserScript==
// @name auto-mission
// @namespace hk.orz
// @description by 真正john
// @include http://apps.facebook.com/street-fights/job.php
// @include http://apps.facebook.com/street-fights/bank.php
// Version 1.0
// ==/UserScript==


/*
Function:
- check strength and gold every loading and in 5 minutes. if you have strength, auto run the default job.
- if you have over $100 cash, auto throw them in the bank

Known problem:
- may stop at "Try again" error message when the game is busy at night
- does not work with Facebook new user interface

What you should know about the game:
- when you want to get cash from bank, disable greasemoney first, or your money will go back to the bank with 10% cut off.
- if you do not have enough strength, a job won't run
- if you do not have ALL the required equipment, a job won't run
- if you do not meet the level / buddy requirement, a job won't run
- you generate 5 health, 1 strength, and 1 mind every 5 minutes
- the hourly pay always take place at 0 minutes every hour, if your computer clock syn with the world clock
- if you use this script and got banned, don't blame us
*/

// Things you can change 只要改這邊選擇你要固定執行的任務就行了!!
//---------------------------------------------------------------------------------------------
//   工作代號    |  任務代碼   |     需要體力
//代客泊車       |jobid = '1'  | needstrength = '1'
//賣翻版DVD      |jobid = '2'  | needstrength = '3'
//幫財務公司收數 |jobid = '3'  | needstrength = '5'
//麻將館睇埸     |jobid = '4'  | needstrength = '7'
//走水貨返大陸   |jobid = '5'  | needstrength = '10'
//偷車           |jobid = '6'  | needstrength = '12'
//放貴利         |jobid = '7'  | needstrength = '14'
//打劫銀行       |jobid = '8'  | needstrength = '16'
//連環洗劫金鋪   |jobid = '9'  | needstrength = '20'
//綁架重要人物   |jobid = '10' | needstrength = '25'
//走私毒品       |jobid = '11' | needstrength = '30'
//經營外圍投注   |jobid = '12' | needstrength = '35'

const jobid = 12;   
const needstrength = 35; 
//---------------------------------------------------------------------------------------------

var last_check = new Date();
var check_time = (last_check.getMinutes() % 5)

// setup a count down box
var htmlElement = document.createElement('div');
htmlElement.id = 'neotimer';
htmlElement.style.font = "11px arial"
htmlElement.style.color = 'black';
htmlElement.style.Top = '3px';
htmlElement.style.Left = '2px';
htmlElement.style.position = 'absolute';
htmlElement.style.width = '200px';
htmlElement.style.height = '42px';
htmlElement.style.paddingTop = '3px';
htmlElement.style.paddingLeft = '2px';
htmlElement.style.background = '#CCFFCC';
htmlElement.style.zIndex = 100;
window.parent.document.body.appendChild(htmlElement);

// start up check
window.setTimeout(function() { tick() }, 300);


function check_and_run() {
  // check strength
  health_tag = document.getElementById('app17326627347_main');
  if ( health_tag == null) return;
  str = (new RegExp('體力:[^d]+')).exec(health_tag.innerHTML);
  if (str == null) return null;
  
  health = parseInt(str.toString().split('>')[1].split('/')[0]); //2009/08/13
  if (health < needstrength) return health;
  action = document.getElementById('app17326627347_mod_action-' + jobid);
  if (action == null) return health;
  action_link = action.getElementsByTagName('a')[0];
  if (action_link == null) return health;

  // click
  GM_setValue('reload', 1);
  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  action_link.dispatchEvent(evt);
  return health;
}

function check_money() {
  // check money
  money_tag = document.getElementById('app17326627347_main');
  if ( money_tag == null) return;
  str = (new RegExp('現金:[^v]+')).exec(money_tag.innerHTML);
  if (str == null) return null;
  money = parseInt(str.toString().split('$')[1].split('<')[0].replace(/,/,""));
  if (money < 101) return money;
  if (location.href!='http://apps.facebook.com/street-fights/bank.php')
    location.href='http://apps.facebook.com/street-fights/bank.php';
  return money;	
 }


function tick() {
  current = new Date();
  seconds = (current - last_check) / 1000;
  health = check_and_run();
  money = check_money();

  // display 
  htmlElement.innerHTML = '義氣自動任務+存錢 v1.3<br /> modify by Tommy' 
  htmlElement.innerHTML += '<br />Time: ' + current.getHours()
  htmlElement.innerHTML += ':' + checkTime(current.getMinutes()) + ':' + checkTime(current.getSeconds());
  if (health != null)
    htmlElement.innerHTML += ' &nbsp; 體力: ' + health;
  if (money != null)
    htmlElement.innerHTML += ' &nbsp; 現金: ' + money;

  // reload on error
  if (document.getElementById('error_message') != null) {
    GM_setValue('reload', 0);
    location.href='http://apps.facebook.com/street-fights/job.php';
    return;
  }

  // reload if a job ran
  if (GM_getValue('reload') == 1) {
    GM_setValue('reload', 0);
    location.href='http://apps.facebook.com/street-fights/job.php';
    return;
  }  
  
  // reload every 10 minutes, so that hourly income will save to bank and reset the script from error
  if (((current.getMinutes() % 5) == check_time ) && (current.getSeconds()<=1)) {
    if (location.href!='http://apps.facebook.com/street-fights/bank.php') {
      GM_setValue('reload', 0);
      location.href='http://apps.facebook.com/street-fights/bank.php';
      return;
	}
  }


  // click the deposit button if there is money to save
  if (location.href=='http://apps.facebook.com/street-fights/bank.php')
    if (document.getElementsByName("amount").length > 1) {
      if (parseInt(document.getElementsByName("amount")[1].value) > 100) {
		document.getElementsByName("deposit")[0].click();
		return;
	  } else {
		GM_setValue('reload', 0);
		location.href='http://apps.facebook.com/street-fights/job.php';
		return;
      }	
	} else {
		GM_setValue('reload', 0);
		location.href='http://apps.facebook.com/street-fights/job.php';
		return;
    }
  
  
  // come back again every second, looks cool
  window.setTimeout(function() { tick()}, 1037);
}

function checkTime(i) {
  if (i<10) i="0" + i;
  return i;
}