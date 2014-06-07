// ==UserScript==
// @name        Auto Civ Build Clicker
// @author      Brian
// @namespace   *
// @description Purchases automatically, but doesn't click basic resources (because that makes the game boring)
// @include     http://dhmholley.co.uk/*
// @version     1.02
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==


console.log($("button[onmousedown$=',1);'][onmousedown*='woodcutters'][onmousedown^='hire']").text());

TICKS_PER_SECOND = 10;

function ClickLoop()
{
    /*
    if ($("#tradeContainer").css('display') != "none"){
		$("button#trade").mousedown();
    }*/
    
    seperator = / /g;
    
    popCap = $("#popcap").text().replace(seperator,"")*1;
    curPop = $("#popcurrent").text().replace(seperator,"")*1;
    curFood = $("#farmers").text().replace(seperator,"")*1;
    curWood = $("#woodcutters").text().replace(seperator,"")*1;
    curStone = $("#miners").text().replace(seperator,"")*1;
    
    maxFood = Math.floor(popCap*.50);
    maxWood = Math.floor((popCap*.25)/7*2,1);
    maxStone = Math.floor((popCap*.25)/7*5,1);
    netFood = $("#netFood").text().replace(seperator,"")*1;
    
    stoneAmt = $("#stone").text().replace(seperator,"")*1;
    woodAmt = $("#wood").text().replace(seperator,"")*1;
    foodAmt = $("#food").text().replace(seperator,"")*1;
    maxStoneAmt = $("#maxstone").text().replace(seperator,"")*1;
    maxWoodAmt = $("#maxwood").text().replace(seperator,"")*1;
    maxSol = $("#barracks").text().replace(seperator,"")*10;
    maxCav = $("#stables").text().replace(seperator,"")*10;
    curSol = $("#soldiers").text().replace(seperator,"")*1 + $("#partySoldiers").text().replace(seperator,"")*1;
    curCav = $("#cavalry").text().replace(seperator,"")*1 + $("#partyCavalry").text().replace(seperator,"")*1;
    unemployed = $("#unemployed").text().replace(seperator,"")*1;
    workerCost = $("#workerCost").text().replace(seperator,"")*1;
    freeLand = $("#freeLand").text().replace(seperator,"")*1;
    
    graves = $("#graves").text().replace(seperator,"")*1;
    
    tanners = $("#tanners").text().replace(seperator,"")*1;
    tanneries = $("#tanneries").text().replace(seperator,"")*1;
    blacksmiths = $("#blacksmiths").text().replace(seperator,"")*1;
    smithies = $("#smithies").text().replace(seperator,"")*1;
    clerics = $("#clerics").text().replace(seperator,"")*1;
    temples = $("#temples").text().replace(seperator,"")*1;
    
    millCost = $("#millCostW").text().replace(seperator,"")*1;
    
    if (freeLand > 100){
        if (maxSol < popCap * .1)
            $("button[onmousedown*='barracks,1)'][onmousedown^='createBuilding']").mousedown();
        if (maxCav < popCap * .1)
            $("button[onmousedown*='stable,1)'][onmousedown^='createBuilding']").mousedown();
		if (graves < popCap)
            $("button[onmousedown*='graveyard,1)'][onmousedown^='createBuilding']").mousedown();
        if (tanneries < popCap * .0075){
             $("button[onmousedown*='tannery,1)'][onmousedown^='createBuilding']").mousedown();           
        }
        if (smithies < popCap * .0075){
             $("button[onmousedown*='smithy,1)'][onmousedown^='createBuilding']").mousedown();
        }
        if (temples < popCap * .01) {
             $("button[onmousedown*='temple,1)'][onmousedown^='createBuilding']").mousedown();
        }
        
        if ((stoneAmt > maxStoneAmt * .95) && (woodAmt > maxWoodAmt * .95)){
            
            $("button[onmousedown*='mill,1)'][onmousedown^='createBuilding']").mousedown();            
        }
        if (stoneAmt > maxStoneAmt * .98){
            
            $("button[onmousedown*='fortification,1)'][onmousedown^='createBuilding']").mousedown();
        }
        
       
            
        
    }
    if ((freeLand > 5000) && (woodAmt > maxWoodAmt * .5)){
        
        if (curPop+50>=popCap){
            $("button[onmousedown*='mansion,100)'][onmousedown^='createBuilding']").mousedown();
        }
        
         if (millCost > maxStoneAmt *.5){
            $("button[onmousedown*='barn,1000)'][onmousedown^='createBuilding']").mousedown();            
            
            $("button[onmousedown*='woodstock,1000)'][onmousedown^='createBuilding']").mousedown();            
            
            $("button[onmousedown*='stonestock,1000)'][onmousedown^='createBuilding']").mousedown();            

        }
    }
    
    partySol = $("#partySoldiers").text().replace(seperator,"")*1;
    partyCav = $("#partyCavalry").text().replace(seperator,"")*1;
    $("#armyCustom").val(Math.floor(maxSol*.5) - partySol);             
    if ( $("#armyCustom").val() > 0)
    	$("button[onmousedown*='soldiers'][onmousedown*='+1'][onmousedown^='partyCustom']").mousedown(); 
    
	$("#armyCustom").val(Math.floor(maxSol*.5) - partyCav);    
    if ( $("#armyCustom").val() > 0)
    	$("button[onmousedown*='cavalry'][onmousedown*='+1'][onmousedown^='partyCustom']").mousedown();  
    
    makeWorkers = Math.ceil(netFood/workerCost/TICKS_PER_SECOND)
    
    
    if ((foodAmt > makeWorkers*10*workerCost*TICKS_PER_SECOND) && (curPop < popCap - makeWorkers * 10) && (curPop + 5000 < popCap))
        $("#spawnCustom").val( makeWorkers*10 );
    else if (curPop < popCap - makeWorkers)
    	$("#spawnCustom").val( makeWorkers );
    else
        $("#spawnCustom").val(1);

    
           
           
    if ((curPop < popCap) && (netFood > 10))
        $("button#spawnCustomButton").mousedown();
    
    if ((netFood > 0) && (unemployed > 0)){
        $("#jobCustom").val(unemployed);
        if ((curFood < maxFood)||(netFood<=10)) {
            if (netFood<=10){
                $("#jobCustom").val(1);
            }
            else if (curFood + unemployed > maxFood){
                
                $("#jobCustom").val(maxFood-curFood);
            }
            $("button[onmousedown*='farmers'][onmousedown^='hireCustom']").mousedown();
        }
        else if (curWood < maxWood){
            if (curWood + unemployed > maxWood){
                $("#jobCustom").val(maxWood-curWood);
            }
            $("button[onmousedown*='woodcutters'][onmousedown^='hireCustom']").mousedown();
        }
            else if (curStone < maxStone) {
                if (curStone + unemployed > maxStone) {
                    $("#jobCustom").val(maxStone-curStone);
                }
                $("button[onmousedown*='miners'][onmousedown^='hireCustom']").mousedown();       
            }
            else if (curSol < maxSol){            
                $(".jobAll button[onmousedown*='soldiers'][onmousedown^='hireAll']").mousedown();
            }
                else if (curCav < maxCav){
                    $(".jobAll button[onmousedown*='cavalry'][onmousedown^='hireAll']").mousedown();
                }
                }   else if (netFood < 0){
                     $("button[onmousedown*='farmers'][onmousedown^='hireCustom']").mousedown();

                }
        
        if ((tanners < popCap * .005) && (curPop > popCap * .95)){
            $(".jobAll button[onmousedown*='tanners'][onmousedown^='hireAll']").mousedown();          
        }
        if ((blacksmiths < popCap * .005) && (curPop > popCap * .95)){
            $(".jobAll button[onmousedown*='blacksmiths'][onmousedown^='hireAll']").mousedown();
        }
        if ((clerics < popCap * .01) && (curPop > popCap * .95)){
            $(".jobAll button[onmousedown*='clerics'][onmousedown^='hireAll']").mousedown();
        }
        
    	if ($("#victoryGroup").css("display")=="block")
    		$("#plunder").mousedown();
}




window.setInterval(ClickLoop,1000/TICKS_PER_SECOND);
