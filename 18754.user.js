// ==UserScript==
// @name           Dictionary(English - Thai)
// @namespace      My Project
// @description    Translation vocabulary form English  to Thai.
// @include        *
// ==/UserScript==

const prefixrequest = 'http://search.sanook.com/knowledge/search/knowledge_search.php?qID=&wi=&hnl=&ob=&asc=&q=';
const suffixrequest = '&select=5';

String.prototype.Ltrim = function () {
        var reExtraSpace = /^\s+(.*?)\s+$/;
        return this.replace(reExtraSpace, "$1");
    };
	
function Rtrim(trimtxt)
{
	var temp = trimtxt;
	while (temp.substr(trimtxt.length-1,1) == " ")
	{
		temp = trimtxt.slice(0,trimtxt.length-1);
	}
	return temp;
}
	
function showTip(coorX,coorY,txt) 
	{
		var tooltip_width;
		var limitX,limitY;
		
		var doc = document.getElementsByTagName('body');
		var posinsert = document.getElementsByTagName('body')[doc.length - 1];
		
	    var Temp_tip = document.createElement("div");
		Temp_tip.innerHTML = '<div id="temptoolTipComponent" style="background-color: #D9ECFF;'+
		'position: absolute; visibility: hidden; padding: 5px; opacity: 0.85; '+
		'border-top: 1px solid #A5CFE9 ; border-Bottom: 1px solid #A5CFE9; border-Left: 1px solid #A5CFE9; '+
		'border-Right: 1px solid #A5CFE9 ; font: 11px Arial, Helvetica, sans-serif; "> '+ txt +
		' </div> ';
		
		document.body.insertBefore(Temp_tip,posinsert.firstChild);	
		
        var tDiv = document.getElementById("temptoolTipComponent");
		tooltip_width = tDiv.clientWidth;
		tDiv.parentNode.removeChild(tDiv)
		
		
		limitX = coorX + tooltip_width + 5 ;
		if (limitX > (screen.availWidth))
			{
				if ((coorX-tooltip_width-5) < 0)
				{
					coorX = 20;
				}
				else
				{
				coorX = coorX - tooltip_width - 5;
				}
			}
		else
			{
				coorX = coorX + 5;
			}
			
		coorY = coorY + 5;
		
		var Tool_tip = document.createElement("div");
		
		Tool_tip.innerHTML = '<div id="toolTipComponent" style="background-color: #D9ECFF;'+
		'top : '+ coorY + 'px; left : '+ coorX +'px;'+ 'z-index: 100;'+
		'position: absolute; visibility: visible; padding: 5px; opacity: 0.85; '+
		'border-top: 1px solid #A5CFE9 ; border-Bottom: 1px solid #A5CFE9; border-Left: 1px solid #A5CFE9; '+
		'border-Right: 1px solid #A5CFE9 ; font: 11px Arial, Helvetica, sans-serif; "> '+ txt +
		' </div> ';
		
		document.body.insertBefore(Tool_tip,posinsert.firstChild);	
		
    }

    function hideTip() {
        var oDiv = document.getElementById("toolTipComponent");
		if (oDiv)
			{
				oDiv.style.visibility = "hidden";
				oDiv.parentNode.removeChild(oDiv);
			}
    }
	
	
