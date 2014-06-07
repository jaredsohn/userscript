    // ==UserScript==
    // @name           Ruins Of Chaos - Phoenix
    // @namespace      ROC
    // @description    Just a script to help out Phoenix :-)
    // @include        http://www.ruinsofchaos.com/*
    // @author         Deloo
    // ==/UserScript==

	//Upgraded by Lopina
	
	
	if (document.URL.match("base.php")) {
		var soldiers = document.getElementsByClassName('c h');
		var TFF = soldiers[9].innerHTML;
		var TCF = soldiers[10].innerHTML;
		TFF = TFF.replace(/,/g,"");
		TCF = TCF.replace(/,/g,"");
		TFF = parseInt(TFF);
		TCF = parseInt(TCF);
		TFF = TFF - TCF;
		TFF = TFF / 1.05;
		TFF = parseInt(TFF);

		GM_setValue("TFF", TFF);
	}
	
	
    //-------------------------------------------------------------------------------------
    // Under here is the part to automatically go to the gold-ordered battlefield
    //-------------------------------------------------------------------------------------

        var button = document.getElementsByClassName('menu3');
        var href = button[0].href;
        button[0].href = href.replace(/do=mypage/gi,"order=gold");


    //-------------------------------------------------------------------------------------
    // Under here is the part to color all members of a certain alliance on the battlefield
    //-------------------------------------------------------------------------------------

    if(document.URL.match(".com/battlefield.php")) {

        var alliances = document.getElementsByClassName('c');
        var alliance1 = 'CdeBss';  // Put an alliance name in here. Make sure it's an exact copy of what's used ingame!
        var alliance2 = '**ES**';  // Put an alliance name in here. Make sure it's an exact copy of what's used ingame!
        var alliance3 = '~RF~';  // Put an alliance name in here. Make sure it's an exact copy of what's used ingame!
		var alliance4 = 'VS';  // Put an alliance name in here. Make sure it's an exact copy of what's used ingame!
        var numAlliances = alliances.length;
        for(var i = 0; i < numAlliances; i++)
        {
           if(alliances[i].nodeName == 'TD')
           {
              if(alliances[i].firstChild.innerHTML == alliance1)
                   {
                 alliances[i].parentNode.style.backgroundColor = '#2B0000';
              }
            if(alliances[i].firstChild.innerHTML == alliance2)
                   {
                 alliances[i].parentNode.style.backgroundColor = '#2B0000';
              }
              if(alliances[i].firstChild.innerHTML == alliance3)
                   {
                 alliances[i].parentNode.style.backgroundColor = '#2B0000';
              }
			  if(alliances[i].firstChild.innerHTML == alliance4)
                   {
                 alliances[i].parentNode.style.backgroundColor = '#2B0000';
              }
           }
        }
    }


    //-------------------------------------------------------------------------------------
    // Under here is the part that colors people with lots of gold
    //-------------------------------------------------------------------------------------

    if(document.URL.match(".com/battlefield.php")) {
	
		if (GM_getValue("goldBF") == undefined) {
		GM_setValue("goldBF", 100000000);
		}
        var alltables = document.getElementsByTagName('table');

                 rows = alltables[5].rows;
                 for (i=2;i<rows.length-1;i++)
                 {
                   var gold_str = rows[i].cells[5].innerHTML;
                   var gold_num = parseInt(gold_str.replace(/,/g,""));
				   
                   var gold_wanted = new Number(GM_getValue("goldBF")); // Change the value in the brackets to whatever gold you want colored
				   
               
               var tff_str = rows[i].cells[3].innerHTML;
               var tff_num = parseInt(tff_str.replace(/,/g,""));
                if(gold_num >= gold_wanted)
                {
               if (GM_getValue("TFF") <= tff_num) {
                  rows[i].style.backgroundColor = '#001936';
               }
               else {
                  rows[i].style.backgroundColor = '#002200';
               }
                }
               }
		var holder = document.getElementsByClassName('sep c')[0].innerHTML;
		var BF_Button = '<tr><td align="right">Current Filter: ' + addCommas(GM_getValue("goldBF")) + ' gold - Change: </td><td align="left"><input name="setBFgold" size="5" type="text"> <input id="slon" value="Save" type="submit"></td></tr></tbody>';
		document.getElementsByClassName('sep c')[0].innerHTML.replace("'</tbody>", "");
		document.getElementsByClassName('sep c')[0].innerHTML += BF_Button;
		holder = document.getElementsByClassName('sep c')[0].innerHTML;
		document.getElementById("slon").addEventListener('click', remember_gold, true);
		
    }


    //-------------------------------------------------------------------------------------
    // Under here is the part that automatically fills in a recruit message
    //-------------------------------------------------------------------------------------

    if(document.URL.match(".com/writemail.php")) {

       var headers = document.getElementsByTagName('TH');
       var user_name = headers[0].lastChild.innerHTML;
       
       document.forms[2].elements[1].value = "hai! :D"; // Change your subject here
       document.forms[2].elements[2].value = "Hi there, " + user_name + ", \n\nMessage here"; // Change your message here

    }

    //-------------------------------------------------------------------------------------   
    // Under here is the part that makes an attack link to copy on the intel-report
    //-------------------------------------------------------------------------------------   
       
    if(document.URL.match(".com/inteldetail.php")) {
       
         var header = document.getElementsByTagName('TH');
         var link = header[3].innerHTML;
         var new_link = link.replace(/stats/gi,"attack");
         header[3].innerHTML = new_link;

    } 
           
    //-------------------------------------------------------------------------------------
    // Under here is the part that adds an attack link on the battlefield pages
    //-------------------------------------------------------------------------------------

    if(document.URL.match(".com/battlefield.php")) {

             var alltables = document.getElementsByTagName('table');
             
             rows = alltables[4].rows;
             for (i=2;i<rows.length-1;i++)
             {   
               rows[i].cells[3].width = "150px";
            rows[i].cells[4].width = "100px";
             
               var anchor = rows[i].cells[1].firstChild.href;
            var step_two = anchor.substr(41);
            var ID = parseInt(step_two);
           
            var user_name = rows[i].cells[1].firstChild.innerHTML;
            var buddy_icon_source = rows[i].cells[2].firstChild.src;
            var buddy_icon = "<img src=\"" + buddy_icon_source + "\" alt=\"\" title=\"your enemy: " + user_name + "\" style=\"vertical-align: middle;\" \/>"
           
           
            var fast_link = "<a href=\"attack.php?mission_type=probe&amp;id=" + ID + "\">Probe<\/a> - <a href=\"attack.php?id=" + ID + "\">Attack<\/a> - <a href=\"attack.php?mission_type=spy&amp;id=" + ID + "\">Spy<\/a> - <a href=\"attack.php?mission_type=sabotage&amp;id=" + ID + "\">Sabotage<\/a>";
              if (rows[i].cells[2].firstChild.nodeName == ('IMG')) {
                var fast_link = buddy_icon + "<a href=\"attack.php?mission_type=probe&amp;id=" + ID + "\">Probe<\/a> - <a href=\"attack.php?id=" + ID + "\">Attack<\/a> - <a href=\"attack.php?mission_type=spy&amp;id=" + ID + "\">Spy<\/a> - <a href=\"attack.php?mission_type=sabotage&amp;id=" + ID + "\">Sabotage<\/a>";
              }
            rows[i].cells[2].innerHTML = fast_link;
           
           }   
    }                 

    //-------------------------------------------------------------------------------------
    // Under here is the part that adds AAT table
    //-------------------------------------------------------------------------------------
	
	if (document.URL.match("armory.php")) {
		var SOV = document.getElementsByClassName('subh c')[0].innerHTML.replace("Total sell value: ","").replace(/,/g,"");
		SOV = parseInt(SOV);
		
		var aatSaDa = 0.00178574361484850576488706365503;
		var aatSpSe = 0.00107116249832831677466962025315;
		
		var SaDa = aatSaDa * SOV;
		var SpSe = aatSpSe * SOV;
		
		var sabratio = 0;
		
		var toReplace = '<br /><br />Copyright &copy; 2008-2009 Dennis Field and Tim Potter. All rights reserved.<br /><a href="privacy.php">Privacy</a><br /><br />';
		//var colorz = Math.floor(Math.random()*256) + ', ' + Math.floor(Math.random()*256) + ', ' + Math.floor(Math.random()*256);
		colorz = '255, 255, 255';
		
		var replaceWith = '<table class="f" cellspacing="0"><tr><td width="100%" align="center"><table class="sep f" cellspacing="0"><tr><th colspan="8"><span id="rainbowlol" style="color: rgb(' + colorz +');"><b>AAT Calculations [ sabbed | rebuy ]  -  ATTENTION: This is for 1 sucess ONLY  -  Click HERE to expand and collapse the table</b></span></th></tr><tr><th class="subh">Spies</th><th class="subh">Dagger / Sai</th><th class="subh">Maul / Shield</th><th class="subh">Blade / Mithril</th><th class="subh">Excalibur / Dragonskin</th><th class="subh">Cloak / Horn</th><th class="subh">Hook / Guard Dog</th><th class="subh">Pickaxe / Torch</th></tr>';
		
		
		for (var spies = 1; spies <= 25; spies ++) {
			if (spies < 25) {
				sabratio = 1 - (0.02 * (25 - spies));
			}
			else {
				sabratio = 1;
			}
			
			var weaponsValue = Math.ceil((SaDa * sabratio));
			var toolsValue = Math.ceil((SpSe * sabratio));
			
			var w1 = Math.ceil((weaponsValue / 1000));
			var w1r = Math.ceil((w1 * 0.8));
			
			var w2 = Math.ceil((weaponsValue / 15000));
			var w2r = Math.ceil((w2 * 0.8));
			
			var w3 = Math.ceil((weaponsValue / 200000));
			var w3r = Math.ceil((w3 * 0.8));
			
			var w4 = Math.ceil((weaponsValue / 1000000));
			var w4r = Math.ceil((w4 * 0.8));
			
			var t1 = Math.ceil((toolsValue / 15000));
			var t1r = Math.ceil((t1 * 0.8));
			
			var t2 = Math.ceil((toolsValue / 30000));
			var t2r = Math.ceil((t2 * 0.8));
			
			var t3 = Math.ceil((toolsValue / 90000));
			var t3r = Math.ceil((t3 * 0.8));
			
			replaceWith += '<tr><td class="l"><b>' + spies + '</b></td><td class="c">[ ' + addCommas(w1) + ' | ' + addCommas(w1r) + ' ]</td><td class="c">[ ' + addCommas(w2) + ' | ' + addCommas(w2r) + ' ]</td><td class="c">[ ' + addCommas(w3) + ' | ' + addCommas(w3r) + ' ]</td><td class="c">[ ' + addCommas(w4) + ' | ' + addCommas(w4r) + ' ]</td><td class="c">[ ' + addCommas(t1) + ' | ' + addCommas(t1r) + ' ]</td><td class="c">[ ' + addCommas(t2) + ' | ' + addCommas(t2r) + ' ]</td><td class="c">[ ' + addCommas(t3) + ' | ' + addCommas(t3r) + ' ]</td></tr>';
		}
		
		replaceWith += '</tr</table></td></tr></table><a id="bottom"></a>';
		
		document.getElementsByClassName("footer")[0].innerHTML += replaceWith;
		
		expcolTable();
	}

function addCommas(nStr){
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function expcolTable() {
  var table = document.getElementsByClassName("sep f")[5];
 
  hidetable();

  function hidetable() {
    for (i = 1; i < table.rows.length; i++)
    {
      table.rows[i].style.display = table.rows[i].style.display != 'none' ? 'none' : '';
    }
  }


  table.rows[0].addEventListener('click', function(event)
  {
    
	if (table.rows[1].style.display != 'none') GM_setValue("Collapse","Yes");
	else GM_setValue("Collapse","No");
    
    
    event.stopPropagation();
    event.preventDefault();

    for (i = 1; i < table.rows.length; i++)
    {
      table.rows[i].style.display = table.rows[i].style.display != 'none' ? 'none' : '';
    }
	document.getElementById("bottom").scrollIntoView(true);
  }, true);
}

function remember_gold() {
		var minGold = document.getElementsByName("setBFgold")[0].value;
		GM_setValue("goldBF", minGold);
}