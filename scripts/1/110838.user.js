// ==UserScript==
// @name           Light Rising Crafting Checker
// @namespace      http://userscripts.org/users/125692
// @description    Shows if any crafting tools or ingredients are missing
// @include        *lightrising.com*game.cgi
// @grant none
// @version 1.1 
// ==/UserScript==
(function() {

function ucfirstletter(str){
return str.replace(/\b[A-Za-z]/,function($0) { return $0.toUpperCase(); })//capitalize first word come across
}
function sortSelect(selElem) {
		var tmpAry = new Array();
        var sellength=selElem.options.length;
		for (var i=0;i<sellength ;i++) {
			tmpAry[i] = new Array();
			tmpAry[i][0] = ucfirstletter(selElem.options[i].text).replace(/^1 /,"");//Capitalize & strip leading 1
			tmpAry[i][1] = selElem.options[i].value;
            tmpAry[i][2] = selElem.options[i].selected;
		}
		tmpAry.sort(function (a,b){//this needed to ignore case and leading numbers
                var a=a[0].match(/([A-Za-z]+)/)[1].toUpperCase();
                var b=b[0].match(/([A-Za-z]+)/)[1].toUpperCase();
                return a<b?-1:b<a?1:0;
            });
		//while (craftselect.options.length > 0) {
		//    craftselect.options[0] = null;
		//}
        //for (var i=sellength-1; i>-1;i--){
        //    selElem.options[i]=null;
        //}   
        //the abouve null code doesn;t work in practice for some unknown reason. works in shell though :(?

		for (var i=0;i<tmpAry.length;i++) {
			//var op = new Option(tmpAry[i][0], tmpAry[i][1]);
			//selElem.options[i] = op;
            selElem.options[i].text=tmpAry[i][0];
            selElem.options[i].value=tmpAry[i][1];
            selElem.options[i].selected=tmpAry[i][2];
		}
		return;
	}

//now alter width of crafting dropdown
var craftbutton=document.evaluate( "//input[@value='Craft']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
craftbutton.id="CraftButton";//name so easily found later
var craftselect=craftbutton.nextElementSibling.nextElementSibling
craftselect.style.width='27em';//set width to be longer so can read all the things

//sort craft select
/*
//strip first digit if it is 1
function ucfirstletter(str){
return str.replace(/^1 /,"")
}
*/

//this function from stackoverflow then modified to work here.
sortSelect(craftselect);

var textline= document.createElement("div")//where we will place the results
textline.id="magecomponentlist";
textline.innerHTML=""
textline.style.marginLeft='5px';
var divwewant=craftbutton.parentNode.parentNode;
divwewant.insertBefore(textline,craftbutton.parentNode.nextSibling );
if (!(craftselect.selectedIndex>=0)){
                    //textline.innerHTML="";
                    textline.innerHTML='Select Index NAN?:'+craftselect.selectedIndex;
                    craftselect.selectedIndex=0;
                    //return;
                }
//make an array as repeatedly accessing the select by index makes it fail for reasons I don't get.
var craftselectarray = new Array();
for(i=0;i<craftselect.length;i++){
    craftselectarray[i]=craftselect[i].innerHTML.match(/\((.*)\)/)[1];
}

var rchange=function(e) {
                var craftbutton=document.getElementById("CraftButton");
                var textline=document.getElementById("magecomponentlist");
                var craftselect=e.target;
                if (!(craftselect.selectedIndex>=0)){
                    //textline.innerHTML="";
                    textline.innerHTML='Select Index NAN?:'+craftselect.selectedIndex;
                    craftselect.selectedIndex=0;
                    //return;
                }
                var craftselectarray = new Array();
                for(i=0;i<craftselect.length;i++){
                    craftselectarray[i]=craftselect[i].innerHTML.match(/\((.*)\)/)[1];//grab whole ingredient line
                }
                var index=craftselect.selectedIndex;            
                textline.innerHTML="index is:"+index;
                //textline.innerHTML+=" and:"+craftselect[index];
                textline.innerHTML+=craftselectarray[index]
                //alert("yah!");
                //var crafttextline=craftselect[index].innerHTML.match(/\((.*)\)/)[1];
                var crafttextline=craftselectarray[index];
                var gib=document.getElementsByClassName("gamebox invbox")[0];
                var listofinventory="";
                var inventorylines=gib.getElementsByTagName('div');
                for (i=0;i<inventorylines.length ;i++ ){
                    //listofinventory=listofinventory+inventorylines[i].innerHTML+"\n";
                      listofinventory=listofinventory+
                      inventorylines[i].innerHTML.replace(/ x /,",").replace(/(s$|(s(?= of)))/,"").replace(/\bknives?\b/,"knife").replace(/\bstaves?\b/,"staff").replace(/\bglasses?\b/,"glass")
                      +"\n"; 
                }
                //list of inventory = long list of inventory, newline delimited
                var components=crafttextline.split(',');//components = array of whats needed
                var gsb=document.getElementsByClassName("gamebox statsbox")[0];
                var searchtextelement=gsb.getElementsByTagName('b');
                var a=searchtextelement[1];//second bold thing is ap.
                var test=a.innerHTML.match(/(\d+)[^0-9]*(\d+)/) // extract the first 2 numbers
                var availableap=test[1];
                var outputline;
                var craftap=components[0].match(/\d+/);
                var canbuildnum;
                outputline="<span style='color :blue;' title='AP can go negative'> Costs: </span>";
                canbuildnum=Math.ceil(Number(availableap)/Number(craftap));//round up to account for ap can go negative
                if (Number(craftap)>Number(availableap)){
                    //outputline+="<span style='color :red;' title='Need "+ (Number(craftap)-Number(availableap))+
                    //    " more'> "+craftap+" AP </span>";
                    outputline+="<span style='color :red;' title='AP will go negative to "
                        +(Number(availableap)-Number(craftap))+"!'> "+craftap+" AP </span>";
                    craftbutton.style.color="red";
                }
                else{//can build at least one
                    if(canbuildnum==2){//we have ap for 2(though may have low ap afterwards so orange warning
                        outputline+="<span style='color :darkorange;' title='AP will go to "
                        +(Number(availableap)-Number(craftap))+"!'> "+craftap+" AP </span>";
                        craftbutton.style.color="darkorange";
                    }
                    else{
                        outputline+="<span> "+craftap+" AP </span>";
                        craftbutton.style.color="black";    
                    }
                }
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
                        var ingredientname=ingredientname.replace(/\bglasses?\b/,"glass");
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
                            canbuildnum=canbuildnum<enuf4?canbuildnum:enuf4;//select lowest
                        }
                    }
                }//end for
                if(canbuildnum>0){//if can build at least on say how many can be built
                    canbuildnum=Math.floor(canbuildnum);//get rid of fractions
                    outputline+= "<span style='color :green;' title='You possess sufficient resources to construct "+
                        canbuildnum+" of these'> Enough for "+canbuildnum+"</span>";
                    craftbutton.style.removeProperty('background-color');
                    //craftbutton.style.setProperty('color',"black",null);
                }
                else{
                    craftbutton.style.setProperty('background-color',"whitesmoke",null);
                    craftbutton.style.setProperty('color',"darkgrey ",null);
                }    
                
                textline.innerHTML="<span style='font-size:smaller;'>"+outputline+"</span>";//+" "+listofinventory;
            }
craftselect.addEventListener("change",rchange,false);
//craftselect.addEventListener("DOMAttrModified",rchange,false);
craftselect.addEventListener("keypress",rchange,false);

if (craftselect.selectedIndex>0){
//manuallydoit();    
var e = new Object();
var craftbutton=document.evaluate( "//input[@value='Craft']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
e.target=craftbutton.nextElementSibling.nextElementSibling
rchange(e);
}


//EOF
})();