function check_word(seltxt)
{
	var replacements,regex,key,res_txt,prefix,cut_four,cut_three,cut_two,cut_one;
	
	seltxt = seltxt.toLowerCase();
	cut_four = seltxt.substr(seltxt.length-4,4);
	cut_three = seltxt.substr(seltxt.length-3,3);
	cut_two = seltxt.substr(seltxt.length-2,2);
	cut_one = seltxt.substr(seltxt.length-1,1);
	
	
	replacements = 
	{
	'bamboos':'bamboo','baboos':'baboo','studios':'studio','cuckoos':'cuckoo',
	'radios':'radio','cameos':'cameo','kilos':'kilo','solos':'solo','pianos':'piano',
	'folios':'folio','kangaroos':'kangaroo','zoos':'zoo','eskimos':'eskimo',
	'dynamos':'dynamo','embryos':'embryo','zeros':'zero','photos':'photo',
	'curios':'curio','cantos':'canto','memos':'memo','casinos':'casino',
	'albinos':'albino','banjos':'banjo','magnetos':'magneto','mementos':'memento',
	'chiefs':'chief','roofs':'roof','hoofs':'hoof','cliffs':'cliff',
	'proofs':'proof','strifes':'strife','safes':'safe','fifes':'fife',
	'turfs':'turf','dwarfs':'dwarf','gulfs':'gulf','griefs':'grief','reefs':'reef',
	'octavos':'octavo','piccolos':'piccolo','quartos':'quarto','men':'man',
	'women':'woman','feet':'foot','lice':'louse','geese':'goose',
	'mice':'mouse','teeth':'tooth','dormice':'dormouse','pence':'penny',
	'pennies':'penny','oxen':'ox','children':'child','brotheren':'brother',
	'scarfs':'scarf','scarves':'scarf','wharfs':'wharf','wharves':'wharf',
	'staffs':'staff','staves':'staff',
	'news':'news ','ashes':'ashes ','civics':'civics ','alms':'alms ',
	'means':'means ','politics':'politics ','mumps':'mumps ','gallows':'gallows ',
	'summons':'summons ','ethics':'ethics ','physics':'physics ','mechanics':'mechanics ',
	'statistics':'statistics ','economics':'economics ','headquarters':'headquarters ',
	'corps':'corps ','series':'series ','species':'species ','trousers':'trousers ',
	'goods':'goods ','shorts':'shorts ','pantaloons':'pantaloons ','pants':'pants ',
	'breeches':'breeches ','eye-glasses':'eye-glasses ','spectacles':'spectacles ',
	'shears':'shears ','tweezers':'tweezers ','tongs':'tongs ','bellows':'bellows ',
	'pincers':'pincers ','scissors':'scissors ','arms':'arms ','thanks':'thanks ',
	'contents':'contents ','whiskers':'whiskers ','clothes':'clothes ','wages':'wages ',
	'tidings':'tidings ','riches':'riches ','assets':'assets ','amends':'amends ',
	'chattels':'chattels ','billiards':'billiards ','draughts':'draughts ','bowlings':'bowlings ',
	'fetters':'fetters ','suds':'suds ','embers':'embers ','eaves':'eaves ',
	'nuptials':'nuptials ','trappings':'trappings ','victuals':'victuals ','entrails':'entrails ',
	'giblets':'giblets ','bowels':'bowels ','earnings':'earnings ','customs':'customs ',
	'appendices':'appendix','axes':'axis','indices':'index','formulae':'formula',
	'bases':'basis','crises':'crisis','hypotheses':'hypothesis','analyses':'analysis',
	'syntheses':'synthesis','oases':'oasis','phenomena':'phenomenon','theses':'thesis',
	'beaux':'beau','bureaux':'bureau',
	'going':'go','anything':'anything ','something':'something ','doing':'do',
	'biped':'biped ','bleed':'bleed ','breed':'breed ','breeds':'breed'
	};
	
	res_txt = seltxt;
	regex = {};
	for (key in replacements)
	{
		regex[key] = new RegExp(key,'g');
	}
	
	for (key in replacements)
	{
		res_txt = res_txt.replace(regex[key],replacements[key]);
	}

	if (seltxt != res_txt)
	{
		return res_txt;
	}
	else if (cut_four == 'sses' || cut_four == 'ches' || cut_four == 'shes')
	{
		return (seltxt.slice(0,seltxt.length-2));
	}
	else if (cut_three == 'xes' || cut_three == 'oes' || cut_three == 'zes' || cut_three == 'ses')
	{
		return (seltxt.slice(0,seltxt.length-2));
	}
	else if (cut_three == 'ies') // etc. cities
	{
		return (seltxt.slice(0,seltxt.length-3)+'y');
	}
	else if (cut_three == 'ves') // etc. wolves
	{
		return (seltxt.slice(0,seltxt.length-3)+'f');
	}
	else if (cut_one == 's')
	{
		if (IsMatchingChar(seltxt.substr(seltxt.length-2,1)) || seltxt.length <= 3) // etc. glass, dress,lotus,crisis....,us , bus
		{
			return seltxt;
		}
		else
		{
			return (seltxt.slice(0,seltxt.length-1));
		}
	}
	else if (cut_four == 'ying') // etc. lying
	{
		return (seltxt.slice(0,seltxt.length-4)+'ie');
	}
	else if (cut_four == 'eing') // etc. seeing
	{
		return (seltxt.slice(0,seltxt.length-3));
	}
	else if (cut_three == 'ing')
	{
		if (seltxt.substr(seltxt.length-4,1) == seltxt.substr(seltxt.length-5,1)) // etc. running
		{
			return (seltxt.slice(0,seltxt.length-4));
		}
		else if ((seltxt.slice(0,seltxt.length-3)).length <= 3) // etc. ding, thing, sing , doing, going
		{
			return seltxt;
		}
		else
		{
			return (seltxt.slice(0,seltxt.length-3));
		}
	}
	else if (cut_three == 'ied') // etc. cried
	{
		return (seltxt.slice(0,seltxt.length-3)+'y');
	}
	else if (cut_two == 'ed')
	{
		if (seltxt.substr(seltxt.length-3,1) == seltxt.substr(seltxt.length-4,1)) // etc. dropped................pass => passed
		{
			return (seltxt.slice(0,seltxt.length-3));
		}
		else if ((seltxt.slice(0,seltxt.length-2)).length <= 3) // etc. bed,feed
		{
			return seltxt;
		}
		else
		{
			return (seltxt.slice(0,seltxt.length-2));
		}
	}
	else
	{
		return seltxt;
	}
}	

