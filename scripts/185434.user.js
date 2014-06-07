// ==UserScript==
// @name        Light Rising Craft Lock 
// @namespace   http://userscripts.org/users/125692
// @description Remember a craft or build option. Handy when getting components.
// @include     *lightrising.com*game.cgi
// @version     1.1.1
// @grant          GM_getValue
// @grant          GM_setValue 
// ==/UserScript==
//This script adds checkbox next to the crafting options and building options if they are present
//checking the box stores the currently selected item and then new page loads will have that item
//selected automatically until the box is cleared.
//Intended as a companion script to my building and crafting cheacker scripts.
//1.1.1 - some styling to make it look a bit better
(function() {

//first check if script is needed. search for craft  or build option.
var craftbutton=document.evaluate( "//input[@value='Craft']", document, null, 
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
var buildbutton=document.evaluate( "//input[@value='Build']", document, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
if(!(craftbutton||buildbutton)){
	//alert("oh noes!");
	return;//abort as no buttons.
}

//this copied off the web
//http://stackoverflow.com/questions/9447950/script-to-save-settings
// for chrome
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}
//alert("here");
//set up click event funtion
var craftlockclick=function(e) {
	if(e.target.checked){//then we JUST checked it!
		GM_setValue('craftlock',e.target.form.item[e.target.form.item.selectedIndex].value);
	}
	else{//we JUST cleared it!
		GM_setValue('craftlock',-1);
	}
}
var buildlockclick=function(e) {
	if(e.target.checked){//then we JUST checked it!
		GM_setValue('buildlock',e.target.form.building[e.target.form.building.selectedIndex].value);
		GM_setValue('buildlist',e.target.form.building[e.target.form.building.selectedIndex].text);
	}
	else{//we JUST cleared it!
		GM_setValue('buildlock',-1);

	}
}
buildlockclearclick=function(e) {
	if(e.target.checked){//then we JUST checked it!
		GM_setValue('buildlock',e.target.value);
	}
	else{//we JUST cleared it!
		GM_setValue('buildlock',-1);
	}
}

if(craftbutton){
	//alert("here!");
    //if there is a craft button we do craft button
	//Grab current value of the checkbox.
	//positive values mean is set. value is value of item to set select to. negative means cleared.
	var craftinglockvalue =  GM_getValue('craftlock',-1);
	//now set up two check boxes.
	var craftlockbox=document.createElement('input');
	craftlockbox.type='checkbox';
	craftlockbox.setAttribute('name','craftlock');
	craftlockbox.setAttribute('id','craftlock');
	craftlockbox.style.setProperty('vertical-align',"middle",null);
	craftlockbox.title="Lock this item";
	//buildlockbox.setAttribute('title','lock this crafting item');
	//alert("and there!");
	craftlockbox.checked=(craftinglockvalue > 0);
	var craftform=craftbutton.form;
	craftform.appendChild(craftlockbox);//add the lockbox.
	craftlockbox.addEventListener("click",craftlockclick,false);
	
	if(craftinglockvalue>=0){//we have a value stored. set the select to it.
		let craftselect=craftbutton.form.item;
		let sellength=craftselect.options.length; 
		if(craftselect.value!=craftinglockvalue){//we are not selecting the right item.
			for (let i=0;i<sellength;i++) {
				if(craftselect[i].value==craftinglockvalue){
					craftselect.selectedIndex=i;
					let evt = document.createEvent("HTMLEvents");
					evt.initEvent("change", true, true )
					craftselect.dispatchEvent(evt);//dispatch an onchange event so other scripts can notice select has changed
					break;//stop looping. we found what we wanted.
				}
			}
		}
	}
	
}

if(buildbutton){//there is a build button so do the building option
	//Grab current value of the checkbox.
	//positive values mean is set. value is value of item to set select to. negative means cleared.
	var buildinglockvalue =  GM_getValue('buildlock',-1);
	//alert("buildinglockvalue:"+buildinglockvalue);
	//now set up two check boxes.
	var buildlockbox=document.createElement('input');
	buildlockbox.type='checkbox';
	buildlockbox.setAttribute('name','buildlock');
	buildlockbox.setAttribute('id','buildlock');
	buildlockbox.style.setProperty('vertical-align',"middle",null);
	buildlockbox.title="Lock this item";
	//buildlockbox.setAttribute('title','lock this building item');
	buildlockbox.checked=(buildinglockvalue > 0);
	buildlockbox.addEventListener("click",buildlockclick,false);
	//var buildform=buildbutton.form;
	buildbutton.form.appendChild(buildlockbox);//add the lockbox.

	if(buildinglockvalue>=0){//we have a value stored. set the select to it.
	
		let buildselect=buildbutton.form.building;
		let sellength=buildselect.options.length; 
		if(buildselect.value!=buildinglockvalue){//we are not selecting the right item.
			//try and select the right thing
			for (let i=0;i<sellength;i++) {
				if(buildselect[i].value==buildinglockvalue){
					buildselect.selectedIndex=i;
					let evt = document.createEvent("HTMLEvents");
					evt.initEvent("change", true, true )
					buildselect.dispatchEvent(evt);//dispatch an onchange event so other scripts can notice select has changed
					break;//stop looping. we found what we wanted.
				}
			}
		}
		
		if(buildselect.value!=buildinglockvalue){
				
				//we are STILL not selecting the right item
				//if still don't match then we have issue. We can't build what we want here even though we can build some things!
				//solution?
				//append the item to the list?
				//need to check with shintolin to see if this breaks things.
				//specifically whether it allows a character to build something they shouldn't be able to
				//alert("we can build here just not what we have stored");
				let buildinglockoption=document.createElement('option');
				buildinglockoption.text=GM_getValue('buildlist',"Lock Build Error. Tell Kiwimage about seeing this");
				buildinglockoption.value=buildinglockvalue;
				
				buildbutton.form.building.add(buildinglockoption,null);
				//to disuade players from clicking make button greyed
				buildbutton.style.setProperty('background-color',"whitesmoke",null);
				buildbutton.style.setProperty('color',"darkgrey ",null);
				
				sellength+=1;
				for (let i=0;i<sellength;i++) {
					if(buildselect[i].value==buildinglockvalue){
						buildselect.selectedIndex=i;
						let evt = document.createEvent("HTMLEvents");
						evt.initEvent("change", true, true )
						buildselect.dispatchEvent(evt);//dispatch an onchange event so other scripts can notice select has changed
						break;//stop looping. we found what we wanted.
					}
				}
		}	
	}
	
}
else if(GM_getValue('buildlock',-1)>=0&&(craftbutton)){//there isn't a build select but we have a build selected. yet there is a craft button so we haven't run out of ap/died etc.
	 //fake it?
	
	//bah add a dumb line about what we want as a stop gap.
	//let buildinglockdiv=document.createElement('div');
	//buildinglockdiv.innerHTML="Building : "+GM_getValue('buildlist',"Lock Build Error. Tell Kiwimage about seeing this");
	//buildinglockdiv.style.fontSize='smaller';
	
	let buildinglockvalue =  GM_getValue('buildlock',-1);
	
	var buildlockbox=document.createElement('input');
	buildlockbox.type='checkbox';
	buildlockbox.setAttribute('name','buildlock');
	buildlockbox.setAttribute('id','buildlock');
	buildlockbox.style.setProperty('vertical-align',"middle",null);

	buildlockbox.setAttribute('value',buildinglockvalue);//store the value here
	
	buildlockbox.title="Lock this item";
	buildlockbox.checked=(buildinglockvalue > 0);
	buildlockbox.addEventListener("click",buildlockclearclick,false);
	//var buildform=buildbutton.form;
	
	//then insert the div and the tickbox.
	let givebutton=document.evaluate( "//input[@value='Give']", document, null, 
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	if(!givebutton){return}//silently stop on this error
	

//	buildinglockdiv.appendChild(buildlockbox);
	
	//bah that looked ugly.
	//Lets try faking a form
	let newbuildinglockform=document.createElement('form');
	let newbuildinglockselect=document.createElement('select');
	let newbuildinglockoption=document.createElement('option');
	let newbuildinglockbutton=document.createElement('input');
	newbuildinglockbutton.type='button'
	newbuildinglockbutton.value='Build'
	
	newbuildinglockbutton.style.setProperty('background-color',"whitesmoke",null);
	newbuildinglockbutton.style.setProperty('color',"darkgrey ",null);
	
	newbuildinglockoption.text=GM_getValue('buildlist',"Lock Build Error. Tell Kiwimage about seeing this");
	newbuildinglockoption.value=buildinglockvalue;
	
	newbuildinglockselect.style.setProperty('width',"27em",null);//match width of selects from other script
	newbuildinglockselect.add(newbuildinglockoption,null);
	newbuildinglockform.appendChild(newbuildinglockbutton);
	newbuildinglockform.appendChild(newbuildinglockselect);
	newbuildinglockform.appendChild(buildlockbox);
	
	givebutton.form.parentNode.insertBefore(newbuildinglockform,givebutton.form);
	
	var btextline= document.createElement("div");//where we will place the results
	btextline.id="magebuildingcomponentlist";
	
                var buildselect=newbuildinglockselect;
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
                      inventorylines[i].innerHTML.replace(/ x /,",").replace(/(s$|(s(?= of)))/,"").replace(/\bknives?\b/,"knife").replace(/\bstaves?\b/,"staff").replace(/\bglasses?\b/,"glass")
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
						var ingredientname=ingredientname.replace(/\bglasses?\b/,"glass");//special check for glasses
						
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

				
	givebutton.form.parentNode.insertBefore(btextline,givebutton.form);				
}



//EOF
})();
