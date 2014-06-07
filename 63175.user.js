scr_meta=<><![CDATA[ 

// ==UserScript==

// @name           Mafia Wars auto goal helper (Money, Experience, Mastery)

// @namespace      http://userscripts.org/users/117199

// @include        http://mwfb.zynga.com/mwfb/*

// @description    This greasemonkey script allows you to leave Mafia Wars alone and ensures you accumulate money while you are away

// @version        0.6.5.5

// @author         Gareth Lloyd

// @homepage       http://ignition-web.co.uk/

// @date           2009-12-09 10:21

// @licence        GPLv3

// ==/UserScript==

]]></>.toString(); 



var target_goal;



var dojo;



var jobs_btn;

var current_job0_level;



var best_job0_level;

var best_job;

var energy_needed;

var best;



var job_init_state = 0;

var job0_level_pos;

var processing_state;

var next_round = false;

function forcenext(){
  next_round = true;
  return false;
}



function fire_click(obj){

	evObj = document.createEvent('MouseEvents');

	evObj.initMouseEvent( 'click', false, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

	obj.dispatchEvent(evObj);

};



function find_best_job(){

	var jobs = dojo.query('table.job_list tr:not(.header)');

	var tmp;

	for (tmp=0; tmp<jobs.length; tmp++) {

		var job = jobs[tmp];

		

		if (dojo.query('td', job).length == 0) {

			continue;//empty row, doesn't need processing

		}

		

		var job_favorability; 

	

		var num_only_regex = /[^\d]/g;

		var extract_percent_regex = /.*?(\d).*?(\d*)%/;

		

		var need_items = dojo.query('.need_item', job).length > 0;

		var energy = dojo.query('.job_energy .bold_number', job)[0].innerHTML.replace(num_only_regex, '');

		var reward_exp = dojo.query('.job_reward .bold_number', job)[0].innerHTML.replace(num_only_regex, '');

		var reward_money = dojo.query('.job_reward .money strong', job);

		if (reward_money.length == 0) {

			reward_money = 0;//additional support jobs (Enforcer)...need to find out more, may need to modify

		} else {

			reward_money = reward_money[0].innerHTML.replace(num_only_regex, '');

		}

	    var mastery = extract_percent_regex(dojo.query('.job_name span', job)[0].textContent);

		if (mastery == null){

		  mastery = 100;
      mastery_level = 3;

		} else {
      mastery_level = mastery[1];

		  mastery = mastery[2];

		}

    
    current_job_level = dojo.query("#inner_page .tab_on span")[0].innerHTML;

    var job_importance;
    switch(current_job_level){
      case "(lvls 1 - 4)":
        job_importance = 1280;
        break;
      case "(lvls 5 - 8)":
        job_importance = 640;
        break;
      case "(lvls 9 - 12)":
        job_importance = 320;
        break;
      case "(lvls 13 - 17)":
        job_importance = 160;
        break;
      case "(lvls 18 - 24)":
        job_importance = 80;
        break;
      case "(lvls 25 - 34)":
        job_importance = 40;
        break;
      case "(lvls 35 - 59)":
        job_importance = 20;
        break;
      default:
        job_importance = 10;
        break;
    }

	

		switch (target_goal){

			case 0:

				job_favorability = ((reward_money / energy)+1) * (need_items == false);

				break;

			case 1:

				job_favorability = ((reward_exp / energy)+1) * (need_items == false);

				break;

			case 2:

				job_favorability = ((((100 - mastery) * mastery_level * job_importance * 1000) / (energy))+1)  * (need_items == false);

				break;

			default:

				alert("error - no such taget goal");

		}



		if (best == null || job_favorability > best){

		

			var extract_name_regex = /[^<]*/;

			var jobname = extract_name_regex(dojo.query('.job_name', job)[0].innerHTML);

		

			dojo.byId("wmhelperbest").innerHTML = jobname;

			

			dojo.byId("wmhelperenergy").innerHTML = energy;

			dojo.byId("wmhelpermoney").innerHTML = "$"+reward_money;

			dojo.byId("wmhelperexp").innerHTML = reward_exp+"xp";

			dojo.byId("wmhelpermastery").innerHTML = mastery+"%";

			

			best_job0_level = current_job0_level;

			best_job = job;

            energy_needed = energy;

			best = job_favorability;

		}

	}

};



function do_job(){

  var output = false;

	best = null;

	find_best_job();

  if ( parseInt(energy_needed) <= parseInt(dojo.query('#user_energy')[0].innerHTML) ) {

    do_job_btn = dojo.query('.job_action .sexy_button a',best_job)[0];

    fire_click(do_job_btn);

    output = true;

  }

  return output;

};



function job_init(){

  var timedelay;

	switch(job_init_state){

		case 0: // get jobs_btn and go there

			dojo.byId("wmhelperstatus").innerHTML = "Initializing";

			dojo.byId("wmhelperbest").innerHTML = "";

			dojo.byId("wmhelperenergy").innerHTML = "";

			dojo.byId("wmhelpermoney").innerHTML = "";

			dojo.byId("wmhelperexp").innerHTML = "";

			dojo.byId("wmhelpermastery").innerHTML = "";

						

			radio_goals = dojo.query("form")[0].goal;

			var i;

			for( i = 0; i < radio_goals.length; i++ ){

				if( radio_goals[i].checked == true )

					val = radio_goals[i].value;

			}

			target_goal = parseInt(val); //money(0), experience(1), mastery(2)

			switch(target_goal){

				case 0:

					dojo.byId("wmhelpergoal").innerHTML = "Money";

					break;

				case 1:

					dojo.byId("wmhelpergoal").innerHTML = "Experience";

					break;

				case 2:

					dojo.byId("wmhelpergoal").innerHTML = "Mastery";

					break;

			}

			energy_needed = 100000;

			best = null;

			processing_state = 0;

			jobs_btn = dojo.query('#game_nav .jobs_link a')[0];

			fire_click(jobs_btn);

			job_init_state = 1;

			timedelay = 5000 + Math.floor(Math.random()*5000);

			break;

		case 1: // get job0_levels_btns

			job0_levels_btns = dojo.query('#jobs_bar0 li.tab_first a, ul > li.tab_off:not(.tab_last):not(.tab_first) a, ul > li.tab_on a');

			job0_level_pos = 0;

			job_init_state = 2;

			timedelay = 0;

		case 2: // itterate over the job0_levels to see what has the best job 

			dojo.byId("wmhelperstatus").innerHTML = "Finding best job";
      if (next_round == true){
        next_round = false;
        job_init_state = 0;
      }

			if (job0_level_pos < job0_levels_btns.length){

				current_job0_level = job0_levels_btns[job0_level_pos];

				if (processing_state == 0) {

					fire_click(current_job0_level);

					processing_state = 1;

					timedelay = 5000 + Math.floor(Math.random()*5000);

				} else {

					find_best_job();

					processing_state = 0;

					job0_level_pos++;

					timedelay = 1;

				}

			} else {

				dojo.byId("wmhelperstatus").innerHTML = "Best job found";

				//goto best jobs page

				current_job0_level = best_job0_level;

				fire_click(current_job0_level);

				job_init_state = 3;

				timedelay = 5000 + Math.floor(Math.random()*5000);

			}

			break;

		case 3:

			//fire off the job executions

			dojo.byId("wmhelperstatus").innerHTML = "Waiting for energy";

			  var done_job = do_job();

			  if (done_job) {

			  		dojo.byId("wmhelperstatus").innerHTML = "Done job";

					  job_init_state = 4;

			  }
        if (next_round == true){
          next_round = false;
          job_init_state = 0;
        }

			  timedelay = 5000 + Math.floor(Math.random()*5000);

			break;
    case 4:
	    dojo.byId("wmhelperstatus").innerHTML = "Going to property";

      properties_btn = dojo.query("#nav_link_properties a")[0];

      fire_click(properties_btn);

      job_init_state = 5;

      timedelay = 5000 + Math.floor(Math.random()*5000);

      break;
    case 5:
      if (dojo.query("#inner_page .messages .sexy_button").length == 1){
	      dojo.byId("wmhelperstatus").innerHTML = "Collecting property money";
        collect_btn = dojo.query("#inner_page .messages .sexy_button")[0];

        fire_click(collect_btn);

        timedelay = 5000 + Math.floor(Math.random()*5000);
      } else {
        timedelay = 1;
      }
      job_init_state = 6;

      break;

    case 6:

	    dojo.byId("wmhelperstatus").innerHTML = "Going to NY bank";

      nyc_bank = dojo.query('#cash_stats_nyc a.bank_deposit')[0];

      fire_click(nyc_bank);

      job_init_state = 7;

      timedelay = 5000 + Math.floor(Math.random()*5000);

      break;

    case 7:

		  dojo.byId("wmhelperstatus").innerHTML = "Deposit all money";

      deposit = dojo.query('#bank_deposit input.sexy_cash')[0];

      fire_click(deposit);

      job_init_state = 0;

      timedelay = 5000 + Math.floor(Math.random()*5000);

      break;
    case 8:
      //Broken
      dojo.byId("wmhelperstatus").innerHTML = "Going to Home";
      home_btn = dojo.query("#nav_link_home_unlock a")[0];
      fire_click(home_btn);
      job_init_state = 9;
      timedelay = 5000 + Math.floor(Math.random()*5000);

      break;
    case 9:
      dojo.byId("wmhelperstatus").innerHTML = "Sending energy to mafia";
      send_energy = dojo.query("#inner_page .tab_box_header .send_all_box a")[0];
      fire_click(send_energy);
      job_init_state = 10;
      timedelay = 5000 + Math.floor(Math.random()*5000);

      break;
    case 10:
      send_energy2 = dojo.query("#energy_all_prompt_wgt a")[1];
      fire_click(send_energy2);
      job_init_state = 0;
      timedelay = 10000 + Math.floor(Math.random()*5000);

      break;


		default:

			alert("error");

	}

  window.setTimeout(job_init,timedelay);

};





// Load dojo

var script = document.createElement('script');

script.src='http://o.aolcdn.com/dojo/1.0.0/dojo/dojo.xd.js';

script.type = 'text/javascript';

document.getElementsByTagName('head')[0].appendChild(script);

window.addEventListener('load', function(event) {

  dojo = unsafeWindow["dojo"];

  

  goalselector = "<div style=\"color:#fff\">Current Goal: <span style=\"color:#0d0\" id=\"wmhelpergoal\">Money</span><br /> " +

				 "<span style=\"float:left;\">Current Best Found: <span style=\"color:#0d0\" id=\"wmhelperbest\"></span></span>" +

				 "<div style=\"float:left;padding:3px;margin:0 3px;border:1px solid #fff\">Energy required: <span style=\"color:#0d0\" id=\"wmhelperenergy\"></span><br /> " +

				 "Money earned: <span style=\"color:#0d0\" id=\"wmhelpermoney\"></span><br /> " +

				 "Experience earned: <span style=\"color:#0d0\" id=\"wmhelperexp\"></span><br /> " +

				 "Current mastery: <span style=\"color:#0d0\" id=\"wmhelpermastery\"></span></div> " +

				 "<div style=\"clear:both;\">Status: <span style=\"color:#0d0\" id=\"wmhelperstatus\">Initializing</span><br />"+
         "<form>"+
         "Next Rounds Goal:"+
         "<input checked value=\"0\" type=\"radio\" name=\"goal\">Money</input>"+
         "<input value=\"1\" type=\"radio\" name=\"goal\">Experience</input>"+
         "<input value=\"2\" type=\"radio\" name=\"goal\">Mastery</input><br />"+
         "<!--<a href=\"javascript://forcenext();\" >Force next round</a>--></form></div></div>";

  

  dojo.query("body").addContent(goalselector, "before");

  

  dojo.addOnLoad(job_init);

}, 'false');



CheckScriptForUpdate = {

// Config values, change these to match your script

id: '63175', // Mafia Wars auto cash generator script id on Userscripts.org

days: 2, // Days to wait between update checks

// Don't edit after this line, unless you know what you're doing ;-)

name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],

version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),