function IsMatchingChar(str)
{
    var myRegExp = /[aious]/ ;
    return myRegExp.test(str)
}
	
function  KeepData(e)
{
	var selecttxt,tmptxt;
	var posx = e.pageX;
	var posy = e.pageY;
	
	show_message = document.getElementById("toolTipComponent");
	
	if (show_message)
	{
		hideTip();
	}
	tmptxt = window.getSelection().toString();
	window.getSelection().removeAllRanges();
	selecttxt = tmptxt.Ltrim();
	selecttxt = Rtrim(selecttxt);
	if (selecttxt.length != 0)
	{	
		var oldtxt = selecttxt.toUpperCase();
		selecttxt = check_word(selecttxt);
		GM_xmlhttpRequest
		(
			{
				method : 'GET',
				url : prefixrequest + selecttxt + suffixrequest,
				onload : function(responseDetails)
					{
						var data = responseDetails.responseText;
						var pos,pos1,pos2,datashow;
						pos1 = data.indexOf('ความหมาย</font><br><br>');
						pos = data.indexOf('ความหมาย</span><br>');
						if (pos1 >=0)
							{
								pos1 = pos1+23;
								pos2 = data.indexOf('<br></p>',pos1);
								datashow = data.slice(pos1,pos2);
							}
						else if (pos >= 0)
							{
								pos1 = pos+19;
								pos2 = data.indexOf('</p><br>',pos1);
								datashow = data.slice(pos1,pos2);
							}
						else
							{
								pos1 = data.indexOf('<span class=fontredsm>')+22;
								pos2 = data.indexOf('</span>',pos1);
								datashow = data.slice(pos1,pos2);
							}
							
						var found = datashow.indexOf('<br>',0);
						var tempdata = oldtxt + '<br><br>';
						if (found < 0)
							{	
								var content_length = 60;
								var sep_cont = ((datashow.length)/content_length)+1;
								var pos_Start;
								for (var i=0; i < sep_cont ; i++)
									{
										pos_Start = (i*content_length);
										tempdata = tempdata + datashow.substr(pos_Start,content_length) + '<br>';
									}
							}
						else
							{
								tempdata = tempdata + datashow;
							}
							
						datashow = tempdata;
						showTip(posx,posy,datashow);
					},
				onreadystatechange : function(disp_state)
					{
						switch (disp_state.readyState)
							{
							case 1 : 
								window.status = 'Loading. The request is being prepared.';
								break;
							case 2	:
								window.status = 'Loaded. The request is ready to be sent to the server, but nothing has been sent yet.';
								break;
							case 3	:
								window.status = 'Interactive. The request has been sent and the client is waiting for server to finish sending data.'
								break;
							case 4	:
								window.status = 'Completed.......';
								break;
							}
							
					}
			}	
		);
	}
}

window.addEventListener("mouseup",KeepData,false);