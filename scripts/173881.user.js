// ==UserScript==
// @name       OneSkillManagerPlus
// @version    1.1.1
// @description  Some usefulls addons to improve your ingame experience
// @include *.oneskillmanager.com/*
// @copyright  2012+, B1ackTitan
// ==/UserScript==

var url = document.location.href;


if(url.indexOf('page=players') != -1)
    
{
    var title = document.getElementsByClassName('title')[3];
    var filterdiv = document.createElement("div");
    filterdiv.setAttribute("style", 'position:relative;top:-38px;left:250px;width:150px;height:50px;');

    title.appendChild(filterdiv);
    
    var check_list = document.createElement("input");
	    check_list.setAttribute("type", 'checkbox');
	    check_list.setAttribute("name", 'g');
    	check_list.setAttribute("value", g);
        check_list.setAttribute("id", 'filter_gk');
    	check_list.checked=true;
    	check_list.onclick=filterPlayers;
      
    var label = document.createElement('label');
    label.innerHTML='G';

	filterdiv.appendChild(label);
  	filterdiv.appendChild(check_list);   
    
    
    var check_list1 = document.createElement("input");
	    check_list1.setAttribute("type", 'checkbox');
	    check_list1.setAttribute("name", 'def');
    	check_list1.setAttribute("value", 'D');
        check_list1.setAttribute("id", 'filter_def');
        check_list1.onclick=filterPlayers;
		check_list1.checked=1;
      
    var label1 = document.createElement('label');
    	label1.innerHTML='D';

	    filterdiv.appendChild(label1);
    	filterdiv.appendChild(check_list1);   
    
        var check_list2 = document.createElement("input");
	    check_list2.setAttribute("type", 'checkbox');
	    check_list2.setAttribute("name", 'mid');
    	check_list2.setAttribute("value", 'M');
        check_list2.setAttribute("id", 'filter_mids');
    	check_list2.checked=1;
       	check_list2.onclick=filterPlayers;

      
    var label2 = document.createElement('label');
    label2.innerHTML='M';

	    filterdiv.appendChild(label2);
    	filterdiv.appendChild(check_list2);   
    
        var check_list3 = document.createElement("input");
	    check_list3.setAttribute("type", 'checkbox');
	    check_list3.setAttribute("name", 'F');
    	check_list3.setAttribute("value", 'F');
    	check_list3.setAttribute("id", 'filter_att');
    	check_list3.checked=1;
        check_list3.onclick=filterPlayers;

    var label3 = document.createElement('label');
    label3.innerHTML='F';

	    filterdiv.appendChild(label3);
    	filterdiv.appendChild(check_list3);   

    var players = document.getElementById('lineup_table').getElementsByTagName('tr');
    //add player skill
    var attr,skill,exp,condition,real;
    for(var i=1; i< players.length; i++)
    {
        attr=players[i].getElementsByTagName('td');
        
        if((attr[7].innerHTML).indexOf('img') == -1)
        {
      		skill=parseInt(attr[4].innerHTML); 
        	exp  =parseInt(attr[6].innerHTML);
        	condition = parseInt(attr[7].getElementsByTagName('div')[0].getElementsByTagName('div')[1].innerHTML);
        	real = realSkill(skill,exp,condition);
        	attr[7].getElementsByTagName('div')[0].getElementsByTagName('div')[1].innerHTML += ' ' +  real;        
        }          
    }
    
}
else if(url.indexOf('page=player&id') != -1 ||  url.indexOf('page=player&action=watch&id=') != -1)
{
    var player = document.getElementsByTagName('tbody')[1];
    var attr,skill,exp,condition,real;
    skill= parseInt(player.getElementsByTagName('td')[1].getElementsByTagName('div')[0].innerHTML);
    condition= parseInt(player.getElementsByTagName('td')[1].getElementsByTagName('div')[3].getElementsByTagName('div')[0].getElementsByTagName('div')[1].innerHTML);
    exp=player.getElementsByTagName('td')[13].getElementsByTagName('div')[1].innerHTML;

    if(!isNumber(exp)) //e portugues
    {
        exp=player.getElementsByTagName('td')[12].getElementsByTagName('div')[1].innerHTML;
    } 
    
    real = realSkill(skill,exp,condition);
    player.getElementsByTagName('td')[1].getElementsByTagName('div')[3].getElementsByTagName('div')[0].getElementsByTagName('div')[1].innerHTML += '\t' +  real;
}
else if(url.indexOf('page=facilities&show=boards') != -1)
{
    var offers = document.querySelectorAll(".box.small");
  
    for(var i=0; i< offers.length; i++)
    {
   	 	//Create an input type dynamically.
        
   	 	var element = document.createElement("input");
	    element.setAttribute("type", 'number');
	    element.setAttribute("name", 'league_games');
	    element.setAttribute("style", 'width:25px');
        element.setAttribute("value",0);
        offers[i].getElementsByTagName('td')[6].appendChild(element);
        
        var element2 = document.createElement("input");
	    element2.setAttribute("type", 'number');
	    element2.setAttribute("name", 'continental_games');
	    element2.setAttribute("style", 'width:25px');
        element2.setAttribute("value",0);
        offers[i].getElementsByTagName('td')[8].appendChild(element2);
        
        var element3 = document.createElement("input");
	    element3.setAttribute("type", 'number');
	    element3.setAttribute("name", 'league_games');
	    element3.setAttribute("style", 'width:25px');
        element3.setAttribute("value",0);
        offers[i].getElementsByTagName('td')[10].appendChild(element3);
		
         element.onchange=onChangeBoard;
	    element2.onchange=onChangeBoard;
	    element3.onchange=onChangeBoard;
        
        moneyBoardUpdate(offers[i]);
       
        //offers[i]
    }
    
}
    
    function onChangeBoard() {
   	    var offers = document.querySelectorAll(".box.small"); 
        for(var i=0; i< offers.length; i++)
        	moneyBoardUpdate(offers[i]);
    }
    
    function moneyBoardUpdate(offer) { 
        var boards =offer.getElementsByTagName('td')[3].innerHTML;
        var days = parseInt(offer.getElementsByTagName('td')[5].innerHTML);
        var league = extractNumber(new String(offer.getElementsByTagName('td')[7].innerHTML));
        var cup = extractNumber(new String(offer.getElementsByTagName('td')[9].innerHTML));
        var continental = extractNumber(new String(offer.getElementsByTagName('td')[11].innerHTML));
        var sign = extractNumber(new String(offer.getElementsByTagName('td')[13].innerHTML));
      	var league_games = offer.getElementsByTagName('input')[1].value;
        var cup_games = offer.getElementsByTagName('input')[2].value;
        var continental_games = offer.getElementsByTagName('input')[3].value;
      	var money = moneyBoard(league_games, cup_games, continental_games, boards, days, league, cup, continental, sign);
        offer.getElementsByTagName('div')[0].innerHTML = money;
    
    }
    function extractNumber(str) {
        var number = new String();
        
    	for(var i = 2; i<str.length; i++)
      	{
          if(!isNaN(str.charAt(i)))
              number += str.charAt(i);
      	}
        return number
    }
    
    function realSkill(skill,exp,energy) { 
        return Math.round(((exp/2000)+1)*skill*(energy/100));   
    }

	function moneyBoard(league_games, cup_games, continental_games, boards, days, league, cup, continental, sign)
    {
        var number = days * boards;
        var income = ( Number(sign) + (league_games * league) + (cup_games * (cup/2)) + (continental * (continental_games/2)));
        return income/number;
    }

	function isNumber (o) {
  		return ! isNaN (o-0) && o !== null && o.replace(/^\s\s*/, '') !== "" && o !== false;        
	}

	function filterPlayers() {
    	var players = document.getElementById('lineup_table').getElementsByTagName('tr');
   
        for(var i=1; i< players.length; i++)
        {
            attr=players[i].getElementsByTagName('td'); 
            if(attr[1].innerHTML.indexOf('G') != -1)
            { 
                if(!check_list.checked)
                {
                    players[i].style.display = "none";
                }
                else
                    players[i].style.display="";
            }
            else if(attr[1].innerHTML.indexOf('D') != -1)
            { 
                if(!check_list1.checked)
                {
                    players[i].style.display = "none";
                }
                else
                    players[i].style.display="";
            }
            else if(attr[1].innerHTML.indexOf('M') != -1)
            { 
                if(!check_list2.checked)
                {
                    players[i].style.display = "none";
                }
                else
                    players[i].style.display="";
            }
            else if(attr[1].innerHTML.indexOf('A') != -1)
            { 
                if(!check_list3.checked)
                {
                    players[i].style.display = "none";
                }
                else
                    players[i].style.display="";
            }
                
        }        
    }