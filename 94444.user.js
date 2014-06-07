// ==UserScript==
// @name           Spread Quoter
// @namespace      http://junk.com
// @description    Quote spread prices at bid/ask/mid
// @include        https://www.optionshouse.com/m
// ==/UserScript==
/* to do:
1. make a history div for each active spread to track hi, lo, etc.
2. create a 2nd level of calculation for calendar straddles
*/

//pirate these vars from unsafeWindow: msgNum, sWait (convert to func)
//alert(unsafeWindow.allowMsgs)
unsafeWindow.msgNum = new Array()
unsafeWindow.top.KAMax = 300
//alert(unsafeWindow.top.KAMax)
var entireBody = unsafeWindow.document.getElementsByTagName('body');
entireBody[0].onclick=function(e){
	//getOnClicks(this.tagName,this.id,this.className);
	//  && e.target.innerHTML.indexOf("<table")==-1
	var alen, i, spreads, uniqueID, months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
	if (e.target.id.indexOf("series_201")==0){
		//check if already registered:
		if (e.target.innerHTML.indexOf("<table")>-1) return //to do: unreg on 2nd clk
		//otherwise, add strike to table of active strikes
		alen = unsafeWindow.msgNum.length
		//alert(alen)
		unsafeWindow.msgNum[alen] = e.target
		//alert(e.target.id)
		// set only first time:
		if (alen == 0) setInterval("sWait(msgNum)",1000);
	}
	// rpb added calspreadlink ids for linking to other series
	if (e.target.id.indexOf("calspreadlink")==0){
		//alert(e.target.id.substr(13))
		spreads = unsafeWindow.msgNum
		//3 states: link (nothing), waiting, another's midpoint id
		//1. check to see if anything is waiting:
		//alert(spreads.length)
		for (i=0;i<spreads.length;i++) {
			uniqueID = spreads[i].id.substr(7)
			if (document.getElementById("calspreadlink"+uniqueID).getAttribute("linksto")=="waiting"){ 
				break
			}
			//alert(uniqueID)
			//alert("calspreadlink"+uniqueID)
			//alert(document.getElementById("calspreadlink"+uniqueID).getAttribute("linksto"))
		}
		//if nothing is waiting, change current status to waiting
		if (i==spreads.length){
			//alert("nothing waiting, now waiting")
			e.target.innerHTML = "waiting"
			e.target.title = "waiting"
			e.target.setAttribute("linksto","waiting")
		}
		//if something is waiting, first check to see if it's THIS one
		else {
		//if THIS, then change status back to "link" (cancel it)
			//alert(spreads[i].id.substr(7)+"|"+e.target.id.substr(13))
			if (spreads[i].id.substr(7) == e.target.id.substr(13)){
				//alert("clicked same link, canceling back to link")
				e.target.innerHTML = "link"
				e.target.title = "link"
				e.target.setAttribute("linksto","link")
			}
			//if !THIS, fill THAT (waiting one) w/linksto reference to THIS (clicked one) midpoint
			else {
				//alert("not the same one, now setting OTHER midpoint")
				document.getElementById("calspreadlink"+uniqueID).setAttribute("linksto","midpoint"+ e.target.id.substr(13))
				//alert(document.getElementById("calspreadlink"+uniqueID).getAttribute("linksto"))
				document.getElementById("calspreadlink"+uniqueID).innerHTML = "syncing" //+ e.target.id.substr(13)
				document.getElementById("calspreadlink"+uniqueID).title =  months[parseInt(e.target.id.substr(17,2))]+' '+e.target.id.substr(19,2)+' '+e.target.id.substr(24,3)+' straddle'
			}
			//note: leave THIS one's linksto in default state (as "link") since it may be linked further
		}
		//alert(e.target.getAttribute("linksto"))
		
		//alert(e.target.getAttribute("linksto"))
	}	
	//if (e.target.id.indexOf("link_to")==0){
	//	alert('this is the target of the link')
	//}
	//else alert(e.target.id)
}
unsafeWindow.sWait = function(a){
	//obj.innerHTML = "<font color=red>calculating...</font>"
	//alert(obj.innerHTML)
	//extract strike:
	//alert("kk")
	//unsafeWindow.setTimeout("sWait(obj)", 5000);
	var strike, obj, calLink
	var i, strikeTrim, uniqueID, linksto, callbid, putbid, callask, putask, totbid, totask, midpoint
	var alen = a.length
	for (i=0;i<alen;i++){
	
	obj = a[i]
	
	//create id for linking:
	uniqueID = obj.id.substr(7)
	
	if (obj.innerHTML.indexOf("<table")==-1) {
		var rpb = 1 //to avoid infinite alert loop far below
		//alert("***"+obj.innerHTML+"***")
		strikeTrim = obj.innerHTML.indexOf("<")
		if (strikeTrim == -1) strikeTrim = obj.innerHTML.length
		strike = obj.innerHTML.substr(obj.innerHTML.lastIndexOf(" ",strikeTrim))
		if (strike.indexOf(".0")>-1) strike=strike.substr(0,strike.indexOf(".0"))
		obj.innerHTML = "<table align=center><tr><td><a id=totbid"+uniqueID+"></a></td><td><a id=totask"+uniqueID+"></a></td><td><font color=#00FF00><b>"+strike+"</font></b></td><td><font color=yellow><a  id=midpoint"+uniqueID+"></a></font></td><td><font color=cyan><a id=calspreadlink"+uniqueID+" linksto=link>link</a>"+"</font></td><tr></table>"
	}
	else { //get existing vars from table elements: 
		//strike = obj.getElementsByTagName("td")[2].textContent
		//calLink = obj.getElementsByTagName("a")[0].id
	}
	callbid = document.getElementById("callBid_"+uniqueID).innerHTML
	putbid = document.getElementById("putBid_"+uniqueID).innerHTML
	callask = document.getElementById("callAsk_"+uniqueID).innerHTML
	putask = document.getElementById("putAsk_"+uniqueID).innerHTML
	totbid = (parseFloat(callbid)+parseFloat(putbid)).toFixed(2)
	totask = (parseFloat(callask) + parseFloat(putask)).toFixed(2)
	midpoint = ((parseFloat(totbid)+parseFloat(totask))/2).toFixed(3)
	
	document.getElementById("totbid"+uniqueID).innerHTML = totbid
	document.getElementById("totask"+uniqueID).innerHTML = totask
	document.getElementById("midpoint"+uniqueID).innerHTML = midpoint
	calLink = document.getElementById("calspreadlink"+uniqueID)
	//if (rpb) alert(typeof(document.getElementById("calspreadlink"+uniqueID)))
	//if (calLink == "link")
	//if (rpb) alert("***"+obj.parentNode.innerHTML+"***")
	//if (rpb) alert("***"+document.getElementById("calspreadlink_"+obj.id.substr(7)).innerHTML+"***")
	} //end for
	//second loop to calc calspreads after initial loop calcs
	for (i=0;i<alen;i++){
		obj = a[i]
		//create id for linking:
		uniqueID = obj.id.substr(7)
		if (document.getElementById("calspreadlink"+uniqueID).getAttribute("linksto").indexOf("midpoint")==0) {
			totbid = (parseFloat(document.getElementById(document.getElementById("calspreadlink"+uniqueID).getAttribute("linksto")).innerHTML)).toFixed(3);
			totask = (parseFloat(document.getElementById("midpoint"+uniqueID).innerHTML)).toFixed(3);
			document.getElementById("calspreadlink"+uniqueID).innerHTML = (totbid - totask).toFixed(3);
		}
	}
//else alert("no spread")
}

/*
transformiix:result > body .body_chain > div #mainChainContainer .darkMode > div #main_div .mainDiv > table #main .main > tbody #main_tbody > tr #group_201012030001180000SPY .mainTr > th .dataColumnSeries > div #series_201012030001210000SPY ..row_off_m_1 > table > tbody > tr > td
*/

function calcSpread(){
//alert(document.innerHTML)
//return
//var totalquotes= document.getElementsByTagName("optionQuote")
//alert(totalquotes.length)

var allStrikes = document.getElementsByTagName("th")
//alert(allStrikes.length)
var strike1 = document.getElementById("series_201012030001160000SPY")
                                 //callBidSize_201012030001160000SPY

}
