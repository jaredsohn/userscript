// ==UserScript==
// @name           Light Rising AutoSearch
// @namespace      http://userscripts.org/users/125692
// @description    Adds 'Search 10x' button
// @include        *lightrising.com*game.cgi
// ==/UserScript==

(function() {

//constants
var numberofsearches=10;//number of times to search for
var SRpc=0;//picked clean
var SRvlr=1;//very limited resources
var SRlr=2;//limited resources
var SRmr=3;//moderate resources
var SRar=4;//abundant resources


//variables
var resourcelvl=-1;//current pages resource lvl (assuming we have search results)
var searchresult;//currentpages search result (assuming we have search results)
var arewesearching;//boolean are we?


//functions
function outputsearchresults(texttoadd){   
    //texttoadd='ddd';
    var gib=document.getElementsByClassName("gamebox infobox")[0];
    var searchtextelement=gib.getElementsByTagName('b')[0];
    var divwewant=gib.firstElementChild;
    var rawtext=GM_getValue('GMallsearchresults','');
    GM_setValue('GMallsearchresults','');
    //var rawtext='text\nline1\nline2\nline3\nline4';
    var arraytext=rawtext.split('\n');
    arraytext[0]=texttoadd;//this can be over written as its not a search result
    var textline= document.createElement("p")//where we will place the results
    for (i=0;i<arraytext.length;i++){//populating results
        textline.innerHTML=textline.innerHTML+arraytext[i]+'<br>';
    }
    divwewant.insertBefore(textline,searchtextelement.nextSibling );
}

function getsearchrate(){
    //return SRar
    //first if the tweaks script has run before this script its easier.
    if(document.getElementById('searchrate')){//we have an id!
        return parseInt(document.getElementById('searchrate').getAttribute('value'))//return as int the search rate
    }
    else{//we have to actually search the text for the search rate
        var gib=document.getElementsByClassName("gamebox infobox")[0];
        var gibhtml=gib.innerHTML;
        if(gibhtml.match(/This area appears to have been picked clean./)){return SRpc;}
        else if(gibhtml.match(/very limited resources/)){return SRvlr;}
        else if(gibhtml.match(/limited resources/)){return SRlr;}
        else if(gibhtml.match(/moderate resources/)){return SRmr;}
        else if(gibhtml.match(/abundant resources/)){return SRar;}
        else if(gibhtml.match(/There appears to be nothing to find here./)){return SRpc;}
        else return SRar;//we don't know so assume lots
    }
}

function cleanupforexit(){
    GM_setValue('GMarewesearching',false);//not searching
    GM_setValue('GMallsearchresults','');//clear old results
    GM_setValue('GMnumofsearchesleft',0);
    return 1
}

//SCRIPT START

//setupthebutton
    //grab ap as we make the button invisible if not enough ap to do whole search
    var gsb=document.getElementsByClassName("gamebox statsbox")[0];
    var searchtextelement=gsb.getElementsByTagName('b');
    var a=searchtextelement[1];//second bold thing is ap.
    var test=a.innerHTML.match(/(\d+)[^0-9]*(\d+)/) // extract the first 2 numbers
    var availableap=test[1];
    //make new autosearch button by cloning search button 
    var searchbutton=document.evaluate( "//input[@value='Search']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
    search10buttonform=searchbutton.parentNode.cloneNode(true);//make a new copy of the search button
    searchbutton.parentNode.parentNode.insertBefore(search10buttonform,searchbutton.parentNode.nextSibling);
    search10button=search10buttonform.firstElementChild;
    search10button.setAttribute("value", "Search "+numberofsearches+ "x");
    if (numberofsearches>availableap){//we don't have enough ap so hide button
         search10button.style.display='none';
    }
    search10buttonform.id="AutoSearchForm";//id so we can easy find it later
    search10button.addEventListener("click", function(event) {GM_setValue('GMarewesearching',true);
                    GM_setValue('GMnumofsearchesleft',numberofsearches);},true);



//cleanupforexit();
//first we must check if this is the first time through
//alert(GM_getValue('GMarewesearching',false));
var arewesearching=GM_getValue('GMarewesearching',false);
if(arewesearching){//we are searching
    //alert("we be searching");
    //well then there aught to be results to gather.
    var gib=document.getElementsByClassName("gamebox infobox")[0];
    var searchtextelement=gib.getElementsByTagName('b');
    if (searchtextelement){//foundsomething
        var searchtext=searchtextelement[0].innerHTML
        //var foundtext=searchtext.match(/([^.]+.)(.*)/);
        var foundtext=searchtext.match(/([^.]+.)/);//finds the first sentence
        //alert(foundtext[1]+" and "+foundtext[2]);
        if (GM_getValue("GMallsearchresults")) {
                GM_setValue("GMallsearchresults", GM_getValue("GMallsearchresults") + "\n" + foundtext[1]);
        } 
        else{
            GM_setValue("GMallsearchresults", "\n" + foundtext[1]);
        }
        var rawtext=GM_getValue('GMallsearchresults','');
        
       /*if (foundtext[2].match(/picked clean/)||foundtext[2].match(/There appears to be nothing to find here/)){
            //this area has been picked clean and we know it so stop ffs
            //we are done so set search to off and output results and then quit saying nothing more to be found.
            outputsearchresults("You stopped searching as you realise there's nothing more to be found here");
            return cleanupforexit();//quit script    
        }*/
        //alert(GM_getValue('GMallsearchresults',"fail"));
        //var text=GM_getValue('GMallsearchresults',"fail");
        //alert(text.replace(/\n/),':');
        var searchrate=getsearchrate();//so we only get it once
        var numofsearchesleft=Number(GM_getValue('GMnumofsearchesleft',0));//so we only get it once
        if (numofsearchesleft==numberofsearches){//first search result. Store the search rate.
             GM_setValue('GMsearchrate',getsearchrate());
        }
            
        //alert('searchrate='+searchrate+" numofsearchesleft="+numofsearchesleft+"oldserachrate="+GM_getValue('GMsearchrate',-1));
        var lastsearchrate=GM_getValue('GMsearchrate',-1);//get the last search rate(also is curent if first search)
        //alert(searchrate<=0||numofsearchesleft==0||searchrate<lastsearchrate);
        /*if (searchrate<=0||numofsearchesleft==1||searchrate<lastsearchrate){//stop searching
            outputsearchresults("You searched " + (numberofsearches-numofsearchesleft-1) + "times");        
            return cleanupforexit();//quit script
        }*/
        if (searchrate<=0){//stop searching as nothing left to find
            //alert("1");
            var searched=(numberofsearches-numofsearchesleft+1);
            var outstring="You searched " + (searched==1?'once':searched+' times') + " before stopping as there is nothing to be found here.";
            //outstring=outstring.replace(/1 times/,'once');
            outputsearchresults(outstring);
            return cleanupforexit();//quit script
        }
        else if(numofsearchesleft==1){//time to stop on 1 because search then reduce counter
            //alert("2");
            outputsearchresults("You searched " + (numberofsearches-numofsearchesleft+1) + " times.");        
            return cleanupforexit();//quit script
        }
        else if(searchrate<lastsearchrate){
            //alert("3");
            var searched=(numberofsearches-numofsearchesleft+1);
            outputsearchresults("You searched " + (searched==1?'once':searched+' times') + " before stopping as the odds of finding something have worsened.");        
            return cleanupforexit();//quit script        
        }
        else{//we should search again!
            GM_setValue('GMsearchrate',searchrate);//remember the search rate
            GM_setValue('GMnumofsearchesleft',numofsearchesleft-1)//decrement searchcounter
            document.getElementById('AutoSearchForm').submit();//search
        }
    }
}
//else{}












//EOF
})();