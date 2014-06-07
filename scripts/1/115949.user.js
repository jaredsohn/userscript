// ==UserScript==
// @name           Light Rising Building Checker
// @namespace      http://userscripts.org/users/125692
// @description    Shows if any building tools or components are missing
// @include        *lightrising.com*game.cgi
// ==/UserScript==
(function() {
//firstly find the button. It might not always be there!
var foundbuildbuttons=document.evaluate( "//input[@value='Build']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

if(foundbuildbuttons.snapshotLength==1){

var buildbutton=foundbuildbuttons.snapshotItem(0);
var buildselect=buildbutton.nextElementSibling.nextElementSibling


//now alter width of building dropdown
buildselect.style.width='27em';//set width to be longer so can read all the things

var btextline= document.createElement("div")//where we will place the results
btextline.id="magebuildingcomponentlist";
btextline.innerHTML=""
btextline.style.marginLeft='5px';
var divwewant=buildbutton.parentNode.parentNode;
divwewant.insertBefore(btextline,buildbutton.parentNode.nextSibling );
if (!(buildselect.selectedIndex>=0)){
                    //btextline.innerHTML="";
                    btextline.innerHTML='Select Index NAN?:'+buildselect.selectedIndex;
                    buildselect.selectedIndex=0;
                    //return;
                }
//make an array as repeatedly accessing the select by index makes it fail for reasons I don't get.
var buildselectarray = new Array();
for(i=0;i<buildselect.length;i++){
    buildselectarray[i]=buildselect[i].innerHTML.match(/\((.*)\)/)[1];
}

var rchange=function(e) {
                var btextline=document.getElementById("magebuildingcomponentlist");
                var buildselect=e.target;
                if (!(buildselect.selectedIndex>=0)){
                    //btextline.innerHTML="";
                    btextline.innerHTML='Select Index NAN?:'+buildselect.selectedIndex;
                    buildselect.selectedIndex=0;
                    //return;
                }
                var buildselectarray = new Array();
                for(i=0;i<buildselect.length;i++){
                    buildselectarray[i]=buildselect[i].innerHTML.match(/\((.*)\)/)[1];//grab whole ingredient line
                }
                var index=buildselect.selectedIndex;            
                btextline.innerHTML="index is:"+index;
                //btextline.innerHTML+=" and:"+buildselect[index];
                btextline.innerHTML+=buildselectarray[index]
                //alert("yah!");
                //var craftbtextline=buildselect[index].innerHTML.match(/\((.*)\)/)[1];
                var craftbtextline=buildselectarray[index];
                var gib=document.getElementsByClassName("gamebox invbox")[0];
                var listofinventory="";
                var inventorylines=gib.getElementsByTagName('div');
                for (i=0;i<inventorylines.length ;i++ ){
                    //listofinventory=listofinventory+inventorylines[i].innerHTML+"\n";
                      listofinventory=listofinventory+
                      inventorylines[i].innerHTML.replace(/ x /,",").replace(/(s$|(s(?= of)))/,"").replace(/\bknives?\b/,"knife").replace(/\bstaves?\b/,"staff")
                      +"\n"; 
                }
                //list of inventory = long list of inventory, newline delimited
                var components=craftbtextline.split(',');//components = array of whats needed
                var gsb=document.getElementsByClassName("gamebox statsbox")[0];
                var searchtextelement=gsb.getElementsByTagName('b');
                var a=searchtextelement[1];//second bold thing is ap.
                var test=a.innerHTML.match(/(\d+)[^0-9]*(\d+)/) // extract the first 2 numbers
                var availableap=test[1];
                var outputline;
                var craftap=components[0].match(/(\d+)ap/)[1];
                //alert(components[0])
                var canbuildnum;
                outputline="<span style='color :blue;' title='AP can go negative'> Costs: </span>";
                if (Number(craftap)>Number(availableap)){
                    //outputline+="<span style='color :red;' title='Need "+ (Number(craftap)-Number(availableap))+
                    //    " more'> "+craftap+" AP </span>";
                    outputline+="<span style='color :red;' title='AP will go negative to "
                        +(Number(availableap)-Number(craftap))+"!'> "+craftap+" AP </span>";
                
                }
                else{
                    outputline+="<span> "+craftap+" AP </span>";
                }
                canbuildnum=Math.ceil(Number(availableap)/Number(craftap));//round up to account for ap can go negative
                //alert(canbuildnum)
                var toolline=false;
                var ingredientline=false;
                for (i=1;i<components.length;i++){
                    if (components[i].match(/^ a /)){//we have a tool requirement
                        if(!toolline){ 
                            outputline+="<span style='color :blue;' title='Tools only occasionally break'> Uses: </span>";
                            toolline=true;    
                        }
                         else{
                             outputline+=","
                        }
                        var tool=components[i].match(/^ a (.*)/);//get tool name
                        var toolname=tool[1].replace(/(s$|(s(?= of)))/,"");//strip plurals;
                        var toolRE=new RegExp( "\\d+,"+toolname+"s?(\n|$)");
                        if (listofinventory.match(toolRE)){
                            outputline+="<span> a "+tool[1]+"</span>";
                        }
                        else{
                            outputline+="<span style='color :red;' title='Need 1 more'> a "+tool[1]+"</span>";
// /*debug*/                  outputline+="we search for:"+toolname+ " ";                            
                            canbuildnum=0;//shockhorror we can't build any!
                            }
                    }
                    else{//we have an ingredient
                        if(!ingredientline){ 
                            outputline+="<span style='color :blue;' title='Ingredients are used up and removed from inventory'> Consumes: </span>";
                            ingredientline=true;
                        }
                        else{
                             outputline+=","
                        }    
                        var componentstring=components[i].match(/(.*)/)[1];
                        var ingredient=componentstring.match(/^ (\d+) x (.*)/);//set the 2 to i again
                        var ingredientnum=Number(ingredient[1]);
                        //var ingredientname=ingredient[2].replace(/(.*)(s\b|s$)(.*)/,"$1$2");//strip last s;
                        var ingredientname=ingredient[2].replace(/(s$|(s(?= of)))/,"");//strip plurals;
                        //var ingredientname=ingredientname.replace(/\S*\sof/,"of");//special check for "pieces of" etc
                        var ingredientname=ingredientname.replace(/\bknives?\b/,"knife");//special check for knives
                        var ingredientname=ingredientname.replace(/\bstaves?\b/,"staff");//special check for staves
                        var ingRE=new RegExp( "(\\d+),"+ingredientname+"s?(\n|$)");
                        var inventoryitem=listofinventory.match(ingRE);
                        if (inventoryitem){
                            var inventorynum=Number(inventoryitem[1]);//how many particular ingredredient we have
                        }
                        //var inventoryname=
                        if(!inventoryitem){//we have none
                            outputline+="<span style='color :red;' title='Need "+ingredientnum+
                                " more'> "+

///*debug line*/"<span style='color :blue;' title="+ingredientname+">Find:"+ ingRE +
///*debug line*/":from:"+listofinventory+"</span>"+

                                components[i]+"</span>";
                            canbuildnum=0;//shockhorror we can't build any!
                        }
                        else if ((inventoryitem)&&(ingredientnum>inventorynum)){//we don't have enough
                            //ingredient is what we need. And is bigger than what we have.
                            //we missing we need-we have. say need 10. we have 3 so we need 7 more
                            outputline+="<span style='color :red;' title='Need "+
                              (ingredientnum - inventorynum) +" more'> "+
                              //"need"+ingredientnum+":have"+inventorynum+" "+//debugline
                              //"finding"+ componentstring +" in "+ ingredient  +" "+//debugline
                              components[i]+"</span>";
                              canbuildnum=0;//shockhorror we can't build any!
                        }
                        else{//we do have enough
                            outputline+="<span> "+components[i]+"</span>";
                            var enuf4=(inventorynum/ingredientnum); //make below line shorter :) lol
                            //var enuf4=1;//we can only build 1 building here
                            canbuildnum=canbuildnum<enuf4?canbuildnum:enuf4;//select lowest
                        }
                    }
                }//end for
                if(canbuildnum>0){//if can build at least on say how many can be built
                    canbuildnum=Math.floor(canbuildnum);//get rid of fractions
                    outputline+= "<span style='color :green;' title='You possess sufficient resources to construct "+
                        canbuildnum+" of these. Though only one here :)'> Enough for "+canbuildnum+"</span>";
                }
                btextline.innerHTML="<span style='font-size:smaller;'>"+outputline+"</span>";//+" "+listofinventory;
            }
buildselect.addEventListener("change",rchange,false);
buildselect.addEventListener("DOMAttrModified",rchange,false);
buildselect.addEventListener("keypress",rchange,false);

if (buildselect.selectedIndex>0){
//manuallydoit();    
var e = new Object();
var buildbutton=document.evaluate( "//input[@value='Craft']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
e.target=buildbutton.nextElementSibling.nextElementSibling
rchange(e);
}



}//end big if foundbuild button
//EOF
})();