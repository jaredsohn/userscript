// ==UserScript==
// @name           Light Rising Tweaks
// @namespace      http://userscripts.org/users/125692
// @description    Some minor tweaks for Light Rising browser game
// @include        *lightrising.com*game.cgi
// @grant     GM_addStyle
// @version     1.5.6
// ==/UserScript==
(function() {

//#######################################################################################################
//some constants
var SRpc=0;//picked clean
var SRvlr=1;//very limited resources
var SRlr=2;//limited resources
var SRmr=3;//moderate resources
//var SRgr=4;//good resources
var SRar=4;//abundant resources

GM_addStyle("b.MageHealthBar {background-repeat:no-repeat;background-position:left bottom;          background-image:url(data:image/gif;base64,R0lGODlhAQAFAIABAACZAP%2F%2F%2FywAAAAAAQAFAAACAoRdADs%3D);}");
GM_addStyle("div.multicolumn { -moz-column-count:3; -webkit-column-count:3; column-count:3; display:block;     -moz-column-gap:1px; -webkit-column-gap:1px; column-gap:1px; white-space:pre-wrap; -moz-column-rule:1px solid grey; -webkit-column-rule:1px solid grey; column-rule:1px solid grey;vertical-align:top}");


function ucfirstletter(str){
return str.replace(/\b[A-Za-z]/,function($0) { return $0.toUpperCase(); })//capitalize first word come across
}

	function sortSelect(selElem) {
        var sellength=selElem.options.length;
        if (sellength<=1){
            //only one option so abort sort
            //return selElem.selectedIndex;
			return 0;
        }
		var tmpAry = new Array();
		var originalselindex=selElem.selectedIndex; //store original selected index for debugging
		var selvalue=selElem[selElem.selectedIndex].value;
		selElem[selElem.selectedIndex].removeAttribute('selected'); //get rid of preselect property
		var keeper=0;
		
		for (var i=0;i<sellength ;i++) {
			selElem[i].removeAttribute('selected');
			tmpAry[i] = new Array();
			tmpAry[i][0] = selElem.options[i].text.replace(/^\d\s/,"").replace(/\b[A-Za-z]/,function($0) {return $0.toUpperCase();});
			tmpAry[i][1] = selElem.options[i].value;
            tmpAry[i][3] = selElem.options[i].disabled;
		}
		tmpAry.sort(function (a,b){//this needed to ignore case and leading numbers
				var a=a[0].match(/([A-Za-z]+)/)[1].toUpperCase();
				var b=b[0].match(/([A-Za-z]+)/)[1].toUpperCase();
				return a<b?-1:b<a?1:0;
			});
		for (var i=0;i<tmpAry.length;i++) {
			selElem.options[i].text=tmpAry[i][0];
			selElem.options[i].value=tmpAry[i][1];
			if(selElem.options[i].value==selvalue){keeper=i;}
			 selElem.options[i].disabled=tmpAry[i][3];
		}
		selElem.selectedIndex=keeper;
		selElem[keeper].selected = true; //this might work better
		let evt = document.createEvent("HTMLEvents");
		evt.initEvent("change", true, true )
		selElem.dispatchEvent(evt);
		return keeper;//so we can cludge it into updating the dropdown to show the actually selected option.
	}
	

var rdropbutton=function(e){
    e.preventDefault();
    //alert('Dropping');

    var dropform=e.target.form;
    var itemselect=dropform.elements[3];
    //alert(itemselect.name);
    var selecteditem=itemselect[itemselect.selectedIndex];
    var selvalue=selecteditem.value;
//alert(selvalue);
    var warnondropvalues=['207','215','35','275','1020'];
//alert(warnondropvalues.indexOf(selvalue))
    if (warnondropvalues.indexOf(selvalue)!=-1){
        var rval=confirm("Do you REALLY want to drop "+selecteditem.textContent+"!?");
        if (rval){
//alert("dropingrestricteditemsnotallowedrightnow");
              e.target.form.submit();
        }
        return rval;
    }
    else{
//alert("drop");
        e.target.form.submit();
    }
}



//grab a few of the important bit of the page for later use.
var gab=document.getElementsByClassName("gamebox actionbox")[0];
var gsb=document.getElementsByClassName("gamebox statsbox")[0];
var gib=document.getElementsByClassName("gamebox infobox")[0];
var attackbuttons=document.evaluate(
					".//input[@value='Attack']",//it might need the leading '.'
					gab,                        //as it is limited to gab
					null,
					XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
					null);//look for attack button
var attackbutton=false;
if(attackbuttons.snapshotLength>0){
	attackbutton=attackbuttons.snapshotItem(0);
}


//#######################################################################################################
//then set ap hp hunger red if less than 10% left
var searchtextelement=gsb.getElementsByTagName('b');
if (searchtextelement){//foundsomething
	for(i=0;i<3;i++){
		a=searchtextelement[i];
		test=a.innerHTML.match(/(-?\d+)[^0-9]*(\d+)/) // extract the first 2 numbers
		if(test){
			var percent=100*(Number(test[1])/Number(test[2]));//so only calc once
            a.className='MageHealthBar'; //put a % bar underneath the values
            a.style.backgroundSize=''+percent+'% 15%'; 

            //if (100*(Number(test[1])/Number(test[2]))<1){//bugfix for 0 values
			if (Number(test[1])<1){//bugfix for 0 (and negative) values. So we have either 0HP or O(or less!)AP
				a.style.color='red'; //colour it red in the stat bar
				if (i==1&&gab){//WE HAVE RUN OUT OF AP. NO message as it messes up page. Just a red border
					gab.style.borderBottomColor='red';
					gab.style.borderLeftColor='orangered';//='gold';
					gab.style.borderRightColor='red';
					gab.style.borderTopColor='orangered';    
				}
			}
			else if (percent<=5){//nearly out. paint box red.
				a.style.color='red';
				if (i==0&&attackbutton)
					{
						attackbutton.style.color='red';
						attackbutton.title='CRITICALLY LOW HEALTH!!!';
					}
				else if (i==1&&gab){//ap low. colour border of action box red
					var textline= document.createElement("p");
					textline.style.position='relative';
					textline.style.left="35%";
					textline.style.top="-5px";
					textline.innerHTML="WARNING : VERY LOW AP";
					textline.style.fontSize='smaller';
					textline.style.zIndex="2";
					textline.style.display='inline';
					textline.style.lineHeight='0px';
					textline.style.align='center';  
					gab.firstChild.parentNode.insertBefore(textline,gab.firstChild);
					gab.style.borderBottomColor='red';
					gab.style.borderLeftColor='orangered';
					gab.style.borderRightColor='red';
					gab.style.borderTopColor='orangered';    
				}
			}

			else if (percent<=10){
				a.style.color='red';
				if (i==0&&attackbutton)
					{
						attackbutton.style.color='red';
						attackbutton.title='VERY LOW HEALTH!!';
					}
				else if (i==1&&gab){//ap low. colour border of action box red
					var textline= document.createElement("p");
					textline.style.position='relative';
					textline.style.left="35%";
					textline.style.top="-5px";
					textline.innerHTML="WARNING : LOW AP";
					textline.style.fontSize='smaller';
					textline.style.zIndex="2";
					textline.style.display='inline';
					textline.style.lineHeight='0px';
					textline.style.align='center';  
					gab.firstChild.parentNode.insertBefore(textline,gab.firstChild);
					gab.style.borderBottomColor='darkorange';
					gab.style.borderLeftColor='orange';//='gold';
					gab.style.borderRightColor='darkorange';
					gab.style.borderTopColor='orange';    
				}
			}

			else if (percent<=30){
				a.style.color='darkorange';
				if (i==0&&attackbutton)
					{
						attackbutton.style.color='darkorange';
						attackbutton.title='LOW HEALTH!';
					}
			}
			else if (percent<=75){
				if (i==0)
					{   
                        a.style.color='orange';
					}
			}
            else if (percent<=95){
				if (i==0)
					{		a.style.color='green';
						
					}
            }
            else if (percent>95){
				if (i==0)
					{		
                        a.style.color='#00ae00';
					}
			}
		}
	}
}


//TWEAK Colour find rates
var gibhtml=gib.innerHTML;
if (gibhtml.match(/<b>Searching the area/)){
	gibhtml=gib.innerHTML.replace(/(This area appears to have been picked clean.)/,
		"<span id='searchrate' value='"+SRpc+"' style='color:red;'>$1</span>"); 
	if (gibhtml.match(/very limited resources/)){
		gibhtml=gibhtml.replace(/(very limited resources)/,
			"<span id='searchrate' value='"+SRvlr+"' style='color :red;'>$1</span>")
	}
	else if(gibhtml.match(/limited resources/)){  //need to be else if to stop over writing previous replace.
		gibhtml=gibhtml.replace(/(limited resources)/,
			"<span id='searchrate' value='"+SRlr+"' style='color :crimson;'>$1</span>");
	}
	else{
		gibhtml=gibhtml.replace(/(moderate resources)/,
			"<span id='searchrate' value='"+SRmr+"' style='color :darkorange;'>$1</span>");
		gibhtml=gibhtml.replace(/(abundant resources)/,
			"<span id='searchrate' value='"+SRar+"' style='color :limegreen;'>$1</span>");
	}
	gib.innerHTML=gibhtml;//write changes
}
else if (gibhtml.match(/There appears to be nothing to find here./)){
	gibhtml=gibhtml.replace(/(There appears to be nothing to find here.)/,
		"<span id='searchrate' value='"+SRpc+"' style='color :red;'>$1</span>");
	gib.innerHTML=gibhtml;//write changes
}


//TWEAK Add ap cost to undazing items
//currently only the tea
//Because I keep forgetting its 25ap other 50ap self\
//this must go before the sorting tweak as it fucks it up otherwise.
var alluseinput=document.evaluate( "//input[@value='use']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (alluseinput.snapshotLength>0){
    var useinput=alluseinput.snapshotItem(0);
    //var useselect=useform.item;
    var useselect=useinput.form.getElementsByTagName("select")[0];//first one
    var useselectlength=useselect.length;
	var selindex=0;
    for (i=0;i<useselectlength;i++){
		if (useselect[i].hasAttribute('selected')){
			selindex=i;
		}
		if(useselect[i].value=="13"){//herbaltea
            useselect[i].textContent=useselect[i].textContent+" 25-50AP";
        //break;
        }
		if (useselect[i].hasAttribute('selected')){
			selindex=i;
		}
    }
	useselect.selectedIndex=selindex;
	//alert(selindex);
	//useselect.options[selindex].text+="";//CLUGDE FIX SELECT FOCUS BEING FUBARED
}

//TWEAK sort the invertory & storage unit selects.
//give select
var itemselects=document.evaluate( "//select[@name='item']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if(itemselects.snapshotLength>0){
	var itemselect;
	var indextoselect=0;
	for(i=0;itemselect=itemselects.snapshotItem(i);i++){
			let selindex=sortSelect(itemselect);
	}
}
    

//sort inventory
if(document.getElementsByClassName("gamebox infobox")){//just a check to see that its there before we continue
	var ginvbox=document.getElementsByClassName("gamebox invbox")[0];
	var lotsadivs=ginvbox.getElementsByTagName('div');
	//so we have a whole lot of divs. each div is a inventory entry.
	// we must preserve title text and text contents
	//and sort them.
		var tmpAry = new Array();
		var invlength=lotsadivs.length;
		for (var i=0;i<invlength ;i++) {
			tmpAry[i] = new Array();
			//tmpAry[i][0] = lotsadivs[i].innerHTML;//keep the innerHTML of each div
			tmpAry[i][0] = lotsadivs[i].textContent;//try textcontent instead of innerHTML
			tmpAry[i][1] = lotsadivs[i].title;//keep the title text
			//tmpAry[i][2] = selElem.options[i].selected;
		}
		tmpAry.sort(function (a,b){
				var a=a[0].match(/\d+ x ([A-Za-z]+)/)[1];//ignore the "### x " bit of each inventory entry
				var b=b[0].match(/\d+ x ([A-Za-z]+)/)[1];
				return a<b?-1:b<a?1:0;
			});
		for (var i=0;i<tmpAry.length;i++) {
			//lotsadivs[i].innerHTML=tmpAry[i][0];
			lotsadivs[i].textContent=tmpAry[i][0]//.replace(/(\d+) (x)/,"$1\t$2");//tabbify
			lotsadivs[i].title=tmpAry[i][1];
			//selElem.options[i].selected=tmpAry[i][2];
		}

 GM_addStyle("div.invcolumns{border:1px solid grey; \
    font-size: smaller; -moz-column-count:3; -webkit-column-count:3; column-count:3; display:block; \
    -moz-column-gap:1px; -webkit-column-gap:1px; column-gap:1px; white-space:pre-wrap; \
    -moz-column-rule:1px solid grey; -webkit-column-rule:1px solid grey; column-rule:1px solid grey; }");
ginvbox.innerHTML=ginvbox.innerHTML.replace(/<hr>\s+<i>You are carrying:<\/i>\s+/,"<div class='invcolumns'>").replace(/<hr>/,"</div>");



}

// !for reference!   var gib=document.getElementsByClassName("gamebox infobox")[0];

if(gib.getElementsByClassName('small')&&gib.innerHTML.match(/There is a( \w+)? storage unit here/)){

   //add style for inventory units
   GM_addStyle("span.smallinv{border:1px solid grey; letter-spacing:-.3px; tab-size: 10;-moz-tab-size:10;-o-tab-size:10; \
    font-size: .85em; -moz-column-count:3; -webkit-column-count:3; column-count:3; display:block; \
    -moz-column-gap:1px; -webkit-column-gap:1px; column-gap:1px;  white-space:pre-wrap; \
    -moz-column-rule:1px solid grey; -webkit-column-rule:1px solid grey; column-rule:1px solid grey;} \
    smallinvitem{ tab-size: 10;-moz-tab-size:10;-o-tab-size:10;display:block; text-indent: -3em; padding-left : 3em; }");
 //removed from above these styles -> font-family:Tahoma, Geneva, sans-serif; letter-spacing:-.3px;font-stretch:narrower;
 
 
   var allsmall=gib.getElementsByClassName('small');
    var smallspan=allsmall[0];
    var previoustext=smallspan.previousSibling;



    smallspan.className="smallinv";//new class for the span to make it better. requires stylish for new class
    //smallspan.innerHTML=smallspan.innerHTML.replace(/(>, <)|(> and <)/g,"><br /> <");
    smallspan.innerHTML=smallspan.innerHTML.replace(/(>, <)|(> and <)/g,"><");
    
    //smallspan.innerHTML=smallspan.innerHTML.replace(/div/g,"span");
    smallspan.innerHTML=smallspan.innerHTML.replace(/style="display:inline"/g,"");
    //var lotsadivs=ginvbox.getElementsByTagName('div');
	//so we have a whole lot of divs. each div is a inventory entry.
	// we must preserve title text and text contents
	//and sort them.
    //var alldivs=smallspan.getElementsByTagName('span');
   var alldivs=smallspan.getElementsByTagName('div');
   
		var tmpAry = new Array();
		var invlength=alldivs.length;
		for (var i=0;i<invlength ;i++) {
			tmpAry[i] = new Array();
			//tmpAry[i][0] = lotsadivs[i].innerHTML;//keep the innerHTML of each div
			//tmpAry[i][0] = alldivs[i].textContent.replace(/(^[0-9]( ))|((^[0-9][0-9]) )/,"$1$2$3 ");//try textcontent instead of innerHTML
			//tmpAry[i][0] = alldivs[i].textContent.replace(/(^[0-9]{1,2}) /,"$1\t");//try textcontent instead of innerHTML
            tmpAry[i][0] = alldivs[i].textContent.replace(/(^\d+) /,"$1\t");//try textcontent instead of innerHTML
            tmpAry[i][1] = alldivs[i].title;//keep the title text
			//tmpAry[i][2] = selElem.options[i].selected;
		}
		tmpAry.sort(function (a,b){
				var a=a[0].match(/\d+\s+([A-Za-z]+)/)[1];//ignore the "###  " bit of each inventory entry
				var b=b[0].match(/\d+\s+([A-Za-z]+)/)[1];
				return a<b?-1:b<a?1:0;
			});
		for (var i=0;i<tmpAry.length;i++) {
			//lotsadivs[i].innerHTML=tmpAry[i][0];
			alldivs[i].textContent=tmpAry[i][0];
			alldivs[i].title=tmpAry[i][1];
            alldivs[i].className="smallinvitem";//    <----set in stylish!
			//selElem.options[i].selected=tmpAry[i][2];
		}
     //var a;
    //for(i=0;a=alldivs[i];i++){
    //    a.style.display='block';
    //}

        if(gib.innerHTML.match(/Written on the storage unit are the words/)){
        //previoustext.wholeText=previoustext.wholeText.replace(/, containing: /,""); 
        smallspan.parentNode.insertBefore(smallspan.nextSibling,smallspan);//the string written...
        smallspan.parentNode.insertBefore(smallspan.nextSibling,smallspan);//whats written
        smallspan.parentNode.insertBefore(document.createTextNode(' It contains:'),smallspan)
        gib.innerHTML=gib.innerHTML.replace(/(There is a( debilitated)? storage unit here), containing: /,"$1");
        //put this ahead of inventory box

    }

}

//stop dropping credits
var dropbuttons=document.evaluate( "//input[@value='Drop']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
if(dropbuttons.snapshotLength>0){//only if we found something
    var dropbutton=dropbuttons.snapshotItem(0)
    var dropselect=dropbutton.parentNode.getElementsByTagName("select")[1];//second?
    var dropselectlength=dropselect.length;
    for (i=0;i<dropselectlength;i++){
        if(dropselect[i].value=="215"||dropselect[i].value=="1020"){//also don't drop my custom weapon
           dropselect[i].disabled=true;
        }
    }//setup confirm dialog
    dropbutton.addEventListener("click",rdropbutton,false);
}


//EOF
})();