time: new Date().getTime(),

call: function(response) {

  GM_xmlhttpRequest({

	method: 'GET',

	url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',

	onload: function(xpr) {AnotherAutoUpdater.compare(xpr,response);}

	});

},

compare: function(xpr,response) {

  this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);

  this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);

  if ( (this.xversion) && (this.xname[1] == this.name) ) {

	this.xversion = this.xversion[1].replace(/\./g, '');

	this.xname = this.xname[1];

  } else {

	if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 

  GM_setValue('updated_'+this.id, 'off');

	return false;

  }

  if ( (+this.xversion > +this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {

	GM_setValue('updated_'+this.id, this.time+'');

	top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';

  } else if ( (this.xversion) && (+this.xversion > +this.version) ) {

	if(confirm('Do you want to turn off auto updating for this script?')) {

  GM_setValue('updated_'+this.id, 'off');

  GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated_'+this.id, new Date().getTime()+''); AnotherAutoUpdater.call(true);});

  alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');

	} else {

  GM_setValue('updated_'+this.id, this.time+'');

	}

  } else {

	if(response) alert('No updates available for '+this.name);

	GM_setValue('updated_'+this.id, this.time+'');

  }

},

check: function() {

  if (GM_getValue('updated_'+this.id, 0) == 0) GM_setValue('updated_'+this.id, this.time+'');

  if ( (GM_getValue('updated_'+this.id, 0) != 'off') && (+this.time > (+GM_getValue('updated_'+this.id, 0) + (1000*60*60*24*this.days))) ) {

	this.call();

  } else if (GM_getValue('updated_'+this.id, 0) == 'off') {

	GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});

  } else {

	GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});

  }

  }

};

if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') AnotherAutoUpdater.check();