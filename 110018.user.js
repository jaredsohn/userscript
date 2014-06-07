// ==UserScript==
// @name           Shintolin Tweaks
// @namespace      http://userscripts.org/users/125692
// @description    Tweaks for Shintolin Browser Game
// @include        http://www.shintolin.co.uk/game.cgi
// @include        *shintolin.co*game.cgi
// @grant          none
// @version        1.2
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
var SRvar=5;//very abundant resources



function ucfirstletter(str){
return str.replace(/\b[A-Za-z]/,function($0) { return $0.toUpperCase(); })//capitalize first word come across
}

function sortSelect(selElem) {
	var tmpAry = new Array();
	var sellength=selElem.options.length;
	var selvalue=selElem[selElem.selectedIndex].value;
	selElem[selElem.selectedIndex].removeAttribute('selected');
	var keeper;
	for (var i=0;i<sellength ;i++) {
		tmpAry[i] = new Array();
		tmpAry[i][0] = selElem.options[i].text;
		tmpAry[i][1] = selElem.options[i].value;
		//tmpAry[i][2] = selElem.options[i].selected;
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
		if(selElem.options[i].value==selvalue){selElem[i].setAttribute('selected',"selected");keeper=i;}
		//selElem.options[i].selected=tmpAry[i][2];
		selElem.options[i].disabled=tmpAry[i][3];
	}
	selElem.selectedIndex=keeper;
	return;
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
			else if (100*(Number(test[1])/Number(test[2]))<=5){//nearly out. paint box red.
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
			else if (100*(Number(test[1])/Number(test[2]))<=10){
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
			else if (100*(Number(test[1])/Number(test[2]))<=30){
				a.style.color='darkorange';
				if (i==0&&attackbutton)
					{
						attackbutton.style.color='darkorange';
						attackbutton.title='LOW HEALTH!';
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
	else if(gibhtml.match(/very abundant resources/)){
        gibhtml=gibhtml.replace(/(very abundant resources)/,
			"<span id='searchrate' value='"+SRar+"' style='color :limeGreen;'>$1</span>");
	}
    else{
		gibhtml=gibhtml.replace(/(moderate resources)/,
			"<span id='searchrate' value='"+SRmr+"' style='color :darkorange;'>$1</span>");
		gibhtml=gibhtml.replace(/(abundant resources)/,
			"<span id='searchrate' value='"+SRar+"' style='color :forestgreen;'>$1</span>");
	}
	gib.innerHTML=gibhtml;//write changes
}
else if (gibhtml.match(/There appears to be nothing to find here./)){
	gibhtml=gibhtml.replace(/(There appears to be nothing to find here.)/,
		"<span id='searchrate' value='"+SRpc+"' style='color :red;'>$1</span>");
	gib.innerHTML=gibhtml;//write changes
}


//TWEAK sort the invertory & storage unit selects.
//give select
var itemselects=document.evaluate( "//select[@name='item']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if(itemselects.snapshotLength>0){
	var itemselect;
	for(i=0;itemselect=itemselects.snapshotItem(i);i++){
		sortSelect(itemselect);
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
			lotsadivs[i].textContent=tmpAry[i][0];
			lotsadivs[i].title=tmpAry[i][1];
			//selElem.options[i].selected=tmpAry[i][2];
		}
}





//EOF
})();
