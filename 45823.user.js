// ==UserScript==
// @name           Command Post 3.0
// @namespace      http://www.mediwar.com/army/66737
// @description    Displays necessary information needed to get optimal SA and DA and has a UP calc!
// @include        http://mediwar.com/commandpost.php
// @include        http://www.mediwar.com/commandpost.php
// ==/UserScript==
        
        var myBody = document.getElementsByTagName("body")[0];
        var myBodyElements = myBody.getElementsByTagName("td");
        
        var myText;
               
        var commandOffset;
        if(myBodyElements.length == 182)       
                commandOffset =0;
        else if(myBodyElements.length == 183)  
                commandOffset =1;
        else if(myBodyElements.length == 184)  
                commandOffset =2;
        
        
        var weap = myBodyElements[153+commandOffset];
        var weapT = weap.innerHTML;
        weapT = weapT.replace(',','');
        weapT = parseInt(weapT);
        
        var ASoldier = myBodyElements[162+commandOffset];
        var ASoldierT = ASoldier.innerHTML;
        ASoldierT = ASoldierT.replace(',','');
        ASoldierT = parseInt(ASoldierT);
        
        var AMerc = myBodyElements[169+commandOffset];
        var AMercT = AMerc.innerHTML;
        AMercT = AMercT.replace(',','');
        AMercT = parseInt(AMercT);
        
        var armor = myBodyElements[155+commandOffset];
        var armorT = armor.innerHTML;
        armorT = armorT.replace(',','');
        armorT = parseInt(armorT);
        
        var DSoldier = myBodyElements[164+commandOffset];
        var DSoldierT = DSoldier.innerHTML;
        DSoldierT = DSoldierT.replace(',','');
        DSoldierT = parseInt(DSoldierT);
        
        var DMerc = myBodyElements[171+commandOffset];
        var DMercT = DMerc.innerHTML;
        DMercT = DMercT.replace(',','');
        DMercT = parseInt(DMercT);
        
        var BMerc = myBodyElements[173+commandOffset];
        var BMercT = BMerc.innerHTML;
        BMercT = BMercT.replace(',','');
        BMercT = parseInt(BMercT);
        
        var ASoldierCount = AMercT+ASoldierT+BMercT;
        var DSoldierCount = DMercT+DSoldierT+BMercT;
        
        if(weapT < ASoldierCount)
        {
                var weaps = ASoldierCount - weapT;
        	weaps=formatSting(weaps);
                myText=document.createTextNode(" *** Need "+weaps+ " more weapons! ***");
                weap.style.color="orange";
                weap.appendChild(myText);
        }
        else if(weapT > ASoldierCount)
        {
                var SNeeded = weapT - ASoldierCount;
        	SNeeded=formatSting(SNeeded);
                myText=document.createTextNode(" *** "+SNeeded+ " more Attack Specialist(s)! ***");
                ASoldier.style.color="orange";
                ASoldier.appendChild(myText);
        }
               
        if(armorT < DSoldierCount)
        {
                var armors = DSoldierCount - armorT;
        	armors=formatSting(armors);
                myText=document.createTextNode(" *** Need "+armors+ " more armors! ***");
                armor.style.color="orange";
                armor.appendChild(myText);
        }
        else if(armorT > DSoldierCount)
        {
                var DNeeded = armorT - DSoldierCount;
        	DNeeded=formatSting(DNeeded);
                myText=document.createTextNode(" *** Need "+DNeeded+" more Defense Specialist(s)! ***");
                DSoldier.style.color="orange";
                DSoldier.appendChild(myText);
        }
        
        //------------------------BEGINNING OF UP CALCS------------------------------------------------------------------------------
        
        var UPstring=myBodyElements[92+commandOffset];
        var currentUP=UPstring.innerHTML;
        currentUP=currentUP.replace("soldiers<br>(every 30 minutes)",'');
        currentUP=currentUP.replace(',','');
        currentUP=parseInt(currentUP);
        
        var TimeLeftString=myBodyElements[55+commandOffset];
        var temp=TimeLeftString.innerHTML;
        temp=temp.replace('<b>', '');
        temp=temp.replace('<font color="#c0c0c0">d</font>', '');
        temp=temp.replace('<font color="#c0c0c0">hr</font>', '');
        temp=temp.replace('<font color="#c0c0c0">min</font></b>', '');
        
        temp=temp.replace(' ','');
        temp=temp.replace('\n','');
        temp=temp.replace('\t','');
        temp=temp.replace('\t','');
        
        
        var mySplits = temp.split(' ');
        
        
        var days=mySplits[0];
        days=parseInt(days);
        
        var hours=mySplits[1];
        hours=parseInt(hours);
        
        var minutes=mySplits[3];
        minutes=parseInt(minutes);
        
        var HumanString=myBodyElements[79+commandOffset];
        var areTheyHuman;
        if(HumanString.innerHTML == 'Human')
        	areTheyHuman=true;
        
        var turnsLeft=0;
        turnsLeft+=(days*48)+(hours*2)+parseInt(minutes/30);
        
        
        var goldAccumulated=0;
        var unitsAccumulated=0;
        
        var goldMultiplier=0;
        if(areTheyHuman)
        	goldMultiplier=75;
        else
        	goldMultiplier=60;
        	
        for(var y=0; y<turnsLeft;y++)
        {
        	unitsAccumulated++;
        	goldAccumulated+=(unitsAccumulated*goldMultiplier);
        }
        
        
        var netGoldAccumulated = (goldAccumulated-((currentUP+1)*10000));
        
        if(netGoldAccumulated > 0)
        {
        	UPstring.style.color="green";
        	
        	netGoldAccumulated=formatSting(netGoldAccumulated);
        	unitsAccumulated=formatSting(unitsAccumulated);
        	var myUPText=document.createTextNode("\n\n *** Upgrading your UP will grant you "+ netGoldAccumulated+" G ... Along with "+unitsAccumulated+" more soldiers ***");
        	UPstring.appendChild(myUPText);
        }
        else
        {
        	UPstring.style.color="red";
        	
        	netGoldAccumulated=formatSting(netGoldAccumulated);
        	unitsAccumulated=formatSting(unitsAccumulated);
        	var myUPText=document.createTextNode("\n\n *** Upgrading your UP will cost you "+ netGoldAccumulated+" G ... However you will gain "+unitsAccumulated+" more soldiers ***");
        	UPstring.appendChild(myUPText);
        }
        
        function formatSting(num) {
                num = num.toString().replace(/\D|\,/g, '');
                if (isNaN(num))
                    num = "0";
                for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
                    num = num.substring(0, num.length - (4 * i + 3)) + ',' +
            num.substring(num.length - (4 * i + 3));
                return num;
            }